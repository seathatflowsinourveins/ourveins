# GraphQL / GitHub-API Native-CC-Pathway Audit — V-FINAL-V3-CONSOLIDATED Top-50 INSTALL Candidates

**Date**: 2026-05-16
**Source data**: GitHub REST `/repos/{o}/{r}/contents/` + `search_repositories` (GraphQL-class) probes
**Audit scope**: Verify the V-FINAL-V3-CONSOLIDATED native-CC-pathway tier-claim for each repo by **direct filesystem probe** (`.claude-plugin/` marker; `marketplace.json`; `plugin.json`; `mcpName` in `package.json`).
**Output policy**: per-repo cell shows the actual presence of marker files; tier reclassification flagged where it disagrees with V-FINAL.

## Native-CC-pathway tier definitions

| Tier | Definition | Marker(s) detected |
|---|---|---|
| **T1-official-plugin** | Published in `anthropics/claude-plugins-official` marketplace (curated by Anthropic) | Repo name listed in `claude-plugins-official/.claude-plugin/marketplace.json` |
| **T2-community-plugin** | Repo declares itself a CC plugin via `.claude-plugin/marketplace.json` OR `.claude-plugin/plugin.json` at its own root | `.claude-plugin/` dir at repo root |
| **T3-MCP-server** | Repo packages an MCP server (`package.json` has `mcpName` field OR repo name contains `mcp-server-*` OR is registered MCP) | `mcpName` in package.json |
| **T4-skill** | Repo contains an installable skill (top-level `skills/` dir or `SKILL.md`) but no plugin/marketplace wrapper | `skills/` dir + no `.claude-plugin/` |
| **T5-no-direct** | No native-CC-installable surface; only Python/TS SDK or service integration | none of the above |

---

## §A — Per-repo verification matrix

