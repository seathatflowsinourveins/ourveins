# W329-B — Insights + Native Claude Code Features Audit

> Wave: W329 Stream B (2026-05-19). Operator question: *"DO WE HAVE INSIGHTS FEATURES ENABLED ... WE NEED FULL SOTA FEATURES UNLEASHED."*
> HEAD verified during stream; CC 2.1.144; ctx_insight live this session at `http://localhost:4747` PID 134184.
> Cite-anchors used through-stream (3-org-distinct, repeated): `https://code.claude.com/docs/en/*` (Anthropic) + `https://opentelemetry.io/docs/specs/otel/protocol/exporter/` (OTel) + `https://langfuse.com/docs/integrations/opentelemetry/get-started` (Langfuse) + `https://github.com/Arize-ai/phoenix` (Arize) + `https://github.com/sirmalloc/ccstatusline` (sirmalloc) + CCBP `claude-settings.md @ 48f2ceb`.

---

## §0 Executive Verdict — feature-by-feature

| Feature | Wired? | Operator surface | Cite | Gap |
|---|---|---|---|---|
| OTEL traces (Langfuse) | PARTIAL | `OTEL_TRACES_EXPORTER=otlp` set, endpoint set | settings.json:23-27 | **Auth header missing — 0 native CC traces in Langfuse DB** (W325 FINDING-1) |
| OTEL metrics | NO | unset | W325 §1.2 | GAP-1 — 8 metrics dropped |
| OTEL logs | NO | unset | W325 §1.2 | GAP-2 — events dropped |
| OTEL privacy opt-ins (3) | NO | unset (TOOL_DETAILS / RAW_API_BODIES / USER_PROMPTS) | W325 §1.4 | GAP-5/6/7 — content invisible |
| statusLine | YES (ccstatusline 2.2.19, 37 widgets) | bottom-bar | settings.json:219-224 | OK |
| ctx_insight dashboard | YES (live this session on :4747) | `mcp__plugin_context-mode_context-mode__ctx_insight` | context-mode 1.0.141 | **No operator-surface slash command** |
| Phoenix observability (:16006) | LIVE (Docker v13.15.0 8h+) | HTTP UI | W328-B-2 | Metrics/logs receivers NOT enabled (405 on POST) |
| Claude Code Analytics API (cloud) | NO | n/a | W325 §1.5 | Needs org ANTHROPIC_ADMIN_API_KEY — operator-decision |
| ccusage MCP | YES | `/ccusage:*` slash commands | .mcp.json:41 | OK |
| langfuse MCP | YES (read-side) | `mcp__langfuse__get-prompt(s)` | .mcp.json:50 | OK |
| Background sessions (`claude --bg`) | n/a | DOES NOT EXIST per W325 FINDING-5 | W325 §2.5 | Operator mental-model drift; use `claude agents` |
| `/insights` slash | n/a | DOES NOT EXIST in 2.1.144 | W325 FINDING-5 | n/a |
| teammateMode | YES (`in-process`) | settings.json:448 | CCBP claude-settings | OK |
| experimentalAgentTeams | YES (env=1) | settings.json:13 | CCBP claude-settings | OK |
| Fork-subagent | YES (env=1) | settings.json:6 | CCBP env-vars | OK |
| Worktrees | YES (settings.json:436 + WorktreeRemove hook) | `EnterWorktree` | code.claude.com/cli-reference | OK |
| alwaysThinkingEnabled | YES | settings.json:441 | CCBP | OK |
| effortLevel = xhigh | YES | settings.json:442 | CCBP | OK |
| outputStyle = Proactive | YES | settings.json:440 | CCBP | OK |
| sandbox | DISABLED (`enabled:false`) | settings.json:429-435 | CCBP | R5 SHIP-BLOCKER carry (W316-S1) |
| autoMemoryEnabled | DELIBERATELY OFF (env wins) | settings.json:445 + env:35 | W259-v8 U3 | by-design |
| Auto-compact (PreCompact hook) | YES | hook in settings.json:163-172 | CCBP | OK |
| ENABLE_TOOL_SEARCH=auto:5 | YES | settings.json:20 | code.claude.com | OK |
| ENABLE_PROMPT_CACHING_1H | YES | settings.json:19 | CCBP | OK |
| 1M context | YES (default — env not disabled) | CLAUDE.local.md (h) | code.claude.com/model-config | OK |
| Headless `--print` | YES (native CC capability) | n/a | code.claude.com/headless | OK |
| Statusline-cost widget | YES (ccstatusline) | bottom-bar | ccstatusline | OK |
| Plugin marketplace insights (PostHog/Fullstory) | NO | not installed | W329-B §6 | not available in surveyed marketplaces |

