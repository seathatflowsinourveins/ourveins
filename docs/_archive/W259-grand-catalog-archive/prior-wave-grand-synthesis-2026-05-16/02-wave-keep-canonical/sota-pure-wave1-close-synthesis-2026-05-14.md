# Wave 1 Close Synthesis — SOTA-Pure Build Plan

Date: 2026-05-14
Target: `Z:/claude-sota-pure/`
Role: Agent G close-synthesis orchestrator

## SECTION 1 — Convergence verdicts per axis

| Agent | Verdict shape | Confidence | Highest-severity findings |
|---|---:|---:|---|
| Agent A research | APPROVE-PARTIAL / build evaluation runtime | not stated | Starter four are a clean seed, not a complete runtime; MCP fleet is largest missing surface; context-mode/agent-teams/comprehensive-review/ralph-loop/MCP baseline are top additions. [VERIFIED-CROSS-AGENT] |
| Agent B Codex audit | NEEDS-REVISION | 0.87 | Four-starter set lacks full MCP fleet; `codex@openai-codex` does not wire T1-T7; no plugin-shipped quality-aware auto-compact primitive found. [VERIFIED-CROSS-AGENT] |
| Agent C architect | CONDITIONAL / build Option B, keep Option A production | not stated | Option B is strategic but not parity until smoke gates pass; no copied local hooks/rules/skills/agents; MCP, review, context, orchestration, license/trust smoke required. [VERIFIED-CROSS-AGENT] |
| Agent D adversarial review | NEEDS-REVISION | 0.91 | `claude-code-workflows` is marketplace identity inside `wshobson/agents`, not an independent repo; root `marketplace.json` assumption is false; T1-T7 and quality-aware compaction parity claims must be removed. [VERIFIED-CROSS-AGENT] |
| Agent F/E SOTA extension | NEEDS-REVISION | 0.91 | No checked repo supplies full Codex-labelled T1-T7; ECC offers MIT strategic compact/PreCompact alternative; `/plugin marketplace add obra/superpowers` is suspect, prefer official or `obra/superpowers-marketplace`. [VERIFIED-CROSS-AGENT] |

## SECTION 2 — Cross-agent agreement map

High-confidence findings appearing in at least 2 agents:

| Finding | Agents | Synthesis |
|---|---|---|
| Starter four are seed installs, not complete runtime parity. | A, B, C | Proceed only as upstream-sourced evaluation runtime until added plugins/MCPs smoke. [VERIFIED-CROSS-AGENT] |
| Missing MCP fleet is a real blocker for parity claims. | A, B, C | HTTP MCPs and local stdio MCPs need separate install/smoke waves. [VERIFIED-CROSS-AGENT] |
| `codex@openai-codex` does not wire T1-T7. | B, C, D, F | Treat Codex as slash-command review/rescue plus optional Stop gate only. [VERIFIED-CROSS-AGENT] |
| No verified quality-aware proactive compaction plugin in checked set. | A, B, D, F | Use official env knobs plus continuity/strategic compact; mark quality-aware compaction as gap. [VERIFIED-CROSS-AGENT] |
| `ralph-loop` exists and should be bounded. | A, B, C, D | Keep as Stop-loop primitive, smoke with finite cap, do not treat as governance or compaction. [VERIFIED-CROSS-AGENT] |
| `agent-teams` is stronger than `agent-orchestration` alone. | A, B, C | Install `agent-teams@claude-code-workflows`; enable experimental env var; smoke team command. [VERIFIED-CROSS-AGENT] |
| `context-mode` exists but is partial/guarded. | A, B, D | It closes continuity/offload partly; license/trust/stability need explicit acceptance. [VERIFIED-CROSS-AGENT] |
| Bootstrap must select/configure upstream primitives, not implement behavior. | A, B, C, D | Local files may contain manifests, settings, MCP selection, provenance, smoke checklist. [VERIFIED-CROSS-AGENT] |
| Marketplace/repo identity needs correction. | D, F | Use `.claude-plugin/marketplace.json`; distinguish repo, marketplace name, plugin coordinate. [VERIFIED-CROSS-AGENT] |

