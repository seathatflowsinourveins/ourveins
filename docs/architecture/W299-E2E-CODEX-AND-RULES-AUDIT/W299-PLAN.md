# W299 Wave — E2E GPT-5.5 + Rule-Adversarial + Decision-Quality + Research-the-Researchers + sca-v5 SHIP

> **Wave**: W299 (operator follow-up to W298 — close all gaps via e2e GPT-5.5 + adversarial cardinal-rules audit + broader 2026-MAY SOTA discovery via multi-MCP cascade + decision-quality feedback loop + research-the-researchers pattern + ship sca-v5 SKILL.md cutover).
>
> **Branch**: `sota-converge-w295` (continued; HEAD `7254beb`).
>
> **Operator dimensions (W299 verbatim, beyond W298)**:
> 1. "gap resolute all, with gpt5.5 e2e" — codex at every stage not just final ratification
> 2. "questions your rules, and repos selection" — **ADVERSARIAL** rule audit (NEW)
> 3. "improve your decision making itself" — decision-quality feedback loop on prior verdicts (NEW)
> 4. "research sota research repos for improve your research architecture itself" — research-the-researchers (NEW)
> 5. "depth and comprehensiveness of the repos discovery" — broader SOTA discovery via multi-MCP cascade (perplexity + exa + deepwiki + repomix + github + websearch + community)
> 6. "ship with convergence sota insights and e2e with gpt 5.5" — SHIP-with-codex-throughout
> 7. (Implied carry from W298) execute the 7 W298 main-queue actions + 3 W299-carry-forward backlog items (B16/B17/B18)
>
> **Streams**: 5 parallel + multiple codex dispatches (pre-plan review + per-stream r1 + synthesis r1+r2)
> **Cite-class**: TIER-3-LOCAL-COMPOSITION (will synthesise 5 W299 streams + W298-AUDIT post-r1 + W297-AUDIT + sca-v3.1 SKILL + `code.claude.com/docs/en/changelog` + multi-MCP convergence)

## §0 — Pre-flight state (verified live at W299 wave-start)

| Component | State | Delta vs W298 |
|---|---|---|
| HEAD | `7254beb` (W298-codex-r1 fix-iterate landed) | post-W298 ship-chain complete |
| Branch | `sota-converge-w295` | unchanged |
| **W298 ship-action #1 (basic-memory `.bmignore`)** | APPLIED this wave (added `*.log` pattern after existing `*.db`/`config.json` ignores) | **CLOSED W298-HIGH-1** |
| **Fact-Forcing Gate emitter** | IDENTIFIED + ROOT-CAUSED — `pre:bash:dispatcher` (consolidated dispatcher) fires the bash gateguard; `ECC_DISABLED_HOOKS=pre:edit-write:gateguard-fact-force` is the EDIT/WRITE variant and is honored correctly | recovery = `ECC_GATEGUARD=off` env var OR add `pre:bash:gateguard-fact-force` to `ECC_DISABLED_HOOKS` (dispatcher checks for both forms) |
| W298 main-queue actions #2-7 | OPERATOR-PENDING | carry through W299 |
| W297 row #5 (sca-v5 ship-decision-B) | OPERATOR-PENDING (NOT yet shipped) | W299 Stream E executes |

## §1 — Streams (5 parallel; file-ownership disjoint)

