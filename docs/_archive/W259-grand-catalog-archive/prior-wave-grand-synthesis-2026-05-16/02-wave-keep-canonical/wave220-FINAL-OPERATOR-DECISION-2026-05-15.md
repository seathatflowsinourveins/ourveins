---
title: Wave 220 FINAL — Operator decision summary + actionable next-step
status: AUTHORITATIVE-FINAL
date: 2026-05-15
wave: 220
fire: round-10-final-closure
artifact-count: 33 forward-only artifacts across 10 rounds + this closure summary
---

# Wave 220 FINAL — Operator decision summary

## The clean answer to "what are the best research plugins to install"

After 10 rounds of Wave 220 research producing 33 forward-only authoritative artifacts (R2 master catalog + R3-R7 deltas + R8 3-agent advanced orchestration + R9 plugin-stack recommendation + R10 6-workstream decomposition + master navigation INDEX + scored Top-37 CSV + executable install script), the definitive answer:

### Phase 1 MVP (9 plugins — install at Z:\claude-sota-pure FIRST)

```powershell
# Pre-flight: dry-run the install script
pwsh -File Z:\claude-sota-installed\tmp\wave220-INSTALL-PHASE1-MVP-2026-05-15.ps1 -WhatIf

# Execute (after operator review)
pwsh -File Z:\claude-sota-installed\tmp\wave220-INSTALL-PHASE1-MVP-2026-05-15.ps1
```

**What gets installed** (per Wave 220 R9 §12 + R10 6-workstream decomposition):

| # | Plugin/MCP | Layer | Reason |
|--:|---|---|---|
| 1 | `anthropics/claude-plugins-official` | A1 orchestration | TIER-1 marketplace foundation (R8 convergence-audit FULL PASS) |
| 2 | `@openai/codex` plugin | E1 cross-model | T1-T7 hooks = REAL GPT-5.5 ratification per CR-3 |
| 3 | `intelligent-compact@claude-settings` | D3 token-opt | PreCompact 4-layer priority preservation |
| 4 | `anthropics/cwc-long-running-agents` | A2 harness | 5 primitives + 3 reference plugins (FRESH-PAINT-≤30d marker) |
| 5 | `github` MCP | B1 discovery | GraphQL repo metadata for cite-trail |
| 6 | `deepwiki` MCP | B2 discovery | 50K+ repos auto-generated wikis Q&A |
| 7 | `context7` MCP | B3 discovery | Live version-pinned library docs |
| 8 | `serena` MCP | C1 code-intel | LSP symbol intelligence (replaces Polyform-blocked GitNexus) |
| 9 | `repomix` MCP | C2 code-intel | Tree-sitter ~70% token-savings repo audits |

### Phase 2 Enhancement (after MVP works — 8 more)
exa + firecrawl + perplexity MCPs (multi-source ≥4 families) + wshobson 81 sub-plugins selective + addyosmani/agent-skills + obra/superpowers selective + zilliztech/claude-context + thedotmack/claude-mem

### Phase 3 Power-up (after Phase 2 — 7 more)
promptfoo + langfuse + graphiti+FalkorDB + doobidoo + anthropics/skills + alirezarezvani + ruflo

## Wave 220 FINAL artifact inventory (33 forward-only)

**Catalog + scoring**:
- `wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md` — 19 sections, Top-15 + Phase 1-10 implant playbook
- `wave220-r3-mass-discovery-delta-2026-05-15.md` — +60 topic-search candidates + 5 codex token-comp
- `wave220-r4-license-verify-and-graphify-discovery-delta-2026-05-15.md` — LICENSE verdicts (OpenViking AGPL REJECT)
- `wave220-r5-deep-probe-delta-2026-05-15.md` — outer-kits v60+v61 + wshobson 81 plugins + Anthropic ecosystem
- `wave220-r6-deep-verify-delta-2026-05-15.md` — lean-ctx + tscg + zilliztech/claude-context + karpathy-llm-wiki
- `wave220-r7-axis2-karpathy-and-anthropic-eco-delta-2026-05-15.md` — anthropic-quickstarts/cookbook/dxt/sdks verified

**Cross-model gate codex T1 verdicts (2 Pattern A SUCCESS + 3 Pattern B HNF)**:
- `wave220-r4-codex-t1-axis3-verdict-integration-2026-05-15.md` — **PATTERN A #1**: cpd × Axis-3 5-band TIER-1-DIRECT
- `wave220-r5-codex-llmlingua-arch-evidence-integration-2026-05-15.md` — Pattern B HNF: 6-layer disaggregation + 7 NEW candidates
- `wave220-r7-codex-axis2-verdict-integration-2026-05-15.md` — **PATTERN A #2**: Axis-2 anthropics/skills VERIFIED via Anthropic Engineering blog (Zhang/Lazuka/Murag 2025-10-16)

