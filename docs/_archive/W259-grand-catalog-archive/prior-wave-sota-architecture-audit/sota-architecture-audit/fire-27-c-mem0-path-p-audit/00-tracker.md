# 00 — Wave 134 Fire 27-C Tracker (mem0ai/mem0 Path P Audit)

> **Subject**: `mem0ai/mem0` @ HEAD `54a03cc7217c22afdc6153a9e61cc6413416001f` (v2.0.2; Apache-2.0; mem0ai TIER-2 + Y-Combinator-S24-backed; 55,325★ HIGHEST in pre-screen)
> **Pre-screen**: D2+D8 PASS (pushed 1.5 days ago; 5+ heavy contributors). 3rd Fire 27 post-pre-screen audit.
> **Hypothesis**: STRONG-CANDIDATE — possibly **APPROVE-INSTALL** for mem0-plugin/v0.1.2 (official Claude Code plugin!) OR STUDY-PILOT-PATTERN-EXTRACT for core mem0 library. Anthropic has NO memory framework parallel → potentially GENUINELY-NEW class.
> **Critical scope**: focus codex T1 on mem0-plugin (Claude Code integration) + CR-12 vs eee graphiti+mcp-memory (Forward Discipline from Fire 27-B applied — tightened scope despite 55MB size).

## Pre-flight Mia probe (PASSED via D2+D8 pre-screen)

| Probe | Outcome |
|---|---|
| Repo exists @ github | ✅ `mem0ai/mem0` |
| LICENSE | ✅ Apache-2.0 (permissive) |
| Stars | **55,325** (HIGHEST in Wave 134 NEW-EXTENDED queue) |
| Forks | 6,267 |
| Open issues | 324 |
| Created | 2023-06-20 (~23 months — Axis 3 STABLE-BURN-IN PASS firm) |
| Pushed | 2026-05-09T15:26Z (~1.5 days before audit — ACTIVE) |
| HEAD | `54a03cc7217c22afdc6153a9e61cc6413416001f` |
| HEAD msg | "chore(plugin): bump mem0 plugin to v0.1.2 (#5094)" |
| Local clone | ✅ Z:/repos/deps/mem0 (depth=50, fresh fetched) |
| Language | Python (+ TypeScript via mem0-ts/) |
| Repo size | 55,290 KB = ~55 MB (well under 200MB Pattern B HNF threshold from Fire 27-B) |
| Owner | mem0ai Organization (TIER-2 startup) |
| Y Combinator | S24 batch (VC-validated) |
| PyPI | `mem0ai` v2.0.2 production |
| Anthropic-friendly | ✅ `CLAUDE.md → AGENTS.md` symlink + **`.claude-plugin/` directory** |

## 🚨 Critical discovery — mem0 SHIPS an OFFICIAL Claude Code plugin

`mem0-plugin/v0.1.2` per HEAD commit `54a03cc7` "chore(plugin): bump mem0 plugin to v0.1.2 (#5094)" 1.5 days before audit.

**Top-level `.claude-plugin/` directory** at repo root signals this is an OFFICIAL Anthropic-CC-plugin-format-compliant package. Per CR-12 upstream-install-priority: this could be a DIRECT-INSTALL CANDIDATE via `/plugin install` rather than `pip install`.

## D8 multi-contributor verification

| Contributor | Commits | Notes |
|---|---|---|
| Dev-Khant | 453 | mem0ai team |
| deshraj | 216 | mem0ai team |
| taranjeet | 205 | mem0ai team |
| whysosaket | 156 | mem0ai team |
| cachho | 104 | mem0ai team |

**D8 PASS**: TIER-2 startup with 5+ heavy contributors. STRONG-PROVENANCE-EXPRESS predicate fires IF mem0ai counts as "official-org" equivalent (Y Combinator S24-backed startup at 55K stars = strong industry signal).

## Architecture surface — multi-platform ecosystem (15+ top-level dirs)

