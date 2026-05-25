# Item-E — provenance-lint v3 (--safe-edit doc-only flow)

**Status**: DESIGN-COMPLETE — skeleton at `tools/provenance-lint-v3.mjs` (v2 retained as primary).

**Wave**: W331 Stream-GIT P0-5 item (e)
**Cite-anchor**: Conventional Commits 1.0.0 spec + W329 race-4 retrospective + CLAUDE.md L19 operator mandate.

## v2 baseline (current state)

The current provenance-lint v2 lives **inline in `.pre-commit-config.yaml` L102-112** as a single-line bash entry. Key features:

- 5 claim forms recognized: F1 `APPLIED:<path>`, F2 `APPLIED THIS COMMIT:<path>`, F3 `APPLIED <path>` (no-colon), F4 `APPLIED to <path>`, F5 `apply <verb> to <path>`.
- Path normalization: strips `:<linenum>` suffixes, sentence-punctuation, leading paren.
- `endsWith` fallback: handles `settings.json` vs `.claude/settings.json` mismatch.
- Prose-mode exclusion: only subject line + bullet/numbered list lines are claim-lines.
- VERIFIED-ALREADY-APPLIED `<sha>:<path>` SHA-binding verification.

Smoke status: 7/7 PASS per `.pre-commit-config.yaml:84-88` comments (W327 + W328 spec coverage).

## v3 enhancements

### Operator mandate (CLAUDE.md cite)

Per CLAUDE.md operator mandate: "colon-prefix-subject + footer-trailer ONLY (NEVER body prose)".

This is the **structural-claim-only** rule — instead of the v2 multi-form regex zoo scanning prose lines, v3 ONLY parses:

1. **Subject line** (first line) — `APPLIED: <path>` colon-prefix form, single canonical syntax.
2. **Footer trailers** — RFC-2822-style `Key: Value` lines AFTER the empty-line separator from body, e.g.:

   ```
   feat(W331-stream-git): land slsa-verifier wrapper

   Body prose that mentions APPLIED is IGNORED. Free-form text here.

   APPLIED: tools/slsa-verify-wrap.ps1
   APPLIED: docs/architecture/W331-SOTA-GIT-PRACTICE/ITEM-D-SLSA-VERIFIER-INSTALL.md
   Verified-By-SHA: 7ab93cf:docs/architecture/W329-RACE-4-RETROSPECTIVE.md
   ```

3. **NEVER body prose** — body bullets/numbered lists, even with APPLIED tokens, are ignored.

This eliminates W327/W328 prose-mode-exclusion regex complexity (a `while-read | grep -E "^[[:space:]]*([-*]|[0-9]+\\.)"` loop in v2) and aligns with Conventional Commits 1.0.0 §11 spec for git-trailers.

### --safe-edit doc-only flow (W329 race-4 prevention)

W329 race-4 was a content-loss class: pre-commit's stash-and-restore cycle interacted with parallel-session edits to drop staged content. The retrospective: docs-only changes don't need the full pre-commit gate (no security, no code, no executable scope) — so we bypass the stash cycle for them.

```jsonc
// CLI flag semantics
// --safe-edit       enable doc-only fast-path
// --commit-msg-path <path>  override default .git/COMMIT_EDITMSG
// (no flag)         standard v2-compatible behavior
```

The fast-path predicate:

```js
// Pseudo-code in tools/provenance-lint-v3.mjs
function isDocOnlyStaged(stagedFiles) {
  if (stagedFiles.length === 0) return false;
  const allDocOrTmp = stagedFiles.every(f =>
    f.startsWith('docs/') && f.endsWith('.md') ||
    f.startsWith('tmp/')
  );
  return allDocOrTmp;
}
```

If `--safe-edit` AND `isDocOnlyStaged()` → skip stash cycle, skip SHA verification, only run subject + footer-trailer claim audit (no `git stash` / `git stash pop` round-trip).

### v3 vs v2 diff matrix

| Feature | v2 | v3 |
|---|---|---|
| Claim forms | 5 (regex zoo) | 1 subject + git-trailers (RFC-2822) |
| Prose body scanning | Yes (with exclusion logic) | NO (mandate-compliant) |
| Path normalization | Multi-step sed pipeline | Trailer-Value-as-path (no normalization needed) |
| `endsWith` fallback | Yes (bash case-glob) | Optional (cleaner trailer-Value comparison) |
| SHA-binding (`VERIFIED-ALREADY-APPLIED`) | Yes | Yes (as `Verified-By-SHA:` trailer) |
| --safe-edit doc-only | NO | Yes (docs/**/*.md + tmp/** bypass) |
| File location | inline in `.pre-commit-config.yaml` | `tools/provenance-lint-v3.mjs` (out-of-line) |
| Smoke test count | 7 | TBD ≥9 (5 v2 cases + 2 defense + 2 v3-doc-fast-path) |

## Skeleton implementation

Created at `tools/provenance-lint-v3.mjs` — pure-Node ESM, no external deps. Skeleton only; pre-commit-config wiring deferred to W332+.

See `tools/provenance-lint-v3.mjs` for the actual skeleton (created this wave).

## Migration plan (v2 → v3)

**Phase 0 (this wave)**: skeleton + design doc, v2 stays as commit-msg gate.
**Phase 1 (next wave)**: implement v3 fully + add 9-case smoke suite. Run v3 in PARALLEL-ADVISORY mode (stages: [commit-msg], `entry` calls v3 with `--advisory` flag — logs differences from v2 without blocking).
**Phase 2 (after parallel-advisory soak)**: swap pre-commit-config to v3 as primary; v2 archived to `docs/architecture/W328-PROVENANCE-LINT-V2/`.
**Phase 3**: remove v2 inline block from `.pre-commit-config.yaml`.

## Risk + reversibility

- **Risk**: LOW for skeleton-only landing (no behavioral change). MEDIUM at Phase-2 swap (different claim grammar — invalid commits possible).
- **Reversibility**: FULL — Phase-2 swap is a single-line `.pre-commit-config.yaml` edit; revert to v2 by reverting that commit.

## Cite anchors

- Conventional Commits 1.0.0: `https://www.conventionalcommits.org/en/v1.0.0/` — git-trailers footer spec.
- RFC-2822 trailer format: `https://datatracker.ietf.org/doc/html/rfc2822` — Key: Value structural-claim grammar.
- git interpret-trailers: `https://git-scm.com/docs/git-interpret-trailers` — canonical parser reference.
- W329 race-4 retrospective: `docs/architecture/W329-*/` (anchor pending operator-side docs link).
- CLAUDE.md L19 operator-mandate quote.
