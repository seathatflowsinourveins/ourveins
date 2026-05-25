# Wave 97 Fan-3 Agent X3 — scripts/*-hooks-rewrite.py archaeology

STAND-IN-NOTICE: agent ran under CLAUDE_CODE_SUBAGENT_MODEL stand-in per CLAUDE.local.md ENV (g) (none set in env block but Wave 97 fleet may funnel); verdict origin = Sonnet (NOT codex CLI BRIDGE-MODE). Per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate: this is a READ-ONLY archaeology dispatch — no design surface edited; cross-model gate not load-bearing for read-only research probes per cardinal-rule-9 read-only research probe exception. Orchestrator may file 2nd-stage T1 if the disposition recommendation drives ship-class action.

## Script 1: scripts/codex-plugin-hooks-rewrite.py

### What it does
- Lines: 376
- Purpose: Idempotent durability layer that re-applies absolute Win32 paths to openai-codex plugin hooks.json files on every launcher pre-claude.exe invocation. Bypasses CC's POSIX-form `${CLAUDE_PLUGIN_ROOT}` injection on Windows (e.g., `/z/claude-sota-installed/...`) which breaks Node hook resolution. Two phases: (1) hooks.json rewrite (Wave 50 Fire 46), (2) .mjs source patches for openai-codex issues #191 + #245 (Wave 80).
- Caller: `tools/eee.ps1:614` (active wire) — runs pre-claude.exe with fail-closed exit 2 on `--check` failure
- Provenance per docstring: bog92qxq7 codex T1 BRIDGE-MODE real GPT-5.5 NEEDS-REVISION conf=0.91 verdict + Pattern A apply per `codex-t1-fix-forward-pattern.md`

### Sibling claude-sota check
- Exists at `Z:/claude-sota/scripts/codex-plugin-hooks-rewrite.py`: YES
- SHA: 97ddc124... (claude-sota) vs 1f0b67e7... (claude-sota-installed) — DIFFER (sibling has divergent content; installed has eee-runtime-specific Wave 80 patches)
- git log: sibling `d5ad386` "wave 50 fire 46 — durability layer for openai-codex hooks path-mangling fix per bog92qxq7 codex T1 BRIDGE-MODE GPT-5.5"; installed `46358c2` "wave 50 fire 46 — durability layer (eee runtime)" + `d298d47` "wave 50 fire 43 path-mangling actual-fix"
- REVERT-AND-REMOVE precedent: NO

### Upstream search
- `openai/codex-plugin-cc` (`Z:/repos/deps/codex-plugin-cc/`): HAS source .mjs files (session-lifecycle-hook.mjs, stop-review-gate-hook.mjs) BUT NO rewriter tooling. README has no Windows path-mangling workaround.
- `everything-claude-code` (`Z:/repos/deps/everything-claude-code`): HAS `scripts/hooks/plugin-hook-bootstrap.js` (the file being patched) BUT NO rewriter that fixes its POSIX-form `${CLAUDE_PLUGIN_ROOT}` interaction on Windows.
- `superpowers` hook-related skills: NO equivalent.
- `mcp__github__search_code "openai/codex-plugin-cc plugin-hook-bootstrap rewrite"`: total_count=0

### Classification
**Class B** — Novel eee-side glue with TIER-1 substrate.

Rationale: scripts patch a Windows-specific interaction between CC's `${CLAUDE_PLUGIN_ROOT}` POSIX-form injection and Node's require() resolution. Upstream codex-plugin-cc has the .mjs sources (TIER-1 substrate); this script is the eee-side runtime durability layer that no upstream provides. Wave 80 patches reference openai/codex-plugin-cc HEAD `807e03ac` — TIER-1 cite anchor present at lines 203, 239, 291, 324.

### Verdict
**KEEP-WITH-CITE-IMPORT-AMBER** (per CLAUDE.md Section 14.5)

Operator action:
- Document provenance in `docs/install-provenance.md` as CITE-IMPORT-AMBER from sibling claude-sota commit `46358c2` + Wave 80 P#3 extension
- Add header comment block citing TIER-1 upstream substrates at file:line + HEAD SHA
- TIER-1 cite (substrate): `Z:/repos/deps/codex-plugin-cc/plugins/codex/scripts/{stop-review-gate-hook.mjs, session-lifecycle-hook.mjs, lib/broker-lifecycle.mjs} @ HEAD 807e03ac` — already cited inline at script lines 203/239/291/324
- TIER-3-LOCAL-COMPOSITION glue: Win32 path absolutization + version-globbed cache discovery + idempotent backup + dual-runtime targeting (eee-novel patterns; HONEST-NON-FINDING gate per CR-12 step (iii) satisfied)

## Script 2: scripts/ecc-plugin-hooks-rewrite.py

### What it does
- Lines: 350
- Purpose: ECC companion to codex-plugin-hooks-rewrite. Normalizes active ECC hooks.json command strings so Windows node.exe never receives a bootstrap path computed from POSIX-form `${CLAUDE_PLUGIN_ROOT}` like `/z/claude-sota-installed/...`. Also patches `plugin-hook-bootstrap.js` to add a `getPluginRoot()` fallback function (the ECC bootstrap currently fails when CLAUDE_PLUGIN_ROOT is missing/POSIX). JSON-aware, idempotent.
- Caller: `tools/eee.ps1:652` (active wire) — runs pre-claude.exe alongside codex-plugin-hooks-rewrite

