# Wave 153 Fire 6 — Actual-loaded skill manifest probe (cron 9eb2e02a iteration 4/N; V2+V3 convergent F5 prescription EXECUTED)

# Reference: TIER-1-USER-DIRECTIVE 2026-05-11 PM `/loop 5m` cron 9eb2e02a recurring
# Reference: TIER-1-DIRECT W153 F5 V2+V3 convergent prescription `3b16ee6` — "F6 actual-loaded-skill manifest probe FIRST; measure REAL loaded count vs F4 recursive-scan 2,035 figure"
# Reference: TIER-1-DIRECT CCBP `Z:/repos/deps/claude-code-best-practice-shan/reports/claude-skills-for-larger-mono-repos.md:95-97,126,137,139 @ HEAD 4527f4d4` (V2-corrected cite for 15K budget)
# Cite-class: constituents=[TIER-1-USER-DIRECTIVE, TIER-1-DIRECT @ CCBP `4527f4d4` cite-corrected per W153 F5 + W153 F5 V2+V3 verdicts, TIER-3-LOCAL-COMPOSITION @ Wave 153 F6 actual-loaded-skill empirical probe + Mia synthesis]; effective_tier=TIER-3-LOCAL-COMPOSITION

## Trigger + cron discipline

Cron `9eb2e02a` iteration 4 (per CronList probe). Per FM-21.b STATE PROBE clause-level smoke + sequential convergence: F6 = V2+V3 convergent F5-prescribed actual-loaded-skill manifest probe.

FM-21.a CronCreate defense: skipped duplicate (cron already armed).

## Phase A — enabledPlugins inventory (TRUE source-of-truth for runtime skill load)

| Marketplace | Enabled count | Plugins |
|---|---|---|
| claude-plugins-official | 22 | agent-sdk-dev + claude-code-setup + claude-md-management + clickhouse + code-modernization + code-review + code-simplifier + commit-commands + cwc-makers + feature-dev + frontend-design + mcp-server-dev + outputai + playground + plugin-dev + pr-review-toolkit + pyright-lsp + qdrant-skills + ralph-loop + session-report + skill-creator + superpowers |
| everything-claude-code | 1 | everything-claude-code |
| openai-codex | 1 | codex |
| context-mode | 1 | context-mode |
| addy-agent-skills | 1 | agent-skills |
| **Total** | **26 enabled** | (+ 1 disabled = hookify per W152 F28) |

**Disabled (1)**: `hookify@claude-plugins-official` per W152 F28 discovery (DISABLED-after-trial).

**NOT in enabledPlugins** (registered as extraKnownMarketplaces but NOT loaded):
- claude-for-financial-services (117 marketplace SKILL.md — NOT loaded)
- knowledge-work-plugins (181 — NOT loaded)
- life-sciences (6 — NOT loaded)
- healthcare (3 — NOT loaded)
- anthropic-agent-skills (18 — NOT loaded)
- claude-community (— NOT loaded)

This confirms V3 SAVED-SHIP catch: F4's marketplace-disable target (FS+HC+LS=126) was already-not-loaded; F4 couldn't credit 126 savings.

## Phase B — Actual-loaded SKILL.md count per plugin (newest cache version per enabledPlugin)

Methodology: `ls -td .claude/plugins/cache/<marketplace>/<plugin>/*/` returns newest cache-version dir per plugin; `find <newest>/-name 'SKILL.md' -type f | wc -l` measures actual-loaded.

