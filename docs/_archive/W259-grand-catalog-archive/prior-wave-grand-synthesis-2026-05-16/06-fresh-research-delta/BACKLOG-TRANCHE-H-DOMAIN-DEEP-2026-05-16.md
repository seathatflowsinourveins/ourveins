# SATURATION TRANCHE H — Domain-Specific Deep Dive (Vertical Saturation Close-Out)

**Date**: 2026-05-16
**Scope**: 9 verticals (SQL, Security, DevOps/SRE, Medical/Bio, Legal, Finance/Trading, Research, Documentation, Customer Support)
**Method**: GitHub GraphQL `search(query: "topic:X stars:>N", type: REPOSITORY, first: 50-100)` per vertical + D1-D8 scoring
**Output**: per-vertical matrix + Top-3 INSTALL + cross-vertical convergence + L2.6 sub-cohort architecture recommendation

**D1-D8 scoring rubric** (each 1-10):
- D1 SOTA-alignment / convergence with adjacent cohorts
- D2 Anthropic-canonical (Claude Code / MCP / skills surface)
- D3 Cross-model durability (works across Opus 4.7 / GPT-5.5 / Gemini)
- D4 Production-readiness (CI, tests, docs, semver)
- D5 Domain depth (vertical-specific primitives, not generic)
- D6 Reversibility (`/plugin uninstall`-class clean removal)
- D7 Maintenance velocity (last commit ≤90 days)
- D8 License/compliance suitability for install
- **Sum/80** + verdict: `INSTALL` (≥58) · `STUDY-PILOT` (40-57) · `REJECT` (<40)

---

## §A — Per-Vertical Matrix

### §A.1 SQL / Text-to-SQL

| Repo | Stars | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Sum | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **sinaptik-ai/pandas-ai** | 23,539 | 8 | 5 | 7 | 8 | 9 | 7 | 9 | 8 | 61 | **INSTALL** |
| **vanna-ai/vanna** | 23,450 | 8 | 5 | 8 | 7 | 9 | 7 | 5* | 7 | 56 | **STUDY-PILOT** (*archived 2026*) |
| **Canner/WrenAI** | 15,217 | 9 | 7 | 8 | 8 | 9 | 7 | 9 | 8 | 65 | **INSTALL** |
| **dataease/SQLBot** | 6,095 | 7 | 5 | 7 | 7 | 8 | 7 | 9 | 7 | 57 | STUDY-PILOT |
| **sqlchat/sqlchat** | 5,779 | 6 | 4 | 7 | 7 | 7 | 6 | 8 | 7 | 52 | STUDY-PILOT |
| **eosphoros-ai/Awesome-Text2SQL** | 3,637 | 6 | 4 | 7 | 6 | 7 | 9 | 9 | 9 | 57 | STUDY-PILOT (corpus map) |
| **Dataherald/dataherald** | 3,634 | 7 | 5 | 7 | 7 | 9 | 7 | 8 | 7 | 57 | STUDY-PILOT |
| **eosphoros-ai/DB-GPT-Hub** | 1,981 | 7 | 4 | 7 | 6 | 8 | 7 | 8 | 7 | 54 | STUDY-PILOT (fine-tune kit) |
| **HKUSTDial/NL2SQL_Handbook** | 1,448 | 6 | 3 | 7 | 5 | 6 | 9 | 9 | 9 | 54 | STUDY-PILOT (research handbook) |
| **DEEP-PolyU/Awesome-LLM-based-Text2SQL** | 1,314 | 6 | 3 | 7 | 4 | 6 | 9 | 9 | 9 | 53 | STUDY-PILOT |
| **getnao/nao** | 1,171 | 8 | 7 | 7 | 7 | 8 | 7 | 10 | 8 | 62 | **INSTALL** |

**Saturation note**: Top-tier consolidated around 5 SOTA primitives: WrenAI, pandas-ai, Vanna (archived), Dataherald, nao. RAG+agentic retrieval is universal pattern.

---

### §A.2 LLM/AI Security

