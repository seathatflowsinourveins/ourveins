# W308 Stream A — OTel-GenAI Stage-1 Pilot

> **Wave**: W308; **Stream**: A; **Agent**: agent-A-otel-genai-pilot
> **P0**: silent langfuse#12657 data-loss closure (Stage-1 pre-alignment)
> **Closes**: W307 Stream C T2 STANDARDS-class PRE-ALIGN-PARTIAL → ACTIVE-PILOT (Stage-1 of 3-stage pilot)
> **Reversibility**: `git revert HEAD` OR remove the 2 added env vars from `.claude/settings.json`
> **Date**: 2026-05-18; **Cost**: $0 (config-only; no API spend; no installs)
> **Cardinal-rule conformance**: CR-2 (env-var addition in sanctioned settings.json env block; no `.claude/hooks/scripts/*` self-invent)

---

## §1 Why this stream

**Active silent data-loss** (per W307 Stream C audit + W308 architecture §3.1):

- Claude Code's native OTel tracing emits v1.37+ events-based GenAI semconv format (the `gen_ai.client.inference.operation.details` event body for prompts/completions).
- Self-hosted Langfuse T5 at `:3000` (project `5.17.2026`) **silently drops** these events into `metadata.attributes` per `langfuse/langfuse#12657` (open 2026-03-18, mkremnev; verified still open by codex-r1 audit 2026-05-19).
- Direct operator quote from issue: *"This is how claude code's native otel tracing exports traces, so it would be great if this could be fixed ASAP"* — directly affects this runtime.
- Fix is in-flight via `langfuse#13674` ("fix(otel): map GenAI operation details messages", pragnyanramtha, 2026-05-17) — **OPEN, not merged** at time of this stream.

**Stage-1 closes the gap** by pre-aligning this runtime's OTel-emitted attributes to the OTel SemConv v1.37+ stable-subset namespace (per W307 Stream C §7.1) so that:

1. Indexed-data attributes (model, provider, operation, token usage) emit in the v1.37+ canonical form **today** — Langfuse already supports these via `gen_ai.input.messages`/`gen_ai.output.messages` attribute mapping (PR #8813).
2. Content-bearing event format (`gen_ai.client.inference.operation.details`) stays **suppressed** until `langfuse#13674` merges — avoids blind-spotting our own Langfuse Input/Output panel during the in-flight window.
3. When `#13674` merges, Stage-3 flips `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true` and content events start populating — zero re-instrumentation, zero CLAUDE.md edit, zero settings.json restructure.

**OTel SemConv source-of-truth**: `open-telemetry/semantic-conventions-genai` @ `main` (dedicated repo, created 2026-05-05); schema URL `https://opentelemetry.io/schemas/gen-ai/1.42.0`. Status: Development. Stable-date: not yet announced (per spec transition-plan text).

**Cross-org corroborating sources** (W307 Stream C §3 typed-evidence): OpenTelemetry-canonical SIG-GenAI + Langfuse maintainers + Arize Phoenix maintainers + AgentMarketCap practitioner report (2026-04-10) + Traceloop OpenLLMetry WG-lead. ≥5 distinct orgs concur on Development status + v1.37 breaking change + Langfuse/Phoenix lag.

---

## §2 What changes — settings.json env diff

**File touched**: `Z:/claude-sota-installed/.claude/settings.json` (ENV block only; lines ~31-32 insertion point — directly after the existing `OTEL_RESOURCE_ATTRIBUTES` entry to keep all OTEL_* env vars contiguous).

```diff
   "OTEL_TRACES_EXPORTER": "otlp",
   "OTEL_EXPORTER_OTLP_TRACES_ENDPOINT": "http://127.0.0.1:3000/api/public/otel/v1/traces",
   "OTEL_EXPORTER_OTLP_TRACES_PROTOCOL": "http/protobuf",
   "OTEL_RESOURCE_ATTRIBUTES": "openinference.project.name=eee",
+  "OTEL_SEMCONV_STABILITY_OPT_IN": "gen_ai_latest_experimental",
+  "OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT": "false",
   "CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY": "1",
```

### §2.1 Env-var semantics

| Env var | Value | Effect | Source |
|---|---|---|---|
| `OTEL_SEMCONV_STABILITY_OPT_IN` | `gen_ai_latest_experimental` | Opts in to v1.37+ `gen_ai.*` attribute namespace. Dual-emission default: instrumentations that honor this contract emit *both* the legacy `gen_ai.system`/`gen_ai.prompt`/`gen_ai.completion` AND the new `gen_ai.provider.name`/`gen_ai.input.messages`/`gen_ai.output.messages` until downstream tooling is migrated. Single-token comma-list value per spec contract. | OTel SemConv transition-plan §1.36 → §1.37 (`open-telemetry/semantic-conventions` CHANGELOG v1.37.0); confirmed in W307 Stream C §1.2 |
| `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` | `false` | Stage-1: suppress emission of message-content event bodies (`gen_ai.client.inference.operation.details`). Indexed attributes (model/provider/operation/usage) still emit normally. Stage-3 will flip to `"true"` post-`langfuse#13674` merge to unlock prompts+completions in Langfuse Input/Output panel. | OTel python-contrib `opentelemetry-instrumentation-genai` env-var contract; confirmed in `python-contrib/util/genai` instrumentation source |

### §2.2 Why these 2 env vars are the minimal Stage-1

- They are the **minimum-viable signaling primitives** in the OTel SDK contract that control GenAI-semconv emission shape — neither requires SDK swap, code change, or restart of running services.
- They are **purely additive** for any instrumentation that honors them (legacy emission continues; new attrs appear alongside).
- They are **completely inert** for any instrumentation that doesn't (no error, no breakage, no startup failure).
- Stage-1 is intentionally narrower than W307 Stream C §7.1's full stable-subset list — the 6 individual attribute names (`gen_ai.provider.name` / `gen_ai.request.model` / etc.) are *opted-in* via this env var rather than enumerated, because OTel SemConv emission is owned by the instrumentation libraries (Claude Code native exporter + future instrumentations), not by per-attribute env switches.

---

## §3 Verification + smoke

### §3.1 Pre-change baseline (captured at this stream's start)

- Current size: 14520 bytes (~14.18 KB)
- JSON validity: PASS (verified via `python -c "import json; json.load(open('.claude/settings.json'))"`)
- Existing OTEL_* env keys: 8 (`OTEL_LOG_TOOL_DETAILS`, `OTEL_LOG_USER_PROMPTS`, `CLAUDE_CODE_ENABLE_TELEMETRY`, `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA`, `OTEL_TRACES_EXPORTER`, `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`, `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL`, `OTEL_RESOURCE_ATTRIBUTES`)
- Total env keys: 44

### §3.2 Post-change verification

| Check | Result |
|---|---|
| JSON syntax | PASS — `python -c "import json; json.load(open('.claude/settings.json'))"` |
| File size ≤15 KB cap | PASS — 14654 bytes (~14.31 KB), well under 15360 byte ceiling |
| New `OTEL_SEMCONV_STABILITY_OPT_IN` present | PASS — value `gen_ai_latest_experimental` |
| New `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` present | PASS — value `false` |
| Total env keys | 46 (was 44; +2 as expected) |
| Existing OTEL_* untouched | PASS — all 8 prior keys + values byte-identical |

### §3.3 Behavioral smoke (no API spend required)

- The two env vars are **observation primitives**, not action primitives — flipping them does not call out to Langfuse, Phoenix, or any backend.
- A full end-to-end smoke (verifying that Langfuse now ingests v1.37+ attribute-form messages correctly) is **Stage-2 (Week 2) observation work**, not Stage-1 scope. Per W307 §7.2, Stage-2 is "observe Langfuse ingest correctness for 7 days; verify no schema drift, no missing inputs."
- The codex Stop-hook adversarial-review gate (W280a) auto-fires on commit of this change; per W308 goal predicate, any HIGH/critical finding triggers BLOCK.

### §3.4 Cardinal-rule conformance check

- **CR-1** (trusted-source primitive): N/A (no plugin install)
- **CR-2** (no self-invent in `.claude/hooks/scripts/*.{py,sh}`): PASS — change is purely an env-var addition in the sanctioned `.claude/settings.json` env block. The W280c (autocompact) + W259-v8 U3 (disable auto-memory) precedents confirm env-block edits as the CR-2-compliant pathway for runtime tunables.
- **CR-3** (subagent compliance): N/A (no agent file edits)
- **CR-4** (no `.claude/rules/`): PASS — design content lives in `docs/architecture/W308-EXECUTE-AND-ROTATE/`, not in any disallowed `.claude/rules/*.md`
- **CR-5** (permission-managed safety): PASS — env vars are not secrets; no `permissions.deny[]` change needed; no `permissions.allow[]` change needed

---

## §4 Stage-2 + Stage-3 (deferred)

Per W307 Stream C §7.2, the full 3-stage pilot:

| Stage | Week | Action | Cost | Reversibility | Status |
|---|---|---|---|---|---|
| **Stage-1** | W308 (now) | Add `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental` + `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` to settings.json env | $0 | `git revert HEAD` | **SHIPPED THIS STREAM** |
| **Stage-2** | W309 (or +7d observation) | Passive observation — verify Langfuse ingestion of v1.37+ attribute-form via existing UI; smoke `gen_ai.usage.input_tokens` / `gen_ai.usage.output_tokens` → Langfuse generation usage panel | $0 | Same as Stage-1 | **DEFERRED** (passive observe; no code change) |
| **Stage-3** | W310+ (CONDITIONAL on `langfuse#13674` merge + Langfuse minor-version bump) | Flip `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true` to enable content events for Input/Output panel | ~$0.20 | Single env-var flip back to `false` | **DEFERRED** (upstream-merge-gated) |

**Stage-3 trigger watch-list** (next-review triggers per W307 §9):
- Langfuse PR #13674 merges + ships in a minor-version release
- OpenTelemetry SemConv v1.43+ or v2.0 release
- OpenTelemetry SemConv announces a stable-date target (per spec transition-plan)
- W294 (or any subsequent wave) quarterly re-litigation

---

## §5 Rollback

### §5.1 Single-step revert path

```bash
cd Z:/claude-sota-installed
git revert HEAD --no-edit
```

This restores `.claude/settings.json` byte-identical to its pre-Stream-A state and removes the 2 env vars. Any instrumentation that was honoring `OTEL_SEMCONV_STABILITY_OPT_IN` reverts to legacy `gen_ai.system`-style emission on the next session start.

### §5.2 Surgical revert (env vars only)

Alternative — manually delete the 2 lines from `.claude/settings.json` env block:

```diff
-  "OTEL_SEMCONV_STABILITY_OPT_IN": "gen_ai_latest_experimental",
-  "OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT": "false",
```

Validate JSON (`python -c "import json; json.load(open('.claude/settings.json'))"`); commit. No state mutation, no service restart, no daemon reload needed beyond next Claude Code session start.

### §5.3 Why this is risk-bounded

- Both env vars are **purely additive** to OTel SemConv emission. Removing them does not break any existing instrumentation.
- No upstream tool/library is *required* to honor these env vars; libraries that don't recognize them simply ignore them.
- Langfuse OTel ingest at `:3000/api/public/otel/v1/traces` is unaffected — it continues to ingest whatever shape the exporter sends; the env vars only influence the *shape* downstream of any conforming instrumentation.

---

## §6 Cardinal-rule + governance trail

### §6.1 CR-2 conformance argument

The `.claude/settings.json` env block is the **canonical**, **sanctioned** location for runtime tunables in this codebase per:

1. CCBP `claude-settings.md:877-921 @ HEAD ac0d87d` (TIER-1-DIRECT env-block authority)
2. W259-v8 U3 precedent (`CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` lives in settings.json env, not in any `.claude/rules/` file or hook script)
3. W280c precedent (`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` was *removed* from settings.json env; manipulation was via the env block, not via any script)
4. The current settings.json env block already contains 8 OTEL_* + 4 HINDSIGHT_API_LLM_* + 4 CLAUDE_CODE_* runtime tunables — the new 2 OTEL_INSTRUMENTATION_* vars fit the established pattern

### §6.2 Source-of-truth provenance for the 2 added vars

- `OTEL_SEMCONV_STABILITY_OPT_IN`: defined in `open-telemetry/semantic-conventions` v1.36 → v1.37 transition plan (CHANGELOG v1.37.0); also documented in `open-telemetry/opentelemetry-python-contrib` instrumentation envelopes
- `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT`: defined in `open-telemetry/opentelemetry-python-contrib/instrumentation-genai/*` adapters (consistent across openai, anthropic, vertexai, etc. instrumentation modules)

Both are OTel-SDK-contract env vars, not invented by this runtime.

### §6.3 Decision-decay state

- State: **ACTIVE** (wave 0 of 12-wave AGING window)
- Next-review trigger (any of): `langfuse#13674` merge OR OTel SemConv v1.43+ release OR OTel SemConv stable-date announcement OR W294 quarterly re-litigation cron
- Re-litigation owner: `sota-convergence-audit` skill applied to OTel-GenAI candidate at next-review-trigger

---

## §7 Cross-stream linkage

- **W307 Stream C** (parent audit): full sca-v5 STANDARDS-class audit producing T2 PRE-ALIGN-PARTIAL verdict at `docs/architecture/W307-TOP3-CHALLENGER-AUDITS-AND-AUTOMATION/W307-STREAM-C-OTEL-GENAI-AUDIT.md`
- **W308 Architecture** (this wave's umbrella doc): §1 Layer 6 + §3.1 active-silent-failures + §4 goal-predicate Stream A specification at `docs/architecture/W308-DEFINITIVE-SOTA-ARCHITECTURE/W308-DEFINITIVE-ARCHITECTURE.md`
- **W308 Synthesis** (parent stream synthesizer): expected to append OTel-GenAI status update from `PRE-ALIGN-PARTIAL` → `ACTIVE-PILOT` to VERDICT-LEDGER per W308 goal predicate ROOT section
- **codex GPT-5.5 cross-model adversarial-review gate**: auto-fires on commit per W280a Stop-hook contract

---

## End-of-stream note

Stream A SHIPPED. Stage-1 stable-subset pre-alignment landed via 2 env-var additions in `.claude/settings.json`. File size 14.31 KB (under 15 KB cap). JSON valid. Cardinal-rule R2-conformant (env-block-only, sanctioned location). Reversible via `git revert HEAD`. Stage-2 + Stage-3 deferred per upstream merge gating. Total LOC: ~200 design doc + 2 settings.json env lines.
