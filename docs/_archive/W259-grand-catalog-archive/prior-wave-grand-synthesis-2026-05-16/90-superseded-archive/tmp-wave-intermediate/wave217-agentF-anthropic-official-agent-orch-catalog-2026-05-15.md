# Wave 217 Agent F — Anthropic-OFFICIAL Agent-Orchestration Stack Audit

**Agent**: W217-F sota-researcher (Sonnet stand-in per FM-17.e recovery)
**Wave**: 217
**Date**: 2026-05-15
**Pipeline**: `sota-convergence-audit` R1-R5 (TIGHTENED per FM-17.e autocompact-thrashing mitigation)
**STAND-IN-NOTICE**: orchestrator W219 Path P satisfies cross-model gate (cardinal-rule-3)

---

## R1 — Multi-source discovery (≥4 source-family fan-out per repo)

| # | Repo | gh API stars | License | Created | Pushed | Local clone HEAD | DeepWiki | Z:/repos/deps/ |
|---|---|---|---|---|---|---|---|---|
| 1 | `obra/superpowers` | 192,676 | MIT | 2025-10-09 | 2026-05-14 | `f2cbfbef @ 2026-05-04` | YES (via gh) | ✅ |
| 2 | `anthropics/claude-agent-sdk-python` | 6,895 | MIT | 2025-06-11 | 2026-05-15 | `b512f256 @ 2026-05-01` | YES | ✅ |
| 3 | `anthropics/claude-agent-sdk-typescript` | 1,425 | NO-LICENSE-FIELD | 2025-09-27 | 2026-05-14 | N/A (not-cloned) | YES (remote) | ❌ HONEST-NON-FINDING for line-cite |
| 4 | `anthropics/cwc-long-running-agents` | 315 | Apache-2.0 | 2026-05-06 | 2026-05-13 | `ffd563d6 @ 2026-05-05` | YES | ✅ |
| 5 | `affaan-m/everything-claude-code` (ECC corrected owner) | 183,142 | MIT | 2026-01-18 | 2026-05-15 | `841beea4 @ 2026-04-30` | YES | ✅ |
| 5b | `everything-claude-code/everything-claude-code` | N/A (404) | N/A | N/A | N/A | N/A | N/A | ❌ Probe 1 count-OVER caught: NOT-AT-CITED-OWNER |
| 6 | `anthropics/anthropic-cookbook` → renamed `claude-cookbooks` | 43,041 (anthropic-cookbook URL still resolves) | MIT | 2023-08-15 | 2026-05-14 | `3f8bf356 @ 2026-05-08` | YES | ✅ |

**Source families satisfied** (≥4 per repo for surviving entries):
- (a) `gh api repos/<owner>/<repo>` metadata
- (b) Local clone at `Z:/repos/deps/<repo>/` HEAD SHA via `git log -1`
- (c) DeepWiki MCP-available (per `mcp__deepwiki__ask_question` server status — confirmed reachable)
- (d) On-disk file:line inspection via `Bash` (head -N bound)

**Mia pre-apply OVER catches at R1**:
- Brief cited `everything-claude-code/everything-claude-code` — `gh api` returned 404. ECC's actual owner is `affaan-m/everything-claude-code` per local deps path. Reframed to canonical owner before R2.
- TS SDK NOT cloned locally → cannot provide TIER-1-DIRECT file:line cite. HONEST-NON-FINDING for source-tree level; gh-API metadata level cite stands.

---

## R2 — 7-Probe-DAG harness-fit per repo

