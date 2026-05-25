# W318-C — Architecture-Layer Synthesis (L1-L8)

> **Wave**: W318 Stream C
> **Date**: 2026-05-19
> **Method**: enumerate 8 runtime architecture layers per `CLAUDE.md` body L9-L14 + actual `.claude/settings.json` + `.mcp.json` + verdicts ledger. Per layer: SOTA-alignment score (1-5), cited reference repos (3 anchors each), improvement vector for W319+.

## §1 — Layer enumeration (per CLAUDE.md L9-L14)

| Layer | Definition | Primary primitive |
|---|---|---|
| **L1 Orchestrator** | Claude Code CLI — plans + edits + synthesizes | `@anthropic-ai/claude-code` v2.1.144 (npm latest 2026-05-19 confirmed W314-r1) |
| **L2 Reviewer** | codex GPT-5.5 cross-model gate | `codex@openai-codex` plugin (1.0.4) Stop-hook auto-fire `stopReviewGate:true` |
| **L3 Behavioral** | Skills auto-fire per `description:` match | 23 local skills + plugin-shipped (everything-claude-code, superpowers, etc.) |
| **L4 Parallel-exec** | 4 modes (subagents · agent-teams · worktrees · background sessions) | Per `https://code.claude.com/docs/en/headless` |
| **L5 Memory** | 6-tier stack T1-T6 per W295 | hindsight + cognee + langfuse + basic-memory + memory-MCP (graphiti RETIRED W295) |
| **L6 Services** | NSSM-managed background processes | cognee :8000, IkLlama :8080, LlamaSwap :8090, langfuse :3000, basic-memory :8765, hindsight :9077 |
| **L7 Eval harness** | inspect_ai + promptfoo + harness-audit + swe-bench-pro | `harness/eval_harness.py` 1700+ LOC |
| **L8 Research arch** | sca-v7.2 SKILL + VERDICT-LEDGER + T6 verdicts | `.claude/skills/sota-convergence-audit/SKILL.md` 1588L + 97 ledger rows |

## §2 — Per-layer SOTA-alignment scoring

### L1 — Orchestrator (Claude Code CLI)

**SOTA score**: **5/5**.

**Anchors**:
1. `anthropics/claude-code` (Anthropic PBC) — canonical orchestrator
2. `https://code.claude.com/docs/en/headless` — official 4-mode parallel-exec doc
3. CCBP `https://github.com/shanjazz-anthropics/best-practice` `@48798ca` — W314 Stream-C cite refresh

**Status**: pinned at v2.1.144 = npm latest (verified W314-r1; chrome-devtools-mcp 0.26.0 also exact-match upstream HEAD).

**Improvement vector W319+**: NONE — orchestrator is upstream-canonical; no replacement candidate at T1-tier passes 3-org anchor verification. Risk: silent-fallback patterns persist (W312-D 29% serial-Agent dispatch in multi-stream contexts; W314-r1 parallel_ratio measured 0.587 vs ≥0.7 target). Mitigation: W319 parallel-dispatch-mandate SKILL.md (operator-AI W314-C paste-ready).

### L2 — Reviewer (codex GPT-5.5 cross-model gate)

**SOTA score**: **5/5**.

**Anchors**:
1. `openai/codex-cli` (OpenAI) — GPT-5.5 review gate plugin
2. Plugin-native Stop-hook at `cache/openai-codex/codex/1.0.4/hooks/hooks.json:24-37` (cardinal-rule-2 compliant — direct upstream-CLI invocation)
3. Anthropic sub-agents doc `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (model-precedence)

**Status**: ACTIVE — plugin-native Stop-hook auto-fires session-end (W312-D §3 verified; W314-r2 settings.json:106 fail-loud refinement applied).

**Improvement vector W319+**: 
- Quarterly judge-on-judge calibration cadence (W314 AI-W312-B-1 deferred) — adds D30 self-cadence ratification
- Position-swap MVP from v5 SKILL.md §"Phase-6" needs operationalization (currently codified but not auto-fired)

### L3 — Behavioral discipline (skills auto-fire)

**SOTA score**: **4/5**.

**Anchors**:
1. Anthropic Skills doc `https://code.claude.com/docs/en/skills` — description-match auto-fire pattern
2. `obra/superpowers` — verification-before-completion + systematic-debugging
3. `addy-agent-skills` / `andrej-karpathy-skills` — source-driven-development + karpathy-guidelines

