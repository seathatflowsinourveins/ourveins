---
title: Wave 7 Stream B — Codex adversarial 3-axis audit for claude-sota-pure
status: BRIDGE-MODE-CODEX-AUDIT
date: 2026-05-14
agent: Codex GPT-5.5
scope: G2 cwc install path, G6 cwc Probe-DAG harness fit, G9 automated MCP eval gates
output_budget: max 800 LOC
---

# Wave 7 Stream B — adversarial 3-axis audit

Inputs read first:

- `Z:/claude-sota-installed/tmp/sota-pure-anthropic-official-K-2026-05-14.md`
- `Z:/claude-sota-installed/tmp/sota-pure-wave6-sdk-examples-M-2026-05-14.md`
- `Z:/repos/deps/cwc-long-running-agents/README.md @ HEAD ffd563d668a97a38d4aa092bf0d5b1507c046629`

Local target probed:

- `Z:/claude-sota-pure/.claude/settings.json` exists and has no hooks block yet.
- `Z:/claude-sota-pure/.claude/{rules,agents,skills,commands,hooks}` are missing, not merely empty.
- `Z:/claude-sota-pure/PROGRESS.md` already exists and explicitly cites cwc as the handoff pattern.
- `Z:/claude-sota-pure/.local/cwc` does not exist.

## (1) G2 cwc install decision + cite

### Installability probe

VERDICT: STUDY-PILOT for Phase 2B install, direct-clone/copy path; not plugin-installable.

- [VERIFIED] `Z:/repos/deps/cwc-long-running-agents @ HEAD ffd563d668a97a38d4aa092bf0d5b1507c046629` has only `.git`, `claude-code-config/`, `.gitignore`, `LICENSE`, and `README.md` at repo root. No `.claude-plugin/marketplace.json`, `.claude-plugin/plugin.json`, or `plugin.json` was found by recursive probe.
- [VERIFIED] cwc's README tells users to copy `claude-code-config/.claude/` into the target project and chmod hooks, not to install a plugin: `README.md:19-27 @ ffd563d668a97a38d4aa092bf0d5b1507c046629`.
- [VERIFIED] cwc warns that copied examples still require project adaptation: set `RESULTS_FILE`, adjust evidence-file patterns, and run Claude from the directory containing `.claude/`: `README.md:30 @ ffd563d668a97a38d4aa092bf0d5b1507c046629`.
- [VERIFIED] The cwc quality loop maps the shipped primitives to native Claude Code files: default-FAIL is `track-read.sh` + `verify-gate.sh`, evaluator is `agents/evaluator.md`, handoff is `CLAUDE.md` + `commit-on-stop.sh`: `README.md:38-40 @ ffd563d668a97a38d4aa092bf0d5b1507c046629`.

Recommended install path for `claude-sota-pure`:

1. Clone or copy cwc to `Z:/claude-sota-pure/.local/cwc` at `ffd563d668a97a38d4aa092bf0d5b1507c046629`.
2. Copy only selected primitive files into the runtime, preserving provenance in comments or manifest rows:
   - `.claude/hooks/{track-read,verify-gate,kill-switch,steer,commit-on-stop}.sh`
   - `.claude/agents/evaluator.md`
   - a cwc-derived long-running runbook section, not a root `CLAUDE.md` replacement.
3. Merge cwc hook JSON into `Z:/claude-sota-pure/.claude/settings.json` rather than replacing the file.
4. Preserve existing `PROGRESS.md`; do not copy over it.

Adversarial note: Wave 5's "copy all of cwc `.claude/`" is only safe for a greenfield project. `claude-sota-pure` is already past blank bootstrap, so blanket copy is now too blunt.

### Alternative long-running-agent patterns

These are triangulation anchors, not replacements for cwc.

