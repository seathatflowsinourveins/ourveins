# W330 MEGA-AUDIT — Remediation Plan

> Wave **W330** · 2026-05-19 · Three-tier P0/P1/P2 plan with operator-confirmation gates. Companion to `SYNTHESIS.md`. All actions referenced via `[D<n>]` for cross-link.

## §1 P0 — IMMEDIATE (this wave, operator-gated)

### D1 — Fix `CLAUDE_CODE_PROJECT_DIR` redirect (root cause of cross-session race)

**Status**: BROKEN — 3264 JSONLs in-repo at `.claude/projects/`; state-outside-repo dir is EMPTY. Stream A G1.

**Recommended (option a)**:
```powershell
# 1. Stop ALL active CC sessions (operator coordinates across terminals)
# 2. Rename in-repo dir
Move-Item Z:\claude-sota-installed\.claude\projects Z:\claude-sota-installed\.claude\projects.legacy
# 3. Verify env-var still set in CLAUDE.local.md
# 4. Relaunch CC via eee.ps1; CC should now write to Z:\claude-sota-installed-state\.claude\projects\
# 5. Verify: Test-Path Z:\claude-sota-installed-state\.claude\projects\Z--claude-sota-installed → should be True
# 6. If verified: optionally archive .claude/projects.legacy to a tarball; otherwise leave for 30-day cooldown then delete
```

**Risk**: relaunch interrupts in-flight work; recommended at session-boundary. **Reversible**: yes (rename back).

