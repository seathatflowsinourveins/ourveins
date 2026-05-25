# W301 Stream J — OpenAI Codex CLI + GPT-5.5 Integration Deep-Dive

**Wave**: W301.H Stream J | **Date**: 2026-05-18 | **Budget**: T3 ($0.40)
**Probe basis**: `codex-cli 0.130.0` installed at `Z:/claude-sota-installed/.local/npm/codex`; CODEX_HOME = `Z:/claude-sota-installed-state/.codex`; openai-codex plugin @ `.claude/plugins/cache/openai-codex/codex/1.0.4/`.
**Methodology**: Phase-5 Gate-1 mechanical re-fetch — every flag below was probed live (`codex --help`, `codex exec --help`, `codex review --help`) at session timestamp 2026-05-19 01:10 UTC.

---

## §1 — Codex CLI Surface Enumeration (Verbatim, Mechanically Verified)

### §1.1 Top-level subcommands (16 total)
Per live `codex --help` 2026-05-19:

| Command | Description (verbatim) | Used in runtime? |
|---|---|---|
| `exec` (alias `e`) | "Run Codex non-interactively" | **YES** — all hook scripts + plugin |
| `review` | "Run a code review non-interactively" | **NO** — runtime calls `codex exec review` (nested), not `codex review` directly |
| `login` / `logout` | "Manage login" / "Remove stored authentication credentials" | one-shot |
| `mcp` | "Manage external MCP servers for Codex" | **PARTIAL** — `mcp list --json` in postcommit healthcheck (W282 cite) |
| `plugin` | "Manage Codex plugins" | **NO** |
| `mcp-server` | "Start Codex as an MCP server (stdio)" | **NO** — under-utilized |
| `app-server` *[experimental]* | "Run the app server or related tooling" | **NO** |
| `remote-control` *[experimental]* | "Start a headless app-server with remote control enabled" | **NO** — new in 0.130 (#21424) |
| `app` | "Launch the Codex desktop app" | N/A |
| `completion` | "Generate shell completion scripts" | one-shot |
| `update` | "Update Codex to the latest version" | **NO** (manual `npm install -g`) |
| `sandbox` | "Run commands within a Codex-provided sandbox" | **NO** — under-utilized |
| `debug` | "Debugging tools" | **NO** |
| `apply` (alias `a`) | "Apply the latest diff produced by Codex agent as a `git apply`" | **NO** — under-utilized for auto-fix loop |
| `resume` | "Resume a previous interactive session" | **NO** — auto-pipeline runs ephemeral |
| `fork` | "Fork a previous interactive session" | **NO** |
| `cloud` *[EXPERIMENTAL]* | "Browse tasks from Codex Cloud and apply changes locally" | **NO** |
| `exec-server` (truncated in help) | session export | **NO** |

### §1.2 `codex exec` flags (15 verified, verbatim from live probe)
- `-c, --config <key=value>` — TOML override, dotted path (e.g. `-c model="o3"`)
- `--enable <FEATURE>` / `--disable <FEATURE>` — repeatable feature toggle (= `-c features.<n>=true|false`)
- `-i, --image <FILE>...` — attach image(s)
- `-m, --model <MODEL>` — model override
- `--oss` — open-source provider
- `--local-provider <OSS_PROVIDER>` — `lmstudio` or `ollama`
- `-p, --profile <CONFIG_PROFILE>` — profile from config.toml
- `-s, --sandbox <SANDBOX_MODE>` — `read-only`, `workspace-write`, `danger-full-access`
- `--dangerously-bypass-approvals-and-sandbox`
- `-C, --cd <DIR>` — working root
- `--add-dir <DIR>` — extra writable dirs
- `--skip-git-repo-check`
- `--ephemeral` — "Run without persisting session files to disk"
- `--ignore-user-config` — skip `$CODEX_HOME/config.toml`
- `--ignore-rules` — skip user/project execpolicy `.rules` files
- `--output-schema <FILE>` — "Path to a JSON Schema file describing the model's final response shape"
- `--color <COLOR>` — `always` / `never` / `auto`
- `--json` — JSONL event stream to stdout
- `-o, --output-last-message <FILE>` — write final agent message to file

Subcommands: `resume`, `review`, `help`.

### §1.3 `codex review` flags (live probe — distinct from `codex exec review`)
- `-c, --config <key=value>` — TOML override
- `--uncommitted` — "Review staged, unstaged, and untracked changes"
- `--base <BRANCH>` — "Review changes against the given base branch"
- `--commit <SHA>` — "Review the changes introduced by a commit"
- `--enable <FEATURE>` / `--disable <FEATURE>`
- `--title <TITLE>` — display title in summary
- `[PROMPT]` — custom instructions; `-` reads from stdin

### §1.4 Runtime usage (git log + settings.json probe)
- Plugin commands present: `setup` · `review` · `adversarial-review` · `rescue` · `result` · `status` · `cancel` (7 commands, not 8 — `stop-review-gate` is a prompt only, not a slash command).
- Plugin hooks: bundled at `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks.json` — wires `SessionStart` + `SessionEnd` + `Stop`. **Project's own `.claude/settings.json` does NOT register these hooks** (grep returns no match) — the plugin's own hooks.json self-loads via the plugin loader, NOT via the project settings.json. Cardinal-rule-2 compliant (upstream plugin hooks, not self-invent).
- Git log: zero commits matching `codex exec` or `codex review` in the project's tracked history (W295-W305 commits reference codex review verdicts in commit bodies but don't call codex CLI via tracked shell scripts).

