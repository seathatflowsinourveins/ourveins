---
title: W171 P3 wave-1 Agent C source-read 5-repo deep dive
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (Sonnet stand-in)
wave: 171
fire: P3-wave-1
companion: Agent B codex T1 BRIDGE-MODE (parallel)
artifact_path: tmp/wave171-agentC-sota-5repo-source-2026-05-13.md
---

# Wave 171 — Agent C Source-Read 5-Repo Verdict Matrix

## STAND-IN classification

This agent runs as **Sonnet stand-in** per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md`. Voice = Sonnet source-read; NOT cross-model satisfier. Agent B codex T1 BRIDGE-MODE is the cross-model gate counterpart. Verdicts converge at orchestrator synthesis.

## Methodology

For each repo:
- Source-discovery >=4 distinct families per research-protocol.md repo-discovery sub-rule: GitHub MCP fresh blob-SHA + search_repositories metadata + README/LICENSE/manifest reads + cross-reference via quemsah top-100 catalog
- Probe DAG 1-7 per ahfv-probe-dag.md
- SRA D1-D10 per agent-harness-fit-verification.md (D1+D6 critical-PASS)
- Axis 1/2/3 convergence-gate per convergence-gate.md
- CR-12 6-class disposition per cardinal-rule-12-upstream-install-priority.md

## FM-20 path-drift catches THIS fire

| # | Sub-class | Trigger | Defense | Disposition |
|---|---|---|---|---|
| FM-20.A | brief-cite-staleness | Brief said `forrestchang/andrej-karpathy-skills` — GH API 422 (repo at that namespace gone). Local clone HEAD `2c606141` from origin `https://github.com/forrestchang/andrej-karpathy-skills.git` redirects to active fork | Fresh search resolves `multica-ai/andrej-karpathy-skills` HEAD `2c606141` matching local clone SHA. marketplace.json STILL lists `forrestchang` as owner string (author attribution preserved) | Updated cite forward-only |
| FM-20.B | wshobson HEAD pin drift | W164 F13 HEAD `ece811f` 2026-05-10 -> fresh `34632bc` 2026-05-13 = 3-day drift; +1 plugin shipped | Fresh blob-SHA recorded; CR-9 REVERT check: zero precedent | Use `34632bcb` THIS fire |

## Per-repo Verdict Matrix

| # | Repo | HEAD (fresh) | License | Axis1 | Axis2 | Axis3 | SRA D1/D6 | CR-12 | P4-P7 | VERDICT | conf |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | wshobson/agents | `34632bc` | MIT | PASS | PASS (Seth Hobson + 35.3k stars + Anthropic featured) | PASS (9.7mo + cpd~14.2) | PASS+PASS | **PARTIAL-OVERLAP** | All clean; P7.b STUDY-PILOT 5-clause | **STUDY-PILOT-NARROW Top-3 cherry-pick** | **0.91** |
| 2 | abhigyanpatwari/GitNexus | `507f84b` | **PolyForm Noncommercial 1.0.0** | PASS (quemsah row 23 + 38k stars) | PASS (Akon Labs + 105 contributors) | PASS (9.4mo + cpd~17.6) | PASS+**AMBER** | **INCUMBENT-KEEP** (v1.6.4-rc.112 INSTALLED) | P4 OK / P5 OK / **P6 AMBER** for commercial-use; eee runtime use WITHIN noncommercial grant / P7 incumbent | **CITE-IMPORT-AMBER** (no new install) | **0.93** |
| 3 | quemsah/awesome-claude-plugins | `62e6593` | (no LICENSE file) | PASS (Trendshift + 689 stars + 16604 indexed) | PARTIAL (single-author) | PASS (6.5mo + active) | PASS+**FAIL** | **CITE-CLASS-CANONICAL** | P4 N/A / P5 N/A / **P6 LICENSE-MISSING blocker** for content reuse / P7 catalog-only | **CITE-IMPORT-AMBER** READ-ONLY | **0.86** |
| 4 | Shubhamsaboo/awesome-llm-apps | `795212b` | Apache-2.0 | PASS (110k stars + Unwind AI named-T2) | PASS (8 named-T2 + creator) | PASS (>1y mature) | PASS+PASS | **CITE-CLASS-CANONICAL** (W164 F20 already) | P6 OK / P7.a DEMAND-ABSENCE for install-class (tutorial code) | **REFRESH-CITE-ONLY** | **0.88** |
| 5 | multica-ai/andrej-karpathy-skills | `2c60614` | MIT | PASS (128k stars + Karpathy named-author) | PASS (X post 2026-01-26 + 8 translation forks) | PASS (3.6mo + mature) | PASS+PASS | **CITE-CLASS-CANONICAL + INCUMBENT-CITE** (matches CLAUDE.md:114 SHA exactly) | All clean; P7.a DEMAND-ABSENCE — already incumbent-cited | **INCUMBENT-CITE-KEEP** | **0.94** |


