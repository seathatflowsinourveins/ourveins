# Research Architecture V2 — Design (W340 Stream I)

**Wave**: W340-FULL-SOTA-UNLEASH · **Stream**: I (research-arch v2) · **Date**: 2026-05-20
**Author-fork**: claude-sota-installed parent fork · **Status**: DRAFT-FOR-SYNTHESIS
**Authority anchors**: CLAUDE.md cardinal-rule-1 (trusted sources), cardinal-rule-6 (verify-before-claim), W331 P0.7 (codex→Opus→Sonnet tie-break), W332 (3-org-distinct), sca-v13 (citations-agent floor).

---

## 1. Why this matters (compounding leverage)

The research architecture is the **upstream gate** of every install/pattern-study/skip decision. A 1% improvement in research quality compounds across every wave because every future SOTA verdict depends on it. Per the operator's directive: "they are the very foundation and determine your evolving quality and your architecture quality itself by defining the very definition of 'SOTA'." → Treat research-arch as **TIER-0 P0** — higher leverage than any individual repo install.

---

## 2. Layered architecture

```
Layer 5  — Verdict Ledger          (W332-3-org-distinct + sca-v13 citation cluster)
Layer 4  — Adversarial Review      (codex GPT-5.5 r1 → r2 → Sonnet-4.6 tie-break per W331)
Layer 3  — Convergence Engine      (multi-dim ranking + drift detection + completeness)
Layer 2  — Evidence Ingestion      (deepwiki + repomix + perplexity + exa + tavily + HF papers + WebSearch)
Layer 1  — Tool Router             (decision-tree picks the right tool per query class)
Layer 0  — Skill primitives        (sota-convergence-audit, mem-recall, goal-prompt-synthesis, citations-agent, parallel-dispatch-mandate)
```

Each layer **strictly** consumes only the layer below — no skip-up. This prevents shortcuts where a half-baked perplexity answer gets promoted to ledger-grade verdict.

---

## 3. Tool routing decision-tree (Layer 1)

```
QUERY CLASS                                    PRIMARY TOOL                                  FALLBACK / CROSS-CHECK
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Q1  Quick factual lookup (<5s expected)        WebSearch                                     mcp__perplexity__perplexity_ask
Q2  Deep multi-source research (30s+)          mcp__perplexity__perplexity_research          mcp__tavily__tavily_research
Q3  Reasoning chain / decomposition            mcp__perplexity__perplexity_reason            (no fallback; if low-confidence → escalate to Layer 4)
Q4  "Has anything new happened recently?"      mcp__tavily__tavily_search recency=week       mcp__perplexity__perplexity_search recency_filter=week
Q5  Semantic web (intent-not-keyword)          mcp__exa__web_search_exa                      WebSearch + perplexity_ask
Q6  GitHub repo structure understanding        mcp__deepwiki__read_wiki_structure +
                                                mcp__deepwiki__read_wiki_contents             mcp__github__get_file_contents (specific files)
Q7  GitHub repo specific Q&A                   mcp__deepwiki__ask_question (3× distinct Qs)  mcp__repomix__pack_remote_repository (deep)
Q8  GitHub repo line-by-line ingestion         mcp__repomix__pack_remote_repository +
                                                mcp__repomix__grep_repomix_output             (slow; reserve for TIER-1 candidates)
Q9  Academic paper search                      mcp__hf-mcp-server__paper_search              WebSearch with arxiv.org domain
Q10 HF Hub model/dataset/space                 mcp__hf-mcp-server__hub_repo_search           mcp__hf-mcp-server__hub_repo_details
Q11 GitHub topic/awesome-list discovery        mcp__github__search_repositories +
                                                mcp__github__search_code                      WebFetch awesome-list README
Q12 Prior-wave memory recall                   mcp__basic-memory__search_notes (T6 primary)  mcp__cognee__recall (T3 secondary)
Q13 Live operational state (NSSM/MCP/CLI)      Bash with PowerShell probe                    (no fallback; cite the probe output)
Q14 Adversarial cross-model review             codex CLI via codex:codex-rescue subagent    Sonnet-4.6 via separate Agent call
Q15 Architectural pattern (multi-agent etc.)   mcp__deepwiki__ask_question on cookbook       perplexity_research + WebSearch
```

