# Stream D — Hidden Errors / Silent Fallbacks / Stale References

**Started:** 2026-05-22T15:42:09-04:00
**Completed:** 2026-05-22T15:46:46-04:00
**Worktree:** Z:/claude-sota-installed-W373 (branch goal/W373-sota-ready)
**Method:** Read-only filesystem + JSONL probe + git probe + .mcp.json/.claude/settings.json/CLAUDE.md cross-check; no file mutations except this report.

---

## Executive Summary

- **14 findings total** (5 HIGH / 6 MEDIUM / 3 LOW); zero PASS-with-clean-bill.
- **parallel_ratio = 0.028 vs target 0.7 → FAIL** (4 / 141 multi-stream sessions over 13d JSONL window; W325-A baseline 0.0036 was a 7-9× improvement floor — the binding-mode gate landed but the empirical metric has barely budged).
- **Worktree cap=5 BREACHED**: 7 live worktrees (operator over W350 GIT-TREE-SOTA §2 cap).
- **CLAUDE.md L20 vs L35 INTERNAL INCONSISTENCY** on `_colliding_bare_count` (L20 says 13, L35 says 14; live = 14) and `_orphaned_fqn_count` (L20 says 38, L35 says 43; live = 43).
- **3 stale pointer files** referenced from CLAUDE.md don't exist on disk (W333-SOTA-UNLEASH/SKILLS-INVENTORY.md tagged "queued" — soft; W329-R5-CORROLLARY-PATCHC1/ACCEPTANCE-RECORD-DRAFT.md tagged "draft" — soft; W254-BEHAVIORAL-LAYER-ARCHITECTURE-2026-05-15.md — HARD MISS).
- **marketplace_dirs claim 23 vs live 22** (L35 off-by-one).
- **L13 exit-code claim "1 exit(2) + 8 exit(0)" STALE** — live parallel-guard.mjs has 3 × `exit(2)` + 11 × `exit(0)` after W342-Z + W343 P0(d) fail-closed upgrade.

---

## Findings (table)

| ID | Type | Subject | Evidence | Risk-class-draft | sca-draft |
|---|---|---|---|---|---|
| W373-D-F001 | parallel_ratio | empirical 0.028 vs target 0.7 → FAIL | 1646 jsonl files (2026-05-09..2026-05-22); 141 multi-stream / 4 multi-Agent-1-msg / 137 serial-multi | HIGH | 1.5/10 (98% serial fallback, gate live but ratio unmoved from 0.0036 baseline) |
| W373-D-F002 | silent-fallback | parallel-guard FAST PATH `recentTicks >= 2` may reset state for legitimate solo-sequence dispatches | L432-446 of preagent-parallel-guard.mjs: any 2 tick-files within 1500ms reset `state.count = 0` | MEDIUM | 4/10 (reduces FN but increases reset-race surface) |
| W373-D-F003 | binding-gate-PASS | parallel-guard exit(2) on 2nd violation present | L500-517: `if (state.count >= 1) { process.exit(2) }` confirmed binding | INFO | 8/10 (gate-code holds; metric does not show effect) |
| W373-D-F004 | binding-gate-PASS | subagent-validator exit(2) on unknown subagent_type | L100-110 `block()` → process.exit(2) | INFO | 8/10 |
| W373-D-F005 | binding-gate-PASS | d73-gate exit(2) on YAML schema violation, ADVISORY on markdown | L246 (yaml); L249-261 (markdown advisory) | INFO | 7/10 |
| W373-D-F006 | binding-gate-PASS | wave-lock-guard --validate exit(2) on collision | L313, L355-358 CLI entrypoint | INFO | 8/10 |
| W373-D-F007 | worktree-cap-breach | 7 worktrees live, cap=5 per CLAUDE.md L14 / W350 §2 | `git worktree list`: main + W362a, W362bA, W362c, W373, W374, W374-EXT = 7 | HIGH | 3/10 (CR-5 / W350 cap policy violated) |
| W373-D-F008 | stale-fact-internal | CLAUDE.md L20 vs L35 _colliding_bare_count internal inconsistency | L20 "13 colliding-bare-names"; L35 W370 footnote "14 (was 13)"; live = 14 | MEDIUM | 4/10 (single-source-of-truth violation within same doc) |
| W373-D-F009 | stale-fact-internal | CLAUDE.md L20 vs L35 _orphaned_fqn_count internal inconsistency | L20 "38 orphaned-FQN preserved"; L35 W370 footnote "43 (was 38)"; live = 43 | MEDIUM | 4/10 |
| W373-D-F010 | stale-fact | CLAUDE.md L35 marketplace_dirs=23 vs live 22 | `ls .claude/plugins/marketplaces/` → 22 entries | LOW | 5/10 (1-dir drift) |
| W373-D-F011 | stale-fact | CLAUDE.md L13 "1 exit(2) + 8 exit(0)" per W341-B Q11 NO-OP | live parallel-guard.mjs: 3 × exit(2) + 11 × exit(0) (W342-Z + W343 P0(d) refactors) | MEDIUM | 4/10 |
| W373-D-F012 | stale-pointer | CLAUDE.md L11 cite `04-wave254-behavioral-layer-2026-05-15/W254-BEHAVIORAL-LAYER-ARCHITECTURE-2026-05-15.md` MISS | file does not exist at claimed path; parent dir `docs/outer research/research-wave-2026-05-15/` exists but no `04-*` subdir found | HIGH | 3/10 (architecture-source cite broken) |
| W373-D-F013 | stale-pointer | CLAUDE.md L31 `W333-SOTA-UNLEASH/SKILLS-INVENTORY.md` MISS | annotated "(queued)" — soft-miss but cite is dangling | LOW | 6/10 |
| W373-D-F014 | stale-pointer | CLAUDE.md L22 `W329-R5-CORROLLARY-PATCHC1/ACCEPTANCE-RECORD-DRAFT.md` MISS | dir exists; file does not. Sibling `R5-COROLLARY-DETAIL.md` does exist (no `-DRAFT` suffix expected) | MEDIUM | 4/10 |
| W373-D-F015 | stale-pointer | CLAUDE.md L20 `W336-CONTINUE/W336-FQN-SUBAGENT-TYPE.md` MISS | annotated "(operator-sign queued)" — soft-miss but cite is dangling | LOW | 6/10 |

