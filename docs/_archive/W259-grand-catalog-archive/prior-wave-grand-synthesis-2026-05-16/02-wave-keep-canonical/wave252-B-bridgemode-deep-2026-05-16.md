STAND-IN-NOTICE: agent ran under CLAUDE_CODE_SUBAGENT_MODEL stand-in; verdict is Sonnet stand-in only; cross-model gate NOT structurally satisfied for this dispatch
VERDICT-SUMMARY-AXIS-1: Apify MCP = STUDY-PILOT.b top net-new browser/web MCP; Microsoft Playwright MCP + Chrome DevTools MCP are already wired in pure-runtime, so INSTALL-NOW would be duplicate/no-op
VERDICT-SUMMARY-AXIS-2: Anthropic 2026-04+ sandbox primitive count = 25 net-new primitives (23 documented sandbox settings + /sandbox command + @anthropic-ai/sandbox-runtime)
VERDICT-SUMMARY-AXIS-3: CI/CD demand-gate verdict = REJECT-FOR-FIT.a for install-now; no named pure-runtime GitHub workflow currently routes through base-action/security-review/gh-aw
VERDICT-SUMMARY-AXIS-4: OTel-compatible observability top-pick = Langfuse first, Opik second; Phoenix remains REJECT-LICENSE under ELv2

# Wave 252 Agent B Bridge-Mode Deep Dive

Scope: four under-explored pure-runtime architecture axes for `Z:/claude-sota-pure/`.

Evidence caveat: this Codex session did not expose the requested `mcp__github__*`, `mcp__deepwiki__*`, or `mcp__context7` tools. I used GitHub/web/direct docs fallback. Cite anchors below use official repo/doc line references where the browser renderer exposed lines, and HEAD SHAs from `git ls-remote` where available. This does not structurally satisfy the requested MCP-tool path.

Local pure-runtime anchors:

- `Z:/claude-sota-pure/.mcp.json:51-58` already wires `chrome-devtools` via `npx -y chrome-devtools-mcp@latest` and `playwright` via `npx -y @playwright/mcp@latest`.
- `Z:/claude-sota-pure/docs/sota-installed-manifest.md:188` marks `browser-use` installed/imported.
- `Z:/claude-sota-pure/docs/sota-installed-manifest.md:231` marks `@playwright/mcp` already installed/no-op.
- `Z:/claude-sota-pure/PROGRESS.md:53` lists MCP wiring phase including native-pin existing playwright/chrome-devtools.
- `Z:/claude-sota-pure/docs/operator-runbook-W221-execute-playbook-2026-05-15.md:289-297` treats playwright/chrome-devtools as operator MCP items.
- `Z:/claude-sota-pure/docs/operator-runbook-W221-execute-playbook-2026-05-15.md:379` says workflow-gated items remain queued pending workflow demand.

## Axis 1 - Browser-MCP Ecosystem

Probe-DAG summary:

- Probe 1 existence: PASS for `microsoft/playwright-mcp`, `ChromeDevTools/chrome-devtools-mcp`, `browser-use/browser-use`, `executeautomation/mcp-playwright`, `apify/apify-mcp-server`; FAIL/UNKNOWN for `axe-core/axe-mcp` under that exact repo path; `apify/apify-mcp` exact old name appears superseded by `apify/apify-mcp-server`.
- Probe 2 license: PASS for Apache-2.0/MIT candidates except unresolved exact `axe-core/axe-mcp`; no GPL/AGPL/SSPL/ELv2 accepted here.
- Probe 3 install channel: PASS for npm/uvx/hosted MCP candidates.
- Probe 4 plugin namespace duplicate: `playwright` and `chrome-devtools` are already in `Z:/claude-sota-pure/.mcp.json:51-58`; `browser-use` already installed as Python package at manifest line 188, not MCP-wired; Apify is not locally wired.
- Probe 5 adoption: PASS for Microsoft/ChromeDevTools/Browser-use/ExecuteAutomation/Apify by stars/releases/docs; Apify lower than Playwright/ChromeDevTools but net-new.
- Probe 6 registry/existence: PASS for ChromeDevTools MCP registry page/tool list, Apify hosted MCP docs, Playwright docs; Browser-use MCP docs; ExecuteAutomation Smithery/mcp-get docs.

Candidate findings:

1. `microsoft/playwright-mcp`
   - HEAD: `ae27b8638aaf3a6be17d378964ae683864d20440`.
   - License/adoption: Apache-2.0, ~32.1k stars, releases through v0.0.74 on 2026-05-06 per GitHub repo page.
   - Tool surface: README says it is an MCP server for browser automation using Playwright and accessibility snapshots at `README.md:2223-2225 @ ae27b863`.
   - Fit: strong canonical browser automation server, but local duplicate. Pure-runtime already has `@playwright/mcp@latest` in `.mcp.json:55-58`.
   - CR-12: CITE-CLASS-CANONICAL / DUPLICATE-FUNCTIONALITY locally.
   - Verdict: REJECT-FOR-FIT.a for install-now; NO-OP/KEEP existing wiring.

2. `ChromeDevTools/chrome-devtools-mcp`
   - HEAD: `041b2083781e4c2f027ea9c71479e4db3beb7fa7`.
   - License/adoption: Apache-2.0, ~38.4k stars, latest v0.25.0 on 2026-05-06 per GitHub repo page.
   - Tool surface: Chrome DevTools MCP exposes Chrome debugging, performance, console/network/screenshot/memory/extension tools; registry snippet listed ~42 tools across input/navigation/emulation/performance/network/debugging/memory/extensions/WebMCP.
   - Install channel: README gives `npx -y chrome-devtools-mcp@latest`, Claude Code `claude mcp add`, plugin install, Codex CLI, VS Code, Gemini, etc. at `README.md:367-441 @ 041b208`; it also documents usage telemetry opt-out env/flag at `README.md:344-358 @ 041b208`.
   - Fit: already wired in pure-runtime `.mcp.json:51-54`.
   - CR-12: PROVIDER-COMPLEMENT to Playwright (DevTools/perf/memory focus) but duplicate locally.
   - Verdict: REJECT-FOR-FIT.a for install-now; KEEP existing wiring; add `--no-usage-statistics` if telemetry policy demands.

3. `browser-use/browser-use`
   - HEAD: `933e28c599ddd74c15a48568f159da95547e40dd`.
   - License/adoption: MIT; ~10.5k forks and high-star repo per GitHub page snippet.
   - Paradigm: primarily Python browser agent library, not originally MCP-native; current docs say Browser Use can run as a local MCP server over stdio via `uvx --from 'browser-use[cli]' browser-use --mcp` at docs lines 89-98 and Claude/Cursor configs at lines 111-153.
   - Fit: pure-runtime already imports browser-use as a Python package (`sota-installed-manifest.md:188`), but no local MCP server entry.
   - CR-12: PARTIAL-OVERLAP / PROVIDER-COMPLEMENT if a high-level autonomous web agent is needed; duplicate for low-level browser control.
   - Verdict: STUDY-PILOT.b only if a named task needs high-level goal-driven browsing beyond Playwright/ChromeDevTools.

4. `executeautomation/mcp-playwright`
   - HEAD: `2349c2891e7c499c8c07b7d78c7f3fb4c797a1da`.
   - License/adoption: MIT; ~5.5k stars, 500+ forks per GitHub page.
   - Tool/install: README advertises npm package `@executeautomation/playwright-mcp-server`, VS Code install at lines 372-379, browser auto-install at lines 381-389, stdio config at lines 410-423.
   - Fit: distinct community implementation, but functionally shadows Microsoft Playwright MCP. Local catalog already labels it duplicate (`docs/sota-research-CATALOG-2026-05-15.md:96`).
   - CR-12: DUPLICATE-FUNCTIONALITY.
   - Verdict: REJECT-FOR-FIT.a.

5. `axe-core/axe-mcp`
   - Exact repo probe: `git ls-remote https://github.com/axe-core/axe-mcp.git HEAD` returned repository-not-found/auth failure in this session; search found third-party/news claims for an axe MCP server but no exact public repo evidence under `axe-core/axe-mcp`.
   - License: UNKNOWN for exact repo.
   - Fit: accessibility scanner would be genuinely useful, but existence/license cannot pass.
   - CR-12: UNKNOWN.
   - Verdict: REJECT-FOR-FIT.a until exact public repo + permissive license are verified.

6. `apify/apify-mcp-server` / package `@apify/actors-mcp-server`
   - HEAD: `09f693243d0ee0db448aa7aef33d8f97f90c831f` from `apify/actors-mcp-server`; current GitHub canonical page is `apify/apify-mcp-server`.
   - License/adoption: MIT; ~1.2k stars, 165 forks, latest 0.10.4 on 2026-05-13 per repo page lines 801-832.
   - Tool surface: Apify MCP lets agents use Apify Actors for Facebook/Google Maps/Google Search/Instagram/RAG web browser scraping at repo lines 385-390, and supports hosted OAuth/streamable HTTP plus local stdio at lines 396-404.
   - Official docs: hosted `https://mcp.apify.com` supports structured output schema inference at docs lines 109-116; local stdio config uses `npx -y @apify/actors-mcp-server` with `APIFY_TOKEN` at docs lines 239-252; tool selection can restrict actors at docs lines 253-262.
   - Fit: net-new category versus local Playwright/ChromeDevTools: cloud/hosted web scraping and Actor ecosystem, but needs Apify account/token and data egress review.
   - CR-12: PROVIDER-COMPLEMENT.
   - Verdict: STUDY-PILOT.b top net-new browser/web MCP. Install only behind a named scraping/research workflow and token policy.

