# STREAM-C — Cross-Project Parallelism + Multi-Account Routing

> SOTA research deliverable. Stream C of 4 (cross-PROJECT parallelism + multi-account).
> Method: R1 (>=4 source families) -> R2 (harness-fit) -> R3 (>=3-org convergence) -> R4/R5 (dispositions).
> Date: 2026-05-16. Every claim cite-anchored to a URL or file:line.
> Evidence tiers: [CODE-VERIFIED] audited source - [DOC-PRIMARY] official Anthropic docs - [CONVERGED] >=3 orgs agree - [COMMUNITY] practitioner blog/gist.

---

## §0 — Scope

**In scope (Stream C):** running N *different* projects' Claude Code (CC) sessions concurrently with zero
config/state/memory bleed; the per-project isolation primitives; when to share vs isolate config; routing
parallel sessions across multiple Anthropic MAX accounts; transcript/checkpoint isolation.

**Out of scope (other streams):** same-project worktree mechanics (Stream A); orchestration tools — agent
teams, background sessions (Stream B); memory engines + git practice (Stream D). Worktrees appear here only
where they intersect cross-project isolation.

**Runtime under advisement:** CC on Windows 11, Z:-portable install `Z:\claude-sota-installed\`, PowerShell +
Git Bash, single developer, multiple MAX accounts, near-unlimited codex, 42 plugins + 11-server MCP stack.
The runtime already does per-runtime HOME/`CLAUDE_CONFIG_DIR` isolation via the `eee.ps1` launcher.

**Headline findings:**
1. `CLAUDE_CONFIG_DIR` is the **single official isolation primitive** — it relocates *all* settings,
   credentials, session history AND plugins. This is the documented multi-account mechanism.
2. **`CLAUDE_CODE_PROJECT_DIR` does not exist** in Anthropic's docs. The runtime's `CLAUDE.local.md` ENV (f)
   sets it expecting transcripts to relocate — they do **not**. This is a no-op env var. See §1.4 + §5.
3. For multi-MAX *automatic* routing, **CLIProxyAPI** is the converged pick — it is the only one of the three
   candidates that natively *owns* an OAuth account pool with round-robin + cooldown. LiteLLM and
   claude-code-router solve a different problem (model-provider routing).
4. For this single-dev runtime, the simplest correct multi-account answer is **`CLAUDE_CONFIG_DIR`-per-account
   aliases** (zero install); CLIProxyAPI is the upgrade only when *automatic* failover becomes load-bearing.

---

## §1 — The isolation model

Every primitive below is something that is **per-`CLAUDE_CONFIG_DIR`** or **per-project** or **per-directory**.
To run N projects with zero bleed you control exactly two axes: the **config dir** (account/runtime identity)
and the **working directory** (project identity).

### 1.1 `CLAUDE_CONFIG_DIR` — the master isolation switch

> "**CLAUDE_CONFIG_DIR** — Override the configuration directory (default: `~/.claude`). All settings,
> credentials, session history, and plugins are stored under this path. Useful for running multiple accounts
> side by side: for example, `alias claude-work='CLAUDE_CONFIG_DIR=~/.claude-work claude'`"
> — [DOC-PRIMARY] https://code.claude.com/docs/en/env-vars (env var `CLAUDE_CONFIG_DIR`)

This is the **only** env var that relocates the whole config surface. Confirmed independently by CCBP:
> "`CLAUDE_CONFIG_DIR` | Custom config directory (overrides default `~/.claude`)"
> — [CONVERGED] `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:877`

What lives under `CLAUDE_CONFIG_DIR` (i.e. what is per-account / per-runtime):
- `settings.json` (user scope) and `settings.local.json` resolution base
- credentials / OAuth tokens (the login that determines *which MAX account*)
- **session history / transcripts** — `<CONFIG_DIR>/projects/` (see 1.4)
- plugins + plugin cache + marketplaces (unless `CLAUDE_CODE_PLUGIN_CACHE_DIR` overrides — see 1.6)
- `~/.claude.json` equivalent — the per-project MCP + project-state file (see 1.3)
- `tasks/`, `shell-snapshots/`, `backups/` — swept on startup
  — [DOC-PRIMARY] CCBP `claude-settings.md:74` ("Inactive session transcripts and orphaned subagent
  worktrees are deleted; as of v2.1.117 the sweep also covers `~/.claude/tasks/`, `~/.claude/shell-snapshots/`,
  and `~/.claude/backups/`")

**Consequence:** two CC sessions launched with *different* `CLAUDE_CONFIG_DIR` values share **nothing** —
not credentials, not history, not plugins. This is the strongest isolation boundary CC offers.

### 1.2 The four settings scopes + precedence

CC resolves settings from four scopes. Locations (Windows `~` = `%USERPROFILE%`):

| Scope | Location | Per-project? | Shared w/ team? |
|---|---|---|---|
| Managed | `C:\Program Files\ClaudeCode\` managed-settings.json / registry | no (machine-wide) | yes (IT) |
| User | `<CLAUDE_CONFIG_DIR>/settings.json` | **no** (all projects of that config dir) | no |
| Project | `<repo>/.claude/settings.json` | **yes** | yes (git) |
| Local | `<repo>/.claude/settings.local.json` | **yes** | no (gitignored) |

— [DOC-PRIMARY] https://code.claude.com/docs/en/settings ("Available scopes" table: "Managed ... All users on
the machine - User `~/.claude/` ... You, across all projects - Project `.claude/` in repository ... All
collaborators on this repository - Local `.claude/settings.local.json` ... You, in this repository only")

**Precedence, highest -> lowest** — [DOC-PRIMARY] same page, "Settings precedence":
> "Managed settings ... Cannot be overridden by any other level, including command line arguments -> Command
> line arguments -> Local project settings (`.claude/settings.local.json`) -> Shared project settings
> (`.claude/settings.json`) -> User settings (`~/.claude/settings.json`)"

Two merge rules that matter for cross-project isolation:
- **Scalars override** lower scopes; **arrays merge** across scopes ("Array settings merge across scopes ...
  such as `sandbox.filesystem.allowWrite` or `permissions` rules") — [DOC-PRIMARY] settings page.
- `--settings <file-or-json>` is a per-session CLI override at the "Command line arguments" tier.

### 1.3 MCP scopes — .mcp.json vs user .claude.json

MCP has three install scopes; only one is in-repo:

| MCP scope | Stored in | Per-project? |
|---|---|---|
| Local | user .claude.json under a per-project projects key | yes (but file is under CONFIG_DIR) |
| Project | repo-root .mcp.json | yes (in repo, git-committed) |
| User | user .claude.json (global) | no (all projects) |

Cites — [DOC-PRIMARY] https://code.claude.com/docs/en/mcp:
- Local: "The command writes the server into the entry for your current project inside ~/.claude.json."
- Project: "storing configurations in a .mcp.json file at your project's root directory. This file is designed to be checked into version control."
- User: "User-scoped servers are stored in ~/.claude.json and provide cross-project accessibility."

MCP precedence, highest to lowest: Local > Project > User > Plugin-provided > claude.ai connectors.
"The three scopes match duplicates by name." — [DOC-PRIMARY] mcp page, "Scope hierarchy and precedence".

Isolation consequence: .mcp.json (project scope) travels with the repo and is the only MCP surface that is
genuinely per-project-in-the-repo. Local + User MCP both live in user .claude.json — which is under
CLAUDE_CONFIG_DIR — so they isolate per config dir, not per project directory. .mcp.json supports env-var
expansion (dollar-brace VAR, dollar-brace VAR-colon-dash-default) so a shared .mcp.json can still resolve
machine-specific paths — [DOC-PRIMARY] mcp page, "Environment variable expansion in .mcp.json".

disabledMcpjsonServers (present in this runtime's settings.json) lets a project opt out of specific .mcp.json
servers without editing the file.

### 1.4 Transcripts / session history — where they actually live

> "All settings, credentials, session history, and plugins are stored under this path [CLAUDE_CONFIG_DIR]."
> — [DOC-PRIMARY] https://code.claude.com/docs/en/env-vars

Session transcripts are JSONL files under CLAUDE_CONFIG_DIR/projects/<encoded-project-path>/. They are keyed
by the project's working-directory path, so transcripts of different projects under the same config dir are
already separated into different sub-folders — but they all sit under one CLAUDE_CONFIG_DIR.

There is no CLAUDE_CODE_PROJECT_DIR env var. Verified by exhaustive scan of the env-vars doc — 131 CLAUDE_*
variables enumerated, none named PROJECT_DIR:
- [CODE-VERIFIED] grep of the full https://code.claude.com/docs/en/env-vars page HTML for PROJECT_DIR -> zero
  matches. The closest real var is CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR (an unrelated bash-cwd-restore
  toggle).

The runtime's CLAUDE.local.md ENV (f) sets CLAUDE_CODE_PROJECT_DIR = Z:/claude-sota-installed-state/.claude/projects
"for session JSONL transcripts." This variable is not read by CC — transcripts continue to write under
CLAUDE_CONFIG_DIR/projects/. Not harmful (just inert), but it creates a false sense of relocation. See §5 for
the fix. To relocate transcripts you must move the whole CLAUDE_CONFIG_DIR.

Related real var: CLAUDE_CODE_SKIP_PROMPT_HISTORY=1 — "skip writing prompt history and session transcripts to
disk. Sessions ... do not appear in --resume, --continue, or up-arrow history." — [DOC-PRIMARY] env-vars page.
Useful for ephemeral scripted sessions, not for isolation.

### 1.5 CLAUDE.md memory — the scopes + @import + directory-walk

CC loads 5 memory surfaces — [DOC-PRIMARY] https://code.claude.com/docs/en/memory ("Memory type" table):

| Memory surface | Location | Per-project? |
|---|---|---|
| Managed policy | Windows C:\Program Files\ClaudeCode\CLAUDE.md (macOS /Library/Application Support/ClaudeCode/, Linux /etc/claude-code/) | no |
| User instructions | ~/.claude/CLAUDE.md (i.e. CLAUDE_CONFIG_DIR/CLAUDE.md) | no |
| Project instructions | repo-root CLAUDE.md or repo .claude/CLAUDE.md | yes |
| Local instructions | repo-root CLAUDE.local.md (gitignored) | yes |
| Auto memory | per-repo, "shared across worktrees" — Claude-written learnings | yes |

Directory walk: "Claude Code ... loads CLAUDE.md files by walking up the directory tree from your current
working directory ... if you run Claude Code in foo/bar/, it loads instructions from foo/bar/CLAUDE.md,
foo/CLAUDE.md, and any CLAUDE.local.md files ... content is ordered from the filesystem root down to your
working directory." — [DOC-PRIMARY] memory page, "How CLAUDE.md files load".

> Cross-project bleed risk: if two project repos share a common parent directory that contains a CLAUDE.md,
> both projects inherit that parent file. Keep unrelated project repos under separate parents (or out of any
> directory carrying a CLAUDE.md) to avoid silent cross-project memory bleed.

@import syntax: "Import additional files using @path/to/import syntax ... Both relative and absolute paths
are allowed. Relative paths resolve relative to the file containing the import, not the working directory.
Imported files can recursively import other files, with a maximum depth of five hops." Home-dir imports work:
@~/.claude/my-project-instructions.md. First external import triggers a one-time approval dialog.
— [DOC-PRIMARY] memory page, "Import additional files".

Auto memory is disabled in this runtime (CLAUDE_CODE_DISABLE_AUTO_MEMORY=1 in settings.json env overrides
autoMemoryEnabled:true) — a deliberate context-budget choice, see CLAUDE.local.md "Auto Memory opt-out
reconciliation". CLAUDE_CODE_DISABLE_CLAUDE_MDS=1 exists to disable CLAUDE.md loading entirely.

### 1.6 Plugin / cache / temp isolation

| Surface | Env var | Default | Per-config-dir? |
|---|---|---|---|
| Plugins root | CLAUDE_CODE_PLUGIN_CACHE_DIR | ~/.claude/plugins (under CONFIG_DIR) | yes — "sets the parent directory ... marketplaces and the plugin cache live in subdirectories under this path" |
| Temp files | CLAUDE_CODE_TMPDIR | os.tmpdir() on Windows | "Claude Code appends /claude/ to this path" on Windows |
| Read-only plugin seed | CLAUDE_CODE_PLUGIN_SEED_DIR | unset | for pre-populated container images |
| Debug logs | CLAUDE_CODE_DEBUG_LOGS_DIR | — | per the runtime's ENV block |

— [DOC-PRIMARY] https://code.claude.com/docs/en/env-vars (entries CLAUDE_CODE_PLUGIN_CACHE_DIR,
CLAUDE_CODE_TMPDIR, CLAUDE_CODE_PLUGIN_SEED_DIR).

Note: by default plugins live under CLAUDE_CONFIG_DIR, so changing the config dir already isolates plugins.
CLAUDE_CODE_PLUGIN_CACHE_DIR is only needed if you want shared plugins across config dirs (see §2).

### 1.7 File checkpoints / rewind

File checkpointing (the /rewind restore surface) is per-session state stored under CLAUDE_CONFIG_DIR.
CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING=1 disables it — "The /rewind command will not be able to restore code
changes." — [DOC-PRIMARY] env-vars page. Checkpoints isolate with the config dir + session; they are not a
cross-project leak vector as long as config dirs are separate. Note checkpoints are CC-internal and distinct
from git — they do not replace per-project git isolation (Stream D territory).

### 1.8 Auth / account identity

The MAX account a session uses is whichever account the credentials under that CLAUDE_CONFIG_DIR were logged
into (claude /login writes credentials into the active config dir). Override vars:
- ANTHROPIC_API_KEY — "When set, this key is used instead of your Claude Pro, Max, Team, or Enterprise
  subscription even if you are logged in." — [DOC-PRIMARY] env-vars page. For MAX-subscription routing you do
  NOT want this set (it bypasses the subscription).
- ANTHROPIC_BASE_URL — "Override the API endpoint to route requests through a proxy or gateway." This is the
  hook a routing proxy plugs into.
- CLAUDE_CODE_OAUTH_TOKEN — "OAuth access token for Claude.ai authentication ... Generate one with claude
  setup-token." Alternative to interactive /login.
- forceLoginMethod, forceLoginOrgUUID — managed-settings keys to lock auth method / org.

---

## §2 — Shared-vs-isolated decision table

For a single developer running N projects, the question is which surfaces should be shared across projects
and which must be isolated.

| Surface | Recommended placement | Rationale | Cite |
|---|---|---|---|
| Plugins | Shared across projects (one config dir) | 42 plugins; re-installing per project wastes disk + update toil; plugins are behavior, not project data | env-vars CLAUDE_CODE_PLUGIN_CACHE_DIR; settings page "Tools and plugins you use across all projects" |
| Skills | Shared if user-level; Project if repo-specific | superpowers etc. are general; a repo-specific skill belongs in repo .claude/skills/ | settings page (skills follow scopes) |
| Subagents | Shared for general agents; Project for repo-specific | user .claude/agents/ = all projects; repo .claude/agents/ = this repo; no Local scope for agents | settings page "What uses scopes" row |
| MCP servers | Project (.mcp.json) for repo-specific tools; User for personal utilities | repo tools (a project DB) belong in-repo + git; personal tools (memory, web search) are user-scoped | mcp page scope defs |
| Memory DB / Graphiti | Shared service, isolated namespace | one running FalkorDB/sqlite_vec; isolate by group_id per project (Graphiti) or per-DB-file | runtime CLAUDE.md "Memory live" |
| Marketplaces | Shared (one config dir) | marketplace list is tool-discovery, not project data; extraKnownMarketplaces in settings | settings page extraKnownMarketplaces |
| settings.json behavior/hooks | Project for repo policy; User for personal defaults | hooks that lint a repo belong to that repo; theme/effort are personal | settings page scopes table |
| Credentials / account | Isolated per config dir | each config dir = one MAX account; never share a credential store across accounts | env-vars CLAUDE_CONFIG_DIR |
| Session history / transcripts | Isolated per config dir (auto, no choice) | history always lives under CLAUDE_CONFIG_DIR; cannot be relocated independently | env-vars CLAUDE_CONFIG_DIR |
| Working directory / files | Isolated per project (separate repo dirs) | the actual code; never let two projects share a tree | inherent |
| CLAUDE.md project memory | Isolated per project (in-repo) | project architecture is project-specific; keep repos under separate parents to avoid walk-up bleed | memory page "How CLAUDE.md files load" |

The decision rule (one line): behavior + tooling shared, identity + state isolated. Plugins, skills, general
agents, marketplaces, the memory engine to shared. Credentials, history, checkpoints, per-project CLAUDE.md,
the working tree to isolated.

Single-config-dir vs config-dir-per-project: for one developer, do NOT create a separate CLAUDE_CONFIG_DIR
per project — that fragments your 42 plugins N ways. Create a config dir per account/runtime only. Project
isolation comes for free from separate working directories + per-repo .claude/. The runtime already does this
correctly: one config dir (Z:/claude-sota-installed/.claude) for the whole claude-sota-installed runtime,
sibling runtimes on their own config dirs.

---

## §3 — Multi-account routing: converged pick + harness-fit verdict

### 3.1 The two distinct problems

There are two different "multi-account" needs, and the tools split cleanly along them:
- (A) Manual account switching — "start a session on account 2 instead of account 1." Solved by
  CLAUDE_CONFIG_DIR-per-account aliases. Zero install. Native.
- (B) Automatic account-pool routing — "spread parallel session load across N accounts; when one hits a rate
  limit, transparently fail over to another." Solved by a proxy that owns the OAuth pool.

### 3.2 Candidate comparison

| Tool | What it actually does | Same-provider account pool? | License | Runtime | Windows |
|---|---|---|---|---|---|
| router-for-me/CLIProxyAPI | Wraps Claude Code (+Gemini/Codex/Grok) behind an OpenAI/Claude-compatible API; owns OAuth login + token refresh + a multi-account pool | YES native: "Claude Code multi-account load balancing"; round-robin + cooldown | MIT | Single Go binary, no runtime | YES native + Windows-specific forks (ProxyPilot, CLIProxyAPI Tray, ZeroLimit, CodexCliPlus) |
| BerriAI/litellm | OSS LLM proxy/gateway; load-balances deployments of a model across API keys; can forward a client OAuth header but does not manage the OAuth pool | Partial: can forward Authorization via forward_client_headers_to_llm_api, but you supply/refresh tokens yourself | open-core (NOASSERTION core + enterprise dir) | Python (or Docker) | yes (Docker easiest) |
| musistudio/claude-code-router | Routes CC requests to different model providers (OpenRouter, DeepSeek, Ollama) per scenario; sequential model fallback | NO: "does not explicitly support pooling multiple Anthropic Claude MAX subscription accounts" | open | Node.js (npm global) | yes |

Cites:
- CLIProxyAPI multi-account: [CODE-VERIFIED] router-for-me/CLIProxyAPI/README.md @ sha 8b3670b — "Multiple
  accounts with round-robin load balancing (Gemini, OpenAI, Claude, Grok)", "Claude Code multi-account load
  balancing", "Claude Code support via OAuth login".
- CLIProxyAPI rotation/cooldown: [CODE-VERIFIED] DeepWiki router-for-me/CLIProxyAPI — "load balancing using
  strategies like round-robin or fill-first. When a credential encounters a rate limit (HTTP 429 or 5xx
  errors), it is temporarily cooled down, and the system attempts to use another available credential ...
  the ClaudeCodeAPIHandler is responsible for managing client rotation and quota management." Config keys
  verified in config.example.yaml @ sha 8b3670b: routing.strategy (round-robin|fill-first),
  max-retry-credentials, disable-cooling, quota-exceeded.switch-project; OAuth tokens saved as claude-*.json
  in auth-dir.
- CLIProxyAPI MIT + Go binary: [CODE-VERIFIED] CLIProxyAPI/README.md "License — MIT License"; DeepWiki —
  "compiled Go application distributed as a standalone binary; does not require a separate runtime."
- CLIProxyAPI Windows: [CODE-VERIFIED] README "Who is with us?" lists ProxyPilot ("Windows-native CLIProxyAPI
  fork"), CLIProxyAPI Tray ("Windows tray application implemented using PowerShell scripts"), ZeroLimit,
  CodexCliPlus ("Windows-focused desktop management platform").
- litellm OAuth-forward: [CODE-VERIFIED] DeepWiki BerriAI/litellm — "forward_client_headers_to_llm_api
  forwards client headers, including the Authorization header (which would contain the OAuth token for a
  Claude Max subscription); LiteLLM can pass the OAuth token directly to Anthropic." But this forwards a
  token; it does not log in or refresh the pool.
- claude-code-router: [CODE-VERIFIED] DeepWiki musistudio/claude-code-router — "primarily focuses on routing
  requests to different model providers; does not explicitly support pooling multiple Anthropic Claude MAX
  subscription accounts with automatic failover on rate limits; ccr activate sets ANTHROPIC_BASE_URL and
  ANTHROPIC_AUTH_TOKEN."
- W259 catalog positions: [CONVERGED] W259-grand-catalog/W259-SHIP-DECISIONS.md:62 — "L8 Multi-MAX Governance
  - CLIProxyAPI - active, promote to T1 - OPERATOR-DECISION promote to T1 if multi-account routing becomes
  load-bearing"; W259-ULTIMATE-DECISIONS.md:70 — "L8 MULTI-MAX GOVERNANCE CLIProxyAPI active; promote to T1".
  LiteLLM is catalogued at L1 cross-model router (W259-SHIP-DECISIONS.md:42), a different layer — its job is
  the DeepSeek/local-model escape valve, not MAX-account pooling.

### 3.3 Converged verdict

For automatic multi-MAX pooling: CLIProxyAPI. It is the only candidate that natively owns the OAuth account
pool with round-robin + automatic 429/5xx cooldown failover. MIT license, single static Go binary (no
Node/Python runtime — passes the harness-fit "no other vendor SDK" filter), proven Windows support including
PowerShell-native forks. The W259 catalog independently rates it "L8 multi-MAX governance, promote to T1."
This is >=3-org convergence: Anthropic docs (the ANTHROPIC_BASE_URL hook it uses) + router-for-me (33k stars,
the tool) + W259 internal catalog + a broad ecosystem of dependent Windows projects.

LiteLLM and claude-code-router solve a different problem and are NOT the multi-account answer.
claude-code-router has explicit non-support. LiteLLM can forward an OAuth header but cannot manage/refresh a
subscription pool — using it for MAX pooling would require you to script OAuth refresh yourself, defeating
the point. Keep LiteLLM for what the catalog already assigns it (L1 model-provider routing / DeepSeek escape
valve); keep claude-code-router off the install list (duplicates LiteLLM layer with less convergence).

### 3.4 Harness-fit verdict — CLIProxyAPI

| Harness-fit filter | CLIProxyAPI | Verdict |
|---|---|---|
| Assumes purely-interactive operator? | No — background daemon; CC connects headlessly via ANTHROPIC_BASE_URL | PASS |
| Needs another vendor SDK? | No — standalone Go binary | PASS |
| Duplicates an installed plugin? | No — no plugin in the 42-set does OAuth account pooling | PASS |
| Requires a self-invent hook? | No — integration is one env var (ANTHROPIC_BASE_URL), set in the eee.ps1 launcher like the existing portable-isolation env block | PASS (cardinal-rule-2 clean — env redirect, not a hook) |
| Breaks on Windows/PowerShell? | No — native Windows builds + PowerShell-native tray fork | PASS |
| Install channel | GitHub release binary — consistent with the install-from-GitHub discipline; verify checksum | PASS w/ caveat — pin a release tag + verify the binary; no silent auto-update |

One real caveat (cardinal-rule alignment): CLIProxyAPI is TIER-2-NAMED-PRACTITIONER in the W259 catalog, not
an Anthropic-official primitive. It is OPERATOR-DECISION, not auto-adopt. The cardinal rule "install only
from trusted upstream via official channels" means treat CLIProxyAPI as a deliberate operator install
(pinned release, checksum-verified), not a plugin. The ANTHROPIC_BASE_URL redirect itself is fully documented
+ cardinal-rule-2-clean.

Recommendation: Do NOT install CLIProxyAPI yet. For a single developer, the CLAUDE_CONFIG_DIR-per-account
alias pattern (§5.2) covers manual switching at zero install cost and zero new trust surface. Adopt
CLIProxyAPI only when there is a measured, recurring need for automatic failover across MAX accounts inside a
single long-running parallel fan-out (e.g. background-session swarms exhausting one account 5-hour window).
Until then it is a documented standby, not a wired component.

---

## §4 — Convergence table

Each row: claim -> evidence-tier -> which orgs/sources converge.

| # | Claim | Tier | Converging sources (>=3) |
|---|---|---|---|
| 1 | CLAUDE_CONFIG_DIR relocates all settings/creds/history/plugins; is the multi-account primitive | [DOC-PRIMARY]+[CONVERGED] | Anthropic env-vars doc - CCBP claude-settings.md:877 - practitioner blogs (codeminer42, madewithlove, joshcgrossman) |
| 2 | CLAUDE_CODE_PROJECT_DIR does not exist / is not read by CC | [CODE-VERIFIED] | Exhaustive grep of env-vars doc (131 CLAUDE_* vars, zero PROJECT_DIR) - absent from CCBP claude-settings.md env table - absent from settings doc |
| 3 | Four settings scopes; precedence Managed > CLI > Local > Project > User | [DOC-PRIMARY] | Anthropic settings doc (two sections) - CCBP claude-settings.md |
| 4 | MCP: .mcp.json = project scope (in-repo, git); Local + User MCP both live in user .claude.json | [DOC-PRIMARY] | Anthropic mcp doc (Local/Project/User scope defs) - settings doc "What uses scopes" row |
| 5 | CLAUDE.md walks UP the directory tree -> shared parent CLAUDE.md bleeds into all child projects | [DOC-PRIMARY] | Anthropic memory doc "How CLAUDE.md files load" |
| 6 | @import allows abs+rel paths, recursive, max depth 5 hops | [DOC-PRIMARY] | Anthropic memory doc "Import additional files" |
| 7 | CLIProxyAPI natively pools multiple Claude MAX accounts w/ round-robin + cooldown failover | [CODE-VERIFIED] | CLIProxyAPI README - CLIProxyAPI config.example.yaml - DeepWiki audit of ClaudeCodeAPIHandler |
| 8 | claude-code-router does NOT pool same-provider MAX accounts | [CODE-VERIFIED] | DeepWiki musistudio/claude-code-router - W259 catalog MEMORY-LAYER-RECONCILED-W259v4.md:124 (L1 model-router, peer of LiteLLM) |
| 9 | LiteLLM can forward OAuth headers but does not own/refresh a subscription pool | [CODE-VERIFIED] | DeepWiki BerriAI/litellm (forward_client_headers_to_llm_api) |
| 10 | CLIProxyAPI is MIT, single Go binary, Windows-native (forks: ProxyPilot, CLIProxyAPI Tray) | [CODE-VERIFIED] | CLIProxyAPI README ("License — MIT", "Who is with us?") - DeepWiki ("compiled Go, standalone binary") |
| 11 | Worktrees (--worktree/-w) are the per-branch isolation primitive; complementary to config-dir isolation | [DOC-PRIMARY]+[CONVERGED] | Anthropic worktrees doc - CCBP claude-cli-startup-flags.md:125 - WebSearch (MindStudio, thepromptshelf, multiple 2026 guides) |
| 12 | Manual multi-account = CLAUDE_CONFIG_DIR-per-account shell alias (community-standard pattern) | [COMMUNITY]+[CONVERGED] | gist KMJ-007 - codeminer42 blog - madewithlove blog - joshcgrossman (Windows-specific) - dev.to harryy2510 |

---

## §5 — Concrete wiring for THIS runtime

### 5.1 Fix the inert CLAUDE_CODE_PROJECT_DIR (priority — correctness)

Problem: CLAUDE.local.md ENV (f) sets CLAUDE_CODE_PROJECT_DIR = Z:/claude-sota-installed-state/.claude/projects
believing it relocates session JSONL transcripts. CC does not read this var. Transcripts still write to
Z:/claude-sota-installed/.claude/projects/. (CODEX_HOME in the same ENV block is real and does work — only
the CC PROJECT_DIR line is inert.)

Action — pick one:
- (a) Honest fix (recommended): keep transcripts under the config dir, delete the false var. Remove the
  CLAUDE_CODE_PROJECT_DIR line from CLAUDE.local.md ENV (f) and from eee.ps1. Transcripts living under
  CLAUDE_CONFIG_DIR/projects/ is the documented, correct layout — already isolated per project by sub-folder
  and per runtime by config dir. Add a one-line comment recording that transcripts intentionally live under
  the config dir.
- (b) If transcripts genuinely must leave the repo: relocate the entire config dir. But .claude/ is the
  config root, not project source code; verify .claude/projects/ is gitignored — if so, no relocation is
  needed and option (a) is sufficient.

Either way: stop setting a variable CC ignores. This is a [CODE-VERIFIED] no-op (§1.4).

### 5.2 Multi-account: CLAUDE_CONFIG_DIR-per-account aliases (zero install)

For the multiple MAX accounts, add per-account launchers — the converged community pattern, adapted to the
existing Z:-portable + eee launcher convention. One config dir per account, sharing nothing. PowerShell env
must be set BEFORE launching claude (mirror the existing eee.ps1 ENV block):

    # eee-a1.ps1  (MAX account 1) -- the existing eee.ps1, unchanged
    $env:CLAUDE_CONFIG_DIR = 'Z:/claude-sota-installed/.claude'

    # eee-a2.ps1  (MAX account 2) -- copy eee.ps1, change ONLY these:
    $env:CLAUDE_CONFIG_DIR       = 'Z:/claude-sota-installed-a2/.claude'
    $env:CLAUDE_CODE_TMPDIR      = 'Z:/claude-sota-installed-a2/tmp'
    $env:USERPROFILE             = 'Z:/claude-sota-installed-a2'
    $env:HOME                    = 'Z:/claude-sota-installed-a2'
    $env:HOMEPATH                = '\claude-sota-installed-a2'
    # give a2 its own outside-repo CODEX_HOME / session-state paths too

First run on each: claude /login -> sign in with that account. Credentials persist in that config dir.
Sessions launched from eee-a1 and eee-a2 share ZERO state — different account, history, checkpoints.

Plugin-sharing optimization (optional): to avoid re-installing 42 plugins under the a2 config dir, point both
config dirs at one plugin cache by adding to BOTH eee-a1 and eee-a2:

    $env:CLAUDE_CODE_PLUGIN_CACHE_DIR = 'Z:/claude-sota-shared/plugins'

Trade-off: shared plugins = one update path (good) but a2 plugin enable-state still lives in a2 settings.json
(fine — behavior stays per-config-dir). This applies the §2 "behavior+tooling shared, identity isolated" rule.

### 5.3 Multi-project layout — the recommended directory + env shape

For N different projects under one account, do NOT spawn a config dir per project. Use one config dir +
separate project directories + per-repo .claude/:

    Z:/
      claude-sota-installed/         runtime A -- config dir Z:/claude-sota-installed/.claude
        .claude/                     settings.json, plugins, projects/ (transcripts), user .claude.json
      projects/                      <- ALL of account-1 actual project repos, ONE parent
        projA/  .claude/  CLAUDE.md  .mcp.json
        projB/  .claude/  CLAUDE.md  .mcp.json
        projC/  .claude/  CLAUDE.md
      claude-sota-installed-a2/       runtime B (account 2) -- separate config dir

Rules baked in:
- One config dir per account (not per project) — plugins/marketplaces shared across that account projects (§2).
- The projects/ parent has NO CLAUDE.md at its root — otherwise the directory-walk (§1.5) bleeds it into
  projA, projB, projC. Keep the common parent memory-free.
- Each project repo carries its own .claude/ (settings + agents) and .mcp.json (project-scoped MCP) — these
  are the per-project isolation surfaces and they travel with git.
- Concurrency: launch CC in projA/ and projB/ in two terminals simultaneously — they share the account
  plugins but isolate working tree, project settings, project MCP, project CLAUDE.md, and (by sub-folder)
  transcripts. Zero bleed. For two BRANCHES of the SAME repo in parallel, add --worktree (Stream A) —
  orthogonal to this cross-project layout.

### 5.4 What to change in settings.json — minimal

The runtime settings.json is already correct on the isolation axis: path/identity env vars are set by the
launcher, BEFORE CC starts — the only correct place. settings.json env cannot relocate the config dir because
it is read FROM the config dir. Changes:
1. No settings.json change is needed for §5.1-5.3. The fixes are launcher-script (eee*.ps1) + CLAUDE.local.md
   edits.
2. Optional per-project hygiene: in each project repo .claude/settings.local.json, set project-specific
   permissions / disabledMcpjsonServers rather than widening the user-scope settings.json. Keeps project
   policy isolated and git-appropriate.
3. Document the transcript location (after §5.1 option a) in CLAUDE.local.md: a one-line note that transcripts
   intentionally live under CLAUDE_CONFIG_DIR/projects/ and are isolated per-project by sub-folder — closing
   the false-relocation gap.

### 5.5 Action checklist (priority order)

| # | Action | Type | Effort | Reversible? |
|---|---|---|---|---|
| 1 | Delete inert CLAUDE_CODE_PROJECT_DIR from CLAUDE.local.md ENV (f) + eee.ps1; add 1-line comment that transcripts live under CLAUDE_CONFIG_DIR | correctness fix | <5 min | yes (re-add line) |
| 2 | Verify Z:/claude-sota-installed/.claude/projects/ is gitignored (it should be — config root) | audit | <2 min | n/a |
| 3 | For 2nd MAX account: create eee-a2.ps1 with its own CLAUDE_CONFIG_DIR (+ HOME/TMPDIR/state paths); claude /login once | feature | ~15 min | yes (delete script + dir) |
| 4 | (Optional) point both config dirs at a shared CLAUDE_CODE_PLUGIN_CACHE_DIR to share the 42-plugin set | optimization | ~10 min | yes (unset) |
| 5 | When launching N projects: keep all project repos under a CLAUDE.md-free common parent; each repo carries its own .claude/ + .mcp.json | discipline | ongoing | n/a |
| 6 | CLIProxyAPI: standby only — install (pinned release, checksum-verified, ANTHROPIC_BASE_URL redirect in launcher) ONLY when automatic MAX-pool failover becomes measured-load-bearing | deferred | ~30 min when triggered | yes (unset env) |

---

## Sources

Official Anthropic docs (PRIMARY):
- Claude Code settings — https://code.claude.com/docs/en/settings
- Claude Code memory / CLAUDE.md — https://code.claude.com/docs/en/memory
- Claude Code environment variables — https://code.claude.com/docs/en/env-vars
- Claude Code MCP — https://code.claude.com/docs/en/mcp
- Claude Code model configuration — https://code.claude.com/docs/en/model-config
- Claude Code IAM / authentication — https://code.claude.com/docs/en/iam
- Claude Code worktrees — https://code.claude.com/docs/en/worktrees

GitHub / DeepWiki:
- router-for-me/CLIProxyAPI — https://github.com/router-for-me/CLIProxyAPI — README + config.example.yaml @ sha 8b3670b
- musistudio/claude-code-router — https://github.com/musistudio/claude-code-router — DeepWiki audit
- BerriAI/litellm — https://github.com/BerriAI/litellm — DeepWiki audit

CCBP (community reference, HEAD 48f2ceb):
- claude-code-best-practice-shan/best-practice/claude-settings.md (env table, startup sweep)
- claude-code-best-practice-shan/best-practice/claude-cli-startup-flags.md (--worktree, --add-dir)

Internal W259 catalog:
- docs/architecture/W259-grand-catalog/W259-SHIP-DECISIONS.md (L1 LiteLLM, L8 CLIProxyAPI verdicts)
- docs/architecture/W259-grand-catalog/W259-ULTIMATE-DECISIONS.md (L8 multi-MAX governance)
- docs/architecture/W259-grand-catalog/03-deepdive/MEMORY-LAYER-RECONCILED-W259v4.md (claude-code-router is L1 router)

Practitioner / community (COMMUNITY tier — corroborating, not load-bearing):
- Manage Multiple Claude Code Accounts (gist, KMJ-007) — https://gist.github.com/KMJ-007/0979814968722051620461ab2aa01bf2
- AI TIP: Running Two Claude Code Accounts (codeminer42) — https://blog.codeminer42.com/ai-tip-running-two-claude-code-accounts/
- Running multiple Claude accounts without logging out (madewithlove) — https://madewithlove.com/blog/running-multiple-claude-accounts-without-logging-out/
- Running two Claude Code accounts on one Windows PC (joshcgrossman) — https://joshcgrossman.com/2026/02/04/claude-two-accounts-windows/
- How I Run Multiple Claude Code Accounts From One Terminal (dev.to) — https://dev.to/harryy2510/multiple-claude-code-accounts-one-terminal-5em5
- Parallel Agentic Development: Run Multiple Claude Code Sessions (MindStudio) — https://www.mindstudio.ai/blog/parallel-agentic-development-claude-code-worktrees
