# W188 Agent A - alirezarezvani Engineering Skills Pod Audit

Date: 2026-05-13
Role: sota-researcher
Scope: `claude-code-skills/engineering-skills@2.2.3`, `claude-code-skills/engineering-advanced-skills@2.4.4`, plus already-installed sub-plugins `agenthub`, `autoresearch-agent`, `caveman`.

## Executive Verdict

VERDICT: ADOPT-NOW-TOP5
confidence: 0.86

Top-5 description-cite candidates for claude-sota-installed runtime:

1. `llm-cost-optimizer` - `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/llm-cost-optimizer/skills/llm-cost-optimizer/SKILL.md:1-3`
2. `ship-gate` - `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/skills/ship-gate/SKILL.md:1-10`
3. `skill-security-auditor` - `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/skills/skill-security-auditor/SKILL.md:1-13`
4. `slo-architect` - `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/skills/slo-architect/SKILL.md:1-10`
5. `mcp-server-builder` - `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/skills/mcp-server-builder/SKILL.md:1-16`

Interpretation: ADOPT-NOW means "use/route these installed skills in runtime descriptions and operator playbooks"; not "install wholesale again." Both root plugins are already installed and permissively licensed.

## Step 1 - Inventory

Raw installed skill counts under `.claude/plugins/cache/claude-code-skills`:

| Surface | Count | Evidence |
|---|---:|---|
| `engineering-skills@2.2.3` raw `SKILL.md` files | 51 | shell inventory |
| `engineering-advanced-skills@2.4.4` raw `SKILL.md` files | 75 | shell inventory |
| Combined raw `SKILL.md` files | 126 | shell inventory |
| Direct non-asset skill paths matching `*/skills/*/SKILL.md` | 125 | shell inventory |
| Unique direct skill directory names | 116 | shell inventory |
| Root package metadata skill counts | 32 + 40 = 72 | plugin manifests below |

Count discrepancy note: the user brief says "57 skills pod"; the installed tree does not present a 57-skill surface. The package manifests say `engineering-skills` has 32 skills and `engineering-advanced-skills` has 40 skills. Raw file count is higher because sub-plugins add slash-command skills and some skills are duplicated as both root and standalone plugin copies.

Plugin metadata:

- `engineering-skills` manifest says "32 production-ready engineering skills" and "Agent skill and plugin for Claude Code, Codex, Gemini CLI, Cursor, OpenClaw"; license MIT at `.claude/plugins/cache/claude-code-skills/engineering-skills/2.2.3/.claude-plugin/plugin.json:1-12`.
- `engineering-advanced-skills` manifest says "40 advanced engineering skills" and "Agent skill and plugin for Claude Code, Codex, Gemini CLI, Cursor, OpenClaw"; license MIT at `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/.claude-plugin/plugin.json:1-12`.
- `agenthub` sub-plugin is MIT and Claude-Code-specific multi-agent collaboration at `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/agenthub/.claude-plugin/plugin.json:1-12`.
- `autoresearch-agent` sub-plugin is MIT autonomous experiment loop at `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/autoresearch-agent/.claude-plugin/plugin.json:1-12`.
- `caveman` sub-plugin is MIT and derived from Matt Pocock's MIT skill at `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/caveman/.claude-plugin/plugin.json:1-19`.

Top-level direct skill domain directories:

- `engineering-skills@2.2.3/skills`: adversarial-reviewer, ai-security, aws-solution-architect, azure-cloud-architect, cloud-security, code-reviewer, email-template-builder, engineering-skills, epic-design, gcp-cloud-architect, incident-commander, incident-response, ms365-tenant-manager, red-team, security-pen-testing, senior-architect, senior-backend, senior-computer-vision, senior-data-engineer, senior-data-scientist, senior-devops, senior-frontend, senior-fullstack, senior-ml-engineer, senior-prompt-engineer, senior-qa, senior-secops, senior-security, stripe-integration-expert, tdd-guide, tech-stack-evaluator, threat-detection.
- `engineering-advanced-skills@2.4.4/skills`: agent-designer, agent-workflow-designer, api-design-reviewer, api-test-suite-builder, browser-automation, changelog-generator, chaos-engineering, ci-cd-pipeline-builder, codebase-onboarding, command-guide, database-designer, database-schema-designer, dependency-auditor, engineering-advanced-skills, env-secrets-manager, feature-flags-architect, focused-fix, full-page-screenshot, git-worktree-manager, interview-system-designer, kubernetes-operator, mcp-server-builder, migration-architect, monorepo-navigator, observability-designer, performance-profiler, pr-review-expert, rag-architect, release-manager, runbook-generator, secrets-vault-manager, self-eval, ship-gate, skill-security-auditor, skill-tester, slo-architect, spec-driven-workflow, sql-database-assistant, tc-tracker, tech-debt-tracker.

## Step 2 - Line Probe Summary

Representative end-to-end files read: `spec-driven-workflow`, `ship-gate`, `skill-security-auditor`, `mcp-server-builder`, `llm-cost-optimizer`, `adversarial-reviewer`, `senior-architect`; targeted section probes also covered `slo-architect`, `focused-fix`, `codebase-onboarding`.

Section pattern check against common `Description` / `Usage` / `Examples` / `When to Use` headings:

| Skill | Description | Usage | Examples | When to Use | Literal proactive trigger | Cross-tool claim |
|---|---|---|---|---|---|---|
| adversarial-reviewer | yes | yes | yes | yes | no | no |
| llm-cost-optimizer | no | no | no | no | yes | no |
| mcp-server-builder | no | no | no | yes | no | no |
| ship-gate | no | no | no | no | no | no |
| skill-security-auditor | no | no | no | no | no | yes via description naming Claude Code/OpenClaw/Codex |
| slo-architect | no | no | no | yes | no | yes via `compatible_tools` |
| spec-driven-workflow | no | no | yes | no | no | no |

Key line-probe evidence:

- `llm-cost-optimizer` has the strongest auto-fire wording: "Use proactively whenever LLM API costs come up -- or should" and "Don't wait for an explicit cost complaint" at `.../llm-cost-optimizer/SKILL.md:1-3`.
- `ship-gate` has deploy-intent intercept semantics: "Intercepts deploy commands and blocks until critical items pass" at `.../ship-gate/SKILL.md:3-9`, then instructs "do NOT proceed with deployment" and ask whether to scan at `.../ship-gate/SKILL.md:21-29`.
- `skill-security-auditor` is purpose-built for pre-install skill/plugin audit, including Claude Code plugins, OpenClaw skills, and Codex skills at `.../skill-security-auditor/SKILL.md:3-12`.
- `slo-architect` declares cross-tool compatibility `[claude-code, codex-cli, cursor, antigravity, opencode, gemini-cli]` and MIT license at `.../slo-architect/SKILL.md:1-10`.
- `mcp-server-builder` supports Python and TypeScript MCP implementations and OpenAPI as source of truth at `.../mcp-server-builder/SKILL.md:12-16`; it lists MCP production workflows at `.../mcp-server-builder/SKILL.md:18-33`.
- `spec-driven-workflow` is powerful but hard-gated: "NO CODE WITHOUT AN APPROVED SPEC" at `.../spec-driven-workflow/SKILL.md:22-29`, and STOP/ask rules at `.../spec-driven-workflow/SKILL.md:66-110`.
- `adversarial-reviewer` has full classic sections and MIT license at `.../adversarial-reviewer/SKILL.md:1-10`, but overlaps heavily with existing Codex review/T1-T7 gates.

Cross-tool support verification:

- Root plugin manifests explicitly claim support for Claude Code, Codex, Gemini CLI, Cursor, OpenClaw at `engineering-skills/.../.claude-plugin/plugin.json:1-12` and `engineering-advanced-skills/.../.claude-plugin/plugin.json:1-12`.
- Codex support is not just marketing text: `.codex/instructions.md` exists in both plugins. The core plugin tells Codex to identify engineering domain, read specialist `SKILL.md`, and load only 1-2 skills per request at `.claude/plugins/cache/claude-code-skills/engineering-skills/2.2.3/.codex/instructions.md:1-40`. The advanced plugin maps tasks to `mcp-server-builder`, `skill-security-auditor`, etc. at `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/.codex/instructions.md:1-29`.
- Gemini CLI support is only manifest-level in the probed files. I did not find a Gemini-specific instruction file analogous to `.codex/instructions.md`.

## Step 3 - Probe DAG

### Probe 4 - Plugin Namespace

Verdict: MIXED, selective adoption required.

Internal duplicate names inside the two engineering packages include `chaos-engineering`, `feature-flags-architect`, `kubernetes-operator`, `slo-architect`, `init`, `run`, `review`, and `status`. Cross-plugin overlap exists with addy/everything/superpowers surfaces, including `codebase-onboarding`, `code-tour`, `spec-driven-development`, `security-review`, `tdd-workflow`, `test-driven-development`, and `systematic-debugging`.

Top-5 overlap assessment:

- `llm-cost-optimizer`: LOW-MEDIUM overlap. Runtime already has ccusage/RTK token layer, but this skill adds design-time model-routing/cost architecture conversation triggers rather than telemetry only.
- `ship-gate`: LOW overlap. Similar to generic shipping-and-launch, but the deploy-intent intercept and 8-category preflight gate are unique enough.
- `skill-security-auditor`: LOW overlap. Skill/plugin install audit is directly aligned with this repo's install discipline and not covered by generic security review.
- `slo-architect`: MEDIUM overlap with `observability-designer`; still differentiated by SLO/SLI/error-budget math and explicit compatible_tools metadata.
- `mcp-server-builder`: MEDIUM overlap with official `mcp-server-dev` plugin, but useful as a lightweight description-routed engineering workflow for internal API-to-MCP conversion.

### Probe 5 - Mode Harness Shape

Verdict: PASS for Top-5 with caveats.

- `llm-cost-optimizer`: autonomous-compatible; asks only for missing context and says not to ask for what is already known at `.../llm-cost-optimizer/SKILL.md:14-24`.
- `ship-gate`: deploy-intent hard stop is compatible with safety-first runtime, but can interrupt autonomous deploy loops by design at `.../ship-gate/SKILL.md:21-29`.
- `skill-security-auditor`: scanner workflow is CLI-first and suitable for pre-install gates at `.../skill-security-auditor/SKILL.md:20-34`.
- `slo-architect`: includes an interactive `/slo-design` wizard at `.../slo-architect/SKILL.md:206-208`, but core CLI tools/workflows are still usable without wizard gating.
- `mcp-server-builder`: autonomous-compatible if destructive tool actions require explicit confirmation; safety control appears at `.../mcp-server-builder/SKILL.md:75-82` and contract quality gates at `.../mcp-server-builder/SKILL.md:134-141`.

Non-Top-5 caveat:

- `spec-driven-workflow` is valuable but too hard-gated for default autonomous `/loop` usage because it forbids implementation before approved spec and mandates multiple STOP/ask conditions at `.../spec-driven-workflow/SKILL.md:22-29` and `.../spec-driven-workflow/SKILL.md:66-110`. It is better as STUDY-PILOT or explicit-user-trigger only, especially because Spec-Kit is already installed in the runtime contract.

### Probe 6 - Direct File / License

Verdict: PASS.

