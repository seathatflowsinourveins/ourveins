# W349-FULL-SOTA-UNLEASH — findings (consolidated)

> Skeleton seeded 2026-05-20 by W349 synthesis orchestrator. Per-stream findings filled in as deliverables land.

## §1 Stream A — Memory + research-arch ✓ (returned 2026-05-20; 9-20 tool calls; 112k tokens)

**Headline findings** (see `STREAM-A-MEMORY-RESEARCH-ARCH.md` for full):

1. **Live-probe verified**: T3 cognee 1.26.0 LIVE, T5 langfuse 3.160.0 LIVE, T6 basic-memory canonical (1 project `main`, 5 recent-activity rows); T1+T4 RETIRED confirmed via `.mcp.json` grep.
2. **HNF P2**: T2-split plugin-memory KG fallback claim in CLAUDE.md L43 is **NOT REACHABLE** — `mcp__plugin_everything-claude-code_memory__read_graph` does NOT surface in deferred-tool list. Cite-refresh queued.
3. **Three sca-v17 SOTA gaps vs external rubrics**:
   - No BetterBench (Stanford HAI) lifecycle axis (P2)
   - No CHAOSS community-health metric (P1)
   - No OWASP SAMM domain-coverage rubric (P2)
4. **Two methodology gaps vs gpt-researcher / autogen / langgraph**:
   - Conflated Writer+Publisher role in goal-prompt-synthesis (P2)
   - No cross-stream state-graph (P1 — measurable ~20% token waste on parallel-stream context overlap)
5. **CHALLENGER candidates**:
   - **mem0ai/mem0** — 56,286★ FRESH today; fills hindsight-retire passive-extraction gap; forces W281 re-litigation
   - **langgraph supervisor** — STRONGER architecture-challenger via conditional-edge state-graph refactor of fan-out dispatch
6. **Secret-redaction gate (§5) PASS**: codified at `.claude/skills/goal-prompt-synthesis/SKILL.md:420-444` with opt-in + redaction-match + operator-confirmation + anti-regression rule. Runtime-hook hardening proposed as P2 candidate.
7. **D81 catalog drift (P2)**: brave-search + firecrawl wired but NOT in sca-v17 D81 family enumeration (currently 10 named families).

STATUS: COMPLETE. 0 SHIP-BLOCKERS. Carry-forward F3+F8+F6 → W350.

## §2 Stream B — Hooks audit ✓ (returned 2026-05-20; 9/15 tool calls; 107k tokens)

**Headline findings** (see `STREAM-B-HOOKS-AUDIT.md` for full detail):

