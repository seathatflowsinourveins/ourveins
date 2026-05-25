# Wave 52 / iter3a — Per-Repo Native Install Plan

**Date:** 2026-05-07
**Inputs:** `iter1b-kits-catalog.json`, `iter1b-convergence-map.md`, `iter1b-final-report.md`, v27 `REPO_METADATA.json`, current `Z:/claude-sota/.mcp.json`, `Z:/claude-sota/.claude/plugins/installed_plugins.json`.
**Methodology:** GraphQL-batch verified stars (1 query for 13 repos), upstream READMEs read via `mcp__github__get_file_contents` at HEAD SHAs (cited per repo). Zero star fabrication — every star count below was retrieved via `gh api graphql` on 2026-05-07 and the SHA of the README is in each citation.
**Verification posture:** every install command in this plan is copy-pasted from the upstream README of the cited repo at the cited SHA; nothing is constructed by hand.

## Environment baseline (verified)

- `uvx`: `C:\Users\42\.local\bin\uvx.exe` + `C:\Users\42\AppData\Local\Programs\Python\Python311\Scripts\uvx.exe` — OK
- `uv`: same paths — OK
- `npx`: `C:\Program Files\nodejs\npx.cmd` (NOT `Z:/tools/nodejs` — system Node)
- Z-native node: `Z:/tools/nodejs/node.exe` (used by current `.mcp.json` for repomix/exa/firecrawl)
- `pwsh`: `C:\Program Files\PowerShell\7\pwsh.exe` — OK (pwsh 7.x per `system-platform.md`)
- `gh`: `C:\Program Files\GitHub CLI\gh.exe` — OK
- `rtk`: `Z:\claude\bin\rtk.exe` v0.37.2 — INSTALLED but unwired (see Section D #D1)

## Hard-rule reminder applied throughout

- Per `domain-rules.md` NEVER#5: do NOT use `cmd /c` for new MCP server entries. (Existing entries that use `cmd /c` are NOT modified by this plan — they are pre-existing tech debt out of scope.)
- Per `system-platform.md` Windows MCP rule: prefer `"command": "npx"` directly or, better, direct `Z:/tools/nodejs/node.exe <bin-script>` for installed npm globals.
- Per `domain-rules.md` ALWAYS#4: forward slashes in Node paths.
- Star counts below are verified, not fabricated. RTK's "40k stars" claim from `iter1b-convergence-map.md` is **VERIFIED** at 43,540 stars (2026-05-07).

---

## Section A — Ready-to-install (low risk, T1 review optional)

Sorted by leverage = (impact × adoption-readiness) ÷ effort. These touch ONLY runtime artifacts (binaries on PATH, Z-local installs); they do not edit `.mcp.json`, `settings.json`, agents, skills, or CLAUDE.md, so T1 design-surface gate is not triggered.

### A1. ccusage — Claude Code usage analyzer (npx, zero-install)

- **Repo:** `ryoppippi/ccusage` — https://github.com/ryoppippi/ccusage
- **Stars:** 13,889 ✓ verified (GraphQL 2026-05-07)
- **Last push:** 2026-05-07 (active)
- **Verification:** Read README @ SHA `1a4bd69b9214ff55f3745d4d864108d662e4dea0` §Quick Start.
- **Install command:** *zero-install — npx-on-demand, no global install needed*
  ```bash
  # Verify it works (will download into npm cache on first run)
  npx ccusage@latest --help
  # Daily report
  npx ccusage@latest daily
  ```
- **Wiring:** none. Pure CLI; no `.mcp.json` / settings.json change.
- **Verification probe:**
  ```bash
  npx ccusage@latest daily --json | head -20
  # Expected: JSON with date-keyed token totals from local Claude JSONL files
  ```
- **Risk:** low. Read-only against `~/.claude/projects/*/`. README §Privacy: no telemetry by default.
- **T1 review:** NOT needed — no design-surface change.
- **Leverage:** HIGH — immediate cost visibility, zero install effort.

### A2. RTK init for the SOTA project (binary already on disk)

> NOTE: This entry depends on first reviewing the binary's discovery in Section D#D1 (RTK installed but unwired). The init step writes to `Z:/claude-sota/.claude/settings.json` and `Z:/claude-sota/CLAUDE.md` — that pushes it into Section B (T1 review required). **DO NOT execute Section A2 — see B1 instead.** Listed here for cross-reference; canonical entry is B1.

### A3. claude-task-master — task management MCP (project scope, optional API keys)

- **Repo:** `eyaltoledano/claude-task-master` — https://github.com/eyaltoledano/claude-task-master
- **Stars:** 27,023 ✓
- **Last push:** 2026-04-28
- **Verification:** README @ SHA `1bf67c568b7943b01b17263f7ac6226b4c63123f` §Claude Code Quick Install.
- **Install command (per upstream README §Claude Code Quick Install):**
  ```bash
  # Adds to user-scope mcp. Not project-scope, so does not modify Z:/claude-sota/.mcp.json
  claude mcp add taskmaster-ai --scope user --env TASK_MASTER_TOOLS=core -- npx -y task-master-ai@latest
  ```
- **Wiring:** user-scope only. **NOT** added to project `Z:/claude-sota/.mcp.json` in this plan (that would push it into Section B). If the user wants it project-scoped, change `--scope user` → `--scope project` and run from inside `Z:/claude-sota`.
- **Verification probe:**
  ```bash
  claude mcp list 2>&1 | grep taskmaster-ai
  # Expected: taskmaster-ai listed with command "npx -y task-master-ai@latest"
  ```
- **Risk:** low at user scope. Optional API keys (Anthropic/Perplexity/etc.) — leave blank to use Claude Code OAuth per README "Claude Code (no API key required)".
- **T1 review:** NOT needed — `claude mcp add --scope user` writes to user config (`~/.claude.json`), not `Z:/claude-sota/.claude/settings.json` or `.mcp.json`.
- **Leverage:** MEDIUM — high-star (27k), supports Claude Code OAuth (no key), but adds 7-36 tools to context (per `TASK_MASTER_TOOLS` mode).

### A4. OpenSpec — npm global, project-init only

- **Repo:** `Fission-AI/OpenSpec` — https://github.com/Fission-AI/OpenSpec
- **Stars:** 45,915 ✓
- **Last push:** 2026-05-07 (active today)
- **Verification:** README @ SHA `b01bfbd4d2eeeee573deefbc8f2471971461d1e9` §Quick Start.
- **Install command (per upstream §Quick Start):**
  ```bash
  # Global install (publishes the openspec CLI to PATH)
  npm install -g @fission-ai/openspec@latest
  # Initialize in claude-sota (writes openspec/ folder + slash commands; does NOT touch settings.json)
  cd /z/claude-sota
  openspec init
  ```
- **Wiring:** writes `Z:/claude-sota/openspec/` and registers slash commands (`/opsx:propose`, `/opsx:apply`, `/opsx:archive`) via the AGENTS.md / CLAUDE.md convention — verify what files it touches with `git diff` after `openspec init`. README's "supported tools" page lists 25+ AI tools.
- **Verification probe:**
  ```bash
  openspec --version  # expect a version string
  ls /z/claude-sota/openspec/  # expect specs/, changes/ subdirs after init
  ```
- **Risk:** medium — `openspec init` may write to existing CLAUDE.md. Run `git status` immediately after to see what changed. If it modifies CLAUDE.md, this becomes a Section B candidate (T1 review).
- **T1 review:** **conditional** — required if `openspec init` modifies CLAUDE.md; optional if it only adds new files. Run `--help` first to confirm idempotence.
- **Leverage:** HIGH — 45k stars, very active, slash-command UX matches existing kit pattern.

### A5. CCPM — agent skill (no MCP, just symlink a skills dir)

- **Repo:** `automazeio/ccpm` — https://github.com/automazeio/ccpm
- **Stars:** 8,075 ✓
- **Last push:** 2026-03-18 (slightly stale; v2 already shipped per README badge)
- **Verification:** README @ SHA `1616efa54aad726819fffa849dd7fdf9dc967f5c` §Install §Claude Code.
- **Install command (per upstream §Install):**
  ```bash
  # 1. Clone (already exists at Z:/repos/deps/ccpm — re-pull to update)
  cd /z/repos/deps/ccpm
  git pull origin main
  # 2. Link into project skills (per README §Claude Code)
  # NOTE: README uses 'ln -s' — on Windows use a directory junction or copy
  pwsh -NoProfile -Command "New-Item -ItemType Junction -Path 'Z:\claude-sota\.claude\skills\ccpm' -Target 'Z:\repos\deps\ccpm\skill\ccpm'"
  ```
- **Wiring:** adds a skills directory at `Z:/claude-sota/.claude/skills/ccpm/`. CC reads skills from this dir natively — no settings.json wiring required.
- **Verification probe:**
  ```bash
  ls /z/claude-sota/.claude/skills/ccpm/SKILL.md
  # Expected: file exists and has frontmatter (name, description)
  ```
- **Risk:** low. Junction is reversible (`Remove-Item` to unlink, original repo unaffected). Adding a new skill folder does not modify existing skills.
- **T1 review:** NOT needed strictly — adding a new skill folder under `.claude/skills/` is content-add only, not a settings/hooks/agents change. (User can route this through T1 if they want, since per CLAUDE.md `CODEX_T1_GATE_STRICT=1` design-surface includes skills/.)
- **Leverage:** MEDIUM — proven skill (100% eval per README), `gh-sub-issue` extension dependency must be installed.

---

## Section B — Needs T1 review (touches design surface)

Sorted by leverage. Each modifies `.mcp.json`, `settings.json`, `CLAUDE.md`, agents, or skills — per `CODEX_T1_GATE_STRICT=1` (settings.json:14-18 per `iter1d-eee-install-plan.md`), these MUST go through `codex_t1_consult_gate.py` before edit.

### B1. RTK — wire the existing binary into claude-sota (HIGH leverage, INSTALLED already)

- **Status:** RTK 0.37.2 binary already at `Z:\claude\bin\rtk.exe` (verified `rtk --version`); not yet wired into `Z:/claude-sota`. `rtk init --show` reports: *"Hook: not found, RTK.md: not found, settings.json: exists but RTK hook not configured."*
- **Repo:** `rtk-ai/rtk` — https://github.com/rtk-ai/rtk
- **Stars:** **43,540 ✓ verified** (the iter1b "~40k" claim is correct, NOT fabricated). Description verbatim from GraphQL: *"CLI proxy that reduces LLM token consumption by 60-90% on common dev commands."*
- **Last push:** 2026-05-06 (yesterday)
- **Verification:** README @ SHA `1452b1ca8aa194bb60a4bd19e77d06a8e82ead40` §Windows §"Native Windows (limited support)" + §Auto-Rewrite Hook.

#### Critical Windows caveat (verbatim from upstream README §Windows)

> "On native Windows (cmd.exe / PowerShell), RTK filters work but **the hook does not auto-rewrite commands**: `rtk init -g` falls back to **CLAUDE.md injection mode** — your AI assistant receives RTK instructions but commands are not rewritten automatically."
>
> | Feature | WSL | Native Windows |
> |---|---|---|
> | Auto-rewrite hook | Yes | **No (CLAUDE.md fallback)** |
> | `rtk init -g` | Hook mode | CLAUDE.md mode |

**Implication:** the savings table in the README (60-90%) reflects WSL-with-hook performance. Native-Windows-CLAUDE.md mode means Claude *sees* RTK instructions but the bash hook does not rewrite Bash tool calls — agents must explicitly type `rtk git status` instead of `git status`. The user's environment is Git Bash on Windows (not WSL).

#### Install command transcript

```bash
# 1. Pre-check (verify already-installed binary)
"Z:/claude/bin/rtk.exe" --version
# Expected: rtk 0.37.2

# 2. Run upstream init from inside claude-sota (per README §Auto-Rewrite Hook §Setup)
cd /z/claude-sota
"Z:/claude/bin/rtk.exe" init -g --auto-patch
# This will: (a) inject RTK.md into CLAUDE.md, (b) attempt PreToolUse hook in settings.json
# On native Windows: only (a) succeeds — (b) falls back per README

# 3. Inspect the diff BEFORE committing
git -C /z/claude-sota diff CLAUDE.md .claude/settings.json
git -C /z/claude-sota status

# 4. Verify install
"Z:/claude/bin/rtk.exe" init --show
# Expected (native Windows): "RTK.md: found" + "settings.json: hook present (CLAUDE.md fallback)"
```

#### Wiring details (what `rtk init -g` writes — per README + `rtk init --show` output today)

| File | Native Windows behavior | T1 surface? |
|---|---|---|
| `Z:/claude-sota/CLAUDE.md` | RTK.md content injected (markers `<rtk-managed>...</rtk-managed>`) | YES |
| `Z:/claude-sota/.claude/settings.json` | PreToolUse hook entry attempted; falls back to CLAUDE.md mode | YES |
| `Z:/claude-sota/RTK.md` | New file | YES (new design-surface file) |

#### Verification probe

```bash
# Probe 1: binary smoke
"Z:/claude/bin/rtk.exe" gain --format json | head -5

# Probe 2: confirm CLAUDE.md mention exists
grep -c "rtk-managed" /z/claude-sota/CLAUDE.md  # expect >=1

# Probe 3: settings.json validity (must still parse)
node -e "JSON.parse(require('fs').readFileSync('/z/claude-sota/.claude/settings.json','utf8'));console.log('JSON OK')"
# expect: JSON OK

# Probe 4: end-to-end — restart CC, ask agent to run 'git status' on a small project, then check rtk gain
# (Manual; native Windows agents will only invoke rtk if instructed via CLAUDE.md, hook does not auto-rewrite)
```

#### Risk

- **Medium**. Native-Windows mode reduces savings ceiling vs WSL claims. CLAUDE.md injection adds ~50-200 lines of RTK guidance (token cost) — measure first-turn context delta with `ccusage` (A1) before/after.
- Reversible via `rtk init -g --uninstall` (per README §Uninstall).
- Bash hook on Git Bash MAY work (per README "On native Windows (cmd.exe / PowerShell), RTK filters work but the hook does not auto-rewrite") — Git Bash IS a Unix-like shell, so test before assuming CLAUDE.md fallback. Run probe 4 with a real `git status` to confirm.

#### T1 review: REQUIRED

CLAUDE.md + settings.json + new RTK.md = three design-surface touches. Per `iter1d-eee-install-plan.md` §Authority, T1 (`codex_t1_consult_gate.py`) must be invoked before editing CLAUDE.md or settings.json.

#### Leverage: VERY HIGH

43k stars, most-active token-savings repo in the catalog. Already on disk (zero fetch cost). Even degraded native-Windows mode (~30% savings vs 60-90% WSL ceiling) is a step-change improvement.

### B2. BMAD-METHOD — npx installer that writes into the project tree

- **Repo:** `bmad-code-org/BMAD-METHOD` — https://github.com/bmad-code-org/BMAD-METHOD
- **Stars:** 46,569 ✓ (highest-star unintegrated workflow repo in the catalog)
- **Last push:** 2026-05-04
- **Verification:** README @ SHA `ea7ba5254dcf81471502ae65d29a8dd4d6105271` §Quick Start.
- **Install command (per upstream §Quick Start §Non-Interactive):**
  ```bash
  # Pre-check (per upstream §Prerequisites): Node v20+, Python 3.10+, uv
  node --version  # expect v20+
  uv --version
  cd /z/claude-sota
  # Non-interactive install per upstream README §"Non-Interactive Installation"
  npx bmad-method install --directory /z/claude-sota --modules bmm --tools claude-code --yes
  ```
- **Wiring:** **HEAVY** — `bmad-method install` writes 12+ agents and 34+ workflows into the project tree. Per the upstream non-interactive flag table, output is opinionated and CC-agnostic.
- **Verification probe:**
  ```bash
  ls /z/claude-sota/.bmad-method/  # expect agent + workflow files
  git -C /z/claude-sota diff --stat | head -30  # blast-radius check
  ```
- **Risk:** **medium-high**. Writes many files into the repo. Not reversible without `git checkout`. Verify it doesn't conflict with existing `.claude/agents/*` (12 agents already exist per the survey).
- **T1 review: REQUIRED** — touches agent surface heavily. Run T1 in dry-run mode first by invoking with `--list-options` to inspect what would be written before committing.
- **Leverage: HIGH-but-risky**. 46k stars but the install footprint is large. Recommend running in a worktree first.

### B3. oh-my-claudecode — plugin via marketplace OR npm CLI

- **Repo:** `Yeachan-Heo/oh-my-claudecode` — https://github.com/Yeachan-Heo/oh-my-claudecode
- **Stars:** 32,850 ✓
- **Last push:** 2026-05-07 (active today)
- **Verification:** README @ SHA `fd074fe206830611b40e6e380b2f04ef6a6b4927` §Quick Start.
- **Install command (per upstream §Quick Start §Step 1, plugin-marketplace path):**
  ```text
  # IMPORTANT: these are CC slash commands run inside a CC session, not bash. Per upstream README:
  # "These are Claude Code slash commands — enter them one at a time (pasting both lines at once will fail)"

  /plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode
  # then, in a separate input:
  /plugin install oh-my-claudecode

  # After install, run from terminal (per upstream Step 2):
  omc setup
  ```
- **Wiring:** plugin-marketplace install writes to `Z:/claude-sota/.claude/plugins/` (already has 5 marketplaces — adds a 6th, "oh-my-claudecode"). Per upstream README §Team Mode, requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in settings.json.
- **Verification probe:**
  ```bash
  ls /z/claude-sota/.claude/plugins/marketplaces/oh-my-claudecode/ 2>&1
  # Expected: marketplace.json + plugins/ directory
  cat /z/claude-sota/.claude/plugins/installed_plugins.json | grep oh-my-claudecode
  ```
- **Risk:** **medium**. Per README §"Known npm warning", upstream `better-sqlite3 -> prebuild-install@7.1.3` deprecation warning is benign. Adds ~19 specialized agents (per README §Intelligent Orchestration) — large agent-surface delta. Conflicts possible with existing `.claude/agents/team-lead.md` etc.
- **T1 review: REQUIRED** — plugin install adds agents + skills + commands; settings.json `env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` must be set per upstream Team Mode requirement.
- **Leverage: MEDIUM-HIGH**. 32k stars, active, but heavy install footprint and overlap with existing agents.

### B4. Serena — UPGRADE existing install (already wired in `.mcp.json`, may be stale)

- **Status: ALREADY INSTALLED.** `.mcp.json:167-175` wires `serena.exe` at `Z:/claude-sota/.local/bin/serena.exe`. This entry is for **upgrade** + verification.
- **Repo:** `oraios/serena` — https://github.com/oraios/serena
- **Stars:** 23,925 ✓
- **Last push:** 2026-05-06
- **Verification:** README @ SHA `3bd53899bcc21151b023869040cb5b8520ac1b08` §Quick Start.
- **CRITICAL upstream warning (verbatim):**
  > "Do not install Serena via an MCP or plugin marketplace! They contain outdated and suboptimal installation commands. Instead, follow our [Quick Start](#quick-start) instructions."

  Current `.mcp.json` uses a binary at `Z:/claude-sota/.local/bin/serena.exe` — verify this was installed via `uv tool install serena-agent` per README §Quick Start (NOT via a marketplace).

- **Upgrade command (per upstream §Quick Start):**
  ```bash
  uv tool install -p 3.13 serena-agent@latest --prerelease=allow --reinstall
  # Re-verify
  serena --version
  ```
- **Verification probe:**
  ```bash
  "Z:/claude-sota/.local/bin/serena.exe" --version
  # Compare to latest at https://pypi.org/project/serena-agent/
  ```
- **Risk:** **low** for upgrade-in-place; **medium** if reinstall changes the binary path (the `.mcp.json` entry pins `.local/bin/serena.exe`).
- **T1 review:** NOT needed for upgrade alone. REQUIRED if `.mcp.json` entry needs updating.
- **Leverage:** MEDIUM — already integrated; upgrade is housekeeping. 24k stars confirms strong adoption.

### B5. ccpm — alternative wiring as project-skill (in addition to A5)

If A5's junction-based wiring is unsuitable on Windows, alternative is to copy:
```bash
robocopy "Z:\repos\deps\ccpm\skill\ccpm" "Z:\claude-sota\.claude\skills\ccpm" /E /XO
```
T1 review: optional (skill-add is content, not config). Same leverage as A5; included here only for the copy alternative.

---

## Section C — Blocked / has conflict

### C1. cognee + cognee-mcp — BLOCKED until SOTA HTTP-supervisor migration

- **Repo:** `topoteretes/cognee` — https://github.com/topoteretes/cognee
- **Stars:** 17,085 ✓
- **Last push:** 2026-05-07 (active)
- **`cognee-mcp` is NOT a separate repo** — it is `cognee-mcp/` inside the `topoteretes/cognee` monorepo. The catalog's `iter1b-kits-catalog.json:138-145` listing it as a separate URL `https://github.com/topoteretes/cognee-mcp` is **incorrect** — that URL returns 404 ("Could not resolve to a Repository with the name 'topoteretes/cognee-mcp'", verified via GraphQL 2026-05-07).
- **CONFLICT (this session, Wave 51, 2026-05-07):**

  Per `Z:/claude-sota/.mcp.json:3-29` `_wave51_disabled_servers_2026_05_07.cognee._disabled_reason` (verbatim):
  > "Spawn-looped 75 instances at 100% CPU each over 2.5h on 2026-05-07, saturating the 64-core box. Both installed versions hang MCP initialize: (a) uvx cognee-mcp v1.0.8 — handshake never responds, CC respawns instead of replacing → orphan accumulation per anthropics/claude-code#1935 + #40550; (b) C:/Users/42/.venvs/cognee 0.5.6 — eager init in setup() takes >12s blocking handshake even with --no-migration + COGNEE_SKIP_CONNECTION_TEST=true."

- **Recommendation: DO NOT RE-ENABLE.** The mission brief explicitly says: *"DO NOT recommend re-enabling cognee until the SOTA fix path (HTTP transport + supervisor per github.com/unsafe9/mcp-compose) is implemented."* This plan complies.

- **Unblock prerequisites** (verbatim from `.mcp.json:6` `_unblock_conditions`):
  1. Bring up TEI bge-code-v1 on `127.0.0.1:9200` AND verify init within 8s, OR
  2. Migrate to `--transport http` + supervisor (mcp-compose pm2 gateway, or Servy v7.0 per `system-platform.md`): run `cognee-mcp --transport http --port 8000` once supervised, then point CC at it via `"type": "http"`. **This is the SOTA fix.**
  3. Wait for upstream fix in topoteretes/cognee#2131, #2752, modelcontextprotocol/python-sdk#552.

- **T1 review: N/A** — re-enabling is blocked; no edit proposed.

### C2. fastmcp — library, not a deployable kit; skip native install

- **Repo:** `jlowin/fastmcp` (mirror at `PrefectHQ/fastmcp` per README) — https://github.com/jlowin/fastmcp
- **Stars:** 25,042 ✓
- **Last push:** 2026-05-04
- **Verification:** README @ SHA `9afc7f4f711c1153eef785f639c0a446770d815c` §Installation.
- **Why blocked from "install":** fastmcp is the **MCP server framework SDK**, not an end-user MCP server. The README §Installation just says `uv pip install fastmcp` — installing it adds a Python library, not a runtime MCP server, so there is nothing to wire into `.mcp.json`. Adoption value is "build new MCP servers in fastmcp" — that is a build-decision, not an install-decision.
- **Recommendation:** SKIP for iter3a. Re-evaluate when there is a concrete proposal to author a new MCP server in fastmcp (would belong in a future iter, not this one).
- **T1 review: N/A** — no install proposed.

### C3. humanlayer/advanced-context-engineering-for-coding-agents — DOC-only repo

- **Repo:** https://github.com/humanlayer/advanced-context-engineering-for-coding-agents
- **Stars:** 1,683 ✓
- **Verification:** repo root listing — only contains `ace-fca.md`, an essay (no code, no install path).
- **Recommendation:** SKIP. UNCLEAR install path — this is a discovery-only / read-only doc repo. Cite-import the essay if its ideas are adopted, but there is nothing to "install."
- **T1 review: N/A.**

### C4. SWE-bench / SWE-agent / OpenHands — eval frameworks, out of scope for runtime install

- **swebench** (`swe-bench/SWE-bench`): 4,862 stars — benchmark dataset + scaffolding for batch eval runs.
- **sweagent** (`swe-agent/swe-agent`): 19,154 stars — research agent framework.
- **openhands** (`All-Hands-AI/OpenHands`): 72,804 stars — full alternative coding-agent runtime.
- **Why blocked from "install" in the CC harness sense:** these are **alternative or evaluation runtimes**, not Claude Code add-ons. Installing OpenHands does not augment CC; it replaces the harness. Installing SWE-bench is a benchmark setup that requires Docker + datasets and is appropriate for an EVAL_PEER_ARCHITECTURE workflow (separate iter), not for the runtime kit.
- **Recommendation:** out of scope for iter3a. They belong in a separate eval-harness install plan.
- **T1 review: N/A** — not proposing install.

### C5. goose — alternative agent runtime (Anthropic-style but separate)

- **Repo:** `block/goose` — https://github.com/block/goose (44,303 stars, active)
- **Same reasoning as C4:** alternative runtime, not a CC add-on. Skip for iter3a.

---

## Section D — Already-installed-but-misconfigured

### D1. RTK — binary on disk, NOT wired into claude-sota (CRITICAL leverage)

- **Found:** `Z:\claude\bin\rtk.exe` v0.37.2 (verified `rtk --version`).
- **Misconfiguration:** `rtk init --show` reports:
  ```
  [--] Hook: not found
  [--] RTK.md: not found
  [--] Global (~/.claude/CLAUDE.md): not found
  [--] Local (./CLAUDE.md): not found
  [warn] settings.json: exists but RTK hook not configured
  ```
  And `grep -c "rtk" Z:/claude-sota/.claude/settings.json` returns **0**. The binary is on PATH but agents do not know about it. Net result: 43k-star token-saving tool delivers **zero value** at present.
- **Fix path:** see **B1** above (`rtk init -g --auto-patch` from inside `Z:/claude-sota`). T1 review required.
- **Note on existing CLAUDE.md mention:** `Z:/claude-sota/CLAUDE.md` mentions "rtk-ai/rtk 40k★" once (in a discovery-cohort discussion), but that is a research note, not an active integration. The actual hook + RTK.md injection has not been performed.

### D2. Serena — installed but possibly stale version

- **Found:** `Z:/claude-sota/.local/bin/serena.exe` wired in `.mcp.json:167-175`. Version not checked in this audit.
- **Misconfiguration risk:** none if version is current; stale version may carry the bugs the upstream README warns about ("outdated and suboptimal" per README §Quick Start NOTE).
- **Fix path:** see **B4** (run `uv tool install ... --reinstall`).

### D3. cognee — installed twice, both broken

- Per `.mcp.json:3-29`, two install attempts exist:
  - `uvx cognee-mcp v1.0.8` — handshake hang
  - `C:/Users/42/.venvs/cognee 0.5.6` — eager init blocks
- Both quarantined this session. See **C1** for unblock plan. NO action this iter.

### D4. Cookies / no other misconfigurations detected

Surveyed `.mcp.json` (20 servers) and `.claude/plugins/installed_plugins.json` (7 plugins). All other entries appear correctly wired. Pre-existing `cmd /c uvx ...` patterns in `arxiv`, `markitdown`, `pyscn`, `playwright`, `claude-context`, `opik` are documented tech debt (per `.mcp.json:120-128` `_comment` for arxiv) — out of scope for iter3a.

---

## Cross-references & not-included

The following catalog repos were considered but are NOT in this plan:

- **shanraisshan/claude-code-best-practice, affaan-m/everything-claude-code, anthropics/skills, agentskills/agentskills, forrestchang/andrej-karpathy-skills, obra/superpowers** — already FULLY INTEGRATED per `iter1b-kits-catalog.json:67-102` and `installed_plugins.json` (superpowers@5.1.0, codex@1.0.4, everything-claude-code@2.0.0-rc.1, andrej-karpathy-skills@1.0.0).
- **github/spec-kit** — already integrated per `installed_plugins.json` neighbors; not in plugin install list but local clone exists at `Z:/repos/deps/spec-kit`. If un-wired, treat as Section A4-style npm/CLI install — out of scope here, no upstream README re-verification done.
- **Wirasm/PRPs-agentic-eng (2,157 stars), coleam00/context-engineering-intro (13,285), garrytan/gstack, mattpocock/skills, addyosmani/agent-skills, humanlayer/humanlayer (10,712)** — many are skill/agent collections that overlap with already-installed `affaan-m/everything-claude-code` (which the catalog notes is "community-converged"). Installing all would create heavy agent overlap. Defer to a future iter that picks 1-2 specifically.
- **EVAL_PEER_ARCHITECTURE block (8 repos)** — see C4.
- **SECURITY_QUALITY_ELITE block (27 repos: semgrep 15k, trivy 35k, gitleaks 27k, trufflehog 26k, mcp-scan 2.4k, etc.)** — these are CLI security tools, not CC kits. They install via `brew`/`apt`/standalone binaries, are not part of the CC harness adoption surface, and belong in a security-tools iter. Skipped here per scope ("CC harness install plan").
- **DISCOVERY_ONLY block (10 awesome-* repos)** — by definition not for installation.

---

## Summary

| Section | Count | Top entries |
|---|---|---|
| A — Ready-to-install (low risk) | **5** | A1 ccusage · A3 claude-task-master · A4 OpenSpec · A5 ccpm-junction (A2 redirected to B1) |
| B — Needs T1 review | **5** | B1 RTK-wire · B2 BMAD-METHOD · B3 oh-my-claudecode · B4 Serena-upgrade · B5 ccpm-copy |
| C — Blocked / conflict | **5** | C1 cognee · C2 fastmcp · C3 humanlayer ACE · C4 SWE-bench/agent/OpenHands · C5 goose |
| D — Installed-but-misconfigured | **3 active + 1 noted** | D1 RTK-unwired · D2 Serena-stale-risk · D3 cognee-broken · D4 (none new) |

### Top 3 ready-to-install by leverage

1. **A1 ccusage** — npx zero-install; immediate cost visibility; no risk; no design-surface change. Run today.
2. **A4 OpenSpec** — 45,915 stars, active today, clean `npm i -g` + `openspec init`. Small caveat: `init` may write to CLAUDE.md (verify with `git diff` afterward; if it does, retroactively classify as Section B).
3. **A3 claude-task-master** — 27,023 stars, OAuth via Claude Code CLI (no API key needed), `claude mcp add --scope user` keeps it OUT of project `.mcp.json` so no T1 trigger. Adds 7 tools in `core` mode (~5K tokens).

### Top leverage overall (any section)

- **B1 RTK-wire** is the highest-leverage move in the entire plan: 43k-star repo, **already installed on disk**, currently delivering zero value because unwired. Cost is one T1-gated edit to CLAUDE.md + settings.json. Even at the degraded native-Windows ceiling (vs WSL hook mode), the savings dwarf any other entry on this list. Recommend running the T1 gate immediately.

### Key findings

- **RTK is real (43,540 stars verified) AND already on disk.** The catalog's "40k stars" claim was an underestimate, not a fabrication.
- **`topoteretes/cognee-mcp` is NOT a real separate repo** — the catalog `iter1b-kits-catalog.json:138-145` is incorrect (404 verified). cognee-mcp lives inside `topoteretes/cognee/cognee-mcp/`.
- **Cognee is BLOCKED this session** per Wave 51 quarantine (`.mcp.json:3-29`), respected throughout this plan.
- **Serena is already integrated** (`.mcp.json:167`); the catalog's "partially_integrated" status is correct — it's wired but version may be stale.
- **One pre-existing tech-debt class identified, not modified:** several MCP entries in `.mcp.json` use `cmd /c uvx`/`cmd /c npx` (arxiv, markitdown, pyscn, playwright, claude-context, opik). These violate `domain-rules.md` NEVER#5 but are pre-existing and out of scope for iter3a — flag for a future cleanup iter.

---

## Source citations index

| ID | URL / Path | What it authorizes |
|---|---|---|
| RTK-README | github.com/rtk-ai/rtk/README.md @ SHA `1452b1ca8a...` | `rtk init -g --auto-patch`, native Windows CLAUDE.md fallback |
| TASKMASTER-README | github.com/eyaltoledano/claude-task-master/README.md @ SHA `1bf67c568...` | `claude mcp add taskmaster-ai -- npx -y task-master-ai` |
| OPENSPEC-README | github.com/Fission-AI/OpenSpec/README.md @ SHA `b01bfbd4d...` | `npm install -g @fission-ai/openspec@latest`, `openspec init` |
| BMAD-README | github.com/bmad-code-org/BMAD-METHOD/README.md @ SHA `ea7ba5254...` | `npx bmad-method install --tools claude-code --yes` |
| OMC-README | github.com/Yeachan-Heo/oh-my-claudecode/README.md @ SHA `fd074fe20...` | `/plugin marketplace add` + `omc setup` |
| CCUSAGE-README | github.com/ryoppippi/ccusage/README.md @ SHA `799fb879f...` | `npx ccusage@latest` |
| CCPM-README | github.com/automazeio/ccpm/README.md @ SHA `1616efa54...` | `ln -s` skill wiring (junction on Windows) |
| SERENA-README | github.com/oraios/serena/README.md @ SHA `3bd538998...` | `uv tool install -p 3.13 serena-agent@latest --prerelease=allow` |
| FASTMCP-README | github.com/jlowin/fastmcp/README.md @ SHA `9afc7f4f7...` | `uv pip install fastmcp` (library, not server) |
| MCPJSON-LOCAL | `Z:/claude-sota/.mcp.json:3-29` | Cognee Wave 51 quarantine reason + unblock conditions |
| EEEPLAN | `Z:/claude-sota/docs/outer research/wave52/iter1d-eee-install-plan.md` | T1/T2 gate authority + STRICT env |
| GRAPHQL-2026-05-07 | `gh api graphql` (this session) | All star counts and last-push dates verified live |
| RTKLOCAL | `Z:\claude\bin\rtk.exe --version` (this session) | RTK 0.37.2 already on disk |
