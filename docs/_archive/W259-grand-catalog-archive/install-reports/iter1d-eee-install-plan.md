# Wave 52 / iter 1d — `eee` (Codex/GPT-5.5 reviewer) Native Install Plan

**Architecture:** Claude orchestrates, Codex reviews (per `Z:/claude-sota/CLAUDE.md §Architecture`).
**Scope:** Step-by-step plan that yields a 100% native, upstream-traceable install of the user's `eee` reviewer. Zero self-invention. Every step cites an official URL or a verified local config.
**Date:** 2026-05-07.

---

## 0. Provenance Verification (what's currently on disk)

| Component | Where | Version / Commit | Source of truth |
|---|---|---|---|
| Codex CLI binary | `Z:\tools\npm-global\node_modules\@openai\codex\bin\codex.js` | `codex-cli 0.125.0` (verified by `node codex.js --version`) | `npm i -g @openai/codex` per https://github.com/openai/codex/blob/main/README.md (TIER-1) |
| Codex CC plugin (installed) | `Z:\claude-sota-installed\.claude\plugins\cache\openai-codex\codex\1.0.4` | gitCommitSha 807e03ac | `installed_plugins.json` |
| Codex CC plugin (marketplace clone) | `Z:\claude-sota\.claude\plugins\marketplaces\openai-codex\plugins\codex` | v1.0.4 (matches `marketplace.json:metadata.version`) | upstream `openai/codex-plugin-cc` @ 807e03ac (verified via `mcp__github__get_file_contents`) |
| Plugin hooks file | `…\plugins\codex\hooks\hooks.json` | Wave 50 Fire 46 patched (absolute Win32 paths). Originals retained as `.pre-fire44/45/46-fix` siblings | local patch — SEE `Drift from official` below |
| Codex home (per project) | `Z:\claude-sota\.codex\config.toml` | profiles `local`, `review`, `deep-review`, `deep-review-exec`, …; `model = "gpt-5.5"` for review profiles | `~/.codex/config.toml` per https://developers.openai.com/codex/config-advanced (TIER-1) |
| User-level codex home | `C:\Users\42\.codex\` (== `Z:\claude\.codex\` hardlink) | `auth.json` present; profiles incl. `deep-review`, `headless-exec`, `strict` | same TIER-1 |
| T1 gate (consult, design-surface) | `Z:\claude-sota\.claude\hooks\scripts\codex_t1_consult_gate.py` | wired in `settings.json:244` PreToolUse Edit\|Write\|MultiEdit | local hook, calls `codex exec --ephemeral -p deep-review-exec` |
| T2 gate (pre-commit) | `Z:\claude-sota\.claude\hooks\scripts\codex_t2_pre_commit_gate.py` | wired in `settings.json:282,288` PreToolUse `Bash(git commit *)` | local hook, calls `codex exec review --uncommitted` |
| Strict env | `settings.json:15-18` | `CODEX_T1_GATE_STRICT=1`, `CODEX_T1_GATE_FAIL_CLOSED=0`, `CODEX_T2_GATE_STRICT=1`, `CODEX_T2_GATE_FAIL_CLOSED=1` | local |

**Live process observed:** `codex.js exec` running under `Z:\tools\nodejs\node.exe` — confirms the npm-installed binary is the active runtime.

---

## 1. Drift from Official

| Item | Upstream says | Local has | Severity |
|---|---|---|---|
| Plugin source | https://github.com/openai/codex-plugin-cc @ 807e03ac (v1.0.4) | identical commit on disk | **NO DRIFT** in source |
| `hooks/hooks.json` | upstream uses `${CLAUDE_PLUGIN_ROOT}` | local uses **absolute Win32 paths** (`Z:\tools\nodejs\node.exe …`) | **HIGH — patched** (`description` field documents reason: "PATCHED Wave 50 Fire 46 — absolute Win32 paths bypass CC's POSIX-form `${CLAUDE_PLUGIN_ROOT}` injection on Windows"). Three `.pre-fire*-fix` backups retained. |
| Codex node version | upstream README: "Node.js 18.18 or later" | local node at `Z:\tools\nodejs\node.exe` (version not yet checked in this audit; codex.js running fine implies ≥16, plugin requires ≥18.18) | **VERIFY** before reinstall |
| Codex CLI version | latest GitHub release: `rust-v0.128.0` (tag), released as `0.128.0` | installed `0.125.0` (3 minor versions behind) | **MEDIUM** — upstream changelog mentions `apply_patch` fixes for GPT-5.4 reasoning levels and Windows pseudoconsole startup fixes (#19211). User decision required: upgrade or stay. |
| T1/T2 gates | NOT upstream — these are local extensions per `cross-model-workflow.md` (CCBP STEP 2 anchor) and local feedback memory `feedback_3touchpoint_codex_workflow.md` | local hook scripts | **EXPECTED** (file headers explicitly classify them as TIER-3 LOCAL EXTENSION, not SOTA verbatim). Keep. |
| Stop review-gate hook | upstream plugin ships `scripts/stop-review-gate-hook.mjs`; documented as opt-in via `/codex:setup --enable-review-gate` | local `settings.json` already wires the upstream `.mjs` (line ref: search for `stop-review-gate-hook.mjs`) PLUS the local `codex_stop_review_gate.py` | **TWO STOP HOOKS** — user decision needed: keep both, or pick one. |

---

## 2. Install Plan — Step by Step

### Pre-flight

```bash
# Verify Node ≥18.18 (upstream README requirement)
"Z:/tools/nodejs/node.exe" --version

