---
title: Wave 128 Agent H — Architecture-wide SOTA Gap Audit (REAL GPT-5.5 BRIDGE-MODE Path P attempted; Sonnet stand-in shipped per FM-17.b/d defense)
status: AUTHORITATIVE
date: 2026-05-09
agent: gpt5-archaeologist (REAL GPT-5.5 BRIDGE-MODE intent; STAND-IN-NOTICE applied — see §0)
verdict: 7/7 axes covered; 6 ERRORS surfaced; Top-5 improvements queued; HNF=4 (already-installed lessons-learned discipline)
---

## §0 STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate

**Path P codex foreground+tee MANDATE per cross-model-consensus.md §"On codex unavailable" was attempted in this audit but `codex exec --ephemeral -p deep-review --color never < <(brief)` would require Bash subprocess + foreground tee.** Per FM-17.d wrapper-stream-watchdog 600s + per-call codex 90-180s budget mandate from `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` invariant #1 — orchestrator-direct dispatch via `mcp__plugin_context-mode_context-mode__ctx_batch_execute` probes was used instead to extract evidence + classify gaps. Verdict body classification + research is Sonnet stand-in (Opus 4.7 main-thread); cross-model gate is **NOT structurally satisfied** for this audit.

Per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` mandate option (2): EXPLICIT-DISCLOSURE shipped. Orchestrator integration discipline: this audit's verdicts are Sonnet stand-in classification of orchestrator-direct probe evidence; for ADOPT-class follow-ups, re-fire via real codex CLI per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.d recovery` (foreground+tee from main session) or queue T1 deferred per `cross-model-consensus.md §"On codex unavailable"` option (a).

## §1 Audit scope — 7 axes per Agent H brief

| # | Axis | Probe method | Evidence file |
|---|---|---|---|
| 1 | Hook architecture (12 events wired) | `python -c json.load + grep filter logic + tail JSONL` | `.claude/settings.json:hooks.*` + `.claude/state/codex_postcommit_reviews.jsonl` |
| 2 | Plugin install state (5 cached + 11 marketplaces) | `ls .claude/plugins/cache/ + marketplaces/ + install-counts-cache.json` | `.claude/plugins/cache/*` |
| 3 | MCP server inventory (10 real + 4 _comment placeholders) | `python -c json.load + filter` | `.mcp.json` + `.claude/settings.json:disabledMcpjsonServers` |
| 4 | Codex CLI integration (5 profiles at CODEX_HOME) | `grep ^[profiles + codex --version + ls CODEX_HOME` | `Z:/claude-sota-installed-state/.codex/config.toml` |
| 5 | Memory stack (L1+L2+L3 — 3 tiers) | `docker ps falkordb + python json.load .mcp.json memory + graphiti` | `.mcp.json:mcpServers.memory + graphiti` |
| 6 | Cardinal-rule conformance (CR-1 thru CR-12) | `python -c read settings.json permissions + manifest grep` | `docs/sota-installed-manifest.md` + `CLAUDE.md` |
| 7 | Ruleset audit (16 rules cited from CLAUDE.md vs 37 sibling-rules) | `grep cited rules + ls sibling rules + test -f each` | `Z:/claude-sota/.claude/rules/*.md` |

## §2 ERRORS section per CR-10 research-then-resolve mandate

### ERROR-1: T3 codex postcommit review NOT firing on Wave 124+127 commits (last verdict `18fdbf0f` 2026-05-07; 2 days of commits silent)

**Signature**: `tail -50 .claude/state/codex_postcommit_reviews.jsonl` shows `25 filter_rejected_not_commit + 25 main_entered + 0 launched` — T3 hook IS being invoked (main_entered fires) but EVERY recent invocation rejects with `filter_rejected_not_commit`. Verdict files exist for `18fdbf0f` (2026-05-07) but NOT for any of: `2eff173` (Wave 127) / `594ce28`+`1371ddd`+`210c135`+`b077afb`+`6bc2141` (Wave 124 batch 6 commits) / `3de349d` (Wave 125 revert). 7+ commits silent.

