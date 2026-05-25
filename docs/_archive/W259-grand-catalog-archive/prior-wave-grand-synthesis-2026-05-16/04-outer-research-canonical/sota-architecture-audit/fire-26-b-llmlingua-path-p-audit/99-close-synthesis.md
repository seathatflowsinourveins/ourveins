# 99 — Fire 26-B Close Synthesis (microsoft/LLMLingua Path P Audit)

> **Verdict**: **CITE-PATTERN-ONLY @ codex T1 conf=0.86** (3rd CITE-PATTERN-ONLY in series)
> **Closed-loop disposition**: terminal CITE — no install; 5 cite-patterns + conditional pilot path queued
> **🚨 CRITICAL architectural insight**: codex T1 REFUTED Fire 25's link to Fire 23 P0; W134-F24-C3 re-elevated as correct primitive
> **Fire 26-B deliverable**: 5-file folder + atomic commit per FM-02 sub-class (b) defense

## Fire 26-B summary

SECOND of revised Top-3 priorities post-Fire-25. microsoft/LLMLingua local HEAD `e0e9d99` MIT
+ Microsoft TIER-1-OFFICIAL + EMNLP'23+ACL'24+CoLM'25 4-paper peer-reviewed backing + 6,067★.

Path P codex T1 returned **CITE-PATTERN-ONLY @ conf=0.86** — 3rd CITE-PATTERN-ONLY verdict
in Wave 134 NEW-candidate series. Two decisive blockers (P5 mode-harness FAIL + P7a
demand-absence FAIL) + Fire 23 P0 orthogonality refutation.

## 5 deliverables (~700 LOC)

1. `00-tracker.md` (~135 LOC) — framing + Mia pre-apply + 3 algorithm variants + 4 integration options
2. `01-llmlingua-anatomy.md` (~155 LOC) — anatomy + Mia HEAD-mismatch catch + 4 peer-reviewed papers
3. `02-probe-dag-application.md` (~135 LOC) — Probe DAG 4 PASS + 1 NEUTRAL + 2 FAIL + 1 NOT-ELIGIBLE
4. `03-codex-t1-verdict.md` (~150 LOC) — verbatim REAL GPT-5.5 verdict + 5 critical contributions
5. `99-close-synthesis.md` (this file) — Fire 26-B close + Fire 26-C + Fire 27+ roadmap

## Decision matrix (final)

| Decision axis | Outcome |
|---|---|
| Install verdict | **CITE-PATTERN-ONLY @ conf=0.86** |
| pip install llmlingua into Z:/venvs/claude | ❌ NO |
| Vendor LLMLingua code into eee | ❌ NO |
| Cite-pattern extracts queued | **5 candidates** (with file:line + paper URL precision) |
| Conditional pilot path (Option B sidecar) | YES — gated on FUTURE quantitative evidence of recurring large non-cacheable outputs |
| Reclassify Fire 25 ranking (LLMLingua → Fire 23 P0 link) | ✅ YES — REFUTED by codex T1 |
| Re-elevate W134-F24-C3 as correct Fire 23 P0 primitive | ✅ YES — codex T1 prescribed |

## Three independent decisive blockers

1. **Probe 5 mode-harness FAIL**: SDK-only + integration paths (A/B/C) introduce latency +
   prompt-quality + cache-control regressions; trust_remote_code=True security caveat
2. **Probe 7.a demand-absence FAIL**: eee has token-eff stack (RTK + ccusage + repomix +
   cache_control + context-mode); LLMLingua = PARTIAL-OVERLAP not GENUINELY NEW
3. **addresses_fire23_p0: NO** — codex T1 explicit refutation; LLMLingua orthogonal to
   session-start plugin descriptor budget

Plus: HEAVY install footprint (~5-10 GB PyTorch + Transformers) + trust_remote_code=True
default security risk + HEAD specification Mia OVER caught.

## 🚨 Critical architectural insight from codex T1 (HIGHEST-VALUE finding)

**Fire 25 close synthesis ranking error**: placed LLMLingua at #2 priority specifically because
of FALSE-LINK to Fire 23 P0 "21-plugin session-start token-budget" caveat.

