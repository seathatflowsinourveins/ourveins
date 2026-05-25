# Research Architecture v23 — Multi-Angle Convergence Engine

**Status**: APPROVED (operator brainstorm 3-tier sign-off — W439 META-research wave)
**Date**: 2026-05-25
**Wave**: W439 (provenance only; branch is `feat/research-arch-v23-multi-angle-convergence` per new naming reform)
**Supersedes**: sca-v18 (`/.claude/schemas/sca-v18-repo-verdict.schema.json`) + sca-v20 (`/sca-v20-multi-dim.schema.json`) + sca-v21 (`/sca-v21-mvp.schema.json`) + W384 v22 + W431 v22 + W356 v19 + W380 v21 — **CONSOLIDATES all prior drift into single canonical v23**.
**Cite-anchors** (≥3-org-distinct per W352-S9): Anthropic claude-cookbooks @39a350b6 patterns/agents + assafelovic/gpt-researcher multi-angle-research + lastmile-ai/mcp-agent ParallelLLM + Perplexity Sonar deep-research + Exa neural-search + Firecrawl structured-crawl + Cognition deepwiki + OpenSSF Scorecard + SLSA Framework v1.0 + Sigstore + NIST SP 800-218 PW.7 + ISO/IEC 25010:2011 §4.2.6-7 + OWASP A06:2021.

---

## §1 — North-star + problem statement

### North-star
> **Every SOTA verdict (install / pattern-study / cite-ref / reject) is grounded in ≥3 independent research-angle convergence + ≥12 scoring dimensions + cryptographically-verifiable provenance + adversarial codex GPT-5.5 review.** No lone-source decisions. No vibe-based picks.

### Problem statement (from audit findings)
1. **Versioned drift**: sca-v18, v20, v21 schemas all live; W384 v22, W431 v22, W356 v19, W380 v21 docs all cite different versions. Source-of-truth contaminated.
2. **Single-angle bias**: live research mostly via GitHub GraphQL + a few HTTP fetches. Perplexity/Exa/Firecrawl/Tavily/Jina/deepwiki/repomix MCPs available but underused.
3. **Scoring dim cardinality drift**: sca-v22 has 22 dims, live-use docs cite 4-8. Full rubric not consistently applied.
4. **No convergence cache**: each session re-derives scores; no persistent learning.
5. **Cognee / hindsight install path** outside cardinal-rule-1 trusted-plugin pathway — NSSM service vs official `/plugin install`.

### v23 closes all 5 gaps.

---

## §2 — Multi-Angle Research Convergence Engine

### 2.1 — Seven canonical research angles (≥3 required per verdict; ≥5 recommended)

| Angle | Source | Purpose | Decision weight |
|---|---|---|---|
| **A1: Web-grounded reasoning** | Perplexity Sonar (`sonar-deep-research` / `sonar-reasoning`) MCP | Frontier-knowledge synthesis; community discussion; recency-filtered | 0.18 |
| **A2: Neural semantic search** | Exa MCP | Concept-similarity not keyword-match; finds non-obvious neighbors | 0.15 |
| **A3: Structured web crawl** | Firecrawl MCP | Markdown-rendered upstream docs; bypass JS-rendered sites | 0.12 |
| **A4: Curated-citation search** | Tavily MCP | News + academic + technical curated sources | 0.10 |
| **A5: Repo-deep-knowledge** | Cognition deepwiki MCP | AI-generated wiki + Q&A over any GitHub repo | 0.15 |
| **A6: Code-content ingest** | repomix MCP | Bulk pack codebase → grep / read for pattern-extract | 0.15 |
| **A7: Authoritative-registry** | GitHub GraphQL + npm/PyPI registries (live) | License + signed-attestation + maintainer + deps-clean | 0.15 |

**Convergence rule**: a verdict requires ≥3 angles to AGREE (within ±10% normalized score) OR explicit minority-opinion documentation per angle that diverges.

### 2.2 — Twelve scoring dimensions (sca-v23 rubric, replaces v18-v22)

| # | Dimension | Range | Weight |
|---|---|---|---|
| D1 | Stars / forks (popularity prior) | 0.0 — 1.0 (log-scaled) | 0.05 |
| D2 | License OSI-approved + commercial-safe | binary; 1.0 / 0.0 | 0.08 |
| D3 | Signed releases / SLSA-L3 attestation | 0.0 / 0.5 / 1.0 | 0.10 |
| D4 | Maintainer identity / org reputation | 0.0 / 0.5 / 1.0 | 0.06 |
| D5 | Dependency cleanliness (Socket.dev / npm audit / pip-audit) | 0.0 — 1.0 | 0.08 |
| D6 | Last-commit recency (≤30d / 30-90d / 90-180d / >180d) | 1.0 / 0.7 / 0.4 / 0.1 | 0.06 |
| D7 | Contributors-count (sole / 2-5 / 6-20 / 20+) | 0.2 / 0.5 / 0.8 / 1.0 | 0.04 |
| D8 | Downloads (npm/PyPI 30-day) | log-scaled 0.0 — 1.0 | 0.05 |
| D9 | OpenSSF Scorecard composite score | 0.0 — 10 (normalized to 0.0 — 1.0) | 0.08 |
| D10 | Claude Code pathway support (`/plugin install` ready) | 0.0 / 0.5 / 1.0 | 0.10 |
| D11 | MCP-readiness (first-party MCP server published) | 0.0 / 0.5 / 1.0 | 0.10 |
| D12 | Composite arch-quality (CAQ; multi-angle convergence score) | 0.0 — 1.0 | 0.20 |

