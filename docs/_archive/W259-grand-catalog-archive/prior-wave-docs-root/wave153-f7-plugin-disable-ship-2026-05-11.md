# Wave 153 Fire 7 — Plugin-disable ship (4 plugins; V2+V3 convergent APPROVE; FM-09 17/17 → 18/18 firm; CR-3 cross-model gate FULLY SATISFIED 5th non-Phase-1-bootstrap)

# Reference: TIER-1-USER-DIRECTIVE 2026-05-11 PM `/loop 5m` cron 9eb2e02a recurring
# Reference: TIER-1-DIRECT W153 F6 actual-loaded probe `91c6957` (598 SKILL.md / ECC 76.1% dominance / 5-plugin safe-disable candidate list)
# Reference: TIER-1-DIRECT CCBP `Z:/repos/deps/claude-code-best-practice-shan/reports/claude-skills-for-larger-mono-repos.md @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` (V2 CITE-CORRECTION: local clone HEAD `48f2ceb` NOT prompt's `4527f4d4`; F2/F3/F5 cites referenced upstream remote HEAD that wasn't pulled. Skills budget guidance same content at both SHAs — auto-discovery soft budget not hard cliff)
# Reference: TIER-1-DIRECT W153 F5 cite-correction `3b16ee6` (15K budget source = `reports/claude-skills-for-larger-mono-repos.md` NOT `best-practice/claude-skills.md`)
# Cite-class: constituents=[TIER-1-USER-DIRECTIVE, TIER-1-DIRECT @ CCBP `48f2ceb` (V2 local-HEAD cite-correction; refines V2/V3 4527f4d4 cite), TIER-1-DIRECT @ W153 F5+F6 V2+V3 convergent prescriptions, TIER-3-LOCAL-COMPOSITION @ Wave 153 F7 actual mutation + Mia synthesis]; effective_tier=TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8

## Trigger + cron discipline

Cron `9eb2e02a` iteration 5/N (per CronList probe). FM-21.a CronCreate defense: skipped duplicate. Per F6 Forward direction → F7 = V2+V3 PARALLEL convergence review on F6 safe-disable list.

## Cross-model gate CR-3 FULLY SATISFIED (5th non-Phase-1-bootstrap)

W152 F29 1st / W153 F1 2nd / W153 F2 3rd / W153 F5 4th / **W153 F7 5th cumulative**.

V2+V3 dispatched PARALLEL (background). Both completed clean exit 0.

**V2 codex T1 Path P REAL GPT-5.5** (`.claude/state/codex_consult_w153_f7_disable_list_v2_OUT.txt`; 161,521 tokens): **APPROVE-LIST conf=0.87**. Primary critique: "List sound but F6 under-disclosed non-skill components: outputai SessionStart hook/agents and clickhouse plugin MCP." `approve_ship_immediately: true`.

**V3 codex T1 Path P REAL GPT-5.5 ADVERSARIAL** (`.claude/state/codex_consult_w153_f7_disable_list_v3_adversarial_OUT.txt`; 131,372 tokens): **NEEDS-REVISION-F6 conf=0.88; FM-09 17/17 → 18/18 firm**. Single most-likely-F6-MISS: "Disabling mcp-server-dev is the most likely regret — removes official Anthropic MCP-building guidance from MCP-centric runtime for only 3 skills saved."

## V2+V3 CONVERGENT verdict

| Plugin | V2 approve | V3 approve | CONVERGED action |
|---|---|---|---|
| outputai | ✅ | ✅ | **DISABLE** |
| qdrant-skills | ✅ | ✅ | **DISABLE** |
| mcp-server-dev | ✅ | ❌ (V3 SAVED-SHIP) | **KEEP** (V3 regret-risk catch) |
| clickhouse | ✅ | ✅ | **DISABLE** |
| cwc-makers | ✅ | ✅ | **DISABLE** |

**Final converged disable list: 4 plugins** (outputai + qdrant-skills + clickhouse + cwc-makers); **KEEP mcp-server-dev** per V3 SAVED-SHIP catch.

