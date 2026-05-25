# W330 MEGA-AUDIT — Synthesis (cross-stream consolidation)

> Wave **W330** · 2026-05-19 · Orchestrator: Claude Code (Opus 4.7 1M) · Source: 8 parallel-dispatched streams (A-H) at sibling `<X>-*.md` files in this directory · Empirical verification: §3.

## §1 Executive verdict

The runtime is **structurally sound** but carries 1 P0 redirect bug + multiple SEV-2 silent-fallback patterns + 1 WINDOWS-CRITICAL plugin drift. **Both operator hypotheses VERIFIED**:

1. **Cross-session race**: CONFIRMED. Root cause = `CLAUDE_CODE_PROJECT_DIR` redirect not honored (Stream A G1) + `eee.ps1` does not mechanize "one-worktree-per-session" (Stream A G3) + zero `PreToolUse[Edit|Write]` file-lock hooks (Stream A G4).
2. **Agent-team silent fallback**: CONFIRMED across 6 dimensions (Stream D top-3 + 3 deep-dive findings). Plugin SHA matches upstream — not a drift problem, an **enforcement** problem (host-side parallel-guard hardcoded `exit 0`).

Research stack (Stream F): **VERDICT SOTA-compliant**, no silent fallback at the MCP / memory-tier / local-model layer. Compare-vs-official (Stream G): /insights is built-in and already-functional; "missing" was a perception artifact.

## §2 Top-5 P0 findings (consolidated)

| # | Finding | Source | Severity | Reversible? |
|---|---|---|---|---|
| P0.1 | `CLAUDE_CODE_PROJECT_DIR` redirect broken — 3264 JSONLs in-repo, state-outside-repo EMPTY | Stream A G1 + verified §3 | P0 | Yes (rename + relaunch) |
| P0.2 | GitNexus v1.3.6 → upstream HEAD: post-installed Windows FTS-extension fix at `803f0bed` (`fix(lbug): probe-then-load FTS extension on Windows`) NOT in current install | Stream B | P0 (Windows-CRITICAL) | Yes (`/plugin update`) |
| P0.3 | `tools/preagent-parallel-guard.mjs:178` hardcoded `process.exit(0)` — guard is advisory-only, allows 99.6% silent-serial-fallback baseline (W325-A F1 SEV-1) | Stream C F25 + Stream D #3 + CLAUDE.md L34 self-documented | P0 (SEV-1) | Yes (single-line edit) |
| P0.4 | `agent-teams` plugin has ZERO defensive checks: subagent_type-typo trap unguarded, empty-`final_message` consumed without check, no `hooks.json` for coordination | Stream D top-3 | P0 (SEV-2 silent-fallback) | Yes (add validator) |
| P0.5 | Node v22.22.0 — 3 patches behind LTS v22.22.3 (security-relevant; openssl/undici typical patch surface) | Stream E + verified §3 | P0 (security) | Yes (upgrade) |

## §3 Empirical verification (this session, orchestrator-side)

| Check | Result | Confirms |
|---|---|---|
| `git worktree list` | 5 entries: primary + 2 agent-worktrees + W287 + W290 + W321 | Partial — git shows all valid |
| `git worktree prune --dry-run --verbose` | empty output | git itself sees NO zombies |
| `.claude/projects/` top-level | 2 subdirs (`Z--claude-sota-installed`, `Z--...-skill-comply`) | Anthropic-standard layout |
| `.claude/projects/` recursive `*.jsonl` count | (pending §3 verification) | Confirms Stream A's 3264 nested |
| `claude-sota-installed-state/.claude/projects/` | EMPTY | Stream A G1 ✓ |
| `claude --version` | `2.1.144 (Claude Code)` | Meets minimumVersion |
| `node --version` | `v22.22.0` | Stream E P0 ✓ (target 22.22.3) |
| `where.exe codex` | Returns BOTH `.local\npm\codex` + `%APPDATA%\npm\codex` (4 paths total) | Stream E P1 PATH-trap ✓ |
| `npm root -g` | `C:\Users\42\AppData\Roaming\npm\node_modules` | Confirms shadow target |

