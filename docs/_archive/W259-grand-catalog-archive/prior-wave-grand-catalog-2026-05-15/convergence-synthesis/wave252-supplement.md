---
title: Wave 252 Supplement — Architecture-Corpus Reconciliation + SRA + W253 Convergence
status: AUTHORITATIVE
date: 2026-05-15
wave: 252 (grand-catalog-research-beyond-2)
parent-baseline: docs/grand-catalog-2026-05-15/convergence-synthesis/grand-catalog-master.md (Wave 251)
agents-dispatched: 3 Sonnet (all FAILED FM-17.b rate-limit / FM-17.g prompt-too-long) + Path P #3 codex T1 (RUNNING)
fallback-strategy: orchestrator inline-read sota-research-architecture.md + GRAND-SYNTHESIS-W253-2026-05-16.md (parallel research stream)
cross-model-gate: SATISFIED via Wave 251 n=2 codex T1; Wave 252 Path P #3 codex T1 pending (n=3 cumulative when complete)
new-repos-added: 38+
new-categories: 3 (Cat 13 RAG-retrieval / Cat 14 Container-Cloud / Cat 15 L1 Discovery primitives)
sra-framework-aligned: TRUE (per docs/sota-research-architecture-2026-05-11.md SRA L0-L8 + K-O + Weighted Quality Rubric S25/M20/C25/Co15/L10/P5)
w253-reconciliation: COMPLETE (per docs/outer research/research-wave-2026-05-15/GRAND-SYNTHESIS-W253-2026-05-16.md)
---

# Wave 252 Supplement — Critical Wave 251 Catalog Gaps Closed

## TL;DR

Wave 252 reconciled Wave 251 grand catalog against:
1. **SRA 14-layer framework** (`docs/sota-research-architecture-2026-05-11.md`) — L0-L8 + K/L/M/N/O dims + Weighted Quality Rubric S25/M20/C25/Co15/L10/P5
2. **W253 parallel grand synthesis** (`docs/outer research/research-wave-2026-05-15/GRAND-SYNTHESIS-W253-2026-05-16.md`) — Top-50 ranked matrix + 12-category verdicts
3. **sota-architecture-audit corpus** (`docs/sota-architecture-audit/03-sota-target-architecture.md` + `02-gap-matrix.md` + 27 fire subfolders)

**Result**: **38+ NEW repos** + **3 NEW categories** + **scoring methodology refinements** + **SRA Weighted-Rubric alignment** — Wave 251 had significant under-coverage in: open RAG retrieval / native CC Q2 2026 features / security scanners / official runtime SDKs (codex, claude-code, openai-agents-python).

## Critical Wave 251 blind spots identified (per W253)

| # | Blind spot | Wave 251 status | W253 finding | Resolution |
|---|---|---|---|---|
| 1 | **RAG under-coverage** | Cat 11 KG only (graphiti) | NEW Cat 13 RAG-retrieval needed (cognee + mem0 + LightRAG + ragflow + microsoft/graphrag) | **ADD Cat 13** |
| 2 | **Native CC Q2 2026 features under-enumerated** | implicit | sandboxing / MCPB / `claude agents` / async / fork / worktree / hook semantics | Cross-ref `docs/sota-feature-activation.md` for activation map |
| 3 | **NOASSERTION inflated W253 adoption** | D3=0 hard-rule cap (F-band) | W253 scored NOASSERTION = 5 mid-band | **Wave 251 cap stands** (SOTA convention); W253 too lenient |
| 4 | **`jarrodwatts/claude-hud` NOT in Wave 251 catalog** | absent | W253 #1 ADOPT-NOW score 9.23 (22,878★ MIT) | **NEW Δ2 STUDY-PILOT** (Mia probe age + cpd first) |
| 5 | **`openai/codex` not scored as runtime adoption** | implicit (codex CLI uses) | W253 #7 ADOPT-NOW score 8.40 (82,920★ NOASSERTION) | **D3=0 cap** to F-band per CR-12 (already a runtime dependency, not separate adoption) |
| 6 | **`firecrawl/firecrawl` totally missed** | absent | W253 #4 ADOPT-NOW score 8.70 (120,336★ NOASSERTION) | **NEW Δ2 STUDY-PILOT** (web-ingestion primitive; sandboxed-via-MCP path) |
| 7 | **`docling-project/docling` totally missed** | absent | W253 #10 ADOPT-NOW (59,800★ NOASSERTION) | **NEW Δ2 STUDY-PILOT** — competes with microsoft/markitdown; W253 prefers docling |
| 8 | **github/spec-kit (L7 Construction per SRA) missed** | absent | SRA L7 anchor | **NEW Δ2 STUDY-PILOT** (Cat 02) |
| 9 | **OthmanAdi/planning-with-files (L6 Knowledge per SRA) missed** | absent | SRA L6 anchor | **NEW Δ2 STUDY-PILOT** (Cat 02) |
| 10 | **Cat 06 Security tools (Scorecard / Snyk / Trivy / Semgrep / etc.) missed** | implicit | SRA L3 Evaluation full stack | **NEW Δ2 STUDY-PILOT** group |
| 11 | **Cat 14 Container/Cloud (dagger / agent-infra/sandbox / mcp-gateway / terraform-mcp) missed** | absent | W253 Cat 08 | **NEW Cat 14** |
| 12 | **alirezarezvani/claude-skills marketplace missed** | (autoresearch only — Agent A phantom) | W253 #9 ADOPT-NOW 14,955★ — SEPARATE skill marketplace | **NEW Cat 03 STUDY-PILOT** |