- Anthropic cwc: structural done-evidence, fresh evaluator, handoff, kill-switch, steering. It requires evidence reads before result writes (`README.md:44-50`) and recommends a separate evaluator that returns `PASS` or `NEEDS_WORK` (`README.md:52-54`) at `ffd563d668a97a38d4aa092bf0d5b1507c046629`.
- Karpathy-style goal-driven execution: define success criteria and loop until verified. `andrej-karpathy-skills/README.md:77-97 @ HEAD 2c606141936f1eeef17fa3043a72095b4765b9c2` and `skills/karpathy-guidelines/SKILL.md:51-67 @ 2c606141936f1eeef17fa3043a72095b4765b9c2`.
- shan/CCBP Matt Pocock AFK loop pattern: PRD/backlog -> AFK task selection -> Ralph loop -> feedback loops. `claude-code-best-practice-shan/videos/claude-matt-pocock-24-apr-26.md:203-213 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd`.
- gsd-build analogue found as `buildwithclaude/plugins/gsd`: pause/resume handoff creates `.planning/HANDOFF.json` and `.continue-here.md`; resume checks structured handoff first. `buildwithclaude/plugins/gsd/skills/gsd-pause-work/SKILL.md:13-23,83-93 @ HEAD d065ead2fc6510ae33b7eb6a95220a0f2a160591`; `gsd-resume-work/SKILL.md:90-120 @ d065ead2fc6510ae33b7eb6a95220a0f2a160591`.

## (2) G6 cwc 6-Probe-DAG matrix per primitive

Probe definitions:

- P1 Source/install class: plugin vs clone vs hook vs file.
- P2 Phase-0 target fit: required target dirs/files exist or must be created.
- P3 Hook/settings collision: whether installing conflicts with current `Z:/claude-sota-pure/.claude/settings.json`.
- P4 State-file collision: whether install collides with existing root state files.
- P5 Runtime assumption: OS/shell/env assumptions that must be handled.
- P6 Verdict: PASS, PASS-WITH-EDITS, or FAIL for pure runtime Phase 0.

| cwc primitive | P1 source/install class | P2 target fit | P3 hook/settings collision | P4 state-file collision | P5 runtime assumption | P6 verdict |
|---|---|---|---|---|---|---|
| Default-FAIL contract: `track-read.sh` + `verify-gate.sh` | [VERIFIED] clone/copy hook files. Cited in cwc table: `README.md:38`; evidence behavior in `README.md:44-50`; scripts at `track-read.sh:4-6`, `verify-gate.sh:13-24 @ ffd563d6`. | [VERIFIED] `.claude/hooks` missing in pure runtime; create it. `test-results.json` absent unless bootstrap adds it. | [VERIFIED] pure settings has no hooks; merge is additive. cwc settings wants `PreToolUse:Read` and `PreToolUse:Write|Edit`: `settings.json:3-22 @ ffd563d6`. | [INFERRED] no `test-results.json` collision observed; must create template. `.claude/.evidence-reads` path is new. | [VERIFIED] POSIX shell scripts; Windows launch needs Git Bash/WSL or PowerShell ports. README says `chmod +x`: `README.md:27 @ ffd563d6`. | PASS-WITH-EDITS: create dirs, create result template, port/verify shell execution on Windows. |
| Fresh-context evaluator: `agents/evaluator.md` | [VERIFIED] file install to `.claude/agents/evaluator.md`; no plugin. cwc cites it at `README.md:39`; invocation at `README.md:54`. | [VERIFIED] `.claude/agents` missing; create dir. | [VERIFIED] no settings collision; evaluator is invoked manually or by wrapper, not hook-loaded. | [INFERRED] no state collision. | [VERIFIED] evaluator has `tools: Read, Glob, Grep, Bash`, no Write/Edit; Bash is explicitly not a hard read-only boundary: `agents/evaluator.md:3-4 @ ffd563d6`. | PASS-WITH-EDITS: install file but decide whether to remove Bash for stricter pure runtime evaluator. |
| Agent-maintained handoff: cwc `CLAUDE.md` + `commit-on-stop.sh` | [VERIFIED] mixed prompt/runbook file plus Stop hook. cwc table: `README.md:40`; cwc CLAUDE bootstrap: `CLAUDE.md:7-24 @ ffd563d6`. | [VERIFIED] pure root already has `CLAUDE.md` and `PROGRESS.md`; `.claude/hooks` missing. | [VERIFIED] cwc settings wants Stop hook: `settings.json:24-29 @ ffd563d6`; pure settings has no Stop hook, so additive. | [VERIFIED] `Z:/claude-sota-pure/PROGRESS.md` already exists. Copying cwc instructions is okay; overwriting the file is not. | [VERIFIED] `commit-on-stop.sh` is a POSIX shell git backstop; it may commit tracked changes at session end: `CLAUDE.md:24 @ ffd563d6`; script has git assumptions. | PASS-WITH-EDITS: convert cwc CLAUDE.md into runbook/section, do not replace root CLAUDE.md or PROGRESS.md; review auto-commit policy before enabling. |
| Kill-switch: `kill-switch.sh` | [VERIFIED] clone/copy hook file. Operator-control table: `README.md:68`; script blocks when `AGENT_STOP` exists: `kill-switch.sh:4-7 @ ffd563d6`. | [VERIFIED] `.claude/hooks` missing; create dir. | [VERIFIED] cwc settings adds `PreToolUse:*`: `settings.json:5-8 @ ffd563d6`; pure has no hooks, so no immediate conflict. | [INFERRED] `AGENT_STOP` root file absent; no collision. | [VERIFIED] POSIX shell. | PASS-WITH-EDITS: additive and high-value; port shell or ensure Bash availability. |
| Steer: `steer.sh` | [VERIFIED] clone/copy hook file. Operator-control table: `README.md:69`; script uses `STEER.md`: `steer.sh:4-11 @ ffd563d6`. | [VERIFIED] `.claude/hooks` missing; create dir. | [VERIFIED] shares `PreToolUse:*` with kill-switch: `settings.json:5-8 @ ffd563d6`. | [INFERRED] `STEER.md` root file absent; no collision, but agent can write it unless denied. | [VERIFIED] POSIX shell plus `python3` for JSON quoting: `steer.sh:11 @ ffd563d6`. | PASS-WITH-EDITS: port/verify Python command path on Windows; consider deny rule preventing agent self-steering. |

