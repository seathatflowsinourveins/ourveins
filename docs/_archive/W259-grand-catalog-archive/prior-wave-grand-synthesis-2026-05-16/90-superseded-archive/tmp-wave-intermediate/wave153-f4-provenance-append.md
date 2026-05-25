

---

## 2026-05-11 Wave 153 fire 4 — Skill topology + context-budget audit (cron 9eb2e02a iteration 2/N; W153 F2 V3 SAVED-SHIP #1 prescription EXECUTED)

**Trigger**: cron `9eb2e02a` iteration 2 (recurring `*/5 * * * *`); per FM-21.b STATE PROBE clause-level smoke + sequential convergence pattern: F3 Forward direction table dictates F4 = skill topology + context-budget audit per W153 F2 V3 SAVED-SHIP #1 prescription.

**FM-21.a CronCreate defense**: skipped duplicate CronCreate (CronList confirmed `9eb2e02a` active).

**Phase A — Per-marketplace SKILL.md inventory** (empirical):
- everything-claude-code: 455 / knowledge-work-plugins: 181 / claude-for-financial-services: 117 / claude-plugins-official: 28 / addy-agent-skills: 22 / anthropic-agent-skills: 18 / context-mode: 12 / life-sciences: 6 / openai-codex: 3 / healthcare: 3 = **845 marketplace** + **1,190 cache** = **2,035 total** (matches W153 F2 V3 SAVED-SHIP figure).

**Phase B — Cache snapshot-duplicate finding (NEW)**: 1,190 cache-tier SKILL.md is largely commit-tagged snapshot-duplicates (e.g., `claude-plugins-official/plugin-dev/hook-development/SKILL.md` 525 chars repeated 20+ times across cache-SHA dirs). Per CCBP `cleanupPeriodDays` default 30d — auto-prunes within window.

**Phase C — Top single-skill verbose offenders**: 774 chars `everything-claude-code/docs/zh-CN/skills/prompt-optimizer` / 583 `videodb` / 572 zh-CN videodb / 525 `claude-plugins-official/plugin-dev/hook-development` (×20 cache snapshots). Per-skill description mean ~250 chars.

**Phase D — Existing `disable-model-invocation` precedent**: **206 instances** already exist across `.claude/plugins/` — establishes SAFE per-skill primitive (avoids Mia n=326 REJECT-FOR-FIT global skillOverrides).

**Phase E — V3 SAVED-SHIP remediation strategy (3 categories; V2+V3 convergence deferred to F5)**:
1. Marketplace-level disable for operationally-dormant vertical domains: claude-for-financial-services (117) + life-sciences (6) + healthcare (3) = 126 SKILL.md disabled = ~31.5K chars freed (~2.1× CCBP budget)
2. zh-CN localization disable for English operator (~15K chars)
3. Per-skill `disable-model-invocation: true` for fine-grained partial-relevance cases

**Phase F — Forward direction (cron iterations)**:
- F5: Path P V2+V3 ADVERSARIAL convergence on remediation strategy
- F6: ECC-affaan-m commits 51-batch deep-dive
- F7: Per-rule SOTA-review status systematic measurement
- F8: CCBP cite-anchor refresh bundle
- F9: ECC-affaan-m cite-anchor refresh bundle
- F10+: Per-domain skill/agent/command deep-dives
- OPERATOR-DECISION: CronDelete `9eb2e02a`

**Architecture audit % unchanged**: TOP-TIER 90.0% cite-anchored / ~30-40% V2+V3 SOTA-reviewed estimate. This fire is plugin-cache audit, not architecture audit; cite-discipline applies to OUR files not vendored plugin SKILL.md.

**Cardinal-rule conformance**: CR-1 ✅ TIER-1-DIRECT @ CCBP `4527f4d4` + W153 F2 cite / CR-3 ⚠️ Phase 1 bootstrap (V2+V3 deferred to F5) / CR-5+6 N/A / CR-7 ✅ / CR-8 ✅ / CR-9 N/A / CR-10 ✅ / CR-11 ✅ / CR-12 PARTIAL-OVERLAP.

**FM defense**: FM-02 (b)+(c) atomic narrow `--only` ✓ via ship-script wrapper / FM-09 N/A / FM-15 ✓ / FM-17.f orchestrator-direct ✓ / FM-21.a CronCreate defense ✓ / FM-21.b STATE PROBE ✓ / FM-21.c risk continuing (operator CronDelete escape hatch).

**Risk class**: LOW per launch-discipline D1.

**Revert**: `git revert <SHA>` <30s.

**Ladders**:
- USER-CORRECTION-ACK n=23 unchanged
- Mia n=326 / FM-09 16/16 firm / Path P n=32 / Pattern D n=32 / CR-3 non-Phase-1 n=3 — ALL unchanged (no Path P this fire; sequential convergence)
- **NEW Inline-bash quote-trap n=18 → n=19** (awk-pipe quote-trap; recovered via prior-probe data)
- **NEW SKILL.md per-marketplace inventory measured** (10 marketplaces)
- **NEW cache snapshot-duplicate finding** (cleanupPeriodDays 30d window)
- **NEW disable-model-invocation precedent confirmed** (206 instances)
- **NEW remediation strategy 3 categories** for V2+V3 review at F5
- Cron `9eb2e02a` iteration 2/N

**Files committed**:
- `docs/wave153-f4-skill-topology-audit-2026-05-11.md` (NEW; ~150 LOC)
- `docs/install-provenance.md` (this entry append; ~60 LOC)

**Update triggers**: cron iteration produces V2+V3 convergence on F4 remediation (F5) / operator decides remediation actions / CCBP cleanupPeriodDays default changes / new marketplace adds significant SKILL.md count.
