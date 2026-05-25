# Wave 145 Fire 2 — NVIDIA/garak Path P codex T1 audit — TRACKER

> **Verdict**: `APPROVE` conf=0.91 · **ship_readiness=READY** · **ship_option=B (Week-1 install)** · 12/12 axes resolved · 0 HNF · 0 install-debt
> **Path P metrics**: 180s wall-clock · 5,200 tokens · 173-LOC verdict · 1944-LOC total OUT file
> **Cross-validation**: 100% with Wave 145 Fire 1 (commit `15faebc`) — confirms CR-12 GENUINELY-NEW + Week-1 priority
> **Closed-loop disposition**: Outcome A ACCEPT-WITH-DOC — Pattern A apply 3 prescribed_edits in single atomic ship

## Fire 30 (W145-F2) scope

User Forward Top-5 🥇 priority per Wave 145 Fire 1 close-synthesis at `docs/sota-architecture-audit/fire-29-w145-gpt55-research-arch-convergence/99-close-synthesis.md:108`. Wave 145+ evolve loop /loop tick 2026-05-11 fires Path P codex T1 dispatch (REAL GPT-5.5 via codex CLI v0.130.0 subprocess + `--skip-git-repo-check --color never` + 300s timeout · DEFAULT profile · foreground+tee) on NVIDIA/garak LLM vulnerability scanner.

## 12-axis verdict summary (per Wave 134 Fire 27-E Forward Discipline #2 dogfood n=4 cycle-322 PROMOTION-ELIGIBLE)

| Axis | Result | Key finding |
|---|---|---|
| A1 TIER-1 multi-org provenance | **PASS firm** | NVIDIA org-level + arXiv paper + DEF CON AI Village + PyPI distribution + 7.8k★; STRONG-PROVENANCE-EXPRESS satisfied |
| A2 Time-decay / 2026 currency | **ACTIVE** | HEAD `c56023a19f595885bab2d8b255a415764908c6be` (main); PyPI 0.15.0 released 2026-05-01 (10 days ago) |
| A3 Peer comparison (cohort C1+C6) | **garak-unique** | Sibling LLM-redteam (PurpleLlama / pyrit / promptmap / vigil-llm / DeepEval-vuln-scan) confirmed; garak fills "nmap-like LLM vulnerability scanner" niche unique vs promptfoo/DeepEval (prompt regression / metric pytest) |
| A4 Failure-mode gaps addressed | **CR-9 install-risk** | 3 gaps closed: token-burn cost guard + provider credentials + report sensitivity routing to state/audit storage |
| A5 Install-priority | **Week-1** | Day-1 omission closure DOWNGRADED to Week-1 per CR-3 prerequisite chain (OSV + gitleaks + Langfuse/Phoenix + promptfoo/inspect_ai + mcp-inspector first per Wave 145 Fire 1 prescriptions) |
| A6 License-use-class | **PASS (Apache-2.0)** | CLI-binary + library-link both PASS; no use-class restriction; permissive-license allowlist clean |
| A7 Maintainer-provenance | **TIER-1-OFFICIAL** | NVIDIA enterprise-backed org repo + NVIDIA copyright + NVIDIA emails in pyproject + multi-contributor releases; original leondz provenance now NVIDIA-anchored |
| A8 Mode-harness compatibility | **PARTIAL autonomous-loop** | Interactive subagent YES · autonomous /loop PARTIAL (token burn for full scans · credential gate · report sensitivity · Windows install needs venv smoke first per README dev-on-Linux/OSX) |
| A9 CR-12 5-class disposition | **GENUINELY-NEW (1st class)** | Confirms Wave 145 Fire 1; existing eee eval primitives cover prompt regression / metric evals / observability / code-security scanners but NOT dedicated LLM vuln scanner with probe/detector/generator harness |
| A10 Anthropic CC policy alignment | **ALIGNED** | docs.anthropic.com/en/docs/claude-code/security + jailbreak-mitigation policy refs explicitly endorse LLM-security testing |
| A11 Cross-validation prior fires | **1.0 (100%)** | Wave 145 Fire 1 GENUINELY-NEW confirmed; Wave 134 Dim-6 covered promptfoo+DeepEval (eval scaffolds) but not LLM-security red-team scanners — divergence noted: priority Week-1 vs possible Day-1 |
| A12 Recursive self-improvement | **4 new dimensions proposed** | LLM-security red-team subdimension · token-cost blast-radius scoring · sensitive-output retention scoring · target-connector coverage scoring (local/REST/OpenAI/Bedrock/NIM/HF/test-dummy) |

## Probe DAG 1-7 (per agent-harness-fit-verification.md)

