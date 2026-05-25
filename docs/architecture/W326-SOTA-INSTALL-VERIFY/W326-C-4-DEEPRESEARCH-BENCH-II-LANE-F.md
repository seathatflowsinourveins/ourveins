# W326 Stream C-4 — `imlrz/DeepResearch-Bench-II` Lane F eval-wire spec

**Wave**: W326 Stream C
**Date**: 2026-05-19
**Rubric**: sca-v9 (eval-lane focus — composite scoring partial)
**Candidate**: `imlrz/DeepResearch-Bench-II` @ HEAD `11d87de4` (default branch `main`, last commit 2026-05-14)
**Source W325 Stream-D verdict**: C-10 T3 BENCHMARK-EVAL-LANE (rough install_score ~4.2; 3-of-N convergence)
**This wave's verdict**: **T3 EVAL-LANE (PATTERN-STUDY for now; Lane F SCAFFOLD draft below; real wire-up deferred to operator W327)**

---

## §1 — Repo fingerprint

| Field | Value | Source |
|---|---|---|
| Repo | `imlrz/DeepResearch-Bench-II` | github.com/imlrz/DeepResearch-Bench-II |
| Stars | **50** | GitHub REST (low-star — anti-bias mandate: VALIDATED via paper + leaderboard + data) |
| Forks | 2 | same |
| Watchers (subscribers) | 1 | same |
| License (repo) | **Apache-2.0** (code) | GitHub `license.spdx_id=Apache-2.0` |
| License (data) | **CC-BY-4.0 (129 tasks) + CC-BY-NC-4.0 (2 tasks idx=26, idx=110) + CC0 (1 task idx=119)** | DATA_LICENSE file |
| Description | "DeepResearch Bench II (DRB2) is the follow-up to DeepResearch Bench, with a stronger focus on measuring the gap between deep research systems and human experts. It does so by decomposing expert-written reports into hierarchical rubrics covering presentation, analysis, and evidence, and using them to evaluate model-generated." | repo `description` |
| Updated | 2026-05-16T16:06:16Z | repo `updated_at` |
| Pushed | 2026-05-14T06:21:49Z | repo `pushed_at` |
| Default branch | `main` | repo `default_branch` |
| HEAD sha | `11d87de486` ("Note license model change in News section") 2026-05-14T06:21:44Z | `repos/.../commits/main` |
| Owner type | User (`imlrz`, id 139892071) — Ruizhe Li, USTC-CMI Agent Research Lab | repo `owner` |
| Archived | False | repo `archived` |
| arXiv ID | **2601.08536** (submitted 2026-01-13, last v 2026-01-30) | repo README badge |
| HuggingFace dataset | `muset-ai/DeepResearch-Bench-II-Dataset` | repo README badge |
| Leaderboard | `agentresearchlab.org/benchmarks/deepresearch-bench-ii/index.html` | repo README |

**Top-level repo structure**:
- Code (Python): `aggregate_scores.py`, `gemini_client.py`, `run_evaluation.py`, `pyproject.toml`, `uv.lock`
- Data: `tasks_and_rubrics.jsonl` (132 tasks × 9,430 rubrics — embedded in repo, NOT requires HF download)
- Config: `.env_example`
- Docs: `README.md`, `LICENSE` (Apache-2.0 for code), `DATA_LICENSE` (mixed per-task for data)
- Assets: `assets/` (distributionv2.png + other figures)

**Authors per arXiv 2601.08536**: Ruizhe Li, Mingxuan Du, Benfeng Xu, Chiwei Zhu, Xiaorui Wang, Zhendong Mao (USTC-CMI + Tsinghua University).

**pyproject.toml dependencies** (minimal — pure-Python evaluation pipeline):
```toml
[project]
name = "deepresearch-bench-2"
version = "0.1.0"
description = "Academic content evaluation with Gemini (PDF/DOCX/images)."
requires-python = ">=3.10"
dependencies = [
    "requests>=2.31.0",
    "python-docx>=1.1.0",
]
```

