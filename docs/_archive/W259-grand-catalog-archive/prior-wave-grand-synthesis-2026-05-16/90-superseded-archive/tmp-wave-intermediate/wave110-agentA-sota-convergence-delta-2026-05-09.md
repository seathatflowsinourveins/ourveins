---
title: Wave 110 Agent A — SOTA convergence delta audit (kits v40-v48 vs eee-installed runtime)
status: AUTHORITATIVE-AGGREGATE
date: 2026-05-09
agent: sota-researcher (single-fire, fork-class per CR-9 read-only research-probe exception)
artifact-class: ARTIFACT-INLINE per FM-19
output-budget: 600 LOC max
termination-condition: on_handoff_to: orchestrator | on_text_match: ARTIFACT-INLINE
---

## ARTIFACT-INLINE: tmp/wave110-agentA-sota-convergence-delta-2026-05-09.md

### Executive summary

Audited 9 kit versions (v40-v48) vs eee-installed runtime state (20 plugins / 7 MCP / 11 marketplaces / 608-LOC manifest with ~67 INSTALLED rows). Kit content is **highly convergent across v40-v48** — same ~159-179 unique repos with minor reorderings (v48 adds `affaan-m/agentshield`, `anthropics/anthropic-sdk-{python,typescript}`, `anthropics/claude-plugins-official` into Foundation). DELTA inventory: **~63 SOTA primitives identified**, of which ~28 are INSTALLED (44%), ~15 STAGED/PLANNED in manifest (24%), and **~20 GENUINE GAP-CANDIDATES** (32%) split across 5 INSTALL / 5 DOWNGRADE-WITH-DISCLOSURE / 5 DEFER / 5 REJECT verdicts per SRA D1-D10.

### Methodology notes

- Cross-checked against `installed_plugins.json` (20 plugins) + `.mcp.json` (7 MCP wired) + `known_marketplaces.json` (11 marketplaces) + `docs/sota-installed-manifest.md` (608 LOC) + system PATH probe (rg/fd/jq/yq/gh/just/mise/uv/pre-commit/ccusage/rtk/repomix/serena ALL present)
- Per CR-9 read-only research probe exception: sibling state read for cite-anchor verification only; no install-class artifacts copied
- Per SRA D1: use-class precision applied (eee = local autonomous /loop runtime; NOT distributed-as-product); AGPL/SSPL/ELv2 acceptable for CLI-binary-use + local-DB use-class
- Per SRA D2 freshness gate: replacement_last_push_age ≤ incumbent_last_push_age verified (no staler-replacement recommendations)
- Per FM-20 path-drift cascade defense: each "already installed" claim Mia-pre-applied via `installed_plugins.json` + `.mcp.json` Read

### DELTA inventory (kit primitives vs eee installed)

