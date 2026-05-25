# Fire 24-E — Claude Memory Bank (russbeye/claude-memory-bank) Path P Codex T1 Audit

> **Position**: FIFTH and FINAL Tier 1 NEW PROBE-DAG-CANDIDATE audit queued at Fire 23 close.
> **Subject**: `russbeye/claude-memory-bank` (user's external SOTA Tier 3 "persistent project knowledge" pick)
> **Method**: Path P recipe (codex exec foreground+tee — n=12/12 reproducible)
> **Pre-codex hypothesis**: LIKELY-REJECT P4 DUPLICATE — overlaps L1+L3+MEMORY.md + cardinal-rules + per-fire MD folders + feedback memory + FM-* failure modes catalog

## Subject identification (TIER-1-DIRECT cite anchors via GitHub MCP)

| Field | Value | Cite |
|---|---|---|
| Repo | `russbeye/claude-memory-bank` | `mcp__github__search_repositories` 2026-05-10 |
| Default branch | `master` | GitHub API |
| Created | 2025-09-07 (~8 months ago) | GitHub API `created_at` |
| Last pushed | **2025-09-28 (~7-8 months stale)** | GitHub API `pushed_at` |
| License | **MIT (pure)** | `LICENSE` blob `2139ca37943f1909cef5e05a1f7c680a30f50b3d` |
| Author | Russ Beye (solo TIER-4 named-individual) | LICENSE Copyright 2025 |
| Description | "Give Claude Code a brain upgrade. Automatically tracks your work and keeps everything organized..." | GitHub API |
| README blob | `9afc21c47ad6b9a437b4e61a2e96da544782ce2d` (4857 bytes) | GitHub MCP |
| Local clone | **NOT PRESENT** at `Z:/repos/deps/claude-memory-bank/` | filesystem probe |

## P0 CRITICAL: SRA D2 freshness gate — STALE band

Per `Z:/claude-sota/.claude/rules/sota-research-architecture.md` D2 freshness gate:

| Last-push age | Band |
|---|---|
| < 30 days | ACTIVE |
| 30-90 days | MAINTAINED |
| 90-180 days | STABLE-BURN-IN |
| **180-365 days** | **STALE (DOWNGRADE flag)** ← Claude Memory Bank here |
| > 365 days | DORMANT (REJECT unless ABANDONED-BUT-WORKING justified) |

Last push 2025-09-28 → 2026-05-10 = ~7.5 months = **STALE per D2**. DOWNGRADE flag applies.

This is DISTINCT from Fire 24-A/B/C/D — all 4 prior had ACTIVE-or-MAINTAINED last-push.

## P0 CRITICAL: CR-9 install-risk — DIRECT FILE OVERWRITE

Per README "Quick Start":

```bash
# Step 1: clone repo
git clone git@github.com:russbeye/claude-memory-bank.git

# Step 2: DIRECT COPY into ~/.claude/ — OVERWRITES EXISTING FILES
cp -r {agents,commands,workflows} ~/.claude/
cp CLAUDE.md ~/.claude/
# settings.json contains suggested permissions
```

**CRITICAL**: this would:
1. **OVERWRITE** `~/.claude/CLAUDE.md` — eee's cardinal-rule CLAUDE.md would be REPLACED
2. **OVERWRITE/MERGE** `~/.claude/agents/` — collision with eee's 12+ agents
3. **OVERWRITE/MERGE** `~/.claude/commands/` — collision with eee's slash commands
4. **OVERWRITE/MERGE** `~/.claude/workflows/` — new directory, possible collision

This is the MOST DESTRUCTIVE install path of any Fire 24 audit so far. CR-9 install-risk =
**HIGH** (vs Fire 24-A BMAD `npx bmad-method install` MEDIUM, Fire 24-C Task Master
`npx bmad-method install` MEDIUM, Fire 24-D Agent OS `project-install.sh` MEDIUM).

## Architecture overview (NOT plugin / NOT MCP / NOT npm)

```
claude-memory-bank/
├── agents/                      (4 specialized agents)
│   ├── code-searcher
│   ├── memory-bank-synchronizer
│   ├── context-query-agent
│   └── ux-design-expert
├── commands/context/            (4 slash commands)
│   ├── context-query           (/context-query "<pattern>")
│   ├── update-memory-bank      (/update-memory-bank)
│   ├── context-diff            (/context-diff --since=main)
│   └── cleanup-context         (/cleanup-context)
├── workflows/memory-bank/       (development workflow guides)
├── CLAUDE.md                    (global project instructions — would OVERWRITE eee's)
└── settings.json                (suggested permissions)
```

Local-only (gitignored):
```
.claude/memory_bank/
├── decisions/         # ADRs and technical decisions
├── patterns/          # Code patterns and conventions
├── architecture/      # System structure and components
└── troubleshooting/   # Known issues and solutions
```

## DUPLICATE-FUNCTIONALITY analysis vs eee (Probe 4 FAIL)

| Claude Memory Bank category | eee equivalent | Overlap |
|---|---|---|
| `decisions/` (ADRs + technical decisions) | `.claude/projects/Z--claude-sota-installed/memory/feedback_*` / `reference_*` / `project_*` MD files + `MEMORY.md` index | DUPLICATE |
| `patterns/` (code patterns + conventions) | `Z:/claude-sota/.claude/rules/*.md` (24 cardinal rules cite-import-AMBER) | DUPLICATE |
| `architecture/` (system structure) | `docs/sota-architecture-audit/fire-N-*/` per-fire folder convention + `docs/install-provenance.md` | DUPLICATE |
| `troubleshooting/` (known issues + solutions) | `Z:/claude-sota/.claude/rules/named-failure-modes.md` + FM-* catalog + reference memory files | DUPLICATE |
| `code-searcher` agent | eee Explore subagent + serena LSP MCP + Glob/Grep | DUPLICATE |
| `memory-bank-synchronizer` agent | eee L1 mcp-memory + L3 Graphiti MCP wire (Wave 140) | DUPLICATE |
| `context-query-agent` | eee sota-researcher subagent + research-protocol.md | DUPLICATE |
| `ux-design-expert` | eee a11y-architect agent + frontend-design plugin | DUPLICATE |
| `/context-query "<pattern>"` slash command | eee Grep + Glob + sota-researcher | DUPLICATE |
| `/update-memory-bank` | eee MEMORY.md auto-update + L1 mcp-memory writes | DUPLICATE |
| `/context-diff --since=main` | eee `git diff` + per-fire MD folder review | DUPLICATE |
| `/cleanup-context` | eee per-fire close-synthesis discipline | DUPLICATE |

**12 distinct surfaces overlap** — most DUPLICATE-class violations of any Fire 24 audit.

## Pre-codex hypothesis: REJECT-FOR-FIT (strongest of Fire 24 series)

Three independent decisive blockers:

1. **Probe 4 DUPLICATE FAIL** (most surfaces, 12 overlap points)
2. **CR-9 install-risk HIGH** (direct `cp -r` overwrites CLAUDE.md + agents/)
3. **SRA D2 STALE band** (last push 2025-09-28; 7.5 months stale)

Plus:
- D4 TIER-4 named-individual (solo author Russ Beye)
- No MCP server (just shell-script install of slash commands)
- No npm registry presence (manual git clone only)

## Fire 24-E deliverables (planned)

1. `00-tracker.md` (this file)
2. `01-claude-memory-bank-anatomy.md` — README/LICENSE/install-path anatomy via GitHub MCP
3. `02-probe-dag-application.md` — Probe DAG 1-7 applied
4. `03-codex-t1-verdict.md` — Path P codex T1 verdict
5. `99-close-synthesis.md` — adoption verdict + Wave 134 Fire 24 series CLOSE

## Mia ladder advance

n=1605 → n=1609 (+4: Fire 24-E framing / 7.5-month STALE D2 flag / DIRECT FILE OVERWRITE CR-9 HIGH risk / 12 DUPLICATE surfaces enumerated)
