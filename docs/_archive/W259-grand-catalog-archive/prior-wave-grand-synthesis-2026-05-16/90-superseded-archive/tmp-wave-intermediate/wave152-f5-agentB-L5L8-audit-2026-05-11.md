# Wave 152 Fire 5 Agent B — L5-L8 Architecture Gap Audit

**Date**: 2026-05-11
**Agent**: B (general-purpose Sonnet)
**HEAD**: `bac0152ec8d7ff5383c7b9394723347a67123ee2`
**Reference doc**: `Z:/claude-sota-installed/docs/sota-research-architecture-2026-05-11.md` (AUTHORITATIVE; 11073 bytes)
**Scope**: L5 Selection / L6 Knowledge / L7 Construction / L8 Feedback
**Persistence**: ARTIFACT-INLINE per FM-19 readonly-guard sidestep; orchestrator persists post-completion

---

## 1. Probe outputs per layer

### L5 SELECTION (4 prescribed components)

| Probe | Command | Result |
|---|---|---|
| comparison-matrix.md template | `ls Z:/claude-sota-installed/docs/ | grep comparison-matrix` + `find docs -maxdepth 3 -name 'comparison*'` | **EMPTY** — no comparison-matrix.md template present |
| log4brains CLI | `which log4brains` + `npm ls -g | grep log4brains` | **NOT INSTALLED** — `no log4brains in PATH`; npm-global has no log4brains entry |
| docs/adr/ directory | `ls Z:/claude-sota-installed/docs/adr/` | **DOES NOT EXIST** — `cannot access /docs/adr/: No such file or directory` |
| Weighted rubric (S25/M20/C25) | `grep -rl 'S25/M20/C25\|weighted rubric\|Security 25' .claude/ docs/` | **PRESENT** — `Z:/claude-sota-installed/.claude/rules/multi-source-discovery-breadth-discipline.md` matched (1 file); related-doc only (not codified at rule layer for selection scoring); manifest weighting rubric still external |
| Tie-breaker discipline | `grep -rl 'bus-factor\|Best-Practices-Badge tier\|time-decay' .claude/rules/` | **PRESENT** — `Z:/claude-sota-installed/.claude/rules/convergence-gate.md` (bus-factor token) + `cross-model-consensus.md` (related decay) — partial coverage; tie-breaker DAG not formalized into ADR-write flow |

### L6 KNOWLEDGE (5 prescribed components)

