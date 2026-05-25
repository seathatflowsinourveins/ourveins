# Wave 153 Fire 4 — Skill topology + context-budget audit (cron 9eb2e02a iteration 2/N; W153 F2 V3 SAVED-SHIP #1 prescription EXECUTED)

# Reference: TIER-1-USER-DIRECTIVE 2026-05-11 PM `/loop 5m` cron 9eb2e02a recurring
# Reference: TIER-1-DIRECT CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-skills.md @ HEAD 4527f4d4` (15K total description budget for skill auto-discovery)
# Reference: TIER-1-DIRECT W153 F2 V3 SAVED-SHIP @ `d5d8fde` — empirical 509,238 chars across 2,035 SKILL.md = 33.9× CCBP 15K budget
# Reference: TIER-1-DIRECT CCBP `best-practice/claude-settings.md:99 @ HEAD 4527f4d4` — `skillOverrides` global mode (REJECT-FOR-FIT for our system per Mia n=326 — would BREAK 4-skill meta-stack auto-fire dependency)
# Cite-class: constituents=[TIER-1-USER-DIRECTIVE, TIER-1-DIRECT @ CCBP + W153 F2, TIER-3-LOCAL-COMPOSITION @ Wave 153 F4 measurement synthesis]; effective_tier=TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8

## Trigger + cron iteration discipline

Cron `9eb2e02a` recurring `*/5 * * * *` iteration 2/N (F4). Per FM-21.b STATE PROBE clause-level smoke + sequential convergence pattern documented in F3: this fire executes the F4 ship from F3 Forward direction table.

Per FM-21.a CronCreate defense: **NO duplicate CronCreate** this fire (cron `9eb2e02a` already armed; CronList confirmed active).

## Phase A — Per-marketplace SKILL.md inventory (empirical)

| Marketplace | SKILL.md count | Source orientation |
|---|---|---|
| everything-claude-code | 455 | ECC autonomous-loop infrastructure |
| knowledge-work-plugins | 181 | Office/sales/marketing/HR vertical-domain |
| claude-for-financial-services | 117 | FS vertical-domain (LARGE; likely operationally-dormant for our scope) |
| claude-plugins-official | 28 | Anthropic OFFICIAL canonical |
| addy-agent-skills | 22 | Addy Osmani / Google Chrome named-T2 |
| anthropic-agent-skills | 18 | Anthropic OFFICIAL TIER-1 |
| context-mode | 12 | mksglu/context-mode (token-eff) |
| life-sciences | 6 | Vertical-domain |
| openai-codex | 3 | OpenAI codex CLI plugin |
| healthcare | 3 | Vertical-domain |
| **Marketplace total** | **845** | |
| **Cache-tier total** (runtime-loaded via `enabledPlugins`) | **1,190** | snapshot-duplicate accumulation per commit |
| **Cumulative** | **2,035** | per W153 F2 V3 SAVED-SHIP |

## Phase B — Cache-tier snapshot-duplicate finding (NEW)

**Critical discovery**: 1,190 cache-tier SKILL.md is largely snapshot-duplicates from commit-tagged cache directories. Top-20 verbose offenders ALL show `claude-plugins-official/plugin-dev/hook-development/SKILL.md` (525 chars) repeated **20+ times across cache-SHA snapshots** (e.g., `e56e2256/`, `b4283fd1/`, `e0650c4c/`, `bd91e20a/`, `a0ec9179/` ... commit-tagged dirs).

**Per CCBP `cleanupPeriodDays` default 30 days** — cache snapshot accumulation auto-prunes after 30d; current bloat is INSIDE the cleanup window. Bloat is RUNTIME-OBSERVABLE (descriptions LOAD into 15K budget → arbitrary truncation/dropping).

## Phase C — Top single-skill verbose-description offenders

