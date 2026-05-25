# Wave 181 Agent C Archaeology Audit — CR-8 Runtime Conformance

Date: 2026-05-13
Workspace: `Z:/claude-sota-installed`

## Bridge-Mode Status

BRIDGE-MODE subprocess verification was attempted with:

`codex exec --ephemeral -p deep-review-exec --color never -`

Result: `FAILED` before model invocation.

Observed error: `failed to initialize in-process app-server client: Access is denied. (os error 5)`

Therefore: verdict origin for this artifact is direct Codex filesystem archaeology, not a completed nested Codex CLI GPT-5.5 subprocess verdict. Cross-model gate via subprocess is **not satisfied** for this run.

## Probe Basis

All counts below came from actual filesystem enumeration and file reads against:

- `.claude/rules/`
- `.claude/agents/`
- `.claude/skills/`
- `.claude/plugins/marketplaces/`
- `.claude/hooks/scripts/`
- `.claude/settings.json`
- `tests/`
- `docs/sota-installed-manifest.md`
- `.claude/rules/fm20-path-drift-cascade.md`

No counts are inferred from sampling.

## 1. Rules

Path: `.claude/rules/`

- Total `.md` files: 64
- Files with TIER-1-DIRECT style HEAD SHA cite anchor matching `@ HEAD [a-f0-9]{40}`: 44
- Stale/no-SHA files: 37
- Files containing `PENDING-AUDIT`: 1
- `PENDING-AUDIT` mentions: 1

Top-5 stale/missing HEAD SHA cite candidates:

| Rank | Rule | Direct cite lines | Malformed `@ HEAD` lines | PENDING-AUDIT | Lines |
|---:|---|---:|---:|---:|---:|
| 1 | `.claude/rules/cardinal-rule-12-upstream-install-priority.md` | 0 | 2 | 0 | 73 |
| 2 | `.claude/rules/cardinal-rule-8-full-sota-content.md` | 0 | 1 | 1 | 19 |
| 3 | `.claude/rules/ahfv-codex-rescue-blind-spot.md` | 0 | 1 | 0 | 86 |
| 4 | `.claude/rules/ahfv-probe-dag.md` | 0 | 1 | 0 | 151 |
| 5 | `.claude/rules/ahfv-seven-sub-classes.md` | 0 | 1 | 0 | 49 |

## 2. Agents

Path: `.claude/agents/`

- Total `.md` files: 11
- Files with `isolation: worktree`: 11
- Files with `PROACTIVELY`: 11
- Files with explicit `model:` field: 11

Top-5 misaligned agents:

No misaligned agents by the requested three checks. The first five sorted entries all scored 0:

| Agent | isolation | PROACTIVELY | model | Misalignment score |
|---|---:|---:|---:|---:|
| `.claude/agents/architect.md` | true | true | true | 0 |
| `.claude/agents/code-reviewer.md` | true | true | true | 0 |
| `.claude/agents/debugger.md` | true | true | true | 0 |
| `.claude/agents/evaluator.md` | true | true | true | 0 |
| `.claude/agents/gpt5-archaeologist.md` | true | true | true | 0 |

## 3. Skills And Marketplaces

Paths:

- `.claude/skills/`
- `.claude/plugins/marketplaces/`

Excluded: `.claude/plugins/cache/` snapshots, because the task requested plugin marketplaces.

- Total `SKILL.md` files: 5,626
- Files with `origin:` or `sota-cite:` frontmatter: 342
- Files containing `ADAPTED-FROM-SOTA`: 0
- Files containing `PENDING-AUDIT`: 0
- `PENDING-AUDIT` mentions: 0

Top-5 `PENDING-AUDIT` skills:

None found in audited roots.

## 4. Hooks

Path: `.claude/hooks/scripts/`

- Total `.py` files: 34
- Hook script basenames registered in `.claude/settings.json`: 24
- DENY/block-emitting scripts by grep for `permissionDecision.*deny`, `decision.*block`, `exit 2`, or `sys.exit(2)`: 14
- Scripts with exact `tests/**/test_<name>_security.py` coverage: 6

Top-5 unwired or untested DENY-emitting hooks:

| Rank | Hook | Wired | DENY-emitting | Exact security test | Score |
|---:|---|---:|---:|---:|---:|
| 1 | `.claude/hooks/scripts/_guard_base.py` | false | true | false | 3 |
| 2 | `.claude/hooks/scripts/codex_gate.py` | false | true | false | 3 |
| 3 | `.claude/hooks/scripts/codex_t1_consult_gate.py` | true | true | false | 2 |
| 4 | `.claude/hooks/scripts/codex_t2_pre_commit_gate.py` | true | true | false | 2 |
| 5 | `.claude/hooks/scripts/fm19_artifact_inline_lint.py` | true | true | false | 2 |

## 5. Manifest

Path: `docs/sota-installed-manifest.md`

Parsing rule: table rows are lines containing `|`, excluding separator rows and common header rows.

- Total install rows: 294
- Rows with CR-8 populated by `ADAPTED-FROM-SOTA`, `NOVEL-DOCUMENTED-EXCEPTION`, or `PENDING-AUDIT`: 41
- Rows containing `INSTALLED`: 127
- W164 F36 authoritative denominator: 85
- Pending against denominator 85: 44
- Rows containing `PENDING-AUDIT`: 2

Top-5 lowest-conformance sections:

| Section | Rows | CR-8 filled | PENDING | Conformance |
|---|---:|---:|---:|---:|
| `§Section 13.G1 — Sigstore Registry Trust prerequisite (Wave 134 Fire 44 INSTALLED)` | 1 | 0 | 0 | 0.0% |
| `Section 9 — Browser automation MCPs (mixed status — Playwright installed, Chrome DevTools deferred)` | 2 | 0 | 0 | 0.0% |
| `Section 6.6 — Measurement primitives (per Agent B Task 3 + Agent A row #15)` | 3 | 0 | 0 | 0.0% |
| `Section 13.4 — Autonomous loop primitives (per Agent B Task 3)` | 3 | 0 | 0 | 0.0% |
| `Section 8 — Search + research MCPs` | 4 | 0 | 0 | 0.0% |

## 6. FM-20 Path-Drift Cascade

Path: `.claude/rules/fm20-path-drift-cascade.md`

The numbered origin/promotion ladder table contains:

- Row count: 15
- Row IDs: 1 through 15
- Row-level HEAD SHA cite rows: 1
- File-level HEAD SHA cite lines: 3

HEAD SHA cite locations:

- Header TIER-1 superpowers cite
- Header TIER-1 Karpathy cite
- Row 15 CCBP SessionStart preload mechanism cite

Next sub-class prediction: `[INFERRED]` likely another same-day propagation-boundary drift variant where a persisted operational claim is partly true at one surface and false at another. Pattern basis: recent rows advanced from broad path drift to backend/write asymmetry, stale upstream artifact pins, memory-index-vs-artifact mismatch, and hook-chain measurement drift. The next likely sub-class shape is **multi-surface state-vector drift**, where one verification surface remains current while a sibling surface silently decays and the combined claim propagates as fully verified.

## 7. CR-8 Overall Rule-Line Conformance

Path: `.claude/rules/`

- Nonblank rule body lines: 6,327
- Lines carrying cite-anchor signal (`TIER-1`, `TIER-2`, `TIER-3`, `@ HEAD <40hex>`, `origin:`, `sota-cite:`, `http(s)://`, or `Z:/repos/deps/`): 760
- Estimated CR-8 cite-anchor line coverage: 12.01%

## Summary

Primary gaps:

- Rules: 20 of 64 files lack direct `@ HEAD <40hex>` cites, and 37 files are stale/no-SHA when malformed `@ HEAD` lines are included.
- Skills: only 342 of 5,626 marketplace/local `SKILL.md` files carry `origin:` or `sota-cite:` frontmatter, and none contain `ADAPTED-FROM-SOTA`.
- Hooks: 14 scripts appear DENY/block-capable, but only 6 scripts have exact `test_<name>_security.py` coverage.
- Manifest: CR-8 status is filled on 41 rows; against the W164 F36 denominator of 85, 44 remain pending.
- FM-20: ladder is mature at 15 rows, but only 1 ladder row carries a direct HEAD SHA cite.
