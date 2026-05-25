# SOTA Architecture Deep Audit + Optimization — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute the 3-fire plan from `docs/superpowers/specs/2026-05-12-sota-architecture-deep-audit-design.md` to audit + optimize the claude-sota-installed runtime against SOTA references with GPT-5.5 cross-model gate verification at every ship.

**Architecture:** 3 fires (Discovery+Audit / Convergence+Ship / Validate+Re-fire), each in a fresh CC session per FM-02 destructive race defense. Fire 1 dispatches 5 agents in parallel (sota-researcher + architect + gpt5-archaeologist BRIDGE-MODE + gpt5-reviewer BRIDGE-MODE + probe-dag-verifier). Fire 2 synthesizes via Mia probe + codex T1 deep-review per dimension + Pattern A apply + atomic commit. Fire 3 validates via re-run % metrics + smoke probes + T3 postcommit review.

**Tech Stack:** Anthropic CC (Opus 4.7) + codex CLI 0.130.0 (DEFAULT + deep-review-exec profiles) + Path P foreground+tee dispatch + 11 plugin marketplaces + 27+ TIER-1-DIRECT cite anchors + 18 TIER-2 sister-rule cite-imports + cwc-long-running-agents PROGRESS.md handoff + audit-action-loop Wire/Surface/Close/Re-fire.

---

## File Structure

**Created during execution** (per fire):

| File | Fire | Responsibility |
|---|---|---|
| `docs/sota-deep-audit-progress-2026-05-12.md` | Fire 1, 2, 3 | Append-only PROGRESS.md handoff per cwc-long-running-agents primitive; cross-fire fresh-context evaluator |
| `tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md` | Fire 1 | Agent A 9-cohort SOTA discovery + Probe DAG 1-7 verdicts (≤1000 LOC) |
| `tmp/wave-deep-audit-fire1-agentB-architecture-audit-2026-05-12.md` | Fire 1 | Agent B per-folder + per-dim audit + % metrics (≤1500 LOC) |
| `tmp/wave-deep-audit-fire1-agentC-archaeology-2026-05-12.md` | Fire 1 | Agent C BRIDGE-MODE hotspot + bus-factor + bug-magnet (≤800 LOC) |
| `tmp/wave-deep-audit-fire1-agentD-adversarial-2026-05-12.md` | Fire 1 | Agent D BRIDGE-MODE adversarial CR-1+5+7+8+9 attack (≤800 LOC) |
| `tmp/wave-deep-audit-fire1-agentE-probe-dag-2026-05-12.md` | Fire 1 | Agent E Probe DAG 1-7 (7 probes) per candidate + Mia pre-apply (≤1000 LOC) |
| `.claude/state/codex_consult_w-deep-audit-fire2-dim-<N>-<dim>.txt` + `_OUT.txt` | Fire 2 | Per-dimension codex T1 consult prompt + verdict (12 dimensions) |
| `tmp/wave-deep-audit-fire2-mia-synthesis-2026-05-12.md` | Fire 2 | Orchestrator Mia synthesis (decompose + probe + classify per FM-20) |
| `tmp/wave-deep-audit-fire2-ship-prescriptions-2026-05-12.md` | Fire 2 | Verified-GENUINE prescriptions queued for Pattern A apply |
| `docs/sota-installed-manifest.md` | Fire 2 | Updated with new install rows (per-row schema enforced) |
| `docs/install-provenance.md` | Fire 2 | Append entries per audit + install events |
| `tmp/wave-deep-audit-fire3-validate-2026-05-12.md` | Fire 3 | Re-run metrics + smoke probe outcomes + T3 review |

**Modified during execution**:
- `CLAUDE.md`, `CLAUDE.local.md`, `.claude/settings.json` — only via Pattern A apply with codex T1 verdict; bootstrap-only files per CR-5
- `.mcp.json` — new MCP server registrations per CR-12 PRIMARY install
- `.claude/plugins/installed_plugins.json` — auto-managed by `/plugin install` (not hand-edited)

---

## Fire 0 — Plan + Spec Bootstrap (THIS SESSION — ALREADY DONE)

- [x] **Step 0.1: Spec written** — `docs/superpowers/specs/2026-05-12-sota-architecture-deep-audit-design.md` (815 LOC after Pattern A apply)
- [x] **Step 0.2: Codex T1 verdict** — NEEDS-REVISION conf=0.91 + 10 prescribed_edits applied per Pattern A
- [x] **Step 0.3: Atomic commit** — `ff6f553 spec(brainstorming): SOTA architecture deep-audit + optimization design (3-fire wave)`
- [x] **Step 0.4: Plan written** — this file

---

## Fire 1 — Discovery + Audit (FRESH CC SESSION)

**Estimated wall-clock**: 2-4h. **Estimated tokens**: ~3-5M cumulative across 5 agents.

### Task 1.0: Pre-Fire Setup

**Files**: none modified

- [ ] **Step 1.0.1: Verify CC session is fresh + worktree-isolated**

Run:
```bash
echo "=== CC session id ===" && cat .claude/sessions/CURRENT_SESSION_ID 2>/dev/null || echo "no current session id file (normal)"
echo "=== git worktree status ==="; git worktree list 2>&1 | head -5
echo "=== current branch ==="; git rev-parse --abbrev-ref HEAD
echo "=== uncommitted changes (should be EMPTY for clean fire start) ==="; git status --short | head -10
```
Expected: clean working tree, on main or worktree branch, fresh session.

- [ ] **Step 1.0.2: Verify cardinal-rule-7 Phase 1 bootstrap exception status**

Run:
```bash
grep -n "defaultMode" .claude/settings.json
ls -la .claude/hooks/scripts/codex_t1_consult_gate.py 2>/dev/null && echo "T1 hook INSTALLED" || echo "T1 hook NOT-INSTALLED — Phase 1 bootstrap exception ACTIVE; cross-model gate satisfied via orchestrator-side codex exec foreground+tee per CR-3"
```

- [ ] **Step 1.0.3: Verify codex CLI + auth**

Run:
```bash
/z/claude-sota-installed/.local/npm/codex --version && echo "codex CLI ready"
ls /z/claude-sota-installed-state/.codex/auth.json && echo "codex auth ready"
```
Expected: codex-cli 0.130.0 + auth.json present.

- [ ] **Step 1.0.4: CADP rule 5 fleet probe (per parallel-agent-wave.md)**

Run:
```bash
python Z:/claude/ccc/tools/status.py 2>&1 | head -40 || echo "status.py NOT-INSTALLED — proceed with single-account caution"
```
Expected: ≥3 accounts <50% session usage. If not, defer Fire 1 OR activate Sonnet fallback per CLAUDE.local.md ENV (g) (commented out by default).

- [ ] **Step 1.0.5: Initialize PROGRESS.md handoff**