## Per-repo deep dive

### Repo 1 — wshobson/agents @ `34632bcbea28176ba25bbbc43cd4017d88b1cac6` (W171 fresh)

**Source files read via mcp__github__get_file_contents**:
1. README.md blob `035d11c52ad8131933f4e1eed5980857cd0c7d1e` 11.3KB
2. LICENSE blob `326f0a55c96e672fedf9d807ca043c00df05ba0e` MIT (Copyright 2024 Seth Hobson)
3. .claude-plugin/marketplace.json blob `8d65e2c6226b659997376878b482ca3db0c41163` 80-plugin v1.6.0
4. plugins/shell-scripting/.claude-plugin/plugin.json blob `ac531b2159f4e75a469ab115b8abc2d29d348652`
5. plugins/shell-scripting/agents/ (bash-pro.md 17.6KB + posix-shell-pro.md 14.6KB)
6. plugins/shell-scripting/skills/ (bash-defensive-patterns + bats-testing-patterns + shellcheck-configuration)
7. plugins/protect-mcp/README.md blob `bcd341221fd3f309e50dcd813a0d936a4942b0c6` 6.8KB
8. plugins/protect-mcp/ (agents/commands/hooks/skills/test/.claude-plugin)

**Marketplace stats fresh probe**:
- 80 plugins listed (verified via marketplace.json entry count)
- 185 specialized agents claimed (UP from W164 baseline 184; +1 plugin)
- 153 skills claimed (UP from baseline 150; +3 skills)
- 100 commands (UNCHANGED)
- 25 categories
- Top-3 Wave-165-validated targets: **shell-scripting**, **protect-mcp**, **signed-audit-trails**

**Probe 4 plugin-namespace** (CRITICAL — codex-rescue blind-spot):
- claude-sota-installed `.claude/plugins/marketplaces/` lists 13 marketplaces (addy-agent-skills + anthropic-agent-skills + claude-community + claude-for-financial-services + claude-plugins-official + claude-settings + context-mode + everything-claude-code + healthcare + knowledge-work-plugins + life-sciences + openai-codex)
- wshobson NOT YET ADDED. NO duplicate-functionality risk for shell-scripting / protect-mcp / signed-audit-trails specifically (all NEW domains)
- `.claude/agents/wshobson-devops-troubleshooter.md` + `wshobson-security-auditor.md` already present BUT these are SEPARATE agents from the 3 candidate plugins (no duplication)

**Probe 5 mode-harness-shape**:
- Plugin install is `permissionMode: default`-class — no HARD-GATE on interactive approval
- NO iter-84 brainstorming / iter-92 mattpocock setup-disable-model-invocation HARD-GATE pattern
- Active `permissions.defaultMode: bypassPermissions` per W82d (CLAUDE.md L262) — plugin install proceeds clean

**Probe 6 LICENSE**: MIT permissive — CLEAR for distribution + modification. **NO blocker**.

**Probe 7.b STUDY-PILOT-NARROW 5-clause check**:
1. **Named use case**: shell-scripting closes W11A `bash_command_allowlist` removal-class regression by providing positive defensive-patterns guidance; protect-mcp provides MCP governance complementing 13-server `.mcp.json` registry; signed-audit-trails provides Cedar+Ed25519 audit-trail layer
2. **Cited local source path**: shell-scripting -> `safety_guard.py:21,269` + `sota-cli-tools/SKILL.md`; protect-mcp -> `.mcp.json` 13-server registry + `.claude/settings.json` hook chain
3. **Wiring path**: `/plugin marketplace add wshobson/agents` then `/plugin install shell-scripting@claude-code-workflows` per CR-6 canonical official-native-channel
4. **Incumbent comparison**: shell-scripting COMPLEMENTS safety_guard.py deny-list (reactive vs proactive); protect-mcp COMPLEMENTS T1-T7 codex hooks (tool-call gate vs content-review gate). NOT duplicates.
5. **Reversible time-box**: 30-day STUDY-PILOT per CR-9. Success criterion: (a) shell-scripting subagent dispatch reduces FM-17.e autocompact-thrash >25%; (b) protect-mcp Cedar intercepts >=1 destructive tool-call OR generates >=10 signed receipts; (c) signed-audit-trails produces verifiable receipt for >=1 commit cycle. Retirement: revert `/plugin install` if no benefit at 30d.

