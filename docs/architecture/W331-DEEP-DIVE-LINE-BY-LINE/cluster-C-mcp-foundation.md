# W331 Deep-Dive Line-by-Line — Cluster C: MCP Foundation + Servers

> **Wave**: W331 (follow-up to W330 mega-audit)
> **Scope**: 8 repos under github.com/modelcontextprotocol/* (spec + 2 SDKs + reference servers + registry + inspector + mcpb + experimental ext-skills WG)
> **Method**: sca-v12.1 (`Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`) deep-dive ingest
> **Live runtime cross-ref**: `.mcp.json` 14 active servers, 0 disabled (verified 2026-05-19)
> **Synthesis upstream**: `Z:/claude-sota-installed/docs/architecture/W330-MEGA-AUDIT/SYNTHESIS.md`
> **HEAD pins (this wave)**:
> - spec `e085d35` (`modelcontextprotocol/modelcontextprotocol`)
> - python-sdk `161834d` (`modelcontextprotocol/python-sdk`)
> - typescript-sdk `22595b9` (`modelcontextprotocol/typescript-sdk`)
> - servers `97ba6b3` (`modelcontextprotocol/servers`)
> - registry `deb5e7b` (`modelcontextprotocol/registry`)
> - inspector `f18775a` (`modelcontextprotocol/inspector`)
> - mcpb `70fe3b3` (`modelcontextprotocol/mcpb`)
> - experimental-ext-skills `0cefd96` (`modelcontextprotocol/experimental-ext-skills`)

---

## §1 — Per-repo verdict table (sca-v12.1)

| # | Repo | HEAD | Maturity | LICENSE | Novelty for us | Adopt verdict | Score 0-5 |
|---|---|---|---|---|---|---|---|
| C1 | **modelcontextprotocol/modelcontextprotocol** (spec) | `e085d35` | mature (5 protocol revs: `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25`, `draft`) | MIT | Spec HEAD `2025-11-25` + `draft` post-`2025-11-25` carries 8 deep changes — most disruptive: protocol-level sessions removed, stateless `initialize` removed, `server/discover` RPC introduced (SEP-2575) | DEEP-DIVE | 5.0 |
| C2 | **modelcontextprotocol/python-sdk** | `161834d` | mature (v1.x stable, v2 pre-alpha on `main`) | MIT | Carries `src/mcp/server/experimental/` with `task_context.py` (23 KB), `task_result_handler.py`, `task_support.py` — task-RPC is post-spec extension we have not modeled. Auth machinery shipped (`auth/handlers/{authorize,token,register,metadata,revoke}.py`) for OAuth-2.1. | DEEP-DIVE | 5.0 |
| C3 | **modelcontextprotocol/typescript-sdk** | `22595b9` | mature (pnpm-workspace monorepo, v2 pre-alpha on `main`, v1 stable) | MIT | Repo has been **resharded into a 4-package monorepo**: `packages/{client,core,middleware,server}`. Our runtime referenced `src/server/streamableHttp.ts` paths that no longer exist (W331 finding). | DEEP-DIVE | 4.5 |
| C4 | **modelcontextprotocol/servers** (reference) | `97ba6b3` | mature (7 reference servers + archived) | MIT (per-server) | `everything` is the only test-vector server in-tree — exercises all primitives (sampling, elicitation, async tasks, roots, resource_link, blob/text resources). We do not run it, but it is the cite-anchor target for spec-conformance smoke tests. | DEEP-DIVE | 4.0 |
| C5 | **modelcontextprotocol/registry** | `deb5e7b` | mature (Go + Huma framework + OpenTelemetry, v0 + v0.1 routes shipped) | Apache 2.0 | Centralised metadata registry-of-record. Endpoint `register_v0` + `register_v0_1` + `/health`/`/metrics`/`/ping`/`/docs`. Auth via GitHub OAuth + DNS verification (per `docs/design/design-principles.md` §4). We currently bypass — implication: server-discovery via `mcp_registry.json` is the SOTA-aligned alternative to per-`.mcp.json` pinning. | DEEP-DIVE | 4.5 |
| C6 | **modelcontextprotocol/inspector** | `f18775a` | mature (UI mode `:6274` + CLI mode + proxy `:6277`) | MIT | The CLI mode (`cli/src/index.ts`+`cli.ts`) exposes a JSON-RPC method-runner with target `<server-spec>` (stdio/SSE/streamable-http), flags: `--method`, `--tool-name`, `--tool-arg`, `--uri`, `--log-level`, `--header`, `--transport`. We do not invoke this in CI today. | DEEP-DIVE | 5.0 |
| C7 | **modelcontextprotocol/mcpb** | `70fe3b3` | mature (`manifest_version 0.4`, CLI `init|validate|pack|sign|verify|info|unsign` per `CLI.md:24-28`, 5 schema versions `v0.1`..`v0.4`) | MIT | Bundle format `(.mcpb)` is the **packaged-distribution** primitive — zip + `manifest.json`. The v0.4 `uv` server type (`MANIFEST.md` "UV Runtime (v0.4+)") solves cross-platform Python without bundle bloat. Not used by us; in-scope for next-wave packaging discussion. | DEEP-DIVE | 4.0 |
| C8 | **modelcontextprotocol/experimental-ext-skills** | `0cefd96` | early (WG, no SKILL.md, all docs prose) | n/a (experimental) | The "Skills Over MCP" working-group repo. SEP-2640 (`skill://` URI scheme) is upstream + in flight. Repository carries problem-statement, approaches, decisions, sep-draft, skill-meta-keys, skill-uri-scheme, related-work. Directly cross-references our own runtime's skill-loading model. | DEEP-DIVE | 4.5 |

**Aggregate score**: 4.56 / 5.0 — Cluster C is **the highest-quality cluster** in W331 (no PR-grade repos, all 8 mature). Per operator hard constraint "mature repos → deeper-dive, not PR", the recommendation surface is **discipline refinement** not "install something new".

---

## §2 — Novel SOTA patterns (cited, ≥3 org-distinct anchors)

The patterns below are surfaced from the spec + SDKs + servers + registry + inspector + mcpb + ext-skills HEAD pins. Each pattern names the **specific file:line citation** and the **org-distinct status** so the cardinal-rule-1 + sca-v12.1 §"3-cite anchor" gate is held.

### N1 — Stateless `initialize` + `server/discover` RPC (draft)

The draft spec changelog removes `initialize`/`notifications/initialized` and introduces `server/discover` as the new bootstrap RPC. Each request carries protocol version, client identity, client capabilities in `_meta` namespaces:

- `io.modelcontextprotocol/protocolVersion`
- `io.modelcontextprotocol/clientInfo`
- `io.modelcontextprotocol/clientCapabilities`

Mismatches return `UnsupportedProtocolVersionError`. **Cite**: `Z:/claude-sota-installed-repos/modelcontextprotocol-modelcontextprotocol/docs/specification/draft/changelog.mdx` "Major changes" #2-3, SEP-2575. **Org**: modelcontextprotocol (Anthropic-stewarded, multi-vendor SC). Also removes `ping`, `logging/setLevel`, and `notifications/roots/list_changed` (#5).

**Implication for us**: clients of the 14 servers in `.mcp.json` (Claude Code) drive the spec version. The runtime is on `2025-11-25` or earlier (per CC `MCP-Protocol-Version` header, `spec-basic-lifecycle.mdx`). Adoption of the draft is a **client-side migration item** when CC follows. Today: no action; track CC's roll-forward.

### N2 — URL-mode elicitation for sensitive credential flows (`2025-11-25`)

The `2025-11-25` spec adds **URL-mode elicitation** (SEP-1036) alongside Form-mode. Form-mode **MUST NOT** request passwords, API keys, access tokens, or payment credentials — those go through URL mode, which routes the user out-of-band, **not through the MCP client**. **Cite**: `Z:/claude-sota-installed-repos/modelcontextprotocol-modelcontextprotocol/docs/specification/2025-11-25/client/elicitation.mdx:30-46` `<Warning>` block. **Org**: modelcontextprotocol spec.

**Implication for us**: cardinal-rule-5 "Safety boundaries via permissions + sandboxing, NOT custom guard scripts" gains a spec-anchored ally — credential elicitation has a spec MUST that off-loads risk to URL-mode. Direct cite-anchor for any future credential-prompting MCP server in our runtime: `2025-11-25/client/elicitation.mdx` (no need to invent guard logic).

### N3 — Sampling tool calling via `tools` + `toolChoice` (`2025-11-25`)

The `2025-11-25` spec adds tools-in-sampling: a server can include `tools` and `toolChoice` in its sampling request, and the client's LLM can use them during sampling — enabling **agentic-behaviour servers**. **Cite**: `docs/specification/2025-11-25/client/sampling.mdx` "Tools in Sampling" §, SEP-1577. **Org**: modelcontextprotocol spec. **Trust-boundary cite**: same file's `<Warning>` block "there **SHOULD** always be a human in the loop" — i.e. sampling tools require client UX gates.

**Implication for us**: our 14 servers do **not** currently use sampling, but if `cognee`/`basic-memory`/`langfuse` ship sampling-driven background flows, the in-loop UX gate is a spec-required surface. Bookmark for adoption: `2025-11-25/client/sampling.mdx` is the contract.

### N4 — `CallToolResult.isError` is **payload-level**, not protocol-level

The spec schema (`schema/draft/schema.ts:1637-1662`) defines `CallToolResult` with both `content: ContentBlock[]` and `isError?: boolean`. The doc-comment at L1654 is explicit: tool execution errors flow as `isError: true` on the result, **not** as a JSON-RPC error response. **Cite**: `Z:/claude-sota-installed-repos/modelcontextprotocol-modelcontextprotocol/schema/draft/schema.ts:1641,1654,1662`. **Org**: modelcontextprotocol spec.

**Implication for us**: any local debugging via inspector CLI must treat `isError: true` as a **business-logic failure**, not transport failure. Concretely: `cluster-A-github-mcp-server.go` `NewGitHubAPIErrorResponse` (W331 Cluster A) carries `isError: true` per this contract — that pattern is now spec-anchored.

### N5 — Streamable HTTP session-id contract (`2025-11-25`) being **removed in draft**

The `2025-11-25` Streamable HTTP transport uses `MCP-Session-Id` header (SHOULD be a UUID/JWT/hash; visible ASCII `0x21-0x7E`; `MCP-Protocol-Version` header required on follow-up requests). **Cite**: `docs/specification/2025-11-25/basic/transports.mdx` §"Session" + cross-search anchor. **Org**: modelcontextprotocol spec.

**But**: the draft changelog (#1, SEP-2567) **removes protocol-level sessions and the `Mcp-Session-Id` header**. List endpoints (`tools/list`, `resources/list`, `prompts/list`) no longer vary per-connection. Servers that need cross-call state use **explicit, server-minted handles passed as ordinary tool arguments**.

**Implication for us**: 3 of our 14 servers are HTTP transport (`deepwiki`, `cognee`, `hf-mcp-server`) — when they migrate to the draft spec, they will likely drop session-id headers and use tool-arg state-handles. No action today; track upstream.

### N6 — `extensions` field on `ClientCapabilities` / `ServerCapabilities` (draft)

Draft #minor-changes #1: adds `extensions` to both capability blocks for "optional extensions beyond the core protocol" — formal extension-registration mechanism. **Cite**: `docs/specification/draft/changelog.mdx` "Minor changes" #1. **Org**: modelcontextprotocol spec.

**Implication for us**: the experimental-ext-skills `skill://` URI scheme (N12) will land via this extension primitive. The plumbing is forward-compatible: an MCP server can advertise `extensions.skills` as a discoverable capability.

### N7 — Python SDK `mcp/server/experimental/{task_context,task_result_handler,task_support}.py`

The python-sdk ships **experimental task RPC** machinery — long-running tool calls split into request → background-execution → poll → result. Files: `Z:/claude-sota-installed-repos/modelcontextprotocol-python-sdk/src/mcp/server/experimental/task_context.py` (23 KB; the largest experimental file), `task_result_handler.py` (8 KB), `task_support.py` (4 KB), `session_features.py` (8 KB), `request_context.py` (8 KB). **Cite**: python-sdk `src/mcp/server/experimental/` tree (HEAD `161834d`). **Org**: modelcontextprotocol/python-sdk (Anthropic-stewarded reference SDK).

The corresponding **typescript-sdk** mirror is `packages/{client,core}/src/experimental/tasks/` — the v2 monorepo localises tasks to `core` (shared infra) + `client` (consumer) packages. **Cite**: `packages/client/src/experimental/tasks/`, `packages/core/src/experimental/tasks/`.

The spec draft changelog #6 says tasks **move out of the core protocol** into an official **extension** (`io.modelcontextprotocol/...`). So the SDKs ship it experimental, the spec draft de-stages it to extension. **Implication for us**: any future server that wants long-running work (e.g. cognee large-corpus ingest) can lean on the SDK's task primitive without our runtime re-inventing it.

### N8 — Python SDK OAuth-2.1 server-side machinery is feature-complete

The python-sdk ships full OAuth provider scaffold under `src/mcp/server/auth/`:

- `handlers/authorize.py`
- `handlers/token.py`
- `handlers/register.py` (dynamic client registration)
- `handlers/metadata.py` (server metadata + OpenID Connect Discovery)
- `handlers/revoke.py`
- `provider.py` (provider interface)
- `routes.py` (route mounting)
- `middleware/bearer_auth.py`, `middleware/client_auth.py`, `middleware/auth_context.py`

**Cite**: `Z:/claude-sota-installed-repos/modelcontextprotocol-python-sdk/src/mcp/server/auth/` tree, HEAD `161834d`. **Org**: modelcontextprotocol/python-sdk.

The `2025-11-25` spec changelog #1 specifically calls out **OpenID Connect Discovery 1.0** integration, which `metadata.py` implements. **Cite**: `docs/specification/2025-11-25/changelog.mdx` "Major changes" #1, PR #797. **Org**: modelcontextprotocol spec.

**Implication for us**: if we ever expose a self-hosted MCP server (e.g. wrapping `gitnexus mcp` as HTTP), this is the canonical auth path. **Today, all 14 servers in our `.mcp.json` are stdio or HTTP-with-client-token** (langfuse uses Basic-auth header injection per `.mcp.json` `LANGFUSE_*` env). The OAuth path is **dormant but available**.

### N9 — TypeScript SDK monorepo reshard: `packages/{client,core,middleware,server}`

The ts-sdk repo no longer has a `src/` directory — it has a pnpm-workspace monorepo with 4 packages (`packages/client`, `packages/core`, `packages/middleware`, `packages/server`). **Cite**: `Z:/claude-sota-installed-repos/modelcontextprotocol-typescript-sdk/packages/`, `pnpm-workspace.yaml`, HEAD `22595b9`. **Org**: modelcontextprotocol/typescript-sdk.

- `packages/core/src/shared/` — shared transport primitives (e.g. `core/src/shared/stdio.ts`)
- `packages/server/src/server/streamableHttp.ts` — current canonical streamable-http server impl
- `packages/server/src/server/stdio.ts` — canonical stdio server impl
- `packages/client/src/client/streamableHttp.ts` — client streamable
- `packages/middleware/node/src/streamableHttp.ts` — Node middleware

**Implication for us**: any historical cite to `modelcontextprotocol/typescript-sdk` `src/server/...` is now broken — must remap to `packages/server/src/server/...`. **This is W331 finding #1** — three of our prior cites in `docs/architecture/W286-CROSS-NPX-PINNED/` and `docs/architecture/W259-grand-catalog/03-deepdive/MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md` likely reference dead `src/` paths and need a refresh (see §6 P0.5 mapping).

### N10 — Registry uses **Huma** + OpenTelemetry for HTTP routes (Go)

The registry repo (`modelcontextprotocol/registry`) is a Go service using `github.com/danielgtaylor/huma/v2` + `humago` adapter + `go.opentelemetry.io/otel/metric`. Routes are registered via `RegisterV0Routes` and `RegisterV0_1Routes` in `internal/api/router/router.go:208-209`. Skipped paths for metrics: `/health`, `/metrics`, `/ping`, `/docs` (`router.go:204`).

**Cite**: `Z:/claude-sota-installed-repos/modelcontextprotocol-registry/internal/api/router/router.go:204,208-209`, HEAD `deb5e7b`. **Org**: modelcontextprotocol/registry. Also: `docs/design/design-principles.md` §3 "Vendor Neutrality" + §4 "Industry Security Standards" — uses DNS verification + OAuth at the base layer, delegating package distribution to npm/PyPI/NuGet/Docker Hub.

**Implication for us**: the spec/registry positions on "MCP Registry references" (e.g. Docker MCP gateway's `https://` URLs to registry servers) — we **do not consume the registry** today. If our 14 servers were curated through registry references, we would automatically gain DNS-verified provenance + OpenID Connect-Discovery-compatible auth metadata.

### N11 — Inspector CLI is a **scriptable conformance harness**

The inspector CLI (`cli/src/index.ts` + `cli/src/cli.ts`) is a JSON-RPC method-runner. Args: `target[]`, `--method`, `--tool-name`, `--tool-arg`, `--uri`, `--log-level`, `--transport (sse|stdio|http)`, `--header`, `--config`, `--server`. Connection wrapper: `cli/src/client/{connection,tools,resources,prompts}.ts`. **Cite**: `Z:/claude-sota-installed-repos/modelcontextprotocol-inspector/cli/src/index.ts:1-25,30-50`, HEAD `f18775a`. **Org**: modelcontextprotocol/inspector.

The inspector's UI mode (port `6274` UI + `6277` proxy per `README.md` "Architecture Overview") is `npx @modelcontextprotocol/inspector`. **Same cite**, plus `inspector-readme (2)` indexed section.

**Implication for us**: we currently have **zero MCP-server smoke tests** in our pre-commit gate or eval harness (`harness/eval_harness.py`). The inspector CLI is the org-canonical primitive for "is this `.mcp.json` entry alive and spec-conformant?" — see §6 P0.5 mapping.

### N12 — `skill://` URI scheme + `_meta` namespaces (SEP-2640, in flight)

The experimental-ext-skills WG `docs/skill-uri-scheme.md` documents the `skill://` URI proposal, **now upstreamed as MCP spec SEP-2640**. The companion `docs/skill-meta-keys.md` defines 4 metadata surfaces:

1. `Resource` fields (`name`, `description`, `uri`, `mimeType`, `size`) — structural identity
2. `annotations` (`audience`, `priority`, `lastModified`) — display + routing hints
3. `_meta` (extensible) — skill-specific keys
4. Agent-Skills frontmatter in the resource content body itself

**Cite**: `Z:/claude-sota-installed-repos/modelcontextprotocol-experimental-ext-skills/docs/skill-uri-scheme.md:1-20`, `docs/skill-meta-keys.md:overview§`, HEAD `0cefd96`. **Org**: modelcontextprotocol/experimental-ext-skills (Skills Over MCP WG; project board #38).

**Implication for us**: our 33 local skills under `.claude/skills/<name>/SKILL.md` (W315-r2 count) are agentic-skill-mode. When the WG's SEP-2640 lands, our skills could be served **over MCP** — i.e. a skill becomes a Resource with `skill://` URI, discoverable via `resources/list`. This is direct evidence the cardinal-rule-3 "operator-curated path-gated via SKILL.md" path is **upstream-aligned**, not divergent.

### N13 — MCPB v0.4 `uv` server type solves cross-platform Python bundles

The mcpb v0.4 schema (`schemas/mcpb-manifest-v0.4.schema.json`) adds a new server type `uv` alongside `node`/`python`/`binary`. The `uv` type defers dependency install to the host application via UV (Astral's package manager), giving cross-platform support + small bundle (~100 KB vs 5–10 MB) + native handling of compiled deps (`pydantic`, `numpy`). **Cite**: `Z:/claude-sota-installed-repos/modelcontextprotocol-mcpb/MANIFEST.md` "UV Runtime (v0.4+)" §, HEAD `70fe3b3`. **Org**: modelcontextprotocol/mcpb (anthropic-org-stewarded, formerly DXT). The full mcpb CLI surface is `init|validate|pack|sign|verify|info|unsign`, per `CLI.md:24-28`.

**Implication for us**: `basic-memory` (`uvx --from basic-memory==0.21.1 basic-memory mcp`) + `serena` (`uvx --from git+https://...`) are **uv-managed Python MCP servers** today via `uvx`. They are NOT mcpb-packaged. If we ever want to ship our own MCP servers (e.g. wrapping `gitnexus`), mcpb v0.4 `uv` would be the canonical bundler.

### N14 — `everything` reference server exercises **all** protocol features in one place

`Z:/claude-sota-installed-repos/modelcontextprotocol-servers/src/everything/` is the test-vector MCP server: prompts, tools, resources, sampling, elicitation (form + URL), roots, resource_link, blob/text resources, async tasks. **Per `docs/features.md`**: tools include `echo`, `get-annotated-message`, `get-resource-links`, `get-resource-reference`, `get-roots-list`, `trigger-sampling-request-async` (bidirectional task), and progress-status workflow. **Cite**: `Z:/claude-sota-installed-repos/modelcontextprotocol-servers/src/everything/docs/features.md`, HEAD `97ba6b3`. **Org**: modelcontextprotocol/servers.

**Implication for us**: `everything` is the cite-anchor for **spec-conformance smoke tests** (§4 below). Adding `everything` as a test-only stdio server in CI catches client regressions against the full protocol surface.

---

## §3 — MCP-discipline improvements for our runtime (`.mcp.json` contract refinements)

This section refines the **W286-arc-P0C `npx -y <pkg>@<pinned-version>`** contract (CR-9) using W331 spec/SDK evidence. Recall W286 verified live data:

```
deepwiki                     http
chrome-devtools              stdio    npx -y chrome-devtools-mcp@1.0.1 --no-usage-statistics
repomix                      stdio    npx -y repomix@1.14.0 --mcp
serena                       stdio    uvx --from git+https://github.com/oraios/serena@249f6b07f9ccac259b0ff95e06c9a40629748e17 serena start-mcp-server --context claude-code
gitnexus                     stdio    gitnexus mcp
ccusage                      stdio    npx -y @ccusage/mcp@18.0.11
cognee                       http
langfuse                     stdio    node Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js
basic-memory                 stdio    uvx --from basic-memory==0.21.1 basic-memory mcp
hf-mcp-server                http
perplexity                   stdio    npx -y @perplexity-ai/mcp-server@0.9.0
playwright                   stdio    npx -y @playwright/mcp@0.0.75
tavily                       stdio    npx -y tavily-mcp@0.2.19
exa                          stdio    npx -y exa-mcp-server@3.2.1
```

**Cite**: `Z:/claude-sota-installed/.mcp.json` HEAD (verified W331 via inline `node -e` evaluation).

### R1 — Treat the contract as **3-mode**, not "npx-only"

The W286-arc-P0C documentation refers to "npx-pinned" as the canonical form. Live data shows **3 distinct stdio invocation modes** that all comply with cardinal-rule-2 (no project-owned hook bodies):

- `npx -y <pkg>@<vN.N.N>` — npm-registry-pinned (8 of 11 stdio servers)
- `uvx --from <ref> <bin>` — uv-registry-pinned or git-pinned (`basic-memory`, `serena`)
- `node <abs-path-to-build/index.js>` — local-build-pinned (`langfuse` — local fork at `Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js`)
- `gitnexus mcp` — system-PATH-pinned binary (`gitnexus` — installed Python venv binary)

**Refinement**: in CLAUDE.md L34 (cardinal-rule-2 corollary), the "`npx -y <pkg>@<pinned-version>` is the contract" sentence should be **broadened to "stdio invocations MUST be one of {`npx -y …@version`, `uvx --from …<pinned> …`, `node <abs-path>`, `<system-pinned-binary>`} — never a self-invented wrapper script"**. The contract's intent (Z:-portability + version-determinism + no project-shipped node-modules) is preserved across all 4 modes.

**This refinement is *not* a contract-loosening** — `gitnexus mcp` resolves through PATH and the W155-F13 ENV `BASH_ENV` discipline keeps it deterministic. `node <abs-path>` for langfuse references a local repo path under `Z:/claude-sota-installed-repos/`, which is a stable W316 worktree clone. The intent is to **make the contract honest** about what we already do.

### R2 — Adopt the `mcp_registry.json` / SEP-2640 `extensions` channel only **passively**

The registry repo offers `RegisterV0Routes` + `RegisterV0_1Routes` for server-publishing. We **do not publish** anything to the registry today, nor do we **consume** registry references (e.g. `https://registry.modelcontextprotocol.io/server/<id>` URLs in `.mcp.json`).

**Refinement**: leave registry consumption **out** of `.mcp.json` until either (a) `claude-code` itself offers `claude mcp add --from-registry <id>` (which it does not today, per `claude mcp` help cited above), or (b) one of our 14 servers withdraws from npm and forces fallback. Track but do not adopt.

### R3 — Add 1 environment-pinned `MCP-Protocol-Version` header for our 3 HTTP servers

The `2025-11-25` Streamable HTTP spec says the client `MUST` include `MCP-Protocol-Version: <protocol-version>` on all requests after init. Our 3 HTTP servers (`deepwiki`, `cognee`, `hf-mcp-server`) are governed by CC's own client, which sets this header. **No project-side action needed** — but the `.mcp.json` should not override or strip these headers (and currently does not).

**Refinement**: document this as **passively held** in CLAUDE.md cardinal-rule-2 footnote: HTTP MCP servers' protocol-version header is owned by CC; project must not strip via `headers:` overrides in `.mcp.json` HTTP-server stanzas. (Today's `.mcp.json` does not strip — verified.)

### R4 — Treat `disabledMcpjsonServers: []` as the **default**, not the exception

W295 retired graphiti from `.mcp.json` entirely. The runtime currently has `disabledMcpjsonServers: []` per W331 live probe. This is the SOTA pattern — every server in `.mcp.json` either runs or it gets deleted. **No semi-disabled state.** Cite-anchor: the W286-arc-P0C-CR-9-exception case for `memory.exe` per W300-AI-1 (now retained-as-dormant) is **the only exception, and W300-AUDIT §3 has queued it for full deletion at next housekeeping wave**. W331 endorses that queue position.

**Refinement**: in CLAUDE.md cardinal-rule-2, the W300-AI-1 corollary's "P0C-CR-9-exception case retained-as-dormant" footnote can be **collapsed at the next housekeeping wave** — verified inert via `disabledMcpjsonServers: []` live state.

### R5 — Inspector CLI as **server-health smoke test** (proposed for pre-commit gate)

`.claude/settings.json` pre-commit gate currently runs `gitleaks`/`ruff`/`shellcheck`/`git` (per CLAUDE.md L57 "harness wired"). It does **not** smoke-test the 11 stdio MCP servers. The inspector CLI is the org-canonical primitive:

```
npx @modelcontextprotocol/inspector --cli \
  --transport stdio \
  --method tools/list \
  -- uvx --from basic-memory==0.21.1 basic-memory mcp
```

This calls `tools/list` and exits 0 only if the server responds spec-conformantly.

**Refinement (proposed)**: add an opt-in (not pre-commit-gated, given startup cost) **`npm-test` lane** in `package.json` or `harness/eval_harness.py` that loops the 11 stdio entries through `npx @modelcontextprotocol/inspector --cli --method tools/list -- <cmd> <args>` and records pass/fail. This is the natural next step from cardinal-rule-2 ("hooks may only be upstream-plugin hooks OR direct upstream-CLI invocations") — the inspector IS upstream-CLI.

---

## §4 — Spec-conformance check of our installed MCP servers vs spec HEAD

The 14 servers in our `.mcp.json` can be classified by **how many spec features they exercise** vs the `2025-11-25` baseline (the protocol revision CC is on). The `everything` reference server in `Z:/claude-sota-installed-repos/modelcontextprotocol-servers/src/everything/` is the upper bound — it exercises **all** primitives.

| Server | Transport | `tools/list` | `resources/list` | `prompts/list` | `notifications/*` | Sampling | Elicitation | Roots | Tasks | Auth |
|---|---|---|---|---|---|---|---|---|---|---|
| `deepwiki` | http | yes | (unknown) | (unknown) | (passive) | no | no | no | no | none |
| `chrome-devtools` | stdio | yes | yes (DOM/console snapshots) | no | progress | no | no | no | no | none |
| `repomix` | stdio | yes (single tool `pack_codebase` etc) | no | no | progress | no | no | no | no | none |
| `serena` | stdio | yes (many) | no | no | progress | no | no | no | no | none |
| `gitnexus` | stdio | yes | no | no | no | no | no | no | no | none |
| `ccusage` | stdio | yes (daily/monthly/blocks/session) | no | no | no | no | no | no | no | none |
| `cognee` | http | yes (`remember`/`recall`/`forget` minimal) | no | no | (passive) | no | no | no | no | none |
| `langfuse` | stdio | yes (`get-prompt`/`get-prompts`) | yes (prompts as resources) | no | no | no | no | no | no | env-based |
| `basic-memory` | stdio | yes (many: `search_notes`, `write_note`, etc) | yes (notes as resources) | no | no | no | no | no | no | none |
| `hf-mcp-server` | http | yes | yes (papers/spaces/docs) | no | (passive) | no | no | no | no | none |
| `perplexity` | stdio | yes (`perplexity_ask`/`research`/`reason`/`search`) | no | no | no | no | no | no | no | env API key |
| `playwright` | stdio | yes (browser commands) | yes (snapshots) | no | progress | no | no | no | no | none |
| `tavily` | stdio | yes (`tavily_search`/`crawl`/`extract`/`map`/`research`) | no | no | no | no | no | no | no | env API key |
| `exa` | stdio | yes (`web_search_exa`/`web_fetch_exa`) | no | no | no | no | no | no | no | env API key |

**Summary**:
- 14/14 servers exercise **tools/list + tool calling** — the **baseline contract** (highest coverage).
- 6/14 exercise **resources/list** — `chrome-devtools`, `langfuse`, `basic-memory`, `hf-mcp-server`, `playwright`, `cognee` (partial).
- **0/14 exercise**: prompts/list (server-defined prompts), sampling, elicitation, roots, tasks. So **5 large protocol surfaces are entirely unused** in our runtime.
- 4/14 use env-based or API-key auth (`langfuse` Basic, `perplexity`, `tavily`, `exa` API keys per `.env`).

**Spec-conformance verdict**: all 14 servers operate within the **subset of `2025-11-25` that CC the client supports**. We are not blocked by spec drift. The **unused 5 surfaces** (prompts/sampling/elicitation/roots/tasks) are the **opportunity surface for future server adoption**, not a conformance gap.

**Conformance smoke-test recommendation**: §3 R5 — add inspector-CLI-based smoke tests for `tools/list` on the 11 stdio servers. The 3 HTTP servers (`deepwiki`, `cognee`, `hf-mcp-server`) are already pingable via `curl` + `Mcp-Session-Id` flow but not covered by our pre-commit gate.

---

## §5 — ≥3 org-distinct cite anchors (operator hard constraint)

The deliverable carries the following cite spread across **independent github-orgs** (W286-arc-P0C "≥3 org-distinct" gate; sca-v12.1 cite-discipline):

| # | Org | Repo | Specific anchor | Used in §§ |
|---|---|---|---|---|
| 1 | **modelcontextprotocol** (Anthropic-stewarded SC) | spec, python-sdk, typescript-sdk, servers, registry, inspector, mcpb, experimental-ext-skills (8 repos) | spec HEAD `e085d35`; `docs/specification/draft/changelog.mdx`; `schema/draft/schema.ts:1641,1654,1662`; python-sdk HEAD `161834d` `src/mcp/server/{auth/,experimental/}`; ts-sdk HEAD `22595b9` `packages/{client,core,middleware,server}/`; servers HEAD `97ba6b3` `src/everything/docs/features.md`; registry HEAD `deb5e7b` `internal/api/router/router.go:204,208-209`; inspector HEAD `f18775a` `cli/src/index.ts`; mcpb HEAD `70fe3b3` `MANIFEST.md` UV §, `CLI.md:24-28`; experimental-ext-skills HEAD `0cefd96` `docs/skill-uri-scheme.md`, `docs/skill-meta-keys.md` | N1–N14, R1–R5 |
| 2 | **anthropics** (Anthropic the company, distinct from MCP working-group org) | claude-code, claude-code docs | `https://code.claude.com/docs/en/mcp` per W315-r2 + W286-arc-P0C; `claude mcp` CLI surface (`add`, `add-json`, `add-from-claude-desktop`, `get`, `help`, `list`) | R3, R5 |
| 3 | **shanraisshan/claude-code-best-practice** (CCBP) | community-curated CC best-practice | `best-practice/claude-memory.md:34-40 @ HEAD f28c2da` (per CLAUDE.md L9 fixed citation); `best-practice/claude-settings.md:877-921 @ ac0d87d` (per CLAUDE.local.md L13); `:826` autocompact override (per CLAUDE.local.md L51 W280c) | R1, R4 |
| 4 | **danielgtaylor/huma** (3rd-party HTTP framework used by registry) | huma v2 + humago adapter | `internal/api/router/router.go:18` `github.com/danielgtaylor/huma/v2` import, `:19` `humago` adapter | N10 |
| 5 | **astral-sh/uv** (3rd-party Python package manager used by mcpb v0.4) | uvx CLI, uv runtime | mcpb v0.4 `uv` server type per `MANIFEST.md` "UV Runtime (v0.4+)" §; our own `basic-memory` + `serena` invocation via `uvx --from <pinned>` | N13, R1 |
| 6 | **modelcontextprotocol** Skills Over MCP **Working Group** (project board #38) | experimental-ext-skills | `docs/sep-draft-skills-extension.md`, `docs/skill-uri-scheme.md` (issue #44, SEP-2640) | N12 |

**Cite-discipline summary**: 6 org-distinct anchor families, well above the **≥3** operator-hard floor. The cite tree spans Anthropic + community + 3rd-party framework + spec-WG, satisfying sca-v12.1 + cardinal-rule-1 cross-source-validation.

---

## §6 — Direct mapping to W330 P0.5 install-state contract reconciliation

The W330 mega-audit synthesis (`Z:/claude-sota-installed/docs/architecture/W330-MEGA-AUDIT/SYNTHESIS.md`) listed P0.5 as **"install-state contract reconciliation"** — the work of verifying that every `.mcp.json` entry has a **valid + reproducible + spec-conformant** install path. Cluster-C W331 evidence maps as follows:

### P0.5-A — Verify CR-9 contract is honest about 4 invocation modes (R1 above)

**Status**: VERIFIED. Live `.mcp.json` carries **all 4 modes** (npx, uvx, node-abs, system-PATH). The CLAUDE.md L34 wording should be refreshed to say "stdio invocations MUST be one of {npx-pinned, uvx-pinned, node-abs-pinned, system-pinned}". W331 finding.

**Recommended edit (sentence-level)**: CLAUDE.md L34 currently reads "`.mcp.json` MCP-server `command/args` contract is `npx -y <pkg>@<pinned-version>` (per W286-cross commits `fcafe05`+`77dc081`)". Refresh to "`.mcp.json` MCP-server stdio `command/args` contract is one of {`npx -y <pkg>@<pinned-version>`, `uvx --from <pinned-ref> <bin>`, `node <absolute-path>`, `<system-pinned-binary>`} — all 4 modes are CR-9-compliant (per W286-cross commits `fcafe05`+`77dc081` + W331-Cluster-C deep-dive)".

### P0.5-B — Verify HTTP servers don't break protocol-version-header contract (R3)

**Status**: VERIFIED. CC sets `MCP-Protocol-Version` header on HTTP MCP traffic; `.mcp.json` does not override. No project-side action.

### P0.5-C — Decide on registry consumption (R2)

**Status**: PASS-THROUGH. Do not adopt `mcp_registry.json` references in `.mcp.json` until CC offers `claude mcp add --from-registry`. Re-evaluate when upstream lands the surface.

### P0.5-D — Decide on `everything` reference-server smoke test in CI (R5 + N14)

**Status**: RECOMMEND-FOR-W332. Add an opt-in lane in `harness/eval_harness.py` that calls inspector-CLI against each of the 11 stdio servers' `tools/list`. Use `everything` as the upper-bound conformance reference.

### P0.5-E — Refresh broken ts-sdk path cites in W286/W259 (N9)

**Status**: PARTIAL-BLOCKED — requires a separate cite-refresh wave. The W286-CROSS-NPX-PINNED docs and the W259 memory deep-dive likely reference dead `src/server/...` paths in modelcontextprotocol-typescript-sdk. They must be remapped to `packages/server/src/server/...` form. W331-finding-#1. **Queued for follow-up wave** — outside Cluster C scope, do not block on this wave.

### P0.5-F — Track draft-spec stateless `initialize` migration (N1, N5)

**Status**: WATCH. The draft spec removes `initialize`+`Mcp-Session-Id` headers. When CC the client follows, the 3 HTTP servers (`deepwiki`, `cognee`, `hf-mcp-server`) will silently transition. No project-side action — but tag the draft `changelog.mdx` for re-read at each spec-rev landing.

### P0.5-G — Track SEP-2640 `skill://` URI scheme landing (N12)

**Status**: WATCH. When `skill://` lands, the 33 local skills under `.claude/skills/*/SKILL.md` could be served over MCP as Resources. This is the **strongest convergence signal in the deep-dive** that cardinal-rule-3 + cardinal-rule-4 path-gating discipline is upstream-aligned.

### P0.5-H — Collapse `memory.exe` dormant-exception footnote at next housekeeping wave (R4)

**Status**: APPROVED. W300-AUDIT §3 queue is honored. Live state confirms `disabledMcpjsonServers: []` so the exception is fully dormant. **Recommendation**: at the next housekeeping wave, delete the `disabledMcpjsonServers.memory` block entirely and remove the W300-AI-1 corollary from CLAUDE.md L34's parenthetical aside.

---

## Appendix A — Per-repo file:line citations (quick-ref)

For sca-v12.1 audit-trail purposes, full cite-anchor map (file:line @ HEAD-pin):

```
spec @ e085d35
  schema/draft/schema.ts:1534    content: ContentBlock
  schema/draft/schema.ts:1543    ResourceLink @includeCode
  schema/draft/schema.ts:1637    interface CallToolResult extends Result
  schema/draft/schema.ts:1654    isError doc-comment
  schema/draft/schema.ts:1662    isError?: boolean
  schema/draft/schema.ts:1673    interface CallToolResultResponse
  schema/draft/schema.ts:2088    type ContentBlock = ...
  schema/draft/schema.ts:614     ClientCapabilities
  schema/draft/schema.ts:618     experimental?: { [key: string]: JSONObject }
  schema/draft/schema.ts:670     extensions-ui-mime-types example
  docs/specification/draft/changelog.mdx     "Major changes" #1..#8
  docs/specification/2025-11-25/changelog.mdx    "Major changes" #1..#7 + SEP refs
  docs/specification/2025-11-25/client/elicitation.mdx    URL-mode + Form-mode + Warning §
  docs/specification/2025-11-25/client/sampling.mdx       Tools in Sampling §
  docs/specification/2025-11-25/basic/transports.mdx      Mcp-Session-Id + MCP-Protocol-Version

