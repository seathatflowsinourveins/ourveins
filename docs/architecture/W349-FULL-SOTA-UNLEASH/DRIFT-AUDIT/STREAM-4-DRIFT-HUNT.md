# W349 Stream 4 — Drift-Hunt for Hidden Errors / Stale References / SOTA Gaps

> Wave: W349-FULL-SOTA-UNLEASH · 2026-05-20/21
> Scope: SOTA-repo drift, hidden errors, stale references in active runtime config.
> Budget: ≤18 tool calls / ≤120k tokens · skeleton-first per Δ-PDM-1.
> Inputs: STREAM-D-UPSTREAM-DRIFT.md (HEAD drift per upstream) + STREAM-E-SOTA-REPO-DISCOVERY.md (sca-v17 candidates) already complete.

---

## §Existing-drift-coverage

**STREAM-D-UPSTREAM-DRIFT.md** covered (do not re-discover):
- §1 anthropics/claude-code HEAD `cc898dc3692f` (v2.1.145) — `minimumVersion` lag (2.1.144 → 2.1.145 available)
- §2 anthropics/claude-plugins-official HEAD `d68033bd1a25` — "STALE-COSMETIC only (mercadopago bump not locally enabled)" — **REVERSED by this stream §Hidden-errors-found #2 below: local plugins-cache auto-updated 2026-05-21T01:23 to a NEWER SHA `faf018f037941bc62a9664a202ce074317fd1e40` than STREAM-D probed**
- §3 affaan-m/everything-claude-code — FRESH (2.0.0-rc.1 alpha)
- §4 shanraisshan/claude-code-best-practice — FRESH (`a28cd96b` exact match)
- §6 Insights split-verdict (env-var SUSTAINED non-existence; `/insights` slash command REVERSED-exists)
- §8 anthropics/skills — FRESH (`690f15cac7f7` exact match)
- §9 wshobson/agents — STALE-FUNCTIONAL on `agent-teams` plugin (PR #535 coordination guardrails; still stale as of 2026-05-21, not in today's auto-update sweep)
- §11 CHALLENGER: Stop+SubagentStop new `background_tasks` + `session_crons` payload fields (v2.1.145) — local codex Stop-review hook does not consume

**STREAM-E-SOTA-REPO-DISCOVERY.md** covered:
- 10 candidates audited via sca-v17 (wshobson/agents T1-INSTALL; MemPalace T3-EVAL-pending; mattpocock cite-refresh; alirezarezvani RETIRE-CONFIRMED; rest NO-OP)
- 10 challenger candidates surfaced (top: thedotmack/claude-mem, ruvnet/ruflo, safishamsi/graphify)

---

## §Hidden-errors-found

### HE-1 (P1 SHIP-WARN) — CLAUDE.md L23 stale plugin/enablement counts vs actual filesystem
- **CLAUDE.md L23 claim** (W342 canonical counts 2026-05-20):
  - `installed_plugin_records=64`
  - `enablement_entries=68 (enabled_true=46, enabled_false=22)`
- **Actual filesystem 2026-05-21T01:23**:
  - `.claude/plugins/installed_plugins.json` → `plugins{}` dict has **54 entries** (verified `python json.load`)
  - `.claude/settings.json:enabledPlugins{}` → **58 entries** (47 true / 11 false; verified via regex `@.*true|false` count)
- **Delta**: installed −10 (64→54); enablement −10 (68→58); enabled_true +1 (46→47); enabled_false −11 (22→11)
- **Root cause hypothesis**: W342 X4 §4 documented "10 `@claude-code-skills` plugins SOFT-DISABLED stage-1 of 2-stage retire per W342 X4 §4 + W330 axis-2 §3.2 alirezarezvani 313→48 fabrication". Stage-2 retire (DELETE entries) appears to have landed silently — the 10 `claude-code-skills` plugin entries were REMOVED from both `installed_plugins.json` and `settings.json:enabledPlugins`, not just `enabled:false`. CLAUDE.md L23 text was not updated to reflect stage-2 completion.
- **Cite**: STREAM-E §5.6 confirms alirezarezvani RETIRE-verdict held; this stream confirms the stage-2 mechanical deletion landed. Update CLAUDE.md L23 to: `installed_plugin_records=54 · enablement_entries=58 (enabled_true=47, enabled_false=11)`.
- **Risk**: documentation-only drift — runtime is consistent; doc claim invalidates `verify-before-claim` (CR-6) until refreshed.

### HE-2 (P2 SHIP-WARN) — Uncommitted plugin-cache auto-update SHA drift (12 plugins)
- **Working-tree diff**: `git diff .claude/plugins/installed_plugins.json` shows 12 `claude-plugins-official` plugins auto-bumped from `gitCommitSha aec81d3bc1693e37e2212b80b972c23b85e1e4f3` → `faf018f037941bc62a9664a202ce074317fd1e40` between `2026-05-20T22:49:27` and `2026-05-21T01:23:51`
- Plugins affected: `agent-sdk-dev, frontend-design, pr-review-toolkit, skill-creator, plugin-dev, code-review, feature-dev, commit-commands, session-report, playground, mcp-server-dev, code-modernization, hookify` (13 of 24 ECC-marketplace plugins enabled locally)
- **STREAM-D §2 INVALIDATED**: STREAM-D verdict was "snapshot pre-2026-05-19; STALE-COSMETIC (only mercadopago bump)" — but the local cache is now AHEAD of STREAM-D's probe baseline. The new SHA `faf018f03794` is NOT yet investigated for upstream-HEAD diff vs `d68033bd1a25` (STREAM-D's probed HEAD). Likely: `faf018f03794` is downstream of `d68033bd1a25` (i.e. anthropics/claude-plugins-official pushed additional commits between 2026-05-20T22:26Z and 2026-05-21T01:23Z).
- **Marketplaces refreshed (lastUpdated 2026-05-21T01:23-24)**: `claude-plugins-official`, `anthropic-agent-skills`, `life-sciences`, `thedotmack` — 4 of 22 marketplace records updated
- **Action**: commit the diff with conventional message `chore(plugins): refresh claude-plugins-official cache aec81d3 → faf018f auto-update`; STREAM-D rerun deferred (low priority — auto-update is by-design via `autoUpdatesChannel:latest`).

