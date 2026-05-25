

---

## 2026-05-11 Wave 153 fire 7 — Plugin-disable ship (4 plugins; V2+V3 convergent APPROVE; **FM-09 17/17 → 18/18 firm**; CR-3 FULLY SATISFIED 5th non-Phase-1-bootstrap; **FIRST INSTALL-CLASS mutation in W153 arc**)

**Trigger**: cron `9eb2e02a` iteration 5/N. F6 Forward direction → F7 = V2+V3 PARALLEL convergence review on F6 safe-disable list. FM-21.a CronCreate defense: skipped duplicate.

**Cross-model gate CR-3 FULLY SATISFIED (5th non-Phase-1-bootstrap)**: W152 F29 + W153 F1 + F2 + F5 + F7 cumulative. V2+V3 dispatched PARALLEL background; both completed clean exit 0.
- V2: APPROVE-LIST conf=0.87 / 161,521 tokens / approve_ship_immediately TRUE
- V3 ADVERSARIAL: NEEDS-REVISION-F6 conf=0.88 / 131,372 tokens / FM-09 17/17 → **18/18 firm** (9 consecutive arcs)

**V2 reveals hidden dependencies F6 missed**: outputai SessionStart hook + 5 agents (NOT skills-only); clickhouse plugin `.mcp.json` for `https://mcp.clickhouse.cloud/mcp` remote MCP; cwc-makers `/maker-setup` command.

**V3 single-most-likely-F6-MISS**: "Disabling mcp-server-dev is the most likely regret — removes official Anthropic MCP-building guidance from MCP-centric runtime for only 3 skills saved." → **KEEP mcp-server-dev**.

**V2+V3 CONVERGENT DISABLE LIST (4 plugins; KEEP mcp-server-dev per V3 SAVED-SHIP)**:
| Plugin | SKILL.md | V3-corrected disposition |
|---|---|---|
| outputai | 47 | ACTIVE-HOOK/FRAMEWORK-CONTEXT (NOT PROVIDER-COMPLEMENT) — SessionStart hook injects context every session |
| qdrant-skills | 26 | Dormant DB guidance (no MCP/hook/agent path) |
| clickhouse | 2 | plugin-supplied MCP surface (clickhouse.cloud remote MCP removed) |
| cwc-makers | 2 | 2 skills + `/maker-setup` command |
| **TOTAL DISABLED** | **77** | **~17,610 description chars freed ≈ 1.17× CCBP 15K budget recovered** |

**CR-12 NEW candidate classes surfaced (V3)**: ACTIVE-HOOK/FRAMEWORK-CONTEXT + plugin-supplied-MCP-surface + LOW-COST-ARCHITECTURE-COMPANION (cross-arc n=2+ for formal lattice extension per cycle-322).

**V3 empirical metric refinement**: F6 ~250-char/skill estimate was for FRONTMATTER DESCRIPTION budget; FULL FILE BODIES total ~550K chars across all SKILL.md. V3 measured ECC alone: 455 skills / **60,985 description chars** (mean 134/skill) = **~4× CCBP 15K budget for ECC alone**. F8 = ECC sub-category audit = real leverage target.

**Settings.json mutation**: lines 527-530 (`outputai` + `qdrant-skills` + `clickhouse` + `cwc-makers` all `true` → `false`). Effect: next eee launch. Mid-session unaffected via `.in_use` markers. Reversible: flip booleans true → eee restart.

**V2 cite-correction**: F2/F5 cited CCBP `4527f4d4` (upstream-remote HEAD; fetched but NOT pulled); LOCAL clone HEAD is `48f2ceb`. Content same at both for skills budget guidance. Mia n=331 → **n=332** OVER catch.

**FIRST INSTALL-CLASS MUTATION in W153 arc**: previous fires F1-F6 were doc-only audit. F7 is first concrete config mutation.

**Cumulative architecture audit % update**: TOP-TIER 90.0% unchanged / DEFINITIVE V2+V3 SOTA-reviewed estimate **31-41%** (up from ~30-40% per F7 V2+V3 ship adds to ship-arc) / **Operationally-loaded post-mutation: 521 SKILL.md** (598 - 77) / **Description chars budget pressure: ~131K** (~8.7× over CCBP 15K; down from ~10× per F6).

