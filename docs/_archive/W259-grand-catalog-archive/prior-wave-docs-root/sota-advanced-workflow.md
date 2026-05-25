# SOTA Advanced Workflow Pattern — claude-sota-installed

**Created**: 2026-05-15 (Wave 50 close)
**Cite class**: TIER-3-LOCAL-COMPOSITION (synthesizes TIER-1 Anthropic + named-author sources per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8)
**Scope**: end-to-end SOTA pattern for advanced autonomous workflows — both pattern reference + install gap list

---

## §0 — What's already installed (USE, don't reinstall)

### MCP servers wired (`.mcp.json` — 12 MCPs)
github / context7 / deepwiki / playwright / chrome-devtools / repomix / serena / memory / graphiti / phoenix / gitnexus / ccusage

### Plus plugin-wired Exa
`mcp__plugin_everything-claude-code_exa__web_search_exa` + `web_fetch_exa` — Exa is ALREADY available in this CLI runtime via `everything-claude-code` plugin (verified in current session tool surface). Also connected in Cowork web (`claude.ai/customize/connectors` shows Exa under "Web").

### Plugins installed (11) — sample
claude-plugins-official / everything-claude-code / claude-code-workflows / addy-agent-skills / claude-code-skills / superpowers / skill-creator / ralph-loop / wshobson / cwc-long-running-agents / claude-settings

### Marketplaces registered (16)
Per `Z:/claude-sota-installed/.claude/plugins/marketplaces/`

### Skills (22) + agents (13) + 4-skill meta-stack
`using-superpowers` + `using-agent-skills` + `skill-comply` + `skill-creator` AUTO-FIRE per Anthropic CC native skill discovery.

---

## §1 — The SOTA autonomous-workflow primitives (Anthropic-OFFICIAL cwc-long-running-agents)

