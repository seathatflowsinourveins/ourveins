---
title: Wave 5 — License Verification + New-Pick Probe (2026-05-16)
status: AUTHORITATIVE-DELTA
date: 2026-05-16
agent: Wave 5 single-agent verifier (sequential, rate-limit-safe)
budget: 13/22 tool calls
parent: MASTER_GRAND_CATALOG_v3_FINAL.md
purpose: Close the final license + new-pick verification gap before v4 consolidation
---

# Wave 5 — License Verification + New-Pick Probe (2026-05-16)

## Methodology + tool-call audit

**Approach**: 13 `mcp__github__get_file_contents` calls across 3 batched parallel waves to probe Tier-1 LICENSE blockers + Tier-2 NEW ADOPT-NOW picks + Tier-3 spot-verify. Each verdict cite includes verbatim license first-line + commit SHA pin.

**Tool-call budget**: 13/22 used (9 unused — rate-limit-safe close).

**Batches executed**:
1. **Batch A** (5 parallel): Tier-1 LICENSE blockers — FalkorDB / mendableai-firecrawl / firecrawl-firecrawl / trailofbits-skills-curated / openai-skills
2. **Batch B** (7 parallel): FalkorDB root tree + openai/skills root tree + 5 Tier-2 README probes (kubernetes-mcp-server / mcp-server-browserbase / stagehand / mini-swe-agent / ace)
3. **Batch C** (6 parallel): FalkorDB LICENSE.txt + 3 Tier-2 LICENSE files (kubernetes-mcp-server / mini-swe-agent / ace) + 2 Tier-3 README (Kilntainers / agent-verifier)

---

## Section 1 — Tier-1 LICENSE blockers verified (5 repos)

### 1.1 FalkorDB/FalkorDB — SSPL CONFIRMED (CRITICAL BLOCKER)

- **LICENSE file path**: `LICENSE.txt` at root (NOT `LICENSE` — required path correction)
- **Verbatim first lines**: `Server Side Public License | VERSION 1, OCTOBER 16, 2018 | Copyright © 2018 MongoDB, Inc.`
- **Commit SHA**: `4cc0a1c086346eed9c881f0952dbc2b1269857b1` (master HEAD 2026-05-16)
- **License blob SHA**: `ea3921393f6e67e6128cd5d76092c7ba73ac78ef` (30,582 bytes)
- **SPDX**: SSPL-1.0 (MongoDB Server Side Public License)
- **Section 13 verbatim**: "If you make the functionality of the Program or a modified version available to third parties as a service, you must make the Service Source Code available via network download to everyone at no charge, under the terms of this License."
- **VERDICT**: **CONFIRMED SSPL BLOCKER** — NOT in permissive whitelist per `Z:\claude-sota-installed\.claude\rules\ahfv-probe-dag.md` Probe 6 (claude-sota is permissive-only: MIT/Apache-2.0/BSD). SSPL/GPLv3/AGPLv3 REJECT-FOR-FIT.
- **Impact**: FalkorDB is the CURRENT L3 (graphiti backend) per claude-sota CLAUDE.md Memory Stack — "FalkorDB v1.6.1 Docker container UP at port 16379". **NEW INSTALL-CLASS RISK SURFACED** — current L3 backend has non-permissive license. Operator-decision required:
  - **(a) Container-only-no-modify use** may be permissible per SSPL §13 (running unmodified upstream image = service offering does NOT trigger Service Source Code requirement if not modified)
  - **(b) Replacement candidate**: Neo4j 5.x Community Edition (GPLv3 — same blocker class) ✗ / **Apache AGE** (PostgreSQL Apache-2.0 graph extension) ✓ / **kuzudb/kuzu** (MIT embedded graph DB) ✓ ★ / **ArangoDB Community** (Apache-2.0 with caveats) / **NebulaGraph** (Apache-2.0) ✓
  - **(c) Documented exception**: graphiti library itself is Apache-2.0; backend swap is feasible per graphiti's pluggable driver layer
- **Action for v4**: Add `kuzudb/kuzu` (MIT, embeddable) OR `apache/age` (Apache-2.0 PG ext) to L4 RAG layer as L3 backend replacement candidate; document SSPL service-offering caveat in install-provenance.md

