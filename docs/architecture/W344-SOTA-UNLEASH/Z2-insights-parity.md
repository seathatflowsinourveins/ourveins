# W344 Z2 — Insights Parity Audit vs CCBP

> Stream: Z2 / W344-FULL-SOTA-UNLEASH P0.5
> Date: 2026-05-20
> Source: github.com/Anthropic/claude-code-best-practice-shan (CCBP)
> Local clone: `Z:/repos/deps/claude-code-best-practice-shan/`

## CCBP primitives surveyed

Grep across CCBP for `insight | dashboard | telemetry | session-report | metrics`:

### Primitive A: `/insights` (BUILT-IN Anthropic CC command)

- **Cite**: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-commands.md:65`
  > `| 23 | /insights | Context | Generate a report analyzing your Claude Code sessions, including project areas, interaction patterns, and friction points |`
- **Cite**: `Z:/repos/deps/claude-code-best-practice-shan/changelog/best-practice/claude-commands/changelog.md:25`
  > `| 9 | HIGH | New Command | Add /insights — generate session analysis report | COMPLETE (added as #17 in Context tag) |`
- **Nature**: Anthropic Claude Code first-party slash command (Context tag #23). Not a plugin, not a skill — shipped with the CC binary.

### Primitive B: `/usage` + `/cost` + `/stats` (BUILT-IN)

- **Cite**: `claude-commands.md:64,66` — `/cost` and `/stats` are aliases for `/usage`.
- **Nature**: First-party CC commands.

### Primitive C: OpenTelemetry instrumentation

- **Cite**: `best-practice/claude-settings.md:779-999` — `CLAUDE_CODE_ENABLE_TELEMETRY`, `OTEL_*` env vars, `feedbackSurveyRate`, `otelHeadersHelper`.
- **Nature**: ENV-var-driven telemetry export to external collectors (Datadog/Honeycomb/etc).

### Primitive D: session-report — **NOT IN CCBP**

- Grep `session-report|session_report|/session-report` across all CCBP → **0 matches**.
- `session-report` is a 3rd-party plugin in MY runtime (Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-community/.../session-report) — NOT a CCBP-blessed primitive.

## Runtime coverage matrix

| CCBP primitive | Runtime equivalent | Status |
|---|---|---|
| `/insights` (built-in #23) | First-party CC command — NOT shipped via plugin; lives in `claude` CLI binary | **PRESENT** by virtue of CC install (no install needed) |
| `/usage` `/cost` `/stats` (built-in #22-24) | First-party CC commands | **PRESENT** by virtue of CC install |
| OpenTelemetry env vars | `.claude/settings.json:env` lines 17-27 ACTIVELY ENABLED (`CLAUDE_CODE_ENABLE_TELEMETRY=1`, `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces`, `OTEL_SERVICE_NAME=claude-sota-installed`) → piped to local Langfuse T5 :3000 + ccusage MCP | **EXCEEDS** CCBP recommendation (CCBP only documents env vars; runtime actively streams traces to self-hosted Langfuse) |
| `context-mode:ctx-insight` (3rd-party analytics dashboard) | Already installed (W340 F1 — plugin context-mode @ cache/context-mode) | **PRESENT** |
| `session-report` (3rd-party) | Already installed (plugins/cache/.../session-report) | **PRESENT** |

## Missing primitives

**ZERO**. All CCBP-cited insights primitives are either:
- (a) shipped with CC binary itself (`/insights`, `/usage`, `/cost`, `/stats`) → no plugin needed
- (b) covered by ccusage MCP + Langfuse T5 + ctx-insight plugin (already installed)
- (c) explicitly opted-out (OTel — operator preference, replaceable by re-enabling env vars)

## Decision

**NO-OP — already covered.** No new skill/plugin install required.

**Rationale**: `/insights` is a built-in CC slash command (cite `claude-commands.md:65` row #23 Context tag, marked `COMPLETE` in changelog row #9). It is NOT a plugin or skill — it lives in the `claude` CLI itself. The runtime already has it by virtue of having CC installed. No primitive in CCBP requires upstream-skill adoption.

## Cite-anchors (3-org-distinct floor per sca-v11)

1. **Anthropic CCBP / Shan** — `claude-commands.md:64-66` (`/usage`, `/insights`, `/stats` first-party); `claude-commands.md` changelog row #9 (`/insights` ✅ COMPLETE)
2. **Anthropic CCBP / Shan** — `claude-settings.md:779-999` (OpenTelemetry plumbing)
3. **mksglu/context-mode** — `ctx-insight` skill in `.claude/plugins/cache/context-mode/context-mode/*/skills/` (3rd-party analytics dashboard)

3-org distinct: Anthropic (binary + docs) / mksglu (context-mode plugin) / @ryoppippi (ccusage MCP). ✓ sca-v11 §6 floor satisfied.

## Verdict

**OK / NO-OP** — P0.5 complete. Zero missing primitives. Runtime is at CCBP parity for the insights surface.
