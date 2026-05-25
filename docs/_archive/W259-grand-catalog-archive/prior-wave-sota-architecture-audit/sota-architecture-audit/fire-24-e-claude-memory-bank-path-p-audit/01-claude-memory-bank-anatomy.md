# 01 — Claude Memory Bank (russbeye/claude-memory-bank) Anatomy

> **Probe method**: GitHub MCP fetch (`mcp__github__get_file_contents` + `search_repositories`) — repo NOT locally cloned at `Z:/repos/deps/`
> **Cite class**: TIER-1-DIRECT @ blob-SHA (verified via GitHub MCP API)
> **Verification**: cross-confirmed by Path P codex T1 @ `.claude/state/codex_consult_w134_f24e_memory_bank_OUT.txt`

## Repo metadata (verified via GitHub MCP at master 2026-05-10)

| Field | Value | Cite |
|---|---|---|
| Repo full_name | `russbeye/claude-memory-bank` | GitHub API `search_repositories` |
| Default branch | `master` | GitHub API |
| Created | 2025-09-07 | GitHub API `created_at` |
| **Last pushed** | **2025-09-28** (~7.5 months stale per SRA D2) | GitHub API `pushed_at` |
| Description | "Give Claude Code a brain upgrade. Automatically tracks your work and keeps everything organized, turning Claude into your smart token-tuned coding partner." | GitHub API |
| License | **PURE MIT** (Russ Beye copyright 2025) | LICENSE blob `2139ca37943f1909cef5e05a1f7c680a30f50b3d` |
| Author | Russ Beye (solo TIER-4 named-individual) | LICENSE |
| README blob | `9afc21c47ad6b9a437b4e61a2e96da544782ce2d` (4857 bytes) | GitHub MCP |
| Local clone | **NOT PRESENT** at `Z:/repos/deps/` | filesystem probe |
| Install type | Manual `git clone` + `cp -r` (NOT npm / NOT plugin marketplace / NOT MCP) | README "Quick Start" |

## SRA D2 freshness gate — STALE band

Per `Z:/claude-sota/.claude/rules/sota-research-architecture.md` D2:

| Last-push age | Band | Verdict |
|---|---|---|
| < 30d | ACTIVE | — |
| 30-90d | MAINTAINED | — |
| 90-180d | STABLE-BURN-IN | acceptable for mature deps |
| **180-365d** | **STALE** | **DOWNGRADE flag — applies to Claude Memory Bank** |
| > 365d | DORMANT | REJECT unless ABANDONED-BUT-WORKING justified |

Last push 2025-09-28 → 2026-05-10 = **~225 days = STALE band**.

DISTINCT from Fire 24-A/B/C/D: all 4 prior had ACTIVE-or-MAINTAINED last-push status.
This is the first STALE-band candidate in Fire 24 series.

## License: PURE MIT (verified)

```
MIT License

Copyright (c) 2025 Russ Beye

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), [...]
```

No Commons Clause, no commercial restrictions. Cite: LICENSE blob `2139ca37943f1909cef5e05a1f7c680a30f50b3d` (1065 bytes).

## CR-9 install-risk — DECISIVE HIGH (codex T1 confirmed)

README "Quick Start" verbatim install commands:

```bash
git clone git@github.com:russbeye/claude-memory-bank.git
cd claude-memory-bank
cp -r {agents,commands,workflows} ~/.claude/
cp CLAUDE.md ~/.claude/
```

This is a **DIRECT FILE OVERWRITE** of user's `~/.claude/` directory:

1. **`cp CLAUDE.md ~/.claude/`** — OVERWRITES `~/.claude/CLAUDE.md`. For eee runtime, this
   would REPLACE the cardinal-rule CLAUDE.md (rules 1-12) with Russ Beye's CLAUDE.md.
2. **`cp -r agents ~/.claude/`** — BULK COPY into eee's agents/ (12+ existing agents).
   Filename collisions: code-searcher OVERWRITES eee Explore subagent? Conflict on each.
3. **`cp -r commands ~/.claude/`** — BULK COPY into eee's commands/. Collisions on
   slash-command namespace.
4. **`cp -r workflows ~/.claude/`** — new directory (no current collision but pollutes namespace).

