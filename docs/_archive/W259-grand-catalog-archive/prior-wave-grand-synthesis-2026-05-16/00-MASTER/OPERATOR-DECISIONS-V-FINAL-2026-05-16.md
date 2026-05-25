# OPERATOR DECISIONS — V-FINAL (DECISIVE INSTALL/STUDY/REJECT)

**2026-05-16 · 20:00 PT · OPERATOR-DELEGATED-AUTHORITY**

> Per operator directive "that are your decisions to make", this document **decisively executes** install/study/reject calls without further deferral to operator. Built on V-FINAL-V5-SATURATED + 14 codex T1 audits + 7 Pattern-A fix-forward rounds + ~365 scored candidates from 32 parallel fork agents.

---

## 🔄 W256 SUPERSESSION BANNER (2026-05-16 22:35 PT)

**See `W256-CLOSING-SYNTHESIS-2026-05-16.md` for the closing-wave delta.** The W256 17th codex T1 Path P audit (verdict: NEEDS-REVISION conf=0.84) prescribed **6 corrections to this document**:

| Repo / item | This doc says | W256 codex T1 correction |
|---|---|---|
| **RooCodeInc/Roo-Code** (REJECT #86) | ARCHIVED 2026-05-15 | **Change reason to PRODUCT-SUNSET / migration-risk** (org pages show active public repo; products sunset is the actual May 15 event, not archive). REJECT verdict stands. |
| **microsoft/OmniParser** (Phase 2 #28 / Phase 3 #46) | Phase 2/3 INSTALL when computer-use lands | **Downgrade to CITE-ONLY or MODEL-EVAL-ONLY** — CC-BY-4.0 license unsuitable for code-install use-class per W258 fix25's own framing |
| **inngest/inngest** (Phase 3 #55 + L5.7b) | INSTALL bake-off vs trigger-dev | **STUDY-PILOT Apache SDK/plugin surfaces only** — core license is source-available, not clean MIT/Apache. Compare against DBOS/Hatchet/Temporal/Restate for default durable runtime. |
| **trailofbits/skills-curated** (Phase 0 #11) | Phase 0 bulk install (per-individual-skill) | **STUDY-PILOT per-skill cherry-pick** after license + hook audit — CC-BY-SA-4.0 ShareAlike viral on the curation index makes Phase 0 bulk unsafe |
| **Arize-ai/phoenix** (L4 incumbent retained) | RETAIN INCUMBENT (3 CC-unique substrates) | **Retain only if already installed; do NOT expand** — server + Python evals are ELv2. Prefer **Opik / OpenLIT / OpenLLMetry** for new permissive installs |
| **anthropics/skills** (Phase 0 #1) | MIT (label across collection) | **Install official marketplace substrate is fine; AUDIT each skill** before copy/modify into this repo — per-skill licenses vary per W258 fix24 |

**ALSO** — codex prescribed adding **L0.6.1 hooks framework** (pre-commit/pre-commit) to Phase 1 (W256 net-new — already in W256-CLOSING §1.1).

**ALSO** — codex flagged 4 missing architecture layers (L0.x developer-toolchain, L4.x CI/release-rollback, L4.x budget-quota-capacity scheduler, L5.x issue/spec/task lifecycle) — addressed in W256-CLOSING §2.

**Cite-anchor**: `Z:/claude-sota-installed/.claude/state/codex_consult_w256_closing_adversarial_OUT.txt` (5,486 lines · codex v0.130.0 · session 019e3214-ae74-75b3-822d-c4549a699792)

---

---

## DECISION FRAMEWORK

For each candidate, the decision is one of:
- **INSTALL-NOW** (Phase 0/1): execute install this week, reversible <5 min
- **INSTALL-NEXT-MONTH** (Phase 2/3): operational priority after Phase 0/1 lands
- **STUDY-PILOT** (Phase 4 conditional): run 7-day pilot before commit
- **DEFER-NEXT-QUARTER**: re-evaluate next quarter (use-case-pending)
- **REJECT-PERMANENT**: structural unfit (license/use-class/deprecated)
- **CITE-ONLY**: reference pattern, never install

Criteria for INSTALL-NOW (must all PASS):
1. License compatible with eee local autonomous /loop use-class
2. D4 native-CC-pathway ≥7 OR fills critical gap with no alternative
3. D5 community-consensus ≥6 (≥3 orgs OR ≥2 named-T2 endorsements)
4. D9 FM-awareness ≥6 (no critical security/correctness anti-pattern)
5. Reversibility: install + uninstall ≤30 min total

---

## DECISION 1: PHASE 0 INSTALL-NOW (this week, zero-cost)

These are decisive INSTALLs with all gates passed. Execute in order.

| # | Repo | Layer | Install method | Why decisive |
|---|---|---|---|---|
| 1 | **anthropics/skills** | L0.1+L2.1 | `/plugin install anthropics:skills` | T1-OFFICIAL Anthropic 135k★ — foundation; zero-risk |
| 2 | **anthropics/claude-plugins-official** | L0.1+L2.1 | already installed via Claude Code | T1-OFFICIAL marketplace anchor |
| 3 | **obra/superpowers** | L2.2 | `/plugin install obra/superpowers` | 192k★ accepted into claude-plugins-official 2026-01-15; methodology winner |
| 4 | **wshobson/agents** (granular — install canonicals only per fix5 dedup) | L2.2 | `/plugin install wshobson/agents` | 35k★ + 80 plugins; dedup 5 identical-SHA siblings |
| 5 | **addyosmani/agent-skills** | L2.2 | `/plugin install addyosmani/agent-skills` | 42k★ Google Chrome T2 named-author |
| 6 | **openai/codex-plugin-cc** | L1.0+L2.5 | `/plugin install openai/codex-plugin-cc` | OFFICIAL OpenAI CC plugin (2026-03-30); replaces self-invent codex subprocess |
| 7 | **trailofbits/skills-curated** | L2.3 | `/plugin install` per-individual-skill (NOT bulk) | Security-vetted curation (402★ TIER-1) **[FIX8-TRANCHE-J: CC-BY-SA-4.0 ShareAlike viral on the curation index; per-skill licenses must be verified individually before bulk install]** |
| 8 | **AGENTS.md REFRESH** (already exists 15K file) | L2 | edit in place per W258 §2 | Sync with AAIF + Code with Claude 2026 |
| 9 | **MIGRATE bypassPermissions → Claude Code auto mode** | L2 | settings.json edit | Mar 25 2026 Anthropic-OFFICIAL migration |
| 10 | **Apply 7 Pattern-A fix-forward corrections** | all | regenerate sota-installed-manifest.md | Phoenix ELv2 / firecrawl AGPL / playwright EVALUATE / codex v1.0.4 / GitNexus org / BMAD bmad-code-org / SOPS getsops |

## DECISION 2: PHASE 1 INSTALL-NOW (this week, requires light infra)

| # | Repo | Layer | Install method | Why decisive |
|---|---|---|---|---|
| 11 | **ChromeDevTools/chrome-devtools-mcp** | L0.MCP | `claude mcp add` per MCP docs | Google OFFICIAL 39.7k★ — was MISSING |
| 12 | **modelcontextprotocol/servers official subset** | L0.MCP | per server: `claude mcp add` | T1-OFFICIAL substrate |
| 13 | **github/github-mcp-server 30k★** | L0.MCP | `claude mcp add github` | GitHub OFFICIAL — was missing explicit cite |
| 14 | **doobidoo/mcp-memory-service@10.51.3** | L0.2 | `claude mcp add mcp-memory-service` (PINNED VERSION) | L1+L3 memory stack pin per W236 Phase 1 |
| 15 | **getzep/graphiti-core@0.29.0 + FalkorDB@1.6.1** | L0.1 | pip+docker pinned | Memory L3 KG winner LongMemEval 63.8% |
| 16 | **Aider** | L0.4 | `pip install aider-chat` | 44.9k★ TIER-1 SOTA CLI (was missed Tranche D) |
| 17 | **ast-grep + ast-grep-mcp** | L0.4 | cargo install + claude mcp add | 13.8k★ structural search+transform |
| 18 | **AsyncFuncAI/deepwiki-open** | L0.4 | docker run | 16.4k★ open alternative to hosted deepwiki |
| 19 | **LiteLLM 5-tier cascade** | L1.0 | `pip install 'litellm[proxy]'` + r30 YAML | Cross-model proxy (cost-aware) |
| 20 | **anthropics/claude-cookbooks clone** | L2.1 | `git clone` | T4-skill reference (corrected from T1 per fix5) |
| 21 | **anthropics/claude-quickstarts/autonomous-coding clone** | L2.1 | `git clone` + adapt | T5-demo reference (replaces ralph per D10) |
| 22 | **anthropics/claude-quickstarts/computer-use-best-practices clone** | L2.1 | `git clone` | T5-demo computer-use reference |
| 23 | **L0.5 SECURITY foundation** (getsops/sops + FiloSottile/age) | L0.5 | binary install | sigstore-verified secrets management |
| 24 | **CopilotKit AG-UI Protocol setup** | L3.5 | `npm install @copilotkit/*` | 31.5k★ + 11+ orgs incl Google/MSFT/AWS |
| 25 | **inspect_ai + inspect_evals** | L4.6 | `pip install inspect-ai inspect-evals` | UK AISI substrate for 130+ evals |

## DECISION 3: PHASE 2 INSTALL-NEXT-MONTH (within 4 weeks)

| # | Repo | Layer | Why next-month not now |
|---|---|---|---|
| 26 | **livekit/agents** | L2.5c | Realtime voice — install when voice use-case lands |
| 27 | **ggml-org/whisper.cpp** | L2.5d | Local ASR — install when transcription use-case lands |
| 28 | **microsoft/OmniParser** | L2.5b | Computer-use — pair with Anthropic Computer Use API when available |
| 29 | **browser-use/browser-use 94.1k★** | L2.5a | Browser automation — install when web-scraping use-case lands |
| 30 | **pipecat-ai/pipecat 12.2k★ + native CC plugin** | L2.5c | Voice agent CC plugin path |
| 31 | **Portkey-AI/gateway** | L4.75 | Multi-account orchestration + budget enforcement (operator mentioned multi-max-accounts) |
| 32 | **Helicone/helicone (Rust Gateway beta)** | L4.75 | Observability complement to Portkey |
| 33 | **comet-ml/opik (Apache)** | L4 | Phoenix ELv2 alternative observability path |
| 34 | **traceloop/openllmetry** | L4 | OTel-native LLM telemetry |
| 35 | **Promptfoo (via /plugin install promptfoo per fix5)** | L4 | T2-community-plugin (was T5 — fix5 upgrade) |
| 36 | **NVIDIA/garak** | L0.5 | LLM red-team eval |
| 37 | **InvariantLabs-AI/mcp-scan → snyk/agent-scan** (renamed per fix5) | L0.5 | MCP security audit |
| 38 | **microsoft/presidio + protectai/llm-guard** | L0.5 | PII NER + content guards |
| 39 | **markitdown (Microsoft)** | L4.5 | Document ingestion pilot |
| 40 | **Docling (IBM 58.6k★)** | L4.5 | Doc-conversion 0.882 vs MarkItDown 0.589 |
| 41 | **MinerU 2.5-Pro VLM** | L4.5 | PDF SOTA 95.69 arxiv-benchmark |
| 42 | **mintlify/writer + Vale** | L5-doc-gen | Doc-lint canonical CC pairing |
| 43 | **Stryker (JS) + cosmic-ray (Py) + pitest (Java)** | L4-mutation | Pre-ship mutation testing gate |
| 44 | **OpenRewrite (Apache)** | L5-refactor | 3.5k+ recipes Java modernization |
| 45 | **gepa-ai/gepa (ICLR-2026 Oral)** | L5 | Reasoning primitive — 6% avg / 20% max with 35× fewer rollouts |

## DECISION 4: PHASE 3 INSTALL-NEXT-MONTH (specific use-cases)

| # | Repo | Layer | Use-case gate |
|---|---|---|---|
| 46 | **anthropic/anthropic-quickstarts 16.6k★ (Computer Use)** | L2.5b | When computer-use workflow needed |
| 47 | **QwenLM/Qwen3-VL 19.2k★ (Apache)** | L2.5f | When VLM-for-code workflow needed |
| 48 | **trycua/cua 16.8k★** | L0.75+L2.5c | When sandboxed agent UI needed |
| 49 | **deeplethe/forkd (Alpha 214★ 101ms N=100)** | L0.75 | When microVM fan-out needed; KVM-only Linux |
| 50 | **firecracker-microvm/firecracker v1.15** | L0.75 | When code-execution sandbox needed |
| 51 | **vLLM 80k★ OR omlx 14.3k★** | L0.25 | When local-inference needed (NVIDIA vs Apple) |
| 52 | **EveryInc/compound-engineering 16.8k★** | L2.2 | Methodology — install when team-orchestration needed |
| 53 | **shareAI-lab/learn-claude-code 53k★** | L2.2 | Methodology — when CC training needed |
| 54 | **Bake-off: LangGraph vs PydanticAI vs CrewAI vs Agno** | L6.8 | Agent framework — pick one |
| 55 | **Conductor (native MCP+14 LLM)** vs **Inngest (built-in MCP)** | L5.7a/b | Durable execution bake-off |

## DECISION 5: STUDY-PILOT (7-day pilot before commit)

| # | Repo | Layer | Reason for pilot-first |
|---|---|---|---|
| 56 | **supermemoryai/supermemory** | L0.2 | Install via `npx skills add` (corrected fix3+fix5); benchmark before promote |
| 57 | **thedotmack/claude-mem 76k★** | L0.2 | Canonical scores 49 quarantine; resolve via Probe-DAG before STUDY-PILOT promote |
| 58 | **pgvectorscale (11.4x Qdrant Q1 2026 claim)** | L0.0 | Vendor benchmark — verify independently |
| 59 | **MemPalace/mempalace 52k★** | L0.2 | NEW Q2-2026 ★-velocity 1276/day — benchmark claims need audit |
| 60 | **MemTensor/MemOS 9.1k★** | L0.2 | NEW from Tranche F |
| 61 | **ag2ai/ag2 4.5k★** | L6.8 | AutoGen v2 successor — supersedes original AutoGen REJECT R2 |
| 62 | **google/adk-go 7.9k★** | L6.8 | Go-tier agent framework |
| 63 | **JetBrains/koog 4.1k★** | L6.8 | JVM-tier agent framework |
| 64 | **letta-ai/claude-subconscious 2.7k★** | L0.2 | NEW CC-explicit integration |
| 65 | **HelixDB/helix-db (AGPL)** | L0.1 | KG+Vector hybrid - vendor-bench only |
| 66 | **SurrealDB 32.1k★ (BSL→Apache)** | L0.1 | Multi-model collapse (Graphiti+FalkorDB+Qdrant → 1) — verify migration path |
| 67 | **DBOS-Transact-Py 1.4k★ + Restate** | L5.7c+b | Durable execution Postgres+Sidecar |
| 68 | **Hatchet 7.2k★** | L5.7c | Postgres DAG + priority lanes |
| 69 | **L2.6 Vertical Agents**: HolmesGPT 70/80 CNCF + BioMCP 72/80 + deer-flow 72/80 + stacklok/toolhive 71/80 + WrenAI | L2.6 | Per-vertical use-case-pending |
| 70 | **anthropics/cwc-long-running-agents** | L5 | STUDY-PATTERN-EXTRACT (NOT install per fix1) — example configs not turnkey |

## DECISION 6: DEFER-NEXT-QUARTER

| # | Repo | Why deferred |
|---|---|---|
| 71-80 | Claude Managed Agents · UI-TARS-desktop · Mastra.ai · A2A v1.0 spec · Composio MCP · Live-SWE-agent · mini-SWE-agent · ralph (REPLACE-with-Anthropic-quickstarts) · PraisonAI · memU · misc Q2-2026 P3 | Use-case-pending OR D6 borderline OR D10 staler-than-incumbent |

## DECISION 7: REJECT-PERMANENT

| # | Item | Reason |
|---|---|---|
| 81 | **kuzudb/kuzu** | ARCHIVED 2025-10 (5-source convergence) |
| 82 | **claude-flow / ruflo (51.6k★)** | swarm 0/3 axes + zero T2 + zero production |
| 83 | **microsoft/autogen original** | MAINTENANCE; deprecated → use ag2ai/ag2 successor instead |
| 84 | **LangChain (as primary framework)** | Multiple production post-mortems — use LangGraph successor |
| 85 | **Devin standalone** | Cognition's own Jan 2026 pivot admits under-delivered |
| 86 | **Roo Code** | ARCHIVED 2026-05-15 |
| 87 | **stackblitz/bolt.new (OSS)** | 17 months stale; product is closed-source |
| 88 | **FoundationAgents/MetaGPT** | 4 months cooling; pattern-source only |
| 89 | **Daytona / Skyvern / OpenInterpreter/01** | AGPL-3.0 license blockers |
| 90 | **firecrawl-core (AGPL — not wrapper)** | AGPL hard blocker (only MCP wrapper permissive) |
| 91 | **Volcengine/OpenViking** | AGPL-3.0 BLOCKED |
| 92 | **claude-squad (smtg-ai)** | AGPL-3.0 |
| 93 | **trufflehog** | AGPL-3.0 + duplicate of gitleaks |
| 94 | **conductor (anysphere)** | Probe 5 HARD-GATE "Ask ONE question per turn" violation |
| 95 | **github/semantic** | ARCHIVED 2019-08-26 |
| 96 | **comby-tools/comby** | STALE since 2022-06 — ast-grep supersedes |
| 97 | **qodo-cover** | UNMAINTAINED since 2025-06-15 |
| 98 | **Sourcegraph Cody Free/Pro** | TERMINATED July 2025 (only Enterprise $59/user remains) |
| 99 | **Phind** | UNVERIFIED shutdown — flag pending; treat as DEFER |
| 100 | **WSHobson DEMOTED-DUPLICATE 5 plugins** (identical SHA to context-management + debugging-toolkit + tdd-workflows + comprehensive-review + error-debugging) | kiss-dry-yagni Must-Never #4 |
| 101 | **2026-03-31 fraud cluster** (10+ Claude-Code-clones + leaked-source + TOS-evasion) | Tranche I detection |
| 102 | **microsoft/playwright-mcp (as-is)** | NOT superseded but README downranks for coding-agents — EVALUATE migration on agent-specific basis (not blanket SUPERSEDE) |
| 103 | **claude-hud (as-is)** | SUPERSEDED-BY claudia-statusline per sibling Stream W |
| 104 | **All v25-v61, v63, v64 kit unzipped trees** | Cohort 7 STRUCTURAL REJECT — keep zips at _archives, retain v62 + v65 only |
| 105 | **Braintrust-claude-plugin + autoevals + mattpocock/sandcastle + spillwavesolutions/parallel-worktrees** | v62-only, never replicated |
| 106-120 | **14 confirmed-NEGATIVE hallucinations** (kentcdodds/grace, openai/swarm-evals, microsoft/RoseLynn, anthropics/docs-tools, vercel/vitalik, Codenoir, AnthropicAdvisor, Same.dev, AnyClue, Continue Saturn, codeintelinc/gitnexus, sourcegraph/cody repo, AGNTCY-Cisco-standalone, RoboCorp/sema4) | Confirmed-NOT-EXIST via GraphQL probe |

## DECISION 8: CITE-ONLY (reference patterns, never install)

| # | Item | Reason |
|---|---|---|
| 121 | **x1xhlol/system-prompts-and-models-of-ai-tools** 137k★ | R4 audit substrate (commercial agent prompt extracts) — clone read-only at Z:/repos/deps/ |
| 122 | **abi/screenshot-to-code** 72.6k★ | Pattern-extract for screenshot→component skill |
| 123 | **affaan-m/everything-claude-code** 184k★ | Discovery surface, not primitive |
| 124-130 | **awesome-list aggregators** (hesreallyhim 43.9k **[FIX8-TRANCHE-J: CC-BY-NC-ND-4.0 CONSULT-ONLY-NO-FORK — non-commercial + no-derivatives]** + sickn33 37.7k + VoltAgent 21.9k + buildwithclaude 2.9k + jeremylongshore 2.1k + rohitg00 1.7k + Prat011 1.2k + n-skills 981) | L2.8 discovery only (no install at oracle-tier) |
| 131-140 | **Closed-source commercial agents** (kapa/Gong/Harvey/Hippocratic/Bloomberg/Lemonade + Cursor/Phind/Augment/Windsurf — CITE patterns only) | Cannot install closed-source |
| 141-150 | **L6 Pattern-Cite** demoted libraries (Reflexion, ToT, Voyager, STaR) | Patterns survive via LangGraph+DSPy; libraries stale >180d |

---

## DECISION SUMMARY

| Phase | Count | Action |
|---|---|---|
| **Phase 0 INSTALL-NOW** (this week, zero-cost) | 10 | Execute by 2026-05-23 |
| **Phase 1 INSTALL-NOW** (this week, light infra) | 15 | Execute by 2026-05-23 |
| **Phase 2 INSTALL-NEXT-MONTH** | 20 | Execute by 2026-06-16 |
| **Phase 3 INSTALL-NEXT-MONTH** (use-case gated) | 10 | Execute when use-case triggers |
| **Phase 4 STUDY-PILOT** | 15 | 7-day pilots before commit |
| **DEFER-NEXT-QUARTER** | ~10 | Re-evaluate next quarter |
| **REJECT-PERMANENT** | ~40 (incl. fraud cluster, hallucinations, license blockers, deprecated) | Documented as final |
| **CITE-ONLY** | ~25 | Reference only |

**Total decisive calls**: ~145 individual decisions made.

## NEXT-SESSION RECOMMENDATIONS (operator should execute)

1. **`git add docs/grand-synthesis-2026-05-16/` + commit** — 1,400+ files / 26 MB ready
2. **Execute Phase 0 INSTALLs** (operations 1-10) — should take ~2 hours total
3. **Execute Phase 1 INSTALLs** (operations 11-25) — should take ~4 hours
4. **Run L5.7 Durable Execution bake-off** (Conductor vs Inngest vs Hatchet+DBOS)
5. **Run L2.6 Vertical Agents bake-off per-vertical** (start Security with 71/80 cluster)
6. **Update sota-installed-manifest.md** with 7 fix-forward corrections
7. **Update CLAUDE.md** with codex CLI v1.0.4 + GitNexus org correction + Anthropic auto-mode migration
8. **Schedule 15th codex T1 audit** ONLY if user requires CR-3 strict re-verify post-operator-decisions (NOT recommended — audit fatigue is real per #14's own flag)

---

## STATUS

**OPERATOR DECISIONS — V-FINAL — DELIVERED.** All 145 install/study/reject calls made decisively without further deferral. Operator (or operator-acting-agent) can execute Phase 0-1 immediately.

**Authority chain**: User directive 2026-05-16 19:45 PT "that are your decisions to make" → this operator-decisions document → executable install plan.

## §UPDATE-4 — FIX10 RETRACTIONS (post final 4 deep-sat forks 2026-05-16 22:30)

**Major retractions** from L0.0 Vector / L0.1 KG+L0.3 RAG / L0.25 Local Inference / L1.0+L6.8 Gateway+Framework deep-sats:

**vanna-ai/vanna ARCHIVED** → REMOVE from L2.6 Vertical SQL Top INSTALL (was decisive INSTALL per Tranche H). Find replacement next session.

**microsoft/graphrag REJECTED** per its OWN upstream warning ("indexing is expensive") → **L0.3 SOTA = LightRAG + Graphiti hybrid** (not graphrag)

**Other ARCHIVED confirmations**: truefoundry/cognita · NVIDIA/ChatRTX · Azure-Samples/graphrag-accelerator (all archived this 2026)

**Security warnings (critical)**:
- chroma-mcp UNPATCHED SQL-injection 2026-04 → DEFER until patched
- Milvus CVE-2026-26190 → verify patch level before install

**Star-pump CAUTION-FLAGS** (reference-only pending independent verification):
- safishamsi/graphify (48k★ in 5 weeks = ~1370/day)
- tirth8205/code-review-graph (16k★ in 10 weeks) — "suspiciously ideal 100% recall"
- kyegomez/OpenMythos (13k★/5 commits)
- GammaLabTechnologies/harmonist (1.7k★/2 commits)
- coreyhaines31/marketingskills (28.9k★)

**L6.8 Agent Framework SOTA — UPDATED (not 4-way tie)**:
- **PydanticAI PRIMARY** (Python type-safe production)
- **LangGraph SECONDARY** (state-machine orchestration)
- **Agno TERTIARY** (multimodal)
- **ComposioHQ TOOL-LAYER** (universal 250+ tools)
- **CrewAI NOT-INSTALL** (role-DSL lock-in)
- Per-language: TS=vercel/ai · Go=adk-go · JVM=koog

**L0.0 Vector NEW SOTA**:
- pgvectorscale 11.4x Qdrant CONFIRMED at 99% recall (but Qdrant wins latency p50/p95/p99)
- **Turbopuffer** = SOTA cloud-managed cost-architecture (Cursor/Notion/Linear use it, $10/mo @ 1.5k-dim 1M reads)
- Turso+libsql w/ DiskANN-native vector (sleeper)

**L0.25 Local Inference NET-NEW INSTALL candidates**:
- mudler/LocalAI (35k★)
- jan-html/jan + menloresearch/cortex.cpp
- mlc-ai/mlc-llm + web-llm (cross-platform/WebGPU)
- intel/ipex-llm
- predibase/lorax (multi-LoRA)
- InternLM/lmdeploy (TurboMind)
- gpustack/gpustack (multi-backend manager)

**L0.1/L0.3 NEW INSTALL set**:
- L0.1 KG Top-3: Graphiti incumbent + cognee + FalkorDB-as-backend
- L0.3 RAG Top-3: Haystack + LightRAG + UltraRAG (MCP-native)
- nano-graphrag/fast-graphrag = SOTA convergence proving microsoft/graphrag is too expensive

## §UPDATE-3 — FIX9 RETRACTIONS (post L1.5+L4.5 deep-sat 2026-05-16 21:45)

**CRITICAL retractions from L1.5+L4.5 deep-sat fork**:

**7 NEW HALLUCINATIONS confirmed** (were in prior V-FINAL drafts but DID NOT RESOLVE on GitHub probe today):
- microsoft/acon (NOT FOUND)
- ace-agent/ace (NOT FOUND)  
- **rtk-ai/rtk (NOT FOUND — was claimed as L1.5 INSTALL incumbent — MAJOR retraction)**
- buildoak/wet (NOT FOUND)
- yvgude/lean-ctx (NOT FOUND)
- chopratejas/headroom (NOT FOUND)
- junhoyeo/tokscale (NOT FOUND)

**ACTION**: Remove these from any active L1.5 install plan. Replace with VERIFIED:
- **context-mode** (mksglu/context-mode 14.9k★ — VERIFIED incumbent)
- **caveman** (JuliusBrussee/caveman 60.9k★ MIT VERIFIED — promote to L1.5 PRIMARY INSTALL T1)
- **claw-compactor** (open-compress/claw-compactor 2.2k★ STUDY-PILOT)
- **leanctx** (jia-gao/leanctx 234★ wraps LLMLingua-2 STUDY-PILOT)
- **microsoft/LLMLingua + LLMLingua-2** (existing TIER-1)

**L4.5 corrections**:
- **marker 35.1k★ GPL-3.0** = REJECT-PERMANENT (DO-NOT-INSTALL — license-blocker)
- **MinerU has commercial threshold** (MAU >100M or rev >$20M) — operator UNDER threshold so OK; document this caveat
- **mineru-team/MinerU → opendatalab/MinerU** (correct owner)
- **docling-mcp 616★ FIRST-PARTY MCP** — clean install path for Docling

**L4.5 doc-ingestion bake-off recommendation** (12-16hr effort):
- 5 engines × 4 doc categories: MinerU (Apache w/ caveat) · Docling (Apache) · markitdown (Microsoft) · PaddleOCR (Apache) · ~marker REJECT-GPL~

**L1.5 token-compression bake-off recommendation** (~6hr effort):
- 5 verified primitives only: context-mode + caveman + claw-compactor + leanctx + LLMLingua-2

## §UPDATE-2 — DEEP-SAT additions (post 6 per-layer forks)

**Operator feedback addressed** ("memory MCP and much more layers not fully covered"): 6 per-layer DEEP-SATURATION forks dispatched targeting L0.2 / L0.MCP / L0.4 / L4 / L0.5 / L0.6+L5.5. **320 net-new repos scored**. 25 NEW INSTALLs to add to Phase 0/1/2.

See: [`00-MASTER/DEEP-SAT-AGGREGATED-DELTA-2026-05-16.md`](DEEP-SAT-AGGREGATED-DELTA-2026-05-16.md) for full deep-sat findings.

**Highest-fitness NEW Phase 0 ADDs** (license-clean, native-MCP):
- **chunkhound/chunkhound** (1.3k★ MIT, native MCP, ships Opus 4.7/4.6/Sonnet 4.6 defaults — HIGHEST FITNESS for this runtime)
- **supermemoryai/claude-supermemory** (2.5k★ TIER-1 official `/plugin install`)
- **raine/workmux** (MIT, native `claude plugin marketplace add` integration — ONLY one with literal CC marketplace integration)
- **chrome-devtools-mcp** (80/80 Google OFFICIAL)
- **googleapis/mcp-toolbox** (78/80 Apache Google)
- **automazeio/ccpm** (8.1k★ MIT pure skill)

**Architecture updates**:
- L0.2 Memory MCP → SPLIT into 5 sub-lanes (vector/KG/agent-state/conversation-history/RAG+cache)
- L0.5 Security → SPLIT into 4 sub-lanes (SECRETS/SUPPLY-CHAIN-SIGN/AGENT-AUDIT/AGENT-DEFENSE)
- L0.6 Worktree+Parallel → SPLIT into 3 sub-lanes (runner/orchestrator/terminal-mux)
- L4 Eval+Obs → **RETAIN Phoenix as incumbent** (3 Claude-Code-unique substrates competitors lack); Opik STUDY-PILOT alongside
- L5.5 → 5-class dispatch-strategy taxonomy NEW (Phase-routed/Reviewer-fan-out/Issue-routed/Tier-routed/Lock-coordinated)

**Verified renames + retractions**:
- mem0-mcp ARCHIVED → use elvismdev/mem0-mcp-selfhosted
- protectai/rebuff confirmed ARCHIVED
- ShebinKMohan/Grove NOT FOUND (likely misnomer)

## §UPDATE — FIX8 from Tranche J license deep-probe

**Tranche J license deep-probe confirmed ZERO install-blockers for Phase 0/1 INSTALLs**:
- 11/15 confirmed MIT (obra/superpowers + wshobson/agents + addyosmani/agent-skills + EveryInc/CE + davepoon/buildwithclaude + ordinary9843/cc-auditor + VoltAgent + sickn33 + anthropics/quickstarts/code-action/cwc + CopilotKit)
- 2/15 confirmed Apache-2.0 (ChromeDevTools/chrome-devtools-mcp + anthropics/cwc-long-running-agents — verified)
- 2/15 Creative Commons (with reclassifies above):
  - hesreallyhim/awesome-claude-code → CC-BY-NC-ND-4.0 → **CONSULT-ONLY-NO-FORK** (cannot install or derive)
  - trailofbits/skills-curated → CC-BY-SA-4.0 → **INSTALL-INDIVIDUAL-SKILLS-OK** (per-skill verify; bulk-index is ShareAlike-viral)

**Pattern insight**: GitHub search-API `license: null` = detector miss-rate (NOT license-absence). Direct LICENSE-blob fetch is authoritative for install-eligibility decisions.

**Phase 0/1 STATUS**: **LICENSE-UNBLOCKED, READY FOR EXECUTION**.

---

## §UPDATE-5 — fix13 GraphQL 12-axis FINAL deep-probe additions

**Method**: sota-researcher subagent ran 12 GitHub GraphQL searches over distinct layer axes, filtered corpus-overlap via Grep, returned 55 net-new ≥1k★ repos. **3/12 axes saturation-confirmed**, **9/12 axes uncovered ≥1 net-new candidate**.

### Phase 1-A STUDY-PILOT additions (10 new P0 candidates from GraphQL probe)

| # | Repo | Stars | Layer | License | Why STUDY-PILOT |
|---|---|---|---|---|---|
| P1 | **alibaba/zvec** | 9,633 | L0.0 | (verify) | In-process lightweight vector DB; 9.6k★ in 5 months |
| P2 | **Gentleman-Programming/engram** | 3,545 | L0.2 | (verify) | Agent-agnostic SQLite+FTS5 Go-binary MCP (2026-02 launch, 3.5k★ in 3mo) |
| P3 | **DeusData/codebase-memory-mcp** | 2,363 | L0.2/L0.4 | (verify) | 155-language C-binary, 99% token reduction claim **[MARKETING-LANGUAGE]** |
| P4 | **facebook/pyrefly** | 6,033 | L4.0 | MIT (assumed) | Meta fast Python typechecker LSP — pyright competitor |
| P5 | **SilasMarvin/lsp-ai** | 3,172 | L4.0 | (verify) | AI-in-LSP architecture pattern (rust-LSP) |
| P6 | **bytedance/Dolphin** | 8,977 | L4.5 | (verify) | ACL 2025 paper, anchor-prompted document parsing |
| P7 | **run-llama/liteparse** | 5,136 | L4.5 | (verify) | LlamaIndex team's self-host alt to LlamaParse cloud |
| P8 | **microsoft/agent-framework** | 10,479 | L6.0 | MIT (assumed) | Microsoft AutoGen successor (2025-04 launch) |
| P9 | **UfoMiao/zcf** | 5,994 | L2.0 | (verify) | Zero-config bootstrap for CC+Codex |
| P10 | **Mibayy/token-savior** | 855 | L0.2 | (verify) | Strongest single-axis claim (-77%/-76%/0 losses) **[VERIFY MARKETING-LANGUAGE]** |

### 2 NEW RETRACT-ARCHIVED (added to permanent REJECT list)

- `intel/ipex-llm` 8,803★ Apache-2.0 — ARCHIVED (vendor abandonment; was L0.25 candidate)
- `Mintplex-Labs/vector-admin` 2,228★ MIT — ARCHIVED (was L0.0 candidate)

### 3 AXES SATURATION-CONFIRMED (no further high-star searches recommended)

- **L1.0 LLM Gateway**: LiteLLM + Portkey + OpenRouter + Helicone cover field — ZERO net-new ≥2k★
- **L1.5 Token Compression**: LLMLingua + caveman + context-mode cover field — ZERO net-new ≥500★
- **L5.0 Security/CVE**: trufflehog + gitleaks + semgrep + bandit cover field — ZERO net-new ≥3k★

### Net-new bake-off recommendations (post-Phase 1)

1. **L0.2 Memory MCP triad bake-off**: engram (Go SQLite+FTS5) vs DeusData/codebase-memory-mcp (C 155-lang) vs Mibayy/token-savior (Python+MCP claim-strongest). All 3 PILOT-eligible; verify claims before any single-pick.
2. **L4.0 Python LSP bake-off**: pyrefly (Meta Rust) vs pyright (Microsoft TypeScript). Real-world latency on monorepos = decision criterion.
3. **L4.5 Doc-parsing extended bake-off**: original 5 (MinerU/Docling/markitdown/PaddleOCR/marker-REJECT) + new 2 (Dolphin/liteparse) = 6 engines.
4. **L6.0 Agent framework FINAL pick**: PydanticAI PRIMARY (fix10 verdict) vs microsoft/agent-framework (NEW fix13 candidate, AutoGen successor). May reshuffle framework lane.

### Handoff items

1. License verification ~25 `(verify)`-tagged repos via `mcp__github__get_file_contents` LICENSE probe
2. Per-repo SRA scoring for the 10 STUDY-PILOT candidates per D1-D10-SCORECARD-V-FINAL
3. Star-pump caution flags (`[POPULAR-BUT-UNVERIFIED]` on zvec 9.6k★/5mo, AionUi 25k★/9mo, oh-my-pi 4.6k★/4mo, tirth8205 16k★/2.5mo) — bake-off before any high-confidence INSTALL

Full data: `06-fresh-research-delta/GRAPHQL-FINAL-MISSING-2026-05-16.md` (55 candidates × D1/D6/D8 scored).

**Phase 1-A status**: 10 net-new P0 STUDY-PILOT candidates queued. Operator may opt to validate claims (especially MARKETING-LANGUAGE flagged) before promoting any to INSTALL.

---

## §UPDATE-6 — fix14b/14c/15/16/17/18 closing-wave (4 GraphQL deep-probes + verification)

### fix14b license-verify corrections (applied to §UPDATE-5)

- `bytedance/Dolphin` → **REJECT** (Qwen Research License = non-commercial only; was P0 STUDY-PILOT). Use Docling/MinerU/markitdown for L4.5 doc-parsing.
- `esengine/DeepSeek-Reasonix` → **DEFER** (AGPL-3.0 strong-copyleft).
- `SilasMarvin/lsp-ai` → **STUDY-PATTERN-ONLY** (16+ months STALE; Unlicense).
- Final fix13 P0 promote-eligible = **9** (not 10): zvec · engram · codebase-memory-mcp · token-savior · pyrefly · lsp-ai (pattern) · liteparse · agent-framework · zcf.

### fix14c hallucination audit — catalog quality grade B+ (0% pure hallucination)

5-row quarantine list: `haotian-liu/LLaVA-NeXT`→use LLaVA · `modal-labs/modal`→modal-client · `THUDM/CogAgent`→CogVLM · `CopilotKit/generative-ui`/`mistralai/client-python`→drop (below 1k tier).

### fix16 Chinese+Multilang — 7 NEW-P0 Phase 1-A STUDY-PILOT additions

| Repo | Stars | Layer | Why |
|---|---|---|---|
| isaacphi/mcp-language-server | 1,527 | L0.4 | **HIGHEST CC-FIT** — native MCP server giving CC LSP tools across any LSP language |
| Tencent/WeKnora | 15,069 | L0.3 | RAG + **self-maintaining Wiki** (Karpathy §5 gap-filler) |
| alibaba/page-agent | 17,877 | L2.5b | NL→GUI control via MCP |
| bytedance/trae-agent | 11,553 | L2.4 | SWE-agent bake-off candidate vs Aider |
| safishamsi/graphify | 48,519 | L0.4 | multi-CLI skill — `[MARKETING-LANGUAGE]` verify-first |
| Ataraxy-Labs/sem + weave | 2,006 + 1,007 | L0.4+L0.6 | semantic VCS + entity-level git merge for parallel agents |

### fix17 Niche 500-1k★ — 31 NEW-P0/P1, top 5 Phase 1-B STUDY-PILOT

| Repo | Stars | Layer | Why |
|---|---|---|---|
| modu-ai/moai-adk | 1,010 | L6.0 | SPEC-First CC ADK (24 agents+52 skills+TDD/DDD) — bake-off vs current install set |
| SecretiveShell/MCP-Bridge | 925 | L0.7 | openAI-compat MCP bridge for non-MCP clients |
| microsoft/prompty | 1,212 | L4 | MS-official prompt asset format + observability |
| iwe-org/iwe | 1,028 | L0.4 | LSP+MCP+PKM hybrid (novel) |
| cvs-health/uqlm + JudgmentLabs/judgeval | 1,150 + 1,035 | L4 | UQ-grounded hallucination detection + RL eval |

### fix18 Hardware/Runtime — 1 CATALOG-OMISSION + 5 NEW sub-layers

**CATALOG-OMISSION FIX (add to Phase 1)**:
- `mozilla-ai/llamafile` 24,449★ Apache-2.0 — single-file Cosmopolitan binary universal LLM runner. **Was missing from L0.25.** Clean license, established. INSTALL-eligible.

**5 NEW L0.25 sub-layers** (each needs a per-sublayer bake-off):
- §L0.25g Mobile-Edge: qualcomm/nexa-sdk 8k★ + cactus 4.9k★ + RunanywhereAI 10.3k★
- §L0.25h Quant-Tooling: intel/neural-compressor 2.6k★ + ModelCloud/GPTQModel 1.1k★
- §L0.25i Spec-Decode: SafeAILab/EAGLE 2.3k★ + Tencent/AngelSlim 1.2k★ + aphrodite-engine
- §L0.25j Sub-Watt: microsoft/BitNet 39k★ + alibaba/MNN 15k★ (NEW hardware-class — Pi/Jetson/RK3588)
- §L0.25k LoRA-Training: hiyouga/LlamaFactory 71k★ + modelscope/ms-swift 14k★ + huggingface/peft 21k★

### fix15 codex T1 cross-model audit

Verdict NEEDS-REVISION conf=0.84 — caught doc-sync propagation lag (now fixed). ZERO confirmed hallucinations in fix13 P0 set (codex independently web-verified 7/10). Saturation claims reworded as heuristic-not-proof. Full transcript: `05-codex-consults/codex_consult_fix13_audit_OUT-2026-05-16.txt`.

### Phase ordering for closing-wave candidates

- **Phase 1 ADD**: `mozilla-ai/llamafile` (catalog-omission, license-clean, established) — promote to INSTALL
- **Phase 1-A STUDY-PILOT**: fix16's 7 NEW-P0 (after license-verify on `(verify)`-tagged)
- **Phase 1-B STUDY-PILOT**: fix17's top-5 + fix18's 5 sub-layer anchors
- **Bake-off queue**: L0.25 5-sub-layer bake-off · L0.4 LSP-bridge (isaacphi vs serena) · L6.0 agent-framework (PydanticAI vs microsoft/agent-framework vs moai-adk)

**Closing-wave verdict**: ~123 net-new candidates from fix16-18. NONE promoted directly to Phase 0 — the stable 41-repo Phase 0/1 INSTALL core is unchanged. All closing-wave additions are STUDY-PILOT-tier pending per-repo bake-off + license-verify.
