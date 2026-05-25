# W442 — Research-Architecture v23 OPERATIONAL — Node↔Python MAF bridge + 4 stub-angle wiring + OSSF/OSV trust probes

> /superpowers:brainstorming session 2026-05-25. Operator: "max quality, no token concern, mostly Opus 4.7, mandatory codex per commit per soul.md §6, max-parallelism, fail-CLOSED, SOTA references throughout, foundation grand-checklist not yet operational on research-arch axis — make it operational." 4 design decisions captured via AskUserQuestion: (1) scope split W442+W443+W444; (2) trust probes = OSSF Scorecard + osv-scanner; (3) branch chains on `feat/alw-v1-core-spine` (PR #154); (4) MAF venv = shared `Z:/venvs/claude`.

## §0 Context + inheritance

W441 shipped v23 engine MVP (3 live angles: registry + deepwiki + repomix; 4 stub angles: perplexity + exa + firecrawl + tavily). v23 schema, scoring rubric, convergence engine, CLI, ALW orchestrator scaffold all land via PR #154 (APPROVED, awaiting operator merge). PR #149 (W439 sca-v23 + soul.md + naming reform) is load-bearing prerequisite.

W441.6 codex r2 REVISE surfaced the standalone-CLI MCP-client gap: in standalone mode (Node CLI invocation, no Claude Code session), the in-session `mcpClient` is unavailable → A1-A6 all skip → only A7 registry-angle runs → fails ≥3-angle convergence rule. W441.6 partial-mitigation: defaulted `--min-angles=1` (registry-only triage); deferred real fix to this wave.

W441-HARNESS-COMPARISON-VERDICT (`docs/architecture/SOTA-REPOS-DEEP-DIVE-2026-05-25/HARNESS-COMPARISON-VERDICT.md`) selected `microsoft/agent-framework` python v1.6.0 with `agent-framework-claude` first-party Claude SDK wrapper (CVS 0.886 INSTALL-HIGH) as the standalone MCP-client bridge. Runners-up rejected: langchain-langgraph v0.4 (heavier integration; not first-party Claude), lastmile-ai/mcp-agent (STALLED 4+ months as of 2026-05-25).

This wave (W442) is OPERATIONAL — install MAF + wire bridge + wire 4 stub angles to live MCP + add real trust probes (lift HALT-REJECT default). W443 follows with first end-to-end self-validation run (5 targets); W444 backports sca-v24 schema evolution + 5 cookbook CMA patterns.

## §1 Goal (one sentence)

Wire `agent-framework-claude` MAF v1.6.0 as a Node↔Python MCP-client bridge so `tools/research-arch-v23/cli.mjs` reaches ≥3-angle convergence in standalone mode + lift HALT-REJECT default via real OSSF Scorecard + osv-scanner trust probes per cardinal-rule-1 #3 trust-tuple extension.

## §2 Architecture

```
┌────────────────────────────────────────────────────────────────┐
│ Node-side (existing v23 engine)                                │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ cli.mjs                                                    │ │
│ │  └─ convergeAudit(target, {mcpClient: bridge.getMcpClient()}) │
│ │                                                            │ │
│ │ convergence-engine.mjs (modified: ~10 LOC)                 │ │
│ │  └─ Promise.allSettled([A1..A7])                           │ │
│ │                                                            │ │
│ │ angles/{perplexity,exa,firecrawl,tavily}-angle.mjs (NEW)   │ │
│ │  └─ each calls: mcpClient.callTool({server, name, args})   │ │
│ │                                                            │ │
│ │ angles/{deepwiki,repomix}-angle.mjs (existing, unchanged)  │ │
│ │  └─ same mcpClient.callTool() interface                    │ │
│ │                                                            │ │
│ │ trust-probe.mjs (NEW)                                      │ │
│ │  ├─ execa('scorecard', [...])                              │ │
│ │  └─ execa('osv-scanner', [...])                            │ │
│ │                                                            │ │
│ │ mcp-client-bridge.mjs (NEW)                                │ │
│ │  ├─ spawn-once: execa.node('bridge/python_mcp_helper.py')  │ │
│ │  ├─ Proxy returns object quacking like in-session mcpClient│ │
│ │  └─ getMcpClient() → { callTool(req) → JSON-RPC roundtrip }│ │
│ └────────────────────────────────────────────────────────────┘ │
│                          │                                     │
│                          ▼  stdin JSON-RPC                     │
│                          ▲  stdout JSON-RPC                    │
│                          │                                     │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ Python-side (NEW; spawned-once-per-CLI-invocation)         │ │
│ │ bridge/python_mcp_helper.py                                │ │
│ │  ├─ MAF MCPClient instances (6):                           │ │
│ │  │   ├─ deepwiki  (mcp-remote → cognition deepwiki)        │ │
│ │  │   ├─ repomix   (stdio: npx repomix-mcp)                 │ │
│ │  │   ├─ perplexity (stdio: npx @perplexity-ai/mcp)         │ │
│ │  │   ├─ exa       (stdio: npx exa-mcp-server)              │ │
│ │  │   ├─ firecrawl (stdio: npx firecrawl-mcp)               │ │
│ │  │   └─ tavily    (stdio: npx tavily-mcp)                  │ │
│ │  ├─ JSON-RPC server loop over stdin/stdout                 │ │
│ │  └─ Exits on stdin EOF (Node CLI exits → daemon shuts down)│ │
│ └────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

**Process lifecycle**: Python helper is spawned ONCE per CLI invocation, handles N MCP calls sequentially via JSON-RPC, exits on stdin EOF when Node CLI closes. Spawn overhead (~500ms-1s) amortized over 6 angle calls per target. No NSSM daemon (avoids ops burden); no HTTP server (avoids port mgmt). Matches W442 spec §T2-T3 + MAF async session pattern.

**Mode equivalence**: bridge's `getMcpClient()` Proxy returns an object with the SAME interface as Claude Code's in-session `mcpClient`. Existing `deepwiki-angle.mjs` + `repomix-angle.mjs` (already calling `mcpClient.callTool({server, name, arguments})`) need ZERO changes. New 4 stub angles use same interface. Orchestrator-mode (passing in-session mcpClient via `options.mcpClient`) continues to work.

## §3 Components (T1-T5)

| Task | File / Action | LOC | Purpose | Tests |
|---|---|---|---|---|
| **T1** | `pip install agent-framework-claude` in `Z:/venvs/claude` + commit `requirements-mcp.txt` lockfile with pinned hashes | n/a | Install MAF v1.6.0 + agent-framework-claude with reproducible pinned hashes | n/a (probe via `python -c "import agent_framework_claude; print(...)"`)|
| **T2** | `tools/research-arch-v23/mcp-client-bridge.mjs` (NEW) | ~180 LOC | Node↔Python execa stdio bridge w/ Proxy mcpClient interface | ~25 tests (spawn, callTool roundtrip, error handling, EOF cleanup, timeout, Proxy interface conformance) |
| **T3** | `tools/research-arch-v23/bridge/python_mcp_helper.py` (NEW) + `bridge/__tests__/test_python_mcp_helper.py` | ~220 LOC | MAF MCPClient instantiation for 6 MCP servers + JSON-RPC server loop | ~12 pytest tests (server init, callTool dispatch, JSON-RPC framing, EOF shutdown, per-server isolation) |
| **T4** | `tools/research-arch-v23/angles/perplexity-angle.mjs` + `exa-angle.mjs` + `firecrawl-angle.mjs` + `tavily-angle.mjs` (4 NEW) + corresponding test files | ~80 LOC × 4 = 320 LOC | Wire 4 stub angles to live MCP-client; convert PATTERN-STUDY-stub returns → live-probe returns | ~15 tests × 4 = 60 tests |
| **T5** | `tools/research-arch-v23/trust-probe.mjs` (NEW) | ~150 LOC | OSSF Scorecard + osv-scanner subprocess wrappers; returns R1a trust-tuple | ~25 tests (CLI invocation, JSON parsing, missing-binary fail-CLOSED, network-failure fail-CLOSED, malformed-output fail-CLOSED) |

Plus minor wiring change in `convergence-engine.mjs` (~10 LOC, ~3 tests added): when `options.mcpClient` not provided, fall back to `bridge.getMcpClient()` for standalone-CLI mode. Plus minor wiring in `cli.mjs` (~5 LOC, ~2 tests added): default `--min-angles=3` (was 1 in W441.6), remove startup-warning per W442-T6.

**Total new code**: ~875 LOC + ~127 new tests. Adds to existing W441 baseline of 147 tests → total ~274 tests on `feat/research-arch-v23-operational` branch tip.

## §4 Data flow (one request lifecycle)

```
[ User: $ node cli.mjs --target microsoft/agent-framework --format=json ]
       │
       ▼
cli.mjs parses args → bridge = await import('./mcp-client-bridge.mjs')
                    → mcpClient = bridge.getMcpClient()  // spawns Python helper
       │
       ▼
convergeAudit(target, {mcpClient, codexAdversary: undefined})
       │
       ▼
convergence-engine.mjs invokes 7 angles in Promise.allSettled:
       ├─ A7 registry-angle.runAngle(target)            (no mcpClient — uses gh CLI + npm view directly)
       ├─ A1 perplexity-angle.runAngle(target, {mcpClient})
       ├─ A2 exa-angle.runAngle(target, {mcpClient})
       ├─ A3 firecrawl-angle.runAngle(target, {mcpClient})
       ├─ A4 tavily-angle.runAngle(target, {mcpClient})
       ├─ A5 deepwiki-angle.runAngle(target, {mcpClient})
       └─ A6 repomix-angle.runAngle(target, {mcpClient})
       │
       │  Each A1-A6 angle calls: mcpClient.callTool({server, name, arguments})
       │  Proxy dispatches: bridge.callTool({server, name, arguments})
       │  Bridge encodes: JSON-RPC request {"jsonrpc":"2.0","id":N,"method":"call_tool","params":{...}}
       │  Bridge writes to Python helper stdin
       │  Python helper reads stdin, dispatches to right MAF MCPClient instance
       │  Python: client.call_tool(name, arguments) async → response
       │  Python encodes: JSON-RPC response {"jsonrpc":"2.0","id":N,"result":{...}}
       │  Python writes to stdout
       │  Bridge reads stdout, resolves promise to angle code
       │
       ▼
After all angles settled, convergence-engine calls:
       trust = await probeTrust(target)
       │
       ├─ probeTrust spawns: execa('scorecard', ['--repo', `${owner}/${repo}`, '--format=json', '--checks=Maintained,Signed-Releases,Code-Review,SAST,Vulnerabilities'])
       │  Parses Scorecard JSON output → weighted score per check → trust booleans
       │
       └─ probeTrust spawns: execa('osv-scanner', ['--recursive=false', '--format=json', pkgSpec])
          Parses osv-scanner JSON → CVE list → transitive_deps_clean boolean
       │
       ▼
computeCVS(dims) + decisionTier(cvs, trust) → verdict ∈ {INSTALL-HIGH, INSTALL-STANDARD, PATTERN-STUDY, CITE-REFERENCE-ONLY, REJECT, HALT-REJECT}
       │
       ▼
Output JSON conforming to sca-v23 schema with:
       ├─ live_angles: 6-7 (was 1 in W441.6 CLI-mode)
       ├─ trust_tuple: real probe results (not all-FALSE-default)
       └─ verdict: real tier (not always HALT-REJECT)
       │
       ▼
Node CLI exits → bridge closes stdin pipe → Python helper SIGTERM trap → MAF MCPClient sessions close cleanly
```

## §5 Error handling + fail-CLOSED contract

Per soul.md §6 fail-CLOSED contract — every failure mode produces a SAFE default (HALT-REJECT or skip-with-evidence), never silent fail-OPEN.

| Failure | Detection | Behavior | Verdict impact |
|---|---|---|---|
| Python binary missing | execa spawn error code `ENOENT` | `bridge.getMcpClient()` throws `BridgeUnavailableError`; cli.mjs catches → falls back to A7-only triage mode + warns | live_angles = 1 → ≥3-angle convergence rule UNMET → HALT-REJECT (schema-level) |
| `agent_framework_claude` import error in Python helper | helper exits 1 on import; bridge stdin EOF before any response | Bridge marks helper dead; cli.mjs catches → A7-only triage + warns | Same as above |
| Single MCP server init fails (e.g. PERPLEXITY_API_KEY missing) | Python helper logs warning, that server's MCPClient = None | When Node calls `callTool({server:"perplexity",...})`, helper returns `{"error":{"code":"server-unavailable","message":"..."}}` → angle records `skipped:true, error:"mcp-server-unavailable"` | If remaining live_angles ≥ 3 → verdict computed normally; if < 3 → HALT-REJECT |
| JSON-RPC parse error (Python wrote garbage to stdout) | Bridge JSON.parse throws | Bridge logs error, throws `BridgeProtocolError`; angle catches → records `skipped:true, error:"bridge-protocol"` | If remaining live_angles ≥ 3 → verdict computed; else HALT-REJECT |
| Python helper hangs (>30s on single call) | execa timeout fires | Bridge SIGKILL helper, marks dead; angle catches → records `skipped:true, error:"bridge-timeout"` | Same — fall through to live_angles count |
| Scorecard binary missing | execa spawn error `ENOENT` | `probeTrust` throws `ProbeUnavailableError`; trust-tuple fields default FALSE per fail-CLOSED | HALT-REJECT (existing W441 baseline behavior) |
| osv-scanner binary missing | Same | Same | Same |
| Scorecard returns malformed JSON | JSON.parse throws | `probeTrust` catches, sets all trust fields to FALSE, logs error | HALT-REJECT |
| osv-scanner finds HIGH/CRITICAL CVE | parsed `vulnerabilities[].severity` includes HIGH or CRITICAL | `transitive_deps_clean = false` | HALT-REJECT per R1a |
| Scorecard probe network failure (5xx, timeout) | execa exit code != 0 | trust-tuple `malicious_update_review = false` (fail-CLOSED) | HALT-REJECT |
| Network unavailable entirely (offline) | All MCP calls fail; both Scorecard + osv-scanner fail | live_angles = 1 (registry-angle handles offline via cache); trust-tuple all FALSE | HALT-REJECT |

All errors emit Langfuse OTEL spans (Langfuse already wired per CLAUDE.local.md §Services) with operation-name `v23.bridge.callTool` or `v23.trust-probe.{scorecard|osv}`.

## §6 Testing strategy

| Test type | Coverage | Files | Count |
|---|---|---|---|
| **Unit (vitest)** | 4 stub angles + bridge + trust-probe + convergence-engine update + cli update | `tools/research-arch-v23/__tests__/{perplexity,exa,firecrawl,tavily}-angle.test.mjs` + `{bridge,trust-probe}.test.mjs` + delta to existing `convergence-engine.test.mjs` + `cli.test.mjs` | ~115 |
| **Integration (vitest + mock subprocess)** | Bridge spawn → JSON-RPC roundtrip → fake-Python responder; verifies wire protocol end-to-end | `__tests__/bridge.integration.test.mjs` (mocks execa via `execa-mock` or sinon; runs fake helper script that responds to JSON-RPC) | ~5 |
| **Golden (vitest snapshot, CI-only)** | Real probe against `chalk/chalk` (known-clean, known-license-MIT npm pkg); verifies end-to-end works on CI | `__tests__/e2e.test.mjs` (gated on env `RUN_E2E=1`; skipped locally to avoid network flake) | ~3 |
| **Pytest (Python helper)** | Python helper unit tests with MAF MCPClient mocked | `tools/research-arch-v23/bridge/__tests__/test_python_mcp_helper.py` | ~12 |

**Run commands**:
- `npx vitest run tools/research-arch-v23/__tests__/` (Node tests; ~95% coverage target)
- `Z:/venvs/claude/Scripts/python.exe -m pytest tools/research-arch-v23/bridge/__tests__/` (Python tests)
- `RUN_E2E=1 npx vitest run __tests__/e2e.test.mjs` (CI-only golden test against `chalk/chalk`)

**Coverage target**: ≥90% lines / ≥85% branches on all NEW files. Existing files retain current coverage.

## §7 Acceptance criteria (W442 = DONE when all 5 pass)

1. ✅ `pip list | grep agent-framework-claude` shows v1.6.0 in `Z:/venvs/claude`.
2. ✅ `node tools/research-arch-v23/cli.mjs --target chalk/chalk --format=json` (no `--min-angles` override) returns valid sca-v23 JSON with `live_angles >= 3` AND `trust_tuple` having ≥1 field returning real-probe value (NOT all-FALSE-default fail-CLOSED).
3. ✅ All ~274 vitest tests pass.
4. ✅ All ~12 pytest tests pass.
5. ✅ Codex GPT-5.5 r1/r2/r3 APPROVE on at least one full commit covering all 5 sub-tasks (per soul.md §6 mandatory-codex policy).

**Out of scope for W442** (deferred to W443/W444):
- First end-to-end self-validation run scoring 5 target repos (W443)
- sca-v24 schema evolution + 5 cookbook CMA pattern wiring (W444)
- ALW v1 layers L2-L8 actual implementations (W443+; W441 shipped scaffold only)
- Re-scoring all 99 W259 grand catalog repos via operational v23 (W445+ separate wave)

## §8 W442 → W443 handoff

W443 begins immediately after operator merges PR #155 (or earlier, chained off `feat/research-arch-v23-operational`). W443 single task: run the now-live v23 engine against 5 targets and capture first-ever convergence verdicts.

**W443 target list (confirmed during brainstorming)**:
1. `cognee` — current verdict PATTERN-STUDY (sca-v18-era); re-verdict via v23
2. `hindsight` — current verdict RETIRED-T1; re-verdict for confirmation
3. `langchain-ai/langgraph` — current verdict RUNNER-UP per HARNESS-COMPARISON; re-verdict to confirm
4. `microsoft/autogen` — never v23-scored
5. `microsoft/agent-framework` — just-installed; v23 self-scoring (eat own dog food)

**W443 acceptance**: ≥1 non-HALT-REJECT verdict across the 5 targets (proves end-to-end pipeline works AND trust-tuple probes can return TRUE for legitimately-trustworthy packages).

## §9 Commit plan (5 commits on `feat/research-arch-v23-operational`)

**Branch lineage**: `feat/research-arch-v23-operational` is CHAINED on `feat/alw-v1-core-spine` (PR #154 OPEN at branch creation time). When PR #149 + PR #154 merge to main, W442 PR #155 rebases cleanly onto new main with no conflicts (W442 adds 5 NEW files + modifies only 2 W441-shipped files via minor extensions).

1. `feat(v23): pip install agent-framework-claude + requirements-mcp.txt lockfile (W442-T1)` — installs MAF + commits pinned hash lockfile
2. `feat(v23): mcp-client-bridge.mjs Node↔Python execa stdio bridge w/ Proxy mcpClient (W442-T2)`
3. `feat(v23): bridge/python_mcp_helper.py MAF MCPClient for 6 MCP servers (W442-T3)`
4. `feat(v23): wire 4 stub angles (perplexity+exa+firecrawl+tavily) via bridge (W442-T4)`
5. `feat(v23): trust-probe.mjs OSSF Scorecard + osv-scanner subprocess wrappers (W442-T5)` + convergence-engine + cli wiring delta

Each commit gets codex r1 ADVERSARIAL review per soul.md §6. r2/r3 on REVISE. Final commit (5/5) gets explicit "review-all-W442" codex pass per W441 precedent.

## §9b Implementation-time deferrals (resolved during T2-T3, not at spec time)

These are intentionally NOT specified in §3-§4 because they're implementation-detail decisions that benefit from concrete MAF v1.6.0 API surface inspection at implementation time:

- **Exact MCP server package names** for each of the 6 servers (e.g., `perplexity-mcp` vs `@perplexity-ai/mcp-server` vs Python `mcp-perplexity`) — T3 implementer probes upstream npm/PyPI registries during install + confirms with operator
- **Per-server transport** — most MCP servers ship Python stdio; some ship Node stdio; deepwiki is mcp-remote/SSE. T3 implementer selects per-server transport in MAF MCPClient constructor
- **API-key env-var names** — each MCP server has its own convention (PERPLEXITY_API_KEY vs PERPLEXITY_TOKEN etc.) — T3 references each server's README + matches CLAUDE.local.md §f3 env block
- **MAF v1.6.0 exact MCPClient async-context signature** — T3 implementer reads MAF v1.6.0 source directly during install (operator authorized full source access per cardinal-rule-5 sandbox)
- **JSON-RPC framing exact protocol** — newline-delimited JSON vs Content-Length-headers (MCP spec recommends Content-Length; simpler ndjson works for our trusted parent↔child use case) — T2 implementer chooses with cite-anchor

These deferrals do NOT introduce ambiguity into the acceptance criteria (§7) — they're choices the implementer MUST make + document via JSDoc + tests. Reviewer agent will verify each choice has cite-anchor in the commit body.

## §10 SOTA cite-anchors (≥3-org-distinct per W352-S9 floor; actual count 12+ distinct orgs)

- **microsoft**: `microsoft/agent-framework` v1.6.0 python (MIT): https://github.com/microsoft/agent-framework — `MCPClient` class standalone-Python instantiation; first-party Claude SDK wrapper via `agent-framework-claude` per W441-HARNESS-COMPARISON-VERDICT
- **anthropic**: claude-cookbooks `@ 39a350b6` `patterns/agents/orchestrator_workers.ipynb` — MCP-aware orchestrator delegation pattern; Anthropic MCP spec https://modelcontextprotocol.io §2 client transport
- **openSSF**: Scorecard CLI v5.2.1 https://github.com/ossf/scorecard — `Signed-Releases`, `Maintained`, `Code-Review`, `SAST`, `Vulnerabilities` checks per cardinal-rule-1 #3 trust-tuple R1a `malicious_update_review`
- **google**: osv-scanner https://github.com/google/osv-scanner — cross-language CVE scanning (npm + PyPI + cargo + Go + Maven + composer + RubyGems) per R1a `transitive_deps_clean`; OSV.dev API
- **lastmile-ai**: `lastmile-ai/mcp-agent` https://github.com/lastmile-ai/mcp-agent — `MCPAggregator` namespaced multi-MCP-server aggregation pattern (reference for bridge architecture even though install rejected due to staleness)
- **sindresorhus**: `execa` https://github.com/sindresorhus/execa — Node subprocess library; v9.x used per W441 package.json
- **vitest-dev**: `vitest` https://vitest.dev — test framework; v2.x used per W441 package.json
- **pytest-dev**: `pytest` https://docs.pytest.org — Python test framework; used for bridge helper tests
- **modelcontextprotocol**: https://modelcontextprotocol.io — MCP spec for tool/server contracts
- **NIST**: SP 800-218 PW.7 (Review/Analyze Code) + RV.1 (Identify+Confirm Vulnerabilities Ongoing) — verify-before-claim cardinal-rule-6 lineage
- **ISO/IEC**: 25010:2011 §4.2.6-4.2.7 (maintainability+portability) — quality-attributes lineage
- **OWASP**: A06:2021 (Vulnerable+Outdated Components) — trust-tuple R1a #d `transitive_deps_clean` rationale

## §11 ERRATA (verified at implementation time — cardinal-rule-6)

**E1: Package name correction** — PyPI package is `agent-framework` (NOT `agent-framework-claude`). `agent-framework-claude` v1.0.0b260521 IS a real transitive dependency providing `ClaudeAgent` / `RawClaudeAgent` (agent wrappers, NOT MCP clients). T1 installs `agent-framework==1.6.0`. Verified via `pip index versions agent-framework` (v1.6.0 confirmed; `agent-framework-claude` returns "No matching distribution" as a standalone install target).

**E2: MCP class correction** — MCP wrapping uses `MCPStdioTool` (NOT `MCPClient`). Class lives in `agent_framework.MCPStdioTool`. API:
```python
from agent_framework import MCPStdioTool
tool = MCPStdioTool(name="deepwiki", command="npx", args=["-y", "@cognition/deepwiki-mcp@latest"])
async with tool:  # connect + auto-close
    result = await tool.call_tool("ask_question", repo="chalk/chalk", question="What is this repo?")
    # result: str | list[Content]
```
Signature: `call_tool(self, tool_name: str, **kwargs) -> str | list[Content]`. Note kwargs expansion — `arguments` dict becomes `**arguments`.

**E3: Plan T3 code impact** — `python_mcp_helper.py` changes from `MCPClient.stdio(command=..., args=...)` to `MCPStdioTool(name=..., command=..., args=...)` + async context manager. `dispatch_call_tool` uses `await tool.call_tool(name, **arguments)`. Node-side bridge (T2) and angle code (T4) are UNCHANGED — they only see the JSON-RPC interface, not Python internals.

**E4: T1 is partially done** — `agent-framework==1.6.0` already installed successfully at errata-time (`pip install "agent-framework==1.6.0"` completed). T1 remaining: generate requirements-mcp.txt lockfile + write install-verification test + commit.

Wave: W442 (provenance via commit-trailer per W439 SOTA naming reform)
Codex-Verdict (this spec): BOOTSTRAP (specs ship at BOOTSTRAP; implementation commits seek r1 APPROVE)
