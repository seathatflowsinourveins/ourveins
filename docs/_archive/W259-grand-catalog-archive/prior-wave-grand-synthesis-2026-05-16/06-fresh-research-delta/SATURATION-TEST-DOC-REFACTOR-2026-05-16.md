# SATURATION Research — Test Generation + Documentation Generation + Refactoring + Adjacent
**Date**: 2026-05-16
**Scope**: Categories not yet deeply covered in prior W252-W258 grand-synthesis waves
**Method**: GitHub MCP (rate-limited mid-fire → pivoted) + WebSearch (10 distinct queries) + DeepWiki (qodo-cover, openrewrite/rewrite) + WebFetch indirect via WebSearch summaries
**Cross-check basis**: ≥3-distinct-orgs per primary disposition row; honest non-findings recorded in §E

---

## §A — Full Matrix (32 entries)

| # | repo / product | ★ (approx) | license | native-CC-pathway | community-consensus | last-update | sub-category | verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | **confident-ai/deepeval** | 8k+ | Apache-2.0 | pytest-style; 50+ metrics; **no native CC plugin** (Python lib) | Strong — top 2 OSS LLM eval framework (vs promptfoo) | Active 2026 | Test/Eval (LLM) | **STUDY-PILOT** (use via /test skill subprocess) |
| 2 | **promptfoo/promptfoo** | 6k+ | MIT | CLI + YAML; **native CC integration** docs published | Incumbent — broadest provider matrix (30+ models) | Active 2026 (Q1) | Test/Eval (LLM) | **INSTALL** (already INSTALLED per prior waves) |
| 3 | **explodinggradients/ragas** (vibrantlabsai fork active) | 7k+ | Apache-2.0 | Python CLI (`uvx ragas`) + Arize Phoenix native binding | Strong — RAG-eval default; Phoenix MCP wraps it | Jan 2026 | Test/Eval (RAG) | **INSTALL via Phoenix MCP** (already wired) |
| 4 | **qodo-ai/qodo-cover** (was Codium-ai/cover-agent) | 5k+ | AGPL-3.0 (README) / Apache-2.0 (pyproject — conflict) | CLI (`cover-agent`, `cover-agent-full-repo`); uses LiteLLM → Bedrock Claude path | **UNMAINTAINED since 2025-06-15** per DeepWiki | 2025-06 (stale) | Test gen (unit) | **REJECT** (unmaintained; license conflict; supersede with Qodo Gen IDE plugin if needed) |
| 5 | **qodo-ai Qodo Gen** (IDE plugin) | n/a | Proprietary | IDE plugin (VSCode/JetBrains) + MCP-capable modes (multi-step) | F1=60.1% Feb 2026 top in code-review benchmarks | Active 2026 (Q2) | Test gen + Code review | **STUDY** (IDE-only; not portable to CC headless) |
| 6 | **sierra-research/tau-bench + tau2-bench** | 1k+ | MIT | Python framework; pass^k metric; **no native CC** but used by Anthropic for Claude evals | Authoritative — Anthropic-blessed agent benchmark | Active 2026 (live leaderboard) | Test/Bench (agent) | **STUDY-PILOT** (use as ground-truth eval harness for our agent fleet) |
| 7 | **princeton-nlp/SWE-bench + SWE-bench Verified** | 3k+ | MIT | Python harness; **no native CC** but Claude Opus 4.7 leads leaderboard | Authoritative — industry-standard coding-agent benchmark | Active 2026 | Test/Bench (coding agent) | **STUDY-PILOT** (reference harness; not for install) |
| 8 | **openai/evals** | 16k+ | MIT | Python framework; registry of benchmarks; Dashboard UI | Strong — vendor-of-record (OpenAI) | Active 2026 | Test/Eval (LLM) | **STUDY** (OpenAI-centric; less Anthropic-native than deepeval) |
| 9 | **Diffblue Cover** | n/a | Proprietary | IntelliJ plugin; RL-based bytecode analysis | "20x more productive than Claude Code/Copilot/Qodo Gen" per vendor; JUnit 6 specialist | Active 2026 (Q1 next-gen launch) | Test gen (Java) | **STUDY** (Java-only; commercial; no CC integration) |
| 10 | **EvoSuite** | 1.5k+ | LGPL-3.0 | CLI (Java); evolutionary algorithms | Mature academic; superseded by AgentTester | Active maintenance | Test gen (Java) | **REJECT** (older; AgentTester wins) |
| 11 | **AgentTester** (academic) | n/a | Academic | Paper-only; no production CLI | Surpasses EvoSuite line coverage + AthenaTest/ChatTester compilation rate (Springer 2026) | 2026 paper | Test gen (Java) | **STUDY** (research-only; no install target) |
| 12 | **ChatTester / AthenaTest** (academic) | n/a | Academic | Paper-only | Superseded by AgentTester per §11 | 2024-25 paper | Test gen | **REJECT** |
| 13 | **stryker-mutator/stryker-js** | 3k+ | Apache-2.0 | Node CLI; Vitest integration; module-level scoping | Industry-standard JS mutation testing | Active 2026 | Mutation testing (JS/TS) | **INSTALL** (wire into /test skill for AI-generated test verification) |
| 14 | **boxed/mutmut** (Python) | 1k+ | BSD-3 | Python CLI | Mature; competes with Cosmic Ray | Active | Mutation testing (Py) | **STUDY-PILOT** |
| 15 | **sixty-north/cosmic-ray** | 800+ | MIT | Python CLI; AST-manipulation; parallel via Docker | Strong — preferred for Python AST mutations 2026 | Active 2026 | Mutation testing (Py) | **INSTALL** (Python-first; pair with Stryker for JS/TS) |
| 16 | **mull-project/mull** | 800+ | Apache-2.0 | LLVM-based CLI (C/C++/Rust/Obj-C) | Mature; OSS-fuzz adjacent | Active | Mutation testing (native) | **STUDY** (C/C++/Rust ecosystem-specific) |
| 17 | **hcoles/pitest** | 1.7k+ | Apache-2.0 | Maven/Gradle plugin (Java) | Java de-facto standard | Active 2026 | Mutation testing (Java) | **STUDY-PILOT** (Java-only) |
| 18 | **google/oss-fuzz** | 10k+ | Apache-2.0 | Docker-based CI service; LLM-augmented (Google Nov 2024 announcement) | Authoritative — Google-operated continuous fuzz service | Active 2026 | Fuzz (OSS continuous) | **STUDY-PILOT** (operational service; not a local install) |
| 19 | **google/atheris** | 1.7k+ | Apache-2.0 | Python pip; libFuzzer-backed | Go-to Python coverage-guided fuzzer 2026 | Active 2026 (Py 3.11-3.13) | Fuzz (Python) | **INSTALL** (Python fuzz layer for /test skill) |
| 20 | **HypothesisWorks/hypothesis** | 7.5k+ | MPL-2.0 | pytest plugin; property-based | De-facto Python property-based testing; trivial Atheris harness pairing | Active 2026 | Property-based test | **INSTALL** (foundational dev dep) |
| 21 | **prompt-security/ps-fuzz (Prompt Fuzzer)** | 1k+ | Apache-2.0 | Python CLI; OWASP LLM categories | OSS LLM-fuzzer; 50 prompt variants/30s | Active 2026 | Fuzz (LLM safety) | **STUDY-PILOT** (security-adjacent; pair with Semgrep) |
| 22 | **mintlify (Mintlify Claude plugin)** | n/a | Proprietary (plugin Apache) | **Official Claude plugin** (`claude.com/plugins/mintlify`) + MCP server (`bunx mintlify-mcp`) | SOTA AI-docs platform; auto-hosts MCP per docs site | Active 2026 (Q2) | Doc gen | **INSTALL** (official Anthropic-listed plugin; clear path) |
| 23 | **facebook/docusaurus** | 64k+ | MIT | Static site gen; **no native AI features** (per Mintlify analysis) | Meta-maintained; OSS standard but AI-shallow | Active 2026 | Doc gen (static) | **STUDY** (use as output target, not AI-doc-gen tool) |
| 24 | **fern-api/fern** | 2k+ | Apache-2.0 + commercial | CLI (input OpenAPI → SDKs+docs); auto-generates llms.txt + MCP server | Strong — auto-MCP + llms.txt + RFC 9727 API catalog | Active 2026 | Doc gen (API) | **STUDY-PILOT** (OpenAPI-centric; high value if we expose APIs) |
| 25 | **errata-ai/vale** | 4k+ | MIT | CLI; CI-integrable | Industry-standard prose linter; LLM-complement not LLM-replacement | Active 2026 | Doc lint | **INSTALL** (deterministic prose CI lint; pair with LLM for fix-gen) |
| 26 | **anandtyagi/documentation-generator** (Claude plugin) | n/a | (per plugin hub) | **Claude Code plugin** (claudepluginhub.com listing) | Niche community plugin | 2026 listing | Doc gen | **STUDY** (verify maintenance + author before adopt) |
| 27 | **mvillmow/generate-docstrings** (Claude skill) | n/a | per skill repo | **Claude skill** (claude-plugins.dev listing) | Niche community skill | 2026 listing | Doc gen | **STUDY** |
| 28 | **ast-grep/ast-grep** + ast-grep-mcp + agent-skill | 7k+ | MIT | **Native Claude Code skill** (`mkdir -p .claude/skills/ast-grep && curl ...`); ast-grep-mcp server | Incumbent — polyglot structural codemod CLI | Active 2026 | Refactor (structural) | **INSTALL** (already incumbent; verify CC skill version) |
| 29 | **comby-tools/comby** | 4k+ | Apache-2.0 | CLI; structural patterns; language-agnostic | Mature; predates ast-grep; tree-sitter alternative | Active | Refactor (structural) | **STUDY** (ast-grep is faster + has CC skill; comby is fallback) |
| 30 | **openrewrite/rewrite** + rewrite-generative-ai | 2.5k+ | Apache-2.0 (core) / Moderne SAL (some lang impls) | Python (`pip install openrewrite`) / JS (npm); **3,500+ recipes**; AI agents invoke via OpenAI Function Calling or MCP per Moderne | Authoritative — enterprise refactor standard; FINOS partnership | Active 2026 | Refactor (mass/Java) | **INSTALL** (Python install path verified; recipe catalog is unique moat) |
| 31 | **semgrep/mcp-marketplace** | n/a | semgrep core LGPL/commercial | **Official Claude plugin** (`/plugin marketplace add semgrep/mcp-marketplace`); requires CC ≥2.1.7 | SOTA — bundles MCP + hooks + skills | Active 2026 | Refactor + Security | **INSTALL** (already candidate per W254) |
| 32 | **dotnet/roslynator** + Roslyn analyzers + Roslyn-MCP (community) | 3k+ | Apache-2.0 | dotnet tool; community MCP server (egorpavlikhin/roslyn-analyzer) | Authoritative .NET refactor framework; AI hybrid pattern emerging | Active 2026 | Refactor (.NET) | **STUDY** (only if .NET workload; community MCP not Microsoft-sanctioned) |
| 33 | **Sourcery** (Python) | n/a | Proprietary | IDE plugin (VSCode); CLI; **no native CC** | Strong Python refactor SaaS; predates LLM agents | Active 2026 | Refactor (Python) | **REJECT** (proprietary; Aider/Claude Code natively handle Python refactor) |
| 34 | **codium-ai/pr-agent** (Codium PR-Agent) | 7k+ | Apache-2.0 | GitHub Action + CLI; supports Claude provider | Mature; predates Qodo rebrand | Active 2026 | Code review (PR) | **STUDY-PILOT** (Codium-style PR review; vs CodeRabbit/Greptile) |
| 35 | **anthropics/claude-code-action** | 5k+ | MIT | **Official Anthropic GitHub Action** | Vendor-of-record | Active 2026 | CI agent / PR review | **INSTALL** (official; canonical CC-in-CI path) |
| 36 | **github/gh-aw** (GitHub Agentic Workflows) | n/a | per github org | gh CLI extension; supports Claude/Codex/Copilot/OpenCode engines; firewall + safe-outputs | Vendor-of-record (GitHub) — technical preview Feb 2026 | Active 2026 (Apr 20 weekly updates) | CI agent | **STUDY-PILOT** (vendor preview; aligns with W254 ci-cd) |
| 37 | **Greptile** | n/a | Proprietary | GitHub App; RAG-indexed cross-repo | 82% bug catch rate (vs CodeRabbit 44%) per own benchmark | Active 2026 | Code review | **STUDY** (proprietary; vs CodeRabbit) |
| 38 | **CodeRabbit** | n/a | Proprietary | GitHub/GitLab/Bitbucket/Azure app | Most mature dedicated AI PR review; broadest platform | Active 2026 | Code review | **STUDY** (proprietary; Claude Security review overlaps for security dim) |
| 39 | **Ellipsis** | n/a | Proprietary | GitHub App | PR-summary + auto-fix | Active 2026 | Code review | **STUDY** |
| 40 | **anthropics Claude Code /security-review** + Claude Security product | n/a | Anthropic | **Native CC slash command**; Opus 4.7-backed | Public beta Apr 30 2026; 500+ zero-days found | Active 2026 | Security review | **INSTALL** (native; already incumbent — verify enabled) |

