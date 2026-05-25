# 01 — mem0ai/mem0 Anatomy (Fire 27-C)

> **Cite anchor (TIER-1-DIRECT)**: local clone `Z:/repos/deps/mem0/` HEAD `54a03cc7217c22afdc6153a9e61cc6413416001f` (v2.0.2; Apache-2.0; mem0ai TIER-2 Y-Combinator-S24-backed startup)
> **Probe method**: direct filesystem audit + codex T1 cross-verification + Anthropic official marketplace verification

## Repo metadata (verified via gh api 2026-05-10)

| Field | Value |
|---|---|
| Full name | `mem0ai/mem0` |
| License | Apache-2.0 (permissive) |
| Stars | **55,329** (HIGHEST in entire Wave 134 NEW-EXTENDED queue) |
| Forks | 6,269 |
| Open issues | 325 |
| Created | 2023-06-20T08:58:36Z (~23 months — Axis-3 STABLE-BURN-IN PASS firm) |
| Pushed | 2026-05-09T15:26:34Z (~1.5 days before audit) |
| HEAD SHA | `54a03cc7217c22afdc6153a9e61cc6413416001f` |
| HEAD msg | "chore(plugin): bump mem0 plugin to v0.1.2 (#5094)" |
| Language | Python + TypeScript (mem0-ts) |
| Repo size | 55,290 KB (well under 200MB Pattern B HNF threshold from Fire 27-B) |
| Owner | mem0ai Organization (TIER-2 startup) |
| Y Combinator | S24 batch (VC-validated) |
| PyPI | `mem0ai` v2.0.2 |

## D8 multi-contributor verification (top 10)

| Contributor | Commits | Role |
|---|---|---|
| Dev-Khant | 453 | mem0ai team |
| deshraj | 216 | mem0ai team |
| taranjeet | 205 | mem0ai team |
| whysosaket | 156 | mem0ai team |
| cachho | 104 | mem0ai team |
| deven298 | 91 | external/team |
| sidmohanty11 | 77 | external/team |
| prateekchhikara | 72 | external/team |
| kartik-mem0 | 71 | mem0ai team |
| parshvadaftari | 61 | external/team |

**D8 strong**: 10+ contributors with 60+ commits each. STRONG-PROVENANCE-EXPRESS predicate FIRES per codex T1 verdict.

## 🚨 Critical finding — mem0-plugin/v0.1.2 is SELF-PUBLISHED (NOT Anthropic official marketplace)

Codex T1 verified `anthropics/claude-plugins-official @ 00679aef889efe36bb0389f81d70b6229a2013ee` — mem0 is ABSENT from official tree.

Install path is community marketplace:
```
/plugin marketplace add mem0ai/mem0
/plugin install mem0@mem0-plugins
```

**Cloud-routed memory**: the plugin routes memory to `mcp.mem0.ai` external cloud storage. This is a **privacy + external-dependency** concern for eee local-first runtime.

Per CR-6 official-native-channel: Anthropic marketplace is canonical install channel; community marketplaces are NOT. This downgrades the install path from CR-12 PRIMARY/ALTERNATIVE to CITE-PATTERN-ONLY for mem0-plugin specifically.

## Architecture surface — 15+ top-level dirs (multi-platform ecosystem)

| Directory | Function | Audit scope |
|---|---|---|
| `mem0/` | Core Python package | IN-SCOPE |
| **`mem0-plugin/`** | **Claude Code plugin v0.1.2 (SELF-PUBLISHED)** | IN-SCOPE |
| `.claude-plugin/` | Claude Code plugin config | IN-SCOPE |
| `mem0-ts/` | TypeScript port | NOT-IN-SCOPE (Forward Discipline) |
| `embedchain/` | Embedchain integration | NOT-IN-SCOPE |
| `openclaw/` | OpenClaw integration | NOT-IN-SCOPE |
| `openmemory/` | OpenMemory backend | NOT-IN-SCOPE |
| `server/` | REST API server | NOT-IN-SCOPE |
| `cli/` | CLI tool | NOT-IN-SCOPE |
| `vercel-ai-sdk/` | Vercel AI SDK integration | NOT-IN-SCOPE |
| `skills/` | Skills directory | INSPECTED |
| `cookbooks/` | example notebooks | NOT-IN-SCOPE |
| `examples/` | examples | NOT-IN-SCOPE |
| `evaluation/` | evaluation harness | NOT-IN-SCOPE |
| `docs/` | documentation | NOT-IN-SCOPE |
| `tests/` | test suite | INSPECTED |
| `.cursor-plugin/` | Cursor IDE plugin | NOT-IN-SCOPE |

Plus root-level: `AGENTS.md` 24K + `CLAUDE.md → AGENTS.md` symlink + `LLM.md` 36K + `MIGRATION_GUIDE_v1.0.md` + `pyproject.toml` 3.2K + `poetry.lock` 894K (heavy dep tree).

## Dependencies analysis (verified by codex T1)

### Required (pyproject.toml `[project.dependencies]`)

