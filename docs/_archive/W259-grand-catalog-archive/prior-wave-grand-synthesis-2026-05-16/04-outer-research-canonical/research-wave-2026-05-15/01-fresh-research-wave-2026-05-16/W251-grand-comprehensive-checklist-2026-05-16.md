---
title: "Wave 251 Grand Comprehensive Checklist"
date: 2026-05-16
status: GRAND-SYNTHESIS
target-runtime: "Z:/claude-sota-installed"
branch: "w194-glob-narrow"
sources:
  - "Agent A: A-existing-artifact-comprehensive-audit-2026-05-16.md"
  - "Agent B: B-fresh-2026-may-github-discovery-2026-05-16.md"
  - "Agent B follow-up: B-fresh-github-discovery-2026-05-16.md"
  - "Agent C: C-codex-bridge-adversarial-2026-05-16.md"
  - "W237: tmp/wave237-CORRECTED-FINAL-SYNTHESIS-Pattern-A-fix-forward-2026-05-15.md"
---

# Wave 251 Grand Comprehensive Checklist

## Section 0 — Wave 251 Methodology + Agent Coverage

STAND-IN-NOTICE: nested `codex exec` bridge-mode was unavailable for Agent B. Agent B reports 3/3 failures before model execution with `failed to initialize in-process app-server client: Access is denied`. Agent C was produced in the current Codex bridge session, not by a nested subprocess. This checklist therefore treats Agent C as the adversarial correction layer and Agent B as a stand-in fresh-discovery report.

Coverage used:

| Input | Status | What was used |
|---|---|---|
| Agent A task output `a910e748e6402f325.output` | zero-byte placeholder | Used written deliverable `A-existing-artifact-comprehensive-audit-2026-05-16.md` instead. |
| Agent B task output `a922fbcc81d03c94b.output` | zero-byte placeholder | Used written deliverable `B-fresh-2026-may-github-discovery-2026-05-16.md` instead. |
| Agent B duplicate `bkaiwmey9.output` | background-task marker only | Contains only `Codex Task started in the background as task-mp7oqs8h-6qwmbl`; substantive content is in the written Agent B follow-up deliverable. |
| Agent B requested filename `B-fresh-github-discovery-2026-05-16.md` | present | Written at the requested path; adds a separate GitHub-only discovery cohort with score >=7 candidates not covered by the earlier Agent B file. |
| Agent C deliverable | present | Used as adversarial gate for license, convergence, native path, and catalog-ceiling corrections. |
| W237 catalog | present | Used as baseline only; rows with C blockers are removed or demoted below. |

Method:

1. Read Agent A prior-art audit to identify coverage depth, known gaps, and W237/W240/W241/W250 drift.
2. Read Agent B fresh May-2026 discovery to extract new candidates scored 7+ and study-pilot candidates.
3. Read Agent C adversarial validation to remove license blockers, phantom coordinates, weak convergence rows, and stale install assumptions.
4. Read W237 roster to retain only post-adversarial survivors.
5. Live metadata spot-check was run with `gh api repos/<owner>/<repo>` for stars/license/pushed-at on survivor and Agent B candidate tables. License blocker file probes used `gh api repos/<owner>/<repo>/license`.

Important synthesis rule: W237's "31+3" is retained as historical baseline, not as an execution catalog. Agent C's finding stands: the ceiling is too low for catalog coverage and too loose for default installs. W251 splits "catalog coverage" from "default install".

## Section 1 — License Blockers (items to REMOVE from catalog)

These rows must not appear in ADOPT-NOW default install without explicit legal acceptance and a revised use-class statement.

