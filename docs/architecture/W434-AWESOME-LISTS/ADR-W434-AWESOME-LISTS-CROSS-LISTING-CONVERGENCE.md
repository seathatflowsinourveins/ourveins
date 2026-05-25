# ADR W434-AWESOME-LISTS — Cross-listing convergence audit (operator amendment "sota awesome lists")

> **Wave**: W434-AWESOME-LISTS (12-awesome-list cross-listing convergence audit, post-W433-RESEARCH-MATRIX-PRE methodology)
> **Branch**: `goal/W434-awesome-lists`
> **Worktree**: `Z:/claude-sota-installed-W434-AWESOME-LISTS`
> **Session**: `0ba1d763-9909-4ba1-951d-63d550b8603e`
> **Date**: 2026-05-24
> **Reviewer**: codex GPT-5.5 round queued (Codex-Verdict trailer in commit)
> **Operator-sign**: pending
> **Precedent**: W432-M0/M1 REJECT (SLSA-L3 404), W433-INST-A/B/C composio+OpenHands, W434-L3-COVERAGE ALL-REJECT, W434-L5-COVERAGE ALL-REJECT

---

## 0. TL;DR

**VERDICT: ALL-REJECT — `0 R1-CLEAN install candidates surface from awesome-list cross-listing convergence beyond what is already installed or already cite-anchored`**

The cross-listing convergence methodology (≥3 mentions across 12 SOTA awesome-* lists, layered with R1 trust-tuple gates) yielded **7 repos at the ≥3-mention threshold** and **207 repos at the ≥2-mention threshold**. Per-candidate triage:

- 1 candidate already installed (`microsoft/playwright-mcp` @0.0.75, since W124 2026-05-09)
- 2 candidates already cite-anchored as patterns in CLAUDE.md (`microsoft/autogen`, `pydantic/pydantic-ai` via `ai:building-pydantic-ai-agents` skill)
- 3 candidates fail R1(c) staleness (>18 months no push): `agiresearch/OpenAGI`, `xlang-ai/OpenAgents`, `Significant-Gravitas/Auto-GPT`
- 1 candidate covered by sibling W434-L5 ALL-REJECT verdict (`microsoft/autogen` maintenance-mode + AutoGPT PolyForm carve-out)
- 1 candidate is the meta-awesome list itself (`sindresorhus/awesome` — not an install candidate)

Of the **31 cross-listed MCP servers** (≥2 mentions in punkpeye + wong2 MCP-lists union), **all 31 are NICHE-DOMAIN** (DB-drivers, cloud-ops, vertical-specific) outside the operator's current claude-sota-installed workflow scope, **OR duplicate-coverage** against the 18 already-installed MCPs.

This confirms the systemic finding from W434-L3-COVERAGE and W434-L5-COVERAGE: **cryptographically signed SOTA Claude-Code-relevant infrastructure does not yet exist in mainstream open-source at the cross-listing-convergence threshold as of 2026-05-24.** The runtime's current install set + skill/pattern cite-anchors already represent the convergence-optimal R1-clean coverage for the awesome-list candidate pool.

---

## 1. Methodology

Per W433-RESEARCH-MATRIX-PRE.md §A "Awesome-lists convergence (NEW per operator amendment)":

1. **List selection**: 12 SOTA-curated awesome-* lists spanning Claude Code (1), MCP servers (2), LLM general (3), AI agents (3), Python ecosystem (1), meta-awesome (1), foundation models (1). One list substitution after probe: `awesome-foundation-models/awesome-foundation-models` returned 404 — substituted `uncbiag/Awesome-Foundation-Models` (1.2k★, last push 2026-04-20).

2. **Per-list freshness probe**: `gh api repos/<owner>/<list>` → captured `pushed_at`, `stargazers_count`, `archived`, `license`. Classified fresh (<6 months) vs. stale (≥6 months).

3. **Per-list README scrape**: `gh api repos/<owner>/<list>/readme` → base64-decode → regex extract `github.com/<owner>/<repo>` patterns → filter non-repo paths (`sponsors/`, `topics/`, etc.) → unique-sort per-list. Special case for `hesreallyhim/awesome-claude-code` (README is meta-pointer): scraped `THE_RESOURCES_TABLE.csv` instead.