- `qdrant-client>=1.12.0` — Qdrant as DEFAULT vector store
- `pydantic>=2.7.3`
- `openai>=1.90.0` — OpenAI as DEFAULT LLM
- **`posthog>=4.5.0`** — telemetry (disable via `MEM0_TELEMETRY=false`)
- `pytz>=2024.1`
- `sqlalchemy>=2.0.31`
- `protobuf>=5.29.6,<7.0.0`

### Optional `vector_stores` group (20+ backends)

qdrant + chromadb + cassandra + weaviate + pinecone + faiss + upstash + azure-search + psycopg + pymongo + pymilvus + redis + elasticsearch + langchain-aws — but **NO sqlite-vec backend** (codex verified)

### Optional `llms` group

groq + together + **litellm** + openai + ollama + vertexai + google-generativeai + google-genai

### Optional `extras` group (⚠️ ECOSYSTEM-IMPORT — Fire 27-B 5th-class candidate)

`langchain>=0.3.0` + `langchain-community` + `langchain-core>=0.3.81` + sentence-transformers + opensearch + fastembed + boto3

## Mia OVER catches by codex T1

### Mia OVER #1 — mem0-plugin marketplace VERIFIED SELF-PUBLISHED

**Orchestrator pre-audit**: "is mem0-plugin in Anthropic official marketplace?"
**Codex T1 verification**: directly probed `anthropics/claude-plugins-official @ 00679aef889efe36bb0389f81d70b6229a2013ee` — mem0 ABSENT.
**Resolution**: Community marketplace install path; CR-12 cr12_install_class downgraded from POTENTIAL-PRIMARY-INSTALL → CITE-PATTERN-ONLY for plugin specifically.

### Mia OVER #2 — sqlite-vec convergence ASSUMPTION REFUTED

**Orchestrator pre-audit**: assumed Fire 27-B sqlite-vec CONVERGENT pattern would apply
**Codex T1 verification**: mem0 vector_stores optional group does NOT include sqlite-vec; backend reuse NOT POSSIBLE
**Resolution**: Fire 27-B convergence finding does NOT generalize to all memory frameworks; mem0 requires Qdrant default OR chromadb fallback (no sqlite-vec path)

### Mia OVER #3 — PostHog telemetry mitigation DISCOVERED

**Orchestrator pre-audit**: "is PostHog telemetry mandatory?"
**Codex T1 verification**: REQUIRED dependency BUT disable-via-env at `MEM0_TELEMETRY=false` + `MEM0_TELEMETRY_SAMPLE_RATE=0`. Evidence: `mem0/memory/telemetry.py:14` (defaults true) + `:75-76` (disables PostHog client when false)
**Resolution**: Mitigation pattern documented for any pilot

### Mia OVER #4 — Anthropic Claude tool_use handling KNOWN-BROKEN

**Orchestrator pre-audit**: "does mem0 fully support Anthropic Claude?"
**Codex T1 verification**: Anthropic provider EXISTS for direct text generation BUT generic tool-call parsing only returns first text block — KNOWN-BROKEN for tool-use scenarios
**Resolution**: CAVEAT-CRITICAL — eee runtime uses tool_use extensively; mem0 Anthropic backend may not work for eee scenarios without targeted tool-call test

## Files codex T1 directly probed (sources_used from verdict)

- Local mem0 clone: `Z:/repos/deps/mem0 @ 54a03cc7`
- Official Anthropic plugin marketplace: `https://github.com/anthropics/claude-plugins-official @ 00679aef`
- YC company profile: `https://www.ycombinator.com/companies/mem0`
- GitHub metadata via `gh api repos/mem0ai/mem0`
- `Z:/repos/deps/mem0/pyproject.toml:20` (posthog required)
- `Z:/repos/deps/mem0/mem0/memory/telemetry.py:14,75-76` (telemetry disable evidence)
- `Z:/repos/deps/mem0/mem0-plugin/hooks/hooks.json:3-70` (lifecycle hooks)
- `Z:/repos/deps/mem0/mem0-plugin/scripts/on_user_prompt.sh:44-69`
- `Z:/repos/deps/mem0/mem0-plugin/scripts/on_pre_compact.sh:21-27,53-60`
- `Z:/repos/deps/mem0/mem0-plugin/scripts/block_memory_write.sh:28-31`
- `Z:/repos/deps/mem0/mem0/configs/prompts.py:472-486,694-701,1016-1042`
- `Z:/repos/deps/mem0/mem0/memory/main.py:701-745,1343-1364`

## Mia ladder advance

Pre-Fire-27-C: n=1832 (Fire 27-B close)
Post-Fire-27-C anatomy: **n=1843** (+11: D2+D8 pre-screen PASS + Forward Discipline tightened scope + mem0-plugin self-published verified + sqlite-vec NOT supported correction + PostHog disable-via-env discovered + Anthropic tool_use KNOWN-BROKEN finding + 7 plugin hook + prompt + memory file:line cite-patterns + 4 Mia OVERs resolved by codex T1 + cloud-routed memory privacy concern + 10-contributor multi-team verification + 15-dir multi-platform ecosystem catalogued + axis-1 STRONG-PROVENANCE-EXPRESS FIRES verified)
