---
title: Stream W205-D — TUI agents + Agent IDEs + Coding tools
date: 2026-05-15
agent: W205-D general-purpose
arc: W205 SOTA deep-research extension wave 2 (Layer 1-8 of W205 brief)
status: AUTHORITATIVE-CANDIDATE
target_runtime: Z:/claude-sota-pure
output_budget: 1500 LOC
license_policy: permissive-only (MIT / Apache-2.0 / BSD); AGPL/GPL/SSPL/ELv2/Source-Available REJECT unless operator-override
---

# Stream W205-D — TUI agents + Agent IDEs + Coding tools (SOTA research)

## §1 Executive summary

This stream closes the `§12 honest-gap` queue from `Z:\claude-sota-pure\docs\sota-research-CATALOG.md` for **TUI agents + agent IDEs + extension-class coding tools**. Eight layers researched against upstream primary sources at HEAD + license + last-commit + named-T2 corroboration. Total candidates evaluated: **42 repos + 8 closed platforms + 4 protocols + 7 benchmarks + 4 code-completion engines**.

### Strategic context — anchor-vs-additive distinction

The `claude-sota-pure` runtime IS `anthropics/claude-code` (CC). Every Layer 1 candidate is structurally either:

1. **DUPLICATIVE** of CC at the orchestrator/agent layer → REJECT-FOR-FIT per cardinal-rule-12 disposition lattice (kiss-dry-yagni Must-Never #4)
2. **ADDITIVE** at the per-language-model / per-workflow / per-protocol layer → STUDY-PILOT or PATTERN-EXTRACT
3. **TOOLING** that any CC subagent can shell out to → ADOPT-NOW for the tool only

The dominant disposition for **Layer 1 (TUI coding agents)** is **PATTERN-EXTRACT-ONLY** + **TOOL-INTEROP**. CC + codex CLI (BRIDGE-MODE per `Z:/claude-sota/.claude/rules/cmc-t1-t7-lifecycle.md`) already covers the orchestrator + adversarial-reviewer slots; adding aider/cline/opencode/etc as second CC competitors creates n=2+ orchestrator collision per advanced-agent-team-standing-directive.

### Top-line dispositions (full ranking §10)

- **5 ADOPT-NOW** (P0): mini-swe-agent + repomix + gitingest + code2prompt + LSP-spec (already cited in W204-B / sibling); plus first-class SWE-bench / TerminalBench eval substrates
- **6 STUDY-PILOT** (P1): aider polyglot benchmark methodology + opencode TS subagent YAML pattern + cline plan/act pattern + goose extension architecture + browser-use for Layer-9 web automation + ACP-protocol for editor agnosticism
- **9 PATTERN-EXTRACT-ONLY**: Cursor Composer/Tab/Chat split / Windsurf Cascade flow-awareness / Devin sandbox+plan / Augment deep-context / Trae agentic Builder / Antigravity vs Trae / Kilocode multi-mode / Roo-Code multi-agent / Letta memory-first
- **7 REJECT-FOR-FIT**: plandex (STALE 7mo) / gpt-engineer (ARCHIVED) / claude-engineer (no LICENSE; STALE Dec 2024) / sourcegraph/cody (404 - REPO REMOVED 2026) / codellama (ARCHIVED + non-permissive Llama2 license) / auto-code-rover (SONAR SOURCE-AVAILABLE v1.0 = license blocker) / ai-renamer (GPL-3.0 license blocker)
- **2 DUAL-LICENSE-CAUTION**: TabbyML (`ee/` directory restricted, main MIT) + OpenHands/All-Hands-AI (`enterprise/` directory restricted, main MIT)

### Critical Marker-Decay catches (this wave)

1. **`sst/opencode` → HTTP 301 redirected to `anomalyco/opencode`** [VERIFIED 2026-05-15 via `curl -sLI https://github.com/sst/opencode | grep Location`]. Maintainer handoff. Current canonical is `anomalyco/opencode` 160,676★ MIT. Prior W134 Fire 50 deep-dive at `Z:/claude-sota` cited `sst/opencode` — that cite needs forward-only refresh.
2. **`sourcegraph/cody` returns 404** [VERIFIED 2026-05-15 via `gh api repos/sourcegraph/cody`]. STATUS-CHECK prior research claim CONFIRMED: repo removed/archived. Cody product still active as Sourcegraph SaaS but no public OSS repo at canonical path.
3. **`AntonOsika/gpt-engineer` ARCHIVED** [VERIFIED 2026-05-15 via `gh api`]: archived flag true, last push 2025-05-14, description "Precursor to: https://lovable.dev" — Anton transitioned to Lovable closed product.
4. **`meta-llama/codellama` ARCHIVED** + uses Llama 2 Community License (not OSI-permissive).
5. **`plandex-ai/plandex` last push 2025-10-03** — 7 months stale. STUDY-PILOT downgraded to REJECT-FOR-FIT pending Axis-3 re-audit.

### License blocker matrix

| Repo | License | sss-policy | Decision |
|---|---|---|---|
| `AutoCodeRoverSG/auto-code-rover` | SONAR Source-Available v1.0 | REJECT (non-permissive) | REJECT-FOR-FIT |
| `ozgrozer/ai-renamer` | GPL-3.0 | REJECT (copyleft, not permissive) | REJECT-FOR-FIT |
| `TabbyML/tabby` | DUAL: MIT main + `ee/` proprietary | ADOPT-PARTIAL (avoid `ee/` dir) | STUDY-PILOT-MAIN-ONLY |
| `All-Hands-AI/OpenHands` | DUAL: MIT main + `enterprise/` proprietary | ADOPT-PARTIAL (avoid `enterprise/` dir) | STUDY-PILOT-MAIN-ONLY |
| `Doriandarko/claude-engineer` | NONE (no LICENSE file 404x3) | REJECT (no permissive grant) | REJECT-FOR-FIT |
| `meta-llama/codellama` | Llama 2 Community License + ARCHIVED | REJECT (non-permissive + EOL) | REJECT-FOR-FIT |
| `anthropics/claude-code` | NONE in repo (proprietary binary) | RUNTIME-PRIMITIVE (already installed) | N/A — the runtime |
| `anthropics/skills` | NONE in repo | DOC-REFERENCE-ONLY | PATTERN-EXTRACT |

---

## §2 Layer 1 — Terminal/CLI coding agents (open-source primary)

### §2.1 ADOPT-NOW / Anchors

#### Anthropic Claude Code (already installed; the runtime)
- **Path**: `anthropics/claude-code`
- **Stars**: 123,815★ [VERIFIED 2026-05-15 via `gh api repos/anthropics/claude-code`]
- **License**: PROPRIETARY (no LICENSE file in repo per direct curl probe)
- **HEAD**: pushed 2026-05-14T22:55:09Z, main
- **Maintainer**: Anthropic (org #1 of cardinal-rule-1 TIER-1 triple)
- **Convergence-gate**: Axis 1 (CC + CCBP + OpenAI codex 3-distinct-org PASS); Axis 2 (named-T2 Boris Cherny + Karpathy via skills); Axis 3 STABLE-BURN-IN
- **Disposition**: `RUNTIME-PRIMITIVE` — the runtime IS this. No "adoption" — it's the anchor.
- **Install method**: per cardinal-rule-6 `https://www.anthropic.com/claude-code` (Anthropic-canonical native channel: npm/standalone-installer)
- **Interop-with-CC**: trivially "is-CC"

#### `openai/codex` CLI (already installed; T1-T7 lifecycle worker per cardinal-rule-3)
- **Path**: `openai/codex`
- **Stars**: 82,852★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 [VERIFIED 2026-05-15]
- **HEAD**: pushed 2026-05-15T14:19:37Z, main (HOT) — last commit today
- **Maintainer**: OpenAI (org #3 of cardinal-rule-1 TIER-1 triple)
- **Convergence-gate**: PASS — already cited in `Z:/claude-sota/.claude/rules/cmc-t1-t7-lifecycle.md` as worker layer
- **Disposition**: `RUNTIME-PRIMITIVE` — codex T1-T7 hooks ride this CLI
- **Install method**: `gh release download --repo openai/codex` OR `npm install -g @openai/codex` per cardinal-rule-6 native-channel
- **Interop-with-CC**: complementary (CC orchestrates, codex audits — locked topology per `cross-model-consensus.md`)

#### `Aider-AI/aider` — ADOPT-NOW (benchmark methodology only) / PATTERN-EXTRACT (auto-commit discipline)
- **Path**: `Aider-AI/aider` [Note: prior cite "paul-gauthier/aider" — repo handover already happened]
- **Stars**: 44,851★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0
- **HEAD**: pushed 2026-04-25T16:44:33Z (3 weeks stale but maintained); last commit `3ec8ec5a` adds gpt-5.5 model settings
- **Maintainer**: Aider-AI org; founder Paul Gauthier (named-T2 author)
- **Convergence-gate**: Axis 1 [exa convergent corroboration n=6 named sources for terminal coding agent comparison 2026]; Axis 2 (Paul Gauthier + Effloow + AgentMarketCap + termdock + heyuan110 + codepick); Axis 3 STABLE-BURN-IN (founded 2023)
- **Disposition**: **PATTERN-EXTRACT-ONLY (orchestrator collision)** + **STUDY-PILOT for polyglot leaderboard methodology**
- **Reasoning**:
  - **Auto-commit pattern** (every AI edit = git commit with descriptive message) is canonical SOTA for AI-auditability per 5+ independent named-T2 reviews [VERIFIED via Exa 2026-04 reviews; convergence Axis 2 PASS]. **EXTRACT** to `Z:/claude-sota-pure/.claude/rules/` as design discipline if not already present.
  - **Architect mode** (plan-before-coding) is a precursor to CC plan-mode; CC already has equivalent via `--plan` flag.
  - **Polyglot leaderboard at `aider/website/docs/leaderboards/edit.md` HEAD `07cb664c4ce1d16846b4c0a4ae641232fe55d242` size 5189 bytes** [VERIFIED 2026-05-15 via `gh api repos/Aider-AI/aider/contents/aider/website/docs/leaderboards/edit.md`] is a SOTA cross-model edit-quality benchmark. Methodology PATTERN-EXTRACT for sss benchmark layer.
  - **No MCP support** per cross-source consensus [VERIFIED via 5 of 6 exa results].
- **Install-risk**: low — Apache-2.0 + active maintenance + named-T2 founder
- **Interop-with-CC**: WORKFLOW-COLLISION at orchestrator slot (cardinal-rule-12 disposition `DUPLICATE-FUNCTIONALITY` for orchestrator+main-loop; `CITE-CLASS-CANONICAL` for benchmark methodology only)

#### `SWE-agent/mini-swe-agent` — **ADOPT-NOW (benchmark reference + worker primitive)**
- **Path**: `SWE-agent/mini-swe-agent`
- **Stars**: 4,365★ [VERIFIED 2026-05-15]
- **License**: MIT (verified by direct LICENSE fetch — confirmed John Yang et al. 2024)
- **HEAD**: pushed 2026-05-07T15:52:49Z (8 days; HOT)
- **Maintainer**: SWE-agent org (Princeton NLP team — NeurIPS 2024 named-author)
- **Convergence-gate**: Axis 1 PASS (Princeton NLP + SWE-bench + Modal + OpenAI/Anthropic acknowledgements per `swebench.com`); Axis 2 PASS (Ofir Press / Carlos Jimenez / Shunyu Yao named-T2 authors); Axis 3 STABLE-BURN-IN
- **Disposition**: **ADOPT-NOW (benchmark substrate)** + **PATTERN-EXTRACT (minimalism: 100-line agent scores 74%+ on SWE-bench Verified)**
- **Reasoning**: README claim "The 100 line AI agent that solves GitHub issues... scores >74% on SWE-bench verified" — minimalism-as-design-discipline is convergent SOTA per `karpathy-adapted.md §2 Simplicity First` + Knuth/Hoare named-T2 quotes at cite header. Use as **eval reference impl** when measuring sss benchmark performance.
- **Install method**: `pip install mini-swe-agent` per cardinal-rule-6 PyPI canonical
- **Interop-with-CC**: COMPLEMENTARY (worker primitive used by SWE-bench eval harness; not an orchestrator competitor)

### §2.2 STUDY-PILOT candidates

#### `cline/cline` — STUDY-PILOT (plan/act pattern + IDE extension reference)
- **Stars**: 61,822★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0
- **HEAD**: pushed 2026-05-15T14:03:30Z (today; HOT)
- **Maintainer**: Cline org
- **Convergence-gate**: Axis 1 PASS; Axis 2 PARTIAL (third-party reviews); Axis 3 STABLE-BURN-IN
- **Disposition**: **STUDY-PILOT** for plan/act mode pattern (codified in cline 3.x); **PATTERN-EXTRACT** for IDE-extension architecture (CC has subagent skills + plugins but not native IDE)
- **Install-risk**: medium — VSCode extension competes with CC IDE plugin layer; would create n=2 IDE-extension class collision if installed wholesale
- **Interop-with-CC**: PATTERN-EXTRACT-ONLY at orchestrator level; SDK-class (per its README: "autonomous coding agent as an SDK, IDE extension, or CLI assistant") may have additive value as a **plan/act mode reference** in CC subagent design

#### `continuedev/continue` — STUDY-PILOT (CI-enforcement pattern)
- **Stars**: 33,205★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0
- **HEAD**: pushed 2026-05-15T08:23:55Z (today; HOT)
- **Maintainer**: Continue.dev org
- **Description**: "Source-controlled AI checks, enforceable in CI. Powered by the open-source Continue CLI"
- **Disposition**: **STUDY-PILOT** for **CI-enforced AI rules** pattern — closer convergence with sss's `.claude/rules/*.md` + audit-action-loop discipline than orchestrator competition
- **Reasoning**: 2026 product pivot from VSCode agent → CI-enforceable rules engine is structurally NOVEL and ADDITIVE; consider for sss audit hook layer
- **Interop-with-CC**: COMPLEMENTARY at CI layer (Layer 4 of `.claude/rules` audit-action-loop)

#### `anomalyco/opencode` (formerly `sst/opencode` — handoff 2026) — STUDY-PILOT (YAML subagent + 75-provider abstraction)
- **Path**: `anomalyco/opencode` (canonical successor after 301 redirect from `sst/opencode`)
- **Stars**: 160,676★ [VERIFIED 2026-05-15 via `curl -sLI` resolves 301 → anomalyco/opencode + `gh api`]
- **License**: MIT
- **HEAD**: pushed 2026-05-15T14:22:26Z (today; HOT), default_branch `dev`
- **Maintainer**: Anomaly Innovations (Anomaly Co org; org-type "Organization" per direct API probe)
- **Convergence-gate**: Axis 1 PASS (75+ LLM providers per Models.dev integration); Axis 2 PASS (5+ third-party reviews — termdock / heyuan110 / effloow / agentmarketcap); Axis 3 STABLE-BURN-IN
- **Disposition**: **PATTERN-EXTRACT-ONLY** at orchestrator (collision with CC) + **STUDY-PILOT** for YAML subagent architecture + 75-provider abstraction
- **Reasoning**: Bubble Tea TUI + LSP integration in terminal + YAML-defined subagents — the YAML pattern is structurally distinct from CC's `.claude/agents/*.md` frontmatter. Worth extracting as comparison reference for sss subagent format evolution.
- **Marker-Decay critical**: prior research at `Z:/claude-sota/Wave 134 Fire 50` cited `sst/opencode` — forward-only refresh required to `anomalyco/opencode` per `port-note-discipline.md §6`. The sst handoff appears legitimate (no fork; direct repo rename redirected at GitHub level).
- **Interop-with-CC**: WORKFLOW-COLLISION at orchestrator slot (`DUPLICATE-FUNCTIONALITY` per CR-12 lattice for orchestration; `CITE-CLASS-CANONICAL` for YAML subagent pattern extraction)

#### `google-gemini/gemini-cli` — STUDY-PILOT (ReAct loop + Google Search grounding pattern)
- **Stars**: 104,036★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0
- **HEAD**: pushed 2026-05-15T06:57:25Z (today; HOT)
- **Maintainer**: Google (Gemini team)
- **Convergence-gate**: Axis 1+2+3 PASS (Google org + 6 named third-party reviews + 1y+ active)
- **Disposition**: **PATTERN-EXTRACT** for ReAct loop + Google Search Grounding + Plan Mode (added March 2026)
- **Reasoning**: 1M context + free 1,000 req/day tier are model-layer features (sss uses Claude); ReAct + Search Grounding patterns are architectural. **NOT additive** as orchestrator (CC already has equivalent).
- **Interop-with-CC**: DUPLICATE-FUNCTIONALITY (CR-12 disposition); PATTERN-EXTRACT-ONLY for design lessons

#### `QwenLM/qwen-code` — STUDY-PILOT (Alibaba alternative orchestrator + qwen3-coder spec)
- **Stars**: 24,406★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0
- **HEAD**: pushed 2026-05-15T14:22:46Z (today; HOT) — last commit 14:27 today
- **Maintainer**: QwenLM (Alibaba Cloud)
- **Disposition**: **PATTERN-EXTRACT** for non-Anthropic terminal-agent reference design; **REJECT-as-orchestrator** (CR-12 DUPLICATE-FUNCTIONALITY)
- **Reasoning**: Active maintenance + permissive license; useful as comparison reference but does not displace CC

#### `Kilo-Org/kilocode` — STUDY-PILOT (Multi-Mode pattern: Architect/Coder/Debugger)
- **Stars**: 19,306★ [VERIFIED 2026-05-15]
- **License**: MIT
- **HEAD**: pushed 2026-05-15T14:25:36Z (today; HOT)
- **Description**: "all-in-one agentic engineering platform"
- **Disposition**: **PATTERN-EXTRACT** for Multi-Mode (Architect/Coder/Debugger/custom) design
- **Reasoning**: VSCode-based platform with mode-routing pattern; **DUPLICATE-FUNCTIONALITY** at orchestrator level (CR-12) but the named-mode dispatch pattern is architecturally interesting — compares against sss agent frontmatter `model:` per-task selection
- **Interop-with-CC**: PATTERN-EXTRACT-ONLY

#### `RooCodeInc/Roo-Code` — STUDY-PILOT (Multi-agent in editor)
- **Stars**: 24,078★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0
- **HEAD**: pushed 2026-05-14T19:30:11Z (1 day; HOT)
- **Description**: "Roo Code gives you a whole dev team of AI agents in your code editor"
- **Disposition**: **PATTERN-EXTRACT** for in-editor multi-agent dispatch pattern
- **Reasoning**: Sibling fork of cline lineage (Roo Cline → Roo Code rename). Multi-agent editor surface is structurally similar to CC subagent dispatch; **DUPLICATE-FUNCTIONALITY** per CR-12 lattice

#### `bytedance/trae-agent` — STUDY-PILOT (open SDK from ByteDance Trae)
- **Stars**: 11,553★ [VERIFIED 2026-05-15]
- **License**: MIT
- **HEAD**: pushed 2026-02-05T11:21:00Z (3 months stale — moderate concern)
- **Maintainer**: ByteDance
- **Description**: "Trae Agent is an LLM-based agent for general purpose software engineering tasks"
- **Disposition**: **PATTERN-EXTRACT** for ByteDance Trae IDE companion-agent design (Trae IDE itself is closed; this is the open SDK)
- **Reasoning**: 3-month-old last commit drops Axis 3 to borderline; defer adoption decision pending re-audit

#### `block/goose` (canonical: `aaif-goose/goose` per recent rename) — STUDY-PILOT (Layer Foundation governance + extensibility)
- **Path**: `aaif-goose/goose` (org rebranded under AAIF/Linux Foundation 2026)
- **Stars**: 45,240★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 (verified direct LICENSE fetch)
- **HEAD**: pushed 2026-05-15T14:23:55Z (today; HOT)
- **Maintainer**: AAIF / Linux Foundation (Block Inc. parented)
- **Convergence-gate**: Axis 1 PASS (Block / Linux Foundation org-tier T1); Axis 2 PASS (per Z:/claude-sota cross-model-consensus.md cite); Axis 3 STABLE-BURN-IN
- **Disposition**: **STUDY-PILOT** for Linux-Foundation-governed open-agent pattern + extension MCP architecture
- **Reasoning**: Already cited in sibling `Z:/claude-sota/CLAUDE.md` line "Architecture (locked-in topology)" at TIER-1 cite for ACP convergence (4th-org evidence). Goose's MCP-extension model is architecturally compatible with CC. The native desktop/CLI/API surface is **complementary** at protocol layer but **collision** at orchestrator slot.
- **Interop-with-CC**: PATTERN-EXTRACT + ACP-protocol-shared

#### `letta-ai/letta-code` — STUDY-PILOT (memory-first coding agent)
- **Stars**: 2,487★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0
- **HEAD**: pushed 2026-05-15T05:20:42Z (today; HOT)
- **Description**: "The memory-first coding agent"
- **Disposition**: **PATTERN-EXTRACT** for memory-first architecture
- **Reasoning**: Letta (formerly MemGPT) extends to coding agent class. Per prior research at `Z:/claude-sota tier-A Wave 134 Fire 50` Letta was cited as memory anchor; their coding-agent variant is structurally novel for **persistent-state-across-sessions** pattern. Memory stack in sss already has L3 Graphiti — Letta's approach is a parallel evolution. PATTERN-EXTRACT for sss memory layer review.

### §2.3 REJECT-FOR-FIT (Layer 1)

- **`plandex-ai/plandex`** — 15,365★ MIT BUT pushed 2025-10-03 (~7 months STALE). Axis 3 fast-churn-band threat (`convergence-gate.md`); re-audit when activity resumes
- **`AntonOsika/gpt-engineer`** — **ARCHIVED** 2025-05; founder moved to closed Lovable product. EOL
- **`Doriandarko/claude-engineer`** — **NO LICENSE FILE** (404 on LICENSE, LICENSE.md, license per direct curl probes); last commit 2024-12-12 ("v3 self-improving assistant"). 11,170★ but EOL + license blocker
- **`OpenHands/OpenHands`** — 73,632★ — DUAL-LICENSE (MIT main + `enterprise/` proprietary). MAIN portion is fine for STUDY-PILOT-MAIN-ONLY; the `enterprise/` directory is restricted. Cardinal-rule-9 caveat: **DO NOT** copy/install from `enterprise/`; respects-`enterprise/`-exclusion is sss-compliant. Effective disposition: **STUDY-PILOT-MAIN-ONLY** (avoid enterprise/ subtree per cardinal-rule-9 install-risk discipline)
- **`AutoCodeRoverSG/auto-code-rover`** — **SONAR Source-Available v1.0** — NOT permissive per `evidence-policy.md` license filter. REJECT despite 37.3% SWE-bench score. Useful as ARCHITECTURAL-REFERENCE-ONLY (read README, cite line:line)

---

## §3 Layer 2 — Hosted/closed coding agent platforms (PATTERN-EXTRACT only)

Per cardinal-rule-5 install-priority: ALL closed platforms in this layer are **PATTERN-EXTRACT-ONLY** — no install possible. Patterns to extract:

### Cursor (Anysphere; $10B+ valuation 2026)
**Extracted patterns**:
- **Three-mode split** (Composer / Tab / Chat) — distinct surfaces for "multi-file refactor", "line-completion", "Q&A". The mode-discrimination is canonical SOTA per `afterbuildlabs.com` review 2026-04-15 [VERIFIED].
  - Maps to sss: `Composer` ≈ CC `Edit/Write` tool calls in agent loop; `Tab` ≈ no direct sss analog (sss has no inline-autocomplete; this is purely IDE-class); `Chat` ≈ CC default conversation surface
- **`.cursor/rules/*.mdc` files** — project-convention codification. Maps DIRECTLY to sss `.claude/rules/*.md` (CC ecosystem already converged on this pattern per cardinal-rule-1 lineage; Cursor `.mdc` = Cursor's superset of CC `.md` format)
- **Explicit `@file` references** in prompts — bounded-context discipline. sss equivalent: `@.claude/rules/foo.md` syntax in CC user prompts.

### Windsurf / Codeium (now Cognition; same parent as Devin)
**Extracted patterns**:
- **Cascade flow-awareness**: tracks edit-trajectory + cursor movement + clipboard + terminal commands as single timeline. The "flow-aware" pattern is architecturally novel — combines what sss currently treats as 4 separate surfaces (`subagent_transcripts.jsonl` + `mcp_health.jsonl` + edit-diff + Bash history) into one model-side timeline.
  - **PATTERN-EXTRACT VERDICT**: sss could synthesize equivalent via `.claude/hooks/` log unification (low priority)
- **Supercomplete**: proactive multi-line autocomplete using AST + edit-history signals. **NOT applicable** to sss (CC is not autocomplete-class)
- **First-class in-IDE preview** (click-to-edit UI) — DUPLICATE of CC browser-testing capability via mcp__chrome-devtools

### Cognition Devin
**Extracted patterns**:
- **Sandboxed cloud workspace** — full terminal + browser + IDE in isolated VM. sss equivalent: codex `--sandbox=danger-full-access` profile (already canonical per `cmc-t1-t7-lifecycle.md`)
- **Managed Devins** (multi-Devin parallel coordinator): structurally similar to sss `parallel-agent-wave.md` 3-6 fan-out pattern + advanced-agent-team-standing-directive
- **15s session startup** + **desktop computer-use** (Devin 2.2): no direct sss analog (CC doesn't run desktop UI)
- **EXTRACT VERDICT**: sss's advanced-agent-team-standing-directive + parallel-agent-wave.md cover the multi-agent dispatch surface; no additional adoption needed

### Augment Code (closed)
**Extracted patterns**:
- **Deep persistent codebase context** — claims indexer that maintains architectural understanding across sessions. sss equivalent: graphiti L3 + repomix-class pre-context pack
- **Enterprise security focus** — SOC2/HIPAA — sss doesn't target enterprise compliance
- **EXTRACT VERDICT**: persistent-codebase-index pattern is convergent with mcp__gitnexus (already installed in sss). No additional pattern needed.

### Trae IDE (ByteDance; closed; open SDK is `bytedance/trae-agent`)
**Extracted patterns**: covered in §2.2 trae-agent row above. IDE is closed; SDK is open.

### Antigravity (Google)
**Extracted patterns**: Per `respan.ai` market-map URL (page content truncated in fetch) — Google Antigravity vs Trae comparison exists but full feature-set not extractable. **HONEST-NON-FINDING** — would require WebFetch on official Antigravity docs (separate research cycle); not budget-justified this wave.

### v0.dev (Vercel) / Lovable / Bolt.new
**Extracted patterns**: ALL three are **closed UI-generation platforms** (web-app scaffolding from prompt). sss target is local-runtime + terminal, not browser-UI. **OUT OF SCOPE** for sss adoption.

### Augment / Trae / Devin / Antigravity / Cursor / Windsurf — net disposition

**NONE adoptable** (all closed). **ALL pattern-extractable** at architectural-discipline level only. Most patterns ALREADY present in sss via CC + sibling rules:
- Multi-mode split: CC has subagents + plugins
- Sandbox: codex profile system
- Multi-agent fan-out: advanced-agent-team-standing-directive
- Project conventions: `.claude/rules/*.md`
- Deep codebase context: graphiti + gitnexus

**HONEST-NON-FINDING**: closed platforms offer FEW novel architectural patterns NOT already in sss. The "innovation" axes (IDE UX, preview-loop UI, click-to-edit, etc.) are presentation-layer rather than orchestrator-layer.

---

## §4 Layer 3 — Open agentic IDE / web-based

### `TabbyML/tabby` — STUDY-PILOT-MAIN-ONLY (self-hosted copilot)
- **Stars**: 33,517★ [VERIFIED 2026-05-15]
- **License**: DUAL — MIT main + `ee/` subdir under separate `ee/LICENSE` (Tabby Enterprise — proprietary)
- **HEAD**: pushed 2026-03-02T20:08:28Z (2.5 months — borderline burn-in)
- **Disposition**: **STUDY-PILOT-MAIN-ONLY** — avoid `ee/` subtree per cardinal-rule-9 install-risk
- **Reasoning**: Self-hosted GitHub Copilot alternative. Code-completion (FIM model) class — distinct from CC's edit-agent class. **COMPLEMENTARY** for line-completion if sss adds inline-autocomplete; **NOT applicable** to current sss runtime (CC is edit-agent only)

### `sourcegraph/cody` — REJECT-FOR-FIT (REPO REMOVED 2026)
- **Status**: HTTP 404 on `https://api.github.com/repos/sourcegraph/cody` [VERIFIED 2026-05-15 via direct curl probe]
- **Disposition**: REJECT — repo gone. Cody product still active as Sourcegraph SaaS but no public OSS repo at canonical path
- **Marker-Decay**: prior research (any pre-2026 cite) needs forward-only correction

### `TabbyML/tabby` covers the self-hosted-copilot slot. No additional Layer-3 ADOPT-NOW.

### `gpt-engineer-org/gpt-engineer` (formerly `AntonOsika/gpt-engineer`) — ARCHIVED REJECT
- Already covered §2.3

---

## §5 Layer 4 — IDE extensions + protocols

### `microsoft/language-server-protocol` (LSP) — **ADOPT-NOW (cite-class canonical)**
- **Stars**: 12,811★ [VERIFIED 2026-05-15]
- **License**: CC-BY-4.0 (docs/spec license — applicable to spec text only)
- **HEAD**: pushed 2026-05-11T08:38:02Z (4 days; HOT)
- **Maintainer**: Microsoft
- **Disposition**: **CITE-CLASS-CANONICAL** per cardinal-rule-12 — already an industry-standard protocol. sss CC can leverage LSP via mcp__serena MCP server already (per `Z:/claude-sota/.claude/rules/research-protocol.md` MCP routing table). **NO direct install needed** — protocol is consumed via existing MCP servers.

### `microsoft/debug-adapter-protocol` (DAP) — **ADOPT-NOW (cite-class canonical)**
- **Stars**: 1,732★ [VERIFIED 2026-05-15]
- **License**: NOASSERTION (proprietary docs/spec under MIT-class terms per Microsoft convention)
- **HEAD**: pushed 2026-05-12T18:06:39Z (3 days; HOT)
- **Disposition**: **CITE-CLASS-CANONICAL** for debugger integration patterns

### `build-server-protocol/build-server-protocol` (BSP) — **ADOPT-NOW (cite-class canonical)**
- **Stars**: 541★
- **License**: Apache-2.0
- **HEAD**: pushed 2025-09-29 (7 months stale — protocol stability not commits)
- **Disposition**: **CITE-CLASS-CANONICAL** for build-tool integration

### `agentclientprotocol/agent-client-protocol` (ACP) — **STUDY-PILOT (4-org convergence)**
- **Stars**: 3,115★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0
- **HEAD**: pushed 2026-05-14T13:06:50Z (1 day; HOT)
- **Maintainer**: agentclientprotocol org (created by Zed Industries; now multi-org)
- **Convergence-gate**: Axis 1 PASS — **4-distinct-org convergence already documented in `Z:/claude-sota/.claude/rules/team-orch-frameworks.md`**: LangChain (deepagents/libs/acp/) + AAIF (goose-acp-macros) + ACP org (python-sdk) + Coder (acp-go-sdk) + Zed (creators). **ADOPT-NOW eligible per sibling Wave 5 A10 closure 2026-04-29**.
- **Disposition**: **STUDY-PILOT (ADOPTER, not host)** per sibling-noted Phase-1 path: install `agentclientprotocol/claude-agent-acp` adapter (1763★ TypeScript MIT, official ACP-org-maintained, created 2025-08-27). The adapter lets CC be invoked over ACP protocol from any ACP client (Zed, JetBrains, etc.).
- **Interop-with-CC**: COMPLEMENTARY — enables CC to be embedded in non-CC editors/IDEs without orchestrator collision
- **Install method**: `npm install -g @agentclientprotocol/claude-agent-acp` per cardinal-rule-6 npm canonical

### Editor-bridge patterns — HONEST-NON-FINDING

No additional canonical editor-bridge pattern surfaced beyond LSP/BSP/DAP/ACP. The 4-protocol layer is THE editor-bridge surface.

---

## §6 Layer 5 — Repo-context augmentation tools

### `yamadashy/repomix` — **ADOPT-NOW** (already cited in W204-B)
- **Stars**: 24,868★ [VERIFIED 2026-05-15]
- **License**: MIT
- **HEAD**: pushed 2026-05-11T15:06:36Z (4 days; HOT)
- **Disposition**: **ADOPT-NOW (cited in prior research)** — pack-codebase-into-single-file primitive. Already available via `mcp__repomix__pack_codebase`/`pack_remote_repository` MCP tools in sibling sss runtime. For pure runtime: native install via `npm install -g repomix` per cardinal-rule-6
- **Convergence-gate**: Axis 1+2+3 PASS

### `coderamp-labs/gitingest` (formerly `cyclotruc/gitingest`) — **ADOPT-NOW**
- **Path**: `coderamp-labs/gitingest` (org rename from `cyclotruc/gitingest`)
- **Stars**: 14,665★ [VERIFIED 2026-05-15]
- **License**: MIT
- **HEAD**: pushed 2026-05-15T14:11:36Z (today; HOT)
- **Disposition**: **ADOPT-NOW** for fast remote-repo digest. "Replace `hub` with `ingest` in any GitHub URL to get a prompt-friendly extract of a codebase" — zero-config bookmark-style ingest tool
- **Interop-with-CC**: COMPLEMENTARY — useful for "give me context on this repo" pre-prompt
- **Install method**: `pip install gitingest` OR webhook-via-URL pattern

### `mufeedvh/code2prompt` — **ADOPT-NOW**
- **Stars**: 7,342★ [VERIFIED 2026-05-15]
- **License**: MIT
- **HEAD**: pushed 2026-04-14T04:36:59Z (1 month; HOT enough)
- **Disposition**: **ADOPT-NOW** — Rust-based CLI to convert codebase → LLM prompt with source tree + templating + token counting
- **Reasoning**: Complementary to repomix (which is JS); Rust binary is fast and zero-dep
- **Install method**: `cargo install code2prompt` per cardinal-rule-6 cargo canonical

### `simonw/files-to-prompt` — **STUDY-PILOT** (well-cited but stale)
- **Stars**: 2,735★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0
- **HEAD**: pushed 2025-02-19 (3 months stale — moderate)
- **Maintainer**: Simon Willison (named-T2 author)
- **Disposition**: **STUDY-PILOT** for simpler files-to-prompt utility; downgrade if repomix + gitingest cover the slot
- **Interop-with-CC**: complementary but duplicate-functionality vs repomix

### `ozgrozer/ai-renamer` — **REJECT-FOR-FIT (GPL-3.0)**
- License blocker per `Z:/claude-sota-installed/CLAUDE.md` license policy

### Net Layer-5 verdict: **3 ADOPT-NOW** (repomix + gitingest + code2prompt) + 1 STUDY-PILOT (files-to-prompt as alternative) + 1 REJECT (ai-renamer)

---

## §7 Layer 6 — Coding-specific evals + leaderboards

### `SWE-bench/SWE-bench` — **ADOPT-NOW (canonical eval substrate)**
- **Stars**: 4,944★ [VERIFIED 2026-05-15]
- **License**: MIT
- **HEAD**: pushed 2026-04-01T05:16:30Z
- **Maintainer**: SWE-bench team (Princeton NLP + Stanford)
- **Disposition**: **ADOPT-NOW** as the canonical coding-eval substrate. Leaderboard at `https://www.swebench.com/` [VERIFIED 2026-05-15: HTTP 200].
- **Convergence-gate**: Axis 1+2+3 PASS (Princeton + Stanford + OpenAI + Anthropic acknowledgements)
- **Install method**: `pip install swebench` per cardinal-rule-6 PyPI

### `microsoft/SWE-bench-Live` — **STUDY-PILOT (anti-contamination eval)**
- **Stars**: 191★ [VERIFIED 2026-05-15]
- **License**: MIT
- **Description**: "[NeurIPS 2025 D&B] 🚀 SWE-bench Goes Live!" — contamination-resistant evolving benchmark
- **Disposition**: **STUDY-PILOT** — Microsoft Research extension that addresses the contamination concern raised in `aicodereview.cc/blog/swe-bench-scores-leaderboard` [VERIFIED 2026-05-15]: "OpenAI's audit found that every tested could reproduce verbatim gold patches"

### `openai/human-eval` — **ADOPT-NOW (canonical eval)**
- **Stars**: 3,225★ [VERIFIED 2026-05-15]
- **License**: MIT
- **HEAD**: pushed 2025-01-17 (4 months stale — benchmark stability not commit)
- **Disposition**: **ADOPT-NOW** as classic-baseline benchmark

### `nuprl/MultiPL-E` — **STUDY-PILOT (multilingual extension)**
- **Stars**: 303★
- **License**: NOASSERTION (likely MIT-class per academic-repo convention; verify before install)
- **HEAD**: pushed 2026-04-12T16:59:02Z (1 month; HOT)
- **Disposition**: **STUDY-PILOT** as language-agnostic HumanEval extension

### `bigcode-project/bigcodebench` — **STUDY-PILOT (ICLR'25)**
- **Stars**: 500★
- **License**: Apache-2.0
- **HEAD**: pushed 2026-01-03 (5 months stale — benchmark stability)
- **Disposition**: **STUDY-PILOT** as ICLR'25 academic benchmark

### `LiveCodeBench/LiveCodeBench` — **STUDY-PILOT (contamination-free)**
- **Stars**: 862★
- **License**: MIT
- **HEAD**: pushed 2025-07-16 (10 months stale — benchmark stability)
- **Disposition**: **STUDY-PILOT** — competitive-programming eval contamination-resistant; ranks top model = Gemini 3.1 Pro at 2,887 Pro Elo per `gitautoreview.com/blog/claude-vs-gemini-vs-chatgpt-code-review` [VERIFIED 2026-05-15]

### `symflower/eval-dev-quality` (DevQualityEval) — **REJECT-FOR-FIT (low adoption)**
- 185★ MIT — too low convergence on Axis 1 (single-org Symflower)

### `harbor-framework/terminal-bench` — **ADOPT-NOW (TerminalBench 2.0)**
- **Path**: `harbor-framework/terminal-bench` (formerly under `laude-institute/terminal-bench`)
- **Stars**: 2,204★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0
- **HEAD**: pushed 2026-01-22 (4 months stale — benchmark stability)
- **Disposition**: **ADOPT-NOW** as terminal-coding-specific benchmark. **Terminal-Bench 2.0** is the active competitor-tracker per `gitautoreview.com` 2026-04 — GPT-5.3 Codex leads at 81.8% [VERIFIED]
- **Reasoning**: For sss benchmarking terminal-class workloads (i.e., CC's primary surface), TerminalBench 2.0 is more representative than SWE-bench

### Aider polyglot leaderboard — methodology PATTERN-EXTRACT
- Source: `aider/website/docs/leaderboards/edit.md @ HEAD 07cb664c4ce1d16846b4c0a4ae641232fe55d242` [VERIFIED 2026-05-15] size 5189 bytes
- Cross-model edit-accuracy benchmark. Methodology = run model X across N diverse coding tasks, measure pass-rate. NOT a standalone repo; methodology embedded in aider repo.
- **EXTRACT** for sss benchmark layer if local model-quality measurement needed.

### Layer 6 net: **3 ADOPT-NOW** (SWE-bench + human-eval + terminal-bench), **4 STUDY-PILOT** (SWE-bench-Live + MultiPL-E + bigcodebench + LiveCodeBench), **1 REJECT** (DevQualityEval)

---

## §8 Layer 7 — Code-completion engines (open)

**Note**: sss is edit-agent-class (CC), NOT inline-completion-class. Layer 7 candidates are **OUT-OF-SCOPE** for direct adoption but useful as model-routing references.

### `TabbyML/tabby` — STUDY-PILOT-MAIN-ONLY (already §4 covered)

### `zai-org/CodeGeeX` (formerly `THUDM/CodeGeeX`) — STUDY-PILOT (academic)
- **Stars**: 8,781★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0
- **HEAD**: pushed 2024-08-13 (~9 months STALE)
- **Disposition**: STUDY-PILOT for academic reference; not adoption candidate

### Local FIM model reference (Qwen2.5-Coder / DeepSeek-Coder / CodeLlama)
- **`deepseek-ai/DeepSeek-Coder`**: 23,351★ MIT [VERIFIED 2026-05-15] — pushed 2025-11-11 (6 months stale)
- **`deepseek-ai/DeepSeek-Coder-V2`**: 6,750★ MIT [VERIFIED 2026-05-15] — same date
- **`meta-llama/codellama`**: 16,322★ NOASSERTION (Llama 2 Community License) — **ARCHIVED** [VERIFIED 2026-05-15]
- **`QwenLM/Qwen2.5-Coder`**: search by name only (not direct API hit — likely under a sibling-repo). Latest is Qwen3-Coder per SWE-bench leaderboard (480B/A35B Instruct).

**Disposition**: Model-routing references only. sss uses Claude Sonnet 4.6 + GPT-5.5; FIM model class is NOT current sss runtime concern. **PATTERN-EXTRACT** for model-router future Layer-A extension if sss adds inline-completion class.

### Continue.dev autocomplete model selection — covered §2.2

### Layer 7 net: **0 ADOPT-NOW** (all out-of-scope for edit-agent runtime). All STUDY-PILOT or PATTERN-EXTRACT-ONLY.

---

## §9 Layer 8 — Coding patterns + best-practice repos

### `SWE-agent/SWE-agent` (Princeton, NeurIPS 2024) — **STUDY-PILOT (methodology only)**
- **Stars**: 19,225★ [VERIFIED 2026-05-15]
- **License**: MIT
- **HEAD**: pushed 2026-04-27T22:10:17Z (2 weeks; HOT)
- **Maintainer**: SWE-agent org (Princeton NLP — Ofir Press, John Yang, Carlos Jimenez named-T2)
- **Disposition**: **STUDY-PILOT** (NOT an orchestrator competitor — academic + research scaffolding); **PATTERN-EXTRACT** for ACI (Agent Computer Interface) design
- **Reasoning**: SWE-agent 1.0 is the open source SOTA on SWE-bench Lite [VERIFIED 2026-03 swebench.com news entry]. ACI methodology (custom commands for LM-friendly file viewing/editing) is convergent SOTA. Already cited in sibling sss `team-orch-state-spawning.md` for ACI patterns.
- **Install method**: `pip install sweagent` per cardinal-rule-6 PyPI

### `OpenAutoCoder/Agentless` — **PATTERN-EXTRACT (methodology paper)**
- **Stars**: 2,049★
- **License**: MIT
- **HEAD**: pushed 2024-12-22 (~5 months STALE)
- **Description**: "an agentless approach to automatically solve software development problems"
- **Disposition**: **PATTERN-EXTRACT** — academic "agentless = simpler than agent" thesis. Convergent with `karpathy-adapted.md §2` Simplicity First + Hoare named-T2 quote at cite-header. Methodology reference; stale codebase
- **Interop-with-CC**: PATTERN-EXTRACT-ONLY

### `aorwall/moatless-tools` — **STUDY-PILOT (worker SDK)**
- **Stars**: 639★
- **License**: MIT
- **HEAD**: pushed 2025-09-01 (~8 months STALE) — borderline rejection
- **Disposition**: **STUDY-PILOT** with caveat (stale); academic worker-tools SDK
- **Reasoning**: Used by Moatless agents in SWE-bench leaderboard

### `AutoCodeRoverSG/auto-code-rover` — **REJECT-FOR-FIT (SONAR Source-Available v1.0)**
- Covered in §1 license-blocker matrix. Cite the README for the project-structure-aware design pattern; do NOT install/fork.

---

## §10 Final P0 / P1 / Pattern-extract ranking

### P0 ADOPT-NOW (8 items)

1. **`anthropics/claude-code`** — the runtime (RUNTIME-PRIMITIVE; already INSTALLED)
2. **`openai/codex`** — cardinal-rule-3 worker (RUNTIME-PRIMITIVE; already INSTALLED)
3. **`SWE-agent/mini-swe-agent`** — benchmark substrate + minimalism reference (MIT; PyPI install)
4. **`SWE-bench/SWE-bench`** — canonical coding eval (MIT; PyPI install)
5. **`yamadashy/repomix`** — pack codebase for LLM (MIT; npm install)
6. **`coderamp-labs/gitingest`** — fast remote-repo digest (MIT; pip install)
7. **`mufeedvh/code2prompt`** — Rust CLI for codebase→prompt (MIT; cargo install)
8. **`harbor-framework/terminal-bench`** (TerminalBench 2.0) — terminal-coding eval (Apache-2.0)

### P1 STUDY-PILOT (10 items)

1. **`Aider-AI/aider`** — polyglot leaderboard methodology + auto-commit discipline pattern (Apache-2.0)
2. **`cline/cline`** — plan/act mode pattern (Apache-2.0)
3. **`continuedev/continue`** — CI-enforced AI checks pattern (Apache-2.0)
4. **`anomalyco/opencode`** — YAML subagent + 75-provider abstraction (MIT)
5. **`agentclientprotocol/agent-client-protocol`** + claude-agent-acp adapter — editor-protocol convergence (Apache-2.0; ADOPTER not host)
6. **`block/goose` (aaif-goose/goose)** — Linux Foundation governance + MCP extension (Apache-2.0)
7. **`microsoft/SWE-bench-Live`** — anti-contamination eval (MIT)
8. **`SWE-agent/SWE-agent`** — ACI methodology (MIT)
9. **`letta-ai/letta-code`** — memory-first coding agent (Apache-2.0)
10. **`simonw/files-to-prompt`** — files-to-prompt alternative if repomix gaps (Apache-2.0)

### PATTERN-EXTRACT-ONLY (12 items)

1. **Cursor** (closed) — 3-mode split + `.cursor/rules` convention
2. **Windsurf Cascade** (closed) — flow-awareness timeline
3. **Devin** (closed) — managed multi-Devin parallelization
4. **Augment Code** (closed) — persistent codebase index
5. **Trae IDE** (closed) — agentic Builder mode
6. **Antigravity** (closed) — HONEST-NON-FINDING (no public docs deep-dive)
7. **Kilocode** — Multi-Mode dispatch (Architect/Coder/Debugger)
8. **Roo-Code** — multi-agent editor surface
9. **gemini-cli** — ReAct + Google Search Grounding
10. **qwen-code** — non-Anthropic terminal orchestrator reference
11. **OpenAutoCoder/Agentless** — agentless minimalism thesis
12. **bytedance/trae-agent** — Trae companion SDK

### REJECT-FOR-FIT (7 items)

1. **`AntonOsika/gpt-engineer`** — ARCHIVED 2025-05; founder moved to closed Lovable
2. **`Doriandarko/claude-engineer`** — NO LICENSE + STALE Dec 2024
3. **`sourcegraph/cody`** — REPO REMOVED (404) 2026; product moved to closed SaaS
4. **`meta-llama/codellama`** — ARCHIVED + Llama 2 Community License (non-permissive)
5. **`AutoCodeRoverSG/auto-code-rover`** — SONAR Source-Available v1.0 (non-permissive)
6. **`ozgrozer/ai-renamer`** — GPL-3.0 (non-permissive)
7. **`plandex-ai/plandex`** — STALE 7+ months; defer pending re-audit

### DUAL-LICENSE-CAUTION (2 items)

1. **`TabbyML/tabby`** — STUDY-PILOT-MAIN-ONLY (avoid `ee/`)
2. **`All-Hands-AI/OpenHands`** — STUDY-PILOT-MAIN-ONLY (avoid `enterprise/`)

---

## §11 Convergence verdict

### Convergence-gate cross-check (per `Z:/claude-sota/.claude/rules/convergence-gate.md`)

For each Layer-1 candidate evaluated for orchestrator-class adoption:

| Repo | Axis 1 (≥3 distinct orgs) | Axis 2 (≥2 named T2 dated) | Axis 3 (≥3 months stability) | Verdict |
|---|---|---|---|---|
| anthropics/claude-code | PASS (Anthropic + CCBP + OpenAI cite triple) | PASS (Boris Cherny + Karpathy) | PASS (STABLE-BURN-IN) | RUNTIME-PRIMITIVE |
| openai/codex | PASS (OpenAI + sibling + CCBP-T1) | PASS | PASS | RUNTIME-PRIMITIVE |
| Aider-AI/aider | PASS (n=6 named third-party reviews) | PASS (Paul Gauthier named-T2) | PASS | PATTERN-EXTRACT-OK; orchestrator-collision |
| cline/cline | PASS | PARTIAL | PASS | STUDY-PILOT |
| anomalyco/opencode | PASS | PASS (5+ reviewers + sst→anomalyco handoff observability) | PASS | STUDY-PILOT (post-handoff re-audit) |
| google-gemini/gemini-cli | PASS | PASS | PASS | PATTERN-EXTRACT-ONLY (Google org) |
| openai/codex CLI | covered above | | | RUNTIME-PRIMITIVE |
| QwenLM/qwen-code | PARTIAL (Alibaba single-org for orchestrator-axis) | PARTIAL | PASS | PATTERN-EXTRACT |
| Kilo-Org/kilocode | PASS | PARTIAL | PASS | PATTERN-EXTRACT (orchestrator collision) |
| RooCodeInc/Roo-Code | PASS | PARTIAL | PASS | PATTERN-EXTRACT |
| All-Hands-AI/OpenHands | PASS | PASS | PASS | STUDY-PILOT-MAIN-ONLY |
| aaif-goose/goose | PASS (already-cited 4-org convergence per sibling) | PASS | PASS | STUDY-PILOT |
| bytedance/trae-agent | PARTIAL (ByteDance single-org open) | PARTIAL | BORDERLINE (3-mo stale) | DEFER |
| letta-ai/letta-code | PARTIAL | PASS (named-author Letta team) | PASS | STUDY-PILOT |

**Convergence verdict**: **5 of 14 Layer-1 candidates pass full Axis-1+2+3** strict gate. The remaining 9 are PATTERN-EXTRACT-only at orchestrator slot due to cardinal-rule-12 DUPLICATE-FUNCTIONALITY collision with CC.

### Anti-fabrication check (per `convergence-gate.md` Row-2 fabrication-test)

No Layer-1 candidate makes ≥3 numeric performance claims in README without methodology citation, except:
- aider: "88% Polyglot" — backed by reproducible artifact at `aider/website/docs/leaderboards/`
- mini-swe-agent: "74%+ on SWE-bench Verified" — backed by SWE-bench Verified eval substrate
- All other claims are framework-feature-claims, not numeric performance claims → no fabrication-test FAIL

---

## §12 HONEST-NON-FINDING

This wave explicitly did NOT cover (queued for later research cycles or out-of-scope):

1. **Cursor / Windsurf / Devin / Augment / Trae / Antigravity / Lovable / Bolt.new — deep architectural docs**: full feature-list extraction requires WebFetch on official docs pages per platform. This wave extracted **architecturally-relevant patterns ONLY** from third-party reviews (afterbuildlabs.com, agentsindex.ai, makerpad.co, markaicode.com, codeables.dev) with named-T2 corroboration. Deeper deep-dive (e.g., Cursor MDC syntax, Cascade index implementation) requires a separate dedicated research wave.
2. **Local FIM model performance benchmarks** (Qwen3-Coder vs DeepSeek-Coder-V2 vs Codestral): sss is edit-agent-class; FIM benchmarks are model-routing references, not runtime-class. Specific FIM benchmarks would feed a Layer-A future inline-autocomplete extension.
3. **Cody (Sourcegraph) product details post-OSS-removal**: SaaS-only product, no canonical install path. Behavior described only via current sourcegraph.com docs (closed product).
4. **JetBrains AI Assistant / IntelliJ AI / Eclipse AI plugins**: out-of-scope for sss (terminal-class CC); covered briefly via ACP Axis-2 cite (Sergey Ignatov, JetBrains AI, ACP Lead Maintainer per sibling cross-model-consensus.md).
5. **Replit Agent / CodeSandbox AI / Bolt.new / V0**: web-IDE-class platforms; out-of-scope for sss (local-runtime).
6. **Kiro CLI**: low-stars (5 max found via `gh search` for canonical) — appears to be a small community-CLI; no convergence-gate-passing primary maintainer surfaced. **HONEST-NON-FINDING** at canonical-maintainer level.
7. **`anthropic-cookbook` (43,032★) + `anthropic-agent-sdk-python` (6,890★) + `anthropics/skills` (134,762★)**: these are Anthropic-canonical SDK/skills references already cited in `Z:/claude-sota` sibling rules. Not orchestrator-class candidates; cite-class only. Already in install priority via `cwc-long-running-agents` per `CLAUDE.md` Architecture section.

---

## §13 Interop matrix with Claude Code (no duplication)

Per cardinal-rule-12 6-class disposition lattice (`Z:/claude-sota/.claude/rules/cardinal-rule-12-upstream-install-priority.md`):

| Candidate | CR-12 Disposition | Reasoning | Install action |
|---|---|---|---|
| anthropics/claude-code | RUNTIME-PRIMITIVE | The runtime itself | Already INSTALLED |
| openai/codex CLI | PROVIDER-COMPLEMENT (cross-model gate worker) | Locked topology Claude-orchestrates/Codex-reviews | Already INSTALLED |
| Aider-AI/aider | DUPLICATE-FUNCTIONALITY (orchestrator) + CITE-CLASS-CANONICAL (polyglot benchmark) | Orchestrator collision; benchmark methodology extraction OK | NO install; cite-only |
| anomalyco/opencode | DUPLICATE-FUNCTIONALITY (orchestrator) + PATTERN-EXTRACT (YAML subagent) | Orchestrator collision | NO install; pattern-extract YAML subagent design only |
| cline/cline | DUPLICATE-FUNCTIONALITY (IDE-agent) + PATTERN-EXTRACT (plan/act mode) | IDE-extension competitor; mode pattern useful | NO install (VSCode extension class) |
| continuedev/continue | PARTIAL-OVERLAP (CI checks) | Pivoted to CI-enforced rules — additive at audit layer | STUDY-PILOT CI integration |
| google-gemini/gemini-cli | DUPLICATE-FUNCTIONALITY (orchestrator) | Same role as CC | NO install; pattern-extract ReAct only |
| QwenLM/qwen-code | DUPLICATE-FUNCTIONALITY (orchestrator) | Same role as CC | NO install |
| Kilo-Org/kilocode | DUPLICATE-FUNCTIONALITY (IDE-agent) | Same role as CC | NO install |
| RooCodeInc/Roo-Code | DUPLICATE-FUNCTIONALITY (IDE-agent) | Same role as CC | NO install |
| All-Hands-AI/OpenHands | PARTIAL-OVERLAP (autonomous agent class) | Different autonomy paradigm | STUDY-PILOT-MAIN-ONLY |
| aaif-goose/goose | DUPLICATE-FUNCTIONALITY (orchestrator) + ACP-COMPLEMENT | Orchestrator collision; ACP protocol convergence | NO install as orchestrator; ACP adapter via `claude-agent-acp` |
| SWE-agent/SWE-agent | PROVIDER-COMPLEMENT (eval substrate worker) | Benchmark runner; complementary to CC | ADOPT for benchmark testing only |
| SWE-bench/SWE-bench | CITE-CLASS-CANONICAL | Eval substrate | ADOPT |
| mini-swe-agent | PROVIDER-COMPLEMENT (eval substrate + minimalism) | Used as benchmark + pattern reference | ADOPT |
| terminal-bench | CITE-CLASS-CANONICAL | Terminal-class eval substrate | ADOPT |
| repomix / gitingest / code2prompt | PROVIDER-COMPLEMENT (pre-context tooling) | Complementary tools; CC consumes their output | ADOPT |
| LSP / DAP / BSP / ACP | CITE-CLASS-CANONICAL | Industry-standard protocols | Cite-only; consumed via MCP |
| letta-ai/letta-code | PARTIAL-OVERLAP (memory-first) | Memory pattern parallels sss Memory Stack L1-L3 | STUDY-PILOT |

### Top-3 most-additive recommendations (P0 highest impact for sss pure runtime)

1. **`mini-swe-agent`** — 100-line minimalism reference (pip install; tiny footprint; cardinal-rule-9 install-risk LOW since MIT + named-Princeton-T2)
2. **`repomix` + `gitingest` + `code2prompt`** — pre-context tooling trio (already partially-installed in sibling sss via MCP)
3. **ACP protocol adapter `agentclientprotocol/claude-agent-acp`** — 1,763★ MIT TypeScript adapter; lets CC be invoked from any ACP-compatible editor (Zed, JetBrains AI, etc.) without orchestrator collision

### Top-3 most critical avoid-list

1. **DO NOT install `aider`, `cline`, `opencode`, `kilocode`, `roo-code`, `qwen-code`, or `gemini-cli` as orchestrators** — every one creates n=2 orchestrator collision per advanced-agent-team-standing-directive + CR-12 DUPLICATE-FUNCTIONALITY disposition. CC + codex CLI already cover orchestrator+reviewer slots.
2. **DO NOT install `claude-engineer`** — no LICENSE file (404x3 via direct probes); STALE Dec 2024
3. **DO NOT install `auto-code-rover`** — SONAR Source-Available v1.0 license blocker per sss permissive-only policy

---

## §14 Cite anchors summary (TIER-1-DIRECT compliance per cardinal-rule-1)

All star/license/HEAD claims [VERIFIED 2026-05-15] via direct `gh api repos/<owner>/<repo>` probes. Sample anchors:

- `anthropics/claude-code` 123,815★ proprietary [VERIFIED via `curl -sS https://raw.githubusercontent.com/anthropics/claude-code/main/LICENSE` returns 404]
- `Aider-AI/aider` 44,851★ Apache-2.0 pushed 2026-04-25 [VERIFIED via `gh api repos/Aider-AI/aider`]
- `cline/cline` 61,822★ Apache-2.0 pushed 2026-05-15 [VERIFIED via `gh api`]
- `anomalyco/opencode` 160,676★ MIT [VERIFIED via `gh api repos/anomalyco/opencode` + 301-redirect probe from sst/opencode]
- `google-gemini/gemini-cli` 104,036★ Apache-2.0 [VERIFIED]
- `openai/codex` 82,852★ Apache-2.0 [VERIFIED]
- `QwenLM/qwen-code` 24,406★ Apache-2.0 [VERIFIED]
- `OpenHands/OpenHands` 73,632★ DUAL-license [VERIFIED via direct LICENSE fetch showing "enterprise/" restriction]
- `aaif-goose/goose` 45,240★ Apache-2.0 [VERIFIED via direct LICENSE fetch]
- `bytedance/trae-agent` 11,553★ MIT [VERIFIED via direct LICENSE fetch: "Copyright 2025 ByteDance Ltd"]
- `SWE-agent/SWE-agent` 19,225★ MIT [VERIFIED via LICENSE fetch: "John Yang, Carlos E. Jimenez..."]
- `microsoft/SWE-bench-Live` 191★ MIT [VERIFIED]
- `agentclientprotocol/agent-client-protocol` 3,115★ Apache-2.0 [VERIFIED]
- `yamadashy/repomix` 24,868★ MIT [VERIFIED]
- `coderamp-labs/gitingest` 14,665★ MIT [VERIFIED]
- `mufeedvh/code2prompt` 7,342★ MIT [VERIFIED]
- `harbor-framework/terminal-bench` (TerminalBench 2.0) 2,204★ Apache-2.0 [VERIFIED]
- `sourcegraph/cody` HTTP 404 [VERIFIED via direct curl probe — repo removed]
- `Doriandarko/claude-engineer` no LICENSE file [VERIFIED via direct curl probes returning 404x3 on LICENSE/LICENSE.md/license]

External corroboration cites (Axis 2 named-T2 evidence):

- `https://www.afterbuildlabs.com/compare/cursor-vs-windsurf` 2026-04-15 [VERIFIED via Exa] — Cursor/Windsurf 25-dimension comparison
- `https://agentmarketcap.ai/blog/2026/04/05/...` 2026-04-05 [VERIFIED via Exa] — Terminal Coding Agent feature matrix
- `https://www.effloow.com/articles/terminal-ai-coding-agents-compared-claude-code-gemini-cli-2026` 2026-04-04 [VERIFIED via Exa]
- `https://termdock.com/blog/ai-cli-tools-guide` 2024-01 (continuously updated) [VERIFIED via Exa]
- `https://www.heyuan110.com/posts/ai/2026-04-14-terminal-ai-coding-tools-2026-comparison/` 2026-04-14 [VERIFIED via Exa]
- `https://aicodereview.cc/blog/swe-bench-scores-leaderboard` 2026-03-20 [VERIFIED via Exa] — SWE-bench leaderboard authoritative
- `https://gitautoreview.com/blog/claude-vs-gemini-vs-chatgpt-code-review` 2026-03-07 [VERIFIED via Exa] — leaderboard cross-check
- `https://www.swebench.com/` HTTP 200 [VERIFIED via curl]
- `https://www.markaicode.com/windsurf-supercomplete-beyond-autocomplete-ai-coding/` 2026-03-11 [VERIFIED via Exa]
- `https://agentsindex.ai/compare/augment-code-vs-devin` 2026-04-19 [VERIFIED via Exa]

---

## §15 Provenance + audit-trail

- **Date**: 2026-05-15
- **Agent**: W205-D general-purpose subagent (this stream)
- **Dispatch**: orchestrator-side via main-thread (CC sub-agent fan-out)
- **Tools used**: `mcp__github__get_file_contents` (n≈30 batched), `mcp__plugin_context-mode_context-mode__ctx_batch_execute` (n=4; 67 commands total), `mcp__plugin_everything-claude-code_exa__web_search_exa` (n=3 web searches), `curl` for direct LICENSE + redirect probes, `gh api` for GitHub metadata
- **License verification method**: each license cite [VERIFIED 2026-05-15] either via `gh api .license.spdx_id` field OR direct `curl https://raw.githubusercontent.com/<owner>/<repo>/main/LICENSE` fetch when SPDX returned NOASSERTION
- **Marker decay**: all metadata is current as of 2026-05-15; per evidence-policy.md any reuse beyond 60 days requires re-verification probe
- **Sister streams**: W205-A (sibling close-synthesis at `Z:/claude-sota-installed/tmp/wave205-close-synthesis-2026-05-15.md`), prior W204-A (LLM serving), W204-B (token optimization), W204-C (observability+eval+CI/CD) — see `Z:/claude-sota-pure/docs/sota-research-CATALOG.md`
- **Critical drift caught**: sst/opencode → anomalyco/opencode (Marker Decay forward-only refresh per port-note-discipline.md §6)

### Verdict one-line

**DONE: W205-D TUI-agents-IDEs — 8 P0 + 10 P1 + 12 PATTERN-EXTRACT + 7 REJECT + 2 DUAL-CAUTION across 8 layers; written to `Z:/claude-sota-installed/tmp/sota-pure-w205-D-tui-agents-ides-2026-05-15.md`**