**Status**: 23 local operator-curated skills + plugin-shipped (everything-claude-code 2.0.0-rc.1, superpowers v5.1.0, etc.). W314-r2 invisible-Unicode safety regression discovered upstream `33ed494a` — `/plugin update` queued W319.

**Improvement vector W319+**: 
- Plugin-version refresh — everything-claude-code 2.0.0-rc.1 → latest at `33ed494a` (W314-r2 AI-r2-1)
- Invisible-Unicode PreToolUse hook (W314-r2 AI-r2-2 cardinal-rule-2-exception anchor)
- `parallel-dispatch-mandate` SKILL.md ship (W314-C paste-ready) — closes 0.587 parallel_ratio gap

**Why 4 not 5**: silent-fallback empirically measured (parallel_ratio 0.584 W312-D baseline; 0.587 W314-r1 re-measure → CLAUDE.md prose mandate is UNENFORCED at SKILL level).

### L4 — Parallel execution (4 modes per W259-v8 U4)

**SOTA score**: **3.5/5**.

**Anchors**:
1. Anthropic agent-teams doc + sub-agents doc — official 4-mode taxonomy
2. CCBP `claude-settings.md` parallel-session safety (W280d ~3-cap)
3. `EnterWorktree`/`isolation:worktree` upstream tool

**Status**: 3-of-3 worktrees at cap (main + W287 + W290 + W272 + W273); subagents wired (`CLAUDE_CODE_FORK_SUBAGENT=1`); agent-teams primitive (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) configured but UNUSED since W289 (W312-D F2 — main-session-lead-only restriction).

**Improvement vector W319+**: 
- parallel_ratio telemetry hook (W314 D-2 deferred + W312-D F4)
- Agent-teams primitive activation experiment (W312-D F2 reopened — Anthropic by-design says no nested teams; could revisit cardinal-rule-3-compliant team patterns)
- Background-session mode `claude --bg` underutilized — could lift codex-review dispatch off interactive critical path

**Why 3.5 not 5**: empirical parallel_ratio 0.587 below 0.7 target; agent-teams underutilized; background-session mode untested at scale.

### L5 — Memory (6-tier T1-T6 per W295)

**SOTA score**: **4/5**.

**Anchors**:
1. `obra/hindsight` (T1, local-fallback :9077) — operator-canonical recall
2. `basicmachines-co/basic-memory` v0.21.1 (T6 canonical) — markdown-FTS5-fallback for verdicts ledger
3. `topoteretes/cognee` (T3) — semantic-MCP knowledge graph at :8000

**Status**: 6 → 3 effective tiers post-W295 audit (graphiti T4 RETIRED in W313; memory-MCP T2 disabled in `.mcp.json` per W286 P0C CR-9 exception; cognee T3 LIVE + NSSM-managed). W314-r1 fs-probe confirmed cognee data-dir at `Z:/claude-sota-installed-state/cognee/...` (cite-refresh applied).

**Improvement vector W319+**:
- Memory stack rename 6→3-effective-tiers (W314-E AI; pending operator confirm)
- T6 basic-memory FTS5-indexing (W313 AI-3) — markdown-grep canonical as workaround
- Service-down vs empty-result distinction in mem-recall (W314-r2 AI-r2-10)

**Why 4 not 5**: 3 tiers RETIRED but `.mcp.json` still has dormant entries; FTS5-indexing not landed; recall-error-class ambiguity persists.

### L6 — Services (NSSM-managed)

**SOTA score**: **3/5**.

**Anchors**:
1. `kirillkovalenko/nssm` — current NSSM v2.24 (INACTIVE upstream >12mo)
2. `winsw/winsw` (Windows Service Wrapper) — alternative (INACTIVE upstream)
3. `aelassas/servy` (W314-D + W315 staged-pilot) — proposed NSSM replacement, T2 VENDOR-FORK score 3.706 per sca-v6.1

**Status**: 5 LIVE services + 1 unexpected-stopped (Ollama :16700) + 3 stopped-by-design (FalkorDB / Phoenix / graphiti retired).

**Improvement vector W319+**:
- **NSSM-replacement staged-pilot** — W314 Stream-D + W315 + W316-S6 in progress (servy 3.706 T2 vs uvx-stdio MCP 20/20 T2-staged) — first-3-migration sequence: LlamaSwap → CogneeMCP → IkLlamaServer per W314-r2 δ
- W298 SEV-1 plaintext `LANGFUSE_SECRET_KEY` in NSSM AppEnvironmentExtra — env-file refactor PREREQ for CogneeMCP migration
- LlamaSwap :8090 documentation closed W317-Stream-A P3c

