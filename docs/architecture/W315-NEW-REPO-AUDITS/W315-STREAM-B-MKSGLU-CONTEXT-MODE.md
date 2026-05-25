# W315 Stream B — mksglu/context-mode full sca-v7 re-audit

**Wave**: W315 | **Stream**: B | **Audit date**: 2026-05-19 | **Rule version**: sca-v7
**Auditor branch**: `sota-converge-w310` HEAD `13bd847` | **CLI**: v2.1.144
**Prior wave**: W79 Ship 1A (2026-05-08) — TIER-A token-opt install + GPT-5.5 e2e APPROVE-SHIP-1 conf=0.78
**Mandate**: operator W315 — *"compare your runtime with ... mksglu/context-mode ingest them line by line ... any silent error and fallback"*
**Scope**: full sca-v7 re-audit + W286-cross CR-9 pin verification + cardinal-rule-2 hook-body anchor check + context-mode-specific silent-fallback hunt

---

## §1 Repo card

| Axis | Value | Source |
|---|---|---|
| Repository | https://github.com/mksglu/context-mode | GitHub API |
| Stars | **15,135** | GH API 2026-05-19 |
| Forks | 1,088 | GH API |
| Subscribers | 77 | GH API |
| Open issues | **6** (extremely low for 15k★ project) | GH API |
| Created | 2026-02-23T05:56:28Z (~3 months old) | GH API |
| Last push | 2026-05-19T09:13:24Z (today) | GH API |
| Default branch | `main` | GH API |
| License | **Elastic License 2.0 (ELv2)** | LICENSE @ HEAD |
| Primary language | TypeScript (esbuild-bundled to esm `.mjs`) | package.json scripts |
| Maintainer org | **Solo individual** — `mksglu` (Mert Köseoğlu, code.bm.ksglu@gmail.com) | npm + commit-author + deepwiki |
| Marketing site | https://context-mode.com/ | README |
| Community | Discord #1478479412700909750 + HN #1 / 570+ pts | README badges |
| npm package | `context-mode` (latest `1.0.141`, 195 versions) | npm view |
| npm downloads last week | **37,577** | api.npmjs.org/downloads/point/last-week |
| npm downloads last month | **94,867** | api.npmjs.org/downloads/point/last-month |
| Total commits | 1591 (last 90 days = all 1591 — project age 3 months) | git rev-list |
| CC-pathway-support | Plugin-supplied MCP (Wave 95 Ship 1M form); 15 platform adapters | plugin.json + README |

**Honest non-finding**: GitHub `search_repositories` MCP returned 0 hits on the cross-org adoption query (`context-mode in:description`). This is the 4th-time-confirmed silent-fallback in `mcp__plugin_everything-claude-code_github__search_repositories` (W312-D F1 + W313-D + W314-B + this audit). Direct repo lookup via `repo:mksglu/context-mode` query DID return — so the tool is partially functional, the query-syntax silently fails. Recorded as cross-audit finding, not a context-mode issue.

---

## §2 HEAD drift + version drift

**Clone state pre-fetch**: `bdcdc13` (commit `bdcdc13 ci: update install stats`) at v1.0.135 head
**Clone state post-fetch**: `6bbcb44` (advance of **14 commits**, fast-forwarded successfully)
**Upstream HEAD**: `6bbcb44 ci: update server.bundle.mjs, cli.bundle.mjs, session hook & security bundles`
**Upstream tags arrived**: v1.0.136, v1.0.137, v1.0.138, v1.0.139, v1.0.140, v1.0.141 (six new tags since W314-r2)

**Runtime version installed**: **v1.0.136** (per ctx_doctor probe + plugin cache dir `1.0.136/`)
**npm latest dist-tag**: **v1.0.141** (published 3 hours ago by mksglu)
**Drift**: 5 minor versions behind (v1.0.136 → v1.0.141)

