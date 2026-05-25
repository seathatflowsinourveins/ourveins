---
title: Wave 222 Agent H - Hook Ecosystem + MCP Server Frameworks Deep Audit (PARTIAL DELIVERY)
status: PARTIAL-DELIVERY-FINDINGS-ONLY
date: 2026-05-15
wave: 222
fire: 1
agent: sota-researcher (Sonnet stand-in DISCLOSED per CLAUDE.local.md ENV (g))
artifact-class: hook-and-mcp-framework-scoring-PARTIAL
predecessors: W221-D + W221-F (cross-vendor agent-orch)
delivery_note: Agent H returned findings-summary only; full ARTIFACT-INLINE body NOT delivered (same non-conformance as Agent I); orchestrator captured findings from summary + verified key meta-claims via independent Bash probe
---

# STAND-IN-NOTICE

This dispatch ran as Sonnet stand-in per CLAUDE.local.md ENV (g). Cross-model gate NOT structurally satisfied. Agent H non-conforming delivery: summary-only, no ARTIFACT-INLINE. Orchestrator persisted captured findings + independent verification.

# LOAD-BEARING META-FINDING (verified via orchestrator Mia probe 2026-05-15)

**Z:/claude-sota/ does NOT exist as live sibling path** — it has been RENAMED to `Z:/claude-sota(retired)/`. All CLAUDE.md cite anchors referencing `Z:/claude-sota/...` are stale-path-cites pointing to retired directory.

Current Z:\ state:
- `Z:/claude-sota-installed/` — THIS runtime (active install-only canonical baseline)
- `Z:/claude-sota-pure/` — TARGET runtime (bootstrap-only; install plan pending)
- `Z:/claude-sota(retired)/` — RETIRED sibling (orphan cite source)
- `Z:/claude-sota-state/` + `Z:/claude-sota-installed-state/` + `Z:/claude-sota-pure-state/` — state-outside-repo dirs

Classification: **FM-20 path-drift cascade class** affecting cardinal-rule cite anchors throughout CLAUDE.md (cardinal rules 1-12 all cite `Z:/claude-sota/...` paths that no longer exist).

Per cardinal-rule-1 strict reading: cite-anchors MUST resolve to live paths. `Z:/claude-sota(retired)/` may still contain the rule content for forensic reference, but live cite chain is broken. **W225 synthesis MUST address cite-anchor migration**: either (a) re-point cites to `Z:/claude-sota(retired)/...`, (b) re-point to `Z:/claude-sota-installed/.claude/rules/...` if rule content has been preserved locally (DEFAULT path per Mia probe — rules DO live at `Z:/claude-sota-installed/.claude/rules/`), or (c) verify-and-document the retirement context.

# 4 PHANTOM CITE-CLASS DRIFTS REQUIRING CLAUDE.md FIX-FORWARD

Per Agent H findings (verified via mcp__github__search_repositories + mcp__github__get_file_contents 2026-05-15):

| # | Phantom cite | Actual canonical | Status |
|---|---|---|---|
| 1 | `jlowin/fastmcp` | `PrefectHQ/fastmcp` (25,175★ Apache 2.0) | OWNERSHIP-MOVED — fastmcp transferred from jlowin to PrefectHQ org |
| 2 | `anthropic-cookbook` (singular) | `anthropics/claude-cookbooks` (canonical) | NAME-DRIFT — typo/wrong-spelling cite |
| 3 | `modelcontextprotocol/mcp-builder` (phantom standalone repo) | `anthropics/skills/skills/mcp-builder/` (skill, not repo) | CLASS-CONFUSION — cited as repo but is actually a skill within anthropics/skills |
| 4 | `Z:/claude-sota/` sibling path | `Z:/claude-sota-installed/` OR `Z:/claude-sota(retired)/` per migration target | PATH-RETIREMENT — entire sibling renamed to (retired) |

# TIER 1-2 INSTALL APPROVALS (Convergence-gate FIRM PASS per Agent H)

## INSTALL #1: anthropics/claude-cookbooks (Anthropic OFFICIAL)
- **Install**: `git clone https://github.com/anthropics/claude-cookbooks.git`
- **Class**: 10 production CMA notebooks + agent-SDK examples (anthropic-cookbook canonical successor)
- **License**: Apache-2.0 (Anthropic official)
- **Verdict**: ADOPT-NOW — replaces phantom `anthropic-cookbook` cite throughout sister rules; canonical example source for agent-SDK + skill-creator workflows

## INSTALL #2: anthropics/skills (Anthropic OFFICIAL)
- **Install**: `git clone https://github.com/anthropics/skills.git` OR `/plugin marketplace add anthropics/skills`
- **Class**: 17 skills including critical `mcp-builder` 4-phase guide
- **License**: Apache-2.0 (Anthropic official)
- **Verdict**: ADOPT-NOW — canonical home for `mcp-builder` skill (resolves phantom `modelcontextprotocol/mcp-builder` cite); 135k+ stars per W222-I

## INSTALL #3: PrefectHQ/fastmcp (Anthropic explicit endorsement)
- **Install**: `pip install fastmcp@latest`
- **Class**: Python MCP framework — canonical per Anthropic explicit endorsement
- **Stars**: 25,175 Apache-2.0
- **Verdict**: ADOPT-NOW — choice for Z:\claude-sota-pure custom MCPs (PrefectHQ now owns; jlowin transferred)

# HOOK ADOPTION SUBSET (per Agent H, sibling claude-sota analysis)