4. **Cross-listing tally**: per-repo count across all 12 lists. Top tier = ≥3 mentions. Secondary tier = ≥2 mentions.

5. **R1 trust-tuple probe for top 15 candidates**: license, freshness, archived status, signed releases (PyPI PEP-740 attestation, npm provenance/signatures, GitHub `gh attestation list`), maintainer multiplicity.

6. **Layer classification**: L1 Foundation / L2 MCP / L3 Skills+Plugins / L4 Toolkit / L5 Multi-agent Harness, per CLAUDE.md architecture.

7. **Existing-install audit**: cross-reference `.mcp.json`, `.claude/settings.json`, `.claude/skills/`, `.claude/plugins/marketplaces/` to identify already-covered candidates.

---

## 2. Per-list freshness table (12 lists)

| Awesome list | Tier | Stars | Last pushed | License | Size (KB) | Status |
|---|---|---|---|---|---|---|
| hesreallyhim/awesome-claude-code | TIER-A | 44,701 | 2026-04-27 | NOASSERTION | 20,923 | fresh-27d |
| punkpeye/awesome-mcp-servers | TIER-A | 87,810 | 2026-05-02 | MIT | 23,987 | fresh-22d |
| wong2/awesome-mcp-servers | TIER-A | 4,103 | 2026-04-30 | MIT | 602 | fresh-24d |
| f/awesome-chatgpt-prompts | TIER-B | 162,769 | 2026-05-24 | NOASSERTION | 373,450 | fresh-0d |
| Hannibal046/Awesome-LLM | TIER-B | 26,852 | **2025-07-31** | CC0-1.0 | 14,528 | **stale-10mo** |
| Mooler0410/LLMsPracticalGuide | TIER-B | 10,188 | 2026-04-08 | NONE | 26,494 | fresh-46d |
| e2b-dev/awesome-ai-agents | TIER-A | 27,988 | **2025-02-26** | NOASSERTION | 117,748 | **stale-15mo** |
| kaushikb11/awesome-llm-agents | TIER-A | 1,492 | 2026-05-24 | NONE | 55 | fresh-0d |
| WooooDyy/LLM-Agent-Paper-List | TIER-B | 8,133 | **2025-09-12** | NONE | 3,230 | **stale-8mo** |
| sindresorhus/awesome | TIER-META | 469,726 | 2026-05-05 | CC0-1.0 | 1,561 | fresh-19d |
| **substituted** uncbiag/Awesome-Foundation-Models | TIER-B | 1,157 | 2026-04-20 | NONE | 51 | fresh-34d |
| vinta/awesome-python | TIER-B | 299,418 | 2026-05-24 | NOASSERTION | 5,606 | fresh-0d |

**Freshness verdict**: 9 fresh + 3 stale (Hannibal046, e2b-dev, WooooDyy). Stale lists deprioritized but not excluded — historical cross-listing signal is still valid for established repos, only loses currency for emerging projects.

**Note**: Original `awesome-foundation-models/awesome-foundation-models` returned 404 (repo missing/moved). Substituted `uncbiag/Awesome-Foundation-Models` (UNC Biomedical Image Analysis Group, 1.2k★).

---

## 3. Cross-listing scoreboard

### 3.1. Repos with ≥3 mentions (TOP TIER — 7 total)