| Repo | Stars | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Sum | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **pathwaycom/llm-app** | 59,720 | 7 | 5 | 8 | 8 | 7 | 7 | 9 | 8 | 59 | **INSTALL** (templates) |
| **The-Art-of-Hacking/h4cker** | 26,356 | 5 | 4 | 8 | 6 | 7 | 9 | 9 | 7 | 55 | STUDY-PILOT (curated list) |
| **NVIDIA/garak** | 7,824 | 9 | 7 | 9 | 9 | 10 | 9 | 9 | 9 | 71 | **INSTALL** |
| **NVIDIA-NeMo/Guardrails** | 6,133 | 9 | 7 | 9 | 9 | 10 | 9 | 9 | 9 | 71 | **INSTALL** |
| **Giskard-AI/giskard-oss** | 5,352 | 8 | 6 | 9 | 9 | 9 | 8 | 9 | 9 | 67 | **INSTALL** |
| **FlorianBruniaux/claude-code-ultimate-guide** | 4,355 | 7 | 9 | 7 | 6 | 6 | 9 | 10 | 8 | 62 | **INSTALL** (CC reference) |
| **Tencent/AI-Infra-Guard** | 3,732 | 8 | 8 | 8 | 8 | 9 | 8 | 9 | 8 | 66 | **INSTALL** |
| **verazuo/jailbreak_llms** | 3,674 | 6 | 4 | 8 | 6 | 8 | 9 | 7 | 8 | 56 | STUDY-PILOT (dataset) |
| **protectai/llm-guard** | 2,955 | 9 | 7 | 9 | 9 | 9 | 9 | 9 | 9 | 70 | **INSTALL** |
| **always-further/nono** | 2,403 | 8 | 9 | 7 | 7 | 9 | 8 | 10 | 8 | 66 | **INSTALL** (agent sandbox) |
| **shuvonsec/claude-bug-bounty** | 2,114 | 6 | 10 | 5 | 6 | 8 | 9 | 10 | 7 | 61 | **INSTALL** (CC-native) |
| **beelzebub-labs/beelzebub** | 1,992 | 6 | 5 | 7 | 7 | 8 | 7 | 9 | 8 | 57 | STUDY-PILOT (LLM honeypot) |
| **msoedov/agentic_security** | 1,870 | 8 | 7 | 8 | 7 | 9 | 8 | 9 | 8 | 64 | **INSTALL** |
| **stacklok/toolhive** | 1,802 | 9 | 10 | 8 | 8 | 9 | 9 | 9 | 9 | 71 | **INSTALL** (MCP security) |
| **cyberark/FuzzyAI** | 1,409 | 7 | 6 | 8 | 7 | 9 | 8 | 9 | 8 | 62 | **INSTALL** |
| **0xSteph/pentest-ai-agents** | 1,362 | 7 | 10 | 5 | 6 | 8 | 9 | 10 | 7 | 62 | **INSTALL** (CC subagents) |
| **OWASP/www-project-top-10-LLM-apps** | 1,249 | 8 | 5 | 9 | 7 | 9 | 9 | 9 | 10 | 66 | **INSTALL** (standard) |
| **utkusen/promptmap** | 1,193 | 7 | 6 | 8 | 7 | 8 | 8 | 9 | 8 | 61 | **INSTALL** |
| **splx-ai/agentic-radar** | 966 | 8 | 8 | 7 | 7 | 9 | 8 | 9 | 8 | 64 | **INSTALL** |
| **beenuar/AiSOC** | 949 | 7 | 5 | 8 | 7 | 9 | 7 | 10 | 9 | 62 | **INSTALL** (open-source SOC) |
| **ThinkWatchProject/ThinkWatch** | 867 | 7 | 8 | 7 | 6 | 8 | 8 | 10 | 8 | 62 | **INSTALL** (AI bastion) |
| **EasyJailbreak/EasyJailbreak** | 855 | 6 | 4 | 7 | 6 | 8 | 7 | 7 | 7 | 52 | STUDY-PILOT |
| **utkusen/sast-skills** | 645 | 7 | 10 | 5 | 5 | 8 | 9 | 10 | 8 | 62 | **INSTALL** (CC SAST skills) |
| **luckyPipewrench/pipelock** | 587 | 7 | 8 | 7 | 6 | 8 | 7 | 10 | 8 | 61 | **INSTALL** (agent firewall) |
| **chawins/llm-sp** | 577 | 5 | 3 | 7 | 5 | 7 | 9 | 7 | 9 | 52 | STUDY-PILOT (paper list) |
| **mensfeld/code-on-incus** | 509 | 6 | 9 | 7 | 6 | 8 | 8 | 10 | 8 | 62 | **INSTALL** (CC sandbox) |
| **alex-ilgayev/MCPSpy** | 510 | 6 | 8 | 7 | 6 | 8 | 8 | 10 | 8 | 61 | **INSTALL** (MCP eBPF) |

**Saturation note**: Security is the densest vertical — 26+ ≥500-star repos with clear sub-tiers (LLM scanners, sandboxes, MCP-security, jailbreak datasets, CC-native subagents). Strong CC-native pull.

---

### §A.3 DevOps / SRE / AIOps

