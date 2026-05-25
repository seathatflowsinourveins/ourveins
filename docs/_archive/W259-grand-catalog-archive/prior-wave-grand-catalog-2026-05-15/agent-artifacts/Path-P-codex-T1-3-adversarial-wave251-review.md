---
title: Wave 252 Path P #3 codex T1 — Adversarial Review of Wave 251 Grand Catalog (REAL GPT-5.5)
status: AUTHORITATIVE
date: 2026-05-15
wave: 252
dispatch-mode: Path P orchestrator-direct foreground+tee (bypass FM-17.b rate-limit + FM-17.g prompt-too-long)
codex-cli-version: 0.130.0
codex-profile: deep-review-exec
bg-id: bzcjhnhjg
verdict-file: .claude/state/codex_consult_wave252_pathp3_OUT.txt (2964 LOC, 187KB)
bridge-mode-confirmed: YES — REAL GPT-5.5 via codex CLI subprocess
cross-model-gate: n=5 CUMULATIVE — Wave 250 ×2 + Wave 251 ×2 + Wave 252 Path P #3 = STRONGEST possible CR-3 satisfaction
verdict: NEEDS-REVISION
---

# Path P #3 codex T1 — Adversarial Review of Wave 251 Grand Catalog (Wave 252)

## Verdict (verbatim from JSON EOF block)

**VERDICT: NEEDS-REVISION** — Wave 251 is useful but over-claims AUTHORITATIVE status. Required fixes documented below.

## Convergence summary (verbatim REAL GPT-5.5)

> "Wave251 is useful but over-claims AUTHORITATIVE status. Mia absence checks used cat -n Wave251 master+matrix piped to exact-name grep; all missing_repo entries had no Wave251 master/matrix hit except OthmanAdi/planning-with-files, which Wave251 mentions at grand-catalog-master.md:55 but never scores in the 91-row matrix. The biggest defects are category omission, stale matrix-vs-master deltas after Path P #2, D2 provenance over-credit, D4/Axis-3 stability over-credit, and D9 overuse of DUPLICATE-FUNCTIONALITY. CR-12 lattice should split duplicate claims into PARTIAL-OVERLAP, PROVIDER-COMPLEMENT, ECOSYSTEM-IMPORT, and DESIGN-REFERENCE for modelcontextprotocol/servers Memory, qdrant/mcp-server-qdrant, jeremylongshore plugins, and agent frameworks. Because W253 itself lacks a satisfied cross-model gate at GRAND-SYNTHESIS-W253-2026-05-16.md:31-33 and declares missing Agent A/C inputs at :189-192, this is NEEDS-REVISION rather than REJECT."

## 9 Scoring errors beyond Path P #1 (Pattern A queue for Wave 253)

