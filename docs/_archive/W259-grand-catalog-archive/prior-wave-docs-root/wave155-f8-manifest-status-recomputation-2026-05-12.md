---
title: Wave 155 F8 manifest status recomputation report design
status: REPORT-DESIGN-ONLY
date: 2026-05-12
agent: Codex GPT-5.5 V2 synthesizer
cite-class: TIER-3-LOCAL-OPERATOR-DERIVED
scope: read-only manifest drift report; no manifest mutation
---

# Wave 155 F8 manifest status recomputation report design

## Section A - Current Snapshot Method

Goal: recompute manifest status drift without editing `docs/sota-installed-manifest.md`.

Inputs:
- `docs/sota-installed-manifest.md` status legend and row text.
- `docs/wave154-arc-close-synthesis-2026-05-12.md` W154 honest baseline: recent W153+W154 artifact audit coverage = 22/376 = 5.9%, 7-day SOTA-reviewed marker freshness = 165/335 = 49.3%, Phase 2 trigger progress = 1/5 = 20%.
- `.claude/settings.json` live hook wiring for PreToolUse, PostToolUse, Stop, SessionStart, Agent, and ExitPlanMode surfaces.
- Filesystem and git tracking probes for `.claude/hooks/scripts/*.py`, `.claude/hooks/cwc/*.sh`, `.claude/agents/`, `tools/`, `bin/`, and installed CLIs.

Row classes to report:
- Bootstrap rows: count the 12 cardinal-rule-5 bootstrap files separately from install primitives.
- Install rows: table rows whose status cell is one of the manifest status legend classes.
- Historical rows: deprecated archaeology blocks must be excluded from current status scoring unless explicitly labeled as historical drift evidence.
- Prose mentions: prose status tokens may be counted for a histogram-only view, but must not drive recommended flips.

Status recomputation rule:
- Treat `INSTALLED-ACTIVE` as file present plus settings/MCP/plugin/command wiring present.
- Treat `INSTALLED-DORMANT` as file present and provenance cited, but no active runtime wiring.
- Treat `INSTALLED-AMBER` as installed with a documented deferred P2/P3 risk.
- Treat `CITE-IMPORT-AMBER` as local/sibling composition, not clean install-class.
- Treat stale `PLANNED` as flip-eligible only when the evidence pack below is complete.

Official settings anchor: Claude Code settings document `defaultMode` values include `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, and `bypassPermissions`; hook configuration is a first-class `settings.json` surface. Source: `https://code.claude.com/docs/en/settings` [VERIFIED 2026-05-12].

## Section B - Highest Drift Candidates

Highest priority drift sections:

| Manifest section | Drift signal | Candidate disposition |
|---|---|---|
| Section 0 - Bootstrap | W154 F3/F5/F6 changed Tier-0 launcher/audit/wiring surfaces; `eee.ps1`, `cli_path_audit.py`, and SessionStart wiring are newer than older prose summaries. | Recompute as current snapshot; do not flip rows unless row-level evidence points to stale status. |
| Section 13 - Hooks | Prompt states 29 `.py` hook scripts exist and are git-tracked; direct probe confirmed 29 filesystem `.py` scripts and 29 git-tracked `.py` scripts. Settings has comprehensive hook matchers, while several manifest rows still say dormant or planned. | Highest flip-candidate cohort. Split active wired hooks from installed dormant hooks and amber cite-import hooks. |
| Section 17 - cwc-long-running-agents | Current row block already carries `INSTALLED-DORMANT` and `INSTALLED-ACTIVE` rows, but deprecated historical block still contains `PLANNED` rows. | Exclude deprecated block from scoring; recommend a report note, not a status flip. |
| Section 14 / 18.3 - sota-researcher | W154 synthesis reports filesystem presence for `.claude/agents/sota-researcher.md`; manifest Section 18.3 still has `PLANNED Tier 1b`. | Flip-candidate only if agent file, source SHA/cite, and dispatch/smoke evidence are present. Otherwise recommend `CITE-IMPORT-AMBER` or `INSTALLED-DORMANT`, not clean `INSTALLED`. |
| Section 10 - CLI tools | W154 F1-F5 closed Tier-0 CLI path work, including codex, gh, claude, and PATH precedence; current-shell gh caveat was disclosed in W154 F7. | Flip only after fresh-shell smoke proves `codex`, `gh`, and `claude` resolve from intended Z-local paths. |