### Sibling claude-sota check
- Exists at `Z:/claude-sota/scripts/ecc-plugin-hooks-rewrite.py`: YES
- SHA: ddea7993... (claude-sota) == ddea7993... (claude-sota-installed) — IDENTICAL
- git log: sibling `062455b` "wave 52 runtime rescue — ECC plugin-hooks-rewrite + FM-22 codification"; installed `4b26416` "wave 52 runtime rescue (eee runtime) — ECC plugin-hooks-rewrite + env scrub"
- REVERT-AND-REMOVE precedent: NO

### Upstream search
- `openai/codex-plugin-cc`: N/A (this is ECC-side companion)
- `everything-claude-code` hook-bootstrap: `scripts/hooks/plugin-hook-bootstrap.js` IS the file being patched in-place. Upstream version uses `process.env.CLAUDE_PLUGIN_ROOT || process.env.ECC_PLUGIN_ROOT` with no fallback to __dirname-relative resolution. ECC README L390 claims "All hooks and scripts have been rewritten in Node.js for maximum compatibility" — Wave 52 evidence shows the rewrite still fails on Windows when CC injects `${CLAUDE_PLUGIN_ROOT}` in POSIX `/z/` form.
- `superpowers` hook-related skills: NO equivalent.

### Classification
**Class B** — Novel eee-side glue with TIER-1 substrate.

Rationale: runtime-rescue layer for an upstream ECC bug (loader:1386 hook failures on Windows). Upstream ECC's `plugin-hook-bootstrap.js` IS TIER-1 substrate; this script patches it with a `__dirname`-relative fallback (lines 154-167) AND normalizes ECC's inline-bootstrap command shape in hooks.json files. No upstream rewriter exists. FM-22 codification (sibling Wave 52) documents the failure mode.

### Verdict
**KEEP-WITH-CITE-IMPORT-AMBER** (per CLAUDE.md Section 14.5)

Operator action:
- Document provenance in `docs/install-provenance.md` as CITE-IMPORT-AMBER from sibling claude-sota commit `062455b`
- Add header comment block citing TIER-1 upstream substrate (`everything-claude-code/scripts/hooks/plugin-hook-bootstrap.js`) at file:line + HEAD SHA
- Note the upstream-bug-workaround nature explicitly per cardinal-rule-7 ("REPORT errors before routing around them")
- **Sister-action**: file upstream issue — ECC `plugin-hook-bootstrap.js` Windows POSIX-form `${CLAUDE_PLUGIN_ROOT}` resolution failure should be reported to `anthropics/everything-claude-code` as a bug; eee-side rewriter retires when upstream lands a fix
- TIER-1 cite (substrate): `everything-claude-code/scripts/hooks/plugin-hook-bootstrap.js`
- TIER-3-LOCAL-COMPOSITION glue: `__dirname`-relative fallback + inline-bootstrap-to-direct-command rewriting + dual-runtime targeting

## TIER-1 cite chain

- TIER-1-DIRECT substrate (Script 1): `Z:/repos/deps/codex-plugin-cc/plugins/codex/scripts/{session-lifecycle-hook.mjs, stop-review-gate-hook.mjs, lib/broker-lifecycle.mjs} @ HEAD 807e03ac`
- TIER-1-DIRECT substrate (Script 2): `Z:/repos/deps/everything-claude-code/scripts/hooks/plugin-hook-bootstrap.js`
- TIER-3-LOCAL-COMPOSITION (both): sibling claude-sota commits `d5ad386` (codex Wave 50 Fire 46) + `062455b` (ecc Wave 52)
- HONEST-NON-FINDING gate per CR-12 step (iii): codex-plugin-cc upstream search returned NO rewriter; ECC upstream returned NO rewriter; `mcp__github__search_code` total_count=0 — cite-import-AMBER admissibility gate satisfied

## Recommended operator follow-up (post-verdict)

1. Add cite-trail header block to both scripts citing TIER-1 substrate file:line + HEAD SHA per cardinal-rule-1
2. Append CITE-IMPORT-AMBER provenance entry in `docs/install-provenance.md` per CLAUDE.md Section 14.5
3. File upstream issues for both root causes (codex-plugin-cc Windows path-mangling + ECC plugin-hook-bootstrap.js POSIX `${CLAUDE_PLUGIN_ROOT}` resolution failure) — eventual retirement path per CR-9 install-risk discipline
4. Wave 52 iter1c "UNCLEAR-PROVENANCE" violation flag REMOVED — provenance now resolved via cite-import-AMBER with full Section 14.5 trail

VERDICT: complete

HANDOFF: handoff_to: orchestrator | output_mode: last_message | artifacts: [ARTIFACT-INLINE] | verdict_one_line: "DONE: codex-plugin-hooks-rewrite=KEEP-WITH-CITE-IMPORT-AMBER (Class B novel eee-side glue, TIER-1 codex-plugin-cc substrate, no upstream rewriter); ecc-plugin-hooks-rewrite=KEEP-WITH-CITE-IMPORT-AMBER (Class B upstream ECC bug workaround, TIER-1 ECC plugin-hook-bootstrap.js substrate, no upstream rewriter)"
