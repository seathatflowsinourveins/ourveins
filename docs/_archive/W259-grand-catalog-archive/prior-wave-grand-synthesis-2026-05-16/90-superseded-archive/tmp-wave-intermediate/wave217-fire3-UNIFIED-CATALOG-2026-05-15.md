---
title: Wave 217 Fire 3 — Unified SOTA Scored Catalog for Z:\claude-sota-pure runtime
status: INFLIGHT
date: 2026-05-15
agent: orchestrator (post-Path-P-codex-T1 synthesis)
wave: W217 fire 3
verdict_one_line: "BUILDING: 17 strategic NEW repos fresh-scored across 3 Path P codex T1 cohorts (TOP-5/Memory+KG/Plugin-Marketplace); 2 more cohorts (workflow-engines + RAG-e2e) dispatching; v5 197-repo baseline REFERENCE-CITE"
---

# Wave 217 Fire 3 — Unified SOTA Scored Catalog (W217-F3-UNIFIED)

## §0 Authority & data sources

This catalog is the **consolidation SOT** that supersedes prior narrow-delta v6-extended. Per Agent α §1 finding (`tmp/wave217-fire2-agentα-prior-coverage-gap-analysis-2026-05-15.md`), v5-comprehensive (197 repos × 26 layers × 9-dim) is the AUTHORITATIVE-DEFINITIVE baseline; v6 was a narrow W222+W223 delta. Wave 217 Fire 3 unifies:

| Source | Path | Scope contribution |
|---|---|---|
| v5-comprehensive baseline | `Z:/claude-sota-pure/docs/sota-research-CATALOG-FINAL-v5-comprehensive-2026-05-15.md` | 197 repos × 26 layers × 9-dim (REFERENCE-CITE) |
| v6-extended narrow delta | `Z:/claude-sota-pure/docs/sota-research-CATALOG-FINAL-v6-extended-2026-05-15.md:1-426` | ~75 W222+W223 deltas (REFERENCE-CITE) |
| 8 domain deep-dives | `Z:/claude-sota-pure/docs/sota-research-*-deep-2026-05-15.md` | ~150+ scored repos (REFERENCE-CITE) |
| Agent α gap analysis | `tmp/wave217-fire2-agentα-prior-coverage-gap-analysis-2026-05-15.md` | 15 category gaps + TOP-15 NEW + 12 staleness candidates |
| Wave 217 F3 Path P codex T1 (REAL GPT-5.5) | `.claude/state/codex_consult_w217f3_*_OUT.txt` | **Fresh 11-dim scoring on 17+ strategic NEW repos** across 3 cohorts (TOP-5 ✓ / Memory+KG ✓ / Plugin-Marketplace ✓; 2 more dispatching) |

**Cross-model gate satisfaction**: Wave 217 Fire 3 Path P codex T1 dispatches satisfy `cross-model-consensus.md §The contract` via orchestrator-direct foreground+tee dispatch (REAL GPT-5.5 codex CLI 0.130.0 subprocess; NOT Sonnet stand-in). FM-17.b recovery from n=2 same-class BRIDGE-MODE-subagent autocompact-thrash (β+γ) per `closed-loop-recursive-narrowing.md` Outcome B + Pattern D recovery family (n=13+).

## §1 Scoring schema (11-dim Probe-DAG-1-7 unified)

| Dim | Field | Range / values |
|---|---|---|
| D1 | `stars` | int (GitHub current) |
| D2 | `axis_1` | PASS-FIRM (≥3 distinct orgs) / PASS-BORDERLINE (2) / FAIL (1) |
| D2b | `axis_1_orgs` | int count |
| D3 | `axis_2` | PASS (≥2 named-T2) / PARTIAL (1) / FAIL (0) |
| D4 | `axis_3_band` | FAST-CHURN / ACTIVE / STABLE-BURN-IN / SUSTAINED-MAINTENANCE / LAUNCH-SPIKE / STRONG-PROVENANCE-EXPRESS |
| D5 | `license` | MIT / Apache-2.0 / BSD (PASS) — AGPL / GPL / proprietary / UNKNOWN (BLOCKER) |
| D6 | `probe_4_collision` | NO / UNCERTAIN / YES-DUPLICATE |
| D7 | `probe_5_harness` | PASS / PARTIAL / FAIL |
| D8 | `probe_6_blockers` | PASS / FAIL-LICENSE / FAIL-ARCHIVE / FAIL-PHANTOM-PKG |
| D9 | `probe_7_demand` | ABSENCE-REJECT / CREATES-WORKFLOW.b / SUPERSEDED-BY-X / REINFORCES-INCUMBENT |
| D10 | `cc_native_path` | YES / PARTIAL / NO |
| D11 | `wiring_difficulty` | 1 (trivial) → 5 (heavy) |
| Δ | `composite_verdict` | ADOPT-NOW / STUDY-PILOT.b / REJECT-FOR-FIT / DEMOTED |
| ε | `head_sha` | upstream HEAD SHA pin |
| ζ | `evidence_cite` | file:line @ SHA OR official-docs URL |

