# SP1: Research-as-Runtime Architecture — Design Spec

> **Date**: 2026-05-25
> **Scope**: Sub-Project 1 of 5 (SP1 → SP2 → SP3 → SP4 → SP5)
> **Approach**: C — Research-as-Runtime (self-improving)
> **Status**: APPROVED (operator-approved 2026-05-25)
> **Depends on**: v23 research architecture (`docs/architecture/SOTA-RESEARCH-ARCH-V23/DESIGN.md`)
> **Blocks**: SP2 (SOTA Foundation Install Wave), SP3 (GitHub Workflow), SP4 (ALW), SP5 (Public Release)
> **Supersedes**: `2026-05-25-W442-research-arch-v23-operational-design.md` (narrower W442 bugfix scope)

## 1. Purpose

Operationalize the v23 multi-angle convergence research architecture from design into a running, self-improving system that:

1. Discovers SOTA repos across multiple channels
2. Scores them via a 7-angle × 12-dimension rubric
3. Produces verifiable install/reject verdicts with multi-angle convergence
4. Integrates into the ALW autonomous lifecycle for continuous operation
5. Improves its own accuracy via feedback loops

This is the decision-making engine for everything downstream. Bad research = bad installs = bad foundation.

## 2. Current State

### 2.1 What Exists (v23 Infrastructure)

| Component | Path | Status |
|-----------|------|--------|
| v23 design spec | `docs/architecture/SOTA-RESEARCH-ARCH-V23/DESIGN.md` | ✅ Complete |
| Scoring rubric schema | `.claude/schemas/sca-v23-multi-angle-convergence.schema.json` | ✅ Complete |
| Convergence engine | `tools/research-arch-v23/convergence-engine.mjs` | ✅ Built, W442 bugfixes |
| CLI entry point | `tools/research-arch-v23/cli.mjs` | ✅ Built |
| Scoring rubric module | `tools/research-arch-v23/scoring-rubric.mjs` | ✅ Built |
| A5 deepwiki angle | `tools/research-arch-v23/angles/` | ✅ Live |
| A6 repomix angle | `tools/research-arch-v23/angles/` | ✅ Live |
| A7 registry angle | `tools/research-arch-v23/angles/` | ✅ Live |
| ALW orchestrator scaffold | `tools/alw/orchestrator.mjs` | ✅ L1-L8 stubs |
| ALW CLI | `tools/alw/cli.mjs` | ✅ Built |

### 2.2 What's Missing

| Gap | Priority |
|-----|----------|
| A1 Perplexity angle (stub, rename fixed but untested) | P0 |
| A2 Exa angle (stub, API key commented out) | P0 |
| A3 Firecrawl angle (stub) | P0 |
| A4 gpt-researcher angle (rerouted from Tavily, untested) | P0 |
| v18→v23 re-scoring of 50+ existing candidates | P1 |
| Multi-channel discovery engine | P1 |
| ALW integration (research as lifecycle subsystem) | P2 |
| Self-improvement feedback loop | P2 |
| Verdict accuracy tracking | P3 |

### 2.3 Repos to Evaluate (User-Specified)

| Repo | Prior Status | Action |
|------|-------------|--------|
| `Significant-Gravitas/AutoGPT` | Not evaluated | NEW — full v23 scoring |
| `bytedance/deer-flow` | Not evaluated | NEW — full v23 scoring |
| `ComposioHQ/agent-orchestrator` | REJECTED (W433) | RE-EVALUATE via v23 |
| `All-Hands-AI/OpenHands` | CITE-REF (W433) | RE-EVALUATE via v23 |
| `vercel-labs/agent-skills` | Needs identity check | VERIFY vs `anthropic-agent-skills` |
| `shanraisshan/claude-code-best-practice` | ✅ Installed | CITE-REFRESH only |
| `wshobson/agents` | ✅ Installed | CITE-REFRESH only |
| `addyosmani/agent-skills` | ✅ Installed | CITE-REFRESH only |
| `assafelovic/gpt-researcher` | ✅ Installed as MCP | CITE-REFRESH only |
| `ComposioHQ/composio` | ✅ Installed | CITE-REFRESH only |

## 3. Architecture

### 3.1 v23 Angle Operationalization

All 7 research angles wired and operational as standalone modules:

| Angle | MCP Tool | Weight | Module |
|-------|----------|--------|--------|
| **A1** Web-grounded reasoning | `perplexity_search` / `perplexity_research` | 0.18 | `angles/a1-perplexity.mjs` |
| **A2** Neural semantic search | `web_search_exa` / `web_fetch_exa` | 0.15 | `angles/a2-exa.mjs` |
| **A3** Structured web crawl | `firecrawl_scrape` / `firecrawl_search` | 0.12 | `angles/a3-firecrawl.mjs` |
| **A4** Curated-citation search | `quick_search` (gpt-researcher) | 0.10 | `angles/a4-gpt-researcher.mjs` |
| **A5** Repo-deep-knowledge | `read_wiki_structure` / `ask_question` | 0.15 | `angles/a5-deepwiki.mjs` |
| **A6** Code-content ingest | `pack_remote_repository` | 0.15 | `angles/a6-repomix.mjs` |
| **A7** Authoritative-registry | GitHub GraphQL + npm/PyPI | 0.15 | `angles/a7-registry.mjs` |

