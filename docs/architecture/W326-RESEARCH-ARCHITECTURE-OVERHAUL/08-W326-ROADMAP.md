# W326 §08 — Phased Adoption Roadmap (W326 → W331)

> Concrete sequence to close the 7 P0 + 7 P1 + 5 P2 gaps from `06-GAPS-IDENTIFIED.md`.
> Wave-by-wave; each item = checkbox + owner + cite-anchor + rollback.

## §1 — W326 (THIS WAVE) — IMMEDIATE (Operator + Operator-AI)

### Operator (human-only actions)

- [ ] **G7-1**: Rotate `LANGFUSE_*` / `PERPLEXITY_API_KEY` (W317-r2 SEV-1 unrotated). Update `CLAUDE.local.md` §f3. Verify perplexity_search smoke. **Rollback**: prior-key in keyring.
- [ ] **G7-2**: Populate `TAVILY_API_KEY` (`tvly-...`) in `CLAUDE.local.md` §f3 (already staged commented). Tavily.com → dashboard → API key. **Rollback**: leave commented.
- [ ] **G7-3**: Populate `EXA_API_KEY` (`exa-...`) in `CLAUDE.local.md` §f3 (already staged commented). Exa.ai → dashboard → API key. **Rollback**: leave commented.
- [ ] **G7-4**: Restart Claude Code session to pick up new env vars.

### Operator-AI (this assistant, this wave or next session)

- [ ] **G5**: Write `sca-PRE-v1` reference into `.claude/skills/sota-convergence-audit/references/sca-pre-v1.md` (copy from `05-CC-PATHWAY-SCORING-FRAMEWORK.md`); wire as Phase-0 pre-screen in `.claude/skills/sota-convergence-audit/SKILL.md` (insert before §1 Stage-0).
- [ ] **G3-prep**: Verify `tools/parallel-ratio-telemetry.mjs` exists (per W325-A); if not, scaffold.
- [ ] **G19**: Phase-6 codex Stop-hook auto-fires at session-end → 4 disagreements from Fork-2 verdict table get round-1 mediation. No explicit action; trust auto-fire.
- [ ] **W326 closure**: Update `VERDICT-LEDGER.md` with W326 wave row pointing to `docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/`.
- [ ] **W326 mem-recall persist**: Write summary to T6 basic-memory (`mcp__basic-memory__write_note` tag `Wave-326`).

## §2 — W327 — RESEARCH-INFRA + EVAL-HARNESS (highest-leverage installs)

### MCP installs (per CR-9 `npx -y <pkg>@<pinned-version>`)

- [ ] **G1-1**: `arxiv-mcp-server` (blazickjp/arxiv-mcp-server, MIT) — closes paper-MCP void. Stage-0 PASS required first.
- [ ] **G1-2**: `openalex-mcp` if exists OR build thin wrapper (only if G1-1 insufficient). OpenAlex.org REST API.
- [ ] **G9**: `mcprated` MCP (claude-code-native install per Fork-3 finding). Closes claude-code#53386 provenance gap. C7 MCP-meta class.

### Tool installs

- [ ] **G2-1**: Install `inspect_ai` (UK AISI, MIT) in `Z:/venvs/claude/`. T1 INSTALL after sandbox smoke per Fork-5 finding.
- [ ] **G2-2**: Wire `inspect_ai` `--model-role grader=openai/gpt-5.5` cross-model adapter → folds Phase-6 codex into eval harness.
- [ ] **G2-3**: Write 3 baseline EvalLogs (one per existing T1 INSTALL verdict) → establishes replayable baseline.

### Repo installs (per sca-v12 cascade)

- [ ] **G14-2**: Re-cascade `langchain-ai/open_deep_research` at full 11-family cascade (G7 deps closed). Promote T1-PROV → T1 if cascade clean.
- [ ] **G14-3**: Re-cascade `huggingface/smolagents` (Open-DR sub-pattern). Promote T1-PROV cherry → T1-or-T3.

### Quality-gate MCPs (Fork-3 top-3)

- [ ] **Fork-3 §1**: `ossf/scorecard` (Apache-2.0, 19 checks). Wrap via api.scorecard.dev REST → MCP-server adapter.
- [ ] **Fork-3 §2**: `deps.dev` (Google, Apache-2.0). REST API → MCP-server adapter.
- [ ] **Fork-3 §3**: `ossf/criticality_score` (Apache-2.0, 10-sub-metric composite). CLI-bin wrap.

### Workflow

- [ ] **G4**: Write `.claude/skills/research-orchestrator/SKILL.md` composite auto-fire (description-match "research X" / "find SOTA" / "audit" / "evaluate"). Body invokes sca-PRE-v1 → sca-v12 → parallel-dispatch-mandate in sequence.
- [ ] **G3-1 (P0-A enforcement fix)**: Patch `tools/preagent-parallel-guard.mjs:4,17` — replace hardcoded `exit 0` (advisory-only) with block-on-2nd-violation-per-session logic per W329-D root cause + CLAUDE.md L13 proposal. Without this, hook detects violations but cannot enforce.
- [ ] **G3-2 (telemetry)**: Wire `tools/parallel-ratio-telemetry.mjs` to Stop-hook in `.claude/settings.json`. Closes W325-A F1 SEV-1 reporting gap.