## §2 Wave 217 Fire 3 BRIDGE-MODE Path P fresh-scored repos

### §2.1 Cohort: TOP-5 strategic (✓ codex T1 NEEDS-REVISION conf=0.86)

Source: `.claude/state/codex_consult_w217f3_top5_fresh_OUT.txt` JSON-at-EOF.

| Repo | Stars | Axis-1 (orgs) | Axis-2 | Axis-3 | Lic | P4 | P5 | P6 | P7 | CC | Wire | **Verdict** |
|---|---:|---|---|---|---|---|---|---|---|---|---:|---|
| **wshobson/agents+commands** | 35,400 | PASS-FIRM | PASS | LAUNCH-SPIKE | MIT | YES-DUP | PASS | PASS | CREATES.b | YES | 2 | **ADOPT-NOW** |
| **microsoft/LLMLingua** | 6,200 | PASS-BORDERLINE | PASS | STABLE-BURN-IN | MIT | NO | PASS | PASS | CREATES.b | NO | 3 | **ADOPT-NOW** |
| langchain-ai/langgraph | 32,100 | PASS-FIRM (275) | PARTIAL | ACTIVE | MIT | UNCERTAIN | PARTIAL | PASS | CREATES.b | NO | 4 | STUDY-PILOT.b |
| crewAIInc/crewAI | 51,500 | PASS-FIRM | PARTIAL | ACTIVE | MIT | YES-DUP | **FAIL** | PASS | SUPERSEDED-BY-X | NO | 5 | DEMOTED |
| Arize-ai/phoenix | 9,700 | PASS-FIRM | PASS | FAST-CHURN | **proprietary** | YES-DUP | PASS | **FAIL-LICENSE** | SUPERSEDED-BY-X | PARTIAL | 3 | **REJECT** |

**Anti-patterns caught**: license-trap (Phoenix ELv2 proprietary `Arize-ai/phoenix LICENSE @acd1626b`); framework-over-runtime (crewAI external harness); plugin-namespace collisions.

### §2.2 Cohort: Memory + KG (✓ codex T1 APPROVE conf=0.87)

Source: `.claude/state/codex_consult_w217f3_memory_kg_OUT.txt` JSON-at-EOF.

| Repo | Stars | Axis-1 (orgs) | Axis-2 | Axis-3 | Lic | P4 | P5 | P6 | P7 | CC | Wire | **Verdict** |
|---|---:|---|---|---|---|---|---|---|---|---|---:|---|
| **doobidoo/mcp-memory-service** | 1,843 | PASS-BORDERLINE (5) | PASS | FAST-CHURN | Apache-2.0 | NO | PASS | PASS | REINFORCES | YES | 1 | **ADOPT-NOW** |
| **getzep/graphiti** | 26,098 | PASS-FIRM (5) | PASS | SUSTAINED-MAINT | Apache-2.0 | NO | PASS | PASS | REINFORCES | YES | 3 | **ADOPT-NOW** |
| **topoteretes/cognee** | 17,244 | PASS-FIRM (4) | PASS | FAST-CHURN | Apache-2.0¹ | UNCERTAIN | PASS | PASS | CREATES.b | YES | 3 | **ADOPT-NOW** |
| mem0ai/mem0 | 55,801 | PASS-FIRM (6) | PARTIAL | FAST-CHURN | Apache-2.0 | YES-DUP | PARTIAL | PASS | SUPERSEDED-BY-X | PARTIAL | 4 | DEMOTED |
| volcengine/OpenViking² | 23,958 | PASS-FIRM (1) | PARTIAL | LAUNCH-SPIKE | **AGPL** | YES-DUP | PARTIAL | **FAIL-LICENSE** | SUPERSEDED-BY-X | PARTIAL | 4 | **REJECT** |
| letta-ai/letta | 22,736 | PASS-FIRM (2) | PARTIAL | ACTIVE | Apache-2.0 | YES-DUP | PARTIAL | PASS | ABSENCE-REJECT | NO | 5 | **REJECT** |

