# Wave 153 Fire 9 — Minimal disabled-plugin cite-pointer (V3 ADVERSARIAL SCOPE-DOWN of V2 design)

**Date**: 2026-05-11
**Cron**: `9eb2e02a` iteration 9/N
**Class**: META-process audit + minimal cite-pointer (NOT new standalone index file per V3 ADVERSARIAL prescription)
**Convergence type**: V2+V3 Path P REAL GPT-5.5 (CR-3 cross-model gate FULLY SATISFIED 7th non-Phase-1-bootstrap)
**Risk class**: LOW (doc-only append + 1 ship doc; reversible via git revert)

## Operator mandate

Per locked directive: "only commit with the sota convergence, deep research first with gpt5.5 also and commit the convergence consensus always".

This W153 F9 fire dispatched V2 (design proposer) + V3 (ADVERSARIAL challenger) in parallel Path P REAL GPT-5.5. Convergence consensus reached BEFORE commit per mandate.

## V3 F8 prescription #4 reviewed adversarially

W153 F8 V3 ADVERSARIAL prescription #4 (verbatim from `docs/wave153-f8-sra-d1d10-audit-2026-05-11.md` Section "V3 V2-MISSED dimensions"): "Add a disabled-plugin cite/discovery index so cached SKILL.md/README material remains searchable without enabling hooks/MCP/commands."

W153 F9 V3 ADVERSARIAL caught V3-F8's OWN prescription as overclaimed (RECURSIVE FM-09):

> "V3 F8 correctly caught passive discovery loss, but jumped from 'preserve searchable cite corpus' to 'add disabled-plugin cite/discovery index'. Current evidence shows cache paths, installed metadata, direct grep, and F7/F8 docs already preserve discovery enough for targeted agents. The real gap is operator instruction, not corpus creation."

This is the 10th consecutive same-arc instance of FM-09 ADVERSARIAL catching V1+V2 missed dimensions. **FM-09 ladder: 19/19 → 20/20 firm.**

## Dispatch (Path P 6-param strict-conform)

| Voice | bg task | Wall-clock | Tokens | Exit | Verdict |
|---|---|---|---|---|---|
| V2 design proposer | `b8bbz2v5q` | ~80s | 108,773 | 0 | APPROVE-DESIGN conf=0.91 (155-LOC MD-table) |
| V3 ADVERSARIAL | `bhiboivh5` | ~110s | 110,596 | 0 | F9-SCOPED-DOWN conf=0.86 (5-10 line pointer) |

Both via Path P 6-param strict-conform per `Z:/claude-sota/.claude/rules/codex-t1-pattern-b-forward-discipline.md` Forward Discipline #1+#2.

## Convergence consensus

| Dimension | V2 proposal | V3 ADVERSARIAL | Resolution |
|---|---|---|---|
| F9 necessity | F9-NEEDED (full MD-table) | F9-SCOPED-DOWN | **SCOPED-DOWN** per FM-09 base rate |
| Format | new `docs/disabled-plugin-cite-index.md` MD-table 22 fields | append minimal cite-pointer to F8/provenance | **Append** (avoids new standalone index per CR-5 bootstrap discipline) |
| Cite extraction | ALL 77 SKILL.md rows | Glob-based discovery via `rg` recipe | **Recipe** (avoids path-drift on plugin cache version bump per FM-20) |
| Estimated LOC | 155 | 5-10 line cite-pointer | **5-10 line** |
| CR-12 disposition | not explicitly classified | **PARTIAL-OVERLAP** (ctx_search + filesystem already partial-cover) | PARTIAL-OVERLAP |

