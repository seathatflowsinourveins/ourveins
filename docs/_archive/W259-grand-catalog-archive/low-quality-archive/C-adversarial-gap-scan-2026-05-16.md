# Wave 251 Agent C — Adversarial Gap Scan vs W237/W250/W219

Date: 2026-05-16  
Scope: W237/W250/W219 ADOPT-NOW / DEFER / REJECT catalog cross-validation  
Posture: adversarial; fail-closed where evidence is missing

## §0 STAND-IN-NOTICE / BRIDGE-MODE disclosure

[VERIFIED] This artifact was produced in the current Codex bridge session. I did not spawn a nested `codex exec` subprocess, so the `on_subprocess_failure` fail-closed clause was not triggered in this run. If the orchestrator requires a literal nested `codex exec` artifact rather than current-session Codex output, treat this report as STAND-IN-NOTICE and re-run through the foreground+tee path.

[VERIFIED] Local evidence read:

- `docs/outer research/research-wave-2026-05-15/01-fresh-research-wave-2026-05-16/B-fresh-2026-may-github-discovery-2026-05-16.md`
- `docs/outer research/research-wave-2026-05-15/01-fresh-research-wave-2026-05-16/C-codex-bridge-adversarial-2026-05-16.md`
- `docs/outer research/research-wave-2026-05-15/00-prior-research-baseline/A-existing-artifact-audit-2026-05-15.md`
- `docs/outer research/research-wave-2026-05-15/00-prior-research-baseline/B-memory-rag-sota-discovery-2026-05-15.md`

[VERIFIED] Live probes used `gh api`, `gh search repos`, and web search/open. Key current upstream metadata observed:

- `anthropics/claude-code-action`: 7,591 stars, pushed 2026-05-15, MIT, not archived.
- `modelcontextprotocol/servers`: 85,717 stars, pushed 2026-05-12, not archived, root LICENSE says MCP is transitioning MIT -> Apache-2.0.
- `getzep/graphiti`: 26,106 stars, pushed 2026-05-14, Apache-2.0, not archived.
- `BerriAI/litellm`: 47,135 stars, pushed 2026-05-16, GitHub API license NOASSERTION; root LICENSE is mixed with enterprise carveout.
- `mem0ai/mem0`: 55,805 stars, pushed 2026-05-16, Apache-2.0, not archived.
- `langchain-ai/langchain`: 136,828 stars, pushed 2026-05-16, MIT, not archived.
- `volcengine/OpenViking`: 23,965 stars, pushed 2026-05-15, AGPL-3.0, not archived.
- `topoteretes/cognee`: 17,249 stars, pushed 2026-05-15, Apache-2.0, not archived.

## §1 Axis 1 — Stale-verdict findings

| repo | last-verdict | stale-signal | recommended-action |
|---|---|---|---|
| `anthropics/claude-code-action` | W237 official candidate / ADOPT-side | No archive/deprecation signal; active 2026-05-15; MIT. Earlier concerns should be demand-fit, not stale-upstream. | KEEP candidate; gate by actual GitHub Actions workflow demand. |
| `modelcontextprotocol/servers` | W237/W219 canonical MCP baseline | Major license-transition signal: root LICENSE says MIT -> Apache-2.0 transition; GitHub API returns NOASSERTION. Repo is active/high-star. | REVALIDATE package-level licenses before pinning; do not treat root repo as simple MIT. |
| `getzep/graphiti` | W237 installed / memory KG incumbent | Active through 2026-05-14; no stale signal. Staleness is version-pin drift, not project health. | KEEP; verify latest package pin and backend/license choices. |
| `BerriAI/litellm` | cataloged gateway/cost/routing candidate | License is mixed/NOASSERTION at GitHub API; root LICENSE delegates enterprise subtree. Active, high-star. | HOLD for license-boundary read before any install beyond cite/pilot. |
| `mem0ai/mem0` | W250 memory/RAG pilot or install candidate | Active through 2026-05-16; Apache-2.0; no deprecation. Prior DEFER looks stale if target is pilot coverage. | PROMOTE to INSTALL-PILOT if memory eval demand exists; do not replace current Graphiti/mcp-memory stack without benchmark. |
| `langchain-ai/langchain` | framework/reference candidate | Active/high-star/MIT; no stale signal. But it is a framework pivot, not a Claude Code runtime primitive. | KEEP as CITE/STUDY unless explicit LangGraph workflow is adopted. |
| `volcengine/OpenViking` | W250/W168/W207 REJECT-FOR-FIT | Upstream activity increased, but license remains AGPL-3.0. The stale part is any Apache/permissive claim, not the reject. | REJECT-FOR-FIT remains correct under permissive-only posture. |
| `topoteretes/cognee` | W250 top reject / duplicate of Graphiti | Prior hard reject is stale: repo active, Apache-2.0, and current README/plugin evidence indicates Claude Code lifecycle hooks and graph/vector memory control-plane shape. | RECLASSIFY from hard REJECT to INSTALL-PILOT/DEFER-PILOT; benchmark against Graphiti/mem0 before default. |

