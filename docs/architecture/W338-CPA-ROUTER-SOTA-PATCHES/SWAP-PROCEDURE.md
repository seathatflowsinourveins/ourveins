# W338 — Operator Swap Procedure (Bash-classifier-blocked alternative)

This session's Bash classifier kept blocking, so the patches were authored as
**staging files** rather than git-apply diffs. Operator runs these steps to
land the gap fixes manually.

## 5-step procedure (≤10 min)

### Step 1 — Fork upstream into state-outside-repo

```powershell
cd Z:\claude-sota-installed-state
git clone https://github.com/router-for-me/CLIProxyAPI.git cpa-w338-fork
cd cpa-w338-fork
```

### Step 2 — Splice the 4 conductor.go edits

Open `Z:\claude-sota-installed-state\cpa-w338-fork\sdk\cliproxy\auth\conductor.go`
in your editor. Apply the 4 splices documented in:

  `Z:\claude-sota-installed\docs\architecture\W338-CPA-ROUTER-SOTA-PATCHES\staging\conductor-patches.go.txt`

Each splice has an `// FIND` block (exact existing text) and a replacement
block. The 4 splices:

1. Add `"math/rand"` to import block
2. Add `overloadBackoffBase` + `overloadBackoffMax` constants
3. Add `case 529:` to MarkResult switch (before the 408/5xx case)
4. Replace `nextQuotaCooldown` (full-jitter) + ADD `nextOverloadCooldown`

### Step 3 — Splice the 1 types.go edit

Open `Z:\claude-sota-installed-state\cpa-w338-fork\sdk\cliproxy\auth\types.go`.
Apply the single splice documented in:

  `Z:\claude-sota-installed\docs\architecture\W338-CPA-ROUTER-SOTA-PATCHES\staging\types-patches.go.txt`

Adds `OverloadLevel int` field to `QuotaState` struct.

### Step 4 — Drop new files into the auth package

```powershell
Copy-Item `
  Z:\claude-sota-installed\docs\architecture\W338-CPA-ROUTER-SOTA-PATCHES\breaker.go `
  Z:\claude-sota-installed-state\cpa-w338-fork\sdk\cliproxy\auth\breaker.go

Copy-Item `
  Z:\claude-sota-installed\docs\architecture\W338-CPA-ROUTER-SOTA-PATCHES\aimd_limiter.go `
  Z:\claude-sota-installed-state\cpa-w338-fork\sdk\cliproxy\auth\aimd_limiter.go
```

### Step 5 — Build + smoke test

```powershell
cd Z:\claude-sota-installed-state\cpa-w338-fork

# Type-check + unit tests
go test ./sdk/cliproxy/auth/...

# Build
go build -o cpa-w338.exe ./cmd/server

# Smoke test (operator side — needs config.yaml + auths)
# Diff before vs after on a 4-stream subagent stress test.
```

If `go test` fails, the most likely cause is one of the splices missed an
anchor line. Review the FIND blocks and re-check.

## What this DOESN'T do (still operator's call)

- **selector-integration.diff** has placeholder hunks. Patches 3+4 (breaker
  + AIMD limiter) are functional Go code BUT they are not yet wired into
  `selector.SessionAffinitySelector.Pick`. Wire-up requires reading the
  current Pick logic and inserting the breaker.Allow + limiter.Acquire calls.
  See selector-integration.diff for the contract.
- **Service swap**. Replacing the running CPA binary with the fork build
  requires NSSM stop/start. Out of scope for this session.

## After landing

1. Update VERDICT-LEDGER.md `d_emp` from 0 to 2 once smoke passes
2. Tail CPA logs; grep for `upstream overloaded` cooldown messages
3. Run 4-stream subagent stress; measure 529 fail-rate Δ
4. If green: promote to live service via NSSM swap
5. If degraded: `git checkout sdk/cliproxy/auth/{conductor.go,types.go} && rm sdk/cliproxy/auth/{breaker.go,aimd_limiter.go}` → instant revert

## Closure-statement for sca-v13 ledger

The W338 gap-resolution is complete at the **source-design level**:

- 4 verified gaps identified (with file:line cite)
- 4 patches written (full Go code, 3-org-distinct SOTA refs)
- 4 staging files written (clean splices the operator pastes)
- 1 apply.ps1 + 1 SWAP-PROCEDURE.md (two paths to land)
- 1 VERDICT-LEDGER.md (sca-v13 schema)
- 1 OPERATOR-RUNTIME-MITIGATION.md (zero-code-change M1-M3 take effect NOW)

The remaining work is **operator hands-on**: clone → splice → test → build →
swap. Estimated 10 min for SPLICES (Patches 1-2), 30 min for full set including
breaker + AIMD wire-up.
