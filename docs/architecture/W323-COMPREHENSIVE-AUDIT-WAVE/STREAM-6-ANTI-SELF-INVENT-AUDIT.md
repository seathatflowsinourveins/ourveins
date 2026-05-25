# W323 Stream-6 — Anti-self-invent file-by-file audit

**Date**: 2026-05-19 · **Scope**: `.claude/{state,hooks,skills}` + `tools/` + `harness/` · **Methodology**: native Glob/Read + PowerShell enumeration (NO repomix-pack)

## §0 Cardinal-rule-4 strict reading

CLAUDE.md R4 ("`self_invented_count: 0`") scope per text: `.claude/rules/*.md` + `.claude/hooks/scripts/*` (W255-cleanup boundary). **Both directories enumerated empty** — R4 strict invariant **HOLDS** (0 + 0 = 0). The operator's stricter reading ("ALL from SOTA repos") expands scope to `tools/` + `harness/` + `.claude/skills/`-local; those are audited below as advisory.

## §1 File-by-file classification (rounded counts)

| Surface | Count | Class spread |
|---|---|---|
| `.claude/state/*` (logs/markers) | 60+ files (mostly `.jsonl`) | **STATE** — runtime artifacts emitted by upstream hooks; not source code; out-of-R4-scope. Only 1 SOURCE FILE here: `bash-home-pin.sh` (R2-EXCEPTION-SHIM) |
| `.claude/hooks/*` | 1 (`context-mode-cache-heal.mjs`, 1656B) | R2-EXCEPTION-SHIM (✓ ≤2KB, cite-anchored to `anthropics/claude-code#46915`) |
| `.claude/skills/*/SKILL.md` | 34 dirs (32 with SKILL.md + 2 MISSING) | mix: 8 UPSTREAM-CLONE + 1 DEPRECATED-CANDIDATE + 22 OPERATOR-LOCAL + 1 prefix-dup-set (4) |
| `tools/*` | 21 files (PowerShell + Python + sh + mjs) | all OPERATOR-AUTHORED with W-wave provenance headers; cite SOTA references inline |
| `harness/*` | 18 .py files | all OPERATOR-AUTHORED; cite Anthropic Agent SDK + Inspect AI + Promptfoo |

## §2 SELF-INVENT-CANDIDATES (highest priority)

### §2.A R4-strict — VIOLATIONS: **0**

`.claude/rules/` = empty · `.claude/hooks/scripts/` = empty · `self_invented_count: 0` HOLDS.

### §2.B R4-strict — R2-EXCEPTIONS: **2** (both compliant)

| File | Size | Cite-anchor | Status |
|---|---|---|---|
| `.claude/state/bash-home-pin.sh` | 464 B | W317-Stream-C MSYS HOME re-pin per Git Bash msys-2.0.dll v3.6.4 inbound conversion | ✓ ≤2KB ✓ cite-anchored |
| `.claude/hooks/context-mode-cache-heal.mjs` | 1656 B | `anthropics/claude-code#46915` (auto-update breaks `${CLAUDE_PLUGIN_ROOT}`) | ✓ ≤2KB ✓ cite-anchored |

### §2.C Operator-strict — VIOLATIONS (advisory, not R4):

**Largest concern — `sota-convergence-audit/SKILL.md` = 210,992 bytes** (~5K lines):
- Accreted v1→v2→v3→v3.1→v4→v5→v6→v6.1→v7→v7.1 deltas inline (W288→W314)
- Operator-curated, NOT vendored from any upstream
- Functional but bordering on self-invented framework
- **Remediation**: extract v7.1-canonical to a versioned doc; SKILL.md becomes pointer-only (per CLAUDE.md preload-budget pattern); each prior-version delta archived to `docs/architecture/sca-archive/v{N}.md`

**Other large operator-curated skills (potentially self-invented frameworks)**:
| Skill | Size | Origin notes |
|---|---|---|
| `goal-prompt-synthesis/SKILL.md` | 27,098 B | Operator-curated W295+ codification |
| `mem-recall/SKILL.md` | 8,741 B | "5th memory-class operationalization after Wave 113 `/recall` slash command" — operator-curated |
| `dspy-integration/SKILL.md` | 4,888 B | W315-T1-CASCADE-CLOSURE ratified integration |
| `durable-planning-files/SKILL.md` | 7,152 B | Operator-curated planning pattern |
| `parallel-dispatch-mandate/SKILL.md` | 2,567 B | W269 mandate codification |
| `langfuse/SKILL.md` | 6,737 B | Local SDK usage notes |
| `local-cypher-codebase/SKILL.md` | 5,773 B | Operator-curated |
| `vercel-composition-patterns/SKILL.md` | 1,004 B | Vercel labs cite — possibly upstream-extractable |
| `vercel-react-best-practices/SKILL.md` | 995 B | Vercel labs cite |
| `web-design-guidelines/SKILL.md` | 971 B | Operator-curated |

