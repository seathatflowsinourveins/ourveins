# Wave 179 Agent C Adversarial Review

## Q-1

- Probe 7.b requires all five clauses: named operational use case, cited local input/source path, wiring path, incumbent comparison, and reversible time-box (`Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md:119-125`). It is only available after earlier blockers are cleared (`Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md:106`).
- The W165 report named Top-3 candidates and gave install/probe actions, but did not fully instantiate the 7.b five-clause check for shell-scripting or gitnexus-pr-review, and protect-mcp only had a 30-day success criterion (`tmp/w165-A.md:35-37`, `tmp/w165-P0-close-synthesis-2026-05-13.md:42-44`).
- Later artifacts partly fill the gap: W163 explicitly says the three wshobson survivors still lacked named use case, wiring, incumbent comparison, and time-box (`tmp/wave163-f9-sota-researcher-wshobson-agents-2026-05-13.md:94-98`), while W166 architect design later added native install/revert paths and incumbent comparison for gitnexus-pr-review/protect-mcp (`tmp/wave166-agentC-architect-top3-install-2026-05-13.md:152-162`, `tmp/wave166-agentC-architect-top3-install-2026-05-13.md:216-229`).

VERDICT: PROCEED-WITH-CAVEAT

## Q-2

- FM-02 already has a dedicated owner rule and explicitly decomposes three sub-classes, including commit-layer absorption (`Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md:64-88`).
- MEMORY records the current sub-class (c) ladder at n=15 from W169 absorption (`Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/MEMORY.md:100`), but the owner rule’s long-term defense is already structural: every session uses `claude --worktree`, which prevents all three sub-classes (`Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md:86-88`).
- The catalog recovery already says long-term defense is `claude --worktree`; no evidence found that n=20 requires a new rule distinct from the existing FM-02 owner (`Z:/claude-sota/.claude/rules/named-failure-modes.md:24`).

VERDICT: CONFIRM-AS-IS

## Q-3

- The original T3 finding for `8119746` was medium, not HIGH: unpinned `npx gitnexus analyze` supply-chain execution risk (`Z:/claude-sota-installed/.claude/state/codex_review_HEAD_81197463.txt:1`; summarized at `tmp/wave177-fire2-launch-log-2026-05-13.md:17-21`).
- The fix-forward applied both prescriptions: pin `@1.6.4-rc.112` and add the trust-boundary warning never to run analysis on an untrusted PR working tree (`tmp/wave177-fire2-launch-log-2026-05-13.md:22-26`; actual skill line at `Z:/claude-sota-installed/.claude/skills/gitnexus/gitnexus-pr-review/SKILL.md:29`).
- Closed-loop hard-deny only applies to unresolved high/critical findings (`Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md:35-44`, `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md:102-104`). This arc is not ACCEPT-WITH-DOC-on-still-HIGH; it is medium fixed with concrete code text.

VERDICT: PROCEED-WITH-CAVEAT

## Q-4

- Cross-model option (b) is explicitly DOWNGRADED-MODE and must first smoke-probe `/api/generate` verdict-shape; if the smoke probe fails, the rule says fall back to option (a) deferred queue (`Z:/claude-sota/.claude/rules/cross-model-consensus.md:107-114`).
- W178 verified `:11700` is Ollama directly, PID 45628, with `/v1/models` HTTP 200 but chat completions and embeddings timing out for 30-60s (`tmp/wave178-fire1-p0-graphiti-rootcause-verify-2026-05-13.md:14-23`, `tmp/wave178-fire1-p0-graphiti-rootcause-verify-2026-05-13.md:27-30`).
- W178 classifies restart as operator-supervised OS-state mutation and says this session cannot self-execute because it would interrupt parallel consumers (`tmp/wave178-fire1-p0-graphiti-rootcause-verify-2026-05-13.md:48-60`, `tmp/wave178-fire1-p0-graphiti-rootcause-verify-2026-05-13.md:71-73`).

VERDICT: HONEST-NON-FINDING (operator-only path)

## Q-5

- Rows 10-13 are specifically README/blob/LICENSE pin drift: stale upstream artifact pins reverified by direct GitHub blob reads (`Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md:62-65`, `Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md:70`).
- Row 14’s mechanism is different: a MEMORY index entry propagated a stale sub-claim into W179, and the actual artifact refuted the claimed `agent-claimed-artifact-FALSE-EXISTS` label before edit (`Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md:66`).
- The distinct taxonomy is justified as a propagation-surface class, not a new upstream README drift case; FM-20’s anti-patterns explicitly target verbatim agent/task claim propagation without sub-claim probe (`Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md:100-106`).

VERDICT: CONFIRM-AS-IS

## Q-6

- CR-3 Phase 1 bootstrap exception allows foreground `codex exec` or REAL GPT-5.5 BRIDGE-MODE dispatch while Tier 1a is not installed, with satisfaction status disclosed (`Z:/claude-sota-installed/CLAUDE.md:37`, `Z:/claude-sota-installed/CLAUDE.md:179-180`). W179 v2 says Tier 1a is now installed and the exception is no longer needed (`tmp/wave179-paste-ready-goal-v2-2026-05-13.md:71-72`).
- The +point scoring is operationally present in W177/W179 artifacts: W177 counted a T3 NEEDS-ATTENTION as +1.0 and pending fix-forward re-fire as +0.5 (`tmp/wave177-fire2-launch-log-2026-05-13.md:30-32`); W179 row 14 counts T3 mechanical post-commit +0.5 and total +2.0/6.0 (`tmp/w179-row14-commit-msg.txt:31-33`).
- I do not find a normative rule line saying every agent NEEDS-REVISION conf>=0.85 automatically equals +1.0. Minimal viable path to +6.0 from +2.0 is four bounded REAL GPT-5.5/codex reviews with persisted verdict files, preferably 3 CADP fan-out reviews plus one mechanical T3/T2 re-fire; count only real cross-model outputs, not same-model stand-ins or Ollama DOWNGRADED-MODE.

VERDICT: PIVOT (clarify scoring)

## Final Summary

VERDICT: NEEDS-REVISION conf=0.87

CROSS-MODEL-GATE satisfaction status: REAL GPT-5.5 BRIDGE-MODE requested by user; this artifact is produced by Codex/GPT-5.5 in bridge-mode context. Gate satisfaction is PARTIAL for ship-scoring because the review identifies missing normative scoring language and recommends clarification before treating +1.0-per-agent as canonical.