**ACTION CONVERGENCE** (both voices agree F9 needs SOMETHING; V3 ADVERSARIAL refines V2 scope):
- DO NOT create `docs/disabled-plugin-cite-index.md` as new standalone file (V3 prescription #1)
- APPEND minimal cite-pointer to `docs/install-provenance.md` F9 entry (V3 prescription #2)
- INCLUDE: disabled plugin names + current cache glob + `rg` recipe + disable warning + re-enable trigger pointer (V3 prescription #3)
- DEFER auto-regen script to `tmp/` if needed (V3 prescription #4 — gitignored, not committed)

## V3 V2-OVERCLAIMS (4)

1. V2 likely overclaims passive discovery loss requires new index file; filesystem `rg` and Read already find preserved cache
2. V2 likely overclaims CITE-CLASS-CANONICAL if treating install-class plugins as pure reference material (F8 itself warned this is tempting but over-broad)
3. V2 likely over-engineers metadata fields if duplicating `installed_plugins.json` version/path/SHA fields already present
4. V2 likely overclaims SOTA pattern support if based on sibling rules rather than eee bootstrap docs or Anthropic official plugin docs

## V3 V2-UNDERCLAIMS (5)

1. Must explicitly state disabled means NOT runtime-loaded (`.claude/settings.json:527-530` false, while cache remains installed)
2. Must include CR-12 disposition per plugin AND for F9 itself
3. Must include drift policy: regenerate/search current cache, do NOT trust stale copied paths after plugin refresh
4. Must include re-enable triggers already documented in F8
5. Must disclose plugin component classes per Anthropic official plugin docs (plugins = skills + commands + agents + hooks + .mcp.json)

## V3 FM-class recursive risks for F9

1. **FM-09 recursive**: V3 F8 may share abstract-pattern bias by prescribing index when grep recipe solves actual discovery problem
2. **FM-16 phantom-cite-to-disabled-MCP**: ClickHouse cache includes plugin MCP material; index consumers may cite it as active unless marked disabled/cite-only
3. **FM-20 path-drift cascade**: versioned cache paths in `installed_plugins.json` can change on refresh; copied anchors will stale
4. **FM-02 (b)+(c)** low but nonzero: doc-only append can collide with parallel provenance/doc edits
5. **False availability risk**: index improves visibility of unavailable commands/hooks/MCPs and may prompt agents to use `/maker-setup`, Output.ai hooks, or ClickHouse MCP while disabled

## V3 CR-9 install-risks

1. Static cite-anchor drift on plugin cache version bump or marketplace refresh
2. Maintenance burden every disable/re-enable cycle
3. False-positive discovery of disabled capabilities as available runtime tools
4. Duplicate search surface that can disagree with filesystem truth and `installed_plugins.json`
5. New hand-curated doc surface risks CR-5/CR-8 unless tightly tied to existing bootstrap/provenance patterns

## Mia pre-apply on V2+V3 prescriptions

| V2 prescription | Mia probe | Disposition |
|---|---|---|
| Create `docs/disabled-plugin-cite-index.md` (new standalone file) | V3 ADVERSARIAL REJECTED per CR-5 + CR-9 install-risk | **REJECTED — apply V3 SCOPE-DOWN instead** |
| 22 metadata fields | V3 ADVERSARIAL: over-engineered | **REJECTED** |
| ALL 77 SKILL.md rows | V3 ADVERSARIAL: misses path-drift risk + duplicates installed_plugins.json | **REJECTED** |
| Hand-maintained | V3 ADVERSARIAL: maintenance burden | **REJECTED** |
| Hand-curated discovery pattern based on `docs/sota-installed-manifest.md` row-table | V3: existing SOTA-pattern source verified | **APPROVED** as design-research insight but applied via minimal pointer instead |

| V3 prescription | Mia probe | Disposition |
|---|---|---|
| No full MD/JSONL/hybrid index | F9 = NO new standalone file | ✓ APPLIED |
| Append minimal cite-only pointer to existing F8 doc or install-provenance | Append to `docs/install-provenance.md` F9 entry | ✓ APPLIED |
| Include: disabled plugin names + cache glob + `rg` recipe + disable warning + re-enable trigger pointer | Minimal cite-pointer in F9 provenance entry | ✓ APPLIED |
| Auto-regen script gitignored under `tmp/` if desired | Deferred — operator decision | DEFER |

**Mia ladder: n=333 → n=334** (V3 F9 caught V3-F8 self-overclaim — cross-fire propagation defense per FM-20).

## Cardinal-rule conformance

| CR | Status | Evidence |
|---|---|---|
| CR-1 cite trail | ✓ | TIER-1-DIRECT V2+V3 file:line + cite-class lattice disclosed |
| CR-2 Karpathy P1-P4 | ✓ | Think-Before-Coding (V2+V3 dispatched before commit); Simplicity (V3 SCOPE-DOWN over V2 elaborate); Surgical (minimal cite-pointer append); Goal-Driven (V3 prescription operator-mandate met) |
| CR-3 cross-model gate | ✓ FULLY SATISFIED 7th non-Phase-1-bootstrap | V2+V3 BOTH REAL GPT-5.5 via Path P codex CLI v0.130.0 |
| CR-4 research-first | ✓ | RECALL + INVESTIGATE (V2+V3 deep audit) + VERIFY (Mia n=334) before commit |
| CR-5 install-priority | ✓ | F9 minimal pointer appends to existing bootstrap doc (`docs/install-provenance.md`); NO new standalone file |
| CR-6 fresh-from-github | N/A | No install in this fire |
| CR-7 graduated unleash | ✓ | Phase 1 active (bypassPermissions per W82d operator override) |
| CR-8 full-SOTA-content | ✓ | TIER-3-LOCAL-COMPOSITION disclosed; V3 ADVERSARIAL caught V2's potentially-over-engineered design via SOTA-pattern adapter discipline |
| CR-9 install-risk | LOW | doc-only + append-existing; CR-9 sub-rules apply: maintenance burden recognized; path-drift documented in V3 risks |
| CR-10 research-first-then-install | ✓ | V2+V3 deep research before any commit |
| CR-11 META-process | ✓ | META-process audit of META-process F8 (recursive FM-09 application) |
| CR-12 upstream-install-priority | ✓ PARTIAL-OVERLAP per V3 | F9 partial-overlaps with filesystem `rg` + ctx_search existing capabilities |

## Forward direction (post-F9)

| Fire | Purpose |
|---|---|
| F10 | manifest DISABLED-BUT-INSTALLED state update (V2+V3 prescription from F8 + this F9) |
| F11 | ECC sub-category audit (REAL leverage target: 455 SKILL.md / 60,985 chars / ~4× CCBP 15K budget) |
| F12 | ECC localization loader-mechanics probe |
| F13 | ECC-affaan-m commits 51-batch deep-dive |
| F14+ | per-rule SOTA-review + cite-anchor refresh + per-domain deep-dives |
| OPERATOR | CronDelete `9eb2e02a` when convergence reached |

## Verdict files persisted

- `Z:/claude-sota-installed/.claude/state/codex_consult_w153_f9_disabled_cite_index_v2_OUT.txt` (V2 2868 LOC / 108,773 tokens; APPROVE-DESIGN conf=0.91)
- `Z:/claude-sota-installed/.claude/state/codex_consult_w153_f9_disabled_cite_index_v3_adversarial_OUT.txt` (V3 11,621 LOC / 110,596 tokens; F9-SCOPED-DOWN conf=0.86)

## Ladders advance

| Ladder | Before F9 | After F9 |
|---|---|---|
| FM-09 V3 ADVERSARIAL same-arc 100% | 19/19 firm | **20/20 firm** (10th consecutive arc — V3 caught V3-F8 self-overclaim) |
| Mia n= | 333 | **334** (V3-F8 self-overclaim cross-fire catch) |
| Path P n= | 38 | **40** (V2+V3 PARALLEL) |
| Pattern D n= | 38 | **40** |
| CR-3 non-Phase-1-bootstrap | 6 | **7** (W152 F29 + W153 F1+F2+F5+F7+F8+F9) |
| FM-20 path-drift cascade defense | Active | **Triggered** (V3 caught V3-F8 prescription drift across fires) |
| USER-CORRECTION-ACK | 24 | unchanged (no new operator correction this fire) |

## Cite trail

- CR-1 SOTA cites: V2+V3 verdict files at file:line above (cite class: TIER-3-LOCAL-OPERATOR-DERIVED via codex T1 Path P REAL GPT-5.5)
- CR-3 cross-model gate: `Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract` + §"Profile selection rule"
- Path P recipe: `Z:/claude-sota/.claude/rules/codex-t1-pattern-b-forward-discipline.md` Forward Discipline #1+#2
- FM-09 specialization: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §Codex-rescue blind-spot specialization`
- FM-20 path-drift cascade: `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md`
- Mia pre-apply: `Z:/claude-sota/.claude/rules/mia-pre-apply.md`
- CR-5 bootstrap-only files: `Z:/claude-sota-installed/CLAUDE.md` `## Bootstrap-only files` list
- CR-12 lattice: `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-12 §6-class disposition lattice

**Effective cite class**: TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

## Revert path

`git revert <commit-sha>` <30s. No state mutation; cache + settings.json unchanged.
