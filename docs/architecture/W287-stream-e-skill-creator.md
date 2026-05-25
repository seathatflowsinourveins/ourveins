# W287 Stream E Re-Audit — FrancyJGLisboa/agent-skill-creator

**Date**: 2026-05-18 · **Auditor**: Stream E re-verification per W287 /goal P3(e) + W284a v2 rubric
**Branch**: `goal/W287-reconcile` · **Prior verdict (Stream D)**: 5/7 ADOPT with conditions
**This re-audit verdict**: **REJECT** (provenance + duplicate-of-installed-incumbent)

---

## TL;DR

- **REJECT** — fails *Reputable-org provenance* gate (single solo author Francy Lisboa Charuto / `francylisboacharuto`, no Anthropic / well-known-org backing) AND meaningfully duplicates the installed `example-skills:skill-creator@anthropic-agent-skills` plugin (which IS Anthropic-published).
- Code quality of the three claimed scripts (`security_scan.py` 13.7KB, `staleness_check.py` 27.9KB, `export_utils.py` 26.6KB) is genuinely above average for solo work — type hints, docstrings, JSON output, exit-code contracts — but does not surmount provenance ABORT.
- 943 stars is partly a community-marketing artefact (Dynamous brand, infographic, NotebookLM brief, training deck) — only 5 lifetime PRs from third parties, **zero merged practitioner code commits**, no production case studies surfaced. Activity has *stalled since 2026-03-26* (52 days quiet; last commit predates W287 by 7+ weeks).
- W287 /goal explicit rule: "ABORT if non-Anthropic/non-reputable provenance" — that rule controls.

---

## 7-Dim Rubric (W284a v2)

| # | Dimension | Score | Notes |
|---|---|---|---|
| 1 | Provenance / maintainer reputation | **1/10** | Solo author `francylisboacharuto` (3 author-identity variants of same person per `git log --pretty='%an' \| sort -u`). No Anthropic / Vercel / Microsoft / claude-plugins-official / well-known-org backing. "Dynamous" brand is single-author personal venture (PDF + infographic + training deck shipped 2026-02-27, indicating consulting/marketing posture). W287 /goal ABORT-condition triggered. |
| 2 | Recency / maintenance | **3/10** | Last commit `2026-03-26 07:29:51 -0300` ("feat: Phase 5 harness patterns"); 52 days quiet at audit time. Last-90-d window has activity only 2026-02-26 → 2026-03-26 (1 month sprint, then silence). Repo `pushedAt: 2026-03-26T10:29:53Z`, `updatedAt: 2026-05-17` (metadata-only refresh, no commits). |
| 3 | Anthropic SOTA compatibility | **4/10** | Implements SKILL.md frontmatter + `name:` + `description:` per Anthropic spec. BUT relies on `~/.agents/skills/` invented "Universal" path (cardinal-rule-5 conflict — Z-portable install does NOT use `~`-rooted paths; sets `USERPROFILE=Z:/claude-sota-installed`, see `CLAUDE.local.md` env block lines 27-34). 14-platform list includes non-Anthropic targets the runtime never uses. |
| 4 | Code quality | **7/10** | `security_scan.py` ships 6 typed regex patterns (`sk-[a-zA-Z0-9]{20,}` for OpenAI, `AKIA[A-Z0-9]{16}` for AWS, `ghp_[a-zA-Z0-9]{36}` for GH PAT, etc.) with proper severity tagging and `--json` output. `staleness_check.py` does YYYY-MM-DD parse + git-log fallback + HTTP_TIMEOUT_SECONDS=10 + lazy-compiled regex + URLError handling. Solid for solo work; but no tests detected (no `tests/`, no `pytest.ini`, no CI workflow). |
| 5 | Harness fit | **2/10** | install.sh is POSIX sh + uses `$HOME` heredoc; Windows-portable ONLY through Git Bash + MSYS path-rewrite suppression — would need adaptation. The bootstrap one-liner `curl \| sh` is a cardinal-rule-2 violation if run as a hook. Does NOT integrate with `.claude/settings.json` or plugin marketplace; it is git-clone-only, not a CC plugin. |
| 6 | Practitioner adoption | **2/10** | 943 stars / 148 forks / **only 8 watchers** (extreme star-to-watcher ratio = drive-by stars, not committed users). 5 lifetime PRs (`gh pr list`): #6 by `popey/Alan Pope` (Snapcraft community lead — closed, not merged); #4 #3 #2 by `Haulbrook/Trey Haulbrook` (closed, demo-skill submissions); #1 by `hah23255` (closed). Zero merged third-party code contributions. No deepwiki PRACTITIONER report surfaced; no production case study. |
| 7 | Differentiated capability vs incumbent | **3/10** | Installed `example-skills:skill-creator@anthropic-agent-skills` ALREADY provides 9 scripts: `aggregate_benchmark.py`, `generate_report.py`, `improve_description.py`, `package_skill.py`, `quick_validate.py`, `run_eval.py`, `run_loop.py`, `utils.py`, `__init__.py` — anchored on *eval-driven skill iteration*, which Francy's repo lacks entirely. Francy's `security_scan.py` + `staleness_check.py` are net-new vs Anthropic's eval-loop, but the runtime ALREADY has `gitleaks` running as a `.claude/settings.json` direct-CLI pre-commit hook (cardinal-rule-2-compliant per CLAUDE.md ¶ "pre-commit security gate runs every commit"), covering 90% of `security_scan.py`'s scope at the orchestrator level, not per-skill. |