Critical probes:

- (a) PreToolUse:* conflict with empty hooks dir: [VERIFIED] no conflict in settings because pure runtime has no hooks block, but install will fail at runtime unless `.claude/hooks/*.sh` files exist and are executable.
- (b) PROGRESS.md collision: [VERIFIED] collision risk exists. Pure runtime has a populated root `PROGRESS.md`; cwc says create one if missing and use four sections (`CLAUDE.md:7`, `CLAUDE.md:20-21 @ ffd563d6`). Preserve pure's existing file.
- (c) install class per primitive: all five are direct-copy primitives. None is plugin-installable from the cwc repo itself.

## (3) G9 mcp-eval gates with >=3-distinct-orgs cite trail

Strict org count note: `anthropics/claude-cookbooks` and `anthropics/claude-agent-sdk-python` are two official Anthropic repos, not two distinct organizations. To meet the distinct-org requirement, use Anthropic + Vercel + Composio. SDK examples are still included because the prompt explicitly required them.

### Anthropic cookbooks — outcome grader + production MCP toolsets

- [VERIFIED] `anthropics__claude-cookbooks @ HEAD 3f8bf356e779d366ae7fcc0e84be12019747e5e3`.
- Automated eval gate: Managed Agents Outcomes provisions a separate grader with its own context; the grader checks the artifact against a rubric and either passes or sends per-criterion gaps. Cite: `managed_agents/CMA_verify_with_outcome_grader.ipynb:12-20,155-170,261-265,343-359,378-385,406-410,486-490 @ 3f8bf356`.
- MCP Phase 3 wire pattern: production MCP toolsets plus vault-backed credentials and webhook idle handling. Cite: `managed_agents/CMA_operate_in_production.ipynb:12-17,47-53,85-102,114-170,205-238 @ 3f8bf356`; summary row at `managed_agents/README.md:37,40 @ 3f8bf356`.
- Integration cost estimate for pure runtime Phase 3+: MEDIUM-HIGH if adopting Managed Agents hosted Outcomes directly; MEDIUM if porting the pattern locally as `claude --agent evaluator` plus MCP smoke scripts. Hosted path needs Anthropic Managed Agents beta, vault semantics, webhook handling, and a mapped MCP server list.

