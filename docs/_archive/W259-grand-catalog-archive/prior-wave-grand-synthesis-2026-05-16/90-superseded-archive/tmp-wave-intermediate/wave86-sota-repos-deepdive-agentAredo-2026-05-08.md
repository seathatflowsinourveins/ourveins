# Wave 86 Agent A-redo: SOTA Repos Deep-Dive

Date: 2026-05-08
Workspace HEAD: `claude-sota-installed@0004077509e5e278589d7d93fafc3cd017fdfd78`
Scope: token efficiency, architectural optimization, account rotation, and `rtk-ai/rtk` harness fit.

Already adopted and intentionally not re-recommended: `cpa-usage-keeper v1.5.2`, `context-mode v1.0.111`, `ccusage v18.0.11`, `cli-proxy-api v6.10.9`, `SubagentStop` telemetry hook, `superpowers`, `codex`, `everything-claude-code`, `pyright-lsp`, `agent-sdk-dev`, `ralph-loop`, `frontend-design` plugins, and the seven marketplaces.

Convergence gate used:
- Axis-1 3-org convergence requires at least three independent orgs/repo families pointing at the same leverage class before adoption rises above "experiment": `rtk-ai` for shell-output compaction, `open-compress` for content-aware reversible compression, `cnighswonger/motiful` for prompt-cache prefix stability, `LiteLLM/Portkey` for gateway routing reliability, and `LangGraph/Mastra/Restate` for durable orchestration.
- Harness-fit 7-probe DAG: P1 not already adopted; P2 local evidence and SHA; P3 direct axis match; P4 integration surface; P5 risk/maintenance; P6 cache/account-affinity implications; P7 validation harness and rollback.

## S1. `docs/outer-research` Directory Tree Top-30 Files

HONEST-NON-FINDING: `Z:/claude-sota-installed/docs/outer-research/` is absent in this checkout. PowerShell `Get-ChildItem docs\outer-research -Force` failed with "Cannot find path"; `rg --files docs/outer-research` also failed with "The system cannot find the file specified." No top-30 file tree can be produced from that path.

Fallback evidence base: `Z:/repos/deps/` local mirrors plus the `rtk-ai/rtk` README web/GitHub surface cross-check. `Z:/repos/deps` is not itself a git repo, so citations below use each candidate repo's HEAD SHA.

## S2. `rtk-ai/rtk` Harness-Fit Verdict

Repo HEAD: `rtk-ai__rtk@80a6fe606f73`.

Verdict: adopt only as a controlled harness experiment, not a blind global install. RTK is high-fit for Bash/shell output compression and low-fit for native Windows auto-rewrite. It does not replace prompt-cache work or account rotation; it reduces downstream context payload from command outputs.

Evidence:
- README says RTK is a "High-performance CLI proxy" reducing LLM token consumption by 60-90% and filtering/compressing command outputs before they reach LLM context, with a single Rust binary and `<10ms` overhead. Cite: `Z:/repos/deps/rtk-ai__rtk/README.md:6`, `Z:/repos/deps/rtk-ai__rtk/README.md:36` @ `80a6fe606f73`.
- The token-savings table claims a 30-min Claude Code session drops from about 118,000 tokens to about 23,900 tokens, with estimates caveated by project size. Cite: `README.md:38-56` @ `80a6fe606f73`.
- Quick start supports Claude Code, Gemini CLI, Codex, Cursor, Windsurf, Cline/Roo, Kilo Code, and Antigravity setup commands. Cite: `README.md:103-112` @ `80a6fe606f73`.
- The hook rewrites Bash commands such as `git status -> rtk git status` before execution, and Claude sees compressed output. Cite: `README.md:118` @ `80a6fe606f73`.
- Hard limitation: built-in Claude Code `Read`, `Grep`, and `Glob` bypass the Bash hook; compact output requires shell equivalents or explicit `rtk read/grep/find`. Cite: `README.md:120` @ `80a6fe606f73`.
- Windows limitation: native Windows falls back to CLAUDE.md injection because auto-rewrite requires a Unix shell; WSL gets full hook support. Cite: `README.md:316-347` @ `80a6fe606f73`.
- Operational guardrail: RTK saves full unfiltered output on command failure for later recovery without re-execution. Cite: `README.md:386-393` @ `80a6fe606f73`.

