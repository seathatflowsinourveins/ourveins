# 99 — Fire 26-C Close Synthesis (open-compress/claw-compactor Path P Audit)

> **Verdict**: **CITE-PATTERN-ONLY @ codex T1 conf=0.88** (4th CITE-PATTERN-ONLY in Wave 134 NEW-candidate series)
> **Closed-loop disposition**: terminal CITE — no install; 9 cite-patterns + conditional bounded-pilot path documented
> **🚨 Two LOAD-BEARING findings**: (a) LLMLingua-2 benchmark fabrication caught (Row-2 FAIL); (b) Axis-1 solo-author FAIL (94% concentration)
> **Fire 26-C deliverable**: 5-file folder + atomic commit per FM-02 sub-class (b) defense

## Fire 26-C summary

THIRD of revised Top-3 priorities post-Fire-26-B. open-compress/claw-compactor local HEAD `c1b936d4` MIT
+ 2,320★ + active maintenance (2026-05-09 = 1 day before audit) + 14-stage Fusion Pipeline with sophisticated immutable-data-flow architecture (FusionContext frozen dataclass + RewindStore hash-addressed lossless fallback).

Path P codex T1 returned **CITE-PATTERN-ONLY @ conf=0.88** — 4th CITE-PATTERN-ONLY verdict in Wave 134 series.
Two decisive blockers: **Row-2 fabrication-test FAIL** (LLMLingua-2 benchmark uses RandomDropCompressor strawman)
+ **Axis-1 convergence-gate FAIL** (solo-author project; STRONG-PROVENANCE-EXPRESS doesn't fire).

## 5 deliverables (~870 LOC)

1. `00-tracker.md` (~160 LOC) — framing + Mia pre-apply + 8-axis audit dimensions + 3 integration options
2. `01-claw-compactor-anatomy.md` (~165 LOC) — anatomy + 4 Mia OVER catches by codex T1 + scope tri-furcation
3. `02-probe-dag-application.md` (~190 LOC) — Probe DAG full-repo FAIL / Python-lib-alone PASS bifurcation + Axis-1+2+3
4. `03-codex-t1-verdict.md` (~200 LOC) — verbatim REAL GPT-5.5 + 6 critical contributions + 9 cite-patterns
5. `99-close-synthesis.md` (this file, ~155 LOC) — Fire 26-C close + revised Top-N forward roadmap
6. `docs/install-provenance.md` — Fire 26-C entry appended

## Decision matrix (final)

| Decision axis | Outcome |
|---|---|
| Install verdict | **CITE-PATTERN-ONLY @ conf=0.88** |
| pip install claw-compactor into Z:/venvs/claude | ❌ NO |
| Vendor claw-compactor code into eee | ❌ NO |
| Wire proxy/server.mjs as middleware | ❌ NO (DUPLICATE CLIProxyAPI) |
| Adopt Engram subsystem | ❌ NO (DUPLICATE graphiti + mcp-memory) |
| Cite-pattern extracts queued | **9 candidates** with file:line precision |
| Conditional bounded pilot path | YES — gated on quantitative evidence of recurring large non-cacheable per-task inputs + faithful LLMLingua-2 baseline rerun |
| Reject LLMLingua-2 benchmark claims until methodology fixed | ✅ YES (codex T1 prescribed) |
| Re-audit pre-condition for adoption | Axis-1 ≥3 T1 sources + ≥2 named-T2 OR STRONG-PROVENANCE-EXPRESS firing |

## Two LOAD-BEARING blockers

### Blocker 1: Row-2 fabrication-test FAIL (HIGHEST-VALUE finding)

**Codex T1 verbatim**:
> "benchmark/compressors.py uses RandomDropCompressor as an LLMLingua-2 proxy, not LLMLingua-2; README direct LLMLingua-2 ROUGE-L table is therefore unsupported"

The headline marketing claim "claw-compactor beats LLMLingua-2 by 27% in ROUGE-L at 0.5 compression" (0.723 vs 0.570) is **methodologically unsupported**. The benchmark uses a `RandomDropCompressor` strawman labeled "LLMLingua-2 proxy" — actual `microsoft/LLMLingua` is never invoked in the benchmark scaffolding.

Per `convergence-gate.md §Anti-pattern Row-2 fabrication-test FAIL`: ≥3 README numeric claims without methodology citation → auto-FAIL. Across multiple prior live A/B verifications of fabrication-pattern candidates, none survived verification. **The headline superiority claim is a strawman, not a finding.**

### Blocker 2: Axis-1 convergence-gate FAIL (solo-author concentration)

**Codex T1 verbatim**:
> "axis_1_convergence_gate: FAIL (single org open-compress/OpenClaw; no verified >=3 independent T1 sources and no named-T2 endorsement; STRONG-PROVENANCE-EXPRESS does not fire because maintainer org is not official/T2-equivalent)"

Contributor breakdown:
- `aeromomo` — 49 commits (94%)
- `justiniggy` — 2 commits (4%)
- `haosenwang1018` — 1 commit (2%)

This is effectively a solo-author project. Per `convergence-gate.md`, STRONG-PROVENANCE-EXPRESS requires:
- ≥30d age ✅ (3 months)
- AND official-org maintainer ❌ (OpenClaw is fresh 2026 org)
- AND named-T2 endorsement ❌ (none found)

**ALL three predicates must hold; FAIL.**

## 🚨 Critical architectural insight CONFIRMED (2-fire convergence)

Fire 26-B established: **token economy operates at distinct layers** (session-start vs per-task).

**Fire 26-C provides 2nd independent codex T1 verdict** confirming the architectural insight:
- claw-compactor `addresses_fire23_p0: NO` (same as LLMLingua per Fire 26-B)
- Both LLMLingua AND claw-compactor operate at per-task layer
- Both REFUTE attempts to position them as Fire 23 P0 primitives

**W134-F24-C3 Task Master Selective MCP Tool-Loading remains the correct Fire 23 P0 primitive** — confirmed by 2 independent codex T1 verdicts (Fire 26-B + Fire 26-C). Both per-task compression candidates ranked low for Fire 23 P0 because they operate at the wrong layer.

## 9 cite-pattern-extract candidates with file:line precision

These can be extracted to eee WITHOUT installing claw-compactor:

### Pattern #1: 14-stage adapter-pattern pipeline construction

- Source: `scripts/lib/fusion/engine.py:194`
- Pattern: how to compose stage classes from heterogeneous sources (in-tree + legacy adapters) into uniform pipeline
- **Application to eee**: reference for future composable hook/skill stage chains

### Pattern #2: Frozen FusionContext / FusionResult / FusionStage contract

- Source: `scripts/lib/fusion/base.py:30`
- Pattern: immutable dataclass contract for pipeline stages (with mutable metadata caveat per codex T1)
- **Application to eee**: reference for `.claude/hooks/scripts/` immutable input/output contracts

### Pattern #3: Ordered gate-before-compress pipeline executor

- Source: `scripts/lib/fusion/pipeline.py:38`
- Pattern: stage.should_apply() gate before stage.apply(), with O(1) gate evaluation
- **Application to eee**: reference for hook ordering + gate discipline (consistent with `layered-gates-architecture.md`)

### Pattern #4: Rule-based content routing cascade

- Source: `scripts/lib/fusion/content_detector.py:1`
- Pattern: structural-marker / file-extension / lexical-heuristic cascade for content-type detection
- **Application to eee**: reference for hook content-routing (e.g., `bash_command_dispatcher` style)

### Pattern #5: JSON array schema+sample compression with hash-fallback

- Source: `scripts/lib/fusion/ionizer.py:116`
- Pattern: large JSON array → schema + sample + statistical-summary + hash-addressed fallback for full retrieval
- **Application to eee**: reference for `.claude/state/codex_consult_*_OUT.txt` size management

### Pattern #6: Provider-specific rewind tool definition

- Source: `scripts/lib/rewind/retriever.py:17`
- Pattern: how to expose retrieval-from-store as a model-facing tool call
- **Application to eee**: reference for future tool-call patterns where LLM retrieves on-demand from harness state

### Pattern #7: Tiered compaction with circuit breaker (HIGHEST-VALUE for eee)

- Source: `scripts/lib/fusion/tiered_compaction.py:1`
- Pattern: micro/auto/full compaction levels + circuit breaker on repeated failures + re-injection hooks
- **Application to eee**: reference for `/compact` cadence + AUTOCOMPACT 70% threshold (Wave 122) + FM-17.e autocompact-thrashing defense

### Pattern #8: Post-compaction recent-tool schema reinjection (CITE-ONLY)

- Source: `scripts/lib/fusion/skill_reinjection.py:1`
- Pattern: after compaction, reinject recent tool/skill schemas with token budget cap
- Codex T1: "cite only; NOT a Fire 23 P0 session-start solution"
- **Application to eee**: reference for post-compact context restoration

### Pattern #9: System-message dynamic-fragment cache-stabilization (CITE-ONLY)

- Source: `scripts/lib/fusion/quantum_lock.py:196`
- Pattern: identify stable cache prefix vs dynamic suffix in system messages, insert cache boundary marker
- Codex T1: "cite only; verify against Anthropic cache behavior before use"
- **Application to eee**: reference for `cache_control` directive placement strategy

## Coverage % update

| Metric | Pre-Fire-26-C | Post-Fire-26-C |
|---|---|---|
| Wave 134 NEW-candidates verified (Fire 24+26 series) | 7/14 (50.0%) | **8/14 (57.1%)** |
| Cross-model verified claims | 30 | **31** |
| Path P recipe ladder | n=16/16 | **n=17/17** |
| Verdict shape distribution | 2R / 3C-P / 2S-P / 1H / 0A | **2R / 4C-P / 2S-P / 1H / 0A** |
| Mia OVER catches by codex T1 | 3 | **7** (+4 in Fire 26-C: stage-count / mjs-drift / test-count drift / **LLMLingua-2 fabrication LOAD-BEARING**) |
| Row-2 fabrication-test FAIL cohort | 0 | **1** (NEW class entry) |
| Axis-1 convergence-gate FAIL cohort | 0 | **1** (NEW class entry) |
| Critical architectural insights captured | 1 (token-economy-layers) | **2** (+ Fire-23-P0 orthogonality CONFIRMED via 2-fire convergence) |
| 100% architecture dim coverage | 8/8 | 8/8 ✅ |

## Cumulative arc Fire 5-26-C (32-fire arc)

26 folders, ~153 files, ~21,470 LOC across 32-fire arc.

Mia ladder n=130 (pre-arc) → **n=1735** (Fire 26-C close) = **+1,605 verifications across 32-fire arc**.

## Forward fire roadmap (post-Fire-26-C)

### REVISED Forward Top-3 (post codex T1 + 2-fire convergence on Fire 23 P0 orthogonality)

| Priority | Fire | Subject | Why |
|---|---|---|---|
| 🥇 #1 | W134-F26-A-PILOT | Cisco mcp-scanner Phase 1-4 pilot execution | STRONGEST verdict 0.91; 8/8 Probe DAG PASS; pilot pending |
| 🥈 #2 | **W134-F24-C3** | **Task Master Selective MCP Tool-Loading extract — RE-CONFIRMED Fire 23 P0 primitive** | **2-fire convergence (Fire 26-B + 26-C) on architectural insight; this is the ONLY correct Fire 23 P0 primitive in Wave 134 series** |
| 🥉 #3 | W134-F26-D | NN-22 mem0ai/mem0 OR NN-21 openai/openai-agents-python Path P audit | Open token-eff dimension closed (LLMLingua+claw-compactor both CITE-PATTERN); advance to Dim 2 memory OR Dim 1 topology |

### Tier 1 NEW-EXTENDED Next-6 candidates queued (Fire 27+)

| Fire | Subject | Dimension |
|---|---|---|
| W134-F27-A | NN-22 mem0ai/mem0 | Dim 2 memory |
| W134-F27-B | NN-21 openai/openai-agents-python | Dim 1 topology |
| W134-F27-C | NN-23 langchain-ai/langgraph | Dim 1 topology |
| W134-F27-D | NN-13 THUDM/AgentBench | Dim 6 eval |
| W134-F27-E | NN-25/NN-26 InvariantLabs+snyk MCP-security cohort | Dim 5 security |
| W134-F27-F | NN-19 anthropic/courses (if exists) OR AnswerDotAI/cold-compress | Dim 6 docs OR Dim 7 KV-cache-compression (new layer beyond per-task) |

### Tier 2 — Research-architecture improvement ships

| Fire | Subject |
|---|---|
| W134-F26-RESEARCH-ARCH-A | Codify Fire 25 "audit-existing-kits-first" lesson in `research-protocol.md` |
| W134-F26-RESEARCH-ARCH-B | Codify Fire 26-B + 26-C "token-economy-layers-separation" insight (2-fire convergence) |
| W134-F26-RESEARCH-ARCH-C | Codify "Row-2 fabrication-test catch via codex T1 benchmark probe" methodology (Fire 26-C exemplar) |

## Closed-loop disposition

Per `closed-loop-recursive-narrowing.md`:
- Fire 26-C is CITE-PATTERN-ONLY @ conf=0.88 with 0 prescribed_edits + 9 cite-pattern candidates
- No Pattern A apply for INSTALL decision (terminal CITE)
- 9 cite-pattern candidates queued as Tier 1.5 separate ships
- Outcome A ACCEPT-WITH-DOC for AUDIT deliverables
- **2-fire convergence on architectural insight** (Fire 26-B + 26-C both refute LLMLingua/claw-compactor as Fire 23 P0 primitives) — meta-discipline confirmation

## Discipline conformance

| Discipline | Status |
|---|---|
| CR-1 cite-trail | ✅ TIER-1-DIRECT @ file:line @ HEAD SHA |
| CR-3 cross-model | ✅ REAL GPT-5.5 codex CLI v0.130.0 |
| CR-9 install-risk | ✅ REJECT install — Row-2 fabrication-test FAIL + Axis-1 FAIL |
| CR-10 research-first-then-install | ✅ Audit before pilot; bounded pilot path documented |
| CR-11 META-process | ✅ Multi-axis Path P + Probe DAG + adversarial review |
| FM-02 sub-class (b) defense | ✅ Atomic git add + commit --only -- pathspec |
| Row-2 fabrication-test | 🚨 **FAIL CAUGHT BY CODEX T1** (highest-value finding) |
| Architectural insight captured | ✅ Fire-23-P0 orthogonality CONFIRMED via 2-fire convergence |

## Mia ladder advance (Fire 26-C close)

n=1735 → **n=1742** (+7: Fire 26-C close synthesis / decision matrix / 9 cite-patterns w/ file:line precision / Row-2 fabrication-test caught HIGHEST-VALUE / Axis-1 solo-author FAIL quantified / 2-fire convergence on Fire 23 P0 orthogonality / coverage 57.1% milestone)