¹ **License correction (load-bearing)**: codex verified Cognee HEAD `4ca1d0c2bbbb46924acb1f5f6cd805214805ca16` LICENSE:1 = Apache-2.0. Prior claude-sota memory `reference_memory_rag_audit_HNF_agplv3_blocker_2026_05_02.md` recorded AGPLv3 — that referred to the OpenViking variant or stale audit; Cognee at current HEAD is **Apache-2.0 → ADOPT-NOW eligible**.

² User-explicit name. AGPL-3.0 blocks pure-runtime adoption per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md §Probe 6` permissive-license-only mandate. OpenViking's CC plugin path is local-source/marketplace-planned only; mcp-memory-service + Graphiti cover the same memory layer with compatible licenses.

**Anti-patterns caught**: license drift correction (cognee Apache-2.0, OpenViking AGPL); star-count bait avoided (mem0 55K★ DEMOTED for namespace collision); server-mode tax (Graphiti+Cognee require FalkorDB/Postgres backing services — mcp-memory-service is low-friction L1).

### §2.3 Cohort: Plugin-Marketplace deep (✓ codex T1 APPROVE conf=0.86)

Source: `.claude/state/codex_consult_w217f3_plugin_marketplace_OUT.txt` JSON-at-EOF.

| Repo | Stars | Axis-1 (orgs) | Axis-2 | Axis-3 | Lic | P4 | P5 | P6 | P7 | CC | Wire | **Verdict** |
|---|---:|---|---|---|---|---|---|---|---|---|---:|---|
| **anthropics/claude-plugins-official** | 19,400 | PASS-FIRM (10) | PASS | FAST-CHURN | Apache-2.0 | NO | PASS | PASS | CREATES.b | YES | 1 | **ADOPT-NOW** |
| **addyosmani/agent-skills** | 39,100 | PASS-FIRM (1) | PASS | ACTIVE | MIT | UNCERTAIN | PASS | PASS | CREATES.b | YES | 1 | **ADOPT-NOW** |
| **affaan-m/everything-claude-code** | 183,000³ | PASS-FIRM (1) | PASS | LAUNCH-SPIKE | MIT | UNCERTAIN | PASS | PASS | CREATES.b | YES | 3 | **ADOPT-NOW** |
| alirezarezvani/claude-skills | 14,900 | PASS-BORDERLINE | PASS | FAST-CHURN | MIT | YES-DUP | PARTIAL | PASS | CREATES.b | YES | 3 | STUDY-PILOT.b |
| obra/superpowers (pinned subset) | 193,000³ | PASS-FIRM (2) | PASS | LAUNCH-SPIKE | MIT | YES-DUP | PASS | PASS | REINFORCES | YES | 2 | DEMOTED (subset OK) |
| VoltAgent/awesome-cc-subagents | 19,900 | PASS-FIRM (3) | PASS | STABLE-BURN-IN | MIT | YES-DUP | PARTIAL | PASS | SUPERSEDED-BY-X | YES | 2 | REJECT (catalog OK) |

³ Star counts at LAUNCH-SPIKE/proxy-counts — Wave 218 should re-pin via `gh api` before commit.

**Canonical 5-marketplace baseline**: anthropics-official + wshobson + addyosmani + ECC + superpowers-pinned-subset.

**Anti-patterns caught**: star-count-only adoption without namespace review; catalog-treated-as-marketplace; bulk-installing overlapping personas across marketplaces; broad skill suites without demand-gated workflow ownership.

### §2.4 Cohort: Workflow-engines (✓ codex T1 NEEDS-REVISION conf=0.86)

Source: `.claude/state/codex_consult_w217f3_workflow_engines_OUT.txt` JSON-at-EOF. **Heavy license-trap cohort** — only 1/5 survives Probe 6+7.

| Repo | Stars | Axis-1 (orgs) | Axis-2 | Axis-3 | Lic | P4 | P5 | P6 | P7 | CC | Wire | **Verdict** |
|---|---:|---|---|---|---|---|---|---|---|---|---:|---|
| **temporalio/temporal** | 20,100 | PASS-FIRM (5) | PASS | SUSTAINED-MAINT | MIT | NO | PARTIAL | PASS | REINFORCES | PARTIAL | 4 | **ADOPT-NOW** |
| PrefectHQ/prefect | 22,300 | PASS-FIRM (4) | PASS | SUSTAINED-MAINT | Apache-2.0 | YES-DUP | PARTIAL | PASS | SUPERSEDED-BY-X | PARTIAL | 3 | DEMOTED |
| **restatedev/restate** | 3,800 | PASS-BORDERLINE (3) | PARTIAL | ACTIVE | **proprietary (BSL)** | UNCERTAIN | PARTIAL | **FAIL-LICENSE** | CREATES.b | PARTIAL | 3 | **REJECT** |
| **inngest/inngest** | 5,300 | PASS-BORDERLINE (3) | PARTIAL | SUSTAINED-MAINT | **proprietary (SSPL/DOSP)** | UNCERTAIN | PARTIAL | **FAIL-LICENSE** | CREATES.b | NO | 3 | **REJECT** |
| hatchet-dev/hatchet | 7,100 | PASS-BORDERLINE (2) | PARTIAL | ACTIVE | MIT | YES-DUP | PARTIAL | PASS | SUPERSEDED-BY-X | NO | 4 | REJECT |

**License-trap corrections (load-bearing)**:
- **restatedev/restate**: Prior orch-deep catalog assumed Apache-2.0; codex verified at HEAD `b57a2f97` `https://docs.restate.dev/get-restate` shows **BSL (Business Source License)** for server runtime — NOT permissive. Per Probe 6 mandate (`Z:/claude-sota/.claude/rules/ahfv-probe-dag.md §Probe 6`) BSL is NOT MIT/Apache/BSD compatible.
- **inngest/inngest**: Server + CLI under SSPL/DOSP (`https://www.inngest.com/docs/self-hosting`); same blocker class as Restate.

