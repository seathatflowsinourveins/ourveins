# W347 P0(d) — settings.json env-flag CCBP cite-anchor audit

> **Audit-target**: `Z:/claude-sota-installed/.claude/settings.json:env` (lines 5-56) + `hooks.PostToolUseFailure` (lines 262-273).
> **Authoritative cite-anchor**: `Z:/repos/deps/claude-code-best-practice-shan/` @ HEAD `a28cd96b` (per CLAUDE.md L3 cite-chain). CCBP is the canonical cite-anchor surface because it explicitly tracks official `https://code.claude.com/docs/en/env-vars` and `https://docs.anthropic.com/en/docs/claude-code/settings` per its changelog discipline (Rule 8A — changelog-only entries are annotated and held pending official confirmation).
> **CR-6 verify-before-claim**: every active env-flag MUST cite test-exit/stdout/codex/operator-sign OR retire.
> **Stream-A F4.2 finding** (W346): 6 env-flags lacked CCBP cite-anchor at finding-time. This audit closes that gap.

---

## §1 — env-flag enumeration table (verdict-rolled)

| # | Flag name | settings.json line | Current value | CCBP cite (file:line) | Verdict |
|---|---|---|---|---|---|
| 1 | `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` | L18 | `1` | **NONE** (0 hits in CCBP @ a28cd96b; 0 hits for "ENHANCED_TELEMETRY", "ENHANCED.TELEMETRY", case-insensitive across whole repo) | **FABRICATED-EVENT** — RETIRE |
| 2 | `OTEL_LOG_USER_PROMPTS` | L29 | `1` | `best-practice/claude-settings.md:999` (set to `1` to include `user_system_prompt`; v2.1.121 changelog) + `changelog/best-practice/claude-settings/changelog.md:479` (resolved RECURRING 2026-04-16) | **CITE-OK** — but see contradiction below ⚠ |
| 3 | `CLAUDE_CODE_EFFORT_LEVEL` | L36 | `max` | `best-practice/claude-settings.md:891` (`low`/`medium`/`high`/`xhigh` Opus-4.7-only/`max` Opus-4.6-only/`auto`) + cross-link `best-practice/claude-cli-startup-flags.md:215` | **CITE-OK** — but value-validity concern: `max` is documented `Opus-4.6-only`. Current local runtime per CLAUDE.md is **Opus 4.7** (1M ctx) → `max` may be silently downgraded to `auto`. Operator-sign on value-choice queued. |
| 4 | `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` | L38 | `1` | `best-practice/claude-settings.md:902` (set `1` to disable non-streaming fallback; useful when proxy/gateway causes duplicate tool execution; v2.1.83) + `changelog/.../changelog.md:232` (added in HIGH priority pass) | **CITE-OK** |
| 5 | `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE` | L39 | `1` | `best-practice/claude-settings.md:940` (set `1` to keep marketplace cache when git pull fails; offline/airgapped) + `changelog/.../changelog.md:302` (added) + `changelog/.../changelog.md:340` (stale annotation removed — now confirmed on official /en/env-vars page) | **CITE-OK** |
| 6 | `CLAUDE_CODE_SYNC_PLUGIN_INSTALL` | L40 | `1` | `best-practice/claude-settings.md:938` (wait for plugin install before first query) | **CITE-OK** |
| 7 | (bonus) `OTEL_LOG_TOOL_DETAILS` | L28 | `1` | `best-practice/claude-settings.md:997` (set `1` to include `tool_parameters` in OTel events; v2.1.85 changelog) + 4 separate "ON HOLD recurring" rows confirming `not yet on official env-vars page` after 18+ consecutive CCBP runs | **CITE-OK with caveat** — annotated "changelog-only", absent from official `/en/env-vars`. Per Rule 8A this is still a valid cite (CCBP is itself an Anthropic-source-tracking authority). Carry-forward, no action. |
| 8 | (bonus) `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` | L31 | `1` | `best-practice/claude-settings.md:853` + `:984` (set `1` to populate `/model` from gateway `/v1/models`; off by default; v2.1.129 opt-in) + `changelog/.../changelog.md:528` (added) | **CITE-OK** |

---

## §2 — Per-flag CCBP grep + Anthropic-docs results

### 2.1 `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` — FABRICATED