# Verify currently installed Codex
"Z:/tools/nodejs/node.exe" "Z:/tools/npm-global/node_modules/@openai/codex/bin/codex.js" --version
# → expect: codex-cli 0.125.0 (current) OR 0.128.0 (after upgrade)

# Verify auth (any of the three is sufficient — see Open Questions Q3)
ls "C:/Users/42/.codex/auth.json"
```

Cite: https://github.com/openai/codex/blob/main/README.md §Quickstart (Node ≥18.18 listed in plugin README, not core README).

### Path A — Stay on 0.125.0 (recommended unless user wants upgrade)

The Codex CLI is already installed and live. **No action needed for the binary.**

### Path B — Upgrade to 0.128.0

```bash
# Official upgrade per README.md §Quickstart
npm install -g @openai/codex@0.128.0
```

Then re-verify:

```bash
"Z:/tools/nodejs/node.exe" "Z:/tools/npm-global/node_modules/@openai/codex/bin/codex.js" --version
```

Cite: https://github.com/openai/codex/blob/main/README.md (`npm install -g @openai/codex`); release tag `rust-v0.128.0` per `mcp__github__get_latest_release`.

**Risk note (user decision):** Codex 0.128.0 changelog includes Windows pseudoconsole + named-pipe fixes (#20042, #19211, #20089, #19283). The local Wave 50 Fire 46 absolute-path patch was applied because of Windows `${CLAUDE_PLUGIN_ROOT}` POSIX-form issues; upgrading the *binary* does not change the *plugin* path-injection bug. Patch stays.

### Plugin install (only if reinstall is desired)

The plugin is already installed (`installed_plugins.json` shows `codex@openai-codex` 1.0.4). For a clean reinstall:

```bash
# Inside Claude Code:
/plugin uninstall codex@openai-codex

# Add the marketplace (idempotent, already present)
/plugin marketplace add openai/codex-plugin-cc

# Install
/plugin install codex@openai-codex

# Reload
/reload-plugins
```

Cite: https://github.com/openai/codex-plugin-cc/blob/main/README.md §Install (verbatim sequence).

**After reinstall, the upstream `hooks/hooks.json` will use `${CLAUDE_PLUGIN_ROOT}` again.** The Wave 50 Fire 46 patch must be re-applied. The patcher script reference is documented in the patched file's `description` field: `codex-plugin-hooks-rewrite.py` (search the repo for it before running). If the patcher is not present, the manual procedure is:

1. Backup: `cp hooks/hooks.json hooks/hooks.json.pre-fire47-fix`
2. Replace `${CLAUDE_PLUGIN_ROOT}` with the literal absolute path `Z:\\claude-sota\\.claude\\plugins\\marketplaces\\openai-codex\\plugins\\codex`
3. Replace `node` with `"Z:\\tools\\nodejs\\node.exe"`

Cite: file `Z:\claude-sota\.claude\plugins\marketplaces\openai-codex\plugins\codex\hooks\hooks.json` (description field documents the patch).

### Authentication (only if `~/.codex/auth.json` is missing or stale)

The official two-mode flow per https://developers.openai.com/codex/auth/ :

```bash
# Mode 1: Sign in with ChatGPT (interactive, opens browser)
codex login

