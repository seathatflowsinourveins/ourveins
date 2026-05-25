# W320-D-4 mattpocock-vendor-fork-4 deps dir cleanup (M10 / STALE-D-5)

**Wave**: W320 Stream D P1
**Date**: 2026-05-19
**Origin**: W319 Stream D STREAM-D-STALE-REFS STALE-D-5 NEW finding
**Verdict**: **CORRECTION** — "mattpocock-vendor-fork-4 deps dir doesn't exist" is **PARTIALLY-TRUE** finding misinterpreted at sourcing layer; 4 skills DO exist as operator-curated vendor-forks; upstream repo IS live (NOT 404). PASTE-READY-EDIT for CLAUDE.md L30 NOT-APPLIED (operator-owned status block).

---

## §1 W319 finding — what was reported

W319 STREAM-D-STALE-REFS line STALE-D-5 (per CLAUDE.md L41 W319 status enumeration):

> STALE-D-5 `mattpocock-vendor-fork-4` deps dir doesn't exist + upstream 404 (NEW; W320 cleanup)

**My W320 read**: TWO claims, both need verification:

1. **"deps dir doesn't exist"** — is there a directory at `Z:/claude-sota-installed-repos/mattpocock-vendor-fork-4`?
2. **"upstream 404"** — does `https://github.com/mattpocock/skills` (the upstream source) return 404?

---

## §2 W320 re-probe — actual evidence

### 2.1 Directory probe

```
$ ls Z:/claude-sota-installed-repos/mattpocock-vendor-fork-4
# ls: cannot access '...': No such file or directory   ← CONFIRMED: no such dir

$ ls Z:/claude-sota-installed-repos/ | grep -i mattpoc
# mattpocock-skills                                    ← ACTUAL dir name (NOT vendor-fork-4)
```

**Verdict on claim 1**: TRUE-AT-LITERAL-PATH. There is no directory named `mattpocock-vendor-fork-4`. The actual clone is at `Z:/claude-sota-installed-repos/mattpocock-skills` (mtime 2026-05-16 20:14, last commit `e74f006 Clarify purpose of CONTEXT.md to emphasize it as a glossary, removing implementation details`).

### 2.2 Upstream HTTP probe

```
$ curl -s -o /dev/null -w "%{http_code}" https://github.com/mattpocock/skills
# 200                                                  ← LIVE (NOT 404)

$ curl -s -o /dev/null -w "%{http_code}" https://api.github.com/repos/mattpocock/skills
# 200                                                  ← API also LIVE

$ cd Z:/claude-sota-installed-repos/mattpocock-skills && git remote -v
# origin    https://github.com/mattpocock/skills.git (fetch)
# origin    https://github.com/mattpocock/skills.git (push)
```

**Verdict on claim 2**: FALSE — upstream is LIVE at `https://github.com/mattpocock/skills` (HTTP 200; git remote intact). The "upstream 404" claim in W319 STALE-D-5 is a probe-error or attribution-error.

### 2.3 Skills probe — do the 4 mattpocock-attributed skills exist?

CLAUDE.md L30 reads (verbatim):

> mattpocock-vendor-fork-4: grill-with-docs + tdd + caveman + diagnose

```
$ ls Z:/claude-sota-installed/.claude/skills/grill-with-docs/SKILL.md   # 4960B, mtime 2026-05-18 23:40
$ ls Z:/claude-sota-installed/.claude/skills/tdd/SKILL.md               # 6123B, mtime 2026-05-18 23:41
$ ls Z:/claude-sota-installed/.claude/skills/caveman/SKILL.md           # 2711B, mtime 2026-05-18 23:41
$ ls Z:/claude-sota-installed/.claude/skills/diagnose/SKILL.md          # 8658B, mtime 2026-05-18 23:41
```

**Verdict**: all 4 skills exist + auto-fire (each has SKILL.md with appropriate description: frontmatter per `Available skills` list in current session).

---

## §3 Root-cause analysis — "vendor-fork-4" is a CLAUDE.md L30 naming convention, NOT a deps-dir path

