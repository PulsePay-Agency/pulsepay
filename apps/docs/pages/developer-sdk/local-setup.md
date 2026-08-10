# Local Environment & Development Setup

This guide details how to clone, build, and run the PulsePay monorepo locally for development and testing.

---

## 1. Prerequisites

Ensure you have the following tools installed:

- **Node.js**: v18.0.0 or higher
- **pnpm**: v9.0.0 or higher (`npm i -g pnpm`)
- **Rust Toolchain**: `stable` with `wasm32-unknown-unknown` target
- **Stellar CLI**: `cargo install --locked stellar-cli --features opt`

---

## 2. Monorepo Structure

```text
/
├── apps/
│   ├── frontend/         # Next.js 15 Web Application
│   ├── backend/          # Node.js / Express SEP-24 Webhook Indexer
│   └── docs/             # Documentation Website
├── packages/
│   ├── contract-client/  # Auto-generated TypeScript Client for Soroban
│   └── utils/            # Shared TypeScript utilities
└── contracts/
    └── pulsepay-core/    # Soroban Rust Smart Contract
```

---

## 3. Installation & Local Development

Clone the repository and install all workspace dependencies:

```bash
git clone https://github.com/PulsePay-Agency/pulsepay.git
cd pulsepay
pnpm install
```

Start the local development server for all services (Frontend, Backend, Docs):

```bash
pnpm dev
```

---

## 4. Contract Interacting via Stellar CLI

You can query the deployed Soroban contract on Testnet directly using the Stellar CLI:

```bash
stellar contract invoke \
  --id CBH3ATY3PU7MRK54BOLEHU2ANM67LXLALNR5TQP6MR44NFKOLLEFHRZW \
  --source-account S... \
  --network testnet \
  -- \
  get_stream \
  --stream_id 1
```