**Worst-of-Fire-24-series install path**:
- Fire 24-A BMAD: `npx bmad-method install` (custom installer; could be sandboxed)
- Fire 24-B CCPM: manual file copy (similar but smaller surface)
- Fire 24-C Task Master: `npx` from npm registry (supply-chain risk but registry-managed)
- Fire 24-D Agent OS v3: `scripts/project-install.sh` (script-based but path-configurable in principle)
- **Fire 24-E Claude Memory Bank: bare `cp -r` from cloned repo (no install validation, no backup)**

Codex T1 `cr9_install_risk_decisive_blocker: "YES"` confirmed.

## Architecture (tracked + local-only)

### Tracked in git (would be cp -r'd to ~/.claude/)

```
claude-memory-bank/
├── agents/                      (4 specialized AI agent definitions)
│   ├── code-searcher              ─ Deep codebase analysis
│   ├── memory-bank-synchronizer  ─ Sync docs with code reality
│   ├── context-query-agent        ─ Just-in-time context retrieval
│   └── ux-design-expert           ─ UI/UX guidance
├── commands/context/            (4 slash commands)
│   ├── /context-query           ─ "<pattern>" — get focused context
│   ├── /update-memory-bank      ─ sync memory bank with current code
│   ├── /context-diff            ─ --since=main — see changes
│   └── /cleanup-context         ─ archive current state
├── workflows/memory-bank/       (development workflow guides)
├── CLAUDE.md                    (global project instructions)
└── settings.json                (suggested permissions)
```

### Local-only / gitignored (`.claude/memory_bank/`)

```
.claude/memory_bank/
├── decisions/        ─ ADRs and technical decisions
├── patterns/         ─ Code patterns and conventions
├── architecture/     ─ System structure and components
└── troubleshooting/  ─ Known issues and solutions
```

## 12-surface DUPLICATE-FUNCTIONALITY mapping vs eee

| Claude Memory Bank surface | eee existing equivalent |
|---|---|
| `decisions/` (ADRs + technical decisions) | `feedback_*/reference_*/project_*` MD files + `MEMORY.md` index at `.claude/projects/Z--claude-sota-installed/memory/` |
| `patterns/` (code patterns + conventions) | `Z:/claude-sota/.claude/rules/*.md` (24 cardinal rules cite-import-AMBER) |
| `architecture/` (system structure) | `docs/sota-architecture-audit/fire-N-*/` + `docs/install-provenance.md` |
| `troubleshooting/` (known issues + solutions) | `Z:/claude-sota/.claude/rules/named-failure-modes.md` + FM-* catalog |
| `code-searcher` agent | Explore subagent + serena LSP MCP + Grep |
| `memory-bank-synchronizer` agent | L1 mcp-memory + L3 Graphiti (Wave 140 wire) |
| `context-query-agent` | sota-researcher subagent + research-protocol.md |
| `ux-design-expert` agent | a11y-architect agent + frontend-design plugin |
| `/context-query "<pattern>"` | Grep + Glob + sota-researcher Mia probe |
| `/update-memory-bank` | MEMORY.md auto-update + L1 writes + L3 writes |
| `/context-diff --since=main` | `git diff` + per-fire MD folder review |
| `/cleanup-context` | per-fire 99-close-synthesis.md discipline |

**12 distinct surfaces overlap** — codex T1 confirmed `duplicate_surface_count_vs_eee: 12`.
This is the most P4 DUPLICATE-class violations of any Fire 24 audit.

## Codex T1 contributions

Codex T1 added precision on:

1. **`cr9_install_risk_decisive_blocker: YES`** — confirmed bulk cp-r overwrite as decisive
2. **`sra_d2_stale_decisive_blocker: DOC-CAVEAT-ONLY`** — STALE is downgrade, NOT primary reject reason
3. **`duplicate_surface_count_vs_eee: 12`** — verified 12 distinct surfaces overlap
4. **Empty `cite_pattern_extract_candidates`** — codex found NO subset patterns worth extracting (vs CCPM 4, Task Master 5, Agent OS v3 5)
5. **`row2_fabrication_test: NEUTRAL`** — aspirational README claims ("intelligent", "specialized", "proven") are not testable benchmark claims

## Mia ladder advance

n=1609 → n=1613 (+4: anatomy probe via GitHub MCP / SRA D2 STALE band first instance / CR-9 HIGH install-risk worst-of-series / 12-surface duplicate confirmed by codex)
