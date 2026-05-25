# Wave 184 Agent B Codex Bridge Audit

## §1 — Dispatch mode

BRIDGE-MODE FULL.

This audit was performed by the active Codex bridge session over the local workspace. I did not mutate runtime configuration, move hook files, or edit `.claude/settings.json`; the only write is this artifact.

Honesty note: no nested external `codex exec` subprocess was launched from the shell. The T1 gate is satisfied by this active Codex/GPT bridge execution, not by a second CLI invocation.

## §2 — Codex CLI invocation used

No external CLI subprocess was used. Equivalent intended invocation shape:

```powershell
codex exec --ephemeral -p deep-review-exec --color never < W184-hook-rescue-plan.txt
```

Local command evidence gathered with read-only PowerShell/rg probes:

- `.claude/settings.json` hook registrations around `PreToolUse`, `UserPromptSubmit`, `SessionStart`, and `PreCompact`.
- `.claude/hooks/scripts/*.py` target hook line counts and sibling-cite probes.
- `.claude/plugins/installed_plugins.json`, `.claude/settings.json`, and plugin cache paths for `intelligent-compact`.
- `.local/cwc/` README/config files for CWC presence and wiring.
- `Z:/repos/deps/CLIProxyAPI/` HEAD/config/source probes for auth recovery primitives.

## §3 — Verdict JSON

```json
{
  "verdict": "NEEDS-REVISION",
  "confidence": 0.89,
  "prescribed_edits": [
    {
      "axis": 1,
      "edit": "Do not describe the five-hook retirement as a single unconditional removal. Split it into backup-only first, then remove registrations only after each retired behavior has a verified replacement or an explicit accepted loss. Keep the sibling-archaeology REVERT check and n=2 same-shape evidence as hard preconditions.",
      "rationale": "All five target files exist with the claimed LOC counts: precompact_guard.py 77, precompact_hint_emitter.py 169, sessionstart_compact_hint_reader.py 219, userpromptsubmit_compact_threshold.py 280, context_window_guard.py 102. All five are wired in live settings: context_window_guard under PreToolUse at .claude/settings.json:352-357, userpromptsubmit_compact_threshold at .claude/settings.json:448-455, sessionstart_compact_hint_reader at .claude/settings.json:466-473, and the two PreCompact hooks at .claude/settings.json:519-530. The sibling-cite concern is directionally valid because the local feedback file bans sibling Z:/claude-sota cites inside this runtime at .claude/projects/Z--claude-sota-installed/memory/feedback_no_sibling_claude_sota_cite_within_installed_runtime_2026_05_13.md:8-20 and lists the anti-pattern at lines 35-38."
    },
    {
      "axis": 2,
      "edit": "Correct Option A from a claimed fcakyon/intelligent-compact install to the observed plugin identity and source: intelligent-compact@claude-settings from fcakyon/claude-codex-settings. Treat it as installed+enabled for PreCompact priority preservation, not as a replacement for every removed hook behavior.",
      "rationale": "settings.json enables intelligent-compact@claude-settings at .claude/settings.json:572 and maps claude-settings to github repo fcakyon/claude-codex-settings at .claude/settings.json:648-652. installed_plugins.json records intelligent-compact@claude-settings installed at .claude/plugins/cache/claude-settings/intelligent-compact/1.0.0 with version 1.0.0 and gitCommitSha 9ad3323e at .claude/plugins/installed_plugins.json:314-322. Its hooks.json wires only PreCompact at .claude/plugins/cache/claude-settings/intelligent-compact/1.0.0/hooks/hooks.json:2-14, and its script emits preservation instructions at lines 18-70, so it does not cover UserPromptSubmit threshold gating or SessionStart compact-hint rehydrate by itself."
    },
    {
      "axis": 3,
      "edit": "For cross-session preload replacement, name CWC PROGRESS.md as installed reference guidance, not live root wiring; name native autoMemory as enabled but no root MEMORY.md found; do not claim claude-mem is installed unless a concrete plugin/package path is found.",
      "rationale": "CWC exists at .local/cwc and its CLAUDE.md tells sessions to read/create PROGRESS.md at .local/cwc/claude-code-config/.claude/CLAUDE.md:7, with update discipline at lines 20-21. The CWC README classifies Agent-maintained handoff as CLAUDE.md plus commit-on-stop.sh at .local/cwc/README.md:38-40 and explains PROGRESS.md handoff at lines 56-58. Live root settings only show openai-codex SessionStart and other local entries at .claude/settings.json:477-505, not CWC root hooks. settings.json has autoMemoryEnabled true at .claude/settings.json:673-677, but no root MEMORY.md or .claude/MEMORY.md was present in the read probe."
    },
    {
      "axis": 4,
      "edit": "Fix the dependency path and recovery ordering: probe Z:/repos/deps/CLIProxyAPI, not clipraxy-api; prefer API-key direct fallback for fastest service restoration if valid keys are available, while separately scheduling OAuth re-login/refresh repair for fleet health.",
      "rationale": "Z:/repos/deps/clipraxy-api and cliproxy-api were absent; Z:/repos/deps/CLIProxyAPI exists at HEAD 785b00c3127eea6aa207f1207ead8a2aa93690a3 with an untracked .codex-build directory. CLIProxyAPI exposes OAuth login flags for Codex/Claude/Antigravity/Kimi at Z:/repos/deps/CLIProxyAPI/cmd/server/main.go:77-85 and shared login options at lines 442-448. It also documents OAuth/file auth auto-refresh workers at Z:/repos/deps/CLIProxyAPI/config.example.yaml:102-104 and registers refresh lead providers for codex, claude, gemini, antigravity, and kimi at Z:/repos/deps/CLIProxyAPI/sdk/auth/refresh_registry.go:9-15. Direct API-key config is explicitly supported at config.example.yaml:38-42, codex-api-key at 167-184, and claude-api-key at 185-190. Existing service logs show 10 auth entries and 0 Gemini/Claude/Codex keys, so key fallback is a config-add path, not already active."
    }
  ],
  "anti_patterns_caught": [
    "Sibling-path citation bleed from installed runtime to Z:/claude-sota without local/upstream HNF gate",
    "Treating installed plugin presence as equivalent to full behavioral replacement",
    "Conflating CWC reference installation with live root hook wiring",
    "Misspelled dependency path clipraxy-api masking actual CLIProxyAPI source tree",
    "Claiming exact OAuth 401 fleet state without local line-citable evidence",
    "All-or-nothing hook retirement across different event slots"
  ],
  "severity": "P1"
}
```

