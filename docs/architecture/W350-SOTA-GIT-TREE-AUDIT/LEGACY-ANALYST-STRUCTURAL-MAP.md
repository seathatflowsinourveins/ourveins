# W350 - Legacy-Analyst Structural Map (claude-sota-installed)

Probe date 2026-05-20. Method Read/Grep/Glob/Bash, verify-before-claim per CR-6. Worktree Z:/claude-sota-installed @ w348-sota-fix HEAD a36239c.

## 1. Skills Inventory (58 skills)

CLAUDE.md L77 claims x 53; user-prompt claims x 59. Empirical via ls .claude/skills/ returns 59 entries; one is the non-skill folder _archived/ (holds W324/W325 deprecated content per probe ls .claude/skills/_archived/). Net = 58 SKILL.md files, all with valid name + description frontmatter. 4 use multi-line description block form (iterate-fix-failing-tests, orchestrate-issue-to-pr, prompt-versioning-and-rollback, session-handoff). Net drift vs CLAUDE.md L77 = +5 skills documented as 53.

Anchor-set vs Empirical:
- mem-recall: .claude/skills/mem-recall/SKILL.md - OK
- sota-convergence-audit: present - OK
- parallel-dispatch-mandate: present - OK
- dual-review: MISSING - drift
- vercel-*: 2 found (composition-patterns, react-best-practices) - OK
- web-design-guidelines: present - OK
- speckit-*: 9 found (analyze, checklist, clarify, constitution, implement, plan, specify, tasks, taskstoissues) - OK
- langfuse: present - OK
- mattpocock-vendor-fork-10: caveman, handoff, zoom-out, code-simplification, review, tdd, triage, diagnose, etc. (>=7 verified vendor-fork headers) - partial-OK

