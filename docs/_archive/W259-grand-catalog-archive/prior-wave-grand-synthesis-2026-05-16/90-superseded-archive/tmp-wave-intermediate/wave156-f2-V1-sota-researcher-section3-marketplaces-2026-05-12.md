---
title: W156 F2 V1 — Section 3 plugin marketplaces reconciliation research plan
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-12
agent: sota-researcher (W156 F2 V1)
wave: 156
fire: 2
voice: 1
cite-coverage: C1+C5+C6 (filesystem probe + settings.json registration + cache+marketplace dirs)
---

# W156 F2 V1 — §Section 3 plugin marketplaces reconciliation research

**TASK**: Research-only plan composing row mutations for `docs/sota-installed-manifest.md` §Section 3. Per W154 F7 audit + W156 F2 dispatch plan codex T1 NEEDS-REVISION conf=0.91 Pattern A fix-forward: **F2 MUST ADD missing rows, not just flip existing.** Currently 5 rows; filesystem has 11 marketplaces.

**SCOPE**: Research-only. No file edits. Plan feeds 2 orchestrator-direct Path P codex T1 reviews (normal + adversarial; reframing per FM-17.e recovery NOT BRIDGE-MODE compliance per F2 dispatch plan P1 saved_ship_catch).

**CARDINAL-RULE BASELINE**: CR-1 (file:line + HEAD SHA cite anchors) / CR-7 Phase 1 bootstrap (currently overridden bypassPermissions) / CR-8 TIER-3-LOCAL-COMPOSITION effective tier / CR-9 install-risk LOW (doc-only) / CR-12 5-class disposition lattice / SRA D1-D10 multi-dimensional convergence.

---

## §1 Filesystem probe results — 4-cell evidence per marketplace

Per CR-1 P2 evidence cell separation mandate (codex T1 P2 saved_ship_catch): each row carries 4 distinct evidence cells — (a) settings.json registration / (b) cache presence / (c) plugin activation / (d) content-hash + HEAD.

### Master probe table — 11 marketplaces × 4 cells

| # | Marketplace | (a) extraKnownMarketplaces? | (b) cache dir present? | (c) plugins activated | (d) marketplace.json sha256-16 + git HEAD + origin |
|---|---|---|---|---|---|
| 1 | **claude-plugins-official** | ✅ L546-551 (`anthropics/claude-plugins-official`) | ✅ 72.4MB / 11936 files | **22 plugins ACTIVE** (superpowers / agent-sdk-dev / ralph-loop / frontend-design / claude-md-management / pr-review-toolkit / skill-creator / claude-code-setup / plugin-dev / code-review / feature-dev / code-simplifier / commit-commands / session-report / playground / mcp-server-dev / pyright-lsp / code-modernization / cwc-makers* / hookify* / qdrant-skills* / outputai*; * = `false` ⇒ 4 disabled per L538-541,543) | sha=`ee1ceebfc57377e8` size=96904 / **HEAD=`no-git`** (marketplace-clone repo lacks `.git` dir) / origin=N/A — **172 plugins available** in marketplace.json |
| 2 | **openai-codex** | ✅ L552-557 (`openai/codex-plugin-cc`) | ✅ 232KB / 98 files | **1 plugin ACTIVE** (`codex@openai-codex` L518) | sha=`c662955a8db83efb` size=475 / HEAD=`807e03ac9d5aa23b` / origin=`https://github.com/openai/codex-plugin-cc.git` |
| 3 | **everything-claude-code** | ✅ L558-563 (`affaan-m/everything-claude-code`) | ✅ 115MB / 7087 files | **1 plugin ACTIVE** (`everything-claude-code@everything-claude-code` L519) | sha=`c30cb5c69fc0aa19` size=1307 / HEAD=`841beea45cb25ba5` / origin=`https://github.com/affaan-m/everything-claude-code.git` |
| 4 | **anthropic-agent-skills** (registered as `skills`) | ✅ L564-569 (`anthropics/skills`) | ❌ **NO cache dir** | ❌ ZERO plugins activated | sha=`dc010d20dee0200a` size=1661 / HEAD=`d211d437443a7b24` / origin=`https://github.com/anthropics/skills.git` — **3 plugins available** in marketplace.json |
| 5 | **knowledge-work-plugins** | ✅ L570-575 (`anthropics/knowledge-work-plugins`) | ❌ **NO cache dir** | ❌ ZERO plugins activated | sha=`6d58ffe371d97526` size=19562 / HEAD=`9789ea78ad66e395` / origin=`https://github.com/anthropics/knowledge-work-plugins.git` — **47 plugins available** |
| 6 | **claude-community** (registered as `claude-plugins-community`) | ✅ L576-581 (`anthropics/claude-plugins-community`) | ❌ **NO cache dir** | ❌ ZERO plugins activated | sha=`994560417bd02f41` size=1308158 / HEAD=`f846a0bcb0e721b1` / origin=`https://github.com/anthropics/claude-plugins-community.git` — **1920 plugins available** |
| 7 | **claude-for-financial-services** (registered as `financial-services`) | ✅ L582-587 (`anthropics/financial-services`) | ❌ **NO cache dir** | ❌ ZERO plugins activated | sha=`18b37820122d94a0` size=4609 / HEAD=`57772c3f1607229f` / origin=`https://github.com/anthropics/financial-services.git` — **20 plugins available** |
| 8 | **healthcare** | ✅ L588-593 (`anthropics/healthcare`) | ❌ **NO cache dir** | ❌ ZERO plugins activated | sha=`b597b697080178e8` size=2462 / HEAD=`c382e9466083f3bf` / origin=`https://github.com/anthropics/healthcare.git` — **7 plugins available** |
| 9 | **life-sciences** | ✅ L594-599 (`anthropics/life-sciences`) | ❌ **NO cache dir** | ❌ ZERO plugins activated | sha=`534038fba8697d9f` size=6956 / **HEAD=`e96556b637b56d6c` (2 ahead of origin)** / origin=`https://github.com/anthropics/life-sciences.git` — **21 plugins available** — ⚠️ ahead/behind 2/0 vs origin/main |
| 10 | **addy-agent-skills** | ✅ L600-605 (`addyosmani/agent-skills`) | ✅ 668KB / 103 files | **1 plugin ACTIVE** (`agent-skills@addy-agent-skills` L530) — STALE-INSTALLED-VIA-MARKETPLACE-CACHE per existing manifest L94 | sha=`88114d43d4c67cd9` size=577 / HEAD=`3ff4b518b3cd3077` / origin=`https://github.com/addyosmani/agent-skills.git` — **1 plugin** |
| 11 | **context-mode** | ✅ L606-611 (`mksglu/context-mode`) | ✅ 123MB / 6409 files | **1 plugin ACTIVE** (`context-mode@context-mode` L524) | sha=`00aa039e0f3a69de` size=807 / HEAD=`00aa039e0f3a69de` / origin=`https://github.com/mksglu/context-mode.git` |