**Rule R-1**: Never use a single tool for a TIER-1-install verdict. Minimum 2 tools. **3-org-distinct floor enforced**.
**Rule R-2**: WebFetch is reserved for non-GitHub URLs and authenticated-doc lookups. Prefer MCP tools for GitHub.
**Rule R-3**: Bash for terminal probes only. Read for files we intend to Edit. NEVER `cat`/`head`/`tail` via Bash.

---

## 4. Multi-dimensional repo ranking (Layer 3)

### 4.1 Existing 10 dimensions (retained from W259-grand-catalog)

D1 stars · D2 recency · D3 claude-code-native primitives · D4 documentation depth · D5 community traction · D6 license · D7 pattern-quality (intrinsic) · D8 maintenance signal · D9 supply-chain hygiene · D10 composability into existing runtime

### 4.2 NEW dimensions for SOTA-2026 (propose 5 additions)

D11 **observability-hooks readiness** (0-10) — does the repo emit OTEL spans, langfuse tags, structured logs natively, or require harness wrapping?
D12 **MCP-readiness** (0-10) — ships an MCP server OR consumes MCP tools idiomatically; tools follow the FastMCP/MCP-SDK conventions
D13 **agent-orchestration-primitives** (0-10) — ships subagents, agent-teams, parallel-dispatch primitives, FQN-discipline
D14 **multi-modal support** (0-10) — text + image + audio + tool-result rendering (relevant for skills that build UIs / browser-automation)
D15 **security-audit-status** (0-10) — has SLSA-L3 / npm-provenance / Sigstore / OSSF Scorecard score >= 7 / SBOM
D16 **research-arch-fit** (0-10) — does it cite primary upstream docs, ship multi-angle convergence patterns, prefer probes over claims?
D17 **operator-cognitive-load** (0-10, INVERTED — lower is better, recorded as 10 - cost) — how much human-attention does this repo demand per use?

**Final composite weight scheme** (W340 proposal, tuneable):

```
w_install_tier =   1.0·D7  + 0.9·D10 + 0.85·D13 + 0.8·D3 + 0.75·D12 + 0.7·D11
                 + 0.6·D8  + 0.6·D2  + 0.5·D6   + 0.5·D9 + 0.4·D4   + 0.3·D5
                 + 0.3·D17 + 0.25·D16 + 0.2·D14 + 0.15·D15 + 0.1·D1
                 (D1 stars de-weighted per operator directive: "low stars can be high quality")
```

### 4.3 Tier thresholds (composite 0-10 normalized)

- **TIER-0 install + harden**: ≥ 8.5 AND D7 ≥ 8 AND D9 ≥ 6 (security floor)
- **TIER-1 install**: ≥ 7.5 AND D10 ≥ 7
- **TIER-2 pattern-study only**: ≥ 6.0 AND D7 ≥ 7 (pattern excellence overrides composability gap)
- **TIER-3 watch**: ≥ 4.5 (revisit next wave)
- **TIER-4 skip/retire**: < 4.5 OR any of: D6 = 0 (license incompat), D8 ≤ 2 (abandoned), D9 = 0 (malicious-update flag)

---

## 5. Adversarial review loop (Layer 4)

```
       ┌─────────────────────────────────────────────────────────────────────────────┐
       │                                                                             │
       │   Synthesis draft                                                           │
       │        │                                                                    │
       │        ▼                                                                    │
       │   codex GPT-5.5 r1 ───── verdict ──── APPROVE──────────────┐                │
       │        │                                                   │                │
       │        │ NEEDS-WORK / REJECT                                │                │
       │        ▼                                                   ▼                │
       │   Address findings → codex GPT-5.5 r2 ─── APPROVE ──── (ship-ready)        │
       │        │                                                                    │
       │        │ STILL-DIVERGE                                                     │
       │        ▼                                                                    │
       │   Sonnet-4.6 tie-break Agent call (separate context)                       │
       │        │                                                                    │
       │        ▼                                                                    │
       │   Final verdict (2/3 majority) → record in ledger                          │
       │                                                                             │
       └─────────────────────────────────────────────────────────────────────────────┘
```

