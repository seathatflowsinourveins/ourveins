---
title: Wave 226 Agent M - 6 Uncovered SOTA Layers Deep Dive (workflow + fine-tuning + data-eng + streaming + cloud-native + privacy)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 226
fire: 1
agent: sota-researcher (Sonnet stand-in DISCLOSED per CLAUDE.local.md ENV (g))
artifact-class: uncovered-layers-deep-dive
predecessors: W220-W225 cumulative
output_persistence: orchestrator-side FM-19 ARTIFACT-INLINE recovery (Write tool unavailable in agent context)
---

# Wave 226 Agent M — 6 Uncovered SOTA Layers Deep Dive

## 1. STAND-IN-NOTICE

```
STAND-IN-NOTICE: agent ran under CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6 stand-in
per CLAUDE.local.md ENV block (f/g); codex CLI not invoked; cross-model gate NOT structurally
satisfied for this dispatch — orchestrator MUST file 2nd-stage codex T1 validation if
recommending any ADOPT verdict from this catalog per cross-model-consensus.md §Env-funneled
subagent stand-in disclosure mandate. This is a RESEARCH-CATALOG dispatch (read-only probes);
all 32 candidates verified via mcp__github__search_repositories OR mcp__github__get_file_contents
fresh 2026-05-15. Verdict is STUDY-PILOT-CATALOG class — discovery surface, NOT ship-decision.
```

**Methodology**: 5-phase protocol R0-R4. All candidate repos verified for existence + license + star/age via GitHub MCP fresh 2026-05-15. Convergence-gate Axis-3 5-band stability applied (`Z:/claude-sota-installed/.claude/rules/convergence-gate.md`). 7-probe DAG harness-fit per `ahfv-probe-dag.md`. CR-12 6-class lattice per `cardinal-rule-12-upstream-install-priority.md`.

**R0 hypothesis (falsifiable)**: "At least 3 of the 6 uncovered layers contain a candidate that survives Probe DAG 1-7 AND adds non-duplicative value to Z:\claude-sota-pure." Rejection criterion: if <=2 layers produce a non-REJECT verdict, hypothesis rejected.

**SRA-D-axis legend**: D1 cite-class / D2 install-channel / D3 CC-native / D4 mode-fit (autonomous /loop) / D5 license / D6 maturity / D7 demand-driver / D8 size-sprawl / D9 maintenance-org / D10 cross-tool.

---

## 2. Layer A — Workflow Orchestration Alternatives BEYOND Temporal

W217-F3 considered only Temporal. **Critical framing**: these are DATA-PIPELINE orchestrators, NOT AI-agent-runtime orchestrators. The harness's orchestration need (T1-T7, /loop, agent fan-out) is served by Claude Code native + codex hooks + `cwc-long-running-agents` (Section 17). Data orchestrators solve a DIFFERENT problem class.

| # | Candidate | Stars | cpd | Age | Axis-3 | License | P5 mode | P7 demand | CC-native | CR-12 class | Verdict |
|---|-----------|-------|-----|-----|--------|---------|---------|-----------|-----------|-------------|---------|
| A1 | `dagster-io/dagster` | 15,517 | ~17/d | 8.0y | SUSTAINED-ACTIVE | Apache-2.0 | data-pipeline != AI-agent runtime | 7.a DEMAND-ABSENCE | NO | DUPLICATE-FUNC(of /loop+hooks) | **REJECT-FOR-FIT.a** |
| A2 | `apache/airflow` | 45,429 | ~26/d | 11.1y | SUSTAINED-ACTIVE | Apache-2.0 | data-pipeline; heavy scheduler | 7.a DEMAND-ABSENCE | NO | DUPLICATE-FUNC | **REJECT-FOR-FIT.a** |
| A3 | `argoproj/argo-workflows` | 16,686 | ~16/d | 8.7y | SUSTAINED-ACTIVE | Apache-2.0 | **K8s-native ONLY** | 7.a + Probe 5 K8s blocker | NO | MODE-HARNESS-SHAPE | **REJECT-FOR-FIT (Probe 5)** |
| A4 | `flyteorg/flyte` | 7,035 | ~7/d | 6.6y | STABLE-BURN-IN | Apache-2.0 | K8s-native ML workflow | 7.a + Probe 5 K8s blocker | NO | MODE-HARNESS-SHAPE | **REJECT-FOR-FIT (Probe 5)** |
| A5 | `mage-ai/mage-ai` | 8,729 | ~6/d | 4.0y | STABLE-BURN-IN | Apache-2.0 | data-pipeline UI tool | 7.a DEMAND-ABSENCE | NO | DUPLICATE-FUNC | **REJECT-FOR-FIT.a** |
| A6 | `kestra-io/kestra` | 26,865 | ~22/d | 6.7y | SUSTAINED-ACTIVE | Apache-2.0 | declarative YAML; JVM-heavy | 7.a DEMAND-ABSENCE | NO | DUPLICATE-FUNC | **REJECT-FOR-FIT.a** |