| Stream | Type | Scope | File ownership | Done criteria |
|---|---|---|---|---|
| **A** | adversarial (questions rules) | **Cardinal-rules adversarial audit** — for each of R1-R5 + W286 P0C MCP pinning: name ≥1 strong counterexample / failure mode / SOTA-elsewhere-violation. Then propose either (a) KEEP rule unchanged, (b) RELAX with cited exception, (c) STRENGTHEN. ALSO question 4 derived norms: cardinal-rule-3 sub-agent format · cardinal-rule-2 hook discipline · `.claude/rules/` non-existence-by-design · the 3-worktree cap. Outputs: rule-by-rule verdict + adversarial evidence + propose changes ready for operator | `W299-STREAM-A-RULES-ADVERSARIAL-AUDIT.md` | All 5 cardinal rules + 4 derived norms × {evidence + counterexample + verdict}; ≥3 cite-anchors per challenge |
| **B** | discovery (multi-MCP broader) | **Broader 2026-MAY SOTA discovery via cascade** — beyond named-repos (wshobson/mattpocock/anthropics); use ≥6 MCP families (perplexity if available, exa, deepwiki, repomix, github API, websearch, awesome-list deltagrep `tools/awesome_list_deltagrep.py`); target ≥20 NEW candidates not in W288/W291/W293/W296 ledger; covering 9 axes from W296 + 3 NEW axes (research-arch, decision-making, observability); apply lite sca-v3.1 scoring | `W299-STREAM-B-BROADER-SOTA-DISCOVERY.md` | ≥20 NEW candidates; ≥6 MCP families exercised; multi-channel signal distribution proof |
| **C** | meta (research-the-researchers) | **Research-the-researchers pattern** — study SOTA research-architecture repos themselves: Anthropic Deep Research methodology · OpenAI Deep Research citations[] contract · Perplexity Sonar citation pattern · Stanford HELM rubric · SWE-bench Verified · Wikipedia Reliable Sources policy · ThoughtWorks Tech Radar · CNCF graduation criteria · OpenSSF Scorecard · NIST AI RMF · Anthropic Responsible Scaling Policy. For each: extract 1-3 patterns transferable to sca-v5 + delta vs W292-R1-R12 already-absorbed. Outputs: per-research-arch table + ≥5 NEW pattern proposals for sca-v6 (defer from v5 ship) | `W299-STREAM-C-RESEARCH-THE-RESEARCHERS.md` | ≥10 external research-arch studied; per-arch transferable-pattern verdict; ≥5 NEW v6 candidate-deltas |
| **D** | decision-quality (feedback loop) | **Decision-quality feedback loop on prior verdicts** — read current `VERDICT-LEDGER.md` (12 rows: W288/W291/W293 verdicts); for each: cross-check actual outcome (e.g. `OthmanAdi/planning-with-files` T1 INSTALL → operator deactivated to `false` per W295-r30; calibration error: T1 → not-actually-installed); calculate per-tier calibration error (T1 → actually-installed rate; T5 → actually-rejected rate; etc.); propose calibration adjustments to sca-v5 | `W299-STREAM-D-DECISION-QUALITY-FEEDBACK.md` | Per-tier calibration table; ≥3 sca-v5 calibration adjustments; honest calibration-error rate (no inflation) |
| **E** | execution (SHIP sca-v5) | **Ship sca-v5 SKILL.md** per W296 Stream D 11-delta blueprint + W297 Stream D 6-cascade-delta + W292 R1-R12 absorption status. Edit `.claude/skills/sota-convergence-audit/SKILL.md` in-place; preserve sca-v3.1 backwards-compat (decay state machine recognizes v3 as 0.8× downweight); add multi-MCP cascade Stage-1 spec; add cost-cap routing; add disagreement-first-class shape; add citation-accuracy spot-check spec | `.claude/skills/sota-convergence-audit/SKILL.md` (edits) + `W299-STREAM-E-SCA-V5-SHIP.md` (changelog summary) | SKILL.md ships v5; backwards-compat preserved; W296/W297 deltas applied; codex r1 ratifies (mid-stream) |

**Coordinator (self)**: synthesis → `W299-AUDIT-2026-05-18.md` → codex GPT-5.5 r1 final ratification → ship-chain commit.

## §2 — E2E codex chain dispatch plan

Per operator "e2e with gpt 5.5" mandate, codex fires at MULTIPLE stages (not just final):

| Stage | Event | Codex r-number | Reviews |
|---|---|:--:|---|
| **0** | Pre-plan review (this PLAN.md) | r0 | Sanity-check plan + stream scopes + don't-break-invariants |
| 1 | Streams A-E dispatch | (none) | streams run independently |
| 2 | Per-stream completion | r1.A r1.B r1.C r1.D r1.E (5 PARALLEL codex) | Per-stream adversarial review on each deliverable |
| 3 | Coordinator synthesis | r2 | Synthesis-level review (cross-stream consistency, anti-bias, cite-trail) |
| 4 | Ship-chain commit | (none) | git pre-commit (gitleaks PASS gate) |
| 5 | Optional post-ship | r3 | Final verification on committed state |