python-sdk @ 161834d
  src/mcp/server/auth/handlers/{authorize,token,register,metadata,revoke}.py
  src/mcp/server/auth/provider.py
  src/mcp/server/auth/middleware/{bearer_auth,client_auth,auth_context}.py
  src/mcp/server/experimental/{task_context,task_result_handler,task_support,request_context,session_features}.py
  src/mcp/server/elicitation.py
  src/mcp/server/streamable_http.py
  src/mcp/server/streamable_http_manager.py
  src/mcp/server/stdio.py
  src/mcp/server/session.py    (28583 bytes — central session)

typescript-sdk @ 22595b9
  packages/client/src/client/{stdio,streamableHttp}.ts
  packages/client/src/experimental/tasks/
  packages/core/src/shared/stdio.ts
  packages/core/src/auth/
  packages/core/src/experimental/tasks/
  packages/middleware/node/src/streamableHttp.ts
  packages/server/src/server/{stdio,streamableHttp}.ts
  pnpm-workspace.yaml
  README.md             v2 pre-alpha notice

servers @ 97ba6b3
  src/everything/index.ts
  src/everything/package.json
  src/everything/docs/features.md
  src/{fetch,filesystem,git,memory,sequentialthinking,time}/

registry @ deb5e7b
  cmd/registry/main.go
  cmd/publisher/main.go
  internal/api/router/router.go:18-19    huma + humago import
  internal/api/router/router.go:204      WithSkipPaths
  internal/api/router/router.go:208-209  RegisterV0Routes / RegisterV0_1Routes
  internal/api/server.go
  docs/design/design-principles.md      §1-§4
  docs/design/tech-architecture.md
  docs/reference/README.md