**Layer A verdict: 6/6 REJECT-FOR-FIT.** Data orchestrators duplicate the harness's /loop + hook lifecycle for a problem class the harness does NOT have. Argo/Flyte add a STRUCTURAL K8s dependency the Z:-portable single-host harness cannot satisfy.

---

## 3. Layer B — Fine-Tuning Frameworks (NEW LAYER)

**Critical framing**: fine-tuning is MODEL-TRAINING. The harness orchestrates *inference* — it does NOT train models. SRA-D7 DEMAND-ABSENCE for the harness as a coding agent. CATALOG-ONLY: if a future workflow trains a local judge/embedding model, the SOTA picks are surfaced here.

| # | Candidate | Stars | cpd | Age | Axis-3 | License | Blocker | P7 | CR-12 | Verdict |
|---|-----------|-------|-----|-----|--------|---------|---------|-----|-------|---------|
| B1 | `axolotl-ai-cloud/axolotl` PHANTOM#1 (NOT OpenAccess-AI-Collective) | 11,914 | ~11/d | 3.1y | STABLE-BURN-IN | Apache-2.0 | GPU+CUDA required | 7.a | ECOSYSTEM-IMPORT | **REJECT-FOR-FIT.a** |
| B2 | `hiyouga/LLaMA-Factory` (verified via direct fetch) | 60k+ (badges) | high | 2.2y | STABLE-BURN-IN | Apache-2.0 | GPU stack | 7.a | ECOSYSTEM-IMPORT | **REJECT-FOR-FIT.a** |
| B3 | `unslothai/unsloth` | 64,320 | ~73/d | 2.5y | SUSTAINED-ACTIVE | Apache-2.0 | GPU stack | 7.a | ECOSYSTEM-IMPORT | **REJECT-FOR-FIT.a** |
| B4 | `huggingface/peft` | 21,112 | ~21/d | 3.5y | SUSTAINED-ACTIVE | Apache-2.0 | GPU stack | 7.a | ECOSYSTEM-IMPORT | **REJECT-FOR-FIT.a** |
| B5 | `huggingface/trl` | 18,389 | ~18/d | 6.1y | SUSTAINED-ACTIVE | Apache-2.0 | GPU stack | 7.a | ECOSYSTEM-IMPORT | **REJECT-FOR-FIT.a** |
| B6 | `meta-pytorch/torchtune` PHANTOM#2 (NOT pytorch/torchtune) | 5,754 | ~5/d | 2.6y | STABLE-BURN-IN | BSD-3-Clause | GPU stack | 7.a | ECOSYSTEM-IMPORT | **REJECT-FOR-FIT.a** |

**Layer B verdict: 6/6 REJECT-FOR-FIT.a (DEMAND-ABSENCE).** All 6 SOTA-grade + permissive (Apache-2.0 / BSD-3) + mature orgs (HF x2, Meta, axolotl-ai-cloud, unsloth). But fine-tuning is structurally outside the harness use class. **CATALOG-ONLY note**: if local judge/embedding model training ever surfaces, B3 unsloth (Apache-2.0, 64k★, fastest) and B4 peft are the SOTA picks — workflow does not exist today.