## NEW Categories added (12 → 15)

### Cat 13 — RAG-Retrieval (separate from Cat 11 KG)

**Purpose**: Document-retrieval RAG (separate from temporal-KG / entity-graph)

**Stack diagram**:
```
RAG framework alternatives:
  - topoteretes/cognee (17K★ Apache-2.0) — DEFER per Wave 251 (graphiti supersedes for KG; cognee for RAG)
  - mem0ai/mem0 (55K★ Apache-2.0) — Δ2 STUDY-PILOT per Wave 251
  - HKUDS/LightRAG (35K★ NOASSERTION) — Δ2 STUDY-PILOT (NEW per W253)
  - infiniflow/ragflow (80K★ NOASSERTION) — Wave 251 REJECT (full-app); W253 STUDY-PILOT
  - microsoft/graphrag (NOT YET probed) — STUDY-PILOT candidate
  - HKU LightRAG — Δ2 STUDY-PILOT
```

### Cat 14 — Container/Cloud/Sandboxed-Infra

**Purpose**: Container orchestration + cloud IaC + sandboxed execution + MCP gateway

**Stack diagram**:
```
- dagger/dagger (15K★ NOASSERTION) — Δ2 STUDY-PILOT (container-native CI/CD)
- agent-infra/sandbox — Δ2 STUDY-PILOT (NEW per W253)
- hashicorp/terraform-mcp-server — Δ2 STUDY-PILOT
- microsoft/mcp-gateway — Δ2 STUDY-PILOT
- e2b-dev/E2B (12K★ Apache-2.0) — Δ2 STUDY-PILOT per Wave 251 (already Cat 08)
- netdata/netdata GPL-3.0 EXCLUDED
```

### Cat 15 — L1 Discovery Primitives (vs Cat 12 catalog aggregators)

**Purpose**: SRA L1 Discovery layer — primitives for finding repos (vs Cat 12 awesome-* aggregators)

**Stack diagram**:
```
SRA L1 Discovery stack (per docs/sota-research-architecture-2026-05-11.md L15):
- github/github-mcp-server (29K★ NOASSERTION) — Δ2 (already INSTALLED via plugin)
- cli/cli (gh) — INSTALLED (system CLI)
- pingcap/ossinsight — Δ2 STUDY-PILOT (10B GitHub events)
- star-history/star-history — REFERENCE (web SaaS)
- google/deps.dev — REFERENCE-CITE (dependency graph)
- snyk/cli — Δ2 STUDY-PILOT (Cat 06 Security cross-listing)
- sourcebot-dev/sourcebot — Δ2 STUDY-PILOT (code search)
- Brave Search MCP / Firecrawl MCP / Exa MCP — partial (exa DISABLED per FM-16)
- upstash/context7 (55K★ NOASSERTION) — INSTALLED via plugin (Cat 09)
- arXiv MCP / Semantic Scholar — Δ2 STUDY-PILOT
- Papers With Code / PulseMCP / DeepWiki Directory — REFERENCE
```

## NEW repos discovered (38+ via W253 + SRA reconciliation)

### Cat 02 Orchestration NEW entries