---

## §B — Top-5 INSTALL per sub-category

### B.1 Test generation + LLM evaluation
1. **promptfoo** — incumbent; MIT; broad provider matrix; CC docs published. **Already INSTALLED.**
2. **deepeval** (confident-ai) — Apache-2.0; 50+ metrics; **STUDY-PILOT** new install via /test skill subprocess
3. **ragas** (via Phoenix MCP wrap) — Apache-2.0; RAG-eval default. **Already INSTALLED via Phoenix MCP.**
4. **stryker-js** — Apache-2.0; JS/TS mutation; complements AI-generated tests (kill-mutant verification)
5. **cosmic-ray** — MIT; Python AST mutations; pairs with hypothesis+atheris

### B.2 Documentation generation
1. **mintlify-claude-plugin + mintlify-mcp** — official Anthropic-listed plugin; `bunx mintlify-mcp`; SOTA AI-docs platform with MCP per site
2. **vale** — MIT; deterministic CI prose lint; "never send LLM to do a linter's job" wisdom — pair with Claude Code for fix-gen
3. **fern-api/fern** — Apache-2.0 + commercial; auto-MCP + llms.txt + RFC 9727 API catalog (high value if we expose APIs)
4. **Native Claude Code docstring generation** — no install; CLAUDE.md docstring standard + slash command pattern (per Codecademy/Mintlify guides)
5. **anandtyagi/documentation-generator** Claude plugin — verify maintenance before adopt; community-niche