1. **CR-2 conformance 100%** on `.claude/hooks/**` — only sanctioned 1656-byte `context-mode-cache-heal.mjs` shim (≤2048-byte ceiling per W331-P0.9 `cr2-2kb-hooks` pre-commit gate).
2. **W330 parallel-guard RED baseline CONFIRMED** (§4) — `node tools/test-parallel-guard-w330.mjs` exit 1. Failing assertions: MULTI-STREAM-SOLO-1 (no advisory), MULTI-STREAM-SOLO-2 (exit 0 instead of binding exit 2), WEAK-TERMS-PAIRED-MULTI (no advisory). Root cause: `tools/preagent-parallel-guard.mjs:55-114` `SESSION_ROOT_CANDIDATES` + `findLatestSessionFile` session-file resolution path mismatch in test-mode.
3. **Codex Stop-hook portability YELLOW** — `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:26-37` hard-coded `Z:\` Windows paths bypass `${CLAUDE_PLUGIN_ROOT}` POSIX-form. Confirms W347 P0.3 NEEDS-OPERATOR-TEST.
4. **transcript-marker-loop-guard skill exists but NOT WIRED** — skill at `.claude/skills/transcript-marker-loop-guard/SKILL.md` documents claudekit stateless pattern, but `tools/stop-position-swap.mjs` + `tools/subagent-stop-guard.mjs` use stateful sidecar `tmp/.position-swap-pending-<wave>.json` instead.
5. **gitleaks 8.30.1 + trivy 0.70.0 LIVE**. gitleaks YELLOW — default ruleset doesn't match bare hex AKIA strings without surrounding context. trivy GREEN — fail-closes on HIGH/CRITICAL with PIPESTATUS preservation.
6. **Plugin hooks merge SEPARATELY** (CLAUDE.md L7 W332 audit-trap CONFIRMED): codex `hooks.json` active (Stop + SS/SE), superpowers `hooks.json` active (SS only, portable token), context-mode `hooks.json.disabled-W338-codex-wrap-bug` inactive, everything-claude-code has no CC hooks.
7. **Challenger** (§12): claudekit Hook-Metadata + Zod-validated `getHookConfig<T>()` — already-local skill `hook-metadata-discipline`. Adoption target for W330 regression class.

STATUS: COMPLETE.

## §3 Stream C — SOTA git-tree practice ✓ (returned 2026-05-20; 19 tool calls; 124k tokens)

**Headline findings** (see `STREAM-C-GIT-PRACTICE.md` for full):

1. **§1+§8 (operator naming question) — HYBRID verdict**:
   - **Ledger backbone**: `W<N>` (numeric) for cross-session continuity + sca-v17 row IDs + ops-rhythm dwell + T6 basic-memory permalinks
   - **Branch surface**: `<conventional-prefix>/w<N>-<descriptive-slug>` (e.g. `feat/w349-full-sota-unleash`)
   - **Commit msg surface**: `<conventional-prefix>(W<N> P<priority>): <descriptive>` (e.g. `feat(W349 P0.1): ...`)
   - **Cite-anchor**: Linux Kernel precedent (numeric tags v5.x + semantic mainline/stable/longterm) is the convergent SOTA pattern across Linux Foundation + Conventional Commits + GitFlow.
2. **§2 — Worktree drift**: **5 active worktrees** vs W280d ~3-cap (+67% over). W337/W343/W347 are stale carries — prune recommended.
3. **§3 — Windows atomic-write gap**: NTFS `MoveFileEx` is process-atomic in practice but lacks POSIX formal spec; **W343 P3 rename-atomic pattern required for high-frequency tick-files**.
4. **§4 — CI/CD audit** (20 workflows probed): **65.6% SHA-pinned** (59 of 90 `uses:` lines); **8 workflows at 0% SHA-pin** (W347 P4b incomplete); `provenance.yml:cosign-installer@v3` unpinned = **attestor attack surface**; `ci.yml:trivy-action@master` floating-tag.
5. **§5 — F5-1 HIGH**: **`lefthook.yml` is template-only / DEAD CONFIG** — all hooks commented out. Either delete OR port pre-commit gates to it.
6. **§6 — Pre-commit gate**: 12 gates verified including W331-P0.9 `cr2-2kb-hooks` (L107-113).
7. **§7 — gitnexus**: disabled W340 stage-1; local `local-cypher-codebase` skill is current substitute.
8. **§9 — Challenger**: **Jujutsu (jj)** recommended for future migration trigger (5+ concurrent sessions OR persistent tick-file race); Pijul + Sapling considered and rejected with cite-anchors.

11 actionable findings + 30+ cite-anchors across 8 distinct organizations.

STATUS: COMPLETE.

## §4 Stream D — Upstream drift (CCBP/ECC/anthropics) ✓ (returned 2026-05-20; 11/15 tool calls; 96k tokens)

**Headline findings** (see `STREAM-D-UPSTREAM-DRIFT.md` for full):

1. **anthropics/claude-code HEAD = v2.1.145 (`cc898dc3692f`, 2026-05-19)** — local `minimumVersion=2.1.144` lags by 1 patch.
2. **CCBP `a28cd96b` FRESH at HEAD** (0 commits behind; owner `shanraisshan/claude-code-best-practice` 54k★). CLAUDE.md L3 cite current.
3. **ECC local `2.0.0-rc.1` matches "ECC 2.0 Alpha"** announced in `v1.10.0` release notes; no stable v2.0.0 tag yet.
4. **anthropics/skills FRESH** at HEAD `690f15cac7f7` (includes 2026-05-19 `claude-api` Managed Agents skill update).
5. **wshobson/agents HEAD `08ded5e7b0fe`** has 2026-05-17 fix PR #535 `agent teams coordination guardrails` affecting LOCALLY-ENABLED `agent-teams` plugin — **STALE-FUNCTIONAL; `/plugin update agent-teams@claude-code-workflows` recommended.**
6. **W347 P0.1 INSIGHTS HNF — SPLIT VERDICT**:
   - **SUSTAINED for env-var**: no `CLAUDE_CODE_ENABLE_INSIGHTS` / `CLAUDE_CODE_ENABLE_ANALYTICS` env vars exist. `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` is the closest real env var.
   - **REVERSED for slash command**: `/insights` IS a shipped first-class slash command since ≥v2.1.101, with Time-of-Day chart + report-file output. **9 CHANGELOG mentions across v2.1.2 → v2.1.141.** **This is a runtime-available feature we have NEVER invoked.**
7. **Challenger (NEW upstream features in v2.1.145)**:
   - Stop+SubagentStop hook input now includes `background_tasks` + `session_crons` fields → codex Stop-review gate at `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` should be reviewed to consume these (currently inspects only `transcript_path` + `stop_hook_active`).
   - OTEL `agent_id` + `parent_agent_id` span attrs (v2.1.145) enable subagent trace-parenting in Langfuse T5 v3.160.0 — currently not consumed.

STATUS: COMPLETE.

## §5 Stream E — SOTA repos 8-MCP discovery ✓ (returned 2026-05-20; 7-16 tool calls; 122k tokens)

**Headline findings** (see `STREAM-E-SOTA-REPO-DISCOVERY.md` for full):

1. **wshobson/agents — T1-INSTALL-FRESH**. `claude-code-workflows` marketplace per deepwiki: **80 plugins / 185 agents / 153 skills / 100 commands / MIT**. HEAD `08ded5e7`. **Recommend granular install of 3-5 high-value plugins** (NOT whole marketplace).
2. **MemPalace/mempalace — T3-EVAL-PENDING**. Achieved D81 PASS but lord.technology + HN critiques flag 100%→96.6% claim deflation, macOS ARM64 segfaults, shell injection, stdout-bug-breaking-Claude-Desktop-MCP. **Architectural challenger to T6 basic-memory canonical-primary**. **DEFER**.
3. **alirezarezvani/claude-skills — RETIRE-CONFIRMED**. README claims "313+ skills"; deepwiki probe confirms actual **48** (6.5× overclaim). W330 axis-2 §3.2 verdict re-verified 2026-05-20. **HOLD retire**.
4. **OthmanAdi/planning-with-files — DUPLICATIVE confirmed** (W347 finding held). DOMINATED-BY local `durable-planning-files` skill. **SKIP-install recommended**.
5. **mattpocock/skills — DRIFT-DETECTED**. Local vendor-fork at `d54c497aa944` vs upstream HEAD `b8be62f`. **Cite-refresh queued (low-urgency, W347 P1.3 already on docket).**
6. **addyosmani/agent-skills — EXACT-MATCH** (`f17c6e88` local = upstream HEAD). NO-OP.
7. **anthropics/claude-cookbooks — EXACT-MATCH** (`39a350b6` local cite = upstream HEAD). NO-OP.
8. **Stage-0.5 challengers surfaced**:
   - **thedotmack/claude-mem** — T7 implicit-write memory-tier challenger
   - **ruvnet/ruflo** — agent-teams alternative
   - **safishamsi/graphify** — GitNexus alternative

**Anti-bias check PASS**: each top-10 candidate first-surfaced by ≥1 distinct MCP family.

STATUS: COMPLETE.

## §6 Stream F — Runtime ecosystem ✓ (returned 2026-05-21 01:32Z; 15/15 tool calls; 94k tokens)

**Headline findings** (see `STREAM-F-ECOSYSTEM.md` for full):

1. **Node 22.22.0 LTS — GREEN**: `node:test`, native `fetch`, TLA ESM, V8 12.x Maglev all adopted. 4 test files import from `node:test`. `--experimental-permission` correctly skipped (CC harness owns sandboxing).
2. **Shell mix — GREEN**: 4 `bash -c` + 4 `powershell` hooks (balanced). `BASH_ENV=bash-home-pin.sh` re-pins HOME against MSYS path-rewrite.
3. **Docker — GREEN**: 29.4.3 installed; ZERO MCP penetration (`grep docker .mcp.json` → 0). Used only for Langfuse compose.
4. **CLI inventory — GREEN**: gitleaks 8.30.1, trivy 0.70.0, shellcheck 0.11.0, ruff 0.15.13 all at upstream HEAD. Only drift: lefthook v2.1.4 → v2.1.8 (0.0.4 patch behind, low-priority).
5. **Terminal — GREEN**: Windows Terminal Z:-portable correct.
6. **Insights RE-PROBE — YELLOW (W347 P0.1 HNF REVERSED)**: **6 distinct release-note entries v2.1.101 → v2.1.141 reference `/insights` slash + analytics**. Real shipped feature. **Cross-validated with Stream D — convergence.**
7. **Telemetry — YELLOW (P0 W348 P0.2 confirmed)**: Langfuse 3.160.0 live (HTTP 200), but `OTEL_EXPORTER_OTLP_HEADERS` MISSING → silent 401 trace-drop. **ccusage MCP wired at `.mcp.json:44-48`.**
8. **Security scanners — GREEN**: all 4 at upstream HEAD, 0 CVE exposure.
9. **Overall — GREEN with 2× YELLOW** (§6 needs `/insights` smoke-test; §7 needs OTLP_HEADERS).
10. **Challengers REJECTED**: Bun, Deno 2 + JSR, tsx — all cite-anchored rejected. **Node 22.22.0 LTS is correct SOTA for this runtime.**

**Live probes 2026-05-21 01:32Z**: node v22.22.0, npm 11.9.0, gitleaks 8.30.1, trivy 0.70.0, shellcheck 0.11.0, ruff 0.15.13, docker 29.4.3, langfuse HTTP 200 `{"version":"3.160.0"}`.

STATUS: COMPLETE.

## §7 Cross-stream synthesis (TBD)

## §8 Codex round-1 verdict (TBD)

## §9 Codex round-2 verdict (if any) (TBD)

## §10 Final /goal predicate (TBD)
