# Agent J — Top-3 6-Probe-DAG Verification (Wave 3 Agent H candidates)

**Date**: 2026-05-14
**Scope**: Verify 3 high-star candidates surfaced by Agent H against harness-fit 6-Probe DAG (count-OVER / SDK-vs-CLI / architectural-API / plugin-namespace / mode-harness-shape / direct-file-blockers) + demand-gate.
**Method**: GitHub API direct probe (count + license + last-push) + `.claude-plugin/marketplace.json` content read + dedup vs Agent C Phase 0-6 Option B plan + sibling REVERT-history check.

---

## Verdicts (one-line per candidate)

| # | Candidate | Verdict | Disposition |
|---|---|---|---|
| 1 | **anthropics/financial-services** + **financial-services-plugins** | **VERIFIED-REJECT-FOR-FIT** (Probe 7.a DEMAND-ABSENCE) | DROP from Phase 2A — no Option B workflow consumes finance-vertical primitives |
| 2 | **VoltAgent/awesome-claude-code-subagents** | **VERIFIED-REJECT-FOR-FIT** (Probe 4 DUPLICATE-FUNCTIONALITY vs wshobson/agents Phase 6) | DROP from Phase 2/3 — superseded by wshobson workflow plugins already in Phase 6 |
| 3 | **eyaltoledano/claude-task-master** | **VERIFIED-REJECT-FOR-FIT** (Probe 6 LICENSE BLOCKER — MIT + Commons Clause non-permissive) + (Probe 5 mode-harness-shape — cross-IDE/MCP target ≠ Option B native plugin) | DROP — license violates CR-9 permissive-only invariant; sibling-disablement-history claim was inaccurate (claude-sota retired) |

**0 of 3 promoted to Phase 2A/2B install plan.** Agent H's Top-3 candidates DO NOT survive 6-Probe DAG.

---

## Critical correction to operator brief

Agent H stated: *"sss `task-master` MCP currently disabled per `.claude/settings.json:disabledMcpjsonServers`"*. **This is stale Marker Decay**:
- `Z:/claude-sota-installed/.claude/settings.json:disabledMcpjsonServers = []` (EMPTY — verified via `grep -A 30 disabledMcpjsonServers`)
- `Z:/claude-sota/` does NOT EXIST (path returned `No such file or directory` via `ls Z:/claude-sota/`). The sibling has been RETIRED — `Z:/claude-sota(retired)/` exists in `Z:/` root listing.
- `verified-avoid.md` does NOT exist in either claude-sota-installed or claude-sota(retired) per `ls` probe.
- No `task-master` memory files exist in the now-retired sibling (Glob returned empty).

The "task-master disablement" precedent Agent H cited cannot be verified. **However**, the license blocker (below) provides an independent ground for REJECT — so the conclusion stands even after correcting the bad provenance.

---

## 1. anthropics/financial-services (+ financial-services-plugins)

### P1 count-OVER probe

| Claim | Verified | Source |
|---|---|---|
| Stars | **22,804** (was 22,290 — Agent H is +2.3% stale, within drift tolerance) | `mcp__github__search_repositories` 2026-05-14 |
| Forks | 3,120 | same |
| Open issues | 138 | same |
| Last push | 2026-05-15 (1 day ago — VERY active) | same |
| Archived | false | same |
| License | Apache-2.0 | same |
| Plugin count | **20** (verified via marketplace.json `plugins[]` enumeration) | `repo://anthropics/financial-services/sha/ac4c5b4c.../contents/.claude-plugin/marketplace.json` |

**P1 PASS** — count is accurate; verifies Anthropic-OFFICIAL provenance.

### P2 SDK-vs-CLI surface

Plugin via `/plugin install anthropics/financial-services` (canonical Anthropic mechanism per CR-6). **P2 PASS.**

### P3 architectural-API

All plugins are Claude Code native (skills + agents). Anthropic-API compatible. Examples: `financial-analysis`, `pitch-agent`, `market-researcher`, `model-builder`. **P3 PASS.**

### P4 plugin-namespace

No overlap with Phase 0-3 plan plugins (anthropics/claude-plugins-official, wshobson/agents, addy-agent-skills, openai/codex-plugin-cc, context-mode, superpowers). The 20 plugins are all NEW namespace (`financial-analysis`, `investment-banking`, `equity-research`, `private-equity`, `wealth-management`, `fund-admin`, `operations`, `pitch-agent`, `market-researcher`, `earnings-reviewer`, `meeting-prep-agent`, `model-builder`, `gl-reconciler`, `kyc-screener`, `valuation-reviewer`, `month-end-closer`, `statement-auditor`, `lseg`, `sp-global`, `claude-for-msft-365-install`). **P4 PASS** (no namespace collision).

