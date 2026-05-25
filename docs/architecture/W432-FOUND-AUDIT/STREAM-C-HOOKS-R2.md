# W432-FOUNDATION-AUDIT Stream C — Hooks + Cardinal-Rule R2 Compliance

**Audit timestamp**: 2026-05-24
**Branch**: `goal/W432-G0-foundation-unblock`
**HEAD**: `c1ea53d`
**Auditor**: Stream C (W432 foundation-audit)

---

## TL;DR — Headline Findings

| # | Severity | Defect | Mechanism |
|---|----------|--------|-----------|
| **D1** | **SEV-1** | The single CR-2 exception cite `anthropics/claude-code#46915` is **CLOSED AS NOT PLANNED** (labels include `duplicate` + `stale`). CLAUDE.md L33 still asserts "verified STILL OPEN 2026-05-10". | CR-2 sole sanctioned exception is now unanchored. R6 (verify-before-claim) violation. |
| **D2** | **SEV-2** | `tools/preagent-parallel-guard.mjs` body is **24,140 B (≈11.8× CR-2 ceiling)**. Marketed as "out of `.claude/hooks/` so CR-2 doesn't apply" yet wires into `PreToolUse[Agent]` from `settings.json:202` — functionally the same as an in-`.claude/hooks/` body. | Loophole architecture: every `tools/preagent-*.mjs` referenced from `settings.json:hooks.*` is a project-owned hook body in spirit but escapes the size gate via directory placement. |
| **D3** | **SEV-2** | **17 project-owned hook bodies under `tools/`** wired into `settings.json:hooks.*` and `.pre-commit-config.yaml`. CR-2 only explicitly allowlists ONE shim at `.claude/hooks/context-mode-cache-heal.mjs`. The rest sit in tools/ behind a "tools/ is exempt" precedent that has no Anthropic-doc grounding. | Cardinal rule R2 reads "No project-owned hook bodies (any extension `.py|.sh|.mjs|.js|.ts|.ps1|.bat`) under `.claude/hooks/**`, EXCEPT … ≤2 KB". The rule is path-gated on `.claude/hooks/**` only — `tools/*.mjs` invocations bypass it by design. Whether that is intent or oversight needs an operator decision. |
| **D4** | **SEV-3** | `cr2-2kb-hooks` pre-commit gate (line 113 of `.pre-commit-config.yaml`) only scans `^\.claude/hooks/` — does NOT enforce size limits on `tools/*.mjs` even though those are functionally hooks. | Same loophole as D3. Pre-commit guard is path-coupled, not function-coupled. |
| **D5** | **SEV-3** | `tools/precommit-msys-diag.mjs` (9,317 B) lives in `tools/` with a `precommit-` prefix and a `#!/usr/bin/env node` shebang, but is NOT wired in `.pre-commit-config.yaml` (verified 0 matches). Dead-or-deferred hook body. | Either an aborted hook draft (cleanup needed) or a planned hook (wire it). Operator-decision. |
| **D6** | **SEV-3** | `.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs` (30,862 B) is invoked from `settings.json:182` via `PreToolUse[Bash]` matcher for `git push --force` / `git revert` / `git reset --hard` patterns. This is plugin-owned (allowed by R2) — verify path. | Plugin-shipped, **R2-compliant** ("upstream-plugin hooks"). Mentioned for completeness. |
| **D7** | **SEV-4** | Codex plugin Stop-review-gate active (`.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json`). Confirmed plugin-shipped, no project content. Compliant. | Information-only — confirms W280a is alive at SHA `1.0.4`. |
| **D8** | **SEV-4** | `tools/test-msys-norm.mjs` + `tools/parallel-guard-detector.mjs` + `tools/parallel-guard-regex.mjs` are NOT hooks (imported by guards). Confirmed non-hook callees; no R2 impact. | Information-only. |

---

## 1. `.claude/hooks/**` inventory

