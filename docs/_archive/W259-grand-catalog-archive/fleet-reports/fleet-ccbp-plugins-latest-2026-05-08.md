# Fleet probe — CCBP HEAD bump + 4 plugin upstreams + advanced unleashed-mode delta

**Probe date**: 2026-05-08
**Cardinal-rule references**: CR-1 cite-discipline, CR-3 cross-model T1-T7, CR-6 fresh-from-github native install, CR-12 upstream-install-priority

---

## 1. CCBP HEAD bump delta

- **OLD pinned**: `64fffd53a7c6f8e2e0b1575fdd200b65cda04737` (in `Z:\claude-sota-installed\CLAUDE.md`)
- **NEW origin/main HEAD**: `bcaa2cc` (2026-05-08)
- **Commits in range**: 32 (`git log --oneline 64fffd53..origin/main | wc -l`)
- **Code-relevant docs touched (`best-practice/` + `reports/` + `tips/` + `development-workflows/`)**: **ZERO**
- **Delta content**: presentation slides 9-29 reformat (LLM tokenization SVGs, Uncle Bob counterpoint slide), `agent-collections` workflow registry add, README badge bumps to v2.1.128, agent-collections changelog. **No setting/env/hook/MCP/cross-model/memory/tip surface changed.**
- **Action**: bump CLAUDE.md cite anchors from `64fffd53` to `bcaa2cc` is OPTIONAL — cite-content in scope is identical. Hold pin until next code-relevant CCBP commit lands.

---

## 2. Advanced settings table — settings.json gaps

| Setting | CCBP cite | Current | Recommended | Risk | Notes |
|---|---|---|---|---|---|
| `alwaysThinkingEnabled` | `claude-settings.md:77 @ 64fffd53` | UNSET | `true` | LOW — boosts intelligence per turn | Pairs with adaptive thinking; CR-2 |
| `effortLevel` | `claude-settings.md:519,539-549` | UNSET | `"xhigh"` | NONE — already default on Opus 4.7 v2.1.111 | Persists across sessions; current model is Opus 4.7 1M |
| `permissions.skipDangerousModePermissionPrompt` | `claude-settings.md:237` | UNSET | UNSET (NO-OP) | NONE | Project settings IGNORED for this; user/managed only |
| `permissions.useAutoModeDuringPlan` | `claude-settings.md:241` | UNSET (defaults `true`) | UNSET | NONE | Already auto-enabled |
| `permissions.autoMode` | `claude-settings.md:239` | UNSET | Optionally `"$defaults"` + custom soft-deny | LOW | `claude auto-mode defaults` first |
| `cleanupPeriodDays` | `claude-settings.md:74` | UNSET (def 30) | `60` | NONE | More transcript history retained |
| `defaultShell: "powershell"` | `claude-settings.md:81` | UNSET (def `"bash"`) | `"powershell"` | LOW | v2.1.126 — PRIMARY shell on Win when set; `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` already in eee.ps1 |
| `outputStyle: "Explanatory"` | `claude-settings.md:580` | UNSET | OPTIONAL `"Explanatory"` | NONE | Boris 12-tips #11 |
| `tui: "fullscreen"` | `claude-settings.md:92` | UNSET | `"fullscreen"` | LOW cosmetic | v2.1.110 flicker-free |
| `worktree.symlinkDirectories` | `claude-settings.md:131` | UNSET | UNSET | NONE | Activate at first parallel-session worktree |
| `autoMemoryDirectory` | `claude-settings.md:115` | UNSET | UNSET — project settings BLOCKED | NONE | User scope only |

---

## 3. Advanced env-vars table — eee.ps1 gaps

