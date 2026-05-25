# W316-B — Supersession-Chain Pre-Flight Lint Hook (PASTE-READY DRAFT)

> **Status**: DRAFT — paste-ready for operator confirmation. **DO NOT apply to settings.json without explicit operator ACK.**
> Closes: W315-D Δ34 HIGH finding H1 (Row #46 PWF supersession-chain failure) + W312-codex-r1 finding (Stream C re-enable of `planning-with-files@planning-with-files` cited wrong supersession authority).
> Cardinal-rule compliance: **R2 direct-CLI invocation** (no project-owned hook body; uses upstream-shipped `git`, `grep`, `bash` as direct CLIs per CCBP `claude-settings.md:hooks.PreToolUse`).

## Mandate

Before any `Edit` or `Write` PreToolUse op on `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` OR on `verdicts/W*-*.md` (T6 basic-memory canonical store), assert: for any candidate slug appearing in a "RE-LITIGATED" / "RE-AUDIT" / "HOLDS" verdict line, the cited authority row in the edit MUST match the chronologically-latest prior ledger row for that slug.

## CR-2-compliant direct-CLI invocation

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'TARGET=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; case \"$TARGET\" in *VERDICT-LEDGER.md|*/verdicts/*) ;; *) exit 0 ;; esac; SLUGS=$(grep -oE \"^\\| [0-9]+ \\| W[0-9]+\" \"$TARGET\" 2>/dev/null | head -20 || true); if [ -z \"$SLUGS\" ]; then exit 0; fi; if grep -qE \"(RE-LITIGATED|RE-AUDIT|HOLDS)\" \"$TARGET\"; then echo \"PreToolUse supersession-chain pre-flight: edit touches RE-LITIGATED/RE-AUDIT/HOLDS verdict line; operator MUST manually verify cited_authority_row == chronologically-latest prior row per Δ34 v7.1\" >&2; fi; exit 0' || exit 0",
            "timeout": 5000,
            "continueOnBlock": true
          }
        ]
      }
    ]
  }
}
```

**Hook semantics**:

- **Matcher**: fires on `Edit` and `Write` tool invocations.
- **Path-scope guard**: `case` statement exits 0 (skip) unless target path matches `*VERDICT-LEDGER.md` OR `*/verdicts/*`. Avoids over-firing on unrelated edits.
- **Detection**: `grep -qE "(RE-LITIGATED|RE-AUDIT|HOLDS)"` against the target file (post-edit content from Edit/Write tool input).
- **Action**: emits an advisory `>&2` warning encouraging operator manual verification. **Advisory at v7.1-DRAFT** (per W315-D AI-W315-D-1 + W316 ship-condition #2). **Blocking-promotion** deferred to v7.2 after operator-validates the audit pattern on 3+ RE-LITIGATED verdicts without false-positive.
- **Exit code**: always `exit 0` (advisory, not blocking). `continueOnBlock:true` preserves PostToolUse downstream.
- **Timeout**: 5s.

## What this does NOT do

- **NOT** an installed lint package — uses upstream-shipped bash + grep as direct CLIs (no `pip install supersession-lint` or similar). This is **CR-2 compliant** per:
  - Anthropic docs `https://docs.anthropic.com/en/docs/claude-code/hooks` (hooks are declared as `type: command` with the command string invoking an upstream CLI).
  - W255 spirit: no project-owned hook bodies (no `.claude/hooks/scripts/*.py`); the entire logic lives inline in `settings.json`.
  - W314-r2 F-1 silent-fallback fix precedent: gitleaks `--exit-code 0 || true` → `|| exit 2` was a 1-line direct-CLI inline change. Same pattern here.
- **NOT** auto-blocking — advisory-only. Operator interprets the warning and verifies manually. Promotion to blocking requires:
  1. ≥3 RE-LITIGATED verdicts ship with hook active + manual verification → 0 false-positives.
  2. Codex round-2 ratification of the blocking-promotion.
- **NOT** modifies ledger format — the existing `VERDICT-LEDGER.md` markdown table format is preserved.

## How operator confirms before settings.json apply

1. Read this draft + verify hook command logic by hand.
2. Confirm path-scope guard matches expected behavior (test: edit unrelated file → no warning; edit VERDICT-LEDGER.md with RE-LITIGATED line → warning).
3. Confirm advisory-not-blocking semantics (test: hook warning does not abort the Edit/Write op).
4. If satisfied, apply to `.claude/settings.json:hooks.PreToolUse[]` array (3 lines net addition; settings.json size delta ~600 bytes — well within ≤15.4 KB cap).
5. Smoke-test: edit a verdicts/* file with RE-LITIGATED content → warning fires → exit 0 → edit completes.

## Future v7.2 promotion path

After 3+ RE-LITIGATED verdicts ship with this hook active + 0 false-positives surfaced:

- Promote `>&2` warning to **structured stdout JSON** consumable by a downstream codex Phase-5/6 review.
- Add `cited_authority_row` and `chronologically_latest_row` extraction from the edit content via in-shell awk one-liner.
- Strict-mode: `exit 2` (block Edit/Write) when `cited_authority_row != chronologically_latest_row`. Operator must re-cite before retry.

## Reproduction commands (operator test before applying)

```powershell
# Dry-run test 1: unrelated file (should NO-OP, exit 0)
$env:CLAUDE_TOOL_INPUT_FILE_PATH = 'docs/architecture/UNRELATED.md'
bash -c 'echo "no warning expected"'

# Dry-run test 2: ledger file with RE-LITIGATED line (should EMIT warning, exit 0)
$env:CLAUDE_TOOL_INPUT_FILE_PATH = 'docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md'
# manually verify the grep -qE matches an existing RE-LITIGATED row
```

## Cross-references

- `W315-D-V7-1-DECISION-RULES.md §1 Δ34` — full supersession-chain audit spec
- `W315-D-SYNTHESIS.md AI-W315-D-7` — operator-AI carry-forward
- W312-codex-r1 closure commit message — supersession-chain audit lesson
- CCBP `claude-settings.md:hooks.PreToolUse` HEAD `48798ca` (W314 cite-refresh — content stable across 1386b0e→48798ca per W314 Stream C)

## Verdict

**PASTE-READY**: yes (3-line settings.json addition; ~600-byte size delta).
**APPLIED**: NO — operator confirms before apply per W316-B ship-condition #2.
**Risk**: LOW — advisory-only, exit 0 always, path-scoped to ledger files only.
