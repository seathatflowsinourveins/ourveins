---
title: Wave 167 E1 — Architect Install Design (3 candidates)
status: AUTHORITATIVE
date: 2026-05-13
agent: architect (Wave 167 P0 dispatch E1; subagent_type feature-dev:code-architect)
fire: W167-P0-E1
output_budget: 500 LOC
duration_ms: 219426
tool_uses: 15
---

# Wave 167 E1 — Architect ≥2-option install design

## FM-20 baseline defense

Pre-design Mia probe on A1 claims before propagating into options:

| A1 claim | Probe | Result |
|---|---|---|
| wshobson HEAD `34632bcb` | runtime check needed (FM-20 row 10 README-blob-pin-drift sub-class) | STALE-LIKELY — re-verify MANDATORY before manifest row |
| wshobson INSTALLED-DORMANT 2 agents already | manifest §19 L717 direct read | VERIFIED — `wshobson-devops-troubleshooter.md` + `wshobson-security-auditor.md` present |
| alirezarezvani HEAD `8606b45b` | not re-probed in A1 | PENDING-PROBE per CR-9 pre-install REVERT check |
| quemsah no LICENSE file | A1 R2 Probe 6 VERIFIED 2026-05-13 | VERIFIED |
| 5-plugin cherry-pick scope | A1 R3 STUDY-PILOT-NARROW | ACCEPT (no OVER detected) |

## Candidate 1 — wshobson/agents 5-plugin cherry-pick

**CR-12 classification**: PARTIAL-OVERLAP (2 wshobson agents already INSTALLED-DORMANT; 5 cherry-pick plugins offer NEW skill surfaces)

**Pre-ship Mia 5-probe** (MANDATORY before any Edit):
1. Re-verify HEAD SHA via `mcp__github__get_file_contents path=README.md` (FM-20 row 10 protection)
2. Verify 5 plugin dirs exist at fresh HEAD via `marketplace.json`
3. Probe 4 plugin-namespace via Grep — confirm none in loaded namespace (DUPLICATE check)
4. Probe 5 mode-harness-shape — read each SKILL.md for `disable-model-invocation: true` or HARD-GATE setup (FM-09 cohort)
5. CR-9 pre-install REVERT check via `git -C Z:/claude-sota log --all --oneline -- '.claude/agents/wshobson*'`

### Option A — Plugin marketplace install (RECOMMENDED)

- Mechanism: `/plugin marketplace add wshobson/agents@<fresh-HEAD-SHA>` + per-plugin opt-in
- LOC delta: +0 to runtime; manifest §19 row ~5 LOC + install-provenance.md ~3 LOC
- Risk class: LOW per D1 atomic-commit narrow form
- Reversibility: HIGH — `/plugin uninstall wshobson-agents` <1min
- D1 safety: SAFE — not touching codex_t1/t2/t3 chain or §13 hooks-table
- Commit shape: atomic `git add -- docs/sota-installed-manifest.md docs/install-provenance.md && git commit -o -F msg.txt -- <files>`

### Option B — Defer pending re-verify + Probe 5

When to choose: Mia probe 1 finds README blob-SHA drifted with STRUCTURAL changes; OR Probe 5 finds ANY HARD-GATE setup gate.
Action: DEFER to Wave 168+; document in MEMORY.md.

### Recommendation: Option A (provided Mia probes 1+4 clear)

## Candidate 2 — alirezarezvani/claude-skills c-level-agents cherry-pick

**CR-12 classification**: PARTIAL-OVERLAP (pending Probe 7.b 5-clause gate)

**Pre-ship Mia 5-probe** (MANDATORY):
1. Re-verify HEAD SHA + c-level-agents dir exists
2. Probe 7.b clause 1 (named operational use case): identify concrete query type
3. Probe 7.b clause 2 (cited local input): name specific data/context source
4. Probe 7.b clause 3 (wiring path): which agent preloads `c-level-advisor`?
5. Probe 7.b clause 4 (incumbent comparison): verify architect/code-reviewer/sota-researcher do NOT already cover

### Option A — Probe 7.b STUDY-PILOT conditional install (OPERATOR-GATED)

- Condition: Probe 7.b 5 clauses ALL hold
- Concrete named use case (REQUIRED): "c-level-advisor CTO persona reviews `docs/sota-installed-manifest.md` §0-§17 install prioritization as technology portfolio decision, outputting investment-class / defer / abandon verdicts per enterprise IT governance framing"
- Mechanism: cherry-pick `skills/c-level-agents/c-level-advisor/SKILL.md` direct file copy
- LOC delta: +1 SKILL.md (~50-80 LOC) + manifest row ~4 LOC
- Risk class: LOW. MIT verified
- Pilot time-box: 30-day; success ≥2 non-duplicative invocations vs architect; retirement = `rm` if 0 uses