## §3 — W328 — sca-v13 ABSORB WAVE (rubric evolution)

- [ ] **Δ53 / G6**: RRF (Reciprocal Rank Fusion) post-cascade merge in Phase-1. k=60 default per Cormack+ 2009. Closes unranked-union bias.
- [ ] **Δ54 / G13**: Promote Δ50 single-swap → `Layer(N=3)>>MaxPoolUnit` codex ensemble + Borda-vote aggregation. 3-org-distinct: haizelabs/verdict + Zheng+ 2023 MT-Bench + JudgeLM Wang+ 2023.
- [ ] **Δ55 / G12**: Citation-graph topology to T6 basic-memory. Extend Δ51 markitdown probe-record schema with `graph_edges: [{from, to, type}]`.
- [ ] **Δ56 / G11**: DRA Failure Taxonomy adopt (DeepVerifier arXiv 2601.15808). Expand sca-v12 §5 K-3 skip-class into enumerated failure modes + test-time rubric verification (fires BEFORE expensive tool fan-out).
- [ ] **Δ57 / G2**: New D-REGRET dim in sca-v13. 0-5 ladder per `07-DECISION-FRAMEWORK.md` §4. Composite_denom_install 39.8 → 40.4 (+0.6); pattern 17.3 → 17.7 (+0.4).
- [ ] **sca-v13 ship**: Update `.claude/skills/sota-convergence-audit/SKILL.md` header to `sca-v13`. Append W328 to lineage. T6 ledger backfill `rule_version: sca-v13` for new verdicts only.

## §4 — W329 — gepa-ai/gepa VENDOR-FORK + Pareto SKILL-evolution

- [ ] **G8 / G10 prep**: Clone `gepa-ai/gepa` (MIT, 3582★, ICLR 2026 Oral) into `Z:/claude-sota-installed-repos/`.
- [ ] **G8 / G10**: T2 VENDOR-FORK; adapt MCP Adapter for `.claude/skills/**/SKILL.md` description field evolution. 4-wave soak before T1 promotion.
- [ ] Nightly cron / Stop-hook fires Pareto eval over last-N session JSONLs → proposes description-edits → operator-AI approves diff.

## §5 — W330-W331 — STABILIZATION + RE-CASCADE

- [ ] Re-cascade all T1-PROV verdicts at full 11-family cascade (cascade_degraded=false target).
- [ ] Promote: `open_deep_research` T1-PROV → T1; `smolagents-DR` T1-PROV → T1-or-T3 per re-cascade outcome.
- [ ] Codex round-N adversarial review of sca-v13 (round-1 + round-2 minimum; round-3 if NEEDS-REVISION).
- [ ] W331 closure: target metrics check (§6 below).

## §6 — Success Metrics (measurable closure criteria)

| Metric | W326 baseline | W327 target | W328 target | W331 target |
|---|---|---|---|---|
| parallel_ratio (W325-A telemetry; W329-D denom 1676) | 0.0036 | ≥0.20 | ≥0.30 | ≥0.70 |
| cascade_degraded rate (per-fork) | ~80% | ≤40% | ≤20% | 0% |
| Paper-MCP coverage (D43 signal) | hf-mcp partial only | arxiv-mcp + openalex live | + Crossref opt-in | Full corpus convergence |
| D-REGRET signal coverage | 0% of verdicts | inspect_ai baseline (3 verdicts) | 100% sca-v13 verdicts | 100% all verdicts |
| Quick-screen filter rate | 0% (sca-PRE-v1 not wired) | 60% T4/T5 | 60% T4/T5 | 60% T4/T5 |
| T1 promotion rate (T1-PROV → T1) | 0% W326 | 50% (open_deep_research + smolagents) | 80% | 100% |
| ops-rhythm 8-wave SHIP-BLOCKER count | unknown (telemetry pending) | measured | ≤2 | 0 |

## §7 — Rollback Strategy Per Phase

Every install step ships with:
1. Pre-install state captured via `git status` + `git stash` if needed.
2. Post-install verification: `claude /reload-plugins` + smoke test.
3. Failure path: `git revert HEAD` OR cache-delete OR config-edit (per sca-PRE-v1 P6 rollback_simplicity score).
4. Tag prefix `pre-W327-<install-slug>-*` so destructive cleanup is recoverable.

## §8 — Codex Phase-6 Auto-Review (this wave's Stop-hook)

Session-end Stop-hook (`openai-codex/1.0.4/hooks/hooks.json:24-37`) auto-fires:
- Round-1 review of all 6 fork deliverables + 3 synthesis files.
- 4 disagreements from Fork-2 verdict table get round-1 mediation.
- W326 verdict-row mediation if any T1/T1-PROV/T2 candidates land in `01-SOTA-RESEARCH-DISCOVERY-REPOS.md`.

If round-1 returns REVISE or NEEDS-REVISION: round-2 next session.

## §9 — Cross-Reference Index

- Gap definitions: `06-GAPS-IDENTIFIED.md`
- Decision-level scoring: `07-DECISION-FRAMEWORK.md`
- Per-stream source artifacts: `00`-`05` in this dir
- Verdict ledger (cumulative): `VERDICT-LEDGER.md` (project root)
- Wave history: `docs/architecture/CLAUDE-MD-ARCHIVE/`
