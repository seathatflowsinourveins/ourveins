---
title: W232-L Architectural Review — W225 Phase 1-12 Install Playbook as INTEGRATED RUNTIME STACK
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 232
agent: comprehensive-review:architect-review (Sonnet stand-in per CLAUDE.local.md ENV (f) — STAND-IN-NOTICE)
predecessors: W225 FINAL MASTER CATALOG + W229 source-dive Top-5 + W231 DevOps review (orthogonal axis)
lens: ARCHITECTURE (layer separation / coupling / scalability / maintainability / integration-gaps)
orchestrator-runtime: claude-sota-installed
install-target-runtime: claude-sota-pure
---

# ARTIFACT-INLINE: tmp/wave232-L-architect-review-phase1-12-2026-05-15.md

## STAND-IN-NOTICE

This review ran under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` per CLAUDE.local.md ENV block (f); the cross-model consensus gate is NOT structurally satisfied for this dispatch. Per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`, orchestrator-side W232-P0 codex T1 follow-up is queued for cross-model gate full satisfaction.

---

## Section 1 — Layer Architecture Diagram (Phase 1-12 grouped by architectural pattern)

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                       Z:\claude-sota-pure RUNTIME STACK                               │
│                                                                                       │
│  ┌─────────────────────────── L0 — FOUNDATION (Phase 0, ALREADY-LANDED) ──────────────┐ │
│  │  claude.exe + sops.exe + cwc/ 5-sh + gsd-agents + Z:/venvs/claude shared          │ │
│  │  + 9 existing .mcp.json rows (mcp-memory + serena + repomix + context7 + ...)     │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                          │                                                │
│                                          ▼                                                │
│  ┌───────────────────── L1 — CITE-CLASS VENDORED (Phase 1, 3, 10, 11.5) ──────────────┐ │
│  │  Pattern: git clone Z:/repos/deps/ + selective skill vendor                        │ │
│  │   • Phase 1.1  anthropics/skills  (135K★)                                          │ │
│  │   • Phase 3    ccpm / BMAD-METHOD / claude-task-master                             │ │
│  │   • Phase 10.1 superpowers (selective unvendored 3 skills)                         │ │
│  │   • Phase 11.5 alirezarezvani startup-cto persona                                  │ │
│  │  COUPLING: read-only filesystem; NO runtime dependency between vendored items     │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                          │                                                │
│                                          ▼                                                │
│  ┌───────────────────── L2 — CLI BINARIES (Phase 2.1, 2.3, 11.1, 9) ──────────────────┐ │
│  │  Pattern: cargo / npm-global / winget / uv tool / go install                      │ │
│  │   • Phase 2.1   rtk (cargo|winget)                                                 │ │
│  │   • Phase 2.3   ccstatusline (npm-g)                                               │ │
│  │   • Phase 2.2   ccusage (npm-g) [W231 ADOPT-NOW promoted from DEFER]               │ │
│  │   • Phase 9.1   pre-commit (uv pip)                                                │ │
│  │   • Phase 9.4   ossf/scorecard (go install)                                        │ │
│  │   • Phase 9.6   osv-scanner (go|winget)                                            │ │
│  │   • Phase 11.1  ast-grep (cargo)                                                   │ │
│  │  COUPLING: PATH-resolved at shell-launch; NO runtime IPC between binaries         │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                          │                                                │
│                                          ▼                                                │
│  ┌───────────────────── L3 — DOCKER SERVICES (Phase 5, 7, 8) ─────────────────────────┐ │
│  │  Pattern: docker run + Z:/claude-sota-pure-state volume                           │ │
│  │   • Phase 5    qdrant   :6333   (vector DB; SINGLE container)                     │ │
│  │   • Phase 7    langfuse :3000+3030 (FULL 6-service compose; SaaS Option B alt)    │ │
│  │   • Phase 8    FalkorDB :16379  (Redis-protocol graph DB; SINGLE container)       │ │
│  │  COUPLING: graphiti Python lib REQUIRES FalkorDB UP; mcp-server-qdrant            │ │
│  │            uvx process REQUIRES qdrant UP                                          │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                          │                                                │
│                                          ▼                                                │
│  ┌───────────────────── L4 — PYTHON LIBS (Phase 6, 8.1, 4.2) ──────────────────────────┐ │
│  │  Pattern: pip install / uv pip install / uvx                                       │ │
│  │   • Phase 4.2   graphiti-core[falkordb]  (KG client)                              │ │
│  │   • Phase 6.1   llama_index-core                                                   │ │
│  │   • Phase 6.2   docling                                                            │ │
│  │   • Phase 6.3   chonkie                                                            │ │
│  │   • Phase 6.4   outlines                                                           │ │
│  │   • Phase 6.5   markitdown (uvx zero-persist)                                      │ │
│  │   • Phase 8.1   ragas                                                              │ │
│  │   • Phase 8.2   garak                                                              │ │
│  │  COUPLING: shared Z:/venvs/claude; potential transitive dep conflicts             │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                          │                                                │
│                                          ▼                                                │
│  ┌───────────────────── L5 — MCP SERVERS (Phase 4.2, 5.2, 7.2, 11.2-3) ────────────────┐ │
│  │  Pattern: claude mcp add + .mcp.json stdio/HTTP entry                              │ │
│  │   • Phase 4.2   graphiti-MCP   (HTTP /mcp/ default OR stdio)                       │ │
│  │   • Phase 5.2   qdrant-MCP     (uvx stdio)                                         │ │
│  │   • Phase 7.2   langfuse-MCP   (npx -y stdio)                                      │ │
│  │   • Phase 11.2  mcp-inspector  (npx zero-persist; dev tool)                        │ │
│  │   • Phase 11.3  motherduckdb-MCP (uvx stdio)                                       │ │
│  │  COUPLING: MCP server invokes L3 Docker service OR L4 Python lib at runtime       │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                          │                                                │
│                                          ▼                                                │
│  ┌───────────────────── L6 — PLUGINS / SKILLS (Phase 11.4, 12) ─────────────────────────┐ │
│  │  Pattern: /plugin install via marketplace                                          │ │
│  │   • Phase 11.4  timescale/pg-aiguide (CONDITIONAL)                                 │ │
│  │   • Phase 12.2  cognee (Python lib + plugin hook)                                  │ │
│  │  COUPLING: marketplace registry + .claude/plugins/cache/<plugin>/                  │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                          │                                                │
│                                          ▼                                                │
│  ┌───────────────────── L7 — GITHUB ACTIONS (Phase 9.5, 10.2-3) ─────────────────────────┐ │
│  │  Pattern: .github/workflows/ YAML                                                  │ │
│  │   • Phase 9.5   harden-runner (CI EDR)                                             │ │
│  │   • Phase 10.2  claude-code-security-review (CI)                                   │ │
│  │   • Phase 10.3  claude-code-action (CI)                                            │ │
│  │   • Phase 11.4  gh-aw (GitHub Agentic Workflows)                                   │ │
│  │  COUPLING: GitHub-side only; no local runtime dependency                          │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                            │
└──────────────────────────────────────────────────────────────────────────────────────────┘

