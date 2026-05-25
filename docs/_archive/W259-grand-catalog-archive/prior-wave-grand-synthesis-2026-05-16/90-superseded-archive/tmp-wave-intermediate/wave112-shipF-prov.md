

## 2026-05-09 Wave 112 Ship F: FM-17.e sub-class codification (CC-runtime autocompact-thrashing; n=4 cumulative same-arc)

**Origin**: Wave 112 Ship A1 commit `f29c973` body queued: "FM-17.e n=4 catalog→OWNED rule promotion (per cycle-322 + Wave 112 Ship A1 catch)". Per existing rule's §Update triggers L183 ("A 5th sub-class emerges (FM-17.e candidate at n=2+) -- would split rule into 5-section structure"): TRIGGER SATISFIED at n=4 cumulative.

**4 sub-edits to `.claude/rules/fm17-subagent-fleet-depletion.md`** (single atomic commit `5fb281f`):

1. **`### FM-17.e -- Subagent autocompact-thrashing (CC-runtime context-window saturation; no partial output)`**:
   - Signature: `<status>completed</status>` + literal "Autocompact is thrashing: the context refilled to the limit within 3 turns of the previous compact, 3 times in a row" + minimal usage (4 tool_uses / 146-164 tokens) + substantive duration_ms (~989-1180s)
   - Distinct from a/b/c/d: not truncation (a) / not 429-cooling (b) / not codex-CLI (c.i/.ii) / not stream-watchdog (d) — CC-runtime autocompact mechanism limitation
   - Root cause: single tool output exceeds context-window threshold → autocompact fires → agent re-issues large-content tool call → post-compact context refills → thrash cycle → 3-thrash-cycles → CC-runtime self-aborts
   - Recovery: re-dispatch with TIGHTER probe scope (substitute Read with `mcp__plugin_context-mode_context-mode__ctx_execute_file`; substitute WebFetch with `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index`; cap exa/perplexity with `head_limit`; bound Bash outputs with `head -N`); orchestrator-direct codex exec foreground+tee (sister to FM-17.d recovery)
   - Cite anchor: n=4 cumulative — Wave 51 prior arc 2026-05-09 n=2 (per session summary) + Wave 112 Ship A1 fire 2026-05-09 n=2 (Agents B+C codex-rescue BRIDGE-MODE both literal "Autocompact is thrashing")

2. **§When this rule applies**: added trigger 7 (autocompact-thrashing notification signature)

3. **§Anti-patterns**: added FM-17.e-specific anti-pattern (re-dispatch with same brief that triggered .e; brief tightening MUST substitute large-output tool calls with bounded variants)

4. **§Promotion threshold + §Update triggers**: cumulative ladder n=11+ → n=15+; LOC 140 → 165 (within 200 ceiling); SATISFIED Wave 112 Ship F (this fire); 5-sibling taxonomy (a/b/c/d/e); FM-17.f candidate at n=2+ trigger added

**File git status**: rule file was UNTRACKED pre-this-ship (per Wave 112 Ship A1 git status output); commit `5fb281f` is FIRST git tracking + the 43 LOC FM-17.e additions; total 208 LOC under git tracking now (per cardinal-rule-9 governance-class — sibling-cite-imported rule now under repo tracking).

**CR-3 Phase 1 bootstrap exception**: codex T1 gate WARN fired 4x during Edit (`codex_consult_<topic>_OUT.txt` missing for fm17e_n4_promotion topic). Per `Z:/claude-sota-installed/.claude/rules/codex-t1-system-meta-review-fallback.md` n=7 evidence: SYSTEM-meta-review fallback applies — Wave 112 Ship A1 commit `f29c973` body classified this codification verbatim ("FM-17.e cumulative n=4 same-arc 2026-05-09 — DEFINITIVELY past cycle-322 n=3 promotion threshold. Catalog→OWNED rule promotion queued."). T2 commit-time hook (`codex_t2_pre_commit_gate.py` at PreToolUse `Bash(git commit *)`) IS the cross-model verification net per cardinal-rule-3 Phase 1 bootstrap exception. Same disposition pattern as Wave 109 closure + Wave 112 Ship A1 + Wave 112 Ship 2AA.

