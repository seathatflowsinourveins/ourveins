# W392 Foundation Cleanup — Tactical Design v4 (codex r1+r2+r3 → 17 findings folded; r4 APPROVE@0.92)

> 4-stream parallel audit (A versions / B dead-code / C canonicality / D redundancy) → synthesis → codex GPT-5.5 r1 REVISE@0.87 (8 findings, all folded into v2) → execute via W387 clean-merge → THEN W389 Wave 0a.1 on clean foundation. Operator directive: "make sure architecture itself is clean and sota, via install/clean approach sota, zero low quality stale code references".

## §1 Audit summary (unchanged from v1)
A=stale-versions (10 top + 7 stragglers + MCP-pin drift + GH-Actions floating tags) · B=dead-code (~40 tools/ files) + 4 CR-5-unsanctioned hooks + 3 disabled-plugin records + `exa` MCP silently broken · C=sca canonicality (v22 on main, v17 hardcoded in telemetry, v18 in schema dir only) + 23-layer canonical (W389 PR#58) · D=82%-doc-bloat in `_archive/W259-grand-catalog-archive/` (6,616 files) + tool overlaps are complementary, route-don't-retire.

## §2 Cleanup decisions (priority + codex r1 corrections folded)

### P0 — Immediate hot-fixes (correctness)
- **P0.1** `tools/lib/sca-telemetry-core.mjs:69` — `currentVersion='sca-v17'` → `'sca-v22'`. Plus **codex r1#7 expansion**: same sweep covers `tools/preagent-d73-gate.mjs:37,185` (sca-v13/v14/v15) AND `tools/stop-position-swap.mjs` (cites sca-v15). All in one PR scope.
- **P0.2** `exa` MCP silently broken — populate `EXA_API_KEY` in `CLAUDE.local.md` OR `"disabled":true` in `.mcp.json`.
- **P0.3** `CLAUDE.local.md` L79+L80+L90 — rewrite Services/MCP-list/memory-tier to current state (T1+T4+memory-MCP retired; current = 3-tier T3 cognee + T5 langfuse + T6 basic-memory).
- **P0.4** `.mcp.json _comments` — excise stale refs to phoenix-mcp@4.0.13 / graphiti / context7 / gitnexus (provenance trail lies).

### P1 — Structural cleanup
- **P1.1 ARCHIVE LIFT (codex r1#1+#2 + r2#1+#2+#3 EXPANDED)** — `git mv docs/architecture/_archive/W259-grand-catalog-archive/ docs/_archive/W259-grand-catalog-archive/00-archive-from-prior-waves/` (EXPLICIT target preserves terminal name `00-archive-from-prior-waves/` under it for ref-stability). **In SAME PR**:
  - **Mechanical link rewrite (multi-variant)** — Windows = slash AND backslash variants; absolute AND relative refs:
    ```bash
    # Forward-slash absolute
    rg -l '_archive/W259-grand-catalog-archive' | xargs sed -i 's|_archive/W259-grand-catalog-archive|_archive/W259-grand-catalog-archive/00-archive-from-prior-waves|g'
    # Backslash variant (Windows path refs in docs/scripts) — codex r3#1: use `rg -F` (fixed-string) + same fixed-string in replacement, NOT regex escapes
    rg -l -F '_archive\W259-grand-catalog-archive' | while read -r f; do
      # Use python for safe literal-string replacement (no regex escape semantics)
      python -c "import sys,pathlib; p=pathlib.Path(sys.argv[1]); p.write_text(p.read_text().replace('W259-grand-catalog\\\\00-archive-from-prior-waves', '_archive\\\\W259-grand-catalog-archive\\\\00-archive-from-prior-waves'))" "$f"
    done
    # Relative refs INSIDE the moved subtree (`../../W259-grand-catalog/...` style) — relocate to `../../W259-grand-catalog-archive/...`
    rg -l '\.\./\.\./W259-grand-catalog/' docs/_archive/W259-grand-catalog-archive/ | xargs sed -i 's|\.\./\.\./W259-grand-catalog/|../../W259-grand-catalog-archive/|g'
    ```
  - **Update `.gitleaksignore`** — rewrite path prefix to new location (historical-token suppression preserved).
  - **Update `.pre-commit-config.yaml`** — current global-exclude has `.claude/_archive/.*` but NOT `docs/_archive/.*` (codex r2#3); ADD `docs/_archive/.*` to the global-exclude list in same PR or markdown/cite-floor/etc hooks will newly process 6,616 archive files.
  - **Update affected workflows** (`.github/workflows/*.yml`) — long-path/PSScriptAnalyzer/model-check skips re-pointed.
  - **Verify post-move (multi-variant audit)**:
    ```bash
    test "$(git ls-files | grep -c '^docs/_archive/W259-grand-catalog-archive/')" -ge 6500  # all files moved
    test "$(rg -l '_archive/W259-grand-catalog-archive' | wc -l)" -eq 0   # forward-slash refs cleared
    test "$(rg -l -F '_archive\W259-grand-catalog-archive' | wc -l)" -eq 0  # backslash refs cleared (codex r3#1 fixed-string)
    # Inside-archive relative-link audit (codex r3#3 — FAILABLE check, not advisory):
    test "$(rg -l -F '../../W259-grand-catalog/' docs/_archive/W259-grand-catalog-archive/ | wc -l)" -eq 0
    # Pre-commit dry-run to confirm exclude works:
    pre-commit run --all-files cite-floor-check  # should NOT scan docs/_archive/
    ```
- **P1.2 CLAUDE.md refresh**: skill 63→62 (filesystem probe); marketplace 22→21; Langfuse anchor (already v3.174.1, add Stream-A anchor); remove stale `SOTA-LAYERS-LANDSCAPE.md` pointer (file doesn't exist).
- **P1.3 `.mcp.json` version bumps**: `basic-memory==0.21.1` → `0.21.4`; `@colbymchenry/codegraph@0.7.10` → `0.9.3`; `serena` SHA re-pin to current HEAD.
- **P1.4 Manifest refresh**: `docs/sota-installed-manifest.md` L16 Langfuse `v3.170.0` → `v3.174.1`; L21 Phoenix note 3-major-version-lag.
- **P1.5 PLUGIN HARD-REMOVE (codex r1#4 — current settings already `enabled=false`, but record/cache/state remains)** — 3 plugins:
  - `hindsight-memory@hindsight` — dead T1 service.
  - `superpowers@superpowers-marketplace` — duplicate of canonical claude-plugins-official copy.
  - `qdrant-skills@claude-plugins-official` — no Qdrant.
  - **Mechanism**: `/plugin remove <name>@<marketplace>` (or equivalent gh-cli/file ops) — removes the enabledPlugins map entry AND the plugin cache dir AND any state-dir traces. Post-remove verify: `enabledPlugins` count drops by 3 · load_failures=0 · no orphan `.claude/plugins/cache/<name>/` dirs · no orphan settings.json references.
- **P1.6 Dead-code purge (~40 files in batched PRs, codex r1#5 — sequenced safety)**:
  - **P1.6a** `tools/insights-wireup/` (5 files; Phoenix retired) + T1-hindsight stragglers (`daemon-token-mint.mjs`, `hindsight-queue-janitor.ps1`) + `sca-v7-prelim.sh`.
  - **P1.6b** Wave-one-offs (`w317-cleanup-z-phantom.ps1`, `w328-trio-*` 4 files, `wave152-f1-netsh-pin.ps1`, `W327-E-codex-mjs.patch`).
  - **P1.6c** Repatch one-offs (`repatch-autoresearch-namespaces.ps1`, `repatch-context-mode-hooks-json.ps1`, `repatch-plugin-shadow-commands.ps1`) + migration one-offs (`alirezarezvani-stage2-prep.mjs`, `codex-patch-present-probe.mjs`).
  - **P1.6d** Research prototypes + status/bootstrap one-offs (~17 files) — **CRITICAL per codex r1#5**: BEFORE retire, run `rg --files-with-matches '<filename-no-ext>'` for each. `basic-memory-hybrid-retrieval.mjs` + `memory-reranker.mjs` are COORDINATED (latter imported by former, both have tests) — **DEMOTE TOGETHER to `tools/_archive/memory-pipeline-prototype/` (with tests) OR KEEP BOTH if any active import found**. NEVER delete only one. Per-file decision in this PR: each file has either (a) zero active imports → retire; (b) some import → demote-with-companions; (c) test-only → optionally demote tests too.

### P2 — Doc alignment + routing docs
- **P2.1** Create `.claude/schemas/sca-v22-repo-verdict.schema.json` (derive from sca-v18 + extend per `tools/sota-discovery/lib/contract.mjs`).
- **P2.2 (REMOVED — folded into P0.1)** — sca-version refs in `preagent-d73-gate.mjs` + `stop-position-swap.mjs` now P0.1 scope.
- **P2.3** `.claude/skills/sota-convergence-audit/SKILL.md:6` — sca-v20 → sca-v22 alignment.
- **P2.4** `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/LAYER-MAP-CANONICAL.md` — header note acknowledging W389 23-layer extension as going-forward canonical (L0 + L19-L22).
- **P2.5** Delete `docs/architecture/SOTA-RUNTIME-2026-05-22/SYNTHESIS-V1.md` (V2.1 supersedes).
- **P2.6 W389 orphan `3f8468b` — DEFAULT: cherry-pick to archive note (codex r1#8 + r2#5 citation-fix)** — extract content into `docs/architecture/W389-orphan-archive.md` with explicit "SUPERSEDED by PR #58 / a5b82471 r3 APPROVE@0.92; preserved per **provenance / verify-before-claim discipline (CLAUDE.md cardinal rules)** — CR-6 is the verify-before-claim primary anchor; the broader provenance-preservation principle is the rationale; r2 REVISE@0.90 status; 11-layer model not adopted". Then delete `goal/W389-foundation` remote branch. Explicit discard requires operator sign-off (not default).
- **P2.7** Move `docs/superpowers/plans/{W362c,W363,W364}*` → `docs/superpowers/plans/_completed/`.
- **P2.8** Routing decision-trees: extend `.claude/skills/mem-recall/SKILL.md` ("default basic-memory FTS5; escalate cognee on <3 hits"); new `docs/architecture/W392-ROUTING-GUIDES.md` (code-intel decision tree + TDD-trigger-disambiguation).
- **P2.9 CR-5 hook sanction (codex r1#6 + r2#4 EXPANDED — 10 per-hook criteria)** — for each of `preagent-d73-gate.mjs`, `stop-position-swap.mjs`, `subagent-stop-guard.mjs`, `subagent-stop-audit.mjs`, the cleanup PR must document (in the file header comment AND CLAUDE.md cardinal-rule-5 exception section) all 10 criteria. Any hook that cannot pass all 10 = **RETIRE** (delete + remove from settings.json hooks). NOT a blanket CLAUDE.md row — each per-hook adjudicated.
  - **Purpose-set (5, from codex r1#6)**: (1) **purpose** (one sentence); (2) **upstream absence** (which installed plugin would otherwise cover this); (3) **failure-mode** if absent; (4) **rollback procedure**; (5) **current sca-v22 alignment** (where applicable).
  - **Wiring-set (5 NEW, codex r2#4)**: (6) **exact settings.json `event` + `matcher`**; (7) **`timeout_ms`** declared; (8) **`blocking` vs `advisory`** exit semantics (exit 0 advisory vs exit 2 binding); (9) **fail-open vs fail-closed** policy on hook self-error (e.g., JSON parse failure should NOT block commits); (10) **bypass-marker policy** (whether and how the hook honors `CLAUDE_CODE_BYPASS=1` or similar emergency escape, per CR-5-condition-(b) in-session-bypass-marker discipline).
- **P2.10** 9 addyosmani-* local skills audit — diff each vs `agent-skills@addy-agent-skills` cache; retire identicals; document fork-purpose for non-identicals.

### P3 — Tooling consolidation + SHA-pinning
- **P3.1** Merge `tools/parallel-ratio-telemetry.mjs` + `tools/parallel-ratio-calc.mjs` → `tools/parallel-ratio.mjs --mode telemetry|ci-gate`.
- **P3.2 SHA-pin sweep (codex r1#11 + r2#6 — `supply-chain-watch.yml` IN SCOPE; `setup-python` removed — not floating in current workflows)** — pin all floating GitHub-Actions tags including: `harden-runner@v2`, `gitleaks/gitleaks-action@v2` (in `supply-chain-watch.yml` and elsewhere), `actions/checkout@v4` (where floating), `actions/setup-node@v4`, `actions/upload-artifact@v4`, `actions/github-script@v7`, `googleapis/release-please-action@v4`, `github/codeql-action/upload-sarif@v3` (where floating), `wagoid/commitlint-github-action@v6`. Use `pinact run` to mechanize. Verify post-sweep: `pinact run --check` reports zero floating refs.

### OUT-OF-SCOPE (deferred — codex r1#12 confirms bounds)
W374/W375 land; W383 P1 CI consolidation (operator-gated); Phoenix Docker 13→16 upgrade (operator); LANDSCAPE.md sca-v18→v22 header (research-artifact).

## §3 PR batching (17 PRs, codex r1#3 + r2#1 + r3#2 math-corrected, 4 AdaptOrch DAG waves)

| PR | Items | Wave | Notes |
|---|---|---|---|
| **#W392.1** | P0.1 sca-v22 alignment (sca-telemetry-core + preagent-d73-gate + stop-position-swap) | 1 | Independent |
| **#W392.2** | P0.2 exa MCP fix | 1 | Independent |
| **#W392.3** | P0.3+P0.4+P1.2 stale-stragglers excise (CLAUDE.local.md + CLAUDE.md + .mcp.json _comments) | 1 | Independent |
| **#W392.4** | **P1.1 ARCHIVE LIFT** (mv + link-rewrite + guards-update in same PR) | 1 | Independent (large diff but isolated) |
| **#W392.5** | P1.3+P1.4 .mcp.json version bumps + manifest refresh | 2 | Independent |
| **#W392.6** | P1.5 PLUGIN HARD-REMOVE (3 plugins, full remove) | 2 | Independent |
| **#W392.7a** | P1.6a insights-wireup/ + T1-hindsight stragglers + sca-v7-prelim (~8 files) | 2 | Independent |
| **#W392.7b** | P1.6b wave-one-offs (6 files) | 2 | Independent |
| **#W392.7c** | P1.6c repatch + migration one-offs (5 files) | 2 | Independent |
| **#W392.7d** | P1.6d research prototypes + bootstrap one-offs (~17 files) — verify-imports-first; memory-pipeline pair handled together | 3 | Sequential after #7a-c (allows verify-imports time) |
| **#W392.8** | P2.1+P2.3+P2.4 sca-v22 schema + SKILL.md align + W367 23-layer header note | 3 | Independent of #7d |
| **#W392.9** | P2.5+P2.6+P2.7 SYNTHESIS-V1 delete + W389 orphan cherry-pick-to-archive + W362c/3/4 plans move | 3 | Independent |
| **#W392.10** | P2.8 routing decision-trees (mem-recall + W392-ROUTING-GUIDES.md) | 3 | Independent |
| **#W392.11** | P2.9 CR-5 per-hook adjudication (4 hooks: keep-with-docs OR retire each) | 3 | Independent |
| **#W392.12** | P2.10 addyosmani-* local-skill duplicate audit + retire identicals | 3 | Independent |
| **#W392.13** | P3.1 parallel-ratio merge | 4 | Sequential after #7d (verify no extra imports) |
| **#W392.14** | P3.2 SHA-pin sweep (incl. supply-chain-watch.yml) | 4 | Independent |

**Total: 17 PRs (codex r2#1 corrected from v2's mis-count of 16). DAG waves: 4 + 5 + 6 + 2 = 17. Within-wave parallel-ratio = 1.0 (all-parallel-within-wave; max possible).**

v1 said 15 PRs; v2 said 16; v3 = 17 (honest enumeration matches the 17 rows in the table: 1+2+3+4+5+6+7a+7b+7c+7d+8+9+10+11+12+13+14). Parallel-ratio mathematically cannot exceed 1.0 — within-wave fan-out is the right metric.

## §4 Risk + safety (codex r1#5 + #6 + #1 fixes)
- **#W392.4 archive lift safety**: link-rewrite + guard-updates IN SAME PR closes the "37 broken refs + .gitleaksignore/CI path-coupling" hazard. Post-PR verification commands listed inline.
- **#W392.6 plugin hard-remove**: not just settings edit (codex r1#4) — fully remove cache + state + enabledPlugins; verify load_failures=0 + no orphan dirs.
- **#W392.7d memory-pipeline pair**: `basic-memory-hybrid-retrieval.mjs` imports `memory-reranker.mjs` (codex r1#5). Demote TOGETHER to `tools/_archive/` OR keep both. NEVER one-only.
- **#W392.11 CR-5 hooks**: per-hook adjudication (purpose + upstream-absence + failure-mode + rollback + sca-alignment) — retire if any fails. Not blanket sanction.
- **#W392.9 W389 orphan**: default = cherry-pick to `docs/architecture/W389-orphan-archive.md` (CR-6 provenance); explicit discard needs operator sign-off.
- All 17 PRs through W387 clean-merge pipeline; codex-gated per PR; W387-proven flow.

## §5 Codex r1 dispositions (8 findings)
- **r1-H1 (archive lift breaks 37 refs)**: FOLDED into #W392.4 expanded scope (link rewrite + guards in same PR).
- **r1-H2 (.gitleaksignore + pre-commit path-coupling)**: FOLDED into #W392.4 same-PR scope.
- **r1-H3 (PR count math 15 vs 16 vs actual 17)**: FOLDED — final = 17 honest PRs per row enumeration (codex r2#1 + r3#2 sweep); parallel-ratio = 1.0 (within-wave).
- **r1-M4 (plugin uninstall mechanism)**: FOLDED into P1.5 — full hard-remove (cache + state + enabledPlugins + verify).
- **r1-M5 (memory-pipeline pair safety)**: FOLDED into #W392.7d — demote-together rule + verify-imports-first.
- **r1-M6 (CR-5 per-hook docs not blanket)**: FOLDED into P2.9 — per-hook 5-criteria adjudication.
- **r1-M7 (`stop-position-swap.mjs` sca-v15)**: FOLDED into P0.1 sweep.
- **r1-M8 (W389 orphan default cherry-pick)**: FOLDED into P2.6 — cherry-pick to archive note as default.
- **r1-L9 (P0 ordering correct)**: confirmed.
- **r1-L10 (out-of-scope bounds correct)**: confirmed; r1#11 supply-chain-watch.yml SHA-pin FOLDED into P3.2.

## §6 Execution handoff
codex 4-round convergence COMPLETE (r1 REVISE@0.87 → r2 REVISE@0.91 → r3 REVISE@0.89 → r4 **APPROVE@0.92**; 17 findings folded). On APPROVE:
- Wave-1 dispatch (4 parallel subagents): #W392.1 sca-v22 align · #W392.2 exa fix · #W392.3 stragglers-excise · #W392.4 archive lift.
- Wave-2 (5 parallel): #W392.5 version bumps · #W392.6 plugin hard-remove · #W392.7a-c dead-code Phase-1.
- Wave-3 (6 parallel): #W392.7d dead-code verify-first · #W392.8 sca-v22 schema/SKILL/W367 · #W392.9 docs cleanup · #W392.10 routing · #W392.11 CR-5 per-hook · #W392.12 addyosmani skills.
- Wave-4 (2 parallel): #W392.13 ratio merge · #W392.14 SHA-pin sweep.
- After Wave-4 lands: foundation CLEAN → resume W389 Wave 0a.1 (T7 CLAUDE.md folded into #W392.3, so resume at T1 Lefthook + Wave 0a.2).

## §7 Sources (≥3-org cite-floor)
- W392 audits: `Z:/claude-sota-installed-state/W392-audit-notes.md` (4-stream).
- Cardinal rules CR-1..CR-6: `Z:/claude-sota-installed/CLAUDE.md`.
- W387 governance pipeline: `docs/architecture/W387-SOTA-GOVERNANCE/DESIGN.md`.
- W389 design + plan on main: `docs/superpowers/{specs,plans}/2026-05-24-*` (PR #58 a5b82471 + PR #59 0854eceb).
- Anthropic Claude Code: https://docs.anthropic.com/en/docs/claude-code/ (plugins, hooks, subagents, settings).
- GitHub rulesets: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets.
- OSSF Scorecard: https://github.com/ossf/scorecard.
- pinact (SHA-pin enforcement): https://github.com/suzuki-shunsuke/pinact.
