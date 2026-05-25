ARTIFACT-INLINE: Z:/claude-sota-installed/tmp/wave85-gap-audit-agentC-2026-05-08.md

## 1. Verdict

VERDICT: GAPS-EXIST.

Scope: adversarial audit of `tools/eee.ps1`, `.claude/settings.json`, `.cli-proxy-api/config.example.yaml` vs `.cli-proxy-api/config.yaml`, and `Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/` against live Claude Code docs fetched 2026-05-08:

- https://code.claude.com/docs/en/env-vars
- https://code.claude.com/docs/en/settings
- https://code.claude.com/docs/en/hooks

Repo SHAs used for local cites:

- `Z:/claude-sota-installed` HEAD `6550017bbec6a015321a05837d1d9ff2aefc3a30`
- `Z:/repos/deps/claude-agent-sdk-python` HEAD `b512f256450dba8f0dd1399e485563b7deb9c534`
- `Z:/repos/deps/CLIProxyAPI` HEAD `ed1458aa6d3430ba59538aeb980b8934f0e80c1f`

Excluded by instruction as already-deferred candidates:

- `1F Batch API`
- `1H circuit-breaker`
- `1E Docker`

Top missing SOTA features beyond those three:

1. `CLAUDE_CODE_EFFORT_LEVEL=xhigh` is missing from `eee.ps1`, so wrapper-level env precedence does not enforce the intended reasoning level.
2. Official `model`/`ANTHROPIC_MODEL` pin is missing; only small-fast Haiku is pinned.
3. Settings still contain undocumented stale permission-prompt keys while the documented `attribution` replacement for `includeCoAuthoredBy` is absent.
4. Hook coverage is behind the current official event surface: `UserPromptSubmit`, `Notification`, `PreCompact`, plus newer official events such as `Setup`, `InstructionsLoaded`, `PostToolUseFailure`, `PostToolBatch`, `PermissionDenied`, `ConfigChange`, `TeammateIdle`, `TaskCreated`, `TaskCompleted`, `WorktreeCreate`, `WorktreeRemove`, `CwdChanged`, and `FileChanged` are not represented.
5. CLIProxyAPI config leaves schema/payload rewrite, Claude header fingerprint stabilization, and experimental Claude Code signing unused.
6. SDK structured-output/session-store/file-checkpoint primitives exist but are not wired into the eee runtime.
7. `agent_transcript_path` is used only for telemetry, not for evaluation, replay, summarization, or subagent scorecards.

## 2. Axis 1 - Env Vars In `eee.ps1` Vs Official Docs

### A1-F1 - Missing wrapper-level `CLAUDE_CODE_EFFORT_LEVEL`

Official docs: `CLAUDE_CODE_EFFORT_LEVEL` accepts `low`, `medium`, `high`, `xhigh`, `max`, or `auto`, and takes precedence over `/effort` and the `effortLevel` setting.

Current state:

- `.claude/settings.json:333` sets `"effortLevel": "xhigh"` at repo HEAD `6550017bbec6a015321a05837d1d9ff2aefc3a30`.
- `tools/eee.ps1` has no `$env:CLAUDE_CODE_EFFORT_LEVEL`; env setters around thinking/perf are at `tools/eee.ps1:70`, `:85`, `:89`, `:93`, `:97`, `:101` at the same HEAD.

Why it matters: official precedence means env is the stronger launch invariant. If a user/global/local setting or `/effort` drift occurs, eee does not reassert xhigh.

Prescription: set `$env:CLAUDE_CODE_EFFORT_LEVEL = 'xhigh'` in `eee.ps1`, or explicitly choose `'max'` only if the model/channel supports it and latency/cost impact is acceptable.

### A1-F2 - Missing default model pin

Official settings docs document `model`; official env docs document model selection env vars such as `ANTHROPIC_MODEL` and `ANTHROPIC_SMALL_FAST_MODEL`.

Current state:

- `.claude/settings.json` has no top-level `"model"` key near the advanced block at `.claude/settings.json:332-347` at HEAD `6550017bbec6a015321a05837d1d9ff2aefc3a30`.
- `tools/eee.ps1` does not set `$env:ANTHROPIC_MODEL`; it only sets proxy routing at `tools/eee.ps1:157-158`.
- `.claude/settings.json` pins small/Haiku env only at `.claude/settings.json:27-30`.

Why it matters: the runtime pins the cheap classifier model but leaves the primary model to CLI defaults, account defaults, proxy alias behavior, or `/model` residue. That is not a SOTA default posture for an explicitly controlled harness.