Single-agent lower-confidence or narrower findings:

| Finding | Agent | Synthesis |
|---|---|---|
| Context-mode is young/high-churn AMBER with Elastic-2.0 and no verified named-T2 endorsement. | D | Accept only as guarded install-class or replace with permissive compact layer if policy demands. [SINGLE-AGENT] |
| ECC is best permissive compact alternative. | F | Study/pilot before default adoption because other agents did not audit ECC as install primitive for Wave 1. [SINGLE-AGENT] |
| Add pure local T1/T2/T3/T7 hooks if T1-T7 parity remains mandatory. | F | Conflicts with pure-runtime no local behavior rule; mark as Wave 2/explicit exception, not Wave 1 default. [SINGLE-AGENT] |
| `superpowers@superpowers` coordinate may be wrong. | D, refined by F | Cross-agent at identity level; exact corrected path comes from F. [VERIFIED-CROSS-AGENT] |

Contradictions:

| Tension | Resolution |
|---|---|
| A/C include `context-mode` in core first-session installs; F recommends removing it if permissive-only policy is hard. | Conditional adoption: `context-mode` is CLEARED only with Elastic-2.0/trust acceptance; ECC compact becomes Wave 2 permissive alternative. [VERIFIED-CROSS-AGENT] |
| C/A suggested `/plugin marketplace add obra/superpowers`; D warned marketplace alias risk; F says README prefers official marketplace or `obra/superpowers-marketplace`. | Replace Wave 1 command with `/plugin install superpowers@claude-plugins-official` or register `obra/superpowers-marketplace`. [VERIFIED-CROSS-AGENT] |
| F prescribes local hook chain for T1/T2/T3/T7; A/B/C/D preserve no local behavior primitives. | Do not add local hooks in Wave 1 pure runtime; mark T1-T7 parity as unresolved Wave 2 or accepted reduced behavior. [VERIFIED-CROSS-AGENT] |

## SECTION 3 — Resolved vs unresolved gaps

Agent D prescriptions:

| D edit | Status | Recommended disposition |
|---|---|---|
| D1: Correct `claude-code-workflows` repo/marketplace identity. | CONFIRMED-GAP by D and F. [VERIFIED-CROSS-AGENT] | ADOPT-NOW |
| D2: Replace root `marketplace.json` assumption with `.claude-plugin/marketplace.json`. | CONFIRMED-GAP by D and F. [VERIFIED-CROSS-AGENT] | ADOPT-NOW |
| D3-D4: Add marketplace identity and plugin existence tables. | CONFIRMED-GAP by D; supported by B provenance warnings. [VERIFIED-CROSS-AGENT] | ADOPT-NOW |
| D5: Verify/correct `superpowers@superpowers`. | CONFIRMED-GAP by D and F. [VERIFIED-CROSS-AGENT] | ADOPT-NOW |
| D6: Keep `ralph-loop`, smoke with finite cap. | RESOLVED by A/B/C/D positive evidence. [VERIFIED-CROSS-AGENT] | ADOPT-NOW |
| D7-D8: Remove T1-T7 overclaim; add gap table. | CONFIRMED-GAP by B/C/D/F. [VERIFIED-CROSS-AGENT] | ADOPT-NOW |
| D9-D11: Narrow auto-compact language; env vars documented but thresholds are operator policy. | CONFIRMED-GAP by A/B/D/F. [VERIFIED-CROSS-AGENT] | ADOPT-NOW |
| D12: Add context-mode trust warning. | SINGLE-AGENT detail, but context-mode partiality is cross-agent. [VERIFIED-CROSS-AGENT] | ADOPT-NOW |
| D13-D14: Deterministic smoke probes and trust schema. | CONFIRMED-GAP by B/C/D. [VERIFIED-CROSS-AGENT] | ADOPT-NOW |
| D15-D16: Strict local bootstrap boundary and forbidden artifacts. | RESOLVED by C plan; still should be codified. [VERIFIED-CROSS-AGENT] | ADOPT-NOW |
| D17-D18: Replace Agent A/B authority with upstream citations; add install-class decisions. | CONFIRMED-GAP by D, supported by B provenance requirements. [VERIFIED-CROSS-AGENT] | ADOPT-NOW |
| D19-D20: Freeze claims and block promotion on unverified coordinates/probes/local primitives. | CONFIRMED-GAP by C/D. [VERIFIED-CROSS-AGENT] | ADOPT-NOW |

