# W283 Stream 4 — DeepWiki + Repomix Ingest of Top 5 SOTA Repos

**Date**: 2026-05-17
**Method**: `mcp__deepwiki__ask_question` (5 repos, fresh Q&A) + Grep across 52 packed XMLs at `Z:/claude-sota-installed/tmp/repomix-library/packed/` for SOTA-pattern convergence.
**Goal**: surface 3-source-converged primitives missing from this runtime, flag anti-patterns, rank adoption candidates.

---

## Per-repo ingest summary (deepwiki + grep)

### 1. `anthropics/claude-code` (canonical CLI)

DeepWiki Q&A surfaced the **full canonical hook taxonomy** — this is the authoritative list to gap-check against:

| Hook | This runtime? | Status |
|---|---|---|
| `PreCompact` | YES | wired (line 120 of `.claude/settings.json`) |
| `PostCompact` | NO | gap |
| `PreToolUse` / `PostToolUse` | YES | wired (98, 109) |
| `Stop` / `SubagentStop` | YES Stop / NO SubagentStop | partial |
| `SessionStart` / `SessionEnd` | YES SessionStart / NO SessionEnd | partial |
| `TaskCreated` / `TaskCompleted` | NO | gap — agent-teams hook |
| `TeammateIdle` | NO | gap — agent-teams hook |
| `Elicitation` / `ElicitationResult` | NO | gap — MCP structured-input intercept |
| `InstructionsLoaded` | NO | gap — fires when CLAUDE.md loads |
| `WorktreeCreate` / `WorktreeRemove` | YES (settings) | wired |
| `Notification` | YES | wired (141, W280g) |

**CLI flags surfaced**: `--fork-session` (forked subagents on external builds — requires `CLAUDE_CODE_FORK_SUBAGENT=1`, already set), `--agent` (per-session override), `--worktree`/`-w` (isolated git worktree start). **Sessions**: `/branch` (formerly `/fork`) writes pointer + hydrates on read (cheaper than full-copy fork). **Background**: `Ctrl+B` backgrounds foreground tasks; `Ctrl+F` kills all background agents. **Agent Teams**: research-preview behind `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (already set). **`teammateMode`**: `auto` / `in-process` / `tmux` / `iterm2` — this runtime should pick one explicitly.

---

### 2. `shanraisshan/claude-code-best-practice` (CCBP)

DeepWiki confirms the W260-W280 primitives this runtime already cite-anchors:

- `PreCompact` matcher `compact_trigger` distinguishes `manual` vs `auto` — **this runtime's PreCompact does NOT branch on this**; opportunity to tune.
- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` defaults to ~95% — W280c removal was correct.
- **Best-practice CCBP citation**: "manual `/compact` at ~50% context usage, model is least intelligent when auto-compacting due to context rot" — supports current `everything-claude-code:strategic-compact` skill workflow.
- `teammateMode` (`auto`/`in-process`/`tmux`) — **not pinned in this runtime's settings.json**; CCBP recommends `tmux` for worktree-parallel teams.
- `disableLogging` in `hooks-config.json` — not used here; runtime relies on plugin observability instead.
- **No Langfuse coverage** in CCBP itself — Langfuse integration is W268-runtime-specific, not in upstream best-practice.

---

### 3. `addyosmani/agent-skills` (orphan, NOT installed)

DeepWiki reveals **the SOTA cross-model-review skill** absent from this runtime:

- **`doubt-driven-development`** skill: "explicitly offers user a cross-model second opinion via Gemini CLI or Codex CLI" after single-model review. **Critical anti-pattern caveat for this autonomous /loop runtime**: the skill mandates "skip cross-model review in non-interactive environments (like CI/CD loops) and explicitly announce the skip" — so installation needs `interactive=false` short-circuit.
- **Slash-command lifecycle phases**: `/spec` → `/plan` → `/build` → `/test` → `/review` → `/code-simplify` → `/ship` — `/ship` is a **parallel fan-out orchestrator** running `code-reviewer` + `security-auditor` + `test-engineer` against a change, merged into go/no-go. This is structurally identical to the `/team-spawn review` preset already installed via `agent-teams:team-review`, so direct adoption would duplicate.
- **Explicit anti-pattern call-out from upstream**: "router personas / sequential orchestrators that paraphrase" are discouraged in favor of direct invocation or parallel fan-out. **Aligns with this runtime's W269 agent-team mandate**.

**Adoption verdict for this runtime**: extract `doubt-driven-development` skill only (cross-model gate logic) — the rest duplicates `wshobson/agents` already installed.

---

### 4. `wshobson/agents` (claude-code-workflows marketplace — INSTALLED)

DeepWiki confirms full preset surface — this runtime has it wired but **may not be using every preset**. Verified canonical surface:

- **185 specialized agents** + **16 multi-agent workflow orchestrators** + **agent-teams plugin** (4 specialist agents: `team-lead`, `team-reviewer`, `team-debugger`, `team-implementer`).
- **7 `/team-spawn` presets**: `review`, `debug`, `feature`, `fullstack`, `research`, `security`, `migration` — **all 7 are in the W280e bullet of this runtime's CLAUDE.md**.
- **6 auto-fire skills**: `team-composition-patterns`, `task-coordination-strategies`, `parallel-debugging`, `multi-reviewer-patterns`, `parallel-feature-development`, `team-communication-protocols` — all 6 visible in this session's skills list ("agent-teams:*").
- **Three-tier model strategy**: Opus 4.7 (architecture/orchestration), Sonnet 4.6 (development), Haiku 4.5 (deployment/cheap-path). **This runtime currently does NOT set `model:` per-subagent** in installed-plugin agents — opportunity to tune team-lead → Opus / team-implementer → Sonnet / team-deploy → Haiku to align cost/perf.
- **Flags**: `--name`, `--members N`, `--delegate`, `--plan-first` (for `feature` preset).

---

### 5. `affaan-m/everything-claude-code` (ECC — INSTALLED)

DeepWiki:

- 48 agents, **182 skills**, 14 MCP servers, **8 hook event types + 20 hook scripts**, 68 legacy command shims.
- Bundles unique skills: `tdd-workflow`, `security-review`, `coding-standards`, `frontend-patterns`, `backend-patterns`, `e2e-testing`, `api-design`, plus all 200+ surface in skills list above.
- **Anti-patterns it flags upstream (relevant to this runtime)**:
  - DO NOT add `"agents"` field to plugin manifest (auto-loaded by convention).
  - DO NOT add `"hooks": "./hooks/hooks.json"` to plugin manifest in CC v2.1+ (auto-loaded by convention; causes **duplicate execution** errors).
  - DO NOT remove `"mcpServers": {}` (re-enables root `.mcp.json` auto-discovery → overlong tool names).
- **Cross-platform**: bundles AGENTS.md universal cross-tool file (Claude Code / Cursor / Codex / OpenCode). Codex CLI lacks hook execution parity — ECC enforcement in Codex via `AGENTS.md` only.
- **Explicit non-duplication**: does NOT re-bundle anthropics-canonical skills (`claude-api`, `frontend-design`, `skill-creator`) — directs users to `anthropics/skills`.

---

## Cross-repo converged patterns NOT in current runtime (≥3-source min)

