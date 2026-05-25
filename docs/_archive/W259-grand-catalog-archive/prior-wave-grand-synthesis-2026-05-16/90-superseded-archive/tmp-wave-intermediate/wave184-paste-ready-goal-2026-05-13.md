---
title: W184 paste-ready /goal — POST-RESTART VERIFY + MANIFEST §4.5 + FORWARD-QUEUE + CR-8 RAMP
status: AUTHORITATIVE
date: 2026-05-13
wave: 184
inherits: tmp/wave183-close-synthesis-2026-05-13.md (SHIP STOP-6/8)
mode: parallel-aware (3-CADP fan-out per parallel-agent-wave.md §CADP)
---

# Paste-ready /goal text (paste verbatim into next session)

```
/goal W184 POST-RESTART VERIFY + MANIFEST §4.5 + FORWARD-QUEUE + CR-8 RAMP per CLAUDE.md CR-1+3+5+6+7+8+9+10+11+12. INHERIT W183 close-synthesis SHIP (tmp/wave183-close-synthesis-2026-05-13.md STOP-6/8). Phase 1 bootstrap exception per CR-3 active until Tier 1a hooks INSTALLED.

PENDING (operator + session):
1. POST-RESTART smoke probe: curl http://127.0.0.1:19801/v1/messages -d '{"model":"claude-haiku-4-5-20251001","max_tokens":10,"messages":[{"role":"user","content":"hi"}]}' -H "Authorization: Bearer eee-fleet-key-orchestrator" — expect HTTP 200
2. Browser-verify panel: http://127.0.0.1:18317/management.html + mgmt key Z:/claude-sota-installed-state/cliproxy-mgmt-secret.txt
3. Cleanup Z:/claude-sota-installed/.local/cpa-manager/ — Windows handle release post eee restart
4. Manifest §4.5 row — "CLIProxyAPI Management Center" INSTALLED-NATIVE bundled-in-CPA-v6.0.19+; cite TIER-1-DIRECT router-for-me/Cli-Proxy-API-Management-Center README + CPA config.yaml:23 panel-github-repository field

FORWARD QUEUE (from W183 F1 install-provenance):
5. FM-20 row 16 codify — ENV-state-claim-survives-revert sub-class (≤80 LOC; Pattern A NEEDS-REVISION conf≥0.88)
6. codex CLI install — winget install OpenAI.Codex OR npm install -g @openai/codex (unblock BRIDGE-MODE Path P)
7. CR-8 conformance ramp — §6.6+§11.5 toward 70%+ (W183 +9 ADAPTED→62.4%; W182 Agent B baseline 51.7%)
8. STOP-gate predicate #7 — 5-backend-hash-chain UNDEFINED P1 blocker; Pattern A reframing per W182 Agent C §4

P2 REVERT-WHEN-PREDICATE:
9. permissions.defaultMode bypassPermissions → auto when 3-predicate hold (CR-7 §intentional-divergence (d))
10. ENV (i) CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70 re-enable when auth fleet stable + reclaim ≥SOTA 50-60% measured

STOP-N GATE (≥6/8 ship-ready):
[1] Haiku smoke HTTP 200 post-restart
[2] /management.html browser-rendered + operator confirms
[3] Manifest §4.5 CPA-Management-Center row added with cite + CR-8 status
[4] FM-20 row 16 codified OR HONEST-NON-FINDING with criteria
[5] codex CLI installed + `codex --version` returns vN.x.x
[6] CR-8 conformance ≥70% measured (audit ratifies)
[7] STOP-gate predicate #7 DEFINED OR alternative reframing
[8] W184 close-synthesis written with audit-trail + Pattern A apply log

PARALLEL-AWARE 3-CADP fan-out (max-3 concurrent until status.py cache ≥50%):
- Agent A (general-purpose Sonnet stand-in OR fork): smoke-probe execute + manifest §4.5 Edit + audit-coverage column refresh
- Agent B (codex-rescue BRIDGE-MODE; Path P foreground+tee per cmc-t1-t7-lifecycle §On codex unavailable if CLI unavailable): FM-20 row 16 codify + CR-8 audit refresh
- Agent C (architect Sonnet stand-in; Bash-only ARTIFACT-INLINE per FM-19): STOP-gate predicate #7 reframe + close-synthesis draft

INVARIANTS:
- ALWAYS LOCAL Z:/claude-sota-installed/.claude/rules/... never sibling Z:/claude-sota/... (feedback_no_sibling_claude_sota_cite_within_installed_runtime_2026_05_13.md)
- Mia pre-apply on every agent return (n=8 ladder per mia-pre-apply.md)
- Pattern A FIX-FORWARD single atomic commit at NEEDS-REVISION conf 0.88-0.93
- ARTIFACT-INLINE per FM-19 readonly-guard-sidestep for Bash-only agents
- OUTPUT_BUDGET + TERMINATION contract per agent brief
- Mechanical-mirror exception (cardinal-rule-1) only for pure pointer-extensions to settled upstream authority
```

# Operator quick-reference

**Before pasting /goal**:
1. Restart eee in fresh shell (picks up `ANTHROPIC_DEFAULT_HAIKU_MODEL=claude-haiku-4-5-20251001` from settings.json:12-13)
2. Verify CPA panel: `curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:18317/management.html` → expect 200

**Inherits from W183**:
- `tmp/wave183-close-synthesis-2026-05-13.md` (SHIP STOP-6/8)
- `tmp/wave182-close-synthesis-2026-05-13.md` (HOLD; W182 carry-forward predicate #7)
- `docs/install-provenance.md` W183 F3 row (CPA Management Center INSTALL audit-row)

**FM-20 row 16 candidate** (queued from W183 F1):
- Sub-class: ENV-state-claim-survives-revert
- Mechanism: ENV var documented in commit body as "active" but operator-reverted in same session; subsequent fires re-cite the stale active claim
- Evidence: W183 F1 ENV (i) `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` commented-out at commit but earlier turn body said "active"
- Recovery: Mia probe ENV state at session-resume + reconcile against commit-body claims

**Critical-path file paths**:
- `.claude/settings.json:12-13` (haiku canonical IDs — committed 5bc536a)
- `.cli-proxy-api/config.yaml:22` (panel disable flip — gitignored, live runtime state)
- `docs/install-provenance.md` (W183 F3 row — committed 6134f58)
- `docs/sota-installed-manifest.md` §4.5 (TO BE ADDED — W184 #4)
- `.claude/rules/fm20-path-drift-cascade.md` (row 16 candidate — W184 #5)
