---
title: Wave 232 — META Research-Tooling Catalog (Plugins/Agents/Skills/MCPs for Advanced SOTA Research Orchestration)
status: AUTHORITATIVE
date: 2026-05-15
wave: 232
fire: 1
predecessors: W220-W231 (21 agent reports + 4 syntheses)
artifact-class: META-tooling-catalog
question: "What research plugins enable advanced multi-agent SOTA research orchestration like W220-W231 itself?"
---

# Wave 232 — META Research-Tooling Catalog

## §0 — Scope distinction

W220-W231 produced the **RUNTIME install catalog** (what Z:\claude-sota-pure should contain).

W232 (this artifact) produces the **RESEARCH-TOOLING META-CATALOG** (what to install IN ORDER TO conduct this kind of advanced SOTA research effectively going forward).

Evidence source: W220-W231 work itself dogfooded ~12 plugins + ~15 MCPs + ~30 agents + ~50 skills + ~25 commands during the research. Reverse-engineering which tools were LOAD-BEARING gives the META catalog.

## §1 — Research-Orchestration Tier 1 (BLOCKING — must install first)

### §1.a — wshobson plugin family (Seth Hobson 35,400★ MIT)

Multi-plugin orchestration foundation:
- `agent-orchestration@wshobson` — context-manager pattern (sister to `context-management`; SHA `f930232e871c860ead279337faa777fd2cb5d333` per W228-Q deep audit — install ONE not BOTH)
- `agent-teams@wshobson` — TeamCreate/TeammateIdle/TaskCreated/TaskCompleted primitives
- `wshobson-devops-troubleshooter` — used as W230-S
- `wshobson-security-auditor` — used as W230-T
- `feature-dev@wshobson` — code-architect, code-explorer (used in W220-W228)

**Why LOAD-BEARING**: 5+ wshobson agents fan-out across W220-W230 produced the multi-perspective convergent verdicts.

### §1.b — superpowers@claude-plugins-official (171,890★ MIT)

Anthropic's official meta-skill cluster:
- `dispatching-parallel-agents` skill (W232 dogfood referenced)
- `verification-before-completion` skill (Iron Law)
- `subagent-driven-development` skill (per-task subagent dispatch with 2-stage review)
- `requesting-code-review` skill (code-review request template)
- `using-superpowers` meta-skill (1% rule + Skill Priority)

**Why LOAD-BEARING**: governs how to invoke skills before any task — Anthropic-official discipline.

### §1.c — claude-plugins-official skill-creator + agent-sdk-dev

- `skill-creator@claude-plugins-official` — author skills with eval loop (draft → eval → iterate → benchmark)
- `agent-sdk-dev` — has agent-sdk-verifier-py + agent-sdk-verifier-ts

**Why LOAD-BEARING**: when synthesis surfaces gap → can author NEW skill to fill it.

### §1.d — comprehensive-review (architect-review + code-reviewer + security-auditor)

Used as W230-U (architect-review). Provides 3rd-party adversarial review distinct from wshobson family.

**Why LOAD-BEARING**: convergent multi-perspective verdict requires DIFFERENT TEAMS, not just multiple wshobson agents.

### §1.e — codex (codex-rescue agent class)

BRIDGE-MODE codex CLI subprocess wrapper. Used in W220-B (failed FM-17.b/d) and recommended for all critical-finding cross-model verification.

**Why LOAD-BEARING**: cross-model consensus per CR-3 (Claude orchestrates / Codex reviews).

## §2 — Research-Tooling Tier 2 (MCP Layer — SHOULD install for research depth)

### §2.a — github MCP (incumbent)

`mcp__github__*` — verified essential for W220-W231 phantom-cite checks (n=27 catches).

- `get_file_contents` — TIER-1 cite verification
- `search_repositories` — multi-source discovery
- `search_code` — cross-repo pattern search
- `get_commit` / `list_commits` — convergence-gate Axis-3 cpd computation
- `list_releases` / `get_latest_release` — version-pin discipline (CR-9)

