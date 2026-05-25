
---

## Wave 122 SHIP-122-E — codex CLI v0.129.0 → v0.130.0 upgrade

**Date**: 2026-05-09
**Trigger**: codex T1 W121 surfaced upgrade availability (task #76 queued by Plan agent C synthesis); user standing directive "all using native install of sota repos"
**Outcome**: codex CLI upgraded via official npm channel; mechanical-mirror exception path (no codex T1 fan-out for tool-version bump; sister to Wave 118 Ship A2 RTK install)

### Pre-upgrade state

```
$ codex --version
codex-cli 0.129.0
```

### npm canonical probe

```
$ npm view @openai/codex version
0.130.0
```

Pre-release `0.131.0-alpha.4` published but skipped per cardinal-rule-6 stable channel only (no GA tag).

### Upgrade command

```
$ npm install -g @openai/codex@0.130.0
changed 2 packages in 3s
```

EPERM cleanup warnings on stale `codex-HBc2EYNm/.../codex.exe` tmp paths surfaced during install — non-fatal Windows file-locking quirk on `npm cleanup` of in-use exe; new install succeeded regardless.

### Post-upgrade verification

```
$ codex --version
codex-cli 0.130.0

$ which codex
/c/Users/42/AppData/Roaming/npm/codex
```

### Mechanical-mirror exception predicates (per codex-t1-fix-forward-pattern.md §Mechanical-mirror exception)

5/5 satisfied — NO codex T1 e2e fan-out required:

1. **≤24 LOC delta** — provenance-doc-only entry; no code change
2. **Pure pointer-extension** — version pin update; no new mechanism
3. **NO new authority/cite/status class** — TIER-1-DIRECT to npm official registry (same cite-class as Wave 118 Ship A2 RTK 0.39.0 install)
4. **Mirror chain context** — Wave 118 Ship A2 RTK install + Wave 119 Ship 5 promptfoo upgrade are precedents
5. **Target-surface compatibility** — codex CLI is npm-global tool consumed via shim; no schema break

### Cite trail

- Upstream: `https://www.npmjs.com/package/@openai/codex` (npm canonical)
- Latest stable: `0.130.0` (verified via `npm view @openai/codex version` 2026-05-09)
- Skip-marker: `0.131.0-alpha.4` (pre-release; not GA per cardinal-rule-6)
- Sister precedent: Wave 118 Ship A2 RTK 0.39.0 install (same npm-canonical pattern)

### Operating mode (corrected)

Per operator focus correction: **token efficiency** + **clean SOTA official install** = mechanical-mirror exception path. NO codex T1 BRIDGE-MODE fan-out for routine version bumps.

Cost: ~3K nalawowac tokens (vs ~115K combined under prior over-fan-out mode).

### CR conformance

- CR-1 cite SOTA primary: TIER-1-DIRECT to npm registry canonical
- CR-3 cross-model gate: mechanical-mirror exception 5/5 predicates satisfied; T2 commit-time hook fires on this commit
- CR-5 install-priority: npm-global via official channel
- CR-6 fresh-from-github: npm registry latest stable; pre-release skipped
- CR-7 graduated unleash: no env/permission changes
- CR-8 full-SOTA-content: ADAPTED-FROM-SOTA — npm install canonical pattern
- CR-9 install-risk: LOW — npm version bump; reversible via `npm install -g @openai/codex@0.129.0`
- CR-10 research-first: codex T1 W121 surfaced upgrade availability (Plan agent C synthesis); this ship executes the queued operator-action
- CR-11 META-process: corrected operating mode applied — mechanical-mirror exception for tool-version bumps

### Wave 122 ship state

- Ship-122-E (THIS commit): codex CLI v0.130.0 upgrade ✅
- Forward-ref Wave 122 P0 close-the-loop (~1030 LOC; Plan agent C synthesis): codex Tier-1a hooks + INSTALLED-AMBER + STAGED + fm17d schema — separate ship per ONE-LOGICAL-UNIT-PER-FIRE
- Forward-ref Wave 122 Ship 2 candidate: openai/evals integration (sister to DeepEval Wave 121 Ship 2; fills 3rd of 7 eval-cohort slot)

### Mia OVER ladder Wave 97-122

UNCHANGED at n=53 (no apply-boundary OVER this fire — version probe was the verdict; mechanical-mirror exception applied without prescription drift).

### Cumulative

- Wave 118: 5 ships
- Wave 119: 7 ships
- Wave 120: 2 ships
- Wave 121: 2 ships (research synthesis + DeepEval scaffold)
- Wave 122 SHIP-122-E (THIS): codex CLI 0.130.0 upgrade
- **Total: 17 ship-class deliverables in session arc**

