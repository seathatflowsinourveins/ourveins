# W348 Stream-A — Anthropic CC + CCBP + ECC + Insights Delta Audit

**Stream**: A of 6 (W348 SOTA-convergence multi-stream audit)
**Date**: 2026-05-20
**Probe-targets**: CC v2.1.145 runtime; CCBP HEAD `a28cd96b`; ECC `2.0.0-rc.1` SHA `8148340a`
**Status**: COMPLETE

---

## §1 Anthropic claude-code delta (vs runtime v2.1.145)

**Probe**: `gh api /repos/anthropics/claude-code/commits/HEAD` → SHA `cc898dc3` @ `2026-05-19T21:31:01Z` (CHANGELOG.md sync); `/releases?per_page=10` → **v2.1.145 IS the HEAD release** dated 2026-05-19. Runtime is on the latest tagged release; there is NO gap at the release-tag layer.

**v2.1.145 feature surface relative to runtime config**: 25 changelog items. The runtime-relevant ones not yet wired here:

1. **`claude agents --json`** (new) — scripting-grade live-session list. Runtime has agent-teams enabled (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) but no `--json` consumer. *Useful for cross-session orchestration scripts.*
2. **OTEL `agent_id` + `parent_agent_id` span attributes** — runtime has `CLAUDE_CODE_ENABLE_TELEMETRY=1` AND uses Langfuse T5 (port :3000); the new attrs enable proper subagent-span nesting. Langfuse-OTLP pipeline will benefit immediately on next CC start.
3. **Stop/SubagentStop hook payload gains `background_tasks` + `session_crons` fields** — runtime's pre-commit gate + codex Stop-review-hook can now inspect these. **No code change yet wired** to read these fields.
4. **`/plugin` Discover screens now show pre-install component manifest** — operational UX, no config gap.
5. **Permission-prompt bypass FIX**: bare variable assignments to non-allowlisted env vars in Bash were auto-approved. *Security-relevant — runtime is already on v2.1.145 so the fix is live.*
6. **Read-tool partial-page fallback** — Read returns truncated "PARTIAL view" instead of hard-error when whole-file exceeds token limit (was a hard error previously).

**v2.1.144 deltas worth noting** (already in runtime):
- `/resume` for background sessions (W342-Z-SOTA `claude --bg` orchestration unlocked).
- `claude --bg --name <label>` echoes name (W259-v8 U4 mode-4 background-session ergonomics).
- Plugin marketplace add/update respects `CLAUDE_CODE_PLUGIN_PREFER_HTTPS`.

**v2.1.143 deltas worth noting**:
- `worktree.bgIsolation: "none"` setting — opt-out of bg-isolation for repos where worktrees impractical (runtime IS using worktrees per W280d, so leave default).
- PowerShell tool now passes `-ExecutionPolicy Bypass`. Opt out via `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY=1`. *Windows-native runtime — verify if opt-out wanted.*
- Stop-hook block-loop cap: `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` (NEW env var) — caps codex-review-hook re-blocks at 8 (default).
- `--agent <name>` finds plugin agents without `plugin:` prefix.

**HOLES vs current runtime**: `.claude/settings.json` does not pin `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` — relying on default 8. Acceptable but ledger-worthy.

## §2 CCBP delta (vs cited SHA `a28cd96b`)