**Composite verdict score (CVS)** = Σ(D<n> × weight<n>), range 0.0 — 1.0.

### 2.3 — Decision-tier thresholds

| CVS range | Verdict | Action |
|---|---|---|
| ≥ 0.85 | **INSTALL-HIGH** | `/plugin install` OR `.mcp.json` add immediately; codex r3 APPROVE required pre-merge |
| 0.70 — 0.84 | **INSTALL-STANDARD** | Same as above; codex r1 APPROVE sufficient |
| 0.55 — 0.69 | **PATTERN-STUDY** | Don't install; extract patterns into local skill or doc; cite-anchor in CLAUDE.md |
| 0.40 — 0.54 | **CITE-REFERENCE-ONLY** | Don't install or pattern-study; cite as authoritative reference in docs |
| < 0.40 | **REJECT** | Don't install, don't cite-as-authority; may cite as anti-pattern with rationale |
| ANY + R1(a) FAIL | **HALT-REJECT** | Trust-tuple violation overrides CVS — no consideration regardless of score |

### 2.4 — Codex GPT-5.5 adversarial review (binding for INSTALL-HIGH)

Per W331 P0.7 frontier-peer-policy: every INSTALL-HIGH verdict requires codex GPT-5.5 r3 APPROVE before merge. Per W439 spec, codex invocation MUST include `Z:/repos/deps/<target-repo>` source-read access (C4 constraint per W438 spec §1):

```bash
codex exec --max-tokens 32000 --model gpt-5.5 \
  --include-paths "Z:/repos/deps/<target-repo>,Z:/repos/deps/<comparator-1>,Z:/repos/deps/<comparator-2>" \
  --input "$(cat tmp/codex-prompts/v23-install-<target>.md)"
```

Fail-CLOSED contract per `dual-review` skill: codex unavailable → returns BLOCK rather than silent pass.

### 2.5 — Convergence cache (Langfuse traces)

Every verdict run emits Langfuse trace with:
- 7 angle inputs (raw query + raw response per angle)
- 12 dimension scores (numeric + rationale)
- CVS composite
- Codex GPT-5.5 verdict log
- Wave + branch + session-id provenance

Future sessions can replay traces to avoid re-deriving stable verdicts. Cache TTL: 30 days (frontier-velocity).

---

## §3 — Implementation artifacts

### 3.1 — Schema file

`.claude/schemas/sca-v23-multi-angle-convergence.schema.json` (JSON-Schema draft-2020-12; mirrors §2.1-2.4 above; machine-readable).

### 3.2 — Engine tooling (next-wave deliverables)

- `tools/research-arch-v23/convergence-engine.mjs` — orchestrator that dispatches 7 angles in parallel + scores 12 dims + computes CVS
- `tools/research-arch-v23/codex-adversary.mjs` — wraps `codex exec` with C4 source-access + verdict-extract
- `tools/research-arch-v23/langfuse-trace.mjs` — emits convergence traces to Langfuse at :3000

### 3.3 — Skill integration

- Update `sota-convergence-audit` skill description to invoke v23 (was sca-v18)
- Update `sca-meta-audit` skill description to audit v23 rubric (was sca-v13)
- Add new local skill: `research-arch-v23-convergence` (auto-fires when operator asks "audit repo X" / "should we install Y" / "is repo Z SOTA")

### 3.4 — Migration of existing scores

Existing W259 grand catalog + W434 awesome-lists audit + W433-INST verdicts re-scored via v23 in W440 (next wave). Until re-scored, existing verdicts marked `[sca-v18..v22 legacy; re-score W440]`.

---

## §4 — Cognee + hindsight re-evaluation via v23

Per operator audit ask. Re-scoring summary:

| Repo | Current install path | v23 CVS (preliminary) | Verdict |
|---|---|---|---|
| **topoteretes/cognee** | NSSM service (CogneeMCP :8000) | D10=0.5 (custom-stdio MCP, not `/plugin install`) + D11=1.0 (MCP server published) + D12 needs convergence run | **PATTERN-STUDY → migrate-to-official-CC-pathway in W441-L6-memory wave** |
| **jonschlinkert/hindsight** | RETIRED (W316-S6, daemon down) | D6=0.1 (>180d no recent active dev) + D10=0.0 (no CC pathway) → CVS ~0.25 | **REJECT (already retired); keep retired** |

Full convergence run for both deferred to W441-L6-memory wave (which will use this v23 engine).

---

## §5 — Acceptance criteria

- [ ] `.claude/schemas/sca-v23-multi-angle-convergence.schema.json` committed
- [ ] This DESIGN.md committed
- [ ] CLAUDE.md updated to point to v23 (replaces v18-v22 references)
- [ ] `sota-convergence-audit` skill description updated
- [ ] Codex GPT-5.5 r1 APPROVE on this DESIGN.md (with full Z:/repos/deps source access)
- [ ] First end-to-end convergence run validates engine (W440 candidate)

---

## §6 — Open questions for next-wave operator decision

1. **Engine implementation language**: Node.js (.mjs) for MCP-client portability vs Python for richer scientific tooling? Recommend Node.js for MCP-client SDK parity.
2. **Langfuse trace volume**: at ~50 verdicts/wave × 7 angles = 350 traces/wave. Acceptable within self-hosted Langfuse capacity?
3. **Codex token budget**: 32k per verdict × 50 verdicts = 1.6M tokens/wave. Acceptable?
4. **Convergence-cache invalidation**: 30-day TTL aggressive enough for frontier? Or 7-day?
5. **Backfill scope**: re-score all 99-repo W259 catalog in W440, or only the 21 currently-installed?