Each angle module exports:

```javascript
export async function probe(repoUrl, options) → AngleResult {
  // repoUrl: "https://github.com/org/repo"
  // Returns: { angle, score, confidence, evidence, raw }
}
```

**Design principle**: Angles are independent — any subset can fail gracefully. The convergence engine requires ≥3 successful angles to produce a verdict. Failed angles are logged but don't block scoring.

### 3.2 Discovery Engine

Multi-channel repo discovery:

**Channels**:
1. **GitHub trending** — GraphQL `search` with topic filters (`claude-code`, `agentic`, `mcp-server`, `ai-agent`, `llm-workflow`, `autonomous-agent`)
2. **Awesome-list delta-grep** — `tools/awesome_list_deltagrep.py` + W434 12-list convergence
3. **HuggingFace papers** — `hf-mcp-server:paper_search` for academic SOTA with GitHub links
4. **Perplexity deep research** — `perplexity_research` for emerging repos not on trending
5. **npm/PyPI trending** — registry APIs for package velocity
6. **Community signals** — stars velocity (Δstars/week), fork rate, issue response time

**Cadences**:
- **On-demand**: operator requests "score these repos"
- **Scheduled**: ALW cron tick (nightly discovery sweep → score → verdict → queue)

**Output**: `DiscoveryCandidate[]` — each with source channel, confidence, and dedup key.

### 3.3 Scoring Pipeline (12-Dimension Rubric)

| Dim | Metric | Weight | Data Source |
|-----|--------|--------|-------------|
| D1 | Stars/forks (log-scaled) | 0.05 | A7 GitHub GraphQL |
| D2 | License OSI-approved | 0.08 | A7 + A6 repomix LICENSE scan |
| D3 | Signed releases / SLSA-L3 | 0.10 | A7 GitHub Releases API |
| D4 | Maintainer identity / reputation | 0.06 | A7 + A1 Perplexity |
| D5 | Dependency cleanliness | 0.08 | A6 repomix + `npm audit`/`pip-audit` |
| D6 | Last-commit recency | 0.06 | A7 GitHub GraphQL |
| D7 | Contributors count | 0.04 | A7 GitHub GraphQL |
| D8 | Downloads (30d) | 0.05 | A7 npm/PyPI registries |
| D9 | OpenSSF Scorecard | 0.08 | A7 Scorecard API |
| D10 | CC pathway readiness (`/plugin install` ready) | 0.10 | A5 deepwiki + A6 repomix |
| D11 | MCP-readiness (first-party MCP) | 0.10 | A3 Firecrawl + A5 deepwiki |
| D12 | Composite arch-quality (CAQ) | 0.20 | A5 + A6 + A1 convergence |

**CVS (Composite Verdict Score)** = Σ(D_n × weight_n), range 0.0–1.0.

**Trust-tuple** extraction via existing `probeTrust` + `extractTrustTuple` (W442 wired).

### 3.4 Convergence Engine

**Convergence requirement**: ≥3 of 7 angles must AGREE (within ±10% normalized score).

**Divergence handling**:
- 2 or fewer agreeing angles → verdict = INSUFFICIENT-EVIDENCE, re-queue with expanded angle set
- Minority opinions documented in verdict record
- Explicit `minority_opinion` field with angle ID, score, and reasoning

**Decision ladder**:

| Tier | CVS Range | Action | Gate |
|------|-----------|--------|------|
| INSTALL-HIGH | ≥ 0.85 | Auto-queue for SP2 install | Codex GPT-5.5 **binding** |
| INSTALL-STANDARD | 0.70–0.84 | Install with operator review | Codex **advisory** |
| PATTERN-STUDY | 0.60–0.69 | Extract patterns only, no install | None |
| CITE-REF | 0.50–0.59 | Reference catalog only | None |
| MONITOR | 0.40–0.49 | Watch list, re-score quarterly | None |
| BLOCK | < 0.40 | Reject, document reason | None |

**Borderline escalation**: CVS 0.65–0.75 auto-escalates to codex GPT-5.5 for tie-breaking.

### 3.5 ALW Integration

Research becomes an ALW subsystem:

```
ALW Research Tick:
  L1 Schedule  → "Is a discovery sweep due?" (check cron state)
  L2 Discover  → Run multi-channel discovery (§3.2)
  L3 Score     → Run v23 scoring pipeline (§3.3)
  L4 Converge  → Run convergence engine (§3.4)
  L5 Decide    → Apply decision ladder, queue actions
  L6 Execute   → For INSTALL-HIGH: dispatch SP2 install task
  L7 Verify    → Post-install verification (zero errors, no regressions)
  L8 Feedback  → Track verdict accuracy, update calibration (§3.6)
```

