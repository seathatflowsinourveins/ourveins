# 02 — Probe DAG 1-7 Application to microsoft/LLMLingua

> **Cite anchor**: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG 1-7
> **Cross-model gate**: Path P codex T1 verdict CITE-PATTERN-ONLY conf=0.86

## Probe DAG verdicts

### Probe 1 — count-OVER

| Evidence | Verdict |
|---|---|
| "20x compression with minimal performance loss" — Row-2 vendor claim | PASS (peer-reviewed EMNLP'23/ACL'24 backing) |
| 4 papers + ecosystem integrations claims verifiable | PASS |

**Codex T1**: P1 = PASS ✅ (with row2_fabrication_test=PASS — peer-reviewed)

### Probe 2 — SDK-vs-CLI surface

| Evidence | Verdict |
|---|---|
| Python SDK only (`from llmlingua import PromptCompressor`) | PASS |
| NO CLI binary | (limit, but PASS for SDK-only candidate) |
| NO REST API server | (limit) |
| NO MCP server | (limit) |

**Codex T1**: P2 = PASS ✅ (SDK-only)

### Probe 3 — architectural-API

| Evidence | Verdict |
|---|---|
| HuggingFace transformers backend (open SDK) | PASS |
| Multi-model support (Llama-2 / GPT2-small / BERT-encoder) | PASS |

**Codex T1**: P3 = PASS ✅

### Probe 4 — plugin-namespace

| Evidence | Verdict |
|---|---|
| `llmlingua` module name — no collision | PASS |
| PyPI package `llmlingua` — unique | PASS |

**Codex T1**: P4 = PASS ✅

### Probe 5 — mode-harness-shape (DECISIVE FAIL)

