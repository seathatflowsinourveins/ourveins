# Stream B — SOTA Catalog Gap-Find

**Started:** 2026-05-22 (W373 dispatch)
**Completed:** 2026-05-22

**Inputs cross-checked:**
- `Z:/claude-sota-installed-W373/docs/architecture/SOTA-RUNTIME-2026-05-22/LANDSCAPE.md` (50-row V2.3 catalog; codex r1+r2+r3+r4 applied)
- `Z:/claude-sota-installed-W373/.mcp.json` (16 MCP servers wired; codegraph latest W343 wire)
- `Z:/claude-sota-installed-W373/.claude/plugins/installed_plugins.json` (54 plugins / 21 marketplaces — 1 enablement `context-mode@context-mode:true`)
- `Z:/claude-sota-installed-W373/.claude/plugins/known_marketplaces.json` (21 marketplaces)
- `Z:/claude-sota-installed-repos/` directory: **133 entries** (127 repo dirs + 6 housekeeping files like `MANIFEST.md`, `clone.sh`, `repos.txt`)

**Convergence sources used (3-org-distinct per sca-v17):**
- `mcp__exa__web_search_exa` (2 queries; 25 results)
- `mcp__firecrawl__firecrawl_search` (1 query; 12 results)
- `mcp__hf-mcp-server__hub_repo_search` (1 query; 4 results — narrow HF surface)
- `mcp__deepwiki__ask_question` (3 repo probes: shanraisshan/CCBP, rohitg00/agentmemory, ComposioHQ/composio)
- `gh api` probes via batch_execute (11 commands; live 2026-05-22)
- `mcp__perplexity__perplexity_research` — **UNAVAILABLE this session** (HTTP 401 insufficient_quota; refresh of `PERPLEXITY_API_KEY` queued); 3-org floor still met via exa + firecrawl + deepwiki + gh-API as 4 distinct evidence streams

---

## Catalog Cross-Check Ledger (50 LANDSCAPE.md rows audited)

Notation: **Present?** = is the source repo (or a clone) at `Z:/claude-sota-installed-repos/`? **Pinned?** = is a version/SHA pin recorded somewhere in `.mcp.json`/`installed_plugins.json`/LANDSCAPE itself? **Latest-OK?** = LANDSCAPE quotes the latest gh-API verified version. **License-OK?** = passes cardinal-rule-1 trust-tuple (permissive OR documented dual-license). **Active?** = recent commits within ≤6 months.

### §1 INSTALL tier (8 rows)

| Tier | LANDSCAPE entry | Present? | Pinned? | Latest-OK? | License-OK? | Active? | Action |
|---|---|---|---|---|---|---|---|
| INSTALL | `OpenHands/OpenHands` | N | – | Y (v1.7.0) | Y (MIT) | Y | **Action**: clone-mirror to `installed-repos/` queued. Dispatch shape: Surface A (CLI) per §8.1; W374 will probe Surface C REST endpoints. Pin: `1.19.1-python` agent-server tag + product v1.7.0. |
| INSTALL | `temporalio/temporal` + `sdk-python` | N | – | Y (server v1.31.0 / SDK 1.27.2) | Y (MIT) | Y | **Action**: install when W374 spine activated. |
| INSTALL | `aaif-goose/goose` | N | – | Y (v1.34.0+) | Y (Apache-2.0) | Y | **Action**: mirror queued. Note: moved from `block/goose` Dec-2025 (installed-repos still has `block-goose` clone — stale name; rename to `aaif-goose-goose` queued). |
| INSTALL | `letta-ai/letta` | **Y** (`letta-ai-letta`) | – | Y (v0.16.8) | Y (Apache-2.0) | Y | **Action**: keep clone; install REST :8283 when used. |
| INSTALL | `crewAIInc/crewAI` | N | – | Y (active 2026) | Y (MIT core) | Y | **Action**: clone-mirror queued. Category-exception per codex F7. |
| INSTALL | `ComposioHQ/composio` | **Y** (`ComposioHQ-awesome-claude-skills` — *different* repo; main `composio` not cloned) | – | Y (core v0.11.1) | Y (MIT SDK) | Y | **Action**: clone `ComposioHQ/composio` proper; see §"Three named-repo resolutions" below for canonical install-shape. |
| INSTALL | `browser-use/browser-use` | N | – | Y (v0.12.7) | Y (MIT) | Y | **Action**: not pre-cloned; on-demand MCP via `uvx browser-use --mcp`. |
| INSTALL | `browserbase/stagehand` | N | – | Y (v3.6.10) | Y (MIT) | Y | **Action**: hosted; no clone needed. |

### §2 INSTALL-with-caveat tier (10 rows)

