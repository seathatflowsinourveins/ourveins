---
title: W219 Agent B - Runtime State + Operational Burden Matrix
status: AUTHORITATIVE-SYNTHESIS
date: 2026-05-15
wave: 219
agent: B
target-runtime: Z:/claude-sota-pure
artifact-class: target-runtime-state-ops-burden-synthesis
---

# ARTIFACT-INLINE: tmp/wave219-agentB-runtime-state-ops-burden-2026-05-15.md

## 0. Evidence Boundary

This artifact only uses concretely observed state from:

1. `Z:/claude-sota-pure/.mcp.json` direct read.
2. `Z:/claude-sota-pure/.claude/settings.json` direct read.
3. W218 master synthesis and W218-H token/context catalog.
4. W219 master checklist where it summarizes W213-W218 install sequencing and W220 carry-forward.

Important constraint:

- W218 master says the original W218 Agent B artifact was not found and Agent B plugin-family claims were prompt-supplied only. Therefore plugin-family rows are retained as evidence-normalized runtime-state rows, not as independent file-proven Agent B findings.

## 1. Target Runtime State Snapshot

Direct file probes:

- `Z:/claude-sota-pure/.mcp.json` exists and defines these relevant MCP servers:
  - `memory` at line 3.
  - `github` at line 11.
  - `context7` at line 15.
  - `deepwiki` at line 19.
  - `repomix` at lines 23-25.
  - `gitnexus` at lines 47-49.
  - `chrome-devtools` at line 51.
  - `playwright` at line 55.
  - `serena` at lines 59-61.
  - `ccusage` at line 63.
- `Z:/claude-sota-pure/.claude/settings.json` exists and defines:
  - `ECC_GOVERNANCE_CAPTURE=1` at line 8.
  - enabled plugins block starting at line 157.
  - `superpowers@superpowers-dev` at line 167.
  - `codex@openai-codex` at line 168.
  - `context-mode@context-mode` at line 169.
  - `agent-orchestration@claude-code-workflows` at line 171.
  - `agent-teams@claude-code-workflows` at line 172.
  - `tdd-workflows@claude-code-workflows` at line 173.
  - `debugging-toolkit@claude-code-workflows` at line 174.
  - `comprehensive-review@claude-code-workflows` at line 175.
  - `agent-skills@addy-agent-skills` at line 176.
  - `intelligent-compact@claude-settings` at line 177.
  - `ecc@ecc` at line 178.
  - statusline command block at line 234.

## 2. Target-Runtime State Matrix for W218 Catalog Items

Legend:

- `INSTALLED` = directly present in target runtime config.
- `PARTIAL` = adjacent primitive is present, but exact W218 candidate is not proven installed.
- `GAP` = not found in direct target runtime config.
- `CITE-ONLY` = known as reference material, not an install surface.
- `HNF` = honest non-finding / no canonical install row.

