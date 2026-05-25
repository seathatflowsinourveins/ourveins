---
title: W218 Agent C — Adversarial Gap-Scan over W208 + W212-W217 Catalogs
status: ADVERSARIAL-REVIEW
date: 2026-05-15
wave: 218
agent: C
artifact-class: adversarial-gap-scan
inputs:
  w216: tmp/wave216-MASTER-SYNTHESIS-2026-05-15.md
  w208: tmp/sota-pure-w208-CHECKLIST-SYNTHESIS-2026-05-15.md
  w218_agentA: tmp/wave218-agentA-layer-gap-audit-2026-05-15.md
---

# W218 Agent C — Adversarial Gap-Scan

## Scope

This scan reviews prior wave conclusions from:

- W208 close-synthesis checklist synthesis.
- W216 master synthesis covering memory, KG, vector, RAG, DocAI, observability, and eval.
- Adjacent W218 Agent A layer audit for contradiction and already-raised caveats.

The expected W218 Agent B artifact was not found by direct path or filename-pattern search in `tmp/`.
That absence is treated as an input-integrity gap, not as negative evidence about Agent B's findings.

## Executive Verdict

The prior research is useful but materially over-labeled as adoption-ready.
W208 is appropriately honest about the collapse of 2/3 returns, but its later Top-25 patch introduces a candidate promotion whose license/version proof is weaker than the surrounding language implies.
W216 has strong candidate coverage in its target layers, but several recommendations remain under-verified because the synthesis mixes verified facts, inferred install paths, existing-orchestrator state, target-runtime adoption, and partial Pattern B trace-mining into one adoption matrix.
W218 Agent A catches some missing layers, but it also exposes the same problem: many "ADOPT-NOW" rows rest on org-convention license inference or README signals rather than direct-file proof.

Adversarial quality grade: **B- for discovery breadth, C+ for adoption-readiness proof**.

## Finding 1 — W216 "verified findings" label exceeds evidence depth

Classification: **OVER-CLAIM**

Affected conclusions:

- W216 table heading: "Agent D verified findings" and "Agent E verified findings".
- W216 final verdict: "39 candidates audited" with top adoption picks.
- W216 top picks for llama_index, docling, chonkie, ragas, garak, openllmetry, LightRAG, Opik, FlagEmbedding, and deferred candidates.

Why this matters:

The W216 synthesis uses the word "verified" at the group level, but the artifact itself admits:

- W216 agents were Sonnet stand-ins.
- Cross-model gate was not structurally satisfied.
- Codex T1 ratification produced Pattern B HONEST-NON-FINDING rather than a verdict.
- Several Agent E items are carried as "per Agent E" without the same direct probe detail shown for the later Mia corrections.

The artifact is therefore a useful catalog, but not a fully verified adoption plan.
"Audited" is defensible.
"Verified findings" is too broad unless each row has license, install, latest-version, target-runtime, and duplicate-overlap proof.

Risk:

Medium-high.
The label can lead W219 to treat rows as install-ready when they are only research-ready.

Follow-up action:

Wave 219 should split each W216 candidate into:

- `FACT-VERIFIED`: direct proof exists in artifact.
- `AGENT-ASSERTED`: claimed by agent but not independently probed in synthesis.
- `INSTALL-GATED`: must be re-probed before adoption.

## Finding 2 — Pattern B HNF was partly converted into design correction without full verdict

Classification: **UNDER-VERIFIED**

Affected conclusions:

- W216 Codex T1 ratification section.
- LlamaIndex install command correction.
- W216 verdict: "APPROVE-FOR-W219-AGGREGATION".

Why this matters:

The Pattern B HNF section says Codex emitted 26,076 lines and no structured verdict.
The synthesis mined one concrete correction from the trace: bare `pip install llama-index` should become a resolved-pin form.
That correction is reasonable, but the broader adoption matrix remains unrated by Codex.

The artifact is transparent about this, but the final verdict still reads like the catalog passed a meaningful ratification.
It did not.
Only one trace-mined install-discipline issue was extracted.

Risk:

Medium.
The process can accidentally launder "no verdict" into "approved with a minor fix."

Follow-up action:

W219 should not cite W216 Codex T1 as an approval.
It should cite it only as:

- HNF with one extracted install-discipline correction.
- No ratification of license, fit, duplication, or target-runtime install state.

## Finding 3 — Target-runtime drift remains insufficiently resolved

Classification: **UNDER-VERIFIED**

Affected conclusions:

- Phoenix row: wired in `claude-sota-installed`, not in `claude-sota-pure`.
- Langfuse and Opik rows: deps-cloned but not marketplace-registered.
- Memory stack rows: already installed in orchestrator, needs target install in pure.

Why this matters:

W216 correctly catches several runtime-drift mistakes, but the adoption matrix still mixes:

- Already wired in orchestrator runtime.
- Needs install in target runtime.
- Deps-cloned only.
- Plugin exists upstream but not registered locally.
- Native Claude Code vs adapted MCP route.

That mix is dangerous because `claude-sota-installed` and `claude-sota-pure` are separate runtimes with different purity and install-discipline constraints.

Risk:

High for install planning.
Cross-runtime drift is already a recurring FM-20 row 21 subclass, and W216 itself adds three catches to that same failure mode.

Follow-up action:

W219 should require a target-runtime state table for every top recommendation:

- `present_in_claude_sota_installed`
- `present_in_claude_sota_pure`
- `upstream_available`
- `local_deps_clone_only`
- `marketplace_registered`
- `runtime_config_path`
- `install_command_verified`

No row should be `ADOPT-NOW` unless target state is explicit.

## Finding 4 — License posture is inconsistent across waves

Classification: **OVER-CLAIM**

Affected conclusions:

- W208 rejects AGPL/SSPL/ELv2/proprietary/fair-code without explicit use-class acceptance.
- W216 rejects OpenViking AGPL server-class by default but accepts Phoenix ELv2 as local non-resale OK.
- W216 treats Langfuse open-core MIT plus `ee/LICENSE` periphery as local-runtime self-host MIT-covered.
- W218 Agent A recommends several org-convention license-inferred candidates as ADOPT-NOW.

Why this matters:

The catalogs do not apply one consistent license decision matrix.
Some licenses are blocked categorically, some are allowed by use class, and some are inferred from org convention.
That may be acceptable, but the acceptance criteria must be explicit before install recommendations.

Specific weak spots:

- Phoenix ELv2 needs a documented use-class acceptance, not just "local non-resale OK" shorthand.
- Langfuse open-core needs exact component boundary mapping: which package is installed, which files are MIT, and whether any EE code is invoked.
- FalkorDB SSPL remains a blocker for Graphiti unless alternate backend or explicit local-use acceptance is chosen.
- W208's `gsd-build/get-shit-done` promotion says MIT in the post-challenge text, while W218 Agent A still lists license unverified for the same repo.

Risk:

High.
License posture errors create adoption blockers after technical work has already begun.

Follow-up action:

W219 should create a license adjudication appendix with per-candidate direct LICENSE path, package/component boundary, and use-class verdict.
Do not allow "org convention" or "likely" license language in final Top-25 adoption rows.

## Finding 5 — W208 single-source result was preserved, then partially bypassed by later patch

Classification: **OVER-CLAIM**

Affected conclusions:

- W208 section 4 correctly says no 2+ agent convergence can be claimed.
- W208 section 8 later promotes `gsd-build/get-shit-done` to new P23 ADOPT-NOW after a user-triggered correction.

Why this matters:

The base W208 synthesis is strong because it admits W208-A and W208-B were zero-byte outputs.
But the later patch promotes a candidate into Top-25 with strong language and references "α-A α-B α-C convergent goal" even though the same artifact says only W208-C was substantive.

The candidate may be good.
The convergence claim is not supported by the artifact's own input-status table.

Risk:

Medium.
It weakens the artifact's otherwise good epistemic hygiene.

Follow-up action:

W219 should reclassify W208 post-challenge promotions as "single-source plus user-triggered probe" unless the missing A/B outputs are recovered or rerun.
Avoid references to alpha multi-agent convergence inside W208 unless those artifacts are present and substantive.

## Finding 6 — Missing W218 Agent B artifact blocks complete adversarial comparison

Classification: **PROBE-SKIP**

Affected conclusions:

- User context says Wave 218 Agent B completed a 5-plugin deep-dive.
- Expected local path: `tmp/wave218-agentB-codex-bridge-5plugins-2026-05-15.md`.

Observed:

- Direct `Get-ChildItem` and `rg --files` pattern search found Agent A and Agent H, but no Agent B path matching the expected name or codex-bridge-5plugins pattern.

Why this matters:

The task asks for adversarial review over W208 and W212-W217 catalogs, but Agent B is explicitly part of the current context.
If Agent B deep-dived plugins that overlap W216 or W218 Agent A recommendations, this Agent C scan cannot verify whether it already corrected or contradicted them.

