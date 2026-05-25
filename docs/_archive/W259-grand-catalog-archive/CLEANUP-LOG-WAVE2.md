# W259 Wave-2 Stale Cleanup Audit — CLEANUP LOG

Generated: 2026-05-16 by W259 WAVE-2 STALE CLEANUP AUDITOR

## Mission

Wave 1 (W259 RESEARCH ARTIFACT ORGANIZER) moved 2,241 files into 12 buckets under
`docs/architecture/W259-grand-catalog/00-archive-from-prior-waves/`. Wave 2 audits for
STILL-STALE / SUPERSEDED / DUPLICATE files outside that catalog and moves them in.

## Wave-2 Summary

- **Files moved this pass**: **4,680** (catalog grew from 2,241 → 6,921 files)
- **New buckets created**: 7
- **Workspace-root scratch noise eliminated**: 800 (all gone)
- **PSScriptPolicy noise eliminated**: 100 (all gone)
- **Prior-wave `docs/` orphan directories archived**: 4 (grand-catalog-2026-05-15, grand-synthesis-2026-05-16, sota-architecture-audit, superpowers)
- **`docs/` root `.md` artifacts archived**: 100 of 102 (2 active-refs preserved)
- **`.claude/state/` codex_review_HEAD_*.txt archived**: 1,005 (to codex-verdicts bucket)
- **`.claude/state/` operator-state directories archived**: 8 (auto_proceed_allow_buckets/, codex_t1_*, w171_p3_*)
- **`tmp/` prior-wave extract dirs archived**: 12 (wave122-*, wave222-*, v64, wave6N-*, wave252-*, wave-pure-runtime, wave229/230-sourcedive)

## Bucket Final State (post-Wave-2)

| Bucket | Wave-1 Count | Wave-2 Count | Description |
|---|---:|---:|---|
| wave-research-A-Z | 200 | 200 | Layered sota-pure / w/W-wave research |
| scoring-matrices | 24 | 24 | 10-dim scoring tables |
| synthesis-final-versions | 50 | 50 | Final synthesis docs |
| codex-verdicts | 1079 | **2122** | codex_consult/review verdicts (+1043 from `.claude/state/codex_review_HEAD_*`, codex_t2_gate_*, codex_w222t_*, w212l_codex_*, codex_consult_w256_*, etc) |
| commit-messages | 479 | **485** | Commit-msg drafts (+6 from `.claude/state/`) |
| install-reports | 57 | 57 | Install-delta / install-report |
| audit-findings | 48 | **54** | Audit reports, ARC-CLOSE (+6 state probes: w222/w224/w228/w230/wave257_graphql) |
| goal-prompts | 30 | 30 | /goal predicate drafts |
| fleet-reports | 11 | 11 | Account/auth fleet probes |
| convergence-axes | 58 | **73** | W258r1-r38 + 15 state W258_* convergence research files |
| ship-decisions | 11 | 11 | Ship verdicts |
| low-quality-archive | 190 | 190 | Duplicates, fragments, noise |
| **prior-wave-docs-root** (NEW) | 0 | **100** | `docs/*.md` prior-wave artifacts (fleet-manifest, wave\*, w\*, sota-\*, fire\*, discipline-class .md files) |
| **prior-wave-grand-catalog-2026-05-15** (NEW) | 0 | **15** | Whole prior wave catalog tree (4 subdirs + 3 root .md files) |
| **prior-wave-grand-synthesis-2026-05-16** (NEW) | 0 | **1450** | Whole prior W258 synthesis tree (00-MASTER, 01-prior-W258-canonical, 02-wave-keep-canonical, 03-kits, 04-outer-research, 05-codex-consults, 06-fresh-research, 90/91-superseded-archive) |
| **prior-wave-sota-architecture-audit** (NEW) | 0 | **218** | Prior sota-architecture-audit dir (00-master-tracker, fire-1 thru fire-NN/) |
| **prior-wave-superpowers-plans** (NEW) | 0 | **2** | docs/superpowers/{plans,specs}/2026-05-12-sota-architecture-deep-audit.md and design |
| **state-archive** (NEW) | 0 | **444** | `.claude/state/auto_proceed_allow_buckets/` (~750 hourly JSON gate state — kept via wave-progress-logs subdir + 5 w171_p3_wave1_sources_* dirs + codex_t1_allow_excluded_buckets/ + codex_t1_auto_locks/) |
| **scratch-noise** (NEW) | 0 | **1383** | 800 workspace-root "blat" scratch files + 100 tmp/__PSScriptPolicyTest_* + 12 tmp/wave*/v64/wave6N extract dirs (482 nested files) |
| **TOTAL** | **2237** | **6921** | (+4684) |

