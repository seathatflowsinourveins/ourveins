# Saturation Research: Cross-Model Orchestration Primitives

Date: 2026-05-16

Scope: Codex CLI, Codex-in-Claude bridges, cross-model LLM gateways, multi-account orchestration, Path P foreground+tee discipline, and sub-model routing. This document distinguishes confirmed first-party evidence from community workarounds and unverified claims. Evidence anchors are inline as repo names, docs URLs, package names, or local dependency pins.

## Research-Area Coverage Check

| Area | Minimum-depth status | Evidence posture |
|---|---:|---|
| 1. Codex CLI exhaustive | PASS | [CONFIRMED + OpenAI docs, local `codex --help`, `codex exec --help`, `codex cloud --help`, `github.com/openai/codex`, `@openai/codex`] |
| 2. Cross-model proxies and gateways | PASS | [CONFIRMED + Anthropic Claude Code gateway docs, LiteLLM docs, Portkey docs/npm, OpenRouter docs, vLLM Semantic Router repo/blog, Dust docs/repo, PyPI/npm probes] |
| 3. Multi-account orchestration | PASS | [CONFIRMED + CCS docs, CLIProxyAPI config, CCProxy repo, Anthropic/OpenAI policy docs; several community patterns remain [UNVERIFIED]] |
| 4. Path P discipline | PASS | [CONFIRMED + local repo runbooks/provenance, Codex CLI help, codex-plugin-cc README; Path P itself is local doctrine, not upstream OpenAI feature naming] |
| 5. Sub-model routing matrix | PASS | [CONFIRMED + OpenAI Codex model docs, Codex subagent docs, Anthropic model-family naming from task scope; Claude 4.x tradeoffs need live Anthropic model-card verification before using for policy-critical routing] |

## §A — Codex + Cross-Model Proxy Matrix

### Summary Matrix

Native-CC-pathway score means: 5 = official or near-native Claude Code pathway with documented `ANTHROPIC_*`/plugin route; 4 = works through documented gateway/provider shape but needs careful config; 3 = real project with plausible bridge but not canonical; 2 = package/library only, no native Claude Code pathway; 1 = weak/no current evidence; 0 = no credible artifact found.