Risk:

Medium.
The missing artifact can cause duplicated findings or missed contradiction checks.

Follow-up action:

Before W219 synthesis, locate or regenerate Agent B.
If it exists under a different path, add a manifest entry from W218 orchestration output to the final wave packet.
If absent, mark W218 Agent B as HNF/LOST-ARTIFACT and do not cite it as completed evidence.

## Finding 7 — Candidate scoring lacks visible decomposition

Classification: **UNDER-VERIFIED**

Affected conclusions:

- W216 SRA scores: qdrant 96, graphiti 95, memory-service 94, langfuse 99, llama_index 97, garak 97, openllmetry 97, docling 95, chonkie 95, ragas 95.
- W218 Agent A SRA scores for 38 candidates.

Why this matters:

The artifacts provide final SRA numbers but not the D1-D10 sub-score breakdown.
Without decomposition, reviewers cannot tell whether high scores came from popularity, native integration, license, maintenance, strategic novelty, or install readiness.

This matters especially where:

- A candidate is non-native but high-scored.
- License is unverified or inferred.
- A candidate is only a cite-class canonical substrate.
- A candidate is already present in one runtime but missing in target pure.

Risk:

Medium.
Opaque scoring makes it hard to compare candidates across waves.

Follow-up action:

W219 should require D1-D10 sub-score rows for final Top-25 only.
For non-final candidates, a compact score is enough.
For adoption recommendations, score opacity should be treated as an install gate.

## Finding 8 — Native-CC classification is too permissive in several rows

Classification: **OVER-CLAIM**

Affected conclusions:

- W216 `getzep/graphiti`: adapted via bundled `mcp_server/` plus FalkorDB backend.
- W216 `topoteretes/cognee`: Native-CC via plugin hook lifecycle.
- W216 `langfuse/langfuse`: deps-cloned plus `mcp-server-langfuse`, not target marketplace.
- W208 selected official/dev plugins and skills.
- W218 Agent A numerous "NATIVE-CC" plugin rows.

Why this matters:

"Native-CC" should distinguish:

- Official Claude Code plugin.
- Third-party plugin marketplace package.
- Skill bundle.
- MCP server that Claude Code can register.
- CLI with Claude instructions.
- Repo containing `.claude-plugin`.
- Adapted wrapper requiring custom install discipline.

Several rows flatten these into a single Native-CC label.
For install planning, those are different risk classes.

Risk:

Medium-high.
Install friction and maintenance burden are underrepresented.

Follow-up action:

W219 should replace boolean `NATIVE-CC` with a 5-class integration taxonomy:

- `CC-OFFICIAL`
- `CC-PLUGIN-MARKETPLACE`
- `CC-SKILL`
- `MCP-REGISTERABLE`
- `ADAPTED-CLI`
- `NON-NATIVE`

## Finding 9 — W216 top adoption picks underweight operational dependencies

Classification: **UNDER-VERIFIED**

Affected conclusions:

- Graphiti top recommendation requires Docker FalkorDB pull.
- Qdrant top recommendation requires Docker plus MCP server.
- Langfuse top recommendation requires self-host Docker compose plus MCP registration.
- Phoenix target install requires runtime MCP wiring and ELv2 acceptance.

Why this matters:

These are not lightweight plugin installs.
They introduce services, data persistence, ports, upgrade paths, backups, auth, and lifecycle management.
The W216 adoption matrix lists install commands but does not include operational readiness criteria.

Risk:

High for a portable `Z:` runtime.
Service-heavy dependencies can break portability, reproducibility, and "pure" install discipline if state paths and ports are not standardized.

Follow-up action:

W219 should add an operational burden column for each install:

- process model
- port exposure
- state path
- backup/restore
- offline behavior
- Windows portability
- Docker required
- service health probe
- uninstall rollback

## Finding 10 — "Missed candidate" classes are now visible but not folded back into W216/W208 conclusions

Classification: **MISSED-CANDIDATE**

Affected conclusions:

- W216 layer catalog does not include browser automation, official GitHub MCP, sandbox isolation, CI review, DevOps MCPs, specialized testing MCPs, or doc-tooling MCPs.
- W208 Top-25 was built from single W208-C evidence and did not include several W218 Agent A discoveries.

Examples from W218 Agent A that appear materially relevant:

- `microsoft/playwright-mcp`
- `ChromeDevTools/chrome-devtools-mcp`
- `github/github-mcp-server`
- `anthropics/claude-code-security-review`
- `anthropics/claude-code-action`
- `trailofbits/claude-code-devcontainer`
- `grafana/mcp-grafana`
- `awslabs/mcp`
- `wshobson/security-scanning`
- `wshobson/plugin-eval`

Why this matters:

The prior wave conclusions skewed toward memory/RAG/observability and orchestration plugins.
That is useful, but the pure runtime baseline also needs browser/tool interaction, GitHub integration, sandboxing, CI review, and security scanning.

Risk:

Medium.
The final pure runtime could be strong on agent memory and weak on real-world execution/control surfaces.

Follow-up action:

W219 should merge W218 Agent A's layer findings into the same ranking universe as W216, not as an appendix.
The final list should be cross-layer and budget-aware, not per-wave siloed.

## Finding 11 — Deferred lists contain untriaged high-value candidates

Classification: **PROBE-SKIP**

Affected conclusions:

- W216 Agent E deferred list: langchain, graphrag, deepeval, promptfoo, text-embeddings-inference, helicone, inspect_ai, gpt-researcher, gepa, claude-context.
- W208 study list: Langfuse/Promptfoo/Opik eval/observability stack.

Why this matters:

Some deferred candidates are not obviously duplicates:

- `promptfoo` is a practical eval/red-team harness distinct from RAGAS.
- `deepeval` overlaps with RAGAS but has different workflow ergonomics.
- `inspect_ai` may be a high-value eval substrate.
- `text-embeddings-inference` is an infrastructure choice, not simply RAG overlap.
- `claude-context` later appears in W218 Agent A as a semantic code search MCP study candidate.

Risk:

Medium.
The defer bucket may hide candidates that should affect final ranking.

Follow-up action:

W219+ should run a small eval-layer tie-breaker:

- RAGAS vs DeepEval vs Promptfoo vs Inspect AI.
- Phoenix vs Langfuse vs Opik vs OpenLLMetry.
- Claude-context vs Graphiti/Qdrant/GitNexus for codebase memory/search.

## Finding 12 — Stars and latest-version values are volatile and should not be treated as stable evidence

Classification: **UNDER-VERIFIED**

Affected conclusions:

- W216 and W218 Agent A star-count tables.
- Install commands using specific package names without current package-version probe.
- W208 `get-shit-done-cc@1.42.2` promotion.

Why this matters:

Stars, package versions, releases, archive status, and package names are time-sensitive.
The artifacts are dated 2026-05-15, but W219 adoption may happen later.
Even within the same day, package metadata can change.

Risk:

Low-medium for research quality, high for install execution.

Follow-up action:

Final install plan should include a preflight command set:

- GitHub repo metadata fetch.
- Direct LICENSE fetch.
- package latest-version resolution.
- archive status check.
- release recency check.
- install command dry-run or `--help` probe.

## Finding 13 — W208 rejection of TruffleHog conflicts with installed-runtime security posture

Classification: **UNDER-VERIFIED**

Affected conclusions:

- W208 rejects `trufflesecurity/trufflehog` for pure default due AGPL-3.0.
- AGENTS.md says `gitleaks_pre_commit_gate.py` exists and blocks commits/pushes if secrets detected.
- W208 still recommends secret scan hooks through upstream/plugin-compatible path.

Why this matters:

The final pure runtime must decide which secret scanning primitive is acceptable.
Rejecting TruffleHog may be correct, but the catalog should then identify the replacement default and prove license/install fit.

Risk:

Medium.
Security hook recommendation remains abstract if the concrete scanner is not selected.

Follow-up action:

W219 should explicitly adjudicate:

- gitleaks as default scanner
- TruffleHog as reject or optional operator override
- plugin/hook wrapper route
- CI vs local pre-commit coverage

## Finding 14 — "ADOPT-NOW" should be split into install-now vs cite-now vs pilot-now

Classification: **OVER-CLAIM**

Affected conclusions:

- W216 top picks.
- W208 Top-25 patch.
- W218 Agent A Top-10 and Top-5 adopt-now-also.

Why this matters:

The same label is being used for different actions:

- Install a runtime dependency now.
- Cite a repo as architectural authority.
- Pilot a service-backed stack.
- Add a skill bundle.
- Register an MCP.
- Keep as reference material.

This causes confusion downstream.
For example, `anthropics/cwc-long-running-agents` may be cite-class canonical but not necessarily an install primitive.
`gsd-build/get-shit-done` may be workflow/runtime material but needs exact license/version verification.
`langfuse` is a service stack and MCP integration, not a simple plugin.

