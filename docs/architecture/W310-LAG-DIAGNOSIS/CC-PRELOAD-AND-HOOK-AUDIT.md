# W310 — CC Preload + Hook + MCP Audit (lag diagnosis, research-only)

**Date**: 2026-05-18
**Scope**: Read-only inventory of `.claude/settings.json` hooks, `plugin.json` ship-hooks, `SKILL.md` description preload, `.mcp.json` server spawn — no modifications.
**Method**: parsed all manifests in `Z:/claude-sota-installed/.claude/plugins/cache/**` via Node.js (`fs.readdirSync` walk), cross-referenced enabled state with `settings.json:enabledPlugins`.

---

## 0. One-screen summary

| Metric | Count / Size |
|---|---|
| `plugin.json` files in cache (all versions, multi-cached) | **2,829** |
| `SKILL.md` files in cache (all versions) | **4,444** |
| Cumulative `SKILL.md` file bytes | **55.8 MB** |
| Cumulative skill **description** bytes (YAML frontmatter `description:` field — the actual preload string) | **1.49 MB** (mean 342 B / skill) |
| `plugin.json` manifests with a `hooks` key | **6** |
| `hooks.json` files in cache (versioned) | **78** |
| `hooks.json` with over-fire matcher (`.*` / `*` / empty) | **25** (across 6 unique plugin-dirs, **2 of which are ENABLED**) |
| `hookify` cached versions (dead, plugin disabled) | **47** |
| Total `plugins/cache/` size on disk | **1,059.7 MB** |
| `enabledPlugins` true count | **47** of 68 declared |
| `.mcp.json` servers declared | **14** total / **8 enabled** / **6 disabled** |
| `.claude/settings.json` user-hook entries | **8 events** (SessionStart, PreToolUse, PostToolUse, PreCompact, WorktreeRemove, Notification, PostToolUseFailure, TaskCompleted) |

---

## 1. `.claude/settings.json` user-hook inventory

Cite anchor: `Z:/claude-sota-installed/.claude/settings.json:96-188`.

| Event | Matcher | Command (truncated) | Latency class | Notes |
|---|---|---|---|---|
| **SessionStart** (:97-105) | (none) | `node Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs` | **short** (~30-150ms cold) | W286-cross bug-shim for `anthropics/claude-code#46915`; cardinal-rule-2 sanctioned exception |
| **PreToolUse** (:107-121) | `Bash` | `gitleaks protect --staged --no-banner --redact --exit-code 0 \|\| true` | **short** (50-200ms — gitleaks cold-start on Win) | Fires on EVERY Bash tool call |
| **PreToolUse** (:107-121) | `Bash` | `bash -c "cmd=...; case ... codex adversarial-review --wait \|\| exit 2 ..."` (timeout 900s) | **instant** in fast-path (case miss) / **long** on hit (codex review can be 30-120s) | Only fires on destructive git verbs; case miss = `~5-15ms` bash dispatch |
| **PostToolUse** (:123-133) | `Edit\|Write\|MultiEdit` | `bash -c "f=...; case ... ruff check ... ruff format ...; shellcheck ..."` | **short** (50-300ms cold; ruff is fast) | Fires on every file edit |
| **PreCompact** (:134-143) | `auto` | `powershell -NoProfile -WindowStyle Hidden -Command "Add-Content ..."` | **short** (~100-400ms — PS cold-start) | Logging only, infrequent (only on auto-compact) |
| **WorktreeRemove** (:145-153) | (none) | `git worktree prune \|\| true` | **short** (~50-150ms) | Only on worktree-remove (rare) |
| **Notification** (:155-163) | (none) | `powershell ... Beep` | **short** (~100-300ms PS cold) | Audible beep — fires per notification event |
| **PostToolUseFailure** (:165-175) | `Bash` | `powershell -NoProfile -Command "$ev = $input \| ConvertFrom-Json; if ..."` (timeout 3s) | **short** (~100-200ms PS cold) | Only on failures; 3s timeout protects |
| **TaskCompleted** (:177-186) | (none) | `ruff check tools harness --quiet 2>&1 \|\| exit 2` (timeout 30s) | **short-to-medium** (200-800ms — ruff over `tools/` + `harness/` tree) | Per task completion |

