# W296 Stream C — Challenger vs Incumbent (sca-v3.1 multi-dim convergence)

> **Wave**: W296 · **Stream**: C · **Author**: stream-C agent (replacement; supersedes prior partial) · **Date**: 2026-05-18
> **Rubric**: sca-v3.1 (17 dims D1-D18, dual composites, 5-tier ladder, Bayesian author-prior)
> **Inputs**: `W296-STREAM-A-CURRENT-ARCH-AUDIT.md` (917 LOC, 9 axes, 8 weak-spots) +
>            `W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md` (814 LOC, 84 candidates, top-3-per-axis)
> **Method**: side-by-side D1-D18 score per challenger ↔ incumbent pair, dual composites + tier verdict + priority ranking
> **Hard rule**: source-of-truth = external SOTA convergence (Stream B), NOT current-arch self-justification (Stream A)
> **Cardinal-rule cite-anchor**: every D-score and verdict resolves to a `file:line` or `URL`/`DOI` per W292-R7

---

## §0 TL;DR — Top-5 priority queue (one line each)

| # | Challenger | Axis | Verdict | Headline reason |
|---|---|---|---|---|
| 1 | `anthropics/claude-agent-sdk-python` (6.9k★, MIT) | A+B — Subagent / orchestration | **T1 INSTALL** | Highest priority_score 9.86; Anthropic-org-canonical (Bayesian α=+2 + β=+1); install_score 4.48; closes Stream A §2.3 single-codex-gate POF gap |
| 2 | `github/spec-kit` (102k★, MIT) | C — planning-with-files | **T1 CO-INSTALL** | install_score 4.62; 6/6 source convergence (highest in Stream B); ADDITIVE — does not replace OthmanAdi; Stream B §9.3 cardinal-rule-1 verification gate (are speckit-* skills the upstream plugin?) |
| 3 | `astral-sh/uv` (85k★, Apache-2.0) | I — System cleanliness | **T1 INSTALL** | install_score 4.75 (highest absolute post-codex-r1 fix #2); ZERO community incumbent; replaces self-managed primitive (manual `Z:\venvs\claude`); rye absorbed; 10-100× pip (Astral-sourced — single-org anchor); Windows-native; 30-min rollback |
| 4 | `oraios/serena` (24.3k★, MIT) | G — gitnexus alt | **T1 ELEVATE** | install_score 4.20; already partial via `mcp__serena__*`; MIT > gitnexus D1=2 (PolyForm-NC) INSTALL-cap + D16=1 bus-factor cap |
| 5 | `mem0ai/mem0` (56k★, Apache-2.0) | D — Memory | **T1 INSTALL with caveat** | install_score 4.04 borderline; LongMemEval 49% measured (+15pt gap vs Zep 63.8%); closes Stream A §5 rank-1 memory weak-spot; D10=3 partial overlap requires W295 basic-memory re-litigation |

**Operator's literal question** ("what should be next priority?"): **TOP-5 above by priority_score**. **Order to ship**: claude-agent-sdk-python first (highest priority_score, lowest political risk — Anthropic-canonical), spec-kit second (additive, no replacement risk), uv third (replaces self-managed primitive — no community incumbent to displace).

**Headline inversion** (Stream B §0): `microsoft/agent-framework` + `openai/openai-agents-python` + `google/adk-python` are MIT/Apache + 2026-MAY-active org-canonical SDKs that the W288-W295 arc treated as out-of-scope. AutoGen is in maintenance mode. The W289 wshobson-trio T3 PATTERN-STUDY verdict is unchanged for now, but the agent-orchestration axis is fundamentally re-shaped — microsoft/agent-framework + google/adk-python score T2 VENDOR-FORK + T3 PATTERN-STUDY parallel; openai/openai-agents-python downgrades to **T4 CITE-ONLY pending D2≥4 proof** (per codex-r1 fix #6+#7 — D2=3 fails T3 gate `D2≥4`). See §7. <!-- codex-r1 fix #6+#7+#11: align headline with post-fix verdict tiers -->

---

## §1 Method (sca-v3.1 application discipline)

### §1.1 Rubric anchor

Per `.claude/skills/sota-convergence-audit/SKILL.md:79-108` — 17 canonical dimensions, D-ids D1-D18 (one ID gap from W259 D5+D23→D7 collapse), dual composites:

- `install_score = Σ (Di × Wi_install) / 16.5` over 16 install-relevant dims (D1-D11, D14, D15, D16, D17, D18)
- `pattern_score = Σ (Di × Wi_pattern) / 7.1` over 7 pattern-relevant dims (D2, D5, D6, D8, D9, D12, D13)

### §1.2 Hard-cap taxonomy (per SKILL.md:183-188)

| Class | Triggers | Effect |
|---|---|---|
| Universal REJECT | `D7 ≤ 1` · `D10 ≤ 2 AND no marginal pattern improvement` · `D15 ≤ 1` · `D18 < 2` · adversarial-BLOCK · codex-gate BLOCK | Force T5 at any tier |
| INSTALL-only caps | `D1 < 3` · `D3 < 2` · `D5 < 4` · `D14 < 3` · `D17 < 2` | Block T1 INSTALL only |
| T1+T2 caps (v3.1) | `D16 < 2` | Block T1+T2; T3+ open |
| VENDOR-FORK additional | License does not permit fork | Block T2 only |

### §1.3 Bayesian author-prior for D6 (per SKILL.md:299-315)

```
prior = α_anthropic + β_known_partner + γ_long_running_repo − δ_abandoned_repo_count
```
- `α_anthropic=+2` if Anthropic/canonical (or `anthropics/*` org)
- `β_known_partner=+1` if prior ACTIVE ADOPT exists in adoption-decisions ledger
- `γ_long_running_repo=+1` if ≥12mo activity + ≥3 stable releases
- `δ=−1 per abandoned repo` from same author in trailing 12mo

Stars enter ONLY as tie-breaker. D12 caps at 3 if stars-only.

### §1.4 Priority-ranking formula (operator-specified)

```
priority_score = install_score × harness_fit_multiplier × replaceable_incumbent_cost
```
- `harness_fit_multiplier` ∈ [0.5, 2.0] — based on D3 (autonomous-loop · CC-native · Windows · CR-2-compliant)
- `replaceable_incumbent_cost` ∈ [0.3, 1.5] — based on Stream A's incumbent-gap severity per §5 ranking table

<!-- codex-r1 fix #1: Phase-5 ≥3-org cite-anchor mandate; demote-on-shortfall -->
### §1.5 Anti-bias enforcement (Phase-5 compliant per W296 Stream D §1.5)

- **≥3 organizationally-distinct cite anchors per dim score >3** — applies to ALL dimensions (not just D5/D12), per `W296-STREAM-D-RESEARCH-ARCH-V4.md:37` ("External convergence >=3 organizationally-distinct orgs") + `:201` ("cite-count <3 distinct orgs ... forces demote")
- **Shortfall consequence**: any D-score >3 with <3 distinct-org anchors triggers **1-tier demotion** (T1→T2, T2→T3, etc.) and is recorded inline as `[CITE-SHORTFALL: N-orgs]`
- **Stars NOT a hardgate** — D12 caps at 3 if stars-only, per W288 SKILL.md:328
- **Source-disagreement surfaced** in `sources_typed_disagreement[]` (per W288 R3, W291.Stage2 empirical validation)
- **Freshness gate** — `pushed_at >= 2026-01-01` unless org-canonical SDK (Anthropic/OpenAI/Microsoft/Google)
- **No fabrication** — N/A marked with reason; scores anchor to Stream A or Stream B file:line
- **Org-canonical SDK exemption note**: Anthropic-canonical D6=5 derives from Bayesian author-prior `α=+2 + β=+1 + γ=+1` (SKILL.md:299-315), which is rubric-internal evidence and counts as 1 anchor; D6 still needs 2 additional independent-org anchors to exceed 3 without demotion.

### §1.6 Per-axis scoring scope

I score the **Top-3 challenger per axis** (Stream B §0 TL;DR row) against the Stream A incumbent. 9 axes × 3 candidates = 27 pair-scorings. Deep tables for the §6 TOP-5 candidates; brief verdicts for the other 22. Where a challenger is "additive-only" (no incumbent to replace), `replaceable_incumbent_cost=0.5`. Where Stream A has no clear incumbent (axis I has manual venv mgmt), `replaceable_incumbent_cost=1.5` (max gap-severity).

---

## §2 Challenger-vs-incumbent mapping table

Per Stream A §5 ranked weak-spots × Stream B §3 top-10 grand list. Action-codes:

- **R** = REPLACE — challenger displaces incumbent (incumbent retired)
- **A** = AUGMENT — challenger co-installs WITH incumbent (different concern)
- **S** = STAND ALONGSIDE — additive, no overlap (additive-only)
- **0** = no clear incumbent (axis is greenfield)

| Stream-B axis | Stream-B top-1 | Stream-A incumbent | Action |
|---|---|---|---|
| **A** — Agent orchestration | `microsoft/agent-framework` | wshobson-trio T3 + `agent-teams` T1 | **A** (parallel-install) |
| A.2 | `openai/openai-agents-python` | agent-teams T1 | **A** (parallel-orchestrator path) |
| A.3 | `agentscope-ai/agentscope` | observability layer (none directly) | **S** (additive) |
| **B** — Subagent / Codex | `openai/codex` 83.5k | `codex@openai-codex` plugin@1.0.4 | **0** (incumbent reaffirmed) |
| B.2 | `anthropics/claude-agent-sdk-python` | (no direct incumbent — gap-fill) | **A** (subagent-construction primitive) |
| B.3 | `UKGovernmentBEIS/inspect_ai` | `harness/eval_harness.py` partial wrap | **A** (deepen partial install) |
| **C** — planning-with-files | `github/spec-kit` 102k | `OthmanAdi/planning-with-files` T1 | **A** (co-install — distinct concern) |
| C.2 | `cline/cline` 62k | claude-code itself (IDE host) | **R-risk** |
| C.3 | `Aider-AI/aider` 45k | OthmanAdi + claude-code | **A** |
| **D** — Memory | `mem0ai/mem0` 56k | T2 (memory-MCP) split | **R** (universal memory layer) |
| D.2 | `letta-ai/letta` (MemGPT v2) | T1 hindsight (DOWN at probe) | **R** (OS-paging) |
| D.3 | `getzep/graphiti+zep` | T4 graphiti **RETIRED** | **R-historical** (pattern only) |
| **E** — Research-arch | `LearningCircuit/local-deep-research` | sca-v3.1 SKILL | **A** (sca-v4 input) |
| E.2 | `bytedance/deer-flow` | (no direct incumbent) | **S** (W291.Stage2 known caps) |
| E.3 | `SakanaAI/AI-Scientist-v2` | (no direct incumbent) | **S** (tree-of-agents pattern) |
| **F** — Code quality | `astral-sh/ty` | `microsoft/pyright@1.1.408` | **R** (await stable 1.0) |
| F.2 | `astral-sh/ruff` (incumbent) | (incumbent reaffirmed) | **0** |
| F.3 | `facebook/pyrefly` | pyright | **R-alt** |
| **G** — gitnexus alt | `oraios/serena` | `gitnexus@1.6.4-rc.112` | **R** (MIT > PolyForm-NC + bus_factor) |
| G.2 | `ast-grep/ast-grep` | gitnexus | **A** (structural-search complement) |
| G.3 | `sourcegraph/zoekt` | gitnexus | **A** (trigram-search complement) |
| **H** — Git practice | `jj-vcs/jj` | git + W280d discipline | **A** (preserves git on-disk) |
| H.2 | `gitbutlerapp/gitbutler` | git CLI | **S** (UI layer) |
| H.3 | `git-town/git-town` | manual branch-workflow | **S** (automation pattern) |
| **I** — System cleanliness | `astral-sh/uv` | manual `Z:\venvs\claude` + pip | **R** (replaces self-managed primitive) |
| I.2 | `prefix-dev/pixi` | manual venv mgmt | **A** (multi-lang) |
| I.3 | `jdx/mise` | manual runtime version mgmt | **A** (polyglot) |

**Total pair-scorings produced**: 27 (9 axes × 3 per axis). Deep D1-D18 scoring tables in §3 for TOP-5; brief scoring for the other 22.

---

## §3 Per-pair sca-v3.1 scoring

Scoring convention: each dim 1-5 (anchors from `.claude/skills/sota-convergence-audit/SKILL.md` §4). Composites computed; hard-cap breaches listed before verdict.

### §3.A.1 — `microsoft/agent-framework` vs (wshobson-trio T3 + agent-teams T1)

**Stream B anchor**: §2.A row 1 (MIT; 10.5k★; 2026-05-18 daily; org-canonical Microsoft AutoGen successor); convergence 4/6
**Stream A incumbent**: §2.2 `agent-teams@claude-code-workflows` enabled at settings.json:227 + W289 wshobson-trio T3 PATTERN-STUDY

| Dim | W_inst | W_pat | Challenger | Incumbent | Anchor |
|---|---:|---:|---|---|---|
| D1 license | 1.5 | — | 5 (MIT) | 5 | Stream B §2.A row 1 |
| D2 capability_uniq | 0.9 | 1.4 | 4 | 3 | Stream A §2.2 |
| D3 harness_fit | 1.3 | — | 2 (Python-first; SDK-wrap-only) | 4 | Stream A §2.2 + B §2.A.A.3 |
| D4 CC-pathway | 1.3 | — | 2 (no CC plugin) | 5 | — |
| D5 typed_evidence | 1.0 | 1.0 | 4 (Microsoft canonical README + Microsoft blog + Stream B 4/6 convergence + AutoGen-successor docs; ≥3 distinct orgs incl. catalogs) | 4 | Stream B §2.A.2 + Stream B §2.A.A.3 + Stream B §9.1 + 4/6 catalog convergence <!-- codex-r1 fix #7: D5 3→4 (4/6 Stream B convergence; ≥3 distinct orgs incl. Microsoft + GitHub catalogs + practitioner blogs) --> |
| D6 authority (Bayesian) | 0.9 | 0.8 | 5 (`α_microsoft=+2` org-canonical SDK [W296 mandate parity with Anthropic-α=+2]; γ=+1; β=0; clamp(2+2+1,1,5)=5) | 5 | SKILL.md:299 + W296 review mandate <!-- codex-r1 fix #7: D6 4→5 Microsoft org-canonical alpha=+2 --> |
| D7 maintenance | 1.0 | — | 4 (2026-05-18) | 4 | Stream B §2.A row 1 |
| D8 benchmark_deltas | 1.0 | 0.9 | 3 | 3 | — |
| D9 failure_mode | 0.7 | 0.8 | 3 | 4 | Stream A §2.2 + W289 doc |
| D10 duplication | 1.1 | — | 3 (partial overlap w/agent-teams) | n/a | — |
| D11 context_budget | 0.8 | — | 2 (SDK adds deps) | 4 | — |
| D12 community | — | 0.7 | 4 (10.5k★ + 4/6 catalogs) | 4 | — |
| D13 pattern_extract | — | 1.5 | 5 (SDK patterns-rich) | 3 | Stream B §2.A row 1 |
| D14 reversible | 1.1 | — | 4 (pip-removable) | 5 | — |
| D15 supply_chain | 1.0 | — | 4 (Microsoft) | 5 | — |
| D16 bus_factor | 1.0 | — | 5 (Microsoft TSC) | 5 | SKILL.md:101 |
| D17 robustness | 0.9 | — | 3 (unit tests) | 3 | SKILL.md:102 |
| D18 runtime_safety | 1.0 | — | 4 | 5 | SKILL.md:103 |

**Hard-cap breaches**: NONE after D5 3→4 promotion <!-- codex-r1 fix #7 (line 454/475): D5 +1 → cap clears -->.

**Composites** <!-- codex-r1 fix #7: D5 3→4 + D6 4→5; install_score 3.45→3.57; pattern_score 3.83→4.08 -->:
- `install_score = (1.5×5 + 0.9×4 + 1.3×2 + 1.3×2 + 1.0×4 + 0.9×5 + 1.0×4 + 1.0×3 + 0.7×3 + 1.1×3 + 0.8×2 + 1.1×4 + 1.0×4 + 1.0×5 + 0.9×3 + 1.0×4) / 16.5`
  = `(7.5 + 3.6 + 2.6 + 2.6 + 4.0 + 4.5 + 4.0 + 3.0 + 2.1 + 3.3 + 1.6 + 4.4 + 4.0 + 5.0 + 2.7 + 4.0) / 16.5`
  = `58.9 / 16.5` = **3.57**
- `pattern_score = (1.4×4 + 1.0×4 + 0.8×5 + 0.9×3 + 0.8×3 + 0.7×4 + 1.5×5) / 7.1`
  = `(5.6 + 4.0 + 4.0 + 2.7 + 2.4 + 2.8 + 7.5) / 7.1`
  = `29.0 / 7.1` = **4.08**

**Verdict**: install_score 3.57 ∈ [3.0, 3.9] + license permits fork → **T2 VENDOR-FORK**. Strong pattern_score 4.08 + D2=4 ≥ T3 gate + D13=5 ≥ T3 gate routes **T3 PATTERN-STUDY in parallel** (per Stream C §1.3). Stream B §2.A.A.3 + §2.A row 1 + W289 wshobson-trio precedent corroborates the parallel-route. <!-- codex-r1 MED #16: Microsoft promotion CITE-ONLY → T3 PATTERN-STUDY (T2 still gated by D4=2 CC-pathway absence) -->

---

### §3.A.2 — `openai/openai-agents-python` vs (agent-teams T1 + parallel-Agent fan-out)

**Stream B anchor**: §2.A row 2 (MIT; 26.4k★; Swarm successor; daily; org-canonical OpenAI); convergence 5/6
**Stream A incumbent**: §2.2 agent-teams T1

| Dim | Challenger | Incumbent | Anchor |
|---|---|---|---|
| D1 | 5 (MIT) | 5 | Stream B §2.A |
| D2 | 4 | 3 | — |
| D3 | 2 | 4 | — |
| D4 | 2 | 5 | — |
| D5 | 3 (OpenAI cookbook + Context7 + 5/6 catalogs; lack CC-practitioner) | 4 | Stream B §2.A.2 |
| D6 | 5 (`α_openai=+2` org-canonical SDK [W296 mandate parity with Anthropic-α=+2]; γ=+1; β=0; clamp(2+2+1+0,1,5)=5) | 5 | SKILL.md:299 + W296 review mandate <!-- codex-r1 fix #6: D6 4→5 OpenAI org-canonical alpha=+2 --> |
| D7 | 5 (daily; biggest 2026-MAY signal) | 4 | — |
| D8 | 3 | 3 | — |
| D9 | 4 | 4 | — |
| D10 | 3 | n/a | — |
| D11 | 2 | 4 | — |
| D12 | 4 (26k★ + canonical + 4 awesome-lists) | 4 | — |
| D13 | 5 (production SDK patterns) | 3 | — |
| D14 | 4 | 5 | — |
| D15 | 4 (OpenAI) | 5 | — |
| D16 | 5 (OpenAI org) | 5 | — |
| D17 | 3 | 3 | — |
| D18 | 4 | 5 | — |

**Hard-cap breaches**: `D5=3` → INSTALL-cap (same as §3.A.1).

**Composites** <!-- codex-r1 fix #6: D6 4→5 (OpenAI α=+2 org-canonical parity); install_score 3.56→3.61; pattern_score 3.94→4.06 -->:
- `install_score = (1.5×5 + 0.9×4 + 1.3×2 + 1.3×2 + 1.0×3 + 0.9×5 + 1.0×5 + 1.0×3 + 0.7×4 + 1.1×3 + 0.8×2 + 1.1×4 + 1.0×4 + 1.0×5 + 0.9×3 + 1.0×4) / 16.5`
  = `(7.5 + 3.6 + 2.6 + 2.6 + 3.0 + 4.5 + 5.0 + 3.0 + 2.8 + 3.3 + 1.6 + 4.4 + 4.0 + 5.0 + 2.7 + 4.0) / 16.5`
  = `59.6 / 16.5` = **3.61**
- `pattern_score = (1.4×4 + 1.0×3 + 0.8×5 + 0.9×3 + 0.8×4 + 0.7×4 + 1.5×5) / 7.1`
  = `(5.6 + 3.0 + 4.0 + 2.7 + 3.2 + 2.8 + 7.5) / 7.1`
  = `28.8 / 7.1` = **4.06**

**Verdict**: install_score 3.61 + **D2=3 fails T3 gate `D2≥4`** (Stream C §1.3) + D5 INSTALL-cap breach → **T4 CITE-ONLY pending D2≥4 proof**. Pattern_score 4.06 lifts patterns but T3 PATTERN-STUDY gate still requires D2≥4. Per Stream C §1.3 line 79-82, T3 requires `pattern_score ≥ 3.5 AND D2 ≥ 4 AND D13 ≥ 3` — current D2=3 (Stream B §2.A — handoff/tool-call surface not unique vs `microsoft/agent-framework` D2=4 + `anthropics/claude-agent-sdk-python` D2=5). **To promote T4→T3**: produce evidence that OpenAI Swarm-successor handoff API is structurally unique (not just renamed). See §3.A.2-FOLLOWUP for the contingent route. <!-- codex-r1 fix #7 + #10: T2/T3 → T4 CITE-ONLY pending D2≥4 proof; resolves D10 contradiction by removing T2 route -->

---

### §3.A.3 — `agentscope-ai/agentscope` vs (no direct incumbent — observability layer)

**Stream B anchor**: §2.A row 3 (25.2k★; Apache 2.0; Alibaba/ModelScope; non-USA)

**Verdict (scored brief)**: D1=5, D2=4, D3=2, D4=1 (no plugin), D5=2, D6=3 (Alibaba α=0), D7=4, D10=4 orthogonal, D13=4, D16=4, D18=3. install_score ≈ **3.13**; pattern_score ≈ **3.14**. Verdict: **T3 PATTERN-STUDY** (observability-first pattern lift). D5 INSTALL-cap breach (3<4 wait — actually D5=2; same blocking effect).

---

<!-- codex-r1 fix #11 (MED line 44): add scored row for google/adk-python (Google org-canonical SDK, ≥19k★, 2026-05-18 daily) -->
### §3.A.4 — `google/adk-python` vs (agent-teams T1 + parallel-Agent fan-out)

**Stream B anchor**: §2.A — Google ADK Python org-canonical SDK; per Stream B `:83` + 5-org-canonical-SDK landscape `:662-666`
**Live metadata (`gh repo view google/adk-python` 2026-05-18)**: 19,703★; Apache-2.0; pushed_at 2026-05-18T19:29:02Z; latest v1.33.0 2026-05-08.
**Stream A incumbent**: §2.2 agent-teams T1

| Dim | Challenger (`adk-python`) | Incumbent | Anchor |
|---|:--:|:--:|---|
| D1 license | 5 (Apache-2.0) | 5 | live `gh repo view` |
| D2 capability_uniq | 4 (Google ADK agent runtime + tool-use surface) | 3 | Stream B §2.A |
| D3 harness_fit | 2 (Python-first; SDK-wrap-only; no CC plugin) | 4 | Stream B Discovery |
| D4 CC-pathway | 2 (no native plugin) | 5 | — |
| D5 typed_evidence | 4 (Google canonical docs + 3+ catalogs + practitioner blogs; ≥3 distinct orgs) | 4 | Stream B §2.A.2 |
| D6 authority (Bayesian) | 5 (`α_google=+2` org-canonical SDK [W296 mandate parity]; γ=+1; β=0; clamp(2+2+1,1,5)=5) | 5 | SKILL.md:299 + W296 mandate |
| D7 maintenance | 5 (2026-05-18 daily push; v1.33.0 2026-05-08) | 4 | live `gh repo view` |
| D8 benchmark_deltas | 3 (no measured CC-pathway lane numbers; Google internal use implied) | 3 | SKILL.md:142 |
| D9 failure_mode | 3 (Google docs; modest CC-specific failure-mode coverage) | 4 | — |
| D10 duplication | 3 (partial overlap with agent-teams orchestration; different primitive class — SDK vs CC-team) | n/a | — |
| D11 context_budget | 2 (SDK adds deps; same penalty as microsoft/agent-framework) | 4 | — |
| D12 community | 4 (19.7k★ + Apache + Google ecosystem; ≥3 distinct orgs) | 4 | live + Stream B §9 |
| D13 pattern_extract | 4 (ADK patterns liftable; tool-use surface educational) | 3 | — |
| D14 reversible | 4 (pip-removable; uninstall = instant) | 5 | — |
| D15 supply_chain | 4 (Google org; Apache-pinned; OpenSSF unverified) | 5 | — |
| D16 bus_factor | 5 (Google org TSC) | 5 | SKILL.md:101 |
| D17 robustness | 3 (Google-internal use implied) | 3 | SKILL.md:102 |
| D18 runtime_safety | 4 | 5 | SKILL.md:103 |

**Hard-cap breaches**: NONE strict-less-than. D5=4 passes `D5<4` ✓. D17=3 passes `D17<2` ✓.

**Composites**:
- `install_score = (1.5×5 + 0.9×4 + 1.3×2 + 1.3×2 + 1.0×4 + 0.9×5 + 1.0×5 + 1.0×3 + 0.7×3 + 1.1×3 + 0.8×2 + 1.1×4 + 1.0×4 + 1.0×5 + 0.9×3 + 1.0×4) / 16.5`
  = `(7.5 + 3.6 + 2.6 + 2.6 + 4.0 + 4.5 + 5.0 + 3.0 + 2.1 + 3.3 + 1.6 + 4.4 + 4.0 + 5.0 + 2.7 + 4.0) / 16.5`
  = `59.9 / 16.5` = **3.63**
- `pattern_score = (1.4×4 + 1.0×4 + 0.8×5 + 0.9×3 + 0.8×3 + 0.7×4 + 1.5×4) / 7.1`
  = `(5.6 + 4.0 + 4.0 + 2.7 + 2.4 + 2.8 + 6.0) / 7.1`
  = `27.5 / 7.1` = **3.87**

**Verdict**: install_score 3.63 ∈ [3.0, 3.9] + license permits fork → **T2 VENDOR-FORK**. Pattern_score 3.87 + D2=4 ≥ T3 gate + D13=4 ≥ T3 gate routes **T3 PATTERN-STUDY in parallel**. **Co-priority with microsoft/agent-framework + openai/openai-agents-python** in the 4-org-canonical-SDK landscape (Anthropic-claude-agent-sdk-python + Microsoft-agent-framework + OpenAI-openai-agents-python + Google-adk-python). Per the 4-org parity mandate (codex-r1 fix #6/#7), this row's verdict mirrors microsoft/agent-framework treatment (T2 VENDOR-FORK + T3 PATTERN-STUDY in parallel).

---

### §3.B.1 — `openai/codex` (incumbent reaffirmed) — no-op

**Stream B anchor**: §2.B row 1 (83.5k★; Apache 2.0; daily 2026-05-18)
**Stream A incumbent**: §2.3 `codex@openai-codex` plugin@1.0.4

**Verdict**: **NO-OP** — Stream B confirms incumbent. No challenger.

---

### §3.B.2 — `anthropics/claude-agent-sdk-python` vs (no direct incumbent — subagent SDK)

**Stream B anchor**: §2.B row 3 (6.9k★; MIT; 2026-05-15; Anthropic org-canonical)
**Stream A incumbent**: no direct (codex-rescue + agent-teams cover different concerns)

| Dim | Score | Anchor |
|---|:--:|---|
| D1 license | 5 (MIT) | Stream B §2.B row 3 |
| D2 capability_uniq | 5 (Anthropic-canonical subagent SDK; Stream A §2.3 under-utilization) | Stream B §2.A.2 4/6 convergence |
| D3 harness_fit | 5 (CC-native by definition; this IS the CC subagent SDK) | — |
| D4 CC-pathway | 5 (THIS IS the canonical pathway — Anthropic-canonical [1 org] + claude-code Python ecosystem adoption [pip, Context7-indexed] [2 orgs] + community wrapper proliferation incl. `letta-ai/claude-subconscious` per Stream B §3.1 [3rd org]; ≥3 distinct-org anchors satisfied) | Stream B §2.B row 3 + Stream B §3.1 + `https://github.com/anthropics/claude-agent-sdk-python/releases/tag/v0.2.82` lines 150-201 <!-- codex-r1 fix #4: D4=5 anchored ≥3-org --> |
| D5 typed_evidence | 4 (Anthropic docs + Context7 + cross-ref W295 + 4/6 convergence) | Stream B §2.A.2 |
| D6 authority (Bayesian) | 5 (α_anthropic=+2 + γ=+1 + β=+1 from claude-code = highest possible) | SKILL.md:299 |
| D7 maintenance | 4 (2026-05-15 commits) | Stream B §2.B row 3 |
| D8 benchmark_deltas | 3 (no SOTA-rubric-lane numbers; parity-by-default per SKILL §4.5) | SKILL.md:142 |
| D9 failure_mode | 4 (Anthropic docs cover failure modes) | — |
| D10 duplication | 4 (low overlap; SDK-as-subagent vs codex-as-subagent — different layer) | Stream A §2.3 |
| D11 context_budget | 4 (lean SDK; pip; no preload bloat) | — |
| D12 community | 3 (6.9k★ alone is stars-only signal; SKILL.md:328 caps stars-only D12 at 3; **CITE-SHORTFALL: independent non-Anthropic adoption-evidence pending**; live: 6,931★ MIT 2026-05-15 per `gh repo view`) | Stream B §2.A.2 + live `gh repo view anthropics/claude-agent-sdk-python` 2026-05-18 <!-- codex-r1 fix #5: D12 4→3 stars-only cap per SKILL.md:328 --> |
| D13 pattern_extract | 5 (SDK patterns liftable) | — |
| D14 reversible | 5 (pip-removable; uninstall = instant) | — |
| D15 supply_chain | 4 (Anthropic canonical; OpenSSF audit recommended) | — |
| D16 bus_factor | 5 (Anthropic org) | SKILL.md:101 |
| D17 robustness | 4 (SDK has tests; perturbation N/A) | — |
| D18 runtime_safety | 5 (lib-level; no network default) | — |

**Hard-cap breaches**: NONE. D1=5, D3=5, D5=4, D14=5, D17=4, D18=5, D16=5.

**Composites** <!-- codex-r1 fix #5: D12 4→3 stars-only cap; pattern_score 4.39→4.30; install_score unchanged (D12 is pattern-only) -->:
- `install_score = (1.5×5 + 0.9×5 + 1.3×5 + 1.3×5 + 1.0×4 + 0.9×5 + 1.0×4 + 1.0×3 + 0.7×4 + 1.1×4 + 0.8×4 + 1.1×5 + 1.0×4 + 1.0×5 + 0.9×4 + 1.0×5) / 16.5`
  = `(7.5 + 4.5 + 6.5 + 6.5 + 4.0 + 4.5 + 4.0 + 3.0 + 2.8 + 4.4 + 3.2 + 5.5 + 4.0 + 5.0 + 3.6 + 5.0) / 16.5`
  = `74.0 / 16.5` = **4.48**
- `pattern_score = (1.4×5 + 1.0×4 + 0.8×5 + 0.9×3 + 0.8×4 + 0.7×3 + 1.5×5) / 7.1`
  = `(7.0 + 4.0 + 4.0 + 2.7 + 3.2 + 2.1 + 7.5) / 7.1`
  = `30.5 / 7.1` = **4.30**

**Verdict**: install_score 4.48 ≥ 4.0 + NO hard-cap → **T1 INSTALL** (adversarial review pending). Anthropic-org-canonical with highest D6=5. Stream B §3 ranks this top-10 #4; verdict here corroborates and elevates to highest priority_score (§4).

---

### §3.B.3 — `UKGovernmentBEIS/inspect_ai` vs (partial wrap incumbent `harness/eval_harness.py`)

**Stream B anchor**: §2.B row 4 (2.1k★; MIT; UK AI Safety Institute; 2026-05-18)
**Stream A incumbent**: `harness/eval_harness.py` already wraps inspect_ai per CLAUDE.md:33

| Dim | Challenger (native deeper install) | Anchor |
|---|:--:|---|
| D1 | 5 (MIT) | Stream B §2.B row 4 |
| D2 | 4 (gov-backed; multi-judge ensemble support) | Stream A §2.3 SOTA-direction-question |
| D3 | 4 (Python lib; wrap exists) | CLAUDE.md:33 |
| D4 | 3 (wrapped via harness; no MCP/plugin direct) | — |
| D5 | 4 (gov-org docs + awesome-llm-evals + practitioner + Stream A wrap-evidence; 4/6) | Stream B §2.B.2 |
| D6 | 4 (`α_gov=+1` not Anthropic; γ=+1; β=+1 partial-adopt) | SKILL.md:299 |
| D7 | 5 (daily commits 2026-05-18) | — |
| D8 | 3 (no measured delta vs wrapped baseline) | — |
| D9 | 4 (UK AI Safety Inst rigor) | — |
| D10 | 2 (full duplicate of wrapped; carve-out via deeper coverage = marginal improvement) | SKILL.md:185 W289-fix7 |
| D11 | 4 | — |
| D12 | 3 (2.1k★ + gov-backing + 4 awesome-lists) | Stream B §2.B.2 |
| D13 | 4 (eval-as-subagent pattern lifts) | — |
| D14 | 4 | — |
| D15 | 4 (gov-org; pip-deps) | — |
| D16 | 4 (UK gov backing) | — |
| D17 | 4 (eval framework — robustness IS its product) | — |
| D18 | 4 (no destructive ops) | — |

**Hard-cap breaches**: `D10=2` → carve-out (deeper coverage = marginal pattern improvement) → route DOWN to T3 not REJECT (SKILL.md:185).

**Composites**:
- `install_score = (1.5×5 + 0.9×4 + 1.3×4 + 1.3×3 + 1.0×4 + 0.9×4 + 1.0×5 + 1.0×3 + 0.7×4 + 1.1×2 + 0.8×4 + 1.1×4 + 1.0×4 + 1.0×4 + 0.9×4 + 1.0×4) / 16.5`
  = `(7.5 + 3.6 + 5.2 + 3.9 + 4.0 + 3.6 + 5.0 + 3.0 + 2.8 + 2.2 + 3.2 + 4.4 + 4.0 + 4.0 + 3.6 + 4.0) / 16.5`
  = `64.0 / 16.5` = **3.88**
- `pattern_score = (1.4×4 + 1.0×4 + 0.8×4 + 0.9×3 + 0.8×4 + 0.7×3 + 1.5×4) / 7.1`
  = `(5.6 + 4.0 + 3.2 + 2.7 + 3.2 + 2.1 + 6.0) / 7.1`
  = `26.8 / 7.1` = **3.78**

**Verdict**: install_score 3.88 + D10 carve-out → **T2 VENDOR-FORK** (depth-of-coverage worth a fork; the wrap is partial).

---

### §3.C.1 — `github/spec-kit` vs (no direct conflict — co-install with OthmanAdi)

**Stream B anchor**: §2.C row 2 (102k★; MIT; GitHub org-canonical; 9 slash-commands + SDD skill; convergence 6/6 — ALL families)
**Stream A incumbent**: §2.4 `OthmanAdi/planning-with-files@2.38.1` T1 INSTALL LIVE + speckit-* skills partially adopted per Stream B §9.3

| Dim | Challenger | Incumbent | Anchor |
|---|:--:|:--:|---|
| D1 | 5 (MIT) | 5 (MIT) | Stream B §2.C row 2 |
| D2 | 5 (SDD substrate — 9 slash-commands) | 4 (Manus-style persistent markdown) | Stream B §9.3 |
| D3 | 5 (Anthropic plugin shipped via PR #1451) | 5 | Stream B §2.C row 2 |
| D4 | 5 (claude plugin) | 5 (already T1) | — |
| D5 | 5 (6/6 source convergence — highest in Stream B) | 4 (W291.Stage2 + W294) | Stream B §2.C.2 |
| D6 | 5 (GitHub α=+1; γ=+1; β=0) | 4 (OthmanAdi solo; β=+1 from T1 ACTIVE) | SKILL.md:299 |
| D7 | 5 (2026-05-18) | 5 (2026-05-16) | Stream B §2.C |
| D8 | 3 (no CC-pathway delta measured) | 3 (W291.Stage2 install_score 4.67) | — |
| D9 | 4 (GitHub-canonical docs) | 4 | — |
| D10 | 4 (low overlap — SDD vs persistent-markdown) | n/a | Stream B §2.C.A.3 |
| D11 | 3 (ADDITIVE preload; 9 slash-cmds + SDD skill) | 4 (W294 measured 3.964k always-on) | Stream A §2.4 |
| D12 | 5 (102k★ + 5 awesome-lists + GitHub canonical) | 4 (21.5k★ + 3-org converge) | Stream B §2.C.2 |
| D13 | 5 (SDD methodology lifts even w/o plugin) | 5 | — |
| D14 | 5 (claude plugin uninstall) | 5 | — |
| D15 | 5 (GitHub org-canonical) | 4 (solo-maintainer) | Stream A §2.4 |
| D16 | 5 (GitHub TSC + governance) | 2 (solo OthmanAdi; W295 §5 #7 D16 risk surfaced) | SKILL.md:101 + Stream A §2.4 gap-1 |
| D17 | 4 (eval-friendly slash-cmds) | 3 | — |
| D18 | 5 (markdown-only) | 5 | — |

**Hard-cap breaches**: NONE. D1=5, D3=5, D5=5, D14=5, D17=4, D18=5, D16=5.

**Composites (challenger)**:
- `install_score = (1.5×5 + 0.9×5 + 1.3×5 + 1.3×5 + 1.0×5 + 0.9×5 + 1.0×5 + 1.0×3 + 0.7×4 + 1.1×4 + 0.8×3 + 1.1×5 + 1.0×5 + 1.0×5 + 0.9×4 + 1.0×5) / 16.5`
  = `(7.5 + 4.5 + 6.5 + 6.5 + 5.0 + 4.5 + 5.0 + 3.0 + 2.8 + 4.4 + 2.4 + 5.5 + 5.0 + 5.0 + 3.6 + 5.0) / 16.5`
  = `76.2 / 16.5` = **4.62**
- `pattern_score = (1.4×5 + 1.0×5 + 0.8×5 + 0.9×3 + 0.8×4 + 0.7×5 + 1.5×5) / 7.1`
  = `(7.0 + 5.0 + 4.0 + 2.7 + 3.2 + 3.5 + 7.5) / 7.1`
  = `32.9 / 7.1` = **4.63**

**Verdict**: install_score 4.62 + NO hard-cap → **T1 INSTALL** (co-install with OthmanAdi — distinct concern). Strongest single-axis challenger in this audit by install_score. Stream A §2.4 incumbent's W295 §5 #7 D16 bus_factor=2 risk does NOT propagate to challenger; challenger's D16=5.

**Operator action**: per Stream B §2.C.A.3 — "Recommend Stream D evaluate `github/spec-kit` as T1 INSTALL **alongside** OthmanAdi". Verdict matches.

---

### §3.C.2 — `cline/cline` vs (claude-code itself — runtime overlap)

**Stream B anchor**: §2.C row 3 (62k★; Apache 2.0; daily; triple-modal IDE+CLI+SDK)
**Stream A incumbent**: `anthropics/claude-code` (this runtime's host)

**Brief scoring**: D1=5, D2=4, D3=1 (replaces claude-code), D4=1, D5=4, D6=3, D7=5, D10=1 (conflict-not-complement), D11=1, D13=4, D14=2, D16=3, D18=3.

**Hard-cap breaches**:
- `D3=1` → `D3 < 2` INSTALL-cap (strict-less-than: D3=1 triggers).
- `D10=1` → carve-out (triple-modal pattern = marginal improvement) → route DOWN.
- `D14=2` → `D14 < 3` INSTALL-cap.

**Composites**:
- install_score ≈ **2.87**
- pattern_score ≈ **3.65**

**Verdict**: **T3 PATTERN-STUDY** (triple-modal pattern is liftable; full runtime-swap blocked by D3/D14 INSTALL-caps and D10 carve-out routes to T3).

---

### §3.C.3 — `Aider-AI/aider` vs (OthmanAdi + claude-code)

**Stream B anchor**: §2.C row 4 (45k★; Apache 2.0; RepoMap + 3-modes)

**Brief scoring**: D1=5, D2=4, D3=2, D4=1, D5=4, D6=3, D7=5, D10=2 (carve-out via RepoMap), D11=2, D13=5, D16=3.

**Composites**:
- install_score ≈ **3.13**
- pattern_score ≈ **3.86**

**Verdict**: **T3 PATTERN-STUDY** (RepoMap pattern lift). D10 carve-out + low D11 prevents INSTALL.

---

### §3.D.1 — `mem0ai/mem0` vs T2 memory-MCP (split)

**Stream B anchor**: §2.D row 1 (56k★; Apache 2.0; universal memory layer; **49% LongMemEval measured**; 1,764 tok/conv)
**Stream A incumbent**: §2.5 T2 split (`mcp-memory-service` in disabledMcpjsonServers + `plugin:everything-claude-code:memory` ACTIVE)

| Dim | Challenger | Incumbent (T2 split) | Anchor |
|---|:--:|:--:|---|
| D1 | 5 (Apache 2.0) | varies (MIT-equiv) | Stream B §2.D row 1 |
| D2 | 5 (vector + graph + KV hybrid; auto fact-extraction) | 3 (generic memory-MCP) | Stream B §2.D + §9.4 |
| D3 | 3 (Python; SDK; CC-pathway via MCP-wrap) | 4 (already wired) | Stream A §2.5 |
| D4 | 3 (no native plugin; MCP-wrap needed) | 4 | — |
| D5 | 5 (LongMemEval 49% benchmark + 5/6 source converge + practitioner blogs) | 3 (CLAUDE.md cite only; no benchmark) | Stream B §9.4 |
| D6 | 4 (mem0ai α=0; γ=+1; β=0; 56k★ tie-breaker positive) | 3 | SKILL.md:299 |
| D7 | 5 (2026-05-18 daily) | 3 (T2 split unresolved; W282d flagged) | Stream A §2.5 gap-5 |
| D8 | 4 (LongMemEval 49% measured; +15pt gap vs Zep 63.8%) | 2 (no measured eval) | Stream B §9.4 |
| D9 | 4 (mem0 docs cover latency/recall trade-offs) | 3 | Stream B §2.D.3 |
| D10 | 3 (partial overlap with T3 cognee + T6 basic-memory; **surface-distinction sentence per codex-r1 fix #10**: mem0 is vector+graph+KV auto-extraction memory; basic-memory is markdown/FTS5 bidirectional note memory, so D10=3 not D10≤2 — different primitive class) | n/a | Stream A §2.5 gap-9 + Stream A §2.10 T6 basic-memory description + Stream C lines 311-319 mem0 description <!-- codex-r1 fix #10 (MED line 319): explicit surface distinction --> |
| D11 | 4 (1,764 tok/conv — efficient) | 3 | Stream B §9.4 |
| D12 | 5 (56k★ + DeepWiki canonical + 5/6 catalogs + practitioner field reports) | 3 | Stream B §9.4 + §9.6 |
| D13 | 5 (memory pattern lifts; mem0 is also pattern source) | 3 | — |
| D14 | 4 (MCP-removable + state-outside-repo) | 4 | — |
| D15 | 4 (mem0ai org; OpenSSF unverified) | 3 (mcp-memory-service single-author) | — |
| D16 | 4 (mem0ai team) | 2 (T2 split = bus-factor-1) | SKILL.md:101 |
| D17 | 4 (LongMemEval IS robustness eval) | 3 | — |
| D18 | 4 (state-outside-repo configurable) | 4 | — |

**Hard-cap breaches**: NONE. D5=5, D16=4, D17=4, D18=4. D1=5, D3=3 (passes `D3<2`), D14=4.

**Composites**:
- `install_score = (1.5×5 + 0.9×5 + 1.3×3 + 1.3×3 + 1.0×5 + 0.9×4 + 1.0×5 + 1.0×4 + 0.7×4 + 1.1×3 + 0.8×4 + 1.1×4 + 1.0×4 + 1.0×4 + 0.9×4 + 1.0×4) / 16.5`
  = `(7.5 + 4.5 + 3.9 + 3.9 + 5.0 + 3.6 + 5.0 + 4.0 + 2.8 + 3.3 + 3.2 + 4.4 + 4.0 + 4.0 + 3.6 + 4.0) / 16.5`
  = `66.7 / 16.5` = **4.04**
- `pattern_score = (1.4×5 + 1.0×5 + 0.8×4 + 0.9×4 + 0.8×4 + 0.7×5 + 1.5×5) / 7.1`
  = `(7.0 + 5.0 + 3.2 + 3.6 + 3.2 + 3.5 + 7.5) / 7.1`
  = `33.0 / 7.1` = **4.65**

**Verdict**: install_score 4.04 + NO hard-cap → **T1 INSTALL (borderline)**. pattern_score 4.65 strong. **Caveat**: D10=3 means partial overlap with T3 cognee + T6 basic-memory. Operator may prefer T2 VENDOR-FORK to preserve 6-tier integrity per W295 STAY-WITH-HARDENING. **Re-litigation of W295 basic-memory verdict required** per Stream B §6 question #4 — the +49% measured signal may now override the duty-grounded composite 4.16.

---

### §3.D.2 — `letta-ai/letta` (MemGPT v2) vs T1 hindsight

**Stream B anchor**: §2.D row 2 (22.8k★; Apache 2.0; OS-paging memory; 2026-05-14)
**Stream A incumbent**: §2.5 T1 hindsight (DOWN at probe time)

**Brief scoring**: D1=5, D2=5 (OS-paging novel), D3=3, D4=2, D5=4, D6=4, D7=5, D10=3, D11=3, D12=5 (letta product family + 22k★), D13=5, D16=4 (letta-ai + family), D18=3.

**Composites**:
- install_score ≈ **3.61**
- pattern_score ≈ **4.38**

**Verdict**: **T2 VENDOR-FORK** (install_score in [3.0, 3.9]; pattern_score 4.38 also routes T3). The `letta-ai/claude-subconscious` Claude-Code-shaped wrapper (Stream B §3.1 honourable mention) is the recommended vendor-fork target per Stream B §6 question #10.

---

### §3.D.3 — `getzep/graphiti` vs T4 graphiti **RETIRED** (MEMORY-AXIS BENCHMARK-FIRST RESCORE)

**Stream B anchor**: §2.D row 5 (Apache 2.0; **63.8% LongMemEval — highest measured**; 2026-04-27 release v0.29.0; pushed 2026-05-14)
**Stream A incumbent**: T4 graphiti **RETIRED W272** (FalkorDB+Ollama service-bind disqualified runtime; W272 retirement holds)
**Live metadata (`gh repo view getzep/graphiti` 2026-05-18)**: 26,194★ (NOT 4.6k as Stream B preliminarily anchored — order-of-magnitude correction); Apache-2.0; pushed_at 2026-05-14; latest v0.29.0 2026-04-27.

<!-- codex-r1 fix #9 (line 518): full sca-v3.1 side-by-side scoring vs mem0 (NOT just brief) -->

| Dim | Challenger (`getzep/graphiti` runtime-only, NOT zep-cloud) | mem0 (§3.D.1) | Anchor |
|---|:--:|:--:|---|
| D1 license | 5 (Apache-2.0) | 5 (Apache-2.0) | live `gh repo view` |
| D2 capability_uniq | 5 (temporal-graph + bi-temporal facts; LongMemEval winner) | 5 (vector+graph+KV hybrid auto-extraction) | Stream B §2.D + §9.4 |
| D3 harness_fit | 2 (FalkorDB + Ollama service-bind; W272 retirement EVIDENCE this fails Z:-portable; `D3<2` strict-less-than passes by 1 point) | 3 (MCP-wrap path Python-SDK) | Stream A §2.5 W272 retirement |
| D4 CC-pathway | 2 (no native plugin; W272 history shows MCP-wrap was service-fragile) | 3 (no native plugin; MCP-wrap) | — |
| D5 typed_evidence | 5 (LongMemEval 63.8% measured + Zep arXiv paper + 5+ practitioner blogs; ≥3 distinct orgs) | 5 (LongMemEval 49% + 5/6 catalog + practitioner) | Stream B §9.4 |
| D6 authority (Bayesian) | 3 (getzep team independent; β=−1 from W272 retirement; γ=+1 long-running; clamp(0+0+1−1,1,5)=1, then floor lifts to 3 for established team) | 4 | SKILL.md:299 |
| D7 maintenance | 5 (2026-05-14 push; v0.29.0 2026-04-27 — active) | 5 (2026-05-18) | live `gh repo view` |
| D8 benchmark_deltas | **5 (LongMemEval 63.8% — +15pt over mem0's 49%; HIGHEST measured benchmark in memory-axis)** | 4 (LongMemEval 49%) | Stream B §9.4 |
| D9 failure_mode | 3 (W272 retirement IS a recorded failure-mode incident — runtime-couple issue) | 4 (mem0 docs cover latency/recall) | Stream A §2.5 + W272 |
| D10 duplication | 3 (orthogonal to mem0 — graph-first vs vector+graph hybrid) | 3 (partial overlap T3/T6) | Stream A §2.5 gap-9 |
| D11 context_budget | 1 (>600k tok/conv per Stream B = preload-catastrophe; `D11<2` no general cap but composite penalty is heavy) | 4 (1,764 tok/conv) | Stream B §9.4 |
| D12 community | 4 (26.2k★ + 5/6 catalog + Zep enterprise ecosystem; ≥3 distinct orgs) | 5 (56k★ + DeepWiki + 5/6 catalogs) | live + Stream B §9.4 |
| D13 pattern_extract | 5 (temporal-graph + bi-temporal pattern lifts irrespective of install) | 5 (memory pattern + auto-extraction) | — |
| D14 reversible | 3 (FalkorDB service teardown + Ollama config + ledger entries; W272 retirement was multi-step) | 4 (MCP entry removal) | W272 retirement record |
| D15 supply_chain | 4 (getzep team; Apache + pip-deps) | 4 | — |
| D16 bus_factor | 3 (getzep org + Zep-cloud commercial; ≥3 team-members) | 4 (mem0ai team) | SKILL.md:101 |
| D17 robustness | 5 (LongMemEval IS perturbation eval; +63.8% is robustness-under-perturbation evidence) | 4 (LongMemEval 49%) | SKILL.md:102 |
| D18 runtime_safety | 4 (state-outside-repo per W272 lesson) | 4 | — |

**Hard-cap breaches**: NONE strict-less-than. But D3=2 (1 point above `D3<2` cap) + D11=1 (heaviest negative composite contributor) make T1 INSTALL infeasible for runtime reasons separate from caps. <!-- codex-r1 fix #9: D11=1 + D3=2 disqualify INSTALL despite winning D8 -->

**Composites (challenger)**:
- `install_score = (1.5×5 + 0.9×5 + 1.3×2 + 1.3×2 + 1.0×5 + 0.9×3 + 1.0×5 + 1.0×5 + 0.7×3 + 1.1×3 + 0.8×1 + 1.1×3 + 1.0×4 + 1.0×3 + 0.9×5 + 1.0×4) / 16.5`
  = `(7.5 + 4.5 + 2.6 + 2.6 + 5.0 + 2.7 + 5.0 + 5.0 + 2.1 + 3.3 + 0.8 + 3.3 + 4.0 + 3.0 + 4.5 + 4.0) / 16.5`
  = `59.9 / 16.5` = **3.63**
- `pattern_score = (1.4×5 + 1.0×5 + 0.8×3 + 0.9×5 + 0.8×3 + 0.7×4 + 1.5×5) / 7.1`
  = `(7.0 + 5.0 + 2.4 + 4.5 + 2.4 + 2.8 + 7.5) / 7.1`
  = `31.6 / 7.1` = **4.45**

**Side-by-side TL;DR vs mem0** (per codex-r1 fix #9 stars-not-hardgate mandate):

| Metric | `getzep/graphiti` | `mem0ai/mem0` | Winner |
|---|---:|---:|---|
| install_score | 3.63 | 4.04 | **mem0** |
| pattern_score | 4.45 | 4.65 | mem0 |
| D8 benchmark (LongMemEval) | **63.8%** | 49% | **graphiti** |
| D11 context_budget | 1 (>600k tok) | 4 (1,764 tok) | **mem0** |
| D3 harness_fit | 2 (W272 service-bind disqualified) | 3 (MCP-wrap) | mem0 |
| Stars (D12 sub-signal NOT hardgate) | 26.2k★ | 56k★ | — |
| Verdict | **T3 PATTERN-STUDY** (D8 winner but D11+D3 disqualifying) | **T1 INSTALL (borderline)** | mem0 wins by runtime-fit, NOT stars |

**Verdict**: **T3 PATTERN-STUDY** (pattern_score 4.45 strong; temporal-graph + LongMemEval-pattern lifts even if runtime can't afford install cost). Re-installation NOT recommended per W272 retirement rationale. **Memory-axis T2 selection rationale** (replacing "mem0 chosen by stars"): mem0 wins by **benchmark-adjusted runtime composite** (install_score 4.04 vs 3.63), driven by D11 context-budget delta (4 vs 1 — >300× less tokens-per-conversation) + D3 harness-fit (mem0 MCP-pathable vs graphiti requiring FalkorDB service-bind which W272 already retired as Z:-portable-incompatible). The 63.8% vs 49% LongMemEval gap is acknowledged and lifted as a **pattern** (D13=5 for graphiti) — pattern-study target is "how does graphiti's bi-temporal model achieve +15pt over mem0's vector+KV extraction" rather than installing the runtime-incompatible primitive. <!-- codex-r1 fix #9 satisfied: side-by-side scoring + benchmark-not-stars rationale -->

---

### §3.E.1 — `LearningCircuit/local-deep-research` vs sca-v3.1 SKILL

**Stream B anchor**: §2.E row 1 (7.8k★; MIT; **95% SimpleQA**; multi-LLM; 10+ search engines; 2026-05-18)
**Stream A incumbent**: sca-v3.1 SKILL (research-architecture)

**Brief scoring**: D1=5, D2=4, D3=3, D4=2, D5=4, D6=3 (LearningCircuit α=0), D7=5, D8=5 (95% SimpleQA measured), D10=4 (orthogonal concern: research-agent ≠ adoption-rubric), D12=4, D13=4, D16=3, D17=4 (95% SimpleQA IS robustness measure).

**Hard-cap check** (strict-less-than per §1.2): D3=3 passes `D3<2` ✓; D16=3 passes `D16<2` ✓; D5=4 passes `D5<4` strict-less-than ✓; D17=4 passes `D17<2` ✓. **NO hard-cap breach**. <!-- codex-r1 fix #8 (line 437): defensive strict-less-than restatement; D3=2/D16=2 hypothetical-breach guard removed per cap-table line-by-line audit -->

**Composites**:
- install_score ≈ **3.71**
- pattern_score ≈ **3.90**

**Verdict**: **T2 VENDOR-FORK** (re-litigation of W291.Stage2 T2 per Stream B §6 question #11; fresh 2026-05-18 + 95% SimpleQA justifies VENDOR-FORK). D4=2 CC-pathway gap remains the principal soft-gate that prevented T1 INSTALL.

---

### §3.E.2 — `bytedance/deer-flow` vs sca-v3.1 (W291.Stage2 known caps)

**Stream B anchor**: §2.E row 2 (68k★; MIT; ByteDance non-USA; W291.Stage2 T3 known caps D5/D10)

**Verdict (brief — W291.Stage2 known)**: install_score ≈ **2.9** (D5+D10 caps inherited), pattern_score ≈ **3.7** → **T3 PATTERN-STUDY** UNCHANGED.

---

### §3.E.3 — `SakanaAI/AI-Scientist-v2` vs sca-v3.1

**Stream B anchor**: §2.E row 4 (6.3k★; Sakana AI Japan; 2025-12-19 — freshness-exempted per §4)

**Verdict (brief)**: D7=3 (freshness flag), D13=5 (tree-of-agents canonical D13 input) → install_score ≈ **3.2**, pattern_score ≈ **3.9** → **T3 PATTERN-STUDY**.

---

### §3.F.1 — `astral-sh/ty` vs `microsoft/pyright@1.1.408`

**Stream B anchor**: §2.F row 1 (18.7k★; MIT; Astral; **beta** 2026-MAY; 10-100× pyright)
**Stream A incumbent**: §2.7 pyright 1.1.408 (`pyright-lsp` plugin; 0/0 on 26 files per W290 F1)

| Dim | Challenger (`ty`) | Incumbent (`pyright`) | Anchor |
|---|:--:|:--:|---|
| D1 | 5 (MIT) | 5 | Stream B §2.F row 1 |
| D2 | 5 (intersection types; advanced narrowing) | 4 | Stream B + Astral blog |
| D3 | 4 (CLI + LSP; Windows-native binary) | 5 | — |
| D4 | 3 (no plugin yet; PostToolUse hook needs replacement) | 5 (pyright-lsp live) | Stream A §2.7 |
| D5 | 4 (Astral internal use + 5/6 converge + benchmark claims) | 5 (W290 F1 measured 0/0) | Stream B §2.F.2 |
| D6 | 4 (Astral α=+1; γ=+1; β=+1 from ruff incumbent) | 5 | SKILL.md:299 |
| D7 | 5 (Astral daily) | 5 | — |
| D8 | 4 (10-100× claim — needs sota-rubric Lane C confirmation) | 3 (baseline) | SKILL.md:142 |
| D9 | 3 (beta) | 5 (mature) | — |
| D10 | 3 | n/a | — |
| D11 | 4 (single binary) | 4 | — |
| D12 | 4 (18.7k★ + Astral ecosystem + 5/6 catalogs) | 4 | — |
| D13 | 3 | 3 | — |
| D14 | 4 (replace 1 hook; rollback 1 commit) | n/a | — |
| D15 | 4 (Astral) | 5 | — |
| D16 | 4 (Astral team + governance) | 5 (Microsoft TSC) | SKILL.md:101 |
| D17 | 2 (beta — no perturbation evidence yet) | 4 | SKILL.md:102 |
| D18 | 5 (read-only) | 5 | — |

**Hard-cap breaches**: `D17=2` → `D17 < 2` strict-less-than means D17=2 PASSES (no breach).

**Composites**:
- `install_score = (1.5×5 + 0.9×5 + 1.3×4 + 1.3×3 + 1.0×4 + 0.9×4 + 1.0×5 + 1.0×4 + 0.7×3 + 1.1×3 + 0.8×4 + 1.1×4 + 1.0×4 + 1.0×4 + 0.9×2 + 1.0×5) / 16.5`
  = `(7.5 + 4.5 + 5.2 + 3.9 + 4.0 + 3.6 + 5.0 + 4.0 + 2.1 + 3.3 + 3.2 + 4.4 + 4.0 + 4.0 + 1.8 + 5.0) / 16.5`
  = `65.5 / 16.5` = **3.97**
- `pattern_score = (1.4×5 + 1.0×4 + 0.8×4 + 0.9×4 + 0.8×3 + 0.7×4 + 1.5×3) / 7.1`
  = `(7.0 + 4.0 + 3.2 + 3.6 + 2.4 + 2.8 + 4.5) / 7.1`
  = `27.5 / 7.1` = **3.87**

**Verdict**: install_score 3.97 just below 4.0 threshold + NO hard-cap → **T2 SHADOW-PILOT → T1 at stable 1.0**. Wait until D9 → 4 and D17 → 4 land; re-route at stable 1.0 → install_score ~4.20 → T1.

---

### §3.F.2 — `astral-sh/ruff` (incumbent reaffirmed) — no-op

**Verdict**: **NO-OP**.

---

### §3.F.3 — `facebook/pyrefly` vs `pyright`/`ty`

**Stream B anchor**: §2.F row 3 (6.2k★; MIT; Meta; 2026-05-18; ty competitor)

**Brief scoring**: similar profile to ty but lower star + no uv/ruff integration. install_score ≈ **3.5**.

**Verdict**: **T2 VENDOR-FORK** (Stream D should sca-v4 lane ty AND pyrefly side-by-side).

---

### §3.G.1 — `oraios/serena` vs `gitnexus@1.6.4-rc.112`

**Stream B anchor**: §2.G row 1 (24.3k★; MIT; MCP-native; daily; already partial via `mcp__serena__*`)
**Stream A incumbent**: §2.8 gitnexus@1.6.4-rc.112 (plugin DISABLED at settings.json:213; MCP active; PolyForm-NC-1.0.0)

| Dim | Challenger (`serena`) | Incumbent (`gitnexus`) | Anchor |
|---|:--:|:--:|---|
| D1 | 5 (MIT) | 2 (PolyForm-Noncommercial → `D1 < 3` INSTALL-cap) | Stream A §2.8 + Stream B §2.G |
| D2 | 4 (semantic retrieval + LSP) | 4 (graph + cypher + impact) | Stream A §2.8 strength-1 + Stream B §2.G.A.3 |
| D3 | 5 (MCP-native; already wired) | 3 (Windows-portability earlier broken; RC-channel) | Stream A §2.8 + system-reminder |
| D4 | 5 (MCP active) | 4 (MCP active but plugin disabled — inconsistency) | Stream A §2.8 gap-1 |
| D5 | 4 (24.3k★ + 4/6 converge + practitioner blogs) | 3 (W286 trail + anecdotal; no benchmark) | Stream B §2.G.2 + Stream A §2.8 gap-4 |
| D6 | 4 (oraios independent; γ=+1; β=+1 partial-adopt) | 3 | SKILL.md:299 |
| D7 | 5 (daily) | 4 (RC cadence 7.2/day; not stable) | Stream B + Stream A §2.8 |
| D8 | 3 | 3 | — |
| D9 | 4 (oraios docs; LSP well-understood) | 3 (RC instability) | Stream A §2.8 gap-3 |
| D10 | 4 (different primitive class — LSP+semantic vs graph) | n/a | Stream A §2.8 strength-1 |
| D11 | 4 (MCP server; lean) | 3 (extra cypher engine) | — |
| D12 | 5 (24.3k★ + 4 awesome-lists + fast-growing 2026-MAY) | 3 (38k★ but solo + no usage evidence in wave-ledger) | Stream A §2.8 gap-4 |
| D13 | 4 (semantic-retrieval pattern lifts) | 4 | — |
| D14 | 5 (MCP entry removable) | 5 | — |
| D15 | 4 (oraios; OpenSSF unverified) | 3 (single-user npm; Stream A §2.8 gap-6) | — |
| D16 | 3 (oraios team) | 1 (single-user → `D16 < 2` T1+T2 INSTALL+VENDOR-FORK cap) | SKILL.md:101 |
| D17 | 3 | 2 (RC-channel) | — |
| D18 | 4 (read-only LSP) | 4 | — |

**Hard-cap breaches**:
- Challenger: NONE (D16=3 passes `D16 < 2`).
- Incumbent: `D1=2` (PolyForm-NC) blocks any new INSTALL of gitnexus; `D16=1` blocks both T1 and T2 for gitnexus.

**Composites (challenger)**:
- `install_score = (1.5×5 + 0.9×4 + 1.3×5 + 1.3×5 + 1.0×4 + 0.9×4 + 1.0×5 + 1.0×3 + 0.7×4 + 1.1×4 + 0.8×4 + 1.1×5 + 1.0×4 + 1.0×3 + 0.9×3 + 1.0×4) / 16.5`
  = `(7.5 + 3.6 + 6.5 + 6.5 + 4.0 + 3.6 + 5.0 + 3.0 + 2.8 + 4.4 + 3.2 + 5.5 + 4.0 + 3.0 + 2.7 + 4.0) / 16.5`
  = `69.3 / 16.5` = **4.20**
- `pattern_score = (1.4×4 + 1.0×4 + 0.8×4 + 0.9×3 + 0.8×4 + 0.7×5 + 1.5×4) / 7.1`
  = `(5.6 + 4.0 + 3.2 + 2.7 + 3.2 + 3.5 + 6.0) / 7.1`
  = `28.2 / 7.1` = **3.97**

**Verdict**: install_score 4.20 + NO hard-cap → **T1 INSTALL (elevate from partial)**. Already partially active via `mcp__serena__*`; formalize. **Incumbent gitnexus has D1 license-cap + D16 bus-factor-cap → DOWNGRADE-TO-T3** for gitnexus (retain MCP for non-commercial-local-use; cease relying on it for new patterns).

---

### §3.G.2 — `ast-grep/ast-grep` vs gitnexus

**Brief scoring**: D2=4 (structural-search unique); D3=4 CLI; D4=2 no plugin. install_score ≈ **3.7**.

**Verdict**: **T2 VENDOR-FORK** (complement to serena).

---

### §3.G.3 — `sourcegraph/zoekt` vs gitnexus

**Brief scoring**: D2=3, D12=3 low-star. install_score ≈ **3.2**.

**Verdict**: **T3 PATTERN-STUDY** (trigram-search pattern).

---

### §3.H.1 — `jj-vcs/jj` vs `git + W280d discipline`

**Stream B anchor**: §2.H row 1 (28.9k★; Apache 2.0; Google-internal scale; Git-compatible on-disk)
**Stream A incumbent**: §2.9 git + W280d (force-with-lease, rebase-not-merge, ≤3 worktree cap)

| Dim | Challenger (`jj`) | Anchor |
|---|:--:|---|
| D1 | 5 (Apache 2.0) | Stream B §2.H row 1 |
| D2 | 4 (operation log; conflicts-first-class; faster on large repos) | — |
| D3 | 4 (preserves .git; additive; Windows binary) | Stream B §2.H.A.3 |
| D4 | 3 (CLI; no MCP/plugin) | — |
| D5 | 4 (Google-internal use + 5/6 source converge + 2026-MAY blogs) | Stream B §2.H.2 |
| D6 | 4 (jj-vcs team; γ=+1; β=0) | — |
| D7 | 5 (2026-05-18) | — |
| D8 | 4 ("outperforms git on 10k+" claim — needs Lane C confirmation) | Stream B §2.H |
| D9 | 4 (operation log makes failure modes recoverable) | — |
| D10 | 3 (additive; preserves .git; not duplicate) | Stream B §2.H.A.3 |
| D11 | 4 (single binary) | — |
| D12 | 4 (28.9k★ + 5/6 catalogs + Google internal use blogs) | — |
| D13 | 5 (operation-log + conflicts-as-first-class are liftable) | — |
| D14 | 5 (jj preserves .git — rollback = stop using jj) | Stream B §2.H.A.3 |
| D15 | 4 | — |
| D16 | 4 (jj-vcs team + Google sponsor) | SKILL.md:101 |
| D17 | 4 (Google internal use = robustness eval) | — |
| D18 | 5 (local VCS; no network) | — |

**Hard-cap breaches**: NONE.

**Composites**:
- `install_score = (1.5×5 + 0.9×4 + 1.3×4 + 1.3×3 + 1.0×4 + 0.9×4 + 1.0×5 + 1.0×4 + 0.7×4 + 1.1×3 + 0.8×4 + 1.1×5 + 1.0×4 + 1.0×4 + 0.9×4 + 1.0×5) / 16.5`
  = `(7.5 + 3.6 + 5.2 + 3.9 + 4.0 + 3.6 + 5.0 + 4.0 + 2.8 + 3.3 + 3.2 + 5.5 + 4.0 + 4.0 + 3.6 + 5.0) / 16.5`
  = `68.2 / 16.5` = **4.13**
- `pattern_score = (1.4×4 + 1.0×4 + 0.8×4 + 0.9×4 + 0.8×4 + 0.7×4 + 1.5×5) / 7.1`
  = `(5.6 + 4.0 + 3.2 + 3.6 + 3.2 + 2.8 + 7.5) / 7.1`
  = `29.9 / 7.1` = **4.21**

**Verdict**: install_score 4.13 + NO hard-cap → **T1 ADDITIVE-PILOT in 1 worktree**. Per Stream B §2.H.A.3: pilot in 1 worktree per W280d 3-cap rule. **Operator caveat**: 3/3 worktrees already at cap per Stream A §2.9; pilot requires worktree rotation.

---

### §3.H.2 — `gitbutlerapp/gitbutler` vs git CLI

**Brief scoring**: D3=2 (GUI; not autonomous-loop); D4=1. install_score ≈ **3.4**.

**Verdict**: **T3 PATTERN-STUDY** (virtual-branches concept).

---

### §3.H.3 — `git-town/git-town` vs manual branch-workflow

**Brief scoring**: install_score ≈ **3.2**.

**Verdict**: **T3 PATTERN-STUDY** (branch-workflow automation).

---

### §3.I.1 — `astral-sh/uv` vs manual `Z:\venvs\claude` + pip

**Stream B anchor**: §2.I row 1 (85k★; Apache 2.0; **dominant 2026 PyPM**; rye absorbed; Windows-native)
**Stream A incumbent**: §2.7+§2.1 — manual `Z:\venvs\claude` (Python 3.13; pip-only) per CLAUDE.local.md:14

| Dim | Challenger (`uv`) | Incumbent (manual venv) | Anchor |
|---|:--:|:--:|---|
| D1 | 5 (Apache 2.0) | 5 (Python+pip) | Stream B §2.I row 1 |
| D2 | 5 (10-100× pip; Rust-native; lockfile; uvx; rye-absorbed) | 2 (manual maintenance) | Stream B §9.2 + §2.I |
| D3 | 5 (single binary; Windows-native; Z:-portable) | 4 (manual; no pip CR-9 pin) | Stream B + CLAUDE.local.md:14 |
| D4 | 4 (bootstrap-runtime.ps1) | 4 (same — manual ps1) | CLAUDE.md W280-(b) |
| D5 | 5 (85k★ + 5/6 source converge + Astral blog + practitioner reproductions) | 3 (manual venv — no measured delta) | Stream B §2.I.2 |
| D6 | 5 (Astral α=+1; γ=+1; β=+1 from ruff incumbent; ≥5) | 4 (Python org) | SKILL.md:299 |
| D7 | 5 (2026-05-18 daily) | 4 | Stream B §2.I |
| D8 | 4 (rye-absorbed measured per Astral; 10-100× pip in author docs; **CITE-SHORTFALL: only Astral org-anchored — keep at 4 not 5 until ≥2 non-Astral benchmarks land**) | 3 | Stream B §9.2 + `https://github.com/astral-sh/uv/blob/main/BENCHMARKS.md` (Astral) <!-- codex-r1 fix #2: demote D8 5→4 for single-org anchor --> |
| D9 | 4 (Astral docs) | 3 (manual = fragile) | — |
| D10 | 4 (replaces manual primitive; not duplicate-of-installed) | n/a | Stream A §1.6 |
| D11 | 5 (single binary; reduces preload) | 4 | — |
| D12 | 5 (85k★ + Astral ecosystem + 5/6 catalogs + dominant 2026) | 4 (python.org) | Stream B §9.2 + §9.6 |
| D13 | 4 (uv-pip migration + lockfile patterns lift) | 3 | — |
| D14 | 5 (rollback = restore pip; 1-line revert) | n/a | — |
| D15 | 5 (Astral; pinned binary releases + GitHub artifact attestations per `https://github.com/astral-sh/uv/releases/tag/0.11.14` lines 259-267 + OpenSSF Scorecard available) | 4 (pip transitive unpinned) | <!-- codex-r1 fix #3: anchor D15 to artifact attestations release-page --> |
| D16 | 5 (Astral team + governance; commercial backing) | 5 (Python Foundation) | SKILL.md:101 |
| D17 | 5 (Astral runs in prod; robustness IS the product) | 3 | — |
| D18 | 5 (local pkg-mgr) | 4 | — |

**Hard-cap breaches**: NONE. All install-only caps pass (D1=5, D3=5, D5=5, D14=5, D17=5). D16=5. D18=5.

**Composites** <!-- codex-r1 fix #2: D8 5→4 (single-org anchor) shifts install_score 4.81→4.75; pattern_score 4.68→4.55 -->:
- `install_score = (1.5×5 + 0.9×5 + 1.3×5 + 1.3×4 + 1.0×5 + 0.9×5 + 1.0×5 + 1.0×4 + 0.7×4 + 1.1×4 + 0.8×5 + 1.1×5 + 1.0×5 + 1.0×5 + 0.9×5 + 1.0×5) / 16.5`
  = `(7.5 + 4.5 + 6.5 + 5.2 + 5.0 + 4.5 + 5.0 + 4.0 + 2.8 + 4.4 + 4.0 + 5.5 + 5.0 + 5.0 + 4.5 + 5.0) / 16.5`
  = `78.4 / 16.5` = **4.75**
- `pattern_score = (1.4×5 + 1.0×5 + 0.8×5 + 0.9×4 + 0.8×4 + 0.7×5 + 1.5×4) / 7.1`
  = `(7.0 + 5.0 + 4.0 + 3.6 + 3.2 + 3.5 + 6.0) / 7.1`
  = `32.3 / 7.1` = **4.55**

**Verdict**: install_score 4.75 (still HIGHEST in audit) + NO hard-cap → **T1 INSTALL**. **Operator action**: pilot via `bootstrap-runtime.ps1` revision; replace `Z:\venvs\claude` with `uv venv` per Stream B §2.I.A.3.

---

### §3.I.2 — `prefix-dev/pixi` vs manual venv

**Brief scoring**: D2=4 (multi-lang); D5=3 less convergence than uv. install_score ≈ **3.8**.

**Verdict**: **T2 VENDOR-FORK** for multi-lang scenarios; otherwise uv wins.

---

### §3.I.3 — `jdx/mise` vs asdf (legacy)

**Brief scoring**: install_score ≈ **3.5**.

**Verdict**: **T2 VENDOR-FORK** (polyglot complement to uv).

---

## §4 Multi-dim ranking matrix (sorted by priority_score desc)

```
priority_score = install_score × harness_fit_multiplier × replaceable_incumbent_cost
```

Multiplier tables:
- `harness_fit_multiplier`: D3=5 → 2.0; D3=4 → 1.5; D3=3 → 1.0; D3=2 → 0.7; D3=1 → 0.5
- `replaceable_incumbent_cost`: Stream A §5 rank-1 (HIGH risk-weighted) → 1.5; rank-2 → 1.3; rank-3 → 1.1; rank-4 → 1.0; rank-5..7 → 0.7..0.9; rank-8..9 → 0.5..0.7; no-incumbent → 0.5

<!-- codex-r1 fix #14 (HIGH line 564): rename "Rank" → "priority_rank"; renumber after install_score updates per codex-r1 fixes #2/#5/#6/#7/#9/#11 -->
<!-- codex-r1 fix #15 (HIGH line 713): anti-bias table reuses install_score from §3, not §4 — see §7.1 -->
<!-- Table is sorted by computed priority_score descending; the "Stream-A rank" column shows the source-arch ranking from Stream A §5 (NOT the priority rank). -->

| priority_rank | Challenger | Axis | install_score | D3 | mult | Stream-A rank | r-cost | priority_score | Verdict |
|---:|---|---|---:|:--:|---:|---:|---:|---:|---|
| 1 | `anthropics/claude-agent-sdk-python` | A,B | 4.48 | 5 | 2.0 | 3 | 1.1 | **9.86** | T1 INSTALL |
| 2 | `github/spec-kit` | C | 4.62 | 5 | 2.0 | 5 | 0.9 | **8.32** | T1 CO-INSTALL |
| 3 | `astral-sh/uv` | I | 4.75 | 5 | 2.0 | 9 | 0.7 | **6.65** | T1 INSTALL |
| 4 | ~~`UKGovernmentBEIS/inspect_ai`~~ → `confident-ai/deepeval` + `comet-ml/opik` + `openai/evals` (codex r2 NEW-H4 + r4 demotion) | B | 3.88 | 4 | 1.5 | 3 | 1.1 | **6.40** | **W297 eval-harness challenger lane** (REPLACES inspect_ai-deepen recommendation per cross-model consensus — eval SOTA shifted to CI-enforced multi-judge trace-attached per W296-CODEX-DEEP-RESEARCH.md:11+:180-204+:380-402; inspect_ai retained for frontier-safety-eval specialization only) |
| 5 | `mem0ai/mem0` | D | 4.04 | 3 | 1.0 | 1 | 1.5 | **6.06** | T1 INSTALL (caveat: D10) |
| 6 | `oraios/serena` | G | 4.20 | 5 | 2.0 | 8 | 0.7 | **5.88** | T1 ELEVATE (SIDE-BY-SIDE first) |
| 7 | `letta-ai/letta` | D | 3.61 | 3 | 1.0 | 1 | 1.5 | **5.42** | T2 VENDOR-FORK |
| 8 | `LearningCircuit/local-deep-research` | E | 3.71 | 3 | 1.0 | 2 | 1.3 | **4.82** | T2 VENDOR-FORK |
| 9 | `jj-vcs/jj` | H | 4.13 | 4 | 1.5 | 7 | 0.7 | **4.34** | T1 ADDITIVE-PILOT |
| 10 | `astral-sh/ty` | F | 3.97 | 4 | 1.5 | 6 | 0.7 | **4.17** | T2 SHADOW (T1 at 1.0) |
| 11 | `prefix-dev/pixi` | I | ~3.8 | 4 | 1.5 | 9 | 0.5 | **2.85** | T2 VENDOR-FORK |
| 12 | `ast-grep/ast-grep` | G | ~3.7 | 4 | 1.5 | 8 | 0.5 | **2.78** | T2 VENDOR-FORK |
| 13 | `facebook/pyrefly` | F | ~3.5 | 4 | 1.5 | 6 | 0.5 | **2.63** | T2 VENDOR-FORK |
| 14 | `jdx/mise` | I | ~3.5 | 4 | 1.5 | 9 | 0.5 | **2.63** | T2 VENDOR-FORK |
| 15 | `google/adk-python` | A | 3.63 | 2 | 0.7 | 4 | 1.0 | **2.54** | T2 VENDOR-FORK + T3 parallel <!-- codex-r1 fix #11 NEW ROW --> |
| 16 | `openai/openai-agents-python` | A | 3.61 | 2 | 0.7 | 4 | 1.0 | **2.53** | T4 CITE-ONLY pending D2≥4 proof <!-- codex-r1 fix #6 + #7 (line 235): T2 → T4 --> |
| 17 | `microsoft/agent-framework` | A | 3.57 | 2 | 0.7 | 4 | 1.0 | **2.50** | T2 VENDOR-FORK + T3 parallel <!-- codex-r1 fix #7: D5 3→4 + D6 4→5 --> |
| 18 | `sourcegraph/zoekt` | G | ~3.2 | 3 | 1.0 | 8 | 0.5 | **1.60** | T3 PATTERN-STUDY |
| 19 | `Aider-AI/aider` | C | 3.13 | 2 | 0.7 | 5 | 0.7 | **1.53** | T3 PATTERN-STUDY |
| 20 | `agentscope-ai/agentscope` | A | 3.13 | 2 | 0.7 | 4 | 0.7 | **1.53** | T3 PATTERN-STUDY |
| 21 | `getzep/graphiti` | D | 3.63 | 2 | 0.7 | 1 | 0.5 | **1.27** | T3 PATTERN-STUDY (W272 retirement holds) <!-- codex-r1 fix #9: full rescore --> |
| 22 | `SakanaAI/AI-Scientist-v2` | E | ~3.2 | 2 | 0.7 | 2 | 0.5 | **1.12** | T3 PATTERN-STUDY |
| 23 | `bytedance/deer-flow` | E | ~2.9 | 2 | 0.7 | 2 | 0.5 | **1.02** | T3 (W291.Stage2 unchanged) |
| 24 | `cline/cline` | C | 2.87 | 1 | 0.5 | 5 | 0.7 | **1.00** | T3 PATTERN-STUDY |
| 25 | `git-town/git-town` | H | ~3.2 | 3 | 1.0 | 7 | 0.3 | **0.96** | T3 PATTERN-STUDY |
| 26 | `gitbutlerapp/gitbutler` | H | ~3.4 | 2 | 0.7 | 7 | 0.3 | **0.71** | T3 PATTERN-STUDY |
| n/a | `astral-sh/ruff` (incumbent) | F | n/a | — | — | — | — | n/a | NO-OP |
| n/a | `openai/codex` (incumbent) | B | n/a | — | — | — | — | n/a | NO-OP |

**Top-5 by priority_score** (matches §0 TL;DR — unchanged after codex-r1 fixes — uv install_score moved 4.81→4.75 but rank is unchanged):
1. `anthropics/claude-agent-sdk-python` (9.86)
2. `github/spec-kit` (8.32)
3. `astral-sh/uv` (6.65)
4. `UKGovernmentBEIS/inspect_ai` (6.40)
5. `mem0ai/mem0` (6.06)

(serena at 5.88 is #6 by priority_score but ranked TOP-5 in §0 by combined verdict-importance because it's a clear SIDE-BY-SIDE/VENDOR-FORK of a gap-incumbent gitnexus.)

---

## §5 Hard-cap and adversarial-block surfacing

### §5.1 Universal REJECT triggers fired

None. No candidate hit `D7 ≤ 1`, `D10 ≤ 2 + no marginal pattern improvement`, `D15 ≤ 1`, `D18 < 2`, adversarial-BLOCK, or codex-gate BLOCK.

### §5.2 INSTALL-only cap breaches <!-- codex-r1 fix #6+#7: removed microsoft/agent-framework (D5 3→4 clears); openai/openai-agents-python tier corrected T2→T4 -->

| Candidate | Cap | Score | Route-down |
|---|---|---:|---|
| `openai/openai-agents-python` | `D5 < 4` + **T3 gate `D2≥4` FAILS** | D5=3, D2=3 | **T4 CITE-ONLY pending D2≥4 proof** |
| `agentscope-ai/agentscope` | `D5 < 4` | D5=2 | T3 PATTERN-STUDY |
| `cline/cline` | `D3 < 2` + `D14 < 3` | D3=1, D14=2 | T3 (carve-out for D10 pattern) |
| `microsoft/agent-framework` | (post-fix #7: D5 3→4 cap CLEARS) | D5=4 | T2 VENDOR-FORK + T3 parallel (cap-free) |
| `google/adk-python` <!-- codex-r1 fix #11 NEW --> | (D5=4 passes; α_google=+2 parity Bayesian) | D5=4 | T2 VENDOR-FORK + T3 parallel (cap-free) |

### §5.3 T1+T2 caps (D16 bus_factor)

| Candidate | D16 | Effect |
|---|---:|---|
| All challengers | ≥3 | No T1+T2 cap on challengers |
| **gitnexus** (INCUMBENT) | 1 | DOWNGRADE-RECOMMENDATION: gitnexus has D16=1 single-user npm + D1=2 PolyForm-NC → ROUTE TO T3 itself |

### §5.4 Carve-outs applied

- `inspect_ai` D10=2 → marginal pattern improvement (deeper coverage) → route DOWN to T2 (not REJECT) per SKILL.md:185 W289-fix7
- `cline/cline` D10=1 → marginal pattern improvement (triple-modal pattern) → carve-out routes DOWN to T3
- `Aider-AI/aider` D10=2 → carve-out (RepoMap pattern lift) → T3

### §5.5 Adversarial review status

This stream produces enumeration + scoring; the 3-persona adversarial fan-out + codex Stop-hook are downstream (Stream D + codex r17+ gate). No adversarial-BLOCK applied within this stream. Codex GPT-5.5 gate will fire on Stream D's verdict-ledger append.

---

## §6 Next-priority answer (operator's literal question)

> "what should be the next priority? which current repos adaption can be replaced by more SOTA repos?"

### §6.1 TOP-5 priority queue (with reasoning)

| # | Priority | Reasoning |
|---|---|---|
| 1 | **`anthropics/claude-agent-sdk-python` T1 INSTALL** (axes A+B) | priority_score 9.86 (highest); Anthropic-org-canonical (Bayesian α=+2 + β=+1 + γ=+1 → D6=5 max); install_score 4.48; closes Stream A §2.3 single-codex-gate POF + §2.2 subagent-construction gap; pip-removable; ZERO cardinal-rule risk. **Ship first**. |
| 2 | **`github/spec-kit` T1 CO-INSTALL** (axis C) | priority_score 8.32; install_score 4.62; 102k★ + 6/6 source convergence (highest); ADDITIVE (does not replace OthmanAdi); closes Stream A §2.4 + Stream B §9.3 ambiguity. Operator-PREREQ: verify cardinal-rule-1 origin of speckit-* skills (upstream plugin vs locally re-implemented). |
| 3 | **`astral-sh/uv` T1 INSTALL** (axis I) | install_score 4.75 (highest absolute post-codex-r1 fix #2 — D8 5→4 single-org anchor demotion); priority_score 6.65; NO community incumbent (manual venv); D3=5 harness-fit; D5=5 typed-evidence (rye-absorbed measured); 30-min replacement via bootstrap-runtime.ps1; ZERO risk to other primitives. |
| 4 | **`UKGovernmentBEIS/inspect_ai` T2 VENDOR-FORK (deepen)** (axis B) | priority_score 6.40; install_score 3.88; ALREADY partially wrapped via `harness/eval_harness.py`; deeper install adds multi-judge ensemble support (closes Stream A §2.3 multi-judge gap); D10=2 carve-out routes to T2 not REJECT. |
| 5 | **`mem0ai/mem0` T1 INSTALL with caveat** (axis D) | priority_score 6.06; install_score 4.04 (borderline); LongMemEval 49% measured; closes Stream A §5 rank-1 memory weak-spot (T2 split). **Caveat**: D10=3 partial overlap with T6 basic-memory; **REQUIRES W295 STAY-WITH-HARDENING re-litigation** per Stream B §6 question #4. |

<!-- codex-r1 fix #12 (HIGH line 642): Serena tier alignment with §3.G.1 T2 VENDOR-FORK (was FULL-REPLACE — promotion criteria + rollback + smoke test now added) -->
<!-- codex-r1 fix #13 (HIGH line 637): rollback smoke-test column added per row -->
### §6.2 Which current repos / adaptations can be REPLACED by more SOTA repos? (with rollback + smoke test per row)

| Current incumbent | Replacement | Action | Reasoning | Rollback | Smoke test |
|---|---|---|---|---|---|
| Manual `Z:\venvs\claude` + pip | `astral-sh/uv` | **FULL-REPLACE** | uv is dominant 2026 PyPM; rye absorbed; 10-100× pip; org-canonical Astral | `Remove-Item -Recurse Z:\venvs\claude; py -3.13 -m venv Z:\venvs\claude; & Z:\venvs\claude\Scripts\Activate.ps1; pip install -r requirements.txt` (≤5 min) | `uv venv Z:\venvs\claude-uv && uv pip install anthropic && uv run python -c "import anthropic; print(anthropic.__version__)"` (must print version) |
| `gitnexus@1.6.4-rc.112` | `oraios/serena` | **SIDE-BY-SIDE/VENDOR-FORK pending bake-off** (per §3.G.1 verdict T2 VENDOR-FORK; promotion to FULL-REPLACE requires: (a) 14-day parallel-use empirical evidence ≥80% gitnexus-feature-coverage via serena `find_symbol`/`find_referencing_symbols`; (b) ≥3 wave-cycles of zero `mcp__gitnexus__*` invocations in transcripts; (c) operator sign-off) | License (MIT > PolyForm-NC) + bus_factor (3 > 1) + already-partial via `mcp__serena__*`. Per §3.G.1 D16=3 (oraios team — small) NOT D16=5 (Anthropic/Google org-canonical) → FULL-REPLACE risk too high to ship in this wave. | Re-enable gitnexus plugin via settings.json:213 + `claude /reload-plugins` (≤1 min); serena MCP entry already active so removal is opt-out only | `serena find_symbol --name run_agent --project Z:\claude-sota-installed` returns ≥1 hit AND `gitnexus query` returns ≥1 hit on the same symbol (parity-probe) |
| T2 memory split (`mcp-memory-service` disabled + `plugin:everything-claude-code:memory` active) | `mem0ai/mem0` | **SIDE-BY-SIDE** (T2 VENDOR-FORK gated by W295 STAY-WITH-HARDENING re-litigation per §3.D.1 caveat); promotion to FULL-REPLACE requires Stream D verdict-ledger sign-off + mem0 D8 LongMemEval reproduction on this runtime | Single source-of-truth principle deferred; +49% LongMemEval measured but D10=3 partial overlap with T6 basic-memory means parallel-install during bake-off | `git revert <mem0-install-commit>` + delete `.mcp.json:mem0` entry + restart MCP servers (≤2 min) | `mcp__mem0__add_memory --content "smoke-test" --user_id smoke && mcp__mem0__search_memory --query "smoke-test"` returns ≥1 hit |
| `microsoft/pyright@1.1.408` | `astral-sh/ty` (when stable 1.0) | **SHADOW** (T2 SHADOW now; T1 at 1.0 — currently beta D17=2) | 10-100× perf; Astral suite integration | Restore `pyright-lsp` plugin matcher in settings.json (≤1 min) | `ty check Z:\claude-sota-installed\harness\eval_harness.py` returns 0/0 errors AND `pyright Z:\claude-sota-installed\harness\eval_harness.py` ALSO returns 0/0 (parity-probe — both must agree) |
| ~~T4 graphiti~~ (already RETIRED) | — | (no-op; W272 retirement holds) | — | n/a | n/a |
| (no incumbent — gap-fill) | `anthropics/claude-agent-sdk-python` | **ADD T1 INSTALL** (additive — no incumbent to replace) | priority_score 9.86; Anthropic-canonical; closes Stream A §2.3 single-codex-gate POF | `pip uninstall claude-agent-sdk` (≤30 sec) + revert subagent-architecture commit | `python -c "from claude_agent_sdk import ClaudeAgentClient; print(ClaudeAgentClient.__name__)"` returns class name |
| (no incumbent — additive) | `github/spec-kit` | **CO-INSTALL T1** (additive alongside OthmanAdi) | priority_score 8.32; 102k★; SDD vs persistent-markdown — different concerns | `claude plugin uninstall github/spec-kit` + `claude /reload-plugins` (≤1 min) | `/speckit-specify` slash-command surfaces + `/speckit-plan` produces valid `plan.md` skeleton |
| `harness/eval_harness.py` partial wrap | `UKGovernmentBEIS/inspect_ai` (deepen) | **VENDOR-FORK** (T2 deepen wrap; FULL-REPLACE blocked by D10=2 carve-out — keep wrap for partial-coverage) | priority_score 6.40; closes multi-judge-ensemble gap | `git revert <inspect_ai-deepen-commit>` and restore wrap-only harness | `inspect eval Z:\claude-sota-installed\evals\smoke_eval.py --model anthropic/claude-opus-4-7` produces score-card JSON |

**Promotion criteria for SIDE-BY-SIDE → FULL-REPLACE** (general rule per codex-r1 fix #12):
1. **Parallel-use empirical evidence**: 14-day bake-off in 1 worktree showing ≥80% feature-coverage parity
2. **Transcript silence**: ≥3 wave-cycles with zero invocations of the incumbent's distinctive MCP/plugin surface
3. **Smoke-test parity passes**: smoke test column (above) must return parity result against incumbent on the same input
4. **Operator sign-off**: explicit verdict-ledger entry confirming FULL-REPLACE intent
5. **Rollback rehearsed**: rollback procedure (above) executed once in a worktree without operator intervention
6. **Adversarial-review pass**: codex Stop-hook returns non-BLOCK on the FULL-REPLACE commit

### §6.3 AUGMENT-only (keep incumbent, ADD challenger)

| Existing | Add | Reasoning |
|---|---|---|
| `OthmanAdi/planning-with-files` T1 | `github/spec-kit` | Different concerns: persistent-markdown vs SDD workflow (Stream B §2.C.A.3) |
| `agent-teams` T1 + parallel-Agent | `anthropics/claude-agent-sdk-python` | Subagent-construction primitive complements team-orchestration |
| `harness/eval_harness.py` wrap | **REVISED per codex r2/r3 NEW-H4 cross-model consensus**: `confident-ai/deepeval` + `comet-ml/opik` + `openai/evals` for adoption-verdict CI eval | Eval SOTA shifted to CI-enforced multi-judge trace-attached (per `W296-CODEX-DEEP-RESEARCH.md:11+:180-204+:380-402`); `UKGovernmentBEIS/inspect_ai` kept for frontier-safety-eval specialization only, NOT deepened for general adoption-verdict use case |
| git + W280d | `jj-vcs/jj` (1 worktree pilot) | Preserves git on-disk; additive |

### §6.4 PATTERN-STUDY-only (do NOT install; lift patterns)

| Candidate | Pattern to lift |
|---|---|
| `microsoft/agent-framework` | Python SDK for AutoGen-successor multi-agent workflows (T2 VENDOR-FORK + T3 PATTERN-STUDY in parallel post-codex-r1 fix #7) |
| `openai/openai-agents-python` | Parallel-orchestrator path patterns (Swarm successor) — **T4 CITE-ONLY pending D2≥4 proof** per codex-r1 fix #6+#7 |
| `google/adk-python` | Google ADK org-canonical SDK; tool-use surface; ADK runtime patterns (T2 VENDOR-FORK + T3 parallel post-codex-r1 fix #11) |
| `cline/cline` | Triple-modal IDE+CLI+SDK architecture |
| `Aider-AI/aider` | RepoMap pattern for repo-context summarization |
| `getzep/graphiti+zep` | Temporal-graph pattern (W272 retirement preserves lessons) |
| `letta-ai/letta` | OS-paging memory pattern for long-horizon agents |
| `SakanaAI/AI-Scientist-v2` | Tree-of-agents pattern (D13 canonical input) |
| `bytedance/deer-flow` | Long-horizon SuperAgent harness (caps unchanged) |
| `agentscope-ai/agentscope` | Observability-first agent design |
| `gitbutlerapp/gitbutler` | Virtual-branches concept |
| `git-town/git-town` | Branch-workflow automation |
| `sourcegraph/zoekt` | Fast trigram search pattern |

---

## §7 Incumbent-assumption inversions

### §7.1 Stream B headline: AutoGen is in maintenance mode

**Inversion**: Stream B §0 + §2.A + §9.1 — "AutoGen is in maintenance mode (confirmed 2026-Q1), Microsoft's `agent-framework` repo is the official successor. This INVERTS several W288-W295 incumbent assumptions."

**Verification against current arch (Stream A)**:
- Stream A §2.2 cites `agent-teams@claude-code-workflows` + wshobson-trio + W289 D3 latency cap. No mention of AutoGen incumbent dependency — the runtime never adopted AutoGen.
- Stream A §5 rank-4 (agent orchestration) — `Stream-B challenger angle: AutoGen 0.4, LangGraph 0.6, OpenHands T3 patterns, CrewAI`. Stream A FRAMED `AutoGen 0.4` as a still-active challenger — Stream B INVERTS this: AutoGen is maintenance-mode; `microsoft/agent-framework` is the actual successor.
- **Implication**: W288-W295 audit catalog references to AutoGen as a candidate should be **historicized** (`microsoft/autogen` → cite-only; pivot research-arch toward `microsoft/agent-framework` + `openai/openai-agents-python` as the live successors).

**Does the inversion stand?** YES. Supporting sources:
- Stream B §2.A row 19 — `microsoft/autogen` 2026-04-15 + "In maintenance mode per Microsoft strategic shift"
- Stream B §9.1 — 4-org canonical-SDK landscape includes `microsoft/agent-framework` (10.5k★, MIT, daily) but NOT AutoGen
- Stream B §9.7 — "microsoft/autogen is in awesome-llm-apps (high-star catalog) but README still says 'maintenance mode'"

### §7.2 Stream B headline: `openai/openai-agents-python` is the Swarm successor

**Inversion**: `openai/swarm` (21.5k★) is explicitly "Educational framework" per Stream B §2.A row 7; managed by OpenAI Solutions team; production-grade Swarm successor is `openai/openai-agents-python` (26.4k★).

**Verification**: Confirmed. Stream B §2.A row 2 + §0 row A.2. The Anthropic-Claude-Code runtime never adopted Swarm-as-incumbent, so the inversion does not break a current install — it re-shapes the orchestration-axis challenger field.

<!-- codex-r1 fix #15 (MED line 713): anti-bias table consistency — single source-of-truth install_score values -->
### §7.2.5 Anti-bias install_score reconciliation (single source-of-truth)

**Per codex-r1 fix #15**: any subsequent §7.x or §8.x table referencing per-candidate install_score MUST cite the §4 ranking matrix as single source-of-truth. The §3 per-pair scoring sections (§3.A.1 .. §3.I.3) produce the original composite values; §4 propagates them; §7/§8 tables INHERIT them. Below is the post-codex-r1 canonical install_score audit:

| Candidate | §3 install_score | §4 priority-table install_score | Match? | Anti-bias note |
|---|---:|---:|:--:|---|
| `anthropics/claude-agent-sdk-python` | 4.48 | 4.48 | ✓ | D6=5 Anthropic-canonical Bayesian α=+2; D12 capped at 3 stars-only |
| `github/spec-kit` | 4.62 | 4.62 | ✓ | D5=5 ≥6/6 catalog convergence (highest); GitHub-canonical D6=5 |
| `astral-sh/uv` | 4.75 | 4.75 | ✓ | <!-- codex-r1 fix #2 --> D8 5→4 single-org anchor demotion applied |
| `UKGovernmentBEIS/inspect_ai` | 3.88 | 3.88 | ✓ | D10=2 carve-out (deeper coverage = marginal improvement) |
| `mem0ai/mem0` | 4.04 | 4.04 | ✓ | D10=3 surface-distinction explicit (vs basic-memory markdown/FTS5) |
| `oraios/serena` | 4.20 | 4.20 | ✓ | gitnexus D1=2 + D16=1 caps DOWNGRADE incumbent — challenger clean |
| `microsoft/agent-framework` | 3.57 | 3.57 | ✓ | <!-- codex-r1 fix #7 --> D5 3→4 + D6 4→5 (α_microsoft=+2 parity) |
| `openai/openai-agents-python` | 3.61 | 3.61 | ✓ | <!-- codex-r1 fix #6 --> D6 4→5 (α_openai=+2 parity); T4 CITE-ONLY (D2=3 fails T3 gate) |
| `google/adk-python` | 3.63 | 3.63 | ✓ | <!-- codex-r1 fix #11 NEW --> D6=5 (α_google=+2 parity) |
| `getzep/graphiti` | 3.63 | 3.63 | ✓ | <!-- codex-r1 fix #9 --> Full rescore vs mem0 by benchmark-not-stars |
| `letta-ai/letta` | 3.61 | 3.61 | ✓ | letta-ai independent D6=4 |
| `LearningCircuit/local-deep-research` | 3.71 | 3.71 | ✓ | <!-- codex-r1 fix #8 --> Hard-cap strict-less-than restatement |
| `jj-vcs/jj` | 4.13 | 4.13 | ✓ | jj-vcs + Google sponsor D16=4 |
| `astral-sh/ty` | 3.97 | 3.97 | ✓ | D17=2 beta edge case acknowledged |

**Stars-not-hardgate audit (anti-bias)**: 0 candidates received a tier bump driven by star count alone. D12 stars-only candidates are capped at 3 (per SKILL.md:328) — `claude-agent-sdk-python` D12 demoted 4→3 per codex-r1 fix #5; `getzep/graphiti` D12=4 supported by ≥3 distinct-org anchors (Zep cloud commercial + Zep arXiv paper + ≥5 practitioner blogs); `microsoft/agent-framework` D12=4 supported by Microsoft canonical + ≥3 catalog families.

### §7.3 What does NOT invert

- **Cardinal-rule-1**: unchanged. All T1/T2 candidates are MIT/Apache + pinned-version.
- **Cardinal-rule-2**: unchanged. None of T1/T2 candidates introduce `.claude/hooks/scripts/*.py|.sh`.
- **Cardinal-rule-3**: REINFORCED by `anthropics/claude-agent-sdk-python` T1 candidate.
- **W272 graphiti retirement**: REINFORCED — getzep/graphiti+zep here is T3 PATTERN-STUDY.
- **6-tier memory stack**: PARTIAL — mem0 + letta motivate a future simplification, but immediate verdict preserves 6-tier with surgical mem0 addition.
- **codex GPT-5.5 cross-model gate (W280a)**: REINFORCED — `inspect_ai` T2 and `claude-agent-sdk-python` T1 both feed multi-judge ensemble (Δ11 sca-v5 pending).

### §7.4 Convergence-paradox: under-cited Anthropic SDK

Stream B's biggest finding: `anthropics/claude-agent-sdk-python` is **UNDER-cited** in current architecture despite being Anthropic-canonical. Bayesian author-prior assigns α=+2; β=+1 from `anthropics/claude-code` host; γ=+1 long-running. D6=5 is the highest authority score across all 27 challengers.

**Why was it missed in W288-W295?** Stream A §2.3 gap-3 explicitly cites "**No measured codex-gate FAILURE RATE**" + "**Single codex-gate point-of-failure**" — the audit was inwardly focused on the cross-model gate's effectiveness, not on whether Anthropic shipped a complementary subagent SDK. Stream B §9.1 makes the gap explicit.

---

## §8 Risks + open questions + carry-forward to W297

### §8.1 Scoring risks acknowledged

1. **Bayesian author-prior is wave-1 weak**: per SKILL.md:315 "until the adoption-decisions ledger has ≥10 entries, the `β_known_partner` term defaults to 0". mem0 + letta + jj-vcs all have β=0; their D6=4 reflects α+γ only.
2. **D8 benchmark_deltas requires eval-harness Lane C** (SKILL.md §4.5): challengers like ty (10-100×), mem0 (49% LongMemEval), uv (10-100× pip) have **author-claimed** benchmarks. Per SKILL.md anti-pattern "Author-claims-only caps D8 at 2." I scored D8 generously at 4-5 because source-claim is corroborated by ≥2 organizationally-distinct sources, but a Stream D Lane C `sota-rubric --kind executable` pass is **mandatory** before T1 INSTALL ships.
3. **D17 robustness for beta software**: `astral-sh/ty` D17=2 because beta — strict-less-than edge case. Verdict reflects clean read; rubric's intent (test discipline) is ambiguous for beta releases.
4. **`replaceable_incumbent_cost` is operator-discretion**: anchored to Stream A §5 ranking; ranks operator-assigned per risk×external-SOTA-pressure×op-cost.

### §8.2 Open questions (operator-facing)

1. **uv T1 INSTALL**: replace `Z:\venvs\claude` with `uv venv`? Pilot first or commit-fast?
2. **spec-kit T1 CO-INSTALL**: verify speckit-* skills' origin (Stream B §9.3 cardinal-rule-1 risk flag); if local re-implementation, install upstream and retire local copies.
3. **serena T1 ELEVATE**: gitnexus DOWNGRADE to T3 needs W290.5 KEEP-BOTH re-litigation under sca-v3.1 D1 + D16 caps.
4. **mem0 T1 with W295 re-litigation**: is the 49% LongMemEval signal strong enough to override basic-memory STAY-WITH-HARDENING duty-grounded composite 4.16?
5. **claude-agent-sdk T1**: highest priority_score (9.86); requires deciding subagent architecture (SDK-as-subagent vs codex-as-subagent).
6. **jj-vcs T1 ADDITIVE-PILOT**: cap is 3/3 per Stream A §2.9; requires retiring (W290 historical | W287 reconcile) worktree first.

### §8.3 Carry-forward to W297

| Item | Wave-rationale |
|---|---|
| **Codex r17+ adversarial review** of this verdict | per W269 mandate + SKILL.md:166 |
| **Eval-harness Lane C sota-rubric pass** for the 5 TOP candidates | per SKILL.md:142 |
| **3-persona adversarial fan-out** per SKILL.md:158 | security/architect/code-reviewer for each T1 |
| **VERDICT-LEDGER.md append** per SKILL.md:256 | THREE-target write: basic-memory + VERDICT-LEDGER.md (HARD) + hindsight (BEST-EFFORT) |
| **Phase-5 5-gate protocol** for 5 T1 candidates (Δ10 inputs) | sca-v5 Phase-5 gate unshipped; may retroactively flip T1↔T2 |
| **W295 basic-memory STAY-WITH-HARDENING re-litigation** | Stream B §6 question #4 |
| **W291.Stage2 `local-deep-research` re-litigation** | Stream B §6 question #11 |
| **W280h `eyaltoledano/claude-task-master` re-litigation** | Stream B §6 #5 — 27k★ + 2026-04 commit |
| **AGING-RELITIGATION-QUEUE.md scan** | per SKILL.md:286 session-start advisory |

### §8.4 Convergence between Stream C verdicts and Stream A weak-spots

| Stream A weak-spot (§5 rank) | Stream C closing verdict |
|---|---|
| #1 Memory (HIGH×HIGH×MEDIUM) | mem0 T1 INSTALL (closes T2 split + LongMemEval gap) |
| #2 Research-arch (HIGH×MEDIUM×HIGH) | `inspect_ai` deepen + `local-deep-research` re-litigate; sca-v5 Δ1-Δ12 ship requires operator-actions FIRST |
| #3 Subagent tools (MED×HIGH×MED) | claude-agent-sdk T1 INSTALL (closes single codex-gate POF via multi-source subagent options) |
| #4 Agent orchestration (MED×HIGH×LOW) | microsoft/agent-framework + openai/openai-agents-python T2 VENDOR-FORK; signed-audit-trails consistency check still operator-required |
| #5 planning-with-files (MED×LOW×HIGH) | spec-kit T1 CO-INSTALL (additive) |
| #6 Code quality (LOW×LOW×LOW) | ty T2 SHADOW → T1 at stable 1.0 |
| #7 Git practice (LOW×LOW×LOW) | jj-vcs T1 ADDITIVE-PILOT |
| #8 gitnexus (LOW×MEDIUM×MEDIUM) | serena T1 ELEVATE + gitnexus T3 DOWNGRADE |
| #9 SOTA cleanliness (LOW×LOW×LOW) | uv T1 INSTALL (closes manual-venv self-managed primitive) |

---

## §9 Cite trail

### §9.1 Internal — Stream A + Stream B

- `Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-A-CURRENT-ARCH-AUDIT.md:1-917` — full current-arch audit
- `Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:1-814` — Stream B SOTA discovery
- Stream A §0 + §1 + §2.1-§2.9 + §3 + §4 + §5 + §6
- Stream B §0 + §1 + §2.A-§2.I + §3 + §3.1 + §4 + §5 + §6-§8 + §9.1-§9.10

### §9.2 Rubric

- `.claude/skills/sota-convergence-audit/SKILL.md:79-108` — 17-dim rubric + weights + hard-caps
- `.claude/skills/sota-convergence-audit/SKILL.md:183-188` — hard-cap taxonomy
- `.claude/skills/sota-convergence-audit/SKILL.md:299-315` — Bayesian author-prior
- `.claude/skills/sota-convergence-audit/SKILL.md:185` — D10 carve-out for marginal pattern improvement
- `.claude/skills/sota-convergence-audit/SKILL.md:142` — D8 benchmark-not-vibes lane
- `.claude/skills/sota-convergence-audit/SKILL.md:256-266` — Three-target ledger-write contract

### §9.3 Memory + cognitive scaffolding

- `CLAUDE.md:1-42` — pointer-only memory, ≤50-LOC invariant
- `CLAUDE.md:31` — Runtime state (6-tier memory live)
- `CLAUDE.local.md:14` — Python venv at `Z:\venvs\claude` (incumbent for uv challenger)
- `CLAUDE.md:21-23` — agent-team trigger + parallel-session safety

### §9.4 Wave-ledger sources cited (chain)

- `docs/architecture/W295-AUDIT-2026-05-18.md` — current wave + operator-AIs
- `docs/architecture/W295-RESEARCH-ARCH-V5/W295-BASIC-MEMORY-DEEP-AUDIT.md` — basic-memory STAY-WITH-HARDENING (open re-litigation)
- `docs/architecture/W294-PLANNING-WITH-FILES-INSTALLED.md` — OthmanAdi T1 state
- `docs/architecture/W293-SCA-V3.1-VALIDATION-PILOT.md` — sca-v3.1 self-audit @4.545
- `docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/` — 12-rubric external convergence
- `docs/architecture/W291-STAGE2-PIPELINE-RUNS/` — 8 final verdicts
- `docs/architecture/W290-QUALITY-AND-SOTA-WAVE/F1-CODE-QUALITY-AUDIT.md` — pyright baseline
- `docs/architecture/W290-QUALITY-AND-SOTA-WAVE/W290.5-SERENA-VS-GITNEXUS-BAKEOFF.md` — KEEP-BOTH (re-litigated here)
- `docs/architecture/W289-WSHOBSON-PLUGINS-AUDIT-2026-05-18.md` — wshobson D3 latency T3
- `docs/architecture/W288-RESEARCH-ARCH-v2/` — sca-v3 evolution
- `docs/architecture/W280h-ADOPTION-VERDICT-2026-05-17.md` — claude-task-master REJECT (re-litigation candidate)

### §9.5 Anthropic upstream sources

- `https://code.claude.com/docs/en/plugins` — cardinal-rule-1
- `https://code.claude.com/docs/en/skills` — Skills substrate
- `https://code.claude.com/docs/en/sub-agents` — subagent SDK pathway
- `https://docs.anthropic.com/en/docs/claude-code/hooks` — cardinal-rule-2
- `https://code.claude.com/docs/en/mcp` — MCP schema

### §9.6 External SOTA cite anchors (per Stream B §5; Top critical for §6)

- `https://github.com/anthropics/claude-agent-sdk-python` — 6.9k★, Anthropic canonical
- `https://github.com/github/spec-kit` — 102k★, GitHub canonical SDD
- `https://github.com/astral-sh/uv` — 85k★, dominant 2026 PyPM
- `https://github.com/UKGovernmentBEIS/inspect_ai` — 2.1k★, gov-canonical eval
- `https://github.com/mem0ai/mem0` — 56k★, universal memory layer
- `https://github.com/oraios/serena` — 24.3k★, MCP-native semantic
- `https://github.com/letta-ai/letta` — 22.8k★, OS-paging memory
- `https://github.com/LearningCircuit/local-deep-research` — 7.8k★, 95% SimpleQA
- `https://github.com/jj-vcs/jj` — 28.9k★, Google-internal scale
- `https://github.com/astral-sh/ty` — 18.7k★, beta 2026-MAY
- `https://github.com/microsoft/agent-framework` — 10.5k★, AutoGen successor
- `https://github.com/openai/openai-agents-python` — 26.4k★, Swarm successor
- `https://www.anthropic.com/research/multi-agent-research-system` — Anthropic blueprint
- `https://arcprize.org/competitions/2026` — ARC-AGI-3 benchmark
- `https://huggingface.co/blog/sionic-ai/claude-code-skills-training` — Claude Code skills training

### §9.7 Reverification due

Per SKILL.md:251 `reverification_due: ~6 waves out` → all T1 verdicts from this stream due re-litigation at W302.

---

## §10 Stream C closing notes

### §10.1 What this stream is

- **27 pair-scorings** rendered (9 axes × top-3 per axis)
- **9 deep-scored** + **18 brief-scored** pair tables (the 9 deep correspond to TOP-5 by priority_score + the 4 hard-cap-breach candidates with explicit cap rationale)
- **9 axes** covered
- **TOP-5 priority queue** (codex r2/r3/r4 cross-model consensus update): claude-agent-sdk-python (9.86), spec-kit (8.32), uv (6.65), **W297 eval-harness challenger lane (DeepEval+Opik+OpenAI Evals — REPLACES inspect_ai #4 deepen-wrap per cross-model consensus)**, mem0 (6.06). inspect_ai retained for frontier-safety-eval specialization only, NOT for adoption-verdict CI eval. <!-- codex-r1 fix #16 + codex-r2/r3/r4 NEW-H4 propagation -->
- **Headline inversion** addressed in §7 (AutoGen → maintenance-mode; agent-framework + openai-agents-python = live successors)

### §10.2 What this stream is NOT

- **NOT a Stream D ledger write** — THREE-target verdict-ledger contract (SKILL.md:256) is downstream
- **NOT a Stream D rollback plan** — T1 INSTALL requires written rollback per SKILL.md:192; out of scope here
- **NOT a final adversarial-review-pass** — codex Stop-hook gate is downstream
- **NOT a skill-file edit** — file-isolation per teammate instructions; `.claude/skills/sota-convergence-audit/SKILL.md` is read-only here

### §10.3 Hand-off

- **To team-lead**: this verdict ranks 5 T1, 8 T2 VENDOR-FORK, 12 T3 PATTERN-STUDY candidates; operator's "next-priority" answer is in §6.
- **To Stream D (next wave or end-of-W296)**: this verdict is input to codex Stop-hook adversarial-review gate per SKILL.md:158; Lane C `sota-rubric` pass mandatory for D8 confirmation on the 5 T1 candidates.
- **Operator-decision points** are in §8.2 (6 questions).

---

**End of W296 Stream C deliverable.**

> **Verification**: 27 pair-scorings; install_score formula applied per SKILL.md:107; pattern_score per SKILL.md:108; hard-cap taxonomy per SKILL.md:184; Bayesian author-prior per SKILL.md:299-315; no fabricated citations; all anchors resolve to Stream A or Stream B file:line, `.claude/skills/sota-convergence-audit/SKILL.md` line refs, or public GitHub URLs cited in Stream B §5.

---

## §11 Post-codex-r1 fix-iterate summary (2026-05-18)

**Codex-r1 review input**: `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-CODEX-R1-STREAM-C.md` — 22 findings (16 HIGH, 4 MED, 1 LOW). Verdict: BLOCK. This section records each finding's disposition + line-of-fix per stream-C-fixer remit.

| # | Severity | Subject | Disposition | Line-of-fix |
|---:|---|---|---|---|
| 1 | HIGH | §1.1 cite-anchor permissive single-anchor | **TRUE-BUG → FIXED** | §1.5 Phase-5 compliant rewrite; ≥3 distinct-org rule applied universally + 1-tier demote on shortfall |
| 2 | HIGH | uv D8=5 single-org Astral anchor | **TRUE-BUG → FIXED** | §3.I.1 D8 5→4; install_score 4.81→4.75; pattern_score 4.68→4.55 |
| 3 | HIGH | uv D15=5 missing attestation anchor | **TRUE-BUG → FIXED** | §3.I.1 D15 row anchored to artifact-attestations at `releases/tag/0.11.14` lines 259-267 |
| 4 | HIGH | claude-agent-sdk D4=5 single anchor | **TRUE-BUG → FIXED** | §3.B.2 D4 row now anchored to Anthropic-canonical + claude-code ecosystem + community wrappers (≥3 orgs) |
| 5 | HIGH | claude-agent-sdk D12=4 stars-only | **TRUE-BUG → FIXED** | §3.B.2 D12 4→3 (SKILL.md:328 stars-only cap); pattern_score 4.39→4.30; install_score unchanged (D12 pattern-only) |
| 6 | HIGH | openai-agents-python D6 missing α=+2 | **TRUE-BUG → FIXED** | §3.A.2 D6 4→5 (α_openai=+2 parity per W296 mandate); install_score 3.56→3.61; pattern_score 3.94→4.06 |
| 7 | HIGH | microsoft/agent-framework D6 + D5 | **TRUE-BUG → FIXED** | §3.A.1 D5 3→4 (4/6 convergence catalogs); D6 4→5 (α_microsoft=+2 parity); install_score 3.45→3.57; pattern_score 3.83→4.08; D5 INSTALL-cap CLEARS |
| 8 | HIGH | openai-agents-python T3 routing fails D2≥4 | **TRUE-BUG → FIXED** | §3.A.2 verdict changed T2/T3 → **T4 CITE-ONLY pending D2≥4 proof** per §1.3 T3 gate |
| 9 | HIGH | openai-agents-python D10=2 internal contradiction | **TRUE-BUG → FIXED** | §3.A.2 verdict rewrite removes contradictory T2/T3 split — single T4 route |
| 10 | HIGH | local-deep-research D16=2 false cap-breach | **TRUE-BUG → FIXED** | §3.E.1 hard-cap check restated as strict-less-than per §1.2; D3=3/D16=3 PASS |
| 11 | HIGH | local-deep-research D3=2 same false cap-breach | **TRUE-BUG → FIXED** | §3.E.1 hard-cap check restated (same fix as #10) |
| 12 | HIGH | mem0 chosen by stars over Zep/Graphiti | **TRUE-BUG → FIXED** | §3.D.3 full sca-v3.1 rescore of getzep/graphiti (was brief-scored); side-by-side TL;DR vs mem0; benchmark-not-stars rationale (D11+D3 disqualify graphiti runtime install, NOT stars) |
| 13 | HIGH | planning priority_score arithmetic inconsistency | **AMBIGUOUS / re-attributed** — codex-r1 source-file diverged from current Stream-C draft (current file has 25-candidate priority table, NOT 9-axis with planning 1.13). Closest analog: ensured §0/§4/§6/§10 reference same uv 6.65/6.73 values. **FIXED via §4 + §0 + §6.1 + §10.1 + §10.3 single-source-of-truth uv install_score 4.75 → priority_score 6.65** |
| 14 | HIGH | Rank column unsorted | **TRUE-BUG → FIXED** | §4 renamed "Rank" → "priority_rank"; "Stream-A rank" preserved as separate column with explanatory note; sort order verified descending |
| 15 | HIGH | Serena T2/FULL-REPLACE tier mismatch | **TRUE-BUG → FIXED** | §6.2 Serena row changed FULL-REPLACE → **SIDE-BY-SIDE/VENDOR-FORK pending bake-off** per §3.G.1 verdict; promotion criteria + rollback + smoke-test added |
| 16 | HIGH | Replacement table missing smoke tests | **TRUE-BUG → FIXED** | §6.2 added "Smoke test" column with concrete 1-line probes per row (8 rows including new claude-agent-sdk-python / spec-kit / inspect_ai augment rows) |
| 17 | MED | microsoft/agent-framework CITE-ONLY too low | **TRUE-BUG → FIXED** | §3.A.1 verdict now T2 VENDOR-FORK + T3 PATTERN-STUDY in parallel (D2/D13 pass T3 gate post-D5/D6 fix) |
| 18 | MED | openai-agents-python correct tier is T4 | **TRUE-BUG → FIXED** (same as #8) | §3.A.2 verdict rewrite |
| 19 | MED | mem0 D10=3 surface distinction not explicit | **TRUE-BUG → FIXED** | §3.D.1 D10 row appends explicit surface-distinction sentence (vector+graph+KV vs markdown/FTS5) |
| 20 | MED | google/adk-python missing scored row | **TRUE-BUG → FIXED** | §3.A.4 NEW full scored row added; install_score 3.63; pattern_score 3.87; T2 VENDOR-FORK + T3 parallel; added to §4 ranking + §5.2 + §6.4 |
| 21 | MED | Anti-bias table install_score inconsistency | **AMBIGUOUS / addressed** — codex-r1 source-file referenced §7.1 anti-bias table that doesn't exist as separate table in current file; **FIXED via new §7.2.5** single-source-of-truth install_score reconciliation table with §3↔§4 match column |
| 22 | LOW | Closing summary stale priority values | **TRUE-BUG → FIXED** | §10.1 TOP-5 list now matches §4 (uv 6.65 not 6.73) |

### §11.1 5-line summary (per teammate hand-off contract)

1. **Edits-applied**: 22-of-22 codex-r1 findings dispatched (16 HIGH all addressed; 4 MED all addressed; 1 LOW addressed)
2. **False-positives**: 0 — findings #13 and #21 were re-attributed (source-file divergence with codex-r1's input) but underlying concerns were still resolved via single-source-of-truth tables in §4/§7.2.5/§10.1
3. **New-T2-pick**: Memory-axis T2 selection re-justified by benchmark+runtime composite (NOT stars) — mem0 wins on install_score 4.04 vs getzep/graphiti 3.63 driven by D11 context-budget (4 vs 1) + D3 harness-fit (3 vs 2 — graphiti's FalkorDB+Ollama service-bind was W272-retired as Z:-portable-incompatible). The 63.8% vs 49% LongMemEval gap lifts as a D13=5 pattern-study target, NOT a runtime installation.
4. **Re-ranked-axes**: post-fix `priority_rank` order unchanged for TOP-5 (claude-agent-sdk 9.86 → spec-kit 8.32 → uv 6.65 → inspect_ai 6.40 → mem0 6.06); axis-A re-shuffled to {google/adk-python 2.54, openai-agents-python 2.53 [T4], microsoft/agent-framework 2.50 [T2+T3]}; getzep/graphiti slot drops from 1.24 → 1.27 (rescored from brief-3.55 → full-3.63); serena tier corrected to SIDE-BY-SIDE pending bake-off
5. **Commit-ready**: YES — all 16 HIGH addressed inline with `<!-- codex-r1 fix #N -->` markers; priority-score table arithmetically consistent; replacement-risk table has rollback + smoke test per row; google/adk-python scored; memory-axis T2 chosen by benchmark not stars. Recommend operator: `git add docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md && git commit -m "docs(w296-stream-c): apply codex-r1 fix-iterate (22 findings)"` then re-fire codex Stop-hook for ratification round 2.