| Primitive | Status | Native-CC score | Evidence anchor | Finding |
|---|---:|---:|---|---|
| OpenAI Codex CLI v0.130.0 | CONFIRMED | 4 | local `codex-cli 0.130.0`; OpenAI CLI reference `https://developers.openai.com/codex/cli/reference`; `github.com/openai/codex`; npm `@openai/codex` | Full CLI, app-server, cloud, MCP server, plugins, sandbox, review, exec. Native to Codex, not Claude Code, but bridgeable through plugin/app-server. |
| `codex exec` foreground+tee | CONFIRMED | 4 | local `codex exec --help`; OpenAI CLI reference; local Path P provenance | Stable non-interactive Codex run mode. Supports stdin prompt, `--model`, `--profile`, `--sandbox`, `--ephemeral`, `--color`, `--json`, `--output-last-message`. No native `--background` flag in `codex exec`; backgrounding is shell/plugin orchestration. |
| `codex cloud` | CONFIRMED | 2 | local `codex cloud --help`; OpenAI CLI reference | Experimental task browser/submit/list/apply/diff/status surface. CLI can submit/list/apply cloud tasks, but OpenAI docs state cloud task model selection is not user-changeable. |
| Codex app-server | CONFIRMED | 4 | local `codex app-server --help`; OpenAI CLI reference; codex-plugin-cc README | Experimental JSONL/WebSocket server used by tools such as codex-plugin-cc. This is the strongest official programmatic bridge inside local tooling. |
| `openai/codex-plugin-cc` | CONFIRMED | 5 | local `Z:/repos/deps/codex-plugin-cc @ 807e03ac9d5aa23bc395fdec8c3767500a86b3cf`; README; package name `@openai/codex-plugin-cc` | Official plugin for Claude Code: `/codex:review`, `/codex:adversarial-review`, `/codex:rescue`, `/codex:status`, `/codex:result`, `/codex:cancel`, `/codex:setup`; uses Codex app-server and local `codex` binary. |
| `claude_codex_bridge` | CONFIRMED artifact | 3 | `github.com/bfly123/claude_codex_bridge`, PyPI `claude-codex-bridge` | Real community project claiming Claude/Codex/Gemini collaboration with persistent context. Not first-party; needs security and maintenance probe before operational use. |
| `codex-toolkit-for-claude` | UNVERIFIED | 1 | search did not find a canonical primary repo with that exact name | Treat as name-level claim unless a repo URL is supplied. |
| `claudex` | CONFIRMED artifact | 3 | `https://claudex.space/`, search result references `github.com/Mng-dev-ai/claudex` | Multi-instance Claude Code manager / provider router surfaced by project site. Real enough to track, but not canonical OpenAI/Anthropic. |
| `codex-cc-plugin` | NEEDS-PROBE | 1 | exact-name search confuses with `openai/codex-plugin-cc` | Could be shorthand for official plugin or unrelated vaporware. Do not cite as separate primitive without URL. |
| `opencode-plugin-cc` | UNVERIFIED | 1 | exact-name search did not produce primary repo | No confirmed canonical artifact found in this pass. |
| `gemini-plugin-cc` | CONFIRMED community artifact | 3 | Reddit primary link to `github.com/abiswas97/gemini-plugin-cc` [NEEDS-PROBE primary repo read] | Reported community analogue to codex-plugin-cc. Needs repo-level read before install. |
| LiteLLM Proxy | CONFIRMED | 4 | `github.com/BerriAI/litellm`; `https://docs.litellm.ai/`; Anthropic Claude Code LLM gateway docs | Mature multi-provider gateway. Claude Code docs explicitly document LiteLLM unified endpoint via `ANTHROPIC_BASE_URL=https://litellm-server:4000`, plus Bedrock/Vertex pass-through alternatives. |
| Portkey Gateway | CONFIRMED | 5 | `https://portkey.ai/docs/integrations/libraries/claude-code`; npm `@portkey-ai/gateway` v1.11.3; `github.com/Portkey-AI/gateway` | Strongest commercial/self-hosted Claude Code gateway path. Docs give `ANTHROPIC_BASE_URL=https://api.portkey.ai`, `ANTHROPIC_AUTH_TOKEN`, and `ANTHROPIC_CUSTOM_HEADERS`; supports virtual keys, fallback, load balancing, budgets, rate limits. |
| OpenRouter | CONFIRMED | 3 | `https://openrouter.ai/docs/guides/overview/models`; `https://openrouter.ai/docs/api/api-reference/models/get-models`; PyPI `openrouter` 0.0.22; [UNVERIFIED] `openrouter-py` not found by pip index | Strong model marketplace/OpenAI-compatible API. Native Claude Code path is indirect through compatible proxy/router, not official Claude Code docs. |
| vLLM Semantic Router v0.2 Athena | CONFIRMED | 2 | `github.com/vllm-project/semantic-router`; vLLM blog `2026-03-10-v0.2-vllm-sr-athena-release` | System-level semantic router for mixture-of-models: model selection, safety, semantic caching, memory/RAG, prompt compression, dashboard. Not a Claude Code gateway by itself. |
| Dust (`dust-tt/dust`) | CONFIRMED | 2 | `github.com/dust-tt/dust`; `https://docs.dust.tt/docs`; Dust developer/API docs | Enterprise AI agent platform with data-source integrations and model selection. No native Claude Code gateway found; useful as orchestration context, not CC drop-in. |
| AxonHub | CONFIRMED artifact | 3 | `github.com/looplj/axonhub` | Open-source AI gateway claiming any-SDK access to 100+ LLMs with failover/load balancing/cost tracing. Needs current install/readme probe before production. |
| Axflow | NEEDS-PROBE | 1 | search ambiguous | No current primary source confirmed in this pass. |
| simpleaichat | CONFIRMED package | 1 | PyPI `simpleaichat` | Lightweight chat library, OpenAI-oriented; not a cross-model gateway or Claude Code integration. |
| aisuite | CONFIRMED package | 2 | PyPI `aisuite` 0.1.14 | Lightweight unified Python API for OpenAI/Anthropic/Google/etc. Useful library-level abstraction, not proxy/gateway and not native CC. |

### Codex CLI Findings

[CONFIRMED + local help + OpenAI docs] The installed Codex is `codex-cli 0.130.0`. The top-level CLI commands include `exec`, `review`, `login`, `logout`, `mcp`, `plugin`, `mcp-server`, `app-server`, `remote-control`, `app`, `completion`, `update`, `sandbox`, `debug`, `apply`, `resume`, `fork`, `cloud`, `exec-server`, and `features`. Global model selection is `-m, --model <MODEL>`, with `-p, --profile <CONFIG_PROFILE>` for config profiles and `-c, --config key=value` for direct TOML-style overrides. The relevant sandbox flags are `--sandbox read-only|workspace-write|danger-full-access`, `--ask-for-approval untrusted|on-request|never`, and `--dangerously-bypass-approvals-and-sandbox`. The official CLI reference also documents `--search` for live web search, `--oss`, `--local-provider`, `--cd`, `--add-dir`, image attachments, feature toggles, and remote app-server connection flags.

[CONFIRMED + local `codex exec --help`] `codex exec` is the stable non-interactive primitive. It reads a prompt from argv or stdin when `-` is used. It supports `--model`, `--profile`, `--sandbox`, `--ephemeral`, `--ignore-user-config`, `--ignore-rules`, `--output-schema`, `--color always|never|auto`, `--json`, `--output-last-message`, `--skip-git-repo-check`, `--oss`, and local provider options. There is no confirmed `codex exec --background` flag in v0.130.0 help. Background behavior appears in two other forms: shell-level background/tee orchestration, and codex-plugin-cc background jobs delegated through Claude Code `Bash(..., run_in_background: true)` plus Codex app-server state. Therefore any document that says “`codex exec --background`” should be corrected to “run the shell process in background” or “use codex-plugin-cc `/codex:* --background`”.

