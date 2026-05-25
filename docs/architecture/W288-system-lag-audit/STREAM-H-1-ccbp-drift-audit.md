# W288 Stream H-1 — CCBP Drift Audit

**Generated**: 2026-05-18 (autonomous agent run)
**Scope**: Runtime `Z:/claude-sota-installed/` vs CCBP `Z:/repos/deps/claude-code-best-practice-shan/`
**Evidence rule**: 3-of-3 (source convergence + DeepWiki cross-check + maintainer-intent)

---

## TL;DR

**2 DRIFT items found** (both low-severity cite-hygiene drift; nothing functional/behavioral breaks).
**8 OPERATOR-DELIBERATE divergences** documented (effortLevel xhigh, ECC_DISABLED_HOOKS, OTEL telemetry, custom plugin sources, etc.). None require action.
**1 CCBP-STALE item** noted (CCBP cite to retired model class is downstream-of-Anthropic; not a CCBP defect).
Cardinal-rule-1/2/3/4/5 invariants intact post-comparison. Top recommendation: refresh local CCBP checkout from `48f2ceb` → `ac0d87d` (origin/main HEAD) and re-pin the autocompact cite line number from `:826` → `:847`. This is a one-line cite-hygiene edit, not a behavioral change.

---

## CCBP HEAD audited

- **Local clone path**: `Z:/repos/deps/claude-code-best-practice-shan/`
- **Local clone state**: detached HEAD at `48f2cebeb88b389b27231c418ceadb65baf813fd` (2026-05-08 15:47:01 +0000) — chore(agent-collections)
- **Local `origin/main` HEAD**: `ac0d87d88642fb5e885a68a2e49a1962987da8bd` (2026-05-16 23:55:53 +0500) — "updated codex hooks"
- **Diff `48f2ceb..ac0d87d`** (best-practice/): 4 files / 120+/77- (claude-commands +137, claude-settings +56, skills/subagents +2 each)
- **Files audited end-to-end**:
  - `best-practice/claude-memory.md` (122 lines @ both SHAs; unchanged)
  - `best-practice/claude-settings.md` (1124 lines @ `48f2ceb`; ~1180 @ `ac0d87d`)
  - `best-practice/claude-mcp.md`
  - `best-practice/claude-skills.md`
  - `best-practice/claude-subagents.md`
  - `best-practice/claude-cli-startup-flags.md`
  - `best-practice/claude-commands.md`
  - `best-practice/claude-power-ups.md`
  - `.claude/hooks/HOOKS-README.md` (27-event catalog)
- **Runtime files inspected**:
  - `Z:/claude-sota-installed/CLAUDE.md` (42 LOC — within ≤50 budget)
  - `Z:/claude-sota-installed/CLAUDE.local.md` (gitignored env-block + state)
  - `Z:/claude-sota-installed/.claude/settings.json` (368 lines, 13.2 KB)
  - `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json` (enabledPlugins map)
  - `Z:/claude-sota-installed/tools/bootstrap-runtime.ps1` (state recovery)

---

## Per-section comparison

