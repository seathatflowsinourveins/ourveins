# W316 Synthesis — Full-Unleash 4-Stream sca-v7 Audit

**Wave**: W316
**Date**: 2026-05-19
**Branch**: `sota-converge-w310` (HEAD `e9c0ef8` baseline)
**Method**: 4-stream parallel-Agent dispatch under FULL UNLEASH terms (no budget caps, ≥15 MCP families per stream, Phase-5 5-gate STRICT + Phase-6 position-swap mandatory, codex GPT-5.5 adversarial blind-review at end of Stream 4)
**Operator mandate**: *"we have unlimited claude 4.7 and gpt5.5 usage, we need full unleash with sota harness ... pull your runtime with [anthropics/wshobson/addyosmani/mattpocock/mksglu] ... compare ... line by line ... ship with convergence sota insights and e2e with gpt 5.5"*

---

## Executive verdict

**YELLOW with 1 MAJOR vindication of full-unleash + 5 CRITICAL findings + 4 RATIFIED + 1 DEMOTION**.

**Headline**: Stream 4 strict re-audit of addyosmani/agent-skills **DEMOTED** the W315-A T1 INSTALL verdict to **T2 STRICT VENDOR-FORK** after codex GPT-5.5 NEEDS-REVISION (3 HIGH). Inflation root-cause: budget-capped audit read 4 of 23 SKILLs + fired 9/9 MCP families + skipped Phase-6 position-swap + 2-org-anchor pairs vs strict 3-org. **Full-unleash directive vindicated**: 0.65-point score inflation caught only by strict re-audit.

**Across-stream consistent finding**: **GitHub MCP `search_repositories` silent-fallback confirmed 7th-time** (W312-D F1 → W313-D → W314-B → W315 → W316-1 → W316-2 → W316-3 → **W316 systemic**). Pattern is now empirical-canonical; escalate to upstream issue + per-runtime workaround in `goal-prompt-synthesis` SKILL.md.

---

## 1. Stream tier-verdict summary

| Stream | Target | Verdict | Install score | Hard-caps | Phase-5 | Phase-6 |
|---|---|---|---:|---|---|---|
| **1A** | anthropics/`knowledge-work-plugins` | **T3 PATTERN-STUDY** | 4.664 | 0 | 5/5 | swap-stable |
| **1B** | anthropics/`claude-code-security-review` | **T3 PATTERN-STUDY** | 3.071 | D7=1 / D10=2 / D16=2 at-floor | 5/5 | swap-stable |
| **1C** | anthropics/`cwc-long-running-agents` | **T3 PATTERN-STUDY-forced** | 2.686 | **5 hard-caps FAIL** (D1<3, D5<4, D16<2, D17<2, D19<2) | 4/5 | swap-stable |
| **2** | shanraisshan/`claude-code-best-practice` (CCBP) | **T1-CITE-SOURCE WITH CONDITIONS** | 4.378 | 0 | 5/5 | swap-stable |
| **3** | affaan-m/`everything-claude-code` (ECC) | **T1 INSTALL — RATIFY existing W308** | 4.679 | 0 (3 at-floor: D14/D16/D21) | 5/5 | rejects T3+T5 |
| **4** | addyosmani/`agent-skills` (STRICT re-audit) | **T2 STRICT VENDOR-FORK — DEMOTE-FROM-W315A-T1** | 4.207 | 0 (codex NEEDS-REVISION 3 HIGH) | 5/5 | ±0.62 divergence |

**Tier distribution this wave**: 0 strict-T1-new · 2 T1-RATIFY (CCBP cite + ECC install) · 1 T2-DEMOTE · 3 T3 · 0 T4 · 0 T5. **6 sca-v7 audits with full unleash; W315-A T1 superseded by W316-4 T2.**

---

## 2. CRITICAL findings (P0/P1)

### F-W316-C1 (P0): W315-A install_score inflated by ~0.65 points

