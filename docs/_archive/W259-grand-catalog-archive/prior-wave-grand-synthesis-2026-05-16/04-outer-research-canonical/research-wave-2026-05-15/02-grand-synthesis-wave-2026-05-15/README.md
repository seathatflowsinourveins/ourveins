# Wave 254 Continuation Research Arc — Grand Synthesis (2026-05-15)

Continuation of the W200-W253 SOTA research arc per operator directive 2026-05-15: "continue research wave and write your grand synthesis ... audit all previous research ... synthesis the final repos catalogs for the pure runtime."

## What this arc did

Advanced 4-agent fan-out team + codex GPT-5.5 cross-model T1 (per `advanced-agent-team-standing-directive`):

| File | Agent | Content |
|---|---|---|
| `A-fresh-multi-cohort-discovery-2026-05-15.md` | Wave 252 A `sota-researcher` | Fresh 5-cohort discovery (C2 arxiv / C4 PapersWithCode / C6 awesome-lists / C7 conferences / C9 GraphQL-stars) — **18 NEW 2026-04+ candidates** not in prior roster, scored SRA D1-D10 + CR-12 |
| `C-scoring-matrix-146repo-2026-05-15.md` | Wave 252 C `sota-researcher` | **146-repo 10-dimension scoring matrix** across 11 layers (L1 Foundation .. L11 CI/CD); per-layer top-K; cross-layer top-30; 10 HONEST-NON-FINDINGS |
| `D-recovery-hnf-closure-2026-05-15.md` | Wave 253 D `sota-researcher` | TARGET-runtime probe of `Z:/claude-sota-pure` + recovery of browser/sandbox/CI-CD/OTel axes (Wave 252 Agent B BRIDGE-MODE failed FM-17.b) + license-probe closure |
| `E-codex-cross-model-verdict-2026-05-15.md` | Wave 254 codex GPT-5.5 | First cross-model T1 adversarial review — **NEEDS-REVISION conf=0.92**, 10 findings (1 P0, 6 P1, 3 P2), all Pattern-A integrated into GRAND-SYNTHESIS |
| `F-wave255-fm17-systemic-failure-2026-05-15.md` | Wave 255 audit | Audit trail for the 3/3 Wave 255 subagent FM-17 gateway failure (E + F + G all returned HTTP 200 empty malformed); recovery path documented |
| `G-codex-recovery-verdict-2026-05-15.md` | Wave 255 codex GPT-5.5 recovery | **v2 amendment** — orchestrator-direct codex recovery covering Wave 255's 3 failed axes + 4 missing categories. **14 source-cited findings** (file:line + HEAD SHA): OpenViking memory-plugin AGPLv3-inheritance / cognee parent-only / Langfuse native MCP OVERTURNS Agent D Py3.14 premise / wshobson per-plugin grades A- to C+ / `buildoak/wet` is NOT firm LLMLingua replacement / `yvgude/lean-ctx` IS strongest candidate / 4 missing categories top-picks. **`WAVE-255-RECOVERY-VERDICT: SATURATION-CONFIRMED`** |
| `GRAND-SYNTHESIS-pure-runtime-2026-05-15.md` | orchestrator | **THE DEFINITIVE SYNTHESIS** — start here; read with G as v2 amendment |

(Wave 252 Agent B `codex-rescue` BRIDGE-MODE failed FM-17.b autocompact-thrash → recovered by Agent D + Wave 254 codex per `fm17-subagent-fleet-depletion.md §FM-17.d`. Wave 255 agents E/F/G all FM-17 gateway-failed → recovered by orchestrator-direct codex `bzn3cnxi2` per the same rule. Cross-model gate satisfied via 2 independent codex passes.)

## Headline finding

**`Z:/claude-sota-pure` is NOT greenfield — it is a W229-maturity GSD framework runtime** (34 agents / 71 skills / 16 MCPs / 26 plugins / 5 cwc hooks; full L0-L11 layer coverage). Three independent sources (Agent D target-probe + codex F-5 incumbent-bias finding + the W200-W253 "n=36 consecutive 0% ADOPT-NOW" diagnostic) **converge on SATURATION**.

**Net-new firm installs: 2** — `comet-ml/opik` + `traceloop/openllmetry` (Apache-2.0, L7 observability GAP-2 closure). All other axes: incumbent-wins / HONEST-NON-FINDING / REJECT.

## How to use

1. Read `GRAND-SYNTHESIS-pure-runtime-2026-05-15.md` — §10 has the actionable install checklist
2. `C-scoring-matrix-146repo-2026-05-15.md` is the comprehensive scored catalog (146 repos × 10 dimensions)
3. §8 of the grand synthesis lists 4 genuine forward-research gaps (model-routing / multi-account fleet / prompt-cache / agent-eval) — candidate Wave 255 scope

## Cross-model gate

SATISFIED — TWO independent codex GPT-5.5 verdicts on file (`bc8c1g1bx` first-pass + `bzn3cnxi2` recovery-pass). The grand synthesis integrates the first 10 codex findings as Pattern A fix-forward (semble/codeburn downgraded INSTALL-NOW→STUDY-PILOT; REJECT roster completed; incumbent-bias reframed; missing categories queued). The second pass (G file) covers Wave 255's depth-extension axes (user-named repos / wshobson source grades / LLMLingua replacement / 4 missing categories) with 14 additional source-cited findings — independently CONFIRMS saturation.

## v2 corrections from Wave 255 codex recovery (G file)

Three deltas vs the original grand synthesis:

1. **Langfuse**: Agent D's "Py3.14 pydantic-v1 blocked" premise was STALE — current SDK 4.6.1 uses pydantic>=2,<3, AND a native Langfuse MCP exists at `/api/public/mcp` (streamableHttp + Basic Auth) that bypasses the SDK entirely. Verdict: **ENABLE/UPDATE MCP-PILOT** (3rd firm action, alongside opik + openllmetry).
2. **OpenViking memory-plugin**: confirmed native CC plugin (`.claude-plugin/plugin.json` exists) BUT AGPLv3 root applies by inheritance (no separate subdir license). REJECT for install, CITE-ONLY.
3. **LLMLingua replacement**: `buildoak/wet` is NOT a firm replacement (young, unauthenticated endpoints). `yvgude/lean-ctx` (Apache-2.0, 1669 stars, B+/A- source grade) IS the strongest LLMLingua replacement candidate — STUDY-PILOT 90d-gated. `claudioemmanuel/squeez` best watchlist alternative.