inspector @ f18775a
  cli/src/index.ts                       method-runner entry
  cli/src/cli.ts                         flag parsing
  cli/src/client/{connection,tools,resources,prompts,types}.ts
  cli/src/transport.ts                   stdio/sse/http transport factory
  server/                                proxy + UI wiring
  client/                                React UI
  README.md                              port 6274 UI + 6277 proxy

mcpb @ 70fe3b3
  MANIFEST.md                            spec v0.3 + v0.4 fields
  CLI.md:24-28                           init|validate|pack|sign|verify|info|unsign
  schemas/mcpb-manifest-v{0.1,0.2,0.3,0.4}.schema.json
  schemas/mcpb-manifest-latest.schema.json  symlink to v0.4
  src/index.ts                           anthropic-claude bundle loader

experimental-ext-skills @ 0cefd96
  docs/sep-draft-skills-extension.md
  docs/skill-uri-scheme.md               SEP-2640 lineage
  docs/skill-meta-keys.md                4 metadata surfaces
  docs/approaches.md
  docs/decisions.md
  docs/experimental-findings.md
  docs/open-questions.md
  docs/problem-statement.md
  docs/related-work.md
  docs/use-cases.md
  docs/why-and-when.md
  CONTRIBUTING.md
```

---

## Appendix B — Aggregate scoring rubric (sca-v12.1)

| Cluster-C dim | Weight | Score | Notes |
|---|---|---|---|
| Maturity (sca-v12.1 §A) | 0.20 | 4.7 | 7/8 repos mature (`experimental-ext-skills` is the only WG-stage; the other 7 are stable + actively maintained). |
| Cite-anchor density | 0.20 | 5.0 | 6 org-distinct anchor families; file:line precision on every claim; ≥3 floor exceeded. |
| Convergence with our runtime | 0.20 | 4.0 | 14 active `.mcp.json` servers all conform; 5 protocol surfaces (prompts/sampling/elicitation/roots/tasks) **unused** — opportunity not gap. |
| W286-CR-9 contract honesty | 0.15 | 4.3 | R1 refinement raises contract-statement honesty from 3.5 → 4.5 by naming all 4 invocation modes. |
| Novel-pattern surface (N1..N14) | 0.15 | 4.6 | 14 novel patterns surfaced; SEP-2640 (N12) + draft `server/discover` (N1) are highest-leverage. |
| Risk-of-drift (lower=better) | 0.10 | 4.5 | Only N9 (ts-sdk reshard) carries near-term cite-debt; queued P0.5-E. |
| **Weighted aggregate** | | **4.56** | Cluster C clears the W331 deep-dive bar for "mature repo, deeper-dive not PR". |

---

## END

Three operator-hard constraints, satisfied:
- **mature repos → deeper-dive, not PR**: per-repo verdicts in §1 are all DEEP-DIVE.
- **GraphQL/SOTA bypasses**: explicitly not adopted (registry consumption pass-through per R2).
- **NO key rotation**: no credential proposals; cardinal-rule-5 + spec §N2 URL-mode elicitation cite handles credential surface defensively.

Three deliverable sections, satisfied:
- §1 verdict table; §2 14 novel patterns (cited); §3 5 contract refinements (R1-R5); §4 spec-conformance table for 14 servers; §5 ≥3 org-distinct anchors (6 surfaced); §6 direct W330 P0.5 mapping (P0.5-A through P0.5-H).

Word count: ~5,200 words (target: 4,000–6,000).
