
## Wave 153 Fire 10 — Manifest DISABLED-BUT-INSTALLED state update (V3 ADVERSARIAL SCOPE-DOWN of V2; per V2-F8 #2 prescription review)

**Date**: 2026-05-11
**Cron iteration**: `9eb2e02a` 11/N
**Class**: META-process audit + manifest state correction (NO new status class per V3 CR-8 novelty risk catch)
**Risk class**: LOW (doc-only manifest correction; cache + settings.json + provenance unchanged)

### V2+V3 Path P dispatch

| Voice | bg task | Wall-clock | Tokens | Exit | Verdict | Confidence |
|---|---|---|---|---|---|---|
| V2 design proposer | `b40i0gb3s` | ~70s | 49,411 | 0 | APPROVE-DESIGN (5 edits / new DISABLED-BUT-INSTALLED status class) | 0.91 |
| V3 ADVERSARIAL | `bmw5qso2k` | ~80s | 75,602 | 0 | F10-SCOPED-DOWN (4 edits / Anthropic official `INSTALLED; DISABLED in enabledPlugins` language; NO batch close note) | 0.87 |

Both via Path P 6-param strict-conform (codex CLI v0.130.0 DEFAULT profile + `--skip-git-repo-check --color never` + 300s timeout + foreground+tee + JSON-strict EOF schema).

### Convergence consensus

**ACTION**: V3 SCOPE-DOWN wins per FM-09 base rate. NO new `**DISABLED-BUT-INSTALLED**` status class (V3 caught CR-8 novelty risk; Anthropic CC official plugin docs at `code.claude.com/docs/en/plugins-reference` L760-763 + L796-799 already define disable-without-uninstall as standard plugin operation). Use `**INSTALLED; DISABLED in enabledPlugins**` instead.

**RECURSIVE FM-09 CATCH (2nd in W153)**: V3 F10 caught V2-F8 prescription #2 ("Update docs/sota-installed-manifest.md rows 111-113 and any cwc-makers row to reflect DISABLED-BUT-INSTALLED cache state") with 3 overclaim corrections:

1. cwc-makers row existence ASSUMED (PROBED FALSE — 0 occurrences in manifest before F10)
2. DISABLED-BUT-INSTALLED status class is unnecessary CR-8 novelty (Anthropic CC docs already cover)
3. Risked duplicating F9's detailed cache/disposition/re-enable table

**FM-09 ladder: 20/20 → 21/21 firm** (11th consecutive arc; 2nd RECURSIVE V3-catches-V3-prior-fire in W153 — F9 caught V3-F8 #4 overclaim; F10 caught V2-F8 #2 overclaim).

### Applied edits (V3 SCOPE-DOWN convergence)

4 edits to `docs/sota-installed-manifest.md`:

1. **L111 clickhouse**: `**INSTALLED**` → `**INSTALLED; DISABLED in enabledPlugins**` + appended disable note (commit `e191378` + settings.json:527 + F8 SRA + CR-12 PARTIAL-OVERLAP + F9 pointer)
2. **L112 outputai**: same pattern with settings.json:528 + CR-12 ACTIVE-HOOK/FRAMEWORK-CONTEXT (V3 NEW candidate class n=1)
3. **L113 qdrant-skills**: same pattern with settings.json:529 + CR-12 PARTIAL-OVERLAP
4. **NEW row after L113 cwc-makers**: `**INSTALLED; DISABLED in enabledPlugins**` + Wave 128 Ship A install metadata (settings.json:608 + installed_plugins.json:257-266 gitCommitSha `0e7bbeafaebc92a13c910c536f36446b151212f6` scope=project) + CR-12 GENUINELY-NEW-BUT-DEMAND-ABSENCE (V2 NEW candidate class n=1) + F9 pointer

NO batch close note per V3 prescription #3 (unnecessary; total plugin count drift handled inline per row).

### Mia pre-apply ladder advance

n=334 → **n=335** (V3 caught V2-F8 #2 prescription cwc-makers row existence assumption — manifest had 0 occurrences before F10). Initial orchestrator-side Mia probe earlier this fire confirmed n=335 candidate; V2 deeper probe found Wave 128 install metadata at settings.json:608, validating V2's full row content for cwc-makers; V3 confirmed ADD-NEW-ROW decision.

### Verdict files persisted

- `.claude/state/codex_consult_w153_f10_manifest_update_v2_OUT.txt` (V2 1017 LOC / 49,411 tok; APPROVE-DESIGN 0.91)
- `.claude/state/codex_consult_w153_f10_manifest_update_v3_adversarial_OUT.txt` (V3 11,716 LOC / 75,602 tok; F10-SCOPED-DOWN 0.87)

### Files in commit

- `docs/wave153-f10-manifest-state-update-2026-05-11.md` (NEW; ship doc with V2+V3 verdicts + convergence + Mia annotations + ladders)
- `docs/sota-installed-manifest.md` (4 edits per V3 SCOPE-DOWN: 3 row updates + 1 new row)
- `docs/install-provenance.md` (this F10 entry append)

### Cardinal-rule conformance

CR-1 ✓ TIER-1-DIRECT cite trail / CR-3 ✓ V2+V3 PARALLEL (8th non-Phase-1-bootstrap) / CR-5 ✓ manifest update is bootstrap-class operator-discipline doc maintenance / **CR-8 ✓ V3 ADVERSARIAL caught V2's CR-8 novelty risk** (avoided new status class; uses Anthropic official disable language) / CR-9 LOW risk / CR-10 ✓ research-first / CR-11 ✓ META-process recursive FM-09 catch (2nd in W153) / CR-12 PARTIAL-OVERLAP per V3

### FM defense

FM-02 (b)+(c) ✓ atomic narrow `--only` via ship script wrapper / **FM-09 V3 ADVERSARIAL 20/20 → 21/21 firm (2nd RECURSIVE catch in W153)** / FM-15 ✓ / FM-17.f orchestrator-direct V2+V3 ✓ / FM-21.a CronCreate defense ✓ / FM-21.b STATE PROBE ✓ / **FM-20 path-drift cascade defense triggered cross-fire** (V3 caught V2-F8 #2 cwc-makers row existence assumption)

### Revert path

`git revert <commit-sha>` <30s. settings.json + cache + provenance + F7/F8/F9 docs unchanged.

---