**Anti-patterns caught**:
- external-server-tax — all 5 require orchestrator service / worker / dev server outside CC in-process Agent tool state
- license refresh (count-OVER + license-staleness) — both Restate + Inngest had been mistakenly tagged "Apache-2.0" in prior catalog
- workflow-engine-abundance — only Temporal has load-bearing T1-T7 scheduling demand; the other 4 fail Probe 7 demand-gate
- Probe 4 namespace overlap — Prefect+Hatchet duplicate Temporal+Restate without unique CC-native leverage

### §2.5 Cohort: RAG-e2e (✓ codex T1 APPROVE conf=0.84)

Source: `.claude/state/codex_consult_w217f3_rag_e2e_OUT.txt` JSON-at-EOF.

| Repo | Stars | Axis-1 (orgs) | Axis-2 | Axis-3 | Lic | P4 | P5 | P6 | P7 | CC | Wire | **Verdict** |
|---|---:|---|---|---|---|---|---|---|---|---|---:|---|
| **llmware-ai/llmware** | 14,900 | PASS-FIRM (7) | PASS | ACTIVE | Apache-2.0 | NO | PASS | PASS | REINFORCES | YES | 2 | **ADOPT-NOW** |
| **onyx-dot-app/onyx** | 29,400 | PASS-FIRM (7) | PARTIAL | FAST-CHURN | MIT | UNCERTAIN | PARTIAL | PASS | CREATES.b | PARTIAL | 4 | **ADOPT-NOW** |
| **infiniflow/ragflow** | 80,600 | PASS-FIRM (7) | PARTIAL | FAST-CHURN | Apache-2.0 | UNCERTAIN | PARTIAL | PASS | CREATES.b | PARTIAL | 5 | **ADOPT-NOW** |
| OpenSPG/KAG | 8,800 | PASS-BORDERLINE (4) | PARTIAL | STABLE-BURN-IN | Apache-2.0 | UNCERTAIN | PARTIAL | PASS | SUPERSEDED-BY-X | PARTIAL | 4 | STUDY-PILOT.b |
| **Canner/WrenAI** | 15,200 | PASS-BORDERLINE (3) | PARTIAL | FAST-CHURN | **AGPL** | NO | PARTIAL | **FAIL-LICENSE** | ABSENCE-REJECT | PARTIAL | 4 | **REJECT** |

**Caveats**:
- onyx — verify CE/EE split + onyx-foss license before commit (the main repo claims MIT; some components may differ)
- ragflow — wire-difficulty 5 reflects server-mode harness tax (heaviest in cohort); but 80.6K★ + Apache-2.0 + Document-AI specialty makes it worth the install effort
- llmware downstream model-depot — model selection must remain LICENSE-gated (per codex anti-pattern: source MIT/Apache but bundled models may have downstream restrictions)
- KAG — overlaps Graphiti+Cognee KG namespace; needs distinct logical-reasoning pilot scope before adopt

**Anti-patterns caught**: full-stack RAG-server-vs-CC-primitive (Onyx+RAGFlow tax); Onyx license-CE/EE split needs verify; WrenAI demand-gate (no SQL-RAG workflow); KAG-collapsed-into-memory (distinct logical-reasoning layer); llmware bundled-model-license-stack.

### §2.6 Cohort: Observability-alts (✓ codex T1 APPROVE conf=0.88)

Source: `.claude/state/codex_consult_w217f3_obs_alts_OUT.txt` JSON-at-EOF.