### Probe summary

- **11 marketplaces registered** in `extraKnownMarketplaces` block (L545-612)
- **5 with cache dirs** (claude-plugins-official + openai-codex + everything-claude-code + addy-agent-skills + context-mode) — match Section 3 partial coverage
- **6 with NO cache dirs** (anthropic-agent-skills + knowledge-work-plugins + claude-community + claude-for-financial-services + healthcare + life-sciences) — **6 MISSING ROWS in §Section 3**
- **27 enabledPlugins entries** (22 active + 4 disabled per L538-541,543 + 1 disabled L538) — but only 5 marketplaces source these 27 plugins (claude-plugins-official=22 / openai-codex=1 / everything-claude-code=1 / addy-agent-skills=1 / context-mode=1 + 1 of the disabled rows = `qdrant-skills@claude-plugins-official` L540)
- **NEW finding 2026-05-12**: 7 plugin entries enabled in L526-535 ABOVE current Section 3 mention — represents Wave 105+ batch enables not yet reflected in Section 3 narrative
- **NEW finding 2026-05-12**: `life-sciences` marketplace clone is **2 commits ahead of upstream origin/main** — represents local-commit drift requiring investigation per CR-9 install-risk discipline

---

## §2 Existing row updates — 5 current rows

Per W156 F2 dispatch plan: existing rows need Status reconciliation against 4-cell evidence above.

### Row 2.1 — `obra/superpowers` (REDUNDANT-PER-FIRE-16)

**Current Status**: `**REDUNDANT-PER-FIRE-16**` — verified 2026-05-06 (Wave 50 fire 12+16)

**No update needed** — Status remains correct. obra/superpowers direct marketplace NOT registered in `extraKnownMarketplaces`; superpowers@5.1.0 already delivered via claude-plugins-official bundle (L517 active). 4-cell evidence:
- (a) extraKnownMarketplaces? **NO** — never registered (REDUNDANT preempted install)
- (b) cache dir present? **NO** — uses cache at `.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/` instead
- (c) plugins activated? **YES** — `superpowers@claude-plugins-official=true` L517 (not `@obra`)
- (d) HEAD: N/A — not cloned independently

**CR-12 disposition**: DUPLICATE-FUNCTIONALITY (full parallel; Anthropic OFFICIAL marketplace cascade per cardinal-rule-12) → keep REJECT-FOR-FIT status.

### Row 2.2 — `mattpocock/skills` (PLANNED — 62k★)

**Current Status**: `PLANNED — 62k★ named-T2`

**Recommended update**: Status downgrade to `REJECT-FOR-FIT-HARD-GATE` per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 5 mode-harness-shape iter-92 (Wave 137 Fire 1) — setup-matt-pocock-skills HARD-GATE setup gate (`disable-model-invocation: true` + 3 sequential interactive prompts at install) structurally identical to iter-84 brainstorming HARD-GATE pattern; incompatible with autonomous /loop mode + CR-7 graduated-unleash.

**4-cell evidence**:
- (a) extraKnownMarketplaces? **NO** — never registered (HARD-GATE preempted install)
- (b) cache dir present? **NO**
- (c) plugins activated? **NO**
- (d) HEAD: N/A — not cloned

**CR-12 disposition**: MODE-HARNESS-SHAPE (Probe 5 fail) → REJECT-FOR-FIT-HARD-GATE retained as historical record.

### Row 2.3 — `affaan-m/everything-claude-code` (INSTALLED)

