#![cfg(test)]
extern crate std;

use super::*;
use soroban_sdk::{testutils::{Address as _, Ledger}, Address, Env};
use soroban_sdk::token::Client as TokenClient;
use soroban_sdk::token::StellarAssetClient as TokenAdminClient;

fn setup_test() -> (Env, PulsePayContractClient<'static>, TokenClient<'static>, TokenAdminClient<'static>, Address) {
    let env = Env::default();
    let contract_id = env.register_contract(None, PulsePayContract);
    let client = PulsePayContractClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    
    // Deploy a generic token
    let token_admin = Address::generate(&env);
    let token_contract = env.register_stellar_asset_contract(token_admin.clone());
    
    let token = TokenClient::new(&env, &token_contract);
    let token_admin_client = TokenAdminClient::new(&env, &token_contract);
    
    (env, client, token, token_admin_client, admin)
}

#[test]
fn test_create_and_withdraw() {
    let (env, client, token, token_admin, admin) = setup_test();
    let employer = Address::generate(&env);
    let worker = Address::generate(&env);
    let fee_collector = Address::generate(&env);
    
    client.initialize(&admin, &fee_collector);
    
    token_admin.mint(&employer, &10000);
    
    let start_time = 1000;
    let end_time = 2000;
    let rate = 5; // 5 tokens per second
    
    env.ledger().set_timestamp(900);
    
    let stream_id = client.mock_all_auths().create_stream(
        &employer,
        &worker,
        &token.address,
        &rate,
        &start_time,
        &end_time,
    );
    
    assert_eq!(token.balance(&employer), 5000); // 10000 - 5000 (rate * 1000)
    assert_eq!(token.balance(&client.address), 5000);
    
    env.ledger().set_timestamp(1500);
    
    let claimable = client.get_claimable_balance(&stream_id);
    assert_eq!(claimable, 2500); // 500 seconds * 5 rate
    
    let amount_to_withdraw = 1000;
    client.mock_all_auths().withdraw_from_stream(&worker, &stream_id, &amount_to_withdraw);
    
    // 0.25% fee on 1000 is 2.5, but integer division makes it 2
    assert_eq!(token.balance(&worker), 998);
    assert_eq!(token.balance(&fee_collector), 2);
    assert_eq!(token.balance(&client.address), 4000);
    
    // Advance to end
    env.ledger().set_timestamp(2500);
    let remaining = client.get_claimable_balance(&stream_id);
    assert_eq!(remaining, 4000); // 5000 total - 1000 withdrawn
    
    client.mock_all_auths().withdraw_from_stream(&worker, &stream_id, &remaining);
    
    // Fee on 4000 is 4000 * 25 / 10000 = 10
    // worker gets 3990
    assert_eq!(token.balance(&worker), 998 + 3990);
    assert_eq!(token.balance(&fee_collector), 12);
    assert_eq!(token.balance(&client.address), 0);
}

#[test]
fn test_cancel_stream() {
    let (env, client, token, token_admin, admin) = setup_test();
    let employer = Address::generate(&env);
    let worker = Address::generate(&env);
    let fee_collector = Address::generate(&env);
    
    client.initialize(&admin, &fee_collector);
    token_admin.mint(&employer, &10000);
    
    env.ledger().set_timestamp(100);
    let stream_id = client.mock_all_auths().create_stream(
        &employer,
        &worker,
        &token.address,
        &10, // 10 per sec
        &200,
        &1200, // 1000 seconds total, 10000 amount
    );
    
    // Fast forward to 700 (500 seconds into stream)
    env.ledger().set_timestamp(700);
    
    // Cancel
    client.mock_all_auths().cancel_stream(&employer, &stream_id);
    
    // Employer should get refund for remaining 500 seconds
    assert_eq!(token.balance(&employer), 5000);
    assert_eq!(token.balance(&client.address), 5000); // Accrued
    
    let claimable = client.get_claimable_balance(&stream_id);
    assert_eq!(claimable, 5000);
    
    client.mock_all_auths().withdraw_from_stream(&worker, &stream_id, &5000);
    
    // fee on 5000 is 12.5 -> 12
    assert_eq!(token.balance(&worker), 4988);
    assert_eq!(token.balance(&fee_collector), 12);
    assert_eq!(token.balance(&client.address), 0);
}

#[test]
#[should_panic(expected = "HostError: Error(Contract, #4)")] // Error::InvalidTime
fn test_invalid_times() {
    let (env, client, token, token_admin, admin) = setup_test();
    let employer = Address::generate(&env);
    let worker = Address::generate(&env);
    
    client.initialize(&admin, &Address::generate(&env));
    token_admin.mint(&employer, &10000);
    
    client.mock_all_auths().create_stream(
        &employer,
        &worker,
        &token.address,
        &10,
        &1000,
        &500, // end before start
    );
}

#[test]
#[should_panic(expected = "HostError: Error(Contract, #7)")] // Error::InsufficientBalance
fn test_overdraw() {
    let (env, client, token, token_admin, admin) = setup_test();
    let employer = Address::generate(&env);
    let worker = Address::generate(&env);
    
    client.initialize(&admin, &Address::generate(&env));
    token_admin.mint(&employer, &10000);
    
    env.ledger().set_timestamp(100);
    let stream_id = client.mock_all_auths().create_stream(
        &employer,
        &worker,
        &token.address,
        &10,
        &100,
        &1100,
    );
    
    env.ledger().set_timestamp(200); // 100 seconds elapsed = 1000 claimable
    client.mock_all_auths().withdraw_from_stream(&worker, &stream_id, &1001); // should fail
}