[CONFIRMED + local `codex cloud --help` + OpenAI docs] Codex Cloud is an experimental CLI surface with `exec`, `status`, `list`, `apply`, and `diff`. `codex cloud exec` submits a task and requires an environment id (`--env`) per the official CLI reference. `--attempts 1-4` is documented for cloud exec. Local `codex cloud --help` confirms the high-level subcommands. OpenAI Codex model docs state cloud task model selection cannot currently be changed, and Codex pricing/model docs say cloud tasks and code review run on GPT-5.3-Codex. Capability implication: Cloud is available from CLI for task lifecycle management, but not as a general model-router surface.

[CONFIRMED + OpenAI Codex models docs] Codex “Web” should be separated from Codex Cloud and local Codex CLI/app. The sources available here confirm local CLI/app/IDE, app-server, and Cloud tasks. “Codex Web” as a separate browser UI is not exposed as a general local CLI API in the confirmed docs. The CLI can `codex app` to launch desktop, `codex cloud` for cloud tasks, and `codex app-server` for local protocol work. Any claim that a browser/Web Codex surface has a public automation API accessible from CLI is [UNVERIFIED].

### Codex-Plugin-CC Findings

[CONFIRMED + `Z:/repos/deps/codex-plugin-cc` README] The official install path in the plugin README is:

```bash
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
```

The plugin depends on a local Codex binary and can offer to install Codex with `npm install -g @openai/codex`; authentication remains Codex authentication via `codex login`. The plugin adds slash commands for normal review, adversarial review, rescue delegation, status/result/cancel, and setup. The README states it wraps Codex app-server and uses the global `codex` binary plus Codex config. It exposes a `codex:codex-rescue` subagent inside Claude Code. It also has an optional Stop hook review gate: `/codex:setup --enable-review-gate` and `--disable-review-gate`. Because it is an OpenAI-maintained Claude Code plugin with documented install path and app-server bridge, its native-CC-pathway score is 5/5.

The native CC pathway score is not a quality score for model output; it measures how directly the primitive integrates into Claude Code. `codex-plugin-cc` scores highest because it uses Claude Code plugin distribution and slash commands. LiteLLM and Portkey can be strong production gateways, but their route is environment/config based, not native Claude Code plugin UX. Raw libraries such as `aisuite` and `simpleaichat` score low because they do not create a Claude Code pathway by themselves.

### Gateway Findings

[CONFIRMED + Anthropic Claude Code LLM gateway docs] Claude Code supports LLM gateways when the gateway preserves API format, body fields, and required headers. Anthropic’s docs explicitly list gateway benefits: centralized auth, usage tracking, cost controls, audit logging, and model routing. The LiteLLM example uses `ANTHROPIC_BASE_URL=https://litellm-server:4000` for the unified endpoint. Anthropic’s docs call the unified endpoint recommended because it enables load balancing, fallbacks, and consistent cost/end-user tracking. Provider-specific pass-through examples also exist for Anthropic, Bedrock, Vertex, and Claude Platform on AWS.

[CONFIRMED + LiteLLM docs] LiteLLM is a proxy server/LLM gateway and Python SDK. Its docs describe multi-provider access through OpenAI-format input/output, translation to provider endpoints (`/chat/completions`, `/responses`, `/embeddings`, etc.), retry/fallback router logic, spend tracking, budgets, virtual keys, auth hooks, logging hooks, cost tracking, and rate limiting. A canonical proxy config uses `model_list` entries mapping client-visible model names to provider deployment details, plus `litellm_settings` such as `master_key` and `database_url`. A typical client points an OpenAI SDK at `base_url="http://0.0.0.0:4000"` with any API key accepted by the proxy policy. For Claude Code, however, the critical distinction is that Claude Code speaks Anthropic-style messages, so the Claude Code path should use LiteLLM’s Anthropic-format endpoint as documented by Anthropic, not assume every OpenAI-compatible endpoint is enough.

[CONFIRMED + Portkey docs/npm] Portkey has a direct Claude Code integration page. It routes `Claude Code -> Portkey Gateway -> Anthropic / Bedrock / Vertex AI`, with `ANTHROPIC_BASE_URL=https://api.portkey.ai`, `ANTHROPIC_AUTH_TOKEN`, and `ANTHROPIC_CUSTOM_HEADERS` carrying Portkey API key/provider metadata. Portkey docs advertise universal API, MCP support, simple/semantic cache, fallbacks, conditional routing, retries, load balancing, canary testing, virtual keys, request timeouts, budgets, and rate limits. Portkey fallback docs confirm fallback can trigger on non-2xx by default or specific status codes such as 429/503, and that fallback targets can compose with load balancers and conditional routers. npm shows `@portkey-ai/gateway` v1.11.3, MIT, `github.com/Portkey-AI/gateway`, published recently. Important caveat from Portkey’s Claude Code page: `codex-5.3` models are currently not supported there because Codex models require a Responses endpoint adapter that Portkey says is coming soon.

