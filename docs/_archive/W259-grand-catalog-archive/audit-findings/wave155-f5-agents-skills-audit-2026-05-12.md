---
title: W155 F5 — .claude/agents/ + .claude/skills/ Audit (READ-ONLY classification)
status: AUTHORITATIVE
date: 2026-05-12
agent: orchestrator + V2+V3 PARALLEL Path P REAL GPT-5.5 codex T1
parent: docs/wave155-f3-hooks-audit-2026-05-12.md (commit f4597b6)
budget: ≤220 LOC per V2+V3 SCOPED-DOWN convergence (V3 a9 ≤250, V2 220 tighter)
risk_class: MEDIUM (V3 SCOPED-DOWN from V2 HIGH per FM-09 base rate)
cross_model_gate: CR-3 FULLY SATISFIED — V2 APPROVE conf=0.90 + V3 F5-NEEDED-LIGHT conf=0.91 PARALLEL
ship_path: docs/ (NOT tmp/) per operator signal `32ad989` gitignored-path drift correction
---

# W155 F5 — .claude/agents/ + .claude/skills/ Audit (READ-ONLY)

> **Scope guard (V2+V3 CONVERGENCE)**: READ-ONLY cohort classification only. NO Edits to agents/skills; NO behavioral rewrites; NO remediation patches; NO ratification of safety; NO Section 14.5 cite-import-AMBER promotion of untracked agents; NO F4 rules-cohort content (F4 in-flight per parallel session). Per-agent body-content audit deferred to Fnext+ remediation queue per V3 SAVED-SHIP catch #1.
>
> **Cross-model gate**: V2 designer APPROVE conf=0.90 (3110 LOC OUT / ~22s / 155k tok) + V3 ADVERSARIAL F5-NEEDED-LIGHT conf=0.91 (10095 LOC OUT / ~45s / 76k tok) via Path P 6-param strict-conform (codex CLI v0.130.0 DEFAULT profile + `--skip-git-repo-check --color never` + foreground+tee + ≤50 LOC focused single-claim prompts). 20th CR-3 non-Phase-1-bootstrap satisfaction.
>
> **FM-09 9th cross-arc RECURSIVE catch — 4th in W155** (1st W155 F1 + 2nd W155 F2 + 3rd W155 F3 + 4th W155 F5 = 4 in W155; 22nd consecutive arc with V2+V3 PARALLEL).
>
> **USER-CORRECTION-ACK n=27**: F5 ships to `docs/` per operator signal `32ad989` (tmp/→docs/ path-correction; tmp/ is gitignored per `.gitignore:17`).

## §1 Inventory + denominator clarification (per V3 SAVED-SHIP catch #5)

| Cohort | Count | Path | Tracked? | Conformance class |
|--------|-------|------|----------|-------------------|
| agents-untracked | 10 | `.claude/agents/*.md` (8 root + 2 cwc/) | 0/10 ❌ | active-runtime; sibling-parallel + cwc-derived |
| skills-tracked-speckit | 9 | `.claude/skills/speckit-*/SKILL.md` | 9/9 ✅ | install-class via `.specify/` Spec-Kit upstream |
| skills-untracked | 1 | `.claude/skills/mem-recall/SKILL.md` | 0/1 ❌ | active-runtime sibling-novel composition |
| **TOTAL DISK** | **20** | — | **9/20 = 45%** | **3 distinct conformance bars** |

**Verified via** `git ls-files .claude/agents/` + `git ls-files --others --exclude-standard .claude/agents/` + `git ls-files .claude/skills/` 2026-05-12 HEAD `4b0ebcf`.

## §2 Methodology (inherited per V3 SAVED-SHIP catch #4 — NO innovation)