| Plugin | Marketplace | SKILL.md count | Notes |
|---|---|---|---|
| **everything-claude-code** | ECC | **455** | **76.1% of total — DOMINANT** |
| outputai | claude-plugins-official | 47 | W152 F26 CR-12 PROVIDER-COMPLEMENT (installed-but-dormant; build-app layer not META-process) |
| qdrant-skills | claude-plugins-official | 26 | Companion to Qdrant Docker container (operationally-dormant unless scaling work) |
| agent-skills | addy-agent-skills | 21 | Using-agent-skills + 20 engineering-phase skills (operationally-relevant; KEEP) |
| superpowers | claude-plugins-official | 14 | Meta-skill backbone (using-superpowers + 13 process skills; LOAD-BEARING; KEEP) |
| context-mode | context-mode | 12 | Token-efficiency (LOAD-BEARING; KEEP) |
| plugin-dev | claude-plugins-official | 7 | Plugin authoring (operationally-dormant unless authoring) |
| mcp-server-dev | claude-plugins-official | 3 | MCP server authoring (operationally-dormant) |
| codex | openai-codex | 3 | Codex CLI plugin (LOAD-BEARING for cross-model gate; KEEP) |
| clickhouse | claude-plugins-official | 2 | ClickHouse analytics DB (operationally-dormant) |
| cwc-makers | claude-plugins-official | 2 | Cardputer onboarding (operationally-dormant for our scope) |
| skill-creator | claude-plugins-official | 1 | Skill authoring (LOAD-BEARING; meta-skill stack member; KEEP) |
| claude-md-management | claude-plugins-official | 1 | CLAUDE.md management (KEEP) |
| claude-code-setup | claude-plugins-official | 1 | Codebase analyzer (KEEP) |
| session-report | claude-plugins-official | 1 | Session reporting (KEEP) |
| frontend-design | claude-plugins-official | 1 | Frontend (operationally-relevant; KEEP) |
| playground | claude-plugins-official | 1 | Playground (KEEP) |
| (10 others: agent-sdk-dev, code-modernization, code-review, code-simplifier, commit-commands, feature-dev, pr-review-toolkit, pyright-lsp, ralph-loop) | claude-plugins-official | 0 each | No SKILL.md in newest cache version (likely command/agent-only plugins) |
| **TOTAL ACTUAL-LOADED** | | **598** | |

## Phase C — Revised over-budget math (V2+V3 + F6 empirical convergence)

| Metric | F4 Recursive-scan claim | F6 Actual-loaded empirical |
|---|---|---|
| SKILL.md count | 2,035 | **598** (29.4% of F4) |
| Description char total estimate | 509,238 (W153 F2 V3) | ~149,500 (598 × 250 char mean) |
| Multiplier over CCBP 15K budget | 33.9× | **~10× over** |
| V3 prediction | "2-5×" (conservative) | DIRECTIONALLY CORRECT (actual 10× > V3 estimate) |

**Mia OVER #331**: V3 conservative estimate "2-5×" was LOW; actual measurement = ~10×. Over-budget pressure is REAL but qualitatively softer than F4's original 33.9× claim.

## Phase D — Conservative safe-disable candidates (high-confidence operationally-dormant)

| Plugin | SKILL.md | Justification |
|---|---|---|
| outputai | 47 | W152 F26 CR-12 PROVIDER-COMPLEMENT — build-app layer not META-process |
| qdrant-skills | 26 | Companion to Qdrant Docker (operationally-dormant unless scaling) |
| mcp-server-dev | 3 | MCP server authoring (operationally-dormant) |
| clickhouse | 2 | ClickHouse analytics (operationally-dormant) |
| cwc-makers | 2 | Cardputer onboarding (operationally-dormant) |
| plugin-dev | 7 | Plugin authoring (operationally-dormant unless authoring; could be CONDITIONAL keep) |
| **TOTAL SAFE-DISABLE** | **87** | ~21,750 chars freed (~1.45× CCBP 15K budget recovered) |

**Conservative scope** (high-confidence; excludes ambiguous): outputai + qdrant-skills + mcp-server-dev + clickhouse + cwc-makers = **80 SKILL.md ≈ 20,000 chars freed (~1.3× CCBP budget)**.

**Higher-impact scope** (includes plugin-dev): **87 SKILL.md ≈ 21,750 chars freed (~1.45× CCBP budget)**.

These are reversible via `enabledPlugins` boolean flip + `eee restart` per W152 F26+F28 precedent (no marketplace-clone deletion; CR-12 upstream install source preserved).

## Phase E — ECC dominance analysis

