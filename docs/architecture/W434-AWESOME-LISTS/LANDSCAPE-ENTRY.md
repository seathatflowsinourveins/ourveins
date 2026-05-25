# W434-AWESOME-LISTS — Landscape entry (one-line summary for SOTA-RUNTIME landscape)

> **Mapping**: docs/architecture/SOTA-RUNTIME-2026-05-22/LANDSCAPE.md — per-tier candidate rows

---

## TIER-A (no NEW install candidates)

| Tier | Candidate | Cross-list mentions | Verdict |
|---|---|---|---|
| TIER-A | `pydantic/pydantic-ai` | 3 | **PATTERN-CITED** (already-skill `ai:building-pydantic-ai-agents`; PyPI PEP-740 attestation YES, R1-CLEAN, but duplicate-coverage) |
| TIER-A | `microsoft/playwright-mcp` | 2 | **ALREADY-INSTALLED** @0.0.75 since W124 (2026-05-09); npm provenance+sig YES |

## TIER-B (REJECT — R1 FAIL or scope mismatch)

| Tier | Candidate | Mentions | R1 FAIL gate | Verdict |
|---|---|---|---|---|
| TIER-B | `geekan/MetaGPT` | 3 | R1(a) PyPI provenance NO + W434-L5 L5-rejected | **PATTERN-ONLY** |
| TIER-B | `microsoft/autogen` (autogen-agentchat) | 3 | maintenance-mode per upstream banner | **PATTERN-CITED + W434-L5 HARD-REJECT** |
| TIER-B | `Significant-Gravitas/Auto-GPT` | 3 | R1(b) NOASSERTION + PolyForm carve-out | **HARD-REJECT** |
| TIER-B | `agiresearch/OpenAGI` | 3 | R1(c) stale 18mo | **REJECT** |
| TIER-B | `xlang-ai/OpenAgents` | 3 | R1(c) stale 18mo | **REJECT** |
| TIER-B | `microsoft/markitdown` | 2 | R1(a) provenance NO + docling-MCP duplicate-coverage | **REJECT** |
| TIER-B | `microsoft/semantic-kernel` | 2 | R1(a) provenance NO + W434-L5 scope | **REJECT** |
| TIER-B | `browserbase/mcp-server-browserbase` | 2 | duplicate-coverage (playwright-mcp) | **REJECT** |

## TIER-C (OUT-OF-SCOPE — not Claude Code surface)

| Tier | Candidate | Mentions | Scope verdict |
|---|---|---|---|
| TIER-C | `continuedev/continue` | 2 | VS Code extension, not CC plugin |
| TIER-C | `cloudflare/mcp-server-cloudflare` | 2 | OPTIONAL-DEFER (no operator workflow gap) |
| TIER-C | `huggingface/transformers` | 2 | Training library, not CC surface |
| TIER-C | `sgl-project/sglang` | 2 | L1 inference engine, not CC surface |
| TIER-C | `sindresorhus/awesome` | 3 | meta-list (not install candidate) |

## 31 cross-listed MCPs (punkpeye ∩ wong2 2-mention overlap)

All 31 are **niche-domain** (DB-drivers, cloud-ops, vertical-specific) OR **duplicate-coverage** vs. the 18 already-installed MCPs. None recommended for install in current workflow.

## Net summary

`W434-AWESOME-LISTS landscape: 0 new R1-CLEAN install candidates across 3,765 unique repos × 12 SOTA awesome-lists × cross-listing convergence at ≥2 OR ≥3 mention threshold. Convergence-optimal coverage CONFIRMED.`

---

## Cite anchors (≥3 distinct orgs per sca-v13 floor)

1. **GitHub** — `https://docs.github.com/en/rest/repos/repos` (per-repo metadata probe via `gh api`)
2. **Python Packaging Authority (PyPA)** — `https://peps.python.org/pep-0740/` (PEP-740 attestation format) + `https://docs.pypi.org/attestations/` (PyPI integrity probe)
3. **npm Inc.** — `https://docs.npmjs.com/generating-provenance-statements` (npm provenance + dist.signatures format)
4. **Anthropic** — `https://docs.anthropic.com/en/docs/claude-code/plugins` (R1 trust-tuple per W331 axis-1 #3 corollary)
5. **OpenSSF** — `https://scorecard.dev/` (per-repo security scorecard) + `https://slsa.dev/spec/v1.0/` (SLSA-L3 attestation spec)
6. **NIST** — `https://csrc.nist.gov/publications/detail/sp/800-218/final` (SP 800-218 PW.7 Code Review + R6 verify-before-claim)
7. **hesreallyhim** — `https://github.com/hesreallyhim/awesome-claude-code/blob/main/THE_RESOURCES_TABLE.csv` (Claude Code resource catalog)
8. **sindresorhus** — `https://github.com/sindresorhus/awesome` (meta-awesome curation, CC0-1.0)

References to sibling W434 sub-wave verdicts: docs/architecture/W434-L3-COVERAGE/ + docs/architecture/W434-L5-COVERAGE/.
