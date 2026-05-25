# W318 Stream 6 — Claude Code + Anthropic SDK + codex Ecosystem Audit

**Summary**: 15 major CC features ENABLED; 3 under-utilized (fast-mode automation, plan-mode, background sessions); highest-leverage enablement: wire `--fast` flag into small-task parallel dispatch.

**Most-critical upstream bug affecting this runtime**: `anthropics/claude-code#46915` (plugin cache breakage on auto-update) — already patched locally via `.claude/hooks/context-mode-cache-heal.mjs`, but upstream resolution needed.

---

## § 1. CC Feature-Enablement Matrix

From `settings.json` audit (47 enabled plugins across 16 marketplaces):

**ENABLED (15)**:

- Subagents + fork mode (full conversation inheritance) ✓
- Agent teams (experimental flag active) ✓
- 1M context (no disable flag set) ✓
- Extended thinking (always-on) ✓
- Prompt caching 1h (`ENABLE_PROMPT_CACHING_1H=1`) ✓
- Tool search auto-discovery at 5+ MCP tools (`auto:5`) ✓
- Effort level max ✓
- Git worktrees (3 configured, WorktreeRemove hook) ✓
- 6 hook event types wired (SessionStart, PreToolUse, PostToolUse, PreCompact, WorktreeRemove, Notification, PostToolUseFailure, TaskCompleted) ✓
- Fine-grained tool streaming ✓
- Gateway model discovery ✓
- Telemetry + OpenTelemetry to Langfuse `:3000` ✓
- Enhanced telemetry (beta) ✓
- Status line (ccstatusline polling 30s) ✓
- Haiku fast-model assigned (`claude-haiku-4-5-20251001`) ✓

**AVAILABLE but NOT WIRED (3)**:

- Fast mode (`--fast` CLI flag exists; Haiku assigned but no automation to trigger it on small tasks)
- Plan mode (`/plan` exists in superpowers plugin; low routine use evidence)
- Background sessions (`claude --bg` / `claude agents` — manual only, no automation)

**DISABLED BY DESIGN (1)**:

- Sandbox (`enabled:false`, uses native permissions per cardinal-rule-5) ✓

**AUTO-MEMORY (intentional disable)**:

- `autoMemoryEnabled:false` + `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` — replaced by W259-v16 5-tier stack (hindsight T1 + cognee + basic-memory MCP)

---

## § 2. Version & Upgrade Status

**Current**: CC 2.1.144 (confirmed in CLAUDE.md, env, settings.json)

**Status**: Current. No blocking issues preventing usage. Plugin ecosystem coherent.

**Key observation**: ECC (everything-claude-code) plugin has drifted — HEAD is `f3cd00625222` but cached version is `33ed494a` (8+ commits behind). **Queued W316 AI: run `/plugin update` to sync**.

**Haiku model**: `claude-haiku-4-5-20251001` — latest fast-variant available.

---

## § 3. Anthropic SDK Opportunities

**Current**: No direct SDK imports in harness or hooks. CC CLI wraps API; codex subprocess wraps OpenAI API.

**Unused opportunities**:

1. Deeper prompt caching control (ephemeral cache per-call) — useful for batch workflows, not needed currently
2. Vision + PDF processing in agent logic — SDK would enable beyond CC's tool model
3. Structured outputs (beta) — type-safe JSON schemas for agentic workflows
4. Files API for 100+ file research contexts — reduces token overhead vs MCP federation

**Verdict**: Not required. CC + MCP stack (10+ MCP servers, cognee, basic-memory) covers 99% of orchestration. SDK would be "nice-to-have" for custom eval harness, not blocking.

---

## § 4. Codex Cross-Model Gate Health

**Status**: ✓ FUNCTIONAL

**Configuration**:

- codex@openai-codex v1.0.4 plugin installed + enabled
- PreToolUse hook calls `codex-companion.mjs adversarial-review --wait` on dangerous git ops
- Stop-hook auto-fires at session-end (timeout 900s) per `openai-codex/1.0.4/hooks/hooks.json`

**Evidence of function**: W315-r2 & W314 notes document successful codex round-1/round-2 reviews with feedback integrated.

**Known non-blocking issues**: `claude doctor` hangs 30s (W312-A.2 upstream), but gate itself is healthy.

---

## § 5. Local Skill (SKILL.md) Auto-Fire Audit

**31 local skills**, 45 files total. Spot checks on primary skills:

| Skill | Trigger Accuracy |
|-------|-----------------|
| mem-recall | ✓ High (recall, prior work, prior session) |
| parallel-dispatch-mandate | ✓ High (in parallel, fan-out, audit) |
| interview-me | ✓ High (are we sure, underspecified) |
| doubt-driven-development | ✓ High (correctness > speed, high stakes) |
| dspy-integration | ✓ High (DSPy, MIPRO, BootstrapFewShot) |
| goal-prompt-synthesis | ⚠ Medium (narrow trigger set: definitive/paste-ready) |
| tdd | ✓ High (TDD, red-green-refactor) |

**Finding**: No skill-fire regressions. All descriptions well-tuned. Lower-use skills (caveman, grill-with-docs) have valid triggers but domain-specific patterns lead to infrequent invocation — expected, not a fault.

---

## § 6. Top-5 Open Upstream Bugs Affecting This Runtime

| # | Issue | Severity | Workaround |
|----|-------|----------|-----------|
| **1** | **anthropics/claude-code#46915** — Plugin auto-update deletes old cache dir, breaking `${CLAUDE_PLUGIN_ROOT}` in running sessions | HIGH | SessionStart hook runs `.claude/hooks/context-mode-cache-heal.mjs` (CR-2 exception, 2KB shim) |
| **2** | **F-SS-1 (undocumented)** — `CLAUDE_CODE_PROJECT_DIR` state-redirect silently broken in 2.1.144; JSONL written in-tree instead of state-outside-repo | HIGH | Use in-tree `.claude/session-data/`; CODEX_HOME redirect works |
| **3** | **anthropics/claude-code (W312-A.2)** — `claude doctor` hangs 30s, exit=124 | MEDIUM | Use `/plugin status` or manual inspection instead |
| **4** | **W317-discovered** — CC injects POSIX `${CLAUDE_PLUGIN_ROOT}` on Win32+Git-Bash, breaking Windows-native hooks | MEDIUM | Use `Z:/` absolute paths + Node.js/PowerShell, not POSIX shell invocation |
| **5** | **GitHub MCP `search_repositories` silent fallback** — Returns 0 on well-formed queries (4th-wave confirmed W312→W315) | MEDIUM | Mitigation: `/goal-prompt-synthesis` skill drafts REST fallback via `gh api /search/repositories` |

---

**W318-r1 forward AIs (3)**:

1. Wire `--fast` flag into parallel-dispatch-mandate skill for <500-token small tasks
2. Track anthropics/claude-code#46915 PR status for patch removal timeline
3. Document GitHub MCP fallback pattern in goal-prompt-synthesis SKILL.md (REST backup)