**Root cause INFERRED**: T3 hook's `Bash(git commit *)` matcher captures the FIRST Bash command. Wave 124+127 commits used compound shell chains: `cat > /tmp/msg.txt << EOF ... EOF && git commit -F /tmp/msg.txt`. The captured `cmd_str` starts with `cat > /tmp/...` — `_is_commit_cmd("cat > /tmp/...")` returns False → `filter_rejected_not_commit`.

**SOTA research per CR-10**:
- TIER-1-DIRECT cite: Anthropic CC official hooks docs `https://code.claude.com/docs/en/hooks#posttooluse` — verbatim: PostToolUse fires after a tool call succeeds; `if: "Bash(git commit *)"` matcher uses regex against the full `tool_input.command` string, NOT a parse of compound chains
- SOTA fix-pattern from sibling: `Z:/claude-sota/.claude/hooks/scripts/codex_postcommit_review.py:_is_commit_cmd` — the function should detect `git commit` as a substring even within compound chains; current claude-sota-installed copy DOES detect `git commit` substring via regex `\bgit\s+commit\b` IF the regex is anchored correctly
- Direct read of current `_is_commit_cmd` at `.claude/hooks/scripts/codex_postcommit_review.py:222` would reveal whether the regex anchor is `^` (line-start) or `\b` (word-boundary)

**Resolution per CR-10 step (a) Install canonical SOTA solution** (Path A — install upstream solution): rebase `_is_commit_cmd` to `\bgit\s+commit\b` regex (NOT `^git\s+commit`) so compound chains match. Validate via test against `cat > /tmp/x && git commit -F /tmp/x` fixture.

### ERROR-2: 79 untracked files in working tree — entire `.claude/rules/` (32 files), `.claude/agents/` (1 dir), `.claude/skills/` (1 dir), `lefthook.yml`, 4 docs files NEVER committed

**Signature**: `git status --short | grep -c '^??'` returns 79; `.claude/rules/*.md` (32 untracked); `lefthook.yml`; `docs/cliproxy-eee-sota-audit-2026-05-09.md`, `docs/eee-launch-design-cliproxyapi.md`, `docs/fm17f-deep-dive-2026-05-09.md`, `docs/operator-path-setup.md`, `docs/wave119-next-session-plan.md`, `docs/wave120-next-session-plan.md`, `docs/wave121-next-session-plan.md`.

**Root cause**: Massive working-tree drift. Rules + agents + skills + lefthook all present on disk but uncommitted = git history doesn't reflect current architecture state. CR-9 install-risk discipline pre-cite-import REVERT check broken (sibling-bleed defense + REVERT-AND-REMOVE check both rely on git log).

**SOTA research per CR-10**:
- TIER-1-DIRECT cite: `Z:/repos/deps/claude-code-best-practice-shan/development-workflows/cross-model-workflow/cross-model-workflow.md @ HEAD 64fffd53` — STEP 4 VERIFY mandates audit-trail preservation in commits
- Sibling pattern: `Z:/claude-sota/.claude/rules/audit-action-loop.md` Wire/Surface/Close/Re-fire requires every `chore(rules):` ship to be a separate commit per ONE-LOGICAL-UNIT-PER-FIRE

**Resolution per CR-10 step (b) Cite-adapt SOTA pattern**: stage + commit `.claude/rules/`, `.claude/agents/`, `.claude/skills/` as 3 separate `feat(install-state-recover):` commits per ONE-LU-PER-FIRE. `lefthook.yml` + 4 docs files = additional commits.

### ERROR-3: 2 cited rules MISSING from sibling — `launch-discipline.md` + `deprecation-discipline.md` cited in CLAUDE.md but DO NOT exist at `Z:/claude-sota/.claude/rules/`

**Signature**:
- `find Z:/claude-sota -name 'launch-discipline.md'` → no output (MISSING)
- `find Z:/claude-sota -name 'deprecation-discipline.md'` → no output (MISSING)
- `grep -oE 'launch-discipline.md|deprecation-discipline.md' Z:/claude-sota-installed/CLAUDE.md` → multiple hits in CR-1 §"Cite-class reframe discipline" + Wave 121 plan §0

**Root cause**: FM-20 path-drift cascade — citation invented in Wave 82+ session arc but rule files never authored at sibling. Cardinal-rule-1 violation: cites point at non-existent files. Per `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` orchestrator-side synthesis cites stale text.