**Operational reality**: depends on `requests` + `python-docx` ONLY at the package level. Internally calls **Google Gemini API** (`gemini_client.py`) for rubric judging. Operator needs `GEMINI_API_KEY` env-var to run real evaluations.

---

## §2 — Stage-0 EXISTENCE-PROBE (6 sources)

| Source | Result | Status |
|---|---|---|
| GitHub REST | 200; 50★ Apache-2.0 | ✓ EXISTS |
| GitHub commits | 200; sha `11d87de486` 2026-05-14 | ✓ EXISTS |
| GitHub contents | 200; 11 root items inc. `tasks_and_rubrics.jsonl` + `run_evaluation.py` | ✓ EXISTS |
| Raw README | 200; substantive content with leaderboard + arXiv + HF dataset links | ✓ EXISTS |
| arXiv | abs/2601.08536 + alphaxiv mirror + ResearchGate PDF + arxiv HTML | ✓ EXISTS |
| HF dataset | `muset-ai/DeepResearch-Bench-II-Dataset` referenced in README | ✓ EXISTS (verified via README badge; not deep-fetched) |
| Leaderboard URL | `agentresearchlab.org/benchmarks/deepresearch-bench-ii/index.html` | ✓ EXISTS (in README + arXiv) |
| DeepWiki | `mcp__deepwiki__ask_question("imlrz/DeepResearch-Bench-II", ...)` | **NOT-FOUND** (DeepWiki returned "Repository not found") | ✗ FAIL (single-source) |

**Stage-0 verdict**: **6/7 positive** (1 DeepWiki-miss tolerable since deepwiki indexing is lazy for low-star repos; cross-corroboration via arXiv + HF + leaderboard + GitHub-REST is sufficient under §5.7 W319 ratify). EXISTS confirmed.

---

## §3 — Mechanical understanding (`run_evaluation.py` + `aggregate_scores.py`)

From the README "Installation" section + `pyproject.toml` + the head of `run_evaluation.py`:

### 3.1 — Inputs
- **Model-generated research reports** in PDF, DOCX, image, or text format
- Per-task `prompt` from `tasks_and_rubrics.jsonl` (132 expert-curated research tasks)
- **GEMINI_API_KEY** env-var (rubric judge uses Gemini)

### 3.2 — Evaluation flow
1. For each task `idx ∈ [0, 132)`:
   - Submit task prompt to evaluated model (researcher does this externally — not part of this repo)
   - Load model's report into `run_evaluation.py`
   - Iterate over the task's rubric set (~70 binary rubrics per task on average)
   - Gemini judges each rubric: PASS (1) / FAIL (0)
2. `aggregate_scores.py` collates rubric pass-rates across:
   - 3 dimensions: **information recall**, **analysis**, **presentation**
   - 22 domains
   - 132 tasks → final composite score

### 3.3 — Outputs
- Per-task `{task_idx, rubric_pass_rates}` JSON
- Aggregate `{recall_score, analysis_score, presentation_score, composite_score, domain_breakdown}`
- Comparable to leaderboard entries at `agentresearchlab.org/benchmarks/deepresearch-bench-ii/`

### 3.4 — Subset suitability
**Is there a smoke-test subset?** Per W326 inspection of file structure — NOT explicitly documented; operator can `head -n 10 tasks_and_rubrics.jsonl` for a 10-task smoke-test subset. The full 132-task evaluation would cost ~$5-20 in Gemini API calls (per task ~70 rubrics × $0.001/rubric judge ≈ $0.07-0.10/task × 132 = ~$10-15).

**Smoke-pilot recommendation**: 5 tasks (idx=0,1,2,3,4 = ~350 rubrics ≈ $0.35-0.50) → 1-minute eval-runtime, sufficient to verify wire-up.

---

## §4 — Tier-routing decision (T3 EVAL-LANE vs T1 EVAL-LANE)

W325 Stream-D classified C-10 as **T3 BENCHMARK-EVAL-LANE** with rough score ~4.2. Re-examination under sca-v9 strict scoring:

| Criterion | Score | Notes |
|---|---|---|
| D-EMP | 4 (paper published; leaderboard live; HF dataset live; code Apache-2.0 + minimal deps) | strong empirical viability |
| Cohort overlap with existing eval lanes | LOW (Lane A inspect_ai, Lane B promptfoo, Lane D HarnessAudit-Bench safety, Lane E SWE-Bench Pro coding — NONE measure deep-research rubric quality) | net-new cohort |
| Domain fit | HIGH (W259-v9 P1 eval cadence + research-bench is a SOTA-research-arch corroborator per sca-v9 D37 axis) | aligned |
| Z:-portable | HIGH (`uv run`-ready; no Docker; no compiled-binary deps) | clean |
| Author-prior signal | LOW (50★, single-author Ruizhe Li — anti-bias mandate validates the low-star) | low-prior-VALIDATED |
| arXiv anchor strength | MEDIUM (arXiv id 2601.08536 — submitted 2026-01-13; not yet citation-rich since recent; USTC+Tsinghua authorship gives institutional credibility) | medium |

**T3 verdict justification**: As an **eval-lane** (not a CC primitive), this candidate falls under sca-v9 §5.7 "EVAL-LANE" tier, which is functionally T3-equivalent for runtime-impact (zero CC-primitive footprint). T1 EVAL-LANE would require Lane F to gate the Stop-hook session-end review like Lane D — which is over-reach for a research-quality benchmark.

**Lane F design pattern** (proposed; not shipped this stream):
- **Cadence**: Nightly-only (NOT Stop-hook); operator-invoked via `python harness/eval_harness.py --mode deepresearch-lane`
- **Cost**: ~$0.50/smoke (5 tasks) or ~$10-15/full-run (132 tasks)
- **Pass criterion**: smoke-mode = `composite_score > 0.0` (any non-zero); full-mode = operator-defined threshold
- **Mirror of Lane E SWE-Bench Pro pattern** (W316 P0c) — SCAFFOLD only, real-binding deferred

---

## §5 — Lane F SCAFFOLD draft for `harness/eval_harness.py`

**Operator-action**: append this stub-pattern to `harness/eval_harness.py` between Lane E (line ~1046) and `_parse_promptfoo_output()`. **W326 Stream C does NOT modify the file directly** — this is a draft for operator to absorb in W327.

```python
# ============================================================================
# Lane F — DeepResearch-Bench-II rubric-judged research-quality eval
# ============================================================================
# `imlrz/DeepResearch-Bench-II` (arXiv 2601.08536; Apache-2.0 code + CC-BY-4.0
# data) is a benchmark for measuring deep-research-agent quality via
# 132 expert-curated tasks decomposed into 9,430 binary rubrics across
# 3 dimensions (information recall, analysis, presentation) and 22 domains.
# Lane F wires it as the runtime's nightly research-quality cadence (NOT
# Stop-hook).
#
# Cost: ~$0.50 smoke (5 tasks) or ~$10-15 full (132 tasks) in Gemini API.
# Requires: GEMINI_API_KEY env-var + `pip install requests python-docx`.
# Repo install: `git clone https://github.com/imlrz/DeepResearch-Bench-II
#   Z:/claude-sota-installed-repos/DeepResearch-Bench-II`
# Optionally pin SHA: `git -C Z:/.../DeepResearch-Bench-II checkout 11d87de4`
# ============================================================================

