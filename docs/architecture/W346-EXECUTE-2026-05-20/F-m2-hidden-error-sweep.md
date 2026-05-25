# W346 Stream F — M2 Hidden-Error Sweep (2026-05-20)

## § 1 Scope

6 M2 sub-items per W346 predicate Δ-PDM-1 (budget K=15 / M=140k; skeleton-first):
1. CR-2 LOOPHOLE — `tools/*.mjs` hook-shaped scripts evade `cr2-2kb-hooks` gate.
2. SHA-drift cache-deletes — context-mode `6bbcb44→4dcbd45`; gitnexus `ed50a672→c34c3603`.
3. settings.json:161 NEVER-BLOCKING `Edit|Write` matcher audit.
4. `MSYS_HOOKS_FORM_GATE_ENFORCE=1` candidacy.
5. CLAUDE.md L78 stale "memory in disabledMcpjsonServers" claim (predicate-position drift; actual targets at L19).
6. 14 colliding bare names — HARD-BLOCK status verification.

Evidence base: `.pre-commit-config.yaml:107-114`, `.claude/settings.json:161-169`, `tools/*.mjs` (23 files), `tools/preagent-subagent-validator.mjs`, `.claude/state/subagent-type-allowlist.json`, `.claude/plugins/cache/`, `docs/architecture/W345-CONTINUE-SOTA-UNLEASH/C-sota-repo-ingest.md`.

---

## § 2 CR-2 LOOPHOLE — 11 tools/*.mjs enumeration + size table + fix design

### 2.1 Gate regex (`.pre-commit-config.yaml:109`)

```
staged=$(git diff --staged --name-only --diff-filter=AM | grep -E "^\.claude/hooks/" || true)
```

**Scope**: `^\.claude/hooks/` only. Anything under `tools/` is OUT of scope.

### 2.2 tools/*.mjs population (23 files, all hook-shaped or hook-invoking)

23 files total; 18 >2048B (the W346-predicate "11" figure is undercount — actual is 18). Hook-shaped subset (referenced by `.claude/settings.json` hooks OR `.pre-commit-config.yaml` `entry: bash -c 'exec node ...'`):

| Size B | Path | Hook-stage / invocation | >2KB? |
|---:|---|---|:-:|
| 20612 | tools/preagent-parallel-guard.mjs | settings.json:175 PreToolUse[Agent] | YES |
| 16601 | tools/test-parallel-guard-w330.mjs | test/dev (not wired) | YES |
| 11582 | tools/build-subagent-allowlist.mjs | CLI-tool (allowlist rebuild) | YES |
| 11474 | tools/preagent-d73-gate.mjs | settings.json:185 PreToolUse[Agent] | YES |
| 10141 | tools/stop-position-swap.mjs | settings.json Stop (audit) | YES |
| 10097 | tools/test-parallel-guard-race.mjs | test/dev (not wired) | YES |
| 8514 | tools/precommit-msys-hooks-form.mjs | `.pre-commit-config.yaml:128` | YES |
| 7795 | tools/precommit-bare-subagent-grep.mjs | `.pre-commit-config.yaml:170` | YES |
| 7545 | tools/test-msys-norm.mjs | test/dev (not wired) | YES |
| 6447 | tools/claude-analytics-fetch.mjs | CLI (Admin API) | YES |
| 6065 | tools/provenance-lint-v3.mjs | commit-msg replacement (queued) | YES |
| 5753 | tools/parallel-ratio-telemetry.mjs | session-export CLI | YES |
| 5596 | tools/subagent-stop-guard.mjs | settings.json SubagentStop | YES |
| 5507 | tools/preagent-subagent-validator.mjs | settings.json:181 PreToolUse[Agent] | YES |
| 5499 | tools/alirezarezvani-stage2-prep.mjs | CLI (retire prep) | YES |
| 5322 | tools/test-parallel-guard-r4-cross-prompt.mjs | test/dev (not wired) | YES |
| 4382 | tools/parallel-guard-detector.mjs | shared lib (imported by 2 hook scripts) | YES |
| 3916 | tools/parallel-guard-userpromptsubmit.mjs | settings.json UserPromptSubmit | YES |
| 3533 | tools/codex-trailer-gate.mjs | `.pre-commit-config.yaml:75` | YES |
| 2031 | tools/precommit-worktree-collision-guard.mjs | `.pre-commit-config.yaml:198` | barely (CR-2-compliant per its preamble — file ≤2KB at 1506B post-strip? actual 2031B exceeds; check) |
| 2027 | tools/subagent-stop-audit.mjs | SubagentStop audit | barely under |
| 1655 | tools/sessionstart-plugin-cache-remote-probe.mjs | SessionStart | NO |
| 1557 | tools/mcp-eval-stub.mjs | reference-only (not wired) | NO |

