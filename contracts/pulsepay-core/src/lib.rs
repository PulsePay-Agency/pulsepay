#![no_std]

use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, token, Address, Env, panic_with_error,
};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DataKey {
    Admin,
    FeeCollector,
    Stream(u64),
    NextStreamId,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Stream {
    pub id: u64,
    pub employer: Address,
    pub worker: Address,
    pub token: Address,
    pub rate_per_second: i128,
    pub start_time: u64,
    pub end_time: u64,
    pub amount_withdrawn: i128,
    pub total_amount: i128,
    pub is_canceled: bool,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    NotInitialized = 1,
    AlreadyInitialized = 2,
    InvalidRate = 3,
    InvalidTime = 4,
    StreamNotFound = 5,
    NotAuthorized = 6,
    InsufficientBalance = 7,
    StreamAlreadyCanceled = 8,
    AmountMustBePositive = 9,
}

const DAY_IN_LEDGERS: u32 = 17280; // Assuming ~5s per ledger
const INSTANCE_BUMP_AMOUNT: u32 = 7 * DAY_IN_LEDGERS; // 7 days
const INSTANCE_LIFETIME_THRESHOLD: u32 = INSTANCE_BUMP_AMOUNT - DAY_IN_LEDGERS;
const STREAM_BUMP_AMOUNT: u32 = 30 * DAY_IN_LEDGERS; // 30 days
const STREAM_LIFETIME_THRESHOLD: u32 = STREAM_BUMP_AMOUNT - DAY_IN_LEDGERS;

#[contract]
pub struct PulsePayContract;

#[contractimpl]
impl PulsePayContract {
    pub fn initialize(env: Env, admin: Address, fee_collector: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic_with_error!(&env, Error::AlreadyInitialized);
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::FeeCollector, &fee_collector);
        env.storage().instance().set(&DataKey::NextStreamId, &1u64);
        env.storage().instance().extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);
    }

    pub fn update_fee_collector(env: Env, admin: Address, new_collector: Address) {
        admin.require_auth();
        let current_admin: Address = env
            .storage()
            .instance()
            .get(&DataKey::Admin)
            .unwrap_or_else(|| panic_with_error!(&env, Error::NotInitialized));
            
        if admin != current_admin {
            panic_with_error!(&env, Error::NotAuthorized);
        }
        env.storage().instance().set(&DataKey::FeeCollector, &new_collector);
        env.storage().instance().extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);
    }

    pub fn create_stream(
        env: Env,
        employer: Address,
        worker: Address,
        token: Address,
        rate_per_second: i128,
        start_time: u64,
        end_time: u64,
    ) -> u64 {
        employer.require_auth();
        env.storage().instance().extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        if rate_per_second <= 0 {
            panic_with_error!(&env, Error::InvalidRate);
        }
        if end_time <= start_time {
            panic_with_error!(&env, Error::InvalidTime);
        }

        let duration = (end_time - start_time) as i128;
        let total_amount = rate_per_second * duration;

        // Transfer funds from employer to contract
        let token_client = token::Client::new(&env, &token);
        token_client.transfer(&employer, &env.current_contract_address(), &total_amount);

        let stream_id: u64 = env.storage().instance().get(&DataKey::NextStreamId).unwrap();
        
        let stream = Stream {
            id: stream_id,
            employer,
            worker,
            token,
            rate_per_second,
            start_time,
            end_time,
            amount_withdrawn: 0,
            total_amount,
            is_canceled: false,
        };

        env.storage().persistent().set(&DataKey::Stream(stream_id), &stream);
        env.storage().persistent().extend_ttl(&DataKey::Stream(stream_id), STREAM_LIFETIME_THRESHOLD, STREAM_BUMP_AMOUNT);
        
        env.storage().instance().set(&DataKey::NextStreamId, &(stream_id + 1));
        
        stream_id
    }

    pub fn withdraw_from_stream(env: Env, worker: Address, stream_id: u64, amount: i128) {
        worker.require_auth();
        env.storage().instance().extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);
        
        if amount <= 0 {
            panic_with_error!(&env, Error::AmountMustBePositive);
        }

        let mut stream: Stream = env
            .storage()
            .persistent()
            .get(&DataKey::Stream(stream_id))
            .unwrap_or_else(|| panic_with_error!(&env, Error::StreamNotFound));
            
        env.storage().persistent().extend_ttl(&DataKey::Stream(stream_id), STREAM_LIFETIME_THRESHOLD, STREAM_BUMP_AMOUNT);

        if stream.worker != worker {
            panic_with_error!(&env, Error::NotAuthorized);
        }

        let claimable = Self::get_claimable_balance_internal(&env, &stream);
        if amount > claimable {
            panic_with_error!(&env, Error::InsufficientBalance);
        }

        let fee_collector: Address = env
            .storage()
            .instance()
            .get(&DataKey::FeeCollector)
            .unwrap_or_else(|| panic_with_error!(&env, Error::NotInitialized));

        // 0.25% fee calculation (25 basis points)
        let fee = (amount * 25) / 10000;
        let net_amount = amount - fee;

        stream.amount_withdrawn += amount;
        env.storage().persistent().set(&DataKey::Stream(stream_id), &stream);

        let token_client = token::Client::new(&env, &stream.token);
        let contract_address = env.current_contract_address();
        
        if net_amount > 0 {
            token_client.transfer(&contract_address, &worker, &net_amount);
        }
        if fee > 0 {
            token_client.transfer(&contract_address, &fee_collector, &fee);
        }
    }

    pub fn cancel_stream(env: Env, employer: Address, stream_id: u64) {
        employer.require_auth();
        env.storage().instance().extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        let mut stream: Stream = env
            .storage()
            .persistent()
            .get(&DataKey::Stream(stream_id))
            .unwrap_or_else(|| panic_with_error!(&env, Error::StreamNotFound));
            
        env.storage().persistent().extend_ttl(&DataKey::Stream(stream_id), STREAM_LIFETIME_THRESHOLD, STREAM_BUMP_AMOUNT);

        if stream.employer != employer {
            panic_with_error!(&env, Error::NotAuthorized);
        }
        if stream.is_canceled {
            panic_with_error!(&env, Error::StreamAlreadyCanceled);
        }

        let current_time = env.ledger().timestamp();
        let new_end_time = if current_time < stream.start_time {
            stream.start_time
        } else if current_time > stream.end_time {
            stream.end_time
        } else {
            current_time
        };

        let refund_duration = (stream.end_time - new_end_time) as i128;
        let refund_amount = stream.rate_per_second * refund_duration;

        stream.end_time = new_end_time;
        stream.total_amount -= refund_amount;
        stream.is_canceled = true;

        env.storage().persistent().set(&DataKey::Stream(stream_id), &stream);

        if refund_amount > 0 {
            let token_client = token::Client::new(&env, &stream.token);
            token_client.transfer(&env.current_contract_address(), &employer, &refund_amount);
        }
    }

    pub fn get_claimable_balance(env: Env, stream_id: u64) -> i128 {
        let stream: Stream = env
            .storage()
            .persistent()
            .get(&DataKey::Stream(stream_id))
            .unwrap_or_else(|| panic_with_error!(&env, Error::StreamNotFound));
            
        Self::get_claimable_balance_internal(&env, &stream)
    }

    fn get_claimable_balance_internal(env: &Env, stream: &Stream) -> i128 {
        let current_time = env.ledger().timestamp();
        
        let effective_time = if current_time < stream.start_time {
            stream.start_time
        } else if current_time > stream.end_time {
            stream.end_time
        } else {
            current_time
        };

        let elapsed = (effective_time - stream.start_time) as i128;
        let accrued = elapsed * stream.rate_per_second;
        
        accrued - stream.amount_withdrawn
    }
}

#[cfg(test)]
mod test;
