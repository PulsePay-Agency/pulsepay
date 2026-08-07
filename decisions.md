# PulsePay Architecture & Product Decisions

## 1. Cancellation/Clawback Policy
- **Decision:** When an employer cancels a stream mid-flight, the already accrued but unwithdrawn balance becomes **instantly claimable by the worker**.
- **Details:** The employer can only claw back the unstreamed (future) portion of the capital. The smart contract will enforce this mathematically at the ledger timestamp of cancellation.

## 2. Fee Model
- **Decision:** **0.25% percentage fee on withdrawal**.
- **Details:** 
  - Paid by the worker.
  - Deducted dynamically on each withdrawal.
  - Received by a protocol fee collector address.
  - **Protocol Fee Collector:** For v1, this will be a hardcoded multisig address (upgradable via an admin call). Future phases (Phase 2+) will upgrade this to a DAO-controlled treasury or FeeDistributor contract.

## 3. Monorepo Tool
- **Decision:** **Turborepo** with **pnpm**.
- **Details:** We will use a standard Turborepo layout (`apps/` for frontend/backend, `packages/` for shared contract clients and utilities). This ensures fast builds and robust caching for the mixed-language (Rust + TypeScript) stack.

## 4. Scope for v1
- **Decision:** **Stellar Testnet + Test Anchor** (`https://testanchor.stellar.org`) **only**.
- **Details:** No Futurenet or Mainnet configuration will be included in this phase.

## 5. Passkey Implementation
- **Decision:** Use **`kalepail/passkey-kit`**.
- **Details:** This will serve as the foundation for WebAuthn/secp256r1 integration. Raw signature verification will not be implemented from scratch.