## Files moved (categorized)

### Workspace-root scratch (800 → `scratch-noise/workspace-root-blat-scratch/`)
- 800 random-named 8-char-hash untracked files at workspace root, all 4 bytes containing "blat"
- Per `CLAUDE.md` pending section: "Triage 800+ untracked items (random-named scratch files) in working tree" — origin: hookify/claude write-probe stress test
- Path: `006in8dz`, `039wyc8y`, ... (800 files)

### `tmp/__PSScriptPolicyTest_*` (100 → `scratch-noise/tmp-psscriptpolicy/`)
- PowerShell auto-generated policy-test scratch (`.ps1` + `.psm1` files, ~0-20 bytes each)

### `tmp/wave*-extract`, `tmp/v64`, `tmp/wave6N-*`, etc (12 dirs → `scratch-noise/tmp-wave-extracts/`)
- Extracted prior-wave kit/research dumps:
  - `wave122-kits-extract/` (326K) — v63/v64 ultimate quality execution md kits
  - `wave122-v63-extract/` (190K)
  - `wave122-v64-extract/` (136K)
  - `wave222-v7-extract/` (520K)
  - `wave222-v8-extract/` (182K)
  - `v64/` — Wave 85 agent reports (agentA-marketplace-audit, agentB-memory-l2l3-wire, agentC-acp-wire)
  - `wave6N-parsed/`, `wave6N-sections/` (580K combined)
  - `wave252-repos/` (732K) — Wave 252 outer-research repo data
  - `wave-pure-runtime-2026-05-15/` — Wave-pure runtime reconciliation
  - `wave229-sourcedive/`, `wave230-sourcedive/`

### `.claude/state/` prior-wave artifacts (~1500+ files)
- **1,005** codex_review_HEAD_*.txt + .prompt.txt → `codex-verdicts/`
- 2 codex_consult_w256_closing_adversarial_* (W256 closed) → `codex-verdicts/`
- 14 codex_t2_gate_*.txt → `codex-verdicts/`
- 6 codex_w222t_call*.txt + OUT → `codex-verdicts/`
- 4 codex_smoke_test_z*, codex_fix*, codex_ping*, codex_write_probe_w171.txt, codex_preflight_live_auth.json → `codex-verdicts/`
- 6 w212l_codex*_OUT.txt + prompts → `codex-verdicts/`
- 1 codex_review_w195_p0_t2.txt → `codex-verdicts/`
- 6 commit-msg files (commit_msg_w156_daemon.txt, w166-p3-commit-msg.txt, w198-p2final-msg.txt, w201-p0/p0i-commit-msg.txt, wave201-p1p4-commit-msg.txt) → `commit-messages/`
- 5 state probe .json (w222-license-probe.json, w224-v6-lean-core-probe.json, w228-graphql-top30-metadata.json, w230-graphql-batch2-rows31-60.json, wave257_graphql_batch1_OUT.json) → `audit-findings/`
- 47 W258_runtime_research.md + W258r1-r38_*.md → `convergence-axes/`
- 16 wave\*-progress.jsonl / wave\*_progress.jsonl → `state-archive/wave-progress-logs/`
- 8 state subdirs (auto_proceed_allow_buckets/ ~378 files, codex_t1_allow_excluded_buckets/, codex_t1_auto_locks/, w171_p3_wave1_sources_{awesome_claude_plugins,awesome_llm_apps,gitnexus,karpathy_skills,wshobson_agents}) → `state-archive/`

### `docs/` orphan dirs (4 directories → 4 new prior-wave-* buckets)
- `docs/grand-catalog-2026-05-15/` (256K, 15 files) → `prior-wave-grand-catalog-2026-05-15/` — W258 prior catalog
- `docs/grand-synthesis-2026-05-16/` (28M, 1450 files) → `prior-wave-grand-synthesis-2026-05-16/` — W258 prior synthesis (90-superseded-archive/, 91-superseded-masters/ + all category trees)
- `docs/sota-architecture-audit/` (3.7M, 218 files, tracked) → `prior-wave-sota-architecture-audit/` (git mv)
- `docs/superpowers/` (108K, 2 files, tracked) → `prior-wave-superpowers-plans/` (git mv)
- `docs/architecture/W258-multi-axis-convergence-2026-05-16/` (empty) → removed via rmdir

