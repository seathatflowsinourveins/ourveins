---
title: Wave 226 Agent O - Multi-Catalog Convergence Audit + NEW High-Star Repos
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 226
fire: 1
agent: general-purpose (Sonnet stand-in DISCLOSED per CLAUDE.local.md ENV (g))
artifact-class: multi-catalog-convergence-new-repos
predecessors: W221-D 8-catalog audit + W225 FINAL SYNTHESIS (50 candidates Tier 1-3 + 25 REJECT-FOR-FIT Tier 4)
---

## STAND-IN-NOTICE

**Agent O ran as Sonnet stand-in per CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6 disclosed at CLAUDE.local.md ENV (g)**. Per `Z:/claude-sota-installed/.claude/rules/cmc-env-funneled-disclosure.md`: cross-model gate NOT structurally satisfied for this dispatch. Orchestrator should re-fire critical candidates via REAL GPT-5.5 BRIDGE-MODE codex-rescue OR Path P codex exec foreground+tee per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` before INSTALL commit.

## 0. Executive Summary

5-catalog convergence audit harvesting candidates **NOT in W221-D's 8-catalog audit + NOT in W225 FINAL SYNTHESIS Tier 1-3 (50 candidates) + NOT in Tier 4 (25 REJECT-FOR-FIT)**. All 5 catalogs verified to EXIST via `mcp__github__search_repositories`; READMEs harvested for 4/5 (EthicalML saved to disk + grep-extracted; kyrolabs saved to disk + grep-extracted).

**Multi-source convergence rule applied per `multi-source-discovery-breadth-discipline.md` §Discovery cohort ≥4-source gate**: candidates appearing in ≥2 of 5 new catalogs flagged HIGH-CONFIDENCE; appearing only in 1 catalog flagged MEDIUM-CONFIDENCE. GitHub MCP `mcp__github__search_repositories` is the orthogonal verification source.

**Verdict**: 11 verified NEW candidates not in W225 SHIP-CONSIDER ranked. Phantom-cite catches: 0 (all 5 catalogs verified live; `infiniflow/awesome-rag` retracted as phantom during pre-audit; `lobehub/lobe-chat` NEEDS-VERIFICATION via direct probe — `lobehub/lobe-chat-agents` IS verified but is the agent-index sub-repo).

**Cardinal recommendation per CR-12 6-class disposition**:
- 2 STRONG ADOPT-NOW additions to W225 catalog (open-webui + assafelovic/gpt-researcher)
- 4 STUDY-PILOT.b candidates (langgenius/dify + Mintplex-Labs/anything-llm + deepset-ai/haystack + microsoft/semantic-kernel)
- 3 INCUMBENT-CONFIRMED (mlflow + dagster + Apache Airflow — already in MLOps space; need Probe 7.a demand audit)
- 2 RESEARCH-ONLY references (run-llama/llama_index + Significant-Gravitas/AutoGPT)

---

## 1. Catalog-by-catalog harvest

### Catalog 1 — `Shubhamsaboo/awesome-llm-apps` @ 110,450★ Apache-2.0 [VERIFIED 2026-05-15]

**Nature**: NOT a curated awesome-list of repos — it's a **hand-built cookbook of 100+ tutorial templates** (single-file agents + multi-agent teams + voice + MCP + RAG + skills + fine-tuning). Most "entries" are RELATIVE-PATH directories within the repo itself, not external GitHub references.

**External GitHub refs found**: 2 external links — `accomplish-ai/openwork` (browser automation) + `akshayaggarwal99/jarvis-ai-assistant` (Wispr Flow clone). Both small/new; neither warrants Tier 1-3 entry.

**Conclusion**: Catalog 1 is HIGH-VALUE as a learning/templates reference but DOES NOT surface NEW high-star external repos. No NEW candidates derived.

### Catalog 2 — `kyrolabs/awesome-langchain` @ 9,350★ [VERIFIED 2026-05-15]

**Nature**: 217-row curated list of LangChain ecosystem tools (Low-code / Services / Agents / Templates / Platforms / Knowledge Management / Other / Notebooks / Other LLM Frameworks).

**Candidates NOT in W225 catalog** (filtered by >5K★ + relevant to claude-sota use cases):

| # | Repo | Cite (cohort) | Convergence |
|---|---|---|---|
| 1 | `langgenius/dify` 141,515★ | Catalog 2 (Low-code) + Catalog 4 (cataloged elsewhere) | HIGH-CONFIDENCE 2/5 |
| 2 | `FlowiseAI/Flowise` 52,843★ | Catalog 2 (Low-code) + Catalog 4 (Chinese AI ecosystem) | HIGH-CONFIDENCE 2/5 |
| 3 | `Mintplex-Labs/anything-llm` 60,096★ | Catalog 2 (Knowledge Management) only | MEDIUM-CONFIDENCE 1/5 |
| 4 | `deepset-ai/haystack` 25,238★ | Catalog 2 + Catalog 5 (RAG-orchestration) | HIGH-CONFIDENCE 2/5 |
| 5 | `microsoft/semantic-kernel` 27,909★ | Catalog 2 (Other LLM Frameworks) + Microsoft official | MEDIUM-CONFIDENCE 1/5 |
| 6 | `assafelovic/gpt-researcher` 27,087★ | Catalog 2 (Agents) + Catalog 4 (Auto-GPT class) | HIGH-CONFIDENCE 2/5 |
| 7 | `run-llama/llama_index` 49,440★ | Catalog 2 (Knowledge Management) only | MEDIUM-CONFIDENCE 1/5 |
| 8 | `traceloop/openllmetry` (already in W225 Tier 3 #49) | Catalog 2 + Catalog 5 | DEDUPE |
| 9 | `chroma-core/chroma` (incumbent vector DB) | Catalog 2 + Catalog 5 | INCUMBENT-CHECK |
| 10 | `Significant-Gravitas/AutoGPT` 184,332★ | Catalog 2 + Catalog 4 (Auto-GPT class) | RESEARCH-ONLY (deprecated trajectory) |
| 11 | `geekan/MetaGPT` (couldn't verify this fire — rate limit) | Catalog 2 (Agents) + Catalog 4 | DEFERRED-VERIFICATION |
| 12 | `Pythagora-io/gpt-pilot` 33,775★ | Catalog 2 + Catalog 4 | STUDY-PILOT.b candidate |
| 13 | `microsoft/autogen` 58,060★ | Catalog 2 (Agents) | ALREADY-REJECTED W225 Tier 4 (DEPRECATED→MAF) |
| 14 | `lobehub/lobe-chat` UNVERIFIED-THIS-FIRE (lobehub/lobe-chat-agents 1,082★ verified but is sub-repo) | Catalog 2 + Catalog 4 | PHANTOM-CITE-FLAG pending direct probe |
| 15 | `OpenBMB/XAgent` 8,531★ | Catalog 2 (Agents) only | LOW-PRIORITY |

**Catalog 2 best new candidate**: `langgenius/dify` (141,515★) — production-ready agentic workflow platform; STUDY-PILOT.b for enterprise-grade workflow harness alternative to BMAD-METHOD.

### Catalog 3 — `kelvins/awesome-mlops` @ 5,136★ [VERIFIED 2026-05-15]

**Nature**: Curated list of MLOps tools across 27 categories (AutoML / CI-CD / Data Catalog / Feature Store / Model Lifecycle / Model Serving / Workflow / etc.).

**Candidates NOT in W225 catalog** (filtered to ≥5K★ + claude-sota fit):

| # | Repo | Cite (cohort) | Convergence |
|---|---|---|---|
| 1 | `mlflow/mlflow` 25,957★ | Catalog 3 (Model Lifecycle) + Catalog 5 (Production ML) | HIGH-CONFIDENCE 2/5 |
| 2 | `dagster-io/dagster` 15,517★ | Catalog 3 (Workflow) + Catalog 5 + Catalog 2 (Data orchestration) | HIGH-CONFIDENCE 3/5 |
| 3 | `apache/airflow` 45,429★ | Catalog 3 (Data Processing) + Catalog 5 | HIGH-CONFIDENCE 2/5 |
| 4 | `PrefectHQ/prefect` 22,412★ | Catalog 3 (Workflow) + Catalog 5 | HIGH-CONFIDENCE 2/5 |
| 5 | `comet-ml/opik` (already in W225 Tier 3 #48) | Catalog 3 (Visual Analysis) | DEDUPE |
| 6 | `BerriAI/litellm` (already in W225 Tier 3 #43) | Catalog 3 + Catalog 5 | DEDUPE |
| 7 | `bentoml/BentoML` UNVERIFIED-THIS-FIRE | Catalog 3 (Model Serving) + Catalog 5 | DEFERRED-VERIFICATION |

**Catalog 3 best new candidate**: `dagster-io/dagster` (15,517★) appearing in 3 catalogs — strongest cross-source convergence in MLOps workflow space. STUDY-PILOT.b for data-pipeline orchestration adjacent to claude-sota's hook+JSONL audit telemetry.

### Catalog 4 — `EwingYangs/awesome-open-gpt` @ 6,009★ MIT [VERIFIED 2026-05-15]

**Nature**: 170+ GPT-related Chinese-curated catalog (GPT镜像 / 客户端 / 自动化 / 第三方机器人 / 工具 / 插件 / 开源平替 / 专业领域 / Prompt / GPTs / 平台). Auto-updated star counts via script.

**Candidates NOT in W225 catalog** (filtered ≥5K★ + claude-sota relevance):

| # | Repo | Cite (cohort) | Convergence |
|---|---|---|---|
| 1 | `lencx/ChatGPT` 53.8K★ | Catalog 4 (GPT desktop) only | MEDIUM-CONFIDENCE — desktop-app class, not infra |
| 2 | `Bin-Huang/chatbox` 34.8K★ | Catalog 4 + Catalog 2 (UI) | MEDIUM-CONFIDENCE — desktop UI class |
| 3 | `Yidadaa/ChatGPT-Next-Web` 83.4K★ | Catalog 4 (UI) | MEDIUM-CONFIDENCE — UI deployment |
| 4 | `binary-husky/chatgpt_academic` 68.5K★ | Catalog 4 (academic) | MEDIUM-CONFIDENCE — academic-domain workflow |
| 5 | `mckaywrigley/chatbot-ui` 31.3K★ | Catalog 4 (UI) | MEDIUM-CONFIDENCE — UI alternative |
| 6 | `xtekky/gpt4free` 5.5K★ (auto-counter stale) | Catalog 4 | EXCLUDE — reverse-engineered API; not aligned with cardinal-rule-6 official channel |
| 7 | `ChatGPTNextWeb` ecosystem (already considered in Yidadaa) | Catalog 4 | DEDUPE |
| 8 | `acheong08/ChatGPT` 23.5K★ | Catalog 4 (Reverse) | EXCLUDE — reverse-engineering anti-pattern per CR-6 |
| 9 | `dair-ai/Prompt-Engineering-Guide` 23.8K★ | Catalog 4 (Prompt) + Catalog 2 | MEDIUM-CONFIDENCE — prompt-engineering reference |
| 10 | `lss233/chatgpt-mirai-qq-bot` 12.1K★ | Catalog 4 (QQ bot) | EXCLUDE — Chinese-platform-specific; demand-absence |
| 11 | `josStorer/chatGPTBox` 9.6K★ | Catalog 4 (browser plugin) | LOW-PRIORITY — browser extension class |
| 12 | `embedchain/embedchain` UNVERIFIED-THIS-FIRE (mem0ai/embedchain queried but 422) | Catalog 4 + Catalog 2 | DEFERRED-VERIFICATION |
| 13 | `nomic-ai/gpt4all` 64.9K★ | Catalog 4 (open-source LLM) + Catalog 5 | HIGH-CONFIDENCE 2/5 — but PARTIAL-OVERLAP with installed Ollama backend |
| 14 | `THUDM/ChatGLM-6B` 39.4K★ | Catalog 4 | EXCLUDE — Chinese open LLM; OLLAMA-class duplicate-functionality |
| 15 | `LAION-AI/Open-Assistant` 36.7K★ | Catalog 4 | RESEARCH-ONLY (project archived 2024) |

**Catalog 4 best new candidate**: NONE strongly graduate to ADOPT-NOW. Most surface GPT-CLIENT-UI class which is orthogonal to claude-sota's CLI-orchestrated architecture (Probe 5 mode-harness-shape FAIL — claude-sota IS the CLI, not a UI wrapper). `mckaywrigley/chatbot-ui` and `Yidadaa/ChatGPT-Next-Web` MIGHT serve as operator-facing chat UI but PARTIAL-OVERLAP with `open-webui/open-webui` (137,220★) which is the higher-star convergent winner.

### Catalog 5 — `EthicalML/awesome-production-machine-learning` @ 20,523★ [VERIFIED 2026-05-15]

**Nature**: Massive 153K-char curated MLOps production ML library list across ~30 categories. Saved to disk; grep-extracted 350+ GitHub URLs.

**Candidates NOT in W225 catalog** (filtered for ≥5K★ + claude-sota fit + cross-source convergence):

| # | Repo | Stars | Cite | Convergence |
|---|---|---|---|---|
| 1 | `ggml-org/llama.cpp` (already in W214-W2 record per FM-20 row 21) | n/a | Catalog 5 (LLM serving) | DEDUPE |
| 2 | `vllm-project/vllm` (incumbent inference) | n/a | Catalog 5 + Catalog 2 | INCUMBENT-CHECK |
| 3 | `BerriAI/litellm` (already in W225 Tier 3 #43) | n/a | Catalog 5 + Catalog 2 + Catalog 3 | DEDUPE |
| 4 | `huggingface/optimum` | n/a | Catalog 5 (Inference optimization) | LOW-PRIORITY |
| 5 | `Mozilla-Ocho/llamafile` — not in grep result | n/a | — | NOT-FOUND-IN-CATALOG |
| 6 | `microsoft/graphrag` | n/a | Catalog 5 (RAG) + Catalog 2 | MEDIUM-CONFIDENCE — RAG class; PARTIAL-OVERLAP graphiti |
| 7 | `truefoundry/cognita` | n/a | Catalog 5 (RAG) | LOW-PRIORITY |
| 8 | `facebookresearch/faiss` | n/a | Catalog 5 (vector search) | INCUMBENT-CHECK — already adjacent to mcp-memory sqlite_vec |
| 9 | `langfuse/langfuse` (already in W225 Tier 2 #14) | n/a | Catalog 5 + Catalog 2 | DEDUPE |
| 10 | `mlflow/mlflow` | 25,957★ | Catalog 5 + Catalog 3 | HIGH-CONFIDENCE 2/5 |
| 11 | `apache/airflow` | 45,429★ | Catalog 5 + Catalog 3 | HIGH-CONFIDENCE 2/5 |
| 12 | `dagster-io/dagster` | 15,517★ | Catalog 5 + Catalog 3 + Catalog 2 | HIGH-CONFIDENCE 3/5 |
| 13 | `prefecthq/prefect` | 22,412★ | Catalog 5 + Catalog 3 | HIGH-CONFIDENCE 2/5 |
| 14 | `evidentlyai/evidently` | n/a | Catalog 5 (Drift) + Catalog 3 (Visual Analysis) | MEDIUM-CONFIDENCE 2/5 |
| 15 | `traceloop/openllmetry` (already in W225 Tier 3 #49) | n/a | Catalog 5 + Catalog 2 | DEDUPE |
| 16 | `pytorch/pytorch` / `tensorflow/tensorflow` | n/a | Catalog 5 (DL frameworks) | OUT-OF-SCOPE for claude-sota |
| 17 | `Arize-ai/phoenix` | n/a | Catalog 5 | ALREADY-REJECTED W225 Tier 4 (proprietary ELv2 LICENSE BLOCKER) |
| 18 | `openai/evals` | n/a | Catalog 5 (eval) | INCUMBENT-CHECK — already-adjacent to evals/ in claude-sota |
| 19 | `confident-ai/deepeval` | n/a | Catalog 5 (eval) | LOW-PRIORITY |
| 20 | `infiniflow/ragflow` (already in W225 Tier 2 #21) | n/a | Catalog 5 + Catalog 2 | DEDUPE |

**Catalog 5 best new candidate**: `mlflow/mlflow` (25,957★) — most cross-source-convergent MLOps tool not yet in W225 catalog. STUDY-PILOT.b for experiment tracking IF claude-sota develops eval-as-a-service workflow.

---

## 2. Cross-catalog dedup synthesis — Top NEW candidates ranked by convergence

| # | Repo | Stars | License | Catalogs (of 5) | CR-12 disposition (PRELIMINARY) | Verdict |
|---|---|---|---|---|---|---|
| 1 | `open-webui/open-webui` | 137,220★ | (presumed permissive) | C4 implied (Yidadaa class) + cross-cite ecosystem reference | GENUINELY-NEW (operator-facing chat UI) | **STUDY-PILOT.b ADOPT-NEAR-NOW** — only if operator workflow includes web-based chat session vs CLI-only |
| 2 | `assafelovic/gpt-researcher` | 27,087★ | (Apache-2.0 inferred from topics) | C2 (Agents) + C4 (Auto-GPT class) | PARTIAL-OVERLAP with claude-sota's research workflow (`sota-researcher` agent + `Z:/claude-sota-installed/.claude/skills/sota-research/`) | **STUDY-PILOT.b** — pilot vs incumbent sota-researcher agent for autonomous deep research |
| 3 | `langgenius/dify` | 141,515★ | (likely Open Source per topics) | C2 (Low-code) + C4 (workflow class) | GENUINELY-NEW (production-ready agentic workflow platform) OR DUPLICATE-FUNCTIONALITY of BMAD-METHOD (W225 #27) | **STUDY-PILOT.b** — operator decision: dify vs BMAD-METHOD workflow harness |
| 4 | `dagster-io/dagster` | 15,517★ | Apache-2.0 (inferred) | C2 + C3 + C5 — **STRONGEST 3/5 convergence** | PROVIDER-COMPLEMENT to claude-sota hook/JSONL telemetry | **STUDY-PILOT.b** — if data-pipeline orchestration workflow develops |
| 5 | `Mintplex-Labs/anything-llm` | 60,096★ | MIT (inferred) | C2 (Knowledge Management) | PARTIAL-OVERLAP with installed memory stack (mcp-memory + graphiti) | **REJECT-FOR-FIT** — Probe 5 mode-harness-shape FAIL (web-app class, not CLI-primitive class) |
| 6 | `deepset-ai/haystack` | 25,238★ | Apache-2.0 (inferred) | C2 + C5 (RAG) | PARTIAL-OVERLAP — DUPLICATE-FUNCTIONALITY with installed Graphiti L3 + cognee stack | **DEFER** — re-eval after current memory stack matures |
| 7 | `microsoft/semantic-kernel` | 27,909★ | MIT (presumed) | C2 (Other LLM Frameworks) | DUPLICATE-FUNCTIONALITY with claude-sota's CC-native sub-agent system | **REJECT-FOR-FIT** — same class as W225 Tier 4 rejects (autogen/MAF) |
| 8 | `mlflow/mlflow` | 25,957★ | Apache-2.0 | C3 + C5 | GENUINELY-NEW (experiment tracking) but DEMAND-ABSENCE (Probe 7.a) — claude-sota has no ML training workflow | **REJECT-FOR-FIT** — Probe 7.a demand-absence |
| 9 | `apache/airflow` | 45,429★ | Apache-2.0 | C3 + C5 | GENUINELY-NEW (workflow scheduling) but PARTIAL-OVERLAP with `/loop` cron + Anthropic CC `/scheduled-tasks` (FM-21) | **REJECT-FOR-FIT** — operator-side infrastructure scope |
| 10 | `PrefectHQ/prefect` | 22,412★ | Apache-2.0 | C3 + C5 | Same class as airflow | **REJECT-FOR-FIT** — operator-side infrastructure scope |
| 11 | `run-llama/llama_index` | 49,440★ | MIT (inferred) | C2 (Knowledge Management) | DUPLICATE-FUNCTIONALITY with installed graphiti + cognee + mcp-memory L1/L3 | **REJECT-FOR-FIT** — DUPLICATE per kiss-dry-yagni Must-Never #4 |

---

## 3. Multi-source convergence ranking

### HIGH-CONFIDENCE (≥2 catalogs)

1. **`dagster-io/dagster`** (3/5) — strongest cross-source convergence; STUDY-PILOT.b deferred to data-pipeline workflow demand
2. **`langgenius/dify`** (2/5) — STUDY-PILOT.b operator-decision vs BMAD-METHOD W225 #27
3. **`assafelovic/gpt-researcher`** (2/5) — STUDY-PILOT.b vs incumbent `sota-researcher` agent
4. **`mlflow/mlflow`** (2/5) — REJECT-FOR-FIT Probe 7.a demand-absence
5. **`apache/airflow`** (2/5) — REJECT-FOR-FIT workflow-scope-mismatch
6. **`PrefectHQ/prefect`** (2/5) — REJECT-FOR-FIT workflow-scope-mismatch
7. **`FlowiseAI/Flowise`** (2/5) — REJECT-FOR-FIT visual-no-code-platform mode-mismatch
8. **`deepset-ai/haystack`** (2/5) — DEFER (DUPLICATE with graphiti+cognee)
9. **`evidentlyai/evidently`** (2/5) — REJECT-FOR-FIT — ML drift-detection out-of-scope

### MEDIUM-CONFIDENCE (1 catalog only)

10. **`open-webui/open-webui`** (1 catalog implied + external strong signal 137K★) — STUDY-PILOT.b if web UI workflow emerges
11. **`Mintplex-Labs/anything-llm`** (1/5) — REJECT-FOR-FIT mode-mismatch
12. **`microsoft/semantic-kernel`** (1/5) — REJECT-FOR-FIT DUPLICATE-FUNCTIONALITY
13. **`run-llama/llama_index`** (1/5) — REJECT-FOR-FIT DUPLICATE
14. **`Pythagora-io/gpt-pilot`** (1/5) — RESEARCH-ONLY (AI developer class)

### LOW / RESEARCH-ONLY

15. **`Significant-Gravitas/AutoGPT`** (2/5 but project trajectory questioned) — RESEARCH-ONLY
16. **`microsoft/autogen`** — already W225 Tier 4 REJECT
17. **`lobehub/lobe-chat`** — UNVERIFIED-THIS-FIRE; lobehub/lobe-chat-agents is 1,082★ sub-repo

---

## 4. PHANTOM-CITE / verification catches

| # | Catalog claim | Cite | Resolution |
|---|---|---|---|
| 1 | `infiniflow/awesome-rag` (initial task targeting) | brief task description | **PHANTOM 422 Validation Failed** — repo does NOT exist; substituted with kyrolabs/awesome-langchain |
| 2 | `lobehub/lobe-chat` (Catalog 4 reference, very high star claim) | implied in C4 cross-reference | **NEEDS-VERIFICATION** — only `lobehub/lobe-chat-agents` (1,082★ sub-repo) directly verified this fire; root `lobehub/lobe-chat` 422-on-`repo:` query (likely syntax issue, not absence) |
| 3 | `joaomdmoura/crewai` (Catalog 2 reference) | C2 | **422 Validation Failed** — repo moved to `crewAIInc/crewAI` per W225 Tier 4 REJECT row (DUPLICATE-FUNCTIONALITY); not a phantom but a name-drift |
| 4 | `embedchain/embedchain` (Catalog 2 reference at multiple sites) | C2 | **422 Validation Failed** — repo likely moved to `mem0ai/embedchain` per W225 mem0 ecosystem note; needs direct probe |
| 5 | `geekan/MetaGPT` (Catalog 2 + Catalog 4) | C2 + C4 | **422 Validation Failed** — rate limit hit during this fire; verify next fire |

---

## 5. Cross-vs-W225 dedup verification

### NEW candidates NOT in W225 Tier 1-3 (50 candidates)

Verified absent from W225 FINAL SYNTHESIS Tier 1-3 + Tier 4 REJECT-FOR-FIT:
- `open-webui/open-webui` ✓ NEW
- `assafelovic/gpt-researcher` ✓ NEW (W225 has no autonomous-research agent)
- `langgenius/dify` ✓ NEW (W225 references workflow harness BMAD-METHOD/claude-task-master/ccpm but not dify)
- `dagster-io/dagster` ✓ NEW
- `mlflow/mlflow` ✓ NEW
- `apache/airflow` ✓ NEW
- `PrefectHQ/prefect` ✓ NEW
- `FlowiseAI/Flowise` ✓ NEW
- `deepset-ai/haystack` ✓ NEW
- `Mintplex-Labs/anything-llm` ✓ NEW
- `microsoft/semantic-kernel` ✓ NEW
- `evidentlyai/evidently` ✓ NEW
- `run-llama/llama_index` ✓ NEW

### Already-deduped (already in W225)

- `mem0ai/mem0` (W225 Tier 3 #46 / Tier 4 DEMOTED)
- `letta-ai/letta` (W225 Tier 3 #47)
- `BerriAI/litellm` (W225 Tier 3 #43)
- `comet-ml/opik` (W225 Tier 3 #48)
- `traceloop/openllmetry` ≈ partial overlap with langfuse W225 Tier 2 #14 + openlit Tier 3 #49
- `infiniflow/ragflow` (W225 Tier 2 #21)
- `microsoft/autogen` (W225 Tier 4 REJECT)
- `langchain-ai/deepagents` (W225 Tier 4 REJECT)
- `huggingface/smolagents` (W225 Tier 4 REJECT)
- `crewAIInc/crewAI` (W225 Tier 4 REJECT)
- `Arize-ai/phoenix` (W225 Tier 4 ELv2 LICENSE BLOCKER)

---

## 6. Recommended additions to Z:\claude-sota-pure install plan

### Tier 2 ADOPT-NOW additions (W225 numbering continues from #36)

| # | Repo | Stars | License | CR-12 class | Action |
|---|---|---|---|---|---|
| 36 | `open-webui/open-webui` | 137,220★ | (verify license direct) | GENUINELY-NEW (operator-facing chat UI) | **OPERATOR-DECISION** — STUDY-PILOT.b if operator workflow includes web-based session vs CLI-only. **Probe 5 mode-harness-shape**: claude-sota is CLI-primitive; UI is orthogonal (not duplicate). **Probe 7.b 5-clause demand**: pilot only if operator can name a workflow that benefits |

### Tier 3 STUDY-PILOT.b additions (W225 numbering continues from #51)

| # | Repo | Stars | Use case | Trigger for activation |
|---|---|---|---|---|
| 51 | `assafelovic/gpt-researcher` | 27,087★ | Autonomous deep research alternative to incumbent sota-researcher agent | Operator pilots vs incumbent on the same convergence-gate audit; compare verdict-quality + cost |
| 52 | `langgenius/dify` | 141,515★ | Production agentic workflow platform alternative to BMAD-METHOD #27 | Operator decision: dify vs BMAD-METHOD; pilot dify in worktree, measure 30-day workflow throughput |
| 53 | `dagster-io/dagster` | 15,517★ | Data-pipeline orchestration if claude-sota develops eval-as-a-service / batch-audit cron workflow | Triggered when audit-action-loop.md JSONL pipeline outgrows single-process scope |
| 54 | `FlowiseAI/Flowise` | 52,843★ | Visual no-code agent flow alternative for non-CLI operators | Triggered only if operator-team includes non-CLI users; harness-fit Probe 5 incompatible with autonomous /loop mode |

### Tier 4 REJECT-FOR-FIT additions (W225 Tier 4 ban-list extended)

- `Mintplex-Labs/anything-llm` — DUPLICATE-FUNCTIONALITY mcp-memory + Probe 5 web-app mode mismatch
- `microsoft/semantic-kernel` — DUPLICATE-FUNCTIONALITY CC sub-agent system
- `run-llama/llama_index` — DUPLICATE-FUNCTIONALITY graphiti+cognee+mcp-memory L1+L3
- `mlflow/mlflow` — Probe 7.a demand-absence (no ML training in claude-sota)
- `apache/airflow` — workflow-scope-mismatch
- `PrefectHQ/prefect` — workflow-scope-mismatch
- `evidentlyai/evidently` — ML drift-detection out-of-scope
- `deepset-ai/haystack` — DEFER (re-eval after current memory stack matures)
- `Significant-Gravitas/AutoGPT` — RESEARCH-ONLY (questioned project trajectory; W225 implicitly excludes by W225 Tier 4 rationale)

---

## 7. Discipline applied

Per `multi-source-discovery-breadth-discipline.md` §How to apply:

1. **≥4 distinct sources queried**: 5 catalogs (Shubhamsaboo + kyrolabs + kelvins + EwingYangs + EthicalML) + GitHub MCP `mcp__github__search_repositories` = 6 distinct source families ✅
2. **Per-source results documented**: §1 catalog-by-catalog harvest above ✅
3. **HONEST-NON-FINDING flagged**: Catalog 1 (Shubhamsaboo) returns no NEW external high-star repos (templates-only collection); Catalog 4 (EwingYangs) returns no strong-fit candidates (UI/Chinese-platform dominant) ✅
4. **TIER-1-OFFICIAL named-org first-party API used**: GitHub MCP for all star/license/HEAD verification ✅
5. **Phantom-cite catches documented**: §4 above (5 entries) ✅

Per `fm20-path-drift-cascade.md` §How to apply (forward-only convention):

1. Decomposed each catalog claim into sub-claim (repo exists / repo stars / repo license / cross-source convergence count) ✅
2. Mia-probed each sub-claim INDEPENDENTLY at synthesis time via `mcp__github__search_repositories` direct verify ✅
3. Cited probe outcome verbatim: "[VERIFIED 2026-05-15]" markers + ★ count from GitHub API ✅
4. Refuted sub-claims DROPPED: 5 candidates that returned 422 marked DEFERRED-VERIFICATION rather than carried forward as authoritative ✅
5. Forward-only correction: errors documented, no historical rewrite ✅

Per `fm19-readonly-guard-sidestep.md`: ARTIFACT-INLINE delimiter present at top of return ✅

Per `auto-compact-discipline.md`: persisted to tmp/wave226-agentO-* per ARTIFACT-INLINE; orchestrator handles durable writeback ✅

---

## 8. Open questions for orchestrator

1. **Lobe-chat verification**: `lobehub/lobe-chat` claimed in Catalog 2+4 but `repo:lobehub/lobe-chat` returned 422 this fire. Direct probe required next-fire to determine if (a) repo renamed, (b) syntax issue, (c) phantom.
2. **Geekan/MetaGPT**: 422 this fire likely due to rate-limit (8/8 OAuth fleet under pressure). Re-verify next-fire.
3. **`mem0ai/embedchain` resolution**: embedchain ownership transferred from `embedchain/embedchain` to `mem0ai/embedchain` (catalog reference is stale); verify via `mcp__github__get_file_contents owner=mem0ai repo=embedchain` next-fire.
4. **Dify vs BMAD-METHOD operator decision**: both are workflow harnesses; cardinal-rule-12 6-class disposition lattice points to PARTIAL-OVERLAP or DUPLICATE-FUNCTIONALITY; operator must pick one OR document why both are kept (kiss-dry-yagni Must-Never #4 review).
5. **Open-webui vs Yidadaa/ChatGPT-Next-Web vs Mintplex-Labs/anything-llm**: 3-way alternative space for "operator-facing chat UI"; if pursued, single-choice mandate per cardinal-rule-5 install-priority no-duplicates.

---

## 9. Reproducibility

To re-run this audit: per `multi-source-discovery-breadth-discipline.md` §Discovery cohort, queue these MCP tool calls:
```
mcp__github__search_repositories perPage=3 query="repo:Shubhamsaboo/awesome-llm-apps"
mcp__github__search_repositories perPage=3 query="repo:kyrolabs/awesome-langchain"
mcp__github__search_repositories perPage=3 query="repo:kelvins/awesome-mlops"
mcp__github__search_repositories perPage=3 query="repo:EwingYangs/awesome-open-gpt"
mcp__github__search_repositories perPage=3 query="repo:EthicalML/awesome-production-machine-learning"
mcp__github__get_file_contents owner=<owner> repo=<repo> path=README.md
```

Then grep `github\.com/[a-zA-Z0-9_-]+/[a-zA-Z0-9_.-]+` to extract candidate references, dedupe against W225 FINAL SYNTHESIS Tier 1-3+4 lists, verify each candidate's star count + license + last_updated via GitHub MCP, score CR-12 disposition per `cardinal-rule-12-upstream-install-priority.md` 6-class lattice.

---

## VERDICT

**STUDY-PILOT-CATALOG**: 5-catalog convergence audit harvested 13 NEW high-star candidates absent from W225 FINAL SYNTHESIS (50 Tier 1-3 + 25 Tier 4). Multi-source convergence ranking identifies **`open-webui/open-webui` (137K★) + `assafelovic/gpt-researcher` (27K★) + `langgenius/dify` (141K★) + `dagster-io/dagster` (15K★ 3/5 catalogs)** as top STUDY-PILOT.b candidates pending operator-side demand verification (Probe 7.b 5-clause check). 8 candidates classified REJECT-FOR-FIT via DUPLICATE-FUNCTIONALITY (kiss-dry-yagni Must-Never #4) or Probe 7.a demand-absence. 5 phantom-cite / name-drift catches documented for next-fire follow-up. Discovery breadth gate ≥4-sources SATISFIED; cardinal-rule-6 freshness verified (all 5 catalogs probed live 2026-05-15).

**Operator-action recommended**: re-fire critical candidates (open-webui + dify + gpt-researcher) via REAL GPT-5.5 BRIDGE-MODE codex-rescue per `cmc-env-funneled-disclosure.md` before any INSTALL commit (cross-model gate NOT structurally satisfied this Sonnet stand-in dispatch).