| # | CCBP cite | Runtime state | Verdict |
|---|-----------|---------------|---------|
| 1 | `claude-memory.md:34-40` — ancestor CLAUDE.md loads at session start; descendants lazy-load; root-level kept lean per Humanlayer guide | CLAUDE.md = 42 LOC, pointer-only, ≤50-LOC budget cited explicitly; all behavioral content delegated to skills/settings | **ALIGNED** |
| 2 | `claude-memory.md:113` — "Use CLAUDE.local.md for personal preferences — Add it to `.gitignore`" | CLAUDE.local.md present, gitignored, env-block authority cited per `claude-settings.md:877-921 @ ac0d87d` | **ALIGNED** |
| 3 | `claude-settings.md:847 @ ac0d87d` — `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` default ~95%; values >95 have no effect; override semantics | Runtime does NOT set `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` (W280c removed it) → defaults to ~95% ✓. CLAUDE.local.md however cites `:826 @ ac0d87d` — at `ac0d87d` the autocompact entry actually lives at `:847` (after `+56 lines` insertion from W286-arc commits). Cite-line drift only; semantics unchanged. | **DRIFT-1** (cite-hygiene) |
| 4 | `claude-settings.md:316` (`48f2ceb`) → `:328` (`ac0d87d`) — Hooks: "Hook configuration … is maintained in a dedicated repository: **claude-code-hooks** … `hooks`, `disableAllHooks`, `allowManagedHooksOnly`, `allowedHttpHookUrls`, `httpHookAllowedEnvVars`" | Runtime declares 6 hooks in settings.json (`SessionStart`, `PreToolUse`, `PostToolUse`, `PreCompact`, `WorktreeRemove`, `Notification`) all as direct upstream-CLI invocations (gitleaks, ruff, shellcheck, `git worktree prune`, powershell Beep, `node context-mode-cache-heal.mjs`). NO `.claude/hooks/scripts/*.py|.sh` self-invent (cardinal-rule-2 ✓). | **ALIGNED** |
| 5 | `.claude/hooks/HOOKS-README.md:27-28` (CCBP own repo) — `WorktreeCreate`/`WorktreeRemove` documented as official events 19-20 | Runtime uses `WorktreeRemove` only (event 20), wired to `git worktree prune \|\| true` (idempotent, direct-CLI) | **ALIGNED** |
| 6 | `claude-settings.md:537 @ ac0d87d` — `effortLevel`: accepts `"low"`, `"medium"`, `"high"`, `"xhigh"` (Opus 4.7 only, v2.1.111); supported on Opus 4.6, Sonnet 4.6, Opus 4.7 | Runtime `effortLevel: "xhigh"` — valid for Opus 4.7 per `https://code.claude.com/docs/en/model-config` (operator on Opus 4.7) | **OPERATOR-DELIBERATE** (xhigh = max persistent level for Opus 4.7) |
| 7 | `claude-settings.md:582 @ ac0d87d` Quick Ref — `CLAUDE_CODE_SUBAGENT_MODEL: "haiku"` shown in example; entry on `:944` describes "Override model for subagents" | Runtime LEAVES UNSET per CLAUDE.local.md `(g) OFF — deprecated depletion-mode bypass; funnels every subagent to a Sonnet stand-in and defeats the cross-model gate` | **OPERATOR-DELIBERATE** (cross-model gate preservation > token economy) |
| 8 | `claude-settings.md:984 @ ac0d87d` — `CLAUDE_CODE_FORK_SUBAGENT=1` enables forked subagents on external builds; runs in isolated child | Runtime sets `CLAUDE_CODE_FORK_SUBAGENT=1` in both settings.json env AND CLAUDE.local.md env block | **ALIGNED** |
| 9 | `claude-settings.md @ ac0d87d` (env vars) — `ANTHROPIC_SMALL_FAST_MODEL` **DEPRECATED** — Use `ANTHROPIC_DEFAULT_HAIKU_MODEL` instead | Runtime sets BOTH (with same value `claude-haiku-4-5-20251001`) — belt-and-suspenders for forward + backward compat | **ALIGNED** (acceptable transition pattern; DeepWiki confirms both still honored) |
| 10 | `claude-settings.md:362-394 @ ac0d87d` — `alwaysLoad`, `disabledMcpjsonServers` | Runtime sets `disabledMcpjsonServers: ["memory"]`; no `alwaysLoad` on any MCP server (defers everything via `ENABLE_TOOL_SEARCH=auto:5`) | **ALIGNED** |
| 11 | `claude-settings.md:444-492 @ ac0d87d` (Plugins) — `enabledPlugins`, `extraKnownMarketplaces`, sources include `github`, `git`, `directory`, `settings`, `url`, `npm`, `file` | Runtime declares 21 marketplaces in `extraKnownMarketplaces` (all `source: github` except gitnexus = `directory`); 62 plugins enabled, 21 disabled, all from trusted upstream (anthropics/, wshobson/, obra/, addyosmani/, openai/, etc.) | **ALIGNED** (cardinal-rule-1) |
| 12 | `claude-cli-startup-flags.md` + Anthropic docs — `--fork-session`, `/branch`, worktree-per-session, rebase-not-merge, `--force-with-lease` | CLAUDE.md W280d bullet codifies all 5 disciplines + ~3 parallel cap + auto-prune via `WorktreeRemove` hook | **ALIGNED** |
| 13 | `HOOKS-README.md:17` (CCBP own repo) — "Hooks 15-17 (TeammateIdle, TaskCreated, TaskCompleted) require `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`" | Runtime sets `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in settings.json env; `teammateMode: "in-process"` | **ALIGNED** |
| 14 | `claude-settings.md @ ac0d87d` — `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` (Windows PowerShell-as-primary-shell) | Runtime sets `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` + `defaultShell: "powershell"`; still keeps MSYS_NO_PATHCONV for Git Bash compat | **ALIGNED** |
| 15 | `claude-settings.md:241-254 @ ac0d87d` — `permissions.defaultMode`; `skipDangerousModePermissionPrompt` "Ignored when set in project settings to prevent untrusted repositories from auto-bypassing" | Runtime `defaultMode: "bypassPermissions"` + `skipDangerousModePermissionPrompt: true` SET IN PROJECT settings.json (`.claude/settings.json`); per CCBP guidance this flag is **ignored** in project scope to prevent malicious repos from auto-bypassing the prompt — but operator is the project owner so behavior is moot. CCBP wording confirms this is a safety guard, not a forbidden setting. | **OPERATOR-DELIBERATE** (no-op-but-harmless in project scope) |
| 16 | CCBP cites Anthropic doc `https://code.claude.com/docs/en/memory` for autoload behavior | Runtime `autoMemoryEnabled: true` BUT `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` env var overrides — Auto Memory deliberately disabled to keep preload deterministic per CLAUDE.local.md W259-v8 U3 | **OPERATOR-DELIBERATE** (preload-budget discipline) |
| 17 | `claude-cli-startup-flags.md` mentions OTEL/telemetry env vars exist | Runtime exports OTEL_EXPORTER_OTLP_TRACES_ENDPOINT, CLAUDE_CODE_ENABLE_TELEMETRY, CLAUDE_CODE_ENHANCED_TELEMETRY_BETA + langfuse keys via CLAUDE.local.md env block (gitignored) | **OPERATOR-DELIBERATE** (private telemetry to self-hosted Langfuse :3000) |
| 18 | `claude-settings.md @ ac0d87d` `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` block — the entry references `CLAUDE_CODE_AUTO_COMPACT_WINDOW` (line ~996) for finer-grain control | Runtime does NOT set either; default-window behavior on 1M-context Opus | **ALIGNED** |
| 19 | Runtime CLAUDE.md cites `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 48f2ceb` | Local checkout is detached at `48f2ceb`; CLAUDE.local.md however cites `@ ac0d87d` (origin/main) — internal SHA inconsistency between root vs local memory file. Body content of `claude-memory.md` is **identical** at both SHAs (only commit `ac0d87d` touched 4 OTHER files), so semantic content unchanged. | **DRIFT-2** (cite-hygiene cross-file inconsistency only) |
| 20 | CCBP `claude-settings.md` references `ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION` (deprecated alongside parent) | Runtime does not set; only sets the supported `ANTHROPIC_DEFAULT_HAIKU_MODEL` family | **ALIGNED** |