### `docs/*.md` root prior-wave artifacts (100 files → `prior-wave-docs-root/`)
- 29 fleet-manifest-2026-05-1\*T\*.md (W248-W258 fleet snapshot manifests)
- 25 wave\*.md (wave118-architecture-audit, wave119/120/121-next-session-plan, wave134-fire41-47-synthesis, wave150-docker-migration, wave152-f16-cite-only, wave153-f2-f13 series, wave154-arc-close, wave155-f1-f8 series, wave159p2-close-synthesis)
- 9 w[0-9]\*.md (w187-audit-conformance, w190/192/193 series, w198-p2final, etc)
- 10 sota-\*.md (sota-advanced-workflow, sota-auto-compact-w191, sota-feature-activation, sota-gap-resolution-prompt-v2.1, sota-operator-commands-reference, sota-pure-install-plan, sota-pure-runtime-catalog, sota-research-architecture, sota-unleash-checklist)
- 2 fire\*.md (fire49-audit-percentage-report, fire50-opencode-deepdive)
- Discipline-class artifacts: 4class-memory-taxonomy-discipline, codex-t1-pattern-b-forward-discipline, convergence-gate-pre-burn-in-band-extension-discipline, cosign-verify-attestation-discipline, evidence-governed-harness-8-gate-discipline, infrastructure-convergent-pattern, install-from-github-discipline, port-note-discipline (none of these are referenced in active `.claude/skills/` or settings.json)
- W160, W164 audit refresh reports

## Files PRESERVED (audit-trail rationale)

### `docs/*.md` actively referenced (2 files)
- `docs/sota-installed-manifest.md` — referenced in `.claude/settings.json` permissions allowlist
- `docs/install-provenance.md` — referenced in `.claude/settings.json` permissions allowlist

### `docs/architecture/` active
- `docs/architecture/README.md` — top-level architecture README, predates W259
- `docs/architecture/W259-grand-catalog/` — current wave catalog (the 11 newly-created artifacts: INDEX.md, INSPIRATIONS-EXTRACT.md, 6 LAYER-A-F deepdives, MASTER-SCORING-MATRIX-W259, MISSED-SOTA-REPOS-2026-05-16, PRIMARY-SOURCE-VERIFICATION-2026-05-16, W258-V13-CRITIQUE, W259-ULTIMATE-SYNTHESIS-FINAL)

### `docs/outer research/` (CLAUDE.md pointer)
- Install manifest + research catalog dir (per CLAUDE.md `## Pointers`)

### `.claude/state/` active runtime (65 files)
- 3 codex_consult_w259_*_OUT.txt (CURRENT WAVE — active baseline/final/v2-ship-gate)
- 21 posttooluse_context_monitor_warned_*.json (active hook state per UUID)
- Runtime state: auto_proceed_gate_latch.json (+1 .tmp lockfile), compact_hint.json, context_window_sidecar.json, cpa_oauth_quota_state.json, eval_pass_rate_baseline.json, swallow_counter.json
- 31 jsonl event logs (aperant_poller, audit_coverage, auto_proceed_gate, cli_path_audit, codex_failure_audit, codex_gate, codex_mcp_healthcheck, codex_postcommit_reviews, codex_postcommit_silent_fallback, codex_prepush_reviews, codex_review_queue, codex_stop_review_gate, codex_t1_consult_gate, codex_t2_pre_commit_gate, codex_t5_plan_stream, codex_verdict_summary, context_window_statusline_errors, cpa_oauth_quota, eee_rotation_planner, gitleaks_pre_commit, observations, precompact_guard, precompact_hint_emitter, process_hygiene_audit, process_hygiene_audit_expanded, sessionstart_compact_hint_reader, subagent_metrics, swallow_log, userpromptsubmit_compact_threshold) + .lock variants
- 2 log files: cache-fix-proxy.{err,log}
- 2 retained dirs: `archive/` (already-archived), `tmp/` (state temp)

### `.claude/state/codex_consult_w259_*` (3 files — CURRENT WAVE OUT artifacts)
- codex_consult_w259_baseline_adversarial_OUT.txt
- codex_consult_w259_final_adversarial_OUT.txt
- codex_consult_w259_v2_final_ship_gate_OUT.txt

### `.claude/settings.json.{bak,pre-W255-bak}` (per CLAUDE.md "Pre-cleanup state tagged...; revert via git revert HEAD if needed")

## Files SKIPPED with rationale

### Operator/runtime state (per mission "DO NOT TOUCH")
- `accounts/` — operator state
- `.claude/plugins/` — upstream plugin caches
- `.claude/projects/` — session JSONLs
- `.claude/worktrees/agent-*` — locked agent worktrees
- `.claude/skills/` — cardinal-rule-4 install-class rule layer
- `.claude/teams/`, `.mem0/`, `Documents/`, `bin/desktop-config-migrate.ps1`, `config.toml`, `error.log` — runtime operator state
- `.claude/plugins/plugin-catalog-cache.json` — upstream cache