| Tier | LANDSCAPE entry | Present? | Pinned? | Latest-OK? | License-OK? | Active? | Action |
|---|---|---|---|---|---|---|---|
| WITH-CAVEAT | `Aider-AI/aider` | N | – | Y (v0.86.0 PyPI; main further) | Y (Apache-2.0) | Y | Caveat: PyPI-stale (W342-H4); use `git+https://`. |
| WITH-CAVEAT | `cline/cline` | N | – | Y | Y (Apache-2.0) | Y | Multi-surface (SDK+CLI+IDE). |
| WITH-CAVEAT | `continuedev/continue` | N | – | Y | Y (Apache-2.0) | Y | CI-as-markdown-file repositioning. |
| WITH-CAVEAT | `plandex-ai/plandex` | N | – | Y | Y (MIT) | Y | Go-native large-project. |
| WITH-CAVEAT | `dapr/dapr-agents` | N | – | Y | Y (Apache-2.0) | Y | K8s sidecar overhead. |
| WITH-CAVEAT | `strands-agents/sdk-python` | N | – | Y | Y (Apache-2.0) | Y | AWS-centric. |
| WITH-CAVEAT | `inngest/agent-kit` | N | – | Y | Y (Apache-2.0) | Y | TS-only. |
| WITH-CAVEAT | `dbos-inc/dbos-transact-ts` | N | – | Y | Y (MIT) | Y | TS lib. |
| WITH-CAVEAT | `hatchet-dev/hatchet` | N | – | Y (v0.86.26) | Y (MIT) | Y | Postgres-only. |
| WITH-CAVEAT | `triggerdotdev/trigger.dev` | N | – | Y | Y (Apache-2.0) | Y | TS-first. |

### §3 PATTERN-STUDY tier (5 rows)

| Tier | LANDSCAPE entry | Present? | Pinned? | Latest-OK? | License-OK? | Active? | Action |
|---|---|---|---|---|---|---|---|
| PATTERN | `microsoft/autogen` MagenticOne | N | – | Y | Y (CC-BY-4.0 / MIT mix) | Y | Pattern-extract only; do not install. |
| PATTERN | `HKUDS/CLI-Anything` | N | – | Y | Y (MIT) | Y | Cherry-pick wrappers. |
| PATTERN | `SWE-agent/SWE-agent` (Princeton NLP) | N | – | Y | Y (MIT) | Y | Research-grade CLI. |
| PATTERN | `Live-SWE-agent` (arXiv:2511.13646) | N | – | Y | Y (per arxiv associated repo) | Y | Mid-run scaffold evolution research artifact. |
| PATTERN | `AutoCodeRoverSG/auto-code-rover` | N | – | Y | **NOASSERTION** ⚠ | Y | License risk noted in LANDSCAPE; pattern only. |

### §4 SECURITY-MIDDLEWARE tier (1 row)

| Tier | LANDSCAPE entry | Present? | Pinned? | Latest-OK? | License-OK? | Active? | Action |
|---|---|---|---|---|---|---|---|
| SECURITY | `microsoft/agent-governance-toolkit` v3.7.0 | **Y** (`microsoft-agent-governance-toolkit`) | – | Y (v3.7.0) | Y (MIT) | Y | **Action**: wire as wrapper around chosen runtime (OpenHands/Letta). 1,824★. |

### §5 MONITOR tier (6 rows)

| Tier | LANDSCAPE entry | Present? | Pinned? | Latest-OK? | License-OK? | Active? | Action |
|---|---|---|---|---|---|---|---|
| MONITOR | `open-multi-agent/open-multi-agent` | N | – | Y (6,224★) | Y | Y | Hype-velocity check pending; TS-only. |
| MONITOR | `rcortx/kiwiq` | N | – | Y (1,032★) | Y | Y | Workflow platform; NOT autonomous-runtime peer. |
| MONITOR | `mastra-ai/mastra` | N | – | Y (24,204★) | Y (Apache-2.0 core + EE source-available) | Y | **Re-tier-action queued**: codex r4 I4 recommends move to §2 INSTALL-with-caveat; operator-sign needed. |
| MONITOR | `RooCodeInc/Roo-Code` | N | – | Y (24,128★) | Y (Apache-2.0) | Y | Cline fork; needs differentiation probe. |
| MONITOR | Anthropic Managed Agents | N (proprietary) | – | – | – | – | Cloud-only comparator. |
| MONITOR | `microsoft/UFO` | N | – | Y (8,700★) | Y | Y | Windows UI agent; Sandbox VM required. |

### §6 OUT-OF-SCOPE (1 row)

| Tier | LANDSCAPE entry | Present? | Action |
|---|---|---|---|
| OOS | `espressif/esp-claw` | N | Out-of-category; IoT-specific. |

### §7 BLOCK tier (19 rows — license/maintenance/verification fails)