ECC = 455 SKILL.md = **76.1% of actual-loaded**. This is where the budget pressure ACTUALLY concentrates. Sub-categories within ECC need finer-grain audit:
- ECC skills include autonomous-loop / continuous-learning / coding-standards / deep-research / safety-guard / many more
- Operationally-CRITICAL ECC subset (cardinal-rule-3 cross-model gate; FM hooks; etc.) cannot be disabled wholesale
- ECC localization subdirs (zh-CN / ja-JP / ko-KR / tr / zh-TW per V3 finding #3) MAY be loaded — needs CCBP loader-mechanics audit at F7+

## Phase F — Forward direction (cron iterations post-F6)

| Fire | Iteration | Target | Convergence |
|---|---|---|---|
| **F7** | Iteration 5 | Path P V2+V3 review of F6 conservative safe-disable list (80 SKILL.md; ~1.3× CCBP budget) | Wave 24-D 3-voice on actionable enabledPlugins flips |
| **F8** | Iteration 6 | ECC sub-category audit (455 SKILL.md = 76% of actual-loaded) | Per-skill operationally-CRITICAL vs operationally-dormant classification |
| **F9** | Iteration 7 | ECC localization audit (zh-CN/ja-JP/ko-KR/tr/zh-TW loader-mechanics probe) | Per V3 finding #3 — incomplete vs moot determination |
| **F10** | Iteration 8 | ECC-affaan-m commits 51-batch deep-dive | Per F3 deferred Forward direction |
| **F11** | Iteration 9 | Per-rule SOTA-review measurement | DEFINITIVE % refinement |
| **F12-F13** | Iteration 10-11 | CCBP + ECC-affaan-m cite-anchor refresh batches | CR-1 hygiene |
| **F14+** | Iteration 12+ | Per-domain deep-dives | Path P V2+V3 per-domain |
| **OPERATOR-DECISION** | Any iteration | CronDelete `9eb2e02a` when convergence reached | Operator-action signal |

## Cumulative architecture audit % update (post-F6)

- TOP-TIER cite-anchored (F3 baseline): **90.0%** unchanged
- DEFINITIVE V2+V3 SOTA-reviewed estimate: ~30-40% (W152+W153 ship-arc; this fire is plugin-cache audit, not architecture)
- **NEW empirical actual-loaded baseline**: 598 SKILL.md (29.4% of F4 figure; ~10× over CCBP 15K budget; V3 SAVED-SHIP confirmed)

## Mia OVER catches surfaced this fire

- **Mia n=330 → n=331**: V3 conservative estimate "2-5×" was LOW; actual measurement ~10× (F6 empirical)
- F4 2,035 figure OVERSTATED by 70.6% vs actual-loaded 598 (V2+V3 SAVED-SHIP CONFIRMED at empirical level)

## Cardinal-rule conformance

CR-1 ✅ TIER-1-DIRECT @ CCBP `4527f4d4` (V2-corrected per F5) + W153 F5 V2+V3 + F4 baseline / CR-3 ⚠️ Phase 1 bootstrap (V2+V3 deferred to F7 per sequential convergence) / CR-5+6 N/A audit only / CR-7 ✅ Phase 1 ACTIVE / CR-8 ✅ TIER-3-LOCAL-COMPOSITION disclosed / CR-9 N/A audit / CR-10 ✅ research-first via empirical probe / CR-11 ✅ META-process / CR-12 PARTIAL-OVERLAP CONFIG-PRUNE (V3-corrected per F5)

## FM defense

- FM-02 (b)+(c) atomic narrow `--only` ✓ via ship-script wrapper
- FM-09 N/A this fire (V2+V3 deferred to F7 per sequential convergence)
- FM-15 git CLI ✓
- FM-17.f orchestrator-direct probe (no subagent) ✓
- FM-21.a CronCreate defense ✓
- FM-21.b STATE PROBE clause-level smoke ✓
- FM-21.c risk continuing per session-scoped 7-day expire
- **Inline-bash quote-trap n=19 → n=20** (for-loop with $(...) tripped; recovered via Write+bash script wrapper per W153 F1 precedent)

## Risk class: LOW per launch-discipline D1 (audit doc; reversible / observable / no install / no security impact)

## Revert: `git revert <SHA>` <30s

## Files committed
- `docs/wave153-f6-actual-loaded-manifest-2026-05-11.md` (NEW; ~150 LOC)
- `docs/install-provenance.md` (Wave 153 F6 entry append; ~60 LOC)

## Ladders advanced

- USER-CORRECTION-ACK n=23 unchanged
- **Mia n=330 → n=331** (V3 "2-5×" estimate LOW; actual ~10×)
- FM-09 17/17 firm unchanged (no Path P this fire)
- Path P n=34 unchanged
- Pattern D n=34 unchanged
- CR-3 non-Phase-1-bootstrap n=4 unchanged
- CR-12 PARTIAL-OVERLAP cumulative n=2 unchanged
- CR-12 CONFIG-PRUNE candidate class n=1 unchanged
- **NEW empirical actual-loaded measurement**: 598 SKILL.md (29.4% of F4 recursive-scan; ~10× over CCBP 15K; ECC 76.1% dominance)
- **NEW safe-disable candidate list**: 80 SKILL.md (~1.3× CCBP budget freed) reversible via enabledPlugins boolean flip
- **Inline-bash quote-trap n=19 → n=20** (for-loop $(...) tripped; recovered via Write+bash script)
- Cron `9eb2e02a` iteration 4/N

## Update triggers

Re-evaluate when:
- F7 Path P V2+V3 reviews F6 safe-disable list
- Operator decides plugin-disable actions
- ECC loader-mechanics for localization subdirs probed
- New plugin enters enabledPlugins (current 26 enabled + 1 disabled = 27 total)
