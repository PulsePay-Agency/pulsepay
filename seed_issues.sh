#!/usr/bin/env bash
# Run this inside your repository root to seed program issues

gh issue create --title "feat(contract): implement multi-token support for EURC and native XLM streams" \
  --body "### Summary
Currently, the vault contract only supports generic SEP-24 USDC streams. We need to expand storage keys to support multi-token configurations.

### Acceptance Criteria
- [ ] Add \`TokenId\` to stream storage keys.
- [ ] Implement asset whitelist check on \`create_stream\`.
- [ ] Add unit tests for EURC decimals and transfer limits.

### Tech Stack
Soroban, Rust" --label "enhancement,good first issue"

gh issue create --title "fix(indexer): handle re-org and ledger gap recovery in webhook listener" \
  --body "### Summary
The Node.js backend listener must reliably handle dropped RPC connections or temporary re-orgs during SEP-24 deposit verification.

### Acceptance Criteria
- [ ] Implement exponential backoff for Stellar RPC event polling.
- [ ] Store processed \`ledger_sequence\` in PostgreSQL to prevent duplicate indexing.

### Tech Stack
Node.js, TypeScript, PostgreSQL" --label "bug,backend"

gh issue create --title "docs(sdk): write automated TypeScript SDK documentation generation pipeline" \
  --body "### Summary
Auto-generate TypeDoc reference pages directly from \`@pulsepay/contract-client\` packages into the GitBook docs site.

### Acceptance Criteria
- [ ] Configure TypeDoc build pipeline in Turborepo.
- [ ] Export markdown files to \`/docs/sdk-reference\`.

### Tech Stack
TypeDoc, TypeScript, Turborepo" --label "documentation"
