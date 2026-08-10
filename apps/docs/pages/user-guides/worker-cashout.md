# Worker Cash-Out & SEP-24 Off-Ramp Guide

This guide details how a worker monitors real-time streaming wages and converts them into physical cash or local bank deposits using Stellar SEP-24 anchors.

---

## 1. Monitoring Real-Time Accrual

1. Log into the **Worker Portal** using your biometric Passkey.
2. The central **Stream Ticker** updates every millisecond to show your accrued, claimable USDC balance.
3. Observe your stream progress bar, daily yield rate, and employer details.

---

## 2. Initiating Cash-Out (SEP-24 Flow)

When you are ready to withdraw:

1. Click the **Cash Out via Anchor** button on your dashboard.
2. Select your preferred payout method:
   - **Bank Transfer (ACH / SEPA / Local Wire)**
   - **Physical Cash Pick-up Counter**
   - **Mobile Money (MPesa, Orange Money)**
3. The system initiates Stellar SEP-10 Web Authentication and requests an interactive SEP-24 session from `testanchor.stellar.org`.

---

## 3. Completing Payout

1. Follow the secure interactive pop-up window provided by the Stellar Anchor to select your bank account or cash pick-up location.
2. Confirm the transaction amount.
3. The Soroban smart contract transfers net USDC (after 0.25% protocol fee) to the anchor, which immediately dispatches fiat currency to your bank account or local payout agent.