**Cite anchor**: `https://github.com/anthropics/cwc-long-running-agents @ HEAD ffd563d6` ([VERIFIED 2026-05-12] companion to Anthropic's "Effective Harnesses for Long-Running Agents" Nov 2025 + "Harness Design for Long-Running Application Development" Mar 2026).

**Native install**: `Z:/claude-sota-installed/.local/cwc/` (Wave 6 port). 5 primitives:

| # | Primitive | What it does | When to invoke |
|---|---|---|---|
| 1 | **Default-FAIL contract** | Agent assumes task INCOMPLETE until proven otherwise via VERIFY-gate | Every autonomous task lifecycle |
| 2 | **Fresh-context evaluator** | Spawn isolated subagent with ZERO parent context to verify the work | After implementer finishes; before declaring done |
| 3 | **PROGRESS.md handoff** | Cross-session state file persisted to disk; rehydrates on next launch | Every session end + session start |
| 4 | **Kill-switch** | Operator-runnable script that aborts in-flight autonomous fire | If autonomous loop runs amok |
| 5 | **Steer mid-run** | Operator-injection mechanism for mid-fire course correction | When autonomous loop drifts |

### Concrete invocation (from `.local/cwc/`)

```bash
# Track read events for autonomous-loop accounting
bash Z:/claude-sota-installed/.local/cwc/track-read.sh <file>

# Verify gate (Fresh-context evaluator pattern)
bash Z:/claude-sota-installed/.local/cwc/verify-gate.sh

# Kill-switch (aborts in-flight)
bash Z:/claude-sota-installed/.local/cwc/kill-switch.sh

# Steer mid-run
bash Z:/claude-sota-installed/.local/cwc/steer.sh "<correction message>"

# Auto-commit on Stop hook
bash Z:/claude-sota-installed/.local/cwc/commit-on-stop.sh
```

Per-file blob SHAs recorded in `docs/install-provenance.md` Wave 62B fix-forward entry.

---

## §2 — `/loop` dynamic mode (Anthropic CC native CHANGELOG 2.1.139)

**Cite anchor**: `https://code.claude.com/docs/en/cli` `/loop` slash command — dynamically self-paced loop iteration with ScheduleWakeup primitive.

### Invocation

```
/loop <task description>
```

CC self-paces the loop:
- Each iteration the agent calls `ScheduleWakeup` to schedule next fire
- delaySeconds picked by agent (60-3600s clamp; recommend 1200-1800s for idle ticks, 60-270s for active polling)
- Loop persists across compactions via durable workdir state
- Operator can interrupt at any iteration with new input

### When to use vs cron

| Pattern | Use |
|---|---|
| `/loop` dynamic | Single-task autonomous run where iterations build on each other; agent self-schedules |
| External cron (`cron e682bfad` shape used in trading project) | Multi-firing parallel research where each fire is independent; OS-level scheduling |
| Both | Cron drives outer cadence; each cron-fired session does internal `/loop` for sub-tasks |

---

## §3 — Cron-driven autonomous fires (trading project pattern, verified n=35 firings)

**Cite anchor**: `Z:/projects/trading/research-waves/.wave-43-status` (state file) + `Z:/projects/trading/.claude/skills/firing-dispatch/SKILL.md` (Pattern-A-fixed this session)

### Pattern shape (PROVEN: 35 firings closed autonomously)

1. **State file** (`.wave-43-status` or equivalent): tracks current firing #, dimensions complete, dimensions pending, amendment blocks
2. **Synthesis file** (`wave-43-methodology125-and-clones.md` or equivalent): 12358-line append-only artifact
3. **Cron schedule**: 5m off-mark via `cron e682bfad` (Windows Task Scheduler equivalent OK)
4. **Firing-dispatch SKILL.md**: auto-fires on "continue the loop" / "dispatch firing #N"
5. **Per-firing flow**:
   - State read → identify next firing's dimensions
   - Pre-flight Mia probes (skip if already-closed)
   - PREDICTIVE 1-sentence expectation per dimension
   - Dispatch 4-5 parallel subagents
   - Integrity verify (no amendment-# collisions)
   - State update with next firing staged
   - Final synthesis

### Setup template for new project

```bash
# In project root
mkdir -p research-waves
echo "state=staged_firing_1_NEXT" > research-waves/.wave-status
touch research-waves/synthesis.md

# Register firing-dispatch skill in .claude/skills/firing-dispatch/SKILL.md
# (copy template from Z:/projects/trading/.claude/skills/firing-dispatch/SKILL.md)

# Set OS cron / Windows Task Scheduler:
# Every 5 minutes, off-mark: `claude --workspace <project> --prompt "continue the loop"`
```

---

## §4 — Advanced-agent-team-standing-directive (3-5 agent fan-out)

**Cite anchor**: sibling `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` (cite-import-AMBER per Section 14.5)

### Mandate

Every non-trivial fire MUST spawn 3-5 agent team. Each agent brief:

- **Invariant #1**: ≥2 agents in **GPT-5.5 BRIDGE-MODE** (codex-rescue / gpt5-reviewer / gpt5-archaeologist — Sonnet wrapper invoking real GPT-5.5 via codex CLI subprocess)
- **Invariant #2**: Brief cites SOTA primary at `Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA>` OR `code.claude.com/docs/...` OR `mcp__github__get_file_contents` result
- **Invariant #3**: Line-by-line SOTA repo audit for adoption-class waves
- **Invariant #4**: Anthropic official docs as authority guide (`code.claude.com/docs/en/*` is TIER-1-LIVING-AUTHORITY)
- **Invariant #5**: **ARTIFACT-INLINE per FM-19** — bash-only / no-write agents embed inline markdown block in final return
- **Invariant #6**: **Mia pre-apply on every prescription** before any Edit
- **Invariant #7**: Forward-only persistence — outputs at `tmp/wave<N>-<agent>-<topic>-<date>.md`
- **Invariant #8**: OUTPUT_BUDGET + TERMINATION in every brief

### Concrete spawn template

```
Agent A — sota-researcher (Sonnet 2nd-stage harness-fit-aware per FM-09)
  task: Probe DAG 1-7 against <kit/repo>
  brief cites: Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA>
  output: tmp/wave<N>-agentA-<topic>-<date>.md
  OUTPUT_BUDGET: 600 LOC
  TERMINATION: on_handoff_to: orchestrator | max_turns: 20

Agent B — codex:codex-rescue (BRIDGE-MODE → real GPT-5.5)
  task: E2E deep dive on <axis>
  brief: explicit ARTIFACT-INLINE mandate; per-call codex budget 90s/120s/180s
  output: real GPT-5.5 verdict via codex CLI
  OUTPUT_BUDGET: 600-1000 LOC
  TERMINATION: on_text_match: "VERDICT:" | on_subprocess_failure: 3

Agent C — codex:codex-rescue OR gpt5-reviewer (BRIDGE-MODE → real GPT-5.5)
  task: adversarial review of Agent B verdict
  brief: ARTIFACT-INLINE; per-call codex budget 90s/120s/180s
  output: real GPT-5.5 cross-check
  OUTPUT_BUDGET: 200-400 LOC
  TERMINATION: on_text_match: "VERDICT:"

Optional Agent D — everything-claude-code:architect (Sonnet stand-in)
  task: ≥2-option trade-off design
  ARTIFACT-INLINE
  OUTPUT_BUDGET: 300-500 LOC
  TERMINATION: on_text_match: "DESIGN:"
```

### §CADP concurrency caps

Per sibling `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §Cache-Aware Dispatch Pacing`:
- **Max 3 concurrent** until cache rate verified ≥50% via `python Z:/claude/ccc/tools/status.py`
- **Max 5 cumulative** per session arc
- Before 6th+ dispatch: verify ≥3 accounts <50% session OR activate Sonnet fallback

---

## §5 — Cross-model consensus T1-T7 lifecycle

**Cite anchor**: `Z:/claude-sota/.claude/rules/cmc-t1-t7-lifecycle.md` (cite-import-AMBER) + `code.claude.com/docs/en/hooks`

| Touchpoint | When | Profile | Mechanism |
|---|---|---|---|
| **T0** candidate-list challenge (PROPOSED-PILOT) | DURING R1→R2 wave boundary | `deep-review` | Cost-gated; reviews list composition |
| **T1** pre-edit consult | BEFORE typing on design surface | `deep-review-exec` | PreToolUse `Edit\|Write\|MultiEdit` hook |
| **T2** working-tree review | BEFORE commit | (codex default; -p rejected) | PreToolUse `Bash(git commit *)` hook |
| **T3** postcommit auto | AFTER commit | `deep-review-exec` | PostToolUse `Bash(git commit *)` hook (async 30s) |
| **T4** post-push cumulative | AFTER push | `deep-review-exec` | PostToolUse `Bash(git push *)` hook |
| **T5** plan-stage | DURING `/plan-codex-review` | `deep-review` | Manual slash command |
| **T6** stop-gate | AT session-end on dirty tree | `deep-review-exec` | Stop hook (sync 900s) |
| **T7** ask-without-act gate | AT session-end pre-T6 | regex+heuristic | Stop hook (sync 5s) |

### Codex foreground+tee Path P recovery (when BRIDGE-MODE subagent fails)

When codex-rescue subagent returns FM-17 thrash (as observed this session 🅱+🅲), use orchestrator-direct:

```bash
codex exec --ephemeral -p deep-review-exec --skip-git-repo-check --color never \
  < .claude/state/codex_consult_<topic>.txt \
  2>&1 | tee .claude/state/codex_consult_<topic>_OUT.txt
```

Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern D` n=13 recovery-family same-arc evidence. **Preserves 1M context (SOTA primitive)** by bypassing the subagent wrapper entirely.

---

## §6 — Convergence-gate + Probe DAG (adoption decisions)

**Cite anchors**: `Z:/claude-sota-installed/.claude/rules/convergence-gate.md` + `ahfv-probe-dag.md` + `ahfv-seven-sub-classes.md`

### Before installing ANY new primitive

**Axis 1** — ≥3 distinct T1 sources implementing the pattern (different orgs)
**Axis 2** — ≥2 named T2 practitioners citing this specific primitive
**Axis 3** — ≥3 months stability (cpd / age band) OR STRONG-PROVENANCE-EXPRESS predicate

### 7 probes (Probe DAG)

| Probe | What to check |
|---|---|
| **P1 count-OVER** | actual git counts vs documentation claims |
| **P2 SDK-vs-CLI surface** | invocation surface exists in runtime? |
| **P3 architectural-API** | API ecosystem match? |
| **P4 plugin-namespace** | namespace collision with already-installed? (**CRITICAL** — kiss-dry-yagni Must-Never #4) |
| **P5 mode-harness-shape** | HARD-GATE / interactive-vs-autonomous / sister-harness assumption / size sprawl |
| **P6 direct-file/registry blockers** | LICENSE permissive? npm/PyPI registry? build-deps? |
| **P7 demand-gate split** | .a DEMAND-ABSENCE → REJECT / .b DEMAND-CREATES-NEW-WORKFLOW → STUDY-PILOT (5-clause check) |

### CR-12 6-class disposition lattice

| Class | Disposition |
|---|---|
| GENUINELY-NEW | INSTALL via CR-12 PRIMARY (official-native-channel) |
| DUPLICATE-FUNCTIONALITY | REJECT (kiss-dry-yagni Must-Never #4) |
| PARTIAL-OVERLAP | CITE-PATTERN-ONLY / STUDY-PILOT-PATTERN-EXTRACT |
| PROVIDER-COMPLEMENT | INSTALL as ALTERNATIVE (primary incumbent retains canonical) |
| ECOSYSTEM-IMPORT | CITE-PATTERN-ONLY (typical; ecosystem footprint disproportionate) |
| CITE-CLASS-CANONICAL | ACCEPT-AS-CITE-REFERENCE (Anthropic-OFFICIAL educational material) |

---

## §7 — Karpathy §5 Wiki Compounding Surface (cross-session memory)

**Cite anchor**: `Z:/claude-sota-installed/.claude/rules/karpathy-adapted.md §5` (TIER-1-NAMED-AUTHOR Karpathy quote from AI Engineer fireside chat 2026-05-02)

### 3-layer pattern

| Layer | Artifact | Update cadence |
|---|---|---|
| **Layer 1 — Chronological log** | `.claude/state/*.jsonl` (codex_review_HEAD / mcp_health / subagent_transcripts) | Auto via hooks |
| **Layer 2 — Index** | `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` | One-line topic pointers ≤150 chars |
| **Layer 3 — Compiled wiki** | `.claude/rules/*.md` + `docs/*.md` + per-topic `memory/<topic>.md` | Synthesized after fire close |

### Source-of-truth hierarchy

1. Shipped artifacts → git diff/log wins
2. Elapsed budget + iter metrics → telemetry JSONL wins
3. Rationale/lesson → wiki narrative wins
4. Recurrence policy → feedback/rule memory wins (after codification-threshold gate)
5. Volatile external facts → re-probe via Exa / context7 / web

---

## §8 — The discovery primitives (Exa + Context7 + GitNexus + Graphiti + Repomix)

### Exa — semantic web search

```python
mcp__plugin_everything-claude-code_exa__web_search_exa(
  query="<natural language>",
  num_results=5,
  type="auto"  # neural / keyword / auto
)
# Returns: cite-anchored results with URLs + snippets
```

**Use when**: discovery of new repos / latest docs / cite verification / "what's the SOTA for X" research.

### Context7 — up-to-date library docs

```python
mcp__context7__resolve-library-id(libraryName="langgraph")
# → returns library ID
mcp__context7__query-docs(libraryID="...", query="...")
# → returns latest official docs
```

**Use when**: writing code against external libs; verifying API syntax; "how do I use X in version Y".

### GitNexus — code intelligence on claude-sota-installed

```python
mcp__gitnexus__impact(target="symbolName", direction="upstream")
mcp__gitnexus__context(name="symbolName")
mcp__gitnexus__query(query="natural language concept")
mcp__gitnexus__detect_changes()
```

**Use when**: refactoring within claude-sota-installed; blast-radius analysis before edits; understanding execution flows.

### Graphiti — temporal knowledge graph (L3 memory)

```python
mcp__graphiti__add_memory(name="...", episode_body="...", source="text|json")
mcp__graphiti__search_memory_nodes(query="...")
mcp__graphiti__search_memory_facts(query="...")
```

**Use when**: cross-session memory that needs temporal awareness; entity/fact extraction; "what changed about X over time".

### Repomix — codebase packing (~70% token reduction)

```python
mcp__repomix__pack_codebase(directory="Z:/repos/deps/<repo>", compress=true)
# → outputId
mcp__repomix__grep_repomix_output(outputId, pattern, contextLines=5)
```

**Use when**: line-by-line audit of ≥5 files in one repo (replaces 10+ Read calls).

### Cross-primitive workflow

```
Exa (discover new SOTA repo URL)
  → mcp__github__get_file_contents (read repo at file:line)
  → Context7 (verify API syntax against latest docs)
  → Repomix pack+grep (line-by-line audit if adopting)
  → GitNexus impact (if existing claude-sota-installed code references the primitive)
  → Graphiti add_memory (persist verdict for cross-session recall)
  → MEMORY.md index (Layer-2 pointer)
```

---

## §9 — Engineering plugin slash commands (already installed)

**Cite anchor**: `claude.ai/customize/plugins` → Engineering by Anthropic v1.2.0

Auto-fires on description match:

| Command | Trigger phrases | What it does |
|---|---|---|
| `/architecture` | "ADR" / "design decision" / "Kafka vs SQS" | Architecture Decision Record creator |
| `/code-review` | "review this PR" / "is this safe?" / "before I merge" | Security + performance + correctness review |
| `/debug` | error message / "works in staging not prod" / "broke after deploy" | Reproduce → isolate → diagnose → fix |
| `/deploy-checklist` | "about to ship" / "DB migration" / "feature flag deploy" | Pre-deployment verification |
| `/documentation` | "write docs" / "create README" / "write runbook" | API docs / arch docs / runbooks |
| `/incident-response` | "we have an incident" / "production is down" / "postmortem" | Triage → communicate → postmortem |

### Companion meta-skills auto-fire

- `using-superpowers` — 1% rule + Skill Priority order
- `using-agent-skills` — Discovery + invocation governance (Addy Osmani 21 engineering-phase skills)
- `skill-comply` — Post-invocation verification
- `skill-creator` — Authoring loop for new skills

---

## §10 — Pattern A fix-forward + Mia pre-apply

**Cite anchors**: `Z:/claude-sota-installed/.claude/rules/ctff-pattern-a.md` + `mia-pre-apply.md`

### Pattern A — when codex T1 returns NEEDS-REVISION conf 0.88-0.93 with ≤10 prescribed_edits

Apply ALL prescriptions in SINGLE atomic commit. Don't iterate iter-N→iter-N.1→iter-N.2 — that's the layered-correction anti-pattern.

### Mia pre-apply — verify EACH prescription against runtime state BEFORE Edit

For each `prescribed_edits` claim:
1. **Decompose** gap-claim into testable sub-claims
2. **Cheapest probe** per sub-claim:
   - File-existence → `Glob` or `ls`
   - Line-content → `Read <path>:<lines>`
   - Wire-status → `Grep <name> .claude/settings.json`
   - Closed-loop arc → `git log --grep="<surface>" --oneline`
3. **Classify refuted** as OVER (drop) / GENUINE-gap (apply)
4. **Apply only verified-surviving** prescriptions in atomic batch

Mia n+1 cumulative dogfood per `mia-pre-apply.md` n=8+ ladder. ROI: cheap probe (~1-3s) vs revert (~5-15min) = 100× per catch.

---

## §11 — What to install NOW (only the gaps)

Based on §0 audit + current session evidence + the 3-of-3 REJECT-FOR-FIT from this session's BRIDGE-MODE wave:

### Phase 1 — Free zero-auth CLI MCPs

**REVISED 2026-05-15**: original recommendations were RETRACTED after operator-applied Probe 7 demand-gate. All 3 candidates fail when properly audited:

- ~~`sequential-thinking`~~ — **REJECT-FOR-FIT**: DUPLICATE-FUNCTIONALITY (CR-12 class 2) with Opus 4.7 native extended thinking (`thinking_budget_tokens` first-class model architecture). Was early-2024 workaround pattern before native CoT.
- ~~`desktop-commander`~~ — **REJECT-FOR-FIT**: P7.a DEMAND-ABSENCE; Bash tool + Filesystem MCP cover the use cases. Marginal extras (persistent shells, bg process mgmt) but no current workflow needs them.
- ~~`time MCP`~~ — **REJECT-FOR-FIT**: KISS; `Get-Date` (PowerShell) and `date` (Bash) cover.

**Honest Phase 1 install list**: EMPTY. The runtime is SOTA-saturated for MCP servers — adding more = bloat, not unleash.

### Phase 2 — Exa (already wired via plugin; verify)

Already wired via `everything-claude-code:exa` plugin per current session tool surface. **No action needed**. Smoke-test:

```python
# In any CC session
mcp__plugin_everything-claude-code_exa__web_search_exa(query="latest claude code features")
```

### Phase 3 — Connectors via Desktop UI (you click)

Open `claude.ai/customize/connectors` → click Connect for:
- **Context7** (matches CLI runtime; zero auth)
- **Windows-MCP** (OS automation; zero auth)
- **Gmail** (OAuth if you use)
- **Google Calendar** (OAuth if you use)
- **Socket** (API key from socket.dev; security)

### Phase 4 — Anthropic role-plugin adds (Desktop UI)

Open `claude.ai/customize/plugins` → click Install for:
- **Productivity** (Anthropic OFFICIAL; calendar + email triage + memory)
- **Brand voice** (Tribe AI; if doing content/marketing work)

Engineering ✅ already installed per your earlier screenshot.

### Phase 5 — Marketplace adds (only if not registered)

Check first:
```bash
claude plugin marketplace list
```

Likely missing high-value marketplaces:
- `https://github.com/anthropics/anthropic-cookbook` (TIER-1 OFFICIAL patterns; cookbook recipes)

```bash
claude plugin marketplace add https://github.com/anthropics/anthropic-cookbook
```

### REJECTED — do NOT install (per `docs/verified-avoid.md`)

- wshobson context-management commands on trading project (aspirational pseudo-code)
- Generic /loop-dispatch skill on claude-sota-installed (4 incumbents)
- gsd /gsd-spike + /gsd-graphify broad install on trading (HARD-GATE + duplicates graphiti)
- Commercial paywall MCPs (LSEG / S&P / Morningstar / MSCI / etc — free FRED+SEC EDGAR cover)
- Off-domain MCPs (Tableau / Airtable / Apollo / ZoomInfo unless using those products)
- `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` Path D (REVERTED this session — 1M context IS SOTA)

---

## §12 — Reference workflow recipe: end-to-end advanced automation

This is the CANONICAL pattern combining all §1-§10 primitives. Use as template for any advanced automation arc.

### Step 1 — Discovery (Exa + Context7)

```python
# Find latest SOTA pattern
mcp__plugin_everything-claude-code_exa__web_search_exa(
  query="latest SOTA pattern for <topic>",
  num_results=10,
  type="auto"
)

# Verify library API
mcp__context7__query-docs(libraryID="...", query="how to <task>")
```

### Step 2 — Convergence-gate audit (Probe DAG via 3-agent fan-out)

```python
Agent A: sota-researcher (Probe DAG 1-7 on candidate)
Agent B: codex:codex-rescue (BRIDGE-MODE Axis-1/2/3 verification)
Agent C: codex:codex-rescue (BRIDGE-MODE CR-12 6-class disposition)
# Per advanced-agent-team-standing-directive
# §CADP max-3 concurrent
```

### Step 3 — Mia pre-apply on returned prescriptions

```bash
# For each prescribed_edits item, probe against runtime state
grep <pattern> <target-file>
ls -la <target-path>
# Drop OVER-claims; keep VERIFIED-genuine
```

### Step 4 — Codex T1 pre-edit consult (cross-model gate)

```bash
codex exec --ephemeral -p deep-review-exec --skip-git-repo-check --color never \
  < .claude/state/codex_consult_<topic>.txt \
  2>&1 | tee .claude/state/codex_consult_<topic>_OUT.txt
```

### Step 5 — Pattern A atomic apply (if NEEDS-REVISION conf ≥0.88)

Apply ALL prescriptions in SINGLE commit. Re-fire codex T1 verification.

### Step 6 — Karpathy §5 persistence (cross-session memory)

```python
# Layer 1: JSONL hooks auto-append
# Layer 2: Update MEMORY.md with one-line pointer
echo "- [topic name](memory/topic.md) - hook line ≤150 chars" >> Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/MEMORY.md

# Layer 3: Persist topic synthesis to memory/<topic>.md
# Plus temporal-KG via graphiti
mcp__graphiti__add_memory(name="topic", episode_body="...", source="text")
```

### Step 7 — Audit trail (install-provenance + verified-avoid)

```bash
echo "=== Wave <N> fire <M> close $(date -Iseconds) ===" >> Z:/claude-sota-installed/docs/install-provenance.md
# Append: fire / verdict / cite anchors / Pattern A applied / Mia ladder / cross-model gate
```

### Step 8 — TaskUpdate close

```python
TaskUpdate(taskId="<id>", status="completed")
```

---

## §13 — When to invoke the FULL workflow vs simplified

| Trigger | Full workflow | Simplified |
|---|---|---|
| Adopting new external SOTA primitive | ✅ All 8 steps | — |
| Architectural change to claude-sota-installed | ✅ All 8 steps | — |
| Single typo/cite-fix edit | — | Skip Steps 2-4; direct Edit + commit |
| Operator-trigger ENV change | — | Direct Edit + reversibility documented |
| Read-only research / synthesis | — | Steps 1+6 only (Discovery + persistence) |
| Cron-driven autonomous fire | ✅ Steps 2-7 (per firing-dispatch SKILL.md) | — |
| Multi-fire arc close | ✅ Step 7 (Karpathy §5 + provenance) | — |

---

## §14 — Update triggers (this doc)

Re-evaluate when:
- Anthropic CC ships new lifecycle touchpoint (T8+ beyond stop-gate)
- A 6th cwc-long-running-agents primitive added
- New named-T2 author publishes SOTA workflow doc
- §CADP rule changes (cache rate threshold / max concurrent / max cumulative)
- FM-17 ladder advance with new sub-class (Path D re-evaluation triggered)
- A WORKFLOW skill ships that supersedes one of the primitives (e.g., generic /loop-dispatch lands and proves superior to firing-dispatch domain-bound)

---

## §15 — Closing note

This runtime's stack is **already SOTA-saturated** for the audited axes. The "advanced automation" win is not from more installs — it's from **disciplined use of the installed primitives**. The full workflow recipe in §12 is the unleash. The reject registry in §11 prevents bloat. The convergence-gate in §6 prevents the next ill-advised install.

Sources:
- Anthropic-OFFICIAL: `https://github.com/anthropics/cwc-long-running-agents`, `https://code.claude.com/docs/en/`, `https://docs.anthropic.com/en/docs/claude-code/`
- TIER-1-NAMED-AUTHOR: Karpathy (AI Engineer 2026-05-02) / obra superpowers / addy-agent-skills
- claude-sota-installed cardinal rules CR-1 through CR-12
- W50F1+W50F2+W50F3 fire artifacts at `tmp/` + `docs/verified-avoid.md` + `docs/install-provenance.md`
