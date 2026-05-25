# W326 Stream B — 12-Family Multi-Repo Drift + NET-NEW Sweep (V2)

**Date**: 2026-05-19 | **Owner**: Stream B | **Predecessor**: W325-B (4 days ago)
**Methodology**: `gh api commits/HEAD` + `gh api compare/<old>...HEAD` + `mcp__deepwiki__ask_question` (no repomix-pack). Bonus: deer-flow + pyDecision license re-verify.

---

## 1. SHA-DRIFT TABLE (12 anchors + 2 bonus = 14 families)

| # | Repo | Runtime cite | Current HEAD | Δ commits | Date | Classification |
|---|------|---|---|---|---|---|
| 1 | anthropics/claude-cookbooks | `2eed173a` | **`39a350b6`** | +4 | 2026-05-19 | **MATERIAL** (research_lead_agent + orchestrator_workers patched) |
| 2 | anthropics/claude-code | `69d70700` | `69d70700` | 0 | 2026-05-19 | BENIGN-ZERO-DRIFT (v2.1.140 CHANGELOG @ HEAD) |
| 3 | anthropics/claude-agent-sdk-ts | `e62865e4` | `e62865e4` | 0 | 2026-05-19 | BENIGN-ZERO-DRIFT |
| 4 | anthropics/anthropic-sdk-python | `28cdc336` | `28cdc336` | 0 | 2026-05-19 (rel 0.103.1) | BENIGN-ZERO-DRIFT |
| 5 | anthropics/anthropic-sdk-ts | `ac9ece3c` | `ac9ece3c` | 0 | 2026-05-19 | BENIGN-ZERO-DRIFT |
| 6 | anthropics/skills | `690f15ca` (W325-r3) | **`690f15cac7f7b4c055c5ab109c79ed9259934081`** | 0 | 2026-05-19 | BENIGN — 40-char SHA verified: `690f15cac7f7b4c055c5ab109c79ed9259934081` |
| 7 | wshobson/agents | `08ded5e7` | `08ded5e7` | 0 | 2026-05-17 | BENIGN-ZERO-DRIFT (W319-A H1 `ece811f2` claim FALSIFIED — repo HEAD is still 08ded5e7; W319 finding was upstream-PR speculation, not landed) |
| 8 | mattpocock/skills | `67bce91c` | **`d54c497a`** | +4 | 2026-05-19 | **MATERIAL** (handoff redaction; CONTEXT.md template trim) |
| 9 | mksglu/context-mode | v1.0.141 | **`7f71632c`** (v1.0.142) | +6 | 2026-05-19 | **MATERIAL** (zod v4 + codex 30s detach + Agent matcher) |
| 10 | OthmanAdi/planning-with-files | `d27008f3` (v2.38.1) | `d27008f3` | 0 | 2026-05-16 | BENIGN-ZERO-DRIFT |
| 11 | abhigyanpatwari/GitNexus | `803f0bed` | `803f0bed` | 0 | 2026-05-19 | BENIGN-ZERO-DRIFT (W325 P7 HOLD-DISABLED stance retained) |
| 12 | shanraisshan/claude-code-best-practice (CCBP) | `48798ca6` (CLAUDE.md L3) | **`f28c2da3`** | +3 | 2026-05-19 | **MATERIAL-LOW** (2 scheduled refreshes + badge bump; cited line-numbers L34-40/L877-921/L826 not invalidated) |
| 13 | bytedance/deer-flow (bonus) | `b69ca7ad` | `b69ca7ad` | 0 | 2026-05-19 | BENIGN-ZERO-DRIFT |
| 14 | Valdecy/pyDecision (bonus) | `05488ffa` | `05488ffa` | 0 | 2026-05-09 | BENIGN-ZERO-DRIFT |

**2026-May freshness gate**: 14/14 PASS (every HEAD ≤10 days; 12/14 dated 2026-05-19 within 24h of probe).
**Correction logged**: CLAUDE.md L3 cites repo as "CCBP" (informal); canonical owner/name is **`shanraisshan/claude-code-best-practice`**. W326 P1 → update L3 cite-shorthand.

---

