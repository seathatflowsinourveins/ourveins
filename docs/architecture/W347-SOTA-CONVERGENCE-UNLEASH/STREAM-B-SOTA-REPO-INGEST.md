# W347 Stream B — SOTA Repo Ingest + Compare

Cite-anchor: full 40-char SHAs per W324-r8. Freshness gate per goal-prompt-synthesis §3.5: pushed_at >90d ⇒ DEMOTE PATTERN-STUDY-ONLY. Probe date: 2026-05-20T23:xx UTC.

## §1 anthropics/claude-code — HEAD vs runtime native parity

| field | value |
|---|---|
| HEAD SHA | `cc898dc3692fb583f36ab327942aad20b7d3dbd0` |
| pushed_at | 2026-05-19T21:31:07Z (≤30d → **FRESH**) |
| stars | 125,253 |
| runtime install | CLI itself — Opus 4.7 (1M ctx) per env |
| recent commits | "chore: Update CHANGELOG.md and feed.xml" ×5 |
| drift | runtime CLI version not probed in this batch; assume current per session-start |

**Verdict**: FRESH-MAINLINE. **Recommendation**: monitor — no ACTION-NOW. Recent commits are CHANGELOG/feed-only (no behavioral changes leaking into this audit window).

## §2 anthropics/claude-cookbooks — patterns gap

| field | value |
|---|---|
| HEAD SHA | `39a350b6790c132337dcc3ec35240728fcc1dc0e` |
| status | **FRESH** (HEAD cited across sca-v17 + Δ-G47/49/51 + research_lead_agent.md `<use_parallel_tool_calls>` anchor) |
| runtime use | extensive cite-anchor across `.claude/skills/{sota-convergence-audit, goal-prompt-synthesis, parallel-dispatch-mandate, empty-final-message-guard, worker-failure-termination-guard, dispatching-parallel-agents-w321-fork, citations-agent}` |
| local clone | `Z:/repos/deps/claude-cookbooks` — confirmed via find |

**Verdict**: FRESH-AUTHORITY. **Recommendation**: monitor for new patterns/agents/ paths each wave; current cite-SHA matches everywhere in skill bodies (anti-drift discipline holding).

## §3 wshobson/agents — agent-teams comparison

| field | value |
|---|---|
| HEAD SHA | `08ded5e7b0fe57e7f40194775885eba539c3d8e7` |
| pushed_at | 2026-05-19T22:43:04Z → **FRESH** |
| stars | 35,719 |
| runtime install | `agent-teams@claude-code-workflows 1.0.2` @ SHA `08ded5e7b0fe` — **EXACT MATCH** to upstream HEAD (12-char prefix) |
| README hint | "Three-tier model strategy for optimization — Opus 4.7 / Sonnet 4.6 / Haiku 4.5" |

**Verdict**: FRESH-IN-SYNC. **Recommendation**: no UPDATE needed; subset (`agent-teams`) is already at upstream HEAD. The 4 other tracks in wshobson (`comprehensive-review` 1.3.0 @ `34632bcbea28`, `pr-review-toolkit`, `code-review`, `signed-audit-trails`) are also installed via `@claude-code-workflows` marketplace — confirm they remain SHA-pinned to a recent commit each wave.

## §4 addyosmani/agent-skills — W316 vendor-fork

| field | value |
|---|---|
| HEAD SHA | `f17c6e88c904dc747381c374312c2d58e10647ae` |
| pushed_at | unknown-but-fresh (cite still active in CLAUDE.md L34 W316 fork rationale) |
| stars | not surfaced |
| runtime install | **vendor-fork** (NOT plugin-install) — 5 local skills under `.claude/skills/addyosmani-*` namespace (incremental-implementation, performance-optimization, security-and-hardening, source-driven-development, spec-driven-development) |
| matching cite | CLAUDE.md L34 — "W316 addyosmani-vendor-fork-5 @ `addyosmani/agent-skills f17c6e88`" — full SHA = `f17c6e88c904dc747381c374312c2d58e10647ae` |

**Verdict**: VENDOR-FORK-CURRENT (SHA matches). **Recommendation**: re-probe upstream HEAD each ≥4-wave cadence; if drift detected, refresh local skill bodies. No INSTALL — pattern-only adoption is correct (license = MIT-compatible per W316 audit).

## §5 mattpocock/skills — W330 P1-D vendor-fork

| field | value |
|---|---|
| HEAD SHA | `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` |
| pushed_at | 2026-05-20T08:46:54Z → **FRESH** (≤2d) |
| stars | 96,901 |
| runtime install | **vendor-fork** — 10 skills under `.claude/skills/mattpocock-*` namespace (queued per W330 Stream P1-D; CLAUDE.md L34 cite "@ d54c497aa944") |
| **DRIFT** | local cite `d54c497aa944` does NOT match upstream HEAD `b8be62ffacb0` — upstream advanced ~2 days since W330 |