### §2.b — deepwiki MCP (`mcp__deepwiki__*`)

AI-generated structured wiki per repo. Surfaces patterns not in README keywords.
- `ask_question` — repo-level Q&A without reading every file
- `read_wiki_contents` — full documentation
- `read_wiki_structure` — topic enumeration

**LOAD-BEARING for**: SOTA pattern discovery beyond README

### §2.c — repomix MCP (`mcp__repomix__*`)

Critical for token-efficient deep audit:
- `pack_codebase` (compress=true) — ~70% token reduction
- `grep_repomix_output` — incremental retrieval
- `generate_skill` — automated skill authoring from codebase

**LOAD-BEARING for**: when audit spans ≥5 files in one repo

### §2.d — context7 MCP (`mcp__context7__*`)

Official library docs as TIER-1:
- `resolve-library-id`
- `query-docs`

**LOAD-BEARING for**: library docs more authoritative than my training data

### §2.e — perplexity / firecrawl / exa MCPs

Web-grounded research:
- `mcp__perplexity__perplexity_search` — fresh endorsements with recency filter
- `mcp__firecrawl__firecrawl_search` — live-scrape JS-rendered targets
- `mcp__exa__web_search_exa` — neural search (note: currently disabled in sss .claude/settings.json `disabledMcpjsonServers`)

**LOAD-BEARING for**: web facts + Axis-2 named-T2 practitioner discovery

### §2.f — gitnexus MCP (`mcp__gitnexus__*`)

Architecture/impact awareness:
- `impact` — blast radius before edit
- `context` — full symbol context
- `query` — execution-flow discovery
- `detect_changes` — pre-commit verification

**LOAD-BEARING for**: cardinal rule compliance pre-edit + post-commit verification

### §2.g — Memory Stack MCPs

- `mcp-memory-service@10.51.3` (L1 capture) — INSTALLED
- `graphiti@0.29.0` (L3 temporal-KG) — INSTALLED
- `serena` MCP (L0 symbolic code search) — semantic-code overlay

**LOAD-BEARING for**: cross-arc compounding learning per Karpathy §5

## §3 — Research-Tooling Tier 3 (Skills + Agents — orchestration depth)

### §3.a — Source-driven development (Addy Osmani 38,769★ MIT)

`source-driven-development@addy-agent-skills` (HEAD `742dca5` per Wave 82l):
> "Every framework-specific code decision must be backed by official documentation."

**LOAD-BEARING for**: cardinal-rule-1 cite-trail discipline at the skill layer (4th-org TIER-1-NAMED-AUTHOR-QUOTE convergence per Wave 82l)

### §3.b — Sota-researcher subagent (claude-sota inherited)