| Probe | Command | Result |
|---|---|---|
| planning-with-files skill | `ls .claude/skills/ | grep planning` + `claude mcp list | grep planning` | **EMPTY** — `.claude/skills/` empty per CR-5 install-priority + 0 MCP planning servers |
| OthmanAdi/planning-with-files in plugin marketplaces | `find .claude/plugins/marketplaces -iname 'planning-with-files*' -o -iname 'task_plan*' -o -iname 'findings*' -o -iname 'progress*'` | **NOT BUNDLED** — no planning-with-files SKILL or templates in 14 marketplaces; OthmanAdi/planning-with-files NOT installed |
| .specify/memory/constitution.md | `ls .specify/memory/` + `cat .specify/memory/constitution.md \| head -20` | **DOES NOT EXIST** — `cannot access /.specify/: No such file or directory` — Spec-Kit `specify init` NEVER RUN against this runtime root |
| docs/adr/*.md | `ls docs/adr/` | **DOES NOT EXIST** — `cannot access /docs/adr/: No such file or directory` (same as L5) |
| docs/research/comparisons/*.md | `ls docs/research/comparisons/` | **DOES NOT EXIST** — `cannot access /docs/research/: No such file or directory` |
| mem0 (optional) | `pip show mem0ai` + `claude mcp list | grep mem0` | **NOT INSTALLED** — pip has no mem0ai package; 0 MCP mem0 servers |
| task_plan.md / findings.md / progress.md | `find Z:/claude-sota-installed -maxdepth 5 -name 'task_plan.md' -o -name 'findings.md' -o -name 'progress.md'` | **EMPTY** — none of 3 prescribed template artifacts present anywhere in runtime |
| specify CLI installed via uv tool | `uv tool list | grep specify` + `which specify` | **PARTIAL** — `specify-cli v0.8.7` installed via uv tool; `specify` binary on PATH; **but NOT initialized** (`.specify/` dir absent) |

### L7 CONSTRUCTION (6 prescribed components)

| Probe | Command | Result |
|---|---|---|
| Superpowers plugin | `find .claude/plugins -path '*superpowers*' -name 'plugin.json'` | **INSTALLED** — `.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/.claude-plugin/plugin.json` present (v5.1.0; canonical Anthropic marketplace) |
| Spec-Kit CLI | `uv tool list \| grep specify` + `which specify` | **INSTALLED-AMBER** — `specify-cli v0.8.7` available + binary on PATH; **not initialized** in this runtime root (`.specify/` absent → cannot run `/speckit.constitution → .plan → .tasks → .implement` workflow) |
| Context7 MCP | `claude mcp list \| grep context7` + `grep context7 .mcp.json` | **INSTALLED + CONNECTED** — `plugin:everything-claude-code:context7: npx -y @upstash/context7-mcp@2.1.4 - ✓ Connected` |
| Playwright MCP | `claude mcp list \| grep playwright` | **INSTALLED + CONNECTED** — `plugin:everything-claude-code:playwright: npx -y @playwright/mcp@0.0.69 --extension - ✓ Connected` |
| Apify MCP | `claude mcp list \| grep apify` + `grep apify .mcp.json` | **NOT INSTALLED** — `apify` returns no rows in MCP list or .mcp.json |
| skill-creator skill | `find .claude/plugins/marketplaces -path '*skill-creator*' -name 'SKILL.md'` | **INSTALLED** — present in 2 marketplaces: `anthropic-agent-skills/skills/skill-creator/SKILL.md` + `claude-plugins-official/plugins/skill-creator/skills/skill-creator/SKILL.md` |

### L8 FEEDBACK (5 prescribed components)

| Probe | Command | Result |
|---|---|---|
| Native OTel | `grep -niE 'otel\|opentelemetry\|CLAUDE_CODE_ENABLE_TELEMETRY' .claude/settings.json` | **INSTALLED + FULLY WIRED** — settings.json:34-42 ENABLED: `CLAUDE_CODE_ENABLE_TELEMETRY=1` + `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` + `OTEL_TRACES_EXPORTER=otlp` + `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:14317` + `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=grpc` + `OTEL_RESOURCE_ATTRIBUTES=openinference.project.name=eee` + `OTEL_LOG_TOOL_DETAILS=1` + `OTEL_LOG_USER_PROMPTS=1` (Wave 109 Ship 2P-pilot-REVISED → Phoenix container :14317) |
| Langfuse (self-hosted) | `docker ps -a \| grep langfuse` + `pip show langfuse` | **INSTALLED-AMBER** — `langfuse==3.14.4` python SDK installed via pip; Docker container NOT running per `docker ps` empty filter (operationally LIVE in sibling per manifest L406 "PLANNED — operationally LIVE in sibling per services table"); MCP wire absent; CC OTel sink wired to Phoenix (:14317) NOT Langfuse |
| Splitrail (cross-CLI cost) | `which splitrail` + `cargo install --list \| grep splitrail` + `npm ls -g \| grep splitrail` | **NOT INSTALLED** — no splitrail in PATH; no cargo install; no npm-global entry |
| claude_telemetry (Tech Nick AI) | `pip show claude-telemetry` + `pip show claude_telemetry` | **NOT INSTALLED** — `WARNING: Package(s) not found: claude-telemetry` |
| Post-mortem ADRs (review cadence) | `ls docs/adr/ \| grep -iE 'post.mortem\|retro'` | **DOES NOT EXIST** — same as L5/L6 (docs/adr/ absent) → no post-mortem ADR mechanism yet |
| Quarterly recursion schedule | `grep -rl 'quarterly\|90.day\|architecture.recursion' .claude/ docs/` | **NOT-INSTALLED as schedule** — token "quarterly" appears in 9 docs (`install-from-github-discipline.md`, `02-gap-matrix.md`, `03-sota-target-architecture.md`, `fire-28/03-research-architecture-improvement.md` etc.) AS DESIGN REFERENCE; **no scheduler/cron entry, no PostToolUse audit hook, no automation** — quarterly recursion EXISTS AS CONCEPT but NOT AS MECHANISM |

---

## 2. Per-layer scoring table

| Component | INSTALLED | AMBER | PLANNED | NOT-INSTALLED |
|---|---|---|---|---|
| **L5.1** comparison-matrix.md template |  |  | ✓ |  |
| **L5.2** log4brains MADR CLI |  |  |  | ✓ |
| **L5.3** weighted rubric (S25/M20/C25/Co15/L10/P5) |  | ✓ (tokens scattered) |  |  |
| **L5.4** tie-breaker discipline (bus-factor / Badge / time-decay / blast-radius) |  | ✓ (partial cite anchors) |  |  |
| **L6.1** OthmanAdi/planning-with-files |  |  |  | ✓ |
| **L6.2** .specify/memory/constitution.md |  |  | ✓ (CLI ready, not init'd) |  |
| **L6.3** docs/adr/*.md |  |  |  | ✓ |
| **L6.4** docs/research/comparisons/*.md |  |  |  | ✓ |
| **L6.5** mem0 (optional) |  |  |  | ✓ |
| **L7.1** obra/superpowers | ✓ (v5.1.0) |  |  |  |
| **L7.2** github/spec-kit CLI |  | ✓ (CLI installed, not init'd) |  |  |
| **L7.3** upstash/context7 MCP | ✓ (v2.1.4 connected) |  |  |  |
| **L7.4** Playwright MCP | ✓ (v0.0.69 connected) |  |  |  |
| **L7.5** Apify MCP |  |  |  | ✓ |
| **L7.6** skill-creator | ✓ (2 marketplaces) |  |  |  |
| **L8.1** native OpenTelemetry | ✓ (Phoenix wired) |  |  |  |
| **L8.2** langfuse self-hosted |  | ✓ (SDK only, no container) |  |  |
| **L8.3** Piebald-AI/splitrail |  |  |  | ✓ |
| **L8.4** TechNickAI/claude_telemetry |  |  |  | ✓ |
| **L8.5** post-mortem ADRs |  |  |  | ✓ |
| **L8.6** QUARTERLY RECURSION schedule (mechanism) |  |  |  | ✓ |

---

## 3. Per-layer quantitative coverage %

| Layer | INSTALLED | AMBER | Coverage % (full) | Coverage % (incl. AMBER) |
|---|---|---|---|---|
| **L5 Selection** | 0 / 4 | 2 / 4 | **0%** | **50%** (AMBER tokens only) |
| **L6 Knowledge** | 0 / 5 | 1 / 5 | **0%** | **20%** (specify-cli CLI without init) |
| **L7 Construction** | 4 / 6 | 1 / 6 | **67%** | **83%** |
| **L8 Feedback** | 1 / 6 | 1 / 6 | **17%** | **33%** |
| **L5-L8 aggregate** | **5 / 21** | **5 / 21** | **24%** | **48%** |

L5-L8 aggregate cleanliness ≈ **24% strict** / **48% inclusive of AMBER**. L7 is the most-built layer (67% INSTALLED) due to prior Anthropic-marketplace plugin pulls. L5 + L6 + L8 each have gaping holes — these are the architecture's selection/knowledge/feedback **scaffolding** which has NEVER been bootstrapped.

---

## 4. TOP-5 P0 gaps for L5-L8

| Rank | Gap | Layer | Impact | Why P0 |
|---|---|---|---|---|
| **P0-1** | `docs/adr/` + log4brains MADR + post-mortem ADRs | L5 + L6 + L8 | Touches 3 layers in 1 install | Without ADR archival, every Wave's decision-traceability bleeds via gitignored memory; quarterly recursion cannot find post-mortem corpus to evaluate |
| **P0-2** | OthmanAdi/planning-with-files (task_plan.md / findings.md / progress.md + PreToolUse/PostToolUse hooks) | L6 | Memory bedrock | Per Reference doc: persistent task/decision memory primitive — currently 0% present; Mia/synthesis discipline assumes these templates exist |
| **P0-3** | Spec-Kit `specify init` + `.specify/memory/constitution.md` | L6 + L7 | Construction handoff blocked | CLI installed but NEVER initialized → `/speckit.constitution → .plan → .tasks → .implement` workflow non-operational |
| **P0-4** | QUARTERLY RECURSION schedule/automation hook | L8 | Recursive self-eval is the architecture's **distinguishing primitive** | Without mechanism, L3-L5 re-runs on architecture = aspirational only; design references "quarterly" without scheduler/cron/PostToolUse trigger |
| **P0-5** | Langfuse Docker container + OTel fan-out | L8 | Cross-CLI cost tracking gap | Phoenix wired but Langfuse SDK only (no container); splitrail+claude_telemetry both ABSENT → no cross-CLI token+cost visibility; cost-discipline cannot fire OperatorAction gates |

---

## 5. prescribed_edits (5-10 CR-1 cite-anchored install commands)

> ⚠️ Per CR-9 install-risk discipline: these are AUDIT prescriptions, NOT installs to fire this fire. Each commits to a separate Wave 153+ fire with Path P codex T1 pre-edit consult per CR-3 cross-model gate.

### Edit-1 — Initialize docs/adr/ + log4brains MADR (L5 + L6 + L8 unblocker)

```bash
# Install log4brains via npm-global (canonical-channel per CR-6)
npm install -g log4brains@latest

# Initialize MADR ADR directory at canonical location
cd Z:/claude-sota-installed && log4brains init
# Creates docs/adr/0001-record-architecture-decisions.md + .log4brains.yml

# Backfill 1 retro post-mortem from Wave 119 FM-17.f deep-dive
log4brains adr new "FM-17.f 1M-context blocker post-mortem"
```

**Cite anchor (CR-1)**: TIER-1-DIRECT `https://github.com/thomvaill/log4brains @ HEAD <pin at install>` + reference doc L18 (L5 prescribed) + L20 (L6 prescribed) + L22 (L8 prescribed).

**Risk class (CR-9)**: LOW (npm-global + doc-only init; reversible via `npm uninstall -g log4brains` + `rm -rf docs/adr/`).

---

### Edit-2 — Install OthmanAdi/planning-with-files plugin (L6 P0-2)

```bash
# Probe canonical install channel
gh repo view OthmanAdi/planning-with-files --json url,defaultBranchRef,license
gh release list --repo OthmanAdi/planning-with-files --limit 1

# Install via /plugin marketplace add (Anthropic-canonical mechanism per CR-6)
# Alternative: git clone --depth 1 + manual SKILL.md cite-import-AMBER per CR-12 PRIMARY → SECONDARY fallback
```

**Cite anchor (CR-1)**: TIER-1-DIRECT `https://github.com/OthmanAdi/planning-with-files @ HEAD <pin at install>` + reference doc L20 (L6 prescribed).

**Risk class (CR-9)**: MED (new PreToolUse + PostToolUse hooks; expect 2-round fix-forward per Section 13 hook install historical-evidence; CR-9 sibling-bleed defense applies — strip Z:/claude-sota/ paths if present).

**MANDATORY pre-install (per CR-9 read-only research probe exception)**: sota-researcher subagent dispatch to probe upstream parity (does CC official marketplace have equivalent? does superpowers `writing-plans` skill cover?).

---

### Edit-3 — Spec-Kit init in claude-sota-installed root (L6 + L7 unblocker)

```bash
cd Z:/claude-sota-installed
specify init  # creates .specify/memory/constitution.md scaffold
# Then run /speckit.constitution to populate principles
```

**Cite anchor (CR-1)**: TIER-1-DIRECT `https://github.com/github/spec-kit @ HEAD <pin at uv tool install>` v0.8.7 + reference doc L20 (L6) + L21 (L7 prescribed).

**Risk class (CR-9)**: LOW (single-dir creation; reversible via `rm -rf .specify/`).

---

### Edit-4 — Wire QUARTERLY RECURSION automation hook (L8 distinguishing primitive)

```bash
# Approach: ScheduleWakeup + CronCreate dual-mechanism + audit-action-loop integration
# 1. Compose tools/quarterly-recursion-cron.ps1 — fires L3-L5 audit on architecture itself
# 2. Wire as recurring scheduled task at 90-day cadence
# 3. Hook outputs to docs/research/comparisons/quarterly-<ISO>.md + docs/adr/ post-mortem

# Pseudocode (codified in NEXT fire, NOT this audit):
# schedule create --interval-days 90 --command "eee /loop quarterly-recursion-v1"
# Auto-fires sota-research-architecture L3-L5 self-eval; produces ADR + comparison-matrix update
```

**Cite anchor (CR-1)**: reference doc L22 (L8 "QUARTERLY RECURSION re-runs L3-L5 on the architecture itself") + sibling `Z:/claude-sota/.claude/rules/audit-action-loop.md §Wire/Surface/Close/Re-fire` cite-import-AMBER (no upstream parity for quarterly architecture-self-eval).

**Risk class (CR-9)**: HIGH (new automation primitive; multi-fire impact; **operator-gated**); expect 2-3 round fix-forward.

**MANDATORY pre-install (per CR-10)**: sota-researcher probe — does `anthropics/cwc-long-running-agents` ship a scheduled-self-eval primitive? does Spec-Kit have a `/speckit.recursion` command? convergence-gate Axis 1+2+3 verdict required.

---

### Edit-5 — Install Piebald-AI/splitrail (L8 cross-CLI cost tracking)

```bash
# Probe canonical install channel
gh repo view Piebald-AI/splitrail --json url,defaultBranchRef
gh release list --repo Piebald-AI/splitrail --limit 1

# Likely: cargo install splitrail OR gh release download + manual install
cargo install splitrail  # if Rust binary
# OR: pip install splitrail (verify install channel)
```

**Cite anchor (CR-1)**: TIER-1-DIRECT `https://github.com/Piebald-AI/splitrail @ HEAD <pin at install>` + reference doc L22 (L8 prescribed "cross-CLI token+cost").

**Risk class (CR-9)**: LOW-MED (single CLI; reversible); depends on canonical-channel verification.

---

### Edit-6 — Install TechNickAI/claude_telemetry drop-in wrapper (L8 + L7 enrichment)

```bash
# Probe canonical install channel
gh repo view TechNickAI/claude_telemetry --json url,defaultBranchRef
pip install claude-telemetry  # if PyPI package exists; OR git clone + manual install

# Wire as drop-in CLI wrapper (replaces direct claude.exe invocation)
# Operator decision: integrate with eee.ps1 launcher OR leave as-is
```

**Cite anchor (CR-1)**: TIER-1-DIRECT `https://github.com/TechNickAI/claude_telemetry @ HEAD <pin>` + reference doc L22 (L8 prescribed).

**Risk class (CR-9)**: MED (launcher integration is invasive; operator-gated).

---

### Edit-7 — Promote Langfuse SDK → Docker container (L8 AMBER → INSTALLED)

```bash
# Pull official image per CR-6
docker pull langfuse/langfuse:3
docker pull langfuse/langfuse-worker:3

# Create docker-compose.yml from official template
# (Already templated in sibling Z:/claude-sota/CLAUDE.local.md services table — cite-import-AMBER per Section 14.5)
docker compose -f .local/langfuse/docker-compose.yml up -d
```

**Cite anchor (CR-1)**: TIER-1-DIRECT `https://github.com/langfuse/langfuse @ HEAD <pin>` + reference doc L22 (L8 prescribed) + sibling services-table cite-import-AMBER (existing operational evidence per manifest L406).

**Risk class (CR-9)**: MED-HIGH (Docker compose stack + Postgres + ClickHouse; ports allocation; multi-container coordination); operator-gated.

---

### Edit-8 — Comparison-matrix.md template + tie-breaker discipline (L5 P0)

```bash
# Codify weighted-rubric mathematical template
mkdir -p docs/research/comparisons
# Create docs/templates/comparison-matrix.template.md per CR-8 SOTA-pattern-adapt
# Source: github/spec-kit comparison-matrix template OR superpowers requesting-code-review template
```

**Cite anchor (CR-1)**: TIER-1-DIRECT — pattern-adapt from Spec-Kit OR superpowers (probe-required to identify canonical source); reference doc L18 (L5 prescribed).

**Risk class (CR-9)**: LOW (doc-only template; reversible).

---

## 6. Quarterly recursion schedule design

### Design proposal (NOT installed this fire — codified per CR-11 META-process)

#### Recursion mechanism

**Trigger**: cron-style 90-day interval (`schedule create --interval-days 90`) OR PostToolUse hook on every Nth commit (`audit-action-loop.md` Surface stage).

**Action when fired**:
1. Auto-dispatch sota-researcher subagent with brief: "Re-execute L3 Evaluation + L4 Comparison + L5 Selection on the architecture itself (the current cite anchors in `docs/sota-research-architecture-2026-05-11.md`)"
2. Subagent re-probes:
   - All TIER-1 cite-anchors for HEAD-SHA freshness (per `evidence-policy.md` Marker Decay corollary)
   - OpenSSF Scorecard + Best-Practices-Badge + deps.dev on every cited repo
   - Convergence-gate Axis 1+2+3 verdict against each component
3. Subagent produces:
   - `docs/research/comparisons/quarterly-<ISO-date>.md` — fresh comparison-matrix
   - `docs/adr/<N>-quarterly-recursion-<ISO-date>.md` — MADR documenting deltas
   - Updates to `docs/sota-installed-manifest.md` for any AMBER → INSTALLED transitions OR INSTALLED → AMBER demotions
4. Operator-gated commit (CR-7 Phase 1 requires Path P codex T1 pre-commit consult)

#### Recursion schedule (proposed)

| Recursion # | Date | Trigger | Scope |
|---|---|---|---|
| **Q1 2026** | **2026-08-11** (FIRST — 90 days from Wave 152 Fire 5 ship date) | First post-architecture ship | Full L3-L5 re-eval on all 9 layers |
| Q2 2026 | 2026-11-09 | Cron interval | Delta-only (changed cite anchors since Q1) |
| Q3 2027 | 2027-02-07 | Cron interval | Delta-only + emergent-tool sweep (annual deep audit) |
| Q4 2027 | 2027-05-08 | Cron interval | 1-year anniversary full audit + post-mortem corpus review |

#### Automation hook proposal (codify in Wave 153 fire)

```powershell
# tools/quarterly-recursion-cron.ps1 (NEW FILE — operator-gated install per CR-9)
#
# Cite anchor: TIER-3-LOCAL-COMPOSITION per CR-1 lattice
#   constituents=[TIER-1-DIRECT @ Anthropic cwc + sota-researcher subagent,
#                 TIER-3-LOCAL-OPERATOR-DERIVED @ Wave 152 Fire 5 audit prescription]
#   effective_tier=TIER-3-LOCAL-COMPOSITION

param(
    [int]$IntervalDays = 90,
    [string]$ManifestPath = "Z:/claude-sota-installed/docs/sota-installed-manifest.md",
    [string]$ArchitectureDocPath = "Z:/claude-sota-installed/docs/sota-research-architecture-2026-05-11.md"
)

# 1. Calculate next-due date from last-recursion marker
$lastRunMarker = "Z:/claude-sota-installed/.claude/state/quarterly-recursion-last.txt"
$nextDue = (Get-Date $lastRun).AddDays($IntervalDays)

# 2. If due, fire eee /loop with quarterly-recursion-v1 prompt
if ((Get-Date) -ge $nextDue) {
    & eee "/loop quarterly-recursion-v1 --architecture-doc $ArchitectureDocPath"
}

# 3. Record outcome in audit-action-loop JSONL
$jsonlEntry = @{
    timestamp = (Get-Date).ToString("o")
    type = "quarterly-recursion-fire"
    architecture_doc_sha = (git -C Z:/claude-sota-installed log -1 --format=%H -- $ArchitectureDocPath)
    next_due = $nextDue.ToString("o")
} | ConvertTo-Json -Compress
Add-Content -Path "Z:/claude-sota-installed/.claude/state/quarterly-recursion-audit.jsonl" -Value $jsonlEntry
```

#### Operator integration via Windows Task Scheduler

```powershell
# Install (operator-gated; admin elevation required)
schtasks /create /tn "eee-quarterly-recursion" /tr "pwsh -File Z:/claude-sota-installed/tools/quarterly-recursion-cron.ps1" /sc daily /st 03:00 /ru "$env:USERNAME"
```

#### Alternative: Claude Code native ScheduleWakeup integration

Use existing ScheduleWakeup primitive (already operational per CronCreate evidence) to fire eee /loop quarterly-recursion-v1 at 90-day interval. Simpler than Windows Task Scheduler; CC-native; no admin elevation.

---

## 7. Mia pre-apply self-check (synthesis-layer-verify recursive)

| Claim in this audit | Probe | Outcome |
|---|---|---|
| "docs/adr/ DOES NOT EXIST" | `ls Z:/claude-sota-installed/docs/adr/` returned `cannot access` | VERIFIED |
| ".specify/ DOES NOT EXIST" | `ls Z:/claude-sota-installed/.specify/` returned `cannot access` | VERIFIED |
| "Context7 INSTALLED + CONNECTED" | `claude mcp list` showed `plugin:everything-claude-code:context7: npx -y @upstash/context7-mcp@2.1.4 - ✓ Connected` | VERIFIED |
| "Playwright INSTALLED + CONNECTED" | `claude mcp list` showed `plugin:everything-claude-code:playwright: npx -y @playwright/mcp@0.0.69 --extension - ✓ Connected` | VERIFIED |
| "Superpowers INSTALLED v5.1.0" | `find` returned `.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/.claude-plugin/plugin.json` | VERIFIED |
| "Native OTel FULLY WIRED to Phoenix" | grep returned settings.json:34-42 with 8 OTel envs | VERIFIED |
| "log4brains NOT INSTALLED" | `which log4brains` returned `no log4brains in PATH` | VERIFIED |
| "splitrail NOT INSTALLED" | `which splitrail` + cargo install --list + npm ls -g returned empty | VERIFIED |
| "claude_telemetry NOT INSTALLED" | `pip show claude-telemetry` returned `WARNING: Package(s) not found` | VERIFIED |
| "Spec-Kit specify-cli v0.8.7 installed but NOT initialized" | `uv tool list` showed `specify-cli v0.8.7`; `ls .specify/` returned cannot access | VERIFIED |
| "Langfuse SDK INSTALLED v3.14.4 but no Docker container" | `pip show langfuse` returned Version: 3.14.4; `docker ps` empty filter for langfuse | VERIFIED |

Zero OVER claims caught. ZERO FM-20 path-drift cascade catches (reference doc claims aligned with current state — gaps are absences, not drift).

---

## ARTIFACT-INLINE: tmp/wave152-f5-agentB-L5L8-audit-2026-05-11.md

verdict_one_line: "DONE: L5-L8 audited (L5=0/4, L6=0/5 (1 AMBER), L7=4/6 INSTALLED, L8=1/6 INSTALLED), P0 gaps prioritized (ADR/planning-with-files/Spec-Kit-init/quarterly-recursion/Langfuse-Docker), recursion schedule designed (Q1=2026-08-11 + 90-day cadence + ScheduleWakeup integration), ARTIFACT-INLINE embedded"