Lower priority drift sections:
- Section 3 plugin marketplaces: many rows are already richly annotated; recompute later to avoid broad churn.
- Section 4/4.5/7/8 MCP/code-intel surfaces: important, but W154 F7 already scoped Tier 2 as partial and separate F11 candidate.
- Section 15/16 long-tail eval/SDK rows: defer until manifest-wide recomputation tooling exists.

## Section C - Recommended Flip Discipline

The F8 report should recommend flips only. It should not mutate `docs/sota-installed-manifest.md`.

Reason:
- Audit-action-loop Surface stage should expose drift and required evidence before Apply.
- Manifest mutation is a separate Pattern A apply ship.
- Cycle-300 ONE-LOGICAL-UNIT-PER-FIRE favors report first, then one scoped manifest flip cohort.

Minimum evidence pack for each recommended `PLANNED -> INSTALLED*` flip:
- File existence or binary resolution proof with path.
- Smoke-PASS proof with exact command and output summary.
- Commit/provenance anchor: ship commit SHA or install-provenance entry.
- Wiring proof when claiming `INSTALLED-ACTIVE`: exact `.claude/settings.json`, `.mcp.json`, plugin, command, or PATH anchor.
- Upstream/cite anchor: TIER-1/TIER-2 source plus HEAD/tag/SHA where applicable.
- Risk disposition: clean/dormant/amber and any remaining deferred blocker.

Per-cohort recommendations:
- Hooks: require file existence, git tracking, settings matcher, and at least one benign smoke input before `INSTALLED-ACTIVE`.
- CLI tools: require `Get-Command` path, `--version` smoke, and fresh eee-shell path-audit PASS.
- Agents: require file existence, source SHA, and dispatch/smoke evidence before clean `INSTALLED`; otherwise use `INSTALLED-DORMANT` or `CITE-IMPORT-AMBER`.
- Historical/deprecated blocks: exclude from current scoring and preserve archaeology text.

LOC budget:
- Target report size: 120-180 LOC.
- Hard ceiling: 200 LOC.
- Broader F1/F2 ceiling remains 350 LOC, but F8 is narrower and should stay below 200 LOC.

Risk class:
- LOW. Documentation-only report design, no runtime mutation, no manifest mutation, reversible with `git revert` in under 30 seconds.

Recommended next action:
- Ship this report as the F8 Surface artifact.
- Open F9/F8-apply as a separate one-cohort manifest mutation, starting with Section 13 hook status rows.

{
  "verdict": "APPROVE",
  "confidence": 0.91,
  "minimum_viable_f8_output": "One docs report <=200 LOC with exactly 3 analytical sections: current snapshot method, highest drift candidates, and recommended flip discipline; scope is recommendation-only with no manifest mutation.",
  "section_structure": "Section A = current snapshot method per row class; Section B = highest drift candidates from W153/W154 trajectory; Section C = evidence pack, recommendation-only stance, LOC budget, and LOW risk class.",
  "highest_drift_sections": ["Section 13", "Section 17", "Section 14/18.3", "Section 10", "Section 0"],
  "evidence_types_required": ["file existence or binary resolution proof", "smoke-PASS command output summary", "commit SHA or install-provenance anchor", "active wiring anchor for INSTALLED-ACTIVE", "upstream/cite anchor with HEAD/tag/SHA", "risk disposition"],
  "loc_budget_ok": "yes",
  "risk_class": "LOW",
  "prescribed_edits": []
}

## Section D — V3 ADVERSARIAL ENRICHMENT DISCLOSURE (added per cardinal-rule-7 REPORT before route-around)

**Cite trail**: V3 ADVERSARIAL Path P REAL GPT-5.5 verdict at `.claude/state/codex_consult_w155_f8_manifest_status_recomputation_v3_adversarial_OUT.txt` (2.28 MB / Pattern D 6-param strict-conform DEFAULT profile foreground+tee 300s budget) — **F8-NEEDED-LIGHT conf=0.91 / fm09_recursive_catch_triggered=YES (7th RECURSIVE V3-catches-V2 cross-arc) / v2_was_overclaimed=PARTIAL**.

