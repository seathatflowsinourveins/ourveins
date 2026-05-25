# W368 — Immediate SOTA Installs (Quick-Wins from W367 Canonical)

**Wave:** W368
**Date:** 2026-05-22
**Status:** SPEC-DRAFT — auto-executes when W367 codex APPROVE lands
**Source:** W367 LAYER-MAP-CANONICAL.md §11 Action plan
**Branch:** `feat/W368-immediate-sota-installs` (in-place per strategy c)
**Operator mandate:** Full autonomous, ship SOTA in every layer

## §0. Context

W367 (canonical layer-map) shipped 19 cross-stream-convergence repos as the SOTA spine. W368 executes the 8 immediate P0 quick-wins from §11. All are low-risk auto-applies; operator-conditional items defer to W372.

## §1. Acceptance bar (8 P0 items; P0.0 CANCELLED per W372 F24 operator policy)

- [ ] ~~P0.0~~ (CANCELLED): `; exit 0` on ruff TaskCompleted hook is OPERATOR-POLICY-INTENDED per TaskList #676 (W372 F24 advisory mode); codex r1 finding is known false-positive
- [ ] **P0.1** Fix CLAUDE.md drift: skill `58→63` (live re-probe 2026-05-22; +5 from CLAUDE.md L31), other counts already updated in W370 (Stream F OD-4)
- [ ] **P0.2** `uvx install stanfordnlp/dspy` OR `pip install dspy-ai` + wire into local `dspy-integration` skill (Stream E #3, D #1, G #1 consensus T1-INSTALL)
- [ ] **P0.3** `pip install inspect_ai inspect_evals` + author `.github/workflows/eval-nightly.yml` (Stream E #4+7, D #3, B "Anthropic-evals-successor")
- [ ] **P0.4** Add `docling-mcp` to `.mcp.json` with pinned version (Stream F gap #5, ships MCP natively)
- [ ] **P0.5** Add CycloneDX SBOM generation to `.github/workflows/provenance.yml` (Stream F gap #7)
- [ ] **P0.6** ~~Pin `cognee` MCP version in `.mcp.json`~~ (RESCOPED: cognee is HTTP-type at `http://127.0.0.1:8000/mcp`, pinned via NSSM service config not .mcp.json; verify NSSM `CogneeMCP` version matches expected baseline)
- [ ] **P0.7** OD-1 Tavily resolution: refresh billing OR remove from `.mcp.json` (Stream E side-finding)
- [ ] **P0.8** Adopt `anthropics/devcontainer-features` (Stream C surprise #4, universal-tier)

## §2. Components

| C# | Path | Action |
|----|------|--------|
| C1 | `CLAUDE.md` (L67) | EDIT counts: skill 58→62, plugin 54→47, marketplace 22→21 |
| C2 | `.claude/skills/dspy-integration/SKILL.md` | EDIT to wire actual DSPy import + smoke-test |
| C3 | `pyproject.toml` OR `requirements.txt` | ADD `dspy-ai>=3.x`, `inspect_ai>=0.3.x`, `inspect_evals>=0.x` |
| C4 | `.github/workflows/eval-nightly.yml` | NEW workflow: inspect_ai nightly + score regression check |
| C5 | `.mcp.json` | EDIT add docling-mcp + pin cognee version + Tavily decision |
| C6 | `.github/workflows/provenance.yml` | EDIT add CycloneDX step |
| C7 | `.devcontainer/devcontainer.json` | NEW or EDIT to use anthropics/devcontainer-features |
| C8 | `docs/architecture/W368-IMMEDIATE-SOTA-INSTALLS/EXECUTION-LOG.md` | NEW per-task ship record |

## §3. Execution order (sequential within P0; each step independently revertable)

1. C1 CLAUDE.md drift fix (5 min, trivial)
2. C3 add deps to pyproject.toml/requirements.txt (10 min)
3. C5 .mcp.json edits: docling-mcp + cognee pin + Tavily-remove (15 min)
4. C2 wire dspy-integration skill to actual dspy import (30 min, smoke-test)
5. C4 eval-nightly.yml authoring (1-2h)
6. C6 provenance.yml CycloneDX (1h)
7. C7 devcontainer-features adoption (30 min)
8. C8 ship record + final commit + tag w368-ship

## §4. Codex review

After all 8 P0 land: codex GPT-5.5 r1→rN APPROVE per V18 §11 (max r10).

## §5. T6 verdict write

On APPROVE: `mcp__basic-memory__write_note` with title "W368 Immediate SOTA Installs — Wave Closure Verdict", folder "verdicts/w368", content: per-P0 outcome + composite score lift estimate.

## §6. Out of scope (deferred to later waves)

- W369: pattern-study gepa/verdict + reranker + RAGAS/DeepEval + MCP dedup audit
- W370: W366 substrate carry-forward + parallel-ratio CI gate + hybrid retrieval
- W371: multi-agent framework pattern-study pass (no install per L12 design) + Live-SWE-agent investigation
- W372: 5 Anthropic-gap-filling decisions + OD-2 L15 sandbox + OD-3 mem0 tension + OD-10 mastra TS-SDK + OD-11 3 MCP install batch

## §7. Success criteria

- [ ] All 8 P0 items closed with cite-evidence (commands + outputs)
- [ ] Codex r1→rN APPROVE
- [ ] Final commit gpg-signed + `Wave: W368` + `Codex-Verdict: APPROVE` trailers
- [ ] T6 verdict written
- [ ] Tag `w368-ship` created + pushed
- [ ] CLAUDE.md counts now match live state (drift resolved)
- [ ] DSPy + inspect_ai operable (smoke test passes)
- [ ] Nightly eval workflow runs green on first invocation

## §8. References

- W367 canonical: `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/LAYER-MAP-CANONICAL.md` §11
- Operator decisions: `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/OPERATOR-DECISIONS-PENDING.md`
- DSPy: https://dspy.ai/ + https://github.com/stanfordnlp/dspy
- inspect_ai: https://inspect.ai-safety-institute.org.uk/ + https://github.com/UKGovernmentBEIS/inspect_ai
- docling: https://github.com/DS4SD/docling
- devcontainer-features: https://github.com/anthropics/devcontainer-features

---

**STATUS:** Spec-draft. Activates immediately on W367 codex APPROVE.