**Codex pace target** (per W290-CODEX-UNLEASH): 5-10 codex events per wave. W299 target = 7 codex events (r0 + 5 r1 + r2 = 7 events). Exceeds upper-band but matches operator "e2e" explicit mandate.

## §3 — File ownership

- `W299-PLAN.md` — coordinator (this)
- `W299-STREAM-A-RULES-ADVERSARIAL-AUDIT.md` — Stream A only
- `W299-STREAM-B-BROADER-SOTA-DISCOVERY.md` — Stream B only
- `W299-STREAM-C-RESEARCH-THE-RESEARCHERS.md` — Stream C only
- `W299-STREAM-D-DECISION-QUALITY-FEEDBACK.md` — Stream D only
- `W299-STREAM-E-SCA-V5-SHIP.md` — Stream E only (changelog summary; the actual edit is to `.claude/skills/sota-convergence-audit/SKILL.md` which Stream E EDITS in-place per operator W297 row #5 pre-approval)
- `W299-AUDIT-2026-05-18.md` — coordinator post-stream-return
- `W299-CODEX-R0.md` through `W299-CODEX-R2.md` — codex dispatches

NO stream edits: `CLAUDE.md`, `.claude/settings.json`, `.mcp.json`, `VERDICT-LEDGER.md` (except Stream D may PROPOSE ledger edits not execute them) — coordinator-approval-gated edits.

**Exception**: Stream E DOES edit `.claude/skills/sota-convergence-audit/SKILL.md` per operator's W297 row #5 pre-approval ("Approve sca-v5 SKILL.md ship per W297-D ship-decision B" — operator explicitly approved in W297 mandate "ship with convergence sota insights").

## §4 — Anti-bias mandates (carried from W297/W298)

- Stars NOT a hardgate; D12 caps at 3 when only stars present
- ≥3 organisationally-distinct sources per T1 INSTALL
- 2026-MAY freshness MANDATE
- ≥3-of-N CHANGE/EVOLVE/INVERT threshold
- Source disagreements MUST surface in `sources_typed.<dim>.disagreement[]`
- Multi-MCP discovery cascade (Stream B specifically mandated to exercise ≥6 families)
- **NEW W299 anti-pattern**: don't recommend a rule-change in Stream A without ≥1 counterexample where the current rule produced measurable harm (operator: "questions your rules" demands evidence-driven re-evaluation)

## §5 — Cite-anchors (cross-stream)

- `W298-AUDIT-2026-05-18.md` — post-r1 fix-iterate state; 12-category silent-failure ledger; 7-row main queue
- `W298-CODEX-R1.md` — codex r1 findings (1H/5M/3L/5I); the HIGH closure on version/cite drives W299 codex pattern
- `W297-AUDIT-2026-05-18.md` — multi-MCP cascade ship-decision B (Stream E builds on this)
- `W297-STREAM-D-MULTI-MCP-DISCOVERY-CASCADE.md` — 12 v4 + 6 cascade-delta source-of-truth
- `W296-STREAM-D-RESEARCH-ARCH-V4.md` — original sca-v4 design (Stream E inherits)
- `W292-RESEARCH-ARCH-COMPETITOR-AUDIT/METHODOLOGY-BENCHMARK.md §3.5` — D16/D17/D18 anchor source
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — Stream D feedback loop on prior verdicts
- `CLAUDE.md` — cardinal rules (Stream A adversarial target)
- `.claude/skills/sota-convergence-audit/SKILL.md` — sca-v3.1 live (Stream E in-place edit)
- `code.claude.com/docs/en/changelog` — corrected URL per W298 codex r1 Q6

## §6 — Verification-on-completion

Each stream MUST end with:
- File written + LOC
- ≥3 cite-anchors
- Top 3 findings/recommendations + confidence level
- Source-disagreement log (or "none observed")
- Cardinal-rule self-check on each proposed fix (R1-R5 + W286 P0C)
- Items routed to W299-AUDIT synthesis