ARCHITECTURAL PATTERN COUNT: 7 distinct install patterns × ~30 candidates total
```

---

## Section 2 — Coupling Matrix (N+1 install-order constraints)

| Hard dependencies (Phase N MUST precede Phase N+1) | Coupling type |
|---|---|
| **Phase 4.3 FalkorDB Docker → Phase 4.2 graphiti pip install → Phase 4.2 graphiti-MCP wire** | 3-step chain; reversed order in W225 is correct (4.3 first, then 4.2) |
| **Phase 5.1 qdrant Docker → Phase 5.2 qdrant-MCP wire** | 2-step chain; FalkorDB & qdrant containers are independent |
| **Phase 7.1 langfuse Docker compose UP → Phase 7.2 langfuse-MCP wire** | 2-step chain; 6 services + healthchecks must precede MCP wire |
| **Phase 0 Z:/venvs/claude shared venv → all L4 Python libs (Phase 6, 8.1, 8.2, 4.2 graphiti-core)** | SHARED venv = ALL pip installs share same dep tree; transitive conflict risk |
| **Phase 0 .mcp.json schema → all L5 MCP server adds (Phase 4.2, 5.2, 7.2, 11.2-3)** | Single JSON file = serial edit; merge conflicts under parallel installs |
| **Phase 2.1 rtk binary → no downstream** | Standalone CLI proxy; no dependency |
| **Phase 9.1 pre-commit → .pre-commit-config.yaml in target repos** | Per-repo wiring; no install-order coupling beyond L2 |

**CRITICAL ARCHITECTURAL COUPLING — Shared venv vector**:

Phase 0 shared `Z:/venvs/claude` is a **HIDDEN COUPLING POINT** between 8+ Python installs (graphiti-core / llama_index / docling / chonkie / outlines / markitdown / ragas / garak / cognee). Transitive dep conflicts (e.g., pydantic version pins: graphiti-core requires pydantic≥2.11.5; older RAG frameworks may pin pydantic<2). This is a SCALABILITY CLIFF (see Section 4).

**CRITICAL ARCHITECTURAL COUPLING — .mcp.json single-file edit**:

5 separate MCP server adds (graphiti / qdrant / langfuse / inspector / motherduckdb) ALL edit the same `.mcp.json`. Per FM-02 parallel-session-isolation sub-class (a) T2-review contamination, concurrent Phase 4+5+7 installs will race on .mcp.json. Recommendation: SERIALIZE MCP adds via `claude mcp add` (which atomically merges) instead of hand-editing JSON.

---

## Section 3 — Integration Gaps (where layers don't integrate cleanly)

### Gap #1 — Phase 4 Memory KG (graphiti) ↔ Phase 6 RAG (llama_index): NO INTEGRATION GLUE

**Symptom**: graphiti stores temporal KG facts; llama_index stores vector embeddings. Both ingest text. No documented bridge — operator must hand-wire a "store-to-both" workflow OR accept data-double-write (same text indexed twice into different stores).

**Architectural smell**: 2 memory backends + 1 vector backend (qdrant) = 3 SEPARATE STATE STORES for what is fundamentally "session context". No unified ingestion contract.

**Recommendation**: codify Phase 4-vs-Phase 6 boundary explicitly:
- graphiti (Phase 4.2) = **temporal KG facts** (entities/relationships, queryable by time)
- qdrant (Phase 5) = **semantic vectors** (similarity search over chunks)
- llama_index (Phase 6.1) = **RAG orchestration layer** (chunks → qdrant; retrievers → graphiti)

llama_index SHOULD be the integration layer that talks to BOTH graphiti and qdrant. Without explicit codification, operator will likely build ad-hoc bridges OR ignore graphiti entirely (most common failure mode for KG layers).

### Gap #2 — Phase 5 Observability (langfuse) span across L4 Python libs: WIRE-NOT-DOCUMENTED

**Symptom**: langfuse instruments LLM calls. To get trace data from llama_index / graphiti / ragas / outlines, operator must add `from langfuse.openai import openai` or `Langfuse callback handlers` to EACH library separately. W225 Phase 7.1 install lands the langfuse stack but does NOT codify the per-library instrumentation wiring.

**Architectural smell**: observability layer is INSTALLED separately from its consumers; integration glue lives in user code, not in the install playbook.

**Recommendation**: add Phase 7.3 "langfuse instrumentation per-lib config" with explicit wiring for:
- llama_index → langfuse.llama_index handler
- openai SDK calls → `from langfuse.openai import openai`
- generic OpenTelemetry → set OTEL_EXPORTER_OTLP_ENDPOINT to langfuse OTLP endpoint

### Gap #3 — Phase 8 Eval (ragas) ↔ Phase 4-6 (KG+RAG): NO EVAL FIXTURES CODIFIED

**Symptom**: ragas evaluates RAG quality (faithfulness / answer_relevancy / context_precision). It requires a dataset of (question, expected_answer, retrieved_contexts) tuples. The playbook installs ragas but provides NO fixture corpus, NO golden dataset, NO continuous-eval wiring.

**Architectural smell**: eval layer installed but no operator-facing contract for "how do I know my RAG stack is improving?"

**Recommendation**: Phase 8.1 ragas row must be paired with explicit "starter eval corpus" — even a 10-row JSONL golden dataset would close this gap. Without it, ragas is shelf-ware.

### Gap #4 — Phase 9 Security Gates vs Phase 5 Docker Stack: GATES DON'T COVER DOCKER

**Symptom**: pre-commit (9.1) + semgrep (9.2) + gitleaks (9.3) + trivy (9.3) + scorecard (9.4) + osv-scanner (9.6) all run at CODE / SOURCE level. langfuse's 6 Docker services + qdrant + FalkorDB run with credentials in `.env.local` files — NONE of the security gates inspect Docker container configs or `.env` files at runtime.

**Architectural smell**: 6 security tools installed; ZERO of them protect against the CRIT-2/CRIT-3 findings from W231 (langfuse 0.0.0.0 binding + 8 CHANGEME credentials).

**Recommendation**: Phase 9.X — add a "Docker security gate" tool (e.g., docker-bench-security, trivy config scan for compose files, OR Snyk IaC). Otherwise the gates layer is structurally incomplete.

### Gap #5 — Phase 11.5 Skill Vendoring: NO REFRESH MECHANISM

**Symptom**: Phase 11.5 alirezarezvani startup-cto persona is vendored via "`/plugin install c-level-skills@claude-code-skills` + extract startup-cto.md only". This is a ONE-TIME selective vendor. Upstream startup-cto.md will evolve; no refresh discipline codified.

**Architectural smell**: cite-class vendored skills have NO upstream-sync cadence; drift accumulates silently. Per FM-20 rows 10-13 README-blob-pin-drift sub-class, vendored cite anchors decay.

**Recommendation**: pair every "selective vendor" Phase row with an "upstream HEAD SHA pin + 90-day re-audit trigger" line. Add to `docs/install-provenance.md` schema.

---

## Section 4 — Scalability Cliffs

### Cliff #1 — Shared Z:/venvs/claude transitive dep conflicts (CRITICAL)

**Threshold**: ~8 Python libs in same venv with overlapping transitive deps (pydantic / openai / numpy / tenacity / posthog). Adding a 9th may break a 1st.

**Empirical signal**: serena pins 32 deps explicitly for CVE compliance (W229 §4); graphiti-core requires pydantic≥2.11.5 + openai≥1.91.0 + numpy≥1.0.0. llama_index has its own pin floor. Probability of collision: HIGH.

**Mitigation**: SPLIT venvs by Phase. Phase 4 graphiti gets `Z:/venvs/claude-kg/`; Phase 6 RAG stack gets `Z:/venvs/claude-rag/`; Phase 8 eval gets `Z:/venvs/claude-eval/`. Increases install-burden but isolates conflict surface.

### Cliff #2 — langfuse 6-service Docker compose stack (Phase 7)

**Threshold**: ~2-4 GB RAM minimum (W229 §1) under low load; postgres + clickhouse hit performance walls at ~10K spans/sec for clickhouse OLAP path. For a single-operator runtime, capacity is FAR more than needed — but Docker Desktop memory headroom on Z:\ portable install may cap at 4-8 GB.

**Mitigation**: W225 §6.1 Option B Cloud (langfuse SaaS) recommended for first-pass; self-host only when privacy/offline drivers exist.

### Cliff #3 — MCP server cumulative startup overhead

**Threshold**: ~10-15 MCP servers in `.mcp.json` before session-start latency becomes operator-perceived. Current target state has 9 wired (.mcp.json existing rows); W225 Phase 4-12 adds 5 more (graphiti / qdrant / langfuse / inspector / motherduckdb) → 14 MCP servers at full install.

**Empirical signal**: each MCP stdio server adds ~50-300ms startup; aggregate ~5-15s session-start lag at 14 servers.

**Mitigation**: gate MCP server enablement by use-case; `disabledMcpjsonServers` array in `.claude/settings.json` allows lazy-enable per-session.

### Cliff #4 — Plugin marketplace cache size (Phase 11.5, 12)

**Threshold**: each marketplace plugin install pulls full repo; selective-vendor reduces footprint but full `/plugin install` of large plugins (e.g., superpowers 192K★) can balloon `.claude/plugins/cache/` to multi-GB.

**Mitigation**: Phase 11.5 explicit "extract single skill" pattern is correct; document the disk-footprint trade-off vs full install.

---

## Section 5 — Maintainability Bombs (compound complexity over time)

### Bomb #1 — License drift across @latest / NOASSERTION repos (HIGH-RISK)

**Repos**: BMAD-METHOD (NOASSERTION) / claude-task-master (NOASSERTION) / anthropics/skills (null SPDX⚠️ — likely Anthropic-OFFICIAL but unverified) / langfuse (open-core MIT+ee/) / rtk (MIT-vs-Apache-2.0 inconsistency per W229 FM-20 #43) / chrome-devtools + playwright (@latest unpinned per W225 §7).

**Compound risk**: every install commit citing these repos becomes a TIER-1-DIRECT cite anchor at HEAD SHA. When upstream license changes (e.g., GitNexus → Polyform Noncommercial per FM-20 row 11), every downstream cite becomes invalid.

**Mitigation**: W226 LICENSE direct-read mandate for all 6 NOASSERTION repos BEFORE Phase 1+3 commit lands (per W225 §7 already queued; ENFORCE pre-Phase-1).

### Bomb #2 — FAST-CHURN repo HEAD drift (e.g., qdrant @ 2026-05-15 = 5/15 commits/day)

**Repos at FAST-CHURN risk** per convergence-gate Axis 3 cpd bands: rtk (recently pushed 2026-05-15) / qdrant (recently pushed 2026-05-15) / serena (recently pushed 2026-05-14) / graphiti (recently pushed) / langfuse (active).

**Compound risk**: blob-SHA cite anchors decay within DAYS; W232+ re-audits already detecting README-blob-pin-drift (FM-20 rows 10-13).

**Mitigation**: every Phase install row pins resolved version at install time + records in `docs/install-provenance.md`. Re-audit cadence: 30 days for FAST-CHURN; 90 days for STABLE-BURN-IN.

### Bomb #3 — Vendored skill duplication risk (Phase 1.1 + Phase 10.1 + Phase 11.5)

**Symptom**: 3 separate Phase install rows do "selective skill vendoring" — anthropics/skills (Phase 1.1), superpowers selective-vendor (Phase 10.1), alirezarezvani startup-cto (Phase 11.5).

**Compound risk**: 3 different selection heuristics + 3 different vendoring paths = future maintainer must track 3 separate "what was vendored when from where" trails. Per kiss-dry-yagni Must-Never #4 (no duplicate functionality).

**Mitigation**: codify a SINGLE vendoring discipline (e.g., `tools/skill-vendor.ps1 <upstream-url> <skill-name>`) that handles HEAD-SHA pin + extract + copy + provenance record. All 3 Phase rows route through it.

### Bomb #4 — Operator-decision-not-documented for 2-option trade-offs (W225 §6)

**Symptom**: 3 controversial decisions (langfuse self-host vs cloud / OpenViking AGPL vs SKIP / superpowers selective vs full) are codified as "operator-decides" but no decision record format codified.

**Compound risk**: 6 months later, operator (or fresh agent) faces "why did we pick Option B for langfuse?" — provenance trail must answer.

**Mitigation**: every 2-option trade-off resolved gets an ADR (Architecture Decision Record) entry in `docs/decisions/<date>-<topic>.md` with: chosen option / rejected alternatives / rationale / re-evaluation triggers.

### Bomb #5 — Source-of-truth multiplication for KG/vector/memory layers

**Symptom**: 3 memory backends installed (mcp-memory sqlite_vec + graphiti FalkorDB + qdrant) = 3 SEPARATE source-of-truth for "what does the agent remember?"

**Compound risk**: data drift between backends; cross-backend search semantics unclear; FM-20 row 9 asymmetric-dual-write sub-class already caught this drift class.

**Mitigation**: codify explicit "memory ownership matrix" — which content type goes where, which is canonical, which is derived/index. Without this, the runtime is a hybrid memory soup.

---

## Section 6 — Operator-Mental-Model Test (≤30 LOC summary of W225 Phase 1-12)

**Can the runtime stack be explained in 1 page?** Yes — here's the ≤30 LOC reduction:

```
Z:\claude-sota-pure RUNTIME STACK (Phase 1-12, 30-LOC summary)

