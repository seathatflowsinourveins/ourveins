# W337 P3-1 — CLAUDE.md ≤50 LOC trim

**Wave**: W337
**Date**: 2026-05-20
**Item**: Restore CLAUDE.md ≤50 LOC pointer-only invariant by relocating verbose W332 HTML comment to this detail doc.

---

## §1. What was trimmed

CLAUDE.md L51-52 prior content:

```html
<blank L51>
<!-- W332-NOTE: gitnexus analyze auto-injects a `<!-- gitnexus:start -->` block here. Deleted to restore ≤50 LOC pointer-only invariant. Skills at `.claude/skills/gitnexus-{guide,exploring,impact-analysis,debugging,refactoring,pr-review,cli}/` auto-fire on description-match and cover the same content. Suppression of re-injection (e.g., gitnexus `--no-claude-md` flag or config) tracked as W332 carry-forward task #516. -->
```

## §2. Why it was trimmed

CLAUDE.md cardinal pointer-only discipline mandates ≤50 LOC body (CCBP `claude-memory.md:34-40`). The trailing HTML comment was 1 informational line that exceeded the ceiling. Content migrated to this detail doc with link-back in CLAUDE.md L50.

## §3. Substantive content preserved

The original informational claim is preserved in full:

- `gitnexus analyze` (the GitNexus MCP CLI) auto-injects a `<!-- gitnexus:start --> ... <!-- gitnexus:end -->` block at the bottom of CLAUDE.md on certain command invocations.
- This block contains a serialized knowledge-graph snapshot.
- For CLAUDE.md ≤50 LOC pointer-only discipline, the block is removed each time it's injected.
- The same content is reachable via the 7 GitNexus skills at `.claude/skills/gitnexus-{guide, exploring, impact-analysis, debugging, refactoring, pr-review, cli}/` which auto-fire on `description:` match.
- Suppression of re-injection (e.g., a `gitnexus analyze --no-claude-md` flag, or a per-repo config setting) is tracked as W332 carry-forward task #516.

## §4. Next-action chain

1. **W332 task #516** — file an upstream feature request at the GitNexus repo (`abhigyanpatwari/GitNexus`) for `--no-claude-md` or equivalent config knob. Until that lands, the auto-injected block must be manually removed each invocation.
2. **W337 follow-up** — if gitnexus is upgraded to 803f0bed (P0-2), re-verify the auto-injection behavior since the diff includes Windows path-fix PRs.

## §5. Rollback

`git reset --hard pre-W337-p3-1-claude-md` reverts CLAUDE.md to the pre-trim state.

## §6. LOC discipline (stop-gate 6)

| File | Pre-trim | Post-trim | Target |
|---|---|---|---|
| `CLAUDE.md` | 52 | (verified post-Edit) | ≤50 |

---

## Cite-anchors

1. CCBP `claude-memory.md:34-40 @ f28c2da` — pointer-only ancestor-CLAUDE.md discipline
2. Anthropic claude-code memory doc `https://docs.anthropic.com/en/docs/claude-code/memory` — `@import` discipline + separate dynamic/transient content into subfiles
3. claudelint `claude-md-size` rule — 50-line-index discipline
4. Sibling `Z:\claude-sota-pure\CLAUDE.md` — 78 LOC canonical clean baseline