| Repo | Stars | Axis-1 (orgs) | Axis-2 | Axis-3 | Lic | P4 | P5 | P6 | P7 | CC | Wire | **Verdict** |
|---|---:|---|---|---|---|---|---|---|---|---|---:|---|
| **langfuse/langfuse** | 27,300 | PASS-FIRM (6) | PASS | STABLE-BURN-IN | MIT-core¹ | NO | PASS | PASS | REINFORCES | PARTIAL | 2 | **ADOPT-NOW** |
| openlit/openlit | 2,400 | PASS-BORDERLINE (4) | PASS | STABLE-BURN-IN | Apache-2.0 | UNCERTAIN | PARTIAL | PASS | CREATES.b | PARTIAL | 3 | STUDY-PILOT.b |
| traceloop/openllmetry | 7,100 | PASS-FIRM (5) | PASS | STABLE-BURN-IN | Apache-2.0 | YES-DUP | PASS | PASS | SUPERSEDED-BY-X | PARTIAL | 2 | DEMOTED |
| **Helicone/helicone** | 5,700 | PASS-BORDERLINE (3) | PARTIAL | STABLE-BURN-IN | Apache-2.0 | NO | PARTIAL | PASS | SUPERSEDED-BY-X | PARTIAL | 3 | **REJECT** |
| **comet-ml/opik** | 19,300 | PASS-FIRM (5) | PASS | SUSTAINED-MAINT | Apache-2.0 | NO | PARTIAL | PASS | SUPERSEDED-BY-X | PARTIAL | 4 | **REJECT** |

¹ Langfuse: MIT-core with EE-exception (per `https://github.com/langfuse/langfuse#readme:550`); core install path is permissive.

**Anti-patterns caught**: incumbent duplication (Langfuse already satisfies the load-bearing verdict trail; alternatives need REINFORCING or new OTel-native workflow evidence); server-mode tax (full UI stacks need Docker/service ownership while OTel-SDK paths lighter); OTel-native collision (OpenLIT vs OpenLLMetry — must pick one).

### §2.7 Cohort: Token-opt remaining + ACP (✓ codex T1 APPROVE conf=0.86)

Source: `.claude/state/codex_consult_w217f3_token_acp_OUT.txt` JSON-at-EOF.

| Repo | Stars | Axis-1 (orgs) | Axis-2 | Axis-3 | Lic | P4 | P5 | P6 | P7 | CC | Wire | **Verdict** |
|---|---:|---|---|---|---|---|---|---|---|---|---:|---|
| **agentclientprotocol/claude-agent-acp** | 1,900 | PASS-FIRM (5) | PASS | FAST-CHURN | Apache-2.0 | NO | PASS | PASS | REINFORCES | YES | 1 | **ADOPT-NOW** |
| **agentclientprotocol/python-sdk** | 255 | PASS-BORDERLINE (5) | PASS | LAUNCH-SPIKE | Apache-2.0 | NO | PASS | PASS | CREATES.b | PARTIAL | 2 | **ADOPT-NOW** |
| **shcherbak-ai/contextgem** | 1,800 | PASS-FIRM (1) | PASS | ACTIVE | Apache-2.0 | UNCERTAIN | PASS | PASS | CREATES.b | PARTIAL | 3 | **ADOPT-NOW** |
| lm-sys/RouteLLM | 4,900 | PASS-FIRM (3) | PARTIAL | STABLE-BURN-IN | Apache-2.0 | YES-DUP | PARTIAL | PASS | SUPERSEDED-BY-X | NO | 4 | DEMOTED |
| **zilliztech/GPTCache** | 8,000 | PASS-FIRM (3) | PARTIAL | STABLE-BURN-IN | MIT | NO | PARTIAL | PASS | ABSENCE-REJECT | NO | 4 | **REJECT** |

**Anti-patterns caught**: server-mode semantic caching without observed repeated-query workload (GPTCache); claude-code-router duplicate (RouteLLM); ContextGem scope-creep (limit to structured document extraction); prefer official ACP bridge over community wrappers.

## §3 Carry-forward from v5 baseline (REFERENCE-CITE)

v5 has 197 scored repos across 26 layers; carrying forward at REFERENCE-CITE level without re-duplication. Wave 218 install playbook materializes adopt-class rows into install commands.

- Auth/secrets/identity (`v5 §3.2:115-118`): ory/hydra + ory/kratos + sops + age + keycloak + spicedb
- Memory-RAG-vector layer (45 repos in `v5 §memory-rag-vector`): re-pin HEAD SHAs in Wave 218
- Foundation LLM runtime (`v5 §foundation-llm-runtime:64,74`): ollama + vllm — mature, carry as-is
- Code-cli-security (38 repos): largely stable; carry with staleness check
- Agents-eval-obs (22 repos): merge with W217-F3 cohorts §2.6 +§2.7

