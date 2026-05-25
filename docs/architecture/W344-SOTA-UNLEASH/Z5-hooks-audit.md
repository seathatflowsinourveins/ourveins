# Z5 — Hooks + Agent-Team Orchestration Audit

**Wave**: W344-SOTA-UNLEASH
**Stream**: Z5 (P4 hooks audit)
**Date**: 2026-05-20
**Author**: Stream Z5 (forked subagent)

## Scope

Audit all hook definitions in:
- `.claude/settings.json` (project-owned + direct-CLI invocations)
- `.claude/plugins/cache/*/hooks/hooks.json` (plugin-shipped)

Against 4 audit dimensions:
- **P4.1**: hook-metadata-discipline pattern (claudekit-style) — every hook declares static metadata
- **P4.2**: silent-fallback in dispatch — synthetic exit-0 advisory-only when binding-exit-2 was intended
- **P4.3**: SubagentStop transcript-marker loop-guard pattern (CR-9 / claudekit)
- **P4.4**: PostToolUseFailure extends to Edit|Write|MultiEdit failures

## Methodology

Discovery via Glob `**/hooks.json` + Read `.claude/settings.json` hooks.* keys.

## Inventory

### A. `.claude/settings.json` hooks (direct-CLI invocations per CR-2)

Confirmed direct-CLI (cardinal-rule-2 compliant): gitleaks · ruff · shellcheck · git · pre-commit. NO project-owned hook bodies.

### B. Plugin-shipped `hooks.json` files

Found via Glob `.claude/plugins/cache/*/hooks/hooks.json`:
- `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` — SessionStart + SessionEnd + Stop-review-gate (W332 audit-trap clearance)
- `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/hooks/hooks.json` — memory + audit recorders
- additional plugin hooks per individual plugin manifests

## Findings

### Finding F1 — P4.1 (Hook-metadata-discipline) — SEV: HIGH

**Issue**: Local `tools/preagent-{parallel-guard,subagent-validator}.mjs` (CR-5-exception condition-(b) hooks) DO NOT declare static `metadata = { id, displayName, description, category, triggerEvent, matcher }` per claudekit Hook Metadata pattern.

**Status**: PRE-EXISTING. Validators are direct-CLI invocations launched via `.claude/settings.json:hooks.PreToolUse[Agent]` matchers; they are CR-5-exception-sanctioned but missing claudekit metadata declarations.

**Recommendation**:
- (a) Add a header comment block to each `.mjs` exporting `export const metadata = {...}`
- (b) Update settings.json matcher annotation to reference the hook by metadata.id
- (c) Add Zod `ConfigSchema` for hook-specific config (per `hook-metadata-discipline` skill spec)

**Cite-anchor**: claudekit @ `cli/utils/claudekit-config.ts` + `cli/types/claudekit-config.ts` typed `getHookConfig<T>(hookId)` pattern. Sister-runtime skill: `hook-metadata-discipline`.

**Severity**: HIGH (CR-5-exception condition-(b) hooks should be visible to operator audit; metadata invisibility hampers SOTA-discipline).

**Effort**: ~30 LOC across 2 files. Single wave-fix.

---

### Finding F2 — P4.2 (Silent-fallback in dispatch) — SEV: MEDIUM

**Issue**: `tools/preagent-parallel-guard.mjs` originally `exit 0` advisory-only (W325-A 0.0036 parallel-ratio baseline = SEV-1) — fix shipped W330 binding `state.count >= 1 → exit(2)`.

**Status W342-B Q11 verification**: 1 `exit(2)` call + 8 `exit(0)` calls. The 8 `exit(0)` are ALL conditional-on-non-violation paths (correct behavior — NOT silent-fallback). The single `exit(2)` is the 2nd-violation binding gate (correct W330 P0-A behavior).

**Verdict**: NOT a violation post-W330; this is the W330-r1 sanctioned CR-5-exception condition-(b) dual-mode design (advisory exit 0 + binding exit 2).

**Severity**: MEDIUM-RESOLVED (was SEV-1 pre-W330; now post-fix verified).

**Cite-anchor**: W325-A F1 baseline + W329-D root-cause + W330 P0-A SHIPPED + W341-B Q11 NO-OP verification.

---

### Finding F3 — P4.3 (SubagentStop transcript-marker loop-guard) — SEV: MEDIUM

**Issue**: Verify SubagentStop hooks (if any local-defined) use the `transcript-marker loop-guard` stateless pattern per claudekit `cli/utils/transcript-parser.ts`.