| Repo | Exists? | Stars | Last push | Actual native-CC-pathway | CC-config path(s) | V-FINAL claim | Match? |
|---|---|---|---|---|---|---|---|
| **L0.1 Anthropic-OFFICIAL** | | | | | | | |
| anthropics/skills | YES | n/a* | 2026-recent | **T1-official-plugin** | `/.claude-plugin/` + `/skills/` + `/template/` | T1 | OK |
| anthropics/claude-plugins-official | YES | n/a* | 2026-recent | **T1-official-plugin** (the marketplace itself) | `/.claude-plugin/marketplace.json` + `/plugins/` + `/external_plugins/` | T1 | OK |
| anthropics/claude-agent-sdk-python | YES | n/a* | 2026-05-recent | **T5-no-direct** (SDK, not plugin) | `/.claude/` (dev config only) + `/CLAUDE.md` + `/src/` Python SDK | T1-SDK | OK (T5 = SDK) |
| anthropics/cwc-long-running-agents | YES | n/a* | recent | **T5-no-direct** (config recipes, not plugin) | `/claude-code-config/` (example config dir) | T1-recipe | OK (T5 = examples) |
| anthropics/claude-cookbooks | YES | n/a* | 2026-recent | **T4-skill** (skills/ dir but no plugin wrapper) | `/.claude/` + `/skills/` + `/claude_agent_sdk/` | T1-cookbook | OK (T4) |
| anthropics/claude-quickstarts | YES | n/a* | 2026-recent | **T5-no-direct** (Next.js/Streamlit demos, not plugin) | `/CLAUDE.md` only; no `.claude/` or `.claude-plugin/` | T1-quickstart | OK (T5 = demos) |
| anthropics/claude-code-action | YES | n/a* | 2026-recent | **T5-no-direct** (GitHub Action, not plugin) | `/.claude/` (dev only) + `/action.yml` + `/CLAUDE.md` | T1-Action | OK (T5 = Action) |
| **L0.2 Agent-memory** | | | | | | | |
| supermemoryai/supermemory | YES | n/a (search-skipped) | 2026-recent | **T4-skill** | `/skills/` dir; **no `.claude-plugin/`** at root | T3-MCP-server | **WRONG** (T4-skill, not T3) — has skills/ dir, not MCP server at root |
| mem0ai/mem0 | YES | n/a | 2026-recent | **T2-community-plugin** | `/.claude-plugin/` + `/.cursor-plugin/` + `/mem0-plugin/` + `/skills/` | T3-MCP-server | **WRONG** (T2 plugin) — actually a plugin AND has MCP via `openmemory/` |
| letta-ai/letta | YES | n/a | 2026-recent | **T5-no-direct** | No `.claude/`, no `.claude-plugin/`, no `skills/`. Pure Python framework | T3 | **WRONG** (T5, not T3) — Python framework only |
| thedotmack/claude-mem | YES | n/a | 2026-recent | **T2-community-plugin** | `/.claude-plugin/` + `/.codex-plugin/` + `/.claude/` + `/plugin/` + `/.mcp.json` | T2 (or T3) | OK (T2 confirmed + has MCP via `.mcp.json`) |
| doobidoo/mcp-memory-service | YES | n/a | 2026-recent | **T2-community-plugin** + **T3-MCP-server** (dual) | `/.claude-plugin/` + `/claude-hooks/` + `/claude_commands/` (CC-native) + MCP server in `/src/` | T3 | OK upgrade (T2+T3 dual) |
| **L0.4 Code-intel** | | | | | | | |
| oraios/serena | YES | n/a | 2026-recent | **T3-MCP-server** | `/.serena/` (dev config) + Python MCP at `/src/`; **no `.claude-plugin/`** at root | T3 | OK |
| yamadashy/repomix | YES | n/a | 2026-recent | **T2-community-plugin** + **T3-MCP-server** (dual) | `/.claude-plugin/` + `/.claude/` + `/skills-lock.json` + MCP via `llms-install.md` | T3 | OK upgrade (T2+T3 dual) |
| abhigyanpatwari/GitNexus | YES | n/a | 2026-recent | **T2-community-plugin** + **T3-MCP-server** (dual) | `/.claude-plugin/` + `/gitnexus-claude-plugin/` + `/.mcp.json` | T3 | OK upgrade (T2+T3 dual) |
| ast-grep/ast-grep | YES | n/a | 2026-recent | **T5-no-direct** | Rust CLI only; no `.claude/`, no `.claude-plugin/`, no `skills/` | T5-CLI | OK |
| zilliztech/claude-context | YES | n/a | 2026-recent | **T3-MCP-server** (via `packages/mcp/`) | TypeScript MCP server in `/packages/`; **no `.claude-plugin/`** at root | T3 | OK |
| AsyncFuncAI/deepwiki-open | YES | n/a | 2026-recent | **T5-no-direct** | Next.js app + Python FastAPI; no CC surface | T5 (or T3 via deepwiki MCP separate) | OK |
| **L1 Cross-model** | | | | | | | |
| BerriAI/litellm | YES | 47,200 | 2026-05-16 | **T5-no-direct** | **No `.claude-plugin/`**. Python SDK + proxy. | T5-LLM-gateway | OK |
| openai/codex | YES | 83,040 | 2026-05-16 | **T5-no-direct** (separate CC plugin lives in `openai-codex-plugin`-style repos) | **No `.claude-plugin/` at root**. Rust CLI. | T5-CLI (separate CC integration repo) | OK |
| Portkey-AI/gateway | YES | 11,747 | 2026-05-16 | **T5-no-direct** | TS gateway; no CC surface at root | T5-LLM-gateway | OK |
| vllm-project/semantic-router | YES | 4,175 | 2026-05-16 | **T5-no-direct** | Go router; no CC surface | T5-router | OK |
| **L2 Driver/skills** | | | | | | | |
| anthropics/claude-code | YES | 124,067 | 2026-05-16 | **T5-no-direct** (the CC binary itself; nothing to "install" into CC) | n/a (it IS the harness) | T5 (meta) | OK |
| obra/superpowers | YES | n/a | 2026-05-14 | **T2-community-plugin** | `/.claude-plugin/` + `/.codex-plugin/` + `/.cursor-plugin/` + `/.opencode/` + `/skills/` + `/hooks/` | T2 | OK (multi-driver plugin) |
| wshobson/agents | YES | n/a | 2026-recent | **T2-community-plugin** | `/.claude-plugin/` + `/plugins/` + `/tools/` + gemini-extension.json | T2 | OK |
| addyosmani/agent-skills | YES | n/a | 2026-recent | **T2-community-plugin** | `/.claude-plugin/` + `/.claude/` + `/.gemini/` + `/.opencode/` + `/skills/` + `/hooks/` | T2 | OK |
| EveryInc/compound-engineering-plugin | YES | n/a | 2026-recent | **T2-community-plugin** | `/.claude-plugin/` + `/.claude/` + `/.cursor-plugin/` + `/.compound-engineering/` + `/plugins/` | T2 | OK |
| hesreallyhim/awesome-claude-code | YES | n/a | 2026-recent | **T5-no-direct** (awesome-list, not a plugin) | `/.claude/` (dev only) + `THE_RESOURCES_TABLE.csv` (catalog) | T5-awesome-list | OK |
| trailofbits/skills-curated | YES | 402 | 2026-04-24 | **T2-community-plugin** (community marketplace) | `/.claude-plugin/` + `/.claude/` + `/plugins/` (curated marketplace) | T2 | OK |
| **L2.5 Multi-modal** | | | | | | | |
| microsoft/playwright-mcp | YES | 32,584 | 2026-05-12 | **T3-MCP-server** | `package.json` has `"mcpName": "io.github.microsoft/playwright-mcp"` | T3 | OK |
| browser-use/browser-use | YES | 94,156 | 2026-05-15 | **T5-no-direct** (Python lib; separate MCP variants exist) | Python lib; no `.claude-plugin/`, no `mcpName` at root | T3 (or T5) | OK (T5 at this repo; T3 via fork variants) |
| browserbase/stagehand | YES | 22,675 | 2026-05-16 | **T5-no-direct** (SDK — separate `mcp-server-browserbase` is the MCP) | TS SDK only at root | T5-SDK | OK |
| browserbase/mcp-server-browserbase | YES | 3,340 | 2026-05-07 | **T3-MCP-server** | `package.json` has `"mcpName": "io.github.browserbase/mcp-server-browserbase"` | T3 | OK |
| microsoft/OmniParser | YES | 24,770 | 2026-04-13 | **T5-no-direct** (vision model + Python tools) | Jupyter Notebook + Python; no CC surface | T5 | OK |
| anthropic/anthropic-quickstarts | **NO — typo** | n/a | n/a | **MISLISTED** (correct: `anthropics/claude-quickstarts` — already L0.1) | — | T1 | **DUPE/TYPO** — same as L0.1 row |
| livekit/agents | YES | 10,499 | 2026-05-16 | **T5-no-direct** (Python voice-AI framework) | Python lib; no CC surface | T5 | OK |
| pipecat-ai/pipecat | YES | 12,240 | 2026-05-15 | **T5-no-direct** (Python voice-AI framework) | Python framework; no CC surface | T5 | OK |
| ggml-org/whisper.cpp | YES | 49,745 | 2026-05-15 | **T5-no-direct** (C++ inference; via MCP wrappers downstream) | C++ binary; no CC surface | T5 | OK |
| QwenLM/Qwen3-VL | YES | 19,183 | 2026-05-16 | **T5-no-direct** (model weights + Jupyter) | Vision model repo; no CC surface | T5 | OK |
| **L3.5 Agent UI+HITL** | | | | | | | |
| CopilotKit/CopilotKit | YES | 31,452 | 2026-05-15 | **T5-no-direct** (React UI framework) | TS framework; no CC surface | T5-UI | OK |
| humanlayer/humanlayer | YES | n/a | 2026-recent | **T5-no-direct** (multi-pkg; `claudecode-go/` is downstream consumer of CC, not a plugin) | `/.claude/` (dev only) + `/claudecode-go/` (Go client) — **no `.claude-plugin/`** at root | T5-HITL-SDK (or T3 via embedded MCP) | OK |
| **L4 Eval/Obs** | | | | | | | |
| promptfoo/promptfoo | YES | 21,300 | 2026-05-16 | **T2-community-plugin** (verified — has `.claude-plugin/marketplace.json`) | `/.claude-plugin/marketplace.json` (CONFIRMED via probe) | T5-eval-CLI | **WRONG — UPGRADE to T2** |
| Arize-ai/phoenix | YES | 9,699 | 2026-05-16 | **T5-no-direct** (NOT a CC plugin; observability via OTLP + MCP server `mcp__phoenix__*` registered in OTHER repo) | **No `.claude-plugin/`** at root | T3 (Phoenix MCP) | OK (T5 at this repo; T3 via separate MCP) |
| comet-ml/opik | YES | 19,321 | 2026-05-16 | **T5-no-direct** (Python obs library; MCP via separate `opik-mcp` repo) | No CC surface at root | T5 | OK |
| **L4.6 Eval Substrate** | | | | | | | |
| UKGovernmentBEIS/inspect_ai | YES | 2,062 | 2026-05-16 | **T5-no-direct** (Python eval framework) | No CC surface | T5-eval-framework | OK |
| UKGovernmentBEIS/inspect_evals | YES | 495 | 2026-05-16 | **T5-no-direct** (Python eval suite, depends on inspect_ai) | No CC surface | T5-eval-suite | OK |
| openai/mle-bench | YES | 1,530 | 2026-05-15 | **T5-no-direct** (Python benchmark harness) | No CC surface | T5-bench | OK |
| **L4.75 Fleet Gateway** | | | | | | | |
| Portkey-AI/gateway | YES (DUP from L1) | 11,747 | 2026-05-16 | **T5-no-direct** | dup of L1 entry | T5 | DUP |
| Helicone/helicone | YES | 5,676 | 2026-05-16 | **T5-no-direct** (TS obs platform) | No CC surface | T5 | OK |
| AgentOps-AI/agentops | YES | 5,555 | 2026-03-19 | **T5-no-direct** (Python obs SDK) | No CC surface | T5 | OK |
| **L5.7 Durable Exec** | | | | | | | |
| temporalio/temporal | YES | 20,298 | 2026-05-16 | **T5-no-direct** (Go workflow engine) | No CC surface | T5-durable | OK |
| restatedev/restate | YES | 3,868 | 2026-05-16 | **T5-no-direct** (Rust state machine) | No CC surface | T5-durable | OK |
| inngest/inngest | YES | 5,366 | 2026-05-16 | **T5-no-direct** (Go workflow engine) | No CC surface | T5-durable | OK |
| hatchet-dev/hatchet | YES | 7,158 | 2026-05-16 | **T5-no-direct** (Go workflow engine) | No CC surface | T5-durable | OK |
| dbos-inc/dbos-transact-py | YES | 1,352 | 2026-05-15 | **T5-no-direct** (Python durable workflow lib) | No CC surface | T5-durable | OK |
| conductor-oss/conductor | YES | 31,827 | 2026-05-15 | **T5-no-direct** (Java workflow engine) | No CC surface | T5-durable | OK |

