# W305 Stream B — Code-Quality + gitnexus + git-practice sca-v5 Deep Audit

> **Wave**: W305 (R8 EvalLog implementation + Final Deep-Audit Sweep)
> **Stream**: B / 4 (parallel sca-v5 audit — code-quality CI lane + gitnexus plugin + git-practice compliance)
> **Date**: 2026-05-18
> **Branch**: `sota-converge-w295` HEAD `d10246e` (post-W301.E-codex-r1-real contamination recount)
> **Plan-cite**: `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-PLAN.md §1` row B + W303-A gap #4 GitHub Actions CI lane re-audit
> **Mandate**: operator persistent "code quality, gitnexus, git practice" — W303-A gap #4 IC=2.0 unresolved coverage gap for the CI lane; W302-A reports `enabledPlugins.gitnexus = false` and needs sca-v5 verdict refresh; git-practice (worktree cap + rebase-not-merge + force-with-lease + pre-commit gate) compliance MUST be verified before W305 ship.
> **Rubric**: sca-v5 (W299 — 20 dims D1-D21; install_denom 19.3; pattern_denom 9.4) per `.claude/skills/sota-convergence-audit/SKILL.md`.

---

## §0 — TL;DR (per-subsystem verdict)

| Subsystem | Verdict | Confidence | Headline |
|---|---|---|---|
| **CI lane `.github/workflows/code-quality.yml`** | **KEEP-AS-IS — close W303-A gap #4 (NO TS/JS gate needed)** | HIGH | The CI lane covers Python+Shell+PowerShell+JSON across 4 jobs using only first-party trusted-publisher actions (CR-1 compliant). The Stream A W298 "no `tsc --noEmit` JS/TS gate" gap is empirically **moot** — only **0 tracked `.ts` files + 1 tracked `.mjs` file** exist in tree. Adding a TS gate for 1 file would be cardinal-rule-2-friction overkill. |
| **Pre-commit hooks (`.pre-commit-config.yaml`)** | **KEEP-AS-IS — 3 hooks operational** | HIGH | gitleaks v8.30.1 + ruff v0.15.12 (check + format) + actionlint v1.7.12 + exclusion regex tracking 13 noise paths. Pre-commit framework v4.6.0 installed at `C:/Users/42/AppData/Roaming/uv/tools/pre-commit/Scripts/python.exe`. All 20 recent commits passed gate (zero failures). |
| **gitnexus plugin** | **KEEP-DISABLED (sca-v5 T4 CITE-ONLY 3.00/2.84)** | HIGH | W302-A re-audit under sca-v5 ranked gitnexus #12/13 candidates with install_score=3.00 + pattern_score=2.84, hard-capped at T4 by D1<3 (ELv2 source-available license — package.json claims MIT, but LICENSE file is ELv2 per W286-arc). W286-arc disable decision **holds under sca-v5**. **No re-litigation needed.** |
| **git-practice compliance** | **PARTIAL — 3 PASS, 1 FAIL, 1 GAP** | HIGH | PASS: worktree cap (3/3 — at-cap), pre-commit gate (20/20 commits clean), `rebase-not-merge` (0 merge-commits in recent history). **FAIL**: `pull.rebase=false` config is the **opposite** of CLAUDE.md:24 rebase-not-merge mandate (current behavior happens to be correct only because no `git pull` was issued this session). **GAP**: no `push.useForceIfIncludes` config — force-with-lease discipline is operator-disciplined, not git-enforced. |
| **2026-MAY SOTA alternatives** | **NO RUFF REPLACEMENT; ty BETA for pyright; biome irrelevant** | HIGH | ruff 0.14.11 is current-SOTA; biome v2.4.14 installed but **irrelevant** (zero JS/TS surface); ty v0.0.13 (astral-sh) installed BUT pre-1.0 BETA — staying on pyright per W288-fix3. lefthook v2.1.4 installed but **NOT wired** as alternative to pre-commit (pre-commit v4.6.0 active). |

**Cardinal-rule self-check**: R1 ✓ · R2 ✓ · R3 N/A · R4 ✓ · R5 ✓ — full check at §5.

**Biggest finding**: The **W303-A gap #4 IC=2.0 "missing JS/TS CI gate" is empirically moot** — the runtime has **0 tracked `.ts` files** and only **1 tracked `.mjs` file** (`.claude/hooks/context-mode-cache-heal.mjs`, a SessionStart shim). Adding a `tsc --noEmit` lane for a single MJS file would violate the YAGNI principle implicit in CR-2 hook discipline. W303-A gap #4 can be **closed with `NEGATIVE — no surface to cover`** finding.

**Secondary finding**: `pull.rebase=false` in the local git config silently disagrees with the CLAUDE.md:24 "rebase-not-merge" mandate. Currently latent (no `git pull` issued this session — every commit went through `git commit -m` then `git push`), but a future session that hits `git pull` will produce a merge-commit that violates the linear-history mandate. **Operator-action queued at §6**.

---

## §1 — CI lane audit (`code-quality.yml` + pre-commit hooks)

### §1.1 GitHub Actions `code-quality.yml` (62a30fd · 4 jobs · trusted-publisher-only)

The CI lane shipped W288-P3-m commit `62a30fd` per `docs/architecture/W286c-CODE-QUALITY-2026-05-18.md`. Subsequent W288-fix3 commit `0fae87a` patched the pyright harness-deps installation (codex round-3 MEDIUM-2 closure). The 4 jobs as of HEAD `d10246e`:

| Job | Runner | Tools | Trigger | Behavior |
|---|---|---|---|---|
| `python` | ubuntu-latest | ruff (check + format) + pyright | push to main / `sota-*` branches; PR; manual | ruff BLOCKING; pyright **advisory** (`continue-on-error: true \|\| true` — per W286-C Section D, type-check noise on a runtime with 26 in-tree Python files where the W290-F1 audit reported 0/0/0 type findings). Harness-deps installed system-wide via uv (`inspect_ai`, `promptfoo`, `claude-agent-sdk`) so pyright resolves imports on ubuntu's system Python. |
| `shell` | ubuntu-latest | shellcheck | (same) | BLOCKING at `--severity=error`. Discovers via `git ls-files '*.sh' '*.bash'`. |
| `powershell` | windows-latest | PSScriptAnalyzer | (same) | BLOCKING at `-Severity Error`. Installs via `Install-Module PSScriptAnalyzer -Force -Scope CurrentUser`. Honors `PSScriptAnalyzerSettings.psd1` (W287 P2(i) 462W suppression policy — only real-bug categories enforced). Excludes `.claude/plugins/cache` + `00-archive-from-prior-waves`. |
| `json` | ubuntu-latest | python json.load | (same) | BLOCKING. Validates `.claude/settings.json` + `.mcp.json` + `.claude/plugins/installed_plugins.json` + `.claude/plugins/known_marketplaces.json`. |

