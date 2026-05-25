# W309 Stream E — CCBP + ECC + Anthropic Primitives Ingest & Adoption Delta

**Wave**: W309 · **Stream**: E (deep CCBP/ECC line-by-line ingest vs runtime adoption)
**Generated**: 2026-05-18 · **Runtime branch**: `sota-converge-w295` · **Runtime HEAD**: `85b6e4e`
**Scope**: CCBP (`claude-code-best-practice-shan`) + ECC (`affaan-m-everything-claude-code`) + 5 Anthropic upstream primitive repos.
**Hard-constraints honored**: READ-ONLY on runtime side (no edits to `CLAUDE.md`, `.claude/settings.json`, `.mcp.json`, or `.claude/skills/*/SKILL.md`); clone fast-forwards only.

---

## §1 — HEAD Drift Summary

| Source | Local HEAD (before) | Origin HEAD (after) | Behind | Substantive Δ | Action Taken |
|---|---|---|---:|---:|---|
| **CCBP** (`Z:/repos/deps/claude-code-best-practice-shan`) | `48f2ceb` (chore changelog 2026-05-08) | `48798ca` (chore: bump badge 2026-05-18) | 9 commits | **1** (`ac0d87d` codex hooks 5→8) | NOT-PULLED — local has 1 ahead-commit (`48f2ceb`) that diverges from origin; ff-only blocked. Working tree contains row at expected :826; origin row drifted to :847. Cite resolves via working tree, line-numbers stale upstream. |
| **ECC** (`Z:/claude-sota-installed-repos/affaan-m-everything-claude-code`) | `efda226` (docs: rc1 evidence snapshot) | `33ed494` (test(ci): Unicode regression) | 49 commits | **8** (3 unicode-safety, 2 LLM-provider hardening, 1 MCP-probe, 1 OIDC scope, 1 blender skill, 1 IOC scan) | **FAST-FORWARDED** to `33ed494` |
| anthropics-claude-code | `8bdbb72` | `69d7070` (v2.1.144 CHANGELOG) | 2 commits | **1** (CHANGELOG with 33 line-items; release artefact) | **FAST-FORWARDED** to `69d7070` |
| anthropics-skills | `f458cee` | `6a5bb06` (model config shape fix) | 1 commit | **0** (1-line doc fix) | **FAST-FORWARDED** to `6a5bb06` |
| anthropics-claude-quickstarts | `b03d42c` | `b03d42c` | 0 | — | NO-OP |
| anthropics-knowledge-work-plugins | `a0fda66` | `a0fda66` | 0 | — | NO-OP |
| anthropics-claude-plugins-official | `b5a156b` | `9f0275a` (convex-backend) | 11 commits | **3** (3 new external-source plugin entries) + **2** infra (CI MCP-liveness check, plugin SHA bump cadence weekly→nightly) | **FAST-FORWARDED** to `9f0275a` |
| anthropics-claude-agent-sdk-python | `c352a50` | `5459309` (CLI bump 2.1.144) | 1 commit | **0** (1-line version bump) | **FAST-FORWARDED** to `5459309` |
| anthropics-claude-agent-sdk-typescript | `fa5d004` | `e62865e` (CHANGELOG) | 1 commit | **0** (CHANGELOG only) | **FAST-FORWARDED** to `e62865e` |

**Aggregate substantive Δ**: 13 substantive commits across all sources in past ~10 days. CCBP itself produced ZERO new best-practice doc changes (`ac0d87d` is codex-CLI hook configuration, not best-practice cardinal-rule prose).

---

## §2 — Per-Source Line-by-Line Substantive Delta

### §2.A CCBP (Claude-Code-Best-Practice-Shan)

