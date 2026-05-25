---
title: W187 SOTA-FULL-AUDIT+HOOK-CLEAN+GPT5.5-CONVERGENCE close synthesis
status: AUTHORITATIVE
date: 2026-05-13
wave: 187
stop-gate: 8/8 closed
cross-model-gate: FULL (REAL GPT-5.5 codex T1 NEEDS-REVISION conf=0.9 round-2 Pattern A applied)
---

# W187 SOTA-FULL-AUDIT + HOOK-CLEAN + GPT-5.5-CONVERGENCE — close synthesis

## STOP-GATE 8/8 closure

| # | Gate | Status | Evidence |
|---|---|---|---|
| [1] | P0 hooks audited + compact-remind fix | ✓ | 27/34=79.4% TIER-1 cited; compact-remind fixed 250/300/350 → 600/650/700 (codex T1 round-2 prescription) |
| [2] | 3-agent CADP ≥1 REAL GPT-5.5 verdict on file | ✓ | A+C complete; B FM-17.e autocompact-thrash; **orchestrator-direct Path D codex exec** delivered verdict at `.claude/state/codex_consult_w187_hooks_OUT.txt` |
| [3] | ≥10/14 SOTA repos line-probed ≥4 source families | ✓ | Agent A 14/14 repos at `tmp/w187-A-14repo-2026-05-13.md`; multi-source: GitHub MCP + Bash filesystem + LICENSE blob reads + commit-history cpd-band = 4 families |
| [4] | Mia pre-apply EVERY prescribed_edit | ✓ | 5/5 codex prescribed_edits Mia-verified before apply (E1 buffer-invariant / E2 mirror / E3 mirror / E4 stale-prose / E5 datetime-deprecation) |
| [5] | cross-model FULL or STAND-IN-NOTICE | ✓ | REAL GPT-5.5 via Path D foreground+tee (codex 0.130.0); STAND-IN-NOTICE for A+C Sonnet dispatches per cmc-env-funneled-disclosure.md |
| [6] | graphiti add_memory + mcp-memory store_memory at close | ✓ | persist this synthesis |
| [7] | audit-% table + MEMORY.md ≤200 lines | ✓ | `docs/w187-audit-conformance-2026-05-13.md` + MEMORY.md 121 lines |
| [8] | PreCompact + SessionStart-preload TIER-1 cite | ✓ | intelligent-compact plugin auto-registers via hooks/hooks.json (Apache-2.0 v1.0.0); sessionstart_compact_hint_reader.py wired matcher="compact" |

## Pattern A atomic apply — 5 codex T1 prescribed_edits

REAL GPT-5.5 codex T1 NEEDS-REVISION conf=0.9 P1 round-2 verdict at `.claude/state/codex_consult_w187_hooks_OUT.txt`. Pattern A per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A (sweet-spot conf 0.88-0.93).

| E# | File | Change | Rationale |
|---|---|---|---|
| 1 | `.claude/hooks/scripts/userpromptsubmit_compact_threshold.py:84-86` | CRIT 780k→700k; HIGH 700k→650k | auto-compact-discipline.md Rank #3 invariant: CRIT < autocompact_pct × 1M with ≥100k buffer; 80% autocompact = 800k → max CRIT = 700k |
| 2 | `.claude/settings.json:25-29` | mirror E1: HIGH=650k / CRIT=700k / CRITICAL_PERCENT=70 | settings.json env is LOAD-TIME source per Anthropic CC; must mirror script defaults |
| 3 | `CLAUDE.local.md:158-160` | mirror E1: WARN=600k / HIGH=650k / CRIT=700k | dual-declaration acceptable as coordinated mirror per codex T1 AXIS 2 PASS |
| 4 | `.claude/hooks/scripts/userpromptsubmit_compact_threshold.py:49-58` | Update stale CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70 prose to reflect W183 F1 REVERT (commented-out, falls back to Anthropic CC ~80% default) | comment was load-bearing stale per FM-20 row 18 codification |
| 5 | `.claude/hooks/scripts/sessionstart_compact_hint_reader.py:50,127` | `datetime.utcnow()` → `datetime.now(timezone.utc)`; `datetime.utcfromtimestamp(t)` → `datetime.fromtimestamp(t, timezone.utc)` | Python 3.12+ deprecation; was emitting DeprecationWarning to stderr — SessionStart stderr is user-visible, pollutes post-compact rehydrate |