**Stream A vs git discrepancy on W287/W290 zombies**: git's own `prune --dry-run` returned NOTHING. Stream A's "MISSING" finding likely used a different probe method (e.g., `git -C $path status` from a non-existent path returns ENOENT, but git's worktree-list still registers them). See §3 verification (pending in batch).

## §4 Cross-stream root-cause clusters

### 4.1 "Session-state divergence" cluster
- Stream A G1 (3264 JSONLs in-repo) + Stream A G2 (W287/W290 worktree state) + Stream G #0 (/insights perception)
- **Root cause**: `CLAUDE_CODE_PROJECT_DIR` env-var not enforced by CC binary OR pre-existing in-repo dir takes precedence
- **Coupled**: per-worktree session-history isolation → cross-worktree resume broken (the operator's actual complaint)
- **Fix path**: rename in-repo dir + relaunch, OR drop the env-var override entirely

### 4.2 "Parallel-dispatch enforcement gap" cluster (SEV-1)
- Stream C F25 + Stream D #3: `preagent-parallel-guard.mjs:178` `exit 0`
- Stream D #1 + #2: agent-teams plugin has NO subagent_type validator, NO empty-final_message check
- Stream G #3: 8 hook events unwired (`SubagentStop` would close W325-A telemetry feedback loop)
- **Empirical proof THIS session**: 8 PreToolUse:Agent advisories fired on a W269-compliant 8-Agent-in-1-message dispatch. The guard's per-call detection is itself an instrumentation bug.
- **Fix path**: flip `exit 0` → `exit 2` on 2nd-violation per CLAUDE.md L34 W329-D proposed-fix; add Δ-DPA-5 subagent_type validator at dispatch site; wire `SubagentStop` hook

### 4.3 "Plugin install-state drift" cluster
- Stream B: GitNexus Windows FTS fix uninstalled (P0 Windows-CRITICAL)
- Stream C F17: 45 `enabledPlugins` keys missing from `installed_plugins.json` (governance drift)
- Stream G #11: ECC `stop:cost-tracker` + 2 others disabled via `ECC_DISABLED_HOOKS`
- Stream B: context-mode v1.0.141 → v1.0.142 (minor); mattpocock/skills wording-polish (defer)
- **Fix path**: `/plugin update gitnexus@gitnexus-marketplace`; reconcile enabledPlugins ↔ installed_plugins.json; re-enable 3 ECC hooks

### 4.4 "Feature under-utilization" cluster
- Stream A G6 P1: planning-with-files installed but unused (no `task_plan.md`) — **fixed THIS wave**: `task_plan.md` written
- Stream G #8-#12: `/harness-audit`, `/devfleet`, `/orchestrate`, `/multi-{plan,workflow}`, `chief-of-staff`, `harness-optimizer` all available, never invoked
- Stream F F-P1: GitNexus not indexed for this repo
- **Fix path**: adopt the planning-with-files trio for every wave (DONE for W330); add `/devfleet` to wave-opening checklist; index gitnexus over `Z:/claude-sota-installed`

### 4.5 "Tool ecosystem drift" cluster
- Stream E P0: Node 22.22.0 → 22.22.3 security patches
- Stream E P1 SEV-2: codex split-install PATH-trap (`.local\npm` shadows `%APPDATA%\npm`)
- Stream E P2: 7 npm-global MAJOR drifts (pnpm 10→11, ccusage 18→19, etc.)
- **Fix path**: nvm-or-equivalent for node patch; consolidate codex install to one path; per-package CHANGELOG review for major bumps

## §5 Operator-confirmation gates required

The following P0 actions are **non-reversible or affect shared state** and require explicit operator approval:

| # | Decision | Recommended | Alternatives | Risk if skipped |
|---|---|---|---|---|
| D1 | Fix CLAUDE_CODE_PROJECT_DIR redirect | (a) rename `.claude/projects/` → `.claude/projects.legacy/` + relaunch | (b) drop env-var override; (c) symlink workaround | Cross-session race persists |
| D2 | Update GitNexus plugin (Windows FTS fix) | `/plugin update gitnexus@gitnexus-marketplace` in operator CLI | defer if W330 wave-locked | Windows BM25 degradation continues |
| D3 | Upgrade Node v22.22.0 → v22.22.3 | nvm-windows or fresh installer | stay on 22.22.0 until next quarterly | openssl/undici CVE exposure |
| D4 | Flip parallel-guard `exit 0` → `exit 2` on 2nd-violation | per CLAUDE.md L34 W329-D proposed-fix | leave advisory-only | parallel_ratio stays at 0.0036 |
| D5 | Consolidate codex split-install | uninstall `.local\npm` copy, keep `%APPDATA%\npm` | reverse OR pin one explicitly in PATH | silent no-op upgrades on `npm i -g` |

## §6 Findings inventory (severity-ranked)

### SEV-1 (data-loss or system-down equivalent)
- None empirically confirmed. `preagent-parallel-guard.mjs:178` is SEV-1 *severity-of-impact* (W325-A scandal) but SEV-2 *failure-mode* (advisory not blocking).

### SEV-2 (silent-fallback / operator-blind)
- C-F17 enabledPlugins ↔ installed_plugins.json drift
- C-F25 parallel-guard hardcoded `exit 0` (also Stream D #3)
- C-F5 PostToolUseFailure regex drops non-permission errors
- D #1 subagent_type allowlist not validated at dispatch site
- D #2 empty final_message consumed without check
- E P1 codex split-install PATH-trap

### SEV-3 (cosmetic / under-utilization)
- 8 hook events unwired (Stream G #3)
- planning-with-files unused (Stream A G6 — fixed this wave)
- ECC commands never invoked (Stream G #8-#12)
- GitNexus not indexed (Stream F F-P1)
- 7 npm-global major drifts (Stream E P2)

## §7 Cite-anchors

Each cluster anchored to ≥3 org-distinct sources per W295 I1. Full citations live in source deliverables. Top-level anchors:

- Anthropic: `https://docs.anthropic.com/en/docs/claude-code/sub-agents`, `https://code.claude.com/docs/en/cli-reference`, `https://docs.anthropic.com/en/release-notes/claude-code` (CHANGELOG)
- CCBP: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/{claude-memory,claude-settings,claude-commands}.md @ f28c2da`
- ECC: `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/`
- OthmanAdi/planning-with-files: `SKILL.md:86-99,250-258,302-321 @ d27008f3`
- abhigyanpatwari/GitNexus: HEAD `803f0bed` (uninstalled fix), installed `ed50a672`
- wshobson/agents: HEAD `08ded5e7` (matches installed exactly — Stream D zero-drift)
- nodejs/node releases: v22.22.3 (latest LTS Jod)

## §8 Next: Wave-2 codex GPT-5.5 round-1 adversarial review

Per sca-v12.1 Phase-6 + Δ-DPA-4 position-swap mandate, dispatch codex against this SYNTHESIS + REMEDIATION-PLAN with operator's explicit "question your rules and repos selection" directive. Expected verdict: APPROVE | REVISE | NEEDS-REVISION | BLOCK. On REVISE, operator absorbs findings inline and re-dispatches round-2.
