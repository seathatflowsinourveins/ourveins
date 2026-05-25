# W206 Comprehensive SOTA Checklist — Z:\claude-sota-pure (fresh-from-scratch)

**Date**: 2026-05-15
**Operator directive (verbatim)**: "fully new research via sota references without biases, give me the most comprehansive checklist, please research all the sota repos first, awesome list etc in order to set up Z:\claude-sota-pure with all sota absolute all layer sota convergence consensus to install with repos's guide with the best way to implant them into thed pure sota runtime, all must be researched as best quality sota repos and install directly and wired form all layers and sources convergece for advanced automation workflow"

**Synthesis basis**: 3-agent parallel fan-out (Agent A C5+C6+C8+C9 cohort discovery / Agent B Anthropic OFFICIAL install matrix / Agent C 12 workflow pillars) per `advanced-agent-team-standing-directive.md` invariants 1-8. Convergence consensus: 6 distinct orgs Axis-1 PASS (Anthropic + OpenAI + obra/Jesse Vincent + Addy Osmani/Google Chrome + getzep/Zep AI + doobidoo/Henry Krupp). Mia pre-apply applied per `mia-pre-apply.md` §How to apply 4-clause verify.

**Architecture target**: `anthropics/cwc-long-running-agents @ HEAD ad107a974bced5244f74dd283dbf2bfd3baee3a1` (TIER-1-DIRECT Anthropic-OFFICIAL native install pattern — THE SOTA destination per CLAUDE.md L155 anchor).

---

## LAYER 0 — Foundation prereqs (OS / shell / git / python / node / docker / gh)

| Tool | Min | Install (CR-6 official-native-channel) | Verify |
|---|---|---|---|
| Git for Windows | 2.40+ | `winget install --id Git.Git` | `git --version` |
| PowerShell 7.x | 7.4+ | `winget install --id Microsoft.PowerShell` | `pwsh --version` |
| Python | 3.11+ | `winget install --id Python.Python.3.13` + `python -m venv Z:\venvs\claude` | `python --version` |
| Node.js LTS | 22.x+ | `winget install --id OpenJS.NodeJS.LTS` | `node --version` |
| uv (Python tooling) | latest | `winget install --id astral-sh.uv` | `uv --version` |
| Docker Desktop | latest | `winget install --id Docker.DockerDesktop` | `docker --version` |
| gh CLI | latest | `winget install --id GitHub.cli` | `gh --version` |

**Cite**: CCBP `claude-settings.md:CLAUDE_CODE_GIT_BASH_PATH @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` — Git Bash MUST stay on C: drive (cross-mount path-conv issues on Z:).

---

## LAYER 1 — claude CLI install + cross-model worker (parallel)

```powershell
# claude CLI (Anthropic-OFFICIAL via npm registry per CR-6):
npm install -g @anthropic-ai/claude-code@latest
# Pin version post-install per CR-9 install-risk discipline:
claude --version  # target: ≥2.1.142 (claude agents CLI + /goal + hook args:string[])

# codex CLI (cross-model T1-T5 worker per cross-model-consensus.md):
npm install -g @openai/codex@latest
codex --version  # target: latest OpenAI release 2026-05-15
```

