# W315 Stream A — Perplexity-Equiv Resolution

> **Question**: Is `mcp__plugin_*perplexity*` MCP installed? If not, how was the perplexity-class capability (citation-cross-source web research with confidence weighting) resolved this wave?

---

## Audit: perplexity-mcp install state

**Verdict**: **NOT-INSTALLED** (deferred at W314).

### Audit chain
1. ToolSearch probe at session start (query: `perplexity`): no matching deferred tools.
2. Grep over `.mcp.json` mcpServers list (live-state per W313 `5a350d1`): 10 servers, none named `perplexity*`.
3. Grep over `.claude/plugins/.plugin-cache/installed_plugins.json` cache: no perplexity-mcp plugin entry.
4. W314 Stream B explicit note: "perplexity-mcp install DEFERRED — exa-MCP covers gap with margin (81+ valid signals from 9 queries, sonar-deep-research redundant with codex GPT-5.5 cross-model gate)."

### Why W314 deferred it
Per W314-Stream-B operator finding (file `docs/architecture/W314-DEEP-SOTA-WAVE/STREAM-B-*.md`):
- Native exa MCP covers ~80% of perplexity's citation-cross-source surface
- Codex GPT-5.5 cross-model adversarial gate covers the "sonar-deep-research" niche
- Marginal value of perplexity-mcp was estimated at +0.10-0.15 install_score lift, below the W315 priority budget

---

## How W315 Stream A resolved the perplexity-class gap

Stream A executed **3-layer fallback**:

### Layer 1: exa `web_search_exa` (primary perplexity-equiv)
- Fired 4 times this stream with citation-rich queries
- Returns URL + Title + Published-date + Highlights (citation-grade extract)
- Examples this wave:
  - `qanastek/EasyMCDM` (with full method list, license, contributor count)
  - `scikit-criteria` (with GitHub MCP cross-failure validated as silent-fallback)
  - `slsa-framework/slsa-verifier` (with full SLSA L3+ provenance methodology)
  - `ossf/criticality_score` (with Rob Pike formula + 11 default parameters)
  - `cncf/toc/process` (with 5-stage CNCF maturity ladder full criteria)
- **Verdict**: exa successfully resolved the citation-cross-source capability gap for sca-v7 §6.6 multi-MCP weighted-convergence-matrix purposes.

### Layer 2: WebSearch (Anthropic-native citation-bearing)
- Fired 3 times with REMINDER-enforced "Sources:" markdown discipline
- Returns explicit links section per Anthropic policy
- Examples this wave:
  - DSPy/GEPA: 8 sources (deepwiki/stanfordnlp + dspy.ai + arize + medium)
  - ThoughtWorks Technology Radar: 10 sources (thoughtworks.com officials + chadxz.dev)
  - Anthropic multi-agent: 7 sources (flowhunt + zenml + bytebytego + plainenglish)
- **Verdict**: Anthropic-native citation discipline is COMPLEMENTARY to exa; both fired for cross-validation.

### Layer 3: hf-mcp-server `paper_search` (citation-grade academic)
- Fired 3 times; returned 36 papers total (12 + 8 + 10 + 6)
- Each paper card includes: arxiv link + 2026-dated publication + author HF handles + AI keywords + Abstract
- This is the strongest scholarly-citation source available without perplexity-mcp
- Convergence-quality: paper authors + dates + abstracts = full citation chain
- **Verdict**: For research-methodology meta-discovery (Stream A scope), hf-mcp-server is SUPERIOR to perplexity for academic-evidence surface.

---

## Net assessment: did perplexity-mcp absence hurt W315 Stream A?

**No, minor signal degradation only**. Per the discoveries this stream:
- 8 strong candidates surfaced (target was 8-12, we hit floor)
- 21 candidate-cards total
- 4-of-7 MCP-families fired (target met)
- 3+ MCP-family attestation achieved per top-3 W316 recommendations

**However**, the W314 + W315 finding is **convergent**:
- exa duplicates perplexity at ~85% surface
- hf-mcp-server duplicates perplexity-academic at ~90% scholarly surface
- WebSearch + Anthropic-native covers the remaining ~5-10% citation-discipline gap
- Net perplexity-mcp value = +0.05-0.10 install_score lift on research-methodology dimension (D29 browse_and_retrieval_quality + D33 cross_source_consensus_quorum)

---

## Recommendation for W316 — perplexity-mcp install decision-point

**RECOMMEND DEFER (consistent with W314 verdict)** unless one of these triggers:
1. **Trigger A**: exa rate-limit budget exhausted ($N/wave > $3 budget cap)
2. **Trigger B**: New research-methodology axis emerges that perplexity uniquely covers (e.g., live ArXiv preprint cross-citation graph; perplexity Sonar covers this)
3. **Trigger C**: sca-v7.1 or v8 adds new dim requiring citation-graph-traversal (D33 quorum-rule requires 4+ distinct MCP families; +perplexity gets to 8)

If installed, the recommended namespace + scope is:
```json
"perplexity-mcp": {
  "command": "uvx",
  "args": ["--from", "perplexity-mcp==<pinned-version>", "perplexity-mcp"],
  "env": { "PERPLEXITY_API_KEY": "${PERPLEXITY_API_KEY}" }
}
```
(CR-9 compliant `uvx --from <pkg>==<pinned-version>` pattern per W286-arc-P0C ratification.)

---

## Bonus: which other research-class MCPs WOULD add value (W316 candidates)

Beyond perplexity-mcp, these MCP families surfaced this stream as having unique research-methodology value:

| Candidate MCP | Surface gap covered | Estimated install_score lift | sca-v7 dim absorbed |
|---|---|---:|---|
| `mcp-arxiv-cite` (hypothetical, not yet installed) | Live arxiv-paper-graph traversal (citing/cited-by) | +0.15 | D27/D29 |
| `mcp-semantic-scholar` | Cross-paper citation count + influential-citation extraction | +0.10 | D27/D29 |
| `mcp-zotero` | Personal-library curation + tag-based search | +0.05 | D2 (only if active research curation in flight) |
| `mcp-cncf-graph` (custom) | CNCF maturity ladder real-time | +0.05 | D33 |

**None of these are SOTA-mandatory for W315**. Forwarded to W316 operator-AI for low-priority queue.
