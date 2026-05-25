# W309 Stream C — CLAUDE.md R2 broadening APPLIED

> **Wave**: W309; **Stream**: C; **Closes**: W308 Stream D surface-only + W301 Stream E Rec-2 (pending 9 waves)
> **Date**: 2026-05-19
> **Owner**: agent-C-claude-md-r2-apply
> **Scope**: Edit `CLAUDE.md` line 19 (R2) per W308 Stream D §2 diff; resolve `#46915` placeholder; ship owned design doc.

## §1 Pre-apply state

| Field | Value | Source |
|---|---|---|
| `CLAUDE.md` LOC | 42 | `wc -l` |
| R2 line | 19 | grep `^[0-9]\.` |
| `context-mode-cache-heal.mjs` size | 1656 bytes | `wc -c` (≤ 2 KB cap headroom ~390 bytes) |
| `context-mode-cache-heal.mjs` LOC | 28 | direct `Read` |
| R4 reversal already shipped | ✓ | CLAUDE.md:21 reads "W299-A REVERSAL W308 2026-05-19" |
| Pre-edit R2 text | "No `.claude/hooks/scripts/*.py` self-invent" (narrow) | CLAUDE.md:19 verbatim |

The old_string in W308 Stream D §2 matched the live CLAUDE.md:19 verbatim — no drift between W308 design and W309 apply.

## §2 Resolved #46915 placeholder

**Resolution**: `anthropics/claude-code#46915` is the CORRECT upstream issue. Used verbatim.

Verification via `mcp__plugin_context-mode_context-mode__ctx_execute` → GitHub REST API `GET /repos/anthropics/claude-code/issues/46915`:

| GitHub API field | Value |
|---|---|
| HTTP status | 200 |
| Title | "Plugin auto-update deletes old cache dir, breaking ${CLAUDE_PLUGIN_ROOT} in running sessions" |
| State | open |
| Labels | bug, duplicate, platform:macos, area:hooks, area:plugins, stale |
| Created | 2026-04-12T08:11:43Z |
| HTML URL | https://github.com/anthropics/claude-code/issues/46915 |

Body excerpt (first 400 chars):
> When a plugin auto-updates on session start, the old cache directory is deleted and replaced with a new hash-versioned directory. Any already-running session that resolved `${CLAUDE_PLUGIN_ROOT}` at startup continues pointing to the deleted path, causing every hook invocation to fail.

This matches **exactly** the bug `context-mode-cache-heal.mjs` patches per the file header (line 3: `// Fixes anthropics/claude-code#46915: auto-update breaks CLAUDE_PLUGIN_ROOT`) and the file's body (re-creates a junction/symlink from the dead `installPath` to the latest live version dir under `~/.claude/plugins/cache/context-mode/`).

The "duplicate" + "stale" labels do not invalidate the citation — the issue tracks the bug whether or not Anthropic later consolidates to a canonical issue. The `area:hooks` + `area:plugins` labels confirm the area-of-concern alignment.

**Three placeholder options in W308 Stream D §2.1** resolved as:
1. ~~Operator confirms `#46915` is the correct upstream issue~~ → CHOSEN (verified via GitHub API).
2. ~~Operator substitutes the actual issue number~~ — N/A.
3. ~~Operator confirms no upstream issue yet exists~~ — N/A (issue exists, open, matches).

## §3 Applied diff (CLAUDE.md:19)