[CONFIRMED + OpenRouter docs] OpenRouter exposes a models API at `https://openrouter.ai/api/v1/models`, with query filters such as `output_modalities` and `supported_parameters`. The docs describe one API for 300+ models/providers, standardized model metadata, supported OpenAI-compatible parameters, context length, pricing, and top provider metadata. The primary integration shape is OpenAI-compatible, not Claude Code-native. A pip probe for `openrouter-py` returned no matching distribution; PyPI has a package named `openrouter` 0.0.22. npm search found `@letuscode/openrouter-cli` via Libraries.io but no confirmed first-party `openrouter-cli` package in this pass. Therefore use “OpenRouter API / model list confirmed; exact `openrouter-py` and `openrouter-cli` names [UNVERIFIED] unless pinned to package URLs.”

[CONFIRMED + vLLM Semantic Router repo/blog] `vllm-project/semantic-router` is real and current. Its v0.2 Athena release claims model selection as a first-class routing primitive, ClawOS/OpenClaw orchestration experiments, memory/RAG/response state in runtime, richer safety signals, prompt compression, neural-symbolic config, zero-config onboarding, dashboard improvements, and AMD ROCm deployment path. The repo frames it as a signal-driven intelligent router for mixture-of-models across cloud, data center, and edge. It is not a Claude Code gateway and should not be installed just to route Claude Code unless a separate Anthropic-compatible front door is added.

[CONFIRMED + Dust docs/repo] `dust-tt/dust` is a real custom AI agent platform. Dust docs describe customizable secure AI agents powered by leading LLMs, connected to company data sources; Dust can act as a replacement for ChatGPT/Gemini-style generic agents and exposes developer platform APIs. It is relevant to cross-model orchestration as an enterprise agent platform, not as a Claude Code transport. No official Claude Code integration surface was confirmed.

## §B — Multi-Account Orchestration Patterns (cas/cui/cuk + Alternatives)

### Summary Table

| Pattern | What it does | Legitimacy/risk | Evidence |
|---|---|---|---|
| Named profile switching | Separate credential stores per work/personal/client account; operator chooses profile | Usually legitimate when accounts map to separate legal/work contexts; still must not evade limits | CCS docs; Anthropic feature request #35856 |
| Multi-account load balancing | Rotate requests across many subscriptions/API keys to increase throughput | High risk if used to bypass per-user plan limits; safer only for organization-owned keys/seats with provider-approved allocation | CLIProxyAPI config; Portkey/LiteLLM virtual keys; Anthropic/OpenAI policy |
| API-key pool with virtual keys | Gateway hides provider keys, assigns virtual keys, budgets/rate limits users | Legitimate enterprise pattern when keys/seats are authorized and usage limits respected | LiteLLM docs; Portkey docs |
| OAuth subscription proxy | Reuses Claude/Codex/Gemini CLI OAuth credentials behind a local API | Risky; may violate product boundaries if used to resell, share, evade limits, or bypass intended clients | CLIProxyAPI, CCProxy API, CCS, policy docs |
| Grey-market transfer station | Third-party proxy resells cheap model access | Unsafe; potential stolen credentials, model substitution, data harvesting | News/search reports [CONFIRMED report exists; individual services not validated here] |

### Findings

[CONFIRMED + CCS docs] CCS (Claude Code Switch, `@kaitranntt/ccs`) documents a login-per-profile architecture. It creates separate profile directories such as `~/.ccs/instances/work` and `~/.ccs/instances/personal`, enabling simultaneous terminals with isolated Claude CLI instances. The docs present this as work/personal account separation, not hidden round-robin rate-limit evasion. CCS also distinguishes itself from Claude Code Router: CCR is for advanced routing across paid API endpoints, while CCS is a simpler wrapper for subscription-based workflow isolation. Native-CC-pathway score: 4 for account switching UX, but not a model gateway by itself.

[CONFIRMED + Anthropic GitHub issue] Anthropic’s `anthropics/claude-code` issue #35856 requests native quick account switching. The use case is freelancers/contractors who have personal Pro/Max and client Team/Enterprise accounts. The proposed commands are `claude auth add`, `claude auth switch`, and `claude auth list`, modeled after AWS/GitHub CLI profiles. This is useful evidence that legitimate multi-account switching exists as a workflow need, even if native support is not yet confirmed. It is not evidence that rotating multiple personal accounts to extend usage is acceptable.

[CONFIRMED + CLIProxyAPI config] `router-for-me/CLIProxyAPI` is a real community proxy ecosystem with a config example that includes `codex-api-key`, `claude-api-key`, OpenAI-compatible providers, per-key `prefix`, `disable-cooling`, `base-url`, `headers`, `proxy-url`, model aliasing, excluded-models, and internal alias pools that round-robin/fail over across upstream names. The example also contains Claude-specific cloaking/signing knobs and Codex header defaults. This is a powerful primitive but a high-risk one: features such as cooldown scheduling, cloaking, and many credentials can be legitimate for authorized internal routing, but they can also be used for evasive usage amplification.