**Savings (V3 empirical refinement)**:
- 4-plugin total: **77 SKILL.md disabled** (vs F6 80; -3 for mcp-server-dev retention)
- Description chars freed: **~17,610** (V3 measured 18,948 for 5 plugins; subtract mcp-server-dev's 1,342)
- = **~1.17× CCBP 15K budget recovered**

## CR-12 class corrections (V3 empirical)

- outputai: **ACTIVE-HOOK/FRAMEWORK-CONTEXT** plugin (NOT PROVIDER-COMPLEMENT) — SessionStart hook injects Output.ai context every session; 47 skills + 5 agents + 1 hook (not skills-only)
- clickhouse: **plugin-supplied MCP surface** (NOT skills-only) — 2 skills + plugin `.mcp.json` for `https://mcp.clickhouse.cloud/mcp` remote MCP endpoint
- cwc-makers: 2 skills + **`/maker-setup` command**
- mcp-server-dev: **LOW-COST MCP-ARCHITECTURE-COMPANION** (KEEP per V3) — only 3 skills; MCP-centric runtime regret risk
- qdrant-skills: dormant DB guidance (KEEP-disable per V2+V3; no MCP/hook/agent)

These corrections refine W152 F29's CR-12 6-class lattice — new candidate disposition classes surfaced (ACTIVE-HOOK/FRAMEWORK-CONTEXT + plugin-supplied-MCP-surface + LOW-COST-ARCHITECTURE-COMPANION). Cross-arc n=2+ for formal lattice extension per cycle-322.

## Hidden dependencies disclosed (V2 + V3)

- outputai disable REMOVES: SessionStart hook (Output.ai context injection); 5 workflow specialist agents; 47 skills. Effect on next eee launch (mid-session unaffected via `.in_use` markers).
- clickhouse disable REMOVES: plugin `.mcp.json` for `https://mcp.clickhouse.cloud/mcp` remote MCP (read-only SQL/schema path); 2 skills.
- cwc-makers disable REMOVES: `/maker-setup` slash command; 2 skills.
- qdrant-skills disable REMOVES: 26 skills (no MCP/hook/agent path).

## Settings.json mutation (this fire)

Lines 527-530 of `.claude/settings.json` (per Read probe):

```diff
-    "clickhouse@claude-plugins-official": true,
-    "outputai@claude-plugins-official": true,
-    "qdrant-skills@claude-plugins-official": true,
-    "cwc-makers@claude-plugins-official": true,
+    "clickhouse@claude-plugins-official": false,
+    "outputai@claude-plugins-official": false,
+    "qdrant-skills@claude-plugins-official": false,
+    "cwc-makers@claude-plugins-official": false,
```

4 lines changed. Effect: next eee launch will NOT load these 4 plugins → ~17,610 description chars freed from auto-discovery budget.

**Reversibility**: flip boolean back true → `eee restart` → plugins re-load. Marketplace clones + cache preserved (no deletion). CR-12 upstream install source preserved per CR-9 install-risk discipline.

## ECC remains the real leverage target (V3 prescription)

V3 empirically measured: ECC has **455 SKILL.md / 60,985 description chars** (mean 134/skill description; not F6's ~250 estimate). ECC alone = **~4× CCBP 15K budget**. This 4-plugin disable saves ~17K but ECC alone needs sub-skill audit to substantively reduce budget pressure.

**F8 candidate (next cron iteration)**: ECC sub-category audit (operationally-critical vs operationally-dormant per-skill classification; use `disable-model-invocation: true` per-skill primitive — 206 precedent instances per F4 finding).

## Cumulative architecture audit % update (post-F7)

- TOP-TIER cite-anchored: 90.0% unchanged
- DEFINITIVE V2+V3 SOTA-reviewed: estimate **31-41%** (up from ~30-40% per F7 V2+V3 4-plugin convergent ship adds to ship-arc cumulative)
- Operationally-loaded SKILL.md baseline: 598 → **521 post-F7-mutation** (598 - 77 = 521)
- Description chars budget pressure: ~149K → **~131K post-F7-mutation** (10× over → ~8.7× over CCBP 15K)

## Forward direction (post-F7)

- **F8** (next cron): ECC sub-category audit (V3 prescription; 455 SKILL.md = 76% of pre-mutation actual-loaded)
- **F9**: ECC localization loader-mechanics probe (zh-CN / ja-JP / ko-KR / tr / zh-TW per W153 F5 V3 finding #3)
- **F10**: ECC-affaan-m commits 51-batch deep-dive
- **F11**: Per-rule SOTA-review measurement
- **F12-F13**: Cite-anchor refresh (CCBP + ECC-affaan-m) batches
- **F14+**: Per-domain deep-dives
- **OPERATOR-DECISION**: CronDelete `9eb2e02a` when convergence reached

## Cardinal-rule conformance

CR-1 ✅ TIER-1-DIRECT @ CCBP `48f2ceb` (V2 cite-correction: local-clone HEAD; refines F2/F5 cite which referenced upstream-remote-but-not-pulled HEAD) + W153 F5+F6 V2+V3 cumulative / **CR-3 ✅ FULLY SATISFIED V2+V3 PARALLEL** (5th non-Phase-1-bootstrap) / CR-5+6 N/A (config mutation; no install) / CR-7 ✅ Phase 1 ACTIVE / CR-8 ✅ TIER-3-LOCAL-COMPOSITION + disclosed local-HEAD vs upstream-HEAD distinction / CR-9 ✅ install-risk LOW (reversible boolean flip; no marketplace-clone deletion; CR-12 upstream install source preserved) / CR-10 ✅ research-first via V2+V3 / CR-11 ✅ META-process / CR-12 ✅ PARTIAL-OVERLAP CONFIG-PRUNE (3rd cumulative invocation post-W153 F2+F5)

## FM defense

- FM-02 (b)+(c) atomic narrow `--only` ✓ via ship-script wrapper
- **FM-09 V3 ADVERSARIAL 17/17 → 18/18 firm** (9 consecutive arcs same-arc 100%; V3 caught mcp-server-dev regret-risk that V2 missed)
- FM-15 git CLI ✓
- FM-17.f orchestrator-direct V2+V3 ✓
- FM-21.a CronCreate defense ✓
- FM-21.b STATE PROBE clause-level smoke ✓
- FM-21.c risk continuing per session-scoped 7-day expire
- FM-20 path-drift cascade defense ACTIVE (V2 caught local-HEAD vs upstream-HEAD cite drift)
- Inline-bash quote-trap n=20 unchanged (no quote-trap surfaced this fire)

## Risk class: LOW per launch-discipline D1

- Reversible: boolean flip back → eee restart → plugins re-load
- Observable: next eee launch shows plugin set change in /plugin listing
- No install action: cache preserved
- No security impact: disabling plugins shrinks attack surface

## Revert

`git revert <SHA>` → settings.json 4 booleans flip back true → eee restart → plugins re-load. <30s.

## Files committed
- `.claude/settings.json` (4 boolean flips: outputai + qdrant-skills + clickhouse + cwc-makers → false)
- `docs/wave153-f7-plugin-disable-ship-2026-05-11.md` (NEW; ~180 LOC)
- `docs/install-provenance.md` (Wave 153 F7 entry append; ~80 LOC)

## Ladders advanced

- USER-CORRECTION-ACK n=23 unchanged
- Mia n=331 → **n=332** (V2 cite-correction local-HEAD `48f2ceb` vs F5 cite remote-HEAD `4527f4d4` — pulled-vs-fetched-only distinction)
- **FM-09 codex-rescue blind-spot specialization 17/17 → 18/18 firm** (9 consecutive arcs)
- **Path P 6-param strict-conform n=34 → n=36** (V2+V3 PARALLEL dispatches)
- **Pattern D Forward Discipline #2 n=34 → n=36**
- **CR-3 non-Phase-1-bootstrap satisfaction n=4 → n=5**
- **CR-12 PARTIAL-OVERLAP cumulative n=2 → n=3** (W153 F2 CITE-PATTERN-ONLY + W153 F5 CONFIG-PRUNE + W153 F7 CONFIG-PRUNE)
- **CR-12 NEW candidate classes surfaced (V3)**: ACTIVE-HOOK/FRAMEWORK-CONTEXT (outputai) + plugin-supplied-MCP-surface (clickhouse) + LOW-COST-ARCHITECTURE-COMPANION (mcp-server-dev — KEEP) — cross-arc n=2+ for formal lattice extension
- **First INSTALL-CLASS mutation in W153 arc** (settings.json 4-line edit; previous fires F1-F6 were doc-only)
- **77 SKILL.md disabled** (4 plugins reversibly disabled on next eee launch)
- **~17,610 description chars freed** (~1.17× CCBP 15K budget recovered)
- Inline-bash quote-trap n=20 unchanged
- Cron `9eb2e02a` iteration 5/N

## Update triggers

Re-evaluate when:
- eee next-launch verifies 4 plugins NOT in `/plugin` listing (smoke test post-restart)
- ECC sub-category audit F8 lands (real leverage target)
- mcp-server-dev usage signal observed (would validate V3 KEEP catch)
- Operator decides further plugin-disable actions (V2 conditional candidate: plugin-dev)