| Evidence | Orchestrator | Codex T1 |
|---|---|---|
| SDK-only integration paths (Options A/B/C) | PARTIAL | **FAIL** |
| PreToolUse hook latency 5-12s + LLMLingua compression GPU/CPU | concern noted | FAIL |
| PostToolUse compression of MCP results | concern noted | FAIL |
| CLIProxyAPI middleware chaining | concern noted | FAIL |
| Always-on integrations risk latency + prompt-quality + cache-control regressions | (not explicit) | **FAIL** |
| `trust_remote_code=True` default in PromptCompressor (supply-chain risk) | (didn't probe) | FAIL |

**Codex T1**: P5 = FAIL ✅ — verbatim:
> "A/B/C always-on integrations risk latency, prompt-quality, and cache-control regressions"

### Probe 6 — direct-file/registry blockers

| Evidence | Verdict |
|---|---|
| LICENSE = MIT PURE | PASS |
| Microsoft TIER-1-OFFICIAL | PASS |
| Active maintenance + 4 peer-reviewed papers | PASS |
| HEAVY ~5-10 GB install footprint | CAVEAT |
| `trust_remote_code=True` default (security) | CAVEAT |

**Codex T1**: P6 = NEUTRAL (acceptable but with documented caveats)

### Probe 7.a — demand-absence (DECISIVE FAIL)

| Evidence | Orchestrator | Codex T1 |
|---|---|---|
| eee has token-eff stack (RTK + ccusage + repomix + cache_control + context-mode) | UNCERTAIN | **FAIL** — partial-overlap |
| Fire 23 P0 "21-plugin session-start token-budget" — does LLMLingua address? | UNCERTAIN | **FAIL — orthogonal** |
| LLMLingua compresses prompts at API-call layer; eee runs Claude Code (Anthropic API closed-loop) | (didn't probe) | FAIL — integration paths fragile |
| Existing CLIProxyAPI cache_control covers per-task token economy | (didn't probe) | FAIL — overlap |

**Codex T1**: P7a = FAIL ✅ — verbatim:
> "novel_capability_for_eee: PARTIAL-OVERLAP"
> "addresses_fire23_p0: NO. LLMLingua prompt compression is orthogonal to session-start plugin descriptor budget. For Fire 23 P0, prefer selective tool/plugin loading or descriptor-pruning patterns."

### Probe 7.b — demand-creates-new-workflow ELIGIBILITY

| Clause | Verdict |
|---|---|
| (1) Named operational use case | NOT-MET (no current eee workflow generates large non-cacheable outputs needing semantic compression beyond existing primitives) |
| (2) Cited local input source path | THEORETICALLY-PRESENT (`.claude/state/codex_consult_*_OUT.txt` or context-mode event logs per codex T1) |
| (3) Wiring path | THEORETICALLY-PRESENT (dedicated venv + exact git SHA + model allowlist) but heavy |
| (4) Incumbent comparison | NOT-MET (repomix + context-mode + manual summarization + cache_control already cover) |
| (5) Reversible time-box | THEORETICALLY-PRESENT (30-day sidecar pilot per codex T1) but conditional on quantitative evidence |

**Codex T1**: P7b = NOT-ELIGIBLE ✅ — conditional on FUTURE quantitative evidence

## Aggregate Probe DAG verdict

| Probe | Verdict |
|---|---|
| P1 count-OVER | PASS |
| P2 SDK-vs-CLI | PASS (SDK-only) |
| P3 arch-API | PASS |
| P4 plugin-namespace | PASS |
| P5 mode-harness | **FAIL** |
| P6 blockers | NEUTRAL (caveats noted) |
| P7a demand-absence | **FAIL** |
| P7b demand-creates | NOT-ELIGIBLE |

**Score: 4 PASS + 1 NEUTRAL + 2 FAIL + 1 NOT-ELIGIBLE** — P5 + P7a decisive blockers; P7b conditional.

## Verdict shape: CITE-PATTERN-ONLY @ conf=0.86

Codex T1 returned CITE-PATTERN-ONLY (Option D) because:
1. Strong P5+P7a FAIL signals
2. Heavy install footprint
3. Fire 23 P0 ORTHOGONAL not directly addressed
4. trust_remote_code=True security caveat
5. 5 extractable patterns identified with explicit file:line + paper URL cites

## Cohort tracking advance

| Cohort | Wave 134 NEW-candidate instances |
|---|---|
| P5 mode-harness FAIL cohort | n=4 (BMAD HARD-GATE + CCPM PM-loop + Task Master PM-loop + **LLMLingua integration-fragility**) |
| P7a demand-absence FAIL cohort | n=4 (BMAD + CCPM + Task Master + Claude Memory Bank + **LLMLingua orthogonal**) — n=5 actually |
| CITE-PATTERN-ONLY verdict cohort | n=3 (CCPM + Task Master + **LLMLingua**) |

## Orchestrator-codex probe convergence

| Probe | Orchestrator | Codex T1 | Convergence |
|---|---|---|---|
| P1 | NEEDS-ROW-2 | PASS (Row-2 PASS via peer-reviewed) | codex resolved |
| P2 | PASS | PASS | CONVERGENT |
| P3 | PASS | PASS | CONVERGENT |
| P4 | PASS | PASS | CONVERGENT |
| P5 | PARTIAL | FAIL | codex stricter |
| P6 | PASS-with-caveat | NEUTRAL | codex stricter |
| P7a | UNCERTAIN | FAIL | codex resolved (orthogonal to Fire 23 P0) |
| P7b | UNCERTAIN | NOT-ELIGIBLE | codex resolved |

**4/8 perfect convergence + 4 codex-resolved-uncertainties + 2 codex-stricter** — codex contributed
substantially to verdict precision. Most actionable: P7a Fire 23 P0 orthogonality refutation.

## 🚨 Critical architectural insight from Probe 7.a refutation

Codex T1 explicitly REFUTED Fire 25's ranking rationale:

**Fire 25 close synthesis stated** (1st priority context):
> "🥈 #2 NN-17 microsoft/LLMLingua — directly addresses Fire 23 P0 '21-plugin session-start token-budget' UNVERIFIED caveat."

**Codex T1 refutation**:
> "addresses_fire23_p0: NO. LLMLingua prompt compression is orthogonal to session-start plugin descriptor budget. For Fire 23 P0, prefer selective tool/plugin loading or descriptor-pruning patterns."

This means:
- Fire 25's #2 ranking was based on FALSE-LINK to Fire 23 P0
- **The correct primitive for Fire 23 P0 is W134-F24-C3 Task Master Selective MCP Tool-Loading**
  (TASK_MASTER_TOOLS env tiers — addresses session-start plugin/MCP descriptor budget DIRECTLY)
- This re-elevates W134-F24-C3 as the HIGHEST-LEVERAGE Fire 23 P0 ship (still TIER-1.5)

## Mia ladder advance

n=1691 → n=1698 (+7: Probe DAG 1-7 with 2 decisive blockers / P5 PM-loop cohort n=4 / P7a orthogonal refutation / 4/8 perfect + 4 codex-resolved / Fire 25 ranking error caught / W134-F24-C3 re-elevation as correct Fire 23 P0 primitive)