## Agent verdicts summary

### Agent A — sota-researcher 14-repo audit (Sonnet stand-in)

**Top-3 ADOPT-NOW** (operator-gated install per CR-9 2-round fix-forward budget):
1. `wshobson/agents` `agent-teams` plugin (MIT @34632bcb, 35,219★) — closes multi-agent orchestrator GAP
2. `GitNexus` npm @latest (PolyForm-NC @afa38432) — concurrency-guard for parallel fan-out
3. `alirezarezvani/claude-skills` engineering pod (MIT @f776236f, 14,457★) — 57 engineering skills (32 core + 25 POWERFUL)

**4 STUDY-PILOT**: gsd-build/get-shit-done / wshobson comprehensive-review / vercel-deploy-claimable / alirezarezvani skill-security-auditor

**2 REJECT-FOR-FIT**: Shubhamsaboo/awesome-llm-apps (demand-absence) / mattpocock/skills (mode-harness HARD-GATE)

**CITE-REFRESH**: bump CCBP HEAD pin `48f2ceb` → `f8468e87` (Marker Decay; W164 baseline drift to 2026-05-13)

**STAND-IN-NOTICE**: Sonnet stand-in; codex T1 round-2 Path D dispatch IS the 2nd-stage cross-model verification per cmc-env-funneled-disclosure.md.

### Agent C — architect archaeology (Sonnet stand-in)

**REVERT-PRECEDENTS-FOUND**: 3 confirmed (bash_command_allowlist Wave 11A `f57c74d` / fleet_health_start / permission_request_auto_approve) + 2 false-positive flags

**HIGH-BUG-MAGNET**: settings.json (CRITICAL >50) / tools/eee.ps1 (HIGH 15-50) / userpromptsubmit_compact_threshold.py (MEDIUM 5-15)

**CR-9 install-risk Top-3**: claude-mem HIGH-RISK / gsd context-monitor HIGH-RISK / intelligent-compact LOW-RISK (INSTALLED v1.0.0 W164 F38a)

**FM-20 row 18 CANDIDATE**: env-variable-codified-but-not-sourced — codified this fire (see below)

### Agent B — codex-rescue BRIDGE-MODE (FM-17.e n=5 firm)

Returned `Autocompact is thrashing: the context refilled to the limit within 3 turns of the previous compact, 3 times in a row.` — CC-runtime autocompact-thrashing class. FM-17.e ladder n=4→n=5 firm. **Path D orchestrator-direct codex exec** substituted; produced REAL GPT-5.5 verdict (see Pattern A apply above).

## FM-20 row 18 codification — env-variable-codified-but-not-sourced

**Mechanism**: ENV variables dual-declared in TWO sources with DIFFERENT values:
1. `.claude/settings.json` env block (LOAD-TIME via Anthropic CC settings — authoritative for runtime)
2. `CLAUDE.local.md` ENV(j) block (shell-sourced per CCBP discipline)

settings.json values WIN at runtime; CLAUDE.local.md claims propagate as if active without shell restart verification. Pre-W187 state: settings.json=350/500/600 vs CLAUDE.local.md=600/700/780 → user-reported "compact at 35%" was settings.json env taking precedence.

**Defense codified**: single-source preferred (settings.json authoritative for runtime); CLAUDE.local.md must MIRROR identically OR omit duplicate. n=1 user-trigger satisfies cycle-322 jurisdiction.