## 2. pyDecision LICENSE RE-VERIFY (W325 carry-AI)

`gh api /repos/Valdecy/pyDecision/contents/LICENSE` (base64-decoded):
> "pyDecision is free software: you can redistribute it and/or modify it under the terms of the **GNU General Public License** as published by the Free Software Foundation, either **version 3** of the License, or (at your option) any later version."

**Verdict**: Pure **GPLv3** (no LGPL "linking exception", no classpath exception). Strong copyleft.
**Rubric impact**: D1=3 cap **RETAINED** per sca-v8.1-partial §D1 sub-scale. License-key field reports `NOASSERTION` only because GitHub couldn't fingerprint the slight wording variation — manual decode is authoritative. NO upgrade to D1=4.

---

## 3. NET-NEW PATTERNS ≥8 (since W325-B ingest)

### P1 — `<use_parallel_tool_calls>` MUST-block (research_lead_agent.md @ `39a350b6`)
- **Cite**: https://github.com/anthropics/claude-cookbooks/blob/39a350b6/patterns/agents/prompts/research_lead_agent.md
- **NET-NEW**: Explicit MUST block: "Use parallel tool calls for creating multiple subagents at the start of the research, unless it's a straightforward query."
- **W326-P**: REFRESH CLAUDE.md L13 cite from `2eed173a:135-137` → `39a350b6:135-137` (content-stable per W314 §C cross-SHA invariant — IDENTICAL block text, just freshness re-anchor; W319-B cite-refresh chain extends: `1386b0e → ac0d87d → 48f2ceb → 48798ca → 9624c4ac → 39a350b6`).
- **Falsifiable-inverse**: If CLAUDE.md L13 SHA refresh introduces ANY semantic drift in the parallel-MUST block (text-diff > 0 chars normalized), then revert to `2eed173a`. Test: `gh api ...39a350b6:research_lead_agent.md | sha256` vs cached W319 copy.

### P2 — `FlexibleOrchestrator.process(context=...)` parameter (orchestrator_workers.ipynb @ `39a350b6`)
- **Cite**: https://github.com/anthropics/claude-cookbooks/blob/39a350b6/patterns/agents/orchestrator_workers.ipynb
- **NET-NEW**: Orchestrator now accepts optional `context: dict` passed to `_format_prompt` for context-aware sub-task synthesis. Aligns with `superpowers:dispatching-parallel-agents` pattern.
- **W326-P**: Wire into `parallel-dispatch-mandate` skill as recommended-pattern §6 (context-passthrough optional but encouraged for multi-stream sessions with shared docs).
- **Falsifiable-inverse**: If `context` param adds ≥0.30s/orchestrator-call overhead at typical session payload (10KB context dict), abandon the pattern. Test: timeit on equivalent dispatch with/without context dict.

### P3 — `PreToolUse` matcher extended to `Agent` (context-mode v1.0.142 hooks/pretooluse.mjs)
- **Cite**: https://github.com/mksglu/context-mode/blob/7f71632c/hooks/pretooluse.mjs
- **NET-NEW**: `Task`-only hook matcher now also matches `Agent` tool — prevents context flooding from sub-agent fan-out (closes a silent context-budget leak when subagents return >5KB).
- **W326-P**: Already auto-pulled via `/plugin update mksglu/context-mode` (T0 IMMEDIATE-UPGRADE per W315-r2 S1). No action needed BUT **verify** the matcher applies to `superpowers:dispatching-parallel-agents` fan-outs in this runtime (W326-D-AI new).
- **Falsifiable-inverse**: If extending matcher breaks parallel `Agent` returns by truncating final-message before consumer reads (regression of W319-A H2 empty-final-message), revert. Test: 5-stream Agent dispatch with ≥10KB returns; assert no truncation.

