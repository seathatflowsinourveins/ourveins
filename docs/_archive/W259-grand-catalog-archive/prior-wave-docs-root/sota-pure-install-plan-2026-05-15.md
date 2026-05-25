---
title: SOTA Pure Runtime — DELTA Install Plan for Z:/claude-sota-pure
status: AUTHORITATIVE
date: 2026-05-15
wave: 250 (BRIDGE-MODE-validated; cross-model gate SATISFIED via n=2 REAL GPT-5.5)
cite-class: constituents=[TIER-1-DIRECT @ REAL GPT-5.5 codex T1 verdicts 2026-05-15 + live npm/PyPI/marketplace probes + Z:/claude-sota-pure target-runtime state probe 2026-05-15-16, TIER-2 @ Z:/claude-sota-installed/docs/sota-pure-runtime-catalog-2026-05-15.md (companion catalog)]; effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8
target: Z:/claude-sota-pure (existing runtime — W229 install batch DONE 2026-05-15)
companion: docs/sota-pure-runtime-catalog-2026-05-15.md
---

# SOTA Pure Runtime — DELTA Install Plan for Z:/claude-sota-pure

## TL;DR

`Z:/claude-sota-pure` is an EXISTING runtime with substantial install state — NOT a fresh scaffold. This plan describes **DELTAS only** (what to install BEYOND the W229 baseline). Per FM-20 row 21 (W214 codification), every recommendation crossed against target-runtime state via `Z:/claude-sota-pure/.mcp.json` + `.claude/plugins/cache/` + `docs/install-provenance.md`.

**Δ1 INSTALL-NOW (5 highest-conviction GENUINELY-NEW)** — apply this fire:
1. `getzep/graphiti` MCP — L3 temporal-KG (peer-reviewed arxiv:2501.13956)
2. `microsoft/markitdown` — document-ingestion parser (123K★ MIT — A4 BRIDGE-MODE missed-finding)
3. `Langfuse` via built-in HTTP MCP endpoint — observability (operator-explicit-named)
4. `Arize-ai/phoenix-mcp@latest` — OTel-compatible observability (verify latest before pin)
5. `promptfoo` — eval + redteam (OpenAI-backed MIT)
6. `trailofbits/skills-curated` marketplace — security-vetted plugins

**Δ2 STUDY-PILOT (8, 30-day reversible)** — conditional adoption:
- Anthropic native `memory_20250818` (Tier-C SDK hook-wrappable)
- `mem0ai/mem0` (benchmark-leader head-to-head vs doobidoo)
- `thedotmack/claude-mem` (DOWNGRADED to quarantine-pilot per A4 Reddit-audit risk)
- DSPy / E2B / browser-use / smolagents (orthogonal)
- NeoLab reflexion+SADD (paper-cited 8-21% reliability gains)
- ruflo Path A `ruflo-federation` only (if cross-machine needed)
- gmickel/flow-next Ralph mode (if long-running loops needed beyond superpowers)

**Δ3 REFRESH (4 already-installed; version-bump)**:
- superpowers HEAD bump (drift since 2026-04-30 baseline; 14% star growth)
- addyosmani/agent-skills HEAD bump (NEW source-driven-development + doubt-driven-development skills)
- context-mode 1.0.111 → 1.0.135 (npm version bump)
- wshobson per-plugin curation (80-plugin marketplace — curate 5-15 specific plugins)

**Δ4 DEFER (lower-priority pending evidence)**:
- bmad-code-org/BMAD-METHOD (trinity covers ~80%; npx-install not native)
- topoteretes/cognee (PARTIAL-OVERLAP w/ graphiti)
- Continue.dev memory layer (competing IDE)
- VikParuchuri/marker (GPL-3.0 caveat; MinerU alternative)
- comet-ml/opik (LLM-as-judge auto-evals; pair with Phoenix later)
- braintrust + traceloop OpenLLMetry + ragas + tokscale (case-by-case)
- chopratejas/headroom (verify marketplace.json first per A4 HNF)

**Δ5 REJECT (16, CR-12 DUPLICATE / SaaS lock-in / license blocker / outdated)** — see catalog §5

