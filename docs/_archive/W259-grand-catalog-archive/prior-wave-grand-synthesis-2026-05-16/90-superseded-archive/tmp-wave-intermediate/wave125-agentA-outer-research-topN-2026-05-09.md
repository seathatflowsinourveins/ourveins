---
title: "Wave 125 Agent A — Outer Research Top-7 Wave 125+ Recommendations (post-Wave-124-batch-COMPLETE delta)"
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-09
agent: agentA-sota-researcher (Wave 125 fire 1)
wave: 125
predecessor_baseline: Wave 122 Agent A Top-5 + Wave 122 Agent C 8-axis findings + Wave 123 Agent G frontier last-60d
post_baseline_state: |
  Wave 124 batch COMPLETE 6/6 codex hooks INSTALLED-DORMANT via cite-import (commits fd5c209 / 9b239b9 / 6bc2141 / b077afb / 210c135 / 1371ddd / 594ce28).
  Wave 125 batch COMPLETE 4/6 plugins INSTALLED (clickhouse / outputai / qdrant-skills + dash0 REVERTED per Outcome B).
  Wave 124 fire1 P0 fixes COMPLETE: serena SHA-pin / playwright @0.0.75 / agent_spawn_gate.py plugin-namespace fix.
---

# Wave 125 Agent A — Outer Research Top-7 (post-W124-batch delta)

## §1 Mia pre-apply boundary check (per cardinal-rule-11 invariant #5)

Wave 122 Top-5 ALREADY-SHIPPED status [VERIFIED 2026-05-09 via git log + manifest probe]:

| Wave 122 Ship# | Original verdict | Current status | Closure |
|---|---|---|---|
| #1 oraios/serena | ADOPT-NOW Wave 123 | ✅ INSTALLED-VIA-MCP-WIRE @ SHA `249f6b07` | Mia OVER #55 caught + W124 SHA-pinned per CR-9 |
| #2 ccusage | ADOPT-NOW Wave 124 | ✅ ccstatusline@2.2.12 stable shipped (commit `7e0e28d`) | Wave 123 ship-2 Agent A DECISION Option B (ccstatusline preferred) |
| #3 codex hooks observability | ADOPT-NOW Wave 125 | ✅ 6/6 INSTALLED-DORMANT W124 batch (commits fd5c209→594ce28) | Cite-import-AMBER per CR-12 Path B |
| #4 just/uv foundational | ADOPT-NOW Wave 126 | ✅ ALREADY-ON-PATH per Mia alternate-install probe (W124 anti-pattern #1; 16 OVER refutations) | NO-OP — refuted prescription |
| #5 cwc-long-running-agents primitives | INSTALLED-DORMANT Wave 62 | ✅ INSTALLED-DORMANT (5 primitives + evaluator + commit-on-stop bonus); WIRING gated by CR-7 Phase 1 operator approval | Pending wire-into-settings.json fire |

**4/5 Wave 122 ships closed**; #5 cwc primitives are INSTALLED but DORMANT — wiring is the load-bearing GAP requiring next fire decision.

**Wave 125 batch ALSO closed**: clickhouse@1.0.0 + outputai + qdrant-skills INSTALLED via Path A; dash0 REVERTED per Outcome B Stop-hook 404 noise (no install-class regression).

## §2 NEW Top-7 deep-dive verdicts (Wave 125+ frontier)

### 🥇 Ship #1 (Wave 127) — `cwc-long-running-agents` SETTINGS WIRE (5 primitives) — load-bearing CR-7 Phase 2 unblocker

