# W308 Codex GPT-5.5-Spark Cross-Model Review (2026-05-19)

> **Model**: gpt-5.5 via codex CLI v0.130.0 (session `019e3e29-5a9c-7e52-a414-f8bb659ccadc`)
> **HEAD at review-time**: `0d40df6` (requested) / working-tree `97ce26b9` (actual; with sibling W309 + W308 EXECUTE drafts)
> **Tokens used**: 219,982 · **Duration**: ~4 min · **Cost**: well under $2
> **Web access**: enabled (sandbox workspace-write + network access)
> **Dispatched by**: Claude Opus 4.7 session `2760cd35-b5d2-467f-b36a-73e4f62bc136` per operator directive "use gpt5.5 aggressively with its full tools, web access and guide it with most advance sota references from sota repos"

## §0 TL;DR

Codex GPT-5.5 ratified all 4 W308 operator-decision verdicts AND surfaced 4 NEW HIGH findings with cite-anchored web-research evidence. The 2 most-actionable HIGH findings have been APPLIED THIS COMMIT (Phoenix MCP disable + PostToolUseFailure hook JSON-output fix). The other 2 HIGH findings (basic-memory uvx env-specific failure + OTel content-privacy partial coverage) are SURFACED-AND-DOCUMENTED for operator review without auto-fix. Most notable NEW discovery: **Trail of Bits curated PWF fork** (`trailofbits/skills-curated@022fa094...`) provides a 3rd path for the PWF decision beyond DEACTIVATE/RATIFY.

## §1 HIGH Findings (4)

### §1.1 HIGH: basic-memory uvx migration fails in codex sandbox env (env-specific)

