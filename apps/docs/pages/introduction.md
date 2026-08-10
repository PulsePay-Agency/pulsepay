# Introduction to PulsePay

PulsePay is an open-source continuous payroll infrastructure layer built for global teams on the Stellar network.

---

## What is Continuous Payroll Streaming?
Rather than waiting for bi-weekly or monthly payout batches, continuous payroll streams unlocked capital every single second. As a worker completes time on the job, their claimable balance grows in real-time.

```text
Accrued Balance = Total Stream Deposit * [(Current Timestamp - Start Timestamp) / (End Timestamp - Start Timestamp)]
```

---

## Key Advantages

### For Employers
- **Automated Payouts:** Zero manual bank transfers or monthly accounting runs.
- **Clawback Security:** Unvested principal remains protected and can be canceled if a contract terminates early.
- **Capital Efficiency:** Deposit only what is committed to active contracts without escrow markup.

### For Workers
- **Instant Liquidity:** Access earned income whenever needed for emergency expenses or immediate investments.
- **Zero Intermediary Fees:** Direct Soroban smart contract transfers avoid intermediate banking correspondent charges.
- **Physical Cash-Out:** Convert USDC to local currency in minutes via SEP-24 anchors (bank ACH, mobile money, physical cash counters).
