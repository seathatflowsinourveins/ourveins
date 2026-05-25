# W446: Research Architecture Overhaul — Fix the Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans.

**Goal:** Fix 3 critical accuracy bugs in the v23 research engine that make CVS scores unreliable, then re-score all repos with the fixed engine.

**Architecture:** Surgical fixes to convergence-engine.mjs, trust-probe.mjs, discovery-engine.mjs, and angles/A1-A4. No new subsystems — improve existing code.

**Tech Stack:** Node.js ESM, existing MCP bridge, gh CLI, npm CLI.

---

## Problem Statement

The v23 research architecture has 3 critical accuracy bugs discovered via deep audit (W445 research-arch-audit agent):

1. **Trust-probe target shape mismatch** — `probeTrust()` expects `{owner, repo}` but receives `{identifier: "owner/repo"}`. The OSSF Scorecard probe silently fails, defaulting ALL trust signals to false. This blocks every repo from INSTALL tiers via the gold path.

2. **5 of 12 CVS dimensions are hardcoded defaults** — D4 (maintainer rep: 0.5), D5 (dep cleanliness: 0.7), D7 (contributor count: 0.5), D8 (downloads: 0.5), D9 (OpenSSF scorecard: 0.5). These account for 31% of the CVS weight budget but contribute ZERO real signal. The CVS is one-third fabricated.

3. **Angles A1-A4 use identical keyword regex** — All four web-search angles (perplexity, exa, firecrawl, tavily) score text with the same regex patterns. They produce correlated scores, undermining the convergence guarantee. Four "independent" angles are actually one analysis repeated four times.

## Scoring Evidence

8 user-listed repos scored through current v23 — ALL MIT repos clustered at 0.595-0.631 CVS (indistinguishable). This proves the scoring is not discriminating:

| Repo | Stars | CVS | Tier | Issue |
|---|---|---|---|---|
| AutoGPT | 184k | 0.533 | HALT-REJECT | Polyform Shield license (correct) |
| deer-flow | 69k | 0.631 | PATTERN-STUDY | Scores same as 27k-star repos |
| gpt-researcher | 27k | 0.595 | PATTERN-STUDY | Already MCP-installed |
| composio | 28k | 0.626 | PATTERN-STUDY | Scores same as 69k-star repos |
| OpenHands | 74k | 0.531 | HALT-REJECT | Dual license (correct) |
| ccbp | 54k | 0.629 | PATTERN-STUDY | Already CITE-REF |
| agent-skills | 45k | 0.628 | PATTERN-STUDY | Already CC plugin |
| wshobson/agents | 35k | 0.627 | PATTERN-STUDY | Already partial install |

The 0.036 CVS spread (0.595→0.631) across repos with 10x star difference proves the engine cannot discriminate quality.

## Fix Plan (3 phases, priority order)

### Phase 1: P0 Accuracy Fixes (highest leverage)

**Task 1.1: Fix trust-probe target shape**
- File: `tools/research-arch-v23/trust-probe.mjs`
- Fix: Parse `target.identifier.split('/')` into `{owner, repo}` at probe entry
- Impact: Unblocks scorecard probe → trust signals become real → gold-path install tiers work

**Task 1.2: Populate D4/D5/D7/D8/D9 with real data**
- File: `tools/research-arch-v23/convergence-engine.mjs`
- D7 (contributors): `gh api repos/{owner}/{repo}/contributors --jq length`
- D8 (downloads): `npm view <pkg> --json` for npm packages; GitHub clone traffic for repos
- D9 (OpenSSF): feed trust-probe scorecard aggregate score directly
- D5 (dep cleanliness): feed trust-probe osv-scanner `transitive_deps_clean` signal
- D4 (maintainer rep): GitHub org membership + contributor count + prior-repo track record

