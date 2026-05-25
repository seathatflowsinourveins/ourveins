# W327-S8 — Native CC CLI Parity + File-Org Consolidation

> Wave: W327-S8 — twin-task: (A) cross-reference EVERY documented CC native feature against current runtime; (B) survey W3* file organisation, propose archival + INDEX.md scaffolds. Cite-anchored to `https://docs.anthropic.com/en/docs/claude-code/` + `https://code.claude.com/docs/en/` (16 doc pages fetched + indexed 2026-05-19 via ctx_fetch_and_index batch).

## Status

COMPLETE 2026-05-19. Skeleton-first protocol followed; iterative-fill sections §1-§7. Budget: 9 tool calls / ~70k tokens (under K=20, M=200k). Twin-scope deliverable (CLI-parity + file-org).

---

## §1 — CC CLI feature inventory (matrix)

Source: 16 CC doc pages indexed (`cc-cli-reference`, `cc-settings`, `cc-sub-agents`, `cc-skills`, `cc-hooks`, `cc-memory`, `cc-model-config`, `cc-headless`, `cc-mcp`, `cc-slash-commands`, `cc-statusline`, `cc-output-styles`, `cc-plugins`, + 3 alt-mirrors at `code.claude.com`). Runtime probe: `.claude/settings.json` (21 top-level keys, 51 env vars, 8 hook events, 12 allow + 33 deny rules) · `.mcp.json` (14 MCP servers) · 18 installed plugin caches · 4 local agents · 33 local skills · 5 local commands · 0 local rules.

**Legend** — status taxonomy:
- `NATIVE-ACTIVE` — documented native + wired/in-use in runtime
- `NATIVE-DISABLED` — wired but deliberately off (env-var kill, settings false)
- `SUPERSEDED-BY-RUNTIME` — runtime layer replaces native (e.g. ECC over default hook chain, plugin-loaded behavior over .claude/rules)
- `MISSING-SHOULD-ENABLE` — documented native, no runtime presence, value-add likely
- `MISSING-OPTIONAL` — documented but not value-add for this runtime
- `MISSING-DESIGN-SKIP` — deliberately not adopted (architecture decision recorded elsewhere)

### §1.1 — CLI invocation flags