Agent F prescriptions:

| F prescription | Status | Recommended disposition |
|---|---|---|
| F Gap 1: Treat Codex plugin as T6 Stop/commands only. | CONFIRMED-GAP by B/C/D/F. [VERIFIED-CROSS-AGENT] | ADOPT-NOW |
| F Gap 1: Add pure local T1/T2/T3/T7 hooks if parity mandatory. | SINGLE-AGENT-ONLY and contradicts pure no-local-behavior boundary. [SINGLE-AGENT] | DEFER |
| F Gap 2: Replace context-mode with ECC strategic compact if permissive-only policy is hard. | SINGLE-AGENT-ONLY, but license concern from D supports study. [VERIFIED-CROSS-AGENT] | STUDY-PILOT |
| F Gap 2: Wire ECC PreToolUse/PreCompact hooks. | SINGLE-AGENT-ONLY and would add hook behavior. [SINGLE-AGENT] | DEFER |
| F Gap 3: Correct Superpowers install path. | CONFIRMED-GAP by D/F. [VERIFIED-CROSS-AGENT] | ADOPT-NOW |
| F Gap 4: Add compact policy around 40-50% or 100K effective coding context. | SINGLE-AGENT discipline with CCBP evidence; no other agent mandates this exact policy. [SINGLE-AGENT] | STUDY-PILOT |
| F Gap 4: Use `CLAUDE_CODE_AUTO_COMPACT_WINDOW=500000` for 1M context cap. | SINGLE-AGENT-ONLY. [SINGLE-AGENT] | DEFER |
| F Cross-gap: Honest non-finding that no checked upstream repo provides complete Codex T1-T7. | CONFIRMED-GAP by B/D/F. [VERIFIED-CROSS-AGENT] | ADOPT-NOW |

## SECTION 4 — Build plan disposition

Cleared Wave 1 primitives:

| Primitive | Disposition |
|---|---|
| Minimal bootstrap manifest: `CLAUDE.md`, minimal `.claude/settings.json`, `.mcp.json`, provenance log, smoke checklist. | CLEARED, selection/configuration only. [VERIFIED-CROSS-AGENT] |
| Marketplace registration for `anthropics/claude-plugins-official`. | CLEARED. [VERIFIED-CROSS-AGENT] |
| Marketplace registration for `wshobson/agents` as marketplace `claude-code-workflows`. | CLEARED with identity table. [VERIFIED-CROSS-AGENT] |
| Marketplace registration for `addyosmani/agent-skills`. | CLEARED. [VERIFIED-CROSS-AGENT] |
| Marketplace registration for `openai/codex-plugin-cc`. | CLEARED. [VERIFIED-CROSS-AGENT] |
| `codex@openai-codex`. | CLEARED as commands plus optional Stop gate, not T1-T7 parity. [VERIFIED-CROSS-AGENT] |
| `agent-skills@addy-agent-skills`. | CLEARED as upstream skill plugin. [VERIFIED-CROSS-AGENT] |
| `agent-teams@claude-code-workflows`. | CLEARED with experimental env var and smoke gate. [VERIFIED-CROSS-AGENT] |
| `comprehensive-review@claude-code-workflows`. | CLEARED as command-driven review depth. [VERIFIED-CROSS-AGENT] |
| `ralph-loop@claude-plugins-official`. | CLEARED with finite cap smoke. [VERIFIED-CROSS-AGENT] |
| HTTP MCP wave: GitHub, Context7, DeepWiki. | CLEARED for registration/smoke, not parity claim until responsive. [VERIFIED-CROSS-AGENT] |
| Local stdio MCP wave: Playwright, Repomix, Serena, GitNexus. | CLEARED after binary/package checks and smoke. [VERIFIED-CROSS-AGENT] |

