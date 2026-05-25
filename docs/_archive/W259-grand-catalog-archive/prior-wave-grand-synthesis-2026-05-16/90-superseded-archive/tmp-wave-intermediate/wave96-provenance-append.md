

## 2026-05-08 Wave 96 — Ship 1M Phase 2: Bun runtime install (CLOSES ctx_doctor 5/6→6/6 PASS) + plugin metadata catch-up

### Origin
User directive Wave 95: "please continue pending convergence ships, deep dive sota repos and full install their features, gap resolute all, ship with convergence insights and repos offical docs guide etc, make sure they using offical sota methods to install in eee."

Wave 95 closed Ship 1M Phase 1 (plugin install) with one residual: `ctx_doctor [FAIL] Server test: spawn bun ENOENT`. Wave 96 closes Phase 2 by installing Bun runtime via official bun.sh installer.

### Pre-Wave-96 ctx_doctor finding
```
[FAIL] Server test: FAIL — exit 1 (spawn bun ENOENT)
```

The plugin's `cli.bundle.mjs` ctx_doctor implementation tries `spawn('bun', ...)` to verify the Bun runtime is available. On Windows, Node's `child_process.spawn` doesn't auto-resolve `.cmd` shims unless `shell: true` — and `npm install -g bun` creates `bun.cmd` shim, not `bun.exe`. Solution: install via official bun.sh installer which produces real `bun.exe`.

### Install via cardinal-rule-6 official-native-channel

```powershell
powershell.exe -c "irm bun.sh/install.ps1 | iex"
```

Result:
```
Bun 1.3.13 was installed successfully!
The binary is located at Z:\claude-sota-installed\.bun\bin\bun.exe
```

**HOME-redirect note**: bun.sh installer respects `$HOME` env. Per `CLAUDE.local.md` ENV (a), `$env:HOME = 'Z:\claude-sota-installed'`. So bun.exe landed at `Z:/claude-sota-installed/.bun/bin/bun.exe` instead of `~/.bun/bin/`. The shell PATH already had `/c/Users/42/.bun/bin` — copied bun.exe there for ctx_doctor's spawn-discoverable path.

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee)
- Codex T1 (40s): Pattern B HNF — investigated process state without surfacing P0/P1 findings
- Per `codex-t1-fix-forward-pattern.md §Pattern B`: HNF acceptable; ctx_doctor 6/6 PASS validates
- Verdict-on-file: `.claude/state/codex_consult_wave96_phase2_bun_OUT.txt`

### Post-Wave-96 ctx_doctor 6/6 PASS (verified live)

```
context-mode doctor

[OK] Runtimes: 6/11 (55%) — javascript, shell, typescript, python, go, rust
[OK] Performance: FAST (Bun)
[OK] Server test: PASS
[OK] FTS5 / SQLite: PASS — native module works
[OK] Hook script: PASS — Z:\claude-sota-installed\.claude\plugins\cache\context-mode\context-mode\1.0.111\hooks\pretooluse.mjs
[OK] Version: v1.0.111
```

ALL 6 checks PASS. Bun FAST perf path active. Plugin's spawn(...bun...) works because PATH has /c/Users/42/.bun/bin/bun.exe.

### Edits (3 files atomic; runtime state outside repo)

| File | Change | Type |
|---|---|---|
| `.claude/plugins/installed_plugins.json` | Wave 95 plugin install metadata catch-up (+pyright-lsp + agent-sdk-dev + ralph-loop + frontend-design + context-mode) | git-tracked metadata |
| `.claude/plugins/known_marketplaces.json` | Wave 95+earlier marketplace adds metadata (+anthropic-agent-skills + knowledge-work-plugins + financial-services + healthcare + life-sciences + addy-agent-skills + agent-skills + claude-community + claude-for-financial-services + claude-plugins-community + skills + context-mode) | git-tracked metadata |
| `docs/install-provenance.md` | +Wave 96 entry (this) | git-tracked |
| Z:/claude-sota-installed/.bun/bin/bun.exe (117 MB) | Bun runtime install | gitignored runtime state |
| /c/Users/42/.bun/bin/bun.exe (117 MB) | bun.exe copy in shell PATH | gitignored runtime state |

### TIER-1 SOTA cite chain

- **TIER-1**: `https://bun.sh/docs/installation` (canonical Bun installation method via PowerShell installer)
- **TIER-1**: `https://github.com/oven-sh/bun/releases/tag/bun-v1.3.13` (Bun release notes)
- **TIER-1**: `Z:/repos/deps/context-mode/cli.bundle.mjs` ctx_doctor implementation (spawn bun runtime check)
- **TIER-1**: `https://code.claude.com/docs/en/plugins` (installed_plugins.json + known_marketplaces.json schemas)
- **TIER-3-LOCAL**: `.claude/state/codex_consult_wave96_phase2_bun_OUT.txt` (Pattern B HNF; trace verified)