Per `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-10 + manifest §Section 18:
- Tier 1 install (not Tier 5)
- LOAD-BEARING for research-first-then-install discipline

### §3.c — claude-plugins-official `claude-code-guide`

Agent class for documentation lookups about Claude Code itself (hooks, MCP, skills, settings).

### §3.d — plugin-dev (agent-creator + plugin-validator + skill-reviewer)

When research surfaces NEED for new tooling — synthesize a plugin/agent in-runtime.

## §4 — Files-Organize / Convergence Tools

### §4.a — Existing tmp/ artifacts (W220-W231)

```
tmp/
├── wave220-agentA-uncovered-layers-deep-2026-05-15.md
├── wave221-agentD-awesome-list-missing-repos-2026-05-15.md
├── wave221-agentE-user-flagged-deep-dive-2026-05-15.md
├── wave221-agentF-cross-vendor-agent-orch-2026-05-15.md
├── wave222-agentG-outer-research-v5-v8-harvest-2026-05-15.md
├── wave222-agentH-hook-mcp-frameworks-2026-05-15.md
├── wave222-agentI-test-eval-cost-cache-skill-2026-05-15.md
├── wave223-agentJ-knowledge-fs-cloud-mcps-2026-05-15.md
├── wave223-agentK-browser-voice-image-anthropic-marketplace-2026-05-15.md
├── wave223-MASTER-CATALOG-Z-sota-pure-2026-05-15.md
├── wave225-FINAL-SYNTHESIS-Z-sota-pure-install-catalog-2026-05-15.md
├── wave226-agentM-uncovered-layers-data-stream-cloud-privacy-2026-05-15.md
├── wave226-agentN-top15-source-deep-audit-grades-2026-05-15.md
├── wave226-agentO-multi-catalog-convergence-new-repos-2026-05-15.md
├── wave227-SUPER-FINAL-SYNTHESIS-Z-sota-pure-2026-05-15.md
├── wave228-agentP-cicd-git-docs-cli-2026-05-15.md
├── wave228-agentQ-wshobson-per-plugin-deep-2026-05-15.md
├── wave228-agentR-eval-embed-rerank-auth-judge-2026-05-15.md
├── wave229-OPERATOR-EXECUTION-CATALOG-Z-sota-pure-2026-05-15.md
├── wave230-agentS-devops-install-audit-2026-05-15.md
├── wave230-agentT-security-audit-w229-catalog-2026-05-15.md
├── wave230-agentU-architect-review-phase-0-10-2026-05-15.md
├── wave231-PRE-INSTALL-COMMIT-READY-Z-sota-pure-2026-05-15.md
└── wave232-META-RESEARCH-TOOLING-CATALOG-2026-05-15.md  ← this file
```

### §4.b — Organization recommendation

Promote authoritative syntheses to permanent docs:
```
tmp/wave229-OPERATOR-EXECUTION-CATALOG-* → docs/install-catalog-w229.md
tmp/wave231-PRE-INSTALL-COMMIT-READY-* → docs/install-catalog-w231-revised.md
tmp/wave232-META-RESEARCH-TOOLING-CATALOG-* → docs/research-tooling-catalog.md
```

Retain wave-N agent reports in `tmp/` as audit-trail per FM-19 ARTIFACT-INLINE recovery convention.

### §4.c — Convergence-finding tools

Already in toolchain:
- `convergence-gate.md` (sibling claude-sota rule) — Axis 1+2+3 checks
- `multi-source-discovery-breadth-discipline.md` (sibling rule)
- `mia-pre-apply.md` (sibling rule) — verify-before-Edit
- `Z:/claude-sota-installed/.claude/rules/named-failure-modes.md` — FM-* catalog (FM-17.b/d/f / FM-19 / FM-20 / FM-21 / FM-02)

## §5 — Top 5 Research Plugins to install RIGHT NOW (priority)

### Δ1 — `superpowers@claude-plugins-official` (BLOCKING — Anthropic official)
**Status**: INSTALLED `.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/`
**Why**: provides `dispatching-parallel-agents` + `verification-before-completion` + `subagent-driven-development` + `requesting-code-review` — the meta-skills governing every wave dispatch
**Action**: confirm installed via `/plugin marketplace list` — already loaded per W232 dogfood

### Δ2 — `wshobson@112197c6` (BLOCKING — 84-plugin orchestration family)
**Status**: PARTIAL — some installed but not all 84 plugins
**Why**: provides agent-orchestration, agent-teams, context-management, feature-dev, devops-troubleshooter, security-auditor (used in W230-S+T+U)
**Action**: install via `/plugin install` from wshobson marketplace at HEAD `112197c6bfd0a1ab10d374e85a2f5efa4757b77d`
**LICENSE**: MIT (Seth Hobson) — except conductor (Apache-2.0 per W230-T Q1.3 correction)

### Δ3 — `comprehensive-review` (BLOCKING — adversarial review depth)
**Status**: INSTALLED (used as W230-U architect-review)
**Why**: provides architect-review + code-reviewer + security-auditor distinct from wshobson family — convergent multi-perspective REQUIRES different teams
**Action**: confirm via `/plugin marketplace list`

### Δ4 — `codex@openai-codex@1.0.4` (BLOCKING — cross-model gate)
**Status**: PARTIAL (codex CLI INSTALLED but BRIDGE-MODE wrapper had FM-17.b/d failure in W220-B)
**Why**: cardinal-rule-3 cross-model consensus — Claude orchestrates, Codex reviews; required for ALL critical-finding verification
**Action**: harden Pattern D foreground+tee dispatch per `cross-model-consensus.md §"On codex unavailable"` Path A; do NOT rely on BRIDGE-MODE subagent wrapper until FM-17.b/d resolved

### Δ5 — `everything-claude-code` (Tier-2 — ECC umbrella)
**Status**: INSTALLED
**Why**: provides agent-creator, plugin-validator, skill-reviewer, code-explorer, code-architect, code-reviewer, code-simplifier, build-error-resolver, security-reviewer, performance-optimizer, refactor-cleaner, doc-updater — single-plugin coverage of 20+ general-purpose agents
**Action**: confirm INSTALLED via current ToolSearch availability

## §6 — Top 5 Research MCPs to verify-wired

### Δ1 — `mcp__github__*` (BLOCKING)
**Status**: WIRED `.mcp.json:github`
**Token-cost**: ~30 tools loaded
**Verification**: probe `mcp__github__get_me` returns operator identity

### Δ2 — `mcp__deepwiki__*` (BLOCKING for SOTA discovery)
**Status**: WIRED `.mcp.json:deepwiki`
**Token-cost**: ~9 tools loaded

### Δ3 — `mcp__repomix__*` (BLOCKING for ≥5-file repo audits)
**Status**: WIRED `.mcp.json:repomix`
**Token-cost**: ~9 tools loaded

### Δ4 — `mcp__context7__*` (BLOCKING for library docs as TIER-1)
**Status**: WIRED `.mcp.json:context7`

### Δ5 — `mcp__graphiti__*` (BLOCKING for cross-arc memory)
**Status**: WIRED `.mcp.json:graphiti` (per CLAUDE.md L171 + W230-S audit)
**Backend**: FalkorDB :16379 UP

## §7 — How These Tools Should Be Used Going Forward (Operational Playbook)

### Research wave dispatch pattern (the W220-W231 shape):

```
Wave N: Fan-out 3-5 agents in parallel (CADP max-3-concurrent per parallel-agent-wave.md §CADP)
├── Agent A: sota-researcher (CLAUDE-sota inherited) — Probe DAG 1-7
├── Agent B: codex-rescue (BRIDGE-MODE) — adversarial GPT-5.5 review (CAUTION: FM-17.b/d risk; prefer Pattern D foreground+tee)
├── Agent C: wshobson-devops-troubleshooter — install/wire audit
├── Agent D: wshobson-security-auditor — license/supply-chain/secrets
└── Agent E: comprehensive-review:architect-review — system design

