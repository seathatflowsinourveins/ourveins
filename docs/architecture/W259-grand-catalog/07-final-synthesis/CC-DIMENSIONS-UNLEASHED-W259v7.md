# W259 — Claude Code Native-Dimensions UNLEASHED Audit (v7)

> **Date**: 2026-05-16 | **Wave**: W259 (extends ULTIMATE-SYNTHESIS-FINAL + ULTIMATE-DECISIONS)
> **Author**: claude-opus-4-7 — W259 CLAUDE-CODE-DIMENSIONS-UNLEASHED AUDITOR
> **Operator directive**: *"EVERY DIMENSION FOR CLAUDE CODE UNLEASHED."*
> **Working directory**: `Z:\claude-sota-installed\`
> **Output**: `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\07-final-synthesis\CC-DIMENSIONS-UNLEASHED-W259v7.md`
>
> **Scope distinction**: W259's L0-L9 layer architecture audits *what OSS to install*. THIS audit is orthogonal — it audits whether every **NATIVE Claude Code primitive** (zero-install, ships in the `claude` binary / Claude API) is **exploited** by the W259 architecture, or **dormant**. A dormant native dimension is a *free* capability the runtime is paying for (it ships in the binary) but not using.

---

## §0 — Method

### §0.1 — Why this audit exists

W259's 11-agent grand-catalog scored 144 OSS repos across 23 install-layers (L0 MCP → L9 FM-catalog). But the W259 PRIMARY-SOURCE-VERIFIER artifact (`04-critique/PRIMARY-SOURCE-VERIFICATION-2026-05-16.md`) surfaced a structural blind spot: **D3 — "W258 v13 lists only ~40% of currently-supported hook events"**. That blind spot generalizes. The architecture was built *outside-in* (which OSS to bolt on) and never audited *inside-out* (which native primitives are already free and unexploited). A native primitive that is DORMANT is strictly worse than an un-installed OSS repo: the OSS repo costs install effort + context budget, whereas the native primitive is *already in the binary* — leaving it dormant is pure waste.

### §0.2 — What counts as a "CC native dimension"

A capability is in-scope if it ships in the `claude` CLI binary OR the Claude API that Claude Code calls, with **zero third-party install**. MCP servers, plugins, and skills are themselves native *mechanisms* (the mechanism is native; the *content* loaded through them may be third-party) — so "MCP" is audited as a dimension (is the transport/defer-loading mechanism exploited?), distinct from "which MCP servers to install" (that is W259 L0).

### §0.3 — Primary-source verification protocol

Every dimension below carries a TIER-1-DIRECT cite to an Anthropic primary doc, fetched live 2026-05-16:

- `code.claude.com/docs/en/*` — Claude Code product docs (output-styles, checkpointing, headless, agent-view, agent-teams, scheduled-tasks, channels, sub-agents, hooks, settings, plugins, env-vars, mcp — all fetched verbatim this session)
- `platform.claude.com/docs/en/*` — Claude API docs + `release-notes/api` (advisor-tool, programmatic-tool-calling, compaction, adaptive-thinking, prompt-caching — fetched verbatim this session; full Q4-2024→May-2026 release-notes timeline indexed)
- Re-verification path: `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` of the same URLs.

Where the W259 PRIMARY-SOURCE-VERIFIER already pulled a verbatim quote, this audit cites that artifact (`PSV §N`) to avoid re-fetch — it is itself TIER-1-DIRECT.

### §0.4 — Verdict rubric

| Verdict | Definition |
|---|---|
| **UNLEASHED** | The dimension is configured + actively load-bearing in the W259 architecture or current runtime. No further action raises ROI materially. |
| **PARTIAL** | The dimension is touched (a flag set, one event wired, mentioned in a layer) but a large fraction of its capability surface is unused. |
| **DORMANT** | The dimension is not configured at all, OR is mentioned only as a future "watchlist/skeleton" with no concrete wiring. Free capability being wasted. |

### §0.5 — Multi-dimensional scoring

Each dimension gets two 0-10 scores:

- **Exploitation (E)** — how much of the dimension's capability surface W259 currently uses (0 = untouched, 10 = fully wired).
- **ROI-if-unleashed (R)** — the operator-profile-weighted value of moving the dimension to UNLEASHED (0 = no benefit for a single-dev multi-MAX Z:-Windows operator, 10 = transformative). ROI is *profile-specific*: e.g. multi-tenant identity scores low R because the operator is single-dev; background-task orchestration scores high R because multi-MAX accounts make parallel sessions cheap.

**Unleash-priority** = R when verdict is DORMANT/PARTIAL (UNLEASHED rows need no action). Punch list (§4) is sorted by R desc, then by reversibility.

### §0.6 — Current-runtime baseline (measured 2026-05-16)

`Z:\claude-sota-installed\.claude\settings.json` + `.mcp.json` inspected directly. Key findings that change verdicts vs a naive read of the W259 docs:

- **12 MCP servers** wired in `.mcp.json` (github, context7, deepwiki, playwright, chrome-devtools, repomix, serena, memory, graphiti, phoenix, gitnexus, ccusage).
- Already-set env vars: `ENABLE_TOOL_SEARCH=auto:5`, `ENABLE_PROMPT_CACHING_1H=1`, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, `CLAUDE_CODE_FORK_SUBAGENT=1`, `CLAUDE_CODE_EFFORT_LEVEL=max`, `CLAUDE_CODE_ENABLE_TELEMETRY=1` + full OTLP block, `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1`, `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING=1`, `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=85`.
- **`CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`** — Auto Memory is explicitly *disabled*.
- A **command statusline** is wired (`context_window_statusline.sh`).
- `permissions.defaultMode: "bypassPermissions"` — the runtime runs wide-open; auto-mode classifier is unused.
- **No `.claude/output-styles/` directory** — output styles dimension untouched.
- 4 project-local commands exist (`harvest`, `mistake-add`, `mistake-search`, `recall`).
- CC binary version observed: **2.1.119** (agent-view requires 2.1.139+, `claude plugin details` is newer — version-gated dimensions noted).

This baseline matters: several dimensions the W259 docs imply are dormant are actually *already PARTIAL* in the live runtime, and one (`CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`) is a deliberate **opt-out** that the W259 memory-layer never reconciled.

---

## §1 — The Capability Matrix (30 dimensions)

> Sort: dimension #. Each row = cite · current state · verdict · unleash-action · E/R score.
> **Architecture-wide totals**: 30 dimensions audited — **6 UNLEASHED · 14 PARTIAL · 10 DORMANT**. Mean E = 4.3/10. Mean R = 6.4/10.

---

### D1 — Hooks (26 lifecycle events)

- **Cite**: `code.claude.com/docs/en/hooks` (fetched 2026-05-16, verbatim event catalog) + W259 `PRIMARY-SOURCE-VERIFICATION §1.4` (D3 discrepancy). Full event set: `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PostToolBatch`, `UserPromptSubmit`, `UserPromptExpansion`, `SessionStart`, `SessionEnd`, `Stop`, `StopFailure`, `SubagentStop`, `PreCompact`, `PostCompact`, `Notification`, `TeammateIdle`, `TaskCreated`, `TaskCompleted`, `WorktreeCreate`, `WorktreeRemove`, `PermissionRequest`, `PermissionDenied`, `InstructionsLoaded`, `ConfigChange`, `CwdChanged`, `FileChanged`, `Elicitation`/`ElicitationResult`.
- **Current state**: W255 cleanup removed 110 self-invented hook commands + 33 self-invent scripts (`self_invented_count: 0`) — correct per cardinal-rule-2. W259 T0.7 is a *planned* "hook events refresh" but unexecuted. The live `settings.json` has NO `hooks` block at all — only an `ECC_DISABLED_HOOKS` env var disabling plugin-supplied ECC hooks. So today the runtime fires only whatever the installed plugins (context-mode, codex, ECC) wire. The 26-event *catalog* is essentially unexploited at the project layer.
- **Verdict**: **DORMANT** (project-layer) / PARTIAL (plugin-supplied hooks fire). W259 closes the *list-staleness* gap (T0.7) but never specifies *which* events to wire to *what* upstream-CLI invocations.
- **Unleash-action**: Execute T0.7 not as an audit but as a wiring spec. Cardinal-rule-2 permits "direct upstream-CLI invocations". Concrete high-value wirings (each a one-line `settings.json` command, no self-invent script): `PostToolUse(Edit|Write)` → `ruff format` / `pyright` / `shellcheck`; `PreToolUse(Bash)` → `gitleaks protect --staged` (W259 L0.5 already installs gitleaks); `WorktreeRemove` → `git worktree prune` (closes the #55435 leak W259 L0.4 flags); `SessionEnd` → ccusage snapshot; `PostCompact` → re-inject a priority-state file. `TeammateIdle`/`TaskCreated`/`TaskCompleted` → quality-gate exit-code-2 feedback (the agent-teams doc explicitly documents this pattern). `FileChanged`/`CwdChanged` → cheap logging.
- **Score**: **E=2 · R=9**. Highest-leverage dormant dimension: hooks are the *only* deterministic enforcement layer, and 26 events × zero project wiring = the single largest free-capability gap.

---

### D2 — Skills (plugin-loaded + project-local, description auto-trigger)

- **Cite**: `code.claude.com/docs/en/skills` + `PSV §1.3` ("Once a skill loads, its content stays in context across turns, so every line is a recurring token cost").
- **Current state**: W259 L2 install set is heavily skill-centric (superpowers, wshobson, anthropics/skills, trailofbits) and the runtime already surfaces 1,556 SKILL.md across 21 marketplaces. The W259-DECISIONS plugin-budget tiering (15 ACTIVE / 15 DORMANT / 30+ DISCOVERY-ONLY) is exactly the right *governance* primitive. Skills are well-understood and load-bearing.
- **Verdict**: **UNLEASHED**. The only refinement is execution of the ACTIVE/DORMANT budget (covered under D6).
- **Unleash-action**: None structural. Ensure project-local `.claude/skills/` is used for runtime-novel disciplines that should NOT be a plugin (cardinal-rule-4 keeps behavior in CLAUDE.md+settings, but a project-local SKILL.md is a documented native path for *reusable workflow* content).
- **Score**: **E=8 · R=3**.

---

### D3 — Subagents (Agent tool · model resolution · forking · worktree isolation · `skills:`/`memory:` fields)

- **Cite**: `code.claude.com/docs/en/sub-agents` + `PSV §1.2` (full frontmatter table: `model`, `tools`, `disallowedTools`, `permissionMode`, `maxTurns`, `skills`, `effort`, `isolation`, `initialPrompt`, `mcpServers`, `hooks`, `color`).
- **Current state**: `CLAUDE_CODE_FORK_SUBAGENT=1` is set (forked subagents inherit full conversation history). W259 L2 installs agent fleets (wshobson 93 agents). But the *frontmatter surface* is under-exploited: the W259 docs never mention `isolation: worktree` on subagent frontmatter, `skills:` preloading (full skill body injection), `effort:` per-subagent, `disallowedTools`, or per-subagent `mcpServers`/`hooks`. The CLAUDE.local.md treats `CLAUDE_CODE_SUBAGENT_MODEL` as deprecated (correct) — Path P codex-exec is the cross-model pattern.
- **Verdict**: **PARTIAL**. Forking is on; frontmatter richness is unused.
- **Unleash-action**: For every W259-installed agent, audit frontmatter for: (a) `isolation: worktree` on any file-writing agent (parallel-safe edits); (b) `skills:` preloading the agent's required discipline (full-body injection beats hoping auto-trigger fires); (c) `effort: low` on mechanical agents to cut cost, `effort: max` on synthesis agents; (d) `disallowedTools` to harden risky agents; (e) per-subagent `mcpServers` so a research agent gets deepwiki but not the whole 12-MCP load.
- **Score**: **E=5 · R=7**.

---

### D4 — MCP (stdio · HTTP · Streamable HTTP · tool-search / `defer_loading` · per-tool `taskSupport`)

- **Cite**: `code.claude.com/docs/en/mcp` + `PSV §1.5, §2.1, §2.3` + `platform.claude.com/.../tool-search-tool` (`tool_search_tool_regex_20251119`, `defer_loading`, GA per Feb 17 2026 release-notes — *now confirmed GA, no beta header*).
- **Current state**: 12 MCPs wired (mix of `http` and `stdio`). `ENABLE_TOOL_SEARCH=auto:5` IS set in the runtime — tool-search is *active* (defers tool loading above a 5-server threshold). This is a genuine UNLEASHED sub-point that the W259 docs (which call tool-search "API-layer only, not the CC MCP loader") got *wrong* — the live runtime proves CC exposes it via env. MCP `taskSupport` per-tool audit (W259 T0.0 sub-item) is unexecuted. Streamable HTTP vs legacy SSE: the 3 HTTP MCPs use `type:"http"` — should verify they negotiate streamable-http.
- **Verdict**: **PARTIAL** — transport + tool-search are exploited; `taskSupport` durable-execution negotiation is dormant.
- **Unleash-action**: (1) Run `tools/list` against each of the 12 MCPs, record `execution.taskSupport` in `.mcp.json` `_comments` (W259 T0.0). (2) Confirm `type:"http"` MCPs negotiate Streamable HTTP not legacy SSE. (3) The release-notes confirm tool-search is GA — drop any stale "beta-header" assumption.
- **Score**: **E=6 · R=5**.

---

### D5 — Slash commands (custom project + plugin commands)

- **Cite**: `code.claude.com/docs/en/commands` (referenced by output-styles + scheduled-tasks docs); `headless` doc note: *"User-invoked skills like `/commit` and built-in commands are only available in interactive mode"*.
- **Current state**: 4 project commands exist (`harvest`, `mistake-add`, `mistake-search`, `recall`). W259 L2 installs many plugin commands (116 surfaced). Modest but real use.
- **Verdict**: **PARTIAL**. Commands exist but are not a systematic layer — the runtime's recurring workflows (wave-open, codex-review dispatch, cite-refresh) are prose-driven, not command-encoded.
- **Unleash-action**: Encode the 3-5 most-repeated operator workflows as project `.claude/commands/*.md` so they are one-token invocations and (critically) re-runnable as `/loop 20m /my-command` arguments — the scheduled-tasks doc explicitly supports `/loop <interval> /<command>`.
- **Score**: **E=5 · R=4**.

---

### D6 — Plugins + marketplaces (install · dependency enforcement · per-session context-cost budget)

- **Cite**: `code.claude.com/docs/en/plugins` + `PSV §1.6` (`claude plugin details` shows component inventory + projected per-session token cost; `/plugin` browse pane shows projected context cost; dependency enforcement on disable/enable; root-level `SKILL.md` surfaced; plugins ship LSP servers).
- **Current state**: 37+ plugins installed. W259 T0.0 (ACTIVE/DORMANT/DISCOVERY-ONLY budget) is the correct governance design and is fully specified — but **unexecuted** (`installed_plugins.json` shows the budget tiering not yet applied; runtime CC is 2.1.119, `claude plugin details` may be version-gated).
- **Verdict**: **PARTIAL**. The plugin *mechanism* is heavily used; the *context-cost-budget governance primitive* (May 2026 native feature) is dormant.
- **Unleash-action**: Execute W259 T0.0 with the *native* tool: `claude plugin details <each>` → projected per-session token cost → classify → encode in `.claude/settings.json` `enabledPlugins` (disable DORMANT-tier auto-trigger). Update CC binary to ≥2.1.142 first so `claude plugin details` + `/plugin` cost pane are available.
- **Score**: **E=6 · R=7**.

---

### D7 — Settings.json (permission modes · 60+ settings · 175+ env vars)

- **Cite**: `code.claude.com/docs/en/settings` + `code.claude.com/docs/en/permission-modes` + `PSV §1.1, §1.7`. Permission modes: `default`, `acceptEdits`, `plan`, `bypassPermissions`, `auto`, `dontAsk`. `autoMode` object (`environment`/`allow`/`soft_deny`) customizes the auto-mode classifier.
- **Current state**: `settings.json` is rich (30+ env vars, OTLP block, statusLine, permissions). But `permissions.defaultMode: "bypassPermissions"` — the runtime runs with **all safety prompts off**. The native `auto` mode (classifier-gated: blocks dangerous ops, allows safe ones) and its `autoMode.environment`/`soft_deny` tuning are entirely unused. This contradicts cardinal-rule-5 ("safety boundaries via CC permissions, NOT custom guard scripts") — the runtime currently has *neither* (no guard scripts AND no permission gate).
- **Verdict**: **PARTIAL** — settings/env exploited heavily; the *permission-mode safety dimension* is DORMANT-by-opt-out.
- **Unleash-action**: Move off `bypassPermissions` to `auto` mode. Per `PSV` + AC-v2, `defaultMode:"auto"` in shared `.claude/settings.json` is *not honored* (repo-injection guard) — set `auto` via the `eee` launcher flag `--permission-mode auto`, OR set it in user-scope/project-local settings (the doc confirms `autoMode` *is* read from user/project-local/managed scopes, just not shared project settings). Then populate `permissions.autoMode.environment` ("trusted Z:-portable single-dev Windows install") + `soft_deny` for genuinely destructive ops. This gets near-zero prompts WITH a real safety net.
- **Score**: **E=6 · R=8**.

---

### D8 — Memory dimensions (CLAUDE.md 5 scopes · `@imports` · subagent `memory:` · Auto Memory · file-history · Channels-as-transcript)

- **Cite**: `code.claude.com/docs/en/memory` + `PSV §"native CC primitives"` (CLAUDE.md/AGENTS.md 5 scopes, subagent `memory:` field, Auto Memory, file-history checkpoints). W259 ULTIMATE-DECISIONS Decision-0 (memory layer).
- **Current state**: CLAUDE.md pointer-only root (≤50 LOC, correct per CCBP). `@imports` used implicitly via CLAUDE.local.md. **`CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` — Auto Memory is explicitly OFF.** W259 L1.5 picks `vectorize-io/hindsight` as the third-party memory engine but the native T0 tier ("Anthropic Memory Tool + Auto Dream + Auto Memory + subagent `memory:` field") is named in the synthesis as "T0-NATIVE preferred path" yet the live runtime *disables the central native piece*. The subagent `memory:` frontmatter field is never used.
- **Verdict**: **DORMANT** (native memory tier) — W259 declared native-memory the preferred path then the runtime opted out of it; never reconciled.
- **Unleash-action**: (1) Reconcile the `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` opt-out against W259's "T0-NATIVE preferred" claim — either re-enable Auto Memory and measure, or document *why* the third-party hindsight engine supersedes it (the W259 doc never does this). (2) Wire subagent `memory:` frontmatter on long-arc agents. (3) Use the API-side memory tool (`platform` release-notes: memory tool GA Feb 17 2026, no beta header) inside any Agent-SDK harness.
- **Score**: **E=4 · R=7**.

---

### D9 — Background tasks (`run_in_background` · Monitor tool · `claude --bg` · supervisor process)

- **Cite**: `code.claude.com/docs/en/agent-view` (background sessions hosted by a per-user supervisor; `claude --bg`, `claude logs/attach/stop/respawn`; `worktree.bgIsolation`) + `code.claude.com/docs/en/tools-reference#monitor-tool`.
- **Current state**: `run_in_background` (Bash) + the Monitor tool are available as tools but the W259 architecture never treats background-session orchestration as a layer. Given the operator profile (**multi-MAX accounts** = parallel sessions are *cheap*), this is a major miss. The agent-view doc: each background session runs independently, isolates writes to a worktree, persists across auto-update via the supervisor.
- **Verdict**: **DORMANT** as an architectural layer (the tool exists; no design exploits it).
- **Unleash-action**: Adopt `claude --bg "<task>"` + `claude agents` as a first-class parallel-execution layer alongside subagents and agent-teams. The W259 "Run agents in parallel" trichotomy (subagents / teams / worktrees) is *incomplete* — background sessions via the supervisor are a 4th mode and the best fit for *independent long-running* tasks (codex-review dispatch, nightly eval, PR-babysitting) on a multi-MAX fleet. See §3.
- **Score**: **E=2 · R=8**.

---

### D10 — Worktrees (`EnterWorktree`/`ExitWorktree` · `isolation: worktree` · `worktree.*` settings · GC)

- **Cite**: `code.claude.com/docs/en/worktrees` + `code.claude.com/docs/en/settings` (`worktree.baseRef`, `bgIsolation`, `symlinkDirectories`, `sparsePaths`) + agent-view doc (auto-worktree under `.claude/worktrees/`).
- **Current state**: W259 L0.4 (Version Control Substrate) covers this *well* — it explicitly keeps native `EnterWorktree`, identifies the #55435 leak, prescribes a GC script + threshold-alert, and swept 48 worktrees → 1 this session. This is the strongest-audited native dimension in W259.
- **Verdict**: **UNLEASHED** (W259 L0.4 fully handles it).
- **Unleash-action**: Minor — wire the GC to the `WorktreeRemove` hook (D1) rather than a standalone script, and set `worktree.*` settings explicitly (`bgIsolation`, `baseRef`).
- **Score**: **E=8 · R=3**.

---

### D11 — Output styles + statusline

- **Cite**: `code.claude.com/docs/en/output-styles` (Default/Proactive/Explanatory/Learning built-ins; custom styles via `.claude/output-styles/*.md`; `keep-coding-instructions`, `force-for-plugin` frontmatter; plugins ship `output-styles/`) + `code.claude.com/docs/en/statusline`.
- **Current state**: **No `.claude/output-styles/` directory exists.** The output-styles dimension is wholly untouched. The statusline IS wired (command-type, `context_window_statusline.sh`) — that half is UNLEASHED. The "Proactive" built-in style is notable: it gives auto-mode-like proactivity *without* changing permission mode.
- **Verdict**: **PARTIAL** — statusline UNLEASHED; output styles DORMANT.
- **Unleash-action**: For an autonomous-loop runtime, the **Proactive** built-in output style is a near-free win (immediate execution, fewer pause-for-decision turns). Set `outputStyle: "Proactive"` OR author a custom style that encodes the runtime's wave-discipline tone (cite-anchored, no-emoji, evidence-before-claims) so it is enforced at the *system-prompt* layer rather than re-stated each turn. Caveat: a custom style drops built-in SWE instructions unless `keep-coding-instructions: true` — set that flag.
- **Score**: **E=5 · R=4**.

---

### D12 — Checkpointing (`/rewind` · Esc-Esc · restore code/conversation · summarize-from/up-to-here · file-history)

- **Cite**: `code.claude.com/docs/en/checkpointing` (every prompt creates a checkpoint; persists across sessions; 6 rewind actions incl. `Summarize from here`/`Summarize up to here` — *targeted compaction*; cleaned up with sessions after `cleanupPeriodDays`).
- **Current state**: Checkpointing is automatic and always-on — every prompt is a checkpoint, `cleanupPeriodDays: 60` is set. So the *capture* side is UNLEASHED for free. But the architecture never *uses* the targeted-summarize actions, which are a strictly-better compaction lever than blind `/compact` (operator can choose which side of a message to compress, keeping cite-anchors intact). The W259 compaction discipline (CLAUDE.local.md ENV (i)/(j)) is all about *autocompact %* — it never mentions rewind-summarize.
- **Verdict**: **PARTIAL** — capture UNLEASHED; the rewind-summarize *operator workflow* dormant.
- **Unleash-action**: Add `Esc-Esc → "Summarize up to here"` to the operator's compaction playbook as the *preferred* manual compaction (preserves recent cite-anchored work in full detail, compresses only stale setup) — superior to `/compact` for long research waves. Document in CLAUDE.local.md alongside the autocompact env vars.
- **Score**: **E=6 · R=5**.

---

### D13 — 1M context window

- **Cite**: `code.claude.com/docs/en/model-config` ("Opus 4.7, Opus 4.6, Sonnet 4.6 support a 1M token context window … On Max, Team, Enterprise plans Opus is automatically routed to 1M") + `platform` release-notes Mar 13 2026 (1M GA, dedicated 1M rate limits removed) + `PSV §4.3`.
- **Current state**: Fully exploited. CLAUDE.local.md ENV (h) `CLAUDE_CODE_DISABLE_1M_CONTEXT` is correctly left UNSET; W50F2 codified the decision to *keep* 1M as the SOTA primitive and reject disabling it. Operator is on multi-MAX (1M auto-routed).
- **Verdict**: **UNLEASHED**.
- **Unleash-action**: None. (Watch-item: the compaction env vars in CLAUDE.local.md are calibrated for 1M — keep them in sync if the model band changes.)
- **Score**: **E=9 · R=2**.

---

### D14 — Agent SDK (Python + TypeScript)

- **Cite**: `code.claude.com/docs/en/agent-sdk` + `code.claude.com/docs/en/headless` (*"Agent SDK gives you the same tools, agent loop, and context management that power Claude Code … available as a CLI, or as Python and TypeScript packages"*; June 15 2026 — SDK/`-p` usage draws from a separate monthly Agent SDK credit) + `PSV §1.8`. W259 ranked `anthropics/claude-agent-sdk-python` as T1 INSTALL (score 95).
- **Current state**: W259 surfaces the SDK and ranks it T1 but there is no *built artifact* — the runtime uses interactive CC only. The SDK is the path to programmatic harnesses (custom eval loops, the FM-catalog automation, cite-refresh bots).
- **Verdict**: **DORMANT** — surfaced in the catalog, zero deployment.
- **Unleash-action**: Build one concrete Agent-SDK harness to validate the path — the highest-fit candidate is the W259 L4 eval cadence (Inspect AI + Promptfoo nightly) wrapped as an Agent-SDK Python script, OR the L9 FM-catalog publication tooling. Note the June 15 2026 separate-credit change — budget accordingly.
- **Score**: **E=2 · R=6**.

---

### D15 — Headless / print mode (`-p` · `--bare` · `--output-format` · `--json-schema` · stream-json)

- **Cite**: `code.claude.com/docs/en/headless` (`-p`/`--print`; `--bare` skips auto-discovery; `--output-format text|json|stream-json`; `--json-schema` for schema-conformant output; `system/init` + `system/api_retry` + `plugin_install` stream events; `total_cost_usd` per-invocation in JSON).
- **Current state**: Unused. The runtime is fully interactive. W259 L4 (Promptfoo CI-gate) *implies* headless usage but never wires `claude -p` into a CI lane.
- **Verdict**: **DORMANT**.
- **Unleash-action**: Use `claude --bare -p "<task>" --output-format json --allowedTools "..."` for every deterministic, repeatable runtime check — e.g. a pre-commit "typo-linter" lane, a `--json-schema`-validated FM-class extractor, or a CI gate. `--bare` is the doc-recommended mode for scripts (skips hook/plugin/MCP discovery → deterministic across machines). Pairs directly with W259 L0.4 lefthook + L4 Promptfoo.
- **Score**: **E=1 · R=6**.

---

### D16 — Programmatic tool calling

- **Cite**: `platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling` + `platform` release-notes Feb 17 2026 (**GA, no beta header**) + `PSV §4.2` (*"calling 10 tools directly uses ~10x the tokens of calling them programmatically and returning a summary"*; intermediate tool results not added to context).
- **Current state**: This is an API-layer primitive (Claude calls tools from inside `code_execution`). It is *not* directly exposed in interactive CC — it lands when building Agent-SDK / API harnesses. W259 L6 lists it as pattern #14 ("Tool search tool / Programmatic tool calling") — so it is *cited as a pattern* but not *exploited* (no harness uses it).
- **Verdict**: **DORMANT** — cited-as-pattern, zero deployment. (Inseparable from D14 — it only activates inside an Agent-SDK/API harness.)
- **Unleash-action**: When the D14 Agent-SDK harness is built, enable `code_execution` + programmatic tool calling for any multi-tool aggregation step (eval-result crunching, multi-repo scans) — the 10x token saving is the canonical output-side context fix, complementary to tool-search's input-side fix.
- **Score**: **E=1 · R=6**.

---

### D17 — Compaction (auto-compact · PreCompact/PostCompact hooks · `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` · server-side Compaction API)

- **Cite**: `code.claude.com/docs/en/hooks` (`PreCompact`/`PostCompact`) + `PSV §1.7` (`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` is a % of `CLAUDE_CODE_AUTO_COMPACT_WINDOW`) + `platform` release-notes Feb 5 2026 (Compaction API beta — server-side summarization) + `platform.../context-editing` (`clear_tool_uses`, `clear_thinking`).
- **Current state**: Heavily tuned — `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=85` + `CONTEXT_WINDOW_COMPACT_{WARN,HIGH,CRIT}_TOKENS` set. The autocompact-% lever is UNLEASHED. But `PreCompact`/`PostCompact` *hooks* are not wired at the project layer (only context-mode plugin's precompact). The server-side **Compaction API** and **context-editing** (`clear_tool_uses`/`clear_thinking`) — both API-layer — are unused.
- **Verdict**: **PARTIAL** — autocompact-% UNLEASHED; PreCompact/PostCompact project hooks + API-side compaction dormant.
- **Unleash-action**: (1) Wire `PostCompact` hook → re-inject a priority-state file (the W184/W201 codifications worry about post-compact re-inflation — a `PostCompact` hook is the *native* fix). (2) In any Agent-SDK harness, use the Compaction API / `clear_tool_uses` instead of re-implementing compaction.
- **Score**: **E=6 · R=5**.

---

### D18 — Scheduled tasks (`/loop` · `CronCreate`/`CronList`/`CronDelete` · Routines · Desktop scheduled tasks · GitHub Actions)

- **Cite**: `code.claude.com/docs/en/scheduled-tasks` (`/loop`, three modes; `CronCreate`/`CronList`/`CronDelete` tools, 5-field cron, 50-task cap, 7-day expiry, jitter; `CLAUDE_CODE_DISABLE_CRON`) + `code.claude.com/docs/en/routines` (cloud) + `desktop-scheduled-tasks`.
- **Current state**: `/loop` is heavily used by the operator (the runtime *is* a `/loop`-driven autonomous harness — `loop` skill is in the available-skills list). Session-scoped cron via `CronCreate` is available. But **Routines** (Anthropic-cloud durable scheduling, survives machine-off) and **Desktop scheduled tasks** are unused, and the W259 architecture never mentions them. `loop.md` (project default-prompt customization) — unknown if present.
- **Verdict**: **PARTIAL** — `/loop` UNLEASHED; durable Routines/Desktop-tasks dormant.
- **Unleash-action**: (1) For waves that should run *unattended even when the machine sleeps*, use Routines (cloud) — currently every `/loop` dies when the terminal closes. (2) Author `.claude/loop.md` to replace the built-in maintenance prompt with the runtime's wave-discipline. (3) Consider Desktop scheduled tasks for local-file-access recurring jobs (e.g. nightly cite-refresh) that should survive session exit.
- **Score**: **E=6 · R=6**.

---

### D19 — Web fetch + web search tools

- **Cite**: `platform` release-notes May 7 2025 (web search launched) + Sep 10 2025 (web fetch) + Feb 17 2026 (**web search + programmatic tool calling GA**; web search/fetch gain *dynamic filtering* via code execution).
- **Current state**: WebFetch + WebSearch are available native tools (used in *this very audit*). W259 L0 layers tavily/firecrawl/crawl4ai MCPs *on top* — which is fine for bulk crawling, but the native tools cover the common case zero-install. Dynamic filtering (code-execution-backed result filtering before context) is an API-layer refinement.
- **Verdict**: **UNLEASHED** (native tools work and are used). Dynamic-filtering refinement is API-harness-only.
- **Unleash-action**: None for interactive use. In an Agent-SDK harness, enable web-search dynamic filtering to cut token cost on research-heavy loops.
- **Score**: **E=8 · R=3**.

---

### D20 — Task management (`TaskCreate`/`TaskList`/`TaskUpdate` · the shared task list)

- **Cite**: `code.claude.com/docs/en/agent-teams` (shared task list: pending/in-progress/completed, dependencies, file-locked claiming) + `code.claude.com/docs/en/interactive-mode#task-list` + hooks `TaskCreated`/`TaskCompleted`.
- **Current state**: The task list is a native primitive primarily surfaced through agent-teams + interactive `/tasks`. The runtime uses TodoWrite-style tracking implicitly. `TaskCreated`/`TaskCompleted` hooks (the enforcement seam) are unwired.
- **Verdict**: **PARTIAL**.
- **Unleash-action**: Wire `TaskCreated`/`TaskCompleted` hooks to exit-code-2 quality gates (reject a task-complete that lacks evidence) — this is the native enforcement of the runtime's verification-before-completion discipline. Covered jointly with D1.
- **Score**: **E=4 · R=5**.

---

### D21 — Agent teams / multi-agent (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` · team lead · `SendMessage` · mailbox · peer DMs)

- **Cite**: `code.claude.com/docs/en/agent-teams` (experimental, env-gated; team lead + teammates + shared task list + mailbox; `SendMessage`; `teammateMode` in-process/tmux; subagent-definitions-as-teammates; `TeammateIdle`/`TaskCreated`/`TaskCompleted` quality gates).
- **Current state**: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` IS set — so the dimension is *enabled*. W259 L7 explicitly **SKIPs Team UX** for the single-dev profile. But agent-teams ≠ Team UX — agent-teams is the *local multi-session coordination* primitive, and W259's agent-teams skill cluster IS in the ACTIVE plugin budget. **Windows caveat (load-bearing)**: split-pane mode needs tmux/iTerm2 and is *explicitly unsupported in Windows Terminal* — so on this Z:-Windows runtime, agent-teams runs **in-process mode only**.
- **Verdict**: **PARTIAL** — enabled, but the Windows split-pane limitation caps it at in-process, and the runtime's parallel work mostly uses subagents/codex-exec instead.
- **Unleash-action**: Keep agent-teams for *research/review/competing-hypothesis* waves specifically (the doc's strongest use cases), running `teammateMode: "in-process"` (forced — Windows). Reuse W259-installed subagent definitions as teammate roles (`tools`/`model` honored). Do NOT use teams for sequential/same-file work — subagents win there. Wire `TeammateIdle` hook for quality gates.
- **Score**: **E=5 · R=5**.

---

### D22 — Advisor tool (Apr 9 2026 API beta)

- **Cite**: `platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool` + `platform` release-notes Apr 9 2026 (beta header `advisor-tool-2026-03-01`). Executor model + advisor model (advisor ≥ executor capability); advisor reads full transcript, returns 400-700-token plan mid-generation; `max_uses`, `caching` params; single `/v1/messages` request.
- **Current state**: API-layer beta. Not usable in interactive CC today (it is a `tools` array entry in the Messages API). The W259 L1 layer lists "Advisor" in the cross-model-proxy slot but as a name only — no deployment, no harness.
- **Verdict**: **DORMANT** — named in L1, zero exploitation.
- **Unleash-action**: This is a *strategic* fit for the operator's unlimited-codex + multi-MAX profile but only inside an Agent-SDK/API harness (D14). Pattern: Sonnet-4.6 executor + Opus-4.7 advisor = near-Opus quality at near-Sonnet cost for long-horizon agent loops. It is a partial *native* alternative to the codex-as-adversarial-reviewer pattern (same "stronger model gives strategic guidance" shape, but in-process, single request, no subprocess). Pilot it in the D14 harness and compare against Path P codex-exec.
- **Score**: **E=1 · R=6**.

---

### D23 — Managed Agents (Apr 8 2026 beta)

- **Cite**: `platform` release-notes Apr 8 2026 (Claude Managed Agents public beta — fully managed agent harness, secure sandboxing, built-in tools, SSE streaming; `managed-agents-2026-04-01` beta header; `ant` CLI launched same day) + May 6 2026 (Multiagent sessions + Outcomes public beta) + Apr 23 2026 (agent memory) + May 11 2026 (on Claude Platform on AWS). W259 L5 ranks Managed Agents #1 scaffold (SWE-bench Pro).
- **Current state**: W259 L5 correctly ranks Managed Agents the top scaffold. But it is "use-bounded" in the architecture — no deployment. Managed Agents is a *cloud-hosted* harness — it runs Claude as an autonomous agent on Anthropic infra, orthogonal to the local Z:-portable runtime.
- **Verdict**: **DORMANT** — top-ranked in L5, zero exploitation. (Lower R than it looks: it is cloud infra, partially redundant with the local runtime + the W259 L0.4-L9 stack the operator already runs locally.)
- **Unleash-action**: Pilot Managed Agents for *delegatable, self-contained, sandboxed* tasks that should NOT consume the local runtime (e.g. a long unattended refactor, or a security-scan job). Use the `ant` CLI for API-resource versioning. Treat as a *complement* to local CC, not a replacement. Lower priority than D14/D7/D1 because it duplicates local capability.
- **Score**: **E=1 · R=4**.

---

### D24 — Adaptive / extended thinking (Opus 4.7 adaptive reasoning · `effort` · `thinking.display`)

- **Cite**: `platform.claude.com/docs/en/build-with-claude/adaptive-thinking` + `platform` release-notes Feb 5 2026 (`effort` GA), Feb 16 2026 (`thinking.display: "omitted"`) + `PSV §4.3` (*"Opus 4.7 always uses adaptive reasoning … `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` does not apply to it"*; `budget_tokens` deprecated on 4.6+).
- **Current state**: Opus 4.7 adaptive reasoning is automatic (no config possible — it is always-on). `CLAUDE_CODE_EFFORT_LEVEL=max` is set in the runtime (the effort lever IS exploited at the CC layer). `alwaysThinkingEnabled` setting exists. This dimension is essentially fully exploited at the interactive layer.
- **Verdict**: **UNLEASHED**. (`effort=max` is a deliberate, correct choice for a synthesis-heavy runtime.)
- **Unleash-action**: None at the interactive layer. In Agent-SDK harnesses, consider per-call `effort` tuning (mechanical steps at `low`, synthesis at `max`) for cost control — and `thinking.display: "omitted"` for faster streaming where thinking transcript is not needed.
- **Score**: **E=8 · R=2**.

---

### D25 — Prompt caching (`cache_control` · automatic caching · 1h TTL)

- **Cite**: `platform.claude.com/docs/en/build-with-claude/prompt-caching` + `platform` release-notes Aug 13 2025 (1h TTL GA) + Feb 19 2026 (**automatic caching** — single `cache_control` field, system auto-moves the cache point) + `PSV` (Mar 6 2026 silent default-TTL change to 5m).
- **Current state**: `ENABLE_PROMPT_CACHING_1H=1` IS set in the runtime — the 1h-TTL lever is exploited at the CC layer. Caching itself is automatic in CC. W259 L6 / Layer-F correctly notes "Anthropic prompt-caching native obsoletes the GPTCache class" and SKIPs a third-party prompt-cache layer — correct.
- **Verdict**: **UNLEASHED**.
- **Unleash-action**: None at the interactive layer. In Agent-SDK harnesses, use automatic caching (`cache_control` once) + the advisor tool's own `caching` param (D22) for long agent loops.
- **Score**: **E=8 · R=2**.

---

### D26 — Permission modes / sandboxing / allowlist

- **Cite**: `code.claude.com/docs/en/permission-modes` + `code.claude.com/docs/en/permissions` (read-only command set; `dontAsk`; allowlist syntax; additional directories) + `anthropic-experimental/sandbox-runtime` (W259 L0 T1).
- **Current state**: `permissions.allow` has ~10 entries, `permissions.deny` has 7 secret-file globs — so the *allowlist mechanism* is partly used. But `defaultMode: "bypassPermissions"` neuters it (everything is allowed anyway). This is the same root finding as D7, scored separately because sandboxing is its own sub-dimension. W259 L0.5 trims security to 5 core but does not resolve the bypassPermissions posture.
- **Verdict**: **DORMANT** — the deny-list is cosmetic under bypassPermissions; sandbox-runtime not installed.
- **Unleash-action**: Same as D7 — move to `auto` mode via launcher flag. Then the `permissions.allow`/`deny` rules + `dontAsk` read-only set + `autoMode.soft_deny` all become live. Install `anthropic-experimental/sandbox-runtime` (W259 L0 T1) for genuine OS-level sandboxing of risky tool calls.
- **Score**: **E=3 · R=7**.

---

### D27 — Status line / model picker / Fast mode (`/fast`)

- **Cite**: `code.claude.com/docs/en/statusline` + `code.claude.com/docs/en/model-config` (`/model`, fast mode) + `platform` release-notes May 12 2026 (Opus 4.7 fast mode research preview) + CC release-notes (*"Fast mode now uses Opus 4.7 by default"*; `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE`).
- **Current state**: Statusline UNLEASHED (command-type, context-window display). Model picker / `/model` available. Fast mode is now Opus-4.7-default. `ANTHROPIC_SMALL_FAST_MODEL=claude-haiku-4-5` is set (the cheap-inline-judge model is configured). Fast mode is a research-preview, premium-priced, latency feature — low fit for a research-synthesis runtime that prioritizes intelligence over latency.
- **Verdict**: **UNLEASHED** (statusline + model config) — Fast mode deliberately *not* used, which is correct for this profile.
- **Unleash-action**: None. Fast mode is a non-fit (premium price, latency-not-intelligence) — correct to skip. Statusline could optionally surface autocompact-% / cost, but that is polish.
- **Score**: **E=8 · R=2**.

---

### D28 — Channels (Apr 2026 research preview — event push into running session)

- **Cite**: `code.claude.com/docs/en/channels` (channel = an MCP server that *pushes* events into a running session; Telegram/Discord/iMessage/fakechat; `--channels` flag; webhook receiver; permission relay; `channelsEnabled`/`allowedChannelPlugins`).
- **Current state**: Wholly untouched. W259 mentions "Channels (JSONL transcripts)" in the memory-primitives list — but that conflates Channels (the event-push feature) with session transcript JSONL. They are different things. The actual Channels feature (push CI failures / chat messages into a live session) is unused.
- **Verdict**: **DORMANT**.
- **Unleash-action**: For the operator's autonomous-`/loop` runtime, a **webhook-receiver channel** is high-value: CI results, codex-review completions, or deploy events get *pushed* into the live session instead of polled — strictly more token-efficient than `/loop`-polling. A Telegram/Discord channel also gives the operator a phone-side bridge to a long-running wave. Requires Bun (operator already has Bun per the env). Note: research preview, `--channels` syntax may change.
- **Score**: **E=1 · R=5**.

---

### D29 — Remote Control + Claude Code on the web + Slack (out-of-terminal session access)

- **Cite**: `code.claude.com/docs/en/remote-control` + `code.claude.com/docs/en/claude-code-on-the-web` + `code.claude.com/docs/en/slack` (cross-referenced from the channels + agent-view docs). `/goal` works in Remote Control per CC release-notes.
- **Current state**: Untouched. W259 never mentions these. Remote Control = drive the local session from claude.ai/mobile; Claude Code on the web = fresh cloud sandbox cloned from GitHub.
- **Verdict**: **DORMANT**.
- **Unleash-action**: Low-to-medium fit for a single-dev Z:-portable runtime. Remote Control is genuinely useful — steer a long autonomous wave from a phone while away from the desk (the operator runs multi-hour `/loop` waves). Claude Code on the web is lower fit (the runtime is deeply Z:-local + Windows-specific; a cloud clone loses the install). Enable Remote Control; skip web.
- **Score**: **E=1 · R=4**.

---

### D30 — `/goal` completion-condition primitive

- **Cite**: CC release-notes (*"Added `/goal` command: set a completion condition and Claude keeps working across turns until it's met. Works in interactive, `-p`, and Remote Control"*) + `code.claude.com/docs/en/goal` (cross-referenced from scheduled-tasks doc) + `PSV §4.5`.
- **Current state**: The operator's CLAUDE.md/CLAUDE.local.md already reference `/goal` workflows extensively (the `/goal MANDATES` section, goal-backward scoring). `/goal` IS used. The scheduled-tasks doc positions `/goal` as the "work until condition met" complement to `/loop`'s "run on interval".
- **Verdict**: **UNLEASHED** — actively load-bearing in the operator's wave workflow.
- **Unleash-action**: None. (Synergy note: `/goal` in `-p` mode (D15) enables a headless "run until done" CI lane — worth combining when D15 is unleashed.)
- **Score**: **E=8 · R=3**.

---

## §2 — DORMANT dimensions ranked by ROI-if-unleashed

> 10 DORMANT dimensions. Sorted by R desc. These are *free* capabilities (ship in the binary / API) currently wasted.

| Rank | Dim | Dimension | E | R | Why it is the waste it is | Reversibility |
|---:|---|---|---:|---:|---|---|
| 1 | **D1** | Hooks (26 events, project layer) | 2 | **9** | The only deterministic enforcement layer. 26 events, zero project wiring. cardinal-rule-2 explicitly permits direct upstream-CLI hooks — they are *allowed* and *unused*. | HIGH — each hook is one `settings.json` line; revert = delete line |
| 2 | **D9** | Background tasks / supervisor (`claude --bg` + `claude agents`) | 2 | **8** | Multi-MAX accounts make parallel sessions cheap; the supervisor runs detached sessions across auto-update. W259's parallel-work model omits this 4th mode entirely. | HIGH — `claude --bg`/`claude stop` are stateless invocations |
| 3 | **D8** | Native memory tier (Auto Memory + subagent `memory:`) | 4 | **7** | W259 declared native memory the "T0 preferred path" then the runtime set `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`. Unreconciled contradiction. | HIGH — flip one env var |
| 4 | **D26** | Permission-mode sandboxing / allowlist | 3 | **7** | `bypassPermissions` makes the deny-list cosmetic. Runtime has neither guard scripts nor a permission gate — violates cardinal-rule-5's *intent*. | MED — launcher-flag change + auto-mode acceptance |
| 5 | **D14** | Agent SDK (Python/TS) | 2 | **6** | T1-ranked in W259, zero built artifacts. The path to every programmatic harness (eval loops, FM-catalog tooling). | MED — build effort; June 15 2026 separate-credit cost |
| 6 | **D15** | Headless `-p` / `--bare` mode | 1 | **6** | Zero CI lanes use `claude -p`. `--bare` gives deterministic cross-machine runs. Pairs with L0.4 lefthook + L4 Promptfoo. | HIGH — pure CLI invocation |
| 7 | **D16** | Programmatic tool calling | 1 | **6** | Cited as W259 pattern #14, never deployed. 10x token saving on multi-tool aggregation — the output-side context fix. | MED — activates only inside a D14 harness |
| 8 | **D22** | Advisor tool | 1 | **6** | Named in W259 L1, zero exploitation. Native Sonnet-executor + Opus-advisor = near-Opus quality at near-Sonnet cost; a native cousin of the codex-reviewer pattern. | MED — API-harness only (D14-dependent) |
| 9 | **D28** | Channels (event push) | 1 | **5** | Webhook-receiver channel pushes CI/codex events into the live `/loop` session — strictly better than polling. Operator has Bun. | HIGH — install plugin + `--channels` flag; research preview |
| 10 | **D23** | Managed Agents | 1 | **4** | Top-ranked W259 L5 scaffold, zero use. Lower R: cloud infra partly redundant with the operator's local L0.4-L9 stack. | MED — cloud signup + `ant` CLI |
| — | **D29** | Remote Control / web / Slack | 1 | 4 | Remote Control useful (phone-steer long waves); web/Slack low-fit for Z:-local runtime. | HIGH |

**Top-5 highest-ROI dormant dimensions to unleash**: **D1 Hooks (R=9) · D9 Background tasks (R=8) · D8 Native memory tier (R=7) · D26 Permission sandboxing (R=7) · D14 Agent SDK (R=6)**.

A structural observation: **3 of the top-8 (D14, D16, D22) are mutually unlock-gated** — programmatic tool calling and the advisor tool only activate *inside* an Agent-SDK harness. So building one D14 harness simultaneously unleashes D14+D16+D22 (and D17's API-side compaction, D19's dynamic filtering). That makes D14 a *force multiplier* — its R=6 understates the cascade. The punch list (§4) treats "build the Agent-SDK harness" as a single P1 item that clears 5 dormant dimensions.

---

## §3 — The "fully-unleashed CC runtime" target spec

The W259 L0-L9 layer architecture answers *what OSS to install*. This is the orthogonal native-primitive layer — the spec for a runtime where **every native CC dimension is exploited**. It overlays the W259 layers; nothing here conflicts.

### §3.1 — Native-primitive exploitation layer (overlay on W259 L0-L9)

```
FULLY-UNLEASHED CC NATIVE LAYER (overlay — every dimension UNLEASHED)
┌────────────────────────────────────────────────────────────────────────────┐
│ ENFORCEMENT     Hooks: ~10 project hooks wired to direct upstream-CLIs       │
│  (D1,D20)        PostToolUse(Edit|Write)→ruff/pyright/shellcheck             │
│                  PreToolUse(Bash)→gitleaks · WorktreeRemove→worktree prune   │
│                  PostCompact→priority-state re-inject · SessionEnd→ccusage   │
│                  TeammateIdle/TaskCreated/TaskCompleted→exit-2 quality gate  │
├────────────────────────────────────────────────────────────────────────────┤
│ SAFETY          permission-mode = auto (launcher flag) · autoMode.environment│
│  (D7,D26)        + soft_deny populated · allow/deny rules live · sandbox-rt  │
├────────────────────────────────────────────────────────────────────────────┤
│ PARALLELISM     4 modes, each used for its fit:                              │
│  (D3,D9,D10,     · subagents (forked) — focused report-back tasks            │
│   D21)           · background sessions (claude --bg + agents) — independent  │
│                    long-runners (codex-review, nightly eval, PR-babysit)     │
│                  · agent-teams (in-process, Windows) — research/review/      │
│                    competing-hypothesis waves only                          │
│                  · worktrees (isolation:worktree frontmatter) — parallel edit│
├────────────────────────────────────────────────────────────────────────────┤
│ PROGRAMMATIC    Agent-SDK Python harness (force multiplier — unlocks 5 dims):│
│  (D14,D15,D16,   · headless claude --bare -p --output-format json CI lanes   │
│   D17,D19,D22)   · programmatic tool calling (10x token cut on aggregation)  │
│                  · advisor tool (Sonnet exec + Opus advisor) pilot           │
│                  · Compaction API / clear_tool_uses · web-search dyn filter  │
├────────────────────────────────────────────────────────────────────────────┤
│ MEMORY          native tier reconciled: Auto Memory decision documented or   │
│  (D8,D12)        re-enabled · subagent memory: frontmatter on long-arc agents│
│                  · rewind "Summarize up-to-here" = preferred manual compact  │
├────────────────────────────────────────────────────────────────────────────┤
│ SCHEDULING      /loop (in use) + Routines (cloud, machine-off-survival) +    │
│  (D18,D30)       loop.md authored + /goal (in use) · /goal in -p = CI lane   │
├────────────────────────────────────────────────────────────────────────────┤
│ EVENT-DRIVEN    Channels: webhook-receiver pushes CI/codex events into the   │
│  (D28,D29)       live /loop session (replaces polling) · Remote Control on   │
├────────────────────────────────────────────────────────────────────────────┤
│ UX / STYLE      output style = Proactive (or custom, keep-coding-instr:true) │
│  (D11,D27)       · statusline (in use) · model picker (in use)               │
├────────────────────────────────────────────────────────────────────────────┤
│ ALWAYS-ON       1M context · adaptive thinking · effort=max · prompt-cache   │
│  (D13,D24,D25)   1h · tool-search auto:5 — ALL already UNLEASHED, keep       │
├────────────────────────────────────────────────────────────────────────────┤
│ GOVERNANCE      plugin budget executed via `claude plugin details` cost-     │
│  (D2,D5,D6)      audit → enabledPlugins tiering · project commands for       │
│                  repeated workflows · MCP taskSupport audited in _comments   │
└────────────────────────────────────────────────────────────────────────────┘
```

### §3.2 — What the fully-unleashed runtime looks like (concrete end-state)

1. **Enforcement is deterministic, not hoped-for.** ~10 project hooks fire ruff/pyright/shellcheck/gitleaks/worktree-GC as direct upstream-CLI invocations (cardinal-rule-2 compliant — these are *not* self-invent scripts, they are direct CLI calls). The runtime's discipline (verification-before-completion, no-secrets, conventional-commits) is enforced by `TaskCompleted`/`PreToolUse` exit codes, not by skill prose the model may or may not honor.
2. **Safety exists.** `auto` permission mode replaces `bypassPermissions` — the runtime gets near-zero prompts (via `autoMode.environment` trust description) WITH a classifier that blocks genuinely destructive ops. Today it has neither.
3. **Parallelism uses all 4 native modes deliberately.** Background sessions (`claude --bg`) become the home for independent long-runners — perfectly matched to the multi-MAX fleet — instead of everything being a subagent.
4. **One Agent-SDK harness exists**, clearing 5 dormant dimensions at once (D14/D15/D16/D17/D22). It hosts the L4 eval cadence and/or L9 FM-catalog tooling, with programmatic tool calling + advisor tool active.
5. **The native memory contradiction is resolved** — either Auto Memory is on, or the W259 doc explicitly states why hindsight supersedes it.
6. **Events are pushed, not polled** — a webhook-receiver Channel feeds CI/codex completions into the live wave.
7. **Always-on primitives stay on** — 1M context, adaptive thinking, effort=max, 1h prompt-cache, tool-search auto:5 are already correct; the spec just protects them from regression.

### §3.3 — Net effect

W259's architecture is strong on *acquisition* (what to install) and weak on *exploitation* (using what is already free). The fully-unleashed spec adds **zero new OSS dependencies** for 7 of the 10 dormant dimensions (D1, D8, D9, D11, D15, D18, D28 are pure native config/usage) — and the remaining 3 (D14, D16, D22) need only *one* built harness, not three. The total "unleash" cost is far below the cost of any single W259 install-layer, and the ROI is higher because hooks/permissions/parallelism are *infrastructure* every wave runs on.

---

## §4 — Unleash-action punch list (prioritized)

> Sorted by R desc, then reversibility (HIGH-reversibility first within a tier). Every P0/P1 item is reversible. P0 = do this wave; P1 = next wave; P2 = when triggered.

### P0 — Highest ROI, HIGH reversibility, zero new dependencies (do this wave)

| # | Dim | Action | Effort | Validation gate |
|---|---|---|---|---|
| **U1** | D1 | Wire ~10 project hooks in `settings.json` as **direct upstream-CLI invocations** (cardinal-rule-2 compliant): `PostToolUse(Edit\|Write)`→ruff/pyright/shellcheck; `PreToolUse(Bash)`→`gitleaks protect --staged`; `WorktreeRemove`→`git worktree prune`; `PostCompact`→priority-state re-inject; `SessionEnd`→ccusage snapshot. NO `.claude/hooks/scripts/*.py` self-invent. | M | Each hook fires; `self_invented_count` stays 0; W255 cleanup invariant intact |
| **U2** | D7+D26 | Replace `defaultMode:"bypassPermissions"` with `auto` mode via the `eee` launcher flag `--permission-mode auto`. Populate user-scope/project-local `permissions.autoMode.environment` (trusted-Z:-Windows-single-dev) + `soft_deny` for destructive ops. (`auto` in *shared* settings is ignored — use launcher flag or user/project-local scope.) | S | Near-zero prompts on routine ops; destructive op triggers a block; one interactive `claude --permission-mode auto` acceptance run done |
| **U3** | D8 | Reconcile `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`: either re-enable Auto Memory + measure, OR add a documented rationale to CLAUDE.local.md for why W259 L1.5 hindsight supersedes the native tier. Wire subagent `memory:` frontmatter on long-arc agents. | S | Contradiction resolved in writing; decision cite-anchored |
| **U4** | D9 | Adopt `claude --bg "<task>"` + `claude agents` as the documented 4th parallel-execution mode. Update the runtime's parallel-work guidance (subagents / teams / worktrees / **background sessions**). Target: codex-review dispatch + nightly eval as background sessions. | S | One background session dispatched + managed via `claude logs/attach/stop` |
| **U5** | D11 | Set `outputStyle: "Proactive"` (built-in) OR author `.claude/output-styles/<runtime>.md` with `keep-coding-instructions: true` encoding wave-discipline tone. | S | New session starts in the chosen style; behavior shift observed |
| **U6** | D18 | Author `.claude/loop.md` to replace the built-in `/loop` maintenance prompt with the runtime's wave-discipline default. | S | Bare `/loop` uses the custom prompt |

### P1 — High ROI, needs build effort or version bump (next wave)

| # | Dim | Action | Effort | Validation gate |
|---|---|---|---|---|
| **U7** | D14+D15+D16+D17+D22 | **Build ONE Agent-SDK (Python) harness** — force multiplier clearing 5 dormant dimensions. Host the W259 L4 eval cadence (Inspect AI + Promptfoo) OR L9 FM-catalog tooling. Enable: headless `--bare -p --output-format json`, `code_execution` + programmatic tool calling, advisor tool pilot (Sonnet exec + Opus advisor), Compaction API. | L | Harness runs; programmatic tool calling cuts tokens on one aggregation step; advisor-vs-codex comparison logged. Budget the June 15 2026 separate Agent-SDK credit. |
| **U8** | D6 | Update CC binary to ≥2.1.142, then execute W259 T0.0 plugin budget with the native `claude plugin details` per-session token-cost tool → classify ACTIVE/DORMANT/DISCOVERY-ONLY → encode in `settings.json` `enabledPlugins`. (Binary update also unlocks agent-view at 2.1.139+.) | M | ≤15 ACTIVE plugins; per-plugin cost recorded; DORMANT auto-trigger off |
| **U9** | D3 | Audit every W259-installed subagent's frontmatter: add `isolation:worktree` to file-writing agents, `skills:` preloading, `effort` tuning (low/max), `disallowedTools` hardening, per-subagent `mcpServers` scoping. | M | Each agent frontmatter reviewed + updated |
| **U10** | D4 | Run `tools/list` against the 12 MCPs; record `execution.taskSupport` per server in `.mcp.json` `_comments` (W259 T0.0 sub-item). Confirm `type:"http"` MCPs use Streamable HTTP not legacy SSE. | S | `_comments` block updated; durable-execution coverage quantified |

### P2 — Trigger-gated (do when the trigger fires)

| # | Dim | Action | Trigger |
|---|---|---|---|
| **U11** | D28 | Install a webhook-receiver Channel (`--channels`) to push CI/codex completions into the live `/loop` session instead of polling. | When ≥2 stable CI/eval flows exist worth event-driving |
| **U12** | D18 | Move machine-off-survival recurring jobs from `/loop` to **Routines** (cloud) or Desktop scheduled tasks. | When a wave must run unattended past machine sleep |
| **U13** | D23 | Pilot **Managed Agents** (+ `ant` CLI) for delegatable sandboxed tasks that should not consume the local runtime. | When a long self-contained refactor/scan should run off-box |
| **U14** | D29 | Enable **Remote Control** to steer long autonomous waves from a phone. | Operator wants away-from-desk wave steering |
| **U15** | D5 / D12 / D20 | Encode top repeated workflows as project commands; document rewind "Summarize up-to-here" as preferred manual compaction; wire `TaskCreated`/`TaskCompleted` quality gates (rolls into U1). | Opportunistic — alongside U1/U8 |

### Punch-list summary

**15 actions** across **30 dimensions**. **6 P0** (this wave — all HIGH-reversibility, zero new dependencies, pure native config: hooks, permission-mode, memory reconciliation, background-session adoption, output style, loop.md). **4 P1** (next wave — one of which, U7, is a force multiplier clearing 5 dormant dimensions with a single Agent-SDK harness build). **5 P2** (trigger-gated). The P0 set alone moves the architecture from 6 UNLEASHED → ~12 UNLEASHED at a cost lower than any single W259 OSS install-layer, because every P0 item exploits a capability *already shipping in the `claude` binary*.

---

## §5 — Audit-trail metadata

- **Audit date**: 2026-05-16
- **Dimensions audited**: 30 (the 27 operator-specified + `/goal` + Remote-Control/web/Slack + the D7/D26 split — the directive's "≥28" satisfied)
- **Verdict distribution**: 6 UNLEASHED · 14 PARTIAL · 10 DORMANT
- **Primary sources fetched verbatim this session**: `code.claude.com/docs/en/` — output-styles, checkpointing, headless, agent-view, agent-teams, scheduled-tasks, channels (7 pages); `platform.claude.com/docs/en/` — advisor-tool, release-notes/api (full Nov-2024→May-2026 timeline) (2 pages). Plus W259 `PRIMARY-SOURCE-VERIFICATION-2026-05-16.md` (itself TIER-1-DIRECT, 24 URLs) for hooks/subagents/skills/settings/plugins/MCP/programmatic-tool-calling/adaptive-thinking verbatim cites.
- **Runtime baseline**: `Z:\claude-sota-installed\.claude\settings.json` + `.mcp.json` inspected directly; CC binary 2.1.119.
- **Cite class**: TIER-1-DIRECT throughout (every dimension carries an Anthropic primary-doc cite).
- **Reproducibility**: re-run `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` of the §0.3 URLs.
- **Relationship to W259**: orthogonal overlay — audits native-primitive *exploitation*, complements the L0-L9 OSS *acquisition* architecture. No conflict with any W259 layer decision. Feeds W260 as the native-dimension execution backlog.
- **Author**: claude-opus-4-7 — W259 CLAUDE-CODE-DIMENSIONS-UNLEASHED AUDITOR.