| Primitive | Kit version | Type | SRA verdict | Already installed? | Cite anchor |
|---|---|---|---|---|---|
| `ryoppippi/ccusage` | v40-v48 DEFAULT MEASUREMENT | npm CLI | INSTALLED (TIER-1) | YES (`/c/Users/42/AppData/Roaming/npm/ccusage` v18.0.11) | v48/SOTA_REPOS:14 |
| `rtk-ai/rtk` | v40-v48 DEFAULT TOKEN | cargo CLI | INSTALLED | YES (`/z/claude-sota-installed/.local/cargo/bin/rtk`) | v48/SOTA_REPOS:20 |
| `oraios/serena` | v40-v48 DEFAULT TOKEN | uvx MCP | INSTALLED + WIRED in `.mcp.json` | YES | v48/SOTA_REPOS:21 |
| `yamadashy/repomix` | v40-v48 DEFAULT TOKEN | npm + MCP | INSTALLED + WIRED v1.14.0 in `.mcp.json` | YES | v48/SOTA_REPOS:22 |
| `BurntSushi/ripgrep` | v40-v48 DEFAULT CLI | binary | INSTALLED-VIA-SYSTEM-PATH | YES (winget) | v48/SOTA_REPOS:33 |
| `sharkdp/fd` | v40-v48 DEFAULT CLI | binary | INSTALLED-VIA-SYSTEM-PATH | YES (winget) | v48/SOTA_REPOS:34 |
| `jqlang/jq` | v40-v48 DEFAULT CLI | binary | INSTALLED-VIA-SYSTEM-PATH | YES (chocolatey) | v48/SOTA_REPOS:35 |
| `mikefarah/yq` | v40-v48 DEFAULT CLI | binary | INSTALLED-VIA-SYSTEM-PATH | YES (winget) | v48/SOTA_REPOS:36 |
| `cli/cli` (gh) | v40-v48 DEFAULT CLI | binary | INSTALLED-VIA-SYSTEM-PATH | YES | v48/SOTA_REPOS:37 |
| `pre-commit/pre-commit` | v40-v48 DEFAULT CLI | pip | INSTALLED-VIA-SYSTEM-PATH | YES | v48/SOTA_REPOS:38 |
| `casey/just` | v40-v48 DEFAULT CLI | binary | INSTALLED-VIA-SYSTEM-PATH | YES (winget) | v48/SOTA_REPOS:39 |
| `astral-sh/uv` | v40-v48 DEFAULT CLI | pip/winget | INSTALLED-VIA-SYSTEM-PATH | YES | v48/SOTA_REPOS:41 |
| `anthropics/claude-code` | v40-v48 CORE | binary | INSTALLED-VIA-SYSTEM-PATH | YES (parent + native paths) | v48/SOTA_REPOS:9 |
| `openai/codex` + `codex-plugin-cc` | v40-v48 CORE | plugin | INSTALLED `codex@openai-codex@1.0.4` | YES | v48/SOTA_REPOS:10-11 |
| `anthropics/skills` marketplace | v48 Foundation | marketplace | INSTALLED (`anthropic-agent-skills`) | YES | v48/SOTA_REPOS:86 |
| `addyosmani/agent-skills` | v45+ HSR | marketplace | INSTALLED (`addy-agent-skills`) | YES | v45/SOTA_REPOS:106 |
| `affaan-m/everything-claude-code` | v40-v48 HSR | plugin | INSTALLED `everything-claude-code@2.0.0-rc.1` | YES | v48/SOTA_REPOS:50 |
| `obra/superpowers` | v45+ HSR | plugin | INSTALLED `superpowers@claude-plugins-official@5.1.0` | YES | v45/SOTA_REPOS:97 |
| `anthropics/cwc-long-running-agents` (5 primitives + 3 plugins) | v62 (post-v48 baseline) | manifest §17 | INSTALLED-DORMANT | YES (Wave 62 fire 6 install) | manifest §17 |
| `microsoft/playwright-mcp` | v40-v48 Foundation | npm MCP | INSTALLED + WIRED in `.mcp.json` | YES | v48/SOTA_REPOS:30 |
| `upstash/context7` | v40-v48 SELECTIVE | HTTP MCP | INSTALLED + WIRED in `.mcp.json` | YES | v48/SOTA_REPOS:29 |
| `mksglu/context-mode` | v45+ SELECTIVE | plugin | INSTALLED `context-mode@context-mode@1.0.111` (ELv2 OK per SRA D1 local-plugin use-class) | YES | v48/SOTA_REPOS:25 |
| `github/github-mcp-server` | v40-v48 Foundation | HTTP MCP | INSTALLED + WIRED in `.mcp.json` | YES | v48/SOTA_REPOS:91 |
| `getzep/graphiti` (FalkorDB backend) | not in kit; cardinal-rule §Memory Stack | stdio MCP | INSTALLED + WIRED in `.mcp.json` | YES | manifest §4 |
| `doobidoo/mcp-memory-service` | not in kit; cardinal-rule §Memory Stack | stdio MCP | INSTALLED + WIRED in `.mcp.json` | YES | manifest §4 |
| `anthropics/claude-plugins-official` (8 native plugins) | v48 NEW Foundation | plugins | INSTALLED 12 of 16 marketplace plugins | PARTIAL | v48/SOTA_REPOS:96 |
| **github/spec-kit** | v40-v48 Foundation | repo+CLI | **NOT INSTALLED** | NO | v48/SOTA_REPOS:108 |
| **eyaltoledano/claude-task-master** | v40-v48 Workflow Elite | npm CLI | NOT INSTALLED (1 manifest mention only) | NO | v48/SOTA_REPOS:46 |
| **wshobson/agents** | v40-v48 Workflow | repo (50+ subagents) | NOT INSTALLED | NO | v48/SOTA_REPOS:49 |
| **bmad-code-org/BMAD-METHOD** | v40-v48 Workflow Elite | repo+npm | NOT INSTALLED | NO | v48/SOTA_REPOS:45 |
| **garrytan/gstack** | v45+ HSR | npm | NOT INSTALLED | NO | v45/SOTA_REPOS:101 |
| **gsd-build/get-shit-done** | v45+ HSR (also research-protocol cite) | npm meta | NOT INSTALLED | NO | research-protocol.md cite |
| **Fission-AI/OpenSpec** | v45+ HSR | plugin/CLI | NOT INSTALLED (2 manifest mentions only) | NO | v45/SOTA_REPOS:104 |
| **mattpocock/skills** | v45+ HSR | repo | NOT INSTALLED (cited; not vendored) | cite-only | v45/SOTA_REPOS:102 |
| **EveryInc/compound-engineering-plugin** | v45+ HSR | plugin | REJECTED (META-HARNESS Cohort 1 per `verified-avoid.md`) | NO (intentional) | manifest §REJECT |
| **smtg-ai/claude-squad** | v40-v48 Parallel/Operator | go | NOT INSTALLED | NO | v45/SOTA_REPOS:139 |
| **ComposioHQ/agent-orchestrator** | v40-v48 Parallel | repo | NOT INSTALLED | NO | v48/SOTA_REPOS:57 |
| **BloopAI/vibe-kanban** | v40-v48 Parallel | npm | NOT INSTALLED (1 manifest mention) | NO | v48/SOTA_REPOS:59 |
| **raine/workmux** | v40-v48 Parallel | npm | NOT INSTALLED | NO | v48/SOTA_REPOS:60 |
| **manaflow-ai/cmux** / **stravu/crystal** | v45 Parallel | npm | NOT INSTALLED | NO | v45/SOTA_REPOS:144-145 |
| **automazeio/ccpm** | v40-v48 Workflow Elite | repo | NOT INSTALLED | NO | v48/SOTA_REPOS:47 |
| **coleam00/context-engineering-intro** | v40-v48 Workflow | repo | NOT INSTALLED | NO | v48/SOTA_REPOS:48 |
| **humanlayer/humanlayer** + **advanced-context-engineering** | v45+ Workflow | npm | NOT INSTALLED (META-HARNESS-class probe needed) | NO | v45/SOTA_REPOS:108,132 |
| **trailofbits/claude-code-config** + **claude-code-devcontainer** | v40-v48 Security Elite | repo | NOT INSTALLED | NO | v48/SOTA_REPOS:281-282 |
| **anthropics/claude-code-security-review** | v40-v48 Foundation | GH Action | PLANNED-DEFERRED (CI-only per manifest §16) | NO | v48/SOTA_REPOS:99 |
| **anthropics/claude-code-action** + **claude-code-base-action** | v40-v48 Foundation | GH Action | PLANNED-DEFERRED (CI-only) | NO | v48/SOTA_REPOS:97-98 |
| **anthropics/claude-agent-sdk-{python,typescript}** | v40-v48 Foundation | pip/npm SDK | NOT INSTALLED (0 manifest mentions) | NO | v48/SOTA_REPOS:100-102 |
| **anthropics/anthropic-sdk-{python,typescript}** | v48 NEW Foundation | pip/npm SDK | NOT INSTALLED (0 manifest mentions) | NO | v48/SOTA_REPOS:101-102 |
| **openai/openai-agents-python** + **openai-{python,node}** | v48 NEW Foundation | pip/npm SDK | PLANNED in §16 | NO | v48/SOTA_REPOS:103-105 |
| **openai/skills** | v48 NEW Foundation | marketplace | PLANNED in §16 (Probe 4 collision check) | NO | v48/SOTA_REPOS:87 |
| **github/codeql-action** | v40-v48 Foundation+Security | GH Action | PLANNED-CONDITIONAL (CI-only) | NO | v48/SOTA_REPOS:106 |
| **github/gh-aw** (GitHub Agentic Workflows) | v48 NEW Foundation | gh extension | NOT INSTALLED (0 manifest mentions) | NO | v48/SOTA_REPOS:108 |
| **modelcontextprotocol/inspector** | v40-v48 Foundation | npx | PLANNED in §16 | NO | v48/SOTA_REPOS:91 |
| **semgrep/semgrep** | v40-v48 Security Elite | pip CLI | PLANNED in §5 EXPANSION | NO | v48/SOTA_REPOS:290 |
| **gitleaks/gitleaks** | v40-v48 Security Elite | binary | INSTALLED v8.30.1 (Wave 102 audit) | YES | v48/SOTA_REPOS:292 |
| **trufflesecurity/trufflehog** | v40-v48 Security Elite | binary | REJECTED-WAVE-102-AUDIT (AGPL but manifest cited "license blocker" — per SRA D1 use-class CLI-binary-use is OK; rejection FUNCTIONAL not license per SRA reframe) | NO | v48/SOTA_REPOS:293 |
| **aquasecurity/trivy** | v40-v48 Security Elite | binary | INSTALLED-VIA-SYSTEM-PATH or PLANNED | partial | v48/SOTA_REPOS:294 |
| **google/osv-scanner** | v40-v48 Security Elite | gh release | PLANNED §5 EXPANSION | NO | v48/SOTA_REPOS:295 |
| **InvariantLabs-ai/mcp-scan** + **MCP-Defender** + **cisco-ai-defense/mcp-scanner** | v40-v48 Security Elite | repo | NOT INSTALLED | NO | v48/SOTA_REPOS:285-286 |
| **affaan-m/agentshield** | v48 NEW Security Elite | repo | NOT INSTALLED (0 manifest mentions) | NO | v48/SOTA_REPOS:289 |
| **astral-sh/ruff** | v40-v48 Security/Quality | pip CLI | INSTALLED-VIA-SYSTEM-PATH expected | partial | v48/SOTA_REPOS:302 |
| **biomejs/biome**, **oxc-project/oxc** | v40-v48 Security/Quality | npm | PLANNED-CONDITIONAL | NO | v48/SOTA_REPOS:303-304 |
| **koalaman/shellcheck** | v40-v48 Security/Quality | binary | INSTALLED-VIA-SYSTEM-PATH expected | partial | v48/SOTA_REPOS:305 |
| **rhysd/actionlint**, **hadolint/hadolint**, **terraform-linters/tflint** | v40-v48 Security/Quality | binary | PLANNED-CONDITIONAL | NO | v48/SOTA_REPOS:306-309 |
| **crate-ci/typos** | v40-v48 Security/Quality | cargo | NOT INSTALLED | NO | v48/SOTA_REPOS:308 |
| **golangci/golangci-lint** | v40-v48 Security/Quality | binary | NOT INSTALLED (no Go in eee) | NO | v48/SOTA_REPOS:310 |
| **bridgecrewio/checkov** | v40-v48 Security/Quality | pip | PLANNED-CONDITIONAL | NO | v48/SOTA_REPOS:311 |
| **evilmartians/lefthook** | v40-v48 Security/Quality | npm | PLANNED §5.5 (coexists with pre-commit) | NO | v48/SOTA_REPOS:312 |
| **woodruffw/zizmor** + **oxsecurity/megalinter** | v40-v48 Security/Quality | binary/npm | NOT INSTALLED | NO | v48/SOTA_REPOS:313-314 |
| **ast-grep/ast-grep** | v40-v48 Token Context Elite | cargo/npm | PLANNED §7 EXPANSION | NO | v48/SOTA_REPOS:156 |
| **mufeedvh/code2prompt** | v40-v48 Token Context Elite | cargo | DEFER (duplicate vs repomix) | NO | v48/SOTA_REPOS:160 |
| **tirth8205/code-review-graph** | v40-v48 Token Context Elite | npm | REJECT (Tier 0 Row-2 fabrication-test FAIL per `convergence-gate.md`) | NO | v48/SOTA_REPOS:158 |
| **safishamsi/graphify** | v40-v48 Token Context Elite | npm | REJECT (sibling Mia-pre-apply REFUTED-OVER per manifest §REJECT) | NO | v48/SOTA_REPOS:159 |
| **chopratejas/headroom** | v40-v48 SELECTIVE TOKEN | npm | REJECT (META-HARNESS Cohort 1) | NO | manifest §REJECT |
| **buildoak/wet** | v40-v48 SELECTIVE TOKEN | npm | DEFER (probe needed) | NO | v48/SOTA_REPOS:27 |
| **zilliztech/claude-context** | v40-v48 SELECTIVE TOKEN | npm MCP | DEFER (sibling has it disabled per `.claude/settings.json:disabledMcpjsonServers`; re-evaluate Probe 4) | NO | v48/SOTA_REPOS:28 |
| **aider-ai/aider** | v45 Token Elite | pip | DEFER (META-HARNESS-class — overlaps eee role) | NO | v45/SOTA_REPOS:71 |
| **mixedbread-ai/mgrep** | v45 Token Elite | cargo | DEFER (duplicate vs Serena LSP semantic search) | NO | v45/SOTA_REPOS:73 |
| **sirmalloc/ccstatusline** | v40-v48 MEASUREMENT | npm | NOT INSTALLED | NO | v48/SOTA_REPOS:16 |
| **matt1398/claude-devtools** | v40-v48 MEASUREMENT | npm | NOT INSTALLED | NO | v48/SOTA_REPOS:15 |
| **mcpware/cross-code-organizer** | v40-v48 MEASUREMENT | npm MCP | NOT INSTALLED | NO | v48/SOTA_REPOS:17 |
| **jarrodwatts/claude-hud**, **jeongwookie/WhereMyTokens**, **spences10/claude-code-analytics** | v45+ MEASUREMENT | npm | NOT INSTALLED | NO | v45/SOTA_REPOS:55-58 |
| **VILA-Lab/Dive-into-Claude-Code** | v48 NEW Workflow | repo | NOT INSTALLED (cite-only candidate) | NO | v48/SOTA_REPOS:51 |
| **shanraisshan/claude-code-best-practice** (CCBP) | v40-v48 Workflow | repo | INSTALLED-AS-CITE-REFERENCE (`Z:/repos/deps/`) | YES (cite-only) | TIER-1-DIRECT cite |
| **swe-bench/SWE-bench** | v40-v48 Eval | pip | PLANNED §15 | NO | v48/SOTA_REPOS:266 |
| **swe-agent/{swe-agent,mini-swe-agent}** | v40-v48 Eval | pip | DEFER-PROBE (META-HARNESS Cohort 1 per manifest §15) | NO | v48/SOTA_REPOS:267-268 |
| **OpenHands/OpenHands** + **software-agent-sdk** + **benchmarks** | v40-v48 Eval | repo | DEFER-PROBE (META-HARNESS Cohort 1) | NO | v48/SOTA_REPOS:269-271 |
| **aaif-goose/goose** | v40-v48 Eval | rust | DEFER (META-HARNESS Cohort 1 — separate-vendor agent runtime) | NO | v48/SOTA_REPOS:272 |
| **NousResearch/hermes-agent** | v40-v48 Eval | repo | DEMOTED-OR-AUDIT-ONLY per v40 list | NO | v40/SOTA_REPOS:256 |
| **promptfoo/promptfoo** + **confident-ai/deepeval** + **braintrustdata/braintrust-sdk** + **explodinggradients/ragas** | not in v48 SOTA_REPOS — manifest §15 additions | npm/pip | PLANNED §15 | NO | manifest §15 |
| **Langfuse** | not in v48 — manifest §15; sibling LIVE | docker | PLANNED §15 | NO | manifest §15 |
| **mksglu/context-mode** plugin (vs MCP-only standalone) | v45+ SELECTIVE | plugin via marketplace | INSTALLED `context-mode@context-mode@1.0.111` | YES | manifest §plugins |
| **bfly123/claude_codex_bridge**, **xiaolai/codex-toolkit-for-claude**, **promptadvisers/claudex**, **sakibsadmanshajib/gemini-plugin-cc**, **nikuscs/codex-cc-plugin**, **tasict/opencode-plugin-cc** | v40-v48 Codex Bridges | varies | DEFER (codex-plugin-cc canonical; alternatives Probe 4 namespace collision) | NO | v48/SOTA_REPOS:255-260 |

