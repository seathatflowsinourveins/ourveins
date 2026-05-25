# 02 — Probe DAG 1-7 Application to open-compress/claw-compactor

> **Cite anchor**: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG 1-7
> **Cross-model gate**: Path P codex T1 verdict CITE-PATTERN-ONLY conf=0.88

## Probe DAG verdicts (codex T1 verbatim)

### Probe 1 — count-OVER

| Evidence | Verdict |
|---|---|
| Star count 2,320 verified via gh api | PASS |
| Forks 218 verified | PASS |
| 57 test_*.py files + 1,945 test function defs locally | PASS (Row-2 PASS on test integrity) |
| Test count documented values (1,600+ / 1,663 / 1,676 / 1,932) reflect honest evolution | PASS |

**Codex T1**: P1 = **PASS** ("GitHub API: 2320 stars, 218 forks, 8 open issues; 57 test_*.py files and 1945 test function definitions locally")

### Probe 2 — SDK-vs-CLI surface

| Evidence | Verdict |
|---|---|
| PyPI `claw-compactor` v7.1.0 production-stable | PASS |
| Python package shape (`from claw_compactor.fusion import FusionEngine`) | PASS |
| CLI binary `claw-compactor` via pyproject.toml scripts | PASS |
| Node.js proxy CLI (`proxy/start.sh`) | (do NOT adopt) |

**Codex T1**: P2 = **PASS** ("PyPI v7.1.0 exists; Python package/CLI shape present; do not adopt Node proxy")

### Probe 3 — architectural-API

| Evidence | Verdict |
|---|---|
| `scripts/lib/fusion/engine.py:194` builds 14 stages via adapter pattern (resolves filesystem count concern) | PASS |
| ARCHITECTURE.md `.mjs` doc-drift | CAVEAT |
| Test-count doc inconsistency (4 values) | CAVEAT |

**Codex T1**: P3 = **PASS-with-caveat** ("actual scripts/lib/fusion/engine.py builds 14 stages; ARCHITECTURE.md has stale .mjs layout and inconsistent test-count docs")

### Probe 4 — plugin-namespace (DECISIVE FAIL FOR FULL REPO)

| Evidence | Verdict |
|---|---|
| Python lib `claw_compactor` PyPI namespace — no collision | PASS for Python lib alone |
| `proxy/server.mjs` (82KB) duplicates **CLIProxyAPI** middleware | **FAIL** for full repo |
| `engram/` subsystem duplicates **graphiti + mcp-memory** (eee memory layer) | **FAIL** for full repo |

**Codex T1**: P4 = **FAIL for full repo** ("proxy duplicates eee CLIProxyAPI; Engram duplicates graphiti/mcp-memory; Python lib alone is narrower")

### Probe 5 — mode-harness-shape (THREE-WAY SCOPE SPLIT)

| Sub-system | Verdict |
|---|---|
| Python lib alone (`scripts/lib/fusion/` + `scripts/lib/rewind/`) | **PASS** — Python SDK, narrow scope, gates compatible with eee runtime |
| Full proxy stack (`proxy/server.mjs` + middleware) | **FAIL** — duplicates CLIProxyAPI; OpenAI-shaped not Anthropic-shaped; needs Node.js + Redis + dashboard.html runtime |
| Engram subsystem (`engram*.py`) | **FAIL** — LLM-driven memory layer overlaps graphiti + mcp-memory; uses ANTHROPIC_API_KEY/OPENAI_API_KEY runtime calls; would force LLM consumption for memory operations |

**Codex T1**: P5 = **PASS for Python lib alone; FAIL for full proxy stack; FAIL for Engram subsystem**

### Probe 6 — direct-file/registry blockers

| Evidence | Verdict |
|---|---|
| LICENSE = MIT (`LICENSE:1-3` "Copyright (c) 2026 OpenClaw Contributors") | PASS |
| Pin version `claw-compactor==7.1.0` per CR-9 install-risk | PASS-with-caveat |
| Zero REQUIRED Python deps; only optional `tiktoken>=0.5.0` | PASS |
| Tree-sitter via optional `tree-sitter-language-pack` | PASS (must stay optional) |
| Optional Pillow / torch (image stages + ML stages) | PASS (must stay optional) |
| 2-round fix-forward budget per CR-9 | PENDING |