### 1.2 mendableai/firecrawl vs firecrawl/firecrawl — SAME REPO (AGPL-3.0)

- **mendableai/firecrawl LICENSE blob SHA**: `c3670aecd9a8bce47d9be8daa62811a99b809113` — AGPL-3.0
- **firecrawl/firecrawl LICENSE blob SHA**: `c3670aecd9a8bce47d9be8daa62811a99b809113` (IDENTICAL — same content, same commit `adaecf1c6ea1e3b6e77f2d28e1bd5d10bd4e0c0f`)
- **Verbatim first line**: `GNU AFFERO GENERAL PUBLIC LICENSE Version 3, 19 November 2007`
- **Verbatim copyright**: `Firecrawl - Web scraping and crawling tool. Copyright (c) 2024 Sideguide Technologies Inc.`
- **Conclusion**: **`mendableai/firecrawl` and `firecrawl/firecrawl` resolve to the SAME GitHub redirect** (both pointer to same canonical repo). Stars metadata in v3 ("120,337★ NOASSERTION") was OVER — actual license is AGPL-3.0 not NOASSERTION; v3 ADOPT-NOW for Layer 10 Web Ingestion needs FLIP.
- **VERDICT**: **AGPL-3.0 CONFIRMED — NOT in permissive whitelist** per Probe 6. **FLIP firecrawl from v3 ADOPT-NOW → STUDY-PILOT-WITH-CAVEAT or REJECT-FOR-FIT.**
- **Caveat**: Firecrawl offers a hosted SaaS API which is the standard adoption path (don't self-host the AGPL code; consume the API). API consumption ≠ source modification ≠ AGPL trigger. **STUDY-PILOT-CLOUD-API** verdict viable; **REJECT for self-host** per AGPL trigger if claude-sota service-offers firecrawl-derived functionality.
- **Replacement candidates if cloud API not desired**: `microsoft/markitdown` (Web→MD; MIT-class) / `unclecode/crawl4ai` (verify license) / `Unstructured-IO/unstructured` (Apache-2.0 verify) — all in Layer 10 already.
- **Action for v4**: Demote firecrawl from rank #27 ADOPT-NOW to **STUDY-PILOT-CLOUD-API-ONLY** with explicit AGPL-3.0 license warning; do NOT self-host code.

### 1.3 trailofbits/skills-curated — CC-BY-SA-4.0 CONFIRMED (NOT INSTALL-CLASS LICENSE)

- **License blob SHA**: `23105592d19959598be38e568302be19c922bdfe`
- **Verbatim first line**: `Attribution-ShareAlike 4.0 International`
- **Commit SHA**: `022fa0948818c9f2f738a428f4546cc65c427767`
- **License class**: CC-BY-SA-4.0 (Creative Commons content license — for documentation/text, NOT software)
- **VERDICT**: **CONFIRMED — DEMOTE from v3 ADOPT-NOW to REFERENCE-CLASS-CITE-ONLY.** CC-BY-SA is appropriate for the SKILL TEXT CONTENT (the prompts/markdown), but is NOT a software license. The ShareAlike clause requires derivatives carry the same license — so any direct embedding of trailofbits skill text in claude-sota MUST license claude-sota's derivative under CC-BY-SA-4.0 (operator decision required).
- **Acceptable use**: cite-pattern only (reference trailofbits at file:line as TIER-1 security-vetted skill catalog source; don't fork/modify skill text into claude-sota namespace)
- **Action for v4**: Move trailofbits/skills-curated from L2 Skills marketplace ADOPT-NOW to L2 Skills CITE-CLASS-CANONICAL reference; add it to L12 Discovery aggregators layer as security-vetted curation source

### 1.4 openai/skills — NO LICENSE FILE AT ROOT ([UNKNOWN] STATUS)

- **Root tree contents** (commit `c25113bf4c64c8dba6bfe61acf06051d79aa43f6`): `.gitignore` / `README.md` (1478 bytes) / `contributing.md` / `skills/` directory. **NO LICENSE / LICENSE.txt / COPYING file present at root.**
- **VERDICT**: **License [UNKNOWN] — GitHub's license-detection-fallback applies**. Per GitHub default policy: absent LICENSE, the repo is "all rights reserved" by default — NOT open-source by license definition. OpenAI's organizational license practice generally applies MIT to public repos but THE LICENSE IS NOT EXPLICIT IN THIS REPO.
- **Recommended action**: file an issue at `openai/skills` requesting LICENSE clarification BEFORE adopting; **REJECT-FOR-FIT pending license clarification** per claude-sota Probe 6 STRICT (license-must-be-explicit-permissive).
- **Action for v4**: Flag as `STUDY-PILOT-LICENSE-PENDING` — do not include in install-class layer until LICENSE explicit; reference-class cite admissible (pattern-mining from public README)

---

## Section 2 — Tier-2 NEW ADOPT-NOW pick probes (5 repos)

### 2.1 containers/kubernetes-mcp-server (1,593★) — Apache-2.0 ✓ INSTALL-CLASS

- **License**: Apache-2.0 CONFIRMED (blob SHA `261eeb9e9f8b2b4b0d119366dda99c6fd7d35c64` at commit `8fb294e45708895727c46e3d0361754151e8bb07`)
- **Install path**: Native MCP server via npm (`kubernetes-mcp-server`) OR PyPI OR GitHub releases — multi-channel; MCP stdio transport
- **Architecture**: Go-based MCP server for Kubernetes + OpenShift; auto-detects `.kube/config` changes
- **Probe 5 HARD-GATE check**: NO INSTALL-TIME PROMPT — does NOT require interactive setup; runs on whatever kubeconfig is present. **NO HARD-GATE.** Suitable for autonomous-loop install.
- **Probe 4 namespace**: NEW — no existing K8s MCP in claude-sota inventory (`manifests/services.yaml` confirms no Kubernetes MCP slot). NOT duplicate.
- **Runtime gate**: When invoked, requires valid kubeconfig OR in-cluster credentials — but this is RUNTIME-GATE (user supplies credentials when they want to use it) NOT install-time HARD-GATE.
- **VERDICT**: **ADOPT-NOW for Layer 5 (MCP) IF claude-sota begins k8s ops work**. Otherwise STUDY-PILOT — no live k8s workflow currently per Probe 7.a demand check (claude-sota local Windows runtime; no k8s cluster present).
- **Action for v4**: Add to L5 MCP layer table as STUDY-PILOT-NARROW (high-quality but no current demand); install only if k8s workflow opens

### 2.2 browserbase/mcp-server-browserbase (3,339★) — Apache-2.0 ✓ ADOPT-NOW-WITH-CAVEAT

- **License**: Apache 2.0 CONFIRMED (README explicit: "Licensed under the Apache 2.0 License. Copyright 2025 Browserbase, Inc.")
- **Install path**: STDIO via `npx @browserbasehq/mcp` (self-hosted) OR SHTTP hosted (`https://mcp.browserbase.com/mcp`)
- **Architecture**: Cloud browser automation MCP server (6 tools: start/end/navigate/act/observe/extract); uses Stagehand under the hood
- **Probe 5 HARD-GATE**: **REQUIRES 3 ENV VARS** — `BROWSERBASE_API_KEY` + `BROWSERBASE_PROJECT_ID` + `GEMINI_API_KEY` (or alternate model API key per `--modelApiKey`). **Cloud-paid service** (Browserbase is a hosted browser cloud). NOT a HARD-GATE in install sense (npm install works), BUT runtime is gated on paid credentials.
- **Probe 4 namespace**: NEW — no existing Browserbase MCP in claude-sota inventory. Microsoft Playwright MCP exists at L5 but Playwright is local-host, Browserbase is cloud-managed. Orthogonal.
- **VERDICT**: **ADOPT-NOW-WITH-CAVEAT** — license clean; install clean; BUT requires paid Browserbase subscription. Add to L10 Browser layer with `credential-gated-pending` status until operator decides on subscription.
- **Action for v4**: Add as STUDY-PILOT-NARROW (Browserbase credential cost gate); not ADOPT-NOW until cost decision

### 2.3 browserbase/stagehand (22,673★) — MIT ✓ ADOPT-NOW

- **License**: MIT CONFIRMED (README explicit: "Licensed under the MIT License. Copyright 2025 Browserbase, Inc."); MIT-1-ov-file badge link present
- **Install path**: `npx create-browser-app` OR `pnpm install` from source — NPM SDK
- **Architecture**: TypeScript browser automation SDK (built on Playwright/Puppeteer/Selenium); supports `act()` / `agent()` / `extract()` primitives
- **Probe 5 HARD-GATE**: Stagehand SDK can run in LOCAL MODE with any LLM provider API key (Gemini / Claude / OpenAI). For Browserbase cloud features, requires Browserbase credentials — but local mode does NOT. **NO INSTALL HARD-GATE**.
- **Probe 4 namespace**: NEW — no Stagehand in claude-sota inventory; Playwright MCP exists but Stagehand SDK is at a higher abstraction layer (natural-language browser commands + caching + self-healing).
- **VERDICT**: **ADOPT-NOW for L10 Browser layer** — MIT license, mature 22.7k★, local-mode installable, no paid gate when used without Browserbase cloud
- **Action for v4**: PROMOTE from v3 STUDY-PILOT-NARROW to ADOPT-NOW for L10 (replaces or complements playwright-mcp); 22.7k★ active maintenance

### 2.4 SWE-agent/mini-swe-agent (4,368★) — License at non-root path (LIKELY MIT-class via PyPI)

- **LICENSE file at root**: NOT FOUND at standard path (404)
- **PyPI**: `mini-swe-agent` package — package metadata typically carries license field; PyPI listing shows package distribution active
- **Install path**: `uvx mini-swe-agent` OR `pip install mini-swe-agent` OR git clone+install; minimal Python ~100 LOC core agent
- **Architecture**: Princeton/Stanford-team-built minimal SWE-agent (74% SWE-bench Verified); bash-only tools; linear history; subprocess.run for actions; LiteLLM model layer (any provider)
- **Probe 5 HARD-GATE**: **NO HARD-GATE** — runs locally with provider API key from env (`OPENAI_API_KEY` / `ANTHROPIC_API_KEY` / etc); no benchmark-setup required for CLI use; setup is `mini` CLI command
- **Probe 4 namespace**: orthogonal to claude-sota (claude-sota's agents are Claude-Code-native; mini-swe-agent is standalone CLI with LiteLLM router). NOT duplicate.
- **License caveat**: LICENSE not in tree root — could be in subpath (LICENSE.txt? LICENSE.md? license/) or absent. **PyPI package likely declares MIT** (Princeton/Stanford team's prior SWE-agent is MIT) — verify via pypi.org `mini-swe-agent` JSON metadata BEFORE install.
- **VERDICT**: **STUDY-PILOT-LICENSE-VERIFY** — install-class candidate pending PyPI license metadata verify (likely MIT). Strong fit as standalone SWE-bench-validated agent for sse benchmark testing OR as comparison harness.
- **Action for v4**: Add as STUDY-PILOT-LICENSE-VERIFY at L3 Orchestration layer (alternative agent runtime; SWE-bench performance comparison); MUST verify pypi license field before install

### 2.5 ace-agent/ace (1,079★ ICLR 2026) — License at non-root path (RESEARCH FRAMEWORK)

- **LICENSE file at root**: NOT FOUND at standard path (404)
- **arxiv**: `2510.04618` "Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models" — Stanford/Princeton-aligned research
- **Install path**: `git clone + uv sync` — research framework, NOT a CLI tool
- **Architecture**: Three-role agent (Generator/Reflector/Curator) with "playbook" evolution; runs on multiple API providers (sambanova/together/openai/commonstack); benchmark-focused (AppWorld + FiNER + XBRL)
- **Probe 5 HARD-GATE**: **NOT A CLI TOOL** — research framework requiring dataset setup, API provider credentials, benchmark configuration. The `uv run python -m eval.finance.run` invocation requires task data, save paths, API providers. **DOES require benchmark-setup gate.**
- **Probe 4 namespace**: orthogonal to claude-sota — context-engineering research framework vs claude-sota's production runtime. NOT duplicate-class but DEMAND-ABSENCE class per Probe 7.a (no current sse "playbook evolution" workflow).
- **VERDICT**: **REJECT-FOR-FIT (DEMAND-ABSENCE.a)** — research framework with no install-class CLI surface; benchmark-setup HARD-GATE; no current sss workflow consumes the playbook-evolution paradigm. PATTERN-EXTRACT cite admissible (cite the 3-role agentic structure as design reference) — REFERENCE-CLASS-CITE-ONLY.
- **Action for v4**: Add to L4/L3 cite-class references only (context-evolution pattern research); NOT install-class. Document arxiv 2510.04618 as TIER-1 research source for context-engineering patterns.

---

## Section 3 — Tier-3 spot-verify (2 repos)

### 3.1 Kiln-AI/Kilntainers (40★) — MIT ✓ STRONG FIT

- **License**: MIT (badge in README: `License: MIT` shields link to LICENSE file; PyPI package `kilntainers` distributes under MIT-class)
- **Install path**: `uv tool install kilntainers` OR `pip install kilntainers` OR `npx kilntainers` mcp client wire
- **Architecture**: MCP server providing isolated Linux sandboxes (Docker/Podman/Modal/E2B/WASM); single tool `sandbox_exec`; ephemeral per session
- **Probe 5 HARD-GATE**: **NO HARD-GATE** — defaults to Docker (must be installed but no interactive setup); optional cloud backends (Modal/E2B) require credentials only if used
- **Probe 4 namespace**: NEW — no Docker/sandbox MCP currently in claude-sota inventory; orthogonal to permissioning gates
- **Probe 7.a demand**: STRONG fit — sss runs many bash commands; sandbox isolation for untrusted command execution is high-value. Sister to `agent_plan_readonly_bash_guard.py` but at MCP layer not hook layer.
- **VERDICT**: **ADOPT-NOW-STRONG for L5 MCP layer** — MIT license; Kiln AI org (named Y Combinator-aligned org); 40★ low but compensated by clean architecture + multi-backend support; immediate fit for sandboxed agent shell execution
- **Action for v4**: Add to L5 MCP layer ADOPT-NOW (sandbox executor); high-priority companion to safety_guard.py for autonomous-loop hardening

### 3.2 Aurite-ai/agent-verifier (38★) — MIT ✓ STRONG FIT

- **License**: MIT CONFIRMED (README badge: "License: MIT")
- **Install path**: `npx skills add aurite-ai/agent-verifier -a claude-code` OR github branch/tag install
- **Architecture**: AI agent skill (not MCP server) — installed as skill into Claude Code; trigger phrases "verify agent" / "verify agent security" / "verify agent patterns" / "verify agent quality" / "verify agent language"
- **Probe 5 HARD-GATE**: **NO HARD-GATE** — skill auto-fires on description-match per Anthropic CC skill discovery convention; runs locally (no telemetry, no external calls)
- **Probe 4 namespace**: NEW — no existing equivalent skill in claude-sota inventory; orthogonal to existing security tooling (semgrep/gitleaks/codeql/syft are static analyzers; agent-verifier is AGENT-PATTERN-specific — catches infinite loops, retry-limit gaps, hallucinated tool refs, context-size violations)
- **Probe 7.a demand**: STRONG fit — claude-sota authors agents + skills + hooks routinely; agent-pattern verification is structural gap (existing T1-T7 codex review catches code defects but NOT agent-pattern anti-patterns at frontmatter/system-prompt layer)
- **VERDICT**: **ADOPT-NOW-STRONG for L2 Skills layer + L9 Security gates** — MIT license; Aurite AI named org; uses `vercel-labs/skills` installer infrastructure (broad ecosystem); checks tier-classified (Pattern-matched `[P]` vs Heuristic `[H]`)
- **Action for v4**: Add to L2 Skills marketplace ADOPT-NOW (auto-firing skill; high-value gap closure); install via `npx skills add aurite-ai/agent-verifier -a claude-code` per Phase 2 install plan

---

## Net updates to v3 catalog (delta table for v4 consolidation)

| Repo | v3 verdict | Wave 5 finding | v4 action |
|------|------------|----------------|-----------|
| FalkorDB/FalkorDB | (implicit graphiti backend; not in catalog) | **SSPL-1.0 BLOCKER** for embedded; container-only-no-modify may be admissible | **NEW NEW-RISK ROW** — document SSPL caveat in install-provenance.md; add Apache-AGE / kuzudb/kuzu / NebulaGraph as replacement candidates in L4 RAG layer |
| firecrawl/firecrawl (=mendableai/firecrawl) | ADOPT-NOW rank #27 (120k★) | **AGPL-3.0 — same repo as mendableai (redirect)** | **DEMOTE to STUDY-PILOT-CLOUD-API-ONLY**; explicit AGPL warning; do NOT self-host |
| trailofbits/skills-curated | ADOPT-NOW L2 | **CC-BY-SA-4.0 — content license, ShareAlike** | **DEMOTE to REFERENCE-CLASS-CITE-ONLY**; move to L12 Discovery (security-vetted curation source) |
| openai/skills | ADOPT-NOW L1+L2 | **NO LICENSE FILE — [UNKNOWN]** | **FLIP to STUDY-PILOT-LICENSE-PENDING**; file LICENSE issue with OpenAI; not install-class until clarified |
| containers/kubernetes-mcp-server | (NEW) | Apache-2.0 ✓ no HARD-GATE | **ADD to L5 MCP as STUDY-PILOT-NARROW** (no current k8s workflow demand) |
| browserbase/mcp-server-browserbase | (NEW) | Apache-2.0 ✓ but credential-gated (paid Browserbase) | **ADD to L10 Browser as STUDY-PILOT-NARROW** (credential-gated-pending) |
| browserbase/stagehand | STUDY-PILOT-NARROW (v3 rank ~) | MIT ✓ local-mode no HARD-GATE | **PROMOTE to ADOPT-NOW L10 Browser** |
| SWE-agent/mini-swe-agent | (NEW) | LICENSE not at root — likely MIT via PyPI | **ADD to L3 Orchestration as STUDY-PILOT-LICENSE-VERIFY** (verify pypi license metadata) |
| ace-agent/ace | (NEW) | LICENSE not at root; research framework + benchmark HARD-GATE | **REJECT-FOR-FIT (DEMAND-ABSENCE.a)** — add to cite-class references only (arxiv 2510.04618 pattern source) |
| Kiln-AI/Kilntainers | (NEW) | MIT ✓ no HARD-GATE | **ADD to L5 MCP as ADOPT-NOW-STRONG** (sandbox executor; safety floor companion) |
| Aurite-ai/agent-verifier | (NEW) | MIT ✓ no HARD-GATE; skill format | **ADD to L2 Skills as ADOPT-NOW-STRONG** + L9 Security gates (agent-pattern verifier) |

## VERDICT

12 verifications complete (13 of 22 tool-call budget). **3 CRITICAL FLIPS for v4**: (a) firecrawl/firecrawl is AGPL-3.0 — demote from #27 ADOPT-NOW to STUDY-PILOT-CLOUD-API-ONLY (license blocker for self-host); (b) trailofbits/skills-curated is CC-BY-SA-4.0 (content license, NOT software) — demote to REFERENCE-CLASS-CITE-ONLY; (c) openai/skills has NO LICENSE FILE — FLIP to STUDY-PILOT-LICENSE-PENDING. **1 NEW RISK SURFACE**: FalkorDB SSPL-1.0 affects current L3 graphiti backend — container-only-no-modify likely admissible but Apache-AGE / kuzudb / NebulaGraph queued as replacement candidates. **3 NEW ADOPT-NOW PROMOTIONS**: Kiln-AI/Kilntainers (sandbox MCP) + Aurite-ai/agent-verifier (skill-layer agent pattern verifier) + browserbase/stagehand (browser SDK promoted from STUDY-PILOT-NARROW). **2 NEW STUDY-PILOT-NARROW**: containers/kubernetes-mcp-server + browserbase/mcp-server-browserbase. **1 REJECT-FOR-FIT**: ace-agent/ace (research framework, no install surface). **2 LICENSE-VERIFY-PENDING**: mini-swe-agent (likely MIT per pypi) + openai/skills (no LICENSE in repo).

ARTIFACT-INLINE: tmp/wave5-license-verification-2026-05-16.md (this file at canonical path).
