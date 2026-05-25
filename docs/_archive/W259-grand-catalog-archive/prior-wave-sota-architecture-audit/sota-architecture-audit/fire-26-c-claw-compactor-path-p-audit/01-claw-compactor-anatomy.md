# 01 — open-compress/claw-compactor Anatomy (Fire 26-C)

> **Cite anchor (TIER-1-DIRECT)**: local clone `Z:/repos/deps/claw-compactor/` HEAD `c1b936d40b1145c7a257bd6e34a17994f467495f` (v7.1.0; MIT; 2026-04-01 commit "security audit + code review + performance fixes" Co-Authored-By: Claude Opus 4.6)
> **Probe method**: direct filesystem audit + codex T1 cross-verification of 11 source files

## Repo metadata (verified via gh api 2026-05-10)

| Field | Value |
|---|---|
| Full name | `open-compress/claw-compactor` |
| License | MIT (PURE) |
| Stars | 2,320 |
| Forks | 218 |
| Open issues | 8 |
| Created | 2026-02-10T00:27:08Z (3 months — Axis-3 STABLE-BURN-IN PASS >90d) |
| Updated | 2026-05-09T06:51:11Z (1 day before audit — ACTIVE) |
| Pushed | 2026-04-01T08:31:20Z (HEAD commit) |
| HEAD SHA | `c1b936d40b1145c7a257bd6e34a17994f467495f` |
| Language | Python (primary) + Node.js (proxy/ subsystem) |
| Size | 2,325 KB |
| Topics | ai-agent-tools / ast-code-analysis / context-compression / fusion-pipeline / llm-cost-reduction / openclaw / prompt-compression / reversible-compression / tree-sitter (20 topics total) |
| PyPI | `claw-compactor` v7.1.0 (production-stable classifier) |
| Homepage | https://www.opencompress.ai/ |
| Discord | https://discord.com/invite/clawd |

## 🚨 Contributor concentration (codex T1 LOAD-BEARING finding)

Per `gh api repos/open-compress/claw-compactor/contributors`:

| Contributor | Commits | % concentration |
|---|---|---|
| `aeromomo` | 49 | **94%** |
| `justiniggy` | 2 | 4% |
| `haosenwang1018` | 1 | 2% |

**This is effectively a solo-author project** despite "OpenClaw Contributors" pluralization in pyproject.toml. **Axis-1 ≥3-distinct-orgs convergence-gate FAIL** — STRONG-PROVENANCE-EXPRESS predicate does NOT fire because maintainer org is not official-T1 and no named-T2 endorsement exists.

## Mia OVER catches by codex T1 (4th in Wave 134 series)

### Mia OVER #1 — Stage-count concern RESOLVED

**Orchestrator pre-audit**: "11 stages found in fusion/, missing 3 from documented 14"
**Codex T1 verification**: `scripts/lib/fusion/engine.py:194` — "14-stage Python pipeline construction with adapter stages"
**Resolution**: 11 distinct stage files in fusion/ + 3 adapter-wrapped legacy utilities (rle.py + tokenizer_optimizer.py + abbrev logic) = 14 stages total. Orchestrator's "missing 3" concern was OVER.

### Mia OVER #2 — Test count drift trail (multiple values; codex T1 measured 1,945 test functions / 57 test files)

| Source | Test count |
|---|---|
| README | "1,600+ tests" |
| ARCHITECTURE.md line 462 | 1,663 tests |
| ARCHITECTURE.md line 541 | 1,676 tests |
| HEAD commit message | "1,932 passed, 0 failed" |
| **Codex T1 local probe** | **57 test files + 1,945 test function definitions** |

Codex T1's more granular measurement is authoritative: **57 test_*.py files containing 1,945 distinct test function definitions**. The 4 documented counts represent honest evolution across commits (not fabrication), with HEAD commit showing 1,932 passed. Row-2 PASS on test-count integrity.

### Mia OVER #3 — `.mjs` Repository Layout doc-drift CONFIRMED

ARCHITECTURE.md lines 513-543 list `base.mjs / pipeline.mjs / cortex.mjs / photon.mjs ...` (Node.js extensions). Actual filesystem [VERIFIED via `ls scripts/lib/fusion/`]: ALL `.py` Python files. **P3-level documentation drift** confirmed but does NOT invalidate the architecture. P3_arch_api PASS-with-caveat.

### 🚨 Mia OVER #4 — LLMLingua-2 comparison FABRICATION (LOAD-BEARING finding)

**Codex T1 verdict verbatim**:
> "FAIL (benchmark/compressors.py uses RandomDropCompressor as an LLMLingua-2 proxy, not LLMLingua-2; README direct LLMLingua-2 ROUGE-L table is therefore unsupported)"

> "comparison_methodology_concern": "Verified: benchmark/compressors.py labels RandomDropCompressor as an LLMLingua-2 proxy and benchmark/RESULTS.md reports RandomDrop, RuleCompressor, Engram, and NoCompression, not actual LLMLingua-2. Treat README ROUGE-L 0.723 vs LLMLingua-2 0.570 as unsupported/overclaimed until rerun with a faithful LLMLingua-2 baseline."

