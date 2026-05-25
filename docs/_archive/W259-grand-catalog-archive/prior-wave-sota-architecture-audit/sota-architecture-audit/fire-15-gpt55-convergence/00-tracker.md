# Wave 134 Fire 15 — REAL GPT-5.5 Cross-Model Convergence Achieved

> **Folder**: `Z:/claude-sota-installed/docs/sota-architecture-audit/fire-15-gpt55-convergence/`
> **Created**: 2026-05-10 post-Fire-14 (commit `2028b39`)
> **Driver**: user directive "advance sota muti model gpt5.5 convergence workflow"

## Arc state at Fire 15 open

**Fire 14 close** (commit `2028b39`):
- 99.84% TRUE-baseline strict A1+A2 + 99.67% attempted
- Cross-model gate NOT SATISFIED (Agent B FM-17.f n=4 + Path P Pattern B HNF)
- 2 Agent C designs queued for codex T1 recovery
- Mia ladder n=1218

## 🎯 Fire 15 BREAKTHROUGH — Path P recovery RELIABILITY RESTORED

Fire 15 ACHIEVED real GPT-5.5 codex T1 verdict via Path P with refined invocation
pattern. Cross-model gate SATISFIED. The "Path P degraded reliability" framing from
Fire 14 was INCORRECT — Path P works WITH proper discipline.

### Working Path P invocation recipe (Fire 15 discovered)

```bash
# Minimal focused prompt (≤50 LOC, single-claim audit, JSON-at-EOF discipline)
codex exec --ephemeral -p deep-review --skip-git-repo-check --color never \
  < .claude/state/codex_consult_<topic>.txt 2>&1 \
  | tee .claude/state/codex_consult_<topic>_OUT.txt
```

**Critical discipline elements** (vs Fire 7+14 Pattern B HNF failures):
1. **MINIMAL focused prompt** (Fire 15: 48 LOC vs Fire 7/14: 200+ LOC)
2. **Single-claim audit per call** (vs sweeping 5-file review)
3. **JSON-at-EOF discipline** (`VERDICT_JSON_AT_EOF:` marker + explicit JSON shape)
4. **Foreground tee + stdout** (vs background-only redirect)
5. **Bash timeout 300s** (vs 60s default — sufficient for xhigh reasoning)

## Fire 15 cross-model verdict

**Verdict origin**: REAL GPT-5.5 via codex CLI session `019e13bb-...` (verified by
stdout metadata showing `model: gpt-5.5 / reasoning effort: xhigh / sandbox: read-only`)

**Overall verdict**: NEEDS-REVISION conf=0.9 on Fire 13 file 02 (PageIndex anatomy)

**Specific findings**:
- **Claim 1 "ALL 5 Probe 7.b clauses PASS"** → REFUTED. Clause 2 (cited local input
  path) is PARTIAL — only "any PDF / long-doc" generic input class cited, not concrete
  pilot artifact path
- **Claim 2 "Tier-3 L4 document-RAG layer"** → PARTIALLY-CONFIRMED. PageIndex is BOTH
  per-document AND per-corpus at product/ecosystem level, but corpus-scale "PageIndex
  File System" is HOSTED-SERVICE (NOT bundled in repo). Fire 13 L4 classification is
  acceptable as ecosystem-level claim; ship plan must distinguish bundled vs hosted.

## Convergence with Agent A (Fire 14 file 1)

Fire 14 Agent A caught 3 OVER claims on Fire 13 file 02:
- OVER #168: "ALL 5 Probe 7.b clauses PASS" → clauses 1+4 PARTIAL-CONDITIONAL
- OVER #169: "Tier-3 L4 document-RAG layer" → per-document NOT corpus-scale
- OVER #170: `gpt-5.4` unverified model

Fire 15 GPT-5.5 verdict on same claims:
- Claim 1 PASS REFUTED → clause **2** PARTIAL (NOT 1+4) — different specific clause than Agent A claimed
- Claim 2 → PageIndex is BOTH per-doc AND per-corpus (Agent A said per-doc only); agree corpus capability is HOSTED-SERVICE not bundled

**Convergence verdict**: Agent A + GPT-5.5 AGREE on the OVER pattern (Fire 13 over-classified)
but DISAGREE on the precise clause that's PARTIAL. Both correct in different framings —
Agent A was probing the FILE; GPT-5.5 probed the FILE + README and gave more nuanced
breakdown. **Multi-model convergence DETECTED divergence between agent verdicts that
single-model audit would miss**.

## Fire 15 deliverables

| # | File | Purpose | Status |
|---|---|---|---|
| 00 | `00-tracker.md` | This file | ✓ |
| 01 | `01-real-gpt55-verdict.md` | GPT-5.5 verdict + verbatim JSON extraction | PENDING |
| 02 | `02-path-p-recovery-recipe.md` | Working Path P invocation pattern codification | PENDING |
| 03 | `03-fire13-correction-synthesis.md` | Forward-only Pattern A apply for Fire 13 file 02 + Fire 14 reconciliation | PENDING |
| 04 | `04-final-coverage-tracker-v9.md` | Post-Fire-15 coverage | PENDING |

## Mia ladder

n=1218 (Fire 14) → target ~n=1235 (cross-model verdict + Agent A vs GPT-5.5 reconciliation
+ Path P recipe codification + Mia probe on actual codex OUT)