CLAUDE.md L30 uses the string "**mattpocock-vendor-fork-4**" as a logical group label denoting "4 skills cherry-picked from the mattpocock-vendor-fork operation" — NOT a filesystem path. The clone IS at `mattpocock-skills/` (the repo's actual name); the SKILL.md files are at `.claude/skills/{grill-with-docs,tdd,caveman,diagnose}/`.

**Naming-convention parallel**: CLAUDE.md L30 also reads "addyosmani-vendor-fork-5: interview-me + doubt-driven-development + frontend-ui-engineering + api-and-interface-design + code-simplification" — the actual clone is at `Z:/claude-sota-installed-repos/addyosmani-agent-skills/` (NOT `addyosmani-vendor-fork-5/`), and the skills live at `.claude/skills/{interview-me,doubt-driven-development,frontend-ui-engineering,api-and-interface-design,code-simplification}/`. Same convention: "vendor-fork-N" is the logical-cohort label; the filesystem name follows the upstream repo.

So:

- **`mattpocock-vendor-fork-4`** = 4 skills cherry-picked from `mattpocock-skills` (matches upstream `mattpocock/skills`)
- **`addyosmani-vendor-fork-5`** = 5 skills cherry-picked from `addyosmani-agent-skills` (matches upstream `addyosmani/agent-skills`)
- **`mattpocock+addyosmani-vendor-fork-9`** = the combined 9-skill cohort

**W319 STALE-D-5 mis-attribution origin**: probably a literal grep for "mattpocock-vendor-fork-4" in `Z:/claude-sota-installed-repos/` that returned no-match, combined with a probe for `https://github.com/mattpocock/agent-skills` (or similar variant) that returned 404 due to wrong URL.

---

## §4 Remediation — CLAUDE.md L30 cite refresh (paste-ready, NOT auto-applied)

CLAUDE.md L30 is a 49-LOC body line containing inline summary of all operator-curated skills. The "mattpocock-vendor-fork-4" label IS the canonical naming convention used across `.mcp.json _comments` (W314 + W315 + W316 references), VERDICT-LEDGER, and W319 status block. **Renaming the label would be more disruptive than clarifying the naming convention.**

**Recommended CLAUDE.md L30 inline-clarify edit** (paste-ready, operator-owned):

Current L30 substring (~character 600-700 of L30):

```
mattpocock-vendor-fork-4: grill-with-docs + tdd + caveman + diagnose,
```

Proposed substring:

```
mattpocock-vendor-fork-4 [clone at Z:/claude-sota-installed-repos/mattpocock-skills @ e74f006]: grill-with-docs + tdd + caveman + diagnose,
```

**Char-budget impact**: +52 chars added to L30. L30 is currently long but within 50-LOC body cap (cap is line-count not char-count per CLAUDE.md L3 invariant).

**Operator-decision required because**:

1. CLAUDE.md status sections are operator-owned per W317-Stream-A rolling-3 retention policy (CLAUDE.md L48).
2. The clarification adds line-length but the 50-LOC line-count is unchanged.
3. Alternative: leave L30 as-is + add a glossary footnote at the top of `docs/architecture/INDEX.md` defining "vendor-fork-N" as a logical-cohort label, not a filesystem path. **Less invasive but lower discoverability.**

---

## §5 STALE-D-5 closure — re-classify W319 finding

| W319 STALE-D-5 claim | W320 verdict |
|---|---|
| "mattpocock-vendor-fork-4 deps dir doesn't exist" | TRUE (literal-path) — but actual dir is `mattpocock-skills/`, NOT a stale ref |
| "+ upstream 404" | FALSE — `https://github.com/mattpocock/skills` returns HTTP 200, git remote intact |
| Overall severity | RECLASSIFY from STALE to **NAMING-CONVENTION-CLARIFY** |

**Re-classified verdict**: STALE-D-5 reduces from "cleanup needed" to "doc-clarification optional". No filesystem cleanup needed (the dir is named correctly — it's `mattpocock-skills/` per the upstream repo name).

---

## §6 Forward-AI (W321 candidates)

- **W321-D-4a (P3)**: apply CLAUDE.md L30 inline-clarify per §4 to remove future misreading risk. Add "(filesystem clone at `Z:/claude-sota-installed-repos/<upstream-repo-name>`)" parenthetical to both `mattpocock-vendor-fork-4` and `addyosmani-vendor-fork-5` labels.
- **W321-D-4b (P3)**: optionally add a glossary section to `docs/architecture/INDEX.md` defining "vendor-fork-N" naming convention to prevent future audits from running literal-path greps.
- **W321-D-4c (P2)**: W319 STREAM-D-STALE-REFS.md authors should be informed of the mis-attribution to avoid replicating the pattern in W321+ audits — file as feedback in W320 closure synthesis.

---

## §7 Cite chain

- W319 Stream D STALE-D-5 origin: CLAUDE.md L41 W319 status block "STALE-D-5 `mattpocock-vendor-fork-4` deps dir doesn't exist + upstream 404 (NEW; W320 cleanup)"
- CLAUDE.md L30 vendor-fork-N naming: `Z:/claude-sota-installed/CLAUDE.md:30` (operator-curated skills inventory)
- Mattpocock skills clone: `Z:/claude-sota-installed-repos/mattpocock-skills/` (mtime 2026-05-16 20:14; HEAD `e74f006`)
- Mattpocock upstream: `https://github.com/mattpocock/skills` (HTTP 200 verified 2026-05-19 W320)
- 4 skills filesystem: `.claude/skills/{grill-with-docs,tdd,caveman,diagnose}/SKILL.md` (all 4 exist + auto-fire-eligible per session skills list)
- Addyosmani parallel naming: CLAUDE.md L30 "addyosmani-vendor-fork-5" → `Z:/claude-sota-installed-repos/addyosmani-agent-skills/`