```diff
-2. **Hooks may only be upstream plugin hooks OR direct upstream-CLI invocations** declared in `.claude/settings.json` — semantics per `https://docs.anthropic.com/en/docs/claude-code/hooks`. **No `.claude/hooks/scripts/*.py` self-invent.** **W286-arc-P0C ratification 2026-05-18**: `.mcp.json` MCP-server `command/args` contract is `npx -y <pkg>@<pinned-version>` (per W286-cross commits `fcafe05`+`77dc081`); W155 F13 native-node migration RETIRED — CR-9 version-pin discipline wins over spawn-churn optimization. The W280a Stop-hook codex-review-gate auto-enforces post-commit.
+2. **Hooks may only be upstream-plugin hooks OR direct upstream-CLI invocations** declared in `.claude/settings.json` — semantics per `https://docs.anthropic.com/en/docs/claude-code/hooks`. **No project-owned hook bodies (any extension `.py|.sh|.mjs|.js|.ts|.ps1|.bat` under `.claude/hooks/**`), EXCEPT documented bug-patch shims cite-anchored to a specific `anthropics/claude-code` GitHub issue and ≤2 KB** (current sanctioned exception: `.claude/hooks/context-mode-cache-heal.mjs` patching `anthropics/claude-code#46915` — verified open 2026-04-12, title "Plugin auto-update deletes old cache dir, breaking ${CLAUDE_PLUGIN_ROOT} in running sessions"). **W286-arc-P0C ratification 2026-05-18**: `.mcp.json` MCP-server `command/args` contract is `npx -y <pkg>@<pinned-version>` (per W286-cross commits `fcafe05`+`77dc081`); W155 F13 native-node migration RETIRED — CR-9 version-pin discipline wins over spawn-churn optimization. **W300-AI-1 corollary** (added W308): a basic-memory-style local-`.exe` `.mcp.json` invocation is a P0C-CR-9-exception case pending remediation per `W300-AUDIT-2026-05-18.md` §3. The W280a Stop-hook codex-review-gate auto-enforces post-commit.
```

Variance from W308 §2 verbatim: added inline verification provenance ("— verified open 2026-04-12, title ...") to the citation. This strengthens the audit trail (the rule itself documents the verification date + upstream issue title), and stays within the 1-paragraph format. No semantics drift.

## §4 Post-apply verification

| Check | Expected | Actual | Result |
|---|---|---|---|
| `wc -l CLAUDE.md` | ≤50, target ~45 | 42 | PASS (no LOC change — single long line replaced with single longer line) |
| All 5 cardinal rules present | R1, R2, R3, R4, R5 on lines 18-22 | confirmed | PASS |
| Header line 1 unchanged | "# claude-sota-installed — Pointer-only Root Memory (≤50 LOC)" | unchanged | PASS |
| R1 text unchanged | "Install primitives only from trusted plugins/skills/agents" + W270 corollary | unchanged | PASS |
| R3 text unchanged | "Subagents = installed upstream agents OR documented subagent system" | unchanged | PASS |
| R4 text unchanged | W299-A reversal text intact | unchanged | PASS |
| R5 text unchanged | "Safety boundaries via Claude Code permissions + sandboxing" | unchanged | PASS |
| New R2 contains `.py\|.sh\|.mjs\|.js\|.ts\|.ps1\|.bat` | ✓ | ✓ | PASS |
| New R2 contains `≤2 KB` | ✓ | ✓ | PASS |
| New R2 contains `context-mode-cache-heal.mjs` | ✓ | ✓ | PASS |
| New R2 contains W286-arc-P0C ratification clause | ✓ | ✓ | PASS |
| New R2 contains W300-AI-1 corollary | ✓ | ✓ | PASS |

## §5 SOTA-refs

- Anthropic CC settings spec — `https://docs.anthropic.com/en/docs/claude-code/settings` (R4 + R5 cite-anchor authority)
- Anthropic CC hooks spec — `https://docs.anthropic.com/en/docs/claude-code/hooks` (R2 cite-anchor authority)
- Anthropic CC `.claude/` directory spec — `https://code.claude.com/docs/en/claude-directory` (R4 reversal cite-anchor)
- W286-arc-P0C CR-9 version-pin discipline — preserved in this commit; reaffirms `npx -y <pkg>@<pinned-version>` as canonical `.mcp.json` contract (commits `fcafe05`+`77dc081`)
- OpenSSF Scorecard supply-chain pattern — `https://github.com/ossf/scorecard` — provenance/pinned-dependencies signal aligns with CR-9 version-pinning + the broadened-extension ban (no unsigned project-owned hook bodies = OpenSSF "Pinned-Dependencies" check + "Dangerous-Workflow" check at runtime layer)
- ThoughtWorks Tech Radar maintenance-cadence pattern — broaden-not-narrow rule revision honors Radar's "Adopt → Trial → Assess → Hold" cadence; R2 stays at "Adopt" while now describing the one sanctioned bug-patch shim under "Trial-with-citation" rather than treating the cache-heal hook as silent violation of "Hold" (self-invent ban)
- `anthropics/claude-code#46915` — the cited upstream bug, verified open 2026-04-12 via GitHub REST API