Use Write tool to create `docs/sota-deep-audit-progress-2026-05-12.md` with header:
```markdown
# SOTA Deep Audit Progress — 2026-05-12

## Fire 1 — Discovery + Audit

---
fire_id: fire-1
status: RUNNING
started_at: <ISO-8601 now>
agents_dispatched: []
artifacts: []
codex_verdicts: []
ship_decisions: []
next_fire_brief: docs/superpowers/plans/2026-05-12-sota-architecture-deep-audit.md §"Fire 2"
default_fail_reason: null
---
```

- [ ] **Step 1.0.6: Commit pre-fire setup**

Run:
```bash
git add -- docs/sota-deep-audit-progress-2026-05-12.md && git commit -o -F - -- docs/sota-deep-audit-progress-2026-05-12.md <<'EOF'
chore(sota-audit): Fire 1 pre-fire setup + PROGRESS.md initialized

Per docs/superpowers/plans/2026-05-12-sota-architecture-deep-audit.md §Fire 1 Task 1.0.
Status: RUNNING. Awaiting 5-agent dispatch.
EOF
```

### Task 1.1: Dispatch Agent A — sota-researcher

**Files**: `tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md` (Agent A creates)

- [ ] **Step 1.1.1: Spawn Agent A in single message (parallel with Tasks 1.2-1.5)**

Use Agent tool with `subagent_type: "sota-researcher"` (or `general-purpose` if sota-researcher not yet installed; check via `/agents` or `ls .claude/agents/`):

