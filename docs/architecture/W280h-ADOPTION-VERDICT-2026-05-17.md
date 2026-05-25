# W280h — Adoption Candidate Verdict (2026-05-17)

Research-only deliverable per W280 P4 mandate:
"Require 3-source convergence + harness-fit BEFORE install."

## Summary

| Candidate | Verdict | Confidence | Reason |
|---|---|---|---|
| slopus/happy | **DEFER** | medium | Healthy upstream (20.8k★ MIT, active 2026-05-17) but mobile push wasted on autonomous-`/loop`+`bypassPermissions` posture |
| disler/claude-code-hooks-mastery | **REJECT** | high | Repo is `.claude/hooks/*.py` self-invent — would re-introduce exactly the R2 violation W255 purged (22,060 LOC). Cite-only, no install. Also no LICENSE |
| intelligent-compact | **REJECT** | high (phantom-confirmed) | GitHub search returned 0 repos with that name; nearest match is rocketlabs-ai/infinite-context (4★, different name). Already flag-enabled in `enabledPlugins.json:167` (`intelligent-compact@claude-settings:true`) but no install state — harmless dangling toggle |
| claude-task-master | **REJECT** | high (Cursor-bound-confirmed) | README literally "designed to work seamlessly with Cursor AI"; capability already covered by installed `agenthub` + `conductor` + `speckit` triple |
| cc-switch | **REJECT** | high | Tauri 2 desktop GUI — breaks autonomous `/loop` + Z:-portable design; provider switching already handled via env vars + `ANTHROPIC_BASE_URL` |
| claude-code-router | **REJECT** | high | Routes CC requests to GLM/DeepSeek/OpenRouter — architecturally defeats the Opus+Codex GPT-5.5 cross-model-consensus gate (R3 backbone). Same principle as the documented `CLAUDE_CODE_SUBAGENT_MODEL` "OFF" rationale in CLAUDE.local.md |
| awesome-claude-prompts | **REJECT** | high | Markdown prompt list (not a plugin); targets `claude.ai` web UI; completely subsumed by installed 700+ skill library |

**Net adoptions: 0**. The W280 "3-source convergence + harness-fit BEFORE
install" gate worked as intended — every candidate failed at least one
cardinal-rule / harness-fit check on inspection.

## Per-candidate deep-dive

### slopus/happy — DEFER (medium confidence)

- **GitHub**: https://github.com/slopus/happy | active 2026-05-17 | 20.8k★ | MIT
- **Claim**: mobile push notifications for Claude Code idle-prompt
- **Harness-fit (4-axis)**:
  1. Assumes interactive operator: **YES** (push notifications presume a
     human checking the phone) — defeats autonomous-`/loop` posture
  2. Claude-Code-native: yes (CC-targeted)
  3. Already-installed capability: partial overlap with W280g
     Notification beep (in-terminal, local-only signal)
  4. Self-invent hook: no — uses CC's Notification hook event
  5. Windows portability: claimed cross-platform via web app + push
- **3-source convergence**: official repo (1) + author Twitter (2)
  + Hacker News thread (3) ✓
- **Verdict**: DEFER. Adopt only if operator posture shifts away from
  unattended `/loop` (i.e., back to interactive single-session mode).

### disler/claude-code-hooks-mastery — REJECT (high confidence)

- **GitHub**: https://github.com/disler/claude-code-hooks-mastery
  | 1.6k★ | no LICENSE file
- **Claim**: hooks reference / educational repo
- **Harness-fit**:
  1. Repo contents: 19 `.claude/hooks/*.py` self-invent scripts
  2. **R2 violation**: installing/copying would re-introduce exactly
     the self-invent pattern W255 purged (33 `.py` files + 22,060 LOC)
  3. No license — cannot redistribute or copy excerpts safely
- **3-source convergence**: repo (1) + Reddit thread (2) +
  Anthropic Discord mention (3) — convergence on EDUCATIONAL VALUE,
  not adoption-fit
- **Verdict**: REJECT for install. Cite as reference in CLAUDE.md
  pointers only if needed for hook-pattern examples.

### intelligent-compact — REJECT (phantom-confirmed)

- **GitHub**: search for `repo:intelligent-compact` → 0 results;
  search `"intelligent-compact"` (quoted) → 0 results matching this
  name as a repo. Nearest false positive: rocketlabs-ai/infinite-context
  (4★, different concept).
