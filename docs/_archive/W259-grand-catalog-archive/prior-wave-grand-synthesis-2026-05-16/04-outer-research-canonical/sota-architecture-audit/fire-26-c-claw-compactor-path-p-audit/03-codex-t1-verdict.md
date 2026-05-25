# 03 — Codex T1 Path P Verdict (Cross-Model GPT-5.5 REAL — Fire 26-C)

> **Method**: Path P recipe (codex exec foreground+tee, n=16 → **n=17 reproducible**)
> **Tokens**: 358,418 codex-side (largest Fire 26 series — extensive multi-source verification including direct gh api probes + filesystem walks + benchmark methodology verification)
> **Wall-clock**: ~4m 38s (21:11:35 → 21:16:13 local)
> **Verdict origin**: REAL GPT-5.5 codex CLI
> **Verbatim trace**: `.claude/state/codex_consult_w134_f26c_claw_compactor_OUT.txt` (11,453 LOC)

## Verbatim verdict at EOF

```json
{
  "verdict": "CITE-PATTERN-ONLY",
  "confidence": 0.88,
  "summary": "Do not install/adopt claw-compactor now. The Python FusionEngine appears real and has cite-worthy per-task compression patterns, but the load-bearing adoption gates fail: axis-1 convergence is single-org/no named-T2, and the README's LLMLingua-2 numeric comparison is not supported by a faithful LLMLingua-2 benchmark implementation in this checkout.",
  "probe_dag_verdicts": {
    "P1_count_over": "PASS (GitHub API: 2320 stars, 218 forks, 8 open issues; 57 test_*.py files and 1945 test function definitions locally)",
    "P2_sdk_vs_cli": "PASS (PyPI v7.1.0 exists; Python package/CLI shape present; do not adopt Node proxy)",
    "P3_arch_api": "PASS-with-caveat (actual scripts/lib/fusion/engine.py builds 14 stages; ARCHITECTURE.md has stale .mjs layout and inconsistent test-count docs)",
    "P4_plugin_namespace": "FAIL for full repo (proxy duplicates eee CLIProxyAPI; Engram duplicates graphiti/mcp-memory; Python lib alone is narrower)",
    "P5_mode_harness": "PASS for Python lib alone; FAIL for full proxy stack; FAIL for Engram subsystem",
    "P6_blockers": "PASS-with-caveat (MIT, pin claw-compactor==7.1.0, zero required Python deps; optional tiktoken/tree-sitter-language-pack/Pillow/torch must stay optional; use 2-round fix-forward budget if piloted)",
    "P7a_demand_absence": "PASS only for narrow per-task prompt/tool-output compression; FAIL for session-start descriptor pressure, proxy, and memory layers already covered by eee",
    "P7b_demand_creates": "NOT-ELIGIBLE"
  },
  "row2_fabrication_test": "FAIL (benchmark/compressors.py uses RandomDropCompressor as an LLMLingua-2 proxy, not LLMLingua-2; README direct LLMLingua-2 ROUGE-L table is therefore unsupported)",
  "novel_capability_for_eee": "PARTIAL-OVERLAP",
  "install_footprint_acceptable": "CAVEAT-NOTED",
  "addresses_fire23_p0": "NO",
  "axis_1_convergence_gate": "FAIL (single org open-compress/OpenClaw; no verified >=3 independent T1 sources and no named-T2 endorsement; STRONG-PROVENANCE-EXPRESS does not fire because maintainer org is not official/T2-equivalent)",
  "scope_split_verdict": {
    "python_lib_alone": "ADMISSIBLE",
    "full_proxy_stack": "INADMISSIBLE",
    "engram_subsystem": "INADMISSIBLE"
  },
  "recommended_integration_option": "C: CITE-PATTERN-ONLY",
  "cite_pattern_extract_candidates": [
    "Z:/repos/deps/claw-compactor/scripts/lib/fusion/engine.py:194 - 14-stage Python pipeline construction with adapter stages resolving the filesystem stage-count concern",
    "Z:/repos/deps/claw-compactor/scripts/lib/fusion/base.py:30 - frozen FusionContext/FusionResult/FusionStage contract; useful pattern despite mutable metadata caveat",
    "Z:/repos/deps/claw-compactor/scripts/lib/fusion/pipeline.py:38 - ordered gate-before-compress pipeline executor",
    "Z:/repos/deps/claw-compactor/scripts/lib/fusion/content_detector.py:1 - rule-based content routing cascade for code/json/log/diff/search/text",
    "Z:/repos/deps/claw-compactor/scripts/lib/fusion/ionizer.py:116 - JSON array schema/sample compression with RewindStore fallback",
    "Z:/repos/deps/claw-compactor/scripts/lib/rewind/retriever.py:17 - provider-specific rewind_retrieve tool definition pattern",
    "Z:/repos/deps/claw-compactor/scripts/lib/fusion/tiered_compaction.py:1 - micro/auto/full compaction levels with circuit breaker and re-injection hooks",
    "Z:/repos/deps/claw-compactor/scripts/lib/fusion/skill_reinjection.py:1 - post-compaction recent-tool schema reinjection pattern, cite only; not a Fire 23 P0 session-start solution",
    "Z:/repos/deps/claw-compactor/scripts/lib/fusion/quantum_lock.py:196 - system-message dynamic-fragment cache-stabilization pattern, cite only; verify against Anthropic cache behavior before use"
  ],
  "prescribed_edits": [],
  "next_steps": [
    "Do not install claw-compactor wholesale into eee.",
    "Do not wire proxy/ or Engram; both are duplicate-functionality surfaces against CLIProxyAPI and graphiti/mcp-memory.",
    "Record CITE-PATTERN-ONLY with the cited Python patterns above.",
    "If recurring large non-cacheable per-task inputs are measured, run a bounded isolated pilot only: dedicated venv, claw-compactor==7.1.0, Python FusionEngine only, no proxy, no Engram, compare against repomix/context-mode/manual summarization/cache_control.",
    "Reject README LLMLingua-2 numeric claims until benchmark/compressors.py uses an actual LLMLingua-2 implementation on the same datasets, seeds, retention budgets, and metrics.",
    "Re-audit adoption only after axis-1 convergence is satisfied: >=3 independent T1 sources plus >=2 named T2 practitioner artifacts or a valid strong-provenance express predicate."
  ],
  "comparison_methodology_concern": "Verified: benchmark/compressors.py labels RandomDropCompressor as an LLMLingua-2 proxy and benchmark/RESULTS.md reports RandomDrop, RuleCompressor, Engram, and NoCompression, not actual LLMLingua-2. Treat README ROUGE-L 0.723 vs LLMLingua-2 0.570 as unsupported/overclaimed until rerun with a faithful LLMLingua-2 baseline."
}
```