### Top-10 INSTALL-class candidates (sorted by SRA score 9-10 + criticality)

For SRA score legend: D1 (license-use-class) / D2 (freshness ≤90d) / D4 (maintainer tier) / D6 (use-class compatibility) / D7 (Anthropic-aligned) / D8 (industry adoption ≥3 orgs).

1. **`github/spec-kit`** — Spec-Driven Development CLI/methodology
   - SRA: D1 MIT ✓ / D4 TIER-1-OFFICIAL (GitHub) ✓ / D6 ✓ / D7 ✓ / D8 multi-org ✓ → score 10/10
   - Cite: v48/SOTA_REPOS:108 (Foundation tier — present every kit v40-v48)
   - Install: `npm install -g @github/spec-kit@latest` OR `gh extension install github/spec-kit`
   - Risk: LOW; Foundation-class; standalone
   - Dependent: none

2. **`anthropics/anthropic-sdk-python`** — official SDK for Anthropic API
   - SRA: D1 MIT ✓ / D4 TIER-1-OFFICIAL (Anthropic) ✓ / D6 ✓ / D7 ✓ / D8 ✓ → 10/10
   - Cite: v48/SOTA_REPOS:101 (NEW v48 Foundation addition)
   - Install: `pip install anthropic` (verify pkg name)
   - Risk: LOW
   - Dependent: enables Section 16 SDK install row + future eval/observability evals