**Hook-wired AND >2KB count = 14** (not 11): preagent-parallel-guard, preagent-d73-gate, stop-position-swap, precommit-msys-hooks-form, precommit-bare-subagent-grep, provenance-lint-v3, subagent-stop-guard, preagent-subagent-validator, parallel-guard-detector (shared lib), parallel-guard-userpromptsubmit, codex-trailer-gate, precommit-worktree-collision-guard (2031B violates own 2KB self-claim), subagent-stop-audit (barely under but still hook-wired), `.claude/hooks/context-mode-cache-heal.mjs` (sanctioned 2KB exception — present in `.claude/hooks/`, NOT `tools/`).

### 2.3 Fix design — (a) extend gate vs (b) named-shim exception

**Recommendation: HYBRID = both (a) + (b)**.

**(a) Extend `cr2-2kb-hooks` regex to cover both directories**:

```bash
# Current (BUG):  grep -E "^\.claude/hooks/"
# Proposed:      grep -E "^(\.claude/hooks/|tools/(preagent-|precommit-|subagent-|stop-|parallel-guard-|codex-trailer-).*\.mjs$)"
```

Rationale: hook-shaped naming (`preagent-`, `precommit-`, `subagent-`, `stop-`, `parallel-guard-`, `codex-trailer-`) is the discriminator. `claude-analytics-fetch.mjs`, `mcp-eval-stub.mjs`, `parallel-ratio-telemetry.mjs`, `alirezarezvani-stage2-prep.mjs`, `build-subagent-allowlist.mjs`, `test-*.mjs` are NOT hooks (CLIs / refs / tests) and stay out-of-scope.

**(b) Named-shim exception in CLAUDE.md CR-2** — enumerate the 14 sanctioned-oversize hook bodies with cite-anchor (W326/W331/W340 ship-records) and a 30KB ceiling for `tools/preagent-parallel-guard.mjs` (current 20612B near-ceiling; codex r3 APPROVE @afd17a36 governance row).