### P5 mode-harness-shape

Each plugin loads a skill set; agents fire on description match. Compatible with autonomous /loop mode. **P5 PASS.**

### P6 direct-file/registry blockers

LICENSE: Apache-2.0 (permissive). README: not archived, not deprecated. **P6 PASS.**

### Probe 7 — demand-gate **(BLOCKER)**

> **What sss workflow / invocation surface / consumer would route through these 20 finance-vertical plugins TODAY?**

Inspection of every plugin description in marketplace.json (verbatim):
- `financial-analysis`: DCF, comps, LBO, 3-statement models, competitive analysis, deck QC
- `investment-banking`: deck creation, client/market insights, transaction management
- `equity-research`: earnings analysis, initiating coverage reports
- `private-equity`: deal sourcing, CRM integration, founder outreach
- `wealth-management`: client reviews, financial planning, portfolio analysis
- `fund-admin`: GL reconciliation, break tracing, accruals, NAV tie-out
- `operations`: KYC document parsing, rules-grid evaluation
- `pitch-agent`, `market-researcher`, `earnings-reviewer`, `meeting-prep-agent`, `model-builder`, `gl-reconciler`, `kyc-screener`, `valuation-reviewer`, `month-end-closer`, `statement-auditor`: finance-domain workflow agents
- `lseg`, `sp-global`: vendor-data integrations (Bloomberg/Refinitiv equivalents)
- `claude-for-msft-365-install`: Microsoft 365 add-in provisioning (Azure admin consent + Graph API attributes)

**None of these route to an Option B sss workflow.** Option B is a clean upstream-sourced **DEVELOPER runtime** (per Agent C Phase 0-6: CLI / agent / skill / MCP layer for code engineering). The financial-services plugins are vertical-domain **END-USER FINANCE workflows**.

**Probe 7.a DEMAND-ABSENCE** per `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md` Probe 7.a (REJECT-FOR-FIT). NO current/queued workflow consumes them. They are install-class candidates ONLY if the operator pivots Option B to be a financial-analyst-runtime — which is NOT the Option B scope per Agent C verdict.

**Note on Probe 7.b (DEMAND-CREATES-NEW-WORKFLOW)**: would NOT survive — there is no committed sss ETL/wiring path to consume DCF/LBO/NAV/KYC primitives; all 5 clauses fail.

**EXCEPTION CONSIDERATION** (per operator brief "are any of its plugins relevant for Option B's CLI/agent/skill/MCP layer regardless of branding?"): exhaustive review of 20 plugin descriptions reveals **zero** general-purpose CLI/agent/skill/MCP primitives. Even `claude-for-msft-365-install` is provisioning-only for Azure tenant deployment of the M365 add-in (operator runtime is portable-Z:\ Win11 Pro, NOT enterprise Azure tenant).

### Verdict for #1

**VERIFIED-REJECT-FOR-FIT** under Probe 7.a DEMAND-ABSENCE. Anthropic-OFFICIAL provenance + Apache-2.0 + active maintenance are necessary but NOT sufficient — the 20 plugins target a different operator persona (finance professional, not developer harness). Re-evaluate IF Option B's scope expands to include financial-analyst workflows.

---

## 2. VoltAgent/awesome-claude-code-subagents

### P1 count-OVER probe

| Claim | Verified | Source |
|---|---|---|
| Stars | **19,812** (was 19,746 — Agent H +0.3% stale, negligible) | `mcp__github__search_repositories` 2026-05-14 |
| Forks | 2,296 | same |
| Open issues | 21 | same |
| Last push | 2026-04-20 (25 days ago — STABLE-BURN-IN per convergence-gate Axis-3) | same |
| Archived | false | same |
| License | **MIT** (Agent H "assumed MIT" — VERIFIED) | same |
| Plugin count | **10 categories** (was claimed "100+ subagents in 10 plugins"; marketplace.json verifies 10 plugins; agent-count internal to each) | `repo://VoltAgent/awesome-claude-code-subagents/sha/6f804f0c.../contents/.claude-plugin/marketplace.json` |

**P1 PASS** — counts verified; license confirmed MIT.

