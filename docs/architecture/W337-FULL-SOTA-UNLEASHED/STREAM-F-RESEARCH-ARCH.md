# Stream F — Research Architecture Audit (multi-angle convergence)

> Sourced from mcp__perplexity__perplexity_research (Sonar deep research, reasoning_effort:"high") with 37 citations + mcp__perplexity__perplexity_ask cross-checks. Agent-fork retries blocked by API Overload; direct-MCP fallback succeeded.

## §1 Current Research Architecture (this runtime)

- **W259 grand catalog** (99 repos × 23 dims) at `docs/architecture/W259-grand-catalog/`
- **W308/W314/W325 SOTA-discovery + line-by-line ingest + convergence audit waves**
- **Codex GPT-5.5 frontier-peer policy** (W331 P0.7) — codex authority, Ollama qwen3-coder triage-only, Sonnet 4.6 tiebreak
- **Local skills**: sota-convergence-audit, mem-recall, goal-prompt-synthesis, parallel-dispatch-mandate, dispatching-parallel-agents-w321-fork
- **sca-v7..v12** hand-rolled MCDA ranking (`tools/sca-mcda-rank.py`, `tools/sca-v7-prelim.sh`) — to be deprecated in favor of wshobson PluginEval (Stream D §1)
- **Channels currently used**: GitHub search (primary), mcp__deepwiki (structure+contents+ask), mcp__repomix (pack+grep), mcp__perplexity (research+ask+search), mcp__hf-mcp-server (papers+repos), WebSearch + WebFetch, codex GPT-5.5 review

**Strengths**: cite-anchored every claim, codex adversarial review, multi-source convergence, runtime-fact verify-before-claim (cardinal-rule-6).

**Weaknesses**: (a) GitHub-search-bias — paper/Reddit/X under-utilized; (b) hand-rolled sca-vN ranking diverges from peer-reviewed frameworks (PluginEval); (c) decision-log not persisted in machine-readable form; (d) convergence-validation requires manual codex round-trip (no automated multi-source query → JSON-merge); (e) codex + Opus may share training-data → "independence" partially illusory.

## §2 Multi-Dimensional Ranking Framework (proposal)

Synthesizing wshobson PluginEval + sca-v11 + perplexity research:

| Dim | Weight | Probe | Score 0-5 |
|---|---|---|---|
| GitHub stars (category-percentile) | 0.10 | gh-api | by percentile |
| Recency (last commit ≤90d) | 0.12 | gh-api | days-since-commit |
| Maintainer signal (sole vs team, issue-response) | 0.10 | gh-api + perplexity | qualitative |
| Community engagement (forks, contributors, PR velocity) | 0.08 | gh-api | composite |
| Claude-Code-pathway support | 0.15 | manifest probe | works-natively? |
| License risk (MIT/Apache/BSD/ISC/MPL OK; AGPL/SSPL/proprietary case-by-case) | 0.08 | github license-file | enum |
| Dependency blast (Socket.dev + OSSF Scorecard + Snyk) | 0.08 | external API | composite |
| SLSA/Sigstore/CycloneDX maturity | 0.06 | provenance probe | enum |
| SOTA-pattern coverage (covers NEW patterns?) | 0.10 | LLM judge | gap-fill score |
| Convergence votes (≥2 independent SOTA sources cite) | 0.08 | manual+automated | n-cited |
| Windows-portable Z:-install fit | 0.03 | runtime probe | bool |
| Frontier-model (Opus 4.7 + GPT-5.5) fit | 0.02 | docs probe | bool |

**Comparison vs historical**:
- **sca-v7 (W316)**: 5-gate qualitative + 12-dim quantitative; no provenance + community
- **sca-v11 (W325)**: + provenance layer; no Wilson CI, no Elo
- **sca-v12 (W329-H)**: + R5-corollary safety + PluginEval-adjacent rigor
- **wshobson PluginEval**: peer-reviewed 10-dim + Wilson + bootstrap + Clopper-Pearson + Elo; statistical rigor exceeds sca-v12

**Action**: replace sca-vN with PluginEval as canonical framework. Keep convergence-votes + windows-portable as runtime-specific extensions.

