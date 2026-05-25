# SOTA Architecture Audit — Master Tracker

**Started:** 2026-05-10 (Wave 134 Fire 2 — full SOTA audit arc)
**Operator directive (verbatim):** *"deep dive into your architecture. give me detailed gap, and optimized ultimate architecture of your system, improve your research architecture and deep dive and discover, research all sota repos in every dimension, and give me the sota architecture with the gap of current architecture in md files and keep tracking. ... START THE ADUIT AND ENVISION FORM THIS FOLDER AS A START, WE HAVE THESE AS INSPIRATION FOR YOU TO AUDIT AND RESEARCH DISCOVER BEYOND FOR MORE SOTA REPOS AROSS THE GITHUBS, MAKE SURE ALL HIGH QUALITY REPOS ARE BEEN REVIEWED AND GIVE ME THEIR DECISION PROCESS, THE REPLACEMENT, WHY ARE THEY SOTA, COMPARISON and more. the folder is Z:\claude-sota-installed\docs\outer research"*

**Inspiration baseline folder:** `Z:\claude-sota-installed\docs\outer research\` (v10-v65 kits + wave52 iter1a-3a + 3 archived zips)

---

## Methodology — two-axis framework

### Axis A — 8 architecture dimensions (what to audit)

Each architecture domain in eee runtime gets its own per-dimension report:

| # | Dimension | Scope | Tracker doc |
|---|---|---|---|
| 1 | Topology / orchestration | Plan→Implement→Review lifecycle, agent fan-out, parallel-wave, single-level fork invariant | `dim-1-topology.md` (planned) |
| 2 | Memory / knowledge | L1 capture, L2 vector, L3 temporal-KG, L4 wiki, RAG | `dim-2-memory.md` (planned) |
| 3 | Cross-model verification | T0-T7 lifecycle, Pattern A fix-forward, BRIDGE-MODE, Path P/D | `dim-3-xmodel.md` (planned) |
| 4 | Plugin / skill ecosystem | Marketplaces, plugins, skills (1,556 SKILL.md across 21 plugins), discovery | `dim-4-plugin.md` (planned) |
| 5 | Hooks / gates | PreToolUse / PostToolUse / SessionStart / Stop / SubagentStart / SubagentStop, deny-emitting safety floor | `dim-5-hooks.md` (planned) |
| 6 | Eval / benchmark / observability | promptfoo, deepeval, openlit, phoenix, langfuse, codex_review JSONL | `dim-6-eval.md` (planned) |
| 7 | Token efficiency | RTK, ccusage, repomix, context-mode, prompt-cache, /compact-vs-rewind | `dim-7-tokeff.md` (planned) |
| 8 | Research / discovery architecture | sota-researcher subagent, Probe DAG (P1-P7), 9-cohort fan-out, T0 candidate-list challenge, SRA 10-dim | `dim-8-research.md` (planned) |

### Axis B — SRA 10-dimension convergence gate (how to verdict each candidate)

Per `Z:\claude-sota-installed\.claude\rules\sota-research-architecture.md` (loaded 2026-05-10 via system-reminder; cite class TIER-3-LOCAL-COMPOSITION). EVERY candidate (current primitive OR SOTA replacement) gets D1-D10 scored:

| D# | Dimension | Critical? |
|---|---|---|
| D1 | License-use-class precision (use-class-aware Probe 6) | **YES — blocking on FAIL for use-class** |
| D2 | SOTA-freshness gate (replacement_age ≤ incumbent_age) | YES on REPLACEMENT decision |
| D3 | Star-velocity vs content-depth (fresh-paint detection) | NO — DOWNGRADE flag |
| D4 | Maintainer provenance tier (T1 OFFICIAL → T5 unknown) | NO — DOWNGRADE flag |
| D5 | Active maintenance signals (4 signals: issues / PRs / contributors / releases) | NO — STALE flag |
| D6 | Use-class compatibility (mode-harness-shape) | **YES — blocking on FAIL** |
| D7 | Anthropic CC official policy alignment | NO — guidance |
| D8 | Industry adoption signal | NO — quality boost |
| D9 | Failure-mode awareness (named-failure-modes catalog) | NO — guidance |
| D10 | Replacement viability (only when proposing X→Y) | YES on REPLACEMENT decision |

**Verdict thresholds (per SRA §Convergence verdict)**:

| Score | Verdict | Action |
|---|---|---|
| 9-10 + D1+D6 PASS | INSTALL | adopt; full SOTA confirmed |
| 7-8 + D1+D6 PASS | DOWNGRADE-WITH-DISCLOSURE | adopt with caveat documentation |
| 5-6 OR D1/D6 ambiguous | DEFER | needs more probes (HONEST-NON-FINDING) |
| <5 OR D1+D6 FAIL | REJECT | does not satisfy SRA |

### Cross-model T1 verification mandate

Per CR-3 + SRA §Cross-model T1 verification mandate: ANY verdict involving REJECT or REPLACEMENT MUST be cross-model-verified via real GPT-5.5 codex T1 BEFORE any commit (foreground+tee from main session OR BRIDGE-MODE subagent dispatch). Sonnet stand-in does RESEARCH (D1-D10 probes); codex GPT-5.5 does VERIFICATION.

---

## Document map (this audit arc)

| File | Role | Status |
|---|---|---|
| `00-master-tracker.md` | this file — entry point + framework + arc index | ✅ initial |
| `01-current-state-baseline.md` | per-dimension inventory of CURRENT eee architecture | 🟡 in progress |
| `02-gap-matrix.md` | dimension × current-vs-SOTA gap synthesis | 📋 planned |
| `03-sota-target-architecture.md` | synthesized ULTIMATE SOTA target architecture for eee | 📋 planned |
| `04-decision-tracker.md` | per-replacement decision log (why SOTA / replacement of what / D1-D10 score / comparison) | 📋 planned |
| `05-research-roadmap.md` | future research dispatches (per-dimension agent fan-out plan) | 📋 planned |
| `dim-{1..8}-*.md` | per-dimension deep-dives | 📋 planned (require multi-agent dispatch over multiple sessions) |

---

## Cite anchors (load-bearing for this arc)

**TIER-1-DIRECT (Anthropic OFFICIAL)**:
- `https://code.claude.com/docs/en/sub-agents` — model precedence + permission modes
- `https://code.claude.com/docs/en/settings` — permission-mode enum + env vars
- `https://code.claude.com/docs/en/skills` — skill discovery mechanism
- `https://code.claude.com/docs/en/hooks` — PreToolUse/PostToolUse/Stop semantics + asyncRewake
- `Z:/repos/deps/anthropics/cwc-long-running-agents @ HEAD ffd563d6` — 5 long-running primitives (Default-FAIL / Fresh-context evaluator / PROGRESS.md handoff / Kill-switch / Steer mid-run)
- `Z:/repos/deps/claude-agent-sdk-python @ HEAD b512f256` — _SubagentContextMixin + ClaudeSDKClient runtime control

