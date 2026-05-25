---
title: W218 Master Synthesis - Plugin, Layer, and Adversarial Gap Scan
status: AUTHORITATIVE-CANDIDATE-EVIDENCE-NORMALIZATION-REQUIRED
date: 2026-05-15
wave: 218
artifact-class: master-synthesis
output: tmp/wave218-MASTER-SYNTHESIS-2026-05-15.md
inputs:
  w208: tmp/sota-pure-w208-CHECKLIST-SYNTHESIS-2026-05-15.md
  w216: tmp/wave216-MASTER-SYNTHESIS-2026-05-15.md
  w218_agentA: tmp/wave218-agentA-layer-gap-audit-2026-05-15.md
  w218_agentB: prompt-supplied summary only; local artifact not found under tmp/
  w218_agentC: tmp/wave218-agentC-adversarial-gap-scan-2026-05-15.md
  w218_C_redo: tmp/claude/Z--claude-sota-installed/2689ff3f-80af-45b8-b05a-07466773be3e/tasks/af4181d624d467fe1.output
---
# W218 Master Synthesis
## ARTIFACT-INLINE: tmp/wave218-MASTER-SYNTHESIS-2026-05-15.md
## 0. Evidence Status
This synthesis combines all available W218 findings requested for the W218 master packet.
Evidence status by source:
| Source | Local status | Substantive content | Use in this synthesis |
|---|---:|---:|---|
| W218 Agent A | file exists | yes | Primary layer-gap audit evidence |
| W218 Agent B | local artifact not found | prompt summary only | Prompt-supplied plugin deep-dive summary |
| W218 Agent C | file exists | yes | Primary adversarial gap-scan evidence |
| W218 C-redo background | file exists, 0 bytes | no | HNF / empty return, no supplementary findings |
| W216 master | file exists | yes | Prior memory/RAG/obs/eval catalog |
| W208 checklist synthesis | file exists | yes | Prior single-source close-synthesis constraints |
Important input-integrity finding:
1. The requested C-redo background file exists at the supplied path.
2. Its size is 0 bytes.
3. It contributes no additional adversarial findings.
4. No W218 Agent B artifact was found in `tmp/` by filename-pattern search.
5. Agent B is therefore represented only by the user-supplied verdict summary.
6. Agent B should not be counted as file-proven evidence until its artifact is recovered or regenerated.
## 1. Executive Summary
W218 found that the pure-runtime research catalog is strong as discovery work but not yet install-ready.
Agent A widened the search space substantially.
Agent A audited 7 layers and 38 new SOTA candidates.
Agent A's most important contribution is not only the new Top-10 list.
Its larger contribution is exposing missing execution layers:
1. Browser automation.
2. Official GitHub MCP.
3. CI review.
4. DevOps and cloud MCPs.
5. Sandbox isolation.
6. wshobson plugin marketplace coverage.
7. Spec-driven and long-running agent systems.
Agent B, per prompt-supplied summary, deep-dived 5 plugin families.
Agent B's key dispositions:
1. CWC = ADOPT-NOW.
2. claude-plugins-official = ADOPT-NOW.
3. superpowers = ADOPT-NOW-selective.
4. wshobson = STUDY-PILOT.
5. ECC = STUDY-PILOT.
Agent C challenged the adoption labels.
Agent C's core verdict is that W208, W216, and W218 Agent A are useful catalogs but overuse adoption-ready language.
Agent C's final verdict:
`NEEDS-W219-EVIDENCE-NORMALIZATION-BEFORE-INSTALL`
The most important W218 cross-agent conclusion:
W219 should not be a simple ranking pass.
W219 must normalize evidence before any install commit ships.
Required W219 normalization axes:
1. Direct license proof.
2. Current package version proof.
3. Target-runtime state proof.
4. Integration-class proof.
5. Operational-burden proof.
6. Rollback path proof.
7. SRA D1-D10 decomposition for final Top-25 only.
8. Cross-runtime drift prevention.
9. Action-label cleanup.
10. Missing artifact recovery.
W218 also confirmed a recurring failure pattern.
Prior waves repeatedly mix these different states:
1. Already wired in `claude-sota-installed`.
2. Missing in `claude-sota-pure`.
3. Deps-cloned only.
4. Upstream marketplace exists.
5. Runtime config already registered.
6. MCP server can be registered but is not registered.
7. Plugin can be installed but is not installed.
8. Cite-class reference, not runtime primitive.
That mix is the central install-planning risk.
## 2. Composite Verdict
Composite verdict:
`W218-APPROVE-FOR-W219-EVIDENCE-NORMALIZATION-NOT-INSTALL`
Meaning:
1. W218 is good enough to feed W219.
2. W218 is not good enough to authorize direct installation.
3. Agent A's Top-10 should be treated as candidate finalists.
4. Agent B's 5-plugin findings should be treated as prompt-supplied until the missing artifact is recovered.
5. Agent C's adversarial concerns should be binding gates for W219.
6. C-redo produced no additional evidence because the output artifact is empty.
Primary reason:
The catalog has breadth, but install-readiness evidence is uneven.
The highest-risk gaps are:
1. License inference.
2. Target-runtime drift.
3. Boolean Native-CC classification.
4. Service-heavy operational burden.
5. Opaque SRA scoring.
6. Missing Agent B artifact.
7. Empty C-redo output.
## 3. Agent B Findings Summary
Agent B evidence class:
`PROMPT-SUPPLIED-SUMMARY`
No local Agent B artifact was found under `Z:/claude-sota-installed/tmp`.
Because no file artifact is available, this synthesis preserves Agent B's conclusions but marks them as not file-proven.
### 3.1 Agent B Five-Plugin Deep-Dive Matrix
| Plugin family | W218 Agent B disposition | Install action class | Evidence status | W219 gate |
|---|---|---|---|---|
| CWC | ADOPT-NOW | likely ADD-PLUGIN or CITE-NOW plus workflow import | prompt-supplied | recover artifact and direct license/version proof |
| claude-plugins-official | ADOPT-NOW | ADD-PLUGIN selective official baseline | prompt-supplied | recover artifact and exact plugin list |
| superpowers | ADOPT-NOW-selective | ADD-PLUGIN selective | prompt-supplied plus Agent A corroboration | choose exact skills/plugins |
| wshobson | STUDY-PILOT | pilot selected plugins | prompt-supplied plus Agent A corroboration | narrow to safe subset |
| ECC | STUDY-PILOT | pilot | prompt-supplied | define ECC identity, license, install surface |
### 3.2 CWC
Disposition:
`ADOPT-NOW`
Interpretation:
CWC appears to be a high-value upstream primitive for long-running agent discipline.
Agent A also identified `anthropics/cwc-long-running-agents` as a high-scoring candidate.
Agent A scored it 95/100.
Agent A classified it as `CITE-CLASS-CANONICAL`.
Agent A also noted it was already cited as an architecture topology authority in `CLAUDE.md`.
W219 handling:
1. Separate CWC as an install primitive versus cite-class authority.
2. If install is intended, direct-read LICENSE.
3. Verify package or repo install path.
4. Verify latest release or commit state.
5. Decide whether CWC means a plugin, workflow, doc import, command set, or runtime harness.
Recommended W219 action:
`CITE-NOW` if only architectural authority is needed.
`ADD-PLUGIN` or `ADD-WORKFLOW` only after artifact recovery and install-path proof.
### 3.3 claude-plugins-official
Disposition:
`ADOPT-NOW`
Interpretation:
Official Anthropic/dev plugins are high-priority because they minimize adaptation risk.
W208 also recommended selected official Anthropic/dev plugins:
1. setup.
2. plugin-dev.
3. mcp-server-dev.
4. pr-review-toolkit.
5. pyright/typescript LSP.
W219 handling:
1. Build exact plugin list.
2. Verify each plugin name and marketplace source.
3. Confirm current version.
4. Verify license or official-source posture.
5. Install only the subset with clear runtime value.
Recommended W219 action:
`ADD-PLUGIN` for verified official plugins.
### 3.4 superpowers
Disposition:
`ADOPT-NOW-selective`
Interpretation:
Agent A scored `obra/superpowers` 98/100.
Agent A direct-verified MIT license for `obra/superpowers`.
Agent A classified it as Native-CC full plugin marketplace.
Selective adoption is correct because broad marketplace import creates noise.
W208 also rejected blanket marketplace import.
W219 handling:
1. Do not install all superpowers material.
2. Choose only high-value skills/plugins.
3. Map each selected item to a concrete runtime gap.
4. Avoid duplicate overlap with existing local rules.
5. Prefer narrow installation over broad import.
Recommended W219 action:
`ADD-PLUGIN` or `ADD-SKILL` for selected superpowers primitives only.
### 3.5 wshobson
Disposition:
`STUDY-PILOT`
Interpretation:
Agent A audited the wshobson marketplace deeply.
Agent A found 80 plugins in `wshobson/agents`.
Agent A identified several high-value candidates:
1. comprehensive-review.
2. agent-teams.
3. tdd-workflows.
4. security-scanning.
5. llm-application-dev.
6. dependency-management.
7. plugin-eval.
8. block-no-verify.
Agent B's STUDY-PILOT posture is more conservative than Agent A's several ADOPT-NOW plugin rows.
The synthesis should resolve this by piloting a small subset first.
Recommended initial pilot subset:
1. `block-no-verify`.
2. `plugin-eval`.
3. `security-scanning`.
4. `comprehensive-review`.
Reason:
These map to existing safety and review gaps with less domain-specific sprawl.
W219 handling:
1. Direct-read license for the exact plugin entries.
2. Verify marketplace manifest versions.
3. Inspect hooks or commands for permission risk.
4. Install one or two first, not the whole marketplace.
5. Run smoke probes.
Recommended W219 action:
`PILOT-PLUGIN`
### 3.6 ECC
Disposition:
`STUDY-PILOT`
Interpretation:
Agent B identifies ECC as potentially useful but not install-now.
The local W218 files provided for this synthesis do not define ECC clearly.
W219 handling:
1. Identify the exact ECC repo/package/plugin.
2. Direct-read license.
3. Determine if it is a plugin, skill, MCP, CLI, or cite-class material.
4. Score against actual pure-runtime gaps.
5. Keep it out of Top-25 until identity and install surface are proven.
Recommended W219 action:
`STUDY-PILOT`
## 4. Agent A Layer Gap Audit Findings
Agent A evidence class:
`FILE-PROVEN`
Artifact:
`tmp/wave218-agentA-layer-gap-audit-2026-05-15.md`
Agent A status:
`AUTHORITATIVE-CANDIDATE`
Agent A caveat:
Sonnet stand-in disclosed.
Cross-model gate not structurally satisfied at sub-agent layer.
### 4.1 Agent A Scope
Agent A audited 38 new candidates across 7 layers.
Layers:
1. wshobson agent family.
2. Spec-driven, long-running, autonomous-loop systems.
3. Frontend/UI/web tooling.
4. DevOps, cloud, container, Kubernetes.
5. Voice, multimodal, browser.
6. Sandbox and isolation.
7. Code review specialized tooling.
Agent A's major value:
It expands the catalog beyond memory/RAG/observability.
Agent A identifies real execution-surface gaps.
### 4.2 Agent A Top-10 New Discoveries
| Rank | Candidate | Agent A score | Layer | Agent A disposition | W218 synthesis status |
|---:|---|---:|---|---|---|
| 1 | microsoft/playwright-mcp | 97 | browser | ADOPT-NOW | finalist, license verified |
| 2 | github/github-mcp-server | 97 | code review/GitHub | ADOPT-NOW | finalist, license still needs direct-read in Agent A |
| 3 | ChromeDevTools/chrome-devtools-mcp | 96 | browser/devtools | ADOPT-NOW | finalist, license verified |
| 4 | anthropics/claude-code-security-review | 96 | CI security review | ADOPT-NOW | finalist, license inferred |
| 5 | github/spec-kit | 96 | spec-driven | ADOPT-NOW | finalist, license verified |
| 6 | anthropics/claude-code-action | 95 | CI/CD | ADOPT-NOW | finalist, license inferred |
| 7 | anthropics/cwc-long-running-agents | 95 | long-running | ADOPT-NOW / cite-class | finalist, license unverified |
| 8 | awslabs/mcp | 93 | AWS/DevOps | ADOPT-NOW if AWS use-case | conditional finalist, license inferred |
| 9 | grafana/mcp-grafana | 91 | observability | STUDY/ADOPT candidate | conditional finalist, license inferred |
| 10 | wshobson/agent-teams | 90 | multi-agent | ADOPT-NOW | pilot candidate |
### 4.3 Agent A Top-5 Also-Adopt
Agent A also surfaced:
1. trailofbits/claude-code-devcontainer.
2. wshobson/llm-application-dev.
3. wshobson/security-scanning.
4. wshobson/tdd-workflows.
5. wshobson/comprehensive-review.
W218 synthesis interpretation:
These are strong candidates, but wshobson items should be handled as pilot plugins first.
The Trail of Bits devcontainer is strategically important for sandbox posture.
### 4.4 Agent A Rejections
Agent A's Top-5 reject-for-fit:
1. textcortex/claude-code-sandbox.
2. superagent-ai/vibekit.
3. smtg-ai/claude-squad.
4. alfredolopez80/multi-agent-ralph-loop.
5. AIPexStudio/AIPex.
Synthesis status:
These rejections are accepted for W219 unless new evidence changes status.
Most important confirmed reject:
`textcortex/claude-code-sandbox` because archived status was verified.
### 4.5 Agent A License Closure Gap
Agent A direct-verified licenses for four important candidates:
1. `microsoft/playwright-mcp` - Apache-2.0.
2. `ChromeDevTools/chrome-devtools-mcp` - Apache-2.0.
3. `github/spec-kit` - MIT.
4. `obra/superpowers` - MIT.
Agent A left multiple other candidates on inferred license status.
W219 must close direct license proof for final Top-25.
No final install list should retain:
1. likely license.
2. org convention.
3. README badge only.
4. topic-field inference.
5. marketplace metadata only.
### 4.6 Agent A Remaining Layer Gaps
Agent A says these remain under-explored:
1. Database-specific MCPs.
2. Specialized testing MCPs.
3. Specialized doc-tooling MCPs.
Agent C argues these are core execution substrates, not minor edge categories.
W219 should reserve W220 capacity for these.
## 5. Agent C Adversarial Gap-Scan Findings
Agent C evidence class:
`FILE-PROVEN`
Artifact:
`tmp/wave218-agentC-adversarial-gap-scan-2026-05-15.md`
Final Agent C verdict:
`NEEDS-W219-EVIDENCE-NORMALIZATION-BEFORE-INSTALL`
### 5.1 Agent C Executive Assessment
Agent C rated prior research as:
`B- for discovery breadth`
`C+ for adoption-readiness proof`
Synthesis interpretation:
This is the correct controlling frame for W219.
W218 should not ship as install plan.
W218 should ship as input to evidence normalization.
### 5.2 Agent C Main Findings
Agent C identified 15 concrete findings.
They are consolidated below.
#### Finding C1 - W216 verified label exceeds evidence depth
Classification:
`OVER-CLAIM`
Issue:
W216 labels broad tables as verified findings despite stand-in agents, Pattern B HNF, and uneven direct proof.
W219 action:
Split row states into:
1. FACT-VERIFIED.
2. AGENT-ASSERTED.
3. INSTALL-GATED.
#### Finding C2 - Pattern B HNF converted too easily into approval language
Classification:
`UNDER-VERIFIED`
Issue:
W216 Codex T1 produced no structured verdict.
Only one trace-mined correction was extracted.
W219 action:
Treat W216 Codex T1 as HNF plus one install-discipline correction.
Do not call it approval.
#### Finding C3 - Target-runtime drift remains unresolved
Classification:
`UNDER-VERIFIED`
Issue:
Rows mix installed runtime, pure runtime, deps clone, upstream existence, and marketplace registration.
W219 action:
Require target-runtime state table for every finalist.
#### Finding C4 - License posture is inconsistent
Classification:
`OVER-CLAIM`
Issue:
AGPL, SSPL, ELv2, open-core, and inferred licenses are not handled by one shared matrix.
W219 action:
Create one license appendix with direct paths and use-class verdicts.
#### Finding C5 - W208 single-source result was partly bypassed
Classification:
`OVER-CLAIM`
Issue:
W208 admits only one substantive return, but later patch language implies broader convergence.
W219 action:
Mark W208 post-challenge promotions as single-source plus user-triggered probe.
#### Finding C6 - Missing Agent B artifact blocks comparison
Classification:
`PROBE-SKIP`
Issue:
Agent B artifact was missing in Agent C's scan and remains missing in this synthesis.
W219 action:
Recover or regenerate Agent B before citing it as file evidence.
#### Finding C7 - SRA scoring lacks visible decomposition
Classification:
`UNDER-VERIFIED`
Issue:
High scores are not broken into D1-D10 sub-scores.
W219 action:
Require decomposition for final Top-25 only.
#### Finding C8 - Native-CC classification too permissive
Classification:
`OVER-CLAIM`
Issue:
Plugins, skills, MCPs, CLIs, wrappers, and cite repos are flattened into one label.
W219 action:
Replace boolean Native-CC with integration taxonomy.
#### Finding C9 - Operational dependencies are underweighted
Classification:
`UNDER-VERIFIED`
Issue:
Qdrant, Graphiti, Langfuse, Phoenix, and FalkorDB introduce service lifecycle burden.
W219 action:
Add operational burden columns.
#### Finding C10 - Missed candidate classes need folding into final ranking
Classification:
`MISSED-CANDIDATE`
Issue:
Browser automation, GitHub MCP, sandboxing, CI review, and DevOps MCPs are not integrated into prior rankings.
W219 action:
Merge W218 Agent A into the same cross-layer ranking universe.
#### Finding C11 - Deferred lists hide high-value candidates
Classification:
`PROBE-SKIP`
Issue:
Promptfoo, DeepEval, Inspect AI, text-embeddings-inference, and claude-context may deserve tie-breakers.
W219 or W220 action:
Run eval-layer tie-breakers.
#### Finding C12 - Stars and versions are volatile
Classification:
`UNDER-VERIFIED`
Issue:
Star counts and package versions require install-time refresh.
W219 action:
Add preflight metadata commands.
#### Finding C13 - TruffleHog rejection needs replacement scanner decision
Classification:
`UNDER-VERIFIED`
Issue:
W208 rejects TruffleHog but still wants secret scanning.
W219 action:
Adjudicate gitleaks as default scanner versus TruffleHog operator override.
#### Finding C14 - ADOPT-NOW is overloaded
Classification:
`OVER-CLAIM`
Issue:
The same label means install, cite, plugin, skill, MCP, pilot, or reference.
W219 action:
Use action labels:
1. INSTALL-NOW.
2. REGISTER-MCP.
3. ADD-SKILL.
4. ADD-PLUGIN.
5. CITE-NOW.
6. PILOT-SERVICE.
7. DEFER.
8. REJECT.
#### Finding C15 - DB/testing/doc MCP gaps are understated
Classification:
`MISSED-CANDIDATE`
Issue:
Database, test, and docs MCPs are core execution layers.
W220 action:
Run execution-substrate audit.
### 5.3 Agent C Final Control
Agent C's verdict controls W219:
`NEEDS-W219-EVIDENCE-NORMALIZATION-BEFORE-INSTALL`
This synthesis accepts that verdict.
## 6. C-redo Supplementary Adversarial Findings
C-redo evidence class:
`EMPTY-RETURN-HNF`
Path:
`tmp/claude/Z--claude-sota-installed/2689ff3f-80af-45b8-b05a-07466773be3e/tasks/af4181d624d467fe1.output`
Observed file size:
`0 bytes`
Observed result:
No supplementary adversarial findings.
Classification:
`HONEST-NON-FINDING`
Impact:
1. C-redo does not strengthen Agent C.
2. C-redo does not contradict Agent C.
3. C-redo does not add new missed candidates.
4. C-redo does not recover Agent B.
5. C-redo should be recorded as an empty return in W219 input-status table.
## 7. Prior-Wave Carry-Forward Constraints
### 7.1 W208 Carry-Forward
W208 evidence status:
`AUTHORITATIVE-WITH-EMPTY-RETURN-LIMITATION`
W208 had:
1. W208-A: zero-byte output.
2. W208-B: zero-byte output.
3. W208-C: substantive BRIDGE-MODE return.
W208 therefore cannot support 3-agent convergence claims.
W208 top ADOPT-NOW-DELTA items included:
1. Enable codex plugin/review surface.
2. Add artifact persistence lint for bridge-mode/codex rescue outputs.
3. Add secret scan, no-verify, and destructive-command safety hooks via upstream-compatible path.
4. Add ccusage token telemetry MCP.
5. Wire Graphiti only after backend license decision.
6. Use native/version-pinned stdio MCP launchers.
7. Add statusline/context-window visibility.
8. Add selected official Anthropic/dev plugins.
9. Add selected Anthropic/example skills.
10. Add github/spec-kit.
W208 also later promoted `gsd-build/get-shit-done`.
Agent C correctly warns that this promotion is single-source plus user-triggered probe unless missing W208-A/B outputs are recovered.
W219 treatment:
1. Preserve W208 as important single-source evidence.
2. Do not count W208 as multi-agent convergence.
3. Re-probe `gsd-build/get-shit-done` license/version.
4. Keep blanket imports rejected.
5. Keep license-risk candidates blocked until use-class accepted.
### 7.2 W216 Carry-Forward
W216 evidence status:
`AUTHORITATIVE-CANDIDATE`
W216 covered:
1. Memory.
2. Knowledge graph.
3. Vector DB.
4. RAG.
5. DocAI.
6. Observability.
7. Eval.
W216 top candidates included:
1. qdrant.
2. graphiti.
3. mcp-memory-service.
4. cognee.
5. chroma.
6. langfuse.
7. llama_index.
8. garak.
9. openllmetry.
10. docling.
11. chonkie.
12. ragas.
W216 rejected:
1. OpenViking by default due AGPL-3.0 server-class concern.
2. kuzu due archived status.
W216 also documented FM-20 row 21 drift catches:
1. Phoenix runtime path drift.
2. Langfuse deps clone versus marketplace registration drift.
3. Opik deps clone versus marketplace registration drift.
W216 Codex T1 status:
Pattern B HNF.
Only trace-mined correction:
Use resolved-pin form for LlamaIndex install.
W219 treatment:
1. Do not cite W216 Codex T1 as approval.
2. Normalize every W216 top row by proof state.
3. Add operational burden to service-heavy components.
4. Resolve Graphiti/FalkorDB SSPL path.
5. Resolve Phoenix ELv2 use-class path.
6. Resolve Langfuse open-core component boundary.
## 8. Cross-W218 Synthesis Themes
### 8.1 Breadth Is Strong
W218 expands the candidate universe materially.
Most important new areas:
1. Browser automation.
2. DevTools.
3. Official GitHub MCP.
4. CI security review.
5. Long-running agent discipline.
6. Sandbox isolation.
7. Plugin governance and evaluation.
8. DevOps MCPs.
### 8.2 Install Readiness Is Weak
The shared weakness is install readiness.
Repeated gaps:
1. License direct-read missing.
2. Version pin missing.
3. Target-runtime state missing.
4. Operational model missing.
5. Rollback path missing.
6. Integration type ambiguous.
7. SRA score opaque.
8. Artifact missing.
### 8.3 "ADOPT-NOW" Needs Replacement
W218 should retire coarse `ADOPT-NOW` for W219 final recommendations.
Use these labels instead:
| Label | Meaning |
|---|---|
| INSTALL-NOW | Install a runtime dependency now |
| REGISTER-MCP | Register an MCP server after version/license proof |
| ADD-PLUGIN | Install a Claude Code plugin |
| ADD-SKILL | Install a skill |
| CITE-NOW | Cite as architecture authority, no install |
| PILOT-SERVICE | Pilot a service-backed component |
| PILOT-PLUGIN | Pilot a plugin with rollback |
| STUDY | Keep in research queue |
| DEFER | Not now |
| REJECT | Do not adopt absent new evidence |
### 8.4 Native-CC Needs Replacement
Replace boolean Native-CC with:
1. `CC-OFFICIAL`.
2. `CC-PLUGIN-MARKETPLACE`.
3. `CC-SKILL`.
4. `MCP-REGISTERABLE`.
5. `ADAPTED-CLI`.
6. `SERVICE-STACK`.
7. `CITE-ONLY`.
8. `NON-NATIVE`.
### 8.5 Runtime State Must Be Explicit
Every finalist needs this state table:
1. Present in `claude-sota-installed`.
2. Present in `claude-sota-pure`.
3. Deps-cloned only.
4. Marketplace registered.
5. MCP config path.
6. Hook config path.
7. Plugin manifest path.
8. Install command verified.
9. Rollback command verified.
## 9. W219 Candidate Buckets
### 9.1 Immediate W219 Evidence-Normalization Finalists
These should be normalized first:
1. microsoft/playwright-mcp.
2. ChromeDevTools/chrome-devtools-mcp.
3. github/github-mcp-server.
4. github/spec-kit.
5. claude-plugins-official selected set.
6. superpowers selected set.
7. CWC / anthropics/cwc-long-running-agents.
8. anthropics/claude-code-security-review.
9. anthropics/claude-code-action.
10. trailofbits/claude-code-devcontainer.
11. qdrant plus qdrant MCP.
12. graphiti with backend decision.
13. mcp-memory-service.
14. langfuse.
15. docling.
16. chonkie.
17. ragas.
18. wshobson block-no-verify.
19. wshobson plugin-eval.
20. wshobson security-scanning.
### 9.2 Conditional Finalists
These require use-case or license closure:
1. awslabs/mcp.
2. grafana/mcp-grafana.
3. hashicorp/terraform-mcp-server.
4. containers/kubernetes-mcp-server.
5. addyosmani/web-quality-skills.
6. Leonxlnx/taste-skill.
7. nexu-io/open-design.
8. gsd-build/get-shit-done.
9. Phoenix.
10. Opik.
11. promptfoo.
12. DeepEval.
13. Inspect AI.
14. claude-context.
15. text-embeddings-inference.
### 9.3 Keep Rejected Unless New Evidence Appears
1. textcortex/claude-code-sandbox.
2. superagent-ai/vibekit.
3. smtg-ai/claude-squad.
4. alfredolopez80/multi-agent-ralph-loop.
5. AIPexStudio/AIPex.
6. kuzu.
7. OpenViking for default install.
8. TruffleHog for pure default unless operator override.
9. blanket marketplace imports.
10. floating `@latest` / `npx -y` production launchers.
## 10. Prioritized W219 Action List
### P0 - Recover Missing Evidence
1. Locate or regenerate W218 Agent B artifact.
2. Record C-redo as empty return.
3. Add input-status table to W219.
4. Mark prompt-supplied Agent B claims as unfiled until recovered.
Exit condition:
No W219 recommendation cites Agent B as file-proven unless artifact exists.
### P1 - Build Final Evidence Matrix
Create a matrix for final Top-25 candidates.
Required columns:
1. Candidate.
2. Source wave.
3. Source agent.
4. Evidence class.
5. Direct LICENSE path.
6. License verdict.
7. Package name.
8. Latest version.
9. Version pin.
10. Integration class.
11. Target runtime state.
12. Operational burden.
13. Rollback path.
14. SRA D1-D10 decomposition.
15. Final action label.
Exit condition:
No finalist has blank license, version, integration, target-state, or action-label fields.
### P2 - Close License Appendix
Resolve direct-license status for:
1. github/github-mcp-server.
2. anthropics/claude-code-security-review.
3. anthropics/claude-code-action.
4. anthropics/cwc-long-running-agents.
5. awslabs/mcp.
6. grafana/mcp-grafana.
7. trailofbits/claude-code-devcontainer.
8. all selected wshobson plugins.
9. gsd-build/get-shit-done.
10. claude-plugins-official selected plugins.
11. ECC.
Also resolve use-class issues for:
1. Phoenix ELv2.
2. Langfuse open-core.
3. Graphiti/FalkorDB SSPL backend.
4. OpenViking AGPL.
5. TruffleHog AGPL.
6. GitNexus license/use-class.
Exit condition:
No final install row contains inferred license language.
### P3 - Normalize Runtime State
Probe target runtime state for every finalist:
1. `claude-sota-installed`.
2. `claude-sota-pure`.
3. deps clone.
4. marketplace registration.
5. MCP config.
6. hook config.
7. plugin config.
8. state directory.
Exit condition:
No final row mixes orchestrator-installed state with target-pure state.
### P4 - Split Action Labels
Replace every coarse `ADOPT-NOW` label.
Use:
1. INSTALL-NOW.
2. REGISTER-MCP.
3. ADD-PLUGIN.
4. ADD-SKILL.
5. CITE-NOW.
6. PILOT-SERVICE.
7. PILOT-PLUGIN.
8. STUDY.
9. DEFER.
10. REJECT.
Exit condition:
Every recommendation implies one concrete next action.
### P5 - Operational Burden Scoring
Score service-backed candidates:
1. Qdrant.
2. Graphiti.
3. FalkorDB.
4. Langfuse.
5. Phoenix.
6. Opik.
7. Grafana MCP.
8. AWS MCP.
9. Kubernetes MCP.
10. Terraform MCP.
Required fields:
1. Process model.
2. Port exposure.
3. State path.
4. Backup/restore.
5. Offline behavior.
6. Windows portability.
7. Docker requirement.
8. Health probe.
9. Uninstall rollback.
Exit condition:
No service stack is treated like a lightweight plugin.
### P6 - Final Top-25 Re-rank
Rerank across all layers after evidence normalization.
Do not silo by wave.
Include candidates from:
1. W208.
2. W216.
3. W218 Agent A.
4. W218 Agent B prompt summary if recovered.
5. W218 Agent C constraints.
Exit condition:
Final Top-25 is cross-layer, budget-aware, and evidence-normalized.
### P7 - Eval and Observability Tie-Breakers
Run focused tie-breakers:
1. RAGAS vs DeepEval vs Promptfoo vs Inspect AI.
2. Phoenix vs Langfuse vs Opik vs OpenLLMetry.
3. Claude-context vs Graphiti/Qdrant/GitNexus for codebase memory/search.
Exit condition:
No high-value eval candidate remains hidden in defer bucket.
### P8 - Execution Substrate Queue for W220
Queue W220 audits:
1. Database MCPs.
2. Testing MCPs.
3. Documentation MCPs.
4. Package-manager MCPs.
5. Browser/devtools tie-breaker if needed.
Exit condition:
W220 has a concrete scope, not a vague follow-up.
## 11. Final W218 Master Verdict
W218 found real gaps and strong candidates.
It also found that prior waves have a recurring evidence-normalization problem.
Agent A supplies breadth.
Agent B supplies prompt-level plugin-family priorities.
Agent C supplies the controlling adversarial verdict.
C-redo supplies no additional evidence because the output is empty.
Therefore:
`VERDICT: NEEDS-W219-EVIDENCE-NORMALIZATION-BEFORE-INSTALL`
`W218-MASTER-SYNTHESIS-COMPLETE`
`W219-NEXT-ACTION: BUILD-EVIDENCE-MATRIX-AND-RERANK-TOP25`