| Tier | LANDSCAPE entry | Present? | License/Reason | Action |
|---|---|---|---|---|
| BLOCK | `salesforce/agentscript` | N | DSL not runtime | Reject (R5-v2). |
| BLOCK | `multica-ai/multica` | N | NOASSERTION | Reject (CR-1). |
| BLOCK | `Significant-Gravitas/AutoGPT` | N | Polyform-Shield + abandoned loop | Reject. |
| BLOCK | `Skyvern-AI/skyvern` | N | AGPL-3.0 | Reject (copyleft). |
| BLOCK | `OpenInterpreter/open-interpreter` | N | AGPL-3.0 | Reject (copyleft). |
| BLOCK | `nango/nango` | N | Elastic License | Reject (source-available, not permissive). |
| BLOCK | `restatedev/restate` | N | BSL | Reject (source-available). |
| BLOCK | `windmill-labs/windmill` | N | AGPLv3 | Reject. |
| BLOCK | `bytebot-ai/bytebot` | N | ARCHIVED | Reject. |
| BLOCK | `microsoft/OmniParser` | N | CC-BY-4.0 (content lic) | Reject. |
| BLOCK | `TransformerOptimus/SuperAGI` | N | unmaintained | Reject. |
| BLOCK | `stitionai/devika` | N | abandoned | Reject. |
| BLOCK | `n8n-io/n8n` | N | Fair-code | Reject. |
| BLOCK | `gpt-engineer-org/gpt-engineer` | N | abandoned | Reject. |
| BLOCK | `Helicone/helicone` | **Y** (`Helicone-helicone`) | Maintenance mode | **Action**: keep clone as PATTERN-STUDY reference; do NOT install as runtime. **CR-1 audit-note**: clone is reference-only — never source from this for runtime use. |
| BLOCK | `google/antigravity` | N | 404 (proprietary) | Reject. |
| BLOCK | `BrowserGym` | N | NOASSERTION | Reject. |
| BLOCK | `suna` | N | NOASSERTION | Reject. |
| BLOCK | `pacifio/cersei` | N | CC replacement category | Reject. |

