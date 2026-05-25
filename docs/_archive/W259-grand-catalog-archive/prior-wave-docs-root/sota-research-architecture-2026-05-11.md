# Definitive SOTA Research Architecture for a Solo Developer Using Claude Code

**Date**: 2026-05-11
**Status**: AUTHORITATIVE — cite-anchor reference for SOTA Research-Architecture Convergence Loop
**Source**: User-provided 9-layer L0-L8 reference architecture document, ingested at Wave 152 Fire 5 invocation of `/loop` master prompt
**Scope**: Solo developer focus + complex project construction from SOTA repos + recursive self-improvement

---

## 9-Layer Architecture (L0-L8)

| Layer | Purpose | Prescribed Components |
|---|---|---|
| **L0 Foundation** | Claude Code runtime + universal disciplines | Claude Code 2.x (Opus 4.7 / Sonnet 4.6 / Haiku 4.5) + Superpowers + Spec-Kit + planning-with-files + native OTel + `.claudeignore` + plan-attestation (SHA-256) |
| **L1 Discovery** | Find candidate repos via multi-source breadth | github-mcp-server (OAuth) + gh CLI + OSSInsight (10B events) + Star History + deps.dev + Snyk Advisor + Sourcebot + Brave Search + Exa + Firecrawl + Context7 + arXiv + Semantic Scholar + Papers With Code + PulseMCP + DeepWiki Directory |
| **L2 Ingestion** | Pull repo content into local analyzable form | gh clone + Software Heritage + Firecrawl markdown extract + RepoMix (yamadashy/repomix) + DeepWiki MCP (mcp.deepwiki.com/mcp) + local cache `$XDG_CACHE_HOME/research/<owner>/<repo>/` |
| **L3 Evaluation** | Multi-signal quality + security + maintenance scoring | OpenSSF Scorecard + Best-Practices-Badge + Snyk Advisor + deps.dev + OSV-Scanner + Trivy + Syft+Grype + Semgrep + ast-grep + CodeQL + Serena (oraios/serena LSP) + SPDX/ScanCode/FOSSA + Sigstore maintainer-cred |
| **L4 Comparison** | Behavioral A/B + custom-task evaluation | anthropics/skills skill-creator (Executor → Grader → Comparator → Analyzer) + UKGovernmentBEIS/inspect_ai (200+ evals) + promptfoo/promptfoo (YAML A/B) + confident-ai/deepeval (50+ metrics pytest-style) + custom task harness from real tickets + Vibe/SWE-bench-Pro reference-only |
| **L5 Selection** | Weighted-rubric decision + ADR archival | weighted rubric (S25/M20/C25/Co15/L10/P5) + `comparison-matrix.md` + log4brains MADR ADRs + tie-breakers (bus-factor / OpenSSF Best-Practices-Badge tier / time-decay / downstream blast radius) |
| **L6 Knowledge** | Persistent task/decision memory | OthmanAdi/planning-with-files (task_plan.md + findings.md + progress.md + PreToolUse/PostToolUse hooks + SHA-256 plan attestation) + `.specify/memory/constitution.md` + `docs/adr/*.md` + `docs/research/comparisons/*.md` + mem0 (optional) |
| **L7 Construction** | Project execution using selected SOTA repos | obra/superpowers (brainstorm→plan→TDD→review) + github/spec-kit (`/speckit.constitution` → `.specify` → `.plan` → `.tasks` → `.implement`) + upstash/context7 (live version-pinned docs) + Playwright MCP + Apify MCP + skill-creator |
| **L8 Feedback** | Telemetry + post-mortem + recursive self-eval | native OpenTelemetry (Claude Code 2.x) → langfuse/langfuse self-hosted + Piebald-AI/splitrail (cross-CLI token+cost) + TechNickAI/claude_telemetry drop-in wrapper + post-mortem ADRs update rubric weights + **QUARTERLY RECURSION re-runs L3-L5 on the architecture itself** |

---

## Dimensions A-J (per-dimension adoption queue)

