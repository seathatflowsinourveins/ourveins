# W297 Wave — Live-State Audit + Local-Inference SOTA + Multi-MCP Research-Arch v5

> **Wave**: W297 (operator follow-up to W296 — adds local-inference axis missing from W296's 9-axis enum + closes W296 outstanding operator-AIs + multi-MCP convergence for research-arch evolution).
>
> **Branch**: `sota-converge-w295` (continued — W295/W296 codex-r1 commit chain landed at HEAD `3fc1084`; **9 uncommitted W296 files** in working tree (codex-r1 remediations) — will be committed mid-W297 ship-chain).
>
> **Worktree**: `Z:\claude-sota-installed` (primary). 3 worktrees at goal cap (no new worktree this wave).
>
> **Operator dimensions (verbatim from W297 follow-up)**:
> 1. Current local-model usage status (Ollama qwen3-coder:30b + qwen3-embedding:0.6b loaded? `:16700`)
> 2. SOTA local-model optimization 2026-MAY (llama-swap MTP, ik_llama, vllm, sglang, MLX, exllama, llama.cpp HEAD)
> 3. Their ROLES in the 6-tier memory architecture (T1 hindsight :9077 + T2 memory-MCP + T3 cognee :8000 + T4 graphiti RETIRED + T5 langfuse :3000 + T6 basic-memory)
> 4. Live-state architecture audit (W296 had probe-time misses — langfuse DOWN; basic-memory config MISSING at both paths; Ollama 0 models loaded; cardinal-rule-2 violation `.claude/hooks/context-mode-cache-heal.mjs` PENDING)
> 5. Repo replacement audit at 2026-MAY (W296 surfaced 5 T1 unledgered: `claude-agent-sdk-python`/`uv`/`oraios/serena`/`spec-kit`/`mem0`)
> 6. Research-architecture itself improvement (W296 Stream D sca-v4 designed but UNSHIPPED; operator specifically asks for multi-MCP convergence — perplexity, exa, deepwiki, repomix, context7)
> 7. GPT-5.5 unleashed adversarial review on W297 synthesis

## §0 — Pre-flight state (verified live this wave, NOT trusted from W296 audit-time)

| Component | Expected | LIVE (W297 probe) | Delta vs W296 |
|---|---|---|---|
| hindsight T1 | UP at `:9077` | ✓ UP 200 | matches |
| cognee T3 MCP | UP at `:8000` | ✓ UP (406 = wrong handshake but server live) | matches |
| langfuse T5 | UP at `:3000` | ✗ DOWN (refused — WinError 10061) | **NEW REGRESSION** — W296 §2.5 incumbent state listed ✓ LIVE |
| Ollama daemon | UP at `:16700` | ✓ UP 200 | matches |
| Ollama loaded models | (n/a) | **0 models in VRAM** (qwen3-coder + embed only pulled) | **NEW FINDING** — W296 assumed loaded |
| basic-memory config.json (Z: path) | EXISTS | ✗ MISSING `Z:/claude-sota-installed-state/basic-memory/config.json` | matches W296 AI-3 (still UNFIXED) |
| basic-memory config.json (user-scope) | EXISTS | ✗ MISSING `C:/Users/42/.basic-memory/config.json` | **WORSE than W296 documented** — neither path has config |
| `.claude/hooks/context-mode-cache-heal.mjs` | absent (cardinal-rule-2) | ✓ PRESENT at 1657 bytes + wired at settings.json:99 | matches W296 Stream E CRITICAL |
| settings.json `disabledMcpjsonServers` includes `graphiti` | yes | ✓ present (`memory,github,context7,playwright,graphiti`) | matches AI-5-partial commit `9af4885` |
| settings.json `planning-with-files@planning-with-files` | true (T1 INSTALL) | ✗ false (W295-r30 deactivated pending Phase-5) | matches |
| settings.json `gitnexus@gitnexus-marketplace` | (verdict pending) | ✗ false (DISABLED) | gitnexus marketplace still registered though |
| codex CLI on PATH | UP | (probe failed via subprocess — plugin-managed instead) | needs CLI-vs-plugin route verification |
| uncommitted W296 files | (n/a) | 9 files (+992/-338) | codex-r1 remediations pending commit |

## §1 — Streams (4 parallel, file-ownership disjoint)

| Stream | Type | Scope | File ownership | Done criteria |
|---|---|---|---|---|
| **A** | research (read+web) | **Local-inference SOTA 2026-MAY** — enumerate vllm / sglang / llama.cpp-HEAD / ik_llama / llama-swap / MLX / exllama-v2 / TensorRT-LLM-on-Windows / Ollama-incumbent; characterize each for autonomous-loop fit + memory-layer-LLM fit; close Task #385 llama-swap v199→v215 MTP recipe; rank top-5 by 14-dim sca-v3.1 lite-scoring | `W297-STREAM-A-LOCAL-INFERENCE-SOTA.md` | Top-5 ranked + per-engine fit-matrix + ≥6 source families per candidate (NOT just GitHub) — explicitly use **perplexity / exa / deepwiki / repomix / context7 / web search** for multi-angle convergence per operator W297 dim 6 |
| **B** | analysis (read codebase + W296 state) | **Local-model role mapping in 6-tier memory architecture** — emit matrix of (tier × model × purpose × current_status × replacement_candidate); cover: T1 hindsight (LLM endpoint `:8080/v1` model `qwen36` — what is it? llama.cpp? ik_llama?), T2 memory-MCP, T3 cognee (embeddings + LLM), T4 graphiti RETIRED (was it using qwen3?), T5 langfuse (no model needed), T6 basic-memory (no model directly). Issue verdict per tier: (a) keep current, (b) swap to candidate from Stream A, (c) retire | `W297-STREAM-B-MODEL-IN-MEMORY-MATRIX.md` | Per-tier verdict matrix + reverification-due + ledger-prep for Stream-A top candidates |
| **C** | repair (read + propose fixes; NO destructive ops without operator approval) | **Live-state repair triage** — investigate root causes for: (1) langfuse :3000 DOWN; (2) basic-memory config.json MISSING at BOTH paths; (3) Ollama 0 loaded models (cold-start? VRAM evicted?); (4) cardinal-rule-2 violation `.claude/hooks/context-mode-cache-heal.mjs` (what is it actually doing? load-bearing?); (5) AI-5-finish remnants (`.mcp.json:64-77` graphiti block + historical-migration tool). Propose remediation per issue (one-shot command or yes/no decision); flag destructive ops for operator | `W297-STREAM-C-LIVE-STATE-REPAIR.md` | Per-issue: root cause + proposed fix + risk/cost + operator-approval-needed flag |
| **D** | design (read W296 Stream D + operator new req) | **Research-arch v5: multi-MCP discovery cascade** — operator explicitly requested "via sota research mcp or endpionts, mcps etc. via muti angle research convergences, even perplexity mcp etc". Audit available MCPs for discovery: perplexity (if exists), exa (`mcp__plugin_everything-claude-code_exa__web_search_exa` + `web_fetch_exa` confirmed available), deepwiki (`mcp__deepwiki__*`), repomix, context7, GitHub MCP. Design v5 Stage 1 (Discover) upgrade: cascade these MCPs in convergence pattern; quantify cost-vs-coverage trade-offs; produce ship-blueprint that supersedes W296 Stream D sca-v4 §Stage 1 OR extends v4 to v5. Compatible with W296 Stream D's 11 SHIP-deltas | `W297-STREAM-D-MULTI-MCP-DISCOVERY-CASCADE.md` | (a) MCP capability matrix + (b) v5 Stage-1 cascade spec + (c) decision: ship v4 first then v5, or jump to v5 |

**Coordinator (self)**: synthesis → `W297-AUDIT-2026-05-18.md` → codex GPT-5.5 r1 ratification → operator-action queue → ledger writes for Stream-A-top + Stream-B-verdicts.

**Stream E (codex r1 — fired AFTER A/B/C/D return)**: GPT-5.5 cross-model unleashed adversarial review of W297-AUDIT synthesis; goal = catch W297's own self-bias gaps (W296 missed cardinal-rule-2 violation and basic-memory config gap; W297 must self-detect equivalent blind spots). Produces `W297-CODEX-R1.md` with severity-classified findings; remediation applied as inline `<!-- codex-r1 fix #N -->` markers per W296 pattern.

## §2 — File ownership (no overlap)

- `W297-PLAN.md` — coordinator (this file)
- `W297-STREAM-A-LOCAL-INFERENCE-SOTA.md` — Stream A only
- `W297-STREAM-B-MODEL-IN-MEMORY-MATRIX.md` — Stream B only
- `W297-STREAM-C-LIVE-STATE-REPAIR.md` — Stream C only
- `W297-STREAM-D-MULTI-MCP-DISCOVERY-CASCADE.md` — Stream D only
- `W297-AUDIT-2026-05-18.md` — coordinator (post-stream-return)
- `W297-CODEX-R1.md` — coordinator (post-codex)

NO stream edits `CLAUDE.md`, `.claude/settings.json`, `.claude/skills/sota-convergence-audit/SKILL.md`, `.mcp.json`, `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — those are operator-approval-gated edits done by the coordinator post-codex.

## §3 — Anti-bias mandates (carried verbatim per stream)

- Stars NOT a hardgate — D12 caps at 3 when only stars are present; low-star pattern-rich routes to T3 PATTERN-STUDY not auto-REJECT.
- ≥3 organisationally-distinct sources per T1 INSTALL candidate; ≥1 each of {benchmark with numbers, code reading, practitioner field report}.
- 2026-MAY freshness MANDATE — no pre-2026-Q1 references unless org-canonical-SDK or actively-maintained (commit-velocity >0 in last 60 days).
- ≥3-of-N CHANGE/EVOLVE/INVERT threshold — at least 3 of 4 streams should return non-EVOLVE verdicts to signal anti-confirmatory bias resistance; pure-confirmatory wave triggers operator re-prompt.
- Source disagreements MUST surface in `sources_typed.<dim>.disagreement[]`; silent-average is anti-pattern.

## §4 — Cite-anchors

- `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-AUDIT-2026-05-18.md` — prior wave synthesis (codex-r1 fix-iterate state)
- `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-D-RESEARCH-ARCH-V4.md` — sca-v4 design (Stream D builds on this)
- `docs/architecture/W295-RESEARCH-ARCH-V5/W295-BASIC-MEMORY-DEEP-AUDIT.md` — basic-memory deep audit (Stream C builds on AI-3 there)
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — verdict ledger (Stream A + B emit candidates for ledgering)
- `.claude/skills/sota-convergence-audit/SKILL.md` — sca-v3.1 rubric (current; Stream D may design v5)
- `CLAUDE.md` — cardinal-rule invariants + 6-tier memory
- `CLAUDE.local.md` — Ollama port + local-model env (read-only for streams; gitignored)

## §5 — Verification-on-completion (per dispatching-parallel-agents)

Each stream MUST end with a 200-word self-summary that includes:
- File written + LOC
- ≥3 cite-anchors to W296 stream(s) or external sources
- Top 3 findings/recommendations
- Confidence level (HIGH / MEDIUM / LOW) per finding
- Source-disagreement log (or "none observed")
- Open follow-up items routed to W297-AUDIT synthesis

Coordinator MUST verify each stream's file actually got written + non-empty + matches scope before synthesis (W296 stream-C original stalled at 0 LOC and required parent-replacement; this verification catches that).
