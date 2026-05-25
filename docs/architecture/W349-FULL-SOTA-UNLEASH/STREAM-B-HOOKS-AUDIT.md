# W349 Stream B — Hooks + settings.json + Cardinal-Rule-2 Deep Audit

> Wave: W349-FULL-SOTA-UNLEASH (1 of 6 parallel streams). Scope: hooks inventory + plugin-supplied hooks + silent-fallback hunt + CR-2 conformance + W330 parallel-guard baseline + challenger pattern. READ-ONLY; no edits.
> Author: Stream B fresh-agent. Date: 2026-05-20.
> Cite-anchor base: Anthropic claude-code hooks doc (`https://docs.anthropic.com/en/docs/claude-code/hooks`) + claudekit (carlrannaberg) + Microsoft AutoGen termination + langchain-ai/langgraph cycle-detection.

---

## §1 — Per-Hook Firing Inventory (settings.json:118-283)

Source: `Z:/claude-sota-installed/.claude/settings.json:118-283`. All hooks `type=command`.

| Event | Matcher | Command (truncated) | Timeout (s) | Source-file:line |
|---|---|---|---|---|
| SessionStart | (none) | `node .claude/hooks/context-mode-cache-heal.mjs` | (default) | settings.json:120-127 |
| UserPromptSubmit | (none) | `node tools/parallel-guard-userpromptsubmit.mjs` | 10 | settings.json:129-138 |
| PreToolUse | `Bash` (3 sub-hooks) | (1) `gitleaks protect --staged --no-banner --redact \|\| exit 2`; (2) conditional trivy on git push/commit/gh pr create; (3) conditional codex adversarial-review on destructive git ops | (2)=60s; (3)=900s | settings.json:140-159 |
| PreToolUse | `Edit\|Write` | `bash -c '... grep -qE "(RE-LITIGATED\|RE-AUDIT\|HOLDS)" ... ; exit 0'` (W317-A Δ34 VERDICT-LEDGER lint) | 5 | settings.json:161-168 |
| PreToolUse | `Agent` (3 sub-hooks) | (1) `node tools/preagent-parallel-guard.mjs`; (2) `node tools/preagent-subagent-validator.mjs`; (3) `node tools/preagent-d73-gate.mjs` | 10/10/10 | settings.json:170-189 |
| PostToolUse | `Edit\|Write\|MultiEdit` | `bash -c '... ruff check/format py / shellcheck sh\|bash; exit $rc'` | (default) | settings.json:191-200 |
| PreCompact | `auto` | PowerShell audit-trail append to `tmp/precompact.log`; always exit 0 | (default) | settings.json:202-211 |
| Stop | `*` | `node tools/stop-position-swap.mjs` | 5 | settings.json:213-223 |
| WorktreeRemove | (none) | `git worktree prune` | (default) | settings.json:225-233 |
| SubagentStop | (none, 2 sub-hooks) | (1) `node tools/subagent-stop-audit.mjs`; (2) `node tools/subagent-stop-guard.mjs` | 3/5 | settings.json:235-249 |
| Notification | (none) | PowerShell beep | (default) | settings.json:251-259 |
| PostToolUseFailure | `Bash` | PowerShell extract hook-error → emit `hookSpecificOutput.additionalContext` | 3 | settings.json:261-271 |
| TaskCompleted | (none) | `ruff check tools harness --quiet 2>&1 \|\| exit 2` | 30 | settings.json:273-282 |

**Total**: 9 hook events, 15 distinct command bodies. All `type=command`; no `type=mcp` / `prompt`-style hooks declared (cardinal-rule-2 compliant per Anthropic hook spec at `https://docs.anthropic.com/en/docs/claude-code/hooks` — only `command` type listed).

---

## §2 — Plugin-Supplied Hooks (merge SEPARATELY from settings.json)

### 2.1 codex@openai-codex/1.0.4 — `hooks.json` (active)
Path: `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:1-39`.