- **Current state**: `enabledPlugins.json:167` has
  `intelligent-compact@claude-settings:true` — but `claude-settings`
  is not a real marketplace. This is a dangling enable-toggle
  pointing at a phantom plugin. Harmless (no actual install state)
  but should be cleaned up in a follow-on commit.
- **Verdict**: REJECT — does not exist as a real upstream artifact.
  Recommend: flip the enabledPlugins entry to false (or remove
  entirely) in a hygiene commit.

### claude-task-master — REJECT (Cursor-bound)

- **GitHub**: https://github.com/eyaltoledano/claude-task-master | 7k★
- **Claim**: task-master CLI for AI-assisted development
- **Harness-fit**:
  - README opening line: "Claude Task Master is designed to work
    seamlessly with Cursor AI"
  - Capability already covered by installed `agenthub` (task
    orchestration) + `conductor` (workflow orchestration) + `speckit`
    (spec-driven task generation)
- **Verdict**: REJECT — vendor-bound + redundant.

### cc-switch — REJECT

- **GitHub**: https://github.com/farion1231/cc-switch | ~500★
- **Claim**: Claude Code provider/model switcher (Tauri 2 desktop GUI)
- **Harness-fit**:
  - Tauri 2 = native desktop window — incompatible with autonomous
    `/loop` headless posture
  - Z:-portable design forbids per-machine desktop installs
  - Provider switching already handled via env vars (`ANTHROPIC_API_KEY`,
    `ANTHROPIC_BASE_URL`, `CLAUDE_CODE_USE_BEDROCK`, etc.)
- **Verdict**: REJECT — wrong UX paradigm for this runtime.

### claude-code-router — REJECT (architectural conflict)

- **GitHub**: https://github.com/musistudio/claude-code-router | 5k★
- **Claim**: route Claude Code requests to GLM/DeepSeek/OpenRouter/etc.
- **Harness-fit**:
  - Defeats the Opus + Codex GPT-5.5 cross-model-consensus gate
    (R3 backbone — `Reviewer: codex GPT-5.5 via codex CLI subprocess`
    in CLAUDE.md Architecture)
  - Same principle as the documented `CLAUDE_CODE_SUBAGENT_MODEL`
    "OFF" rationale in `CLAUDE.local.md` env section ("deprecated
    depletion-mode bypass; funnels every subagent to a Sonnet
    stand-in and defeats the cross-model gate")
- **Verdict**: REJECT — architecturally incompatible with cross-model
  consensus design.

### awesome-claude-prompts (claude-code-prompts) — REJECT

- **GitHub**: https://github.com/langgptai/awesome-claude-prompts | 5k★
- **Claim**: curated Claude prompt list
- **Harness-fit**:
  - Markdown list, not a plugin — no `.claude-plugin/` structure
  - Targets `claude.ai` web UI prompts, not Claude Code skill format
  - Completely subsumed by the installed 700+ skill library
    (superpowers + ECC + addy-agent-skills + wshobson + ...)
- **Verdict**: REJECT — not a real plugin; capability already
  thoroughly covered.

## Recommended actions

### Install
- **none** (all candidates failed harness-fit gate)

### Defer pending posture change
- `slopus/happy` — re-evaluate if operator returns to attended
  interactive sessions

### Reject (do not install)
- `disler/claude-code-hooks-mastery` (cite-only)
- `intelligent-compact` (phantom — also: flip dangling
  `enabledPlugins.json:167` toggle to false in hygiene commit)
- `claude-task-master` (Cursor-bound)
- `cc-switch` (desktop GUI)
- `claude-code-router` (defeats cross-model gate)
- `awesome-claude-prompts` (web-UI prompts, not plugin)

### Follow-on hygiene
- Flip `intelligent-compact@claude-settings` enabledPlugins entry to
  false (or remove); audit other potentially-phantom toggles.

## Method

Generated by `general-purpose` agent (task `a48fe17fc01bc3e3a`) via
WebSearch + WebFetch (GitHub API + READMEs fetched 2026-05-17) +
Context7 docs lookup. Verdict file originally written to
`Z:/claude-sota-installed-state/wt/w280/...` but lost when the worktree
was removed mid-session for branch-checkout; re-created from agent's
in-context summary (faithful to verdict, slightly compressed from the
agent's original ~1,500-word verdict file).

## Closes

W280 P4(h).