Prescription: add either top-level `"model": "<chosen official model alias/id>"` or `$env:ANTHROPIC_MODEL = "<chosen official model alias/id>"`. Prefer a documented stable alias if the goal is current best model without date churn; prefer a dated model id if reproducibility matters.

### A1-F3 - Missing gateway model discovery while using a gateway/proxy

Official env docs: `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` populates `/model` from a gateway `/v1/models` endpoint when `ANTHROPIC_BASE_URL` points at an Anthropic-compatible gateway.

Current state:

- `tools/eee.ps1:157` sets `$env:ANTHROPIC_BASE_URL = $EEE_PROXY_BASE` at HEAD `6550017bbec6a015321a05837d1d9ff2aefc3a30`.
- `tools/eee.ps1` does not set `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY`.

Why it matters: eee routes through CLIProxyAPI but does not expose live gateway model discovery in Claude Code. This can hide available proxy models/aliases from `/model` and makes routing less inspectable.

Prescription: set `$env:CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY = '1'`, paired with `availableModels` if you need an allowlist.

### A1-F4 - Missing background-agent controls

Official env docs:

- `CLAUDE_AUTO_BACKGROUND_TASKS=1` force-enables automatic backgrounding of long-running agent tasks.
- `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS` controls background subagent stall timeout.
- `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` can disable all backgrounding, but is not set here.

Current state:

- `tools/eee.ps1` has fleet sizing at `tools/eee.ps1:71-76` but no official background-task envs.
- `settings.json:7` sets `CLAUDE_CODE_FORK_SUBAGENT=1`, but that is not the same as backgrounding/stall-timeout policy.

Why it matters: fleet orchestration variables exist, but the official background-agent runtime controls are not asserted. This leaves long-running subagents dependent on defaults.

Prescription: add `$env:CLAUDE_AUTO_BACKGROUND_TASKS = '1'` and tune `$env:CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS` if the harness expects long background research/build tasks.

### A1-F5 - Missing working-directory invariant for Bash/PowerShell tools

Official env docs: `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` returns to the original working directory after each Bash or PowerShell command in the main session.

Current state:

- `settings.json:323` sets `"defaultShell": "powershell"` and `settings.json:40` sets `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`.
- `tools/eee.ps1:56` also sets `$env:CLAUDE_CODE_USE_POWERSHELL_TOOL = '1'`.
- No `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` in `tools/eee.ps1`.

Why it matters: with PowerShell enabled and a long-running agent harness, accidental `cd` persistence across tool calls is a real reproducibility footgun.

Prescription: set `$env:CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR = '1'` unless the harness intentionally relies on persistent shell cwd mutation.

### A1-F6 - Missing additional-directory memory loading env

Official env docs: `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` loads memory files from directories specified with `--add-dir`; by default additional dirs do not load memory files.

Current state:

- No `additionalDirectories` in `.claude/settings.json`.
- No `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD` in `tools/eee.ps1`.

Why it matters: if eee expects extra repos or dependency checkouts to contribute `CLAUDE.md`/rules memory, the current config does not enable that path.

Prescription: only if extra directories are adopted, add top-level `additionalDirectories` and `$env:CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD = '1'`.

### A1-F7 - Missing auto-compact token-window tuning for 1M context

Official env docs: `CLAUDE_CODE_AUTO_COMPACT_WINDOW` sets the token capacity used for auto-compaction calculations, capped by model context. It composes with `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`.

Current state:

- `tools/eee.ps1:85` sets `$env:CLAUDE_AUTOCOMPACT_PCT_OVERRIDE = '85'`.
- `settings.json:45` sets `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70`, creating wrapper/settings drift.
- Neither file sets `CLAUDE_CODE_AUTO_COMPACT_WINDOW`.

Why it matters: if eee uses 1M-context models, compaction is percentage-only and tied to the full model window. There is no explicit smaller effective working window for sharper compaction behavior.

Prescription: choose one source of truth for `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`, then add `CLAUDE_CODE_AUTO_COMPACT_WINDOW` only if the operator wants 1M models treated as a smaller working context.

## 3. Axis 2 - Settings Keys Vs Official Docs

### A2-F1 - Missing `model`

Official settings docs include top-level `model`; current `.claude/settings.json` does not.

Local cites:

- `.claude/settings.json:332-347` contains advanced keys but no `model` at HEAD `6550017bbec6a015321a05837d1d9ff2aefc3a30`.
- `.claude/settings.json:332` has `alwaysThinkingEnabled`.
- `.claude/settings.json:333` has `effortLevel`.

Prescription: add top-level `"model": "<chosen default>"`, unless deliberate model drift is required for testing.