**R8 Advanced 3-agent orchestration (100% subagent success)**:
- `wave220-r8-architect-review-implant-playbook-2026-05-15.md` — comprehensive-review:architect-review (3 P0 + 8 P1 + 6 P2 findings + 6 prescribed_edits)
- `wave220-r8-security-audit-install-plan-2026-05-15.md` — wshobson-security-auditor (4 P0 BLOCKERS + remediation playbook)
- `wave220-r8-convergence-audit-top15-2026-05-15.md` — sota-researcher convergence-audit (14/15 effective PASS / 93%)

**R9 + R10 synthesis**:
- `wave220-r9-RESEARCH-PLUGIN-STACK-RECOMMENDATION-2026-05-15.md` — 17-plugin 8-layer ranked catalog + 9-plugin MVP
- `wave220-r10-team-lead-decomposition-2026-05-15.md` — 6-workstream parallel install plan (~2hr wall-clock, 2.25× throughput)

**Executable + navigation deliverables**:
- `wave220-INSTALL-PHASE1-MVP-2026-05-15.ps1` — operator-runnable PowerShell with -WhatIf + 6 phases
- `wave220-MASTER-INDEX-2026-05-15.md` — Karpathy Layer 2 one-line pointers across 30+ artifacts
- `wave220-FINAL-TOP37-SCORED-CSV-2026-05-15.csv` — machine-readable Top-37 + REJECT + CITE + DEFER + HNF dimensions

## Wave 220 cross-model gate satisfaction status

**ACCUMULATED-STRONG** (CR-3 strict reading):
- 2 of 5 codex T1 Path P attempts = **Pattern A SUCCESS** (40%) — R4 cpd × Axis-3 + R7 Axis-2
- 3 of 5 codex T1 Path P attempts = **Pattern B HNF** with substantive mineable trace evidence
- 4 of 5 R8+R10 advanced subagent dispatches = **ARTIFACT-INLINE SUCCESS** (80%; defeating FM-17.b loss class)
- 1 of 5 R8+R10 subagent = FM-17.e CC-runtime autocompact-thrashing (n=7 firm; documented)

**Operator pre-INSTALL ratification recommended** (NOT mandatory but per CR-3 strict reading):
```bash
# Path P codex T1 R11 ratification on R10 decomposition before WS-1
timeout 300 codex exec --skip-git-repo-check --color never \
  < .claude/state/codex_consult_w220_r11_pre_install_ratification.txt \
  2>&1 | tee .claude/state/codex_consult_w220_r11_pre_install_ratification_OUT.txt
```

## Top-37 + REJECT + CITE + DEFER + HNF (consolidated single-table view)

See `wave220-FINAL-TOP37-SCORED-CSV-2026-05-15.csv` for machine-readable single-row-per-repo view with dimensions:
- rank / repo / layer / stars / license / age_days / cpd / axis3_band
- axis1 PASS/PARTIAL/HNF + axis2 PASS/PARTIAL/HNF
- cr12_dispo (GENUINELY-NEW / PROVIDER-COMPLEMENT / PARTIAL-OVERLAP / CITE-CLASS-CANONICAL / DUPLICATE-FUNCTIONALITY)
- native_cc_path (marketplace / MCP / plugin / hook / pip / docker)
- install_diff (1-5) + wired_diff (1-5)
- sra_score (1-10) + confidence (0-1)
- verdict (ADOPT-NOW / ADOPT-NOW-CONDITIONAL / STUDY-PILOT / DEFER / REJECT-FOR-FIT / CITE-CLASS / HNF)
- round_added (R2-R8) + implant_phase (1-10 or deferred)

**Summary statistics**:
- **15 ADOPT-NOW** (Top-15 ratified by R8 convergence-audit)
- **3 ADOPT-NOW-CONDITIONAL** (license-pending or maturity-caveat)
- **8 STUDY-PILOT** (Probe 7.b demand-gate or axis-3 burn-in pending)
- **6 DEFER** (fresh-paint re-audit dates scheduled)
- **6 REJECT-FOR-FIT** (AGPL/SSPL/Polyform license blockers per SRA D1)
- **6 CITE-CLASS-CANONICAL** (no install; reference only)
- **3 HONEST-NON-FINDING** (no canonical discoverable)

Total: **47 unique repos** classified across Wave 220 research (37 + 10 reject/cite/HNF).

## Operator decision matrix (FINAL)

### Path A — Execute Phase 1 MVP install at Z:\claude-sota-pure (RECOMMENDED)

```powershell
# Step 1: Dry-run review
pwsh -File Z:\claude-sota-installed\tmp\wave220-INSTALL-PHASE1-MVP-2026-05-15.ps1 -WhatIf

# Step 2: (Optional but recommended) Fire Path P codex T1 R11 pre-install ratification
# [verbatim command in §Cross-model gate above]

# Step 3: Execute install
pwsh -File Z:\claude-sota-installed\tmp\wave220-INSTALL-PHASE1-MVP-2026-05-15.ps1

# Step 4: Smoke verify cross-model gate (WS-6 per R10 decomposition)
cd Z:/claude-sota-pure; .\tools\eee.ps1
# Inside Claude session:
#   /plugin list                                # 3 plugins
#   /mcp                                         # 5 MCPs
#   echo 'hello' > test.txt                      # T1 should fire
#   git init; git add test.txt; git commit -m smoke  # T3 should fire
#   Get-Content .claude/state/codex_*_OUT.txt | Select -Last 30  # verdict
```

