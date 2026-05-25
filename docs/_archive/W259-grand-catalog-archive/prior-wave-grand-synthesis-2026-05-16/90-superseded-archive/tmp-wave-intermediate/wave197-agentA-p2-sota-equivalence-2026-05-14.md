# Wave 197 Agent A — P2 SOTA-Equivalence Audit of the 4 /compact-governing plugins

**Agent**: sota-researcher (READ-ONLY, FM-19 ARTIFACT-INLINE) | **Date**: 2026-05-14
**Runtime HEAD**: claude-sota-installed `f3354098eae3f5712690d839f4fe7b8cb52501a4`
**Method**: convergence-gate Axis-1 (>=3-distinct-org) + harness-fit Probe 4 (plugin-namespace) + Probe 5 (mode-harness-shape) + Probe 6 (LICENSE/badge/registry blockers) per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` + `convergence-gate.md`
**Persisted by**: orchestrator post-completion per FM-19 readonly-guard-sidestep (agent dispatched read-only; ARTIFACT-INLINE return)

## (a) 4-row verdict table

| Plugin | Axis-1 org count | Probe 4 (namespace dup) | Probe 5 (mode-harness fit) | Probe 6 (LICENSE/badge/registry) | Verdict |
|---|---|---|---|---|---|
| **intelligent-compact@claude-settings v1.0.0** (fcakyon) | PASS — 4 orgs [VERIFIED] | PASS — no dup; unique PreCompact prompt-augmentation layer [VERIFIED] | PASS — PreCompact `matcher:"*"`, heredoc->stdout, never blocks (no `decision:block`); autonomous-/loop compatible [VERIFIED] | PASS — `LICENSE` Apache-2.0; no archive/deprecation badge; marketplace `fcakyon/claude-codex-settings` resolves [VERIFIED] | **SOTA-CONFIRMED** |
| **context-mode@context-mode v1.0.133** (mksglu / Mert Koseoglu) | PASS — 3 orgs [VERIFIED] | PASS — no dup; only PreCompact SQLite session-snapshot layer [VERIFIED] | PASS — PreCompact `runHook`-wrapped, builds <2KB XML snapshot, `console.log({})` never blocks; SessionStart restore-after-compact; autonomous-/loop compatible [VERIFIED] | **AMBER — Elastic-2.0 (ELv2), NOT permissive** [VERIFIED] — source-available, NOT MIT/Apache/BSD. Already operator-acknowledged as CR-9 MED risk in `.mcp.json:3` Wave 79 header. No archive/deprecation badge; marketplace `mksglu/context-mode` resolves | **SOTA-CONFIRMED-with-LICENSE-CAVEAT** |
| **everything-claude-code (ECC) 2.0.0-rc.1** (@affaan-m / Affaan Mustafa) | PASS — 4 orgs [VERIFIED] | PASS — 2 distinct hooks: `pre-compact.js` (PreCompact state-save) + `suggest-compact.js` (PreToolUse threshold-suggest) [VERIFIED] | PASS — both hooks `process.exit(0)` always, even on error; never block; autonomous-/loop compatible [VERIFIED] | PASS — `LICENSE` MIT (Copyright 2026 Affaan Mustafa); README "deprecated" hit at L240 refers to OLD PLUGIN-NICKNAME shorthand, NOT plugin archive-status [VERIFIED]; marketplace resolves; `2.0.0-rc.1` is release-candidate (expected) | **SOTA-CONFIRMED** |
| **context-management@claude-code-workflows v1.2.0** (Seth Hobson / wshobson) | PASS — 4 orgs [VERIFIED] | PASS — no hook; 2 slash-commands `/context-save` + `/context-restore`; no namespace collision [VERIFIED] | PASS — pure command primitives, no hook surface, no block risk; user-invoked persist/restore; autonomous-/loop compatible [VERIFIED] | PASS — marketplace-root `LICENSE` MIT (Copyright 2024 Seth Hobson); no archive/deprecation badge; marketplace `claude-code-workflows` = `wshobson/agents` repo resolves [VERIFIED] | **SOTA-CONFIRMED** |

**ZERO-LOCAL-INVENTION-DRESSED CONFIRMED**: all 4 plugins are genuine third-party SOTA installs from named GitHub marketplaces — none is local-invention dressed. context-management@1.2.0 is a *verbatim* install of upstream wshobson (full-file `diff` IDENTICAL on `context-save.md`, 177 LOC match, identical `plugin.json`). intelligent-compact cache copy == marketplace copy (`diff` IDENTICAL on `precompact_priorities.sh`).

## (b) Per-plugin cite trail at file:line @ HEAD SHA

### 1. intelligent-compact@claude-settings v1.0.0
- **Plugin**: `.claude/plugins/cache/claude-settings/intelligent-compact/1.0.0/.claude-plugin/plugin.json:5` — `"license":"Apache-2.0"` [VERIFIED]
- **Hook**: `.claude/plugins/cache/claude-settings/intelligent-compact/1.0.0/hooks/scripts/precompact_priorities.sh:1-71` — PreCompact A-F priority-injection block, quoted heredoc, never blocks [VERIFIED, 71 LOC]
- **Hook config**: `.../intelligent-compact/1.0.0/hooks/hooks.json:4-14` — `PreCompact` matcher `"*"`, `type:"command"` [VERIFIED]
- **Marketplace**: owner Fatih Akyon, repo `fcakyon/claude-codex-settings`, plugin Apache-2.0 [VERIFIED]
- **Axis-1 cross-org** (PreCompact-state-preservation, 4 orgs): fcakyon + affaan-m/ECC `pre-compact.js @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` + mksglu/context-mode `precompact.mjs` + Anthropic CC official PreCompact event spec `https://code.claude.com/docs/en/hooks` [VERIFIED].