| Candidate | Prior catalog claim | Confirmed source | Disposition |
|---|---|---|---|
| `mksglu/context-mode` | W250 A3 claimed MIT via npm and ADOPT-NOW plugin path. | Agent C license probe: `gh api repos/mksglu/context-mode/license`, path `LICENSE`, SPDX `NOASSERTION`, sha `15259beb88afda1c8790d41cdf948c9e0e4f211d`; text begins Elastic License 2.0. Live repo metadata: 14,827 stars, license `NOASSERTION`. | REMOVE from ADOPT-NOW. Reclassify as ELv2-AMBER/CITE-ONLY unless npm package is separately and explicitly MIT-licensed with provenance. |
| `FalkorDB/FalkorDB` | W237 Phase 1 installed backend for Graphiti. | Agent C license probe: `gh api repos/FalkorDB/FalkorDB/license`, path `LICENSE.txt`, SPDX `NOASSERTION`, sha `ea3921393f6e67e6128cd5d76092c7ba73ac78ef`; text begins Server Side Public License. Live repo metadata: 4,415 stars. | REMOVE as silent default backend. Use Graphiti with a permissive backend, or record explicit SSPL acceptance. |
| `Arize-ai/phoenix` server | W250 A3 treated Phoenix as observability ADOPT-NOW with ELv2 caveat. | Agent C license probe: `gh api repos/Arize-ai/phoenix/license`, path `LICENSE`, SPDX `NOASSERTION`, sha `23d3aa7c871a4eb153186073e3d2b72d586f64be`; root server license ELv2. | Remove Phoenix server from clean ADOPT-NOW. Phoenix MCP wrapper may remain AMBER only if wrapper license/package is separately verified and server use-class is accepted. |
| `trailofbits/skills-curated` | W250 A2 recommended install as security-vetted skills. | Live license probe: `gh api repos/trailofbits/skills-curated/license`, path `LICENSE`, SPDX `CC-BY-SA-4.0`, sha `23105592d19959598be38e568302be19c922bdfe`. | Remove from code-install ADOPT-NOW. Keep as reference/cite-only or selective import after CC-BY-SA review. |

## Section 2 — Confirmed ADOPT-NOW (post-adversarial-review survivors, with Axis-1 evidence)

Criteria for this section: permissive or acceptable license, verified repo, concrete native install path, and at least three Axis-1 evidence surfaces. "Axis-1 orgs" below means named independent source/org surfaces observed in W237/W250/W251 or official-provider equivalents under STRONG-PROVENANCE-EXPRESS.

| Candidate | Repo | Stars | License | Axis-1 orgs / surfaces (>=3) | Install path | W251 action |
|---|---|---:|---|---|---|---|
| Memory MCP | `doobidoo/mcp-memory-service` | 1,843 | Apache-2.0 | Heinrich Krupp/doobidoo; SHODH ecosystem; Claude/MCP users; W250 benchmarks | `pip install mcp-memory-service`; `.mcp.json` stdio server | KEEP-INSTALLED; update pin from W237 `10.51.3` to latest verified `10.57.x` after package probe. |
| Temporal KG memory | `getzep/graphiti` | 26,106 | Apache-2.0 | Zep/getzep; arXiv 2501.13956; MCP/agentic-memory ecosystem | `pip install graphiti-core`; `python -m graphiti_core.mcp` | KEEP, but remove FalkorDB as silent backend. Prefer Neo4j/Kuzu/Postgres-compatible backend unless SSPL accepted. |
| Codebase packer | `yamadashy/repomix` | 24,892 | MIT | yamadashy; Claude plugin marketplace path; MCP/codebase-context users | `/plugin marketplace add yamadashy/repomix`; install `repomix-mcp`, commands, explorer | ADOPT-NOW; permissive replacement for context-mode default path. |
| Symbol code-intel MCP | `oraios/serena` | 24,271 | MIT | Oraios; LSP/code-intel users; Claude Code MCP community | `uv tool install -p 3.13 serena-agent@latest --prerelease=allow`; add MCP | ADOPT-NOW as code-intel/token-efficiency complement. |
| Observability core | `langfuse/langfuse` | 27,283 | NOASSERTION in GitHub API; W250 says MIT core with `ee/` commercial | Langfuse org; MCP endpoint; agent observability/eval users | Docker Compose self-host or Cloud; `claude mcp add langfuse --transport http ...` | ADOPT-NOW only as MIT-core with EE exclusion documented. |
| Eval/red-team harness | `promptfoo/promptfoo` | 21,290 | MIT | promptfoo/OpenAI-backed; OWASP/eval community; MCP/agent SDK path | `npm install -g promptfoo`; `claude mcp add promptfoo -- promptfoo mcp` | ADOPT-NOW. |
| Claude usage telemetry | `ryoppippi/ccusage` | 14,222 | NOASSERTION in GitHub API; W250 says MIT | ryoppippi; Claude Code session-jsonl users; `@ccusage/mcp` package path | `npx ccusage@latest`; `claude mcp add ccusage -- npx -y @ccusage/mcp` | ADOPT-NOW after direct LICENSE/package probe; already operationally useful. |
| Browser debugging MCP | `ChromeDevTools/chrome-devtools-mcp` | 39,717 | Apache-2.0 | Chrome DevTools org; MCP ecosystem; browser automation/debug users | `claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp` or incumbent `.mcp.json` path | ADOPT-NOW; elevate to first-class browser-debug category. |
| Agent/skills marketplace | `wshobson/agents` | 35,459 | MIT | wshobson marketplace; Ryan Snodgrass/cskwork/plugin-eval sources pending; Claude plugin users | `/plugin marketplace add wshobson/agents`; install only source-audited plugins | ADOPT-NOW only for audited subset; F14 source-audit remains mandatory before Phase 4 install. |
| PII redaction | `microsoft/presidio` | 8,075 | MIT | Microsoft; PII/privacy users; Python package ecosystem | `pip install presidio-analyzer presidio-anonymizer presidio-structured` | ADOPT-NOW if W233-X data-path demand is confirmed. |
| Vulnerability scanning | `google/osv-scanner` | 10,193 | Apache-2.0 | Google OSV; package ecosystem; CI/security users | `go install github.com/google/osv-scanner/v2/cmd/osv-scanner@latest` or release binary | ADOPT-NOW; reconcile W237 pin vs manifest pin. |
| Typo/secrets-adjacent lint | `crate-ci/typos` | 3,943 | Apache-2.0 | crate-ci; Rust/dev-tooling users; pre-commit/CI ecosystem | `cargo install typos-cli` or release binary | ADOPT-NOW. |

