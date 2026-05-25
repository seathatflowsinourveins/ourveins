---
title: Wave 129 Agent B — Untracked file discovery + missing-rule cite verification
status: AUTHORITATIVE
date: 2026-05-09
agent: Agent B (Opus 4.7)
wave: 129
fire: 1
---

# Wave 129 Agent B — Untracked discovery + missing-rule investigation

## Verdict one-line

**DONE_WITH_CONCERNS**: 79 untracked classified into 7 ship batches. Wave 128 ERROR-3 was Mia OVER — both `launch-discipline.md` + `deprecation-discipline.md` ARE present in eee at `.claude/rules/` (untracked), cite TIER-1-DIRECT to addyosmani/agent-skills upstream marketplace. NOT a sibling-cite-import; NOVEL eee-only rules.

## DELIVERABLE 1 — Untracked file SHIP MATRIX (79 files)

### Shape summary

| Source path class | Count | Sibling parity | Disposition class |
|---|---|---|---|
| `.claude/rules/*.md` | 36 | 33 DIFF + 3 NOVEL + 0 SAME | Batch 1 (cite-class verify required) |
| `.claude/agents/*.md` | 9 | 7 DIFF + 1 NOVEL + 0 SAME | Batch 2 (cite-class verify required) |
| `.claude/skills/` (subdirs only) | 2 | (learned/, mem-recall/) | Batch 3 |
| `.claude/hooks/scripts/*.py` (untracked) | 2 | DIFF (eee newer/larger) | Batch 4 |
| `.claude/hooks/scripts/cwc/*.sh` | 6 | NOVEL (cwc dir absent in sibling) | Batch 4 |
| `.claude/hooks/context-mode-cache-heal.mjs` | 1 | NOVEL | Batch 4 |
| `docs/*.md` | 7 | All NOVEL | Batch 5 |
| `lefthook.yml` | 1 | n/a (template skeleton) | Batch 6 (DEFER/DELETE) |
| Backup files (`.pre-fire*-fix` + `*-backup.*`) | 4 | n/a (operator backups) | Batch 7 (DELETE - .gitignore) |
| Cache/state dirs (`.claude/cache-fix-state/`, `.claude/quota-status/`, `.claude/session-data/`, `.claude/session-env/`, `.claude/shell-snapshots/`, `.bun/`, `.ccs/`, `.lbdb/`, `.local/`, `.promptfoo/`, `.ssh/`, `.tmp-gitleaks-test/`, `pipx/`, `__pycache__/`) | 14 | n/a | Batch 7 (DEFER - .gitignore) |
| Misc loose (`.claude.json`, `.claude/.last-cleanup`, `.claude/mcp-needs-auth-cache.json`, `.claude/plugins/install-counts-cache.json`, `.claude/scheduled_tasks.lock`, `.claude/settings.local.json`, `t`) | 7 | n/a | Batch 7 (DEFER/DELETE) |
| **TOTAL** | **89 entries** (counts files + dirs from git status `??` lines) | | |

### Batch 1 — `.claude/rules/*.md` (36 files; HIGHEST PRIORITY)