## §2 Axis 2 — Missing-cohort gaps

### C2 arXiv 2026-Q1/Q2

Gap-found: YES.

Candidates/papers prior waves likely underweighted:

- `MPAC: A Multi-Principal Agent Coordination Protocol for Interoperable Multi-Agent Collaboration` (`arXiv:2604.09744`) — relevant because it explicitly positions MCP and A2A as insufficient for multi-principal coordination and reports coordination-overhead reductions. Candidate class: CITE/STUDY, not install.
- `LEMON: Learning Executable Multi-Agent Orchestration via Counterfactual Reinforcement Learning` (`arXiv:2605.14483`) — fresh orchestration paper with anonymous code link; under review/young, but relevant to orchestration policy search. Candidate class: CITE/STUDY.
- `Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems` (`arXiv:2604.14228`) — important architecture paper for Claude Code design surfaces: permission modes, compaction, MCP/plugins/skills/hooks, subagents, session storage. Candidate class: CITE-CANONICAL, not install.
- `Multi-Agent Orchestration for High-Throughput Materials Screening on a Leadership-Class System` (`arXiv:2604.07681`) — MCP server used as shared orchestration substrate for executor agents. Candidate class: domain-specific CITE.

### C7 conference proceedings

Gap-found: PARTIAL.

- ICML 2026 main proceedings are still a moving target on 2026-05-16; workshop/proceedings surfaces are more available than final installable repos.
- ICML/SCALE 2026 workshop scope strongly overlaps memory/context/agentic systems, but no clear install-class Claude Code primitive was verified from that workshop alone.
- Search surfaced ICML 2026 `MASPO` as a multi-agent prompt optimization paper with GitHub code and CC-BY-4.0 license; this is CITE/STUDY, not runtime install.
- ICLR 2026/Agents-in-the-Wild surfaces remain more concrete for `ace-agent/ace` and tool-use benchmarks than ICML/NeurIPS 2026 at this date.
- NeurIPS 2026 accepted proceedings are not available yet on 2026-05-16; treat any NeurIPS 2026 "accepted" install claim as [UNKNOWN] unless backed by a workshop/preprint page.

### C8 trending feeds

Gap-found: YES, but high-noise.

Live GitHub search and web/reddit scans found several May-2026 trending surfaces missed or under-classified:

- `github/github-mcp-server` — official GitHub MCP server, 29,868 stars, MIT, pushed 2026-05-15. Stronger candidate than legacy `@modelcontextprotocol/server-github` where official server is available.
- GitHub MCP secret scanning — GitHub changelog says GA on 2026-05-05, public preview since March 2026, and tied to Secret Protection. This is a provider-complement security gap, not a third-party package install.
- `jarrodwatts/claude-hud` — 22,876 stars, pushed 2026-05-13; status/context visibility plugin. Needs collision check against current statusline/rtk/ccusage stack.
- `thedotmack/claude-mem` — 75,997 stars, pushed 2026-05-15; likely inflated ecosystem stars, but native memory plugin path makes it a real pilot candidate, not a phantom.
- `ruvnet/ruflo` — 51,566 stars, pushed 2026-05-16; orchestration platform already in W250-like surfaces, but C8 confirms it is a live trend. Needs license/native-path/security probe before promotion.
- Reddit C8 signals surfaced `Maestro v1.6.1` cross-runtime orchestration (Claude Code + Gemini CLI + Codex) and `AOG`/multi-agent CLI orchestrators. Treat as discovery leads only; no ADOPT without repo/license/provenance probe.

