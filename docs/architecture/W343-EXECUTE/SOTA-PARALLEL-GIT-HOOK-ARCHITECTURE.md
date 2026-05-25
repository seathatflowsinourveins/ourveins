# SOTA Parallel Git + Hook-State Architecture — W343 Forward-Looking Design

**Date**: 2026-05-20 | **Source**: W342 closure-synthesis empirical evidence (tick-file race, bypass-marker fallback) | **Scope**: 5-layer architecture for parallel Claude Code sessions + race-free hook state across the Windows POSIX-gap surface.

---

## §0 Problem statement (empirical anchor)

The W341 + W342 waves surfaced a recurring failure mode: **parallel Agent dispatch in ONE assistant message is structurally correct per W269 mandate, but Windows POSIX `fs.appendFile` lacks cross-process atomic-write guarantees**. When PreToolUse[Agent] hooks fire concurrently (one per Agent tool_use block), each Node subprocess appends + reads the shared tick file before its peers' writes have flushed. The 2nd Agent reads `recentTicks=1` (its own only), fails the `recentTicks >= 2` parallel-evidence check, increments counter, and on the 2nd-violation BLOCKs at exit 2.

**Operator-side empirical evidence (W342)**:
- W342 X1-X4 dispatch: X1 succeeded, X2/X3/X4 BLOCKED → bypass-marker required
- W342 Z verify+carry-forward: Z1 succeeded, Z2 BLOCKED → bypass-marker required
- 2/2 observed multi-Agent dispatches in single message hit the race on Windows (small sample; not "100%")
- POSIX (Linux/macOS) untested but per POSIX.1-2017 §3.293 PIPE_BUF should not race

**Z4-FILED fix (Layer 1; W343 P3) — IMPLEMENTATION SHIPPED at commit `bd25142` "feat(w343): Y1 P0.4 rename-atomic + R1-R3 codex closure"** (verified 2026-05-20 W349 Stream-2 meta-audit). The earlier "implementation pending" claim was a stale-doc-drift artifact resolved by the W349 Stream-2 verify-before-claim sweep (CR-6). This doc covers the full **5-layer architecture** for SOTA parallel-session safety; L1 atomic-tick-write is now BASELINE not aspirational. See `docs/architecture/W343-EXECUTE/P3-tick-file-race-fix.md` for design + `bd25142` for ship.

---

## §1 Layer 1: Atomic tick-write primitive (W343 P3 Z4 RECOMMENDED)

**Pattern**: rename-atomic (POSIX `rename(2)` + Windows `MoveFileEx(MOVEFILE_REPLACE_EXISTING)`).

```javascript
// W343 P3 — tools/preagent-parallel-guard.mjs replacement pattern
const tickDir = `${base}/.parallel-guard-ticks-${safeId}/`;
await mkdir(tickDir, { recursive: true });
const tempPath = `${tickDir}.${process.pid}-${Date.now()}-${randomBytes(4).toString('hex')}.tmp`;
const finalPath = `${tickDir}${process.pid}-${Date.now()}.json`;
await writeFile(tempPath, JSON.stringify({ ts: Date.now(), pid: process.pid }), 'utf8');
await rename(tempPath, finalPath);  // OS-atomic on POSIX + Windows

// Reader (race-free)
const ticks = (await readdir(tickDir))
  .filter(f => f.endsWith('.json'))
  .map(f => statSync(join(tickDir, f)))
  .filter(s => Date.now() - s.mtimeMs < TURN_WINDOW_MS);
const recentTicks = ticks.length;
```

**3-org-distinct cite-anchors**:
- **POSIX.1-2017 §3.293** rename atomicity (IEEE/ISO standards body)
- **Windows MoveFileEx** MOVEFILE_REPLACE_EXISTING atomicity (Microsoft Docs: `learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-movefileexa`)
- **libuv `uv_fs_rename`** (Joyent/Node.js Foundation) — Node's underlying primitive

**Cleanup**: TTL sweep — `readdir + mtime > 5min → unlink`. Runs at start of each hook invocation (best-effort, non-blocking).

