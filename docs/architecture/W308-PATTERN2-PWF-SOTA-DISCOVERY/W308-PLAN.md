# W308 Wave — Pattern-2 het-ensemble + PWF Phase-5 + 2026-MAY SOTA discovery

> **Wave**: W308 (post-/compact continuation; /goal-acknowledged at HEAD `292cdb3`; actual HEAD `a90e03d` pre-Batch-A; Batch-A shipped `609cba0`).
>
> **Branch**: `sota-converge-w295` (continued; HEAD `609cba0` post-Batch-A: settings.json PreToolUse rollback-review hook + .mcp.json basic-memory uvx-pin + cognee LadybugDB comment + CLAUDE.md R4 reversal + pip claude-agent-sdk 0.2.82).
>
> **Pre-flight state**: 3-of-4 top-4 queue items CLOSED in Batch-A (#1 HIGH + #3 MED + #4 MED). Top-4 #2 OpenSpace adoption decision folded into W308-Stream-C.
>
> **Streams**: 3 parallel-Agent fan-out + codex r1 e2e per W296-W306+W307 pattern.

## §0 — Batch-A closures applied this wave (pre-stream dispatch)

| Top-4 # | Severity | Action | Commit | Verification |
|---|---|---|---|---|
| #1 | HIGH | settings.json PreToolUse +10-LOC matcher (destructive git ops → codex adversarial-review --wait) | `609cba0` | hook smoke PASS on non-destructive Bash; codex-companion.mjs adversarial-review subcommand verified via --help |
| #3 | MED | basic-memory .mcp.json uvx pin (==0.21.1) + claude-agent-sdk 0.1.33→0.2.82 + cognee LadybugDB disambiguation comment | `609cba0` | uvx smoke PASS (`Basic Memory version: 0.21.1`); pip show 0.2.82; cognee/pyproject.toml grep confirmed `ladybug==0.16.0` runtime dep |
| #4 | MED | CLAUDE.md R4 cardinal-rule REVERSAL — `.claude/rules/*.md` permitted with upstream-plugin OR operator-curated path-gated whitelist | `609cba0` | CLAUDE.md = 42 LOC (≤50 invariant); `self_invented_count: 0` preserved |
| #2 | MED | OpenSpace HKUDS adoption T1/T2/T3 verdict | DEFERRED | folded into W308-Stream-C |

## §1 — Streams (3 parallel)

| Stream | Type | Scope | File ownership | Done criteria |
|---|---|---|---|---|
| **A** | smoke-test (execution) | **Heterogeneous-model Pattern-2 ensemble smoke** — closes W306-codex-r1 HIGH same-model-degeneracy finding. Dispatch 3 DIFFERENT-source judges (Claude Opus 4.7 + codex GPT-5.5 + a 3rd via varied-prompt perturbation OR a different family if accessible) on ONE concrete artifact (e.g., `W307-SYNTHESIS-2026-05-18.md` synthesis quality OR Batch-A `609cba0` diff review). Measure verdict-distribution σ²; cost/latency profile. Validates whether multi-judge ensemble adds true ROI vs degenerate same-model self-consistency | `W308-STREAM-A-HET-ENSEMBLE-SMOKE.md` | 3-judge smoke PASS or DEFENSIBLE-NEGATIVE; σ² measured + reported; cost-cap discipline observed; W306-codex-r1 HIGH finding addressed |
| **B** | governance audit | **`OthmanAdi/planning-with-files` Phase-5 mandatory re-litigation** (W305-C AI-1; 9+ waves pending per W307-SYNTHESIS §4). Re-apply strict sca-v5 Phase-5 Gate-3 (star-anchor bias check) + Gate-5 (≥3 organisationally-distinct typed-evidence test). W291.Stage2 verdict was T1 INSTALL 4.67/4.68 with 3-persona APPROVE; W295-r30 DEACTIVATED; W296 commit `2bf2d27` silently re-enabled WITHOUT Phase-5 evidence (W299-D finding). SKILL.md:346 retroactive carve-out blocks auto-supersedence. Verdict: RATIFY (re-confirm T1 INSTALL with evidence) OR DEACTIVATE (downgrade to T3 PATTERN-STUDY + remove from settings.json:enabledPlugins) | `W308-STREAM-B-PWF-PHASE5-RELITIGATION.md` | Phase-5 Gate-3+Gate-5 audit with evidence; ratify-or-deactivate verdict; cite W291.Stage2 + W295-r30 + W296 `2bf2d27` + W299-D + sca-v5 SKILL.md §4 Phase-5 anchor; operator-action recommendation |
| **C** | sca-v5 discovery + audit | **2026-MAY broader SOTA discovery** ≥20 NEW candidates beyond W288/W291/W293/W296/W297/W298/W299/W300/W301/W302/W303/W304/W306/W307 cumulative 100+ catalogue. Multi-MCP cascade ≥6 families (exa + deepwiki + repomix + github + context7 + websearch + basic-memory). Anti-bias EXCEEDED: ≥3 non-USA + ≥3 solo + ≥5 <500★. Lite sca-v5 score (composite + top-2 hard-cap flags + suggested tier). PLUS: full sca-v5 audit of `HKUDS/OpenSpace` (T1⚠ candidate per W304 + W305-D verification; 2.7k★ MIT; 46% token reduction + 4.2× GDPVal per Q1 2026 paper; layer-above-static-skills self-evolving engine). Cross with W304-D skill verdicts (11 KEEP + 9 REFINE + 2 RETIRE). | `W308-STREAM-C-SOTA-DISCOVERY-OPENSPACE.md` | ≥20 NEW candidates lite-scored; anti-bias quotas hit; OpenSpace T1/T2/T3 verdict with 3-persona-equiv adversarial summary; cross-link to W304-D skill cohort |

**Coordinator (self)**: synthesis → `W308-AUDIT-2026-05-19.md` → codex r1 e2e per operator persistent `use gpt5.5 proactively` mandate → ledger-write 3-target contract (T6 basic-memory + VERDICT-LEDGER.md + hindsight T1 best-effort).

## §2 — File ownership

- `W308-PLAN.md` — coordinator (this)
- 3 `W308-STREAM-*` files — per-stream (one file each)
- Stream A may invoke `codex` CLI subprocess for the second judge; no state-mutating file edits outside its own stream file
- Stream B writes verdict file only; if RATIFY then no settings.json edit needed (already enabledPlugins:true); if DEACTIVATE then PROPOSE settings.json edit but DEFER actual edit to coordinator-merge with operator visibility
- Stream C writes discovery + audit file only; no plugin installs (RECOMMEND-only verdicts per W307 §6 R1)
- `W308-AUDIT-2026-05-19.md` — coordinator
- `W308-CODEX-R1.md` — coordinator (codex GPT-5.5 e2e gate output)

## §3 — Anti-bias mandates (carried per operator persistent)

- sca-v5 multi-MCP cascade (≥6 families per C; ≥3 for A+B since execution/governance-class)
- Honest verdicts — Stream A may surface "het-ensemble adds noise not signal"; Stream B may surface "ratify-with-caveats" mid-tier; Stream C may surface ≥1 universal-REJECT
- 2026-MAY freshness MANDATE
- Source disagreements MUST surface in `sources_typed.<dim>.disagreement[]` (sca-v5 contract)
- Stars NOT a hardgate — D12 caps at 3 stars-alone; D6 uses Bayesian author-prior

## §4 — Cite-anchors

- W306-AUDIT §4 (top-4 queue source); W306-codex-r1 HIGH judge-degeneracy (Stream A source)
- W307-SYNTHESIS-2026-05-18.md §4 (operator-action queue carry-forward; PWF item)
- W305-STREAM-C-PWF-GOVERNANCE.md (Stream B source)
- W295-r30 PWF deactivation; W296 `2bf2d27` silent re-enable; W299-D calibration audit finding
- `.claude/skills/sota-convergence-audit/SKILL.md` (sca-v5 LIVE rubric; §4 Phase-5 anchor for Stream B; §4.5 R8 EvalLog for Stream A measurement)
- W304-STREAM-D-LOCAL-SKILLS-AGENTS-AUDIT.md (Stream C cross-coordination for OpenSpace verdict)
- W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md (Stream C verdict append; 18-row backfill state)
- CLAUDE.md:13 W269 mandate (agent-teams + parallel-Agent fan-out discipline)

## §5 — Verification-on-completion

Each stream MUST end with:
- File written + LOC
- ≥3 cite-anchors (Stream C: ≥6 multi-MCP per sca-v5 cascade)
- Top 3 findings + confidence levels
- Source-disagreement log
- Cardinal-rule self-check
- Items routed to W308-AUDIT synthesis

Coordinator MUST:
- Cross-stream synthesis with overlap-coverage check (e.g., if Stream C OpenSpace and Stream B PWF surface same governance pattern, note convergence)
- 3-target ledger write per sca-v5 SKILL.md §6
- codex r1 e2e gate dispatch async
- Append verdicts to VERDICT-LEDGER.md (Stream C ≥1 row; Stream B at-most 1 row if status changes)

## §6 — Cardinal-rule self-check (wave-start)

- R1 ✓ no install proposed mid-stream (verdicts are RECOMMEND-only per W307 R1 precedent)
- R2 ✓ no `.claude/hooks/scripts/*.py|.sh` additions; Stream A may invoke codex CLI directly (CR-2 compliant)
- R3 ✓ subagents from documented system (general-purpose forks)
- R4 REVERSED in Batch-A `609cba0`; ad-hoc auto-fire prompts still banned (W255 spirit) — no rules-dir additions
- R5 ✓ safety via CC permissions + settings.json deny[]
- W286 P0C ✓ basic-memory pin closed this wave
- `self_invented_count: 0` ✓