**Codex T1**: P6 = **PASS-with-caveat** ("MIT, pin claw-compactor==7.1.0, zero required Python deps; optional tiktoken/tree-sitter-language-pack/Pillow/torch must stay optional; use 2-round fix-forward budget if piloted")

### Probe 7.a — demand-absence (NUANCED PASS+FAIL)

| Sub-system / claim | Verdict |
|---|---|
| Narrow per-task prompt/tool-output compression at the Python lib layer | **PASS** — eee lacks a dedicated per-task prompt compression primitive at this scope |
| Session-start descriptor pressure (Fire 23 P0) | **FAIL** — claw-compactor does NOT address this layer (same as LLMLingua per Fire 26-B refutation) |
| Proxy / middleware layer | **FAIL** — covered by existing CLIProxyAPI |
| Memory layer | **FAIL** — covered by graphiti + mcp-memory |

**Codex T1**: P7a = **PASS only for narrow per-task prompt/tool-output compression; FAIL for session-start descriptor pressure, proxy, and memory layers already covered by eee**

### Probe 7.b — demand-creates-new-workflow ELIGIBILITY

**Codex T1**: P7b = **NOT-ELIGIBLE** — eee's per-task token economy is currently covered by RTK + ccusage + repomix + cache_control + context-mode at sufficient quality; no demonstrated unmet demand justifies a 14-stage Python lib pilot at this time.

## Aggregate Probe DAG verdict

| Probe | Full repo | Python lib alone |
|---|---|---|
| P1 count-OVER | PASS | PASS |
| P2 SDK-vs-CLI | PASS | PASS |
| P3 arch-API | PASS-with-caveat | PASS-with-caveat |
| P4 plugin-namespace | **FAIL** (proxy+engram duplicate) | PASS |
| P5 mode-harness | FAIL (proxy + engram) | **PASS** |
| P6 blockers | PASS-with-caveat | PASS-with-caveat |
| P7a demand-absence | **FAIL** (covered layers) | PASS (narrow per-task) |
| P7b demand-creates | NOT-ELIGIBLE | NOT-ELIGIBLE |

**Full repo**: 4 FAIL + 2 PASS-with-caveat + 2 PASS = decisive FAIL.
**Python lib alone**: 0 FAIL + 2 PASS-with-caveat + 5 PASS + 1 NOT-ELIGIBLE = admissible for narrow pilot ONLY IF demand emerges.

## Axis-1+2+3 convergence-gate

| Axis | Threshold | Verdict |
|---|---|---|
| Axis 1 ≥3 distinct T1 orgs | single-org `open-compress/OpenClaw` (no STRONG-PROVENANCE-EXPRESS — not Anthropic-official OR named-T2-equivalent) | **FAIL** |
| Axis 2 ≥2 named T2 practitioners with dated artifact | no named-T2 endorsement found | **FAIL** |
| Axis 3 ≥3 months stability | 2026-02-10 = 3 months (>90d burn-in PASS); cpd ≈ 49/90 ≈ 0.54 (well under fast-churn 10) — STABLE-BURN-IN | PASS |

**Codex T1**: axis_1_convergence_gate = **FAIL** ("single org open-compress/OpenClaw; no verified >=3 independent T1 sources and no named-T2 endorsement; STRONG-PROVENANCE-EXPRESS does not fire because maintainer org is not official/T2-equivalent")

## Row-2 fabrication-test (LOAD-BEARING FAIL)

**Codex T1**: row2_fabrication_test = **FAIL**

Verbatim:
> "benchmark/compressors.py uses RandomDropCompressor as an LLMLingua-2 proxy, not LLMLingua-2; README direct LLMLingua-2 ROUGE-L table is therefore unsupported"

> "comparison_methodology_concern": "Verified: benchmark/compressors.py labels RandomDropCompressor as an LLMLingua-2 proxy and benchmark/RESULTS.md reports RandomDrop, RuleCompressor, Engram, and NoCompression, not actual LLMLingua-2. Treat README ROUGE-L 0.723 vs LLMLingua-2 0.570 as unsupported/overclaimed until rerun with a faithful LLMLingua-2 baseline."