# Mode 2: Sign in with API key (headless)
codex login --api-key   # then paste key, OR set OPENAI_API_KEY first
```

For headless / no-browser environments:

```bash
codex login --device-auth
```

Cite: https://developers.openai.com/codex/cli/reference/ §`codex login` and https://developers.openai.com/codex/auth/.

**Auth file location (TIER-1):** `~/.codex/auth.json` (plaintext) OR OS credential store, controlled by `cli_auth_credentials_store` (`file` | `keyring` | `auto`). Reference: https://developers.openai.com/codex/auth/.

### Config (already in place — verify only)

```bash
# User config (governs profiles `deep-review`, `deep-review-exec`, `headless-exec`, …)
type "C:\Users\42\.codex\config.toml" | head -40

# Project config (governs claude-sota profiles)
type "Z:\claude-sota\.codex\config.toml" | head -40
```

Both contain `model = "gpt-5.5"` for `[profiles.deep-review]` and `[profiles.deep-review-exec]` — the user's canonical reviewer profiles.

Cite: https://developers.openai.com/codex/config-basic and https://developers.openai.com/codex/config-advanced (`CODEX_HOME` defaults to `~/.codex`; project-level `.codex/config.toml` only loads when project is trusted).

---

## 3. Wiring Plan (T1/T2 gates → eee)

The gates are **already wired** and not part of the upstream plugin. They are LOCAL EXTENSIONS that invoke the same `codex exec` binary. No new wiring is needed; this section documents the existing wiring for verification.

### T1 (consult gate, design-surface edits)

- **Hook:** `Z:\claude-sota\.claude\hooks\scripts\codex_t1_consult_gate.py`
- **Wired at:** `Z:\claude-sota\.claude\settings.json:244` (PreToolUse `Edit|Write|MultiEdit`)
- **Invokes:** `codex exec --ephemeral -p deep-review-exec` (per file header lines 5-6)
- **Strict env:** `CODEX_T1_GATE_STRICT=1`, `CODEX_T1_GATE_FAIL_CLOSED=0` (advisory on T1 invocation timing — closes self-lockout risk per `settings.json:14` Round-2 fix-forward Ship #256.1)
- **Verdict pair:** `.claude/state/codex_consult_<topic>.txt` + `.claude/state/codex_consult_<topic>_OUT.txt`
- **Exclusions:** `_UNIVERSAL_EXCLUSIONS` at `codex_t1_consult_gate.py:23-28` (tests/scripts/evals/ + 60+ glob patterns)

### T2 (pre-commit working-tree review)

- **Hook:** `Z:\claude-sota\.claude\hooks\scripts\codex_t2_pre_commit_gate.py`
- **Wired at:** `Z:\claude-sota\.claude\settings.json:282,288` (PreToolUse `Bash(git commit *)`)
- **Invokes:** `codex exec review --uncommitted` with max-unleash flags (per file header line 5; codex-rs cli.rs:139-145,240-270)
- **Strict env:** `CODEX_T2_GATE_STRICT=1`, `CODEX_T2_GATE_FAIL_CLOSED=1` (also blocks on T2 timeout/cmd_not_found)
- **Emergency bypass:** `CODEX_T2_GATE_BYPASS=1` + `CODEX_T2_GATE_BYPASS_REASON='<audit-trail text>'` (BOTH required — `codex_t2_pre_commit_gate.py:805-813` FM-13 closure)
- **Full noop:** `CODEX_T2_GATE_DISABLE=1`

### Authority for these gates being CALLED `eee`

The user invocation name `eee` is not present in any of the gate scripts, settings.json, or the upstream plugin. The eee identifier appears to be a user-side launcher (ref: `description` field of `hooks.json` mentions "eee.ps1 launchers pre-claude.exe (fail-closed)"). **OFFICIAL: NOT FOUND for the `eee` name itself — user decision needed (see Open Questions Q1).**

The actual reviewer wiring (T1/T2 gates → `codex exec`) is fully traceable to upstream via:
- T1 → `codex exec --ephemeral` per `Z:/repos/deps/codex/codex-rs/exec/src/cli.rs:22-28`
- T2 → `codex exec review --uncommitted` per `Z:/repos/deps/codex/codex-rs/exec/src/cli.rs:139-145,240-270`
- Plugin native review-target construction per `Z:/repos/deps/codex-plugin-cc/plugins/codex/scripts/codex-companion.mjs:258-277,992-1002` @ 807e03ac

---

## 4. Verification Probe

Run this sequence to confirm `eee` (Codex/GPT-5.5) responds correctly post-install. Each step is independently verifiable.

```bash
# Probe 1: binary present + version
"Z:/tools/nodejs/node.exe" "Z:/tools/npm-global/node_modules/@openai/codex/bin/codex.js" --version
# Expected: codex-cli 0.125.0 (or 0.128.0 if upgraded)