## §3 Axis 3 — Phantom false-negative audit

[VERIFIED] No broad reversal of the W237 "phantom catch" class was found. Several phantom/coordinate warnings remain correct:

- `@anthropic/mcp-ast-grep` remains the wrong path; direct `ast-grep` CLI is the valid adoption path.
- `volcengine/OpenViking` is not phantom; it exists and is active, but remains REJECT-FOR-FIT under AGPL-3.0. If any prior artifact called it nonexistent rather than license-blocked, that is a classification wording bug.
- `@modelcontextprotocol/server-qdrant` remains a coordinate-risk pattern; prefer official package/source path such as `uvx mcp-server-qdrant` where verified.
- `supermemoryai/supermemory` marketplace/plugin-path claims still require exact path verification; absence of `.claude-plugin/marketplace.json` in a repo does not make the product phantom, but it blocks "native CC marketplace" claims.

False-negative candidates that deserve re-open:

| prior class | candidate | reason to re-open |
|---|---|---|
| REJECT/unknown install path | `github/github-mcp-server` | Official GitHub MCP server exists, active, MIT, and now includes secret-scanning surfaces. It should supersede older GitHub MCP coordinates where applicable. |
| REJECT duplicate | `topoteretes/cognee` | Active Apache-2.0 + Claude Code lifecycle plugin evidence makes "duplicate of Graphiti" too strong. It is at least a pilot/control-plane comparator. |
| DEFER/native path unclear | `thedotmack/claude-mem` | May-2026 trending and W250 mention indicate native memory plugin path; verify substance, but do not phantom-reject. |

[UNKNOWN] I did not find an MCP server previously classified REJECT-FOR-FIT that has since shipped first-party Claude Code plugin marketplace support and simultaneously cleared license/security/demand gates. The closest cases are cognee and claude-mem, which are memory/plugin pilots, not clean default installs.

## §4 Axis 4 — CR-12 re-audit top-3 rejects

### `volcengine/OpenViking` / openviking-rag

[VERIFIED] Correctly rejected under current permissive-only runtime posture. Live GitHub API reports `AGPL-3.0`, and direct LICENSE read begins with GNU Affero General Public License. Upstream activity and Claude Code plugin maturity do not remove the AGPL structural blocker.

Recommended disposition: REJECT-FOR-FIT unless the operator explicitly adopts AGPLv3-compatible runtime policy.

### `topoteretes/cognee`

[REFUTED-PARTIAL] "Superseded by Graphiti" is too coarse as a hard reject. Graphiti is a real-time temporal KG; cognee now presents as a broader memory control plane with graph/vector workflows and Claude Code plugin lifecycle hooks. It is still not a default replacement for Graphiti/mcp-memory/mem0 without benchmark evidence.

Recommended disposition: change from REJECT-FOR-FIT to INSTALL-PILOT or DEFER-PILOT with benchmark criteria: compaction survival, recall precision, local/offline behavior, hook noise, and overlap with Graphiti/mem0.

### W250 DEFER candidate incorrectly deferred?

[INFERRED] `mem0ai/mem0` and GitHub MCP secret scanning are the two strongest "DEFER -> ADOPT/PILOT" promotions:

- `mem0ai/mem0`: active, Apache-2.0, broad adoption, memory-native. Promote to INSTALL-PILOT if the runtime wants a 2026 memory benchmark lane.
- GitHub MCP secret scanning: official GitHub GA on 2026-05-05; should be PROVIDER-COMPLEMENT/ENABLE-CHECK, not generic DEFER, for repos with GitHub Secret Protection.

No W250 DEFER candidate was proven to deserve unconditional ADOPT-NOW without local demand and collision checks.

## §5 Axis 5 — Agent B candidate adversarial probes

Probe DAG 1-7 used here:

1. Primary source exists.
2. Active and not archived.
3. License acceptable for runtime install.
4. Native path fits Claude Code/MCP/CLI.
5. Non-duplicative against installed stack.
6. Security/operator boundary acceptable.
7. Demand evidence exists for eee/pure runtime.