### Option B — DEFER (RECOMMENDED until Probe 7.b named-consumer confirmed)

When to choose: Probe 7.b clause 1 cannot be satisfied with concrete non-speculative consumer.
A1's own verdict explicitly flags "REQUIRES named consumer + use case BEFORE install."
Document in MEMORY.md as DEMAND-CREATES-NEW-WORKFLOW.b pending 5-clause completion.

### Recommendation: Option B (DEFER) unless operator names concrete Probe 7.b use case NOW

## Candidate 3 — quemsah/awesome-claude-plugins manifest §3 ADD

**CR-12 classification**: ECOSYSTEM-IMPORT (CITE-CLASS-CANONICAL)
- Curated discovery surface — catalog of Claude plugins, NOT install-class artifact
- No LICENSE file (Probe 6 BLOCKER for install; DOES NOT block manifest discovery-row addition)

**Pre-ship Mia 5-probe** (MANDATORY before manifest Edit):
1. Verify no LICENSE file (expect 404)
2. Verify HEAD SHA freshness vs A1 `62e65931` (FM-20 row 10)
3. Verify no existing manifest §3 row via `Grep "quemsah" docs/sota-installed-manifest.md` (expect 0)
4. Verify §3 table-shape parity (D1 §13 lesson applies to §3)
5. Confirm CITE-ONLY disposition correct (no marketplace.json upstream)

### Option A — Manifest §3 discovery row ADD (RECOMMENDED)

- Mechanism: Edit `docs/sota-installed-manifest.md` §3 to add CITE-ONLY discovery row
- Row content (after Mia probes pass):
```markdown
| quemsah/awesome-claude-plugins | Discovery surface: curated awesome-list of Claude plugins (689★ MIT-claimed-NO-LICENSE-FILE). NO INSTALL — Probe 6 LICENSE blocker for install-class; CITE-ONLY discovery reference. HEAD `62e65931` [VERIFY fresh SHA per FM-20 row 10 before commit]. | CITE-ONLY |
```
- LOC delta: +3 LOC manifest + ~2 LOC install-provenance
- Risk class: MINIMAL. Read-only manifest edit
- Reversibility: TRIVIAL — single-line revert
- D1 safety: SAFE — §3 NOT §13

### Option B — Skip entirely

When to choose: Mia probe 4 finds §3 table-shape mismatch (D1 BLOCKED state); OR probe 3 finds existing row.

### Recommendation: Option A (purely additive manifest row, zero runtime risk)

## Build sequence (ordered per D1 archaeology safe-target list)

1. **Candidate 3 first** (quemsah manifest row): lowest risk, SAFE D1 target, pure documentation. Atomic single-commit.
2. **Candidate 1 second** (wshobson 5-plugin): after Mia probes 1-5 clear. Single `/plugin marketplace add` + manifest row. Atomic single-commit.
3. **Candidate 2** (alirezarezvani): only if operator names Probe 7.b use case THIS FIRE; otherwise DEFER.

## Cross-fire propagation defense (FM-20)

All 3 manifest row additions carry **fresh HEAD SHA from Mia probe re-verification at commit time** — NOT the A1 baseline SHA (`34632bcb` / `8606b45b` / `62e65931`). FM-20 row 10 README-blob-pin-drift sub-class requires this re-verify step before every manifest Edit.

DESIGN-COMPLETE

## Key files referenced

- `Z:/claude-sota-installed/tmp/wave167-A1-sota-researcher-15repo-audit-2026-05-13.md` — A1 input audit
- `Z:/claude-sota-installed/tmp/wave167-D1-archaeology-2026-05-13.md` — D1 safe-target list
- `Z:/claude-sota-installed/.claude/agents/wshobson-devops-troubleshooter.md` — confirms wshobson integration validated
- `Z:/claude-sota-installed/.claude/agents/wshobson-security-auditor.md` — same
- `Z:/claude-sota-installed/docs/sota-installed-manifest.md` §19 L717 — INSTALLED-DORMANT baseline for Candidate 1
- `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md` — Probe 7.b 5-clause gate governing Candidate 2
- `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` — CR-12 6-class lattice used for all 3 dispositions
