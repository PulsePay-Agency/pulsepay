# Storage & TTL Management on Soroban

Soroban introduces state archival mechanics. To prevent state bloat and ensure contract data remains accessible indefinitely, PulsePay implements automated Time-To-Live (TTL) extensions.

---

## 1. Storage Types Used

PulsePay utilizes two storage tiers:

1. **Instance Storage (`env.storage().instance()`):**
   - Stores global contract metadata: `AdminAddress`, `TokenAddress`, and global `StreamCounter`.
   - Bumped automatically on every write operation.

2. **Persistent Storage (`env.storage().persistent()`):**
   - Stores individual stream state records under key `DataKey::Stream(stream_id)`.
   - Retains stream configuration until explicitly closed.

---

## 2. Automated TTL Bumping

Every time a stream is accessed (`get_stream`, `withdraw`, or `cancel_stream`), the contract invokes `extend_ttl`:

```rust
let key = DataKey::Stream(stream_id);
env.storage().persistent().extend_ttl(
    &key,
    172_800, // Threshold: 172,800 ledgers (~10 days)
    535_680  // Extend to: 535,680 ledgers (~30 days)
);
```

### Parameters Explanation
- **Threshold (`172,800 ledgers`):** If remaining TTL drops below ~10 days, the bump triggers.
- **Extension (`535,680 ledgers`):** Extends the lifetime by ~30 days.

This guarantees that active streams will never be archived into cold storage during their active operational window.
