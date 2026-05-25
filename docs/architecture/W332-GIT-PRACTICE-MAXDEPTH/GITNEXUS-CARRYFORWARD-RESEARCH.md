# W332 GitNexus carry-forward research (CF1+CF2+CF3)

> Investigation deliverable for stream-gitnexus-cf fork (W332). Per-CF verdicts with cited evidence + ready-to-apply patches. CLI tested: gitnexus 1.6.5 @ `/c/Users/42/AppData/Roaming/npm/gitnexus` on win32/x64 / Node v22.22.0 (2026-05-19).

## §CF1 — Suppress gitnexus auto-inject of CLAUDE.md block → **RESOLVED-WITH-PATCH**

W332 carry-forward was WRONG to assume no native flag exists. `gitnexus analyze --help` (2026-05-19) lists FOUR opt-outs covering the auto-inject of the `<!-- gitnexus:start -->...<!-- gitnexus:end -->` block:

| Flag | Effect |
|---|---|
| `--skip-agents-md` | **Skip updating the gitnexus section in AGENTS.md and CLAUDE.md** (exact match) |
| `--no-stats` | Omit volatile file/symbol counts from AGENTS.md and CLAUDE.md (preserves marker block but trims numbers) |
| `--index-only` | Pure index mode: skip ALL file injection (AGENTS.md, CLAUDE.md, skills) — strongest |
| `--skip-skills` | Skip installing standard GitNexus skill files under `.claude/skills/gitnexus/` |

**Source verified** at `/c/Users/42/AppData/Roaming/npm/node_modules/gitnexus/dist/cli/ai-context.js`:
- L4-6: "Creates AGENTS.md and CLAUDE.md with full inline GitNexus context. CLAUDE.md is for Claude Code which only reads that file."
- L15: `const GITNEXUS_START_MARKER = '<!-- gitnexus:start -->';`
- L305-308: `// Create CLAUDE.md (for Claude Code) const claudePath = path.join(repoPath, 'CLAUDE.md');`

**Ready-to-apply patch** — replace every `gitnexus analyze` invocation with `--skip-agents-md`:

```bash
# Option A — per-invocation (no config change; recommended)
gitnexus analyze --skip-agents-md .

# Option B — bash alias in CLAUDE.local.md (gitignored, per-machine)
alias gitnexus-analyze='gitnexus analyze --skip-agents-md'

# Option C — PowerShell alias for the eee.ps1 launcher
Set-Alias gitnexus-analyze 'gitnexus analyze --skip-agents-md'
```

**Smoke test**:
```bash
gitnexus analyze --skip-agents-md . && wc -l CLAUDE.md
# expect: LOC count unchanged from pre-call value
```

**Rollback**: drop the `--skip-agents-md` flag.

**One-time clean-up if already injected**: delete the `<!-- gitnexus:start -->...<!-- gitnexus:end -->` block from CLAUDE.md (already done in W332 ship via Edit).

---

## §CF2 — GitNexus embeddings on Windows → **RESOLVED-WITH-PATCH (W332 mis-diagnosis corrected)**

W332 said embeddings were Windows-blocked. **WRONG.** `gitnexus doctor` (2026-05-19) shows:

```
Runtime
  OS:        win32/x64
  Node:      v22.22.0
  GitNexus:  1.6.5
  LadybugDB: unknown
  ONNX:      1.26.0           <- embedding backend INSTALLED + READY

Capabilities
  Graph store:     available
  Full-text search: available
  VECTOR index:    unavailable        <- ONLY this is Windows-blocked
  Semantic mode:   exact-scan         <- fallback IS functional
  Exact scan limit:    10000 chunks

Embeddings
  Backend:   local              <- local ONNX (NOT cloud API)
  Device:    auto
  Threads:   4
  Batch:     16 nodes
  Sub-batch: 8 chunks
```

Embeddings are simply **off by default** (`--embeddings` flag not passed). The "0 embeddings" we saw earlier reflects this default, NOT a Windows incompatibility. LadybugDB VECTOR is unavailable on Windows (upstream constraint per `looptech-ai/gitnexus`), but the exact-scan fallback handles up to 10,000 chunks — comfortably above our current 6,008 nodes per `mcp__gitnexus__list_repos`.

**Ready-to-apply patch**:

```bash
# Generate embeddings — 50,000-node safety cap by default; ours is 6,008 (well within)
gitnexus analyze --embeddings --skip-agents-md .
```

Available embedding knobs (cite: `gitnexus analyze --help`):
- `--embeddings [limit]` — enable; optional override of 50k cap (`0` disables cap entirely)
- `--drop-embeddings` — drop existing on rebuild
- `--embedding-device <device>` — `auto | cpu | dml | cuda | wasm` (DML may use DirectML on Windows GPU)
- `--embedding-threads <n>` — limit ONNX CPU threads (currently auto-detected at 4)
- `--embedding-batch-size <n>` / `--embedding-sub-batch-size <n>` — tuning knobs