### B.3 Refactoring / structural codemod
1. **ast-grep + ast-grep-mcp + agent-skill** — MIT; **incumbent**; install CC skill via `.claude/skills/ast-grep`
2. **semgrep mcp-marketplace plugin** — official Claude plugin (`/plugin marketplace add semgrep/mcp-marketplace`); CC ≥2.1.7; 5000+ rules
3. **openrewrite/rewrite** (Python pip path) — Apache-2.0; 3500+ recipes; AI-agent invocation via MCP/function-calling per Moderne
4. **comby** — Apache-2.0; structural patterns; fallback if ast-grep gap
5. **anthropics Claude Code native multi-file refactor** — built-in; CLAUDE.md pattern guidance (per Aider/Sitepoint guides)

### B.4 Mutation + Fuzz testing
1. **stryker-js** — Apache-2.0; JS/TS — module-level scoping 2026
2. **cosmic-ray** — MIT; Python AST mutation
3. **atheris** — Apache-2.0; Python coverage-guided fuzz; Py 3.11-3.13
4. **hypothesis** — MPL-2.0; property-based; pairs trivially with atheris (auto-minimize repros)
5. **mull** — Apache-2.0; LLVM/C/C++/Rust (only if native code in scope)

### B.5 CI agent + Code review
1. **anthropics/claude-code-action** — MIT; official Anthropic GHA; canonical CC-in-CI
2. **github/gh-aw** — GitHub-official; preview Feb 2026; multi-engine (Claude/Codex/Copilot); firewall + safe-outputs
3. **Claude Code /security-review** (native + Claude Security product) — Anthropic; beta Apr 30 2026; 500+ zero-days
4. **codium-ai/pr-agent** — Apache-2.0; supports Claude provider; mature
5. **semgrep mcp-marketplace plugin** — security-dim PR review (overlaps with #3)

---

## §C — Convergence Axis-1 (≥3 distinct organizational sources per primary disposition)

### C.1 Test gen
- **promptfoo as incumbent**: Braintrust + Nimble Approach + Inference.net + ScrollTest comparison articles — 4 distinct orgs converge
- **deepeval as #2 OSS**: Braintrust + ScrollTest + Inference.net + Confident-AI own — 3 distinct external + 1 vendor = 3 distinct
- **qodo-cover REJECT (unmaintained)**: DeepWiki repo introspection (qodo-ai org) — single-source but TIER-1-DIRECT (repo README itself states "no longer maintained as of 2025-06-15"). Operator-direct verification single-source-sufficient per CR-12 for status facts.

### C.2 Doc gen
- **Mintlify as SOTA AI-docs**: Mintlify's own library (vendor) + Docsio comparison + Devtoolreviews + Documentation.ai alternatives — vendor + 3 distinct = converged
- **Fern as MCP-auto + llms.txt leader**: Fern own + Mintlify article "Best llms.txt Platforms" (competitor reference) + dasroot.net independent — 3 distinct
- **vale "LLM ≠ linter"**: Fern guide + DEV Community article + Netlify blog — 3 distinct

### C.3 Refactor
- **ast-grep as Claude-native**: ast-grep own docs + fastmcp.me listing + mcpservers.org listing + ast-grep agent-skill repo — 3 distinct
- **OpenRewrite + AI agents (Function-calling/MCP)**: Moderne blog + FINOS blog + secondtalent + IBM Think — 4 distinct
- **Semgrep as official Claude plugin**: Semgrep own docs + claude.com/plugins/semgrep + claudeskills.info + mcpmarket.com — 4 distinct

### C.4 Mutation
- **Stryker as JS/TS leader**: Stryker.io + dev.to (prodsens) + theofidry/awesome list + oneuptime blog — 4 distinct
- **Cosmic Ray as Python AST leader 2026**: dev.to comparison + pypi + mutation.readthedocs.io + ACM Brazilian Symposium paper — 4 distinct
- **"AI-generated tests need mutation testing" thesis**: dev.to prodsens + thoughtworks blog + we-fuzz blog — 3 distinct

### C.5 CI agent
- **claude-code-action as official path**: GitHub marketplace + Composio + truefoundry + Anthropic — 3 distinct + vendor
- **gh-aw as GitHub preview**: GitHub blog + github.github.io + github changelog + GitHub Next — 1 org all sub-properties (single-org limitation noted; STUDY-PILOT not INSTALL)
- **Claude Security beta Apr 30 2026**: Snyk blog (named-T2 Allan quote) + buildfastwithai + stackhawk + Anthropic help center — 4 distinct

---

## §D — Architecture Recommendation

### D.1 Should L4 Eval get a **test-gen sub-lane**?
**YES — but only as an inline *test-verification* sub-skill, not a new top-level lane.**

Rationale:
- Test **generation** is already covered by native Claude Code refactor/codegen capability (per Codecademy + Mintlify + Sitepoint guides — CC reliably generates Google-style docstrings, JUnit, pytest scaffolds in single-pass).
- The **gap** is *quality verification* of LLM-generated tests. Per dev.to/thoughtworks/we-fuzz 3-org convergence: **"AI-generated tests are dangerous because Claude Code/Cursor write plausible tests fast but also write tests that pass without asserting anything meaningful, making mutation testing now table stakes."**
- **Concrete proposal**: L4 Eval gets a `test-mutation-gate` sub-lane:
  1. After `/test` writes tests → invoke language-appropriate mutation harness (Stryker JS / cosmic-ray Py / pitest Java)
  2. Block ship if mutation score < threshold (e.g., 60% killed mutants)
  3. Surface surviving mutants as "tests don't assert" findings to next iteration
- This is *additive* to existing promptfoo+ragas+phoenix LLM-eval lane (those eval LLM **outputs**; this evals test **quality**).

### D.2 Should L5 Scaffold get **doc-gen + refactor sub-lanes**?
**Doc-gen: YES (as install slot for Mintlify plugin + Vale CI lint). Refactor: NO (already covered by ast-grep + semgrep + native CC + proposed openrewrite install).**

Doc-gen rationale:
- Mintlify is the only category with a clear **official-Anthropic-listed plugin** path (`claude.com/plugins/mintlify`) — install discipline is identical to W254's plugin-install set.
- Vale fills the deterministic-linter complement gap (per Fern/Netlify/DEV convergence: "use Vale to detect, LLMs to fix").
- llms.txt auto-gen (Fern) and `.claude/skills/generate-docstrings` (community) are STUDY-PILOT, not INSTALL.
- **Concrete sub-lane**: L5 Scaffold → `docs/` sub-lane = {mintlify-plugin, vale-CI-hook, native-CC-docstring-pattern in CLAUDE.md}.

Refactor rationale to **NOT** add as separate sub-lane:
- ast-grep is already incumbent (per system prompt CANDIDATES list).
- Semgrep plugin is already a candidate per W254 §3 (verify in install manifest).
- OpenRewrite belongs in L5 Scaffold as an **install** (3500+ recipes is unique moat for Java-heavy modernization) but doesn't justify a sub-lane name change — fits existing scaffold/codemod surface.
- Native CC multi-file refactor + CLAUDE.md guidance already canonical.
- **Concrete addition**: 3 new install rows in `docs/sota-installed-manifest.md`:
  - `ast-grep` Claude skill (verify version per `.claude/skills/ast-grep`)
  - `openrewrite` pip install (Python harness for cross-language recipes)
  - `vale` CLI + GH Action

### D.3 Cross-cutting: **Mutation testing as gate, not lane**
- Add a `pre-ship` mutation-test gate in `.claude/settings.json` hooks chain (per cardinal-rule-2: direct upstream-CLI invocations only — stryker/cosmic-ray/pitest CLIs are direct invocations).
- This satisfies "AI-test quality" without inventing a new harness layer.

### D.4 Code review architecture (orthogonal to L1-L5)
- INSTALL `anthropics/claude-code-action` as canonical CC-in-CI (already W254 install set).
- INSTALL `semgrep mcp-marketplace plugin` for security dim (already W254 candidate).
- STUDY-PILOT `gh-aw` (1-org convergence; preview status).
- STUDY only `CodeRabbit/Greptile/Ellipsis` (proprietary; overlap with Claude `/security-review` + Claude Security beta).

---

## §E — Honest Non-findings

1. **GitHub MCP rate-limited mid-fire**: 4/4 parallel `mcp__github__search_repositories` calls failed with 403 (request ID `0409:115E0E:9A596B:...`). Pivoted to WebSearch + DeepWiki. **All star counts in §A are approximations from WebSearch summaries, not verified per-repo via GitHub API.** Operator should re-probe star counts post-rate-reset if precision needed.

2. **DeepWiki coverage gaps**:
   - `semgrep/mcp-marketplace` not indexed ("Repository not found. Visit https://deepwiki.com to index it").
   - `confident-ai/deepeval` query failed (typo in tool name `mcp__deepwike__` — single attempt; not retried due to redundancy with WebSearch coverage).
   - `qodo-cover` and `openrewrite/rewrite` succeeded — the two highest-stakes verifications.

3. **"openai/swarm-evals" does not exist** as a discoverable repo. WebSearch returns generic `openai/evals` + agent-evals-guide content. Candidate name is likely fictional/aspirational — **REMOVE from candidate list**.

4. **"microsoft/RoseLynn" does not exist** as a Microsoft product. The actual artifact is **Roslyn** (.NET Compiler Platform) + community Roslyn-MCP servers (e.g., `egorpavlikhin/roslyn-analyzer`). **Rename candidate to Roslyn + community MCP**; Microsoft has no first-party "AI refactor" Roslyn product.

5. **"anthropics/docs-tools" not found** in search results. Candidate name likely speculative. Anthropic's official doc-gen approach is **CLAUDE.md docstring-pattern + native CC** (no dedicated repo). The `mintlify-claude-plugin` (third-party but official-listed) is the closest first-party-blessed path.

6. **"docusaurus-AI" not a real fork/product**. Docusaurus itself is AI-shallow per Mintlify's own analysis (no built-in AI assistant, no MCP server, no auto-gen). Use Docusaurus as a static-site **output target**, not as a doc-gen tool.

7. **"vercel/vitalik" not found**. Likely a hallucinated candidate name. No Vercel doc-gen product surfaced.

8. **"kentcdodds/grace" not found** as a refactor tool. KCD has many React utilities; no "grace" refactor agent. **Remove from candidates.**

9. **"ChatGPT-Refactor", "Diffblue Refactor", "ReviewBot"** — no concrete repo/product found beyond Diffblue Cover (which is **test-gen, not refactor** — categorization error in original candidate list).

10. **"prompt-fuzz" disambiguation**: Two distinct products both surfaced:
    - `prompt-security/ps-fuzz` (LLM safety fuzzer, OWASP-aligned)
    - `PromptFuzz` (academic — fuzzer-harness synthesis tool, separate from OWASP)
    Original candidate list ambiguous — assumed OWASP version per industry-2026 framing.

11. **"sweetapps/Codeflash"** — minimal search signal; no confirmation as a maintained CI agent. **STUDY only if operator can supply concrete repo URL.**

12. **License conflict (qodo-cover)**: README states AGPL-3.0; pyproject.toml states Apache-2.0. **LICENSE file is definitive but not fetched in this fire.** If pursuing despite "unmaintained" status, operator must read repo LICENSE file directly before adoption decision.

13. **No fresh probe of star counts for any repo this fire** (GitHub rate-limit). All star figures are approximate / from search summaries.

14. **Sourcegraph Cody Free/Pro terminated July 2025**; now $59/user/mo enterprise-only. **REJECT for individual-runtime install consideration.** Original candidate list pre-dated this pricing shift.

15. **Codex (OpenAI) "docs gen" no concrete product** — Codex CLI itself can write docs but there's no `openai/codex-docs` repo. Same pattern as Claude Code — generic agent, not doc-specialized tool.

---

## Sources (URLs visited)

- https://dev.to/rahulxsingh/best-ai-test-generation-tools-in-2026-complete-guide-4o2p
- https://www.braintrust.dev/articles/best-promptfoo-alternatives-2026
- https://www.braintrust.dev/articles/deepeval-alternatives-2026
- https://scrolltest.com/deepeval-vs-promptfoo-2026-llm-evaluation-framework/
- https://nimbleapproach.com/blog/technical-deep-dive-promptfoo-vs-deepeval-for-automated-ai-evaluation/
- https://www.mintlify.com/library/best-technical-documentation-software-in-2026
- https://www.mintlify.com/library/best-llms-txt-platforms
- https://docsio.co/blog/mintlify-vs-docusaurus
- https://www.devtoolreviews.com/reviews/mintlify-vs-gitbook-vs-docusaurus-vs-readme-2026
- https://github.com/openrewrite/rewrite
- https://docs.openrewrite.org/
- https://www.moderne.ai/blog/open-source-auto-refactoring-meets-ai-agent-to-modernize-fintech-software-at-scale
- https://www.finos.org/blog/open-source-auto-refactoring-meets-ai-agent-to-modernize-fintech-software-at-scale
- https://ast-grep.github.io/
- https://github.com/ast-grep/ast-grep-mcp
- https://github.com/ast-grep/agent-skill
- https://fastmcp.me/skills/details/198/ast-grep
- https://semgrep.dev/docs/mcp
- https://github.com/semgrep/mcp-marketplace
- https://claude.com/plugins/semgrep
- https://github.com/mintlify/mintlify-claude-plugin
- https://claude.com/plugins/mintlify
- https://buildwithfern.com/post/optimizing-api-docs-ai-agents-llms-txt-guide
- https://buildwithfern.com/learn/docs/ai-features/llms-txt
- https://stryker-mutator.io/
- https://prodsens.live/2026/02/01/the-pitfalls-of-test-coverage-introducing-mutation-testing-with-stryker-and-cosmic-ray/
- https://pypi.org/project/cosmic-ray/
- https://pypi.org/project/atheris/1.0.13/
- https://github.com/google/atheris
- https://github.com/qodo-ai/qodo-cover
- https://www.qodo.ai/blog/we-created-the-first-open-source-implementation-of-metas-testgen-llm/
- https://www.diffblue.com/resources/announcing-the-next-generation-of-our-best-in-class-unit-test-generation-platform/
- https://github.com/sierra-research/tau-bench
- https://github.com/sierra-research/tau2-bench
- https://www.swebench.com/
- https://www.swebench.com/verified.html
- https://github.com/openai/evals
- https://docs.ragas.io/en/stable/getstarted/quickstart/
- https://prompt.security/fuzzer
- https://snyk.io/blog/claude-code-remediation-loop-evolution/
- https://www.buildfastwithai.com/blogs/claude-security-ai-code-scanner-2026
- https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code
- https://github.com/anthropics/claude-code-action
- https://github.com/github/gh-aw
- https://github.github.com/gh-aw/
- https://www.deployhq.com/blog/ai-code-review-tools-compared-coderabbit-copilot-sourcery-ellipsis
- https://www.greptile.com/greptile-vs-coderabbit
- https://www.codeant.ai/blogs/swe-bench-scores
- https://www.digitalapplied.com/blog/agent-observability-platforms-langsmith-langfuse-arize-2026
- https://www.codecademy.com/article/claude-code-tutorial-how-to-generate-debug-and-document-code-with-ai
- https://vale.sh/docs
- https://buildwithfern.com/post/docs-linting-guide
- https://www.netlify.com/blog/a-key-to-high-quality-documentation-docs-linting-in-ci-cd/
- https://github.com/dotnet/roslynator
- https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/