**When to invoke**:
- Always for **TIER-0/TIER-1 install** (cross-model consensus mandatory per cardinal-rule-1)
- Always for **architectural changes** (settings.json, .mcp.json, .pre-commit-config.yaml)
- Always for **wave-ship synthesis** (final ARCHITECTURE-V2.md gate)

**When to skip**:
- TIER-2 pattern-study (cost > value)
- TIER-3 watch (no decision yet)
- Routine doc edits (sca-v11 §6 layered-defense holds)

**Cost budget**: Codex r1+r2 ≈ 8-20 min wall-clock. Sonnet tie-break adds 2-5 min. Budget per wave: max 3 full adversarial cycles. Above that → escalate to operator.

**Fail-CLOSED contract** (per dual-review skill): If codex CLI unavailable (auth/rate-limit/network/quota) → verdict = `BLOCK — codex unavailable`. Never silently pass.

---

## 6. Verdict-ledger output schema (Layer 5)

Every research finding written to `docs/architecture/<wave>/VERDICT-LEDGER.md` MUST conform to:

```yaml
---
claim_id: W340-VL-NNN              # auto-numbered per wave
claim_scope: "install: repo X to TIER-1"
freshness: 2026-05-20              # ISO date
confidence: 8.5                    # 0-10
verdict: APPROVE | NEEDS-WORK | REJECT | BLOCK
adversarial_review:
  codex_r1: APPROVE                # 2026-05-20T14:32:00Z
  codex_r2: not-invoked
  sonnet_tie_break: not-invoked
citation_cluster:                  # MIN 3 org-distinct sources per claim
  - org: anthropic
    source: https://docs.anthropic.com/en/docs/claude-code/sub-agents
    line_anchor: "model-precedence"
  - org: github-deepwiki
    source: deepwiki://wshobson/agents
    line_anchor: ask_question:"FQN convention"
  - org: perplexity
    source: perplexity_research result_id ABC123
    line_anchor: "convergence finding 3"
counter_evidence:
  - "X repo has higher stars but D9=0 (no SLSA)"
  - "Y plugin is sibling-installed; partial overlap with adopt"
decision_recommendation: "INSTALL via /plugin install; pin to commit SHA <sha>"
followup_tasks:
  - "Update CLAUDE.md pointers"
  - "Regenerate subagent-allowlist"
---
```

**Sca-v13 enforcement**: minimum 3 **org-distinct** sources (not 3 URLs from same domain). Org examples: anthropic, github-org-X, perplexity, exa, tavily, hf, archive.org. citations-agent skill validates this at write-time.

---

## 7. Repo discovery completeness check (Layer 3)

Every wave's research phase ends with a **discovery-completeness probe**:

```
Step 1: Bookmark check — query all known awesome-lists, GitHub topics, HF tags
   - hesreallyhim/awesome-claude-code (canonical)
   - GitHub topic: claude-code, claude-skill, mcp-server, claude-plugin, anthropic
   - HF tag: agent, multi-agent, claude
Step 2: Emergence detection — mcp__perplexity__perplexity_search recency_filter=month
   query: "new Claude Code repos / skills / agent libraries published in last 30 days"
Step 3: Gap probe — final perplexity_research query:
   "What recent SOTA Claude Code repos NOT in this list <paste current install set>
    should we know about? Surface low-star high-quality candidates."
Step 4: 3-org-distinct floor on any candidate before promoting to TIER-1
Step 5: Drift detection — diff current_install_set vs ranked_top_20:
   - stale_installs = installed but ranked < TIER-2 this wave
   - missing_installs = ranked TIER-1 but not installed
```

---

## 8. Live evidence ingestion ritual (per TIER-1 candidate)

For every TIER-1 install candidate, execute this full ritual (no shortcuts):

```
1. mcp__deepwiki__read_wiki_structure        → get section catalog
2. mcp__deepwiki__read_wiki_contents (top section) → architectural overview
3. mcp__deepwiki__ask_question × 3:
     Q-purpose, Q-primitives-shipped, Q-composability-with-claude-code
4. mcp__repomix__pack_remote_repository      → full source tarball
5. mcp__repomix__grep_repomix_output         → extract patterns of interest
6. mcp__perplexity__perplexity_research      → cross-cite with community signals
7. WebFetch the README, LICENSE, .github/    → license + CI + provenance check
8. mcp__github__list_commits (last 90 days)  → maintenance signal
9. Score against the 17-dim rubric (Section 4)
10. Write verdict-ledger entry (Section 6 schema)
11. If TIER-0/1 → trigger Layer 4 adversarial review
```