**Acceptance criteria** (W343 P3 Z4 §6):
1. 4 Agent dispatches in 1 message → all 4 see `recentTicks >= 4` in window → no advisory fired
2. 50-iteration stress test (4 concurrent `node tools/preagent-parallel-guard.mjs` from single bash spawn) → 0 false-positive blocks
3. tick-dir size never exceeds 100 files (TTL sweep verified)
4. Backward-compat: existing W330 8-scenario test harness 8/8 PASS unchanged

---

## §2 Layer 2: Multi-session git worktree topology

**CLAUDE.md L14 W280d already documents** the operator-side patterns. Codifying as SOTA:

| Pattern | Rationale | Cite |
|---|---|---|
| One git worktree per parallel session | Filesystem isolation prevents index-lock collisions | `git-worktree(1)` Junio C. Hamano / Linux Foundation |
| Sanctioned worktree paths: `Z:/claude-sota-installed[-W<wave>]` | Predictable per-wave naming for operator coordination | W272/W273/W280 precedent |
| Rebase-not-merge (linear history) | Eliminates merge-commit noise; preserves wave-attribution | Linus Torvalds rebase-first guidance |
| `git push --force-with-lease` not `--force` | Preserves peer pushes; rejects on diverged remote | GitHub `force-with-lease` documentation |
| ~3 parallel session cap | Cognitive + token budget per CLAUDE.local.md | W280d operator-discipline |
| WorktreeRemove hook auto-prunes | `git worktree prune` after remove | settings.json:204 |

**NEW W343 RECOMMENDATION**: Document per-wave worktree convention in `tools/eee.ps1` launcher — operator runs `eee --wave W343 --branch w343-execute` and launcher auto-creates `Z:/claude-sota-installed-W343` worktree.

---

## §3 Layer 3: Cross-session state coordination

**Current state primitives** (already canonical):
- `tmp/<sid>/` per-session scratch (PreCompact log, codex-review outputs)
- `.claude/state/.parallel-guard-counter-<sid>.json` per-session counter (W341 shared via `parallel-guard-detector.mjs:counterPath()`)
- `.claude/state/subagent-type-allowlist.json` shared FQN registry
- **T6 basic-memory** canonical inter-session memory (`mcp__basic-memory__*`)
- **Langfuse OTEL traces** at `http://127.0.0.1:3000/api/public/otel/v1/traces` cross-session observability
- **ccusage MCP** per-session cost/burn tracking

**W343+ ADD**:
- Cross-session lock-file pattern: `.claude/state/wave-lock-<wave>.json` written at wave-spawn, deleted at wave-close. Prevents 2 sessions accidentally claiming same wave-N.
- T6 basic-memory persist of every wave VERDICT-LEDGER row (per /goal MANDATE — implemented this wave via Z2 stream).

---

## §4 Layer 4: Pre-commit + commit-msg hook race-immunity

**Already-correct patterns** (verified in this wave):
- pre-commit framework stash-and-restore on unstaged changes (handled internally by Yelp/pre-commit per official docs)
- Serial commit-msg hooks (commitlint → codex-trailer-gate → provenance-lint) — one process per commit invocation, no race
- Pre-commit pre-commit-stage hooks serial per file — no concurrent writes

**W343 P3 NEW**:
- PreToolUse[Agent] hooks need atomic tick-write (Layer 1 fix above)
- Optional: codex Phase-6 review subprocess pool for parallel adversarial-review on multi-file diffs (currently serial; W343 P2 docket candidate)

---

## §5 Layer 5: Operator-visible surface

| Surface | Tool | Purpose |
|---|---|---|
| Wave-active session list | `git worktree list` | Confirm no orphaned worktrees from crashed sessions |
| Parallel-dispatch ratio | `node tools/parallel-ratio-telemetry.mjs` | Empirical compliance measurement |
| Plugin/marketplace state | `/doctor` + custom probe | Identify drift, phantom enables, load_failures |
| Per-block cost | `mcp__ccusage__blocks` | Burn-rate monitoring |
| Cross-session memory | `mcp__basic-memory__search_notes` | T6 lookback for prior wave decisions |
| OTEL traces | Langfuse :3000 | Per-step observability for debugging |
| Stop-hook codex review | `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:24-37` (900s timeout) | Session-end auto-fire adversarial review |