## §3 Discovery Comprehensiveness — channel audit

| Channel | Currently used | Gap |
|---|---|---|
| GitHub search | ✓ primary | over-weighted; star-bias |
| arXiv (cs.AI, cs.LG) | ✗ rarely | **GAP**: papers like UCAgents, EvoSkill missed; add mcp__hf-mcp-server__paper_search |
| HuggingFace (state of OSS Spring 2026 report) | ✗ | **GAP**: regional/temporal trends not surfaced |
| Reddit r/ClaudeAI / r/LocalLLaMA / r/MachineLearning | ✗ | **GAP**: operational pain-points surface here first (memory loss, token economics) |
| X/Twitter | ✗ | low-signal; deprioritize |
| Anthropic blog (news + engineering posts + release-notes) | ✓ via WebFetch | sometimes lag |
| Anthropic Code-with-Claude event (May 2026 Managed Agents + Dreaming) | ✗ | **GAP**: major announcements not surfaced |
| awesome-* lists | ✗ | **GAP** (see §7 below) |
| MCP server registry (Smithery) | ✗ | **GAP**: smithery.ai/skills?ns=wshobson exists |
| ClawHub plugin upload | ✗ | **GAP** (OthmanAdi mentions this) |
| EvoSkill (failed-trajectory synthesis) | ✗ | **GAP**: auto-skill-discovery from CC session failures |

**Action**: add 5 awesome-list scrapes + arXiv paper-search + HuggingFace OSS report into W338 W339 research cadence.

## §4 Decision-Making Threshold (proposal)

**Current**: implicit (cardinal-rules + trust-tuple) — no explicit formula.

**Proposed install-vs-pattern-study formula**:

```
INSTALL IFF (
    convergence_votes >= 2          // ≥2 independent SOTA sources cite as best-in-category
  AND license_risk <= "low"          // MIT/Apache/BSD/ISC/MPL or operator-cleared
  AND maintainer_signal >= 3/5       // team-not-sole OR responsive-issues
  AND covers_new_patterns == true   // covers patterns NOT in existing runtime
  AND windows_portable_fit == true OR pattern_can_be_ported
)
ELSE
  PATTERN_STUDY  // adopt-as-skill-only, no plugin install
ELSE-ELSE
  DEFER  // re-litigate at W+N
```

**Decision-log schema** (NEW): `.claude/state/sota-decisions.jsonl` — one JSON object per decision:

```json
{
  "wave": "W337",
  "repo": "wshobson/agents",
  "head_sha": "<sha>",
  "decision": "INSTALL",
  "convergence_votes": 4,
  "sources_cited": ["perplexity", "deepwiki", "anthropic-blog", "wshobson-README"],
  "license_ok": true,
  "maintainer_signal": "team",
  "new_patterns": ["PluginEval", "Conductor", "agent-teams"],
  "windows_portable": true,
  "operator_signed": false,
  "rollback_plan": "/plugin uninstall + restore CLAUDE.md L82",
  "re_litigate_wave": "W343"
}
```

**Failure mode caught**: alirezarezvani 313-bundle near-install pre-W330 → would have been blocked by `convergence_votes>=2` (was single-source).

## §5 Convergence Validation Pipeline (proposal)

**Current**: codex GPT-5.5 + Sonnet tiebreak + operator-sign.

**Gap**: no automated cross-source merge.

**Proposed pipeline** (`tools/sota-convergence.mjs` — operator-curated):

```
[Input]    repo-candidate-list (from W259 catalog or new discovery)
   ↓
[Parallel] perplexity_research + deepwiki + github + hf-paper + reddit-scrape
   ↓
[Merge]    JSON-merge → convergence-score per repo (count of sources independently citing)
   ↓
[Threshold] convergence_votes >= 2 → SHORTLIST
   ↓
[Codex]    GPT-5.5 adversarial review on shortlist
   ↓
[Operator] sign or reject
   ↓
[Decision-log] append .claude/state/sota-decisions.jsonl
```

## §6 Failure Modes (cite-anchored to historical waves)

