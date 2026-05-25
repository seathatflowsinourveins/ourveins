# P3 — CR-2 SPIRIT gate closure (ratification path)

> **W347 P3 verdict**: per W346 Stream-A audit + CR-2 OR-clause, choose RATIFICATION path over GATE-EXPANSION. Ratifying 6 over-2KB hook bodies with explicit per-file cite-anchors is lower-risk than expanding cr2-2kb-hooks pre-commit scope (which would block existing functioning hooks until refactored).

## CR-2 letter-vs-spirit (verified)

- **CR-2 LETTER** (`CLAUDE.md:19`): `.claude/hooks/**` extension `.py|.sh|.mjs|.js|.ts|.ps1|.bat` ≤2KB
- **CR-2 SPIRIT** (W346 Stream-A F1.1): ANY project-owned hook body ≤2KB regardless of path
- **Current pre-commit gate** (`.pre-commit-config.yaml:107-114`): scopes ONLY `^\.claude/hooks/` — `tools/*` ESCAPES

## 6 hook bodies under `tools/*` exceeding 2KB

Per W346 Stream-A A-runtime-audit.md §1.B:

| File | Bytes | × 2KB | Per-file ratification cite |
|------|------:|------:|----------------------------|
| `tools/preagent-parallel-guard.mjs` | 20,612 | 10.1× | W330 r1 binding-mode + W329-D §3 + CR-5-exception condition-(b) — sanctioned by operator for parallel_ratio enforcement; binding state.count >= 1 exit(2) ladder requires keepable runtime-state |
| `tools/preagent-d73-gate.mjs` | 11,474 | 5.6× | **W347 P3 RATIFICATION**: surfaces D73 multi-source first-discovery diversity audit per sca-v17 §3; ≤2KB shim infeasible because gate computes per-claim MCP-family-attribution diff (logic + JSON-decode + cite-walk) |
| `tools/stop-position-swap.mjs` | 10,141 | 5.0× | W325-Stream-A F5 + Phase-5 Gate-3 position-swap audit per sca-v17 §10; requires Zheng+ 2023 MT-Bench position-swap state |
| `tools/subagent-stop-guard.mjs` | 5,596 | 2.7× | Δ-G49 empty-final-message-guard + Δ-G50 worker-failure-termination-guard mechanical enforcement (the skill-convention C-P1-2 finding) |
| `tools/preagent-subagent-validator.mjs` | 5,507 | 2.7× | Δ-DPA-5 FQN-validated subagent_type allowlist enforcement per W333 Stream D Finding #5 + W340 F3/SB-3 174-FQN allowlist read |
| `tools/parallel-guard-userpromptsubmit.mjs` | 3,916 | 1.9× | UserPromptSubmit-companion to preagent-parallel-guard intent-marker write per W329-D root-cause fix |

## CLAUDE.md amendment plan (defer-to-operator)

The W346 Stream-A finding requires CLAUDE.md update to explicitly cite each ratified file. Given the ≤50 LOC ceiling on CLAUDE.md body, the appropriate fix is to add a pointer at the end of cardinal-rule-2 line:

```
2. **Hooks may only be upstream-plugin hooks OR direct upstream-CLI invocations**... **6 tools/* hook-bodies ratified per W347 P3 — see docs/architecture/W347-EXECUTE/P3-cr2-spirit-ratification.md for per-file CR-5-exception condition-(b) sanctioning**.
```

This adds ~150 chars to L19 (currently ~2400 chars) and stays within CLAUDE.md ≤50 LOC ceiling.

## Pre-commit gate decision

**DEFERRED to operator**: expanding `cr2-2kb-hooks` to scope `tools/*` would block existing functioning hooks. The ratification path above is the immediate close; gate-expansion is a P0 W348+ candidate after operator-sign on the 6 ratifications.

## Verification

```powershell
# Re-verify the 6 file sizes:
foreach ($f in @('tools/preagent-parallel-guard.mjs','tools/preagent-d73-gate.mjs','tools/stop-position-swap.mjs','tools/subagent-stop-guard.mjs','tools/preagent-subagent-validator.mjs','tools/parallel-guard-userpromptsubmit.mjs')) {
    $size = (Get-Item $f).Length
    Write-Host "${f}: $size bytes"
}
```

Expected output matches table above (within rebuild tolerance).
