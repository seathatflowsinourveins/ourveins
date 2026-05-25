# W331 /goal Predicate — FINAL paste-ready (≤3800 chars)

**Compose-date**: 2026-05-19  **Cumulative codex round**: 25 (r26 pending)  **Composite at compose-time**: 4.237 YELLOW lower-band

## SOTA Git Practice Audit (Stream A + W330-MEGA-AUDIT verified)

| Practice | State | Gap |
|---|---|---|
| Conventional Commits + commitlint W317-D | ✓ | — |
| gitleaks pre-commit (`\|\| exit 2`) | ✓ | — |
| trivy CVE-scan PreToolUse | ✓ PIPESTATUS fix W318 | — |
| provenance-lint v2 commit-msg | ✓ 7/7 smoke | v3 prose-mode edge cases W331 |
| Commit signing (GPG/SSH/Sigstore) | ❌ | W331 OPERATOR DECISION (SLSA L3 prereq) |
| --force-with-lease + rebase-not-merge | ✓ documented | — |
| Worktree-per-session ~3 cap | ⚠ 5 (W287+W290+W321 stale) | W331 PRUNE |
| K-4 slsa-verifier v2.7.1 | ❌ NOT INSTALLED | T1 install (W329-B-2 paste-ready; +0.07 composite) |
| signed-audit-trails + protect-mcp | ❌ disabled L256-257 | W331 re-enable |
| W269 parallel-Agent-dispatch | ⚠ detector bug | W331 P0-1 redesign at UserPromptSubmit |
| --no-verify discipline | ✓ block-no-verify plugin | — |
| --safe-edit doc-only flow | ❌ W329 race-4 class | W331 P1 codify |
| GitHub branch protection + 2-of-N review | ❓ unverified | W331 verify |
| Multi-session race detection | ✓ FLAT-at-4 | — |

## /goal predicate (≤3800 chars) — paste-ready