10 operator-curated local skills with no clear upstream parent. The 10-skill speckit-* family (`speckit-{analyze,checklist,clarify,constitution,implement,plan,specify,tasks,taskstoissues}`) likely from `github.com/github/spec-kit` — verify upstream parity.

### §2.D Broken / missing — REMOVE candidates

| Skill | Issue | Remediation |
|---|---|---|
| `.claude/skills/gitnexus/` | **MISSING SKILL.md** (dir exists, file absent) | rm dir OR write SKILL.md |
| `.claude/skills/learned/` | **MISSING SKILL.md** | rm dir OR write SKILL.md |

### §2.E Vendor-fork drift — DEPRECATED-candidate

| Skill | Issue | W321-3 cite |
|---|---|---|
| `.claude/skills/interview-me/SKILL.md` (14,487B) | Not in current `addyosmani/agent-skills` HEAD (deepwiki query) — likely renamed/removed upstream | W321-3 §4 deprecated list |

### §2.F Vendor prefix-duplicates — questionable

`addyosmani-{api-and-interface-design,code-simplification,doubt-driven-development,frontend-ui-engineering}` — 4 prefix-namespaced copies of the unprefixed peers. Operator-noted at CLAUDE.md L41 "3 prefix-namespaced variants from prior wave". Net 4 prefix-dups in tree today; W321-3 flagged for removal once non-prefix vendored copies confirmed canonical.

## §3 R2-EXCEPTION-SHIM verification (`.claude/hooks/` + `.claude/state/`)

| File | ≤2KB? | Cite-anchored? | Behavior-fail-soft? | Verdict |
|---|---|---|---|---|
| `.claude/hooks/context-mode-cache-heal.mjs` | ✓ 1656B | ✓ `anthropics/claude-code#46915` | ✓ try/catch with stderr-write + exit 1 on top-level fail | ✓ COMPLIANT |
| `.claude/state/bash-home-pin.sh` | ✓ 464B | ✓ W317-Stream-C root-cause cite | ✓ soft-warn on USERPROFILE unset (no `set -e` that would exit sourcing shell) | ✓ COMPLIANT |

**No R2 violations detected**.

## §4 Remediation plan

### W324 P0 — broken state cleanup (immediate, zero-risk)
- `rm -rf .claude/skills/gitnexus/` + `.claude/skills/learned/` (or write proper SKILL.md if features intended)
- Remove `.claude/skills/interview-me/` per W321-3 §4 (verify upstream-deprecation first via deepwiki one-liner)
- Remove 4 `addyosmani-*` prefix-dup dirs (canonical non-prefix peers exist)

### W324 P1 — `sota-convergence-audit` extraction
- Move v1→v7 inline deltas → `docs/architecture/sca-archive/v{N}.md` (10 archive files)
- SKILL.md compresses to ≤5KB pointer-only header + v7.1 canonical rules
- Preload-budget save: ~205KB → ~5KB per skill-load event

### W324 P2 — speckit upstream-parity probe
- `mcp__deepwiki__ask_question` on `github.com/github/spec-kit`: verify our 10 speckit-* skills match upstream HEAD
- Re-vendor if drifted; remove if upstream-deprecated

### W324 P3 — operator-curated local skill provenance documentation
- For each of the 10 operator-curated local skills (§2.C), add `## Provenance` block at top citing the wave that introduced them + reasoning why no upstream parent exists
- Justifies them as **OPERATOR-CURATED-NO-UPSTREAM-PARENT** (a documented sub-class) vs masked self-invent

### W324 P4 — tools/harness provenance ratification
- 21 tools/ files + 18 harness/ files all carry W-wave provenance comments
- **STATUS**: already-disclosed self-invents-with-justification (NOT stealth); cardinal-rule-5 install-priority precedent at `tools/eee.ps1:L11` confirms "permitted hand-coded files"
- **No remediation required** for R4-strict; operator-strict reading would require vendoring from upstream — likely infeasible (these are runtime-specific glue)

## Report-back (3 sentences)

`self_invented_count: 0` cardinal-rule-4 strict invariant **HOLDS** (0 files in `.claude/rules/` + 0 in `.claude/hooks/scripts/`); both R2-exception shims (`bash-home-pin.sh` 464B + `context-mode-cache-heal.mjs` 1656B) are ≤2KB and cite-anchored. **Worst self-invent-candidate needing upstream-parent search**: `sota-convergence-audit/SKILL.md` at 210,992 bytes — 10-version accreted operator-curated rubric framework; needs extraction to archive + pointer-only SKILL.md. 2 broken skill dirs (`gitnexus/` + `learned/` MISSING SKILL.md) + 1 upstream-deprecated (`interview-me/`) + 4 prefix-dup `addyosmani-*` need cleanup in W324 P0.

Report path: `Z:/claude-sota-installed/docs/architecture/W323-COMPREHENSIVE-AUDIT-WAVE/STREAM-6-ANTI-SELF-INVENT-AUDIT.md`. No code changes committed; audit-only directive honored.
