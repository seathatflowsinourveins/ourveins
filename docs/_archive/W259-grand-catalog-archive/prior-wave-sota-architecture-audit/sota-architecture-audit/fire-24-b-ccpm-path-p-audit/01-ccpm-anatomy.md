# 01 — CCPM (automazeio/ccpm) Line-by-Line Anatomy

> **Probe method**: direct `Z:/repos/deps/ccpm` filesystem read at HEAD `7d7e462`
> **Cite class**: TIER-1-DIRECT @ file:line @ HEAD SHA (immutable at recorded SHA)
> **Verification**: cross-confirmed by Path P codex T1 @ `.claude/state/codex_consult_w134_f24b_ccpm_OUT.txt`

## Repo metadata

| Field | Value | Cite |
|---|---|---|
| HEAD SHA | `7d7e462` (2026-05-10) | `git -C Z:/repos/deps/ccpm log -1 --oneline` |
| License | MIT | `LICENSE:1` |
| Org/Author | `automazeio` / `@aroussi` | `README.md:11` |
| Skill compatibility | Agent Skills cross-tool: Claude Code, Codex, OpenCode, Factory, Amp, Cursor | `README.md:21-25` |
| README claim | "Eval Score 100%" badge | `README.md:5` (vendor-marketing — fails Row-2 fabrication-test per convergence-gate.md) |

## Internal structure (light-weight vs BMAD's 42-skill plugin)

```
ccpm/
├── README.md (15.1K)
├── CHANGELOG.md (6.0K)
├── LICENSE (1.1K MIT)
├── icon.png + screenshot.webp
└── skill/
    └── ccpm/
        ├── SKILL.md (4.5K, ~80 LOC frontmatter+body)
        └── references/
            ├── conventions.md (4.6K — directory structure + frontmatter)
            ├── plan.md (3.1K — Phase 1)
            ├── structure.md (3.0K — Phase 2)
            ├── sync.md (7.8K — Phase 3 GitHub Issues)
            ├── execute.md (6.5K — Phase 4 parallel agents)
            ├── track.md (3.3K — Phase 5 status/standup)
            └── scripts/ (12 bash scripts)
```

**Single-skill architecture** is the key differentiator vs BMAD (42 skills across 2 plugins).
CCPM is ~30-40x smaller in skill-count footprint.

## SKILL.md frontmatter (full quote)

```yaml
---
name: ccpm
description: "CCPM - spec-driven project management: PRD → Epic → GitHub Issues → parallel agents → shipped code. Use this skill for anything in the software delivery lifecycle: writing a PRD ('write a PRD for X', 'let's plan X', 'scope this out'), parsing a PRD into an epic, decomposing an epic into tasks, syncing to GitHub ('sync the X epic', 'push tasks to github'), starting work on an issue ('start working on issue N', 'let's work on issue N'), analyzing parallel work streams, running standups ('standup', 'run the standup'), checking status ('what's next', 'what's blocked', 'what are we working on'), closing issues, or merging an epic. Use ccpm any time the user is talking about shipping a feature, managing work, or tracking progress — even if they don't say 'ccpm' or 'PRD'. Do NOT use for: debugging code, writing tests, reviewing PRs, or raw GitHub issue/PR operations with no delivery context."
---
```

Cite: `skill/ccpm/SKILL.md:1-4`

**Trigger pattern**: abstract workflow triggers ("write a PRD for X", "what's next") that
CAN fire in autonomous mode (unlike BMAD's "talk to John" requiring user-presence).

## 5 phases (per SKILL.md:20-58)

| Phase | Purpose | References |
|---|---|---|
| 1 Plan | PRD via guided brainstorming | `references/plan.md` |
| 2 Structure | Epic → numbered task files | `references/structure.md` |
| 3 Sync | Local → GitHub Issues | `references/sync.md` |
| 4 Execute | Parallel agents on issues | `references/execute.md` |
| 5 Track | Status/standup/blocked | `references/track.md` |

## Directory structure mandate (per `references/conventions.md:9-25`)

```
.claude/
├── prds/
│   └── <feature-name>.md          # Product Requirement Documents
├── epics/
│   ├── <feature-name>/
│   │   ├── epic.md                # Technical epic
│   │   ├── <N>.md                 # Task files (named by GitHub issue number after sync)
│   │   ├── <N>-analysis.md        # Parallel work stream analysis
│   │   ├── github-mapping.md      # Issue number → URL mapping
│   │   ├── execution-status.md    # Active agents tracker
│   │   └── updates/
```

**Naming convention**: `<N>.md` task files are named BY GITHUB ISSUE NUMBER after sync.
This couples local files to remote GitHub issues = strong dependency on GitHub Issues.

## Script-first rule (12 bash scripts per SKILL.md:62-74)

Deterministic operations always via scripts (LLM only for reasoning):

| Operation | Script |
|---|---|
| Project status | `bash references/scripts/status.sh` |
| Standup report | `bash references/scripts/standup.sh` |
| List epics | `bash references/scripts/epic-list.sh` |
| Show epic | `bash references/scripts/epic-show.sh <name>` |
| Epic status | `bash references/scripts/epic-status.sh <name>` |
| List PRDs | `bash references/scripts/prd-list.sh` |
| PRD status | `bash references/scripts/prd-status.sh` |
| Search | `bash references/scripts/search.sh <query>` |
| In-progress | `bash references/scripts/in-progress.sh` |
| What's next | `bash references/scripts/next.sh` |
| What's blocked | `bash references/scripts/blocked.sh` |
| Validate | `bash references/scripts/validate.sh` |

This is a STRONG PATTERN candidate for eee — deterministic-ops-as-scripts is a discipline
that could be ported to eee's per-fire MD folder ecosystem (status.sh over fire-N folders).

## GitHub Issues integration mandate (per `references/sync.md:10-19`)

Sync phase REQUIRES `git remote get-url origin`:

```bash
remote_url=$(git remote get-url origin 2>/dev/null || echo "")
if [[ "$remote_url" == *"automazeio/ccpm"* ]]; then
  echo "❌ Cannot sync to the CCPM template repository."
  exit 1
fi
REPO=$(echo "$remote_url" | sed 's|.*github.com[:/]||' | sed 's|\.git$||')
```

**eee runtime state**: local Z:\ install — currently no GitHub remote configured for issues sync.
MITIGABLE if local-only mode used (just don't fire Phase 3 Sync).

## Probe 1 count-OVER analysis

| Claim | Actual |
|---|---|
| `README.md:5` "Eval Score 100%" badge | **AUTO-FAIL per convergence-gate.md Row-2** — no methodology citation, no benchmark repo, no reproducible artifact |
| Cross-tool support claim | Plausible (Agent Skills spec is cross-tool by design) |

Codex T1 specifically called out the "Eval Score 100%" as Row-2 fabrication-test AUTO-FAIL.

## Mia ladder advance

n=1537 → n=1541 (+4: anatomy probe complete / single-skill architecture verified / script-first rule documented / Row-2 100%-eval-score AUTO-FAIL detection)
