---
title: "Wave 253 — Prior-Research Artifact Audit"
date: 2026-05-15
status: AUTHORITATIVE-AUDIT
wave: W253
purpose: "Inventory + gap-classify every prior research artifact in docs/outer research/ so the W253 grand synthesis builds on (not duplicates) prior work, and so uncovered gaps drive the next research wave."
method: "find + wc -l file inventory (orchestrator-direct); gap-class cross-referenced against codex adversarial verdict 9-missing-categories"
---

# Wave 253 — Prior-Research Artifact Audit

## §1 — Artifact inventory (docs/outer research/)

Four prior research generations exist. Total ≈ 8,580 lines of synthesis + 57 kit versions.

### Generation 1 — `kits/` (v5 → v65, 57 versions)
Iterative "all-in-one execution kit" zips/folders. Latest = V65 (`ALL_IN_ONE_CLAUDE_CODE_SOTA_V65.md`, 1,213 lines). Each kit version re-derives a best-of-best list. **Status: SUPERSEDED** — kits are the oldest layer; V65 content is mirrored into `00-prior-research-baseline/`. Treat as historical; do not re-read each version.

### Generation 2 — `wave52/` (7 files, 1,436 lines)
- `iter1a-shan-summary.md` (170) — CCBP shan-summary
- `iter1b-convergence-map.md` (84) + `WAVE52-ITER1B-FINAL-REPORT.md` (105) — convergence mapping
- `iter1c-installed-audit.md` (131) — installed-runtime audit
- `iter1d-eee-install-plan.md` (270) + `iter3a-install-plan.md` (455) — per-repo native install plans
- `iter2b-advanced-unadopted.md` (221) — unadopted advanced candidates
**Status: PARTIALLY SUPERSEDED** — install-plan mechanics still useful as cite reference; star/license data is stale (pre-2026-05).

