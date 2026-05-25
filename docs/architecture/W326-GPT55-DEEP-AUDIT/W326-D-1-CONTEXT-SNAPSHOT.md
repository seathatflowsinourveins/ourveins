# W326-D-1 — Runtime Canonical Context Snapshot (Claude's view)

**Date**: 2026-05-19  **Owner**: W326 Stream D  **HEAD**: `f52aebc`  **Purpose**: Capture the runtime canonical structure Claude (this orchestrator) sees before firing codex GPT-5.5 deep-architecture audit. This snapshot is the substrate against which codex's findings will be anti-bias-gated in W326-D-3.

---

## §1 Architecture invariants (CLAUDE.md L1-L50 body)

- **Body LOC**: 50 (cap 50 — at-cap)
- **Cardinal rules (5)**: R1 trusted-source · R2 plugin/CLI hooks only · R3 upstream subagents · R4 settings.json/CLAUDE.md project-behavior · R5 permissions+sandbox safety
- **Orchestrator**: Claude Code 2.1.144 (Opus 4.7 [1M context])
- **Reviewer**: codex GPT-5.5 via `codex@openai-codex` plugin; Stop-hook auto-fires session-end per `openai-codex/1.0.4/hooks/hooks.json:24-37`
- **Behavioral discipline**: plugin-loaded skills (lazy-load); body kept thin per CCBP `claude-memory.md:34-40`
- **Parallel-execution modes (4)**: subagents · agent-teams · git-worktrees · background-sessions (W325 confirmed `claude --bg` N/A in 2.1.144)
- **Parallel-dispatch target**: `parallel_ratio ≥ 0.7` per multi-stream session (W312-D measured 0.587 baseline)

## §2 Plugin/marketplace state (settings.json)

- **Plugins**: 68 declared / 64 actually installed / 47 enabled (W315-r2 Stream E disambiguation)
- **Marketplaces**: 22 defined / 16 referenced / 18 actual cache-dirs
- **Operator-curated skills**: 33 under `.claude/skills/` (W316 addyosmani-vendor-fork-5 + mattpocock-vendor-fork-6 + parallel-dispatch-mandate + sca-v10 + 26 others)
- **Pre-commit gate**: gitleaks · trivy · ruff · shellcheck · ruff check tools (TaskCompleted)
- **Sandbox**: `enabled: false` · `failIfUnavailable: false` · `allowUnsandboxedCommands: true` (R5 7-wave SHIP-BLOCKER carry; Windows-native NOT supported per W325 Stream C)
- **permissions.defaultMode**: `bypassPermissions` (8-wave convergent finding)
- **statusLine**: ccstatusline npx-pinned (W325 Stream A flagged settings.json:206 path-hardcoded W286-A violation as P0 carryover)

## §3 MCP servers (.mcp.json)

15 live MCP servers wired via CR-9 `npx -y <pkg>@<pinned>` discipline:

| # | Server | Type | Transport | Pin |
|---|---|---|---|---|
| 1 | deepwiki | http | streamable | n/a |
| 2 | chrome-devtools | stdio | npx | @1.0.1 |
| 3 | repomix | stdio | npx | @1.14.0 |
| 4 | serena | stdio | uvx | git+ @249f6b07 SHA |
| 5 | gitnexus | stdio | native CLI | local install (PolyForm-NC) |
| 6 | ccusage | stdio | npx | @18.0.11 |
| 7 | cognee | http | NSSM `:8000/mcp` | Cognee 1.26.0 NSSM service |
| 8 | langfuse | stdio | node (local build) | @v3.170.0 |
| 9 | basic-memory | stdio | uvx | ==0.21.1 |
| 10 | hf-mcp-server | http | streamable | n/a |
| 11 | perplexity | stdio | npx | @0.9.0 |
| 12 | playwright | stdio | npx | @0.0.75 |
| 13 | tavily | stdio | npx | @0.2.19 |
| 14 | exa | stdio | npx | @3.2.1 |
| 15 | (github-MCP plugin-shipped via ECC) | — | — | — |

`disabledMcpjsonServers: []` (memory.exe block excised W308; graphiti block excised W313).

## §4 Memory stack (6-tier per W295/W317)

| Tier | Status | Notes |
|---|---|---|
| T1 hindsight | ✗ RETIRED (W316-S6 codex-ratified) | No NSSM, no LISTEN :9077 |
| T2 memory | split — `.mcp.json:memory` disabled / `plugin:everything-claude-code:memory` ✓ | sqlite_vec local |
| T3 cognee | ✓ NSSM `CogneeMCP` :8000/mcp | data at state-outside-repo |
| T4 graphiti | ✗ RETIRED (W272+W290+W295) | FalkorDB :16379 STOPPED-by-design |
| T5 langfuse | ✓ LIVE v3.170.0 docker | self-hosted :3000 |
| T6 basic-memory | ✓ canonical-primary per W295 | 96 verdicts post-W320 |

**Insights-feature gap (W325 Stream A P0-1)**: `OTEL_EXPORTER_OTLP_HEADERS` ABSENT — CC OTel traces exported but Langfuse silently rejects (0 native CC spans over runtime lifetime).

## §5 Local-model + observability stack