Adoption pattern for eee:
- Best pattern: WSL/Linux canary for high-volume shell workflows, with `rtk init -g --hook-only` or explicit `rtk` command use first.
- Native PowerShell pattern: do not count on auto-rewrite; use explicit `rtk git`, `rtk test`, `rtk grep`, `rtk find` wrappers in harness scripts.
- Telemetry: disabled by default and opt-in, but keep it disabled for fleet testing unless a separate privacy review approves it. Cite: `README.md:413-428` @ `80a6fe606f73`.

Probe verdicts:
- P4 integration surface: PASS on WSL/Bash hooks; PARTIAL on native Windows because no auto-rewrite.
- P5 risk/maintenance: PASS as reversible canary; risk is behavior hiding because compressed outputs can omit detail, mitigated by failure tee.
- P6 cache/account-affinity: NEUTRAL/PASS; RTK does not touch OAuth routing or prompt cache keys, but lowers per-turn payload enough to reduce fleet pressure.

## S3. Top-7 Not-Yet-Adopted Repos

### 1. `rtk-ai/rtk`

Repo HEAD: `80a6fe606f73`.

Elevator pitch: command-output compaction proxy for AI coding agents; highest immediate leverage on shell-heavy sessions.

EEE benefit: reduce command-output tokens before they enter model context, especially repeated `git`, test, lint, `rg`, `find`, and log workflows. RTK claims 60-90% token reduction and per-command compactors. Cite: `Z:/repos/deps/rtk-ai__rtk/README.md:6`, `README.md:133-139`, `README.md:172-183` @ `80a6fe606f73`.

Probe 4+5+6: P4 PASS/PARTIAL, P5 PASS canary, P6 NEUTRAL/PASS. See S2.

### 2. `cnighswonger/claude-code-cache-fix`

Repo HEAD: `12cc30a1078c`.

Elevator pitch: Claude Code cache-stability proxy/interceptor with extension points for request normalization and telemetry.

EEE benefit: directly targets prompt-cache discipline, prefix stability, TTL markers, tool ordering, resume scatter, microcompact sentinel normalization, and cache telemetry. It reports an A/B test of 95.5% cache hit rate through proxy vs 82.3% direct on first warm turn. Cite: `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:7-15` @ `12cc30a1078c`.

Key evidence:
- Seven cache-fix extensions include fingerprint stripping, TTL management, cache-control normalization, and cache telemetry. Cite: `README.md:28-42` @ `12cc30a1078c`.
- Resume cache break causes include attachment-block scatter, fingerprint instability, non-deterministic tool ordering, and images persisting in history. Cite: `README.md:214-224` @ `12cc30a1078c`.
- It warns that overage TTL downgrade and microcompact budget enforcement are server-side, so this cannot fix everything client-side. Cite: `README.md:478-480` @ `12cc30a1078c`.

Probe 4+5+6: P4 PASS if chained behind CLIProxyAPI as a lab proxy; P5 MEDIUM because it rewrites request structure and must be regression-gated; P6 PASS because it is the strongest direct cache-affinity/prefix-stability candidate.

### 3. `motiful/cc-cache-audit`

Repo HEAD: `6bd20812bd46`.

Elevator pitch: small A/B harness proving a Claude Code billing-header cache-bust pattern and quantifying system-prompt cache economics.

EEE benefit: gives a focused regression test for cache prefix discipline across sessions/subagents, useful before and after any proxy/router change.

Key evidence:
- README states Claude Code v2.1.69+ injects a dynamic billing header into the system prompt, breaking cross-session prompt-cache sharing. Cite: `Z:/repos/deps/motiful-cc-cache-audit/README.md:3`, `README.md:16-42` @ `6bd20812bd46`.
- A/B results show every session rebuilding about 12K system-prompt tokens with header ON, and 99.98% hit ratio with header OFF. Cite: `README.md:46-77` @ `6bd20812bd46`.
- It quantifies effective system-prompt cost at about 16,380 equivalent tokens with the header vs about 2,351 without. Cite: `README.md:81-88` @ `6bd20812bd46`.

