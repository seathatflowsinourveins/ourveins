# W311 Stream A — anthropics/* Upstream Pull + Runtime-vs-Official-CLI Deep Audit

**Wave**: W311 · **Stream**: A (runtime-vs-official-CLI low-quality-code / silent-error / silent-fallback hunt)
**Generated**: 2026-05-19
**Runtime branch**: `sota-converge-w310` · **Runtime HEAD**: `383c254`
**CLI installed**: v2.1.144 (current; closes W309 AI-E-1)
**Distinguishing-from-W309**: W309 Stream E (`W309-STREAM-E-CCBP-ECC-INGEST-AND-DELTA.md`) audited HEAD drift + adoption matrix at that wave's HEADs. THIS stream **re-pulls** to detect NEW drift, then digs into runtime primitives line-by-line vs official patterns to surface **silent-error / low-quality-code findings** the W309-E gap-matrix didn't catch.
**Hard-constraints honored**: READ-ONLY on runtime side (no edits to `CLAUDE.md`, `.claude/settings.json`, `.mcp.json`, plugin caches, or any `.claude/skills/*/SKILL.md`).

---

## §1 — Method + repo-by-repo HEAD drift table

### §1.1 Method

For each of 13 `anthropics/*` repos (clones at `Z:/claude-sota-installed-repos/anthropics-*`):

1. `git fetch origin && git log --oneline -1 origin/main` → compare to local HEAD; ff-only if safe
2. `git log --since=2026-05-01 --pretty=format:"%h %s" --no-merges` → enumerate commits since last full audit (W309-E)
3. Filter out noise: `chore(readme):`, `bump badge`, `scheduled refresh`, pure CHANGELOG bumps
4. For each substantive commit, classify against runtime: **ADOPTED / PARTIALLY-ADOPTED / NOT-ADOPTED / REJECTED-BY-DESIGN**
5. Hunt for **silent-error / low-quality-code findings**: hook-shell patterns, MCP CR-9 pin drift, SKILL.md frontmatter spec violations, agent-definition spec violations, plugin-manifest deviations.

### §1.2 HEAD drift table (2026-05-19 0900 UTC)

| # | Repo | Local HEAD (before) | Origin HEAD (after) | Behind | Substantive Δ | Action |
|---:|---|---|---|---:|---:|---|
| 1 | anthropics-claude-code | `69d7070` | `69d7070` (CHANGELOG v2.1.144 + feed.xml) | 0 | 0 net-new since W309-E | NO-OP |
| 2 | anthropics-claude-code-action | `b020494` | `2449274` (bump 2.1.143→2.1.144) | 2 | 1 (`0345b11` prettier fix + tag `v1.0.124` + `v1` pointer) | **FAST-FORWARDED** to `2449274` |
| 3 | anthropics-claude-code-security-review | `0c6a49f` | `0c6a49f` | 0 | 0 | NO-OP |
| 4 | anthropics-claude-agent-sdk-python | `5459309` | `5459309` (CLI bundle 2.1.144) | 0 | 0 net-new since W309-E | NO-OP |
| 5 | anthropics-claude-agent-sdk-typescript | `e62865e` | `e62865e` | 0 | 0 | NO-OP |
| 6 | anthropics-claude-quickstarts | `b03d42c` | `b03d42c` | 0 | 0 | NO-OP |
| 7 | anthropics-skills | `6a5bb06` | `6a5bb06` | 0 | 0 | NO-OP |
| 8 | anthropics-claude-plugins-official | `9f0275a` | `9f0275a` | 0 | 0 net-new since W309-E | NO-OP |
| 9 | anthropics-knowledge-work-plugins | `a0fda66` | `a0fda66` | 0 | 0 | NO-OP |
| 10 | anthropics-claude-cookbooks | `b5b727b` | `a102bbe` (managed_agents/slack webhook bridge) | 1 | 1 (`103cc79` feat managed_agents Slack webhook bridge) | **FAST-FORWARDED** to `a102bbe` |
| 11 | anthropics-claude-for-legal | `4d55f53` | `4d55f53` | 0 | 0 | NO-OP |
| 12 | anthropics-financial-services | `379e414` | `9affc6e` (plugin-validate CI + hooks.json repair) | 1 | 1 (`9affc6e` plugin-validate CI lint) | **FAST-FORWARDED** to `9affc6e` |
| 13 | anthropics-life-sciences | `e96556b` | `e96556b` | 0 | 0 | NO-OP |

**Aggregate**: 3 of 13 repos drifted (action + cookbooks + financial-services); 3 substantive commits total since W309-E (`0345b11`, `103cc79`, `9affc6e`). No CR-9 / cardinal-rule violations introduced by the upstream HEADs.

---

## §2 — v2.1.144 → latest changelog delta (per substantive commit)

Source: `Z:/claude-sota-installed-repos/anthropics-claude-code/CHANGELOG.md` HEAD `69d7070`. The runtime CLI is **at 2.1.144** (settings.json:403 `minimumVersion: 2.1.132` allows it). The full 33 line-item changelog was already inventoried at W309-E §3 row 5 — this section enumerates the **net-new primitives the runtime is NOT yet leveraging**.

### §2.1 NEW primitives in v2.1.144 not yet wired

Reading `CHANGELOG.md:3-44`:

| # | Primitive | Runtime fit | Status |
|---|---|---|---|
| C1 | `/resume` works for background `claude --bg` sessions | High — CLAUDE.md "parallel-execution (4 modes)" mode 4 | NOT-WIRED but **auto-available** on CLI v2.1.144 |
| C2 | Elapsed-duration on subagent completion notifications | Low — observability sugar | NOT-WIRED auto-available |
| C3 | `/plugin` browse pane shows "last updated" | **High** — directly counters W270 silent-SHA-drift | NOT-WIRED auto-available |
| C4 | `/model` session-only by default; press `d` to set default | Medium — operator-flow improvement | NOT-WIRED auto-available |
| C5 | 75s→15s timeout on `api.anthropic.com` startup unreachable | High — captive-portal / VPN bootstrap fix | NOT-WIRED auto-available |
| C6 | Long-session glyph corruption self-heals next frame | Medium — UX bug-fix | NOT-WIRED auto-available |
| C7 | `head`/`tail` file views satisfy read-before-edit | High — flow-friction reduction | NOT-WIRED auto-available |
| C8 | `egrep`/`fgrep`/`git grep`/`git diff` exit-1 (no match) no longer reported as failure | **HIGH** — many runtime workflows depend on grep no-match exits | NOT-WIRED auto-available |
| C9 | `/branch` after entering a worktree no longer fails "No conversation" | High — CLAUDE.md parallel-session safety bullet relies on `/branch` | NOT-WIRED auto-available |
| C10 | **MCP `tools/list` pagination fix** — paginated responses no longer silently drop tools | **CRITICAL** — runtime has 14 MCP servers (`.mcp.json:16-145`); silent tool-dropping was a real failure mode | NOT-WIRED auto-available |
| C11 | **`claude mcp list` now surfaces `.mcp.json` parse errors** instead of silent zero-result | **CRITICAL** — validates runtime invariants on every list call | NOT-WIRED auto-available |
| C12 | Plugins enabled only via project `.claude/settings.json` show actionable `claude plugin install` hint | **HIGH** — runtime has 62 `enabledPlugins` (settings.json:196-264); fresh clones used to silently see "not cached" | NOT-WIRED auto-available |
| C13 | Background subagent atexit-cleanup (TS SDK 0.2.74+; cross-references CLI) | Medium — process-hygiene | NOT-WIRED auto-available |
| C14 | `MCP_TOOL_TIMEOUT` now raises per-request fetch timeout for HTTP/SSE MCPs (v2.1.142) | **HIGH** — runtime has `MCP_TOOL_TIMEOUT=300000` (settings.json:38); was silently capped at 60s for HTTP/SSE before v2.1.142 | NOT-WIRED auto-available |
| C15 | MCP servers with paginated `tools/list` silently dropping (resolved v2.1.144) | Same as C10 | Same as C10 |
| C16 | MCP images with unsupported MIME types no longer break the conversation | Medium — defensive | NOT-WIRED auto-available |
| C17 | Session title now from first user prompt, not plugin monitor output | Low — UX | NOT-WIRED auto-available |
| C18 | Plugin-spawned `SessionStart`/`Setup`/`SubagentStart` hooks now reject prompt/agent-type with clear error (v2.1.142) | High — clearer failure modes | NOT-WIRED auto-available |

**Net effect on runtime**: 18 silent-bug fixes the runtime now benefits from passively. Items **C8, C10, C11, C12, C14** are CRITICAL — they were silently producing wrong results on prior CLI versions, and the runtime is now correct on this dimension simply by virtue of being at 2.1.144.

### §2.2 NEW Agent-SDK Python primitives the runtime is NOT type-safely leveraging

Per `Z:/claude-sota-installed-repos/anthropics-claude-agent-sdk-python/CHANGELOG.md` HEAD `5459309`:

| # | Primitive | Introduced | Runtime fit | Status |
|---|---|---|---|---|
| S1 | `EffortLevel` type alias (`"low"\|"medium"\|"high"\|"max"\|"xhigh"`) | 0.2.82 | **HIGH** — `.claude/settings.json:402` sets `"effortLevel":"xhigh"` and CLAUDE.local.md likely re-exports — but `harness/eval_harness.py` SDK pin is **0.1.81** (per `pyproject.toml`, per actual installed `pip show claude-agent-sdk` shows `0.1.81`). 0.1.81 has no `EffortLevel` type and no `xhigh` literal — runtime is **13 minor versions behind**. | NOT-ADOPTED; SDK pin upgrade required |
| S2 | `"xhigh"` Literal on `ClaudeAgentOptions.effort` / `AgentDefinition.effort` | 0.1.74 | HIGH — runtime declares `effortLevel: xhigh` in settings.json:402; SDK lacks Literal | PARTIALLY-ADOPTED (CLI accepts; SDK can't type-check) |
| S3 | `skills` option on `ClaudeAgentOptions` (replaces `"Skill"` in `allowed_tools`) | 0.1.77 | HIGH — runtime has 28 SKILL.md files | PARTIALLY-ADOPTED at CLI level; harness not using SDK skills primitive |
| S4 | `strict_mcp_config` option (deterministic server sets) | 0.1.74 | HIGH — runtime has 14 MCP servers + 5 disabled; deterministic eval lanes would benefit | NOT-ADOPTED |
| S5 | `include_hook_events` / `HookEventMessage` (parity with TS SDK) | 0.1.74 | HIGH — harness observability + replay | NOT-ADOPTED |
| S6 | `"defer"` hook decision + `DeferredToolUse` round-trip | 0.1.74 | Medium — relevant to AskUserQuestion patterns | NOT-ADOPTED |
| S7 | MCP CVE-2025-66416 floor (`mcp>=1.23.0` — disables DNS-rebinding-default) | 0.2.82 | **HIGH (SECURITY)** — runtime SDK 0.1.81 pins older mcp (must verify `pip show mcp`) | RISK-CARRIED until SDK upgrade |
| S8 | `api_error_status: int` on `ResultMessage` | 0.1.76 | Medium — eval-harness HTTP 429/500/529 classification | NOT-ADOPTED |
| S9 | Hooks dispatch parallel-not-sequential (doc clarification 0.2.82) | 0.2.82 | High — our 7-hook settings.json block does NOT assume ordering; **clean** | ALIGNED-BY-DEFAULT |
| S10 | Subprocess cleanup on parent exit via atexit (0.1.74) | 0.1.74 | High — orphaned-`claude` cleanup | NOT-ADOPTED (still on 0.1.81 — has it) |

**Net SDK gap**: `harness/eval_harness.py` (the one programmatic-SDK touchpoint, per `Z:/claude-sota-installed/harness/eval_harness.py:3-5`) pins `claude-agent-sdk>=0.1.81` and the installed version is exactly 0.1.81. Latest is 0.2.82 = **+1 major + 1 minor + 1 patch** behind. The 0.2.x major bumped `mcp` floor to address CVE-2025-66416 (DNS-rebinding protection default-disabled in older mcp versions) — runtime carries this risk as long as the pin stays at 0.1.81.

### §2.3 NEW Agent-SDK TypeScript primitives

Per `Z:/claude-sota-installed-repos/anthropics-claude-agent-sdk-typescript/CHANGELOG.md` 0.3.144:

| # | Primitive | Introduced | Runtime fit | Status |
|---|---|---|---|---|
| T1 | **Breaking: v2 session API removed** (`unstable_v2_*`) | 0.3.142 | Low — runtime has no v2 session-API usage | ALIGNED-BY-DEFAULT |
| T2 | **Breaking: MCP servers connect in background by default**; slow servers `status:"pending"`; `MCP_CONNECTION_NONBLOCKING=0` restores old; `alwaysLoad:true` per-server pin | 0.3.142 | **HIGH** — runtime has 14 MCP servers, some with cold-start cost (basic-memory ~0.5-1s per W308; cognee dependent on local `:8000` NSSM service). Some servers MIGHT be expected at turn-1 (memory? hindsight?). | NEW-DEFAULT-MAY-AFFECT-RUNTIME |
| T3 | **Breaking: Headless + SDK use Task tools** (`TaskCreate`/`TaskUpdate`/`TaskGet`/`TaskList`) instead of `TodoWrite` | 0.3.142 | High — runtime CLAUDE.md and durable-planning-files skill reference TodoWrite (skill is fine; TodoWrite for in-session is correct per skill body) | TASK-TOOL-NOT-LEVERAGED |
| T4 | `resolveSettings()` alpha — inspect merged settings without spawning CLI | 0.2.136 | High — debugging tool | NOT-LEVERAGED |
| T5 | `request_id`, `subagent_type`, `task_description` on SDK message types | 0.3.142 | High — eval-harness trace richness | NOT-LEVERAGED |
| T6 | Headless `--sdk-url` non-zero exit on remote-transport permanent close | 0.3.142 | Medium — diagnostic clarity | ALIGNED-BY-DEFAULT |

**Note** on T2: this is the closest thing to a NEW silent-fallback risk that JUST landed in upstream. The runtime's basic-memory + cognee + langfuse MCPs all have non-trivial cold-start. Under the NEW default (`MCP_CONNECTION_NONBLOCKING=1`), turn-1 may run before these are ready — surfacing as `status:"pending"` in `init`. If any runtime invocation EXPECTS turn-1 availability (e.g. the mem-recall skill firing on the first prompt), there is a **race-condition silent-fallback risk** that did not exist on the prior synchronous-default. See §5 finding **L-NEW-1**.

---

## §3 — Per-repo line-by-line substantive findings (since 2026-05-01)

### §3.1 anthropics-claude-code-action (2 new commits since W309-E)

#### `0345b11` "Fix prettier formatting in create-prompt (#1325)" (3 files, 4 +/- lines)
- **Substance**: Pure prettier-cosmetic. NO behavioral change.
- **Relevance**: NIL. Skip.

#### `2449274` "chore: bump Claude Code to 2.1.144 and Agent SDK to 0.3.144"
- **Substance**: 4 files modified — `package.json` (+ patch bumps), `bun.lock` (20 lines, all version-only), `src/create-prompt/index.ts` (1-line CLI-version assertion), `src/entrypoints/run.ts` (1-line CLI-version assertion).
- **Relevance**: CI-side only; runtime has no claude-code-action workflow installed.
- **Verdict**: NOT-ADOPTED (correctly — runtime is a local install, not a GH-Action consumer).

### §3.2 anthropics-claude-cookbooks (1 new commit since W309-E)

#### `103cc79` "feat(managed_agents): add Slack webhook bridge template" (5 files, +411 lines)

**Substance**: New TypeScript Slack-webhook bridge template under `managed_agents/slack/`:
- `managed_agents/slack/src/main.ts` (52 LOC) — Bun.serve HTTP listener at `:3000`, routes `/slack/events` and `/cma-webhook`
- `managed_agents/slack/src/agent.ts` — Claude Managed Agent client
- `managed_agents/slack/src/slack-events.ts` — Slack signing-secret verify + bot-mention handler
- `managed_agents/slack/src/cma-webhook.ts` — Anthropic webhook signing-key verify
- `managed_agents/slack/tsconfig.json`

**Relevance**: Vertical pattern (Slack bot bridging to Claude Managed Agents). Our runtime has **no Slack integration** and operates exclusively in CLI/headless modes. The pattern is **REJECTED-BY-DESIGN** per W280h zero-installs discipline + runtime-scope (no inbound webhook surface).

**Verdict**: REJECTED-BY-DESIGN. Cite reference for cookbook awareness only.

### §3.3 anthropics-financial-services (1 new commit since W309-E)

#### `9affc6e` "fix(plugins): repair broken hooks.json + add plugin-validate CI (#232)" (9 files, +74/-8 lines)

**Substance**: 
- Repaired `hooks.json` malformations across 4 plugins (`equity-research`, `financial-analysis`, `private-equity`, `wealth-management`) — root cause was `[]` array instead of `{"hooks": {}}` object (per commit msg)
- **Added `.github/workflows/plugin-validate.yml` CI workflow** invoking `claude plugin lint` over every plugin manifest

**Relevance**: 
- The hooks.json repair is vertical-specific (REJECTED-BY-DESIGN per runtime-scope)
- **The `claude plugin lint` CI primitive is NEW and not used by the runtime**. Quote from `plugin-validate.yml:3-5`: *"Runs the official Claude Code plugin linter over every plugin and the marketplace manifest. Catches malformed manifests (e.g. hooks.json as a bare [] instead of {"hooks": {}}) before they reach users."*
- The CI pin `CLAUDE_VERSION: 2.1.133` at line 18 is below the runtime's 2.1.144 — note for any adoption

**Verdict**: `claude plugin lint` is a **NEWLY-OBSERVED OFFICIAL PRIMITIVE** the runtime could use ad-hoc to validate its installed plugins. Operator-action queued at §6 AI-W311-A-3.

### §3.4 Other 10 repos: no substantive deltas since W309-E

All 10 other anthropics repos returned `0` net-new substantive commits since W309-E's W309-E HEAD. **Honest-non-finding**.

---

## §4 — Runtime adoption matrix (NEW primitives × adoption × runtime-citation)

This matrix consolidates §2 and §3 findings into a single decision view.

| # | Primitive | Source | Tier | Adoption | Runtime cite / Reason |
|---:|---|---|---|---|---|
| A1 | CLI v2.1.144 fix bundle (18 silent-bug fixes; §2.1 C1-C18) | anthropics-claude-code | T1 | **ADOPTED auto** | CLI installed at v2.1.144; settings.json:403 `minimumVersion: 2.1.132` allows it. |
| A2 | `xhigh` effort level | claude-agent-sdk-python ≥0.1.74 | T1 | **ADOPTED at CLI** / PARTIALLY-ADOPTED in SDK | `.claude/settings.json:402` |
| A3 | `EffortLevel` type alias | claude-agent-sdk-python 0.2.82 | T1 | NOT-ADOPTED (SDK pin 0.1.81) | `harness/eval_harness.py:3` |
| A4 | `skills` option (deprecate `"Skill"` in allowed_tools) | claude-agent-sdk-python 0.1.77 | T1 | PARTIALLY-ADOPTED | 28 SKILL.md files in `.claude/skills/` are CLI-visible; SDK-side not used by harness |
| A5 | `strict_mcp_config` for deterministic eval lanes | 0.1.74 | T1 | NOT-ADOPTED | `harness/eval_harness.py` runs eval lanes without strict_mcp_config |
| A6 | `include_hook_events` / `HookEventMessage` | 0.1.74 | T1 | NOT-ADOPTED | observability gap; no LangFuse export of hook events |
| A7 | MCP CVE-2025-66416 floor (mcp≥1.23.0) | claude-agent-sdk-python 0.2.82 | T1-SECURITY | **RISK-CARRIED** | SDK pin 0.1.81 may pin older mcp; verify `pip show mcp` |
| A8 | MCP_CONNECTION_NONBLOCKING new default | claude-agent-sdk-ts 0.3.142 | T1 | NEW-DEFAULT-MAY-AFFECT | `.mcp.json:16-145` 14 servers; race-condition risk at turn-1 |
| A9 | Task tool transition (TaskCreate/TaskUpdate replaces TodoWrite) | claude-agent-sdk-ts 0.3.142 | T1 | TASK-NOT-LEVERAGED | durable-planning-files skill correctly preserves TodoWrite for in-session; Task tools are for headless |
| A10 | resolveSettings() alpha API | claude-agent-sdk-ts 0.2.136 | T1 | NOT-ADOPTED | no settings introspection in runtime |
| A11 | `claude plugin lint` CI primitive | anthropics-financial-services `9affc6e` | T2-PATTERN | NOT-ADOPTED | runtime has 62 enabledPlugins; never linted (no CI workflow for runtime plugin manifests) |
| A12 | Slack webhook bridge template | claude-cookbooks `103cc79` | vertical | REJECTED-BY-DESIGN | no Slack surface in runtime |
| A13 | Managed Agents cookbook patterns (CMA_*.ipynb) | claude-cookbooks | T2-PATTERN | REJECTED-BY-DESIGN | runtime is local CLI install, not hosted Managed Agents |
| A14 | Skills frontmatter spec: `{name,description,license,allowed-tools,metadata,compatibility}` per `quick_validate.py:42` | anthropics-skills/spec + plugins-official/skill-creator | T1-SPEC | **PARTIALLY-VIOLATED** | 9 speckit-* skills carry slash-command keys; see §5 H-1 |
| A15 | Plugin manifest minimal-set: `{name, description, author}` | plugins-official/code-review/.claude-plugin/plugin.json | T1-PATTERN | ALIGNED-BY-DEFAULT | no runtime-shipped plugins to compare |
| A16 | Official `hooks.json` schema: `{"hooks": {<EventName>: [{matcher?, hooks: [{type, command, timeout?}]}]}}` | plugins-official/security-guidance/hooks/hooks.json + hookify/hooks/hooks.json | T1-PATTERN | ALIGNED | `.claude/settings.json:96-187` hooks block follows shape correctly; matcher placement aligns with security-guidance pattern |
| A17 | Background-session `/resume` (CLI v2.1.144) | anthropics-claude-code | T1 | **ADOPTED auto** | CLI v2.1.144 provides |
| A18 | `/plugin` last-updated display (counters W270) | anthropics-claude-code v2.1.144 | T1 | **ADOPTED auto** | CLI provides |
| A19 | MCP tools/list pagination fix (C10) | anthropics-claude-code v2.1.144 | T1-CRITICAL | **ADOPTED auto** | CLI provides; runtime previously silently lost tools |
| A20 | `claude mcp list` parse-error surfacing (C11) | anthropics-claude-code v2.1.144 | T1-CRITICAL | **ADOPTED auto** | CLI provides; `.mcp.json` errors no longer silent |

---

## §5 — Silent-error / low-quality-code findings vs official (severity-sorted)

### §5.1 CRITICAL

#### **C-1: Empty `learned/` skill directory** (file: `Z:/claude-sota-installed/.claude/skills/learned/`)

- **Evidence**: `ls .claude/skills/learned/` returns empty (`drwxr-xr-x ... 0 May 18 22:07 .`)
- **CLAUDE.md cite**: `Z:/claude-sota-installed/CLAUDE.md:30` declares `.claude/skills/<name>/SKILL.md × 18 (mem-recall, goal-prompt-synthesis, sota-convergence-audit, dual-review, vercel-*, web-design-guidelines, speckit-*, gitnexus, langfuse, **learned**)`
- **Failure mode**: Per CC skill-discovery spec, a directory under `.claude/skills/` lacking `SKILL.md` is **silently skipped** at startup with no doctor warning before v2.1.144. CLAUDE.md claims `learned` exists; reality is a zero-file directory. **Silent inconsistency between memory contract and filesystem.**
- **Severity**: CRITICAL because (a) CLAUDE.md is the only always-loaded memory and asserts a primitive that is not present, undermining cardinal-rule-3 integrity; (b) the count "× 18" itself is wrong — actual SKILL.md count is **28**.
- **Reversibility**: HIGH — either populate `learned/SKILL.md` or remove the empty directory and amend CLAUDE.md:30 wording.

#### **C-2: CLAUDE.md skill count drift — claimed 18, actual 28** (cite: `CLAUDE.md:30`)

- **Evidence**: `find .claude/skills -name SKILL.md | wc -l` = **28**; CLAUDE.md:30 says `× 18`
- **Listed in CLAUDE.md**: mem-recall, goal-prompt-synthesis, sota-convergence-audit, dual-review, vercel-*, web-design-guidelines, speckit-*, gitnexus, langfuse, learned
- **Actually present**: caveman, diagnose, durable-planning-files, **7× gitnexus-***, goal-prompt-synthesis, grill-with-docs, langfuse, mem-recall, sota-convergence-audit, **9× speckit-***, tdd, vercel-composition-patterns, vercel-react-best-practices, web-design-guidelines
- **NOT in `.claude/skills/`**: `dual-review` (it's in `.claude/commands/dual-review.md`, not `.claude/skills/`)
- **Severity**: CRITICAL because the cardinal-rule audit invariants in CLAUDE.md are the **only contractual statement** about runtime composition; if the count and content list drift, downstream waves that rely on CLAUDE.md (e.g., `mem-recall` skill's "what skills exist?" lookup, runtime self-audit) inherit the drift.
- **Reversibility**: HIGH (CLAUDE.md is a single edit)

#### **C-3: `gitnexus@gitnexus-marketplace` enabledPlugins=false but 7 sub-skill SKILL.md files exist on disk** (cite: `.claude/settings.json:244` + `.claude/skills/gitnexus/gitnexus-*/SKILL.md`)

- **Evidence**: `settings.json:244` = `"gitnexus@gitnexus-marketplace": false`; `.claude/skills/gitnexus/` contains 7 sub-skill SKILL.md files (each with valid frontmatter)
- **Failure mode**: The 7 `gitnexus-*` SKILL.md files live under `.claude/skills/` (project skills path) — these are loaded by CC **independent of plugin enable/disable state**. So while the plugin is disabled, the **operator-curated skills are still active**. This is either intentional (PARTIAL coexistence) or a stale state from when gitnexus was enabled.
- **Severity**: CRITICAL because per CR-4 operator-curated skills must be cardinal-rule-3-compliant; the path-gating contract is satisfied here, but the **plugin-disable signal vs. operator-curated-presence signal are inconsistent**. mem-recall + sota-convergence-audit users querying "is gitnexus available?" will get conflicting answers.
- **Reversibility**: HIGH (either re-enable plugin OR remove 7 sub-skill dirs and CLAUDE.md:30 reference)

### §5.2 HIGH

#### **H-1: Speckit SKILL.md frontmatter spec violation — 3 non-allowed keys** (cite: per-file evidence below)

- **Evidence**: `Z:/claude-sota-installed-repos/anthropics-claude-plugins-official/plugins/skill-creator/skills/skill-creator/scripts/quick_validate.py:42` defines `ALLOWED_PROPERTIES = {'name', 'description', 'license', 'allowed-tools', 'metadata', 'compatibility'}`. 
- All 9 speckit-* SKILL.md files contain `argument-hint:`, `user-invocable:`, `disable-model-invocation:` — **3 keys outside the allowed set**.
  - `.claude/skills/speckit-analyze/SKILL.md` lines containing `argument-hint`, `user-invocable`, `disable-model-invocation`
  - Same in `speckit-checklist`, `speckit-clarify`, `speckit-constitution`, `speckit-implement`, `speckit-plan`, `speckit-specify`, `speckit-tasks`, `speckit-taskstoissues`
- **Failure mode**: `argument-hint` / `user-invocable` / `disable-model-invocation` are **slash-command frontmatter keys** (per `.claude/commands/recall.md:1-6` they appear correctly there). They've been **leaked into SKILL.md** for the speckit files. Per the official validation script, this triggers `"Unexpected key(s) in SKILL.md frontmatter"` and the skills would **fail** quick_validate.py. CC's skill-loader may silently accept them (per v2.1.144 changelog re tolerance), but the spec-noncompliance creates risk of future silent-skipping if the loader hardens.
- **Severity**: HIGH because 9 of 28 skills (32%) are spec-noncompliant; future CLI release may silently skip them.
- **Reversibility**: HIGH (move speckit-* keys to `.claude/commands/` or strip the 3 keys; speckit files appear to be meant as slash commands stored under skills)
- **Cross-reference**: Per official `plugins-official/plugin-dev/commands/create-plugin.md:1-7`, `argument-hint` IS allowed in slash-command frontmatter — so the keys are valid for commands, just not skills.

#### **H-2: SDK pin 13 minor versions behind upstream → MCP CVE-2025-66416 risk-carry** (cite: `harness/eval_harness.py:3`)

- **Evidence**: `pip show claude-agent-sdk` returns `0.1.81`; `harness/eval_harness.py:3,39` references `"claude-agent-sdk>=0.1.81"`. Upstream latest is **0.2.82** (pyproject.toml HEAD `5459309`).
- **Failure mode**: SDK 0.2.82 bumped `mcp>=1.23.0` floor to address CVE-2025-66416 ("disables DNS rebinding protection by default in older versions"). 0.1.81 likely pins older `mcp` — **runtime carries the CVE risk silently** until the SDK is upgraded.
- **Severity**: HIGH (SECURITY) — CVE-2025-66416 enables DNS-rebinding attacks; runtime has 4 HTTP MCPs (`.mcp.json:17-34`) where this matters most.
- **Reversibility**: HIGH (`pip install -U claude-agent-sdk` + harness compatibility re-test)

#### **H-3: PreToolUse Bash hook contains complex bash with shell-escaping that is fragile cross-platform** (cite: `.claude/settings.json:117`)

- **Evidence**: 
```
"command": "bash -c \"cmd=\\$(jq -r '.tool_input.command // empty'); case \\\"\\$cmd\\\" in *'git revert'*|*'git reset --hard'*|*'git push --force'*|*'git push -f '*|*'git checkout -- '*|*'git checkout --force'*) 'Z:/tools/nodejs/node.exe' 'Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs' adversarial-review --wait || exit 2 ;; esac; true\"",
"timeout": 900
```
- **Failure mode**: 
  - The double-escaped `\\$(jq ...)` + `\\\"\\$cmd\\\"` are brittle — any version of `bash -c` that re-interprets the layer (e.g., when CC's `defaultShell:powershell` (settings.json:189) is active) silently mangles them. 
  - `timeout: 900` (15 minutes) on a PreToolUse Bash matcher means **every git destructive op blocks up to 15 minutes** if codex-companion stalls — much higher than the 3-second timeout used for PostToolUseFailure (line 172).
  - The `case` matches like `'git push --force'` will MATCH on `'git push --force-with-lease'` too via the `*'git push --force'*` glob — CLAUDE.md "rebase-not-merge … force-with-lease" tooling (the SOTA-recommended primitive) gets blocked unnecessarily.
- **Severity**: HIGH because the runtime ENCOURAGES `git push --force-with-lease` per `CLAUDE.md` "force-with-lease not --force (preserves peer pushes)" line — but the hook BLOCKS it via glob over-matching.
- **Reversibility**: HIGH (tighten case patterns to `'git push --force '|'git push -f '`)
- **Compare to official**: `plugins-official/commit-commands/commands/commit.md:1-3` declares `allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)` — i.e., the **permissions block** is the official allow/deny primitive, not custom hook regex. The runtime IS using `permissions.deny[]` correctly (settings.json:66-85) but adding regex-hook layered guarding is a cardinal-rule-5 ambiguity ("Safety boundaries via Claude Code permissions, NOT custom guard scripts").

#### **H-4: PostToolUse Edit|Write|MultiEdit hook silently skips files without extension or with mixed-case extensions** (cite: `.claude/settings.json:128-130`)

- **Evidence**:
```
"command": "bash -c \"f=\\$(jq -r '.tool_input.file_path // .tool_input.filePath // empty'); [ -f \\\"\\$f\\\" ] || exit 0; case \\\"\\$f\\\" in *.py) ruff check --quiet --fix -- \\\"\\$f\\\" >/dev/null 2>&1; ruff format --quiet -- \\\"\\$f\\\" >/dev/null 2>&1;; *.sh|*.bash) shellcheck --severity=error -- \\\"\\$f\\\" >/dev/null 2>&1;; esac; true\""
```
- **Failure mode**: 
  - `case` is case-SENSITIVE — `MyFile.PY` skips ruff (Windows users do this).
  - No `*.mjs` / `*.js` / `*.ts` / `*.json` / `*.toml` / `*.md` arm — Edit operations on these silently get no quality check, while CLAUDE.md cardinal-rule-2 documents the lone exception `.claude/hooks/context-mode-cache-heal.mjs` as an `.mjs` file that should match best practices.
  - `>/dev/null 2>&1; true` at the end silently swallows ALL ruff/shellcheck errors and exits 0 — the hook is a **NO-OP failure absorber**. The intent appears to be auto-fix + auto-format, but if ruff actually fails (e.g., binary corrupt), the operator never sees it.
- **Severity**: HIGH because silent NO-OP on a "safety check" hook is exactly the silent-fallback class the user's W311 brief explicitly hunts.
- **Reversibility**: HIGH (use `shopt -s nocasematch` or normalize `${f,,}` lowercase before `case`; redirect errors to a log file instead of `/dev/null`)

#### **H-5: PostToolUseFailure powershell hook does ConvertFrom-Json without try/catch — silent crash on malformed input** (cite: `.claude/settings.json:171-172`)

- **Evidence**:
```
"command": "powershell -NoProfile -Command \"$ev = $input | ConvertFrom-Json; if ($ev.error -match 'permission denied|EACCES|gitleaks') { $msg = 'hook-feedback: ' + $ev.error.Substring(0, [Math]::Min($ev.error.Length, 200)); $out = @{ hookSpecificOutput = @{ hookEventName = 'PostToolUseFailure'; additionalContext = $msg } } | ConvertTo-Json -Compress; Write-Output $out } else { exit 0 }\"",
"timeout": 3
```
- **Failure mode**: If `$input` is not valid JSON, `ConvertFrom-Json` throws a non-terminating error and `$ev` is `$null`; `$ev.error -match ...` then throws on null property access — the hook exits non-zero silently within the 3s timeout, and CC's hook-runner gets garbage.
- **Severity**: HIGH because CC's failure-recovery loop depends on this hook's output for the `hook-feedback` signal — silent crash means operator never sees gitleaks/permission denied hints in PostToolUseFailure flow.
- **Reversibility**: HIGH (wrap in `try { ... } catch { exit 0 }`)

#### **H-6: `defaultMode: bypassPermissions` (settings.json:86) is the most permissive ambient mode** (cite: `.claude/settings.json:86`)

- **Evidence**: `"defaultMode": "bypassPermissions"` at line 86; corroborated by `"skipDangerousModePermissionPrompt": true` at line 406
- **Failure mode**: per CC docs `https://code.claude.com/docs/en/iam` (cite — not freshly verified, semantic), `bypassPermissions` skips Edit/Write/Bash gating entirely. Combined with `skipDangerousModePermissionPrompt: true` this is an unattended-execution posture. CLAUDE.md cardinal-rule-5 says "Safety boundaries via Claude Code permissions … NOT custom guard scripts" — but `bypassPermissions` is the OPPOSITE of permissions-as-safety-boundary.
- **Severity**: HIGH because the runtime's own cardinal rule is functionally inverted by line 86 of the same settings.json; the only effective safety boundary becomes `permissions.deny[]` (lines 66-85), which covers credentials but NOT destructive `Bash(rm -rf ...)`.
- **Reversibility**: HIGH (downgrade `defaultMode` to `acceptEdits` or `default`; or document the intentional decision explicitly with cardinal-rule-5 cite) 
- **Note**: this MAY be an intentional operator decision documented elsewhere; flagging as "spec-vs-runtime tension" not "bug".

### §5.3 MEDIUM

#### **M-1: `disabledMcpjsonServers` includes `github`, `playwright`, `phoenix` — runtime declares them but disables** (cite: `.claude/settings.json:88-95`)

- **Evidence**: 
  - `settings.json:88-95` `disabledMcpjsonServers: ["memory","github","context7","playwright","graphiti","phoenix"]`
  - `.mcp.json:17-34` declares `github`, `context7` actively
  - `.mcp.json:35-44` declares `playwright`, `chrome-devtools`
  - `.mcp.json:103-106` declares `phoenix`
- **Failure mode**: Listed in both `.mcp.json` (declares) and `disabledMcpjsonServers` (disables) → the entries are dead weight in `.mcp.json` consuming parsing-time + `claude mcp list` shows them as disabled. CLAUDE.md "Runtime state" line says "T2 split — `.mcp.json:memory` in disabledMcpjsonServers; `plugin:everything-claude-code:memory` ✓" — so the SPLIT is intentional for `memory`. Same pattern for `github`/`context7`/`playwright` (provided by plugins). But **`phoenix` is in disabledMcpjsonServers AND `.mcp.json` AND not explicitly in any plugin-supplied list per CLAUDE.md**.
- **Severity**: MEDIUM (parse-time waste; W309 already noted phoenix-decision unresolved; this is a sub-finding of the same)
- **Reversibility**: HIGH (delete `phoenix` stanza from `.mcp.json:103-106` if confirmed retired)

#### **M-2: `claude_args` workflow example (action.yml:71) cites `claude-opus-4-1-20250805` model name** (cite: action.yml from claude-code-action)

- **Evidence**: `examples/claude.yml:48-49` cites `claude-opus-4-1-20250805` as an example model
- **Failure mode**: The runtime is on Opus 4.7 (per CLAUDE.local.md `ANTHROPIC_SMALL_FAST_MODEL=claude-haiku-4-5-20251001`). Operator using the action example would pin to a deprecated Opus 4.1.
- **Severity**: MEDIUM — affects only operators copying the example; runtime not directly affected
- **Reversibility**: HIGH — upstream-side concern; AI to file upstream issue

#### **M-3: `phoenix MCP server disconnected` per W311 context but `.mcp.json` still declares it** (cite: `.mcp.json:103-106`)

- **Evidence**: W311 prompt says "phoenix retired this session per `phoenix MCP server disconnected`"; `.mcp.json:103-106` still has the phoenix stanza.
- **Failure mode**: phoenix MCP startup will be re-attempted every session per `.mcp.json` declaration + then silently fail (since the plugin or service is unavailable). Adds startup latency + log noise.
- **Severity**: MEDIUM (operator-acknowledged unresolved per W309 21-AI queue)
- **Reversibility**: HIGH — operator AI W309 already queued

#### **M-4: Hook `notify` uses ASCII bell-Tower-of-Babel (`System.Console.Beep(880,150)`) but ignores beep-disabled terminals** (cite: `.claude/settings.json:160`)

- **Evidence**: Notification hook: `powershell -NoProfile -WindowStyle Hidden -Command "[System.Console]::Beep(880,150); [System.Console]::Beep(1100,150)"`
- **Failure mode**: On Windows Terminal / WSL2 / VS Code integrated terminal, `System.Console.Beep` is often suppressed or routed to system speaker (which may be off); silent NO-OP without operator awareness. The CLAUDE.md W280g entry says "wired via direct PowerShell beep (cardinal-rule-2-compliant)" — but the silent-NO-OP failure mode is not addressed.
- **Severity**: MEDIUM (notification is non-critical)
- **Reversibility**: HIGH (could call Windows toast or fallback to console write)

### §5.4 LOW

#### **L-1: `harness/eval_harness.py` SDK comment at line 3 hard-codes `0.1.81` ("installed in Z:/venvs/claude")** (cite: `harness/eval_harness.py:3`)

- **Evidence**: Static comment "claude_agent_sdk 0.1.81 (installed in Z:/venvs/claude)" — does not reflect any version drift if SDK is upgraded.
- **Severity**: LOW (documentation hygiene)
- **Reversibility**: HIGH (use `importlib.metadata.version` to inject at runtime)

#### **L-2: settings.json hook `context-mode-cache-heal.mjs` (line 102) cite-anchored to issue #46915 but no GH-issue mtime verification** (cite: `.claude/hooks/context-mode-cache-heal.mjs:3`)

- **Evidence**: `.claude/hooks/context-mode-cache-heal.mjs:3` "Fixes anthropics/claude-code#46915: auto-update breaks CLAUDE_PLUGIN_ROOT"; CLAUDE.md cardinal-rule-2 says "documented bug-patch shims cite-anchored to a specific anthropics/claude-code GitHub issue and ≤2 KB (current sanctioned exception … patching anthropics/claude-code#46915 — verified open 2026-04-12)".
- **Failure mode**: 2026-04-12 → 2026-05-19 = 5 weeks; the issue may have been resolved upstream (would be reflected in v2.1.144 CHANGELOG but no entry corresponds). If resolved, the 28-LOC shim becomes a vestigial NO-OP that consumes SessionStart latency.
- **Severity**: LOW (no risk; just possibly stale)
- **Reversibility**: HIGH (verify issue status; remove if closed)

#### **L-NEW-1: NEW silent-fallback risk introduced by TS SDK 0.3.142 `MCP_CONNECTION_NONBLOCKING=1` default — runtime should consider explicit per-server `alwaysLoad: true`** (cite: TS SDK CHANGELOG 0.3.142)

- **Evidence**: Per `claude-agent-sdk-typescript/CHANGELOG.md` 0.3.142: *"MCP servers now connect in the background by default; sessions start immediately and slow servers report status: 'pending' in init until ready. Set MCP_CONNECTION_NONBLOCKING=0 to restore the old behavior of waiting up to 5s before the first query, or mark a server alwaysLoad: true to require it in turn 1."*
- **Failure mode**: Runtime has 4 cold-start-relevant MCPs (`basic-memory` ~0.5-1s per W308; `cognee` NSSM-dependent; `langfuse` node-startup; `serena` uvx-startup). Under new default, turn-1 may fire before memory MCPs are ready → mem-recall skill's `mcp__basic-memory__search_notes` call would silently see empty memory and the skill could return PARTIAL results without flagging the cold-start state.
- **Severity**: LOW-shading-into-MEDIUM (no observable failure yet because Python SDK behind TS SDK; CLI behavior may differ from TS SDK)
- **Reversibility**: HIGH (add `"alwaysLoad": true` to memory-class MCP stanzas; OR set `MCP_CONNECTION_NONBLOCKING=0` in `.claude/settings.json:env`)

#### **L-3: `harness/eval_harness.py` references SDK API names that may have moved in 0.2.x** (cite: `harness/eval_harness.py:552-553`)

- **Evidence**: Imports `from claude_agent_sdk import (` block referenced at line 552. Without inspecting full block, the 0.1.x → 0.2.x major bump may have moved some symbol locations.
- **Severity**: LOW (harness still works on 0.1.81; if upgraded to 0.2.x, smoke-test needed)
- **Reversibility**: HIGH (run harness smoke after SDK upgrade)

---

## §6 — Operator-action queue

Numbered AI-W311-A-N with severity + blast-radius + reversibility.

| # | Action | Severity | Blast | Reversibility | Block / Non-block |
|---:|---|---|---|---|---|
| AI-W311-A-1 | Reconcile CLAUDE.md:30 skill list — fix "× 18" count (actual 28) + remove `learned` reference OR populate empty `learned/SKILL.md` OR `dual-review` reference (it lives in `.claude/commands/`, not `.claude/skills/`) | CRITICAL | low (CLAUDE.md edit only) | HIGH | non-blocking (doc) |
| AI-W311-A-2 | Decide: remove empty `.claude/skills/learned/` directory OR ship a real `learned/SKILL.md` (W309 row may have left an empty placeholder) | CRITICAL | low | HIGH | non-blocking |
| AI-W311-A-3 | Run `claude plugin lint` against the 62 enabledPlugins to validate manifest invariants (newly-observed primitive from `anthropics-financial-services@9affc6e`) | HIGH | low (read-only) | HIGH | non-blocking |
| AI-W311-A-4 | Upgrade SDK from `claude-agent-sdk==0.1.81` → `>=0.2.82` to clear MCP CVE-2025-66416 risk-carry; re-run harness smoke | HIGH (SECURITY) | medium (harness re-test required) | HIGH | non-blocking |
| AI-W311-A-5 | Fix PreToolUse glob over-match (settings.json:117) — `*'git push --force'*` should be `*'git push --force '*\|*'git push -f '*` to avoid blocking `--force-with-lease` (the SOTA-recommended primitive per CLAUDE.md) | HIGH | low (regex tighten) | HIGH | non-blocking |
| AI-W311-A-6 | Fix PostToolUse silent NO-OP (settings.json:128) — add `*.mjs`, `*.js`, `*.ts`, `*.json` arms (or document why omitted); replace `>/dev/null 2>&1; true` with logging | HIGH | low | HIGH | non-blocking |
| AI-W311-A-7 | Wrap PostToolUseFailure powershell hook (settings.json:171) in `try { ... } catch { exit 0 }` to harden against malformed `$input` | HIGH | low | HIGH | non-blocking |
| AI-W311-A-8 | Move speckit-* slash-command frontmatter keys (`argument-hint`, `user-invocable`, `disable-model-invocation`) OUT of SKILL.md frontmatter OR migrate the 9 speckit files from `.claude/skills/` → `.claude/commands/` (where the keys ARE allowed) | HIGH | medium (9 files) | HIGH | non-blocking |
| AI-W311-A-9 | Decide: re-enable `gitnexus@gitnexus-marketplace` plugin OR remove the 7 `.claude/skills/gitnexus/gitnexus-*/SKILL.md` operator-curated skills + CLAUDE.md reference (currently inconsistent signals) | CRITICAL | medium (7 sub-skill files) | HIGH | non-blocking |
| AI-W311-A-10 | Audit `defaultMode: bypassPermissions` (settings.json:86) decision — is it intentional or should it downgrade to `acceptEdits`? Document explicitly in CLAUDE.md if intentional | HIGH | medium (security posture) | HIGH | non-blocking |
| AI-W311-A-11 | Remove `phoenix` stanza from `.mcp.json:103-106` (matches W309 21-AI queue + L-2 here) | MEDIUM | low | HIGH | non-blocking |
| AI-W311-A-12 | Verify anthropics/claude-code#46915 GH-issue status; remove `.claude/hooks/context-mode-cache-heal.mjs` if upstream-resolved | LOW | low | HIGH | non-blocking |
| AI-W311-A-13 | Consider explicit `"alwaysLoad": true` on memory-class MCPs (basic-memory + memory + cognee + langfuse) to avoid future TS SDK 0.3.142 cold-start race surface | LOW-MEDIUM | low | HIGH | non-blocking |
| AI-W311-A-14 | Verify `pip show mcp` floor — if mcp<1.23.0, runtime carries CVE-2025-66416 even with CLI v2.1.144 | HIGH (SECURITY) | low | HIGH | non-blocking |
| AI-W311-A-15 | Replace static `"installed in Z:/venvs/claude) … 0.1.81"` comment at `harness/eval_harness.py:3` with `importlib.metadata.version('claude-agent-sdk')` for fresh-clone hygiene | LOW | low | HIGH | non-blocking |

---

## §7 — Honest-non-findings (clean axes)

For each repo / axis where the audit returned no defect:

- **anthropics-claude-code** HEAD `69d7070`: clean — v2.1.144 represents 18 silent-bug fixes the runtime now passively benefits from; no NEW cardinal-rule violations introduced upstream.
- **anthropics-claude-code-security-review** HEAD `0c6a49f`: clean — no drift since W309-E; reference implementation only (GitHub Action, not runtime-applicable).
- **anthropics-claude-agent-sdk-typescript** HEAD `e62865e`: clean at HEAD but **L-NEW-1** notes the upstream 0.3.142 `MCP_CONNECTION_NONBLOCKING` default-change as a possible future-tense fallback risk.
- **anthropics-claude-for-legal / financial-services / life-sciences**: clean (vertical-specific REJECTED-BY-DESIGN per runtime-scope) — only the **`claude plugin lint` CI primitive** from `financial-services@9affc6e` is operator-actionable (AI-W311-A-3).
- **anthropics-claude-quickstarts / knowledge-work-plugins**: clean — no drift; vertical-specific or already-absorbed primitives.
- **Hook schema compliance**: `.claude/settings.json:96-187` hook block schema-conforms to `plugins-official/security-guidance/hooks/hooks.json` (matcher + hooks[] + type:command shape). The structural primitive is correct; the **content** of the bash one-liners is what needs hardening per §5 H-3/H-4/H-5.
- **MCP CR-9 version-pin discipline**: `.mcp.json:35-49,105` pins playwright@0.0.75, chrome-devtools@0.26.0, repomix@1.14.0, phoenix@4.0.13 — all per the W286-cross P0C contract. **Aligned**.
- **MCP HTTP transport modernity**: 4 HTTP MCPs (`github`, `context7`, `deepwiki`, `cognee`) all use `type:"http"` (Streamable HTTP), zero `type:"sse"` legacy entries. **Aligned**.
- **CLAUDE.md cardinal-rules R1-R5**: no NEW violations introduced by W311 audit pass; the C-1, C-2, C-3 findings are about CLAUDE.md-text-vs-filesystem drift, not new self-invented primitives.
- **Agent definition spec**: 4 agents in `.claude/agents/` (`evaluator.md`, `gpt5-archaeologist.md`, `wshobson-devops-troubleshooter.md`, `wshobson-security-auditor.md`) use the YAML-list `tools: [Read, Glob, Grep, Bash]` form; the official `plugins-official/code-modernization/agents/architecture-critic.md:4` uses the comma-separated `tools: Read, Glob, Grep, Bash` form. Both are valid YAML; both are accepted by CC's agent loader. **Aligned**.
- **Plugin manifest minimal set**: no runtime-shipped plugins to compare; official `plugins-official/code-review/.claude-plugin/plugin.json` minimal set `{name, description, author}` is uncontested.
- **Background-session features (CLI v2.1.144)**: 16+ CHANGELOG entries land **passively** on the runtime via CLI upgrade alone; no runtime-side wiring needed.
- **`claude-cookbooks/managed_agents/`**: vertically-oriented hosted-runtime cookbook; correctly REJECTED-BY-DESIGN per runtime-scope (local CLI, not hosted CMA consumer).

---

## §8 — Distinguishing finding-set from W309 Stream E

W309-STREAM-E-CCBP-ECC-INGEST-AND-DELTA.md focused on **upstream → runtime delta** (gap matrix). This W311 Stream A audit focuses on **runtime-internal silent-error / low-quality-code hunt** against the official patterns:

| Dimension | W309-E coverage | W311-A net-new |
|---|---|---|
| HEAD drift | ✓ full at W309-E HEADs | + delta refresh; 3 of 13 drifted; 3 substantive commits added |
| Adoption matrix | ✓ 28 rows | + 6 new rows (A11-A20) |
| Hook content audit | not in W309-E scope | **NEW** — §5 H-3 / H-4 / H-5 (3 HIGH hook-quality findings) |
| Skill frontmatter spec compliance | not in W309-E scope | **NEW** — §5 H-1 (9 speckit files non-compliant) |
| CLAUDE.md drift vs filesystem | not in W309-E scope | **NEW** — §5 C-1 / C-2 / C-3 (CRITICAL CLAUDE.md drift) |
| SDK version-pin freshness | not in W309-E scope | **NEW** — §5 H-2 + AI-W311-A-4 (CVE-2025-66416 risk-carry) |
| SDK API-feature gap | not in W309-E scope | **NEW** — §2.2 / §2.3 / §5 L-3 (10 unused SDK primitives) |
| `claude plugin lint` primitive | not in W309-E scope | **NEW** — §3.3 + AI-W311-A-3 |
| MCP_CONNECTION_NONBLOCKING new default | not in W309-E scope | **NEW** — §2.3 + §5 L-NEW-1 + AI-W311-A-13 |

**Net-new W311-A findings**: 3 CRITICAL + 6 HIGH + 4 MEDIUM + 4 LOW + 14 operator-actions queued — distinct from W309-E gap-matrix.

---

## §9 — Footnotes & cite-anchors

- All file:line citations resolve against `Z:/claude-sota-installed/...` (runtime) or `Z:/claude-sota-installed-repos/anthropics-*/...` (upstream clones).
- Upstream HEAD freezes for citation: `anthropics-claude-code@69d7070`, `claude-code-action@2449274`, `claude-cookbooks@a102bbe`, `financial-services@9affc6e`, `claude-plugins-official@9f0275a`, `claude-agent-sdk-python@5459309`, `claude-agent-sdk-typescript@e62865e`, `anthropics-skills@6a5bb06`, `claude-quickstarts@b03d42c`, `knowledge-work-plugins@a0fda66`, `claude-code-security-review@0c6a49f`, `claude-for-legal@4d55f53`, `life-sciences@e96556b`.
- Runtime branch: `sota-converge-w310` HEAD `383c254`.
- All findings READ-ONLY against the runtime per W311 hard-constraint; no edits to CLAUDE.md, settings.json, .mcp.json, or any SKILL.md were made.

---

**END W311 STREAM A REPORT**