```
W331 SOTA-unleash + R5 ESCALATION-BREAK + SOTA-git-practice + ≥4.5-ship-gate GREEN. Operator MAX-quality + unlimited GPT-5.5/Opus 4.7. Context: HEAD `e980d06` cumulative codex round-25 (r26 PENDING); composite 4.237 YELLOW (gap-to-GREEN 0.263); R5 dwell 13 waves > 8-wave ESCALATING; FI-1 ENUMERATED-NOT-PROBED · FI-2 BROKEN · FI-5 HOLDS-conditional. W330-MEGA-AUDIT verified 2 operator hypotheses + 1 Windows-CRITICAL plugin drift. /insights ALREADY BUILT-IN. 4 multi-session-races FLAT (0 new W330). COORD: `mcp__basic-memory__search_notes "Wave-331"` + read W330-MEGA-AUDIT/SYNTHESIS + REMEDIATION-PLAN-V2 + W330-CLAUDE-SESSION-AUDIT/STREAM-A-SYNTHESIS BEFORE dispatch.

P0-1 Parallel-dispatch detector redesign UserPromptSubmit (codex r25 axis-1 #1 CRITICAL — BEFORE D4 exit-2 flip): move detection from PreToolUse[Agent] per-call → UserPromptSubmit message-level; per-session flag `multi_stream_pending`; PreToolUse[Agent] consults flag (1st=ALLOW, 2nd+=BLOCK); state .claude/state/parallel-guard-session-<id>.json; staging goal/W331-detector + codex r2 BEFORE merge.

P0-2 CLAUDE_CODE_PROJECT_DIR redirect fix: active-session probe Get-Process claude -gt24h ABORT-if-active; /insights acceptance test BEFORE+AFTER; decision tree: $HOME-uses → DROP env-var; PROJECT_DIR-uses → migrate or symlink.

P0-3 R5 dwell-close 13→≤8 waves (composite +0.20 on sign):
(a) FI-1 probe vs 34 deny entries → ENUMERATED-NOT-PROBED → HOLDS
(b) FI-2 PreToolUseFailure audit-log hook: CR-2 ≤2KB sanctioned anthropics/claude-code-issue-cite-anchored; SHA-256 hash-chain JSONL .claude/state/audit/ → Phoenix logs
(c) FI-5 capability-registry .claude/state/capability-registry.json
(d) Patch C1 14 remaining deny entries (registry-read deeper + Bash(reg query *))
(e) Operator-sign W329-A-3-ACCEPTANCE-RECORD-DRAFT.md AFTER (a)+(b)+(c)

P0-4 Insights wire-up 14%→86% (~16min OPERATOR W330-A1 §2.a-§2.e):
- Rotate Langfuse + CLAUDE.local.md OTEL_EXPORTER_OTLP_HEADERS add
- tools/w328-trio-{3,1,2}.ps1 sequence + e2e-smoke.ps1
- 8 OTEL keys to settings.json env per W328-B-4/B-5
+0.04-0.07 composite + closes 5 SEV-1 carries

P0-5 SOTA-git-practice 7-item:
(a) Commit signing operator-decision (GPG/SSH/sigstore-cosign); SLSA L3 prereq
(b) Worktree prune (5→3 cap): `git worktree remove W287 W290 W321` after operator-verify
(c) Re-enable signed-audit-trails + protect-mcp plugins (settings.json:256-257 false→true)
(d) K-4 slsa-verifier v2.7.1 T1 INSTALL: `gh release download v2.7.1 --repo slsa-framework/slsa-verifier --pattern slsa-verifier-windows-amd64.exe --dir Z:/tools` verify sha256 1d8f61ad747ecc3d375d2a563cebf2991748b7da1a9bda9a500804c3c499e3c0; +0.07 composite
(e) Provenance-lint v3 + --safe-edit doc-only flow (W329 race-4 content-loss class)
(f) GitHub branch protection verify + 2-of-N review (sca-v11 D19)
(g) Codex split-install consolidate: remove Z:/.local/npm/codex* keep %APPDATA%/npm

P0-6 GitNexus update v1.3.6 → upstream `803f0bed` (Windows FTS-extension fix CRITICAL): `/plugin update gitnexus@gitnexus-marketplace` interactive

P0-7 Node v22.22.0 → v22.22.3 LTS (security openssl/undici); fnm or nvm-windows

P0-8 R6 codify Cardinal Rule 6 (Option B compress R5 inline → free 1 LOC): verify-before-claim; OWASP A06 + ISO/IEC 25010 §4.2.6-4.2.7 + NIST SP 800-218 PW.7+RV.1; sca-v11 SKILL.md lineage v11→v11.1

P0-9 Perplexity SEV-1 rotation (W317-r1 9-wave carry; operator-only via dashboard)

P1-A Line-by-line 15-repo SOTA ingest (V2 expanded): + langgraph + litellm + mem0 + zep + cline; retire mattpocock/skills + alirezarezvani/claude-skills to T3 cite-only

P1-B T1 memory-tier bakeoff: mem0 v1.0 vs Letta vs Zep sca-v12.1

P1-C Codex round-26 fresh fire on W331 ship; close r25 NEEDS-REVISION

P1-D Frontier-peer policy codify: qwen3-coder=cheap-triage-only; Sonnet 4.6=tie-breaker

P1-E agent-teams defensive checks: subagent_type validator + empty-final_message + coordination hooks.json

MANDATES: parallel-dispatch-mandate auto-fire; 4-Agent in 1 message W269 cap-4; provenance-lint v2 colon-prefix subject/footer ONLY (NEVER body prose); task-close-discipline pre-ship; T6 basic-memory canonical-primary; codex ≥1 round per ship; ops-rhythm §1.1 -0.5 until R5 dwell ≤8; W295 §6.2 anti-bias + Δ-G51 INDEPENDENCE-PROOF; NO --no-verify; ~3 worktree cap rebase-not-merge force-with-lease; CR-5 ↔ tools/preagent CONTRADICTION resolve; SLSA build-provenance verify on `gh release download` post-K-4-install; conventional-commits subject+footer trailer-discipline.

REPORT/SHIP: docs/architecture/W331-{stream-N}/; VERDICT-LEDGER rows per audit; codex tmp/W331-codex-*.txt; CLAUDE.md pointer-only.

STOP-gate: worktrees ≤3 (PRUNE pending); self_invented_count:0; CLAUDE.md ≤50 LOC; settings.json ≤17.5KB; R1-R6 hold (R6 codified); cumulative codex ≥27 W331 close; composite ≥4.30 + ≥4.5 post-sign-recovery; INDEPENDENCE-PROOF per adoption; SLSA-verify on release downloads.

REPOS: anthropics/claude-code · CCBP 48798ca → 9624c4ac · ECC HEAD · wshobson/agents ece811f23310a37ceb43496dbac0e244fe6845b6 · addyosmani/agent-skills f17c6e88 · mksglu/context-mode v1.0.141→v1.0.142 · OthmanAdi/planning-with-files v2.38.1 d27008f3 · abhigyanpatwari/GitNexus 803f0bed · slsa-framework/slsa-verifier v2.7.1 ea584f4 · sigstore/cosign · NEW: langchain-ai/langgraph + BerriAI/litellm + mem0ai/mem0 + getzep/zep + cline/cline.

T6 PERSIST: opt-in; goal-prompts/W331-r5-break-git-sota-insights-r6.md AFTER operator confirm + secret-redaction-gate.
```

## Highest-Leverage Operator Sequence to ≥4.5 GREEN

1. **W330-A1 §2.a-§2.e** apply (~16 min) → +0.07 → **4.307** YELLOW upper-band
2. **P0-5 SOTA-git suite** (commit-sign + worktree prune + plugins re-enable + K-4 install + branch protection; ~30 min)
3. **R5 acceptance-sign** AFTER P0-3 (a)+(b)+(c) → +0.20 → **4.547** GREEN ✓
4. **P0-6 GitNexus + P0-7 Node + P0-1 detector + P0-2 PROJECT_DIR** parallel-execute → +0.10-0.15 buffer

## Multi-Session Coordination

- 0 new W330 races (provenance-lint v2 effective at attribution-class)
- W329 race-4 content-loss class still uncovered — needs --safe-edit doc-only flow (W331 P1)
- Parallel session: W330-MEGA-AUDIT (8 streams) + W330-SOTA-DISCIPLINE-CLOSURE (6 sub-waves) DONE
- Pre-dispatch: `mcp__basic-memory__search_notes "Wave-331"` + VERDICT-LEDGER tail

**/goal predicate ready for paste**. SOTA-git-practice integrated as P0-5 (7 sub-items). MANDATES include SLSA-verify-on-release + conventional-commits subject+footer + force-with-lease + rebase-not-merge + ~3 worktree cap.