**Codex T1 REFUTATION**:
> "addresses_fire23_p0: NO. LLMLingua prompt compression is orthogonal to session-start
> plugin descriptor budget. For Fire 23 P0, prefer selective tool/plugin loading or
> descriptor-pruning patterns."

**Architectural insight**: token economy operates at distinct layers:
- **Session-start layer**: plugin/skill/MCP descriptor inflation (Fire 23 P0 surface)
- **Per-task layer**: prompt + context compression (LLMLingua scope)

These are SEPARATE token-economy layers requiring SEPARATE primitives:
- Session-start primitive: **W134-F24-C3 Task Master Selective MCP Tool-Loading** (TASK_MASTER_TOOLS env tiers `core/standard/all/custom`) — directly addresses descriptor budget
- Per-task primitive: existing CLIProxyAPI cache_control + repomix + context-mode plugin already cover

**Action**: re-elevate W134-F24-C3 as the HIGHEST-LEVERAGE Tier 1.5 ship for Fire 23 P0
(previously was #2; now correctly identified as #1 P0 primitive).

## 5 cite-pattern-extract candidates (codex T1 file:line + paper URL precision)

These can be extracted to eee WITHOUT installing LLMLingua:

### Candidate 1: Coarse-to-fine budget control

- Source: LLMLingua EMNLP'23 paper https://aclanthology.org/2023.emnlp-main.825/
- Pattern: token-level iterative compression with budget control
- **Application to eee**: reference pattern for future budget-aware compression if quantitative evidence emerges

### Candidate 2: Question-conditioned context ranking (LongLLMLingua)

- Source: ACL'24 https://aclanthology.org/2024.acl-long.91/
- Pattern: long-context RAG reordering for "lost in the middle" mitigation
- **Application to eee**: reference for long-arc context management if RAG-style ordering becomes needed

### Candidate 3: Task-agnostic Transformer compression (LLMLingua-2) — HIGHEST-VALUE per codex T1

- Source: ACL'24 Findings https://aclanthology.org/2024.findings-acl.57/
- Pattern: BERT-level encoder + data distillation from GPT-4 for token classification
- Codex T1: "highest-value future pattern because it is faster and less tied to causal-LM perplexity"
- **Application to eee**: if Option-B sidecar pilot ever fires, use LLMLingua-2 (not original LLMLingua)

### Candidate 4: SecurityLingua security-aware guardrail

- Source: OpenReview CoLM'25 https://openreview.net/forum?id=tybbSo6wba
- Pattern: security-aware intention extraction as guardrail
- Codex T1: "research pattern only, not default eee runtime"
- **Application to eee**: cross-reference for safety_guard.py / agent_plan_readonly_bash_guard.py future enrichment

### Candidate 5: Local API anchors (file:line precision)

- `Z:/repos/deps/LLMLingua/setup.py:25-31` — dependency list (transformers/accelerate/torch/tiktoken/nltk/numpy)
- `prompt_compressor.py:71-93,118-161` — model loading (where trust_remote_code=True lives)
- `README.md:153-235` — SDK usage examples

## Conditional pilot path (Option B sidecar — if FUTURE quantitative evidence emerges)

Per codex T1 explicit next_steps:

```
If future quantitative evidence shows recurring large non-cacheable MCP/research
outputs, run a 30-day isolated Option-B sidecar pilot only:
  - Input source: .claude/state/codex_consult_*_OUT.txt or context-mode event logs
  - Wiring: dedicated venv + exact git SHA + model allowlist
  - Comparison: against repomix + context-mode + manual summarization + cache_control
  - Removal: by deleting the venv/cache
```

**Pre-conditions for this pilot to fire**:
1. Quantitative measurement of `.claude/state/codex_consult_*_OUT.txt` size distribution
2. Evidence that large non-cacheable outputs constrain eee context budget
3. Comparison baseline established (repomix + context-mode + cache_control failing to compress these specific outputs)

**Not current priority** — Fire 23 P0 is addressed by W134-F24-C3 (different layer).

## Forward fire roadmap (post-Fire-26-B)

### REVISED priorities post codex T1 architectural insight

| Priority | Fire | Subject | Why |
|---|---|---|---|
| 🥇 #1 | W134-F26-A-PILOT | Cisco mcp-scanner pilot (Fire 26-A close) | STRONGEST verdict 0.91; 8/8 Probe DAG PASS |
| 🥈 #2 | **W134-F24-C3** | **Task Master selective MCP tool-loading extract** | **NEWLY RE-ELEVATED as correct Fire 23 P0 primitive (codex T1 refutation of LLMLingua link)** |
| 🥉 #3 | W134-F26-C | open-compress/claw-compactor Path P audit | Token-eff alternative + claims quality-lead vs LLMLingua-2 |

### Tier 1 NEW-EXTENDED Next-5 (Fire 27+)

| Fire | Subject |
|---|---|
| W134-F27-A | NN-22 mem0ai/mem0 (Dim 2 memory) |
| W134-F27-B | NN-21 openai/openai-agents-python (Dim 1 topology) |
| W134-F27-C | NN-23 langchain-ai/langgraph (Dim 1 topology) |
| W134-F27-D | NN-13 THUDM/AgentBench (Dim 6 eval) |
| W134-F27-E | NN-25/NN-26 InvariantLabs+snyk MCP-security cohort |

### Tier 2 — Research-architecture improvement ship

| Fire | Subject |
|---|---|
| W134-F26-RESEARCH-ARCH | Codify Fire 25 "audit-existing-kits-first" lesson AND Fire 26-B "token-economy-layers" insight in `research-protocol.md` |

## Coverage % update

| Metric | Pre-Fire-26-B | Post-Fire-26-B |
|---|---|---|
| Wave 134 NEW-candidates verified (Fire 24+26 series) | 6/14 (42.9%) | **7/14 (50%)** ← halfway! |
| Cross-model verified claims | 29 | **30** |
| Path P recipe ladder | n=15/15 | **n=16/16** |
| Verdict shape distribution | 2R / 2C-P / 2S-P / 1H / 0A | + 1 CITE-PATTERN (3 total) |
| Mia OVER catches by codex T1 | 2 | **3** (+LLMLingua HEAD spec) |
| Critical architectural insights captured | 0 | **1 (token-economy-layers separation)** |
| 100% architecture dim coverage | 8/8 | 8/8 ✅ |

## Cumulative arc Fire 5-26-B (31-fire arc)

25 folders, ~148 files, ~20,600 LOC across 31-fire arc.

Mia ladder n=130 (pre-arc) → **n=1705** (Fire 26-B close) = **+1575 verifications across 31-fire arc**.

## Closed-loop disposition

Per `closed-loop-recursive-narrowing.md`:
- Fire 26-B is CITE-PATTERN-ONLY @ conf=0.86 with 0 prescribed_edits + 5 cite-pattern candidates
- No Pattern A apply for INSTALL decision (terminal CITE)
- 5 cite-pattern candidates queued as Tier 1.5 separate ships
- Outcome A ACCEPT-WITH-DOC for AUDIT deliverables
- **W134-F24-C3 re-elevation** is a meta-discipline correction (Fire 25 ranking error caught + corrected)

## Discipline conformance

| Discipline | Status |
|---|---|
| CR-1 cite-trail | ✅ TIER-1-DIRECT @ file:line @ HEAD SHA + 4 peer-reviewed paper URLs |
| CR-3 cross-model | ✅ REAL GPT-5.5 codex CLI |
| CR-9 install-risk | ✅ REJECT install — HEAVY footprint + trust_remote_code=True caveat |
| CR-10 research-first-then-install | ✅ Audit before pilot; conditional path documented |
| CR-11 META-process | ✅ Mia caught HEAD-spec error + Fire 25 ranking error |
| FM-02 sub-class (b) defense | ✅ Atomic git add + commit --only -- pathspec |
| Row-2 fabrication-test | ✅ PASS (peer-reviewed EMNLP/ACL backing) |
| Architectural insight captured | ✅ Token-economy-layers separation |

## Mia ladder advance (Fire 26-B close)

n=1705 → n=1712 (+7: Fire 26-B close synthesis / decision matrix / 5 cite-patterns / conditional pilot path / Fire 25 ranking error caught + corrected / W134-F24-C3 re-elevation / 50% Tier 1 NEW-extended coverage milestone)