[CONFIRMED + CCProxy API repo] `CaddyGlow/ccproxy-api` is a local reverse proxy that claims unified access to Anthropic Claude API/SDK, OpenAI Codex through ChatGPT backend Responses API using OAuth for paid/pro accounts, and GitHub Copilot. It exposes OpenAI Chat Completions, OpenAI Responses, and Anthropic Messages surfaces, with model mapping. This is closer to a local OAuth credential bridge than a conventional provider API-key gateway. It is technically relevant but policy-sensitive.

[NEEDS-PROBE] The task’s “cas/cui/cuk” labels do not correspond to a single confirmed canonical repo or standard in the evidence gathered. I interpret them as shorthand for local account-switch/credential-user/key rotation patterns:

| Label | Interpreted pattern | Evidence status |
|---|---|---|
| cas | Claude account switch / subscription profile | [INFERRED] CCS and `claude auth switch` feature request match the shape. |
| cui | Claude user instance / isolated config dir | [INFERRED] CCS profile directories and community “multiple Claude Code accounts” tools match the shape. |
| cuk | Claude user key / API-key or OAuth token pool | [INFERRED] CLIProxyAPI and CCProxy API match the shape; exact acronym unverified. |

If these are internal eee acronyms with precise definitions elsewhere, this section should be reconciled against the internal glossary before being promoted beyond research-delta status.

### Risk Profile

[CONFIRMED + Anthropic support docs] Anthropic says usage across Claude product surfaces such as claude.ai, Claude Code, and Claude Desktop counts toward the same usage limit. Anthropic’s agent usage guidance explicitly forbids creating or managing multiple accounts to evade detection or circumvent platform safeguards, and forbids accessing or modifying another person’s account using stored credentials without authorization. Anthropic API rate-limit docs also point users seeking higher limits to sales/custom limits/Priority Tier rather than evasion.

[CONFIRMED + OpenAI Terms] OpenAI’s Terms of Use prohibit sharing account credentials and prohibit interfering with or disrupting services, including circumventing rate limits/restrictions or bypassing protective measures/safety mitigations. For Codex, the safe path is to use the subscription/API usage you are entitled to, use official team/workspace controls, or buy higher limits/credits where available. A local gateway that masks many user accounts behind one endpoint is safe only if each credential is authorized for that workload and the routing does not defeat plan, seat, workspace, or product restrictions.

Safe patterns:

- Use distinct profiles for distinct work contexts where you are authorized on each account.
- Use enterprise/team virtual keys for access control, budgets, observability, and revocation.
- Use provider-documented load balancing across multiple organization-owned API keys or regions when the provider’s plan permits it.
- Use backoff, queueing, and model downgrades to respect rate-limit semantics.

Unsafe patterns:

- Buying/creating multiple consumer subscriptions for the same operator solely to avoid usage windows.
- Sharing OAuth/token files across users.
- Using cloaking or client-fingerprint manipulation to bypass product restrictions.
- Reselling access to subscription-backed accounts.
- Sending proprietary code through unknown proxy services without data-processing guarantees.

## §C — Codex Path P Recipe Library

### Summary Table

| Invocation form | Use when | Template |
|---|---|---|
| Path P foreground+tee T1 consult | Need independent Codex GPT review from main orchestrator, with durable stdout/stderr evidence | `codex exec --ephemeral -p deep-review-exec --color never - < prompt.txt > OUT.txt 2>&1` |
| Path P with model pin | Need specific model rather than profile default | `codex exec --ephemeral -m gpt-5.5 --color never - < prompt.txt > OUT.txt 2>&1` |
| Path P JSON event stream | Need machine-readable progress | `codex exec --ephemeral --json - < prompt.txt > events.jsonl 2> err.txt` |
| Path P final message capture | Need clean final answer plus full tee | `codex exec --ephemeral --color never -o final.md - < prompt.txt > OUT.txt 2>&1` |
| codex-plugin-cc background | Claude Code operator wants native slash-command queue/status/result | `/codex:review --background`, `/codex:rescue --background <task>`, `/codex:status`, `/codex:result` |
| Direct `codex review` | Need Codex review of current repo without custom Path P prompt | `codex review --uncommitted` or `codex review --base main` |

### Canonical Path P

[CONFIRMED + local doctrine + local CLI help] “Path P” is not an upstream OpenAI term. It is the local eee discipline for using orchestrator-direct Codex CLI as an independent cross-model evidence source when Claude Code subagent dispatch is unavailable, unreliable, too long, or would pollute the main session. The canonical form in this repo is:

```powershell
codex exec --ephemeral -p deep-review-exec --color never - < .claude/state/codex_consult_<topic>.txt > .claude/state/codex_consult_<topic>_OUT.txt 2>&1
```

For this requested document we are not creating `.claude/state` prompts; the recipe is recorded as research output only. The important details are: `exec` is non-interactive; `--ephemeral` avoids persisting rollout files; `-p deep-review-exec` selects the local profile; `--color never` makes output stable for grep/diff; `-` reads stdin; shell redirection captures a durable transcript. This is foreground+tee in the operational sense of “run as a foreground child whose combined output is captured to a file.” If also using terminal tee interactively, the POSIX form would be `2>&1 | tee OUT.txt`; the PowerShell equivalent can pipe to `Tee-Object`. In this repo’s AGENTS.md, the foreground+tee path is written as redirection to OUT, which is sufficient for durable evidence.