**Why 3 not 5**: NSSM upstream INACTIVE >12mo (operator "nssm not sota" directive W313); secret-leak class issue (W298) blocks NSSM-CogneeMCP migration; servy 3.706 misses T1 ≥4.0 floor by 0.29.

### L7 — Eval harness (inspect_ai + promptfoo + harness-audit + swe-bench-pro)

**SOTA score**: **4/5**.

**Anchors**:
1. `UKAISI/inspect_ai` (UK AI Safety Institute) — canonical eval framework
2. `promptfoo/promptfoo` — prompt-eval CLI (multi-vendor)
3. `eric-ai-lab/HarnessAudit` (T5 CITE-ONLY per W317-B row 76) + `swe-bench/swe-bench-pro` — eval lane D + E

**Status**: 4 lanes wired in `harness/eval_harness.py` 1700+ LOC; W317-A P3a phantom-finding `eval_harness.py:1632 limit unused` RESOLVED (ruff + pyright both pass clean).

**Improvement vector W319+**:
- Real-eval cadence enforcement (currently lanes wired but invocation cadence not codified)
- Inspect_ai EvalLog at `verdicts/W<wave>-<slug>-evallog.json` (R8 cardinal in v5 SKILL.md) — partial-shipped, needs full canonicalization

**Why 4 not 5**: lanes WIRED but cadence INFORMAL; D7 maintenance_velocity self-eval shows promptfoo PR-merge-velocity has slowed; SWE-bench Verified vs SWE-bench-pro routing not codified.

### L8 — Research architecture (sca-v7.2 + VERDICT-LEDGER + T6 verdicts)

**SOTA score**: **5/5** (under v7.2; **4.527 install_score** per v7.2 arch-itself self-eval, margin +0.027 above ≥4.5 ship-gate path-a conservative).

**Anchors**:
1. `stanfordnlp/dspy` GEPA (Stanford NLP + Databricks) — Pareto-frontier optimization SOTA
2. `addyosmani/agent-skills` (Google Chrome alum) — runtime-as-cadence pattern
3. AutoSOTA `arXiv:2604.05550v1` — 8-agent multi-objective decomposition

**Status**: v7.2 META-DIM ship complete W317 (D36 evolution-pressure-counter + D37 research_arch_sota_alignment, both W=0.0 denom-neutral). v8.1 deltas Δ40-Δ45 DRAFT this wave; W319+ ratify path.

