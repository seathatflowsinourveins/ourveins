---
title: Wave 223 Agent C — Data Engineering + Streaming + Multilingual SOTA Research
status: AUTHORITATIVE
date: 2026-05-15
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (f); STAND-IN-NOTICE per cmc-env-funneled-disclosure.md §The mandate Option 2 — verdict is recommendation-only; orchestrator MUST file Path P codex T1 ratification before any ADOPT-NOW ship)
---

# Wave 223 Agent C — Data Engineering + Streaming Pipelines + Multilingual Specialists

## STAND-IN-NOTICE (cardinal-rule-3 cross-model gate disclosure)

Agent dispatched as **Sonnet stand-in** per `CLAUDE.local.md` ENV block (f) `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6`. Cross-model gate **NOT structurally satisfied**. Orchestrator MUST file Path P codex T1 ratification before any ADOPT-NOW recommendation lands.

This report is **REJECT-DOMINANT by design** (Probe 7 demand-gate honest application); the load on the Path P ratification gate is bounded — the 1 STUDY-PILOT recommendation requires the strongest verification.

## R0 Hypothesis

> "Data engineering (workflow orchestration), streaming pipelines (event-streaming), and multilingual specialist (translation) primitives improve claude-sota-pure beyond the incumbent `audit-action-loop.md` Wire→Surface→Close pattern (421 JSONL files MEASURED) by enabling workflows the current runtime cannot serve."

**Rejection criterion**: if Probe 7.a DEMAND-ABSENCE applies AND Probe 7.b 5-clause check fails, REJECT-FOR-FIT regardless of candidate quality.

## Section 1 — Data Engineering for AI Workflows

### Candidate Catalog

| # | Repo | Stars | License | Age | SRA | NATIVE-CC | Probe 7 | Verdict |
|---|------|-------|---------|-----|-----|-----------|---------|---------|
| 1 | `apache/airflow` | 45,429★ | Apache-2.0 [VERIFIED @ HEAD d9b560cd] | ~11y | D1-D6 PASS | No native; 3rd-party MCPs <5★ | 7.a DEMAND-ABSENCE | REJECT-FOR-FIT.a |
| 2 | `PrefectHQ/prefect` | (top org) | Apache-2.0 [VERIFIED @ HEAD 74ea1b03] | ~6y | D1-D6 PASS | PrefectHQ/fastmcp is MCP-AUTHORING (different concern) | 7.a DEMAND-ABSENCE | REJECT-FOR-FIT.a |
| 3 | `dagster-io/dagster` | 15,517★ | Apache-2.0 [VERIFIED @ HEAD a5532b7c] | ~7y | D1-D6 PASS | NONE found | 7.a DEMAND-ABSENCE | REJECT-FOR-FIT.a |
| 4 | `flyteorg/flyte` | 7,035★ | Apache-2.0 [VERIFIED @ HEAD 86756bc1, Lyft] | ~6y | D1-D5 PASS; D6 MEDIUM (K8s-native) | NONE found | 7.a DEMAND-ABSENCE | REJECT-FOR-FIT.a |
| 5 | `temporalio/temporal` | (W220 deferred) | MIT [VERIFIED @ HEAD c2afbd48] | Mature | D1-D6 PASS | `vinceblank/agent-tempo` 15★ MCP | W220 reserved | DEFER to W220 closure |

### Probe 7 Demand-Gate Application

**Incumbent**: `audit-action-loop.md` (19.6K rule INSTALLED) + 421 `.claude/state/*.jsonl` audit files (MEASURED) implement Wire→Surface→Close→Re-fire pattern via PostToolUse `Bash(git commit *)` matchers + SessionEnd async dispatchers + direct JSONL append (collision-tolerant). No DAG dependencies (each audit hook fires independently).

**Probe 7.a — DEMAND-ABSENCE check**:
1. No current/queued workflow with DAG dependencies, retries, schedules, or distributed-execution requirements
2. Existing primitive satisfies — Wire→Surface→Close + agent dispatch (Agent tool fan-out) already provide multi-stage workflows
3. Not displacement nor extension — zero migration plan; zero new use-case

**Probe 7.b — 5-clause check**: ALL 5 FAIL.

**Section 1 verdict**: ALL 5 candidates REJECT-FOR-FIT.a (DEMAND-ABSENCE). Excellent SOTA-grade tools; wrong layer for single-user CC runtime.

**CR-12 disposition**: `DUPLICATE-FUNCTIONALITY` — orchestrators duplicate what `audit-action-loop.md` Wire→Surface→Close already provides.

## Section 2 — Streaming Pipelines / Event-Driven

### Candidate Catalog