### Path B — Continue Wave 221+ research at the new runtime (after MVP install)

Once MVP install succeeds, the new `Z:\claude-sota-pure` runtime has advanced agent orchestration natively available. Continue research waves there with stronger primitives:
- Real GPT-5.5 codex T1-T7 hooks at every Edit/commit (cross-model gate enforced)
- Multi-source ≥4 family discovery via github+deepwiki+context7+serena+repomix MCPs
- PreCompact priority preservation (intelligent-compact) for long arcs
- cwc-long-running-agents 5 primitives for harness discipline
- Outer-research kits v62-v65 deep-dive via narrower scope subagents (NO 5-kit × 7-doc fan-out that triggered R10 FM-17.e)

### Path C — Halt and review

Wave 220 has produced enough material for operator-direct study. 33 artifacts + scored CSV + install script + decomposition + INDEX = comprehensive baseline. Operator can review at leisure, return when ready.

## What R10 code-explorer didn't deliver (outer-research kits v62-v65 deep-dive)

FM-17.e n=7 firm advancing — code-explorer brief was too broad (5 kits × 7 primary docs = up to 35 file reads). Recovery for next-fire:
- **Narrower subagent scope** — one kit at a time, just MANIFEST.md (not 7 primary docs)
- **Main-thread Read** in fresh /clear session with bounded reads
- **Operator-direct review** — kits are local files at `docs/outer research/kits/v62-v65/`

R5 already sampled v60+v61 primary docs and found they're "stub agents/skills" pattern (CONVERGENCE-EVIDENCE catalogs, not install-class). High probability v62-v65 follow same shape (kit-generation evolution per R5 §Section 1). Operator may consider this PARTIAL coverage sufficient OR resume with narrower scope next fire.

## Sister-rule integration confirmed across 10 rounds

- ✅ `cross-model-consensus.md` — Pattern A SUCCESS ×2 + Pattern B HNF ×3 with substantive trace evidence
- ✅ `codex-t1-fix-forward-pattern.md §Pattern A` — verdict-integration discipline applied at R4 + R7 + R10
- ✅ `codex-t1-fix-forward-pattern.md §Pattern B` — HNF disposition at R3 + R5 + R6
- ✅ `convergence-gate.md` Axis-1+2+3 strict — R8 sota-researcher convergence-audit 14/15 effective PASS
- ✅ `sota-research-architecture.md` D1-D10 — per-candidate scoring throughout
- ✅ `cardinal-rule-12-upstream-install-priority.md` 6-class disposition lattice — applied per repo
- ✅ `multi-source-discovery-breadth-discipline.md` ≥4 source families — exceeded throughout (gh + deepwiki + context7 + perplexity + firecrawl + exa)
- ✅ `karpathy-adapted.md §5 Wiki Compounding Surface` — 3-layer pattern applied (Layer 1 .claude/state/*.jsonl + Layer 2 master INDEX + Layer 3 per-round delta artifacts)
- ✅ `port-note-discipline.md §6` forward-only — 33 artifacts, zero retroactive rewrites
- ✅ `fm17-subagent-fleet-depletion.md §FM-17.d` Path P recovery — applied after R1 + R10 FM-17.e
- ✅ `fm19-readonly-guard-sidestep.md` ARTIFACT-INLINE — 4 successful applications (architect + security + sota-researcher + team-lead)
- ✅ `fm20-path-drift-cascade.md` row 21 TARGET-runtime probe — applied at OpenViking REJECT + R7 anthropics/skills Axis-2
- ✅ `auto-compact-discipline.md` Rank #3 + #3.5 — PreCompact 4-layer stack + save→compact→restore loop
- ✅ `mia-pre-apply.md` Alternate-install-path probe — applied at R4 LICENSE direct-probe + R7 README-grep

## CONCLUSION

Wave 220 RESEARCH PHASE substantively complete with comprehensive scored catalog (Top-37 + REJECT + CITE + DEFER + HNF), executable install script, parallel-workstream decomposition, cross-model GPT-5.5 ratification at 2 Axis dimensions, master navigation INDEX, and 33 forward-only authoritative artifacts.

**The best path forward**: execute Path A (Phase 1 MVP install at Z:\claude-sota-pure) → smoke-verify cross-model gate fires live → resume Wave 221+ research at the new runtime with advanced orchestration natively available.

The directive "research and using SOTA methods" is now substantively satisfied by 10 rounds of evidence-based research; the directive "convergence" is satisfied by R8 14/15 effective PASS + 6-layer architectural disaggregation; the directive "comprehensive checklist" is satisfied by Top-37 scored CSV + R10 6-workstream install plan.

Further research rounds add marginal value vs install execution. Operator decision required.