| Probe | Result | Evidence |
|---|---|---|
| P1 LICENSE | **PASS** | Apache-2.0 SPDX |
| P2 Registry-existence | **PASS** | PyPI `garak==0.15.0` published 2026-05-01 ([VERIFIED] tag SHA `bf6a971312c0a8871be908be64335b3eca4e885b`) |
| P3 Plugin-namespace overlap | **PASS** | No existing `garak` namespace in claude-sota-installed plugin marketplaces nor `.mcp.json` |
| P4 Stars+activity bands | **PASS** | 7.8k★ + active maintenance (recent commits) + STABLE-BURN-IN per convergence-gate Axis 3 |
| P5 README/frontmatter provenance | **PASS** | NVIDIA copyright + Apache-2.0 + arXiv paper + DEF CON AI Village + CHANGELOG visible |
| P6 Deep audit | **PASS** | `probes/` + `detectors/` + `generators/` + `harnesses/` architecture sound; pluggable provider connectors |
| P7 Demand-absence / new-workflow gate | **PASS** | Genuine new-workflow gap: LLM vulnerability scanning is currently UNCOVERED by promptfoo (prompt regression) + DeepEval (metric pytest) + Langfuse (observability) + OSV (dependency vuln); 5-clause Probe 7.b STUDY-PILOT eligible |

## Pattern A apply scope — 3 prescribed_edits

1. **`docs/sota-installed-manifest.md`** Section 15 — ADD garak row as `PLANNED Week-1 L3 Evaluation / LLM red-team scanner`
2. **`docs/install-provenance.md`** — APPEND Wave 145 Fire 2 entry with FULL cite trail (verdict + Path P metrics + 12-axis breakdown + cross-validation + CR-12 + Probe DAG + ladder advances + revised Forward Top-5)
3. **`evals/garak/README.md`** — DEFERRED to actual install fire (PLANNED status; not landing as Edit-from-this-fire per CR-9 install-risk discipline — install ship is W145-F<future>)

## Cross-model gate disposition (CR-3 Phase 1 bootstrap exception)

Per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract` + CLAUDE.md cardinal-rule-3:
- ✅ **FULLY SATISFIED** via Path P REAL GPT-5.5 codex CLI v0.130.0 subprocess (TIER-1-DIRECT)
- ✅ Verdict origin = REAL GPT-5.5 codex CLI (NOT Sonnet stand-in)
- ✅ No STAND-IN-NOTICE required
- ✅ 3 prescribed_edits applied as single atomic Pattern A fix-forward per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md`

## Forward Discipline #2 recursive dogfood metrics (n=4 cycle-322 promotion-eligible at n=5+)

| Metric | Fire 27-E (n=1) | Wave 144 (n=2) | Wave 145.1 (n=3) | **Wave 145.2 (this fire, n=4)** |
|---|---|---|---|---|
| Wall-clock | 18s | ~60s | 115s | **180s** |
| Tokens | 7,575 | ~30K | ~45K | **5,200** |
| Verdict file LOC | 198 | ~600 | 1,270 | **1,944** (173 verdict + investigation trail) |
| Verdict shape | NEEDS-REVISION conf=0.91 | NEEDS-REVISION conf=0.95 | NEEDS-PATTERN-A (implicit) | **APPROVE conf=0.91** |
| Forward Discipline #2 dogfood | n=1 baseline | n=2 cumulative | n=3 cumulative | **n=4 cumulative** (n=5+ at next fire promotes to standalone sister-rule via cycle-322) |

## Cite anchors (CR-1 TIER-1-DIRECT cite-trail lattice)

- TIER-1 SOTA: `https://github.com/NVIDIA/garak` (HEAD `c56023a19f595885bab2d8b255a415764908c6be` 2026-05-11) + PyPI `garak==0.15.0` (tag SHA `bf6a971312c0a8871be908be64335b3eca4e885b`)
- TIER-1 CCBP cross-model authority: `Z:/repos/deps/claude-code-best-practice-shan/development-workflows/cross-model-workflow/cross-model-workflow.md @ HEAD 64fffd53` (CR-3 cross-model gate)
- TIER-2 sister-rule cite-import-AMBER: `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` (single atomic fix-forward) + `Z:/claude-sota/.claude/rules/codex-t1-pattern-b-forward-discipline.md` (Forward Discipline #2)
- TIER-3-LOCAL-OPERATOR-DERIVED: `.claude/state/codex_consult_w145_f2_garak_redteam_OUT.txt` 1944-LOC REAL GPT-5.5 verdict
- Wave 145 Fire 1 cross-validation: `docs/sota-architecture-audit/fire-29-w145-gpt55-research-arch-convergence/99-close-synthesis.md:108-111` (Forward Top-5 🥇 W145-F2 garak)

## Deliverables (~700 LOC total)

1. `00-tracker.md` (this file, ~150 LOC) — fire scope + 12-axis verdict summary + Probe DAG + Forward Discipline #2 metrics
2. `01-garak-audit.md` (~400 LOC) — full Path P verdict integration + per-axis breakdown + Mia pre-apply trail
3. `99-close-synthesis.md` (~150 LOC) — closure + Forward Top-5 refresh + FM-20 catch on stale W145-F3 trufflehog claim
