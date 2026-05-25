---
title: Wave 135 Fire 6 — Agent A SOLO sota-researcher artifact (RTK wire-in research)
status: AUTHORITATIVE
date: 2026-05-10
agent: sota-researcher (Wave 135 Fire 6, Agent A SOLO dispatch)
artifact_class: ARTIFACT-INLINE per FM-19 readonly-guard sidestep
---

# Wave 135 Fire 6 Agent A — RTK wire-in research

## Section 1: Binary verification

- **Path**: `Z:/claude-sota-installed/.local/cargo/bin/rtk.exe` (6.8M)
- **Version**: `rtk 0.39.0` (probed via `rtk --version`)
- **PATH-resolved**: `/z/claude-sota-installed/.local/cargo/bin/rtk` (in shell PATH)
- **Wave 82g install precedent**: per `docs/install-provenance.md` (cardinal-rule-6 verified — cargo install primitive)
- **MEASURED token savings to-date**: 911 commands / 11.0M tokens saved (89.9%) per `rtk gain` probe — strong CR-12 PRIMARY install validation evidence

Symptom message persists on every Bash call: `[rtk] /!\ No hook installed — run 'rtk init -g' for automatic token savings`. Diagnostic shows the hook IS firing (rewrites `git status` → `rtk git status` correctly via `permissionDecisionReason: "RTK auto-rewrite"`); the warning is from rtk's self-detection-mismatch (rtk binary checks `~/.claude/` defaults, NOT runtime's `CLAUDE_CONFIG_DIR=Z:/claude-sota-installed/.claude`).

## Section 2: Upstream verification

- **Repo URL**: `https://github.com/rtk-ai/rtk`
- **HEAD SHA** (default branch = `develop`): `2d6e10a923d18e022f5fdc4ed9b69ae0d43b2f79` (2026-05-10T14:27:18Z)
- **License (LICENSE file)**: Apache-2.0 (verified verbatim against `LICENSE:1-3 @ 2d6e10a9`)
- **License (GitHub API)**: `Apache-2.0` (matches LICENSE file)
- **README badge claim**: "License: MIT" — **CONFLICT with LICENSE file** (badge is wrong; LICENSE file is authoritative). Both permissive; CR-9 license-class gate passes.
- **Stargazer count**: 45,496 ★ (high adoption — Axis 1 PASS for convergence-gate)
- **Created**: 2026-01-22 (~3.6 months old)
- **Last pushed**: 2026-05-10 (active maintenance)
- **Description**: "CLI proxy that reduces LLM token consumption by 60-90% on common dev commands. Single Rust binary, zero dependencies"

### Canonical install primitive (TIER-1-DIRECT @ README.md:67-110 @ 2d6e10a9)

Verbatim from upstream README §Quick Start:
```bash
# 1. Install for your AI tool
rtk init -g                     # Claude Code / Copilot (default)
rtk init -g --auto-patch        # Non-interactive (CI/CD)
# 2. Restart your AI tool, then test
git status  # Automatically rewritten to rtk git status
```

### CRITICAL Windows caveat (TIER-1-DIRECT @ README.md:262-285 @ 2d6e10a9)

Verbatim from upstream README §Windows:
> "RTK works on Windows with some limitations. The auto-rewrite hook (`rtk-rewrite.sh`) requires a Unix shell, so on native Windows RTK falls back to **CLAUDE.md injection mode** — your AI assistant receives RTK instructions but commands are not rewritten automatically."

| Feature | WSL | Native Windows |
|---------|-----|----------------|
| Filters (cargo, git, etc.) | Full | Full |
| Auto-rewrite hook | Yes | No (CLAUDE.md fallback) |
| `rtk init -g` | Hook mode | CLAUDE.md mode |