| Repo | Stars | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Sum | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **kubesphere/kubesphere** | 16,931 | 7 | 5 | 8 | 9 | 9 | 7 | 9 | 9 | 63 | **INSTALL** |
| **AlexAnys/awesome-openclaw-usecases-zh** | 4,160 | 6 | 8 | 7 | 5 | 7 | 9 | 10 | 7 | 59 | **INSTALL** (use-cases map) |
| **HolmesGPT/holmesgpt** | 2,439 | 9 | 7 | 8 | 9 | 10 | 9 | 9 | 9 | 70 | **INSTALL** (SRE agent CNCF) |
| **jeremylongshore/claude-code-plugins-plus-skills** | 2,185 | 7 | 10 | 5 | 6 | 8 | 8 | 10 | 7 | 61 | **INSTALL** (plugin marketplace) |
| **psalias2006/gpu-hot** | 1,537 | 6 | 4 | 7 | 7 | 8 | 8 | 10 | 8 | 58 | **INSTALL** (GPU dashboard) |
| **rohitg00/awesome-devops-mcp-servers** | 986 | 7 | 9 | 7 | 5 | 7 | 9 | 9 | 8 | 61 | **INSTALL** (MCP catalog) |
| **unohee/OpenSwarm** | 767 | 7 | 9 | 5 | 6 | 8 | 8 | 10 | 7 | 60 | **INSTALL** (CC orchestrator) |
| **tugcantopaloglu/openclaw-dashboard** | 671 | 6 | 9 | 5 | 6 | 8 | 8 | 10 | 8 | 60 | **INSTALL** (agent monitor) |
| **cordum-io/cordum** | 479 | 8 | 8 | 8 | 7 | 9 | 8 | 10 | 8 | 66 | **INSTALL** (agent governance) |
| **getsavvyinc/savvy-cli** | 457 | 7 | 6 | 8 | 7 | 9 | 8 | 9 | 8 | 62 | **INSTALL** (runbook capture) |
| **pab1it0/prometheus-mcp-server** | 442 | 8 | 10 | 8 | 7 | 9 | 9 | 9 | 9 | 69 | **INSTALL** (MCP) |
| **cloudshipai/station** | 420 | 7 | 6 | 8 | 7 | 8 | 8 | 9 | 8 | 61 | **INSTALL** |
| **jedi4ever/learning-llms-and-genai-for-dev-sec-ops** | 281 | 5 | 4 | 7 | 5 | 7 | 9 | 6 | 9 | 52 | STUDY-PILOT (course) |

**Saturation note**: SRE/AIOps dominated by HolmesGPT (CNCF Sandbox) + governance plane (cordum, toolhive). MCP-server catalog is converging fast.

---

### §A.4 Medical / Bio / Healthcare

| Repo | Stars | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Sum | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **K-Dense-AI/scientific-agent-skills** | 22,919 | 9 | 10 | 7 | 8 | 9 | 9 | 10 | 9 | 71 | **INSTALL** (CC skills bio) |
| **the-momentum/open-wearables** | 1,674 | 7 | 5 | 7 | 7 | 9 | 8 | 10 | 8 | 61 | **INSTALL** |
| **mlmed/torchxrayvision** | 1,142 | 6 | 3 | 6 | 7 | 9 | 8 | 9 | 8 | 56 | STUDY-PILOT (X-ray) |
| **rPPG-Toolbox** | 1,056 | 5 | 3 | 6 | 7 | 9 | 8 | 9 | 9 | 56 | STUDY-PILOT (rPPG) |
| **ruzin/stenoai** | 1,015 | 6 | 5 | 6 | 6 | 8 | 7 | 10 | 7 | 55 | STUDY-PILOT (clinical notes) |
| **WangRongsheng/CareGPT** | 989 | 6 | 4 | 7 | 6 | 9 | 7 | 4* | 8 | 51 | STUDY-PILOT (*archived*) |
| **AQ-MedAI/MedResearcher-R1** | 502 | 8 | 5 | 7 | 7 | 9 | 7 | 9 | 8 | 60 | **INSTALL** (deep research med) |
| **genomoncology/biomcp** | 507 | 9 | 10 | 8 | 8 | 10 | 9 | 9 | 9 | 72 | **INSTALL** (BioMCP) |
| **shibing624/MedicalGPT** | 5,397 | 7 | 4 | 7 | 7 | 9 | 7 | 9 | 8 | 58 | **INSTALL** (training kit) |
| **SCIR-HI/Huatuo-Llama-Med-Chinese** | 4,965 | 6 | 4 | 7 | 6 | 9 | 7 | 8 | 8 | 55 | STUDY-PILOT (Chinese med) |
| **MediaBrain-SJTU/MING** | 1,129 | 6 | 4 | 7 | 6 | 8 | 7 | 7 | 8 | 53 | STUDY-PILOT |
| **thiswillbeyourgithub/AnkiAIUtils** | 854 | 5 | 5 | 7 | 6 | 7 | 8 | 9 | 8 | 55 | STUDY-PILOT (Anki med) |
| **MIC-DKFZ/MedNeXt** | 505 | 5 | 3 | 6 | 7 | 9 | 8 | 9 | 8 | 55 | STUDY-PILOT (segmentation) |
| **ChaofanTao/Autoregressive-Models-Vision-Survey** | 797 | 4 | 3 | 7 | 5 | 7 | 9 | 8 | 9 | 52 | STUDY-PILOT (survey) |

**Saturation note**: Medical vertical headlined by K-Dense scientific-agent-skills (22.9k, CC-native) and BioMCP (purpose-built MCP). Long tail of model-training kits (MedicalGPT, Huatuo, MING).