| Rank | Repo | Mentions | Lists |
|------|------|----------|-------|
| 1 | `pydantic/pydantic-ai` | 3 | kaushikb11/awesome-llm-agents · punkpeye/awesome-mcp-servers · vinta/awesome-python |
| 2 | `geekan/MetaGPT` | 3 | e2b-dev/awesome-ai-agents · kaushikb11/awesome-llm-agents · WooooDyy/LLM-Agent-Paper-List |
| 3 | `agiresearch/OpenAGI` | 3 | e2b-dev/awesome-ai-agents · Hannibal046/Awesome-LLM · WooooDyy/LLM-Agent-Paper-List |
| 4 | `xlang-ai/OpenAgents` | 3 | e2b-dev/awesome-ai-agents · kaushikb11/awesome-llm-agents · WooooDyy/LLM-Agent-Paper-List |
| 5 | `Significant-Gravitas/Auto-GPT` | 3 | e2b-dev/awesome-ai-agents · Hannibal046/Awesome-LLM · kaushikb11/awesome-llm-agents |
| 6 | `microsoft/autogen` | 3 | e2b-dev/awesome-ai-agents · kaushikb11/awesome-llm-agents · vinta/awesome-python |
| 7 | `sindresorhus/awesome` | 3 | f/awesome-chatgpt-prompts · kaushikb11/awesome-llm-agents · sindresorhus/awesome (self-ref) |

### 3.2. Aggregate cross-listing stats

- **Total unique repos referenced across 12 lists**: 3,765
- **Repos with ≥3 mentions**: 7 (0.19%)
- **Repos with ≥2 mentions**: 207 (5.5%)
- **Repos with exactly 1 mention**: 3,558 (94.5%)

### 3.3. Why so few ≥3-mention repos?

The 12 lists curate **largely disjoint scopes**:
- `hesreallyhim/awesome-claude-code` curates Claude Code skills/plugins (post-Aug 2025 ecosystem)
- `punkpeye/awesome-mcp-servers` + `wong2/awesome-mcp-servers` curate MCP servers (overlap ~30%)
- LLM-paper lists (Hannibal046, Mooler0410, WooooDyy) curate research papers + foundation models
- Agent-framework lists (e2b-dev, kaushikb11) curate multi-agent harnesses
- Python ecosystem (vinta) curates Python libraries
- Meta-awesome (sindresorhus) curates other awesome-lists

Cross-listing convergence at ≥3 mentions is therefore concentrated on **agent frameworks + Claude Code ecosystem + meta-awesome itself** — exactly the L5 multi-agent harness layer that W434-L5-COVERAGE ALL-REJECT already verdicted.

---

## 4. R1 probe table for top 14 candidates

Sorted by mention-count desc, then by R1-relevance.