---

## §6 Future-session compliance checklist (paste-ready)

When starting a new wave-N session for parallel work:

```
□ git worktree add Z:/claude-sota-installed-W<N> w<N>-execute
□ cd Z:/claude-sota-installed-W<N>
□ Paste /goal predicate with EXECUTION TOPOLOGY (4-stream specified)
□ Dispatch all N Agent calls in ONE assistant message (W269)
□ Each stream cites file:line OR command stdout (CR-6)
□ Orchestrator-apply phase reads stream deliverables, edits atomically
□ Codex Phase-6 review fired pre-commit (W335 trailer)
□ Each closure → VERDICT-LEDGER row + T6 basic-memory write
□ Re-measure parallel_ratio post-wave; expect ≥0.30 floor with Layer 1 fix
□ Remove parallel-guard-bypass.marker (post-wave cleanup) if used
□ Wave-close ritual: /insights → /recap → /ctx-insight → ccusage
□ Commit with Codex-Verdict: APPROVE trailer
□ Optional: merge worktree to main via rebase + push --force-with-lease
□ git worktree remove (WorktreeRemove hook auto-prunes)
```

---

## §7 W343 P0/P1/P2/P3 docket (architecture roll-up)

Priority assignment reconciled with VERDICT-LEDGER §5 + CARRY-FORWARD §3.4 canonical classifications (codex r2 F4 closure):

| Priority | Item | Layer | Effort |
|---|---|---|---|
| P0 | Per-wave worktree convention in `tools/eee.ps1` | L2 | L (1h) |
| P1 | Cross-session wave-lock file pattern | L3 | M |
| P1 | Codex review subprocess pool for parallel adversarial-review | L4 | M (worker_threads or subprocess pool) |
| P2 | Operator-visible parallel_ratio dashboard | L5 | M (HTML report enhancement) |
| P2 | Langfuse OTEL trace decoration for hook-fire events | L5 | L |
| P3 | Layer 1 rename-atomic tick-write (Z4 §5 option b — primary tick-file race fix) | L1 | M (1-2h dev + 50-iter stress) |
| P3 | SQLite WAL fallback if rename-atomic insufficient | L1 | H (overkill; reserve for future stress) |

---

## §8 Cite-anchors (3-org-distinct per W295 I1)

- **POSIX rename**: IEEE/ISO POSIX.1-2017 §3.293 + opengroup.org `pubs/online/9699919799/functions/rename.html`
- **Windows MoveFileEx**: Microsoft Docs `learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-movefileexa` + MS Open Specifications atomicity guarantee
- **libuv async-rename**: github.com/libuv/libuv `src/unix/fs.c` + `src/win/fs.c` (Joyent Node.js Foundation)
- **git worktree**: github.com/git/git Documentation/git-worktree.txt + Linus Torvalds + Junio C. Hamano (Linux Foundation)
- **pre-commit stash semantics**: github.com/pre-commit/pre-commit pre_commit/store.py + pre-commit.com docs (Anthony Sottile / Yelp Open Source)
- **Anthropic Claude Code hooks**: docs.anthropic.com/en/docs/claude-code/hooks + code.claude.com/docs/en/cli-reference

---

## §9 Cross-link

- **Z4 immediate fix**: `docs/architecture/W343-EXECUTE/P3-tick-file-race-fix.md` (Layer 1 detailed implementation)
- **W342 closure context**: `docs/architecture/W342-FULL-GAP-RESOLUTE/ORCHESTRATOR-APPLY-SUMMARY.md`
- **W341 verdict ledger**: `docs/architecture/W341-FULL-SOTA-UNLEASH/VERDICT-LEDGER.md`
- **/goal predicate**: `docs/architecture/W341-FULL-SOTA-UNLEASH/GOAL-W342.md`
- **CLAUDE.md L14 W280d**: parallel-session safety doctrine
- **CLAUDE.md L13 W269/W312-D**: parallel-dispatch mandate + W325-A F1 SEV-1 baseline
- **sca-v15 §6.2**: codex Phase-6 position-swap design