Rows intentionally excluded from this survivor table:

- `context-mode`: ELv2 blocker.
- `FalkorDB`: SSPL blocker.
- `protect-mcp`: coordinate unresolved.
- `microsoft/acon`, `leanctx`, `ace-agent/ace` as W237 ADOPT-NOW: demoted or handled in fresh/pilot sections.
- `Phoenix` server: ELv2-AMBER, not clean default install.

## Section 3 — Fresh Discoveries from Agent B (new candidates scored 7+)

Scores are W251 synthesis scores on 0-10 adoption value, combining Agent B SRA, license, stars, freshness, runtime fit, and Agent C's adversarial constraints.

| Score | Candidate | Repo | Stars | License | Rationale | Install/probe path | W251 disposition |
|---:|---|---|---:|---|---|---|---|
| 9.2 | Kubernetes MCP Server | `containers/kubernetes-mcp-server` | 1,593 | Apache-2.0 | Strongest under-fired container/K8s gap closure; Red Hat/containers provenance; active 2026. | Add as MCP after cluster/context sandbox review. | ADOPT-NOW-PROBE. |
| 9.1 | Browserbase MCP | `browserbase/mcp-server-browserbase` | 3,339 | Apache-2.0 | Cloud-browser provider complement beyond local Playwright/Chrome DevTools; strong native MCP fit. | Browserbase MCP install with API key boundary documented. | ADOPT-NOW-PROBE if SaaS boundary accepted. |
| 9.0 | Stagehand | `browserbase/stagehand` | 22,673 | MIT | Mature browser-agent SDK; pairs with Browserbase MCP; strong ecosystem signal. | SDK/tooling pilot, not default MCP. | ADOPT-NOW-PROBE as browser automation reference. |
| 9.0 | mini-swe-agent | `SWE-agent/mini-swe-agent` | 4,368 | MIT | Compact SWE-bench/SWE-bench Live reference harness for regression comparisons. | Clone or install per repo; keep outside runtime mutation first. | ADOPT-NOW-EVAL. |
| 8.8 | GitHub MCP Server | `github/github-mcp-server` | 29,868 | MIT | Agent C hidden-gem: likely superior to older `@modelcontextprotocol/server-github`; official GitHub provenance. | Compare against current GitHub MCP wiring; migrate if feature parity and auth are cleaner. | ADOPT-NOW-COMPARE. |
| 8.7 | Context7 | `upstash/context7` | 55,389 | MIT | Already manifest-adjacent; should be elevated as doc-context primitive, not buried starter MCP. | Existing hosted context7 path or MCP install. | ADOPT-NOW-CATEGORY-ELEVATION. |
| 8.4 | ACE | `ace-agent/ace` | 1,079 | Apache-2.0 | ICLR 2026 Agentic Context Engineering; context-evolution research primitive. | Direct clone / skill extraction pilot. | STUDY-PILOT-to-ADOPT after 30-day fit test. |
| 8.2 | SWE-Skills-Bench | `GeniusHTX/SWE-Skills-Bench` | 41 | MIT | Directly evaluates skill value on SWE tasks; low stars but strong task fit. | Clone as eval dataset/harness. | ADOPT-NOW-EVAL, not runtime install. |
| 8.0 | Kilntainers | `Kiln-AI/Kilntainers` | 40 | MIT | Agent sandboxing gap; young but direct fit for ephemeral shell isolation. | Isolated Windows/Podman pilot only. | STUDY-PILOT with security sandbox. |
| 7.8 | agent-verifier | `Aurite-ai/agent-verifier` | 38 | MIT | Safety/policy verifier candidate; fits hallucinated-tool and retry-loop checks. | Evaluate as local skill/hook, no broad install first. | STUDY-PILOT. |
| 7.5 | Claude-mem | `thedotmack/claude-mem` | 75,997 | Apache-2.0 | W250 A1 high-signal Claude memory plugin; native marketplace path exists; overlaps doobidoo. | `/plugin marketplace add thedotmack/claude-mem`; install only in head-to-head pilot. | STUDY-PILOT due overlap/token-affiliation caveat. |
| 7.2 | Tokscale | `junhoyeo/tokscale` | 2,952 | MIT | Cross-CLI token/cost scan complements ccusage and Langfuse. | `npx tokscale`/CLI only. | STUDY-PILOT. |
| 7.0 | wshobson agent/skill pack | `wshobson/agents` | 35,459 | MIT | Agent B follow-up marks this GENUINELY-NEW versus W237: dense Claude Code subagent/command/skill orchestration pack. | Quarantined source audit, then `/plugin marketplace add wshobson/agents` or selective extraction only after provenance review. | ADOPT-NOW-AUDITED-SUBSET; already elevated in Section 2, now tied to the follow-up discovery source. |
| 7.0 | get-shit-done | `gsd-build/get-shit-done` | 62,471 | MIT | GENUINELY-NEW lightweight meta-prompting/context/spec workflow surface; overlaps Spec-Kit conceptually but may contribute smaller prompt primitives. | Clone/read-only provenance review; compare primitives against Spec-Kit before any install. | STUDY-PILOT-to-ADOPT if it reduces workflow ceremony without duplicating Spec-Kit. |
| 7.0 | Graphify | `safishamsi/graphify` | 48,377 | MIT | GENUINELY-NEW local graph surface for code/schema/infrastructure/docs/media; potentially complementary to GitNexus/Graphiti rather than duplicate. | Local install probe against a non-sensitive repo; compare graph ingestion/query value against GitNexus and Graphiti. | STUDY-PILOT as graph-intel complement. |
| 7.0 | antigravity-awesome-skills | `sickn33/antigravity-awesome-skills` | 37,635 | MIT | GENUINELY-NEW high-recall cross-agent skill catalog; useful as a mining surface, not a bulk install source. | Curated subset sampling only with license/provenance checks per skill. | CURATED-MINING-SOURCE; no bulk install. |
| 7.0 | last30days-skill | `mvanhorn/last30days-skill` | 25,906 | MIT | GENUINELY-NEW research synthesis skill matching recurring fresh-discovery waves. | Source audit and isolated skill install/probe on research-wave workflow. | ADOPT-NOW-PROBE for research automation if provenance passes. |
| 7.0 | cc-switch | `farion1231/cc-switch` | 71,863 | MIT | GENUINELY-NEW operator UX for cross-provider/session switching; distinct from CLIProxyAPI routing. | Desktop/provider boundary review; keep outside install-only runtime unless operator demand is explicit. | OPERATOR-UX-PILOT, not default runtime install. |