| Repo | P1 count-OVER | P2 SDK-vs-CLI | P3 arch-API | P4 plugin-ns | P5 mode-harness | P6 direct-file-blockers | P7 demand-gate |
|---|---|---|---|---|---|---|---|
| obra/superpowers | PASS (claims independent — read SKILL.md verbatim) | PASS (markdown skills + sub-prompts) | PASS (Claude-Skill-native) | ⚠️ ALREADY-vendored 6/14 in sibling claude-sota at `Z:/claude-sota/.claude/skills/superpowers/` — DUPLICATE risk vs. fresh install | PASS (autonomous-loop compatible per sibling iter-83+84 vendoring) | PASS (MIT) | 7.a DEMAND-PRESENT (TDD/SDD/debug active workflows) |
| claude-agent-sdk-python | PASS (v0.1.72 latest) | PASS (`pip install claude-agent-sdk`) | PASS (Python SDK; ClaudeAgentOptions/HookMatcher TypedDicts) | ⚠️ DUPLICATE Claude Code CLI bundled (`claude-agent-sdk-python/src/claude_agent_sdk/_bundled/`); sss runtime uses CC CLI not SDK | ❌ FAIL — sss runtime is CC-CLI-based autonomous /loop, NOT SDK-managed-agents. SDK is library for BUILDING agents, not the runtime sss uses. Probe 5 mode-harness-shape REJECT-FOR-FIT | PASS (MIT, Apache-2.0-compatible) | 7.b DEMAND-CREATES-NEW-WORKFLOW eligibility: requires new Python-SDK-based agent infra (NOT current sss pattern). 5-clause check FAILS clause 4 (incumbent CC-CLI + Bash subprocess already covers all live workflows) |
| claude-agent-sdk-typescript | INCONCLUSIVE (no-license-field via gh — verify via direct LICENSE read needed) | INCONCLUSIVE | INCONCLUSIVE | DUPLICATE-via-TS-equivalent of Python SDK | ❌ FAIL (same Probe 5 as Python SDK) | ⚠️ `license: null` from gh API — Probe 6 LICENSE-blocker until verified | 7.a same as Python SDK |
| cwc-long-running-agents | PASS (5 primitives verified file:line) | PASS (bash hooks via .claude/settings.json) | PASS (Anthropic-CC-hooks-native: PreToolUse/Stop) | PASS — sss already installed 6/6 primitives per W6 Agent K (manifest §Section 17 install-class) | PASS (autonomous-loop native — kill-switch + steer + commit-on-stop are loop-aware) | PASS (Apache-2.0) | 7.a DEMAND-PRESENT (already-installed; verifying maintenance) |
| affaan-m/everything-claude-code | PASS (48 agents + 182 skills + 68 commands per `ls \| wc -l`) | PASS (skill markdown + hooks per shim plugin model) | PASS (Claude-Skill-native) | ⚠️ Plugin-namespace-loaded in claude-plugins-official + everything-claude-code marketplace per sss inventory | PASS (autonomous-loop compatible; cited extensively in sibling rules) | PASS (MIT) | 7.a DEMAND-PRESENT (already-cited in sibling cardinal rules + Section 14.5) |
| claude-cookbooks (managed_agents) | PASS (14 jupyter notebooks managed_agents/CMA_*; data_analyst + slack_data + sre_incident) | PASS (Anthropic Managed-Agents-API, hosted runtime — NOT local CC CLI) | ❌ FAIL — Managed-Agents-API is hosted-runtime separate from `code.claude.com`'s CC CLI; sss doesn't use Managed Agents | DUPLICATE-via-codepath of cookbook's `using_sub_agents.ipynb` already cited at `Z:/claude-sota/.claude/rules/team-orch-patterns.md §Context Budget` | ❌ FAIL — Managed Agents requires API enrollment + hosted env; sss is local-CC-CLI-only | PASS (MIT) | 7.a DEMAND-ABSENT for ManagedAgents; 7.a DEMAND-PRESENT for using_sub_agents pattern (already-cited) |

**Probe DAG SOTA verdicts**:
- ✅ **obra/superpowers**: harness-fit ADOPT-NOW for un-vendored 8/14 skills (e.g., `using-superpowers`, `executing-plans`, `finishing-a-development-branch`, `receiving-code-review`)
- ❌ **claude-agent-sdk-python**: REJECT-FOR-FIT — Probe 5 mode-harness-shape (sss is CC-CLI runtime, not SDK-managed)
- ❌ **claude-agent-sdk-typescript**: REJECT-FOR-FIT — same as Python SDK + Probe 6 LICENSE-blocker pending
- ✅ **cwc-long-running-agents**: ALREADY-INSTALLED per W6 → maintenance-only (Probe 7.a DEMAND-PRESENT confirmed)
- ⚠️ **affaan-m/ECC**: PARTIAL-OVERLAP per CR-12 disposition — many skills/agents already plugin-namespace-loaded; selective vendoring of un-loaded primitives possible
- ⚠️ **claude-cookbooks/managed_agents**: REJECT-FOR-FIT — Managed Agents is separate hosted-runtime category; cookbook notebook patterns are CITE-CLASS-CANONICAL (already cited)