#### `ac0d87d` "updated codex hooks" (2026-05-16, Shayan Rais)
- **Scope**: `.codex/hooks.json`, `.codex/hooks/HOOKS-README.md`, `.codex/hooks/scripts/hooks.py`, `.codex/hooks/config/hooks-config.json`, sounds/{PermissionRequest,PreCompact,PostCompact}/{.mp3,.wav}
- **Substance**: Codex CLI hooks engine extends from 5 hooks → **8 hooks**, adding `PermissionRequest`, `PreCompact`, `PostCompact`.
  - `HOOKS-README.md:6`: "Codex CLI provides **8 hooks** via hooks.json" (was 5)
  - `HOOKS-README.md:14-15` (new rows): `PermissionRequest` "runs when Codex requests approval for a sensitive op", `PreCompact` "runs before context compaction", `PostCompact` "runs after context compaction"
  - `hooks.json:54-99` (new): three new hook blocks with `--hook PermissionRequest|PreCompact|PostCompact` invocations
  - `hooks-config.json`: three new disable flags `disablePermissionRequestHook|disablePreCompactHook|disablePostCompactHook`
- **Relevance to runtime**: **CODEX-SIDE**. Our runtime's codex integration is via the `openai-codex` plugin at `.claude/plugins/cache/openai-codex/` whose hooks are upstream-shipped (cardinal-rule-2-compliant). Whether THIS specific 5→8 hook extension propagates to our installed codex plugin is a `/codex:setup` matter, NOT a CLAUDE.md/.claude/settings.json change.
- **Verdict**: NOT-ADOPTED (runtime side); REVIEW-PENDING for codex plugin auto-wired hooks.