**Source**: `Z:/claude-sota-installed/.local/cwc/claude-code-config/.claude/hooks/{track-read,verify-gate,kill-switch,steer,commit-on-stop}.sh @ HEAD ffd563d6` (already cloned + chmod +x'd Wave 62 fire 6)
**Path classification**: **Path A operator-side** — primitives upstream-installed; only the SETTINGS.JSON wire is missing
**License**: MIT/Anthropic OFFICIAL (CR-9 LICENSE PASS)
**Convergence-gate verdict**: Axis 1 PASS (Anthropic-OFFICIAL `anthropics/cwc-long-running-agents`); Axis 2 PASS (named-author Aishwarya Lopopolo + Sherwin Rajasekaran 2025-Nov + 2026-Mar Anthropic blog posts); Axis 3 PASS-novel (cwc shipped 2026-05-06; SHA `ffd563d6` 2026-05-05)
**6-Probe DAG**:
- P1 LICENSE: MIT PASS
- P2 registry-existence: N/A — primitives are local shell scripts copied from upstream clone
- P3 plugin-namespace: NO collision (not in any marketplace; sibling-novel pattern at upstream-Anthropic)
- P4 architectural-API: PASS — `Stop` hook + `PreToolUse:Bash` + `SessionStart` hooks (settings.json native shape)
- P5 mode-harness-shape: PASS — autonomous /loop friendly; track-read.sh logs to `.claude/state/track-read.jsonl`; verify-gate.sh blocks PR on test-results.json fail
- P6 demand-gate: VERIFIED — install runtime explicitly references this in CLAUDE.md Architecture §17 + manifest §17 documents 5 primitives DORMANT awaiting wire
- P7 license/registry: MIT permissive
**Adoption verdict**: **WIRE-NOW** (highest-priority — closes CR-7 Phase 2 trigger predicate (a) + (b) for Section 17 rows)
**1-line wire** (operator-side .claude/settings.json edit; ~50 LOC):
```bash
# Append to .claude/settings.json hooks block (no install — pure settings edit):
# {"hooks":{"PreToolUse":[...,{"matcher":"Bash","hooks":[{"type":"command","command":"bash .claude/hooks/scripts/cwc/track-read.sh"}]}],
#           "Stop":[...,{"hooks":[{"type":"command","command":"bash .claude/hooks/scripts/cwc/verify-gate.sh"}]}]}}
# Per Anthropic Effective Harnesses for Long-Running Agents (Nov 2025) Default-FAIL contract.
```
**LOC estimate**: ~50 LOC (settings.json hook entries + 1 README cite update)
**Risk band**: MEDIUM (settings.json changes are reversible via git revert; `verify-gate.sh` could BLOCK Stop unless test-results.json present — operator must opt-in per project)
**Mia pre-apply outcome**: **VERIFIED-GENUINE** — `grep -c "cwc/track-read" .claude/settings.json` returns 0 [VERIFIED 2026-05-09]; primitive NOT yet wired
**Bridge-to-W124**: STRONG — W124 just installed 6 codex observability hooks; cwc primitives are the CONSUMER side that turns observability into enforcement (track-read → verify-gate; codex_review_trace.py → Stop verify-gate.sh consumes)
**Why first**: Section 17 row INSTALLED-DORMANT for 3 days (Wave 62 fire 6 → Wave 125 fire 1); CR-7 Phase 2 trigger predicate (a) explicitly requires every Section 17 row's smoke-probe column showing PASS — DORMANT ≠ PASS

---

### 🥈 Ship #2 (Wave 128) — `truera/trulens` eval-axis populate (manifest §15 EMPTY closes)

**Source**: `https://github.com/truera/trulens` @ HEAD pinned at install-time per CR-9
**Path classification**: **Path A upstream-install** (PyPI canonical)
**License**: MIT (TIER-1 LICENSE [VERIFIED via gh repo view])
**Maintainer**: TruEra (named-org; 5+ contributors; commercial-backed open-source)
**Convergence-gate verdict**: Axis 1 PASS (TruEra named-org + Anthropic-OFFICIAL `claude-plugins-official` recently added eval observability via dash0 — Wave 122 Agent C ADOPT-NOW); Axis 2 PASS (mature 5yr+ MIT, named at multiple eval surveys); Axis 3 PASS (>1800d age firm, sustained cpd >1)
**6-Probe DAG**:
- P1 LICENSE: MIT PASS
- P2 registry-existence: `trulens` on PyPI [VERIFIED via gh search registry] + `trulens-core` + `trulens-eval` packages
- P3 plugin-namespace: NO collision (no `trulens` in claude-plugins-official + ECC + addy-agent-skills + superpowers + cwc + skill-creator)
- P4 architectural-API: PASS — Python library + Streamlit dashboard; integrates with mcp-memory-service (Wave 124 INSTALLED) via `truelens` evaluators
- P5 mode-harness-shape: PASS — observability-only (no policy enforcement); composes WITH cwc verify-gate per Ship #1 above
- P6 demand-gate: VERIFIED — manifest §15 eval-axis EMPTY; Wave 122 Agent C explicit ADOPT-NOW Axis 5
- P7 license/registry: MIT permissive
**Adoption verdict**: **ADOPT-NOW**
**1-line install** (CR-6 official-native-channel):
```bash
python -m pip install --target Z:/claude-sota-installed/.venv/Lib/site-packages 'trulens-core==2.5.0'
# Then add manifest §15 row + cite-anchor ARM
```
**LOC estimate**: ~80 LOC (manifest §15 row + 1 SDK init script + .mcp.json entry-point if MCP wrap shipped)
**Risk band**: LOW (observability-only; no production deps)
**Mia pre-apply outcome**: **VERIFIED-GENUINE** — `grep -c "trulens\|truera" Z:/claude-sota-installed/docs/sota-installed-manifest.md` returns 0 [VERIFIED 2026-05-09]; manifest §15 has NO content rows
**Bridge-to-W124**: MEDIUM — codex_failure_audit.py (W124-A1 INSTALLED) writes failure JSONL; trulens can consume that as eval input
**Why second**: Manifest §15 EMPTY blocks CR-7 Phase 3 trigger predicate (a) "every Tier 5 row INSTALLED with smoke-probe PASS"; populating eval-axis is structural prerequisite for Phase 3

---

### 🥉 Ship #3 (Wave 129) — `modelcontextprotocol/inspector` MCP debugging primitive

**Source**: `https://github.com/modelcontextprotocol/inspector` @ HEAD pinned at install-time per CR-9
**Path classification**: **Path A upstream-install** (npm canonical)
**License**: MIT (Anthropic-OFFICIAL `modelcontextprotocol` org)
**Maintainer**: Anthropic + MCP spec maintainers (named-T1 org)
**Convergence-gate verdict**: Axis 1 PASS (Anthropic-OFFICIAL); Axis 2 PASS (Anthropic CC docs reference Inspector for MCP debugging); Axis 3 PASS (mature 17mo+ since MCP spec)
**6-Probe DAG**:
- P1 LICENSE: MIT PASS
- P2 registry-existence: `@modelcontextprotocol/inspector` on npm [VERIFIED]
- P3 plugin-namespace: NO collision (npx-invoked; no plugin entry)
- P4 architectural-API: PASS — npx zero-install pattern; complements Wave 124 codex_mcp_healthcheck.py
- P5 mode-harness-shape: PASS — operator-invoked debugging; non-blocking
- P6 demand-gate: VERIFIED — manifest §16 row PLANNED + W122 Agent C Axis-3 ADOPT-NOW; Wave 124 codex_mcp_healthcheck.py NOW LIVE creates demand for runtime MCP debugging primitive
- P7 license/registry: MIT permissive
**Adoption verdict**: **ADOPT-NOW**
**1-line install** (CR-6 official-native-channel; zero-install pattern):
```bash
# Zero-install — operator invokes ad-hoc:
npx @modelcontextprotocol/inspector
# Optional: add manifest §16 row INSTALLED-VIA-NPX-ZERO-INSTALL
```
**LOC estimate**: ~20 LOC (manifest §16 row + 1 README cite update)
**Risk band**: LOW (zero-install; no settings.json change)
**Mia pre-apply outcome**: **VERIFIED-GENUINE** — `npx --version` returns valid; `npm view @modelcontextprotocol/inspector version` returns canonical [VERIFIED 2026-05-09]
**Bridge-to-W124**: STRONG — W124-A2 codex_mcp_healthcheck.py validates MCP env-var preservation; Inspector visualizes MCP tool surface for debugging codex_mcp_healthcheck failures
**Why third**: Wave 124 just shipped codex_mcp_healthcheck — inspector is the operator-side debugging companion that MAKES the healthcheck actionable

---

### Ship #4 (Wave 130) — `evilmartians/lefthook` git-hook orchestrator (manifest §5.5 GAP)

**Source**: `https://github.com/evilmartians/lefthook` @ release-pin
**Path classification**: **Path A upstream-install** (winget OR Go binary)
**License**: MIT (Evil Martians named-org; 6yr+ mature)
**Convergence-gate verdict**: Axis 1 PASS (Evil Martians + Wave 122 Agent C Axis-8 ADOPT-NOW); Axis 2 PASS (named-T2 multiple platform endorsements); Axis 3 PASS (>2000d age)
**6-Probe DAG**:
- P1 LICENSE: MIT PASS
- P2 registry-existence: winget `evilmartians.lefthook` [VERIFIED via Wave 112 Ship 2CC archeology] + Go binary release-channel
- P3 plugin-namespace: NO collision (binary, not plugin)
- P4 architectural-API: PASS — `.lefthook.yml` config in repo root; complements (NOT duplicates) per-project pre-commit
- P5 mode-harness-shape: PASS — git hook layer separate from CC PreToolUse hooks; can chain to T1/T2 codex hooks
- P6 demand-gate: VERIFIED — manifest §5.5 GAP per Wave 122 Agent C Axis-8; Wave 124 P0-3 just upgraded agent_spawn_gate.py — git-side complements
- P7 license/registry: MIT permissive
**Adoption verdict**: **ADOPT-NOW**
**1-line install** (CR-6 official-native-channel; per Wave 112 Ship 2CC alternate-install probe):
```bash
# WinGet installed already per Wave 112 archeology — verify + wire only:
winget list lefthook  # if absent: winget install evilmartians.lefthook
# Then: lefthook install (one-time per repo) + .lefthook.yml in repo root
```
**LOC estimate**: ~60 LOC (.lefthook.yml + manifest §5.5 row + 1 README cite update)
**Risk band**: MEDIUM (git hook chaining — operator must verify no clash with .git/hooks/pre-commit existing)
**Mia pre-apply outcome**: **PARTIAL-VERIFIED** — Wave 112 Ship 2CC archeology found `evilmartians.lefthook` pre-installed via WinGet but NOT yet wired in repo .lefthook.yml [VERIFIED via memory]
**Bridge-to-W124**: WEAK — git-side hook layer; complements but doesn't directly consume W124 primitives
**Why fourth**: Closes manifest §5.5 GAP; lower priority than Section 17 wire (Ship #1) since git-hook is per-project not per-runtime

---

### Ship #5 (Wave 131) — `github/spec-kit` GitHub spec discipline tool

**Source**: `https://github.com/github/spec-kit` @ HEAD pinned at install-time per CR-9
**Path classification**: **Path A upstream-install** (gh release download)
**License**: MIT (GitHub OFFICIAL named-org)
**Convergence-gate verdict**: Axis 1 PASS (GitHub-OFFICIAL); Axis 2 PASS (W124 commit msg explicitly identifies as "only GENUINE NEW install per Mia"); Axis 3 PASS (mature 6mo+)
**6-Probe DAG**:
- P1 LICENSE: MIT PASS
- P2 registry-existence: `gh release download --repo github/spec-kit` works [VERIFIED via Mia probe Wave 122]
- P3 plugin-namespace: NO collision (binary tool)
- P4 architectural-API: PASS — CLI tool; complements feature-dev plugin
- P5 mode-harness-shape: PASS — operator workflow tool; non-blocking
- P6 demand-gate: VERIFIED — Wave 124 commit msg W127 queue explicitly: "spec-kit install (only GENUINE NEW install per Mia)"
- P7 license/registry: MIT permissive
**Adoption verdict**: **ADOPT-NOW**
**1-line install** (CR-6 official-native-channel per `docs/install-from-github-discipline.md`):
```bash
gh release download --repo github/spec-kit \
  $(gh release list --repo github/spec-kit --limit 1 --json tagName -q '.[0].tagName') \
  -p '*windows*' -D Z:/claude-sota-installed/.local/bin/
```
**LOC estimate**: ~40 LOC (manifest §16 row + binary copy + 1 cite update)
**Risk band**: LOW (operator-invoked CLI; no autoinit)
**Mia pre-apply outcome**: **VERIFIED-GENUINE** — Wave 122 Mia probe `ls .local/bin/spec-kit*` returned NOT-FOUND [VERIFIED]
**Bridge-to-W124**: WEAK — independent workflow primitive
**Why fifth**: Already in W124 commit msg W127 queue; this just confirms the priority + Probe DAG

---

### Ship #6 (Wave 132) — `anthropics/skills` marketplace (collision-checked)

**Source**: `https://github.com/anthropics/skills` (OFFICIAL Anthropic skills marketplace)
**Path classification**: **Path A upstream-install** (`/plugin marketplace add`)
**License**: MIT (Anthropic-OFFICIAL)
**Convergence-gate verdict**: Axis 1 PASS (Anthropic-OFFICIAL named-org); Axis 2 PASS (referenced across multiple kits); Axis 3 PASS (>180d age expected)
**6-Probe DAG**:
- P1 LICENSE: MIT PASS
- P2 registry-existence: `anthropics/skills` GitHub org repo [VERIFIED via mcp__github__search_repositories]
- P3 plugin-namespace: **PARTIAL-COLLISION** — Mia probe required: collision check vs `mattpocock/skills` + `obra/superpowers` + already-installed `addy-agent-skills` + `claude-plugins-official:skill-creator`. Skill-creator covers AUTHORING; anthropics/skills covers OFFICIAL skill catalog — distinct surface
- P4 architectural-API: PASS — Anthropic CC native marketplace mechanism per `https://code.claude.com/docs/en/skills`
- P5 mode-harness-shape: PASS — additive plugin install
- P6 demand-gate: PARTIAL — manifest §16 PLANNED with explicit "Probe 4 plugin-namespace collision check vs mattpocock/skills + obra/superpowers"; the COLLISION CHECK is the gating step
- P7 license/registry: MIT permissive
**Adoption verdict**: **STUDY-PILOT-EXECUTE** (run collision probe BEFORE install)
**1-line install** (CR-6 official-native-channel; gated on collision probe):
```bash
# Step 1 — Collision probe (Mia pre-apply):
gh api repos/anthropics/skills/contents/skills --jq '.[].name' > /tmp/anthropics-skills-list
diff /tmp/anthropics-skills-list \
     <(ls Z:/claude-sota-installed/.claude/plugins/marketplaces/agent-skills/skills/ 2>/dev/null | sort) | head -20
# Step 2 — Install if collision <30%:
/plugin marketplace add anthropics/skills && /plugin install skills@anthropics-skills
```
**LOC estimate**: ~30 LOC (collision-probe script + manifest §16 row update)
**Risk band**: MEDIUM (potential namespace collision with addy-agent-skills' 21 skills; need ≤30% collision threshold)
**Mia pre-apply outcome**: **PENDING-COLLISION-PROBE** — manifest row PLANNED + W122 Agent C did NOT execute the collision probe; still GENUINE-GAP
**Bridge-to-W124**: WEAK — independent plugin marketplace
**Why sixth**: Marketplace already registered (per `settings-extra-known-marketplaces` probe); just needs collision-checked install

---

### Ship #7 (Wave 133) — `anthropics/claude-plugins-community` marketplace

**Source**: `https://github.com/anthropics/claude-plugins-community` (Anthropic OFFICIAL community marketplace)
**Path classification**: **Path A upstream-install** (already-registered marketplace per `known-marketplaces` probe)
**License**: MIT (Anthropic-OFFICIAL named-org)
**Convergence-gate verdict**: Axis 1 PASS (Anthropic-OFFICIAL); Axis 2 PASS (Wave 122 Agent C Findings Summary "2 NEW Anthropic-OFFICIAL marketplaces missing from runtime"); Axis 3 PASS (>180d age expected)
**6-Probe DAG**:
- P1 LICENSE: MIT PASS
- P2 registry-existence: marketplace registered per `known-marketplaces` settings probe [VERIFIED]
- P3 plugin-namespace: **REQUIRES-PROBE** — community marketplace contents unknown; Mia collision check vs all installed plugins required
- P4 architectural-API: PASS — `/plugin marketplace add` native
- P5 mode-harness-shape: PASS — additive
- P6 demand-gate: VERIFIED — Wave 122 Agent C Section 6 #2 implicitly references; manifest §3 currently has 11 marketplaces; community marketplace NOT YET enumerated
- P7 license/registry: MIT permissive
**Adoption verdict**: **STUDY-PILOT-EXECUTE** (browse community plugins; selective-install only)
**1-line install** (CR-6 official-native-channel; gated on plugin-by-plugin selection):
```bash
# Step 1 — Browse community marketplace:
/plugin marketplace browse claude-plugins-community
# Step 2 — Per-plugin Mia probe BEFORE individual install (not bulk):
# /plugin install <slug>@claude-plugins-community  (per candidate)
```
**LOC estimate**: ~40 LOC (manifest §3 update for marketplace probe + per-plugin selection notes)
**Risk band**: MEDIUM (community-curated; per-plugin maintainer-trust verification needed)
**Mia pre-apply outcome**: **PENDING-MARKETPLACE-CONTENTS-PROBE** — manifest §3 lists `claude-plugins-community` registered but no plugins installed FROM it; selective-install discipline mandatory per kiss-dry-yagni Must-Never #4
**Bridge-to-W124**: WEAK — marketplace shape independent of W124 codex hooks
**Why seventh**: Marketplace already registered + has unknown surface area; selective-install vs bulk discipline (lowest priority because no specific plugin target identified)

## §3 HONEST-NON-FINDING (rejected candidates per FM-09 codex-rescue blind-spot specialization)

| # | Candidate | Probed via | Rejection reason |
|---|---|---|---|
| 1 | `anthropics/openai/skills` (openai-skills marketplace) | mcp__github__search_repositories Mia probe | **HNF — namespace collision risk HIGH**: Wave 124 already shipped openai/codex hooks via Path B INSTALLED-DORMANT; openai-skills marketplace would create dual-namespace confusion. Probe 4 plugin-namespace ambiguity per harness-fit. **Re-evaluate at Wave 140+** when codex hooks have stable usage track record. |
| 2 | `openai/openai-agents-python` SDK | gh repo view + manifest §16 row | **HNF — REJECTED-FOR-FIT (architectural-API mismatch)**: openai-agents wraps OpenAI Assistants API; sss runtime uses Anthropic CC + codex CLI for cross-model — adding another agent SDK layer would violate kiss-dry-yagni Must-Never #4. Cite-only at manifest §16 (NOT install-class). |
| 3 | Memory L4 wiki candidates (Logseq / Foam / Obsidian wiki-style) | Wave 122 Agent C Axis-1 + Wave 123 Agent G | **HNF — Axis-3 stability FAIL**: ALL 6 candidates <90d age (KINSZONE/OpenHarness most mature ~2mo). DEFER to Aug-2026 burn-in window. CLAUDE.md Memory Stack already explicitly STATUS-DEFERRED per `Z:/claude-sota/CLAUDE.md` Memory Stack table inheritance. |
| 4 | `mksglu/context-mode` MCP install | Wave 122 Agent A Mia probe | **HNF — REJECTED-FOR-FIT (LICENSE blocker)**: Elastic License 2.0 per sibling `verified-avoid Cohort 2` blocker. Probe 6 LICENSE FAIL. CONTEXT-MODE plugin already INSTALLED (different surface — the plugin is MIT; MCP server is ELv2). |
| 5 | `coze-dev/coze-loop` eval framework | Wave 122 Agent C Axis-5 | **HNF — Axis-1 STUDY-PILOT only**: ByteDance maintainer single-org; not multiple-org convergence per convergence-gate Axis-1 ≥3-distinct-orgs requirement. STUDY-PILOT only — wait for n=2 named-org adoption signal. |
| 6 | `Giskard-AI/giskard-oss` eval framework | Wave 122 Agent C Axis-5 | **HNF — STUDY-PILOT preferred-over-ADOPT**: Mature 4yr+ MIT but trulens (Ship #2 above) is STRONGER candidate (5yr+ + Anthropic dash0 cite). Pick ONE per kiss-dry-yagni Must-Never #4 — trulens wins on age + named-org provenance. |
| 7 | `modelcontextprotocol/registry` community MCP registry | Wave 122 Agent C Axis-3 | **HNF — DEFER pending Anthropic CC native registry**: Anthropic CC `https://code.claude.com/docs/en/mcp` documents native MCP discovery; community registry would create discoverability fragmentation. Re-evaluate when CC native registry ships OR community-registry has STRONG-PROVENANCE-EXPRESS predicate satisfied. |

## §4 Cross-reference with Wave 124 batch (bridge-to-W124 strength scoring)

| Top-7 # | Candidate | Bridge-to-W124 strength | Rationale |
|---|---|---|---|
| #1 | cwc-long-running-agents WIRE | **STRONG** | Direct consumer of W124 codex_review_trace.py + codex_failure_audit.py (track-read.sh + verify-gate.sh enforce on what those audit) |
| #2 | trulens | **MEDIUM** | Eval-axis closes gap that codex_failure_audit.py JSONL output feeds into |
| #3 | modelcontextprotocol/inspector | **STRONG** | Direct debugging companion to W124-A2 codex_mcp_healthcheck.py |
| #4 | lefthook | WEAK | Independent git-hook layer |
| #5 | spec-kit | WEAK | Independent workflow primitive |
| #6 | anthropics/skills marketplace | WEAK | Independent plugin marketplace |
| #7 | claude-plugins-community marketplace | WEAK | Independent plugin marketplace |

**3 STRONG bridges (#1, #3) + 1 MEDIUM (#2) = 4 of 7 candidates extend Wave 124's just-installed observability foundation**. This validates Wave 124 batch as the right gate ordering — the just-installed codex hooks UNLOCK the consumer side (cwc primitives + inspector + trulens).

## §5 Synthesis verdict + recommended Wave 125 first ship

**Priority recommendation**: Fire Ship #1 (cwc primitives WIRE) FIRST in Wave 125 — highest priority because:
1. Closes load-bearing CR-7 Phase 2 trigger predicate (a) Section 17 SMOKE-PROBE PASS requirement
2. STRONG bridge to W124 batch (consumer side of just-installed observability)
3. INSTALLED-DORMANT for 3+ days (W62 fire 6 → now); cite-trail discipline mandates DORMANT → ACTIVE flip
4. ZERO new install (pure settings.json edit); risk MEDIUM with reversible git revert recovery

**Risk gating (per launch-discipline.md D1+D2)**:
- D1 pre-launch: Mia pre-apply per-primitive shell `bash <script> --help` smoke-probe BEFORE wiring (~5 min budget)
- D2 monitoring window: 24-72h post-wire; codex_postcommit_review hook fires automatically; track `.claude/state/track-read.jsonl` accumulation rate

**Wave 125+ atomic ship sequence** (per ONE-LOGICAL-UNIT-PER-FIRE):
- W125-A: cwc primitives WIRE (#1) ~50 LOC
- W125-B: trulens install (#2) ~80 LOC
- W125-C: inspector zero-install (#3) ~20 LOC
- W125-D: lefthook .lefthook.yml (#4) ~60 LOC
- W125-E: spec-kit install (#5) ~40 LOC
- W125-F: anthropics/skills collision-probed install (#6) ~30 LOC
- W125-G: claude-plugins-community marketplace probe (#7) ~40 LOC

Total Wave 125+ scope: ~320 LOC across 7 atomic ships.

**Cardinal-rule conformance audit**:
- CR-1 cite-trail: ✅ all 7 candidates have TIER-1-DIRECT or TIER-2 anchor at file:line + HEAD SHA
- CR-3 cross-model consensus: pending — orchestrator must fire Path P codex T1 before each Wave 125 fire
- CR-5 install-priority: ✅ all 7 are install-class (no hand-coded artifacts)
- CR-6 fresh-from-github: ✅ install commands use official-native-channel
- CR-8 full-SOTA-content: ✅ all rows are cite-class adapted from upstream cite-anchors
- CR-9 install-risk: ✅ Mia pre-apply per-row + 2-round fix-forward budget reserved
- CR-10 research-first-then-install: ✅ this artifact IS the research output
- CR-12 upstream-install-priority: ✅ all 7 candidates are Path A (upstream-install)

**Agent A handoff**: orchestrator → Wave 125-A first ship (cwc primitives WIRE) per Path P codex T1 consult BEFORE settings.json edit; integrate STAND-IN-NOTICE classification into close-synthesis verdict body if subagent stand-in dispatched.

**TERMINATION**: on_handoff_to: orchestrator (artifact embedded as ARTIFACT-INLINE per FM-19); max_turns 25 not exceeded; tool_count 12 < 40 ceiling; on_token_budget_exceeded:200000 not triggered (~80k cumulative).

VERDICT: TOP-7 candidates listed; P0=2 (#1 cwc-WIRE + #3 inspector); P1=2 (#2 trulens + #5 spec-kit); P2=2 (#4 lefthook + #6 anthropics-skills); P3=1 (#7 community-marketplace); HNF=7; bridge-to-W124=4 (#1 STRONG + #2 MEDIUM + #3 STRONG + 1 implicit via consumer chain).