| W218 item | W218 source/status | Target state in `claude-sota-pure` | Direct proof | Final state call |
|---|---|---|---|---|
| `microsoft/playwright-mcp` | W218 Agent A Top-10 rank 1, score 97 | `playwright` MCP configured | `.mcp.json:55` | INSTALLED |
| `ChromeDevTools/chrome-devtools-mcp` | W218 Agent A Top-10 rank 3, score 96 | `chrome-devtools` MCP configured | `.mcp.json:51` | INSTALLED |
| `github/github-mcp-server` | W218 Agent A Top-10 rank 2, score 97 | `github` MCP configured through `@modelcontextprotocol/server-github`; exact GitHub official server identity not proven from config | `.mcp.json:11` | PARTIAL |
| `github/spec-kit` | W218 Agent A Top-10 rank 5, score 96 | no `speckit`/`spec-kit` MCP or plugin visible in target config | direct config read | GAP |
| `anthropics/claude-code-security-review` | W218 Agent A Top-10 rank 4 | no direct plugin/MCP row visible; `security-guidance@claude-plugins-official` exists but is not the same repo | `settings.json` official plugin block | GAP |
| `anthropics/claude-code-action` | W218 Agent A Top-10 rank 6 | no GitHub Action/runtime wiring visible in target config | direct config read | GAP |
| `anthropics/cwc-long-running-agents` | W218 Agent A Top-10 rank 7; W219 later says already both runtimes | not visible in `.mcp.json` or enabled plugins; may exist as files outside probed configs | direct config read only | PARTIAL-UNPROVEN |
| `awslabs/mcp` | W218 Agent A Top-10 rank 8 conditional | no AWS MCP visible | direct config read | GAP |
| `grafana/mcp-grafana` | W218 Agent A Top-10 rank 9 conditional | no Grafana MCP visible | direct config read | GAP |
| `wshobson/agent-teams` | W218 Agent A Top-10 rank 10 | `agent-teams@claude-code-workflows` enabled | `settings.json:172` | INSTALLED |
| `wshobson/comprehensive-review` | W218 also-adopt list | `comprehensive-review@claude-code-workflows` enabled | `settings.json:175` | INSTALLED |
| `wshobson/tdd-workflows` | W218 also-adopt list | `tdd-workflows@claude-code-workflows` enabled | `settings.json:173` | INSTALLED |
| `wshobson/security-scanning` | W218 also-adopt/plugin pilot | no exact `security-scanning` plugin visible | direct config read | GAP |
| `wshobson/llm-application-dev` | W218 also-adopt/plugin pilot | no exact plugin visible | direct config read | GAP |
| `wshobson/plugin-eval` | W218 pilot recommendation | no exact plugin visible | direct config read | GAP |
| `wshobson/block-no-verify` | W218 pilot recommendation | no exact plugin visible | direct config read | GAP |
| `trailofbits/claude-code-devcontainer` | W218 also-adopt | no devcontainer primitive visible | direct config read | GAP |
| `obra/superpowers` | W218 Agent B ADOPT-NOW-selective; W218-H corroborates | `superpowers@superpowers-dev` enabled | `settings.json:167` | INSTALLED |
| `claude-plugins-official` selected set | W218 Agent B ADOPT-NOW | multiple official plugins enabled (`skill-creator`, security guidance, agent SDK/dev, frontend, commit commands, hookify, feature-dev, code-review) | `settings.json:157+` | INSTALLED-PARTIAL |
| `affaan-m/everything-claude-code` / ECC | W218 Agent B STUDY-PILOT | `ecc@ecc` enabled and governance env set | `settings.json:8`, `settings.json:178` | INSTALLED |
| `mksglu/context-mode` | W218-H installed ecosystem import | `context-mode@context-mode` enabled; target `.mcp.json` does not show a `context-mode` MCP row from the direct read | `settings.json:169` | INSTALLED-PLUGIN |
| `yamadashy/repomix` | W218-H installed ecosystem import | `repomix` MCP configured | `.mcp.json:23-25` | INSTALLED |
| `fcakyon/.../intelligent-compact` | W218-H installed but license gap | `intelligent-compact@claude-settings` enabled | `settings.json:177` | INSTALLED-AMBER |
| `explodinggradients/ragas` | W218-H not installed / W216 owns | not visible | direct config read | GAP |
| `AgentOps-AI/tokencost` | W218-H study-pilot pending ETL | not visible | direct config read | GAP |
| `gepa-ai/gepa` | W218-H study-pilot | not visible | direct config read | GAP |
| `anthropics/anthropic-cookbook` | W218-H cite-class canonical | no install row expected | W218-H lines 111-142 | CITE-ONLY |
| `bench/llm-bench` | W218-H HNF | no canonical candidate | W218-H lines 36, 107 | HNF |

## 3. Operational Burden Scoring for Top Candidates

Scale:

- `P0` = no-op / already active.
- `P1` = lightweight config/plugin; no service.
- `P2` = single package or MCP with simple rollback.
- `P3` = service or database with state/ports.
- `P4` = multi-service or credential-heavy stack.
- `P5` = avoid as base install without explicit operator override.

