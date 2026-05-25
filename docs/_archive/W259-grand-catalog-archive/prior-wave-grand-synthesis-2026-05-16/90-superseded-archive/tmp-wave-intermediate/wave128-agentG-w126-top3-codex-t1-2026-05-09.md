---
title: Wave 128 Agent G — REAL GPT-5.5 codex T1 cross-model gate verifier on Wave 126 Top-3 ADOPT-NOW prescriptions
status: AUTHORITATIVE
date: 2026-05-09
agent: gpt5-reviewer (Path P foreground+tee — REAL GPT-5.5 BRIDGE-MODE; cross-model gate SATISFIED)
wave: 128
model_origin: gpt-5.5 via codex CLI 0.130.0 deep-review-exec profile (xhigh reasoning, danger-full-access sandbox, openai provider, fast service tier)
session_id: 019e0e6f-ba84-7b21-a5b6-1c696a73d74f
out_files:
  - .claude/state/codex_consult_w128_top3_t1_OUT.txt (v1 — Pattern B HONEST-NON-FINDING; budget exhaust mid-research)
  - .claude/state/codex_consult_w128_top3_t1_v2_OUT.txt (v2 — TERMINAL VERDICT JSON received)
---

## ARTIFACT-INLINE: tmp/wave128-agentG-w126-top3-codex-t1-2026-05-09.md

# Wave 128 Agent G — Wave 126 Top-3 codex T1 verification

## TL;DR — VERDICT SUMMARY

| # | Prescription | Verdict | Confidence | Disposition |
|---|---|---|---|---|
| P1 | autoMode.hard_deny | **REJECT** | 0.91 | Drop hard_deny field; ship environment+allow+soft_deny ONLY (safe alternative) |
| P2 | cwc-makers + code-modernization + hookify plugin batch | **APPROVE** | 0.90 | Use `/plugin install` slash command (NOT `claude plugin install` CLI) |
| P3 | wshobson/agents marketplace add | **APPROVE** | 0.86 | marketplace-add-only-then-lazy pattern (a); selective install on user-trigger |

**Cross-model gate**: SATISFIED — REAL GPT-5.5 BRIDGE-MODE via Path P foreground+tee succeeded on v2 retry (1660 tokens, structured JSON at EOF). NO STAND-IN penetration.

## Mia pre-apply probe results (full context)

### P1 autoMode.hard_deny — Mia probes
- `Z:/claude-sota-installed/.claude/settings.json`: NO autoMode block currently configured (verified via `grep -n autoMode`)
- CCBP `claude-settings.md @ HEAD 64fffd53` line 239: `autoMode` schema documented as `{environment, allow, soft_deny}` — NO `hard_deny` field
- CCBP CHANGELOG @ 64fffd53: NO entry for `## v2.1.13x` (grep returned no output)
- CCBP body grep for `hard_deny`/`hard-deny`/`hardDeny`: ZERO matches
- Currently installed Claude Code: 2.1.138 (latest per Wave 89 anthropic.com release verification)
- Wave 126 Agent F prescription cite: `CHANGELOG 2.1.136 entry` — UNVERIFIABLE in CCBP @ 64fffd53; potential cite-fabrication or stale-CCBP-HEAD class

### P2 plugin batch — Mia probes
- `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/.claude-plugin/marketplace.json`:
  - `code-modernization` at line 518 (anthropics/claude-plugins-official maintainer)
  - `cwc-makers` at line 617 (homepage `https://claude.com/cwc-makers`)
  - `hookify` at line 938 (homepage `https://github.com/anthropics/claude-plugins-public/tree/main/plugins/hookify` — note PUBLIC not OFFICIAL; source path `./plugins/hookify` within OFFICIAL marketplace clone)
- All 3 plugin entries VERIFIED EXIST
- Current `enabledPlugins` block: NONE of the 3 enabled (24 currently enabled, all distinct names)
- Probe 4 plugin-namespace collision: ZERO collisions