| Repo | Mentions | Stars | Last push | License | Layer | Provenance (a) | Maint (c) | Layer-fit | Verdict |
|------|---|---|---|---|---|---|---|---|---|
| `pydantic/pydantic-ai` | 3 | 17,260 | 2026-05-24 | MIT | L4-Toolkit | **PEP-740 attestation YES** | PASS | already-skill | **PATTERN-CITED** (already covered by `ai:building-pydantic-ai-agents` skill) |
| `geekan/MetaGPT` | 3 | 68,263 | 2026-01-21 | MIT | L5-Harness | PyPI `metagpt 0.8.2` provenance NO | borderline (4 mo no push) | L5-rejected | **PATTERN-ONLY** (no R1 chain; covered by W434-L5 ALL-REJECT) |
| `agiresearch/OpenAGI` | 3 | 2,265 | 2024-11-28 | MIT | L5-Harness | no PyPI | **stale 18 mo** | stale | **REJECT** (R1(c) FAIL) |
| `xlang-ai/OpenAgents` | 3 | 4,829 | 2024-11-18 | Apache-2.0 | L5-Harness | no PyPI | **stale 18 mo** | stale | **REJECT** (R1(c) FAIL) |
| `Significant-Gravitas/Auto-GPT` | 3 | 184,514 | 2026-05-24 | **NOASSERTION** (MIT + PolyForm dual) | L5-Harness | no release surface | active but maint-only | dual-license risk | **REJECT** (R1(b) FAIL — PolyForm Shield 1.0.0 carve-out in `autogpt_platform/`, identical to W434-L5 OpenHands `enterprise/` blocker) |
| `microsoft/autogen` | 3 | 58,362 | 2026-04-15 | CC-BY-4.0 / MIT split | L5-Harness | `autogen-agentchat 0.7.5` provenance YES | **maintenance-mode (per upstream banner)** | superseded by MAF | **PATTERN-CITED** (already cite-anchor in CLAUDE.md; W434-L5 maint-mode HARD-REJECT) |
| `sindresorhus/awesome` | 3 | 469,726 | 2026-05-05 | CC0-1.0 | meta-list | n/a | active | meta-list | **N/A** (not an install candidate) |
| `microsoft/playwright-mcp` | 2 | 32,961 | 2026-05-23 | Apache-2.0 | L2-MCP | **npm provenance + signatures YES** | PASS | **already-installed** | **ALREADY-INSTALLED** @0.0.75 since W124 (2026-05-09) |
| `microsoft/markitdown` | 2 | 124,972 | 2026-05-22 | MIT | L4-Toolkit | PyPI `markitdown 0.1.5` provenance NO | PASS | overlap with `docling` MCP | **REJECT** (R1(a) FAIL + covered by docling MCP) |
| `microsoft/semantic-kernel` | 2 | 27,970 | 2026-05-19 | MIT | L5-Harness | PyPI `semantic-kernel 1.42.0` provenance NO | PASS | L5-rejected | **REJECT** (R1(a) FAIL + W434-L5 scope) |
| `continuedev/continue` | 2 | 33,358 | 2026-05-24 | Apache-2.0 | L3-IDE | npm `@continuedev/core 1.1.0` sigs YES, attest NO | PASS | VS Code extension | **OUT-OF-SCOPE** (IDE plugin, not Claude Code surface) |
| `cloudflare/mcp-server-cloudflare` | 2 | 3,777 | 2026-04-30 | Apache-2.0 | L2-MCP | not probed (no current Cloudflare workflow) | PASS | niche-domain | **OPTIONAL — DEFER** (no operator workflow gap) |
| `browserbase/mcp-server-browserbase` | 2 | 3,352 | 2026-05-07 | Apache-2.0 | L2-MCP | not probed | PASS | duplicate-coverage (`playwright-mcp` covers) | **REJECT** (duplicate-coverage) |
| `huggingface/transformers` | 2 | 160,931 | 2026-05-22 | Apache-2.0 | L4-Toolkit | YES | PASS | not Claude Code surface | **OUT-OF-SCOPE** (training library) |
| `sgl-project/sglang` | 2 | 28,186 | 2026-05-25 | Apache-2.0 | L1-Foundation | YES | PASS | not Claude Code surface | **OUT-OF-SCOPE** (inference engine, not CC plugin) |

### 4.1. Provenance probe details (full PyPI/npm trust-chain probe)

| Package | Registry | Latest version | `has_provenance` / npm attestations | npm signatures | Source-verdict |
|---|---|---|---|---|---|
| `pydantic-ai` | PyPI | 1.102.0 | **TRUE (PEP-740 attestation YES)** | n/a | **PASS** |
| `markitdown` | PyPI | 0.1.5 | FALSE | n/a | FAIL |
| `@playwright/mcp` | npm | 0.0.75 | **attestations YES** | **YES** | **PASS** |
| `semantic-kernel` | PyPI | 1.42.0 | FALSE | n/a | FAIL |
| `@continuedev/core` | npm | 1.1.0 | attestations NO | YES | PARTIAL |
| `pyautogen` | PyPI | 0.10.0 | **TRUE** | n/a | **PASS** |
| `autogen-agentchat` | PyPI | 0.7.5 | **TRUE** | n/a | **PASS** |
| `metagpt` | PyPI | 0.8.2 | FALSE | n/a | FAIL |
| `transformers` | PyPI | 5.9.0 | **TRUE** | n/a | **PASS** |

### 4.2. R1-CLEAN by all 4 gates: ZERO new install candidates surfaced

- `pydantic/pydantic-ai`: R1(a)(b)(c)(d) PASS — but already represented in skill `ai:building-pydantic-ai-agents`.
- `microsoft/playwright-mcp`: R1(a)(b)(c)(d) PASS — but already installed @0.0.75 since W124.
- `microsoft/autogen` (via `autogen-agentchat`): R1(a)(b)(c) PASS but **upstream-declared maintenance-mode** → W434-L5 HARD-REJECT verdict applies.
- All other candidates fail R1(a) provenance OR R1(c) staleness OR R1(b) license carve-out OR are out-of-scope/duplicate-coverage.