Probe 4+5+6: P4 PASS as a measurement harness, not production middleware; P5 LOW because it can run read-only A/B; P6 PASS because it directly validates cache-sharing behavior across sessions/subagents.

### 4. `open-compress/claw-compactor`

Repo HEAD: `c1b936d40b11`.

Elevator pitch: content-aware, reversible LLM token compression pipeline with AST-aware code handling and deduplication.

EEE benefit: stronger than generic summarization for large code/log/diff payloads because it routes by content type, preserves code identifiers, and can expose rewind markers for restoration.

Key evidence:
- README describes a 14-stage Fusion Pipeline with reversible compression, AST-aware code analysis, and intelligent content routing. Cite: `Z:/repos/deps/open-compress__claw-compactor/README.md:7`, `README.md:55` @ `c1b936d40b11`.
- It reports 15-82% compression depending on content and zero LLM inference cost. Cite: `README.md:45` @ `c1b936d40b11`.
- Stages include KV-cache alignment, semantic dedup, context folding, diff folding, AST compression, and ML token compression. Cite: `README.md:122-143`, `README.md:292-303` @ `c1b936d40b11`.
- Reversible compression stores originals in a hash-addressed `RewindStore`. Cite: `README.md:143` @ `c1b936d40b11`.

Probe 4+5+6: P4 PASS as a library/sidecar compressor for selected tool outputs; P5 MEDIUM because semantic loss must be benchmarked per payload class; P6 PASS for prompt-cache discipline only if deterministic output and stable markers are enforced.

### 5. `LiteLLM`

Repo HEAD: `934ecdca78da`.

Elevator pitch: production LLM gateway/router with virtual keys, load balancing, retry/fallback logic, spend tracking, and admin surface.

EEE benefit: compare CLIProxyAPI v6.10.9 account rotation against a mature gateway's routing/fallback primitives; use as reference implementation for account-pool health, virtual-key policy, spend accounting, and model/deployment routing.

Key evidence:
- README lists production gateway features: virtual keys, spend tracking, guardrails, load balancing, and admin dashboard. Cite: `Z:/repos/deps/litellm/README.md:61` @ `934ecdca78da`.
- LiteLLM advertises an Auto Router capability. Cite: `README.md:277` @ `934ecdca78da`.
- Library/router features include retry/fallback logic across multiple deployments, load balancing, cost tracking, OpenAI-compatible errors, and observability callbacks. Cite: `README.md:397-398` @ `934ecdca78da`.

Probe 4+5+6: P4 PARTIAL because eee already has CLIProxyAPI and should not swap gateways casually; P5 LOW as a reference/audit source, HIGH as replacement; P6 PASS as an account-rotation design reference, especially virtual keys plus router health.

### 6. `Portkey Gateway`

Repo HEAD: `351692fd9236`.

Elevator pitch: open-source AI gateway focused on reliable routing, fallbacks, retries, load balancing, conditional routing, and secure key management.

EEE benefit: use as a second independent gateway reference for fill-first vs round-robin, retry/fallback boundaries, and virtual-key management patterns.

Key evidence:
- README says the gateway routes to 1600+ language/vision/audio/image models and is designed for fast, reliable, secure routing. Cite: `Z:/repos/deps/portkey-gateway/README.md:35` @ `351692fd9236`.
- It advertises automatic retries/fallbacks plus load balancing/conditional routing. Cite: `README.md:45-46` @ `351692fd9236`.
- Configs include retry attempts; feature list includes fallbacks, automatic retries with exponential backoff, and secure key management/virtual keys. Cite: `README.md:129-148`, `README.md:193-202` @ `351692fd9236`.