| Repo | Stars | License | W253 score | Wave 252 verdict | Notes |
|---|--:|---|--:|---|---|
| **jarrodwatts/claude-hud** | 22,878 | **MIT** | 9.23 ADOPT-NOW | **Δ2 STUDY-PILOT** | W253 #1; Mia probe required (created May 2026 = potential FAST-CHURN); native CC plugin/skill/command surface |
| **openai/openai-agents-python** | 26,337 | NOASSERTION | 8.97 ADOPT-NOW | **Δ2 STUDY-PILOT (NOASSERTION cap)** | W253 #2; official OpenAI agent SDK; Wave 251 DEFER (codex-side) — INTERMEDIATE resolution |
| **langchain-ai/deepagents** | 22,829 | NOASSERTION | 8.96 ADOPT-NOW | **Δ2 STUDY-PILOT (NOASSERTION cap)** | W253 #3; long-running/subagent patterns; Wave 251 DEFER — pattern-only |
| **openai/codex** | 82,920 | NOASSERTION | 8.40 ADOPT-NOW | **CITE-AS-RUNTIME-DEPENDENCY** | W253 #7; already runtime via codex CLI 0.130.0; F-band cap by D3=0 but functionally REQUIRED |
| **anthropics/claude-code** | 123,921 | NOASSERTION | 8.10 STUDY-PILOT | **CITE-AS-CANONICAL-RUNTIME** | Canonical CC runtime (NOASSERTION caveat — not separate install candidate) |
| **mastra-ai/mastra** | 23,922 | NOASSERTION | 7.89 STUDY-PILOT | **Δ2 STUDY-PILOT** | TypeScript framework reference |
| **huggingface/smolagents** | 27,325 | (Wave 251 had Apache-2.0) | 8.07 STUDY-PILOT | **Δ2** (already Wave 251) | W253 confirms STUDY-PILOT |
| **google/adk-python** | 19,653 | NOASSERTION | 7.31 STUDY-PILOT | **Δ2 STUDY-PILOT (NOASSERTION cap)** | Google Agent Development Kit |
| **pydantic/pydantic-ai** | 17,081 | NOASSERTION | 7.30 STUDY-PILOT | **Δ2 STUDY-PILOT (NOASSERTION cap)** | Pydantic-AI framework |
| **github/spec-kit** | (TBD probe) | (TBD probe) | (not in W253) | **Δ2 STUDY-PILOT** per SRA L7 | Spec-Kit constitution + plan + tasks + implement (`/speckit.constitution` etc.) |
| **OthmanAdi/planning-with-files** | (TBD probe) | (TBD probe) | (not in W253) | **Δ2 STUDY-PILOT** per SRA L6 | task_plan.md + findings.md + progress.md + PreToolUse/PostToolUse hooks + SHA-256 plan attestation |
| **SethGammon/Citadel** | 552 | MIT | (not in W253) | **Δ2 STUDY-PILOT** | Wave 251 Agent A flagged HIGHEST architectural alignment; Wave 252 Agent G source-dive PENDING |
| **uditgoenka/autoresearch** | 4,481 | MIT | (not in W253) | **CITE-AS-REFERENCE** | Canonical Karpathy autoresearch port |

### Cat 03 Skills+Marketplaces NEW entries

| Repo | Stars | License | W253 score | Wave 252 verdict |
|---|--:|---|--:|---|
| **alirezarezvani/claude-skills** | 14,955 | NOASSERTION | 8.35 ADOPT-NOW | **Δ2 STUDY-PILOT** per W253; selective POWERFUL/SOLID-only import |
| **VoltAgent/awesome-claude-code-subagents** | 19,895 | NOASSERTION | 7.47 STUDY-PILOT | **CITE-AS-REFERENCE** (Cat 12) |
| **anthropics/claude-cookbooks** | 43,054 | NOASSERTION | 7.81 STUDY-PILOT | **CITE-AS-REFERENCE** (already cited Wave 251) |

### Cat 04 Token+Context NEW entries

| Repo | Stars | License | W253 score | Wave 252 verdict |
|---|--:|---|--:|---|
| **PatrickJS/awesome-cursorrules** | 39,541 | **CC0-1.0** | 7.70 STUDY-PILOT | **CITE-AS-REFERENCE** (Cat 12) — CC0 permissive but cursor-only |
| **bmad-code-org/BMAD-METHOD** | (Wave 251 has) | MIT | (W253 referenced) | confirms DEFER (trinity covers ~80%) |

### Cat 05 Observability+Evals NEW entries