- **LlamaSwap** :8090 NSSM — 7 pre-loaded models (W316-S6)
- **IkLlamaServer** :8080 — CUDA crash-loop resolved W314
- **OllamaServe** :16700 — idle/0-models (W315-r2 CLOSED-INTENTIONAL)
- **Phoenix** :6006 docker — RUNNING per W315-r2
- **Langfuse** :3000 docker — v3.170.0 HEALTHY
- **GPU**: RTX 4090 39% util / 96.7% VRAM (W316-S6 measurement)
- **Observability rack**: grafana / prometheus / nvidia-gpu-exporter EXITED 41h ago per W316-S6 (W317-AI-4 carry)

## §6 Research-architecture sca-v10 (LIVE per W325)

- **Spec**: `.claude/skills/sota-convergence-audit/SKILL.md` (575 LOC)
- **Lineage**: sca-v1 (W269) → v3 (W288) → v5 (W299) → v6 (W310) → v7 (W314) → v7.1 (W316) → v8.1-partial (W319) → v9 (W324) → **v10 (W325)** with 4 new dims D42-D45 (multi_mcp_convergence_signal + perplexity_research_signal + codex_round_efficiency + awesome_list_corroboration)
- **Composite denom (v9)**: 35.3 install / 15.6 pattern (W323 Stream-4 spec; **W325 Stream B detected sca-v9 §7 SKILL.md states 33.7 = 28.7+6×1.0 OFF-BY-1.0 — actual 34.7**; codex-ratify queued W326-AI-1 P0)
- **Tier-floors**: T1 install 4.5 / T2 pattern 4.0 (sca-v9 lifted from T1=4.0 / T2=3.5)
- **Phase-5 5-gate**: provenance + paraphrase + adversarial + contamination + replayable+≥3-org
- **Phase-6 codex round**: plugin-native Stop-hook session-end auto-fire
- **3 W323-4 proposed dims NOT shipped in v9** (R5 §6 PROSE only): supply_chain_attestation + layered_defense_depth + degraded_mode_explicit — W326 carry-AI

## §7 Verdict ledger state

- **VERDICT-LEDGER.md**: 96 verdicts post-W320 (W325 audit-only; no new rows in W325)
- **Cumulative cardinal-rule invariants**: R1-R4 HOLD · R5 PARTIAL-HOLD 8-wave SHIP-BLOCKER · `self_invented_count: 0` HOLDS · CLAUDE.md ≤50 LOC body HOLDS

## §8 Status archive convention (W325 compaction)

- CLAUDE.md body L41-L50 now POINTER-ONLY (was 6-status-mega-appendix)
- Rolling-3 status: `docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-CURRENT-W324.md`
- Pre-W319 status: `CLAUDE-MD-STATUS-PRE-W319.md`
- T6 basic-memory canonical cross-session: `mcp__basic-memory__search_notes "Wave-N"`
- VERDICT-LEDGER.md append-only; pre-W255 history via `git log --before=2026-05-15`

## §9 Live carry-over P0 SHIP-BLOCKERS at W326 entry

1. **R5 8-wave SHIP-BLOCKER** — `bypassPermissions:true` + sandbox `enabled:false`; Windows-native NOT sandbox-supported (per W325 Stream C); Option C 5-control layered-defense paste-ready
2. **SEV-1 Perplexity API key rotation** — W319-SEV1-INCIDENT; key still valid until rotated
3. **sca-v9 §7 install denom math 33.7 → 34.7** off-by-1.0 (Stream B finding; tier-survival re-verified BOTH denoms)
4. **OTEL_EXPORTER_OTLP_HEADERS missing** — Langfuse silently rejecting all CC native spans (W325 Stream A 60-sec fix paste-ready)
5. **claude doctor EXIT-0-silent regression** — 6-wave (was EXIT-124-hang in W312-A.2; now LINES=0 silent; upstream-issue P0)
6. **statusLine block absent** + ccstatusline:206 path-hardcoded (W286-A 6th violation; CCBP-19-field opportunity)
7. **basic-memory v0.21.1 vs v3.3.1 drift** — silent 3-major-version sync gap (W325-r2 P0 carry)

## §10 What I'll ask codex GPT-5.5 to assess

The prompt fired in W326-D-2 will request **ARCHITECTURE-LEVEL** concerns (not file-level) under 5 axes:

1. **Layer-mis-alignment** — are L1 (cardinal rules) · L2 (orchestration) · L3 (memory) · L4 (research/decision) · L5 (install/wire) · L6 (observability) · L7 (safety) coherent? Any anti-patterns?
2. **Missing patterns** — what SOTA pattern (per Anthropic CC + CCBP + ECC + observability/memory/orchestration) is the runtime BLIND to?
3. **Self-reference invariant violation** — are there places the runtime grades itself with a different rule than it grades external candidates? (W295 I9 risk)
4. **R5 mismatch** — is sandbox `enabled:false` + `bypassPermissions:true` actually mitigated by the layered-defense in practice? Empirical evidence?
5. **Carry-forward fatigue** — 8 waves with same P0 SHIP-BLOCKERS — is this a process-failure mode (operator-blocking AI not surfaced loudly enough)?

## §11 Expected codex output schema

5-7 architecture-level concerns. Each:
- **Severity**: CRITICAL / HIGH / MED / LOW
- **Category**: layer-mis-alignment / missing-pattern / self-reference-violation / R5-mismatch / carry-forward-fatigue / OTHER
- **Description**: 2-3 sentence diagnosis with cite-anchor (Anthropic doc URL or CCBP path or canonical SOTA reference)
- **W327+ recommended action**: 1-2 sentence remediation with effort estimate
- **Confidence**: HIGH / MED / LOW
- **Inverse-test**: would this concern apply UNDER a different (counterfactual) runtime architecture? (anti-bias self-check)
