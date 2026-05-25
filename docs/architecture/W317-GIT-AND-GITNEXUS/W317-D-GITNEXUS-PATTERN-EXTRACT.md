# W317-D — GitNexus Pattern Extract (closes 4-wave silent debt)

**Wave**: W317
**Stream**: D (git-practice SOTA hardening + GitNexus pattern-extract)
**Date**: 2026-05-19
**Status**: EXTRACTED-2-PATTERNS

## Context — the silent debt

GitNexus has been ratified `T3 PATTERN-STUDY` in 4 successive waves (W312/W313/W314/W315) per VERDICT-LEDGER row 33. License (`PolyForm-Noncommercial-1.0.0`) hard-caps D1 (license-permissivity) to `1`, which blocks INSTALL and VENDOR-FORK paths under sca-v6.1 / sca-v7. The pattern-study path is the **only** permitted relationship.

Across those 4 waves the ledger annotated the patterns ("Cypher MCP graph-query for codebase nav" + "PreToolUse Grep-augment hook") but **no actual extract artifact landed**. W317-D closes that debt.

## Patterns extracted (2/2)

### Pattern 1 — Cypher MCP graph-query for codebase nav

Reimplemented license-free as **`.claude/skills/local-cypher-codebase/SKILL.md`**. The skill auto-fires when the operator asks for graph-query shapes (find callers / overrides / writers / diamond-inheritance / methods-of-class) and translates each Cypher example from `gitnexus/src/mcp/tools.ts:140-197` into a sequence of `serena.find_symbol` + `serena.find_referencing_symbols` + `serena.find_implementations` + `Grep` calls. No GitNexus install, no KuzuDB index, no license entanglement — same query shapes, native tools only.

Mapping (5 GitNexus Cypher examples → 5 native-tool recipes):

| GitNexus Cypher | Native serena+Grep recipe |
|---|---|
| `(a)-[:CALLS]->(b:Function{name:X})` | `find_symbol(X) → find_referencing_symbols` |
| `(c:Class{name:X})-[:HAS_METHOD]->(m)` | `find_symbol(X) → get_symbols_overview` |
| `(w)-[:METHOD_OVERRIDES]->(l)` | `find_symbol → find_implementations` |
| `[:ACCESSES,reason:write]->(p)` | `find_referencing_symbols → Grep '\.X\s*='` |
| Diamond-inheritance | `find_implementations` 2-pass + DAG walk |

### Pattern 2 — PreToolUse Grep-augment hook contract

Reimplemented license-free as **`docs/architecture/W317-GIT-AND-GITNEXUS/W317-D-GREP-AUGMENT-HOOK-DRAFT.md`** (paste-ready PowerShell + settings.json snippet). Operator-decision before wiring — the hook is a project-owned `.claude/hooks/*.ps1` which collides with CR-2 unless cite-anchored to an anthropics/claude-code issue. Document also offers an alternative (option A) of just using SKILL.md pattern #1 to avoid the CR-2 friction entirely.

Mechanism mapped (from `gitnexus/hooks/claude/gitnexus-hook.cjs` + `pre-tool-use.sh`):

1. PreToolUse hook receives JSON `{tool_name, tool_input, cwd}` on stdin.
2. Match `Grep|Glob|Bash(rg|grep)` → extract pattern.
3. Skip if `len < 3`.
4. Run side-search with 2 lines context, cap at top-5 matches.
5. Return `{hookSpecificOutput: {additionalContext: "..."}}`.

The license-free reimplementation swaps GitNexus's `npx -y gitnexus augment <pattern>` (license-blocked binary call) for a direct `rg -C 2 -n --max-count 1` invocation.

## Verdict — close pattern-study debt

Ledger row 33 stays at **T3 PATTERN-STUDY**. No demote needed (the patterns *were* extractable — silent debt was that no artifact landed, not that the patterns were unreachable). Future waves should not re-annotate "GitNexus T3 PATTERN-STUDY pending" — the extracts now exist at:

- `.claude/skills/local-cypher-codebase/SKILL.md` (4.0 KB)
- `docs/architecture/W317-GIT-AND-GITNEXUS/W317-D-GREP-AUGMENT-HOOK-DRAFT.md` (5.0 KB)

## Why not DEMOTE to T4 CITE-ONLY

The goal predicate offered DEMOTE-T4 as an alternative if patterns were unextractable. Both patterns *were* extractable in finite time within this stream (the heavy lifting was done in the GitNexus source — we only had to map the API to native tools). T4 demote is not justified.

## References

- VERDICT-LEDGER row 33 (`docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md:177`)
- GitNexus repo: `Z:/repos/deps/gitnexus/` (PolyForm-NC-1.0.0)
- GitNexus Cypher tool: `Z:/repos/deps/gitnexus/gitnexus/src/mcp/tools.ts:140-197`
- GitNexus PreToolUse hook: `Z:/repos/deps/gitnexus/gitnexus/hooks/claude/gitnexus-hook.cjs:1-200`
- Cardinal rule 1 cite: `https://code.claude.com/docs/en/plugins`
- Cardinal rule 2 cite: `https://docs.anthropic.com/en/docs/claude-code/hooks`