# Probe 2: auth state
"Z:/tools/nodejs/node.exe" "Z:/tools/npm-global/node_modules/@openai/codex/bin/codex.js" login status
# Expected: signed-in account or API-key mode (NOT "not logged in")
# Cite: codex CLI reference §codex login

# Probe 3: profiles loadable
codex exec --ephemeral -p deep-review-exec --help 2>&1 | head -5
# Expected: usage text without "profile not found" error

# Probe 4: smoke-fire T1 manually (no design-surface edit needed)
echo '{"task":"echo PROBE_OK","model":"gpt-5.5"}' | \
  codex exec --ephemeral -p deep-review-exec --json --output-last-message - 2>&1 | tail -20
# Expected: a JSON response from gpt-5.5 (any answer acceptable; presence proves binary→auth→model→network all wired)

# Probe 5: T1 hook exit-code dry-run
"Z:/venvs/claude/Scripts/python.exe" -c "import py_compile; py_compile.compile(r'Z:/claude-sota/.claude/hooks/scripts/codex_t1_consult_gate.py'); print('T1 SYNTAX OK')"
"Z:/venvs/claude/Scripts/python.exe" -c "import py_compile; py_compile.compile(r'Z:/claude-sota/.claude/hooks/scripts/codex_t2_pre_commit_gate.py'); print('T2 SYNTAX OK')"
# Expected: both print "* SYNTAX OK"