### A2-F2 - Missing `additionalDirectories`

Official settings docs include additional-directory support; official env docs separately require `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` if those dirs should load memory files.

Current `.claude/settings.json` has no `additionalDirectories`.

Prescription: add `additionalDirectories` only for explicitly trusted local repos/deps, and pair it with the env flag above if their memory files should load.

### A2-F3 - Deprecated `includeCoAuthoredBy` replacement not adopted

Official settings docs say `includeCoAuthoredBy` is deprecated and `attribution` takes precedence. To hide all attribution, set `attribution.commit` and `attribution.pr` to empty strings.

Current state:

- No top-level `includeCoAuthoredBy`.
- No top-level `attribution`.
- `.claude/settings.json:36` sets `CLAUDE_CODE_ATTRIBUTION_HEADER=0`, but that only controls prompt attribution header behavior, not git commit/PR attribution.

Why it matters: the config suppresses a prompt-cache-related attribution header but does not use the official git/PR attribution control. Commit/PR bylines can still appear depending on CLI defaults.

Prescription: add:

```json
"attribution": {
  "commit": "",
  "pr": ""
}
```

### A2-F4 - Stale undocumented permission-prompt keys remain

Current state:

- `.claude/settings.json:338` still has `"skipAutoPermissionPrompt": true` despite adjacent comments saying it was removed.
- `.claude/settings.json:347` has `"skipDangerousModePermissionPrompt": true`.
- Official settings docs did not surface `skipAutoPermissionPrompt` in the available-settings roster fetched 2026-05-08.
- The documented permission mode is under `.claude/settings.json:62` as `"defaultMode": "bypassPermissions"`.

Why it matters: stale or ignored keys give a false sense of control and make audits noisy. The comments already acknowledge this for `skipAutoPermissionPrompt`, but the key remains.

Prescription: delete stale prompt-skip keys unless a current official doc line or schema validation proves they are still active.

### A2-F5 - `alwaysThinkingEnabled` and `effortLevel` are present but not fully enforced

Current state:

- `.claude/settings.json:332` has `"alwaysThinkingEnabled": true`.
- `.claude/settings.json:333` has `"effortLevel": "xhigh"`.

Gap: this is a partial pass. Official env docs say `CLAUDE_CODE_EFFORT_LEVEL` overrides the setting; eee does not set it.

Prescription: keep both settings, add env-level `CLAUDE_CODE_EFFORT_LEVEL`, and document precedence.

## 4. Axis 3 - CLIProxyAPI Config Example Vs Runtime Config

### A3-F1 - Payload/schema rewrite primitives are unused

Example schema:

- `.cli-proxy-api/config.example.yaml:375` starts the `payload:` block at CLIProxyAPI HEAD `ed1458aa6d3430ba59538aeb980b8934f0e80c1f`.
- `.cli-proxy-api/config.example.yaml:382` documents `default-raw`.
- `.cli-proxy-api/config.example.yaml:388` documents `override`.
- `.cli-proxy-api/config.example.yaml:394` documents `override-raw`.
- `.cli-proxy-api/config.example.yaml:387` shows `generationConfig.responseJsonSchema`.

Runtime config:

- `.cli-proxy-api/config.yaml:30` enables `commercial-mode`.
- `.cli-proxy-api/config.yaml:56-59` enables streaming keepalive/bootstrap/nonstream keepalive.
- `.cli-proxy-api/config.yaml:70-72` enables fill-first session affinity.
- No `payload:` block exists in `.cli-proxy-api/config.yaml`.

Why it matters: payload rules are the proxy’s native place to apply model/protocol-specific defaults, structured schema injection, reasoning defaults, and provider quirks without changing Claude Code itself.

Prescription: add a minimal `payload.default`/`payload.override` block only where the proxy fronts non-Claude protocols or aliases that need explicit reasoning/schema behavior.

### A3-F2 - Claude header fingerprint stabilization is unused

Example schema:

- `.cli-proxy-api/config.example.yaml:222-229` documents `claude-header-defaults` and `stabilize-device-profile` at CLIProxyAPI HEAD `ed1458aa6d3430ba59538aeb980b8934f0e80c1f`.

Runtime config:

- `.cli-proxy-api/config.yaml` has no `claude-header-defaults`.

Why it matters: when routing multiple accounts through a proxy, stable device/profile headers can reduce needless fingerprint churn. This may be intentionally omitted for official-client fidelity, but it is a real available primitive.

Prescription: Tier-B, not automatic. Decide whether stable per-auth fingerprint pinning is desirable; if yes, configure `claude-header-defaults.stabilize-device-profile: true`.