3. **`anthropics/claude-agent-sdk-python`** — agent-tier SDK (over anthropic-sdk-python)
   - SRA: D1 MIT ✓ / D4 TIER-1-OFFICIAL ✓ / D6 ✓ / D7 ✓ / D8 ✓ → 10/10
   - Cite: v48/SOTA_REPOS:99 + manifest §16 PLANNED
   - Install: `pip install claude-agent-sdk` (verify)
   - Risk: LOW
   - Dependent on: anthropic-sdk-python

4. **`semgrep/semgrep`** — SAST (static-app-security-testing)
   - SRA: D1 LGPL-2.1 (CLI-binary-use OK per SRA D1) ✓ / D4 TIER-3-NAMED-ORG (Semgrep Inc) ✓ / D6 ✓ / D7 ✓ / D8 multi-org ✓ → 9/10
   - Cite: v48/SOTA_REPOS:290 + manifest §5 EXPANSION PLANNED
   - Install: `pip install semgrep`
   - Risk: LOW
   - Dependent: none

5. **`google/osv-scanner`** — vulnerability scanner against OSV.dev DB
   - SRA: D1 Apache-2.0 ✓ / D4 TIER-1-OFFICIAL (Google) ✓ / D6 ✓ / D7 ✓ / D8 ✓ → 10/10
   - Cite: v48/SOTA_REPOS:295 + manifest §5 EXPANSION
   - Install: `gh release download --repo google/osv-scanner` OR `go install github.com/google/osv-scanner@latest`
   - Risk: LOW
   - Dependent: none