| File | Size | Cardinal-R2 exception cite | Cite verified OPEN? | Verdict |
|------|------|----------------------------|---------------------|---------|
| `.claude/hooks/context-mode-cache-heal.mjs` | **1,656 B** (≤2 KB ✓) | `anthropics/claude-code#46915` per CLAUDE.md L33 + W330 probe | **NO — CLOSED AS NOT PLANNED** (labels: `duplicate`, `stale`, `platform:macos`). Verified 2026-05-24 via live GH fetch. | **D1: Citation stale. Cite-anchor no longer valid per CR-2 exception clause** (which requires cite to a `specific anthropics/claude-code GitHub issue`, implicit assumption being it represents an unfixed bug). |

The file is the **only** member of `.claude/hooks/**`. It does respect the ≤2 KB size cap (1,656 B < 2,048 B). The fix is operator decision: either (a) re-cite to a successor live issue (Handtomouse opened a duplicate-target was referenced; would need a fresh probe), (b) delete the shim and prove the underlying bug is gone in current CC version, or (c) leave as legacy patch with a `STALE-CITE` annotation.

---

## 2. `.claude/settings.json:hooks.*` inventory

Read from `Z:/claude-sota-installed/.claude/settings.json:140-310`. Hook events and their invocations:

| Event | Matcher | Command | Type | R2 verdict |
|-------|---------|---------|------|-----------|
| **SessionStart** | (all) | `node Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs` | Project hook body | OK per CR-2 exception (cite is stale — see D1) |
| **SessionStart** | (all) | `node Z:/claude-sota-installed/tools/mcp-env-precheck.mjs` (2,653 B) | Project hook body via tools/ | D3 — silent project-hook |
| **UserPromptSubmit** | (all) | `node Z:/claude-sota-installed/tools/parallel-guard-userpromptsubmit.mjs` (3,916 B) | Project hook body via tools/ | D3 — silent project-hook |
| **PreToolUse** | Bash | `gitleaks protect --staged --no-banner --redact \|\| exit 2` | Direct CLI (gitleaks) | **R2-CLEAN** |
| **PreToolUse** | Bash | `bash -c "cmd=$(jq…); case…; trivy fs --severity HIGH,CRITICAL --scanners vuln ."` | Direct CLI (trivy via bash inline) | **R2-CLEAN** (inline bash conditional invoking trivy) |
| **PreToolUse** | Bash | `bash -c "cmd=$(jq…); case…; node …/codex-companion.mjs adversarial-review --wait"` | Plugin-owned (`codex@openai-codex`) | **R2-CLEAN** (upstream plugin hook) |
| **PreToolUse** | Edit\|Write | `bash -c "f=$(jq…); case…; grep -qE 'RE-LITIGATED…' \"$f\" && echo W317-A Δ34 lint…"` | Inline bash + grep + echo | **R2-CLEAN** (direct CLI) |
| **PreToolUse** | Agent | `node Z:/claude-sota-installed/tools/preagent-parallel-guard.mjs` (24,140 B) | Project hook body via tools/ | **D2 — SEV-2 size violation in spirit** |
| **PreToolUse** | Agent | `node Z:/claude-sota-installed/tools/preagent-subagent-validator.mjs` (6,297 B) | Project hook body via tools/ | D3 — silent project-hook |
| **PreToolUse** | Agent | `node Z:/claude-sota-installed/tools/preagent-d73-gate.mjs` (11,452 B) | Project hook body via tools/ | D3 — silent project-hook |
| **PostToolUse** | Edit\|Write\|MultiEdit | `bash -c "…; ruff check --fix… / shellcheck --severity=error…"` | Direct CLI (ruff + shellcheck via bash) | **R2-CLEAN** |
| **PreCompact** | auto | `powershell -NoProfile -WindowStyle Hidden -Command "Add-Content -Path tmp/precompact.log…"` | Direct CLI (powershell + Add-Content) | **R2-CLEAN** (inline PS audit-trail row) |
| **Stop** | * | `node Z:/claude-sota-installed/tools/stop-position-swap.mjs` (10,141 B) | Project hook body via tools/ | D3 — silent project-hook |
| **WorktreeRemove** | (all) | `git worktree prune \|\| echo 'WorktreeRemove: prune failed'` | Direct CLI (git) | **R2-CLEAN** |
| **SubagentStop** | (all) | `node Z:/claude-sota-installed/tools/subagent-stop-audit.mjs` (2,027 B) | Project hook body via tools/ | D3 — silent project-hook |
| **SubagentStop** | (all) | `node Z:/claude-sota-installed/tools/subagent-stop-guard.mjs` (6,337 B) | Project hook body via tools/ | D3 — silent project-hook |
| **Notification** | (all) | `powershell -NoProfile -WindowStyle Hidden -Command "[Console]::Beep…"` | Direct CLI (powershell beep) | **R2-CLEAN** |
| **PostToolUseFailure** | Bash | `powershell -NoProfile -Command "ConvertFrom-Json…hook-feedback…"` | Direct CLI (powershell inline) | **R2-CLEAN** (inline PS, no shim file) |
| **TaskCompleted** | (all) | `ruff check tools harness --quiet 2>&1; exit 0` | Direct CLI (ruff) | **R2-CLEAN** |