Axis-1 top pick: Apify MCP = STUDY-PILOT.b. It is the only audited candidate adding non-duplicate value to pure-runtime's already-wired Playwright + ChromeDevTools browser layer.

## Axis 2 - Anthropic 2026-04+ Sandboxing Primitives

Official docs anchors:

- Sandboxing overview: Claude Code native sandboxing uses OS-level primitives for filesystem and network isolation, reducing bash permission prompts (`sandboxing` docs lines 87-90).
- Filesystem isolation: default writes are cwd/subdirs; reads are broad except denied directories; `sandbox.filesystem.allowWrite` grants extra paths; enforced by Seatbelt/bubblewrap and inherited by subprocesses (`sandboxing` lines 111-120).
- Network isolation: proxy outside sandbox, domain restrictions, prompts/managed-domain-only mode, applies to subprocesses; built-in proxy does not inspect TLS (`sandboxing` lines 122-130).
- OS support: macOS Seatbelt, Linux/WSL2 bubblewrap; WSL1 unsupported (`sandboxing` lines 132-140).
- Prereqs: Linux/WSL2 require `bubblewrap` and `socat`; Ubuntu 24.04 AppArmor profile may be needed; WSL2 cannot launch Windows binaries from sandbox (`sandboxing` lines 147-174).
- Enablement: `/sandbox` command; `sandbox.failIfUnavailable=true` converts fallback warning into hard failure (`sandboxing` lines 177-183).
- Modes: auto-allow and regular permissions mode; auto-allow works independently of permission mode (`sandboxing` lines 186-189).
- Settings table: `settings` docs list sandbox keys at lines 355-381.
- Open source runtime: docs expose `npx @anthropic-ai/sandbox-runtime <command-to-sandbox>` at `sandboxing` lines 351-357.

Net-new primitive count: 25.

Count basis: `/sandbox`, `@anthropic-ai/sandbox-runtime`, and 23 settings: `enabled`, `failIfUnavailable`, `autoAllowBashIfSandboxed`, `excludedCommands`, `allowUnsandboxedCommands`, `filesystem.allowWrite`, `filesystem.denyWrite`, `filesystem.denyRead`, `filesystem.allowRead`, `filesystem.allowManagedReadPathsOnly`, `network.allowUnixSockets`, `network.allowAllUnixSockets`, `network.allowLocalBinding`, `network.allowMachLookup`, `network.allowedDomains`, `network.deniedDomains`, `network.allowManagedDomainsOnly`, `network.httpProxyPort`, `network.socksProxyPort`, `enableWeakerNestedSandbox`, `enableWeakerNetworkIsolation`, `bwrapPath`, `socatPath`.

Repo probes:

- `anthropics/cwc-long-running-agents` HEAD is `ad107a974bced5244f74dd283dbf2bfd3baee3a1`, which is after the requested baseline `ffd563d668a97a38d4aa092bf0d5b1507c046629`. GitHub page shows 3 commits, Apache-2.0, and long-running harness primitives (default-FAIL, fresh evaluator, agent handoff) at README lines 222-239 and 250-289.
- `anthropics/claude-code-sandbox` exact repo did not exist publicly via `git ls-remote` in this session.
- CC 2.1.x changelog sandboxing flags were not independently fetched as a changelog page; current official docs are treated as authoritative for active surface.

Top pure-runtime primitives:

- `sandbox.enabled=true` plus `failIfUnavailable=true`: makes sandboxing a hard runtime invariant for managed pure-runtime sessions.
- `filesystem.denyRead=["~/"]` plus `filesystem.allowRead=["."]`: workspace-only read posture, aligned with pure-runtime secret minimization.
- `filesystem.allowWrite`: explicit write roots for state/cache only; avoids blanket host writes.
- `network.allowedDomains` + `network.deniedDomains` + `allowManagedDomainsOnly`: deterministic egress surface for npm/PyPI/GitHub/OpenAI/Anthropic and no surprise exfil.
- `allowUnsandboxedCommands=false`: disables the `dangerouslyDisableSandbox` escape hatch except for explicit `excludedCommands`.
- `httpProxyPort`/`socksProxyPort`: lets pure-runtime route through an audited local proxy.
- `@anthropic-ai/sandbox-runtime`: useful wrapper to sandbox MCP servers or helper CLIs outside Claude Code proper.

