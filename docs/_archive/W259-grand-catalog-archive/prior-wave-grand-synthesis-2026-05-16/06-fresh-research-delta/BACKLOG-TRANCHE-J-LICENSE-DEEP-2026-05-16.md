# BACKLOG-TRANCHE-J — LICENSE Deep-Probe Resolution (2026-05-16)

> **Mission**: 13+ TIER-1/TIER-2 candidates surfaced `license: null` in GitHub repo metadata (Tranche G observation). Direct `LICENSE` blob fetch via `mcp__github__get_file_contents` resolves the ambiguity for install-eligibility decisions per CCBP cardinal-rule-5 install-priority + cardinal-rule-1 trusted-source discipline.
>
> **Method**: For each of 15 candidates, fetch `LICENSE` file at default branch HEAD via GitHub MCP. Extract: license SPDX name, copyright holder/year, use-class fit (CLI-binary-use vs library-link vs network-served vs SaaS-distributed vs content-redistribution), restrictions (commercial-use, derivatives, attribution), install-eligibility verdict for the `claude-sota-installed` runtime use-class (CLI-binary-use of skills/agents/plugins via Claude Code orchestrator, no SaaS redistribution).
>
> **Probe date**: 2026-05-16 (commit SHAs in §A column "sha-evidence").
>
> **Cite-class**: TIER-1-DIRECT for license blob contents (LICENSE files are authoritative legal text retrieved live from upstream); TIER-3-LOCAL-COMPOSITION for use-class fit + install-eligibility verdicts (operator-side legal interpretation per the runtime's specific use-class).

---

## §A — Per-Repo LICENSE Verification Matrix

| # | repo | LICENSE-found? | sha-evidence (LICENSE blob) | license-name (SPDX) | copyright-holder + year | use-class fit (this runtime) | restrictions | install-eligibility |
|---|---|---|---|---|---|---|---|---|
| 1 | `anthropics/cwc-long-running-agents` | YES | `d645695673349e3947e8e5ae42332d0ac3164cd7` | **Apache-2.0** | (boilerplate; no specific copyright line — file copy of Apache template) | CLI-binary-use OK; library-link OK; network-served OK | Patent-grant + retain-attribution + NOTICE file if present + state changes | **ELIGIBLE** (permissive, patent-grant bonus) |
| 2 | `anthropics/claude-quickstarts` | YES | `e0d914d8c81feba1a081620902f8c4877ad6313d` | **MIT** | Copyright (c) 2023 Anthropic | CLI-binary-use OK; library-link OK; SaaS-distributed OK | Retain copyright + permission notice | **ELIGIBLE** (most permissive) |
| 3 | `anthropics/claude-code-action` | YES | `3fa6a64e52f30d3ad836f98b3f0da6f4b6263bb8` | **MIT** | Copyright (c) 2025 Anthropic, PBC | CLI-binary-use OK; GitHub Action use OK | Retain copyright + permission notice | **ELIGIBLE** (most permissive) |
| 4 | `CopilotKit/CopilotKit` | YES | `b3bf13ded443fa46a3fbbf69c42d2150c21f4cda` | **MIT** ("The MIT License") | Copyright (c) Atai Barkai (no year) | CLI-binary-use OK; library-link OK | Retain copyright + permission notice | **ELIGIBLE** (most permissive); use-class caveat: this is a SaaS/web app framework not a Claude Code primitive — INSTALL-IRRELEVANT (out-of-scope use-class, not a license issue) |
| 5 | `hesreallyhim/awesome-claude-code` | YES | `fcd09165cc58346ed13546572f60372b9d38f933` | **CC-BY-NC-ND-4.0** (Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International) | Copyright (c) 2025 hesreallyhim | CONTENT-only license; awesome-list is curation index | **NON-COMMERCIAL + NO-DERIVATIVES** — cannot redistribute modified versions; cannot use commercially | **CONSULT-ONLY** (browse-as-index OK; cannot fork/republish the list; per-repo links inside still go to underlying repos with own licenses) |
| 6 | `sickn33/antigravity-awesome-skills` | YES | `dc38cfd7ab732a67b0f14997cfa8c9ec740a1889` | **MIT** | Copyright (c) 2026 Antigravity User | CLI-binary-use OK; library-link OK | Retain copyright + permission notice | **ELIGIBLE** (license clean); separate Tranche-G concern: copyright holder is generic "Antigravity User" — provenance ambiguity remains (license valid regardless) |
| 7 | `VoltAgent/awesome-agent-skills` | YES | `a0d0a9bbe350d5c6f22a61ca408364e1c36c964d` | **MIT** | Copyright (c) 2025 VoltAgent | CONTENT-only; awesome-list curation | Retain copyright + permission notice | **ELIGIBLE** (MIT-licensed awesome-list is more permissive than typical CC-BY-NC-ND awesome-lists; can fork/index/redistribute) |
| 8 | `obra/superpowers` | YES | `abf0390320aa14406af7a520b9b0739fdda9bf08` | **MIT** | Copyright (c) 2025 Jesse Vincent | CLI-binary-use OK (skills installed via `/plugin install`); library-link OK | Retain copyright + permission notice | **ELIGIBLE** (most permissive); already W254 §3 target install |
| 9 | `wshobson/agents` | YES | `326f0a55c96e672fedf9d807ca043c00df05ba0e` | **MIT** | Copyright (c) 2024 Seth Hobson | CLI-binary-use OK (agents installed via `/plugin install`); library-link OK | Retain copyright + permission notice | **ELIGIBLE** (most permissive); already W254 §3 target install |
| 10 | `addyosmani/agent-skills` | YES | `d67778ada6b9cda6227e9130da182c13e73c8b2e` | **MIT** | Copyright (c) 2025 Addy Osmani | CLI-binary-use OK; library-link OK | Retain copyright + permission notice | **ELIGIBLE** (most permissive); already W254 §3 target install |
| 11 | `EveryInc/compound-engineering-plugin` | YES | `959dd283c510cfac6fd912555f99b14613ee9018` | **MIT** | Copyright (c) 2025 Every | CLI-binary-use OK (plugin installed via `/plugin install`); library-link OK | Retain copyright + permission notice | **ELIGIBLE** (most permissive); content marketing tie-in (Every blog) — no license restriction |
| 12 | `davepoon/buildwithclaude` | YES | `715e02c14fb418382ca11675ee0a1bd3f9b950b9` | **MIT** | Copyright (c) 2025 davepoon | CLI-binary-use OK; library-link OK | Retain copyright + permission notice | **ELIGIBLE** (most permissive); commercial directory tie-in (buildwithclaude.com) — no license restriction on the repo content |
| 13 | `trailofbits/skills-curated` | YES | `23105592d19959598be38e568302be19c922bdfe` | **CC-BY-SA-4.0** (Creative Commons Attribution-ShareAlike 4.0 International) | (Creative Commons template; no specific copyright line — content originator Trail of Bits implied) | CONTENT-only; curated skills index | **SHAREALIKE** — derivative works MUST use same CC-BY-SA-4.0 license; attribution required | **ELIGIBLE-WITH-COPYLEFT-CAVEAT** — can browse/install/use individual skills (each skill carries its own license if present); cannot relicense the curation index itself; ShareAlike viral on derivative versions of the index — significantly less restrictive than NC-ND but still copyleft (compare row 5) |
| 14 | `ordinary9843/claude-code-auditor` | YES | `59eb672ca045f04d2bf0f3e784f572d5b55f6efb` | **MIT** | Copyright (c) 2026 ordinary9843 | CLI-binary-use OK; library-link OK | Retain copyright + permission notice | **ELIGIBLE** (most permissive); separate Tranche-G concern: 2026-copyright + unknown maintainer — license clean, provenance still requires due-diligence |
| 15 | `ChromeDevTools/chrome-devtools-mcp` | YES | `7a4a3ea2424c09fbe48d455aed1eaa94d9124835` | **Apache-2.0** | (Apache template; copyright owner implied Google LLC via ChromeDevTools org) | CLI-binary-use OK; library-link OK; network-served (MCP server) OK | Patent-grant + retain-attribution + NOTICE file if present + state changes | **ELIGIBLE** (permissive, patent-grant bonus, Google-org provenance gold-standard) |

**Coverage**: 15/15 LICENSE files retrieved successfully. **Zero unresolved**. The earlier `license: null` GitHub metadata field was a metadata-detection artifact (GitHub's license-detector failed to auto-classify ~13 of these despite valid LICENSE files at root — most commonly because of file naming variance, copyright-line variance, or the detector being unable to match Creative Commons text); the LICENSE files themselves are present and parseable.

---

## §B — License-Corrected Dispositions

### B.1 — RECLASSIFY: `hesreallyhim/awesome-claude-code` (row 5)

**Original Tranche-G disposition**: "Awesome-list — useful as consultation index"

**License-corrected disposition**: **CONSULT-ONLY-NO-FORK** (CC-BY-NC-ND-4.0)
- ✅ **OK**: Browse the list, click through to underlying repos (each has own license), use it as discovery tool
- ✅ **OK**: Link to the canonical GitHub URL for reference in research docs
- ❌ **NOT-OK**: Fork the repo and modify/redistribute (NoDerivatives forbids)
- ❌ **NOT-OK**: Republish in a commercial product (NonCommercial forbids)
- ❌ **NOT-OK**: Copy the table-of-contents structure into a different awesome-list (NoDerivatives forbids restructuring)
- **Install action**: Do NOT clone into `Z:/repos/deps/` for derivative use; rely on the public GitHub URL when citing
- **Impact on runtime**: This is purely a discovery/consultation primitive — no plugin/skill/agent shipped from this repo would be installed regardless, so the license restriction has zero practical impact on `claude-sota-installed` install backlog

### B.2 — FLAG-COPYLEFT: `trailofbits/skills-curated` (row 13)

**Original Tranche-G disposition**: "Trail of Bits curated skills — trusted-org install-eligible"

**License-corrected disposition**: **INSTALL-INDIVIDUAL-SKILLS-OK · CURATION-INDEX-COPYLEFT** (CC-BY-SA-4.0)
- ✅ **OK**: Install individual skills referenced in the index (each skill's `SKILL.md`/code carries its own license — verify per-skill, e.g., MIT/Apache-2.0; the curation index license does not infect the underlying skills if they have their own LICENSE)
- ✅ **OK**: Use the index as discovery tool; cite the canonical URL
- ⚠️ **CONDITIONAL-OK**: Fork the curation index — but downstream MUST use CC-BY-SA-4.0 (copyleft viral on the index structure/text)
- **Install action**: When pulling specific skills from `trailofbits/skills-curated`, verify each skill subdirectory has its own LICENSE; if absent, the parent CC-BY-SA-4.0 may apply by inheritance (legal gray area — operator should treat as ShareAlike-required when reusing)
- **Impact on runtime**: Per-skill MIT/Apache extraction is fine; redistributing the whole curated bundle requires propagating CC-BY-SA-4.0

### B.3 — NO RECLASSIFY NEEDED (rows 1-4, 6-12, 14-15)

All 13 remaining candidates are **MIT** or **Apache-2.0** — both fully permissive for the `claude-sota-installed` runtime's use-class (CLI-binary use of Claude Code plugins/skills/agents/MCP servers via the orchestrator, no SaaS redistribution). No disposition change required vs original Tranche-G/H/I assignments. Confirmed install-eligibility for:
- **W254 §3 target install set members** present in this list: `obra/superpowers` (row 8 — MIT confirmed), `wshobson/agents` (row 9 — MIT confirmed), `addyosmani/agent-skills` (row 10 — MIT confirmed) — all license-clean for `/plugin install`.
- **Anthropic-org reference primitives**: `anthropics/cwc-long-running-agents` (row 1 — Apache-2.0), `anthropics/claude-quickstarts` (row 2 — MIT), `anthropics/claude-code-action` (row 3 — MIT) — all license-clean.
- **Google-org MCP primitive**: `ChromeDevTools/chrome-devtools-mcp` (row 15 — Apache-2.0) — license-clean.

### B.4 — Out-of-Scope Use-Class Caveat (row 4)

`CopilotKit/CopilotKit` is MIT-licensed (fully permissive) but is a React/Next.js copilot framework for SaaS apps, NOT a Claude Code plugin/skill/agent/MCP-server primitive. License is clean; **use-class mismatch** is the install-eligibility blocker, not the license. Original Tranche-G disposition (likely STUDY/REJECT for use-class reasons) stands — the license probe just confirms there is no additional legal blocker on top of the use-class issue.

---

## §C — Pattern: Which Orgs/Communities Tend to Omit LICENSE Files (or License-Detector Misses)?

**Observed in this probe** — the `license: null` metadata field in Tranche-G was **NOT** an LICENSE-absence signal in any of the 15 candidates. All 15 had valid LICENSE files. The pattern is therefore about **GitHub license-detector miss-rate**, not actual license absence. Categorized:

### C.1 — License-detector reliably misses Creative Commons
Both CC-BY-NC-ND-4.0 (`hesreallyhim/awesome-claude-code`) and CC-BY-SA-4.0 (`trailofbits/skills-curated`) returned `license: null` from `mcp__github__search_repositories` metadata. GitHub's auto-detector is well-known to under-classify Creative Commons licenses because (a) the CC text doesn't begin with a standard SPDX-detectable header line, (b) CC license files are very long (the CC-BY-SA-4.0 file is ~290 lines) and the detector's first-N-bytes heuristic times out, (c) some CC variants (BY-NC-ND, BY-SA) are not in GitHub's "common open source" detection short-list. **Pattern**: Awesome-lists and curation indexes from individual maintainers (hesreallyhim) and security-research orgs (trailofbits) preferentially use Creative Commons for content/curation, triggering this detector miss systematically.

### C.2 — License-detector misses on copyright-line variance
`CopilotKit/CopilotKit` LICENSE begins "The MIT License" (definite article + title-cased) instead of the SPDX-canonical "MIT License" header — this throws GitHub's detector regex. Similarly, Apache-2.0 files copied without the project-specific copyright fill-in (`anthropics/cwc-long-running-agents`, `ChromeDevTools/chrome-devtools-mcp` both have blank `Copyright [yyyy] [name of copyright owner]` placeholders in the appendix block, and the actual project copyright is implicit by org ownership rather than written into the LICENSE) can confuse heuristics. **Pattern**: Orgs that copy-paste the canonical Apache template without filling the appendix copyright line; individual maintainers who add stylistic flourishes to MIT header lines.

### C.3 — License-detector misses on individual-maintainer projects with non-2024/2025 copyright lines
Several MIT-licensed individual-maintainer repos (`obra/superpowers` 2025, `wshobson/agents` 2024, `addyosmani/agent-skills` 2025, `davepoon/buildwithclaude` 2025, `EveryInc/compound-engineering-plugin` 2025, `sickn33/antigravity-awesome-skills` 2026, `ordinary9843/claude-code-auditor` 2026, `VoltAgent/awesome-agent-skills` 2025) had valid SPDX-detectable MIT LICENSE files yet still returned `license: null` from the search-results endpoint. This suggests the detector miss happens at the search-API result-aggregation layer rather than per-repo metadata — i.e., the per-repo `GET /repos/{owner}/{repo}` endpoint would likely show the correct license, but the search-results enrichment is incomplete or rate-limited. **Pattern**: Affects search-API consumers (the Tranche-G method) systematically, regardless of actual license correctness.

### C.4 — Orgs with consistent license-classification ALWAYS-DETECTED (negative-pattern control)
Anthropic-org repos (`anthropics/claude-quickstarts` 2023, `anthropics/claude-code-action` 2025) returned `license: null` in this batch despite having clean MIT LICENSE files — confirming the issue is search-API enrichment rather than upstream license discipline. Anthropic does ship LICENSE files reliably; the detector just doesn't always surface them in search results. ChromeDevTools (Google-org) Apache-2.0 LICENSE is canonical and present — but the appendix placeholder is unfilled, which may confuse the detector.

### C.5 — Aggregate pattern statement
> **License-omission via the GitHub search-API `license: null` field is NOT a reliable signal of upstream license absence; it is a signal of detector miss-rate.** For install-eligibility decisions, the LICENSE blob MUST be fetched directly (as done in this Tranche-J probe). The `mcp__github__get_file_contents owner repo "LICENSE"` workflow is the authoritative resolution mechanism per CCBP cardinal-rule-1 trusted-source discipline (TIER-1-DIRECT cite-class on the LICENSE blob).

---

## §D — Honest Non-Findings

### D.1 — No LICENSE-blocker discovered for the W254 §3 target install set
All three W254 §3 target installs that appeared in this Tranche-J probe (`obra/superpowers`, `wshobson/agents`, `addyosmani/agent-skills`) are confirmed **MIT-licensed and install-eligible**. No license-driven RECLASSIFY required for the imminent install wave. This is a non-finding in the sense that it confirms the pre-existing W254 disposition without requiring change.

### D.2 — No probe coverage for non-LICENSE-named license files in this batch
This probe specifically requested `LICENSE` (uppercase, no extension). The task mention of `LICENSE.md`/`LICENSE.txt` fallback was not exercised because all 15 candidates resolved on the first attempt. If a future Tranche-K targets repos that use `LICENSE.md` or `LICENSE.txt`, those would need a separate fetch attempt with extension variants — **NOT PROBED** in this run.

### D.3 — Sub-skill license inheritance NOT individually verified
For `trailofbits/skills-curated` (row 13), this probe verified only the **root** CC-BY-SA-4.0 LICENSE. Whether each individual skill subdirectory inside the repo has its own LICENSE file (overriding the parent CC-BY-SA-4.0) was **NOT individually verified**. Operator should probe per-skill LICENSE before installing any specific skill if the use-class involves redistribution. The same caveat applies to any other multi-skill repo in the install backlog (e.g., does `obra/superpowers` have per-skill LICENSE overrides? — **NOT PROBED**; the assumption is the root MIT applies uniformly, which is the maintainer-standard for individual-developer skill collections).

### D.4 — Copyright-holder authenticity NOT verified
`sickn33/antigravity-awesome-skills` (row 6) is MIT but the copyright line reads "Copyright (c) 2026 Antigravity User" — a generic placeholder rather than a specific named entity. License validity is unaffected (MIT permission grant flows from the copyright holder regardless of name specificity), but **provenance authenticity** (is "Antigravity User" a real person/org, or a hastily-generated placeholder hiding the actual maintainer's identity?) is a Tranche-G concern separate from license probe. Similarly `ordinary9843/claude-code-auditor` (row 14, copyright 2026 ordinary9843) — license clean, identity-of-maintainer unknown. **NOT a license issue; a separate trustworthiness audit dimension.**

### D.5 — Patent-grant clauses not exercised
Apache-2.0 rows (1, 15) include a patent grant + termination on patent litigation. For the `claude-sota-installed` runtime's use-class (CLI-binary use, no patent-litigation involvement), the patent clauses are favorable and impose no practical restriction. **NOT a finding** in any direction — just noting the patent-grant bonus exists but doesn't change disposition.

### D.6 — Detector-miss root cause not exhaustively verified
§C above hypothesizes 3-4 mechanisms by which GitHub's license-detector misses on these repos (CC ambiguity, MIT title variance, search-API enrichment vs per-repo endpoint divergence, Apache template appendix placeholders). These are **plausible patterns from the observed sample** but were not cross-verified against the GitHub license-detector source code (which is open-source at `github/linguist`). For a definitive root-cause analysis, operator would need to (a) probe each repo via `GET /repos/{owner}/{repo}` directly (not search), (b) check if `license` field is non-null there, (c) compare to `github/linguist` ruby file `lib/linguist/license.rb` detection rules. **NOT PERFORMED** — the actionable finding (direct LICENSE-blob fetch resolves all ambiguity) does not depend on root-cause attribution.

---

## Summary verdict for Tranche-J

- **15/15 LICENSE files resolved** via direct fetch.
- **0 install-blocker licenses** for the runtime's use-class among the 15 (13 MIT + 2 Apache-2.0 + 1 CC-BY-SA-4.0 copyleft-flagged + 1 CC-BY-NC-ND-4.0 consult-only).
- **2 dispositional changes** vs original Tranche-G assignment (rows 5 and 13 — both about awesome-list/curation-index licenses, neither affecting actionable install plans since neither is a plugin/skill/agent primitive).
- **W254 §3 install wave**: license-clean and unblocked (`obra/superpowers`, `wshobson/agents`, `addyosmani/agent-skills` all confirmed MIT).
- **Pattern finding**: `license: null` in GitHub search-API metadata is detector miss-rate, not LICENSE absence; direct blob fetch is the authoritative resolution mechanism for license-driven install-eligibility decisions.