| Length | Skill | Notes |
|---|---|---|
| 774 chars | `everything-claude-code/docs/zh-CN/skills/prompt-optimizer/SKILL.md` | Chinese localization (zh-CN) — likely operationally-dormant for English session |
| 583 | `everything-claude-code/skills/videodb/SKILL.md` | Multimedia DB — vertical-domain |
| 572 | `everything-claude-code/docs/zh-CN/skills/videodb/SKILL.md` | zh-CN dup |
| 525 | `claude-plugins-official/plugin-dev/hook-development/SKILL.md` | Plugin authoring; LOW operational value (we're install-class consumer) |

Per-skill description mean ~250 chars. **509K total / 15K CCBP budget = 33.9× OVER** = arbitrary auto-discovery truncation/dropping.

## Phase D — Existing `disable-model-invocation` precedent (206 instances)

Empirical: **206 instances of `disable-model-invocation: true`** already exist across `.claude/plugins/`. This is the SAFE per-skill primitive (avoids skillOverrides global per Mia n=326 REJECT-FOR-FIT). Establishes that operator-discipline + skill-author-discipline both adopt this primitive.

## Phase E — V3 SAVED-SHIP remediation strategy (categories)

Three remediation paths (V2+V3 convergence review deferred to F5+ per sequential convergence pattern):

1. **Marketplace-level disable** (en-masse; high impact) — disable plugins serving operationally-dormant vertical domains for our scope:
   - `claude-for-financial-services` (117 SKILL.md) — FS vertical; not in our scope
   - `life-sciences` (6) — vertical; not in our scope
   - `healthcare` (3) — vertical; not in our scope
   - `knowledge-work-plugins` partial (181 SKILL.md spans many subdirs; selective) — vertical-mix
   - **Estimated savings**: 117+6+3 = **126 SKILL.md** disabled with high confidence; ~250 chars mean = **~31.5K chars freed** = ~2.1× CCBP budget recovered alone

2. **zh-CN localization disable** — `everything-claude-code/docs/zh-CN/skills/*` are Chinese localizations; redundant for English operator. Sample top-2 = 774+572 chars; subdir likely 50+ SKILL.md = **~15K chars** freed.

3. **Per-skill `disable-model-invocation: true`** — fine-grained for individual high-cost low-value skills. Safer than marketplace-disable when partial-relevance.

## Phase F — Forward direction (subsequent cron firings)

| Fire | Iteration | Target | Convergence |
|---|---|---|---|
| **F5** | Iteration 3 | Path P V2 + V3 ADVERSARIAL convergence on F4 remediation strategy | Wave 24-D 3-voice on plugin-disable candidate list |
| **F6** | Iteration 4 | ECC-affaan-m commits 51-batch deep-dive (sample top 10) | Path P V2+V3 on Wave 75-equivalent adoption candidates |
| **F7** | Iteration 5 | Per-rule SOTA-review status systematic measurement | Refine ~30-40% V2+V3 estimate with per-rule audit |
| **F8** | Iteration 6 | CCBP cite-anchor refresh `64fffd53` → `4527f4d4` (bundle with audit findings) | Per-rule audit + refresh batch |
| **F9** | Iteration 7 | ECC-affaan-m cite-anchor refresh `841beea4` → `4220f1b0` | Per-rule audit + refresh batch |
| **F10+** | Iteration 8+ | Per-domain skill / agent / command deep-dives | Path P V2+V3 per-domain |
| **OPERATOR-DECISION** | Any iteration | CronDelete `9eb2e02a` when convergence reached | Operator-action signal per FM-21.b STAND-DOWN |

## Cumulative architecture audit % update (post-F4)

Per F3 baseline (90.0% top-tier cite-anchored):
- **+ Skill topology empirical measurement** (this fire)
- + 845 marketplace SKILL.md inventoried (per-source-tier)
- + 206 `disable-model-invocation` precedent confirmed
- + Top-N verbose offenders identified

**Audit % refinement**: TOP-TIER cite-anchored UNCHANGED at 90.0% (this fire is plugin-cache audit not architecture audit). Plugin-cache is INSTALL-class via marketplace; cite-anchor discipline applies to OUR rules/agents/hooks/docs not vendored plugin SKILL.md content.

**DEFINITIVE V2+V3 SOTA-reviewed estimate**: ~30-40% unchanged (this fire is Phase 1 bootstrap exception orchestrator-direct measurement; V2+V3 convergence on remediation deferred to F5).

## Cardinal-rule conformance

CR-1 ✅ TIER-1-DIRECT @ CCBP `4527f4d4` (claude-skills.md 15K budget + claude-settings.md:99 skillOverrides) + W153 F2 V3 SAVED-SHIP cite / CR-3 ⚠️ Phase 1 bootstrap (V2+V3 deferred to F5+ per sequential convergence) / CR-5+6 N/A audit / CR-7 ✅ Phase 1 ACTIVE / CR-8 ✅ TIER-3-LOCAL-COMPOSITION disclosed / CR-9 N/A no install / CR-10 ✅ research-first / CR-11 ✅ META-process / CR-12 PARTIAL-OVERLAP

## FM defense

- FM-02 (b)+(c) atomic narrow `--only` ✓ via ship-script wrapper
- FM-09 N/A this fire (no Path P; sequential convergence deferred V2+V3 to F5)
- FM-15 git CLI ✓
- FM-17.f orchestrator-direct ✓
- FM-21.a CronCreate defense ✓ (skipped duplicate cron creation; CronList probed first)
- FM-21.b STATE PROBE ✓ (15-clause classification documented)
- FM-21.c risk: cron-replay accumulation continuing per session-scoped 7-day expire; operator CronDelete escape hatch documented
- Inline-bash quote-trap **n=18 → n=19** (one Bash invocation failed `unexpected EOF` with awk-quoting; recovered via subset analysis from prior probes)

## Risk class: LOW per launch-discipline D1 (audit doc; reversible / observable / no install / no security impact)

## Revert: `git revert <SHA>` <30s

## Files committed
- `docs/wave153-f4-skill-topology-audit-2026-05-11.md` (NEW; ~150 LOC)
- `docs/install-provenance.md` (Wave 153 F4 entry append; ~60 LOC)

## Ladders advanced

- USER-CORRECTION-ACK n=23 unchanged (cron-replay; not user-correction)
- Mia n=326 unchanged
- FM-09 16/16 firm unchanged (no Path P this fire)
- Path P n=32 unchanged (no Path P this fire — sequential convergence pattern)
- Pattern D n=32 unchanged
- CR-3 non-Phase-1-bootstrap n=3 unchanged
- **NEW Inline-bash quote-trap n=18 → n=19** (awk-pipe quote tripped; recovered via prior-probe data)
- **NEW SKILL.md per-marketplace inventory measured** (10 marketplaces / 845 marketplace + 1,190 cache = 2,035 total)
- **NEW snapshot-duplicate cache finding** (cache mostly snapshot-dupes per cleanupPeriodDays 30d window)
- **NEW disable-model-invocation precedent confirmed** (206 instances; SAFE per-skill primitive vs Mia-rejected skillOverrides global)
- **NEW top-N verbose-description offenders identified** (zh-CN localization + videodb + plugin-dev hook-development)
- **NEW remediation strategy with 3 categories** (marketplace-disable / zh-CN-disable / per-skill disable-model-invocation)
- Cron `9eb2e02a` iteration 2 of N

## Update triggers

Re-evaluate when:
- Cron iteration produces V2+V3 convergence on F4 remediation strategy (F5)
- Operator decides remediation actions (which marketplaces to disable; which per-skill flags to set)
- CCBP `cleanupPeriodDays` default changes
- New marketplace adds significant SKILL.md count (current top-3: ECC 455 + knowledge-work 181 + FS 117)
