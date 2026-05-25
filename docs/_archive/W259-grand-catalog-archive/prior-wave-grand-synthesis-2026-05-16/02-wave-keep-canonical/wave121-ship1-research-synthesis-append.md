
---

## Wave 121 Ship 1 — research synthesis: SOTA repos beyond v1-v65 (token-eff / arch-opt / eval / coordination)

**Date**: 2026-05-09
**Trigger**: user clarification "v1-v65 are only inspiration; research SOTA BEYOND" — explicit scope expansion
**Outcome**: research-synthesis deliverable; concrete ADOPT-NOW + STUDY-PILOT + REJECT verdicts queued for follow-up ship execution

### Standing-directive agent team launched

1. **codex T1 BRIDGE-MODE GPT-5.5** PID 369437 / 360s budget — 5-axis adversarial deep-audit (token-budget enforcement design / account-rotation beyond CPA / arch-opt beyond v65 / features-used-vs-available / restart decisions). VERDICT: **Pattern B INCONCLUSIVE-TIMEOUT** per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern B — 1.69MB / 7956 lines investigation but ran out of budget mid-Phoenix-source-investigation; no final JSON verdict block. Trace mineable: codex confirmed portkey-gateway / langgraph / autogen / litellm / bifrost are pre-cloned at `Z:/repos/deps/`.

2. **Explore Sonnet stand-in** agent `a14d978afa95558e3` / 9 tool_uses / 88.9K tokens / 68.8s — multi-MCP ecosystem probe (mcp__github + mcp__exa) returned JSON-strict with top_5_recommended.

### Explore findings (verbatim shape)

```json
{
  "top_5_recommended": [
    "DeepEval (ADOPT-NOW: eval framework gap)",
    "Portkey AI Gateway (ADOPT-NOW: cost optimization + caching)",
    "LangGraph (STUDY-PILOT: deterministic agent coordination)",
    "Inspect AI (STUDY-PILOT: safety eval complement)",
    "Pydantic AI (STUDY-PILOT: type-safe agent validation)"
  ],
  "blockers": "DIMENSION A (token budget enforcement): NO open SOTA mechanical hook enforcement found. ... DIMENSION B (predictive rotation): Zero SOTA candidates >500 stars."
}
```

### Mia pre-apply on top_5_recommended

Per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` — verify each ADOPT-NOW / STUDY-PILOT against eee incumbents BEFORE staging install:

| candidate | upstream | local clone | Mia verdict | reasoning |
|---|---|---|---|---|
| **DeepEval** | confident-ai/deepeval @ ~15.3K★ Apache-2.0 active 2026-05-09 | `Z:/repos/deps/deepeval/` + `confident-ai-deepeval/` (cite-only) | **ADOPT-NOW** ✓ | Real gap. Promptfoo (Wave 119 Ship 5 scaffold) ≠ DeepEval (different shapes: prompt-comparison vs metric-pytest). Complementary. 50+ metrics + pytest CI/CD + synthetic data + agent metrics. |
| **Portkey AI Gateway** | Portkey-AI/gateway @ 11.6K★ Apache-2.0 active 2026-03-25 | `Z:/repos/deps/portkey-gateway @ 351692fd` (cite-only) | **STUDY-PILOT** | Different mechanism than CPA (semantic-embedding cache vs prefix-match). CPA already at 95.6% hit rate via prefix. Demand-evidence weak — semantic cache wins on REPHRASED queries, but eee's traffic is single-account-dominant (92% on aesthetic9c) so REPHRASED-cross-account scenario is rare. Defer until traffic mix diversifies. |
| **LangGraph** | langchain-ai/langgraph @ 10K★ MIT | `Z:/repos/deps/langgraph @ 2e5025ec` (cite-only) | **REJECT-FOR-FIT** | Python-side state-machine framework. eee orchestrates via Claude Code Agent tool (TypeScript-side, NOT Python). CATEGORY-MISMATCH per `agent-harness-fit-verification.md` Probe 5 mode-harness-shape. Adopting would require pivoting orchestrator layer — out of scope. |
| **Pydantic AI** | pydantic/pydantic-ai @ ~5K★ MIT | `Z:/repos/deps/pydantic-ai/` (cite-only) | **REJECT-FOR-FIT** | Same Python-framework mismatch as LangGraph. Type-safe agent validation is for Python-side agent code; eee has no Python-side agent surface. |
| **Inspect AI** | UKGovernmentBEIS/inspect_ai @ 2K★ MIT active 2026-05-09 | `Z:/repos/deps/inspect_ai/` (cite-only) | **STUDY-PILOT** | UK AISI provenance for safety eval. 2K★ = borderline axis-3 stability band per `convergence-gate.md`. Complement to DeepEval if DeepEval ships first. Stage as Wave 122+ candidate after DeepEval validates eval-driven-development workflow. |

### TRUE gap codex T1 + Explore both ratify

**Mechanical runtime token-budget ENFORCEMENT**:
- Explore: "DIMENSION A: NO open SOTA mechanical hook enforcement found. Cost Guardian nascent (<10 stars). Verdict: Build internal hook OR wait for Cost Guardian maturation."
- Codex T1 (Wave 120 Ship 2 verdict): "true missing piece would be mechanical runtime budget enforcement, and v10 does not provide it"

**Decision**: build internal hook is the only viable path. Design candidates:
- **PreToolUse Bash/Edit/Write hook** that estimates token cost (file size + heuristic) BEFORE execution + checks per-arc / per-account budget threshold + emits exit-2 with deny-decision when over
- **Subagent admission control** — Pre-spawn gate that checks remaining-budget on CPA target account before allowing Agent() dispatch
- Forward-ref: design-stage proposal (T5 plan-stage codex review) before any hook implementation

### Account rotation beyond CPA — HONEST-NON-FINDING

Explore: "Zero SOTA candidates >500 stars. claude-proxy-multi too nascent (3 stars). Verdict: CPA session-affinity is the incumbent; no replacement in ecosystem."

**Conclusion**: CPA v6.10.9 + session-affinity 4h TTL + priority-equalization is the current SOTA. Predictive rotation / cross-block load-balancing / cache-warming / multi-provider rotation patterns have no production-grade SOTA repo.

Future-research candidate: monitor Cost Guardian (bifrost-mcp/cost-guardian) for maturation; re-evaluate when stars >500 + ≥3 commits/month.

### Wave 121 Ship 2 candidate (queued)

**DeepEval install via official PyPI channel (cardinal-rule-6 compliant)**:
- `pip install deepeval` from `https://pypi.org/project/deepeval/` (NOT cloned dep)
- Add deepeval test files at `evals/deepeval/test_*.py`
- Wire DeepEval pytest runner alongside promptfoo CLI (sister eval surfaces)
- Cardinal-rule-1 cite trail to upstream HEAD SHA

