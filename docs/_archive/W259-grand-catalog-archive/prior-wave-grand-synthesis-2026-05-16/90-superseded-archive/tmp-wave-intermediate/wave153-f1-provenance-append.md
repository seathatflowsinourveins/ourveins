

---

## 2026-05-11 Wave 153 fire 1 — cwc-active-wire-path-reconciliation (Pattern A apply on V2+V3 ADVERSARIAL convergence)

**Trigger**: user directive 2026-05-11 18:35 "advance automation is needed for you, find and ship with convergence" post-W152 F30 STAND-DOWN. Wave 153 arc opening.

**Cross-model gate satisfaction**: REAL GPT-5.5 codex CLI v0.130.0 BRIDGE-MODE Path P 6-param strict-conform (DEFAULT profile + `--skip-git-repo-check` + `--color never` + foreground+tee + timeout 300 + ≤50 LOC focused single-claim prompt). Phase 1 bootstrap exception per CR-3 satisfied via direct dispatch (no subagent fan-out; FM-17.f 1M-context blocker avoided). **Non-Phase-1-bootstrap CR-3 satisfaction: 2nd cumulative** (Wave 152 F29 1st).

**V2 verdict** (`.claude/state/codex_consult_w153_f1_advance_automation_v2_OUT.txt`): **RECOMMEND-SHIP conf=0.86** → ship_name=`cwc-active-wire-durability`; track `.claude/hooks/cwc/*.sh` (kill-switch + steer + track-read + verify-gate); update manifest §17 INSTALLED-DORMANT → INSTALLED-ACTIVE for 4 wires; provenance entry. V2 cost: ~470ms wall-clock; 115,462 tokens.