| # | Repo | Wave 251 score | Corrected score | Reason |
|---|---|--:|--:|---|
| 1 | **langfuse/langfuse** | 83.2 | **71.2** | Matrix L140 still says A/Δ1 but master applies Path P #2 STUDY-PILOT downgrade L129/187/253 — **MATRIX/MASTER MISMATCH** |
| 2 | **Arize-ai/phoenix** | 73.0 | **65.0** | Matrix L141/247 still says Δ1; master says C-band STUDY-PILOT after Path P #2 L138/188/253 — **MATRIX/MASTER MISMATCH** |
| 3 | **mksglu/context-mode** | 78.2 | **65.2** | Matrix L128 keeps B/refresh; master records Path P #2 C-band downgrade L138/189 + W253 disputes clean MIT L115 — **MATRIX/MASTER MISMATCH** |
| 4 | **microsoft/markitdown** | 86.0 | **76.8** | Matrix L160 D4=10/A overstates stability; master has Path P #2 B + sandbox-required L126/182/267; W253 only 2 commits/30d STUDY-PILOT — **MATRIX/MASTER MISMATCH** |
| 5 | **getzep/graphiti** | 78.4 | **80.0** | Matrix L55 leaves B; master has Path P #2 A/INSTALL-NOW L134/181 — **MATRIX/MASTER UPDATE REVERSE** |
| 6 | **qdrant+chroma+milvus MCPs** (bundled) | 73.2 | **82.0** | Bundled row at L66 hides `qdrant/mcp-server-qdrant`; gap-matrix marks OFFICIAL INSTALL at 02-gap-matrix.md:42,51,205 — **SPLIT REQUIRED**: Qdrant standalone L2 wiring ship |
| 7 | **forrestchang/andrej-karpathy-skills** | 88.8 | **79.8** | Matrix L116 D2=10 OVER-CREDIT; D2=10 reserved for official/named-T1 maintainers per `01-scoring-rubric-10-dim.md:39-45`; third-party Karpathy-themed repo cannot inherit Karpathy maintainer provenance |
| 8 | **modelcontextprotocol/servers Memory** | 71.6 | **77.6** | D9=0 full-DUPLICATE cap L64/208/236 too harsh for official reference MCP; reclassify as **PARTIAL-OVERLAP/CITE or PROVIDER-COMPLEMENT** |
| 9 | **jeremylongshore/claude-code-plugins-plus-skills** | 49.6 | **53.2** | Simultaneously HIGH-PRIORITY catalog pilot at master L48 AND D9=0 DUPLICATE-REJECT at matrix L87/223 — **INTERNAL CONTRADICTION**; reclassify as **ECOSYSTEM-IMPORT/CITE-only** |

## 8 NEW missing categories (extending Wave 252 supplement Cat 13/14/15)

| # | Category | Purpose | SRA layer |
|---|---|---|---|
| 1 | **Foundation/runtime surfaces** | Score official CLI/SDK/runtime substrate repos (openai/codex, anthropics/claude-code, openai-agents-python) SEPARATELY from generic orchestration | L0; W253 cat 01 |
| 2 | **Discovery and web/repo ingestion** | Firecrawl, Sourcebot, OSSInsight, Star History, Context7, crawler/search MCPs as ACQUISITION PRIMITIVES (not just aggregators) | L1-L2 per SRA 15-16, 28-39 |
| 3 | **Security and supply-chain evaluation** | Scorecard, OSV, Trivy, Syft, Grype, Semgrep, Sigstore, SLSA, Allstar, policy enforcement as FIRST-CLASS install/eval surfaces | L3 + K/M/O per SRA 17, 177-181 |
| 4 | **Empirical eval and benchmark harnesses** | OFFLINE evaluation frameworks + task harnesses SEPARATE from observability dashboards | L4 per SRA 18, 44-45, 101-104 |
| 5 | **Selection, ADR, and provenance governance** | Comparison matrices, ADR archival (log4brains), provenance, decision memory as RUNTIME ARCHITECTURE (not just docs) | L5-L6 + M per SRA 19-20, 179, 205-209 |
| 6 | **RAG/retrieval architecture** | Split retrieval-quality RAG decisions from memory/KG decisions; W253 explicit gap | W253 gap L24, 97-98, 124, 157 |
| 7 | **Cloud/container MCP and sandbox boundary** | Container, cloud, sandbox MCPs with PERMISSION-BOUNDARY risk (not only browser/E2B) | W253 cat 08 L104, 160 + SRA K L177 |
| 8 | **Skill marketplace portability extraction** | Score SELECTIVE skill import/registry quality (not bulk reject or bulk install) | Target arch uncovered axis L239 + W253 marketplace caution L129, 167 |

## 6 NEW missing dimensions (extending Wave 251 10-dim rubric)

