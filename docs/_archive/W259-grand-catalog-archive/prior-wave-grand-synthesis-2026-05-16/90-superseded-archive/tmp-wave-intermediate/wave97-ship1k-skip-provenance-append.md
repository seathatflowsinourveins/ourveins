

## 2026-05-08 Wave 97 — Ship 1K-skip: yamadashy/repomix already installed (Mia OVER #11; manifest L128 stale-PLANNED corrected)

### Origin

Wave 97 fan-2 Agent A (`tmp/wave97-fan2-A-cohort-saturation-2026-05-08.md`) flagged repomix as #2 ADOPT-NOW with note: "PLANNED in manifest L128 but never installed. 30k+ stars MIT, axis-1 PASS. Pairs natively with Serena + RTK + context-mode. One-liner: `npm install -g repomix@latest`. **Highest-ROI Wave 98 install**."

### Mia OVER #11 (orchestrator-side caught BEFORE install)

Pre-ship Mia probe via `which repomix` + `npm list -g | grep repomix`:
- `/c/Users/42/AppData/Roaming/npm/repomix` — file exists
- `npm list -g`: `+-- repomix@1.14.0`
- `repomix --version`: `1.14.0`
- File timestamp: `May 7 20:45` (installed prior session arc)

**repomix v1.14.0 IS already installed**. Wave 97 fan-2 Agent A's "PLANNED but never installed" claim was an OVER on the operational state.

This matches the pattern of Wave 97 fan-3 Mia OVER catches:
- promptfoo (already at v0.121.8 npm-global)
- osv-scanner (already at .local/bin/osv-scanner.exe)
- repomix (NEW — this catch; already at npm-global v1.14.0)

### TIER-1 SOTA cite chain (live verified)

- **TIER-1-DIRECT**: `https://github.com/yamadashy/repomix` 24,519★ MIT permissive
- **TIER-1-DIRECT**: `repomix --version` returns `1.14.0` post-Mia probe
- **TIER-1-DIRECT**: `gh release list --repo yamadashy/repomix --limit 1` returns `v1.14.0` (latest tag matches installed)
- **TIER-1-DIRECT**: `gh api repos/yamadashy/repomix --jq .pushed_at` returns `2026-05-08T17:40:19Z` (active maintenance)

### Edit (single file: `docs/sota-installed-manifest.md`)

Manifest L128 corrected forward-only per port-note-discipline §6:

```diff
-| Repomix (codebase pack) | npm install -g | `npm install -g repomix@latest` | https://github.com/yamadashy/repomix | PLANNED |
+| Repomix (codebase pack) | npm install -g | `npm install -g repomix@1.14.0` (installed at /c/Users/42/AppData/Roaming/npm/repomix May 7 20:45) | https://github.com/yamadashy/repomix | INSTALLED-VIA-NPM v1.14.0 [VERIFIED 2026-05-08 via `repomix --version` — Wave 97 Ship 1K-skip Mia OVER #11 catch: prior PLANNED status was stale; repo confirmed 24,519★ MIT permissive @ pushed 2026-05-08T17:40:19Z via gh api] |
```

### CR-9 install-risk LOW (no install action; manifest correction only)

- Doc-only edit
- No install or modification
- Reversible via single line revert

### Operational impact

| Layer | Pre-Ship-1K-skip | Post-Ship-1K-skip |
|---|---|---|
| repomix availability | ALREADY INSTALLED v1.14.0 (operational) | UNCHANGED — operational |
| Manifest L128 status | PLANNED (stale; drifted) | INSTALLED-VIA-NPM v1.14.0 with cite-anchor |
| Wave 97 fan-2 Agent A "ADOPT-NOW" claim | Claim was OVER (already installed) | Corrected forward-only via manifest update + this provenance |

### No ship action needed

repomix is already operational. Wave 97 fan-2 Agent A's ADOPT-NOW recommendation is satisfied by pre-existing install. Manifest correction closes the discrepancy.

### Cardinal-rule compliance

- **CR-1**: TIER-1-DIRECT live cite chain (gh api + npm list + filesystem)
- **CR-3**: doc-only edit; no design surface needing T1 e2e (edit is forward-only audit-trail correction per port-note-discipline §6)
- **CR-7**: Phase 1 — manifest correction
- **CR-8**: ADAPTED-FROM-SOTA — manifest accuracy
- **CR-9**: install-risk LOW (no install; correction only)
- **CR-10**: research-first — Mia probe BEFORE writing manifest correction
- **CR-11**: META-process SOTA — Mia OVER caught + documented per cardinal-rule 7 "REPORT errors before routing around them"

### Wave 97 Ship 1K-skip — 20th ship in this session arc

| Wave | Commit | Ship |
|---|---|---|
| 86-96 | (9 ships per prior provenance) | |
| 97-1A through 97-1F-correction | (10 ships per prior provenance) | |
| **97-1K-skip** | **THIS** | **1K-skip — repomix Mia OVER #11; manifest L128 stale-PLANNED → INSTALLED-VIA-NPM v1.14.0** |

### Cumulative Mia OVER catches in Wave 97 = 11

1. ANTHROPIC_SMALL_FAST_MODEL — already set Wave 82a
2. session-report plugin — upstream missing manifest
3. explanatory-output-style — NOT dormant (caught by codex T1)
4. promptfoo + osv-scanner — already installed
5. effortLevel/alwaysThinkingEnabled — already set
6. MAX_THINKING_TOKENS — DEPRECATED for Opus 4.7
7. round-robin distributes-3-accounts — FALSE under unequal priorities
8. fan3-X1 caught fan-2 B's `claude-settings.md:1071` → L979 (FM-20 path-drift)
9. fan3-X2 brief's `--integration-options="--skills"` flag DOES NOT EXIST in v0.8.7
10. Pattern A F1 selective-stage discipline failure (Ship 1F)
11. **NEW**: repomix already installed v1.14.0 (manifest L128 stale-PLANNED)

### Outstanding queue (post Ship 1K-skip)

- **Ship 1J-followup** (operator-decision): equalize active Claude account priorities for TRUE round-robin burst-distribution. NOT auto-shipping — operator semantics (priorities likely encode plan-tier/quota; equalizing without operator authority would override operator semantics).

### Update triggers

Re-evaluate when:
- repomix v2.0+ ships with breaking changes (would re-pin)
- Manifest audit surfaces additional stale-PLANNED entries
- Future Mia OVER catches recur at n≥3 — promote "verify-installed-before-claiming-PLANNED" to mechanical audit-action-loop hook
