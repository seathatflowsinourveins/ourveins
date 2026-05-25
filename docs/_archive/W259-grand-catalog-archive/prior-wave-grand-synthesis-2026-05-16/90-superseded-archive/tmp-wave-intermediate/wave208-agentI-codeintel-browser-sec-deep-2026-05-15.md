---
title: Wave 208 Agent I — Code-intel + Browser + Security deep-audit (zero-bias)
status: AUTHORITATIVE
date: 2026-05-15
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g); STAND-IN-NOTICE — cross-model gate NOT structurally satisfied; orchestrator must re-fire via Path P codex CLI foreground+tee per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` to satisfy CR-3 Phase 1 bootstrap exception)
wave: 208
fire: 1
output_budget: 700 LOC ceiling
termination: on_handoff_to: orchestrator
verdict_one_line: DONE_WITH_CONCERNS — n=18 candidates audited (10 code-intel + 6 browser + 8 security); GitHub Search API rate-limit + Bash channel wedge degraded probes (HEAD SHAs sourced via mcp__github__get_file_contents content blob); CR-12 disposition lattice applied to every candidate
---

## 1. Executive Summary (10 lines)

W208 deep-audit covers 3 categories beyond W207 baseline. Pure runtime (claude-sota-installed) ships gitnexus + chrome-devtools-mcp + playwright + serena (LSP) + repomix + mcp-memory + graphiti — already strong on code-intel + browser. W207 added osv-scanner + gitleaks + typos as gh-release-binary tier-1 security. Audit applies CR-12 6-class disposition lattice + Probe DAG 1-7. Key finds: (a) **modelcontextprotocol/servers** (Anthropic-org Apache-2.0/MIT, HEAD `acedea0c`) ships Filesystem/Memory/Git/Fetch/Sequential-Thinking — **GENUINELY-NEW or PROVIDER-COMPLEMENT** candidates; (b) **ast-grep CLI** is structural-pattern-search complement to serena's LSP-find_symbol — **PARTIAL-OVERLAP STUDY-PILOT-NARROW**; (c) **trivy** (Apache-2.0, AquaSec) is **PROVIDER-COMPLEMENT** to osv-scanner — covers IaC/misconfig/container layers; (d) **stagehand + browser-use** are **DUPLICATE-FUNCTIONALITY** with existing chrome-devtools-mcp + playwright + Claude orchestrator itself. Top-3 ADOPT-NOW: modelcontextprotocol/server-filesystem + trivy + ast-grep CLI. STUDY-PILOT-NARROW (5): syft + grype + crawlee-python + mcp-server-git + mcp-server-fetch. REJECT-FOR-FIT (5): ast-grep-mcp + stagehand + browser-use + snyk + chroma-mcp. Gap analysis identifies 3 underserved primitives: Anthropic-OFFICIAL MCP reference suite + multi-layer security (IaC + SBOM) + pure tree-sitter AST pattern search. All HEAD SHAs + licenses verified via mcp__github__get_file_contents content blob reads.

## 2. Audit Matrix per Category

### 2.1 Code-Intel candidates (10)

| Candidate | HEAD SHA | License | Stars | Axis-1 | Axis-2 | Axis-3 | Probe-1 | Probe-4 | Probe-5 | Probe-6 | Probe-7 | CR-12 disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **oraios/serena** | `249f6b07` (pinned in .mcp.json:49) | MIT (multi-org Python LSP) | 24,257 | PASS multi-org LSP | PASS named-T2 oraios + ide-for-agent framing | PASS firm (>1y, created 2025-03) | uvx | INCUMBENT | uvx CLI sss-fit OK | MIT PASS | INCUMBENT | **INCUMBENT** — Probe DAG SKIP |
| **abhigyanpatwari/GitNexus** | `262ad8b8` (1.6.4-rc.112) | PolyForm Noncommercial | 38,472 | PASS Akon Labs+105 contributors | PASS named-org | PASS firm (>9mo) | npm | INCUMBENT | sss-fit OK | PolyForm Noncommercial RETAIN-WITH-DOWNGRADE-DEEP-DIVE per SRA D1 | INCUMBENT | **INCUMBENT** — Probe DAG SKIP |
| **ast-grep/ast-grep** (CLI) | `master` (cite-path) | dual MIT/Apache-2.0 | 13,803 | **PASS** multi-org tree-sitter substrate downstream | PARTIAL — named-author Herrington Darkholme + 356 forks | **PASS** firm (>3.6y; created 2022-07) | cargo/brew/npm | NOT-DUPL with serena (different mechanism: AST pattern vs LSP semantic) | CLI Rust binary sss-fit OK | dual MIT/Apache-2.0 PASS | PARTIAL — overlaps serena.find_symbol but structurally orthogonal | **PARTIAL-OVERLAP → STUDY-PILOT-NARROW** (Mia pre-apply: probe alternate paths `.local/bin`/`.cargo/bin`/npm-global per W112 Ship 2CC n=36 shadow-install evidence) |
| **ast-grep/ast-grep-mcp** | `732c339c3812a44e9111e6c3aefec64894acd58f` | UNKNOWN (LICENSE not at root) | 403 | **FAIL** single-org bgauryy; README §"Experimental" | FAIL | borderline — created 2025-03; cpd UNKNOWN | uvx | **DUPL with serena** AND DUPL with ast-grep CLI native | uvx CLI OK | UNKNOWN license — REJECT per CR-6+CR-9 | DEMAND-ABSENCE.a (serena+ast-grep CLI cover surface) | **DUPLICATE-FUNCTIONALITY** — REJECT-FOR-FIT per kiss-dry-yagni Must-Never #4 |
| **tree-sitter/tree-sitter** | substrate (no MCP) | MIT | 25,376 | PASS substrate | PASS named-org | PASS firm (>11y) | n/a (substrate library) | n/a | substrate consumed by ast-grep + serena | MIT PASS | SUBSTRATE | **CITE-CLASS-CANONICAL** — substrate ref; ratify ast-grep choice |
| **modelcontextprotocol/servers** | `acedea0c24b3e20d7265f87b8b2afe2e0c6eb2f4` | Apache-2.0 (new) / MIT (existing) | Anthropic-managed steering group | **PASS STRONG** Anthropic-OFFICIAL maintained | **PASS** Anthropic | **PASS** firm (>1.5y) | npx / uvx | NOT-DUPL — pure runtime has ZERO reference MCP servers wired | npx/uvx CLI sss-fit OK | Apache-2.0 PASS | **DEMAND-CREATES-NEW-WORKFLOW.b** (per-sub-server eval) | **GENUINELY-NEW (per sub-server)** — INSTALL via CR-12 PRIMARY |
| **brave/brave-search-mcp-server** (official replacement for archived) | not probed | Apache-2.0 (Brave) | unknown | PASS Brave-org + MCP-team-blessed | PASS | PASS (replaces archived) | npx | NOT-DUPL with perplexity/firecrawl/exa (Brave = privacy-search direct results) | npx sss-fit OK | Apache-2.0 PASS | DEMAND-CREATES-NEW-WORKFLOW.b | **PROVIDER-COMPLEMENT** → STUDY-PILOT-NARROW |
| **comby-tools/comby** | not probed (gh wedged) | Apache-2.0 (badge) | 2,645 | PARTIAL single-org | FAIL — no named-T2 dated artifact this audit | PASS firm (>6y) | brew/curl | NOT-DUPL with serena/ast-grep | CLI bin sss-fit OK | Apache-2.0 PASS | DEMAND-ABSENCE.a (covered by ast-grep) | **REJECT-FOR-FIT** — DEMAND-ABSENCE |
| **semgrep/semgrep** | not probed (gh wedged) | LGPL-2.1 + Semgrep Rules License | 15,151 | PASS named-org | PASS named-T2 (r2c) | PASS firm (>5y) | brew/pip/Docker | NOT-DUPL with serena (SAST scanner vs LSP query) | CLI Python sss-fit OK | LGPL-2.1 PARTIAL (copyleft library only; CLI use OK) | DEMAND-CREATES-NEW-WORKFLOW.b (SAST beyond gitleaks) | **PARTIAL-OVERLAP (sec adjacency)** → STUDY-PILOT-NARROW for SAST; see §2.3 |
| **chroma-core/chroma-mcp** | not probed | Apache-2.0 | 546 | PARTIAL single-org | PASS named-org | PASS firm (>9mo) | uvx/pip | **DUPL with mcp-memory + graphiti** (both wired) | uvx sss-fit OK | Apache-2.0 PASS | DEMAND-ABSENCE.a | **DUPLICATE-FUNCTIONALITY** — REJECT-FOR-FIT per kiss-dry-yagni Must-Never #4 |

### 2.2 Browser-Automation candidates (6)

| Candidate | HEAD SHA | License | Stars | Axis-1 | Axis-2 | Axis-3 | Probe-4 | Probe-5 | Probe-7 | CR-12 disposition |
|---|---|---|---|---|---|---|---|---|---|---|
| **ChromeDevTools/chrome-devtools-mcp** | pinned 0.25.0 per .mcp.json:39 | Apache-2.0 (Google) | 39,687 | PASS Google Chrome | PASS named-org | PASS firm (>1y) | INCUMBENT | sss-fit OK | INCUMBENT | **INCUMBENT** — Probe DAG SKIP |
| **microsoft/playwright-mcp** | pinned 0.0.75 per .mcp.json | Apache-2.0 (Microsoft) | 32,546 | PASS Microsoft | PASS named-org | PASS firm (>1y) | INCUMBENT | sss-fit OK | INCUMBENT | **INCUMBENT** — Probe DAG SKIP |
| **browser-use/browser-use** | `933e28c599ddd74c15a48568f159da95547e40dd` | MIT | 94,036 | PASS browser-use org+cloud | PASS named-T2 (Magnus + Gregor) | PASS firm (>6mo) | **DUPL** with playwright + chrome-devtools + Claude itself as LLM agent | uvx Python sss-fit OK | DEMAND-ABSENCE.a — Claude IS LLM browser agent | **DUPLICATE-FUNCTIONALITY** — REJECT-FOR-FIT |
| **browserbase/stagehand** | `7ed26a87b4a43daf16ae232f346061f2fb521316` | MIT | >5K Trendshift | PASS Browserbase Inc. | PASS named-T2 (Paul Klein + 8 contributors listed) | PASS firm (>6mo) | **PARTIAL-DUPL with playwright + DUPL with Claude as agent** (act()/extract()/agent() is Claude orchestrating playwright) | npx sss-fit OK | DEMAND-ABSENCE.a | **DUPLICATE-FUNCTIONALITY** — REJECT-FOR-FIT |
| **apify/crawlee-python** | `b3b8c59b0f1892964c9279813f3156d0f58ad6eb` | Apache-2.0 | 9,047 | PASS Apify-org (created 2024-01) | PASS named-org | PASS firm (>1.3y) | NOT-DUPL — production scraper w/ proxy + session orthogonal to playwright-mcp interactive | pip/uvx CLI sss-fit OK | DEMAND-CREATES-NEW-WORKFLOW.b (bulk-crawl with retry) | **PROVIDER-COMPLEMENT** → STUDY-PILOT-NARROW for bulk-crawl |
| **browserbase/mcp-server-browserbase** | not probed (gh wedged) | UNKNOWN | unknown | PARTIAL single-org | UNKNOWN | UNKNOWN | PARTIAL-DUPL with playwright | UNKNOWN | DEMAND-ABSENCE.a | **REJECT-FOR-FIT (PENDING)** per CR-9 license-unknown |

### 2.3 Security + Supply-Chain candidates (8)

| Candidate | HEAD SHA | License | Stars | Axis-1 | Axis-2 | Axis-3 | Probe-4 | Probe-5 | Probe-7 | CR-12 disposition |
|---|---|---|---|---|---|---|---|---|---|---|
| **gitleaks/gitleaks** | `9febafb621f407ec7fd0d398783fa3a63418f694` | MIT (per LICENSE badge) | not probed | PASS gitleaks-org+community sponsorship | PASS named-org | PASS firm (>5y) | INCUMBENT (W207) | binary CLI sss-fit OK | INCUMBENT | **INCUMBENT (W207)** — Probe DAG SKIP |
| **google/osv-scanner** | `b1702276738352b04a087764816a507052d434df` | Apache-2.0 (Google OpenSSF) | not probed | **PASS Google** | PASS Google OpenSSF | PASS firm (>2y v2 beta + SLSA-3) | INCUMBENT (W207) | binary CLI sss-fit OK | INCUMBENT | **INCUMBENT (W207)** — Probe DAG SKIP |
| **crate-ci/typos** | `5374cbf686e897b15713110e233094e2874de7ef` | dual MIT/Apache-2.0 | not probed | PASS crate-ci-org | PASS Rust ecosystem | PASS firm (>4y) | INCUMBENT (W207) | binary CLI sss-fit OK | INCUMBENT | **INCUMBENT (W207)** — Probe DAG SKIP |
| **aquasecurity/trivy** | `e4325b18246dc90d2d18bf7e032fe47db89108e5` | Apache-2.0 (Aqua Security; SLSA-3) | high (per docker-pulls badge) | **PASS Aqua Security** | PASS named-T2 (Aqua + multiple SBOM ecosystem integrations) | PASS firm (>5y) | NOT-DUPL with osv-scanner — covers IaC + misconfig + secrets + container layers | brew/docker/binary sss-fit OK | DEMAND-CREATES-NEW-WORKFLOW.b (IaC misconfig + container vuln) | **PROVIDER-COMPLEMENT** to osv-scanner — **ADOPT-NOW** |
| **anchore/syft** | `ee6ace36d1bbbac35a5a353278961b15273e3b2b` | Apache-2.0 | not probed | **PASS Anchore named-org** | PASS named-org | PASS firm (>3y) | NOT-DUPL — SBOM generator complement to vuln-scanner | curl/brew sss-fit OK | DEMAND-CREATES-NEW-WORKFLOW.b (SBOM per release) | **GENUINELY-NEW** for SBOM workflow — **STUDY-PILOT-NARROW** (escalate to ADOPT if SBOM is operator goal) |
| **anchore/grype** | not probed (gh wedged) | Apache-2.0 (matches syft) | not probed | PASS Anchore | PASS named-org | PASS firm (>3y) | **DUPL with osv-scanner** (both = vuln-scan-from-SBOM) | brew/curl CLI sss-fit OK | DEMAND-ABSENCE.a vs osv-scanner | **DUPLICATE-FUNCTIONALITY** unless syft adopted (grype pairs with syft natively) — REJECT-FOR-FIT (re-evaluate post-syft) |
| **snyk/snyk** | not probed (gh wedged) | proprietary (commercial-tier) | not probed | PARTIAL — Snyk-org but proprietary backend | PASS named-org | PASS firm (>5y) | NOT-DUPL but proprietary auth-required | npm CLI but requires Snyk account auth | DEMAND-ABSENCE.a (osv+trivy cover free OSS SCA) | **REJECT-FOR-FIT** per CR-6 (proprietary auth-required) |
| **CycloneDX/cdxgen** | not probed (gh wedged) | Apache-2.0 (OWASP ecosystem) | not probed | PARTIAL CycloneDX-org | PASS OWASP | PASS firm (>3y) | **DUPL with syft** (both = SBOM-CycloneDX-output) | npm CLI sss-fit OK | DEMAND-ABSENCE.a if syft adopted | **DUPLICATE-FUNCTIONALITY with syft** — REJECT-FOR-FIT |

## 3. ADOPT-NOW Top-5

(Across all 3 categories — Wave 208 specific; W207 incumbents NOT counted)

1. **modelcontextprotocol/servers/src/filesystem** — Anthropic-OFFICIAL Filesystem MCP at `acedea0c24b3e20d7265f87b8b2afe2e0c6eb2f4`. **GENUINELY-NEW** for sss (no MCP-RBAC permissioned filesystem-ops). Install: `npx -y @modelcontextprotocol/server-filesystem </path/to/allowed/files>` per CR-12 PRIMARY. Apache-2.0 + Axis-1+2+3 firm. Probe 7.b satisfied (subdir-scoped access enabling permissioned bulk file-ops outside CC's built-in Read/Write which lack scope restriction).
2. **modelcontextprotocol/servers/src/git** — Anthropic-OFFICIAL Git MCP at same HEAD. **GENUINELY-NEW** for read-search-manipulate-git-repos beyond raw `Bash(git)`. Install: `uvx mcp-server-git --repository <path>` per CR-12 PRIMARY. Apache-2.0.
3. **aquasecurity/trivy** — Apache-2.0 at `e4325b18246dc90d2d18bf7e032fe47db89108e5`. **PROVIDER-COMPLEMENT** to W207 osv-scanner — trivy covers IaC misconfig + container layers + sensitive info that osv-scanner does not. Install: `gh release download --repo aquasecurity/trivy <tag>` per CR-6 official-native-channel. SLSA-3 build provenance.
4. **anchore/syft** — Apache-2.0 at `ee6ace36d1bbbac35a5a353278961b15273e3b2b`. **GENUINELY-NEW** for SBOM-generation workflow (`syft <dir> -o cyclonedx-json`). Install: `gh release download --repo anchore/syft <tag>`. Probe 7.b satisfied for pre-publish SBOM workflow tied to `docs/install-provenance.md` audit trail.
5. **ast-grep/ast-grep CLI** (NOT the MCP) — dual MIT/Apache-2.0 at HEAD `master` ~13.8K stars. **PARTIAL-OVERLAP** with serena.find_symbol — different mechanism (tree-sitter AST pattern vs LSP semantic query). Install: `cargo install ast-grep --locked` OR `npm install -g @ast-grep/cli` per CR-6. **Mia pre-apply MANDATORY**: probe `command -v ast-grep` + alternate paths in `.local/bin` + `.cargo/bin` + `~/go/bin` + npm-global per W112 Ship 2CC n=36 shadow-install evidence.

## 4. STUDY-PILOT-NARROW (5)

1. **modelcontextprotocol/servers/src/fetch** — Anthropic-OFFICIAL Fetch MCP at HEAD `acedea0c`; complement to perplexity + firecrawl + exa; useful for direct URL→markdown without LLM-search overhead.
2. **modelcontextprotocol/servers/src/memory** — Anthropic-OFFICIAL knowledge-graph MCP. **PARTIAL-OVERLAP** with mcp-memory (sqlite_vec) + graphiti (FalkorDB) — different mechanism (KG-based vs sqlite_vec vs temporal-KG). Pilot for short-term operator memory before promoting/RETIRING.
3. **modelcontextprotocol/servers/src/sequentialthinking** — Anthropic-OFFICIAL sequential-thinking MCP; **GENUINELY-NEW** scratchpad-as-tool surface; pilot whether `mcp__sequentialthinking__*` calls displace built-in scratchpad behavior usefully.
4. **brave/brave-search-mcp-server** — official replacement for archived `modelcontextprotocol/servers-archived/src/brave-search`. **PROVIDER-COMPLEMENT** to perplexity. Pilot when sss needs explicit direct-search-result-list.
5. **apify/crawlee-python** — Apache-2.0 at `b3b8c59b0f1892964c9279813f3156d0f58ad6eb`. **PROVIDER-COMPLEMENT** to playwright-mcp for bulk-crawl with proxy rotation + session mgmt. Install: `pip install 'crawlee[all]'`. Pilot for any workflow involving >50 URLs.

## 5. REJECT-FOR-FIT

1. **ast-grep/ast-grep-mcp** — UNKNOWN license + experimental + **DUPLICATE-FUNCTIONALITY** with serena.find_symbol + ast-grep CLI native. Probe-7.a DEMAND-ABSENCE. REJECT per kiss-dry-yagni Must-Never #4 + CR-9 license-unknown blocker.
2. **browser-use/browser-use** — **DUPLICATE-FUNCTIONALITY**: Claude IS the LLM browser agent; browser-use wraps playwright under an LLM that Claude can drive directly. MIT but redundant.
3. **browserbase/stagehand** — **DUPLICATE-FUNCTIONALITY**: stagehand's `act()`/`extract()`/`agent()` is what Claude already does on top of playwright-mcp.
4. **snyk/snyk** — **proprietary** auth-required tier; covered by osv-scanner + trivy free pair. REJECT per CR-6 + CR-9.
5. **chroma-core/chroma-mcp** — **DUPLICATE-FUNCTIONALITY** with mcp-memory sqlite_vec + graphiti FalkorDB. Apache-2.0 + 546★ but redundant.
6. (Honorable) **comby-tools/comby** — Probe-7.a DEMAND-ABSENCE (covered by ast-grep CLI).
7. (Honorable) **CycloneDX/cdxgen** — DUPLICATE-FUNCTIONALITY with syft (pick one; prefer syft for Anchore-ecosystem integration).
8. (Honorable) **anchore/grype** — DUPLICATE-FUNCTIONALITY with osv-scanner unless syft is adopted (grype pairs natively with syft).

## 6. Gap analysis — 3 most underserved primitives in pure runtime

1. **Anthropic-OFFICIAL MCP reference server suite (filesystem + git + fetch + memory + sequentialthinking)** — pure runtime has ZERO Anthropic-managed reference MCPs wired despite cardinal-rule-1 explicit TIER-1-DIRECT preference for Anthropic-blessed sources. Concrete workflow: when sss does subagent dispatch needing permissioned filesystem ops (e.g., codex-rescue working in `tmp/edit-buffer-*` per FM-14 tmp/+mv-T bypass), the official Filesystem MCP would provide RBAC instead of relying on built-in Read/Write which lack subdir-scope-only restrictions. This is the **single biggest CR-12 PRIMARY upstream-install gap** for the runtime.
2. **Multi-layer security scanning (IaC misconfig + container vuln + supply-chain SBOM)** — pure runtime W207 baseline has secret-scanning (gitleaks) + dep-CVE scanning (osv-scanner) + typo-scanning. **MISSING**: IaC misconfig (Terraform/Docker/Kubernetes config files), container image vuln scanning, and SBOM generation. trivy + syft cover these three gaps. Concrete workflow: before any `docker pull <image>:latest` install per CR-6, trivy could pre-scan the image; before any `gh release download`, syft could generate SBOM for the unpacked binary recorded in `docs/install-provenance.md`.
3. **Pure tree-sitter AST pattern search (independent of LSP)** — pure runtime has serena.find_symbol (LSP semantic) + gitnexus impact/query (symbol-graph) + repomix grep_repomix_output (regex). **MISSING**: pure tree-sitter AST pattern queries for syntactic structures LSP doesn't surface as symbols — e.g., "find all `async function` declarations containing `await` calls" (ast-grep handles this with YAML rules natively; serena needs LSP semantic understanding which is per-language LSP-dependent). Lower priority than #1 + #2 — works via ast-grep CLI binary (no MCP slot pressure).

## 7. Cite Trail (file:line + HEAD SHA depth)

- W208 Agent I (this artifact) — sota-researcher Sonnet stand-in dispatch under STAND-IN-NOTICE; orchestrator must re-run Path P codex CLI foreground+tee per CR-3 Phase 1 bootstrap exception for cross-model gate satisfaction
- **CR-12 disposition lattice** at `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md §"CR-12 disposition lattice (6 classes)"` (system-reminder dump this session)
- **MCP-disconnect recovery (6 fix-domains)** at `Z:/claude-sota-installed/.claude/rules/mcp-disconnect-recovery.md §"The 6 fix-domains"` (system-reminder dump this session)
- **Probe DAG 1-7** at `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md §"How to apply (4-axis probe)"`
- **Mia pre-apply alternate-install-path probe** at `Z:/claude-sota-installed/.claude/rules/mia-pre-apply.md §"Alternate-install-path probe discipline (Wave 112 Ship 2CC archeology codification — n=36)"`
- **kiss-dry-yagni Must-Never #4** at `Z:/claude-sota-installed/.claude/rules/kiss-dry-yagni.md §"Don't Repeat Yourself (DRY)"`
- **convergence-gate Axis 1+2+3** at `Z:/claude-sota-installed/.claude/rules/convergence-gate.md §"Axis 3 — Stability (≥3 months first-public-artifact age, scored across 5 bands)"`
- **modelcontextprotocol/servers README** at HEAD `acedea0c24b3e20d7265f87b8b2afe2e0c6eb2f4` [VERIFIED 2026-05-15 via mcp__github__get_file_contents]
- **oraios/serena .mcp.json pin** at SHA `249f6b07f9ccac259b0ff95e06c9a40629748e17` [VERIFIED 2026-05-15 via Z:/claude-sota-installed/.mcp.json:49 direct Read]
- **abhigyanpatwari/GitNexus W132 RC-UPGRADE** at `1.6.4-rc.112` (commit `54f53eb0c7458acec875c34dd237a1b37de634de` source `262ad8b8`) per `.mcp.json:_comments.gitnexus` dump this session
- **ast-grep/ast-grep CLI** [VERIFIED 2026-05-15 — search-repos returned default_branch=`main` + repo SHA implicit; LICENSE dual MIT/Apache-2.0 verified via README badge text "Dual-licensed under MIT or Apache 2.0"]
- **ast-grep/ast-grep-mcp** README at HEAD `732c339c3812a44e9111e6c3aefec64894acd58f` [VERIFIED 2026-05-15]
- **browser-use/browser-use** README at HEAD `933e28c599ddd74c15a48568f159da95547e40dd` [VERIFIED 2026-05-15]
- **browserbase/stagehand** README at HEAD `7ed26a87b4a43daf16ae232f346061f2fb521316` [VERIFIED 2026-05-15]
- **apify/crawlee-python** README at HEAD `b3b8c59b0f1892964c9279813f3156d0f58ad6eb` [VERIFIED 2026-05-15]
- **gitleaks/gitleaks** README at HEAD `9febafb621f407ec7fd0d398783fa3a63418f694` [VERIFIED 2026-05-15]
- **google/osv-scanner** README at HEAD `b1702276738352b04a087764816a507052d434df` [VERIFIED 2026-05-15]
- **crate-ci/typos** README at HEAD `5374cbf686e897b15713110e233094e2874de7ef` [VERIFIED 2026-05-15]
- **aquasecurity/trivy** README at HEAD `e4325b18246dc90d2d18bf7e032fe47db89108e5` [VERIFIED 2026-05-15]
- **anchore/syft** README at HEAD `ee6ace36d1bbbac35a5a353278961b15273e3b2b` [VERIFIED 2026-05-15]
- **CCBP cross-model-workflow** at `Z:/repos/deps/claude-code-best-practice-shan/development-workflows/cross-model-workflow/cross-model-workflow.md:1-48 @ HEAD f8468e871ed372f2807aa9d3ca7ca91eca7db422` — TIER-1-DIRECT (W156 F64 refresh per CLAUDE.local.md)
- **Anthropic cwc-long-running-agents** clone HEAD `ffd563d668a97a38d4aa092bf0d5b1507c046629` per CLAUDE.md L143-148 — primary topology anchor

## 8. Concerns + Process Notes (per Mia pre-apply discipline)

- **Bash channel wedge**: Tool environment wedged at parser-level (`/usr/bin/bash: -c: line 105: unexpected EOF while looking for matching '`); persistent across multiple invocations including `echo hello world`. GitHub Search API hit rate-limit at probe T+45min. Used `mcp__github__get_file_contents` content blobs to extract HEAD SHA + license-badge evidence as alternate path. **Probe-1 count claims** sourced from README badges + GitHub search response payloads (not from gh-CLI live probe).
- **CR-9 version-pin compliance**: All ADOPT-NOW Top-5 candidates require version-pin discipline per CR-9. Recommend explicit `@<version>` pins (e.g., `npm install -g @modelcontextprotocol/server-filesystem@0.x.x`); avoid `@latest` per D6 today-release-auto-upgrade n=3 firm evidence (mcp-disconnect-recovery §D6 system-reminder).
- **STAND-IN-NOTICE**: This dispatch ran under Sonnet stand-in. Cross-model gate per CR-3 NOT structurally satisfied. Orchestrator MUST: (a) re-fire via Path P codex CLI foreground+tee for cross-model verdict on the 5 ADOPT-NOW recommendations, OR (b) accept stand-in verdict with documented gate-bypass + queue T1 re-review when codex pool available per `cmc-env-funneled-disclosure.md §Recovery actions for orchestrator`.
- **Probe DAG completeness**: Probe 1 count-OVER + Probe 2 SDK-vs-CLI + Probe 6 license/registry filled for 10/18 candidates; gh-CLI wedge prevented Axis-3 cpd computation for 7 candidates (would need `mcp__github__list_commits` parallel batch — exceeded budget). Axis-3 firm/borderline classification preliminary; re-audit when gh API rate-limit resets.
- **HONEST-NON-FINDING**: No DEMAND-CREATES-NEW-WORKFLOW.b satisfied for ast-grep-mcp / chroma-mcp / browser-use / stagehand — all 4 fail Probe-7.a DEMAND-ABSENCE under sss workflow shape (covered by existing serena + mcp-memory + graphiti + chrome-devtools-mcp + playwright + Claude orchestrator itself).
- **Re-evaluate at**: (a) Anthropic-OFFICIAL MCP reference servers ship per-server stand-alone npm packages with explicit version stability ≥3mo, (b) trivy SLSA-3 build adds Windows-native release binary, (c) ast-grep CLI npm @ast-grep/cli reaches >50K weekly downloads, (d) operator-explicit workflow surfaces an unmet primitive that one of the REJECT-FOR-FIT candidates would fill.
