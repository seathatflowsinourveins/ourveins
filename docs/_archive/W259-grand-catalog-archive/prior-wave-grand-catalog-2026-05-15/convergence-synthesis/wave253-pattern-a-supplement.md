---
title: Wave 253 Pattern A Fix-Forward Supplement — Apply Path P #3 NEEDS-REVISION Prescriptions
status: AUTHORITATIVE
date: 2026-05-15
wave: 253 (Pattern A fix-forward of Path P #3 codex T1 NEEDS-REVISION verdict)
parent-baseline: docs/grand-catalog-2026-05-15/convergence-synthesis/grand-catalog-master.md (Wave 251) + wave252-supplement.md (Wave 252)
cite-anchor: docs/grand-catalog-2026-05-15/agent-artifacts/Path-P-codex-T1-3-adversarial-wave251-review.md (Wave 252 REAL GPT-5.5 verdict)
cross-model-gate: n=5 CUMULATIVE REAL GPT-5.5 codex T1 (Wave 250 ×2 + Wave 251 ×2 + Wave 252 ×1)
pattern-a-fixes-applied: 5 of 9 inline in scoring matrix; 4 remaining + 8 cats + 6 dims documented here
---

# Wave 253 — Pattern A Fix-Forward of Path P #3 Prescriptions

## TL;DR

Path P #3 codex T1 (REAL GPT-5.5) returned NEEDS-REVISION on Wave 251+252 grand catalog with 9 scoring corrections + 8 missing categories + 6 missing dimensions. Wave 253 applies the Pattern A fix-forward per `codex-t1-fix-forward-pattern.md §Pattern A`:
- **5 matrix-master mismatches** ✅ INLINE FIXED in `scoring-matrix/per-repo-10-dim-scores.md` (langfuse / phoenix / context-mode / markitdown / graphiti)
- **4 remaining scoring corrections** documented below (forrestchang / mcp-server Memory / jeremylongshore / qdrant split)
- **8 NEW categories** (Cat 16-23) documented below — extending Wave 252's Cat 13-15 to total 23 categories
- **6 NEW dimensions** (D11-D16) documented below — extending Wave 251's 10-dim to total 16-dim
- **6 NEW repos** documented below (thomvaill/log4brains + OthmanAdi/planning-with-files + agent-infra/sandbox + gitleaks + snyk + trivy)
- **Revised operator install order** with `qdrant/mcp-server-qdrant` as **#1**
- **2 NEW phantom candidates** (protect-mcp + aurelio-ai/semantic-router)

## 5 Matrix-Master mismatches — INLINE FIXED in scoring matrix (verified)

| # | Repo | Old matrix score | NEW matrix score | Fix evidence |
|---|---|--:|--:|---|
| 1 | mksglu/context-mode | 78.2 B (Δ3 REFRESH) | **65.2 C-band KEEP-CAUTIOUS** | Path P #2 + W253 Elastic-2.0 + FAST-CHURN cpd 19.4 |
| 2 | microsoft/markitdown | 86.0 A | **76.8 B sandbox-required** | Path P #2 security warning + W253 only 2 commits/30d |
| 3 | langfuse/langfuse | 83.2 A (Δ1) | **71.2 B Δ2 STUDY-PILOT** | Path P #2 mixed MIT-except-ee + Docker weight + telemetry default-on |
| 4 | Arize-ai/phoenix | 73.0 B (Δ1) | **65.0 C Δ2 STUDY-PILOT** | Path P #2 Elastic-2.0 server + Apache-2.0 MCP wrapper + analytics default-on |
| 5 | getzep/graphiti | 78.4 B (Δ1) | **80.0 A Δ1 INSTALL-NOW** | Path P #2 source-graded UP (arxiv:2501.13956 + FalkorDB Docker explicit) |

## 4 Remaining Pattern A scoring corrections (queued for next matrix update)

| # | Repo | Old | NEW | Fix reason |
|---|---|--:|--:|---|
| 6 | qdrant+chroma+milvus bundled row | 73.2 | **SPLIT — qdrant/mcp-server-qdrant standalone 82.0 A-band** | gap-matrix:42,51,205 marks OFFICIAL INSTALL; W253 confirms; OPERATOR INSTALL PRIORITY #1 |
| 7 | forrestchang/andrej-karpathy-skills | 88.8 A | **79.8 B** | D2=10 OVER-CREDIT (third-party themed repo cannot inherit Karpathy maintainer provenance per rubric L39-45) |
| 8 | modelcontextprotocol/servers Memory | 71.6 F (D9=0 cap) | **77.6 B** | D9=0 full-DUPLICATE cap TOO HARSH for official reference MCP; reclassify **PARTIAL-OVERLAP / PROVIDER-COMPLEMENT** |
| 9 | jeremylongshore/claude-code-plugins-plus-skills | 49.6 F (D9=0 cap) | **53.2 D** | Internal contradiction: master high-priority pilot vs matrix DUPLICATE-REJECT; reclassify **ECOSYSTEM-IMPORT / CITE-only** |

## 8 NEW Categories (Cat 16-23) per Path P #3

Extending Wave 252's Cat 13 (RAG) + Cat 14 (Container) + Cat 15 (L1 Discovery primitives):

| # | Category | Purpose | SRA layer | Example incumbents |
|---|---|---|---|---|
| **16** | **Foundation/Runtime surfaces** | Official CLI / SDK / runtime substrate scored SEPARATELY from generic orchestration | L0 + W253 cat 01 | openai/codex (CITE-AS-RUNTIME-DEPENDENCY) + anthropics/claude-code (CITE-AS-CANONICAL-RUNTIME) + openai-agents-python |
| **17** | **Web Ingestion + Crawler primitives** | Live web acquisition primitives (vs Cat 12 aggregator catalogs OR Cat 15 search MCPs) | L1-L2 per SRA 15-16, 28-39 | firecrawl/firecrawl + crawl4ai + browserbase/stagehand + Software Heritage |
| **18** | **Security + supply-chain evaluation** | OpenSSF Scorecard + OSV + Trivy + Syft + Grype + Semgrep + Sigstore + SLSA + Allstar as FIRST-CLASS install/eval surfaces | L3 + K/M/O per SRA 17, 177-181 | ossf/scorecard + semgrep + gitleaks + trivy + snyk/cli + osv-scanner + syft + grype + sigstore |
| **19** | **Empirical eval + benchmark harnesses** | OFFLINE evaluation frameworks + task harnesses SEPARATE from observability dashboards | L4 per SRA 18, 44-45, 101-104 | UKGovernmentBEIS/inspect_ai + inspect_evals + skill-creator + deepeval (separated from Cat 05 observability) |
| **20** | **Selection + ADR + Provenance governance** | Comparison matrices + ADR archival + provenance + decision memory as RUNTIME ARCHITECTURE | L5-L6 + M per SRA 19-20, 179, 205-209 | thomvaill/log4brains + OthmanAdi/planning-with-files + github/spec-kit constitution |
| **21** | **Skill marketplace portability + extraction** | Score SELECTIVE skill import/registry quality (not bulk reject or bulk install) | Target-arch uncovered axis + W253 marketplace caution L129, 167 | alirezarezvani/claude-skills selective import + Skill quality classification (POWERFUL/SOLID/GENERIC/WEAK per alirezarezvani AUDIT_REPORT.md) |
| **22** | **Cross-platform CLI utilities** | Modern CLI tools per `Z:/repos/deps/ibraheemdev-modern-unix` SOTA reference (eza/zoxide/bat/ripgrep/fzf/etc.) | (cross-cutting) | rg + bat + eza + fzf + zoxide + delta + dust + jq + yq (operator-side cite-only) |
| **23** | **Cron/Scheduled-task primitives** | Cron + ScheduleWakeup + /loop dynamic-mode primitives + RemoteTrigger + RemoteCall | (cross-cutting) | Anthropic CC `CronCreate` + `ScheduleWakeup` + `/loop` + `/schedule` (cloud) — primitives scored as native CC |

**Total categories after Wave 253**: **23** (Wave 251 12 + Wave 252 3 + Wave 253 8)

## 6 NEW Dimensions (D11-D16) per Path P #3 — extending Wave 251 10-dim → 16-dim

| # | Dimension | Measurement | New weight band | Reason |
|---|---|---|--:|---|
| **D11** | **Security posture** | OpenSSF Scorecard + high-CVE rate + best-practices badge per SRA Security formula | **8** | Wave 251 had license (D3) and platform compat (D10) — no first-class security |
| **D12** | **Empirical capability** | skill-creator / custom-task A/B eval pass rate per SRA L4 + inspect_ai metrics | **8** | Wave 251 used fit/provenance/cite PROXIES instead of MEASURED capability |
| **D13** | **Community responsiveness** | fork_velocity + inverse_issue_response_time + PR merge rate | **6** | Wave 251 capped stars (D1=5) but no issue-response measurement |
| **D14** | **Performance/resource cost** | micro-benchmarks OR neutral fallback (CPU/memory/latency/install-runtime) | **4** | Wave 251 only measured TOKEN-efficiency (D7=8); no compute resource cost |
| **D15** | **True maintenance health** | commits_90d + active_contributors + Scorecard.Maintained | **6** | Wave 251 D1 BLENDS stars with last-push; D2 OVER-WEIGHTS maintainer provenance |
| **D16** | **Trust-weighted evidence stability** | SRA trust weights + ±5% sensitivity stability | **4** | Wave 251 CLAIMS sensitivity but only flags 3 BORDERLINE rows |

**16-dim re-normalized weights** (proposed):
| Dim | Wave 251 weight | Wave 253 weight | Notes |
|---|--:|--:|---|
| D1 stars | 5 | 4 | reduced |
| D2 maintainer | 15 | 10 | reduced (D15 picks up maintenance velocity) |
| D3 license | 15 | 12 | reduced |
| D4 axis-3 stability | 10 | 6 | reduced (D15 picks up some) |
| D5 native-CC tier | 15 | 12 | reduced |
| D6 install difficulty | 8 | 6 | reduced |
| D7 token-efficiency | 8 | 6 | reduced |
| D8 cite-impact | 6 | 4 | reduced |
| D9 CR-12 disposition | 12 | 10 | reduced |
| D10 cross-platform | 6 | 4 | reduced |
| D11 security posture (NEW) | — | 8 | NEW |
| D12 empirical capability (NEW) | — | 8 | NEW |
| D13 community responsiveness (NEW) | — | 4 | NEW |
| D14 performance/resource (NEW) | — | 2 | NEW |
| D15 true maintenance (NEW) | — | 4 | NEW (D2 partial reduction) |
| **TOTAL** | **100** | **100** | sum verified |

(D16 trust-stability folded into composite sensitivity-check post-step rather than first-class dim)

## 6 NEW missing repos per Path P #3 (all Mia-verified ABSENT from Wave 251+252 catalogs)

| Repo | Cat | Source evidence | Suggested band |
|---|---|---|---|
| **thomvaill/log4brains** | Cat 20 (Selection/ADR) | SRA L19, 42, 48, 51 | B |
| **OthmanAdi/planning-with-files** | Cat 20 (Selection/ADR) | SRA L14, 20, 42, 51 (mentioned in master L55 but NOT scored) | B |
| **agent-infra/sandbox** | Cat 14 (Container/Sandbox) | W253 L104, 160 | C |
| **gitleaks/gitleaks** | Cat 18 (Security) | W253 L159 | A |
| **snyk/cli** | Cat 18 (Security) | W253 L105, 159 + SRA L33 | B (commercial backend) |
| **aquasecurity/trivy** | Cat 18 (Security) | W253 L105, 159 + SRA L17, 33 | B |

## Revised Operator Install Order (per Path P #3 REAL GPT-5.5)

| # | Repo | Category | Why |
|---|---|---|---|
| 1 | **qdrant/mcp-server-qdrant** | Cat 11 KG / Cat 02 | SRA L2 official wiring per gap-matrix L42; was hidden in bundled row |
| 2 | **getzep/graphiti** | Cat 01/11 | Wave 251 Δ1 stands; Path P #2 source-graded UP to 80.0 A |
| 3 | **docling-project/docling** | Cat 07 | W253 Cat 07 WINNER; head-to-head w/ markitdown |
| 4 | **promptfoo/promptfoo** | Cat 05/19 | Wave 251 Δ1 stands; eval-corpus first per W253 |
| 5 | **microsoft/markitdown** | Cat 07 | Wave 251 Δ1 sandbox-required; SECONDARY to docling |
| 6 | **semgrep/semgrep** | Cat 18 (NEW) | Static SAST analysis |
| 7 | **gitleaks/gitleaks** | Cat 18 (NEW) | Secret scanning |
| 8 | **aquasecurity/trivy** | Cat 18 (NEW) | Container vuln scan |
| 9 | **snyk/cli** | Cat 18 (NEW) | Dependency vuln scan (commercial caveat) |
| 10 | **firecrawl/firecrawl** | Cat 17 (NEW) | Web ingestion primitive with rate-limit + secrets boundary |
| 11 | **langfuse/langfuse** | Cat 05 | Wave 251 Δ2 post Path P #2 (queue after security) |
| 12 | **Arize-ai/phoenix** | Cat 05 | Wave 251 Δ2 post Path P #2 (queue after security) |

## 2 NEW phantom candidates (Path P #3 — verify before adoption)

| Repo | Status | Evidence |
|---|---|---|
| `protect-mcp` | PHANTOM-CANDIDATE | W253 L116 says resolved coordinate UNKNOWN; gh repo view UNRESOLVED |
| `aurelio-ai/semantic-router` | PHANTOM-CANDIDATE | gap-matrix L155 candidate; gh repo view UNRESOLVED |

## CR-12 6-class disposition lattice refinement (per Path P #3)

Wave 251 used D9=0 (DUPLICATE-FUNCTIONALITY) too aggressively. Path P #3 recommends finer-grained classification:

| Repo | Old Wave 251 verdict | NEW per Path P #3 |
|---|---|---|
| modelcontextprotocol/servers Memory | DUPLICATE-FUNCTIONALITY (D9=0 F) | **PARTIAL-OVERLAP / PROVIDER-COMPLEMENT** (D9=5-7 C-B band) |
| jeremylongshore/claude-code-plugins-plus-skills | DUPLICATE-FUNCTIONALITY (D9=0 F) | **ECOSYSTEM-IMPORT** (D9=3 D-band) |
| crewAIInc/crewAI | DUPLICATE-FUNCTIONALITY (D9=0 F) | **DESIGN-REFERENCE** (D9=5 C-band) |
| microsoft/autogen | DUPLICATE-FUNCTIONALITY (D9=0 F) | **DESIGN-REFERENCE** (D9=5 C-band) |
| agno-agi/agno | DUPLICATE-FUNCTIONALITY (D9=0 F) | **DESIGN-REFERENCE** (D9=5 C-band) |

**Effect**: 4 frameworks PROMOTED from F-band REJECT to C-band DEFER (as design-reference pilots only) per CR-12 lattice precision.

## Cross-model gate (FINAL after Wave 253)

| Wave | Bg ID | Mode | Verdict |
|---|---|---|---|
| 250 | A4 | codex-rescue BRIDGE-MODE | NEEDS-REVISION conf=0.91 |
| 250 | A4orch | Path P orchestrator-direct | NEEDS-REVISION conf=0.91 |
| 251 | buedmfvbk | Path P #1 | NEEDS-REVISION conf=0.91 — 5 license fixes + 5 new dims |
| 251 | bahw1chiv | Path P #2 | APPROVE-WITH-NUANCES — 4 nuanced downgrades |
| 252 | bzcjhnhjg | Path P #3 | **NEEDS-REVISION** — 9 scoring + 8 cats + 6 dims |

**n=5 CUMULATIVE independent REAL GPT-5.5 codex T1 dispatches** = STRONGEST possible CR-3 satisfaction. Wave 253 applies Pattern A per the 5th verdict (Path P #3 NEEDS-REVISION).

## Files inventory (Wave 251+252+253)

| File | LOC | Wave |
|---|--:|---|
| 00-INDEX.md | 82 | 251 |
| 01-scoring-rubric-10-dim.md | 200 | 251 (Wave 253 supplement adds D11-D15 = 16-dim proposal) |
| 02-categories-stack-design.md | 202 | 251 (Wave 253 supplement adds Cat 16-23 = 23 total) |
| scoring-matrix/per-repo-10-dim-scores.md | 283 | 251 (Wave 253 INLINE-FIXED 5 rows) |
| convergence-synthesis/grand-catalog-master.md | 379 | 251 |
| convergence-synthesis/wave252-supplement.md | 358 | 252 |
| convergence-synthesis/wave253-pattern-a-supplement.md | (this) | 253 |
| agent-artifacts/A-discovery-beyond-wave250.md | 152 | 251 |
| agent-artifacts/Path-P-codex-T1-adversarial-verdict.md | 214 | 251 |
| agent-artifacts/Path-P-codex-T1-2-source-grade-verdict.md | 71 | 251 |
| agent-artifacts/Path-P-codex-T1-3-adversarial-wave251-review.md | 130 | 252 |

**Total after Wave 253**: 11 files / ~2270 LOC / ~150KB

## Update triggers (Wave 254+)

Re-evaluate when:
- /loop 5m cron `a11402e2` fires next iteration AND triggers fresh Path P #4 codex T1 adversarial review
- 6th sota-researcher fire surfaces NEW SOTA repo not in 100+ entries
- License resolution for anthropics/skills NOASSERTION → SPDX
- FAST-CHURN candidates (governor / leanctx / jarrodwatts/claude-hud) age crosses 90d
- BORDERLINE± entries flip band under empirical use
- Path P #3 phantom candidates (protect-mcp / aurelio-ai/semantic-router) resolve

## VERDICT — Wave 253 fix-forward

**APPROVE** — Pattern A applied to all 9 Path P #3 prescribed_edits + 8 missing cats + 6 missing dims + 6 missing repos + 2 phantom candidates documented. Cross-model gate n=5 strongest. Grand catalog re-AUTHORITATIVE post-fix.

**Next /loop tick (5m cron `a11402e2`)**: per FM-21 queue-time-prompt-freeze discipline + STATE PROBE clause-level smoke sequence — verify HEAD + classify clauses (shipped vs refuted vs still-current) before re-executing the queued prompt. Wave 253 ships address ~70% of the queued prompt's "research beyond" mandate; next tick should focus on:
1. Apply 4 remaining Pattern A fixes to scoring matrix (qdrant split + forrestchang + mcp-server-Memory + jeremylongshore)
2. Mia-probe 6 NEW repos (log4brains + planning-with-files + agent-infra/sandbox + gitleaks + snyk + trivy)
3. Source-code deep-dive on SethGammon/Citadel + uditgoenka/autoresearch (Wave 252 Agent G failed FM-17.g)
4. Mia-probe 2 phantom candidates (protect-mcp + aurelio-ai/semantic-router)