| # | Dimension | Measurement | Weight band | Current Wave 251 gap |
|---|---|---|--:|---|
| 1 | **Security posture** | OpenSSF Scorecard + high-CVE rate + best-practices badge per SRA Security formula | 10 | Wave 251 has license (D3) and platform compat (D10) instead |
| 2 | **True maintenance health** | commits_90d + active_contributors + Scorecard.Maintained | 8 | Wave 251 D1 BLENDS stars with last-push; D2 OVER-WEIGHTS maintainer provenance |
| 3 | **Empirical capability** | skill-creator / custom-task A/B eval pass rate per SRA L4 | 10 | Wave 251 uses fit/provenance/cite PROXIES instead of MEASURED capability |
| 4 | **Community responsiveness** | fork_velocity + inverse_issue_response_time | 6 | Wave 251 caps stars but no issue-response measurement |
| 5 | **General performance/resource cost** | micro-benchmarks OR neutral fallback | 2 | Wave 251 only measures TOKEN-efficiency (D7); no CPU/memory/latency/install-runtime |
| 6 | **Trust-weighted evidence stability** | SRA trust weights + ±5% sensitivity stability | 6 | Wave 251 CLAIMS sensitivity but only flags 3 BORDERLINE rows |

**Total weight if all 6 added**: 42 → would need to rebalance from existing 10-dim (current sums 100 + 42 NEW = 142 → renormalize).

## 10 W253 vs Wave 251 disagreements (convergent resolutions)

