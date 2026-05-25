# Wave 219 Agent C - Post-LLMLingua Token Compression + DB/Testing/Doc MCP Gap Fill

Date: 2026-05-15  
Target runtime: `claude-sota-pure`  
Directive honored: treat `microsoft/LLMLingua` as outdated for May 2026 install decisions; do not recommend it as a new primitive.

## 1. Executive Verdict

LLMLingua-era neural prompt compression is no longer the best default for a Claude Code runtime. The 2026 SOTA shape is:

1. MCP/tool-schema compression proxy first, because MCP tool definitions and verbose tool responses are now a dominant context tax.
2. Deterministic or AST/log-aware context preprocessors second, because coding runtimes mostly waste tokens on file reads, logs, stack traces, JSON, diffs, and schemas.
3. Learned compression only where there is a benchmarked task-specific gain, especially SWE/code issue resolution; avoid generic sidecar-SLM prompt compression unless it is reproducible, maintained, and cheaper than just using native prompt caching/CLI compression.

Top gap-fill recommendation for token compression:

| Rank | Candidate | Verdict | Why |
|---:|---|---|---|
| 1 | `atlassian-labs/mcp-compressor` | INSTALL-CANDIDATE | Directly attacks MCP schema/tool bloat; wraps existing MCPs; documented 70-97% tool-description reduction; Python + TypeScript; CR-12 strong because it preserves upstream MCPs instead of replacing them. |
| 2 | `distill-mcp` | PILOT | Claude Code-specific, AST-aware reads and build/log/diff compression; strong fit if audited locally. |
| 3 | `bytebase/dbhub` | INSTALL-CANDIDATE for DB gap | Broadest DB MCP surface with token-efficient two-tool design, read-only/limits/timeouts, and multi-DB support. |
| 4 | `microsoft/playwright-mcp` plus CLI/skill preference | CONDITIONAL | Official and mature, but even its README says modern agents often prefer CLI/skills for token efficiency. Keep MCP for exploratory browser sessions, not always-on testing. |
| 5 | Mintlify MCP / ReadMe MCP | CONDITIONAL | Good only when the doc platform is actually Mintlify or ReadMe; otherwise prefer OpenAPI generators/CLI doc tooling. |

Do not install low-signal single-maintainer MCPs into the base runtime unless they clear local audit, sandboxing, and reproducible benchmark checks.

## 2. Scoring Rubric

SRA D1-D10 score: 10 = best. Equal weight unless noted.

| Dimension | Meaning |
|---|---|
| D1 Relevance | Solves a real claude-sota-pure gap. |
| D2 Recency | Active in 2025-2026, current ecosystem fit. |
| D3 Maintainer trust | Official/vendor or credible org beats anonymous single maintainer. |
| D4 Runtime safety | Least privilege, read-only mode, limits, no credential sprawl. |
| D5 Token efficiency | Reduces schemas, payloads, logs, file/context tokens. |
| D6 Integration fit | Works with Claude Code/Codex/Cursor-style MCP or CLI workflows. |
| D7 Breadth | Covers multiple common use cases without excess always-loaded surface. |
| D8 Verifiability | Public docs, install path, benchmarks, reproducible claims. |
| D9 Operational simplicity | Easy install, cross-platform, no heavyweight service unless justified. |
| D10 Maintenance risk | Lower score for abandoned, alpha-only, or tiny unaudited repos. |

CR-12 score: upstream-install-priority fit.

| CR-12 | Meaning |
|---:|---|
| 5 | Official/native upstream or vendor-maintained, installable through official package/channel. |
| 4 | Reputable org/community upstream; preserves native tools. |
| 3 | Useful OSS but unofficial; needs audit before base install. |
| 2 | Experimental, thin wrapper, or registry-only visibility. |
| 1 | Avoid for base runtime. |

## 3. Post-LLMLingua Token Compression Candidates

| Candidate | Type | SRA | CR-12 | Recommendation | Notes |
|---|---|---:|---:|---|---|
| `atlassian-labs/mcp-compressor` | MCP proxy/schema compressor | 88 | 4 | INSTALL-CANDIDATE | Wraps stdio/HTTP/SSE MCP servers; exposes compressed interface with `get_tool_schema`/`invoke_tool`; docs claim 70-97% schema overhead reduction and 2026 `just-bash` mode. Best match for MCP bloat. |
| `distill-mcp` | Claude Code context compressor | 82 | 3 | PILOT | Open-source MCP for Claude Code with `auto_optimize`, `smart_file_read`, `code_execute`; claims 50-95% savings and up to 98% in marketing. Needs source audit because it executes code and is beta. |
| `chopratejas/headroom` | Agent wrapper/local compression | 78 | 3 | PILOT | Wraps Claude/Codex/Cursor/Aider/Copilot; claims local millisecond compression and broad model support. Good pure-runtime fit if package provenance is acceptable. |
| SWEzze paper/code-context compressor | Learned code-context compression research | 76 | 2 | WATCH | 2026 paper reports 6x stable compression and 51.8-71.3% token budget reduction on SWE-bench Verified with 5.0-9.2% resolution gain. Strong research, but installability and upstream maturity need confirmation before runtime adoption. |
| CompactPrompt | Prompt/file compression pipeline research | 70 | 2 | WATCH | 2025 pipeline claims up to 60% token/cost reduction with under 5% accuracy drop on finance QA. More app-pipeline than Claude runtime primitive. |
| `open-compress/claw-compactor` | Deterministic context compressor | 69 | 2 | WATCH/PILOT | 2026 public claims: 54% average compression, 82% JSON, 25% source code, no inference call. Promising but needs direct repo audit and benchmark reproduction. |
| `lacausecrypto/mcp-sophon` | MCP token optimizer | 64 | 2 | WATCH | Claims reproducible public benchmark and 94% output compression; registry/reddit-visible. Treat as experimental until audited. |
| `woling-dev/promptthrift-mcp` | MCP prompt/history compressor | 55 | 2 | AVOID-BASE | Near-zero social proof in searched registries; cloud/API fallback risk; only useful as lab comparison. |
| `microsoft/LLMLingua` | Neural prompt compressor | 50 | 4 | DO-NOT-INSTALL-NEW | Important historical baseline, but directive says outdated May 2026. It optimizes generic prompt token deletion, not MCP schema bloat, CLI/tool output, AST reads, or native prompt caching. |