### Upstream caches under `tmp/` (size in parens — would be costly to move + lose provenance)
- `tmp/codex-home*/`, `tmp/codex-temp*/`, `tmp/codex-w192-bridge-home*/`, `tmp/codex-wave122-audit-home/`, `tmp/codex-wave190-home-*`, `tmp/codexhome/` (~145M of codex CLI session/auth clones)
- `tmp/codex-home-w156-v3/` (50M) — plugins/skills clone
- `tmp/npm-cache*` (multiple npm clone caches)
- `tmp/cpa-keeper-v153-staging`, `tmp/sigstore-verify-cosign-v3.0.6`, `tmp/spec-kit-v0.8.8-audit`, `tmp/compound-engineering-plugin-audit-*` — upstream tool downloads
- `tmp/gitleaks-dl/` — gitleaks download cache
- `tmp/sota-audit-repos`, `tmp/sota-audit-repos-2`, `tmp/sota-audit-w134`, `tmp/sota-review-D-verify`, `tmp/hallucination-audit/` — repo metadata caches (preserved for audit-trail)
- `tmp/wave172-audit-repos`, `tmp/wave184-hooks-backup-2026-05-13`, `tmp/wave185-pre-reauth-backup`, `tmp/wave187-probe1.json`, `tmp/wave190-codex-probes`, `tmp/wave189-orphan-backup`, `tmp/wave253b-gh-probes`, `tmp/wave138-fire1-wshobson-probe` — operator probe backups (preserved)
- `tmp/retired/` — explicitly-retired tmp content
- `tmp/archive/` — already-archived tmp content
- `tmp/cla*`, `tmp/claude-*` cwd snapshots, `tmp/claude-*@*.json` auth backups, `tmp/auth_files_*.json`, `tmp/cpa-*`, `tmp/gh-*`, `tmp/probe-*`, `tmp/q*-payload.json`, `tmp/q*-result.json`, `tmp/tranche-*`, `tmp/top20-*`, `tmp/oapy*`, `tmp/installed-plugin-names.json`, `tmp/v85_payload.json`, `tmp/w188-D2-settings-backup-pre-edit.json` — auth/probe artifacts (operator-state, preserved)
- `tmp/` top-level .py/.ps1 scripts (accounts-status-report.py, antigrav-login-v2.log{,.err}, audit_writer*.py, check-cron-parse.ps1, check-eee-parse.ps1, cas-pyproject.toml, etc) — operator scripts (preserved)

### `docs/current images/` (1.4G)
- Complete HOME mirror snapshot — operator state, do not touch

## Final residual count outside catalog

```bash
$ find tmp -type f -name '*.md' ! -path '*/codex-home*' ! -path '*/codex-w*' \
    ! -path '*/codex-temp*' ! -path '*/codex-wave*' ! -path '*/codexhome*' \
    ! -path '*/npm-cache*' ! -path '*/cpa-keeper*' ! -path '*/sigstore-*' \
    ! -path '*/spec-kit-*' ! -path '*/compound-engineering-*' \
    ! -path '*/gitleaks-dl*' | wc -l
0

$ find docs -maxdepth 1 -type f -name '*.md' | wc -l
2   # only install-provenance.md + sota-installed-manifest.md (both active-ref-preserved)

$ find docs/architecture -maxdepth 2 -type f -not -path '*/W259-grand-catalog/*' | wc -l
1   # only docs/architecture/README.md

$ git status --porcelain | grep -E '^\?\? [a-z0-9_]+$' | wc -l
0   # workspace-root scratch eliminated (was 800)
```

## Verification Commands

```bash
# Verify Wave-2 archive structure
ls docs/architecture/W259-grand-catalog/00-archive-from-prior-waves/

# Total archived files (Wave-1 + Wave-2)
find docs/architecture/W259-grand-catalog/00-archive-from-prior-waves -type f | wc -l
# Expected: 6921

# Confirm 800 scratch files gone
ls 006in8dz 2>&1  # should error: no such file

# Confirm prior-wave docs gone from doc/ root
ls docs/grand-catalog-2026-05-15 docs/grand-synthesis-2026-05-16 2>&1  # should error
```

## Artifact path

`docs/architecture/W259-grand-catalog/00-archive-from-prior-waves/CLEANUP-LOG-WAVE2.md`