| candidate | P1 | P2 | P3 | P4 | P5 | P6 | P7 | adversarial verdict |
|---|---|---|---|---|---|---|---|---|
| `containers/kubernetes-mcp-server` | PASS: repo + README + npm/PyPI/server manifests | PASS: pushed 2026-05-15, 1,593 stars | PASS: Apache-2.0 | PASS: MCP server, npm/PyPI, `server.json`/`manifest.json` | PASS: K8s/OpenShift control is not covered by current local browser/code tools | AMBER: powerful cluster CRUD/delete surface; must be kubecontext-scoped/read-only first | PASS if runtime manages K8s/OpenShift; otherwise DEFER | ADOPT-PILOT, not blind default. Require read-only kubeconfig and deny destructive verbs initially. |
| `browserbase/mcp-server-browserbase` | PASS: repo + README + hosted/self-hosted MCP | PASS: pushed 2026-05-07, 3,339 stars | PASS: Apache-2.0 | PASS: MCP server with SHTTP/STDIO, Browserbase/Stagehand | PARTIAL: overlaps Playwright/ChromeDevTools but adds cloud browser/session provider | AMBER: API key/SaaS boundary + browser data exfil risk | PASS only if cloud browser demand exists | STUDY/ADOPT-PILOT as provider-complement; reject as default if local-only policy. |
| `SWE-agent/mini-swe-agent` | PASS: repo + docs + PyPI | PASS: pushed 2026-05-07, 4,368 stars | PASS: MIT | PASS: CLI/Python package, not native CC plugin | PASS: eval/reference harness distinct from Claude Code runtime | PASS/AMBER: sandboxing and model API config must be isolated | PASS for SWE-bench regression/eval use | ADOPT-PILOT for eval harness, not as competing primary agent. |

Agent B overstatements:

- Kubernetes MCP is high-value but high-privilege; "ADOPT-NOW" must be constrained to read-only/source-probed pilot.
- Browserbase MCP is provider-complement, not a replacement for local Playwright/ChromeDevTools; reject if no SaaS/browserbase key policy.
- mini-swe-agent is excellent as a benchmark/control agent; adopting it as runtime agent framework would be scope creep.

Agent B candidates not in top-3:

- `GeniusHTX/SWE-Skills-Bench`: keep as ADOPT-EVAL/STUDY; 41 stars and young age block default install.
- `ace-agent/ace`: keep STUDY/INSTALL-PILOT for context engineering; no hard reject.
- `Kiln-AI/Kilntainers`: interesting sandbox MCP but only 40 stars and last pushed 2026-03-03; DEFER-PILOT until Windows/Podman and secret isolation are proven.
- `Aurite-ai/agent-verifier`: 38 stars, MIT, pushed 2026-05-01; useful as policy-skill lead but too young for ADOPT-NOW.
- GitHub MCP secret scanning: strongest provider-complement promotion; enable/check through official GitHub MCP if Secret Protection is available.

## §6 HONEST-NON-FINDING catalog

- [HONEST-NON-FINDING] No evidence that `anthropics/claude-code-action`, `getzep/graphiti`, `mem0ai/mem0`, or `langchain-ai/langchain` suffered archive/deprecation/star-collapse since W237/W250. Most drift is version/license/use-class, not project abandonment.
- [HONEST-NON-FINDING] No clean NeurIPS 2026 accepted/proceedings install-class agent primitive was verified by 2026-05-16.
- [HONEST-NON-FINDING] No prior AGPL/SSPL hard reject was found to have relicensed permissively. OpenViking remains AGPL-3.0.
- [HONEST-NON-FINDING] No "phantom MCP" class was broadly overturned. The actionable correction is narrower: distinguish nonexistent package coordinates from real repos that lack native plugin/package coordinates.
- [HONEST-NON-FINDING] No Agent B top-3 candidate is a clear REJECT-FOR-FIT. All three survive as pilots, but none should be installed as an unconstrained default.

## §7 VERDICT

VERDICT: NEEDS-REVISION — W237/W250/W219 remain directionally useful, but the catalog needs targeted corrections: keep OpenViking rejected for AGPL-3.0, reclassify cognee from hard REJECT to pilot comparator, promote GitHub MCP secret scanning and official `github/github-mcp-server` as provider/security complements, add under-fired 2026 arXiv/C8 orchestration leads as CITE/STUDY, and downgrade Agent B's Kubernetes/Browserbase/mini-swe recommendations from unconditional ADOPT-NOW to constrained pilots with privilege/API/eval boundaries.