**HOWEVER**: This runtime is on native Windows + Git Bash, AND the hook IS firing successfully (verified via direct probe `echo '{"tool_name":"Bash","tool_input":{"command":"git status"}}' | rtk hook claude` → `{"hookSpecificOutput":{"updatedInput":{"command":"rtk git status"}}}`). The README's pessimistic Windows claim refers to the `rtk-rewrite.sh` script-based path; the binary-direct `rtk hook claude` JSON-stdin invocation works on native Windows + Git Bash because Claude Code passes JSON over stdin/stdout (no shell-script dependency).

### Canonical RTK.md template (TIER-1-DIRECT @ hooks/claude/rtk-awareness.md @ 2d6e10a9)

29-line content used by upstream `rtk init -g`:
```
# RTK - Rust Token Killer

**Usage**: Token-optimized CLI proxy (60-90% savings on dev operations)

## Meta Commands (always use rtk directly)

```bash
rtk gain              # Show token savings analytics
rtk gain --history    # Show command usage history with savings
rtk discover          # Analyze Claude Code history for missed opportunities
rtk proxy <cmd>       # Execute raw command without filtering (for debugging)
```

## Installation Verification

```bash
rtk --version         # Should show: rtk X.Y.Z
rtk gain              # Should work (not "command not found")
which rtk             # Verify correct binary
```

⚠️ **Name collision**: If `rtk gain` fails, you may have reachingforthejack/rtk (Rust Type Kit) installed instead.

## Hook-Based Usage

All other commands are automatically rewritten by the Claude Code hook.
Example: `git status` → `rtk git status` (transparent, 0 tokens overhead)

Refer to CLAUDE.md for full command reference.
```

## Section 3: CR-9 REVERT-check + sibling-bleed defense outcome

### REVERT-check (CR-9 mandate)

Probe: `grep -i "rtk" Z:/claude-sota/.claude/projects/Z--claude-sota/memory/feedback_check_gitignore_before_porting.md` → **0 hits**.

✅ **rtk NOT in sibling REVERT precedent known-3 list** (bash_command_allowlist.py / fleet_health_start.py / permission_request_auto_approve.py). Safe to install per CR-9.

### Sibling-bleed defense (CR-9 sub-rule)

Probe: `grep -rn "rtk" Z:/claude-sota/{.claude/settings.json,CLAUDE.md,CLAUDE.local.md}` → **1 hit at `Z:/claude-sota/CLAUDE.md:95`** mentioning `rtk-ai/rtk` ONLY as illustrative example of star-popular-but-topic-untagged repo (40k★ recall-gap example). NO sibling RTK install primitive to copy-import. ✅ Sibling-bleed risk = ZERO; UPSTREAM-INSTALL is the only path per CR-12 PRIMARY.

### Mia OVER catch (CR-11 META-process integration)

Mia probe of claude-sota-installed runtime current state surfaced UNEXPECTED ALREADY-PARTIALLY-WIRED state:

- **PreToolUse Bash hook ALREADY WIRED** at `Z:/claude-sota-installed/.claude/settings.json:246-250`:
```json
{
  "type": "command",
  "command": "Z:/claude-sota-installed/.local/cargo/bin/rtk.exe hook claude",
  "timeout": 5
}
```

- **Companion `if:` filters** at lines 189, 195, 225, 231, 275, 282, 317, 324 (gitleaks + codex T2 + postcommit hooks all enumerate `Bash(rtk git commit *)` / `Bash(rtk git push *)` matchers — meaning sibling commit/push gates ALREADY anticipate rtk-rewritten command shapes)