L0  FOUNDATION       claude.exe + sops + cwc + gsd + 9 existing MCPs            [ALREADY-LANDED]
L1  CITE-VENDORED    anthropic-skills + ccpm + superpowers-selective + persona   [Phase 1, 3, 10.1, 11.5]
L2  CLI BINARIES     rtk + ccusage + ccstatusline + pre-commit + ast-grep + sec  [Phase 2, 9, 11.1]
L3  DOCKER SERVICES  qdrant + langfuse-stack + FalkorDB                          [Phase 5, 7.1, 4.3]
L4  PYTHON LIBS      graphiti + llama_index + docling + chonkie + outlines       [Phase 4.2, 6, 8]
                     + markitdown + ragas + garak
L5  MCP SERVERS      graphiti + qdrant + langfuse + inspector + motherduckdb     [Phase 4.2, 5.2, 7.2, 11.2-3]
L6  PLUGINS/SKILLS   pg-aiguide (conditional) + cognee                           [Phase 11.4, 12.2]
L7  GITHUB ACTIONS   harden-runner + claude-code-security + gh-aw                [Phase 9.5, 10.2-3, 11.4]

LAYER OWNERSHIP
  Token efficiency      → L2 rtk + ccusage + ccstatusline
  Workflow methodology  → L1 ccpm + L1 anthropic-skills
  Memory (3 backends)   → L0 mcp-memory (sqlite_vec) + L3+L4 graphiti (FalkorDB) + L3+L4 qdrant
  Document AI           → L4 markitdown + docling + chonkie (chunking)
  RAG orchestration     → L4 llama_index + L4 outlines (structured-out)
  Observability         → L3 langfuse stack + L5 MCP wire
  Eval                  → L4 ragas + garak + L2 promptfoo
  Quality gates         → L2 pre-commit + ast-grep + L7 CI hardening
  MCP authoring         → L5 mcp-inspector