---

## §2 — `[profiles.deep-review-exec]` Config Audit

**Location**: `Z:/claude-sota-installed-state/.codex/config.toml` (CODEX_HOME) — 11,572 bytes, last modified 2026-05-18.

**Current `deep-review-exec` block (verbatim)**:
```toml
[profiles.deep-review-exec]
model = "gpt-5.5"
model_reasoning_effort = "xhigh"
model_reasoning_summary = "detailed"
sandbox_mode = "danger-full-access"
approval_policy = "never"
plan_mode_reasoning_effort = "xhigh"
service_tier = "fast"
```

**SOTA-tuning assessment**: largely SOTA per W290 phase-1 unleash but with 2 gaps:
1. **`model_verbosity` MISSING** — sibling-imported `[profiles.deep-review]` block (in same file, lines 122+) DOES set `model_verbosity = "high"`. The deep-review-exec block does not. Per Simon Willison's pelican-bench (2026-04-23 cite below), the xhigh+verbose combo doubled reasoning-token count from 39 → 9,322 with materially different output. Recommendation: add `model_verbosity = "high"`.
2. **`service_tier = "fast"`** — per OpenAI launch post 2026-04-23, Fast mode is "1.5x faster for 2.5x the cost". For ship-gate adversarial review this is the right choice; for routine post-commit review (T2/T3) consider `service_tier = "default"` or `"flex"` (`flex` is 0.5x cost per Batch/Flex pricing).

Also present in same file: 6 additional profiles — `review`, `headless-exec`, `deep-review`, `t2-exec`, `t1-light`, `t2-standard`, `t3-deep` (W272-P1 adaptive-effort ladder, cite at line 124+). The runtime has a cost-aware-llm-pipeline-ready profile set but only `deep-review-exec` is wired into the Stop hook.

**MCP integration in CODEX_HOME (W290 phase-1+2 unleash)** — codex review can call: `deepwiki` (https), `repomix` (npx stdio), `basic-memory` (local exe), `github` (api.githubcopilot.com w/ Bearer header), `context7` (https w/ API key header). Cross-tool parity with Claude Code's `.mcp.json` confirmed.

---

## §3 — Multi-Angle Convergence on Under-Utilized Codex Features

### Angle A — openai/codex release notes (mechanical re-fetch 2026-05-18)
Per https://github.com/openai/codex/releases/tag/rust-v0.130.0 (published 2026-05-08T23:09:55Z, 84K stars) and developers.openai.com/codex/changelog:

- **Latest stable**: `0.131.0` SHIPPED. Notable: "TUI now offers richer session controls and display: data-driven service-tier commands, blended token usage, permissions/approval mode, workspace roots, and responsive Markdown tables" (PR #21745). **Runtime is one version behind**.
- **0.130.0 highlights**: `codex remote-control` (#21424), plugin sharing w/ discoverability + hook metadata (#21447/#21495/#21637), thread paging in app-server (#21566), Bedrock console-login credentials (#21623), Windows sandbox desktop-runtime-bin-cache fix (#21564), removed "research preview" wording from `codex exec` banner (#21683). Also removed: "extra skills roots" discovery (#21485 → motivated GSD installer to drop fallback).

### Angle B — practitioner field reports (exa search 2026-05-18)
1. **Simon Willison "A pelican for GPT-5.5 via the semi-official Codex backdoor API" (2026-04-23)** — confirms `model_reasoning_effort=xhigh` + `model_verbosity=high` materially changes output (default→xhigh: 39→9,322 reasoning tokens, very different SVG approach). GPT-5.5 priced at $5/$30 per 1M tokens (2× GPT-5.4). GPT-5.5 Pro at $30/$180.
2. **OpenAI dev blog "Run long horizon tasks with Codex"** — documents the durable-project-memory pattern for ~25-hour autonomous runs at "Extra High" reasoning. **Key recipe**: spec.md + plans.md + implement.md + documentation.md, with verify-after-milestone + auto-repair-on-fail. **Plus `/plan` slash command** (now native in CLI/IDE/app). This is the autonomous-loop pattern the runtime's `/loop` framework should match.
3. **OpenAI "Introducing GPT-5.5" (2026-04-23)** — Terminal-Bench 2.0 SOTA 82.7%, SWE-Bench Pro 58.6%, Expert-SWE long-horizon outperforms 5.4. Codex's "skills" / "automations" / "git worktrees" / "parallel threads" are the 4 announced productized primitives.

### Angle C — DeepWiki openai/codex source-grep (2026-05-18)
Direct Q&A on `--task` / multi-judge / blinded / position-swap / effort-budget yielded these verdicts (per DeepWiki AI grounded in repo):
- **NO `--task` mode** — `codex exec` is single-task non-interactive; `Task` is an internal struct (Task = series of Turns), not exposed.
- **NO ensemble/multi-judge** — `ReviewTask` spawns a single sub-agent, not an ensemble.
- **NO blinded-review mode** — `ReviewTask` does disable web-search + collaboration tools and sets a review rubric, but does NOT strip orchestrator metadata. Verified locally: `adversarial-review.md` prompt has `{{TARGET_LABEL}}` + `{{USER_FOCUS}}` placeholders that **leak** orchestrator-side context to GPT-5.5.
- **NO position-swap** — no flag exists; `ReviewCommand` does not include adversarial-pair setup.
- **YES effort budget beyond `model_reasoning_effort`** — `plan_mode_reasoning_effort` (config) + per-turn `effort` + `summary` on `UserTurn` op (op-level override per-turn) + `--config model_reasoning_effort=...` CLI override. **Python SDK exposes `thread.turn(effort=..., summary=...)`.**

---

## §4 — sca-v5 Phase-5/Phase-6 Codex Integration Audit (CRITICAL)

### §4.1 Phase-5 Gate-3 adversarial-blinded protocol
**Verdict: NOT blinded.** The `prompts/adversarial-review.md` template injects:
```
Target: {{TARGET_LABEL}}
User focus: {{USER_FOCUS}}
```
The orchestrator's framing ("an adversarial review of this Claude-authored W301 sweep") flows directly into GPT-5.5's context. Per the sca-v5 §4.6 anti-bias mandate, this is a **HIGH-severity blinding gap** — the reviewer knows the artifact's provenance (Claude / Wave / target) before scoring.

**Recommended fix**: pre-process the orchestrator prompt at the Stop hook layer by stripping `{{TARGET_LABEL}}` to a generic `target` (e.g., "the changes in `git diff`") and `{{USER_FOCUS}}` to empty unless the operator typed `--focus`. Implementation: 1-line patch to `scripts/stop-review-gate-hook.mjs` (the plugin's bundled MJS hook) before it shells out to `codex exec`.

### §4.2 Phase-6 position-swap MVP
**Verdict: codex fires ONCE per Stop event.** The `hooks.json` Stop block invokes `stop-review-gate-hook.mjs` once with 900s timeout. **No position-swap implemented**; no second invocation with order-swapped diff. Per sca-v5 Phase-6 MVP, the SOTA pattern is fire-twice + average severity. Position-swap is not natively supported by codex CLI (per DeepWiki §3-C verdict above) — must be done via TWO sequential `codex exec` calls from the MJS hook with the diff blocks ordered differently and the verdicts merged.

**Recommended fix**: extend `stop-review-gate-hook.mjs` to run codex twice (concurrent with `Promise.all` if budget allows; sequential if not) and either intersect findings (high-confidence) or union them (high-recall). Adds ~$0.05-0.10 per Stop event at xhigh.

### §4.3 Citation-accuracy spot-check (sca-v5 §4.6)
**Verdict: NOT wired into Stop hook.** No tracked code in `scripts/stop-review-gate-hook.mjs` mechanically re-fetches cites in the prior-turn artifact. The phantom-cite class found in W295-W297 is unchecked at ship-time. **Recommended fix**: add a Stage-0 mechanical cite-fetch (regex `https?://[^\s)]+` or path-pattern `[A-Z]:[/\\][\w/.-]+`) that 404-checks URLs and `Test-Path` checks file cites, BLOCK if any miss. Lives best as a separate PreToolUse hook on git-commit (not the Stop hook), since the Stop hook fires AFTER the artifact is written.

---

## §5 — Top-3 Codex Patterns to Adopt

### Pattern #1 — `--output-schema` for structured verdicts
- **Current state**: NOT USED. Adversarial-review prompt instructs JSON output via natural-language `<structured_output_contract>`. No machine-enforced schema.
- **sca-v5 fit**: HIGH — Gate-4 phantom-feature checks require parsing verdict JSON; a JSON Schema with required fields (`verdict`, `findings[]`, `confidence`, `cites[]`) makes downstream parsing zero-fail.
- **Pilot recipe**: write `prompts/stop-review-gate.schema.json`, pass `--output-schema prompts/stop-review-gate.schema.json` to `codex exec`. Verbatim flag exists per §1.2.
- **Rollback**: remove the `--output-schema` flag; falls back to plain-text JSON contract.

### Pattern #2 — `--output-last-message` + `--json` event-stream for telemetry
- **Current state**: PARTIAL. The `codex_postcommit_review.py` reference (W255 deleted) used `--output-last-message`. The plugin's MJS hook does NOT currently capture per-event telemetry.
- **sca-v5 fit**: HIGH — combined with langfuse T5 tracing, `--json` event-stream lets us emit per-Stop-event spans (verdict, latency, token-count) without re-parsing stdout. Closes the W295 "codex-pace" observability gap (9 reviews fired r7-r15 within 45 min, untracked metadata).
- **Pilot recipe**: in `stop-review-gate-hook.mjs`, replace stdout-tee with `--json --output-last-message <tmpfile>`; stream the JSONL into a Node JSONL parser; emit per-event langfuse spans via `LANGFUSE_*` env (already wired per CLAUDE.local.md).
- **Rollback**: drop the JSONL parser; resume stdout-tee.

### Pattern #3 — `codex apply` for auto-fix-after-block
- **Current state**: NOT USED. The current Stop hook BLOCKs on critical/high but does not auto-attempt the fix.
- **sca-v5 fit**: MEDIUM-HIGH — when codex returns `needs-attention` with a concrete recommendation, `codex apply` would `git apply` Codex's last-produced diff to the working tree, then re-run the Stop hook in a verify pass. Closes the W298-W301 "operator manually addresses BLOCK" loop.
- **Pilot recipe**: extend `stop-review-gate-hook.mjs` to detect `verdict==needs-attention && confidence>=0.85`, run `codex exec -p deep-review-exec --output-last-message /tmp/fix.diff "Produce a unified diff that fixes the findings"` followed by `codex apply` (uses aliased `codex a`). Cap to 1 auto-fix iteration to prevent runaway.
- **Rollback**: feature-flag at top of hook (`if (process.env.CODEX_AUTOFIX_ENABLED !== '1') return earlyExit`).

---

## §6 — Phantom-Feature Contamination Check (sca-v5 Gate-4)

Every claim about codex CLI flags above was mechanically verified by `codex --help`, `codex exec --help`, `codex review --help` at session ts 2026-05-19 01:10. Cross-checked claims:

| Claim | Mechanical verification | Status |
|---|---|---|
| `codex exec --output-schema` exists | `codex exec --help` line 16 | **CONFIRMED** |
| `codex exec --json` exists | `codex exec --help` line 17 | **CONFIRMED** |
| `codex exec --ephemeral` exists | `codex exec --help` line 13 | **CONFIRMED** |
| `codex apply` (alias `a`) exists | `codex --help` | **CONFIRMED** |
| `codex exec --output-last-message` exists | `codex exec --help` line 18 | **CONFIRMED** |
| `codex task` mode (hindsight memory claim — `codex task --effort high`) | `codex --help` shows **NO `task` subcommand**; `codex task --help` returns "unrecognized subcommand 'task'" | **PHANTOM** |
| `model_verbosity` in profile | sibling profile @ deep-review @ line 122+ uses it | **CONFIRMED** |
| `service_tier` values `fast`/`default`/`flex` | Cross-check: OpenAI launch post 2026-04-23 confirms `Fast mode` & `Batch/Flex pricing` | **CONFIRMED** (`fast` certain; `default`/`flex` inferred from launch post — recommend mechanical re-fetch before pilot) |

**Phantom-feature count: 1** — `codex task --effort high` does NOT exist (verified via live probe + W296-Stream-A's own footnote that CHANGELOG.md was the source). This is a hindsight-memory phantom contamination — the runtime ledger contains a reference (CLAUDE.md status line) that mis-attributes "task" as a codex subcommand when the actual subcommand for non-interactive runs is `exec` and per-turn effort comes via `--config model_reasoning_effort=...`. **OPERATOR-ACTION**: correct CLAUDE.md status line "W295 r17 fix" reference.

---

## §7 — Summary Ledger

| Surface | Total | Used | Partial | Not-used / Under-utilized |
|---|---|---|---|---|
| Top-level subcommands | 16 | 2 (`exec`, `login`) | 1 (`mcp`) | 13 |
| `codex exec` flags | 19 | ~6 (-c, -p, --json, --ephemeral, -m, -s) | 0 | ~13 |
| `codex review` flags | 7 | 1 (`--uncommitted` per W282 reference) | 0 | 6 |
| Plugin commands | 7 | 2-3 routine (`status`, `adversarial-review`) | 2 | 2-3 |
| Profiles in CODEX_HOME | 7 | 1 (`deep-review-exec`) | 0 | 6 |

**Phantom-feature contamination**: 1 (`codex task` subcommand mis-reference).
**Phase-5 Gate-3 blinding**: NOT IMPLEMENTED (HIGH).
**Phase-6 position-swap**: NOT IMPLEMENTED (HIGH per sca-v5).
**Cite-accuracy in Stop hook**: NOT WIRED (MEDIUM).

**Top-3 adopt-now**: (1) `--output-schema` for structured verdicts; (2) `--json + --output-last-message` for langfuse telemetry; (3) `codex apply` for auto-fix-after-block.

**Operator actions**:
1. Add `model_verbosity = "high"` to `[profiles.deep-review-exec]` in `Z:/claude-sota-installed-state/.codex/config.toml`.
2. Patch `scripts/stop-review-gate-hook.mjs` to strip `{{TARGET_LABEL}}` (Phase-5 Gate-3 blinding).
3. Implement position-swap (Phase-6 MVP) in the same MJS hook.
4. Correct CLAUDE.md "codex task --effort high" reference to `codex exec --config model_reasoning_effort=high`.
5. `npm install -g @openai/codex@0.131.0` (runtime is one version behind).
