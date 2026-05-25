---
title: W164 CR-8 Methodology Deep Audit
agent: agent-b-gpt5-reviewer (BRIDGE-MODE)
date: 2026-05-13
---

## Q1: Denominator Accuracy (85-row claim)

[VERIFIED] The required raw probe returns **199**, not 85:

```powershell
rg -c 'INSTALLED|ADAPTED-FROM-SOTA|PENDING-AUDIT|PLANNED' docs/sota-installed-manifest.md
# 199
```

[VERIFIED] A table-row scan grouped by `##` section returned **189** matching rows, also not 85. It over-includes the giant `## Sections (architectural axes)` block as one umbrella section with 108 matching rows, which proves the sectioning/counting methodology is fragile unless it pins exact section ranges.

[VERIFIED] The F29 baseline itself claimed 85 rows from section counts and also admitted a broader adjusted total of 96 because Section 0 was undercounted: `.claude/state/wave164-progress.jsonl:19` records `total_install_class_rows: 85`, `section_0_undercounted_by_regex`, and `broader_adjusted_total: 96`; the F29 reference repeats that "true denominator 85" and "96 with Section 0 adjustment" at `.claude/projects/Z--claude-sota-installed/memory/reference_w164_f29_fm20_n15_denominator_reframe_2026_05_13.md:67`.

Finding: **85 is not accurate as a current manifest-wide denominator under the requested probe.** The discrepancy is +114 vs raw `rg -c` (199 - 85), +104 vs broad table-row grouping (189 - 85), and even F29's own reference carried an internal 85-vs-96 adjustment.

## Q2: FM-20 n=16 Sub-class Classification

[VERIFIED] These are **one shared FM-20 mechanism with distinct surface classes**, not three independent root mechanisms. The shared mechanism is stale or shape-invalid claim propagation across fire boundaries without a fresh probe.

Evidence:

- Denominator-shape: F23 says the "97.3% PENDING-AUDIT" claim used a line denominator instead of install-class rows and reframed scope from 548 to 17 rows (`reference_w164_f23_fm20_n14_cr8_scope_correction_2026_05_13.md:3`, `:63`, `:84`).
- Broader denominator-shape: F29 says the F23 baseline 29 propagated through F25-F28 without a broader denominator probe and was refuted by 85/96 denominator evidence (`reference_w164_f29_fm20_n15_denominator_reframe_2026_05_13.md:21`, `:28`, `:31-33`, `:67`).
- Table-shape: F30 says Section 13 had 5 header columns but 6+ row cells, so the edit shape was undetermined; wrong selection would cascade across later sections (`reference_w164_f30_section13_table_shape_defer_2026_05_13.md:42-47`, `:53-57`).
- Daemon-down-stale: F36 records Docker/FalkorDB were actually up and the daemon-down claim propagated for 22+ hours through F28-F35 (`.claude/state/wave164-progress.jsonl:25`).

Classification: denominator-shape, table-shape, and daemon-down-stale are **sub-classes of FM-20 claim-propagation drift**. They differ by probe type: count probe, table parity probe, runtime liveness probe.

## Q3: Convergence Claim Validity

[VERIFIED] The "6 consecutive clean fires" claim is only partially real. It is real as a `wave164-progress.jsonl` local arc-status claim, but not as evidence that six consecutive Codex T1 reviews fired and passed.

Evidence:

- F32a claims "3 consecutive fires no NEEDS_REVISION conf above 0.85" (`.claude/state/wave164-progress.jsonl:22`).
- F32b claims 4 consecutive (`.claude/state/wave164-progress.jsonl:23`).
- F35 claims 5 consecutive (`.claude/state/wave164-progress.jsonl:24`).
- F36 claims 6 consecutive (`.claude/state/wave164-progress.jsonl:25`).