```
grep -rni "CLAUDE_CODE_ENHANCED_TELEMETRY_BETA" Z:/repos/deps/claude-code-best-practice-shan/
→ 0 hits
grep -rni "ENHANCED_TELEMETRY|ENHANCED.TELEMETRY|enhanced.telemetry|enhanced_telemetry" Z:/repos/deps/claude-code-best-practice-shan/
→ 0 hits (case-insensitive, whole repo)
```

CCBP tracks v2.1.83 → v2.1.150+ env-vars across `changelog/best-practice/claude-settings/changelog.md` (600+ rows, 17+ consecutive runs against official `/en/env-vars`). A net-new "ENHANCED_TELEMETRY_BETA" beta-flag with this name would appear in either the official env-vars table OR a CCBP changelog-only annotation. Neither exists. The flag-name pattern (`CLAUDE_CODE_*_BETA`) does not match any Anthropic naming convention in CCBP. **Verdict: FABRICATED-EVENT — no upstream support**.

**Mitigating considerations:**
- Setting an undocumented env-var typically NO-OPs (the CC binary doesn't read it). The line is "safe junk" — does not actively harm.
- However it FAILS CR-6 verify-before-claim — there is no test-exit / stdout / codex / operator-sign evidence that this flag does anything.
- It ALSO FAILS the "uncontrolled vocabulary" smell that the W347 wave is hunting (per W346 Stream-A F4.2).

### 2.2 `OTEL_LOG_USER_PROMPTS` — CITE-OK with internal contradiction ⚠

CCBP cite (`best-practice/claude-settings.md:999`):
> Set to `1` to include the `user_system_prompt` field in OpenTelemetry LLM request spans. Omitted by default for **privacy** — user prompts can contain sensitive data, so opt in only when you control the OTel collector and have policies in place *(in v2.1.121 changelog, not yet on official env-vars page)*

**Stream-A F4.3 contradiction**: this is set to `1` (ON, capture user prompts) while line 27 sets `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` (OFF, do NOT capture LLM message content). The two flags are *not mutually exclusive* per the OTel GenAI spec (`OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` governs the SemConv `gen_ai.prompt`/`gen_ai.completion` event-content attribute; `OTEL_LOG_USER_PROMPTS` governs the Claude-Code-specific `user_system_prompt` log-event field) — BUT the intent signal is incoherent: one says "yes, log user prompts" and the other says "no, don't capture message content". Privacy-policy auditor would flag this. Operator-sign on intent queued.

### 2.3 `CLAUDE_CODE_EFFORT_LEVEL` — CITE-OK with value concern

CCBP cite (`best-practice/claude-settings.md:891`):
> Set effort level: `low`, `medium`, `high`, **`xhigh` (Opus 4.7 only, v2.1.111)**, **`max` (Opus 4.6 only)**, or `auto` (use model default). Takes precedence over `/effort` and the `effortLevel` setting.

Local runtime is Opus 4.7 per the active model-ID footer. Setting `max` on Opus 4.7 falls outside the documented value-set for the active model. **CCBP-cite-OK on the flag itself**, but operator-sign queued on whether the chosen value should be `xhigh` (Opus-4.7 native) or `auto` (model-default).

### 2.4-2.6, 2.8 — straightforward CITE-OK

`CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK`, `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE`, `CLAUDE_CODE_SYNC_PLUGIN_INSTALL`, `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` — all directly cited in CCBP `best-practice/claude-settings.md` env-vars table with semantic descriptions matching the local value. No action needed.

### 2.7 `OTEL_LOG_TOOL_DETAILS` — CITE-OK changelog-only

Cited in CCBP `best-practice/claude-settings.md:997` with explicit annotation *(in v2.1.85 changelog, not yet on official env-vars page)*. Has appeared in 18+ consecutive CCBP audit runs as "ON HOLD recurring" — CCBP authors deliberately retain it pending official docs confirmation. This is the CCBP "Rule 8A" pattern — changelog-only env-vars are cite-OK pending official upgrade. No action required.

---

## §3 — Per-flag verdict roll-up

| Verdict-class | Count | Flags |
|---|---|---|
| **CITE-OK** | 5 | `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK`, `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE`, `CLAUDE_CODE_SYNC_PLUGIN_INSTALL`, `OTEL_LOG_TOOL_DETAILS`, `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` |
| **CITE-OK ⚠ caveat** | 2 | `OTEL_LOG_USER_PROMPTS` (contradicts `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` intent), `CLAUDE_CODE_EFFORT_LEVEL=max` (value `max` is `Opus-4.6-only`; local runtime is Opus 4.7) |
| **CITE-NEEDED** | 0 | — |
| **FABRICATED** | 1 | `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` (0 CCBP hits, no upstream existence) |
| **RETIRE** | 1 | `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` (same as FABRICATED) |

**Hook-event audit** (§5 below): `PostToolUseFailure` is **CITE-OK** — documented in CCBP `.claude/hooks/HOOKS-README.md:181` + `:479` + `:383` (lists `PostToolUseFailure` as supported event for both top-level settings.json hooks AND agent frontmatter hooks). CCBP's own `.claude/settings.json:126` uses it. NOT fabricated.

---

## §4 — Surgical remediation diff

Apply via Edit tool against `Z:/claude-sota-installed/.claude/settings.json`:

### §4.1 RETIRE `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` (mandatory — CR-6 violation)

```diff
   "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
-  "CLAUDE_CODE_ENHANCED_TELEMETRY_BETA": "1",
   "OTEL_TRACES_EXPORTER": "otlp",
```

**Rationale**: 0 hits across CCBP @ a28cd96b for both `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` and any `ENHANCED_TELEMETRY` substring. Flag does not exist in any documented Anthropic env-vars surface tracked through 600+ CCBP changelog rows. CR-6 verify-before-claim requires retire. Pre-commit gate (gitleaks + cr2-2kb hooks) will not block this edit because env vars are not in the gitleaks rule-set.

### §4.2 RESOLVE `OTEL_LOG_USER_PROMPTS` vs `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` intent contradiction

**Two options for operator-sign:**

**Option A — privacy-default (RECOMMENDED)**: turn user-prompt logging OFF to align with `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false`:
```diff
   "OTEL_LOG_TOOL_DETAILS": "1",
-  "OTEL_LOG_USER_PROMPTS": "1",
+  "OTEL_LOG_USER_PROMPTS": "0",
   "OTEL_SERVICE_NAME": "claude-sota-installed",
```

**Option B — explicit telemetry-everything**: turn message-content capture ON to align with `OTEL_LOG_USER_PROMPTS=1`:
```diff
-  "OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT": "false",
+  "OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT": "true",
   "OTEL_LOG_TOOL_DETAILS": "1",
   "OTEL_LOG_USER_PROMPTS": "1",
```

Operator must pick — both are valid cite-anchored configurations; the current state is incoherent.

### §4.3 RESOLVE `CLAUDE_CODE_EFFORT_LEVEL=max` value-on-Opus-4.7 concern

**Two options for operator-sign:**

**Option A — switch to `xhigh` (Opus-4.7 native, max documented depth)**:
```diff
-  "CLAUDE_CODE_EFFORT_LEVEL": "max",
+  "CLAUDE_CODE_EFFORT_LEVEL": "xhigh",
```

**Option B — fall back to `auto` (model default)**:
```diff
-  "CLAUDE_CODE_EFFORT_LEVEL": "max",
+  "CLAUDE_CODE_EFFORT_LEVEL": "auto",
```

Operator must pick — keeping `max` on Opus 4.7 is undefined-behavior per the CCBP-documented value-set (which restricts `max` to Opus 4.6).

---

## §5 — `PostToolUseFailure` hook audit (Stream-A F6.2)

**W346 Stream-A F6.2 claim**: "PostToolUseFailure hook has zero CCBP cite — may be fabricated event".

**Audit result**: **CLAIM REFUTED — PostToolUseFailure is documented and supported**.

### 5.1 Evidence of upstream support

```
grep -rn "PostToolUseFailure" Z:/repos/deps/claude-code-best-practice-shan/
```

Yields 16+ hits across:

| CCBP path | Line | Content |
|---|---|---|
| `.claude/settings.json` | 126 | CCBP's own settings.json declares a `PostToolUseFailure` hook |
| `.claude/agents/weather-agent.md` | 29 | Agent frontmatter declares `PostToolUseFailure:` hook |
| `.claude/hooks/HOOKS-README.md` | 12 | Hooks table lists `PostToolUseFailure` with payload fields (`async`, `timeout: 5000`, `error`, `is_interrupt`, `tool_use_id`) |
| `.claude/hooks/HOOKS-README.md` | 46 | "testing confirms **6 hooks** actually fire in agent sessions: PreToolUse, PostToolUse, PermissionRequest, PostToolUseFailure, Stop, SubagentStop" |
| `.claude/hooks/HOOKS-README.md` | 181 | "`PostToolUseFailure`: Runs after a tool call fails" |
| `.claude/hooks/HOOKS-README.md` | 349 | Lists `PostToolUseFailure` in "tool event hooks" alongside `PreToolUse`, `PostToolUse`, `PermissionRequest` |
| `.claude/hooks/HOOKS-README.md` | 383 | **Supported events** list explicitly includes `PostToolUseFailure` |
| `.claude/hooks/HOOKS-README.md` | 479 | Matcher table: `PostToolUseFailure` accepts `tool_name` matcher (`"matcher": "Bash"` example) — matches local config exactly |
| `.claude/hooks/scripts/hooks.py` | 12, 35, 68 | CCBP reference implementation maps `PostToolUseFailure` event |
| `.claude/hooks/config/hooks-config.json` | 6 | Official config key: `"disablePostToolUseFailureHook": false` |

### 5.2 Local hook body verification (cardinal-rule-2 compliance check)

Local config at `Z:/claude-sota-installed/.claude/settings.json:262-273`:

```jsonc
"PostToolUseFailure": [
  {
    "matcher": "Bash",
    "hooks": [
      {
        "type": "command",
        "command": "powershell -NoProfile -Command \"try { $ev = $input | ConvertFrom-Json -ErrorAction Stop; if ($null -ne $ev -and $ev.error -match 'permission denied|EACCES|gitleaks') { $msg = 'hook-feedback: ' + $ev.error.Substring(0, [Math]::Min($ev.error.Length, 200)); $out = @{ hookSpecificOutput = @{ hookEventName = 'PostToolUseFailure'; additionalContext = $msg } } | ConvertTo-Json -Compress; Write-Output $out } else { exit 0 } } catch { Write-Error \\\"PostToolUseFailure parse: $($_.Exception.Message)\\\"; exit 1 }\"",
        "timeout": 3
      }
    ]
  }
]
```

This is a **direct-CLI invocation** (powershell inline command) — NOT a project-owned `.claude/hooks/scripts/*.py` body. Cardinal-rule-2 compliant. The `hookSpecificOutput.hookEventName: 'PostToolUseFailure'` payload-shape matches the CCBP `HOOKS-README.md:479` matcher schema exactly. **No action required.**

### 5.3 Verdict on Stream-A F6.2

**Stream-A F6.2 was incorrect.** `PostToolUseFailure` is a fully documented and CCBP-cited hook event with reference implementation, schema documentation, and CCBP's own production usage. Stream-A should re-classify F6.2 from `FABRICATED` to `CITE-OK`. No remediation needed.

---

## §6 — Summary roll-up

- **Total env-flags audited**: 8 (6 from W347 prompt + 2 bonus)
- **CITE-OK**: 5 (`CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK`, `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE`, `CLAUDE_CODE_SYNC_PLUGIN_INSTALL`, `OTEL_LOG_TOOL_DETAILS`, `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY`)
- **CITE-OK with operator-sign caveat**: 2 (`OTEL_LOG_USER_PROMPTS` — intent-contradiction; `CLAUDE_CODE_EFFORT_LEVEL=max` — value-on-Opus-4.7 concern)
- **CITE-NEEDED**: 0
- **FABRICATED**: 1 (`CLAUDE_CODE_ENHANCED_TELEMETRY_BETA`)
- **RETIRE**: 1 (`CLAUDE_CODE_ENHANCED_TELEMETRY_BETA`)
- **Hook-events audited**: 1 (`PostToolUseFailure`)
- **Hook-events CITE-OK**: 1 (Stream-A F6.2 claim was incorrect — refuted with 16+ CCBP hits including reference implementation and schema docs)

**Required orchestrator action**: apply §4.1 RETIRE diff (mandatory CR-6 closure). Defer §4.2 + §4.3 for operator-sign (both are decision-pending, not auto-applicable).
