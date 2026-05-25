# W268 — Multi-Account Routing + LLM Gateway Audit

> 2026-05-17. Hard cap 1000w. Re-grounds STREAM-C-cross-project-multiaccount.md (`docs/architecture/parallel-sessions/research/STREAM-C-cross-project-multiaccount.md:244-330`) against the official `https://code.claude.com/docs/en/llm-gateway` and W259 ship-decisions for an actionable verdict.

## §1 — Anthropic's official stance (TIER-1-DIRECT)

**There is no CC-native primitive for multi-MAX-account pooling.** Per `https://code.claude.com/docs/en/llm-gateway @ 2026-05-17 [VERIFIED]`, CC supports gateways exclusively via `ANTHROPIC_BASE_URL` (+ `ANTHROPIC_AUTH_TOKEN` / `apiKeyHelper`). Requirements: the gateway must expose `/v1/messages` and forward `anthropic-beta` + `anthropic-version` headers. CC also injects `X-Claude-Code-Session-Id` / `X-Claude-Code-Agent-Id` / `X-Claude-Code-Parent-Agent-Id` for proxy-side cost attribution. Anthropic explicitly documents **LiteLLM** as the reference proxy (with the published Sept-2025 PyPI 1.82.7/1.82.8 credential-stealing-malware warning) and lists Portkey/Bedrock/Vertex/Microsoft Foundry as alternate format-compatible paths. The 5-hour MAX window is per-account; CC itself has no failover hook — failover is *strictly external*. **Codex CLI**: a separate process; its quota is independent of CC. No gateway is needed for codex unless GPT-5.5 throughput becomes load-bearing (today codex usage "almost never runs out" per operator memory, so out of scope).

## §2 — Candidates: D1-D10 + 3-axis gate

Scoring rubric: D1 license / D2 ownership / D3 release-recency / D4 stars / D5 maintenance / D6 docs / D7 install-surface / D8 windows-fit / D9 cardinal-rule-1 / D10 observability (each 0-3; composite 0-30). 3-axis = ≥3 independent orgs converging.

| # | Candidate | D1-D10 | 3-axis | Verdict |
|---|---|---|---|---|
| 1 | **CLIProxyAPI** `router-for-me/CLIProxyAPI` v7.1.9 (2026-05-17), 33.1k★, MIT, single Go binary | 3·3·3·3·3·2·3·3·2·1 = **26** | Anthropic-docs (BASE_URL hook) + upstream (33k★) + W259-catalog L8 + Windows-fork ecosystem (ProxyPilot/Tray/ZeroLimit/CodexCliPlus) → **PASS** | **ADOPT-WHEN** |
| 2 | **LiteLLM** `BerriAI/litellm` v1.99+, ~12k★, open-core (NOASSERTION) | 2·3·3·3·3·3·2·2·3·3 = **27** | Anthropic-docs-endorsed + 12k★ + already a transitive dep (cognee/hindsight) → **PASS**, but TIER-1 warns of Sept-2025 PyPI supply-chain malware (`BerriAI/litellm#24518`) | **ADOPT-WHEN** (cardinal-rule-1 OK only via pinned-Docker, not PyPI) |
| 3 | **claude-code-router** `musistudio/claude-code-router` 25.3k★, MIT, Node.js | 3·3·3·3·3·3·2·2·2·1 = **25** | DeepWiki explicit non-support for MAX-account pooling (provider-routing only); duplicates LiteLLM's job with less convergence | **REJECT for multi-MAX** (orthogonal problem) |
| 4 | **Portkey-AI/gateway** ~7k★, Apache-2 | 3·2·3·2·2·3·2·2·3·3 = **25** | Has CC integration doc but cloud-leaning; enterprise focus | **DEFER-INDEFINITE** for solo-operator |
| 5 | VertexAI / Bedrock | n/a | Cloud-tier-1, off-scope per directive | **REJECT** |
| 6 | OpenRouter | n/a | Cloud-only, off-scope | **REJECT** |

## §3 — Wiring design (CLIProxyAPI, the only multi-MAX pooler)