**Anti-shortcut rule**: Skipping any step → composite score capped at 6.0 (TIER-2 max). This prevents popularity-bias by ensuring deep inspection is rewarded.

---

## 9. Decision drift detection (per wave)

After each wave's ranking output, generate a drift report:

```markdown
# Drift Report — W<N>

## Stale installs (installed but ranked < TIER-2)
- repo-X — last wave TIER-1, this wave TIER-3. Cause: abandoned upstream. Action: retire next wave.

## Missing installs (ranked TIER-1 but not installed)
- repo-Y — newly emerged, scores 8.7 composite. Action: queue install for next wave.

## Composite-score deltas (>1.0 change from last wave)
- repo-Z: 7.2 → 5.1 (Δ-2.1) — security-audit-status dropped (D15: 8 → 2)
```

This file: `docs/architecture/W<N>-<wave>/DRIFT-REPORT.md` — operator-reviewed pre-wave-close.

---

## 10. Anti-fabrication discipline (cardinal-rule-6 mechanization)

Every "we should adopt X" claim MUST cite at least one of:
- **Probe output**: bash command + stdout/stderr captured
- **Verifier hash**: SLSA / Sigstore / npm provenance attestation
- **Codex round verdict**: codex r1/r2 transcript
- **Operator sign**: explicit acceptance recorded

**Empty-evidence claims**: rejected at synthesis stage. Block ship.
**Single-source claims**: downgraded to "speculative" tier, not "verified".
**Popularity-only claims** (stars-only): rejected per operator directive.

---

## 11. Concrete improvements to existing skills

### 11.1 sota-convergence-audit (existing)
- ADD: 17-dim ranking rubric (Section 4) replaces ad-hoc scoring
- ADD: drift-report-generation step (Section 9)
- ADD: tier-threshold enforcement (Section 4.3)

### 11.2 mem-recall (existing)
- ADD: T6 basic-memory primary query (already present per CLAUDE.md, formalize)
- ADD: T3 cognee fallback query
- ADD: prior-wave-citation auto-attach (every recall returns 3-org-distinct chain)

### 11.3 goal-prompt-synthesis (existing)
- ADD: priority-axis catalog (SOTA-install / pattern-study / gap-resolve / hook-hardening / research-arch / insights / observability)
- ADD: 3-org-distinct citation cluster requirement in /goal predicate
- ADD: character-ceiling auto-truncation with priority preservation

### 11.4 parallel-dispatch-mandate (existing)
- ADD: 17-dim ranking output requirement when dispatching research streams (each stream returns scored candidates)
- TIGHTEN: hard-block exit 2 on 2nd violation per session (currently soft per W325-A F1 0.0036 ratio)

### 11.5 citations-agent (existing, sca-v13)
- ADD: org-distinct dedup (perplexity + exa = same org if both hit same source domain)
- ADD: ledger-schema auto-validation (Section 6 yaml)
- ADD: counter-evidence section non-empty enforcement (no one-sided verdicts)

### 11.6 NEW skill: research-architecture-v2 (this doc → skill)
- Bundle Sections 3, 4, 5, 6, 7, 8, 9, 10 into a single auto-fire skill
- Trigger phrases: "research SOTA", "evaluate repo", "convergence audit", "rank repos", "discovery completeness", "drift report"

---

## 12. Convergence ritual (one-pager protocol for new repo evaluation)

```
STEP 1   Query class via Tool Router (Section 3)
STEP 2   Multi-angle search: 3+ tools, 3+ org-distinct sources
STEP 3   Deepwiki structure + 3 ask_questions
STEP 4   Repomix pack + grep (if TIER-1 candidate)
STEP 5   17-dim ranking score
STEP 6   Tier classification (Section 4.3)
STEP 7   IF TIER-0/1 → adversarial review (Section 5)
STEP 8   Verdict-ledger entry (Section 6 schema)
STEP 9   Drift report append (Section 9)
STEP 10  IF approved → record install command + commit SHA + adversarial sign
```

---

## 13. Anti-pattern catalog (research mistakes to avoid)