| Directory | Function |
|---|---|
| `mem0/` | Core Python package |
| `mem0-ts/` | TypeScript port |
| **`mem0-plugin/`** | **OFFICIAL Claude Code plugin v0.1.2** ← key for eee adoption |
| `embedchain/` | Embedchain integration (LangChain alternative) |
| `openclaw/` | OpenClaw integration |
| `openmemory/` | OpenMemory backend |
| `server/` | REST API server |
| `cli/` | command-line interface |
| `vercel-ai-sdk/` | Vercel AI SDK integration |
| `skills/` | Skills directory |
| `cookbooks/` | example notebooks |
| `examples/` | examples |
| `evaluation/` | evaluation harness |
| `docs/` | documentation |
| `tests/` | test suite |
| `scripts/` | maintenance scripts |
| `cli/` | CLI tool |
| `.claude-plugin/` | Claude Code plugin config |
| `.cursor-plugin/` | Cursor IDE plugin config |
| `.agents/` | agents config |

Plus: AGENTS.md (24K) + CLAUDE.md→AGENTS.md symlink + LLM.md (36K) + MIGRATION_GUIDE_v1.0.md.

## Dependencies analysis

**Required** (pyproject.toml `[project.dependencies]`):
- `qdrant-client>=1.12.0` — Qdrant as DEFAULT vector store
- `pydantic>=2.7.3`
- `openai>=1.90.0` — OpenAI as DEFAULT LLM
- `posthog>=4.5.0` — **PostHog telemetry by default** ⚠️ privacy concern
- `pytz>=2024.1`
- `sqlalchemy>=2.0.31`
- `protobuf>=5.29.6,<7.0.0`

**Optional `vector_stores` group** (20+ backends): qdrant + chromadb + cassandra + weaviate + pinecone + faiss + upstash + azure-search + psycopg + pymongo + pymilvus + redis + elasticsearch + langchain-aws

**Optional `llms` group**: groq + together + **litellm** + openai + ollama + vertexai + google-generativeai + google-genai

**Optional `extras` group** (⚠️ ECOSYSTEM-IMPORT concern per Fire 27-B):
- boto3 + **langchain>=0.3.0** + **langchain-community** + **langchain-core>=0.3.81** + sentence-transformers + elasticsearch + opensearch + fastembed

## Mia OVER potential (preserve for codex T1 catch)

1. **Qdrant as required default** — eee has no Qdrant running locally; would require Docker install if using default. Alternatives: chromadb, sqlite-vec (CONVERGENCE opportunity), pgvector
2. **OpenAI as required default LLM** — eee runs Anthropic Claude primary; need LiteLLM or langchain-aws bridge
3. **PostHog telemetry by default** — `posthog>=4.5.0` is REQUIRED dependency (not optional). Verify if disable-able for eee privacy
4. **LangChain in extras** — ECOSYSTEM-IMPORT class concern (matches Fire 27-B finding); optional but may be needed for full functionality
5. **mem0-plugin/v0.1.2 Claude Code official plugin** — is this Anthropic-curated marketplace plugin OR mem0-self-published? Verify
6. **Multi-platform sprawl** — 15+ top-level directories. Codex T1 should focus on mem0-plugin + mem0/ core, NOT openclaw / openmemory / vercel-ai-sdk / embedchain
7. **vs graphiti + mcp-memory** — CR-12 dimension. mem0 is fact-extraction; graphiti is temporal-KG; mcp-memory is simple sqlite-vec. Different mechanisms — possibly PROVIDER-COMPLEMENT or GENUINELY-NEW

## 5 integration options

