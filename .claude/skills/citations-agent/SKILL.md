---
name: citations-agent
description: Attach inline cite-anchors to factual claims, enforce sca-v13 >=3-org-distinct floor, and emit verdict-ledger-grade citation blocks. Use when the operator says "cite-anchor", "verdict-ledger", "provenance", "source-anchor", "footnote", "citation-cluster", or asks to validate that a synthesis/report/analysis has correct source attribution per W332-style 3-org-distinct discipline. Adapted from Anthropic claude-cookbooks @ 39a350b6 patterns/agents/prompts/citations_agent.md (MIT).
---

# citations-agent

Operator-curated R4(b) skill: adds correct, minimal, and source-anchored citations to synthesized text, then enforces the W329-E +sca-v13 >=3-org-distinct floor on the resulting citation cluster.

## When to invoke

Fires on description-match for these signals:

- Operator says **cite-anchor** / **verdict-ledger** / **provenance** / **source-anchor** / **footnote** / **citation-cluster**.
- Author is closing a Wave-N verdict that requires evidence anchoring (sca-v13 cite-anchor authority + Delta-G51 INDEPENDENCE-PROOF).
- A research synthesis, audit report, or ADR draft lacks explicit per-claim source attribution.
- A W332-style 3-org-distinct floor check is requested before ship-gate.
- Operator asks "does this claim cite a primary source?" or "verify the cite-anchors here".

## When NOT to invoke

- Read-only file searches (Glob/Grep/Read alone): no synthesis was produced, nothing to cite.
- Text that already carries >=3 distinct-org cite-anchors with line-ranges (skill would be redundant).
- Autonomous /loop cron re-entries that do not surface a new claim requiring attribution.
- Single-source factual lookups (e.g. "what is the value of X in file F?") — direct file-path is sufficient.
- Code generation tasks (use TDD / engineering-skills:code-reviewer instead).

## Behavior

Adapted from Anthropic claude-cookbooks `patterns/agents/prompts/citations_agent.md` (MIT, Anthropic):

1. **Scan the input synthesis** for factual claims, conclusions, numeric values, named-entity assertions, and substantive analytical judgments.
2. **Match claims to sources** in the supplied document set. ONLY add a cite-anchor where a source directly supports the claim.
3. **Preserve the text 100% byte-identical** — citations are additive only. NEVER modify whitespace, punctuation, or wording inside `<synthesized_text>` regions.
4. **Cite meaningful semantic units** — span complete thoughts; prefer end-of-sentence placement; avoid citing single words or fragmentary phrases.
5. **Avoid redundant citations** — one cite-anchor per source per sentence; suppress duplicate adjacent anchors.
6. **Skip common knowledge** — not every sentence needs a citation; prioritize claims a reader would want to verify.
7. **Emit the cite-block** in this runtime's standard form: `path:line @ commit-SHA` for repo cites; `URL` for web cites; `T6-permalink` for basic-memory cites.
8. **Run the >=3-org-distinct floor check** (see next section). If FAIL, return the cluster with a `[FLOOR-VIOLATION]` marker and a recommendation for which additional org-distinct sources to add.

## >=3-org-distinct floor enforcement

Per CLAUDE.md cardinal-rule-1 trust-tuple extension + sca-v13 cite-anchor authority + W329-E §8 closure:

```
function checkOrgDistinctFloor(citations):
  orgs = set()
  for c in citations:
    orgs.add( extractOrg(c) )                  # e.g. "anthropic", "openai", "github.com/<owner>"
  distinct = orgs.size
  if distinct >= 3:
    return PASS
  else:
    return FAIL, missing = 3 - distinct,
                 suggestRecommendation(claim, exclude=orgs)
```