| File | EEE size | SIB size | Classification | Disposition |
|---|---|---|---|---|
| **NOVEL eee-only (3)** — recommend COMMIT-AS-IS as cite-class TIER-1-DIRECT to upstream marketplace | | | | |
| deprecation-discipline.md | 9702 | NOT-IN-SIB | NOVEL — Wave 82w codification, cite addyosmani/agent-skills:deprecation-and-migration:10-12 @ 742dca5 | COMMIT-AS-IS (Wave 82x reframed cite-class) |
| launch-discipline.md | 11122 | NOT-IN-SIB | NOVEL — Wave 82w codification, cite addyosmani/agent-skills:shipping-and-launch:10 @ 742dca5 | COMMIT-AS-IS (Wave 82x reframed cite-class) |
| sota-research-architecture.md | 14582 | NOT-IN-SIB | NOVEL — local research arch design | COMMIT-WITH-CITE-HEADER verify |
| **DIFF eee-newer (33)** — cite-class evolution; require cite-import-AMBER per CR-12 OR cite-class verification | | | | |
| advanced-agent-team-standing-directive.md | 18959 | 18251 | DIFF (+708 bytes) | COMMIT-WITH-CITE-HEADER (verify deltas vs sibling Wave-N codifications) |
| agent-harness-fit-verification.md | 32688 | 32262 | DIFF (+426) | COMMIT-WITH-CITE-HEADER |
| audit-action-loop.md | 19919 | 19072 | DIFF (+847) | COMMIT-WITH-CITE-HEADER |
| canonical.md | 14384 | 13674 | DIFF (+710) | COMMIT-WITH-CITE-HEADER |
| citation-discipline.md | 15158 | 14339 | DIFF (+819) | COMMIT-WITH-CITE-HEADER |
| closed-loop-recursive-narrowing.md | 11678 | 10927 | DIFF (+751) | COMMIT-WITH-CITE-HEADER |
| codex-t1-auto-wedge-recovery.md | 21035 | 20099 | DIFF (+936) | COMMIT-WITH-CITE-HEADER |
| codex-t1-fix-forward-pattern.md | 33146 | 32398 | DIFF (+748) | COMMIT-WITH-CITE-HEADER |
| codex-t1-system-meta-review-fallback.md | 9680 | 7444 | DIFF (+2236, large delta) | COMMIT-WITH-CITE-HEADER (audit large delta) |
| codification-threshold.md | 13030 | 12170 | DIFF (+860) | COMMIT-WITH-CITE-HEADER |
| convergence-gate.md | 17174 | 16738 | DIFF (+436) | COMMIT-WITH-CITE-HEADER |
| coordination.md | 14483 | 13542 | DIFF (+941) | COMMIT-WITH-CITE-HEADER |
| cross-model-consensus.md | 63703 | 63390 | DIFF (+313) | COMMIT-WITH-CITE-HEADER |
| evidence-policy.md | 4488 | 3753 | DIFF (+735) | COMMIT-WITH-CITE-HEADER |
| fm17-subagent-fleet-depletion.md | 36917 | 30171 | DIFF (+6746, FM-17.e codification per Wave 112 Ship F) | COMMIT-WITH-CITE-HEADER |
| fm19-readonly-guard-sidestep.md | 7907 | 7078 | DIFF (+829) | COMMIT-WITH-CITE-HEADER |
| fm20-path-drift-cascade.md | 16888 | 16112 | DIFF (+776) | COMMIT-WITH-CITE-HEADER |
| git-cli-grammar-discipline.md | 14068 | 13246 | DIFF (+822) | COMMIT-WITH-CITE-HEADER |
| karpathy-adapted.md | 33485 | 32739 | DIFF (+746) | COMMIT-WITH-CITE-HEADER |
| kiss-dry-yagni.md | 7826 | 7157 | DIFF (+669) | COMMIT-WITH-CITE-HEADER |
| layered-gates-architecture.md | 41840 | 41154 | DIFF (+686) | COMMIT-WITH-CITE-HEADER |
| mcp-disconnect-recovery.md | 18536 | 17746 | DIFF (+790) | COMMIT-WITH-CITE-HEADER |
| mia-pre-apply.md | 27623 | 23181 | DIFF (+4442, large delta — Wave 112 alternate-install probe codification) | COMMIT-WITH-CITE-HEADER |
| multi-perspective-subagents.md | 6742 | 5989 | DIFF (+753) | COMMIT-WITH-CITE-HEADER |
| named-failure-modes.md | 33850 | 32115 | DIFF (+1735, FM-17.e META-router row added) | COMMIT-WITH-CITE-HEADER |
| parallel-agent-wave.md | 28212 | 27453 | DIFF (+759) | COMMIT-WITH-CITE-HEADER |
| parallel-session-worktree-isolation.md | 33595 | 32860 | DIFF (+735) | COMMIT-WITH-CITE-HEADER |
| parallel-sessions.md | 24947 | 23972 | DIFF (+975) | COMMIT-WITH-CITE-HEADER |
| port-note-discipline.md | 15382 | 14642 | DIFF (+740) | COMMIT-WITH-CITE-HEADER |
| research-protocol.md | 28239 | 27355 | DIFF (+884) | COMMIT-WITH-CITE-HEADER |
| sota-pin-discipline.md | 9309 | 8540 | DIFF (+769) | COMMIT-WITH-CITE-HEADER |
| synthesis-layer-verify.md | 22463 | 21683 | DIFF (+780) | COMMIT-WITH-CITE-HEADER |
| team-orchestration.md | 84306 | 83652 | DIFF (+654) | COMMIT-WITH-CITE-HEADER |