Wave 2 research required before adoption:

| Primitive/gap | Reason |
|---|---|
| Full Codex T1-T7 lifecycle parity. | No checked upstream repo supplies it; local hooks conflict with pure boundary. [VERIFIED-CROSS-AGENT] |
| Context-mode vs ECC compact strategy. | Context-mode is Elastic-2.0/AMBER per D; ECC is MIT alternative per F but not cross-audited as Wave 1 default. [VERIFIED-CROSS-AGENT] |
| Memory MCP and temporal graph memory. | A/B/C mark memory strategy as unresolved/optional second wave. [VERIFIED-CROSS-AGENT] |
| Phoenix/observability and cost telemetry. | A/B/C mark observability outside first-session baseline. [VERIFIED-CROSS-AGENT] |
| Hardening plugins `protect-mcp`, `review-agent-governance`, `hookify`. | Useful but policy-bearing; add after baseline behavior stable. [VERIFIED-CROSS-AGENT] |

Rejected for Wave 1:

| Primitive/claim | Reason |
|---|---|
| Claim that four starter marketplaces are complete runtime parity. | Refuted by A/B/C/D/F. [VERIFIED-CROSS-AGENT] |
| Claim that `codex@openai-codex` wires T1-T7. | Refuted by B/D/F. [VERIFIED-CROSS-AGENT] |
| Claim that Option B has quality-aware proactive compaction. | Refuted by A/B/D/F. [VERIFIED-CROSS-AGENT] |
| `/plugin marketplace add obra/superpowers` as written. | D/F identify coordinate/metadata mismatch; use corrected install path. [VERIFIED-CROSS-AGENT] |
| Copying Option A hooks, agents, skills, rules, or lifecycle policy text. | Violates pure runtime boundary agreed by A/B/C/D. [VERIFIED-CROSS-AGENT] |
| Treating `claude-code-workflows` as independent GitHub repo. | Refuted by D/F. [VERIFIED-CROSS-AGENT] |

Overall verdict:

CONDITIONAL-GO. Proceed with cleared upstream-sourced Wave 1 primitives now, but freeze parity claims and queue Wave 2 for T1-T7 parity, compact strategy, memory, and observability. [VERIFIED-CROSS-AGENT]

## SECTION 5 — Wave 2 scope definition

| Wave 2 item | Repo/primitive to audit | Missing convergence axis | Failed/inconclusive Probe DAG step | Suggested agent |
|---|---|---|---|---|
| Codex T1-T7 parity | `openai/codex-plugin-cc`, `everything-claude-code`, `wshobson/agents`, any additional upstream hook plugins | Axis 1 capability closure and Axis 3 fresh-runtime viability | Hook-chain truth: T1-T5 unresolved; T6 partial; T7 command-only. [VERIFIED-CROSS-AGENT] | codex-rescue + architect |
| Compact strategy | `mksglu/context-mode`, `everything-claude-code`, CCBP compact docs | Axis 2 trust/license and Axis 3 viability | Context-mode license/stability AMBER; ECC alternative not cross-audited. [VERIFIED-CROSS-AGENT] | sota-researcher |
| Memory strategy | `mcp-memory-service`, Graphiti, context-mode state, cookbook memory references | Axis 1 closure and Axis 3 viability | Memory selection not canonical; first-session baseline punts. [VERIFIED-CROSS-AGENT] | sota-researcher |
| Observability/cost telemetry | Phoenix MCP, ccusage/RTK equivalents if pure-sourced | Axis 1 closure and Axis 2 provenance | Observability absent from Wave 1 core; no smoke plan. [VERIFIED-CROSS-AGENT] | architect |
| Hardening policy plugins | `protect-mcp`, `review-agent-governance`, `hookify` | Axis 3 fresh-runtime viability | Policy files and approval windows require operator-specific schema. [VERIFIED-CROSS-AGENT] | architect |
| Superpowers coordinate verification | `claude-plugins-official`, `obra/superpowers-marketplace`, `obra/superpowers` | Axis 2 provenance | Prior command path suspect; official README offers two corrected paths. [VERIFIED-CROSS-AGENT] | sota-researcher |