| Env var | CCBP cite | Current eee.ps1 | Recommended | Benefit |
|---|---|---|---|---|
| `ENABLE_PROMPT_CACHING_1H` | `claude-settings.md:831` | UNSET | `1` for long-arc workflows | 1-hour cache TTL ≈ 12x reuse window vs 5-min |
| `MAX_THINKING_TOKENS` | `claude-settings.md:566` | UNSET (model default) | `10000` for deep tasks | Bounded thinking; predictable cost |
| `ENABLE_TOOL_SEARCH=auto:10` | `claude-advanced-tool-use.md:320` | **PRESENT (eee.ps1:45)** | UNCHANGED | ~85% tool-def token reduction |
| `COLORTERM=truecolor` | `claude-spinner-verbs-and-tips.md:74` | **PRESENT (eee.ps1:50)** | UNCHANGED | Cosmetic |
| `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` | `claude-settings.md:812` | **PRESENT (eee.ps1:56)** | UNCHANGED | Native PS execution surface |
| `CLAUDE_CODE_FORK_SUBAGENT=1` | `claude-settings.md:838` | **PRESENT (eee.ps1:61, settings.json:7)** | DEDUP — pick ONE | Forked subagent context |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=1` | `claude-settings.md:853` | **PRESENT (eee.ps1:37, settings.json:6)** | DEDUP — pick ONE | Saves ~500 sysprompt tokens |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | `claude-settings.md:826` | UNSET (def ~95%) | `85` | Fewer "bad compacts" — model still sharp at 85% (Thariq tips) |
| `CLAUDE_ENABLE_STREAM_WATCHDOG=1` | `claude-settings.md:867` | UNSET | `1` | Aborts stalled streams |
| `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING=1` | `claude-settings.md:868` | UNSET | `1` | Faster tool-call feedback |
| `BASH_MAX_TIMEOUT_MS` | `claude-settings.md:824` | UNSET (def ~120s) | `600000` | Long migrations don't timeout |
| `CLAUDE_CODE_TASK_LIST_ID` | `claude-global-vs-project-settings.md:178` | UNSET | `'claude-sota-installed'` | Cross-session task continuity (v2.1.16) |

---

## 4. Hook-timeout canonical values

CCBP delegates hooks to `shanraisshan/claude-code-hooks` (referenced at `claude-settings.md:320`). **TIER-1 reference for actual canonical values is the ECC plugin hooks.json (battle-tested) plus codex plugin defaults.**

| Hook event | Matcher | ECC canonical | Codex plugin canonical | Current settings.json | Verdict |
|---|---|---|---|---|---|
| `PreToolUse` | `Bash` (dispatcher) | NONE | n/a | `5` (block_no_verify_guard) | OK |
| `PreToolUse` | `Edit\|Write\|MultiEdit` (T1) | n/a | NONE | `5` | TIGHT — codex sync may exceed 5s |
| `PreToolUse` | `Bash(git commit *)` (T2) | n/a | NONE | `180` | OK |
| `PreToolUse` | quality-gate / config-protection / gateguard | `5` | n/a | n/a | OK |
| `PostToolUse` | Bash async | `30` | NONE | `30` | OK |
| `PostToolUse` | quality-gate (Edit/Write/MultiEdit) | `30` | n/a | n/a | OK |
| `Stop` | format+typecheck batch | **`300`** | NONE | **`900`** (codex stop-review-gate) | **EXCESSIVE — 3x ECC ceiling** |
| `Stop` | auto_proceed_gate | n/a | n/a | `5` | OK |
| `SubagentStop` | fm17d_stall_detector | n/a | n/a | `5` async | OK |
| `SessionStart`/`SessionEnd` | session-lifecycle | n/a | NONE | `5` | OK |
| `PreCompact` | save state | NONE | n/a | NOT WIRED | Consider wiring |

**Canonical principles** (CCBP via ECC `node.md:hook-development`): timeout in **seconds** (not ms); async hooks ≤30s; blocking hooks <200ms (no network). **Finding**: 900s on codex stop-review hook is 3x ECC empirical ceiling — recommend cap at 300s.

---

## 5. Hook-pattern recommendations

**REMOVE (redundant — ECC plugin auto-injects equivalents)**:
- `secret_scan_guard.py` (settings.json:30) — ECC `pre:governance-capture` covers via `ECC_GOVERNANCE_CAPTURE=1`; verify and remove dup
- The two `Bash(git -C * commit *)` codex_t2 mirrors (settings.json:71-75) — superfluous if `Bash(git commit *)` matcher already wildcards. Verify before removing.
- The two `Bash(git -C * push *)` codex_prepush mirrors (settings.json:104-110) — same logic

**TIMEOUT-CAP**:
- `Stop:codex stop-review-gate-hook.mjs` 900s → **300s** (CR-9 + CCBP/ECC empirical)
- `PreToolUse:codex_t1_consult_gate.py` 5s → **30s** (codex synchronous T1 with deep-review xhigh exceeds 5s on first-token)

**ADD (CCBP-cited but not wired)**:
- `PreCompact` event hook to save context state (Thariq tips compaction-management) — currently empty
- `Notification` event hook for Slack/WhatsApp permission routing (Boris 12-tips #9)

**DEDUP env** (CCBP `claude-settings.md:6` says "use env field in settings.json to avoid wrapper scripts"):
- `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=1` set in BOTH eee.ps1:37 AND settings.json:6 — pick ONE (settings.json preferred)
- `CLAUDE_CODE_FORK_SUBAGENT=1` set in BOTH eee.ps1:61 AND settings.json:7 — same

---

## 6. Plugin upgrade list

| Plugin | Current | Latest upstream | Tag/SHA | Upgrade cmd | What's new |
|---|---|---|---|---|---|
| `superpowers@claude-plugins-official` | `5.1.0` | marketplace SHA-pinned `obra/superpowers @ f2cbfbef` | per `anthropics/claude-plugins-official/.claude-plugin/marketplace.json` | `/plugin update superpowers@claude-plugins-official` | marketplace.json updated 2026-05-07 (commit `76b35e91` policy-scan tighten); pin moves when Anthropic bumps SHA |
| `codex@openai-codex` | `1.0.4` | **`1.0.4`** (latest) | repo HEAD `807e03ac` 2026-04-18 | `/plugin update codex@openai-codex` (no-op) | Already latest; ZERO commits since 1.0.4 |
| `everything-claude-code@everything-claude-code` | `2.0.0-rc.1` (2026-04-28) | **`2.0.0-rc.1`** (latest prerelease); STABLE = `1.10.0` | repo commits up to `841beea4` 2026-04-30 | hold at `2.0.0-rc.1` (RC-track intentional) | Post-RC commits are loop-status snapshot fixes; minor |
| `openai/codex` CLI binary | TBD on PATH | **`rust-v0.129.0`** (2026-05-07) | tag `rust-v0.129.0` | `cargo install --locked codex-cli@0.129.0` OR `gh release download --repo openai/codex rust-v0.129.0` | TUI Vim modal editing; resume/fork picker; raw scrollback; `/ide` context inject; workspace-aware `/diff`; status-line theme colors; plugin workspace-sharing + access controls. **eee.ps1 T0.5 floor "0.125.0+" → bump to 0.129.0** |
| `anthropics/claude-plugins-official` marketplace | last sync 2026-05-06 | `pushed_at: 2026-05-07T22:34:32Z`, 18799 stars | commit `76b35e91` | `/plugin marketplace update claude-plugins-official` | clickhouse + pigment plugins added; flint + optibot removed; policy-scan tightened |

---

## 7. Cross-model-workflow T1-T7 latest changes

CCBP `cross-model-workflow.md` (`Last Updated: 2026-03-06` @ HEAD 64fffd53) defines **STEP 1 PLAN / STEP 2 QA REVIEW / STEP 3 IMPLEMENT / STEP 4 VERIFY** — canonical 4-step contract. T1-T7 numbering is sibling-claude-sota extension, NOT in CCBP. **No new commits to cross-model-workflow.md in the 32-commit delta.**

`codex@1.0.4` ships scripts (verified at `Z:\claude-sota-installed\.claude\plugins\cache\openai-codex\codex\1.0.4\scripts\`):
- `app-server-broker.mjs` / `codex-companion.mjs`
- `session-lifecycle-hook.mjs` (SessionStart + SessionEnd)
- `stop-review-gate-hook.mjs` (Stop event — currently 900s timeout, recommend 300s)
- `lib/`

`v1.0.4` release notes: bug fixes only — `--cwd` reporting, agent frontmatter `model`, `xhigh` README correction, `$ARGUMENTS` quoting, `/codex:rescue` Agent-tool routing. **No new T-step semantics.**

Prompt template authority: codex 1.0.4 ships `gpt-5-4-prompting` skill (TIER-1 internal at `~codex:gpt-5-4-prompting`) — internal guidance for composing GPT-5.4 prompts.

---

## 8. Boris Cherny 6-tips (verbatim cites)

All cites TIER-1-DIRECT to `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-boris-6-tips-16-apr-26.md @ HEAD 64fffd53`:

1. **Auto Mode** (L22-35): "auto mode... permission prompts are routed to a model-based classifier... If safe, auto-approve / If risky, pause and ask." **APPLIED**: settings.json:12 `defaultMode: "auto"`.
2. **`/fewer-permission-prompts` skill** (L40-46): "scans through your session history to find common bash and MCP commands that are safe but repeatedly prompt for permission... recommends a list of commands to add to your permissions allowlist." **AVAILABLE** in skills list; **NOT YET RUN** — recommend after first 5-10 sessions.
3. **Recaps** (L51-66): "short summaries of what an agent did and what's next... Disable in `/config`." **DEFAULT-ON**; no setting needed.
4. **Focus Mode** (L70-76): "hides all the intermediate work... Use `/focus` to toggle." **RUNTIME-TOGGLE**; not a settings concern.
5. **Effort Level** (L80-89): "Opus 4.7 uses adaptive thinking... five levels: low/medium/high/xhigh/max." **UNSET** — recommend `effortLevel: "xhigh"` (default on Opus 4.7 already, explicit is clearer).
6. **Verify Work** (L93-109): "Backend — run server/service end-to-end / Frontend — Claude Chromium extension / Desktop — Computer Use." **PARTIAL** — codex T2/postcommit/prepush gates are verification surface; `superpowers:verification-before-completion` skill available; consider adding `superpowers:requesting-code-review` to standard end-of-task flow.

---

## 9. Memory advanced patterns

### CLAUDE.md sizing (CCBP `claude-memory.md @ 64fffd53`)
- **Ancestor loading** at startup walks UP from cwd, loads every CLAUDE.md (`L34-40`)
- **Descendant loading** is LAZY — subdirectory CLAUDE.md only loads when files in subdir are read (`L38-40`)
- **Sibling never loads** (`L94`)
- Current `Z:/claude-sota-installed/CLAUDE.md` is ~21KB / 280+ lines — **at upper bound for healthy context**. Push detail into descendant CLAUDE.md files (`docs/sota-installed-manifest.md`-style refs) rather than expanding root.
- **CLAUDE.local.md** discipline (`claude-memory.md:113`): "personal preferences — Add to .gitignore". Conformant.

### Agent memory frontmatter (CCBP `claude-agent-memory.md @ 64fffd53`)
- Introduced v2.1.33 Feb 2026:
  ```yaml
  ---
  name: code-reviewer
  memory: user   # or 'project' or 'local'
  ---
  ```
- **Scopes**: `user` → `~/.claude/agent-memory/<agent>/` (recommended cross-project default); `project` → `.claude/agent-memory/<agent>/` (team-shared via git); `local` → `.claude/agent-memory-local/<agent>/` (gitignored)
- **Mechanism**: First 200 lines of `MEMORY.md` injected into agent system prompt at startup; agent has Read/Write/Edit auto-enabled
- **Status**: NO custom subagents in `.claude/agents/` yet (CR-5 install-priority pending). Once subagents land via plugin install, opt them into `memory: user` for cross-session learning.

### MCP memory + Tasks
- `.mcp.json` HARD-GATE T0.6 advisory targets **github + context7 + deepwiki** for Tier 2A. No memory MCP installed yet.
- CCBP `claude-mcp.md:17-29` "5 daily MCPs" recommendation: Context7, Playwright, Claude in Chrome, DeepWiki, Excalidraw — none memory-specific.
- **Tasks system** (CCBP `claude-global-vs-project-settings.md:148-191`): v2.1.16 — globally stored `~/.claude/tasks/`, multi-session via `CLAUDE_CODE_TASK_LIST_ID=<id>`. **UNSET** — recommend `$env:CLAUDE_CODE_TASK_LIST_ID = 'claude-sota-installed'` in eee.ps1.

---

## Top 7 highest-leverage applies

1. **Cap codex stop-review-gate-hook timeout 900→300s** (settings.json:128) — CR-9 risk discipline; CCBP/ECC empirical ceiling
2. **Add `effortLevel: "xhigh"` to settings.json** — explicit unleashed signal; matches Opus 4.7 default
3. **Add `alwaysThinkingEnabled: true` to settings.json** — Boris tip 5 + CR-2 surface-uncertainty
4. **Add `CLAUDE_CODE_TASK_LIST_ID` env to eee.ps1** — cross-session task continuity (Tasks v2.1.16)
5. **Add `ENABLE_PROMPT_CACHING_1H=1` env** — 12x cache reuse window; long-arc workflow pattern
6. **Bump codex CLI floor 0.125.0→0.129.0** in eee.ps1 T0.5 — TUI Vim, resume/fork picker, workspace-aware `/diff`
7. **Run `/fewer-permission-prompts` skill** once after first 5-10 sessions — Boris tip 2 + CR-7 graduated unleash

DEDUP candidates (idempotent housekeeping): collapse `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` and `CLAUDE_CODE_FORK_SUBAGENT` to settings.json `env` field only (CCBP says env field exists "to avoid wrapper scripts"); investigate redundant `Bash(git -C * commit/push *)` mirrors before removing.