- **Stream 4** strict re-audit recomputes install_score 4.857 → **4.207** (below T1 4.5 ship-gate; above T2 4.0 floor)
- Root causes: 4 of 23 SKILL.md bodies read (W316 reads all 23); 9/9 MCP families fired (W316 fires 17/17); no Phase-6 position-swap (W316 measures ±0.62 divergence); 2-org anchor pairs (W316 lifts to 12/13 strict 3-org-distinct); D10 mass-duplication scored 4 (W316 corrects to 3 — 22 of 23 addy skills overlap installed surface)
- **Decision**: W316-4 row 66 SUPERSEDES W315 row 61. addyosmani plugin EXPLICITLY ORPHANED in runtime (`.orphaned_at` marker, 13 bytes, mtime 2026-05-18 17:02 UTC). T1 INSTALL definitionally untenable for orphaned plugin.
- **Codex GPT-5.5 NEEDS-REVISION verdict**: 3 HIGH + 4 MED + 1 LOW — ALL 8 findings accepted by Stream 4

### F-W316-C2 (P0): CLAUDE.md L3 cite-SHA narrative INVERTED

- **Stream 2** identified that the W315 cite-refresh narrative is reversed: `48f2ceb` is OLDER (first-commit 2026-05-08, current LOCAL); `48798ca` is upstream HEAD (2026-05-18, 11 days newer + 9 commits ahead)
- Content NOT stable: 4 of 8 best-practice files changed; 2 substantively (`claude-commands.md` +137-line restructure; `claude-settings.md` +56 lines)
- **Operator-action**: refresh local CCBP clone OR refresh CLAUDE.md L3 narrative with correct old/new direction

### F-W316-C3 (P0): 36% of CLAUDE.md cited line-ranges drift at upstream HEAD

- **Stream 2**: 3 of 11 cite-anchors drifted; 1 local-wrong-upstream-right (`:826` autocompact → L847 +21; `:446-461` sandbox example now points to plugin settings; `:877-921` env block +18 drift)
- **CCBP maintainer's deepwiki**: *"line-by-line content is NOT stable enough for external repos to cite specific line ranges. Recommendation: cite by section heading and table name rather than line numbers."*
- **Operator-action**: pivot all CLAUDE.md + W2/W3 cite-anchors from line-numbers to section-headers (drift-immune)

### F-W316-C4 (HIGH): ECC plugin pin SHA `841beea4` is ORPHAN

- **Stream 3**: `installed_plugins.json` pin `841beea45cb25ba51f29fa45b7e272938d19b80a` is NOT reachable from `origin/main`, NOT a tag, NOT in any branch
- ECC plugin cache content authentic to v2.0.0-rc.1 BUT supply-chain SHA traceability broken
- **Remediation**: re-run `/plugin update everything-claude-code@everything-claude-code` to refresh to a reachable SHA

### F-W316-C5 (HIGH NEW — 7th-time-convergent): GitHub MCP `search_repositories` silent-fallback EMPIRICAL-CANONICAL

- W316 streams 1+2+3 ALL independently surfaced this pattern (4th/5th/6th time confirmed convergent)
- **Operator-action**: file upstream `anthropics/claude-code-action` issue + add `gh api /search/repositories` REST fallback to `goal-prompt-synthesis` SKILL.md

---

## 3. RATIFIED via independent sca-v7 (with conditions)

### ECC (Stream 3): T1 INSTALL RATIFY

- install 4.679 (margin 0.179) / pattern 5.000 (ceiling!)
- R1-R5 ALL COMPLIANT (incl. 0 project-owned hook bodies; 41 plugin-shipped hooks all whitelisted; 0 eval/exec/curl/wget in hook code)
- Maintainer Affaan Mustafa = Anthropic Hackathon Winner (Zenith Chat + AgentShield, Feb 2026)
- 186.9K stars / 28.9K forks / 180 contributors / MIT license / SECURITY.md with 48h ack SLA
- D10 = 13% overlap with 23 runtime locals (tdd/mem-recall/web-design-guidelines high-overlap) — race-condition risk tracked AI-W316-2 MED
- **No CLAUDE.md/settings.json/.mcp.json changes needed**; W308 W299-A REVERSAL ratified

### CCBP (Stream 2): T1-CITE-SOURCE WITH CONDITIONS

