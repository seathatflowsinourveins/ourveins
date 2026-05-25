# W343-A19 — Vendor-fork sync: mattpocock-skills d54c497aa944 → b8be62ffacb0

**Stream**: W343-A19 (vendor-sync HEAD per W343 goal P1)
**Date**: 2026-05-20
**Upstream**: `mattpocock/skills` MIT (96.8k stars)
**Pinned SHA bump**: `d54c497aa944` → `b8be62ffacb0` (2 commits drift)

## Upstream commits in range

```
git log d54c497aa944..b8be62ffacb0 --oneline
b8be62ff Merge pull request from mattpocock/improve-codebase-architecture-html-report
<sha>    Update improve-codebase-architecture (ICA) — add HTML-REPORT.md scaffold + restructure SKILL.md
```

Commit titles per W343-A9-DIRECT probe: "Updated ICA" + merge.

## Upstream diff (gh api compare)

```json
{"path":"skills/engineering/improve-codebase-architecture/HTML-REPORT.md","status":"added","additions":123,"deletions":0}
{"path":"skills/engineering/improve-codebase-architecture/SKILL.md","status":"modified","additions":15,"deletions":5}
```

Only 2 files affected, both under `improve-codebase-architecture`. No moves, no renames, no deletes.

## Locally-vendored set (10 skills per CLAUDE.md L31)

The mattpocock vendor-fork comprises these 10 skills under `.claude/skills/` (no `mattpocock-` prefix — flat namespace per W330 P1-D / W320 Stream B ship):

| Local path | Upstream path | Affected by sync? |
|---|---|---|
| `.claude/skills/diagnose/` | `skills/engineering/diagnose/` | NO |
| `.claude/skills/grill-with-docs/` | `skills/engineering/grill-with-docs/` | NO |
| `.claude/skills/improve-codebase-architecture/` | `skills/engineering/improve-codebase-architecture/` | **YES** |
| `.claude/skills/review/` | `skills/engineering/review/` | NO |
| `.claude/skills/tdd/` | `skills/engineering/tdd/` | NO |
| `.claude/skills/to-issues/` | `skills/engineering/to-issues/` | NO |
| `.claude/skills/triage/` | `skills/engineering/triage/` | NO |
| `.claude/skills/zoom-out/` | `skills/engineering/zoom-out/` | NO |
| `.claude/skills/handoff/` | `skills/engineering/handoff/` (cross-checked) | NO |
| `.claude/skills/code-simplification/` (or `simplify`) | `skills/engineering/simplify/` | NO |

Upstream `skills/engineering/` also exposes `prototype`, `setup-matt-pocock-skills`, `to-prd` (not vendored — operator-curation drop per W330 P1-D selection).

## Files actually updated this stream

1. `.claude/skills/improve-codebase-architecture/SKILL.md` — synced to b8be62ff version (`+15/-5` upstream applied); vendor-fork-header comment preserved with SHA bump (`d54c497aa944` → `b8be62ff`)
2. `.claude/skills/improve-codebase-architecture/HTML-REPORT.md` — NEW file (123 LOC); referenced from updated SKILL.md as `[HTML-REPORT.md](HTML-REPORT.md)` for full HTML scaffold/diagram patterns/styling guidance

Change semantics (per SKILL.md diff §2 "Present candidates"): step renamed to "Present candidates as an HTML report"; candidates now rendered as Tailwind+Mermaid cards written to OS tempdir, opened via `xdg-open`/`open`/`start`; adds **Before/After diagram** and **Recommendation strength badge** per candidate; ends with **Top recommendation** section.

## CLAUDE.md L31 SHA cite

L31 currently reads: `mattpocock-vendor-fork-10 @ d54c497aa944 (W330 Stream P1-D + W320 Stream B)`

**NOT updated this stream** — CLAUDE.md L31 is operator-curated discipline cite and edit is out-of-scope for vendor-sync stream. Operator/closure-stream may bump cite to `b8be62ffacb0` in a separate edit if desired; the source-of-truth SHA lives in this VENDOR-SYNC-W343.md file + the per-skill vendor-fork header comment.

## Recommendation

**SYNCED** — vendor-fork drift closed for mattpocock/skills. Pin bumped to `b8be62ffacb0`. Drift table flipped to "stable". Per-skill vendor header in `improve-codebase-architecture/SKILL.md` reflects new SHA + provenance chain.

Future ICA sessions (skill auto-fires on architecture-review requests) will now emit Tailwind+Mermaid HTML reports per upstream restructure, not plain numbered lists — operator should expect this UX change on next ICA invocation.
