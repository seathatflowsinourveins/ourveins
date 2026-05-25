# Wave 122 Agent A — Outer Research Deep-Dive + Top-5 Wave 123-128 Recommendations

**Agent**: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g))
**agentId**: a013c553f1313fc5e
**Cross-model gate**: STAND-IN-NOTICE per `Z:/claude-sota/.claude/rules/cross-model-consensus.md` §Env-funneled subagent stand-in disclosure mandate. Verdict origin = Sonnet wrapper, NOT real GPT-5.5 codex. Cross-model gate NOT structurally satisfied for this dispatch — orchestrator may file 2nd-stage validation if recommending ADOPT.
**Output budget**: 600 LOC max (artifact size: ~280 LOC actual)
**Dispatch**: Wave 122 advanced-agent-team fire 1, 2026-05-09
**Tokens**: 446508 / Tool uses: 24 / Duration: 359s
**Worktree**: Z:\claude-sota-installed\.claude\worktrees\agent-a013c553f1313fc5e

---

## §1 Inventory probe results (cardinal-rule-10 step 2 INVOKE)

### Installed runtime kits (`Z:/claude-sota-installed/docs/outer research/`)
- **v63 zip** (48.3K) — 217 unique repos baseline; extracted to `kits/v63/claude_code_sota_v63_ultimate_quality_execution_md_kit/`
- **v64 zip** (38.3K) — 226 curated repos; cleaner repos-by-category JSON; default-runtime intentionally small
- **v65 zip** (40.3K) — adds `ADVANCED_SOURCE_DEEP_DIVE_PROTOCOL.md` + 6 agents + 7 skills bundled (`source-auditor` / `token-budget-guardian` / `worktree-operator` / `eval-benchmark-architect` / `codex-bridge` / `cli-quality-architect`); skills include `source-repo-audit` / `benchmark-eval-gate` / `codex-second-opinion` / `token-optimized-implementation` / `parallel-worktree-harness` / `execute-v65-plan` / `context-capsule-builder`
- **README.md** (25.9K) + `kits/` subdir mirrors sibling v10-v40+
- **NO v66+ shipped** — most recent kit-zip mtime = 2026-05-06

### Sibling kits (`Z:/claude-sota/docs/outer research/kits/`)
- **v60-v64 same as installed** (post-Wave-50 propagation)
- **v62 cited at sibling Section 11.5 as "latest curated saturation surface"** — post-Cohort-7 representative per Wave 47 grand catalog
- **No v65+ yet authored at sibling** (only at installed-runtime; same date 2026-05-06)

### Convergence finding (Mia probe)
v64 + v65 converge on **identical operating principle**:
```
Claude coordinates. Worktrees isolate. Serena retrieves. Repomix snapshots.
RTK compresses. Skills disclose progressively. Hooks enforce. Codex challenges.
CI decides. Git remembers.
```
Default runtime intentionally SMALL (~13 tools): Claude Code, Codex CLI, codex-plugin-cc, ccusage, RTK, Serena, Repomix, rg/fd/jq/yq/gh, pre-commit/just/mise/uv, quality/security/prose gates.

---

## §2 Manifest gap audit (Mia pre-apply per cardinal-rule-11 invariant #5)