- install 4.378 / pattern 4.527
- 17/18 MCP families invoked (clear T1 floor 11 + 6 margin)
- 9/9 hard-caps PASS
- Conditions: F-W316-C2 + F-W316-C3 cite-anchor drift requires section-header pivot
- 7 new operator-AIs (3 HIGH: section-header pivot, weekly drift skill, CCBP drift-detection meta-agent; 4 LOW: missing primitives)

---

## 4. T3 PATTERN-STUDY harvest (Stream 1)

### KWP (knowledge-work-plugins) — HIGHEST-VALUE
- Vendor-fork 4 workflows + 2 policy files (plugin-marketplace-governance pipeline shipped THIS WAVE commit `6445c15`)
- Directly closes W314-r2 Stream E "sandbox half-implemented" finding
- Codify sca-v7.1 §Δ34 `plugin_policy_gate_pattern_density` (weight 0.8)

### CCSR (claude-code-security-review)
- 97-day-stale maintenance + deprecated model + open prompt-injection vulnerability + 3-contributor bus-factor
- Absorb 2-stage FP-filter pattern → sca-v7.1 §Δ35 `threat_model_coverage` (weight 0.8)
- W320 watch: re-audit if ddworken merge-cadence resumes

### CWC (cwc-long-running-agents)
- Explicitly-unmaintained Code-with-Claude-2026 take-home
- CR-2-violation if file-copied → PATTERN-ONLY adoption only
- Absorb 5 PATTERN-NAMES → sca-v7.1 §long-running-agent-pattern-vocabulary
- Codify sca-v7.1 §Δ36 `maintenance_discipline` (weight 0.6)

---

## 5. Consolidated operator-action queue (W316 → W317)

### P0 — within current session OR explicit-defer decision

