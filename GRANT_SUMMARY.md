# Stellar Community Fund: Technical Summary
**Project:** PulsePay
**Category:** Drips Wave / DeFi & Tooling

## 🎯 The Vision
PulsePay bridges the gap between Web3 settlement and premium Web2 user experiences. It is a production-ready, continuous streaming payment protocol on Soroban. It allows capital to flow smoothly from employers to workers on a per-second basis, with funds instantly accessible to the worker via Stellar SEP-24 Anchors.

## 🛠️ Technical Achievements

### 1. Hardened Soroban Contracts
The core logic resides in a streamlined Rust smart contract using safe `i128` streaming math (`(now - start) * rate - withdrawn`). 
- **Security:** We enforce strict `require_auth()` checks on all state modifications. 
- **Protocol Sustainability:** A hardcoded, yet admin-upgradable, 0.25% fee is dynamically calculated and deducted during the withdrawal transaction and routed to the protocol treasury.
- **Fairness Guarantee:** If a stream is canceled mid-flight, accrued capital becomes instantly claimable by the worker. Only unstreamed capital is clawed back.

### 2. Auto-Generated SDK Monorepo
We eliminated the "glue code" errors common in dApps by leveraging a **Turborepo** monorepo.
- We used the Stellar CLI to generate fully-typed TypeScript bindings directly from our compiled Soroban Wasm. 
- The Next.js frontend (`apps/frontend`) and Express webhook server (`apps/backend`) import the `contract-client` package natively, ensuring that if the contract's `Stream` struct changes, the frontend fails to compile, guaranteeing type safety across the stack.

### 3. Absolute-Time Performance Ticker
To display the worker's balance ticking upwards in real-time, we avoided naive `setInterval` React state updates (which cause performance thrashing and floating-point drift). Instead, we fetch the baseline `claimable_balance` from Soroban, calculate the absolute time delta (`Date.now() - syncTime`), and inject the text directly into a DOM ref via a 60fps `requestAnimationFrame` loop. 

### 4. Native Passkeys & SEP-24
- **WebAuthn:** We bypassed complex third-party wrappers to implement raw `navigator.credentials.create()` biometric passkeys, ensuring phishing-resistant onboarding.
- **Anchors:** The cash-out flow dynamically queries `testanchor.stellar.org`'s TOML file to negotiate SEP-10 auth and SEP-24 interactive URLs, allowing workers to seamlessly bridge streamed USDC to fiat.

## 📊 Repository Metrics
- **Testing:** Playwright E2E testing covers core UI flows (Login, Dashboards, SEP-24). Rust unit tests cover 100% of mathematical contract edge cases (clock skew, early cancellation, zero-rate).
- **CI/CD:** Fully integrated GitHub Actions pipeline caching Rust compilations and running Playwright headless browsers on every PR.