- **Stale ranking criteria**: sca-v7 (W316) → v8 (W317) → v11 (W325) → v12 (W329) — frequent churn; each version retired stale dimensions. **Mitigation**: switch to upstream PluginEval (peer-reviewed, less churn).
- **Single-source bias**: alirezarezvani 313-bundle (W330 retire) was almost-installed via single-source signal. **Mitigation**: enforce convergence_votes>=2.
- **GitHub-only blindspot**: anthropics Managed Agents (May 2026 Code-with-Claude event) — runtime missed announcement until W337 Stream-F surfacing via perplexity. **Mitigation**: add Anthropic-blog + announcement-channel monitoring.
- **Recency-bias**: 2026-05-20 ICA + /handoff updates to mattpocock — runtime fork lagged 1 day; not catastrophic but signals lack of automated drift-watch. **Mitigation**: weekly W-cadence with mcp__github__list_commits across known forks.
- **English-language bias**: HuggingFace State of OSS Spring 2026 notes regional frameworks for local regulatory environments — runtime has 0 visibility. **Mitigation**: explicit non-English channel scan quarterly.
- **Codex + Opus training-overlap**: both share post-2024 web data. "Independent" review may share blind-spots. **Mitigation**: add a 3rd cloud reviewer (Anthropic claude ultrareview per Stream B §3) for high-stakes decisions.

## §7 Research-on-Research — SOTA repos for improving the research arch itself

Top-7 candidate awesome-lists + research-pattern repos:

1. **vivy-yi/awesome-agent-orchestration** — comparative matrices on resilience/scalability/enterprise-readiness; rigorous curation (commit-frequency + community-engagement + production-deployment evidence)
2. **heilcheng/awesome-agent-skills** — real-world skills by engineering teams (not bulk-generated)
3. **AGI-Edgerunners/LLM-Agents-Papers** — categorized by domain + technical approach + direct impl links
4. **luo-junyu/awesome-agent-papers** — similar; complementary
5. **Zijian-Ni/awesome-ai-agents-2026** — 2026 vintage curation
6. **VoltAgent/awesome-claude-code-subagents** — Claude-Code-specific subagent catalog
7. **sentient-agi/EvoSkill** — automated skill synthesis from failed trajectories (research-on-research pattern: failures → new skills)

Plus 2 implementation patterns:
- **Anthropic engineering blog**: `anthropic.com/engineering/multi-agent-research-system` + `anthropic.com/engineering/harness-design-long-running-apps` — first-party orchestrator-worker exemplar
- **block/agent-skills** — Block (Square) production agent-skills repo

## §8 Upgrade Proposal — concrete changes

**P0**: Switch sca-vN to PluginEval (post wshobson/agents install via Stream D §1).

**P1**: Add `tools/sota-convergence.mjs` — automated multi-source convergence pipeline (per §5).

**P1**: Add `.claude/state/sota-decisions.jsonl` decision-log (per §4).

**P2**: Add 5 awesome-list scrape skills (vivy-yi, heilcheng, AGI-Edgerunners, luo-junyu, Zijian-Ni) — auto-fire on "find SOTA repo for X" task descriptions.

**P2**: Add quarterly non-GitHub channel scan (arXiv + HuggingFace + Anthropic blog + Reddit signals) as a /loop tick.

**P3**: Replace single-codex review with 3-cloud-reviewer (codex GPT-5.5 + Opus 4.7 self + claude-ultrareview) for >$5k-impact decisions.

## Top-5 Research Architecture Upgrades

1. **P0** Switch sca-vN→wshobson PluginEval (post-install via Stream D §1) — replaces `tools/sca-*.py/sh`
2. **P0** Codify install-vs-pattern decision threshold + persist to `.claude/state/sota-decisions.jsonl`
3. **P1** Add multi-source convergence pipeline `tools/sota-convergence.mjs` with auto-merge from perplexity/deepwiki/github/hf-paper
4. **P2** Add 5-awesome-list scrape + arXiv/HF/Anthropic-blog quarterly cadence as /loop tick
5. **P3** Add 3-cloud-reviewer (codex + Opus + ultrareview) for high-stakes decisions only