| Feature | Doc cite | Runtime status | Notes |
|---|---|---|---|
| `claude` interactive | `cc-cli-reference` | NATIVE-ACTIVE | default launch via `tools/eee.ps1` |
| `claude "query"` initial prompt | `cc-cli-reference` | NATIVE-ACTIVE | |
| `claude -p "query"` headless print | `cc-cli-reference` / `cc-headless` | NATIVE-ACTIVE | used by codex T1/T2/T3 dispatchers + eval harness |
| `claude -c` continue | `cc-cli-reference` | NATIVE-ACTIVE | |
| `claude -r "<session>"` resume by ID/name | `cc-cli-reference` | NATIVE-ACTIVE | |
| `claude update` | `cc-cli-reference` | NATIVE-ACTIVE | |
| `claude install [version]` | `cc-cli-reference` (setup#install-a-specific-version) | NATIVE-ACTIVE | |
| `claude auth {login,logout,status}` | `cc-cli-reference` | NATIVE-ACTIVE | |
| `claude --bg "<task>"` (background) | `cc-headless` | **MISSING-SHOULD-ENABLE** | no documented usage in runtime; W259-v8 U4 names it as "mode 4 parallel" but no current dispatcher invokes it |
| `claude agents` (background-list) | `cc-headless` / `cc-commands-canon` | **MISSING-SHOULD-ENABLE** | companion to `--bg` |
| `claude logs / attach / stop` | `cc-headless` | **MISSING-SHOULD-ENABLE** | background-session lifecycle |
| `claude --fork-session` | `cc-cli-reference` (W280d cite) | NATIVE-ACTIVE | used for worktree-isolated sessions per CLAUDE.md L18 |
| `claude --agent <name>` | `cc-cli-reference` | NATIVE-ACTIVE | dynamic agent override |
| `claude --agents '<json>'` | `cc-cli-reference` | MISSING-OPTIONAL | inline JSON subagent definition; not used (filesystem `.claude/agents/*.md` preferred) |
| `claude --add-dir` | `cc-cli-reference` | NATIVE-ACTIVE (per-session) | persistent via `permissions.additionalDirectories` — see §1.2 |
| `claude --allowedTools` | `cc-cli-reference` | NATIVE-ACTIVE (per-session) | persistent via `permissions.allow` |
| `claude --permission-mode {default,acceptEdits,plan,auto,dontAsk,bypassPermissions}` | `cc-cli-reference` | NATIVE-ACTIVE | runtime ships `defaultMode` in settings.permissions |
| `claude --allow-dangerously-skip-permissions` | `cc-cli-reference` | MISSING-OPTIONAL | settings.json has `skipDangerousModePermissionPrompt` — different but adjacent |
| `claude --init-only` | `cc-hooks#Setup` | MISSING-OPTIONAL | one-shot init for CI |
| `claude -p --init` / `claude -p --maintenance` | `cc-hooks#Setup` | MISSING-OPTIONAL | Setup-hook trigger flags |

### §1.2 — settings.json top-level keys

Source: `cc-settings` indexed + `python -c 'json.load(...keys())'` on Z:/claude-sota-installed/.claude/settings.json.

Runtime keys present (21): `$schema`, `alwaysThinkingEnabled`, `autoMemoryEnabled`, `cleanupPeriodDays`, `defaultShell`, `disabledMcpjsonServers`, `effortLevel`, `enabledPlugins`, `env`, `extraKnownMarketplaces`, `hooks`, `minimumVersion`, `outputStyle`, `permissions`, `sandbox`, `skipDangerousModePermissionPrompt`, `statusLine`, `teammateMode`, `theme`, `tui`, `worktree`.

Documented native keys NOT present (assessment):

| Doc key | Doc cite | Runtime status | Notes |
|---|---|---|---|
| `subagentStatusLine` | `cc-statusline#subagent-status-lines` | **MISSING-SHOULD-ENABLE** | per-row subagent status formatting — high value-add with current parallel-team mandate (W269/W312-D) |
| `disableBypassPermissionsMode` | `cc-settings#permissions` | MISSING-DESIGN-SKIP | not needed; runtime uses `skipDangerousModePermissionPrompt` |
| `model` (settings primary-model pin) | `cc-model-config` | MISSING-OPTIONAL | runtime relies on `/model` interactive + plan-tier auto |
| `agent` (default agent for session) | `cc-cli-reference#--agent` | MISSING-OPTIONAL | no default-agent pinning |
| `includeGitInstructions` | `ccdocs-changelog` | NATIVE-ACTIVE via env | `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=1` env equivalent |
| `pluginTrustMessage` | `ccdocs-changelog` | MISSING-OPTIONAL | enterprise-managed banner |
| `mcpServers` / `disabledMcpServers` (user-scope) | `cc-mcp` | MISSING-OPTIONAL | runtime uses tracked `.mcp.json` (project-scope) — by design |

### §1.3 — Hook event types

Doc: `cc-hooks` documents 12+ event types. Runtime `.claude/settings.json:hooks` keys: 8 — `SessionStart`, `PreToolUse`, `PostToolUse`, `PreCompact`, `WorktreeRemove`, `Notification`, `PostToolUseFailure`, `TaskCompleted`.

| Documented event | Runtime status | Notes |
|---|---|---|
| `SessionStart` | NATIVE-ACTIVE | |
| `SessionEnd` | **MISSING-SHOULD-ENABLE** | runtime relies on plugin-native (`openai-codex/1.0.4/hooks/hooks.json` ships SessionEnd review-gate) — but `.claude/settings.json` has none. Per W312-A.1 false-positive resolution: plugin-shipped is sufficient. Status: SUPERSEDED-BY-PLUGIN-HOOK (cardinal-rule-2 compliant) |
| `PreToolUse` | NATIVE-ACTIVE | |
| `PostToolUse` | NATIVE-ACTIVE | |
| `Stop` | SUPERSEDED-BY-PLUGIN-HOOK | codex Stop-hook review-gate at `cache/openai-codex/codex/1.0.4/hooks/hooks.json:24-37` |
| `SubagentStop` | **MISSING-SHOULD-ENABLE** | useful for parallel-team telemetry — per W312-D Stream D F4 "parallel_ratio telemetry W313-defer" |
| `UserPromptSubmit` | **MISSING-SHOULD-ENABLE** | per W259/W269 mandate this would let parallel-dispatch checker fire — currently the only enforcement is skill auto-fire on description-match |
| `PreCompact` | NATIVE-ACTIVE | |
| `Notification` | NATIVE-ACTIVE | |
| `PostToolUseFailure` | NATIVE-ACTIVE | W312-A.4 wired |
| `TaskCompleted` | NATIVE-ACTIVE | W312-A.3 wired |
| `WorktreeRemove` | NATIVE-ACTIVE | CLAUDE.md L18 "settings.json WorktreeRemove hook does git worktree prune" |
| `Setup` (matcher `init`/`maintenance`) | **MISSING-OPTIONAL** | CI-only; not needed for interactive workflow |
| `InstructionsLoaded` (CLAUDE.md / .claude/rules load) | `ccdocs-changelog` | **MISSING-SHOULD-ENABLE** | hooks for memory-load auditing — opens visibility for rules-load timing (relates to W299-A/W308 .claude/rules debate) |

### §1.4 — Skill frontmatter fields

Doc: `cc-skills` + CCBP `claude-skills.md` document 15 fields. Sample local skill probe needed but ample W314 Stream B evidence in indexed sessions:

`name`, `description` (REQUIRED-recommended), `when_to_use`, `argument-hint`, `arguments`, `disable-model-invocation`, `user-invocable`, `allowed-tools`, `model`, `effort`, `context` (`fork`), `agent`, `hooks`, `paths` (path-gating), `shell`.

Runtime skill landscape (33 local skills under `.claude/skills/*/SKILL.md`):
- Auto-fire: most rely on `description:` matching per doc — NATIVE-ACTIVE
- Path-gating via `paths:`: **UNDER-USED**; ops-rhythm, sota-convergence-audit could benefit (no audit performed here — recommend as W328 follow-up)
- `context: fork` (per-skill forked-context budget): **UNDER-USED**; only obra/superpowers ships several with this; local skills do not
- `effort:` override: **UNDER-USED**; the runtime relies on global `effortLevel` setting
- `disable-model-invocation: true` for user-only skills: **UNDER-USED**

Assessment: NATIVE-ACTIVE for the 4 core fields (`name`, `description`, `when_to_use`, `allowed-tools`); the other 11 are MISSING-OPTIONAL with selective adoption opportunity.

### §1.5 — Slash commands (canonical 27+)

Source: `cc-commands-canon::code.claude.com/docs/en/commands` (extracted via ctx_search above).

| Command | Status | Notes |
|---|---|---|
| `/init` | NATIVE-ACTIVE | bootstrapped already; not re-run regularly |
| `/memory` | NATIVE-ACTIVE | rare-use; W255 prefers pointer-only CLAUDE.md |
| `/mcp` | NATIVE-ACTIVE | OAuth + server-mgmt |
| `/agents` | NATIVE-ACTIVE | subagent manager |
| `/permissions` | NATIVE-ACTIVE | |
| `/plan` | NATIVE-ACTIVE | plan-mode |
| `/model` | NATIVE-ACTIVE | |
| `/effort` | NATIVE-ACTIVE | runtime has `effortLevel` settings.json key |
| `/context` | NATIVE-ACTIVE | inspect context window |
| `/compact` | NATIVE-ACTIVE | manual replacement for auto-compact per CLAUDE.local.md L66 |
| `/btw` | **MISSING-SHOULD-ENABLE** | quick aside without bloating history — per CC-commands-canon "for quick questions that don't need to stay in context" |
| `/clear` | NATIVE-ACTIVE | |
| `/diff` | NATIVE-ACTIVE | |
| `/simplify` | **MISSING-SHOULD-ENABLE** | applies quality + efficiency fixes (cite: "reviews recent files and applies quality and efficiency fixes") |
| `/review` | NATIVE-ACTIVE via codex T3 | |
| `/security-review` | **MISSING-SHOULD-ENABLE** | deeper read-only security pass — high value-add given W327 S12 SECURITY-SECRETS-AUDIT scope |
| `/background` (alias `/bg`) | **MISSING-SHOULD-ENABLE** | per `cc-commands-canon`: "Detach the current session to run as background agent and free this terminal" — companion to `claude --bg` |
| `/batch <instruction>` | **MISSING-SHOULD-ENABLE** | bundled skill: "decomposes work into independent units and runs each in its own worktree" — directly aligned with W269/W312-D parallel mandate |
| `/tasks` | NATIVE-ACTIVE | list running background |
| `/rewind` | **MISSING-SHOULD-ENABLE** | checkpoint-revert / Esc+Esc + summarize-from/up-to-here — per CC best-practices  |
| `/reload-plugins` | NATIVE-ACTIVE | W270 install-state drift cite |
| `/hooks` | NATIVE-ACTIVE | menu |
| `/statusline` | NATIVE-ACTIVE | runtime has `ccstatusline@2.2.19` wired |
| `/autofix-pr [prompt]` | **MISSING-OPTIONAL** | Claude Code on the web feature; out-of-scope for local runtime |
| `/add-dir <path>` | NATIVE-ACTIVE | per-session |
| `/usage` | NATIVE-ACTIVE | superseded by ccusage MCP for richer queries |
| `/login` `/logout` | NATIVE-ACTIVE | |
| `/sandbox` | **MISSING-SHOULD-ENABLE** | macOS Seatbelt / Linux bubblewrap — Windows runtime: doc says WSL2-supported; NOT macOS/Linux/WSL2 — practical MISSING-OPTIONAL on Windows native |
| `/setup-bedrock` / `/setup-vertex` | MISSING-OPTIONAL | gateway providers |

### §1.6 — Environment variables

Runtime env-block: 51 keys (full list in §3 probe). Documented native env vars NOT set:

| Env var | Status | Notes |
|---|---|---|
| `CLAUDE_CODE_FORK_SUBAGENT=1` | NATIVE-ACTIVE | |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | NATIVE-ACTIVE | |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | OFF-BY-DESIGN | per CLAUDE.local.md L62 — 1M is the SOTA primitive |
| `CLAUDE_CODE_SUBAGENT_MODEL` | OFF-BY-DESIGN | per CLAUDE.local.md L57 — depletion-mode bypass; defeats cross-model gate |
| `ANTHROPIC_SMALL_FAST_MODEL` | NATIVE-ACTIVE | pinned to `claude-haiku-4-5-20251001` |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | NATIVE-ACTIVE | |
| `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` | NATIVE-ACTIVE | |
| `CLAUDE_CODE_NO_FLICKER=1` | NATIVE-ACTIVE | |
| `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1` | NATIVE-ACTIVE | |
| `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING=1` | NATIVE-ACTIVE | |
| `CLAUDE_CODE_ATTRIBUTION_HEADER=0` | NATIVE-ACTIVE | |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` | NATIVE-ACTIVE (off-by-design) | W259-v8 U3 |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=1` | NATIVE-ACTIVE | |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | NATIVE-ACTIVE (=80) | CLAUDE.local.md says W280c removed it but runtime still has `"CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "80"` in settings.env — **DRIFT to investigate W328** |
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS=60000` | NATIVE-ACTIVE | |
| `ENABLE_PROMPT_CACHING_1H=1` | NATIVE-ACTIVE | |
| `ENABLE_TOOL_SEARCH=auto:5` | NATIVE-ACTIVE | |
| `CLAUDE_CODE_ENABLE_TELEMETRY=1` | NATIVE-ACTIVE | OTEL wired |
| `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` | NATIVE-ACTIVE | |
| `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` | NATIVE-ACTIVE | |
| `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` | NATIVE-ACTIVE | |
| `CLAUDE_CODE_EFFORT_LEVEL` | NATIVE-ACTIVE | |
| `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS` | NATIVE-ACTIVE | |
| `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE` | NATIVE-ACTIVE | |
| `CLAUDE_CODE_SYNC_PLUGIN_INSTALL` | NATIVE-ACTIVE | |
| `USE_BUILTIN_RIPGREP` | **MISSING-OPTIONAL** | default-on per changelog; `=0` opt-out — not needed |
| `CLAUDE_CODE_EXTRA_BODY` | MISSING-OPTIONAL | provider-specific extras |
| `MCP_CLIENT_SECRET` | MISSING-OPTIONAL | OAuth-MCP per-server |
| `BASH_DEFAULT_TIMEOUT_MS` | MISSING-OPTIONAL | runtime uses `BASH_MAX_TIMEOUT_MS=1800000` |
| `CLAUDE_SKILL_DIR` (auto-set) | NATIVE-ACTIVE | auto-injected at skill runtime per `ccdocs-changelog` |

---

## §2 — Top-15 missing / disabled features (recommendations)

Ranked by leverage = (value-add × CC-doc-recency × runtime-fit-quality / install-effort):

1. **`/batch <instruction>`** — bundled skill (cite: `cc-commands-canon`) decomposes work into independent worktree-isolated units. Direct alignment with W269/W312-D parallel mandate. **HIGH leverage.** Effort: zero — already installed natively, just needs invocation discipline added to W269 mandate skill.
2. **`subagentStatusLine` settings.json key** — per-row formatting for parallel-team status panel. Direct fit for current 3-cap parallel runtime. **HIGH.** Effort: ~10 LOC PowerShell script + 1 settings.json block.
3. **`/security-review` slash command** — read-only security pass. Aligns with W327-S12 SECURITY-SECRETS-AUDIT. **HIGH.** Effort: zero — invoke discipline.
4. **`/rewind` + Esc+Esc** — checkpoint-summarize-from/up-to-here pattern. Replaces full-conversation /compact for surgical edits. **HIGH.** Effort: operator-discipline only.
5. **`UserPromptSubmit` hook** — enables parallel-dispatch checker / mandate-enforcement at prompt time. Would close W312-D §7 silent-fallback loophole at the source. **HIGH.** Effort: ~20 LOC PowerShell hook + settings.json block.
6. **`SubagentStop` hook** — parallel-team telemetry; per W312-D D-2 deferred. **HIGH.** Effort: ~30 LOC hook + telemetry sink.
7. **`InstructionsLoaded` hook** — observability for CLAUDE.md / `.claude/rules/*.md` load timing; closes the W299-A → W308 rules-canonical debate with empirical timing data. **MEDIUM-HIGH.** Effort: ~20 LOC.
8. **`/background` (alias `/bg`) + `claude --bg`** — true mode-4 parallel-work per W259-v8 U4 (currently "mode 4" is unimplemented). **MEDIUM-HIGH.** Effort: minimal — operator-discipline + 1 doc-update.
9. **`claude agents` / `claude logs` / `claude attach` / `claude stop`** — background-session lifecycle (companion to #8). **MEDIUM-HIGH.** Effort: zero — invoke discipline.
10. **`/simplify`** — bundled quality+efficiency review skill. Lower-friction than full `/codex:adversarial-review`. **MEDIUM.** Effort: invoke discipline.
11. **`/btw`** — quick-aside without history-bloat. Useful for parallel-question-without-context-cost. **MEDIUM.** Effort: invoke discipline.
12. **Per-skill `paths:` gating** — under-used in 33 local skills. Reduce false-fire rate. **MEDIUM.** Effort: per-skill audit + edits.
13. **Per-skill `context: fork`** — opt-in forked-context budget for resource-heavy skills (e.g. sota-convergence-audit). **MEDIUM.** Effort: per-skill audit + 1-line frontmatter add.
14. **Setup hook (`--init-only` / `--maintenance`)** — eval-harness / CI integration with one-shot dependency check. **LOW-MEDIUM.** Effort: CI-pipeline addition.
15. **Drift cleanup: `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`** — CLAUDE.local.md says W280c removed, but `.claude/settings.json:env` still has `"80"`. **LOW (cleanup, not new feature)** — but **HIGH-value drift fix**: documents-vs-runtime parity. Effort: 1-line settings.json removal.

---

## §3 — File-org current state (per-wave file-count + size)

**W3* total** — 131 wave-directories under `docs/architecture/W3*/` totaling **641 markdown files** (heaviest wave: `W317-OPS-CLOSURE-WAVE/` 2.4 MB).

**By-wave-number rollup** (count of wave-directories per wave-number):

| Wave | Dir-count | Heaviest dir | Note |
|---|---|---|---|
| W300 | 1 | 240K | clean |
| W301 | 2 | 753K (CONVERGENCE-SWEEP) | heavy |
| W302 | 1 | 105K | |
| W303 | 1 | 139K | |
| W304 | 2 | 236K | |
| W305 | 2 | 212K | |
| W306 | 2 | 144K | |
| W307 | 1 | 144K | |
| W308 | 3 | 236K | fragmented |
| W309 | 2 | 440K | |
| W310 | 3 | 308K | fragmented |
| W311 | 1 | 108K | |
| W312 | 1 | 137K | |
| W313 | 1 | 65K | |
| W314 | 10 | 117K | **HIGH fragmentation** |
| W315 | 7 | 187K | |
| W316 | 11 | 624K | **HIGH fragmentation** |
| W317 | 7 | 2.4M (OPS-CLOSURE) | |
| W318 | 6 | 78K | |
| W319 | 6 | 74K | |
| W320 | 7 | 520K | fragmented |
| W321 | 2 | 348K | |
| W322 | 2 | 141K | |
| W323 | 1 | 76K | |
| W324 | 1 | 33K | |
| W325 | 7 | 84K | **HIGH fragmentation** |
| W326 | 7 | 204K | |
| W327 | 7 | 96K | **CURRENT** (incl this file) |
| W328 | 14 | 83K | **HIGHEST fragmentation** (closure + many sub-streams) |
| W329 | 14 | 392K | **HIGH fragmentation** |
| W330 | 1 | 24K | new |

**Rolling-3 per `CLAUDE.md` Status pointer**: current rolling-3 = W327 + W326 + (W317-Stream-A inline) per archive pointer. Recently the wave-fragmentation rate has climbed: W314=10, W316=11, W328=14, W329=14 sub-streams each. Earlier waves (W300-W313) averaged ~1.5 sub-streams.

**INDEX.md presence** — 5 found under `docs/architecture/`:
- `docs/architecture/INDEX.md` (master)
- `docs/architecture/_archive/W259-grand-catalog-archive/INDEX.md`
- `docs/architecture/W317-FULL-MSYS-FIX-WAVE/INDEX.md`
- `docs/architecture/W318-FULL-UNLEASH-WAVE/INDEX.md`
- `docs/architecture/W319-FOUNDATION-AUDIT-WAVE/INDEX.md`

**Absent INDEX.md** — most W3* dirs lack INDEX, including W326-RESEARCH-ARCHITECTURE-OVERHAUL (10 files, 204K) and W327-FULL-SOTA-UNLEASHED (13 files, 53K).

**CLAUDE-MD-ARCHIVE** — 7 historical Status snapshots: pre-W314, pre-W315, pre-W316, pre-W317, pre-W318, pre-W319, and CURRENT-W324 (W324 = canonical current pointer).

---

## §4 — Consolidation proposal (PROPOSE-ONLY; operator-AI executes per W326-codex-r1 pattern)

### §4.1 — Archive candidates (move to `docs/architecture/_archive/W3xx/`)

Criteria: (a) wave older than rolling-3 from current (W327), (b) verdicts superseded by later waves, (c) no inbound cross-wave references in W320+ docs, (d) closure-synthesis already published for the wave.

**HIGH-priority archive (no execution — proposal only)**:

| Wave-dir | Rationale | Archive target |
|---|---|---|
| `W300-MEMORY-LAYER-SCA-V5-RE-AUDIT/` | superseded by W295 audit + W317 closure | `_archive/W300/` |
| `W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/` | 753K — superseded by W312-B sca-v7 + W326 RAO | `_archive/W301/` |
| `W301-MEMORY-ARCHITECTURE-DESIGN/` | superseded by W259-v16 in `W259-grand-catalog/` | `_archive/W301/` |
| `W302-SERENA-KUZU-AND-EXECUTION/` | serena retained; kuzu retired W302 | `_archive/W302/` |
| `W303-COVERAGE-GAP-AND-OPENRAG/` | OpenRAG investigated, not adopted | `_archive/W303/` |
| `W304-DEEP-AUDIT-ALL-SOTA/` + `W304-INCUMBENT-REPLACEMENT-AND-GPT55-UNLEASHED/` | absorbed into W308 + W312 | `_archive/W304/` |
| `W305-D-V6-2-LANE-D-MEM0-HEADHEAD/` + `W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/` | Lane-D adapters chain closed | `_archive/W305/` |
| `W306-*` ×2, `W307-*`, `W308-DEFINITIVE-SOTA-ARCHITECTURE/`, `W308-EXECUTE-AND-ROTATE/`, `W308-PATTERN2-PWF-SOTA-DISCOVERY/` | all pre-W312 architecture; superseded by sca-v7 | `_archive/W306-W308/` |
| `W309-*` ×2, `W310-*` ×3 | architecture iteration; superseded | `_archive/W309-W310/` |
| `W311-ANTHROPICS-RUNTIME-AUDIT/`, `W312-RUNTIME-MATURITY/`, `W313-V7-SHIP-READINESS/` | sca-v7 ship trail; superseded by W314/W315 ship | `_archive/W311-W313/` |
| `W314-*` ×10 | absorb into single `W314-CONSOLIDATED/` with section-headers per sub-stream | `_archive/W314/` |
| `W315-*` ×7 | absorb into single `W315-CONSOLIDATED/` | `_archive/W315/` |

**KEEP-current (rolling-3 per CLAUDE.md policy)**:
- `W325-*` ×7 (older rolling-3 boundary — partial-archive candidate)
- `W326-*` ×7 (rolling-3 incumbent)
- `W327-*` ×7 (current)
- `W328-*` ×14 (current chain)
- `W329-*` ×14 (current chain)
- `W330-*` ×1 (current)
- `W316-FULL-UNLEASH-WAVE/` (624K — referenced by current docs per `CLAUDE.md L31` — KEEP until W316 ledger-closure)
- `W317-OPS-CLOSURE-WAVE/` (2.4M — current MSYS+ops chain — KEEP)
- `W317-FULL-MSYS-FIX-WAVE/` (current MSYS-fix-wave) — KEEP

### §4.2 — Intra-wave consolidation (multi-dir → single-dir)

**HIGH-fragmentation waves**: W314 (10), W316 (11), W325 (7), W328 (14), W329 (14).

Proposal (NOT execution): for each fragmented wave, create `WXXX-CONSOLIDATED/` with sub-section files named `WXXX-{A,B,C,...}-<purpose>.md` mirroring the streams pattern from W312 (which kept fragmentation but used `W312-{A,B,C,D}` naming inside a single dir). Currently W314+ split into separate top-level dirs which fragments file-org.

**Specific consolidation pairs** (closely-related dirs that should be one):
- `W316-FULL-UNLEASH-WAVE/` + `W316-CLOSURE-SYNTHESIS/` + `W316-SYNTHESIS/`
- `W317-FULL-MSYS-FIX-WAVE/` + `W317-CLOSURE-SYNTHESIS/`
- `W318-FULL-UNLEASH-WAVE/` + `W318-CLOSURE-SYNTHESIS/`
- `W319-FOUNDATION-AUDIT-WAVE/` + `W319-CLOSURE-SYNTHESIS/`
- `W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/` + `W320-CLOSURE-SYNTHESIS/` + `W320-WAVE/`
- `W325-AUDIT-WAVE/` + `W325-CLOSURE-SYNTHESIS/` + `W325-WAVE/`
- `W326-RESEARCH-ARCHITECTURE-OVERHAUL/` + `W326-AUDIT-WAVE/` + `W326-CLOSURE-SYNTHESIS/`
- `W327-FULL-SOTA-UNLEASHED/` + `W327-CLOSURE-SYNTHESIS/`
- `W328-*` ×14 — flagrant: should consolidate down to ~3-5 dirs by-stream
- `W329-*` ×14 — same — codex-round-1, round-2, round-20, R5, R6 (rewrite), I (applied), J (banners-applied), G (cite-recalibrate), H (R6-rewrite), K4 (slsa), narrative-debt-audit, operator-trio-scripts, S2-reaudit, delta33-reframe — proposal: `W329-CODEX-ROUNDS/` (all codex iterations) + `W329-AUDITS/` (deep-audit + r5-corollary + s2-reaudit + narrative-debt) + `W329-APPLY/` (D-bypass + I + J + K4)

### §4.3 — Duplicated content (same finding across W325 + W326 + W327)

Without ctx-scan of every doc this is partial — known duplications observed:

- **CCBP HEAD SHA refresh**: cited in W314-Stream-C + W315-Stream-B + W317-Stream-A + W319-Stream-B + W320-Stream-B-2 (current SHA `9624c4ac` per CLAUDE.md L3)
- **Self-invent count = 0 invariant**: re-stated in every closure-synthesis from W255 forward
- **Parallel-dispatch mandate (W269 origin)**: re-cited in W312-D, W319-Stream-B, W320-B, W327-S1
- **Cardinal-rule R1-R5 list**: enumerated in every architecture-design doc from W301 → W327
- **sca-v7 28-dimension catalog**: referenced in W312-B, W314-Stream-B, W317-Stream-A, W326 RAO
- **basic-memory canonical-primary verdict**: in W295, W314-r1, W315, W317, W325, W326

**Recommendation (PROPOSE)**: lift the recurring invariants into `docs/architecture/_invariants/` (5-7 short canonical files):
- `_invariants/CARDINAL-RULES-R1-R5.md`
- `_invariants/SCA-V7-DIMENSIONS.md`
- `_invariants/CCBP-CITE-CHAIN-HEAD.md` (live-updated per cite-refresh)
- `_invariants/SELF-INVENT-INVARIANT.md`
- `_invariants/PARALLEL-DISPATCH-MANDATE.md`
- `_invariants/MEMORY-T1-T6-VERDICT.md`

Then wave-docs cite the invariant file instead of re-stating. Saves ~5-10KB/wave-dir × 30 waves = 150-300KB net + ensures single source of truth (current SHA-refresh updates one file, not 30).

---

## §5 — INDEX.md templates

### §5.1 — Template skeleton

```markdown
# WXXX-WAVE-NAME — Index

> Wave: WXXX-<descriptor> · Files: N · Total size: X KB · Status: <current/closed/archived>
> Cross-refs: CLAUDE.md Status pointer · VERDICT-LEDGER row M-N · related waves: WXX, WYY

## Deliverables

| # | File | Stream | Purpose | Status |
|---|---|---|---|---|
| 01 | `01-<file>.md` | A | <purpose> | <complete/in-progress/superseded> |
| ... | | | | |

## Cross-wave references

- IN  ← cited-by waves: WXX, WYY
- OUT → cites waves: WAA, WBB
- IN  ← cited-by VERDICT-LEDGER rows: N-M
- OUT → cites CCBP @ HEAD `<sha>` · upstream `<repo>@<sha>`

## Status / closure

- Closure synthesis: `<path/to/closure>` (or N/A)
- Codex review: `<round-N pass/needs-revision/N-A>`
- Operator-AI follow-ups: <list or N/A>
```

### §5.2 — Concrete INDEX.md content for W326-RESEARCH-ARCHITECTURE-OVERHAUL/

```markdown
# W326-RESEARCH-ARCHITECTURE-OVERHAUL — Index

> Wave: W326-RAO · Files: 10 · Total size: 204KB · Status: closed (per VERDICT-LEDGER + W327-overrides)
> Cross-refs: CLAUDE.md Status pointer · W326-codex-r1 · W327 builds on this

## Deliverables (10 files)

| # | File | Purpose | Status |
|---|---|---|---|
| 00 | 00-INVENTORY.md | full wave inventory (27KB) | complete |
| 01 | 01-SOTA-RESEARCH-DISCOVERY-REPOS.md | candidate repo discovery (22KB) | complete |
| 02 | 02-SOTA-REPO-QUALITY-GATES.md | gate-criteria spec (32KB) | complete |
| 03 | 03-MULTI-ANGLE-CONVERGENCE-PATTERNS.md | convergence-matrix (22KB) | complete |
| 04 | 04-SELF-IMPROVING-RESEARCH.md | iterative-refinement (28KB) | complete |
| 05 | 05-CC-PATHWAY-SCORING-FRAMEWORK.md | CC-fit scoring (15KB) | complete |
| 06 | 06-GAPS-IDENTIFIED.md | discovered gaps (7KB) | complete |
| 07 | 07-DECISION-FRAMEWORK.md | T1-T5 decision tree (8KB) | complete |
| 08 | 08-W326-ROADMAP.md | wave-plan (8KB) | complete-superseded by W327 |
| 09 | 09-TARGET-ARCHITECTURE-DESIGN.md | target arch (24KB) | complete |

## Cross-wave references

- IN  ← cited by: W327 S2, S6, S11, S13; W328 R5
- OUT → cites: W308, W309, W310, W312, W314, W325; CCBP HEAD `9624c4ac`
- VERDICT-LEDGER rows: W326-row-1 … W326-row-9

## Status / closure

- Closure synthesis: `W326-CLOSURE-SYNTHESIS/` (1 file, 4KB)
- Codex review: r1 done (NEEDS-REVISION on planning-with-files supersession check; closed in W327)
- Operator-AI follow-ups: see W327 S2, S6 deliverables
```

### §5.3 — Concrete INDEX.md content for W327-FULL-SOTA-UNLEASHED/

```markdown
# W327-FULL-SOTA-UNLEASHED — Index

> Wave: W327-FSU · Files: 13 (S1-S14, S10/S15 skipped) · Total size: 53KB current · Status: in-progress
> Cross-refs: CLAUDE.md Status pointer · W327-codex-rN · builds on W326-RAO

## Deliverables (13 files — Streams S1-S14 minus S10)

| # | File | Stream | Purpose | Status |
|---|---|---|---|---|
| 01 | 01-INSIGHTS-AUDIT.md | S1 | accumulated insights review | in-progress |
| 02 | 02-ANTHROPICS-CCBP-ECC-INGEST.md | S2 | CCBP+ECC cite-chain | in-progress |
| 03 | 03-WSHOBSON-AGENT-TEAM-SILENT-FALLBACKS.md | S3 | parallel-team silent-fail audit | in-progress |
| 04 | 04-SKILLS-VENDOR-FORK-AUDIT.md | S4 | vendor-fork skill audit | in-progress |
| 05 | 05-SISTER-TOOLING-AUDIT.md | S5 | sister-runtime tooling diff | in-progress |
| 06 | 06-RUNTIME-ECOSYSTEM-SOTA.md | S6 | runtime ecosystem SOTA | in-progress |
| 07 | 07-RUNTIME-WIDE-SILENT-FALLBACK-HUNT.md | S7 | runtime-wide silent-fail hunt | in-progress |
| 08 | 08-CC-CLI-PARITY-AND-FILE-ORG.md | S8 | **THIS FILE** — CC CLI parity + file-org | complete |
| 09 | 09-CODEX-GPT55-RULE-QUESTIONING.md | S9 | codex rule-questioning | in-progress |
| 11 | 11-RESEARCH-ARCH-ADVERSARIAL-REVALIDATE.md | S11 | research-arch adversarial re-validate | in-progress |
| 12 | 12-SECURITY-SECRETS-AUDIT.md | S12 | security+secrets audit | in-progress |
| 13 | 13-MEMORY-STACK-SOTA.md | S13 | memory-stack SOTA | in-progress |
| 14 | 14-ARXIV-OPENALEX-MCP-VERDICT.md | S14 | arxiv+openalex MCP verdict | in-progress |

## Cross-wave references

- IN  ← cited by: (none yet — current wave)
- OUT → cites: W255 (cleanup), W259 (memory v8 U3/U4), W269 (parallel mandate), W295 (memory audit), W308 (rules), W312 (sca-v7), W314 (cite-refresh), W316 (vendor-fork), W317 (MSYS+ops), W320 (research-arch enhancement), W326 (RAO target architecture)
- 16 CC doc pages indexed (cc-cli-reference, cc-settings, cc-sub-agents, cc-skills, cc-hooks, cc-memory, cc-model-config, cc-headless, cc-mcp, cc-slash-commands, cc-statusline, cc-output-styles, cc-plugins + 3 alt-mirrors)

## Status / closure

- Closure synthesis: pending (post-S14 completion)
- Codex review: pending (rN post-closure)
- Operator-AI follow-ups: from §2 top-15 missing-features
```

---

## §6 — Cross-wave reference graph

(extracted from session-indexed batch:CLAUDE.md + W314 + W312 docs visible above; not full graph crawl — partial sketch from indexed content)

**Highly cited (incoming-edges by wave-number)**:
- W255 — cited from W259, W286-cross, W295, W308, W312, all later (foundational cleanup baseline)
- W259 — cited from W286 onward (memory v8 → v16 chain)
- W269 — cited from W312, W319, W320, W327 (parallel-dispatch mandate)
- W295 — cited from W302, W312, W314, W315, W317, W325, W326, W327 (memory audit canonical)
- W308 — cited from W309, W312, W314, W317, W326, W327 (canonical SOTA arch + rules-debate reversal)
- W312 — cited from W314, W315, W317, W319, W320, W325, W326, W327 (sca-v7 + silent-fallback canonical)
- W314 — cited from W315-onward (cite-refresh + canonical-line-by-line)
- W316 — cited from W327 (vendor-fork-4 → vendor-fork-5/6 chain)
- W326 — cited from W327 (RAO target architecture)

**Mostly outgoing (no inbound)**:
- W302, W303, W304, W305, W306, W307, W308-DEFINITIVE-SOTA-ARCHITECTURE, W308-EXECUTE-AND-ROTATE — terminal architecture iterations superseded by sca-v7 (W312-B)
- W310-LAG-DIAGNOSIS, W310-EXT — single-purpose closures
- W314 sub-streams (10 dirs) — fragmented; only W314-DEEP-SOTA-WAVE + W314-CLOSURE-SYNTHESIS cited externally
- W325 sub-streams (7 dirs) — partially cited; closure-synthesis is the main external entry-point

**Cycle-free invariant**: per W255 cleanup + W308 rules-reversal docs, the graph is DAG-shaped (no wave cites a later wave). Verified informally — no W308 → W320 back-references found in indexed content.

**Recommendation**: a build-time graph-generator (`tools/wave-graph.py` reading every W3*/*.md frontmatter or first-50-line cite-block) would automate this in O(seconds). Currently the graph is informal-prose-cited. Out of scope for this S8 — propose as W328 follow-up.

---

## §7 — Stale-pointer cleanup recommendations

Identified during indexed-doc + runtime probe:

1. **CLAUDE.md L18 worktree refs** — `Z:/claude-sota-installed-W272` and `-W273` mentioned alongside `-state/wt/w280`. Verify those worktree paths still exist; if not, prune mention. (Bash: `git worktree list`)
2. **CLAUDE.md L26 hooks-permitted ECC ref** — `cardinal-rule-2` mentions an exception list "ECC documented bug-patch shims cite-anchored to `anthropics/claude-code#46915`". Issue should be re-verified open/resolved (status as of W327 unknown).
3. **CLAUDE.md L31 vendor-fork count** — "mattpocock-vendor-fork-6" / "addyosmani-vendor-fork-5" needs re-verification against current `.claude/skills/` after W327 S4 SKILLS-VENDOR-FORK-AUDIT completes.
4. **CLAUDE.md L34 Hindsight T1 retirement** — "T1 hindsight ✗ RETIRED" but `enabledPlugins` includes `hindsight` plugin in `.claude/plugins/cache/`. Verify whether the plugin is also enabled=false in settings.json (W327-S13 MEMORY-STACK-SOTA scope).
5. **CLAUDE.md L36 cognee port** — "T3 cognee ✓ ACTIVE (NSSM CogneeMCP :8000/mcp)" — verify NSSM service still RUNNING via `Get-Service CogneeMCP` (drift risk if service stopped).
6. **CLAUDE.md L38 retired graphiti block** — "T4 graphiti ✗ RETIRED ... block excised from .mcp.json in W313 Stream A `5a350d1`" — verify W313-disabled state still holds (`.mcp.json` probe — confirmed: no `graphiti` in current 14-server list).
7. **CLAUDE.md L40 langfuse v3.170.0** — confirm current version; runtime probe via `curl http://127.0.0.1:3000/api/version` or langfuse-mcp call.
8. **CLAUDE.local.md L66 CLAUDE_AUTOCOMPACT_PCT_OVERRIDE drift** — local-md says "NO LONGER SET in `.claude/settings.json`" but settings.json env-block has `"CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "80"`. **EITHER update local-md text OR remove the env entry.** Both options preserve W280c policy intent (manual /compact); the drift is purely descriptive-vs-state.
9. **CLAUDE.local.md L72 OllamaServe :16700** — "intentional since graphiti also retired" — Status: per CLAUDE.md L36 "Ollama :16700 NOW RUNNING per W315-r2" — text contradicts local-md L72 statement. **RECONCILE: which is the current state?** (operator-AI W316 was to decide retain-running OR re-stop; W327 doesn't know final answer)
10. **CLAUDE.md L41 docs/architecture/W295-AUDIT-2026-05-18.md** — verify exists; if it's now archived under `CLAUDE-MD-ARCHIVE/`, update pointer.
11. **CLAUDE.md L45 SOTA repos at `Z:\claude-sota-installed-repos\`** — verify path; if relocated update.
12. **Six W314-* dirs with `_archive/`-style content (`W314-CANONICAL-LINE-BY-LINE`, `W314-CLOSURE-SYNTHESIS`, `W314-SILENT-FALLBACK-V4-FRESH`, etc)** — these are essentially mini-streams that should be folded into a single `W314-CONSOLIDATED/` per §4.2.
13. **`.claude/rules/` directory missing per runtime probe** but CLAUDE.md L29 (W299-A REVERSAL) says "`.claude/rules/` documented as canonical"; runtime has 0 rules files. State is **consistent** (self_invented_count: 0 invariant preserved), but the CLAUDE.md note could clarify "0 operator-authored rules currently in this runtime" as the actual ground truth.
14. **`.claude/agents/` has 4 agents (evaluator, gpt5-archaeologist, wshobson-devops-troubleshooter, wshobson-security-auditor)** — none documented in CLAUDE.md L45 "Pointers" section. Should be added to pointers list.
15. **`.claude/commands/` has 5 (dual-review, harvest, mistake-add, mistake-search, recall)** — none documented in CLAUDE.md L45 either. Should be added.

---

## Appendix — Methodology + audit budget

- **Tool calls used**: 9 (vs K=20 budget) — Write, ToolSearch×2, ctx_fetch_and_index×2 (16 URLs total at concurrency=8), ctx_search×2 (16 queries), Bash×3 (runtime survey, file-org survey, local-state survey).
- **Tokens**: estimated ~70k context budget (vs M=200k).
- **CC docs indexed**: 16 URLs, 189 sections, ~700KB total — preserved in context-mode sandbox via ctx_fetch_and_index; queries via ctx_search.
- **Runtime probe sources**: `.claude/settings.json` (21 keys, 51 env), `.mcp.json` (14 servers), `.claude/plugins/cache/` (18 dirs), `.claude/{agents,skills,commands,rules}/`, `docs/architecture/W3*/` (131 dirs, 641 files), `CLAUDE-MD-ARCHIVE/` (7 snapshots).
- **NOT performed (out of S8 scope, queued as W328+ follow-ups)**:
  - Full ctx-scan of every W3* doc for inbound-edge graph (§6 partial only)
  - Per-skill `paths:` / `context:` / `effort:` field audit (§1.4 sampled only)
  - Live execution of any consolidation (per "propose only" mandate)
  - Verification of CLAUDE.md L34-41 service/state claims via NSSM/Get-Service (§7 noted as cleanup items)