`extractOrg(c)` rules:
- GitHub URL `github.com/<owner>/<repo>` → org = `<owner>`
- Repo `<plugin>/<file>` (installed-plugin cite) → org = plugin's owner
- Web URL `https://<host>/...` → org = registrable-domain (eTLD+1)
- Self-cites (this runtime's own docs/architecture/) count as ONE org regardless of count → mitigates self-citation chains
- T6 basic-memory permalinks count as the org that originally authored the note (recorded in note frontmatter)

PASS requires: >=3 distinct orgs **AND** no single org >50% of total cite count.

## Jury-on-Demand instance-reliability weighting (W369 P1.2 from haizelabs/verdict)

Pattern-study extract from `haizelabs/verdict v0.2.7` @ `8f972ef34751d25edfd9527326539aa0d34f5af6` (~600 stars, MIT-licensed, SOTA-or-near-SOTA on ExpertQA per `README.md:92,96`; sca-v17 §Delta-50 prior cite). Closes W367 Stream G meta-pattern #3.

### Pattern definition

When verifying a cite-anchor that ought to be supported by **N independent sources** (3-org-distinct floor + beyond), do not naive-majority-vote across the sources. Instead, weight each source by a **per-instance reliability score** before aggregation. Reliability sources of evidence: (a) Cohen's kappa with a trusted human/oracle on a held-out probe set, (b) historical retraction rate of the publisher, (c) commit-SHA pinning depth (a `path:line @ commit-SHA` cite is more reliable than a bare URL), (d) cross-source corroboration count (sources cited independently by other 3-org-distinct clusters score higher).

`haizelabs/verdict` mechanizes this with three primitives composed via the `>>` Block-operator:

1. **Repeated judge-verify pairs** in a `Layer`: each judge instance runs N times (verdict default `repeat=3` per `README.md:23`), each followed by a Verifier (a second `CategoricalJudgeUnit` per `judge.py:121`) that re-evaluates the prior judge's explanation; the verify-step adds a correction layer that flips systematically-incorrect judgments.
2. **Pool primitives** that aggregate across instances per `verdict/transform.py`:
   - `MaxPoolUnit` (`transform.py:132`) — `statistics.mode` majority vote (the naive aggregator).
   - `MeanPoolUnit` (`transform.py:127`) — `statistics.mean` arithmetic average (continuous-scale fields).
   - `MeanVariancePoolUnit` (`transform.py:137`) — returns BOTH mean AND `statistics.variance`; the variance is the per-cluster reliability proxy (low variance = high inter-instance agreement = high confidence; high variance = the cluster is conflicted, downgrade to FLOOR-VIOLATION).
3. **`CategoricalJudgeUnit` + verifier composition** (`README.md:22-23` "3 hierarchically verified judges + max vote") — the verifier step is what turns naive-majority into reliability-weighted; an instance whose verifier flips it counts as a half-vote, not a full vote.

### CC-runtime adaptation (cite-cluster reliability scoring)

When this skill validates a cite-cluster across `>=3-org-distinct` sources, after the floor check PASSes:

```
function reliabilityWeightedCheck(citations):
  // Step 1: assign per-instance reliability per source-class
  for c in citations:
    c.reliability = baseReliability(c.host)              # primary-org=1.0, secondary-blog=0.6, self-cite=0.3
    c.reliability *= shaPinningBonus(c)                  # +0.15 if path:line @ SHA, +0 if bare URL, -0.2 if no line
    c.reliability *= recencyDecay(c.publish_date)        # half-life 24mo, floor 0.4
    c.reliability *= corroborationBonus(c, otherClusters) # +0.1 per other-cluster that cites same source

  // Step 2: weight the org-distinct vote (MeanVariancePoolUnit analog)
  orgWeights = groupSumByOrg(citations, c => c.reliability)
  mean = weightedMean(orgWeights)
  variance = weightedVariance(orgWeights)

  // Step 3: ship-or-block decision
  if mean >= 0.7 AND variance < 0.15:
    return PASS-HIGH-CONFIDENCE
  if mean >= 0.5 AND variance < 0.30:
    return PASS-MARGINAL (operator-sign recommended)
  return FLOOR-VIOLATION (cluster is divergent; fetch 1-2 corroborating sources from underweighted orgs)
```

### Usage trigger

Invoke the reliability-weighted check (NOT just the naive 3-org-distinct floor) when **any** of these hold:

- The claim is **load-bearing for a ship-gate decision** (sca-v* verdict, ADR ratification, deprecation).
- The claim's source-set spans **mixed-credibility hosts** (e.g. one Anthropic + one personal-blog + one Reddit thread — credibility variance is structurally high).
- The claim contains a **numeric SOTA assertion** ("78.88% on ExpertQA" per `README.md`-equivalent claims) — naive-majority-vote across blogs that quote the same paper double-counts; reliability-weighting discounts the duplicates.
- An adversarial-review round has already flagged a `[FLOOR-VIOLATION]` and the operator wants the next-best decision short of fetching more sources.

### When NOT to use

- Single-source factual lookups (one cite suffices; no aggregation needed).
- Claims with `>=3-org-distinct` sources that are ALL primary-org official-doc with commit-SHA pinning — reliability is uniformly high, variance ~0, reliability-weighting collapses to naive 3-org-distinct floor anyway.
- Routine /loop cron re-entries that re-validate cites already PASSed in a prior wave.

### Cite-anchors for this pattern (3-org-distinct)

1. **haizelabs/verdict** (`haizelabs.com`) — primary pattern-source. `https://github.com/haizelabs/verdict/blob/8f972ef3/verdict/transform.py#L127-L143` (MeanPoolUnit, MaxPoolUnit, MeanVariancePoolUnit) + `https://github.com/haizelabs/verdict/blob/8f972ef3/verdict/common/judge.py#L9-L143` (JudgeUnit, BestOfKJudgeUnit, CategoricalJudgeUnit) + `https://github.com/haizelabs/verdict/blob/8f972ef3/README.md#L18,L92,L96` (SOTA-or-near-SOTA on ExpertQA hallucination-detection).
2. **arXiv (Kalra & Tang, 2025-02-25)** — paper grounding the design. `https://arxiv.org/abs/2502.18018` "VERDICT: A Library for Scaling Judge-Time Compute" cited in `README.md:5,166`; introduces the judge-time-compute scaling thesis that variance reduction across N instances dominates a single high-effort judge call. Independent of haizelabs github surface — arXiv is a Cornell-University-hosted preprint server.
3. **Anthropic claude-cookbooks** (this skill's parent lineage) — `https://github.com/anthropics/anthropic-cookbook/blob/main/patterns/agents/prompts/citations_agent.md` @ pinned SHA `39a350b6790c132337dcc3ec35240728fcc1dc0e` — establishes the citations-as-additive-only contract that this skill's reliability-weighted check extends. Cite-anchor for the parent prompt; the reliability-weighting layer is the W369 P1.2 augmentation on top of it.

### Variance-reduction theory cross-cite

The mathematical justification — that N-instance aggregation with per-instance reliability weighting strictly dominates naive majority vote when reliability is non-uniform — traces to Wang et al. 2023 "Multiple Evidence Calibration" (cited in verdict bias-mitigation docs per `README.md` lineage). The `MeanVariancePoolUnit` is the practical analog of an inverse-variance-weighted estimator (BLUE under Gauss-Markov assumptions): instances with low variance contribute more weight than high-variance ones, which is exactly the property a cite-cluster reliability score should encode.

## Anti-patterns

- **Single-source citation cluster**: all cite-anchors point to the same repo/host — fails sca-v13 floor.
- **Self-citation chains**: chains of `docs/architecture/W<N>-*/...` cites with no upstream/external anchor — counts as 1 org, fails floor.
- **Broken URLs**: cite-anchor that 404s, redirects to unrelated content, or lacks commit-SHA pinning for GitHub raw — fails provenance.
- **Cite-without-line-range**: `path:` (no `:line`) is not a cite-anchor, it's a file-reference; add line/range or SHA.
- **Wholesale-paraphrase under one citation**: an entire paragraph synthesizing multiple sources marked with one cite — over-attribution; split or remove.
- **Common-knowledge citation**: citing well-known facts ("Python is a programming language") wastes anchor budget.

## Cardinal-rule conformance

- **R1 (trusted primitives)**: skill derived from Anthropic-owned `claude-cookbooks` repo @ pinned SHA `39a350b6790c132337dcc3ec35240728fcc1dc0e`, MIT-licensed; trust-tuple satisfied.
- **R2 (no project-owned hook bodies)**: this is a SKILL.md operator-curated R4(b) skill — declarative prompt, no `.claude/hooks/**` body.
- **R3 (installed-plugin subagents)**: skill does NOT spawn subagents; runs in-line on the orchestrator.
- **R4 (operator-curated R4(b))**: SKILL.md at `.claude/skills/citations-agent/` per Anthropic skills doc; trigger phrases <=8 distinct; sibling-overlap audited below.
- **R5 (sandbox boundaries)**: pure-prompt skill — no shell, no FS writes, no network — within CC permission envelope.

## Sibling-overlap audit

- **vs `sota-convergence-audit`** (sca-v13): that skill MANDATES the >=3-org-distinct floor at the verdict level; `citations-agent` IMPLEMENTS it at the per-claim level. Overlap is complementary (mandate vs mechanism), not redundant. Distinct trigger sets: sca-v13 fires on "SOTA fit / tier / rank"; citations-agent fires on "cite-anchor / footnote / provenance".
- **vs `addyosmani-source-driven-development`**: that skill enforces source-citation discipline during ORIGINATION of new code/specs; citations-agent enforces it during ATTRIBUTION of an existing synthesis. Overlap <25% — different lifecycle stages.
- **vs `engineering-skills:senior-prompt-engineer`**: orthogonal — prompt-engineering vs citation-attribution.

## Provenance

- **Upstream**: Anthropic `claude-cookbooks` @ `39a350b6790c132337dcc3ec35240728fcc1dc0e` path `patterns/agents/prompts/citations_agent.md` — MIT license per repo LICENSE.
- **Wave authorship**: W332-C parallel-worker-C dispatch (W332-SOTA-DISCIPLINE-CLOSURE-V2).
- **Audit record**: `docs/architecture/W332-SOTA-DISCIPLINE-CLOSURE-V2/W332-C-CITATIONS-AGENT-SKILL.md`.
- **Adaptation**: original cookbook prompt extracted verbatim; added (a) operator-curated trigger frontmatter, (b) >=3-org-distinct floor algorithm, (c) cardinal-rule conformance block, (d) sibling-overlap audit — per local R4(b) discipline.
- **W369 P1.2 augmentation (2026-05-22)**: pattern-study extract from `haizelabs/verdict v0.2.7 @ 8f972ef3` added the "Jury-on-Demand instance-reliability weighting" section above. Closes W367 Stream G meta-pattern #3 + W369 SPEC P1.2. Source primitives `MaxPoolUnit/MeanPoolUnit/MeanVariancePoolUnit` (`transform.py:127-143`) + `CategoricalJudgeUnit/BestOfKJudgeUnit/JudgeUnit` (`judge.py:9-143`) + 3-hierarchically-verified-judges-plus-max-vote example (`README.md:23`). 3-org-distinct cite-anchors: haizelabs + arXiv:2502.18018 (Cornell) + Anthropic claude-cookbooks. License: MIT (verdict) + MIT (cookbooks); cite-only pattern adaptation, no source code copied.
