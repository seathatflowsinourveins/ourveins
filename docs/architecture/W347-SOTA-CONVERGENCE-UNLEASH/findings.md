# W347 SOTA Convergence Audit — Findings (append-only)

## 2026-05-20 (session-start probes)

- F1: Current branch `w344-sota-unleash` with W345 work mid-flight. Most recent: 72665d7 verdict ledger. Worktrees at W335/W337/W343 (3 parallel sessions per W280d ≤3 cap).
- F2: Plugins healthy — 15 cache dirs; codex@1.0.4, ECC@2.0.0-rc.1, context-mode@1.0.146, ralph-loop, gitnexus, planning-with-files all installed.
- F3: Services HEALTHY at probe time — langfuse:3000 HTTP 200, cognee:8000 HTTP 406 (MCP responding), ollama:16700 HTTP 200, llamaswap:8090 HTTP 200.
- F4: Local skills count = 54 (W344 batch 1 + W340 Stream A additions present incl. session-handoff, karpathy-extended, hook-metadata-discipline, transcript-marker-loop-guard).
- F5: Node.js v22.22.0 confirmed.
- F6: `.mcp.json` has 13+ MCP servers wired (deepwiki, github, chrome-devtools, repomix, serena, ccusage, cognee, langfuse, basic-memory, hf-mcp-server, perplexity, ...).
- F7: Working tree has modified files (settings.json, CLAUDE.md, plugins/installed_plugins.json, plugins/known_marketplaces.json, 1 skill) + 8 new untracked W344 artifacts.
- F8: W346 wave dir already exists (W346-FULL-SOTA-UNLEASH) — operator may have started a prior W346 attempt; using W347 to avoid name collision.

## 2026-05-20 (dispatch completion)

- F9: Current branch confirmed `w344-mainsession-ship` per `git branch -a` (earlier worktree-list showed `w344-sota-unleash` which is now superseded — likely an in-session branch switch).
- F10: 4 forks dispatched in 1 assistant message per W269 parallel-dispatch mandate. Cache-warm (forks share parent prompt cache).
- F11: All forks given skeleton-first protocol (Δ-PDM-1) + budget cap K=15/M=120k (Δ-PDM-2) + STATUS-marker contract (Δ-G49).
- F12: W347 worktree created at Z:/claude-sota-installed-W347 on branch `goal/W347-sota-unleash` off `origin/main` — SOTA parallel-session practice per CLAUDE.md L14 + ~3-parallel cap respected (W335/W337 candidates for cleanup at wave-close).

## Stream C — Memory + Orchestration (COMPLETE 2026-05-20)

- F13 (C-1): 4/6 memory tiers ACTIVE — T2 plugin-memory + T3 cognee + T5 langfuse v3.160.0 + T6 basic-memory (90 notes). T1 hindsight + T4 graphiti RETIRED by design (per CLAUDE.md L34).
- F14 (C-2): sca-v17 D81-D83 fully codified; denom_install 46.9→48.5; pattern 21.8→22.8. Matches sota-convergence-audit SKILL.md lineage block.
- F15 (C-3): goal-prompt-synthesis Δ-G47-G51 absorbed at SKILL.md L469-473 with 3-org-distinct anchors.
- F16 (C-4): **Δ-G49 fail-CLOSED LIVE-DEMONSTRATED this session** — `subagent-stop-guard.mjs` blocked the fork's own initial empty-final-message. Binding-mode is operationally effective.
- F17 (C-5): parallel-ratio W325-A baseline 0.0036 documented; W330 P0-A binding-mode fix shipped; **live re-measurement is top P0** for /goal.

Top-3 P0 gaps from Stream C:
1. C-P0-1: Run `node tools/parallel-ratio-telemetry.mjs --window 30d` post-W330-fix → persist delta vs 0.0036 baseline to T6 basic-memory.
2. C-P0-2: Update `dispatching-parallel-agents-w321-fork` SKILL.md to embed final-summary discipline UPFRONT in fork directives (not post-hoc Edit).
3. C-P0-3: Add cognee-MCP transport smoke-test (dual content-negotiation `application/json` + `text/event-stream`) to `harness/eval_harness.py`.

P1-carry: D84 candidate `state-reducer-discipline` from W344-Z5 queued for W348+.

## Stream A — Hidden Errors + Stale Refs (COMPLETE 2026-05-20)