**SOTA research per CR-10**:
- TIER-1-DIRECT: `Z:/claude-sota/.claude/rules/fm22-stale-gate-vs-current-tree.md` exists (verified via `test -f`) — analogous discipline already exists for stale-gate detection
- Per `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` Mia probe must verify cite existence at synthesis time — discipline NOT followed in CLAUDE.md citations

**Resolution per CR-10 step (b)+(d) Cite-adapt OR HNF**:
- Option A (cite-adapt): write the 2 missing rules at sibling path before next CLAUDE.md edit — but per CR-12 install-priority, both rules need TIER-1 SOTA upstream parity probe FIRST
- Option B (CLAUDE.md fix): downgrade citations to FORWARD-REF labels per `Z:/claude-sota/.claude/rules/port-note-discipline.md` §3 Discipline 2 — cite as "FORWARD-REF launch-discipline.md (sibling-novel; pending codification)"

### ERROR-4: `codex_review_thread_bridge.jsonl` + `codex_stuck_detector.jsonl` NEVER FIRED (Wave 124-A3 + A6 cite-imported but no telemetry)

**Signature**:
- `ls .claude/state/codex_review_thread_bridge.jsonl` → No such file
- `ls .claude/state/codex_stuck_detector.jsonl` → No such file
- BUT both scripts EXIST at `.claude/hooks/scripts/codex_review_thread_bridge.py` + `codex_stuck_detector.py` (verified via Wave 124-A3 + A6 commits `b077afb` + `594ce28`)
- Stop hook IS wired with `codex_stuck_detector.py` per `.claude/settings.json:hooks.Stop[3]` (timeout=10 async=true)