---

## R3 — Axis-1+2+3 convergence-gate per surviving repo

### obra/superpowers (CR-12 disposition: PARTIAL-OVERLAP / ECOSYSTEM-IMPORT)
- **Axis 1** (≥3 distinct T1 orgs): PASS — superpowers (obra/Jesse Vincent) + Anthropic CC docs skill primitive + Claude marketplace ecosystem
- **Axis 2** (≥2 named-T2 dated artifacts): PASS — Jesse Vincent (192,676★ MIT, recurring blog posts), 2026-04-05+ adoption blogs, Anthropic Skills docs
- **Axis 3** (≥3 months stability): PASS — created 2025-10-09, ~7mo age, cpd active maintenance (recent pushed_at 2026-05-14)
- **Verdict**: STRONG ADOPT — Axis 1+2+3 firm PASS

### cwc-long-running-agents (CR-12 disposition: CITE-CLASS-CANONICAL / already-INSTALLED)
- **Axis 1**: PASS — Anthropic PBC official + cwc release announcement + CCBP cross-references
- **Axis 2**: PASS — Anthropic engineering blog (Nov 2025 + Mar 2026 effective-harnesses essays) + sibling claude-sota CLAUDE.md L208 architecture cite
- **Axis 3**: BORDERLINE — created 2026-05-06 (~9 days at audit time); STRONG-PROVENANCE-EXPRESS predicate fires (Anthropic-official-org + named-author endorsement from CC team + age≥7d gate)
- **Verdict**: STRONG ADOPT via STRONG-PROVENANCE-EXPRESS (5 primitives already INSTALLED per W6 Agent K)

### affaan-m/ECC (CR-12 disposition: PARTIAL-OVERLAP — selective)
- **Axis 1**: PASS — ECC author + sibling claude-sota canonical-orchestration-skills cite + 183K★ ecosystem
- **Axis 2**: PASS — already-cited as TIER-1 in sibling `team-orch-frameworks.md`
- **Axis 3**: PASS — created 2026-01-18 (~4mo age), active maintenance
- **Verdict**: ADOPT-SELECTIVELY for un-loaded primitives only

---

## R4 — SRA D1-D10 scoring per surviving repo

| Repo | D1 quality | D2 maintenance | D3 popularity | D4 SOTA-native | D5 license | D6 risk | D7 harness-fit | D8 ecosystem-conv | D9 wiring-cost | D10 evidence | **TOTAL/100** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| obra/superpowers | 10 | 10 | 10 | 10 | 10 | 8 | 9 (8/14 vendored ⇒ 6 unvendored) | 10 (3-org Axis-1) | 7 (cite-import-AMBER required) | 10 | **94** |
| cwc-long-running-agents | 9 | 9 | 7 | 10 (Anthropic-OFFICIAL) | 10 | 8 (`@ffd563d6` SHA-pinned) | 10 (already-installed) | 9 | 10 (already-installed) | 10 | **92** |
| affaan-m/ECC | 8 | 9 | 10 | 9 | 10 | 7 (D6 today-release `@latest` risk per CR-9) | 7 (selective) | 9 | 6 (per-primitive vendor) | 9 | **84** |

**Score derivation**: per-dimension D1-D10 1-10 scale; lower scores reflect harness-fit penalties (Probe 5 mode-harness-shape) or wiring-cost (cite-import vs install).

---

## R5 — CR-12 6-class disposition + INSTALL/STUDY-PILOT/REJECT verdict