**Sits in front of CC** (not behind MCP). One env, set in `tools/eee.ps1`:

```powershell
$env:ANTHROPIC_BASE_URL = 'http://127.0.0.1:8317'  # CLIProxyAPI default
```

MCP servers do *not* route through it — they speak MCP, not Anthropic Messages. The proxy owns OAuth login per account (CLI: `cliproxyapi auth claude`), persists `claude-*.json` tokens in its auth-dir, exposes `/v1/messages` for CC. Round-robin / fill-first chosen via `routing.strategy` in `config.yaml`; 429 / 5xx triggers per-credential **cooldown** + automatic retry on the next live credential. Config keys verified in `router-for-me/CLIProxyAPI/config.example.yaml @ sha 8b3670b`: `routing.strategy`, `max-retry-credentials`, `disable-cooling`, `quota-exceeded.switch-project`.

## §4 — Routing policy

**Availability-first round-robin with 429/5xx cooldown** is the only policy that aligns with the operator-direction ("automatic failover, not manual switching"). Cost-based routing is not meaningful inside a MAX-subscription pool (flat-rate). Fill-first (use account-1 until exhausted, then 2) is the alternate setting for predictable cache-hit retention on prompt-caching — but `X-Claude-Code-Session-Id` already gives the proxy enough information for sticky-session routing; recommend starting with **round-robin + sticky-session** (per-session-id pin) once load-bearing.

## §5 — Phoenix / Langfuse trace continuity

Phoenix/Langfuse currently observe via the W265 langfuse-wiring path (`docs/architecture/W265-truth-up-and-langfuse-wiring-2026-05-17.md:66` — cognee/hindsight emit LiteLLM callbacks → Langfuse). CLIProxyAPI has **no Phoenix/Langfuse plugin** (verified — README + deepwiki). Trace continuity options: (a) the proxy logs to its own SQLite/CPA-Manager dashboard (independent observability lane); (b) the `X-Claude-Code-Session-Id` header CC injects is preserved across rotations and lets downstream Langfuse/Phoenix correlate spans by session. **Verdict**: rely on (b) — session-id is preserved end-to-end; no proxy-side instrumentation needed.

## §6 — Cardinal-rule-1 review

| Candidate | Channel | Rule-1 verdict |
|---|---|---|
| CLIProxyAPI | GitHub-release Go binary, pinned tag, checksum-verified | **CLEAN** (operator-install, treat as deliberate; W259 catalog rates "L8 promote to T1 on demand") |
| LiteLLM | **Pinned Docker only** (`ghcr.io/berriai/litellm:v1.X-stable`). PyPI install **prohibited** until the Sept-2025 incident is age-mitigated. | **CONDITIONAL CLEAN** |
| claude-code-router | npm-global, Node runtime | Rule-1 clean *as a runtime*, but rejected on functional fit (§2) |

## §7 — Concrete recommendation

**ADOPT-WHEN for CLIProxyAPI; KEEP-PARKED for LiteLLM; REJECT claude-code-router for this layer.**

Trigger to flip CLIProxyAPI to ADOPT-NOW: ≥1 measured rate-limit event inside a single fan-out (e.g. background-session swarm exhausting an account's 5-hour MAX window) — *not* before. Until that trigger fires:
1. The CCBP `CLAUDE_CONFIG_DIR`-per-account alias pattern (already documented in STREAM-C §5.2) covers manual switching at zero install cost.
2. LiteLLM stays catalogued at L1 (DeepSeek/local-model escape valve, distinct problem) per W259-SHIP-DECISIONS.md:42.
3. Codex GPT-5.5: no gateway needed — operator-confirmed "almost never runs out."

When the trigger fires, ship CLIProxyAPI in three steps: (i) checksum-verify `v7.1.9` Go binary; (ii) `cliproxyapi auth claude` for each MAX account; (iii) add the `ANTHROPIC_BASE_URL` line to `tools/eee.ps1`. No CC settings change. No plugin install. Cardinal-rule-2 clean (env redirect, not a hook).

**Word count: 996**