**Implication**: the headline marketing claim "claw-compactor beats LLMLingua-2 by 27% in ROUGE-L at 0.5 compression" is **methodologically unsupported**. The benchmark compares against a `RandomDropCompressor` that drops tokens at random, labels it "LLMLingua-2 proxy", and reports the resulting numbers. This is a Row-2 fabrication-test FAIL per `convergence-gate.md §Anti-pattern Row-2 fabrication-test FAIL`.

## 14-stage Fusion Pipeline (from ARCHITECTURE.md)

| # | Stage | Order | Purpose |
|---|---|---|---|
| 1 | QuantumLock | 3 | KV-cache alignment for system messages |
| 2 | Cortex | 5 | Content-type + language detection (16 langs) |
| 3 | Photon | 8 | Image/base64 blob compression |
| 4 | RLE | 10 | Path / IP / enum shorthand |
| 5 | SemanticDedup | 12 | Within-message simhash dedup (Hamming ≤3) |
| 6 | Ionizer | 15 | JSON array schema+sample (up to 82% reduction) |
| 7 | LogCrunch | 16 | Log line folding (errors preserved) |
| 8 | SearchCrunch | 17 | Search result dedup + truncation |
| 9 | DiffCrunch | 18 | Unified diff context-line folding |
| 10 | StructuralCollapse | 20 | Import / assertion / pattern collapse |
| 11 | Neurosyntax | 25 | Tree-sitter AST compression |
| 12 | Nexus | 35 | ML token-level filtering |
| 13 | TokenOpt | 40 | BPE-friendly format cleanup |
| 14 | AbbrevStage | 45 | NL abbreviations (text only) |

Plus **Cross-message SemanticDedup** runs BEFORE the per-message pipeline.

Plus **RewindStore** (hash-addressed lossless fallback for Photon / Ionizer / LogCrunch / SearchCrunch — content stored under SHA-256, LLM retrieves via `rewind_retrieve` tool call).

## Scope split (3 distinct sub-systems)

| Sub-system | LOC | Function | Eee fit |
|---|---|---|---|
| **Python Fusion Pipeline** (`scripts/lib/fusion/` + `scripts/lib/rewind/`) | ~200 KB Python | 14-stage prompt compression library | **ADMISSIBLE** (P5 PASS) |
| **Node.js proxy stack** (`proxy/`) | ~290 KB JS | OpenAI-shaped middleware (server.mjs 82K + rate-limit + session-affinity + redis + token-tracker + dashboard) | **INADMISSIBLE** (P4 FAIL — DUPLICATE CLIProxyAPI) |
| **Engram subsystem** (`scripts/lib/engram*.py` + `scripts/engram_*.py`) | ~200 KB Python | "Real-time, LLM-driven Observational Memory" using ANTHROPIC_API_KEY/OPENAI_API_KEY | **INADMISSIBLE** (P4 FAIL — DUPLICATE graphiti + mcp-memory) |

**Codex T1 scope_split_verdict confirmed**: Python FusionEngine alone is ADMISSIBLE for narrow pilot; full repo (proxy + Engram) is INADMISSIBLE.

## Documentation framing inconsistency (3 different stage counts)

| Source | Stage / layer count | Framing |
|---|---|---|
| ARCHITECTURE.md | 14 stages | Engineering document |
| SKILL.md | 6 layers | OpenClaw skill product |
| pyproject.toml | N/A — `claw_compactor.fusion` + `claw_compactor.rewind` packages | PyPI installable |

For eee adoption only the engineering document (ARCHITECTURE.md) is operationally relevant; SKILL.md is OpenClaw-skill-specific framing that doesn't apply outside the OpenClaw ecosystem.

## Files codex T1 directly probed (sources_consulted from verdict)

- `https://github.com/open-compress/claw-compactor` (canonical)
- `Z:/repos/deps/claw-compactor/README.md`
- `Z:/repos/deps/claw-compactor/ARCHITECTURE.md`
- `Z:/repos/deps/claw-compactor/benchmark/compressors.py` ← **load-bearing fabrication catch**
- `Z:/repos/deps/claw-compactor/benchmark/evaluate.py`
- `Z:/repos/deps/claw-compactor/benchmark/RESULTS.md`
- `Z:/repos/deps/claw-compactor/scripts/lib/fusion/engine.py` ← **resolved 14-stage concern**
- `Z:/repos/deps/claw-compactor/scripts/lib/fusion/neurosyntax.py`
- `Z:/repos/deps/claw-compactor/proxy/README.md`
- `Z:/claude-sota/.claude/rules/convergence-gate.md` (cited for axis verification)
- `Z:/claude-sota-installed/AGENTS.md` (cited for context)

## Mia ladder advance

Pre-Fire-26-C: n=1712 (Fire 26-B close)
Post-Fire-26-C anatomy: **n=1720** (+8: solo-author 94% concentration / 14-stage resolved via adapter / mjs-vs-py confirmed drift / LLMLingua-2 fabrication-test FAIL / scope split 3-way Python+proxy+engram / 4 Mia OVER catches by codex T1 / test count integrity Row-2 PASS / Axis-1 ≥3-distinct-orgs FAIL)
