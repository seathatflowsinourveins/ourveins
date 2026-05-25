# W348 /goal predicate DRAFT (pre-codex-r1)

Frame after streams A+C+E+F. Streams B+D pending — placeholders for SOTA-discovery + memory/git-tree/OTLP.

Ceiling: ≤3800 chars per goal-prompt-synthesis Phase 4. Structure: header → P0..Pn → MANDATES → REPORT/SHIP → STOP.

---

## DRAFT PREDICATE (working copy; refine after B+D + codex r1)

```
/goal W348 SOTA-CONVERGENCE-FIX + multi-stream gap-resolution (codex GPT-5.5 r1 required)

Branch: w348-sota-convergence-fix (fork w344-mainsession-ship@f664bcd). Worktree: Z:\claude-sota-installed-W348.

P0 — W330 PARALLEL-GUARD BATCH-DETECTION FIX (Stream-C confirmed TWO bugs):
- preagent-parallel-guard.mjs Bug-A: remove misplaced exit(0) L380-470 (W341-Q11 exit-spectrum drift "1 exit-2 + 8 exit-0" → "1 exit-2 + 9 exit-0")
- Bug-B (this session empirical confirm): rewrite lastAssistantTurnText (L386) to read transcript_path JSONL tail backward for in-flight agentBlocks≥2 fast-path
- W330 test suite MUST turn GREEN before merge
- TDD: failing test FIRST per superpowers:test-driven-development
- Remove .claude/state/parallel-guard-bypass.marker at wave-close (task-close-discipline)

P1 — CLAUDE.md NUMERIC + settings.json ENV REMEDIATION:
- CLAUDE.md L50 "× 53" → "× 56" (W344-batch-1 3 skill adds per Stream E)
- CLAUDE.md L86 "13 colliding" → "14" (allowlist re-probe 2026-05-20T23:09:26Z)
- settings.json:env add CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=5 (v2.1.143 unpinned)
- settings.json:env CLAUDE_CODE_EFFORT_LEVEL=max → xhigh OR auto (Opus 4.7 outside max value-set per CCBP claude-settings.md:891)
- settings.json:env resolve OTEL_LOG_USER_PROMPTS=1 vs CAPTURE_MESSAGE_CONTENT=false contradiction (privacy intent)

P2 — SKILL PRUNES (Stream-E 4 duplicates):
- Delete .claude/skills/{tdd,review,doubt-driven-development,api-and-interface-design}/
- Rollback path: git revert per skill
- Net: 56 → 52 local skills

P3 — CI/CD HARDENING (Stream-F top-4):
- Refresh 32 unpinned `uses:` → 40-char SHA across 9 workflows (CR-1 supply-chain)
- Add TruffleHog secondary secrets scanner (complement gitleaks)
- Add consumer-side cosign verify on .mcp.json plugin SHAs (.github/workflows/cosign-verify.yml)
- Investigate ultrareview CLI wiring (CC v2.1.x new cloud-hosted multi-agent review — operator-decision)

P4 — CITE REFRESH + MEMORY HYGIENE:
- 7 stale citations Stream-E bundle: f17c6e88 (5 SKILL.md), 39a350b6 claude-cookbooks (6 local), CCBP HEAD a28cd96b (Stream A confirmed exact-match), addyosmani vendor-fork base
- Slug correction: CCBP local-path "claude-code-best-practice-shan" stays; GitHub slug clarified shanraisshan/claude-code-best-practice (no CLAUDE.md edit needed — L3 cites local path)
- Insights HONEST-NON-FINDING T6 basic-memory ledger row (operator question closure; Claude Code Analytics API exists but T3 NOT-WIRED — operator-decision pending org-API key)
- 5 audit-trail anomalies (Stream-C): codex_failure_audit 55× empty-reason; codex_gate 382× dead-reason since 2026-05-15; audit_coverage stale; cli_path_audit absent; gateguard minimal

P5 — MEMORY + GIT-TREE (Stream-D placeholder):
- TBD Langfuse OTLP 401 root-cause + settings.json header fix
- TBD W347 worktree prune (dormant at b34ecd2 = W343 carry)
- TBD 12+ stale branches prune list
- TBD W342-Z 5-layer architecture P3 impl status

P6 — SOTA INSTALL CANDIDATES (Stream-B placeholder):
- TBD multi-MCP convergence top-10
- Candidate: agnix (agent-sh/agnix Apache-2.0 252★ pushed 2026-05-19) — 414-rule linter for CLAUDE.md/AGENTS.md/SKILL.md/hooks/MCP across 11 AI assistants; ANTI-BIAS CHALLENGER (would supersede local validators)
- Candidate: CCBP 3 new bundled skills run/verify/run-skill-generator (cf864317 2026-05-20)
- TBD other top-10 by D81 ≥4-MCP-family convergence

MANDATES:
- Δ-G49 empty-final-message contract: orchestrator-worker returns non-empty OR explicit NO-FINDINGS
- 2+ Agent calls in 1 message for multi-stream sub-work (W269/W312-D); guard now batch-aware post-P0
- Every fix cites ≥3-org-distinct anchors per CR-6 + sca-v17 D80 (peer-reviewed/standards-body floor for T1)
- Codex GPT-5.5 round-1 adversarial review via codex-companion.mjs task --effort high (embedded ranking) BEFORE ship
- Verify-before-claim (CR-6): every "DONE" cites test exit-code + file:line + commit SHA + codex verdict
- Parallel-dispatch: any ≥2 independent streams MUST dispatch 2+ Agent in 1 message
- Sca-v17 verdict-ledger row per merged P with full schema

REPORT/SHIP:
- All P0-P6 land on branch w348-sota-convergence-fix
- W330 GREEN required for P0 merge (failing tests = BLOCK)
- Codex round-1 APPROVE OR REVISE-then-round-2-APPROVE required for /goal closure
- VERDICT-LEDGER row per fix with sca-v17 schema → T6 basic-memory write
- CLAUDE.md updates limited to L50 + L86 numeric corrections (no L19 prose change)
- Wave-close: remove parallel-guard-bypass.marker (task-close-discipline)

STOP:
- W330 batch-detection RED → BLOCK
- Codex r1 BLOCK → BLOCK
- Bypass-marker still present at wave-close → BLOCK
- CLAUDE.md >50 LOC → BLOCK
- Operator-sign required (defer to W349): C1 origin/main merge + C2 MemPalace + C5 gepa-pip + C7 sca-v17 calibration + C8 W345 7-item batch (per W347 TERMINAL handoff)
```

---

## Char count (running): ~4080 — TIGHT over 3800 ceiling — need pass-2 trim

## To merge from Stream-B (still in flight):
- §P6 candidate list with D81 ≥4-MCP-family convergence verdicts
- §P4 stale-references-to-retire list

## To merge from Stream-D (still in flight):
- §P5 detail (OTLP 401 fix, worktree prune, branch prune)
- §P4 memory-layer hygiene additions

## Codex round-1 inputs:
- Final predicate text
- Source-of-truth assertions: ≥6 source families, ≥1 challenger candidate (agnix), inverse-test PASS, all cites external
- Position-swap re-invoke required for T1-class verdict