Probe 4+5+6: P4 PARTIAL as reference or shadow gateway; P5 LOW for design extraction, HIGH for live replacement; P6 PASS because routing/fallback/key primitives map directly to OAuth-pool rotation and circuit-breaker design.

### 7. `Restate`

Repo HEAD: `de5bcd3bc4de`.

Elevator pitch: durable execution and reliable communication runtime for long-running agents, workflows, stateful actors, and async tasks.

EEE benefit: architectural optimization reference for durable DAG fan-out, handoff primitives, retry-safe execution, exactly-once message delivery, and resume-after-failure orchestration.

Key evidence:
- README lists durable AI agents, workflows-as-code, microservice orchestration, async tasks, agents, stateful actors, and state machines. Cite: `Z:/repos/deps/restate/README.md:19-26` @ `de5bcd3bc4de`.
- Reliable execution retries recover partial progress and prevent re-executing completed steps. Cite: `README.md:98` @ `de5bcd3bc4de`.
- Reliable communication supports request-response, one-way messages, scheduled tasks, exactly-once semantics, and no-loss/no-duplicate delivery. Cite: `README.md:99` @ `de5bcd3bc4de`.
- Durable promises/timers, consistent state, suspended user code, and OpenTelemetry tracing are core primitives. Cite: `README.md:100-103` @ `de5bcd3bc4de`.

Probe 4+5+6: P4 PASS as an outer orchestrator prototype, not inline hook logic; P5 MEDIUM due runtime footprint; P6 NEUTRAL because it does not manage prompt cache/account affinity directly, but can preserve task state across account failover.

## S4. Token-Efficiency Specific Repos

1. `rtk-ai/rtk@80a6fe606f73`: shell-output filtering/compression with hook-based command rewrite; best for high-frequency `git`, test, lint, search, and log output. Cite: `Z:/repos/deps/rtk-ai__rtk/README.md:118-120`, `README.md:172-183`, `README.md:296-300`.

2. `cnighswonger/claude-code-cache-fix@12cc30a1078c`: prompt-cache prefix normalization, cache-control marker work, tool ordering, resume scatter, image stripping, microcompact sentinel normalization, and cache telemetry. Cite: `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:36-42`, `README.md:214-224`, `README.md:414-439`.

3. `motiful/cc-cache-audit@6bd20812bd46`: focused cache A/B harness for billing-header prefix churn and cross-session cache-read/cache-creation accounting. Cite: `Z:/repos/deps/motiful-cc-cache-audit/README.md:42-77`.

4. `open-compress/claw-compactor@c1b936d40b11`: content-aware reversible compression, semantic dedup, diff/log/code compression, AST-aware handling. Cite: `Z:/repos/deps/open-compress__claw-compactor/README.md:55`, `README.md:141-143`, `README.md:292-303`.

5. `chonkie@5d856a18bad8`: chunking pipeline for RAG/context retrieval with recursive, semantic, late, code, and LLM/agentic chunkers plus token-counting extensibility. Cite: `Z:/repos/deps/chonkie/README.md:104-109`, `README.md:178-190`, `README.md:251-275`.

6. `ace@4f679bef3b78`: agentic context engineering framework that treats context as evolving playbooks to mitigate context collapse; reports lower latency/cost against adaptive baselines. Cite: `Z:/repos/deps/ace/README.md:32`, `README.md:39-43`, `README.md:62-63`.

7. `tokensave@e95c3f2099ce`: already shipped as `cpa-usage-keeper`/token stack adjacent, so not a top-7 recommendation, but still relevant as the local baseline. README says Claude gets code understanding with fewer tokens through MCP tools, CLAUDE.md rules, hooks, and a prebuilt index. Cite: `Z:/repos/deps/tokensave/README.md:461-471`, `README.md:341-356` @ `e95c3f2099ce`.

## S5. VERDICT

Top-3 leverage adopts: canary `rtk-ai/rtk` for shell-output compaction, adopt `motiful/cc-cache-audit` as the cache regression harness, and prototype `cnighswonger/claude-code-cache-fix` behind CLIProxyAPI only after the cache harness proves no prefix or routing regressions.
