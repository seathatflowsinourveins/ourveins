# Wave 82 Ship 1D — eee.ps1 proxy-unreachable recovery (3-option design)

**Origin**: 3-agent SOTA team dispatch 2026-05-08 11:00 (CADP rule 2 max 3 concurrent; ≥2 BRIDGE-MODE GPT-5.5)
**Agent**: sota-researcher (Sonnet stand-in per CLAUDE_CODE_SUBAGENT_MODEL env)
**Tool count**: 11 / Duration: 239s

## §1 STAND-IN-NOTICE (per cross-model-consensus.md)
Cross-model gate NOT structurally satisfied for this artifact (Sonnet stand-in). Orchestrator-side proxy `/v1/chat/completions` foreground-equivalent satisfies cardinal-rule-3 Phase 1 bootstrap exception when applied to synthesis verdict.

## §2 RECOMMENDED: Option A (auto-start) WITH Option B as inner-fallback

Hybrid composition:
1. First: attempt auto-start (Option A) — preserves proxy-routed UX (8-account fleet + cpa-usage-keeper telemetry)
2. Second: if auto-start fails, apply Option B (unset BASE_URL+AUTH_TOKEN) — preserves launch via OAuth fall-through

Justification:
- Probe-DAG: P3+P5+P6 PASS for both A and B
- launch-discipline.md §3 invariant 3: Stage-0 internal recovery + Stage rollback to known-good
- cardinal-rule-7 Phase 1 fit: graduated unleash without premature Phase 2 commitment
- deprecation-discipline.md: matches "advisory deprecation" default

## §3 Mia pre-apply override (orchestrator-side, 2026-05-08 11:00)
All 5 load-bearing claims VERIFIED:
1. T0.9 precedent at L431-461: verified
2. L390-400 insertion point: verified
3. L153 unconditional BASE_URL setting: verified + comment drift confirmed
4. .credentials.json OAuth fallback: verified (471 bytes, claudeAiOauth key) — UPGRADES Option B from "broken" to "viable"
5. No --check flag in v6.10.9: verified

HONEST-NON-FINDING: brief framing on Option B "no API key" was UNDER-stated. Agent A self-corrected via Mia probe; orchestrator-side re-verification confirms.

## §4 Implementation skeleton ~38 LOC at L390-400 (replacing existing healthz try/catch) — full code in agent return artifact

## §5 Cite trail
- TIER-1: https://code.claude.com/docs/en/env-vars (ANTHROPIC_BASE_URL semantics)
- TIER-1: https://code.claude.com/docs/en/authentication (subscription OAuth as final fallback)
- TIER-1: Z:/repos/deps/CLIProxyAPI/internal/api/server.go:340-341 @ HEAD 785b00c3 (/healthz)
- OPERATIONAL-PROBE: .claude/.credentials.json (471 bytes, 2026-05-08T10:42, claudeAiOauth)
- OPERATIONAL-PROBE: tools/eee.ps1:431-461 (T0.9 cpa-usage-keeper precedent)
- TIER-3-LOCAL-COMPOSITION: launch-discipline.md + deprecation-discipline.md

## HANDOFF
verdict_one_line: DONE — Option A+B hybrid recommended; Pattern A apply pending Agents B+C return + GPT-5.5 e2e review.
