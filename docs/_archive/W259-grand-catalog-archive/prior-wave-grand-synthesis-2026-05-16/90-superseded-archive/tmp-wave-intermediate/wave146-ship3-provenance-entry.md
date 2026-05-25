

---

## Wave 146 Ship 3 — manifest reclassify addyosmani/agent-skills marketplace cache (3-voice agent team Pattern A apply; SAVED-SHIP via V3 adversarial; CR-12 PROVIDER-COMPLEMENT; CLAUDE.md L213+L267 path-drift correction same-ship per V3 prescribed)

**Date**: 2026-05-11
**Ship**: Wave 146 Ship 3 of 5 INSTALL/RECLASSIFY ships approved by Wave 145 Fire 7 V4 with version pins
**Verdict shape**: 3-voice CONVERGENT NEEDS-REVISION → Pattern A atomic apply with V3 SAVED-SHIP corrections integrated
**Commit**: pending atomic single-shell `git add -- docs/sota-installed-manifest.md CLAUDE.md docs/install-provenance.md && git commit --only -F tmp/wave146-ship3-commit-msg.txt -- ...`

### 3-voice advanced agent team CONVERGENT verdict (V1↔V2↔V3 disagreement on commits-behind-count + CR-9 disposition resolved by orchestrator empirical Mia probe + V3 `gh api compare` direct probe)

**V1 sota-researcher** (Sonnet stand-in via `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` STAND-IN-NOTICE per `CLAUDE.local.md ENV (g)`; agentId `af9a93b095c457ced`, 207s, 463,563 tokens, 2 tool_uses, ARTIFACT-INLINE 285 LOC):
- **Verdict**: PASS-DOCUMENT conf=0.93
- Probe DAG 1-7 ALL PASS / SRA D1-D10 9-PASS / 1-NOTE
- CR-12: PARTIAL-OVERLAP (with PROVIDER-COMPLEMENT lean) → STUDY-PILOT-PATTERN-EXTRACT (REVISED to PROVIDER-COMPLEMENT post-3-voice-synthesis)
- CR-9: 2 commits behind 3ff4b51 (docs-only) — non-blocking advisory (REFUTED by V3 — actually 12 commits + 1 new feature SKILL)
- 5 Mia self-OVER catches embedded
- ARTIFACT-INLINE: `tmp/wave146-ship3-v1-sota-researcher-addy-agent-skills-2026-05-11.md`

