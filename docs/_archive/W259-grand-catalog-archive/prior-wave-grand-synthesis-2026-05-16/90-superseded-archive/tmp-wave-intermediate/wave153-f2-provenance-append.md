

---

## 2026-05-11 Wave 153 fire 2 — CCBP architecture comparison audit (V2+V3 ADVERSARIAL SAVED-SHIP convergence; FM-09 15/15 → 16/16 firm)

**Trigger**: user directive 2026-05-11 PM "https://github.com/shanraisshan/claude-code-best-practice deep dive line by line and compare your architecture with it and make sure our entire system is optimize with sota practice" post-W153 F1 `5495bbd`.

**Cross-model gate CR-3 FULLY SATISFIED**: REAL GPT-5.5 codex CLI v0.130.0 BRIDGE-MODE Path P 6-param strict-conform V2+V3. **3rd non-Phase-1-bootstrap satisfaction** in W152+W153 arc (W152 F29 1st, W153 F1 2nd, W153 F2 3rd).

**V1 (orchestrator Opus 4.7) baseline**: Top-N ranking with `CLAUDE_CODE_SESSION_ID` #1. Mia n=325 → n=326 pre-V2 (skillOverrides REJECT-FOR-FIT per CLAUDE.md L270-272 4-skill meta-stack auto-fire dependency).

**V2 codex T1 Path P REAL GPT-5.5** (`.claude/state/codex_consult_w153_f2_ccbp_audit_v2_OUT.txt`): REVISE-RANKING conf=0.81 / 155,894 tokens / ~5-6min wall-clock. 5 ranking amendments + 3 missed-gap claims + CR-12 class CITE-ONLY (later refuted by V3 as not-a-valid-lattice-class per W152 F29 formal codification).

**V3 codex T1 Path P REAL GPT-5.5 ADVERSARIAL** (`.claude/state/codex_consult_w153_f2_ccbp_audit_v3_adversarial_OUT.txt`): **SAVED-SHIP conf=0.90; FM-09 15/15 → 16/16 firm**. Single most-likely-V1+V2-MISS: ".claude/plugins has 2025 SKILL.md with descriptions totaling ~475K chars vs CCBP default 15K char budget — auto-skill discovery may be SILENTLY TRUNCATED OR DISTORTED."