Axis findings:

- Axis 1: NEEDS-REVISION. The backup+remove idea is directionally correct for sibling-bleed risk, but the plan must not retire behavior blindly. The five hooks are live in three slots and one PreToolUse entry: `.claude/settings.json:352-357`, `.claude/settings.json:448-455`, `.claude/settings.json:466-473`, `.claude/settings.json:519-530`. The ban on sibling cites is real and local: `.claude/projects/Z--claude-sota-installed/memory/feedback_no_sibling_claude_sota_cite_within_installed_runtime_2026_05_13.md:8-20`.
- Axis 2: NEEDS-REVISION. Option A is installed and enabled, but the claim should be corrected to `intelligent-compact@claude-settings` from `fcakyon/claude-codex-settings`, not `fcakyon/intelligent-compact`: `.claude/settings.json:648-652`, `.claude/plugins/installed_plugins.json:314-322`. It wires only a PreCompact hook: `.claude/plugins/cache/claude-settings/intelligent-compact/1.0.0/hooks/hooks.json:2-14`.
- Axis 3: NEEDS-REVISION. CWC is installed as a local reference tree and gives PROGRESS.md handoff discipline, but the root runtime is not wired to those hooks. Native autoMemory is enabled at `.claude/settings.json:673-677`; no root `MEMORY.md` or `.claude/MEMORY.md` was found. No concrete `claude-mem` installation evidence was found in settings or installed plugin manifests.
- Axis 4: NEEDS-REVISION. The requested `clipraxy-api` path is absent; use `Z:/repos/deps/CLIProxyAPI`. It has both OAuth repair primitives and API-key fallback config. API-key fallback is the faster restore if real keys exist, because it avoids browser OAuth/account repair; OAuth re-login remains the right fleet-health fix.

## §4 — Anti-patterns caught

- Sibling cite bleed: the local feedback file bans `Z:/claude-sota/...` citations inside this installed runtime and requires local/upstream-first citation discipline.
- Wire-status inflation: an enabled plugin was treated as a full replacement without checking its hook slot and script behavior.
- Reference-vs-runtime confusion: CWC exists under `.local/cwc/`, but root `.claude/settings.json` does not show CWC hooks as the active cross-session preload path.
- Path typo trap: `clipraxy-api` and `cliproxy-api` do not exist under `Z:/repos/deps`; `CLIProxyAPI` does.
- Unverified incident claim: I did not find line-citable evidence proving exact "8/8 OAuth 401 since 2026-05-08" or "aperant_poller DEAD since 2026-05-12 09:35" in the searched files, so those remain unverified incident inputs.

## §5 — Cross-model gate satisfaction status

SATISFIED AS BRIDGE-MODE T1, with the dispatch honesty caveat above: this is the active Codex bridge review, not a nested shell-launched Codex CLI subprocess.

Gate result: NEEDS-REVISION, confidence 0.89, severity P1.

## §6 — Pattern A fix-forward recommendation

Apply all four prescribed edits in one atomic planning revision:

1. Convert Axis 1 into staged backup + registration removal with per-behavior replacement checks.
2. Correct Axis 2 installation identity and limit Option A to PreCompact priority preservation.
3. Mark Axis 3 replacement status as CWC reference-installed, native autoMemory enabled, claude-mem unverified/not found.
4. Correct Axis 4 repo path to `Z:/repos/deps/CLIProxyAPI` and choose API-key direct fallback for fastest recovery if valid keys exist, with OAuth repair as a parallel fleet-health track.

No code/config edit should happen until the revised plan explicitly lists accepted behavior losses for any retired hook function not covered by the replacement.

## §7 — Recovery path if FM-17.d watchdog stall

If FM-17.d watchdog stalls during implementation:

1. Stop hook/config mutation work and keep `.claude/settings.json` unchanged.
2. Preserve current evidence in the artifact and append the last completed axis plus next command to the active handoff file.
3. Use the already-installed `codex_stuck_detector.py` UserPromptSubmit hook as the local stall signal path; it is wired at `.claude/settings.json:457-462`.
4. Resume from the staged plan above: backup first, then one hook slot at a time, verifying settings diff after each logical unit.
5. For auth recovery, bypass stalled OAuth diagnosis by testing a direct API-key path only if a valid key is available outside committed files; otherwise fall back to CLIProxyAPI OAuth re-login flags from `cmd/server/main.go:77-85`.