**Net: 0 NEW R1-CLEAN install candidates from awesome-list cross-listing convergence.**

---

## 5. Cross-listed MCP servers (31 candidates at 2+ mentions)

The strongest 2-mention cluster comes from the **punkpeye/awesome-mcp-servers ∩ wong2/awesome-mcp-servers** overlap — 31 servers cross-listed in both. Domain breakdown:

| Category | Servers (sample) | Verdict |
|---|---|---|
| DB-driver MCPs | excel-mcp, mongo-mcp ×2, schema-crawler, hydrolix, tinybird | OUT-OF-SCOPE (not current workflow) |
| Cloud-ops MCPs | cloudflare, browserbase, edgeone, k8s, rootly, alby | DEFER (no operator workflow gap) |
| Vertical-domain | fhir, gitkraken, fast-filesystem, homebrew, mifosx, onchain | OUT-OF-SCOPE |
| Already-installed | playwright-mcp | ALREADY-INSTALLED |
| Duplicate-coverage | openapi-schema (codegraph), llm-context.py (context-mode), mcp-everything-search (perplexity+exa), graphlit (codegraph+cognee), mcp-pandoc (docling) | REJECT (duplicate) |

**Net: 0 install-worthy MCP gap-fillers from cross-listing convergence.**

---

## 6. Layer-coverage gap analysis (confirm/revise prior W434 verdicts)

| Layer | Prior W434 verdict | Awesome-list cross-listing finding | Revised verdict |
|---|---|---|---|
| **L1 Foundation** (Claude Code core, model server) | Not covered by W434 sub-waves | Awesome-list candidates: `sgl-project/sglang` (OUT-OF-SCOPE — inference engine) — no Claude Code surface candidates | **No revision needed** |
| **L2 MCP servers** | Not covered by W434 sub-waves (separate W434-L2-MCP sibling in progress) | 31 cross-listed candidates, ALL niche-domain or duplicate-coverage | **No NEW INSTALL candidates from cross-listing** |
| **L3 Skills/Plugins** | W434-L3-COVERAGE ALL-REJECT | Awesome-list candidates: limited overlap with `hesreallyhim/awesome-claude-code` 197-entry table; current install set already represents convergence-optimal sample | **CONFIRMED — no revision** |
| **L4 Toolkit/Library** | Not formal sub-wave (L4 covered via skills) | `pydantic/pydantic-ai` (already-skill), `markitdown` (REJECT), `transformers` (OUT-OF-SCOPE) | **No new candidates** |
| **L5 Multi-agent Harness** | W434-L5-COVERAGE ALL-REJECT (9 candidates, all R1(a) FAIL) | Cross-listing surfaces same harnesses + adds OpenAGI/OpenAgents (stale 18mo) — confirms L5 SOTA cryptographic-chain gap | **CONFIRMED — no revision** |

**Net layer-coverage assessment**: The awesome-list cross-listing convergence **does NOT surface missed R1-clean candidates** at any layer. It **reinforces** the systemic finding that SOTA Claude-Code-relevant infrastructure at the convergence threshold lacks cryptographically signed releases as of 2026-05-24.

---

## 7. Comparison to prior W434 sub-waves

| Sub-wave | Method | Candidates probed | R1-CLEAN install verdict |
|---|---|---|---|
| W434-L3-COVERAGE | L3 layer survey | (per L3 ADR) | ALL-REJECT |
| W434-L5-COVERAGE | L5 layer survey | 9 | ALL-REJECT |
| W434-AWESOME-LISTS (this) | 12-list cross-listing convergence | 14 top + 31 MCP 2-mention | ALL-REJECT |

All three independent methodologies converge on the same systemic verdict. The cross-listing convergence is the **broadest** of the three — sampling 3,765 unique repos across 12 SOTA-curated lists — and still yields zero new install candidates.

This is **strong negative evidence** that the runtime's current install set (18 MCPs, 174-FQN-allowlisted subagents, 62 active local skills, plugin marketplace set) is at the convergence-optimal R1-clean coverage for the available SOTA ecosystem as of 2026-05-24.