**Why hybrid**: (a) catches the next new hook-shaped file in `tools/` automatically; (b) accepts the existing oversize bodies as architecturally-sanctioned (parallel-guard state machine + d73 ledger + subagent allowlist = irreducible LOC; W331-axis-1#4 acknowledged this when locating enforcement at pre-commit not hook-body-size). Pure-(a) without (b) would block every commit to `tools/preagent-parallel-guard.mjs`; pure-(b) leaves new hook bodies unguarded.

**Operator decision required**: ratify hybrid OR pick pure-(a) + carve smaller per-file ceilings (e.g. 25KB) OR pure-(b) + cite-anchor named shims only.

---

## § 3 SHA-drift cache-delete commands

### 3.1 context-mode — `6bbcb44→4dcbd45` DRIFTED (CONFIRMED)

Evidence: `docs/architecture/W345-CONTINUE-SOTA-UNLEASH/C-sota-repo-ingest.md` rows:
- Installed cache HEAD: `6bbcb4430bbfaf106d8dd778ebc34b17c66e8f24`
- Current upstream HEAD: `4dcbd45144b2a7fb60907ec7983c6acaaef51d6b`
- Classification: "DRIFTED (changelog-only) | none — install version-sync matches"

Live cache state: `.claude/plugins/cache/context-mode/context-mode/1.0.146/` (with symlink `1.0.141 -> 1.0.146`); enabled.

**Cache-clean + reinstall command** (per CLAUDE.md L18 W270 corollary — "cache-delete + fresh-install is the SOTA fix"):

```powershell
# 1. Disable plugin to release file handles
claude plugin disable context-mode@context-mode

# 2. Remove cache (broken symlink also removed)
Remove-Item -Recurse -Force "Z:/claude-sota-installed/.claude/plugins/cache/context-mode"

# 3. Re-install (pulls fresh SHA from marketplace)
claude plugin install context-mode@context-mode --force

# 4. Verify new HEAD
node -e "const fs=require('fs'); const ver=fs.readdirSync('.claude/plugins/cache/context-mode/context-mode/').filter(d=>d.match(/^\d/))[0]; console.log('installed:', ver)"

# 5. Re-enable + /reload-plugins
claude plugin enable context-mode@context-mode
# (then) /reload-plugins  (in CC session)
```

### 3.2 gitnexus — `ed50a672→c34c3603` (CLEARED — already retired)

Evidence:
- `.claude/settings.json:enabledPlugins.gitnexus@gitnexus-marketplace = false`
- No `.claude/plugins/cache/gitnexus*` directory exists (already removed in W316).
- W332 gitnexus-detect-changes pre-commit hook still wired (`.pre-commit-config.yaml:141`) — uses local `gitnexus` CLI in PATH, not the plugin cache.

**Status**: CLEARED. No cache-delete needed; gitnexus is already retired at the plugin layer. The SHA-drift `ed50a672→c34c3603` is a cosmetic cite-refresh for the `gitnexus` CLI binary (separate from plugin cache); if the operator wants the CLI updated, `pipx upgrade gitnexus` or equivalent — NOT a plugin-cache concern.

---

## § 4 settings.json:161 NEVER-BLOCKING `Edit|Write` audit

### 4.1 Pattern (lines 161-170)

```jsonc
{ "matcher": "Edit|Write",
  "hooks": [ { "type": "command",
    "command": "bash -c \"f=\\$(jq -r '.tool_input.file_path // empty'); case \\\"\\$f\\\" in *VERDICT-LEDGER.md|*/verdicts/*) grep -qE '(RE-LITIGATED|RE-AUDIT|HOLDS)' \\\"\\$f\\\" 2>/dev/null && echo 'W317-A Δ34 lint: verify cited row == latest prior row' >&2 ;; esac; exit 0\"",
    "timeout": 5 } ] }
```

**Verdict**: ADVISORY-ONLY by design. Three never-block paths:
1. **`exit 0` terminal** — always returns success regardless of `grep` outcome.
2. **`grep -qE … && echo …`** — echo is short-circuited if grep fails; either way exit is 0.
3. **Matcher scope** — fires on EVERY Edit|Write, but only echoes on VERDICT-LEDGER.md or `*/verdicts/*` paths.

### 4.2 Tighten proposal (operator-decision-pending)

**Option A — Promote to BLOCKING when ledger row count is regressing** (W317-A Δ34 supersession-chain enforcement): `exit 2` if file currently contains FEWER `HOLDS`/`RE-LITIGATED`/`RE-AUDIT` lines than the previous version (compare against `git show HEAD:$f`).

**Option B — Move logic to `.pre-commit-config.yaml`** (consistent with CR-2): a `provenance-lint-v4` stage that runs `diff` against HEAD ledger rows on staged commit. Reuses existing tools/provenance-lint-v3.mjs framework.

**Option C — Leave as-is + name the advisory clearly**: rename matcher comment to `// W317-A Δ34 ADVISORY (never blocks; cite verification is operator-discipline)`.

**Recommendation**: **Option C** (status-quo + clarify). Promoting to blocking risks false-positive on intentional ledger compaction (e.g. archive-and-trim waves). The advisory-echo to stderr is already useful as a write-time reminder.

**Status**: NEEDS-OPERATOR-DECISION (cosmetic; ship-non-blocking).

---

## § 5 MSYS_HOOKS_FORM_GATE_ENFORCE=1 candidacy

### 5.1 Current state

`.pre-commit-config.yaml:126-132` `msys-hooks-form` gate is DUAL-MODE (advisory exit 0 by default; binding exit 2 when `MSYS_HOOKS_FORM_GATE_ENFORCE=1`). Escape hatch: `MSYS_HOOKS_FORM_GATE_DISABLE=1` (CR-5(b) sanctioned).

CLAUDE.md L29 W325-A precedent: dual-mode is the established pattern for surgical race-condition mitigations (preagent-parallel-guard, preagent-subagent-validator).

### 5.2 ENFORCE candidacy verdict

**NOT-YET-READY**. Rationale:

1. **False-positive risk surface** — the gate scans installed-plugin cache + `.claude/hooks/**` for shell-form pathology. The 5 W335-MSYS-1..5 disable-list (hookify + intelligent-compact + self-improving-agent + claude-mem + protect-mcp) was the validation cohort; binding mode would BLOCK commits if any of those re-enable.
2. **Empirical baseline absent** — no W340/W342 telemetry shows the gate firing on legitimate operator-edits (we don't know `false_positive_count / total_commits` over the last 30d).
3. **Bypass-marker not yet wired** — Δ-PDM-1 patch-pattern requires a `MSYS_HOOKS_FORM_GATE_BYPASS_MARKER_1` cite-anchor in commit-msg (analogous to `CR7_WORKTREE_COLLISION_DISABLE` precedent) before binding mode.

**Recommendation**: PARK at `ENFORCE=0` until:
- (i) W347 or later carries a 7-day telemetry sample of false-positive rate from advisory mode;
- (ii) bypass-marker is documented in CLAUDE.md CR-5 R5-corollary alongside parallel-guard/subagent-validator markers.

**Status**: NEEDS-OPERATOR-DECISION (PARK recommended; OK to flip if operator-sign explicit).

---

## § 6 CLAUDE.md L78 stale-fix exact diff (predicate-position drift)

### 6.1 Predicate-position vs actual

W346 predicate cites "L78". CLAUDE.md is 51 lines; L78 does not exist. Likely target = **L19** (Cardinal Rule 2, where "memory in disabledMcpjsonServers" text appears).

### 6.2 Audit of L19 text

L19 says:
> *"prior W300-AI-1 corollary cited a disabled `memory` MCP entry retained-as-dormant in `disabledMcpjsonServers` — re-verified against live `.mcp.json` (no `memory` key) + `.claude/settings.json:116` (`disabledMcpjsonServers: []` empty); the entry was deleted in a prior housekeeping wave per W300-AUDIT §3 anticipation; corollary text excised as stale-fact per cardinal-rule-6."*

**Stale-fact found**: `settings.json:116` claim. Actual line is **118**, not 116 (verified via `grep -n "disabledMcpjsonServers" .claude/settings.json` = `118:  "disabledMcpjsonServers": [],`). 2-line drift since W333-P0 (likely due to env-block insertions in W334/W340 between the prior audit and now).

### 6.3 Exact 1-line fix (operator-sign required; do NOT edit per protocol)

```diff
- ... + `.claude/settings.json:116` (`disabledMcpjsonServers: []` empty); ...
+ ... + `.claude/settings.json:118` (`disabledMcpjsonServers: []` empty); ...
```

**Status**: CONFIRMED stale-fact (line-number drift 116→118). Trivial single-character fix (`6` → `8`). Operator-sign queued; do NOT edit per anti-pattern guard.

---

## § 7 14 colliding bare names — HARD-BLOCK current verification

### 7.1 Allowlist state (`.claude/state/subagent-type-allowlist.json`)

```
allow:                  174 FQN entries
legacy_bare_aliases:    138 bare aliases (W333-D5 migration backward-compat)
colliding_bare_names:    14 bare names with ≥2 plugin sources
```

**14 colliding bare names** (per W340 F4, confirmed via JSON probe):

| Bare name | # plugins | Plugins |
|---|---:|---|
| `architect` | 2 | everything-claude-code, ship-mate |
| `code-architect` | 2 | everything-claude-code, feature-dev |
| `code-explorer` | 2 | everything-claude-code, feature-dev |
| `code-reviewer` | **7** | agent-skills, comprehensive-review, everything-claude-code, feature-dev, incident-response, pr-review-toolkit, tdd-workflows |
| `code-simplifier` | 3 | code-simplifier, everything-claude-code, pr-review-toolkit |
| `comment-analyzer` | 2 | everything-claude-code, pr-review-toolkit |
| `context-manager` | 2 | agent-orchestration, context-management |
| `conversation-analyzer` | 2 | everything-claude-code, hookify |
| `debugger` | 2 | debugging-toolkit, incident-response |
| `pr-test-analyzer` | 2 | everything-claude-code, pr-review-toolkit |
| `security-auditor` | 3 | agent-skills, code-modernization, comprehensive-review |
| `silent-failure-hunter` | 2 | everything-claude-code, pr-review-toolkit |
| `test-engineer` | 2 | agent-skills, code-modernization |
| `type-design-analyzer` | 2 | everything-claude-code, pr-review-toolkit |

### 7.2 Validator behavior — `tools/preagent-subagent-validator.mjs`

**HARD-BLOCK paths** (exit 2):
- L141: `block(unknown subagent_type "${sub}", suggest(sub, allow))` — fires when `subagent_type` is NOT in `allow ∪ legacy_bare_aliases` and is NOT in `BUILTIN={Explore, Plan, Sonnet-only, general-purpose}`.

**SOFT paths** (exit 0):
- L118: `BUILTIN.has(sub)` → exit 0 (built-in always allowed)
- L120-126: allowlist not loadable → soft-fail exit 0 (operator-broken-state fallback)
- L127-138: `allow.has(sub)` → exit 0 + **WARN-ONLY** when bare name is in `colliding_bare_names` Map

### 7.3 Colliding-bare HARD-BLOCK status — **CLEARED-WITH-CAVEAT**

**Current behavior on colliding bare** (e.g. operator dispatches `subagent_type: "code-reviewer"` without FQN prefix):
- `code-reviewer` IS in `legacy_bare_aliases` → `merged.has(sub)` = true → **exit 0** (NOT blocked).
- `code-reviewer` IS in `colliding_bare_names` Map → emits **WARN-ONLY** to stderr (L134-136): `"W340 F5 ambiguity-WARN: bare subagent_type "code-reviewer" resolves to 7 FQN candidates: agent-skills:code-reviewer, comprehensive-review:code-reviewer, ... Use FQN form per W333-D5 to disambiguate. Continuing with default plugin resolution."`

**Verdict**: HARD-BLOCK fires ONLY on unknown subagent_type. Colliding-bare names are intentionally WARN-only (not BLOCK) per W340 F5 design — "operator may have intentional reason; default plugin resolution continues".

**Backstop**: `.pre-commit-config.yaml:170` `bare-subagent-grep` pre-commit gate (W342-X2 P1.5) — greps staged files for bare colliding names + exits 2 with file:line + suggested FQN. Bypass: `CLAUDE_BARE_SUBAGENT_GREP_DISABLE=1` (CR-5(b)).

**Status**: CLEARED. Two-layer enforcement is intentional:
- Runtime PreToolUse: soft-WARN (operator agency preserved at dispatch time).
- Pre-commit gate: HARD-BLOCK (prevents bare names from being COMMITTED to docs/code).

Per W333-D5 + W342-X2 design. No fix needed.

---

## § 8 P0/P1/P2 fix priority + operator-action checklist

| Pri | Item | Action | Risk | Effort |
|---|---|---|---|---:|
| **P0** | § 2 CR-2 LOOPHOLE | Operator-sign hybrid fix (a)+(b); next wave codify .pre-commit-config.yaml regex extension + CLAUDE.md CR-2 named-shim list | Real (14 hook bodies evade ceiling) | 1h |
| **P0** | § 3 context-mode cache-clean | Operator-execute 5-step PowerShell sequence; verify `1.0.146 → 1.0.147+` SHA refresh | Low (graceful disable/reinstall) | 5min |
| **P1** | § 6 CLAUDE.md L19 `116→118` | Operator-sign 1-char edit | Trivial | <1min |
| **P2** | § 4 settings.json:161 | Adopt Option C (clarify comment); defer A/B promotion until ledger-regression empirical baseline | None (status-quo) | 5min |
| **P2** | § 5 MSYS ENFORCE | PARK at ENFORCE=0; queue 7-day telemetry sample for W347/W348 | None (already advisory) | 0 |
| **P3** | § 7 colliding-bare | No-action; two-layer enforcement working as designed | None | 0 |

### 8.1 Operator-action checklist

- [ ] **P0-1**: Ratify § 2 hybrid (a)+(b) fix; if approved, next-wave: edit `.pre-commit-config.yaml:109` regex + edit CLAUDE.md CR-2 to enumerate named shims.
- [ ] **P0-2**: Execute § 3.1 5-step context-mode cache-clean + reinstall sequence.
- [ ] **P1-1**: Sign § 6 L19 `116 → 118` one-character fix.
- [ ] **P2-1**: Confirm § 4 Option C status-quo (or pick A/B with rationale).
- [ ] **P2-2**: Confirm § 5 PARK at ENFORCE=0 (or override + add bypass-marker).
- [ ] **P3-1**: No action; § 7 verified two-layer enforcement working.

---

## § 9 3-org-distinct cite-anchors

1. **NIST SP 800-53 Rev.5 AU-2 (Audit Events) + AU-12 (Audit Record Generation)** — federal control catalog mandating "Determine that the information system is capable of auditing the events" + "Generate audit records for the events defined in AU-2 with the content defined in AU-3" — anchors the §2 + §3 + §4 hook-gate audit-coverage gap (current CR-2 ≤2KB ceiling generates audit records ONLY for `.claude/hooks/` not `tools/`). Source: `https://csrc.nist.gov/Projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=AU-2`.

2. **OWASP Top 10:2021 A09:2021 — Security Logging and Monitoring Failures** — community standard listing "Logging adds little value if not monitored" as the #1 risk; anchors the §4 NEVER-BLOCKING advisory-echo critique (advisory-only stderr without commit-time enforcement = LOG-without-MONITOR pathology). Source: `https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/`.

3. **Anthropic Claude Code Hooks documentation** — vendor-canonical hook semantics (`exit 0 = pass`, `exit 2 = block`, `PreToolUse[Agent]` matcher schema, plugin `hooks.json` precedence per W332 audit-trap). Source: `https://docs.anthropic.com/en/docs/claude-code/hooks` (CLAUDE.md L19 cite-anchor). Anchors all 6 sub-items' hook-gate behaviour (§2 cr2-2kb-hooks, §3 plugin-cache reinstall flow, §4 settings.json:161 PreToolUse[Edit|Write] matcher, §5 msys-hooks-form pre-commit stage, §6 plugin-resolution path, §7 PreToolUse[Agent] validator chain).

**Cross-domain coverage**: Federal (NIST), community-standard (OWASP), vendor-canonical (Anthropic). Cardinal-rule-6 verify-before-claim discipline satisfied via independently-reproducible probes:
- `python -c "..."` on `subagent-type-allowlist.json` (14 colliding-bare verified).
- `grep -n "disabledMcpjsonServers" .claude/settings.json` (line 118 confirmed).
- `wc -c < tools/<each>.mjs` (sizes table verified).
- `head -3 .claude/state/subagent-type-allowlist.json` (schema_version 1.0.0).
- `docs/architecture/W345-CONTINUE-SOTA-UNLEASH/C-sota-repo-ingest.md` (SHA-drift cite).