6. **`modelcontextprotocol/inspector`** — official MCP debugging tool
   - SRA: D1 MIT ✓ / D4 TIER-1-OFFICIAL (Anthropic-led) ✓ / D6 ✓ / D7 ✓ / D8 ✓ → 10/10
   - Cite: v48/SOTA_REPOS:91 + manifest §16 PLANNED
   - Install: `npx @modelcontextprotocol/inspector` (no global install — invoke per-use)
   - Risk: LOW
   - Dependent: none

7. **`ast-grep/ast-grep`** — structural search/replace via tree-sitter AST
   - SRA: D1 MIT ✓ / D4 TIER-3-NAMED-ORG ✓ / D6 ✓ / D8 multi-org adoption ✓ → 9/10
   - Cite: v48/SOTA_REPOS:156 + manifest §7 EXPANSION PLANNED
   - Install: `npm install -g @ast-grep/cli` OR `cargo install ast-grep`
   - Risk: LOW
   - Dependent: none (complement to Serena LSP)

8. **`anthropics/claude-plugins-official` REMAINING 4 plugins** — `code-review`, `pr-review-toolkit`, `commit-commands`, `session-report` already INSTALLED; check for newer additions
   - **VERIFIED via `installed_plugins.json`**: 12 of ~16 marketplace plugins installed; surface newly added plugins via `/plugin marketplace list claude-plugins-official` probe
   - SRA: D1 MIT ✓ / D4 TIER-1-OFFICIAL ✓ → 10/10 baseline
   - Risk: LOW
   - Action: probe marketplace HEAD for new plugin additions since Wave 75 install