## §4 Carry-forward from 8 domain deep-dives (REFERENCE-CITE)

Per Agent α §3 cohort enumeration — 70+ repos with deep-dive evidence; Wave 218 install playbook references these for cohort install ordering.

| Cohort | Source deep-dive | New repos | Wave 218 priority |
|---|---|---:|---|
| Workflow engines | `orch-deep:50-167` | 8 | TOP-3 fresh-scored W217-F4 §2.4 |
| Agent-orch frameworks | `agents-eval:45-173` | 12 | 5 fresh-scored §2.1 + remainder REFERENCE-CITE |
| Open RAG E2E | `rag-memory-deep:54-179` | 7 | TOP-5 fresh-scored W217-F4 §2.5 |
| Spec/TDD/awesome | `spec-tdd-kb:32-490` | 6 | Selective fresh-score (OpenSpec + baml + probity) |
| ACP family + CC ecosystem | sibling cite | 7 | wshobson+ECC done; ACP TOP-2 W217-F4 §2.7 |
| Token-opt remaining | `token-opt:46-243` | 10 | LLMLingua done §2.1; contextgem+GPTCache+RouteLLM W217-F4 §2.7 |
| Observability alts | `agents-eval+deploy-telemetry` | 8 | Phoenix rejected §2.1; alt scoring W217-F4 §2.6 |
| Browser/computer-use | `deploy-telemetry:246-292` | 5 | TOP-2 W217-F5 (browser-use + Stagehand) |
| Autonomous-agent class | `agents-eval:173-208` | 8 | TOP-3 W217-F5 (OpenHands + SWE-agent + OpenInterpreter) |

## §5 Staleness pin-refresh queue (Agent α §5)

**P0 license-verify** (block before adopt): `anthropics/claude-agent-sdk-typescript` Commercial-ToS UNVERIFIED

**P1 fresh-pin needed**:
- `modelcontextprotocol/servers` — no HEAD SHA pin (P0 ADOPT-NOW)
- `harbor-framework/terminal-bench` 113d stale → migrate to `laude-institute/harbor` v2
- W217-F3 ADOPT-NOW rows with `head_sha: UNKNOWN`: addyosmani/agent-skills + alirezarezvani/claude-skills + obra/superpowers + affaan-m/everything-claude-code + VoltAgent (Wave 218 must re-pin via `mcp__github__get_file_contents` for marketplace.json)

**P1 license-dispute re-probe**: `mksglu/context-mode` ELv2 cross-check

Wave 218 install playbook MUST resolve P0+P1 BEFORE any install row commits.

## §6 Top-N adoption priority for Z:\claude-sota-pure (7-cohort FINAL consolidated)

### §6.1 ADOPT-NOW tier (16 repos — ranked by wiring difficulty × strategic load-bearing)

| # | Repo | Cohort | Lic | Wire | Stars | Rationale |
|---|---|---|---|---:|---:|---|
| 1 | `anthropics/claude-plugins-official` | CC marketplace | Apache-2.0 | 1 | 19,400 | OFFICIAL canonical baseline; 10 distinct orgs Axis-1 PASS-FIRM |
| 2 | `addyosmani/agent-skills` | CC marketplace | MIT | 1 | 39,100 | Addy Osmani Google Chrome DevRel; named-T2 author; ACTIVE band |
| 3 | `doobidoo/mcp-memory-service` | Memory L1 | Apache-2.0 | 1 | 1,843 | REINFORCES incumbent; sqlite_vec backend low-friction |
| 4 | `agentclientprotocol/claude-agent-acp` | ACP bridge | Apache-2.0 | 1 | 1,900 | Official CC↔ACP bridge; REINFORCES official-org primitive |
| 5 | `wshobson/agents+commands` | CC marketplace | MIT | 2 | 35,400 | User-explicit; LAUNCH-SPIKE; CC-native YES |
| 6 | `langfuse/langfuse` | Observability | MIT-core | 2 | 27,300 | REINFORCES incumbent verdict-trail; 6-org Axis-1 PASS-FIRM |
| 7 | `agentclientprotocol/python-sdk` | ACP SDK | Apache-2.0 | 2 | 255 | ACP standard SDK; 5-org Axis-1 BORDERLINE; CREATES-WORKFLOW.b |
| 8 | `llmware-ai/llmware` | RAG-e2e | Apache-2.0 | 2 | 14,900 | Small-LLM-RAG specialist; 7-org Axis-1 PASS-FIRM |
| 9 | `getzep/graphiti` | Memory L3 KG | Apache-2.0 | 3 | 26,098 | REINFORCES incumbent; SUSTAINED-MAINTENANCE; FalkorDB |
| 10 | `topoteretes/cognee` | Memory KG | Apache-2.0¹ | 3 | 17,244 | NEW capability (license correction); CREATES-WORKFLOW.b |
| 11 | `affaan-m/everything-claude-code` (ECC) | CC marketplace | MIT | 3 | 183,000 | Canonical orchestration skills (dmux + autonomous-agent-harness) |
| 12 | `microsoft/LLMLingua` | Token-opt | MIT | 3 | 6,200 | Pure NEW capability; STABLE-BURN-IN; complements context-mode |
| 13 | `shcherbak-ai/contextgem` | Token-opt | Apache-2.0 | 3 | 1,800 | Structured document extraction; ACTIVE band |
| 14 | `onyx-dot-app/onyx` | RAG-e2e | MIT | 4 | 29,400 | Production enterprise RAG; CE/EE split verify needed |
| 15 | `temporalio/temporal` | Workflow-engine | MIT | 4 | 20,100 | Durable execution; only workflow-engine survivor Probe 6+7 |
| 16 | `infiniflow/ragflow` | RAG-e2e | Apache-2.0 | 5 | 80,600 | Document-AI + RAG; biggest stars; heavy server-mode tax but high-value |