**User-hook verdict**: 9 commands, every one cite-anchored to either Anthropic plugin (codex), upstream CLI (gitleaks, ruff, shellcheck, git), or PowerShell built-in. **Cardinal-rule-2 compliant**. Aggregate per-turn overhead from user hooks is small — **the heavy weight is in plugin-shipped hooks, not user hooks**.

---

## 2. Plugin-shipped hooks (`plugin.json` `hooks` key + `hooks.json` files)

**6 `plugin.json` files in cache declare a `hooks` block.** All 78 `hooks.json` files were parsed and 25 entries use over-fire matcher (`.*` / `*` / empty). Cross-referenced with enabled-state:

| Plugin (dir) | Enabled? | Events with over-fire matcher | Per-turn lag risk |
|---|---|---|---|
| `claude-code-workflows/review-agent-governance` | **disabled** (`settings.json:236`) | PreToolUse:`.*`, PostToolUse:`.*` | none (inactive) |
| `claude-plugins-official/outputai` | **disabled** (`settings.json:218`) | SessionStart:`*` | none |
| `claude-settings/intelligent-compact` | **disabled** (`settings.json:223`) | PreCompact:`*` | none |
| `thedotmack/claude-mem` | **disabled** (`settings.json:233`) | PostToolUse:`.*`+`*`, Setup:`*` | none |
| **`context-mode/context-mode`** | **ENABLED** (`settings.json:204`) | PreCompact, UserPromptSubmit, SessionStart (matcher omitted → fires every event) | **HIGH** — see §2a |
| **`everything-claude-code/everything-claude-code`** | **ENABLED** (`settings.json:199`) | PreToolUse:`*`, PreCompact:`*`, SessionStart:`*`, PostToolUse:`*`+`*`+`Bash\|Write\|Edit\|MultiEdit`, PostToolUseFailure:`*`, **Stop:`*` × 6**, SessionEnd:`*` | **HIGH** — see §2b |

### 2a. `context-mode@1.0.136` hooks (ENABLED)

Cite: `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.136/hooks/hooks.json`.

| Event | Commands | Per-turn class |
|---|---|---|
| **SessionStart** | 1 × `node sessionstart.mjs` | **short** (~50-200ms node cold) — fires once |
| **UserPromptSubmit** | 1 × `node userpromptsubmit.mjs` | **short-to-medium** (~50-300ms each prompt) — **fires EVERY user prompt** |
| **PreToolUse** | 9 commands (tool-scoped matchers) | **short** (~30-150ms × 9 per matching tool) — bounded by node spawn cost |
| **PostToolUse** | 1 command | **short** |
| **PreCompact** | 1 command | **short**, infrequent |

**Risk**: UserPromptSubmit spawns a node process on every prompt. On Windows + Z: drive that's ~100-300ms cold; warm-cache faster but the process always re-spawns (CC does not pool hook processes). Cumulative for a multi-turn session: significant.

### 2b. `everything-claude-code@2.0.0-rc.1` hooks (ENABLED) — **biggest single lag source**

Cite: `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/hooks/hooks.json`.

**26 total hook commands** across 7 events. Every single command invokes `Z:\tools\nodejs\node.exe Z:\...\plugin-hook-bootstrap.js` (a Node spawn per hook call).

| Event | Commands | Matchers | Per-turn class |
|---|---|---|---|
| **PreToolUse** | 8 | `Bash`, `Write`, `Edit\|Write`, `*` (×2), `Bash\|Write\|Edit\|MultiEdit`, `Write\|Edit\|MultiEdit`, `Edit\|Write\|MultiEdit` | **short-to-medium** — `*` matchers fire on EVERY tool call (×2). On a single Bash call this is ~2-4 node spawns; on Edit it's ~5-6 spawns |
| **PostToolUse** | 8 | similar distribution, including 2× `*` | same as above |
| **Stop** | 6 (all `*`) | — | **6× node spawns at every Stop event** (every assistant turn end) |
| **SessionStart** | 1 (`*`) | — | one-off cold-spawn |
| **SessionEnd** | 1 (`*`) | — | one-off |
| **PreCompact** | 1 (`*`) | — | rare |
| **PostToolUseFailure** | 1 (`*`) | — | only on failure |

