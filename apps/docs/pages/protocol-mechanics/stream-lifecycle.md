# Stream Lifecycle Specification

This document details the state machine transitions and execution steps of a PulsePay wage stream on Soroban.

---

## State Diagram

```text
 [ Uninitialized ]
        │
        ▼ (create_stream)
    [ ACTIVE ] ──────────────────────────┐
        │                                │
        │ (withdraw)                     │ (cancel_stream)
        ▼                                ▼
    [ ACTIVE ] (Partial Vested)     [ CANCELED ] (Unearned Principal Refunded)
        │                                │
        │ (ledger.timestamp >= end_time) │ (worker claims remaining accrued)
        ▼                                ▼
   [ COMPLETED ]                    [ CLOSED ]
```

---

## 1. Stream Creation (`create_stream`)
An employer initializes a stream by calling the `create_stream` entry point on the Soroban contract.

- **Pre-conditions:**
  - Employer must hold sufficient USDC balance.
  - Employer must authorize a `token.transfer` approval to the PulsePay vault contract.
  - `start_time` must be `< end_time`.
  - `amount` must be greater than 0.

- **State Changes:**
  - Full `amount` (e.g. 5,000 USDC) is transferred from the employer's address to the contract storage vault.
  - Stream state is stored under symbol key `Stream(id)` with status set to `Active`.
  - Event `stream_created` is emitted to the Soroban event log.

---

## 2. Real-Time Accrual Calculation
While in the `Active` state, the contract evaluates vested capital dynamically on-demand using the ledger timestamp:

```rust
fn calculate_vested_amount(stream: &Stream, current_time: u64) -> i128 {
    if current_time <= stream.start_time {
        return 0;
    }
    if current_time >= stream.end_time {
        return stream.total_amount;
    }
    let elapsed = current_time - stream.start_time;
    let duration = stream.end_time - stream.start_time;
    (stream.total_amount * elapsed as i128) / duration as i128
}
```

---

## 3. Worker Withdrawal (`withdraw`)
At any point, a worker can execute a withdrawal:

1. Contract computes `vested_amount` at `env.ledger().timestamp()`.
2. Contract calculates `unwithdrawn = vested_amount - stream.withdrawn_amount`.
3. Contract deducts protocol fee (`0.25%`).
4. Net balance is transferred directly from the contract vault to the worker's Stellar address via SEP-41 token interface.
5. Stream `withdrawn_amount` is updated in persistent storage.

---

## 4. Stream Cancellation (`cancel_stream`)
If a employment contract ends early, the employer can invoke `cancel_stream`:

1. Accrued earnings up to the exact cancellation timestamp are locked for the worker.
2. Remaining unearned principal (`total_amount - vested_amount`) is immediately transferred back to the employer.
3. Stream status updates to `Canceled`.

---

## 5. Completion (`expiration`)
Once `env.ledger().timestamp() >= end_time`, the stream is 100% vested. The worker can withdraw the final remaining balance at any point.
