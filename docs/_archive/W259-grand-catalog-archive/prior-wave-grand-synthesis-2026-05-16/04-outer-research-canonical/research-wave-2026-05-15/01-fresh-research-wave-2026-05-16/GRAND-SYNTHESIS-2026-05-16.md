---
title: "Wave 251 Grand Synthesis — Comprehensive Checklist"
date: 2026-05-16
status: GRAND-SYNTHESIS
target-runtime: "Z:/claude-sota-installed"
sources:
  - "A-existing-artifact-comprehensive-audit-2026-05-16.md"
  - "B-fresh-2026-may-github-discovery-2026-05-16.md"
  - "C-adversarial-gap-scan-2026-05-16.md"
  - "C-codex-bridge-adversarial-2026-05-16.md"
evidence-caveat: "The three exact Wave 250 paths named in the mission were not present at the requested location during this synthesis. Wave 250 carryover is synthesized from Agent A's audit and Agent C/Codex bridge line-cited summaries of W250 A1/A2/A3."
---

# Wave 251 Grand Synthesis — Comprehensive Checklist

## §0 — Wave Summary

### Agent A top findings

- Prior-art coverage is broad: W200-W250 contains 38 distinct waves and 180+ artifacts, with W237 as the corrected final baseline and W240/W241/W250 breaking the earlier saturation assumption.
- Catalog health is mixed: foundation, memory/RAG, orchestration, token optimization, code intelligence, security, hooks, and eval/observability are mostly covered, but several rows require version, license, or native-path revalidation before execution.
- High-priority audit gaps remain: Cohort C2 arXiv 2026-newest, Cohort C4 PapersWithCode, Cohort C7 2026 conference proceedings, post-W250 Claude Code ecosystem search, and Anthropic 2026-04 sandboxing release scan.
- Medium-priority gaps remain: browser MCP depth, OTel semantic-convention drift, multi-account auth fleet UI, container-aware code intelligence, Redis sidecar caching, DocAI bridge wiring, and CI/CD demand-gate closure.
- Integrity P0: `mksglu/context-mode` has a license dispute. W240/Codex bridge found ELv2 at root while W250/A-style npm evidence claimed MIT. Treat as unsafe until resolved.

### Agent B top-8 candidates and verdicts

| Rank | Candidate | Verdict | Reason |
|---:|---|---|---|
| 1 | `containers/kubernetes-mcp-server` | CONSTRAINED-PILOT | Strong K8s/OpenShift MCP gap closure; high-privilege cluster surface requires read-only kubecontext and deny destructive verbs first. |
| 2 | `browserbase/mcp-server-browserbase` | CONSTRAINED-PILOT | Cloud-browser provider complement beyond local Playwright/ChromeDevTools; requires SaaS/API-key and browser-data boundary review. |
| 3 | `SWE-agent/mini-swe-agent` | ADOPT-NOW | Use as compact SWE-bench/eval reference harness, not as competing primary agent runtime. |
| 4 | `GeniusHTX/SWE-Skills-Bench` | ADOPT-NOW | Use as eval/cite harness for measuring skill value; low stars block default runtime mutation but not eval adoption. |
| 5 | `ace-agent/ace` | CONSTRAINED-PILOT | ICLR 2026 context-engineering primitive; pilot as research import, not memory/RAG replacement. |
| 6 | `Kiln-AI/Kilntainers` | CONSTRAINED-PILOT | Relevant sandbox MCP; young/low-star and needs Windows/Podman/secret-isolation proof. |
| 7 | `Aurite-ai/agent-verifier` | CONSTRAINED-PILOT | Local policy/security verifier candidate; useful but too young for default install. |
| 8 | GitHub MCP secret scanning GA | ADOPT-NOW | Official provider complement; enable/check through GitHub MCP/Secret Protection if available. |

### Agent C adversarial corrections