### A. GITHUB DISCOVERY
- **PRESCRIBED**: github/github-mcp-server (remote OAuth) + cli/cli + pingcap/ossinsight + star-history/star-history + google/deps.dev + sourcebot-dev/sourcebot + ast-grep/ast-grep + semgrep/semgrep
- **SKIP**: sourcegraph/sourcegraph (closed-source pivot post-acquisition)

### B. EVALUATION & SCORING
- **PRESCRIBED**: ossf/scorecard + coreinfrastructure/best-practices-badge + snyk/cli + google/osv-scanner + aquasecurity/trivy + anchore/syft + anchore/grype + semgrep + sigstore/sigstore

### C. CODE INTELLIGENCE
- **PRESCRIBED**: oraios/serena + yamadashy/repomix + mcp.deepwiki.com/mcp + ast-grep + semgrep + sourcebot-dev/sourcebot + gitmcp.io (one-shot Q&A)

### D. WEB RESEARCH
- **PRESCRIBED**: Brave Search MCP + Firecrawl MCP + Exa MCP + upstash/context7 + microsoft/playwright-mcp + apify/actors-mcp-server

### E. MEMORY / KNOWLEDGE
- **PRESCRIBED**: OthmanAdi/planning-with-files + thomvaill/log4brains + github/spec-kit constitution

### F. EVAL FRAMEWORKS
- **PRESCRIBED**: anthropics/skills skill-creator + UKGovernmentBEIS/inspect_ai + UKGovernmentBEIS/inspect_evals + promptfoo/promptfoo + confident-ai/deepeval

### G. COMPARISON / DECISION
- **PRESCRIBED**: `comparison-matrix.md` template + log4brains MADR + GitHub Projects v2 + Mermaid diagrams

### H. CONSTRUCTION HANDOFF
- **PRESCRIBED**: obra/superpowers + github/spec-kit + planning-with-files + upstash/context7 + microsoft/playwright-mcp + skill-creator + log4brains MADR

### I. OBSERVABILITY / FEEDBACK
- **PRESCRIBED**: native OTel (Claude Code 2.x) + langfuse/langfuse + Piebald-AI/splitrail + TechNickAI/claude_telemetry

### J. CITATION (cross-dimension supporting discipline)
- TIER-1-DIRECT upstream file:line + HEAD SHA OR official docs URL
- TIER-2 user-curated reference
- TIER-3-LOCAL-COMPOSITION (eee-local glue over TIER-1/TIER-2 substrates)

---

## Weighted Quality Rubric (S25/M20/C25/Co15/L10/P5)

| Dimension | Weight | Formula |
|---|---|---|
| Security | 25% | `0.5 × Scorecard/10 + 0.3 × (1 − grype_high_cve_rate) + 0.2 × best-practices-badge {0, 0.7, 0.85, 1}` |
| Maintenance | 20% | `0.5 × min(commits_90d/100, 1) + 0.3 × contributors_active + 0.2 × Scorecard.Maintained/10` |
| Capability | 25% | Subjective 0-1 from skill-creator A/B eval pass-rate |
| Community | 15% | `0.4 × min(log10(stars)/5, 1) + 0.3 × forks_velocity + 0.3 × issue_response_time_inv` |
| License | 10% | `{MIT/Apache/BSD = 1, MPL = 0.7, LGPL = 0.5, GPL = 0.2 if compatible else 0}` |
| Performance | 5% | Micro-benchmarks if applicable, else neutral 0.5 |

### Trust weights (input reliability)
| Input | Weight |
|---|---|
| Personal A/B eval | 0.40 |
| OpenSSF Scorecard | 0.20 |
| Snyk Advisor | 0.15 |
| Bus-factor | 0.10 |
| deps.dev | 0.10 |
| Stars / forks | 0.05 |

### Sensitivity check
Re-run weighted scoring with weights ±5%; final ranking MUST be stable to count as confident selection.

### Hard rules
- Penalize last-commit > 90d (Maintenance × 0.5)
- Require ≥1 commit last-30d to mark "active"
- Halve community weight when contributors_active < 3
- Reject Scorecard.Maintained < 5
- Reject bus-factor 1 + no last-90d commits

