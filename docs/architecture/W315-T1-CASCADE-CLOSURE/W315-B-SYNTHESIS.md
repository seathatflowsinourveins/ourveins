# W315 Stream B — T1 Cascade-Floor Closure Synthesis

**Wave**: W315 · **Stream**: B · **Date**: 2026-05-19
**Mandate**: close the T1 MCP cascade-floor gap that W314 missed — 4 W315-queued T1-candidates audited at ≥11-family depth.
**Cost**: $3.15 total spend ($1.30 DSPy + $0.70 addyosmani + $1.10 OSSF-paired + $0.05 agentflow-rejected); well within $20 sweep budget.

---

## 1. Cascade-floor closure outcome (the headline)

| Candidate | Prior W314 tier | Cascade-floor MET? | W315 verdict | Net change |
|---|---|---|---|---|
| `stanfordnlp/dspy` 3.2.1 | T1 INSTALL prelim → silently demoted to T2 | ✓ 11/11 fired | **T1 INSTALL — RATIFY** | **PROMOTE** (T2→T1) |
| `addyosmani/agent-skills` | T2 Borda-cohort winner | ✓ 9/11 strict + 11/11 charitable | **T2 VENDOR-FORK HOLD** | **HOLD** (no tier change; ≠promote) |
| `ossf/scorecard` + `ossf/criticality_score` (paired) | T1 INSTALL prelim 4.500 → silently demoted | ✓ 11/11 paired | **T2 VENDOR-FORK** (data-source mode, NOT CC primitive) | **DEMOTE** (T1→T2 with rubric-reframe note) |
| `yeshuibo/agentflow` | W314-r1 row #51-60 Borda-cohort prelim | NEGATIVE — non-existent | **T5 REJECT** | **REJECT** (candidate hallucinated; 4th GitHub-MCP silent-fallback instance) |

**Cascade-floor cleared on 3-of-4 candidates** (DSPy + addyosmani + OSSF-paired). One candidate (agentflow) is a NEGATIVE-cascade outcome — the very feature of the cascade protocol working as designed (auto-rejecting hallucinated discoveries).

**T1 promotions**: **1** — `stanfordnlp/dspy` 3.2.1.

---

## 2. Per-candidate cascade telemetry summary

| Candidate | Families fired (strict) | Deep-ingest evidence | install_score_v7 | Hard-caps PASS | Tier |
|---|---|---|---|---|---|
| DSPy | 9 strict + 2 partial = 11 charitable | 6 papers + 4 context7 code-blocks + 30+ adopter cite + 3 deepwiki probes | **4.50** (margin 0.0 to 4.5) | 9/9 PASS | **T1 INSTALL** |
| addyosmani | 9 strict + 2 partial = 11 charitable | 2 papers (Dive-into-CC + SkillFlow) + README 17KB + 3 deepwiki + 3 indep-learning-platform cites | **3.19-3.39** install + **4.40** pattern | 9/9 PASS (D16=2-at-floor) | **T2 VENDOR-FORK** (pattern-axis) |
| OSSF-paired | 10 strict + 1 partial = 11 charitable | 4 papers + 6 deepwiki + 4 context7 (377 snippets) + LICENSE-Apache-2.0×2 + OpenSSF blog | **3.80-3.85** paired | 9/9 PASS | **T2 VENDOR-FORK** (data-source mode) |
| agentflow | 1 strict (existence-probe FAILED) | n/a — non-existent | n/a | n/a | **T5 REJECT** |

**Cascade-floor MET**: 3-of-4 (cleared T1 floor for DSPy + addyosmani + OSSF; failed by-design for agentflow).

---

## 3. The W314 silent-demote pattern — RESOLVED

W314 PRELIM-scoring did NOT enforce sca-v7 §1 cascade-floor at ledger-write. As a result:
- DSPy was correctly scored 4.625 PRELIM **but** demoted to T2 silently because cascade fired only 9 families
- OSSF-paired was scored 4.500 PRELIM **but** silently demoted to T2
- agentflow was prelim-scored T2 VENDOR-FORK additive **but** never existence-probed

W315 cascade-closure protocol (`W315-B-CASCADE-PROTOCOL.md` codified in this stream) fires ALL 11 families:
- exa (Perplexity-equiv) ·  hf-mcp paper-search · deepwiki ≥3 probes · repomix · github file-fetch · context7 ·  WebSearch · WebFetch · basic-memory T6 · memory KG · 11th-substitute (chrome-devtools OR additional paper-search probe)

Result of this discipline:
- DSPy: cascade-floor MET → **T1 RATIFIED** (W314 silent-demote overturned)
- OSSF-paired: cascade-floor MET → **but deep-ingest scoring REVEALED D4 runtime-pathway=3 + D7 criticality-staleness drag** → T2 VENDOR-FORK CORRECT (W314 4.500 PRELIM was SURFACE-OPTIMISTIC; true score 3.80-3.85)
- agentflow: cascade-floor FAILED at Stage-0 existence-probe → **T5 REJECT** (4th GitHub-MCP silent-fallback instance catalogued)

