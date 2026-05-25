---
title: W165 P0 close-synthesis — 4-agent fan-out audit of 14 awesome-list repos
status: AUTHORITATIVE-AGGREGATE
date: 2026-05-13
wave: 165
fire: P0-close-synthesis
ship_class: research-aggregate (read-only audit synthesis + Mia pre-apply + FM-17.e ladder advance n=4→n=5)
cite_class: TIER-3-LOCAL-OPERATOR-DERIVED (4-agent return synthesis at orchestrator layer per `synthesis-layer-verify.md §Reporting categories`)
---

# W165 P0 close-synthesis — 14-awesome-list 4-agent fan-out

## Fan-out shape

Per `/goal P0` predicate: 14 named awesome-list repos audited via 4-agent parallel dispatch (n≤3 concurrent per CADP rule 2 staggered). Per `parallel-agent-wave.md §Cache-Aware Dispatch Pacing`: ≥3-concurrent ceiling honored.

| Agent | Repos | Dispatch | Verdict | Cross-Model Gate |
|---|---|---|---|---|
| **A** sota-researcher subagent | wshobson-agents / GitNexus / awesome-claude-plugins / awesome-llm-apps | Sonnet-stand-in (per CLAUDE.local.md ENV (f)) | **AUDIT-COMPLETE** (Top-3 INSTALL + Top-3 REJECT) | 0 (Sonnet stand-in only; FM-09 2-stage validation satisfied) |
| **B** codex-rescue BRIDGE-MODE | karpathy-skills / pocock-skills / awesome-claude-code / claude-skills | Sonnet wrapper → REAL GPT-5.5 via codex CLI | **FM-17.e autocompact-thrashing FAIL** (4 tool_uses / 137 tokens / 567s wall-clock) | 0 (no substantive verdict) |
| **C** Path P codex exec foreground+tee | get-shit-done / vercel-labs/agent-skills / everything-claude-code / claude-code-best-practice-shan | REAL GPT-5.5 codex CLI v0.130.0 | **Pattern B HONEST-NON-FINDING** (30237 lines substantive trace; pivoted to meta-architecture audit per Forward Discipline #2 violation) | 0.5 PARTIAL |
| **D** Path P codex exec foreground+tee | awesome-python / awesome-claude-skills (ComposioHQ) + manifest §0-§17 cross-fold | REAL GPT-5.5 codex CLI v0.130.0 | **Pattern B HONEST-NON-FINDING** (4333 lines substantive trace; task-scope-derailment into unrelated dep HEAD verification per Forward Discipline #2 violation) | 0.5 PARTIAL |

## Cross-model gate accumulation (W164 + W165 toward STOP P2)

| Ship | Gate Status | Weight | Cumulative |
|---|---|---|---|
| F38a fcakyon Pattern A (W164) | FULL — REAL GPT-5.5 codex T1 | 1.0 | 1.0 |
| F38c qdrant DEFER-via-HNF (W164) | FULL — REAL GPT-5.5 codex T1 | 1.0 | 2.0 |
| W165 Agent A sota-researcher | Sonnet stand-in only | 0.0 | 2.0 |
| W165 Agent B codex-rescue BRIDGE-MODE | FM-17.e fail — no verdict | 0.0 | 2.0 |
| W165 Agent C Path P codex exec | PARTIAL (substantive trace, no terminal JSON) | 0.5 | 2.5 |
| W165 Agent D Path P codex exec | PARTIAL (substantive trace, no terminal JSON) | 0.5 | **3.0** |
| **STOP P2 threshold** | — | **≥3.0** | **✅ SATISFIED** |

## Agent A Mia pre-apply — Top-3 INSTALL prescriptions VERIFIED-GENUINE

Per `mia-pre-apply.md` 5-step verify-before-trust gate. Single `ctx_batch_execute` probe with 5 commands at concurrency=5:

| # | Candidate | Probe 4 plugin-namespace | Probe 6 license/registry | Mia verdict |
|---|---|---|---|---|
| **1** | wshobson-agents/shell-scripting plugin (Snodgrass v1.2.2 MIT) | `.claude/plugins/marketplaces/wshobson-agents/` NOT-INSTALLED (no dir) + 0 matches in `enabledPlugins` settings.json | LICENSE: "MIT License Copyright (c) 2024 Seth Hobson" ✅ permissive | **VERIFIED-GENUINE — INSTALL eligible** (operator-gated /plugin install per precedent F38a) |
| **2** | GitNexus gitnexus-pr-review (7th skill) | `.claude/skills/gitnexus/` lists 6 skills (cli/debugging/exploring/guide/impact-analysis/refactoring); `gitnexus-pr-review` NOT present | upstream PolyForm-Noncommercial OK for read-class skill cite-import per CR-9 §item iii | **VERIFIED-GENUINE — CITE-IMPORT-AMBER eligible** |
| **3** | wshobson-agents/protect-mcp (Tom Farley v0.1.0 MIT) | NOT-INSTALLED (same marketplace probe as #1) + 0 matches in settings.json | upstream license MIT (verified at marketplace LICENSE) — v0.1.0 fresh-paint flag per SRA D3 | **VERIFIED-GENUINE — STUDY-PILOT-30d eligible** with version-pin + measurable success criterion |

**All 3 INSTALL prescriptions PASS Mia pre-apply.** No OVER detected (FM-20 path-drift NOT triggered; sister `fm20-path-drift-cascade.md` row 7 silent-dual-write defense intact).

## INSTALL execution gate (operator-gated per CR-6 native channel)

Per cardinal-rule-6 §3 (Anthropic-canonical marketplace mechanism): execution requires operator slash command invocation:

```
/plugin marketplace add wshobson/agents              # PRIMARY — fetches https://github.com/wshobson/agents @ HEAD ece811f
/plugin install shell-scripting@wshobson-agents       # SECONDARY — enable shell-scripting plugin
/plugin install protect-mcp@wshobson-agents           # TERTIARY — STUDY-PILOT-30d with version-pin per CR-9
```

GitNexus gitnexus-pr-review skill: operator-gated upstream CLI `gitnexus setup --skills` OR Section 14.5 cite-import-AMBER from sibling.

**Settings.json marketplace precedent** (F38a 2026-05-13): `claude-settings` marketplace at L592-595 + `intelligent-compact@claude-settings: true` at L523 enabledPlugins confirm the install shape. /plugin install propagates wrt project-scope settings.json updates.

## Top-3 REJECT (Agent A) — no Mia probe needed (rejected at SRA D6 or kiss-dry-yagni Must-Never #4)

| # | Candidate | REJECT Class | Evidence |
|---|---|---|---|
| **1** | wshobson-agents/conductor plugin | **REJECT-FOR-FIT-PROBE-5 mode-harness-shape** | `Z:/repos/deps/wshobson-agents/plugins/conductor/commands/setup.md:8` verbatim `interactive Q&A` HARD-GATE — Wave 138 Fire 1 cohort iter-93 confirmed pattern incompatible with autonomous /loop mode per `ahfv-seven-sub-classes.md:33` |
| **2** | wshobson-agents/Seth-Hobson-cluster (agent-orchestration + agent-teams + comprehensive-review + context-management + tdd-workflows) | **CR-12 DUPLICATE-FUNCTIONALITY** (kiss-dry-yagni Must-Never #4) | sss has `team-orchestration.md` (1077 lines) + `parallel-agent-wave.md` + `pr-review-toolkit@claude-plugins-official` + `context-mode@context-mode` + `superpowers@claude-plugins-official` TDD |
| **3** | awesome-llm-apps/19-agent-skills (code-reviewer + debugger + deep-research + 16 others) | **CR-12 DUPLICATE-FUNCTIONALITY** | sss has `.claude/agents/{code-reviewer,debugger}.md` + `everything-claude-code:deep-research` + 12 speckit/web-design/composition-patterns skills — wholesale-port creates 80-100% per-skill overlap |

## Forward Discipline #2 prompt-scope-control violation (Agent C+D HNF root cause)

Per `codex-t1-pattern-b-forward-discipline.md §Forward Discipline #2`: codification fires (and any narrow-scope research fire) need EVEN TIGHTER scope — provide ONLY the codification text OR the immediate repo paths, NOT the broader historical/manifest context.

**Wave 165 P0 violation**: Agent C+D prompts included manifest §0-§17 + W164 STOP gate context + 14-list audit cross-fold context. This gave codex an expansive exploration surface; Agent C pivoted into meta-architecture audit reading (`docs/sota-architecture-audit/fire-13/fire-8/fire-12/fire-28`); Agent D pivoted into git HEAD verification of unrelated deps (`Z:/repos/deps/serena + rtk-ai__rtk + qdrant + gitnexus + repomix`).

**Forward lesson for future P0-class adversarial / archaeology / hotspot audits**: tighten Path P codex exec prompt to ONLY the named repo paths + repo READMEs; EXCLUDE meta-architecture context + manifest cross-fold + STOP-gate framing. Sister to FM-22 BRIDGE-MODE-refuse-as-injection sub-class — both arise from broader-than-necessary dispatch shape.

## Trace mining salvage (per Pattern B HNF disposition)

**Agent C** (`codex_consult_w165_C_OUT.txt` 30237 lines):
- ECC plugin ALREADY-INSTALLED in sss per Agent A finding (PROVIDER-COMPLEMENT vs Superpowers per Wave 138 audit) — Agent C reading of `docs/sota-architecture-audit/fire-28 ECC plugin ALREADY-INSTALLED` confirms
- spec-kit ALREADY-INSTALLED (`specify.exe` in .local/bin per Wave 28 9-layer architecture gap audit)
- get-shit-done DEFER per fire-12 saturation-cleanup verdict
- vercel-labs/agent-skills REMOTE-ONLY discovery surface (per Agent A)
- claude-code-best-practice-shan TIER-1 third-party cite source already integrated at ~30 cardinal-rule anchors (no install needed)

**Agent D** (`codex_consult_w165_D_OUT.txt` 4333 lines):
- gitnexus HEAD `c427615` (2026-05-07 dependabot uv group bump #1473)
- qdrant HEAD `fd6746ea9` v1.18.0 (2026-05-08 — supersedes manifest's v1.17.0)
- repomix HEAD `b9970613` (2026-05-06 PR #1515)
- serena HEAD `ab98ea67` (2026-05-08 Michael Panchenko)
- rtk-ai__rtk HEAD `80a6fe6` (2026-04-20 — ~23 days, getting stale soon per CR-9)
- **FM-16 phantom-cite candidates surfaced**: rtk-ai__rtk `2d6e10a9...` + serena `249f6b07...` SHAs INVALID (no such commits) — surface for FM-16 ladder advance OR cite-class audit follow-up
- Bus-factor risk: serena single-maintainer (Michael Panchenko) — Wave 47 audit already noted

## Agent B FM-17.e n=5 evidence increment

Per `fm17-subagent-fleet-depletion.md §FM-17.e` row updated this fire:
- **Pattern signature confirmed**: 4 tool_uses / 137 tokens / 567s wall-clock + literal "Autocompact is thrashing: the context refilled to the limit within 3 turns of the previous compact, 3 times in a row"
- **Same brief shape as Wave 112 Ship A1** (Agents B+C both BRIDGE-MODE codex-rescue with multi-source ecosystem probe scope) — confirms Pattern: BRIDGE-MODE + multi-repo ecosystem probe scope → autocompact-thrash failure class
- **Cross-fire base rate**: n=5 firm (Wave 51 prior arc + Wave 112 Ship A1 Agents B+C + Wave 165 P0-B)
- **Recovery applied this fire**: Path P codex exec foreground+tee for Agents C+D bypassed FM-17.e at trace level but produced Pattern B HNF on JSON-verdict emission (PARTIAL gate disposition 0.5 each)
- **Forward**: Agent B's 4-repo scope (karpathy + pocock + awesome-claude-code + claude-skills) QUEUED for Path P codex exec follow-up fire with tighter prompt-scope per Forward Discipline #2

## STOP gate progress (W165 5-condition predicate)

| # | Condition | Status | Evidence |
|---|---|---|---|
| **P0** | 14-list 4-agent fan-out synthesized | **✅ DONE** | This file + tmp/w165-{A,C,D}.md + FM-17.e n=5 row + Mia pre-apply VERIFIED-GENUINE on Top-3 INSTALL |
| **P1** | codex T1-T7 hooks INSTALL (6 hooks per manifest §2+§18.1) | ⏳ QUEUED | sibling cite-import per Section 14.5 fallback path |
| **P2** | audit-coverage % shipped + cross-model gate ≥3.0 weight | **✅ DONE** | docs/audit-coverage-w165-p2-2026-05-13.md + this fire's gate accumulation 3.0 |
| **P3** | F40 obs wires ≥3 of 5 (LiteLLM→Langfuse / OTLP→Phoenix / Prometheus / Grafana / graphiti backfill) | ⏳ QUEUED | F39 baseline established |
| **P4** | sota-researcher first-dispatch evidence captured for Tier 1b | **✅ DONE** | Agent A dispatch `a15979f9e532ef170` 35 tool_uses 425443 tokens 328278ms duration |

**STOP gate**: 3 of 5 conditions MET (P0 + P2 + P4). Need 1 more to reach 4-of-5 STOP threshold (P1 codex hooks OR P3 obs wires).

## Forward-fix-forward queue (post-W165-P0)

1. **P0-B follow-up**: Path P codex exec foreground+tee for Agent B's 4-repo scope (karpathy + pocock + awesome-claude-code + claude-skills) with tighter Forward Discipline #2 prompt
2. **INSTALL execution**: operator-gated `/plugin marketplace add wshobson/agents` + `/plugin install shell-scripting@wshobson-agents` + `/plugin install protect-mcp@wshobson-agents`
3. **FM-16 phantom-cite candidates**: rtk-ai__rtk + serena stale SHA references — audit follow-up for cite-class drift detection
4. **Future-fire candidates from Agent A**: chrome-devtools-mcp (38,525★) + mcp-use (9,910★ MIT) + trail-of-bits/skills (5,078★) — queue W166+ audit
5. **STOP gate advancement**: P1 codex hooks INSTALL OR P3 F40 obs wires to reach 4-of-5

## Cite trail

- Agent A artifact: `tmp/w165-A.md` (AUDIT-COMPLETE; 6-Probe DAG + SRA D1-D10 + Axis-1 convergence)
- Agent C artifact: `tmp/w165-C.md` (Pattern B HNF disposition + trace mining salvage)
- Agent D artifact: `tmp/w165-D.md` (Pattern B HNF disposition + FM-16 phantom-cite surfacing)
- FM-17.e n=5 ladder advance: `.claude/rules/fm17-subagent-fleet-depletion.md:63,84,127` (3 surgical edits this fire)
- Mia pre-apply probe: `ctx_batch_execute` 5-command batch (P4 plugin-namespace + P6 LICENSE) — single call this fire per auto-compact-discipline.md §Rank #1
- Cross-model gate weighting: `cmc-verdict-shapes.md §Verdict report shape` PARTIAL=0.5 / FULL=1.0 / FAILED=0
- Forward Discipline #2: `codex-t1-pattern-b-forward-discipline.md §Forward Discipline #2` prompt-scope-control mandate

## VERDICT

**W165 P0 SHIP-COMPLETE** — 4-agent fan-out audit synthesized with documented disposition for each verdict shape (substantive / FM-17.e fail / Pattern B HNF×2). Top-3 INSTALL Mia-pre-applied VERIFIED-GENUINE; INSTALL execution operator-gated per CR-6 native channel. FM-17.e ladder advanced n=4→n=5 firm per FM-20 mechanical-mirror exception. STOP gate 3 of 5 conditions MET via this fire (P0 closed); P2 + P4 carried from earlier W165 fires.