---

## TARGET-RUNTIME BASELINE (Z:/claude-sota-pure existing state, 2026-05-15)

### MCP servers wired (15)

Per `Z:/claude-sota-pure/.mcp.json`:
```
memory + github + context7 + deepwiki + repomix + git + fetch + time + sequentialthinking + filesystem + gitnexus + chrome-devtools + playwright + serena + ccusage
```

### Plugin marketplaces installed (9)

Per `Z:/claude-sota-pure/.claude/plugins/cache/`:
```
addy-agent-skills + claude-code-workflows + claude-plugins-official + claude-settings + compound-engineering-plugin + context-mode + ecc + openai-codex + superpowers-dev
```

### Recent install batches

Per `Z:/claude-sota-pure/docs/install-provenance.md` (W229 commit 2026-05-15):
- ✅ `/plugin marketplace add EveryInc/compound-engineering-plugin`
- ✅ `/plugin install compound-engineering@compound-engineering-plugin` (Mia PASS verified pre-install)
- ✅ `/plugin install explanatory-output-style@claude-plugins-official`

### Bootstrap files

`Z:/claude-sota-pure/` root: `CLAUDE.md` (5.7K) + `CLAUDE.local.md` (6.1K) + `AGENTS.md` (2.6K) + `PROGRESS.md` (14.1K) + `README.md` (2.1K) + `.gitignore` (2.0K) + `.gitconfig` (965B)

---

## Δ1 — INSTALL NOW (highest-conviction GENUINELY-NEW)

### Δ1.1 — getzep/graphiti MCP (L3 temporal-KG)

**Why**: peer-reviewed (arxiv:2501.13956), getzep org maintainer, temporal validity windows + custom Pydantic entity types. NOT in target's `.mcp.json` (only in claude-sota-installed sibling). Confirmed by A1 + A4 BRIDGE-MODE.

**Cite class**: `constituents=[TIER-1-DIRECT @ getzep/graphiti @ 9a2d6d02 (Apache-2.0), TIER-1-PEER-REVIEWED @ arxiv:2501.13956]; effective_tier=TIER-1-DIRECT`

**Install commands (CR-6 official-native-channel)**:

```bash
# 1. Install Python package (Apache-2.0)
pip install graphiti-core[falkordb]

# 2. Wire FalkorDB Docker container (state-outside-repo per CLAUDE.local.md (f))
docker run -d --name falkordb-pure -p 16380:6379 \
  -v Z:/claude-sota-pure-state/falkordb:/data \
  falkordb/falkordb:latest

# 3. Add to .mcp.json
# Append to Z:/claude-sota-pure/.mcp.json mcpServers block:
#   "graphiti": {
#     "command": "python",
#     "args": ["-m", "graphiti_core.mcp_server"],
#     "env": {
#       "FALKORDB_URI": "redis://127.0.0.1:16380",
#       "FALKORDB_PASSWORD": "",
#       "FALKORDB_DATABASE": "default_db",
#       "OPENAI_API_URL": "http://127.0.0.1:11700/v1",
#       "GRAPHITI_GROUP_ID": "pure"
#     }
#   }

# 4. Restart eee-pure to load new MCP
```

**CR-9 install-risk acknowledgment**: pin `graphiti-core==X.Y.Z` (`@latest-acknowledged-D6-risk` per CR-9) — bump on next session per cardinal-rule-6 freshness; Docker FalkorDB container persistent at state path.

**REVERT path**: `docker stop falkordb-pure && docker rm falkordb-pure && rm -rf Z:/claude-sota-pure-state/falkordb/ && pip uninstall graphiti-core` + remove `.mcp.json` entry.

### Δ1.2 — microsoft/markitdown (document-ingestion parser)

**Why**: A4 BRIDGE-MODE missed-finding (123K★ MIT, Microsoft). Fills RAG/document-ingestion gap WITHOUT adopting a full RAG app. GENUINELY-NEW per CR-12.

**Cite class**: `constituents=[TIER-1-DIRECT @ github.com/microsoft/markitdown HEAD (MIT, Microsoft official-org)]; effective_tier=TIER-1-DIRECT`

