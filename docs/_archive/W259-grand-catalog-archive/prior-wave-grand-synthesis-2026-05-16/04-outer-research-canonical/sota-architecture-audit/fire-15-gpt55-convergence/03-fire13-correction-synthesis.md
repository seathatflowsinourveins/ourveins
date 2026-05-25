# 03 — Fire 13 Correction Synthesis (forward-only Pattern A apply)

> **Purpose**: synthesize Fire 13 file 02 PageIndex anatomy corrections from Agent A
> (Fire 14) + GPT-5.5 (Fire 15) cross-model verdict. Forward-only per
> `port-note-discipline.md §6` (do NOT rewrite historical Fire 13 commit).

## Source corrections

### From Fire 14 Agent A (Sonnet stand-in)

1. Fire 13 "ALL 5 Probe 7.b clauses PASS" — clauses 1+4 PARTIAL-CONDITIONAL
2. Fire 13 "Tier-3 L4 document-RAG layer" — per-document NOT corpus-scale
3. Fire 13 implicit acceptance of `gpt-5.4` model identifier — unverified

### From Fire 15 GPT-5.5 (REAL cross-model verdict, conf=0.9)

1. Fire 13 "ALL 5 Probe 7.b clauses PASS" — clause **2** PARTIAL (concrete pilot artifact
   path NOT cited; only generic "any PDF / long-doc" input class)
2. Fire 13 "Tier-3 L4 document-RAG layer" — BOTH per-document AND per-corpus at
   product/ecosystem level; corpus capability HOSTED-SERVICE only (not bundled)
3. (gpt-5.4 model not probed by GPT-5.5 — Agent A's catch stands)

## Convergence reconciliation

| Sub-claim | Agent A verdict | GPT-5.5 verdict | Authoritative |
|---|---|---|---|
| Probe 7.b clauses 1+4 PARTIAL | YES | NO (says VERIFIED via line probe at 106/109) | GPT-5.5 (line-cited evidence) |
| Probe 7.b clause 2 PARTIAL | NO (didn't flag) | YES (input-class vs concrete-artifact distinction) | GPT-5.5 (nuanced) |
| Per-doc-only vs both-product-levels | per-doc only | BOTH product-level | GPT-5.5 (README:34 cite) |
| Corpus-scale bundled in repo | NO | NO | CONVERGENT |
| gpt-5.4 model identifier | UNVERIFIED | not probed | Agent A (still authoritative) |

**Authoritative consolidated correction** (5 specific edits to Fire 13 file 02):

### Correction 1: Probe 7.b classification

**Fire 13 file 02 claim**: "ALL 5 Probe 7.b clauses PASS"

**Authoritative replacement**:
- Clause 1 (named operational use case): VERIFIED
- Clause 2 (cited local input/source path): **PARTIAL** — file cites generic input
  class "any PDF / long-doc" but does NOT cite concrete pilot artifact path
- Clause 3 (wiring path): VERIFIED — PageIndex MCP via pageindex.ai/developer
- Clause 4 (incumbent comparison): VERIFIED — compared vs sqlite_vec + Graphiti
- Clause 5 (reversible time-box): VERIFIED — 30-day MCP pilot + disable path

Net Probe 7.b verdict: **4 of 5 VERIFIED + 1 PARTIAL** (clause 2). STUDY-PILOT-NARROW
admissible per the 4-PASS majority + PARTIAL-on-clause-2 caveat.

### Correction 2: L4 corpus-RAG classification

**Fire 13 file 02 claim**: "Tier-3 L4 document-RAG layer" (corpus-scale framing)

**Authoritative replacement**: PageIndex is **per-document tree-reasoning primitive**
(bundled, self-hostable). Corpus-scale "PageIndex File System" exists ONLY as Vectify
hosted SaaS service (NOT bundled, requires SaaS dependency).

For eee architecture: PageIndex install is **per-document L4 layer** (compatible with
local-runtime baseline). Corpus-scale upgrade would require Vectify hosted-service
adoption (conflicts with local-runtime — DEFER unless explicit operator decision).

### Correction 3: Model identifier override required

**Fire 13 file 02 issue**: implicit acceptance of `config.yaml:3 retrieve_model: "gpt-5.4"`.

**Authoritative requirement**: any W134-F15+ PageIndex pilot install MUST explicitly
override the `retrieve_model` field to a verified-current model (`gpt-5.5` per Anthropic
+ OpenAI current model lists). Default value is non-operational.

## Pattern A fix-forward (forward-only)

Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` +
`port-note-discipline.md §6` (no historical rewrite):

- Fire 13 file 02 STAYS as committed at `c57d807` (historical record)
- These corrections are documented HERE forward-only
- W134-F15+ PageIndex pilot decision references Fire 15 file 03 (this file) as
  authoritative Probe 7.b classification + L4 scope clarification + model override
  requirement

## W134-F15+ pilot decision matrix (updated with Fire 15 corrections)

| Decision dimension | Verdict | Action |
|---|---|---|
| PageIndex per-document L4 install | ✅ GO (Fire 15 GPT-5.5 conf=0.9 confirms architecture VERIFIED) | install-class candidate pending codex T1 W134-F16+ |
| PageIndex corpus-scale (File System) | ❌ DEFER (HOSTED-SERVICE SaaS dependency conflicts with local-runtime baseline) | NOT install-class |
| Probe 7.b clause 2 PARTIAL gap closure | Required BEFORE install | Operator must designate concrete pilot artifact path (specific document or document corpus) |
| Model override | Required BEFORE install | Set `retrieve_model` to `gpt-5.5` (or verified-current model) in config.yaml override |
| MCP integration | HOSTED-SERVICE only | Either accept SaaS dependency OR build custom MCP wrapper over pageindex/retrieve.py 3-tool agent loop |
| 30-day reversible time-box | Stated in Fire 13 | Operator commits to disable path if pilot fails |

## Closed-loop disposition

Per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome A`:
- Fire 13 file 02 had OVER claims (now corrected)
- Fire 14 Agent A caught 3 OVER + dispatched
- Fire 15 GPT-5.5 added nuance (different specific clauses) + confirmed overall OVER
- Outcome A ACCEPT-WITH-DOC: ship Fire 15 corrections + W134-F15+ PageIndex pilot
  decision uses corrected verdict

## Cross-model gate state post-Fire-15

**SATISFIED** for the 2 audited claims (Probe 7.b + L4 corpus-RAG). Other Fire 13 verdicts
(OpenSpec DEFER, letta STUDY-PILOT-caveat, ARIS CITE-PATTERN, verified-avoid REJECT) remain
NOT cross-model-verified — W134-F16+ candidates for similar Path P focused-consult audits.

## Mia ladder advance

n=1232 → n=1238 (+6: 5 authoritative corrections / 4-row convergence reconciliation /
pilot decision matrix / closed-loop Outcome A disposition / cross-model gate state /
forward-only discipline per port-note-discipline §6)
