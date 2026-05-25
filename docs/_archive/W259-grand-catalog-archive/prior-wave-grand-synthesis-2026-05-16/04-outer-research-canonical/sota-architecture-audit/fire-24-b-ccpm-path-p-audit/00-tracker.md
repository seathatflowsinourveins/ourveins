# Fire 24-B — CCPM (automazeio/ccpm) Path P Codex T1 Audit

> **Position**: Second of 5 Tier 1 NEW PROBE-DAG-CANDIDATE audits queued at Fire 23 close.
> **Subject**: `automazeio/ccpm` (user's external SOTA Tier 2 🥇 "files-as-source-of-truth" PM pick)
> **Method**: Path P recipe (codex exec foreground+tee — n=9/9 reproducible after Fire 24-A)
> **Convergence-gate**: 3-axis audit (anatomy / Probe DAG 1-7 / cross-model verdict)
> **Pre-codex hypothesis**: STUDY-PILOT-NARROW (Probe 7.b eligible) OR REJECT-FOR-FIT (P7.a + P4 DUPLICATE risk)

## Subject identification (TIER-1-DIRECT cite anchors)

| Field | Value | Cite |
|---|---|---|
| Repo | `automazeio/ccpm` | `Z:/repos/deps/ccpm` |
| HEAD | `7d7e462` (2026-05-10) | `git -C Z:/repos/deps/ccpm log -1 --oneline` |
| License | MIT | `Z:/repos/deps/ccpm/LICENSE:1` |
| Org | automazeio (named) | `README.md:3` Agent Skills compatible badge |
| Author | @aroussi | `README.md:11` X handle |
| Skill name | `ccpm` | `skill/ccpm/SKILL.md:2` frontmatter `name:` |
| Workflow | PRD → Epic → GitHub Issues → Parallel Agents → Shipped Code | `SKILL.md:13-15` |
| Agent Skills compatible | Yes (cross-tool: Claude Code, Codex, OpenCode, Factory, Amp, Cursor) | `README.md:21-25` |

## Pre-codex anatomy

CCPM is a **SINGLE SKILL** (~80 LOC SKILL.md + 6 reference files + 12 bash scripts), NOT a multi-plugin
bundle like BMAD. Architecture is much leaner.

### 5 phases (per SKILL.md:20-58)

1. **Plan** — Capture requirements (PRD via guided brainstorming)
2. **Structure** — Break down (Epic → numbered task files with dependencies)
3. **Sync** — Push to GitHub (Epic + tasks → GitHub Issues, progress comments)
4. **Execute** — Start building (parallel agent dispatch on GitHub issues)
5. **Track** — Status / standup / what's next / what's blocked

### Directory structure (per `references/conventions.md`)

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

### Script-first rule (per SKILL.md:62-74)

12 bash scripts for deterministic operations:
- `status.sh` / `standup.sh` / `epic-list.sh` / `epic-show.sh` / `epic-status.sh`
- `prd-list.sh` / `prd-status.sh` / `search.sh` / `in-progress.sh` / `next.sh` / `blocked.sh` / `validate.sh`

## Fire 24-B deliverables (planned)

1. `00-tracker.md` (this file)
2. `01-ccpm-anatomy.md` — line-by-line repo anatomy
3. `02-probe-dag-application.md` — Probe DAG 1-7 applied
4. `03-codex-t1-verdict.md` — Path P codex T1 verdict
5. `99-close-synthesis.md` — adoption verdict

## Probe DAG 1-7 expected focus

- **Probe 1 count-OVER**: README claims "100% eval score" + many features — verify
- **Probe 2 SDK-vs-CLI**: pure Agent Skills (cross-tool) — Codex CLI + Claude Code compatible
- **Probe 4 plugin-namespace**: `ccpm` skill name — no collision with eee's existing skills
- **Probe 5 mode-harness-shape**: workflow could fire autonomously (PRD writing triggers don't require user-presence like BMAD's "talk to John")
- **Probe 6 license**: MIT ✅
- **Probe 7.a demand-absence**: eee has NO PRD-driven feature backlog; per-fire audit folders + TaskCreate cover state mgmt
- **Probe 7.b 5-clause**: CCPM could create NEW workflow if explicitly piloted for feature-shipping

## Key blockers identified pre-codex

1. **GitHub Issues integration**: CCPM's Sync phase requires `git remote get-url origin` pointing to a real GitHub repo. eee runtime is local Z:\ install — currently NO public/private GitHub remote for issues
2. **Parallel-agent overlap**: CCPM's Execute phase "parallel agent dispatch on GitHub issues" overlaps with eee's existing `parallel-agent-wave.md` + cross-model T1-T7 lifecycle = Probe 4 DUPLICATE-FUNCTIONALITY risk per kiss-dry-yagni Must-Never #4
3. **`.claude/prds/` + `.claude/epics/<feature>/`**: would need to be created in eee but ARE different namespace from existing `docs/sota-architecture-audit/fire-N-*/`

## Mia ladder advance

n=1535 → n=1537 (+2: Fire 24-B framing / pre-codex hypothesis with 3 blockers)