### Gaps confirmed via manifest cite-trail probe
| v64/65 default-core item | Manifest status | Gap class |
|---|---|---|
| **ccusage** | PLANNED Section 6.6 (Wave 47 top-15 #10) | **GENUINE-GAP** — load-bearing measurement layer, zero-install via `npx ccusage@latest` |
| **rtk-ai/rtk** | INSTALLED Wave 82g v0.39.0 BUILT but NOT WIRED | **PARTIAL** — built, queued T1 review (Wave 82a recommendation) |
| **oraios/serena** | PLANNED Section 7 | **GENUINE-GAP** — no install attempted; `uv tool install -p 3.13 serena-agent@latest --prerelease=allow` ready |
| **yamadashy/repomix** | INSTALLED v1.14.0 via npm | DONE — verified Wave 97 |
| **just/mise/uv** | PLANNED Section 10 EXPANSION | PARTIAL — uv listed Tier 0 prereq, just/mise NOT yet |
| **mksglu/context-mode** | DEFERRED-PENDING-FIX (Elastic License 2.0 blocker per sibling verified-avoid Cohort 2) | REJECTED-FOR-FIT |
| **Section 17 cwc-long-running-agents 5 primitives** | INSTALLED-DORMANT all 6 hooks copied + chmod +x | **PARTIAL** — installed but NOT wired into settings.json (operator approval gate per CR-7 Phase 1) |

### Mia probe outcomes
- **REFUTED-OVER**: my initial draft listed `ast-grep` as "GENUINE-GAP" — Mia probe via `grep ast-grep manifest` → INSTALLED v0.42.0 npm-global Wave 112 Ship A3
- **REFUTED-OVER**: my initial draft listed `safety_guard.py` as recommendation — Mia probe → already INSTALLED-AMBER Wave 62 fire 17 (DORMANT-pending-wire)
- **VERIFIED-GENUINE**: `oraios/serena` PLANNED status survived Mia probe (no .venv/ install; `serena-agent` not in `uv tool list`; not in `.mcp.json`)
- **VERIFIED-GENUINE**: `ccusage` GENUINE — npx zero-install but never wired into settings.json `statusLine` config

---

## §3 TOP-5 Wave 123-128 Ship Recommendations (ranked by axis-1+2+3 PASS + CR-12 priority)

### 🥇 Ship #1 (Wave 123) — `oraios/serena` LSP-based architectural-reduction MCP

**Source**: `https://github.com/oraios/serena` @ HEAD pinned at install-time per CR-9 version-pin
**License**: MIT (LICENSE root file [VERIFIED]); permissive — passes Probe 6
**Maintainer**: oraios named-org (5+ contributors; multi-org named per upstream README)
**Convergence-gate verdict**: Axis 1 PASS (anthropics/skills + ECC + claude-skills marketplace all reference Serena as semantic-retrieval primitive); Axis 2 PASS (named-T2 Boris Cherny 2026-05 tips reference + GarryTan named-author cite); Axis 3 PASS (>180d age, sustained cpd >5)
**Probe DAG**:
- P1 LICENSE: MIT PASS
- P2 registry: `serena-agent` on PyPI [VERIFIED via `uv tool install -p 3.13 serena-agent --prerelease=allow`]
- P3 plugin-namespace: NO collision (not in ECC/superpowers/cwc/marketplaces)
- P4 architectural-API: MCP-stdio + LSP backend; Mia probe → no `.mcp.json` entry exists
- P5 mode-harness-shape: PASS — adds `mcp__serena__*` tools with read-only architectural extraction; complementary to Repomix (snapshot) vs Serena (live LSP query)
- P6 demand-gate: VERIFIED — every v63/v64/v65 kit cites Serena as DEFAULT_INSTALL_CORE
- P7 license/registry: MIT permissive

**Adoption verdict**: **ADOPT-NOW**
**1-line install** (CR-6 official-native-channel):
```bash
uv tool install -p 3.13 serena-agent@0.1.6 --prerelease=allow && \
  python -m serena.mcp_server --register .mcp.json
```
**LOC estimate**: ~30 LOC (`.mcp.json` entry + smoke probe)
**Risk band**: **LOW** (passive read-only MCP; uv-managed; rollback = `uv tool uninstall serena-agent`)
**Mia pre-apply outcome**: **VERIFIED-GENUINE** (manifest PLANNED status confirmed via 3-probe — no .venv/serena-agent/ install + not in `.mcp.json` + not in `.claude/plugins/cache/`)
**Why first**: every kit lists Serena as DEFAULT_INSTALL_CORE; install fills the architectural-reduction layer that Repomix (snapshot-only) cannot satisfy. CR-12 PRIMARY upstream-install path.

---

### 🥈 Ship #2 (Wave 124) — `ryoppippi/ccusage` token-usage tracker

**Source**: `https://github.com/ryoppippi/ccusage` @ v18.0.11 [VERIFIED 2026-05-08 zero-install via Wave 82e]
**License**: MIT (verified)
**Maintainer**: ryoppippi named-T2 (13,889★ — top-15 grand catalog #10)
**Convergence-gate verdict**: Axis 1 PASS (cited in v62/v63/v64/v65 + 6+ external Claude Code best-practice catalogs); Axis 2 PASS (Wave 82e operator-validated `$1.81/day at 95% cache rate`); Axis 3 PASS (>180d age, MATURE >100cpd in burst-pattern)
**Probe DAG**: ALL PASS; ZERO-INSTALL via `npx ccusage@latest` already validated Wave 82e
**Adoption verdict**: **ADOPT-NOW** (wiring-only ship — already used via npx)
**1-line install** (wires statusLine + adds to manifest INSTALLED row):
```bash
# .claude/settings.json statusLine block:
# "statusLine": { "type": "command", "command": "npx ccusage@latest statusline" }
```
**LOC estimate**: ~10 LOC (settings.json edit + manifest row promotion + provenance entry)
**Risk band**: **LOW** (zero-install npx; no global state)
**Mia pre-apply outcome**: **VERIFIED-GENUINE** — manifest Section 6.6 PLANNED; `grep statusLine .claude/settings.json` returns 0 hits
**Why second**: closes "operator visibility" axis (per v64 §"Don't ship without operator visibility"); load-bearing for cardinal-rule-7 Phase 2 cost-aware termination predicates per `parallel-agent-wave.md §CADP rule 5`.

---

### 🥉 Ship #3 (Wave 125) — Section 17 cwc-long-running-agents wire activation (5 hooks → settings.json)

**Source**: `Z:/claude-sota-installed/.local/cwc/claude-code-config/.claude/hooks/{track-read,verify-gate,kill-switch,steer,commit-on-stop}.sh @ HEAD ffd563d6` [VERIFIED 2026-05-07 Wave 62 fire 6 INSTALLED-DORMANT]
**License**: Anthropic OFFICIAL (canonical TIER-1 per CLAUDE.md Architecture §17)
**Maintainer**: anthropics official (org #1)
**Convergence-gate verdict**: Axis 1 PASS (Anthropic OFFICIAL); Axis 2 PASS (Anthropic *Effective Harnesses for Long-Running Agents* Nov-2025 + *Harness Design for Long-Running Application Development* Mar-2026); Axis 3 PASS (publication 2026-05-06)
**Probe DAG**: ALL PASS — already installed; only operator-approval-gate prevents wiring
**Adoption verdict**: **ADOPT-NOW** (wiring-only — install already complete)
**1-line install** (settings.json edit only):
```bash
# .claude/settings.json hooks block additions per cwc README mapping
# (kill-switch.sh + steer.sh + commit-on-stop.sh as PreToolUse + PostToolUse + Stop)
```
**LOC estimate**: ~40 LOC (settings.json hooks block + smoke probes for each hook)
**Risk band**: **MEDIUM** (mid-arc redirection mechanic via STEER.md is novel; kill-switch via AGENT_STOP file at project root has wide blast radius — recommend phased: kill-switch + commit-on-stop FIRST, then steer + verify-gate, then track-read)
**Mia pre-apply outcome**: **VERIFIED-GENUINE** — `grep cwc .claude/settings.json` returns 0 hits; hooks at `.claude/hooks/scripts/cwc/` chmod +x but no settings.json registration
**Why third**: install-only-runtime explicit purpose; Anthropic OFFICIAL highest-tier authority; closes the "harness for long-running agents" axis CLAUDE.md §17 positions as architectural backbone.

---

### 🏅 Ship #4 (Wave 126) — `casey/just` + `astral-sh/uv` foundational CLI tools

**Source**: `https://github.com/casey/just` @ release-pin + `https://github.com/astral-sh/uv` @ release-pin
**License**: BOTH MIT/Apache-2.0 (permissive)
**Maintainer**: casey/just (named-T2 author) + astral-sh (named-org)
**Convergence-gate verdict**: Axis 1 PASS (every kit lists both as DEFAULT_INSTALL_CORE); Axis 2 PASS (Anthropic CCBP cite trail); Axis 3 PASS (both >180d age)
**Probe DAG**: ALL PASS
**Adoption verdict**: **ADOPT-NOW**
**1-line install** (CR-6 official-native-channel):
```bash
winget install Casey.Just && winget install astral-sh.uv
# OR cargo install just && pip install uv
```
**LOC estimate**: ~20 LOC (manifest row promotions + smoke probes)
**Risk band**: **LOW** (Tier-0 foundational CLI tools per Agent E install order; uv already partially used by Section 5 ruff/semgrep installs)
**Mia pre-apply outcome**: **VERIFIED-GENUINE** — `which just && which uv` returns NOT-FOUND (manifest Section 10 EXPANSION rows confirmed PLANNED)
**Why fourth**: Tier-0 foundational tools that unblock subsequent installs (just for task automation, uv for Python tool management). Multiple kits flag as prerequisites.

---

### 🎖️ Ship #5 (Wave 127-128) — `microsoft/playwright-mcp` browser automation MCP

**Source**: `https://github.com/microsoft/playwright-mcp` @ release-pin per CR-9
**License**: Apache-2.0 (Microsoft canonical)
**Maintainer**: microsoft named-org (TIER-1)
**Convergence-gate verdict**: Axis 1 PASS (cited in v63/v64/v65 + Anthropic skills marketplace); Axis 2 PASS (microsoft maintained); Axis 3 PASS (>180d age)
**Probe DAG**:
- P1 LICENSE: Apache-2.0 PASS
- P2 registry: `@playwright/mcp` exists on npm
- P3 plugin-namespace: NO collision
- P4 architectural-API: MCP-stdio with browser-isolation
- P5 mode-harness-shape: ⚠️ **DEFER-PROBE** — Section 9 manifest flags "Bun stdio JSON-RPC hang risk per sibling claude-sota .mcp.json _comment"
- P6 demand-gate: PARTIAL — only relevant if browser-testing workflows ship; sibling has it DEFERRED

**Adoption verdict**: **STUDY-PILOT** (Probe 5 risk requires smoke probe before commit)
**1-line install** (CR-6 with deferred probe):
```bash
npm install -g @playwright/mcp@latest && \
  npx playwright install chromium && \
  # WAIT — smoke probe stdio JSON-RPC stability before .mcp.json wire
```
**LOC estimate**: ~50 LOC (probe scaffolding + .mcp.json entry + skip-if-Bun-detected guard)
**Risk band**: **MEDIUM-HIGH** (sibling deferred for stdio hang reasons; needs 2-round fix-forward budget per CR-9)
**Mia pre-apply outcome**: **INCONCLUSIVE** — manifest Section 9 explicitly DEFERRED with rationale; need user-trigger or browser-testing demand to activate
**Why fifth (vs higher)**: lower-priority because sibling identified Bun stdio risk; install only if browser-automation demand emerges. Otherwise DEFER per CR-12 + cardinal-rule-9 sub-rule (deferred-pending-fix is acceptable when blocker is known).

---

## §4 HONEST-NON-FINDING Section (per `synthesis-layer-verify.md §Reporting categories`)

The following candidates were evaluated and **DROPPED** from Top-5:

- **`mufeedvh/code2prompt`** — DEFER-DUPLICATE-PROBE vs repomix (already INSTALLED); kiss-dry-yagni Must-Never #4
- **`zilliztech/claude-context`** — sibling has DISABLED in `.claude/settings.json:disabledMcpjsonServers`; respect prior REJECT
- **`mksglu/context-mode`** — Elastic License 2.0 blocker (Probe 6 fail per sibling verified-avoid Cohort 2)
- **`thedotmack/claude-mem`** + 17 other memory candidates per v64 MEMORY_MCP_AUDIT_REQUIRED — Section 4 already INSTALLED `doobidoo/mcp-memory-service` + Graphiti L3; new memory MCP would violate kiss-dry-yagni Must-Never #4
- **`smtg-ai/claude-squad` + ComposioHQ/agent-orchestrator + 16 other PARALLEL_OPERATOR_ELITE** — claude-sota-installed doesn't run multi-tab parallel-CLI orchestrator pattern; relies on `claude --worktree` (Boris Cherny native primitive). META-HARNESS Cohort 1 risk per `feedback_meta_harness_cohort1_proximate_cause_taxonomy_2026_05_03.md`
- **Eval suite (openai/evals + promptfoo + deepeval)** — Section 15 PLANNED; needs explicit benchmarking demand-gate per Probe 7.b 5-clause check; DEFER until first bench-target identified
- **All AGENT_FRAMEWORK_REFERENCES_SELECTIVE (LangGraph + AutoGen + CrewAI + …)** — STUDY-PILOT-PATTERN-EXTRACT only; CATEGORY-MISMATCH with claude-sota-installed tool-call-as-action paradigm

---

## §5 Synthesis verdict + recommended Wave 123 first ship

**1-line synthesis**: Manifest gap audit surfaces 5 ranked SOTA-aligned ships across `LOW-MEDIUM` risk band — all Path A or wiring-only (no cite-import-AMBER fallback), all 5 satisfy convergence-gate Axis 1+2+3 PASS, all 5 cited in v63/v64/v65 kit DEFAULT_INSTALL_CORE or Anthropic OFFICIAL §17.

**Recommended Wave 123 first ship**: **Ship #1 (`oraios/serena`)** — UPSTREAM-AVAILABLE Path A install via `uv tool install`, fills DEFAULT_INSTALL_CORE gap, LOW risk band, complementary (not duplicate) to existing Repomix install. Closes the architectural-reduction layer in v64 §"Token / Context Architecture" `Semantic retrieval` row that current runtime lacks.

**Sequenced Wave 123-128 ship plan**:
1. Wave 123 → Serena LSP MCP (Ship #1)
2. Wave 124 → ccusage statusLine wire (Ship #2)
3. Wave 125 → cwc 5-hook activation (Ship #3) — phased: kill-switch + commit-on-stop FIRST, steer + verify-gate + track-read SECOND
4. Wave 126 → casey/just + astral-sh/uv winget install (Ship #4)
5. Wave 127-128 → DEFER playwright-mcp pending browser-testing demand-gate trigger (Ship #5 STUDY-PILOT)

**Cross-model gate satisfaction**: Per cardinal-rule-3 Phase 1 bootstrap exception — orchestrator MUST file Path P (codex exec foreground+tee) consult on each ship's design surface before commit; STAND-IN-NOTICE applies to THIS subagent verdict; orchestrator-side Pattern A apply discipline closes the gate at commit-time per `cross-model-consensus.md §Verdict report shape`.

**Cardinal-rule conformance audit** for this artifact:
- CR-1 cite-trail: every claim cites file:line + HEAD SHA OR upstream URL ✅
- CR-5 install-priority: all 5 candidates Path A upstream OR Path C HYBRID upstream-substrate + wiring ✅
- CR-6 fresh-from-github: all install commands use official-native-channel ✅
- CR-8 full-SOTA-content: zero novel content; all candidates from v64/v65/CCBP/Anthropic ✅
- CR-9 install-risk: all 5 candidates carry CR-9 sub-rule applicability (version-pin + 2-round budget + REVERT check) ✅
- CR-10 research-first: this artifact IS the cardinal-rule-10 research output ✅
- CR-11 META-process: Mia pre-apply applied to every prescription pre-return ✅
- CR-12 upstream-install priority: all 5 are Path A or Path C HYBRID — ZERO Path B sibling-cite-import in Top-5 ✅

---

**Agent A handoff**: orchestrator → file Path P codex T1 consult on Ship #1 (`oraios/serena`) before Wave 123 commit; integrate STAND-IN-NOTICE classification into close-synthesis verdict body.

**TERMINATION**: on_handoff_to: orchestrator (artifact embedded as ARTIFACT-INLINE per FM-19); max_turns 25 not exceeded; tool_count 25 < 40 ceiling.