- **MISSING artifacts**:
  - ❌ `Z:/claude-sota-installed/RTK.md` (operator runbook absent)
  - ❌ `@RTK.md` reference in `Z:/claude-sota-installed/CLAUDE.md` (Claude doesn't know rtk meta commands exist)
  - ❌ `docs/RTK.md` (operator-discovery doc absent per Wave 135 Fire 5 SYNTHESIS request)

**Wave 135 Fire 5 SYNTHESIS framing was OVER**: claimed "binary INSTALLED but unused" — reality is **75% wired** (binary ✓, hook ✓, RTK.md/CLAUDE.md/docs ✗). Mia ladder n=130 → n=131. Token-savings mechanism IS already operating; only the operator-awareness layer is missing.

## Section 4: Proposed minimal patch (3-edit ship)

**Pattern A apply per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A — single atomic commit landing all 3 edits.**

### Edit #1: NEW file `Z:/claude-sota-installed/RTK.md`

Verbatim copy of upstream `hooks/claude/rtk-awareness.md @ 2d6e10a9` (29 lines, content quoted in Section 2 above). Cardinal-rule-12 PRIMARY install path: **VERBATIM COPY from upstream**, NOT hand-coded adaptation. This satisfies cardinal-rule-8 (full-SOTA-content invariant).

### Edit #2: `Z:/claude-sota-installed/CLAUDE.md` — add @RTK.md reference

Add a single-line @RTK.md reference block to surface RTK meta commands to Claude. Recommended placement: after Memory Stack section (currently line ~370+ in CLAUDE.md). Per upstream `rtk init -g` behavior at `src/hooks/init.rs:1138 @ 2d6e10a9` ("CLAUDE.md: @RTK.md reference added"), the canonical surface is:

```markdown
## RTK token-savings primitive

This runtime ships RTK 0.39.0 (rtk-ai/rtk @ HEAD `2d6e10a923d18e022f5fdc4ed9b69ae0d43b2f79`, Apache-2.0, 45,496★) wired as PreToolUse Bash hook (settings.json:246-250). Auto-rewrites Bash commands → rtk-compressed equivalents (60-90% token savings). MEASURED: 911 commands / 11.0M tokens saved at codification time.

@RTK.md
```

The trailing `@RTK.md` line is the Anthropic CC native skill-include-by-reference primitive (per `https://code.claude.com/docs/en/memory#claude-md-imports`).

### Edit #3: NEW file `Z:/claude-sota-installed/docs/RTK.md`

Operator runbook (NOT the Claude-facing RTK.md from Edit #1; this is the human-operator handbook for sss-installed runtime). Cite-trail authority for the 3-edit ship + diagnostic notes:

```markdown
# RTK Operator Runbook (Z:/claude-sota-installed)

## Status (as of Wave 135 Fire 6 codification 2026-05-10)
- **Binary**: rtk 0.39.0 INSTALLED at `Z:/claude-sota-installed/.local/cargo/bin/rtk.exe` (Wave 82g per `docs/install-provenance.md`)
- **Hook**: PreToolUse Bash hook WIRED at `.claude/settings.json:246-250` invoking `rtk hook claude`
- **RTK.md**: ROOT-level RTK.md present (`Z:/claude-sota-installed/RTK.md`); @RTK.md reference in CLAUDE.md
- **MEASURED savings**: 11.0M tokens saved across 911 commands (~89.9%) at install-time

## Cite anchors (TIER-1-DIRECT)
- Upstream repo: https://github.com/rtk-ai/rtk @ HEAD `2d6e10a923d18e022f5fdc4ed9b69ae0d43b2f79` (default branch `develop`)
- README install primitive: `README.md:67-110 @ 2d6e10a9`
- Windows fallback caveat: `README.md:262-285 @ 2d6e10a9`
- RTK.md slim template: `hooks/claude/rtk-awareness.md @ 2d6e10a9`
- License: Apache-2.0 (verified at `LICENSE:1-3 @ 2d6e10a9`; README MIT badge is wrong)

## Operator commands
- `rtk gain` — token-savings analytics
- `rtk discover` — Claude Code history → missed-savings opportunities
- `rtk init -g --uninstall` — REMOVE all rtk artifacts (per CR-9 REVERT-check known-3 NOT in list)
- `rtk init -g --show` — diagnostic (note: rtk's self-detection looks for `~/.claude/` defaults; the runtime's wire-in is at `Z:/claude-sota-installed/.claude/settings.json:246-250` and IS firing despite rtk's `--show` reporting "not found")

## Diagnostic on persistent symptom warning
Symptom: every Bash call prefixed with `[rtk] /!\ No hook installed — run 'rtk init -g' for automatic token savings`. Cause: rtk binary's self-check looks for `~/.claude/RTK.md` (USERPROFILE-default at `C:/Users/<user>/.claude/`), NOT this runtime's `CLAUDE_CONFIG_DIR=Z:/claude-sota-installed/.claude/`. Symptom is COSMETIC; the hook IS firing successfully (verified via direct JSON-stdin probe).

After this 3-edit ship, the symptom message will reduce in frequency once Claude has @RTK.md context (because Claude will start using `rtk gain` / `rtk discover` directly rather than triggering generic Bash → rtk-rewrite path).

## CR-9 install-risk discipline
- **Version pin**: rtk 0.39.0 pinned at install via `cargo install rtk@0.39.0` (Wave 82g) — NO `@latest` mode
- **REVERT-check**: rtk NOT in sibling claude-sota REVERT precedent list (verified Wave 135 Fire 6)
- **Sibling-bleed**: NONE — sibling claude-sota does not install rtk
- **2-round fix-forward budget**: this Wave 135 Fire 6 wire-in is round-1; round-2 candidate is the symptom-warning-suppression diagnostic queued separately

## Update triggers
Re-evaluate this runbook when:
- rtk version bumps past 0.39.0 (cardinal-rule-6 freshness check)
- Anthropic CC ships native ToolDecorator primitive that obviates rtk hook
- rtk binary self-detection fixed to honor `CLAUDE_CONFIG_DIR` env (would silence the cosmetic symptom warning)
- A 3rd-org alternative compression primitive surfaces with ≥3-axis convergence evidence
```

## Section 5: Alternative install primitive analysis (CR-12 PRIMARY)

Per CR-12 PRIMARY (upstream-install-priority over sibling-cite-import), evaluated alternative install primitives:

| Channel | Status | Verdict |
|---|---|---|
| Anthropic CC plugin marketplace | NOT distributed | ❌ Not available |
| `claude-plugins-official/` cache | NOT present | ❌ Not available |
| npm registry | N/A — Rust binary | ❌ Not available |
| cargo install (PRIMARY) | ✅ INSTALLED via Wave 82g | ✅ **Already satisfied** |
| Homebrew (`brew install rtk`) | macOS/Linux only | N/A on Windows |
| curl-shell installer | Linux/macOS only | N/A on Windows |
| Pre-built binary release (rtk-x86_64-pc-windows-msvc.zip) | Available at GitHub releases | Alternative to cargo install (pre-built faster) |
| `rtk init -g --auto-patch` | Self-installer for hook + RTK.md + @RTK.md + settings.json patch | ⚠️ Targets `~/.claude/` defaults; would NOT honor runtime's `CLAUDE_CONFIG_DIR` — cannot use as-is on this runtime |

**Conclusion**: cardinal-rule-12 PRIMARY install path **already satisfied at the binary layer** (cargo install Wave 82g). The wire-in shipped here is **OPERATOR-SIDE manual install** of the 3 missing artifacts (RTK.md / @RTK.md / docs/RTK.md) since `rtk init -g --auto-patch` would target `C:/Users/42/.claude/` USERPROFILE defaults rather than this runtime's `CLAUDE_CONFIG_DIR=Z:/claude-sota-installed/.claude/`. CR-9 sibling-bleed defense REQUIRES path-rewrite for runtime context — the verbatim upstream RTK.md content can be COPIED but the install-target path MUST be runtime-rewritten.

## Section 6: Implementer status vocabulary

`verdict_one_line: "DONE_WITH_CONCERNS: 75% wired pre-fire; 3-edit minimal patch designed; 1 cosmetic symptom warning unresolved (rtk binary self-detection mismatch with CLAUDE_CONFIG_DIR)"`

## Section 7: VERDICT

**VERDICT: NEEDS-REVISION** conf=0.87

### prescribed_edits (Pattern A apply per `codex-t1-fix-forward-pattern.md`)

#### prescribed_edit #1
- **file**: `Z:/claude-sota-installed/RTK.md` (NEW)
- **content**: VERBATIM copy of upstream `hooks/claude/rtk-awareness.md @ 2d6e10a9` (29 lines from Section 2 above)
- **cite**: TIER-1-DIRECT @ `https://github.com/rtk-ai/rtk/blob/2d6e10a9/hooks/claude/rtk-awareness.md`

#### prescribed_edit #2
- **file**: `Z:/claude-sota-installed/CLAUDE.md`
- **placement**: AFTER existing "Memory Stack" section, BEFORE "Hard Rules" section (search anchor: `## Memory Stack` heading + scan to next `## Hard Rules` heading)
- **insert content**: 3-block addition per Edit #2 design above (1 paragraph + `@RTK.md` line)
- **cite**: TIER-1-DIRECT @ `https://github.com/rtk-ai/rtk/blob/2d6e10a9/src/hooks/init.rs:1138` ("CLAUDE.md: @RTK.md reference added") + Anthropic CC `https://code.claude.com/docs/en/memory#claude-md-imports`

#### prescribed_edit #3
- **file**: `Z:/claude-sota-installed/docs/RTK.md` (NEW)
- **content**: Full operator runbook per Edit #3 design above (~50 lines)
- **cite**: TIER-1-DIRECT @ multiple anchors per inline cite trail in runbook body

### Confidence rationale (0.87)
- Wire-in is mechanically correct (verified hook firing via direct JSON probe)
- All cite anchors are TIER-1-DIRECT @ pinned HEAD SHA (CR-1 + CR-8 conformance)
- License gate clears (Apache-2.0 verified, README badge wrong but LICENSE authoritative)
- CR-9 REVERT-check + sibling-bleed defense both pass
- CR-12 PRIMARY path satisfied (cargo install already done)
- **0.87 not higher** because: (a) cosmetic symptom warning not solved by this 3-edit ship — defer to round-2; (b) Mia caught Wave 135 Fire 5 SYNTHESIS framing OVER ("binary INSTALLED but unused" — reality is 75% wired); (c) docs/RTK.md introduces NEW operator surface not previously in the runtime — needs T2 commit-time review per cardinal-rule-3

### Concerns (DONE_WITH_CONCERNS class per implementer status vocab)
1. **Cosmetic symptom warning persists** post-ship — rtk binary's `--show` checks `~/.claude/RTK.md` (USERPROFILE default), not `CLAUDE_CONFIG_DIR/RTK.md`. After this 3-edit ship, RTK.md will be at `Z:/claude-sota-installed/RTK.md` (root), which rtk binary won't detect either. The symptom warning is harmless (token-savings mechanism IS operating) but cosmetic. Round-2 candidate: file upstream issue at rtk-ai/rtk requesting `CLAUDE_CONFIG_DIR` env-honor in self-detection.
2. **Wave 135 Fire 5 SYNTHESIS framing was Mia OVER** — n=131. Not a failure of this ship; the orchestrator's Wave 135 Fire 5 cite of "binary INSTALLED but unused" was inaccurate (binary IS in active use per `rtk gain` 11.0M tokens saved + hook IS wired). This ship corrects the framing AND completes the 25% missing wire-in.
3. **Cardinal-rule-3 cross-model consensus**: this ship adds NEW content to CLAUDE.md (a cardinal-rules-class file). Per CLAUDE.md Hard Rules "ALWAYS run codex T1 before design-surface edits", round-2 codex T1 review on CLAUDE.md edit RECOMMENDED before commit. Phase 1 bootstrap exception per CR-3 may apply if Tier 1a hooks not yet INSTALLED — verify before commit.
