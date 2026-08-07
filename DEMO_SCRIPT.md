# PulsePay: SCF Demo Video

**Target Length:** 2:00 Minutes
**Tone:** Fast-paced, high-end fintech, developer-centric but highly accessible.

---

## 🎬 Storyboard & Script

### Segment 1: The Hook (0:00 - 0:20)
**Visuals:**
- Quick cuts of the landing page. The dark-mode glow pulses in the background. 
- The mouse clicks the glowing fingerprint icon.
- A native macOS Touch ID (or Windows Hello) prompt appears. The user scans their finger. The screen instantly transitions to the Employer Dashboard.

**Narration (Voiceover):**
*"Payroll is fundamentally broken. We work in real-time, but get paid in batches. Meet PulsePay: continuous, streaming liquidity built natively on Stellar Soroban. And thanks to WebAuthn passkeys, onboarding takes literally one fingerprint—no seed phrases required."*

### Segment 2: Employer Creation (0:20 - 0:50)
**Visuals:**
- Employer Dashboard: Mouse clicks "New Stream".
- A clean slide-over modal appears. The user enters a worker's address and a rate of "$5,000 / mo".
- The screen splits. On the right, a terminal shows the Soroban Rust contract tests executing incredibly fast: `cargo test` turning green, highlighting the `require_auth` and safe `i128` math checks.

**Narration:**
*"Employers can provision continuous streams to their workforce in seconds. Under the hood, PulsePay leverages highly-optimized Soroban Rust contracts. It calculates accrual linearly, utilizing safe 128-bit integer math. If an employer cancels early, unstreamed capital is refunded, but the worker keeps exactly what they've earned up to that millisecond."*

### Segment 3: The Magic Ticker (0:50 - 1:15)
**Visuals:**
- Cut to the Worker Dashboard. 
- Zoom in tight on the large "$142.5039" numbers. They are rolling upward smoothly at 60 frames per second.
- Graphic overlay: An arrow points to the numbers reading *"Absolute Time Interpolation"*.
- The screen shows the TypeScript code importing `Stream` directly from the auto-generated `contract-client`.

**Narration:**
*"This is the Worker Dashboard. By importing auto-generated TypeScript bindings directly from our WebAssembly output, the Next.js frontend fetches the true on-chain state, then uses a high-performance animation loop to interpolate the balance in real-time. Zero floating-point drift. Just perfect sync with the blockchain."*

### Segment 4: Cash-out via SEP-24 (1:15 - 1:45)
**Visuals:**
- Worker clicks the white "Cash Out" button.
- The SEP-24 modal appears. 
- Terminal overlay shows the app querying `testanchor.stellar.org/.well-known/stellar.toml`.
- The UI progresses from "Connecting to Anchor..." to a green checkmark "Withdrawal Complete". 
- At the bottom of the UI, a tiny tooltip reads: *"0.25% protocol fee deducted on-chain"*.

**Narration:**
*"When a worker needs capital, they don't have to wait. PulsePay connects directly to Stellar Anchors via the SEP-24 standard. The protocol dynamically negotiates the endpoints, handles the 0.25% protocol fee entirely on-chain, and off-ramps the USDC straight to a bank account."*

### Segment 5: Outro (1:45 - 2:00)
**Visuals:**
- A fast pan across the Turborepo monorepo file structure.
- The GitHub Actions CI/CD pipeline flashing green.
- The PulsePay logo fades in over the dark aesthetic background.

**Narration:**
*"Built with Turborepo, Next.js, and Soroban. Hardened with Playwright E2E tests and CI/CD pipelines. This is PulsePay. The future of streaming finance on Stellar."*
