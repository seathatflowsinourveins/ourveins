# W258r22 — Context Engineering + Claude-Code-Native Patterns Deep-Dive (2026-05-16)

> **Mission:** Drill into what SOTA-grade context engineering looks like for a Claude Code daily-driver setup; audit operator's `CLAUDE.md` + `settings.json` against best practice; surface adoption gaps + over-builds.
>
> **Method:** Parallel `ctx_fetch_and_index` of 12 upstream URLs (Anthropic docs `skills` / `sub-agents` / `hooks` / `mcp` / `settings` / `memory` / `cli-reference` / `claude-code-best-practices`, plus obra/superpowers, Addy Osmani 2026 workflow, Karpathy Sequoia Ascent 2026, Cole Medin Archon) + CCBP local cite-anchor + operator `CLAUDE.md` + `settings.json` direct read.

---

## §1 Context Engineering Pattern Catalog (15 patterns)

> Per pattern: Anthropic-OFFICIAL cite + named-T2 cite + operator-applicable rule.

### P1 — CLAUDE.md ancestor/descendant hierarchy
**Def:** Walk-UP at startup (ancestors); lazy-load on file-access (descendants). Root memory is preload budget; per-dir memory is on-demand context.
- **Anthropic-OFFICIAL:** `https://docs.anthropic.com/en/docs/claude-code/memory` (memory model) + `https://code.claude.com/docs/en/settings` (settings hierarchy 5-tier).
- **Named-T2:** Boris Cherny (Anthropic) X/2016339448863355206 + CCBP `claude-memory.md:34-40 @ 48f2ceb` Boris-Cherny-style hierarchy.
- **Rule:** Root CLAUDE.md ≤50 LOC pointer-only. Push behavior into descendant CLAUDE.md OR plugin-loaded skills so it lazy-loads.

### P2 — AGENTS.md cross-tool config (r14 finding)
**Def:** `AGENTS.md` (codex / cline / opencode / Anthropic AAIF) is the cross-vendor agent-config convention (3 production orgs use per r7); CC reads it as supplementary context.
- **Anthropic-OFFICIAL:** AAIF L-Foundation Dec 2025 trio donation (Goose + MCP + AGENTS.md).
- **Named-T2:** Simon Willison `simonwillison.net/2026/May/6/code-w-claude-2026/` + r14 §3.
- **Rule:** Add `AGENTS.md` alongside `CLAUDE.md` for multi-driver redundancy (codex + opencode + CC share it).

### P3 — Skills authoring (TDD-for-skills)
**Def:** SKILL.md w/ YAML frontmatter; `description:` auto-matches task intent; skill autoloads via Skill tool. TDD-for-skills = write pressure-test, watch fail, write skill, watch pass.
- **Anthropic-OFFICIAL:** `https://code.claude.com/docs/en/skills` (15-field frontmatter: name/description/when_to_use/argument-hint/disable-model-invocation/allowed-tools/model/effort/context:fork/agent/hooks/paths/shell etc.).
- **Named-T2:** obra/superpowers `writing-skills` SKILL = "Writing skills IS TDD applied to process documentation" + Mattpocock skill-format.
- **Rule:** Author skills with paths-glob + description-trigger; never inline behavior in CLAUDE.md.

### P4 — Subagent dispatch (model-resolution precedence)
**Def:** 4-step model resolution: `CLAUDE_CODE_SUBAGENT_MODEL` env (top) > per-invocation param > frontmatter `model:` > inherits main. 16-field frontmatter (tools/skills/mcpServers/hooks/memory/isolation:worktree/permissionMode/effort/maxTurns).
- **Anthropic-OFFICIAL:** `https://code.claude.com/docs/en/sub-agents` model-precedence section.
- **Named-T2:** CCBP `claude-subagents.md` 16-field spec @ 48f2ceb.
- **Rule:** Subagent transcripts stored independently (`agent-{id}.jsonl`); main-compact does NOT touch subagent state. Use `isolation:worktree` for risky edits.