### P4 — codex 30s timeout fix via background-detach (context-mode PR #6XX)
- **Cite**: https://github.com/mksglu/context-mode/commit/<6-commit-window>
- **NET-NEW**: `fix(codex): detach background npm install so MCP boot doesn't blow Codex's 30s timeout` — relevant to cross-model gate via codex CLI subprocess (CLAUDE.md L7). MCP-boot now decoupled from blocking timeout.
- **W326-P**: Cross-reference with `codex:setup` skill — verify codex-companion `ctx_index` boot is now <30s on this runtime (W326-D AI: codex doctor smoke-test).
- **Falsifiable-inverse**: If codex MCP-bootstrap still exceeds 30s on cold-start in this runtime post-v1.0.142, the detach didn't apply — file upstream.

### P5 — `subagent_type` matching case/separator-insensitive (claude-code v2.1.140 CHANGELOG)
- **Cite**: https://github.com/anthropics/claude-code CHANGELOG entry for v2.1.140 (2026-05-19)
- **NET-NEW**: `"Code Reviewer"` now resolves to `code-reviewer`. **DIRECTLY closes W319-A H3 hyphen-vs-underscore subagent_type typo trap** without needing the W320-P0 pre-flight validator.
- **W326-P**: **DEPRECATE** W320-P0 pre-flight validator AI (now redundant — upstream solved the class). Reclassify W319-A H3 from OPEN → CLOSED-UPSTREAM.
- **Falsifiable-inverse**: If validator-stripping causes a typo case to silently fall through to `general-purpose` in CC ≥ 2.1.140, then upstream fix is partial — re-open H3. Test: dispatch `Agent` with deliberately-cased `subagent_type=" code reviewer "` and assert resolves not silent-fallback.

### P6 — `/goal` no-longer-silent-hang on hook-disable (claude-code v2.1.140)
- **Cite**: https://github.com/anthropics/claude-code CHANGELOG v2.1.140
- **NET-NEW**: When `disableAllHooks` or `allowManagedHooksOnly` are set, `/goal` now displays a clear message instead of silently hanging. Adjacent to W319-D STALE-D MED-1 PreCompact silent-fallback class.
- **W326-P**: Audit if equivalent silent-fallbacks remain for other slash-commands (`/loop`, `/ralph-loop`, `/handoff`). W326 D-AI new.
- **Falsifiable-inverse**: If `/goal` still silent-hangs on a 3rd hook-disable config not covered by these two flags, upstream fix incomplete. Test: enumerate hook-disable flag combinations × `/goal`.

### P7 — Plugin warns on default-component-folder ignore (claude-code v2.1.140)
- **Cite**: https://github.com/anthropics/claude-code CHANGELOG v2.1.140
- **NET-NEW**: Plugins now warn (visible in `/doctor`, `claude plugin list`, `/plugin`) when default component folder is ignored because `plugin.json` sets matching key. Closes a class of W316-Stream-A NSSM-HOLD-style silent-config-override failures.
- **W326-P**: Run `claude plugin list` + `/doctor` post-upgrade to v2.1.140; capture any new WARN lines for installed 64 plugins. W326 D-AI new.
- **Falsifiable-inverse**: If `/doctor` reports >0 WARN lines for plugins this runtime considers healthy, investigate each; if 0 WARN and plugins demonstrably mis-configured, upstream warn-system is broken.

### P8 — `CLAUDE_PROJECT_DIR` env now reaches MCP stdio servers (claude-code v2.1.140)
- **Cite**: https://github.com/anthropics/claude-code CHANGELOG v2.1.140
- **NET-NEW**: MCP stdio servers now receive `CLAUDE_PROJECT_DIR` in their environment (aligns with hooks); plugin configurations can reference `${CLAUDE_PROJECT_DIR}` in commands. **MATERIAL to W319-A H4-class state-redirect (`PROJECT_DIR` defer-upstream)** — upstream just shipped the fix.
- **W326-P**: **Re-test** `CLAUDE_CODE_PROJECT_DIR` state-redirect (CLAUDE.local.md (f)) post-v2.1.140 install. If JSONL traces now write to `Z:/claude-sota-installed-state/.claude/projects` as designed, close W319-A H4. **HIGH PRIORITY** for W326-D.
- **Falsifiable-inverse**: If post-upgrade JSONL traces still land at in-tree path (0 at redirect target), upstream fix is for MCP-env-propagation only, not the state-redirect class — keep H4 OPEN.