¹ Cognee license-correction: Apache-2.0 at HEAD `4ca1d0c2` (prior claude-sota audit confused with OpenViking AGPL — see §2.2).

### §6.2 STUDY-PILOT.b tier (5 repos — 5-clause demand-gate check before install)

| # | Repo | Cohort | Lic | Wire | 5-clause status |
|---|---|---|---|---:|---|
| 17 | `langchain-ai/langgraph` | Workflow/agent-orch | MIT | 4 | 275-org Axis-1; 5-clause: incumbent CC Agent tool overlap → 30d pilot for stateful long-horizon agent |
| 18 | `alirezarezvani/claude-skills` | CC marketplace | MIT | 3 | AUDIT_REPORT methodology; pilot for engineering/business-growth/c-level skill domains |
| 19 | `OpenSPG/KAG` | RAG/KG | Apache-2.0 | 4 | Logical-reasoning enhanced RAG; distinct from Graphiti+Cognee — dedicated pilot scope |
| 20 | `openlit/openlit` | Observability | Apache-2.0 | 3 | OTel-native instrumentation; pilot if OTel-native workflow surfaces |
| 21 | `obra/superpowers` (pinned subset) | CC vendored | MIT | 2 | 6-skill vendor subset per `team-orch-frameworks.md` — DEMOTED as full marketplace |

### §6.3 DEMOTED tier (6 repos — do NOT install standalone but may keep specific use)

| Repo | Cohort | Rationale |
|---|---|---|
| `mem0ai/mem0` | Memory | SUPERSEDED-BY mcp-memory+graphiti L1+L3 incumbents (star-count bait) |
| `crewAIInc/crewAI` | Agent-orch | SUPERSEDED-BY CC sub-agents/Agent tool; Probe 5 external-harness FAIL |
| `PrefectHQ/prefect` | Workflow-engine | SUPERSEDED-BY Temporal; no unique CC leverage |
| `lm-sys/RouteLLM` | Token-opt | SUPERSEDED-BY claude-code-router incumbent |
| `traceloop/openllmetry` | Observability | SUPERSEDED-BY openlit (both OTel-native — pick one) |
| `obra/superpowers` (full marketplace) | CC marketplace | DEMOTED — keep pinned 6-skill subset; do NOT add as unconstrained competing baseline |

¹ Cognee license-correction: Apache-2.0 at HEAD `4ca1d0c2` (prior claude-sota audit confused with OpenViking AGPL).

### §6.2 STUDY-PILOT.b tier (4 repos — 5-clause demand-gate check before install)

| # | Repo | Cohort | Lic | Wire | 5-clause status |
|---|---|---|---|---:|---|
| 13 | `langchain-ai/langgraph` | Workflow/agent-orch | MIT | 4 | 275-org Axis-1; 5-clause: incumbent CC Agent tool overlap → 30d pilot for stateful long-horizon agent |
| 14 | `alirezarezvani/claude-skills` | CC marketplace | MIT | 3 | AUDIT_REPORT methodology; pilot for engineering/business-growth/c-level skill domains |
| 15 | `OpenSPG/KAG` | RAG/KG | Apache-2.0 | 4 | Logical-reasoning enhanced RAG; distinct from Graphiti+Cognee — needs dedicated pilot scope |
| 16 | `obra/superpowers` (pinned subset) | CC vendored | MIT | 2 | 6-skill vendor subset per `team-orch-frameworks.md` (plan/debug/tdd/verification/subagent-driven/code-review) |

