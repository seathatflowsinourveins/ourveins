
## Wave 153 Fire 8 — Full SRA D1-D10 audit of F7 4-plugin disable decision (META-process; V2+V3 convergent)

**Date**: 2026-05-11
**Class**: META-process audit (NO install; doc-only ship)
**Cron iteration**: `9eb2e02a` 8/N
**Risk class**: LOW (doc-only; reversible via git revert)

**Operator trigger**: user challenge to W153 F7 commit `e191378` rigor ("are they sota convergence decision? definitively reviewed by gpt5.5?") + locked mandate "only commit with sota convergence, deep research first with gpt5.5, commit convergence consensus always".

**Honest classification before F8**: W153 F7 satisfied CR-3 cross-model gate at conf 0.87/0.88 BUT did NOT apply full SRA D1-D10. F7 was CR-12 PARTIAL-OVERLAP CONFIG-PRUNE class.

### V2+V3 Path P dispatch

| Voice | bg task | Wall-clock | Tokens | Exit | Verdict | Confidence |
|---|---|---|---|---|---|---|
| V2 primary SRA D1-D10 | `bf1wz8v1y` | ~120s | 209,440 | 0 | APPROVE-F7-DISABLES | 0.86 |
| V3 ADVERSARIAL | `b8wvs3qj8` | ~60s | 173,315 | 0 | REVISE-V2 | 0.82 |

Both via Path P 6-param strict-conform (codex CLI v0.130.0 DEFAULT profile + `--skip-git-repo-check --color never` + 300s timeout + foreground+tee + ≤50 LOC focused single-claim prompt).

### Convergence consensus

**Action**: ALL 4 plugins KEEP-DISABLE (V2+V3 convergent per-plugin)
**Framing correction (V3 SAVED-SHIP)**: F7 was LOW-risk reversible CONFIG-PRUNE, NOT "definitive SOTA convergence" — V3 caught V2's APPROVE-F7-DISABLES framing overclaim

| Plugin | V2 verdict | V3 keep_disable | Convergent |
|---|---|---|---|
| clickhouse | DISABLE-VALIDATED 0.88 | true | ✓ KEEP |
| outputai | DISABLE-VALIDATED 0.80 | true | ✓ KEEP |
| qdrant-skills | DISABLE-VALIDATED 0.82 | true | ✓ KEEP |
| cwc-makers | DISABLE-VALIDATED 0.95 | true | ✓ KEEP |

### Ladders advance

- **FM-09 V3 ADVERSARIAL same-arc 100%**: 18/18 → **19/19 firm** (9th consecutive arc; V3 caught V2 framing-OVER on "definitive SOTA")
- **Mia n=**: 332 → **333** (V3 framing-OVER catch)
- **Path P n=**: 36 → **38** (V2+V3 PARALLEL)
- **Pattern D n=**: 36 → **38**
- **CR-3 cross-model gate non-Phase-1-bootstrap**: 5 → **6** (W152 F29 + W153 F1+F2+F5+F7+F8)
- **CR-12 NEW candidate classes documented**: ACTIVE-HOOK/FRAMEWORK-CONTEXT (outputai) + GENUINELY-NEW-BUT-DEMAND-ABSENCE (cwc-makers) — each n=1 cross-arc (NOT yet promotion-eligible per cycle-322)
- **USER-CORRECTION-ACK**: 23 → **24** (operator framing challenge addressed)
- **Inline-bash quote-trap**: 20 → **21** (recovered via script wrapper per W153 F1 precedent)

### Verdict files persisted

- `.claude/state/codex_consult_w153_f8_sra_d1d10_v2_OUT.txt` (4564 LOC / 209,440 tokens; APPROVE-F7-DISABLES conf=0.86)
- `.claude/state/codex_consult_w153_f8_sra_d1d10_v3_adversarial_OUT.txt` (4361 LOC / 173,315 tokens; REVISE-V2 conf=0.82)

### Mia pre-apply on V2+V3 prescriptions

| Prescription | Disposition |
|---|---|
| No settings.json revert | VERIFIED — disables intact L527-530; no action |
| Add disabled-plugin cite/discovery index | DEFER to W153 F9 (ONE-LOGICAL-UNIT-PER-FIRE) |
| Update manifest DISABLED-BUT-INSTALLED state | DEFER to W153 F10 |
| Add re-enable triggers per plugin | DOCUMENTED in F8 ship doc |
| Note F7 as CONFIG-PRUNE not SOTA | DOCUMENTED in F8 ship doc + this provenance entry |

### Files in commit

- `docs/wave153-f8-sra-d1d10-audit-2026-05-11.md` (NEW; ship doc with V2+V3 verdicts + convergence + Mia annotations + ladders)
- `docs/install-provenance.md` (this W153 F8 entry append)

### Cardinal-rule conformance

CR-1 ✓ TIER-1-DIRECT cite trail / CR-3 ✓ V2+V3 PARALLEL Path P (6th non-Phase-1-bootstrap) / CR-8 ✓ TIER-3-LOCAL-COMPOSITION effective tier disclosed / CR-9 N/A no install / CR-10 ✓ research-first / CR-11 ✓ META-process / CR-12 ✓ disposition refinements per V3 ADVERSARIAL

### FM defense

FM-02 (b)+(c) ✓ atomic narrow `--only` via ship script wrapper / FM-09 V3 ADVERSARIAL **19/19 firm** / FM-15 ✓ option-ordering correct / FM-17.f orchestrator-direct V2+V3 ✓ / FM-21.a CronCreate defense ✓ / FM-21.b STATE PROBE applied / FM-20 path-drift defense (V3 caught V2 framing OVERCLAIM) / Inline-bash quote-trap n=21 recovered

### Forward direction (post-F8)

| Fire | Purpose |
|---|---|
| F9 | Disabled-plugin cite/discovery index (V3 #4 prescription) |
| F10 | Manifest DISABLED-BUT-INSTALLED state update |
| F11 | ECC sub-category audit (REAL leverage target per F6) |
| F12 | ECC localization loader-mechanics probe |
| F13 | ECC-affaan-m commits 51-batch deep-dive |
| F14+ | per-rule SOTA-review + cite-anchor refresh + per-domain deep-dives |

### Revert path

`git revert <commit-sha>` <30s. Settings.json + cache unchanged from F7.

---