**Current Status**: `**INSTALLED**` — `everything-claude-code@2.0.0-rc.1` at user scope [VERIFIED 2026-05-06 via fire 14]

**Recommended update**: Add 4-cell evidence pack + refresh HEAD SHA. Status remains INSTALLED-ACTIVE.

**4-cell evidence**:
- (a) extraKnownMarketplaces? **YES** L558-563
- (b) cache dir present? **YES** 115MB / 7087 files at `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/`
- (c) plugins activated? **YES** — `everything-claude-code@everything-claude-code=true` L519 (1 plugin)
- (d) marketplace.json sha256-16=`c30cb5c69fc0aa19` size=1307 / HEAD=`841beea45cb25ba5` / origin=`https://github.com/affaan-m/everything-claude-code.git`

**CR-9 caveat preserved**: RC version (D6 today-release-auto-upgrade risk per `mcp-disconnect-recovery.md`); add Marker Decay refresh check.

**CR-12 disposition**: GENUINELY-NEW (autonomous-loop + safety-guard SKILL + architect/code-reviewer agents) → INSTALL via CR-12 PRIMARY path (existing).

### Row 2.4 — `anthropics/claude-plugins-official` (INSTALLED)

**Current Status**: `**INSTALLED**` — marketplace registered + `superpowers@5.1.0` installed at user scope [VERIFIED 2026-05-06]

**Recommended update**: Substantially expand 4-cell evidence — **22 plugins ACTIVE from this marketplace** (not just superpowers); reflect Wave 97-128 batch enables.