| # | Repo | Stars | License | NATIVE-CC | Probe 7 | Verdict |
|---|------|-------|---------|-----------|---------|---------|
| 6 | `apache/kafka` | 32,605★ | Apache-2.0 | 3rd-party MCPs (kanapuli 77★, tuannvm 50★) | 7.a DEMAND-ABSENCE | REJECT-FOR-FIT.a |
| 7 | `redpanda-data/redpanda` | (high) | **BSL (Business Source License) + RCL** [VERIFIED `/licenses/bsl.md` + `/licenses/rcl.md` @ HEAD 216ed2b5 — NEITHER in permissive whitelist per CR-9] | n/a | n/a | **REJECT-FOR-LICENSE** (CR-9 violation) |
| 8 | `nats-io/nats-server` | (high) | Apache-2.0 [VERIFIED @ HEAD 8f41bed8] | No native CC | 7.a DEMAND-ABSENCE | REJECT-FOR-FIT.a |
| 9 | `bytewax/bytewax` | (Python dataflow) | Apache-2.0 [VERIFIED @ HEAD cf75e0a3] | NONE | 7.a DEMAND-ABSENCE | REJECT-FOR-FIT.a |

### Probe 7 Demand-Gate Application

**Probe 7.a**:
1. No current/queued workflow — JSONL audit files are batch-append append-only; no real-time event consumers
2. Existing primitive — `.jsonl append + PostToolUse hook fire` IS the harness-native streaming (TIER-1-DIRECT Anthropic CC hook lifecycle)
3. Operational mode mismatch — single-user CC runtime is single-writer; Kafka/Redpanda/NATS/bytewax target multi-producer + multi-consumer + scale-out

**Redpanda CR-9 LICENSE blocker** (orthogonal to Probe 7):
- BSL prohibits competitive use; RCL is Redpanda-specific source-available
- Per `canonical.md` Must Never: claude-sota permissive-license-only — STRUCTURAL adoption blocker

**Section 2 verdict**: ALL 4 candidates REJECT (3 via Probe 7.a, 1 via CR-9 LICENSE).

## Section 3 — Multilingual / Translation Specialists

### Candidate Catalog (code+weights license separation MANDATORY)

| # | Repo | Stars | CODE License | WEIGHTS License | Windows | NATIVE-CC | Verdict |
|---|------|-------|--------------|-----------------|---------|-----------|---------|
| 10 | `OpenNMT/CTranslate2` | (powers faster-whisper) | **MIT** [VERIFIED @ HEAD c85c9838, SYSTRAN + OpenNMT Authors] | n/a (inference engine; user provides weights) | ✅ Windows wheels via pip | No native CC; programmatic | **STUDY-PILOT** ⭐ |
| 11 | `facebookresearch/seamless_communication` | (substantial Meta) | **CC-BY-NC 4.0** [VERIFIED @ HEAD 90e2b57a — NonCommercial CLAUSE] | CC-BY-NC | n/a | n/a | **REJECT-FOR-LICENSE** |
| 12 | NLLB-200 / fairseq | Meta research | Likely CC-BY-NC (Meta research pattern) | Likely CC-BY-NC | n/a | n/a | **REJECT-FOR-LICENSE** (assumed; direct LICENSE verify required if ever adopted) |
| 13 | `Helsinki-NLP/Opus-MT` | (high) | **MIT** [VERIFIED @ HEAD e3c69562, Joerg Tiedemann 2004-2020] | per-model on HF Hub (mostly CC-BY 4.0) | Cross-platform Python | No native CC | DEFER-TO-CTRANSLATE2 (CTranslate2 supports OPUS-MT format) |
| 14 | `argosopentech/argos-translate` | (offline translation) | **MIT** [VERIFIED @ HEAD acb03ae7, Argos Open Technologies LLC 2020] | Argos models: CC0 or similar | ✅ pip + offline | No native CC | STUDY-PILOT-CANDIDATE-Plan-B (lighter alt to CTranslate2) |

### Top Candidate Deep-Dive: CTranslate2

**Why CTranslate2 stands out**:
1. **Already underpins W221 audio research**: faster-whisper (W221B speech-to-text top candidate) is built on CTranslate2. Runtime ALREADY depends transitively.
2. **Production-grade**: SYSTRAN-maintained + OpenNMT Authors; HF Optimum integration
3. **Universal multilingual coverage**: supports M2M-100, NLLB, BART, mBART, Pegasus, T5, Whisper, OPUS-MT + decoder-only (Llama, Mistral, Gemma, Qwen2)
4. **Performance**: 4-8× faster than PyTorch on CPU/GPU via quantization (INT8/INT16/FP16); 4× smaller on disk
5. **Windows-portable**: `pip install ctranslate2` ships Windows wheels (Z:-portable)
6. **No internet required at inference**: runs entirely local against pre-converted weights