## Section 4 — STUDY-PILOT Candidates (score 5-6, promising but needs more validation)

| Score | Candidate | Repo/source | License | Reason to study | Blocker before ADOPT-NOW |
|---:|---|---|---|---|---|
| 6.8 | MASFactory | `BUPT-GAMMA/MASFactory` | Apache-2.0 | arXiv 2603.06007 graph-centric orchestration; useful reference. | Overlaps existing orchestration; needs demand trigger. |
| 6.7 | IBM mt-rag-benchmark | `IBM/mt-rag-benchmark` | Apache-2.0 | Multi-turn RAG diagnostic from IBM source. | Duplicate functionality against W250 RAG/eval surface. |
| 6.5 | GAIA agent scaffold | `gaia-agent/gaia-agent` | Apache-2.0 | GAIA-ready harness candidate. | Low maturity/adoption; not benchmark leader. |
| 6.3 | parallel-browser-mcp | `etairl/parallel-browser-mcp` | Apache-2.0 | Parallel browser automation fills concurrency niche. | Early project; Browserbase/ChromeDevTools cover default need. |
| 6.2 | Piebald tweakcc | `Piebald-AI/tweakcc` | MIT | Agent C hidden-gem search found 2,016 stars and same-day push. | Needs full Probe DAG/license/path audit. |
| 6.1 | stablyai orca | `stablyai/orca` | MIT | Agent C hidden-gem search found 2,553 stars and same-day push. | Needs full audit; likely duplicate until proven otherwise. |
| 6.0 | MCP Runtime | `Agent-Hellboy/mcp-runtime` | MIT | K8s-native MCP broker/control plane concept. | Zero-star/no-adoption signal in Agent B. |
| 5.8 | cc-compact | `hiiamtrong/cc-compact` | MIT | Hook/precompact idea may inform local hooks. | Tiny/zero-star surface; cite/template only. |
| 5.5 | presidio-hardened-x402 | `presidio-v/presidio-hardened-x402` | UNKNOWN | PII pattern for agentic payments. | Domain-specific and license unresolved. |