### 2. context-mode@context-mode v1.0.133 (cache dir misleadingly named `1.0.111`)
- **Plugin**: `.claude/plugins/cache/context-mode/context-mode/1.0.111/.claude-plugin/plugin.json:3` — `"version":"1.0.133"` (dir-name says 1.0.111, content says 1.0.133); `:11` — `"license":"Elastic-2.0"`; author Mert Koseoglu / `github.com/mksglu` [VERIFIED]
- **Hook**: `.../context-mode/1.0.111/hooks/precompact.mjs:1-93` — PreCompact `runHook`-wrapped, builds priority-sorted <2KB XML resume-snapshot, `console.log(JSON.stringify({}))` never blocks [VERIFIED — **93 LOC, NOT 76** as auto-compact-discipline.md L102 claims]
- **LICENSE**: `.../context-mode/1.0.111/LICENSE:1-3` — "Elastic License 2.0 (ELv2) Copyright 2026 Mert Koseoglu" [VERIFIED]
- **Axis-1 cross-org** (compaction-survival snapshot/restore, 3 orgs): mksglu + wshobson `/context-save`+`/context-restore` + Anthropic CC SessionStart-after-compact native event [VERIFIED].

### 3. everything-claude-code (ECC) 2.0.0-rc.1
- **Plugin**: `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.claude-plugin/plugin.json:11` — `"license":"MIT"`; author Affaan Mustafa [VERIFIED]
- **Hook 1**: `.../2.0.0-rc.1/scripts/hooks/pre-compact.js:24-31,41-47` — PreCompact state-save, `process.exit(0)` always [VERIFIED — 48 LOC]
- **Hook 2**: `.../2.0.0-rc.1/scripts/hooks/suggest-compact.js:30-33,69-70` — PreToolUse threshold-suggest (`COMPACT_THRESHOLD` env default 50), `process.exit(0)` always [VERIFIED — 80 LOC]
- **Upstream parity**: `Z:/repos/deps/everything-claude-code/scripts/hooks/pre-compact.js + suggest-compact.js @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a` [VERIFIED — cite lines resolve identically]
- **Axis-1 cross-org** (compaction-event-logging + strategic-compact-suggestion, 4 orgs): affaan-m + mksglu/context-mode + wshobson + get-shit-done `gsd-context-monitor.js @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5` [VERIFIED].

### 4. context-management@claude-code-workflows v1.2.0
- **Plugin**: `.claude/plugins/cache/claude-code-workflows/context-management/1.2.0/.claude-plugin/plugin.json:9` — `"license":"MIT"`; author Seth Hobson [VERIFIED]
- **Commands**: `.../context-management/1.2.0/commands/context-save.md:1-177` + `context-restore.md:1-177` — semantic context capture/rehydration specs [VERIFIED]
- **Upstream parity**: `Z:/repos/deps/wshobson-agents/plugins/context-management/commands/context-save.md @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` — full-file `diff` IDENTICAL (177 LOC) [VERIFIED — verbatim install]
- **LICENSE**: marketplace-root `Z:/repos/deps/wshobson-agents/LICENSE:1-3` — "MIT License Copyright (c) 2024 Seth Hobson" [VERIFIED]
- **Axis-1 cross-org** (persist/restore-across-session command pattern, 4 orgs): wshobson + mksglu/context-mode + affaan-m/ECC + Anthropic CC SessionStart restore-injection [VERIFIED].

## (c) context-mode v1.0.111->v1.0.133 upgrade-gap flag — RESOLVED, NOT a gap