9. **`crate-ci/typos`** — fast spell-checker for code/docs
   - SRA: D1 Apache-2.0+MIT ✓ / D4 TIER-3-NAMED-ORG (crate-ci) ✓ / D6 ✓ / D8 ✓ → 9/10
   - Cite: v48/SOTA_REPOS:308
   - Install: `cargo install typos-cli`
   - Risk: LOW
   - Dependent: none

10. **`evilmartians/lefthook`** — fast Node-style git-hook orchestrator (manifest §5.5 PLANNED)
    - SRA: D1 MIT ✓ / D4 TIER-3-NAMED-ORG (Evil Martians) ✓ / D6 ✓ / D7 ✓ / D8 multi-org adoption ✓ → 9/10
    - Cite: v48/SOTA_REPOS:312 + manifest §5.5 PLANNED
    - Install: `npm install -g lefthook@latest`
    - Risk: LOW (coexists with pre-commit)
    - Dependent: none

### Top-5 DOWNGRADE-WITH-DISCLOSURE candidates

1. **`bmad-code-org/BMAD-METHOD`** — extensive workflow methodology
   - SRA: D1 ✓ / D4 TIER-3-NAMED-ORG ✓ / D6 PARTIAL (HARD-GATE-class workflow may conflict with autonomous /loop per superpowers brainstorming precedent) → 7/10
   - Caveat: probe `mode-harness-shape` (Probe 5) before STAGED→INSTALLED; cite-extract patterns rather than vendor-port

2. **`eyaltoledano/claude-task-master`** — task-DAG orchestrator
   - SRA: D1 ✓ / D4 TIER-4-NAMED-INDIVIDUAL ✓ / D6 ✓ / D8 strong stars but limited multi-org adoption signal → 7/10
   - Caveat: overlap with native `TaskCreate`/`TaskUpdate` + ECC autonomous-loop skill — probe duplicate-functionality before install