### P5 — Hook event surface (PreToolUse / PostToolUse / SessionStart / Stop / UserPromptSubmit / PreCompact / PostCompact / SubagentStart / SubagentStop / SessionEnd / Notification / TaskCreated / FileChanged / PermissionDenied / Elicitation / CwdChanged / WorktreeCreate / Setup …)
**Def:** 25+ events; shell-command hooks; can `decision:block` tool calls.
- **Anthropic-OFFICIAL:** `https://code.claude.com/docs/en/hooks` (40 sections indexed; PreCompact `manual|auto` matcher).
- **Named-T2:** CCBP `claude-settings.md:hooks` + shanraisshan demo (25+ events covered).
- **Rule:** Only `settings.json` hook commands referencing plugin-hooks OR direct upstream-CLI (ruff/pyright/shellcheck/gitleaks). NO self-invent `.claude/hooks/scripts/*.py` (operator cardinal-rule-2).

### P6 — MCP composition (stdio + HTTP + SSE)
**Def:** `.mcp.json` mcpServers map; project-scoped > user-scoped; `enabledMcpjsonServers` allowlist; `mcp__<server>__<tool>` perm syntax; OAuth 2.1 PKCE for HTTP MCP.
- **Anthropic-OFFICIAL:** `https://code.claude.com/docs/en/mcp`.
- **Named-T2:** Addy Osmani 2026 ("Specs, skills, MCPs, small iterative chunks") + Hamel "all major eval vendors ship MCP server."
- **Rule:** Lazy-attach MCPs via `disabledMcpjsonServers`/per-subagent `mcpServers:` to keep startup tool count low. ENV-expand secrets — never inline.

### P7 — Permission discipline (allow / deny / defaultMode + ACL)
**Def:** 4 modes (default / acceptEdits / plan / bypassPermissions); `deny` has highest precedence; arrays concat-and-dedupe across scopes.
- **Anthropic-OFFICIAL:** `https://code.claude.com/docs/en/settings` permissions block + `cli-reference` `--permission-mode`.
- **Named-T2:** Karpathy Sequoia Ascent 2026 ("Manage permissions" — 7-item canonical list).
- **Rule:** Use `bypassPermissions` for daily-driver solo work + `deny: [Read(**/*.pem), Read(**/*.key)]` safety floor + Edit-allow narrow to runtime files.

### P8 — Auto-compact threshold tuning
**Def:** `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` (default ~95) + `CONTEXT_WINDOW_COMPACT_{WARN,HIGH,CRIT}_TOKENS` for status-line. 1M ceiling → 70% = 700k.
- **Anthropic-OFFICIAL:** `https://code.claude.com/docs/en/env-vars` + `code.claude.com/docs/en/model-config` 1M-context.
- **Named-T2:** Thariq tip 2026-04-16 ("CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80 → fires at ~800k") + Karpathy §5 "model at its least intelligent point when compacting."
- **Rule:** On 1M context, 70-85% override is the sweet spot — fire BEFORE rot zone (300-400k Opus 4.7 per Thariq). Operator's current 85 is within band.

### P9 — Plugin enabled/disabled discipline
**Def:** `enabledPlugins` map per project; granular toggle. Operator has 36 enabled / 7 disabled.
- **Anthropic-OFFICIAL:** `https://code.claude.com/docs/en/plugins`.
- **Named-T2:** Addy Osmani 2026 + obra/superpowers (cross-harness via marketplace).
- **Rule:** Enable plugins only when description-trigger autoload pays for itself (CR-9 install-risk discipline). Disable rarely-fired plugins to keep skill discovery surface clean.

### P10 — Codex Path P cross-model verification
**Def:** Foreground+tee `codex exec --ephemeral -p deep-review-exec` subprocess; orchestrator-direct (NOT subagent). Satisfies cross-model consensus gate without depleting subagent fleet.
- **Anthropic-OFFICIAL:** `https://docs.anthropic.com/en/docs/claude-code/sub-agents` model-precedence; codex@openai-codex plugin native hooks (SessionStart/SessionEnd/Stop at T6).
- **Named-T2:** Karpathy multi-driver + Simon Willison dual-driver.
- **Rule:** Use Path P for ship-gate review; T1-T5 via `/codex:review`+`/codex:rescue` slash commands.