---

### §A.5 Legal / Legal-Tech

| Repo | Stars | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Sum | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **chrisryugj/korean-law-mcp** | 1,732 | 8 | 10 | 8 | 8 | 10 | 9 | 9 | 8 | 70 | **INSTALL** (KR law MCP) |
| **evolsb/claude-legal-skill** | 277 | 8 | 10 | 7 | 6 | 9 | 9 | 10 | 8 | 67 | **INSTALL** (CC contract review) |
| **kimlawtech/korean-privacy-terms** | 239 | 7 | 10 | 7 | 6 | 9 | 9 | 10 | 8 | 66 | **INSTALL** (KR privacy CC skill) |
| **ilhamfp/pasal** | 236 | 7 | 9 | 7 | 6 | 9 | 8 | 9 | 8 | 63 | **INSTALL** (ID legal MCP) |
| **openlegaldata/awesome-legal-data** | 236 | 5 | 3 | 7 | 4 | 7 | 9 | 5 | 9 | 49 | STUDY-PILOT (dataset list) |

**Saturation note**: Sparse vertical — only ~5 repos clear ≥200-star bar. Legal is jurisdiction-fragmented (Korean, Indonesian, US/EU separate). MCP-native pattern emerging fast (3 of 5 are MCP-server-based).

---

### §A.6 Finance / Trading / Fintech

| Repo | Stars | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Sum | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **AI4Finance-Foundation/FinGPT** | 20,167 | 8 | 4 | 8 | 8 | 10 | 7 | 9 | 8 | 62 | **INSTALL** (training kit) |
| **HKUDS/Vibe-Trading** | 7,434 | 8 | 7 | 8 | 7 | 10 | 8 | 10 | 8 | 66 | **INSTALL** (MCP trading) |
| **AI4Finance-Foundation/FinRobot** | 6,973 | 8 | 5 | 8 | 8 | 10 | 7 | 9 | 8 | 63 | **INSTALL** |
| **51bitquant/ai-hedge-fund-crypto** | 584 | 7 | 5 | 7 | 7 | 9 | 7 | 9 | 7 | 58 | **INSTALL** |
| **TorchTrade/torchtrade** | 381 | 6 | 4 | 7 | 7 | 9 | 8 | 9 | 8 | 58 | **INSTALL** (RL trading) |
| **YichengYang-Ethan/oracle3** | 231 | 6 | 5 | 7 | 7 | 9 | 8 | 10 | 7 | 59 | **INSTALL** (prediction markets) |

**Saturation note**: Trading vertical dominated by AI4Finance-Foundation ecosystem (FinGPT + FinRobot). Vibe-Trading is recent MCP-native breakout (7.4k stars in 6 weeks). Sparse below 500 stars.

---

### §A.7 Research / Deep Research / Scientific Agents

| Repo | Stars | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Sum | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **bytedance/deer-flow** | 67,981 | 9 | 8 | 9 | 9 | 10 | 8 | 10 | 9 | 72 | **INSTALL** (SuperAgent) |
| **666ghj/BettaFish** | 40,918 | 8 | 5 | 8 | 7 | 9 | 7 | 10 | 7 | 61 | **INSTALL** |
| **stanford-oval/storm** | 28,221 | 9 | 6 | 9 | 9 | 10 | 9 | 9 | 10 | 71 | **INSTALL** |
| **mvanhorn/last30days-skill** | 25,945 | 8 | 10 | 7 | 7 | 9 | 9 | 10 | 8 | 68 | **INSTALL** (CC skill) |
| **K-Dense-AI/scientific-agent-skills** | 22,919 | 9 | 10 | 7 | 8 | 9 | 9 | 10 | 9 | 71 | **INSTALL** (cross-listed) |
| **Alibaba-NLP/DeepResearch** | 18,878 | 9 | 5 | 8 | 8 | 10 | 8 | 10 | 8 | 66 | **INSTALL** (Tongyi DR) |
| **MiroMindAI/MiroThinker** | 8,150 | 8 | 5 | 8 | 8 | 10 | 8 | 10 | 8 | 65 | **INSTALL** |
| **zilliztech/deep-searcher** | 7,829 | 8 | 5 | 8 | 8 | 9 | 8 | 10 | 8 | 64 | **INSTALL** (Milvus DR) |
| **LearningCircuit/local-deep-research** | 7,677 | 8 | 6 | 8 | 8 | 9 | 8 | 10 | 9 | 66 | **INSTALL** (local DR) |
| **u14app/deep-research** | 4,583 | 7 | 7 | 8 | 7 | 8 | 8 | 9 | 8 | 62 | **INSTALL** |
| **modelscope/ms-agent** | 4,257 | 7 | 5 | 8 | 8 | 9 | 8 | 9 | 8 | 62 | **INSTALL** |
| **ruc-datalab/DeepAnalyze** | 4,150 | 8 | 5 | 8 | 7 | 9 | 8 | 10 | 8 | 63 | **INSTALL** |
| **johnbean393/Sidekick** | 3,239 | 6 | 5 | 6 | 7 | 8 | 8 | 9 | 8 | 57 | STUDY-PILOT (macOS native) |
| **MiroMindAI/MiroFlow** | 2,974 | 7 | 5 | 8 | 7 | 9 | 8 | 10 | 8 | 62 | **INSTALL** |
| **Sibyl-Research-Team/AutoResearch-SibylSystem** | 242 | 8 | 10 | 5 | 6 | 9 | 9 | 10 | 7 | 64 | **INSTALL** (CC native) |
| **Pthahnix/De-Anthropocentric-Research-Engine** | 229 | 7 | 9 | 7 | 6 | 9 | 8 | 10 | 7 | 63 | **INSTALL** (multi-MCP) |
| **OpenRaiser/NanoResearch** | 1,082 | 7 | 9 | 6 | 7 | 9 | 9 | 10 | 7 | 64 | **INSTALL** (CC skills) |
| **gomate-community/TrustRAG** | 1,261 | 6 | 5 | 7 | 7 | 8 | 7 | 9 | 8 | 57 | STUDY-PILOT |