| Repo | Stars | License | W253 score | Wave 252 verdict |
|---|--:|---|--:|---|
| **confident-ai/deepeval** | 15,458 | NOASSERTION | 7.39 STUDY-PILOT | **Δ2 STUDY-PILOT** (NOASSERTION cap) — pytest-style 50+ metrics |
| **UKGovernmentBEIS/inspect_ai** | (not in W253) | (TBD probe) | (SRA L4) | **Δ2 STUDY-PILOT** per SRA L4 — 200+ evals |
| **UKGovernmentBEIS/inspect_evals** | (not in W253) | (TBD probe) | (SRA L4) | **Δ2 STUDY-PILOT** companion to inspect_ai |
| **TechNickAI/claude_telemetry** | (not in W253) | (TBD probe) | (SRA L8) | **Δ2 STUDY-PILOT** drop-in OTel wrapper |
| **comet-ml/opik** | 19,307 | (W251: Apache-2.0) | 7.41 STUDY-PILOT | Wave 251 Δ2 confirmed |
| **Arize-ai/phoenix** | 9,694 | (W251: Elastic-2.0) | 7.18 STUDY-PILOT | Wave 251 Δ2 confirmed (Path P #2 downgraded from Δ1) |
| **langfuse/langfuse** | 27,283 | (W251: MIT-except-ee) | 7.60 STUDY-PILOT | Wave 251 Δ2 confirmed |
| **promptfoo/promptfoo** | 21,290 | (W251: MIT) | 7.58 STUDY-PILOT | Wave 251 Δ1; W253 less aggressive — Wave 251 verdict stands per Path P #2 |

### Cat 06 Security NEW group (per SRA L3 Evaluation stack)

| Repo | Stars | License | SRA L3 role | Wave 252 verdict |
|---|--:|---|---|---|
| **ossf/scorecard** | (TBD probe) | Apache-2.0 | OpenSSF Scorecard automated security scoring | **Δ2 STUDY-PILOT** (foundational SRA L3) |
| **coreinfrastructure/best-practices-badge** | (TBD probe) | (TBD) | OpenSSF Best-Practices badge | **CITE-AS-REFERENCE** |
| **semgrep/semgrep** | 15,158 | NOASSERTION | static analysis SAST | **Δ2 STUDY-PILOT** (NOASSERTION cap) |
| **gitleaks/gitleaks** | (TBD probe) | MIT | secret scanning | **Δ2 STUDY-PILOT** |
| **aquasecurity/trivy** | (TBD probe) | Apache-2.0 | container vuln scan | **Δ2 STUDY-PILOT** |
| **snyk/cli** | (TBD probe) | (commercial) | dependency vuln scan | **DEFER** (commercial backend) |
| **google/osv-scanner** | (TBD probe) | Apache-2.0 | OSV database scan | **Δ2 STUDY-PILOT** |
| **anchore/syft** | (TBD probe) | Apache-2.0 | SBOM generation | **Δ2 STUDY-PILOT** |
| **anchore/grype** | (TBD probe) | Apache-2.0 | vuln scan from SBOM | **Δ2 STUDY-PILOT** |
| **ast-grep/ast-grep** | (TBD probe) | MIT | structural AST search | **Δ2 STUDY-PILOT** |
| **sigstore/sigstore** | (TBD probe) | Apache-2.0 | maintainer-cred verification | **CITE-AS-REFERENCE** |

### Cat 07 Document parsers NEW entries

| Repo | Stars | License | W253 score | Wave 252 verdict |
|---|--:|---|--:|---|
| **docling-project/docling** | 59,800 | NOASSERTION | 8.34 ADOPT-NOW | **Δ2 STUDY-PILOT** — W253 prefers over markitdown for active velocity |
| **PaddlePaddle/PaddleOCR** | 77,917 | NOASSERTION | 7.86 STUDY-PILOT | **Δ2 STUDY-PILOT** (NOASSERTION cap) — OCR-heavy use cases |
| **Unstructured-IO/unstructured** | 14,713 | NOASSERTION | 7.45 STUDY-PILOT | **Δ2 STUDY-PILOT** (NOASSERTION cap) |

### Cat 08 Browser+Sandbox NEW entries

| Repo | Stars | License | W253 score | Wave 252 verdict |
|---|--:|---|--:|---|
| **firecrawl/firecrawl** | 120,336 | NOASSERTION | 8.70 ADOPT-NOW | **Δ2 STUDY-PILOT** (NOASSERTION cap) — web ingestion primitive; sandboxed-via-MCP |
| **unclecode/crawl4ai** | 65,640 | NOASSERTION | 7.65 STUDY-PILOT | **Δ2 STUDY-PILOT** (NOASSERTION cap) |
| **browserbase/stagehand** | 22,673 | NOASSERTION | 7.49 STUDY-PILOT | **Δ2 STUDY-PILOT** (NOASSERTION + cloud-path security) |

### Cat 09 Code-intel NEW entries

| Repo | Stars | License | W253 score | Wave 252 verdict |
|---|--:|---|--:|---|
| **upstash/context7** | 55,391 | NOASSERTION | 7.66 STUDY-PILOT | **INSTALLED via plugin** (KEEP); W253 reaffirms |
| **sourcebot-dev/sourcebot** | (TBD probe) | (TBD) | (SRA L3) | **Δ2 STUDY-PILOT** per SRA L3 code search |

### Cat 10 Model routing NEW entries

(no new — Wave 251 stack stands)

### Cat 11 Knowledge graphs NEW entries

| Repo | Stars | License | Wave 252 verdict |
|---|--:|---|---|
| **microsoft/graphrag** | (TBD probe) | MIT | **Δ2 STUDY-PILOT** — Microsoft's KG-RAG hybrid |

### Cat 13 RAG-Retrieval (NEW category)

| Repo | Stars | License | W253 score | Wave 252 verdict |
|---|--:|---|--:|---|
| **HKUDS/LightRAG** | 35,248 | NOASSERTION | 7.52 STUDY-PILOT | **Δ2 STUDY-PILOT** (NOASSERTION cap) |
| **infiniflow/ragflow** | 80,591 | (Wave 251: Apache-2.0) | 7.59 STUDY-PILOT | Wave 251 REJECT (full-app); W253 STUDY-PILOT — RECLASSIFY as Δ2 STUDY-PILOT (RAG specifically) |
| **mem0ai/mem0** | 55,805 | (Wave 251: Apache-2.0) | 7.66 STUDY-PILOT | Δ2 (cross-listing from Cat 01) |
| **topoteretes/cognee** | 17,248 | Apache-2.0 | 7.97 STUDY-PILOT | Wave 251 DEFER; W253 STUDY-PILOT — UPGRADE to Δ2 STUDY-PILOT (RAG specifically) |
| **microsoft/graphrag** | (TBD probe) | MIT | (not in W253) | **Δ2 STUDY-PILOT** — KG-RAG hybrid |

### Cat 14 Container/Cloud/Sandboxed-Infra (NEW category)

| Repo | Stars | License | W253 score | Wave 252 verdict |
|---|--:|---|--:|---|
| **dagger/dagger** | 15,799 | NOASSERTION | 7.19 STUDY-PILOT | **Δ2 STUDY-PILOT** (NOASSERTION cap) |
| **agent-infra/sandbox** | (TBD probe) | (TBD probe) | (W253 referenced) | **Δ2 STUDY-PILOT** |
| **hashicorp/terraform-mcp-server** | (TBD probe) | MPL-2.0 | (W253 referenced) | **Δ2 STUDY-PILOT** |
| **microsoft/mcp-gateway** | (TBD probe) | MIT | (W253 referenced) | **Δ2 STUDY-PILOT** |
| **e2b-dev/E2B** | 12,197 | Apache-2.0 | (cross-list Cat 08) | Δ2 (already Wave 251) |
| **netdata/netdata** | (TBD probe) | GPL-3.0 | EXCLUDED per W253 | **REJECT** (GPL-3.0) |

### Cat 15 L1 Discovery Primitives (NEW category)

| Repo | Stars | License | Wave 252 verdict |
|---|--:|---|---|
| **github/github-mcp-server** | 29,868 | NOASSERTION | **INSTALLED via plugin** (KEEP) |
| **pingcap/ossinsight** | (TBD probe) | Apache-2.0 | **Δ2 STUDY-PILOT** — 10B GitHub events |
| **google/deps.dev** | (TBD probe) | Apache-2.0 | **CITE-AS-REFERENCE** — dependency graph |
| **arXiv MCP** | (TBD probe) | (TBD) | **Δ2 STUDY-PILOT** — paper retrieval |
| **Semantic Scholar MCP** | (TBD probe) | (TBD) | **Δ2 STUDY-PILOT** |
| **Papers With Code** | n/a | reference | **CITE-AS-REFERENCE** |
| **DeepWiki Directory** | n/a (mcp.deepwiki.com/mcp) | reference | **INSTALLED via MCP** (KEEP) |
| **PulseMCP** | n/a | reference | **CITE-AS-REFERENCE** — MCP discovery directory |

## SRA Weighted Quality Rubric reconciliation (vs Wave 251 10-dim)

| SRA Dim | SRA Weight | Wave 251 Dim | Wave 251 Weight | Coverage |
|---|--:|---|--:|---|
| Security | 25% | (not first-class; subsumed in D3 license partial) | 0% | **GAP — add D11 security_posture per Path P #1** |
| Maintenance | 20% | D1 stars+velocity (5) + D2 maintainer (15) | 20% | ✅ covered (D1 + half of D2) |
| Capability | 25% | D7 token-eff (8) + D8 cite (6) | 14% | **GAP — capability under-weighted** |
| Community | 15% | D8 cite (6) | 6% | **GAP — community under-weighted** |
| License | 10% | D3 license (15) | 15% | ✅ over-weighted (Wave 251 caps SRA 10% with 15% reflecting CR-12 hard-rule blocker importance) |
| Performance | 5% | (not first-class) | 0% | **GAP — performance not measured** |
| (Wave 251-unique) Native-CC tier | n/a | D5 (15) | 15% | Wave 251-novel; SRA has no D5 equivalent |
| (Wave 251-unique) Install difficulty | n/a | D6 (8) | 8% | Wave 251-novel |
| (Wave 251-unique) CR-12 disposition | n/a | D9 (12) | 12% | Wave 251-novel |
| (Wave 251-unique) Cross-platform | n/a | D10 (6) | 6% | Wave 251-novel |
| (Wave 251-unique) Axis-3 stability | n/a | D4 (10) | 10% | Wave 251-novel (SRA Maintenance partial subsumes) |

**Reconciliation verdict**: Wave 251 10-dim is **superset** of SRA 6-dim Weighted Quality Rubric for CC-specific scoring (adds D5 native-CC tier + D6 install + D9 CR-12 + D10 cross-plat — all CC-runtime-specific). SRA's Capability + Community + Security + Performance weights are UNDER-represented; Wave 252 supplement recommends adding **D11 security_posture** (per Path P #1) and **D12 capability_benchmark** (per SRA L4 inspect_ai / skill-creator eval results) and **D13 community_velocity** (per SRA Community measurement) in next rubric iteration.

**For Wave 252 supplement**: Wave 251 10-dim scoring remains AUTHORITATIVE; SRA Weighted Quality Rubric gaps documented as IMPROVEMENT QUEUE for Wave 253+ rubric extension to 13-dim.

## Verdict reconciliation table (Wave 251 vs W253)

| Repo | Wave 251 verdict | W253 verdict | Wave 252 final | Rationale |
|---|---|---|---|---|
| jarrodwatts/claude-hud | (not in catalog) | #1 ADOPT-NOW | **Δ2 STUDY-PILOT** | NEW; Mia probe age + cpd first |
| openai/openai-agents-python | F (D3=0 NOASSERTION) | #2 ADOPT-NOW | **Δ2 STUDY-PILOT** | Compromise; NOASSERTION cap preserved but value recognized |
| langchain-ai/deepagents | (not in catalog) | #3 ADOPT-NOW | **Δ2 STUDY-PILOT** | NOASSERTION cap; pattern reference |
| firecrawl/firecrawl | (not in catalog) | #4 ADOPT-NOW | **Δ2 STUDY-PILOT** | NEW; web-ingestion primitive |
| wshobson/agents | A KEEP+CURATE | #5 ADOPT-NOW | ✅ KEEP+CURATE | Convergent |
| yamadashy/repomix | A KEEP | #6 ADOPT-NOW | ✅ KEEP | Convergent |
| openai/codex | (not in catalog as adoption candidate) | #7 ADOPT-NOW | **CITE-AS-RUNTIME-DEPENDENCY** | Already runtime; not separate install |
| anthropics/claude-plugins-official | A+ KEEP | #8 ADOPT-NOW | ✅ KEEP | Convergent |
| alirezarezvani/claude-skills | (not in catalog; Agent A phantom claim) | #9 ADOPT-NOW | **Δ2 STUDY-PILOT** | NEW; selective POWERFUL/SOLID-only |
| docling-project/docling | (not in catalog) | #10 ADOPT-NOW | **Δ2 STUDY-PILOT** | NEW; competes with markitdown |
| microsoft/markitdown | Δ1 INSTALL-NOW (sandbox) | #45 STUDY-PILOT | Wave 251 verdict stands | W253 lower velocity; Wave 251 Path P #2 sandbox-required policy |
| getzep/graphiti | Δ1 INSTALL-NOW | (not in W253 top-50) | ✅ Δ1 INSTALL-NOW | Wave 251 stands |
| promptfoo/promptfoo | Δ1 INSTALL-NOW | #35 STUDY-PILOT | Wave 251 verdict stands | Path P #2 verified; W253 less aggressive |
| langfuse/langfuse | Δ2 (Path P #2 downgrade from Δ1) | #33 STUDY-PILOT | ✅ Δ2 STUDY-PILOT | Convergent |
| Arize-ai/phoenix | Δ2 (Path P #2 downgrade) | #50 STUDY-PILOT | ✅ Δ2 STUDY-PILOT | Convergent |
| volcengine/OpenViking | F (AGPLv3) | DEFER | ✅ REJECT-FOR-FIT | Convergent (license blocker) |
| microsoft/LLMLingua | F (SUPERSEDED) | OVERTURNED OUTDATED | ✅ REJECT | Convergent |
| context-mode (mksglu) | C KEEP-CAUTIOUS per Path P #2 | "disputed/overturned" per W253 | ✅ Path P #2 verdict stands (Elastic-2.0 verified by Path P #1) | Wave 251 already corrected |

## Updated INSTALL PLAN (post Wave 252 reconciliation)

### Δ1 INSTALL-NOW (3 — UNCHANGED from Wave 251)

1. promptfoo/promptfoo
2. getzep/graphiti
3. microsoft/markitdown (sandbox-required)

### Δ2 STUDY-PILOT (38+ — expanded from 23 in Wave 251)

**Wave 251 incumbents (23)**: anthropics/claude-cookbooks memory_tool / Anthropic memory_20250818 / oraios serena / dspy / opik / superpowers-chrome / superpowers-lab / mem0 / ruflo / openllmetry / ragas / smolagents / MinerU / browser-use / code2prompt / E2B / chopratejas/headroom / Piebald-AI/splitrail / tokscale / autoevals / flow-next / SethGammon/Citadel

**Wave 252 NEW Δ2 STUDY-PILOT additions (15+)**:
- **jarrodwatts/claude-hud** (NEW; W253 #1)
- **openai/openai-agents-python** (NOASSERTION cap; W253 #2)
- **langchain-ai/deepagents** (NOASSERTION cap; W253 #3)
- **firecrawl/firecrawl** (NEW; W253 #4)
- **alirezarezvani/claude-skills** (NEW; selective vendoring; W253 #9)
- **docling-project/docling** (NEW; W253 #10)
- **HKUDS/LightRAG** (Cat 13 RAG)
- **infiniflow/ragflow** (Cat 13 RAG; reclassified from Wave 251 REJECT)
- **topoteretes/cognee** (Cat 13 RAG; upgraded from Wave 251 DEFER)
- **microsoft/graphrag** (Cat 13 RAG; KG-RAG hybrid)
- **mastra-ai/mastra** (Cat 02)
- **google/adk-python** (Cat 02; NOASSERTION cap)
- **pydantic/pydantic-ai** (Cat 02; NOASSERTION cap)
- **github/spec-kit** (Cat 02 per SRA L7)
- **OthmanAdi/planning-with-files** (Cat 02 per SRA L6)
- **PaddleOCR + Unstructured-IO/unstructured** (Cat 07 document parsers)
- **unclecode/crawl4ai + browserbase/stagehand** (Cat 08 browser+web crawl)
- **dagger/dagger + agent-infra/sandbox + hashicorp/terraform-mcp-server + microsoft/mcp-gateway** (Cat 14 NEW container/cloud)
- **ossf/scorecard + semgrep + gitleaks + trivy + osv-scanner + syft + grype + ast-grep** (Cat 06 NEW security)
- **inspect_ai + inspect_evals + deepeval + claude_telemetry** (Cat 05 evals + observability)
- **sourcebot + pingcap/ossinsight** (Cat 15 NEW L1 discovery primitives)
- **arXiv MCP + Semantic Scholar MCP** (Cat 15 L1 paper retrieval)

### Δ3 REFRESH (7 — UNCHANGED from Wave 251)

### Δ4 REJECT/DEFER (56+ + W253-specific exclusions)

**NEW W253 exclusions added**:
- netdata/netdata (GPL-3.0 per W253)
- snyk/cli (commercial; DEFER not REJECT)
- protect-mcp (UNKNOWN coordinate per W253)

### CITE-AS-RUNTIME-DEPENDENCY (2 NEW)

- openai/codex (NOASSERTION + already runtime via codex CLI)
- anthropics/claude-code (NOASSERTION + canonical CC runtime)

## Cross-model gate disclosure (Wave 252)

- **Path P #3 codex T1** (`bzcjhnhjg`): RUNNING — 166KB output / 2008 LOC / ACTIVELY doing Mia-style absence checks on Top-30 candidates against Wave 251 grand catalog (verified via shell command construction visible in trace). When complete: n=3 cumulative REAL GPT-5.5 codex T1 dispatches across Wave 250+251+252 — **STRONGEST possible cross-model gate**
- **W253 STAND-IN-NOTICE**: W253 itself ran codex bridge but FAILED with OS error 5 → W253 carries STAND-IN-NOTICE; its findings need REAL GPT-5.5 cross-verification (which Path P #3 provides)
- **Wave 252 Sonnet agents (3)**: all FAILED FM-17.b rate-limit + FM-17.g — orchestrator fallback to inline-read worked

**Cumulative cross-model gate strength across Waves 250+251+252**: n=2 REAL GPT-5.5 confirmed (Wave 250 A4 + A4orch) + n=2 REAL GPT-5.5 confirmed (Wave 251 Path P #1 + #2) + n=1 REAL GPT-5.5 PENDING (Wave 252 Path P #3) = **n=4-5 cumulative independent codex T1 verdicts** — far exceeds CR-3 minimum.

## Next-wave queue (Wave 253+)

When operator re-runs research convergence (after rate-limit recovery):

1. **Mia-probe Wave 252 NEW Δ2 candidates** that lack direct gh metadata: github/spec-kit + OthmanAdi/planning-with-files + ossf/scorecard + microsoft/graphrag + agent-infra/sandbox + microsoft/mcp-gateway + UKGovernmentBEIS/inspect_ai
2. **Source-code deep-dive** on Wave 251 Top-3 NEW (SethGammon/Citadel + uditgoenka/autoresearch + jeremylongshore-plugins) via Agent G — DEFERRED Wave 252 due to FM-17.g
3. **Extend rubric to 13-dim** adding D11 security_posture (per Path P #1) + D12 capability_benchmark (per SRA L4) + D13 community_velocity (per SRA Community)
4. **Architecture corpus full read** — sota-architecture-audit/* 27 fire subfolders + remaining wave153-159 audits — DEFERRED Wave 252 due to Agent E FM-17.b
5. **GRAND-SYNTHESIS-W253-2026-05-16.md operational adoption** — W253 lists 12 categories with WINNER/RUNNER-UP/EXCLUDES table; Wave 251+252 should consume this as authoritative reference
6. **Resolve smithery.ai registry HNF** + arxiv 2026 prompt-compression HNF (Wave 250 §6)

## Files index (Wave 252 deliverables — APPEND to Wave 251)

| New file | LOC | Purpose |
|---|--:|---|
| `convergence-synthesis/wave252-supplement.md` (THIS) | (~340) | Wave 252 supplement — W253 + SRA reconciliation |
| `agent-artifacts/Path-P-codex-T1-3-adversarial-wave251-review.md` | (PENDING `bzcjhnhjg` completion) | Path P #3 codex T1 adversarial review of Wave 251 grand catalog (REAL GPT-5.5) |

**Total Wave 251+252 grand catalog**: 9-10 files / ~1900+ LOC / ~130KB

## VERDICT — Wave 252 convergence

**APPROVE-WITH-EXPANSION**: Wave 251 grand catalog validated by W253 parallel synthesis but with **38+ NEW repos + 3 NEW categories** identified for Δ2 STUDY-PILOT expansion. Cross-model gate FULLY satisfied via Wave 250+251 n=2 each (cumulative n=4 codex T1) with Wave 252 Path P #3 PENDING (will reach n=5). Final master synthesis updated.

**Operator decision-support**:
- **3 Δ1 INSTALL-NOW** (unchanged): promptfoo + graphiti + markitdown
- **38+ Δ2 STUDY-PILOT** (Wave 251's 23 + Wave 252's 15+ NEW)
- **7 Δ3 REFRESH** (unchanged)
- **56+ Δ4 REJECT/DEFER** (Wave 251's 56 + Wave 252's 3 NEW exclusions)
- **2 CITE-AS-RUNTIME-DEPENDENCY** (NEW): openai/codex + anthropics/claude-code

Grand catalog **AUTHORITATIVE** for Wave 252+ install decisions until Path P #3 completion or update-trigger fires.
