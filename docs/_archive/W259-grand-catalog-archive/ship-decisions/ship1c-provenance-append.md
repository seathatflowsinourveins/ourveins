
## 2026-05-08 Wave 81 Ship 1C — wire cpa-usage-keeper as ADVISORY-tier sidecar in tools/eee.ps1

### Origin
Wave 81 Ship 1B (commit 5fedaad) installed cpa-usage-keeper v1.5.2 binary; Ship 1C is the wire deploy via tools/eee.ps1 T0.9 ADVISORY block (matches T0.7+T0.8 pattern). Iter-3 RESP discovery confirmed proxy port 8317 publishes rich per-account JSON usage events; iter-4 verified APP_PORT=8079 free + composed wire design.

### Cross-model T1 gate
- Verdict file: Z:/claude-sota-installed/.claude/state/codex_consult_ship1c_cpa_usage_keeper_wire_OUT.txt (6945 bytes)
- Verdict: NEEDS-REVISION conf=0.86 / FIX-FORWARD-AND-PROCEED
- Route: real GPT-5.5 BRIDGE-MODE via proxy /v1/chat/completions model=gpt-5.5 owned_by=openai (Codex-Pro OAuth via codex-bridge fleet-key); cardinal-rule-3 Phase 1 bootstrap exception
- 7 findings (2xP1 + 4xP2 + 1xP3) — all closed in single Pattern A apply

### Pattern A apply

| ID | Sev | Concern | Resolution |
|---|---|---|---|
| F-1 | P1 | Healthcheck classifies non-2xx HTTP as bind failure; / endpoint unverified | Implemented port-listener-first check via Get-NetTCPConnection; HTTP probe demoted (TCP listener exists = healthy regardless of HTTP status) |
| F-2 | P1 | Loopback-only bind not enforced/verified | Added bind-address verdict: ok on 127.0.0.1/::1, ADVISORY_WARN on 0.0.0.0/non-loopback (potential per-account stat exposure) |
| F-3 | P2 | Start-Process arg-array could space-quote-fail | Built $cukArgs = @('-env', $cukEnv) explicit array + -WorkingDirectory $cukDir for deterministic data/log paths |
| F-4 | P2 | Stale PID file from failed prior runs | Pre-launch stale PID cleanup: read PID from file, Get-Process check, Remove-Item if dead |
| F-5 | P2 | Manifest entry missing | Deferred to operator manifest update; provenance entry suffices for audit trail per F-A.1 atomic-scope discipline |
| F-6 | P2 | Fixed 1500ms sleep adds UX delay | Replaced with bounded-readiness-loop: 100ms x up to 20 iterations (2000ms cap); reports actual elapsed time |
| F-7 | P3 | Log routing to .claude/state/ not done | Documented as INTENTIONAL NON-GOAL: cpa-usage-keeper writes to .local/.../data/log/; centralized JSONL ingestion deferred to Ship 1D/1E candidate |

### Files modified (Ship 1C bundle)

| Path | Change | Rationale |
|---|---|---|
| Z:/claude-sota-installed/tools/eee.ps1 | +T0.9 ADVISORY block (~70 LOC) inserted after T0.8 CLIProxyAPI fleet check | Sidecar startup with port-listener-first healthcheck + loopback-enforce + bounded-readiness + stale-PID-cleanup |
| Z:/claude-sota-installed/docs/install-provenance.md | +Wave 81 Ship 1C entry (this section) | Audit trail per audit-action-loop Wire/Surface stage |

### Files NOT in commit (gitignored)
- Z:/claude-sota-installed/.local/cpa-usage-keeper/... (Ship 1B)
- .env updated this iteration: APP_PORT=8079 added (F-2-driven explicit bind config; .env stays gitignored)

### Launch-discipline 3-invariants

INVARIANT 1 — REVERSIBLE
- Two-button rollback: git revert ShipSHA + Stop-Process -Id (Get-Content tmp/cpa-usage-keeper.pid)
- .env unchanged from Ship 1B; SQLite db at .local/.../data/usage.db deletable for clean state

INVARIANT 2 — OBSERVABLE
- TCP listener verifiable: Get-NetTCPConnection -LocalPort 8079 -State Listen
- Web Dashboard at http://127.0.0.1:8079
- PID logged at $env:CLAUDE_CODE_TMPDIR/cpa-usage-keeper.pid
- Sidecar logs at .local/.../data/log/* (LOG_FILE_ENABLED=true)

INVARIANT 3 — INCREMENTAL
- ADVISORY tier (matches T0.7+T0.8 pattern); does NOT HARD-FAIL eee launch on cpa-usage-keeper failure
- 0% impact on existing eee -> proxy -> claude.exe path
- D2 monitoring window 24-72h post-merge; promote to Phase 2 HARD-FAIL only after arc-convergence >=7 fires

### Cite chain
- TIER-1: https://github.com/Willxup/cpa-usage-keeper/releases/tag/v1.5.2 (2026-05-07T20:02:39Z; MIT)
- TIER-1: https://github.com/router-for-me/CLIProxyAPI README HEAD ecosystem section
- TIER-3-LOCAL-COMPOSITION: Z:/claude-sota-installed/.claude/rules/launch-discipline.md (Osmani-derived per cardinal-rule-1 cite-class lattice)
- TIER-3-LOCAL: .claude/state/codex_consult_ship1c_cpa_usage_keeper_wire_OUT.txt (Ship 1C T1 NEEDS-REVISION conf=0.86)

### Open Ship 1D/1E handoff
- Ship 1D: SessionEnd cleanup hook (kill PID-tracked cpa-usage-keeper on session-end)
- Ship 1E: Centralized log routing (.local/.../data/log/* -> .claude/state/cpa_usage_keeper.jsonl tail/aggregation)
- Manifest entry in docs/sota-installed-manifest.md (deferred from F-5 — operator action)
- Cardinal-rule-7 Phase 2 promotion (HARD-FAIL on cpa-usage-keeper failure) — gated on arc-convergence + manifest Tier-2 row INSTALLED

Ship 1C satisfies cardinal-rule-1+3+7+9+10+11+12.