### P2 SDK-vs-CLI surface

Plugin via `/plugin install` (canonical). **P2 PASS.**

### P3 architectural-API

Subagents are markdown frontmatter + body — Claude Code native, Anthropic-API compatible. **P3 PASS.**

### P4 plugin-namespace **(BLOCKER)**

VoltAgent's 10 plugins map directly onto roles that **`wshobson/agents` Phase 6 already covers**:

| VoltAgent plugin | Description | Phase 6 wshobson coverage |
|---|---|---|
| `voltagent-core-dev` (backend/frontend/fullstack/mobile/api) | Essential development subagents | **`backend-development`, `frontend-mobile-development`** (Phase 6 explicit installs) |
| `voltagent-lang` (Python/TypeScript/Go/Rust/Java/React/Vue/Angular) | Language specialists | **`python-development`, `javascript-typescript`** (Phase 6 explicit installs) |
| `voltagent-infra` (DevOps/K8s/Terraform/AWS/Azure/GCP) | Infrastructure | NOT in Phase 6 — gap, but wshobson catalog has equivalents per Agent C Phase 6 "Demand-load workload plugins instead of installing a maximal agent catalog" discipline |
| `voltagent-qa-sec` (testing/security/code-review/QA) | Quality & security | **`security-scanning`** (Phase 6 explicit install) + `comprehensive-review` (Phase 2 install) |
| `voltagent-data-ai` (data eng/ML/LLM) | Data & AI | NOT in Phase 6 baseline — demand-load gap |
| `voltagent-dev-exp` (CLI/docs/DX) | Developer experience | partially covered by `agent-skills@addy-agent-skills` (Phase 2) |
| `voltagent-domains` (blockchain/fintech/gaming/IoT/payments) | Specialized domains | NOT in Phase 6 — narrow, demand-load only |
| `voltagent-biz` (product/legal/UX/scrum) | Business & product | NOT in Phase 6 — out of dev scope |
| `voltagent-meta` (multi-agent orchestration) | Meta-orchestration | **DIRECT OVERLAP with `agent-teams@claude-code-workflows`** (Phase 2 install) + `superpowers` |
| `voltagent-research` (market research/competitive analysis) | Research & analysis | NOT in Phase 6 — orthogonal to code-research; Phase 4 has `Context7`/`DeepWiki` MCPs for code-research |

**P4 FAIL** — 5 of 10 VoltAgent plugins DUPLICATE Phase 0-6 installs structurally (`voltagent-core-dev`, `voltagent-lang`, `voltagent-qa-sec`, `voltagent-meta`, partial `voltagent-dev-exp`).

Per CR-12 6-class disposition lattice: **DUPLICATE-FUNCTIONALITY** (5 plugins) + **PARTIAL-OVERLAP** (1 plugin) + **GENUINELY-NEW** (4 plugins: `voltagent-infra`, `voltagent-data-ai`, `voltagent-domains`, `voltagent-biz`, `voltagent-research`).

### P5 mode-harness-shape

No HARD-GATE on interactive approval (subagents fire on `description:` match per CC native). **P5 PASS.**

### P6 direct-file/registry blockers

MIT + not archived + active. **P6 PASS.**

### Probe 7 — demand-gate