**Risk**: Each assistant turn pays a **6 × node-spawn Stop tax** (~300-1200ms aggregate cold-start), plus on every tool call a 2-6 × node-spawn PreToolUse + PostToolUse tax. On a 10-tool turn (typical), this is **40-60 node-process spawns per turn**, each loading the same bootstrap.js → ~3-8 seconds aggregate overhead.

### 2c. Other enabled plugins with hooks (clean)

- `openai-codex/codex@1.0.4` — 3 hooks (SessionStart, SessionEnd, Stop), all matcher=`(none)` (one-shot). **Stop fires the codex GPT-5.5 adversarial review gate** — when triggered this is **LONG** (30-120s wait); CC blocks turn-completion until codex returns. This is W280a's stop-time review gate and is the intended SOTA primitive but it IS a major per-completion latency contributor.
- `hindsight/hindsight-memory@0.6.5` — 4 hooks (SessionStart / UserPromptSubmit / Stop / SessionEnd), all matcher=`(none)`. Python invocation: `python3 ... session_start.py || python ...`. **Risk**: spawns Python on EVERY UserPromptSubmit + every Stop. Windows Python cold-start ~200-600ms; with hindsight-embed local daemon at :9077 these are network calls (sub-100ms). Still per-prompt + per-stop cost.
- `claude-code-workflows/agent-teams`, `agent-orchestration`, `context-management` — **no hooks.json**, pure agent + skill plugins.

---

## 3. Skills preload — description-text byte audit

Anthropic semantics: skill **bodies** are lazy-loaded on auto-fire; skill **descriptions** (YAML frontmatter `description:`) ARE preloaded via the system-reminder skill-list emitted at session start.

| Metric | Value |
|---|---|
| Total `SKILL.md` files in cache (all versions, including disabled-plugin caches) | **4,444** |
| **Skill descriptions text bytes (cumulative)** | **1,521,795 bytes (~1.45 MB)** |
| Mean description size | 342 bytes |

But **only enabled plugins' skills preload**. Looking at the system-reminder above, the actually preloaded skill list contains roughly **800-900 lines** of skill names + descriptions, which empirically is **~80-150 KB** of tokens — not 1.45 MB. The 4,444 figure is dominated by:

| Plugin (top by SKILL.md count) | SKILL.md count | Enabled? |
|---|---|---|
| `claude-plugins-official/plugin-dev` | **1,701** | enabled |
| `claude-plugins-official/mcp-server-dev` | **726** | enabled |
| `everything-claude-code/everything-claude-code` | **455** | enabled |
| `claude-plugins-official/frontend-design` | 254 | enabled |
| `claude-plugins-official/skill-creator` | 248 | enabled |
| `claude-plugins-official/playground` | 242 | enabled |
| `claude-plugins-official/session-report` | 242 | enabled |
| `claude-plugins-official/outputai` | 94 | **disabled** |
| `claude-code-skills/engineering-advanced-skills` | 76 | enabled |
| `claude-plugins-official/qdrant-skills` | 52 | **disabled** |
| `claude-code-skills/engineering-skills` | 51 | enabled |
| `claude-plugins-official/hookify` | 47 | **disabled** |

**Critical finding**: the top three plugins (`plugin-dev`, `mcp-server-dev`, `everything-claude-code`) ship **2,882 skills** between them. Even at 342 B/desc that's ~960 KB of description text. The Anthropic doc says descriptions preload — so this is direct preload-budget pressure. **`plugin-dev` shipping 1,701 skills is anomalous and worth re-examining for adoption fit.**

---

## 4. `.mcp.json` server inventory

Cite: `Z:/claude-sota-installed/.mcp.json:16-146` + `settings.json:88-95` (disabled list).

