# W343 P2 — Cookbook + Ecosystem + CLAUDE.md Drift Refresh

> Wave W343 / branch `goal/W343`. Cite W342-AUDIT §4 P2 (E5 cookbook + E6 ecosystem + Stream D + Stream B drift).

## §P2.A — Cookbook adaption

| Action | Source | Status |
|---|---|---|
| Vendor `harness/batch_lane.py` (Anthropic Message Batches API, 50% cost cut) | `anthropics/claude-cookbooks@39a350b6/misc/batch_processing.ipynb` | ✅ DONE 2026-05-20 (248 LOC; idempotent cache + 4 CLI modes + lazy SDK import; `python -m py_compile` clean) |
| Vendor `.claude/skills/prompt-caching-discipline/SKILL.md` (extend in-harness prompt-caching to runtime skills) | `anthropics/claude-cookbooks@39a350b6/misc/prompt_caching.ipynb` | ✅ DONE 2026-05-20 (109 LOC; 4 triggers + 5 anti-patterns; cardinal-rule-4-axis-1-#6 compliant) |
| (Optional) `harness/evaluator_optimizer.py` (concrete generator+evaluator loop) | `anthropics/claude-cookbooks/patterns/agents/evaluator_optimizer.ipynb` | DEFERRED P3 (W344) |

## §P2.B — PowerShell SOTA hardening

E6 baseline: 0/26 `.ps1` use `Set-StrictMode`; 1/26 declared `#Requires` (wave152, -Version 5). HIGH-ROI miss.

**W343-A16 application (2026-05-20)**: 26 .ps1 enumerated · 24 modified · 1 RED-skip-tombstone (`hindsight-queue-janitor.ps1`, DEPRECATED NO-OP) · 1 RED-pre-existing-pin (`wave152-f1-netsh-pin.ps1`, already `#requires -Version 5`). Parse-verify 24/24 PASS via `[scriptblock]::Create()` probe.

| File | Bytes | Classification | Discipline Added | Parse-OK |
|---|---|---|---|---|
| `tools/cleanup-root-phantom-paths.ps1` | 5666 | GREEN | Both | PASS |
| `tools/eee-status.ps1` | 9236 | GREEN | Both | PASS |
| `tools/w317-cleanup-z-phantom.ps1` | 6554 | GREEN | Both | PASS |
| `tools/w328-trio-2-settings-validate.ps1` | 7465 | GREEN | Both | PASS |
| `tools/w328-trio-3-langfuse-verify.ps1` | 8918 | GREEN | Both | PASS |
| `tools/insights-wireup/phoenix-start.ps1` | 5750 | GREEN | Both | PASS |
| `tools/insights-wireup/statusline-smoke.ps1` | 6061 | GREEN | Both | PASS |
| `tools/bootstrap-runtime.ps1` | 35928 | YELLOW | Requires | PASS |
| `tools/eee-admin-bootstrap.ps1` | 10887 | YELLOW | Requires | PASS |
| `tools/eee-backup.ps1` | 22074 | YELLOW | Requires | PASS |
| `tools/eee.ps1` | 67748 | YELLOW | Requires | PASS |
| `tools/eee_install_cron_tasks.ps1` | 12371 | YELLOW | Requires | PASS |
| `tools/install-cli-extras.ps1` | 2967 | YELLOW | Requires | PASS |
| `tools/planning-attest.ps1` | 1412 | YELLOW | Requires | PASS |
| `tools/repatch-autoresearch-namespaces.ps1` | 3969 | YELLOW | Requires | PASS |
| `tools/repatch-context-mode-hooks-json.ps1` | 3048 | YELLOW | Requires | PASS |
| `tools/repatch-plugin-shadow-commands.ps1` | 6597 | YELLOW | Requires | PASS |
| `tools/sota-reverify.ps1` | 6545 | YELLOW | Requires | PASS |
| `tools/w328-trio-1-phoenix-receivers.ps1` | 11876 | YELLOW | Requires | PASS |
| `tools/w328-trio-e2e-smoke.ps1` | 6257 | YELLOW | Requires | PASS |
| `tools/insights-wireup/otel-headers-template.ps1` | 3603 | YELLOW | Requires | PASS |
| `tools/insights-wireup/privacy-opt-ins-phase1.ps1` | 4761 | YELLOW | Requires | PASS |
| `tools/insights-wireup/wire-all.ps1` | 5803 | YELLOW | Requires | PASS |
| `tools/research-stack/setup-open-source-research-stack.ps1` | 12118 | YELLOW | Requires | PASS |
| `tools/hindsight-queue-janitor.ps1` | 3740 | RED | None (DEPRECATED tombstone NO-OP per W288 §G-B) | n/a |
| `tools/wave152-f1-netsh-pin.ps1` | 8892 | RED | None (already declares `#requires -Version 5` for WinPS5 compat) | n/a |

**Top-3 YELLOW→GREEN promotion candidates for W344** (after runtime-test validation per inline TODO markers):
1. `tools/w328-trio-1-phoenix-receivers.ps1` — already has 1 try/catch + CmdletBinding + EAP=Stop; needs 1-2 more guard blocks around Docker-compose YAML edits to safely enable strict-mode.
2. `tools/insights-wireup/privacy-opt-ins-phase1.ps1` — small (4.7KB) with 1 try/catch; tight code surface to validate strict-mode safely.
3. `tools/sota-reverify.ps1` — 6.5KB graphiti read-only helper; deterministic JSON output makes runtime smoke-test trivial.

**Action**: All 24 modified scripts cite Microsoft PowerShell Best Practices (`#Requires` for runtime version-gating; `Set-StrictMode -Version Latest` for defensive uninitialized-variable + non-existent-property catch). YELLOW scripts carry `# TODO W344` markers for runtime-test-driven strict-mode promotion.

## §P2.C — Root `package.json` (E6)

```json
{
  "type": "module",
  "engines": { "node": ">=22.13" },
  "scripts": {
    "test": "node --test tools/test-*.mjs",
    "lint": "node --check tools/*.mjs"
  },
  "private": true
}
```

**Status**: TBD.

## §P2.D — MCP version-pin closure (Stream D P2)

| MCP | Current command | Pinned command | Status |
|---|---|---|---|
| basic-memory | `uvx --from basic-memory==0.21.1 basic-memory mcp` | already-pinned per W308 — VERIFY | TBD |

Stream D originally flagged "uvx basic-memory bare" — verify whether the `--from basic-memory==0.21.1` form satisfies CR-9 W286-arc-P0C contract. May be already-compliant.

## §P2.E — CI additions

| Workflow | Cite | Status |
|---|---|---|
| `.github/workflows/claude-model-check.yml` | `anthropics/claude-cookbooks/.github/workflows/claude-model-check.yml` | ✅ DONE 2026-05-20 (SHA-pinned actions; weekly cron + push/PR triggers; YAML parse clean) |
| `.github/workflows/links.yml` (lychee) | `lycheeverse/lychee-action@v2` (commit 1d97d84f0bc547f7b25f4c2170d87d810dc2fb2c) | ✅ DONE 2026-05-20 |
| `lychee.toml` | lychee.cli.rs docs | ✅ DONE 2026-05-20 (7d cache TTL, 429 accepted as transient, private-network exclude) |

## §P2.F — Tool / dependency refresh

| Action | Status |
|---|---|
| `mise install` (installs declared-but-missing lazydocker) | TBD |
| `mise self-update` (2026.5.3 → 2026.5.12 advisory bump) | TBD |
| `.actrc` config for nektos/act local CI | TBD |

## §P2.G — Stage-0.5 ENUMERATION-BYPASS operationalize (E1 P2)

Per sca-v15 §1.5 — author scripts under `tools/sota-discovery/`:
- `duckdb-hf-hub-stats.sql` (M5 DuckDB over cfahlgren1/hub-stats parquet)
- `gh-cascade.sh` (6-step: sizing→window-partition→cursor→BigQuery→ecosyste.ms→GH Archive)

**Status**: TBD.

## §P2.H — CLAUDE.md drift refresh

| Line | Drift | Fix |
|---|---|---|
| L6 | `pre-W255-cleanup-*` tag claimed but absent | Recreate from historical SHA OR rewrite to existing `pre-W337-p3-1-claude-md`/`pre-W337-sca-v14` |
| L31 | worktree examples `W272/W273/W280` stale | Update to live: `W335 (goal/W336-continue) + W337 (goal/W337-continue) + W343 (goal/W343)` |
| Status block | `load_failures=1` unverifiable | Drop claim OR resolve W337-AI-11 investigation |

## §P2.I — Misc hygiene

| Item | Status | Rationale |
|---|---|---|
| W316 gitnexus marketplace dir excise | DOCUMENTED-RETENTION (NO-OP) | `.claude/plugins/marketplaces/` is gitignored (line 14); operator-curated skills under `.claude/skills/gitnexus*/` are TIER-1-DIRECT vendor mirrors not dependent on marketplace dir; settings.json:341 `extraKnownMarketplaces.gitnexus-marketplace` retained as inactive registration (plugin disabled per W316). Per W342-Stream-C codex r3 audit: safe to retain. |
| Stray `.git/hooks/prepare-commit-msg` lefthook shim | NO-OP (false alarm) | W343-A13 audit found `lefthook.yml` EXISTS at repo root — lefthook IS configured; the prepare-commit-msg hook is INTENTIONAL, not stray. W342-Stream-B finding was based on STALE state. |
| `.gitignore` additions (`dist/`, `build/`, `*.key`, `*.pem`, `.pytest_cache/`, `.coverage`, `htmlcov/`, `tmp/W343-*.log`, `tmp/codex-*.log`) | ✅ DONE 2026-05-20 | section header `# W343-P2.I — build artifacts + private keys + python-test caches` |
| `.claude/skills/_archived/.gitkeep` | NO-OP | dir IS populated (W324-deprecated, W324-pre-sca-v9, W325-deprecated subdirs); not empty; no `.gitkeep` needed |

## P2 ship-gate

Each row's "Status" column flipped to ✅ DONE or 🟡 DEFERRED with cited rationale; pre-commit green; codex round-1 APPROVE on the P2 commit batch (or REVISE→round-2 ≤2).