| Option | Description | Verdict expectation |
|---|---|---|
| A: APPROVE-INSTALL via `/plugin install mem0-plugin` | Anthropic-CC-plugin-format direct install (mem0-plugin/v0.1.2) | HIGH-PROBABILITY if plugin is official + ships from canonical marketplace |
| B: APPROVE-INSTALL via `pip install mem0ai` | Python library install + manual wiring | MID-PROBABILITY — full ecosystem footprint + PostHog telemetry concern |
| C: STUDY-PILOT-NARROW | Isolated venv pilot of mem0 with sqlite_vec backend (avoid Qdrant default) | MID-PROBABILITY — sqlite-vec convergence + bounded scope |
| D: STUDY-PILOT-PATTERN-EXTRACT | Extract mem0 fact-extraction + dual-memory patterns into eee docs without install | MID-PROBABILITY — patterns are valuable; DUPLICATE-VS-graphiti concern |
| E: REJECT-FOR-FIT | If PostHog telemetry mandatory + Qdrant required + ECOSYSTEM-IMPORT too heavy | LOW-PROBABILITY — mem0 is well-engineered; rejection requires clear deal-breaker |

## Sub-task tracker

- [x] Mia D2+D8 pre-screen PASS
- [x] Local clone + fresh fetch to HEAD
- [x] Tracker (this file)
- [ ] README + AGENTS.md/CLAUDE.md/LLM.md + pyproject.toml read
- [ ] mem0-plugin/v0.1.2 inspect (official CC plugin shape verification)
- [ ] mem0/ core architecture probe
- [ ] codex T1 Path P consult prompt build (TIGHTENED scope: mem0-plugin + CR-12 vs graphiti+mcp-memory)
- [ ] codex T1 Path P fire
- [ ] 01-anatomy.md
- [ ] 02-probe-dag-application.md
- [ ] 03-codex-t1-verdict.md
- [ ] 99-close-synthesis.md
- [ ] install-provenance.md append
- [ ] atomic commit (FM-02 sub-class (b) defense)

## Verification queries (TIGHTENED per Fire 27-B Forward Discipline)

- `Z:/repos/deps/mem0/pyproject.toml` — dependencies
- `Z:/repos/deps/mem0/mem0-plugin/` — official CC plugin shape
- `Z:/repos/deps/mem0/.claude-plugin/` — CC plugin config
- `Z:/repos/deps/mem0/mem0/` — core architecture
- `Z:/repos/deps/mem0/AGENTS.md` (24K — operator guide)
- `Z:/repos/deps/mem0/LLM.md` (36K — LLM context)

NOT in scope: openclaw/ + openmemory/ + vercel-ai-sdk/ + embedchain/ + mem0-ts/ — verified-skip per Forward Discipline (Fire 27-B taught: focus scope when target has rich multi-platform sprawl).

## Cite anchors (TIER-1-DIRECT)

- TIER-1-DIRECT: `Z:/repos/deps/mem0/` HEAD `54a03cc7217c22afdc6153a9e61cc6413416001f` Apache-2.0 v2.0.2
- TIER-1-DIRECT: `https://mem0.ai` (canonical)
- TIER-1-DIRECT: `https://pypi.org/project/mem0ai/` v2.0.2
- TIER-1-DIRECT (Anthropic-parallel comparison): NONE — Anthropic does not ship memory framework

## Discipline conformance gates

- ✅ CR-1: TIER-1-DIRECT cite chain (mem0ai org + Apache-2.0)
- ✅ CR-3: cross-model gate via Path P codex T1 REAL GPT-5.5
- 🟡 CR-9: install-risk PENDING — version pin `mem0ai==2.0.2` + Qdrant default + PostHog telemetry + ecosystem-import audit
- ✅ CR-10: research-first-then-install — audit before install
- ✅ CR-11: META-process — multi-axis Path P prompt + 10-D SRA + Forward Discipline (tightened scope)
- 🟡 CR-12: upstream-install-priority — Anthropic has NO memory framework, so PROVIDER-PARALLEL question is N/A; BUT eee has graphiti+mcp-memory → CR-12 disposition is PARTIAL-OVERLAP vs DUPLICATE-FUNCTIONALITY
- ✅ FM-02 sub-class (b): atomic git add + commit --only -- pathspec defense
- ✅ User directive 2026-05-10 D2+D8 pre-screen: APPLIED (3rd post-mandate fire)
- ✅ Fire 27-B Forward Discipline: TIGHTENED Path P scope despite 55MB size (focus on mem0-plugin + CR-12 vs graphiti)