- Keep `volcengine/OpenViking` rejected: active upstream does not remove AGPL-3.0 structural blocker.
- Reclassify `topoteretes/cognee` from hard REJECT to pilot comparator: active, Apache-2.0, and now has Claude Code lifecycle/plugin evidence; benchmark against Graphiti/mem0 before default.
- Promote `github/github-mcp-server` and GitHub MCP secret scanning as official provider/security complements; compare against legacy `@modelcontextprotocol/server-github` before locking old coordinates.
- Promote `mem0ai/mem0` to INSTALL-PILOT if memory eval demand exists; do not replace Graphiti/mcp-memory without benchmark.
- Downgrade Agent B's Kubernetes MCP, Browserbase MCP, and mini-swe-agent from unconditional ADOPT-NOW to constrained pilot/eval roles.
- Treat `modelcontextprotocol/servers` root license as transitioning MIT to Apache-2.0 with GitHub API `NOASSERTION`; revalidate package-level licenses.
- Hold `BerriAI/litellm` for mixed/NOASSERTION license-boundary review before install beyond cite/pilot.
- Treat weak three-org convergence claims as insufficient unless backed by dated independent org evidence; STRONG-PROVENANCE-EXPRESS is valid for official providers only.

### Wave 250 carryover actions still open

- Resolve `context-mode` MIT-vs-ELv2 dispute before any default install or catalog promotion.
- Revalidate `doobidoo/mcp-memory-service` pin: installed/W237 `10.51.3` versus W250-cited `10.57.x`.
- Revalidate `graphiti-core` pin and backend: avoid silent FalkorDB/SSPL default unless explicitly accepted.
- Keep `thedotmack/claude-mem` as head-to-head memory pilot, not default replacement.
- Add `tokscale` as cost-observability study complement to ccusage/Langfuse if license/package probe passes.
- Treat Anthropic-native context primitives as superior alternatives to lossy LLMLingua/leanctx-family compression, but verify current official API availability before implementation.
- Keep `trailofbits/skills-curated` cite/reference-only pending CC-BY-SA install semantics review.
- Verify package coordinates for Phoenix MCP, Logfire MCP, Langfuse MCP, ccusage MCP, promptfoo MCP, and protect-mcp before catalog execution.

## §1 — Grand Action Checklist