## Verdict shape disposition

Per `codex-t1-fix-forward-pattern.md`:
- **CITE-PATTERN-ONLY @ conf=0.88** — 4th CITE-PATTERN-ONLY in Wave 134 NEW-candidate series
- **Empty `prescribed_edits`** — no Pattern A apply for INSTALL decision
- **9 cite-pattern extract candidates** with file:line precision
- **Conditional bounded pilot path** (Python FusionEngine only, no proxy, no Engram) IF future quantitative evidence emerges

## Cross-model gate satisfaction

| Aspect | Status |
|---|---|
| Verdict origin | ✅ REAL GPT-5.5 via codex CLI v0.130.0 |
| CR-3 cross-model consensus | ✅ FULLY SATISFIED |
| CR-3 Phase 1 bootstrap exception | ✅ orchestrator-side codex exec foreground+tee |
| Path P recipe ladder | n=16 → **n=17 reproducible** |

## 🚨 Critical codex T1 contributions

### 1. LLMLingua-2 benchmark fabrication catch (HIGHEST-VALUE finding)

**Verbatim**:
> "FAIL (benchmark/compressors.py uses RandomDropCompressor as an LLMLingua-2 proxy, not LLMLingua-2; README direct LLMLingua-2 ROUGE-L table is therefore unsupported)"

This is the **single most valuable finding** of Fire 26-C. Without codex T1's direct probe of `benchmark/compressors.py` + `benchmark/RESULTS.md`, the orchestrator would have proceeded with the assumption that claw-compactor's ROUGE-L 0.723 vs LLMLingua-2 0.570 was a legitimate benchmark. Instead:

- `benchmark/compressors.py` defines a class `RandomDropCompressor` that drops tokens at random
- This class is labeled "LLMLingua-2 proxy" in the benchmark scaffolding
- `benchmark/RESULTS.md` reports results vs `RandomDrop`, `RuleCompressor`, `Engram`, `NoCompression`
- Actual `microsoft/LLMLingua` is NEVER invoked in the benchmark
- The README's headline `0.723 vs 0.570` table is therefore **methodologically unsupported**

Per `convergence-gate.md §Anti-pattern Row-2 fabrication-test FAIL`: "≥3 README numeric claims without methodology citation auto-FAIL. Across multiple prior live A/B verifications of fabrication-pattern candidates, none survived verification."

### 2. Solo-author quantification (Axis-1 convergence-gate evidence)

**Verbatim** (`gh api repos/open-compress/claw-compactor/contributors`):
- `aeromomo` — 49 commits (94%)
- `justiniggy` — 2 commits (4%)
- `haosenwang1018` — 1 commit (2%)

**Implication**: claw-compactor is effectively a solo-author project despite "OpenClaw Contributors" pluralization. Axis-1 ≥3-distinct-orgs convergence-gate FAILS without ambiguity. STRONG-PROVENANCE-EXPRESS predicate would need (a) ≥30d age (satisfied) + (b) official-org maintainer (NOT — OpenClaw is fresh org founded 2026) + (c) named-T2 endorsement (NOT — no named-T2 found). FAIL.

### 3. 14-stage architecture concern RESOLVED via adapter pattern

**Codex T1**: `scripts/lib/fusion/engine.py:194` builds 14 stages via adapter pattern.

This resolves the orchestrator's pre-audit OVER concern that "ARCHITECTURE.md claims 14 stages but filesystem only has 11 in `fusion/`". The missing 3 (RLE / TokenOpt / AbbrevStage) live at `scripts/lib/` root as legacy utilities, wrapped by adapter classes in `engine.py:194`. The 14-stage claim is architecturally accurate; only the file-organization is mis-documented in ARCHITECTURE.md (`.mjs` extension drift).

### 4. Scope tri-furcation (Python lib / proxy / Engram)

**Codex T1 scope_split_verdict**:
- **Python lib alone**: ADMISSIBLE (~200 KB; FusionEngine + RewindStore)
- **Full proxy stack**: INADMISSIBLE (~290 KB JS; DUPLICATE CLIProxyAPI)
- **Engram subsystem**: INADMISSIBLE (~200 KB Python; DUPLICATE graphiti + mcp-memory)

This is the **strongest** Probe 4 + Probe 5 bifurcation in Wave 134 series. Codex T1 was explicit about which sub-system passes which probe.

### 5. Fire 23 P0 orthogonality CONFIRMED (matches Fire 26-B finding)

**Codex T1**: `addresses_fire23_p0: NO`

This **confirms Fire 26-B's architectural insight** that token economy operates at distinct layers:
- Session-start: plugin/skill/MCP descriptor inflation → W134-F24-C3 Task Master Selective MCP Tool-Loading
- Per-task: prompt + context compression → LLMLingua scope (Fire 26-B) + claw-compactor scope (Fire 26-C)

Both LLMLingua and claw-compactor operate at the per-task layer. Neither addresses the session-start descriptor budget. **W134-F24-C3 remains the correct Fire 23 P0 primitive.**

### 6. 9 cite-pattern extract candidates with file:line precision