**CR-12 disposition**: **PARTIAL-OVERLAP** at plugin-substrate level (claude-sota-installed has 2 wshobson-derived agents from earlier port; 3 NEW plugins do NOT duplicate). Promotion = ECOSYSTEM-IMPORT via official Anthropic CC plugin marketplace.

**SRA D1-D10**:
- D1 named-author: PASS (Seth Hobson + Ryan Snodgrass shell-scripting + Tom Farley/ScopeBlind protect-mcp + Anthropic featured)
- D2 content-shape: PASS (frontmatter discipline + structured plugin.json)
- D3 ecosystem-fit: PASS (Anthropic CC marketplace mechanism native)
- D4 use-class compat: PASS (autonomous /loop compatible)
- D5 dependency-axis: PASS (markdown + JSON; protect-mcp needs operator-authored Cedar policy + local Ed25519 keys)
- D6 license-axis: PASS (MIT)
- D7 marker-decay: PASS (HEAD `34632bc` push 2026-05-11 = 2d)
- D8 fabrication-test: PASS (numeric claims backed by marketplace.json structure)
- D9 axis-3 band: PASS (9.7mo + cpd~14.2 sustained-active)
- D10 strong-provenance: PASS (Smithery badge + Gemini CLI extension + Anthropic featured)

**Concrete INSTALL** (CR-6 canonical channel):
```
/plugin marketplace add wshobson/agents
/plugin install shell-scripting@claude-code-workflows
/plugin install protect-mcp@claude-code-workflows
/plugin install signed-audit-trails@claude-code-workflows
```

Pre-install Mia probe MANDATORY:
```
grep -rn "shell-scripting\|protect-mcp\|signed-audit-trails" Z:/claude-sota-installed/.claude/plugins/marketplaces/ 2>/dev/null
```
Expect ZERO hits (confirms no duplicate + no phantom-cite).


### Repo 2 — abhigyanpatwari/GitNexus @ `507f84b69af29f6a5596538a59175bd930d07e57` (W171 fresh)

**Source files**:
1. README.md blob `3c3a28c2709ceb9a0dfd8822ddb13daa6de401a4` 37.3KB substantial
2. LICENSE blob `485af9b57b41e262e414d2791831f0d12823c6b4` **PolyForm Noncommercial 1.0.0**
3. Repo root (37+ entries): `.claude-plugin/`, `.cursor/`, `gitnexus-claude-plugin/`, `gitnexus-cursor-integration/`, `gitnexus-web/`, `gitnexus/`, `gitnexus-shared/`, AGENTS.md 13.5KB, ARCHITECTURE.md 32.5KB, CHANGELOG.md 8.1KB, Dockerfile.cli + Dockerfile.web + docker-compose.yaml, Cosign signed images, Sigstore policy-controller

**Marketplace stats**:
- 38,151 stars (UP from W164 F19 baseline 37,797 = 1% delta over 3 weeks)
- 4,362 forks
- 278 open issues
- Pushed 2026-05-13 THIS DAY (active dev)
- Size 27,147 = large multi-package repo

**Probe 4 plugin-namespace**:
- GitNexus has its own `gitnexus-claude-plugin/` subdir (Claude Code-native integration via MCP)
- DIFFERENT from claude-sota-installed runtime's `.claude/skills/gitnexus/` (operator-side skill docs created locally per W164 F23+F38b)
- Probe 4 PASS — GitNexus plugin = MCP-server-class (already wired via `.mcp.json` "gitnexus" stdio entry); local skills = CLI documentation. NO duplicate at plugin-class.

