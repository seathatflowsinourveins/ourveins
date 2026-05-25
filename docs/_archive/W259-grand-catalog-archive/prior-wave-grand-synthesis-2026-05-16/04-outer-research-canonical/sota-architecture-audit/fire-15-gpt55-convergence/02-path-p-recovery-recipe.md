# 02 — Path P Recovery Recipe (Working Pattern Codified)

> **Purpose**: codify the working Path P codex T1 invocation pattern discovered at
> Fire 15. Recovers cross-model gate even when BRIDGE-MODE codex-rescue subagent fails
> FM-17.f n=4. Future-fire reusable.

## Why this recipe matters

Across the Wave 134 8-fire arc, Path P codex exec attempts had a **mixed reliability record**:

| Fire | Path P attempt | Result | Outcome |
|---|---|---|---|
| Fire 7 | broad install-plan T1 (large prompt) | Pattern B HNF (196-LOC echo) | install gate DEFERRED |
| Fire 14 | broad adversarial review (5-file scope, 200+ LOC prompt) | Pattern B HNF (122-LOC echo) | gate NOT SATISFIED |
| **Fire 15** | **MINIMAL focused single-claim audit (48-LOC prompt)** | ✅ **REAL GPT-5.5 verdict (22,803 tokens)** | gate ✅ SATISFIED |

**Diagnostic finding**: Path P failures correlated with PROMPT SIZE + SCOPE BREADTH, NOT
codex-infrastructure issues. Path P codex CAN produce verdicts when invoked with proper
discipline.

## The working Path P recipe (Fire 15 codified)

### 5 mandatory discipline elements

1. **MINIMAL focused prompt** — ≤50 LOC ideal; ≤100 LOC max. Cut all conversational
   framing; include only:
   - 1-line role declaration
   - Bounded task (single claim OR single file OR single audit dimension)
   - Specific file:line cites for sources
   - Required JSON output schema

2. **Single-claim audit per call** — do NOT sweep 5 files in one consult. Fire ONE
   focused consult per claim/file. Multiple short calls beat one open-ended call.

3. **JSON-at-EOF discipline** — use `VERDICT_JSON_AT_EOF:` marker followed by explicit
   JSON shape. This focuses GPT-5.5's reasoning toward producing terminal verdict.

4. **Foreground tee with stdout visibility** — `codex exec ... < prompt 2>&1 | tee OUT`
   in foreground via `Bash` tool with `timeout: 300000` (300s). Avoids
   `run_in_background: true` which can fall into FM-17.b mid-exec class.

5. **Bash timeout 300s** — gives codex time for xhigh reasoning. Default 60s is too short.

### Working bash incantation

```bash
codex exec --ephemeral -p deep-review --skip-git-repo-check --color never \
  < .claude/state/codex_consult_<topic>.txt 2>&1 \
  | tee .claude/state/codex_consult_<topic>_OUT.txt
```

Invoke via `Bash` tool with `timeout: 300000`. Capture verdict at EOF of OUT file.

### Verdict extraction

```bash
# Pattern: find VERDICT_JSON_AT_EOF: marker + extract following JSON block
grep -A 20 'VERDICT_JSON_AT_EOF:' .claude/state/codex_consult_<topic>_OUT.txt | head -25

# OR for verbose verdict:
tail -100 .claude/state/codex_consult_<topic>_OUT.txt
```

## Empirical evidence (Fire 15)

### Fire 15 codex T1 OUT file metadata

```
session id: 019e13bb-...
workdir: Z:\claude-sota-installed
model: gpt-5.5
provider: openai
approval: never
sandbox: read-only
reasoning effort: xhigh
reasoning summaries: detailed
```

Verdict block at EOF (819-LOC OUT file ending with):
```
VERDICT_JSON_AT_EOF:
{
  "claim_1_probe_7b": { ... clauses with VERIFIED/PARTIAL/FAIL classifications },
  "claim_2_l4_corpus_rag": { ... },
  "overall_verdict": "NEEDS-REVISION",
  "confidence": 0.9
}
tokens used
22,803
```

### Pre-recipe failures (Fire 7 + Fire 14)

- Fire 7 install-plan consult: ~200 LOC prompt sweeping 3 install candidates
- Fire 14 adversarial review consult: ~200 LOC prompt sweeping 5 anatomy files
- Both received Pattern B HNF zero-investigation (codex started, didn't produce verdict)

### Cause inference

Pattern B HNF in broad-scope prompts likely caused by:
- codex xhigh reasoning needs FOCUSED scope to produce coherent verdict
- Broad multi-target prompts exhaust budget before terminal verdict
- Background dispatch (`run_in_background: true`) may also amplify the issue (no live
  stdout feedback, codex exits without flushing verdict)

## Sister-rule integration

Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern B mitigation
patterns (gstack-derived; n=8 codification)`:

- Pattern B mitigation pattern #3 "Adversarial framing pattern" complements this recipe
- gstack `turn.completed` event-count completeness check is a CONSUMER-side check; this
  recipe is a PRODUCER-side discipline (prompt construction)
- Together they form a robust Path P recovery workflow

## When to use this recipe

- **W134-F15+ codex T1 verifications** (forward fires queued in Fire 14)
- **Any Path P consult after BRIDGE-MODE subagent FM-17.f failure**
- **Cross-model T1/T2/T3 verifications** per `cross-model-consensus.md §T1-T7 lifecycle`
- **Adversarial single-claim verification** (vs broad audits)

## When NOT to use this recipe

- **Multi-file broad audits**: split into N single-file consults, each ≤50 LOC prompt
- **Implementation-class tasks**: codex exec foreground is read-only; design implementations
  belong in different tools (Edit, Write, BRIDGE-MODE subagent if available)
- **Streaming long-running analysis**: use `--json` streaming flag instead (per gstack pattern)

## Forward fire candidate

**W134-F16-path-p-skill-promotion**: codify this recipe as reusable eee skill at
`Z:/claude-sota-installed/.claude/skills/path-p-codex-t1-invoker/SKILL.md` for future
operator discoverability. Sister to the gstack pattern-extract from
`codex-t1-fix-forward-pattern.md §Pattern-B mitigation patterns`.

## Mia ladder advance

n=1228 → n=1232 (+4: 5 recipe discipline elements codified / Fire 7/14/15 comparison
table / empirical evidence captured / forward-fire candidate queued)