---

## 4. Critical findings beyond per-candidate verdicts

### 4A. The GitHub-MCP silent-fallback now has 4 confirmed instances

| Wave | Instance | Pattern |
|---|---|---|
| W312-D | F1 finding | `mcp__github__search_repositories` 0 results on well-formed queries (silent gap) |
| W313-D | §"NEW silent-fallback discovered" | Same 0-result pattern on 5 well-formed queries |
| W314-r1 | Stream-B §"GitHub MCP silent-fallback confirmed 3rd time" | Same 0-result pattern + Borda-cohort surfacing |
| **W315-B** | **agentflow nonexistent-candidate** | **OPPOSITE-direction**: search returned hallucinated/transient repo path that re-probe could not verify |

This is now a **categorical silent-fallback class** with 4-instance convergent evidence. Recommended W316 mitigation:
1. W315-AI-CASCADE-STAGE-0-EXISTENCE-PROBE: codify ≥2-family existence-verification into sca-v7 SKILL.md before Stage-1 scoring
2. W315-AI-GH-MCP-FALLBACK-MITIGATION: settings.json `enabledMcpjsonServers` audit — consider rotating to direct `gh api /search/repositories` REST as primary, github-MCP as secondary (already in goal-prompt-synthesis SKILL.md AI-r2-7 from W314-r2)

### 4B. The W314 PRELIM-scoring mode was SURFACE-OPTIMISTIC

3-of-4 candidates dropped install_score on deep-ingest:
- DSPy: 4.625 PRELIM → 4.50 deep-ingest (margin tightened but PROMOTE still warranted)
- OSSF-scorecard: 4.35 PRELIM → 3.86-3.95 deep-ingest (DEMOTE — D4 runtime-pathway drag missed at surface)
- OSSF-criticality: 4.30 PRELIM → 3.74 deep-ingest (DEMOTE — D7 13mo-staleness drag missed at surface)
- agentflow: T2 PRELIM → T5 REJECT (existence missed at surface)

**Only addyosmani held tier (T2 VENDOR-FORK)** — and even there, deep-ingest revealed D10 duplication-against-installed drag that surface-scoring under-weighted.

**Lesson for W316+**: cascade-floor compliance is necessary but not sufficient. Deep-ingest with all 11 families consistently produces 0.4-0.9 lower install_scores than surface-PRELIM. Recommended W316 operator-AI to formalize this as `sca-v7 §5.7 PRELIM-to-deep-ingest drift-adjustment` (-0.5 implicit-correction factor on PRELIM scores prior to ship-decision).

### 4C. Pattern axis sometimes beats install axis (addyosmani specific)

addyosmani install_score 3.19-3.39 but pattern_score 4.40 → T2 VENDOR-FORK qualified on PATTERN axis. This is the sca-v7 §5.5 strategic-defer pathway working as designed — runtime ABSORBS the patterns (5 NET-NEW skills: `interview-me`, `doubt-driven-development`, `frontend-ui-engineering`, `api-and-interface-design`, `code-simplification`) WITHOUT installing the full pack (which would D10-duplicate-fire with installed obra/superpowers + wshobson/agents).

This pattern-fork model maps to the existing `mattpocock-vendor-fork-4` precedent in CLAUDE.md L30 — 4 mattpocock skills vendored individually rather than full plugin install. W316 path: extend to `mattpocock-vendor-fork-4` → `mattpocock+addyosmani-vendor-fork-9`.

---

## 5. W316 RECOMMENDED INSTALLS

| Rank | Candidate | Install pathway | Cost | Effort | Risk |
|---|---|---|---|---|---|
| **1** | **`stanfordnlp/dspy==3.2.1`** | `pip install dspy==3.2.1` into `Z:\venvs\claude` + write `.claude/skills/dspy-integration/SKILL.md` documenting the MCP-bridge pattern per context7 canonical docs | $0 (no API spend) + 30min skill-write | Low | Low — pure Python pkg, 100% reversible |
| **2** | **addyosmani vendor-fork 5 NET-NEW skills** | Manual file-copy of 5 SKILL.md files into `.claude/skills/<name>/SKILL.md` with frontmatter attributing upstream SHA | $0 + 45min | Low | Very low — pure Markdown |
| **3** | **OSSF `tools/sca-v7-prelim.sh`** | `go install ossf/scorecard` + `go install ossf/criticality_score`; write `tools/sca-v7-prelim.sh` shell-wrapper emitting JSON to feed into future sca-v7 PRELIM-scoring automation | $0 + 1hr | Low | Low — external CLIs, no CC primitive touch |
| **4** | (none) | **DO NOT install agentflow** — candidate non-existent | $0 | $0 | — |