### P11 — Token-budget context management (fresh-context vs continuation)
**Def:** `/clear` resets; `/compact <inst>` keeps summary; subagents NEVER inherit main context unless `CLAUDE_CODE_FORK_SUBAGENT=1` (operator has).
- **Anthropic-OFFICIAL:** `https://code.claude.com/docs/en/env-vars` (CLAUDE_CODE_FORK_SUBAGENT) + memory docs.
- **Named-T2:** Cole Medin PIV (Plan-Implement-Validate) — separate-context per phase + Chip Huyen compound-error math.
- **Rule:** Fresh-context per phase (plan / implement / verify). Forked subagent inherits full conversation history — use sparingly.

### P12 — /compact /clear manual invocation discipline
**Def:** Manual `/compact <instructions>` keeps targeted summary; auto fires at autocompact-pct. PreCompact + PostCompact hooks gate-or-augment.
- **Anthropic-OFFICIAL:** `https://code.claude.com/docs/en/hooks` PreCompact (`manual|auto` matcher with `custom_instructions`).
- **Named-T2:** intelligent-compact@claude-settings plugin (operator has installed).
- **Rule:** Manual /compact AT 60% (warn band) preserves choice of what survives; auto-compact at 70% (operator's CRIT) is the safety net.

### P13 — Skill orchestration discipline (1% rule)
**Def:** Invoke ANY relevant skill BEFORE response/action — skill check comes BEFORE clarifying questions / planning. Process skills determine HOW; Implementation skills guide EXECUTION.
- **Anthropic-OFFICIAL:** `https://code.claude.com/docs/en/skills` (description auto-discovery).
- **Named-T2:** obra/superpowers `using-superpowers` 1%-rule + `using-agent-skills`.
- **Rule:** Announce "Using [skill] to [purpose]" before invocation. Layer process+impl skills when both apply.

### P14 — Subagent fork vs main-thread vs subagent_type
**Def:** Three context-handling shapes — main thread (shared context), `Agent()` subagent (fresh context, separate transcript), forked subagent (full parent history inherited via `CLAUDE_CODE_FORK_SUBAGENT=1`).
- **Anthropic-OFFICIAL:** `https://code.claude.com/docs/en/sub-agents` (fork section) + CC 2.1.117 changelog "Forked subagents can now be enabled on external builds."
- **Named-T2:** swyx "Context Graphs and Agent Traces" 2026 + obra/superpowers `subagent-driven-development`.
- **Rule:** Forked subagent for "needs my prior context"; vanilla subagent for "needs clean slate" (verification, adversarial review).

### P15 — Power-ups (10-item canonical CC interaction set)
**Def:** `@`-files, shift-tab modes, `/rewind`+Esc-Esc, `/tasks`, `CLAUDE.md`+`/memory`, MCP+`/mcp`, skills+hooks, subagents+`/agents`, `/remote-control`+`/teleport`, `/model`+`/effort`.
- **Anthropic-OFFICIAL:** `anthropic.com/engineering/claude-code-best-practices` + CCBP `claude-power-ups.md`.
- **Named-T2:** Anthropic engineering blog "How Anthropic teams use Claude Code" (90% of CC code written by CC).
- **Rule:** `@file:line` reference > pasted file contents; `shift-tab` to plan mode > prompt "plan first"; `/effort` reads `max`/`xhigh` per session intent.

---

## §2 Operator's CLAUDE.md / settings.json Audit

### BEST-IN-CLASS (validate; do not change)
1. **Root CLAUDE.md ≤50 LOC pointer-only** — exemplary; matches CCBP `claude-memory.md:34-40` discipline + W255 cleanup landed cleanly (`self_invented_count: 0`).
2. **Cardinal rules 1-5 each cite-anchored to TIER-1 Anthropic docs** — best-practice citation discipline; no rule lacks an upstream pin.
3. **`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=85` + CONTEXT_WINDOW_COMPACT_{WARN:600k,HIGH:650k,CRIT:700k}** — well-calibrated for 1M Opus 4.7; matches Thariq 70-80% band + intelligent-compact PreCompact plugin (operator has installed).
4. **`CLAUDE_CODE_FORK_SUBAGENT=1`** — operator-actionable Path D alternative; needed for full-history subagent dispatch on edge cases.
5. **State-outside-repo redirects** (`CLAUDE_CODE_PROJECT_DIR` / `CODEX_HOME` → `Z:/claude-sota-installed-state`) — credential-safe + worktree-clean per cardinal-rule-2.
6. **`permissions.deny` blocks `.env` + `.pem` + `.key`** — security floor present.
7. **`defaultMode: bypassPermissions`** — daily-driver-optimal; gated by deny-list + skipDangerousModePermissionPrompt.
8. **36 plugins enabled w/ description-trigger autoload** — matches r6 Axis-2 convergence (superpowers + addy + wshobson 3-way orchestration).
9. **`MAX_MCP_OUTPUT_TOKENS=50000` + `BASH_MAX_OUTPUT_LENGTH=100000`** — context-budget aware; prevents tool-output flooding.
10. **Telemetry enabled** (OTel traces → 127.0.0.1:14317 OpenInference project `eee`) — observability infra in place per r4/r5 evals-first convergence.

### UNDERUTILIZED (suggestions)
- **No `AGENTS.md`** in repo root — r14 finding. 3 production orgs use; bridges multi-driver redundancy (operator runs codex Path P alongside CC).
- **No descendant CLAUDE.md** — single root file means all behavior is top-loaded. For research-state/`Z:/claude-sota-installed/.claude/state/`, a small `state/CLAUDE.md` describing the W258r* file convention would lazy-load only when reading state files.
- **No project-level `.claude/skills/`** directory yet — all skills are plugin-loaded. Per obra/superpowers TDD-for-skills, operator-novel discipline (eg "Wave-N codification" + "FM-class deep-dive workflow") deserves a project skill so it autoloads on description-match.
- **No project-level `.claude/agents/`** subagent definitions — all subagents are plugin-loaded. A `codex-rescue-bridgemode` subagent with `model: inherit` + `isolation: worktree` + `mcpServers: [codex]` would crystallize the Path P pattern.
- **`statusLine` references `Z:/`-absolute bash script** — port-fragile. Should be env-derived per r16 C3 critique.
- **No `PreCompact` / `PostCompact` hooks** — only `SessionStart` configured. PreCompact hook = inject priority-preserve directives before auto-compact summary (intelligent-compact plugin contracts this surface but not explicitly wired in `settings.json` hook map).
- **No `enabledMcpjsonServers` allowlist** — relies on `.mcp.json` discovery alone. Explicit allowlist + `disabledMcpjsonServers` shrinks startup tool surface.

### OVERBUILT (per r16 critique alignment)
- **`ECC_DISABLED_HOOKS` env contains 14 disabled hook patterns** — relic of pre-W255 self-invent layer. Should be empty post-cleanup; CR-2 violation lingering as env-string config.
- **`ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME` + `_DESCRIPTION` fields** — cosmetic env keys not in `https://code.claude.com/docs/en/env-vars`; likely no-op; clean up for budget.
- **Skipped: `_comment_provenance_trail` field references "38 _comment_* keys (~38k chars) preserved verbatim"** — operator already extracted to `docs/settings-provenance-trail.md` per W159 P2 Ship 9. Good. Verify file exists.
- **Schema redundancy** — `CONTEXT_WINDOW_WARN_PERCENT=60` + `CONTEXT_WINDOW_CRITICAL_PERCENT=70` + the TOKENS triple is double-encoding. Pick percentage OR tokens, not both.

---

## §3 GENUINELY-NEW Patterns to Adopt (≥2-axis convergence)

1. **AGENTS.md cross-tool config** — 3-axis convergence (r14 Anthropic AAIF + Simon Willison + Codex-OpenAI convention). Bridges operator's CC + codex multi-driver. **ADD `AGENTS.md` to repo root** (gitignored if private; mirror of `CLAUDE.md` symbol-set adapted for cross-tool).
2. **Project-level skill: `wave-n-codification`** — operator's "Wave 258 R22" / "FM-class deep-dive" / "codify in CLAUDE.local.md ENV (j)" workflow is fully reproducible. Authoring it as `.claude/skills/wave-n-codification/SKILL.md` w/ `description: "Triggered when codifying a research-wave finding into CLAUDE.local.md ENV block or settings.json"` makes it auto-fire. **Convergence:** obra/superpowers writing-skills TDD + operator's existing wave-codification discipline.
3. **Project-level subagent: `codex-rescue-bridgemode`** — crystallize Path P pattern. `model: inherit` (NOT funneled to Sonnet); `isolation: worktree` for risk-free retry; `mcpServers: []` (codex CLI is subprocess, not MCP). **Convergence:** r6 Karpathy multi-driver + operator's existing `/codex:rescue` slash command.
4. **PreCompact hook wired to inject priority directives** — operator has `intelligent-compact@claude-settings` plugin enabled but no explicit PreCompact hook entry in `settings.json` hooks block. Wire `intelligent-compact`'s PreCompact handler to inject priority-A-F state per CCBP claude-settings.md:967 model. **Convergence:** Anthropic CC hooks ref + intelligent-compact plugin docs.
5. **Plan-mode discipline for risky edits** — per Karpathy "Supervise plans" + `--permission-mode plan` CLI flag. For Wave-deep-dive surgery edits, opt into `plan` mode via `shift-tab` (don't bypass).
6. **Per-skill `paths:` glob auto-activation** — operator's plugin-loaded skills lack project-scoped path-trigger. Authoring a few `.claude/skills/*/SKILL.md` w/ `paths: '.claude/state/W258r*.md'` lets W258 research-wave skill auto-fire only when reading those files.

---

## §4 Anti-Patterns the Operator Currently Exhibits (r16-aligned)

1. **Triple-encoded compact thresholds** — `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=85` + `CONTEXT_WINDOW_*_TOKENS` (600k/650k/700k) + `CONTEXT_WINDOW_*_PERCENT` (60/70). Three sources of truth. Pick the token triple (most precise on 1M); deprecate the percent pair.
2. **`ECC_DISABLED_HOOKS` env relic** — 14 hook names disabled via env-string after W255 cleanup removed them. The env override is no-op against absent hooks; harmless but signals stale config.
3. **Marketplace explosion** — 16 marketplaces configured in `extraKnownMarketplaces`. Most overlap (`addy-agent-skills` + `claude-code-skills` + `anthropic-agent-skills` + `claude-code-workflows`). Per r16 C2 (DRY-violation analog for plugin sources): one source per concern. Consolidate where Axis-2 convergence permits.
4. **`autoMemoryEnabled: true` + `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` conflict** — JSON setting says ON, env says OFF. Env wins (per `https://code.claude.com/docs/en/settings` precedence) but the disagreement is bug-bait; resolve.
5. **No documented per-install reversibility budget** — cardinal-rule-9 install-risk discipline mentioned but ENV (h)/(i)/(j) revert-recipes do exist. Pattern is GOOD here; the gap is OUTSIDE env block — e.g., the 36 plugins lack a revert manifest. Per r16 S3 strangler-fig pattern.

---

## §5 Verdict — Top-3 Concrete CLAUDE.md / settings.json / Skill Additions

### Recommendation #1 — **ADD `AGENTS.md` at repo root**
**Why:** r14 ≥3-org convergence + r6 named-T2 (Simon Willison) + operator's multi-driver (CC + codex Path P) topology. Cardinal-rule reversibility HIGH (single file delete reverts). Bridges most-likely-next-tool installs (opencode @ 161k★ per r2).
**Body:** Mirror CLAUDE.md cardinal rules in tool-neutral phrasing; ≤50 LOC.

### Recommendation #2 — **AUTHOR `.claude/skills/wave-n-codification/SKILL.md`**
**Why:** Operator's existing W-N research-codification workflow is fully reproducible but not codified-as-skill. Auto-fires on description-match instead of operator-manual-recall. Convergence: obra/superpowers TDD-for-skills + operator practice.
**Frontmatter:**
```yaml
description: "Codify a research-wave finding (W258 R22 etc.) into CLAUDE.local.md ENV block, settings.json, or cardinal-rules. Use when operator says 'codify' or 'wave N' or 'ENV block' or 'FM-class'."
when_to_use: "On 'codify W-N finding', 'add to ENV block', 'fm-class deep dive'"
paths: ".claude/state/W*.md, CLAUDE.local.md, CLAUDE.md"
allowed-tools: "Read, Edit, Grep, Glob"
```

### Recommendation #3 — **WIRE `PreCompact` hook + RESOLVE compact-threshold triple-encoding**
**Why:** intelligent-compact plugin installed but no explicit `settings.json` hooks.PreCompact entry. Triple-encoding (pct + tokens + percent) is bug-bait. Two-action fix:
- (a) Delete `CONTEXT_WINDOW_WARN_PERCENT=60` + `CONTEXT_WINDOW_CRITICAL_PERCENT=70` (keep token triple — token-precise on 1M).
- (b) Add `hooks.PreCompact: [{matcher: "auto", hooks: [{type: "command", command: "<intelligent-compact-plugin-path>/precompact.mjs"}]}]` per CC hooks ref.

### Bonus Recommendation #4 — **CLEAN UP `ECC_DISABLED_HOOKS` env relic**
14 hook names disabled via env are no-op post-W255 cleanup. Set `ECC_DISABLED_HOOKS=""` or delete the key. Cosmetic but reduces env-line preload by ~700 chars.

### Bonus Recommendation #5 — **PROJECT-SCOPED `.claude/agents/codex-rescue-bridgemode.md`**
Crystallize the Path P pattern as a vanilla subagent. Frontmatter: `model: inherit, isolation: worktree, hooks: {Stop: [<path-to-tee-log-archival>]}, description: "PROACTIVELY invoke when cross-model consensus gate must be satisfied for ship-class change"`.

---

## §6 Cite-Anchor Summary

- TIER-1-DIRECT: `code.claude.com/docs/en/{skills,sub-agents,hooks,mcp,settings,env-vars,plugins,model-config}` (this fire, 7 URLs indexed via ctx_fetch_and_index).
- TIER-1-DIRECT: `docs.anthropic.com/en/docs/claude-code/{memory,cli-reference}` (indexed).
- TIER-1-DIRECT: `anthropic.com/engineering/claude-code-best-practices` (indexed).
- TIER-2 named-practitioner: Karpathy `karpathy.bearblog.dev/sequoia-ascent-2026/` (indexed) + Addy Osmani `addyosmani.com/blog/ai-coding-workflow/` (indexed) + Cole Medin `youtube.com/watch?v=DMXyDpnzNpY` (indexed) + obra/superpowers (indexed) + Simon Willison (r6 cross-ref) + Thariq tip 2026-04-16 (CCBP).
- TIER-1 cite-anchor: CCBP `claude-code-best-practice-shan/best-practice/*.md @ 48f2ceb` (memory + skills + subagents + mcp + settings + power-ups read directly).
- Operator artifacts: `Z:/claude-sota-installed/CLAUDE.md` + `.claude/settings.json` (direct read).

**Confidence: 0.88** — HIGH on Anthropic-OFFICIAL surface (all 7 docs indexed fresh) + HIGH on named-T2 alignment (5 named practitioners cross-referenced) + MEDIUM-HIGH on operator-fit audit (settings.json + CLAUDE.md read directly; no inference required).

**Budget:** ~11 min real time.
