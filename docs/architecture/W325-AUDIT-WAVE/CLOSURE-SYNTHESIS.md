# W325 META-FOUNDATION — Audit Wave CLOSURE SYNTHESIS

[AMBIGUOUS per W329-B + W329-S2-REAUDIT: GH-MCP/HF sub-claim WITHDRAWN per W329-S2-REAUDIT; other sub-claims (hook-channel, parallel-dispatch, transport) RETAIN]

**Ship-date**: 2026-05-19
**Dispatch**: 8 parallel agents in 1 message; `parallel_ratio_per_dispatch` = **1.000** (above W269/W312-D ≥0.7 floor for the dispatch itself)
**Methodology**: per-stream multi-MCP ≥6 source families + 2026-May freshness via `gh api commits/HEAD` + NO repomix-pack on large repos (W321 root-cause)
**Artifacts**: `docs/architecture/W325-AUDIT-WAVE/STREAM-{A..H}-*.md` (8 files; ~71KB total)

## Stream-by-stream headline findings

| Stream | Headline | Severity |
|---|---|---|
| **A** Orchestration silent-fallback v2 | **F1 SEV-1**: parallel_ratio_30d = **0.0034** (172-205x methodology-inflated vs cited 0.587 baseline); operator's flagged "agent team orchestration silent fallback" EMPIRICALLY VALIDATED. F4 root-causes W321: `CLAUDE_CODE_FORK_SUBAGENT=1` inherits full parent transcript → repomix-pack inside fork = ~600K context flood → silent block. F6 confirms codex Stop-hook FAIL-CLOSED (NOT silent). | 1 SEV-1 + 4 SEV-2 + 2 SEV-3 |
| **B** Multi-repo 10-family ingest | 10/10 anchors PASS 2026-May freshness; 9/10 at exact cited SHA + 1 BENIGN drift (mattpocock +4 / context-mode +2). 14 NET-NEW patterns ≥10 target. **B-AI-1 P0**: ECC cite-chain SHAs `b62f8075` + `98bd517451` DO NOT EXIST. **B-AI-2 P1**: W319 H1 wshobson-pivot claim FALSIFIED (ece811f2 is OLDER than 08ded5e7; commit-history direction inverted). | 1 P0 historical + 1 P1 historical |
| **C** sca-v9 → sca-v10 evolution | 4 critique gaps; D42-D45 candidates (multi_mcp_convergence_signal + perplexity_research_signal + codex_round_efficiency + awesome_list_corroboration). **ARIS arXiv:2605.03042 TOP-3 INSTALL** (executor-reviewer cross-model adversarial = DIRECT MATCH to codex GPT-5.5 gate). Denom 33.7→**36.8** install / 14.5→**16.0** pattern (W326-B-1 cascade fix: v9 had off-by-1.0 error 33.7 actual was 34.7; v10 = 34.7+2.1 = 36.8; pattern 16.0 unaffected). | 4 W326-AI |
| **D** Runtime cleanness v8 | 3 HIGH: `claude doctor` EXIT=124 hang (7+ waves; upstream issue) · `tools/migrate-cognee-state.ps1` C:-hardcoded (Z:-portability violation) · commits UNSIGNED. 5 MED + 5 LOW. 10/11 services healthy. `pull.rebase` + `push.useForceIfIncludes` ✓ SOTA match. | 3 HIGH + 5 MED + 5 LOW |
| **E** CLAUDE.md compaction | CLAUDE.md 46,800 B / 49 LOC → SOTA target ≤15 KB / ≤50 LOC. Sibling claude-sota-pure baseline 5,825 B. **APPLIED THIS WAVE**: 46,800 → **13,259 B** (~72% reduction; 39 LOC ≤50 cap); Status archived to `docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-CURRENT-W324.md`. Progress-tracking-out 3-layer SOTA pattern documented (T6 basic-memory + VERDICT-LEDGER + archive snapshots). | APPLIED |
| **F** Coding cookbook | 9 P-block items: 3 HIGH (node:test coverage gate · Python TypeIs in adapters · PWSH Stop discipline 5/13 missing) + 3 MED + 3 LOW. Node 22 `--watch` + Permission Model + ESM-require all unused. Python 3.13 TypeIs/Path.walk/TaskGroup all unused. PWSH 5/13 missing `Stop`. Bash uses `-euo` not `-Eeuo`; no ERR trap. | 3 HIGH + 3 MED + 3 LOW |
| **G** Multi-dim repo discovery | 8-family multi-MCP convergence DEMONSTRATED in stream itself. 11-family proposal (+github-GraphQL + exa-mcp + tavily-mcp + awesome-list-WebFetch). 4 new decision-gates G-1 to G-4. **bytedance/deer-flow 68685★ T1 INSTALL** (SuperAgent harness; MIT; deepwiki confirmed). **Valdecy/pyDecision 350★** closes W316-B Δ30 MCDA stub. 13/15 freshness PASS; METR/HCAST STAGE-0 FAIL (slug-not-canonical). | 5 W326-AI |
| **H** Foundation ecosystem | 19 gaps (3 HIGH / 9 MED / 7 LOW). G1 false-positive (compose at parent `Z:\claude\observability\`). **G3 HIGH**: `mise.lock` doesn't exist; W324 P6 mise.toml created but `mise install` not run (floating-latest risk). G16 ECC 8 hooks disabled, under-leveraged. 13/16 CLI tools installed (81%). CCBP L3 cite `48798ca` matches local clone ✓. | 3 HIGH + 9 MED + 7 LOW |

## Cross-stream convergence

- **F1 + F4 + Stream G** triangulate the agent-team orchestration silent-fallback the operator flagged: empirical parallel_ratio under-enforcement (F1) + fork context-flood (F4) + 5+ wave github-MCP search_repositories silent-fallback (G + W315-W319 historical) all corroborate ONE root system pathology — implicit fall-through paths in the orchestration surface.
- **B + C + G** converge on research-architecture maturity: B's 14 NET-NEW (Anthropic SDK + context-mode + planning-with-files + skills CMA + mattpocock) align with C's sca-v10 D42-D45 ratification and G's pyDecision MCDA wire + deer-flow T1 install.
- **D + F + H** converge on runtime cleanness: D's 3 HIGH align with F's 3 HIGH and H's 3 HIGH (compose/mise.lock/ECC-hooks under-leveraged) — total 9 HIGH foundation hardening items.
- **E APPLIED THIS WAVE** unlocks subsequent preload performance.

## Anti-bias mandate validation (7+ wave)

- Stream B: WithWoz/wozcode-plugin 168★ PATTERN-STUDY recommendation
- Stream C: Autorubric arXiv:2603.00077 T2-CHERRY
- Stream G: Valdecy/pyDecision 350★ T2 + Autorubric T2-CHERRY
- **Stars-as-hardgate violation count: 0** (verified across all 8 streams; stars NOT used as decision gate)
- Multi-dim rubric (D6 + D35 + D38 + D41 + proposed D42-D45) consistently applied

## Codex GPT-5.5 cross-model gate

Per-stream codex round-1 was permitted under operator's "no budget" mandate. Plugin-native Stop-hook auto-fires on session-end per `openai-codex/1.0.4/hooks/hooks.json:24-37 stop-review-gate-hook.mjs` (900s timeout; FAIL-CLOSED per Stream A F6 confirmation) for whole-wave audit synthesis review.

## Cardinal-rule status

- R1-R4 ✓ HOLD
- R5 partial-hold 7+ wave SHIP-BLOCKER carry-forward (operator-decision pending; sca-v9 §6 5-control codified)
- `self_invented_count: 0` ✓ HOLDS (0 new self-invented primitives proposed across 8 streams)
- CLAUDE.md ≤50 LOC body ✓ HOLDS (37 LOC post-E-apply)
- CLAUDE.md ≤15KB target ✓ MET (13,259 B post-E-apply)

## Forward W325-W326 backlog

- **~50 forward AIs** total across 8 streams; **9 P0/P1 priority** (F1 re-baseline + F4 codify + F5 codify + B-AI-1 phantom-SHA purge + B-AI-2 W319 H1 correction + G-1 pyDecision wire + G-2 D44+D45 ratify + deer-flow install + ARIS install)
- /goal predicate authoring (next step): condense ~50 AIs into ≤3800-char paste-ready, codex r1+r2 ratified per goal-prompt-synthesis Phase-5 falsifiable-inverse template.

## Files modified this wave

- **APPLIED**: `CLAUDE.md` (46.8k → 13.3k B; 49 → 39 LOC; Stream E plan)
- **CREATED**: `docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-CURRENT-W324.md` (35.5k B archive)
- **CREATED**: 8 W325-AUDIT-WAVE/STREAM-*.md artifacts (~71k B total)
- **CREATED**: this CLOSURE-SYNTHESIS.md