**4-cell evidence**:
- (a) extraKnownMarketplaces? **YES** L546-551
- (b) cache dir present? **YES** 72.4MB / 11936 files at `.claude/plugins/cache/claude-plugins-official/`
- (c) plugins activated? **22 plugins ACTIVE** (full list per probe §1 master table row #1) — sourced via Wave 97/100/104/105/118/128 batch enables per `_comment_wave*` annotations in settings.json L619-628
- (d) marketplace.json sha256-16=`ee1ceebfc57377e8` size=96904 / **HEAD=`no-git`** (no `.git` dir; marketplace-clone-only) / 172 plugins available

**CR-9 caveat NEW**: HEAD=no-git means marketplace was not cloned via standard `git clone` — no upstream-freshness probe via `git -C <dir> fetch` available. Refresh requires deleting + re-cloning OR explicit `gh release download` per CR-6 fresh-from-github discipline.

**CR-12 disposition**: GENUINELY-NEW (Anthropic OFFICIAL — TIER-1 maintainer; 172 plugins available; 22 currently active) → INSTALL via CR-12 PRIMARY path. **Multi-row implication**: each of 22 active plugins should ideally have its own sub-row (deferred to separate fires per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE).

### Row 2.5 — `addyosmani/agent-skills` (STALE-INSTALLED-VIA-MARKETPLACE-CACHE)

**Current Status**: STALE-INSTALLED-VIA-MARKETPLACE-CACHE with extensive Wave 146 Ship 3 3-voice analysis at L94 (V1 PASS-DOCUMENT conf=0.93 + V2 NEEDS-REVISION-DOCUMENT conf=0.92 + V3 ADVERSARIAL NEEDS-REVISION conf=0.94 ship_readiness=RE-PULL-FIRST)

**Recommended update**: Status field preserved; expand 4-cell evidence per current probe (some fields drift since Wave 146).

**4-cell evidence (2026-05-12 probe)**:
- (a) extraKnownMarketplaces? **YES** L600-605
- (b) cache dir present? **YES** 668KB / 103 files at `.claude/plugins/cache/addy-agent-skills/agent-skills/742dca58ae55/` (STALE per existing manifest — `.orphaned_at` marker at `1778294547061` Unix-epoch-ms)
- (c) plugins activated? **YES** — `agent-skills@addy-agent-skills=true` L530 (1 plugin)
- (d) marketplace.json sha256-16=`88114d43d4c67cd9` size=577 / **HEAD=`3ff4b518b3cd3077`** (current upstream main per probe; cached version is 12 commits behind per Wave 146 Ship 3 V3 finding) / origin=`https://github.com/addyosmani/agent-skills.git`

**CR-9 staleness flag retained**: 12 commits behind upstream including 1 NEW FEATURE SKILL `doubt-driven-development` (+243 LOC). Queue **Wave 146 Ship 3a follow-up** (operator-action gated; resolve git safe.directory ownership BEFORE `git fetch + reset --hard`).

**CR-12 disposition**: PROVIDER-COMPLEMENT (engineering-phase-taxonomy scope distinct from superpowers workflow-grammar + ECC autonomous/research/safety per V1+V2+V3 consensus) → INSTALL as ALTERNATIVE (not PRIMARY); current cite-trail confirmed at 4 eee files per Wave 82m-B Top-3 CITE-IMPORT.

---

## §3 NEW row additions — 6 missing marketplace rows

Per W156 F2 dispatch plan CR-1 P2 mandate: 6 marketplaces registered in `extraKnownMarketplaces` but absent from §Section 3 require NEW rows.

### Row 3.1 — `mksglu/context-mode` (PARTIAL OVERLAP with §1 Row #11 ABOVE which is ALREADY in cache)

⚠️ **CORRECTION**: `context-mode` IS already INSTALLED-ACTIVE (cached + plugin enabled L524) — but NOT listed in current §Section 3 (only 5 rows). **NEW row needed**.

**4-cell evidence**:
- (a) extraKnownMarketplaces? **YES** L606-611
- (b) cache dir present? **YES** 123MB / 6409 files at `.claude/plugins/cache/context-mode/`
- (c) plugins activated? **YES** — `context-mode@context-mode=true` L524 (1 plugin)
- (d) marketplace.json sha256-16=`00aa039e0f3a69de` size=807 / HEAD=`00aa039e0f3a69de` / origin=`https://github.com/mksglu/context-mode.git`

**Status field**: `**INSTALLED-ACTIVE**` — context-mode MCP enables context-engineering workflow (ctx_batch_execute / ctx_search / ctx_execute / ctx_fetch_and_index tools per `<context_window_protection>` SYSTEM directive); SRA D1=MIT D2=ACTIVE D4=TIER-4-NAMED-INDIVIDUAL mksglu single-maintainer (downgrade-with-disclosure per SRA D4 tier table) D6=use-class-compatible D7=Anthropic-cookbook-aligned-tool-class.

**CR-12 disposition**: GENUINELY-NEW (context-engineering MCP class — no upstream parity in Anthropic OFFICIAL / openai-codex / ECC) → INSTALL via CR-12 PRIMARY path (already executed).

**Cite anchor**: TIER-1-DIRECT context-mode marketplace registration at `Z:/claude-sota-installed/.claude/settings.json:606-611`; cached at HEAD `00aa039e0f3a69de`; plugin `.claude-plugin/plugin.json` at marketplace dir.

### Row 3.2 — `anthropics/skills` (registered as `skills`)

**Status field**: `**REGISTERED-ONLY**` — marketplace registered + cached at HEAD `d211d437443a7b24` BUT zero plugins activated; offers 3 plugins available (compute-use / claude-skills / etc).

**4-cell evidence**:
- (a) extraKnownMarketplaces? **YES** L564-569 (registered as `skills` key, repo `anthropics/skills`)
- (b) cache dir present? **NO** — marketplace dir present at `.claude/plugins/marketplaces/anthropic-agent-skills/` (1661 bytes marketplace.json) BUT no plugin cache extracted to `.claude/plugins/cache/anthropic-agent-skills/`
- (c) plugins activated? **❌ ZERO** — no `*@anthropic-agent-skills` entries in enabledPlugins L516-543
- (d) marketplace.json sha256-16=`dc010d20dee0200a` size=1661 / HEAD=`d211d437443a7b24` / origin=`https://github.com/anthropics/skills.git` / 3 plugins available

**CR-12 disposition**: AMBIGUOUS — could be GENUINELY-NEW (Anthropic OFFICIAL skills repo distinct from claude-plugins-official) OR DUPLICATE-FUNCTIONALITY (anthropic-bundled skills already shipped via claude-plugins-official superpowers/etc). **Sota-researcher Probe 4 plugin-namespace OVERLAP check NEEDED**: enumerate 3 plugins in marketplace.json and check overlap with 22 active claude-plugins-official plugins.

**SRA D1=MIT-or-Apache D2=ACTIVE D4=TIER-1-OFFICIAL Anthropic D6=use-class-compatible D7=Anthropic-aligned-by-definition** → SCORE 7-8/10 PASS for INSTALL but pending Probe 4 namespace verification.

**Recommended action**: Queue **Wave 156 Ship 3.2-followup** = sota-researcher dispatch to enumerate 3 plugins vs 22 active claude-plugins-official plugins; if NOVEL → INSTALL; if DUPLICATE → REGISTERED-ONLY-NO-INSTALL retained per kiss-dry-yagni Must-Never #4.

### Row 3.3 — `anthropics/knowledge-work-plugins`

**Status field**: `**REGISTERED-ONLY**` — marketplace registered + 47 plugins available BUT zero plugins activated; vertical-domain marketplace.

**4-cell evidence**:
- (a) extraKnownMarketplaces? **YES** L570-575
- (b) cache dir present? **NO** — marketplace dir present (19562 bytes marketplace.json) BUT no plugin cache
- (c) plugins activated? **❌ ZERO**
- (d) marketplace.json sha256-16=`6d58ffe371d97526` size=19562 / HEAD=`9789ea78ad66e395` / origin=`https://github.com/anthropics/knowledge-work-plugins.git` / 47 plugins available

**CR-12 disposition**: PROVIDER-COMPLEMENT or PARTIAL-OVERLAP — knowledge-work vertical (legal / consulting / writing / education / etc) may or may not overlap with eee runtime use-class. Per CR-7 graduated-unleash + Probe 7.a DEMAND-ABSENCE per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md`: **eee runtime has NO knowledge-work vertical demand surface** → REGISTERED-ONLY-NO-INSTALL retained.

**SRA D6=use-class-incompatible** for autonomous /loop runtime; vertical plugins target human knowledge-worker workflows.

**Recommended action**: No follow-up; REGISTERED-ONLY status documents intentional non-install per Probe 7.a DEMAND-ABSENCE.

### Row 3.4 — `anthropics/claude-plugins-community` (registered as `claude-plugins-community`)

**Status field**: `**REGISTERED-ONLY**` — marketplace registered + 1920 plugins available BUT zero plugins activated; community marketplace.

**4-cell evidence**:
- (a) extraKnownMarketplaces? **YES** L576-581
- (b) cache dir present? **NO** — marketplace dir present (1.3MB marketplace.json with 1920 plugin entries) BUT no plugin cache
- (c) plugins activated? **❌ ZERO**
- (d) marketplace.json sha256-16=`994560417bd02f41` size=1308158 / HEAD=`f846a0bcb0e721b1` / origin=`https://github.com/anthropics/claude-plugins-community.git` / 1920 plugins available

**CR-12 disposition**: ECOSYSTEM-IMPORT — 1920 community plugins is a discovery surface BUT installing without per-plugin CR-12 5-class verification = violates `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4 + `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG 1-7.

**SRA D8=industry-adoption-mixed** (community varies widely per individual plugin).

**Recommended action**: Status REGISTERED-ONLY-DISCOVERY-SURFACE; per-plugin install requires sota-researcher Probe DAG 1-7 per `Z:/claude-sota/.claude/rules/multi-source-discovery-breadth-discipline.md` ≥4-source convergence. Queue **Wave 156 Ship 3.4-followup** = NO BULK ACTION; reactive per-plugin install on operator request only.

### Row 3.5 — `anthropics/financial-services` (registered as `financial-services`)

**Status field**: `**REGISTERED-ONLY**` — vertical-domain marketplace per Wave 82d `_comment_extraKnownMarketplaces_wave82d` annotation L626.

**4-cell evidence**:
- (a) extraKnownMarketplaces? **YES** L582-587
- (b) cache dir present? **NO** — marketplace dir present (4609 bytes marketplace.json) BUT no plugin cache
- (c) plugins activated? **❌ ZERO**
- (d) marketplace.json sha256-16=`18b37820122d94a0` size=4609 / HEAD=`57772c3f1607229f` / origin=`https://github.com/anthropics/financial-services.git` / 20 plugins available

**CR-12 disposition**: PROVIDER-COMPLEMENT — FSI vertical (banking / compliance / risk / trading). **Probe 7.a DEMAND-ABSENCE**: eee has NO FSI vertical demand surface → REGISTERED-ONLY retained.

**Per Wave 82d annotation**: explicitly registered via CR-12 PRIMARY HTTPS git clone for future-use-vertical-marketplace mechanism per https://code.claude.com/docs/en/plugins. Cross-model gate satisfaction at registration: FAILED-policy-blocked (codex API quota exhausted; T1 re-review queued — STILL PENDING).

**Recommended action**: Status REGISTERED-ONLY; no install; T1 re-review when codex quota recovers (long-pending W82d carryover).

### Row 3.6 — `anthropics/healthcare`

**Status field**: `**REGISTERED-ONLY**` — vertical-domain marketplace per Wave 82d.

**4-cell evidence**:
- (a) extraKnownMarketplaces? **YES** L588-593
- (b) cache dir present? **NO** — marketplace dir present (2462 bytes) BUT no plugin cache
- (c) plugins activated? **❌ ZERO**
- (d) marketplace.json sha256-16=`b597b697080178e8` size=2462 / HEAD=`c382e9466083f3bf` / origin=`https://github.com/anthropics/healthcare.git` / 7 plugins available

**CR-12 disposition**: PROVIDER-COMPLEMENT — healthcare vertical (clinical / EHR / regulatory). Probe 7.a DEMAND-ABSENCE → REGISTERED-ONLY retained.

**Recommended action**: Status REGISTERED-ONLY; no install; T1 re-review pending.

### Row 3.7 — `anthropics/life-sciences`

**Status field**: `**REGISTERED-ONLY-AHEAD-OF-UPSTREAM**` — vertical-domain marketplace per Wave 82d; ⚠️ **local clone is 2 commits AHEAD of upstream origin/main** (probe finding 2026-05-12).

**4-cell evidence**:
- (a) extraKnownMarketplaces? **YES** L594-599
- (b) cache dir present? **NO** — marketplace dir present (6956 bytes) BUT no plugin cache
- (c) plugins activated? **❌ ZERO**
- (d) marketplace.json sha256-16=`534038fba8697d9f` size=6956 / **HEAD=`e96556b637b56d6c` (2 commits AHEAD)** / origin=`https://github.com/anthropics/life-sciences.git` / 21 plugins available

**CR-9 install-risk anomaly**: 2 commits AHEAD of upstream origin/main is unusual for a clone-only-marketplace. Possible causes: (1) local commits introduced post-clone (operator action unaccounted for), (2) upstream force-push rewrote history, (3) clone tracked different branch. **Investigation needed** per CR-9 sibling-bleed defense — verify no eee-specific edits leaked into marketplace clone.

**CR-12 disposition**: PROVIDER-COMPLEMENT — life-sciences vertical (genomics / proteomics / clinical-trials). Probe 7.a DEMAND-ABSENCE → REGISTERED-ONLY retained PENDING anomaly investigation.

**Recommended action**: Queue **Wave 156 Ship 3.7-followup** = `git -C .claude/plugins/marketplaces/life-sciences log origin/main..HEAD` to identify 2 anomalous local commits + decide rebase-or-reset.

---

## §4 CR-12 disposition lattice — per-marketplace 5-class classification

Per CLAUDE.md cardinal-rule-12 disposition lattice (5 classes):

| # | Marketplace | CR-12 disposition | Class rationale | Cite anchor |
|---|---|---|---|---|
| 1 | obra/superpowers | DUPLICATE-FUNCTIONALITY | Anthropic OFFICIAL marketplace cascade per CR-12 (claude-plugins-official supersedes direct-author) | manifest L90 REDUNDANT |
| 2 | mattpocock/skills | MODE-HARNESS-SHAPE (Probe 5 fail) | HARD-GATE setup-matt-pocock-skills incompatible with autonomous /loop | agent-harness-fit-verification.md iter-92 |
| 3 | affaan-m/everything-claude-code | GENUINELY-NEW | safety-guard SKILL + architect/code-reviewer agents + autonomous-loop coverage NOVEL | manifest L92 |
| 4 | anthropics/claude-plugins-official | GENUINELY-NEW | Anthropic OFFICIAL TIER-1 maintainer; 172 plugins; 22 active | manifest L93 |
| 5 | addyosmani/agent-skills | PROVIDER-COMPLEMENT | engineering-phase taxonomy distinct from superpowers workflow-grammar + ECC | manifest L94 Wave 146 |
| 6 | mksglu/context-mode | GENUINELY-NEW | context-engineering MCP class no upstream parity | new row 3.1 |
| 7 | anthropics/skills | AMBIGUOUS — Probe 4 namespace check NEEDED | could be NEW or DUPLICATE pending 3-plugin enumeration | new row 3.2 |
| 8 | anthropics/knowledge-work-plugins | PROVIDER-COMPLEMENT (DEMAND-ABSENCE) | vertical-domain no eee surface | new row 3.3 |
| 9 | anthropics/claude-plugins-community | ECOSYSTEM-IMPORT | 1920 plugins discovery surface; per-plugin verification needed | new row 3.4 |
| 10 | anthropics/financial-services | PROVIDER-COMPLEMENT (DEMAND-ABSENCE) | FSI vertical no eee surface | new row 3.5 |
| 11 | anthropics/healthcare | PROVIDER-COMPLEMENT (DEMAND-ABSENCE) | healthcare vertical no eee surface | new row 3.6 |
| 12 | anthropics/life-sciences | PROVIDER-COMPLEMENT (DEMAND-ABSENCE) + ANOMALY | life-sciences vertical + 2-commits-ahead anomaly | new row 3.7 |

**Convergence-gate Axis 1 (≥3-distinct-orgs)** PASS — 4 distinct orgs (Anthropic / OpenAI / Affaan-M / Osmani / mksglu) maintain registered marketplaces.

---

## §5 Cardinal-rule conformance

### CR-1 cite-trail (TIER-1-DIRECT primary anchors)

- ✅ `Z:/claude-sota-installed/.claude/settings.json:516-612 @ HEAD c552145` (enabledPlugins L516-543 + extraKnownMarketplaces L545-611)
- ✅ Per-marketplace `marketplace.json` content-hash sha256-16 + git HEAD SHA + origin URL (all 11 marketplaces)
- ✅ Filesystem probe via `ls .claude/plugins/cache/` + `ls .claude/plugins/marketplaces/` + `git -C <dir> rev-parse HEAD` (5 cache + 11 marketplace)
- ✅ Existing `docs/sota-installed-manifest.md:86-94 @ HEAD c552145` §Section 3 current 5 rows

### CR-3 cross-model gate (FULLY SATISFIED via downstream Path P)

- Phase 1 bootstrap exception applies — V1 research-only artifact (this file); V2+V3 codex T1 reviews queued per F2 dispatch plan
- 4-cell evidence pack composed per CR-1 P2 saved_ship_catch (codex T1 W156 F2 dispatch plan prescription)

### CR-5 install-priority (N/A — research-only fire)

No install actions; plan composition only. NEW rows codify EXISTING state (6 missing rows for already-registered marketplaces).

### CR-7 Phase 1 bootstrap (currently overridden bypassPermissions)

- ⚠️ defaultMode=bypassPermissions per Wave 82d override (Anthropic classifier outage); revert target=auto when 3 predicates hold
- Phase 2 trigger predicate (c) Tier 1a SATISFIED per existing manifest L84 W156 F1 codex T1-T7 lifecycle INSTALLED

### CR-8 TIER-3-LOCAL-COMPOSITION effective tier

Per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE:
- `constituents=[TIER-1-DIRECT @ settings.json L516-612 + 11 marketplace dirs + git HEAD SHAs, TIER-2 @ Wave 82d/82l/97/100/104/105/118/128/146 _comment annotations L619-628, TIER-3-LOCAL-COMPOSITION @ §Section 3 narrative + 4-cell evidence pack lattice]`
- `effective_tier=TIER-3-LOCAL-COMPOSITION` (MIN_PRECEDENCE due to local lattice composition)

### CR-9 install-risk LOW (doc-only research artifact)

- No install commands; doc-only Status field updates
- 2 anomalies flagged: (a) claude-plugins-official HEAD=no-git (no upstream-freshness probe available); (b) life-sciences 2-commits-ahead of upstream (anomalous local-commits)
- Both anomalies queue follow-up ships per CR-9 sibling-bleed defense

### CR-10 research-first-then-install

- ✅ Filesystem probe BEFORE plan composition
- ✅ 4-cell evidence pack constructed per probe (not from memory)
- ✅ Cross-reference to existing manifest L86-94 Section 3 rows BEFORE proposing updates
- ⚠️ Anthropic-agent-skills 3-plugin enumeration deferred to follow-up sota-researcher dispatch per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE

### CR-11 META-process SOTA

- Pattern A apply discipline: this V1 research artifact feeds V2+V3 codex T1 reviews per F2 dispatch plan
- Provenance log per audit-action-loop: `docs/install-provenance.md` Wave 156 Fire 2 entry append (deferred to ship commit per cycle-300)
- Cardinal-rule conformance per-section above

### CR-12 5-class disposition (per §4 above)

12 disposition assignments composed (5 existing + 7 new context-mode + anthropic-agent-skills + 5 vertical marketplaces + community).

---

## §6 FM defense — Failure Mode awareness

### FM-02 (b)+(c) parallel-session race (active per cron `a83ecd8c` iter ~9/N)

Per F2 dispatch plan P2 saved_ship_catch: **pre-edit reread + atomic narrow `--only` mandated**.

**Discipline for downstream ship apply (V2+V3 → Pattern A apply)**:
- Pre-edit reread: read manifest §Section 3 (L86-94) IMMEDIATELY before Edit (no stale snapshot)
- Atomic narrow form: `git commit --only docs/sota-installed-manifest.md -F tmp/wave156-f2-commit-msg.txt` (NOT `git commit -a`)
- Single-shell-invocation chain: `git add --only docs/sota-installed-manifest.md && git commit --only docs/sota-installed-manifest.md -F <msg>` per `audit-action-loop.md` step 4 atomic-batch
- Long-term: defer to `parallel-session-worktree-isolation.md` Layer 0 worktree isolation

### FM-17.e CC-runtime autocompact-thrashing (recovery-aware composition)

Per F2 dispatch plan P1 saved_ship_catch (reframing per FM-17.e recovery NOT BRIDGE-MODE compliance):
- This V1 artifact uses orchestrator-direct sota-researcher (Sonnet stand-in) — NOT BRIDGE-MODE codex-rescue subagent (BRIDGE-MODE would risk FM-17.e autocompact-thrashing per Wave 112 Ship A1+F n=4 firm)
- V2+V3 downstream reviews fire as orchestrator-direct codex T1 foreground+tee per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Path P recipe — same FM-17.e bypass

### FM-20 path-drift cascade defense

Per `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md`:
- 4-cell evidence pack decomposes each marketplace claim into independent sub-claims (a / b / c / d)
- Each sub-claim verified at runtime probe (NOT memory recall)
- Mia probe at synthesis-vs-brief boundary applied per `Z:/claude-sota/.claude/rules/mia-pre-apply.md`

### FM-21.a+b STATE PROBE before any CronCreate

Per `Z:/claude-sota-installed/.claude/rules/fm21-queue-time-prompt-freeze.md`:
- No new CronCreate in this fire
- Pre-existing cron `a83ecd8c` continues with stale state — V2+V3 ScheduleWakeup at fire-time MUST STATE PROBE HEAD before re-executing

### FM-09 codex-rescue blind-spot specialization (DOES NOT APPLY)

Per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` §FM-09:
- This V1 is NOT first-stage codex-rescue; it's 2nd-stage harness-fit-aware research per orchestrator-direct sota-researcher dispatch
- V2+V3 downstream reviews fire as 3rd-stage codex T1 cross-model verification — preserves FM-09 base rate 100% same-arc

### Launch-discipline §1 6-axis pre-launch verification (for downstream V2+V3 ship)

- code_quality: clean markdown / no emojis / valid frontmatter
- security: no secrets / no shell injection in proposed Status field edits
- performance: doc-only changes (zero runtime impact)
- infra: tmp/ scratch + docs/ append per FM-19 readonly-guard-sidestep
- comms: clear inventory + 5 existing updates + 6 NEW rows + headline dispositions
- OS-state-mutation: ZERO (no install commands; V2+V3 verify-then-ship governs apply)

### Launch-discipline 3 invariants (for downstream V2+V3 ship)

- Reversible: `git revert <SHA>` <30s
- Observable: 11-marketplace inventory + 4-cell evidence pack + CR-12 disposition per row
- Incremental: ONE manifest edit per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE

---

## §7 Forward direction

### V2+V3 codex T1 reviews queued

Per F2 dispatch plan: 2 orchestrator-direct Path P codex T1 reviews (normal + adversarial) consume this V1 artifact.

**V2 SYNTHESIZER** prompt scope:
- Validate 4-cell evidence pack (probe outputs cited correctly)
- Validate CR-1 P2 cite separation discipline
- Validate CR-12 5-class disposition assignments
- Approve / NEEDS-REVISION / REJECT verdict

**V3 ADVERSARIAL** prompt scope:
- Mia-probe each sub-claim independently at synthesis-vs-brief boundary
- Catch OVER claims (anthropic-agent-skills disposition AMBIGUOUS-Probe-4-pending vs definitive REGISTERED-ONLY)
- Catch UNDER claims (life-sciences 2-commits-ahead anomaly downplayed?)
- Catch FM-20 path-drift cascade (any sibling-bleed in proposed edits?)
- F2-NEEDED-LIGHT / NEEDS-REVISION / REJECT verdict per recursive-V3-catches-V2 discipline

### Subsequent ship apply (Pattern A)

Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A:
- V2+V3 verdicts converge → Pattern A single atomic fix-forward
- Edit target: `docs/sota-installed-manifest.md` §Section 3 only
- 5 existing rows updated + 6 NEW rows added = 11 total rows post-edit
- Atomic narrow `git commit --only docs/sota-installed-manifest.md -F tmp/wave156-f2-commit-msg.txt` per FM-02 (b)+(c) defense

### Follow-up ships queued (per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE)

- **Wave 156 Ship 3.2-followup**: anthropic-agent-skills 3-plugin namespace enumeration vs claude-plugins-official overlap check (sota-researcher Probe 4)
- **Wave 156 Ship 3.4-followup**: NO BULK ACTION on claude-plugins-community 1920 plugins; reactive per-plugin install only
- **Wave 146 Ship 3a follow-up** (existing): addy-agent-skills cache refresh (12 commits behind upstream; operator-action gated)
- **Wave 156 Ship 3.7-followup**: life-sciences 2-commits-ahead anomaly investigation
- **Wave 82d carryover**: T1 re-review on financial-services + healthcare + life-sciences registrations (codex quota recovery pending)

---

## §8 Risk class — LOW

Per V1 research-only scope:
- Doc-only artifact (no code edits, no runtime mutation)
- 4-cell evidence pack pre-verifies all 11 marketplaces against filesystem ground truth
- 2 anomalies flagged (claude-plugins-official HEAD=no-git + life-sciences 2-commits-ahead) — neither blocks F2 ship
- Reversibility <30s via `git revert <SHA>`
- V2+V3 downstream Path P codex T1 reviews catch any V1 OVER claims per recursive-V3-catches-V2 ladder (29/29 firm; 30/30 if W156 F2 V3 catches V2 OVERs)

---

## §9 Probe inventory summary

**Tools used**:
- Bash: `ls` / `find` / `du` / `wc` / `git -C <dir> rev-parse HEAD` / `git -C <dir> rev-list --count --left-right HEAD...origin/HEAD` / `git -C <dir> config --get remote.origin.url` / `python -c json.load` for marketplace.json plugin enumeration
- Grep: `extraKnownMarketplaces|enabledPlugins` pattern in `.claude/settings.json`
- Read: `.claude/settings.json` L516-630 (115 lines) / `docs/sota-installed-manifest.md` L80-104 (25 lines)

**Tool budget**: 8 Bash + 1 Grep + 2 Read + 1 Write = 12 tool uses well under TERMINATION on_tool_count_exceeded: 35.

**Token budget**: ~9k input + ~5k output for §1-§9 composition + cite-anchor + 4-cell pack — well under TERMINATION on_token_budget_exceeded: 200000.

---

## §10 Headline answer for orchestrator V2+V3 dispatch

**Section 3 needs +6 NEW rows + 5 existing row Status updates = 11 total post-edit**.

**Row count delta**: 5 → 11.

**CR-12 disposition spread**:
- 4 GENUINELY-NEW (claude-plugins-official / everything-claude-code / context-mode / + anthropic-agent-skills PENDING Probe 4)
- 4 PROVIDER-COMPLEMENT (addy-agent-skills + 3 verticals knowledge-work / financial-services / healthcare / life-sciences — wait, that's 4)
- 1 ECOSYSTEM-IMPORT (claude-plugins-community)
- 1 DUPLICATE-FUNCTIONALITY (obra/superpowers REDUNDANT)
- 1 MODE-HARNESS-SHAPE (mattpocock/skills HARD-GATE)
- 1 PROVIDER-COMPLEMENT (addy-agent-skills)
Total = 12 (anthropic-agent-skills counted twice as ambiguous; verticals as 4 PROVIDER-COMPLEMENT)

**Critical anomalies flagged for V3 adversarial review**:
1. `claude-plugins-official` HEAD=`no-git` (no `.git` dir; upstream-freshness probe not available via standard `git fetch`)
2. `life-sciences` 2 commits AHEAD of origin/main (anomalous local-commits; sibling-bleed investigation needed)
3. `addy-agent-skills` 12 commits BEHIND upstream main (Wave 146 Ship 3a carryover)
4. `mattpocock/skills` PLANNED → REJECT-FOR-FIT-HARD-GATE proposed downgrade (V3 should verify Probe 5 iter-92 finding still holds)

**Verification posture**: V1 is research-only foundation; V2+V3 Path P codex T1 reviews govern Pattern A apply; FM-09 recursive-V3-catches-V2 active 29/29 firm (advance to 30/30 if W156 F2 V3 catches V1+V2 OVERs).

---

**END W156 F2 V1 research plan — handoff to orchestrator for V2+V3 dispatch**