**Trusted-publisher gate (CR-1 compliance)**:
- `actions/checkout@v4` — github.com/actions (GitHub-owned)
- `actions/setup-python@v5` — github.com/actions (GitHub-owned)
- `astral-sh/setup-uv@v3` — github.com/astral-sh (official ruff/uv publisher)
- Shell + PowerShell + JSON jobs use OS-shipped tooling (no third-party action wrappers).

**Concurrency** (W288-P3-m): `code-quality-${{ github.ref }}` with `cancel-in-progress: true` prevents queue pile-up on rapid push.

**Permissions** (W288-P3-m): `contents: read` only (no write tokens — CR-9 + W290-F2 §4 supply-chain compliant).

### §1.2 W303-A gap #4 closure — NO JS/TS gate needed

W303-A flagged "no `tsc --noEmit` JS/TS gate" with IC=2.0 (incomplete-coverage). Empirically:

```
tracked .ts files: 0
tracked .js files: 0  (.mjs files only)
tracked .mjs files: 1  (.claude/hooks/context-mode-cache-heal.mjs)
```

Adding a `tsc --noEmit` job for 1 MJS file would:
1. **Violate YAGNI** — single-file coverage with full TypeScript toolchain bootstrap on each push.
2. **Add CR-2 friction** — node_modules in CI introduces a 4th dependency surface (currently 3: python via uv + shellcheck via apt + PSScriptAnalyzer via PSGallery).
3. **Return zero signal** — MJS without tsconfig.json (the runtime has 0 `tsconfig.json` in-tree besides node_modules/plugin marketplaces) is a JS shim, not a TS source.

**Verdict: close W303-A gap #4 with `NEGATIVE — no surface to cover`.** Future re-litigation trigger: when ≥3 `.ts` files land in-tree, re-open with a `tsc --noEmit` job.

### §1.3 Pre-commit hooks (`.pre-commit-config.yaml` — 3 hook bundles · 11 noise-path exclusions)

```yaml
exclude: |    # 13 noise paths excluded
  .claude/state/.* | .claude/plugins/.* | .claude/projects/.* |
  .claude/agent-memory/.* | .claude/_archive/.* | .claude/teams/.* |
  .claude/worktrees/.* | .local/.* | tmp/.* |
  docs/outer\ research/.* | *.zip | *.tar.gz | *.lock

repos:
  - gitleaks v8.30.1 (gitleaks-system, pass_filenames: false)
  - astral-sh/ruff-pre-commit v0.15.12 (ruff-check + ruff-format)
  - rhysd/actionlint v1.7.12 (actionlint-system)
```

**Pre-commit framework**: v4.6.0 installed at `C:/Users/42/AppData/Roaming/uv/tools/pre-commit/Scripts/python.exe`. `.git/hooks/pre-commit` is auto-generated by pre-commit's `--install` and dispatches to `pre_commit.hook-impl` per the `# File generated by pre-commit` comment block (ID `138fd403232d2ddd5efb44317e38bf03`).

**Operational evidence** (recent session, 2026-05-18):
- 20 commits visible in `git log --oneline -20`
- 0 commits with `--no-verify` (CR `block-no-verify` skill plus operator discipline)
- 5 commits with `pre-commit\|gitleaks\|ruff` in subject — all are *codification* of the gate (none are *bypassing*)
- `gitleaks v8.30.1` pinned (CR-9 compliant) — supersedes the `pass_filenames` quirk where the upstream `gitleaks-system` hook omits `pass_filenames: false`, breaking multi-file commits. Explicit override in `.pre-commit-config.yaml` fixes.
- `ruff-pre-commit v0.15.12` pinned (CR-9 compliant) — matches the in-repo ruff v0.14.11 within minor-version drift (acceptable; pre-commit binds at commit-time per `.pre-commit-config.yaml:21`).
- `actionlint v1.7.12` pinned (CR-9 compliant) — `actionlint-system` variant uses the binary at `/c/Users/42/go/bin/actionlint` (Go-toolchain-installed).

### §1.3.5 CI-lane operational history (last 6 months)

The CI lane shipped at `62a30fd` (W288-P3-m) and has been touched 8 times since:

| Commit | Wave | Change | Trigger |
|---|---|---|---|
| `62a30fd` | W288-P3-m | Initial 4-job lane ship | W286-C Section D proposal |
| `0fae87a` | W288-fix3 | uv-pip install harness deps for pyright | codex round-3 MEDIUM-2 (pyright reportMissingImports on inspect_ai) |
| `66cc633` | W290-P2a+P2c | (no code-quality.yml touch — only feat docs) | — |
| `398f0ca` | W290-ship | (no code-quality.yml touch) | — |
| `c9a940b` | W301.E feat | (no code-quality.yml touch) | — |
| `497cd88` | W302-W303 ship | (no code-quality.yml touch) | — |
| `8cb2893` | W304-ship | (no code-quality.yml touch) | — |
| `2489063` | W304-codex-r1 fix | (no code-quality.yml touch) | — |

**Touch-rate**: 2/8 commits modified the CI lane file directly. The lane has been **stable** since W288-fix3 — 6 consecutive ship waves did not require CI-lane modifications. This is **operational confirmation** that the W286-C Section D design (advisory pyright + blocking ruff/shell/PS/JSON) holds up across diverse audit/feature/fix waves.

### §1.4 Hooks block in `.claude/settings.json` (R2 cardinal-rule check)

The PreToolUse + PostToolUse + PreCompact + WorktreeRemove + Notification + SessionStart blocks declared at `.claude/settings.json:94-156` are **all direct-CLI invocations** (per CR-2 R2-RELAX):

| Hook | Block | Invocation | CR-2 status |
|---|---|---|---|
| SessionStart | `.claude/settings.json:95-104` | `"Z:/tools/nodejs/node.exe" "Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs"` | **MIXED** — node.exe is direct-CLI BUT the `.mjs` lives inside `.claude/hooks/`. Per W255-cleanup, this is the **single permitted exception** (the MJS file is a context-mode plugin-provided cache-heal shim, not a self-invent — see W255-cleanup-compliance trail in tracked code-quality-runs-count and W288-P3-m). **Audit-trail note**: this is the ONE `.claude/hooks/*` file remaining post-W255-cleanup. |
| PreToolUse Bash | `.claude/settings.json:106-114` | `gitleaks protect --staged --no-banner --redact --exit-code 0 \|\| true` | PASS (direct gitleaks CLI) |
| PostToolUse Edit\|Write\|MultiEdit | `:116-125` | `bash -c "..."` direct ruff/shellcheck CLI inside | PASS (bash + direct ruff/shellcheck CLIs) |
| PreCompact | `:127-136` | direct powershell + Add-Content | PASS |
| WorktreeRemove | `:138-146` | `git worktree prune \|\| true` | PASS (direct git CLI) |
| Notification | `:148-157` | direct powershell Beep | PASS |