Axis-2 verdict: INSTALL-NOW for policy design, but implementation must be OS-aware. On native Windows, docs still say native Windows sandboxing is planned; pure-runtime on Windows should use WSL2 or treat this as STUDY-PILOT until platform support lands.

## Axis 3 - CI/CD Agentic Harness Deep Audit

Demand gate:

- Probe 7.a local check: no root `.github/workflows` directory with active project workflows was found; shell enumeration only found plugin-cache `.github` directories and `.local/anthropic-quickstarts/.github`. `rg` found CI/action references in docs/runbooks only, not a shipped workflow.
- Local runbook says a generated `.github/workflows/claude-code-action.yml` is expected after install at `operator-runbook-W221...:282` and checked at lines 371-372, but this is not present as an active route.
- Therefore no candidate can be INSTALL-NOW under the demanded "named workflow that routes through each" gate.

Candidate findings:

1. `anthropics/claude-code-base-action`
   - HEAD: `44edf42cfe3ef2d5aec833187195ba9c2373a6b3`.
   - License/adoption: MIT, ~828 stars, 604 forks.
   - Function: base action lets workflows run Claude Code and build custom workflows on top of it at repo lines 305-309.
   - Security: README warns it is a thin wrapper and does not enforce trust boundaries; running it equals running Claude Code in that directory and caller must ensure trust; untrusted PR/comment flows should use the higher-level Claude Code action instead at lines 310-314.
   - Probe 7.b: would create a genuinely new custom CI agent harness only if pure-runtime has a named trusted workflow such as "nightly docs drift audit" or "post-merge SOTA catalog refresh".
   - Verdict: REJECT-FOR-FIT.a now; STUDY-PILOT.b when a trusted workflow file exists.

2. `anthropics/claude-code-security-review`
   - HEAD: `0c6a49f1fa56a1d472575da86a94dbc1edb78eda`.
   - License/adoption: MIT, ~4.6k stars, 442 forks.
   - Function: AI-powered security review GitHub Action for PR diffs at lines 253-263; quickstart workflow at lines 265-287.
   - Security: action is not hardened against prompt injection and should only review trusted PRs; maintainers should require approval for external contributors at lines 288-290.
   - Probe 7.b: new use case only if pure-runtime has PR flow with trusted contributor gate and security-review issue/PR reporting. Local demand absent.
   - Verdict: REJECT-FOR-FIT.a now; STUDY-PILOT.b for trusted PR-only security review.

3. `github/gh-aw`
   - HEAD: `f91a0784c178f40c657a5ce61a541a7454469cfc`.
   - License/adoption: MIT, ~4.5k stars, 387 forks, 11,533 commits.
   - Function: writes natural-language markdown workflows and runs them in GitHub Actions at lines 421-423.
   - Guardrails: read-only by default; write operations only via sanitized `safe-outputs`; includes sandboxed execution, input sanitization, network isolation, SHA-pinned dependencies, tool allow-listing, compile-time validation, team gates, and human approvals at lines 447-450.
   - Probe 7.b: strongest genuinely-new CI primitive, because it adds a markdown-to-GitHub-Actions compiler and guardrails distinct from Claude Code base-action. Still needs a concrete `.github/workflows/*.md` local route.
   - Verdict: STUDY-PILOT.b priority once pure-runtime creates first agentic CI workflow; not install-now.

4. Devin/Cursor/Aider CI patterns
   - Evidence: current cross-org public pattern is "agent commits/PRs then normal CI runs"; not a single permissive OSS CI harness that beats `gh-aw` or Anthropic actions for pure-runtime.
   - 2026 research risk: recent papers flagged reliability and injection risks in agentic workflows; any import must include prompt-boundary review and least-privilege token scopes.
   - Verdict: REJECT-FOR-FIT.a for now; cite-class only.

Axis-3 top verdict: `github/gh-aw` is the best future pilot, but demand gate blocks installation. Create a reversible, time-boxed workflow first, e.g. `.github/workflows/sota-doc-drift.md` compiling to `.lock.yml`, with read-only default permissions and only `safe-outputs:create-issue`.

## Axis 4 - OTel Gen-AI SemConv 2026-04 Drift

SemConv drift:

- `open-telemetry/semantic-conventions` HEAD: `317b57ad9ff377383603575d58b565b8deba8530`.
- The repo's `docs/gen-ai` directory now says GenAI semantic conventions moved to a dedicated OpenTelemetry GenAI semantic conventions repository and is no longer maintained in this repository at lines 283-289.
- Current `docs/gen-ai` still lists spec paths for `README.md`, `anthropic.md`, `aws-bedrock.md`, `azure-ai-inference.md`, `gen-ai-agent-spans.md`, `gen-ai-events.md`, `gen-ai-exceptions.md`, `gen-ai-metrics.md`, `gen-ai-spans.md`, `mcp.md`, and `openai.md` at lines 239-279.
- Release drift: v1.41.0 on 2026-04-28 includes a breaking `gen-ai` change requiring executed tool call span names to include the tool name at release lines 240-281. v1.41.1 on 2026-05-11 is latest at lines 178-223.

Candidate findings:

1. `langfuse/langfuse`
   - HEAD: `352cdf323ff8d1a9e21dd8925bf0580bb82eb447`.
   - License: core MIT/open-core. Langfuse FAQ says the core tracing/integrations/API/data model/exports are MIT-licensed; GitHub org page reports MIT.
   - Adoption: ~26.8k stars, YC W23, large integration ecosystem.
   - OTel status: Langfuse SDK v4 is OTEL-native and built on official OpenTelemetry client at docs lines 79-83; OTLP endpoint `/api/public/otel` at lines 86-105; supports OpenTelemetry compatible instrumentation at lines 109-119; aims to comply with OpenTelemetry GenAI semantic conventions at lines 264-268.
   - Local risk: pure-runtime manifest says `langfuse` Python import was blocked by Py 3.14/pydantic-v1 incompat (`PROGRESS.md:25`, manifest lines 355-360). Docker/server or JS SDK may still be viable.
   - Verdict: INSTALL-NOW only for Docker/collector endpoint if operator accepts service footprint; otherwise STUDY-PILOT.b. Top SemConv-compatible observability stack.

2. `comet-ml/opik`
   - HEAD: `fb3abad90a27d1660a5336f4149df5f175fa8e72`.
   - License/adoption: Apache-2.0, ~19.3k stars, 1.5k forks; repo page lines 375-390 and search result confirm Apache-2.0.
   - OTel status: docs say Opik provides native OpenTelemetry support and direct SDK integration; currently supports HTTP transport; OTLP endpoints are documented for cloud/self-host/enterprise.
   - Function: observability/eval/optimization platform, Python/TS/Ruby via OpenTelemetry; repo lines 399-420 describe tracing, evals, production monitoring, online evaluation, guardrails.
   - Verdict: STUDY-PILOT.b; second-best permissive stack, especially if Langfuse Py 3.14 remains blocked.

3. `Arize-ai/phoenix`
   - HEAD: `30735f2a451b681dd8c72dfd68b4560712594e62`.
   - License: Phoenix docs explicitly say Elastic License 2.0; GitHub search/repo page confirms ELv2.
   - OTel status: strong OpenTelemetry/OpenInference alignment, but license whitelist rejects ELv2.
   - Local prior: pure-runtime already closed Phoenix main package via openinference Apache-2.0 swap (`sota-installed-manifest.md:320-326`).
   - Verdict: REJECT-LICENSE. Keep `openinference` instrumentation, do not install Phoenix main.

Axis-4 top-2 stacks:

1. Langfuse + OTel Collector + OpenLLMetry/OpenLIT/OpenInference exporters. Best SemConv-facing product and strongest adoption, but use Docker/HTTP path until Python 3.14 blocker clears.
2. Opik + OTel HTTP endpoint. Apache-2.0 and broad eval/monitoring stack; lower explicit SemConv language than Langfuse but permissive and operationally plausible.

## Cross-Axis Final Disposition

- INSTALL-NOW: none without operator workflow/token/platform decisions. Existing Playwright/ChromeDevTools already satisfy local browser MCP install surface.
- STUDY-PILOT.b priority:
  1. Apify MCP for hosted Actor-backed scraping, only with token policy and named research workflow.
  2. Claude sandbox policy design for WSL2/Linux/macOS sessions; hard-gate once platform support is proven.
  3. `github/gh-aw` once pure-runtime creates a first read-only agentic workflow.
  4. Langfuse Docker/OTLP or Opik OTLP for GenAI SemConv observability.
- REJECT-FOR-FIT.a:
  - ExecuteAutomation Playwright MCP, because Microsoft Playwright MCP is canonical and already wired.
  - Base-action/security-review/gh-aw install-now, because no active pure-runtime workflow routes through them.
  - Exact `axe-core/axe-mcp` until public repo/license is verified.
- REJECT-LICENSE:
  - Phoenix main remains ELv2; use OpenInference/OTel-compatible permissive alternatives.