**Probe 5 mode-harness-shape**:
- MCP-server-class via `npm install -g gitnexus` (already INSTALLED v1.6.4-rc.112 per `.mcp.json` _comments §gitnexus W132 Fire 3 RC-UPGRADE)
- PASS

**Probe 6 LICENSE check (CRITICAL)**:
- **PolyForm Noncommercial 1.0.0** — NOT in permissive whitelist (MIT/Apache-2.0/BSD per ahfv-probe-dag.md §Probe 6)
- HOWEVER, LICENSE §"Noncommercial Purposes": "Any noncommercial purpose is a permitted purpose."
- LICENSE §"Personal Uses": "Personal use for research, experiment, and testing for the benefit of public knowledge, personal study, private entertainment, hobby projects, amateur pursuits, or religious observance, without any anticipated commercial application, is use for a permitted purpose."
- claude-sota-installed = personal research + operator dogfood + Karpathy §5 Wiki compounding-learning -> **WITHIN GRANT for current use-class**
- HOWEVER, distribution/SaaS-resale/commercial work = NOT in grant
- W132 Fire 3 RETAIN-WITH-DOWNGRADE-DEEP-DIVE-VERIFIED disposition codified at `.mcp.json` _comments §gitnexus stands intact

**Probe 7 demand-gate**: incumbent-served — GitNexus already provides 13 MCP tools (list_repos / query / context / impact / detect_changes / rename / cypher / api_impact / route_map / tool_map / shape_check / group_*) + AGENTS.md/CLAUDE.md auto-write per `gitnexus analyze` per W164 F38b dogfood. NO additional install needed.

**CR-12**: **INCUMBENT-KEEP** v1.6.4-rc.112. Stable 1.6.4 bump scheduled per W132 Fire 4 deferred trigger.

**SRA D1-D10**:
- D1 named-author: PASS (Patwari + Akon Labs enterprise + 105 contributors)
- D6 license-axis: **AMBER** (PolyForm Noncommercial permitted current use; commercial blocker)
- D7 marker-decay: PASS (HEAD push TODAY)
- D8 fabrication: PASS (Trendshift + OpenSSF Scorecard + Discord + Cosign signed)
- D9 stability-band: PASS (9.4mo + cpd~17.6)
- D10 strong-provenance: PASS (Akon Labs commercial backing + multi-runtime support)

**Recommended action**: NO new install. Refresh Marker Decay only. For brief's `gitnexus-pr-review` feature: CITE-as-research per CR-9 §item iii. Do NOT install fork. Use existing GitNexus MCP tool `detect_changes` already wired.

### Repo 3 — quemsah/awesome-claude-plugins @ `62e65931020618aa91d947c0b263e4d181f4a953` (W171 fresh)

**Source files**:
1. README.md blob `fac7fd788a5f27127a4378b8c10544fd18485e42` 20.4KB top-100 catalog
2. Root: only `.github/`, `README.md`, `ui/` (3-item structure)
3. **NO LICENSE file** anywhere

**Catalog stats**:
- "Last updated: 12.05.2026 with 16604 total repositories indexed"
- Top-100 ranked table (stars/subscribers/plugins)
- Trendshift indexed
- Homepage: awesomeclaudeplugins.com
- 689 stars

**Probe 4-7**:
- Probe 4 N/A (no plugin)
- Probe 5 N/A (catalog)
- **Probe 6 LICENSE-MISSING** — STRUCTURAL BLOCKER for content reuse per ahfv-probe-dag.md §Probe 6. Reads-as-research OK per CR-9 read-only research probe exception §item (i)
- Probe 7.b N/A (catalog)

**Cross-validation cue**: catalog row 6 `andrej-karpathy-skills @ forrestchang` 125,700 stars (STALE namespace per FM-20.A above). Row 10 `andrej-karpathy-skills @ multica-ai` 58,996 stars (active fork — matches fresh probe though stars number is somewhat lower since multica-ai is newer fork). Validates FM-20.A catch.

**SRA**:
- D1 named-author: PARTIAL (single-author + Trendshift)
- D6 license-axis: **FAIL** (no LICENSE file)
- D9 stability-band: PASS (6.5mo + active)
- D10 strong-provenance: PARTIAL (Trendshift + Glama.ai-class)

**CR-12**: **CITE-CLASS-CANONICAL** discovery; **REJECT-FOR-FIT** install-class.