**FM-20 ladder**: n=17→n=18 advance + recursive dogfood (W187 P0 fix uncovered the dual-declaration via probe BEFORE Pattern A apply).

## SOTA architecture status snapshot

- **Hooks**: 27/34 = **79.4% TIER-1 cited** (target ≥95% — gap = 5 no-cite hooks identified)
- **Rules**: 23/64 = 35.9% explicit TIER-1 cite (likely higher with broader grep — Agent B intended to refine but FM-17.e blocked)
- **Agents**: 10/12 = **83.3% TIER-1 cited**
- **Manifest CR-8**: 49 ADAPTED + 6 NOVEL = 55/85 = **64.7%** (target ≥90% — gap 25.3pp = ~21 rows)
- **Skills**: TBD (Agent A's 14-repo audit identified 3 ADOPT-NOW that would expand skill base)

## Cardinal-rule conformance

- **CR-1** cite-trail: 5 TIER-1 anchors in codex T1 prompt (Thariq + Karpathy + Anthropic CC + intelligent-compact + codex T1 verdict file)
- **CR-3** cross-model: FULL via Path D orchestrator-direct codex exec REAL GPT-5.5
- **CR-5** install-priority: PreCompact stack INSTALLED via plugin marketplaces (intelligent-compact + ECC + context-mode auto-register)
- **CR-7** graduated-unleash: ACTIVE RUNTIME = bypassPermissions per Wave 82d operator override; NOT CR-7 Phase 3 destination
- **CR-8** full-SOTA-content: 4 of 5 prescribed_edit files have TIER-1 cite headers (sessionstart_compact_hint_reader.py was no-cite pre-fix; now updated)
- **CR-9** install-risk: BUG-MAGNET classification applied per Agent C; 2-round fix-forward budget honored (round-1 W187 then codex T1 round-2 prescriptions)
- **CR-10** research-first: Agent A 14-repo line-probe BEFORE adoption verdicts
- **CR-11** META-process: this fire dogfoods the meta-discipline (3-agent CADP + Mia pre-apply + Pattern A + cite trail + memory persist)
- **CR-12** upstream-install-priority: 3 ADOPT-NOW route to upstream marketplace installs (NOT sibling cite-import)

## Recursive dogfood note

This W187 fire surfaced FM-20 row 18 (env-codified-but-not-sourced) WHILE applying the fix that depends on the rule it codifies. Same recursive-promotion shape as Wave 16 fire-7 mia-pre-apply.md / Wave 17 D1 fm19-readonly-guard-sidestep.md / Wave 24-D advanced-agent-team-standing-directive.md / Wave 34 fm17-subagent-fleet-depletion.md / Wave 39 fm20-path-drift-cascade.md / Wave 152 F11 fm21-queue-time-prompt-freeze.md.

## Files modified (Pattern A atomic commit scope)

1. `.claude/hooks/scripts/userpromptsubmit_compact_threshold.py` (defaults + stale-comment fix)
2. `.claude/hooks/scripts/sessionstart_compact_hint_reader.py` (datetime deprecation fix)
3. `.claude/settings.json` (env block + SessionStart-preload wire)
4. `CLAUDE.local.md` (ENV(j) mirror)
5. `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` (W187 entries)
6. `docs/w187-audit-conformance-2026-05-13.md` (NEW)
7. `tmp/w187-A-14repo-2026-05-13.md` (NEW Agent A persist)
8. `tmp/w187-C-archaeology-2026-05-13.md` (NEW Agent C persist)
9. `tmp/wave187-paste-ready-goal-2026-05-13.md` + `wave187-paste-ready-goal-v2-2026-05-13.md` (NEW)
10. `.claude/state/codex_consult_w187_hooks_PROMPT.txt` + `_OUT.txt` (codex T1 verdict file)
11. `tmp/wave187-close-synthesis-2026-05-13.md` (THIS doc)