- [ ] **AI-W317-ADDYOSMANI-RECONCILE**: Decide on addyosmani plugin — (a) re-enable + retest, OR (b) explicit-uninstall + marketplace-remove, OR (c) leave-orphaned + record-as-cite-only. NOTE: Stream 4 STRICT T2 demote is the SCA-v7 truth; W315-A row 61 ledger entry should be marked SUPERSEDED-BY-W316-ROW-66.
- [ ] **AI-W317-CLAUDE-MD-L3-FIX**: Correct CLAUDE.md L3 cite-narrative direction (`48f2ceb` is OLDER local; `48798ca` is NEWER upstream HEAD).
- [ ] **AI-W317-CCBP-CITE-PIVOT**: Pivot CLAUDE.md + W2/W3 cite-anchors from line-numbers → section-headers (per CCBP maintainer's own recommendation; drift-immune).
- [ ] **AI-W317-ECC-SHA-REFRESH**: `/plugin update everything-claude-code@everything-claude-code` to refresh ORPHAN SHA `841beea4` to a reachable upstream HEAD.
- [ ] **AI-W317-GITHUB-MCP-FALLBACK**: file upstream issue + add `gh api /search/repositories` workaround to `goal-prompt-synthesis` SKILL.md (7th-time-convergent silent-fallback now empirical-canonical).

### P1 — within 24h

- [ ] AI-W317-KWP-PATTERN-1 (HIGH): vendor-fork KWP 4-workflow CI to `.github/workflows/`
- [ ] AI-W317-KWP-PATTERN-2 (HIGH): codify sca-v7.1 §Δ34 plugin_policy_gate_pattern_density
- [ ] AI-W317-CCSR-PATTERN-1 (MED): codify sca-v7.1 §Δ35 threat_model_coverage
- [ ] AI-W317-CCSR-WATCH (MED): re-audit CCSR at W320 if maintainer resumes
- [ ] AI-W317-CWC-PATTERN-1 (MED): codify sca-v7.1 §long-running-agent-pattern-vocabulary
- [ ] AI-W317-LEDGER-APPEND: append verdict-ledger rows 63-68 (3 anthropics + CCBP + ECC + addyosmani-strict) + mark row 61 SUPERSEDED
- [ ] AI-W317-CCBP-WEEKLY-DRIFT-SKILL: scheduled drift-detection skill (cite-anchor → upstream-HEAD diff)
- [ ] AI-W317-CCBP-META-AGENT: drift-detection meta-agent for cite refresh

### P2 — W317-W320 carry

- AI-W317-ADDYOSMANI-VENDOR-FORK-2: vendor-fork `interview-me` (PRIO-1 genuinely new) + `doubt-driven-development` choreography (PRIO-2 partial additive); skip the 3 other W315-B candidates (frontend-ui-engineering, api-and-interface-design, code-simplification — duplicate installed surface)
- AI-W317-CWC-PATTERN-2 (LOW): sca-v7.1 §Δ36 maintenance_discipline
- AI-W317-SCA-V7.1-SHIP (HIGH): re-audit DSPy + OpenSSF-pair + Helicone under sca-v7.1
- Per-stream additional operator-AIs (5 from S1, 7 from S2, 6 from S3, 2 from S4 = 20 detailed in stream docs)

---

## 6. sca-v7 audit math (vindicates full-unleash directive)

**W315-A budget-capped (≤25 min / ≤$2.00 / 9 MCP families / 4-of-23 SKILL.md read / no Phase-6 swap / 2-org anchors)**: install 4.857 → **T1 INSTALL (pragmatic)**

**W316-4 full-unleash (no caps / 17 MCP families / 23-of-23 SKILL.md read / Phase-6 ±0.62 swap / 12/13 strict 3-org anchors / codex blind NEEDS-REVISION)**: install 4.207 → **T2 STRICT VENDOR-FORK (demote)**

**Delta**: 0.65 points (13% relative). Operator's full-unleash directive **VINDICATED** — strict re-audit catches inflation that budget-capped audit cannot.

**Recommendation**: ALL future T1 INSTALL audits MUST run under full-unleash terms (≥15 MCP families, Phase-6 mandatory, codex blind-rate, all-skills deep-ingest). Budget-capped audits acceptable only for T3/T4 routing where the cost of inflation is bounded.

---

## 7. Cardinal-rule invariants verified post-W316

| Rule | Status | Evidence |
|---|---|---|
| **R1** trusted plugins | ✓ | 6 candidates all phase-5 PASS or explicit-orphan / explicit-cite-source |
| **R2** hooks | ✓ | ECC 41 plugin-shipped hooks all whitelisted; no new project-owned hook bodies |
| **R3** cite-anchored agents | ✓ | unchanged from W311 restoration |
| **R4** no self-invent rules | ✓ | self_invented_count: 0 preserved across all 4 streams |
| **R5** safety via permissions | ⚠️ | W311 P-B `defaultMode: bypassPermissions` decision still pending |

**STOP-gate state**:
- CLAUDE.md ≤50 LOC ✓
- settings.json ≤15 KB ✓
- worktrees ≤3 ✓
- codex `reviewGateEnabled:true` ✓
- 64 plugins (addyosmani orphan; ECC + others ratified)

---

## 8. Files shipped W316

- `W316-ANTHROPICS-TOP3-UNAUDITED/W316-STREAM-1-ANTHROPICS-TOP3-FULL-UNLEASH.md` (84 KB / 1060 LOC)
- `W316-ANTHROPICS-TOP3-UNAUDITED/W316-STREAM-1-CROSS-REPO-SYNTHESIS.md` (19 KB / 224 LOC)
- `W316-CCBP-CITE-AUDIT/W316-STREAM-2-CCBP-DEEP-AUDIT.md` (~32 KB / 12 §§)
- `W316-ECC-REAUDIT/W316-STREAM-3-ECC-SCA-V7-REAUDIT.md` (~30 KB / 16 §§)
- `W316-ADDYOSMANI-FULL-UNLEASH/W316-STREAM-4-ADDYOSMANI-DEEP-REAUDIT.md` (71 KB / 1003 LOC)
- `W316-SYNTHESIS/W316-SYNTHESIS.md` (this file)
- basic-memory T6 verdicts × 7 (3 anthropics + CCBP + ECC + addyosmani-strict + 1 cross-finding)

**Total W316 doc shipment**: ~240 KB across 6 files + 7 T6 verdicts.

**Total spend**: ~$30-50 API equivalent / ~90 min wall-clock (4 agents in parallel; 100% parallel_ratio = W269 mandate cleared).

---

## 9. Verdict-ledger row drafts (rows 63-68 + supersession)

```markdown
| 61 | W315 | 2026-05-19 | addyosmani/agent-skills (light-blind) | T1 INSTALL (pragmatic) | install 4.857 | n/a | 0 | **SUPERSEDED-BY-W316-ROW-66** | n/a | W316 strict re-audit demotes to T2 |
| 63 | W316 | 2026-05-19 | anthropics/knowledge-work-plugins | T3 PATTERN-STUDY | install 4.664 (D20=2 op-fit cap) | high | 0 | ACTIVE | n/a | vendor-fork 4 workflows; KWP marketplace-governance pipeline (commit 6445c15) closes W314-r2 sandbox gap |
| 64 | W316 | 2026-05-19 | anthropics/claude-code-security-review | T3 PATTERN-STUDY | install 3.071 | medium | 3 at-floor (D7=1, D10=2, D16=2) | ACTIVE — W320 watch | n/a | 97d-stale + deprecated model; absorb 2-stage FP-filter pattern |
| 65 | W316 | 2026-05-19 | anthropics/cwc-long-running-agents | T3 PATTERN-STUDY-forced | install 2.686 | low | **5 hard-caps FAIL** (D1<3, D5<4, D16<2, D17<2, D19<2) | ACTIVE — PATTERN-ONLY | n/a | unmaintained take-home; CR-2 violation if file-copied; absorb 5 PATTERN-NAMES |
| 66 | W316 | 2026-05-19 | addyosmani/agent-skills (STRICT) | **T2 STRICT VENDOR-FORK** SUPERSEDES W315 row 61 | install 4.207 | pattern 4.286 | 0 (codex NEEDS-REVISION 3 HIGH accepted) | ACTIVE — plugin explicitly orphaned | n/a | Strict re-audit catches 0.65-point inflation; vendor-fork only `interview-me` + `doubt-driven-development` choreography |
| 67 | W316 | 2026-05-19 | shanraisshan/claude-code-best-practice | T1-CITE-SOURCE WITH CONDITIONS | install 4.378 / pattern 4.527 | high | 0 | ACTIVE — F-C2/C3 conditions | n/a | section-header cite pivot required; weekly drift skill |
| 68 | W316 | 2026-05-19 | affaan-m/everything-claude-code (re-audit) | T1 INSTALL RATIFY (W308 W299-A REVERSAL ratified) | install 4.679 / pattern 5.000 | high | 0 (3 at-floor D14/D16/D21) | ACTIVE | n/a | 41 plugin-shipped hooks all whitelisted; ORPHAN pin SHA refresh needed |
```

---

## 10. Codex GPT-5.5 cross-model gate (round-trip until APPROVE)

Per persistent operator mandate: codex Stop-hook auto-fires on session-end (W280a). Pre-ship explicit gate via `claude --bg -- /codex:adversarial-review --wait`.

**Tiebreakers queued for codex**:
1. W315→W316 supersession audit (Stream 4 codex blind already NEEDS-REVISION; carry to next-round)
2. CCBP cite-anchor pivot (line-numbers → section-headers) — operator-only edit boundary
3. ECC ORPHAN-SHA refresh decision (auto-doable: `/plugin update`)
4. addyosmani reconcile (re-enable / uninstall / leave-orphaned)
5. F-W316-C5 GitHub MCP silent-fallback escalation classification

Codex round-1 HIGH/CRITICAL → round-2 close; round-2 HIGH → round-3; **continue until APPROVE per full-unleash mandate**.

---

## 11. W317 next-wave preview

Apply the 5 P0 + 9 P1 operator-action queue. Recommended decomposition (4-stream W317):

- **Stream A**: P0 batch (W315-row-61 supersession marker + CLAUDE.md L3 fix + ECC SHA refresh + addyosmani reconcile)
- **Stream B**: CCBP cite-pivot (line-numbers → section-headers across all CLAUDE.md + W2/W3 cite-anchors; possibly automated via cite-extractor + section-header-mapping script)
- **Stream C**: KWP vendor-fork (4 workflows + 2 policy files) — closes W314-r2 sandbox-half-implemented finding
- **Stream D**: sca-v7.1 ship (Δ34 plugin_policy_gate + Δ35 threat_model_coverage + Δ36 maintenance_discipline + §long-running-agent-pattern-vocabulary)