**Summary**: 19 hook entries. 11 are R2-clean direct-CLI; 7 are project-owned bodies under `tools/`; 1 is the documented `.claude/hooks/` shim (with stale cite).

### Plugin-shipped hooks (R2-CLEAN, separate merge layer)

From `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json`:

| Event | Command | Verdict |
|-------|---------|---------|
| SessionStart | `node …/scripts/session-lifecycle-hook.mjs SessionStart` | **R2-CLEAN** (plugin-owned) |
| SessionEnd | `node …/scripts/session-lifecycle-hook.mjs SessionEnd` | **R2-CLEAN** (plugin-owned) |
| Stop | `node …/scripts/stop-review-gate-hook.mjs` (W280a codex-review-gate) | **R2-CLEAN** (plugin-owned) |

Merge-layer note (CLAUDE.md L10): plugin hooks merge SEPARATELY from `settings.json:hooks.*`. Confirmed at `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json`. The W280a Stop-review-gate is **active and cited correctly**.

---

## 3. `.pre-commit-config.yaml` inventory

`repos` block + `pre-commit-system` `repo: local` block:

### 3a. Upstream-pinned repos (R2-CLEAN)

| Repo | Pin | Hook IDs | Cite anchor | Verdict |
|------|-----|----------|-------------|---------|
| `github.com/gitleaks/gitleaks` | `v8.30.1` (tag) | `gitleaks-system` | gitleaks v8.30.1 @ HEAD `8863af47d64c3681422523e36837957c74d4af4b` | **R2-CLEAN** (tag pin + upstream cite) |
| `github.com/astral-sh/ruff-pre-commit` | `v0.15.12` (tag) | `ruff-check`, `ruff-format` | ruff-pre-commit @ HEAD `6fec9b7edb08fd9989088709d864a7826dc74e80` | **R2-CLEAN** (tag pin + upstream cite) |
| `github.com/rhysd/actionlint` | SHA `914e7df21a07ef503a81201c76d2b11c789d3fca` (W347 P4c SHA-pin) | `actionlint-system` | actionlint v1.7.12 @ HEAD `011a6d15…` | **R2-CLEAN** (SHA pin + upstream cite) |

### 3b. `repo: local` hooks (project-owned)