---

## parallel_ratio measurement (W373-D-F001)

**Probe:** read all `*.jsonl` in `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/`, count multi-stream sessions, count those with ≥2 Agent tool-use blocks in a single assistant message vs serial.

**Detection regex (mirrors `tools/parallel-guard-regex.mjs`):**
- STRONG_RE: `\b(?:audit|review|sweep|fan[-_ ]?out|in parallel|parallel(?:ly)?|Stream [A-Z]|streams? [A-Z]|workstreams?)\b`
- WEAK_PAIR: at least 2 of `\b(?:investigate|research|verify|analy[sz]e)\b` + `\b(?:multiple|across|compare|several|cross[-_ ]?cut)\b`

**Counts:**
- files_in_dir: 1646
- mtime range: 2026-05-09T17:32:21Z → 2026-05-22T19:45:37Z (≈13d, not 30d — all files within window; all files mtime within 30d cutoff trivially)
- multi_stream_sessions: 141
- multi_agent_one_msg: 4
- serial_multi: 137
- total_agent_calls: 2741
- total_msgs_with_agent: 2731

**parallel_ratio = 4 / 141 = 0.02837 ≈ 2.84%**
**vs target ≥ 0.70 → VERDICT: FAIL**

**Comparison to baselines:**
- W325-A F1 baseline: 0.0036 over 1676 sessions/30d (99.6% silent-serial fallback) = SEV-1
- W373-D-F001 (this probe): 0.028 over 141 sessions/13d = **7.8× improvement vs baseline, BUT 24× short of target**.
- L13 claim "binding `state.count >= 1 → exit(2)` 2nd-violation mode active" is **gate-code-TRUE but metric-empirically-FAIL**. The binding gate has been live since W330 (≈2026-05-19), but only 4 multi-Agent-in-one-msg sessions were observed across 141 multi-stream sessions in the post-binding window.

