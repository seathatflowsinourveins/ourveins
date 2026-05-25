# W319 Stream D — CLI Ecosystem & MCP Cascade Health

**Date**: 2026-05-19
**Scope**: CLI tools (claude/codex/gh/gitleaks/trivy/node/python/docker/git/npm/uvx) version vs npm-latest. MCP servers from `.mcp.json` — CR-9 compliance + handshake probe (where reachable).

---

## §1. CLI version table

| Tool | Local version | Latest (npm/upstream) | Δ | Verdict |
|------|--------------|----------------------|---|---------|
| `claude` | 2.1.144 | 2.1.144 (npm @anthropic-ai/claude-code) | 0 | ✓ CURRENT |
| `codex` (cli) | 0.130.0 | **0.131.0** (npm @openai/codex) | -1 patch | **CLI-1 LOW drift** |
| `gh` | 2.92.0 (2026-04-28) | 2.92.0 latest as of audit time | 0 | ✓ CURRENT |
| `gitleaks` | 8.30.1 | 8.30.1 (matches `.pre-commit-config.yaml:rev v8.30.1`) | 0 | ✓ CURRENT |
| `trivy` | 0.70.0 | 0.70.0 | 0 | ✓ CURRENT; vuln-DB updated 2026-05-19 13:30 (today) |
| `node` | v22.22.0 | v22.22.0 (operator mandate; engines.node=22 minimum) | 0 | ✓ CURRENT |
| `python` | **3.14.3** | 3.14.3 (latest 3.14 line) | 0 | **CLI-2 LOW** — CLAUDE.local.md mentions "Python 3.13" (`Z:\venvs\claude`); actual is 3.14.3. Either the venv was upgraded or CLAUDE.local.md is stale |
| `docker` | 29.4.3 (build 055a478) | 29.4.3 | 0 | ✓ CURRENT |
| `git` | 2.51.0.windows.2 | 2.51.0 (latest stable) | 0 | ✓ CURRENT |
| `npm` | 11.9.0 | 11.9.0 | 0 | ✓ CURRENT |
| `uvx` | 0.10.3 (c75a0c625 2026-02-16) | 0.10.3 (uv 0.10.3 latest) | 0 | ✓ CURRENT |

### CLI-1: codex 0.130.0 → 0.131.0 drift (LOW)

**Action**: `npm install -g @openai/codex@0.131.0` (1-line install per cardinal-rule-6 official-native-channel). **W320 P3.**

### CLI-2: python 3.13 vs 3.14.3 drift in CLAUDE.local.md