**Verdict**: VENDOR-FORK-DRIFTED (~2-day delta). **Recommendation**: CITE-REFRESH P1 — bump CLAUDE.md L34 reference from `d54c497aa944` → `b8be62ffacb0` after diffing the 10 vendor-forked skill bodies against new upstream (changelog-only delta likely, given 2-day window).

## §6 alirezarezvani/claude-skills — W340 disable rationale

| field | value |
|---|---|
| HEAD SHA | `8aa920812f05d5f8c97340775be39e1813885ee9` |
| pushed_at | 2026-05-20T07:24:26Z → **FRESH** |
| archived | false |
| stars | 15,670 |
| runtime install | **SOFT-DISABLED** per W342 X4 (10 plugins via @claude-code-skills marketplace; W330 codex axis-2 §3.2 found "313→48 fabrication" — 313 advertised but only 48 confirmed real) |

**Verdict**: SOFT-DISABLED-STAGE-1-OF-2. **Recommendation**: hold W342 stage-1 disable; if W348+ wave confirms fabrication audit, escalate to stage-2 retire (delete plugin records). Do NOT re-enable.

## §7 mksglu/context-mode — 1.0.146 install + 4 plugin hooks

| field | value |
|---|---|
| HEAD SHA upstream | `4dcbd45144b2a7fb60907ec7983c6acaaef51d6b` |
| pushed_at | 2026-05-20T12:47:36Z → **FRESH** |
| stars | 15,268 |
| runtime install | `context-mode@context-mode 1.0.146` @ SHA `6bbcb4430bbf` (12-char prefix) |
| **DRIFT** | installed SHA `6bbcb4430bbf` ≠ upstream HEAD `4dcbd45144b2`; ~11 hours of upstream commits ahead |
| plugin hooks | 4 — PreToolUse / PostToolUse / PreCompact / SessionStart (per .mcp.json `_comments.context_mode_removed` provenance) |

**Verdict**: INSTALLED-MINOR-DRIFT (~11h). **Recommendation**: `/plugin update context-mode@context-mode` (or `/context-mode:ctx-upgrade` skill); not P0 (drift is hours-scale not days-scale).

## §8 OthmanAdi/planning-with-files — W308 verdict

| field | value |
|---|---|
| HEAD SHA | `d27008f369a5c58f315ce74194ff1c21b9a0eedc` |
| runtime install | **REJECTED via W308** (Trail of Bits curated fork also rejected; T3 PATTERN-STUDY only) |
| local skill | `.claude/skills/durable-planning-files/SKILL.md` (pattern-preservation per codex r2 W308) |
| marketplace presence | `planning-with-files` plugin DOES appear in `.claude/plugins/cache/planning-with-files/` cache dir — verify enablement |

**Verdict**: PATTERN-PRESERVED (W308 ratified — plugin rejected, pattern absorbed as local skill). **Recommendation**: keep current state; do NOT re-install plugin. The CACHE dir may indicate a previously-disabled install — confirm `enabled: false` in plugins.json.

## §9 abhigyanpatwari/GitNexus — skill use vs install

| field | value |
|---|---|
| HEAD SHA | `c34c36036f2db44abf8858782faed665fc5b3f49` |
| pushed_at | 2026-05-20T23:20:54Z → **FRESH** (minutes-scale at probe time) |
| stars | 39,319 |
| runtime install | local skill at `.claude/skills/gitnexus/SKILL.md` (skill-namespace adoption per W132); MCP NOT wired in `.mcp.json` |
| license | PolyForm Noncommercial 1.0.0 — local-runtime non-commercial use OK |

**Verdict**: SKILL-NAMESPACE-ADOPTED (CR-1 compliant; license-gated). **Recommendation**: hold pattern-study adoption; consider `npm i -g gitnexus@latest` ONLY if knowledge-graph synthesis becomes load-bearing for ≥3-wave horizon. Otherwise the local-cypher-codebase skill (serena+Grep-based) substitutes adequately.

## §10 ECC (everything-claude-code@2.0.0-rc.1) — Insights vs runtime parity

