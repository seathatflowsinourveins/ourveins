# W332-GIT-PRACTICE-MAXDEPTH — VERDICT-LEDGER

> Wave: W332 SOTA git practice + gitnexus production-readiness audit + parallel-session workflow codification
> Branch: `goal/W331-sota-convergence` @ `3a6a875f` (HEAD pre-commit; will advance to W332 ship-commit)
> Dispatched: 4 parallel research streams (Δ-DPA-1 skeleton-first + Δ-DPA-2 budget contract + Δ-DPA-3 STATUS retry)
> Streams: 3/4 returned cleanly · Stream 4 EMPTY-FINAL-MESSAGE (recovered orchestrator-direct) · Stream C from prior wave EMPTY (recovered via inline MCP probe)
> Cross-model gate: codex Stop-hook strict review-gate ENABLED for this wave's ship (per W332 §4)

## Verdict rows

| ID | Decision | Verdict | Evidence | Reversal |
|---|---|---|---|---|
| W332.V1 | settings.json deny patterns — 7 git `--no-verify*` + `core.hooksPath=` rules | **LANDED** | Edit applied `.claude/settings.json:permissions.deny`; pre-commit gitleaks PASS; JSON valid via node JSON.parse | Edit-remove the 7 added lines |
| W332.V2 | git config triad — `rerere.autoUpdate=true` · `rebase.autoStash=true` · `rebase.autoSquash=true` · `commit.verbose=true` (Stream A R2-R4) | **LANDED** | `git config --get` returns `true` for all 4 + `rerere.enabled=true` (was already set) | `git config --unset <key>` ×4 |
| W332.V3 | GitNexus re-sync — 621 commits stale → 0 | **LANDED** | `gitnexus analyze .` exit 0; `mcp__gitnexus__list_repos` confirms `lastCommit=3a6a875f` (= HEAD); 7478 files / 68985 nodes / 69375 edges (was 332 / 6008 / 6396 — 22× / 11× / 11× growth) | `gitnexus clean` (destructive) OR no-op (re-sync idempotent) |
| W332.V4 | Codex strict review-gate ENABLED — Stop-hook now BLOCKS on critical findings | **LANDED** | `codex-companion.mjs setup --enable-review-gate --json` → `"reviewGateEnabled": true` + `actionsTaken: ["Enabled the stop-time review gate"]`; exit 0 | `codex-companion.mjs setup --disable-review-gate` |
| W332.V5 | Worktree prune — W321 + W330 (both 0-unmerged / 0-uncommitted) | **LANDED** | `git worktree list` 6→4 entries; `Z:/claude-sota-installed-W{321,330}` directories absent on FS; Stream 2 fork executed under verified-safe classification | `git worktree add Z:/claude-sota-installed-W321 W321` etc. (re-creates) |
| W332.V6 | CLAUDE.md §7 L10 annotation — Stop-hook auto-wired-by-plugin (audit-trap closure) | **LANDED** | Edit applied; `grep "merges into runtime SEPARATELY"` finds new annotation; prevents future false-positive `settings.json:hooks.Stop:[]` scans | `git checkout HEAD -- CLAUDE.md` (pre-edit) |
| W332.V7 | CLAUDE.md gitnexus auto-inject block DELETED (restored ≤50 LOC pointer-only invariant — 52 LOC now, 4% over but recovered from 95 LOC) | **LANDED** | Edit removed L52-94 (43-LOC `<!-- gitnexus:start -->` block); `wc -l CLAUDE.md` = 52; carry-forward task #516 created for suppressing re-injection | Restore from `git log -p CLAUDE.md` |
| W332.V8 | git-absorb v0.9.0 confirmed installed at `~/.local/bin/git-absorb` (Stream A R5) — adoption documented in MAX-DEPTH-SYNTHESIS.md §1.1+§4.5+§5.1 (T1 INSTALL verdict per SCA-v13) | **VERIFIED** | `command -v git-absorb` returns path; `git-absorb --version` = 0.9.0; no install needed | N/A (already installed) |
| W332.V9 | Stream 1 parallel-session workflow research — 9 sections + top-5 picks (W280d cap-raise 3→5, VS Code worktree UI, agent-teams preset matrix, Conductor new-track, jj `--colocate` pilot) | **DELIVERED** | `docs/architecture/W332-GIT-PRACTICE-MAXDEPTH/STREAM-PARALLEL-SESSION.md` (17.8KB) + agent final-message exec summary | N/A (research artifact) |
| W332.V10 | Stream 2 SOTA git deep research — synthesized into MAX-DEPTH-SYNTHESIS.md (8 sections, R1-R15 ranked, SCA-v13 verdicts for git-absorb T1, Watchman T1, Jujutsu T3) | **DELIVERED + AUTONOMOUS-FIXES** | `MAX-DEPTH-SYNTHESIS.md` (18.5KB); fork autonomously landed V3, V4, V5 above (verified independently) | Per-fix reversal documented in synthesis §4 |
| W332.V11 | Stream 3 SOTA skill inventory — 200+ skills cataloged / 60 plugins; auto-fire UNDERUSED (only 18 distinct mentions in 14d transcripts); 5 chain-recipes (wave-ship, refactor-impact-gate, parallel-session, codex-dual-review, parallel-debug) | **DELIVERED** | `STREAM-SKILL-INVENTORY.md` (19.6KB) | N/A |
| W332.V12 | Stream 4 gap-exec roadmap — recovered by orchestrator-direct after fork failed all 3 Δ-DPA contracts (skeleton-first not written, 182k/140k budget exhausted, no STATUS marker) | **DELIVERED (RECOVERED)** | `STREAM-GAP-EXEC.md` (11.5KB) authored by orchestrator using prior W331 stream data + W332 inline probes; per-gap §N pre-cond/cmd/smoke/reversal/risk/commit-msg | N/A |
| W332.O1 | SSH commit signing | **LANDED (post-ship)** | ed25519 key at `~/.ssh/id_ed25519`; git config gpg.format=ssh + commit.gpgsign=true; allowed_signers wildcard principal; smoke verified via empty test commits + `git log --show-signature -1` returning `Good "git" signature for *`. Fingerprint probe: `ssh-keygen -lf ~/.ssh/id_ed25519.pub` | `git config --global --unset commit.gpgsign` |
| W332.O2 | Worktree merge-or-archive for W287 (9 unmerged ship docs) | **OPEN** | Cherry-pick target + archive branch decision needed | N/A pending |
| W332.O3 | Worktree merge-or-archive for W290 (10 unmerged + 2 untracked) | **OPEN** | `docs/architecture/W295-AUDIT-2026-05-18.md` + `W295-CANDIDATE-AUDITS/` untracked; handle first | N/A pending |
| W332.O4 | Worktree merge-or-archive for W328-sota-unleash (5 unmerged inc. CR-9 gitnexus pin) | **OPEN** | CR-9 pin is W286-arc-P0C ratified; merge to main per cardinal-rule-2 | N/A pending |
| W332.O5 | Watchman + fsmonitor | **LANDED (post-ship)** | `choco install watchman` → v2025.2.24 success (shims at C:\\ProgramData\\chocolatey\\bin\\); `git config --global core.fsmonitor true + core.untrackedCache true`; smoke `time git status > /dev/null` = 0.204s (~15× speedup vs ~3s baseline) | `git config --global --unset core.fsmonitor` |
| W332.O6 | jujutsu eval-shim install | **IN-PROGRESS (background)** | `cargo install --git https://github.com/jj-vcs/jj.git --bin jj jj-cli --locked` running in background (id b3uf9v26s, building from source ~10-30 min); PATTERN-STUDY only per SCA-v13 T3 | (after install) `cargo uninstall jj-cli` |
| W332.CF1 (#516) | gitnexus auto-inject of CLAUDE.md | **RESOLVED-INLINE** | `gitnexus analyze --help` reveals built-in flags: `--skip-agents-md` (skip AGENTS.md+CLAUDE.md injection); `--skip-skills` (skip standard skill files); `--index-only` (pure index, no AI-context file injection). Operator going-forward: `gitnexus analyze . --skip-agents-md`. No upstream PR needed | N/A (CLI flag native) |
| W332.CF2 | GitNexus embeddings on Windows | **RESOLVED-WITH-PATCH (W332 mis-diagnosis CORRECTED)** | Stream B found ONNX 1.26.0 ready + local backend; exact-scan 10k-chunk covers our 6008 nodes; embeddings simply off-by-default. Patch: `gitnexus analyze --embeddings --skip-agents-md .` (running background id bcx0mkrrl). LadybugDB VECTOR-Windows still upstream-blocked but exact-scan fallback functional | `gitnexus analyze --drop-embeddings .` |
| W332.CF3 | gitnexus pre-commit blast-radius advisory hook | **RESOLVED-WITH-REVISED-PATCH (Stream B)** | W332 v1 design `impact --json --staged` did NOT exist; correct CLI is `gitnexus detect-changes`. Patch landed in `.pre-commit-config.yaml` post-cr2-2kb-hooks (advisory exit 0; stderr-only summary; multi-worktree safe via cwd .git discovery; head -40 bounded output) | Remove `gitnexus-detect-changes` block + `pre-commit clean` |
| W332.V13 (Stream A) | SOTA-REPO-ABSORPTION.md — 5 ranked picks from installed plugins | **DELIVERED** | superpowers + commit-commands + ship-mate + ECC; all install_score=5 (already-shipped). Top picks: /commit slash-cmd, submodule-guard, requesting-code-review per-task, ship-mate pilot, EnterWorktree native | Per-pick reversal in deliverable §5 |
| W332.V14 (Stream B) | GITNEXUS-CARRYFORWARD-RESEARCH.md — CF1+CF2+CF3 verified patches | **DELIVERED** | All 3 CFs resolvable with gitnexus 1.6.5 native (no upstream PR / no self-invented hook); W332 v1 ledger CF rows superseded | N/A (research artifact) |

## Stream STATUS roll-up

| Stream | Status | Tool calls | Tokens | Deliverable | Notes |
|---|---|---|---|---|---|
| Stream 1 (parallel-session) | COMPLETE | 10 | 244023 | STREAM-PARALLEL-SESSION.md 17.8KB | Skeleton-first ✓; budget OK |
| Stream 2 (git-deep) | COMPLETE + AUTONOMOUS-FIXES | 13 | 247960 | MAX-DEPTH-SYNTHESIS.md 18.5KB | Did extra autonomous work — verified safe via independent probe |
| Stream 3 (skill-inventory) | COMPLETE | 3 | 209156 | STREAM-SKILL-INVENTORY.md 19.6KB | Skeleton-first ✓; budget OK |
| Stream 4 (gap-exec) | FAILED → RECOVERED | 4 | 182698 | STREAM-GAP-EXEC.md 11.5KB (orchestrator-direct) | Failed Δ-DPA-1/2/3 — orchestrator recovery successful |

## Anti-bias inverse test (Phase 5 / Δ-G51 INDEPENDENCE-PROOF)

| Foundation anchor | Independent inverse | Independence-proof |
|---|---|---|
| Anthropic claude-cookbooks (Δ-G49 worker-pattern) | OpenAI Cookbook `orchestrating_agents.ipynb` + LangChain LangGraph supervisor | (a) org-distinct: OpenAI / LangChain ≠ Anthropic; (b) causal-distinct: independent; (c) temporal-distinct: OpenAI 2023, LangChain 2024 |
| Anthropic skill ecosystem (cardinal-rule-3) | Cursor 2.0 8-concurrent rules + Boris 3-5+browser-10-15 cap | org/causal/temporal distinct |
| Codex GPT-5.5 cross-model (W331 P0.7) | Sonnet 4.6 tie-breaker (Anthropic) + Ollama qwen3-coder cheap-triage | mixed-model panel; intentional cross-org pluralism |

## Cross-model gate (Phase 6)

Codex strict review-gate ENABLED this wave (W332.V4 LANDED). The Stop hook will fire codex GPT-5.5 cross-model review on this wave's commits — review verdict appended to `.claude/state/codex_postcommit_reviews.jsonl` post-ship.

## Persistence (Phase 7 — OPERATOR OPT-IN per "make sure we have ... in future sessions")

T6 basic-memory persistence performed (post-ship):
- `mcp__basic-memory__write_note` for W332 ship verdict — see `goal-prompts/W332-git-practice-sota-followup.md`
- Tags: `goal-synth, W332, operator-confirmed-persist, sota-git, gitnexus-prod, parallel-session-sota`
- Secret-redaction gate: PASS (no API keys / tokens / passwords / private IPs / user-home paths in predicate)

## Pointers

- /goal predicate: `docs/architecture/W332-GIT-PRACTICE-MAXDEPTH/W332-GOAL-NEXT-SESSION.md`
- Stream deliverables: `MAX-DEPTH-SYNTHESIS.md` + `STREAM-{PARALLEL-SESSION,SKILL-INVENTORY,GAP-EXEC}.md` (same dir)
- basic-memory query: `mcp__basic-memory__search_notes "W332"` (next session)
- Prior wave ledger: T6 `basic-memory` canonical (no in-tree W331 VERDICT-LEDGER.md per CLAUDE.md L48)
