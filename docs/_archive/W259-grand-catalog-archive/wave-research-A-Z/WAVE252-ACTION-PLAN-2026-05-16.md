# Wave 252 Agent A Action Plan — 2026-05-16

## §0 — Source Summary

### Grand Synthesis §4 verbatim key lines

1. Fix BRIDGE-MODE first, then rerun a narrow Codex T1/adversarial pass on this grand synthesis.

2. Produce the W252 two-tier catalog:
   - Tier A: default runtime mutation candidates, limited to permissive-license, verified-native-path, low-collision rows.
   - Tier B: broad SOTA coverage, including pilots, cite-class papers, provider complements, and blocked-license rows.

3. Execute the P0/P1 cleanup queue before adding more installs:
   - Resolve `context-mode`, FalkorDB, `protect-mcp`, and Trail of Bits license/path issues.
   - Compare official GitHub MCP and enable/check secret scanning.
   - Pilot Kubernetes MCP, Browserbase, mini-swe-agent, and SWE-Skills-Bench with constrained credentials and eval-only boundaries.

### Top-3 candidates from Agent B with scores

| Rank | Candidate | Repo URL | Agent B score fields |
|---:|---|---|---|
| 1 | Kubernetes MCP Server | https://github.com/containers/kubernetes-mcp-server | Stars 1,593; Probe DAG 7/7; SRA 9/10; Wired P1; License Apache-2.0 |
| 2 | Browserbase MCP | https://github.com/browserbase/mcp-server-browserbase | Stars 3,339; Probe DAG 7/7; SRA 9/10; Wired P1; License Apache-2.0 |
| 3 | mini-swe-agent | https://github.com/SWE-agent/mini-swe-agent | Stars 4,368; Probe DAG 7/7; SRA 9/10; Wired P1; License MIT |

## §1 — Probe DAG Results (Top-3 Candidates)

### Kubernetes MCP Server

- Name + repo URL: `containers/kubernetes-mcp-server` — https://github.com/containers/kubernetes-mcp-server
- Probe 4 result: CLEAN. Checked `.mcp.json` and `.claude/plugins/` via `rg -i "kubernetes-mcp|kubernetes|containers/kubernetes"`; no existing install or plugin match found.
- Probe 6 result: LICENSE-PASS — Apache-2.0. Checked with `gh api repos/containers/kubernetes-mcp-server`.
- Probe 7a result: named concrete workflow — read-only Kubernetes/OpenShift inspection workflow for diagnosing cluster state, manifests, pods, services, and events from a constrained kubecontext with destructive verbs denied.

### Browserbase MCP

- Name + repo URL: `browserbase/mcp-server-browserbase` — https://github.com/browserbase/mcp-server-browserbase
- Probe 4 result: CLEAN. Checked `.mcp.json` and `.claude/plugins/` via `rg -i "browserbase|mcp-server-browserbase|stagehand"`; no existing install or plugin match found.
- Probe 6 result: LICENSE-PASS — Apache-2.0. Checked with `gh api repos/browserbase/mcp-server-browserbase`.
- Probe 7a result: named concrete workflow — cloud browser automation workflow for remote web QA, SaaS-login debugging, and cross-session browser reproduction beyond local Playwright/Chrome DevTools, gated by API-key and browser-data boundary review.

### mini-swe-agent

- Name + repo URL: `SWE-agent/mini-swe-agent` — https://github.com/SWE-agent/mini-swe-agent
- Probe 4 result: CLEAN. Checked `.mcp.json` and `.claude/plugins/` via `rg -i "mini-swe|SWE-agent|swe-agent"`; no existing install or plugin match found.
- Probe 6 result: LICENSE-PASS — MIT. Checked with `gh api repos/SWE-agent/mini-swe-agent`.
- Probe 7a result: named concrete workflow — eval/reference harness workflow for SWE-bench style issue-fix loops, used to compare eee/Claude Code behavior against a compact external agent harness without making it the default runtime.

## §2 — Recommended Install Actions (P0→P3)

### P0: drop-in install candidates

- None from the top-3. All three are CLEAN and permissive, but none are pure drop-in plugin/provider toggles: Kubernetes MCP and Browserbase MCP need MCP wiring and credential/scope policy; mini-swe-agent should remain eval/reference and needs package/clone workflow selection.

### P1: needs pip/.mcp.json wire

- `containers/kubernetes-mcp-server` — proceed as constrained pilot only. Add a read-only kubecontext, destructive-verb denylist, and explicit credential boundary before `.mcp.json` mutation.
- `browserbase/mcp-server-browserbase` — proceed as constrained pilot only if Browserbase SaaS/API-key boundary is accepted. Wire as a cloud-provider browser profile, not a replacement for local Playwright/Chrome DevTools.
- `SWE-agent/mini-swe-agent` — proceed as eval/reference harness. Install outside default runtime mutation and document invocation path for SWE-bench style comparison runs.

### P2: needs clone+build

- `SWE-agent/mini-swe-agent` if the chosen native path requires direct clone rather than package install.

### DEFER: license blocker or demand-absence

- None of the top-3 are blocked by license or demand absence. Kubernetes MCP and Browserbase remain constrained by credential/security boundaries, not license.

## §3 — Wave 250 File Location Scan

Requested command behavior:

- The literal prompt form with `extglob.Name` was attempted and timed out after repeated PowerShell errors: `The term 'extglob.Name' is not recognized as a name of a cmdlet, function, script file, or executable program.`

Corrected PowerShell object command run:

```powershell
Get-ChildItem -Recurse -LiteralPath 'Z:\claude-sota-installed\docs\outer research' | Where-Object { $_.Name -match 'wave250|A1|A2|A3' } | Select-Object -ExpandProperty FullName
```

Result:

- No matching paths were returned on disk under `Z:\claude-sota-installed\docs\outer research` for names matching `wave250|A1|A2|A3`.

## §4 — WAVE252-VERDICT

WAVE252-VERDICT:

NEEDS-HUMAN-TRIAGE — the top-3 candidates are duplicate-clean and permissive-license, but Grand Synthesis §4 requires BRIDGE-MODE repair and P0/P1 cleanup before default runtime installs; proceed only with constrained pilots/eval wiring.