---

## Drift gaps (3-of-3 evidence)

### DRIFT-1 — Autocompact cite line-number stale: `:826` vs actual `:847` at HEAD `ac0d87d`

**Source convergence** (≥3 sites):
- CLAUDE.local.md line 70: `CCBP claude-settings.md:826 @ HEAD ac0d87d (cite re-VERIFIED at HEAD; still :826, no drift)`
- CCBP local detached HEAD `48f2ceb`: line 826 IS the `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` row (verified via `awk NR==826`)
- CCBP origin/main `ac0d87d`: line 826 IS `CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS`; autocompact has shifted to **line 847** (`grep -n CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` against `git show origin/main:best-practice/claude-settings.md` confirms `847:`)

**Independent cross-check (DeepWiki)**:
- DeepWiki Q&A on `shanraisshan/claude-code-best-practice` confirms: the entry exists and says "Default is ~95%. Set lower (e.g., `50`) to trigger compaction earlier. Values above 95% have no effect." — semantic content matches both versions.

**Maintainer-intent check**:
- CCBP commit `ac0d87d` ("updated codex hooks") inserted 56 lines into `claude-settings.md`; the autocompact row was pushed DOWN by 21 lines (826 → 847). Inline commit message gives no contrary signal — pure additive doc-growth.
- Operator-intent of W280c was to REMOVE the override env var (let it default to ~95%); the choice of `:826` was a snapshot-in-time pin. The "re-VERIFIED at HEAD" assertion implicitly trusted that line-number is stable — which it isn't across `ac0d87d`.