**Alternatives**:
- (b) Drop `$env:CLAUDE_CODE_PROJECT_DIR` from `CLAUDE.local.md:51` (revert W259-state-outside-repo design; accept JSONLs in-repo as canonical; update `.gitignore` retention)
- (c) Symlink `.claude/projects` → `..-state/.claude/projects` (workaround; doesn't fix the underlying env-var read)

**Recommendation**: (a). Investigate why CC writes in-repo despite env-var; file `anthropics/claude-code` issue if not user-error.

---

### D2 — Update GitNexus plugin (Windows FTS fix, Windows-CRITICAL)

**Status**: Installed `ed50a672` (v1.3.6); upstream HEAD `803f0bed` adds `fix(lbug): probe-then-load FTS extension on Windows (#1690) (#1692)`. Stream B.

**Action (operator CLI)**:
```
/plugin update gitnexus@gitnexus-marketplace
/reload-plugins
```

Per CLAUDE.md L18 W270 corollary: `/plugin update` may no-op on silent SHA drift; fallback to cache-delete + fresh-install:
```bash
rm -rf Z:/claude-sota-installed/.claude/plugins/cache/gitnexus-marketplace/gitnexus
# Then /plugin install gitnexus@gitnexus-marketplace
```

**Risk**: low — plugin update is the documented path. **Reversible**: yes (`/plugin install gitnexus@gitnexus-marketplace --version 1.3.6`).

---

### D3 — Upgrade Node v22.22.0 → v22.22.3

**Status**: 3 patches behind LTS head (security-relevant — openssl/undici typical surface). Stream E P0.

**Action (operator-elevated install)**:
- Download Node 22.22.3 LTS installer from `https://nodejs.org/dist/v22.22.3/node-v22.22.3-x64.msi`
- Install (replaces `v22.22.0`)
- Verify: `node --version` → `v22.22.3`
- Pre-flight check before install: `npm list -g --depth=0 > Z:/claude-sota-installed-state/.npm-globals-22.22.0.snapshot.txt` (so we can re-install if any global breaks)

**Risk**: low (patch release); npm globals occasionally need rebuild. **Reversible**: yes (re-install 22.22.0 MSI).

---

### D4 — Flip parallel-guard `exit 0` → enforced `exit 2` on 2nd-violation

**Status**: `tools/preagent-parallel-guard.mjs:178` hardcoded `process.exit(0)` — root cause of W325-A F1 SEV-1 baseline 0.0036. Stream C F25 + Stream D #3 + CLAUDE.md L34 self-documented.

**Recommended fix (per CLAUDE.md L34 W329-D proposed-fix)**:

Per-session state-file `.claude/state/parallel-guard-session-<sessionId>.json`:
```jsonc
{ "violations": 0, "lastViolationTs": null }
```

Logic:
- 1st violation: emit advisory, increment counter, `exit 0`
- 2nd+ violations within same session: emit ERROR with WARN context, `exit 2` (BLOCK the Agent call)

**Risk**: introduces a blocking hook on Agent dispatch — could break legitimate solo dispatches with multi-stream wording. **Mitigation**: detect multi-Agent-in-one-message at the **message** level via session JSONL parent-message-id (not per-Agent-call) — closes the false-positive that fired 8 times on THIS audit's compliant 8-Agent dispatch.

**Cardinal-rule-2 compliance**: edit to existing `tools/preagent-parallel-guard.mjs` (NOT under `.claude/hooks/`); already in scope per W325-A telemetry tooling. Not a new self-invented file.

**Reversible**: yes (revert single edit).

---

### D5 — Consolidate codex split-install

**Status**: `where.exe codex` returns BOTH `Z:\claude-sota-installed\.local\npm\codex` AND `C:\Users\42\AppData\Roaming\npm\codex`. `npm root -g` writes to `%APPDATA%\npm` → upgrades land in shadow location. Stream E P1 SEV-2.

**Recommended fix**:
```powershell
# Identify which install is active by date
Get-Item Z:\claude-sota-installed\.local\npm\codex.cmd | Select Name,LastWriteTime
Get-Item C:\Users\42\AppData\Roaming\npm\codex.cmd | Select Name,LastWriteTime
# Keep the newer; uninstall the older
# Recommended: keep %APPDATA%\npm (matches npm root -g default; future npm i -g works without surgery)
npm uninstall -g --prefix Z:\claude-sota-installed\.local\npm @openai/codex 2>$null
# OR if local-prefix install used different toolchain:
Remove-Item Z:\claude-sota-installed\.local\npm\codex*, Z:\claude-sota-installed\.local\npm\node_modules\@openai\codex -Recurse -Force
# Verify
where.exe codex  # should return ONLY %APPDATA%\npm path
codex --version  # confirm reachable
```

**Risk**: low; reversible by re-install. **Reversible**: yes.

---

## §2 P1 — NEXT WAVE (W331+)

### W331.1 — Add Δ-DPA-5 subagent_type pre-flight validator at dispatch site
- Source: `tools/preagent-subagent-validator.mjs` already exists; extend to fuzzy-match unknown names and emit `WARN: subagent_type 'X' not in allowlist; nearest: <top3>` before dispatch
- Cardinal-rule-2 compliant (lives in `tools/`, not `.claude/hooks/`)

### W331.2 — Wire `SubagentStop` hook for parallel-ratio telemetry feedback
- Per Stream G #3 + sca-v12.1 §6 Control-2 audit-logging
- `SubagentStop` fires when delegated subagent finishes → write row to `.claude/state/audit/<YYYY-MM-DD>.jsonl` with `{sessionId, agentId, subagent_type, parallel_batch_id, tool_calls, tokens, status}`
- Closes the W325-A telemetry feedback loop — parallel-ratio can be computed in near-real-time

### W331.3 — Reconcile enabledPlugins ↔ installed_plugins.json drift
- 45 keys in `settings.json:237-306` `enabledPlugins` absent from `installed_plugins.json` (Stream C F17)
- Add `SessionStart` hook: emit WARN with intersection-diff; surface drift in operator-visible message stream
- Decision: prune stale keys from `enabledPlugins` OR re-install missing plugins

### W331.4 — Re-enable 3 ECC hooks
- `stop:cost-tracker` + `stop:evaluate-session` + `post:session-activity-tracker` (Stream G #11)
- Edit `settings.json:7` `ECC_DISABLED_HOOKS` to remove these three
- Verify `/cost-report` + `/sessions` + `/insights` now show populated data

### W331.5 — Add OTEL metrics + logs exporters
- `settings.json` env: `OTEL_METRICS_EXPORTER=otlp` + `OTEL_LOGS_EXPORTER=otlp` + matching `_ENDPOINT` vars to Langfuse :3000
- Stream G #2

### W331.6 — Adopt `/devfleet` + `/orchestrate` for multi-stream waves
- Replace ad-hoc Agent fan-out with documented orchestration commands
- Add to wave-opening checklist in CLAUDE.md L37 status section
- Stream G #10 — directly addresses W325-A parallel-ratio SEV-1 baseline

### W331.7 — `git worktree prune` as SessionStart hook
- Per Stream A P0.2 — even though THIS session's prune returned empty, the hook is idempotent and prevents future leak
- Add to `settings.json:hooks.SessionStart[].hooks[]` after `context-mode-cache-heal.mjs`

### W331.8 — Mechanize one-worktree-per-session in `eee.ps1`
- Per Stream A P0.3 — session-lock file `.claude/state/session-lock-<branch>.json`
- Refuse launch when another live pid owns the same branch
- Pair with `Stop`-hook lock-release

---

## §3 P2 — DEFERRED (W332+)

### W332.1 — Apply Stream H coding-SOTA Edit-line proposals
- `tools/eee.ps1` add `Set-StrictMode -Version Latest` post-L17
- `tools/sca-v7-prelim.sh` add `IFS=$'\n\t'` + `shopt -s inherit_errexit` at L41
- `tools/preagent-subagent-validator.mjs:48` replace `setTimeout(...) → AbortSignal.timeout(...)`

### W332.2 — Index GitNexus for `Z:/claude-sota-installed`
- Per Stream F F-P1 — `gitnexus index .` unlocks knowledge-graph queries
- ~5 min one-shot; opens W331.9 (gitnexus session-JSONL ingestion for race-detection graph)

### W332.3 — 7 npm-global major-version bumps (per-package CHANGELOG review)
- pnpm 10→11, commitlint 20→21, chrome-devtools-mcp 0.x→1.0, ccusage 18→19, mem0 0.x→1.0, happy-coder 0.x→1.x, claude-agent-sdk 0.2→0.3
- Each is a BREAKING-change candidate; queue individual sca-v12.1 mini-verdict per package

### W332.4 — Evaluate `alirezarezvani/claude-skills` via sca-v12.1
- Stage-0 probe passed (HEAD `8aa92081`); full T0-T5 tier verdict deferred per Stream B
- Hold pending operator-priority signal

### W332.5 — Update context-mode v1.0.141 → v1.0.142
- Stream B; documented path: `/context-mode:ctx-upgrade` (CLAUDE.md L29)

### W332.6 — Stdio-MCP smoke-gate cron (Stream F F-P2)
- Weekly: send `initialize` to each of the 10 `npx -y` / `uvx` MCPs and assert `serverInfo`
- Closes the "silent-fail-on-cache-invalidation" hazard

### W332.7 — mattpocock/skills wording-polish refresh
- Installed `67bce91c80cd` → upstream HEAD `d54c497a`; low-impact (improved /handoff wording across 6 skills)
- Defer per Stream B

---

## §4 Operator-confirmation gates (recap)

Per CLAUDE.md (root): risky actions require explicit operator approval. Gates:

| Gate | Item | Action requires | Recommendation |
|---|---|---|---|
| G1 | D1 - rename `.claude/projects/` | Operator approval (relaunch required) | APPROVE |
| G2 | D2 - `/plugin update gitnexus` | Operator typed in CLI | APPROVE |
| G3 | D3 - Node 22.22.3 install | Operator approval (elevated installer) | APPROVE |
| G4 | D4 - parallel-guard exit-code flip | Operator approval (changes blocking behavior) | APPROVE w/ message-level matching |
| G5 | D5 - codex install consolidation | Operator approval (Remove-Item operation) | APPROVE |
| G6 | W331.* P1 items | Operator approval per item or batched | APPROVE batched after P0 lands |

## §5 Rollback plan

Each P0 item has explicit reverse path:
- D1: `Move-Item .claude\projects.legacy .claude\projects` + restart
- D2: `/plugin install gitnexus@gitnexus-marketplace --version 1.3.6`
- D3: re-install Node 22.22.0 MSI
- D4: `git revert` the single-line edit
- D5: `npm i -g @openai/codex --prefix Z:\claude-sota-installed\.local\npm`

All edits land on a separate branch (`goal/W330-remediation`) → squash-merge to `sota-converge-w310` after codex round-N approval per `git push --force-with-lease` discipline (CLAUDE.md L14).

## §6 Codex GPT-5.5 round-1 review dispatch

Pending — next orchestrator turn. Will invoke `Agent(subagent_type="codex:codex-rescue", prompt=...)` with:
- Synthesis + this remediation plan
- Operator-explicit directive: "question our rules and repo selection"
- Position-swap discipline per Δ-DPA-4 (evidence-order reversed if 2nd round fires)
- Expected verdict: APPROVE | REVISE | NEEDS-REVISION | BLOCK