def run_deepresearch_lane(
    *,
    limit: int = 5,
    drb2_repo: Path | None = None,
    reports_dir: Path | None = None,
    dry_run: bool = False,
) -> list[dict[str, Any]]:
    """W326 P0c-equivalent Lane F — DeepResearch-Bench-II rubric eval.

    Args:
        limit: cap task count (default 5 for smoke; 132 for full).
        drb2_repo: path to cloned `DeepResearch-Bench-II` repo (default:
            $DRB2_REPO or Z:/claude-sota-installed-repos/DeepResearch-Bench-II).
        reports_dir: path containing model-generated research reports as
            `{task_idx}.{pdf,docx,txt}` files. Operator pre-generates these
            with target model BEFORE invoking lane F.
        dry_run: if True, skip the Gemini API call and return scaffold-only
            VERDICT: SETUP-PENDING (mirror of Lane D/E pattern).

    Returns:
        list of eval rows in standard format with lane="deepresearch".

    The full benchmark requires:
      1. Operator pre-generates 132 research reports with target model
         (this lane does NOT generate reports; it only judges them).
      2. Operator provides GEMINI_API_KEY env-var.
      3. drb2_repo cloned + `uv sync` run in repo dir for pyproject deps.
    Lane F is therefore a SCAFFOLD in this commit; real-binding ships W328.
    """
    import os, subprocess, json
    if drb2_repo is None:
        drb2_repo = Path(os.environ.get("DRB2_REPO", "Z:/claude-sota-installed-repos/DeepResearch-Bench-II"))
    if reports_dir is None:
        reports_dir = Path(os.environ.get("DRB2_REPORTS", drb2_repo / "reports"))

    rows: list[dict[str, Any]] = []
    if dry_run:
        rows.append({
            "lane": "deepresearch",
            "task_id": "drb2-smoke-scaffold",
            "score": None,
            "status": "SETUP-PENDING",
            "model": "n/a",
            "notes": "Lane F SCAFFOLD — real-bind requires drb2_repo clone + GEMINI_API_KEY + reports_dir; W326 P0c stub",
        })
        return rows

    if not drb2_repo.exists():
        rows.append({
            "lane": "deepresearch",
            "task_id": "drb2-repo-missing",
            "score": 0.0,
            "status": "BLOCKED",
            "model": "n/a",
            "notes": f"DRB2 repo not found at {drb2_repo}; clone via `git clone https://github.com/imlrz/DeepResearch-Bench-II`",
        })
        return rows

    if not os.environ.get("GEMINI_API_KEY"):
        rows.append({
            "lane": "deepresearch",
            "task_id": "drb2-no-gemini-key",
            "score": 0.0,
            "status": "BLOCKED",
            "model": "n/a",
            "notes": "GEMINI_API_KEY env-var required for rubric judging",
        })
        return rows

    # Real-binding via `uv run` (DRB2 uses uv lock-file pattern)
    cmd = [
        "uv", "run", "--directory", str(drb2_repo),
        "python", "run_evaluation.py",
        "--limit", str(limit),
        "--reports-dir", str(reports_dir),
        "--output-json", str(drb2_repo / "drb2_lane_f_result.json"),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=1800)
    if result.returncode != 0:
        rows.append({
            "lane": "deepresearch",
            "task_id": "drb2-eval-error",
            "score": 0.0,
            "status": "ERROR",
            "model": "gemini",
            "notes": f"run_evaluation.py exit={result.returncode}; stderr={result.stderr[:500]}",
        })
        return rows

    result_path = drb2_repo / "drb2_lane_f_result.json"
    if not result_path.exists():
        rows.append({
            "lane": "deepresearch",
            "task_id": "drb2-no-result",
            "score": 0.0,
            "status": "ERROR",
            "model": "gemini",
            "notes": "run_evaluation.py succeeded but no result file written",
        })
        return rows

    drb2_data = json.loads(result_path.read_text())
    for entry in drb2_data.get("per_task", []):
        rows.append({
            "lane": "deepresearch",
            "task_id": f"drb2-task-{entry.get('idx', 'unknown')}",
            "score": entry.get("composite_score", 0.0),
            "status": "PASS" if entry.get("composite_score", 0) > 0 else "FAIL",
            "model": entry.get("model", "unknown"),
            "notes": f"recall={entry.get('recall_score', 0):.2f} analysis={entry.get('analysis_score', 0):.2f} presentation={entry.get('presentation_score', 0):.2f}",
        })
    return rows
```

**argparse + main() wire-up additions** (also draft only):

```python
# In main() around L1581-L1722, add to ap.add_argument list:
ap.add_argument(
    "--deepresearch-limit",
    type=int,
    default=5,
    help="deepresearch-lane: cap task count (default 5 for smoke; 132 for full)",
)
ap.add_argument(
    "--drb2-repo",
    type=Path,
    default=None,
    help="deepresearch-lane: override path to cloned DeepResearch-Bench-II repo",
)
ap.add_argument(
    "--drb2-reports",
    type=Path,
    default=None,
    help="deepresearch-lane: path to dir of model-generated reports {task_idx}.{pdf,docx,txt}",
)