| Server | Transport | Enabled? | Spawn cost / process | Notes |
|---|---|---|---|---|
| `github` | **http** | disabled (`settings.json:90`) | none | Remote HTTP, would be cheap if enabled |
| `context7` | **http** | disabled (`:91`) | none | Remote HTTP |
| `deepwiki` | **http** | **enabled** | none (remote HTTP) | Cheap |
| `playwright` | **stdio** (npx) | disabled (`:92`) | none | Would spawn 1 node + cold-start playwright bundle |
| `chrome-devtools` | **stdio** (npx) | **enabled** | **1 node process per CC session** | npx cold-start ~1-2s; warm cache faster |
| `repomix` | **stdio** (npx) | **enabled** | **1 node process per CC session** | npx cold-start ~1-2s |
| `serena` | **stdio** (uvx) | **enabled** | **1 python process per CC session** | uvx cold-start can be 2-5s on Windows + git-pinned SHA fetches |
| `memory` | **stdio** (native exe) | disabled (`:89`) | none | Would be cheap (native exe, no node/python startup) |
| `graphiti` | **stdio** (uv run) | disabled (`:93`) | none | Heavy: uv + FalkorDB :16379 + Ollama :16700 chain |
| `phoenix` | **stdio** (npx) | **enabled** | **1 node process per CC session** | npx cold-start |
| `gitnexus` | **stdio** (native exe) | **enabled** | **1 node process per CC session** | Cold-start, plus internal Kuzu/LadybugDB load |
| `ccusage` | **stdio** (native node) | **enabled** | **1 node process per CC session** | Cheap (direct node, no npx) |
| `cognee` | **http** | disabled (`:94`) per disabled-list, **but NSSM service `CogneeMCP` runs at `:8000`** | none from CC | Remote HTTP would be cheap |
| `langfuse` | **stdio** (native node) | **enabled** | **1 node process per CC session** | Cheap |
| `basic-memory` | **stdio** (uvx) | **enabled** | **1 python process per CC session** | uvx cold-start ~2-5s |
| `hf-mcp-server` | **http** | **enabled** | none (remote HTTP) | Cheap |

**Enabled stdio MCP processes**: **8 long-lived child processes per CC session** (chrome-devtools, repomix, serena, phoenix, gitnexus, ccusage, langfuse, basic-memory).

**RAM multiplication**: per-process baseline ~50-150 MB (node) / 80-250 MB (python+uvx) → conservative **~600 MB-1.5 GB of MCP-server RSS per CC session**. With 2-3 parallel sessions (per W280d cap), that's **1.2 GB-4.5 GB** of MCP-server RAM alone.

**Cold-start tax**: serena + basic-memory (both uvx) plus the 4 npx-pinned servers (chrome-devtools, repomix, phoenix — npx-pinned per W286-cross trade-off explicitly noted to add ~0.5-1s cold-start each in `.mcp.json:7`) → **~5-10s cumulative cold-start at session start before CC is interactive**.

---

## 5. Top-5 lag-risk contributors