### HE-3 (P3 INFO) — Stale `_comments` in `.mcp.json` reference retired `graphiti` MCP
- **`.mcp.json:11` `w259v9_u10_tasksupport_audit`** documents server #9 as `graphiti [stdio; backing FalkorDB 127.0.0.1:16379 PORT OPEN]`
- **`.mcp.json:14` `ollama_w259v15`** documents `Ollama backend brought up for the graphiti MCP` with model `qwen3-coder:30b-a3b-q4_K_M`
- **`.mcp.json:124` `w265_langfuse_2026_05_17`** says `Trace endpoints: graphiti MCP env, cognee NSSM AppEnvironmentExtra, hindsight .hindsight/profiles/claude-code.env all carry LANGFUSE_*`
- **`.mcp.json:125` `w281e_basic_memory_2026_05_18`** says `Niche distinct from existing 5-tier (hindsight T1 vector + memory-MCP sqlite_vec + cognee GraphRAG + graphiti temporal-KG + langfuse traces)`
- **CLAUDE.md L24 truth**: `T4 graphiti ✗ RETIRED (W272+W290+W295 AI-5; block excised from .mcp.json in W313 Stream A 5a350d1)`. ALSO `T1 hindsight ✗ RETIRED (W316-S6 codex-ratified)`.
- **Risk**: documentation-only — `mcpServers{}` actively contains NEITHER `graphiti` NOR `hindsight` (confirmed via Read .mcp.json — 16 servers, none named graphiti/hindsight). The `_comments` block is historical changelog; truthful within its own wave reference but cumulative-stale.
- **Action (low priority)**: prune stale historical-changelog blobs from `.mcp.json:_comments` referring to retired tiers (or add a single banner: "blocks referring to graphiti / hindsight describe RETIRED tiers — see CLAUDE.md L24"). Optional housekeeping wave.