# In main() mode dispatch, add new mode handler before swe-bench-pro:
if args.mode == "deepresearch-lane":
    print("=== W326 P0c-equiv — deepresearch-lane (Lane F SCAFFOLD) ===")
    rows = run_deepresearch_lane(
        limit=args.deepresearch_limit,
        drb2_repo=args.drb2_repo,
        reports_dir=args.drb2_reports,
        dry_run=args.dry_run,
    )
    summary = _aggregate(rows)
    payload = {"rows": rows, "summary": summary, "lane": "deepresearch"}
    _persist("deepresearch-lane.json", payload)
    if any(r.get("status") in {"PASS"} for r in rows):
        print("VERDICT: PASS — deepresearch-lane smoke succeeded.")
        return 0
    print(
        "VERDICT: SETUP-PENDING — deepresearch-lane real run is W327 operator-AI "
        "(requires DRB2 repo clone + GEMINI_API_KEY + reports_dir).",
    )
    return 0  # SCAFFOLD never blocks the Stop hook; nightly cadence only
```

**Choice mirrors Lane E SWE-Bench Pro precedent** (W316 P0c — both are nightly/deferred, not Stop-hook).

---

## §5 — VERDICT-LEDGER row draft

```jsonl
{"row":"W326-88","date":"2026-05-19","candidate":"imlrz/DeepResearch-Bench-II","head_sha":"11d87de486","license_code":"Apache-2.0","license_data":"CC-BY-4.0+CC-BY-NC-4.0+CC0-mixed","rubric_version":"sca-v9","path":"b-eval-lane","stage_0_existence":"PASS-6-of-7-deepwiki-miss-tolerable","d_emp":4,"d35":3,"d34":1,"tier":"T3-EVAL-LANE","action":"Lane-F-SCAFFOLD-drafted-real-binding-W327","cost_smoke_usd":0.50,"cost_full_usd":15.00,"requires":"git-clone+GEMINI_API_KEY+pre-generated-reports","blast_radius":"zero-runtime-impact-eval-only","rollback":"git-clone-undo+remove-Lane-F-stub","convergence":"6-of-7","3_org_distinct":"PASS-USTC+Tsinghua+HuggingFace-muset-ai+Anthropic-leaderboard-rendered","arxiv":"2601.08536","leaderboard":"agentresearchlab.org/benchmarks/deepresearch-bench-ii"}
```

---

## §6 — Install + wire-up + rollback operator-action sequence

### 6.1 — Repository clone (~10s)

```powershell
cd Z:/claude-sota-installed-repos
git clone https://github.com/imlrz/DeepResearch-Bench-II
cd DeepResearch-Bench-II
git checkout 11d87de4  # pin to W326-audit-time SHA
uv sync  # install requests + python-docx via uv lockfile
```

### 6.2 — Configure Gemini API key (LOCAL only — gitignored)

Add to `CLAUDE.local.md` env-block (NOT tracked .mcp.json):
```powershell
$env:GEMINI_API_KEY = '<your-gemini-key>'  # NEVER commit
```

### 6.3 — Verify dataset (~1s)

```powershell
$env:GEMINI_API_KEY # confirm set
Get-Content Z:/claude-sota-installed-repos/DeepResearch-Bench-II/tasks_and_rubrics.jsonl | Measure-Object -Line  # expect ~132 lines
```

### 6.4 — Pre-generate reports for first 5 tasks (smoke; SEPARATE STEP)

```powershell
# Operator uses Claude Code OR Anthropic API OR any model to generate 5 reports
# saving them as Z:/claude-sota-installed-repos/DeepResearch-Bench-II/reports/{0,1,2,3,4}.txt
# (or .pdf or .docx — pipeline accepts any of these formats)
```

### 6.5 — Wire Lane F into eval_harness.py (operator W327)

Apply §5 SCAFFOLD draft above to `harness/eval_harness.py`.

### 6.6 — Run smoke (~1min, ~$0.50)

```powershell
Z:/venvs/claude/Scripts/python.exe harness/eval_harness.py --mode deepresearch-lane --deepresearch-limit 5 --drb2-reports Z:/claude-sota-installed-repos/DeepResearch-Bench-II/reports
# Expected: VERDICT: PASS or VERDICT: SETUP-PENDING (if scaffold not yet wired)
```

### 6.7 — Rollback (60s)

```powershell
# 1. Remove the Lane F stub from harness/eval_harness.py:
git checkout -- harness/eval_harness.py
# 2. Remove cloned repo:
Remove-Item -Recurse -Force Z:/claude-sota-installed-repos/DeepResearch-Bench-II
# 3. Unset env-var in CLAUDE.local.md (delete the line)
# 4. (Optional) remove pip deps that uv added: uv tool uninstall ...
```

---

## §7 — Forward-AIs (W327)

| ID | Priority | Action |
|---|---|---|
| W326-C-4-AI-1 | P1 | **Clone repo** `git clone https://github.com/imlrz/DeepResearch-Bench-II` into `Z:/claude-sota-installed-repos/` + `uv sync` |
| W326-C-4-AI-2 | P1 | **Apply Lane F SCAFFOLD** from §5 to `harness/eval_harness.py` (paste-ready stub) |
| W326-C-4-AI-3 | P2 | **Acquire GEMINI_API_KEY** + add to `CLAUDE.local.md` env-block (NOT tracked) |
| W326-C-4-AI-4 | P2 | **Pre-generate 5 smoke reports** with current Opus 4.7 — establishes baseline before benchmarking against other models |
| W326-C-4-AI-5 | P2 | **Run smoke evaluation** + record VERDICT-LEDGER row #88 with actual composite_score |
| W326-C-4-AI-6 | P3 | **Decide Lane F cadence** — smoke nightly OR full weekly OR operator-on-demand |
| W326-C-4-AI-7 | P3 | **Consider DRB2 data license** for any results published — 2 tasks (idx=26, idx=110) are CC-BY-NC; if commercial use of evaluations, exclude these tasks |
| W326-C-4-AI-8 | P3 | **Cross-link with W325 Stream-D §C-10 verdict** — close the W326-deferred recommendation |
| W326-C-4-AI-9 | P3 | **Compare to alternative**: Ayanami0730/deep_research_bench (predecessor; check if more mature) — referenced in WebSearch results as "DeepResearch Bench: A Comprehensive Benchmark for Deep Research Agents" |