| Priority | Action | Source agent(s) | CR-12 disposition class | WIRED-DIFFICULTY | License | Status |
|---|---|---|---|---|---|---|
| P0 | Fix BRIDGE-MODE `codex exec` temp/app-server permissions before next synthesis wave. | B, C | PROVIDER-COMPLEMENT | P3=custom | N/A | BLOCKED-BRIDGE-MODE |
| P0 | Resolve `mksglu/context-mode` root-license dispute and remove from clean ADOPT-NOW until proven permissive. | A, C | PARTIAL-OVERLAP | P0=plugin | ELv2 = STRUCTURAL-BLOCKER/AMBER | OPEN |
| P0 | Quarantine `protect-mcp` until exact repo/package/license/install path is verified. | A, C-codex | GENUINELY-NEW | P1=pip+wire | UNKNOWN | OPEN |
| P0 | Remove FalkorDB as silent Graphiti backend unless SSPL acceptance is explicit. | C-codex | PARTIAL-OVERLAP | P1=pip+wire | SSPL = STRUCTURAL-BLOCKER | OPEN |
| P0 | Split the catalog into broad SOTA coverage and default runtime mutation rosters. | A, C-codex | CITE-CLASS-CANONICAL | P3=custom | N/A | OPEN |
| P0 | Reclassify `trailofbits/skills-curated` from install to cite/selective-import pending CC-BY-SA review. | C-codex | ECOSYSTEM-IMPORT | P0=plugin | CC-BY-SA-4.0 = AMBER | OPEN |
| P0 | Keep OpenViking rejected under permissive-only policy. | C | ECOSYSTEM-IMPORT | P2=clone+build | AGPL-3.0 = STRUCTURAL-BLOCKER | BLOCKED-LICENSE |
| P1 | Pilot Kubernetes MCP with read-only kubecontext and destructive-verb denylist. | B, C | GENUINELY-NEW | P1=pip+wire | Apache-2.0 = OK | OPEN |
| P1 | Compare official `github/github-mcp-server` against current GitHub MCP wiring. | C | PROVIDER-COMPLEMENT | P1=pip+wire | MIT = OK | OPEN |
| P1 | Enable/check GitHub MCP secret scanning through official GitHub MCP/Secret Protection. | B, C | PROVIDER-COMPLEMENT | P0=plugin | Provider feature | OPEN |
| P1 | Adopt `mini-swe-agent` as eval/reference harness outside default runtime mutation. | B, C | GENUINELY-NEW | P1=pip+wire | MIT = OK | OPEN |
| P1 | Adopt `SWE-Skills-Bench` as skill-value eval harness. | B | GENUINELY-NEW | P2=clone+build | MIT = OK | OPEN |
| P1 | Elevate browser automation into local-debug and cloud-provider subprofiles. | A, B, C | PROVIDER-COMPLEMENT | P1=pip+wire | Apache/MIT = OK | OPEN |
| P1 | Pilot Browserbase MCP only if SaaS/API-key boundary is accepted. | B, C | PROVIDER-COMPLEMENT | P1=pip+wire | Apache-2.0 = OK | OPEN |
| P1 | Pilot Stagehand as browser-agent SDK reference, not primary runtime. | B | PROVIDER-COMPLEMENT | P2=clone+build | MIT = OK | OPEN |
| P1 | Reclassify cognee from hard REJECT to benchmarked memory pilot comparator. | C | PARTIAL-OVERLAP | P1=pip+wire | Apache-2.0 = OK | OPEN |
| P1 | Promote mem0 to memory INSTALL-PILOT if benchmark demand exists. | C | PARTIAL-OVERLAP | P1=pip+wire | Apache-2.0 = OK | OPEN |
| P1 | Revalidate `mcp-memory-service` latest package pin before update. | A, C-codex | DUPLICATE | P1=pip+wire | Apache-2.0 = OK | OPEN |
| P1 | Revalidate Graphiti package pin and select permissive backend. | A, C-codex | DUPLICATE | P1=pip+wire | Apache-2.0 core = OK | OPEN |
| P1 | Reconcile W237 CLI/tool pins against current manifest/runtime pins. | C-codex | DUPLICATE | P0=plugin | MIT/Apache/BSD = OK | OPEN |
| P1 | Re-audit Anthropic official CI/CD candidates through demand gate. | A, C | PROVIDER-COMPLEMENT | P0=plugin | MIT = OK | OPEN |
| P1 | Audit package-level licenses for `modelcontextprotocol/servers` before pinning any root-repo package. | C | CITE-CLASS-CANONICAL | P1=pip+wire | MIT->Apache transition/NOASSERTION | OPEN |
| P2 | Run Cohort C2 arXiv 2026-newest crawl for install/cite candidates. | A, B, C | CITE-CLASS-CANONICAL | P2=clone+build | Mixed | OPEN |
| P2 | Run Cohort C4 PapersWithCode/benchmark winner verification. | A, B | CITE-CLASS-CANONICAL | P2=clone+build | Mixed | OPEN |
| P2 | Run Cohort C7 conference proceedings scan, with NeurIPS 2026 marked UNKNOWN until proceedings exist. | A, B, C | CITE-CLASS-CANONICAL | P2=clone+build | Mixed | OPEN |
| P2 | Pilot ACE as context-evolution research import with 30-day fit test. | B, C | GENUINELY-NEW | P2=clone+build | Apache-2.0 = OK | OPEN |
| P2 | Pilot Kilntainers only after Windows/Podman and secret-isolation proof. | B, C | GENUINELY-NEW | P1=pip+wire | MIT = OK | OPEN |
| P2 | Pilot agent-verifier as local policy/security skill. | B, C | GENUINELY-NEW | P0=plugin | MIT = OK | OPEN |
| P2 | Pilot `thedotmack/claude-mem` head-to-head against mcp-memory/Graphiti/mem0. | C, W250 carryover | PARTIAL-OVERLAP | P0=plugin | Apache-2.0 = OK | OPEN |
| P2 | Probe `tokscale` as cost-observability complement to ccusage/Langfuse. | C-codex, W250 carryover | PROVIDER-COMPLEMENT | P0=plugin | MIT = OK | OPEN |
| P2 | Audit `headroom` license/package path before any context-stack pilot. | C-codex, W250 carryover | PARTIAL-OVERLAP | P0=plugin | UNKNOWN | OPEN |
| P2 | Recheck OTel gen-AI semantic-convention maturity and OpenLLMetry/observability fit. | A, W250 carryover | PROVIDER-COMPLEMENT | P1=pip+wire | Mixed | OPEN |
| P2 | Resolve Phoenix wrapper/server split before observability catalog promotion. | C-codex | PROVIDER-COMPLEMENT | P1=pip+wire | ELv2 server = AMBER | OPEN |
| P2 | Hold LiteLLM for mixed-license boundary review. | C | PROVIDER-COMPLEMENT | P1=pip+wire | NOASSERTION/mixed = AMBER | OPEN |
| P2 | Verify Logfire MCP, Phoenix MCP, Langfuse MCP, ccusage MCP, and promptfoo MCP package coordinates. | C-codex, W250 carryover | PROVIDER-COMPLEMENT | P1=pip+wire | Mixed | OPEN |
| P2 | Deepen browser MCP ecosystem scan beyond Playwright/ChromeDevTools/Browserbase. | A, B | PROVIDER-COMPLEMENT | P1=pip+wire | Mixed | OPEN |
| P2 | Evaluate Redis sidecar caching against Anthropic prompt-cache/native context stack. | A | PARTIAL-OVERLAP | P1=pip+wire | BSD/Apache likely OK | DEFERRED |
| P2 | Wire DocAI bridge plan for PaddleOCR/textract only after demand confirmation. | A | GENUINELY-NEW | P2=clone+build | Apache/MIT likely OK | DEFERRED |
| P3 | Study MASFactory as graph-centric orchestration reference only. | B, C | PARTIAL-OVERLAP | P2=clone+build | Apache-2.0 = OK | DEFERRED |
| P3 | Study IBM mt-rag-benchmark as RAG diagnostic if current eval stack lacks coverage. | B | DUPLICATE | P2=clone+build | Apache-2.0 = OK | DEFERRED |
| P3 | Keep WildToolBench as cite/eval only until license is explicit. | B | CITE-CLASS-CANONICAL | P2=clone+build | UNKNOWN | DEFERRED |
| P3 | Keep XSkill deferred until license is explicit. | B | ECOSYSTEM-IMPORT | P2=clone+build | UNKNOWN | DEFERRED |
| P3 | Keep AgenticRAGTracer deferred until license/adoption improves. | B | PARTIAL-OVERLAP | P2=clone+build | UNKNOWN | DEFERRED |
| P3 | Keep cc-compact cite/template-only unless local hook demand emerges. | B | PARTIAL-OVERLAP | P0=plugin | MIT = OK | DEFERRED |
| P3 | Defer OAuth/RBAC multi-tenant Claude Code until single-tenant runtime demand changes. | A | GENUINELY-NEW | P3=custom | Mixed | DEFERRED |
| P3 | Defer full container/K8s/cloud runtime adoption beyond constrained Kubernetes MCP pilot. | A, B, C | GENUINELY-NEW | P3=custom | Mixed | DEFERRED |

