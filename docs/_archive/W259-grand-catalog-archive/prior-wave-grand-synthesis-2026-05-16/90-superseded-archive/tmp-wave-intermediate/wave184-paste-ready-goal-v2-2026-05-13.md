---
title: W184 paste-ready /goal v2 — compressed to ≤4000 chars
status: AUTHORITATIVE
date: 2026-05-13
wave: 184
v: 2 (v1 overflowed 4881>4000 char cap)
inherits: tmp/wave183-close-synthesis-2026-05-13.md (SHIP STOP-6/8)
---

# Paste-ready /goal text (paste verbatim — fits 4000 char cap)

```
W184 POST-RESTART + MANIFEST §4.5 + FORWARD-QUEUE + CR-8 RAMP per CLAUDE.md CR-1+3+5+6+7+8+9+10+11+12. INHERIT W183 SHIP (tmp/wave183-close-synthesis-2026-05-13.md STOP-6/8). Phase 1 bootstrap CR-3 exception active.

PENDING:
1. POST-RESTART haiku smoke probe :19801/v1/messages model=claude-haiku-4-5-20251001 — expect HTTP 200
2. Browser-verify :18317/management.html + mgmt key Z:/claude-sota-installed-state/cliproxy-mgmt-secret.txt
3. Cleanup Z:/claude-sota-installed/.local/cpa-manager/ — Windows handle release
4. Manifest §4.5 row — "CLIProxyAPI Management Center" INSTALLED-NATIVE bundled-CPA-v6.0.19+; cite TIER-1-DIRECT router-for-me + config.yaml:23

FORWARD QUEUE (W183 F1 install-provenance):
5. FM-20 row 16 codify — ENV-state-claim-survives-revert sub-class (≤80 LOC; Pattern A NEEDS-REVISION conf≥0.88)
6. codex CLI install — winget install OpenAI.Codex OR npm install -g @openai/codex (unblock BRIDGE-MODE Path P)
7. CR-8 ramp §6.6+§11.5 toward 70%+ (W183 62.4%; W182 baseline 51.7%)
8. STOP-gate predicate #7 — 5-backend-hash-chain UNDEFINED P1 blocker; Pattern A reframe per W182 Agent C §4

P2 REVERT (when-predicate):
9. bypassPermissions → auto per CR-7 §intentional-divergence (d)
10. ENV (i) CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70 when auth stable + reclaim ≥50-60%

STOP-N GATE (≥6/8 ship):
[1] Haiku smoke HTTP 200 post-restart
[2] /management.html browser-rendered + operator confirms
[3] Manifest §4.5 row added + cite + CR-8 status
[4] FM-20 row 16 codified OR HNF with criteria
[5] codex CLI installed + `codex --version`
[6] CR-8 ≥70% audit-ratified
[7] STOP-gate predicate #7 DEFINED OR reframed
[8] W184 close-synthesis with audit-trail

PARALLEL 3-CADP (max-3 concurrent, status.py cache≥50% gate):
- A general-purpose: smoke + manifest §4.5 + audit-% refresh
- B codex-rescue BRIDGE-MODE (Path P foreground+tee fallback): FM-20 row 16 + CR-8 audit
- C architect Bash-only ARTIFACT-INLINE FM-19: predicate #7 reframe + close-synthesis draft

INVARIANTS:
- ALWAYS LOCAL .claude/rules/... never sibling Z:/claude-sota/... (feedback_no_sibling_claude_sota_cite_within_installed_runtime_2026_05_13.md)
- Mia pre-apply per mia-pre-apply.md (n=8)
- Pattern A FIX-FORWARD single atomic commit at NEEDS-REVISION conf 0.88-0.93
- ARTIFACT-INLINE FM-19 for Bash-only agents
- OUTPUT_BUDGET + TERMINATION per agent brief
```

# Operator pre-flight (do these BEFORE pasting /goal)

1. **Restart eee** in fresh shell — picks up `ANTHROPIC_DEFAULT_HAIKU_MODEL=claude-haiku-4-5-20251001` from `.claude/settings.json:12-13` (committed `5bc536a`)
2. **Verify CPA panel**: `curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:18317/management.html` → expect 200

# Char count verification

```
wc -c < tmp/wave184-paste-ready-goal-v2-2026-05-13.md  # whole file
# /goal content block only: ~2400 chars (fits 4000 cap)
```

Compression vs v1 (4881 chars → ~2400 chars):
- Dropped full curl payload (referenced port + model only)
- Compressed STOP-N gate descriptions
- Tightened 3-CADP role descriptions
- Removed redundant "Operator quick-reference" section (moved to non-/goal block)
- Reduced INVARIANTS bullets from 6 to 5