**Probe 7.b 5-clause check**:
1. ✅ **Named operational use case**: multilingual research-source ingestion. claude-sota-installed routinely encounters non-English sources (Chinese ecosystem repos / Japanese repos / German/French academic papers). Currently only path is Perplexity (network-dep) / Exa (DISABLED) / manual prompting. CTranslate2 + OPUS-MT enables offline non-English source ingestion.
2. ✅ **Cited local input/source path**: `Z:/repos/deps/<repo>/README.md` files (some non-English); `tmp/wave*/` research outputs; PDF research output paths
3. ✅ **Wiring path**: `pip install ctranslate2 ctranslate2-converters huggingface_hub` (CR-6 PyPI official) → `ct2-transformers-converter --model Helsinki-NLP/opus-mt-zh-en --output_dir Z:/claude-sota-installed-state/models/opus-mt-zh-en/` → Python `import ctranslate2` in new skill `.claude/skills/translation-fallback/SKILL.md`. NO new MCP needed (programmatic in-process)
4. ✅ **Incumbent comparison**: Perplexity MCP is network-dependent + leaks queries; CTranslate2 + OPUS-MT enables offline translation with zero network egress
5. ✅ **Reversible time-box**: pilot owner = operator; max pilot cost ~30min install + 1 wired skill (<200 LOC); 30-day success criterion = ≥1 cited use during research wave; retirement = `pip uninstall ctranslate2 ctranslate2-converters` + remove skill

**STUDY-PILOT-ELIGIBLE under Probe 7.b** — all 5 clauses pass.

**CR-12 disposition**: `GENUINELY-NEW` — fills offline multilingual ingestion gap not served by Perplexity-MCP (network-dependent + query-leaking) or Exa-MCP (disabled per `.claude/settings.json:disabledMcpjsonServers` 2026-05-03).

### Argos-Translate (Plan B)

Per direct LICENSE: MIT (Argos Open Technologies LLC 2020). Smaller surface than CTranslate2 (purely translation, no LLM inference). Defer to CTranslate2 first — if CTranslate2 pilot fails, fall back to argos-translate as Plan B.

### REJECT-FOR-LICENSE entries

- **seamless_communication**: CC-BY-NC 4.0 verified verbatim @ `Z:/repos/deps/seamless_communication/LICENSE @ HEAD 90e2b57a` — "NonCommercial purposes only". STRUCTURAL adoption blocker per Probe 6 (matches openviking AGPLv3 REJECT 0.92 precedent).
- **NLLB-200**: assumed CC-BY-NC pattern (Meta research convention); DEFER until direct LICENSE verify of specific HF model card.

## Section 4 — Summary

### ADOPT-NOW

**NONE.**

### STUDY-PILOT

⭐ **OpenNMT/CTranslate2** (Section 3 #10):
- License: MIT (verified)
- Probe 7.b 5/5 PASS (multilingual offline ingestion creates new use case)
- Already transitively depended-on via faster-whisper from W221
- Reversible time-box: ~30min install + 1 skill, <200 LOC, 30-day evaluation
- Pilot ownership: operator
- **REQUIRED**: orchestrator MUST file Path P codex T1 ratification before pilot install lands

**Secondary STUDY-PILOT-CANDIDATE-Plan-B**: argosopentech/argos-translate MIT.

### REJECT

- **Data engineering (5 candidates)**: REJECT-FOR-FIT.a (DEMAND-ABSENCE) — airflow / prefect / dagster / flyte / temporal-DEFER
- **Streaming (4 candidates)**: REJECT (3 via DEMAND-ABSENCE; **Redpanda CR-9 LICENSE BLOCKER BSL+RCL**)
- **Multilingual (2 REJECT-FOR-LICENSE)**: **seamless_communication CC-BY-NC 4.0** + NLLB-200 (assumed CC-BY-NC pending verify)

**TOTAL**: 11 REJECT + 1 STUDY-PILOT (CTranslate2) + 1 STUDY-PILOT-Plan-B (argos-translate) + 1 DEFER-TO-W220 (temporal) = 14 candidates assessed.

## Section 5 — VERDICT

**VERDICT**: NEEDS-PATH-P-RATIFICATION conf=0.86 — Sub-layers 1 (data eng workflow orchestrators) and 2 (streaming) ALL REJECT under Probe 7.a DEMAND-ABSENCE confirms task brief expectation; Sub-layer 3 multilingual surfaces 1 STUDY-PILOT (CTranslate2, MIT, Probe 7.b 5/5 PASS) + 1 Plan-B (argos-translate, MIT). 2 hard CR-9 LICENSE-blockers identified (Redpanda BSL+RCL; seamless_communication CC-BY-NC). STAND-IN-NOTICE — orchestrator MUST file Path P codex T1 ratification on CTranslate2 STUDY-PILOT before any pilot install lands.