### §6.3 REJECT tier (12 repos — DO NOT install)

| Repo | Cohort | Primary blocker |
|---|---|---|
| `volcengine/OpenViking` | Memory | FAIL-LICENSE AGPL-3.0 + Probe 4 namespace duplicate |
| `letta-ai/letta` | Memory | ABSENCE-REJECT + Probe 5 server-mode collides with CC agent loop |
| `mem0ai/mem0` | Memory | DEMOTED — SUPERSEDED-BY-X; duplicates L1+L3 incumbents |
| `Arize-ai/phoenix` | Observability | FAIL-LICENSE ELv2 proprietary; SUPERSEDED-BY Langfuse |
| `crewAIInc/crewAI` | Agent-orch | Probe 5 FAIL external harness + SUPERSEDED-BY CC sub-agents |
| `VoltAgent/awesome-cc-subagents` | CC marketplace | SUPERSEDED-BY wshobson (keep as lookup-only catalog) |
| `Canner/WrenAI` | RAG-e2e | FAIL-LICENSE AGPL + ABSENCE-REJECT no SQL-RAG demand |
| `restatedev/restate` | Workflow-engine | FAIL-LICENSE BSL proprietary (license drift correction) |
| `inngest/inngest` | Workflow-engine | FAIL-LICENSE SSPL/DOSP proprietary |
| `hatchet-dev/hatchet` | Workflow-engine | SUPERSEDED + namespace duplicate |
| `PrefectHQ/prefect` | Workflow-engine | DEMOTED — namespace collision, no unique CC leverage |

## §7 REJECT-FOR-FIT cohort (DO NOT install)

| Repo | Reason | Reference |
|---|---|---|
| `volcengine/OpenViking` | AGPL-3.0 license blocker (FAIL-LICENSE Probe 6); duplicates L1+L3 already covered | §2.2 |
| `letta-ai/letta` | Server-mode operating model collides with CC agent loop (Probe 5 PARTIAL); ABSENCE-REJECT no demand for 3rd memory primitive | §2.2 |
| `mem0ai/mem0` | DEMOTED — Probe 4 namespace duplicate vs L1+L3; star-count bait | §2.2 |
| `Arize-ai/phoenix` | FAIL-LICENSE ELv2 proprietary masquerading as OSS; SUPERSEDED-BY Langfuse | §2.1 |
| `crewAIInc/crewAI` | Probe 5 FAIL external harness; SUPERSEDED-BY CC sub-agents/Agent tool | §2.1 |
| `VoltAgent/awesome-cc-subagents` (full) | SUPERSEDED-BY wshobson; keep as lookup-only catalog | §2.3 |

## §8 STUDY-PILOT.b cohort (5-clause demand-gate check before install)

| Repo | 5-clause check status | Next action |
|---|---|---|
| `langchain-ai/langgraph` | (1) named-use-case: stateful long-horizon agent / (2) input path: TBD / (3) wiring: LangChain Python SDK shim / (4) incumbent comparison: CC Agent tool already covers / (5) reversible time-box: 30d | RESEARCH demand before adopt |
| `alirezarezvani/claude-skills` | (1) engineering/business-growth/c-level skill domains beyond wshobson / (2) input path: marketplace.json adopt / (3) wiring: `/plugin install` after marketplace add / (4) incumbent: wshobson+addy + ECC core / (5) reversible: 30d | Conditional adopt for specific skill subsets only |

## §9 Wave 218 forward action (post-W217-F3 completion)

1. **Install playbook generation**: for each ADOPT-NOW row in §6, write Z:\claude-sota-pure install command + cite-anchor (CR-1) + post-install smoke probe + rollback predicate (CR-9)
2. **Resolve staleness queue §5**: P0+P1 license-verify + HEAD-SHA pin refresh via `mcp__github__get_file_contents` on marketplace.json + LICENSE
3. **Manifest population**: append to `Z:\claude-sota-pure\docs\sota-installed-manifest.md` + `docs\install-provenance.md`
4. **Smoke E2E**: per `cross-model-consensus.md` T1+T2+T3 lifecycle on each install commit
5. **Agent team E2E with advanced harness**: per user directive, demonstrate every-layer-unleashed performance via end-to-end fire across memory + RAG + orch + token-opt + plugin-marketplace layers
6. **Wait for W217-F3 cohorts §2.4-§2.7**: workflow-engines + RAG-e2e + observability-alts + token-opt-remaining + ACP before committing canonical-baseline ordering