Wave N+1: Synthesis
├── Mia pre-apply on all returned prescriptions (n=29+ ladder)
├── Probe DAG 1-7 harness-fit verification per agent-harness-fit-verification.md
├── CR-12 6-class disposition (GENUINELY-NEW / DUPLICATE / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CANONICAL)
└── Pattern A FIX-FORWARD on all NEEDS-REVISION verdicts

Wave N+2: Pattern D codex T1 BRIDGE-MODE cross-model verification BEFORE commit
└── codex exec --ephemeral -p deep-review-exec | tee .claude/state/codex_consult_*_OUT.txt
```

### Quality scoring rubric (per repo, 10 dimensions):

| Dimension | Range | Source |
|---|---|---|
| D1 Use-class fit | 0-10 | sota-research-architecture.md |
| D2 Convergence Axis-1 (≥3 distinct T1 orgs) | 0-10 | convergence-gate.md |
| D3 Convergence Axis-2 (≥2 named T2 practitioners) | 0-10 | convergence-gate.md |
| D4 Convergence Axis-3 (≥3mo stability, cpd band) | 0-10 | convergence-gate.md |
| D5 License compatibility | 0/10 (binary) | license-trap audit |
| D6 Supply-chain trust | 0-10 | dependabot equivalent |
| D7 Probe 6 direct-file/registry | 0/10 (binary) | agent-harness-fit-verification.md |
| D8 Probe 7 demand-gate (.a REJECT / .b STUDY-PILOT) | 0-10 | agent-harness-fit-verification.md |
| D9 Stars / community | 0-10 | github API |
| D10 Wire difficulty | 0-10 (10 = trivial) | operator estimate |

Each repo gets composite letter grade A+/A/A-/B+/B/B-/C/D/F.

## §8 — Cumulative Phantom-Cite Discipline (n=27 catches, continue applying)

Every research wave MUST run phantom-cite check on returned candidates:
```bash
curl -sS "https://api.github.com/repos/<owner>/<repo>" | jq -r '.full_name, .stargazers_count, .license.spdx_id, .created_at, .updated_at'
```

If `full_name` does NOT match cited name OR returns 404 → PHANTOM. Document in `docs/verified-avoid.md` Cohort matching failure class.

W227+W229+W231 catches integrated: atlassian-labs/mcp-compressor PHANTOM / distill-mcp PHANTOM / chopratejas/headroom CONFLICT-RESOLVED-EXISTS / claude-squad AGPL REJECT / agent-orchestration=context-management SHA-DUPLICATE / playwright-mcp DEPRECATED-MICROSOFT-OWN-REVISION / conductor Apache-2.0-not-MIT.

## §9 — Recommended Next Action (operator decision)

### Path A — Execute W231 pre-conditions then Phase 1 commit
```
1. §1.a infrastructure isolation
2. §1.b sops+age+.env.encrypted setup
3. §1.c _secret_redactor.py 9-new-patterns
4. §1.d version-pin discipline
5. §1.e Pattern D codex T1 BRIDGE-MODE review
6. Phase 1 commit (Memory Stack already INSTALLED — just provenance commit)
```

### Path B — Continue research waves on uncovered layers
Per W226-M findings: data-stream / cloud / privacy layers ALL R0 REJECTED. Could deep-dive on:
- LLMLingua replacements (user flagged outdated 2026-05) — research SOTA token compression May 2026 alternatives
- Streaming/event-driven layer (deepgram, livekit, Apache Kafka MCP)
- Privacy/PII (Microsoft Presidio MCP, Llama Guard variants beyond PurpleLlama)

### Path C — Z:\claude-sota-pure scaffold + selective install
Bootstrap NEW runtime at Z:\claude-sota-pure with:
1. CLAUDE.md + CLAUDE.local.md + tools/eee.ps1 (bootstrap-only per CR-5)
2. Install W231 §2 Phase 0-2 (sops + age + Memory Stack L1+L3 + Tier-A CLI)
3. Iteratively add Phase 3-10 per W231 revised order
4. Each Phase: dispatch wshobson-devops-troubleshooter + wshobson-security-auditor + comprehensive-review:architect-review post-install for verification

## §10 — verdict_one_line

`META-RESEARCH-TOOLING catalog identifies Top 5 plugins (superpowers + wshobson + comprehensive-review + codex + everything-claude-code) and Top 5 MCPs (github + deepwiki + repomix + context7 + graphiti) as BLOCKING infrastructure for advanced multi-agent SOTA research orchestration; W220-W231 dogfooded all 10 to produce 21 agent reports + 4 syntheses; W231 PRE-INSTALL-COMMIT-READY catalog is ready for Path A/B/C operator decision`

**OPERATOR DECISION REQUIRED**: Path A (commit) / Path B (more waves on uncovered layers) / Path C (Z:\claude-sota-pure scaffold + selective install).