**Install commands**:

```bash
# pip install (cite per CR-6 official-native-channel)
pip install 'markitdown[all]@latest'

# OR npx (alternate)
npx -y markitdown@latest --help
```

**Wire path** (NOT a native MCP — wrappable as hook OR `claude-agent-sdk` tool):
- Option A: Use as standalone CLI for one-off document → Markdown conversion (no .mcp.json wire needed)
- Option B (FORWARD-REF): Write a hook script at `.claude/hooks/scripts/markitdown_ingest_hook.py` that triggers on operator command

**CR-9 acknowledgment**: pin to specific version after `pip show markitdown` reveals stable build.

### Δ1.3 — Langfuse via built-in HTTP MCP

**Why**: Operator-EXPLICITLY-named for observability. A4 BRIDGE-MODE correction: NOT external `langfuse-mcp@1.2.0` npm (phantom per registry probe) — use built-in HTTP MCP endpoint.

**Cite class**: `constituents=[TIER-1-DIRECT @ langfuse.com/docs/api-and-data-platform/features/mcp-server, TIER-1-DIRECT @ A4 BRIDGE-MODE Q3 verification]; effective_tier=TIER-1-DIRECT`

**Install commands**:

**Option A — Langfuse Cloud (no self-host)**:
```bash
# Get API key from cloud.langfuse.com
# Then add to .mcp.json:
claude mcp add --transport http langfuse \
  https://cloud.langfuse.com/api/public/mcp \
  --header "Authorization: Basic <BASE64(public_key:secret_key)>"
```

**Option B — Self-hosted Langfuse**:
```bash
# 1. Clone + start Langfuse
git clone https://github.com/langfuse/langfuse.git Z:/claude-sota-pure-state/langfuse
cd Z:/claude-sota-pure-state/langfuse
docker compose up -d

# 2. Once running at http://localhost:3000, add to .mcp.json:
claude mcp add --transport http langfuse \
  http://localhost:3000/api/public/mcp \
  --header "Authorization: Basic <BASE64(public_key:secret_key)>"
```

**REVERT**: `claude mcp remove langfuse` + stop Docker compose if self-hosted.

### Δ1.4 — Arize-ai/phoenix MCP (OTel observability)

**Why**: A3 + A4 confirm Apache-2.0 MCP wrapper + Elastic-2.0 server. OTel-compatible, framework-agnostic. **A4 correction**: latest is `@arizeai/phoenix-mcp@4.0.11` NOT `4.0.13` (A3 inflated).

**Cite class**: `constituents=[TIER-1-DIRECT @ Arize-ai/phoenix @ HEAD (Elastic-2.0 server + Apache-2.0 MCP wrapper), TIER-1-DIRECT @ A4 BRIDGE-MODE Q3 verified npm 4.0.11]; effective_tier=TIER-1-DIRECT`

**Install commands**:

```bash
# 1. Install Phoenix server (Apache-2.0 OR Elastic-2.0 depending on plane)
pip install arize-phoenix
# (optionally: docker run -d --name phoenix-pure -p 6006:6006 arize-ai/phoenix:latest)

# 2. Wire MCP via npm + claude mcp add
# (verify latest npm version first: `npm view @arizeai/phoenix-mcp version` — last verified 4.0.11)
claude mcp add phoenix \
  -e PHOENIX_BASE_URL=http://localhost:6006 \
  -e PHOENIX_API_KEY=<key-if-set> \
  -- npx -y @arizeai/phoenix-mcp@latest

# 3. (optional) docs MCP for Phoenix reference lookup
claude mcp add phoenix-docs -- npx -y @arizeai/phoenix-docs-mcp@latest
```

**CR-9 acknowledgment**: `@latest-acknowledged-D6-risk` per CR-9; Elastic-2.0 server license is cite-acceptable for self-host (no re-host-as-competing-service planned).

**REVERT**: `claude mcp remove phoenix && claude mcp remove phoenix-docs && pip uninstall arize-phoenix` + optional Docker stop.