Sources: Atlassian mcp-compressor docs and blog (`https://github.com/atlassian-labs/mcp-compressor/`, `https://atlassian-labs.github.io/mcp-compressor/`, `https://www.atlassian.com/blog/development/mcp-compression-preventing-tool-bloat-in-ai-agents`); Distill docs (`https://distill-mcp.com/docs`); Headroom GitHub (`https://github.com/chopratejas/headroom`); SWEzze arXiv search result (`https://arxiv.org/abs/2603.28119`); CompactPrompt arXiv (`https://arxiv.org/abs/2510.18043`); Claw Compactor public writeup/GitHub pointer (`https://www.baristalabs.io/blog/claw-compactor-token-compression-2026`, `https://github.com/open-compress/claw-compactor`); LLMLingua upstream (`https://github.com/microsoft/LLMLingua`, `https://www.microsoft.com/en-us/research/blog/llmlingua-innovating-llm-efficiency-with-prompt-compression/`).

## 4. DB-MCP Gap Fill

| Candidate | Coverage | SRA | CR-12 | Recommendation | Notes |
|---|---|---:|---:|---|---|
| `bytebase/dbhub` | Postgres, MySQL, SQL Server, MariaDB, SQLite | 91 | 4 | INSTALL-CANDIDATE | Best default DB MCP: zero-dependency, token-efficient two-tool surface, multi-connection TOML, read-only mode, row limits, timeouts, SSH/SSL. Broad coverage reduces per-DB MCP sprawl. |
| `mongodb-js/mongodb-mcp-server` | MongoDB/Atlas | 88 | 5 | INSTALL-CANDIDATE if MongoDB needed | Official MongoDB MCP server; supports connection string, Atlas API credentials, Docker, read-only mode. Add only when MongoDB is a real target to avoid credential/tool sprawl. |
| `redis/mcp-redis` | Redis | 86 | 5 | CONDITIONAL-INSTALL | Official Redis MCP. Useful for agentic Redis inspection/search. Needs strict connection scoping because write-capable cache/data stores are high blast radius. |
| `crystaldba/postgres-mcp` | Postgres | 80 | 3 | CONDITIONAL | Strong Postgres-specific value: health checks, EXPLAIN plans, index tuning, safe SQL execution. Prefer over DBHub only when Postgres performance tuning is a first-class workflow. |
| `sqlite-mcp` variants | SQLite | 58 | 2 | AVOID-BASE | Fragmented name space; DBHub already covers SQLite with stronger maintainer and multi-DB design. |
| generic `postgres-mcp` clones | Postgres | 52 | 2 | AVOID-BASE | Many wrappers exist; choose DBHub or CrystalDBA instead. |

DB default: install/pilot DBHub first; add official MongoDB/Redis only as project-scoped MCPs with read-only defaults and no committed credentials.

Sources: DBHub GitHub (`https://github.com/bytebase/dbhub`); MongoDB MCP GitHub/docs (`https://github.com/mongodb-js/mongodb-mcp-server`, `https://www.mongodb.com/products/tools/mcp-server/getting-started`); Redis MCP GitHub (`https://github.com/redis/mcp-redis`); CrystalDBA Postgres MCP (`https://github.com/crystaldba/postgres-mcp`).

## 5. Testing-MCP Gap Fill