### Path P vs Agent() / Subagent Dispatch

Use Path P when:

- The task is specifically cross-model review, adversarial review, or CI rescue and the desired reviewer is Codex/GPT rather than another Claude-family subagent.
- Claude Code subagent pathways have failed, hit model/account fleet depletion, or are known to autocompact/thrash before returning evidence.
- You need a deterministic artifact file for T1/T2/T3 gate evidence.
- The prompt is focused enough to fit a single non-interactive Codex run.

Use Claude Code Agent/subagent dispatch when:

- The work can be split into parallel read-heavy or implementation tasks that benefit from local Claude Code tools, state, and worktree coordination.
- You need multiple independent sidecar agents while the main agent continues non-overlapping work.
- The work is Claude Code-native: MCP use, repo skills, Claude-specific slash command workflows, or UI-managed sessions.

Use codex-plugin-cc `/codex:rescue` when:

- You are inside Claude Code and want a native slash command that manages background job state for you.
- The task is a bounded bug investigation/fix or a smaller-model pass.
- You want `/codex:status`, `/codex:result`, `/codex:cancel`, and resume integration without manually constructing `codex exec`.

Do not confuse these:

- `codex exec` has no confirmed `--background` flag in v0.130.0.
- `/codex:review --background` and `/codex:rescue --background` are codex-plugin-cc slash-command flags, implemented through Claude Code background Bash/job state.
- `codex cloud exec` is for Codex Cloud tasks, not local Path P review.

### Codex-Rescue Best Practices

[CONFIRMED + codex-plugin-cc README + local CLI help] Use `/codex:rescue --background <task>` for long-running work in Claude Code. Use `--wait` only when the task is tiny or you need immediate output. Use `--fresh` to avoid accidentally continuing stale context; use `--resume` when the last Codex thread already contains useful state. If pinning model from plugin, the README confirms `--model gpt-5.4-mini`, `--effort medium`, and `--model spark` where `spark` maps to `gpt-5.3-codex-spark`.

For direct Path P rescue, keep prompts short and explicit:

```powershell
codex exec --ephemeral -p deep-review-exec --color never - < .claude/state/codex_rescue_build_failure.txt > .claude/state/codex_rescue_build_failure_OUT.txt 2>&1
```

When using direct `codex exec`, select `--sandbox read-only` for pure review and `--sandbox workspace-write` for fix attempts. Avoid `--dangerously-bypass-approvals-and-sandbox` unless the surrounding environment provides a real sandbox.

### Pattern A FIX-FORWARD

[CONFIRMED + local repo doctrine] Pattern A is local eee verdict integration discipline. The brief’s definition is: on Codex T1 `NEEDS-REVISION` with confidence in the approximate 0.88-0.93 band and no more than 10 prescriptions, apply all verified prescriptions in one atomic fix-forward commit rather than iterating N -> N.1 loops. It assumes prescriptions are concrete enough to probe. The companion “Mia pre-apply” rule says file:line claims and prescribed edits must be cheaply verified before edit. In this document’s context, Pattern A applies to future architecture commits or doc corrections that come out of Codex review; this research document itself did not run a T1 review because the user asked only to create a file and no commit is being made.

## §D — Sub-Model Routing Matrix

### Summary Table

| Task class | Primary model | Secondary | Notes |
|---|---|---|---|
| Complex coding, architecture, long-horizon debugging | GPT-5.5 | Opus 4.7, GPT-5.4 | User has unlimited Codex usage; do not optimize for cost. Prefer GPT-5.5 for Codex-native work. |
| Codex local execution/fix | GPT-5.5 | GPT-5.4; GPT-5.4-mini for bounded fast worker | OpenAI docs say start with GPT-5.5 for most Codex tasks; mini for lighter subagents. |
| Codex Cloud/code review | GPT-5.3-Codex | Not user-selectable for cloud | OpenAI docs say cloud/code review run on GPT-5.3-Codex and cloud model selection cannot currently be changed. |
| Near-instant Codex text-only iteration | GPT-5.3-Codex-Spark | GPT-5.4-mini | Spark is research preview for ChatGPT Pro, not API at launch per OpenAI docs. |
| Adversarial review/audit | GPT-5.5 high/xhigh | Opus 4.7, GPT-5.4 high | Quality over latency; request structured findings and evidence. |
| Read-heavy exploration, log triage, doc chunking | GPT-5.4-mini | Haiku 4.5, Sonnet 4.6 | Parallelize when independent; main thread integrates. |
| Claude Code implementation in existing CC runtime | Sonnet 4.6 | Opus 4.7 for hard planning/review | Anthropic model claims need latest Anthropic docs probe before hard policy. |
| Cheap summarization/classification | Haiku 4.5 | GPT-5.4-mini | Only when stakes are low; not for architecture gates. |

### Findings