### Anthropic Python Agent SDK — MCP examples and executable tests

- [VERIFIED] `anthropics__claude-agent-sdk-python @ HEAD 694e4f3b4fcd0957f7f55530203ebd7b96a87f9e`.
- MCP example: in-process calculator MCP server, allowed tool names, and example prompts. Cite: `examples/mcp_calculator.py:2-7,21-25,139-172 @ 694e4f3b`.
- Automated MCP gate: e2e tests verify SDK MCP tool execution, permission enforcement, multiple tools, and no-permission behavior via real Claude API calls. Cite: `e2e-tests/test_sdk_mcp_tools.py:1-3,19-49,52-94,97-136,139-168 @ 694e4f3b`.
- Deeper integration gate: unit/integration tests assert `tools/list`, `tools/call`, error propagation, mixed SDK/external MCP server config, metadata, resource links, typed schemas. Cite: `tests/test_sdk_mcp_integration.py:1-3,28-104,153-191,196-216,473-491,513-568,695-715,983-1093 @ 694e4f3b`.
- Integration cost estimate for pure runtime Phase 3+: MEDIUM. Direct in-process SDK MCP does not map exactly to Claude Code CLI `.mcp.json`; use it as an eval harness around subprocess MCP servers or as a separate SDK eval lane.

### Vercel AI SDK — MCP client conversion + transport/test gates

- [VERIFIED] `vercel-ai @ HEAD d57cf11d0e8d06bb3c2e1bcda89ad6a6a5530793`.
- MCP example: AI SDK converts MCP tools from SSE and stdio servers into AI SDK tool calls. Cite: `examples/mcp/README.md:1-4,39-45,60-66 @ d57cf11d`.
- Executable client pattern: `createMCPClient`, `mcpClient.tools()`, `generateText`, and `onStepFinish` tool-result logging. Cite: `examples/mcp/src/stdio/client.ts:3-46 @ d57cf11d`.
- Automated gate: MCP client tests assert AI SDK compatible tool sets and execution; output-schema tests reject invalid structured content and invalid JSON; transport tests assert HTTP/SSE behavior, errors, headers, redirects, and prototype-pollution rejection. Cite: `packages/mcp/src/tool/mcp-client.test.ts:40-70,1378-1710,1713-1806 @ d57cf11d`; `mcp-http-transport.test.ts:10-60,182-245,333-479 @ d57cf11d`; `mcp-sse-transport.test.ts:10-70,106-172,177-244,328-525 @ d57cf11d`.
- Integration cost estimate for pure runtime Phase 3+: MEDIUM. Useful as an external Node eval harness for `.mcp.json` servers: start server, create MCP client, list tools, execute deterministic calls, validate output schema/security behavior. Not native Claude Code, but strong CI fit.

### Composio — managed MCP/tool-router + provider test gates

- [VERIFIED] `composio @ HEAD 89b1669bacacc465f649825e23af7de695d2092a`.
- MCP API: create/generate MCP configs, restrict allowed tools, use generated URL/headers with an MCP client. Cite: `ts/docs/api/mcp.md:1-11,24-50,57-91,247-304,348-360 @ 89b1669`.
- Tool-router MCP example: creates a tool-router session, retrieves tools from MCP via `@ai-sdk/mcp`, and passes tools into `generateText`. Cite: `ts/examples/tool-router/src/mcp.ts:2-30,44 @ 89b1669`.
- Automated gate: e2e harness pattern asserts exit codes and expected/snapshot output; Vercel provider tests assert tool wrapping and execution compatibility. Cite: `ts/e2e-tests/README.md:30-45,135-180,212-220,257-263 @ 89b1669`; `ts/packages/providers/vercel/test/vercel.test.ts:27-35,79-130,134-167,171-217 @ 89b1669`.
- Integration cost estimate for pure runtime Phase 3+: MEDIUM-HIGH. Composio is valuable when testing hosted/user-auth MCP routers and tool allowlists, but it adds external account/project setup and is heavier than local Vercel SDK transport tests.