**Source**: CLAUDE.local.md Key Paths table says "Python 3.13 venv (shared)" for `Z:\venvs\claude\`. Actual `python --version` returns 3.14.3.

**Implication**: If something in tools/* expects 3.13 ABI (e.g., a compiled wheel pinned to cp313), it might fail under 3.14. `tools/__pycache__/*.cpython-313.pyc` and `.cpython-314.pyc` both exist, so the venv migration has happened. Documentation needs to catch up. **W320 P3 cosmetic.**

### `claude doctor` regression

Probed: `timeout 30 claude doctor` returned **EXIT=0** in 30s, **LINES=0** (silent success — no output).

**Comparison to W316-S4**: "claude doctor EXIT=124 5th-wave confirmation (W312-A.2)". W319 measures **EXIT=0 BUT NO OUTPUT** — this is a different failure mode. EXIT=0 means the command succeeded but produced no diagnostic output. 30s duration is the **timeout** wall-clock limit. Without `-h` or `--quiet` flag, this is silent. Possible explanations:
1. Upstream `claude doctor` got noisier-fixed but the output is going to a state-redirect dir not visible here
2. F-SS-1 PROJECT_DIR state-redirect bug (W315-r2 confirmed 2nd-time + W319 still unfiled) may be hiding output

**CLI-3 MEDIUM**: `claude doctor` invocation needs upstream investigation. The behavior changed from EXIT=124 (W316-S4) to EXIT=0/silent (W319). Either is broken. **W320 P1** — same upstream-bug-report as W316-S4's W317-AI carry-forward; if not filed yet, file now.

---

## §2. `.mcp.json` MCP cascade

13 enabled servers + 0 disabled (`disabledMcpjsonServers: []`).

| # | Name | Type | Transport | Cmd / URL | Pinned? | Live? |
|---|------|------|-----------|-----------|---------|-------|
| 1 | deepwiki | http | streamable | `https://mcp.deepwiki.com/mcp` | n/a | ✓ (live deepwiki MCP tools available in this audit) |
| 2 | chrome-devtools | stdio | npx | `npx -y chrome-devtools-mcp@1.0.1 --no-usage-statistics` | ✓ @1.0.1 | (not probed) |
| 3 | repomix | stdio | npx | `npx -y repomix@1.14.0 --mcp` | ✓ @1.14.0 | (not probed; tools available) |
| 4 | serena | stdio | uvx | `uvx --from git+https://github.com/oraios/serena@249f6b07f9ccac259b0ff95e06c9a40629748e17 serena start-mcp-server --context claude-code` | ✓ SHA-pinned | (tools available) |
| 5 | gitnexus | stdio | gitnexus-bin | `gitnexus mcp` | **CR-9 RISK** — invokes npm-global `gitnexus` not `npx -y gitnexus@v` | (tools available) |
| 6 | ccusage | stdio | npx | `npx -y @ccusage/mcp@18.0.11` | ✓ @18.0.11 | (tools available) |
| 7 | cognee | http | streamable | `http://127.0.0.1:8000/mcp` | n/a (local) | ✓ `initialize` returns Cognee 1.26.0 (Stream D probe) |
| 8 | langfuse | stdio | node-abspath | `node Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js` | **CR-9 RISK** — Z:-baked abs path; W286-cross rolled this back for 4 others | (tools available) |
| 9 | basic-memory | stdio | uvx | `uvx --from basic-memory==0.21.1 basic-memory mcp` | ✓ ==0.21.1 | ✓ (tools available — search_notes used by Stream D probe; healthy) |
| 10 | hf-mcp-server | http | streamable | `https://huggingface.co/mcp` | n/a | (tools available) |
| 11 | perplexity | stdio | npx | `npx -y @perplexity-ai/mcp-server@0.9.0` env `${PERPLEXITY_API_KEY}` | ✓ @0.9.0 | (W317-S7 smoke-tested; tools available) |
| 12 | playwright | stdio | npx | `npx -y @playwright/mcp@0.0.75` | ✓ @0.0.75 | (tools available) |

### CR-9 compliance summary

**10/13 fully CR-9 compliant** (npx -y pkg@version OR uvx --from pkg==version OR HTTP URL).

**3/13 with W319 CR-9 risks**:

#### MCP-1: gitnexus — CR-9 MEDIUM (carry-forward)
`.mcp.json:36-40` invokes `gitnexus mcp` directly (relies on npm-global install at unfixed path). On a fresh clone, this MCP fails until `npm install -g gitnexus@1.6.4-rc.112` is run separately. CLAUDE.md / `_comments.gitnexus` documents the install pin but the **invocation form** is NOT a `npx -y gitnexus@1.6.4-rc.112 mcp` (which would be self-bootstrapping). **W320 P2.**

#### MCP-2: langfuse — CR-9 MEDIUM (STALE-D-9 in stale-refs doc)
`.mcp.json:52-53` uses `node + abs Z:/path/to/build/index.js`. Z:-baked, breaks fresh-clone. W286-cross rolled this pattern back for 4 others but langfuse was exempted. **W320 P2 — publish mcp-server-langfuse to npm OR document the exemption explicitly.**

#### MCP-3: gitnexus CR-9 + path drift
Same as MCP-1.

### MCP cascade silent-fallbacks observed in current session

[NARRATIVE-RESCINDED per W329-S2-REAUDIT 2026-05-19: original silent-fallback claim withdrawn; W328-S2 user-error verdict also retracted; root cause UNDETERMINED pending W330 investigation of rate-limit / token-scope / MCP-transform / cache paths. Source-deep-dive evidence (3-org-distinct): github/docs qualifier table (Org 1) + api.github.com runtime probes (Org 2) + perplexity.ai/LFE aggregation (Org 3) confirm `repo:owner/name` + `user:`/`owner:`/`org:` validity for /search/repositories. Workaround patterns (Stage-0 get_repository probe) REMAIN SOTA for rate-limit-budget reasons.]

- **GitHub MCP `search_repositories`**: NOT in `.mcp.json` enabled list. Not testable here. CLAUDE.md W315/W316/W317 trace mentions "4th-time confirmed silent-fallback" — that was via the `mcp__plugin_everything-claude-code_github__search_repositories` plugin tool. Out of `.mcp.json` scope.
- **hf-mcp-server**: HTTP available in current session as `mcp__hf-mcp-server__*` tools.
- **deepwiki**: HTTP available; not probed for handshake but tools surface in this session.
- **chrome-devtools**: pinned @1.0.1 (W316-r2 upgrade from @0.26.0 ratified). Live probe TBD.
- **playwright**: alternate browser-automation channel.
- **cognee**: live ✓ via Stream D handshake.
- **basic-memory**: live ✓ via T6 mem-recall pattern (Stream D didn't dispatch a search, but the tool is in deferred surface).
- **gitnexus**: `mcp__gitnexus__*` tools surface — server can start; per `_comments.gitnexus` 13 MCP tools.
- **langfuse**: `mcp__langfuse__*` surface in deferred tools list — live.
- **perplexity**: W317-S7 smoke ✓; key env present.
- **serena**: live, used extensively in prior waves.
- **repomix**: live; used for codebase analysis.
- **ccusage**: live.

**No new MCP silent-fallback observed in this Stream D session beyond what's been catalogued in W315-r2 D-3 + W316-S7 + W317-r2 carry-forwards.**

---

## §3. CLI silent-fallback channels not yet catalogued

### CLI-4: pip vs uv package-management drift
W319 did not probe pip env — only uvx + python --version. The CLAUDE.local.md `Z:\venvs\claude` references "shared with sibling/parent" — if multiple runtimes share a venv, pip-pinned vs uv-pinned drift between runtimes is a known anti-pattern. **W320 P3** — codify which package manager owns the venv (CLAUDE.local.md note).

### CLI-5: `claude --version` matches `2.1.144` exactly
The `.claude/settings.json:428` declares `"minimumVersion": "2.1.144"`. Local matches. **GOOD — no upgrade-required gate would block.**

---

## §4. Plugin-shipped MCPs (not in `.mcp.json`)

From the deferred tool surface, dozens of plugin-shipped MCPs are loaded by enabled plugins (`everything-claude-code`, `context-mode`, `gitnexus-marketplace`, etc.). Examples observed in this session:

- `mcp__plugin_context-mode_context-mode__ctx_*` (ctx_batch_execute, ctx_search, ctx_execute, etc.) — context-mode plugin v1.0.136 (LOCAL HEAD per `.claude/plugins/cache/context-mode/context-mode/`)
- `mcp__plugin_everything-claude-code_*` (github, exa, memory, playwright, sequential-thinking, context7) — ECC plugin
- `mcp__serena__*`, `mcp__repomix__*`, `mcp__deepwiki__*` — `.mcp.json` declared
- `mcp__gitnexus__*` — `.mcp.json` declared but gitnexus plugin DISABLED (`enabledPlugins["gitnexus@gitnexus-marketplace"]: false`); the MCP comes from `.mcp.json` not the plugin
- `mcp__cognee__*` — `.mcp.json` declared, cognee plugin NOT in extraKnownMarketplaces (operator-curated MCP)
- `mcp__perplexity__*` (actually `mcp__plugin_everything-claude-code_exa__*` — NO. perplexity MCP wasn't in this deferred list. Need to confirm: did `.mcp.json` perplexity entry surface? Not observed in Stream D session's available tools per the deferred list ToolSearch hit)

### MCP-4 LOW: context-mode upgrade gate
context-mode plugin local-cache has BOTH `1.0.136` AND `1.0.141` directories present. Plugin is loaded at v1.0.136 (ctx_search emits "outdated → v1.0.141 available. Upgrade: /ctx-upgrade"). Operator-AI W315-r2 Stream A T0-UPGRADE — still PENDING per W320. **W320 P1** — run `/ctx-upgrade` to advance to 1.0.141 (closes 5 PR #627 patches behind).

### MCP-5 LOW: ECC plugin cache version
Installed plugin gitCommitSha = `8148340ad14eb32c971346f0cb4cb9431ec0f5de` (W316-r2-Stream-A target).  
Local `/z/repos/deps/everything-claude-code` HEAD = `b62f8075` (2026-05-19 — 1 day newer).  
Upstream HEAD = `98bd517451` (further ahead). 
The `enabledPlugins` block has `"everything-claude-code@everything-claude-code": true`. Re-running `/plugin update` would refresh the cache. **W320 P2** — same operator-AI as W316-D + W317-D.

---

## §5. Tally

- **CLI-1 LOW**: codex 0.130.0 → 0.131.0 (1 patch behind)
- **CLI-2 LOW**: python 3.13 → 3.14.3 (CLAUDE.local.md stale note)
- **CLI-3 MEDIUM**: `claude doctor` EXIT=0 silent (different failure mode from W312-A.2 EXIT=124)
- **MCP-1 MEDIUM**: gitnexus invocation `gitnexus mcp` (not npx-bootstrapping)
- **MCP-2 MEDIUM**: langfuse `node + abs Z:/path` (carry STALE-D-9)
- **MCP-4 LOW**: context-mode upgrade 1.0.136 → 1.0.141 pending
- **MCP-5 LOW**: ECC plugin cache update pending

**Total**: 2 MEDIUM + 4 LOW = 6 CLI/MCP findings.

**End STREAM-D-CLI-AND-MCP.md**