## §2 — Stale Verdict Corrections

| Repo | Prior verdict | Corrected verdict | Evidence |
|---|---|---|---|
| `mksglu/context-mode` | W250-style MIT/ADOPT-NOW plugin candidate | REMOVE from clean ADOPT-NOW; ELv2-AMBER/CITE-ONLY until package-specific MIT proof exists | Agent A flags W240 ELv2 vs W250 MIT contradiction; Codex bridge license probe found root LICENSE ELv2/NOASSERTION. |
| `topoteretes/cognee` | Hard REJECT / duplicate of Graphiti | INSTALL-PILOT or DEFER-PILOT comparator | Agent C found active Apache-2.0 repo and Claude Code lifecycle/plugin evidence; benchmark against Graphiti/mem0. |
| `mem0ai/mem0` | DEFER or weak pilot | INSTALL-PILOT if memory benchmark demand exists | Agent C found active Apache-2.0, high adoption, no deprecation; do not replace incumbent stack without benchmark. |
| `volcengine/OpenViking` | Any permissive/Apache implication, but mostly REJECT-FOR-FIT | REJECT-FOR-FIT remains correct | Agent C confirms live AGPL-3.0; upstream activity does not remove license blocker. |
| `modelcontextprotocol/servers` | Simple MIT canonical MCP baseline | Revalidate package-level licenses before pinning | Agent C found root LICENSE transition MIT -> Apache-2.0 and GitHub API `NOASSERTION`. |
| `BerriAI/litellm` | Gateway/cost/routing candidate | HOLD for license-boundary read | Agent C found mixed/NOASSERTION license posture with enterprise carveout. |
| `anthropics/claude-code-action` | Possible stale/deprecated concern | KEEP candidate; gate by CI demand | Agent C found active 2026-05-15, MIT, not archived; stale concern is demand-fit, not upstream health. |
| `getzep/graphiti` | Installed/incumbent but possible stale | KEEP; verify latest package pin and backend/license choices | Agent C found active 2026-05-14, Apache-2.0; staleness is version/backend, not project health. |
| `github/github-mcp-server` | Missing/underweighted versus legacy GitHub MCP | ADOPT-NOW-COMPARE provider complement | Agent C found official GitHub MCP server active, MIT, high-star, and associated secret-scanning surface. |
| GitHub MCP secret scanning | Generic DEFER/security complement | ADOPT-NOW provider enable/check | Agent B and C cite GitHub GA on 2026-05-05; use if Secret Protection is available. |
| `FalkorDB/FalkorDB` | Silent Graphiti backend/install row | BLOCK or require explicit SSPL acceptance | Codex bridge license probe found SSPL. |
| `trailofbits/skills-curated` | W250 A2 install recommendation | CITE/reference or selective import pending legal review | Codex bridge found CC-BY-SA-4.0, not normal permissive code-install license. |
| `leanctx` / LLMLingua-family | ADOPT/PILOT token optimizer in some rows | REJECT/DEFER in favor of Anthropic native context primitives | W250 A3/Codex bridge says native prompt caching/clear/compact primitives supersede lossy compression. |
| `supermemoryai/supermemory` marketplace claim | Native marketplace/plugin candidate | REFUTED until exact marketplace path supplied | Codex bridge could not find `.claude-plugin/marketplace.json`; SaaS dependency remains. |
| `@arizeai/phoenix-docs-mcp` | MCP package coordinate | REFUTED coordinate until renamed/proven | Codex bridge npm E404. |
| `logfire-mcp` npm coordinate | npm package coordinate | REFUTED npm coordinate; Python repo may exist | Codex bridge npm E404 but `pydantic/logfire-mcp` repo/pyproject exists. |
| `@modelcontextprotocol/server-qdrant` | npm coordinate | REFUTED coordinate; use `uvx mcp-server-qdrant` if adopted | Codex bridge/W219 phantom-coordinate finding. |