| Anti-pattern | Symptom | Fix |
|---|---|---|
| Single-source claim | "Per perplexity, X is SOTA" | Require 3 org-distinct |
| Popularity bias | "Has 50k stars, must install" | De-weight D1, require D7+D10 ≥ 7 |
| Skip-deepwiki | TIER-1 install with no deepwiki probe | Anti-shortcut rule (Section 8) caps to TIER-2 |
| Codex-skip | Architectural change without adversarial review | Layer 4 mandatory for TIER-0/1 |
| Empty-evidence | "We should adopt X" with no probe | Reject at synthesis |
| Stale-cite | Cite SHA from 6 months ago without re-verify | freshness < 30d rule |
| Org-collapse | 3 sources all cite same primary doc | org-distinct dedup at citations-agent |
| Counter-evidence-suppress | Verdict has no counter-evidence section | Block ledger write |
| Tier-creep | Marginal repo promoted to TIER-1 | Threshold enforcement (Section 4.3) |
| Drift-blind | New wave doesn't compare to prior wave's installs | Drift report mandatory (Section 9) |
| Discovery-blindspot | Trust existing awesome-list only | Step 3 emergence-detection mandatory |
| Confirmation-bias | Only search queries that confirm prior verdict | Counter-evidence search required |

---

## 14. Implementation plan (which file gets touched)

| Action | File | Type |
|---|---|---|
| New skill bundle for research-arch-v2 | `.claude/skills/research-architecture-v2/SKILL.md` | CREATE |
| Update sota-convergence-audit | `.claude/skills/sota-convergence-audit/SKILL.md` | EDIT (add 17-dim) |
| Update mem-recall | `.claude/skills/mem-recall/SKILL.md` | EDIT (T6 primary, T3 fallback) |
| Update goal-prompt-synthesis | `.claude/skills/goal-prompt-synthesis/SKILL.md` | EDIT (priority-axis catalog) |
| Update parallel-dispatch-mandate | `.claude/skills/parallel-dispatch-mandate/SKILL.md` | EDIT (hard-block on 2nd viol) |
| Update citations-agent | `.claude/skills/citations-agent/SKILL.md` | EDIT (org-distinct dedup) |
| Verdict-ledger template | `docs/architecture/_templates/VERDICT-LEDGER-template.md` | CREATE |
| Drift-report template | `docs/architecture/_templates/DRIFT-REPORT-template.md` | CREATE |
| Pointer in CLAUDE.md | `CLAUDE.md` | EDIT (add Research-Arch-V2 pointer) |

All edits gated by codex r1 + r2 adversarial review per Layer 4.

---

## 15. Top-5 enhancements to ship in W341 (next wave)

1. **17-dim ranking rubric → sota-convergence-audit skill** (Section 4, 11.1) — biggest leverage; defines every future install verdict.
2. **Verdict-ledger YAML schema → citations-agent enforces** (Section 6, 11.5) — eliminates empty-evidence + single-source claims.
3. **Convergence ritual auto-skill** (Section 12, 11.6) — turns ad-hoc research into reproducible protocol.
4. **Drift-report per wave** (Section 9) — catches stale installs and missing installs we'd otherwise carry forward.
5. **Parallel-dispatch hard-block** (11.4) — closes the 99.6% silent-serial fallback (W325-A F1) that fuels research-quality decay.

---

## 16. Top-3 research-arch enhancements (highest-leverage summary)

1. **17-dim ranking + tier-thresholds** (replaces stars-only ranking; eliminates popularity bias)
2. **Verdict-ledger YAML schema with 3-org-distinct + counter-evidence enforcement** (eliminates fabrication)
3. **Convergence ritual one-pager + Layer 4 mandatory for TIER-0/1** (eliminates skip-shortcuts)

---

## 17. Open questions for operator sign

- Q1: D1 (stars) weight = 0.1 — too low? operator-tunable.
- Q2: Adversarial review for every TIER-1 install is expensive (~10-20 min × N candidates per wave). Cap at top-5 per wave or invoke for all?
- Q3: research-architecture-v2 as a NEW skill vs folded into sota-convergence-audit — preference?
- Q4: Sonnet-4.6 tie-break — invoke for every divergence or only ship-blocker divergences?

---

**END Stream I deliverable.**
