# Codex GPT-5.5 round-1 adversarial review — prompt template (W349)

> Per goal-prompt-synthesis §6.2 (W295-codex-r17 anti-false-control mandate): MUST use `codex-companion.mjs task --effort high` with the ranking EMBEDDED in the prompt. MUST NOT route through `adversarial-review --scope working-tree` (gitignored false-control).

## PowerShell variant (canonical — runtime is Windows PowerShell-first)

Will be authored post-synthesis. Template body:

```
You are performing a cross-model adversarial review of a proposed /goal priority ranking for the W349-FULL-SOTA-UNLEASH wave authored by Claude Opus 4.7 (orchestrator). Apply the W295 anti-bias gates (sca-v17 Phase 5 5-gate validation) and return your verdict.

CRITERIA (all must hold):
- ≥6 EXTERNAL source families consulted (NOT including this runtime's prior W286-W348 docs as primary anchors).
- ≥1 challenger candidate present (a candidate whose adoption would CHALLENGE current architecture).
- All cites are external + verifiable + dated.
- Inverse test (Δ-G51 INDEPENDENCE-PROOF triple): the ranking would hold under a DIFFERENT current architecture. ORG-distinct + CAUSAL-distinct + TEMPORAL-distinct independence anchors.
- Harness-fit: each candidate is Claude-Code-runtime-compatible OR explicitly flagged PATTERN-STUDY-only.
- No architecture-self-reference (criteria sourced from external SOTA convergence, not this runtime's current shape).
- sca-v17 dim coverage ≥80% (D-EMP, D34, D38-D80 enumeration).
- Pareto-frontier MCDA applied (Δ-G50 urgency × effort × harness-fit × blast-radius).

RANKING TO REVIEW:
<<< inline-paste the W349 ranking from SYNTHESIS.md §3 + §4 + §7 here >>>

OUTPUT FORMAT (REQUIRED — orchestrator parses first non-empty line):
- VERDICT: APPROVE
- VERDICT: REVISE
- VERDICT: BLOCK

After verdict line, ≤300-word justification citing which CRITERIA you applied.
```

## Codex companion resolution

Per goal-prompt-synthesis §6.2 W295-codex-r23 HIGH closure: resolve `codex-companion.mjs` via two-path discipline:
1. `$env:CLAUDE_PLUGIN_ROOT` direct → `${ROOT}/scripts/codex-companion.mjs`
2. Cache fallback → `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/<latest-version>/scripts/codex-companion.mjs`

Currently `.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs` is the resolved path (per settings.json:155 hook reference).

## Verdict parsing

Per W295-codex-r25 HIGH closure: REQUIRE marker on FIRST non-empty line (not -Raw single-string mode); count line-by-line via `Select-String -Pattern '^\s*VERDICT:\s*(APPROVE|REVISE|BLOCK)\s*$'`. Multiple markers = ambiguous = fail-CLOSED.

## Smoke-test pattern

```powershell
$sample = "VERDICT: APPROVE`nfollowed by some text`nVERDICT: BLOCK"
($sample -split "`n" | Select-String -Pattern '^\s*VERDICT:\s*(APPROVE|REVISE|BLOCK)\s*$').Count  # MUST return 2
```