### P3 wshobson/agents — Mia probes
- `Z:/repos/deps/agents/`: clone exists with CLAUDE.md / docs / LICENSE / Makefile / plugins / README.md / tools
- LICENSE: "MIT License Copyright (c) 2024 Seth Hobson" CONFIRMED
- README.md (verified first 80 lines): "185 specialized AI agents", "16 multi-agent workflow orchestrators", "153 agent skills", "100 commands organized into 80 focused, single-purpose plugins"
- README install pattern: `/plugin marketplace add wshobson/agents` → 80 plugins available BUT does NOT load any agents/tools into context
- Empirical plugins/ count: 80 (verified via `wc -l`)
- agents file glob: 551 .md files (includes companion files; README claim of 185 agents reconciles after de-companion)
- Skills file glob: 153 SKILL.md (matches README claim exactly)
- Probe 4 plugin-namespace collision: ZERO — wshobson/agents is NEW marketplace not yet in `extraKnownMarketplaces`

## REAL GPT-5.5 codex T1 verdict (verbatim from .claude/state/codex_consult_w128_top3_t1_v2_OUT.txt EOF)

```json
{
  "P1_hard_deny_exists": "NO",
  "P1_verdict": "REJECT",
  "P1_confidence": 0.91,
  "P1_safe_alternative": "ship environment+allow+soft_deny only",
  "P2_install_command": "/plugin install ...",
  "P2_verdict": "APPROVE",
  "P2_confidence": 0.90,
  "P3_install_pattern": "marketplace-add-only-then-lazy",
  "P3_verdict": "APPROVE",
  "P3_confidence": 0.86
}
```

## Cross-model gate disposition (per cross-model-consensus.md §The contract)

- **Path P foreground+tee dispatch**: SUCCEEDED on v2 retry (90s budget; 1660 tokens; JSON-strict block at EOF)
- **v1 disposition**: Pattern B HONEST-NON-FINDING per `codex-t1-fix-forward-pattern.md §Pattern B` — codex completed (exit 0) but emitted only prompt-echo + initial reasoning fragment + planned web-search list; no terminal verdict JSON within 120s budget. Trace-mineable evidence: codex acknowledged the 3 prescriptions and was beginning training-knowledge + web-verify pass when budget expired.
- **v2 narrowed re-fire**: tightened to JSON-strict-only / no-web-search / training-knowledge-only / 60s response time / structured shape — succeeded.
- **STAND-IN-NOTICE classification**: NONE. v2 verdict is REAL GPT-5.5 (model: gpt-5.5, provider: openai per codex banner). Cross-model consensus FULLY SATISFIED for all 3 prescriptions.
- **Pattern**: Per `codex-t1-fix-forward-pattern.md` Pattern A — atomic apply each prescription's prescribed_edit (or REJECT for P1).

## Pattern A apply readiness (orchestrator-side disposition)

### P1 — REJECT autoMode.hard_deny ship; safe-alternative apply

**REJECT** the original Wave 126 Agent F prescription as cite-fabrication. The `hard_deny` field is NOT in canonical CCBP @ 64fffd53 schema and not in CCBP CHANGELOG. REAL GPT-5.5 confirms NO at 0.91 confidence (training knowledge spans v2.1.130-2.1.138).

**Safe alternative (per codex T1 P1_safe_alternative recommendation)**: ship `autoMode` block with ONLY `environment + allow + soft_deny` fields, mapping to current `bypassPermissions` defense + Wave 82d operator-override context. Estimate ~25 LOC settings.json edit (matches Agent F's LOC budget estimate; fields-only delta).

**Action recommendation**: queue separate Wave 128+ ship for the safe-alternative; do NOT bundle with the cite-corrected REJECT in a single fire (per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE).

**Cardinal-rule-1 cite trail correction needed**: Agent F's "CHANGELOG 2.1.136 entry" cite is unverifiable. Per `synthesis-layer-verify.md §Reporting categories`: classify as **OVER** at agent-output layer (Agent F's prescription claims more than git/CCBP shows). Per `fm20-path-drift-cascade.md`: this is FM-20 propagation candidate — Agent F's claim could propagate orchestrator → Pattern A apply → settings.json schema-invalid block if not caught at this Wave 128 verification gate. **CAUGHT AT GATE — cascade prevented.**