LOC estimate: ~150 LOC (test scaffold + README update). Pattern A apply if codex T1 NEEDS-REVISION on Wave 121 Ship 2 design. Forward-ref to next /loop fire OR operator approval.

### Wave 121 Ship 1 close

Research-synthesis deliverable shipped. Task #73 → completed.

**Mia OVER ladder Wave 97-121**: n=51 → **n=52** (Mia pre-apply on Explore's "top_5 ADOPT-NOW" refuted 2 of 5 — LangGraph + Pydantic AI category-mismatch; saved Python-framework-pivot scope creep).

### CR conformance

- CR-1 cite SOTA primary: TIER-1-DIRECT to upstream GitHub URLs + local clone HEAD SHAs as cite-only references (NOT install source per CR-6)
- CR-3 cross-model gate: BRIDGE-MODE GPT-5.5 fired (Pattern B HNF disposition per timeout-without-verdict); Explore subagent provided independent ratification path
- CR-5 install-priority: NO install action this commit (research-synthesis only); Wave 121 Ship 2 candidate stages DeepEval install via PyPI official channel
- CR-6 fresh-from-github: install path mandated via PyPI/GitHub-releases, NOT `Z:/repos/deps/` clones
- CR-8 full-SOTA-content: ADAPTED-FROM-SOTA — research methodology per `research-protocol.md §Repo-discovery sub-rule` (≥4 distinct MCP tool surfaces); Mia pre-apply per `mia-pre-apply.md`
- CR-9 install-risk: ZERO-RISK — research-synthesis doc only; reversible via `git revert`
- CR-10 research-first: this IS the research-first ship — multi-source ecosystem probe surfaces SOTA candidates BEFORE install attempts
- CR-11 META-process: standing-directive operational shape — Explore + codex T1 BRIDGE-MODE in parallel; Mia pre-apply caught 2 OVER classifications pre-apply

### Cite trail

- Explore subagent: agent task `a14d978afa95558e3` (88.9K tokens / 9 tool_uses / 68.8s)
- Codex T1: `.claude/state/codex_consult_wave121_ship1_token_eff_arch_opt_beyond_v65_OUT.txt` (1.69MB / 7956 lines / Pattern B HNF)
- Upstream candidates:
  - DeepEval: `https://github.com/confident-ai/deepeval` ~15.3K★ Apache-2.0 active 2026-05-09
  - Portkey AI Gateway: `https://github.com/Portkey-AI/gateway` 11.6K★ Apache-2.0 active 2026-03-25
  - LangGraph: `https://github.com/langchain-ai/langgraph` 10K★ MIT
  - Pydantic AI: `https://github.com/pydantic/pydantic-ai` ~5K★ MIT
  - Inspect AI: `https://github.com/UKGovernmentBEIS/inspect_ai` 2K★ MIT active 2026-05-09
- Sister rules invoked:
  - `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern B` (timeout-trace-mining HNF disposition)
  - `Z:/claude-sota/.claude/rules/mia-pre-apply.md` (n=52 cumulative ladder)
  - `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §Probe 5 mode-harness-shape` (LangGraph + Pydantic AI Python-framework category-mismatch)
  - `Z:/claude-sota/.claude/rules/research-protocol.md §Repo-discovery sub-rule` (multi-MCP ecosystem crawl mandate)

### Forward-ref

- Wave 121 Ship 2 candidate: DeepEval install (~150 LOC scaffold) via PyPI official channel
- Wave 122+ candidate: Inspect AI as DeepEval complement (after DeepEval validates)
- Wave 122+ design-stage candidate: mechanical runtime token-budget enforcement hook (codex T5 plan-stage review)
- Wave 122+ defer: Portkey AI Gateway re-evaluate after traffic mix diversifies beyond aesthetic9c-dominance