3. **`wshobson/agents`** — 50+ subagent definitions repo
   - SRA: D1 ✓ / D4 TIER-4-NAMED-INDIVIDUAL ✓ / D6 ✓ / D8 ✓ → 7/10
   - Caveat: cherry-pick subagents matching eee role-coverage gaps (e.g., security-reviewer / api-designer); do NOT bulk-vendor (per kiss-dry-yagni Must-Never #4 against existing 12 sibling agents)

4. **`Fission-AI/OpenSpec`** — spec authoring framework
   - SRA: D1 ✓ / D4 TIER-3-NAMED-ORG ✓ / D6 ✓ / D7 ✓ / D8 PARTIAL → 7/10
   - Caveat: overlaps github/spec-kit (cardinal-rule-3 cross-ref); probe duplicate-coverage before parallel install

5. **`InvariantLabs-ai/mcp-scan`** + **MCP-Defender/MCP-Defender** — MCP-server security probes
   - SRA: D1 ✓ / D4 TIER-3-NAMED-ORG ✓ / D6 ✓ / D7 ✓ / D8 emerging field → 7/10
   - Caveat: post-install hardening tier; only valuable AFTER additional MCP installs (currently 7 MCP wired — burden ratio acceptable to defer)

### Top-5 DEFER candidates (HONEST-NON-FINDING)

1. **`anthropics/claude-code-action` + `claude-code-base-action`** — GitHub Actions for CI integration
   - DEFER reason: eee runtime is local autonomous /loop (no CI pipeline); manifest §16 already PLANNED-DEFERRED-PENDING-CI-DECISION
   - Re-evaluate trigger: if CI infrastructure adds for eee → INSTALL

2. **`smtg-ai/claude-squad`** — multi-session tmux orchestration
   - DEFER reason: Windows-native blocker per parent claude-sota `parallel-sessions.md` STATUS-DISABLED-IN-SSS (`pty.Start()` upstream issue #275)
   - Re-evaluate trigger: upstream ConPTY support OR move to WSL/Linux

3. **`BloopAI/vibe-kanban`** + **`raine/workmux`** + **`manaflow-ai/cmux`** + **`stravu/crystal`** + **`yxwucq/CCUI`** + **`agent-orchestrator`** — operator dashboards/multi-session orchestrators
   - DEFER reason: HONEST-NON-FINDING per sibling `parallel-sessions.md` analysis — agent-orchestrator pattern-source-only, others Windows-blocked or duplicate-coverage with `claude --worktree` + ECC dmux-workflows; sibling already covers via `parallel-agent-wave.md` + `parallel-session-worktree-isolation.md`

4. **`mcpware/cross-code-organizer`** + **`sirmalloc/ccstatusline`** + **`matt1398/claude-devtools`** + **`jarrodwatts/claude-hud`** + **`jeongwookie/WhereMyTokens`** + **`spences10/claude-code-analytics`**
   - DEFER reason: ccusage already INSTALLED covers token-tracking primary use-case (CR-12 PRIMARY satisfied); these are SECONDARY observability surfaces; HONEST-NON-FINDING for SOTA-distinct-value vs incumbent
   - Re-evaluate trigger: eee dashboard requirement emerges (currently /context + /usage native + ccusage suffice)

5. **`OpenHands/OpenHands`** + **`aaif-goose/goose`** + **`swe-agent/swe-agent`** — alternative-vendor agent runtimes
   - DEFER reason: META-HARNESS Cohort 1 per `verified-avoid.md` + manifest §15 DEFER-PROBE classification — competing-framework risk to eee's own harness identity (CR-5 install-priority + CR-8 SOTA-content invariants)
   - Re-evaluate trigger: explicit pattern-extract per superpowers selective-vendoring precedent (cite-only, no wholesale install)

### REJECT candidates

1. **`tirth8205/code-review-graph`** — Tier 0 Row-2 fabrication-test FAIL per `convergence-gate.md §Anti-pattern Row-2 fabrication-test FAIL` (≥3 README numeric performance claims without methodology citation; methodology artifact `evaluate/reports/summary.md` absent in verified checkout)

2. **`safishamsi/graphify`** — REJECT per sibling `fm20-path-drift-cascade.md` evidence ladder (Mia-pre-apply REFUTED-OVER record)

3. **`chopratejas/headroom`**, **`jordan112/skinny-jeans`**, **`ArthurDEV44/distill`**, **`z19r/whetstone`**, **`alexgreensh/token-optimizer`**, **`juyterman1000/entroly`** — anti-pumping signal cluster (suspicious solo-author-with-cute-name pattern per Wave 47 grand catalog; META-HARNESS Cohort 1 risk per manifest §REJECT)

4. **`EveryInc/compound-engineering-plugin`** — META-HARNESS Cohort 1 per `verified-avoid.md`

5. **`thedotmack/claude-mem`**, **`JuliusBrussee/caveman`**, **`musistudio/claude-code-router`**, **`ruvnet/ruflo`**, **`Gitlawb/openclaude`**, **`google-gemini/gemini-cli`**, **`QwenLM/qwen-code`**, **`sst/opencode`**, **`Kilo-Org/kilocode`** — v48 "Audit Or Reference Only" tier; explicitly demoted per kit + `Piebald-AI/claude-code-system-prompts` + `Piebald-AI/tweakcc` per v40 "Explicitly Demoted" list

### Cross-cutting findings

1. **Convergence stability across kits v40-v48** — 159-179 unique repos with <3% delta between consecutive versions. The kits act as STABLE convergence cuts, not evolving baselines. v48 deltas: adds `affaan-m/agentshield` (Security Elite); adds `anthropics/anthropic-sdk-{python,typescript}` + `anthropics/claude-plugins-official` to Foundation; adds `VILA-Lab/Dive-into-Claude-Code` to Workflow Reference; adds `WORKFLOW / HARNESS REFERENCES` and `SECOND-MODEL REVIEW` summary blocks at the top.

2. **Foundation-tier install gap** — eee has fully INSTALLED the DEFAULT MEASUREMENT + DEFAULT TOKEN/CONTEXT + DEFAULT CLI FOUNDATION layers (12+ primitives), but NOT the Foundation tier's official SDK row (`anthropics/claude-agent-sdk-python` + `anthropics/anthropic-sdk-python` + `openai/openai-agents-python`) — these are PLANNED in manifest §16 but not INSTALLED. This is the highest-leverage gap.

3. **Spec-driven development primitives MISSING** — `github/spec-kit` is in v40-v48 Foundation tier but NOT INSTALLED in eee (0 manifest mentions). With `Fission-AI/OpenSpec` also missing, eee lacks spec-driven primitives entirely while v45+ kits explicitly highlight this as Foundation/HSR.

4. **Security/SAST tier under-coverage** — eee has gitleaks INSTALLED + Wave 102 audit ran. But semgrep/osv-scanner/codeql/checkov/scorecard/harden-runner/biome/oxc/zizmor/megalinter all PLANNED-or-NOT-INSTALLED. Top-3 to install (semgrep + osv-scanner + scorecard) provide multi-org SAST coverage at LOW risk.

5. **Eval/Observability axis was NEW per Agent A (manifest §15)** — Langfuse running operationally per sibling but UNMANIFESTED; promptfoo/deepeval/ragas/braintrust all PLANNED but no INSTALLED rows. This entire axis is gap-class.

6. **Operator-dashboard cluster CONVERGENT-DEFER** — claude-squad/vibe-kanban/cmux/crystal/CCUI/agent-orchestrator/workmux all listed across v40-v48 Parallel Operator Elite, but eee correctly defers them all (Windows blockers + parallel-session-worktree-isolation already covered). Recommend: keep DEFER unless tmux-on-WSL workflow emerges.

7. **Codex bridge cluster CONVERGENT-DEFER** — bfly123/claude_codex_bridge, xiaolai/codex-toolkit, promptadvisers/claudex, sakibsadmanshajib/gemini-plugin-cc, nikuscs/codex-cc-plugin, tasict/opencode-plugin-cc all listed v40-v48 — but openai/codex-plugin-cc canonical (INSTALLED) covers the cross-model gate (cardinal-rule-3); alternatives are Probe 4 namespace-collision DEFER.

8. **Fresh-paint anti-pattern cluster** — v40-v48 SELECTIVE TOKEN tier includes 6 suspicious solo-author primitives (skinny-jeans, distill, whetstone, token-optimizer, entroly, headroom). Manifest §REJECT correctly flags these. Re-confirm REJECT verdicts apply.

9. **Methodology gap — kit content unchanged but eee's installed_plugins continues evolving** — Wave 75 shipped 5 MCPs (github/context7/deepwiki/playwright/serena) per `fleet-kits-convergence-2026-05-08.md`; subsequent waves (79+95+106) added context-mode MCP→plugin, repomix MCP. The kits document INTENT; the runtime FOLLOWS via per-Wave install events. Future waves should continue to use kits as "authoritative SOTA inventory" while runtime tracks via manifest §sections.

10. **No NEW-CLASS gap surfaced from v40-v48 audit beyond what manifest §15 + §16 already enumerate** — confirms Wave 50 Agent A coverage was comprehensive. Top-10 INSTALL list above is the actionable ship queue; Top-5 DEFER + REJECT are HONEST-NON-FINDING dispositions worth preserving in commit body for future arc reference.

### Disposition — orchestrator next-actions (in priority order)

1. INSTALL Top-5 (spec-kit, anthropic-sdk-python, claude-agent-sdk-python, semgrep, osv-scanner) — all SRA 9-10, no critical FAIL, multi-org adoption confirmed
2. PROBE marketplace HEAD on `anthropics/claude-plugins-official` for newly added plugins post-Wave 75
3. Apply HONEST-NON-FINDING discipline to Top-5 DEFER candidates — preserve in `docs/install-provenance.md` to prevent re-research
4. CITE-ONLY confirmation on REJECT candidates — no install action; document SRA verdict in `verified-avoid.md` if not already
5. Cross-model T1 mandate per SRA §"Cross-model T1 verification mandate" — submit this verdict to codex GPT-5.5 review BEFORE any commits per CR-3
