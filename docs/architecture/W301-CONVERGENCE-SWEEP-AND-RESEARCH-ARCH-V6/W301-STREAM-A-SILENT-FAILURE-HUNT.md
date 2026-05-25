# W301 Stream A — Silent-failure / Stale-reference / Terminal-error Hunt

> **Wave**: W301; **Stream**: A; **Owner**: agent-A-silent-failure; **Date**: 2026-05-18
> **File ownership**: this file only; recommendations only — no fixes applied.
> **Branch at scan**: `sota-converge-w295`; **CC version observed in JSONLs**: 2.1.143 (most recent), 2.1.142 (older sessions).
> **Settings on disk**: settings.json mtime 2026-05-18 (today), settings.local.json mtime 2026-05-18.

## §0 TL;DR

**Bottom line: the runtime is functionally live, but carries 5 CRITICAL stale-reference / config-drift bugs and 1 chronic terminal-error pattern that together silently degrade the memory layer, the codex T2 cross-model gate, and ~58 historical sessions.**

**Counts (post-scan)**:
- **§1 Stale references**: 7 findings (1 CRITICAL stale graphiti dependency in tools/, 1 CRITICAL skill internal contradiction, 1 HIGH `settings.local.json` enabledMcpjsonServers drift re-enabling retired MCPs, 4 HIGH `/slash` commands targeting a dead MCP namespace `mcp__memory__*`).
- **§2 Broken hook paths**: 0 missing-file findings — every referenced binary/script resolved on `Test-Path`; status NOMINAL with 1 LOW caveat.
- **§3 .mcp.json server validity**: 2 findings (1 HIGH `serena` unpinned-package supply-chain via `git+https://...@<sha>` arg-form is verified pinned but worth re-confirming the CR-9 contract; 1 MEDIUM Phoenix MCP backend port :16006 is CLOSED so the MCP starts but its `--baseUrl` resolves to a dead service — silent failure on every Phoenix call + silent OTEL telemetry drop).
- **§4 Silent-fallback code**: 3 findings (`tools/awesome_list_deltagrep.py` URL-failure swallows to `""` then returns 0 missing repos; `harness/sota_rubric_lane.py` 2× `except Exception: return None` silently dropping smoke-test runs; `tools/process_hygiene_audit.py` silently returning empty list on subprocess error).
- **§5 Recent terminal errors / hook failures**: 2 findings (1 CRITICAL chronic `context-mode userpromptsubmit.mjs` JavaScript heap OOM fatal exitCode 134 across **58 sessions**; 1 HIGH `[MCPHealthCheck] No MCP config found for basic-memory` + `for plugin_context-mode_context-mode` — health-check plugin silently can't find these MCPs).

**Top-3 priorities for parent to apply this wave**:
1. **§5.1** context-mode userpromptsubmit.mjs heap OOM — chronic 58-session bug; needs upstream issue or `--max-old-space-size` flag in the hook command (15-30 min).
2. **§1.3** `settings.local.json:enabledMcpjsonServers` lists `graphiti` + `memory` — both retired (W295 + W282d); explicitly contradicts `settings.json:disabledMcpjsonServers`; remove (5 min).
3. **§1.1** `tools/sota-reverify.ps1` actively queries the retired graphiti MCP as its sole pathway — entire script is dead. Either replace with basic-memory query or rename `.disabled` + add stub pointing to AI-5-finish migration tool (10-15 min).

---

## §1 Stale references (category 1)

### 1.1 Finding — `tools/sota-reverify.ps1` queries retired graphiti MCP as its only pathway

- **Severity**: **CRITICAL**
- **File**: `Z:/claude-sota-installed/tools/sota-reverify.ps1:1-152`
- **Evidence**: 9 graphiti references; the instruction body the script prints (`tools/sota-reverify.ps1:117-120`):
  ```
  1. Call mcp__graphiti__search_memory_nodes:
       query     = "$SearchQuery"
       group_ids = ["$GroupId"]
       max_nodes = $Limit
  ```
- **Why stale**: graphiti MCP retired W295 — `.claude/settings.json:91` lists `"graphiti"` in `disabledMcpjsonServers`; SKILL.md `sota-convergence-audit:626` declares the graphiti ledger tier "RETIRED W290"; CLAUDE.md states T4 graphiti is RETIRED. The script's CR-2-compliance comment (`tools/sota-reverify.ps1:104-110`) explicitly hand-waves that "we cannot call MCP from PowerShell directly" and offloads the call to a CC session — but the instruction it prints points to a tool that no longer exists in any session.
- **Recommended fix** (do NOT apply):
  ```diff
  - # Cite: TIER-1-DIRECT https://learn.microsoft.com/.../get-nettcpconnection
  - # graphiti search query string. Defaults to the schema field name so the
  - # MCP's semantic search returns adoption-verdict episodes.
  - [string]$SearchQuery = 'adoption-verdict reverification_due'
  + # basic-memory search query string. Defaults to scan `verdicts/` notes.
  + # Per W290 graphiti retirement, the canonical adoption-decisions ledger is
  + # T6 basic-memory `directory="verdicts"`.
  + [string]$SearchQuery = 'adoption-verdict reverification_due'
  ```
  And replace the printed instruction at lines 117-120 with `mcp__basic-memory__search_notes(query="$SearchQuery", page=1, page_size=$Limit)` plus a parse-step that reads the returned permalinks rather than `episode_body.candidate`. Alternative: rename to `sota-reverify.ps1.disabled` until the AI-5-finish migration tool ships.
- **Risk if not fixed**: every cron tick of `/loop 7d /sota-reverify oldest` (W286d C.5) issues a CC-side prompt that references a dead MCP tool; CC's tool-search will return no match and the loop body silently no-ops while reporting "would query graphiti" — the operator never learns no actual re-litigation happened.

### 1.2 Finding — `.claude/skills/mem-recall/SKILL.md` contradicts itself on graphiti fallback

- **Severity**: **CRITICAL**
- **File**: `Z:/claude-sota-installed/.claude/skills/mem-recall/SKILL.md:3, 32, 44, 47, 71`
- **Evidence**: Lines 44-47 instruct the skill to fall back to `mcp__graphiti__search_memory_nodes` when T6 returns 0; line 71 describes the T4 graphiti backend as "Fallback T4 — graphiti (`mcp__graphiti__*`): graphiti-mcp via FalkorDB :16379 + Ollama :16700"; line 3 description-string says "with mcp__graphiti__search_memory_nodes as semantic fallback." But CLAUDE.md states **T4 graphiti was RETIRED W295** and `settings.json:91` disables it. The skill description (line 3) is the trigger string CC uses to auto-invoke the skill — telling the model graphiti is the fallback when it isn't.
- **Why stale**: same root cause as 1.1 — W295 graphiti retirement was not propagated into `.claude/skills/mem-recall/SKILL.md`.
- **Recommended fix** (do NOT apply):
  ```diff
  - description: Use when the current task mentions ... via mcp__basic-memory__search_notes (T6, primary) with mcp__graphiti__search_memory_nodes as semantic fallback. ...
  + description: Use when the current task mentions ... via mcp__basic-memory__search_notes (T6, primary) with mcp__plugin_everything-claude-code_memory__search_nodes as KG fallback. ...
  ```
  And in the body (lines 32, 44-47, 71), replace `mcp__graphiti__*` references with the active T2-split path `mcp__plugin_everything-claude-code_memory__search_nodes`. Per `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.mcp.json:15-18` the plugin's memory server is `@modelcontextprotocol/server-memory@2026.1.26` — exposes `search_nodes`/`open_nodes`/`create_entities` etc, NOT a `search_memory_nodes` tool.
- **Risk if not fixed**: when basic-memory returns 0 matches, the skill instructs the model to call a tool that does not exist — call fails silently (tool not found), recall returns 0 results, operator loses the entire fallback layer.

### 1.3 Finding — `settings.local.json:enabledMcpjsonServers` re-enables retired MCPs (graphiti + memory)

- **Severity**: **HIGH**
- **File**: `Z:/claude-sota-installed/.claude/settings.local.json:11-22`
- **Evidence**:
  ```
  "enabledMcpjsonServers": [
    "github", "context7", "deepwiki", "playwright", "serena", "repomix",
    "memory", "graphiti", "phoenix", "gitnexus"
  ]
  ```
  while `settings.json:86-92` disables exactly those: `"memory"` and `"graphiti"`.
- **Why stale**: Per Anthropic CC settings precedence (`https://docs.anthropic.com/en/docs/claude-code/settings`), `settings.local.json` enabledMcpjsonServers (operator-local) may override project-level `disabledMcpjsonServers` (or it may not — the precedence between `enabledMcpjsonServers` and `disabledMcpjsonServers` is not unambiguously documented). Either way, the lists explicitly disagree — silent-conflict drift.
- **Recommended fix** (do NOT apply):
  ```diff
    "enabledMcpjsonServers": [
      "github",
      "context7",
      "deepwiki",
      "playwright",
      "serena",
      "repomix",
  -   "memory",
  -   "graphiti",
      "phoenix",
      "gitnexus"
    ]
  ```
- **Risk if not fixed**: the W282d retirement of `.mcp.json:memory` and W295 retirement of `.mcp.json:graphiti` can be silently undone on this machine; both servers may attempt to start (memory.exe exists at `Z:/venvs/claude/Scripts/memory.exe`; the graphiti uv command may also fire) — wasting startup time, possibly competing with the live `plugin:everything-claude-code:memory` and risking double-write into orphaned sqlite_vec DB.

### 1.4 Finding — `.claude/commands/recall.md` targets dead `mcp__memory__memory_search`

- **Severity**: **HIGH**
- **File**: `Z:/claude-sota-installed/.claude/commands/recall.md:2, 6, 36`
- **Evidence**:
  - Line 2 (description): "Search persistent memory ... via mcp__memory__memory_search."
  - Line 6 (allowed-tools): `mcp__memory__memory_search`
  - Line 36 (body): "Invoke `mcp__memory__memory_search` with `mode: \"semantic\"`, `query`, ..."
- **Why stale**: `.mcp.json:55-62` `memory` server (mcp-memory-service) is RETIRED W282d and listed in `disabledMcpjsonServers`. The active memory layer is `plugin:everything-claude-code:memory` whose tool surface is `mcp__plugin_everything-claude-code_memory__*` — those tools do NOT include `memory_search` / `memory_harvest` (the plugin's memory server is the upstream `@modelcontextprotocol/server-memory@2026.1.26` knowledge-graph variant with `search_nodes`/`open_nodes`/`create_entities`/`add_observations`).
- **Recommended fix** (do NOT apply): Either (a) re-write `/recall` to call `mcp__basic-memory__search_notes` (T6, canonical post-W295), or (b) re-enable the `memory` MCP entry and remove it from `disabledMcpjsonServers` (re-instating T2 conflicts with W282d retirement). Recommendation: route to basic-memory; the slash command frontmatter becomes:
  ```diff
  - allowed-tools:
  -   - mcp__memory__memory_search
  + allowed-tools:
  +   - mcp__basic-memory__search_notes
  ```
- **Risk if not fixed**: operator running `/recall <query>` hits a tool-not-found; CC permits the slash command body to dispatch but the model can't invoke a non-existent tool; the operator sees no error and no results — silent dead surface.

### 1.5 Finding — `.claude/commands/harvest.md` targets dead `mcp__memory__memory_harvest`

- **Severity**: **HIGH**
- **File**: `Z:/claude-sota-installed/.claude/commands/harvest.md:2, 6, 43`
- **Evidence**: identical pattern to 1.4 — `allowed-tools: mcp__memory__memory_harvest` (line 6), `Invoke mcp__memory__memory_harvest` (line 43). Backend cite at line 15 still claims runtime is `mcp-memory-service v10.51.3 at Z:/venvs/claude/Scripts/memory.exe per .mcp.json:38-46` — but `.mcp.json:55-62` (current line range) lists memory in disabled and the entry exists only for historical reference per W282d retirement.
- **Recommended fix** (do NOT apply): Either re-enable upstream `mcp-memory-service` (un-do W282d) OR re-design `/harvest` to invoke a basic-memory-write equivalent. Basic-memory's API does not have a 1-to-1 `memory_harvest` analogue (basic-memory is markdown-write, not session-JSONL-extract), so this command may need full re-design or deprecation. Recommendation: deprecate; add a notice at top of file pointing operator to manual `mcp__basic-memory__write_note` calls.
- **Risk if not fixed**: chronic CAPTURE primitive is dead — no auto-extract from session JSONLs lands in T6; the runtime's memory writes accrete only via explicit operator-typed `mcp__basic-memory__write_note` invocations.

### 1.6 Finding — `.claude/commands/mistake-add.md` + `mistake-search.md` target dead `mcp__memory__mistake_note_*`

- **Severity**: **HIGH**
- **File**:
  - `Z:/claude-sota-installed/.claude/commands/mistake-add.md:6, 17, 24, 44, 56`
  - `Z:/claude-sota-installed/.claude/commands/mistake-search.md:6, 11, 16, 36`
- **Evidence**: both commands list `mcp__memory__mistake_note_add` / `mcp__memory__mistake_note_search` in `allowed-tools`; backends cite `mcp-memory-service v10.51.3 at Z:/venvs/claude/Scripts/memory.exe per .mcp.json:38-46` — same dead-server reference as 1.4/1.5.
- **Recommended fix** (do NOT apply): same as 1.5 — either re-enable upstream `mcp-memory-service` (specifically because mistake-note primitives are unique to that server — no basic-memory analogue), OR deprecate. **`mistake-note` primitives are unique to doobidoo/mcp-memory-service** (per backend cites — `server_impl.py:2225-2257` `mistake_note_add`/`mistake_note_search` Tool registrations). If the W282d retirement was scoped to "the memory KG layer" but the mistake-note primitives are load-bearing for FM-class recovery, **re-enabling `memory` MCP in `disabledMcpjsonServers` may be the correct path** (and resolves 1.4 + 1.5 + 1.6 together).
- **Risk if not fixed**: 4 of the 4 operator-curated memory slash-commands target the same dead namespace — entire CAPTURE+RECALL+mistake-aware memory surface is dead.

### 1.7 Finding — `tools/eee.ps1` historical `graphiti` reference (informational, NOT stale)

- **Severity**: **LOW** (informational — kept here for completeness; the reference is a comment-only mention in the env-block doc explaining why LANGFUSE_* must be set)
- **File**: `Z:/claude-sota-installed/tools/eee.ps1:49`
- **Evidence**: `# .mcp.json ${LANGFUSE_*} interpolations in graphiti + langfuse MCPs would resolve`
- **Why NOT stale**: this is a historical justification comment for the env-block design; even with graphiti retired the comment correctly documents why the env-block exists (langfuse MCP still uses it).
- **Recommended fix**: when the graphiti MCP block is removed from `.mcp.json` per the AI-5-finish queue, update this comment to drop `graphiti +`. No action this wave.

---

## §2 Broken hook paths (category 2)

**0 missing-file findings.** Every command path referenced in `.claude/settings.json:hooks` resolves on `Test-Path`:

| Hook | Command path | Test-Path |
|---|---|---|
| SessionStart | `Z:/tools/nodejs/node.exe` | True |
| SessionStart | `Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs` | True |
| PreToolUse (Bash) | `gitleaks` on PATH (`Z:/claude-sota-installed/.local/bin/gitleaks.exe`) | True |
| PostToolUse | `bash` on PATH (`C:/WINDOWS/system32/bash.exe`) + `jq` (`C:/ProgramData/chocolatey/bin/jq.exe`) + `ruff`/`shellcheck` | True |
| PreCompact | `powershell` (builtin) + `Z:/claude-sota-installed/tmp/precompact.log` (log path — auto-created on Add-Content) | True |
| WorktreeRemove | `git worktree prune` (git on PATH) | True |
| Notification | `powershell` System.Console.Beep | True |
| statusLine | `node` (PATH) + `C:/Users/42/AppData/Roaming/npm/node_modules/ccstatusline/dist/ccstatusline.js` | True |

### 2.1 Finding — `statusLine.command` uses C:-only path (Z:-portability caveat)

- **Severity**: **LOW**
- **File**: `Z:/claude-sota-installed/.claude/settings.json:160-164`
- **Evidence**: `"command": "node C:/Users/42/AppData/Roaming/npm/node_modules/ccstatusline/dist/ccstatusline.js --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json"`
- **Why caveat**: file exists today on this machine (verified), but the C:/Users/42 path bakes the Windows username into tracked `settings.json` — same Z:-portability concern that drove W286-cross to replace `node C:.../<pkg>/cli.js` MCP forms with `npx -y <pkg>@<pinned-version>` per `.mcp.json:_comments.w286_cross_npx_pinned_v2`. Inconsistent: `.mcp.json` was W286-cross-fixed; `settings.json:statusLine` was not.
- **Recommended fix** (do NOT apply): convert to `npx -y ccstatusline@<pinned-version> --config Z:/.../settings.json` OR install ccstatusline to `Z:/claude-sota-installed/.local/npm/...` and use that absolute Z:-path. Mirrors W286-cross trade-off doctrine for MCP servers.
- **Risk if not fixed**: fresh clone on a different machine (or after npm re-roots) silently loses the statusline; CC continues, just no statusline shown.

---

## §3 .mcp.json server validity (category 3)

Validated all 12 `mcpServers` entries against (a) command resolves, (b) args pin compliance, (c) env placeholder resolution. Results below.

| Server | command | PATH/file ok | CR-9 pin | env resolve |
|---|---|---|---|---|
| github | http (no command) | n/a | n/a — but `${GITHUB_TOKEN}` set (93 chars) | OK |
| context7 | http | n/a | n/a — `${CONTEXT7_API_KEY}` set (43 chars) | OK |
| deepwiki | http | n/a | n/a | OK |
| playwright | npx | OK | `@playwright/mcp@0.0.75` PINNED | OK |
| chrome-devtools | npx | OK | `chrome-devtools-mcp@0.26.0` PINNED | OK |
| repomix | npx | OK | `repomix@1.14.0` PINNED | OK |
| serena | uvx | OK | `git+https://github.com/oraios/serena@249f6b07...748e17` SHA-PINNED (see 3.1) | OK |
| memory | local exe | OK | n/a — direct exe | OK (server in disabledMcpjsonServers anyway) |
| graphiti | uv | OK (dir exists) | n/a — direct dir | OK (server in disabledMcpjsonServers anyway) |
| phoenix | npx | OK | `@arizeai/phoenix-mcp@4.0.13` PINNED | **see 3.2 — backend port :16006 CLOSED** |
| gitnexus | gitnexus | OK (`C:/Users/42/AppData/Roaming/npm/gitnexus.ps1`) | none — bare `gitnexus`; auto-upgrade D6 risk | OK |
| ccusage | node | OK | n/a — direct path; pkg pin not enforced | OK |
| cognee | http | n/a (port :8000 OPEN) | n/a | OK |
| langfuse | node | OK | n/a — direct path; pkg pin not enforced | OK (LANGFUSE_* all set, port :3000 OPEN) |
| basic-memory | local exe | OK | n/a — direct exe | OK |

### 3.1 Finding — serena SHA-pin is fine, but uvx args use legacy form

- **Severity**: **LOW** (acknowledged via `.mcp.json:_comments.serena_pin` W124 fire 1 — this is informational confirmation, not a new bug)
- **File**: `Z:/claude-sota-installed/.mcp.json:50-54`
- **Evidence**: `"args": ["--from", "git+https://github.com/oraios/serena@249f6b07f9ccac259b0ff95e06c9a40629748e17", "serena", "start-mcp-server", "--context", "claude-code"]`
- **Why caveat**: SHA pin is honored (CR-9 satisfied), but the pin is from 2026-05-09 (per `.mcp.json:_comments.serena_pin` Wave 124 fire 1). Sliding 9 days without re-verification — within Anthropic's typical "verify weekly" cadence, but the pin should be advanced periodically when upstream serena ships meaningful improvements.
- **Recommended fix** (do NOT apply): out-of-band action — run `git ls-remote https://github.com/oraios/serena HEAD` periodically; if HEAD advances meaningfully, advance the pin SHA. Track in AGING-RELITIGATION-QUEUE.md.
- **Risk if not fixed**: stable (the pin is intact); just falling behind upstream improvements.

### 3.2 Finding — Phoenix MCP backend port :16006 is CLOSED

- **Severity**: **MEDIUM**
- **File**: `Z:/claude-sota-installed/.mcp.json:103-107` + `Z:/claude-sota-installed/.claude/settings.json:30` (OTEL endpoint also targets :16006)
- **Evidence**: `Test-NetConnection 127.0.0.1:16006` (PowerShell TcpClient probe) returns CLOSED. The MCP entry `"@arizeai/phoenix-mcp@4.0.13 --baseUrl http://127.0.0.1:16006"` spawns the MCP server fine, but every tool call from the model into Phoenix routes to a non-listening backend.
- **Why stale**: Phoenix arize backend service was up at one point (per `.mcp.json:_comments.w259v9_u10_tasksupport_audit` "phoenix [stdio; backing Phoenix 127.0.0.1:16006 PORT OPEN]") but appears to have stopped. Possibly a missed restart since W297 service-restoration audit.
- **Recommended fix** (do NOT apply): operator-action — either (a) bring Phoenix arize service back up at :16006 (per W297-SERVICE-RESTORATION.md procedure), OR (b) remove the phoenix MCP entry from `.mcp.json` until the backend is restored. Also affects `settings.json:30` `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: "http://127.0.0.1:16006/v1/traces"` — all telemetry exports silently drop.
- **Risk if not fixed**: ALL Phoenix MCP tool calls (mcp__phoenix__*) fail silently (return error to model, which sees "tool error" but may not surface to operator); OTEL traces enabled via `CLAUDE_CODE_ENABLE_TELEMETRY=1` + `OTEL_TRACES_EXPORTER=otlp` silently drop on the floor — no observability for any session activity.

---

## §4 Silent-fallback code (category 4)

### 4.1 Finding — `tools/awesome_list_deltagrep.py` URL-failure silently returns empty + skews report

- **Severity**: **MEDIUM**
- **File**: `Z:/claude-sota-installed/tools/awesome_list_deltagrep.py:66-74`
- **Evidence**:
  ```python
  def fetch_url(url: str, timeout: int = 30) -> str:
      """Fetch a URL, return the text. Empty string on failure."""
      ...
      try:
          with urllib.request.urlopen(req, timeout=timeout) as resp:
              return resp.read().decode("utf-8", errors="replace")
      except (urllib.error.URLError, TimeoutError) as exc:
          print(f"  [warn] fetch failed {url}: {exc}", file=sys.stderr)
          return ""
  ```
  Then `extract_repos("")` returns `set()`, so `awesome_repos[name] = set()` and `len(repos)` is 0 in the per-list breakdown, but the report STILL renders as if the awesome-list contained 0 cited repos — producing a false-positive "0 missing repos" cross-list result when the actual cause is network failure.
- **Recommended fix** (do NOT apply):
  ```diff
  -    except (urllib.error.URLError, TimeoutError) as exc:
  -        print(f"  [warn] fetch failed {url}: {exc}", file=sys.stderr)
  -        return ""
  +    except (urllib.error.URLError, TimeoutError) as exc:
  +        print(f"  [warn] fetch failed {url}: {exc}", file=sys.stderr)
  +        raise SystemExit(
  +            f"awesome_list_deltagrep aborted: cannot fetch {url}. "
  +            f"Refusing to render a degenerate empty-cited report. "
  +            f"Re-run when network is available."
  +        )
  ```
  Alternative: track per-list-fetch-status; render the report with a leading "WARNING: 2-of-4 lists failed" line so the operator can distinguish "no missing repos" from "couldn't check".
- **Risk if not fixed**: G7 awesome-list deltagrep cron (per W291 v3.1) produces a clean "0 missing repos" verdict on a network-down or rate-limited day; operator concludes the runtime is up-to-date when in fact it's blind.

### 4.2 Finding — `harness/sota_rubric_lane.py` 2× silent `except Exception: return None`

- **Severity**: **LOW** (intentional per noqa comment — kept for completeness)
- **File**:
  - `Z:/claude-sota-installed/harness/sota_rubric_lane.py:142` — `except Exception: return None  # noqa: BLE001 - never crash the lane`
  - `Z:/claude-sota-installed/harness/sota_rubric_lane.py:153` — `except Exception: return None  # noqa: BLE001`
- **Evidence**: Smoke-test module loading + `module.run()` invocation both swallow Exception to None — the lane is designed to "never crash" per the noqa comment.
- **Why caveat**: the `noqa: BLE001` explicitly acknowledges the "blind except". Acceptable design choice — the lane is part of the eval harness and crashing on one bad smoke-test would block the entire harness pass. BUT the silent-None means caller sees "smoke=N/A" not "smoke=ERROR" — could mask a regression.
- **Recommended fix** (do NOT apply): swap `return None` for `return SOTARubricResult(score=None, error=str(exc), notes=f"smoke-load-failed:{type(exc).__name__}")` so downstream consumers see WHY a row is N/A rather than just "didn't run". 
- **Risk if not fixed**: low — eval lane continues; just lose error context.

### 4.3 Finding — `tools/process_hygiene_audit.py` silently returns empty list/set on subprocess error

- **Severity**: **MEDIUM**
- **File**: `Z:/claude-sota-installed/tools/process_hygiene_audit.py:47, 76-77, 98, 142-143`
- **Evidence**:
  - `list_processes_with_parent()` line 76-77: `if result.returncode != 0: return []` — silently returns empty list on PowerShell failure
  - line 98: `pass` after `except ValueError` — silently consumes parse error (acceptable; just dates)
  - `listening_pids()` line 142-143: `if result.returncode != 0: return set()` — silently returns empty set on PowerShell failure
  - Outer `try` line 109-110: `except (OSError, subprocess.TimeoutExpired, json.JSONDecodeError): return []`
- **Recommended fix** (do NOT apply):
  ```diff
  -        if result.returncode != 0:
  -            return []
  +        if result.returncode != 0:
  +            print(f"[hygiene_audit] tasklist failed rc={result.returncode}: {result.stderr[:200]}",
  +                  file=sys.stderr)
  +            return []
  ```
  Plus a similar stderr log in `listening_pids` and the outer except. Empty-return semantics are fine for downstream; visibility for operator is the gap.
- **Risk if not fixed**: process_hygiene_audit cron (if wired) silently reports "0 zombie processes" on a day when PowerShell cmdlet fails — operator misses real zombies; FM-19 risk class.

---

## §5 Recent terminal errors / hook failures (category 5)

### 5.1 Finding — `context-mode` plugin `userpromptsubmit.mjs` JavaScript heap OOM (FATAL exitCode 134) — **chronic across 58 sessions**

- **Severity**: **CRITICAL**
- **File / Hook command** that crashes:
  `"Z:/tools/nodejs/node.exe" "Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.136/hooks/userpromptsubmit.mjs"`
- **Source JSONL** (most recent occurrence): `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/2760cd35-b5d2-467f-b36a-73e4f62bc136.jsonl` @ 2026-05-18T22:59:24Z (CC v2.1.143, branch `sota-converge-w295`)
- **Evidence** (verbatim stderr from the JSONL):
  ```
  Failed with non-blocking status code: <--- Last few GCs --->


  <--- JS stacktrace --->

  FATAL ERROR: Committing semi space failed. Allocation failed - JavaScript heap out of memory
  ----- Native stack trace -----

   1: 00007FF69DA318E7
   ... (native frames)
  ```
  exitCode: 134; durationMs: 10784.
- **Chronic scope**: `grep -l 'JavaScript heap out of memory' Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/*.jsonl | wc -l` returns **58 sessions** with this exact OOM signature.
- **Why this is silent in practice**: the hook is `hook_non_blocking_error` — CC continues the prompt-submit but the context-mode auto-index that this hook normally performs DOES NOT RUN. So every prompt submitted in those 58 sessions had `ctx_search` / `ctx_execute` operating on stale/missing indexes — silent degradation of the context-mode primary use case.
- **Recommended fix** (do NOT apply): two stacked mitigations:
  1. Cap Node heap via the hook command — change the `settings.json` SessionStart cache-heal cmd is fine; the OOM is in the context-mode plugin hook (not settings.json). Operator-action: edit the plugin hook itself (cardinal-rule-2 violates upstream-plugin discipline — better path: file upstream issue at `mksglu/context-mode`).
  2. Alternative: add `NODE_OPTIONS=--max-old-space-size=4096` to the relevant env (CC plugin env, or globally) so all node-hook invocations get the larger heap. This is cardinal-rule-2-compliant (env-var tweak, no script edit).
  ```diff
    "env": {
      ...
  +   "NODE_OPTIONS": "--max-old-space-size=4096",
      ...
    }
  ```
- **Risk if not fixed**: every session of every wave silently runs without context-mode auto-indexing on prompt-submit — `ctx_search` returns stale or empty results — context-mode optimization is silently neutered for the runtime's main use case (large-output sandboxing).

### 5.2 Finding — `[MCPHealthCheck] No MCP config found for basic-memory` + `plugin_context-mode_context-mode` — health-check probe silently skipped

- **Severity**: **HIGH**
- **Source JSONLs**: `b9eaa9a5-7ed2-41f4-830e-60c163a777f1.jsonl` + `a258cb8f-46a1-48f7-bca8-003788588a15.jsonl` (most recent 2)
- **Evidence** (verbatim stderr from session JSONLs):
  ```
  [MCPHealthCheck] No MCP config found for basic-memory; skipping preflight probe
  [MCPHealthCheck] No MCP config found for plugin_context-mode_context-mode; skipping preflight probe
  ```
- **Why critical**: `basic-memory` IS configured in `.mcp.json:133-140` and IS active in `disabledMcpjsonServers` exclusion (not listed, so enabled by default). The MCPHealthCheck hook expects the config under a different key shape — operator-curated/local MCPs vs plugin-supplied MCPs trip the lookup. Result: T6 basic-memory layer (canonical post-W295 verdict-write target) has ZERO preflight health-check coverage. If basic-memory.exe is broken, dead, or returning malformed JSON, the runtime won't surface it until an actual tool call fails. Same for `plugin_context-mode_context-mode` which is the active context-mode MCP path (per the tool-list this conversation has: `mcp__plugin_context-mode_context-mode__ctx_search` etc).
- **Recommended fix** (do NOT apply): two paths:
  1. **Upstream fix**: file an issue with the MCPHealthCheck hook publisher (likely `wshobson/agents` or `everything-claude-code`) to also recognize project-`.mcp.json` entries + namespaced `mcp__plugin_<marketplace>_<plugin>__*` paths, not just plugin-supplied MCPs.
  2. **Local workaround**: write a separate `tools/mcp_health_smoke.ps1` cron that fires `mcp__basic-memory__list_memory_projects` + `mcp__plugin_context-mode_context-mode__ctx_stats` at session-start and surfaces failures. Cardinal-rule-2-compliant if invoked from settings.json as direct-CLI.
- **Risk if not fixed**: silent failures in the two most-load-bearing MCPs of the runtime (T6 verdict-write target + context-mode sandboxing). A basic-memory regression goes undetected until a wave tries to write a verdict and fails — wave-ship is then blocked at the worst time (post-codex-review).

---

## §6 Priority queue (top-3 for parent to apply this wave)

1. **§5.1 context-mode heap OOM** — CRITICAL, chronic (58 sessions). Fix: add `NODE_OPTIONS=--max-old-space-size=4096` to `.claude/settings.json:env` (cardinal-rule-2 compliant). **Est: 5 min edit + 1 session smoke-test = 15-20 min total.**
2. **§1.3 `settings.local.json:enabledMcpjsonServers` drift** — HIGH, silent re-enable of retired graphiti+memory. Fix: remove `"memory"` + `"graphiti"` from the array (5-line diff in gitignored file). **Est: 2-min edit.**
3. **§1.1 `tools/sota-reverify.ps1` graphiti-only pathway** — CRITICAL, every cron tick silently no-ops. Fix: re-route the instruction body to `mcp__basic-memory__search_notes` (queries the `verdicts/` directory per W295-codex-r12 ledger contract). **Est: 10-15 min edit + dry-run smoke.**

## §7 Defer queue (findings best for future waves or operator-discretion)

- **§1.2 mem-recall SKILL.md graphiti fallback** — HIGH; defer to memory-architecture review wave (W302+) since the right fallback (plugin-memory? cognee?) needs design-level decision, not pure stale-ref fix.
- **§1.4 / 1.5 / 1.6 4 dead `/slash` commands** — HIGH; defer to memory-architecture review wave. Recommended path: re-enable `memory` MCP (un-do W282d) since `mistake-note` primitives have no analogue in basic-memory; this is a deliberate architecture decision, not a one-line fix.
- **§2.1 statusLine.command C:-path** — LOW; bundle with next W286-cross-style portability sweep.
- **§3.1 serena SHA-pin staleness** — LOW; bundle into AGING-RELITIGATION-QUEUE proactive re-litigation pass.
- **§3.2 Phoenix port :16006 closed + OTEL endpoint dead** — MEDIUM; operator-action queue (start the Phoenix arize backend service OR remove the MCP entry + clear OTEL env vars). Per W297-SERVICE-RESTORATION.md, this may already be in flight.
- **§4.1 deltagrep silent empty-set on URL failure** — MEDIUM; defer to next G7 cron tick — currently latent until cron fires.
- **§4.2 sota_rubric_lane silent N/A** — LOW; intentional design choice with noqa marker.
- **§4.3 process_hygiene_audit silent empty returns** — MEDIUM; minor stderr-logging fix, bundle with next maintenance pass.

---

## Appendix A — Scan provenance + zero-finding categories

- **Recent JSONLs scanned** (3 most-recent, per scope): `b9eaa9a5-...jsonl` (243L), `a258cb8f-...jsonl` (403L), `2760cd35-...jsonl` (4572L) — total 5218 lines.
- **Distinct hook exitCodes observed in 3-session sample**: `exitCode:0` × 3805, `exitCode:134` × 1 (the §5.1 OOM). No other non-zero exit codes in the 3-session sample.
- **Hook command failure count across all sessions**: 1 chronic OOM signature across 58 distinct sessions (per `grep -l 'JavaScript heap out of memory' *.jsonl`).
- **Phoenix port probe**: `TcpClient connect 127.0.0.1:16006` → CLOSED.
- **Other backend service probes**: cognee :8000 OPEN, FalkorDB :16379 OPEN, Ollama :16700 OPEN, hindsight :9077 OPEN, Langfuse :3000 OPEN.
- **AGING-RELITIGATION-QUEUE.md**: read, EMPTY (lazy-populated at session-start by orchestrator; no stale entries to surface).
- **`MAX_THINKING_TOKENS` / `MCP_CONNECTION_NONBLOCKING` / `CLAUDE_CODE_SUBAGENT_MODEL` / `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` in tools/**: 0 active references in tools/.claude/ (one historical comment in `tools/eee.ps1:111` documenting that `MAX_THINKING_TOKENS` was dropped Wave 77 — informational, not stale).
- **bare `except:` in tools/ + harness/**: 0 findings (`grep -n -P 'except\s*:'` returns no matches). The `except Exception:` instances all carry `noqa: BLE001` markers and are intentional per §4.2 / §4.3.
- **`mcp__memory__` direct references in tracked files**:
  - `.claude/skills/mem-recall/SKILL.md:32` (historical context — `mcp__memory__memory_search ... is OFFLINE`)
  - `.claude/commands/recall.md` × 2 + `harvest.md` × 2 + `mistake-add.md` × 2 + `mistake-search.md` × 2 — counted in §1.4/1.5/1.6.
- **`mcp__memory__` in `.claude/agents/`**: 0 findings.
- **`graphiti` in `harness/`**: 0 findings.

## Appendix B — Cardinal-rule conformance of this scan

- **R1** (trusted plugins only): scan used native tools (Read/Grep/Glob/Bash/PowerShell) — no plugin install.
- **R2** (hooks discipline): no hook scripts touched.
- **R3** (subagents from documented system): this scan is a single-agent run, no subagent spawn.
- **R4** (no `.claude/rules/`): no rules-dir creation; all findings live in this owned file in `docs/architecture/W301-...`.
- **R5** (safety via CC permissions): used `Read`/`Grep`/`Bash`/`PowerShell` per the grant; no custom guard added.

End of Stream A.
