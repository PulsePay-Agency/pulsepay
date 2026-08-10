# PulsePay Overview
PulsePay is a real-time payroll streaming and physical cash-out protocol built natively on Soroban (Stellar Smart Contracts).

## The Problem
Global payroll systems rely on batch processing (ACH, SWIFT, domestic wires) that delays worker liquidity by 14 to 30 days. Intermediary banking fees reduce total pay by 3% to 7% for cross-border contractors.

## The Mechanism
PulsePay replaces batch payouts with continuous value transfer calculated per Soroban ledger timestamp. Workers gain real-time access to accrued wages and can cash out directly to physical fiat currency using Stellar SEP-24 anchor networks.

## Core Architecture
- **Contracts:** Soroban Rust vault contract managing non-custodial streams and clawbacks.
- **Backend Indexer:** Node.js service indexing ledger events and handling SEP-24 webhook callbacks.
- **Frontend:** Next.js 15 client using WebAuthn / Passkey auth for biometric signing.
