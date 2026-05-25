

## 2026-05-08 Wave 82 Ship 1D — eee.ps1 hybrid auto-start + OAuth fall-through (closes ConnectionRefused incident)

### Origin
2026-05-08 11:00 incident: operator hit `API Error: Unable to connect to API (ConnectionRefused)` because eee.ps1:153 set ANTHROPIC_BASE_URL unconditionally + L399 advisory falsely claimed fall-through. Wave 82 3-agent SOTA team dispatch (CADP rule 2 max 3 concurrent; >=2 BRIDGE-MODE GPT-5.5) with Mia pre-apply on returned prescriptions + GPT-5.5 e2e review on synthesis verdict.

### Cross-model T1 gate (3-layer satisfied; SYSTEM-meta-review fallback per codex-t1-system-meta-review-fallback.md)
- Agent A: sota-researcher (Sonnet stand-in; STAND-IN-NOTICE present at agent layer)
- Agent B: codex-rescue BRIDGE-MODE -> real GPT-5.5 (cross-model gate at agent layer satisfied)
- Agent C: codex-rescue BRIDGE-MODE -> real GPT-5.5 (cross-model gate at agent layer satisfied; codex CLI thread `019e081e-62f1-7f23-9aea-404d38a79a2e`)
- Synthesis: GPT-5.5 via proxy /v1/chat/completions (cardinal-rule-3 Phase 1 bootstrap exception)
- Verdict file: .claude/state/codex_consult_wave82_synthesis_verdict_OUT.txt (APPROVE conf=0.9 / PROCEED-WITH-SHIP-1D-ONLY / 0 findings)

### 3-agent net verdicts
| Agent | Artifact | Verdict | Mia probes |
|---|---|---|---|
| A | tmp/wave82-ship1d-options-2026-05-08.md | RECOMMEND Option A+B hybrid | 5/5 PASS |
| B | tmp/wave82-cpa-manager-quota-deepdive-agentB-2026-05-08.md | HONEST-NON-FINDING + CPA-Manager Docker = optional Ship 1E | 3/3 PASS |
| C | tmp/wave82-cache-affinity-lease-design-agentC-2026-05-08.md | REJECT cache-affinity-routing-lease | 4/4 PASS |

### Pattern A apply (Ship 1D)
| File | Change |
|---|---|
| tools/eee.ps1:150-156 | Updated comment to reflect Ship 1D hybrid behavior (was false claim "claude.exe falls through directly") |
| tools/eee.ps1:392-440 | Replaced 10-line healthz try/catch with ~50-line hybrid: Option A auto-start (mirrors T0.9 cpa-usage-keeper) + Option B fall-through (Remove-Item Env: BASE_URL+AUTH_TOKEN -> OAuth at .claude/.credentials.json) |
| docs/install-provenance.md | +Wave 82 Ship 1D entry (this section) |

### Wave 80 framing corrections (forward-only per port-note-discipline.md §6)
1. "mr.euphoriaincarnate@gmail.com cap=0 = depleted-but-active bug" was MISCLASSIFIED. capacity_score is operator-maintained legacy snapshot, NOT runtime metric. Proxy uses Quota/Status/Unavailable/ModelStates for runtime decisions (cite: sdk/cliproxy/auth/conductor.go@785b00c:L471-L513). 429-on-depleted-account handled by cooldown machinery (cite: conductor.go@785b00c:L2388-L2415). disable-cooling: false (current config L47) is CORRECT for multi-account pools.
2. "Per-account cache-affinity routing lease is THE architectural gap" was OVER-claimed. CLIProxyAPI session-affinity 1h + message-hash fallback (cite: sdk/cliproxy/auth/selector.go:448-453,498-535,653-657 @ 785b00c3) is functionally equivalent for current 93.87% cache-read workload. Adding prefix-hash routing would WORSEN 18/19 account concentration.

### Open Ship 1E candidate (DEFERRED)
- CPA-Manager Docker port 18317 (seakee/CPA-Manager v1.1.7 243 stars MIT) — alongside Wave 81 Ship 1B+1C cpa-usage-keeper for unhealthy-account-discovery + cleanup workflows. Per F-A.1 ship-one-tool-at-a-time discipline.

### Cite chain
- TIER-1: https://code.claude.com/docs/en/env-vars (ANTHROPIC_BASE_URL semantics)
- TIER-1: https://code.claude.com/docs/en/authentication §Authentication precedence (subscription OAuth /login as FINAL fallback)
- TIER-1: Z:/repos/deps/CLIProxyAPI/internal/api/server.go:340-341 @ HEAD 785b00c3 (/healthz endpoint)
- TIER-1: Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:448-453,498-535,653-657 @ HEAD 785b00c3 (Mia VERIFIED 2026-05-08 11:00)
- TIER-1: Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/conductor.go:471-513,2388-2415 @ HEAD 785b00c3 (Mia VERIFIED 2026-05-08 11:00)
- OPERATIONAL-PROBE: Z:/claude-sota-installed/.claude/.credentials.json (471 bytes, claudeAiOauth, 2026-05-08T10:42; Mia VERIFIED)
- OPERATIONAL-PROBE: tools/eee.ps1:431-461 T0.9 cpa-usage-keeper precedent (Mia VERIFIED)
- TIER-3-LOCAL-COMPOSITION: launch-discipline.md §3 invariants (Osmani-derived)
- TIER-3-LOCAL: .claude/state/codex_consult_wave82_synthesis_verdict_OUT.txt (APPROVE conf=0.9)

Ship 1D satisfies cardinal-rule-1+3+7+9+10+11.