**SIB-ONLY (4 — sibling has rules eee does NOT)**: `codex-cli-flag-positioning.md`, `fm20-stale-wakeup-recognition-subclass.md`, `fm22-stale-gate-vs-current-tree.md`, `security-checklist.md` — DECISION REQUIRED: sib-import these via `cite-import-AMBER` per Section 14.5? OR are they sibling-novel not yet promoted to eee?

**Recommended Batch 1 ship priority**:
1. **Atomic commit batch 1A (3 NOVEL eee-only rules)**: deprecation-discipline.md + launch-discipline.md + sota-research-architecture.md — single commit "feat(rules): add 3 NOVEL eee-only rules per Wave 82w/82x codifications" — TIER-1-DIRECT cites already in file headers
2. **Atomic commit batch 1B (33 DIFF rules)**: all 33 in one commit "feat(rules): refresh sibling-cite-import-AMBER rules to eee-current state" — preserve cite-class verifications via per-file frontmatter (already present)

**ANTI-PATTERN warning**: do NOT bundle Batch 1A + 1B in same commit. 1A is novel content; 1B is cite-import refresh. Keep atomic per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE.

### Batch 2 — `.claude/agents/*.md` (9 agents)

| File | EEE size | SIB size | Classification | Disposition |
|---|---|---|---|---|
| **NOVEL eee-only (1)** | | | | |
| evaluator.md | 1876 | NOT-IN-SIB | NOVEL — likely Wave-N cwc/evaluator.md per CR-3 manifest §17 | COMMIT-AS-IS (verify cite header for cwc-long-running-agents @ ffd563d) |
| **DIFF eee-newer (7)** | | | | |
| architect.md | 9191 | 7366 | DIFF (+1825) | COMMIT-WITH-CITE-HEADER |
| code-reviewer.md | 7539 | 5696 | DIFF (+1843) | COMMIT-WITH-CITE-HEADER |
| debugger.md | 5358 | 3576 | DIFF (+1782) | COMMIT-WITH-CITE-HEADER |
| gpt5-archaeologist.md | 12078 | 10155 | DIFF (+1923) | COMMIT-WITH-CITE-HEADER |
| gpt5-reviewer.md | 18049 | 16135 | DIFF (+1914) | COMMIT-WITH-CITE-HEADER |
| sota-researcher.md | 19235 | 16973 | DIFF (+2262) | COMMIT-WITH-CITE-HEADER |
| verifier.md | 11009 | 9142 | DIFF (+1867) | COMMIT-WITH-CITE-HEADER |

**SIB-ONLY (5 — sibling has agents eee does NOT)**: `codex-rescue.md`, `evolve-gate.md`, `evolve-observer.md`, `silent-failure-hunter.md`, `team-lead.md` — DECISION REQUIRED per CR-12 upstream-parity probe. Note: `codex-rescue.md` is referenced extensively in advanced-agent-team-standing-directive.md as BRIDGE-MODE primary class — its absence from eee is a CR-9 gap.