## SECTION 6 — Immediate action items

Priority install and setup commands for `Z:/claude-sota-pure/`:

1. Add the primary plugin marketplaces:

```text
/plugin marketplace add anthropics/claude-plugins-official
/plugin marketplace add wshobson/agents
/plugin marketplace add addyosmani/agent-skills
/plugin marketplace add openai/codex-plugin-cc
```

Sources: Agent D verified repos and `.claude-plugin/marketplace.json` path; Agent B/A use these as clean starter seed. [VERIFIED-CROSS-AGENT]

Path rewrite: record `wshobson/agents` as repo and `claude-code-workflows` as marketplace name; do not call `claude-code-workflows` a repo. [VERIFIED-CROSS-AGENT]

2. Install core command/review/team plugins:

```text
/plugin install codex@openai-codex
/plugin install agent-skills@addy-agent-skills
/plugin install agent-teams@claude-code-workflows
/plugin install comprehensive-review@claude-code-workflows
/plugin install ralph-loop@claude-plugins-official
```

Sources: Agent A/B/C/D verify these plugin coordinates except Superpowers; D verifies `ralph-loop` exists and is not phantom. [VERIFIED-CROSS-AGENT]

Path rewrite: document `codex@openai-codex` as command + optional Stop gate only; document `ralph-loop` finite cap requirement. [VERIFIED-CROSS-AGENT]

3. Install Superpowers via corrected upstream path:

```text
/plugin install superpowers@claude-plugins-official
```

Alternative if using its own marketplace:

```text
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

Source: Agent F cites Superpowers README; Agent D/F reject the prior `/plugin marketplace add obra/superpowers` assumption. [VERIFIED-CROSS-AGENT]

Path rewrite: do not use `/plugin marketplace add obra/superpowers` unless a fresh plugin discovery smoke proves it works. [VERIFIED-CROSS-AGENT]

4. Configure documented environment toggles:

```powershell
$env:CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS = "1"
$env:CLAUDE_AUTOCOMPACT_PCT_OVERRIDE = "50"
```

Sources: Agent D verifies both env vars in official Claude docs; Agent B/C/A recommend these as upstream settings, not local behavior. [VERIFIED-CROSS-AGENT]

Path rewrite: mark `50` as operator-selected threshold, not a complete quality-aware compaction policy. [VERIFIED-CROSS-AGENT]

5. Register MCPs in two smoke waves:

```text
HTTP wave: GitHub MCP, Context7, DeepWiki
Local stdio wave: Playwright MCP, Repomix, Serena, GitNexus
```

Sources: Agent A/B/C converge on MCP baseline pack and split hosted/local smoke risk. [VERIFIED-CROSS-AGENT]

Path rewrite: secrets and local state must stay outside tracked repo; each MCP needs repo/package, HEAD/version, license, env placeholders, and smoke result in provenance. [VERIFIED-CROSS-AGENT]

Immediate non-command guardrails:

- Add marketplace identity table before install: repo, remote HEAD, marketplace name, `.claude-plugin/marketplace.json`, root/plugin license, trust tier. [VERIFIED-CROSS-AGENT]
- Add plugin existence table before install: coordinate, marketplace, repo, plugin JSON path, version, classification. [VERIFIED-CROSS-AGENT]
- Add strict bootstrap boundary: local files may select, configure, and record upstream primitives; they may not implement behavior. [VERIFIED-CROSS-AGENT]
- Freeze claims: call Option B an "upstream-sourced evaluation runtime" until smoke probes pass. [VERIFIED-CROSS-AGENT]

VERDICT: CONDITIONAL-GO conf=0.91