**Task 1.3: Differentiate A1-A4 angle scoring**
- Files: `tools/research-arch-v23/angles/A1-perplexity.mjs` through `A4-tavily.mjs`
- Fix: Each angle extracts DIFFERENT structured signals:
  - A1 (perplexity): Use `perplexity_research` (deep, 30s) for top candidates, extract maintenance verdict
  - A2 (exa): Focus on GitHub competitor/alternative analysis — find what ELSE exists in the space
  - A3 (firecrawl): Crawl the actual repo README + CHANGELOG for structured metadata
  - A4 (tavily/gpt-researcher): Use `deep_research` for comprehensive multi-source analysis
- Impact: 4 angles produce independent, non-correlated signals → real convergence

**Task 1.4: Reconcile schema ↔ implementation weights**
- Files: `convergence-engine.mjs` + `.claude/schemas/sca-v23-multi-angle-convergence.schema.json`
- Fix D3 (0.10→align), D6 (0.06→align), D12 (0.20→align)
- Add MONITOR to schema decision_tier enum
- Add SKIPPED to codex_verdict enum, allow round:0 and model:null

### Phase 2: P1 Architecture Gaps

**Task 2.1: Add discovery channels**
- File: `tools/research-arch-v23/discovery-engine.mjs`
- Add: npm search, PyPI search, HuggingFace papers (via `mcp__hf-mcp-server__paper_search`)
- Add topics: `llm`, `langchain`, `claude`, `anthropic`, `model-context-protocol`, `ai-tools`
- Fix hardcoded date: dynamic `Date.now() - 90d`

**Task 2.2: Fix hardcoded paths**
- Files: `mcp-client-bridge.mjs`, `python_mcp_helper.py`, `verdict-store.mjs`
- Replace machine-specific paths with `process.env` + sensible defaults

**Task 2.3: Add Langfuse trace emission**
- File: `convergence-engine.mjs`
- Emit trace per verdict to Langfuse at `:3000` (already live)

### Phase 3: P2 Self-Improvement

**Task 3.1: Verdict TTL + versioning**
- File: `verdict-store.mjs`
- Add `schema_version`, 30-day expiry, file locking

**Task 3.2: Batch retry + resume**
- File: `batch-scorer.mjs`
- Add 1-retry with backoff, progress persistence, resume from checkpoint

**Task 3.3: New angles**
- HuggingFace papers angle (academic validation signal)
- npm download trends angle (adoption velocity)
- Context7 documentation quality angle

## Success Criteria

1. **CVS discrimination**: Re-scored repos show ≥0.15 CVS spread (vs current 0.036)
2. **Trust-probe functional**: scorecard probe returns real data (not all-false)
3. **Angle independence**: A1-A4 correlation coefficient ≤0.7 (vs current ~0.95)
4. **D4/D5/D7/D8/D9 populated**: zero hardcoded defaults in CVS computation
5. **Schema conformance**: all verdicts pass JSON Schema validation

## Repo Decisions (post-fix re-scoring)

| Repo | Current Status | Expected Post-Fix |
|---|---|---|
| AutoGPT | HALT-REJECT | Stays HALT-REJECT (license) |
| deer-flow | PATTERN-STUDY | PATTERN-STUDY (no CC pathway, but highest pattern value) |
| gpt-researcher | Already MCP | Confirm INSTALL-STANDARD with fixed scoring |
| composio | PATTERN-STUDY | Re-evaluate — MCP pathway potential |
| OpenHands | HALT-REJECT | Stays HALT-REJECT (license) |
| ccbp | Already CITE-REF | Stays CITE-REF (documentation, not installable) |
| agent-skills | Already CC plugin | Confirm INSTALL-STANDARD |
| wshobson/agents | Already partial | Confirm INSTALL-STANDARD |

## Cite Anchors (≥3 distinct orgs)

1. **Anthropic**: `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (subagent model precedence)
2. **OpenSSF**: `https://github.com/ossf/scorecard` (D9 OpenSSF Scorecard data source)
3. **gitleaks/Gitleaks LLC**: `https://github.com/gitleaks/gitleaks` (trust-probe dependency scanning)
4. **npm Inc**: `https://api.npmjs.org/downloads/` (D8 download counts API)
5. **Perplexity AI**: `perplexity_research` MCP tool (A1 deep research mode)

Wave: W446