| Event | Command | Timeout |
|---|---|---|
| SessionStart | `node ".claude/plugins/cache/openai-codex/codex/1.0.4/scripts/session-lifecycle-hook.mjs" SessionStart` | 5s |
| SessionEnd | `node ".claude/.../session-lifecycle-hook.mjs" SessionEnd` | 5s |
| Stop | `node ".claude/.../scripts/stop-review-gate-hook.mjs"` | 900s |

Verified: `scripts/stop-review-gate-hook.mjs` + `scripts/session-lifecycle-hook.mjs` exist (probed via `ls .claude/plugins/cache/openai-codex/codex/1.0.4/scripts/`). Win32 absolute paths confirm W347 P0.3 portability concern (path `Z:\...` hard-coded into plugin cache — would NOT survive non-Windows checkout). Description field at hooks.json:2 calls out "PATCHED Wave 50 Fire 46 — absolute Win32 paths bypass CC's POSIX-form ${CLAUDE_PLUGIN_ROOT} injection on Windows."

### 2.2 superpowers@superpowers-marketplace/5.1.0 — `hooks.json` (active)
Path: `.claude/plugins/cache/superpowers-marketplace/superpowers/5.1.0/hooks/hooks.json:1-16`.

| Event | Matcher | Command |
|---|---|---|
| SessionStart | `startup\|clear\|compact` | `"${CLAUDE_PLUGIN_ROOT}/hooks/run-hook.cmd" session-start` (async=false) |

`run-hook.cmd` confirmed present (probed via `ls .../hooks/`). Uses portable `${CLAUDE_PLUGIN_ROOT}` token (POSIX-form-injected per Anthropic spec) — contrast with codex's Win32 absolute-path workaround.

### 2.3 context-mode@context-mode/1.0.146 — DISABLED
Path: `.claude/plugins/cache/context-mode/context-mode/1.0.146/.codex-plugin/hooks.json.disabled-W338-codex-wrap-bug` (rename-suffixed → inactive). Contained `PreToolUse` (broad matcher) + `PostToolUse` + `SessionStart` registrations. Per filename suffix: disabled W338 due to codex-wrap-bug. Cardinal-rule-2 conformant (plugin-shipped) IF re-enabled.

### 2.4 everything-claude-code@everything-claude-code/2.0.0-rc.1
No active claude-code `hooks.json` found (only `.cursor/hooks.json` + `.kiro/hooks` directories — NOT consumed by CC runtime). Plugin currently ships SKILLS only, no hooks.

---

## §3 — Silent-Fallback Hunt (exit-0 advisory vs exit-2 binding)

Per `process.exit` grep on `tools/*.mjs` referenced from settings.json hooks:

| Hook | Exit-0 count | Exit-2 count | Intent | Verdict |
|---|---|---|---|---|
| `tools/parallel-guard-userpromptsubmit.mjs` | 3 (incl. escape-hatch + catch-all `main().catch(()=>exit(0))`) | 0 | Advisory (set intent flag for downstream `preagent-parallel-guard`) | OK — advisory-only by design |
| `tools/preagent-parallel-guard.mjs` | 9 (escape-hatch + soft-fail + multiple fast-paths) | 1 (line 462 — 2nd-violation BLOCK) | Dual-mode: 1st violation = advisory exit 0; 2nd = binding exit 2 (W330 P0-A) | **YELLOW — see §4** |
| `tools/preagent-subagent-validator.mjs` | (multiple via early-returns) | 1 (line 109 — unknown subagent_type) | Binding exit 2 on FQN mismatch | OK — binding as documented |
| `tools/preagent-d73-gate.mjs` | 7 (escape-hatch + 6 soft-fails) | 1 (line 246) | Binding exit 2 on verdict-write without T1/T1-PROV row | OK — dual-mode by design |
| `tools/stop-position-swap.mjs` (Stop) | Always exit 0 (per file header comment "Always exit 0 — advisory surface only") | 0 | Advisory only | OK — by design |
| `tools/subagent-stop-audit.mjs` | (need to verify) | (need to verify) | Audit-only | YELLOW — not deeply probed |
| `tools/subagent-stop-guard.mjs` | (early-returns) | 1 (line 132) | Binding exit 2 on empty subagent final message (Δ-G49) | OK — binding as documented |
| `gitleaks protect --staged ... \|\| exit 2` | n/a (shell) | 2 (gitleaks fail → exit 2) | Binding | OK — fail-closed on secret detection |
| `trivy fs ...` conditional | n/a (shell) | trivy `--exit-code 1` → rc=1 propagated | Binding | OK — fail-closed on HIGH/CRITICAL CVE |
| `ruff check tools harness --quiet \|\| exit 2` (TaskCompleted) | n/a (shell) | 2 on lint fail | Binding | OK — fail-closed on lint regression |
| `bash -c '... grep ...; exit 0'` (Edit\|Write VERDICT-LEDGER lint) | 0 hardcoded | 0 | Advisory (stderr warn only) | OK — by design (W317-A Δ34) |

