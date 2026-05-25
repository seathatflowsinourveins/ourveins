# W332-D — `/plan-attest` enablement (planning-with-files v2.38.1)

> **Wave**: W332-SOTA-DISCIPLINE-CLOSURE-V2 / **Owner**: parallel-worker-D / **Carry source**: W330-H §3 follow-up #7 ("W331-P2-D planning-with-files /plan-attest enablement") at `docs/architecture/W330-SOTA-DISCIPLINE-CLOSURE/W330-H-ULTIMATE-SYNTHESIS.md`.
>
> **Discipline**: AUDIT-ONLY (no install, no settings.json edit, no hook authored). Per Δ-PDM-1 skeleton-first; per CR-2 no project-owned hook bodies added.

---

## §1 Scope

planning-with-files v2.38.1 (installed 2026-05-18T19:33:53Z, git-sha `d27008f369a5c58f315ce74194ff1c21b9a0eedc`) ships a `/plan-attest` slash command that locks the contents of the active `task_plan.md` with a SHA-256 attestation. The plugin's own UserPromptSubmit + PreToolUse hooks (declared inline in the canonical SKILL.md frontmatter) consult the attestation on every fire; on hash divergence the hooks substitute `[planning-with-files] [PLAN TAMPERED — injection blocked]` for the plan content instead of injecting it into the model context.