## (4) Adversarial findings — what does pure runtime overclaim?

1. [VERIFIED] "empty `.claude/{rules,agents,skills,commands}/` at Phase 0" is inaccurate for the current disk state. Those directories are missing, while `.claude/settings.json` exists. Install docs should say "create dirs" rather than "populate empty dirs."
2. [VERIFIED] cwc is not plugin-installable. Any manifest wording implying plugin install for `cwc-long-running-agents` is an overclaim. It is a direct-copy pattern repo.
3. [VERIFIED] cwc direct copy is not currently safe as a blanket operation because pure already has root `CLAUDE.md` and `PROGRESS.md`. The install must be selective/merge-based.
4. [INFERRED] "cwc 5 primitives pass 6-Probe-DAG" is too strong without a Windows shell execution probe. The hook scripts are POSIX shell; pure runs on Windows paths. The right claim is "structurally compatible after shell/permission adaptation."
5. [INFERRED] "mcp-eval automated gates" is not a single upstream product across all sources. It is a pattern family: hosted outcome graders, SDK MCP e2e tests, AI SDK MCP transport tests, and managed tool-router tests. Pure should name the concrete gate it adopts.
6. [INFERRED] Anthropic cookbook + Anthropic SDK do not satisfy ">=3 distinct orgs" by themselves. External Vercel or Composio evidence is required.
7. [INFERRED] cwc `commit-on-stop.sh` can be risky in a bootstrap runtime because it may auto-commit unrelated tracked changes at session end. Adopt only after the repo's commit discipline is settled.

## (5) VERDICT shape ADOPT/STUDY-PILOT/REJECT per gap

### G2 — cwc 5 primitives install path

VERDICT: STUDY-PILOT

Adopt the pattern source as Anthropic-official and direct-clone/copy it to `Z:/claude-sota-pure/.local/cwc`, but do not treat it as plugin-installable. Pilot selective install of hooks/evaluator/runbook first; enable Stop auto-commit last.

### G6 — cwc Probe-DAG harness fit

VERDICT: STUDY-PILOT

The primitives fit pure's architecture, but only with edits: create missing dirs, merge settings, preserve existing `PROGRESS.md`, create `test-results.json`, and verify/port POSIX shell hooks on Windows. No primitive is a hard REJECT.

### G9 — mcp-eval automated gates

VERDICT: ADOPT for the concept; STUDY-PILOT for implementation.

Adopt a Phase 3+ MCP eval gate, but start with the lowest-friction lane:

1. Local Vercel-style MCP client smoke: list tools, call deterministic tool, validate schema/error behavior.
2. Anthropic SDK e2e lane for SDK-hosted/in-process MCP only.
3. Anthropic Managed Agents Outcomes or Composio hosted MCP only after pure has stable `.mcp.json` servers and credential policy.

## (6) Replacement candidates if any gap is sibling-novel

- G2 replacement candidate if cwc direct-copy is rejected: buildwithclaude GSD pause/resume handoff (`HANDOFF.json` + `.continue-here.md`) for continuity, plus Karpathy success-criteria loop for verification. This is less enforceable than cwc hooks, so it is not a better default.
- G6 replacement candidate if shell hooks fail on Windows: port cwc hooks to PowerShell or Python, preserving the same JSON hook contract. Do not replace the pattern; replace the execution wrapper.
- G9 replacement candidate if "mcp-eval" remains underspecified: use Vercel AI SDK `@ai-sdk/mcp` as the external eval harness for all local MCPs. It has the strongest local test footprint among the external orgs probed and avoids hosted credential setup.

Final VERDICT: G2 STUDY-PILOT, G6 STUDY-PILOT, G9 ADOPT-CONCEPT/STUDY-PILOT-IMPLEMENTATION.