Risk:

High for final synthesis clarity.

Follow-up action:

W219 should use action labels:

- `INSTALL-NOW`
- `REGISTER-MCP`
- `ADD-SKILL`
- `ADD-PLUGIN`
- `CITE-NOW`
- `PILOT-SERVICE`
- `DEFER`
- `REJECT`

## Finding 15 — Database and testing MCP gaps are acknowledged but understated

Classification: **MISSED-CANDIDATE**

Affected conclusions:

- W218 Agent A says DB-specific MCPs, specialized testing MCPs, and doc-tooling MCPs remain under-explored.
- W216/W208 final recommendations do not reserve rank space for those categories.

Why this matters:

For a practical coding runtime, database and test execution surfaces are not optional edge categories.
They are core operational layers.
Memory/RAG/observability catalogs are strong, but they do not replace:

- Postgres/Mongo/Redis MCPs.
- Jest/Pytest/Vitest/K6 tooling.
- documentation lookup MCPs.
- package/dependency update tooling.

Risk:

Medium.
The pure runtime can become research-heavy and execution-light.

Follow-up action:

Wave 220 should run a dedicated "execution substrate" audit:

- database MCPs
- test MCPs
- package manager MCPs
- docs MCPs
- browser/devtools MCPs tie-breaker

## Overall Research Quality Assessment

Strengths:

- W208 is unusually explicit about empty returns and no 2+ convergence.
- W216 catches real cross-runtime precision drift.
- W216 has good layer breadth for memory/RAG/observability/eval.
- W216 documents Pattern B HNF instead of hiding Codex non-verdict.
- W218 Agent A broadens the missing layer map and direct-verifies four key licenses.

Weaknesses:

- Adoption labels are too coarse.
- License proof is inconsistent.
- Native-CC classification is too broad.
- Target-runtime state is repeatedly confused with orchestrator-runtime state.
- High SRA scores are not decomposed.
- Service-heavy operational burden is under-modeled.
- Missing artifacts are not always promoted to hard input-integrity blockers.
- Deferred candidates are too easily treated as low-priority without tie-break probes.

Net:

The research is good enough for W219 aggregation, but not good enough for direct install commits.
W219 must be an evidence-normalization wave, not merely a ranking wave.

## Concrete Follow-Up Actions for W219+

1. Create a final evidence matrix for all Top-25 candidates with columns for license direct-read, package version, target-runtime state, integration class, operational burden, and rollback path.
2. Reclassify W216 rows from "verified findings" to fact-level proof states.
3. Treat W216 Codex T1 as HNF plus one trace-mined correction, not as approval.
4. Locate or regenerate the missing W218 Agent B artifact before citing it.
5. Run direct LICENSE probes for every W218 Agent A Top-10 candidate still marked inferred or unverified.
6. Reconcile `gsd-build/get-shit-done` license/version claims across W208 and W218 Agent A.
7. Resolve Phoenix, Langfuse, Graphiti/FalkorDB, OpenViking, and GitNexus license/use-class decisions in one shared license appendix.
8. Split `ADOPT-NOW` into action-specific verbs: install, plugin, skill, MCP, cite, pilot, defer, reject.
9. Add operational burden scoring for service-backed components like Qdrant, Graphiti, Langfuse, Phoenix, and FalkorDB.
10. Run eval-layer tie-breaker: RAGAS vs DeepEval vs Promptfoo vs Inspect AI; Phoenix vs Langfuse vs Opik vs OpenLLMetry.
11. Run execution-substrate audit for DB MCPs, testing MCPs, docs MCPs, and package-manager MCPs.
12. Require D1-D10 sub-score breakdown for final Top-25 candidates.
13. Add target-runtime probe commands to verify `claude-sota-pure` state, not just `claude-sota-installed`.
14. Require install-time latest-version resolution and pin capture for every package install.
15. Mark single-source W208 recommendations as single-source unless W208-A/B are recovered or rerun.

## Final Adversarial Verdict

VERDICT: NEEDS-W219-EVIDENCE-NORMALIZATION-BEFORE-INSTALL: Prior wave catalogs are strong discovery artifacts but overuse adoption-ready language; W208 is single-source despite later patching, W216 is under-ratified due stand-in plus Pattern B HNF, target-runtime drift remains a repeated failure mode, license/use-class proof is inconsistent, and several execution-layer candidates remain missed or under-scored.
