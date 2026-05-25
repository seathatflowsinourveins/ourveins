# Ship 2Q — cwc commit-on-stop discipline-revision (Option D HYBRID throttle wrapper)

**Agent**: sota-researcher Sonnet stand-in (agentId a7d30a485c10d68d9; 310039ms / 18 tools / 381053 tokens)
**Date**: 2026-05-08
**STAND-IN-NOTICE**: Sonnet stand-in per CLAUDE.local.md ENV (g); orchestrator MUST fire codex T1 e2e BEFORE commit per CR-3 + Ship 2P fully-unleashed (NO --sandbox=read-only).

## VERDICT

**APPROVE-DESIGN conf=0.88**

**Recommended**: Option D HYBRID wrapper
- Pattern P5 env kill-switch (`CWC_COMMIT_ON_STOP_DISABLE=1`)
- Pattern P3 hybrid throttle (time AND LOC — default 3600s OR 50 LOC; commit only if EITHER threshold broken)
- Delegate to upstream cwc verbatim (CR-12 preserved)

## Architecture

NEW wrapper at `.claude/hooks/scripts/cwc/commit-on-stop-throttled.sh` (~50 LOC):
1. Honor `CWC_COMMIT_ON_STOP_DISABLE=1` env
2. Read `CWC_COMMIT_ON_STOP_MIN_INTERVAL_SEC` (default 3600) + `CWC_COMMIT_ON_STOP_MIN_LOC` (default 50)
3. Probe `git log -1 --format=%ct --grep='^session checkpoint:'` for last checkpoint timestamp
4. Probe `git diff --shortstat` for cumulative LOC delta
5. Skip if BOTH conditions hold (recent AND small)
6. Else delegate to upstream `${CLAUDE_PROJECT_DIR}/.local/cwc/claude-code-config/.claude/hooks/commit-on-stop.sh`

REWIRE `.claude/settings.json:234` Stop[1] command from upstream-direct → wrapper.

## Cite chain

- **TIER-1-DIRECT**: `Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/hooks/commit-on-stop.sh @ HEAD ffd563d668a97a38d4aa092bf0d5b1507c046629` (Apache-2.0 Anthropic OFFICIAL; 17 LOC; wrapper preserves verbatim per CR-12)
- **TIER-3-LOCAL-COMPOSITION**: throttle predicate is sss-novel mechanical composition (Lamport timestamp + git porcelain shortstat) over TIER-1 cwc primitive. Per CR-1 rule #8 lattice: `effective_tier=TIER-3-LOCAL-COMPOSITION`.

## CR compliance

- **CR-1**: cite-class TIER-3-LOCAL-COMPOSITION over TIER-1 cwc
- **CR-3**: codex T1 e2e BEFORE commit (this design pre-Pattern-A)
- **CR-7**: Phase 1 — operational fix; doesn't change permission scope
- **CR-8**: ADAPTED-FROM-SOTA — cwc primitive + git porcelain
- **CR-9**: install-risk LOW (no @latest, no sibling-bleed, version-pin upstream cwc HEAD ffd563d6, sibling REVERT-check clean)
- **CR-12**: SATISFIED — upstream cwc UNTOUCHED; wrapper forward-only ADDITION; delegates verbatim

## HONEST-NON-FINDING

NO single SOTA repo provides "throttled cwc commit-on-stop wrapper" — wrapper IS the eee-local CR-3-style composition. Pattern is mechanical primitive (Lamport + git shortstat) + operator-discipline composition over TIER-1 cwc. Admissible via STRONG-PROVENANCE-EXPRESS on cwc upstream + CR-3 Phase 1 lattice composition.

## Edit prescription (~80 LOC bounded ship)

| File | LOC delta | Type |
|---|---|---|
| `.claude/hooks/scripts/cwc/commit-on-stop-throttled.sh` (NEW) | +50 | wrapper script |
| `.claude/settings.json:234` (REWIRE) | +0/-0 (1 line edit) | wire change |
| `docs/install-provenance.md` (APPEND) | +30 | provenance |

(Full design in earlier artifact; persisted to this file for orchestrator handoff.)