INSTALL ORDER          L0 → L1 → L2 → L3 → L4 → L5 → L6 → L7
                       (Foundation first; binaries before services; libs before MCPs)

OPERATOR DECISIONS     §6.1 langfuse self-host vs cloud
                       §6.2 OpenViking AGPL backend vs SKIP
                       §6.3 superpowers selective vs full plugin
```

**Verdict**: yes, the stack fits 1 page. Layer hierarchy is mostly clean; the 3 cliffs (shared venv / multi-memory-backend / MCP cumulative startup) are the load-bearing complexity costs operator must understand.

---

## Section 7 — 2-Option Trade-Off Resolutions from ARCHITECT Lens

### §6.1 langfuse self-host (Option A) vs Cloud (Option B) — ARCHITECT RECOMMENDS Option B Cloud

**W229 + W231 already covered operational burden** (6 services, ~2-4 GB RAM, 8+ CHANGEME credentials, 0.0.0.0 binding risk).

**ARCHITECT-specific lens**: Option A introduces a **2nd Docker stack** (alongside qdrant + FalkorDB) — total 8 services running. Each container is a maintenance surface (restart policy, log rotation, version drift, image scanning). Option B Cloud REMOVES this entire maintenance surface from the local runtime.

**Architectural cost of Option A**: increases service-count from 3 (qdrant + FalkorDB + langfuse-web) to 8. Service-count is a primary complexity metric; 2.67x increase is HIGH-RISK without offsetting benefit.

**Recommendation**: Option B Cloud. Operator gets observability benefit; runtime stack stays at 3 services.

### §6.2 OpenViking AGPL backend vs SKIP — ARCHITECT RECOMMENDS SKIP

**Architectural cost of Option A**: AGPL-3.0 backend creates a license-firewall around the backend service AND its consumers. Any plugin/skill that calls OpenViking backend inherits AGPL distribution requirements. For a Z:-portable single-operator runtime, license-firewall complexity FAR exceeds benefit.

**Plugin-only Option B (Apache-2.0 plugin examples) is acceptable** if there's a concrete use-case; otherwise SKIP entirely.

**Recommendation**: SKIP unless explicit operator-named driver (per W225 §4.5 user-named OPERATOR-OVERRIDE-ADMISSIBLE). User-naming the candidate IS the architectural admission gate.

### §6.3 superpowers selective-vendor (Option A) vs full plugin install (Option B) — ARCHITECT RECOMMENDS Option A Selective

**Architectural cost of Option B**: superpowers is 192K★ MIT; full plugin install pulls multi-GB cache + 14 upstream skills, of which 11 are already locally-mirrored (per existing W215 selective-vendoring). 3 unvendored skills (executing-plans / finishing-a-development-branch / using-git-worktrees) are the only additions needed.

**Option A cost-benefit**: selective vendor of 3 skills = ~50-100 LOC additions to `.claude/skills/superpowers/`; ZERO disk-footprint balloon; no duplicate-functionality with existing local mirrors. Per kiss-dry-yagni Must-Never #4.

**Recommendation**: Option A. Selective vendor of 3 specific skills. Pair with §5 Bomb #3 mitigation (single vendoring discipline tool).

---

## Section 8 — ARCHITECTURE-REVIEW-COMPLETE

```
ARCHITECTURE-REVIEW-COMPLETE:
  agent: comprehensive-review:architect-review (Sonnet stand-in per ENV (f) — STAND-IN-NOTICE)
  source: wave225 FINAL MASTER CATALOG + wave229 source-dive Top-5 + wave231 DevOps review (orthogonal axis)
  lens: ARCHITECTURE (layer separation / coupling / scalability / maintainability / integration-gaps)
  phases-reviewed: 12 (Phase 1-12; L0-L7 architectural layer decomposition)
  layer-pattern-count: 7 distinct install patterns × ~30 candidates
  findings:
    CRITICAL: 3
      C1: Shared Z:/venvs/claude transitive dep conflicts across 8+ Python libs
          (graphiti / llama_index / docling / chonkie / outlines / markitdown / ragas / garak)
          — SCALABILITY CLIFF #1; mitigation = SPLIT venvs by Phase
      C2: 3 memory backends installed (mcp-memory sqlite_vec + graphiti FalkorDB + qdrant) with
          NO explicit ownership-matrix or integration-glue codified — INTEGRATION GAP #1
          + MAINTAINABILITY BOMB #5; risk = data drift + asymmetric-dual-write FM-20 row 9
      C3: Phase 9 Security Gates layer (6 tools) does NOT inspect Phase 5 Docker stack
          configs or .env files — INTEGRATION GAP #4; mitigation = add Docker security gate
    IMPORTANT: 5
      I1: Phase 5 Observability (langfuse) wires per-Python-lib (Phase 6/8/4.2) NOT codified
          in install playbook — INTEGRATION GAP #2; recommend Phase 7.3 langfuse-instrumentation row
      I2: Phase 8 Eval (ragas) has NO starter eval corpus / golden dataset codified
          — INTEGRATION GAP #3; recommend pair install with 10-row JSONL fixture
      I3: .mcp.json single-file edit race across 5 separate MCP server adds
          — coupling matrix risk; recommend SERIALIZE via `claude mcp add` (atomic merge)
      I4: Selective skill vendoring across 3 Phase rows (1.1/10.1/11.5) uses 3 different
          heuristics + 3 different vendoring paths — MAINTAINABILITY BOMB #3; recommend
          single `tools/skill-vendor.ps1` discipline
      I5: 2-option trade-off decisions (§6.1/6.2/6.3) have no ADR format codified
          — MAINTAINABILITY BOMB #4; recommend docs/decisions/<date>-<topic>.md per resolved trade-off
    MINOR: 4
      M1: MCP cumulative startup overhead at 14 servers — SCALABILITY CLIFF #3;
          mitigation = disabledMcpjsonServers gating per-session
      M2: Phase 11.5 cite-class vendored skills have NO upstream-sync cadence
          — INTEGRATION GAP #5 + MAINTAINABILITY BOMB #2; recommend 90-day re-audit + HEAD pin
      M3: Plugin marketplace cache size at full /plugin install
          — SCALABILITY CLIFF #4; mitigation = selective extract pattern (already documented)
      M4: License drift across @latest + NOASSERTION repos
          — MAINTAINABILITY BOMB #1; mitigation = W226 LICENSE direct-read PRE-Phase-1 (queued)

  operator-mental-model: PASS — stack fits 1 page (Section 6); 7 layers; 8 ownership domains;
                         3 operator decisions clearly bounded
  2-option-resolutions:
    §6.1 langfuse: Option B Cloud (architectural cost of Option A = 2.67x service-count)
    §6.2 OpenViking: SKIP unless explicit operator-named driver (license-firewall complexity)
    §6.3 superpowers: Option A Selective (kiss-dry-yagni Must-Never #4; ZERO disk-footprint balloon)

  tool-uses: 4 of 15 budget
  stand-in-notice: STAND-IN per CLAUDE.local.md ENV (f) — cross-model gate NOT structurally
                   satisfied; W232-P0 orchestrator-direct codex T1 follow-up queued

  handoff_to: orchestrator
  verdict_one_line: ARCHITECTURE-REVIEW-COMPLETE: 3 Critical / 5 Important / 4 Minor architectural findings;
                    operator-mental-model PASS (1-page summary fits Section 6);
                    3 controversial 2-option trade-offs resolved from ARCHITECT lens
                    (langfuse=B / OpenViking=SKIP / superpowers=A-Selective)
```

## Section 9 — Cross-cutting takeaways

1. **Stack is architecturally sound at the LAYER level** (clean L0-L7 decomposition; 7 distinct install patterns; minimal cross-layer cycles). The W225 phase ordering correctly respects the dependency DAG.

2. **3 Critical findings cluster around DATA-PLANE INTEGRATION** (not control-plane): shared venv conflicts (C1) / 3-memory-backend ambiguity (C2) / security gates don't cover data services (C3). Operator should focus integration effort on data-plane glue, not install-order.

3. **Maintainability bombs are TIME-DELAYED, not install-time**: license drift (M4) / FAST-CHURN HEAD drift (Bomb #2) / cite-class vendor drift (M2) all surface 30-90 days post-install. Mitigation = audit cadence + ADR + HEAD-pin discipline.

4. **Operator-mental-model PASSES the 1-page test** — but ONLY if Section 6's ownership matrix is added to install-provenance.md. Without it, fresh operator at month 6 won't know which memory backend is canonical.

5. **Cross-model gate**: STAND-IN-NOTICE applies; W232-P0 codex T1 follow-up queued for full cross-model gate satisfaction per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate.

ARCHITECTURE-REVIEW-COMPLETE: 3 Critical / 5 Important / 4 Minor architectural findings; operator-mental-model PASS