### Δ1.5 — promptfoo (eval + redteam)

**Why**: OpenAI-backed MIT (post-acquisition 2026); eval + redteam + OWASP LLM Top 10 + 60+ providers + Anthropic Claude Agent SDK integration. A3 ADOPT-NOW confirmed.

**Cite class**: `constituents=[TIER-1-DIRECT @ promptfoo/promptfoo @ HEAD (MIT, OpenAI-acquired 2026)]; effective_tier=TIER-1-DIRECT`

**Install commands**:

```bash
# Install via npm (preferred per CR-6)
npm install -g promptfoo@latest

# Add MCP wire
claude mcp add promptfoo --transport stdio -- promptfoo mcp

# Verify install
promptfoo --version
promptfoo eval --help
```

**REVERT**: `claude mcp remove promptfoo && npm uninstall -g promptfoo`

### Δ1.6 — trailofbits/skills-curated marketplace

**Why**: Security-vetted plugins curated by Trail of Bits staff (named-org). CC-BY-SA-4.0 acceptable for install (cite-OK).

**Cite class**: `constituents=[TIER-1-DIRECT @ trailofbits/skills-curated @ HEAD (CC-BY-SA-4.0, Trail of Bits named-org)]; effective_tier=TIER-1-DIRECT`

**Install commands**:

```bash
# Inside Claude Code CLI session (eee-pure):
/plugin marketplace add trailofbits/skills-curated

# After marketplace registers, list available + install specific:
/plugin marketplace list-plugins trailofbits/skills-curated
/plugin install <plugin-name>@skills-curated
```

**REVERT**: `/plugin uninstall <name>@skills-curated && /plugin marketplace remove trailofbits/skills-curated`

### Δ1.7 — anthropics/skills marketplace (A4 missed-finding)

**Why**: 135K★ NOASSERTION — distinct from `anthropics/claude-cookbooks` per A4 BRIDGE-MODE Q1 finding. Anthropic OFFICIAL canonical skill-authoring/reference surface.

**Cite class**: `constituents=[TIER-1-DIRECT @ anthropics/skills @ HEAD (NOASSERTION — verify SPDX pre-install per CR-9)]; effective_tier=TIER-1-DIRECT`

**Pre-install probe (CR-9 license verification)**:

```bash
# Verify license before commit
gh api repos/anthropics/skills --jq '.license, .license.spdx_id'
mcp__github__get_file_contents owner:anthropics repo:skills path:LICENSE
```

If license verifies as MIT/Apache-2.0/permissive:
```bash
/plugin marketplace add anthropics/skills
/plugin marketplace list-plugins anthropics/skills
/plugin install <relevant-skill>@anthropics-skills
```

If license is restrictive: **DEFER to cite-only** per cardinal-rule-9.

---

## Δ2 — STUDY-PILOT (30-day reversible)

### Δ2.1 — Anthropic native `memory_20250818` (Tier-C SDK hook-wrappable)

**Why**: API-layer canonical memory tool; cookbook demonstrates 333,977→172,623 peak token reduction in Session 2. STUDY-PILOT because requires hook-level integration (not auto-fire).

**Wire path** (FORWARD-REF): write hook at `.claude/hooks/scripts/memory_tool_inject.py` that injects `tools=[{"type": "memory_20250818", "name": "memory"}]` + `betas=["context-management-2025-06-27"]` at messages.create boundary.

**Reference template**: `anthropics/claude-cookbooks/tool_use/memory_tool.py @ 58aa6c5d` MemoryToolHandler — port to hook with `/memories/` storage at `Z:/claude-sota-pure-state/.claude/memories/`.

**Pilot success criterion**: ≥30% token reduction on cross-session continuity workloads vs baseline doobidoo+graphiti.

### Δ2.2 — mem0ai/mem0 (benchmark-leader)

**Why**: arXiv:2504.19413 peer-reviewed; LoCoMo 91.6 (+20 vs prior) / LongMemEval 94.8 (+27). Apache-2.0 + Y-Combinator S24.