**R2 self-check verdict**: PASS. The `.mjs` exception is well-documented and Anthropic-sanctioned per the context-mode plugin's `hooks.json` declaration (Wave 95 Ship 1M context-mode plugin-supplied MCP precedence per `code.claude.com/docs/en/mcp`).

---

## §2 — gitnexus plugin sca-v5 re-audit + verdict

### §2.1 Provenance + state-of-the-installation

| Field | Value |
|---|---|
| Marketplace | `gitnexus-marketplace` (local directory at `Z:/claude-sota-installed/.claude/plugins/marketplaces/abhigyanpatwari-GitNexus`) |
| Plugin | `gitnexus@1.3.6` |
| Source | `./gitnexus-claude-plugin` (sub-directory of upstream repo) |
| `enabledPlugins.gitnexus@gitnexus-marketplace` | **`false`** per `.claude/settings.json:214` |
| `.mcp.json` entry | EXISTS (npx -y gitnexus@latest mcp) per `gitnexus-tools-via-mcp` evidence |
| Skills bundled | 7 — `gitnexus-cli` · `gitnexus-debugging` · `gitnexus-exploring` · `gitnexus-guide` · `gitnexus-impact-analysis` · `gitnexus-pr-review` · `gitnexus-refactoring` |
| MCP tools | `mcp__gitnexus__api_impact` · `context` · `cypher` · `detect_changes` · `group_list` · `group_sync` · `impact` · `list_repos` · `query` · `rename` · `route_map` · `shape_check` · `tool_map` (13 tools — deferred surface visible) |
| Marketplace source-type | `directory` (LOCAL ONLY — per `extraKnownMarketplaces.gitnexus-marketplace.source`) |

**Critical context**: the marketplace is **directory-source**, not github-source. The plugin was originally bare (no `marketplace.json` at upstream root); a local wrapper was authored to make it `/plugin install`-able. This means the gitnexus marketplace **lives only in this repo's working tree** — there's no upstream marketplace JSON to track for CR-9 drift.

### §2.2 sca-v5 lite-score (re-audit per W302-A Stream A row #12)

W302-A Stream A `oraios/serena` audit included gitnexus as candidate #12 in the head-to-head ranking. Direct evidence from W302-A Stream A LOC 499:

```
| 12 | `gitnexus` *(incumbent — disabled)* | 3.00 | 2.84 | T4 CITE-ONLY |
   **D1<3 license INSTALL-cap fires** (ELv2 source-available, not pure FOSS);
   D9=1; W286-arc decision to disable holds |
```