**Cite**: TIER-1-DIRECT CHANGELOG 2.1.139 + 2.1.142 (`claude agents` CLI + `/goal` completion-tracking). OpenAI codex CLI @ HEAD `c03cea4ca2a8a582b309a483d84a094c75cfd1c7` (Apache-2.0, daily commits, cross-vendor AI-CLI per Anthropic Axis-1 #3).

---

## LAYER 2 — Bootstrap files (the ONLY hand-coded artifacts per CR-5)

| File | Purpose | Source |
|---|---|---|
| `README.md` | orientation | bootstrap (free-form) |
| `CLAUDE.md` | project cardinal rules (12 cardinal rules) | bootstrap; pattern: `Z:/claude-sota-installed/CLAUDE.md` (mechanical-mirror exception per `port-note-discipline.md`) |
| `CLAUDE.local.md` | machine-local ENV block (gitignored) | bootstrap per CCBP `claude-memory.md:113 @ 48f2cebe` |
| `AGENTS.md` | universal agent-context (optional; `@CLAUDE.md` import) | `code.claude.com/docs/en/memory §AGENTS.md` |
| `.gitignore` | MUST include `.claude/plugins/`, `CLAUDE.local.md`, `.claude/projects/`, `.claude/state/`, `.claude/worktrees/`, `tmp/` | bootstrap |
| `tools/eee.ps1` | launcher with full ENV block | bootstrap; pattern: `Z:/claude-sota-installed/tools/eee.ps1` |
| `bin/eee.cmd` | 5-LOC cmd-shell shim | bootstrap |
| `.claude/settings.json` | minimum baseline (permissions/hooks/plugins/env) | `code.claude.com/docs/en/settings` |
| `.mcp.json` | MCP registry skeleton `{"mcpServers": {}}` | `code.claude.com/docs/en/settings §MCP` |
| `docs/sota-installed-manifest.md` | install-row SSOT | bootstrap per `Z:/claude-sota-installed` pattern |
| `docs/install-provenance.md` | append-only install log | bootstrap |

---

## LAYER 3 — Full ENV block (Z:-portable per CCBP `claude-settings.md:877-921 @ HEAD 48f2cebe`)

```powershell
# (a) HOME isolation (BEFORE claude launch)
$env:USERPROFILE = 'Z:\claude-sota-pure'
$env:HOME        = 'Z:\claude-sota-pure'
$env:HOMEDRIVE   = 'Z:'
$env:HOMEPATH    = '\claude-sota-pure'

# (b) Canonical CC runtime ENV
$env:CLAUDE_CONFIG_DIR             = 'Z:/claude-sota-pure/.claude'
$env:CLAUDE_CODE_TMPDIR            = 'Z:/claude-sota-pure/tmp'
$env:CLAUDE_CODE_PLUGIN_CACHE_DIR  = 'Z:/claude-sota-pure/.claude/plugins'
$env:CLAUDE_CODE_DEBUG_LOGS_DIR    = 'Z:/claude-sota-pure/.claude/debug/cc-debug.log'
$env:CLAUDE_CODE_GIT_BASH_PATH     = 'C:\Program Files\Git\bin\bash.exe'
$env:CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS = '1'

# (c) MSYS suppression
$env:MSYS_NO_PATHCONV     = '1'
$env:MSYS2_ARG_CONV_EXCL  = '*'
$env:MSYS2_ENV_CONV_EXCL  = '*'

# (d) Q2 2026 — forked subagents
$env:CLAUDE_CODE_FORK_SUBAGENT = '1'   # v2.1.117

# (e) State-outside-repo (credential isolation)
$env:CLAUDE_CODE_PROJECT_DIR = 'Z:/claude-sota-pure-state/.claude/projects'
$env:CODEX_HOME              = 'Z:/claude-sota-pure-state/.codex'

# (f) DEPRECATED — DO NOT SET unless explicit STAND-IN-NOTICE
# $env:CLAUDE_CODE_SUBAGENT_MODEL = ...

# (g) OPTIONAL — 1M context kill-switch (Path D fan-out per FM-17.f)
# $env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1'

# (h) OPTIONAL — Auto-compact pre-emptive 70%
# $env:CLAUDE_AUTOCOMPACT_PCT_OVERRIDE = '70'
```

**Cite per-line**: TIER-1-DIRECT `code.claude.com/docs/en/env-vars` (full inventory) + CCBP `claude-settings.md:877-921 @ HEAD 48f2cebe`.

---

## LAYER 4 — Plugin marketplaces (≥3 Axis-1 distinct orgs per marketplace)

```bash
# Anthropic-OFFICIAL foundational marketplace (auto-added on first run):
/plugin marketplace add anthropics/claude-plugins-official
# Cite: HEAD 1a2f18b05cf5652fd25403e8d229fc884fb84103 (Apache-2.0, 19.4k★, 36 plugins)

# Anthropic-OFFICIAL native-install pattern (5 primitives + 3 ref plugins):
/plugin marketplace add anthropics/cwc-long-running-agents
# Cite: HEAD ad107a974bced5244f74dd283dbf2bfd3baee3a1 (Apache-2.0; ahead of CLAUDE.md ffd563d6)

# Named-T2 author marketplaces:
/plugin marketplace add obra/superpowers              # MIT, 171.8k★, Jesse Vincent
/plugin marketplace add addyosmani/agent-skills       # MIT, 41.8k★, Google Chrome DevRel
/plugin marketplace add mattpocock/skills             # MIT, 48.8k★, TypeScript engineering
/plugin marketplace add vercel-labs/agent-skills      # Vercel-Labs org composition

# Workflow + orchestration:
/plugin marketplace add wshobson/agents               # claude-code-workflows, 35.4k★
/plugin marketplace add affaan-m/everything-claude-code   # ECC 1.10.0 production patterns

# Token efficiency + observability:
/plugin marketplace add mksglu/context-mode           # ctx_search/ctx_batch_execute MCP
/plugin marketplace add fcakyon/claude-settings       # intelligent-compact PreCompact

# Cross-model worker integration:
/plugin marketplace add openai/codex-plugin-cc        # codex CLI ↔ CC bridge
```

**Verify**: `claude plugin marketplace list` → 10 marketplaces registered.

---

## LAYER 5 — Plugins from each marketplace (Tier 1 ADOPT-NOW per Agent A convergence)

```bash
# From claude-plugins-official (Anthropic OFFICIAL):
/plugin install agent-sdk-dev@claude-plugins-official      # Agent SDK scaffolding
/plugin install ralph-loop@claude-plugins-official         # Ralph Wiggum self-referential loop
/plugin install frontend-design@claude-plugins-official    # UI grading rubrics
/plugin install skill-creator@claude-plugins-official      # Anthropic-OFFICIAL skill authoring
/plugin install security-guidance@claude-plugins-official  # Edit-time security reminders
/plugin install commit-commands@claude-plugins-official    # /commit /commit-push-pr
/plugin install code-review@claude-plugins-official        # /code-review
/plugin install hookify@claude-plugins-official            # hook authoring
/plugin install feature-dev@claude-plugins-official        # guided feature dev workflow
/plugin install code-modernization@claude-plugins-official # legacy code modernization
/plugin install claude-md-management@claude-plugins-official
/plugin install claude-code-setup@claude-plugins-official  # automation-recommender skill

# LSP plugins (per target language):
/plugin install pyright-lsp@claude-plugins-official        # Python
/plugin install typescript-lsp@claude-plugins-official     # TS/JS
/plugin install gopls-lsp@claude-plugins-official          # Go
/plugin install rust-analyzer-lsp@claude-plugins-official  # Rust

# From obra/superpowers:
/plugin install superpowers@superpowers
# Includes: brainstorming + subagent-driven-development + systematic-debugging + TDD +
#           verification-before-completion + dispatching-parallel-agents +
#           using-git-worktrees + writing-skills + writing-plans + requesting-code-review +
#           receiving-code-review + finishing-a-development-branch + executing-plans

# From addy-agent-skills:
/plugin install agent-skills@addy-agent-skills
# Includes: 21+ engineering-phase skills (source-driven-development / TDD / api-design /
#           security-and-hardening / etc.)

# From wshobson/agents (claude-code-workflows):
/plugin install agent-orchestration@claude-code-workflows  # multi-agent orchestration v1.2.1
/plugin install context-management@claude-code-workflows   # context persistence v1.2.0
/plugin install comprehensive-review@claude-code-workflows # multi-perspective v1.3.0
/plugin install agent-teams@claude-code-workflows          # multi-reviewer + debug v1.0.2
/plugin install tdd-workflows@claude-code-workflows        # red-green-refactor v1.3.0
/plugin install debugging-toolkit@claude-code-workflows    # v1.2.0
/plugin install security-scanning@claude-code-workflows    # SAST/OWASP v1.3.1

# From context-mode:
/plugin install context-mode@context-mode                  # token-efficiency MCP

# From claude-settings (intelligent-compact):
/plugin install intelligent-compact@claude-settings        # PreCompact priority-preservation

# From everything-claude-code (ECC):
/plugin install everything-claude-code@everything-claude-code
# Includes: dmux-workflows + autonomous-agent-harness + team-builder + meta-skill stack

# From codex-plugin-cc (cross-model gate):
/plugin install codex@openai-codex                         # T1/T2/T3/T4/T6 cross-model hooks
```

**Verify**: `claude plugin list` → all installed plugins enabled.

---

## LAYER 6 — MCPs (`.mcp.json` registration)

```json
{
  "mcpServers": {
    "memory": {
      "command": "Z:/venvs/claude/Scripts/mcp-memory-server.exe",
      "args": [],
      "env": {
        "MCP_MEMORY_BACKEND": "sqlite_vec",
        "MCP_MEMORY_DB_PATH": "Z:/claude-sota-pure-state/.mcp-memory/memory.db"
      }
    },
    "graphiti": {
      "command": "uv",
      "args": ["--directory", "Z:/claude-sota-pure/.local/graphiti/mcp_server", "run", "main.py"],
      "env": {
        "FALKORDB_URI": "redis://127.0.0.1:16379",
        "FALKORDB_PASSWORD": "",
        "FALKORDB_DATABASE": "default_db",
        "OPENAI_API_URL": "http://127.0.0.1:11700/v1",
        "GRAPHITI_GROUP_ID": "pure"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {"GITHUB_TOKEN": "${GITHUB_TOKEN}"}
    },
    "context7": {"command": "npx", "args": ["-y", "@upstash/context7-mcp"]},
    "deepwiki": {"command": "npx", "args": ["-y", "mcp-deepwiki@latest"]},
    "perplexity": {
      "command": "npx", "args": ["-y", "server-perplexity-ask"],
      "env": {"PERPLEXITY_API_KEY": "${PERPLEXITY_API_KEY}"}
    },
    "firecrawl": {
      "command": "npx", "args": ["-y", "firecrawl-mcp"],
      "env": {"FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}"}
    },
    "repomix": {"command": "npx", "args": ["-y", "repomix", "--mcp"]},
    "serena": {
      "command": "uvx",
      "args": ["--from", "git+https://github.com/oraios/serena", "serena", "mcp",
               "--context", "ide-assistant"]
    },
    "gitnexus": {"command": "npx", "args": ["-y", "gitnexus", "mcp"]},
    "playwright": {"command": "npx", "args": ["-y", "@playwright/mcp@latest"]},
    "chrome-devtools": {"command": "npx", "args": ["-y", "chrome-devtools-mcp@latest"]}
  }
}
```

**Backend installs**:
```bash
# Memory L1+L2 (doobidoo/mcp-memory-service v10.51.3+, Apache-2.0, 1.8k★)
pip install git+https://github.com/doobidoo/mcp-memory-service.git

# Memory L3 (getzep/graphiti v0.29+, Apache-2.0, 25.8k★)
pip install graphiti-core[falkordb]
docker pull falkordb/falkordb:latest
docker run -d -p 16379:6379 --name falkordb falkordb/falkordb:latest
git clone --depth 1 https://github.com/getzep/graphiti.git Z:/claude-sota-pure/.local/graphiti
```

**Verify**: `claude mcp list` → all servers green.

---

## LAYER 7 — Hooks (`.claude/settings.json hooks` block)

**Anthropic-OFFICIAL cwc native hooks** (install from `Z:/claude-sota-pure/.local/cwc/`):
```bash
# After cwc marketplace clone:
mkdir -p Z:/claude-sota-pure/.claude/hooks/scripts
cp Z:/claude-sota-pure/.local/cwc/claude-code-config/.claude/hooks/*.sh \
   Z:/claude-sota-pure/.claude/hooks/scripts/
```

5 install-class hook primitives:
- `track-read.sh` — PostToolUse on Read; log evidence to `.claude/state/`
- `verify-gate.sh` — PreToolUse on Write/Edit `test-results.json`; **Default-FAIL contract**
- `kill-switch.sh` — PreToolUse on all tools; `AGENT_STOP` file halts execution
- `steer.sh` — UserPromptSubmit; surface `STEER.md` once per session
- `commit-on-stop.sh` — Stop; auto-commit uncommitted changes per PROGRESS.md

**Cross-model gate hooks** (auto-registered via codex-plugin-cc install):
- T1 PreToolUse Edit|Write|MultiEdit → `codex_t1_consult_gate.py` (pre-edit consult; default WARN; STRICT via `CODEX_T1_GATE_STRICT=1`)
- T2 PreToolUse Bash(git commit *) → `codex_t2_pre_commit_gate.py` (STRICT FAIL_CLOSED commit gate)
- T3 PostToolUse Bash(git commit *) → `codex_postcommit_review.py` (async post-commit audit)
- T4 PostToolUse Bash(git push *) → `codex_prepush_review.py` (async post-push audit)
- T6 Stop → `codex_stop_review_gate.py` (deep-review-exec session-end)
- T7 Stop slot 0 → `auto_proceed_gate.py` (ask-without-act regex)

**PreCompact priority-preservation stack** (auto-registered via plugin installs):
- `intelligent-compact@claude-settings` precompact_priorities.sh — A-F patches reinject post-compact
- `context-mode` precompact.mjs — preserve priority during compact
- ECC pre-compact (everything-claude-code)

**SessionStart hooks**:
- `context-mode-cache-heal.mjs` — MEMORY.md inject + status.py probe
- Plugin-supplied SessionStart from claude-code-workflows + ECC

**Hook field cite**: TIER-1-DIRECT `code.claude.com/docs/en/hooks` — `asyncRewake: true` (v2.1.105 PreCompact can block via exit 2) + `permissionDecision: "deny"|"allow"|"ask"|"defer"` + `args: string[]` exec form (v2.1.139) + `if: "Bash(git *)"` matcher + `type: "mcp_tool"` (v2.1.118 hooks invoke MCP).

---

## LAYER 8 — Agents (`.claude/agents/*.md` + plugin-supplied)

**Bootstrap agent** (cwc Anthropic-OFFICIAL):
```bash
cp Z:/claude-sota-pure/.local/cwc/claude-code-config/.claude/agents/evaluator.md \
   Z:/claude-sota-pure/.claude/agents/
```
- `evaluator.md` — fresh-context PASS/NEEDS_WORK grader (no Write/Edit tools)
- Cite: TIER-1-DIRECT `cwc-long-running-agents/claude-code-config/.claude/agents/evaluator.md @ HEAD ad107a97`

**Plugin-supplied agents (auto-load via plugin install)**:
- From feature-dev: code-architect / code-explorer / code-reviewer
- From code-modernization: architecture-critic / business-rules-extractor / legacy-analyst / security-auditor / test-engineer
- From hookify: conversation-analyzer
- From agent-sdk-dev: agent-sdk-verifier-py / agent-sdk-verifier-ts
- From code-simplifier: code-simplifier
- From codex-plugin-cc: codex-rescue / gpt5-reviewer / gpt5-archaeologist (BRIDGE-MODE GPT-5.5)
- From superpowers: subagent-driven-development variants
- From agent-orchestration / agent-teams: team-lead / team-debugger / team-implementer / team-reviewer

**Frontmatter spec**: TIER-1-DIRECT `code.claude.com/docs/en/sub-agents` — 16 fields (name / description / tools / allowed-tools / model / effort / mcpServers / skills / hooks / memory / isolation / initialPrompt / color / background / disable-model-invocation + `PROACTIVELY when user says X` convention).

---

## LAYER 9 — Skills (`.claude/skills/**/SKILL.md` + plugin-supplied)

**4-skill meta-stack (always-active auto-fire)**:
1. `using-superpowers@superpowers` — 1% rule + Process-first/Implementation-second
2. `using-agent-skills@addy-agent-skills` — discovery governance for 21+ engineering skills
3. `skill-comply@everything-claude-code` — post-invocation verification checklist
4. `skill-creator@claude-plugins-official` (Anthropic OFFICIAL) — authoring loop

**Frontmatter cite**: TIER-1-DIRECT `code.claude.com/docs/en/skills` — 15 fields (name / description / when_to_use / argument-hint / arguments / disable-model-invocation / user-invocable / allowed-tools / model / effort / context [`fork`] / agent / hooks / paths / shell).

**Activation extras**:
- `$ARGUMENTS` substitution + `${CLAUDE_SKILL_DIR}` + `${CLAUDE_SESSION_ID}` + `${CLAUDE_EFFORT}`
- `` !`<command>` `` dynamic preprocessing
- `context: fork` subagent execution
- `skillOverrides` (v2.1.129) per-skill visibility
- `maxSkillDescriptionChars` default 1536 / `skillListingBudgetFraction` default 0.01

---

## LAYER 10 — Memory stack (4-layer Karpathy §5)

| Layer | Implementation | Install | Cite |
|---|---|---|---|
| **L1 capture** | `doobidoo/mcp-memory-service` v10.51.3+ | `pip install git+https://github.com/doobidoo/mcp-memory-service.git` | Apache-2.0, 1.8k★ |
| **L2 vector** | sqlite_vec embedded in L1 (Qdrant fallback) | Bundled; promote to `docker pull qdrant/qdrant:latest` at scale | sqlite-vec embedded |
| **L3 temporal-KG** | `getzep/graphiti` v0.29+ + FalkorDB | `pip install graphiti-core[falkordb]` + `docker pull falkordb/falkordb:latest` | Apache-2.0, 25.8k★ |
| **L4 wiki** | Karpathy §5 compounding surface | Bootstrap operator-driven (`PROGRESS.md` + `memory/MEMORY.md` + `tmp/wave*.md`) | TIER-1-DIRECT `karpathy-adapted.md §5` |

**Auto-memory** (v2.1.59+): default-on at `~/.claude/projects/<project>/memory/MEMORY.md` (first 200 lines / 25KB loaded per session).

---

## LAYER 11 — Code intelligence

| Tool | Install | Purpose |
|---|---|---|
| **gitnexus** | `npm install -g gitnexus@latest` + `.mcp.json` register | symbol graph + impact analysis |
| **tree-sitter** | bundled via repomix | AST parsing |
| **repomix MCP** | `npx -y repomix --mcp` | pack_codebase / grep_repomix_output / generate_skill |
| **serena MCP** | `uvx --from git+https://github.com/oraios/serena serena mcp --context ide-assistant` | LSP-based symbol intelligence |
| **chrome-devtools MCP** | `npx -y chrome-devtools-mcp@latest` | browser inspection |
| **playwright MCP** | `npx -y @playwright/mcp@latest` | E2E automation |

---

## LAYER 12 — Observability

| Tool | Install | Purpose |
|---|---|---|
| **ccusage** | `npm install -g ccusage@latest` | Anthropic billing/usage |
| **Phoenix** | `docker run -p 6006:6006 arizephoenix/phoenix:latest` | Arize tracing dashboard |
| **Langfuse** | `docker compose -f langfuse/docker-compose.yml up` | LLM observability |
| **OpenTelemetry** | `CLAUDE_CODE_ENABLE_TELEMETRY=1` env | OTLP export |
| **audit JSONLs** | auto via hooks | `.claude/state/codex_review_HEAD_*.txt` + `mcp_health.jsonl` + `subagent_transcripts.jsonl` + `codex_postcommit_reviews.jsonl` |

---

## LAYER 13 — Q2 2026 features activation (CHANGELOG 2.1.x)

| Feature | Version | Activation |
|---|---|---|
| Auto-memory MEMORY.md | 2.1.59 | default-on; `/memory` toggle |
| PreCompact hook (can block exit 2) | 2.1.105 | `hooks.PreCompact` array |
| `/proactive` alias `/loop` | 2.1.105 | `/loop 5m /research` |
| `/effort xhigh` Opus 4.7 | 2.1.111 | `/effort xhigh` |
| Opus 4.7 + auto-mode default | 2.1.112 | model picker auto |
| CLI native Rust binary | 2.1.113 | `claude --version` shows binary |
| `/resume` 67% faster | 2.1.116 | `claude --resume` |
| **Forked subagents** (history inheritance) | 2.1.117 | `CLAUDE_CODE_FORK_SUBAGENT=1` |
| Agent frontmatter `mcpServers` | 2.1.117 | per-agent MCP scoping |
| **Hooks invoke MCP tools** | 2.1.118 | `hooks[].type: "mcp_tool"` |
| `/usage` (merged /cost+/stats) | 2.1.118 | `/usage` |
| `/config` persist to settings | 2.1.121 | `/config` |
| `prUrlTemplate` setting | 2.1.121 | settings.json |
| `claude project purge` | 2.1.126 | CLI |
| `EnterWorktree` from local HEAD | 2.1.126 | `EnterWorktree path:` |
| `--plugin-url` for .zip archives | 2.1.129 | `claude --plugin-url <url>` |
| `skillOverrides` per-skill visibility | 2.1.129 | settings.json |
| `worktree.baseRef` setting | 2.1.133 | settings.json |
| `effort.level` in hook input + `$CLAUDE_EFFORT` | 2.1.133 | hook scripts |
| `autoMode.hard_deny` | 2.1.136 | settings.json |
| **`/goal` command** | 2.1.139 | `/goal <predicate>` |
| **`claude agents` CLI dashboard** | 2.1.139 | `claude agents` |
| Hook `args: string[]` exec form | 2.1.139 | hooks block |
| `/goal` completion-condition tracking | 2.1.140 | `/goal` Stop hook |
| `claude agents --cwd` | 2.1.141 | CLI flag |
| `terminalSequence` hook field | 2.1.141 | hooks block |
| `claude agents` --add-dir/--settings/--mcp-config/--plugin-dir/--permission-mode/--model/--effort | 2.1.142 | CLI flags |

---

## LAYER 14 — Compounding surface (Karpathy §5 Wiki — daily operator discipline)

**3-layer structure**:
- **Layer 1 chronological**: `.claude/state/*.jsonl` audit trails (auto via hooks)
- **Layer 2 index**: `memory/MEMORY.md` — one-line entries ≤150 chars, ≤200 line ceiling
- **Layer 3 compiled wiki**: `tmp/wave*.md` + `docs/*.md` + `.claude/rules/*.md`

**Per-iter close discipline (mandatory surfaces)**:
- Wiki Run Log (Karpathy §5 Layer 3)
- Telemetry JSONL (audit-action-loop)
- Feedback memory (conditional via `codification-threshold.md` ~10 min/mo + LOC ≤200 gates)

---

## ACTIVATION + USAGE — daily operator checklist (12 pillars per Agent C)

### Pillar 1 — Cross-model T1-T7 lifecycle
- **T0** (PROPOSED) candidate-list challenge | **T1** pre-edit consult (deep-review-exec xhigh 240s) | **T2** working-tree review (codex exec review --uncommitted 120s) | **T3** post-commit async | **T4** post-push cumulative | **T5** plan-stage `/plan-codex-review` | **T6** Stop deep-review 900s | **T7** Stop ask-without-act 5s

### Pillar 2 — Parallel session worktree-isolation
- **Outer-CLI**: `eee --worktree feature-x` creates `.claude/worktrees/feature-x/`
- **Inner-agent**: `Agent({isolation:"worktree"})` per spawn
- **Mandatory** for ≥2 concurrent claude sessions on shared checkout
- Cite: Boris Cherny CCBP `claude-boris-6-tips-16-apr-26.md:93-109 @ 48f2ceb` + jj-vcs + OpenAI codex worktree-aware (4-org Axis-1 PASS)

### Pillar 3 — Advanced agent-team 8-invariant pre-flight
1. BRIDGE-MODE for ≥2 agents (codex-rescue / gpt5-reviewer / gpt5-archaeologist) with per-call 90s/120s/180s budget
2. Brief cites SOTA at file:line + HEAD SHA
3. Line-by-line audit for adoption-class waves (Probe DAG 1-7)
4. Anthropic CC docs TIER-1 LIVING-AUTHORITY
5. ARTIFACT-INLINE per FM-19
6. Mia pre-apply on returns
7. Forward-only persistence `tmp/wave<N>-<agent>-<topic>-<date>.md`
8. OUTPUT_BUDGET + TERMINATION in every brief

### Pillar 4 — Research-first-then-install
- sota-researcher multi-source≥4 (mcp__github + exa + deepwiki + perplexity + context7 + repomix + firecrawl + context-mode)
- 6-Probe-DAG harness-fit (1 count-OVER / 2 SDK-vs-CLI / 3 architectural-API / 4 plugin-namespace / 5 mode-harness-shape / 6 direct-file-blockers / 7 demand-gate split .a/.b)
- Convergence-gate Axis-1+2+3 + STRONG-PROVENANCE-EXPRESS predicate
- Remediation priority: (a) install canonical / (b) cite-adapt SOTA pattern / (c) operator-pick / (d) HONEST-NON-FINDING

### Pillar 5 — 9-cohort SOTA discovery menu
- C1 GraphQL star+topic / C2 arxiv / C3 HuggingFace / C4 PapersWithCode / C5 named-author / C6 awesome-list / C7 conference / C8 trending / C9 stars-sorted-direct
- ≥2-cohort fan-out mandate before adoption verdict

### Pillar 6 — Karpathy §5 3-layer compounding (per iter-close)
- L1 chronological JSONL (auto via hooks)
- L2 MEMORY.md one-line index (≤150 char entries, ≤200 line ceiling)
- L3 compiled wiki (`tmp/wave*.md` + `docs/*.md` + `.claude/rules/*.md`)

### Pillar 7 — Pattern A/B/C/D fix-forward + closed-loop
- **A**: NEEDS-REVISION conf 0.88-0.93 → single atomic apply (no iter-N→N.1)
- **B**: timeout-without-JSON → HNF trace-mine + ship + T3 verify
- **C**: T2 verifier-precision (exact runtime invocation in close-loop prompt)
- **D**: DEFAULT-profile foreground+tee recovery for Pattern B HNF
- **Outcome A** ACCEPT-WITH-DOC (monotone-decline + severity-gate) / **Outcome B** REVERT-AND-REMOVE (escalation or unresolved high) / **Outcome C** MANUAL-OVERRIDE (owner-accepts material risk)
- Stop at round 5 ceiling OR confidence-reversal

### Pillar 8 — FM-20 + Mia pre-apply 4-clause defense
- Decompose gap-claim into testable sub-claims (UPSTREAM / OPERATIONAL / CATEGORY / SHAPE)
- Cheap probe per type: file-existence → Glob; line-content → Read; wire-status → Grep; count-claim → wc -l; closed-arc → git log
- ≥1 sub-claim refuted → drop as OVER (NOT silently apply)
- Alternate-install-path probe for INSTALL-class (PATH + .local/bin + .cargo/bin + ~/go/bin + npm-global + WinGet + uv tool)
- ROI: ~1-3s probe vs ~5-15min revert = ~100× per catch

### Pillar 9 — Audit-action-loop Wire/Surface/Close/Re-fire
- 12 active JSONL audit hooks: claude_md_count + cite_drift + mcp_self + cohort_coverage + repo_cite_existence + agent_frontmatter + tmp_md_inventory + tmp_promote_authoritative + mcp_overhead + process_hygiene + vendor_pin + sota_freshness_sweep
- Hook telemetry contract: `agent_id` + `agent_type` propagation per SDK `_SubagentContextMixin`
- PostToolUse `Bash(git commit *)` async 15s + SessionEnd async 30s wiring

### Pillar 10 — 5-backend persist + STOP gate
- mcp-memory + graphiti episode + tmp/wave artifact + MEMORY.md L2 + provenance row
- ≥4/5 PASS = STOP-eligible
- Verify at session-resume per `sessionstart-preload-discipline.md §The contract step 4`

### Pillar 11 — Auto-compact 4-layer (SOFT pre-emptive)
- Pre-emptive `/compact <hint>` at 60-70% utilization
- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` ENV (i)
- PreCompact hook stack: intelligent-compact + ECC pre-compact + context-mode + native compact_hint.json
- Thariq named-T2: "model at its least intelligent point when compacting" → steered /compact <hint> beats blind autocompact

### Pillar 12 — Skill orchestration 4-skill meta-stack
- using-superpowers (1% rule)
- using-agent-skills (Addy discovery governance)
- skill-comply (post-invocation verification)
- skill-creator (Anthropic OFFICIAL authoring loop)
- Anthropic CC native description-match auto-discovery

---

## DAILY SESSION CHECKLIST

| Phase | Probe |
|---|---|
| **Session-start** | `claude --version` / `claude doctor` / `claude mcp list` / `claude plugin list` / `/context` |
| **Pre-design-edit** | T1 fire (codex pre-edit consult via codex-plugin-cc hook) |
| **Pre-commit** | T2 fire (codex exec review --uncommitted) |
| **Post-commit** | T3 audit auto-fires |
| **Pre-stop** | T6 deep-review + T7 ask-without-act |
| **Iter-close** | 5-backend persist: tmp/wave artifact + MEMORY.md L2 + provenance row + mcp-memory + graphiti |
| **Pre-fan-out** | 8-invariant pre-flight per advanced-agent-team-standing-directive |

---

## GAP ANALYSIS vs Z:\claude-sota-pure CURRENT STATE (per Agent B inventory 2026-05-15)

**Existing in pure-runtime cache** (per existing 11 plugins): claude-plugins-official marketplace with 20+ plugins (agent-sdk-dev ✓ frontend-design ✓ claude-md-management / code-modernization / code-review / code-simplifier / commit-commands / cwc-makers / example-plugin / explanatory-output-style / feature-dev / gopls-lsp / hookify / clangd-lsp / csharp-lsp).

**Gaps to close** (CR-12 upstream-install-priority ladder):
1. **GAP: ralph-loop** NOT in cache → `/plugin install ralph-loop@claude-plugins-official`
2. **GAP: cwc native hooks** NOT installed → `cp Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/hooks/*.sh Z:/claude-sota-pure/.claude/hooks/scripts/`
3. **GAP: 8 missing marketplaces** → add each per Layer 4 commands above
4. **GAP: memory stack L1+L2+L3** → install per Layer 10
5. **GAP: cross-model gate hooks** → install codex-plugin-cc

**ALREADY-INSTALLED-VERIFY-AXIS-1** (per Agent A 11/11 plugins PASS at W205): per `tmp/wave205-3org-axis1-verification-2026-05-15.md`.

---

## SOTA INSIGHT TIER (4 key findings)

1. **anthropics/cwc-long-running-agents IS the SOTA destination** (Anthropic org #1 anchor). Pure runtime rules-discipline-FREE design is INTENTIONAL — the SOTA target, not a gap.
2. **6-org Axis-1 firm convergence** (Anthropic + OpenAI + obra + Addy + getzep + doobidoo) — install matrix is ≥3-distinct-orgs PASS across every layer.
3. **Q2 2026 feature wave** (`claude agents` CLI + `/goal` + forked subagents + hook `args:string[]` + PreCompact-can-block + `type:mcp_tool` hooks + auto-mode default) shifts the runtime model — install matrix targets 2.1.142+ baseline.
4. **Saturation diagnostic confirmed**: 4-cohort fan-out covers ~50% of high-star recent ecosystem; remaining 50% predominantly META-HARNESS competing-framework OR Axis-3 90d-fail OR Probe 7.a demand-absence.

---

## CITE TRAIL SUMMARY

- **TIER-1-DIRECT primary sources** (Anthropic OFFICIAL): `code.claude.com/docs/en/{sub-agents,settings,hooks,plugins,skills,commands,memory,cli-reference,env-vars,workflows}` + CHANGELOG 2.1.59→2.1.142 (47 entries) + `anthropic-cookbook @ HEAD 33424c3e` + `claude-agent-sdk-python @ HEAD b512f256` + `cwc-long-running-agents @ HEAD ad107a97` + 4 marketplace.json contents
- **TIER-1-DIRECT named-T2 authors**: obra/Jesse Vincent + Addy Osmani/Google Chrome + Karpathy + Matt Pocock + Boris Cherny (CCBP) + Daniel Chalef (graphiti) + Henry Krupp (mcp-memory) + Shan (CCBP)
- **TIER-1-DIRECT 3rd-party orgs**: OpenAI (codex) + getzep + doobidoo + wshobson + Vercel-Labs + ComposioHQ + Anthropic-CC team
- **TIER-2 sister-rule integration**: 30+ `.claude/rules/*.md` from claude-sota-installed cite-import-AMBER per CR-12 TERTIARY path (sibling-novel discipline with no upstream parity)
- **TIER-3-LOCAL operator-derived**: W205 5/5 STOP gate satisfied + W206 3-agent fan-out

**Convergence-gate Axis-1 verified**: ≥3-distinct-orgs PASS at every layer (Layer 0-14). Axis-2 ≥2-named-T2-PASS per-layer with dated artifacts. Axis-3 ≥3-month stability OR STRONG-PROVENANCE-EXPRESS predicate satisfied.

---

**END W206 comprehensive SOTA checklist.**

Total layers covered: 14 install layers + 12 workflow pillars + daily checklist + gap analysis vs existing 11 plugins.
Convergence consensus: 6 distinct orgs Axis-1 PASS (Anthropic + OpenAI + obra + Addy/Chrome + getzep + doobidoo).
SOTA convergence: 100% CR-8 ADAPTED-FROM-SOTA conformance per Agent E W205 layer matrix (foundation for this fresh checklist).

[W206 fresh-research checklist for Z:\claude-sota-pure — zero-bias 3-agent fan-out + Mia pre-apply pass]