[CONFIRMED + OpenAI Codex model docs] OpenAI’s current Codex recommendation is to start with `gpt-5.5` for most Codex tasks when available. The docs describe GPT-5.5 as the newest frontier model for complex coding, computer use, knowledge work, and research workflows in Codex. `gpt-5.4` remains a flagship frontier model for professional work, bringing GPT-5.3-Codex coding capability with stronger reasoning/tool use/agentic workflows. `gpt-5.4-mini` is the fast efficient mini model for responsive coding tasks and subagents. `gpt-5.3-codex` is the complex software-engineering coding model and is the one with Codex Cloud support. `gpt-5.3-codex-spark` is text-only research preview for near-instant real-time coding iteration, available to ChatGPT Pro users, not API access at launch.

[CONFIRMED + OpenAI subagent docs] Codex subagent docs explicitly recommend different models and reasoning settings for different agents. If unpinned, Codex may choose a balance of intelligence, speed, and price; it may favor `gpt-5.4-mini` for fast scans or higher-effort `gpt-5.5` for demanding reasoning. Because the user states unlimited Codex usage and says not to optimize for cost, the routing policy should ignore cost except where latency or quota mechanics matter. That means GPT-5.5 should be the default for architecture, synthesis, high-risk code review, adversarial review, security review, and implementation where correctness dominates. GPT-5.4-mini is still useful when the objective is parallel breadth or latency, not cost.

[NEEDS-PROBE + Anthropic docs] The task asks for GPT-5.5 vs Opus 4.7 vs Sonnet 4.6 vs Haiku 4.5. OpenAI Codex docs confirm the GPT side. The Claude model labels are in the user’s environment and current task scope, but this pass did not fetch current Anthropic model cards for Opus 4.7/Sonnet 4.6/Haiku 4.5. Therefore the following Claude tradeoffs are [INFERRED] from common Anthropic model-family roles and local AGENTS.md role guidance, not independently confirmed from live Anthropic docs in this document: Opus-class is for architecture/security/deep debugging/long-horizon research; Sonnet-class is for implementation, test writing, routine refactors, and read-only probes; Haiku-class is for summarization/classification/inline judge passes. Before this routing matrix becomes a policy file, probe Anthropic model docs for current model names, context windows, tool-use behavior, and pricing/limits.

Routing rules:

- Quality-first default: GPT-5.5 for Codex work, Opus 4.7 for Claude-native deep reasoning where available.
- Latency-first bounded tasks: GPT-5.4-mini or Haiku 4.5 for narrow scans, summaries, and low-risk extraction.
- Execution in Claude Code repo with established CC hooks/plugins: Sonnet 4.6 for routine implementation, Opus 4.7 for design review and high-risk changes.
- Cross-model gate: use GPT-5.5 via Path P for independent adversarial review of Claude-authored changes.
- Do not route cloud tasks expecting model control; Codex Cloud model selection is currently not changeable in confirmed docs.
- Do not route Codex models through Portkey Claude Code integration until Portkey’s Responses adapter support for Codex models is confirmed.

## §E — Architecture Recommendation

### Recommendation Table

| Layer | Expand? | Recommendation |
|---|---:|---|
| L1.0 cross-model proxy | YES | Add as a distinct architecture surface. Prefer Portkey or LiteLLM depending on governance vs self-host needs. |
| L1.1 multi-account orchestration | YES, with guardrails | Add, but define “authorized profile/key routing” and ban rate-limit evasion. |
| L1.2 sub-model routing | YES | Add a routing matrix with quality-first defaults and explicit latency exceptions. |

### Prose Recommendation

Yes: L1 should expand into L1.0, L1.1, and L1.2. The evidence shows these are distinct architectural concerns.

L1.0 cross-model proxy is about protocol translation, observability, fallback, load balancing, and centralized auth. LiteLLM and Portkey are the strongest confirmed candidates. Portkey has the best native Claude Code documentation and governance features. LiteLLM has the broadest open-source/self-host traction and is explicitly documented by Anthropic’s Claude Code gateway page. OpenRouter is useful as a provider marketplace/model catalog behind a gateway, but not sufficient alone as a native Claude Code pathway. vLLM Semantic Router is a model-system router for MoM deployments and should be treated as a future research/edge inference layer, not the first L1.0 implementation.

L1.1 multi-account orchestration is separate because it creates policy, security, and identity risk. A profile switcher for work/personal/client contexts is different from round-robinning multiple paid consumer accounts. The architecture should make that distinction mechanically: profile isolation is allowed; provider-key virtual keys are allowed when organization-owned; opaque OAuth pooling and cloaking are high risk and require explicit operator/legal approval. The safe implementation pattern is “authorized credentials + transparent budgets + audit logs + backoff,” not “more accounts = more throughput.”

L1.2 sub-model routing is separate from both gateway and accounts. It defines which model should receive which task class. Since Codex usage is effectively unconstrained for this user, the routing objective should be quality and latency, not cost. GPT-5.5 becomes default for Codex-side complex work. GPT-5.4-mini and Haiku-class models serve fast sidecar roles. Opus-class models serve Claude-native architecture/security/research roles. Sonnet-class handles implementation. Spark is a latency-specialized Codex preview, not a general replacement.

Suggested implementation order:

1. Define L1.2 first as a pure markdown policy/routing matrix; no secrets, no network, low risk.
2. Define L1.0 second with a gateway comparison and one pilot: Portkey if governance/Claude Code compatibility dominates, LiteLLM if local self-host and config control dominate.
3. Define L1.1 last, after policy guardrails are written. Make rate-limit evasion a forbidden use case and require account/key provenance metadata.

## §F — Honest Non-Findings

| Claim / item | Status | Reason |
|---|---|---|
| `codex exec --background` | NOT FOUND | v0.130.0 local help and OpenAI docs do not list it. Background exists in plugin slash commands or shell orchestration. |
| `codex exec --wait` | NOT FOUND | `--wait` is confirmed for codex-plugin-cc slash commands, not direct `codex exec`. |
| `codex-toolkit-for-claude` | UNVERIFIED | No canonical primary repo found by exact-name search. |
| `codex-cc-plugin` as separate from `codex-plugin-cc` | UNVERIFIED | Exact-name evidence was ambiguous; likely shorthand or typo unless URL provided. |
| `opencode-plugin-cc` | UNVERIFIED | No primary repo confirmed. |
| `openrouter-py` | UNVERIFIED / REFUTED BY PIP PROBE | `python -m pip index versions openrouter-py` found no matching distribution; PyPI has `openrouter`. |
| first-party `openrouter-cli` | UNVERIFIED | Search found `@letuscode/openrouter-cli` via Libraries.io, not confirmed as OpenRouter first-party. |
| Axflow current CC relevance | NEEDS-PROBE | Search did not yield enough primary evidence. |
| `claude-fleet-management` canonical repo | NOT FOUND | No single canonical repo with that exact name confirmed. Related tools exist: CCS, herdctl, Maestro/CCC-style session managers, CLIProxyAPI. |
| cas/cui/cuk exact acronym meanings | NEEDS-PROBE | Interpreted as account/profile/key rotation classes; no external canonical acronym source confirmed. |
| Codex Web public CLI-accessible API | UNVERIFIED | Confirmed CLI surfaces are local CLI/app/app-server and experimental Codex Cloud commands. |
| Portkey support for Codex models in Claude Code | CURRENTLY NOT SUPPORTED per Portkey docs | Portkey page says `codex-5.3` models require a Responses endpoint adapter “coming soon.” |
| Claude Opus 4.7/Sonnet 4.6/Haiku 4.5 official model-card claims | NEEDS-PROBE | This pass did not fetch current Anthropic model pages; role mapping is inferred from local AGENTS.md and model-family conventions. |

Assumptions:

- “Native-CC-pathway score” is an integration score, not a model-quality score.
- “Codex Web” means browser-hosted Codex experience distinct from Codex Cloud and local Codex app; no general CLI-accessible automation API was confirmed.
- “cas/cui/cuk” are treated as local shorthand for account-switching, user-instance isolation, and key/token pools. If internal doctrine defines them differently, update §B.
- Because the user requested only this file and no commits, no T1/T2 gate or GitNexus commit-time detection was run.

Primary evidence anchors used:

- OpenAI Codex CLI reference: `https://developers.openai.com/codex/cli/reference`
- OpenAI Codex models: `https://developers.openai.com/codex/models`
- OpenAI Codex subagents: `https://developers.openai.com/codex/concepts/subagents`
- OpenAI Codex approvals/security: `https://developers.openai.com/codex/agent-approvals-security`
- Local Codex help: `codex --version`, `codex --help`, `codex exec --help`, `codex cloud --help`, `codex app-server --help`
- OpenAI Codex plugin for Claude Code: `github.com/openai/codex-plugin-cc`; local dependency `Z:/repos/deps/codex-plugin-cc @ 807e03ac9d5aa23bc395fdec8c3767500a86b3cf`
- Anthropic Claude Code LLM gateway docs: `https://code.claude.com/docs/en/llm-gateway`
- LiteLLM docs/repo: `https://docs.litellm.ai/`, `github.com/BerriAI/litellm`
- Portkey Claude Code/gateway/fallback docs: `https://portkey.ai/docs/integrations/libraries/claude-code`, `https://portkey.ai/docs/product/ai-gateway/fallbacks`; npm `@portkey-ai/gateway`
- OpenRouter docs: `https://openrouter.ai/docs/guides/overview/models`, `https://openrouter.ai/docs/api/api-reference/models/get-models`
- vLLM Semantic Router: `github.com/vllm-project/semantic-router`; `https://vllm.ai/blog/2026-03-10-v0.2-vllm-sr-athena-release`
- Dust: `github.com/dust-tt/dust`, `https://docs.dust.tt/docs`
- AxonHub: `github.com/looplj/axonhub`
- PyPI: `aisuite`, `simpleaichat`, `openrouter`, `claude-codex-bridge`
- Multi-account/proxy evidence: `https://ccs.kaitran.ca/`, `github.com/router-for-me/CLIProxyAPI`, `github.com/CaddyGlow/ccproxy-api`, `github.com/anthropics/claude-code/issues/35856`
- Policy evidence: Anthropic rate/usage/agent policy docs; OpenAI Terms of Use