## Section 5 — REJECT / VERIFIED-AVOID (confirmed bad candidates with reason)

| Candidate | Reason | Source |
|---|---|---|
| `mksglu/context-mode` as clean ADOPT-NOW | Root repo ELv2, not MIT; license conflict unresolved. | Agent C license probe; W251 live license metadata. |
| `FalkorDB/FalkorDB` default backend | SSPL license; cannot be silent default install. | Agent C license probe; W251 live license metadata. |
| `volcengine/OpenViking` self-host | AGPLv3 server blocker. | W250 A1 + Agent C confirms AGPL. |
| `Skyvern-AI/skyvern` | AGPL-3.0. | W219/W220 + Agent C. |
| `mendableai/firecrawl` self-host | AGPL-3.0. | W219/W220 + Agent C. |
| `trufflesecurity/trufflehog` | AGPL-3.0; keep out of default permissive stack. | W208/W219 + Agent C. |
| `NeoLabHQ/context-engineering-kit` install | GPL-3.0; cite-only safer. | Agent C. |
| `trailofbits/skills-curated` code install | CC-BY-SA-4.0, not ordinary permissive code license. | W251 license probe. |
| `openai/skills` install | License unresolved / root license not found in Agent C. | Agent C. |
| `supermemoryai/supermemory` as marketplace plugin | Agent C refuted `.claude-plugin/marketplace.json`; SaaS dependency. | Agent C + W250 A1. |
| `@arizeai/phoenix-docs-mcp` npm coordinate | Agent C npm E404 in run. | Agent C. |
| `@modelcontextprotocol/server-qdrant` npm coordinate | Known phantom; use `uvx mcp-server-qdrant`. | Agent C/W219. |
| `XSkill` runtime install | Missing license in Agent B GitHub metadata. | Agent B. |
| `WildToolBench` runtime install | Missing license in Agent B GitHub metadata; keep eval/cite only. | Agent B. |
| `AgenticRAGTracer` runtime install | Low adoption and unclear license. | Agent B. |

## Section 6 — Open Gaps / HONEST-NON-FINDING (unresolved coordinates)

