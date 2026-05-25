# W327 Stream B — F5: Privacy Opt-ins Audit + Paste-Ready Recommendations

**Wave**: W327 Stream B · **Date**: 2026-05-19
**HEAD**: `569080a`
**Source**: W325 Stream A GAP-5 (tool details) + GAP-6 (raw API bodies) + GAP-7 (user prompts)
**Owner**: docs/architecture/W327-INSIGHTS-FINAL/* — STRICT-FILE-OWNERSHIP
**Verdict for this dimension**: **RECOMMEND ENABLE ALL 3** — local-single-operator infra → low PII risk → unlock full content visibility for max debugging value.

---

## §1 — Current state (verified this session)

`Z:/claude-sota-installed/.claude/settings.json` grep for the 3 env vars:
```
$ grep -n "OTEL_LOG_TOOL_DETAILS\|OTEL_LOG_RAW_API_BODIES\|OTEL_LOG_USER_PROMPTS" .claude/settings.json
# (no matches — all 3 vars absent)
```

**Net**: all 3 privacy opt-ins are at their CC defaults (off). CC OTel spans currently:
- Show tool name but NOT tool input/output payload
- Show Anthropic API request count but NOT request/response bodies
- Show prompt count but NOT user prompt text (rendered as `<REDACTED>` per CCBP)

**Impact**: Langfuse traces are skeletal — useful for usage metering, weak for debugging.

---

## §2 — CCBP-doc reference

Per `https://docs.anthropic.com/en/docs/claude-code/settings` (env-vars section, mirrored in local clone `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md`):

| Env var | CCBP line | Effect | Default |
|---|---|---|---|
| `OTEL_LOG_TOOL_DETAILS` | `:981` | Include `tool_parameters` (tool input dict) + `tool_response` in OTel events | off |
| `OTEL_LOG_RAW_API_BODIES` | `:982` | Emit full Anthropic API request + response bodies in spans | off |
| `OTEL_LOG_USER_PROMPTS` | `:983` | Include `user_system_prompt` (user message text) in spans (default `<REDACTED>`) | off |

All 3 are **default-off-for-privacy**: CCBP design assumes shared-infra / multi-operator / regulated-environment by default. Local-single-operator (this runtime) is the exception case — safe to enable.

---

## §3 — Per-var risk-class analysis

### §3.1 — `OTEL_LOG_TOOL_DETAILS=1`

**Effect**: every CC tool invocation OTel span gets enriched with:
- `tool.parameters` — JSON of the input dict (Bash command, Read file_path, Edit old/new strings, etc.)
- `tool.response` — JSON of the tool result (file contents read, command stdout/stderr, etc.)

**Data sensitivity**:
- Bash commands MAY contain secrets (e.g. `curl -H "Authorization: Bearer ..."` literal)
- Read tool may surface file content including credentials (`.env`, `secrets.json`)
- Edit tool may surface code patches with credentials being added/changed
- Grep tool may surface matches that include API keys

**Risk class** for local-infra single-operator:
- **PII to external party**: ZERO — all OTel data routes to local Langfuse `:3000` (no cloud egress)
- **Secret-rotation hygiene**: MEDIUM — secrets captured in Langfuse traces persist until trace TTL purge; rotation needed if Langfuse DB ever exfiltrates
- **Single-machine-leak**: trace DB is at `Z:/...` — operator-controlled; gitignored

**Recommendation**: ✅ **ENABLE** for local-infra (P1 MEDIUM win).

**Paste-ready**:
```jsonc
"OTEL_LOG_TOOL_DETAILS": "1",
```
**Byte cost**: ~30 bytes.

### §3.2 — `OTEL_LOG_RAW_API_BODIES=1`

**Effect**: every Anthropic API call OTel span gets enriched with:
- `request.body` — the JSON sent to Anthropic Messages API (messages array, system prompt, tools list)
- `response.body` — the JSON received from Anthropic (full content/tool_use blocks, stop_reason, usage tokens)

**Data sensitivity**:
- Full conversation history (user prompts + model responses + tool inputs/outputs)
- System prompt (this CLAUDE.md + CLAUDE.local.md content gets sent as system on each turn)
- Tool definitions schema
- Model output that may reveal internal reasoning (`<thinking>` blocks)

**Trace payload growth**: each turn ~5-50KB depending on context. Per-session trace size can grow to hundreds of MB if `OTEL_LOG_RAW_API_BODIES=1` over many turns.

**Risk class** for local-infra single-operator:
- **Privacy**: data stays local; LANGFUSE_HOST is `http://127.0.0.1:3000` per CLAUDE.local.md (f2)
- **DB-bloat risk**: HIGH — Langfuse DB may grow into multi-GB on heavy days; mitigate via trace TTL policy
- **Sensitive-context-leak**: HIGH if Langfuse DB ever exposed; mitigate via DB at-rest encryption (operator-decision)

**Recommendation**: ⚠ **ENABLE-AFTER-VERIFICATION** — wait until §3.1 (tool details) + GAP-3 (auth header) are confirmed working steady-state. Then flip §3.2.

**Paste-ready**:
```jsonc
"OTEL_LOG_RAW_API_BODIES": "1",
```
**Byte cost**: ~32 bytes.

### §3.3 — `OTEL_LOG_USER_PROMPTS=1`

**Effect**: instead of `user_system_prompt: <REDACTED>` in spans, the literal user prompt text is captured.

**Data sensitivity**:
- User prompt may contain task context, paths, instructions — usually low-sensitivity for this single-operator local-infra
- Operator-paste of secret values (if operator pastes a literal API key in a prompt) would land in traces

**Risk class** for local-infra single-operator:
- **External egress**: ZERO (local Langfuse)
- **Operator-paste-secrets risk**: LOW — operator should not paste secrets into prompts as a matter of hygiene
- **System-prompt-leak**: distinct env var — `OTEL_LOG_USER_PROMPTS` is for USER messages, not system

**Recommendation**: ✅ **ENABLE** for local-infra (P1 MEDIUM win; lowest-risk of the 3).

**Paste-ready**:
```jsonc
"OTEL_LOG_USER_PROMPTS": "1",
```
**Byte cost**: ~30 bytes.

---

## §4 — Combined paste-ready block

**Phased rollout** (recommended order):

**Phase 1 — Apply §3.1 + §3.3 together (low-risk pair)**:
```jsonc
"OTEL_LOG_TOOL_DETAILS": "1",
"OTEL_LOG_USER_PROMPTS": "1",
```
Byte cost: ~60 bytes.

**Phase 2 — Apply §3.2 after Phase-1 verified + Langfuse DB headroom confirmed**:
```jsonc
"OTEL_LOG_RAW_API_BODIES": "1",
```
Byte cost: ~32 bytes (cumulative ~92).

**Or all-at-once (operator confident in local infra)**:
```jsonc
"OTEL_LOG_TOOL_DETAILS": "1",
"OTEL_LOG_RAW_API_BODIES": "1",
"OTEL_LOG_USER_PROMPTS": "1",
```
Byte cost: ~92 bytes.

**Position**: paste inside existing `.claude/settings.json` `"env": { ... }` block alongside existing OTEL_* vars.

---

## §5 — Post-apply SMOKE test sequence

After operator applies the 3 vars + restarts CC:

### Step 1 — Trigger a CC tool use with non-trivial input
```
> Bash: echo "hello world from W327-B-5 smoke"
```

### Step 2 — Open Langfuse trace UI
`http://127.0.0.1:3000/` → Traces → click the latest trace.

### Step 3 — Verify enriched span content
Click the `tool_use(Bash)` span → look at attributes panel:
- **Expected with `OTEL_LOG_TOOL_DETAILS=1`**:
  - `tool.parameters.command`: `"echo \"hello world from W327-B-5 smoke\""`
  - `tool.response.stdout`: `"hello world from W327-B-5 smoke\n"`
- **Expected with `OTEL_LOG_USER_PROMPTS=1`**:
  - On the `chat` parent span: `user_system_prompt`: `<actual user message text>` (not `<REDACTED>`)
- **Expected with `OTEL_LOG_RAW_API_BODIES=1`**:
  - On the `ai_request` span: `request.body` and `response.body` populated with JSON

**If any of the 3 still show `<REDACTED>` or are empty**: env var didn't reach CC; check `.claude/settings.json` syntactic validity + restart CC fully (close + reopen, not just `/reload-plugins`).

---

## §6 — Privacy posture summary table

| Var | Default | Recommendation | Risk on local-infra | Action |
|---|---|---|---|---|
| `OTEL_LOG_TOOL_DETAILS` | off | **ON** | LOW (operator-controlled local Langfuse DB) | ✅ Phase 1 |
| `OTEL_LOG_USER_PROMPTS` | off | **ON** | LOW (operator's own prompts) | ✅ Phase 1 |
| `OTEL_LOG_RAW_API_BODIES` | off | **ON-after-verify** | MEDIUM (DB-bloat + at-rest-encryption advisable) | ⚠ Phase 2 |

**Net for local single-operator infra**: all 3 are safe to enable. The phased rollout is risk-management discipline, not a hard blocker.

---

## §7 — Byte budget interaction

Combined paste of all 3: ~92 bytes.
Settings.json post-W326-A-F1 = 15,998 bytes.
Settings.json post-3-opt-ins = ~16,090 bytes.

**Within ~16KB effective ceiling** (per CLAUDE.md L48 + W317-A budget invariant).

**If also applying W327-B-4 metrics+logs paste (+350 bytes)**:
- Cumulative target: ~16,440 bytes
- Exceeds the budget ceiling by ~80 bytes
- Mitigation: trim ~100 bytes from `_comment_*` fields (per W315 Stream E hygiene audit, ~400-500 bytes recoverable)
- OR: codify the new ~16.5KB effective ceiling in CLAUDE.md L48 with operator-confirmation

---

## §8 — Insights wire-up % contribution

This dimension addresses **GAP-5 + GAP-6 + GAP-7 (P1 MEDIUM — content visibility)**.

**Current state**: not closed (all 3 vars unset).
**Post-operator-action (Phase 1 — 2 vars)**: closes 2 of 3 P1 privacy gaps → +66% of P1 MEDIUM bucket.
**Post-operator-action (Phase 2 — 3 vars)**: closes 3 of 3 P1 privacy gaps → +100% of P1 MEDIUM bucket.

**Cumulative Insights wire-up** assuming all 5 W327-B dimensions resolve (statusLine W326-A F1 + GAP-3 auth header W327-B-2 + GAP-1+GAP-2 metrics+logs W327-B-4 + 3 privacy opt-ins W327-B-5):
- 4 of 4 CRITICAL P0 gaps: 100%
- 3 of 3 MEDIUM P1 gaps: 100%
- **Net Insights wire-up: 100% of 7 audited gaps**

---

## §9 — Operator-action checklist

| # | Action | Where | Time |
|---|---|---|---|
| 1 | Paste Phase-1 (TOOL_DETAILS + USER_PROMPTS) into `.claude/settings.json:env` | Editor | ~1 min |
| 2 | Validate JSON: `node -e "JSON.parse(require('fs').readFileSync('Z:/claude-sota-installed/.claude/settings.json'))"` | PS | ~30s |
| 3 | Restart CC session | CC | ~30s |
| 4 | Trigger a Bash tool use; check Langfuse trace shows tool params + user prompt | Browser + CC | ~2 min |
| 5 | After 1-2 sessions of Phase-1 steady-state, add Phase-2 (`RAW_API_BODIES`) | Editor + CC | ~2 min |
| 6 | Monitor Langfuse DB size growth — set TTL policy if needed | Langfuse Admin | ~3 min |

**Total operator time**: ~5-10 min (Phase 1 only); +3 min for Phase 2 with monitoring.
**Dependencies**: W327-B-2 GAP-3 auth header closure (otherwise the enriched traces never reach Langfuse).
**Reversibility**: remove the 2-3 env lines from settings.json.

---

## §10 — Cardinal-rule conformance

| Rule | Status | Notes |
|---|---|---|
| R1 (trusted-source primitives) | ✓ HOLD | CCBP-cited env vars |
| R2 (hooks = upstream OR direct-CLI) | ✓ HOLD | No hook addition |
| R3 (subagents = upstream) | n/a | Not a subagent change |
| R4 (project behavior in CLAUDE.md + settings.json) | ✓ HOLD | settings.json scope; paste-ready only this stream |
| R5 (sandbox/permissions) | ✓ HOLD (no change) | No permission edit |

**This stream**: 0 edits to settings.json — full charter compliance.

`self_invented_count: 0`.

---

## §11 — Forward-AIs

| # | ID | Priority | Description |
|---|---|---|---|
| 1 | W328-B-F5-1 | P1 | Operator-apply Phase-1 (TOOL_DETAILS + USER_PROMPTS); verify via Langfuse smoke |
| 2 | W328-B-F5-2 | P2 | After Phase-1 steady-state, apply Phase-2 (RAW_API_BODIES) + monitor Langfuse DB size |
| 3 | W328-B-F5-3 | P3 | Configure Langfuse trace TTL policy (e.g. 30-day retention) to manage DB-bloat from Phase-2 |
| 4 | W328-B-F5-4 | P3 | Document `tools/langfuse-trace-purge.ps1` as a manual GC fallback if TTL policy is insufficient |
| 5 | W328-B-F5-5 | P3 | Consider Langfuse DB at-rest encryption (operator-decision) if Phase-2 keeps sensitive payloads long-term |

---

## §12 — References

- **W325 GAP-5/6/7 source**: `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-GAP-AND-RECOMMENDATIONS.md` §2.1 + §2.2 + §2.3
- **CCBP env-vars doc**: `https://docs.anthropic.com/en/docs/claude-code/settings` (env-vars section)
- **CCBP local clone**: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:981-983`
- **W325 dependency anchor (GAP-3)**: `Z:/claude-sota-installed/docs/architecture/W327-INSIGHTS-FINAL/W327-B-2-OTEL-HEADER-PASTE-READY.md` (auth header MUST land first or these vars never reach Langfuse)