**Cwc subdirectory** at `.claude/agents/cwc` exists in eee (per ls output) — likely from Section 17 install per manifest. Probe contents on next fire if not yet inventoried.

### Batch 3 — `.claude/skills/` (2 directories only — minimal)

- `learned/` — empty/auto-created
- `mem-recall/` — appears to be the loaded skill (mem-recall is loaded per system reminders)

DEFER inspection — no SKILL.md files at top level; subdirs may carry skill content. Recommend `find Z:/claude-sota-installed/.claude/skills -name SKILL.md` probe on next fire.

### Batch 4 — Hooks (8 untracked: 2 scripts + 6 cwc + 1 mjs)

| File | EEE size | SIB size | Classification | Disposition |
|---|---|---|---|---|
| .claude/hooks/scripts/agent_plan_readonly_bash_guard.py | 48984 | 44974 | DIFF (+4010) | COMMIT (sibling-bleed defense per CR-9 — verify path-rewrite for `Z:/claude-sota-installed/`) |
| .claude/hooks/scripts/safety_guard.py | 16631 | 13949 | DIFF (+2682) | COMMIT (same CR-9 verification) |
| .claude/hooks/context-mode-cache-heal.mjs | 1440 | NOT-IN-SIB | NOVEL (context-mode plugin install) | COMMIT (verify cite to context-mode plugin source) |
| .claude/hooks/scripts/cwc/commit-on-stop-throttled.sh | 2564 | NOT-IN-SIB | NOVEL — cwc-long-running-agents install per CR-3 manifest §17 | COMMIT-AS-IS (cite anchors recorded in `docs/install-provenance.md` Wave 62B) |
| .claude/hooks/scripts/cwc/commit-on-stop.sh | 767 | NOT-IN-SIB | NOVEL — same | COMMIT-AS-IS (per-file blob SHA `282d8f34`) |
| .claude/hooks/scripts/cwc/kill-switch.sh | 400 | NOT-IN-SIB | NOVEL — same | COMMIT-AS-IS (per-file blob SHA `76bc8c58`) |
| .claude/hooks/scripts/cwc/steer.sh | 768 | NOT-IN-SIB | NOVEL — same | COMMIT-AS-IS (per-file blob SHA `2dc453a7`) |
| .claude/hooks/scripts/cwc/track-read.sh | 575 | NOT-IN-SIB | NOVEL — same | COMMIT-AS-IS (per-file blob SHA `f510382f`) |
| .claude/hooks/scripts/cwc/verify-gate.sh | 1359 | NOT-IN-SIB | NOVEL — same | COMMIT-AS-IS (per-file blob SHA `ee8e1131`) |

