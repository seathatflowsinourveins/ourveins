# sca-v21-MVP — Research-Architecture Self-Evolution (W380 canonical)

> **Cite-anchors** (sca-v13 ≥3-org floor): OSSF `https://github.com/ossf/scorecard` · deps.dev `https://api.deps.dev/v3` · OSV `https://osv.dev` · GitHub GraphQL `https://docs.github.com/en/graphql` · arXiv:2507.21678 · Anthropic `https://docs.claude.com`

**Date:** 2026-05-23 · **Branch:** `goal/W380-sca-v21` (off `main` 4080c53) · **Status:** SHIPPABLE (codex APPROVE@0.91)

## What this is

The research architecture — the meta-system that **discovers, multi-dimensionally scores, and decides adoption** of SOTA repos — was, before W380, *"a well-designed rubric + a telemetry ledger with nothing in between"* (all 4 research streams converged on this). sca-v20 defined 19 dims / 8 clusters / per-class soft-gate, but **the scorer was never built and the decision ledger never existed** — zero of the ~12 historical verdicts actually ran it.

**W380 makes the research architecture EXECUTABLE.** sca-v21-MVP is a running, tested, live-validated multi-MCP repo scorer that converts the v20 rubric into a real pipeline.

## How it was built (the SOTA workflow, demonstrated)

1. **4-stream parallel research fan-out** (multi-angle MCP convergence — perplexity/exa/deepwiki/repomix/github/hf-papers): A research-of-research · B comprehensive discovery sweep · C schema/scorer design · D decision-effectiveness backtest. Strong cross-stream triangulation on **deps.dev / OSV / OSSF-Scorecard / GitHub-GraphQL** + the "never executed" finding. (`STREAM-{A,B,C,D}.md`)
2. **Synthesis** → v21 proposal (`SYNTHESIS.md`).
3. **codex GPT-5.5 design gate (r1): REVISE@0.86 → MVP** — froze weights (no n=12 overfit), endorsed core-4 MVP, flagged the evidence-quality/missingness gap. (`CODEX-R1-VERDICT.txt`)
4. **Parallel implementation** — contract foundation + 4 fetcher implementers fanned out (disjoint files), each live-verifying its endpoint with honest missingness + zero fabrication.
5. **codex impl gate r2 REVISE@0.88 → r3 APPROVE@0.91** — r2 caught 3 real INSTALL-gating bugs (license/pinning hard-filters unenforced; dead MONITOR weight); r3 confirmed all resolved. (`CODEX-R2/R3-VERDICT.txt`)
6. **Live e2e** surfaced + fixed a noassertion-over-BLOCK calibration bug.

## Architecture (8 modules, 47 tests green)

- `tools/sota-discovery/lib/contract.mjs` — dim registry, **FROZEN v20 weights** (codex P0), evidence-quality/missingness model, per-class scoring, 5-tier soft-gate routing.
- `tools/sota-discovery/lib/http.mjs` — cached `fetchJson` (raw-evidence cache; 404→NOT_MEASURABLE).
- `tools/sota-discovery/lib/ledger.mjs` — append-only raw decision-outcomes ledger.
- `tools/sota-discovery/lib/fetchers/{github-graphql,depsdev,osv,scorecard}.mjs` — core-4 endpoints, each live-verified.
- `tools/sota-discovery/sca-evaluate.mjs` — composer/CLI: `node sca-evaluate.mjs --repo owner/name`.
- `.claude/schemas/sca-v21-mvp.schema.json` — verdict schema (superset of v20 + per-dim evidence-quality).

### v21 deltas over v20
- **+D20** transitive-dep-health (deps.dev) · **+D21** reverse-dependents/criticality (deps.dev) · **+D22** OSV-CVE + CISA-KEV hard-BLOCK (osv.dev; honest CVSS-critical proxy — OSV exposes no KEV flag, true cross-check deferred to v21.1).
- **D08 provenance reframe** (Stream A / TanStack 2026-05-11): `verified-AND-preflight-clean`, not merely present — operationalized live via OSSF Scorecard (cosign signed-but-Token-Perms=0 → `present-unverified`).
- **Evidence-quality/missingness per dim** (codex missed-high-value): unknown/conflicting/clean never collapse; confidence discounted by measured-ratio.
- **GitHub GraphQL** collapses ~6 REST calls → 1 (fixes the v20 dead-weight-dims problem).
- **INSTALL = positive evidence** (codex r2): verified-permissive license AND exact pinning required; "unknown ≠ clean."

## Live e2e ledger (6 named repos, all 4 endpoints live — `.claude/state/sca-decision-outcomes.json`)
| repo | tier | conf | measured |
|---|---|---|---|
| assafelovic/gpt-researcher | PATTERN-STUDY | MEDIUM-LOW | 44% |
| ComposioHQ/composio | PATTERN-STUDY | MEDIUM-LOW | 44% |
| langgenius/dify | PATTERN-STUDY | MEDIUM-LOW | 44% |
| All-Hands-AI/OpenHands | PATTERN-STUDY | MEDIUM | 50% |
| wshobson/agents | MONITOR | MEDIUM-LOW | 38% |
| mattpocock/skills | MONITOR | MEDIUM-LOW | 38% |

**Calibration validation**: OpenHands→PATTERN-STUDY matches the historical W295 hand-verdict. INSTALL is now a high, evidence-positive bar (none auto-INSTALL without verified license+pinning — conservative + correct). Partial `measured` (38-50%) honestly reflects qualitative dims (D12/D14/D15/D18) being NOT_MEASURABLE in the raw-fetcher MVP.

## Deferred to v21.1 (codex-gated sequencing)
- Fitted weight calibration (FROZEN until a 50-repo stratified backtest exists — codex P0 anti-overfit). The ledger now captures raw verdicts for that backtest.
- D23 data-egress/token-custody + D24 dependency-blast-radius (structured checklists, not prose-as-math).
- CLASS-B/C qualitative dim fetchers (deepwiki/repomix → D12/D14/D15/D18).
- True CISA-KEV cross-check; LICENSE-file fallback read to disambiguate noassertion.
- Comprehensive discovery-protocol automation + evaluate-in the 8 MISSING category-leaders Stream B found (esp. `anthropics/claude-agent-sdk-python`, `mem0`/`letta`, `fastmcp`, `ragflow`, `storm`).