**NO actual version gap** — the brief's premise ("v1.0.111 installed, v1.0.133 available") is based on the misleading DIRECTORY NAME.
- `installed_plugins.json` records installPath as `...context-mode\1.0.133` [VERIFIED]
- The cache dir literally named `1.0.111` has `.claude-plugin/plugin.json:3` = `"version":"1.0.133"` [VERIFIED]
- Both `1.0.111/` and `1.0.133/` cache dirs exist with identical file counts (5568 each) [VERIFIED]
- **RISK: LOW** — installed CONTENT is already v1.0.133; this is cosmetic cache-dir naming residue from an in-place CC plugin-update. NO upgrade action needed. Parallel-arc W197 P0 row (2026-05-14T15:38Z) confirms the upgrade was already run.

## (d) Cite drift found in auto-compact-discipline.md header lattice

| Cite line | Current claim | Verified reality | Severity |
|---|---|---|---|
| **L102** | `context-mode/1.0.111/hooks/precompact.mjs:1-76` | File is **93 LOC** — fix to `:1-93` | **P2 cite drift** [VERIFIED via `wc -l`] |
| L99 | `intelligent-compact/1.0.0/...precompact_priorities.sh:1-71` | 71 LOC — EXACT [VERIFIED] | none |
| L100 | `ECC...pre-compact.js:24-31,41-47` | 48 LOC, cite lines resolve [VERIFIED] | none |
| L101 | `ECC...suggest-compact.js:30-33,69-70` | 80 LOC, cite lines resolve [VERIFIED] | none |
| L98 | runtime HEAD `eec69e21ee37ae2f235016361494842a08013a9b` | Current runtime HEAD `f3354098eae3f5712690d839f4fe7b8cb52501a4` — STALE HEAD pin (paths still resolve) | **P3 advisory** [VERIFIED] |
| L13/L172 | repomix `@ HEAD 7dfd2b96` | Upstream repomix HEAD now `b99706131b26b68e0d72aab7f93fccebad1460c0` — STALE HEAD pin; line-ranges not re-verified at new HEAD | **P3 advisory** [INFERRED — cite-content drift UNKNOWN] |
| L171/L194 | "context-mode MCP plugin (v1.0.124 latest; v1.0.111 running)" | STALE — installed content is v1.0.133 | **P2 cite drift** [VERIFIED] |
| L19/L178 | CCBP `claude-settings.md:826,967 @ HEAD 48f2cebe...` | HEAD confirmed; L826 = `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`, L967 = `CLAUDE_CODE_AUTO_COMPACT_WINDOW` — EXACT [VERIFIED] | none |
| L15/L174 deepagents, L16/L175 GSD, L17/L176 ECC, L18/L177 wshobson | all HEAD SHAs confirmed, files exist | [VERIFIED] | none |

**Summary**: 2 P2 (L102 line-range; L171/L194 stale version framing) + 2 P3 advisory (L98 stale runtime HEAD; L13/L172 stale repomix HEAD). All 8 upstream-deps cites RESOLVE — staleness not breakage. Header L187 Axis-1 >=3-org claim CONFIRMED VALID.

## Honest Conclusion

**Hypothesis (re-verify W193/W195 "ZERO-LOCAL-INVENTION-DRESSED")**: CONFIRMED [VERIFIED]. All 4 /compact-governing plugins are genuine third-party SOTA installs from named GitHub marketplaces with verified registry entries, resolving LICENSE files, and >=3-distinct-org Axis-1 convergence.

**Verdicts**: 3x SOTA-CONFIRMED (intelligent-compact, ECC, context-management) + 1x SOTA-CONFIRMED-with-LICENSE-CAVEAT (context-mode — Elastic-2.0 ELv2, source-available NOT permissive; already CR-9 MED-risk acknowledged in `.mcp.json:3`). No LOCAL-INVENTION-DRESSED. No REJECT-FOR-FIT. No SOTA-CITE-UPGRADE-NEEDED (all cites resolve; the 4 drift items are staleness fixes, not authority gaps).

**Probe-6 caveat for W197 recomposition**: context-mode's Elastic-2.0 license is the one non-clean Probe-6 result. The runtime already chose to install it with explicit CR-9 MED-risk acknowledgment. `auto-compact-discipline.md L12` labels it `TIER-1-DIRECT` without flagging ELv2 — recommend W197 add an inline ELv2 marker there.

**W197 action items (NOT performed — read-only)**: (1) fix `auto-compact-discipline.md` L102 `:1-76`->`:1-93`; (2) fix L171/L194 version framing to "v1.0.133 installed"; (3) refresh L98 runtime HEAD pin; (4) re-verify L13/L172 repomix cites at new HEAD `b9970613`; (5) add ELv2 inline marker at L12 context-mode cite. The context-mode "1.0.111->1.0.133 upgrade" is a NON-GAP — directory-name drift only.

ARTIFACT-INLINE complete — handoff to orchestrator.