| Rank | Contributor | Type | Cite | Estimated impact |
|---|---|---|---|---|
| **1** | **`everything-claude-code@2.0.0-rc.1` 26 hooks** — 6× `*`-matcher Stop + 2× `*`-matcher PreToolUse + 2× `*`-matcher PostToolUse | plugin-shipped hooks | `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/hooks/hooks.json` | **~3-8s per turn** (40-60 node spawns) on a tool-heavy turn |
| **2** | **8 enabled stdio MCP servers** (chrome-devtools, repomix, serena, phoenix, gitnexus, ccusage, langfuse, basic-memory) — 4 of them use `npx`/`uvx` cold-start | MCP processes | `Z:/claude-sota-installed/.mcp.json:35-145` + `settings.json:88-95` | **~5-10s session cold-start + ~600 MB-1.5 GB RAM per session** (W280d ×3 cap → up to 4.5 GB) |
| **3** | **Top-3 skill-pack preload** — `plugin-dev` 1,701 + `mcp-server-dev` 726 + `everything-claude-code` 455 SKILL.md files → ~960 KB of `description:` text preloaded as system-reminder | skill preload budget | `Z:/claude-sota-installed/.claude/plugins/cache/{claude-plugins-official/plugin-dev,claude-plugins-official/mcp-server-dev,everything-claude-code/everything-claude-code}/**/SKILL.md` | **adds 80-150 KB tokens to every session** before the first user turn; recurring cost in long sessions |
| **4** | **codex Stop-gate adversarial review** (when fires) | user hook → plugin script | `Z:/claude-sota-installed/.claude/settings.json:107-121` (PreToolUse gate) + `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` (Stop hook) | **30-120s wait per fired review** — intended SOTA primitive but blocks turn completion |
| **5** | **`hindsight-memory@0.6.5` Python on UserPromptSubmit + Stop** — fires every prompt + every assistant-turn-end | plugin-shipped hooks | `Z:/claude-sota-installed/.claude/plugins/cache/hindsight/hindsight-memory/0.6.5/hooks/hooks.json` | **~100-300ms per prompt + per stop** (Python cold-start + local :9077 daemon round-trip); cumulative over a multi-turn session |

**Honorable mention** (high-impact but harder to estimate without telemetry):
- **2,829 plugin.json files** + **47 cached hookify versions** + **1.06 GB plugins/cache** on disk — CC scans the cache tree at session-start; pure-file-stat overhead at this scale is non-trivial on Z: drive (Windows NTFS over USB/network volumes can be 5-50× slower than C:). Worth measuring with a procmon trace.

---

## 6. Recommended next probes (not executed — research-only)

1. **procmon trace** of CC session-start to confirm whether the `plugins/cache` tree-walk is a measurable contributor (hypothesis: yes, given 2,829 plugin.json + 4,444 SKILL.md scan).
2. **Disable `everything-claude-code` for one session** and measure turn-end latency delta — if delta is 1-3s on tool-heavy turns, the `*`-matcher hook fan-out is confirmed as #1.
3. **Audit `plugin-dev@claude-plugins-official`** — 1,701 SKILL.md from one plugin is anomalous; verify it's not a misconfigured monorepo dump.
4. **Pool MCP processes across CC sessions** — Anthropic does not currently pool; if this lands upstream it could 3× reduce per-session RAM.
5. **Promote `cognee` + `graphiti` to consistent HTTP transport** — both backed by always-on services already; removing stdio spawn churn would buy back ~1-2s session start.

---

## 7. Cardinal-rule integrity check (audit-side observations)

- **Cardinal-rule-2 (no project-owned hook bodies)**: ✓ Only sanctioned `.claude/hooks/context-mode-cache-heal.mjs` (W286-cross-bug-shim cite-anchored to anthropics/claude-code#46915).
- **Cardinal-rule-9 (MCP `npx -y <pkg>@<version>`)**: ✓ All 4 npx-pinned servers carry explicit versions (`@playwright/mcp@0.0.75`, `chrome-devtools-mcp@0.26.0`, `repomix@1.14.0`, `@arizeai/phoenix-mcp@4.0.13`); basic-memory uvx pinned to `basic-memory==0.21.1` per W308. `langfuse` + `ccusage` + `memory` use native-node-path (W155 F13 surviving pattern, not P0C-violation). `serena` uses uvx with git-SHA pin.
- **W255 invariant (`self_invented_count: 0`)**: ✓ No `.py`/`.sh` in `.claude/hooks/scripts/**`.

---

## Appendix: parse method

All counts produced by Node.js `fs.readdirSync` walk under `Z:/claude-sota-installed/.claude/plugins/cache`, every `plugin.json` + `hooks.json` parsed with `JSON.parse`. SKILL.md description bytes computed from YAML frontmatter `description:` field via regex on first `---...---` block. No data was written; the prior PowerShell attempt failed (`EmptyPipeElement` due to dollar-sign escaping under MCP transport) — final figures are from Node-based ctx_execute that ran cleanly.
