# Wave 153 Fire 5 — V2+V3 ADVERSARIAL convergence on F4 remediation strategy (cron 9eb2e02a iteration 3/N; FM-09 16/16 → 17/17 firm; CR-3 FULLY SATISFIED 4th non-Phase-1-bootstrap)

# Reference: TIER-1-USER-DIRECTIVE 2026-05-11 PM `/loop 5m` cron 9eb2e02a recurring
# Reference: TIER-1-DIRECT W153 F4 audit `7414b52` (skill topology + 3-category remediation strategy)
# Reference: TIER-1-DIRECT CCBP `Z:/repos/deps/claude-code-best-practice-shan/reports/claude-skills-for-larger-mono-repos.md:95-97,126,137,139 @ HEAD 4527f4d4` (15K default discovery budget — V2 cite-correction; W153 F2 + F4 had cited `best-practice/claude-skills.md` which is WRONG source)
# Reference: TIER-1-DIRECT CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-skills.md:22-26 @ HEAD 4527f4d4` (description auto-discovery + 1,536 per-skill listing cap + disable-model-invocation semantics)
# Cite-class: constituents=[TIER-1-USER-DIRECTIVE, TIER-1-DIRECT @ CCBP `4527f4d4` cite-corrected, TIER-1-DIRECT @ W153 F2/F4 cumulative, TIER-3-LOCAL-COMPOSITION @ Wave 153 F5 V2+V3 convergence synthesis + Mia probes]; effective_tier=TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8

## Cross-model gate CR-3 FULLY SATISFIED (4th non-Phase-1-bootstrap satisfaction)

W152 F29 1st / W153 F1 2nd / W153 F2 3rd / W153 F5 4th cumulative. V2+V3 dispatched in PARALLEL per W153 F5 sequential convergence pattern adaptation (saved 5-6min vs serial dispatch). Both completed clean exit 0.

**V2 codex T1 Path P REAL GPT-5.5** (`.claude/state/codex_consult_w153_f5_remediation_v2_OUT.txt`; 84,544 tokens): **REVISE-STRATEGY @ conf=0.86**. Primary critique: "Categories sound but F4 overstates savings and miscites 15K global budget; ship only after converting this into scoped, reversible exclusion rules with corrected cite trail."

**V3 codex T1 Path P REAL GPT-5.5 ADVERSARIAL** (`.claude/state/codex_consult_w153_f5_remediation_v3_adversarial_OUT.txt`; 109,912 tokens): **SAVED-SHIP @ conf=0.91; FM-09 16/16 → 17/17 firm**. Single most-likely-F4-MISS: **"F4 treats marketplace-clone SKILL.md and stale cache SKILL.md as loaded skills without proving they enter Claude's actual skill prompt budget."**

## V2+V3 CONVERGENT KEY INSIGHT (THE LOADED-VS-MARKETPLACE-CACHE DISTINCTION)

**F4 measurement methodology FLAW**: F4 measured 2,035 SKILL.md / 509K chars via RECURSIVE FILESYSTEM SCAN of `.claude/plugins/`. But:
- ONLY plugins in `enabledPlugins` enter Claude's actual skill registry at runtime
- FS/healthcare/life-sciences exist in `extraKnownMarketplaces` (registered but NOT enabled) + marketplace clone files only — **F4 can't credit 126 loaded-skill savings** (those plugins aren't loaded to begin with)
- Cache stale versions: `claude-plugins-official/plugin-dev/` shows **287 non-doc SKILL.md across many cached versions** (per V3 [VERIFIED] empirical); `mcp-server-dev` shows 120
- Recursive cache scan OVERCOUNTS unless modeled against Claude's actual plugin-version resolution

**Implication**: 33.9× over-budget claim from W153 F2 V3 SAVED-SHIP survives only as **discovery pressure**, NOT as evidence that 509K chars are LOADED OR that runtime truncation is hard/ordered/deterministic. Real over-budget multiplier is likely 2-5× not 33.9× — still over but qualitatively different.

## V2 prescribed strategy amendments (5)