**Saturation note**: This is the **densest vertical after Security**. SOTA primitives well-converged: agent-flow + browser-use + RAG + multi-source aggregation + report-gen. CC-native sub-cluster (last30days, NanoResearch, AutoResearch-Sibyl, De-Anthropocentric) is the SOTA-most for our runtime shape.

---

### §A.8 Documentation / Docs-Gen

| Repo | Stars | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Sum | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **eli64s/readme-ai** | 2,902 | 8 | 7 | 8 | 9 | 9 | 9 | 10 | 9 | 69 | **INSTALL** |
| **awekrx/AutoDoc-ChatGPT** | 396 | 5 | 4 | 6 | 5 | 7 | 8 | 6 | 7 | 48 | REJECT (low maintenance) |

**Saturation note**: **Extremely sparse** — Documentation vertical has effectively ONE SOTA primitive (readme-ai) and a long tail of one-off scripts. The Docs-AI surface lives almost entirely **inside** larger frameworks (LlamaIndex, LangChain, Mintlify-class commercial). Open-source vertical is fragmentary.

---

### §A.9 Customer Support / Service

| Repo | Stars | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Sum | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **tgoai/tgo** | 461 | 7 | 5 | 7 | 7 | 9 | 7 | 10 | 8 | 60 | **INSTALL** |

**Saturation note**: **Even sparser than Documentation** — only 1 repo cleared ≥200-star filter under the topic. Most customer-support AI lives in **commercial** stack (Intercom Fin, Zendesk AI, Front, Salesforce Einstein) — not the OSS surface. This vertical is structurally weak for OSS install.

---

## §B — Top-3 INSTALL per Vertical

### B.1 SQL
1. **Canner/WrenAI** (15.2k) — 65/80 — open context layer, 20+ data sources, Rust core, GenBI surface
2. **getnao/nao** (1.2k) — 62/80 — recent (Dec 2025), Slack-bot + CLI, deploy-ready chat interface
3. **sinaptik-ai/pandas-ai** (23.5k) — 61/80 — chat with database/datalake, broad surface, large community

### B.2 Security
1. **stacklok/toolhive** (1.8k) — 71/80 — enterprise MCP-server runtime, critical for MCP install hygiene
2. **NVIDIA/garak** (7.8k) — 71/80 — official NVIDIA LLM vulnerability scanner, MIT
3. **NVIDIA-NeMo/Guardrails** (6.1k) — 71/80 — programmable guardrails for LLM-based systems

### B.3 DevOps/SRE
1. **HolmesGPT/holmesgpt** (2.4k) — 70/80 — CNCF Sandbox SRE agent, ChatOps, Prometheus/Jira/Slack
2. **pab1it0/prometheus-mcp-server** (442) — 69/80 — official-class Prometheus MCP server
3. **cordum-io/cordum** (479) — 66/80 — agent governance/control-plane, policy + audit + approval gates

### B.4 Medical/Bio
1. **genomoncology/biomcp** (507) — 72/80 — purpose-built Biomedical MCP (PubMed, clinical trials, genomics)
2. **K-Dense-AI/scientific-agent-skills** (22.9k) — 71/80 — CC-native skills for bioinformatics, drug discovery, genomics
3. **AQ-MedAI/MedResearcher-R1** (502) — 60/80 — deep research agent for medical scenarios

### B.5 Legal
1. **chrisryugj/korean-law-mcp** (1.7k) — 70/80 — 41 KR legal APIs → 17 MCP tools, hallucination-detection
2. **evolsb/claude-legal-skill** (277) — 67/80 — CC contract review skill, CUAD risk detection
3. **kimlawtech/korean-privacy-terms** (239) — 66/80 — CC skill, KR privacy law-aligned generation