**Net**: 47/68 plugins enabled; 14 native env-block features WIRED; **6 of 7 OTEL Insights gaps OPEN** (operator-paste blocked since W325).

---

## §1 Insights Dashboard (ctx_insight + Analytics API + Phoenix)

**ctx_insight**: VERIFIED LIVE this session (`ctx_insight` MCP call this stream → `Dashboard running at http://localhost:4747 PID 134184`). Source files copy + deps install + build complete; first-run took ~30s. Data flow: 11-day window, 3.3K conversations, 47K events captured across 1373 projects, lifetime cost $180.81 (per `ctx_stats` this stream). **Operator surface gap**: no slash-command shortcut (only invokable via MCP tool name); no auto-fire skill on session-start; not surfaced in statusline.

**Claude Code Analytics API (cloud)**: NOT wired. Per W325 §3 — endpoint is org-level Anthropic Admin API (`https://api.anthropic.com/v1/organizations/...`), requires `ANTHROPIC_ADMIN_API_KEY`. Not present in CLAUDE.local.md or settings.json env block. **Operator decision required**: does this account have org-admin scope? If yes, W326-AI-5 prescribes `tools/cc-analytics-pull.sh` + NSSM daily schedule (deferred since W325). Cite: `https://docs.anthropic.com/en/api/admin-api/usage-and-cost/get-claude-code-usage-report`.