**Improvement vector W319+**:
- **Δ42 D-EMP RATIFY** (from W317-A DRAFT) — closes paper-PASS + smoke-FAIL gap (W316-A canonical)
- **Δ45 D-CCRT** (runtime-pathway-support new dim) — operator-mandated
- **D37 self-lift** from 3/5 to 4-5 (v7.2 → v8.1 via Δ30 dual-track explicit + Δ31 rationale-paired + Δ32 perplexity-wired 8-MCP + Δ33 Borda mandatory cohorts + Δ34 discovery surface 55→67)
- Pre-v8.1 structural refactor (W318-C archaeology #1 hotspot: extract version-history to `SKILL-VERSION-HISTORY.md`; ~600L preload savings)

**Why 5 not 4**: arch-itself install_score under v7.2 clears ship-gate with margin; META-foundation ship complete; v8.1 forward-AI list well-codified. **CAVEAT**: v8.1 projected install_score 4.275-4.288 is BELOW 4.5 ship-gate under full denom expansion (per W318-C-SCA-V8-1-DELTAS.md §6) — partial-ship strategy required.

## §3 — Layer-coupling matrix

| Layer | Couples to | Coupling type |
|---|---|---|
| L1 Orchestrator | L2 + L3 + L4 | Direct (CC invokes reviewer + skills + parallel-exec) |
| L2 Reviewer | L1 + L8 | Dependent (codex reviews L1 output; ratifies L8 rubric ships) |
| L3 Behavioral | L1 + L8 | Dependent (skills auto-fire ON L1 prompts; sca-v7.2 SKILL is L8 manifest) |
| L4 Parallel-exec | L1 | Direct (orchestrator dispatches subagent/team/worktree) |
| L5 Memory | L1 + L8 | Cross-cutting (L1 writes session JSONL; L8 writes verdicts to T6) |
| L6 Services | L5 + L7 + L8 | Infrastructure (memory tiers + eval harness + research-cite-fetch ALL depend on services) |
| L7 Eval harness | L8 | Validation (eval lanes produce L8 ledger evidence) |
| L8 Research arch | L1 + L2 + L3 + L5 | Meta (sca-v7.2 SKILL governs all adoption decisions across layers) |

**Highest blast-radius**: **L8 Research-arch** (couples to 4 layers including L1 Orchestrator). Any L8 rule-version bump (v7.2 → v8.1 → v9) cascades into L1 install decisions, L2 ratify gates, L3 SKILL behavior, L5 ledger schema.

**Lowest blast-radius**: **L4 Parallel-exec** (couples only to L1). Improvement-vector additions are local-only — agent-teams primitive activation experiment cannot break other layers.

## §4 — Aggregate SOTA-alignment score across 8 layers

```
L1 = 5
L2 = 5
L3 = 4
L4 = 3.5
L5 = 4
L6 = 3
L7 = 4
L8 = 5 (under v7.2 ship; 4.527 install_score margin)

Mean: (5+5+4+3.5+4+3+4+5) / 8 = 33.5 / 8 = 4.1875 → rounds to 4.2/5
```

**Interpretation**: **runtime overall is HEALTHY-with-margin** (mean 4.2 above 4.0 healthy threshold). Two layers BELOW 4.0 (L4 parallel-exec 3.5 + L6 services 3) — both have W319 operator-AI improvement vectors queued. No layer below 3.

## §5 — Top-3 W319 P0 architecture-layer-specific recommendations

### P0-A — L6 Services NSSM-replacement staged-pilot (LIFTS L6 FROM 3 → 4)

Execute W316-S6 + W314-r2 δ migration sequence:
1. LlamaSwap :8090 first migration (no prereq — operator-confirmed simple service)
2. CogneeMCP :8000 second — BLOCKED-by-prereq W298 SEV-1 plaintext `LANGFUSE_SECRET_KEY` env-file refactor
3. IkLlamaServer :8080 third

Verdict: servy 3.706 T2-VENDOR-FORK + uvx-stdio MCP 20/20 T2-STAGED. Operator picks at W319 pending smoke-probe of cognee MCP module path.

**Expected L6 SOTA-score lift**: 3 → 4 post-LlamaSwap-migration; → 4.5 post-CogneeMCP; → 5 post-IkLlama.

### P0-B — L4 Parallel-exec parallel_ratio enforcement (LIFTS L4 FROM 3.5 → 4)

Ship `parallel-dispatch-mandate` SKILL.md from W314-C paste-ready draft (`W314-SILENT-FALLBACK-V5-AGENT-TEAM/W314-C-PASTE-READY-MANDATE-REFINEMENTS.md`). SKILL.md fires on operator prompts containing "audit", "review", "research", "sweep", "fan-out", "in parallel", "Stream A/B/C", "investigate" — auto-suggests parallel Agent dispatch when 2+ workstreams.

**Expected L4 SOTA-score lift**: 3.5 → 4 post-SKILL ship; → 4.5 if parallel_ratio measurement crosses 0.7 in next 3-wave audit window.

### P0-C — L8 Research-arch v8.1 partial-ship (HOLDS L8 AT 5; ratifies operator-AIs)

Per W318-C-SCA-V8-1-DELTAS.md §7: **partial-ship Δ42 D-EMP + Δ45 D-CCRT only** at W319. Defer Δ40 + Δ41 + Δ43 + Δ44 to W320+ until arch-itself install_score under partial v8.1 is empirically demonstrated ≥4.5 (projected 4.318 — BELOW; operator-override required per W295 I9).

**Codex round-1 entry**: this DRAFT + W318-C-ARCHAEOLOGY.md + W318-C-EXTERNAL-RUBRICS.md as cite-chain.

**Expected L8 SOTA-score**: HOLDS at 5 if codex round-1 PASS; DROPS to 4 if 3-of-3 external-candidate re-score under v8.1 produces INCONSISTENT verdicts (per W317-A §6.3).

## §6 — Verdict

**8 layers enumerated** with SOTA-alignment 1-5 + 3-anchor each + improvement vectors. **Aggregate 4.2/5 HEALTHY-with-margin**. **W319 P0 recommendations**: 3 layer-specific (L6 services NSSM-replace + L4 parallel-dispatch SKILL + L8 v8.1 partial-ship).

**Highest-blast-radius layer**: L8 (couples to 4 layers including L1). v8.1 ratify-gate decisions affect entire runtime — mandates codex round-N PASS before SKILL.md edit.

**Lowest-blast-radius layer**: L4 parallel-exec — agent-teams experiment + parallel-dispatch-mandate ship are LOCAL improvements with NO cross-layer cascade risk.