[VERIFIED] The actual recent `codex_review_HEAD_*.txt` history is noisy and not clean: recent HEAD review files include multiple `needs-attention` verdicts with confidence above 0.85, e.g. `codex_review_HEAD_cae7de96.txt:1` confidence 0.9, `codex_review_HEAD_fee8e689.txt:1` confidence 0.86, `codex_review_HEAD_36a9ac4e.txt:1` confidence 0.86, and `codex_review_HEAD_6664073d.txt:1` confidence 0.86.

[VERIFIED] For W164 F31-F36 specifically, `wave164-progress.jsonl` records local Pattern A / operator-feedback events and does **not** record fresh Codex T1 verdicts for each clean fire. F15 did fire a real Codex T1 for F14 and got APPROVE confidence 0.86 (`.claude/state/wave164-progress.jsonl:4`); F31-F36 mostly record Mia probes and Pattern A applications (`.claude/state/wave164-progress.jsonl:21-25`).

Finding: **phantom convergence risk.** The claim means "no recorded W164 CR-8 batch produced a new high-confidence NEEDS-REVISION," not "six consecutive Codex T1 reviews fired and approved."

## Q4: PENDING-AUDIT vs ADAPTED-FROM-SOTA Grading Rigor

[VERIFIED] Five ADAPTED-FROM-SOTA samples:

- Launcher has CCBP and Anthropic docs cite anchors (`docs/sota-installed-manifest.md:58`) [PASS].
- Settings minimum has Anthropic docs and CCBP `@ HEAD` cite anchors (`docs/sota-installed-manifest.md:64`) [PASS].
- Claude Agent SDK Python has GitHub HEAD and PyPI hash evidence (`docs/sota-installed-manifest.md:76`) [PASS].
- pre-commit has upstream HEAD `805f335...` and v4.6.0 installed path (`docs/sota-installed-manifest.md:155`) [PASS for source cite; see Q5 for runtime gap].
- commitlint has upstream pinned tag v20.5.3 and npm canonical channel (`docs/sota-installed-manifest.md:344`) [PASS, but weaker than file:line @ HEAD].

[VERIFIED] Five PENDING-AUDIT rows requested could not be sampled because only **two** rows currently match `^|.*PENDING-AUDIT`:

- Qdrant remains PENDING-AUDIT because image staging plus daemon-down/not-wired is not operational proof (`docs/sota-installed-manifest.md:147`) [correctly cautious].
- Trivy remains PENDING-AUDIT because it is not yet installed and canonical install path is documented (`docs/sota-installed-manifest.md:163`) [correctly cautious].

[VERIFIED] Flagged grading weakness: many ADAPTED rows have upstream URLs/tags but not strict `file:line @ HEAD SHA` anchors. Examples include Cmd shim (`docs/sota-installed-manifest.md:59`), PATH installer (`:60`), README (`:69`), commitlint (`:344`), and commitizen (`:345`). These may be reasonable for package-install rows, but they do not satisfy the strictest CR-1 "file:line + HEAD SHA" standard.

## Q5: Silent Failure Risk in CR-8 Methodology

[VERIFIED] The central silent failure risk is **binary presence being treated as operational conformance**. ADAPTED-FROM-SOTA often proves a tool exists and has an upstream cite, but not that the runtime path actually exercises it today.

Concrete example:

- Manifest says pre-commit v4.6.0 is installed at `.local/bin/pre-commit.exe` and "repo config wired by `.pre-commit-config.yaml`" (`docs/sota-installed-manifest.md:155`).
- `.pre-commit-config.yaml` exists and defines gitleaks, ruff, and actionlint hooks (`.pre-commit-config.yaml:27-41`).
- `pre-commit --version` returned `pre-commit 4.6.0`, and `pre-commit validate-config` exited 0.
- But `git config --get core.hooksPath` returns `Z:\claude-sota-installed\.git\hooks`, and `.git/hooks/pre-commit` is **MISSING**. Therefore pre-commit is installed/config-valid but not proven to run on `git commit`.

[VERIFIED] The repo does have Claude-side commit gates: `.claude/settings.json:161-191` registers `gitleaks_pre_commit_gate.py` for commit patterns, and `.claude/settings.json:198-204` registers Codex T2 pre-commit patterns. That is operational coverage, but it is not the same as pre-commit framework firing.