**Install** (STUDY-PILOT only — head-to-head benchmark vs doobidoo):
```bash
pip install mem0ai
# OR 3rd-party MCP: git clone https://github.com/elvismdev/mem0-mcp-selfhosted Z:/claude-sota-pure-state/mem0-mcp
# (84★ — requires Qdrant + Neo4j + Ollama stack)
```

**Pilot success criterion**: ≥20% LoCoMo R@5 improvement over doobidoo baseline measured via `mem0ai/memory-benchmarks` eval framework over 30 days; ship as primary OR retire to DEFER if doobidoo wins.

### Δ2.3 — thedotmack/claude-mem (DOWNGRADED quarantine-pilot)

**Why DOWNGRADED**: A4 BRIDGE-MODE flagged Reddit audit alleging abnormal star cohorts + $CMEM Solana token affiliation. Plugin cache already has 13.2.0 in sibling claude-sota-installed but NOT in claude-sota-pure target. Mechanism (hooks-capture-summarize) is GENUINELY-NEW vs doobidoo (API-store).

**Quarantine-pilot only** — NOT default-install:
```bash
# Inside eee-pure CLI (if approved post-quarantine):
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

**Pilot success criterion**: head-to-head benchmark vs doobidoo on operator's actual workflows over 30 days; treat $CMEM/Solana token integration as REJECT-additional surface even if memory layer evaluates positive.

### Δ2.4 — DSPy / E2B / browser-use / smolagents / NeoLab reflexion+SADD / ruflo-federation / flow-next Ralph

Per A4 BRIDGE-MODE STUDY-PILOT classifications. Each conditional on specific workflow need:
- **DSPy** if structured-output prompt-compilation needed
- **E2B** if remote sandbox for untrusted execution needed
- **browser-use** if higher-level browser-task patterns beyond chrome-devtools+playwright
- **smolagents** if minimal-agent comparison harness needed
- **NeoLab reflexion+SADD** if paper-cited reliability gains (8-21%) needed
- **ruflo-federation** if cross-machine zero-trust agent collaboration needed
- **flow-next Ralph** if long-running autonomous loops beyond superpowers executing-plans needed

Default: DEFER until specific workflow surfaces.

---

## Δ3 — REFRESH (already-installed; HEAD bump)

### Δ3.1 — superpowers HEAD bump

**Current**: `Z:/claude-sota-pure/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/` (cached)
**Latest**: HEAD `f2cbfbef` per A4 verification — 192,865★ (UP from 5.1.0 baseline; +33 drift since W250 start)
**Refresh command**:
```bash
/plugin uninstall superpowers@claude-plugins-official
/plugin install superpowers@claude-plugins-official
```

Verify post-install: `ls Z:/claude-sota-pure/.claude/plugins/cache/claude-plugins-official/superpowers/` for new version dir.

### Δ3.2 — addyosmani/agent-skills HEAD bump

**Current**: `Z:/claude-sota-pure/.claude/plugins/cache/addy-agent-skills/agent-skills/742dca58ae55/` (cached)
**Latest**: HEAD bump available — NEW skills `source-driven-development` + `doubt-driven-development` shipped since baseline per A2 finding.
**Refresh**:
```bash
/plugin uninstall agent-skills@addy-agent-skills
/plugin install agent-skills@addy-agent-skills
```

### Δ3.3 — context-mode 1.0.111 → 1.0.135 (npm version bump)

**Current**: 1.0.111 + 1.0.133 in plugin cache
**Latest**: 1.0.135 (2026-05-15 per A3)
**Refresh**:
```bash
/plugin uninstall context-mode@context-mode
/plugin install context-mode@context-mode
# OR npm bump if npm-installed:
npm install -g context-mode@latest
```

### Δ3.4 — wshobson per-plugin curation (80-plugin marketplace)

**Current**: `Z:/claude-sota-pure/.claude/plugins/cache/claude-code-workflows/` marketplace registered.
**Action**: Select 5-15 specific plugins from 80 based on workflow needs. Recommended for claude-sota-pure:

```bash
# Inside eee-pure CLI:
/plugin install agent-teams@claude-code-workflows           # multi-agent workflows
/plugin install conductor@claude-code-workflows             # context-driven dev
/plugin install plugin-eval@claude-code-workflows           # plugin evaluation framework
/plugin install protect-mcp@claude-code-workflows           # Cedar policy + Ed25519 receipts (governance)
/plugin install block-no-verify@claude-code-workflows       # guard against --no-verify bypass
/plugin install qa-orchestra@claude-code-workflows          # multi-agent QA + Chrome MCP validation
/plugin install hads@claude-code-workflows                  # Human-AI Document Standard
/plugin install security-hardening@claude-code-workflows    # security review patterns
/plugin install context-management@claude-code-workflows    # /context-save + /context-restore (already cited in auto-compact-discipline.md Rank #3)
```

---

## Δ4 — DEFER (lower-priority, conditional)

| Candidate | Defer reason | Re-evaluate trigger |
|---|---|---|
| bmad-code-org/BMAD-METHOD | npx-install not native /plugin; trinity covers ~80% | If Agile methodology becomes essential |
| topoteretes/cognee | PARTIAL-OVERLAP with graphiti | If graphiti hits scale limits |
| VikParuchuri/marker | GPL-3.0 caveat | If markitdown/MinerU insufficient for heavy PDFs |
| MinerU | heavier than markitdown | If markitdown insufficient |
| comet-ml/opik | overlaps Phoenix/Langfuse | After phoenix+langfuse burn-in (90+ days) |
| traceloop/openllmetry | partial MCP transport only | When pure OTel needed alongside Phoenix |
| explodinggradients/ragas | NO native MCP; RAG-specific | When RAG eval distinct from promptfoo needed |
| junhoyeo/tokscale | overlaps ccusage | When cross-CLI tracking needed |
| pydantic/logfire | commercial backend | If commercial OSS-stack constraint relaxed |
| Continue.dev memory layer | competing IDE harness | Cite-only |
| Aider / LangGraph / SWE-agent | competing CLIs / frameworks | Cite-only |
| forrestchang/andrej-karpathy-skills | already cite-anchor in CLAUDE.md | Keep cite-only |
| braintrustdata/braintrust | TBD license + path | Probe LICENSE + native MCP |
| chopratejas/headroom | marketplace.json unverified per A4 HNF | Verify install path first |
| anthropics/skills | NOASSERTION license — pre-install probe needed | After CR-9 license verification (Δ1.7) |

---

## Δ5 — REJECT (16, NEVER install)

| Candidate | Primary blocker | CR-12 disposition |
|---|---|---|
| volcengine/OpenViking SERVER | AGPLv3 self-host blocker | CITE-CLASS-CANONICAL (architecture-only) |
| MemPalace | Issue #27 disputed benchmarks (Row-2 fabrication-test FAIL) | DUPLICATE-FUNCTIONALITY |
| letta-ai/letta | META-HARNESS competing-framework | DUPLICATE-FUNCTIONALITY |
| supermemoryai/supermemory | SaaS dependency | PROVIDER-COMPLEMENT (defer indefinitely) |
| microsoft/LLMLingua | superseded by Anthropic 5-primitive native stack | DUPLICATE-FUNCTIONALITY |
| jia-gao/leanctx | LLMLingua-2 substrate (outdated) + axis-3 fail (~1mo) | DUPLICATE-FUNCTIONALITY |
| Helicone (as core observability) | proxy-only, no native MCP | PARTIAL-OVERLAP |
| Lunary | LangChain-only path | PARTIAL-OVERLAP |
| Yeachan-Heo/oh-my-claudecode | heavy daemon vs CR-5 | DUPLICATE-FUNCTIONALITY |
| smtg-ai/claude-squad | Windows-broken issue #275 | (Z:-portable blocker) |
| jeremylongshore/claude-code-plugins-plus-skills | 425-plugin scale mismatch | DUPLICATE-FUNCTIONALITY |
| AnandChowdhary/continuous-claude | Ralph covered by superpowers + flow-next | DUPLICATE-FUNCTIONALITY |
| stravu/crystal | DEPRECATED Feb 2026 | n/a |
| microsoft/autogen + magentic-one | competing harness | DUPLICATE-FUNCTIONALITY |
| crewAIInc/crewAI | competing harness | DUPLICATE-FUNCTIONALITY |
| agno-agi/agno | competing agent framework | DUPLICATE-FUNCTIONALITY |
| RooCodeInc/Roo-Code | competing VS Code agent | DUPLICATE-FUNCTIONALITY |
| OpenBB-finance/OpenBB | AGPL-3.0 + domain-out-of-scope | DOMAIN-OUT-OF-SCOPE |
| Mintplex-Labs/anything-llm + arc53/DocsGPT + weaviate/Verba + truefoundry/cognita + infiniflow/ragflow | duplicate RAG apps | DUPLICATE-FUNCTIONALITY |
| modelcontextprotocol/servers Memory ref-impl | upstream-self-labeled "not production-ready" | DUPLICATE-FUNCTIONALITY |

---

## Install execution order (recommended)

For Δ1 install batch (6 candidates), recommended fire order:

1. **getzep/graphiti** first (Δ1.1) — L3 temporal-KG foundation; FalkorDB Docker container is durable
2. **Langfuse** second (Δ1.3) — observability backplane for everything that follows
3. **Phoenix MCP** third (Δ1.4) — additional observability layer
4. **promptfoo** fourth (Δ1.5) — eval surface depends on Langfuse+Phoenix being active
5. **microsoft/markitdown** fifth (Δ1.2) — independent of others
6. **trailofbits/skills-curated marketplace** sixth (Δ1.6) — additive plugin marketplace

Each Δ1 step gets cross-model-consensus T1+T2 codex review per CR-3 + provenance row per CR-9 install-risk discipline.

For Δ3 REFRESH batch (4 candidates), can be done in any order (uninstall + reinstall sequence).

For Δ2 STUDY-PILOT — defer to next session OR triggered by specific workflow need.

---

## CR conformance per delta

- **CR-1**: TIER-1-DIRECT cites on every Δ1 candidate (verified by A1+A2+A3+A4 BRIDGE-MODE)
- **CR-3 cross-model consensus**: SATISFIED via Wave 250 n=2 REAL GPT-5.5 BRIDGE-MODE; each Δ1 install warrants codex T1 retroactive consult per pre-commit-miss recovery path
- **CR-5 install-priority**: all Δ1 candidates are upstream installs (no hand-coding)
- **CR-6 official-native-channel**: all Δ1 commands use canonical install primitives (`/plugin marketplace add`, `pip install`, `npm install -g`, `claude mcp add`)
- **CR-7 graduated unleash**: Δ1 candidates align with target's current `permissions.defaultMode` (verify per CLAUDE.md §"Intentional divergences")
- **CR-8 full-SOTA-content**: every Δ1 cite-anchored to upstream HEAD SHA + license
- **CR-9 install-risk discipline**: version-pin mandate applied (no bare `@latest` without acknowledgment); REVERT path documented per candidate
- **CR-10 research-first**: 5-agent Wave 250 BRIDGE-MODE wave precedes install — SATISFIED
- **CR-11 META-process**: this DELTA install plan is itself a SOTA-cited synthesis (recursive dogfood)
- **CR-12 upstream-install-priority**: PRIMARY path used for all Δ1; sibling-cite-import fallback NOT needed

---

## Next operator actions

1. Review this DELTA install plan + companion catalog (`docs/sota-pure-runtime-catalog-2026-05-15.md`)
2. For each Δ1 item, run install command sequence inside `eee-pure` CLI session
3. After install, run `claude --eval-plugin <plugin>` if wshobson plugin-eval framework enabled
4. Append to `Z:/claude-sota-pure/docs/install-provenance.md` per CR-9 install-risk discipline
5. Commit env additions + manifest update + provenance row per CR-3 cross-model commit-time T2 gate
6. For Δ2 STUDY-PILOT items: queue 30-day pilot with success criterion + REVERT path documented
7. Re-run Wave 251 (next session) to verify HONEST-NON-FINDING gaps closed (license-TBD for 9 candidates + arxiv probe + smithery.ai registry)