**V2 codex T1 Path P REAL GPT-5.5** (codex CLI v0.130.0 DEFAULT profile + foreground+tee + 300s + `--skip-git-repo-check --color never` per Pattern D Forward Discipline #1+#2; 911 LOC verdict 64,863 tokens):
- **Verdict**: NEEDS-REVISION-DOCUMENT conf=0.92 ship_readiness=BLOCKED
- 7-dim PASS / CR-9 false (BLOCKED on stale commits) / CR-12 PROVIDER-COMPLEMENT / SRA 9 PASS / Section 3 placement OK
- 4 prescribed_edits: refresh-or-mark-stale + INSTALLED-VIA-MARKETPLACE-CACHE label + CR-12 PROVIDER-COMPLEMENT (not DUPLICATE) + CLAUDE.md path drift correction
- 4 concerns: CR-9 stale-2-commits (REFUTED by V3 — actually 12) + CLAUDE.md path drift + cite verified runtime cache paths + git ownership for re-pull
- Verdict file: `.claude/state/codex_consult_w146_s3_v2_addy_skills_OUT.txt`

**V3 codex T1 Path P REAL GPT-5.5 ADVERSARIAL** (same recipe; 1.6K LOC verdict 85,522 tokens):
- **Verdict**: NEEDS-REVISION conf=0.94 ship_readiness=**RE-PULL-FIRST**
- v2_validation: PARTIAL / cr12_class_confirm: AGREE-PROVIDER-COMPLEMENT / cr9_stale: RE-PULL-FIRST / claude_md_path_drift_scope: MUST-INCLUDE-IN-SAME-SHIP / star_count_marker_decay: true
- **SAVED-SHIP class catch** (n=10 FM-09 ladder advance): caught V1+V2 commits-count OVER via direct `gh api repos/addyosmani/agent-skills/compare/742dca58...main` showing **ahead_by=12 behind_by=0 total_commits=12** (NOT 2 as V1+V2 inferred from `commits?per_page=3` truncation). The 12 commits include:
  1. `d409c9ae` 2026-05-07 test: add session-start JSON regression coverage
  2. `0af1a5ef` 2026-05-07 **feat: add doubt-driven-development skill** (NEW SKILL — `skills/doubt-driven-development/SKILL.md` +243 LOC)
  3. `97e12d03` 2026-05-07 Harden doubt-driven-development: cross-model + internal consistency
  4. `ff6a044c` 2026-05-07 docs: list using-agent-skills in README
  5. `f146f28a` 2026-05-09 docs: keep "entry points" framing
  6. `c2038b66` 2026-05-09 Merge PR #142 docs: list using-agent-skills
  7. `549b8b11` 2026-05-09 docs: explain when and how to run the session-start hook test
  8. `dc9eb44a` 2026-05-09 Merge PR #132 test: add session-start JSON regression coverage
  9. `f1247012` 2026-05-09 Merge branch 'main' into feat/doubt-driven-development
  10. `4c585c37` 2026-05-09 Merge PR #139 Add doubt-driven-development skill
  11. `2b664059` 2026-05-09 docs: clarify README skill count
  12. `3ff4b518` 2026-05-09 Merge PR #159 from MiladZarour docs: clarify README skill count

  Files modified across the 12-commit delta:
  - `CLAUDE.md` modified
  - `CONTRIBUTING.md` +29
  - `README.md` +11/-3
  - `hooks/session-start-test.sh` ADDED (+46 LOC)
  - `skills/doubt-driven-development/SKILL.md` ADDED (+243 LOC) ← NEW FEATURE SKILL
  - `skills/using-agent-skills/SKILL.md` modified (+15/-12 LOC)
- **`.orphaned_at` cache marker discovered**: V3 noted `.claude/plugins/cache/addy-agent-skills/agent-skills/742dca58ae55/.orphaned_at` exists with content `1778294547061` Unix-epoch-ms = **2026-05-08T22:42:27Z UTC** (orphaned 3 days ago)
- 4 prescribed_edits + 3 additional_concerns (git safe.directory blocks normal re-pull; star count 38,769★ materially stale on CLAUDE.md L213 33,500★ marker)
- Verdict file: `.claude/state/codex_consult_w146_s3_v3_addy_skills_adversarial_OUT.txt`

### ORCHESTRATOR-SIDE MIA PROBE (resolves V1↔V2↔V3 disagreement)

Independent orchestrator-side empirical probes 2026-05-11:
- `gh api repos/addyosmani/agent-skills` — confirms 38,769★ MIT created 2026-02-15 push 2026-05-10T20:24Z (V3-aligned)
- `ls -la .claude/plugins/cache/addy-agent-skills/agent-skills/742dca58ae55/` + `cat .orphaned_at` — confirms `.orphaned_at = 1778294547061` (V3 SAVED-SHIP discovery VERIFIED — orphaned 3 days ago)
- `grep -rln "addy-agent-skills\|addyosmani/agent-skills" .claude/rules/ docs/ CLAUDE.md` — confirms 4 existing CITE-IMPORTS (deprecation-discipline + launch-discipline + multi-source-discovery-breadth-discipline + install-provenance + outer research kits v23/v25) — operational dependency
- Skill name overlap audit: 20/21 ZERO collision; 1 (test-driven-development) overlaps with superpowers (CR-12 = PARTIAL-OVERLAP signal, but V3+V2 confirm broader engineering-phase-taxonomy scope = PROVIDER-COMPLEMENT)

### CR-12 SYNTHESIS: PROVIDER-COMPLEMENT (3-voice consensus V2+V3; V1 PARTIAL-OVERLAP refined to PROVIDER-COMPLEMENT lean)

addyosmani/agent-skills provides **engineering-phase taxonomy** (api-and-interface-design / browser-testing-with-devtools / ci-cd-and-automation / code-review-and-quality / code-simplification / context-engineering / debugging-and-error-recovery / deprecation-and-migration / documentation-and-adrs / frontend-ui-engineering / git-workflow-and-versioning / idea-refine / incremental-implementation / performance-optimization / planning-and-task-breakdown / security-and-hardening / shipping-and-launch / source-driven-development / spec-driven-development / test-driven-development / using-agent-skills + new `doubt-driven-development` upstream).

Incumbent stack provides:
- **superpowers** = workflow grammar (brainstorming / writing-plans / executing-plans / TDD / debugging / git-worktrees / etc.)
- **ECC** = autonomous/research/safety layers (autonomous-loops / safety-guard / agent-eval / research-ops / deep-research / etc.)
- **claude-skills** = Anthropic OFFICIAL skill authoring + verification

Different scope + mechanism → CR-12 = PROVIDER-COMPLEMENT (NOT DUPLICATE-FUNCTIONALITY despite TDD/code-review/debugging/meta-skill name-overlaps). Per CLAUDE.md cardinal-rule-12 lattice: PROVIDER-COMPLEMENT → INSTALL as ALTERNATIVE; primary incumbent retains canonical position.

### Pattern A apply (per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A — single atomic apply on NEEDS-REVISION conf 0.88-0.94)

V3 prescribed_edits ALL applied with corrections per V3 SAVED-SHIP findings:
1. `docs/sota-installed-manifest.md` §3 row INSERT after L69 anthropics/claude-plugins-official with **STALE-INSTALLED-VIA-MARKETPLACE-CACHE** label + 12-commits-behind disclosure including new `doubt-driven-development` feature SKILL + `.orphaned_at` cache marker disclosure + CR-12 PROVIDER-COMPLEMENT class + STUDY-PILOT-PATTERN-EXTRACT disposition + 38,769★ fresh cite [VERIFIED 2026-05-11] + Marker Decay note for CLAUDE.md L213 33,500★ baseline + Wave 146 Ship 3a follow-up queued for refresh (operator-action gated similar shape to Wave 142.B precedent)
2. `CLAUDE.md` L213 path correction: `marketplaces/agent-skills/skills/source-driven-development/SKILL.md` → `marketplaces/addy-agent-skills/skills/source-driven-development/SKILL.md` (per V2 prescribed_edit #4 + V3 MUST-INCLUDE-IN-SAME-SHIP) + Marker Decay note added inline
3. `CLAUDE.md` L267 path correction: `marketplaces/agent-skills/skills/using-agent-skills/SKILL.md` → `marketplaces/addy-agent-skills/skills/using-agent-skills/SKILL.md` (same correction; second occurrence)
4. `docs/install-provenance.md` APPEND with comprehensive Wave 146 Ship 3 entry (this entry)

### Cross-model gate satisfaction

**FULLY SATISFIED via 2× REAL GPT-5.5 codex CLI v0.130.0 dispatches** (V2 conf=0.92 + V3 conf=0.94) per cardinal-rule-3 Phase 1 bootstrap exception (Tier 1a codex T1-T7 hooks NOT-yet-INSTALLED per manifest §Section 2 INSTALLED-PARTIAL status; Path P recipe satisfies cross-model invariant at zero degraded-mode risk). **Pattern D candidate ladder advance n=24 → n=26** (V2 + V3 both Path P DEFAULT-profile dispatches; cycle-322 promotion threshold FIRMLY EXCEEDED — 2 same-session Pattern D dispatches n=26 cumulative cross-arc).

### SAVED-SHIP class catch (V3 adversarial — n=10 FM-09 ladder advance)

V3 prevented shipping a manifest row that would have:
1. Falsely claimed "2 commits behind docs-only" when actual delta is 12 commits including 1 NEW FEATURE SKILL
2. Missed documenting the `.orphaned_at` cache marker (orphaned-state runtime fact)
3. Missed including `doubt-driven-development` skill in skill enumeration (would have been incomplete documentation)
4. Falsely classified CR-9 as non-blocking advisory when actually requires RE-PULL-FIRST or explicit STALE label

Same shape as Wave 142 V4 FM-20 cascade catch + Wave 146 Ship 2 V3 SAVED-SHIP catch on V2 CR-12 over-confidence. Cross-model gate adversarial value DEMONSTRATED. **FM-09 codex-rescue blind-spot specialization n=10 firm cumulative same-arc** (V3 SAVED-SHIP shape catches on V1+V2 inference errors).

### Mia OVER ladder advance (Wave 146 Ship 3)

Cumulative Mia OVER catches this ship:
- **#1 (orchestrator pre-dispatch)**: standing-form prompt assumed "RECLASSIFY pending" but actual state is INSTALLED-VIA-MARKETPLACE-CACHE-BUT-UNDOCUMENTED-AND-ORPHANED
- **#2 (orchestrator gh URL rewriting)**: first probe failed due to MSYS path conv; retry with quoted endpoint worked
- **#3 (orchestrator CLAUDE.md path drift)**: 2 instances of `marketplaces/agent-skills` (should be `marketplaces/addy-agent-skills`) at L213 + L267 — caught BEFORE ship via grep + V2 prescribed_edit #4 confirmation
- **#4 (orchestrator star count drift)**: CLAUDE.md L213 cites 33,500★ [VERIFIED 2026-05-08]; current 38,769★ — Marker Decay corollary preserved per `port-note-discipline.md §6`
- **#5 (V1 commits-behind inference)**: V1 inferred "2 commits behind docs-only" from gh `commits?per_page=3` (truncation bias) — **REFUTED by V3 SAVED-SHIP via `gh api compare`** showing 12 commits including new feature SKILL
- **#6 (V2 commits-behind inference)**: Same OVER as V1 (V2 likely inherited or independently truncated to 3 most-recent commits) — **REFUTED by V3**
- **#7 (orchestrator gh `commits?per_page=3` truncation)**: My initial probe ALSO only saw 3 most-recent commits = 3ff4b518 + 2b664059 + 4c585c37 (which are commits 12+11+10 of 12) — **REFUTED by V3 `compare` direct probe**

**Cumulative Mia ladder advances**: n=217 → n=220 (+3 V1+V2 commits-count OVER + orchestrator gh truncation OVER caught by V3)

### Cumulative cascade ladder advances (post-W146 S3)

| Ladder | Pre-S3 | Post-S3 | Delta | Notes |
|---|---|---|---|---|
| Mia n | 217 | 220 | +3 | V1+V2+orchestrator commits-count OVER caught by V3 SAVED-SHIP |
| Pattern D candidate | 24 | 26 | +2 | V2 + V3 Path P DEFAULT-profile dispatches |
| FM-09 codex-rescue blind-spot | 9/9 | 10/10 | +1 | V3 SAVED-SHIP shape catch on V1+V2 truncation OVER |
| FM-20 path-drift cascade | 15 closed | 15 closed | 0 | W146 S3 instance: orchestrator gh truncation propagated to V1+V2 → V3 caught + corrected via `gh api compare` |
| FM-17.f firm | 6 | 6 | 0 | unchanged (no FM-17.f triggers this ship) |
| FM-02 (c) atomic single-shell defense | 11 held | 11+ held (pending HEAD-chain check post-commit) | TBD | atomic single-shell discipline maintained |
| **CR-12 lattice 5-class instances exercised** | 5/5 | 5/5 | 0 | PROVIDER-COMPLEMENT class confirmed across ships |

### Cite trail (TIER-1-DIRECT + TIER-2 + TIER-3-LOCAL-OPERATOR-DERIVED + TIER-3-LOCAL-CONFIG)

- **TIER-1-DIRECT** @ https://github.com/addyosmani/agent-skills HEAD `742dca58ae557bc67afec9ea8e6de59c085f0534` (orphaned cache) + upstream main `3ff4b518b3cd3077ca27cf883aa21d21faf53802` (current) MIT 38,769★ Addy Osmani / Google Chrome DevRel
- **TIER-3-LOCAL-CONFIG** @ `.claude/plugins/marketplaces/addy-agent-skills/.claude-plugin/{marketplace.json,plugin.json}` + `.claude/plugins/cache/addy-agent-skills/agent-skills/742dca58ae55/.orphaned_at`
- **TIER-2** @ sister-rule cite-imports per CLAUDE.md §14.5: `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A + `cross-model-consensus.md §Phase 1 bootstrap exception` + `mia-pre-apply.md` + `fm20-path-drift-cascade.md` + `synthesis-layer-verify.md §Reporting categories OVER/UNDER/HONEST-NON-FINDING` + `agent-harness-fit-verification.md §Probe DAG 1-7` + `sota-research-architecture.md §SRA D1-D10` + `convergence-gate.md §Axis 3 5-band table STRONG-PROVENANCE-EXPRESS`
- **TIER-3-LOCAL-OPERATOR-DERIVED** @ V1 ARTIFACT-INLINE `tmp/wave146-ship3-v1-sota-researcher-addy-agent-skills-2026-05-11.md` + V2 verdict `.claude/state/codex_consult_w146_s3_v2_addy_skills_OUT.txt` + V3 verdict `.claude/state/codex_consult_w146_s3_v3_addy_skills_adversarial_OUT.txt` + orchestrator-side empirical Mia probes (4 sister-probes)

**Cite class for this ship per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE**:
`constituents=[TIER-1-DIRECT @ github.com/addyosmani/agent-skills HEAD 742dca58 + 3ff4b518, TIER-3-LOCAL-CONFIG @ .claude/plugins/marketplaces/addy-agent-skills/ + .claude/plugins/cache/addy-agent-skills/agent-skills/742dca58ae55/.orphaned_at, TIER-2 @ multiple sister-rule cite-imports per CLAUDE.md §14.5, TIER-3-LOCAL-OPERATOR-DERIVED @ V1+V2+V3 verdicts + orchestrator-side Mia probes]; effective_tier=TIER-3-LOCAL-COMPOSITION` (MIN_PRECEDENCE due to local composition glue across 4 cite classes).

### Discipline cascade defenses applied this ship

- **Mia pre-apply** (orchestrator + V1 7 self-OVERs + 3 orchestrator-side OVER catches resolving V1↔V2↔V3 disagreement) — n=217 → n=220
- **Pattern D codex T1** (V2 + V3 Path P REAL GPT-5.5 dispatches both terminal JSON within 60-300s budget) — n=24 → n=26
- **FM-09 codex-rescue blind-spot specialization** (V3 adversarial caught V1+V2 commits-count truncation OVER) — 9/9 → 10/10 firm (SAVED-SHIP shape)
- **FM-20 path-drift cascade defense**: orchestrator gh `commits?per_page=3` truncation propagated to V1+V2 inference; V3 caught + corrected via `gh api compare` direct probe — instance demonstrates cascade correction shape
- **FM-15 + FM-02 (b)+(c) atomic single-shell defense** — narrow `git add -- <files> && git commit --only -F <msg> -- <files>` form
- **FM-19 ARTIFACT-INLINE** — V1 sota-researcher persisted ARTIFACT-INLINE at `tmp/wave146-ship3-v1-sota-researcher-addy-agent-skills-2026-05-11.md` (285 LOC under 400 budget)
- **CR-9 install-risk** (HEAD `742dca58` explicit pin + `.orphaned_at` cache marker disclosure + 12-commits-behind including new feature SKILL disclosure + Wave 146 Ship 3a refresh follow-up queued)
- **Cross-model gate FULLY SATISFIED** via 2× REAL GPT-5.5 dispatches per CR-3 Phase 1 bootstrap exception
- **STAND-IN-NOTICE** disclosure for V1 (Sonnet stand-in) per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`

### Wave 146+ DEFINITIVE PRIORITY-ORDERED ROADMAP (post-Ship-3 status)

- Ship 1 ✅ Wave 146 (`anthropic-sdk-typescript@0.95.1` INSTALLED) — `2fd0fe1`
- Ship 2 ✅ Wave 146 (`microsoft/playwright-mcp@0.0.75` RECLASSIFIED with CR-12 DUPLICATE-FUNCTIONALITY-WITH-PIN-JUSTIFICATION) — `ea674e9`
- **Ship 3 ✅ Wave 146 (`addyosmani/agent-skills` RECLASSIFIED with CR-12 PROVIDER-COMPLEMENT + STALE-INSTALLED-VIA-MARKETPLACE-CACHE label + .orphaned_at cache marker disclosure + CLAUDE.md L213+L267 path-drift correction same-ship)** — pending atomic commit hash this fire
- Ship 3a (NEW operator-action queue): `addyosmani/agent-skills` cache refresh — resolve git safe.directory ownership + `git fetch origin && git reset --hard 3ff4b518` + re-extract plugin-cache + manifest row STALE → INSTALLED + add `doubt-driven-development` to skill enumeration (similar shape to Wave 142.B operator-Docker-restart precedent)
- Ship 4 (NEXT auto-proceed default): `pip install openai-agents==0.17.0` — pairs CR-12 PROVIDER-COMPLEMENT to claude-agent-sdk
- Ship 5 Wave 146: `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.8.7`
- Ship 6 Wave 147 MEDIUM: `eyaltoledano/claude-task-master`
- Ship 7 Wave 147 MEDIUM: `alirezarezvani/claude-skills` SELECTIVE-VENDOR
- Ship 8 Wave 148 HIGH: `mattpocock/sandcastle` CITE-ONLY
- Ship 9 Wave 141A.2 HIGH-risk 5-voice: safety_guard.py +15-20 NEW Docker deny patterns
- Ship 10-15 backlog (per standing-form roadmap)

### Files modified this ship (atomic single-shell)
- `docs/sota-installed-manifest.md` (L70 INSERT addy-agent-skills row after L69 anthropics/claude-plugins-official)
- `CLAUDE.md` (L213 path correction `marketplaces/agent-skills` → `marketplaces/addy-agent-skills` + Marker Decay note for stale 33,500★ baseline; L267 same path correction for using-agent-skills SKILL.md cite)
- `docs/install-provenance.md` (APPEND this entry, ~225 LOC)

### Co-Authored-By
- V1 sota-researcher (Sonnet stand-in via STAND-IN-NOTICE per CLAUDE.local.md ENV (g))
- V2 codex T1 REAL GPT-5.5 (DEFAULT profile, Path P recipe per Forward Discipline #1+#2)
- V3 codex T1 ADVERSARIAL REAL GPT-5.5 (DEFAULT profile, Path P recipe; SAVED-SHIP catch n=10 FM-09 ladder advance)