**Recommended action**: cite via fresh blob-SHA `fac7fd788a5f27127a4378b8c10544fd18485e42` for discovery cohort C6 awesome-list. CR-9 §item (i) immutable-cite class applies. Add to `docs/sota-installed-manifest.md` §3 as CITE-REFERENCE row only (NOT INSTALLED) when batched.


### Repo 4 — Shubhamsaboo/awesome-llm-apps @ `795212bfb3ba7d25db04c7879d39621429fd093d` (W171 fresh)

**Source files**:
1. README.md blob `34e9fa21683181fffd3be8eb212f7843450c7c66` (5KB excerpt read)
2. Apache-2.0 LICENSE confirmed via repo.license API field
3. Already W164 F20 audited under 14-awesome-list milestone closure as CITE-CLASS-CANONICAL

**Marketplace stats**:
- 110,115 stars (UP from W164 F20 baseline)
- 16,310 forks
- Pushed 2026-05-09 (stable 4 days pre-fresh-probe)
- Topics: agents / llms / python / rag

**Probe 4-7**:
- Probe 4 N/A (no plugin)
- Probe 5 N/A (tutorial repo, NOT skill-class)
- **Probe 6 LICENSE-OK** (Apache-2.0 permissive whitelist)
- Probe 7.a DEMAND-ABSENCE for install-class — claude-sota-installed already has 100+ skills via 14 marketplaces; awesome-llm-apps is tutorial CODE template (Python apps for cloning), NOT Claude Code skill bundle

**Cross-validation**: 13 categories x 100+ templates spanning AI Agents / Multi-agent Teams / MCP Agents / Voice AI / RAG / Agent Skills / Fine-tuning. Provider-agnostic (Claude / Gemini / GPT / Llama / Qwen / xAI). Per research-protocol.md repo-discovery sub-rule, this is RESEARCH-INPUT surface for agentic-pattern cohort C3-class, NOT install-class.

**SRA**:
- D1 named-author: PASS (Shubham Saboo + Unwind AI named-T2 + creator Twitter @Saboo_Shubham_)
- D6 license-axis: PASS (Apache-2.0)
- D9 stability-band: PASS (>1y mature)
- D10 strong-provenance: PASS (110k stars + 8-lang translation forks + active contributors)

**CR-12**: **CITE-CLASS-CANONICAL + INCUMBENT-CITE** (W164 F20 already).

**Recommended action**: **REFRESH-CITE-ONLY**. Apache-2.0 + 110k stars haven't drifted materially. No new ship.

### Repo 5 — multica-ai/andrej-karpathy-skills @ `2c606141936f1eeef17fa3043a72095b4765b9c2` (W171 fresh)

**Source files**:
1. README.md blob `7cf07a786532bebe01c65179c8e2c3a98cc0a09b` 6.2KB
2. CLAUDE.md blob `daced9bd64f25908ebedeb4701fb406985dc8366` 2.4KB (the 4-principle cardinal rule text)
3. .claude-plugin/marketplace.json blob `f6573543bed69c60dfe917a9c83c3a5816558917` — `owner.name = "forrestchang"` (active fork = multica-ai)
4. Root: `.claude-plugin/`, `.cursor/`, CLAUDE.md, CURSOR.md, EXAMPLES.md, README.md, README.zh.md, skills/
5. `skills/karpathy-guidelines/` plugin source dir

**Marketplace stats**:
- 128,151 stars (UP from W164 baseline)
- 13,004 forks
- Pushed 2026-05-13 (active)
- MIT License
- Created 2026-01-27 = 3.6mo

**FM-20.A catch CRITICAL**: brief said `forrestchang/...`; original namespace; GH API 422; active fork is `multica-ai/...`. marketplace.json `owner.name = "forrestchang"` preserves attribution per citation-discipline.md rule #6 TIER-1-NAMED-AUTHOR-QUOTE.

**Probe 4-7**:
- Probe 4 PASS (no plugin namespace dup)
- Probe 5 PASS (CLAUDE.md merge-mode = SOTA pattern; works with bypassPermissions + autonomous /loop)
- Probe 6 PASS (MIT)
- Probe 7.a DEMAND-ABSENCE for install-class — **already cited in `Z:/claude-sota-installed/CLAUDE.md:114`**:
  - cite-anchor `Z:/repos/deps/andrej-karpathy-skills/CLAUDE.md:7-61 @ HEAD 2c606141936f1eeef17fa3043a72095b4765b9c2` MATCHES fresh probe EXACTLY
  - `.claude/rules/karpathy-adapted.md` provides eee-local 4-principle operationalization
  - NO NEW INSTALL needed — incumbent-cite canonical