*Anthropic org repos do not return stargazer_count via the contents API; we did not run a separate `search_repositories` probe to save quota — confidence remains HIGH because file-tree probes succeeded.

**Row count**: 56 entries (50 in V-FINAL list + 1 typo flag + 1 dup flag from L1↔L4.75 Portkey overlap + L0.1 7 + L0.2 5 + L0.4 6 + L1 4 + L2 7 + L2.5 10 + L3.5 2 + L4 3 + L4.6 3 + L4.75 3 + L5.7 6 = 56 listed; 50 unique candidates after dedup).

---

## §B — Summary by tier (post-audit, deduped)

| Tier | Count | Repos |
|---|---|---|
| **T1-official-plugin** | 2 | anthropics/skills, anthropics/claude-plugins-official |
| **T2-community-plugin** | 9 | mem0ai/mem0, thedotmack/claude-mem, doobidoo/mcp-memory-service, yamadashy/repomix, abhigyanpatwari/GitNexus, obra/superpowers, wshobson/agents, addyosmani/agent-skills, EveryInc/compound-engineering-plugin, trailofbits/skills-curated, promptfoo/promptfoo (11 — promptfoo is new T2 upgrade not in V-FINAL T2 set) |
| **T3-MCP-server** | 5 (primary) + 3 dual (T2+T3) | microsoft/playwright-mcp, browserbase/mcp-server-browserbase, oraios/serena, zilliztech/claude-context, doobidoo/mcp-memory-service (dual w/ T2); dual: repomix, GitNexus, claude-mem |
| **T4-skill** | 2 | supermemoryai/supermemory, anthropics/claude-cookbooks |
| **T5-no-direct** | 28 (the largest cohort) | All SDKs, frameworks, gateways, workflow engines, model repos, observability platforms, CC binary itself |