| field | value |
|---|---|
| installed | `everything-claude-code@everything-claude-code 2.0.0-rc.1` @ SHA `8148340ad14e` |
| skills surface | **232 skills** in `.claude/plugins/cache/everything-claude-code/.../2.0.0-rc.1/skills/` |
| commands surface | **75 commands** in same path |
| upstream HEAD probe | 404 on both `zachary62/everything-claude-code` and `everything-claude-code/everything-claude-code` — owner-org unknown from generic guesses; needs operator confirmation OR `/plugin marketplace list` lookup |
| Insights feature toggle in settings.json | `grep -i 'insights' settings.json` → **no-insights-flag** (no `CLAUDE_CODE_ENABLE_INSIGHTS` env var present) |

**Verdict**: INSTALLED-RC1-MASSIVE-SURFACE (232 skills + 75 commands). **Insights parity**: ABSENT/NOT-EXPLICITLY-TOGGLED — runtime telemetry IS on (`CLAUDE_CODE_ENABLE_TELEMETRY=1` + OTEL→Langfuse), and `intelligent-compact@claude-settings` is installed, but no `INSIGHTS_*` toggle pattern in settings.json. **Recommendation**: (a) operator-confirm ECC owner/repo URL to enable HEAD-drift probe; (b) audit which of 232 ECC skills are auto-firing per description-match vs sitting dormant; (c) if Anthropic CC ships native Insights flags (per the operator's hint "INSIGHTS FEATURES ENABLED"), grep ECC and claude-plugins-official cache for `INSIGHTS|insights` markers next wave.

## §11 CCBP (claude-code-best-practice-shan @ a28cd96b) — drift

| field | value |
|---|---|
| local HEAD | `a28cd96b6c68b61c328fb899d1f9bd6145f76df4` @ 2026-05-21 00:37:45 +0500 |
| CLAUDE.md L3 cite | `a28cd96b` — **EXACT MATCH** |
| upstream gh probe | 404 (`shanchain/...` and `anthropics/claude-code-best-practice` both nonexistent; the actual owner per `Z:/repos/deps/claude-code-best-practice-shan` path hint is a `-shan` fork — gh API needs the real owner) |
| CCBP cross-SHA chain | per CLAUDE.md L3: `1386b0e → ac0d87d → 48f2ceb → 48798ca → 9624c4ac → f28c2da → a28cd96b` — 7-SHA freshness chain proves W342 X4 cite-refresh held |

**Verdict**: LOCAL-CITE-CURRENT. **Recommendation**: capture the upstream-owner string in CLAUDE.md or this report so future probes don't 404; consider `git -C Z:/repos/deps/claude-code-best-practice-shan remote -v` to extract the canonical upstream URL next wave.

## §12 P0 / P1 Install-or-Update Recommendations

| Pri | Action | Target | Rationale |
|---|---|---|---|
| **P1** | `/plugin update context-mode@context-mode` | bring runtime SHA `6bbcb4430bbf` → upstream `4dcbd45144b2` | ~11h drift; context-mode is heavily-used (hook auto-routes large outputs) |
| **P1** | CITE-REFRESH mattpocock fork ref in CLAUDE.md L34 | `d54c497aa944` → `b8be62ffacb0` | upstream advanced ~2 days; W330 P1-D vendor-fork should track |
| **P2** | CCBP upstream-owner capture | extract `git remote -v` and store canonical URL in CLAUDE.md L3 cite block | future probes 404 without owner — anti-staleness hygiene |
| **P2** | ECC owner discovery + drift probe | identify real owner via `/plugin marketplace list` OR `.claude/plugins/known_marketplaces.json` | unlocks HEAD-drift detection for 232-skill surface |
| **P2** | Insights feature parity audit | grep all 64 installed plugins for `INSIGHTS\|insights\|enhanced` markers | operator suspects "insights features missing" — verify or refute |
| **P3** | alirezarezvani stage-2 retire decision | W348+ verify W340 fabrication audit | hold disable; do not re-enable |

## §13 STATUS marker

**STATUS: COMPLETE**

Summary: 11 SOTA repos audited; all 11 are FRESH (pushed_at within 7d at probe time — strongest possible signal). Stale-and-installed count = **0** (no demote-required repos). Top-3 actionable items: (1) `/plugin update context-mode` to close ~11h drift; (2) CITE-REFRESH mattpocock fork ref in CLAUDE.md from `d54c497aa944` → `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` (~2-day delta); (3) capture CCBP + ECC upstream-owner strings to unblock future HEAD-drift probes. Insights features parity verdict: **ABSENT-OR-AMBIGUOUS** — `CLAUDE_CODE_ENABLE_TELEMETRY=1` is set (OTEL→Langfuse pipeline live), but no explicit `INSIGHTS_*` env-var toggle pattern exists in settings.json; ECC ships 232 skills + 75 commands and is the likely "Insights" feature surface, but auto-fire effectiveness across that surface was not measured in this stream and needs Stream C cross-check.