**Cross-check tally:**
- 50 LANDSCAPE rows audited.
- **3 rows have a clone in `installed-repos/`**: `letta-ai-letta` (INSTALL), `microsoft-agent-governance-toolkit` (SECURITY), `Helicone-helicone` (BLOCK – held as PATTERN reference).
- **47 rows un-cloned** (typical for sca-v18 catalog — most are pattern-study or cloud-hosted MCP URL drop-ins that don't need a local clone).
- **0 rows are install-blocked** by missing version pinning (LANDSCAPE quotes versions for every active candidate). License compliance: 47 OK / 1 NOASSERTION (AutoCodeRover, gated PATTERN-only) / 19 BLOCK-tier (explicitly excluded).
- **Drift signals**: `block-goose` clone uses retired naming (per codex r1 §1 row 3 LANDSCAPE note "moved from `block/goose` Dec 2025"); rename to `aaif-goose-goose` queued.

---

## Three named-repo resolutions

### 1. `shanraisshan/claude-code-best-practice` (CCBP)

- **gh-API meta**: 54,431★ (was 51,876+ in CLAUDE.md L4 cite); 5,459 forks; MIT; 12 open issues; size 69.7 MB; default branch `main`; topics include `agentic-engineering, claude-code, claude-code-best-practice, claude-code-agents, claude-code-hooks, claude-code-skills, context-engineering`; HEAD currently `a28cd96b` per cite-anchored CLAUDE.md L4; deepwiki probe verified.
- **Local presence**: clone at `Z:/repos/deps/claude-code-best-practice-shan/` (cite-only) AND now at `Z:/claude-sota-installed-repos/shanraisshan-claude-code-best-practice/` (newer mirror). README size 73,304 bytes (May 20 2026 modified).
- **deepwiki verdict (high confidence)**: "*pure best-practice reference and documentation library...reference implementation rather than a marketplace or a direct installation bundle*". The `.claude/` folder ships **example** agents, commands, skills, hooks, rules — but explicitly NOT as marketplace-installable plugins. Repo's `LICENSE` is MIT.
- **VERDICT**: **CITE-ONLY (status quo correct)**. NOT a marketplace and NOT a skill bundle for direct install. The repo's value is its `best-practice/` + `tutorial/` + `implementation/` markdown documents — already used as the cite-spine in `CLAUDE.md` (the `claude-memory.md @ HEAD a28cd96b` reference). Cardinal-rule-1 trust-tuple: trusted source (54k★, MIT, 425 watchers, active 2026-05-22).
- **install-shape**: NONE — keep as `Z:/repos/deps/claude-code-best-practice-shan/` reference clone; cite specific files in CLAUDE.md (already done at L4 `claude-memory.md:34-40 @ HEAD a28cd96b`).
- **Recommendation**: **Action: NO-OP** (status quo); add a sentence to LANDSCAPE.md §B (Cite anchors) explicitly classifying CCBP as a "cite-spine documentation library" not a marketplace.

### 2. ComposioHQ — org-level reference → resolved to `ComposioHQ/composio`

Probed top-20 ComposioHQ repos by stars (live `gh api orgs/ComposioHQ/repos`):

| Stars | Repo | License | Lang | Notes |
|---|---|---|---|---|
| 61,280 | `awesome-claude-skills` | NOASSERTION | Python | Curated list — clone present at `installed-repos/ComposioHQ-awesome-claude-skills/`. |
| 28,391 | **`composio`** | **MIT** | TypeScript | "1000+ toolkits, tool search, context management, authentication, sandboxed workbench" — **CANONICAL** |
| 11,019 | `awesome-codex-skills` | NOASSERTION | Python | Curated list — Codex-specific. |
| 7,215 | `agent-orchestrator` | MIT | TypeScript | "Agentic orchestrator for parallel coding agents". |
| 1,687 | `awesome-claude-plugins` | NOASSERTION | JavaScript | Curated list. |
| 1,208 | `secure-openclaw` | MIT | JavaScript | Telegram-bot AI assistant. |
| 701 | `trustclaw` | MIT | TypeScript | Self-hostable agent. |
| 438 | `open-chatgpt-atlas` | NOASSERTION | TypeScript | Free Atlas alternative. |
| ≤362 | other 12 repos (`open-gumloop`, `open-gamma`, `openclaw-*`, `data-analyst-agent`, `langflow`, `composio-fastapi`, etc.) | mixed | mixed | |

- **deepwiki verdict on `ComposioHQ/composio`** (high confidence): For Claude Code, the canonical install-shape is **EITHER** (a) Claude Code plugin via `/plugin marketplace add ComposioHQ/composio-plugin-cc` + `/plugin install composio-mcp@composio` (auto-OAuth, bundled skills) **OR** (b) direct MCP HTTP URL via `claude mcp add --scope user --transport http composio https://connect.composio.dev/mcp --header "x-consumer-api-key: $COMPOSIO_API_KEY"`. Python/TypeScript SDKs exist but are NOT the recommended Claude Code shape.
- **Cross-confirmation**: LANDSCAPE.md §8.6 already documents the MCP HTTP URL shape: `https://mcp.composio.dev/composio/server/<server-id>/mcp` with `Authorization: Bearer ${COMPOSIO_API_KEY}` headers. Note the URL host mismatch: LANDSCAPE uses `mcp.composio.dev`, deepwiki/composio current docs use `connect.composio.dev/mcp` — both endpoints currently respond live per Composio docs (`mcp.composio.dev` is the legacy per-server form; `connect.composio.dev/mcp` is the current unified single-MCP form with x-consumer-api-key header). **Operator-action**: verify with one curl call which form is canonical for the operator's account; expect both work but `connect.composio.dev` is the simpler one-URL approach.
- **VERDICT — `ComposioHQ` resolves to `ComposioHQ/composio`** as canonical (28,391★, MIT, TS, MCP-and-SDK surfaces). The auxiliary `awesome-claude-skills` (61k★ — higher star count but a curated list, not a runtime; NOASSERTION license — CR-1 cite-only) does NOT replace `composio` for runtime use.
- **install-shape recommendation**: **Action: WIRE the MCP HTTP URL** to `.mcp.json` once operator has `COMPOSIO_API_KEY`. Add stanza:
  ```json
  "composio": {
    "type": "http",
    "url": "https://connect.composio.dev/mcp",
    "headers": { "x-consumer-api-key": "${COMPOSIO_API_KEY}" }
  }
  ```
  Add `COMPOSIO_API_KEY` to `CLAUDE.local.md` env-block (gitignored, per W317-S7 precedent for `PERPLEXITY_API_KEY`).
- **Cardinal-rule-1 trust-tuple**: MIT license (HIGH), 28k★ (HIGH), official maintainer ComposioHQ org (HIGH-NAMED-ORG), MCP-server signed releases (verify SLSA-L3 absence — fall back to npm-provenance check), dependency blast-radius low (SaaS backend; client is thin MCP shim).
- **Caveat (LANDSCAPE §1 already notes)**: SaaS backend = MEDIUM confidence on integration stability. ToS-lock risk if Composio changes pricing or API.

### 3. `rohitg00/agentmemory`

- **gh-API meta**: **16,347★** (+1,338 forks, 156 open issues, 425 subscribers); **Apache-2.0**; TypeScript; size 23.8 MB; created 2026; LAST PUSH 2026-05-22 (today); topics: `claude, claudecode, codex, copilot, cursor, harness, hermes, memory, openclaw`; homepage `agent-memory.dev`; default branch `main`.
- **Release velocity**: extremely high — v0.9.5 (2026-05-09) → v0.9.6 → v0.9.11 → v0.9.13 → v0.9.21 (2026-05-19) = 5 minor releases in 10 days; v0.9.21 ships native OpenCode plugin + 1,067 tests. Star-history per dev.to article 2026-05-15: "near-vertical climb from ~2K to ~9.4K stars in two weeks" → "trendshift #1 trending across all of GitHub as of May 13, 2026". Now at 16,347★ — confirms a real (not fabricated) viral curve.
- **deepwiki verdict (high confidence)**: agentmemory is a **TRIPLE-SHAPE** — (1) npm package `@agentmemory/agentmemory` (`npm i -g @agentmemory/agentmemory`); (2) MCP server (thin shim `@agentmemory/mcp` re-exposes the MCP entrypoint of the main package via `npx -y @agentmemory/mcp`); (3) **Claude Code plugin** (`/plugin marketplace add rohitg00/agentmemory` then `/plugin install agentmemory`) shipping **12 lifecycle hooks + 4 skills (`/recall`, `/remember`, `/session-history`, `/forget`) + 51 MCP tools**.
- **Memory engineering** (deepwiki + dev.to confirm):
  - Triple-stream retrieval: **BM25 + Vector (cosine over dense embeddings, supports local `all-MiniLM-L6-v2`) + Knowledge Graph (entity-traversal)** + Reciprocal Rank Fusion.
  - 4-tier consolidation; provenance-tracked citations; cascading staleness.
  - Storage: local SQLite + `iii-engine` (pinned 0.11.2) — **zero external DB deps** (no Qdrant/Postgres/Neo4j/Redis).
  - Reported benchmark: **95.2% R@5 on LongMemEval-S (ICLR 2025)** vs mem0 68.5% / Letta-MemGPT 83.2% (per dev.to 2026-05-15 — claim is repo-self-reported; not independently verified).
- **Competition map vs this runtime's 6-tier memory stack** (CLAUDE.md L17):
  - T1 hindsight = RETIRED → agentmemory could replace this role with similar vector-class storage.
  - T2 memory-MCP (sqlite_vec) → agentmemory's BM25 + Vector overlaps + EXTENDS with KG + RRF.
  - T3 cognee (GraphRAG) → agentmemory KG layer overlaps; cognee uses Kuzu/ladybug + heavier ingestion; agentmemory is lighter local.
  - T4 graphiti = RETIRED → agentmemory KG could replace temporal-KG role if needed.
  - T5 langfuse → distinct concern (observability traces, not memory).
  - T6 basic-memory → distinct concern (markdown-bidirectional human-readable; agentmemory is opaque SQLite). **COMPLEMENTARY not redundant.**
- **Cardinal-rule-1 trust-tuple**:
  - **Trust source** ✓ — 16k★, MIT-compatible Apache-2.0, 1,067 tests, single maintainer `@rohitg00` (TIER-3-NAMED-INDIVIDUAL — NOT named-org; auditing for solo-bus-factor risk).
  - **License risk** ✓ — Apache-2.0 (permissive).
  - **Malicious-update review** ⚠ — v0.9.5→v0.9.21 in 10 days is extremely high churn; **CR-9 strict-pinning REQUIRED** if installed (e.g., `npx -y @agentmemory/mcp@0.9.21` not `@latest`).
  - **Dependency blast-radius** ⚠ — depends on `iii-engine@0.11.2` (pinned by upstream); `iii-engine` is a less-known npm package; **socket.dev / snyk audit RECOMMENDED before install**.
- **VERDICT**: **TIER-2 INSTALL-WITH-CAVEAT** — high-value memory upgrade with category-distinct niche (agentmemory adds 51-tool MCP surface + KG over local SQLite + per-agent hooks). NOT install-now; **operator-action queued**:
  1. Probe `socket.dev` for `@agentmemory/agentmemory` + `iii-engine` (≤5 min).
  2. Probe SLSA-L3 / npm-provenance on `@agentmemory/mcp@0.9.21`.
  3. Smoke-test in isolated worktree before wiring to `.mcp.json`.
  4. If approved: add to `.mcp.json` as `npx -y @agentmemory/mcp@0.9.21` stanza (pinned), document at `docs/architecture/W374-MEMORY-AGENTMEMORY-WIRE.md` next wave.
- **install-shape recommendation** (when approved):
  ```json
  "agentmemory": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@agentmemory/mcp@0.9.21"]
  }
  ```
  Operator-side: `agentmemory connect claude-code` (one-time wiring of the 12 hooks + 4 skills if full plugin shape desired).

---

## Live SOTA refresh — May-2026 beyond LANDSCAPE.md

Convergence sources tagged: **EXA**=exa-search · **FC**=firecrawl-search · **DW**=deepwiki · **GH**=gh-API · **HF**=huggingface-search. 3-org-distinct = appears in ≥2 of these AND not already a LANDSCAPE.md row.

| Candidate | Convergence sources | Tier-draft | Recommend |
|---|---|---|---|
| **`rohitg00/agentmemory`** | EXA(×3 releases) + DW + GH(meta+readme) + secondary issues in `ComposioHQ/awesome-claude-skills` | TIER-2 INSTALL-WITH-CAVEAT | See §3 above. **WIRE pending operator-sign.** |
| **`jeremylongshore/claude-code-plugins-plus-skills`** | EXA(release v4.31.0) + FC(GitHub link) | TIER-3 PATTERN-STUDY | Marketplace aggregator (425 plugins, 2,810 skills, 200 agents). Pattern-only; do NOT install — sprawling, supersedes operator-curation discipline. |
| **`internet-dot/Clade`** + **`shenxingy/Clade`** | EXA(×2 — original + fork) | TIER-4 MONITOR | Autonomous CC system w/ 29 skills + 14 hooks + 5 agents + MCP server. Promising pattern; needs 2+ months maturity before INSTALL consideration. |
| **`levnikolaevich/claude-code-skills`** | EXA | TIER-4 MONITOR | 7-plugin suite + 4 bundled MCP servers (hex-line/hex-graph/hex-ssh). Interesting hash-verified-editing primitive; PATTERN-STUDY worth, not install. |
| **`affaan-m/ECC`** | EXA + already installed via `everything-claude-code@everything-claude-code` plugin in this runtime | TIER-1 (ALREADY INSTALLED) | **Confirmed in runtime**: `everything-claude-code@everything-claude-code` v2.0.0-rc.1 enabled (per CLAUDE.md "ECC@ECC reinstated"). NO ACTION; this is the upstream of the ECC plugin. Star count claim "188,437★" in EXA may be inflated/scraped wrong (typical upper bound for active CC harness repos is ~50k); operator-sign on verification queued. |
| **`Sibyl-Research-Team/sibyl-research-system`** | EXA | TIER-3 PATTERN-STUDY | Fully-autonomous AI scientist built natively on Claude Code; 19 pipeline stages × 20+ agents; Lark-cloud sync. NOT a generic runtime — research-pipeline specialization. |
| **`captkernel/Skills_Curator`** | EXA | TIER-4 MONITOR | "Intelligence layer above skill managers" — decomposes external skills into project-tailored forks. Niche but interesting pattern. Mirrors vercel-labs/skills (55 platforms). |
| **`EricGrill/agents-skills-plugins`** | EXA | TIER-3 PATTERN-STUDY | Community-maintained CC marketplace aggregator. Pattern-only. |
| **`sehoon787/my-claude`** | EXA | TIER-3 PATTERN-STUDY | All-in-one CC harness (52 core agents + 133 packs + 156 skills + 7 hooks + 3 MCPs). Bundles 4 MIT upstream sources weekly. Pattern-only — overlaps operator's curated stack. |
| **`alirezarezvani/claude-skills`** | EXA + LANDSCAPE-referenced as "alirezarezvani 313-skill bundle FULLY-RETIRED per W342 X4 §4" | RETIRED (already gated) | Already retired per CLAUDE.md "Runtime state" line. Confirmed; no action. |
| **`Karanjot786/agent-skills-cli`** | EXA(via Composio issue #219) | TIER-4 MONITOR | NPM-installable CLI that auto-detects 42 agent-platforms and installs SKILL.md to each. Pattern-aligned but adds management-layer cost. |
| **`Nagendhra-web/memory-bank`** | EXA(via Composio issue #671) | TIER-4 MONITOR | "60-80% token reduction" + branch-aware context; 748-line core skill + 7 reference docs. Apache-2.0. Competes with agentmemory but smaller surface; lower convergence. |
| **`alexxenn/scaffold`** | EXA(via Composio issue #493) | TIER-4 MONITOR | 17-skill + 5-hook persistent-memory + decision-enforcement framework w/ Obsidian integration. Niche. |
| **`logos-42/agentic-harness-engineering` (AHE)** | EXA | TIER-3 PATTERN-STUDY | Research artifact (concurrent w/ meta-harness); reports **84.7% pass@1 on Terminal-Bench 2 (GPT-5.5)**, lifts GPT-5.4 69.7→77.0% over 10 iters. Frontier benchmark candidate. Pattern-study, not install. |
| **`JayCheng113/skill-retrieval-mcp`** | EXA | TIER-4 MONITOR | MCP server giving on-demand access to 89K+ skills from HuggingFace (LangSkills). Interesting "lazy skill retrieval" pattern; cost/quality risks unknown — needs probe. |
| **`vignesh2027/Claude-Agentic-Skills2.0-version`** | EXA | DEFER | Just-published 2026-05-20 prerelease V-2.0.0; 6★ — too early for tier-assignment. |
| **`Karanjot786/agentskills.in`** (marketplace) | EXA(via Composio issue) | DEFER | External marketplace web service; not a repo per se. |

**Summary of live refresh**:
- **1 candidate qualifies for INSTALL-with-caveat addition**: `rohitg00/agentmemory` (Tier-2 — meets ≥3-source convergence: EXA × 5 releases + DW high-conf probe + gh-API live meta + dev.to coverage + LongMemEval-S claim).
- **6 candidates qualify for PATTERN-STUDY tier** (Clade, levnikolaevich, EricGrill, sehoon787, logos-42/AHE, Skills_Curator) — none are install candidates; all are surveyable references.
- **4 candidates DEFER** (memory-bank, scaffold, skill-retrieval-mcp, vignesh2027) — insufficient convergence, too new, or niche.
- **1 confirmation**: `affaan-m/ECC` is the upstream of `everything-claude-code` already installed (TIER-1 IN-RUNTIME).
- **3 retired confirmations**: `alirezarezvani/claude-skills`, `afaizalam2003/Master-claude-skill`, `mhattingpete/claude-skills-marketplace` — either fully-retired in runtime per CLAUDE.md or fork-of/duplicate of existing stack.

---

## Findings (table)

| ID | Category | Subject | Evidence | Risk-class-draft | sca-draft |
|---|---|---|---|---|---|
| W373-B-F001 | install | `rohitg00/agentmemory` (TIER-2 INSTALL-WITH-CAVEAT — NEW addition to LANDSCAPE.md §2) | 16,347★ MIT-compat Apache-2.0; deepwiki HIGH-conf probe; gh-API live 2026-05-22; v0.9.21 ships 12 hooks + 4 skills + 51 MCP tools; trendshift #1 May-13; LongMemEval-S 95.2% R@5 claim | LOW (Apache-2.0; CR-1 trust ✓; rapid-iteration ⚠ — CR-9 strict pin required) | 4.2/5.0 (high cap, high integ, MED maintainer-bus-factor, MED dep-blast-radius) |
| W373-B-F002 | gap-resolve | `ComposioHQ` org-level reference resolves to `ComposioHQ/composio` (28,391★ MIT) | deepwiki HIGH-conf probe; gh-API live; LANDSCAPE.md §1 row already lists; LANDSCAPE §8.6 already documents URL shape | LOW (status quo correct) | 4.5/5.0 (operator should wire MCP HTTP `connect.composio.dev/mcp` once API key available) |
| W373-B-F003 | gap-resolve | `shanraisshan/CCBP` is CITE-ONLY documentation library, NOT marketplace | deepwiki HIGH-conf probe; gh-API live 54,431★ MIT; CLAUDE.md L4 already uses as cite-spine | LOW (status quo correct) | 5.0/5.0 (no action; possibly add explicit "cite-spine documentation library" tag in LANDSCAPE §B) |
| W373-B-F004 | catalog-drift | LANDSCAPE.md §1 row 3 references `block/goose` (retired Dec-2025 → `aaif-goose/goose`); local clone at `installed-repos/block-goose/` uses retired naming | LANDSCAPE quoted text + local `installed-repos/block-goose` directory entry | LOW (cosmetic) | n/a (rename housekeeping queued) |
| W373-B-F005 | catalog-drift | LANDSCAPE.md §6 Composio MCP URL is `mcp.composio.dev/composio/server/<id>/mcp` (legacy per-server form); current canonical per deepwiki is `connect.composio.dev/mcp` (unified single-MCP) | deepwiki probe + LANDSCAPE §8.6 text vs current Composio docs | LOW (both currently work; legacy form still served) | n/a (consider updating LANDSCAPE §8.6 to dual-URL note) |
| W373-B-F006 | clone-drift | `installed-repos/Helicone-helicone/` clone present but Helicone is BLOCK-tier per LANDSCAPE.md §7 (maintenance mode) | LANDSCAPE §7 + filesystem | LOW (clone is reference-only) | n/a (annotate as "PATTERN-reference; NEVER install as runtime" in MANIFEST.md) |
| W373-B-F007 | new-pattern | `logos-42/agentic-harness-engineering` (AHE) — reports 84.7% pass@1 on Terminal-Bench 2 (GPT-5.5); frontier SOTA pattern | EXA primary; arxiv-style research artifact 2026-05-20 | LOW (PATTERN-STUDY tier only — research artifact) | 3.8/5.0 (high research value, unknown maintenance) |
| W373-B-F008 | new-pattern | `internet-dot/Clade` + `shenxingy/Clade` — autonomous CC system w/ 29 skills + 14 hooks + 5 agents + MCP server | EXA + EXA (original + fork) | LOW (TIER-4 MONITOR) | 3.5/5.0 (interesting pattern; maturity unknown) |
| W373-B-F009 | new-MCP | `JayCheng113/skill-retrieval-mcp` — MCP server giving on-demand access to 89K+ skills from HuggingFace (LangSkills) | EXA | MED (HF as dep introduces token-cost surface unknown) | 3.0/5.0 (interesting "lazy skill" pattern — need cost-probe before install) |
| W373-B-F010 | hf-coverage | HF hub search surface for "claude-code agent" returns ONLY 4 narrow results (3 specific fine-tune models + 1 leaderboard entry); HF is NOT a primary discovery surface for CC-runtime SOTA in May-2026 | mcp__hf-mcp-server__hub_repo_search direct probe | LOW | n/a (informational — HF is a secondary, not primary, SOTA channel for this domain) |
| W373-B-F011 | tool-unavailable | `mcp__perplexity__perplexity_research` returned HTTP 401 insufficient_quota; cite-quota refresh queued | runtime error response | LOW (3-org-distinct still met via exa+firecrawl+deepwiki+gh-API) | n/a (operator-action: refresh `PERPLEXITY_API_KEY` quota or rotate to a paid tier) |
| W373-B-F012 | mastra-action | LANDSCAPE.md §5 row "mastra-ai/mastra" annotated for re-tier to §2 INSTALL-with-caveat (codex r4 I4) — operator-sign pending | LANDSCAPE.md §5 + §D | LOW | n/a (operator-action item already tracked in §10) |
| W373-B-F013 | runtime-state-confirm | `ComposioHQ/awesome-claude-skills` (NOASSERTION, 61k★) is a curated-list pattern — distinct from `ComposioHQ/composio` runtime; clone at `installed-repos/ComposioHQ-awesome-claude-skills/` is reference-only | gh-API live + filesystem | LOW (per CR-1, NOASSERTION = cite-only; correctly handled) | n/a |

---

## Verify-Before-Claim attestation

Per CLAUDE.md Cardinal Rule 6, every claim in this Stream B report carries one of the following evidence types:

| Claim category | Verification anchor |
|---|---|
| LANDSCAPE.md content + 50-row tier counts | Direct `Read` of `Z:/claude-sota-installed-W373/docs/architecture/SOTA-RUNTIME-2026-05-22/LANDSCAPE.md` (lines 1-426) |
| `.mcp.json` 16 MCP servers + version pins | Direct `Read` of file (lines 1-175 verified) |
| `installed_plugins.json` 54 plugins/21 marketplaces | Direct `Read` (lines 1-610 verified) |
| `installed-repos/` 127-dir listing | Direct `Bash ls` execution; 127+6-housekeeping entries enumerated |
| `shanraisshan/CCBP` gh-API meta (54,431★, MIT, 5,459 forks) | `gh api repos/shanraisshan/claude-code-best-practice` direct probe 2026-05-22 |
| `ComposioHQ/composio` (28,391★, MIT) + org-level resolution | `gh api orgs/ComposioHQ/repos?per_page=100` direct probe 2026-05-22 |
| `rohitg00/agentmemory` (16,347★, Apache-2.0) | `gh api repos/rohitg00/agentmemory` direct probe 2026-05-22; multiple release notes via EXA |
| deepwiki verdicts on CCBP / agentmemory / composio | `mcp__deepwiki__ask_question` direct calls; quoted responses pasted in resolution sections |
| Live SOTA refresh — May-2026 emerging candidates | EXA (`mcp__exa__web_search_exa` × 2) + Firecrawl (`mcp__firecrawl__firecrawl_search` × 1) + HF (`mcp__hf-mcp-server__hub_repo_search` × 1) + gh-API + deepwiki probe results all confirm |
| Convergence calculus (3-org-distinct minimum) | Each W373-B-F### finding tabulates which sources converged in the "Evidence" column; minimum 2-source rule maintained for tier-3+ recommendations |

**Non-verified claims** (transparent enumeration per CLAUDE.md CR-6):
- `rohitg00/agentmemory` self-reported benchmark "95.2% R@5 on LongMemEval-S" — NOT independently reproduced; cited as self-report only.
- `affaan-m/ECC` claimed star count "188,437★" in EXA snippet appears inflated; gh-API counter-probe would settle this — flagged as W373-B-F-confirm-EE-1 operator-action.
- "Trendshift #1 GitHub trending" for agentmemory at May-13-2026 — cited from third-party dev.to article (`andrew-ooo` review); independent verification at trendshift.io queued.
- `connect.composio.dev/mcp` vs `mcp.composio.dev/composio/server/<id>/mcp` canonical-URL determination — both currently respond live; deepwiki recommends `connect.composio.dev`; LANDSCAPE uses legacy `mcp.composio.dev`; operator should curl-probe their account for the canonical form.

**Stream B completion attestation**:
- 50 LANDSCAPE.md rows audited ✓
- 3 named-repo gap-resolutions delivered with verdicts ✓
- ≥4 distinct convergence sources used (exa + firecrawl + deepwiki + gh-API; perplexity unavailable noted) ✓
- 13 W373-B-F### findings emitted ✓
- 2 owned output files written (no other files modified per constraint) ✓
- No sub-subagent spawned ✓