| Pattern | Sources (≥3) | Current runtime status | Adoption priority |
|---|---|---|---|
| **`teammateMode: tmux`** explicit pin for agent-teams | `anthropics/claude-code` (deepwiki), `shanraisshan/CCBP` (deepwiki + xml), `wshobson/agents` (xml + deepwiki) | NOT pinned in `.claude/settings.json` | **HIGH** — single-line addition, unblocks worktree-parallel teams |
| **`InstructionsLoaded` hook** (CLAUDE.md load event) | `anthropics/claude-code`, `affaan-m/ECC`, `shanraisshan/CCBP` | NOT wired | MEDIUM — useful for memory-tier validation on session-start |
| **`PostCompact` hook** (post-summary cleanup) | `anthropics/claude-code`, `shanraisshan/CCBP`, `affaan-m/ECC` | NOT wired | MEDIUM — pairs with strategic-compact skill |
| **`SubagentStop` hook** (per-subagent finalization, distinct from `Stop`) | `anthropics/claude-code`, `affaan-m/ECC`, `wshobson/agents` (via team-* lifecycle) | NOT wired (only `Stop` is wired) | MEDIUM — adversarial-review can use it for codex T6 |
| **`Elicitation` / `ElicitationResult` hooks** (MCP structured-input intercept) | `anthropics/claude-code`, `affaan-m/ECC`, `vectorize-io/hindsight` | NOT wired | LOW — MCP-specific, current MCP servers don't use elicitation |
| **`TaskCreated` / `TaskCompleted` hooks** (agent-teams lifecycle) | `anthropics/claude-code`, `wshobson/agents`, `affaan-m/ECC` | NOT wired (requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` which IS set) | MEDIUM — would let codex review-gate fire per-task instead of per-Stop |
| **`compact_trigger` matcher** (manual vs auto PreCompact branching) | `anthropics/claude-code`, `shanraisshan/CCBP`, `affaan-m/ECC` | PreCompact wired but does NOT branch on trigger | LOW — current single-branch fires for both |
| **Three-tier model assignment** (Opus/Sonnet/Haiku per subagent) | `anthropics/claude-code`, `wshobson/agents`, `addyosmani/agent-skills` (cost-aware), `affaan-m/ECC` | Per-agent `model:` field NOT systematically tuned | **HIGH** — major cost/latency win on parallel team dispatches |
| **`/branch` (pointer-fork)** discipline | `anthropics/claude-code`, `shanraisshan/CCBP`, `affaan-m/ECC` | Mentioned in CLAUDE.md W280d but no enforcement | LOW — operator-discipline, no code change needed |
| **`doubt-driven-development` cross-model gate** | `addyosmani/agent-skills`, `shanraisshan/CCBP`, `affaan-m/ECC` (via `aside`/`council` skills) | Codex review-gate exists (W280a Stop hook) but no `doubt-driven` skill for **mid-task** opt-in | LOW — codex T6 already adversarial; doubt-driven is interactive-first |

---

## Anti-patterns / things-to-avoid surfaced

1. **Plugin-manifest `"agents"` / `"hooks"` field** — both auto-loaded by convention in CC v2.1+; declaring them causes duplicate execution. (ECC source.) — **NOT in any of this runtime's plugin manifests today; stay clean**.
2. **Router personas / sequential orchestrators that paraphrase** — discouraged by `addyosmani/agent-skills` upstream; prefer direct invocation or parallel fan-out. **Aligns with this runtime's W269 agent-team mandate.**
3. **Interactive-only `doubt-driven-development` skill in autonomous `/loop`** — upstream explicitly says "skip in non-interactive environments and announce the skip". Any adoption MUST short-circuit on `$ENV{NONINTERACTIVE}` or equivalent. **This runtime is autonomous-loop-first → ECC `aside` skill or codex T6 cover this surface more loop-safely.**
4. **UI-wrapper TUIs** (claude-squad, crystal, ccmanager) appear in packed XMLs — already REJECTED per W282 verdict.
5. **Removing `mcpServers: {}` from plugin manifest** re-enables `.mcp.json` auto-discovery → overlong tool names. (ECC source.)
6. **Single-repo single-source claims**: the `--fork-session` / `/branch` distinction appears in only 5 files, mostly Anthropic-canonical. **Not a single-source bias** since DeepWiki Q&A independently confirms the same canonical surface — counts as authoritative-source, not single-repo.
7. **Langfuse coverage is W268-runtime-specific** — not in upstream CCBP or canonical CC. Stay self-hosted.

---

## Top 5 adoption candidates ranked by convergence × harness-fit

| # | Candidate | Convergence | Harness fit | Effort | Notes |
|---|---|---|---|---|---|
| 1 | **`teammateMode: tmux` pin in settings.json** | 3-source (anthropics/CCBP/wshobson) | HIGH — autonomous /loop already uses worktrees | 1-line | Unblocks worktree-parallel team-spawn on this Windows host (PowerShell-compatible via WSL2 tmux or native `iterm2`-equivalent fallback). Verify Windows path. |
| 2 | **Three-tier model assignment per subagent** (Opus/Sonnet/Haiku) | 4-source (anthropics/wshobson/addyosmani/ECC) | HIGH — direct cost/latency win on every `/team-spawn` | MEDIUM — touch each installed agent's frontmatter | Largest tangible saving. Start with `team-lead`=Opus, `team-implementer`=Sonnet, `team-reviewer`=Sonnet, `team-debugger`=Sonnet, deploy/format=Haiku. |
| 3 | **`SubagentStop` + `TaskCompleted` hooks → codex review-gate per-subagent** | 3-source (anthropics/wshobson/ECC) | HIGH — current `Stop` hook fires once per top-level task; subagent-level review catches issues earlier | MEDIUM — extend W280a Stop hook to also handle SubagentStop | Pairs with W269 agent-team mandate — every team-implementer return goes through codex T6. |
| 4 | **`PostCompact` + `InstructionsLoaded` hooks for memory-tier validation** | 3-source (anthropics/CCBP/ECC) | MEDIUM — current memory tiers (W259-v16) lack validate-on-load step | MEDIUM | After compact, re-validate hindsight cache + graphiti uptime; on InstructionsLoaded, audit CLAUDE.md LOC ≤50 invariant. |
| 5 | **Extract `addyosmani:doubt-driven-development` skill** with autonomous-loop guard | 2-source (addyosmani/CCBP echo) — **does NOT meet 3-source min** | LOW — autonomous-loop conflict | HIGH | **DEMOTE / DO NOT ADOPT**: only 2 independent sources; codex T6 already covers adversarial-review for this runtime; interactive-first by design. Listed only to explicitly mark as rejected. |

**Final ranking** (3-source rule applied — candidate #5 demoted):

1. `teammateMode: tmux/iterm2` pin
2. Three-tier model assignment per installed subagent
3. `SubagentStop` + `TaskCompleted` hooks → codex T6 review-gate

---

## Sources

- DeepWiki Q&A (5 repos, 2026-05-17): anthropics/claude-code, shanraisshan/claude-code-best-practice, addyosmani/agent-skills, wshobson/agents, affaan-m/everything-claude-code.
- Packed XMLs at `Z:/claude-sota-installed/tmp/repomix-library/packed/` (52 repos, Grep-scanned for 10 SOTA-pattern axes).
- Runtime state: `Z:/claude-sota-installed/.claude/settings.json` (PreCompact wired, SessionEnd/PostCompact/SubagentStop/TaskCompleted/InstructionsLoaded NOT wired).