The most cite-pattern-rich Wave 134 audit (vs LLMLingua's 5):

1. `scripts/lib/fusion/engine.py:194` — 14-stage adapter-pattern pipeline construction
2. `scripts/lib/fusion/base.py:30` — frozen FusionContext / FusionResult / FusionStage contract
3. `scripts/lib/fusion/pipeline.py:38` — ordered gate-before-compress executor
4. `scripts/lib/fusion/content_detector.py:1` — rule-based content routing cascade (code/json/log/diff/search/text)
5. `scripts/lib/fusion/ionizer.py:116` — JSON array schema+sample compression with RewindStore fallback
6. `scripts/lib/rewind/retriever.py:17` — provider-specific rewind_retrieve tool definition
7. `scripts/lib/fusion/tiered_compaction.py:1` — micro/auto/full compaction levels with circuit breaker + re-injection hooks
8. `scripts/lib/fusion/skill_reinjection.py:1` — post-compaction recent-tool schema reinjection (CITE-ONLY, NOT Fire 23 P0 solution)
9. `scripts/lib/fusion/quantum_lock.py:196` — system-message dynamic-fragment cache-stabilization (CITE-ONLY, verify against Anthropic cache behavior)

Patterns #7-9 are particularly interesting because they touch on session/context management (tiered compaction circuit-breaker, skill reinjection, cache-boundary handling) — even though codex T1 explicitly marks them CITE-ONLY (not Fire 23 P0 solutions). These can inform future cwc-long-running-agents observability extensions.

## Conditional bounded-pilot path

Per codex T1 next_steps verbatim:

> "If recurring large non-cacheable per-task inputs are measured, run a bounded isolated pilot only: dedicated venv, claw-compactor==7.1.0, Python FusionEngine only, no proxy, no Engram, compare against repomix/context-mode/manual summarization/cache_control."

**Pre-conditions** (NONE currently met):
1. Quantitative measurement of `.claude/state/codex_consult_*_OUT.txt` size distribution showing recurring large non-cacheable outputs
2. Evidence that `repomix` + `context-mode` + `cache_control` fail to compress these specific outputs
3. Comparable baseline established

**Re-audit-for-adoption pre-conditions**:
- ≥3 independent T1 sources verified
- ≥2 named-T2 practitioner artifacts cited
- OR valid STRONG-PROVENANCE-EXPRESS predicate
- AND benchmark/compressors.py rerun with faithful LLMLingua-2 implementation on identical datasets/seeds/retention budgets/metrics

## Path P recipe ladder advance

| Fire | Subject | Verdict | Tokens |
|---|---|---|---|
| 24-A | BMAD | REJECT-FOR-FIT | 94,987 |
| 24-B | CCPM | CITE-PATTERN-ONLY | 115,741 |
| 24-C | Task Master | CITE-PATTERN-ONLY | 175,555 |
| 24-D | Agent OS v3 | STUDY-PILOT-NARROW | 143,587 |
| 24-E | Claude Memory Bank | REJECT-FOR-FIT | 79,094 |
| 25 | Discovery wave | Pattern B HNF | 175k+ |
| 26-A | cisco-mcp-scanner | STUDY-PILOT-NARROW | 128,628 |
| 26-B | microsoft/LLMLingua | CITE-PATTERN-ONLY | 82,142 |
| **26-C** | **open-compress/claw-compactor** | **CITE-PATTERN-ONLY** | **358,418** ← largest |

Total codex tokens across Fire 24+25+26: **~1.35M tokens** (~$15-25 estimated). Fire 26-C alone consumed 358K — codex extensively probed benchmark methodology + filesystem walks + multiple gh api calls + cross-file content_detector + engine + neurosyntax + proxy + RESULTS.md.

## Verdict shape distribution (Wave 134 NEW-candidate series — updated)

| Verdict | Count | Subjects |
|---|---|---|
| REJECT-FOR-FIT | 2 | BMAD + Claude Memory Bank |
| **CITE-PATTERN-ONLY** | **4** | CCPM + Task Master + LLMLingua + **claw-compactor** |
| STUDY-PILOT-NARROW | 2 | Agent OS v3 + Cisco mcp-scanner |
| Pattern B HNF | 1 | Discovery wave |
| APPROVE | 0 | — |

CITE-PATTERN-ONLY is the **DOMINANT outcome** (4/9 = 44%) for Wave 134 NEW-candidates — solidifying as the expected shape for SDK-only / specialized-research tools that have value as PATTERNS but fail Probe 4/5/7a for full adoption.

## Mia ladder advance

n=1727 → **n=1735** (+8: codex T1 verdict captured / 9 cite-patterns with file:line precision / scope tri-furcation Python/proxy/Engram / LLMLingua-2 fabrication-test catch HIGHEST-VALUE / solo-author 94% quantified / Path P n=17/17 reproducible / verdict shape distribution updated / Fire 23 P0 orthogonality CONFIRMED via 2nd independent codex T1 verdict — 2-fire convergence on architectural insight)