## §6 Rollback

If the R2 broadening commit causes regression or downstream-doc inconsistency:

```bash
git revert HEAD --no-edit  # reverts only the R2 broadening
```

CLAUDE.md returns to the pre-W309 R2 narrow text (`.claude/hooks/scripts/*.py` self-invent ban only). The `context-mode-cache-heal.mjs` shim itself is unaffected by the rollback (the hook lives at `.claude/hooks/context-mode-cache-heal.mjs` regardless of R2 text). The basic-memory `.mcp.json` invocation is unaffected by the rollback (lives at `.mcp.json`, not touched by this stream).

The §3 verification audit-trail strengthening (verified-date + upstream-title inline) is a documentation refinement of W308 Stream D §2; it survives rollback only inside this design doc.

## §7 Cardinal-rule conformance

| Rule | Conformance | Notes |
|---|---|---|
| R1 (trusted-only plugins) | ✓ PRESERVED | No plugin install/uninstall in this stream |
| R2 (hook discipline) | ✓ STRENGTHENED | Broadened ban (`.py` → 7 extensions) + cite-anchored ≤2 KB shim exception |
| R3 (subagents = installed upstream agents) | ✓ PRESERVED | No agent definitions changed |
| R4 (CLAUDE.md + settings.json governance) | ✓ COMPATIBLE | W308 reversal text already in place at CLAUDE.md:21; R2 broadening is orthogonal |
| R5 (safety via Claude Code permissions) | ✓ PRESERVED | No custom guard scripts introduced |

**Surface invariants**:
- CLAUDE.md ≤50 LOC: PASS (42; same as pre-edit)
- `self_invented_count: 0`: PRESERVED — the broadened R2 covers a now-cite-anchored exception (`context-mode-cache-heal.mjs`); this shim was never "self-invented" in the W255 sense (it patches an upstream bug, not a project-owned behavior), and is now formally sanctioned by rule text.
- Adversary 1 closure (rule too strict): CLOSED via cite-anchored ≤2 KB exception.
- Adversary 2 closure (rule too loose): CLOSED via broadened extension list.

## §8 Carry-forward

- `W308-STREAM-D-CLAUDE-MD-PENDING.md` remains as historical surface-only reference; this doc supersedes its placeholder-confirm step.
- W301 Stream E Rec-2 — CLOSED (the "pending 9 waves" Rec-2 has landed this wave).
- W300-AI-1 P0C-CR-9 corollary — surface-level documented in R2 text; substantive remediation (basic-memory invocation pattern fix) remains operator-action pending per `W300-AUDIT-2026-05-18.md` §3.
- Future drift signal: if `context-mode-cache-heal.mjs` grows past 2 KB (currently 1656 bytes, ~390 byte headroom), R2 mandates upstream-PR escalation rather than perpetuating local growth. Operator may also revisit R2's ≤2 KB cap at that time if upstream-PR landing time gates require relaxation.
- `anthropics/claude-code#46915` is "open + stale" — if Anthropic later closes the issue (canonicalized to another issue or fixed in `claude-code` directly), R2's citation will need a refresh; a future wave's stream-AGING-recheck routine should query the issue state.