| Repo | W253 verdict | Wave 251 verdict | Path P #3 convergent resolution |
|---|---|---|---|
| promptfoo/promptfoo | STUDY-PILOT (W253 #35) | Δ1 INSTALL-NOW | KEEP HIGH PRIORITY but demote from FIRST install to eval-harness pilot AFTER memory/doc/security gaps closed; require concrete eval corpus |
| microsoft/markitdown | STUDY-PILOT runner-up | Δ1 sandbox-required | KEEP only as sandboxed secondary parser; ADD Docling comparison BEFORE operator install |
| docling-project/docling | ADOPT-NOW WINNER (Cat 07) | ABSENT from 91-entry matrix | ADD to Cat 07; head-to-head with markitdown/MinerU BEFORE shipping parser layer |
| **qdrant/mcp-server-qdrant** | Not W253 top-50 BUT target/gap says INSTALL | Only bundled qdrant+chroma+milvus row DEFER | **SPLIT official Qdrant MCP as standalone L2 wiring ship + PRIORITIZE BEFORE broad RAG pilots** |
| jarrodwatts/claude-hud | Top ADOPT-NOW (W253 #1) | ABSENT | ADD but GATE as optional UX/runtime-surface pilot; W253 itself says UI polish ≠ architecture |
| openai/openai-agents-python | ADOPT-NOW (W253 #2) | ABSENT | ADD as official cross-model agent SDK PATTERN PILOT (NOT Claude-native core replacement) |
| langchain-ai/deepagents | ADOPT-NOW/pattern pilot (W253 #3) | ABSENT | ADD as DESIGN-REFERENCE pilot; do NOT install as orchestration core without concrete workflow |
| firecrawl/firecrawl | ADOPT-NOW web-ingestion (W253 #4) | ABSENT | ADD to missing discovery/ingestion category with rate-limit + secrets boundary review |
| crewAIInc/crewAI | STUDY-PILOT framework reference | REJECT-FOR-FIT duplicate/meta-harness | KEEP runtime install REJECTED, but RELABEL as **DESIGN-REFERENCE pilot** rather than pure DUPLICATE-FUNCTIONALITY |
| HKUDS/LightRAG | RAG STUDY-PILOT | ABSENT | ADD to NEW RAG/retrieval benchmark category; NO install until retrieval architecture decision |

## Operator priority install order (REVISED per Path P #3 REAL GPT-5.5)

1. **qdrant/mcp-server-qdrant** ← NEW #1 (split from bundled row; SRA L2 official wiring per gap-matrix L42)
2. **getzep/graphiti** (Wave 251 Δ1 stands)
3. **docling-project/docling** ← NEW (W253 Cat 07 WINNER; head-to-head w/ markitdown)
4. **promptfoo/promptfoo** (Wave 251 Δ1; require eval-corpus first)
5. **microsoft/markitdown** (Wave 251 Δ1; sandboxed; secondary to docling)
6. **semgrep/semgrep** ← NEW (Cat 06 security)
7. **gitleaks/gitleaks** ← NEW (Cat 06 security)
8. **aquasecurity/trivy** ← NEW (Cat 06 security)
9. **snyk/cli** ← NEW (Cat 06 security; commercial caveat)
10. **firecrawl/firecrawl** ← NEW (Cat NEW Discovery/Ingestion)
11. **langfuse/langfuse** (Wave 251 Δ2 post Path P #2; queue after security)
12. **Arize-ai/phoenix** (Wave 251 Δ2 post Path P #2; queue after security)

## NEW phantom candidates (2)

| Repo | Source | Status |
|---|---|---|
| `protect-mcp` | W253 says resolved coordinate UNKNOWN L116; gh repo view UNRESOLVED | **PHANTOM-CANDIDATE — verify coordinate** |
| `aurelio-ai/semantic-router` | gap-matrix candidate L155; gh repo view UNRESOLVED | **PHANTOM-CANDIDATE — verify coordinate** |

## Missing repos to add to Wave 251 matrix (per Path P #3 Mia probe — all verified ABSENT)

| Repo | Cat | Source evidence | Suggested score band |
|---|---|---|---|
| thomvaill/log4brains | NEW Cat (Selection/ADR governance) | SRA L19, 42, 48, 51 | B |
| OthmanAdi/planning-with-files | NEW Cat (Selection/ADR governance) | SRA L14, 20, 42, 51 — mentioned in master L55 but NOT in 91-row matrix | B |
| agent-infra/sandbox | NEW Cat (Cloud/Container/Sandbox) | W253 L104, 160 | C |
| gitleaks/gitleaks | NEW Cat 06 (Security) | W253 L159 | A |
| snyk/cli | NEW Cat 06 (Security) | W253 L105, 159 + SRA L33 | B |
| aquasecurity/trivy | NEW Cat 06 (Security) | W253 L105, 159 + SRA L17, 33 | B |

(All other Wave 252 supplement additions REMAIN VALID per Path P #3 absence verification.)

## Cross-model gate disclosure (Wave 252)

Per `cmc-env-funneled-disclosure.md §Orchestrator integration discipline`:

| Dispatch | Mode | Verdict | BRIDGE-MODE? |
|---|---|---|---|
| Wave 250 A4 codex-rescue subagent | BRIDGE-MODE | NEEDS-REVISION conf=0.91 | YES |
| Wave 250 A4orch Path P codex T1 | orchestrator-direct | NEEDS-REVISION conf=0.91 | YES |
| Wave 251 Path P #1 codex T1 | orchestrator-direct (`buedmfvbk`) | NEEDS-REVISION conf=0.91 — 5 license fixes + 5 new dims + 4 phantom flags | YES |
| Wave 251 Path P #2 codex T1 | orchestrator-direct (`bahw1chiv`) | APPROVE-WITH-NUANCES — 4 nuanced downgrades + operator priority order | YES |
| Wave 252 Path P #3 codex T1 | orchestrator-direct (`bzcjhnhjg`) | **NEEDS-REVISION** — 9 scoring errors + 8 missing cats + 6 missing dims + 10 W253 disagreements + revised install order | YES |

**Cross-model gate satisfaction (CR-3)**: **n=5 CUMULATIVE INDEPENDENT REAL GPT-5.5 codex T1 dispatches** across 3 waves — **STRONGEST possible** per `cmc-t1-t7-lifecycle.md §The contract`. Far exceeds CR-3 minimum.

VERDICT: **NEEDS-REVISION** — apply 9 Pattern A scoring fixes + add 8 missing cats + 6 missing dims + revise operator install order with qdrant/mcp-server-qdrant #1.