- Root plugin manifests list MIT for engineering-skills and engineering-advanced-skills at their `.claude-plugin/plugin.json:10-11`.
- Sub-plugin manifests list MIT for agenthub/autoresearch-agent/caveman at their `.claude-plugin/plugin.json:10-12`.
- `ship-gate`, `slo-architect`, and `adversarial-reviewer` include MIT in SKILL frontmatter.
- `playwright-pro/LICENSE:1-12` and `self-improving-agent/LICENSE:1-12` are MIT text.
- No AGPLv3/GPLv3 direct license blocker found in the probed installed files.

### Probe 7.a - Demand Gate

Verdict: PASS for Top-5.

Demand evidence from claude-sota-installed:

- Runtime manifest defines installed primitives as plugins/MCP servers/CLI binaries/hooks under `.claude/plugins/cache`, `.mcp.json`, and `.claude/*`, so skill/plugin curation is core runtime work (`docs/sota-installed-manifest.md:7`).
- Runtime has large plugin and skill surface; prior install-provenance explicitly says wholesale `alirezarezvani/claude-skills` should be rejected for fit and used selectively (`docs/install-provenance.md:11410-11412`).
- Runtime has token-efficiency layer and ccusage MCP/token tracking in manifest, creating direct demand for `llm-cost-optimizer` (`docs/sota-installed-manifest.md:355`).
- Runtime has MCP-heavy architecture and active MCP manifest rows, creating demand for `mcp-server-builder` and `skill-security-auditor` (`docs/sota-installed-manifest.md:7`, `docs/sota-installed-manifest.md:73`).
- Runtime uses Codex cross-model review gates and security/quality gates, creating demand for deploy-preflight and plugin security audit (`docs/sota-installed-manifest.md:89-94`).

## Step 4 - Top-5 Detail

### 1. llm-cost-optimizer

- File cite: `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/llm-cost-optimizer/skills/llm-cost-optimizer/SKILL.md:1-3`
- PROACTIVELY text: "Use proactively whenever LLM API costs come up -- or should... Don't wait for an explicit cost complaint..."
- Probe 4: LOW-MEDIUM duplicate; complements ccusage/RTK telemetry with design-time cost architecture.
- Probe 5: PASS; context-first, asks only for missing information.
- Probe 6: PASS via parent MIT manifest.
- Probe 7: PASS; runtime has ccusage MCP, RTK, CPA fleet, and token-efficiency focus.
- Rationale: Highest fit to eee's cost/token operating mode. This should become a standard trigger when AI endpoints, model choice, prompt caching, or token usage are discussed.

### 2. ship-gate

- File cite: `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/skills/ship-gate/SKILL.md:1-10`
- PROACTIVELY text: no literal "PROACTIVELY"; effective intercept phrase is "Intercepts deploy commands and blocks until critical items pass" at lines 3-9.
- Probe 4: LOW duplicate; stronger than generic launch checklist because it has deploy-intent intercept semantics.
- Probe 5: PASS with intentional hard stop on deploy intent.
- Probe 6: PASS; MIT in frontmatter line 10.
- Probe 7: PASS; runtime has quality gates and deployment-sensitive install work.
- Rationale: Useful runtime safety rail before production-affecting changes, plugin activation, MCP wiring, or release actions.

### 3. skill-security-auditor

- File cite: `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/skills/skill-security-auditor/SKILL.md:1-13`
- PROACTIVELY text: no literal "PROACTIVELY"; trigger text includes "check skill before install", "skill security check", and "skill vulnerability scan" at lines 11-12.
- Probe 4: LOW duplicate; this is specific to AI agent skills/plugin install security.
- Probe 5: PASS; CLI-first scanner workflow.
- Probe 6: PASS via parent MIT manifest.
- Probe 7: PASS; this repo continuously audits and installs skills/plugins.
- Rationale: Directly supports cardinal install discipline: pre-install scan for malicious scripts, prompt injection, dependencies, and boundary violations.

### 4. slo-architect