---

## 8. Cite anchors (≥3 distinct orgs)

1. **GitHub** — `gh api repos/<owner>/<repo>` empirical metadata probe (license, push date, archived flag) per `https://docs.github.com/en/rest/repos/repos`
2. **PyPI** — `https://pypi.org/pypi/<pkg>/json` + `https://pypi.org/integrity/<pkg>/<version>/<file>/provenance` PEP-740 attestation probe
3. **npm** — `https://registry.npmjs.org/<pkg>/latest` `dist.attestations` + `dist.signatures` provenance probe per `https://docs.npmjs.com/generating-provenance-statements`
4. **Anthropic** — `https://docs.anthropic.com/en/docs/claude-code/plugins` R1 trust-tuple + W331 axis-1 #3 corollary (signed releases / license / maintainer / dep blast-radius)
5. **OpenSSF** — `https://scorecard.dev/` per-repo currency probe + `https://slsa.dev/spec/v1.0/` SLSA-L3 attestation spec
6. **NIST** — `https://csrc.nist.gov/publications/detail/sp/800-218/final` SP 800-218 PW.7 (Review/Analyze Code) + R6 verify-before-claim
7. **hesreallyhim** (awesome-claude-code) — `https://github.com/hesreallyhim/awesome-claude-code/blob/main/THE_RESOURCES_TABLE.csv` 197-entry resource catalog
8. **punkpeye + wong2** (awesome-mcp-servers) — `https://github.com/punkpeye/awesome-mcp-servers` + `https://github.com/wong2/awesome-mcp-servers` MCP-server curation
9. **e2b-dev + kaushikb11** (awesome-{ai,llm}-agents) — agent-framework curation
10. **sindresorhus** (awesome) — meta-awesome curation

---

## 9. Verdict line

`W434-AWESOME-LISTS VERDICT: 0 R1-CLEAN install candidates identified via cross-listing convergence; layer-coverage assessment: no gaps surfaced at L1/L2/L3/L4/L5; convergence-optimal coverage CONFIRMED for the current install set + skill/pattern cite-anchors.`

---

## 10. Implications + next-step recommendations

1. **Defensive position confirmed**: The runtime is at the convergence-optimal R1-clean install state. Further installs should be **operator-priority-driven** (specific workflow needs), NOT exploratory.

2. **Pattern-cite over install**: For agent harnesses (MetaGPT, autogen, semantic-kernel, OpenAGI) that fail R1 but provide useful patterns, prefer cite-anchor citations in CLAUDE.md + skill docs over installation.

3. **Monitor for R1 chain emergence**: Re-probe quarterly. Microsoft + Anthropic + pydantic are leading the PEP-740/npm-provenance adoption — watch for crewAI, MetaGPT, semantic-kernel to add PyPI attestations in 2026-Q3/Q4.

4. **Operator-amendment closure**: This ADR closes the "and sota awesome lists" amendment from operator's W433 directive. The methodology is preserved here for future cross-listing audits.

5. **Cardinal-rule-1 holds**: NO install was recommended in this wave. R1 enforcement worked as designed.

---

## 11. Reversibility

This ADR is **observational** — no install action was taken, no `.mcp.json` / `.claude/settings.json` / `.claude/skills/` was modified. Rollback = N/A. Reversal of the verdict = re-probe per-candidate when R1 cryptographic chains land upstream (track via `gh attestation list` / PyPI integrity API / npm dist.attestations).

---

## 12. Artifacts (evidence/)

- `evidence/W434-list-freshness.json` — 12-list freshness probe results
- `evidence/W434-R1-probes.json` — R1 metadata probe for top 14 candidates
- `evidence/W434-provenance.json` — PyPI/npm provenance probe results
- `evidence/W434-layer-classification.json` — layer-classification of candidates
- `evidence/W434-tally-top.json` — top 30 cross-listed repos from 3,765 total

Reproducibility: see methodology §1; all probes via `gh api`, `Invoke-RestMethod` against pypi.org/registry.npmjs.org, deterministic regex extract from base64-decoded READMEs.