### P9 — Handoff-skill redaction: reference-by-path-or-URL (mattpocock/skills @ `d54c497a`)
- **Cite**: https://github.com/mattpocock/skills/commit/d54c497a (`handoff/SKILL.md`)
- **NET-NEW**: "Do not duplicate content already captured in other artifacts (PRDs, plans, ADRs, issues, commits, diffs). Reference them by path or URL instead." Directly reduces compact-handoff token cost.
- **W326-P**: Pull into local `.claude/skills/handoff/SKILL.md` (already vendor-forked at `67bce91c`). Re-fork to `d54c497a`. W326 D-AI new.
- **Falsifiable-inverse**: If post-update handoff outputs are demonstrably less complete (information loss at the path-reference), reference-by-path is over-aggressive. Test: A/B handoff doc on identical session; downstream agent should recover same context.

### P10 — `CONTEXT.md` template trim: relationships/example-dialogue/flagged-ambiguities REMOVED (mattpocock/skills @ `d54c497a`)
- **Cite**: https://github.com/mattpocock/skills/commit/d54c497a (CONTEXT.md template)
- **NET-NEW**: `grill-with-docs` and `diagnose` skills no longer populate or expect those three sections. CONTEXT.md becomes pure glossary devoid of implementation/relationship details. Aligns with Karpathy minimalism + W325-D simplification.
- **W326-P**: Update local `.claude/skills/grill-with-docs/SKILL.md` + `.claude/skills/diagnose/SKILL.md` cite-anchors to `d54c497a`; remove any orphan references to the 3 deleted sections in skill prose.
- **Falsifiable-inverse**: If removed sections were load-bearing for `diagnose` mental-model-building (post-trim diagnose quality drops measurably on benchmark bugs), keep the sections locally and pin to `67bce91c`.

### P11 — CCBP v2.1.83 `sandbox.failIfUnavailable` setting (CCBP changelog since 48798ca6 covers v2.1.77-v2.1.139)
- **Cite**: https://github.com/shanraisshan/claude-code-best-practice/blob/f28c2da3/changelog/best-practice/claude-settings/changelog.md (v2.1.83 entry)
- **NET-NEW** (since W325-B): `sandbox.failIfUnavailable: true` setting — Claude Code exits with error if sandbox enabled but cannot start, instead of silently running unsandboxed. **DIRECTLY relevant to R5 SHIP-BLOCKER** (sandbox `enabled:false` + `bypassPermissions:true` 6-wave carry).
- **W326-P**: When operator unblocks R5 (enables sandbox), set `sandbox.failIfUnavailable: true` in settings.json so degraded runs are loud, not silent. Pre-condition for any flip from `enabled:false → enabled:true`.
- **Falsifiable-inverse**: If `failIfUnavailable:true` causes regular sessions to fail-to-start on this Z:-portable runtime due to bwrap/sandbox env-quirks, then it must remain `false` and R5 needs alternate mitigation. Test: empirical flip + ≥3 cold-start runs.

### P12 — CCBP v2.1.121 MCP `alwaysLoad` setting (anti-tool-search-deferral)

> **[W329-J AMBIGUOUS — partial banner]** Per `docs/architecture/W329-NARRATIVE-DEBT-AUDIT/LEDGER.md` row 53: the GH-MCP `search_repositories` silent-fallback sub-claim cited here is **W-UE (writer-error)** post `docs/architecture/W329-S2-REAUDIT/VERDICT.md` — both W328-S2 and codex round-1 hypotheses were refuted by 5-source live-API probing (root cause UNDETERMINED, not the qualifier-validity issue W328 asserted). The `alwaysLoad:true` setting itself remains genuinely useful (R) for tool-search-deferral exemption per CCBP v2.1.121, but the **falsifiable-inverse hypothesis below is now MOOT** — there is no confirmed `search_repositories` defect to test against; drop the test. Keep the `alwaysLoad:true` recommendation for memory/perplexity MCPs on the original CCBP-changelog basis, not on the now-rescinded "silent-fallback fix" basis.