Finding: CR-8 grading confidence exceeds operational reality when the row status is based on install/cite evidence alone. A row needs a separate "runtime firing proof" cell or recent smoke probe if the component is supposed to gate commits, hooks, daemons, MCP calls, or background services.

## Q6: FM-20 Forward Invariant Sufficiency

[VERIFIED] Current rules already encode the general FM-20 boundary: verify sub-claims at synthesis time before carrying them into the next brief (`.claude/rules/fm20-path-drift-cascade.md:30-43`, `:74-78`, `:92-101`). Forward Discipline #2 narrows Codex T1 scope for codification fires to one primitive, 60-120s target, and JSON verdict shape (`.claude/rules/codex-t1-pattern-b-forward-discipline.md:51-63`).

[VERIFIED] F30's added invariant, "Mia-probe target section header/separator/first rows before CR-8 Pattern A apply," is necessary and was validated in F31/F32a/F35 (`.claude/state/wave164-progress.jsonl:20-24`). It prevents table-shape cascades.

It is **not sufficient** for all FM-20 cascades because it does not cover:

- Runtime-state marker decay: F36 found Docker/FalkorDB daemon state had changed and stale daemon-down claims propagated for 22+ hours (`.claude/state/wave164-progress.jsonl:25`).
- Denominator drift at section boundary: F32b found Section 5 actual count diverged from F29 baseline (`.claude/state/wave164-progress.jsonl:23`).
- Manifest-wide denominator drift: F29 itself found F23-F28 propagated a stale denominator (`reference_w164_f29_fm20_n15_denominator_reframe_2026_05_13.md:21-33`).

Proposed additions:

1. **Runtime re-probe invariant**: any claim containing daemon/process/socket/container/port/up/down/live/stale must be re-probed when reused after one fire or after 30 minutes, whichever comes first.
2. **Section-boundary denominator recount**: before each CR-8 batch, count target-section rows from current file contents and compare to the cascade plan; record `planned_count`, `actual_count`, and `delta`.
3. **Manifest-wide denominator checkpoint**: after every 3 CR-8 batch fires or any section split, recompute manifest-wide denominator and CR-8 classified numerator with the exact command stored in the report.
4. **Operational-proof tier**: split CR-8 cells into source conformance (`ADAPTED-FROM-SOTA`) and runtime conformance (`SMOKE-PASS`, `CONFIG-ONLY`, `INSTALLED-NOT-FIRING`, `STALE-RUNTIME`).
5. **PENDING-AUDIT minimum sample guard**: when an audit asks for N samples and fewer exist, report the actual count and stop inventing sample breadth.
6. **Codex convergence discriminator**: convergence counters must distinguish `NO_T1_FIRED`, `T1_APPROVE`, `T1_HNF`, and `T1_NEEDS_REVISION`; "clean fire" cannot imply Codex passed.

## VERDICT: DONE_WITH_CONCERNS - CR-8 methodology improved after F29/F30/F36, but current denominator, convergence, and operational-proof practices still allow silent FM-20 drift.

## PRESCRIPTIONS:

1. Replace the 85-row baseline with a reproducible denominator script and commit its exact output artifact per section.
2. Add runtime re-probe gates for daemon/process/container status claims at multi-fire boundaries.
3. Add section-boundary row recount before every CR-8 Pattern A apply.
4. Split CR-8 classification into source-cite conformance and runtime-operational conformance.
5. Install or explicitly disable `.git/hooks/pre-commit`; do not claim pre-commit is commit-wired from config presence alone.
6. Reword "6 consecutive clean fires" to "6 local W164 CR-8 fires without a recorded high-confidence T1 NEEDS-REVISION; Codex T1 did not fire for each."
7. Flag ADAPTED-FROM-SOTA rows without file:line @ HEAD SHA as "source-cite weak" unless package-manager provenance is the intended exception.
8. Update FM-20 rule with the three observed W164 sub-classes: denominator-shape, table-shape, and runtime-state marker decay.