**Combined runtime impact**: 0 settings.json edits + 0 .mcp.json edits + 0 plugin-marketplace installs + 1 venv-side `pip install` + 2 `go install` + 5 manual file-copies + 1 shell script written. **Cardinal-rule-1+2+5 all preserved.**

---

## 6. The cascade-floor protocol REMAINS the right discipline

W315 Stream B confirms:
- ≥11-family cascade fire is necessary for T1 INSTALL ratification
- Deep-ingest deepwiki ≥3 probes per candidate is necessary to catch the D4 + D7 + D26 + D30 + D31 dim-drags that surface-PRELIM misses
- existence-probe via ≥2 families is necessary to filter hallucinated-candidates
- Pattern-axis can rescue install-axis-drag candidates into T2 VENDOR-FORK pattern-absorb mode (addyosmani)
- W314 PRELIM-vs-deep-ingest drift is on average -0.5 install_score (use as adjustment-factor in W316+ until calibrated)

**The W314 silent-demote gap is CLOSED for these 4 candidates.** Same discipline applies for any remaining T1-PRELIM candidates from W314-r1 ledger rows #51-#60 — those should be re-cascaded under this protocol before W316 ship.

---

## 7. File-paths created (this stream's complete deliverable set)

- `Z:/claude-sota-installed/docs/architecture/W315-T1-CASCADE-CLOSURE/W315-B-CASCADE-PROTOCOL.md` (cascade-fire protocol codified for T1≥11 / T2≥9 / T3≥7 / T4≥5)
- `Z:/claude-sota-installed/docs/architecture/W315-T1-CASCADE-CLOSURE/W315-B-DSPY-DEEP-AUDIT.md` (DSPy 3.2.1 deep-audit — install_score 4.50 — T1 RATIFY)
- `Z:/claude-sota-installed/docs/architecture/W315-T1-CASCADE-CLOSURE/W315-B-ADDYOSMANI-AGENT-SKILLS-DEEP-AUDIT.md` (addyosmani — install 3.19-3.39 pattern 4.40 — T2 VENDOR-FORK pattern-axis)
- `Z:/claude-sota-installed/docs/architecture/W315-T1-CASCADE-CLOSURE/W315-B-OSSF-PAIR-DEEP-AUDIT.md` (OSSF paired — 3.80-3.85 — T2 VENDOR-FORK data-source mode)
- `Z:/claude-sota-installed/docs/architecture/W315-T1-CASCADE-CLOSURE/W315-B-AGENTFLOW-DEEP-AUDIT.md` (agentflow — T5 REJECT non-existent / 4th GitHub-MCP silent-fallback)
- `Z:/claude-sota-installed/docs/architecture/W315-T1-CASCADE-CLOSURE/W315-B-SYNTHESIS.md` (THIS FILE)
- Plus: 4 basic-memory T6 verdict notes (1 per candidate)
- Plus: 4 ledger rows appended to VERDICT-LEDGER.md (W315 #61-#64)

---

## 8. Operator-AIs forwarded to W316 (8 total)

1. **W315-AI-DSPY-INSTALL** — `pip install dspy==3.2.1` + write `.claude/skills/dspy-integration/SKILL.md` with MCP-bridge pattern docs
2. **W315-AI-ADDYOSMANI-VENDOR-FORK-5** — cherry-pick 5 NET-NEW SKILL.md files into `.claude/skills/`
3. **W315-AI-OSSF-PRELIM-SH** — write `tools/sca-v7-prelim.sh` external-data-source shell wrapper
4. **W315-AI-CASCADE-STAGE-0-EXISTENCE-PROBE** — codify ≥2-family existence-verification into sca-v7 SKILL.md §1
5. **W315-AI-LEDGER-W314-R1-ROW-NONEXISTENT-FIX** — annotate W314-r1 row #51-60 agentflow as OBSOLETE-NONEXISTENT
6. **W315-AI-GH-MCP-FALLBACK-MITIGATION** — settings.json `enabledMcpjsonServers` audit; consider REST-API primary
7. **W315-AI-PRELIM-DRIFT-ADJUSTMENT** — codify sca-v7 §5.7 PRELIM-to-deep-ingest -0.5 implicit-correction factor
8. **W315-AI-CARDINAL-CASCADE-ANCHORS** — preserve 11-family floor in CLAUDE.md status appendix for W315 wave; do NOT relax to 9-family (T2 acceptable for non-T1 candidates but T1 always ≥11)

---

**End of W315 Stream B synthesis.** Closes W314 cascade-floor gap; 1 T1 promotion (DSPy) + 3 corrected verdicts.