## §3 — BRIDGE-MODE Infrastructure Gap

### FM-17.d root cause

Agent B attempted nested BRIDGE-MODE `codex exec` three times and failed before model execution with:

`failed to initialize in-process app-server client: Access is denied`

The likely root is local Codex app-server/temp wiring under `CODEX_HOME=Z:/claude-sota-installed-state/.codex`, specifically a tmp/arg0 directory permission or ACL problem. This is an infrastructure failure, not a model refusal and not a research verdict.

Impact:

- Agent B is a stand-in direct-research report, not a successful nested GPT-5.5 bridge artifact.
- Agent C was produced in the current Codex bridge session; if the orchestrator requires literal nested subprocess output, it must be rerun after the fix.
- Future BRIDGE-MODE waves risk silent downgrade to stand-in mode unless the local Codex temp/app-server path is repaired and smoke-tested.

Recommended fix steps before Wave 252:

1. Inspect effective `CODEX_HOME`, temp directory, and app-server socket/arg0 path used by `codex exec`.
2. Verify the account running `eee` has read/write/create/delete permission on `Z:/claude-sota-installed-state/.codex` and its temp/app-server subdirectories.
3. Remove or rename only stale Codex temp/app-server directories after confirming they are under `Z:/claude-sota-installed-state/.codex`; do not touch unrelated state.
4. Recreate the temp/app-server directory tree with inheritable permissions for the operator account.
5. Run a 30-second smoke command: `codex exec --ephemeral --ignore-rules --color never "Return JSON {\"bridge\":\"ok\"}"`.
6. Save stdout/stderr to `.claude/state/codex_bridge_smoke_2026-05-16_OUT.txt`.
7. Only after smoke PASS, rerun the Wave 251 adversarial or Wave 252 T1 foreground+tee path.

