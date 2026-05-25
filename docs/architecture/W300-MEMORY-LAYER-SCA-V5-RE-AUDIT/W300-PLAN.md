# W300 Wave — basic-memory Re-audit + Memory-Layer SOTA Convergence + Ledger Backfill (sca-v5 LIVE)

> **Wave**: W300 (operator follow-up to W299 — operator's explicit new question: "is basic-memory really good? using sota research gate for assessment of all sota repos, for memory layers and beyond")
>
> **Branch**: `sota-converge-w295` (continued; HEAD `b294932`)
>
> **Why this wave matters**: sca-v5 is now LIVE in production at `.claude/skills/sota-convergence-audit/SKILL.md` (W299 shipped). Operator's W300 mandate is the FIRST application of sca-v5 to a re-audit question. basic-memory's prior verdict (W295 STAY-WITH-HARDENING composite 4.16) used sca-v3.1; under sca-v5's 18-dim rubric + cascade + citation-accuracy + decay-state-machine, the score may change.
>
> **Operator dimensions (W300 verbatim, beyond W299)**:
> 1. "is basic-memory really good?" — DIRECT re-audit question (PRIMARY new ask)
> 2. "using sota research gate for assessment of all sota repos, for memory layers and beyond" — broader memory-layer audit via sca-v5
> 3. (Implied carry) execute W299 action queue items where audit-class work overlaps

## §0 — Pre-flight state

| Component | State |
|---|---|
| HEAD | `b294932` (W299-codex-r1 fix-iterate shipped) |
| sca-v5 LIVE at | `.claude/skills/sota-convergence-audit/SKILL.md` (662 lines) |
| basic-memory T6 prior verdict | W295-BASIC-MEMORY-DEEP-AUDIT.md: STAY-WITH-HARDENING composite 4.16 (sca-v3.1 era) |
| W295 basic-memory ops | AI-3 path-drift CLOSED W297 (config.json EXISTS at env-override) |
| basic-memory `.bmignore` += `*.log` | APPLIED W299 wave-start (closes 1612-error noise) |
| Unledgered W296 T1 verdicts | 5 (claude-agent-sdk-python + spec-kit + uv + serena + mem0) |
| Unledgered W295 candidate-audits | 2 (daytona + OpenHands) |
| Ledger 3-target compliance | 8% (1/12) per W299-D — opportunity for sca-v5 ledger-backfill cycle |

## §1 — Streams (4 parallel; file-ownership disjoint)

| Stream | Type | Scope | File ownership | Done criteria |
|---|---|---|---|---|
| **A** | re-audit | **basic-memory T6 sca-v5 full re-audit** — apply 18-dim rubric (D1-D18 + dual composites + 5-tier ladder + hard-caps) to basic-memory using LIVE evidence (not stale W295-doc-trust). Compare new install_score vs W295 baseline 4.16. Validate W295's STAY-WITH-HARDENING verdict OR surface CHANGE (e.g. SWAP-MODEL if mem0 or letta now dominates at sca-v5 dims; RETIRE-TIER if T6 becomes redundant given new patterns) | `W300-STREAM-A-BASIC-MEMORY-SCA-V5-AUDIT.md` | 18-dim scored; install_score + pattern_score computed; verdict vs W295 baseline; honest source-disagreement log; cardinal-rule self-check |
| **B** | comparison | **Memory-layer SOTA convergence audit** — sca-v5 lite-score 8+ memory-layer alternatives (mem0 + cognee-installed + hindsight-installed + zep + letta + chroma-memory + memgpt + KuzuDB-graph-memory + cogvision + + any 2026-MAY new entrants discovered by Stream C). Head-to-head rank vs basic-memory baseline. Output: per-candidate sca-v5 score table + cross-comparison + KEEP-BASIC-MEMORY vs SWAP-TO-X recommendation | `W300-STREAM-B-MEMORY-LAYER-COMPARISON.md` | ≥8 alternatives lite-scored; head-to-head matrix; cross-candidate trade-off analysis |
| **C** | discovery | **Broader 2026-MAY memory + adjacent SOTA discovery** — multi-MCP cascade (≥6 families per W297-D cascade); target ≥15 NEW candidates for memory-class repos NOT in W288/W291/W293/W296/W299 ledger; plus 5+ "beyond memory" candidates (graph DB, vector store, RAG framework, decision-engine, observability for memory ops). Anti-bias: ≥1 non-USA + ≥1 solo-maintainer + ≥1 <500★ per category | `W300-STREAM-C-BROADER-MEMORY-SOTA-DISCOVERY.md` | ≥15 NEW memory candidates + 5+ adjacent; ≥6 MCP families exercised; multi-channel signal proof |
| **D** | execution | **Ledger backfill 7 W299 unledgered verdicts** — per sca-v5 SKILL.md verdict-ledger 3-target contract; write to `VERDICT-LEDGER.md` (T6 hard-required) + `basic-memory/verdicts/W<wave>-<slug>.md` (T6 hard-required) + hindsight T1 (best-effort). Use the sca-v5 lite-re-audit values from W296 Stream C (the original audit) but re-VALIDATE each under sca-v5 rubric in case any tier changes | `W300-STREAM-D-LEDGER-BACKFILL.md` + edits to `VERDICT-LEDGER.md` + writes to `basic-memory/verdicts/` | 7 verdicts ledger-written; per-verdict sca-v5 re-validation; smoke-test path-existence + content-grep |

**Coordinator (self)**: synthesis → `W300-AUDIT-2026-05-18.md` → codex GPT-5.5 r1 e2e adversarial review → ship-chain commit.

## §2 — E2E codex chain dispatch plan

| Stage | Event | r-id | Status |
|---|---|---|---|
| 0 | Pre-plan review | (skip; small wave) | n/a |
| 1 | Streams dispatch | (none) | NEXT |
| 2 | Coordinator synthesis | r1 | DISPATCH after streams |
| 3 | Ship-chain commit | (none) | post-codex-pass |
| 4 | Optional codex r2 ratification | r2 | only if r1 returns REVISE |

Codex pace target: 1-2 events this wave (memory-focused; lighter than W299 e2e).

## §3 — File ownership

- `W300-PLAN.md` — coordinator (this)
- `W300-STREAM-A-BASIC-MEMORY-SCA-V5-AUDIT.md` — Stream A only
- `W300-STREAM-B-MEMORY-LAYER-COMPARISON.md` — Stream B only
- `W300-STREAM-C-BROADER-MEMORY-SOTA-DISCOVERY.md` — Stream C only
- `W300-STREAM-D-LEDGER-BACKFILL.md` — Stream D only
- `W300-AUDIT-2026-05-18.md` — coordinator post-stream-return
- `W300-CODEX-R1.md` — coordinator post-codex

**Stream D EXCEPTION**: edits `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` (appends 7 rows) + writes to `Z:/claude-sota-installed-state/basic-memory/verdicts/W*-<slug>.md` (7 new files). Per operator's W299 explicit action #3 pre-approval + sca-v5 SKILL.md verdict-ledger contract.

NO stream edits: `CLAUDE.md`, `.claude/settings.json`, `.mcp.json`, `.claude/skills/sota-convergence-audit/SKILL.md` (sca-v5 LIVE; v5.1 deltas deferred to operator approval).

## §4 — Anti-bias mandates (carried)

- Stars NOT a hardgate (D12 caps at 3 when only stars)
- ≥3 organisationally-distinct sources per T1 INSTALL; ≥1 each of {benchmark + code + practitioner}
- 2026-MAY freshness MANDATE
- Multi-MCP discovery cascade per W297-D + W299-B (≥6 MCP families)
- Source disagreements MUST surface in `sources_typed.<dim>.disagreement[]`
- Honest decision-decay state per sca-v5 (W295 verdict is AGING band at wave-5+; W296 verdicts ACTIVE)
- **NEW W300-specific anti-bias**: don't rubber-stamp W295 STAY-WITH-HARDENING; if sca-v5 re-score is materially lower than 4.16, surface CHANGE verdict

## §5 — Cite-anchors

- `W295-BASIC-MEMORY-DEEP-AUDIT.md` — STAY-WITH-HARDENING composite 4.16 baseline (re-litigation target)
- `W297-STREAM-B-MODEL-IN-MEMORY-MATRIX.md` — 6-tier verdicts (T6 KEEP-CURRENT)
- `W297-STREAM-C-LIVE-STATE-REPAIR.md` — Stream C correction (basic-memory config.json EXISTS at env-override)
- `W298-STREAM-G-SILENT-FAILURE-SWEEP.md` — basic-memory `sync_service` 1612-ERROR self-loop (closed W299 .bmignore fix)
- `W299-STREAM-D-DECISION-QUALITY-FEEDBACK.md` — 8% ledger compliance + decision-calibration framework
- `.claude/skills/sota-convergence-audit/SKILL.md` — sca-v5 LIVE rubric (18 dims; cascade; citation-accuracy)
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — 12 historical verdicts (Stream D backfill target)

## §6 — Verification-on-completion

Each stream MUST end with:
- File written + LOC
- ≥3 cite-anchors
- Top 3 findings + confidence levels
- Source-disagreement log
- Cardinal-rule self-check
- Items routed to W300-AUDIT synthesis

Stream A's sca-v5 score MUST replicate the dim-by-dim arithmetic (per W299 codex r1 Q14 honest-replication mandate).