**Atomic commit batch 4A (cwc hooks)**: 6 cwc/*.sh + .mjs in single commit "feat(hooks): install cwc-long-running-agents 5 primitives + context-mode cache-heal per CR-3 + Section 17 manifest"

**Atomic commit batch 4B (sibling-bleed-defended hook updates)**: agent_plan_readonly_bash_guard.py + safety_guard.py — REQUIRES Mia path-rewrite probe BEFORE commit (CR-9 sibling-bleed defense). DEFER until path-rewrite verified.

### Batch 5 — `docs/*.md` (7 untracked)

All 7 NOVEL eee-only:
- `cliproxy-eee-sota-audit-2026-05-09.md` (19335 bytes, 217 LOC) — Wave 129 audit ship
- `eee-launch-design-cliproxyapi.md` (89694 bytes, 1333 LOC) — large design doc; cite-class verify
- `fm17f-deep-dive-2026-05-09.md` (18281 bytes, 250 LOC) — referenced in CLAUDE.local.md ENV (g) DEPRECATED comment
- `operator-path-setup.md` (3426 bytes, 42 LOC) — already cited in CLAUDE.md SETUP section
- `wave119-next-session-plan.md` (20004 bytes, 283 LOC) — session-plan handoff
- `wave120-next-session-plan.md` (31468 bytes, 408 LOC) — session-plan handoff
- `wave121-next-session-plan.md` (20750 bytes, 278 LOC) — session-plan handoff

**Atomic commit batch 5A (docs cited from CLAUDE.md/CLAUDE.local.md)**: operator-path-setup.md + fm17f-deep-dive-2026-05-09.md — single commit "docs: add operator-path-setup + fm17f deep-dive (cited from CLAUDE.md/CLAUDE.local.md)"

**Atomic commit batch 5B (Wave 129 audit + design docs)**: cliproxy-eee-sota-audit-2026-05-09.md + eee-launch-design-cliproxyapi.md — single commit "docs(wave129): cliproxy/eee SOTA audit + cliproxyapi launch design"

**Atomic commit batch 5C (session plans)**: wave119/120/121-next-session-plan.md — single commit "docs(session): preserve Wave 119-121 session-plan handoff files for cross-session continuity"

### Batch 6 — `lefthook.yml` (template skeleton)

42 LOC Lefthook YAML template skeleton with EXAMPLE USAGE comments + yarn/eslint/rubocop/govet examples. NOT eee-configured.

**Disposition**: DEFER OR DELETE. If eee will use lefthook (per Wave-N install), customize first. Otherwise DELETE per kiss-dry-yagni Must-Never #4 (no speculative scaffolding).

### Batch 7 — Backups + cache/state/loose files (DEFER/DELETE/.gitignore)

**Backup files (4) — recommend DELETE post-confirmation**:
- `.claude/settings.json.pre-fire45-fix` (7324 bytes)
- `tools/eee.ps1.pre-fire46-fix` (17472 bytes)
- `tools/eee-backup.ps1` (21300 bytes)
- `bin/eee-backup.cmd` (974 bytes)

These are operator backups from prior fix-forward fires. Preserved as safety nets but NOT install-class. After Wave 129 confirms current state stable: DELETE per cardinal-rule-5 install-priority + kiss-dry-yagni Must-Never.

**Cache/state directories (14) — recommend .gitignore** (already mostly ignored per `.gitignore` pattern; verify):
- `.bun/`, `.ccs/`, `.lbdb/`, `.local/`, `.promptfoo/`, `.ssh/`, `.tmp-gitleaks-test/`, `pipx/`
- `.claude/cache-fix-state/`, `.claude/quota-status/`, `.claude/session-data/`, `.claude/session-env/`, `.claude/shell-snapshots/`, `.claude/context-mode/`
- `__pycache__/` (3 instances: scripts, tools, hooks/scripts)

**Loose files (7) — varies**:
- `.claude.json` — likely auto-generated; verify before disposition
- `.claude/.last-cleanup` — auto-cleanup timestamp; .gitignore
- `.claude/mcp-needs-auth-cache.json` — auto-cache; .gitignore
- `.claude/plugins/install-counts-cache.json` — auto-cache; .gitignore
- `.claude/scheduled_tasks.lock` — runtime lock; .gitignore
- `.claude/settings.local.json` — already in .gitignore per CLAUDE.local.md L113 convention; verify
- `t` (25 bytes) — DELETE (orphan test file)

---

## DELIVERABLE 2 — Missing-rule cite verification

### Verdict

**WAVE 128 AGENT H ERROR-3 was a Mia OVER false-positive**.

Both files ARE present in claude-sota-installed at `.claude/rules/`:
- `Z:/claude-sota-installed/.claude/rules/launch-discipline.md` (11122 bytes, 161 LOC)
- `Z:/claude-sota-installed/.claude/rules/deprecation-discipline.md` (9702 bytes)

They were classified as MISSING because Wave 128 Agent H probed `Z:/claude-sota/.claude/rules/` (sibling) instead of `Z:/claude-sota-installed/.claude/rules/` (target runtime). False-OVER from FM-20 path-drift cascade — sibling-vs-runtime probe class error.

### Provenance probe results

**Sibling check** [VERIFIED 2026-05-09]:
```
ls Z:/claude-sota/.claude/rules/launch-discipline.md → No such file or directory
ls Z:/claude-sota/.claude/rules/deprecation-discipline.md → No such file or directory
git -C Z:/claude-sota log --all -- .claude/rules/launch-discipline.md → (no output)
git -C Z:/claude-sota log --all -- .claude/rules/deprecation-discipline.md → (no output)
grep -rln 'launch-discipline\|deprecation-discipline' Z:/claude-sota/ → (no output)
```

**Sibling has NO history of these rules. They are NOVEL eee-only codifications.**

### Cite-class evidence (TIER-1-DIRECT to upstream marketplace)

Both rules carry frontmatter cite headers per CR-1 + CR-8:

**launch-discipline.md**:
```
constituents=[TIER-1-DIRECT @ Z:/claude-sota-installed/.claude/plugins/marketplaces/agent-skills/skills/shipping-and-launch/SKILL.md:10 @742dca5,
              TIER-3-LOCAL-COMPOSITION @ claude-sota-installed adaptation];
effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8
[VERIFIED 2026-05-08 via Wave 82m-B sota-researcher Top-3 CITE-IMPORT #3
  + Wave 82x codex T1 NEEDS-REVISION fix-forward F-001 cite-class reframe]
— addyosmani/agent-skills (33,500 stars MIT, named-author Addy Osmani / Google Chrome team)
```

**deprecation-discipline.md**:
```
constituents=[TIER-1-DIRECT @ Z:/claude-sota-installed/.claude/plugins/marketplaces/agent-skills/skills/deprecation-and-migration/SKILL.md:10-12 @742dca5,
              TIER-3-LOCAL-COMPOSITION @ claude-sota-installed adaptation];
effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8
[VERIFIED 2026-05-08 via Wave 82m-B sota-researcher Top-3 CITE-IMPORT #2
  + Wave 82x codex T1 NEEDS-REVISION fix-forward F-001 cite-class reframe]
— addyosmani/agent-skills (33,500 stars MIT, named-author Addy Osmani / Google Chrome team)
```

### CLAUDE.md cite trail integrity

CLAUDE.md L19-20 references both rule names (correctly):
```
"Wave 82w shipped 2 new rules with TIER-1-NAMED-AUTHOR-QUOTE cite class;
 Wave 82x codex T1 caught the misclassification + prescribed reframe to constituents form
 (deprecation-discipline.md L9, launch-discipline.md L10) — reframe applied Pattern A."
```

CLAUDE.md "Architecture (locked-in topology)" section L60 ALSO references the addyosmani/agent-skills cite as a 4th-org TIER-1-NAMED-AUTHOR-QUOTE reinforcement under Wave 82l Wave 82m-B.

### Resolution per CR-10 research-first-then-install

**RESOLVED — Mia OVER on cite chain. No remediation required.**

- Files exist in eee at expected path ✓
- Cite headers conform to CR-1 + CR-8 (TIER-1-DIRECT to upstream marketplace + cite-class TIER-3-LOCAL-COMPOSITION per rule #8) ✓
- CLAUDE.md L19-20 + L60 cite trail consistent with file presence ✓
- Wave 82w/82x history confirmed via cite headers (no separate sibling history needed) ✓

**Action**: include both rules in Batch 1A atomic commit (NOVEL eee-only) per Deliverable 1.

**FM-20 lesson**: Wave 128 Agent H probed sibling instead of runtime — cite-propagation across fires landed wrong path-class assumption. Per `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md`, sibling-vs-eee path-class is exactly the kind of sub-claim that needs Mia probe at synthesis time, not just apply time.

---

## CONCERNS (DONE_WITH_CONCERNS rationale)

1. **Sibling-eee desync**: every shared rule is DIFF (no SAME). EEE has accumulated significant cite-import-AMBER additions that need explicit cite-class verification per CR-1 + CR-12 before shipping Batch 1B.

2. **CR-9 sibling-bleed defense not yet applied to Batch 4B hooks**: agent_plan_readonly_bash_guard.py + safety_guard.py both grew significantly in eee — required path-rewrite verification per CR-9 BEFORE commit.

3. **5 SIB-ONLY agents missing from eee** (codex-rescue, evolve-gate, evolve-observer, silent-failure-hunter, team-lead). codex-rescue.md is BRIDGE-MODE primary class per advanced-agent-team-standing-directive.md invariant #1 — its absence is a structural gap.

4. **4 SIB-ONLY rules missing from eee** (codex-cli-flag-positioning, fm20-stale-wakeup-recognition-subclass, fm22-stale-gate-vs-current-tree, security-checklist) — DECISION REQUIRED per CR-12 upstream-parity probe before adoption.

5. **Wave-N session-plan docs (wave119/120/121)** carry cross-session handoff context — losing them via DELETE would break next-session continuity. Recommend Batch 5C ship to commit with explicit cite to `Z:/claude-sota/.claude/rules/karpathy-adapted.md §5 Wiki Compounding Surface` (cite-import-AMBER) — these ARE the cross-iter durable surface per Karpathy 4 principles.

6. **lefthook.yml** appears to be downloaded scaffolding never customized. Either install-class (with proper config) OR delete per kiss-dry-yagni Must-Never #4.

---

## DELIVERABLE_2_DONE: Wave 128 ERROR-3 was Mia OVER (sibling-vs-runtime path drift). Both rules ARE present in eee at `.claude/rules/` as NOVEL eee-only files with TIER-1-DIRECT cites to addyosmani/agent-skills upstream marketplace per Wave 82w codification + Wave 82x cite-class reframe.

---

## Recommended next-fire ship sequence

1. **Fire 130-A**: Batch 1A — 3 NOVEL eee-only rules (deprecation-discipline + launch-discipline + sota-research-architecture)
2. **Fire 130-B**: Batch 4A — 6 cwc hooks + context-mode-cache-heal.mjs
3. **Fire 130-C**: Batch 5A — operator-path-setup.md + fm17f-deep-dive-2026-05-09.md (already-cited)
4. **Fire 131**: Batch 5C — wave119/120/121 session plans (Karpathy §5 Wiki Compounding Surface)
5. **Fire 132**: Batch 1B — 33 DIFF rules (cite-class verification gate)
6. **Fire 133**: Batch 2 (architect, code-reviewer, debugger, gpt5-archaeologist, gpt5-reviewer, sota-researcher, verifier, evaluator) — cite-class verification gate
7. **Fire 134**: Batch 4B — agent_plan_readonly_bash_guard + safety_guard (CR-9 sibling-bleed defense gate)
8. **Fire 135**: Batch 5B — cliproxy-eee audit + cliproxyapi launch design
9. **Fire 136**: Decisions on 5 SIB-ONLY agents + 4 SIB-ONLY rules (CR-12 upstream-parity probe)
10. **Fire 137**: Batch 7 cleanup (backup deletion + .gitignore additions for cache/state/loose)

ARTIFACT-INLINE per FM-19. Orchestrator persists at `tmp/wave129-agentB-untracked-missing-rules-2026-05-09.md`.

HANDOFF: handoff_to: orchestrator | output_mode: last_message | artifacts: [tmp/wave129-agentB-untracked-missing-rules-2026-05-09.md] | verdict_one_line: DONE_WITH_CONCERNS: 79 untracked classified into 7 ship batches; Wave 128 ERROR-3 was Mia OVER (sibling-vs-runtime path drift); both rules ARE present in eee; CR-9 + CR-12 gates required before 4 follow-up batches ship.