---

## 11-Step Research Workflow

1. **DEFINE** the problem with explicit success criteria + verification rubric
2. **DISCOVER** ≥4 distinct source cohorts (L1 stack): GitHub MCP + Exa + Perplexity + Firecrawl + OSSInsight + DeepWiki + ≥1 leaderboard
3. **TRIAGE** via gh repo metadata + Star History + Scorecard quick-score; cut candidate list to ≤10
4. **DEEP EVAL** via L3 stack (Snyk + deps.dev + OSV-Scanner + Trivy + Syft+Grype + Semgrep + Serena LSP)
5. **SEMANTIC** Q&A via DeepWiki + RepoMix compressed dump + ast-grep symbol probes
6. **BENCHMARK** via custom task harness from real tickets + skill-creator A/B + Inspect AI + promptfoo + deepeval
7. **COMPARE** via `comparison-matrix.md` weighted-rubric scoring + sensitivity ±5%
8. **SELECT** + write log4brains MADR ADR archiving all rejected alternatives with reasons
9. **HANDOFF** to L7 Construction via `findings.md` + Spec-Kit constitution `## Selected SOTA Dependencies`
10. **BUILD** complex project using ONLY SOTA repos selected; cite each at version-pinned reference
11. **FEEDBACK** via L8 observability (Langfuse + Splitrail + claude_telemetry) + post-mortem ADRs + rubric weight updates

---

## Failure Modes + Mitigations

| Failure mode | Mitigation |
|---|---|
| Star bias | Cap stars 5% weight; require Scorecard + Snyk + custom eval to corroborate |
| Stale benchmarks (SWE-bench saturated; Mythos 93.9% / Opus 4.7 87.6%) | Use Inspect AI on YOUR task suite + skill-creator A/B against real project work; NEVER quote leaderboard ≥85% as verdict |
| SWE-ABS 19.78% false positives; METR merge-rate ~24pp below benchmark scores | Apply benchmark-discount factor; trust personal A/B over public leaderboard |
| Prompt injection (Snyk ToxicSkills Feb 2026: 36% of public Agent Skills have injection) | Apply Lethal Trifecta filter (private data + untrusted tokens + exfiltration vector); read README via Serena symbol view or RepoMix compressed dump (NOT full clone); `.claudeignore` for secrets; SHA-256 plan attestation |
| Hallucinated repos | `gh repo view owner/repo` verification BEFORE any citation; reject if 404 |
| License pollution | SPDX scan in CI; allowlist enforced in repo-evaluate; copyleft → 0 if proprietary, 0.2 if open |
| Maintainer abandonment | Scorecard.Maintained < 5 → reject; bus-factor 1 + no last-90d commits → reject; Sigstore-signed commits required for high-trust deps |
| MCP supply-chain | Install only from claude-plugins-official OR repos with ≥1000 stars + recent commits + Sigstore signed + no opaque post-install scripts; run mcp-scan if available |
| YOLO mode drift | NEVER `--dangerously-skip-permissions` outside isolated CI; CR-7 Phase 1 permission classifier defaults |

---

## Invariants (never violated)

- Stars and benchmark scores are **INPUTS not VERDICTS**
- Treat every README/issue/PR as untrusted prompt-injection vector (Snyk ToxicSkills 36% baseline)
- Every selection produces an ADR; every rejected alternative archived in same ADR
- Markdown-and-git-portable: no proprietary glue layers / closed dashboards / fork-lock-in
- All deliverables auditable in git

---

## Recursion Mandate (architecture evaluates itself)

Every 90 days OR after 3 ADR-quality-score-changes: re-run repo-evaluate on EACH L1-L8 component (Sourcebot / Serena / RepoMix / OSSInsight / Scorecard / Snyk Advisor / deps.dev / DeepWiki / Inspect AI / Promptfoo / DeepEval / Langfuse / Splitrail / log4brains); refresh `comparison-matrix.md`; ADR any replacements; bump version-pins.