| Candidate | Coverage | SRA | CR-12 | Recommendation | Notes |
|---|---|---:|---:|---|---|
| `microsoft/playwright-mcp` | Browser automation/test generation | 89 | 5 | CONDITIONAL-INSTALL | Official, mature, huge adoption. Use for live browser exploration and test authoring. Do not keep always-on when CLI/skills are cheaper; upstream README explicitly notes CLI/skills can be more token-efficient for coding agents. |
| `grafana/xk6-mcp` | Load testing MCP-server clients | 78 | 4 | PILOT | Grafana-linked k6 extension for testing MCP servers. Experimental/not officially supported, but uniquely relevant for MCP server load/behavior checks. |
| `djankies/vitest-mcp` | Vitest | 67 | 2 | WATCH | AI-optimized Vitest runner with structured output/log capture/coverage. Useful for JS/TS projects, but unofficial and narrow. Prefer native `vitest --reporter=json` unless MCP improves loop quality. |
| `jwilger/mcp-pytest-runner` / `pytest-mcp-server` | pytest | 62 | 2 | WATCH | Useful concept: intelligent pytest selection and structured interpretation. Base runtime should prefer direct pytest CLI unless project-specific adoption justifies tool load. |
| `josharsh/mcp-jest` | MCP server testing with Jest | 58 | 2 | WATCH | This tests MCP servers themselves more than general Jest apps. Useful for MCP authoring harnesses, not broad runtime install. |
| `jest-mcp` generic variants | Jest | 45 | 1 | AVOID-BASE | Name space is ambiguous; use direct Jest CLI/JSON reporters or a project-owned wrapper. |

Testing default: prefer CLI test runners for normal codebases; add Playwright MCP only as an on-demand browser/exploration server; evaluate `xk6-mcp` for MCP server performance tests.

Sources: Playwright MCP GitHub (`https://github.com/microsoft/playwright-mcp`); Microsoft Learn Playwright MCP testing article (`https://learn.microsoft.com/en-us/power-platform/developer/playwright-samples/ai-mcp`); Grafana xk6-mcp (`https://github.com/grafana/xk6-mcp`); Vitest MCP (`https://github.com/djankies/vitest-mcp`); pytest runner (`https://github.com/jwilger/mcp-pytest-runner`); mcp-jest (`https://github.com/josharsh/mcp-jest`).

## 6. Doc-Tooling MCP Gap Fill + Install Sequence

| Candidate | Coverage | SRA | CR-12 | Recommendation | Notes |
|---|---|---:|---:|---|---|
| Mintlify MCP | Mintlify docs read/write/PRs | 86 | 5 | CONDITIONAL-INSTALL | Official hosted MCP. Strong if docs are on Mintlify; write access is branch/PR-based but still treat as commit-capable. Not useful for non-Mintlify docs. |
| ReadMe MCP | ReadMe docs search/read/update | 84 | 5 | CONDITIONAL-INSTALL | Official platform MCP. Install only for ReadMe-hosted docs. |
| Mintlify generated docs MCP | Published docs/OpenAPI search | 80 | 5 | CONDITIONAL | Good read/search endpoint for Mintlify-hosted public docs and APIs; lower risk than write MCP. |
| `dcolley/swagger-mcp` | Swagger/OpenAPI to MCP | 61 | 2 | WATCH | Loads Swagger/OpenAPI specs, auth support, auto-generates endpoint tools; README warns not to expose publicly. Needs audit and token budget testing. |
| `amrsa1/swagger-mcp` | Swagger/OpenAPI explore/test | 59 | 2 | WATCH | Similar unofficial server with endpoint testing and auto-discovery. Prefer for lab only. |
| `openapi-mcp-server` | Generic OpenAPI MCP | 56 | 2 | WATCH | Generic package exists, but OpenAPI-to-MCP can explode tool counts; pair with mcp-compressor or CLI generation. |

Recommended Wave 219 install order for `claude-sota-pure`:

1. `atlassian-labs/mcp-compressor` as the compression substrate for any large MCP surface.
2. `bytebase/dbhub` as the default relational DB MCP, project-scoped with read-only/limits.
3. `microsoft/playwright-mcp` as on-demand browser/testing MCP, documented with CLI-first guidance.
4. `distill-mcp` pilot in an isolated branch after source audit, focused on logs/diffs/file reads.
5. Official vendor MCPs only when the runtime actually has that platform: MongoDB, Redis, Mintlify, ReadMe.
6. Defer unofficial Swagger/OpenAPI/test-runner MCPs until each has a local benchmark showing lower context cost or better pass rate than direct CLI/native docs tooling.

Open risks:

- MCP supply-chain risk is material; install only from official repos/package names, pin versions, and run secret scanning.
- DB MCPs must be project-scoped and read-only by default; never store credentials in repo config.
- OpenAPI-to-MCP generators can create enormous tool surfaces; pair with compression or convert to CLI/skill style.
- Compression claims need local replay against eee workloads: `.claude/settings.json` tool schema load, DB schema introspection, Playwright snapshots, build logs, and large file reads.

Primary sources: Mintlify MCP docs (`https://www.mintlify.com/docs/ai/mintlify-mcp`, `https://mintlify.com/docs/ai/model-context-protocol`); ReadMe MCP docs (`https://docs.readme.com/main/docs/mcp-servers`, `https://docs.readme.com/main/docs/your-projects-mcp-server`); Swagger MCP repos (`https://github.com/dcolley/swagger-mcp`, `https://github.com/amrsa1/swagger-mcp`); OpenAPI MCP package (`https://www.npmjs.com/package/openapi-mcp-server`); MCP security context (`https://arxiv.org/abs/2603.10194`, `https://arxiv.org/abs/2506.13538`).