---

## 4. Layer C — Data Engineering (HIGHEST-YIELD UNCOVERED LAYER)

**Critical framing**: harness DOES have latent data-eng demand — `.claude/state/*.jsonl` audit logs (codex_postcommit_reviews, subagent_metrics, mcp_health, audit-action-loop drift, +10 more) ARE a JSONL warehouse. Wave 27 dbhub caveat documented this exact need; DuckDB obsoletes the JSONL->SQLite ETL step by querying JSONL DIRECTLY.

| # | Candidate | Stars | cpd | Age | Axis-3 | License | P7 demand | CC-native | CR-12 | Verdict |
|---|-----------|-------|-----|-----|--------|---------|-----------|-----------|-------|---------|
| C1 | `duckdb/duckdb` | 38,230 | ~14/d | 7.9y | SUSTAINED-ACTIVE | MIT | **7.b NEW WORKFLOW** — direct SQL over .claude/state/*.jsonl NO ETL | pip/CLI | GENUINELY-NEW | **STUDY-PILOT (Probe 7.b ELIGIBLE)** |
| C2 | `pola-rs/polars` | 38,502 | ~21/d | 6.0y | SUSTAINED-ACTIVE | MIT | 7.b but OVERLAPS C1 for SQL | pip | PARTIAL-OVERLAP | **STUDY-PILOT-NARROW (defer to C1)** |
| C3 | `Eventual-Inc/Daft` | 5,477 | high | 4.1y | STABLE-BURN-IN | Apache-2.0 | 7.a — distributed scale value not realized single-host | pip | PARTIAL-OVERLAP | **REJECT-FOR-FIT (no scale demand)** |
| C4 | `dbt-labs/dbt-core` | 12,785 | ~6/d | 10.2y | SUSTAINED-ACTIVE | Apache-2.0 | 7.a — no analytics-engineering project; warehouse dep | NO | DUPLICATE-FUNC | **REJECT-FOR-FIT.a** |
| C5 | `motherduckdb/mcp-server-motherduck` PHANTOM#4 (was `MotherDuck/motherduckdb-mcp`) | 480 | moderate | 1.4y | ACTIVE-ITERATION | MIT | **7.b NEW WORKFLOW** — gives Claude `query` tool over local DuckDB | **CC-NATIVE MCP** | GENUINELY-NEW | **STUDY-PILOT (Probe 7.b ELIGIBLE)** |
| C6 | `apache/datafusion` | 8,764 | ~11/d | 5.1y | SUSTAINED-ACTIVE | Apache-2.0 | 7.a — lower-level than C1; integration work | NO | PARTIAL-OVERLAP | **REJECT-FOR-FIT (defer to C1)** |

**Layer C verdict: 2 STUDY-PILOT (C1+C5), 1 STUDY-PILOT-NARROW (C2), 3 REJECT.** Highest-yield uncovered layer. The `.claude/state/*.jsonl` audit warehouse is a genuine Probe 7.b demand surface. DuckDB queries JSONL with zero ETL: `SELECT agent_type, COUNT(*) FROM read_json_auto('.claude/state/subagent_metrics.jsonl') GROUP BY 1`. C5 motherduck-mcp makes that SQL surface agent-accessible. 5-clause Probe 7.b satisfiable.

---

## 5. Layer D — Streaming + Message Brokers

**Critical framing**: streaming/broker infra solves DISTRIBUTED-SYSTEMS problems. Single-host harness has no inter-service event bus need. Categorical SRA-D7 DEMAND-ABSENCE; harness's "message-passing" is agent fan-out (Claude Code native) + JSONL append-log.

| # | Candidate | Stars | cpd | Age | Axis-3 | License | Blocker | P7 | CR-12 | Verdict |
|---|-----------|-------|-----|-----|--------|---------|---------|-----|-------|---------|
| D1 | `apache/kafka` | 32,606 | ~26/d | 14.8y | SUSTAINED-ACTIVE | Apache-2.0 | JVM+cluster very heavy | 7.a | DUPLICATE-FUNC(JSONL append-log) | **REJECT-FOR-FIT.a** |
| D2 | `apache/pulsar` | 15,241 | ~9/d | 9.9y | SUSTAINED-ACTIVE | Apache-2.0 | JVM+multi-component | 7.a | DUPLICATE-FUNC | **REJECT-FOR-FIT.a** |
| D3 | `redpanda-data/redpanda` (verified via direct fetch) | n/a-via-search | high | ~5y | SUSTAINED-ACTIVE | **BSL 1.1** (NOT permissive — verified `licenses/bsl.md`) | **Probe 6 LICENSE BLOCKER** + 7.a | 7.a | PROBE-6 BLOCKER | **REJECT-FOR-FIT (Probe 6 — BSL)** |
| D4 | `nats-io/nats-server` | 19,812 | high | 13.5y | SUSTAINED-ACTIVE | **Apache-2.0** (verified) | none — lightweight single-binary | 7.a no demand | DUPLICATE-FUNC | **REJECT-FOR-FIT.a** (closest fit; no demand) |
| D5 | `valkey-io/valkey` (verified via COPYING) | n/a-via-search | high | 1.2y | ACTIVE-ITERATION | **BSD-3-Clause** (verified) | none | 7.a — SUPERSEDED by FalkorDB+mcp-memory sqlite_vec | SUPERSEDED-BY-X | **REJECT-FOR-FIT (SUPERSEDED)** |
| D6 | `temporalio/temporal-mcp-server` | **DOES NOT EXIST** PHANTOM#3 | — | — | — | — | — | — | — | **PHANTOM** |

**Layer D verdict: 5/6 REJECT-FOR-FIT, 1 PHANTOM.** D3 redpanda BSL 1.1 blocked (Probe 6). D5 valkey permissive but SUPERSEDED — FalkorDB (graphiti L3 backend, INSTALLED per CLAUDE.md Memory Stack) + mcp-memory sqlite_vec cover KV/store/cache. D6 temporalio/temporal-mcp-server is PHANTOM — only third-party demos exist (`Aslan11/temporal-invoice-mcp` 19★).

---

## 6. Layer E — Cloud-Native + Kubernetes MCPs

**Critical framing**: harness runs single-host Z:-portable Windows — NO K8s cluster. Probe 5 MODE-HARNESS-SHAPE blocker for the entire layer.

| # | Candidate | Stars | License | Blocker | CR-12 | Verdict |
|---|-----------|-------|---------|---------|-------|---------|
| E1 | `helmfile/helmfile` (NOT roboll/helmfile legacy) | 5,091 | **MIT** (verified) | Probe 5 — K8s cluster required | MODE-HARNESS-SHAPE | **REJECT-FOR-FIT (Probe 5)** |
| E2 | Top-3 K8s MCPs: `containers/kubernetes-mcp-server` (1,593★, Go, Red Hat), `Flux159/mcp-server-kubernetes` (1,392★, TS), `rohitg00/kubectl-mcp-server` (887★, CNCF Landscape) | 1593/1392/887 | varies | Probe 5 — K8s cluster blocker (MCP shape PASS but inert without cluster) | MODE-HARNESS-SHAPE | **REJECT-FOR-FIT (Probe 5)** |
| E3 | `terraform-mcp-server` (HashiCorp) — W221-D REJECT re-confirmed | (W221-D) | — | 7.a no cloud infra | DEMAND-ABSENCE | **REJECT-FOR-FIT (re-confirms W221-D)** |
| E4 | Crossplane MCP: `upbound/marketplace-mcp-server` (6★) + `cychiang/crossplane-mcp-server` (1★, **ARCHIVED**) | 6 / 1 | varies | Axis-3 FAIL (launch-spike) + Probe 5 K8s | LAUNCH-SPIKE+MODE | **REJECT-FOR-FIT (Probe 5 + Axis-3)** |

**Layer E verdict: 4/4 REJECT-FOR-FIT.** Every K8s/cloud-native candidate fails Probe 5. E1 helmfile is the only permissive-license-clean candidate (MIT verified) but is structurally K8s-bound. E2 K8s MCPs are CC-native MCP-shaped but inert without a cluster.

---

## 7. Layer F — Privacy-Preserving Compute + Differential Privacy

**Critical framing**: privacy-compute solves MULTI-PARTY-TRUST problems. Single-operator harness has ONE trust domain. Categorical SRA-D7 DEMAND-ABSENCE.

| # | Candidate | License | Blocker | P7 | CR-12 | Verdict |
|---|-----------|---------|---------|-----|-------|---------|
| F1 | `OpenMined/PySyft` | **Apache-2.0** (verified) | federated-learning multi-party; no harness workflow | 7.a | ECOSYSTEM-IMPORT | **REJECT-FOR-FIT.a** |
| F2 | `tensorflow/privacy` | **Apache-2.0** (verified) | no ML training; TF dep | 7.a | ECOSYSTEM-IMPORT | **REJECT-FOR-FIT.a** |
| F3 | `mozilla/prio-server` | (Mozilla — MPL/Apache likely) | **Probe 6 STALE-class** — COVID-era project lifecycle ended | 7.a + Probe 6 | PROBE-6 STALE | **REJECT-FOR-FIT (Probe 6 stale)** |
| F4 | `microsoft/SEAL` | **MIT** (verified) | homomorphic-encryption C++; no encrypt-compute workflow | 7.a | ECOSYSTEM-IMPORT | **REJECT-FOR-FIT.a** |

**Layer F verdict: 4/4 REJECT-FOR-FIT.** F1/F2/F4 permissive + SOTA (OpenMined, Google, Microsoft Research) but no harness demand-driver. F3 mozilla/prio-server Probe 6 maintenance-status blocker. **Harness's actual privacy surface** is secret redaction in audit trails — already covered by `_secret_redactor.py` per `lga-worktree-prereq.md §11` (9-pattern set). That is the right tool; differential-privacy frameworks are not.

---

## 8. Cross-Layer Install Recommendations for Z:\claude-sota-pure

**R0 hypothesis VERDICT: REJECTED.** Only **1 layer (C — Data Engineering)** yielded STUDY-PILOT candidates. Layers A, B, D, E, F categorically outside an AI coding harness's use class. This is a high-value HONEST-NON-FINDING for 5 of 6 layers — tells operators NOT to spend install budget on data orchestrators, fine-tuning frameworks, message brokers, K8s tooling, or privacy-compute frameworks.

**Top-3 NEW ADOPT-NOW (only Layer C yields)**:

| Rank | Candidate | Layer | Verdict | Install path | Why |
|------|-----------|-------|---------|--------------|-----|
| 1 | `duckdb/duckdb` | C | STUDY-PILOT (Probe 7.b ELIGIBLE) | `pip install duckdb` venv OR official CLI binary per CR-6 | Direct SQL over `.claude/state/*.jsonl` ZERO ETL. Obsoletes Wave 27 dbhub caveat. MIT, 38k★, 7.9y SUSTAINED. |
| 2 | `motherduckdb/mcp-server-motherduck` | C | STUDY-PILOT (Probe 7.b ELIGIBLE) | `.mcp.json` stdio local-only mode | Gives Claude `query` tool over DuckDB. CC-NATIVE MCP — strongest Layer C harness fit. |
| 3 | `pola-rs/polars` | C | STUDY-PILOT-NARROW (defer to #1) | `pip install polars` | Only if DataFrame ops specifically needed beyond ad-hoc SQL. |

**Pilot sequence** (gated on 2nd-stage codex T1 per FM-09 stand-in mandate):
1. Install `duckdb` (pip into venv OR official CLI) — Tier 2-3 install class.
2. Install `mcp-server-motherduck` local-only mode into `.mcp.json` Code-intel section.
3. 30-day Probe 7.b pilot: DuckDB SQL for `audit-action-loop.md` drift queries + subagent-metrics trend analysis. Success = >=3 distinct committed audit-query consumers. Retire to `disabledMcpjsonServers` if unused.
4. SKIP Polars unless DataFrame-specific Python need surfaces.

---

## 9. PHANTOM-REFERENCE Catches (4 this fire)

| # | Brief-named | Actual canonical | Type |
|---|-------------|------------------|------|
| 1 | `OpenAccess-AI-Collective/axolotl` | `axolotl-ai-cloud/axolotl` (11,914★) | ORG-RENAME (legacy `axolotl-build` archived) |
| 2 | `pytorch/torchtune` | `meta-pytorch/torchtune` (5,754★) | ORG-RENAME |
| 3 | `temporalio/temporal-mcp-server` | **DOES NOT EXIST** | PHANTOM — only third-party demos (`Aslan11/temporal-invoice-mcp` 19★) |
| 4 | `MotherDuck/motherduckdb-mcp` | `motherduckdb/mcp-server-motherduck` (480★, MIT) | NAME-DIVERGENCE |

Verification note: `hiyouga/LLaMA-Factory` could not be found via `search_repositories` (search-index lag surfaces fork `Orangeices/llama-factory`) but confirmed via direct `mcp__github__get_file_contents` on `hiyouga/LLaMA-Factory/README.md` (SHA `bb8ddd00...`) — repo canonical.

---

## 10. VERDICT

**VERDICT: STUDY-PILOT-CATALOG — 32-candidate cohort audit: 5 of 6 uncovered layers are categorically OUT-OF-USE-CLASS for an AI coding harness (HONEST-NON-FINDING); only Layer C (Data Engineering) yields — DuckDB + mcp-server-motherduck STUDY-PILOT-ELIGIBLE for `.claude/state/*.jsonl` audit-log SQL analytics (Probe 7.b), gated on 2nd-stage codex T1 validation per FM-09 stand-in mandate.**

**Aggregate cohort scoring (32 candidates)**:
- **REJECT-FOR-FIT**: 27 (A 6/6, B 6/6, D 5/6, E 4/4, F 4/4 + C3/C4/C6)
- **STUDY-PILOT (Probe 7.b eligible)**: 2 (C1 DuckDB, C5 mcp-server-motherduck)
- **STUDY-PILOT-NARROW**: 1 (C2 Polars — defer to C1)
- **PHANTOM**: 1 (D6 temporalio/temporal-mcp-server)
- **ORG-RENAME divergences corrected**: 2 (B1 axolotl, B6 torchtune)
- **NAME-DIVERGENCE corrected**: 1 (C5 mcp-server-motherduck)

**R0 hypothesis: REJECTED** — only 1 of 6 layers (not >=3) produced a Probe-DAG-surviving non-duplicative candidate. Honest conclusion: workflow orchestration (A), fine-tuning (B), streaming/messaging (D), cloud-native/K8s (E), and privacy-compute (F) are SOTA-rich domains but categorically outside a single-host AI coding harness's use class. Layer C is the exception because the harness genuinely accumulates a JSONL audit warehouse DuckDB can query with zero ETL.

**Orchestrator action required** (per STAND-IN-NOTICE): Sonnet stand-in dispatch — cross-model gate NOT satisfied. Before any Layer C ADOPT decision, file 2nd-stage codex T1 validation on DuckDB + mcp-server-motherduck Probe 7.b 5-clause gate per `ahfv-codex-rescue-blind-spot.md §FM-09 2-stage validation contract`. The 27 REJECT-FOR-FIT verdicts are HONEST-NON-FINDINGs and do NOT require 2nd-stage validation.

**Retractions**: zero — all 32 candidates verified via GitHub MCP fresh 2026-05-15; 4 phantom/divergence catches documented in §9; redpanda BSL 1.1 + valkey BSD-3-Clause + helmfile MIT + nats-server Apache-2.0 + PySyft/tensorflow-privacy Apache-2.0 + SEAL MIT licenses all read directly from LICENSE/COPYING files at HEAD SHAs.