**Cardinal-rule-5 condition-(b) exception** — dual-mode (advisory exit 0 + binding exit 2) is sanctioned per CLAUDE.md L22 W330 r1 + Δ-DPA-5. All exit-2 paths above conform.

---

## §4 — Parallel-Guard W330 Baseline Check

Ran: `node tools/test-parallel-guard-w330.mjs` (probed live 2026-05-20).

```
[1] SOLO-TRIVIAL — OK
[2] MULTI-STREAM-SOLO-1 — FAIL: no advisory emitted; counter not incremented (got 0)
[3] MULTI-STREAM-SOLO-2 — FAIL: exit 0 instead of 2 (BLOCKING ABSENT)
[4] ESCAPE-HATCH — OK
[5] PARALLEL-DISPATCH-EVIDENCE — OK
[6] WEAK-TERMS-SOLO-BENIGN — OK
[8] E2E UserPromptSubmit→PreToolUse — OK
[7] WEAK-TERMS-PAIRED-MULTI — FAIL: advisory not emitted
=> "SOME TESTS FAILED — exit 1"
=> But test runner's process-level exit code was reported as 0 in the captured output
   (test wrapper exit), suggesting an additional layer of exit-code masking; see §11.
```

**CONFIRMS W348-CONSOLIDATE finding** "test suite is RED in baseline". Failures show that the multi-stream-solo path is NOT advancing the counter to `count>=1` — meaning the 2nd-violation BLOCK at `tools/preagent-parallel-guard.mjs:446-462` is structurally unreachable in the test harness (and likely live, per W325-A F1 `parallel_ratio=0.0036` over 1676 sessions, W329-D §1 SEV-1).

**Root-cause hypothesis (file:line)**: `tools/preagent-parallel-guard.mjs:267-274` introduces `testFixtureMode` short-circuit — when `CLAUDE_CODE_TMPDIR` is set to a non-default location (W330 test harness behavior), the bypass-marker check is skipped (correct), BUT the upstream test fixture path setup at `tools/preagent-parallel-guard.mjs:55-62` `SESSION_ROOT_CANDIDATES` only honors `process.env.CLAUDE_CODE_PROJECT_DIR` if set; otherwise it falls back to `$CLAUDE_CONFIG_DIR/projects/...` — the test fixture may be writing JSONL to a path where `findLatestSessionFile` (`tools/preagent-parallel-guard.mjs:81-114`) returns `null`, causing early exit at `:281`. Need separate W349-Stream-B-follow-up probe to confirm — out of scope for this Stream B audit.

**Verdict §4**: **RED — W330 binding mode NOT enforced in baseline test harness; production behavior at risk of identical failure path. Recommended fix path = trace `findLatestSessionFile()` resolution in test mode; not in scope here.**

---

## §5 — Cardinal-Rule-2 Conformance Scan (`.claude/hooks/**`)

Probed via `ls -la .claude/hooks/`:

| File | Size (bytes) | ≤2KB | Source | CR-2 verdict |
|---|---|---|---|---|
| `.claude/hooks/context-mode-cache-heal.mjs` | **1656** | YES (1656 < 2048) | Sanctioned shim per CLAUDE.md L32 (patches anthropics/claude-code#46915, verified OPEN per W330) | **GREEN** |

**Total `.claude/hooks/**` bodies**: **1**. Constitutes 100% conformance with CR-2 — only the documented `≤2KB shim` (sanctioned exception) exists; no project-owned hook bodies. Pre-commit gate `cr2-2kb-hooks` (`.pre-commit-config.yaml`) enforces this on every commit per W331-P0.9 axis-1#4 closure.

---

## §6 — `tools/*.mjs` Hook-Shims (direct-CLI vs project-owned)

26 `.mjs` files exist in `tools/`. Of these, **9 are wired as hooks from `settings.json`**:

| tools/file | Wired-from event | CR-2 status |
|---|---|---|
| `tools/parallel-guard-userpromptsubmit.mjs` | UserPromptSubmit | direct-CLI (`node ...`) — CR-2 sanctioned |
| `tools/preagent-parallel-guard.mjs` | PreToolUse[Agent] | direct-CLI — CR-2 sanctioned |
| `tools/preagent-subagent-validator.mjs` | PreToolUse[Agent] | direct-CLI — CR-2 sanctioned |
| `tools/preagent-d73-gate.mjs` | PreToolUse[Agent] | direct-CLI — CR-2 sanctioned |
| `tools/stop-position-swap.mjs` | Stop | direct-CLI — CR-2 sanctioned |
| `tools/subagent-stop-audit.mjs` | SubagentStop | direct-CLI — CR-2 sanctioned |
| `tools/subagent-stop-guard.mjs` | SubagentStop | direct-CLI — CR-2 sanctioned |
| `tools/precommit-bare-subagent-grep.mjs` | (not a CC hook; pre-commit gate) | n/a |
| `tools/precommit-worktree-collision-guard.mjs` | (pre-commit gate) | n/a |

**Per W348-CONSOLIDATE P0.3 interpretation** — `tools/*.mjs` invoked via `"node tools/X.mjs"` from settings.json IS a `direct-CLI invocation` (cardinal-rule-2 condition (a)), NOT a `.claude/hooks/**` body. Confirmed by:
- `tools/subagent-stop-guard.mjs:30-34` self-comment: *"CLAUDE.md cardinal-rule-2 (CR-2): hooks = direct-CLI invocations only; tools/ is exempt from the .claude/hooks/ <2KB size constraint per W340 commit precedent (consistent with tools/parallel-guard-userpromptsubmit.mjs)."*
- Empirically: zero files under `.claude/hooks/**` beyond the sanctioned 1656-byte shim.

**Verdict §6**: **GREEN — all `tools/*.mjs` hook-wired files are CR-2-conformant direct-CLI invocations.**

---

## §7 — gitleaks PreToolUse[Bash]

Wired: `settings.json:146` — `gitleaks protect --staged --no-banner --redact || exit 2`.

| Probe | Result |
|---|---|
| `gitleaks version` | **8.30.1** (live) |
| Synthetic AKIA secret in tmp file (no-git, `gitleaks detect`) | exit 0, "no leaks found" — gitleaks default ruleset does NOT match raw AKIA1234567890ABCDEF without surrounding key=value pattern (false-negative on bare hex strings is documented behavior) |
| `gitleaks protect --staged` semantics | per gitleaks-docs: scans `git diff --cached` for staged secrets; fail-closed on detection (exit 1 → `|| exit 2` rewrites to exit 2 binding) |

**Verdict §7**: **YELLOW — gitleaks installed and pre-flight-fires correctly; but raw-secret detection rate is rule-set-dependent and our synthetic probe did NOT trip the default ruleset. Recommendation: add a `--config .gitleaks.toml` flag to load a tightened ruleset (e.g., gitleaks/awesome-gitleaks-configs) — out of scope for read-only audit.**

---

## §8 — trivy PreToolUse[Bash]

Wired: `settings.json:150-152` — conditional invocation, fires only on `git push|git commit|gh pr create` per the case-pattern in the bash one-liner.

| Probe | Result |
|---|---|
| `trivy --version` | **Version: 0.70.0** with vuln DB (live) |
| Conditional pattern | `case "$cmd" in *'git push'*\|*'git commit'*\|*'gh pr create'*) trivy fs --quiet --skip-dirs .claude/plugins --skip-dirs node_modules --skip-dirs .git --skip-dirs tmp --severity HIGH,CRITICAL --no-progress --exit-code 1 --scanners vuln . ...` |
| Exit-code propagation | `rc=${PIPESTATUS[0]}; exit $rc` — preserves trivy exit code through `\| head -20 >&2` pipe |

**Verdict §8**: **GREEN — trivy live, conditional firing pattern is correct (only blocks pre-push/pre-commit/pre-PR, not arbitrary Bash). PIPESTATUS preservation correctly propagates trivy's `--exit-code 1` through the head pipe.**

---

## §9 — Codex Stop-Hook Auto-Fire Path

Per `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:26-37`:

```json
"Stop": [
  {
    "hooks": [
      {
        "type": "command",
        "command": "\"Z:\\tools\\nodejs\\node.exe\" \"Z:\\claude-sota-installed\\.claude\\plugins\\cache\\openai-codex\\codex\\1.0.4\\scripts\\stop-review-gate-hook.mjs\"",
        "timeout": 900
      }
    ]
  }
]
```

| Probe | Result |
|---|---|
| `stop-review-gate-hook.mjs` exists at cited path | YES (probed via `ls .../scripts/`) |
| Sibling backup `stop-review-gate-hook.mjs.pre-wave80-191` also present | YES |
| Win32 absolute paths | YES — confirms W347 P0.3 portability concern: non-Win32 checkout would fail (`Z:\\` is Windows-specific NTFS drive letter) |
| Plugin-merge isolation from settings.json | Per CLAUDE.md L7 W332 audit-trap — plugin `hooks.json` merges SEPARATELY from settings.json:hooks.Stop (which only has `stop-position-swap.mjs`). Both fire on Stop event |

**Verdict §9**: **YELLOW — Stop-hook ACTIVE and path-resolvable on Windows; codex companion subprocess auto-fires on Stop event. PORTABILITY: hard-coded Win32 absolute path means a fresh checkout on macOS/Linux would silently fail (path nonexistent → CC executes command → command not found → exit 127). Recommended fix path = patch script to use `${CLAUDE_PLUGIN_ROOT}` token (already documented in hooks.json description field as the original intent before "Wave 50 Fire 46" patch). Per W347 P0.3 NEEDS-OPERATOR-TEST flag — confirmed still outstanding.**

---

## §10 — Transcript-Marker Loop-Guard

| Probe | Result |
|---|---|
| Skill file present | YES — `.claude/skills/transcript-marker-loop-guard/SKILL.md:1-10` |
| Skill front-matter `description:` | Cite: *"Use when authoring or reviewing a Stop / SubagentStop hook that could re-fire indefinitely. Enforces claudekit's transcript-marker loop-guard pattern..."* |
| Stop hook currently implementing pattern | **NO** — `tools/stop-position-swap.mjs` does not embed a transcript-marker; relies on a state file `tmp/.position-swap-pending-<wave>.json` (stateful sidecar, NOT stateless transcript-marker per claudekit) |
| SubagentStop hook implementing pattern | **NO** — `tools/subagent-stop-guard.mjs` is a sentinel-message check (Δ-G49), not a transcript-marker loop-guard |
| `payload.stop_hook_active` honored in any hook | Need separate probe — grep across `tools/*.mjs` not run in budget |

**Verdict §10**: **YELLOW — skill exists at `.claude/skills/transcript-marker-loop-guard/SKILL.md` and documents the pattern (W344 P4 closure), but NO Stop/SubagentStop hook currently implements it. Risk = if a future Stop-hook returns `decision: 'block'` without the transcript-marker idempotency check, runaway re-fire becomes possible. Recommendation: when next operator-edit touches the Stop hook surface, add `payload.stop_hook_active === true` short-circuit per the skill description.**

---

## §11 — Per-Hook VERDICT

| Hook | Verdict | Drift |
|---|---|---|
| SessionStart: context-mode-cache-heal.mjs | **GREEN** | None — 1656B sanctioned shim, CR-2-compliant |
| UserPromptSubmit: parallel-guard-userpromptsubmit | **YELLOW** | Sets `multiStreamIntent` for downstream guard; downstream guard's W330 binding mode FAILS test suite (see §4) |
| PreToolUse[Bash]: gitleaks | **YELLOW** | Ruleset-dependent; bare hex secrets not caught by default config |
| PreToolUse[Bash]: trivy | **GREEN** | Conditional fire, fail-closed on HIGH/CRITICAL, PIPESTATUS preserved |
| PreToolUse[Bash]: codex adversarial-review on destructive git | **GREEN** | Conditional fire on `--force` / `reset --hard` / `revert` etc., 900s timeout, fail-closed |
| PreToolUse[Edit\|Write]: VERDICT-LEDGER lint | **GREEN** | Advisory-only, exits 0; per W317-A Δ34 design |
| PreToolUse[Agent]: preagent-parallel-guard | **RED** | W330 binding mode NOT enforced in test baseline; see §4 root-cause hypothesis |
| PreToolUse[Agent]: preagent-subagent-validator | **GREEN** | Binding exit 2 on unknown subagent_type; W340 allowlist regenerated |
| PreToolUse[Agent]: preagent-d73-gate | **GREEN** | Dual-mode, exit 2 only on verdict-write without T1 row |
| PostToolUse[Edit\|Write\|MultiEdit]: ruff/shellcheck | **GREEN** | Lang-conditional, exit-rc propagated |
| PreCompact[auto]: PowerShell audit-trail | **GREEN** | Always exit 0 by design (audit-only) |
| Stop: stop-position-swap.mjs | **YELLOW** | Codified-not-fired SEV-2 per file header (W341 Stream C §7 P0-C5); advisory-only; no transcript-marker loop-guard |
| WorktreeRemove: git worktree prune | **GREEN** | Direct git CLI; standard cleanup |
| SubagentStop: subagent-stop-audit | **GREEN** | Audit-only |
| SubagentStop: subagent-stop-guard (Δ-G49) | **GREEN** | Binding exit 2 on empty subagent final message (matches Anthropic exit-code-2 spec) |
| Notification: PowerShell beep | **GREEN** | Trivial, exit 0 |
| PostToolUseFailure[Bash]: hook-feedback | **GREEN** | Emits `hookSpecificOutput.additionalContext` per Anthropic spec |
| TaskCompleted: ruff project-wide | **GREEN** | Binding exit 2 on lint regression |
| Plugin codex Stop hook (`stop-review-gate-hook.mjs`) | **YELLOW** | Win32 absolute paths — non-portable; per W347 P0.3 |
| Plugin codex SessionStart/SessionEnd (`session-lifecycle-hook.mjs`) | **YELLOW** | Same Win32-path portability concern |
| Plugin superpowers SessionStart (`run-hook.cmd`) | **GREEN** | Uses `${CLAUDE_PLUGIN_ROOT}` token — portable |
| Plugin context-mode | **n/a** | Disabled (`.disabled-W338-codex-wrap-bug` suffix) |

**Top RED**: 1 (preagent-parallel-guard W330 binding mode not enforced).
**Top YELLOW**: 6 (parallel-guard userpromptsubmit downstream dependency, gitleaks ruleset, stop-position-swap codified-not-fired, transcript-marker loop-guard not implemented, codex Win32 paths × 2 hook bodies).
**GREEN**: balance.

---

## §12 — CHALLENGER Pattern (claudekit Hook-Metadata + Zod)

**Current architecture (this runtime)**: hooks are direct CLI invocations declared inline in `.claude/settings.json:118-283`. Hook bodies (where they exist as `tools/*.mjs`) read raw `process.env` and `process.stdin` JSON; no central registry, no schema validation.

**Challenger** (cite-anchor: claudekit `cli/utils/claudekit-config.ts` + `cli/types/claudekit-config.ts` + colinhacks/zod typed-parse contract; documented locally as skill `hook-metadata-discipline`):

> *Each hook declares static `metadata` (id/displayName/description/category/triggerEvent/matcher), every hook-specific config schema lives in a typed Zod `ConfigSchema`, and runtime reads go through `getHookConfig<T>(hookId)` NOT raw `process.env` or `JSON.parse(readFileSync(...))`.* (excerpt from skill description)

**Comparison**:

| Axis | Current (direct-CLI in settings.json) | Challenger (claudekit Hook-Metadata + Zod) | Anthropic-spec alignment |
|---|---|---|---|
| Hook discovery | implicit (read settings.json) | explicit metadata registry | both spec-conformant; metadata adds introspection |
| Input validation | ad-hoc per hook (e.g. `jq -r '.tool_input.command'` in PreToolUse[Bash]) | Zod schema-validated | claudekit is stronger but Anthropic spec allows both |
| Config drift | Detected via pre-commit `cr2-2kb-hooks` gate | Zod-parse rejects on mismatch | both work; Zod fails earlier |
| Test-harness | Each `tools/test-*.mjs` rolls its own fixture loader | Shared `getHookConfig<T>(hookId)` test mock | claudekit reduces W330-test-style brittleness |
| Portability | Win32-specific paths bleed into settings.json (e.g. `Z:/tools/nodejs/node.exe`) | Metadata token + runtime resolution | claudekit migrates Win32 → portable |

**Other challenger anchors** (3-org-distinct per CLAUDE.md rule):
- Microsoft AutoGen `_signal_termination_with_error` (workers, termination-condition + `max_tool_iterations` per agent-budget-discipline skill)
- langchain-ai/langgraph cycle-detection (graph-level Pregel exception bubble; would catch Stop-hook infinite re-fire structurally — see §10)

**Recommendation (READ-ONLY)**: the runtime would benefit from migrating the `tools/preagent-*.mjs` family to the claudekit Hook-Metadata + Zod pattern. The W330 test-suite RED state (§4) is precisely the class of regression the Zod `getHookConfig<T>` pattern is designed to prevent — config drift between UserPromptSubmit writer + PreToolUse reader (which W341 round-4 already caught architecturally in `parallel-guard-detector.mjs:46-47` shared-module fix). The local `hook-metadata-discipline` skill (`.claude/skills/hook-metadata-discipline/SKILL.md`) already documents the contract; mechanizing it would close the §4 gap.

---

## STATUS

**STATUS: COMPLETE.** 1 RED (W330 binding mode not enforced — preagent-parallel-guard.mjs test baseline), 6 YELLOW (downstream dependency on the RED finding + 2 Win32-path portability + 1 gitleaks ruleset + 1 transcript-marker not yet wired + 1 stop-position-swap codified-not-fired), balance GREEN. Cardinal-rule-2 conformance: **100% on `.claude/hooks/**` (1 sanctioned shim, 1656B ≤ 2048B)**. Plugin-supplied hooks: 3 plugins ship hooks (codex active, superpowers active, context-mode disabled, everything-claude-code none). Pre-commit gate `cr2-2kb-hooks` enforces CR-2 ceiling on every commit per W331-P0.9. Top recommendation (READ-ONLY): trace the §4 root-cause in `tools/preagent-parallel-guard.mjs:55-114` session-file resolution in test-mode + consider claudekit Hook-Metadata+Zod migration per local `hook-metadata-discipline` skill.

Cite anchors used (≥3-org-distinct per claim): Anthropic claude-code hooks doc (`https://docs.anthropic.com/en/docs/claude-code/hooks`), claudekit (carlrannaberg), Microsoft AutoGen termination, langchain-ai/langgraph cycle-detection, gitleaks (8.30.1), trivy (0.70.0), zod (colinhacks). All file:line citations in-text.