### A3-F3 - Experimental Claude Code signing is explicitly absent

Example schema:

- `.cli-proxy-api/config.example.yaml:213` documents `experimental-cch-signing: false`.

Runtime config:

- `.cli-proxy-api/config.yaml` has no `claude-api-key` entries and no `experimental-cch-signing`.

Why it matters: the config comment says this should remain disabled unless explicitly needed. This is an available SOTA primitive, but high risk because upstream signing algorithms can change.

Prescription: keep as Tier-C unless a concrete non-Claude-Code client cloaking/signing use case appears.

### A3-F4 - Image-generation policy left at example default by omission

Example schema:

- `.cli-proxy-api/config.example.yaml:97-100` documents `disable-image-generation: false|true|"chat"`.

Runtime config:

- `.cli-proxy-api/config.yaml` has no `disable-image-generation`.

Why it matters: if the proxy should prevent accidental image_generation injection on chat routes while keeping image endpoints alive, `"chat"` is available. This is mostly cost/surface control.

Prescription: Tier-C; set `disable-image-generation: "chat"` only if chat payload pollution or image costs are observed.

## 5. Axis 4 - SDK Primitives

### A4-F1 - Structured output exists but is not wired into eee audits/evals

SDK cites at `b512f256450dba8f0dd1399e485563b7deb9c534`:

- `types.py:1737-1743` defines `output_format` for structured responses matching a JSON schema.
- `_internal/transport/subprocess_cli.py:371-380` converts `output_format.type == "json_schema"` into `--json-schema`.
- `types.py:1091` exposes `structured_output` on results.

Gap: eee has many review/audit hooks, but the harness does not appear to standardize structured outputs for Codex/Claude review artifacts. This keeps verdict parsing text-fragile.

Prescription: Tier-A for machine-gated audits. Define JSON schemas for review verdicts, gap audits, and hook scorecards, then route SDK calls through `output_format`.

### A4-F2 - SessionStore transcript mirroring exists but is not used as durable harness memory

SDK cites:

- `types.py:1753-1758` defines `session_store` to mirror transcript lines externally and resume when local files are absent.
- `types.py:1761-1767` defines `load_timeout_ms` for store materialization.

Gap: eee redirects project state to `Z:/claude-sota-installed-state/.claude/projects` at `tools/eee.ps1:125`, but there is no SDK `SessionStore` adapter wiring for durable query/replay outside local JSONL.

Prescription: Tier-B. Implement a small file/sqlite SessionStore adapter if cross-session evaluation, search, or migration is a first-class goal.

### A4-F3 - File checkpointing primitive exists but no harness usage found

SDK cite:

- `types.py:1745-1750` defines `enable_file_checkpointing` and `rewind_files()` behavior.

Gap: eee has heavy permission bypass and many hooks; no SDK-level checkpoint/rewind integration appears in the audited files.

Prescription: Tier-B for destructive edit workflows; use SDK checkpointing around automated worker runs rather than relying only on git state.

### A4-F4 - `agent_transcript_path` is harvested, but underused

SDK cite:

- `types.py:309-316` defines `SubagentStopHookInput.agent_transcript_path`.

Current state:

- `.claude/settings.json:218-229` registers only an async telemetry hook for `SubagentStop`.

Gap: telemetry is a good first step, but SOTA use would parse subagent transcripts into scorecards, failure modes, cache-warm summaries, or eval corpora.

Prescription: Tier-A. Extend `subagent_stop_telemetry.py` or a downstream consumer to parse `agent_transcript_path` into structured metrics: task type, tool counts, failure reason, token/cost if present, files touched, and reusable summary.

### A4-F5 - 1h prompt cache env is present, but SDK/package lacks explicit cache-breakpoint API

Current state:

- `tools/eee.ps1:70` and `.claude/settings.json:43` set `ENABLE_PROMPT_CACHING_1H=1`.
- Search of `claude_agent_sdk` found no explicit `cache_control`, `PromptCaching`, or `ttl` cache-breakpoint API surface.

Interpretation: 1h TTL is enabled at Claude Code env level, but SDK-side prompt-cache breakpoint control is not exposed in the audited Python SDK package. For cache layout, eee must rely on Claude Code/proxy behavior rather than Python SDK cache annotations.

Prescription: Honest non-finding for SDK cache API; do not invent Python SDK cache controls unless upstream adds them. Keep proxy cache-breakpoint logic in CLIProxyAPI if already implemented.

## 6. Prescription Tier-A/B/C

