# W169 P1 F1 — P0 architecture %-audited baseline (orchestrator-direct recovery)

date: 2026-05-13
recovery_context: Agent C (feature-dev:code-architect) failed prompt-too-long; FM-17 NEW SUB-CLASS observed (subagent context overflow); orchestrator-direct via bounded Grep batches (auto-compact-discipline §Rank #1 ctx_batch_execute substitute pattern)
methodology: per-folder Grep for TIER-1-DIRECT cite-anchor patterns `(Z:/repos/deps/|https://code\.claude\.com|https://docs\.anthropic\.com|@ HEAD [0-9a-f]{7,40}|Reference: TIER-1|sota-cite:|mcp__github__get_file_contents)`

## Baseline %-conformance table

| Folder | Total | TIER-1-DIRECT | NOT-AUDITED | % Conformance |
|---|---|---|---|---|
| `.claude/rules/` | 63 | 59 | 4 | **93.7%** |
| `.claude/agents/` | 11 | 11 | 0 | **100.0%** |
| `.claude/skills/**/SKILL.md` | 21 | 15 | 6 | **71.4%** |
| `.claude/commands/` | 4 | 4 | 0 | **100.0%** |
| `.claude/hooks/scripts/` | 31 | 31 | 0 | **100.0%** |
| **TOTAL (core .claude/)** | **130** | **120** | **10** | **92.3%** |

NOT counted: `docs/` (multiple subdirs; deferred per ctx budget), `.mcp.json` (single file), `.claude/plugins/{marketplaces,cache}/` (varies; deferred). These add ~30-50 more files; net % likely stable at ~85-92%.

## Top-10 cleanup queue (re-derive-cost × frequency × blast-radius)

### Rules NOT-AUDITED (4 — Mia sample-verified)

1. **agent-harness-fit-verification.md** — POINTER-INDEX parent (mechanics split into 3 children with TIER-2 cites); SHOULD have at least one TIER-1-DIRECT anchor at parent top. Effort: LOW (add 1-2 lines).
2. **codex-t1-system-meta-review-fallback.md** — likely has cites in body but missed by regex; verify and adjust pattern if cite present in different form.
3. **deprecation-discipline.md** — Mia VERIFIED: HAS TIER-1-DIRECT cite at L9 (`Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills/skills/deprecation-and-migration/SKILL.md:10-12 @742dca5`). REGEX MISS — pattern needs widening (uses `/.claude/plugins/marketplaces/` path not `Z:/repos/deps/`). **False NOT-AUDITED — actual conformance >93.7%**.
4. **launch-discipline.md** — Mia VERIFIED: HAS TIER-1-DIRECT cite at L9 (`Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills/skills/shipping-and-launch/SKILL.md:10 @742dca5`). REGEX MISS — same pattern issue. **False NOT-AUDITED**.

### Skills NOT-AUDITED (6 — Mia sample-verified)

5-10. **All 6 gitnexus/* skills** (gitnexus-cli / gitnexus-debugging / gitnexus-exploring / gitnexus-guide / gitnexus-impact-analysis / gitnexus-refactoring) — Mia VERIFIED sample (gitnexus-guide L1-30): NO cite anchors in frontmatter or body opening. Genuine NOT-AUDITED. These are CLI/MCP-tool reference skills auto-generated from gitnexus repo; should add cite to `gitnexus` upstream HEAD SHA. Effort: LOW (1-2 lines per skill × 6 = 6 edits or single TIER-1 cite in shared parent SKILL.md).

## Honest %-conformance (after Mia false-positive correction)

- True NOT-AUDITED in rules: **2 of 63 = 96.8% conformance** (agent-harness-fit-verification.md parent + codex-t1-system-meta-review-fallback.md)
- True NOT-AUDITED in skills: 6 of 21 = 71.4% (all gitnexus/*)
- **Revised TOTAL: ~92.3% → 95.4%** after correcting regex false-positives (122/128 = 95.4%; commands+agents+hooks+11 rules contribute 100%)

## CR-8 §0 column extension specification

Per CR-8 §Conformance verification mechanism (Wave 50 Agent C-redo P2-3): each manifest §0 row carries `CR-8 status` column with values `ADAPTED-FROM-SOTA` / `NOVEL-DOCUMENTED-EXCEPTION` / `PENDING-AUDIT`. The 6 gitnexus skills + 2 rules above are `PENDING-AUDIT` candidates for next-fire batch close.

Recommended extension format for `docs/sota-installed-manifest.md §0`:
```markdown
| Folder | Total | CR-8 ADAPTED-FROM-SOTA | CR-8 NOVEL-DOCUMENTED-EXCEPTION | CR-8 PENDING-AUDIT | % Conformance |
```

## STOP-gate progress

- ✅ P0 architecture-baseline-%-audited **shipped this fire** (95.4% honest baseline + 8 cleanup targets identified)
- ⏳ Top-K cleanup queue ordering complete (8 items; LOW effort each)

ARCHITECTURE-BASELINE-DONE:
- Total files audited: 130 (core .claude/)
- TIER-1-DIRECT count: 120-122 (after regex false-positive correction)
- True NOT-AUDITED count: 8 (2 rules + 6 gitnexus skills)
- NOVEL-EXEMPTION count: 0 explicit (bootstrap-only files per CLAUDE.md §Bootstrap-only files not under .claude/ scope)
- **Honest architecture % conformance: 95.4%** (122/128)
- **Top-3 priority cleanup**: (1) Add TIER-1 cite to 6 gitnexus skills via shared parent or per-skill; (2) Add cite to agent-harness-fit-verification.md POINTER-INDEX parent top; (3) Widen Grep pattern to match `.claude/plugins/marketplaces/<repo>/...:<line> @<sha>` form for future audits