#### Other CCBP commits (all noise)
- `48798ca`, `eba3c4e`, `1386b0e`, `af38074`, `6f489f6`, `a77e223`, `d214890`, `3d09194`: badge bumps + agent-collections scheduled refreshes. Zero best-practice/*.md doc changes.

#### CCBP `best-practice/` files (verified vs origin/main)
| File | LOC @ origin/main | LOC change vs cited HEAD | Status |
|---|---:|---:|---|
| `claude-memory.md` | 121 | 0 | byte-identical |
| `claude-settings.md` | 1170 | +21 since `48f2ceb` (added 21 new env-vars / settings rows at the top of the table; existing rows shifted down) | line-numbers in CLAUDE.local.md drifted |
| `claude-mcp.md` | 132 | 0 | byte-identical |
| `claude-skills.md` | 58 | 0 | byte-identical |
| `claude-subagents.md` | 56 | 0 | byte-identical |
| `claude-cli-startup-flags.md` | n/a | unmeasured | not currently cited by CLAUDE.md |
| `claude-power-ups.md` | n/a | unmeasured | not currently cited |
| `claude-hooks.md` | **0** | — | **DOES NOT EXIST** at origin/main (referenced in CCBP `.codex/hooks/HOOKS-README.md` but `best-practice/claude-hooks.md` is missing — operator MAY assume CCBP hooks-doc lives at a path that does not exist; runtime cites point at `https://docs.anthropic.com/en/docs/claude-code/hooks` Anthropic-canonical instead, so this is a NON-ISSUE) |
| `claude-plugins.md` | **0** | — | **DOES NOT EXIST** — runtime cites `https://code.claude.com/docs/en/plugins` Anthropic-canonical, so NON-ISSUE |

---

### §2.B ECC (Affaan-M-Everything-Claude-Code)

49 commits ingested. Substantive surface breaks down as:

| Commit | Date | Category | Files | Summary |
|---|---|---|---|---|
| `33ed494` | 2026-05-19 | CI test | tests/ci/check-unicode-safety | Regression coverage for 9 new test cases covering Unicode-tag-block invisibility detection |
| `b068069` | 2026-05-19 | Security | scripts/ci/check-unicode-safety | Extends `isDangerousInvisibleCodePoint` denylist with 5 widely-cited invisible code points |
| `e3483fd` | 2026-05-19 | Security | scripts/ci/check-unicode-safety | Covers Unicode Tag block U+E0000–U+E007F (omitted from previous denylist of 7 ranges) |
| `7911af4` | 2026-05-18 | Security | .github/workflows/release.yml, reusable-release.yml, scripts/ci/validate-workflow-security.js, tests/ci/validate-workflow-security.test.js | Scope release OIDC publishing (least-privilege) |
| `04d4d81` | 2026-05-18 | Fix | scripts/ci/scan-supply-chain-iocs.js, tests | Ignore defensive IOC deny-rules (+94/-10) |
| `eb0d893` | 2026-05-18 | Provider hardening | src/llm/providers/{astraflow.py, constants.py, openai.py}, tests | Harden OpenAI-compatible provider responses (+241 LOC delta in `openai.py` alone) |
| `cc62e89` | 2026-05-17 | Provider fix | (rolled into eb0d893 series) | Guard against empty `choices` list / `choices[0].message = None` (content-filtered Gemini, overwhelmed Ollama) — fixes IndexError/AttributeError crash |
| `386326d` | 2026-05-18 | MCP fix | scripts/hooks/mcp-health-check.js, tests | Treat MCP HTTP 406 probes as reachable (+73 LOC test) |
| `922d2d8` | 2026-05-18 | **New skill** | `skills/blender-motion-state-inspection/SKILL.md` (164 LOC) | Blender Python motion-state introspection (niche — physics/animation rigging). Meter-scale threshold assumptions documented; Blender interpreter notes included. |
| `4d6fc19` | 2026-05-18 | Manifest | `manifests/install-modules.json` (+1) | Include blender skill in install manifest |
| `044d186` | 2026-05-18 | Test | tests/hooks/insaits-security-monitor.test.js | Skip insaits-monitor subprocesses when python is absent |
| `bf17737` | 2026-05-18 | Test | eslint.config.js, tests/scripts/repair.test.js | Stabilize repair lifecycle on Windows |
| `680aeff` | 2026-05-18 | Test | scripts/operator-readiness-dashboard.js, tests | Enforce release publication checklist in readiness gates |
| 35× | various | **Docs only** | `docs/releases/2.0.0-rc.1/...` (35 files) | Operator readiness dashboards, billing readback evidence, owner-queue cleanup, blocker-evidence refreshes. **ZERO behavioral surface change** (skills/, agents/, commands/, hooks/ unchanged for these). |

**ECC behavioral surface (skills + agents + commands + hooks) Δ this period**:
- **+1 skill**: `blender-motion-state-inspection` (Blender introspection — physics specialty)
- **0 new agents**
- **0 new commands**
- **0 new hook scripts**

---

### §2.C Anthropic Upstream Primitives

#### anthropics-claude-code v2.1.144 (`69d7070`, 2026-05-19)
33-line CHANGELOG. Filtered for runtime-relevance:

| Item | Category | Runtime relevance |
|---|---|---|
| `/resume` support for **background sessions** — sessions started via `claude --bg` or agent view appear alongside interactive ones, marked with `bg` | Parallel-session UX | **HIGH** — runtime's "parallel execution 4 modes" §3 mentions `--bg` + `claude agents`/`logs`/`attach`/`stop`; this adds `/resume` capability for those |
| Background subagent completion notifications now show elapsed duration | UX | LOW |
| `/plugin` browse and discover panes show "when a plugin was last updated" | Plugin freshness | **MEDIUM** — directly counters CLAUDE.md cardinal-rule-1 W270 corollary (silent SHA drift) — UI now surfaces last-update for visual catch |
| `/model` semantic change: now changes model for **current session only**; press `d` for default | Model selection | LOW — only impacts manual UX |
| `/extra-usage` → `/usage-credits` (alias preserved) | Rename | LOW |
| Fixed: startup hang up to 75s when `api.anthropic.com` unreachable (captive portal/firewall/VPN) — side-channel API calls now time-out after 15s | Bootstrap robustness | **HIGH** for Z:-portable env w/ corporate proxy; non-issue locally |
| Fixed: MCP servers with paginated `tools/list` responses only returning first page, silently dropping tools | **MCP correctness** | **HIGH** — directly relevant to our 11 MCP servers; if any of them used pagination, we were silently losing tools pre-2.1.144 |
| Fixed: MCP images with unsupported MIME types (e.g. SVG) breaking conversation — now saved to disk + referenced in tool result | MCP robustness | MEDIUM |
| Fixed: file descriptor exhaustion when build runs inside skill directory — non-`.md` files no longer trigger skill reloads | Skill stability | MEDIUM — applies to our `.claude/skills/*/SKILL.md` × 18 |
| Fixed: Skill tool failing with permission error in headless mode (regression in v2.1.141) | Headless mode | **HIGH** for CI/`claude --print` flows |
| Fixed: plugins enabled only by project's `.claude/settings.json` show actionable `claude plugin install` hint | Plugin diagnostics | **HIGH** — directly applies to our settings.json `enabledPlugins` mechanism |
| Fixed: `claude mcp list` silently reports no servers when `.mcp.json` can't be parsed | **MCP correctness** | **HIGH** — our `.mcp.json` could regress unnoticed |
| Fixed: scrolling in attached background sessions on Windows (PgUp/PgDn, mouse wheel, Ctrl+O) | **Windows-specific** | **HIGH** for Z:-portable Windows runtime |
| Fixed: crash when closing terminal while attached to background session | Stability | MEDIUM |
| Fixed: ghost characters at left edge when switching panes in Agent View on Windows Terminal with CJK content | **Windows-specific** | MEDIUM |
| `/bg` and `←`-detach preserve directories added via `/add-dir` | Workflow | LOW |
| Fixed: Edit/Write refusing right after detaching session that was already editing in place | Stability | MEDIUM |
| Fixed: model selection not applying when changed via IDE picker / `applyFlagSettings` after startup | UX | LOW |
| Fixed: Bedrock/Vertex users unable to select Opus (1M context) (regression v2.1.129) | Model availability | LOW (not on Bedrock) |

**Net actionable**: v2.1.144 ships 8 fixes directly relevant to our Z:-portable Windows + MCP + plugin + skills + headless flows. **Operator should upgrade installed CLI to v2.1.144 if currently on ≤v2.1.143**.

#### anthropics-claude-plugins-official (`9f0275a`, 11 commits)

3 new plugin entries in `marketplace.json` (canonical of 264→270):
- `convex-backend` (Convex DB) — vendor-specific
- `save-to-spotify` — vendor-specific
- `zoominfo` (ZoomInfo lookup) — vendor-specific

**Infra/governance** (more important than vendor adds):
- `237a6b9` "Add CI check for HTTP MCP server URL liveness" — **Anthropic now CI-gates HTTP MCP server URLs in the official marketplace**. Our runtime's `.mcp.json` mostly uses local stdio + npx; only `langfuse` (HTTP-ish) is HTTP-style. Relevance: LOW for us, but signals Anthropic's MCP-supply-chain hygiene direction.
- `e98784f` "Run plugin SHA bump nightly instead of weekly" — **Anthropic now bumps plugin SHA pins NIGHTLY**, validating CLAUDE.md cardinal-rule-1 W270 corollary that silent SHA drift is the dominant primitive-hygiene risk and that the cache-delete + fresh-install fix is correct (Anthropic now applies the same discipline server-side).
- `b7c0654` "Raise bump cap with verdict cache and skip-and-revert" — bump-orchestration tightening.
- `0b9a622` "Fix broken plugin source configs and bump their SHAs" — silent-drift defensive fix landing nightly.

#### anthropics-skills (`6a5bb06`, 1 commit)
- 1-line API-doc fix in `skills/claude-api/shared/managed-agents-api-reference.md` (model config shape). LOW relevance — content layer.

#### anthropics-claude-agent-sdk-python (`5459309`) & typescript (`e62865e`)
- Both: 1-line CLI version bump to match 2.1.144. No SDK shape changes.

#### anthropics-claude-quickstarts, anthropics-knowledge-work-plugins
- Zero new commits since prior pull. CLEAN.

---

## §3 — Primitive Adoption Matrix

For NEW primitives discovered in §2 (only items the runtime could meaningfully act on):

| # | NEW Primitive | Source | Status | Runtime Citation / Rationale |
|---|---|---|---|---|
| 1 | Codex hooks engine 5→8 (`PermissionRequest`, `PreCompact`, `PostCompact`) | CCBP `ac0d87d` (codex-side) | **REJECTED-BY-DESIGN** (W280h) | Codex hooks are upstream-shipped via `openai-codex` plugin (cardinal-rule-2). Three new hook events would auto-fire IF our installed codex plugin pulls upstream. No runtime action required — `/codex:setup` would resolve at next install/refresh. Not a CLAUDE.md/.claude/settings.json change. |
| 2 | Background-session `/resume` support (v2.1.144) | anthropics-claude-code | **NOT-ADOPTED** but **AUTO-AVAILABLE on CLI upgrade** | CLAUDE.md "parallel-execution (4 modes)" already documents background sessions. Adding `/resume` integration is a CLI-version-bump benefit, not a runtime config change. Cardinal-rule-1 compliant: relies on installed CLI v2.1.144. |
| 3 | `/plugin` panes show "last updated" | anthropics-claude-code v2.1.144 | **NOT-ADOPTED** but **AUTO-AVAILABLE on CLI upgrade** | Directly counters W270 silent-SHA-drift risk that CLAUDE.md cardinal-rule-1 cites. Auto-available; no rule change needed. |
| 4 | MCP `tools/list` pagination fix | anthropics-claude-code v2.1.144 | **NOT-ADOPTED but high-impact-on-upgrade** | If our 11 MCP servers ever returned >1 page, we were silently losing tools. CLI-upgrade resolves. Recommended op action: upgrade CLI. |
| 5 | `claude mcp list` now surfaces `.mcp.json` parse errors | anthropics-claude-code v2.1.144 | **NOT-ADOPTED but high-impact-on-upgrade** | Validates our `.mcp.json` invariants on every list call. CLI-upgrade resolves. |
| 6 | Windows bg-session scrolling fix (PgUp/PgDn/Ctrl+O) | anthropics-claude-code v2.1.144 | **NOT-ADOPTED but Z:-portable Windows-relevant** | Directly applies to our env. CLI-upgrade resolves. |
| 7 | Skill tool headless-mode permission-error fix | anthropics-claude-code v2.1.144 | **NOT-ADOPTED but high-impact-on-upgrade** | Affects `claude --print` and CI flows. CLI-upgrade resolves. |
| 8 | Skill-dir FD-exhaustion fix (non-`.md` files no longer trigger reload) | anthropics-claude-code v2.1.144 | **NOT-ADOPTED but high-impact-on-upgrade** | Affects our `.claude/skills/*` × 18 stability. CLI-upgrade resolves. |
| 9 | Project-only `enabledPlugins` actionable hint | anthropics-claude-code v2.1.144 | **NOT-ADOPTED but high-impact-on-upgrade** | Diagnoses our `enabledPlugins` mechanism. CLI-upgrade resolves. |
| 10 | ECC Unicode-tag-block invisibility detection in `check-unicode-safety` | ECC `e3483fd`+`b068069`+`33ed494` | **NOT-ADOPTED** | ECC's own CI hardening — applies to ECC repo, NOT to our runtime. Cardinal-rule-2 says we use direct-CLI gitleaks/ruff/shellcheck/git for security, not ECC's invisibility scanner. No runtime action needed. Cite: W255 self-invent purge spirit. |
| 11 | ECC OIDC scope-tightening (release workflow) | ECC `7911af4` | **NOT-ADOPTED** | ECC's release CI — internal to ECC, irrelevant to our runtime. |
| 12 | ECC OpenAI-compatible provider hardening (empty-choices guard) | ECC `cc62e89`+`eb0d893` | **NOT-ADOPTED** | ECC's LLM-provider layer — orthogonal to our usage. We invoke ECC only via plugin skills/commands, not its raw LLM layer. |
| 13 | ECC MCP HTTP 406 = reachable | ECC `386326d` | **NOT-ADOPTED** | ECC's own `scripts/hooks/mcp-health-check.js`. Our runtime uses Anthropic-native MCP health via `claude mcp list`; we don't run ECC's health-check. |
| 14 | ECC **Blender motion-state-inspection skill** (164 LOC) | ECC `922d2d8` | **NOT-ADOPTED, NOT-RECOMMENDED** | Niche physics/animation domain (meter-scale threshold). Zero overlap with our agentic-engineering corpus. ECC plugin auto-fire would never trigger it. SKIP per W280h adoption-discipline. |
| 15 | Anthropic marketplace: `convex-backend` plugin | anthropics-claude-plugins-official `9f0275a` | **NOT-ADOPTED, NOT-RECOMMENDED** | Vendor-specific (Convex DB). Not relevant unless we adopt Convex. |
| 16 | Anthropic marketplace: `save-to-spotify` plugin | anthropics-claude-plugins-official `61b760a` | **NOT-ADOPTED, NOT-RECOMMENDED** | Consumer integration. Irrelevant to install-only runtime. |
| 17 | Anthropic marketplace: `zoominfo` plugin | anthropics-claude-plugins-official `f475d3c` | **NOT-ADOPTED, NOT-RECOMMENDED** | Enterprise sales-intel. Irrelevant. |
| 18 | Anthropic nightly plugin-SHA-bump cadence (weekly → nightly) | anthropics-claude-plugins-official `e98784f` | **AUTO-ABSORBED — VALIDATES W270 corollary** | Anthropic itself now applies the W270 anti-silent-drift discipline server-side. CLAUDE.md cardinal-rule-1 W270 corollary text remains correct; no update needed. |
| 19 | Anthropic marketplace CI: HTTP MCP-URL liveness check | anthropics-claude-plugins-official `237a6b9` | **AUTO-ABSORBED** | Anthropic gates HTTP MCP server URLs in marketplace publication. Validates our preference for local stdio + npx in `.mcp.json` (cardinal-rule-2 + CR-9). |

**Adoption summary**: 0 primitives require CLAUDE.md / .claude/settings.json edits. **The dominant operator-action is a CLI upgrade to v2.1.144** which auto-absorbs items 2-9.

---

## §4 — Stale-Cite Findings

Scanned 277 current (non-archive) tracked W*.md + CLAUDE.md + CLAUDE.local.md files. Found 31 `@ HEAD <sha>` occurrences across 15 unique SHAs.

### §4.A SHA-Level Stale Cites (no clone resolves)

After expanding probe to 349 known clones (`Z:/claude-sota-installed-repos`, `Z:/repos/deps`, `Z:/claude-sota-installed/.claude/plugins/cache`), 4 SHAs do not resolve in any local clone:

| SHA (12-char prefix) | Likely repo | Citing W-file (samples) | Severity |
|---|---|---|---|
| `8863af47d64c` | `daymade/claude-code-skills` (not locally cloned) | `W295-CANDIDATE-AUDITS/daymade-claude-code-skills.md:31` | LOW — candidate-audit page, audit verdict already cited (T3 PATTERN-STUDY) |
| `98addbd6` | unknown | `W296-STREAM-E-FOUNDATION-AUDIT.md:153` | LOW — wave-archived foundation audit |
| `688ca1b3` | unknown | `W296-STREAM-E-FOUNDATION-AUDIT.md:159, 163` | LOW — wave-archived |
| `ffd563d668` | unknown | `W304-STREAM-D-LOCAL-SKILLS-AGENTS-AUDIT.md:101, 134` | LOW — wave-archived |

All 4 stale SHAs are in historical wave-audit docs, NOT in `CLAUDE.md` or `CLAUDE.local.md`. They are research artefacts, not cardinal-rule anchors.

### §4.B Cardinal-Rule Cite-Anchor Stability

| Cite in CLAUDE.md / CLAUDE.local.md | Anchor SHA | SHA resolves? | Content drift @ origin/main? | Line-number drift? |
|---|---|---|---|---|
| `CLAUDE.md:3`: CCBP `claude-memory.md:34-40 @ HEAD 1386b0e` (ancestor/descendant load semantics) | `1386b0e` | YES (CCBP) | NO — byte-identical | NO — still :34-40 |
| `CLAUDE.local.md`: CCBP `claude-memory.md:113 @ ac0d87d` (CLAUDE.local.md gitignore) | `ac0d87d` | YES (CCBP) | NO — byte-identical | NO — still :113 |
| `CLAUDE.local.md`: CCBP `claude-settings.md:826 @ ac0d87d` (autocompact ~95% default) | `ac0d87d` | YES (CCBP) | NO — content text identical | **YES — at `ac0d87d` the row was at :847, NOT :826**. Working tree (`48f2ceb` local-only ahead-commit) has it at :826. Cite was written against working-tree but tagged with `ac0d87d`. |
| `CLAUDE.local.md`: CCBP `claude-settings.md:877-921 @ ac0d87d` (env-block authority) | `ac0d87d` | YES | NO — env-vars all still present | **YES — env-block table has shifted by ~20 lines at origin/main; rows previously at :877-921 are now ~:895-:945**. Same issue: cite written against working tree, tagged with upstream SHA. |
| `CLAUDE.md` cite of W255 self-invent purge counts | `pre-W255-cleanup-*` (tag) | (untested) | n/a | n/a |

### §4.C Severity Classification

| Stale-cite class | Count | Severity | Action |
|---|---:|---|---|
| Wave-archive SHA stale (not in CLAUDE.md / CLAUDE.local.md) | 4 | LOW | NONE — historical audit pages, never re-read |
| Cardinal-rule cite line-number drift on `claude-settings.md` | 2 | **MEDIUM** | RECOMMENDED: at next CLAUDE.local.md edit, re-validate :826 → :847 and :877-921 → :895-:945; OR rephrase to anchor-by-section-heading (`### Settings Hierarchy` etc.) instead of line numbers. |
| Cardinal-rule cite SHA NOT resolving | 0 | — | NONE |
| Cardinal-rule cite content drift | 0 | — | NONE |

---

## §5 — Recommended Adoptions

### REC-1 — Operator: Upgrade installed Claude Code CLI to v2.1.144
- **SEVERITY**: HIGH (multiple silent-bug fixes already shipped)
- **BLAST_RADIUS**: Entire runtime + all sub-sessions
- **REVERSIBILITY**: TRIVIAL (`claude --version` → revert install)
- **OPERATOR-ACTION-VS-AUTO**: **OPERATOR-ONLY**. CLI binary upgrade.
- **Rationale**: Absorbs 8 silent-bug fixes (MCP `tools/list` pagination, `claude mcp list` parse-error surfacing, Skill-tool headless-mode permission error, FD-exhaustion under skills/, Windows bg-session scrolling, `/plugin` last-updated UI, project-only `enabledPlugins` actionable hint, captive-portal startup hang). None require CLAUDE.md changes; ALL auto-fire on upgrade.

### REC-2 — Operator: Validate codex-plugin hooks engine on next `/codex:setup`
- **SEVERITY**: LOW
- **BLAST_RADIUS**: codex review-gate Stop hook + PreCompact/PostCompact codex behavior
- **REVERSIBILITY**: TRIVIAL (`disable<Hook>Hook: true` in `hooks-config.local.json`)
- **OPERATOR-ACTION-VS-AUTO**: **AUTO-DOABLE on next plugin refresh**. If the upstream `openai-codex` plugin has not absorbed CCBP `ac0d87d` (5→8 hooks), file an issue OR `/codex:setup` may pull and rewire automatically.
- **Rationale**: `PreCompact`/`PostCompact` hooks could be used to checkpoint state before/after auto-compaction (relates to W280c manual `/compact` discipline). `PermissionRequest` complements our `superpowers:verification-before-completion` discipline.

### REC-3 — Documentation hygiene: rewrite CLAUDE.local.md line-cites to anchor by section heading instead of line number
- **SEVERITY**: LOW (no functional impact; correctness comment-level)
- **BLAST_RADIUS**: 2 lines in CLAUDE.local.md
- **REVERSIBILITY**: trivial (text-only edit)
- **OPERATOR-ACTION-VS-AUTO**: **OPERATOR — out of W309 Stream E read-only scope** (this stream is read-only per goal brief)
- **Rationale**: CCBP `claude-settings.md` is a living table (264→270 entries on `marketplace.json` side, ~+21 rows on `claude-settings.md` env-vars table in past month). Line-number drift will recur every release. Anchor-by-heading `### Model Environment Variables` would be drift-immune.
- **NOT-BLOCKING**: Current cites still resolve via working-tree (local-ahead `48f2ceb`); operator's intent is clear.

### REC-4 — No-op: ECC behavioral surface adds (1 skill, blender)
- **VERDICT**: **REJECT** per W280h ADOPTION-VERDICT discipline (zero installs from non-converged candidates)
- **Rationale**: `blender-motion-state-inspection` is single-domain (3D/animation/physics), no overlap with agentic-engineering. ECC is already vendored as a plugin — local file install would violate cardinal-rule-3 (subagents = installed upstream plugins, NOT ad-hoc local additions).

### REC-5 — No-op: 3 new Anthropic marketplace plugins (convex-backend, save-to-spotify, zoominfo)
- **VERDICT**: **REJECT** — all vendor-specific (DB, music, sales-intel) with no runtime relevance.

### REC-6 — No-op: ECC's own security hardening (Unicode-tag detection, IOC scan, OIDC scope)
- **VERDICT**: **AUTO-ABSORBED via ECC plugin install** when the upstream cache refreshes. The hardening applies to ECC's own CI/release flow and to its in-repo `scan-supply-chain-iocs.js`; cardinal-rule-2-compliant pre-commit gate in our runtime is `gitleaks·ruff·shellcheck·git` (no ECC scripts wired). No runtime config change needed.

### REC-7 — Optional: re-run `tools/bootstrap-runtime.ps1` after CLI upgrade
- **SEVERITY**: LOW-MEDIUM (only if upgrade breaks hindsight local state or codex review-gate)
- **BLAST_RADIUS**: hindsight `:9077` + codex `${CLAUDE_PLUGIN_DATA}/state.json`
- **REVERSIBILITY**: idempotent (W280b)
- **OPERATOR-ACTION-VS-AUTO**: **OPERATOR**
- **Rationale**: v2.1.144 may regress plugin cache state on fresh upgrade. Bootstrap is idempotent + partial-repair-safe.

---

## §6 — Honest-Non-Finding Tags

- **§2.A CCBP best-practice/*.md**: ZERO substantive doc changes in past 10 days. Only release-cadence chores. The single substantive commit `ac0d87d` is codex-CLI configuration (not best-practice cardinal-rule prose).
- **§2.B ECC behavioral surface (skills/agents/commands/hooks)**: Only 1 new skill (blender, niche). All other 48 commits are docs/CI/security/test/manifest noise from ECC's release-prep cycle.
- **§2.C Anthropic-skills + Anthropic-quickstarts + Anthropic-knowledge-work-plugins**: Effectively no substantive change in past 10 days.
- **§4 Stale-cite hunt on archive**: Of 1874 `@ HEAD <sha>` cites across 365 unique SHAs, the vast majority (≥358 SHAs) are pre-W255-cleanup archive references. Only 4 stale in current docs; ZERO stale in CLAUDE.md or CLAUDE.local.md.
- **Cardinal-rule cite anchors**: ALL 4 cited SHAs resolve in CCBP clone (`1386b0e`, `ac0d87d`, plus W259-era pinned anchors). Content for `claude-memory.md:34-40` and `:113` is byte-identical at all cited SHAs and at origin/main. Only `claude-settings.md` line-numbers have drifted (line :826 → :847, line :877-921 → ~:895-:945), content unchanged.
- **No cardinal-rule violations** found in CCBP-ECC drift.
- **No runtime obligations** newly created by CCBP or ECC HEAD movement.

---

## Appendix A — Files Fast-Forwarded (clone repos only; runtime untouched)

```
Z:/claude-sota-installed-repos/affaan-m-everything-claude-code       efda226 → 33ed494  (+49)
Z:/claude-sota-installed-repos/anthropics-claude-code                8bdbb72 → 69d7070  (+2)
Z:/claude-sota-installed-repos/anthropics-skills                     f458cee → 6a5bb06  (+1)
Z:/claude-sota-installed-repos/anthropics-claude-plugins-official    b5a156b → 9f0275a  (+11)
Z:/claude-sota-installed-repos/anthropics-claude-agent-sdk-python    c352a50 → 5459309  (+1)
Z:/claude-sota-installed-repos/anthropics-claude-agent-sdk-typescript fa5d004 → e62865e  (+1)
```

`Z:/repos/deps/claude-code-best-practice-shan` NOT fast-forwarded due to 1 local-only commit (`48f2ceb`); origin behind 9 commits but content-equivalent line-shift-only.

## Appendix B — Files Untouched

- `Z:/claude-sota-installed/CLAUDE.md`
- `Z:/claude-sota-installed/CLAUDE.local.md`
- `Z:/claude-sota-installed/.claude/settings.json`
- `Z:/claude-sota-installed/.mcp.json`
- `Z:/claude-sota-installed/.claude/skills/*/SKILL.md` (× 18)

per goal brief read-only constraint.

## Appendix C — Tool Budget

- Wall-clock: ~12 minutes (within 25-min cap)
- API cost estimate: ~$0.45 equivalent (within $1.50 cap)
- Sandbox-execute pattern used for all large git/grep operations after PreToolUse hook guidance (no raw match floods).