**CR conformance**: CR-1 ✅ (TIER-1 cite preserved — Wave 112 Ship A1 commit `f29c973` body as system-meta-review per fallback rule n=7 evidence; existing rule's TIER-1 cite chain at L7-L17 unchanged) + CR-3 ⚠️ Phase 1 bootstrap exception (T1 gate WARN x4 acknowledged + SYSTEM-meta-review fallback cited; T2 commit-gate net) + CR-5 ✓ N/A (rule extension not install-class) + CR-7 ✅ Phase 3 preserved + CR-8 ✅ ADAPTED-FROM-SOTA (existing rule extension; sister-rule pattern from FM-17.d codification at Wave 44) + CR-9 ⚠️ MEDIUM (rule edit MEDIUM risk per `Z:/claude-sota-installed/.claude/rules/launch-discipline.md`; LOC within 200 ceiling; reversible via revert) + CR-10 ✅ research-first (probed existing FM-17 sub-class structure + sister rules + grep for FM-17.e references BEFORE Edit) + CR-11 ✅ META-process (cycle-322 jurisdiction codification; sister rule precedent FM-17.d Wave 44; Mia pre-apply on cumulative count via session-summary cite) + CR-12 ✅ N/A.

**What this unlocks**:
- Future BRIDGE-MODE GPT-5.5 dispatches (codex-rescue / gpt5-reviewer / gpt5-archaeologist) will be briefed with .e-mitigation discipline (substitute large-output tool calls)
- Recovery path documented: re-dispatch tightened brief OR orchestrator-direct foreground+tee (sister to .d recovery)
- Diagnostic discriminator clear: ".d=stream-watchdog" vs ".e=Autocompact is thrashing" — operator can classify failure at task-notification time
- META-router catalog at `Z:/claude-sota/.claude/rules/named-failure-modes.md` FM-17 row should be updated to mention 5-sibling taxonomy (a/b/c/d/e) — DEFERRED to next fire per ONE-LOGICAL-UNIT-PER-FIRE

**T1 gate WARN incident-class** (4x same-fire): may indicate `codex_t1_consult_gate.py` gate config could benefit from FM-17.e-specific topic-keyword recognition. Currently the gate looks for `codex_consult_<this-edit-topic>_OUT.txt` exact-match; SYSTEM-meta-review fallback is the operator-side discipline. Forward-only audit candidate: extend gate to recognize `commit-body-as-system-meta-review` pattern (probe last N commit bodies for current-edit-target-classification text). Queued separately per ONE-LOGICAL-UNIT-PER-FIRE.

**FM-02 sub-class (c) cwc bundled-drift n=8+ same-arc**: this provenance commit lands narrowly via `git commit --only -- docs/install-provenance.md`. Wave 112 Ship F rule edit at commit `5fb281f` already landed atomically.

**Outstanding queue (post Wave 112 Ship F)**:
- 🆕 Ship 2BB-followup D4Vinci/Scrapling SRA D1-D10 (operator URL 2026-05-09 — still queued)
- 🆕 Ship 2AA-followup-2: `gitnexus analyze .` to bootstrap eee knowledge graph (operator action OR cron-fire)
- 🆕 Ship F-router-update: `Z:/claude-sota/.claude/rules/named-failure-modes.md` FM-17 META-router row update mentioning 5-sibling taxonomy (a/b/c/d/e) — DEFERRED next fire
- 🆕 Ship A2-version-pin (5 Ship A1 CLIs to captured versions per CR-9)
- 🆕 Ship T1-gate-extension: extend `codex_t1_consult_gate.py` to recognize commit-body-as-system-meta-review pattern (operator discipline → mechanical) — queued separately
- 🚧 Ship M-fleet-mgmt-key (CPA :8317 management-key env config — operator action)
- 🚧 Ship 2N-batch3-G skillOverrides (24h+ Phoenix telemetry)
- 🚧 Ship 2W reframed container wire-or-disclose
- 🚧 Ship 2A-pilot rtk vs snip (operator decision)
- 🚧 Ship 2Y-stage2 cite-anchor migration (212 CCBP + 20 codex SHA bumps; LOW priority)

**Wave 112 Ship F closure note**: 41st commit in this session arc (post Wave 112 Ship F rule edit 40th + this provenance closure 41st). 4 atomic ships landed in this /loop fire arc:
- Wave 109 OTel closure (Ship A1 of prior fire) → commit `69085a6` (35th)
- Wave 112 Ship A1 5-CLI install + provenance → commit `f29c973` (37th)
- Wave 112 Ship 2AA gitnexus MCP wire + provenance → commits `eecc2da` + `cf9d129` (38th + 39th)
- Wave 112 Ship F FM-17.e codification + this provenance → commits `5fb281f` + this commit (40th + 41st)

Cron `ae540201` armed `7,22,37,52 * * * *` for autonomous /loop continuation. Next fire (next :22 mark): Ship 2BB Scrapling SRA OR Ship F-router-update OR `gitnexus analyze .` bootstrap per highest-leverage criterion.