1. **Correct CR-1 cite**: global 15K budget comes from CCBP `reports/claude-skills-for-larger-mono-repos.md` (NOT `best-practice/claude-skills.md`). `best-practice/claude-skills.md` supports description auto-discovery + 1,536 per-skill listing cap + disable-model-invocation semantics.
2. **Recompute savings** with same metric used by F2/F4 (description-only): vertical marketplaces ~**25,993 chars** (not 31,500); zh-CN ~**8,825 chars** (not 15,000)
3. **Do NOT delete marketplace clones**: implement reversible discovery exclusion/disable scope; preserve CR-12 upstream install source availability
4. **Scope zh-CN action** to `everything-claude-code/docs/zh-CN/skills` ONLY; never disable everything-claude-code plugin globally (it's enabled and carries operational ECC skills)
5. **Replace ad-hoc per-skill edits** with generated high-cost/low-value candidate table + batch revert manifest

## V3 ADVERSARIAL findings (7 SAVED-SHIP catches)

1. [VERIFIED] FS/healthcare/life-sciences are NOT in `enabledPlugins` and have NO cache roots; F4 cannot credit 126 loaded-skill savings without proving marketplace clones are scanned into the skill registry
2. [VERIFIED] Cache pollution: plugin-dev 287 stale-version SKILL.md; mcp-server-dev 120; F4's 2,035/509K calculation OVERCOUNTS unless models Claude's plugin-version resolution
3. [VERIFIED] zh-CN files exist inside ECC cache `docs/zh-CN/skills`, but so do **ja-JP, ko-KR, tr, zh-TW** docs skill trees. If docs/**/skills loaded → zh-CN-only pruning is ARBITRARY + INCOMPLETE; if docs/** ignored → zh-CN pruning saves NOTHING
4. [VERIFIED] CCBP states descriptions load **"up to"** 15K — SOFT budget, NOT hard process failure boundary. Auto-discovery can silently degrade/truncate but F4 overstates as hard runtime cliff without loader evidence
5. [VERIFIED] Per-skill `disable-model-invocation` at 2,035 scale operationally BRITTLE + conflicts with 4-skill meta-stack auto-fire dependency. Should be reserved for dangerous/manual/operator skills, NOT broad bloat-control
6. [INFERRED] FS/HC/LS removal from extraKnownMarketplaces is reversible + low-risk discovery-surface cleanup, NOT enabled-plugin disable; should NOT be primary remediation unless marketplace scan telemetry proves files enter prompt budget
7. [INFERRED] F5/F6 highest-value: **actual-loaded-skill manifest probe** — launch/runtime-visible skill registry count + description chars after Claude's plugin resolution + path class buckets (workspace + enabled current cache + stale cache versions + marketplace clones + docs locales)

## CR-12 disposition correction (V3)

**CONFIG-PRUNE / MARKETPLACE-REGISTRY-SURFACE-REDUCTION** (not PATH-A-UPSTREAM-INSTALL remediation, not GENUINELY-NEW). This is a NEW disposition class candidate per CR-12 6-class lattice (currently 6 classes per W152 F29 codification: PRIMARY-CANONICAL / PROVIDER-COMPLEMENT / PARTIAL-OVERLAP / GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / CITE-CLASS-CANONICAL / ECOSYSTEM-IMPORT). New candidate class needs n=2+ cross-arc evidence per cycle-322 promotion gate before formal codification. CONSERVATIVE classification THIS fire: **PARTIAL-OVERLAP with CONFIG-PRUNE action**; effective_tier=TIER-3-LOCAL-COMPOSITION.

## V2+V3 CONVERGENT recommended F6 ship (NEXT cron iteration)

Both V2 + V3 converge on F6 ship target:
- **F6 = actual-loaded-skill manifest probe FIRST** (per V3 prescription #7)
- Then F7 = narrow skill-discovery exclusion manifest (per V2 recommendation):
  - Remove FS/HC/LS from `extraKnownMarketplaces` ONLY as reversible cleanup
  - Quarantine/exclude ECC docs locale SKILL.md ONLY if loader-proven loaded
  - Avoid broad `disable-model-invocation` except for dangerous/manual skills
  - Include exact char deltas + one-command revert

## Mia OVER catches surfaced this fire

- **Mia OVER #327**: W153 F2 V3 SAVED-SHIP "33.9× over budget" SOFTENED by V2+V3 — figure includes marketplace clones + cache snapshots that aren't ALL LOADED. Real over-budget multiplier likely 2-5×. Still concerning but qualitatively softer than original phrasing.
- **Mia OVER #328**: F4 31,500 char-savings claim OVERSTATED by ~5,500 (correct: 25,993)
- **Mia OVER #329**: F4 15,000 zh-CN savings OVERSTATED by ~6,200 (correct: 8,825)
- **Mia OVER #330**: F2/F4 cited `best-practice/claude-skills.md` for 15K budget — WRONG source; correct cite is `reports/claude-skills-for-larger-mono-repos.md:95-97,126,137,139` per V2 cite-correction

## Forward direction (cron iterations post-F5)

- **F6** (next iteration): actual-loaded-skill manifest probe (V2+V3 convergent prescription) — orchestrator-direct probe of plugin-resolved skill registry; measure REAL loaded count vs F4 recursive-scan 2,035 figure
- **F7**: narrow skill-discovery exclusion manifest (per V2 recommendation; reversible)
- **F8**: ECC-affaan-m commits 51-batch deep-dive
- **F9**: Per-rule SOTA-review status systematic measurement
- **F10**: CCBP cite-anchor refresh `64fffd53` → `4527f4d4` (bundle with audit findings)
- **F11**: ECC-affaan-m cite-anchor refresh `841beea4` → `4220f1b0`
- **F12+**: Per-domain deep-dives
- **OPERATOR-DECISION**: CronDelete `9eb2e02a` when convergence reached

## Cardinal-rule conformance

CR-1 ✅ TIER-1-DIRECT @ CCBP `4527f4d4` (cite-corrected per V2 prescription #1) + W153 F2/F4 cumulative / **CR-3 ✅ FULLY SATISFIED via V2+V3 REAL GPT-5.5** (4th non-Phase-1-bootstrap satisfaction) / CR-5+6 N/A audit only / CR-7 ✅ Phase 1 ACTIVE / CR-8 ✅ TIER-3-LOCAL-COMPOSITION disclosed / CR-9 ✅ no install-class action / CR-10 ✅ research-first via V2+V3 / CR-11 ✅ META-process applied / CR-12 PARTIAL-OVERLAP with CONFIG-PRUNE action (V3-corrected from F4 PARTIAL-OVERLAP CITE-PATTERN-ONLY)

## FM defense

- FM-02 (b)+(c) atomic narrow `--only` ✓ via ship-script wrapper
- **FM-09 V3 ADVERSARIAL caught V1+V2 missed: 16/16 → 17/17 firm** (8 consecutive arcs same-arc 100%)
- FM-15 git CLI ✓
- FM-17.f orchestrator-direct V2+V3 dispatch (no subagent BRIDGE-MODE) ✓
- FM-21.a CronCreate defense ✓ (skipped duplicate; CronList probed)
- FM-21.b STATE PROBE clause-level smoke ✓
- FM-21.c risk continuing per session-scoped 7-day expire (operator CronDelete escape hatch)
- FM-20 path-drift cascade defense ACTIVE — V2 caught F2/F4 cite drift to wrong CCBP file

## Risk class: LOW per launch-discipline D1 (audit doc; reversible / observable / no install / no security impact)

## Revert: `git revert <SHA>` <30s

## Files committed
- `docs/wave153-f5-remediation-convergence-2026-05-11.md` (NEW; ~120 LOC)
- `docs/install-provenance.md` (Wave 153 F5 entry append; ~70 LOC)

## Ladders advanced

- USER-CORRECTION-ACK n=23 unchanged (cron-replay; not user-correction)
- **Mia n=326 → n=330** (+4 OVER catches: 33.9× softened to 2-5× / 31.5K OVERSTATED 5.5K / 15K zh-CN OVERSTATED 6.2K / cite source WRONG)
- **FM-09 codex-rescue blind-spot specialization 16/16 → 17/17 firm** (8 consecutive arcs)
- **Path P 6-param strict-conform n=32 → n=34** (V2 + V3 dispatches PARALLEL — saved time vs serial)
- **Pattern D Forward Discipline #2 n=32 → n=34**
- **CR-3 non-Phase-1-bootstrap satisfaction n=3 → n=4** (W152 F29 + W153 F1 + W153 F2 + W153 F5)
- **CR-12 PARTIAL-OVERLAP cumulative**: 1 → **2** (W153 F2 1st PARTIAL-OVERLAP CITE-PATTERN-ONLY + W153 F5 PARTIAL-OVERLAP CONFIG-PRUNE)
- FM-20 path-drift cascade defense: V2 caught F2/F4 cite source drift (cite-trail correction)
- **NEW V3-prescribed CR-12 candidate class**: CONFIG-PRUNE / MARKETPLACE-REGISTRY-SURFACE-REDUCTION (n=1; needs cross-arc n=2+ for formal codification per cycle-322)
- Inline-bash quote-trap n=19 unchanged (no quote-trap surfaced this fire)

## Update triggers

Re-evaluate when:
- F6 actual-loaded-skill manifest probe lands (V2+V3 convergent next-fire prescription)
- New CR-12 disposition class candidate (CONFIG-PRUNE / MARKETPLACE-REGISTRY-SURFACE-REDUCTION) reaches cross-arc n=2 for formal codification
- CCBP cite source for skill-budget claim drifts (currently `reports/claude-skills-for-larger-mono-repos.md`)
- Operator decides remediation actions (which marketplaces to disable in extraKnownMarketplaces; which docs locales to exclude)