**Orchestrator-side empirical verification of V3 SAVED-SHIP catch (ALL CONFIRMED)**:
- `find .claude/plugins -name 'SKILL.md' | wc -l` → **2,035** (V3: 2,025; 99.5% accurate)
- precise description char sum via `awk` frontmatter scan → **509,238 chars** (V3: ~475K; **33.9× CCBP 15K budget**)
- `grep alwaysLoad .mcp.json .claude/settings.json` → **0 matches** (V3 confirmed; on-policy by default)
- HEAD `076202d` (V3 caught drift from V1's `5495bbd` baseline; parallel session-checkpoint commit)

**V3 revised Forward Top-N (vs V1+V2)**:
- 🥇 Skill topology + context-budget audit (PROMOTED from V2-missed-gap to #1 per empirical 33.9× over-budget)
- 🥈 CLAUDE_CODE_SESSION_ID (demoted from V1 #1)
- 🥉 CCBP cite-anchor refresh (demoted from V1 #2; bundle with #1 audit when each rule touched anyway)
- #4 changelog META-process (demoted from V2 #1 → V3 #4; OPERATOR-DECISION-GATED multi-fire arc per F30 diminishing-returns warning)
- #5 mcp.md broader cite-import
- #6 worktree.baseRef
- #7 autoMode.hard_deny (CR-7 Phase 3 gated)
- #8 claude-power-ups.md (demoted from V1 #3 — user-education, not architecture)
- #9 boris-tips cite-import
- #10 implementation/<topic> cite-import

**V3-REJECTED gaps**:
- ❌ MCP alwaysLoad audit (V2 missed-gap REFUTED — empirically 0 entries; on-policy by default)
- ❌ Agent/command/skill boundary audit (V2 missed-gap REFUTED — DUPLICATE of `team-orchestration.md §"Layered architecture (shan canonical)"` already citing CCBP `reports/claude-agent-command-skill.md`)

**CR-12 disposition** (V3-corrected): **PARTIAL-OVERLAP** with **CITE-PATTERN-ONLY** action; effective_tier=TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8. V1's GENUINELY-NEW + V2's CITE-ONLY both incorrect (CITE-ONLY is NOT a valid 6-class lattice class per W152 F29 codification).

**Cardinal-rule conformance**: CR-1 ✅ TIER-1-DIRECT @ CCBP HEAD 4527f4d4 + 64fffd53 / CR-3 ✅ FULLY SATISFIED (V2+V3 REAL GPT-5.5) / CR-5+6 N/A (audit only) / CR-7 ✅ Phase 1 ACTIVE / CR-8 ✅ TIER-3-LOCAL-COMPOSITION disclosed / CR-9 ✅ no install-class action / CR-10 ✅ research-first / CR-11 ✅ META-process discipline applied / CR-12 ✅ PARTIAL-OVERLAP per V3 correction

**Ladders advanced**:
- USER-CORRECTION-ACK: n=23 unchanged (autonomous fire driven by fresh user directive)
- Mia pre-apply: n=325 → **n=326** (skillOverrides REJECT-FOR-FIT catch pre-V2)
- **FM-09 codex-rescue blind-spot specialization: 15/15 → 16/16 firm** (V3 ADVERSARIAL caught V1+V2 missed skill-budget 33.9× over-budget empirical)
- Path P 6-param strict-conform: n=30 → **n=32** (V2 + V3 dispatches)
- Pattern D Forward Discipline #2 single-claim: n=30 → **n=32**
- CR-12 6-class lattice PARTIAL-OVERLAP: 1st cumulative invocation (NEW class exercised)
- **CR-3 non-Phase-1-bootstrap satisfaction: 2nd → 3rd cumulative** (W152 F29 1st, W153 F1 2nd, W153 F2 3rd)
- FM-02 (c) commit-message-drift: pending W153 F2 atomic commit per parallel session-checkpoint absorption pattern
- Inline-bash quote-trap discipline: n=18 unchanged (no inline-bash quote-trap surfaced this fire)
- Recursive promotion-fire dogfood: n=7 unchanged
- W134 F27-A precedent ratifications: 4 unchanged

**Files committed**:
- `docs/wave153-f2-ccbp-architecture-comparison-2026-05-11.md` (NEW; ~340 LOC after V2+V3 integration)
- `docs/install-provenance.md` (this entry append)

**Risk class**: LOW per `Z:/claude-sota/.claude/rules/launch-discipline.md` D1 (audit doc; reversible / observable / no install / no security impact / no OS state mutation).

**Revert path**: `git revert <this-SHA>` <30s; rm audit doc; provenance reverts to pre-W153-F2 state.

**Forward Top-N (post-W153 F2; V3-revised ship order)**:
- Wave 153 Fire 3: 🥇 **Skill topology + context-budget audit** per V3 SAVED-SHIP prescription (measure + report; no install-class action; operator-decision-gated on remediation)
- Wave 153 Fire 4: 🥈 `CLAUDE_CODE_SESSION_ID` adoption in 5 hook scripts (per-script Edit + Path P V2+V3 per Wave 24-D)
- Wave 153 Fire 5+: 🥉 CCBP cite-anchor refresh `64fffd53` → `4527f4d4` (bundle with #1 audit findings where each rule touched anyway)
- Wave 154+: #4 changelog/<topic>/ META-process refactor (multi-fire arc; OPERATOR-DECISION-GATED)

**Update triggers**: re-evaluate audit when (a) CCBP upstream HEAD bumps beyond `4527f4d4`; (b) Anthropic CC ships new minor version beyond v2.1.138; (c) NEW best-practice file lands in CCBP outside current 9-category taxonomy; (d) Wave 153 Fire 3+ ships per Forward Top-N gap close those gaps in this audit doc post-ship.