# Probe 6: settings.json wiring still in place
grep -c "codex_t1_consult_gate.py" "Z:/claude-sota/.claude/settings.json"   # expect ≥1
grep -c "codex_t2_pre_commit_gate.py" "Z:/claude-sota/.claude/settings.json" # expect ≥2
```

If any probe fails, classify the failure per `~/.claude/rules/failure-taxonomy.md`:
- Probe 1/2 fail → environment (missing binary or auth)
- Probe 3 fails → environment (config.toml profile typo)
- Probe 4 fails → knowledge_gap (model name `gpt-5.5` may have changed) or environment (network / API key)
- Probe 5/6 fails → execution_error (re-apply Wave 50 Fire 46 patch / re-wire settings)

---

## 5. Open Questions (user decision required)

### Q1. The `eee` name itself

**OFFICIAL: NOT FOUND.** The name `eee` does not appear in upstream openai/codex, openai/codex-plugin-cc, or anywhere in the user's `Z:\claude-sota\.claude` settings/hooks/agents. Closest reference is `eee.ps1 launchers pre-claude.exe` mentioned in the `hooks.json` description as a Wave 50 Fire 46 component. **User must decide:**
- Is `eee` a user-side wrapper script that should be located at a specific path?
- Or is it a verbal label for "the Codex/GPT-5.5 reviewer flow" with no separate binary?
- If the former, please provide the path and I will add it to the install plan.

### Q2. Upgrade or stay (Codex CLI 0.125 → 0.128)

**OFFICIAL: BOTH PATHS SUPPORTED.** Upstream supports any 0.x version; latest is 0.128.0. The release notes mention Windows-relevant fixes (#19211 elevated runner, #20042 pseudoconsole, #20089 core shell env, #19283 named-pipe). User must decide: upgrade now, defer, or pin.

### Q3. Auth source (3 candidates already on disk)

`auth.json` is present at three paths:
- `C:\Users\42\.codex\auth.json` (Windows user home)
- `Z:\claude\.codex\auth.json` (parent ccc instance — same content if hardlinked)
- `Z:\claude-sota\.codex\auth.json`

**OFFICIAL** (https://developers.openai.com/codex/config-advanced): `CODEX_HOME` env var resolves the active codex home; defaults to `~/.codex`. The T1/T2 hook scripts explicitly set `CODEX_HOME` per file headers (codex_t2_pre_commit_gate.py F1 fix). **User decides** whether the canonical auth.json is the user-level one or the project-level one for `eee` invocations.

### Q4. LiteLLM/CCC proxy at :9327/:4000

The user's settings mention a local proxy stack but `Z:\claude-sota\.codex\config.toml` does NOT set `openai_base_url`. **OFFICIAL** (https://developers.openai.com/codex/config-advanced §config-and-state-locations): set `openai_base_url = "http://127.0.0.1:9327/v1"` in `config.toml` to route through the local proxy. **User must decide:** route Codex through the local proxy or hit api.openai.com directly. (Currently it goes direct, since `openai_base_url` is unset.)

### Q5. Two Stop hooks (upstream + local)

Upstream plugin's `stop-review-gate-hook.mjs` is wired in `settings.json` AND the local `codex_stop_review_gate.py` is wired separately. These may both fire on every Stop event. **User decides:** keep both, disable upstream's via `/codex:setup --disable-review-gate`, or disable the local one.

### Q6. T1 STRICT round-2 disposition

`settings.json:14` Ship #256.1 sets `CODEX_T1_GATE_FAIL_CLOSED=0` (advisory on T1 invocation timing) with future Path B planned for "T1 BYPASS+REASON equivalent to T2's." **User decides:** ship Path B now (true T1 fail-closed with bypass+reason emergency path), or defer.

---

## 6. Source Citations Index

| ID | URL / Path | What it authorizes |
|---|---|---|
| TIER-1.A | https://github.com/openai/codex/blob/main/README.md | `npm install -g @openai/codex`, `codex login`, ChatGPT vs API key auth |
| TIER-1.B | https://github.com/openai/codex-plugin-cc/blob/main/README.md @ 807e03ac | `/plugin marketplace add openai/codex-plugin-cc` + `/plugin install codex@openai-codex` + `/codex:setup` |
| TIER-1.C | https://developers.openai.com/codex/cli/reference/ | `codex login`, `codex exec`, `codex resume`, `codex mcp`, `--version` |
| TIER-1.D | https://developers.openai.com/codex/auth/ | API key + ChatGPT sign-in, `--device-auth`, `auth.json` location |
| TIER-1.E | https://developers.openai.com/codex/config-advanced | `CODEX_HOME=~/.codex`, `openai_base_url`, project trust |
| TIER-1.F | https://developers.openai.com/codex/config-basic | profile structure, model + reasoning_effort |
| TIER-1.G | https://github.com/openai/codex/releases/tag/rust-v0.128.0 | latest release 0.128.0 |
| TIER-2 | `Z:/repos/deps/codex/codex-rs/exec/src/cli.rs` @ 993e3f40 | `codex exec --ephemeral`, `review --uncommitted`, `--base`, `--commit` flag schemas |
| TIER-2 | `Z:/repos/deps/codex-plugin-cc/plugins/codex/scripts/codex-companion.mjs` @ 807e03ac | review-target construction, `task` dispatch |
| TIER-3 (LOCAL) | `Z:/claude-sota/.claude/hooks/scripts/codex_t1_consult_gate.py` | T1 consult gate behavior |
| TIER-3 (LOCAL) | `Z:/claude-sota/.claude/hooks/scripts/codex_t2_pre_commit_gate.py` | T2 pre-commit gate behavior |
| TIER-3 (LOCAL) | `Z:/claude-sota/.claude/settings.json` lines 14-18, 244, 282, 288 | strict env + hook wiring |