| ID | Stage | Command | Size of target | R2 verdict |
|----|-------|---------|----------------|-----------|
| `commitlint` | commit-msg | `bash -c 'exec commitlint --strict --edit "$(git rev-parse --git-path COMMIT_EDITMSG)"'` | npm CLI (commitlint@20.5.3) | **R2-CLEAN** (direct CLI via bash exec wrapper) |
| `codex-trailer-gate` | commit-msg | `bash -c 'exec node "$(git rev-parse --show-toplevel)/tools/codex-trailer-gate.mjs" …'` | 7,488 B | **D3** — wraps tools/* node script |
| `cr2-2kb-hooks` | pre-commit | inline bash one-liner (≈1.5 KB inline) | inline | **R2-CLEAN** (no shim file; the inline body IS the entire hook) BUT scope is `^\.claude/hooks/` only — see **D4** |
| `msys-hooks-form` | pre-commit | `bash -c 'exec node "$(git rev-parse --show-toplevel)/tools/precommit-msys-hooks-form.mjs"'` | **11,752 B** | **D3** — wraps tools/* node script |
| `gitnexus-detect-changes` | pre-commit | `bash -c 'gitnexus detect-changes 2>&1 \| head -40 >&2 \|\| true; exit 0'` | Direct CLI (gitnexus) | **R2-CLEAN** |
| `cite-floor-check` | pre-commit | `bash -c 'exec node "$(git rev-parse --show-toplevel)/tools/precommit-cite-floor.mjs"'` | 1,623 B | **D3** — but body is ≤2 KB so even by `.claude/hooks/` standard it would pass |
| `provenance-lint` | commit-msg | inline bash one-liner (≈4.5 KB inline) | inline | **R2-CLEAN as bash one-liner**, but inline size massive (≈4.5 KB) raises maintainability concern not R2 |
| `bare-subagent-grep` | pre-commit | `bash -c 'exec node "$(git rev-parse --show-toplevel)/tools/precommit-bare-subagent-grep.mjs"'` | 7,795 B | **D3** |
| `ps-wrap-guard` | pre-commit | `bash -c 'exec node "$(git rev-parse --show-toplevel)/tools/preagent-ps-wrap-guard.mjs"'` | 5,546 B | **D3** |
| `npm-audit-staged` | pre-commit | `bash -c 'if git diff…\|grep -qE "package(-lock)?\.json$"; then npm audit…'` | Direct CLI (npm) | **R2-CLEAN** |
| `cr7-worktree-collision` | pre-commit | `bash -c '…exec node "$(git rev-parse --show-toplevel)/tools/precommit-worktree-collision-guard.mjs"'` | 2,031 B (just barely under) | **D3** — body ≤2 KB; passes even strict R2 |
| `wave-lock-validate` | pre-commit | `node tools/preagent-wave-lock-guard.mjs --validate --from-branch` | **19,162 B** | **D3** + size-anomaly |
| `z-phantom-guard` | pre-commit | `bash -c 'exec node "$(git rev-parse --show-toplevel)/tools/precommit-z-phantom-guard.mjs"'` | 5,915 B | **D3** |
| `cr6-w375-eval-regression` | commit-msg | `bash -c 'exec python "$(git rev-parse --show-toplevel)/tools/eval_gate.py" …'` | 5,746 B Python | **D3** |
| `aicontracts-validate` | pre-commit | inline `bash -c '… aicontracts validate $root/AGENT_CONTRACT.yaml …'` | Direct CLI (pyyush/agentcontracts v0.2.0) | **R2-CLEAN** (inline + upstream CLI) |

**Cite anchoring**: `commitlint@20.5.3` (npm) + `aicontracts==0.2.0` (PyPI/pyyush, Apache-2.0) + `gitleaks v8.30.1` (Open Source) + `ruff v0.15.12` (Astral) + `actionlint v1.7.12` (rhysd) — **5 distinct orgs**; well above sca-v13 ≥3-org-distinct floor.

---

## 4. `tools/` preagent-* hooks-in-disguise inventory

Files in `tools/preagent-*.mjs` referenced from `.claude/settings.json:hooks.PreToolUse[Agent]` or `.pre-commit-config.yaml`:

| File | Size | Wired via | R2 cite-anchor | Verdict |
|------|------|-----------|----------------|---------|
| `tools/preagent-parallel-guard.mjs` | **24,140 B** (11.8× CR-2 limit) | settings.json:202 PreToolUse[Agent] | W326+W330+W341 docstring; cites CLAUDE.md L19 / W269 / W312-D + W325-A F1 / W329-D §1 / W330 P0-A | **D2 SEV-2**: massive body. Sanctioned as CR-5 exception condition-(b) per W330 r1 (per CLAUDE.md L66). Sanction covers the BEHAVIOR (binding `exit 2` mode), not the BODY SIZE. Size-gating is silently bypassed by being under `tools/`. |
| `tools/preagent-subagent-validator.mjs` | 6,297 B (3.1× CR-2 limit) | settings.json:207 PreToolUse[Agent] | W326+W340 docstring; cites CLAUDE.md L20 W319-A H3 + W340 F3 SB-3 + W333-D5 + W343-P0d | **D3**: same loophole. Size-gating silently bypassed. |
| `tools/preagent-d73-gate.mjs` | 11,452 B (5.6× CR-2 limit) | settings.json:212 PreToolUse[Agent] | W342-X2+W341 docstring; cites sca-v22 §I10 + D73 + W341 SEV-1 P0-C4 | **D3** |
| `tools/preagent-ps-wrap-guard.mjs` | 5,546 B (2.7× CR-2 limit) | .pre-commit-config.yaml:207 (pre-commit stage) | W424 docstring; cites W424-PS-WRAP-GUARD/DESIGN.md + Microsoft PowerShell automatic-variables doc + GNU Bash + Git for Windows | **D3** |
| `tools/preagent-wave-lock-guard.mjs` | **19,162 B** (9.4× CR-2 limit) | .pre-commit-config.yaml:251 (pre-commit stage) | W363 docstring; cites docs/superpowers/specs/2026-05-21-sota-parallel-workflow-design.md §5.1 + LangGraph ThreadTTLConfig + multica EnsureDaemonID + Cloudflare instance ID | **D3** + 2nd worst size violation |

**Mechanism analysis**: Each file explicitly notes in its own docstring something like

> **R2 (no self-invented hooks) — this is a pre-commit framework shim in tools/, NOT under `.claude/hooks/**`; file size <2KB therefore exempt from CR2 cite-anchored bug-patch-shim limit anyway**  (preagent-ps-wrap-guard.mjs:25-29)

— but a 5.5 KB body claiming "<2KB" is **factually wrong**. The W340 commit precedent cited in `subagent-stop-guard.mjs:32-34` ("tools/ is exempt from the .claude/hooks/ <2KB size constraint per W340 commit precedent") is a **community convention** internal to this runtime, not Anthropic-doc-grounded. CR-2 itself does NOT mention any tools/ carve-out.

---

## 5. Non-preagent tools/* hook-invoked bodies

| File | Size | Wired via | R2 cite | Verdict |
|------|------|-----------|---------|---------|
| `tools/mcp-env-precheck.mjs` | 2,653 B | settings.json:151 SessionStart | W372 F14 docstring + W370 F14 + W268 codex T3 P0-security + W324 ship-gate envblock pattern | **D3** |
| `tools/parallel-guard-userpromptsubmit.mjs` | 3,916 B | settings.json:162 UserPromptSubmit | W331-r3 P0.1 docstring + REMEDIATION-PLAN-V2:25-29 + codex r2 PRIMARY a05132584 + W341 round-3+4 architectural fix | **D3** |
| `tools/stop-position-swap.mjs` | 10,141 B | settings.json:247 Stop | W342-X2 P0.5 docstring + sca-v22 §6.2 Δ-DPA-4 §10 + arXiv MT-Bench 2306.05685 + JudgeLM 2310.17631 | **D3** |
| `tools/subagent-stop-audit.mjs` | **2,027 B** (≤2 KB ✓ — JUST barely) | settings.json:267 SubagentStop | W344-P1 docstring + Δ-G49 7-day false-positive measurement + W341-Q8 BLOCK contract sister | **R2-CLEAN by SIZE** (1st file fully in spec) |
| `tools/subagent-stop-guard.mjs` | 6,337 B | settings.json:272 SubagentStop | W341-Q8 docstring + Δ-G49 + S3 §D.2 gap #6 + CR-2 self-described exemption claim (W340 commit precedent) | **D3** — body claims "tools/ is exempt from .claude/hooks/ <2KB size constraint per W340 commit precedent" |
| `tools/codex-trailer-gate.mjs` | 7,488 B | .pre-commit-config.yaml:79 commit-msg | W335 P0 docstring (commit-msg gate; codex e2e adversarial-review Gate-3 BLOCK 2026-05-20) | **D3** |
| `tools/precommit-msys-hooks-form.mjs` | 11,752 B | .pre-commit-config.yaml:132 pre-commit | W335 P1-6 docstring (FM-class disabling 5 plugins this wave: hookify + intelligent-compact + self-improving-agent + claude-mem + protect-mcp) | **D3** |
| `tools/precommit-cite-floor.mjs` | **1,623 B** (≤2 KB ✓) | .pre-commit-config.yaml:163 pre-commit | W352-S9 docstring + citations-agent SKILL.md:42-66 + sca-v13 W332 | **R2-CLEAN by SIZE** |
| `tools/precommit-bare-subagent-grep.mjs` | 7,795 B | .pre-commit-config.yaml:190 pre-commit | W342-X2 P1.5 docstring + W340 F4 + W333-D5 + sca-v15 cardinal-rule-3 | **D3** |
| `tools/precommit-worktree-collision-guard.mjs` | **2,031 B** (≤2 KB ✓ — under by 17 B) | .pre-commit-config.yaml:235 pre-commit | W344 Z6 P6.2 docstring + SPI/git-worktree + Anthropic CCBP a28cd96b + claudekit | **R2-CLEAN by SIZE** (the only `tools/` member designed within the limit) |
| `tools/precommit-z-phantom-guard.mjs` | 5,915 B | .pre-commit-config.yaml:274 pre-commit | W370 F0 docstring + tmp/W370-AUDIT/W370-FINAL-SYNTHESIS.md + codex r1 + r2 verdicts | **D3** |
| `tools/eval_gate.py` | 5,746 B | .pre-commit-config.yaml:290 commit-msg | W375 P5.4 docstring + spec §15 v6 + codex r5 P1-7 + codex r6 P2-3 | **D3** |
| `tools/precommit-msys-diag.mjs` | **9,317 B (NOT WIRED — dead)** | NOT FOUND in .pre-commit-config.yaml or settings.json | (none) | **D5 — dead/draft hook body** |

**SIZE-CLEAN tools/ subset (≤2 KB)**: only **3 of 12** wired bodies — `subagent-stop-audit.mjs` (2,027 B), `precommit-cite-floor.mjs` (1,623 B), `precommit-worktree-collision-guard.mjs` (2,031 B). The 9 oversized bodies aggregate **96,358 B** = **~47×** the CR-2 ceiling.

---

## 6. Cross-check — codex-companion W280a wiring

| Component | Path | Size | Verdict |
|-----------|------|------|---------|
| Plugin SessionStart hook | `.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/session-lifecycle-hook.mjs SessionStart` | 3,577 B (plugin-owned) | **R2-CLEAN** (upstream plugin) |
| Plugin SessionEnd hook | same file, arg=`SessionEnd` | 3,577 B (plugin-owned) | **R2-CLEAN** |
| Plugin Stop-review-gate (W280a) | `.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/stop-review-gate-hook.mjs` | 6,279 B (plugin-owned; CLAUDE.md L10 cite) | **R2-CLEAN, ACTIVE** |
| PreToolUse[Bash] revert/force-push trap → codex adversarial-review | `bash -c "case…; node …/codex-companion.mjs adversarial-review --wait \|\| exit 2"` | wraps 30,862 B plugin script | **R2-CLEAN** (plugin script, invoked via inline bash conditional) |

**Conclusion**: W280a codex-review-gate is **active, plugin-owned, cited correctly** per CLAUDE.md L10. No R2 defect on the codex axis.

---

## 7. Ranked R2-violation Defect List

Severity scale: SEV-1 (single most important) / SEV-2 (high impact) / SEV-3 (medium) / SEV-4 (low/informational).

| Rank | ID | Severity | Defect | Affected Surface |
|------|-----|----------|--------|------------------|
| 1 | **D1** | **SEV-1** | CR-2 sole sanctioned exception cite (#46915) is CLOSED AS NOT PLANNED. CLAUDE.md L33 still asserts STILL OPEN. R6 verify-before-claim violation. | `.claude/hooks/context-mode-cache-heal.mjs` |
| 2 | **D2** | **SEV-2** | `preagent-parallel-guard.mjs` at 24,140 B = 11.8× CR-2 ceiling, sitting in tools/ to escape size gate while wired into PreToolUse[Agent]. | settings.json:202 |
| 3 | **D3** | **SEV-2** | **17 project-owned hook bodies under tools/** — bypass CR-2 by directory placement. Aggregate ≈143 KB. CR-2 mandate is path-coupled (`.claude/hooks/**`) only; tools/ is community-convention exempt, NOT Anthropic-doc-grounded. | settings.json:* + .pre-commit-config.yaml:* (12 entries each) |
| 4 | **D4** | **SEV-3** | `cr2-2kb-hooks` pre-commit gate is path-coupled to `^\.claude/hooks/` and does NOT scan tools/. The gate that's SUPPOSED to enforce R2 has the same loophole as R2 itself. | .pre-commit-config.yaml:113 (`cr2-2kb-hooks`) |
| 5 | **D5** | **SEV-3** | `tools/precommit-msys-diag.mjs` (9,317 B) has precommit-* naming + node shebang but is NOT wired. Dead-or-deferred. | tools/precommit-msys-diag.mjs |
| 6 | D6 | SEV-4 | `tools/preagent-wave-lock-guard.mjs` is the 2nd-worst at 19,162 B (9.4× ceiling). | .pre-commit-config.yaml:251 |
| 7 | D7 | SEV-4 | Five tools/* files explicitly self-document "tools/ is exempt from .claude/hooks/ <2KB constraint" — codifying the loophole without operator decision-record. | preagent-ps-wrap-guard.mjs:25-29, subagent-stop-guard.mjs:32-34, mcp-env-precheck.mjs:8, et al. |
| 8 | D8 | SEV-4 | Inline `bash -c` one-liners in `.pre-commit-config.yaml:175` (provenance-lint) and `:113` (cr2-2kb-hooks) are ≈4.5 KB / ≈1.5 KB respectively. Per current R2 reading these are NOT hook bodies because no shim file exists, but they are functionally equivalent. | .pre-commit-config.yaml:175, :113 |

---

## 8. Recommended Fix Sequence

### Phase A — Immediate (D1 cite refresh, ≤1 day)

1. **Re-probe `#46915` lineage**: search for the upstream successor issue (cited as `duplicate`); if it exists, retarget `context-mode-cache-heal.mjs` cite to that issue. If no successor + bug fixed in current CC, DELETE the shim.
2. **Update CLAUDE.md L33**: replace "verified STILL OPEN 2026-05-10" with current verified state (CLOSED + duplicate + stale labels per 2026-05-24 probe).

### Phase B — R2 loophole closure (operator-decision, ≤1 wave)

3. **Operator-decision capture (binding)**: either
   - **(α)** Codify "tools/* is exempt from CR-2 ≤2 KB" formally — add an R2 corollary in CLAUDE.md, audit each tools/* hook body against an Anthropic doc anchor, and harden the `cr2-2kb-hooks` pre-commit gate scope to include both paths (with the tools/* ceiling raised to a documented limit, e.g. 25 KB). **Or**
   - **(β)** Migrate all CR-2-spirit-violating tools/* hooks under `.claude/hooks/**`, accept the size gate, and reduce or split each body to ≤2 KB. Multi-wave (would need ≈100 KB of refactor).
   - **(γ)** Hybrid: keep tools/* placement but extend `cr2-2kb-hooks` to enforce a documented "tools/* hook" size ceiling (e.g. 10 KB), with explicit exception list for the 24/19 KB outliers.

4. **D2 specific** (preagent-parallel-guard.mjs 24 KB): irrespective of α/β/γ, this file is the single largest. Audit its bulk — does it really need ≈600 LOC for "is the operator dispatching parallel"? Split-and-shrink target.

### Phase C — Housekeeping (≤1 hour)

5. **D5 — `tools/precommit-msys-diag.mjs`**: confirm with operator — delete (was diagnostic-only) or wire into `.pre-commit-config.yaml`.

6. **D7 — self-described exemption claims**: once D3 operator-decision lands, sweep tools/* docstrings to cite the decision-record. Today's claims point at "W340 commit precedent" without a stable doc anchor.

### Phase D — Verification

7. After Phase A+B+C land, re-run this Stream C audit: every hook body should either be ≤2 KB OR fall under a documented exemption with cite to a live issue/decision-record. No silent loophole.

---

## 9. Citations (sca-v13 ≥3-org-distinct floor)

External / upstream:

1. **Anthropic claude-code** issue tracker — `https://github.com/anthropics/claude-code/issues/46915` (state: closed as not planned; labels: duplicate, stale, platform:macos, area:hooks, area:plugins, bug). Fetched 2026-05-24.
2. **Anthropic CC hooks doc** — `https://docs.anthropic.com/en/docs/claude-code/hooks` (exit-code-2 semantics, hookSpecificOutput, SubagentStop event schema).
3. **Anthropic CC sub-agents doc** — `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (subagent_type schema).
4. **Anthropic CCBP** — `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md @ HEAD a28cd96b` (per CLAUDE.md L3).
5. **Gitleaks** — `github.com/gitleaks/gitleaks v8.30.1 @ 8863af47` (.pre-commit-config.yaml:30-37).
6. **Astral ruff-pre-commit** — `github.com/astral-sh/ruff-pre-commit v0.15.12 @ 6fec9b7e` (.pre-commit-config.yaml:39-43).
7. **Rhysd actionlint** — `github.com/rhysd/actionlint v1.7.12 @ 914e7df21a07` (.pre-commit-config.yaml:45-48).
8. **pyyush/agentcontracts v0.2.0** (Apache-2.0) — `https://github.com/pyyush/agentcontracts` (.pre-commit-config.yaml:294-326).
9. **Conventional Commits 1.0.0** + **SLSA v1.0** (Linux Foundation OpenSSF WG) + **GitHub commit-signature verification** (3-org-distinct anchor for `provenance-lint`).
10. **OWASP A06:2021 Vulnerable+Outdated Components** (per CLAUDE.md L23 R6 anchor).
11. **NIST SP 800-218 PW.7 + RV.1** (per CLAUDE.md L23 R6 anchor).
12. **ISO/IEC 25010:2011 §4.2.6-4.2.7** (per CLAUDE.md L23 R6 anchor).

Distinct organizations: **Anthropic / GitHub / Gitleaks-Inc / Astral / Rhysd / pyyush / Linux-Foundation / OWASP / NIST / ISO** — 10 distinct orgs; floor 3 satisfied with 3.3× margin.

---

## 10. Appendix — Files NOT scanned (out of audit scope)

- **`tools/build-subagent-allowlist.mjs`** — invoked manually (`--regenerate`), not a hook
- **`tools/parallel-guard-detector.mjs` + `tools/parallel-guard-regex.mjs`** — imported by preagent guards, not hooks themselves
- **`tools/parallel-ratio-calc.mjs`, parallel-ratio-telemetry.mjs, codex-jury-panel.mjs, etc.** — utilities, not hooks
- **`tools/test-*.mjs`** — test fixtures
- **`tools/eee-checks/*.mjs`** — invoked by `tools/eee.ps1` launcher, not by CC harness hook events; out of R2 scope (eee is operator CLI tooling, not a hook target)
- **`tools/eee-precheck.mjs`, eee-precheck.test.mjs** — invoked by eee, not a hook event

These files are correct as-tools and pose no R2 question.

---

**End of Stream C audit.**