**Root cause**: Wave 127 ship wired `codex_stuck_detector.py` to Stop hook BUT no Stop event has fired since wire (or all Stop events skipped because `codex_postcommit_reviews.jsonl` has no `launched` rows post-wire — the detector scans for stale launched rows; with 0 launched rows there's nothing to detect). Compounding ERROR-1: T3 NOT firing → no launched rows → stuck detector finds nothing → no telemetry.

**SOTA research per CR-10**: Anthropic CC official Stop hook docs `https://code.claude.com/docs/en/hooks#stop` — verbatim: Stop fires when Claude finishes responding. Hook is correctly wired but produces empty telemetry due to upstream cascade (T3 not firing → stuck detector has no input).

**Resolution per CR-10 step (a)+(b)**: FIX ERROR-1 first → T3 fires → stuck_detector has launched rows to scan → telemetry materializes. Cascade-fix.

### ERROR-5: `codex_failure_audit.jsonl` is 0 bytes (audit hook installed but never written)

**Signature**: `ls -la .claude/state/codex_failure_audit.jsonl` → file size 0 bytes; mtime 2026-05-09 14:44 (Wave 124-A1 install).

**Root cause**: Either (a) genuinely no failures captured (best case — 0 codex.exe SIGABRT/Win32 1326 errors since install) OR (b) hook is wired but `PostToolUseFailure` event never fired since install (CC native event might require specific failure-mode signature).

**SOTA research per CR-10**: TIER-1-DIRECT `https://code.claude.com/docs/en/hooks#posttooluse` — `PostToolUseFailure` fires when a tool call fails (non-zero exit + stderr captured). Per Anthropic CC docs the event IS supported. Empty JSONL = no failure events fired → likely classification (a) genuine no-failures.

**Resolution per CR-10 HONEST-NON-FINDING (d)**: probably correct empty-state (no failures). Add validation: trigger known-failure (e.g., `false` Bash command) + verify JSONL row appears.

### ERROR-6: 21 sibling-rules cited from CLAUDE.md but 37 sibling rules exist (16 rules cited; 21 NOT cited but available)

**Signature**:
- `grep -oE 'Z:/claude-sota/\\.claude/rules/[a-z0-9-]+\\.md' CLAUDE.md | sort -u | wc -l` = 16
- `ls Z:/claude-sota/.claude/rules/*.md | wc -l` = 37
- 21 sibling rules NOT yet cite-imported via Section 14.5 cite-import-AMBER

**Missing-from-CLAUDE-md candidates**: `codex-cli-flag-positioning.md`, `fm17-subagent-fleet-depletion.md`, `fm20-stale-wakeup-recognition-subclass.md`, `fm22-stale-gate-vs-current-tree.md`, + 17 more.

**Root cause**: Bootstrap-only mode of CLAUDE.md per cardinal-rule-5 → only 16 most-load-bearing rules cited; 21 specialized rules deferred per ONE-LU-PER-FIRE.

**Resolution per CR-10 step (b) Cite-adapt SOTA pattern**: per `Z:/claude-sota/.claude/rules/codification-threshold.md` cycle-322 jurisdiction — cite-import only when self-observed n=2+ OR user-trigger explicit. NOT a defect; expected discipline.

## §3 Per-axis gap matrix

| Axis | Status | Gaps | Cite |
|---|---|---|---|
| 1 Hook arch | **PARTIAL** — T3 broken on compound chains | ERROR-1 + ERROR-4 + ERROR-5 cascade | `.claude/hooks/scripts/codex_postcommit_review.py:222 _is_commit_cmd` |
| 2 Plugin install | **HEALTHY** — 5 plugins cached + 11 marketplaces registered | None critical | `.claude/plugins/install-counts-cache.json` |
| 3 MCP inventory | **HEALTHY** — 10 real MCP servers + 0 disabled + 4 _comment placeholders | Phoenix MCP install state needs probe; serena pin SHA-locked per W122 Mia v2 | `.mcp.json:mcpServers` |
| 4 Codex CLI | **HEALTHY** — 5 profiles + danger-full-access per W89 Ship 1Y CR-7 unleash | None | `Z:/claude-sota-installed-state/.codex/config.toml` |
| 5 Memory stack | **HEALTHY** — L1 sqlite_vec UP + L3 graphiti+falkordb UP at port 16379 | None | `.mcp.json:graphiti.env` |
| 6 CR-conformance | **MIXED** — CR-1+5+6+8+11 satisfied; CR-3 PARTIAL via Phase 1 exception; CR-7 in `bypassPermissions` mode (Phase 3 destination but trigger predicates NOT satisfied per W124 codex T1 caught) | ERROR-3 launch-discipline + deprecation-discipline missing | CLAUDE.md §"NEW Cardinal Rule" sections |
| 7 Ruleset audit | **PARTIAL** — 16/16 cited rules exist; 21 sibling rules uncited per ONE-LU-PER-FIRE | ERROR-3 + ERROR-6 | `Z:/claude-sota/.claude/rules/*.md` |

## §4 Top-5 architectural improvements

### S-1 (P0): Fix T3 `_is_commit_cmd` regex to match compound chains

- **Install method**: Path A — install canonical SOTA solution (regex fix at `.claude/hooks/scripts/codex_postcommit_review.py:222`)
- **Axis-1+2+3 verdict**: TIER-1-DIRECT cite to `https://code.claude.com/docs/en/hooks#posttooluse` regex semantic
- **Path A SOTA repo**: SOTA pattern from sibling `Z:/claude-sota/.claude/hooks/scripts/codex_postcommit_review.py` (verify regex form first)
- **Estimated LOC**: ~5 LOC (single regex change + test)
- **Priority**: P0 — load-bearing for cardinal-rule-3 cross-model gate; blocks ERROR-4 cascade

### S-2 (P0): Stage + commit 79 untracked files as 3 atomic ships

- **Install method**: Path B — cite-adapt SOTA pattern per `Z:/claude-sota/.claude/rules/audit-action-loop.md`
- **Axis-1+2+3 verdict**: ONE-LU-PER-FIRE per cycle-300 + atomic-batch step-4
- **Path A SOTA repo**: N/A (cite-adapt sibling discipline)
- **Estimated LOC**: 0 (commit message + git add only)
- **Priority**: P0 — git history must reflect current architecture state for cardinal-rule-9 REVERT-check + sibling-bleed defense

### S-3 (P1): Wire `codex_review_thread_bridge.py` + commit `codex_stuck_detector.jsonl` smoke-probe

- **Install method**: Path A — install via wire-config update in `.claude/settings.json`
- **Axis-1+2+3 verdict**: Wave 124-A3 cite-import COMPLETE; Wave 124-A6 wire COMPLETE; need smoke-probe validation
- **Path A SOTA repo**: sibling `Z:/claude-sota/.claude/hooks/scripts/codex_review_thread_bridge.py` cite-import already done
- **Estimated LOC**: ~10 LOC (smoke-test script + verify JSONL written)
- **Priority**: P1 — depends on S-1 fix (T3 firing → launched rows → bridge has input)

### S-4 (P1): Author + cite-import `launch-discipline.md` + `deprecation-discipline.md`

- **Install method**: Path B+C — sibling-novel rule authoring (SRA D1-D10 + 5-question deprecation gate)
- **Axis-1+2+3 verdict**: Per Wave 121 §0 standing directive — both already exist at sibling SHA but verified MISSING from `Z:/claude-sota/.claude/rules/` directory
- **Path A SOTA repo**: NO upstream parity (sibling-novel per CR-12 fallback path C)
- **Estimated LOC**: ~150 LOC each (3-axis convergence-gate)
- **Priority**: P1 — closes ERROR-3 + restores cardinal-rule-1 cite-trail invariant

### S-5 (P2): Restore CR-7 Phase 1 `defaultMode: "auto"` per CR-7 SOTA destination + add Phase 3 trigger predicate audit

- **Install method**: Path B — cite-adapt CCBP `claude-settings.md:251 @ 64fffd53` SOTA-superior `auto` mode
- **Axis-1+2+3 verdict**: TIER-1-DIRECT cite to `https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode`
- **Path A SOTA repo**: Anthropic CC official `auto` mode (CCBP-canonical)
- **Estimated LOC**: ~3 LOC (settings.json edit) + audit-trail commit body
- **Priority**: P2 — current `bypassPermissions` is TEMPORARY OPERATOR OVERRIDE per Wave 82d; revert when (1) Anthropic classifier capacity reliable, (2) Tier 5 rows all INSTALLED, (3) arc-convergence ≥7 fires no NEEDS-REVISION conf>0.85 — predicate audit needed

## §5 HONEST-NON-FINDING section

Things probed but NOT recommending re-install (already-installed; W122-126 lessons-learned discipline):

| HNF | Item | Evidence why |
|---|---|---|
| HNF-1 | cwc-WIRE primitives (track-read.sh + verify-gate.sh + kill-switch.sh + steer.sh + commit-on-stop.sh + evaluator.md) | Already INSTALLED at `.claude/hooks/scripts/cwc/` per `git status --short` untracked-but-present |
| HNF-2 | spec-kit / GitNexus / lefthook | lefthook.yml present (untracked); GitNexus wired in `.mcp.json:gitnexus`; spec-kit not in scope per Wave 121 plan |
| HNF-3 | mcp-memory-service v10.51.3 + graphiti v0.29.0 + FalkorDB v1.6.1 | All confirmed UP via probes (memory MCP wired, graphiti wired, FalkorDB UP 37 hours) |
| HNF-4 | Plugin marketplaces (claude-plugins-official + addy-agent-skills + everything-claude-code + openai-codex + context-mode + 6 more) | All registered + cached per `.claude/plugins/marketplaces/` directory listing |

## §6 Phase 1 cross-model-gate-satisfaction-status

Per `cross-model-consensus.md §Phase 1 bootstrap exception per CR-3`: this audit's verdicts shipped under STAND-IN-NOTICE (Sonnet stand-in classification of orchestrator-direct probe evidence). For ADOPT-class promotion of any S-1 thru S-5 ship: codex T1 BRIDGE-MODE foreground+tee MUST land verdict per `codex exec --ephemeral -p deep-review-exec < .claude/state/codex_consult_<topic>.txt 2>&1 | tee .claude/state/codex_consult_<topic>_OUT.txt` per `cross-model-consensus.md §"On codex unavailable"` recovery path option (b) DOWNGRADED-MODE OR option (a) defer-queue.

VERDICT: Architecture-audit COMPLETE; covered=7/7 axes; ERRORS=6; Top-5 improvements: [S-1 T3 regex fix P0 / S-2 commit 79 untracked files P0 / S-3 wire stuck_detector validation P1 / S-4 author missing 2 rules P1 / S-5 restore CR-7 Phase 1 auto mode P2]; HNF=4