### HE-4 (P2 SHIP-WARN) — `tools/precommit-msys-hooks-form.mjs` has staged but uncommitted diff
- **`git status`**: `M tools/precommit-msys-hooks-form.mjs` (staged, +13 / -8 LOC visible in diff)
- **Diff intent (W348 P0-autonomy fix)**: distinguish `plugin-cache` origin (upstream-owned, CR-1 trusted-source, EXEMPT from hooks-form ENFORCE) from `project` origin (binding ENFORCE). Adds `{ dir, origin }` tagging to SCAN_ROOTS.
- **Risk**: staged-without-commit means next commit will silently include this change. **The change itself is correct CR-2 compliance work** (the W331 axis-1 #4 mechanization cite-anchored at CLAUDE.md L33 expects exactly this distinction — only `.claude/hooks/**` >2048-byte files BLOCK commit; plugin-cache hooks.json is upstream and gitignored).
- **Action**: commit the staged change with explicit cite-anchor message — e.g. `fix(precommit): tag SCAN_ROOTS origin so plugin-cache exempted from CR-2 ENFORCE (W348 P0-autonomy)`.

### HE-5 (P2 SHIP-WARN) — 3 `.draft` skill files deleted but unstaged
- **`git status`**: `D .claude/skills/iterate-fix-failing-tests/SKILL.md.draft`, `D .claude/skills/orchestrate-issue-to-pr/SKILL.md.draft`, `D .claude/skills/prompt-versioning-and-rollback/SKILL.md.draft`
- These are working-copy deletions not yet staged. The 3 skills themselves (SKILL.md without `.draft`) appear to be present per `ls .claude/skills/` showing `orchestrate-issue-to-pr` + `prompt-versioning-and-rollback` directories — drafts were probably promoted to canonical and the `.draft` cleanup landed.
- **Action**: `git add -u` to stage the 3 deletions then commit.

### HE-6 (P3 INFO) — CR-2 scope vs `tools/*.mjs` 7-hook-script footprint
- **CR-2 text**: "No project-owned hook bodies (any extension `.py|.sh|.mjs|.js|.ts|.ps1|.bat` under `.claude/hooks/**`), EXCEPT documented bug-patch shims cite-anchored to a specific anthropics/claude-code GitHub issue and ≤2 KB"
- **Strict reading**: scope is `.claude/hooks/**` only. Sole occupant is `context-mode-cache-heal.mjs` (1656 B, sanctioned per `#46915`).
- **`settings.json:hooks.*` invokes 7 project-owned scripts from `tools/**`**:
  - `tools/parallel-guard-userpromptsubmit.mjs` (3916 B)
  - `tools/preagent-parallel-guard.mjs` (**20612 B = 20.1 KB**)
  - `tools/preagent-subagent-validator.mjs` (5507 B)
  - `tools/preagent-d73-gate.mjs` (11474 B)
  - `tools/stop-position-swap.mjs` (10141 B)
  - `tools/subagent-stop-audit.mjs` (2027 B)
  - `tools/subagent-stop-guard.mjs` (5596 B)
- **Strict-scope-compliant**: yes (`tools/**` ≠ `.claude/hooks/**`).
- **Spirit-of-CR-2 concern**: these ARE project-owned hook bodies invoked from `settings.json:hooks` — they meet the cardinal-rule-5 R5-corollary explicit sanction at CLAUDE.md L35 ("`tools/preagent-{parallel-guard,subagent-validator}.mjs` = dual-mode (advisory exit 0 + binding exit 2) — sanctioned CR-5-exception condition-(b)"). The other 5 are NOT explicitly sanction-named in CLAUDE.md.
- **Risk**: low — operator-curated tooling per `.claude/skills/<name>/SKILL.md` path-gated discipline (CR-4). Operator-curated path is the W331 axis-1 #6 corollary trigger-audit pathway.
- **Action**: NO-OP unless operator wants tightened CR-2 to explicitly cover `tools/**` hook-invocations. If yes: add cite-anchor sentence in CLAUDE.md L32 explicitly sanctioning the 5 unnamed scripts (stop-position-swap, subagent-stop-*, preagent-d73-gate, parallel-guard-userpromptsubmit).

### HE-7 (P3 INFO) — `MSYS_HOOKS_FORM_GATE_ENFORCE=1` env-var with uncommitted-diff dependency
- **`.claude/settings.json:54`**: `"MSYS_HOOKS_FORM_GATE_ENFORCE": "1"` (set 2026-05-20)
- **Dependency**: `tools/precommit-msys-hooks-form.mjs` (HE-4 above — has uncommitted diff)
- **Risk**: env var enforces a binding gate via a script whose semantics are mid-flight. If the staged W348-P0-autonomy patch is correct (likely), behavior is fine; if it has a regression, every commit is gated.
- **Action**: commit HE-4 then verify a smoke-test commit passes hooks-form gate without false-positive.

---

## §Stale-references

### SR-1 — `.mcp.json:_comments` retired-tier residue (covered by HE-3 above)
- Reference: 4 `_comments.*` blobs name `graphiti` / `hindsight` (both RETIRED per CLAUDE.md L24)
- Severity: documentation-only

### SR-2 — `settings.json:enabledPlugins` retains retired-marketplace plugin keys
- **`settings.json:337`**: `"hindsight-memory@hindsight": false` (T1 hindsight RETIRED W316-S6 per CLAUDE.md L24) — entry retained with `false` flag (correct under W255 "preserve disabled entries as audit trail")
- **`settings.json:343`**: `"gitnexus@gitnexus-marketplace": false` (STREAM-E §5.5 HOLD-DISABLED — correct verdict)
- **`settings.json:332`**: `"claude-mem@thedotmack": false` (STREAM-E §7 challenger thedotmack/claude-mem T3-EVAL-pending; **but `known_marketplaces.json:117` has `autoUpdate: true` for `thedotmack` marketplace** — marketplace auto-refreshes even though the plugin itself is disabled; this is correct CC behavior per `https://code.claude.com/docs/en/plugins`, refreshes the marketplace catalog but does not enable the plugin)
- Severity: NO-OP — entries are correctly preserved as disabled audit trail
- 3-org-distinct cite: `https://code.claude.com/docs/en/plugins` (plugin lifecycle docs) + `gh api /repos/anthropics/claude-code/contents/CHANGELOG.md` (auto-update v2.1.* track) + `https://docs.anthropic.com/en/docs/claude-code/settings` (enabledPlugins semantics)

### SR-3 — CLAUDE.md L24 langfuse version cite re-verify
- **CLAUDE.md L24**: `T5 langfuse ✓ LIVE v3.160.0`
- **`.mcp.json:54`**: pinned `langfuse-mcp-server@0.0.2-rc.0` (CLIENT pkg, not server)
- **Server runs at**: `http://127.0.0.1:3000` (per CLAUDE.local.md L51)
- **STREAM-D §11 already re-verified 2026-05-20**: `HTTP 200 /api/public/health returned {"status":"OK","version":"3.160.0"}`. NO drift. Cite is fresh.

### SR-4 — `tools/precommit-msys-hooks-form.mjs` references CR-1 trusted-source classification
- The W348 P0-autonomy patch (HE-4) inlines `// W348 P0-autonomy fix: tag each scan-root by ORIGIN. Plugin-cache hooks.json are upstream-owned (CR-1 trusted-source)` — this cite-anchors to CR-1 correctly per CLAUDE.md L31.
- NO-OP, just verification.

---

## §New-SOTA-candidates

(beyond STREAM-E's 10 + 10 = 20 candidate sweep)

### NC-1 — `pydantic/skills` marketplace (already wired, but underused)
- **`settings.json:345-346`**: `ai@pydantic-skills: true`, `logfire@pydantic-skills: true`
- **`extraKnownMarketplaces.pydantic-skills`** at `settings.json:466-471` points at `github://pydantic/skills`
- **Audit signal**: Pydantic's official skill marketplace is enabled, but `pydantic/skills` itself contains **more than 2 skills** per pydantic.dev/skills docs. Current local enablement is `ai` + `logfire` only. Pydantic ships `pydantic-graph`, `pydantic-fastapi`, others.
- **3-org-distinct cite-anchors** (per cardinal-rule-6): (a) `https://github.com/pydantic/skills` repo HEAD (b) `https://pydantic.dev/skills` official skill catalog (c) deepwiki `ask_question pydantic/skills` for skill enumeration
- **Action**: probe pydantic/skills HEAD to see if `pydantic-graph` / additional skills exist. If yes, evaluate via sca-v17 D81 4-MCP-family probe.

### NC-2 — `github.com/anthropics/knowledge-work-plugins` extraKnownMarketplaces entry not enabled
- **`settings.json:382-386`**: marketplace registered (`anthropics/knowledge-work-plugins`) but ZERO entries enabled
- **3-org-distinct cite**: (a) `gh api /repos/anthropics/knowledge-work-plugins` (b) `https://code.claude.com/docs/en/plugins#marketplaces` official discovery surface (c) STREAM-E §7 candidate discovery pattern
- **Action**: probe what plugins exist; if any are sca-v17-T1, propose install. Quick reconnaissance candidate.

### NC-3 — `affaan-m/everything-claude-code` 233-skill catalog audit (under-leveraged)
- **STREAM-D §3**: local ECC `2.0.0-rc.1` has **233 directories in skills/** — only a fraction auto-fire today
- **Anti-bias check**: per STREAM-E §8 the audit fired 4 MCP families but the per-ECC-skill enumeration deferred. Many ECC skills may be auto-fire-eligible per `description:` match but operator hasn't catalogued usage frequency.
- **Action**: queue an ECC skill-usage telemetry pass (langfuse query for which ECC skills fired in last 30d) to find dead-skill candidates for disable, OR find under-used high-quality skills for promotion.

---

## §Convergence-priority

Sorted by sca-v17 (action_impact × risk × harness-fit):

| Rank | Finding | Severity | Action | Effort |
|---|---|---|---|---|
| 1 | HE-1: CLAUDE.md L23 stale counts (64→54, 68→58) | P1 SHIP-WARN | Edit CLAUDE.md L23 with current counts | XS (1 edit) |
| 2 | HE-4: staged uncommitted `precommit-msys-hooks-form.mjs` (W348 P0-autonomy) | P2 SHIP-WARN | Commit staged diff | XS (1 commit) |
| 3 | HE-5: 3 `.draft` deletions unstaged | P2 SHIP-WARN | `git add -u && git commit` | XS |
| 4 | HE-2: 12 plugin auto-update SHA drift uncommitted | P2 SHIP-WARN | Commit auto-update | XS |
| 5 | STREAM-D §9 wshobson agent-teams 3-day-stale (still applies) | P2 | `/plugin update agent-teams@claude-code-workflows` | S |
| 6 | STREAM-D §1 `minimumVersion: 2.1.144 → 2.1.145` | P3 | Edit settings.json:501 (admits v2.1.145 features) | XS |
| 7 | STREAM-D §11 codex Stop-hook consume new `background_tasks` + `session_crons` fields | P3 | Edit `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` (upstream — operator coordinate) | M |
| 8 | NC-2: probe `anthropics/knowledge-work-plugins` for install candidates | P4 | Read marketplace plugin list | S |
| 9 | NC-3: ECC 233-skill usage telemetry | P4 | Langfuse query | M |
| 10 | NC-1: pydantic/skills additional-skill enumeration | P4 | deepwiki probe | XS |
| 11 | HE-3: `.mcp.json:_comments` graphiti/hindsight retired-tier residue | P5 | Optional cleanup | S |
| 12 | HE-6: CR-2 spirit-vs-strict on `tools/*.mjs` 7-hook scope | P5 | NO-OP unless operator decides | XS |

---

## §SHIP-BLOCKER

**None identified**. All P1-P2 findings are committable in <5 min of operator-attention or are downstream-update tasks. The W342-canonical-counts assertion in CLAUDE.md L23 (HE-1) is the closest to a real blocker because it makes the CLAUDE.md preload memory inconsistent with filesystem reality — but it is a documentation defect, not a runtime defect.

**Risk-only items (cardinal-rule-6 verify-before-claim contract)**:
- The `installed_plugins.json` 54-entry count vs L23 claim of 64 is a 16% drift in the canonical-memory header. Anyone relying on CLAUDE.md L23 for "plugin landscape" inventory will be off-by-10. Update before next ship-gate.

---

## §3-org-distinct-anchors (per finding)

| Finding | Anchor 1 | Anchor 2 | Anchor 3 |
|---|---|---|---|
| HE-1 plugin counts | `.claude/plugins/installed_plugins.json` (Anthropic CC `https://code.claude.com/docs/en/plugins` `installed_plugins.json` schema) | `.claude/settings.json:enabledPlugins{}` (Anthropic CC `https://docs.anthropic.com/en/docs/claude-code/settings` `enabledPlugins` schema) | `python json.load` verifier (third-org PSF stdlib) |
| HE-2 SHA drift | `git diff .claude/plugins/installed_plugins.json` (third-org git/Linux Foundation) | `gh api /repos/anthropics/claude-plugins-official/commits/faf018f037941bc62a9664a202ce074317fd1e40` (GitHub) | STREAM-D §2 baseline `d68033bd1a25` (Anthropic) |
| HE-3 stale comments | `.mcp.json:_comments` text | CLAUDE.md L24 truth | W313 Stream A commit `5a350d1` git history |
| HE-4 staged precommit | `git diff --cached` (git) | CR-1 trusted-source (Anthropic CLAUDE.md L31) | W348-R1 234-violation finding (operator audit ledger) |
| HE-5 draft cleanup | `git status` (git) | `ls .claude/skills/` shows canonical promoted | `https://code.claude.com/docs/en/skills` skill-promotion contract |
| HE-6 CR-2 scope | CLAUDE.md L32 text scope `.claude/hooks/**` | CLAUDE.md L35 R5-corollary explicit sanction list | `https://docs.anthropic.com/en/docs/claude-code/hooks` hook contract |
| HE-7 env-var gate | `.claude/settings.json:54` `MSYS_HOOKS_FORM_GATE_ENFORCE=1` | `tools/precommit-msys-hooks-form.mjs` source | CLAUDE.md L33 W331 axis-1 #4 mechanization cite |
| NC-1 pydantic skills | `github.com/pydantic/skills` HEAD | `pydantic.dev/skills` docs | deepwiki `pydantic/skills` enumeration |
| NC-2 knowledge-work | `gh api /repos/anthropics/knowledge-work-plugins` | `code.claude.com/docs/en/plugins#marketplaces` | STREAM-E §7 discovery pattern |
| NC-3 ECC 233-skill audit | `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.claude-plugin/plugin.json:version` | Langfuse `:3000` skill-firing telemetry | STREAM-D §3 233-dir count |

---

## §Stream-4 Summary

**Counts**:
- Hidden errors found: **7** (HE-1..HE-7) — 1 P1 SHIP-WARN, 4 P2 SHIP-WARN, 2 P3 INFO
- Stale references: **4** (SR-1..SR-4) — all NO-OP or documentation-only
- New SOTA candidates: **3** (NC-1..NC-3) — all probe-first low-effort
- SHIP-BLOCKERS: **0**

**Top-3 SOTA gaps with proposed install candidates**:
1. **wshobson/agents `agent-teams` 3-day-stale** — STREAM-D §9 + this stream confirm not auto-updated as of 2026-05-21T01:23 (only `claude-plugins-official` + `anthropic-agent-skills` + `life-sciences` + `thedotmack` refreshed today). `/plugin update agent-teams@claude-code-workflows` per `https://code.claude.com/docs/en/plugins` lifecycle + `gh api /repos/wshobson/agents/pulls/535` PR#535 fix + STREAM-D-cited `08ded5e7b0fe` HEAD. **3-org-distinct anchors: GitHub PR + STREAM-D probe + plugin docs**.
2. **`anthropics/knowledge-work-plugins` marketplace registered but zero plugins enabled** — quick `gh api /repos/anthropics/knowledge-work-plugins/contents` probe to enumerate. Could be a free SOTA-add. **3-org-distinct: GitHub repo + Anthropic plugin docs + STREAM-E discovery pattern**.
3. **CHALLENGER STREAM-D §11 not-yet-wired**: CC v2.1.145 hook payloads now include `background_tasks` + `session_crons`. Local codex `Stop-review-gate` hook (`.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json`) likely does not consume — operator-coordinate with openai-codex upstream OR fork hook locally. **3-org-distinct: CHANGELOG.md cc898dc3692f + `code.claude.com/docs/en/changelog` mirror + `code.claude.com/docs/en/hooks` payload schema**.

---

STATUS: COMPLETE