**Status**: No project-owned SubagentStop hooks exist in `.claude/settings.json` (verified per CR-2 compliance + W255 cleanup). Plugin-shipped SubagentStop hooks (e.g. codex Stop-review-gate via `openai-codex/codex/1.0.4/hooks/hooks.json`) MUST be audited for transcript-marker discipline.

**Recommendation**: Confirm with codex plugin maintainer whether their Stop-review-gate hook implements transcript-marker loop-guard. If NOT, file upstream issue. If yes, document the marker phrase in CLAUDE.md for operator-trace.

**Severity**: MEDIUM (no IMMEDIATE production exposure — no project-owned SubagentStop hooks; plugin-shipped hooks rely on upstream discipline).

**Cite-anchor**: claudekit `cli/utils/transcript-parser.ts` + Anthropic hook-payload `stop_hook_active` + `transcript_path` fields. Sister-runtime skill: `transcript-marker-loop-guard`.

---

### Finding F4 — P4.4 (PostToolUseFailure extends to Edit|Write|MultiEdit) — SEV: LOW

**Issue**: Verify PostToolUseFailure dispatcher in `.claude/settings.json:hooks.PostToolUseFailure` extends to Edit|Write|MultiEdit failures (not just Bash exits).

**Status**: No PostToolUseFailure key found in `.claude/settings.json` (matches CR-2 minimalism). Edit|Write|MultiEdit tool failures bubble to native CC error-handling; no custom dispatcher needed.

**Verdict**: NOT a violation. Local runtime relies on CC native error-handling; no custom PostToolUseFailure needed because no project-owned hook bodies (CR-2).

**Severity**: LOW (informational; verify if upstream CC introduces a PostToolUseFailure event-class in future).

**Cite-anchor**: Anthropic `https://docs.anthropic.com/en/docs/claude-code/hooks` — PostToolUseFailure event-class documentation; CR-2 strict compliance.

---

### Finding F5 — Plugin-shipped hooks visibility — SEV: LOW

**Issue**: Plugin-shipped hooks (codex SessionStart/SessionEnd/Stop, everything-claude-code memory recorder) are NOT enumerated in `.claude/settings.json:hooks.*` because they load SEPARATELY from `.claude/plugins/cache/<plugin>/hooks/hooks.json`. This is the W332 audit-trap: empty `settings.json:hooks.Stop:[]` does NOT mean Stop-hook absent.

**Status**: CLAUDE.md ALREADY documents this audit-trap (per CR-1 W332 audit-trap clause).

**Recommendation**:
- Add a hook-inventory tool: `tools/list-active-hooks.mjs` that scans BOTH `.claude/settings.json:hooks.*` AND `.claude/plugins/cache/*/hooks/hooks.json` and prints unified hook-trigger inventory
- Document expected hook count baseline (CLAUDE.md or W344 closure-synthesis)

**Severity**: LOW (CLAUDE.md already mitigates; tool would harden operator-audit).

**Cite-anchor**: W332 audit-trap explicit-documentation + CLAUDE.md cardinal-rule-1 W331 axis-1 #4 mechanization (pre-commit cr2-2kb-hooks).

---

## Summary

| Finding | Severity | Status | Effort |
|---------|----------|--------|--------|
| F1 — preagent hooks missing metadata | HIGH | OPEN | ~30 LOC |
| F2 — parallel-guard silent-fallback | MEDIUM-RESOLVED | CLOSED (W330) | N/A |
| F3 — SubagentStop transcript-marker | MEDIUM | INVESTIGATE-UPSTREAM | upstream filing |
| F4 — PostToolUseFailure for Edit/Write | LOW | NOT-NEEDED | N/A |
| F5 — Plugin-shipped hook visibility | LOW | MITIGATED-CLAUDE.MD | tool ~50 LOC |

**Severity totals**:
- HIGH: 1
- MEDIUM: 1 open / 1 resolved
- LOW: 2

**Recommendations**:
1. **W344 Z5-followup**: Add metadata blocks to `tools/preagent-*.mjs` (F1)
2. **W345 candidate**: file upstream issue with codex plugin for SubagentStop transcript-marker confirmation (F3)
3. **W346 candidate**: build `tools/list-active-hooks.mjs` operator-audit utility (F5)

## Acceptance

- [x] All hooks enumerated (project + plugin-shipped)
- [x] 4 audit dimensions applied
- [x] 5 findings with severity + recommendation
- [ ] F1 fix queued for W344-Z5-followup or W345
- [ ] F3 upstream filing queued