Of the 4 GENUINELY-NEW plugins, demand-gate analysis:
- `voltagent-infra` — NO current sss DevOps workflow; provision/deploy not in Option B scope per Agent C
- `voltagent-data-ai` — NO data-pipeline workflow; out of Option B scope
- `voltagent-domains` — fintech/blockchain/gaming = OUT of Option B scope (matches #1 finance-services REJECT logic)
- `voltagent-biz`, `voltagent-research` — OUT of Option B developer-runtime scope

**Probe 7.a DEMAND-ABSENCE for all 4 genuinely-new plugins.**

### Verdict for #2

**VERIFIED-REJECT-FOR-FIT** — composite verdict:
- 5/10 plugins DUPLICATE-FUNCTIONALITY (Probe 4 BLOCKER) per CR-12 lattice
- 5/10 plugins DEMAND-ABSENCE (Probe 7.a) — out of Option B developer-runtime scope
- 0/10 plugins survive both probes

VoltAgent is a high-quality reference catalog (MIT, 19.8k★, named org, STABLE-BURN-IN), but **structurally redundant with wshobson + agent-teams + superpowers Phase 0-6 plan**. Agent H's framing "complements wshobson/agents (different scope)" is empirically refuted — Phase 6 demand-loads the same axis (language/backend/frontend/security) via wshobson.

**CITE-CLASS-CANONICAL** disposition per CR-12: keep as cite-reference for individual subagent design patterns (when wshobson lacks a specialist), but do NOT marketplace-install.

---

## 3. eyaltoledano/claude-task-master

### P1 count-OVER probe

| Claim | Verified | Source |
|---|---|---|
| Stars | **27,140** (was 27,131 — Agent H +0.03% stale, negligible) | `mcp__github__search_repositories` 2026-05-14 |
| Forks | 2,529 | same |
| Open issues | 191 (HIGH — suggests rapid evolution + maintenance debt) | same |
| Last push | 2026-04-28 (16 days ago — active) | same |
| Archived | false | same |
| License | **NOASSERTION** (GitHub API) → resolved to "**MIT + Commons Clause**" (LICENSE file directly verified) | `repo://eyaltoledano/claude-task-master/.../contents/LICENSE` |
| Plugin count | **1** (single `taskmaster` plugin, NOT N) | `repo://eyaltoledano/claude-task-master/.../contents/.claude-plugin/marketplace.json` |

**P1 PASS** (count accurate) but **CRITICAL LICENSE FINDING** — see P6.

### P2 SDK-vs-CLI surface

Plugin via `/plugin install` OR npm via `task-master-ai` (per LICENSE text). **P2 PASS** for CC plugin route.

### P3 architectural-API

Cross-IDE/cross-MCP target — README/homepage `https://tryhamster.com` markets it for "Cursor, Lovable, Windsurf, Roo" + Claude. Architecturally MCP-centric. **P3 PASS** but see P5 mode-harness-shape concern.

### P4 plugin-namespace

Task-management not covered by Phase 0-6 plan. **P4 PASS** (no overlap).

### P5 mode-harness-shape **(BLOCKER)**

Repository topics from API: `cursor`, `cursor-ai`, `cursorai`, `lovable`, `lovable-dev`, `roocode`, `task-manager`, `tasks`, `tasks-list`, `windsurf`, `windsurf-ai`. The README markets it as "drop into Cursor, Lovable, Windsurf, Roo, and others" — implying multi-IDE PRIMARY scope, with Claude Code as one of several runtimes.

The `.claude-plugin/marketplace.json` shows ONE plugin (`taskmaster`) targeting Claude Code, but the upstream design center is **multi-IDE MCP-server** (`tryhamster.com` commercial product). Option B's CR-12 PRIMARY priority is "install from upstream SOTA via official-native-channel" — for a multi-runtime tool, the official-native-channel is potentially Claude-Code-secondary.

**P5 PARTIAL** — works in CC plugin form, but architectural emphasis is elsewhere. Risk: features land first in Cursor/Windsurf, lag in Claude Code wrapper.

### P6 direct-file/registry blockers **(HARD-BLOCKER)**

LICENSE text directly verified at `repo://eyaltoledano/claude-task-master/sha/c0c98d.../contents/LICENSE`:

> "MIT License" PLUS "**Commons Clause** License Condition v1.0: ...the License does not grant to you, the right to **Sell** the Software... 'Sell' means practicing any or all of the rights granted to you under the License to provide the Software to third parties, for a fee or other consideration (including without limitation fees for hosting or consulting/support services related to the Software)..."

**License is NOT permissive.** Per CR-9 install-risk discipline (`Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-9) + `cardinal-rule-1` cite-discipline: claude-sota-installed is **permissive-license-only** per `agent-harness-fit-verification.md` Probe 6 spec (MIT / Apache-2.0 / BSD acceptable; non-permissive REJECT). MIT + Commons Clause is a **commercial-restriction overlay** — it's structurally equivalent to BUSL/MariaDB BSL/MongoDB SSPL/Elastic EL — adoption gate REJECT.

**Probe 6 HARD-REJECT.**

Cross-reference: ECC `kiss-dry-yagni.md` Must-Never license-incompatibility precedent in sibling work (openviking AGPLv3 REJECT; Mongo SSPL REJECT pattern). MIT + Commons Clause falls into the same category — permissive on its face, but with explicit commercial-use restriction.

### Probe 7 — demand-gate

Even setting aside license: Option B has NO current task-management workflow that demands an installed primitive. Option B Phase 6 uses `agent-teams@claude-code-workflows` for multi-agent task coordination + native CC TaskCreate/TaskUpdate primitives. **Probe 7.a DEMAND-ABSENCE secondary.**

### Verdict for #3

**VERIFIED-REJECT-FOR-FIT** — composite:
- **Probe 6 HARD-REJECT**: license is MIT + Commons Clause (non-permissive; commercial-use restriction)
- **Probe 5 PARTIAL**: multi-IDE primary scope; CC is secondary integration
- **Probe 7.a secondary**: no current sss task-management workflow demand

Sibling-disablement-history claim in Agent H brief was based on a non-existent reference (`claude-sota` retired). However the independent license blocker is decisive.

**Re-eligibility path**: only if upstream changes LICENSE to pure MIT/Apache-2.0 (removing Commons Clause) OR if claude-sota-installed adopts an explicit commercial-restriction policy carve-out (NOT recommended per CR-1 cite-discipline canonical permissive-only).

---

## HONEST-NON-FINDINGS

1. **claude-sota retirement**: the sibling cited by Agent H + operator brief ("`Z:/claude-sota/.claude/settings.json` disabledMcpjsonServers") does NOT exist. `Z:/claude-sota(retired)/` is the actual path. Agent H's task-master disablement-history finding cannot be verified against any active sibling — it is **HONEST-NON-FINDING for the cite-trail** but the verdict (REJECT) stands on independent license grounds.

2. **`verified-avoid.md` absent**: neither claude-sota-installed nor claude-sota(retired) has `docs/verified-avoid.md`. The verified-avoid REJECT-history surface this runtime relies on per Probe 6 specification is **NOT-INSTALLED** — a separate gap orthogonal to this verification fire.

3. **Probe 1 numeric drift**: all 3 candidates' star counts in Agent H brief were within +0.03 to +2.3% of current truth (Marker Decay tolerable). No OVER-claims surfaced.

4. **Anthropic-OFFICIAL provenance ≠ Option B fit**: financial-services has the strongest possible provenance (Anthropic org, Apache-2.0, active maintenance) yet REJECTS on demand-gate. Provenance alone is necessary-not-sufficient; **Probe 7 demand-gate is the binding constraint** for harness-fit verification.

5. **Operator brief mentioned "20+8 plugins"** for financial-services + financial-services-plugins. The verified marketplace.json shows **20 total** (consolidated under `anthropics/financial-services` with `vertical-plugins/` + `agent-plugins/` + `partner-built/` + `claude-for-msft-365-install/` subdirs). The "+8" appears to be either a separate fork OR Agent H double-counted internal categories. **HONEST-NON-FINDING on the +8 claim** — only 20 plugins verified.

---

## Prescribed Phase 2A/2B addition

**NONE.** All 3 candidates REJECTED.

Per CR-12 + CR-1: no `/plugin install` commands, no `.mcp.json` fragments to add to Option B plan.

### What to do with these candidates instead

- **financial-services**: cite-reference only in `docs/verified-avoid.md` under "demand-absence" cohort (when that file is created per HNF #2 above). Re-evaluate IF Option B scope changes.
- **VoltAgent**: cite-reference only in `team-orch-frameworks.md` selectively-vendored sister catalog — individual subagents from VoltAgent's 10 categories may be design-pattern-extracted (without install) when wshobson lacks a specialist for a specific role. Per CR-12 disposition: **CITE-CLASS-CANONICAL**.
- **claude-task-master**: cite-reference only in `docs/verified-avoid.md` under "non-permissive license" cohort. Forward-only: re-eligible IF upstream removes Commons Clause.

### Recommended follow-on fires (not part of this verification)

1. **Create `docs/verified-avoid.md`** with 4 starter cohorts (META-HARNESS competing-framework / direct-file-registry-blocker / demand-absence / non-permissive license) — closes HNF #2 gap.
2. **Update Agent C Phase 0-6 plan** to explicitly cite Phase 2A `# rejected: anthropics/financial-services (Probe 7 DEMAND-ABSENCE — see Agent J verdict)` comments to prevent re-litigation.
3. **Agent H Wave 3 needs re-run with stricter dedup** — Agent H surfaced 3 candidates whose individual scrutiny REJECTS all 3; Agent H's filter is too permissive on the upstream-end. Recommend re-narrowing the candidate list against Phase 0-6 baseline before next escalation.

---

**File**: `Z:/claude-sota-installed/tmp/sota-pure-top3-verify-J-2026-05-14.md`