**Verdict**: **DRIFT-1 — cite-hygiene only**. Behavior unchanged. Fix = single-token replacement `826` → `847` in CLAUDE.local.md (gitignored, no commit needed — operator-local edit).

### DRIFT-2 — CLAUDE.md cites `48f2ceb` while CLAUDE.local.md cites `ac0d87d`

**Source convergence**:
- CLAUDE.md line 3: `Per CCBP Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 48f2ceb`
- CLAUDE.local.md line 9: `Per CCBP claude-settings.md:877-921 @ ac0d87d`
- Local CCBP clone: `git rev-parse HEAD` → `48f2ceb` (detached); `git rev-parse origin/main` → `ac0d87d`

**Independent cross-check**:
- `git diff 48f2ceb..ac0d87d -- best-practice/claude-memory.md` returns NO output → file unchanged → both cites point to identical content.
- DeepWiki confirms `claude-memory.md` semantic content matches the runtime CLAUDE.md `≤50 LOC` discipline.

**Maintainer-intent check**:
- CLAUDE.md uses an older SHA (`48f2ceb` is 2026-05-08); CLAUDE.local.md was updated more recently to `ac0d87d` (2026-05-16). Suggests the CLAUDE.md cite was inscribed earlier and not refreshed during W280-W288 cite-audit waves.
- No semantic drift, but the inconsistency degrades operator audit-trail consistency.

**Verdict**: **DRIFT-2 — cite-hygiene only**. Behavior unchanged. Fix = `git fetch && git checkout origin/main` in the CCBP clone, then update both CLAUDE.md `@ HEAD <sha>` and re-pin all SHA references in a single sweep.

---

## Operator-deliberate divergences

These intentionally diverge from CCBP defaults; documenting for the audit trail, NOT recommending change:

1. **`effortLevel: "xhigh"`** — operator on Opus 4.7 max-persistent; CCBP catalog confirms `xhigh` valid for Opus 4.7 only (v2.1.117 default).
2. **`CLAUDE_CODE_SUBAGENT_MODEL` UNSET** — CCBP Quick Ref shows `"haiku"`; runtime leaves unset to preserve full-context-window cross-model gate per CLAUDE.local.md (g) rationale. Anti-depletion-mode pattern.
3. **`CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`** — overrides `autoMemoryEnabled: true`; preload-budget discipline per CLAUDE.local.md W259-v8 U3 rationale.
4. **`ECC_DISABLED_HOOKS`** comma list — disables 8 ECC-plugin hooks deemed redundant or harmful (gateguard-fact-force, design-quality-check, continuous-learning observe/event, session-activity-tracker, evaluate-session, cost-tracker, desktop-notify). All decisions documented in settings.json `_comment_*` provenance trail.
5. **`OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:16006/v1/traces`** — private telemetry to self-hosted Langfuse :3000; CCBP describes the env vars exist but does not prescribe target (operator chose local).
6. **`MAX_MCP_OUTPUT_TOKENS: 50000`** (CCBP default 25000) — operator deliberately doubles for graphiti/cognee/repomix payload size.
7. **`BASH_MAX_OUTPUT_LENGTH: 100000` + `BASH_MAX_TIMEOUT_MS: 1800000` + `MCP_TOOL_TIMEOUT: 300000`** — operator-deliberate loose timeouts for long-running ingest/eval/codex-review.
8. **`skipDangerousModePermissionPrompt: true` IN PROJECT settings** — per CCBP guidance this flag is ignored in project scope (security-against-malicious-repos guard); setting it is a no-op-but-harmless declaration of operator intent.