| Repo | CR-12 disposition | Verdict | Action | Install command (CR-6 official-native-channel) |
|---|---|---|---|---|
| **obra/superpowers** | PARTIAL-OVERLAP + ECOSYSTEM-IMPORT (8/14 vendored; 6/14 un-vendored) | **STUDY-PILOT** for un-vendored 6 skills (`using-superpowers`, `executing-plans`, `finishing-a-development-branch`, `receiving-code-review`, `using-git-worktrees`, `dispatching-parallel-agents`) | Selective vendor per sibling iter-83/84/86 pattern: read source SKILL.md + cite-import-AMBER per Section 14.5 | `git clone --depth 1 https://github.com/obra/superpowers.git Z:/repos/deps/superpowers-fresh` (refresh) + selective cp per skill |
| **claude-agent-sdk-python** | REJECT-FOR-FIT (Probe 5 mode-harness-shape FAIL) | **REJECT** — runtime is CC-CLI-based, not SDK-managed | NO-OP for sss runtime; SDK is cite-only when building external agent infrastructure (separate project class) | N/A |
| **claude-agent-sdk-typescript** | REJECT-FOR-FIT (Probe 5 + Probe 6 license-pending) | **REJECT** — same as Python SDK + LICENSE-blocker pending | NO-OP | N/A |
| **cwc-long-running-agents** | CITE-CLASS-CANONICAL (already-INSTALLED per W6) | **INSTALL** ✅ (verify W6 install integrity) | Probe install-provenance.md W62B entry for 5 hooks + 1 evaluator; verify hooks chmod +x | `git -C Z:/repos/deps/cwc-long-running-agents fetch && git pull --ff-only origin main` (refresh per CR-6) — already at `ffd563d6` |
| **affaan-m/ECC** | PARTIAL-OVERLAP (many primitives plugin-loaded) | **STUDY-PILOT-NARROW** — selective vendoring only for un-loaded primitives | Audit current sss plugin-namespace coverage vs ECC 48/182/68 inventory; vendor only gaps | `/plugin install everything-claude-code@everything-claude-code` (if marketplace-available) OR selective skill cp |
| **claude-cookbooks** (managed_agents) | CITE-CLASS-CANONICAL (already cited) | **CITE-ONLY** (no install needed for sss runtime) | Maintain cite-anchors at `using_sub_agents.ipynb` per sibling `team-orch-patterns.md §Context Budget` | N/A — cite-class only |

---

## Cross-layer architectural recommendations

1. **superpowers un-vendored 6/14 skills** — highest-leverage adoption candidates. SOTA convergence-gate PASS (3-axis firm) + already 8/14 vendored in sibling claude-sota → low marginal wiring cost. **Top-3 priority**:
   - `using-superpowers` (root-skill activation primitive — auto-fires on session-start per `description:` trigger)
   - `executing-plans` (subagent dispatch with bounded iteration)
   - `finishing-a-development-branch` (commit/merge/PR discipline)

2. **cwc-long-running-agents maintenance** — verify W6 install integrity. Already INSTALLED at `Z:/claude-sota-installed/.local/cwc/` per Wave 6 port; per-file blob SHAs recorded in `docs/install-provenance.md`. Action: smoke-probe `kill-switch.sh`/`steer.sh`/`verify-gate.sh`/`commit-on-stop.sh`/`track-read.sh`/`evaluator.md` for runtime accessibility.

3. **ECC selective vendoring** — sss already uses sibling-marketplace via `everything-claude-code` plugin namespace (per sibling skill-orchestration-discipline.md). Action: enumerate un-loaded primitives via `claude plugin details everything-claude-code` AND compare against ECC source-tree 48 agents + 182 skills + 68 commands.

4. **Anthropic SDKs (Python + TS)** — **REJECT-FOR-FIT** for sss runtime. SDKs are agent-infrastructure-building libraries, NOT the runtime sss uses. sss CC-CLI + Bash subprocess + `codex exec` pattern already satisfies all live workflows (Probe 7.a DEMAND-ABSENT).

5. **claude-cookbooks managed_agents** — Managed Agents API is **separate hosted-runtime category** from CC CLI (different Anthropic product). Cookbook notebooks (`using_sub_agents.ipynb`, `CMA_coordinate_specialist_team.ipynb`) remain cite-class-canonical for design patterns.

---

## HONEST-NON-FINDINGS