**CR-12**: **CITE-CLASS-CANONICAL + INCUMBENT-CITE**.

**SRA**:
- D1 named-author: PASS (forrestchang/multica-ai + Karpathy X post + Jiayuan_jy creator handle)
- D6 license-axis: PASS (MIT)
- D9 stability-band: PASS (3.6mo + 128k stars + 13k forks)
- D10 strong-provenance: PASS (Karpathy-derived authority)

**Recommended action**: **INCUMBENT-CITE-KEEP**. Marker decay refresh confirms HEAD UNCHANGED from CLAUDE.md L114 anchor. No new ship.


## Top-2 INSTALL candidates

### 1st INSTALL wshobson @ 34632bc Top-3 cherry-pick

Pre-install Mia probe (mia-pre-apply.md):
  grep -rn shell-scripting Z:/claude-sota-installed/.claude/plugins/marketplaces/
  grep -rn protect-mcp Z:/claude-sota-installed/.claude/plugins/marketplaces/
  grep -rn signed-audit-trails Z:/claude-sota-installed/.claude/plugins/marketplaces/
Expect ZERO hits.

Pre-install REVERT check (CR-9):
  git -C Z:/claude-sota log --all --oneline -- .claude/plugins/marketplaces/wshobson
Expect ZERO precedent.

Install commands inside Claude Code fresh session:
  /plugin marketplace add wshobson/agents
  /plugin install shell-scripting@claude-code-workflows
  /plugin install protect-mcp@claude-code-workflows
  /plugin install signed-audit-trails@claude-code-workflows

30d STUDY-PILOT success criterion (CR-9 budget):
- shell-scripting: reduces FM-17.e autocompact-thrash recurrence >25%
- protect-mcp: Cedar intercepts >=1 destructive tool-call OR >=10 signed receipts in 30d
- signed-audit-trails: Ed25519 receipt for >=1 commit cycle

### 2nd INSTALL N/A this wave

W171 P3 wave-1 = 1 install + 4 cite-keep/refresh. Next-fire focuses on plugin install verification + STUDY-PILOT instrumentation NOT further fan-out.

## Top-2 REJECT or DEFER

### 1st DEFER abhigyanpatwari/GitNexus @ 507f84b INCUMBENT-KEEP at v1.6.4-rc.112

Probe 6 license caveat: PolyForm Noncommercial 1.0.0 permitted for current eee-runtime use-class (personal/research/non-commercial-organization); commercial/distribution/SaaS-resale blocked. W132 Fire 3 RETAIN-WITH-DOWNGRADE-DEEP-DIVE-VERIFIED in .mcp.json _comments gitnexus is canonical authority. NO new ship; refresh Marker Decay only.

For brief gitnexus-pr-review CITE-IMPORT-AMBER: CITE-as-research per CR-9 item iii. Do NOT install fork. Use existing GitNexus MCP tool detect_changes already wired in .mcp.json gitnexus stdio server (manifest section 7 INSTALLED).

### 2nd DEFER quemsah/awesome-claude-plugins @ 62e6593 CITE-CLASS-CANONICAL only

Probe 6 LICENSE-MISSING blocker: no LICENSE file in repo root or sub-path -> unclear copyright -> cannot import content. Per ahfv-probe-dag.md Probe 6 direct-file blockers STRUCTURAL blocker. Use as discovery research-input via fresh blob-SHA cite at HEAD 62e6593 per CR-9 read-only research probe exception item i immutable anchor class.

## HONEST-NON-FINDING (HNF) section

Per synthesis-layer-verify.md Reporting categories what I LOOKED for and DID NOT find:

1. DID NOT find AGENTS.md anti-pattern in wshobson Top-3 plugins. Sampled shell-scripting (2 agents) + protect-mcp (README + 8 subdirs); structure matches Anthropic CC plugin spec. NO Probe 5 HARD-GATE / setup-interactive-Q-A equivalent to iter-93 wshobson conductor plugin (which IS in same repo BUT NOT in Top-3 candidates). HONEST: cohort recurrence is conductor only per ahfv-seven-sub-classes.md n=4 mode-harness-shape ladder; the 3 Top targets are CLEAN.