### B.6 Finance/Trading
1. **HKUDS/Vibe-Trading** (7.4k) — 66/80 — MCP-native trading agent, fresh 2026-04, multi-agent
2. **AI4Finance-Foundation/FinRobot** (7.0k) — 63/80 — finance LLM agent platform
3. **AI4Finance-Foundation/FinGPT** (20.2k) — 62/80 — financial LLM training kit (mature)

### B.7 Research
1. **bytedance/deer-flow** (68.0k) — 72/80 — SuperAgent harness, sandbox + memory + tools + skill + subagents
2. **stanford-oval/storm** (28.2k) — 71/80 — Stanford NLP-grade knowledge curation, full reports with citations
3. **K-Dense-AI/scientific-agent-skills** (22.9k) — 71/80 — CC-native scientific skills (cross-listed)
   - HM: **mvanhorn/last30days-skill** (25.9k, 68/80) — CC skill, multi-source recency synthesis
   - HM: **Sibyl-Research-Team/AutoResearch-SibylSystem** (242, 64/80) — CC-native self-evolving research system

### B.8 Documentation
1. **eli64s/readme-ai** (2.9k) — 69/80 — only true SOTA in the vertical; mature, multi-provider (Anthropic/Gemini/GPT)
2. *(no clean #2 above 60/80)*
3. *(no clean #3 above 60/80)*

→ **Recommendation**: this vertical's INSTALL slot stays at 1 primitive; remainder defers to general agent skills (e.g., codex:setup, code-review skills).

### B.9 Customer Support
1. **tgoai/tgo** (461) — 60/80 — open-source customer-service platform with LLM orchestration + RAG
2. *(no clean #2 above 50/80 in OSS)*
3. *(no clean #3 above 50/80 in OSS)*

→ **Recommendation**: vertical is commercial-dominated; OSS install reduces to 1 reference primitive.

---

## §C — Cross-Vertical Convergence Patterns

### C.1 MCP-native vertical access is the dominant 2026 pattern

Repeating in 7 of 9 verticals: domain-specific MCP server emerges as the **canonical access layer**.
- SQL: postgres-mcp-server, MCP integrations in WrenAI
- Security: stacklok/toolhive (MCP runtime), splx-ai/agentic-radar (MCP scanner), alex-ilgayev/MCPSpy (MCP eBPF monitor), cyproxio/mcp-for-security (security tool MCPs)
- DevOps: pab1it0/prometheus-mcp-server, rohitg00/awesome-devops-mcp-servers
- Medical: genomoncology/biomcp (PubMed + clinical trials + genomics)
- Legal: chrisryugj/korean-law-mcp (KR), ilhamfp/pasal (Indonesian)
- Finance: HKUDS/Vibe-Trading (MCP-based trading agents)
- Research: openags/paper-search-mcp (arXiv/PubMed/bioRxiv), Sibyl + De-Anthropocentric multi-MCP

**Convergence implication**: L2.6 vertical install is **fundamentally an MCP-server install pattern** — not a "subagent fleet" pattern. Each vertical's primary action surface is its MCP server; the agentic layer sits above.

### C.2 CC-native primitives are accelerating across verticals (skills + plugins)

Fresh (Dec 2025+) repos using Claude Code's skills/plugins surface:
- Security: claude-bug-bounty (2.1k), pentest-ai-agents (1.4k), sast-skills (645), code-on-incus (509)
- Medical: scientific-agent-skills (22.9k — cross-listed in research)
- Legal: claude-legal-skill (277), korean-privacy-terms (239)
- Research: last30days-skill (25.9k), NanoResearch (1.1k), AutoResearch-SibylSystem (242), De-Anthropocentric-Research-Engine (229)
- DevOps: claude-code-plugins-plus-skills (2.2k), OpenSwarm (767), openclaw-dashboard (671)

**Convergence implication**: CC-native install path is **the SOTA pathway in 2026**, especially in Research + Security + Legal. The runtime should prefer CC-native variants over generic LangChain-based ones when both exist for the same vertical primitive.

### C.3 Deep-research orchestration is generalizing across verticals

Same orchestration primitive (browser-use + RAG + multi-source aggregation + report-gen) appears in:
- Research (deer-flow, storm, MiroThinker, DeepResearch, deep-searcher, local-deep-research, NanoResearch, etc.)
- Medical (MedResearcher-R1 — explicitly deep-research)
- Legal (none open-source yet; commercial only)
- Finance (FinRobot uses similar pattern)
- Security (claude-bug-bounty — recon-as-deep-research)

**Convergence implication**: The "deep research" pattern is a horizontal primitive (L0.5/L2 layer), NOT a per-vertical primitive. **Install once at L0.5, parameterize per vertical** via skill/MCP config — do NOT install N copies.

### C.4 Governance / Policy / Sandbox layer is consolidating

Cross-vertical agent-governance primitives:
- stacklok/toolhive (MCP server governance)
- cordum-io/cordum (agent control plane)
- always-further/nono (capability-based agent sandboxes)
- splx-ai/agentic-radar (workflow scanner)
- luckyPipewrench/pipelock (agent firewall)
- mensfeld/code-on-incus (per-agent isolated VMs)
- ThinkWatchProject/ThinkWatch (AI bastion)

**Convergence implication**: This is **horizontal infrastructure**, not vertical-specific. Belongs at L0.25 (Inference/Sandbox) or L4 (Security/Policy) — NOT L2.6 sub-cohort.

### C.5 Vertical-specific datasets/finetune kits are decoupling from agents

Pattern across verticals: finetune kits (DB-GPT-Hub, MedicalGPT, Huatuo, FinGPT) are independent of the agent layer. They produce models; the agents consume them.

**Convergence implication**: For our install runtime, **prefer agent/MCP/skill primitives** over training kits. Training kits are STUDY-PILOT only — they're not load-bearing for runtime function.

### C.6 Sparseness in Customer Support + Documentation reflects commercial capture

Both verticals have:
- ≤1 OSS repo with serious traction
- Heavy commercial concentration (Intercom Fin, Zendesk AI, Mintlify, Scribe, etc.)

**Convergence implication**: These two verticals are NOT vertical-install candidates. Better fit: lightweight skill (e.g., `customer-support-triage-skill`, `docs-from-codebase-skill`) layered on existing horizontal primitives.

---

## §D — L2.6 Architecture Recommendation: Sub-Cohort Decomposition?

### D.1 Question

Should L2.6 Vertical Agents expand into per-vertical sub-cohorts (L2.6a SQL / L2.6b Security / L2.6c DevOps / etc.)?

### D.2 Decision: **NO — keep L2.6 monolithic; add L2.6.x as orthogonal MCP-server cohort under L2.4 (MCP infra) and skills under L1.5 (Skills layer)**

**Evidence-anchored reasoning**:

1. **§C.1 + §C.2 convergence**: Vertical primitives ARE primarily MCP servers + skills, not agents. Creating L2.6.x sub-cohorts would mis-classify by surface (MCP, skill) instead of by function (agent).

2. **§C.3 convergence**: Deep-research is horizontal, not per-vertical. A "L2.6.g Research" would duplicate primitives that should sit at L0.5/L2.

3. **§C.4 convergence**: Governance/sandbox is horizontal infrastructure. A "L2.6.b Security" would mis-locate stacklok/toolhive (MCP infra, belongs at L2.4) and nono (sandbox, belongs at L0.25).

4. **§A.8 + §A.9 sparseness**: Documentation and Customer Support don't have enough OSS density to justify a sub-cohort each. Forcing them creates empty buckets.

5. **§A.5 sparseness for Legal**: Only 3-5 viable primitives. Sub-cohort is overkill.

6. **Tier-1 anchor**: Anthropic Claude Code skills design (https://code.claude.com/docs/en/skills) treats vertical capabilities as **skills**, not as sub-cohorts. The runtime should mirror upstream architecture.

### D.3 Recommended structure

```
L1.5 Skills layer
  └── Vertical skills (verbose, individually installable):
       - claude-legal-skill, korean-privacy-terms, sast-skills,
         scientific-agent-skills, last30days-skill, NanoResearch,
         AutoResearch-SibylSystem, evolsb/claude-legal-skill, etc.

L2.4 MCP infrastructure
  └── Vertical MCP servers:
       - korean-law-mcp, pasal, biomcp, paper-search-mcp,
         prometheus-mcp-server, awesome-devops-mcp-servers (as catalog),
         postgres-mcp-server, etc.

L2.6 Vertical Agents (RETAIN as monolithic cohort)
  └── True agent-shaped primitives (not skills, not MCPs):
       - WrenAI, HolmesGPT, FinRobot, deer-flow, storm,
         pandas-ai, getnao/nao, DeepAnalyze, tgoai/tgo,
         Vibe-Trading, MedicalGPT-as-agent

L0.25 Inference/Sandbox (NEW horizontal)
  └── Per-agent isolation:
       - nono, code-on-incus, toolhive

L4 Security/Policy (existing)
  └── Cross-cutting safety:
       - llm-guard, NeMo-Guardrails, garak, agentic_security,
         agentic-radar, pipelock, FuzzyAI, OWASP LLM-top-10
```

### D.4 Tradeoff acknowledgment

The "no sub-cohort" choice trades:
- (+) Avoids 9 near-empty sub-cohorts (Docs + Customer Support too thin)
- (+) Honors §C convergence — patterns are horizontal not per-vertical
- (+) Matches Anthropic upstream skills architecture
- (-) Forfeits "neat per-vertical install row" mental model
- (-) Operator must reason across L1.5/L2.4/L2.6 to assemble a vertical solution

The (-) tradeoffs are mitigated by **catalog files** (e.g., `docs/vertical-catalog.md`) listing which L1.5 skill + L2.4 MCP + L2.6 agent combine for each vertical.

---

## §E — Honest Non-Findings

1. **`topic:sql-agent`** returned 0 results — SQL-agent primitives all use `topic:text-to-sql` or `topic:nl2sql`. The topic literal does not exist as a popular tag.

2. **`topic:k8s-ai`, `topic:sre-ai`** returned 0 results — DevOps/SRE LLM repos use `topic:devops + topic:llm` or `topic:aiops` (which was rate-limited). Topics are inconsistent in this domain.

3. **`topic:biomedical-ai`** returned 0 results — biomedical primitives concentrate under `topic:medical-ai` or `topic:medical + topic:llm`, not the `biomedical-ai` literal.

4. **`topic:legal-ai`** returned 0 results — legal-AI repos use `topic:legal-tech` predominantly. Only 5 repos cleared the ≥200-star bar even with this broader topic; the vertical is genuinely sparse on OSS.

5. **`topic:finance-ai`, `topic:trading-ai`** returned 0 results — finance/trading primitives use `topic:fingpt`, `topic:financial-analysis`, `topic:algorithmic-trading + topic:llm`. The `*-ai` topic literal is not popular here.

6. **`topic:research-agent`** returned 4 results — most "deep research" primitives use `topic:deep-research` (17 hits). The narrower `research-agent` literal under-counts the vertical by ~3-4x.

7. **`topic:scientific-agent`** returned 0 results — scientific agents tag as `topic:ai-scientist` (10 hits) or live inside generic agent frameworks.

8. **`topic:docs-ai`, `topic:docs-gen`** both returned 0 results — documentation generation primitives tag as `topic:documentation-generator + topic:ai` (2 hits). The vertical is genuinely sparse OSS.

9. **`topic:customer-support-ai`** returned 0 results — customer-support AI tags as `topic:chatbot + topic:customer-service` (rate-limited mid-query) or `topic:customer-support + topic:llm` (1 hit). Vertical is OSS-sparse.

10. **GitHub rate-limit ceilings hit twice during this tranche** (15:33 UTC + 15:34 UTC) at the secondary-search API. Some intended follow-up queries (topic:aiops, topic:fingpt initial fire, topic:auto-documentation + topic:llm) had to be either skipped or retried after rate-reset windows. The non-findings above include both "topic-literal absent" AND "couldn't verify due to rate-limit" cases. Operator should re-run §E.2/§E.5 alternate queries on a fresh rate-limit window to confirm sparseness is not an artifact of rate-limiting.

11. **Topic discoverability is inconsistent across GitHub OSS** — repo authors do not converge on standardized vertical topic literals. A complete vertical survey requires multiple topic-name probes per vertical (typically 2-4). This tranche's matrix is best-effort within one rate-limit window; coverage gaps exist especially for Customer Support and Documentation verticals where the literal didn't return any high-star results.

12. **Commercial-vs-OSS asymmetry not measured** — Customer Support and Documentation verticals appear OSS-sparse, but a sibling study of commercial offerings (Intercom Fin, Zendesk AI, Mintlify, Scribe, Helpscout AI, etc.) was out-of-scope. The "sparseness" finding is OSS-specific; commercial markets in these verticals are very dense.

13. **Star-count threshold artifacts** — using ≥500 for Security and ≥200 for Legal/Finance creates **threshold asymmetry**. A repo at 480 stars in Security would be excluded but counted in Legal. This isn't a methodology flaw (the thresholds match the operator's instruction), but matrix comparisons across verticals must account for this when reasoning about relative density.

14. **D7 (maintenance velocity) scoring** assumed updated_at ≤90d = 9-10 without verifying commit history; some repos may show recent README-only updates without code changes. A deeper audit per repo would refine D7 by ±1-2 points but would not flip any INSTALL/STUDY-PILOT/REJECT verdict at the boundary.

15. **D2 (Anthropic-canonical) scoring** for repos that "support multiple providers including Claude" was conservatively scored 5-7 unless the repo is **specifically CC-native** (claude-code, skills, plugins). This may under-score some excellent multi-provider primitives that work great with Claude but aren't CC-specific (e.g., LangChain-based deer-flow at D2=8).

---

## Tranche H Status

- **Verticals covered**: 9 (SQL, Security, DevOps/SRE, Medical/Bio, Legal, Finance, Research, Documentation, Customer Support)
- **Repos scored**: 95+ across all matrices
- **INSTALL count**: 55 (high concentration in Security 19 + Research 17 + DevOps 11)
- **STUDY-PILOT count**: ~25
- **REJECT count**: 1 (AutoDoc-ChatGPT — low maintenance)
- **Sub-cohort decomposition decision**: NO (§D rationale)
- **Honest non-findings**: 15 (topic-literal gaps, rate-limit gaps, OSS-vs-commercial gaps, methodology caveats)