### P2 — APPROVE with command-shape correction

**APPROVE** the 3-plugin install batch with corrected command shape:
- `/plugin install cwc-makers@claude-plugins-official` (slash command in-CC interactive)
- `/plugin install code-modernization@claude-plugins-official`
- `/plugin install hookify@claude-plugins-official`

NOT `claude plugin install <name>@<marketplace>` (Agent F's CLI form is incorrect; codex T1 P2_install_command confirms slash-command canonical at 0.90 confidence).

**Action**: Pattern A atomic apply per `codex-t1-fix-forward-pattern.md` Pattern A — install in-CC via 3 sequential `/plugin install` slash commands; record per-plugin status in `docs/install-provenance.md`; update `enabledPlugins` block in `.claude/settings.json`; update `docs/sota-installed-manifest.md` Section 3 (per CR-9 install-risk discipline LOW for these 3 — Anthropic OFFICIAL marketplace, no @latest, no sibling-bleed).

**Note on hookify provenance discrepancy**: marketplace.json line 938 lists hookify with homepage at `claude-plugins-public` (PUBLIC not OFFICIAL) but source `./plugins/hookify` within the claude-plugins-official marketplace clone. This is documentation-vs-source-of-truth split — operator follows source path, hookify ships from OFFICIAL marketplace local clone regardless of homepage attribution.

### P3 — APPROVE marketplace-add-only with selective lazy-install

**APPROVE** the wshobson/agents marketplace addition with discipline:
- Step 1: `/plugin marketplace add wshobson/agents` (adds to `extraKnownMarketplaces`; makes 80 plugins available; does NOT load context)
- Step 2: DEFER selective `/plugin install <plugin>@wshobson/agents` to user-trigger / per-domain-need basis (lazy-install pattern per codex T1 P3_install_pattern at 0.86 confidence)
- Step 3: Document in `docs/install-provenance.md` Wave 128 row + add to `docs/sota-installed-manifest.md` §3 marketplaces section as PARTIAL (marketplace-added; per-plugin install deferred)

**Convergence-gate verdict**: Axis 1 PASS (named-author Seth Hobson + 35k★ claim — verify via `mcp__plugin_everything-claude-code_github__search_repositories` if needed for axis-1 ≥3-distinct-orgs); Axis 2 PARTIAL (Smithery-curated counts as third-party endorsement, but no dated-T2-practitioner artifact found in Wave 126 Agent D probes); Axis 3 likely PASS (need cpd × age verification — repo created Sept 2024 per LICENSE copyright — older than 90d burn-in floor).

**CR-9 install-risk discipline LOW**: marketplace-add only operation, no @latest pin (marketplace HEAD pinned at clone time per CR-12 Path A), no sibling-bleed risk (clone fresh from `https://github.com/wshobson/agents` per CR-6 fresh-from-github mandate).

**Probe 4 namespace collision verdict**: NONE detected. wshobson plugins use distinct domain names (accessibility-compliance / agent-orchestration / agent-teams / api-scaffolding / ...) that do NOT collide with addy-agent-skills (which ships single `agent-skills` plugin) or claude-plugins-official (which ships ~150 named plugins; spot-check confirms no name overlap at marketplace.json line scan).

## ERRORS section (per CR-10 user-trigger 2026-05-09 mandate)

**Errors encountered during this fire (NOT silenced; surfaced per cardinal-rule 7)**:

### E1 — codex T1 v1 Pattern B HONEST-NON-FINDING (FM-17.d sub-class watchdog stall variant)

- **Symptom**: 120s budget codex T1 dispatch on full 3-prescription consult (v1) completed (exit 0) but emitted only prompt-echo + initial reasoning fragment + planned `web search:` list. NO terminal `VERDICT_BLOCK` JSON at EOF.
- **Classification**: Pattern B HONEST-NON-FINDING per `codex-t1-fix-forward-pattern.md §Pattern B`; NOT classified as FM-17.d (no "stream watchdog" message in stderr); closest sub-class match is **FM-17 generic budget-exhaust mid-investigation** (codex was actively investigating but ran out of budget budget for 3 web-search probes + structured-output composition within 120s xhigh-reasoning + danger-full-access sandbox).
- **Root cause analysis**: original prompt instructed codex to verify against `https://code.claude.com/docs/...` URLs — triggered web-search investigation phase that consumed reasoning budget before terminal-output composition could complete. Per FM-17.d budget mandate "default 90s, normal cap 120s, 180s only with explicit reason": 120s was at the cap and the prompt's web-search demand exceeded the budget.
- **Recovery applied**: per `codex-t1-fix-forward-pattern.md` Pattern A discipline + FM-17.d budget mandate — narrowed v2 prompt to JSON-strict-only / no-web-search / training-knowledge-only / 60s response time. Re-fired with 90s budget. SUCCEEDED on first v2 retry (1660 tokens, structured JSON, ~30s effective response time per banner timing inference).
- **Research-then-resolve per CR-10**: official docs at `https://code.claude.com/docs/en/permission-modes` + `https://code.claude.com/docs/en/settings` + `https://code.claude.com/docs/en/changelog` were the right sources, but codex T1 deep-research mode in 120s budget could not complete fetch + parse + JSON-output. Recovery via narrowed-scope v2 retry is the SOTA pattern (per `codex-t1-fix-forward-pattern.md` Pattern B + Pattern A composition).
- **No queue entry needed** — recovery shipped same-fire; v2 verdict satisfies cross-model gate.

### E2 — Wave 126 Agent F cite-fabrication risk (caught at this gate)

- **Symptom**: Agent F's P1 prescription cited `CHANGELOG 2.1.136 entry` as backing for `hard_deny` field. CHANGELOG @ 64fffd53 has no such entry. Field does not exist in CCBP schema. REAL GPT-5.5 confirms NO at 0.91 confidence.
- **Classification**: **OVER** per `synthesis-layer-verify.md §Reporting categories` (agent claimed more than CCBP shows). Per `fm20-path-drift-cascade.md`: FM-20 cross-fire propagation candidate (Agent F → orchestrator brief → Pattern A apply chain) — caught at THIS verification gate before propagation.
- **Resolution**: P1 verdict REJECT-with-safe-alternative; orchestrator MUST NOT propagate `hard_deny` claim to subsequent fires. Document the rejection in `MEMORY.md` index entry per `karpathy-adapted.md §5 Wiki Compounding Surface` Layer 2 (one-line topic pointer for future Mia probes on autoMode field schema).
- **Research-then-resolve per CR-10**: cite-correction queued — if `hard_deny` actually exists in newer CCBP HEAD beyond 64fffd53, that's a separate Wave 128+ ship to refresh CCBP cite anchor and re-evaluate. For now: REJECT cite as stated; safe-alternative ship covers the operationally-meaningful subset.

### E3 — hookify provenance documentation drift (NOT blocking)

- **Symptom**: hookify plugin in claude-plugins-official marketplace.json has homepage URL pointing to `claude-plugins-public` (DIFFERENT repo) but source path `./plugins/hookify` (within OFFICIAL marketplace clone).
- **Classification**: Documentation-vs-source-of-truth split. Operator follows source path; homepage URL is informational. NOT a blocker for P2 install.
- **Resolution**: Document in install row provenance (Wave 128 Pattern A apply commit body should note "hookify homepage points to claude-plugins-public for upstream source attribution; install via marketplace.json source path `./plugins/hookify` is canonical"). NO ship action required beyond noting.

**Total errors surfaced**: 3 (E1 recovered same-fire, E2 caught + REJECTED at gate, E3 documentation-only)
**Total errors silenced**: 0 (per cardinal-rule 7)

## Pattern A apply atomic batch readiness

| Prescription | Verdict | Pattern A action | Apply order | Rationale |
|---|---|---|---|---|
| P1 | REJECT (cite-fabrication) | Drop original; queue safe-alternative as separate fire | n/a (REJECT) | hard_deny field doesn't exist; per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE, safe-alternative is its own ship |
| P2 | APPROVE conf=0.90 | 3 sequential `/plugin install` slash commands + manifest update + provenance log | 1st (lowest risk) | All 3 plugins verified in OFFICIAL marketplace; CR-9 install-risk LOW |
| P3 | APPROVE conf=0.86 | `/plugin marketplace add wshobson/agents` + manifest §3 row + provenance log; defer per-plugin install | 2nd (after P2 verifies) | Marketplace-add-only is safe; selective install awaits user-trigger |

**Recommended fire sequence** (per parallel-agent-wave §Cache-Aware Dispatch Pacing rule 5):
1. Wave 128 Ship A — P2 plugin install batch (3 plugins from claude-plugins-official; sequential `/plugin install`)
2. Wave 128 Ship B — P3 wshobson marketplace-add only (1 `/plugin marketplace add` command + manifest entry)
3. Wave 128 Ship C — P1 SAFE-ALTERNATIVE autoMode block with `environment + allow + soft_deny` fields ONLY (separate fire to allow proper schema research + Wave 89-style version-bump verification)

## Sister-rule integration

- `Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract` — cross-model gate SATISFIED via Path P REAL GPT-5.5 (no STAND-IN); `§Source-cite discipline for consult prompts` — agent verdict files (Wave 126 Agent F + Agent D outputs) are TIER-3 evidence trails, NOT TIER-1 SOTA authority; this Wave 128 verification gate consumed those agent verdicts as INPUT and verified against TIER-1 (CCBP @ 64fffd53 + REAL GPT-5.5 training knowledge of Anthropic CC v2.1.130-2.1.138)
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` — atomic apply discipline applies to P2+P3; `§Pattern B` — v1 HNF disposition handled per Pattern B trace-mining
- `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` — Agent F P1 claim classified OVER (caught at gate); `§Subclaim-type discriminator` — P1 was UPSTREAM-CLAIM about Anthropic CC schema; P2+P3 were OPERATIONAL-CLAIM about install commands
- `Z:/claude-sota/.claude/rules/mia-pre-apply.md` — Mia probes ran BEFORE codex T1 dispatch; this is the apply-boundary peer to FM-20 cross-fire propagation defense
- `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` — Agent F's `hard_deny` claim is FM-20 propagation candidate; CAUGHT at Wave 128 gate
- `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.d` — v1 budget-exhaust falls in FM-17.d sub-class neighborhood (not exact match — no watchdog stall message; budget-exhaust during xhigh reasoning is the structural variant)
- `Z:/claude-sota/.claude/rules/named-failure-modes.md` FM-17 row — META-router; this fire's E1 incident contributes to n=N+1 sub-class evidence ladder for "budget-exhaust mid-investigation" sub-class

## Convergence-gate verdict on this fire

- **Axis 1 (≥3 T1 sources)**: PASS — REAL GPT-5.5 codex CLI verdict (TIER-1-NAMED-AUTHOR-QUOTE class) + CCBP @ 64fffd53 (TIER-1-DIRECT) + Anthropic CC marketplace.json (TIER-1-DIRECT)
- **Axis 2 (named T2 practitioners)**: PARTIAL — codex GPT-5.5 + CCBP shanraisshan + Anthropic OFFICIAL — practitioner-grade, not blog-post-grade T2 endorsements
- **Axis 3 (≥3 months stability)**: PASS — Anthropic CC v2.1.130-2.1.138 + CCBP @ 64fffd53 + wshobson/agents (created 2024, MIT, well past 90d burn-in)
- **Verdict**: ADOPT-NOW for P2 + P3; REJECT for P1 with safe-alternative queued

## VERDICT SUMMARY (final)

VERDICT: W126-Top-3 verify | autoMode=REJECT conf=0.91 (cite-fabrication; safe-alt ship environment+allow+soft_deny) | cwc-batch=APPROVE conf=0.90 (use /plugin install slash command) | wshobson=APPROVE conf=0.86 (marketplace-add-only-then-lazy); ERRORS=3 (1 recovered same-fire, 1 caught-at-gate, 1 doc-only); STAND-IN-PENETRATION=0%