**Phoenix observability (:16006)**: LIVE per port probe this stream + W328-B-2 (`Up 8h healthy`, Docker `arizephoenix/phoenix:version-13.15.0`, persistent volume). What it provides: OTel trace UI + GenAI semconv views + LLM eval scaffolding (per https://docs.arize.com/phoenix). **Gap**: `/v1/metrics` + `/v1/logs` HTTP 405 — receivers not enabled (`PHOENIX_ENABLE_METRICS_RECEIVER=true` + `PHOENIX_ENABLE_LOGS_RECEIVER=true` Docker env not set). Also: settings.json does NOT yet point `OTEL_*_METRICS_*` or `OTEL_*_LOGS_*` at Phoenix (W327-B-4 paste still pending operator-side).

---

## §2 Native CC Features Wire-up Matrix

| Native feature | Doc URL | Runtime status | Settings.json key / env | Gap |
|---|---|---|---|---|
| Skills (`description:` auto-fire) | `code.claude.com/docs/en/skills` | LIVE (33 local + plugin-shipped) | per `.claude/skills/<name>/SKILL.md` | OK |
| Agents (subagent system) | `code.claude.com/docs/en/sub-agents` | LIVE + `CLAUDE_CODE_FORK_SUBAGENT=1` | settings.json:6 | OK |
| Plugins | `code.claude.com/docs/en/plugins` | 64 installed / 47 enabled | settings.json:225-294 | 4 marketplace entries unused (W315) |
| MCP servers | `code.claude.com/docs/en/mcp` | 13 (`.mcp.json`) | `.mcp.json:mcpServers` | OK |
| Hooks (Session/PreToolUse/Post/PreCompact/WorktreeRemove/Notification/PostToolUseFailure/TaskCompleted) | `code.claude.com/docs/en/hooks` | LIVE — 9 hook surfaces | settings.json:95-216 | OK (CR-2 compliant) |
| Memory (CLAUDE.md / CLAUDE.local.md / @import) | `code.claude.com/docs/en/memory` | pointer-only, ≤50 LOC | CLAUDE.md | OK |
| Settings | `code.claude.com/docs/en/settings` | 51 env keys | settings.json | see §4 |
| Auto-compact PreCompact hook | `code.claude.com/docs/en/hooks` | LIVE | settings.json:163-172 | OK |
| Headless mode (`--print`, `--output-format`) | `code.claude.com/docs/en/headless` | available | n/a | not driver-wired (CCusage tracks foreground only) |
| Background sessions (`claude agents`) | `code.claude.com/docs/en/cli-reference` | available | n/a | not actively used |
| Worktrees (`EnterWorktree`) | `code.claude.com/cli-reference` | LIVE + WorktreeRemove hook | settings.json:174-182 | OK |
| Fork-subagent | `code.claude.com/env-vars` | YES | env:6 | OK |
| Statusline (`statusLine.command`) | `code.claude.com/docs/en/statusline` | YES (ccstatusline 2.2.19) | settings.json:219-224 | OK (37 widgets) |
| Output styles (`outputStyle`) | `code.claude.com/docs/en/output-styles` | `Proactive` | settings.json:440 | OK |
| Thinking mode (`alwaysThinkingEnabled`) | `code.claude.com/docs/en/extended-thinking` | YES | settings.json:441 | OK |
| Effort level (`effortLevel`) | CCBP `claude-settings.md` | `xhigh` | settings.json:442 | OK (max would be `max`) |
| Auto-memory (`autoMemoryEnabled`) | `code.claude.com/docs/en/memory` | settings=true / env=DISABLE=1 (env wins) | settings.json:445 + env:35 | deliberate per W259-v8 U3 |
| Sandbox | `code.claude.com/docs/en/sandbox` | DISABLED (`enabled:false`) | settings.json:429-435 | **R5 SHIP-BLOCKER carry** |
| Permissions (allow/deny) | `code.claude.com/docs/en/settings` | LIVE — 11 allow + 18 deny | settings.json:57-92 | OK |
| Teammate mode | `code.claude.com/docs/en/teammates` | `in-process` | settings.json:448 | OK |
| Experimental agent-teams | CCBP env-vars | `=1` | env:13 | OK |
| Prompt caching 1h | code.claude.com/docs/en/prompt-caching | `=1` | env:19 | OK |
| Tool search (`ENABLE_TOOL_SEARCH`) | code.claude.com/docs/en/tool-search | `auto:5` | env:20 | OK |
| Fine-grained tool streaming | CCBP | `=1` | env:15 | OK |
| Away summary | CCBP | `=1` | env:14 | OK |
| Telemetry beta | CCBP | `=1` | env:22 | OK (paired w/ TRACES) |
| Gateway model discovery | CCBP | `=1` | env:29 | OK |
| PreCompact override (`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`) | code.claude.com/docs/en/settings | UNSET (default ~95%) | n/a | deliberate per W280c |
| Sub-agent model bypass | code.claude.com/docs/en/sub-agents | UNSET (Opus on subagents) | n/a | deliberate per CLAUDE.local.md (g) |
| 1M context (`CLAUDE_CODE_DISABLE_1M_CONTEXT`) | code.claude.com/docs/en/model-config | UNSET (1M active) | n/a | OK per CLAUDE.local.md (h) |
| MAX_MCP_OUTPUT_TOKENS | CCBP | `50000` | env:30 | OK |
| BASH_MAX_OUTPUT_LENGTH / TIMEOUT | code.claude.com/cli-reference | 100000 / 1.8M ms | env:31-32 | OK |
| MCP_TOOL_TIMEOUT | CCBP | `300000` ms | env:33 | OK |

---

## §3 NOT-Enabled Features (P0/P1 candidates)

**P0 — Insights-critical (operator-paste deferred since W325)**:

1. **OTEL_EXPORTER_OTLP_HEADERS** = `Authorization=Basic <base64(pk:sk)>` → unblocks all CC-native traces in Langfuse (currently 0 native traces, only 3 manual smoke probes). Vehicle: CLAUDE.local.md `(f5)` block; template emitted at `tools/insights-wireup/otel-headers-template.ps1`.
2. **OTEL_METRICS_EXPORTER=otlp + OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://127.0.0.1:16006/v1/metrics + OTEL_EXPORTER_OTLP_METRICS_PROTOCOL=http/protobuf** (3 keys). Unblocks 8 metrics (session/cost/token/PR/commit/LoC/edit-decision/active-time). Pre-req: enable Phoenix metrics receiver.
3. **OTEL_LOGS_EXPORTER=otlp + endpoint + protocol** (3 keys). Unblocks event/log signal.
4. **OTEL_LOG_TOOL_DETAILS=1 + OTEL_LOG_USER_PROMPTS=1** (Phase-1 privacy, low-risk on local infra). Adds tool_parameters + user_prompt to spans. Template at `tools/insights-wireup/privacy-opt-ins-phase1.ps1`.
5. **Phoenix Docker env**: `PHOENIX_ENABLE_METRICS_RECEIVER=true` + `PHOENIX_ENABLE_LOGS_RECEIVER=true` — recreate container so it accepts metrics/logs OTLP POSTs.
6. **Langfuse SEV-1 key rotation** (carries W325-r1 → W326 → W327 → W328) — operator-only via Langfuse admin UI at `http://127.0.0.1:3000`.

**P1 — SOTA capability not yet enabled**:

7. **OTEL_LOG_RAW_API_BODIES=1** (Phase-2 privacy) — defer until Phase-1 steady-state observed.
8. **`otelHeadersHelper` settings.json key** (CCBP claude-settings.md:768-779) — dynamic header script for key rotation.
9. **Claude Code Analytics API (org-level)** — needs `ANTHROPIC_ADMIN_API_KEY`. Vehicle: `tools/cc-analytics-pull.sh` + NSSM daily pull → local SQLite for cross-session insight (W326-AI-5).
10. **Background sessions usage** — `claude agents` subcommand exists but is not driven from any current workflow; could absorb `codex-review` dispatch + nightly evals to free interactive session.
11. **PostHog / Fullstory marketplace plugins**: **NOT AVAILABLE** in the 22 surveyed marketplaces (claude-plugins-official + 21 others). The closest insights-class plugins are `claude-mem@thedotmack@13.2.0` (memory analytics, disabled) + `intelligent-compact@claude-settings@1.0.0` (compact analytics, disabled) + `signed-audit-trails@claude-code-workflows@0.1.0` (audit-trail, disabled). None equivalent to PostHog/Fullstory.

**P2 — Tighter telemetry stitching**:

12. **OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE=delta** (Phoenix-recommended for accumulating-counter visibility).
13. **OTEL_METRIC_EXPORT_INTERVAL** override (default 60000ms — could lower to 10000ms for tighter dashboards).

---

## §4 Settings.json env keys (51 total) — staleness audit

| Key | Live? | Cite | Verdict |
|---|---|---|---|
| CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS | YES | CCBP | KEEP |
| CLAUDE_CODE_FORK_SUBAGENT | YES | code.claude.com/env-vars | KEEP |
| ECC_DISABLED_HOOKS | YES (8 plugin-hooks suppressed) | everything-claude-code plugin | KEEP — silences W255-removed analytics-class plugin hooks |
| PYTHON_BIN | YES | CCBP | KEEP |
| ECC_GOVERNANCE_CAPTURE | OFF | everything-claude-code | KEEP (deliberate; reduces noise) |
| ECC_HOOK_PROFILE | `standard` | everything-claude-code | KEEP |
| ANTHROPIC_SMALL_FAST_MODEL | `claude-haiku-4-5-20251001` | CCBP | KEEP |
| ANTHROPIC_DEFAULT_HAIKU_MODEL | `claude-haiku-4-5-20251001` | CCBP | KEEP |
| CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS | YES | code.claude.com/agent-teams | KEEP |
| CLAUDE_CODE_ENABLE_AWAY_SUMMARY | YES | CCBP | KEEP |
| CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING | YES | CCBP | KEEP |
| CLAUDE_CODE_ATTRIBUTION_HEADER | `0` | CCBP | KEEP (no Anthropic attribution in commits) |
| CLAUDE_CODE_USE_POWERSHELL_TOOL | YES | code.claude.com/cli-reference | KEEP (Windows-native PS tool) |
| CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS | 300000 | CCBP | KEEP |
| ENABLE_PROMPT_CACHING_1H | YES | code.claude.com/prompt-caching | KEEP |
| ENABLE_TOOL_SEARCH | `auto:5` | code.claude.com/tool-search | KEEP |
| CLAUDE_CODE_ENABLE_TELEMETRY | YES | code.claude.com/monitoring-usage | KEEP — required gate |
| CLAUDE_CODE_ENHANCED_TELEMETRY_BETA | YES | undocumented beta flag | KEEP (additional spans) |
| OTEL_TRACES_EXPORTER | `otlp` | OpenTelemetry spec | KEEP |
| OTEL_EXPORTER_OTLP_TRACES_ENDPOINT | Langfuse local | Langfuse OTEL doc | KEEP |
| OTEL_EXPORTER_OTLP_TRACES_PROTOCOL | `http/protobuf` | OpenTelemetry spec | KEEP |
| OTEL_RESOURCE_ATTRIBUTES | `openinference.project.name=eee` | OpenInference convention | KEEP |
| OTEL_SEMCONV_STABILITY_OPT_IN | `gen_ai_latest_experimental` | OpenTelemetry GenAI semconv | KEEP |
| OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT | `false` | OpenTelemetry spec | KEEP (privacy default) |
| CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY | YES | CCBP | KEEP |
| MAX_MCP_OUTPUT_TOKENS | 50000 | CCBP | KEEP |
| BASH_MAX_OUTPUT_LENGTH | 100000 | CCBP | KEEP |
| BASH_MAX_TIMEOUT_MS | 1800000 | CCBP | KEEP |
| MCP_TOOL_TIMEOUT | 300000 | CCBP | KEEP |
| CLAUDE_CODE_EFFORT_LEVEL | `max` | CCBP | KEEP (note: settings.json:442 has `effortLevel:xhigh` — env wins; **pair is misleading** — operator-decision: drop one) |
| CLAUDE_CODE_DISABLE_AUTO_MEMORY | `1` | code.claude.com/memory | KEEP (deliberate per W259-v8 U3) |
| HINDSIGHT_API_LLM_PROVIDER | `openai` | hindsight repo | **STALE per CLAUDE.md** — T1 hindsight RETIRED W316-S6 (NSSM service down, no replacement). Action: **REMOVE 6 HINDSIGHT_* keys** in next housekeeping wave |
| HINDSIGHT_API_LLM_MODEL | `qwen36` | hindsight | STALE — see above |
| HINDSIGHT_API_LLM_BASE_URL | `http://127.0.0.1:8080/v1` | hindsight | STALE — see above |
| HINDSIGHT_API_LLM_API_KEY | `local` | hindsight | STALE — see above |
| HINDSIGHT_API_WORKER_MAX_SLOTS | `1` | hindsight | STALE — see above |
| HINDSIGHT_API_WORKER_CONSOLIDATION_MAX_SLOTS | `1` | hindsight | STALE — see above |
| MSYS_NO_PATHCONV | `1` | Git-for-Windows MSYS2 doc | KEEP |
| MSYS2_ARG_CONV_EXCL | `*` | MSYS2 | KEEP |
| MSYS2_ENV_CONV_EXCL | `*` | MSYS2 | KEEP |
| NODE_OPTIONS | `--max-old-space-size=4096` | Node | KEEP |
| HOME | `Z:\claude-sota-installed` | CCBP claude-settings:877-921 | KEEP (Z:-portable invariant) |
| USERPROFILE | `Z:\claude-sota-installed` | same | KEEP |
| CLAUDE_PLUGIN_DATA | mirror | W317 Stream C | KEEP |
| GATEGUARD_STATE_DIR | mirror | W317 Stream C | KEEP |
| AUDIT_ROOT | repo root | W317 Stream C | KEEP |
| CLAUDE_MEM_DATA_DIR | mirror | W317 Stream C | KEEP |
| ECC_SESSION_RECORDING_DIR | mirror | W317 Stream C | KEEP |
| BASH_ENV | bash-home-pin | W317 MSYS | KEEP |
| CLAUDE_BASH_NO_LOGIN | `true` | code.claude.com | KEEP |
| CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS | 60000 | CCBP | KEEP |

**Stale candidates** (6 keys for removal next housekeeping wave): `HINDSIGHT_API_*` × 6 (T1 retired per CLAUDE.md status block + W316-S6 codex-ratified daemon-down).
**Misleading pair**: `CLAUDE_CODE_EFFORT_LEVEL=max` (env) vs `effortLevel:xhigh` (settings.json:442) — env wins; operator decision: drop `effortLevel:xhigh` from settings OR change env to `xhigh`.
**Missing for full SOTA insights unleash**: 8 OTEL keys (OTEL_EXPORTER_OTLP_HEADERS + OTEL_METRICS_EXPORTER + OTEL_EXPORTER_OTLP_METRICS_ENDPOINT + OTEL_EXPORTER_OTLP_METRICS_PROTOCOL + OTEL_LOGS_EXPORTER + OTEL_EXPORTER_OTLP_LOGS_ENDPOINT + OTEL_EXPORTER_OTLP_LOGS_PROTOCOL + OTEL_LOG_TOOL_DETAILS + OTEL_LOG_USER_PROMPTS = 9 keys, plus Phase-2 OTEL_LOG_RAW_API_BODIES).

---

## §5 Multi-tier memory stack (T1-T6) live status

| Tier | Active | Cite | Gap |
|---|---|---|---|
| T1 hindsight | RETIRED | CLAUDE.md Runtime state + W316-S6 codex-ratification | NSSM service down; no replacement; 6 env keys stale (§4) |
| T2 memory MCP (plugin everything-claude-code:memory) | YES | settings.json plugin enabled | OK; `.mcp.json` disabled-block CR-9-exception |
| T3 cognee MCP | ACTIVE | NSSM `CogneeMCP` :8000/mcp; serverInfo `Cognee 1.26.0` | OK (port probe live this stream) |
| T4 graphiti | RETIRED | W272+W290+W295 AI-5; block excised W313 Stream A `5a350d1` | n/a — FalkorDB :16379 stopped-by-design; Ollama :16700 / Phoenix :16006 NOW RUNNING (W315-r2) |
| T5 langfuse | LIVE v3.170.0 (:3000) | CLAUDE.md status | OK (but auth-header missing → 0 native CC traces — see §3 P0) |
| T6 basic-memory | CANONICAL-PRIMARY | `.mcp.json` uvx --from basic-memory==0.21.1; W295 codex-r16+ smoke-gated | OK |

**Insights overlap**: tiers T3 (cognee), T5 (langfuse), T6 (basic-memory) are all running. Phoenix is the visualization layer for T5; ctx_insight is the visualization for the cross-tier event log.

---

## §6 Plugin Insights Surface (PostHog/Fullstory/equivalents)

Surveyed 22 marketplaces (per settings.json:295-428):

- `anthropics/claude-plugins-official` — no PostHog/Fullstory plugin; `cwc-makers` is the closest analytics-adjacent (disabled).
- `anthropics/skills` (anthropic-agent-skills + skills) — document-skills + example-skills; no insights tooling.
- `mksglu/context-mode` — provides ctx_insight (LIVE).
- `wshobson/agents` (claude-code-workflows) — provides `signed-audit-trails` (disabled), `incident-response`, `comprehensive-review`; no analytics dashboard.
- `alirezarezvani/claude-skills` (claude-code-skills) — `agent-orchestration`, `chaos-engineering`, `slo-architect`, `kubernetes-operator`; no insights dashboard.
- `fcakyon/claude-codex-settings` — `intelligent-compact` (disabled) — compact analytics only.
- `pydantic/skills` — `logfire@pydantic-skills` (LIVE) → routes via Pydantic Logfire (cloud); operator-decision whether to wire authorization.
- `thedotmack/claude-mem` — memory analytics (disabled per settings.json:262).
- `affaan-m/everything-claude-code` — multiple analytics-class hooks DISABLED via `ECC_DISABLED_HOOKS` env (continuous-learning + session-activity-tracker + evaluate-session + cost-tracker + desktop-notify).
- 13 other marketplaces: no insights-dashboard plugin.

**Conclusion**: no installed marketplace ships a PostHog/Fullstory-equivalent insights dashboard. The closest equivalents are: (a) ctx_insight via context-mode MCP (LIVE), (b) Phoenix UI via Docker (LIVE backend, OTel-receivers not enabled), (c) Langfuse UI (LIVE, auth-header missing). Operator-decision: enable `logfire` (Pydantic) wire-up for an additional cloud-side dashboard, OR fully unleash the existing local infra (Phoenix + Langfuse) by applying the 6 P0 actions in §3.

---

## §7 Operator-facing surface design (slash commands + skills + dashboards)

**Recommended additions** (P0):

1. **Auto-fire skill `insights-dashboard-launcher`**: trigger on session-start; calls `ctx_insight` once + writes URL to statusline. Vehicle: `.claude/skills/insights-dashboard-launcher/SKILL.md` (cardinal-rule-3-compliant operator-curated skill).
2. **Slash command `/insights`**: shim that surfaces `ctx_insight` + `ccusage daily` + Phoenix UI URL + Langfuse UI URL + `ctx_stats` in one place. Vehicle: `.claude/commands/insights.md`.
3. **Statusline widget**: extend ccstatusline config to show "traces-this-session" (count from Langfuse API once auth-header is wired). Vehicle: `.claude/ccstatusline/settings.json` widget block.

**Existing surfaces operator can reach today**:

- `mcp__plugin_context-mode_context-mode__ctx_insight` (dashboard launch)
- `mcp__plugin_context-mode_context-mode__ctx_stats` (text-mode summary)
- `mcp__ccusage__daily` / `monthly` / `session` / `blocks`
- `mcp__langfuse__get-prompt(s)` (read-side prompt catalog)
- `/cost` / `/context` / `/extra-usage` / `/doctor` / `/status` (CC-native)
- Phoenix UI at `http://127.0.0.1:16006`
- Langfuse UI at `http://127.0.0.1:3000`

---

## §8 Next-steps + 3-org-distinct cite trail

**Immediate (W330 operator-action)**:

1. Run `Z:\claude-sota-installed\tools\insights-wireup\wire-all.ps1 -EmitFiles` → emits paste snippets.
2. Paste `tmp/CLAUDE-LOCAL-MD-F5-SNIPPET.txt` into `CLAUDE.local.md` after `(f2)` block (Langfuse auth header).
3. Paste `tmp/SETTINGS-JSON-PRIVACY-PHASE1.txt` into `settings.json` `env` (Phase-1 privacy).
4. Enable Phoenix receivers: `docker restart phoenix` with `PHOENIX_ENABLE_METRICS_RECEIVER=true` + `PHOENIX_ENABLE_LOGS_RECEIVER=true` env.
5. Paste W327-B-4 §4 metrics+logs block (8 keys) into settings.json env.
6. Rotate Langfuse SEV-1 keys via admin UI; update `CLAUDE.local.md (f2)`.
7. Restart CC; verify trace flow + statusline counters.
8. Remove stale `HINDSIGHT_API_*` × 6 env keys (W259-v15 confirms T1 retired).
9. Resolve `effortLevel/CLAUDE_CODE_EFFORT_LEVEL` pair (drop one).
10. Author `/insights` shim slash command + `insights-dashboard-launcher` SKILL.md (P0 §7 above).

**Forward-AIs (P1/P2)**:

- W329-B-FA-1: enable PHOENIX_ENABLE_METRICS_RECEIVER + LOGS_RECEIVER (Docker container-recreate).
- W329-B-FA-2: investigate `ANTHROPIC_ADMIN_API_KEY` org-scope for Analytics API pull (`tools/cc-analytics-pull.sh` per W326-AI-5).
- W329-B-FA-3: deep-recurse 22 marketplaces for new insights plugins shipped 2026-Q2 (PostHog-class may emerge).
- W329-B-FA-4: wire Pydantic Logfire (auth-decision required) for cloud-side dashboard backup.
- W329-B-FA-5: drive `claude agents` background mode for codex-review dispatch + nightly eval to free interactive session.

**3-org-distinct cite trail** (used through-stream):

- Anthropic — `https://code.claude.com/docs/en/{settings,hooks,plugins,skills,sub-agents,mcp,memory,statusline,sandbox,headless,extended-thinking,output-styles,monitoring-usage,model-config,prompt-caching,tool-search,env-vars,teammates,agent-teams,cli-reference}` (~20 doc URLs cited inline).
- OpenTelemetry — `https://opentelemetry.io/docs/specs/otel/protocol/exporter/`.
- Langfuse — `https://langfuse.com/docs/integrations/opentelemetry/get-started`.
- Arize Phoenix — `https://github.com/Arize-ai/phoenix` + `https://arize-phoenix.readthedocs.io/en/latest/setup/configuration.html`.
- sirmalloc — `https://github.com/sirmalloc/ccstatusline`.
- CCBP — `claude-settings.md @ 48f2ceb` lines :600-720, :768-779, :826, :835-985.

STATUS: COMPLETE