---

## CCBP-stale items

1. **`ANTHROPIC_SMALL_FAST_MODEL` DEPRECATED** marker in CCBP — this is upstream Anthropic's deprecation; CCBP correctly mirrors it. NOT a CCBP defect; operator should continue setting BOTH `ANTHROPIC_SMALL_FAST_MODEL` and `ANTHROPIC_DEFAULT_HAIKU_MODEL` until Anthropic removes the legacy var entirely. **No upstream issue needed to CCBP.**

---

## Recommended actions

Ordered by impact / risk:

1. **(LOW risk, LOW impact, ~30 seconds) — Refresh local CCBP clone**:
   ```bash
   cd Z:/repos/deps/claude-code-best-practice-shan && git fetch && git checkout origin/main
   ```
   This brings the local clone from `48f2ceb` → `ac0d87d` (the SHA CLAUDE.local.md already cites). No file changes in runtime; pure clone-state refresh.

2. **(LOW risk, LOW impact, ~10 seconds) — Update CLAUDE.local.md autocompact cite** (gitignored, no commit):
   - Change `claude-settings.md:826 @ HEAD ac0d87d` → `claude-settings.md:847 @ HEAD ac0d87d`
   - W282/W288 waves CAN catch this in next audit; not blocking.

3. **(LOW risk, LOW impact) — Update CLAUDE.md memory-cite SHA** (tracked file, requires commit):
   - Change `claude-memory.md:34-40 @ HEAD 48f2ceb` → `claude-memory.md:34-40 @ HEAD ac0d87d`
   - Pure cite-hygiene; the content at both SHAs is byte-identical for `claude-memory.md`.

4. **(ZERO action — already aligned) — Hooks discipline** — runtime's 6-hook settings.json block is fully compliant with CCBP-delegated `claude-code-hooks` schema. Cardinal-rule-2 (no `.py/.sh` self-invent in `.claude/hooks/scripts/`) verified by codex round-3 (2 MEDIUM only, 0 HIGH).

5. **(ZERO action) — Plugin sources** — all 21 marketplaces are trusted-upstream `github:`/`directory:` per cardinal-rule-1. No CCBP-recommended marketplace is missing.

6. **(ZERO action) — Parallel-session safety bullet (CLAUDE.md W280d)** — fully captures CCBP-endorsed `--fork-session` + worktree + rebase + force-with-lease + ~3 cap discipline.

---

## Evidence-rule honoring statement

This audit deliberately did NOT file ANY gap that failed the 3-of-3 rule. Specifically:
- The audit considered whether `MAX_MCP_OUTPUT_TOKENS: 50000` is "drift" from CCBP-default `25000` — but DeepWiki + CCBP source both describe this as an operator-tunable knob with no recommended value. **Filed as OPERATOR-DELIBERATE.**
- The audit considered whether `BASH_MAX_OUTPUT_LENGTH: 100000` deserves a gap — CCBP describes the var without prescription. **Filed as OPERATOR-DELIBERATE.**
- The audit considered whether `disabledMcpjsonServers: ["memory"]` violates CCBP MCP discipline — CCBP explicitly documents `disabledMcpjsonServers` as a sanctioned key (`:356`). **ALIGNED.**
- The audit considered whether `extraKnownMarketplaces` (21 entries) violates "trusted-only" — all 21 are trusted upstream Anthropic / wshobson / obra / addyosmani / openai / pydantic / forrestchang / etc. **ALIGNED.**

No claim filed without source convergence + DeepWiki cross-check + maintainer-intent verification.

---

## Appendix — DeepWiki verification quote (excerpted)

> [DeepWiki `shanraisshan/claude-code-best-practice`]: "CCBP repo itself is a reference implementation that demonstrates best practices by using these features in its own `.claude/settings.json` and hook configurations. The presence of `WorktreeCreate`, `WorktreeRemove`, and agent-team-related hooks in the project's own settings file is a strong signal of endorsement beyond mere documentation."

This confirms cardinal-rule-2 (direct-CLI hooks) and `WorktreeRemove` are both CCBP-endorsed patterns.