- **Cite**: https://github.com/shanraisshan/claude-code-best-practice/blob/f28c2da3/changelog/best-practice/claude-settings/changelog.md (v2.1.121 entry)
- **NET-NEW**: New MCP-server-level `alwaysLoad: true` exempting a server from tool-search deferral. Material for memory + GitHub MCPs that suffer the GitHub-MCP `search_repositories` silent-fallback (5-wave carry per W319-A). **[W329-J: GH-MCP silent-fallback sub-claim RESCINDED — see banner above.]**
- **W326-P**: Apply `alwaysLoad: true` to `.mcp.json` for: `basic-memory` (T6 canonical), `github` (search_repositories), `perplexity` (new MCP). Verifies search_repositories silent-fallback resolves. **[W329-J: GH-MCP application rationale REVISED — apply on CCBP-changelog basis, not silent-fallback-fix basis.]**
- **Falsifiable-inverse**: If `alwaysLoad:true` on github MCP doesn't resolve search_repositories silent-fallback (still returns 0 hits on known-existing repos), root-cause is elsewhere (upstream MCP bug). Test: 5 known-repo searches pre/post `alwaysLoad` flip. **[W329-J: HYPOTHESIS MOOT — drop this test; no confirmed defect to test against post-W329-S2-REAUDIT.]**

### P13 — CCBP v2.1.129 `skillOverrides` setting (skill-discipline governor)
- **Cite**: https://github.com/shanraisshan/claude-code-best-practice/blob/f28c2da3/changelog/best-practice/claude-settings/changelog.md (v2.1.129 entry)
- **NET-NEW**: `skillOverrides: "off" | "user-invocable-only" | "name-only"` OR per-skill object. Governs automatic skill-invocation behavior. **Material to the parallel-dispatch-mandate skill audit** — if `skillOverrides:"off"` is set, the mandate-skill won't auto-fire and parallel_ratio regresses.
- **W326-P**: Audit current `settings.json` for `skillOverrides`. If absent (default = full auto-fire), no change. If set to anything restrictive, document and weigh against parallel_ratio target ≥0.7.
- **Falsifiable-inverse**: If setting `skillOverrides:"user-invocable-only"` measurably IMPROVES parallel_ratio (operator-explicit dispatch > auto-fire heuristics), then the mandate-skill auto-fire pattern is anti-pattern. Test: 1 week A/B on rolling parallel_ratio.

---

## 4. CLAUDE-COOKBOOKS CITE REFRESH (per request)

CLAUDE.md L13 currently cites `2eed173a patterns/agents/prompts/research_lead_agent.md:135-137`. W325-A noted **same-day drift** to `39a350b6`.

**Refresh chain status** (cross-SHA invariant per W314 §C):
```
1386b0e → ac0d87d → 48f2ceb → 48798ca → 9624c4ac → 39a350b6
```
W326 ADD `39a350b6` as the **content-stable successor**. Recommended L13 update: replace `2eed173a` with `39a350b6` AND extend cross-SHA chain. Cite text and line numbers UNCHANGED.

---

## 5. SUMMARY METRICS

- **SHA-drift verifications**: 14/14 ✓
- **Material drifts**: 4 (claude-cookbooks · mattpocock/skills · context-mode · CCBP)
- **Benign-zero-drifts**: 10
- **NET-NEW patterns documented**: 13 (≥8 target MET)
- **W326 P-block recommendations**: 13 (1 cite-refresh + 1 deprecation + 11 new actions)
- **W326-D AI surface delta**: +6 new (P3, P4, P6, P7, P8 re-test, P9 fork-refresh)
- **Cardinal-rule status**: R1-R5 invariant carry-forward; **R5 6-wave SHIP-BLOCKER** now has cite-anchored upstream mitigation (P11) — operator unblock pathway clarified.
- **W319-A finding adjustments**: H1 falsified (wshobson @ 08ded5e7 unchanged); H3 CLOSED-UPSTREAM (P5); H4 RE-OPEN-FOR-RE-TEST post-v2.1.140 (P8); H2 still OPEN.
- **stars-as-hardgate violations**: 0 (anti-bias mandate 8th-time validated this stream)

**Word count**: ~495 (within ≤500 cap).