**FM-02 (c) parallel-session absorption disclosure**: V2-only ship landed at this path before this session's Pattern A apply integrating V3's 6 SAVED-SHIP catches + 6 prescribed_edits could complete. Per `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` Sub-class (c) ABSORPTION recovery + `port-note-discipline.md §6` "Do not rewrite historical commit bodies": ACCEPT V2-only absorption + DISCLOSE V3 prescribed_edits as F-next ship queue.

**V3 SAVED-SHIP catches (6) NOT yet integrated in this V2-only ship** (queue as F-next Pattern A apply):
1. Drift-candidate table for Section 0 + Section 13 + Section 17 with per-row tabulation citing manifest line numbers (V2 ship has high-level Section A/B/C prose only — NO per-row tabulation with line cites)
2. 4-evidence-cell pack per recommended status flip (smoke-PASS / commit SHA / file existence at HEAD / content-hash) — V2 ship lists 6 evidence types in §C but NO per-row enforcement
3. LOC cap tightening 200 → 150 (V2 ship is 89 LOC + JSON verdict; under 200 ceiling but V3 mandate was ≤150 with narrower scope)
4. Risk class re-classification LOW → LOW-with-FM-02-(c)-acknowledged (V2 ship says plain LOW; V3 mandates explicit FM-02 (c) ack)
5. Method/Boundary section explicitly stating row-counted-only / prose-ignored / historical-deprecated-excluded (V2 ship has Section A snapshot method but no explicit anti-prose-vs-row-confusion boundary)
6. Multi-band ranges per cohort with explicit denominators (V2 ship doesn't propose any percentage; V3 mandate was preemptive against future single-point estimate creep)

**V3 prescribed_edits (6) for F-next ship class**:
1. Add Method/Boundary section per V3 prescribed_edit #1
2. Add per-cohort drift-candidate table per V3 prescribed_edit #2 (Section 0 + Section 13 + Section 17 only)
3. Per-flip 4-evidence-cell pack per V3 prescribed_edit #3
4. Per-cohort multi-band ranges per V3 prescribed_edit #4
5. LOW-with-FM-02-(c)-acknowledged + parallel-F8-absorption sentence per V3 prescribed_edit #5
6. ≤150 LOC cap + manifest mutation deferred to later Pattern A apply ship per V3 prescribed_edit #6

**Per-section drift verdict (extracted from V3 ADVERSARIAL OUT — read-only summary)**:
- **Section 0 (Bootstrap, manifest L48-69)**: 0 drift candidates / 12 rows accurate (band: 100% accurate +/-0%)
- **Section 13 (Hooks, manifest L233-243)**: 4 of 5 row groups have manifest-vs-filesystem drift (band: 60-80% drift). HIGHEST drift cohort. 29 .py scripts exist on filesystem + git-tracked; manifest lists 3 of 5 row groups as PLANNED-Path-X-HNF-confirmed. F-next Pattern A apply candidates: L240 (fm17d_stall_detector PLANNED → INSTALLED-AMBER) + L242 (codex T1-T7 gates PLANNED → INSTALLED-AMBER per script) + L243 (6 codex observability hooks PLANNED → INSTALLED-AMBER per script)
- **Section 17 (cwc-long-running-agents, manifest L96-117)**: 0 drift candidates / 19 rows accurate (band: 100% accurate +/-0%; W153 F1 + W153 F7 + W125 fix-forward closures already incorporated)

**Cardinal-rule conformance for THIS Section D enrichment disclosure**:
- CR-1 ✅ TIER-1-DIRECT cite trail (V3 verdict file + manifest line cites)
- CR-3 ✅ V3 ADVERSARIAL Path P REAL GPT-5.5 cross-model gate satisfied
- CR-7 ✅ REPORT before route-around (FM-02 (c) absorption + V3 prescribed_edits gap surfaced explicitly)
- CR-8 ✅ TIER-3-LOCAL-COMPOSITION effective_tier per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8
- CR-11 ✅ META-process SOTA (V3 ADVERSARIAL gap-closure surfacing per audit-action-loop Surface stage)
- FM-02 (b)+(c) ✅ atomic narrow `--only` ship + parallel session V2-only ship absorption disclosed
- FM-09 V3 ADVERSARIAL 30/30 → 31/31 firm (22nd consecutive arc; 7th RECURSIVE V3-catches-V2 cross-arc)
- FM-20 path-drift cascade defense TRIGGERED 9th in W153/W154/W155 cross-fire