**Forward direction (post-F7)**:
- F8: ECC sub-category audit (455 SKILL.md = 76% of pre-mutation actual-loaded; V3 prescription)
- F9: ECC localization loader-mechanics probe (zh-CN / ja-JP / ko-KR / tr / zh-TW per F5 V3 finding #3)
- F10: ECC-affaan-m commits 51-batch deep-dive
- F11: per-rule SOTA-review measurement
- F12-F13: cite-anchor refresh (CCBP + ECC-affaan-m)
- F14+: per-domain deep-dives
- OPERATOR-DECISION: CronDelete `9eb2e02a`

**Cardinal-rule conformance**: CR-1 ✅ V2-corrected (local-HEAD `48f2ceb`) / **CR-3 ✅ FULLY SATISFIED V2+V3 PARALLEL (5th non-Phase-1-bootstrap)** / CR-5+6 N/A (config mutation; no install) / CR-7 ✅ Phase 1 ACTIVE / CR-8 ✅ TIER-3-LOCAL-COMPOSITION + local-vs-upstream-HEAD distinction disclosed / CR-9 ✅ install-risk LOW (reversible boolean flip; no marketplace-clone deletion) / CR-10 ✅ research-first via V2+V3 / CR-11 ✅ META-process / CR-12 ✅ PARTIAL-OVERLAP CONFIG-PRUNE (3rd cumulative).

**FM defense**: FM-02 (b)+(c) atomic narrow `--only` ✓ via ship-script wrapper / **FM-09 V3 ADVERSARIAL 17/17 → 18/18 firm** / FM-15 ✓ / FM-17.f orchestrator-direct V2+V3 ✓ / FM-21.a CronCreate defense ✓ / FM-21.b STATE PROBE ✓ / FM-21.c risk continuing / **FM-20 path-drift cascade defense ACTIVE** — V2 caught local-HEAD vs upstream-HEAD cite drift.

**Risk class**: LOW per launch-discipline D1 (reversible boolean flip; cache preserved; CR-12 upstream install source preserved; no security impact).

**Revert**: `git revert <SHA>` → 4 booleans flip back true → eee restart. <30s.

**Ladders**:
- USER-CORRECTION-ACK n=23 unchanged
- **Mia n=331 → n=332** (V2 cite-correction local-HEAD vs upstream-HEAD)
- **FM-09 codex-rescue blind-spot specialization 17/17 → 18/18 firm** (9 consecutive arcs)
- **Path P 6-param strict-conform n=34 → n=36** (V2+V3 PARALLEL)
- **Pattern D Forward Discipline #2 n=34 → n=36**
- **CR-3 non-Phase-1-bootstrap satisfaction n=4 → n=5**
- **CR-12 PARTIAL-OVERLAP cumulative n=2 → n=3** (F2 CITE-PATTERN-ONLY + F5 CONFIG-PRUNE + F7 CONFIG-PRUNE)
- **CR-12 NEW candidate classes (V3)**: ACTIVE-HOOK/FRAMEWORK-CONTEXT + plugin-supplied-MCP-surface + LOW-COST-ARCHITECTURE-COMPANION (cross-arc n=2+ for codification)
- **FIRST INSTALL-CLASS mutation in W153 arc** (settings.json 4-line edit)
- **77 SKILL.md disabled** (reversible on next eee launch)
- **~17,610 description chars freed** (~1.17× CCBP budget recovered)
- Inline-bash quote-trap n=20 unchanged
- Cron `9eb2e02a` iteration 5/N

**Files committed**:
- `.claude/settings.json` (4 boolean flips; lines 527-530)
- `docs/wave153-f7-plugin-disable-ship-2026-05-11.md` (NEW; ~180 LOC)
- `docs/install-provenance.md` (this entry append; ~80 LOC)

**Update triggers**: eee next-launch verifies 4 plugins NOT in `/plugin` listing / ECC sub-category audit F8 lands / mcp-server-dev usage signal observed / operator decides further actions.