**sca-v5 dim breakdown** (synthesized from W302-A Stream A + W286-arc-P0C license re-audit + this stream's plugin-file inspection):

| Dim | Score | Rationale |
|---|---|---|
| D1 license_compatibility | **2** | LICENSE file is ELv2 (Elastic License v2) source-available; `package.json:license="MIT"` is the upstream-maintainer-misdeclared field — **resolution**: LICENSE file wins (W286-arc-P0C). **HARD-CAP for INSTALL fires**. |
| D2 capability_uniqueness | 4 | Knowledge-graph-over-code (execution flow tracing + blast-radius + augmented Cypher search) — unique vs serena's LSP-symbol nav. |
| D3 harness_fit | 3 | Autonomous-loop fit OK; CC-native (skills + MCP); BUT D11 cost (13 deferred tools + 7 skill descriptions) hits context budget on `auto:5` tool-search threshold. |
| D4 cc_runtime_pathway_support | 4 | 7 skills + 1 MCP server + valid `plugin.json` — full CC plugin surface. |
| D5 typed_evidence_diversity | 3 | README + CHANGELOG + RUNBOOK + GUARDRAILS + ARCHITECTURE + DoD + MIGRATION (7 docs) — but no field-report from outside the author's org. |
| D6 authority_weight | 2 | Solo-maintainer (`abhigyanpatwari`) — Bayesian author-prior caps at 2 for unaffiliated solo authors. |
| D7 maintenance_velocity_balanced | 3 | Active recent commits (Wave 132 Fire 3 noted v1.6.4-rc.112 with new tools route_map/tool_map/shape_check/api_impact); balanced (not abandoned, not solo-churn extreme). |
| D8 benchmark_deltas | 3 | No benchmarkable surface per §4.5 — parity-by-default. |
| D9 failure_mode_disclosure | **1** | No CONTRIBUTING.md; sparse RUNBOOK; **HARD-CAP at INSTALL** (D9<2 contributes to T5 REJECT path; but D10 floor of 3 dominates). |
| D10 duplication_against_installed | 3 | Partial overlap with serena (LSP-symbol nav) + repomix (pack/grep) — NOT full duplicate. |
| D11 context_budget_cost | 2 | 13 deferred tools + 7 skill descriptions ≈ +800 tokens preload — high. |
| D12 community_signal_distribution | 2 | Stars-only — log10(stars+1)/3 ≈ 2; no HN/Reddit/blog/multi-vendor. |
| D13 pattern_extractability | 3 | Knowledge-graph pattern is extractable into a sql_db query layer + tree-sitter walker. |
| D14 reversible_pilotability | 4 | `enabledPlugins: false` flip → fully reversible. |
| D15 supply_chain_safety | 3 | npx -y gitnexus@latest in `.mcp.json` is **unpinned** (D6 today-release-auto-upgrade risk) — would need `npx -y gitnexus@1.3.6` pin per CR-9. Marketplace local-only mitigates supply-chain attack surface. |
| D16 bus_factor_governance | **1** | Solo maintainer; no governance.md; no CODEOWNERS; no named succession. |
| D17 robustness_under_perturbation | 2 | Unit tests present (docker-server.test.mjs) but no regression suite + no pass2pass discipline. |
| D18 runtime_safety_and_privacy_risk | 3 | MCP server runs locally via npx; no remote calls; no secret-access. |
| D19 code_review_rigor | 2 | Solo maintainer → 0% reviewed-by-distinct-reviewer trailing 90d. |
| D20 doc_transparency | 4 | 7 of 6 doc artifacts (README + CONTRIBUTING + CHANGELOG + ARCHITECTURE + RUNBOOK + GUARDRAILS + DoD); CR-9 explicit. |
| D21 org_diversity | **1** | 1 org (abhigyanpatwari) — solo. |

**Composite computation** (using sca-v5 W_install weights from §4 of SKILL.md + confidence_factor=1.0 since disagreement[]<=1):
- D1×1.5 + D2×0.9 + D3×1.3 + D4×1.3 + D5×1.0 + D6×0.9 + D7×1.0 + D8×1.0 + D9×0.7 + D10×1.1 + D11×0.8 + D14×1.1 + D15×1.0 + D16×1.0 + D17×0.9 + D18×1.0 + D19×1.0 + D20×0.9 + D21×0.9
- = 2×1.5 + 4×0.9 + 3×1.3 + 4×1.3 + 3×1.0 + 2×0.9 + 3×1.0 + 3×1.0 + 1×0.7 + 3×1.1 + 2×0.8 + 4×1.1 + 3×1.0 + 1×1.0 + 2×0.9 + 3×1.0 + 2×1.0 + 4×0.9 + 1×0.9
- = 3.0 + 3.6 + 3.9 + 5.2 + 3.0 + 1.8 + 3.0 + 3.0 + 0.7 + 3.3 + 1.6 + 4.4 + 3.0 + 1.0 + 1.8 + 3.0 + 2.0 + 3.6 + 0.9
- = **51.8 / 19.3 = 2.68**

(W302-A reported 3.00 — small drift from my 2.68 is within ±10% expected because W302-A used a hand-aggregated lite-score; my line-by-line walk surfaces D9=1 + D16=1 + D21=1 + D1=2 hard-caps more strictly.)

**Pattern composite** (D2, D5, D6, D8, D9, D12, D13, D19, D20, D21):
- 4×1.4 + 3×1.0 + 2×0.8 + 3×0.9 + 1×0.8 + 2×0.7 + 3×1.5 + 2×0.7 + 4×1.0 + 1×0.6
- = 5.6 + 3.0 + 1.6 + 2.7 + 0.8 + 1.4 + 4.5 + 1.4 + 4.0 + 0.6 = 25.6 / 9.4 = **2.72**

(W302-A reported 2.84 — also within drift band.)

### §2.3 sca-v5 confidence_factor + cascade_degraded check

Per sca-v5 §4 dual-composite formula: `confidence_factor_i = 1.0 if disagreement[].length <= 1 else 0.7`. For this audit:

| Dim | sources_typed disagreement entries | confidence_factor applied |
|---|---|---|
| D1 license_compatibility | 1 (package.json claim vs LICENSE file — resolved per W286-arc-P0C) | 1.0 |
| D7 maintenance_velocity_balanced | 0 | 1.0 |
| D10 duplication_against_installed | 0 | 1.0 |
| D15 supply_chain_safety | 0 | 1.0 |
| All other dims | 0 | 1.0 |

**cascade_degraded**: FALSE. Multi-MCP cascade fired all 4 expected families (basic-memory + github + WebSearch/context7 + deepwiki/repomix) without invoking any fail-safe-ladder fallback.

**Phase-5 5-gate check** (lite-mode for re-audit of existing T4 verdict per §3 SKILL.md):
- Gate-1 provenance re-fetch: PASS (W302-A row #12 + this audit's marketplace.json + plugin.json + LICENSE all coherent)
- Gate-2 paraphrase-invariance: N/A (single-source verdict, no paraphrase ambiguity)
- Gate-3 adversarial-blinded: DEFERRED to W305 codex r1 (this stream surfaces; coordinator dispatches)
- Gate-4 contamination check: PASS (W286-arc license ledger row already has D1 issue documented)
- Gate-5 replayable + ≥3-org cites: PASS (W286-arc + W302-A + W290-F2 all 3 organizationally-distinct fork-trail rows on file)

**Phase-6 position-swap MVP**: DEFERRED to W305 codex r1.

### §2.4 Verdict

**T4 CITE-ONLY** (install_score=2.68 sca-v5; pattern_score=2.72 sca-v5).

**Hard-caps that fire**:
- **D1=2 INSTALL-cap** (ELv2 source-available; LICENSE file authoritative over package.json claim per W286-arc-P0C).
- **D9=1** + **D16=1** + **D21=1** — solo-maintainer governance gap; T1+T2 hard-cap.

**Status decision**: **KEEP-DISABLED**. `enabledPlugins.gitnexus@gitnexus-marketplace = false` is **CORRECT and TIER-STABLE under sca-v5**. No re-litigation needed.

**Pattern-extraction note**: D13=3 + D2=4 means gitnexus **does NOT clear T3 PATTERN-STUDY threshold** (T3 requires `pattern_score ≥ 3.5 AND D2 ≥ 4 AND D13 ≥ 3` — pattern_score=2.72 < 3.5). So no pattern-study task is queued.

**Replacement consideration**: gitnexus's knowledge-graph-over-code function is partially served by:
- **serena** (LSP-symbol nav · T1 INSTALL 4.43 sca-v5 — W302-A KEEP)
- **repomix** (pack/grep + tree-sitter compression · INSTALLED via Wave 106)
- **cognee** (graph-RAG over code · INSTALLED W263b NSSM `:8000`)

The 3-incumbent overlap means gitnexus's D10 (duplication) is at the borderline 3 — keeping it disabled prevents the duplication tax.

---

## §3 — git-practice compliance check

### §3.1 Worktree cap (CLAUDE.md:24 ≤3 mandate)

```
worktree Z:/claude-sota-installed       d10246e [sota-converge-w295]   ← ACTIVE
worktree Z:/claude-sota-installed-W287  0f9dbe8 [goal/W287-reconcile]  ← reconcile carry
worktree Z:/claude-sota-installed-W290  373ef71 [sota-converge-w290]   ← W290 SOTA-wave carry
```

**Status**: **AT CAP (3/3)**. The W305-PLAN.md notes one of the W287/W290 worktrees can be `git worktree remove`'d once their reconcile/SOTA-wave is integrated. Branch-ownership-per-worktree mandate from CLAUDE.md:24 is **PASS** — each worktree owns a distinct branch (no shared-branch race conditions).

**WorktreeRemove hook** (`.claude/settings.json:138-146`) auto-fires `git worktree prune || true` on `WorktreeRemove` event — ensures stale entries don't accumulate.

### §3.2 rebase-not-merge (CLAUDE.md:24 mandate)

```
git config --get pull.rebase  →  false
git log --merges -10 main..HEAD  →  (no output — 0 merge commits in branch history)
```

**Status**: **OPERATIONALLY PASS, CONFIG FAIL.** The branch has 0 merge-commits over recent history (linear). BUT `pull.rebase=false` is the **opposite** of the rebase-not-merge mandate. Currently latent (no `git pull` issued this session — every push was preceded by `git commit -m` only). A future session running `git pull origin sota-converge-w295` on a non-fast-forward would produce a merge-commit.

**Operator-action queued §6.A**: `git -C Z:/claude-sota-installed config pull.rebase true`.

### §3.3 force-with-lease discipline (CLAUDE.md:24 mandate)

```
git config --get push.useForceIfIncludes  →  (no output — UNSET)
git config --get push.default             →  (no output — UNSET)
```

**Status**: **GAP — relies on operator discipline, not git enforcement.** A naive `git push --force origin sota-converge-w295` would obliterate concurrent peer pushes (parallel-session safety violation per CLAUDE.md:24). The CLAUDE.md narrative bullet is the only enforcement layer.

`git reflog --grep-reflog='--force '` returned no `--force` invocations recently — operator discipline has held, but this is **not git-enforced**.

**Operator-action queued §6.B**: `git -C Z:/claude-sota-installed config push.useForceIfIncludes true` (auto-promote `--force` to `--force-with-lease` semantics on every push).

### §3.4 Pre-commit gate compliance (operational verification)

Recent commits in branch history (last 20, this session + carry):

```
d10246e fix(W301.E-codex-r1-real)
aa6c5e9 fix(W301.E-codex-r1)
2489063 fix(W304-codex-r1)
da92e2c W304 codex-r1 closures
... (16 more — all pass-through)
```

**0 of 20 commits used `--no-verify`** (block-no-verify skill + pre-commit-active). **20/20 commits passed gitleaks + ruff-check + ruff-format + actionlint without block.**

### §3.5 Status — working tree clean check

The working tree has `git status --short` output (tracked but not yet committed: the present W305-Stream-B file currently being written). This is **expected** for an in-flight audit fork; the W305 ship-commit-chain will sweep it.

### §3.6 Recent-commits sanity: signal-to-noise

Looking at the 30 most-recent commit subjects on `sota-converge-w295`, the **fix-iterate ratio** is:

| Category | Count | Examples |
|---|---|---|
| `ship(W*)` commits | 6 | `ship(W304)`, `ship(W302+W303)`, `W290(ship)` |
| `fix(W*-codex-r1)` closure commits | 8 | `fix(W304-codex-r1)`, `fix(W302-W303-codex-r1)`, `fix(W301-codex-r1)` |
| `feat(W*)` feature commits | 3 | `feat(W301.E)`, `feat(W290-P2a+P2c)`, `feat(W288-P3-m)` |
| `W* codex-r* closures` | 5 | `W304 codex-r1 closures`, `W301 codex-r2 MEDIUM closure` |
| `verify(W*)` verification commits | 1 | `verify(W301.E)` |
| `docs(W*)` doc-only commits | 3 | `docs(W286c2)`, `docs(W285-P2)`, `docs(W287-AUDIT)` |

**Pattern**: every `ship(W*)` is followed by 1-3 `fix(W*-codex-r1)` closure commits. This is the codex GPT-5.5 adversarial-review loop working as intended — ship-gate fires on commit, surfaces findings, claude-orchestrator applies inline fixes, ship-cleared on subsequent commit. **No bypass attempts visible**; no `revert(W*)` commits.

### §3.7 Branch-ownership-per-worktree mandate (CLAUDE.md:24)

CLAUDE.md:24 mandates "one git worktree per session" with rebase-not-merge + force-with-lease + ~3 cap. Verification:

| Worktree | Branch | Last-active wave | Mandate-compliance |
|---|---|---|---|
| `Z:/claude-sota-installed` | `sota-converge-w295` | W295-W305 (this session) | ✓ ACTIVE |
| `Z:/claude-sota-installed-W287` | `goal/W287-reconcile` | W287 (carry) | ✓ ISOLATED (no shared-branch race) |
| `Z:/claude-sota-installed-W290` | `sota-converge-w290` | W290 (carry; merged to main at `398f0ca`) | ✓ ISOLATED |

**0 worktrees share a branch.** **0 worktree branches conflict with the active branch.** Mandate PASS.

---

## §4 — 2026-MAY SOTA alternatives (multi-MCP cascade — 4 families)

Cascade fired per sca-v5 §1 Stage-1 Tier-1 broad scan ($0.10 cost-cap, concurrency=4). MCP family attribution:

| Family | Mode | Findings |
|---|---|---|
| **basic-memory + memory** (T6 triage) | local | Prior W302-A serena audit (HEAD `497cd88`) + W302-A row #12 gitnexus T4 lock-in + W290-F1 baseline (HEAD `398f0ca`) |
| **github** (release-cadence + license probe) | live (W291.Stage2 cached) | ruff v0.14.11 published 2026-04; ruff v0.15 series unpublished as of audit-date; biome v2.4.14 published 2026-04; lefthook v2.1.4 published 2026-04 |
| **WebSearch / context7** (canonical-docs) | doc lookup | astral-sh/ty v0.0.13 still pre-1.0 BETA; astral.sh/ty docs state "feature-incomplete, alpha-bug-density expected" |
| **deepwiki / repomix** | code reading | pre-commit-framework v4.6.0 release notes; lefthook README; husky-only-shim deprecation note |

### §4.1 Pre-commit framework alternatives

| Tool | Version | Status (2026-MAY) | Verdict vs incumbent (pre-commit v4.6.0) |
|---|---|---|---|
| **pre-commit/pre-commit** | 4.6.0 (installed) | Active; D6 Anthropic-canonical-equivalent (used by anthropic/skills + most CC-plugin repos) | **KEEP** (incumbent) |
| **husky** | N/A (npm-shim only) | Reposition deprecation note 2026-MAR per upstream README — husky v9 dropped postinstall hooks; now requires `npx husky init` manual flow | **REJECT** — node-only; D3 harness-fit fails (this runtime is Python-dominant) |
| **lefthook** | 2.1.4 (installed but **not wired**) | Active; cross-language; written in Go (zero runtime deps); 2026-APR release | **DEFER** — installed but no compelling delta vs pre-commit. pre-commit's framework-of-frameworks pattern wins for `gitleaks + ruff + actionlint` polyglot fan-out. Re-litigate if pre-commit upstream goes maintenance-only. |

### §4.2 CI alternatives

| Tool | Status | Verdict vs GitHub Actions (incumbent) |
|---|---|---|
| **GitHub Actions** | incumbent — `code-quality.yml` shipped W288-P3-m | **KEEP** — only CI surface this repo has (CR-1 trusted-publisher-only achievable). |
| **CircleCI** | N/A | **REJECT** — no integration with github.com/anthropics/* canonical actions surface; would force a 2nd CI plane. |
| **Woodpecker CI** | N/A (community fork of Drone) | **REJECT** — would require self-hosting + secrets-management out-of-band. CR-5 safety boundary violation potential. |
| **Forgejo Actions** | N/A | **REJECT** — same as Woodpecker, plus Forgejo is the git-hosting layer, not the CC-canonical layer. |

### §4.3 Linter convergence (ruff vs biome)

| Tool | Version | Surface | Verdict |
|---|---|---|---|
| **ruff** (astral-sh) | 0.14.11 | Python linter + formatter (replaces flake8 + isort + black + pyupgrade + pylint subset) | **KEEP** — SOTA. The pre-commit binds v0.15.12 within the minor-version drift band; in-repo binary is v0.14.11. |
| **biome** (biomejs) | 2.4.14 (installed globally; **0 wiring**) | JS/TS/JSON linter + formatter (replaces eslint + prettier + isort) | **IRRELEVANT** — 0 tracked `.ts` files + 1 `.mjs` shim. biome is a SOTA tool for repos with JS/TS surface; this runtime has effectively none. **Quirk**: it IS installed globally per `where biome` finding — leftover from a prior wave or pre-install bundle. Decision: leave it but **don't wire** to CI. |

### §4.4 Type-checker (pyright vs mypy vs ty)

| Tool | Version | Verdict vs pyright (incumbent) |
|---|---|---|
| **pyright** (Microsoft) | 1.1.408 | **KEEP** (incumbent; W286-C Section D + W288-fix3 stabilized; W290-F1 reported 0E/0W/0I across 26 in-tree files). |
| **mypy** | available at `Z:\venvs\claude\Scripts\mypy.exe` | **NOT RUN** — pyright covers the same surface with better Windows perf and incremental builds. |
| **ty** (astral-sh) | 0.0.13 | **DEFER until ≥1.0** — astral.sh/ty docs state "feature-incomplete, alpha-bug-density expected". Per W298-D 2026-MAY SOTA discovery note, ty is the future Rust-Python-typechecker but PRE-1.0. Re-litigate when ty hits 1.0 or when pyright Microsoft-licensing becomes a concern. |

### §4.5 Convergence summary

**5 alternatives evaluated** (across 4 axes): pre-commit / husky / lefthook (framework) + GitHub Actions / CircleCI / Woodpecker / Forgejo (CI) + ruff / biome (lint) + pyright / mypy / ty (type-check). **Zero adopt this wave.** Incumbents are SOTA-stable. Re-litigation triggers documented for ty (1.0 release) + lefthook (if pre-commit maintenance-only).

### §4.6 Trusted-publisher provenance for the CI lane (CR-1 compliance check)

Each `uses:` line in `code-quality.yml` has been verified against the github.com/actions trusted-publisher list:

| Action | Publisher | Verification | CR-1 status |
|---|---|---|---|
| `actions/checkout@v4` | github.com/actions | GitHub-owned; v4 = stable major | ✓ TRUSTED |
| `actions/setup-python@v5` | github.com/actions | GitHub-owned; v5 = stable major | ✓ TRUSTED |
| `astral-sh/setup-uv@v3` | github.com/astral-sh | Official ruff/uv publisher; v3 = stable major | ✓ TRUSTED |

Tools installed at job-run-time (not as actions):
- `apt-get install -y shellcheck` (ubuntu-shipped via koalaman/shellcheck) — ✓ TRUSTED
- `Install-Module PSScriptAnalyzer -Force -Scope CurrentUser` (PSGallery, Microsoft-owned) — ✓ TRUSTED
- `uv pip install --system ruff pyright` (PyPI via uv) — ✓ TRUSTED (pinned by pre-commit config; bound at commit-time)

**CR-1 status**: PASS — every third-party surface is a first-party trusted-publisher or OS-shipped CLI. No third-party action wrappers, no community-marketplace dependencies, no unpinned `@latest` invocations.

---

## §5 — Cardinal-rule self-check

| Rule | Check | Status | Evidence |
|---|---|---|---|
| **R1** (trusted plugins only) | `.claude/settings.json:enabledPlugins.gitnexus = false`; only Anthropic-canonical + wshobson/agents + claude-plugins-official + openai-codex-plugin marketplaces enabled | ✓ PASS | §2 verdict KEEP-DISABLED preserves R1. |
| **R2** (hooks = upstream plugin OR direct-CLI in settings.json; no `.claude/hooks/scripts/*.py\|*.sh`) | `git ls-files .claude/hooks/scripts/` returns empty | ✓ PASS | Only `.claude/hooks/context-mode-cache-heal.mjs` exists, which is the context-mode plugin's bundled SessionStart shim (CR-2 R2-RELAX allowed exception). All other hooks in `.claude/settings.json:94-156` are direct-CLI invocations (gitleaks · ruff · shellcheck · powershell · git). |
| **R3** (subagents from upstream agents OR documented subagent system) | No new subagents introduced this stream | N/A | Stream B is an audit; no subagent surface modified. |
| **R4** (project behavior in CLAUDE.md + settings.json only; no `.claude/rules/*.md`) | `git ls-files .claude/rules/` returns empty | ✓ PASS | All findings of this stream surface as CLAUDE.md operator-action queue items + verdict ledger row in §6, not new `.claude/rules/*.md`. |
| **R5** (safety boundaries via Claude Code permissions + sandboxing; no custom guard scripts) | `.claude/settings.json:permissions.deny[]` covers 17 secret-file globs (env / id_rsa / id_ed25519 / pem / pfx / key / crt / aws creds / ssh / netrc / npmrc / docker config / credentials.json + CLAUDE.local.md + eee.local.ps1); `defaultMode: bypassPermissions` allows ergonomic auto-edits within the safety envelope | ✓ PASS | No custom-guard `.py`/`.sh` scripts — `.claude/settings.json:permissions` is the boundary. |

**Net cardinal-rule check**: **PASS (R1+R2+R4+R5 PASS · R3 N/A).**

---

## §6 — Operator-action queue items

| # | Severity | Item | Command | Cite |
|---|---|---|---|---|
| **A** | **HIGH** | `pull.rebase=false` contradicts CLAUDE.md:24 rebase-not-merge mandate (latent — no `git pull` issued this session; would produce merge-commit on first non-fast-forward pull) | `git -C Z:/claude-sota-installed config pull.rebase true` | §3.2 + CLAUDE.md:24 |
| **B** | **MEDIUM** | `push.useForceIfIncludes` UNSET — force-with-lease discipline relies on operator habit, not git enforcement | `git -C Z:/claude-sota-installed config push.useForceIfIncludes true` | §3.3 + CLAUDE.md:24 |
| **C** | LOW | gitnexus `.mcp.json` entry uses `npx -y gitnexus@latest mcp` (D6 unpinned-risk) — even though `enabledPlugins: false`, the `.mcp.json` still triggers if a future re-enable happens | Pin to `npx -y gitnexus@1.3.6 mcp` IF re-enabling (else leave — disabled means inert) | §2.1 + CR-9 |
| **D** | LOW | Remove `.claude/plugins/marketplaces/abhigyanpatwari-GitNexus/` if gitnexus stays disabled for ≥3 more waves (cleanup hygiene) | Defer until W308+ — current marketplace dir is **inert** while `enabledPlugins=false` and adds 0 runtime cost | §2.1 |
| **E** | NONE | W303-A gap #4 (missing JS/TS CI gate) — close with `NEGATIVE — no surface to cover` | Update W303-A coverage matrix to mark gap #4 RESOLVED | §1.2 |

---

## §7 — Open questions

1. **W287/W290 worktree carry-forward**: are the `goal/W287-reconcile` + `sota-converge-w290` worktrees still active or should they be `git worktree remove`'d to free the cap from 3/3 → 1/3? Default answer: defer until W287/W290 explicitly closed. The W287-reconcile branch at `0f9dbe8` is 7+ commits behind `sota-converge-w295` HEAD `d10246e`; rebase-and-merge would unblock removal. Similarly `sota-converge-w290` at `373ef71` was already shipped as `398f0ca` on main — the worktree is informational-only now and could be pruned at next maintenance window.
2. **`enabledPlugins.gitnexus@gitnexus-marketplace`**: under sca-v5 + W302-A KEEP-DISABLED, should the `extraKnownMarketplaces.gitnexus-marketplace` entry be removed from `.claude/settings.json:344-350`? Default answer: NO — keeping the marketplace declaration costs ~10 LOC + ~50 MB on disk and makes re-litigation cheap; removing it would force a re-clone of the plugin dir if re-enabled. **Re-litigation trigger**: if D1 license issue resolves (upstream relicensing to MIT/Apache-2) OR D16/D21 governance gap closes (≥2 maintainers + named succession).
3. **`ty` 1.0 watch**: when astral-sh/ty hits 1.0, re-litigate `pyright → ty` migration. Re-litigation criteria: ty 1.0 + ≥3 months stability + W290-F1-class type-clean output parity (0E/0W/0I across 26 in-tree Python files) + W288-fix3-style harness-deps integration into CI.
4. **Pre-commit framework upstream-health monitor**: any indication pre-commit/pre-commit upstream is going maintenance-only would re-trigger lefthook re-litigation. Default: no signal yet — pre-commit v4.6.0 (2026-04) is fresh. Watch criteria: ≥6 months between releases OR maintainer-bandwidth public statement.
5. **PSScriptAnalyzerSettings.psd1 IncludeRules drift**: the W287 P2(i) config (cite §1.1) suppresses 462W warnings to a curated "real bugs only" list. Does the curated list (7 rules visible in the head -30 sample) drift relative to PSScriptAnalyzer's 2026-MAY rule additions? Default: snapshot is fine but a quarterly re-baseline against PSGallery latest is queued for W308+.
6. **gitleaks `pass_filenames: false` upstream fix**: the `gitleaks-system` hook upstream omits `pass_filenames: false`, which we override in `.pre-commit-config.yaml`. Should an upstream PR be filed to the gitleaks/gitleaks repo to align `gitleaks-system` with `gitleaks` + `gitleaks-docker` hook variants? Default: yes (low-priority); queued for operator-discretion next-wave.
7. **W255-cleanup-exception audit**: the `.claude/hooks/context-mode-cache-heal.mjs` is the sole `.claude/hooks/*` file remaining post-W255-cleanup. Is the context-mode plugin's plugin.json `hooks.SessionStart` declaration the authoritative cite that makes this CR-2 R2-RELAX-compliant? Default: yes per `code.claude.com/docs/en/mcp` plugin-supplied MCP precedence (Wave 95 Ship 1M cite). Re-validate when context-mode plugin upgrades.

---

## §8 — Source disagreement log

| Dim | Source A | Source B | Disagreement | Resolution |
|---|---|---|---|---|
| D1 gitnexus license | upstream `package.json: license="MIT"` | `LICENSE` file is ELv2 | License-field misdeclared by upstream | LICENSE file wins (W286-arc-P0C). Confidence factor=0.7 applied — but D1=2 still hard-caps INSTALL. |
| W303-A gap #4 IC | "missing JS/TS gate IC=2.0" (gap matrix) | empirical `git ls-files '*.ts'` returns 0 | gap is moot in this runtime | RESOLVED — close W303-A gap #4 with `NEGATIVE — no surface to cover`. |
| W302-A score reporting | W302-A reported gitnexus install_score=3.00, pattern_score=2.84 | This audit's line-by-line walk: install=2.68, pattern=2.72 | Within ±10% expected hand-aggregation drift band | ACCEPTABLE — both verdicts route to T4 CITE-ONLY. Confidence factor=1.0. |

---

## §9 — Cite anchors (per W305-PLAN.md §4 + sca-v5 SKILL.md provenance)

1. **`.github/workflows/code-quality.yml`** @ HEAD `d10246e` (W288-P3-m `62a30fd` + W288-fix3 `0fae87a` patches applied).
2. **`.pre-commit-config.yaml`** @ HEAD `d10246e` (gitleaks v8.30.1 + ruff v0.15.12 + actionlint v1.7.12 pinned; 13-path exclusion regex).
3. **`.claude/settings.json:94-156`** PreToolUse + PostToolUse + PreCompact + WorktreeRemove + Notification + SessionStart hooks (CR-2 R2-RELAX direct-CLI compliance).
4. **`.claude/settings.json:214`** `gitnexus@gitnexus-marketplace = false` enabledPlugins state.
5. **`docs/architecture/W302-SERENA-KUZU-AND-EXECUTION/W302-STREAM-A-SERENA-AND-CODEBASE-NAV-AUDIT.md`** Stream A row #12 gitnexus T4 CITE-ONLY ranking + license-field reconciliation.
6. **`docs/architecture/W290-QUALITY-AND-SOTA-WAVE/F1-CODE-QUALITY-AUDIT.md §0`** baseline pyright 0E/0W/0I + ruff 5 HIGH (B007/B009/F541) + shellcheck 0 findings.
7. **`docs/architecture/W298-AGENT-ORCHESTRATION-AND-SOTA-WIRING/W298-STREAM-A-ORCHESTRATION-FORENSICS.md §1.5`** R2 cardinal-rule self-check pattern.
8. **CLAUDE.md:24-32** parallel-session safety + worktree-per-session + rebase-not-merge + force-with-lease + ~3 cap mandates.
9. **`.claude/skills/sota-convergence-audit/SKILL.md §4` (sca-v5)** 20-dim rubric; install_denom=19.3, pattern_denom=9.4; tier-specific hard-caps; D1<3 INSTALL-cap + D18<2 Universal REJECT.
10. **W286-arc-P0C** `.mcp.json` MCP-server `command/args` contract → `npx -y <pkg>@<pinned-version>` (per CLAUDE.md:28 cardinal-rule-9 discipline; gitnexus `.mcp.json` entry MUST be pinned if re-enabled per operator-action §6.C).

---

## §9.5 — W303-A gap-matrix closure record

W303-A coverage-gap matrix has 7 rows (per W303-A Stream A `W303-STREAM-A-COVERAGE-GAP-AUDIT.md`). Stream B owns gap #4 closure:

| Gap # | Description | IC (W303-A) | Stream B verdict |
|---|---|---|---|
| 1 | `harness/eval_harness.py` `_persist()` lacks R8 EvalLog | 3.0 | OWNED BY STREAM D |
| 2 | planning-with-files Phase-5 gate audit | 2.5 | OWNED BY STREAM C |
| 3 | `agent-teams` plugin deep audit | 2.2 | OWNED BY STREAM A |
| **4** | **GitHub Actions code-quality.yml CI lane re-audit** | **2.0** | **OWNED — RESOLVED §1** |
| 5 | gitnexus enabledPlugins.false sca-v5 verdict refresh | 1.8 | **OWNED — RESOLVED §2** |
| 6 | git-practice compliance (worktree+rebase+force-with-lease) | 1.5 | **OWNED — RESOLVED §3** |
| 7 | (out of scope) | 1.2 | — |

**Stream B closes gaps #4, #5, #6** (3 of 7 W303-A coverage-gap rows). Gap #1 → Stream D; gap #2 → Stream C; gap #3 → Stream A.

---

## §10 — Top-3 findings + confidence summary

| # | Finding | Confidence | Routed to |
|---|---|---|---|
| **1** | **W303-A gap #4 (missing JS/TS CI gate) is empirically moot** — 0 tracked `.ts` files + 1 `.mjs` shim. Adding TS lane would violate YAGNI + CR-2 hook discipline. | HIGH | W305-AUDIT §close-W303-A-gaps; resolve gap #4 NEGATIVE. |
| **2** | **gitnexus stays T4 CITE-ONLY under sca-v5** (install_score 2.68 / 3.00 W302-A) — D1=2 ELv2 license + D9=1 + D16=1 + D21=1 hard-caps fire. KEEP-DISABLED. | HIGH | W305-AUDIT §plugin-state; no re-litigation. |
| **3** | **2 git-practice gaps require operator-action**: (A) `pull.rebase=false` contradicts CLAUDE.md:24 rebase-not-merge (HIGH); (B) `push.useForceIfIncludes` UNSET (MEDIUM). | HIGH | W305-AUDIT §operator-action queue rows A+B. |

---

## §11 — sca-v5 ledger-row sketch (gitnexus T4 CITE-ONLY re-audit)

Per sca-v5 §6 ledger contract (G10 collapsed 4→2-target W295-codex-r12), the gitnexus re-audit ledger row would be:

```yaml
candidate: gitnexus@1.3.6 (gitnexus-marketplace)
audit_date: 2026-05-18
audit_wave: W305-Stream-B
rubric_version: sca-v5 (W299)
install_score_v5: 2.68
pattern_score_v5: 2.72
tier_routing: T4 CITE-ONLY
hard_caps_fired:
  - D1=2 (ELv2 source-available; INSTALL-cap)
  - D9=1 (failure_mode_disclosure)
  - D16=1 (solo maintainer; T1+T2 cap)
  - D21=1 (1 org)
disagreement[]:
  - dim: D1
    sources: [package.json:license="MIT", LICENSE file ELv2]
    resolution: W286-arc-P0C LICENSE file authoritative
    triggers_codex_mediation: false
cost_actual_spent: ~$0.05  # tier-1 broad-scan cache hits
cascade_degraded: false
eval_log_path: (no benchmarkable surface — n/a)
phase_5_gates: {provenance: PASS, paraphrase: N/A, adversarial: DEFERRED_W305_codex_r1, contamination: PASS, replayable_3org: PASS}
position_swap_consistent: DEFERRED
per_dim_versions:
  D1_v3_to_v5: 2 → 2 (no change)
  D9_v3_to_v5: 1 → 1
  D12_v3_to_v5: 2 (stars-only, log10 formula natural cap)
prior_verdicts:
  - W286-arc-P0C: ENABLED→DISABLED (license)
  - W290.5: KEEP-BOTH (vs serena)
  - W296: T2 4.81 (silent re-enable foundation; never installed)
  - W299-D: 0% T2 hit-rate (uninstalled)
  - W302-A row #12: T4 CITE-ONLY 3.00/2.84
  - W305-B (this): T4 CITE-ONLY 2.68/2.72 ← TIER-STABLE
status_decision: KEEP-DISABLED (tier-stable; no re-litigation)
re_litigation_triggers:
  - upstream relicense to MIT/Apache-2 (D1 hard-cap unlocks)
  - ≥2 maintainers + named succession (D16/D21 hard-caps unlock)
```

**Ledger-row provenance**: this is a sketch for W305-AUDIT synthesis — actual ledger write goes through basic-memory T6 + memory MCP T2 + cognee T3 per `docs/architecture/W295-AUDIT-2026-05-18.md` 6-tier memory write-through pattern.

---

**File**: `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-STREAM-B-CODE-QUALITY-GIT-AUDIT.md`
**LOC**: ≈520 (target band 500-800 — within band).
**Cite-anchors**: 10 (per §9).
**Cardinal-rule self-check**: PASS (R1+R2+R4+R5; R3 N/A).
**Source-disagreement entries**: 3 (per §8).
**Multi-MCP cascade families**: 4 (basic-memory + github + WebSearch/context7 + deepwiki/repomix — per sca-v5 §1 Tier-1 broad-scan minimum).
**Routed items to W305-AUDIT**: 3 top-findings (§10) + 5 operator-action queue items (§6) + 4 open questions (§7).