- Codex probe: `uvx --from basic-memory==0.21.1 basic-memory --version` failed with `Failed to initialize cache at C:\Users\42\AppData\Local\uv\cache ... sdists-v9\.git: Access is denied`
- **Coordinator empirical check (this session bash)**: SAME COMMAND PASSED — returned `Basic Memory version: 0.21.1` cleanly. The `sdists-v9/.git` is a 0-byte marker file with normal `-rw-r--r--` perms.
- **Resolution**: env-specific (codex sandbox vs bash). NOT a blanket regression. **Recommended action**: launcher-equivalent smoke (run uvx from inside Claude Code's actual MCP-spawn context) before declaring W308 Batch-A regression.
- **Status**: DOCUMENTED-DEFERRED — operator to verify in launcher env at next MCP-spawn cycle. Reversion path retained: restore prior local `.exe` spawn from W281e form.

### §1.2 HIGH: PostToolUseFailure hook uses plain stdout instead of JSON `hookSpecificOutput.additionalContext`

- Cited source: Claude hooks docs at https://code.claude.com/docs/en/hooks lines 1393-1403 — `additionalContext` is the event-specific field for this hook
- Pre-fix command (settings.json:170): `Write-Output ('hook-feedback: ' + $ev.error.Substring(0, [Math]::Min($ev.error.Length, 200)))`
- Silent-fallback class: hook fires, but output goes to logs/debug rather than model context
- **APPLIED THIS COMMIT** — new command returns JSON:
  ```json
  {"hookSpecificOutput":{"hookEventName":"PostToolUseFailure","additionalContext":"hook-feedback: <error>"}}
  ```
- Reversibility: restore prior `Write-Output` line from git history

### §1.3 HIGH: Phoenix MCP should be disabled now (backend DOWN, Langfuse UP)

- Live probe: `:16006` returns HTTP 000 (Phoenix down); `:3000/api/public/health` returns HTTP 200 (Langfuse up)
- W308-Batch-A `baab2df` repointed OTEL endpoint to Langfuse
- Phoenix MCP still wired at `.mcp.json:93` — dead stdio MCP creates startup/reconnect noise with no observability value
- **APPLIED THIS COMMIT** — added `"phoenix"` to `.claude/settings.json:disabledMcpjsonServers` (now includes memory + github + context7 + playwright + graphiti + phoenix)
- Reversibility: remove the array entry; restart Phoenix backend at `:16006` first; then re-enable

### §1.4 HIGH: OTel content-privacy partial coverage (do not over-claim)

- `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` correctly suppresses GenAI message content per OTel spec
- BUT `OTEL_LOG_USER_PROMPTS=1` at settings.json:25 enables prompt logging via a separate channel
- Cited: OTel spec at https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/ lines 893-899 (prompt content sensitive; should not capture by default)
- **Status**: SURFACED-FOR-OPERATOR-DECISION — `OTEL_LOG_USER_PROMPTS=1` is INTENTIONAL for Langfuse Input/Output panel visibility (operator decided to log prompts at the trace level into local Langfuse, NOT external). Do not blanket-claim "no prompt content emitted" without trace inspection. NOT auto-changed.

## §2 Operator Decision Verdicts (codex-ratified)

| # | Decision | Codex GPT-5.5 Verdict | Rationale (cite-anchored) | Cross-coord with W308 |
|---|---|---|---|---|
| 1 | PWF (OthmanAdi/planning-with-files) | **DEACTIVATE unless replacing with Trail of Bits curated fork** | Anthropic docs state third-party plugins not Anthropic-controlled (https://code.claude.com/docs/en/discover-plugins lines 300-305); strongest independent signal = `trailofbits/skills-curated@022fa094...` curated fork drops expensive hooks + cleans templates (https://agentskill.sh/plugins/trailofbits/planning-with-files lines 39-49 + 74) | RATIFIES W308-Stream-B CONDITIONAL-RATIFY default-DEACTIVATE. NEW 3rd-path option (Trail of Bits curated fork) — DOCUMENTED for operator review. |
| 2 | HKUDS/OpenSpace HYBRID-pilot | **DEFER / VENDOR-FORK only** | Repo claims 46% / 4.2× verified in repo but NO independent non-HKUDS replication of GDPVal result (HKUDS/OpenSpace@58a0d0f7...); contamination-warn ratified | RATIFIES W308-Stream-C T2 VENDOR-FORK verdict. Codex confirms HYBRID-pilot is the right path (not full T1 INSTALL). |
| 3 | Phoenix MCP | **DEACTIVATE** | Backend confirmed DOWN locally; Langfuse already receives OTLP; dead MCP wiring = pure failure surface | APPLIED THIS COMMIT (§1.3). |
| 4 | sca-v5 §5 het-ensemble update | **PROCEED** | sca-v5 SKILL.md:316 already codifies 3-persona + Phase-5 + position-swap; het-ensemble update directly closes same-model degeneracy; no web source contradicted | PARTIAL APPLY recommended — operator should authorize SKILL.md §5 edit (high-impact spec change). |

## §3 Interop Web-Research Findings (May 2026)

GPT-5.5 surveyed 5 cross-vendor sources on OTel-GenAI v1.37+ Langfuse interop:

| Source | URL | Key finding |
|---|---|---|
| Langfuse OTel docs | langfuse.com/integrations/native/opentelemetry | Accepts OTLP at `/api/public/otel`; maps evolving GenAI attrs; trace-level fields MUST propagate to every span for filtering (lines 45-65) |
| Datadog LLM Observability | docs.datadoghq.com/llm_observability/instrumentation/otel_instrumentation | Explicitly supports v1.37+ GenAI semconv mappings (lines 4028-4034) |
| Honeycomb April 2026 | honeycomb.io/blog/fast-ai-feedback-loops-honeycomb-opentelemetry | Asks agents to emit v1.40.0 attrs: `gen_ai.conversation.id`, `gen_ai.agent.name`, `gen_ai.operation.name` (lines 170-179) |
| Grafana AI Observability | grafana.com/docs/grafana-cloud/machine-learning/ai-observability/introduction | Emits standard `gen_ai.*` spans/metrics; documents silent-loss if no TracerProvider/MeterProvider configured (lines 90-103) |
| Vercel AI SDK | community.vercel.com/t/opentelemetry-gen-ai-semantic-conventions-support/29859 | NOT fully GenAI-semconv interoperable; uses `ai.*` custom attrs causing Phoenix/Langfuse auto-extraction problems (lines 9-35) |

**Operator-action implications**:
- Honeycomb's v1.40.0 attrs (`gen_ai.conversation.id`, `gen_ai.agent.name`, `gen_ai.operation.name`) are NOT currently emitted by Claude Code's native OTel → next Stage of OTel pilot (Stage-2/3 in W307-STREAM-C) should add these
- Grafana's silent-loss warning maps to W309 Stream A (silent-fallback hunt) — verify TracerProvider is configured

## §4 W309 Plan Gaps (3 critical axes flagged by GPT-5.5)

Per sibling-drafted `docs/architecture/W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE/W309-PLAN.md`:

1. **Launcher-equivalent smoke environment** — probes must run through `eee`/Claude env, not only shell. uvx, OTel env, plugin hooks, and MCP startup are launcher-sensitive (the basic-memory finding §1.1 is exactly this).
2. **Trace sample validation** — add required Langfuse trace inspection proving actual emitted attributes: `gen_ai.*`, content absent/present as intended, span status on failed tools, trace-level propagation.
3. **Cache/ACL failure inventory** — include `uv`, `npx`, npm global cache, `C:\Users\42\AppData\Local\uv\cache`, state-dir ACL checks. Basic-memory failure shows this is not theoretical.

**Recommendation**: W309 Stream A scope should expand to include all 3 axes. Forwarded to sibling-session via this doc.

## §5 Next Repos to Inspect (concrete URL/SHA suggestions from GPT-5.5)

For sibling's W309-STREAM-C (named-repo deep-dives) and W309-STREAM-D (multi-angle SOTA discovery):

```
open-telemetry/semantic-conventions @ e6ce0d219ee61af553f8fc1118c25a266eda6122
langfuse/langfuse @ ddb3699e7a57de9c6817f1591f94c7056faa6d07
openlit/openlit @ 7ca59852f63177cdfd8f5b40924b6126c7b37fcc
vercel/ai @ 3fa5de9374c454eb5083048a6222440b07a9fa22
basicmachines-co/basic-memory @ 60ec6728ded3657951e2ec2e43a6dd910ac03f12
trailofbits/skills-curated @ 022fa0948818c9f2f738a428f4546cc65c427767
HKUDS/OpenSpace @ 58a0d0f781b7035cb0f99fef90a7df807475c413
```

## §6 This-commit changes (codex-ratified)

| File | Change | Closes |
|---|---|---|
| `.claude/settings.json:disabledMcpjsonServers` | Added `"phoenix"` (now 6 entries) | §1.3 HIGH |
| `.claude/settings.json:PostToolUseFailure.command` | Replaced plain Write-Output with JSON `hookSpecificOutput.additionalContext` | §1.2 HIGH |
| `docs/architecture/W308-PATTERN2-PWF-SOTA-DISCOVERY/W308-CODEX-R1-GPT5-5-REVIEW.md` | NEW — this doc | Documents all 4 verdicts + 4 HIGH findings + interop research + W309 plan gaps + next-repos list |

## §7 Operator-actionable queue (post-this-commit)

- **HIGH-OPERATOR-DECISION**: PWF — DEACTIVATE plain `OthmanAdi/planning-with-files` OR ADOPT `trailofbits/skills-curated@022fa094...` curated fork (NEW 3rd-path option from codex). Default by W310: DEACTIVATE.
- **HIGH-OPERATOR-DECISION**: OpenSpace — DEFER full integration; consider VENDOR-FORK pilot at `HKUDS/OpenSpace@58a0d0f7...` namespaced under `.claude/agents/openspace-vendored/`. Independent replication still pending.
- **MEDIUM-OPERATOR-DECISION**: sca-v5 SKILL.md §5 het-ensemble update — codex APPROVES; operator authorizes the edit; Claude can draft the diff per W308-Stream-A recommendation.
- **MEDIUM-OPERATOR-VERIFY**: basic-memory uvx — re-test from inside Claude Code launcher (not just bash) to confirm post-W308 Batch-A pin holds. If launcher-env fails, revert to local .exe (W281e form).
- **LOW-OPERATOR-AWARE**: OTel content privacy — `OTEL_LOG_USER_PROMPTS=1` logs prompts in local Langfuse trace (intentional). Do not over-claim "no prompt content emitted".

## §8 Codex r1 ratification status

- W308 Stream A (het-ensemble Pattern-2 smoke): **RATIFIED** — codex agreed cross-persona perturbation closes W306-codex-r1 same-model degeneracy
- W308 Stream B (PWF Phase-5 re-litigation): **RATIFIED + EXTENDED** — codex confirms DEACTIVATE default; adds Trail of Bits curated fork as 3rd-path option
- W308 Stream C (OpenSpace VENDOR-FORK): **RATIFIED** — codex confirms DEFER full integration; no independent replication found
- Phoenix MCP disable: **RATIFIED + APPLIED** this commit
- PostToolUseFailure JSON-output fix: **NEW HIGH** + **APPLIED** this commit

## §9 Cardinal-rule self-check (post this commit)

- R1 trusted-only ✓ (no install added; codex verdicts are RECOMMEND-only beyond the 2 applied fixes)
- R2 no `.claude/hooks/scripts/*.py` ✓ (PostToolUseFailure hook is inline PowerShell via direct-CLI invocation — CR-2 compliant; same pattern as Notification hook)
- R3 subagents documented ✓ (codex CLI dispatch per W280a Path P pattern)
- R4 REVERSED ✓ (per Batch-A `609cba0`)
- R5 safety via CC permissions ✓
- W286 P0C ✓ (basic-memory pin remains; env-specific failure DOCUMENTED-DEFERRED not auto-reverted)
- `self_invented_count: 0` preserved ✓

## §10 Cite-anchors

- Codex GPT-5.5 output: `tmp/codex-output/w309-cross-model-review.md` (6494 LOC raw; final synthesis ~150 LOC)
- OpenTelemetry SemConv GenAI spec: https://opentelemetry.io/docs/specs/semconv/gen-ai/ (Stage-1 stable-subset)
- Claude Code hooks docs: https://code.claude.com/docs/en/hooks (lines 1393-1403 `additionalContext`)
- Trail of Bits curated PWF fork: https://agentskill.sh/plugins/trailofbits/planning-with-files
- 5 vendor interop sources cited in §3
- W308 stream files at `docs/architecture/W308-PATTERN2-PWF-SOTA-DISCOVERY/W308-STREAM-A/B/C-*.md`
- W309-PLAN.md at `docs/architecture/W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE/W309-PLAN.md` (sibling-drafted)