**V3 ADVERSARIAL verdict** (`.claude/state/codex_consult_w153_f1_advance_automation_v3_adversarial_OUT.txt`): **NEEDS-REVISION-V2 conf=0.91**; **FM-09 14/14 → 15/15 firm** (V3 caught 7 SAVED-SHIP findings V1+V2 missed):
1. CR-12 class WRONG — not GENUINELY-NEW; ECOSYSTEM-IMPORT + TIER-3-LOCAL-COMPOSITION
2. Upstream cite line counts ARE REAL at HEAD `ffd563d6`; V2 stale-HEAD concern UNSUBSTANTIATED for cwc repo
3. **MOST-LIKELY-V1+V2-MISS**: settings wires `.claude/hooks/cwc/*` but manifest §17 describes `.claude/hooks/scripts/cwc/*` as DORMANT — active files are ADAPTED LOCAL-COMPOSITION (PYTHON_BIN + stderr-no-swallow); scripts/cwc/* are VERBATIM UPSTREAM. A simple DORMANT→ACTIVE edit on existing rows would be FALSE
4. `verify-gate.sh` is 23 LOC not upstream 29 — provenance must cite as TIER-3-LOCAL-COMPOSITION not verbatim cite-import
5. V2 step 2 + step 5 DOUBLE-STAGES files — should be single staging point
6. Wave 98-101 commit-on-stop bundled-drift risk underweighted — keep commit-on-stop out of scope (verify tracked only)
7. F30/CR-7 concern real but not reject: durability + manifest truth (NOT Phase 2 unlock)

V3 cost: ~80s wall-clock background; 113,779 tokens.

**Modified ship per V3**: `cwc-active-wire-path-reconciliation` — distinguish active adapted from dormant verbatim; no row-flip; single staging point; provenance with hash mismatch + PYTHON_BIN disclosure.

**Orchestrator-side Mia pre-apply probes** (Mia n=320 → n=325 cumulative):
- Mia OVER #321: rtk hook claim REFUTED (rtk hook IS at settings.json:252-256 with absolute path; rtk --show false-positive due to bare-string-equal check)
- Mia OVER #322: V2 cite anchor line counts match UPSTREAM not local-adapted (5 LOC differences across 4 files)
- Mia OVER #323: V2 didn't note `.claude/hooks/scripts/cwc/commit-on-stop-throttled.sh` already tracked (Wave 101 Ship 2Q `5cc1633`)
- Mia OVER #324: V2 manifest §17 flip target wrong; existing rows describe `.claude/hooks/scripts/cwc/*` not `.claude/hooks/cwc/*`
- Mia OVER #325: HEAD advanced 3× during the fire — `00e07ea` (v13 baseline) → `e56e2256` (V2-observed) → `f7b7bb3` (current; session-checkpoint hook fired between probes)

**V3 verification probes ALL PASS**:
- `python -m json.tool .claude/settings.json` → JSON-VALID ✓
- `git ls-remote https://github.com/anthropics/cwc-long-running-agents.git HEAD` → `ffd563d668a97a38d4aa092bf0d5b1507c046629` EXACT MATCH ✓
- `git ls-files -- .claude/hooks/cwc .claude/hooks/scripts/cwc` → `commit-on-stop-throttled.sh` only tracked (Wave 101 `5cc1633`); 4 target files UNTRACKED ✓
- Sibling-bleed scan: `grep -lE 'Z:/claude-sota/' .claude/hooks/cwc/*.sh` → exit 1 (no matches) ✓
- PYTHON_BIN adaptation: confirmed in steer.sh:12 + track-read.sh:9 + verify-gate.sh:8 with Wave 78/80/82 codex T1 cite anchors

**SRA D1-D10 verdict** (per `Z:/claude-sota/.claude/rules/sota-research-architecture.md`): 9/10 PASS (D10 N/A — not replacement); critical D1+D6 PASS → INSTALL.
- D1 license (Apache-2.0 CLI-script use): PASS
- D2 freshness (HEAD ffd563d6 = 2026-05-05; 6 days old; ACTIVE): PASS
- D3 fresh-paint clear (anthropics PBC official; not fresh-paint): PASS
- D4 maintainer-provenance (TIER-1-OFFICIAL anthropics): PASS
- D5 active-maintenance: PASS (anthropics actively maintaining cwc repo)
- D6 use-class (autonomous /loop runtime + already-wired hooks): PASS
- D7 Anthropic-policy alignment (cwc IS anthropics canonical authority): PASS
- D8 industry adoption (anthropics-shipped; satisfies via D7): PASS
- D9 FM-class clear/documented-recovery (W98+W101 cwc commit-on-stop bundled-drift documented; throttle wrapper at `5cc1633` already addresses): PASS
- D10 replacement viability: N/A (not replacement)

**CR-9 install-risk discipline**:
- Version-pin: upstream HEAD `ffd563d6` verified via git ls-remote = exact match
- Pre-cite-import REVERT check: no REVERT-AND-REMOVE precedent on `.claude/hooks/cwc/*` files in git log
- Sibling-bleed defense: PASS (no `Z:/claude-sota/` references)
- 2-round fix-forward budget: doc/track-class ship; first-round APPROVE expected

**CR-12 disposition**: ECOSYSTEM-IMPORT (anthropics/cwc-long-running-agents ecosystem) + TIER-3-LOCAL-COMPOSITION (PYTHON_BIN fallback per Wave 78 codex T1 conf=0.78 F4 + stderr-no-swallow per Wave 80 codex T1 conf=0.91 F4+F5 + Wave 82 codex T1 conf=0.91 F4). Per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8: `constituents=[TIER-1-DIRECT @ upstream, TIER-3-LOCAL-COMPOSITION @ Wave 78/80/82 adaptations]; effective_tier=TIER-3-LOCAL-COMPOSITION`.

**Cardinal-rule conformance**: CR-1 ✅ TIER-1-DIRECT cite-anchor at HEAD ffd563d6 / CR-3 ✅ V2+V3 REAL GPT-5.5 cross-model gate FULLY satisfied (2nd non-bootstrap satisfaction) / CR-5/6 N/A (already-installed; making durable not re-installing) / CR-7 ✅ Phase 1 ACTIVE; ship doesn't shift phase / CR-8 ✅ TIER-3-LOCAL-COMPOSITION adaptations explicitly disclosed / CR-9 ✅ all 4 sub-rules satisfied / CR-10 ✅ research-first via V2+V3 + Mia probes / CR-11 ✅ META-process discipline applied via Path P + Wave 24-D 3-voice + Mia n=325 + FM-09 14/14 → 15/15 / CR-12 ✅ ECOSYSTEM-IMPORT + TIER-3-LOCAL-COMPOSITION per 6-class lattice.

**FM conformance**: FM-02 (b)+(c) atomic single-shell narrow `--only -- <files>` ✓ / FM-09 V3 ADVERSARIAL caught V1+V2 missed (14/14 → 15/15) ✓ / FM-15 git CLI option ordering ✓ / FM-17.f avoided via orchestrator-direct dispatch ✓ / FM-19 N/A (V2+V3 dispatched from main session not subagent) / FM-20 path-drift cascade defense ACTIVE (V3 caught `.claude/hooks/cwc/` vs `.claude/hooks/scripts/cwc/` cascade) / FM-21.b STATE PROBE clause-level smoke executed at fire-start.

**Risk class**: LOW per launch-discipline D1 (reversible / observable / incremental / no security impact / PROBE 18 N/A — no OS state mutation).

**Revert path**: `git revert <this-commit-sha>` removes 4 newly-tracked files from index (they remain on disk as untracked); manifest §17 row reverted; provenance entry reverted. Settings.json wires UNCHANGED — hooks continue to work via untracked files exactly as before this fire. <30s rollback.

**Ladders advanced**:
- USER-CORRECTION-ACK: n=23 (unchanged; autonomous fire)
- Mia pre-apply: n=320 → **n=325** (+5 OVER catches)
- FM-09 codex-rescue blind-spot specialization: **14/14 → 15/15 firm** (7 consecutive arcs same-arc 100%)
- Path P 6-param strict-conform: n=28 → **n=30** (V2 + V3 dispatches)
- Pattern D Forward Discipline #2 single-claim: n=28 → **n=30**
- CR-12 6-class lattice ECOSYSTEM-IMPORT: 5th → **6th** cumulative invocation
- W134 F27-A ECOSYSTEM-IMPORT precedent: 4th cumulative ratification
- CR-3 non-Phase-1-bootstrap satisfaction: 1st → **2nd** cumulative
- FM-21.a CronCreate defense: n/a this fire (cron `490fc8a5` cancelled)
- All others unchanged: FM-02 (c) n=21 / FM-20 n=22 / FM-17.f firm n=6 / Inline-bash quote-trap n=17 / Recursive promotion-fire dogfood n=7 / W134 F27-A 4 ratifications / W152 F29 lattice 6-class formal

**Files committed**:
- `.claude/hooks/cwc/kill-switch.sh` (10 LOC; verbatim cite-import + CRLF; Wave 75 cite)
- `.claude/hooks/cwc/steer.sh` (15 LOC; PYTHON_BIN adaptation + Wave 80 stderr-no-swallow)
- `.claude/hooks/cwc/track-read.sh` (13 LOC; PYTHON_BIN adaptation + Wave 82 stderr-no-swallow)
- `.claude/hooks/cwc/verify-gate.sh` (23 LOC; PYTHON_BIN adaptation + Wave 80 stderr-no-swallow)
- `docs/sota-installed-manifest.md` (§17 ADD active-adapted row distinguishing from dormant-verbatim)
- `docs/install-provenance.md` (this entry)

**Update triggers**: re-evaluate when (a) cwc upstream HEAD bumps beyond `ffd563d6` (re-pin cite + re-verify adaptations still apply); (b) Anthropic CC ships native session-checkpoint primitive that obviates cwc commit-on-stop wrapper; (c) `.claude/hooks/cwc/` vs `.claude/hooks/scripts/cwc/` path-split causes additional FM-20 incidents; (d) Wave 80/82 stderr-no-swallow fixes get upstreamed to anthropics/cwc-long-running-agents (would revert local adaptations to verbatim cite-import).

**Forward Top-7 (post-W153 F1; arc-opening continuation)**:
- 🥇 Phase 2 CR-7 trigger evaluation (Tier 1a+1b+1c+2 INSTALLED predicate test — cwc hooks now durable contributes to predicate)
- 🥈 Ship 15 untracked-rules CR-1 hygiene batch (1583 remaining untracked; subset `.claude/rules/*.md` first)
- 🥉 OPERATOR-SUPERVISED 🅳 Docker cutover EXECUTION (W150-F3)
- #4 W141A.2 Docker safety_guard hardening (operator-gated 8 P0)
- #5 W152-F5-FOLLOWUP L3 supply-chain install batch (operator-gated 13)
- #6 Wave 154 token-efficiency deep-dive (rtk init -g --hook-only --auto-patch alternative)
- #7 Memory stack health audit (operator-Docker-restart prereq)