```
Agent({
  subagent_type: "sota-researcher",
  description: "9-cohort SOTA discovery",
  isolation: "worktree",
  prompt: |
    TASK: 9-cohort SOTA discovery + Z:/repos/deps inventory check + Probe DAG 1-7 per candidate.
    Bound: ≥4-source convergence per multi-source-discovery-breadth-discipline.

    CONTEXT (self-contained — you have ZERO parent context):
    - Spec: docs/superpowers/specs/2026-05-12-sota-architecture-deep-audit-design.md §4.1
    - Spec §3.7 SHARED INVARIANT BLOCK: ARTIFACT-INLINE persistence + cite anchors at file:line + HEAD SHA + Mia evidence + STAND-IN-NOTICE if BRIDGE-MODE
    - 16 user-listed Tier-1 baseline repos: ECC + CCBP/shanraisshan + superpowers + deepwiki-open + awesome-agentic-patterns + awesome-python + wshobson/agents + GitNexus + awesome-claude-plugins + awesome-llm-apps + andrej-karpathy-skills + mattpocock/skills + awesome-claude-code + alirezarezvani/claude-skills + get-shit-done + vercel-labs/agent-skills
    - 9-cohort menu (≥2-cohort fan-out mandate per CLAUDE.md §SOTA Repository Discovery):
      C1 GraphQL star+topic via mcp__plugin_everything-claude-code_github__search_repositories
      C2 arxiv via mcp__plugin_everything-claude-code_exa__web_search_exa
      C3 HuggingFace via mcp__plugin_everything-claude-code_exa__web_search_exa
      C4 PapersWithCode via WebFetch
      C5 named-author (Karpathy / Beck / Hunt / Thomas / Evans / Pocock / Boris Cherny / Addy Osmani)
      C6 awesome-list catalog crawl
      C7 conference proceedings via Exa
      C8 trending feeds via mcp__plugin_everything-claude-code_github__search_repositories sort:updated
      C9 stars-sorted-direct via mcp__plugin_everything-claude-code_github__search_repositories sort:stars
    - Probe DAG 1-7 mandate per Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md
    - CR-12 6-class lattice per candidate: GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL

    FILES:
    - Read: Z:/repos/deps/<each cited repo>/file:line
    - Read: .claude/plugins/marketplaces/*.json
    - Read: .claude/plugins/installed_plugins.json
    - Read: docs/sota-installed-manifest.md
    - Write: tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md

    CONSTRAINTS:
    - Mia pre-apply on EVERY prescription before flagging GENUINE per Z:/claude-sota/.claude/rules/mia-pre-apply.md
    - Cite each candidate at file:line + HEAD SHA (or mcp__plugin_everything-claude-code_github__get_file_contents blob-SHA result)
    - Honest n-counter audit (no claimed n without verifiable query + scope per port-note-discipline.md §5)
    - HONEST-NON-FINDING for cohorts returning no relevant evidence is HIGH-VALUE OUTPUT
    - Each candidate must have CR-9 install-risk assessment (version-pin + 2-round budget + REVERT precedent + sibling-bleed)

    OUTPUT: tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md
    OUTPUT_BUDGET: 1000 LOC
    TERMINATION: on_handoff_to: orchestrator | max_turns: 30 | terminationCondition: on_text_match: "ARTIFACT-INLINE:" | on_token_budget_exceeded: 800000

    DONE WHEN:
    Artifact contains:
    1. Per-cohort findings table (C1-C9) with ≥4-source convergence per candidate
    2. Tier-1 user-listed 16 repos: each with Probe DAG 1-7 verdict + CR-12 lattice classification
    3. Tier-2 new discoveries (≥10 candidates): same Probe DAG + CR-12 verdicts
    4. Tier-3 Z:/repos/deps inventory subset (~673 dirs): cite-anchor extraction summary
    5. Top-N install candidates ranked by ROI (with CR-12 disposition + axis-1+2+3 verdict)
    6. Top-N cite-extension candidates (no install needed)
    7. HONEST-NON-FINDING list

    HANDOFF:
    handoff_to: orchestrator
    output_mode: last_message
    artifacts: [tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md]
    verdict_one_line: "DONE: 9-cohort SOTA discovery complete; <N> install / <M> cite-extend / <K> HNF"

    Final return MUST start with `## ARTIFACT-INLINE: tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md` followed by the artifact body verbatim per fm19-readonly-guard-sidestep §M1.
  "
})
```

Expected: agent returns within 25-30 turns with ARTIFACT-INLINE persistence marker.

### Task 1.2: Dispatch Agent B — architect

**Files**: `tmp/wave-deep-audit-fire1-agentB-architecture-audit-2026-05-12.md`

- [ ] **Step 1.2.1: Spawn Agent B in same message as Tasks 1.1, 1.3, 1.4, 1.5**

```
Agent({
  subagent_type: "architect",  # or general-purpose if not installed
  description: "Per-folder + per-dim audit",
  isolation: "worktree",
  prompt: |
    TASK: Recursive folder walk + per-file SOTA-cite verification + per-dimension architecture audit.
    Output: % metrics per dimension + cleanup queue + Cardinal-rule-8 conformance per file.

    CONTEXT (self-contained — you have ZERO parent context):
    - Spec: docs/superpowers/specs/2026-05-12-sota-architecture-deep-audit-design.md §4.2 + §3.7 SHARED INVARIANT BLOCK
    - Architecture surface = .claude/* + docs/* + tools/* + bin/* + scripts/* + manifests/* + .codex/* + CLAUDE*.md
    - Dimensions: cardinal rules + hooks + rules + agents + skills + commands + settings + MCP + tools + scripts + docs + manifests
    - CR-8 status taxonomy: ADAPTED-FROM-SOTA / NOVEL-DOCUMENTED-EXCEPTION / PENDING-AUDIT
    - Stale ref classes: FORWARD-REF without target / INSTALLED-AMBER / NOT-INSTALLED claims that are stale / Marker Decay candidates
    - 4 orthogonal numeric metrics per spec §1: % classified / % CR-8-conformant / % stale closed / % stale queued

    FILES:
    - Read: .claude/**/*.{md,py,sh,json,yaml,yml,toml}
    - Read: docs/**/*.md
    - Read: tools/**/*.{ps1,sh,py}
    - Read: bin/**/*.{cmd,sh,ps1}
    - Read: manifests/**/*.{yaml,yml}
    - Read: .codex/**/*
    - Read: CLAUDE*.md
    - Write: tmp/wave-deep-audit-fire1-agentB-architecture-audit-2026-05-12.md

    CONSTRAINTS:
    - Verify EVERY cite anchor (file:line + HEAD SHA) by direct Read where local
    - Marker Decay: re-verify [VERIFIED yyyy-mm-dd] markers older than 60 days per evidence-policy.md
    - Honest classification: NOT-INSTALLED / INSTALLED / INSTALLED-AMBER / STAGED / PLANNED / RETIRED
    - Per-folder summary table with 4 orthogonal metrics
    - Cleanup queue ranked by priority (HIGH-severity first; 2 OPEN T3 findings prioritized)

    OUTPUT: tmp/wave-deep-audit-fire1-agentB-architecture-audit-2026-05-12.md
    OUTPUT_BUDGET: 1500 LOC
    TERMINATION: on_handoff_to: orchestrator | max_turns: 35 | terminationCondition: on_text_match: "ARTIFACT-INLINE:" | on_token_budget_exceeded: 1000000

    DONE WHEN:
    Artifact contains:
    1. Per-dimension audit table: total files, % classified, % CR-8-conformant, % stale closed, % stale queued
    2. Per-folder breakdown (recursive): files audited, drift surfaced, cleanup priority
    3. Stale reference queue with cleanup-class taxonomy (REVERT / RETIRE / RECITE)
    4. CR-8 status column candidates (rows missing in manifest §Section 0)
    5. CR-7 Phase 2 trigger predicate matrix (which Tier rows hold each predicate)
    6. Open HIGH-severity findings status (the 2 OPEN T3 findings + any new)
    7. Smoke-probe pass rate per installed row
    8. % SOTA-classified across architecture surface (target ≥95%)
    9. % stale closed (target ≥80%) + % stale queued (target ≤10%)

    HANDOFF:
    handoff_to: orchestrator
    output_mode: last_message
    artifacts: [tmp/wave-deep-audit-fire1-agentB-architecture-audit-2026-05-12.md]
    verdict_one_line: "DONE: per-folder audit complete; <X>% classified / <Y>% CR-8-conformant / <Z>% stale closed"

    Final return MUST start with `## ARTIFACT-INLINE: ...` per §3.7.
  "
})
```

### Task 1.3: Dispatch Agent C — gpt5-archaeologist BRIDGE-MODE

**Files**: `tmp/wave-deep-audit-fire1-agentC-archaeology-2026-05-12.md`

- [ ] **Step 1.3.1: Spawn Agent C in same message as Tasks 1.1, 1.2, 1.4, 1.5**

```
Agent({
  subagent_type: "gpt5-archaeologist",  # or general-purpose with codex-rescue brief
  description: "Hotspot + bus-factor + bug-magnet",
  isolation: "worktree",
  prompt: |
    TASK: Per-file hotspot + bus-factor + bug-magnet audit via REAL GPT-5.5 BRIDGE-MODE.
    Path P / Pattern D recipe (DEFAULT codex profile) for high-volume short-call class.

    CONTEXT (self-contained):
    - Spec: docs/superpowers/specs/2026-05-12-sota-architecture-deep-audit-design.md §4.3 + §3.7 SHARED INVARIANT BLOCK
    - BRIDGE-MODE: agent runs as Sonnet wrapper invoking codex CLI subprocess
    - Per-call codex time-budget MANDATE: 90s default / 120s normal cap / 180s with explicit reason (FM-17.d defense)
    - Path P / Pattern D recipe (per Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern D):
      `timeout 300 /z/claude-sota-installed/.local/npm/codex exec --skip-git-repo-check --color never < <prompt>.txt 2>&1 | tee <prompt>_OUT.txt`
    - DEFAULT profile (NO -p deep-review-exec; medium effort + read-only sandbox; appropriate for high-volume short-call class)
    - Foreground+tee NOT background (FM-17.d defense)

    FILES:
    - Read: .claude/**/*.{md,py,sh,json}
    - Read: tools/**/*.ps1
    - Read: scripts/**/*.py
    - Bash: git log + git blame for hotspot scoring
    - Write: tmp/wave-deep-audit-fire1-agentC-archaeology-2026-05-12.md

    CONSTRAINTS:
    - Hotspot scoring via `git log --since='90 days ago' --pretty=oneline -- <file> | wc -l` × authors
    - Bus-factor: `git log --pretty=format:'%an' -- <file> | sort -u | wc -l` for unique authors
    - Bug-magnet: `git log --grep='fix|bug|hotfix|patch' --oneline -- <file> | wc -l` / total commits
    - REAL GPT-5.5 verdict required for top-N hotspot files (cross-model gate per CR-3)
    - STAND-IN-NOTICE if BRIDGE-MODE runs as Sonnet stand-in only (mandatory per cross-model-consensus.md §Env-funneled stand-in disclosure)

    OUTPUT: tmp/wave-deep-audit-fire1-agentC-archaeology-2026-05-12.md
    OUTPUT_BUDGET: 800 LOC
    TERMINATION: on_handoff_to: orchestrator | max_turns: 25 | terminationCondition: on_text_match: "ARTIFACT-INLINE:" | on_subprocess_failure: 3 | on_token_budget_exceeded: 600000

    DONE WHEN:
    Artifact contains:
    1. Top-20 hotspot files ranked by score (commits × authors × recency)
    2. Bus-factor breakdown per top-20 (single-author % + risk class)
    3. Bug-magnet scoring per top-20 (fix-commit ratio + recent fix density)
    4. GPT-5.5 risk-stratified findings (REAL GPT-5.5 verdict per Path P)
    5. Pre-edit recommendations per hotspot
    6. Cross-model gate satisfaction status (FULL via Path P / PARTIAL via STAND-IN-NOTICE / FAILED-policy-blocked)

    HANDOFF:
    handoff_to: orchestrator
    output_mode: last_message
    artifacts: [tmp/wave-deep-audit-fire1-agentC-archaeology-2026-05-12.md]
    verdict_one_line: "ARCHAEOLOGY: 20 hotspots ranked; <X> high-risk; cross-model gate <STATUS>"

    Final return MUST start with `## ARTIFACT-INLINE: ...` per §3.7.
  "
})
```

### Task 1.4: Dispatch Agent D — gpt5-reviewer BRIDGE-MODE

**Files**: `tmp/wave-deep-audit-fire1-agentD-adversarial-2026-05-12.md`

- [ ] **Step 1.4.1: Spawn Agent D in same message as Tasks 1.1, 1.2, 1.3, 1.5**

```
Agent({
  subagent_type: "gpt5-reviewer",  # or general-purpose with codex-rescue brief
  description: "Adversarial CR audit",
  isolation: "worktree",
  prompt: |
    TASK: Adversarial review against current architecture. "What would break this under autonomous loop?"
    Per-cardinal-rule conformance attack via REAL GPT-5.5 BRIDGE-MODE.

    CONTEXT (self-contained):
    - Spec: docs/superpowers/specs/2026-05-12-sota-architecture-deep-audit-design.md §4.4 + §3.7 SHARED INVARIANT BLOCK
    - Adversarial framing per Z:/repos/deps/superpowers/skills/requesting-code-review/code-reviewer.md:64-93 @ HEAD f2cbfbef "Be adversarial. Be thorough. No compliments — just the problems."
    - Attack surfaces: CR-1 cite-trail / CR-3 cross-model gate / CR-5 install-priority / CR-7 graduated unleash predicate / CR-8 SOTA-content invariant / CR-9 install-risk / CR-10 research-first / CR-11 META-process / CR-12 upstream-priority
    - Hidden error / silent fallback hunt per ECC silent-failure-hunter skill
    - Path P / Pattern D recipe per §4.3 (DEFAULT profile foreground+tee)
    - Per-call codex 90-180s budget (FM-17.d defense)

    FILES:
    - Read: CLAUDE.md (12 cardinal rules)
    - Read: CLAUDE.local.md (env block)
    - Read: .claude/settings.json (permissions + hooks + env)
    - Read: .claude/rules/*.md (when present)
    - Read: .claude/agents/*.md (when present)
    - Read: tools/eee.ps1 (launcher)
    - Read: All sibling cite-import-AMBER rows (verify CR-12 last-resort gate)
    - Write: tmp/wave-deep-audit-fire1-agentD-adversarial-2026-05-12.md

    CONSTRAINTS:
    - REAL GPT-5.5 verdict shape: VERDICT: APPROVE | NEEDS-REVISION | REJECT + conf + prescribed_edits
    - Cite findings at file:line + HEAD SHA
    - Rank by severity (P0 / P1 / P2 / P3) per cross-model-consensus.md §Severity taxonomy mapping
    - Identify: (a) cite-class drift, (b) Marker Decay candidates, (c) silent fallback locations, (d) CR-7 predicate gaps, (e) install-class violations
    - STAND-IN-NOTICE if BRIDGE-MODE runs as Sonnet only

    OUTPUT: tmp/wave-deep-audit-fire1-agentD-adversarial-2026-05-12.md
    OUTPUT_BUDGET: 800 LOC
    TERMINATION: on_handoff_to: orchestrator | max_turns: 25 | terminationCondition: on_text_match: "ARTIFACT-INLINE:" | on_subprocess_failure: 3 | on_token_budget_exceeded: 600000

    DONE WHEN:
    Artifact contains:
    1. Per-cardinal-rule attack verdict (CR-1 through CR-12)
    2. Hidden error / silent fallback findings (ranked P0-P3)
    3. CR-7 graduated unleash predicate audit per Tier
    4. Architecture-vs-SOTA gaps (compared against ECC + CCBP + superpowers + cwc-long-running-agents)
    5. Top-N prescribed_edits ranked by severity
    6. STAND-IN-NOTICE if BRIDGE-MODE runs as Sonnet only

    HANDOFF:
    handoff_to: orchestrator
    output_mode: last_message
    artifacts: [tmp/wave-deep-audit-fire1-agentD-adversarial-2026-05-12.md]
    verdict_one_line: "VERDICT: <APPROVE/NEEDS-REVISION/REJECT> conf=<N>; <X> P0 / <Y> P1 findings; cross-model gate <STATUS>"

    Final return MUST start with `## ARTIFACT-INLINE: ...` per §3.7.
  "
})
```

### Task 1.5: Dispatch Agent E — probe-dag-verifier

**Files**: `tmp/wave-deep-audit-fire1-agentE-probe-dag-2026-05-12.md`

- [ ] **Step 1.5.1: Spawn Agent E in same message as Tasks 1.1-1.4**

```
Agent({
  subagent_type: "general-purpose",  # explicit Probe DAG mandate in prompt
  description: "Probe DAG 1-7 per candidate",
  isolation: "worktree",
  prompt: |
    TASK: For each candidate from Agent A: run full 7-probe harness-fit DAG (Probes 1 through 7) per Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md.
    Mia pre-apply on every prescription before flagging GENUINE.

    CONTEXT (self-contained):
    - Spec: docs/superpowers/specs/2026-05-12-sota-architecture-deep-audit-design.md §4.5 + §3.7 SHARED INVARIANT BLOCK
    - Probe 1 count-OVER (verify claimed counts via direct queries)
    - Probe 2 SDK-vs-CLI surface (verify invocation surface exists in claude-sota-installed)
    - Probe 3 architectural-API (verify Anthropic-API vs OpenAI-API match)
    - Probe 4 plugin-namespace (CRITICAL — kiss-dry-yagni Must-Never #4 duplicate-functionality)
    - Probe 5 mode-harness-shape (HARD-GATE / interactive vs autonomous / size-sprawl / meta-skill harness)
    - Probe 6 direct-file/registry blockers (LICENSE / README badge / npm/PyPI registry direct-existence)
    - Probe 7 demand-gate split (.a DEMAND-ABSENCE → REJECT / .b DEMAND-CREATES-NEW-WORKFLOW → 5-clause check)

    PRECONDITION: Read tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md (Agent A's artifact). If Agent A artifact NOT YET present, BLOCK and return verdict_one_line: "BLOCKED: Agent A artifact dependency missing".

    FILES:
    - Read: tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md (Fire 1 dependency)
    - Read: .claude/plugins/installed_plugins.json (Probe 4 plugin-namespace check)
    - Read: .claude/plugins/marketplaces/*.json (Probe 4 marketplace coverage)
    - Read: .claude/agents/ + .claude/skills/ + .claude/rules/ + .claude/commands/ (Probe 4 sub-classes)
    - mcp__plugin_everything-claude-code_github__search_repositories (Probe 1 count-OVER + Probe 6 registry)
    - WebFetch npm/PyPI/cargo registries (Probe 6 direct-existence)
    - Write: tmp/wave-deep-audit-fire1-agentE-probe-dag-2026-05-12.md

    CONSTRAINTS:
    - Each candidate gets explicit Probe 1-7 verdict (PASS / FAIL / N/A)
    - REJECT-FOR-FIT requires ALL probes evaluated with reason
    - Mia pre-apply: cheap probe (Glob/Grep/Read) before flagging GENUINE
    - HONEST-NON-FINDING is high-value output (REJECT-FOR-FIT verdicts save downstream cycles)
    - Per §3.7 shared invariant: every claim cites <path>:<line-range> @ HEAD <SHA> (or remote blob-SHA via mcp__plugin_everything-claude-code_github__get_file_contents); every prescription includes [VERIFIED via <probe>] MUST-USE marker

    OUTPUT: tmp/wave-deep-audit-fire1-agentE-probe-dag-2026-05-12.md
    OUTPUT_BUDGET: 1000 LOC
    TERMINATION: on_handoff_to: orchestrator | max_turns: 30 | terminationCondition: on_text_match: "ARTIFACT-INLINE:" | on_token_budget_exceeded: 700000

    DONE WHEN:
    Artifact contains:
    1. Per-candidate Probe 1-7 verdict matrix
    2. CR-12 6-class lattice classification per candidate
    3. ADOPT-NOW / STUDY-PILOT / REJECT-FOR-FIT verdict per candidate
    4. Mia probe outcomes per prescription
    5. Cross-validation against Agent A findings (catches abstract-pattern-reasoning blind-spot per FM-09)

    HANDOFF:
    handoff_to: orchestrator
    output_mode: last_message
    artifacts: [tmp/wave-deep-audit-fire1-agentE-probe-dag-2026-05-12.md]
    verdict_one_line: "VERDICT: <X> ADOPT / <Y> STUDY-PILOT / <Z> REJECT-FOR-FIT; <K> Mia OVERs caught"

    Final return MUST start with `## ARTIFACT-INLINE: ...` per §3.7.
  "
})
```

### Task 1.6: All 5 Agents Dispatched — Wait + Persist Artifacts

- [ ] **Step 1.6.1: Wait for all 5 task-notifications**

The orchestrator will receive `<task-notification>` messages from each agent as they complete. Do NOT poll — agents auto-notify on completion.

- [ ] **Step 1.6.2: Persist each ARTIFACT-INLINE block per agent return**

For each agent return:
1. Extract content under `## ARTIFACT-INLINE: tmp/wave-deep-audit-fire1-agent<X>-*-2026-05-12.md` heading
2. Use Write tool to persist to that path
3. Verify file exists: `ls -la tmp/wave-deep-audit-fire1-agent<X>-*-2026-05-12.md`

Expected: 5 artifact files persisted.

- [ ] **Step 1.6.3: Update PROGRESS.md Fire 1 status**

Use Edit tool on `docs/sota-deep-audit-progress-2026-05-12.md` to update Fire 1 YAML block:
- status: COMPLETE
- completed_at: <ISO-8601>
- agents_dispatched: [list of 5 with status + verdict_one_line + tokens_used]
- artifacts: [5 paths with sha256]
- next_fire_brief: docs/superpowers/plans/2026-05-12-sota-architecture-deep-audit.md §"Fire 2"

- [ ] **Step 1.6.4: Atomic commit Fire 1 outputs**

Run:
```bash
git add -- docs/sota-deep-audit-progress-2026-05-12.md tmp/wave-deep-audit-fire1-agent*-2026-05-12.md && git commit -o -F - -- docs/sota-deep-audit-progress-2026-05-12.md tmp/wave-deep-audit-fire1-agent*-2026-05-12.md <<'EOF'
chore(sota-audit): Fire 1 COMPLETE — 5-agent parallel wave artifacts landed

Per docs/superpowers/plans/2026-05-12-sota-architecture-deep-audit.md §Fire 1.
PROGRESS.md updated. Awaiting Fire 2 dispatch.
EOF
```

---

## Fire 2 — Convergence + Ship (FRESH CC SESSION)

**Estimated wall-clock**: 1-2h. **Precondition**: Fire 1 COMPLETE per PROGRESS.md.

### Task 2.0: Pre-Fire Setup

- [ ] **Step 2.0.1: STATE PROBE per FM-21 queue-time-prompt-freeze defense**

Run:
```bash
echo "=== git HEAD ==="; git log -1 --oneline
echo "=== Fire 1 status from PROGRESS.md ==="; grep -A 1 "fire_id: fire-1" docs/sota-deep-audit-progress-2026-05-12.md | head -5
echo "=== Fire 1 artifacts present ==="; ls -la tmp/wave-deep-audit-fire1-agent*-2026-05-12.md 2>/dev/null
```
Expected: Fire 1 status=COMPLETE, all 5 artifacts present.

- [ ] **Step 2.0.2: If Fire 1 not COMPLETE, BLOCK and escalate**

If status != COMPLETE OR <5 artifacts present: STOP. Report to operator. Do NOT proceed.

- [ ] **Step 2.0.3: Initialize Fire 2 PROGRESS.md block**

Use Edit tool to append to `docs/sota-deep-audit-progress-2026-05-12.md`:
```yaml
---
fire_id: fire-2
status: RUNNING
started_at: <ISO-8601 now>
agents_dispatched: []
artifacts: []
codex_verdicts: []
ship_decisions: []
next_fire_brief: docs/superpowers/plans/2026-05-12-sota-architecture-deep-audit.md §"Fire 3"
default_fail_reason: null
---
```

### Task 2.1: Orchestrator Mia Synthesis

**Files**: `tmp/wave-deep-audit-fire2-mia-synthesis-2026-05-12.md`

- [ ] **Step 2.1.1: Read all 5 Fire 1 artifacts**

Use Read tool on each:
- tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md
- tmp/wave-deep-audit-fire1-agentB-architecture-audit-2026-05-12.md
- tmp/wave-deep-audit-fire1-agentC-archaeology-2026-05-12.md
- tmp/wave-deep-audit-fire1-agentD-adversarial-2026-05-12.md
- tmp/wave-deep-audit-fire1-agentE-probe-dag-2026-05-12.md

- [ ] **Step 2.1.2: Decompose each prescription into sub-claims + Mia probe**

For each prescription in each artifact:
1. Decompose into independent sub-claims per Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Within-cycle revision discipline
2. Pick cheapest probe per Subclaim-type discriminator (UPSTREAM / OPERATIONAL / CATEGORY / SHAPE)
3. Verify EACH sub-claim INDEPENDENTLY at synthesis time per Z:/claude-sota/.claude/rules/mia-pre-apply.md
4. Classify: VERIFIED-GENUINE / OVER-DROP / HONEST-NON-FINDING

- [ ] **Step 2.1.3: Write synthesis artifact**

Use Write tool to create `tmp/wave-deep-audit-fire2-mia-synthesis-2026-05-12.md` with structure:
```markdown
# Fire 2 Mia Synthesis — 2026-05-12

## Per-Agent Prescription Triage

### Agent A prescriptions (N total)
| Sub-claim | Probe | Outcome | Disposition |
|---|---|---|---|
| [decomposed sub-claim] | Glob/Grep/Read/WebFetch | VERIFIED/OVER/HNF | GENUINE/DROP/HNF-document |

### Agent B prescriptions
[same shape]

### Agent C prescriptions
[same shape]

### Agent D prescriptions
[same shape]

### Agent E prescriptions
[same shape]

## VERIFIED-GENUINE Queue (for Pattern A apply)
- [list ranked by severity + ROI]

## OVER-DROP List (with refutation evidence)
- [list with [VERIFIED via <probe>] markers]

## HONEST-NON-FINDING Documentation
- [cohorts/candidates returning no findings]
```

- [ ] **Step 2.1.4: Commit Mia synthesis**

Run:
```bash
git add -- tmp/wave-deep-audit-fire2-mia-synthesis-2026-05-12.md && git commit -o -F - -- tmp/wave-deep-audit-fire2-mia-synthesis-2026-05-12.md <<'EOF'
chore(sota-audit): Fire 2.1 Mia synthesis complete

Per Z:/claude-sota/.claude/rules/mia-pre-apply.md + synthesis-layer-verify.md.
<N> VERIFIED-GENUINE / <M> OVER-DROP / <K> HONEST-NON-FINDING.
EOF
```

### Task 2.2: Codex T1 Deep-Review Per Dimension

**Files**: `.claude/state/codex_consult_w-deep-audit-fire2-dim-<N>-<dim>.txt` + `_OUT.txt` (per dimension)

- [ ] **Step 2.2.1: Build per-dimension T1 consult prompts**

For each dimension in: cardinal_rules / hooks / rules / agents / skills / commands / settings / mcp / tools / scripts / docs / manifests:

Use Write tool to create `.claude/state/codex_consult_w-deep-audit-fire2-dim-<N>-<dim>.txt` with:
- Prescriptions queued for this dimension from Mia synthesis
- Cardinal-rule conformance state for files in this dimension
- Primary-source cites at file:line + HEAD SHA
- 4 audit dimensions (text soundness / cite-class / sister-rule integration / forward usability)
- JSON-strict verdict format at EOF

- [ ] **Step 2.2.2: Fire each codex T1 sequentially via Pattern A primary shape**

For each `.claude/state/codex_consult_w-deep-audit-fire2-dim-<N>-<dim>.txt`:

Run:
```bash
timeout 480 /z/claude-sota-installed/.local/npm/codex exec --ephemeral -p deep-review-exec --color never --skip-git-repo-check \
  < .claude/state/codex_consult_w-deep-audit-fire2-dim-<N>-<dim>.txt \
  2>&1 | tee .claude/state/codex_consult_w-deep-audit-fire2-dim-<N>-<dim>_OUT.txt
```
Expected: JSON-strict verdict at EOF within 240-480s.

- [ ] **Step 2.2.3: Read each verdict EOF FIRST per discipline**

For each verdict file:
```bash
wc -l .claude/state/codex_consult_w-deep-audit-fire2-dim-<N>-<dim>_OUT.txt
grep -nE "VERDICT:|^F-[0-9]|conf=|APPROVE|NEEDS-REVISION|REJECT" .claude/state/codex_consult_w-deep-audit-fire2-dim-<N>-<dim>_OUT.txt | tail -20
tail -200 .claude/state/codex_consult_w-deep-audit-fire2-dim-<N>-<dim>_OUT.txt
```

### Task 2.3: Cleanup Ship (REVERT/RETIRE per closed-loop §Disposition)

**Files**: depends on what's surfaced; document each in `tmp/wave-deep-audit-fire2-cleanup-2026-05-12.md`

- [ ] **Step 2.3.1: Address 2 OPEN HIGH-severity T3 findings**

For each HIGH-severity finding from prior arc:
- Read the original T3 verdict file (`.claude/state/codex_review_HEAD_<sha>.txt`)
- Apply closed-loop §Disposition severity-gate:
  - Concrete verification mitigation present? → ACCEPT-WITH-DOC (Outcome A)
  - HIGH unresolved + no mitigation? → REVERT-AND-REMOVE (Outcome B)
  - Owner explicit accept? → MANUAL-OVERRIDE (Outcome C, tracked metric)

- [ ] **Step 2.3.2: Retire stale FORWARD-REFs**

Run:
```bash
grep -rn "FORWARD-REF.*<filename>" .claude/ docs/ 2>/dev/null | head -20
grep -rn "<filename>.*FORWARD-REF" .claude/ docs/ 2>/dev/null | head -20
```
For each match: rewrite to current status per port-note-discipline.md §3 Discipline 2.

- [ ] **Step 2.3.3: Resolve INSTALLED-AMBER rows**

For each INSTALLED-AMBER row in `docs/sota-installed-manifest.md`:
- Run smoke probe per row's Smoke Probe column
- PASS → convert to INSTALLED
- FAIL → convert to STAGED with reason; document in `docs/install-provenance.md`

- [ ] **Step 2.3.4: Atomic commit cleanup ships**

For each cleanup decision, atomic single-shell commit:
```bash
git add -- <files> && git commit -o -F - -- <files> <<'EOF'
fix(sota-audit): Fire 2.3 cleanup — <REVERT/RETIRE/RECITE>

[Per finding details + cite to T3 verdict]
EOF
```

### Task 2.4: Install Ship (CR-12 PRIMARY upstream-install)

- [ ] **Step 2.4.1: For each VERIFIED-GENUINE install candidate**

From Mia synthesis VERIFIED-GENUINE queue, classify per CR-12 6-class lattice:
- GENUINELY-NEW → install via PRIMARY path (CR-6 official native channel)
- DUPLICATE-FUNCTIONALITY → REJECT-FOR-FIT (kiss-dry-yagni Must-Never #4)
- PARTIAL-OVERLAP → CASE-BY-CASE
- PROVIDER-COMPLEMENT → install as ALTERNATIVE
- ECOSYSTEM-IMPORT → CITE-PATTERN-ONLY OR STUDY-PILOT-NARROW-WITH-VENV-ISOLATION
- CITE-CLASS-CANONICAL → ACCEPT-AS-CITE-REFERENCE (no install)

- [ ] **Step 2.4.2: Pre-install REVERT precedent check (CR-9)**

For each install candidate, run:
```bash
git -C Z:/claude-sota log --all --oneline -- '<sibling-target-path>' 2>/dev/null | head -20
```
If REVERT-AND-REMOVE precedents found: do NOT install (per CR-9 + feedback_check_gitignore_before_porting.md "harness has decided" pattern).

- [ ] **Step 2.4.3: Install via official native channel per CR-6**

For each surviving candidate, pick the CR-6 install command:
```bash
# npm
npm install -g <pkg>@<version>  # version-pin per CR-9; @latest with explicit acknowledgment

# Plugin marketplace (Anthropic OFFICIAL)
/plugin marketplace add <official-marketplace-url>
/plugin install <pkg>@<marketplace>

# GitHub release
gh release download --repo <owner>/<repo> $(gh release list --repo <owner>/<repo> --limit 1 --json tagName -q '.[0].tagName')

# git clone canonical
git clone --depth 1 https://github.com/<owner>/<repo>.git <dest>

# uvx
uvx --refresh <pkg>

# cargo
cargo install <pkg>

# docker
docker pull <image>:<version>
```

- [ ] **Step 2.4.4: Per-install smoke probe**

Run candidate's smoke probe (e.g., `<cli> --version`, `/plugin list | grep <name>`, `docker ps | grep <container>`).
PASS → mark INSTALLED in manifest. FAIL → mark INSTALLED-AMBER + 2-round fix-forward budget per CR-9.

- [ ] **Step 2.4.5: Atomic commit each install**

```bash
git add -- .mcp.json .claude/settings.json docs/sota-installed-manifest.md docs/install-provenance.md && git commit -o -F - -- .mcp.json .claude/settings.json docs/sota-installed-manifest.md docs/install-provenance.md <<'EOF'
feat(install): <pkg>@<version> via <channel> per CR-12 PRIMARY

Cite: <upstream repo file:line + HEAD SHA>
Smoke probe: PASS [VERIFIED via <command>]
Cardinal rules: CR-1, CR-5, CR-6, CR-8, CR-9, CR-12 satisfied
T1 verdict: <approve/needs-revision conf=N> [VERIFIED via .claude/state/codex_consult_w-deep-audit-fire2-dim-<N>-<dim>_OUT.txt]
Cross-model gate: FULL via Path P deep-review-exec
EOF
```

### Task 2.5: Manifest + Provenance Updates

- [ ] **Step 2.5.1: Update sota-installed-manifest.md per-row schema**

For each new install row:
- Status / Smoke Probe / CR-8 status / Cite anchor / Install command / Version / Last verified date
- Per CLAUDE.md §"Bootstrap-only files" — manifest is install-provenance source-of-truth

- [ ] **Step 2.5.2: Append install-provenance.md per audit + install event**

Use audit-action-loop.md Wire/Surface/Close discipline. Each entry = timestamp + event + cite + verdict.

### Task 2.6: T3 Postcommit Verdicts

- [ ] **Step 2.6.1: For each Fire 2 commit, T3 verdict**

When Tier 1a T3 hook INSTALLED: auto-fires on commit; verdict at `.claude/state/codex_review_HEAD_<sha8>.txt`.

Phase 1 bootstrap exception: orchestrator-side substitute:
```bash
SHA=$(git log -1 --format=%H | cut -c1-8)
timeout 240 /z/claude-sota-installed/.local/npm/codex exec --ephemeral -p deep-review-exec --color never --skip-git-repo-check \
  -c "Review commit $SHA: $(git show --stat -- .) -- emit JSON verdict at EOF: APPROVE | NEEDS-REVISION | REJECT + conf + findings + recommendation" \
  2>&1 | tee .claude/state/codex_review_HEAD_${SHA}.txt
```

- [ ] **Step 2.6.2: Pattern A fix-forward for any NEEDS-REVISION conf ≥0.85**

Per codex-t1-fix-forward-pattern.md §Pattern A: apply ALL prescriptions in single atomic commit.

- [ ] **Step 2.6.3: Update PROGRESS.md Fire 2 status**

Edit `docs/sota-deep-audit-progress-2026-05-12.md` Fire 2 YAML block:
- status: COMPLETE
- completed_at: <ISO-8601>
- ship_decisions: [list with commit_sha + type + cardinal_rules_satisfied + cross_model_gate_status]

---

## Fire 3 — Validate + Re-fire (FRESH CC SESSION)

**Estimated wall-clock**: ~1h. **Precondition**: Fire 2 COMPLETE per PROGRESS.md.

### Task 3.1: Re-run % Metrics (Agent B redux)

**Files**: `tmp/wave-deep-audit-fire3-validate-2026-05-12.md`

- [ ] **Step 3.1.1: STATE PROBE per FM-21**

Run:
```bash
echo "=== git HEAD ==="; git log -1 --oneline
echo "=== Fire 2 status ==="; grep -A 1 "fire_id: fire-2" docs/sota-deep-audit-progress-2026-05-12.md | head -5
```
Expected: Fire 2 status=COMPLETE.

- [ ] **Step 3.1.2: Re-fire Agent B with same brief**

Use Agent tool with `subagent_type: "architect"` and the SAME brief as Fire 1 Task 1.2 (re-runs per-folder + per-dim audit + % metrics).

- [ ] **Step 3.1.3: Compare pre/post % metrics**

For each metric (% classified / % CR-8-conformant / % stale closed / % stale queued):
- Pre-Fire-2 value (from Fire 1 Agent B)
- Post-Fire-2 value (from this Fire 3 Agent B redux)
- Delta

Document in `tmp/wave-deep-audit-fire3-validate-2026-05-12.md`.

### Task 3.2: Smoke Probe Every Install Row

- [ ] **Step 3.2.1: For each row in sota-installed-manifest.md with Status: INSTALLED OR INSTALLED-AMBER**

Run that row's Smoke Probe column command.
PASS → INSTALLED-AMBER → INSTALLED.
FAIL → INSTALLED → STAGED (rollback per CR-9 2-round budget).

- [ ] **Step 3.2.2: Document smoke probe outcomes**

Append to `docs/install-provenance.md`:
```markdown
## 2026-05-12 — Fire 3 Smoke Probe Validation

| Row | Smoke probe | Result | New status |
|---|---|---|---|
| ... | ... | PASS/FAIL | INSTALLED/STAGED |
```

### Task 3.3: T3 Postcommit Verdict Review

- [ ] **Step 3.3.1: For every Fire 2 commit, read T3 verdict**

```bash
git log --since="<Fire 2 start time>" --pretty=format:%H | while read SHA; do
  SHA8=$(echo "$SHA" | cut -c1-8)
  if [ -f ".claude/state/codex_review_HEAD_${SHA8}.txt" ]; then
    echo "=== ${SHA8} ==="
    grep -nE "verdict.*APPROVE|verdict.*NEEDS-REVISION|verdict.*REJECT|conf" ".claude/state/codex_review_HEAD_${SHA8}.txt" | head -5
  else
    echo "${SHA8}: NO T3 VERDICT (Phase 1 bootstrap exception OR T3 hook not yet INSTALLED)"
  fi
done
```

- [ ] **Step 3.3.2: Pattern A fix-forward for unresolved NEEDS-REVISION**

For each NEEDS-REVISION conf ≥0.85 not yet addressed: apply Pattern A fix-forward in single atomic commit.

### Task 3.4: HONEST-NON-FINDING Documentation

- [ ] **Step 3.4.1: Aggregate HNFs from all 3 fires**

Sources:
- Fire 1 Agent A HNF list (cohorts returning no relevant evidence)
- Fire 1 Agent E REJECT-FOR-FIT verdicts (with reason)
- Fire 2 Mia synthesis HONEST-NON-FINDING entries
- Fire 3 smoke probe FAILs

- [ ] **Step 3.4.2: Queue 3-month re-evaluation candidates**

Per `Z:/claude-sota/.claude/rules/convergence-gate.md` update triggers:
- HNFs that may flip to ADOPT-NOW with more upstream maturity
- REJECT-FOR-FIT candidates with active ecosystem evolution
- Marker Decay candidates needing re-verification by 2026-08-12

Document in `docs/sota-deep-audit-3month-requeue-2026-08-12.md`.

- [ ] **Step 3.4.3: Update PROGRESS.md Fire 3 + arc status**

Edit `docs/sota-deep-audit-progress-2026-05-12.md`:
- Fire 3 status: COMPLETE
- Arc summary block: total fires / total ships / total HNFs / final % metrics / cross-model gate satisfaction rate

- [ ] **Step 3.4.4: Final atomic commit**

```bash
git add -- docs/sota-deep-audit-progress-2026-05-12.md tmp/wave-deep-audit-fire3-*.md docs/sota-deep-audit-3month-requeue-2026-08-12.md && git commit -o -F - -- docs/sota-deep-audit-progress-2026-05-12.md tmp/wave-deep-audit-fire3-*.md docs/sota-deep-audit-3month-requeue-2026-08-12.md <<'EOF'
chore(sota-audit): Fire 3 COMPLETE — 3-fire arc closed

Per docs/superpowers/plans/2026-05-12-sota-architecture-deep-audit.md.
Pre/post % metrics + smoke probe outcomes + HNF documentation + 3-month re-eval queue landed.
EOF
```

---

## Fire 2.5 (OPTIONAL) — Advanced Automation Adapter Ship

**When to invoke**: only if Fire 2 install ship surfaced sota_audit_stop_continue.py + sota_audit_progress_hook.py as GENUINELY-NEW + GENUINE-need (per CR-5 + CR-12 classification per spec §3.3 + §3.4).

### Task 2.5.1: Install thin adapter scripts

- [ ] **Step 2.5.1.1: CR-5 install-priority sota-research first**

Use Agent tool with `subagent_type: "sota-researcher"`:
```
TASK: Probe upstream for stop-hook-auto-continue and audit-action-loop adapter implementations.
BOUND: Probe DAG 1-7 + CR-12 6-class lattice.
RETURN: install-class equivalent OR HONEST-NON-FINDING.
```

- [ ] **Step 2.5.1.2: If HONEST-NON-FINDING, install thin adapter as bootstrap**

Per CR-5: hand-coding forbidden EXCEPT for bootstrap. Adapter scripts qualify ONLY if upstream parity probe returned HNF AND hook adapter is deemed bootstrap-class. Otherwise REJECT and use direct PROGRESS.md handoff.

---

## Self-Review (per writing-plans skill step "Self-Review")

**Spec coverage**: Every section of `docs/superpowers/specs/2026-05-12-sota-architecture-deep-audit-design.md` mapped to a task:
- §1 success criteria → Task 3.1.3 + 3.4.3 metric reporting
- §2 3-Fire Architecture → Fires 1 + 2 + 3 task structure
- §3 Advanced Automation Layer → §3.7 SHARED INVARIANT BLOCK referenced in Tasks 1.1-1.5; PROGRESS.md handoff in Tasks 1.0.5/1.6.3/2.0.3/2.6.3/3.4.3; Fire 2.5 for adapter scripts
- §4.1-4.5 Agent briefs → Tasks 1.1-1.5 spawn each agent verbatim
- §5.1-5.6 Fire 2 substeps → Tasks 2.1-2.6
- §6.1-6.4 Fire 3 substeps → Tasks 3.1-3.4
- §7 Failure Modes → defenses baked into each Task (atomic single-shell commit / per-call codex 90-180s budget / Path P foreground+tee / ARTIFACT-INLINE / Mia probe / STATE PROBE)
- §8 Cardinal Rule Conformance → cited in commit messages + per-task references
- §9 + 9.1 Progress tracking → Tasks 1.0.5, 1.6.3, 2.0.3, 2.6.3, 3.4.3 update PROGRESS.md per YAML schema
- §10 Repos in scope → embedded in Agent A brief Task 1.1
- §11 Cross-references → cited inline in tasks
- §12 Anti-patterns → followed throughout
- §13 Update triggers → §"Self-Review" + §3.4.2 3-month requeue
- §14 Self-review trail + Pattern A → Fire 0 commit ff6f553

**Placeholder scan**: ✅ no TBD/TODO/incomplete sections; every Bash command + Agent prompt is concrete and executable.

**Type consistency**: ✅ artifact paths consistent across tasks (tmp/wave-deep-audit-fire<N>-agent<X>-*-2026-05-12.md); codex consult paths consistent (.claude/state/codex_consult_w-deep-audit-fire<N>-*); commit message subjects consistent (chore(sota-audit)/fix(sota-audit)/feat(install)).

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-12-sota-architecture-deep-audit.md`. Two execution options per writing-plans skill terminal state:

**1. Subagent-Driven (recommended)** — orchestrator dispatches a fresh CC subagent per task, reviews between tasks, fast iteration. **REQUIRED SUB-SKILL**: superpowers:subagent-driven-development.

**2. Inline Execution** — orchestrator executes tasks in this session using executing-plans, batch execution with checkpoints. **REQUIRED SUB-SKILL**: superpowers:executing-plans.

**For this 3-fire arc**: Option 1 strongly recommended because:
- Each fire is best executed in a fresh CC session per FM-02 destructive race defense (cross-fire isolation)
- 5-agent parallel wave in Fire 1 inherently uses subagent-driven dispatch
- PROGRESS.md handoff per cwc-long-running-agents primitive is designed for cross-session execution
- Cross-session FM-02 (c) destructive race n=3+ recurrence in current arc per memory state — fresh session per fire MANDATORY

---

**End of implementation plan.**

**Provenance**: superpowers:brainstorming → spec-write → spec-self-review → user-review → codex T1 (NEEDS-REVISION conf=0.91) → Pattern A apply → atomic commit (ff6f553) → superpowers:writing-plans (this file) → execution handoff (next: user picks Option 1 or Option 2).