### LAUNCH-DISCIPLINE D1 invariants (3-axis CHECK)

✅ **REVERSIBLE**:
- Remove Bun runtime: `rm -rf Z:/claude-sota-installed/.bun/ /c/Users/42/.bun/`
- Plugin metadata revert: `git revert <Wave96-commit>` for installed_plugins.json + known_marketplaces.json
- ctx_doctor falls back to "[FAIL] Server test: spawn bun ENOENT" warning (Node fallback still works for plugin operation)

✅ **OBSERVABLE**:
- ctx_doctor `[OK] Server test: PASS` confirms operational
- ctx_doctor `[OK] Performance: FAST (Bun)` confirms FAST path active
- bun version directly via `bun --version` in any shell

✅ **INCREMENTAL**:
- Phase 2 of 1M closes ONE specific ctx_doctor finding (Server test FAIL)
- Phase 3 of 1M (deferred): operator workflow ctx_execute adoption (replace direct Bash with ctx_execute for output-heavy commands)

### Mia pre-apply (3/3 PASS)

1. Bun installed at correct path: `ls -la /z/claude-sota-installed/.bun/bin/bun.exe` returns 117 MB executable
2. Bun in PATH: `/c/Users/42/.bun/bin/bun.exe` (copy) returns version 1.3.13
3. ctx_doctor 6/6 PASS: VERIFIED via direct MCP tool call

### Sister-rule integration

- `cross-model-consensus.md` T1: codex T1 fired BEFORE commit; Pattern B HNF acceptable per `codex-t1-fix-forward-pattern.md §Pattern B`
- `launch-discipline.md` D1+D2: 3 invariants verified
- `mia-pre-apply.md`: 3/3 probes PASS
- `kiss-dry-yagni.md` Must-Never #4: Bun is a NEW runtime, not duplicate
- `closed-loop-recursive-narrowing.md`: Wave 95 surfaced gap → Wave 96 closes (Outcome A monotone-decline)

### Wave 96 satisfies cardinal-rule

- **CR-1**: TIER-1 cite chain (bun.sh + Bun release notes + plugin source)
- **CR-3**: cross-model gate via real GPT-5.5 codex T1 e2e BEFORE commit (Pattern B HNF; ctx_doctor 6/6 PASS validates)
- **CR-6**: official-native-install-channel via bun.sh PowerShell installer (NOT shell-script wrapper)
- **CR-7**: graduated-unleash Phase 3 ACTIVE (Wave 89 unleash enabled live ctx_doctor probe)
- **CR-9**: install-risk LOW (runtime install; reversible via rm + git revert; no destructive ops)
- **CR-10**: research-first via Wave 95 ctx_doctor + Bun upstream docs
- **CR-11**: META-process SOTA: Pattern A apply (no fix-forward needed) + Mia pre-apply (3/3) + provenance log + GPT-5.5 e2e BEFORE commit

### Operational impact

| Layer | Pre-Wave-96 | Post-Wave-96 |
|---|---|---|
| ctx_doctor | 5/6 PASS (Server test FAIL) | **6/6 PASS** |
| Plugin perf path | Node fallback (Bun missing) | **FAST (Bun)** active |
| Bun runtime available | `bun.cmd` shim only (Node spawn can't resolve) | **`bun.exe` real binary** |
| ctx_execute "shell" mode performance | Node spawn overhead | **Bun JIT-compiled fast** |

### Ships LANDED in this session arc (9 total)

| Wave | Commit | Ship |
|---|---|---|
| 86 | `824523f` | 1Q — CLIProxyAPI 4h session-affinity tuning |
| 89 | `15dad8e` | 1Y — codex CLI sandbox unleash (multiplier) |
| 91 | `6ebcf08` | 1W — Aperant-derived rate-limit poller |
| 92 | `861ee43` | 1T — cnighswonger v3.5.3 cache-fix chain |
| 93 | `63cc261` | 1X — cycle-aware rotation planner |
| 90 | `f8134e7` | docs — fleet status + redacted provenance |
| 94 | `b7207e9` | Phase 3 1T (Opus 4.7 advisory) + cron deploy |
| 95 | `840db40` | 1M — context-mode FULL plugin install (98% reduction) |
| **96** | **THIS** | **1M Phase 2 — Bun runtime install (ctx_doctor 6/6 PASS)** |

### Update triggers

Re-evaluate when:
- Bun ships v2 with breaking changes
- ctx_doctor schema changes in plugin v1.0.112+
- HOME redirect behavior changes (would break bun.sh installer auto-PATH)
- 24-72h D2 monitoring window surfaces a regression