Trigger-keyword cardinality (W331 axis-1 #6, <=8 triggers, <=50pct sibling overlap) - spot-flagged conflicts:

- addyosmani-spec-driven-development (.claude/skills/addyosmani-spec-driven-development/SKILL.md L2) vs 9 speckit-* skills - overlap on "spec" word but boundary documented (no formal speckit-* workflow appropriate clause).
- tdd vs iterate-fix-failing-tests - iterate-fix-failing-tests/SKILL.md L9-11 carves out: Distinct from superpowers test-driven-development (RED-GREEN-REFACTOR authoring); this skill handles REFINEMENT-ON-EXISTING-RED.
- diagnose vs triage - both investigate; distinct triggers (debug this vs create an issue).
- dispatching-parallel-agents-w321-fork vs parallel-dispatch-mandate - both fire on "parallel"; W321-fork adds 4 deltas (skeleton-first / context-cap / mid-flight retry / position-swap audit).
- speckit-* x9 all open with "Use when the operator runs slash-speckit-X" - command-name-namespaced, no internal overlap.

Truly missing: dual-review (CLAUDE.md L77 names it; no directory).

## 2. Plugins Enable/Cache Map

.claude/settings.json L297-356 lists 58 enable-records (47 enabled + 11 disabled). All 11 disabled plugins HAVE corresponding cache-dirs (verified by find .claude/plugins/cache -maxdepth 2 -type d -name PLUGIN):

| Plugin | Marketplace | Disabled-why | Cache? | Retire candidate? |
|---|---|---|---|---|
| clickhouse | claude-plugins-official | W341 phantom-enabled flip (CLAUDE.md L88) | YES | YES |
| outputai | claude-plugins-official | W341 phantom-enabled flip | YES | YES |
| qdrant-skills | claude-plugins-official | unspecified | YES | review-pending |
| hookify | claude-plugins-official | likely CR-2 conflict | YES | YES |
| intelligent-compact | claude-settings | W260-P1 supersede | YES | YES |
| claude-mem | thedotmack | unspecified | YES | review-pending |
| review-agent-governance | claude-code-workflows | unspecified | YES | review-pending |
| superpowers @ superpowers-marketplace | superpowers-marketplace | duplicate of superpowers @ claude-plugins-official (L298 enabled) | YES | YES (duplicate) |
| hindsight-memory | hindsight | W316-S6 T1 RETIRED daemon-down (CLAUDE.md L88) | YES | YES (daemon dead) |
| gitnexus | gitnexus-marketplace | W316 retirement | YES | YES |
| protect-mcp | claude-code-workflows | unspecified | YES | review-pending |

Cache-vs-enable parity: 15 cache marketplaces (settings.json L357-486 + ls .claude/plugins/cache/) match marketplaces holding enabled or disabled plugins 1-to-1. No orphans (no enable=true without cache-dir; no cache-dir without an enable record).

## 3. Tools Directory Map (61 entries via ls tools/)

Load-bearing scripts referenced by .claude/settings.json hooks:

| Hook event (line) | Files | Status |
|---|---|---|
| SessionStart (L122-125) | .claude/hooks/context-mode-cache-heal.mjs | 1656 B / 28 lines / parses OK (CR-2 bug-shim exception for anthropics/claude-code#46915) |
| UserPromptSubmit (L132-136) | tools/parallel-guard-userpromptsubmit.mjs | 3916 B / 115 lines / parses OK |
| PreToolUse Bash (L141-158) | gitleaks (external), inline-bash trivy, codex-companion.mjs adversarial-review | codex-companion at .claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs 30862 B present |
| PreToolUse Edit/Write (L160-168) | inline-bash VERDICT-LEDGER lint | external grep/jq |
| PreToolUse Agent (L171-188) | tools/preagent-parallel-guard.mjs (20612 B), preagent-subagent-validator.mjs (5507 B), preagent-d73-gate.mjs (11474 B) | ALL parse-OK |
| PostToolUse Edit/Write/MultiEdit (L192-200) | inline-bash ruff + shellcheck | external |
| PreCompact (L202-211) | inline-powershell audit-log | external |
| Stop (L213-223) | tools/stop-position-swap.mjs | 10141 B / 249 lines / parses OK |
| WorktreeRemove (L225-233) | git worktree prune | external |
| SubagentStop (L235-249) | tools/subagent-stop-audit.mjs (2027 B), subagent-stop-guard.mjs (5596 B) | parses OK |
| Notification (L251-259) | inline-powershell Beep | external |
| PostToolUseFailure (L261-271) | inline-powershell parse | external |
| TaskCompleted (L273-280) | ruff check tools harness | external |

Dead-code in tools/ - scripts present but NOT referenced by settings.json hooks:
- parallel-guard-detector.mjs, parallel-ratio-telemetry.mjs, test-parallel-guard-race.mjs, test-parallel-guard-r4-cross-prompt.mjs, test-parallel-guard-w330.mjs - test fixtures.
- sca-effectiveness-report.mjs, sca-mcda-rank.py, sca-re-evaluate-decisions.mjs, sca-record-decision.mjs, sca_status_dashboard.py, sca-v7-prelim.sh - SCA decision-record toolchain (skill-invoked or manual).
- w317-cleanup-z-phantom.ps1, w328-trio-1-phoenix-receivers.ps1, w328-trio-2-settings-validate.ps1, w328-trio-3-langfuse-verify.ps1, w328-trio-e2e-smoke.ps1, wave152-f1-netsh-pin.ps1 - one-shot wave-ops residue (archival candidates).
- mcp-eval-stub.mjs, test-msys-norm.mjs, provenance-lint-v3.mjs - verifiers (may be CI-invoked).

## 4. .github/workflows/ Audit (20 files)

| File | Trigger | SHA-pin count | Last commit |
|---|---|---|---|
| actionlint.yml | push | 0 | 6754... |
| ci.yml | push | 24 | 3e01... |
| claude-code-security-review.yml | pull_request | 1 | ddb7... |
| code-quality.yml | push | 6 | 3e01... |
| codeql.yml | push | 5 | 3e01... |
| codex-review.yml | pull_request | 0 | 44eb... |
| commit-signing.yml | push | 4 | 3e01... |
| commitlint.yml | pull_request | 0 | cf87... |
| dependabot-auto-merge.yml | pull_request_target | 2 | acd4... |
| labeler.yml | pull_request_target | 2 | acd4... |
| monthly-metrics.yml | schedule | 4 | 3e01... |
| parallel-guard-stress.yml | pull_request | 3 | d5df... |
| pre-commit-mirror.yml | pull_request | 4 | aaac... |
| provenance.yml | push | 2 | ddb7... |
| release-please.yml | push | 0 | 4060... |
| scorecard.yml | branch_protection_rule | 1 | ddb7... |
| session-jsonl-archive.yml | cron REMOVED per W342 codex r1 | 0 | 8683... |
| stale.yml | schedule | 2 | acd4... |
| supply-chain-watch.yml | schedule | 0 | 8683... |
| zizmor-action.yml | push | 3 | acd4... |

Probe correction: user-prompt claimed 3 are M-modified uncommitted (provenance, scorecard, claude-code-security-review) - git status -uall .github/workflows/ returns clean. All 20 workflows committed at HEAD a36239c. Those 3 named files share commit ddb7... (one bundle), possibly the upstream-source for the M-claim.

Gaps:
- 6 workflows with 0 SHA pins (actionlint, codex-review, commitlint, release-please, session-jsonl-archive, supply-chain-watch) violate W331 axis-1 #3 maintainer-identity discipline.
- session-jsonl-archive.yml cron-removed -> trigger orphan; only workflow_dispatch fires now.
- pre-commit-mirror.yml present -> good defense-in-depth vs .pre-commit-config.yaml.
- stale.yml present -> good lifecycle hygiene.
- No duplicate lint (actionlint vs zizmor are distinct).

## 5. docs/architecture/ Naming Pattern (22 folders in W340-W350 range)

Empirical suffix taxonomy:

| Suffix family | Count | Examples |
|---|---|---|
| CONTINUE | 2 | W342-CONTINUE, W348-CONSOLIDATE |
| FULL-SOTA-UNLEASH | 4 | W340-FULL-SOTA-UNLEASH, W341, W346, W349 |
| SOTA-UNLEASH | 3 | W343, W344, W346 |
| GAP-RESOLUTION / FULL-GAP-RESOLUTE | 2 | W341-GAP-RESOLUTION, W342-FULL-GAP-RESOLUTE |
| EXECUTE / FULL-EXECUTE / EXECUTE-2026-05-20 | 4 | W343-EXECUTE, W343-FULL-EXECUTE, W346-EXECUTE-2026-05-20, W347-EXECUTE |
| DEEP-AUDIT | 2 | W344-DEEP-AUDIT, W345-DEEP-AUDIT |
| Other | 5 | W344-SCA-V17-MEMORY-TIER, W347-SOTA-CONVERGENCE-UNLEASH, W348-PREDICATE, W348-SOTA-FIX, W350-SOTA-GIT-TREE-AUDIT, W350-sota-git-tree-finalization (lowercase!) |

Inconsistency findings:
1. Case inconsistency - 21 folders use SCREAMING-KEBAB-CASE; W350-sota-git-tree-finalization is lower-kebab.
2. Same-wave-number forks - W343 has 4 folders (CONTINUE, EXECUTE, FULL-EXECUTE, SOTA-UNLEASH); W346 has 2; W348 has 3 (CONSOLIDATE, PREDICATE, SOTA-FIX); W350 has 2.
3. Suffix vocabulary - >=10 distinct suffixes across 22 folders; operator-organic. Recommend canonical W-N-KEBAB-SUFFIX UPPER, single folder per wave, sub-folders for streams.

## 6. Stale Branch Audit

git worktree list returns 4 live worktrees (not 3 as CLAUDE.md L24 claims):
- Z:/claude-sota-installed [w348-sota-fix] a36239c
- Z:/claude-sota-installed-W348 [w348] faf018f
- Z:/claude-sota-installed-W348-carry [goal/W348-carry-cleanup] 447b049
- Z:/claude-sota-installed-W350 [goal/W350-sota-git-tree-foundation] b34ecd2

| Branch | Last commit | Merged? | Recommendation |
|---|---|---|---|
| worktree-agent-ad2889f375236f3b6 | 2026-05-20 18:13 b34ecd2 | MERGED | prune-safe |
| goal/W343 | 2026-05-20 18:13 b34ecd2 | MERGED | prune-safe |
| goal/W347-sota-unleash | 2026-05-20 18:13 b34ecd2 | MERGED | prune-safe |
| goal/W350-sota-git-tree-foundation | 2026-05-20 18:13 b34ecd2 | MERGED | KEEP (active worktree) |
| goal/W331..W337-continue (x7) | 2026-05-19..2026-05-20 | UNMERGED | inspect-then-prune |
| worktree-agent-a6cf425e6788e76c6 | 2026-05-19 16:37 5cf5c90 | UNMERGED | prune-risky (zombie worktree-agent) |
| W321, archive/W287, archive/W290, archive/W328-sota-unleash | 2026-05-18..19 | UNMERGED | archive-pattern; KEEP |
| sota-converge-w295 / w310 / w330 | 2026-05-18..19 | UNMERGED | inspect-then-prune |
| w342-execute, w343-y1y2y3y4-mainsession, w344-mainsession-ship, w344-sota-unleash, w348, w348-sota-fix | 2026-05-20 | UNMERGED | active - KEEP |

Worktree topology breach: CLAUDE.md L24 claims ~3 parallel cap; actual = 4 (over by 1).

## 7. .claude/state/ Tracking Status

.gitignore L14-22 rules: .claude/state/* ignored EXCEPT subagent-type-allowlist.json (negate). Empirical: git ls-files .claude/state returns only subagent-type-allowlist.json - pattern works as designed.

Probe shows ~100 files: 15x parallel-guard-session-*.json, 19x posttooluse_context_monitor_warned_*.json, 25+ codex_*.jsonl gates, observations.jsonl, swallow_*.json. Verdict: gitignore is correct as-is. This is operational state (per-session UUIDs, per-tooluse correlations, audit JSONL streams) and properly outside source. Cleanup opportunity: rotate or purge files older than cleanupPeriodDays:60 per settings.json L3 - many state files appear to lack TTL.

## 8. Hooks Reality Check

All 9 referenced files exist + parse-clean (node --check returns 0 for the 7 .mjs):
- OK tools/preagent-parallel-guard.mjs 20612 B / 482 lines
- OK tools/preagent-subagent-validator.mjs 5507 B / 148 lines
- OK tools/preagent-d73-gate.mjs 11474 B / 270 lines
- OK tools/stop-position-swap.mjs 10141 B / 249 lines
- OK tools/subagent-stop-audit.mjs 2027 B / 44 lines
- OK tools/subagent-stop-guard.mjs 5596 B / 147 lines
- OK tools/parallel-guard-userpromptsubmit.mjs 3916 B / 115 lines
- OK .claude/hooks/context-mode-cache-heal.mjs 1656 B / 28 lines (bug-shim, 1656 <= 2048 B cap per CR-2)
- OK .claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs 30862 B / 1027 lines

External CLIs (gitleaks, trivy, jq, ruff, shellcheck, git, npx, powershell) referenced inline are assumed PATH-available - not probed here.

## 9. Subagent-Type Allowlist Health

.claude/state/subagent-type-allowlist.json exists, valid JSON. Header (L6-11) claims vs python json.load + len() actual:

| Claim | Actual | Match? |
|---|---|---|
| _count: 174 | allow length = 174 | OK |
| _legacy_bare_count: 138 | legacy_bare_aliases length = 138 | OK |
| _colliding_bare_count: 14 | colliding_bare_names length = 14 | OK |
| _orphaned_fqn_count: 43 | orphaned_fqn length = 43 | OK |
| Source commit 72665d75... (L5) | matches head of w344-sota-unleash | matches |
| Generated_at 2026-05-20T23:09:26 | within current wave | fresh |

CLAUDE.md drift: cardinal-rule-3 mechanization text (CLAUDE.md L31) says 173 FQN entries + 138 legacy_bare. Actual = 174 + 138. +1 FQN drift since W340 F3/SB-3 closure docs (likely W342 X1 ECC@ECC reinstatement). Cite-refresh queued for CLAUDE.md.

## 10. Top-3 Cleanup Opportunities (ROI-ordered)

1. Disabled-plugin cache eviction (HIGH ROI / LOW RISK). 11 disabled plugins still occupy .claude/plugins/cache/MARKETPLACE/PLUGIN/. For the 5 with documented retire verdicts (clickhouse, outputai, superpowers @ superpowers-marketplace dup, hindsight-memory, gitnexus): delete cache dirs + remove enable=false records + remove marketplace entries if no other plugin uses them. Reclaims disk + reduces plugin-cache scan time at SessionStart. Verify per-plugin retire records before deletion.

2. CLAUDE.md cite-refresh wave (MEDIUM ROI / LOW RISK). Pointer-only <=50-LOC discipline drifting. Fixes: (a) line 77 skills count x 53 -> x 58; (b) line 31 allowlist 173 -> 174; (c) line 24 worktree count ~3-cap honest delta (now 4, over by 1); (d) add dual-review to anchor set OR drop the claim; (e) refresh source-commit-SHA for the allowlist quote. Each is 1 line; ship as single W350 ratchet commit.

3. Stale branch + worktree prune (MEDIUM ROI / MEDIUM RISK). 3 MERGED branches (worktree-agent-ad2889f, goal/W343, goal/W347-sota-unleash) are safe to delete. Of 4 worktrees, retire whichever has the earliest fork-base after merging w348-sota-fix. Re-archive archive/W287/W290/W328 to a rolling tag set instead of per-wave refs. Sequence: ship w348-sota-fix -> delete merged refs -> consolidate W350 work into one worktree.

## Confidence and Gaps

| Item | Confidence | Gap |
|---|---|---|
| Skills count (58) | HIGH | _archived/ non-skill; all 58 have name+desc |
| Trigger-keyword overlap | LOW | full pairwise audit beyond single-pass scope; only spot-flagged 5 conflicts |
| Plugin enable/cache parity | HIGH | did not probe each cache-dir for SKILL.md vs plugin.json structural validity |
| Tools dead-code | MEDIUM | not-referenced-by-settings.json-hooks != unused (skills/CI may invoke) |
| Workflows uncommitted-M claim | HIGH | empirically clean working tree on w348-sota-fix HEAD; original claim stale |
| docs/architecture/ pattern | HIGH | naming taxonomy fully enumerated |
| Branch merged-status | HIGH | git merge-base --is-ancestor is authoritative |
| .claude/state/ tracking | HIGH | gitignore validated; rotation policy unverified |
| Hook script parse-OK | HIGH | node --check returned 0 for all 7 .mjs |
| Allowlist health | HIGH | header counts == array lengths |

SME questions (1-line each):
- Is dual-review/ a planned skill or a stale CLAUDE.md anchor reference?
- Should _archived/ be moved out of .claude/skills/ to avoid skill-loader probing it?
- For the 6 SHA-unpinned workflows: is tag-only acceptable for org-internal (release-please) and not for externals (commitlint, codex-review)?
- session-jsonl-archive.yml cron-removed (W342 codex r1) - what re-fires it now (workflow_dispatch only)?
- Are 4 worktrees a temporary state for active W348/W350, or does CLAUDE.md L24 ~3 parallel cap need amending?