**The architecture is self-improving** — the loop's existence IS the recursion.

---

## Cite class (for this document)

`constituents=[TIER-2 @ user-provided 9-layer L0-L8 reference architecture document, May 2026 cutoff, TIER-3-LOCAL-COMPOSITION @ eee-local cite-import + master /loop prompt synthesis]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

The 9-layer L0-L8 structure + dimensions A-J + weighted rubric + workflow + failure modes are the user's contribution; this file is the local cite-anchor for forward research-architecture-convergence loop ticks.

---

## Loop terminates when

- L0-L8 reference architecture fully INSTALLED + INSTALLED-VERIFIED across all 9 layers
- All 4 workspace `.mcp.json` entries (graphiti / deepwiki / repomix / serena) confirmed loaded
- `comparison-matrix.md` + log4brains ADR for every installed component
- Quarterly recursion review schedule established (next refresh date: 2026-08-11)

**Recursive convergence target**: every repo this runtime helps build inherits the SAME architecture pattern — the meta-meta-objective.

---

## v2 Amendments — Wave 152 Fire 5 codex T1 NEEDS-REVISION conf=0.89 integration

**Verdict**: NEEDS-REVISION conf=0.89 [VERIFIED via `.claude/state/codex_consult_wave152_f5_arch_completeness_OUT.txt:51-52,309-310`] — REAL GPT-5.5 BRIDGE-MODE via Path P codex T1 foreground+tee Pattern D 6-parameter strict-conform; FD#2 single-claim 60-180s budget; cross-model gate FULLY SATISFIED per CR-3 Phase 1 bootstrap exception.

**Per codex T1 directive**: existing L0-L8 skeleton is sound; missing pieces are cross-cutting operational controls + supply-chain maturity rather than failed architecture. NEEDS-REVISION (not REJECT) integration follows.

---

### v2-A — 5 NEW dimensions K/L/M/N/O (cross-cutting controls)

| Dim | Slot | Purpose | Composition |
|---|---|---|---|
| **K** | Security/sandboxing/policy | Threat-model + Lethal Trifecta filter + .claudeignore enforcement + permission-mode classifier + readonly-guard + safety-deny patterns + cross-layer policy enforcement | safety_guard.py + agent_plan_readonly_bash_guard.py + .claudeignore + cardinal-rule-7 graduated unleash + Snyk ToxicSkills 36% baseline mitigation |
| **L** | Cost/quota/cache/budget | Per-account quota tracking + token budget gates + cache-rate measurement + spend forecasting + rate-limit governance | cpa-usage-keeper (sidecar) + CPA Mgmt UI + ccusage + Splitrail + Helicone-style AI-gateway routing |
| **M** | Reproducibility/provenance/CI-CD | SLSA provenance + Sigstore signing + in-toto attestations + reproducible-builds + GUAC supply-chain graph + Allstar policy enforcement | cosign + Sigstore + in-toto + SLSA + GUAC + reproducible-builds + Allstar (operator-side CI/CD) |
| **N** | Agent/prompt engineering lifecycle | Role taxonomy + prompt versioning + tool versioning + eval-loop + injection resistance + brief-template + dispatch discipline | Wave 24-D advanced agent team standing-directive + advanced-agent-team rules + Mia pre-apply + FM-17/FM-19/FM-20 disciplines |
| **O** | Legal/license/privacy/retention | SPDX scanning + license-compatibility allowlist + PII filter + data retention + GDPR / SOC2 / EU AI Act compliance | ScanCode + FOSSA + SPDX + retention policy + cardinal-rule data-handling |

### v2-B — 5 misallocation corrections per codex T1

- **Sigstore**: L3 → **L7.5/M** (delivery/provenance for own artifacts; L3 retains UPSTREAM-cite-verification only)
- **skill-creator A/B**: L4 → **L7** (construction primitive, not eval framework; L4 retains custom-task harness + Inspect AI + promptfoo + deepeval)
- **planning-with-files**: L0+L6 → **L6 only** (architectural home is knowledge persistence; L0 retains plan-attestation invariant ONLY)
- **Context7**: L1+L7 → **L1 only** (primarily discovery/reference retrieval; L7 retains construction-time consumption as knowledge-source via L1 dependency)
- **Native OTel**: L0+L8 → **L8 only** (architectural purpose is observability/feedback; L0 retains instrumentation-enabled INVARIANT ONLY)

### v2-C — 9 SOTA gaps May 2026 (supersedence map)

| Component | Supersedes | Rationale |
|---|---|---|
| SLSA provenance + Sigstore signing (paired) | Sigstore-only mention | Modern supply-chain completeness requires both artifact signing + provenance/build-integrity controls |
| GUAC-backed supply-chain graph | Flat SBOM/vulnerability scanner list | Graph model supports cross-repo comparison of deps/CVEs/attestations/licenses/provenance |
| OpenTelemetry GenAI semantic conventions | Generic native OTel | Agent traces should standardize model/tool/token/latency/cost attributes for portable observability |
| Braintrust (or equivalent eval dataset platform) | promptfoo/deepeval/Inspect-only eval stack | Production-grade workflow needs dataset curation + experiment tracking + regression gates + human review |
| Helicone OR LiteLLM proxy OR equivalent AI gateway | Observability-only cost tracking | Provider routing + request logging + caching + rate limits + spend governance now part of practical agent ops |
| RAGAS (or equivalent retrieval-quality evals) | Generic custom task harness | Research architectures with RAG need explicit groundedness + retrieval metrics, not only end-task success |
| Sourcegraph/Cody OR SCIP/LSIF code intelligence | Serena LSP + ast-grep only | Repo-at-scale comparison benefits from indexed cross-reference + symbol graph + code navigation infrastructure |
| OpenSSF Scorecard + Allstar policy enforcement | Scorecard-only evaluation | Scorecard measures posture; Allstar policy-as-code makes the result operational |
| in-toto attestations | Informal provenance log | Build/release provenance should be machine-verifiable, not only documented |

### v2-D — Structural concerns + downstream tickets

1. L3 evaluation layer broad; mixes repo-quality / static analysis / license / supply-chain integrity / artifact signing **without clear evidence schema** → introduce L3 normalized data model (claim, source, evidence, confidence, timestamp)
2. Architecture lacks explicit **normalized data model** connecting candidates ↔ metrics ↔ citations ↔ artifacts ↔ decisions ↔ post-decision outcomes → L6+L8 schema unification needed
3. L6 knowledge layer **too document-centric** for GitHub-at-scale research → needs hybrid retrieval + source anchoring + citation ledgers + retention policy
4. L8 feedback should **distinguish observability / offline evals / online evals / human review / cost monitoring / incident learning** → sub-layer the L8 stack
5. A-J dimensions complete for stated workflow but **incomplete without K/L/M/N/O** (see v2-A above)

### v2-E — Pattern A apply summary

This v2 section is the Pattern A single-fix-forward application of codex T1 NEEDS-REVISION conf=0.89. Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A: atomic apply of ALL prescribed amendments (K/L/M/N/O + misalloc + SOTA-gaps + structural concerns) in single forward-only doc append per `port-note-discipline.md §6` — NOT amend stale L0-L8 section rows. Future ticks audit current state against expanded reference (L0-L8 + K/L/M/N/O = 14-layer effective architecture).

Cite class: `constituents=[TIER-1-DIRECT @ Anthropic + OpenAI cross-model gate REAL GPT-5.5 codex T1 verdict at .claude/state/codex_consult_wave152_f5_arch_completeness_OUT.txt:51-52,309-310, TIER-2 @ codex T1 prescribed structural amendments, TIER-3-LOCAL-COMPOSITION @ Pattern A integration]; effective_tier=TIER-3-LOCAL-COMPOSITION` per citation-discipline rule #8.

Ladder advances this Pattern A integration: Path P n=32→33 (17-tick streak BROKEN), FD#2 n=9→10 (cycle-322 PROMOTION-MET strengthened), Pattern A cumulative single-fix-forward n+1, cross-model gate satisfaction count 7→8.
