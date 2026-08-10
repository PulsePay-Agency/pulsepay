# Economic Model & Fee Architecture

PulsePay is designed to provide ultra-low transaction costs for global payroll streaming while maintaining self-sustaining protocol revenues.

---

## 1. Protocol Fee Structure

PulsePay charges a minimal protocol fee only during **worker withdrawal events**. Stream creation and continuous accrual are 100% free of protocol fees.

| Operation | Fee Rate | Recipient |
| :--- | :--- | :--- |
| **Stream Creation** | `0.00%` | Free |
| **Continuous Accrual** | `0.00%` | Free |
| **Worker Withdrawal** | `0.25%` (25 bps) | PulsePay Protocol Reserve Vault |
| **Employer Cancellation** | `0.00%` | Free |

---

## 2. Fee Math Formula

For a withdrawal request of amount $A$:

$$Fee = A \times 0.0025$$

$$Net\ Worker\ Amount = A - Fee$$

### Example Calculation
If a worker withdraws **$1,000.00 USDC**:
- **Protocol Fee (0.25%):** $2.50 USDC
- **Net Received by Worker:** $997.50 USDC

---

## 3. Gas & Ledger Reserve Economics on Soroban

Soroban transactions use Stellar XLM for CPU resource metering and storage footprint fees.

- **Footprint Storage Fee:** Storage costs are charged based on bytes stored in `Persistent` data keys.
- **TTL Extension Reserve:** Every stream key has its TTL extended by 535,680 ledgers (~30 days) upon interaction.
- **Micro-transaction Optimization:** Because accrual is math-based and calculated at read-time, zero gas is consumed while funds accrue second-by-second. Gas is only consumed when a transaction (`withdraw` or `cancel`) is submitted to the ledger.