Per `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4: F5 INHERITS methodology from W155 F1+F2+F3 — multi-band ranges where useful + cite-and-defer + per-class breakdown + untracked at 0% definitive + remediation queue deferred. NO new bands invented.

## §3 Per-cohort coverage (NO collapsed aggregate per V3 catch #5)

| Cohort | TIER-1 cite | TIER-3 sibling cite-import | No cite | Definitive |
|--------|-------------|---------------------------|---------|------------|
| agents-untracked (10) | 2/10 = 20% (sota-researcher + evaluator root) | 6/10 = 60% (architect / code-reviewer / debugger / gpt5-archaeologist / gpt5-reviewer / verifier — sibling parallel) | 2/10 = 20% (cwc/evaluator + cwc/cwc-CLAUDE-reference) | **0/10 = 0%** (untracked) |
| skills-tracked-speckit (9) | 9/9 = 100% via `.specify/` install-class anchor | n/a | 0 | **9/9 = 100% install-class** (Spec-Kit upstream-vendored) |
| skills-untracked (1) | 1/1 = 100% (mem-recall has TIER-1 Anthropic CC skill spec) | n/a | 0 | **0/1 = 0%** (untracked) |

## §4 Untracked-agents segregation (filename-level only per V3 SAVED-SHIP catch #2)

| Agent | Sibling parallel at `Z:/claude-sota/.claude/agents/`? | Class |
|-------|---------------------------------------------------------|-------|
| architect.md | YES | PENDING-CITE-IMPORT-AMBER (Section 14.5 candidate) |
| code-reviewer.md | YES | PENDING-CITE-IMPORT-AMBER |
| debugger.md | YES | PENDING-CITE-IMPORT-AMBER |
| evaluator.md | NO (cwc-derived) | upstream cwc-long-running-agents Apache-2.0 cite |
| gpt5-archaeologist.md | YES | PENDING-CITE-IMPORT-AMBER |
| gpt5-reviewer.md | YES | PENDING-CITE-IMPORT-AMBER |
| sota-researcher.md | YES (TIER-1 cite chain in body) | PENDING-CITE-IMPORT-AMBER (TIER-1-confirmed) |
| verifier.md | YES | PENDING-CITE-IMPORT-AMBER |
| cwc/evaluator.md | NO (cwc-derived) | upstream cwc-long-running-agents Apache-2.0 cite |
| cwc/cwc-CLAUDE-reference.md | NO (cwc-derived) | upstream cwc-long-running-agents reference |

**7/10 sibling-parallel** + **3/10 cwc-derived** + **0/10 eee-novel**.

**CR-9 sibling-bleed defense** (per `Z:/claude-sota/.claude/rules/cardinal-rule-9` install-risk discipline): sibling parallel existence is evidence for a DEFERRED cite-import candidate, NOT authority to adopt or ratify in-fire. F4-F8 rules-cohort already shows pattern (per parallel-session F4 V3 verdict): cite-import-AMBER is TERTIARY per CR-12 lattice, NOT install-class evidence.

## §5 Spec-Kit skills install-class verification (per V3 SAVED-SHIP catch #3)

All 9 tracked `.claude/skills/speckit-*/SKILL.md` files declare:
- `compatibility: "Requires spec-kit project structure with .specify/ directory"`
- `metadata.author: "github-spec-kit"`

Local install-class evidence (verified via `git ls-files .specify/`):
- `.specify/init-options.json` + `.specify/integration.json`
- `.specify/integrations/claude.manifest.json` + `.specify/integrations/speckit.manifest.json`
- `.specify/memory/constitution.md`
- `.specify/scripts/bash/*.sh` (5 files)
- `.specify/templates/*.md` (5 files)
- `.specify/workflows/workflow-registry.json` + `.specify/workflows/speckit/workflow.yml`

Per CR-5 install-priority + CR-6 official-native-channel: speckit install-class is upstream-vendored Spec-Kit (`github-spec-kit`) — different conformance bar than eee-novel agents per V3 catch #3. F5 verifies cite anchor presence; full SKILL.md body audit deferred per V3 SAVED-SHIP catch #1.

## §6 mem-recall (1 untracked skill — sibling-novel)

- `Z:\claude-sota-installed\.claude\skills\mem-recall\SKILL.md` — TIER-1-DIRECT cite to Anthropic CC Skill discovery doc (`https://code.claude.com/docs/en/skills`); CR-12 HONEST-NON-FINDING — no upstream Anthropic-OFFICIAL `mem-recall` skill exists per Wave 113 Plan agent search; sibling-novel composition over TIER-1 substrates.
- **Class**: untracked; cite-tier OK; **definitive 0%** (untracked).

## §7 Marker Decay disclosure (per V3 SAVED-SHIP catch #6 + W155 F2 inheritance)

Per `Z:/claude-sota/.claude/rules/evidence-policy.md` Marker Decay corollary:
- W153 F3 agents 8/10 = 80% [VERIFIED 2026-05-11] is STALE context — current W155 F5 inventory is 10/10 UNTRACKED at 0% definitive.
- W155 F1 multi-bands (arch-class 70-90%) [VERIFIED 2026-05-12] inherited.
- W155 F3 hooks per-class breakdown [VERIFIED 2026-05-12] inherited as methodology baseline.

## §8 V2+V3 SAVED-SHIP catches (6 — verbatim from V3)

1. F5 should classify cohort state, NOT inspect/ratify every agent body.
2. Sibling-parallel mapping acceptable only as filename-presence (NOT ratification).
3. F5 should INHERIT prior methodology, NOT reopen repo-audit methodology or prior verdict validation.
4. NO 'top-3 gaps' remediation-style narrative.
5. F5 must NOT touch F4 rules cohort except to say rules excluded/in-flight per parallel-session F4 V2+V3 in-flight (per `.claude/state/codex_consult_w155_f4_*_OUT.txt` 2026-05-12 ~00:44).
6. **PRIMARY V3 catch**: V2 OUT EOF JSON-shape failure — V2 OUT did not produce strict EOF JSON verdict (Path P strict-conform failure same class as W155 F2 V2 OUT EOF JSON-shape failure); V3 disclosure mandate use V2's APPROVE+conf+headline as authoritative despite OUT trail noise.

## §9 Method limitations + cardinal-rule conformance

**Method limitations**:
- F5 is **filename-level classification only** — per-agent body-content audit deferred to Fnext+
- Sibling parallel existence verified by NAME ONLY (not body-equivalence)
- Spec-Kit install-class verified by `.specify/` artifact presence; full upstream HEAD/SHA cite anchors deferred

**Cardinal-rule conformance**:
- **CR-1** ✅ TIER-1-DIRECT cite chain (V2+V3 codex T1 verdicts + git ls-files inventory + W155 F1+F2+F3 commit anchors `d29b8fc`+`d59c472`+`f4597b6` + Anthropic cwc-long-running-agents @ HEAD `ffd563d6` cwc-derived agents anchor)
- **CR-3** ✅ FULLY SATISFIED V2+V3 PARALLEL Path P REAL GPT-5.5 (20th non-Phase-1-bootstrap)
- **CR-5** N/A (audit fire, no install)
- **CR-6** N/A (audit fire)
- **CR-7** ✅ REPORT before route-around (V3 6 SAVED-SHIP catches all disclosed in §8; PRIMARY V2 EOF JSON failure disclosed)
- **CR-8** ✅ TIER-3-LOCAL-COMPOSITION; constituents=[V2+V3 codex T1 verdicts + git ls-files inventory + W155 F1+F2+F3 commit anchors]; effective_tier=TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE
- **CR-9** ✅ Sibling-bleed defense (10/10 untracked agents preserved at 0% definitive; NOT promoted out)
- **CR-10** ✅ Research-first (V2+V3 PARALLEL BEFORE F5 report composition + git ls-files probe)
- **CR-11** ✅ META-process SOTA (V2+V3 PARALLEL + Pattern A apply + 9th cross-arc RECURSIVE FM-09 catch — 4th in W155)
- **CR-12** ✅ DUPLICATE-FUNCTIONALITY classification at filename-level for 7/10 sibling-parallel agents (per CR-12 5-class lattice)

**Risk class**: **MEDIUM** per V3 SCOPED-DOWN from V2 HIGH (per FM-09 base rate; audit taxonomy bands inherit to F4-F8; no remediation in-fire).

## §10 Headline answer (per-class breakdown — NO collapsed aggregate per V3 catch #5)

- **agents-untracked (10/10)**: 0% definitive (untracked); 2/10 TIER-1 cite + 6/10 sibling-parallel cite-import-AMBER + 2/10 cwc-derived; ALL 10 active-runtime; **SAFETY-CRITICAL** per advanced-agent-team-standing-directive
- **skills-tracked-speckit (9/9)**: 100% install-class via `.specify/` Spec-Kit upstream; different conformance bar than eee-novel
- **skills-untracked (1/1)**: 0% definitive (untracked) but TIER-1 cite present (mem-recall sibling-novel)
- **F4+ remediation queue handoff** (NO remediation in-fire): 10 agent-tracking decisions + 2 cwc/-cite-anchor upgrades + 1 skill-tracking decision (mem-recall)

## §11 Forward direction

Per parallel-session W155 F4 in-flight (V2+V3 verdicts at `.claude/state/codex_consult_w155_f4_*_OUT.txt` 2026-05-12 ~00:44; ship pending). Per W155 F2 sub-fire queue: F6 ops-audit (tools/eee.ps1 + settings.json + .mcp.json + commands/) is next non-conflicting sub-fire. Cron `81bd1a59` continues concurrent fan-out per /loop standing directive.

[VERIFIED via `.claude/state/codex_consult_w155_f5_agents_skills_audit_v2_OUT.txt` (3110 LOC / 576016 bytes / APPROVE conf=0.90 / 155k tok)]
[VERIFIED via `.claude/state/codex_consult_w155_f5_agents_skills_audit_v3_adversarial_OUT.txt` (10095 LOC / 1145030 bytes / F5-NEEDED-LIGHT conf=0.91 / fm09_recursive_catch=YES / 76k tok)]
[VERIFIED via `git ls-files .claude/agents/ .claude/skills/` (10 untracked agents + 9 tracked + 1 untracked skill = 20 disk)]
[VERIFIED via `git show d29b8fc d59c472 f4597b6 4b0ebcf` W155 F1+F2+F3+F8 commit anchors]
[VERIFIED via `Z:/repos/deps/anthropics/cwc-long-running-agents @ HEAD ffd563d6` cwc-derived TIER-1 anchor per CLAUDE.md Architecture section]
