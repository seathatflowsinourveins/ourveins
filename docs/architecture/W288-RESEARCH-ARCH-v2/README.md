# W288 — Research Architecture v2

This directory holds the W288 4-stream sweep that enhances the research-architecture itself per the operator mandate (2026-05-18).

## Streams

- `STREAM-A-METHODOLOGY.md` — research-architecture methodology (multi-source discovery, MCP-tool inventory, convergence-consensus patterns).
- `STREAM-B-DISCOVERY.md` — SOTA repo discovery sweep (NEW candidates not in W259v15, including low-star high-quality).
- `STREAM-C-RUBRIC-v3.md` — multi-dimensional scoring rubric v3 + 5-tier adoption-depth ladder (SOFT gate).
- `STREAM-D-INGEST-PIPELINE.md` — convergence + ingest pipeline (deepwiki+repomix+codex GPT-5.5 fan-out).

## Synthesis (post-stream)

- `W288-RESEARCH-ARCH-v2-MASTER.md` — executive synthesis stitching all 4 streams.
- `VERDICT-LEDGER.md` — top Stream B candidates re-scored under Stream C v3 rubric via Stream D pipeline.
- ~~`SKILL-PATCH-sota-convergence-audit-v3.diff`~~ — **DEFERRED**: v3 design is documented in `STREAM-C-RUBRIC-v3.md`, but the diff-ready patch artifact has NOT been generated this wave. The live SKILL.md at `.claude/skills/sota-convergence-audit/SKILL.md` ALREADY incorporates the v3 process header + 14-dim rubric + Step 4.5 (W287 P1a) + Bayesian author-prior (W287 P2.iii) via in-place commits (`193e5db` SKILL v3 process doc + earlier W287 commits). A standalone atomic `.diff` (for rollback or rewind purposes) is a W290 carry-over — not blocking for W289 closure. (Codex GPT-5.5 W289-adversarial-2026-05-18 surfaced this docs-vs-tree mismatch as HIGH; resolved by clarifying the README rather than creating the patch.)

## Cardinal-rule conformance

- All adoptions go through the v3 audit (cardinal-rule 1).
- No self-invent hooks/scripts (cardinal-rule 2).
- Subagents = installed upstream agents OR documented subagent system (cardinal-rule 3).
- Behavior in CLAUDE.md + settings.json only (cardinal-rule 4).
- Safety boundaries via permissions/sandboxing (cardinal-rule 5).
