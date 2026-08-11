# PulsePay

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Stellar Drips Wave](https://img.shields.io/badge/Stellar-Drips_Wave-00E5A3.svg)](https://www.drips.network/wave/stellar/repos)
[![Testnet Contract](https://img.shields.io/badge/Soroban-Testnet_Deployed-7C3AED.svg)](https://stellar.expert/explorer/testnet/contract/CBH3ATY3PU7MRK54BOLEHU2ANM67LXLALNR5TQP6MR44NFKOLLEFHRZW)
[![Live App](https://img.shields.io/badge/Frontend-Vercel_Live-black.svg)](https://pulsepay-frontend.vercel.app/)

PulsePay is an automated payroll streaming protocol built natively on Stellar's Soroban smart contract network. It enables real-time micro-disbursements for remote workforces by calculating accrued balances per ledger second. Workers can claim accrued funds at any time with a transparent 0.25% protocol fee and cash out into local physical fiat via integrated SEP-24 Stellar Anchors.

## 🔗 Official Links & Resources

* **Live Web Application:** [pulsepay-frontend.vercel.app](https://pulsepay-frontend.vercel.app/)
* **Indexer API Endpoint:** [pulsepay-4pi1.onrender.com](https://pulsepay-4pi1.onrender.com)
* **Protocol Documentation (GitBook):** [oobayemi.gitbook.io/pulsepay](https://oobayemi.gitbook.io/pulsepay)
* **Block Explorer (StellarExpert):** [Contract `CBH3ATY3...FHRZW`](https://stellar.expert/explorer/testnet/contract/CBH3ATY3PU7MRK54BOLEHU2ANM67LXLALNR5TQP6MR44NFKOLLEFHRZW)
* **Primary Repository:** [github.com/PulsePay-Agency/pulsepay](https://github.com/PulsePay-Agency/pulsepay)

## 🏗️ System Architecture

PulsePay uses a monorepo structure managed by Turborepo and pnpm workspaces:

```text
/apps
  ├── frontend/         # Next.js 15 App Router interface (Passkey Auth, Live Stream UI)
  └── backend/          # Express.js indexer & SEP-24 anchor event listener
/packages
  └── contract-client/  # Auto-generated TypeScript bindings for Soroban smart contracts
/contracts
  └── pulsepay-core/    # Soroban Rust smart contracts (Ledger timestamp math, vault lockup)
/e2e/                   # Playwright end-to-end integration tests
```

### Protocol Flow Topology

```text
┌──────────────────┐           ┌─────────────────────────────┐
│  Employer Vault  │──────────►│   Soroban Smart Contract    │
└──────────────────┘           │  CBH3ATY3...FHRZW (Testnet) │
                               └──────────────┬──────────────┘
                                              │
                         Continuous Ledger-Timestamp Streaming
                                              │
                                              ▼
┌──────────────────┐           ┌─────────────────────────────┐
│ SEP-24 Local Cash│◄──────────│  Worker Biometric Withdrawal│
│ (MoneyGram/Bank) │           │     (0.25% Protocol Fee)    │
└──────────────────┘           └─────────────────────────────┘
```

## ⚡ Soroban Smart Contract Deployment

| Parameter | Network Value |
| --- | --- |
| **Network** | Stellar Soroban Testnet |
| **Contract ID** | `CBH3ATY3PU7MRK54BOLEHU2ANM67LXLALNR5TQP6MR44NFKOLLEFHRZW` |
| **RPC Endpoint** | `https://soroban-testnet.stellar.org` |
| **Network Passphrase** | `Test DF Network ; July 2015` |
| **Anchor Off-Ramp Test Host** | `testanchor.stellar.org` |

## 💻 Local Development Setup

### Prerequisites

* **Node.js:** v18.0.0 or higher
* **pnpm:** v9.0.0 or higher
* **Rust:** edition 2021 with target `wasm32-unknown-unknown`
* **Stellar CLI:** v21.0.0 or higher

### 1. Repository Installation

```bash
git clone https://github.com/PulsePay-Agency/pulsepay.git
cd pulsepay
pnpm install
```

### 2. Verify Smart Contracts

Run unit tests across the Rust Soroban contract suite:

```bash
cd contracts/pulsepay-core
cargo test
```

### 3. Launch Development Server

Start both the frontend application and backend indexer concurrently:

```bash
# Executed from root directory
pnpm dev
```

* **Frontend:** `http://localhost:3000`
* **Backend Health Check:** `http://localhost:8080/health`

### 4. Run End-to-End Tests

```bash
pnpm --filter frontend exec playwright install --with-deps
pnpm --filter frontend test
```

## 💧 Drips Wave Program Contributions

PulsePay actively participates in the **Stellar Drips Wave Program**. Community developers can earn points and rewards by completing scoped issues on our project board.

### How to Contribute

1. Browse open issues on our [GitHub Issue Board](https://github.com/PulsePay-Agency/pulsepay/issues).
2. Filter by labels such as `good first issue`, `frontend`, `contracts`, or `Drips Wave`.
3. Apply directly for an issue on the [Drips Wave Portal](https://www.drips.network/wave/stellar).
4. Once assigned, submit your pull request referencing the issue ID (`Closes #ISSUE_NUMBER`).

Refer to [`CONTRIBUTING.md`](./CONTRIBUTING.md) for full style guidelines and code formatting standards.

## 👥 Maintainers

| Name | Role | GitHub | Contact |
| --- | --- | --- | --- |
| **Oobayemi** | Lead Architect / Maintainer | [@Femology](https://github.com/Femology) | Telegram: `@Oobayemi` |

---

## 🤝 Contributors

Thank you to everyone contributing to the PulsePay protocol!

---

## 📄 License

This repository is licensed under the [Apache 2.0 License](./LICENSE).