## §4 — Next Wave Recommendations

1. Fix BRIDGE-MODE first, then rerun a narrow Codex T1/adversarial pass on this grand synthesis.

2. Produce the W252 two-tier catalog:
   - Tier A: default runtime mutation candidates, limited to permissive-license, verified-native-path, low-collision rows.
   - Tier B: broad SOTA coverage, including pilots, cite-class papers, provider complements, and blocked-license rows.

3. Execute the P0/P1 cleanup queue before adding more installs:
   - Resolve `context-mode`, FalkorDB, `protect-mcp`, and Trail of Bits license/path issues.
   - Compare official GitHub MCP and enable/check secret scanning.
   - Pilot Kubernetes MCP, Browserbase, mini-swe-agent, and SWE-Skills-Bench with constrained credentials and eval-only boundaries.

GRAND-SYNTHESIS-VERDICT: NEEDS-REVISION-BEFORE-INSTALL — Wave 251 confirms the prior catalog is useful but not execution-ready. The next safe move is infrastructure repair plus P0 license/path cleanup, followed by constrained pilots for the strongest genuinely new candidates.

## §5 — Wave 252 Grand Synthesis Update

STAND-IN-NOTICE: FM-17.d BRIDGE-MODE remained blocked throughout Wave 252 because nested `codex exec` app-server initialization returned `Access is denied (os error 5)`. The Wave 252 artifacts are therefore stand-in reports under `cmc-env-funneled-disclosure.md`, not successful nested BRIDGE-MODE subprocess outputs.

### Arc Summary

Wave 252 completed three tracks:

- Track A: comprehensive multi-dimensional scoring of all SOTA repo candidates; artifact confirmed written by orchestrator handoff.
- Track B: BRIDGE-MODE stand-in GPT-5.5 deep-dive, fresh May 2026 GitHub discovery, and LLMLingua SOTA reset; artifact `02-wave252-fresh-2026-05-16/agent-reports/B-fresh-2026-may-github-discovery-2026-05-16.md`.
- Track C-narrow: license and install-path deep dive on six P0 blocker repos; artifact `02-wave252-fresh-2026-05-16/agent-reports/C-narrow-license-2026-05-16.md`.

Net result: Wave 252 narrows the default runtime path away from lossy external compression and toward Anthropic-native context lifecycle controls plus measured token-efficiency tooling, while resolving most of the P0 license blockers from the Wave 251 queue.

### Token And Context Verdict

Option B wins over Option A.

- Option A: LLMLingua / lossy compression stack. Rejected as default runtime posture.
- Option B: Anthropic-native prompt caching plus `/compact`, `/clear`, and explicit autocompact threshold control, supported by RTK, Repomix, and ccusage. Adopt as the May 2026 default token-efficiency posture.

`microsoft/LLMLingua` is now classified as CITE-ONLY / DO NOT DEFAULT. Track B confirmed the last commit as `e0e9d99` dated `2025-10-28`; the project remains useful for historical grounding and benchmark comparison, but it is stale relative to the May 2026 eee runtime path.

### License And Install-Path Decisions

`mksglu/context-mode` is rejected for default runtime adoption because Track C-narrow verified root `LICENSE` as Elastic License 2.0. It remains blocked unless a package-specific permissive license path is proven.

`AgusRdz/ctx` is the recommended MIT replacement candidate for the context-preservation niche. Classify it as STUDY-PILOT, not immediate default install, because Track C-narrow validated functional fit from the README and GitHub page but did not complete a full install/runtime probe.

Track C-narrow cleared 4/6 P0 blockers to ADOPT-NOW:

- `MemPalace/mempalace` — MIT / PERMISSIVE-PASS.
- `FoundationAgents/AOrchestra` — Apache-2.0 / PERMISSIVE-PASS.
- `covibes/zeroshot` — MIT / PERMISSIVE-PASS.
- `Enderfga/claw-orchestrator` — MIT / PERMISSIVE-PASS.

Track C-narrow rejected 1/6:

- `mksglu/context-mode` — ELv2 / REJECT-LICENSE.

Track C-narrow left 1/6 VERIFY-NEEDED:

- `ynulihao/AgentSkillOS` — README badge says MIT, but no root `LICENSE` file was found under the track rule. Keep blocked until root license or authoritative package license is verified.

### Study-Pilot Queue

Track B classifies the following as STUDY-PILOT rather than immediate default installs:

- `chopratejas/headroom` — context headroom / compression candidate.
- `yvgude/lean-ctx` — lean context candidate.
- `zjunlp/LightMem` — memory candidate; note LLMLingua-2 dependency.
- `griver/Q-RAG` — retrieval / compression-adjacent candidate.
- `MemPalace/mempalace` — license cleared by Track C-narrow; still needs fit benchmark before default runtime mutation.
- `ynulihao/AgentSkillOS` — functionally interesting, but license remains VERIFY-NEEDED.
- `FoundationAgents/AOrchestra` — license cleared by Track C-narrow; still benchmark before default orchestration mutation.
- `AgusRdz/ctx` — permissive replacement candidate for rejected `context-mode`.

### Remaining Gaps

- C2 arXiv 2026-newest cohort remains P2 OPEN.
- C4 PapersWithCode / benchmark-winner cohort remains P2 OPEN.
- C7 conference-proceedings cohort remains P2 OPEN.
- C9 top-100 GitHub scan remains incomplete; unverified C9 rows must stay DO-NOT-DEFAULT until source, license, install path, and benchmark relevance are checked.

WAVE-252-VERDICT: STAND-IN-COMPLETE — all three Wave 252 tracks are complete. LLMLingua is CITE-ONLY, `context-mode` is rejected for ELv2, `AgusRdz/ctx` is the MIT study-pilot replacement, Option B Anthropic-native context lifecycle wins over lossy compression, 4/6 Track C blockers are ADOPT-NOW, 1/6 is rejected, 1/6 remains VERIFY-NEEDED, and C2/C4/C7 plus C9 remain open follow-up gaps.

## §6 — Wave 253 Grand Synthesis Update

Wave 253 re-ran the pure-SOTA runtime selection to escape W251/W237 prior-research bias. The requested Phase C background output was empty, Agent A's requested artifact path was absent, and Agent B's fresh discovery artifact was available. Nested Codex consensus remained blocked by `Access is denied (os error 5)`, so Wave 253 remains an AUTHORITATIVE stand-in synthesis rather than a clean nested-Codex verdict.

Primary corrections:

- `firecrawl/firecrawl` is overturned from ADOPT-NOW to DEFER because the adversarial review verified AGPL-3.0.
- `volcengine/OpenViking` remains DEFER despite a verified Claude Code memory plugin path because AGPL-3.0 is hard-blocked.
- Unknown-license rows are not default-install candidates; MIT/Apache verification is mandatory before adoption.
- Awesome lists are discovery inputs, not install primitives.
- Already-installed primitives such as Codex, Repomix, Serena, and Superpowers should be refresh-audited rather than duplicated.

High-signal additions missed by Agent B:

- `openai/codex-plugin-cc` — direct Apache-2.0 Claude Code plugin for Codex.
- `obra/superpowers` — MIT cross-agent plugin/skill surface; refresh-audit.
- `addyosmani/agent-skills` — MIT Claude skill/command workflow pack; study-pilot.
- `anthropics/skills` — official skill corpus; policy/license review before install.
- `anthropics/cwc-long-running-agents` — Apache-2.0 official low-star exception for long-running agent patterns.
- `modelcontextprotocol/registry` — MCP provenance/governance pilot.

Wave 253 install sequence: repair Codex consensus first; refresh Codex plugin/Superpowers/Repomix/Serena next; then pilot Claude-native skills and agents; then run browser, ingestion, memory, and framework pilots under permission and duplicate-functionality gates.

WAVE-253-VERDICT: GRAND-SYNTHESIS-COMPLETE — the final artifact is `tmp/wave253-C-grand-synthesis-2026-05-15.md`. Confidence is 0.86 because the synthesis corrects the major license, native-path, and duplicate-install risks, while cross-model consensus remains a stand-in due the Codex subprocess environment failure.
