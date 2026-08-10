# PulsePay Core Smart Contract Architecture

The core contract (`pulsepay-core`) is written in **Rust** using the **Soroban SDK (`soroban-sdk = "21.4.0"`)**.

---

## Contract Addresses & Network Details

- **Network:** Stellar Soroban Testnet
- **RPC Endpoint:** `https://soroban-testnet.stellar.org`
- **Contract ID:** `CBH3ATY3PU7MRK54BOLEHU2ANM67LXLALNR5TQP6MR44NFKOLLEFHRZW`
- **Asset Code:** USDC (`SEP-41 Token Standard`)

---

## Public Entry Points

### 1. `initialize`
Configures the admin address and USDC token contract ID. Can only be invoked once.

```rust
pub fn initialize(env: Env, admin: Address, token: Address) -> Result<(), Error>;
```

### 2. `create_stream`
Creates a new continuous payroll stream and locks the principal in the vault.

```rust
pub fn create_stream(
    env: Env,
    employer: Address,
    worker: Address,
    total_amount: i128,
    start_time: u64,
    end_time: u64,
) -> Result<u64, Error>;
```

### 3. `withdraw`
Allows the worker to claim accrued wages up to the current ledger timestamp.

```rust
pub fn withdraw(env: Env, worker: Address, stream_id: u64) -> Result<i128, Error>;
```

### 4. `cancel_stream`
Allows the employer to cancel an active stream, refunding unvested tokens to the employer while securing earned tokens for the worker.

```rust
pub fn cancel_stream(env: Env, employer: Address, stream_id: u64) -> Result<(), Error>;
```

### 5. `get_stream`
Read-only query to fetch the full stream metadata and current status.

```rust
pub fn get_stream(env: Env, stream_id: u64) -> Result<Stream, Error>;
```