2. DID NOT find npm package phantom for protect-mcp. README cites npmjs.com/package/protect-mcp with 10K+ monthly downloads badge. Probe 6 npm registry direct-existence NOT executed this fire (sandbox limitation). HONEST: phantom-package risk per Ship D anthropic-mcp-ast-grep precedent SHOULD be reverified at install-time via curl https://registry.npmjs.org/protect-mcp before /plugin install lands.

3. DID NOT find awesome-llm-apps install-class workflow. Repo is tutorial code (clone-and-run Python templates) NOT Claude Code skill bundle. HONEST: cohort role is agentic-pattern reference C3-class not install-class. Already correctly classified in research-protocol.md 6-catalog discovery surface.

4. DID NOT find Karpathy named-author quote SHA drift. CLAUDE.md:114 cite anchor Z:/repos/deps/andrej-karpathy-skills/CLAUDE.md:7-61 at HEAD 2c606141 MATCHES fresh probe HEAD EXACTLY. HONEST: incumbent-cite current; no Marker Decay refresh needed.

5. DID NOT execute Probe 1 count-OVER on wshobson. README claims 185 agents / 153 skills / 100 commands / 80 plugins. Marketplace.json confirms 80 plugins (verified). Agent count NOT enumerated this fire (recursive read of 80 plugin agents dirs ~80 tool calls exceeds budget). HONEST: claim consistent with marketplace structure; defer count drift to next-fire Pattern-A audit if install proceeds.

6. DID NOT cross-reference quemsah top-100 entries vs existing claude-sota-installed marketplaces. 100-row table contains many repos already-cited or already-INSTALLED (anthropics/skills row 5 / anthropics/claude-plugins-official row 45 / wshobson/agents row 25 / multica-ai row 10). HONEST: matrix would yield duplicate-detection but OUT OF SCOPE; queue for W172 P3 wave-2 if audit warranted.

## Cross-model disposition vs Agent-B

Agent B (codex T1 BRIDGE-MODE) running in parallel; final cross-model gate at orchestrator synthesis. This artifact verdict shape MATCHES brief schema. Convergence expectations:

- If Agent B returns ADOPT-NOW conf>=0.85 on wshobson Top-3: my STUDY-PILOT-NARROW 0.91 CONVERGES (both PASS overall; my conf slightly lower as Sonnet stand-in vs BRIDGE-MODE GPT-5.5). Orchestrator should ratify INSTALL.

- If Agent B returns ADOPT-NOW on GitNexus install-class: I OVERRIDE per Probe 6 license analysis. PolyForm Noncommercial is STRUCTURAL blocker for install-class extensions (FM-09 2-stage validation contract my Probe 6 finding OVERRIDES Agent B potential abstract-pattern blind-spot on license direct-file read).

- If Agent B returns ADOPT-NOW on quemsah install-class: I OVERRIDE per LICENSE-MISSING (same FM-09 pattern).

- If Agent B returns ADOPT-NOW on Shubhamsaboo install-class: I OVERRIDE per Probe 7.a DEMAND-ABSENCE (tutorial code not skill bundle).

- If Agent B returns ADOPT-NOW on multica-ai install-class: I OVERRIDE per incumbent-cite canonical at CLAUDE.md:114 (Probe 7.a DEMAND-ABSENCE install-class request when cite-class already serves workflow).

## Forward queue (P3 wave-2 candidates)

If orchestrator dispatches W172 P3 wave-2:
- 5 remaining brief-targets across 14-list per W161 baseline
- wshobson plugin enumeration audit (Probe 1 count-OVER on 185 agents / 153 skills claim)
- protect-mcp npm registry direct-existence probe (Probe 6 phantom-package class)
- AGENTS.md adoption-pattern audit across top-5 most-installed Claude Code plugin repos

SOURCE-5: STUDY-PILOT-1 wshobson + CITE-KEEP-2 (GitNexus + quemsah) + CITE-CANONICAL-2 (Shubhamsaboo + multica-ai) + HNF 6 items + cross-model-disposition-prepared-vs-Agent-B 5 convergence-checks
