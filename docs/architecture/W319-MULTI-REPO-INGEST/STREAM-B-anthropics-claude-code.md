# STREAM-B-anthropics-claude-code — W319 Stream B

## HEAD-SHA-AT-INGEST
- `69d707009ec5a9362ea3552b0580d0f658428f0a` @ 2026-05-19 00:48:45 +0000
- Working tree: `Z:/repos/deps/claude-code`
- Latest CLI release docs reflect v2.1.144 (per CHANGELOG.md head)

## CITE-DRIFT

| Cite location | Cited value | Current truth | Action |
|---|---|---|---|
| CLAUDE.md L34 | "CLI 2.1.144 = npm latest" | CLI 2.1.144 (CHANGELOG.md L3) — MATCHES | none |
| CLAUDE.md L41 (W316 Stream-A) | "chrome-devtools-mcp 0.26.0 → 1.0.1 APPLIED" | repo not authoritative for this MCP — N/A here | none |
| CLAUDE.local.md L8-9 (`claude --bg "<task>"`) | implied feature | CONFIRMED v2.1.144 CHANGELOG adds `/resume` for `--bg`; matches | none |
| CLAUDE.md L18 `claude --bg "<task>" + claude agents/logs/attach/stop` | works in 2.1.142+ | CONFIRMED — see CHANGELOG 2.1.142 "Added new `claude agents` flags" | none |

No new SHA drift vs repo. Code-side claude-code is upstream-of-installed and not a target for vendoring.

## NET-NEW-PATTERNS

| PRIO | Pattern | Cite (path:line) | Why net-new |
|---|---|---|---|
| 1 | `worktree.bgIsolation: "none"` setting — allow background sessions to edit working copy without `EnterWorktree`, for repos where worktrees are impractical (v2.1.143) | `CHANGELOG.md` v2.1.143 entry | CLAUDE.md L24 W280d says "ALWAYS use one git worktree per session" — new override exists for cases where worktrees can't be used. Worth noting in W319 docs as escape valve. |
| 1 | `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` env var — limits consecutive stop-hook blocks before forced turn-end (default 8) (v2.1.143) | `CHANGELOG.md` v2.1.143 entry | Direct hardening for the codex stop-time review gate; our codex Stop-hook can loop indefinitely on chronic NEEDS-ATTENTION. Worth wiring or at least observing default. |
| 1 | `worktree cleanup no longer falls back to `rm -rf` when `git worktree remove` fails` (v2.1.143) | `CHANGELOG.md` v2.1.143 entry | Removes a data-loss class previously possible during `WorktreeRemove` hook. CLAUDE.md W280d/W317 worktree text should drop any compensating-control language. |
| 2 | Stop hooks that block repeatedly looping forever → now end turn with warning after 8 consecutive blocks (v2.1.143) | `CHANGELOG.md` v2.1.143 entry | Aligns with our W316 codex round-N pattern; can rely on cap rather than custom guards. |
| 2 | `claude agents --add-dir / --settings / --mcp-config / --plugin-dir / --permission-mode / --model / --effort / --dangerously-skip-permissions` flags (v2.1.142) | `CHANGELOG.md` v2.1.142 entry | We dispatch background sessions for codex review — these flags let us pin settings/MCP server set + permission-mode per dispatched bg session. CLAUDE.md L18 mode-(4) entry could be expanded. |
| 2 | Plugins with root-level `SKILL.md` and no `skills/` subdirectory now surfaced as skills (v2.1.142) | `CHANGELOG.md` v2.1.142 entry | Affects how we structure operator-curated `.claude/skills/<name>/SKILL.md` — current structure already compliant; document the canonical pattern. |
| 3 | `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE=1` to pin fast mode to Opus 4.6 (v2.1.142) | `CHANGELOG.md` v2.1.142 entry | Fast mode default moved to Opus 4.7 — affects subagent dispatch cost calculus. |
| 3 | `PowerShell tool now passes -ExecutionPolicy Bypass` + `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY=1` opt-out (v2.1.143) | `CHANGELOG.md` v2.1.143 entry | Windows-only behavior change since this runtime is Z:-portable on Windows; ensure scripts don't assume policy enforcement. |
| 3 | `/model` now session-only by default (press `d` to set default) (v2.1.144) | `CHANGELOG.md` v2.1.144 entry | Cite-fix in CLAUDE.local.md if we rely on persistent /model. |
| 3 | `/extra-usage` renamed `/usage-credits` (v2.1.144) | `CHANGELOG.md` v2.1.144 entry | Cosmetic; no places we cite. |
| 4 | Plugins enabled only by `.claude/settings.json` now show "claude plugin install" hint instead of "not cached" (v2.1.144) | `CHANGELOG.md` v2.1.144 entry | Diagnostic improvement for CR-1 plugin verification. |
| 4 | Skill-listing truncation no longer shown as startup notification; run `/doctor` for breakdown (v2.1.144) | `CHANGELOG.md` v2.1.144 entry | Reduces signal-to-noise of startup; our `claude doctor` is W312-A.2 broken (hangs 30s exit 124), so doctor-based diagnosis is currently impractical. |
| 4 | Background side-queries fall back correctly when first-party API key configured (v2.1.144) | `CHANGELOG.md` v2.1.144 entry | Affects Bedrock/Vertex/Foundry users only — N/A for this runtime. |
| 5 | `claude --bg --name <label>` echoes name in confirmation (v2.1.144) | `CHANGELOG.md` v2.1.144 entry | UX nicety. |
| 5 | `auto-close-duplicates.ts` + `lifecycle-comment.ts` scripts in repo `scripts/` | `Z:/repos/deps/claude-code/scripts/auto-close-duplicates.ts` | Internal repo-maintenance scripts; not part of CLI feature set. |

## STALE-IN-UPSTREAM
None. The CLI is binary-distributed via npm; we don't import source files. The CHANGELOG.md and CLI flag surface are the only authoritative artifacts to track, and CLAUDE.md cites both correctly.

## HARNESS-FIT
- Decision: N/A (this is the harness itself; not a vendor candidate)
- Action: track CHANGELOG entries per CR-1 supersession-chain pre-flight (Δ34) on every major minor bump
- Three SHIP-READY follow-ups for W320 operator queue:
  1. Adopt `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` default (= 8) understanding in codex stop-hook docs
  2. Reflect `worktree.bgIsolation: "none"` as an escape valve in CLAUDE.md L24 W280d paragraph
  3. Document `claude agents --permission-mode` for background codex-review sessions so they inherit project permissions instead of auto-mode

## License
MIT — Anthropic