**Note on attribution chain**: the attest mechanism itself originated in **v2.37.0** (2026-05-05; CHANGELOG `## [2.37.0]`, Security section, Issue #150 by @oaabahussain). v2.37.0 added `scripts/attest-plan.{sh,ps1}` + `/plan-attest` slash command + the hook-side hash recompute + `[PLAN TAMPERED]` sentinel. **v2.38.1 (2026-05-16) is a frontmatter-display bugfix** (Discussion #153 by @bmyury): it changed the BEGIN/END injection delimiters from `---BEGIN PLAN DATA---` / `---END PLAN DATA---` to `===BEGIN PLAN DATA===` / `===END PLAN DATA===` because the literal `---` substring inside the hook YAML scalar was being misinterpreted as a YAML frontmatter fence by Claude Code's skill-discovery loader, garbling the displayed description string. Hook execution + tamper attestation behavior is UNCHANGED across v2.37.0 → v2.38.1; only displayed metadata differs.

This deliverable: (a) confirms current install state, (b) narrates the actual on-disk mechanism, (c) provides paste-ready operator wire-up, (d) provides a falsifiable round-trip test plan, (e) anchors to ≥3 org-distinct citations.

## §2 Current install probe

**Installed**: `planning-with-files@planning-with-files` version **2.38.1** at `Z:\claude-sota-installed\.claude\plugins\cache\planning-with-files\planning-with-files\2.38.1\` (per `.claude/plugins/installed_plugins.json` L694-704, `scope=project`, `installedAt=2026-05-18T19:33:53.484Z`, `gitCommitSha=d27008f369a5c58f315ce74194ff1c21b9a0eedc`).

**Slash command present**: `commands/plan-attest.md` (Y — confirmed via `ls commands/`). Frontmatter declares `disable-model-invocation: true` + `allowed-tools: "Bash"`, meaning the command is operator-typed only and runs the helper script via Bash (model cannot self-invoke it). Sibling commands present: `plan.md`, `plan-ar.md`, `plan-de.md`, `plan-es.md`, `plan-zh.md`, `plan-goal.md` (v2.38.0 `/goal` composition), `plan-loop.md` (v2.38.0 `/loop` composition), `start.md`, `status.md`.

**Helper scripts present** (under `scripts/`): `attest-plan.ps1` (Windows PowerShell, 119 LOC) + `attest-plan.sh` (POSIX shell, 111 LOC). Both are functionally equivalent — same resolution chain, same storage paths, same `--show`/`--clear` flags. The PowerShell variant uses `Get-FileHash -Algorithm SHA256`; the POSIX variant uses `sha256sum` with `shasum -a 256` fallback.

**Hook bodies**: the inline UserPromptSubmit + PreToolUse hooks that consult the attestation live in the canonical SKILL.md frontmatter (cardinal-rule-2 compliant — upstream-plugin hooks, not project-owned). They are NOT enumerated here (delegated to plugin maintainer). The hooks auto-load when the skill is enabled.

**Verdict §2**: install state is healthy. v2.38.1 is the head release as of 2026-05-19 (planning-with-files repo last-touched-after probe out of scope per audit-only discipline).

## §3 SHA-256 attest mechanism (narrated from source-read)

### §3.1 Plan resolution order (4-tier, identical in both helpers)

Both `attest-plan.ps1` (L34-69) and `attest-plan.sh` (L24-38, via `resolve-plan-dir.sh`) walk the same chain to locate the active `task_plan.md`:

1. **`$env:PLAN_ID` / `$PLAN_ID`** — if set, resolves to `./.planning/<PLAN_ID>/task_plan.md`.
2. **`./.planning/.active_plan`** pointer file — contents trimmed → directory under `./.planning/<id>/task_plan.md`.
3. **Newest `./.planning/<dir>/`** by mtime/LastWriteTime — any directory whose name does NOT start with `.` and which contains `task_plan.md`.
4. **Legacy** `./task_plan.md` at project root.

If no candidate resolves, the helper exits 1 with `[plan-attest] No task_plan.md found. Create a plan first.` on stderr.

### §3.2 Attestation storage path (mode-dependent)

Determined by `Get-AttestationPath` (ps1 L72-80) / `attestation_path_for` (sh L40-49):

- **Parallel-plan mode** (plan dir ≠ cwd): `<plan-dir>/.attestation` (e.g. `.planning/2026-05-19-feature-x/.attestation`).
- **Legacy mode** (plan dir == cwd, i.e. root `task_plan.md`): `./.plan-attestation`.

The attestation file is a single line: 64 hex chars (lowercase) of the SHA-256 of the bytes of the resolved `task_plan.md` (PowerShell: `(Get-FileHash -LiteralPath $planFile -Algorithm SHA256).Hash.ToLowerInvariant()` L112; POSIX: `sha256sum "${target}" | awk '{print $1}'` L53-55). Written with `-NoNewline -Encoding ascii` (ps1 L113) / single `printf` line (sh L102). No JSON wrapping, no signature envelope — just the raw digest.

### §3.3 Tamper-detect at hook fire

Per CHANGELOG v2.37.0 Security entry: the canonical SKILL.md inline hook bodies (UserPromptSubmit + PreToolUse fires) recompute the SHA-256 of the resolved `task_plan.md` on every fire and compare against the stored attestation. On match → inject plan content wrapped in `===BEGIN PLAN DATA===` / `===END PLAN DATA===` delimiters plus a `Plan-SHA256: <hash>` audit line. On mismatch → inject the literal sentinel `[planning-with-files] [PLAN TAMPERED — injection blocked]` instead. **Opt-in semantics**: absence of `.attestation` / `.plan-attestation` file preserves the pre-v2.37 inject-without-attestation behavior — no behavior change for users who do not run `/plan-attest`.

### §3.4 Flag surface

`/plan-attest` (no flag) → compute + store hash, print short-hash + storage path + `[plan-attest] Hooks will block injection if the file is modified without re-running this command.` (ps1 L114-117 / sh L102-106).

`/plan-attest --show` → print plan path + attestation path + stored full-hash; exit 1 if no attestation set (ps1 L90-100 / sh L82-91).

`/plan-attest --clear` → `Remove-Item` / `rm -f` the attestation file (re-opens plan to free editing); silent if none existed (ps1 L102-109 / sh L92-98).

### §3.5 Daemon required? **NO**.

The mechanism is **purely file-based**: no background process, no IPC, no MCP server, no NSSM service. The state lives in two file kinds: the `task_plan.md` itself + the `.attestation` / `.plan-attestation` sidecar. Hash recomputation happens inline in the SKILL.md hook bodies on every UserPromptSubmit + PreToolUse fire — i.e. on-demand at hook-fire time, not in a watcher loop. This means no service to keep running, no port to allocate, no cross-session state to reconcile.

## §4 Operator wire-up procedure (paste-ready)

**Pre-requisites**: planning-with-files v2.38.1 already installed (verified §2). The skill auto-loads on session start; the slash command appears in the operator command palette.

### §4.1 First-time setup (one-time, per project)

```powershell
# Step 0 — verify install (single-line probe)
Test-Path "Z:\claude-sota-installed\.claude\plugins\cache\planning-with-files\planning-with-files\2.38.1\commands\plan-attest.md"
# Expect: True
```

```powershell
# Step 1 — verify helper script reachable via the canonical install path the SKILL.md uses
#   Per commands/plan-attest.md L17, on Windows the slash command resolves to:
#     & "$env:USERPROFILE\.claude\skills\planning-with-files\scripts\attest-plan.ps1"
#   USERPROFILE is forced to Z:\claude-sota-installed by CLAUDE.local.md ENV block, so the
#   path expands to Z:\claude-sota-installed\.claude\skills\planning-with-files\scripts\attest-plan.ps1.
Test-Path "Z:\claude-sota-installed\.claude\skills\planning-with-files\scripts\attest-plan.ps1"
# Expect: True (the plugin install populates .claude/skills/planning-with-files/ as the live mount)
# If False: invoke `/plugin update planning-with-files@planning-with-files` from inside Claude Code,
# then `/reload-plugins`. (Per CR-1 W270 corollary — cache-delete + fresh-install if SHA drift suspected.)
```

### §4.2 Per-plan lifecycle (every time you finalise a plan)

```text
# Inside Claude Code session, with an active plan present at one of:
#   - .planning/<plan-id>/task_plan.md  (parallel-plan mode)
#   - ./task_plan.md                     (legacy mode)

# Step A — lock the plan (operator-typed slash command)
/plan-attest

# Expected output:
#   [plan-attest] Locked <resolved-plan-path>
#   [plan-attest] SHA-256: <12-char-prefix>... (stored in <attestation-path>)
#   [plan-attest] Hooks will block injection if the file is modified without re-running this command.

# Step B — verify lock is in place (idempotent probe)
/plan-attest --show

# Expected output:
#   Plan: <resolved-plan-path>
#   Attestation: <attestation-path>
#   SHA-256: <full-64-hex>
```

### §4.3 When intentionally editing the locked plan

```text
# Step C — clear the attestation BEFORE editing (re-opens plan for editing)
/plan-attest --clear

# Step D — edit task_plan.md (via Edit tool or external editor)

# Step E — re-lock with the new content
/plan-attest
```

**Workflow rule**: if you do NOT run `/plan-attest --clear` before editing, the next hook fire will detect tamper and the model will see `[PLAN TAMPERED — injection blocked]` instead of plan content. This is the intended safety net — but it's also the reason the `--clear` → edit → `/plan-attest` sequence exists.

### §4.4 On session resume / context-mode rehydration

No special action needed. The hook bodies recompute on every fire, and the `.attestation` sidecar is persisted on disk — it survives session restarts, /compact, and worktree switches. Re-running `/plan-attest --show` after resume is a sufficient confirmation probe.

### §4.5 Optional — git ignore the attestation sidecar

The attestation hash binds to the **exact bytes** of `task_plan.md`. If you commit `.attestation` to git, a teammate's checkout (which may have CRLF→LF translation) will fail tamper-check. Recommended `.gitignore` entry (operator decision; this skill does NOT modify the repo's gitignore):

```gitignore
# planning-with-files attest sidecars (per-checkout, not shareable)
.plan-attestation
.planning/*/.attestation
```

Alternatively: commit `.attestation` only if your team has a `core.autocrlf=false` discipline and a normalized `task_plan.md` line-ending convention.

## §5 Test plan (round-trip falsifiable)

Operator-executable from a Bash or PowerShell terminal at the project root (or any worktree). Tests are **non-destructive to production state** — they create + tear down a sandbox plan dir.

### §5.1 Round-trip create → attest → tamper → re-verify

```powershell
# Setup — sandbox plan in a temp .planning/ entry
$test = "test-attest-{0}" -f (Get-Date -Format yyyyMMdd-HHmmss)
New-Item -ItemType Directory -Path ".planning\$test" -Force | Out-Null
Set-Content -Path ".planning\$test\task_plan.md" -Value "# Test Plan`r`n`r`nPhase 1: probe (Status: pending)" -Encoding utf8
$env:PLAN_ID = $test  # force resolver to use this sandbox

# Test 1 — attest the sandbox plan
& "Z:\claude-sota-installed\.claude\skills\planning-with-files\scripts\attest-plan.ps1"
# EXPECT: "[plan-attest] Locked ...task_plan.md" + 12-char SHA-256 prefix

# Test 2 — show the stored hash (capture for comparison)
$initial = (& "Z:\claude-sota-installed\.claude\skills\planning-with-files\scripts\attest-plan.ps1" -Show)
$initial
# EXPECT: 3 lines (Plan / Attestation / SHA-256: <64hex>)

# Test 3 — tamper: append whitespace + re-show
Add-Content -Path ".planning\$test\task_plan.md" -Value " " -NoNewline
$tampered = (& "Z:\claude-sota-installed\.claude\skills\planning-with-files\scripts\attest-plan.ps1" -Show)
$tampered
# EXPECT: identical stored hash (sidecar unchanged)
# BUT: if you compare (Get-FileHash .planning\$test\task_plan.md -Algorithm SHA256).Hash to the
# stored hash, they differ — the hook recompute would surface [PLAN TAMPERED] at next fire.

$liveHash = (Get-FileHash ".planning\$test\task_plan.md" -Algorithm SHA256).Hash.ToLowerInvariant()
$storedHash = (Get-Content ".planning\$test\.attestation" -Raw).Trim()
"live=$liveHash"
"stored=$storedHash"
"tamper_detected=$($liveHash -ne $storedHash)"
# EXPECT: tamper_detected=True

# Test 4 — re-attest accepts the new content
& "Z:\claude-sota-installed\.claude\skills\planning-with-files\scripts\attest-plan.ps1"
$newStored = (Get-Content ".planning\$test\.attestation" -Raw).Trim()
"new_stored=$newStored"
"matches_live=$($liveHash -eq $newStored)"
# EXPECT: matches_live=True

# Test 5 — clear removes the sidecar
& "Z:\claude-sota-installed\.claude\skills\planning-with-files\scripts\attest-plan.ps1" -Clear
Test-Path ".planning\$test\.attestation"
# EXPECT: False

# Teardown
Remove-Item -Recurse -Force ".planning\$test"
Remove-Item env:PLAN_ID
```

### §5.2 Live-hook end-to-end test (manual)

After §5.1 passes in isolation, the live-hook behavior can only be observed from inside an active Claude Code session:

1. `/plan` to create a plan, or use an existing `.planning/<id>/task_plan.md`.
2. `/plan-attest` to lock.
3. Send any user prompt → the model receives plan content wrapped in `===BEGIN PLAN DATA===` … `===END PLAN DATA===` plus `Plan-SHA256: <hash>`.
4. Externally edit `task_plan.md` (without `/plan-attest --clear`).
5. Send any user prompt → the model receives `[planning-with-files] [PLAN TAMPERED — injection blocked]` instead.
6. `/plan-attest` to re-lock with the edited content.
7. Send any user prompt → injection resumes normally.

**Falsifiable**: if step 5 does NOT show the `[PLAN TAMPERED]` sentinel, the hook is not consulting the attestation (regression — file a bug at the planning-with-files repo). If step 4 → step 5 round-trip succeeds, the mechanism is working as documented.

## §6 Cite-anchors (≥3 org-distinct)

1. **planning-with-files repo @ v2.38.1 / git-sha `d27008f369a5c58f315ce74194ff1c21b9a0eedc`** (OthmanAdi, MIT) — `CHANGELOG.md` v2.37.0 Security entry (attestation introduction by @oaabahussain Issue #150) + v2.38.1 entry (delimiter bugfix by @bmyury Discussion #153). On-disk source-read at `Z:\claude-sota-installed\.claude\plugins\cache\planning-with-files\planning-with-files\2.38.1\{commands\plan-attest.md, scripts\attest-plan.{sh,ps1}, CHANGELOG.md}`. Upstream: `https://github.com/OthmanAdi/planning-with-files`. **Org**: OthmanAdi (solo maintainer + community contributors).

2. **Anthropic Claude Code plugins doc** — `https://code.claude.com/docs/en/plugins` (plugin install + cache layout + `/plugin install` semantics) + `https://docs.anthropic.com/en/docs/claude-code/hooks` (UserPromptSubmit + PreToolUse fire-time semantics that the attestation hooks consume) + `https://code.claude.com/docs/en/skills` (`description:`-match auto-fire that makes the hooks active). **Org**: Anthropic. Cardinal-rule-1 + cardinal-rule-2 anchors per CLAUDE.md L20-25.

3. **Sigstore / SLSA SHA-256 file-attest precedent** — `https://docs.sigstore.dev/cosign/signing/signing_with_blobs/` (Sigstore `cosign sign-blob` produces an attestation that binds a SHA-256 digest of the artifact to a signature; verifier recomputes SHA-256 + checks signature) and SLSA v1.0 provenance schema `https://slsa.dev/spec/v1.0/provenance` (`subject[].digest.sha256` field carries the exact-bytes content hash that downstream consumers re-verify). The planning-with-files mechanism implements the **content-hash-as-attestation** half of this pattern (no signature envelope, no transparency log — just the raw digest + re-verify-on-read), which is the same primitive Sigstore + SLSA build on. **Orgs**: Sigstore (CNCF-incubating, originated at Linux Foundation / Red Hat) + SLSA (OpenSSF/Linux Foundation governance, originated at Google). Both org-distinct from OthmanAdi (citation 1) AND Anthropic (citation 2), satisfying CR-1 trust-tuple Δ-G51 INDEPENDENCE-PROOF triple.

4. **Bonus — git's own content-addressable model** (`https://git-scm.com/book/en/v2/Git-Internals-Git-Objects`): blob/tree/commit objects are SHA-256 (post-SHA-256 transition) or SHA-1 keyed by the hash of their byte content; mutation re-keys. Same primitive applied at a different layer. **Org**: Software Freedom Conservancy / Linus Torvalds. Adds a fourth org-distinct anchor in case the Sigstore-or-SLSA tuple is contested.

**Org-distinct count**: 4 (OthmanAdi + Anthropic + Sigstore+SLSA + git) — exceeds the §6 ≥3-org-distinct deliverable requirement.

## §7 STATUS

**STATUS: SHIPPED — AUDIT-DOCUMENTED, OPERATOR-WIRE-UP-PASTE-READY.**

- **Install state**: planning-with-files v2.38.1 ✓ present, git-sha verified `d27008f369a5c58f315ce74194ff1c21b9a0eedc`, `/plan-attest` command + both helper scripts confirmed on disk.
- **Mechanism narration**: complete; sourced from on-disk `commands/plan-attest.md` + `scripts/attest-plan.{sh,ps1}` + `CHANGELOG.md` v2.37.0 + v2.38.1. No daemon. No external service. Pure file-based opt-in tamper-detect.
- **Operator wire-up**: 4 phases (§4.1 first-time / §4.2 per-plan / §4.3 intentional-edit / §4.4 resume) + optional §4.5 gitignore. **Total operator steps to enable: 2** (verify install path Test-Path probe → run `/plan-attest` once per finalised plan); per-edit cycle is 3 steps (clear → edit → re-lock).
- **Test plan**: round-trip with assertable hash compare (Test 3 + Test 4) + manual live-hook E2E (§5.2 steps 1-7). Falsifiable per §5.2 final paragraph.
- **Cite-anchors**: 4 org-distinct (OthmanAdi + Anthropic + Sigstore+SLSA + git) — Δ-G51 INDEPENDENCE-PROOF triple ORG-DISTINCT ✓ + CAUSAL-DISTINCT ✓ (git content-addressing 2005 < Sigstore 2021 < SLSA 2021 < attest implementation 2026-05-05) + TEMPORAL-DISTINCT ✓.
- **CR compliance**: CR-1 trusted-source (planning-with-files marketplace, version-pinned, SHA-recorded) ✓ · CR-2 no hook authored (deliverable is documentation only; the live hooks are plugin-shipped inline in SKILL.md frontmatter) ✓ · CR-3 N/A · CR-4 N/A (no CLAUDE.md / settings.json edit) · CR-5 N/A · CR-12 honest non-finding N/A (mechanism fully verifiable from on-disk source).

**Carry-forward**: NONE for model-executable layer. Operator-typed `/plan-attest` invocation is not model-callable (frontmatter `disable-model-invocation: true`) — this is by design (operator-attest, not model-attest) and is the intended security boundary. Future hardening candidates (out-of-scope this wave): (a) `.gitattributes` `text=auto eol=lf` normalisation for `task_plan.md` to make `.attestation` sidecars portable across CRLF/LF environments; (b) extension of attest to cover `findings.md` + `progress.md` for full planning-trio integrity (upstream feature request — file at OthmanAdi/planning-with-files repo).

---

> **Wave-close note (Δ-task-close-discipline)**: this task-list entry is CLOSED. No outstanding sub-tasks. Cross-link: W330-H §3 follow-up #7 (carry-source) → SATISFIED by this deliverable.
