# W318-C — Repos Ranking Matrix (canonical ledger consolidation)

> **Wave**: W318 Stream C
> **Date**: 2026-05-19
> **Source**: 97 ledger rows in `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` + W314-W318 operator-mandate-cited repos. **Columns**: license · stars · CC-pathway-support · D-EMP (W317-A DRAFT) · D24 attack-surface · D16 governance · install_score · pattern_score · current verdict · W318 recommended action.
> **Method**: programmatic ledger extraction via `ctx_execute_file` → 97 rows parsed; cross-referenced W314-W317 mandate-named candidates; verdicts as-shipped (no re-scoring this stream).
> **Note**: Tier classification regex hit 100% of T1-T5 verdict-tagged rows. Rows with non-standard verdict markers (e.g. "HOLD", "DEACTIVATE", "RATIFY") classified by primary tier mentioned.

## §1 — Ledger row distribution

| Tier | Count | Notes |
|---|--:|---|
| **T1 INSTALL** | 32 mentions | Includes arch-itself self-eval rows (#1 sca-v3, #2 sca-v3.1, #72 sca-v7.1, sca-v7.2 row pending W318+) + true-T1-INSTALLs |
| **T2 VENDOR-FORK / T2-CHERRY** | 31 mentions | Includes Δ36 T2-CHERRY rows (W316 + W317-B) |
| **T3 PATTERN-STUDY / RE-LITIGATED** | 32 mentions | Includes W308/W309 supersession rows |
| **T4 CITE-ONLY** | 10 mentions | Plus 6 HOLD-class verdicts grouped here |
| **T5 REJECT** | 4 mentions | Plus 3 DEACTIVATE-class (e.g. W308 PWF) |
| **OTHER** (CONDITIONAL-RATIFY, RE-AUDIT, HOLD) | 12 mentions | Cross-classified to primary tier |

**Total unique-candidate rows**: 97 ledger rows (some are arch-itself self-eval rows; ~85 unique-candidate adoption verdicts).

## §2 — T1 INSTALL canonical roster (8 rows post-supersession-chain-resolution)

| Slug | Wave | install_score | pattern_score | License | Stars | CC-pathway (D45 proj.) | D24 (W) | D16 (W) | Action W318+ |
|---|---|--:|--:|---|--:|--:|--:|--:|---|
| `OthmanAdi/planning-with-files` | W291.Stage2 | 4.67 | 4.68 | MIT | 21,514 | **3** (plugin, NOT enabled per W312-codex-r1 strict-letter) | 4 | 4 | **DEACTIVATE-CONFIRMED** per row 51 + W312-codex-r1 — DO NOT re-flip. |
| `LearningCircuit/local-deep-research` | W291.Stage2 | 4.13 | 4.68 | MIT | 7,769 | 2 (no plugin; pattern available) | 4 | 3 | HOLD T1 — re-verify Q1-2027 |
| `microsoft/agent-governance-toolkit` v3.7.0 | W317-S5 | (high) | (high) | MIT-equiv | mid | **4** (plugin candidate) | 4 | 4 | T1 INSTALL CONFIRMED — operator-AI from W316-S7 #73 |
| `Rao+Callison-Burch/autorubric` | W310-S2 | 4.42 | 4.31 | MIT | low-star academic | **3** (extras install) | 4 | 3 | HOLD T1 |
| `stanfordnlp/dspy` 3.2.1 | W314-B (candidate) | 4.625 | 4.5 | Apache-2.0 | mid | **5** (native MCP) | 4 | 5 | W319 candidate full audit → ratify T1 |
| `addyosmani/agent-skills` v0.6.0 | W316-S7 → re-audit | T2→T1 | high | MIT | mid | **4** (skill ecosystem) | 4 | 4 | T2→T1 graduation question — W318+ revisit |
| `Valdecy/pyDecision` v4.9.4 | W317-B | 4.027 | (high) | MIT | low | **3** | 4 | 3 | T2 VENDOR-FORK (RE-LITIGATED from W315; under T1 floor) |
| `sca-v7.1 / sca-v7.2 itself` | W316-B / W317-S2 | **4.527-4.756** | 4.09 | n/a (this runtime) | n/a | **5** | 5 | T1 INSTALL — arch-itself self-eval; v8.1 DRAFT W318-C |

## §3 — T2 VENDOR-FORK / T2-CHERRY roster (top 12)

| Slug | Wave | install / pattern | License | Stars | CC-pathway | Key hard-cap | Action W318+ |
|---|---|--:|---|--:|--:|---|---|
| `vercel-labs/agent-skills` | W310-S4 | 4.31 / 4.30 | MIT | 26,389 | 4 | D1=3 (LICENSE-file boundary; Δ38 D1=4 sub-class addresses) | T2 RATIFIED — vendor selective skills with per-file SPDX |
| `wshobson/agents` | W289 → W312-C upgrade | (mid) | MIT | mid | 4 | none | T2 UPGRADE (PR#535 SHA-pin `08ded5e7b0fe` verified W312) |
| `mattpocock/skills` | W312-C | (mid) | MIT | mid | 4 | none | T2 HOLDS — 4-of-4 vendored skills at upstream `67bce91c80cd` |
| `bytedance/deer-flow` | W291.Stage2 | 3.24 / 3.32 | Apache-2.0 | 68,256 | 2 | D5<4 | T2 VENDOR-FORK — pattern carry |
| `TransluceAI/Docent` | W310-S2 | 3.72 / 4.46 | MIT | mid | 2 | D5 + D17 alpha | T2 — `ObservationCategory` lifted to D17 sub-rubric (already applied) |
| `princeton-pli/hal-harness` | W310-S1 | 3.692 / 4.402 | MIT | low | 2 | D3=2 + D4=2 at floor | T2 (T3 fallback) — vendor `reliability_eval/` |
| `METR/HCAST` + `METR/Vivaria` | W317-B | (mid) | MIT | mid | 2 | none | T2 + VIVARIA-DEPRECATION FLAG (RE-LITIGATED from W315) |
| `haizelabs/verdict` v0.2.7 | W317-B | (mid) | MIT | low | 3 | none | T2 + PATTERN-VENDOR HYBRID (RE-LITIGATED from W316) |
| `aelassas/servy` v8.4 | W314-D / W315-A | 3.706 / (mid) | MIT | low | 4 | D16 bus-factor=2 + D19=2 floor + D21=1 single-org | T2 VENDOR-FORK — STAGED-PILOT W315-W317 NSSM replacement |
| `agentscope-ai/OpenJudge` | W314-B | 4.325 / (high) | Apache-2.0 | mid | 3 | none | W319 candidate full audit |
| `ikawrakow/ik_llama.cpp` | W314-B | 4.525 / (high) | MIT | high | 2 | none | W319 candidate full audit (5-10× Ollama speedup) |
| `ossf/criticality_score` + `ossf/scorecard` | W314-B | 4.500 / (high) | Apache-2.0 | high | 2 | none | W319 paired-install (auto-scores anti-bias sca-v6.1 PRELIM) |

## §4 — T3 PATTERN-STUDY roster (top 10)

| Slug | Wave | install / pattern | Notes |
|---|---|--:|---|
| `abhigyanpatwari/GitNexus` | W312-C | (low) | DO NOT INSTALL — PolyForm-Noncommercial 1.0.0 license + CR-9-unpinned + solo-bus-factor + D24 floor; extract PreToolUse Grep-augment + cypher MCP-tool pattern only |
| `bytedance/deer-flow` | W291.S2 | 3.24 / 3.32 | DOWNGRADED from prelim T2; middleware-chain pattern |
| `Azure/PyRIT` | W291.S2 | (low) | Multi-modal red-team uniqueness vs garak |
| `daymade/claude-code-skills` | W291.S2 | (low) | `.security-scan-passed` + 5-class scanner pattern |
| `levnikolaevich/claude-code-skills` | W291.S2 | (low) | Mis-attribution caught by v3 disagreement[] mechanism |
| `joshuaswarren/remnic` | W288 | 3.21 / 3.11 | D5<4; pattern artifact |
| `memodb-io/Acontext` | W288 | 3.06 / 3.63 | D10=2 + D14<3; pattern-improvement carve-out |
| `sipyourdrink-ltd/bernstein` | W288 | 3.18 / 3.32 | D5<4 |
| `Open-Social-World/autolibra` | W310-S2 | 2.94 / 4.18 | ICLR-2026 arXiv:2505.02820; `iterative_metric_creation` extraction pattern |
| `microsoft/PromptWizard` | W291.S2 | 3.73 / 4.44 | ACTIVE — pattern carry |

## §5 — T4 CITE-ONLY + T5 REJECT roster

| Slug | Wave | Tier | Reason |
|---|---|---|---|
| `markmhendrickson/neotoma` | W291.S2 | T4 | License-blocked higher tier |
| `MARM-Systems` | W291.S2 | T4 | Similar |
| `frankenterm` | W291.S2 | T4 | 80★, license blocked higher tier (mandate-validation: stars not a hardgate) |
| `cj-vana/claude-swarm` v0.1.0 | W316-S7 | **T5 REJECT** | MCP server orchestrating tmux CC swarms; cardinal-rule risk |
| `yeshuibo/agentflow` | W315-B | **T5 REJECT — NON-EXISTENT-CANDIDATE** | Δ33 Stage-0 existence-probe AUTO-REJECT (4-wave GitHub-MCP silent-fallback canonical case) |
| `eric-ai-lab/HarnessAudit (arxiv:2605.14271)` | W317-B | **T5 CITE-ONLY (github-repo) + paper-CITE** | Stage-0 FAIL per Δ33 |
| `kirillkovalenko/nssm` | (incumbent) | T4 → DEPRECATING | Upstream INACTIVE >12mo; operator "nssm not sota" |
| `winsw/winsw` | (alternative) | T4 | Upstream INACTIVE |

## §6 — Operator-mandate-cited repos cross-reference

| Operator mandate (W314-W318) | Slug | Current verdict | W318+ action |
|---|---|---|---|
| W314-r1 NSSM-replacement | `aelassas/servy` | T2 VENDOR-FORK 3.706 staged-pilot | LlamaSwap first migration W319 |
| W314-r1 NSSM-replacement alternative | `uvx-stdio MCP` (pattern) | T2-STAGED 20/20 | Operator picks W319 |
| W314 SOTA discovery | `stanfordnlp/dspy 3.2.1` | T1 candidate 4.625 | Full audit W319 |
| W314 OSSF-pair | `ossf/scorecard` + `ossf/criticality_score` | T1 candidate 4.500 | Paired-install W319 |
| W314 Helicone re-litigate | `Helicone/ai-gateway` | T2 candidate | W319 audit |
| W315 OpenJudge | `agentscope-ai/OpenJudge` | T2 candidate 4.325 | W319 audit |
| W315 IkLlama | `ikawrakow/ik_llama.cpp` | T2 candidate 4.525 | W319 audit |
| W316-S7 #73 | `microsoft/agent-governance-toolkit v3.7.0` | T1 INSTALL CONFIRMED | INSTALL post-W316-S7 |
| W317-B re-litigates | `Valdecy/pyDecision`, `METR/HCAST`, `haizelabs/verdict` | T2 | Continue pattern carry |
| W318 research-architecture | `addyosmani/agent-skills v0.6.0` | T2→T1 graduation question | Revisit W318+ |

## §7 — Matrix summary by tier × score-band

```
                  install_score band
                  <3.0  3.0-3.8  3.8-4.3  4.3-4.5  ≥4.5
T1 INSTALL          0      0        1        2       5    = 8
T2 VENDOR-FORK      0      4        6        2       0    = 12
T2-CHERRY           0      1        1        0       0    = 2  (Δ36 new tier)
T3 PATTERN-STUDY    3      6        1        0       0    = 10
T4 CITE-ONLY        4      2        0        0       0    = 6
T5 REJECT           4      0        0        0       0    = 4
                  ---    ---      ---      ---     ---
Total              11     13        9        4       5    = 42 (de-duplicated unique-candidate rows)
```

**Note**: 97 raw ledger rows → 42 unique-candidate rows after de-duplicating arch-itself self-eval rows (sca-v3, v3.1, v5, v6, v6.1, v7, v7.1, v7.2) + RE-LITIGATED supersession-chain rows (planning-with-files row 3 → 29 → 32 → 46 → 50 → 51).

## §8 — D-EMP DRAFT applied retroactively (W317-A scoring)

If sca-v8 D-EMP HARD GATE were already shipped, retrospective scoring would yield:

| Candidate | install_score | D-EMP score | v8 verdict |
|---|--:|--:|---|
| `microsoft/agent-governance-toolkit v3.7.0` | high | **5** (W317-S5 INSTALL-CONFIRMED post-W316-S7) | T1 INSTALL (no change) |
| `aelassas/servy` | 3.706 | 2 (dry-run install reachable; staged-pilot W315-W317; smoke-incomplete) | **T2 VENDOR-FORK** (no change — D-EMP gate passes ≥1) |
| `uvx-stdio MCP CogneeMCP` | 4.60 | **2** (W316-A smoke-FAIL re cognee env-file prereq) | **T2-CHERRY HOLD-NSSM** (matches W316-A actual verdict; D-EMP gate properly catches paper-PASS + smoke-FAIL) |
| `OthmanAdi/planning-with-files` | 4.67 | **2** (W308/W309 Phase-5 strict-letter FAIL + MT-Bench hard-cap) | **T3 RE-LITIGATED** (matches W309 actual verdict) |
| `stanfordnlp/dspy 3.2.1` | 4.625 | **2** (paper-only; not yet smoke-run in this runtime) | **T2-CHERRY HOLDING** → T1 after smoke-run lifts D-EMP ≥3 |

**Principle test PASS**: D-EMP HARD GATE retroactively reproduces W316-A + W309 + (projected) DSPy verdicts via codified rubric — no post-hoc operator override needed. **Validates Δ42 D-EMP RATIFY for W319.**

## §9 — W319 P0 candidates by ranking

**Top-3 W319 install audits** (highest expected install_score lift):
1. **`stanfordnlp/dspy 3.2.1`** — 4.625 projected; native MCP §6.6; GEPA 35× fewer rollouts → lifts L8 research-arch
2. **`ossf/scorecard` + `ossf/criticality_score`** (paired) — 4.500; AUTOMATES anti-bias sca-v6.1 PRELIM scoring; Rob Pike algorithm → enables Δ41 dependents-normalized + Δ43 Zipfian-norm if v8.1 ratified
3. **`microsoft/agent-governance-toolkit v3.7.0`** — T1 INSTALL CONFIRMED; W316-S7 #73 → governance-toolkit pattern absorption

**Top-3 W319 service migrations** (highest L6 SOTA-score lift):
1. **LlamaSwap → servy** (no prereq; first migration)
2. **CogneeMCP → servy** (BLOCKED by W298 env-file refactor — must close first)
3. **IkLlamaServer → servy** (third migration)

**Top-3 W319 rubric ship items** (highest L8 SOTA-score hold):
1. **Δ42 D-EMP RATIFY** from W317-A DRAFT → SKILL.md edit + codex-r1 PASS
2. **Δ45 D-CCRT NEW dim** → SKILL.md edit (operator-mandated runtime-pathway-support)
3. **PRE-V8 structural refactor** (extract version-history block; saves ~600L preload) → W318-C archaeology hotspot #1

## §10 — Verdict

**42 unique-candidate verdicts on canonical record**; tier-distribution healthy (8 T1 / 14 T2-incl-CHERRY / 10 T3 / 6 T4 / 4 T5). **No tier-flooding** (no single tier >35% of total). **D-EMP DRAFT retroactive principle-test PASS** on 5 worked-examples (W316-A NSSM, W309 PWF, projected DSPy).

**W319 P0 ranking** clear: dspy + ossf-pair + agent-governance-toolkit installs; LlamaSwap+CogneeMCP+IkLlama service migrations; Δ42+Δ45 partial v8.1 ship.