**Root-cause hypotheses (queued for orchestrator/follow-up):**
1. **Bypass-marker overuse**: CLAUDE.md L14 "2/2 W342 multi-Agent dispatches needed bypass-marker due to Windows POSIX atomic-write gap" — operators may be touching the bypass marker more often than W342 single-incident wording suggests.
2. **UserPromptSubmit `multiStreamIntent` flag missing for headless/Agent-spawned sessions** (parallel-guard-detector.mjs intent-flag depends on UserPromptSubmit hook, which doesn't fire in headless mode).
3. **TURN_WINDOW_MS = 1500ms (W343 R3 tightening from 10s)** — peer Agent dispatches landing >1.5s apart now read as solo even when intentionally parallel-fan-out. The 200ms bounded retry may be insufficient on Windows NTFS.
4. **Multi-stream regex over-triggers on routine `review`/`audit` mentions** in user prompts where solo Agent dispatch is appropriate (e.g., "review this file" → single-target dependent task, not multi-stream).

---

## preagent gate binding-mode audit

| Gate | Mode (exit 0 vs exit 2) | Threshold/Trigger | Risk |
|---|---|---|---|
| preagent-parallel-guard.mjs | DUAL: advisory `exit(0)` 1st violation → `exit(2)` 2nd consecutive | `state.count >= 1` AND multi-stream context AND solo dispatch | binding (W330 P0-A) |
| preagent-subagent-validator.mjs | BINDING: `exit(2)` on unknown subagent_type | not in BUILTIN ∪ allow[] ∪ legacy_bare_aliases[]; soft-fail exit 0 if allowlist file missing | binding (W326 P0-A2) |
| preagent-d73-gate.mjs | DUAL: YAML schema → `exit(2)` strict; markdown → advisory exit 0 | `looksLikeVerdictWriteIntent()` AND newest T1/T1-PROV/T2 ledger row has `<2` non-github first-discoveries | binding for YAML, advisory for markdown (W342-X2) |
| preagent-wave-lock-guard.mjs (--validate CLI) | BINDING: `exit(2)` on FAIL/COLLISION | wave branch lock claimed by different session OR state != active OR ttl_at expired | binding (W363) |

**Test-mode coverage:** parallel-guard has CLAUDE_PARALLEL_GUARD_DISABLE=1 / bypass-marker / FAILOPEN env-var hatches. Subagent-validator has CLAUDE_SUBAGENT_VALIDATOR_FAILOPEN=1 + bypass-marker. D73-gate has CLAUDE_D73_GATE_DISABLE=1 + bypass-marker. **All gates honor CR-5 condition-(b) precedent.** Wave-lock-guard has no env-var hatch — it's an unconditional check.

**Silent-fallback windows discovered:**
- **W343 P0(d) R2 revert at parallel-guard L319-336**: when `findLatestSessionFile` returns null (linked-worktree session encoding mismatch), the guard exits 0 (soft-pass). This is **intentionally fail-open** per codex R2 reasoning (linked-worktree encoded-cwd path is unfindable for non-canonical worktrees like `claude-sota-installed-W373`). **Side-effect: 7 currently-live linked worktrees may all be silently bypassing the guard.**
- **subagent-validator L120-125**: if allowlist file missing/unparsable, exits 0 with stderr warning. Operator-broken-state recovery path; correct fail-open here.
- **d73-gate L266-269**: catch-all soft-fail exit 0 on any error. Same advisory-absent preferred over false-block reasoning.

---

## phantom-enabled / cache-dir mismatches (W342 pattern re-scan)

| Plugin | enabledPlugins? | Cache dir? | Match? |
|---|---|---|---|
| **gitnexus@gitnexus-marketplace** | enabled=false | NO cache dir | "phantom" but enabled=false — **harmless** (W341 phantom flipped to false-leftover entry) |
| **dash0@claude-plugins-official** | NOT IN enabledPlugins | YES cache dir | orphan-cache (unused cached plugin) |
| **security-guidance@claude-plugins-official** | NOT IN enabledPlugins | YES cache dir | orphan-cache (unused cached plugin) |
| _all 47 enabled=true plugins_ | true | YES | clean |

**Verdict:** no enabled=true with missing cache dir; 2 orphan-cache dirs (low risk — cache is auto-cleaned by CC `cleanupPeriodDays=60`); 1 phantom-disabled entry preserved as historical reference. CLAUDE.md L35 claim "load_failures=0" holds at HEAD.

---

## CLAUDE.md stale-fact audit (per-claim)

| Line | Claim | Live state | Match? |
|---|---|---|---|
| L13 | "1 exit(2) + 8 exit(0) calls per W341-B Q11" | parallel-guard.mjs: 3 × exit(2) + 11 × exit(0) | **STALE** (W342-Z + W343 P0(d) refactors changed count) |
| L14 | "current live worktrees: run `git worktree list` to see actuals" + "cap=5 per W350" | 7 live worktrees | **CAP-BREACH (-2)** |
| L20 | "13 colliding-bare-names flagged" | live = 14 | **STALE** (L35 W370 footnote already corrects to 14; L20 not updated) |
| L20 | "38 orphaned-FQN preserved" | live = 43 | **STALE** (L35 W370 footnote already corrects to 43) |
| L20 | "174 FQN entries in allow[]" | live = 174 (`_count: 174`) | MATCH |
| L20 | "138 backward-compat bare entries" | live = 138 | MATCH |
| L31 | "× 63 (W368 P0.1 live re-probe 2026-05-22)" | live = 63 active skill dirs (incl. `_archived`) | MATCH |
| L35 | cache_dirs=15 | live = 15 (source-dirs under cache/) | MATCH |
| L35 | marketplace_records=21 (W370 update) | live = 21 (extraKnownMarketplaces keys) | MATCH |
| L35 | marketplace_dirs=23 | live = 22 (under .claude/plugins/marketplaces/) | **STALE (-1)** |
| L35 | installed_plugin_records=54 | live = 54 | MATCH |
| L35 | enablement_entries=58 (47/11) | live = 58 (47/11) | MATCH |
| L35 | load_failures=0 | no enabled=true missing cache dir | MATCH |
| L35 | "clickhouse@claude-plugins-official + outputai@claude-plugins-official flipped enabled=false" | live: both `false` | MATCH |
| L35 | "10 @claude-code-skills plugins FULLY-RETIRED stage-2 landed" | live: zero `@claude-code-skills` keys remaining in enabledPlugins | MATCH |
| L36 | T1 hindsight RETIRED | NSSM service hindsight not listed; daemon down (per W316-S6 + W317-S1) | not directly probed this stream; trust W316/W317 |
| L36 | T3 cognee LIVE NSSM `CogneeMCP` :8000/mcp | not directly probed (not in stream scope) | trust W314-r1 |
| L36 | T5 langfuse v3.174.1 | `docker ps` → langfuse/langfuse:3.174.1 + langfuse-worker:3.174.1 confirmed | **MATCH** |
| L36 | Phoenix NSSM "service does not exist" per W329-D §3 | not probed (W329-D fact, not in stream scope) | trust W329-D |
| L40 | "pre-commit gate enforced (gitleaks · ruff · shellcheck · cr2-2kb-hooks · msys-hooks-form · z-phantom-guard · bare-subagent-grep · npm-audit · cr7-worktree-collision · wave-lock-validate)" | requires `.pre-commit-config.yaml` probe — not done this stream | DEFER |
| L46 | Status pointer `CLAUDE-MD-STATUS-CURRENT-W324.md` | file exists; **stale-by-name** — W325..W372 snapshots NOT included | **PARTIAL** (file is W324 era; covers earlier waves only) |
| L47 | "root-level VERDICT-LEDGER.md removed W329-D" | confirmed: `ls Z:/claude-sota-installed/VERDICT-LEDGER.md` → not present | MATCH |

---

## Risk-Class Summary

- **HIGH (3)**: F001 parallel_ratio empirical FAIL; F007 worktree cap breach; F012 broken architecture cite.
- **MEDIUM (6)**: F002 reset-race-surface; F008/F009 internal CLAUDE.md inconsistency; F011 stale exit-code claim; F014 missing acceptance-record-draft.
- **LOW (3)**: F010 marketplace_dirs off-by-one; F013/F015 soft-miss queued-pointer files.
- **INFO/PASS (4)**: F003-F006 binding-gate-PASS confirmations.

---

## Verify-Before-Claim attestation

**Independently-reproducible probes used:**
1. `node -e "..."` JSONL-walk over `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/*.jsonl` (1646 files) — counts at parallel_ratio = 4/141 = 0.028 reproducible by re-running the same probe.
2. `git -C Z:/claude-sota-installed worktree list` → 7 entries (cap=5 violation).
3. `node -e "..."` reading `.claude/settings.json:enabledPlugins` map → 58 entries, 47 true / 11 false.
4. `fs.existsSync()` probes for all CLAUDE.md pointer files → 3 MISS confirmed; 14 OK.
5. `docker ps` filter langfuse → `langfuse/langfuse:3.174.1` + `langfuse-worker:3.174.1` confirmed.
6. `cat .claude/state/subagent-type-allowlist.json` → `_count: 174 _legacy_bare_count: 138 _colliding_bare_count: 14 _orphaned_fqn_count: 43`.
7. `cat .claude/state/wave-lock-W373.json` → schema_version=1, wave=W373, state=active, ttl_at=2026-05-29T19:35:06Z.
8. `grep -nE 'process\.exit\(|exit\(' tools/preagent-*.mjs` → parallel-guard 3×exit(2)+11×exit(0); subagent-validator 2×exit(2)+5×exit(0); d73-gate 1×exit(2)+7×exit(0).

**Tools NOT used (out-of-stream scope or unavailable):**
- claudelint: not installed in this worktree (claimed elsewhere; not probed this stream).
- ECC checkers: not run (ECC_DISABLED_HOOKS=pre:observe,post:observe in settings.json suggests ECC is currently disabled for this hook surface).
- T1 hindsight live-probe: out of stream scope.
- pre-commit gate live-probe: out of stream scope (CLAUDE.md L40 list not verified gate-by-gate this stream).

**No file mutated except this report.**