### Generation 3 — `research-wave-2026-05-15/00-prior-research-baseline/` (29 files, 3,775 lines)
Largest single layer. Key files:
- `ALL_IN_ONE_CLAUDE_CODE_SOTA_V65.md` (1,213) — V65 master execution doc
- `WAVE1-CLOSE-SYNTHESIS-2026-05-15.md` (392) — Wave-1 close synthesis
- `A-existing-artifact-audit-2026-05-15.md` (362) — prior artifact audit (this file's predecessor)
- `C-orchestration-plugin-sota-discovery-2026-05-15.md` (361) — orchestration plugin discovery
- `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md` (338) — V65 best-of-best list
- `B-memory-rag-sota-discovery-2026-05-15.md` (234) — memory/RAG discovery
- `EXECUTE_V65_ELITE_PLAN.md` (144) — V65 execution plan
- 22 smaller topic files (TOKEN_CONTEXT, MODEL_ROUTING, PARALLEL_WORKTREE, EVAL_BENCHMARK, etc.) — each 11-54 lines, topic stubs
- `WHAT_MORE_WAS_NOT_COVERED_ENOUGH.md` (16) — V65 self-declared gap list
**Status: PARTIALLY SUPERSEDED by W251.** V65 list is the input W251 corrected.

### Generation 4 — `research-wave-2026-05-15/01-fresh-research-wave-2026-05-16/` (10 files, 2,215 lines)
The W251 "fresh research wave" — most recent prior generation:
- `GRAND-SYNTHESIS-COMPREHENSIVE-CHECKLIST-2026-05-16.md` (452) — W251 full checklist
- `wave253-C-adversarial-w251-2026-05-15.md` (290) — a prior partial W253-C attempt (PRE-EXISTING — not this wave's work)
- `GRAND-SYNTHESIS-2026-05-16.md` (264) — W251 grand synthesis (§1-§4)
- `A/B/C` agent reports (219+194+162+162+214) — W251 3-agent wave returns
- `W251-grand-comprehensive-checklist-2026-05-16.md` (169) — W251 checklist
- `WAVE252-ACTION-PLAN-2026-05-16.md` (89) — W252 action plan
**Status: CURRENT BASELINE** — W251 verdict was `NEEDS-REVISION-BEFORE-INSTALL`. This is what W253 builds on / corrects.

### Standalone
- `05-grand-catalog/GRAND_CATALOG_2026-05-15.md` (610) — W237-class grand catalog
- `06-executive-brief/EXECUTIVE_SYNTHESIS_BRIEF_2026-05-15.md` (328)
- `VERIFICATION_PASS_2026-05-15.md` (216)

### tmp/ wave artifacts
`tmp/sota-pure-w203..w215+*.md` — extensive scoring matrices already exist (W212 memory/orchestration/obs-eval matrices, W215 llm-serving/code-intel-security matrices). W207 CATALOG-FINAL has a 14-tier install catalog. **Status: PARTIALLY SUPERSEDED** — scoring approach reusable; star data stale.

## §2 — What prior research COVERED WELL (do not re-derive)

| Layer | Prior coverage | Source |
|---|---|---|
| Foundation surfaces | FULL | V65, GRAND_CATALOG §1 |
| Memory MCP (graphiti/mcp-memory/mem0/cognee) | FULL but with stale verdicts | W251 §2, GRAND_CATALOG §5.A |
| Orchestration plugins | FULL (superpowers/wshobson/addy/ECC) | GRAND_CATALOG §2, C-orchestration-discovery |
| Token optimization | PARTIAL — LLMLingua over-weighted (now removed); context-mode license dispute open | W251 §2, TOKEN_CONTEXT_ARCHITECTURE |
| Code intelligence | FULL (serena/repomix/ast-grep) | GRAND_CATALOG §5.C |
| Browser MCP | PARTIAL — Playwright/ChromeDevTools covered; cloud-provider depth thin | W251 §1 |
| Eval/observability | FULL | GRAND_CATALOG §8, EVAL_BENCHMARK |
| Security/hooks | PARTIAL — gitleaks/scanners named; supply-chain depth thin | V65 closure list |

## §3 — Gaps NOT covered (or under-covered) — drive the W253+ research

Cross-referenced against the codex adversarial verdict (`01-codex-bridge-verdicts/adversarial-review-codex-gpt5.5-2026-05-15.md` §2). **9 missing categories confirmed by codex live-probe:**

| # | Missing category | Why it matters for a pure runtime | Prior coverage |
|---|---|---|---|
| G1 | Multi-agent debate / consensus | The user explicitly wants GPT-5.5 adversarial review seamlessly in the workflow — needs a debate/consensus primitive layer | GAP |
| G2 | Cross-cycle durable state | Autonomous /loop needs durable state beyond memory MCP (Temporal/Inngest/Trigger.dev/Dagster/Kestra) | GAP |
| G3 | ADR / context-snapshot | Architecture-decision capture for a long-running runtime | GAP |
| G4 | Skill-quality eval harnesses | Scoring skill value (promptfoo/deepeval/simple-evals/ART) | PARTIAL (promptfoo named, not as skill-eval) |
| G5 | LLM routers | Cross-model routing beyond LiteLLM (Helicone/Portkey/claude-code-router) | GAP |
| G6 | Local model serving | T1 cross-model fallback when codex CLI unavailable (Ollama/vLLM/llama.cpp) | GAP |
| G7 | Synthetic data / fine-tune | DSPy/Distilabel/TRL/Axolotl/LlamaFactory/Unsloth | GAP |
| G8 | Prompt-engineering frameworks | Guidance/Haystack/Semantic-Kernel/promptflow | PARTIAL |
| G9 | Hook / automation frameworks | pre-commit/lefthook/Task as the safety + automation floor | PARTIAL (gitleaks named) |

**Additional under-covered axes** (from W251 §0 + adversarial Q4):
- A4-1: Scoring was prose-verdict, NOT a quantified multi-dimensional matrix — W253 fixes this (10-dim rubric, 94 repos)
- A4-2: Tier-A (default install) vs Tier-B (broad coverage) never cleanly separated
- A4-3: Plugin-namespace collision never probed before install recommendation (codex found 6 conflict pairs)
- A4-4: License-class probed at repo-root only — subdir/package boundaries missed (OpenViking examples Apache, Phoenix package split)
- A4-5: Native-CC-path never classified as a scored dimension (W253 D5)

## §4 — 10-dimension scoring rubric (proposed — codified for W253)

| Dim | Criteria (0-5) | Weight | Probe source |
|---|---|---|---|
| D1 Stars (absolute) | 0=<100 … 5=>=50k | 10% | `gh api repos/<o>/<n>` stargazers_count (DONE — recon-data) |
| D2 Stars velocity (6mo) | 0=stagnant … 5=fast-growing | 8% | codex [EST] from trajectory knowledge |
| D3 Last-push freshness | 0=>180d … 5=<7d | 10% | `gh api` pushed_at (DONE — recon-data) |
| D4 License runtime-safety | 0=AGPL/GPL/SSPL-install … 5=MIT/Apache/BSD | 12% | LICENSE-file read; codex adversarial verdict resolved 11 rows |
| D5 Native CC path | 0=none … 5=`/plugin install` one-line | 15% | README install-section + marketplace.json probe |
| D6 Community convergence | 0=single-author … 5=5+ orgs | 10% | convergence-gate Axis-1 |
| D7 Ecosystem agreement | 0=CC-only … 5=multi-runtime | 5% | cross-tool support evidence |
| D8 Autonomous /loop fit | 0=HARD-GATE-interactive … 5=fully autonomous | 10% | harness-fit Probe 5 mode-harness-shape |
| D9 Source-code quality | 0=poor … 5=production-grade | 10% | codex [EST] / source deep-dive |
| D10 Convergence-gate axes | 0=fail-all … 5=all-3-firm-PASS | 10% | convergence-gate Axis 1+2+3 |

Composite = weighted sum (0-5 scale). **INSTALL-NOW** = Composite≥4.0 ∧ D5≥4 ∧ D4≥4. **STUDY-PILOT** = Composite≥3.0 ∧ D4≥3. **DEFER** = Composite≥2.0. Else **REJECT**.

The 94-repo scored matrix is produced by codex Path P job `b0fhfsi3f` → `03-scoring-matrix/`.

## §5 — Anti-bias note (per user directive)

The user explicitly directed: "you should not impose your current architecture into the new runtime — fully new research via SOTA references without biases; the source of truth should be the SOTA repos." Per the codex adversarial verdict Q4, the Claude orchestrator's known biases are: over-promoting installed-runtime choices, treating ELv2/SSPL as hard-REJECT, treating awesome-lists as install-class, confusing 1M-context with token savings. W253 synthesis MUST be scored from the empirical ground-truth + codex cross-model verdict, NOT from `claude-sota-installed`'s current `.mcp.json` / marketplace inventory.