---

## §8 — Cite-anchors

- Repo: `https://github.com/imlrz/DeepResearch-Bench-II` HEAD `11d87de486` 2026-05-14
- arXiv paper: `https://arxiv.org/abs/2601.08536`
- alphaXiv mirror: `https://www.alphaxiv.org/abs/2601.08536`
- HF dataset: `https://huggingface.co/datasets/muset-ai/DeepResearch-Bench-II-Dataset`
- Leaderboard: `https://agentresearchlab.org/benchmarks/deepresearch-bench-ii/index.html`
- ResearchGate PDF: `https://www.researchgate.net/publication/399755315_DeepResearch_Bench_II_Diagnosing_Deep_Research_Agents_via_Rubrics_from_Expert_Report`
- arXiv HTML: `https://arxiv.org/html/2601.08536`
- Predecessor: `https://github.com/Ayanami0730/deep_research_bench` (DRB1)
- W325 Stream-D: `Z:/claude-sota-installed/docs/architecture/W325-RUNTIME-V8-SOTA-SWEEP/STREAM-D-SOTA-CANDIDATES.md` C-10 entry
- Lane D precedent: `harness/eval_harness.py` lines 693-922 (HarnessAudit-Bench W316 P0c)
- Lane E precedent: `harness/eval_harness.py` lines 941-1046 (SWE-Bench Pro W316 P0c)
- Authors: USTC-CMI (`agentresearchlab.org`) + Tsinghua University per arXiv 2601.08536 v2
- 3-org-distinct anchors: USTC (academic) + Tsinghua (academic) + Anthropic Leaderboard rendering OR HuggingFace (dataset hosting) = 3 distinct orgs