**Composite**: 22/70 ≈ **31%** — below the W284a v2 *60% adopt-floor*.

---

## Typed Evidence (per W284a v2 rubric)

### CODE READING #1 — `scripts/security_scan.py:30-90`

6 typed regex patterns with severity tagging (`sk-[a-zA-Z0-9]{20,}` for OpenAI, `AKIA[A-Z0-9]{16}` for AWS, `ghp_[a-zA-Z0-9]{36}` for GH PAT, `glpat-...` GitLab, `xox[bprs]-...` Slack, `(api[_\-]?key\|secret\|token\|password)\s*[:=]\s*...` Generic). **Capability confirmed**, but duplicated at orchestrator level by the runtime's pre-commit `gitleaks` hook with a 100+ pattern catalog.

### CODE READING #2 — `scripts/staleness_check.py:1-90`

YYYY-MM-DD frontmatter parse + `git log -1 --format=%aI` fallback + `HTTP_TIMEOUT_SECONDS=10` + lazy-compiled regex + URLError handling. **Capability confirmed** — net-new vs Anthropic's `example-skills:skill-creator`, but trivially synthesizable via 1-line `git log` instead of 943-LOC solo Python module.

### CODE READING #3 — Incumbent overlap

`anthropic-agent-skills/example-skills/.../skills/skill-creator/scripts/` ships **9 scripts** (`aggregate_benchmark.py`, `generate_report.py`, `improve_description.py`, `package_skill.py`, `quick_validate.py`, `run_eval.py`, `run_loop.py`, `utils.py`, `__init__.py`) anchored on *eval-driven skill iteration* + agents `grader.md`/`comparator.md`/`analyzer.md` for blind A/B comparison — strictly stronger SOTA primitive.

### BENCHMARK GAP

No `tests/`, no `benchmarks/`, no `evaluations/`. README has marketing prose ("Level 5 skill dark factory", "trust narrative") but no numerical evidence. **Gate FAILED**.

### PRACTITIONER REPORT GAP

5 lifetime PRs (all CLOSED, zero merged). Top PR #6 by Snapcraft's Alan Pope = "Improve skill quality scores via tessl skill review" — closed, indicating skill quality concerns flagged by external reviewer. **Gate FAILED**.

---

## Reject-Overlap Checklist

| Test | Result |
|---|---|
| Already covered by `example-skills:skill-creator@anthropic-agent-skills`? | **YES** — 9 incumbent scripts cover skill-creator core; incumbent is currently installed and Anthropic-authored |
| Already covered by `claude-plugins-official:skill-creator` (settings.json:172 `false`)? | **YES** — disabled because `example-skills:skill-creator` is the stronger Anthropic-direct primitive |
| Provides net-new capability the runtime cannot synthesize otherwise? | **NO** — gitleaks covers security; pre-commit covers staleness; validate.py duplicated by `quick_validate.py` upstream |
| Provenance: reputable org or well-known author? | **NO** — solo author, single-person consulting brand "Dynamous" |
| Recent activity (last 30 days)? | **NO** — last commit 2026-03-26 (52 days stale) |
| BENCHMARK evidence surfaced? | **NO** — no tests, no benchmarks, no measured-delta claim |
| Production PRACTITIONER reports from non-author org? | **NO** — 5 closed PRs, zero merged third-party code, watchers=8 |

**6 of 7 reject conditions met. Verdict: REJECT.**

---

## Recommendation to W287

1. **REJECT FrancyJGLisboa/agent-skill-creator**. Do not adopt.
2. **Rely on already-installed `example-skills:skill-creator@anthropic-agent-skills`** (Anthropic-authored, eval-loop-anchored).
3. **If `staleness_check.py` semantics specifically are desired**: implement as a 30-line `.claude/settings.json` direct-CLI hook using `git log -1 --format=%aI` + a threshold check.
4. **If `security_scan.py` patterns are desired**: extend the existing `gitleaks` config at the runtime root.

---

## Cite anchors

- README: `https://raw.githubusercontent.com/FrancyJGLisboa/agent-skill-creator/main/README.md @ main`
- Anthropic incumbent: `Z:/claude-sota-installed/.claude/plugins/cache/anthropic-agent-skills/example-skills/f458cee31a75/skills/skill-creator/scripts/` (9 scripts)
- Settings.json line 172: `"skill-creator@claude-plugins-official": false`
- GitHub metadata via `gh repo view`: `stars=943, forks=148, watchers=8, pushedAt=2026-03-26T10:29:53Z`
- PR list via `gh pr list --state all --limit 20`: 5 closed PRs, 0 merged
- W287 /goal ABORT clause: "ABORT if non-Anthropic/non-reputable provenance"