1. **`everything-claude-code/everything-claude-code` (cited in brief)** — 404 at that owner. Canonical owner is `affaan-m/everything-claude-code` (verified via `gh api` + local deps path). Mia pre-apply caught at R1.

2. **`anthropics/claude-agent-sdk-typescript` LICENSE** — gh API returns `license: null`; per Probe 6 direct-file/registry blockers, LICENSE must be verified via raw GitHub content fetch before any cite-import. Currently HONEST-NON-FINDING for license-tier.

3. **TS SDK not cloned at `Z:/repos/deps/`** — only `claude-agent-sdk-python` cloned. TIER-1-DIRECT file:line cite NOT-AVAILABLE for TS SDK; gh-API metadata cite stands.

4. **`claude-cookbooks` repo rename trail** — gh API still resolves at `anthropics/anthropic-cookbook` (the original name pre-2024 rename to `claude-cookbooks`). Both `Z:/repos/deps/anthropic-cookbook/` and `Z:/repos/deps/claude-cookbooks/` exist locally (likely separate clones at different SHAs). Default cite is `claude-cookbooks` HEAD `3f8bf356`.

---

## VERDICT

**Action priority** (highest leverage first):

1. ✅ **INSTALL-VERIFY** `cwc-long-running-agents` — smoke-probe 5 hooks + 1 evaluator at `Z:/claude-sota-installed/.local/cwc/` per W6 Agent K install rows.

2. ✅ **STUDY-PILOT-VENDOR** `obra/superpowers` Top-3 un-vendored skills: `using-superpowers`, `executing-plans`, `finishing-a-development-branch`. Apply Section 14.5 cite-import-AMBER discipline.

3. ⚠️ **AUDIT** `affaan-m/ECC` plugin-namespace coverage vs source-tree inventory; defer vendoring to per-gap-confirmed loop.

4. ❌ **REJECT** `claude-agent-sdk-python` + `claude-agent-sdk-typescript` for sss runtime (Probe 5 mode-harness-shape FAIL — SDKs are for building agent infra, NOT the CC-CLI runtime sss operates as).

5. 📚 **CITE-ONLY** `claude-cookbooks/managed_agents` — maintain TIER-1-DIRECT cite-anchors at `using_sub_agents.ipynb` for design pattern references; do NOT install Managed Agents (separate hosted-runtime category).

**Cross-model gate**: satisfied at orchestrator W219 Path P layer (cardinal-rule-3 PARTIAL via STAND-IN-NOTICE — this audit is Sonnet-stand-in research evidence; orchestrator dispatches Path P codex T1 for ship-decision review).

**Cite anchors** (TIER-1-DIRECT):
- `Z:/repos/deps/superpowers/skills/subagent-driven-development/SKILL.md @ f2cbfbef`
- `Z:/repos/deps/superpowers/skills/verification-before-completion/SKILL.md @ f2cbfbef`
- `Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/{hooks/*.sh,agents/evaluator.md,settings.json,CLAUDE.md} @ ffd563d6`
- `Z:/repos/deps/claude-agent-sdk-python/CHANGELOG.md:1-25 @ b512f256` (v0.1.72 latest)
- `Z:/repos/deps/everything-claude-code/agents/* (48 files) + skills/* (182 dirs) + commands/* (68 files) @ 841beea4`
- `Z:/repos/deps/claude-cookbooks/managed_agents/README.md + CMA_*.ipynb @ 3f8bf356`
- gh API metadata 2026-05-15 verified for all 6 repos

**Mia pre-apply discipline**: applied at R1 (caught ECC-owner 404 OVER); applied at R2 (caught Probe 5 mode-harness-shape FAILs for Python+TS SDKs); applied at R4 (D9 wiring-cost downgrades for cite-import requirements); applied at R5 (REJECT vs INSTALL routing).

VERDICT: handoff_to: orchestrator | artifact persisted to tmp/wave217-agentF-anthropic-official-agent-orch-catalog-2026-05-15.md | scope: 6 repos audited | INSTALL-class: 1 (cwc maintenance) | STUDY-PILOT: 2 (superpowers Top-3 + ECC selective) | REJECT: 2 (Python SDK + TS SDK) | CITE-ONLY: 1 (cookbooks)