Built on existing `tools/alw/orchestrator.mjs` scaffold (W441.7).

### 3.6 Self-Improvement Feedback Loop

1. **Verdict accuracy tracking** — did INSTALL-HIGH repos improve the runtime? Measured via Langfuse traces + ccusage metrics. Tracked in T6 basic-memory as verdict-outcome pairs.
2. **Angle calibration** — which angles are most predictive? Pearson correlation: angle_score vs post-install_quality. Weight adjustments bounded ±0.05 per cycle, minimum 10 data points.
3. **Coverage audit** — cross-reference awesome-lists, HF papers, Perplexity for missed repos.
4. **False positive/negative log** — FP: installed but degraded → lower threshold. FN: rejected but essential → raise threshold.
5. **Meta-research** — periodically research SOTA research repos and fold improvements back.

### 3.7 GPT-5.5 Adversarial Gate

Per W331 P0.7 Frontier-Peer Policy:

| Verdict Tier | Codex Role | Binding? |
|-------------|------------|----------|
| INSTALL-HIGH | Adversarial review with full source access | **Yes** — r1 APPROVE required |
| INSTALL-STANDARD | Advisory review | No — noted but not blocking |
| Borderline (0.65–0.75) | Tie-breaker | **Yes** — codex decides tier |
| r1+r2 diverge | Sonnet 4.6 tie-break | **Yes** — final authority |

## 4. Implementation Phases

### Phase 1: Wire Remaining Angles (P0)
- Implement A1 (Perplexity), A2 (Exa), A3 (Firecrawl), A4 (gpt-researcher)
- Activate Exa API key in `CLAUDE.local.md`
- Unit tests for each angle (vitest)
- Integration test: all 7 angles against a known repo

### Phase 2: Score User-Specified Repos (P0)
- Full v23 pipeline on AutoGPT, deer-flow
- Re-evaluate ComposioHQ/agent-orchestrator, OpenHands
- Verify vercel-labs/agent-skills identity
- Cite-refresh already-installed repos
- Produce verdict records with full evidence

### Phase 3: Discovery Engine + Batch Re-Score (P1)
- Implement multi-channel discovery engine
- Run discovery sweep (target: 20+ new candidates)
- Batch re-score all 50+ existing W259 candidates (v18→v23)
- Produce updated SOTA catalog

### Phase 4: ALW Integration (P2)
- Wire research tick into ALW orchestrator
- Implement cron scheduling for nightly discovery
- Add L7 verify + L8 feedback stubs
- Test full tick lifecycle end-to-end

### Phase 5: Self-Improvement + GPT-5.5 Gate (P2–P3)
- Implement verdict accuracy tracking via Langfuse
- Wire codex GPT-5.5 gate for INSTALL-HIGH verdicts
- Implement angle calibration (after 10+ verdicts)
- Implement meta-research sweep

## 5. Practical Constraints

| Constraint | Resolution |
|------------|------------|
| 4/5 worktrees occupied | Prune completed W434/W437 worktrees |
| Exa API key commented out | Activate in `CLAUDE.local.md` |
| Tavily key absent | gpt-researcher fallback (A4 reroute) |
| 100+ pending tasks W432-W438 | Triage: fold relevant, archive completed, abandon stale |
| v18 scores on 50+ candidates | Batch re-score via v23 pipeline (Phase 3) |

## 6. Success Criteria

1. All 7 v23 angles operational and passing integration tests
2. All user-specified repos scored with full v23 CVS + multi-angle convergence
3. Discovery engine producing 20+ new candidates per sweep
4. v18→v23 re-scoring complete for all 50+ existing candidates
5. ALW research tick running end-to-end (manual trigger, then cron)
6. Verdict accuracy tracking wired to Langfuse
7. Codex GPT-5.5 gate enforced for INSTALL-HIGH verdicts
8. Zero hidden errors — all failures explicit and logged

## 7. Out of Scope (Deferred to SP2–SP5)

- Actual repo installation (SP2)
- GitHub workflow enhancement (SP3)
- Full ALW autonomous lifecycle beyond research tick (SP4)
- Public release preparation (SP5)
- Memory architecture improvements (focused PR, per user direction)

## 8. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| MCP server flakiness (Exa/Firecrawl) | Medium | Medium | Graceful degradation — ≥3 angles, not all 7 |
| API rate limits on discovery | Medium | Low | Backoff + caching in T6 basic-memory |
| Codex GPT-5.5 availability | Low | High | Fallback to Sonnet 4.6 per W331 |
| v23 convergence engine bugs | Medium | Medium | Vitest suite + manual verify first 5 verdicts |
| Stale awesome-lists | Low | Low | Cross-channel dedup catches gaps |