- File cite: `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/skills/slo-architect/SKILL.md:1-10`
- PROACTIVELY text: no literal "PROACTIVELY"; trigger text includes "define an SLO", "error budget", "burn rate", "SLI", and "multi-window burn-rate alert" at line 3.
- Probe 4: MEDIUM duplicate with observability-designer; differentiated by SLO discipline and error-budget math.
- Probe 5: PASS with caveat; `/slo-design` wizard is interactive but core workflow is usable.
- Probe 6: PASS; MIT in line 7.
- Probe 7: PASS; runtime has many background services, MCPs, CPA fleet, and reliability-sensitive loops.
- Rationale: eee has many moving pieces but limited explicit SLO/error-budget discipline. Adopt for service health definitions and rollback thresholds.

### 5. mcp-server-builder

- File cite: `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/skills/mcp-server-builder/SKILL.md:1-16`
- PROACTIVELY text: no literal "PROACTIVELY"; description is weak (`"MCP Server Builder"`), but Overview lines 12-16 define production MCP server design from API contracts.
- Probe 4: MEDIUM duplicate with official MCP server dev plugin; still useful for OpenAPI-to-MCP engineering shape.
- Probe 5: PASS; safety design requires confirmation inputs for destructive actions at lines 75-82.
- Probe 6: PASS via parent MIT manifest.
- Probe 7: PASS; runtime is MCP-heavy and has `.mcp.json` as an install-class surface.
- Rationale: Adopt as a lightweight routing skill when transforming internal/external APIs into typed MCP tools, especially when schema quality and backward compatibility matter.

## Near Misses

- `spec-driven-workflow`: strong content but STUDY-PILOT. It overlaps with installed Spec-Kit and imposes hard approval gates that can conflict with autonomous `/loop`; see `.../spec-driven-workflow/SKILL.md:22-29` and `.../spec-driven-workflow/SKILL.md:66-110`.
- `adversarial-reviewer`: strong code-review skill, MIT, and full sections; overlaps with Codex T1/T2/T3 review discipline and existing code-reviewer agents. Use explicitly, not as Top-5 adoption.
- `focused-fix`: operationally useful but hard STOP/ask behavior and overlap with superpowers systematic-debugging make it a narrower explicit trigger.

## Handoff

Goal handled: line-probed alirezarezvani engineering pod cache, verified structure/trigger/cross-tool/license/demand fit, and ranked Top-5 adopt candidates.

Files touched:

- `tmp/w188-A-engineering-skills-2026-05-13.md`

Commands run:

- Recursive `SKILL.md` inventory under `.claude/plugins/cache`.
- Direct line-number reads of representative `SKILL.md` files.
- Duplicate-name probe across plugin cache.
- Manifest/license probes for `.claude-plugin/plugin.json` and LICENSE files.
- Targeted demand-gate grep against `docs/sota-installed-manifest.md`, `docs/architecture-audit-2026-05-10.md`, `docs/wave118-architecture-audit-2026-05-09.md`.

Unresolved risks:

- The installed tree does not match the user-provided "57 skills" count. Verified surfaces are 72 by package metadata and 126 raw `SKILL.md` files including sub-plugin/duplicate paths.
- Gemini CLI support is manifest-claimed but not independently verified by a Gemini-specific instruction file in the probed cache.
- Several adopted skills have weak Claude auto-trigger descriptions unless operator routing is added; only `llm-cost-optimizer` contains literal proactive wording.

VERDICT: ADOPT-NOW-TOP5
confidence: 0.86
top_5:
- llm-cost-optimizer: `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/llm-cost-optimizer/skills/llm-cost-optimizer/SKILL.md:1-3`
- ship-gate: `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/skills/ship-gate/SKILL.md:1-10`
- skill-security-auditor: `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/skills/skill-security-auditor/SKILL.md:1-13`
- slo-architect: `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/skills/slo-architect/SKILL.md:1-10`
- mcp-server-builder: `.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/skills/mcp-server-builder/SKILL.md:1-16`