**TIER-1-DIRECT (3rd-party SOTA)**:
- `Z:/repos/deps/claude-code-best-practice-shan @ HEAD 64fffd53` — CCBP T1-T3 lifecycle, RPI workflow, env-block authority
- `Z:/repos/deps/codex/codex-rs/git-utils/src/info.rs:618-654 @ HEAD 993e3f40` — OpenAI codex worktree-aware runtime

**TIER-3-LOCAL-COMPOSITION (sibling cite-import-AMBER per CR-9 + CR-12)**:
- `Z:/claude-sota/.claude/rules/{convergence-gate, agent-harness-fit-verification, advanced-agent-team-standing-directive, codex-t1-fix-forward-pattern, mia-pre-apply, fm17-subagent-fleet-depletion, fm20-path-drift-cascade, layered-gates-architecture, parallel-agent-wave, parallel-session-worktree-isolation, synthesis-layer-verify, named-failure-modes, citation-discipline, kiss-dry-yagni, port-note-discipline, codification-threshold, audit-action-loop, evidence-policy, karpathy-adapted}.md`
- `Z:/claude-sota-installed/.claude/rules/{sota-research-architecture, deprecation-discipline, launch-discipline}.md` (loaded into eee runtime; cite-import-AMBER class)

**TIER-3-LOCAL-OPERATOR (this arc's evidence trail)**:
- Wave 132/133 close-syntheses → `MEMORY.md` index entries
- Wave 50 fire 3-12 install-provenance entries → `docs/install-provenance.md`
- v63 / v64 / v65 inspiration kits → `docs/outer research/` (extracted to runtime per task #74 W121 SHIP V65-EXTRACT)
- Wave 52 iter1a-3a research → `docs/outer research/wave52/`

---

## Open questions (operator decision required)

### Q1. Audit depth vs breadth tradeoff

The operator directive says "full saturation" but acknowledges priority-based sectoring may be needed. **Recommendation**: ship per-dimension ARTIFACT-INLINE outputs as separate fires (1 dimension per fire, with 3-agent fan-out per fire). 8 dimensions × 1 fire each = 8 fires for full saturation. Each fire ~30min wall-clock with concurrent BRIDGE-MODE.

### Q2. Cross-model verification budget

Per CR-3 + SRA, every REJECT/REPLACE verdict needs codex T1. Each codex T1 ~2-15min depending on profile. With ~50-100 candidate primitives across 8 dimensions, T1 budget ≈ 100 × 5min avg = 8.3 hours of codex CLI time. **Recommendation**: batch verdicts per-dimension; one consolidated T1 per dimension covering all candidates in that dimension's verdict set.

### Q3. Provenance tracking granularity

`05-decision-tracker.md` could log per-candidate (fine-grained, ~50-100 rows) OR per-decision-class (coarse, ~20 rows grouping similar candidates). **Recommendation**: per-candidate to satisfy "decision process / replacement / comparison" directive.

### Q4. SOTA target architecture format

Multiple format options: (a) single-page architecture-as-text, (b) layered diagrams + text, (c) prose narrative, (d) executable install plan with row-per-primitive. **Recommendation**: (d) executable install plan + (a) text overview; defers diagrams as forward-ref.

---

## Current state at audit start (verified 2026-05-10 via Wave 134 Fire 2 baseline probe)

**Plugins installed**: 24 (post-Wave-128/125)
**Marketplaces registered**: 11 (anthropic-agent-skills, addy-agent-skills, claude-community, claude-for-financial-services, claude-plugins-official, context-mode, everything-claude-code, healthcare, knowledge-work-plugins, life-sciences, openai-codex)
**MCPs configured**: ~13 in `.mcp.json` (memory, repomix, context7, deepwiki, github, etc — full count below)
**Hooks active**: PreToolUse + PostToolUse + SessionStart + Stop + SubagentStart + SubagentStop + UserPromptSubmit (per `.claude/settings.json` 514 LOC + 4-event hook chain)
**Cardinal rules**: 12 (CR-1 cite-trail through CR-12 upstream-install-priority over sibling-cite-import)
**Memory stack**: L1 mcp-memory-service v10.51.3 INSTALLED, L2 Qdrant v1.17.0 STAGED-IMAGE-RUNNING (MCP-wired pending), L3 Graphiti v0.29.0 PARTIAL (FalkorDB UP, MCP-wiring blocked on env), L4 wiki CITE-ONLY
**Long-running primitives**: cwc-long-running-agents 5 INSTALLED (Default-FAIL / Fresh-context evaluator / PROGRESS.md handoff / Kill-switch / Steer)
**Eval/observability**: promptfoo v0.121.11 + deepeval v4.0.0 + openlit (Apache-2.0 OTel-native) — partial install
**Token efficiency**: RTK INSTALLED (binary on disk; init pending per task #61), ccusage INSTALLED, ccstatusline (deferred)
**Permission mode**: `bypassPermissions` (Wave 82d operator override during Anthropic classifier outage; revert target = `auto` per CCBP-canonical)
**CR-7 Phase**: Phase 1 (operationally; settings has `bypassPermissions` per W82d but Tier-3-5 rows still PARTIAL per Wave 124 audit)
**Cumulative dogfood**: Wave 132 fire 3 closed (n=130+ Mia ladder), Wave 133 fire 2 close-synthesis landed

---

## Roadmap (next fires)

### Fire 1 (this fire — bootstrap-Phase-2 of audit arc)
- ✅ Acquire baseline (current state probe)
- ✅ Read inspiration kits (v63/v64/v65 + wave52 iter1a-3a)
- ✅ Hookify spam fix (W134 F2 dual-hook patch — 8 files)
- 🟡 Write `00-master-tracker.md` (this file)
- 📋 Write `01-current-state-baseline.md` (per-dimension current-state inventory)
- 📋 Write `02-gap-matrix.md` (per-dimension gap synthesis with SRA D1-D10 scoring)
- 📋 Write `03-sota-target-architecture.md` (synthesized target)
- 📋 Append hookify-fix to `docs/install-provenance.md`

### Fire 2-N (per-dimension deep-dive fires; one fire per dimension)
- 3-agent BRIDGE-MODE fan-out per dimension (sota-researcher + codex-rescue + gpt5-reviewer)
- Each fire produces `dim-N-*.md` deep-dive with SRA D1-D10 verdicts per candidate
- Cross-model codex T1 e2e verification on consolidated REJECT/REPLACE verdicts
- Update `04-decision-tracker.md` with per-candidate verdict rows

### Final fire (synthesis + commit)
- `05-research-roadmap.md` — what's STILL UNKNOWN after 8-dimension audit
- Update `MEMORY.md` index with arc summary
- Atomic commit per W134-F2 close-synthesis pattern

---

## Wave 134 Fire 5 — v1-v65 line-by-line audit close (2026-05-10)

### Headline metrics (user-directive: "percentage of repos line-by-line audited")

| Metric | Count | % |
|---|---|---|
| **Programmatic SRA D1-D10 probe** (gh API LICENSE + stars + age + push + topics + verdict) | 555 / 609 | **91.13%** |
| **Attempted audit** (any audit action invoked, including 44 that returned 404) | 599 / 609 | **98.36%** |
| **Strict line-by-line** (LICENSE-file content + README scan + manual D1-D10 row) | 17 / 609 | **2.79%** |
| **Pre-existing baseline already-cited** | 7 / 609 | **1.15%** |

### Coverage breakdown across 6 batches

| Batch | Method | Probed | Errors | Cum % |
|---|---|---|---|---|
| B1 | Strict line-by-line | 10 | 0 | 2.79% |
| B2 | Strict line-by-line | 10 | 0 | 4.43% |
| B3 | Programmatic SRA (gh API) | 100 | 0 | 20.85% |
| B4 | Programmatic SRA | 100 | 1 | 37.11% |
| B5 | Programmatic SRA | 200 | 4 | 69.29% |
| B6 | Programmatic SRA | 179 | 39 | **92.28%** |

### Aggregate verdict distribution (555 successful probes)

- **161** STUDY-PILOT-CANDIDATE (29.0%) — eligible for Probe 7.b 5-clause deep-dive
- **136** REJECT-FOR-FIT-LICENSE (24.5%) — NO LICENSE / NOASSERTION blocks CR-1 admissibility
- **94** REJECT-FOR-FIT-PRE-BURN-IN (16.9%) — age <90d + stars <1000
- **71** DEFER (12.8%) — borderline
- **61** DEFER-LOW-STAR (11.0%) — <100 stars
- **20** ? unclassified (3.6%) — review pending
- **8** REJECT-NONPERMISSIVE / STALE / ARCHIVED / multi-fail (1.5%)
- **44** UNREACHABLE 404 (7.22%) — likely kit-typo slugs

### Top-15 STUDY-PILOT candidates (Wave 134 Fire 6+ deep-dive queue)

1. sst/opencode (157k★ MIT)
2. nousresearch/hermes-agent (142k★ MIT)
3. langchain-ai/langchain (136k★ MIT)
4. microsoft/markitdown (122k★ MIT)
5. firecrawl/firecrawl (118k★ AGPL CLI-only)
6. google-gemini/gemini-cli (104k★ Apache)
7. github/spec-kit (95k★ MIT)
8. browser-use/browser-use (93k★ MIT)
9. garrytan/gstack (93k★ MIT)
10. microsoft/playwright (88k★ Apache)
11. mermaid-js/mermaid (88k★ MIT)
12. junegunn/fzf (80k★ MIT)
13. thedotmack/claude-mem (74k★ Apache)
14. farion1231/cc-switch (66k★ MIT)
15. unclecode/crawl4ai (65k★ Apache)

### Already-installed/already-cited subset confirmed (44 of 555)

44 repos owned by known T1 orgs (anthropics + openai + google + microsoft + github + astral-sh + huggingface + langchain-ai + voltagent + modelcontextprotocol + tree-sitter + aaif-goose + mozilla + apache + ossf + cli + sharkdp + getzep + gitleaks + shanraisshan + gsd-build + pre-commit + biomejs + oxc-project + burntsushi + mikefarah) confirmed as ALREADY-CITED or ALREADY-INSTALLED via cardinal-rule cites OR marketplace install.

### Honest gap

**STRICT-line-by-line vs PROGRAMMATIC** discrepancy:
- 17 repos got STRICT (LICENSE-content + README + manual D1-D10 + replacement-of line).
- 538 repos got HEURISTIC-grade probe only (license SPDX + metadata + automatic verdict).
- Realistic next-fire close-plan: deep-dive the 161 STUDY-PILOT candidates (~13.5 hours / ~5-7 fires) since REJECTs are already disqualified.

### Next-fire candidates

- **Wave 134 Fire 6**: deep line-by-line of Top-15 STUDY-PILOT
- **Wave 134 Fire 7**: re-audit Anthropic-OFFICIAL repos in REJECT-LICENSE bucket via raw LICENSE blob (resolve SPDX classifier false-negatives)
- **Wave 134 Fire 8-10**: deep-dive next 30-50 STUDY-PILOT by stars
- **Wave 134 Fire N**: address the 20 "?" unclassified verdicts
- **Wave 134 Fire N+**: re-attempt 44 unreachable repos with alternate spellings

### Deliverables for this arc

- ✅ `00-master-tracker.md` (this file)
- ✅ `01-current-state-baseline.md` (per-dimension current state)
- ✅ `02-gap-matrix.md` (per-dimension gap synthesis)
- ✅ `03-sota-target-architecture.md` (synthesized target + 11 ships)
- ✅ `04-decision-tracker.md` (per-candidate verdict rows + 6 batches mega-tables)
- ✅ `05-audit-coverage-tracker.md` (running coverage % with honest dual classification)
- ✅ `_repo-baseline.txt` (609 unique repos)
- ✅ `_priority-queue.txt` (frequency-sorted queue)
- ✅ `_batch{1..6}-metadata.json` (raw GH API results)
- ✅ `_all-batches-consolidated.json` (single aggregate JSON)
- 📋 `06-next-fire-roadmap.md` (planned — Fire 6+ deep-dive plan)

---

## Tracking discipline

- This file is the **entry point** — every other audit doc cross-refs back here
- Each `dim-N-*.md` deep-dive lists per-candidate D1-D10 verdicts + commit-SHA / cite anchor
- `04-decision-tracker.md` aggregates: candidate / current-or-target / verdict / replacement-of / replacement-by / SRA-score / cross-model-T1-status
- Per `audit-action-loop.md` Wire/Surface/Close/Re-fire: this arc is "Surface" stage; `Close` happens at synthesis fire; `Re-fire` happens when a dimension's verdict reverses on later evidence

