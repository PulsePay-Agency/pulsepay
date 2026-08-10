# TypeScript Contract Client SDK

The `@pulsepay/contract-client` package provides a type-safe TypeScript wrapper for interacting with the `pulsepay-core` Soroban contract from frontend or backend applications.

---

## 1. Installation

Inside your web application or backend service:

```json
{
  "dependencies": {
    "contract-client": "workspace:*"
  }
}
```

---

## 2. SDK Initialization

```typescript
import { Client, networks } from "contract-client";

const pulsepay = new Client({
  ...networks.testnet,
  contractId: "CBH3ATY3PU7MRK54BOLEHU2ANM67LXLALNR5TQP6MR44NFKOLLEFHRZW",
  rpcUrl: "https://soroban-testnet.stellar.org",
});
```

---

## 3. Usage Examples

### Fetch Stream Details
```typescript
const stream = await pulsepay.get_stream({ stream_id: 1n });
console.log("Stream Total USDC:", stream.total_amount);
console.log("Stream Worker Address:", stream.worker);
```

### Withdraw Accrued Wages
```typescript
const tx = await pulsepay.withdraw({
  worker: "GWORKER...1234",
  stream_id: 1n,
});

const result = await tx.signAndSend();
console.log("Withdrawal Tx Hash:", result.hash);
```