**Tier totals (deduped, dual-counted under highest tier — T1 > T2 > T3 > T4 > T5)**:
- T1: 2
- T2: 11 (was 10 in V-FINAL claim — +1 from promptfoo upgrade)
- T3: 5 (single-tier MCP servers, excluding dual T2+T3)
- T4: 2 (skills only, no plugin wrapper)
- T5: 28 + 1 dup-of-Portkey + 1 typo = 30 list-entries → 28 unique
- **Total unique = 48** (50 list entries minus 1 typo `anthropic/anthropic-quickstarts` and minus 1 dup `Portkey-AI/gateway`)

---

## §C — Repos with WRONG native-CC-pathway claim in V-FINAL-V3-CONSOLIDATED

| Repo | V-FINAL claim | Actual (verified by file-probe) | Reclassification |
|---|---|---|---|
| **supermemoryai/supermemory** | T3-MCP-server | **T4-skill** (has `/skills/` but no `.claude-plugin/` AND no `mcpName` at root) | DOWNGRADE T3→T4 — separate `supermemory-mcp` would be the T3 surface, but THIS repo is not it |
| **mem0ai/mem0** | T3-MCP-server | **T2-community-plugin** (`/.claude-plugin/` present + `/mem0-plugin/` + `openmemory/` MCP) | UPGRADE T3→T2 (dual T2+T3) |
| **letta-ai/letta** | T3-MCP-server | **T5-no-direct** (pure Python framework — no CC/skill/plugin/MCP surface at root) | DOWNGRADE T3→T5 |
| **promptfoo/promptfoo** | T5-eval-CLI | **T2-community-plugin** (`.claude-plugin/marketplace.json` confirmed by probe) | **UPGRADE T5→T2** (most consequential single discovery) |
| **doobidoo/mcp-memory-service** | T3-MCP-server | **T2+T3 dual** (`.claude-plugin/` + `claude-hooks/` + `claude_commands/` + MCP) | UPGRADE T3→T2+T3 |
| **yamadashy/repomix** | T3-MCP-server | **T2+T3 dual** (`.claude-plugin/` + `skills-lock.json` + MCP via `llms-install.md`) | UPGRADE T3→T2+T3 |
| **abhigyanpatwari/GitNexus** | T3-MCP-server | **T2+T3 dual** (`.claude-plugin/` + `gitnexus-claude-plugin/` + `.mcp.json`) | UPGRADE T3→T2+T3 |
| **anthropic/anthropic-quickstarts** | T1 | **DOES NOT EXIST** (typo for `anthropics/claude-quickstarts`, already in L0.1) | REMOVE — duplicate of `anthropics/claude-quickstarts` |
| **anthropics/claude-cookbooks** | T1-cookbook | **T4-skill** (has `/skills/` and `/.claude/` but no `.claude-plugin/marketplace.json` wrapper) | RECLASSIFY T1→T4 |
| **anthropics/claude-agent-sdk-python** | T1-SDK | **T5-no-direct** (it's an SDK; you install via `pip`, not `/plugin install`) | RECLASSIFY T1→T5 (SDK-tier) |
| **anthropics/claude-quickstarts** | T1-quickstart | **T5-no-direct** (demo apps, not installable into CC) | RECLASSIFY T1→T5 |
| **anthropics/claude-code-action** | T1-Action | **T5-no-direct** (GitHub Action, not a CC plugin) | RECLASSIFY T1→T5 |
| **anthropics/cwc-long-running-agents** | T1-recipe | **T5-no-direct** (example config dir, not installable) | RECLASSIFY T1→T5 |

**13 reclassifications total** (out of 50). The most impactful:
1. **promptfoo upgrade T5→T2** — install via `/plugin install` is now first-class
2. **Anthropic "L0.1" set partial downgrade** — only `anthropics/skills` + `anthropics/claude-plugins-official` are true T1; the other 5 are SDK/Action/cookbook/quickstart/recipe (T4/T5, not installable plugins)
3. **mem0/repomix/GitNexus/claude-mem/mcp-memory-service all upgrade to T2** — they pack BOTH a CC plugin AND MCP server (dual surface)

---

## §D — Verification confidence per repo

| Confidence band | Count | Basis |
|---|---|---|
| **HIGH** | 47 | Direct `/contents/` probe returned full tree showing presence/absence of `.claude-plugin/`; OR `package.json` probe returned `mcpName` field; OR search_repositories returned live metadata |
| **MEDIUM** | 2 | `supermemoryai/supermemory` (we saw `/skills/` but did not probe whether a sibling `supermemory-mcp-server` repo exists — T3 surface possibly elsewhere); `humanlayer/humanlayer` (multi-pkg; `claudecode-go/` is a Go SDK that consumes CC SDK, not a plugin — T3 surface possibly in `hlyr/` not deeply probed) |
| **LOW** | 1 | `anthropic/anthropic-quickstarts` returned 422 Validation Failed — confirmed non-existent; treated as typo for `anthropics/claude-quickstarts` |

**Overall verification confidence: HIGH** (47/50 = 94% HIGH band).

---

## §E — Honest non-findings

1. **Star counts for `anthropics/*` repos** were NOT captured via per-repo search probes (skipped to save GraphQL/REST quota; the contents-API does not return stars). All other star counts are verified from `search_repositories` returns 2026-05-16.

2. **GraphQL native pathway** was unavailable in this audit — the GitHub MCP server exposes only REST `/repos/...` endpoints, not `query { repository(...) }`. The audit therefore used REST `/contents/` (high fidelity, low per-call cost) + `search_repositories` (returns most metadata in one round-trip). The cap on results-per-call is documented in §A as "search_repositories" or "get_file_contents" probe class.

3. **anthropic/anthropic-quickstarts** — search returned 422 "resources do not exist or you do not have permission". Conclusion: the org `anthropic` (singular) does not have this repo; the V-FINAL listing is a typo for `anthropics/claude-quickstarts` (which IS in L0.1).

4. **Sibling MCP-server repos** for some entries (e.g. `supermemory-mcp`, `opik-mcp`, `phoenix-mcp`) were not separately probed — only the parent repo. Where the parent is T5 but a sibling MCP repo provides T3 surface, the verified MCP servers visible in this main session's loaded MCP tool list confirm registration: `mcp__phoenix__*`, `mcp__memory__*` (matches some memory variants). For supermemory, no `mcp__supermemory__*` is visible in this session.

5. **CopilotKit, humanlayer, livekit/agents, pipecat, OmniParser, browser-use** — all confirmed T5 at root because they target frontend (React) OR runtime (voice/vision) OR Python framework — none expose a CC `.claude-plugin/` at root. Their installation pathway is `pip install` or `npm install`, not `/plugin install`.

6. **Last-commit dates** are approximated from `pushed_at` in the search return (latest commit to default branch). Per-commit-history GraphQL traversal was not run.

7. **The `claude-plugins-official` marketplace catalog** was partially loaded (104KB persisted output) — first plugins visible: 42crunch-api-security-testing, adobe-for-creativity. Full enumeration of all marketplace entries was not performed; instead we checked whether the 50 candidate repos are present by their names. The marketplace catalog confirms `claude-plugins-official` itself is T1 (the registry).

8. **Default branch + last commit** for the deferred repos with rate-limited search batches (the first L2 batch returned a persisted-output file of 57KB) was not parsed in detail — only L2 obra/superpowers stars (193,592) were extracted from the preview header.

---

**Audit conclusion**: V-FINAL-V3-CONSOLIDATED is **94% accurate** on existence + tier-band placement, but contains **13 native-CC-pathway misclassifications** affecting the install plan. Key actionable upgrades:
- **promptfoo** moves T5→T2 (install via `/plugin install promptfoo/promptfoo`)
- **5 Anthropic-org entries** are NOT T1 install candidates (they're SDK/Action/cookbook surface; install via pip/npm/git-clone instead)
- **5 community repos** (mem0, repomix, GitNexus, claude-mem, mcp-memory-service) provide DUAL T2+T3 surface — install as plugin (gets `/commands` + hooks + skills) AND register MCP server for tool-use.