### Tier-A - High Confidence, Low/Medium Risk

1. Add `$env:CLAUDE_CODE_EFFORT_LEVEL = 'xhigh'` to `tools/eee.ps1`.
2. Add a documented primary model pin via top-level `"model"` or `$env:ANTHROPIC_MODEL`.
3. Add `$env:CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY = '1'` because eee sets `ANTHROPIC_BASE_URL` to CLIProxyAPI.
4. Remove stale `skipAutoPermissionPrompt` and `skipDangerousModePermissionPrompt` unless a current official source validates them.
5. Add official `attribution` with empty `commit`/`pr` if the goal is no Claude git/PR byline.
6. Add `UserPromptSubmit` hook for prompt-level context injection, routing tags, and prompt policy before model processing.
7. Add `PreCompact` hook for transcript summary capture before compaction.
8. Upgrade `SubagentStop` telemetry into structured transcript scorecards using `agent_transcript_path`.
9. Use SDK structured output (`output_format` / `--json-schema`) for machine-gated audit/review verdicts.

### Tier-B - Valuable, Needs Design Choice

1. Add `CLAUDE_AUTO_BACKGROUND_TASKS=1` and tune `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS`.
2. Add `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR=1`.
3. Add `additionalDirectories` plus `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` for trusted dependency/workspace roots.
4. Normalize compaction: resolve `85` in `eee.ps1` vs `70` in settings, then optionally set `CLAUDE_CODE_AUTO_COMPACT_WINDOW`.
5. Add `Notification` hook if desktop/CI/ops events should be captured.
6. Add `SessionStore` transcript mirroring for durable evaluation and replay.
7. Enable SDK file checkpointing around automated worker sessions.
8. Consider CLIProxyAPI `claude-header-defaults.stabilize-device-profile` after deciding whether official-client fidelity or stable proxy fingerprinting is preferred.
9. Add CLIProxyAPI `payload` rules for provider-specific reasoning/schema defaults.

### Tier-C - High Risk, Niche, Or Wait

1. `experimental-cch-signing` in CLIProxyAPI: leave disabled until a concrete client compatibility need exists.
2. `disable-image-generation: "chat"`: useful only if chat-route image-generation injection or image costs become a problem.
3. Newer hook events beyond the user-provided list (`Setup`, `InstructionsLoaded`, `UserPromptExpansion`, `PermissionRequest`, `PostToolUseFailure`, `PostToolBatch`, `PermissionDenied`, `ConfigChange`, `TeammateIdle`, `TaskCreated`, `TaskCompleted`, `WorktreeCreate`, `WorktreeRemove`, `CwdChanged`, `FileChanged`): adopt selectively, not as hook-spawn noise.
4. `CLAUDE_CODE_DEBUG_LOG_LEVEL=verbose`: only during investigations; too noisy for default runtime.
5. `CLAUDE_CODE_EXTRA_BODY`: powerful for provider-specific params, but risky as a global request-body mutation.

## 7. Honest Non-Finding

1. `alwaysThinkingEnabled` is not missing. It is present at `.claude/settings.json:332` at HEAD `6550017bbec6a015321a05837d1d9ff2aefc3a30`.
2. `effortLevel` is not missing. It is present at `.claude/settings.json:333`; the gap is lack of env-precedence enforcement via `CLAUDE_CODE_EFFORT_LEVEL`.
3. `includeCoAuthoredBy` is not a recommended missing key. Official settings docs mark it deprecated in favor of `attribution`; the missing feature is `attribution`, not `includeCoAuthoredBy`.
4. `additionalDirectories` should not be blindly added. It is only a gap if eee intends to load trusted external workspace roots.
5. `SessionInit` was in the user-provided comparison list, but the current official hooks page fetched 2026-05-08 did not show `SessionInit` in the hook event roster. The closest official lifecycle events found were `SessionStart`, `Setup`, `InstructionsLoaded`, and `SessionEnd`.
6. 1h prompt caching is not missing at the env layer: `ENABLE_PROMPT_CACHING_1H` is set in `tools/eee.ps1:70` and `.claude/settings.json:43`. The non-finding is that the audited Python SDK package does not expose an explicit prompt cache breakpoint API by those searched names.
7. CLIProxyAPI core fleet features are not missing: runtime config already has `commercial-mode` at `.cli-proxy-api/config.yaml:30`, refresh workers at `:41`, retry tuning at `:44-46`, streaming at `:56-59`, and fill-first session affinity at `:70-72`.
8. The three excluded deferred candidates remain excluded here: Batch API, circuit-breaker, and Docker are not counted as new gaps in this audit.