| Candidate | State | Burden | Why | Next action |
|---|---|---:|---|---|
| `playwright` MCP | installed | P0 | direct MCP row; already configured | keep; document on-demand use to control token load |
| `chrome-devtools` MCP | installed | P0 | direct MCP row; already configured | keep; pair with browser-token budget guidance |
| `repomix` MCP | installed | P0 | direct MCP row; low service burden | keep |
| `superpowers` | installed | P0 | enabled plugin | keep selective use |
| `wshobson agent-teams` | installed | P0 | enabled plugin | keep |
| `wshobson comprehensive-review` | installed | P0 | enabled plugin | keep |
| `tdd-workflows` | installed | P0 | enabled plugin | keep |
| `ECC` | installed | P0 | enabled plugin + env flip | keep |
| `intelligent-compact` | installed amber | P1 | enabled plugin; license proof gap only | close license evidence |
| `context-mode` | plugin installed | P1 | enabled plugin; no target MCP row in direct config | verify whether plugin owns MCP registration elsewhere |
| `github/github-mcp-server` | partial | P1 | GitHub MCP exists but package identity differs from W218 official repo claim | decide whether current `@modelcontextprotocol/server-github` is sufficient |
| `claude-plugins-official` selected plugins | partial installed | P1 | many official plugins enabled; exact W218 desired subset not normalized | no blanket install; add only missing named plugin |
| `github/spec-kit` | gap | P1 | filesystem/workflow install; no service; risk is command/template drift | install only if spec workflow is operator-desired |
| `anthropics/claude-code-security-review` | gap | P1 | CI/review primitive; low local service burden | verify license/repo path, then pilot |
| `anthropics/claude-code-action` | gap | P1 | GitHub Action, not local runtime service | defer until repo CI workflow is desired |
| `wshobson block-no-verify` | gap | P1 | plugin safety guard, no service | high-priority plugin pilot if license verified |
| `wshobson plugin-eval` | gap | P1 | plugin quality harness, no service | pilot after exact plugin path verified |
| `wshobson security-scanning` | gap | P1 | plugin/commands likely no persistent service | pilot only if not redundant with gitleaks/trivy/syft |
| `gepa-ai/gepa` | gap | P2 | Python package + eval corpus; no daemon but needs measured pilot | study-pilot with 30-day retirement gate |
| `AgentOps-AI/tokencost` | gap | P2 | Python package/library; useful only with ETL | defer until per-call cost JSONL contract exists |
| `ragas` | gap | P2 | Python eval package; W218-H says demand absent for token layer | keep under eval tie-breaker, not token-opt install |
| `trailofbits/claude-code-devcontainer` | gap | P3 | container/devcontainer changes affect workspace execution model | pilot in isolated branch only |
| `grafana/mcp-grafana` | gap | P3 | service credentials + observability endpoint coupling | conditional on Grafana use-case |
| `awslabs/mcp` | gap | P4 | AWS credentials and cloud blast radius | project-scoped only, not base runtime |
| `qdrant + qdrant MCP` | W219 queue, gap from W218 broader constraints | P3 | Docker stateful DB + port 6333 | install after Docker/state path decision |
| `graphiti + FalkorDB` | W219 queue, memory gap | P4 | Python package plus graph DB service/port/state | install after backend/license decision |
| `langfuse` | W219 queue, gap | P5 | full compose stack: web, worker, postgres, clickhouse, redis, minio | defer until operator accepts service burden |

## 4. W220 Install Priority Queue

This queue excludes rows already active in `claude-sota-pure` unless the action is evidence closure.

### P0 - No-Op / Keep Active

1. Keep `playwright`, `chrome-devtools`, `repomix`, `superpowers`, `agent-teams`, `tdd-workflows`, `comprehensive-review`, `ECC`, and `ccusage` as already configured.
2. Do not reinstall existing active plugins from W218 as if they were gaps.

### P1 - Evidence Closure Before Any New Install

1. Verify `intelligent-compact` upstream license; W218-H explicitly marks this gap.
2. Normalize `github` MCP identity: decide whether current `@modelcontextprotocol/server-github` satisfies the W218 `github/github-mcp-server` row or whether a migration is warranted.
3. Verify whether CWC exists outside the two probed config files before claiming `ALREADY both runtimes`.

### P2 - Low-Burden Plugin/Workflow Pilots

1. `wshobson/block-no-verify` if exact plugin path and license are verified.
2. `wshobson/plugin-eval` if exact plugin path and license are verified.
3. `github/spec-kit` if the target runtime needs spec-driven workflow commands/templates.
4. `anthropics/claude-code-security-review` after direct license/repo proof.

### P3 - Package Pilots With Measurement

1. `gepa-ai/gepa` as a 30-day prompt-evolution pilot.
2. `tokencost` only after defining JSONL-to-cost ETL and proving it is not redundant with `ccusage`.
3. `ragas` only in eval-layer tie-breaker, not as a token-optimization default.

### P4 - Service-Backed Runtime Installs

1. `qdrant + qdrant MCP` after Docker state path and backup/restore are specified.
2. `graphiti + FalkorDB` after backend/license and port/state ownership are specified.
3. `trailofbits/claude-code-devcontainer` in isolated devcontainer pilot only.

### P5 - Conditional / Avoid Base Runtime

1. `langfuse` self-host only if the operator accepts full compose topology and ongoing service lifecycle.
2. `awslabs/mcp`, `grafana/mcp-grafana`, Kubernetes/Terraform/cloud MCPs only as project-scoped tools with credential boundaries.
3. Rejected/HNF W218 items remain out: `bench/llm-bench`, archived/fit-rejected sandbox alternatives, blanket marketplace imports, and floating `@latest` production launchers.

## 5. Final Verdict

`claude-sota-pure` already contains much of the low-burden W218 runtime surface: browser MCPs, repomix, GitHub-adjacent MCP, ccusage, superpowers, wshobson core plugins, ECC, context-mode, and intelligent-compact.

The remaining high-value W220 work is not broad installation. It is targeted gap closure:

1. License and identity closure for already-installed amber rows.
2. Small plugin pilots for missing safety/eval workflow plugins.
3. Measured package pilots for `gepa` and maybe `tokencost`.
4. Explicit operator acceptance before stateful service stacks like Qdrant, Graphiti/FalkorDB, and Langfuse.

VERDICT: `W219-AGENT-B-MATRIX-COMPLETE-W220-QUEUE-READY`