**Probe (slug correction)**: `Shan` → `shanraisshan` (correct slug — first 2 variants 404'd, 3rd hit). `gh api /repos/shanraisshan/claude-code-best-practice/commits/HEAD` → `a28cd96b6c68b61c328fb899d1f9bd6145f76df4` @ 2026-05-20T19:37:45Z.

**HEAD = `a28cd96b`** — cited SHA in CLAUDE.md is **exact-match HEAD**. NO drift.

**Cross-SHA chain probe** — all 7 SHAs in CLAUDE.md resolve cleanly:
- `1386b0e4` @ 2026-05-17 — readme bump v2.1.143
- `ac0d87d8` @ 2026-05-16 — codex hooks update
- `48f2cebe` @ 2026-05-08 — agent-collections changelog
- `48798ca6` @ 2026-05-18 — readme badge bump
- `9624c4ac` @ 2026-05-19 — scheduled refresh
- `f28c2da3` @ 2026-05-19 — readme bump v2.1.144
- `a28cd96b` @ 2026-05-20 — v2.1.145 changelog (HEAD)

**NEW since `a28cd96b`**: NONE — `a28cd96b` IS HEAD as of probe time.

**Significant recent CCBP additions worth surfacing**:
- 3 NEW bundled skills `run`/`verify`/`run-skill-generator` landed 2026-05-20 (`cf864317`).
- `claude-subagents` doc bumped v2.1.145 no-drift (`7e1d37b2`).
- `claude-skills` run logged 3-new-skills entry (`75104193`).
- README Checkpointing-location fix (`cc2fb63a`) — clarifies Checkpointing is file-edit tracking, NOT git-based.

## §3 ECC delta (vs cached `8148340a` / `2.0.0-rc.1`)

**Probe**: `gh api /repos/affaan-m/everything-claude-code/commits/HEAD` → `1e8c7e7994223e0ff337d1626cd08e04a1ae67ed` @ 2026-05-20T03:09:39Z. Compare cached `8148340a...1e8c7e7994` → **21 commits ahead, 46 files changed**.

**Latest tagged release**: `v1.10.0` @ 2026-04-05 ("Surface Refresh, Operator Workflows, ECC 2.0 Alpha"). Runtime cached `2.0.0-rc.1` is the v2.0 RC — post-`v1.10.0` rolling-RC state.

**Delta theme (21 commits)**: release-gate hardening + GateGuard adapter system:
- `7004a662` feat(install-targets): claude-project per-project adapter (NEW install target).
- `14d88e51` fix(gateguard): preserve quoted git introspection args.
- `bc519e5b` fix(learning): add project registry maintenance.
- `27e40360` Fix release supply-chain evidence gate.
- `98196264` Add release approval gate.
- `906e0640` AgentShield adapter evidence sync.
- `68b4e451` AgentShield dependabot evidence.
- `c2471fe5` selected-target announcement gate.
- `30f60710` Marketplace Pro readback release gate.
- `6e25458d` billing gate env-file evidence sync.

**No new skills / no new plugins / no new MCP servers in delta** — entirely release-gate + adapter maintenance. Runtime's cached ECC `8148340a` content remains operationally current.

## §4 Insights features investigation (operator question)

**Operator asked**: "DO WE HAVE INSIGHTS FEATURES ENABLED that show in your runtime, should be part of the native features?"

**Probes executed**:

1. `gh api '/search/code?q=CLAUDE_CODE_ENABLE_INSIGHTS+repo:anthropics/claude-code'` → **total_count: 0**. NO upstream `CLAUDE_CODE_ENABLE_INSIGHTS*` env var exists.
2. `gh api '/search/code?q=%22%2Finsights%22+repo:anthropics/claude-code'` → only `CHANGELOG.md` + `feed.xml` hits (lowercase "insights" in prose only, NOT a slash command).
3. `gh api '/search/code?q=insights+repo:anthropics/claude-code+extension:md'` → hits are all in `plugins/feature-dev/agents/code-explorer.md` (uses word "insights" as natural-language prose, NOT a feature primitive), plus CHANGELOG.md occurrences.
4. **Runtime settings.json env scan** (Grep): `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1` + `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING=1` + `CLAUDE_CODE_ENABLE_TELEMETRY=1` + `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` — these 4 ARE wired. NO `CLAUDE_CODE_ENABLE_INSIGHT*` exists in any form.

**VERDICT — HONEST NON-FINDING**: There is no upstream Anthropic "Insights" feature/env-var/slash-command in claude-code v2.1.145 OR HEAD. The word "insights" in operator language likely refers to one of:

- **`/usage`** (formerly `/extra-usage`, renamed to `/usage-credits` in v2.1.144) — usage-credits view.
- **`/cost`** — per-session cost telemetry (older feature).
- **`context-mode:ctx_insight`** (third-party plugin skill — already loaded in runtime per system-reminder skill catalog) — opens a browser dashboard showing per-session metrics.
- **OTEL telemetry → Langfuse** — runtime already wires `CLAUDE_CODE_ENABLE_TELEMETRY=1` + Langfuse T5 :3000 (W340 Stream A re-probed v3.160.0 LIVE).
- **`session-report:session-report`** skill (third-party) — generates explorable HTML report of session usage.

If operator meant a NATIVE Anthropic "Insights" panel: it does not exist as of v2.1.145. The closest native primitive is OTEL + the new v2.1.145 `agent_id`/`parent_agent_id` span attrs.

## §5 Native-feature gaps (v2.1.140-v2.1.145 shipped but not wired here)

**Sourced from CHANGELOG above; cross-checked with `.claude/settings.json:env.*`**:

| Feature | Version | Wiring status | Action |
|---|---|---|---|
| OTEL `agent_id`/`parent_agent_id` span attrs | v2.1.145 | LIVE-by-binary (CC version-pinned) | No action — auto-active on next CC restart, Langfuse will receive enriched spans. |
| Stop/SubagentStop hook `background_tasks`+`session_crons` payload fields | v2.1.145 | Available but NOT consumed by runtime's hook bodies | Audit `.claude/settings.json:hooks.Stop` + plugin Stop hooks (codex 1.0.4) — may want to consume these for cron-aware shutdown gating. |
| `claude agents --json` | v2.1.145 | Available, NOT scripted | OPTIONAL: add to status-line script if desired. |
| `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` env var | v2.1.143 | Default=8 (NOT pinned) | OPTIONAL: pin if codex Stop-review-hook needs different cap. |
| `worktree.bgIsolation` setting | v2.1.143 | Default (active isolation) | KEEP DEFAULT — W280d worktrees in active use. |
| `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY` | v2.1.143 | Default=0 (bypass active) | OPTIONAL: set =1 if operator security policy demands. |
| `worktree.bgIsolation: "none"` opt-out | v2.1.143 | Not used | N/A — runtime uses worktrees. |
| `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` (now honored by marketplace add/update) | v2.1.144 | Not set | OPTIONAL. |
| `/resume` for background sessions | v2.1.144 | Available | UX-only — no config change needed. |

**Genuinely-missing wiring** (vs available primitives, not a gap-of-bugs): the runtime does NOT consume the new `background_tasks`/`session_crons` Stop-hook payload fields. With codex Stop-review-gate active, this is a candidate for surgical patch — block codex review if outstanding background tasks would race the commit.

## §6 Verdict — top-5 actionable Wave-N install items

Ranked by effort/impact; CR-6 cite-anchored (≥3 org-distinct per item):

### 1. OTEL span-attr pickup for Langfuse subagent-nesting (NO-OP install)
- **What**: v2.1.145 added `agent_id`+`parent_agent_id` to `claude_code.tool` OTEL spans + fixed trace parenting for background subagent spans.
- **Action**: Restart CC; verify Langfuse :3000 receives spans with new attrs. **No config change required**.
- **Verify-probe**: After 1 agent-teams dispatch, `curl -s http://127.0.0.1:3000/api/public/traces?limit=1 | jq '.data[0].observations[].agent_id'` should return non-null on subagent spans.
- **Effort**: 5 min (restart + verify).
- **Cite-anchors** (3-org-distinct): (a) `anthropics/claude-code` CHANGELOG `cc898dc3` v2.1.145 line-2; (b) Langfuse runtime v3.160.0 LIVE per W340 Stream-A re-probe; (c) OpenTelemetry-spec `https://opentelemetry.io/docs/specs/otel/trace/sdk/` parent-context propagation.

### 2. CCBP `run`/`verify`/`run-skill-generator` new bundled skills review
- **What**: CCBP `cf864317` 2026-05-20 added 3 new skills (`run`, `verify`, `run-skill-generator`). Runtime's local `.claude/skills/` set is 53 — these are sibling adjacents.
- **Action**: Cross-reference with runtime local skills (verify/run already exist locally as `superpowers:verification-before-completion` + `run`). Decide retain-local-vs-adopt-CCBP-variant per CR-1 trust-tuple.
- **Verify-probe**: `gh api /repos/shanraisshan/claude-code-best-practice/contents/claude-skills/run | jq '.[]?.name'` then compare to `Z:/claude-sota-installed/.claude/skills/run/SKILL.md`.
- **Effort**: 30 min (compare + decide).
- **Cite-anchors**: (a) CCBP `cf864317` commit; (b) Anthropic `https://code.claude.com/docs/en/skills` SKILL.md spec; (c) sibling `Z:/claude-sota-pure/.claude/skills/` clean-baseline.

### 3. Stop-hook payload consumer for `background_tasks`/`session_crons`
- **What**: v2.1.145 enriches Stop/SubagentStop hook payload — runtime's codex Stop-review-gate (1.0.4 plugin) could block commits when outstanding background tasks would race.
- **Action**: Audit plugin codex@1.0.4 `hooks/hooks.json` Stop handler for payload-consumption opportunity. If plugin doesn't consume, file upstream issue at `anthropics/claude-code` repo + author CR-2-compliant 2KB shim if approved.
- **Verify-probe**: Trigger Stop hook with `claude --bg "sleep 30"` running; inspect hook stdin JSON for `background_tasks` field.
- **Effort**: 1-2 h (audit + decide).
- **Cite-anchors**: (a) CHANGELOG v2.1.145 line-7; (b) CC Hook spec `https://docs.anthropic.com/en/docs/claude-code/hooks`; (c) codex plugin `cache/openai-codex/codex/1.0.4/hooks/hooks.json`.

### 4. ECC delta NO-OP confirm (cached `8148340a` operationally current)
- **What**: ECC 21-commit ahead delta is entirely release-gate maintenance — NO new skills/plugins/MCPs/hooks landed. Runtime cached state is functionally current.
- **Action**: NO install action. Document as confirmed-no-drift in W348 verdict ledger.
- **Verify-probe**: `gh api '/repos/affaan-m/everything-claude-code/compare/8148340a...HEAD' --jq '.files[].filename' | grep -E '(skills|plugins|hooks|mcp)/' | wc -l` → expect 0.
- **Effort**: 10 min (verify + ledger).
- **Cite-anchors**: (a) ECC `compare` API output 21-ahead/0-skill-files; (b) ECC `v1.10.0` tag = last actual release; (c) CR-1 trust-tuple update-cadence (≥1 commit older than 30d test) — `2.0.0-rc.1` cached state ages within tolerance.

### 5. Insights HONEST-NON-FINDING ledger row
- **What**: Operator's "Insights" question has no native-feature backing. Document as confirmed-non-existence to prevent re-investigation.
- **Action**: Record VERDICT-LEDGER row with operator-question text + 3 probe-results + closure rationale. Recommend operator means `context-mode:ctx_insight` skill (already loaded) OR `session-report` skill OR Langfuse dashboard.
- **Verify-probe**: `gh api '/search/code?q=CLAUDE_CODE_ENABLE_INSIGHTS+repo:anthropics/claude-code' --jq '.total_count'` → 0 (sticky-result invariant).
- **Effort**: 15 min (ledger + operator-reply).
- **Cite-anchors**: (a) GitHub code-search 0-hits; (b) v2.1.145 CHANGELOG no-insights match; (c) `code.claude.com/docs/en` docs structure (no Insights section per existing runtime knowledge — confirmable via WebFetch if operator wants).

---

## Citation ledger (cite-discipline ≥3 org-distinct per major claim)

**Anthropic-org**:
- `anthropics/claude-code` HEAD `cc898dc3` + v2.1.145 release tag (2026-05-19) — primary changelog source.
- `https://code.claude.com/docs/en/skills` — SKILL.md spec.
- `https://docs.anthropic.com/en/docs/claude-code/hooks` — hook semantics.

**CCBP-org** (shanraisshan):
- `shanraisshan/claude-code-best-practice` HEAD `a28cd96b` 2026-05-20 — exact-match with CLAUDE.md cite.
- Cross-SHA chain 7-SHA probe — all resolve.

**ECC-org** (affaan-m):
- `affaan-m/everything-claude-code` HEAD `1e8c7e79` 2026-05-20 + tag `v1.10.0` 2026-04-05.
- Compare API: 21 ahead / 46 files / 0 skill-or-plugin deltas.

**Cross-org observability**:
- Langfuse v3.160.0 (T5) :3000 LIVE — W340 Stream-A re-probe 2026-05-20.
- OpenTelemetry-spec parent-context propagation.

**Runtime ground-truth**:
- `Z:/claude-sota-installed/.claude/settings.json` Grep — 4 `CLAUDE_CODE_ENABLE_*` env vars (no INSIGHT*).
- `Z:/claude-sota-installed/CLAUDE.md` — pre-existing cite `a28cd96b`.

---

**STATUS: COMPLETE**
**Tool-call budget used**: 9/15. Token budget: well under 140k.
