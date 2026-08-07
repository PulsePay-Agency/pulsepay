# PulsePay 

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Stellar Drips Wave](https://img.shields.io/badge/Stellar-Drips_Wave-teal.svg)](https://www.drips.network/wave/stellar/repos)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/your-org/pulsepay/issues)

PulsePay is a continuous streaming payment protocol built on Stellar's Soroban smart contract network. It features a high-performance Next.js frontend, secure WebAuthn (Passkey) onboarding, and deep integration with SEP-24 Stellar Anchors.

## 🏗️ Repository Architecture

This project is built using a **Turborepo** monorepo.

*   `/contracts`: The Soroban Rust smart contracts.
*   `/packages/contract-client`: Auto-generated TypeScript bindings of the contract (Single Source of Truth).
*   `/apps/frontend`: Next.js 15 App Router featuring Framer Motion UI and the high-performance ticker.
*   `/apps/backend`: Express.js service for ingesting SEP-24 Anchor webhooks.
*   `e2e/`: Playwright end-to-end tests for critical flows.

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18+)
*   [pnpm](https://pnpm.io/) (v9+)
*   [Rust](https://rustup.rs/) (with `wasm32-unknown-unknown` target)
*   [Stellar CLI](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup)

### 2. Install Dependencies
At the root of the repository, run:
```bash
# We use pnpm to manage the workspace
pnpm install
```

### 3. Run the Smart Contract Tests
Ensure the core Rust logic is sound before booting the UI:
```bash
cd contracts
cargo test
```

### 4. Start the Application
Turborepo makes it incredibly easy to start the frontend and backend simultaneously. From the root directory:
```bash
# This spins up both Next.js and the Express server
pnpm dev
```

*   **Frontend UI:** `http://localhost:3000`
*   **Backend Webhooks:** `http://localhost:8080/health`

## 🧪 Running End-to-End Tests
We use Playwright to ensure the UI flows don't regress.
```bash
# Install browsers (first time only)
pnpm --filter frontend exec playwright install --with-deps

# Run the test suite
pnpm --filter frontend test
```

## 🌐 Testnet Configuration
The app is currently configured to interface with the Stellar Testnet. 

**PulsePay Core Contract ID (Soroban Testnet):**
```
CBH3ATY3PU7MRK54BOLEHU2ANM67LXLALNR5TQP6MR44NFKOLLEFHRZW
```
- Contract interactions use `https://soroban-testnet.stellar.org`
- SEP-24 Cashouts query `testanchor.stellar.org`

## ☁️ Public Hosting Topology
The application infrastructure uses modern serverless platforms configured for production zero-downtime routing.

```text
[User Browser]
   │
   ├──────► Frontend (Vercel) ──────────► Stellar Soroban RPC (Testnet)
   │           │
   │           └──────────► Backend / Indexer (Render / Railway)
   │                            │
   └────────────────────────────┴──────► PostgreSQL Database
```

## 📝 Drips Wave Grant Submission Payload

*   **Project Name:** PulsePay
*   **One-Line Description:** Zero-Click Real-Time Global Payroll & Physical Cash-Out Protocol on Stellar
*   **Monorepo / Contract Source:** `https://github.com/your-org/pulsepay`
*   **Live Demo URL:** `https://pulsepay-app.vercel.app`
*   **Protocol Documentation:** `https://docs.pulsepay.finance`
*   **Testnet Explorer Deployment:** `https://stellar.expert/explorer/testnet/contract/CBH3ATY3PU7MRK54BOLEHU2ANM67LXLALNR5TQP6MR44NFKOLLEFHRZW`
*   **Demo Video:** `https://youtube.com/watch?v=your-demo-id`

---
*For contributors: Run `./seed_issues.sh` to initialize the project board with good first issues!*
