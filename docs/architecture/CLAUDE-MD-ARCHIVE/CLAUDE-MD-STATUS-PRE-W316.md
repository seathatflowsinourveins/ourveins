# CLAUDE.md Status Archive — Pre-W316 (archived 2026-05-19 by W317 Stream-A)

> **Purpose**: rolling-3-appendix retention policy preserves current + 2 prior status blocks inline in CLAUDE.md; this file holds W313 (and older waves migrated forward from `CLAUDE-MD-STATUS-PRE-W315.md`).
> **Per-session preload budget saved**: ~6-8KB / ~1.5-2K tokens (W313 block was 7,876 bytes in CLAUDE.md L46 single-line).
> **Cardinal-rule compliance**: R4 project-behavior-in-CLAUDE-md preserved — archive is reference-only, NOT auto-loaded. Pointer in CLAUDE.md L46 directs operator/Claude to this file when historical wave-N detail is needed.
> **Lineage**: forwards from `CLAUDE-MD-STATUS-PRE-W315.md` (which holds W312 + earlier chain — W310-tail · W286-W293 · W280-multi-wave). Both files together cover the full pre-W316 historical record.

## Status (2026-05-19, W313-ship) — W313 SOTA convergence 5-stream parallel sweep SHIPPED per W269/W312-D mandate (5 Agents/1 message = **100% parallel_ratio** this session vs 58.4% measured baseline; ≥0.7 target cleared)

**Stream A HIDDEN-ERRORS P1 config-fixes** (`5a350d1`): 6 dead MCP server blocks excised from `.mcp.json` (16→10 mcpServers) + `disabledMcpjsonServers: []`; findings #4/#6/chrome-devtools-mcp SKIPPED-STALE-OR-INVERTED (autocompact env already removed; 3 "orphan" plugins actually installed; pinned at 0.x-latest 0.26.0; 1.0.1 major-bump = operator decision).

**Stream B T6 verdict population** (state-outside-repo, 4 writes): `W312-othmanadi-planning-with-files` **T3 DEACTIVATE** (course-corrected per W312-codex-r1 row 50 supersession; NOT T1 as row 46 read) + wshobson T2 + mattpocock T2 + GitNexus T3; verdicts 32→36; gitleaks caught literal `sk-lf-` in initial runbook draft, redacted.

**Stream C sca-v7 DRAFT ship-readiness assessment**: **SHIP-WITH-CONDITIONS at W313 → defer to W314+** once 8 AIs close. 6/9 dims D25-D33 PASS 3-org-distinct anchor verification strict; 3 PARTIAL (D27/D31/D32/D33 — AdaRubrics 9★ prototype anchor weakest; recommend swap Anthropic+Perplexity convergence patterns). Arch-itself math reproduces **4.4962** (at floor, NOT 0.05 above as W312-B claimed) — recommend D16 4→5 4th lift for 4.527 margin. 10 v3 invariants ALL preserved · 0 SHIP-BLOCKERs.

**Stream D 8-MCP cascade SOTA discovery**: 12 NET-NEW candidates ($1.40/$3 budget); 5-of-12 are <500★ (anti-bias mandate VALIDATED 4th-time). Top-3 W314 queue: `ikawrakow/ik_llama.cpp` 4.525 (5-10× Ollama-tier speedup) + `agentscope-ai/OpenJudge` 4.325 (Langfuse-native judge-on-judge w/ D16/D17/D18 absorption) + `aelassas/servy` 4.35 (**supersedes NSSM AND WinSW** — both upstream-inactive >12mo). NEW silent-fallback discovered: `mcp__plugin_everything-claude-code_github__search_repositories` returns 0 on 5 well-formed queries (convergent with W312-D F1).

**Stream E NSSM probe + safe cleanups** (`b934908`): Finding #3 **RESOLVED** (basic-memory `:8765/mcp` HTTP 200 + SSE-MCP healthy; 404 was wrong-path probe artifact); #12 RESOLVED (already gitignored); #13 RESOLVED (0 dirs >14d); #11 PARTIAL (.gitignore +3 for CLAUDE.local.secrets); 3 operator follow-ups documented (#2 cognee LLM_API_KEY, #8 OllamaServe Manual, #9 zombies) with **NSSM-deprecation banner** per operator directive.

**Operator W313 directive absorbed**: "no silent fallback, nssm not sota" → W314 P0 NSSM→servy migration audit (Stream D pre-discovered, 4.35 prelim score; full sca-v6.1 audit + service-by-service migration sequence pending).

**VERDICT-LEDGER row 46 OBSOLETE annotation APPLIED** per Stream B operator-AI W313-LEDGER-FIX (row 50 codex-r1 correction remains canonical).

**W310 CUDA crash-loop RCA archived in-tree** (`W310-CUDA-CRASH-LOOP-RCA.md`, untracked → committed this wave): IkLlamaServer registry AppParameters fix at 00:55 (cascaded `--spec-stage` removed + `-c 16384` halved + `--cache-ram 2048`); service stable 6+ min post-fix; GPU 100%→57% util.

**Cardinal-rule invariants**: R1-R5 ✓ · CLAUDE.md ≤50 LOC body ✓ · settings.json 14.8 KB ✓ · worktrees 3/3 ✓ · T6 basic-memory ✓ (36 verdicts; AI-3 FTS5-indexing still open, markdown-grep canonical lookup) · `self_invented_count: 0` ✓ · plugin-native codex GPT-5.5 Stop-hook gate auto-fires at session-end (e2e cross-model ratification per operator directive).

**11 W313 operator-AIs forwarded to W314**: AI-W313-V7-1..8 (sca-v7 ship-conditions) + AI-W313-NSSM-DEPRECATION (NSSM→servy P0) + AI-W313-GITHUB-MCP-FALLBACK (newly discovered MCP silent-fallback) + AI-W313-PARALLEL-RATIO-TELEMETRY (W312-D F4 carry-over).

**W313 docs**: `docs/architecture/W313-V7-SHIP-READINESS/STREAM-{C,D,E}-*.md` (3 stream artifacts ~65KB).

---

## Predecessor archive

For W312-ship + earlier (W310-tail · W286-W293 · W280-multi-wave) see `CLAUDE-MD-STATUS-PRE-W315.md` in this same directory.

For pre-W255 historical record (pre-cleanup self-invented baseline) use `git log --before=2026-05-15`.