**Implication**: the SINGLE strongest marketing claim in the README ("beats LLMLingua-2 by 27% in ROUGE-L") is **methodologically unsupported** — the benchmark uses a strawman `RandomDropCompressor` labeled as "LLMLingua-2 proxy", not actual `microsoft/LLMLingua` v0.x. Per `convergence-gate.md §Anti-pattern Row-2 fabrication-test FAIL`, this is auto-FAIL and short-circuits any expensive verification step.

## Cohort tracking advance

| Cohort | Wave 134 NEW-candidate instances |
|---|---|
| P5 mode-harness FAIL cohort | n=5 (BMAD HARD-GATE + CCPM PM-loop + Task Master PM-loop + LLMLingua integration-fragility + **claw-compactor full repo**) |
| P7a demand-absence FAIL cohort | n=6 (BMAD + CCPM + Task Master + Claude Memory Bank + LLMLingua + **claw-compactor session/proxy/memory layers**) |
| CITE-PATTERN-ONLY verdict cohort | **n=4** (CCPM + Task Master + LLMLingua + **claw-compactor**) |
| Row-2 fabrication-test FAIL cohort | n=1 (claw-compactor — NEW class entry) |
| Axis-1 convergence-gate FAIL cohort | n=1 (claw-compactor — NEW class entry) |

## Orchestrator-codex probe convergence

| Probe | Orchestrator pre-audit | Codex T1 | Convergence |
|---|---|---|---|
| P1 | NEEDS-COUNT-VERIFY | PASS (1,945 test fns) | codex resolved |
| P2 | PASS | PASS | CONVERGENT |
| P3 | NEEDS-RESOLUTION (14-vs-11) | PASS-with-caveat (adapter pattern explains) | codex resolved |
| P4 | PROXY-DUPLICATE-FUNCTION concern | FAIL for full / PASS for Python lib | codex confirmed + bifurcated |
| P5 | PARTIAL-SCOPE | PASS for Python / FAIL for proxy+engram | codex stricter + bifurcated |
| P6 | PASS-WITH-CAVEAT (CR-9) | PASS-with-caveat | CONVERGENT |
| P7a | UNCERTAIN (4 layers) | PASS for narrow / FAIL for 3 of 4 layers | codex resolved |
| Row-2 | NEEDS-METHODOLOGY-VERIFY | **FAIL** (RandomDropCompressor strawman) | **codex LOAD-BEARING catch** |
| Axis-1 | NEEDS-VERIFY (single-org) | FAIL (solo-author 94%) | codex confirmed + quantified |

**3/9 convergent + 5/9 codex-resolved-uncertainties + 1/9 codex stricter** — codex T1 contributed substantially:
- Resolved 14-stage architecture question (adapter pattern)
- Confirmed scope split tri-furcation (Python+proxy+engram)
- **CAUGHT load-bearing LLMLingua-2 benchmark fabrication** (highest-value finding)
- Quantified solo-author concentration (49/52 = 94%)

## Verdict shape: CITE-PATTERN-ONLY @ conf=0.88

Codex T1 returned CITE-PATTERN-ONLY (Option C) because:
1. **Row-2 fabrication-test FAIL** (load-bearing — refutes headline marketing claim)
2. **Axis-1 ≥3-distinct-orgs FAIL** (solo-author project; no STRONG-PROVENANCE-EXPRESS)
3. P4 + P5 FAIL for full repo (proxy + engram DUPLICATE-FUNCTIONALITY)
4. P7a FAIL for 3 of 4 demand layers (only narrow per-task prompt compression is unmet)
5. `addresses_fire23_p0: NO` (per-task layer, NOT session-start descriptor budget — confirms Fire 26-B insight)
6. 9 extractable Python patterns with file:line + adapter-pattern explanation

## Mia ladder advance

n=1720 → n=1727 (+7: Probe DAG 1-7 with 4 FAIL on full repo / Python lib alone P4+P5 PASS / 5-cohort tracking advance / Row-2 fabrication-test new cohort entry / 3/9 convergent + 5/9 codex-resolved + 1/9 codex stricter / addresses_fire23_p0=NO confirms Fire 26-B insight / solo-author 94% quantified)