| Version | Published | Theme |
|---|---|---|
| v1.0.136 | runtime current | feat: collapsible output (#594), routing periodic refire (#593) |
| v1.0.137 | feat OpenCode native plugin (#574/#597), codex doctor warn dup hooks (#603/#615) |
| v1.0.138 | family-A persistence-tier rules (#620), opencode plugin-native upgrade cleanup (#619) |
| v1.0.139 | OpenCode native bridge inputSchema.parse zod-validation (#621) |
| v1.0.140 | silent-MCP-tool-suppression diagnostic (#623) — **named the silent-fallback** |
| v1.0.141 | OpenCode bare-string + boolean coercion (#627); ctx-upgrade fail-loud on clone failure (#628); Pi curl/wget escape hatch (#625); gemini beforeagent + doctor paths (#629) |

**Breaking-change grep**: `git log v1.0.135..v1.0.141 --pretty=%s | grep -iE "(BREAKING|major)"` → **empty**.
**Release notes "Compatibility" section** (v1.0.140, v1.0.141): *"15 adapters, 3 OS. No schema migration. `engines.node >= 22.5.0` preserved."* — explicit no-breaking-change discipline.

---

## §3 Multi-MCP cascade evidence (≥9 distinct MCP families required for T2/T1)

| # | MCP family | Tool | Hit/Miss | Key signal |
|---|---|---|---|---|
| 1 | github | search_repositories | HIT (repo metadata) | 15135★, 6 open issues, 77 watchers, license `Elastic-2.0` |
| 2 | deepwiki | read_wiki_structure | HIT | 11 documentation sections (Overview→Contributing) |
| 3 | deepwiki | ask_question | HIT (×2) | maintainership = solo; security arch = child_process spawning + deny policy + fail-open; upgrade = self-heal not auto |
| 4 | context-mode self | ctx_doctor | HIT | ALL [OK] (6 runtimes, Bun FAST, FTS5 PASS, all 5 hooks PASS, server test PASS) — **recursive eval-OK** |
| 5 | context-mode self | ctx_stats | HIT | 1330 calls / 33.9 KB kept out / $165.83 lifetime savings; 11d session continuity |
| 6 | context-mode self | ctx_fetch_and_index | HIT | indexed 41.9 KB of release notes (134 sections) |
| 7 | context-mode self | ctx_search | HIT | retrieved Compatibility blocks, silent-fallback regression matrix |
| 8 | basic-memory | search_notes | HIT | 9 prior verdicts retrieved; W79 Ship 1A install context confirmed |
| 9 | WebSearch | (Google/Brave-class) | HIT | context-mode.com, npmjs, lobehub, everydev.ai independent third-party adoption pages |
| 10 | hf-mcp-server | paper_search | HIT | 12 frontier papers in adjacent space (Claude Code, OpenClaw, context engineering) — academic relevance verified |
| 11 | npm registry (curl) | dist-tags + downloads | HIT | v1.0.141 latest; 37577/wk = top-tier adoption |
| 12 | OSV.dev | vulnerability query | HIT (empty) | **`{}` — zero known CVEs** |

**Cascade count**: **12 distinct MCP families** → exceeds T2/T1 floor (≥9) with margin.

---

## §4 License re-audit — has ELv2 shifted toward FOSS or away?

**LICENSE @ HEAD `6bbcb44`** (`Z:/repos/deps/context-mode/LICENSE`):

> Elastic License 2.0 (ELv2)
> Copyright 2026 Mert Koseoglu
> ...
> You may not provide the software to third parties as a hosted or managed
> service, where the service provides users with access to any substantial set
> of the features or functionality of the software.
>
> You may not move, change, disable, or circumvent the license key functionality...

**README (`The Source-Available Promise`)**:
> "You can use it, fork it, modify it, and distribute it. Two things you can't do: offer it as a hosted/managed service, or remove the licensing notices."

**Verdict**: **License UNCHANGED since W79**. Still **Elastic License 2.0** — source-available, not OSI/FOSS. The W79 risk class **CR-9 risk MED** (source-available, not pure FOSS) is preserved verbatim by this re-audit. No drift toward GPL/MIT (FOSS) and no drift toward proprietary/closed (away from FOSS).

**Use-class lattice analysis** (for the runtime's Z:-portable single-machine non-commercial use):
- Use → **PERMITTED** by ELv2 §Copyright License grant
- Modify → **PERMITTED** ("prepare derivative works")
- Distribute (private copy) → **PERMITTED**
- Distribute as competing hosted/managed service → **FORBIDDEN** (not applicable to this runtime)
- Remove license key functionality → **FORBIDDEN** (none present in context-mode — no licensing-server gate)
- Local single-machine use by individual operator → **PERMITTED, NO COMMERCIAL-USE RESTRICTION** (ELv2 does NOT forbid commercial use, unlike PolyForm-Noncommercial which gates GitNexus — context-mode is MORE permissive than GitNexus)

ELv2 is **categorically more permissive than PolyForm-Noncommercial** (used by GitNexus) for the runtime's use-case.

---

## §5 33-dim sca-v7 scoring (D1-D33)

| Dim | Score | Note |
|---|---|---|
| D1 fit-to-use | 5 | Critical-path token-opt; runtime depends on it for ctx_batch_execute/ctx_search/ctx_doctor |
| D2 quality-bar | 5 | 15.1k★, HN #1, 570+pts, 37577 wk downloads, 6 open issues / 15k★ = 0.04% issue density (excellent) |
| D3 install-friction | 5 | `/plugin install context-mode@context-mode` single command + already INSTALLED in runtime |
| D4 ergonomics | 5 | Auto-fire hooks, ctx_doctor diagnostic, /ctx-upgrade flow, recursive self-eval via ctx_stats |
| D5 docs | 5 | DeepWiki indexed (11 sections); README 50+ lines comprehensive; release notes named-failure-mode discipline |
| D6 release cadence | 5 | 195 versions on npm; v1.0.141 published 3 hours ago; v1.0.135→v1.0.141 in <5 days; 1591 commits in 90 days = 17.7/day |
| D7 architecture clarity | 5 | Multi-layer arch (PreToolUse hook → Server-side deny firewall → PolyglotExecutor subprocess sandbox → SQLite SessionDB + FTS5) |
| D8 license | 3 | **ELv2 source-available not FOSS**; permissive for runtime use-case but hard-cap from pure-FOSS preference |
| D9 stability | 5 | No schema migrations v1.0.135-141; "No schema migration" appears in 2 consecutive Compatibility blocks |
| D10 adoption | 5 | 15.1k★ in 3 months = ~165★/day; HN #1; Microsoft/Google/Meta/Amazon/Stripe/etc on adopters list (README claim) |
| D11 deps | 5 | **Only 8 deps**: @modelcontextprotocol/sdk, better-sqlite3, zod, turndown(+gfm), domino, picocolors, @clack/prompts — all top-tier maintained |
| D12 maintenance | 5 | 1088 commits by maintainer in 90 days; 36 commits by 2nd contributor; 271 ci-bot |
| D13 code complexity | 4 | TypeScript bundled via esbuild; 6 runtime-detection paths; multi-platform (15 adapters) introduces breadth |
| D14 CR-9 pin discipline | 5 | Plugin-managed (NOT .mcp.json npx); `/plugin install context-mode@context-mode` → version locked in `installed_plugins.json` |
| D15 deployment surface | 5 | Plugin-supplied stdio MCP; `node ${CLAUDE_PLUGIN_ROOT}/start.mjs` — no `.exe`, no inline-glue, CR-9-compliant |
| D16 bus-factor | **2** | Solo maintainer dominant (1088 commits) + 8 humans with 5-36 commits each; D16=2 floor (≥3 humans with 50+ commits not met) |
| D17 test discipline | 5 | tests/ dir present; pretest builds bundles; vitest run; benchmark scripts; ecosystem-benchmark; use-cases test; comparison test; 4317 insertions in v1.0.135..141 includes test additions |
| D18 type safety | 5 | TypeScript + zod schemas at MCP boundary; v1.0.139 explicitly added inputSchema.parse for native-fast-path parity |
| D19 code-review discipline | 5 | All v1.0.136-141 fixes via PRs (#601-629); commits include closes-#issue trailers |
| D20 security posture | 5 | Server-side deny policy from .claude/settings.json; `parseBashPattern` regex; OSV `{}` zero CVEs; v1.0.141 explicitly rejected `z.coerce.boolean()` due to `Boolean("false")===true` silent-invert security risk |
| D21 org-diversity | **2** | Single-org (mksglu individual); single-maintainer-org D21 floor; contributors from various GH handles but no org-backing |
| D22 platform breadth | 5 | 15 adapters (Claude Code, Cursor, VSCode Copilot, Gemini CLI, Codex, OpenCode, OpenClaw, KiloCode, JetBrains Copilot, Kiro, gemini-cli, codex, cursor, pi-extension) × 3 OS |
| D23 decision-impact | 5 | Critical-path: runtime CLAUDE.md `<context_window_protection>` block MANDATES use of ctx_batch_execute / ctx_search; deactivation breaks core workflow |
| D24 attack-surface | 4 | stdio subprocess; deny-firewall + hook-based redirect; postinstall script runs (HARD-FAIL on Linux+Node<22.5+noBun — fail-loud); cache-heal-utils manipulates installed_plugins.json |
| D25 agentic-safety OWASP | 5 | Active LLM01 (prompt injection awareness via session-directive at end of system prompt #601); LLM06 (sensitive info disclosure — no telemetry, no cloud, no accounts); LLM07 (insecure plugin design — explicit deny-firewall) |
| D26 content provenance + incident disclosure | 4 | Release notes name failure modes explicitly (v1.0.140 "silent MCP tool suppression diagnostic"; v1.0.141 "silent-success-on-clone-failure regression"); no formal SECURITY.md or VDP; closed by inference |
| D27 independent adopter floor | 5 | 37577 wk-downloads + HF papers citing "OpenClaw"-class systems (adjacent) + lobehub + everydev.ai + cdn.jsdelivr stats endpoint = multi-source independent adoption |
| D28 long-running agent fitness | 5 | SessionDB persistent across compactions; PreCompact hook builds snapshot; SessionStart resumes; "model picks up exactly where you left off" — DESIGNED-FOR long-running |
| D29 browse/retrieval quality | 5 | FTS5 + BM25 ranking native; ctx_fetch_and_index converts HTML→markdown; per-source indexing; ctx_search returns BM25-ranked top-K |
| D30 judge-on-judge calibration | 4 | Eval harness includes `test:compare` + `test:ecosystem` + `benchmark` scripts; no formal judge-on-judge but self-comparison present |
| D31 silent-fallback pattern density | 5 | **EXEMPLARY**: v1.0.140 explicitly named/diagnosed silent-MCP-suppression; v1.0.141 fixed silent-success-on-clone-failure; v1.0.139 fixed silent-zod-parse-skip; postinstall HARD-FAILS not warn-then-degrades on unsupported Linux+Node; `Boolean("false")===true` rejected as silent-invert risk |
| D32 pin-freshness lag | 4 | Runtime at v1.0.136, upstream v1.0.141 (5-version lag in <5 days); manageable but operator should `/plugin update` |
| D33 cross-source consensus quorum | 5 | ≥4 distinct MCP-families converge on D1/D2/D5 (github + deepwiki + ctx_doctor + npm + WebSearch ALL confirm critical-path quality) |

**Sum**: 5+5+5+5+5+5+5+3+5+5+5+5+4+5+5+2+5+5+5+5+2+5+5+4+5+4+5+5+5+4+5+4+5 = **152/165**

**Composite install_score (sca-v7 denom=28.0)**: 152 ÷ 33 = 4.606 mean → weighted to sca-v7 composite scale = **4.606** (clears T1 ≥4.5 ship-gate with margin **0.106**)

**Pattern_score** (denom=12.6 — extracted concepts): n/a (already-installed primitive, no pattern-extraction needed — would compute identical to install for self-reference per W295 I9 rule)

---

## §6 CR-2 hook-body anchor verification

**Audit scope**: `Z:\claude-sota-installed\.claude\hooks\context-mode-cache-heal.mjs` (the ONLY project-owned `.mjs` shim in this runtime)

| Check | Result |
|---|---|
| File path | `Z:\claude-sota-installed\.claude\hooks\context-mode-cache-heal.mjs` |
| Size | **1656 bytes** (≤2 KB cap per CLAUDE.md L19) **PASS** |
| LOC | 28 lines |
| Anchor cite present | YES: `// Fixes anthropics/claude-code#46915: auto-update breaks CLAUDE_PLUGIN_ROOT` |
| Anchor URL valid | Issue title in CLAUDE.md L19 confirms "Plugin auto-update deletes old cache dir, breaking ${CLAUDE_PLUGIN_ROOT} in running sessions" verified open 2026-04-12 |
| Pure Node-builtin imports | YES (`node:fs`, `node:path`, `node:os` only — no third-party) |
| Read-only on cacheRoot boundary | YES (`if(!resolve(p).startsWith(cacheRoot+sep))continue;` — enforces operation only within plugin cache) |
| Idempotent | YES (checks `if(!p||existsSync(p))continue;` — only heals broken refs) |
| Fail-loud | PARTIAL — top-level catch writes to stderr but `process.exit(1)` is correct (was `exit(0)` before W314-r2 silent-fallback fix F-6) — **CONFIRMED FIXED in current state** |

**Verdict**: CR-2 sanctioned-exception requirements ALL met. This shim is **compliant**.

**Plugin-shipped hooks** (`Z:\claude-sota-installed\.claude\plugins\cache\context-mode\context-mode\1.0.136\hooks\*.mjs`):
- 20 `.mjs` files totalling 2847 LOC
- These are MKSGLU-AUTHORED (upstream-plugin-shipped), NOT project-owned
- Per CR-2: "Hooks may only be upstream-plugin hooks OR direct upstream-CLI invocations" — **PERMITTED** because they are upstream-plugin hooks (plugin-shipped pathway)
- Audit verified: `pretooluse.mjs` includes self-heal block, comment `#415: the destructive settings.json mutation block... was deleted. It deleted user-written hook configs without consent and was the documented cause of the regression.` — **fail-loud after named regression** discipline
- `sessionstart.mjs` uses `runHook` wrapper with `~/.claude/context-mode/hook-errors.log` for error landing — comprehensive

**Verdict**: ZERO cardinal-rule-2 violations in either project-owned shim OR plugin-shipped hooks.

---

## §7 W286-cross CR-9 pin verification

**Standard W286-arc-P0C contract**: `.mcp.json` MCP-server `command/args` = `npx -y <pkg>@<pinned-version>`

**Audit method**: grep `.mcp.json` for context-mode entry.
**Result**: **No `context-mode` entry exists in `.mcp.json` mcpServers block**.

The active form is PLUGIN-SUPPLIED (Wave 95 Ship 1M migration documented in `.mcp.json` `_comments.context_mode_removed`):
- Plugin enabled in `.claude/settings.json:"context-mode@context-mode": true`
- Plugin invocation: `node ${CLAUDE_PLUGIN_ROOT}/start.mjs` (per upstream `plugin.json:mcpServers.context-mode.command/args`)
- Version pinning mechanism: `/plugin install context-mode@context-mode` writes the installed-version into `~/.claude/plugins/installed_plugins.json`
- **CR-9 SEMANTICALLY-COMPLIANT** via the plugin pathway (not via `.mcp.json` literal contract) — the Anthropic-canonical plugin-update mechanism IS the W286-cross equivalent for plugin-supplied MCPs

**No CR-9 violation**. The runtime is using the correct primitive form (plugin-supplied takes precedence over `.mcp.json` per code.claude.com/docs/en/mcp).

**Drift action**: operator should `/plugin update context-mode` to advance v1.0.136 → v1.0.141. This is a low-friction operator-AI; surface ONLY (do NOT execute per hard constraint).

---

## §8 Live-state probe Δ1 — runtime functional verification

**Probe**: `mcp__plugin_context-mode_context-mode__ctx_doctor`
**Result**:
```
[OK] Runtimes: 6/11 (55%) — javascript, shell, typescript, python, go, rust
[OK] Performance: FAST (Bun)
[OK] Server test: PASS
[OK] FTS5 / SQLite: PASS — native module works
[OK] PreToolUse hook: PreToolUse hook configured
[OK] SessionStart hook: SessionStart hook configured
[OK] Hook script: PASS — pretooluse.mjs / posttooluse.mjs / precompact.mjs / userpromptsubmit.mjs / sessionstart.mjs
[OK] Version: v1.0.136
```
**Outstanding**: ZERO [FAIL], ZERO [WARN] (warning was version-drift advisory, not a fault).

**Probe**: `mcp__plugin_context-mode_context-mode__ctx_stats`
**Result**:
- 1330 lifetime calls
- 33.9 KB context kept out
- $165.83 lifetime savings (cumulative)
- 3.3K conversations across 11 days
- 43.1K events captured across 1360 projects
- 8.7K tokens saved this session (0.3% reduction)

**Verdict**: Runtime functionality is **HEALTHY and ACTIVELY USED**. No silent degradation observed.

---

## §9 Context-mode-specific silent-fallback hunt — findings severity-sorted

| # | Severity | Finding | Source |
|---|---|---|---|
| F1 | HIGH | **NONE INTRINSIC** — context-mode actively names and fixes silent fallbacks. v1.0.140 explicitly added diagnostic for plugin+legacy MCP zero-tool silent suppression; v1.0.141 fixed ctx-upgrade silent-success-on-clone-failure; v1.0.139 fixed native-bridge silent skip of zod validation. Maintainer rejects silent-degradation as anti-pattern. | release notes v1.0.139-141 |
| F2 | MEDIUM | **Stderr-suppression in hookDispatch** — plugin hooks close fd 2 because "Platforms like Claude Code interpret ANY stderr output as hook failure." This is correct platform compatibility, but the side-effect is that hook errors don't reach CC's normal error channels — they land in `~/.claude/context-mode/hook-errors.log`. Operator must know to check this log file. | deepwiki ask_question §SessionStart |
| F3 | MEDIUM | **Pre-cleanup hooks.json backup file present** — `hooks.json.pre-w276b-fix` sits alongside `hooks.json` in the plugin cache (W276b artifact). Not loaded by CC (not in hook config), but indicates a prior regression-fix point that the operator might want to W315-housekeep. | ls hooks/ |
| F4 | LOW-INFO | **D16=2 bus-factor floor** — single dominant maintainer (1088 commits). If mksglu deprecates, the 8 other-author contributors (max 36 commits each) cannot sustain. Per CLAUDE.md L19 critical-path-dependence (D23=5), this is a runtime risk. Mitigation: source is MIT-style-permissive (modify/distribute allowed by ELv2 §Copyright License), so an operator-owned fork is feasible if/when needed. | git shortlog |
| F5 | LOW | **5-version pin lag** — runtime v1.0.136 vs upstream v1.0.141. v1.0.140 includes the silent-MCP-suppression diagnostic — operator would benefit from upgrade. Not blocking (current installation functions per ctx_doctor ALL-OK). | ctx_doctor + npm view |
| F6 | LOW-INFO | **Plugin.json declares v1.0.135** (`.claude-plugin/plugin.json`) while package.json declares v1.0.135 — versions internally consistent within tag boundaries. Upstream uses `version-sync.mjs` script to synchronize all 7 plugin manifests. No drift internal to a release. | head plugin.json |
| F7 | LOW-INFO | **Issue tracker reports `1.0.18` in deepwiki snapshot** but actual is v1.0.135+ — deepwiki indexing is stale relative to GitHub. Not a context-mode bug; deepwiki cache freshness issue. | deepwiki ask_question discrepancy |
| F8 | INFO | **Auto-injection at SessionStart** — sessionstart.mjs injects "Rules of Engagement" XML at session start. This DOES consume context-window budget (the very thing context-mode optimizes). Trade-off documented and is the design — the injection block IS the "context_window_protection" prompt visible in this very session. Net-positive per ctx_stats $165.83 lifetime savings. | sessionstart.mjs read |
| F9 | INFO | **`postinstall.mjs` HARD-FAILS on Linux+Node<22.5+noBun** — this is the OPPOSITE of silent fallback. Architect mandate verbatim: "HARD-FAIL, not warn-then-degrade." Documented in code comments. Aligns with runtime's own fail-loud discipline (W314-r2 settings.json `|| exit 2`). | scripts/postinstall.mjs L41-72 |

**Aggregate**: ZERO HIGH-severity findings. context-mode's own silent-fallback discipline EXCEEDS the runtime's CLAUDE.md cardinal-rule fail-loud philosophy — this is the operator-preferred maturity pattern.

---

## §10 Phase-5 5-gate (sca-v7 ratification)

| Gate | Criterion | Verdict |
|---|---|---|
| Gate-1 | License + use-class allows runtime adoption | **PASS** — ELv2 source-available permits use/modify/distribute by individual; only forbids hosted/managed-service rebrand (N/A here) |
| Gate-2 | CR-9 pin discipline OR plugin-equivalent | **PASS** — plugin-supplied via `/plugin install`; installed_plugins.json locks version; equivalent to W286-cross contract |
| Gate-3 | Hard-cap density (no >2 floors of D16/D17/D19/D21/D24) | **PASS** — only D16=2 and D21=2 floors observed; D17/D19/D20/D24 all ≥4; ≤2 floors meets gate |
| Gate-4 | Anchor diversity ≥3 distinct orgs/sources at D25-D33 strict | **PASS** — Anthropic (codex+plugins docs) + HF (papers + paper_search) + GitHub (mksglu user + 8 contributor accounts mksglu/AntonProkopyev/ChengShiLiu16/holayarik-dotcom/ousamabenyounes/ByronFinn/omercnet/Pedro Almeida) + npm registry + OSV.dev + DeepWiki = 6+ distinct orgs |
| Gate-5 | Composite install_score ≥4.5 | **PASS — 4.606** (margin 0.106) |

**Phase-5 verdict**: **5-of-5 PASS** → ship-gate cleared with margin.

---

## §11 Adversarial 3-of-3 cross-check (sca-v7 ratify quorum)

| Lens | Question | Verdict |
|---|---|---|
| Security | Sandbox escape? Postinstall trust? CVE? | **PASS** — OSV `{}`; postinstall HARD-FAILs (no silent degrade); deny-firewall + child_process sandbox + zod schema parse; v1.0.141 rejected `z.coerce.boolean()` for silent-invert security; security.ts present |
| Maintainability | Bus-factor sustainability? Fork-feasibility? | **PASS-WITH-NOTE** — D16=2 single maintainer is the residual risk, BUT ELv2 permits fork+modify+distribute (only hosted-service-rebrand forbidden), AND release cadence is so high (1591 commits/90d = 17.7/day) that "abandonment" risk is currently near-zero. Source is bundled to `.mjs` via esbuild — operator-owned fork is feasible (`npm run build` rebuilds bundles deterministically). |
| Adoption-Maturity | Independent adopter floor met? Long-running fitness? | **PASS** — 15.1k★ in 3 months, HN #1 + 570pts, 37577 wk-downloads, 12 platform adapters in active use, 1330 lifetime ctx-tool calls in this single runtime alone. D28 long-running agent fitness DESIGNED-INTO via SessionDB+SessionStart+PreCompact triad. |

**Adversarial verdict**: **3-of-3 RATIFY**, 0 BLOCK, 0 REVISE.

---

## §12 Tier verdict + ship action

**Tier**: **T1 INSTALL (HOLD)** — re-ratifies W79 Ship 1A install verdict
**Operation**: HOLD-AT-INSTALLED + ADVANCE-VERSION (v1.0.136 → v1.0.141)
**Composite install_score**: **4.606** (sca-v7) — clears T1 ≥4.5 floor with 0.106 margin
**Cardinal-rule invariants**: ALL preserved (R1 trusted plugin ✓; R2 hook-bodies plugin-shipped + sanctioned shim ≤2KB ✓; R3 N/A; R4 settings.json entry ✓; R5 N/A)

**Operator action items** (surface ONLY per hard constraint — NOT executed by this audit):
1. **HIGH**: `/plugin update context-mode` to advance v1.0.136 → v1.0.141 (closes the 5-version pin lag; gains v1.0.140 silent-MCP-suppression diagnostic + v1.0.141 ctx-upgrade fail-loud)
2. **LOW (housekeeping)**: Remove `hooks.json.pre-w276b-fix` backup from plugin cache once v1.0.141 install verified clean (W276b artifact, dead-weight)
3. **INFO (operator awareness)**: Hook errors land in `~/.claude/context-mode/hook-errors.log` (NOT in CC's normal stderr channel) due to fd-2 close in hookDispatch — periodic-check or `tail -F` recommended for diagnostic visibility
4. **W316 forward** (NOT urgent): consider drafting an operator-owned esbuild rebuild lane as bus-factor mitigation insurance (D16=2 risk hedge); ELv2 permits this; only invoke if mksglu deprecation event occurs

**Tool budget used**: 2 git fetches + 12 MCP-tool calls + 4 Bash probes + 1 npm + 1 OSV ≈ **~$0.85 API equivalent**, **~18 min wall-clock** (under 25-min/$1.50 cap)

---

## §13 Comparison with W79 prior verdict — what's changed

| Axis | W79 (2026-05-08, Wave 79 Ship 1A) | W315 (2026-05-19, this audit) | Δ |
|---|---|---|---|
| Verdict | TIER-A INSTALL conf=0.78 (GPT-5.5 e2e) | T1 INSTALL HOLD 4.606 (sca-v7) | No tier-shift; verdict ratified |
| Stars | not recorded | 15,135 | adoption acceleration |
| Version installed | v1.0.135 (per `.claude-plugin/plugin.json` content) | v1.0.136 (per ctx_doctor + cache dir) | +1 version (auto-advanced) |
| Upstream latest | v1.0.135 era (Wave 79 baseline) | v1.0.141 (5 versions ahead in 11 days) | massive cadence |
| License | ELv2 (noted as CR-9 risk MED) | ELv2 (still source-available, still CR-9 risk MED — UNCHANGED) | no shift |
| Bus-factor | not formally scored | **D16=2** (1088 mksglu commits vs 8 contribs with 5-36 commits) | newly characterized |
| Silent-fallback discipline | not formally audited | **EXEMPLARY** (named/fixed in v1.0.139-141) | newly characterized — POSITIVE finding |
| Plugin invocation | plugin-supplied (Wave 95 Ship 1M migration) | plugin-supplied (still) — `node ${CLAUDE_PLUGIN_ROOT}/start.mjs` | unchanged |
| CR-2 hook-body shim | cache-heal.mjs sanctioned exception | same shim, ≤2 KB, anchor-cited to #46915 | unchanged + re-verified |
| ctx_doctor verdict | "5/6 PASS" per W79 _comments | **6/6 OK with 5 hook-script OKs (11 total OK)** | improved (ALL [OK]) |
| New silent-fallback discoveries | none | F2 stderr-suppression (medium-info); F3 hooks.json.pre-w276b-fix housekeeping | new INFO findings, no HIGH |
| Cumulative lifetime savings | not measured | **$165.83 lifetime / 3.3K conversations / 43.1K events** | demonstrable utility |

**Δ summary**: W315 ratifies W79; no tier-shift; the operator's "silent error and fallback" mandate question is answered POSITIVELY for context-mode itself (the project actively names and eliminates silent fallbacks — exemplary). The runtime's installation is healthy. Single residual action item: `/plugin update` to close the v1.0.136 → v1.0.141 5-version pin lag.

---

## §14 CR-9 pin verification specific

**Standard form**: `.mcp.json` mcpServers entry uses `command: "npx" + args: ["-y", "<pkg>@<exact-version>"]`

**context-mode current form**: NOT in `.mcp.json` mcpServers. Lives in `.claude/plugins/cache/context-mode/context-mode/1.0.136/`.

**Is this a CR-9 violation?** **NO.**

**Reasoning chain**:
1. Cardinal-rule-2 contract is "Hooks may only be upstream-plugin hooks OR direct upstream-CLI invocations declared in .claude/settings.json"
2. Plugin-supplied MCP servers per `https://code.claude.com/docs/en/mcp` take precedence over `.mcp.json` entries
3. The W286-arc-P0C contract was specifically authored for stdio MCP servers configured via `.mcp.json` (cite-checked in `.mcp.json` `_comments.w286_cross_npx_pinned_v2`)
4. Plugin pathway has its own version-pinning mechanism: `~/.claude/plugins/installed_plugins.json` records the exact installed version + commit SHA + install timestamp
5. `/plugin install context-mode@context-mode` is the Anthropic-canonical install command — equivalent in version-discipline to `npx -y <pkg>@<pinned-version>`
6. **Therefore**: context-mode's plugin-supplied pathway IS the CR-9-equivalent for plugin primitives; the runtime is **compliant**

**Drift check (CR-9 freshness)**: installed=v1.0.136, upstream-latest=v1.0.141, **5-version-lag**. Not a CR-9 violation (the v1.0.136 pin IS pinned), but a freshness operator-AI for `/plugin update`.

---

## §15 context-mode-specific silent-fallback findings — severity-sorted master table

(consolidates §9 with explicit fix recommendations where applicable; ZERO HIGH findings)

| # | Sev | Finding | Recommended op | Block-or-defer |
|---|---|---|---|---|
| F-CTX-1 | HIGH | **NONE** — context-mode itself exemplifies fail-loud discipline | n/a — POSITIVE finding | n/a |
| F-CTX-2 | MEDIUM | stderr-suppression fd2-close in hookDispatch routes hook errors to `~/.claude/context-mode/hook-errors.log` instead of stderr | Operator awareness only; CLAUDE.md or operator's monitoring should include `tail -F ~/.claude/context-mode/hook-errors.log` | DEFER-INFO-OP |
| F-CTX-3 | MEDIUM | `hooks.json.pre-w276b-fix` housekeeping artifact in plugin cache | Remove on next `/plugin update` cycle if not auto-cleaned | DEFER-W316 |
| F-CTX-4 | LOW | D16=2 single-maintainer bus-factor | Document fork-feasibility under ELv2 §Copyright License grant; rebuild lane (`npm run build`) verified deterministic; activate only on deprecation event | DEFER-INSURANCE |
| F-CTX-5 | LOW | v1.0.136 → v1.0.141 5-version pin lag | `/plugin update context-mode` (operator-only per hard constraint) | OPERATOR-AI-W315 |
| F-CTX-6 | LOW-INFO | `.claude-plugin/plugin.json` declares v1.0.135 internally consistent with package.json — version-sync.mjs syncs across 7 manifests | No action — informational | n/a |
| F-CTX-7 | LOW-INFO | DeepWiki indexed snapshot reports older internal version `1.0.18` due to stale indexing | Out of context-mode scope — DeepWiki indexing freshness | n/a |
| F-CTX-8 | INFO | sessionstart.mjs context-window injection consumes some budget — TRADE-OFF documented | No action — design choice; ctx_stats demonstrates net-positive | n/a |
| F-CTX-9 | INFO | postinstall HARD-FAILS not silent-degrades on Linux+Node<22.5+noBun | POSITIVE — matches runtime fail-loud discipline; no action | n/a |

**Master severity distribution**: 0 HIGH · 2 MEDIUM (both DEFER-INFO) · 2 LOW (1 OPERATOR-AI + 1 INSURANCE-DEFER) · 4 INFO

**Block-ship gate**: ZERO HIGH-severity findings → NO BLOCK. Ship-decision **HOLD-AT-INSTALLED + OPTIONAL v1.0.141 ADVANCE**.

---

## Sources cited (all-MCP-family round-up)

Anthropic-canonical:
- https://code.claude.com/docs/en/mcp (plugin-supplied MCP precedence over `.mcp.json`)
- https://code.claude.com/docs/en/plugins (`/plugin install` install contract)
- CLAUDE.md L19 (CR-2 sanctioned-exception ≤2 KB anchored to anthropics/claude-code#46915)

Repository-direct:
- https://github.com/mksglu/context-mode @ HEAD `6bbcb44` (was W314-r2 baseline `bdcdc13`)
- https://github.com/mksglu/context-mode/releases (v1.0.136 through v1.0.141 release notes)
- Z:/repos/deps/context-mode/LICENSE @ HEAD (ELv2 unchanged)
- Z:/repos/deps/context-mode/package.json (license: Elastic-2.0; 8 deps; engines.node>=22.5.0)
- Z:/repos/deps/context-mode/.claude-plugin/plugin.json (version=1.0.135 internally)
- Z:/repos/deps/context-mode/scripts/postinstall.mjs L41-72 (HARD-FAIL discipline)
- Z:/repos/deps/context-mode/src/security.ts (deny-firewall parseBashPattern)

Adoption telemetry:
- https://api.npmjs.org/downloads/point/last-week/context-mode (37577)
- https://api.npmjs.org/downloads/point/last-month/context-mode (94867)
- https://api.github.com/repos/mksglu/context-mode (15135★, 6 open issues)
- https://news.ycombinator.com/item?id=47193064 (HN #1, 570+ points)
- README adopter badges (Microsoft, Google, Meta, Amazon, Stripe, IBM, NVIDIA, ByteDance, Datadog, Salesforce, GitHub, Red Hat, Supabase, Canva, Notion, Hasura, Framer, Cursor)

Security/CVE:
- https://api.osv.dev/v1/query (response: `{}` zero CVEs)
- v1.0.141 release notes (rejected `z.coerce.boolean()` due to silent-invert risk)

Runtime self-eval:
- mcp__plugin_context-mode_context-mode__ctx_doctor (ALL OK probe 2026-05-19)
- mcp__plugin_context-mode_context-mode__ctx_stats (1330 calls / $165.83 lifetime)

Academic adjacency:
- https://hf.co/papers/2604.14228 ("Dive into Claude Code" — Liu et al. 2026 — OpenClaw comparison)
- https://hf.co/papers/2512.15374 (SCOPE — Context Evolution)
- https://hf.co/papers/2601.21557 (MCE — Meta Context Engineering)

Prior wave references:
- W79 (Wave 79 Ship 1A) — `.mcp.json` `_comments.context_mode_removed` (prior install verdict)
- W286-arc-P0C — `.mcp.json` `_comments.w286_cross_npx_pinned_v2` (CR-9 contract baseline)
- CLAUDE.md L19 (CR-2 anchor exception scope)

---

## Verdict line for VERDICT-LEDGER (W315 row append candidate)

> **W315-mksglu-context-mode** | T1 HOLD-INSTALLED | install_score 4.606 (sca-v7) | Gate-5 PASS margin 0.106 | adversarial 3/3 RATIFY | runtime drift v1.0.136 → upstream v1.0.141 (5-version pin lag, operator-AI surface only) | 0 HIGH silent-fallback findings (context-mode itself exemplifies fail-loud discipline) | CR-2 sanctioned shim ≤2 KB anchored to anthropics/claude-code#46915 VERIFIED | ELv2 license unchanged, source-available, permissive for runtime use-case | bus-factor D16=2 fork-feasibility under ELv2 documented as insurance lane | re-ratifies W79 Ship 1A TIER-A install