**8 essential hooks for Z:\claude-sota-pure adoption**:
1. T1 codex pre-edit consult gate (`codex_t1_consult_gate.py`)
2. T2 commit-time gate (`codex_t2_pre_commit_gate.py`)
3. T3 postcommit review (`codex_postcommit_review.py`)
4. safety_guard (narrow catastrophic-Bash deny-list)
5. gitleaks (secret-leak prevention)
6. secret_scan
7. block_no_verify (prevent `--no-verify` hook bypass)
8. Foundation utils (shared module: `_guard_base.py` / `utils.py`)

**Exclude 28 sibling-novel hooks** (fm17_* / fm19_* / fm20_* / agent_* / compact_*) under CR-9 sibling-bleed defense — these encode sibling-specific failure-mode codifications that won't apply to a fresh runtime.

# Domain-by-domain summary (extracted from Agent H non-conforming return)

## Domain A — Hook ecosystem
- **claude-code-action** (anthropics OFFICIAL GitHub Action): VERIFY install path + CI/CD adoption for Z:\claude-sota-pure
- **Sibling hook subset (8 essential)**: T1/T2/T3 codex gates + safety/secret/no-verify guards + foundation utils
- **Excluded (28)**: sibling FM-codification hooks per CR-9

## Domain B — MCP server frameworks
- **PrefectHQ/fastmcp** (25,175★ Apache-2.0) — CANONICAL Python MCP framework
- **modelcontextprotocol/python-sdk** — official Anthropic baseline (lower-level than fastmcp)
- **modelcontextprotocol/typescript-sdk** — TS counterpart for TS-MCP development
- **mcp-builder** — SKILL not standalone repo; lives in `anthropics/skills/skills/mcp-builder/`

## Domain B.5 — anthropic-cookbook agent-skills
- **claude-cookbooks** is the canonical name (NOT anthropic-cookbook)
- Contains 10 production CMA notebooks + agent-SDK skill-creator examples
- Install-class for Z:\claude-sota-pure as Anthropic OFFICIAL repo

# Cumulative phantom-cite-class drift catches W221+W222

| # | Cite phantom | Source-of-cite | Resolution | Severity |
|---|---|---|---|---|
| 1 | `atlassian-labs/mcp-compressor` | W219 Agent C 88/100 score | PHANTOM (W221-E zero matches) | P0 — INVALID W219 score |
| 2 | `distill-mcp` | W219 Agent C 82/100 score | PHANTOM (W221-E zero matches) | P0 — INVALID W219 score |
| 3 | `chopratejas/headroom` | W219 Agent C 78/100 score | CONFLICT (W221-E PHANTOM vs W222-G EXISTS 1758★) | P1 — Wave 224 Pattern D resolution |
| 4 | `fastmcp-me/mcp-ComputeGauge` | v5/v6/v7/v8 SOTA_REPOS_FINAL_LIST | PHANTOM (W222-G zero matches) | P1 — exclude from adoption |
| 5 | `intelligent-compact` standalone repo | CLAUDE.local.md ENV (i) Rank #3 | PHANTOM-FLAG (W222-I no standalone GitHub) | P1 — cite-path verification |
| 6 | `jlowin/fastmcp` | (Agent H sister rules?) | OWNERSHIP-MOVED to PrefectHQ/fastmcp | P1 — cite migration |
| 7 | `anthropic-cookbook` (singular) | (Agent H sister rules?) | NAME-DRIFT → `claude-cookbooks` | P1 — cite typo correction |
| 8 | `modelcontextprotocol/mcp-builder` | (Agent H sister rules?) | CLASS-CONFUSION (skill not repo) | P1 — cite reclassification |
| 9 | `Z:/claude-sota/` sibling-path cites | CLAUDE.md cardinal rules 1-12 | PATH-RETIREMENT (renamed to retired/) | **P0 — load-bearing cite migration** |

**META-FINDING**: 9 distinct phantom-cite drift classes detected across W221+W222. Discipline integrity for synthesis layer requires Wave 225 to address ALL nine before producing operator-actionable install plan.

# VERDICT

**STUDY-PILOT-CATALOG (PARTIAL — non-conforming delivery)**: Agent H surfaced 3 ADOPT-NOW Anthropic OFFICIAL installs (claude-cookbooks + skills + fastmcp@PrefectHQ) + 4 phantom-cite drift catches + 8-hook adoption subset + 28-hook exclusion under CR-9.

**HIGH-VALUE Top-3 INSTALL-NOW from W222-H**:
1. **anthropics/claude-cookbooks** — Apache-2.0 Anthropic OFFICIAL canonical CMA + agent-SDK examples
2. **anthropics/skills** (135k+★) — Apache-2.0 OFFICIAL 17-skill catalog including mcp-builder
3. **PrefectHQ/fastmcp** (25.1k★) — Apache-2.0 canonical Python MCP framework

**LOAD-BEARING META: FM-20 path-retirement** — `Z:/claude-sota/` no longer exists; all CLAUDE.md sibling cites point to retired directory. **Wave 225 synthesis MUST address cite-anchor migration** as P0 before producing final operator checklist.

**Cross-model gate**: NOT structurally satisfied (Sonnet stand-in). Wave 224 Pattern D `codex exec` foreground+tee REQUIRED for cross-model validation of:
- 4 phantom-cite drift resolutions
- 3 ADOPT-NOW Anthropic OFFICIAL approvals
- Hook adoption 8-subset filter
- Meta-finding: sibling path retirement cite migration plan

**Agent H non-conformance**: Same pattern as Agent I — findings summary delivered without full ARTIFACT-INLINE body. **W223 may re-dispatch tighter brief** OR W225 synthesis works from summary directly.