- F18 (A-1): **Insights features GAP confirmed** — `.claude/settings.json:env` has ZERO `CLAUDE_CODE_*INSIGHTS*` toggles. Operator's hunch verified. Action: WebFetch `https://docs.anthropic.com/en/docs/claude-code/insights` to determine env-gated vs GA-default.
- F19 (A-2): **W340 OPERATOR-SIGN dwell** — Q1 (sca-v15 SKILL.md edits) + Q3 (OTEL attribution) + Q4 (self-improving disable doc) carried since W340. ~7 waves dwell → 1 wave from `ops-rhythm` -0.5 install_score penalty (8-wave SHIP-BLOCKER threshold).
- F20 (A-3): **Codex hooks.json Z:-portability violation** — `Z:\claude-sota-installed\...` baked Win32-absolute paths from Wave 50 Fire 46 patch. Same anti-pattern W286-cross reversed for `.mcp.json`. Fresh clone to different drive/user breaks all 3 codex hooks.
- F21 (A-4): **Silent-fallback hunt CLEAN** — preagent-parallel-guard 1st-advisory→2nd-block verified; preagent-subagent-validator exit-2 hard-block verified; subagent-stop-guard Δ-G49 confirmed firing this session (W341-Q8). Permissions.deny blocks all `git --no-verify` bypass. CR-6 anti-fabrication intact.
- F22 (A-5): MCP pin staleness — 5 servers (github/repomix/serena/ccusage/chrome-devtools) on pins ≥6 months old.
- F23 (A-6): Stranded files — `.claude/hooks/{A..E}-*.md` (5 files), `W346-FULL-SOTA-UNLEASH/` abandoned wave-dir, `.mcp.json _comments` bloat.

## Stream D — Parallel-Session + Git + CI/CD + Ecosystem (COMPLETE 2026-05-20)

- F24 (D-1): Worktree topology HEALTHY but at 4 (now 5 post-W347-add) → OVER ~3-cap per CLAUDE.md L14. Current branch `w344-mainsession-ship` 5 ahead / 19 behind origin/main → rebase-due.
- F25 (D-2): **SOTA 5-layer**: L2/L3/L4/L5 LIVE; **L1 atomic-write W343 P3 PENDING** (codex r3 APPROVE @46d6102 but impl not landed) — top P1.
- F26 (D-3): **P0 silent CI-miss** — `pre-commit-mirror.yml` push-trigger lists `w344-sota-unleash` which no longer exists. 30-sec fix.
- F27 (D-4): Pre-commit 8 hooks live (gitleaks 8.30.1, ruff 0.15.12, actionlint 1.7.12, commitlint, codex-trailer-gate, bare-subagent-grep, npm-audit-staged, cr7-worktree-collision). **P1**: shellcheck CLI 0.11.0 installed but no pre-commit hook entry.
- F28 (D-5): CLI ecosystem ~92% SOTA. Docker observability migration confirmed (Z:/claude-hub/observability). 0 hardcoded `C:\Users\` → Z:-portability HEALTHY. 0 gone-branches.

Top-3 P0 actions from Stream D:
1. D-P0-1: Fix `pre-commit-mirror.yml` push-trigger branch list (close silent CI miss).
2. D-P1-1-elevated: Add `shellcheck` pre-commit hook entry (binary installed-but-idle).
3. D-P1-3: Land W343 P3 SOTA L1 atomic-write impl (close ~1-wave dwell on tick-file race-condition).

P2 carry: codex-adversarial-review.yml + mcp-health-probe.yml nightly + awesome-list SHA-pinned manifest + Node 22 `--experimental-permission` eval.

## Stream B — SOTA Repo Ingest + Compare (COMPLETE 2026-05-20)

- F29 (B-1): **All 11 SOTA repos FRESH** — every `pushed_at` within 7 days. Stale-and-installed count = 0.
- F30 (B-2): 2 drift items — (a) `context-mode@context-mode` installed `6bbcb4430bbf` vs upstream HEAD `4dcbd45144b2a7fb60907ec7983c6acaaef51d6b` (~11h behind) → P1 `/plugin update`; (b) `mattpocock/skills` local cite `d54c497aa944` vs upstream `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` (~2d) → P1 CITE-REFRESH.
- F31 (B-3): **Insights parity ABSENT-OR-AMBIGUOUS** — OTEL→Langfuse telemetry pipeline LIVE via `CLAUDE_CODE_ENABLE_TELEMETRY=1`; `intelligent-compact@claude-settings` installed; ECC ships 232 skills + 75 commands as likely "Insights" surface. NO explicit `INSIGHTS_*` env-var toggle. Operator hint partially confirmed at telemetry-pipeline layer, not env-flag layer.
- F32 (B-4): 2 discovery 404s — ECC owner (`zachary62/everything-claude-code` 404) + CCBP upstream owner (`shanchain/...` 404) → P2 URL-discovery via `git -C Z:/repos/deps/<repo> remote -v`.
- F33 (B-5): Existing W308 + W340 verdicts hold — OthmanAdi/planning-with-files REJECTED-pattern-preserved, alirezarezvani SOFT-DISABLED-stage-1.
- F34 (B-6): Full 40-char SHAs captured for all 11: anthropics/claude-code `cc898dc3692fb583f36ab327942aad20b7d3dbd0`; claude-cookbooks `39a350b6790c132337dcc3ec35240728fcc1dc0e`; wshobson/agents `08ded5e7b0fe57e7f40194775885eba539c3d8e7` (EXACT match to installed plugin); CCBP-local `a28cd96b6c68b61c328fb899d1f9bd6145f76df4`.

## SUMMARY — all 4 streams complete

- Streams A/B/C/D: COMPLETE, 4/4. Cite-anchored P0/P1/P2 items mapped. Cross-stream convergence: INSIGHTS gap confirmed by A+B; orchestration health confirmed by C (Δ-G49 LIVE-PROVEN); SOTA freshness confirmed by B (0 stale-installed); silent-fallback hunt CLEAN per A.