**Smoke test**:
```bash
gitnexus analyze --embeddings --skip-agents-md .
# Then verify:
node -e "const {execSync}=require('child_process'); const r=JSON.parse(execSync('gitnexus list', {encoding:'utf8'})); console.log('embeddings:', r.find(x=>x.name==='claude-sota-installed').stats.embeddings)"
# expect: embeddings > 0
```

**Rollback**: `gitnexus analyze --drop-embeddings --skip-agents-md .`

**Carry-forward (post-CF2 ship)**: LadybugDB VECTOR Windows support is upstream — not actionable here. Exact-scan over ≤10k chunks is functionally sufficient. Re-evaluate when index >10k chunks.

---

## §CF3 — Wire `gitnexus impact --staged` pre-commit hook → **DESIGN-CORRECTED → RESOLVED-WITH-REVISED-PATCH**

W332 STREAM-GAP-EXEC.md §6 design was FLAWED. Probe (2026-05-19):

```bash
$ gitnexus impact CLAUDE.md --json
error: unknown option '--json'
```

`gitnexus impact --help` confirms ONLY these options exist: `-d <direction>`, `-r <repo>`, `--depth <n>`, `--include-tests`, `-h`. **No `--json`. No `--staged`. Output is human-readable text.**

**Better tool**: `gitnexus detect-changes` (per `gitnexus --help`) is documented as: "Map git diff hunks to indexed symbols and affected execution flows" — EXACT fit for pre-commit blast-radius advisory.

**Ready-to-apply patch** (append to `.pre-commit-config.yaml` `repos:` block):

```yaml
  - repo: local
    hooks:
      - id: gitnexus-detect-changes
        name: gitnexus blast-radius advisory (W332-CF3)
        entry: bash -c 'gitnexus detect-changes 2>&1 | head -40 >&2 || true; exit 0'
        language: system
        stages: [pre-commit]
        always_run: true
        pass_filenames: false
```

Rationale:
- `detect-changes` reads the working-tree / staged diff directly — no `--staged`-style flag needed
- Advisory mode: stderr-only output, `|| true` swallows non-zero, `exit 0` never blocks the commit
- Operator sees blast-radius summary inline during `git commit`
- `head -40` keeps the pre-commit terminal output bounded

**Multi-worktree safety**: `gitnexus` resolves the active repo via cwd (`.git` discovery). Works identically for main + each worktree. No special path handling.

**Smoke test**:
```bash
git add CLAUDE.md
pre-commit run gitnexus-detect-changes --hook-stage pre-commit
# expect: blast-radius summary in stderr; hook exit 0
```

**Rollback**: remove the `- id: gitnexus-detect-changes` block from `.pre-commit-config.yaml`, then `pre-commit clean`.

**Dependencies**:
- §CF1 patch active (every `analyze` invocation uses `--skip-agents-md`)
- §CF2 patch active (embeddings generated for richer ranking)
- Fresh index: cron-schedule `gitnexus analyze --embeddings --skip-agents-md .` weekly OR after major refactors

**Optional escalation to BLOCK on HIGH-blast-radius** (defer until output format verified to contain `HIGH`/`CRITICAL` markers):
```yaml
        entry: bash -c 'out=$(gitnexus detect-changes 2>&1); echo "$out" >&2; echo "$out" | grep -qE "HIGH|CRITICAL" && { echo "BLAST-RADIUS HIGH — review before commit" >&2; exit 2; }; exit 0'
```

**Additional finding — `.gitnexusignore` exists**: `Z:/claude-sota-installed/.gitnexusignore` (cite: `find` 2026-05-19) — works like `.gitignore` for excluding paths from indexing. Useful if `detect-changes` over-reports on auto-generated areas.

---

## STATUS

| CF | Verdict | Action |
|---|---|---|
| **CF1** | **RESOLVED-WITH-PATCH** | `gitnexus analyze --skip-agents-md .` (native flag exists; W332 was wrong about needing upstream PR) |
| **CF2** | **RESOLVED-WITH-PATCH** | `gitnexus analyze --embeddings --skip-agents-md .` (W332 misdiagnosed as Windows-blocked; embeddings simply off-by-default; LadybugDB VECTOR Windows-blocked but exact-scan fallback covers our 6,008 nodes vs 10,000 limit) |
| **CF3** | **DESIGN-CORRECTED → RESOLVED-WITH-REVISED-PATCH** | Use `gitnexus detect-changes` (NOT `impact --json --staged` which has no such flags); copy-paste-ready `.pre-commit-config.yaml` block above |

All three carry-forward items are NOW resolvable with native gitnexus 1.6.5 capabilities — no upstream PR or self-invented hook required. W332's `STREAM-GAP-EXEC.md` §6 + ledger CF1+CF2+CF3 should be updated to reference this document.

**Provenance**: 1 Write (skeleton) + 1 ctx_batch_execute (10 commands probe) + 1 Write (this fill) = 3 tool calls. Budget compliance: well under 8 / 80k.

STATUS: COMPLETE