1. `protect-mcp`: Agent C could not resolve `TomFarley/protect-mcp`; npm path remains unverified. Do not install until exact repo/package/source audit exists.
2. W237 31+3 roster: post-adversarial status is not execution-ready. Several rows need version, license, or convergence revalidation.
3. Three-org Axis-1 evidence: multiple W237/W250 rows used official provenance or vague "adopters" instead of named independent orgs. Keep STRONG-PROVENANCE-EXPRESS only for official providers; do not generalize it.
4. Agent B bridge-mode: no real nested GPT-5.5 subprocess output was obtained.
5. Commit/day metrics: Agent B did not compute full commit pagination except one source-cited Kubernetes MCP figure.
6. PapersWithCode winner verification: incomplete; candidates are benchmark-adjacent, not necessarily leaderboard winners.
7. NeurIPS 2026: no stable accepted code-linked agent paper verified in this wave.
8. Anthropic native 2026 context primitives: W250 A3 lists future/beta names; before implementation, re-check official Anthropic docs and API availability.
9. Langfuse and ccusage GitHub API license fields returned `NOASSERTION`; W250 says MIT/MIT-core. Direct LICENSE/package probe is needed before legal finalization.
10. Browserbase/Stagehand and GitHub secret scanning are provider-complements; adoption requires explicit API-key/data-boundary review.

## Section 7 — Priority Action Matrix (top-10 actions with P0/P1/P2 priority)

| Priority | Action | Owner path | Blocking reason | Done condition |
|---|---|---|---|---|
| P0 | Remove `context-mode` from clean ADOPT-NOW. | Catalog/docs install plan | ELv2 blocker. | Catalog row changed to ELv2-AMBER or rejected; no default install script references it. |
| P0 | Remove FalkorDB as silent Graphiti backend. | Memory/KG install plan | SSPL blocker. | Backend decision documented: permissive backend or explicit SSPL acceptance. |
| P0 | Quarantine `protect-mcp`. | Security/governance phase | Phantom coordinate. | Exact repo/package, license, source audit, and install command verified. |
| P0 | Split catalog coverage from default install. | W252 catalog design | Agent C found 31+3 too low for coverage and too loose for defaults. | Two rosters exist: broad catalog 40-50, default installs 25-35 max. |
| P1 | Adopt/probe Kubernetes MCP. | Under-fired container/K8s layer | Strong Agent B net-new candidate. | MCP added in isolated profile; no broad cluster credentials by default. |
| P1 | Compare official GitHub MCP server against current GitHub MCP wiring. | MCP layer | Agent C found official high-star alternative. | Migration/keep decision with auth and feature comparison. |
| P1 | Elevate browser debug/automation category. | Browser MCP layer | ChromeDevTools + Browserbase + Stagehand are now top-level. | Browser category has local debug and cloud-provider subprofiles. |
| P1 | Add eval harness layer: mini-swe-agent + SWE-Skills-Bench + promptfoo. | Eval/CI layer | Fresh eval candidates directly test agent/skills value. | Harnesses runnable outside default runtime; promptfoo MCP verified. |
| P1 | Reconcile version pins with manifest. | Install manifest | W237 pins conflict with live/current manifest for rg/fd/gh/yq/ast-grep/osv. | One authoritative pin matrix updated. |
| P2 | Pilot Claude-mem, Tokscale, ACE, Kilntainers, agent-verifier. | 30-day pilot queue | Promising but overlapping/young. | Each has demand statement, reversible install, and measured outcome. |

## Section 8 — Grand Synthesis VERDICT

VERDICT: NEEDS-REVISION-BEFORE-INSTALL-WITH-FRESH-GITHUB-AMENDMENT — W251 confirms the prior research corpus is broad and useful, but W237's ADOPT-NOW roster cannot be executed as-is. Agent C's adversarial blockers are accepted: `context-mode` is ELv2, `FalkorDB` is SSPL, `protect-mcp` is unresolved, several rows lack true 3-org convergence, and the 31+3 ceiling is the wrong abstraction. The follow-up Agent B GitHub file is present and adds genuinely-new score-7 discoveries (`wshobson/agents`, `gsd-build/get-shit-done`, `safishamsi/graphify`, `sickn33/antigravity-awesome-skills`, `mvanhorn/last30days-skill`, and `farion1231/cc-switch`) as audited subset, pilot, or curated-mining entries. The corrected path is: remove license blockers, quarantine phantom coordinates, keep only post-adversarial survivors as default-install candidates, add Agent B's strongest fresh discoveries as probe/eval layers, and produce a W252 two-tier catalog separating broad SOTA coverage from default runtime mutation.
