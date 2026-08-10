# Employer Onboarding & Stream Management Guide

This guide walks through how an employer sets up continuous payroll streams for team members using the PulsePay Employer Portal.

---

## Prerequisites
- A WebAuthn Passkey (Fingerprint, TouchID, FaceID, or Hardware Key).
- Sufficient USDC funds deposited in your Stellar Soroban wallet.

---

## Step-by-Step Walkthrough

### Step 1: Sign In via Passkey
1. Navigate to the PulsePay Application landing page and click **Login / Register**.
2. Select **Employer Vault** tab.
3. Click **Sign in as Employer** and complete your biometric prompt (WebAuthn).

---

### Step 2: Open Create Stream Modal
1. On the Employer Dashboard, click the **+ New Stream** button in the top header.
2. Enter the worker's Stellar G-Address (e.g. `GABCD...1234`).
3. Set the total USDC allocation amount (e.g. `$5,000.00 USDC`).
4. Select the stream duration (e.g., 30 Days).

---

### Step 3: Authorize & Deploy
1. Click **Deploy Payroll Stream**.
2. Confirm the token transfer approval transaction.
3. The principal is transferred to the Soroban vault contract, and the stream immediately begins vesting second-by-second.

---

## Managing Active Streams

From the **Employer Dashboard Table**, you can:
- View live accrued vs locked balances for all workers.
- Monitor active vs completed streams.
- **Cancel Stream:** If a contract terminates, click **Cancel** next to a worker's row. Accrued pay goes to the worker, and unvested USDC instantly returns to your wallet.
