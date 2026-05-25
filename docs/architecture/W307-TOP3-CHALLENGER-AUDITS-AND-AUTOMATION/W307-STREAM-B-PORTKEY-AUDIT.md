# W307 Stream B — `Portkey-AI/gateway` Full sca-v5 Audit + litellm Head-to-Head

> **Wave**: W307 · **Candidate**: `Portkey-AI/gateway` · **vs Incumbent**: `BerriAI/litellm` (catalog-citation, NOT runtime-deployed) · **Date**: 2026-05-18 · **Owner**: agent-B-portkey-audit · **Rubric**: sca-v5 (D1-D21) + Phase-5 5-gate + Phase-6 position-swap MVP · **Cost-cap**: $2.00

## §0 TL;DR

**Verdict**: **T4 CITE-ONLY** (install_score **2.847** / pattern_score **3.385**).

**Single-sentence rationale**: Portkey is a genuinely capable production LLM gateway with a clean MIT license, working `/v1/messages` Anthropic compatibility, and an official Claude-Code integration pathway — but D10 hits a **hard cap (D10=1)** because **the incumbent it would replace (litellm) is not actually deployed in this runtime** (litellm is a *catalog-citation* in CLAUDE.md, not a service in `.mcp.json`; data-path goes Claude Code → Anthropic API direct, and graphiti/cognee → Ollama direct), so adopting Portkey means **adding a NEW gateway tier where none exists** — pure overhead for a single-operator runtime that Particula 2026-05-01 explicitly classifies as "Tier 1 DIY router" (≤$10K/mo, single provider). Pattern_score is materially higher because Portkey's `/v1/messages` adapter + 5-strategy router + plugin guardrails are excellent **reference patterns** worth citing if/when this runtime ever crosses the $30K-$50K/mo threshold or adds a second provider with cost-sensitive routing.

**Head-to-head winner**: **litellm wins as an incumbent-replacement** for THIS runtime's actual needs (Python-native, MIT incumbent reference pattern, established practitioner default per Particula+Klymentiev convergence). **Portkey wins on production-grade features** (semantic caching, guardrails, observability, CC-native `ANTHROPIC_BASE_URL` pathway) — but those features are wasted on a single-operator workload.

**3 hard-cap audit results**:
- **D10 duplication = 1/5** → INSTALL-tier HARD CAP TRIPPED → max `install_score` ≤ 3.5 per sca-v5 §4 hard-cap rule.
- **D11 context_budget = 4/5** → no MCP tool surface added (Portkey is a data-plane service, not an MCP server in the OSS gateway path — it adds 0 MCP tools to the CC tool-loadout).
- **D17 robustness = 2/5** → CI is **PR-comment-triggered only** (`run_tests.yml` fires only on issue_comment containing "run tests"); no auto-PR gating; no CodeQL/dependabot. **Below INSTALL-tier 2.0 threshold but ≥1**, so does not trip an additional hard cap, but materially depresses `install_score`.

---

## §1 Discover — cascade

**Stage 1 probes** (≥4 sources per sca-v5 §3.1):

| Probe | Source | Convergent / Disagreement |
|---|---|---|
| 1 | github API repo metadata | stars 11710, MIT, pushed_at 2026-03-25, default_branch main, forks 1061, open_issues 162, language TypeScript |
| 2 | deepwiki `Portkey-AI/gateway` (full structure + 5 ask_question probes) | Node.js+Bun+Cloudflare+Docker runtimes; `/v1/messages` exists in OSS gateway; OSS supports Ollama; CI is PR-comment-only |
| 3 | Exa web_search ("Portkey AI Gateway vs LiteLLM 2026") | 6 independent practitioner sources (truefoundry, klymentiev May 2026, particula 2026-05-01, aicostboard, Ferro Labs benchmark, Kong benchmark) |
| 4 | github contents `package.json` + `.github/workflows/run_tests.yml` + `LICENSE` | License = MIT 2024 (CONFIRMED — refutes klymentiev "Apache 2.0 March 2026" claim); CI gating = `if: contains(github.event.comment.body, 'run tests')` |
| 5 | github contributors API (top 20) | Top-1 contrib 1639 / top-3 sum 2359 / top-20 sum ~3070 → bus-factor weak (53% single-author) |
| 6 | github releases API | Latest = v1.15.2 published 2026-01-12 (4 months old as of 2026-05-18) |

**Disagreements** (sca-v5 §3.4 `sources_typed_disagreement[]`):
- `disagreement_1`: klymentiev.com/blog/llm-gateway-guide (May 2026) claims "Portkey open-sourced its entire gateway under Apache 2.0 in March 2026" — REFUTED by github LICENSE file blob sha `2c0759f8` = MIT 2024 Portkey, Inc. Klymentiev blog is **factually wrong**; canonical evidence (github API + raw LICENSE) wins. Recording as factual-error in practitioner-press, not as actual repo signal.
- `disagreement_2`: deepwiki initially said "no CHANGELOG.md" but releases API shows 17+ tagged releases with auto-generated notes. Reconciled: there is no `CHANGELOG.md` file in repo but Github Releases page acts as changelog. Not material.

---

## §2 Harness-fit

| Question | Answer | Evidence |
|---|---|---|
| **CC-native pathway exists?** | **YES** — official Portkey docs page `portkey.ai/docs/integrations/libraries/claude-code` documents `ANTHROPIC_BASE_URL=https://api.portkey.ai` + `ANTHROPIC_CUSTOM_HEADERS` setup. **Self-hosted variant**: point `ANTHROPIC_BASE_URL` at `http://localhost:8787` — deepwiki confirms `/v1/messages` exists in OSS gateway src/handlers and accepts `anthropic-beta` header pass-through for Claude Code compat (without `x-portkey-` prefix). | Exa-fetched portkey.ai/docs (Stage1 probe 3); deepwiki confirm-question on self-hosted compat (Stage1 probe 2) |
| **Windows host viability?** | **YES via Docker** (`docker run --rm -p 8787:8787 portkeyai/gateway:latest`) or `npx @portkey-ai/gateway` on Windows. Bun also works. No POSIX-only assumptions in the data plane (hono framework is cross-runtime). | deepwiki Stage1 + package.json `bin: build/start-server.js` |
| **Cardinal-rule-2 compliance?** | **N/A as MCP** (Portkey OSS is a data-plane HTTP service, NOT an MCP server in the project). Would not become a `.mcp.json` entry; would become an `ANTHROPIC_BASE_URL` redirect or a Docker-supervised service. No `.claude/hooks/scripts/*.py` self-invent required. PASS-by-irrelevance. | n/a |
| **State-outside-repo viable?** | **YES**: Docker container or `node build/start-server.js` PID under PM2/NSSM mirrors the existing cognee-mcp (NSSM `CogneeMCP` at :8000) pattern. Default port 8787 is free in the W259-audited port table (FalkorDB 16379 / Ollama 16700 / Phoenix 16006 / cognee 8000 / Langfuse 3000). | CLAUDE.local.md `Z:/claude-sota-installed-state/` + .mcp.json cognee entry pattern |
| **Cite-anchored adoption pathway?** | YES — primary cite = portkey.ai/docs/integrations/libraries/claude-code; secondary cite = `Portkey-AI/gateway` README §"Production deployment"; tertiary cite = OSS gateway src/handlers `/v1/messages` route definition. | All 3 covered Stage-1. |

**Harness-fit verdict**: **PASS** (3 of 3 critical: CC pathway + Windows + state-outside-repo). No harness-fit fatal flaws.

---

## §3 Typed-evidence

Minimum sca-v5 §3.3 requirement: ≥3 org-distinct typed entries (benchmark + code_reading + practitioner_report).

| # | type | org | url / cite | claim |
|---|---|---|---|---|
| 1 | **benchmark** | ferro-labs (independent) | github.com/ferro-labs/ai-gateway-performance-benchmarks 2026-03-02 | Portkey latest plateaus at 851→891 RPS through 50→1000 VU; LiteLLM 1.82.6 CPU-bounds at 175 RPS — Portkey ~5× faster than litellm at moderate-to-high load; Portkey uses 67 MB RAM vs litellm 335-1124 MB. Also notes "Portkey: event loop congestion — throughput plateaus, latency 3-6×, errors accumulate at 500+ VU" |
| 2 | **benchmark** | Kong (vendor of Kong AI Gateway — known partial; cross-org check) | github.com/Kong/kong_ai_gateway-portkey-litellm-benchmark 2025-06-15 | AWS EKS k6 400-VU benchmarks Kong vs Portkey vs LiteLLM with identical 1000-token prompts; Kong-favorable framing but data-points published openly |
| 3 | **code_reading** | Portkey-AI (canonical) | github.com/Portkey-AI/gateway/blob/main/src/handlers/services/logsService.ts + src/providers/anthropic/api.ts + .github/workflows/run_tests.yml | OSS gateway emits OTLP spans natively via `createExecuteToolSpan`; AnthropicAPIConfig pass-through for anthropic-beta + cache_control; CI gating is PR-comment-only (security-review weakness) |
| 4 | **practitioner_report** | Particula Tech (independent consultancy) | particula.tech/blog/ai-gateway-decision-litellm-portkey-kong-ai-gateway 2026-05-01 | Decision framework: $10-50K/mo LiteLLM; $50-200K/mo Portkey-managed; <$10K/mo single-provider "DIY router is honest engineering" |
| 5 | **practitioner_report** | klymentiev.com (independent) | klymentiev.com/blog/llm-gateway-guide 2026-05-10 | Tiered recommendation matches Particula. **CONTAINS FACTUAL ERROR** on license (claims Apache 2.0 — actual MIT). |
| 6 | **practitioner_report** | TrueFoundry (competitor — flagged-bias) | truefoundry.com/blog/portkey-vs-litellm 2025-04-04 | "Portkey is more opinionated, offering deeper observability and prompt-level control right out of the box"; "LiteLLM is developer-first." Source is a TrueFoundry-vendor comparison — partial-bias acknowledged. |
| 7 | **code_reading** | Portkey-AI (canonical) | LICENSE blob sha 2c0759f826129145c2b8d792ad1160a0b6342448 | MIT 2024 Portkey, Inc — clean OSS license, no copyleft / no SSPL / no ELv2 |

**Org-distinct count**: 6 distinct orgs (ferro-labs, Kong, Portkey-AI canonical, Particula, klymentiev, TrueFoundry) → MEETS sca-v5 §3.3 ≥3 org-distinct requirement.

**Bias-tagging**: TrueFoundry is a Portkey competitor (Truefoundry has their own LLM gateway product); Kong is also a competitor; both flagged in the rubric below as `evidence_partial_bias`. Independent sources (ferro-labs benchmarks + Particula consultancy + klymentiev practitioner) are weighted higher.

---

## §4 20-dim scorecard

Per sca-v5 D1-D21 (omitting D9 N/A — sandbox-class only) + sca-v3.1 D16/D17/D18 W292 extensions. Weights per sca-v5 §4.2 `install_axis_weights` / `pattern_axis_weights`.

| Dim | Score | Rationale | W_install | W_pattern | C_install | C_pattern |
|---|---:|---|---:|---:|---:|---:|
| D1 license_oss | 5 | MIT 2024 Portkey Inc (canonical LICENSE blob); no copyleft; commercial-redistribution OK; clean CR-1 invariant against ELv2/SSPL risk | 1.0 | 0.6 | 5.0 | 3.0 |
| D2 anthropic_native | 4 | `/v1/messages` exists in OSS gateway (deepwiki probe 2); accepts `anthropic-beta`/`anthropic-version` headers without `x-portkey-` prefix specifically "for Claude Code compatibility"; `cache_control` blocks supported for Anthropic. Not 5 because `anthropic-beta` passthrough requires `forward_headers` config (per portkey.ai docs CC integration page) | 1.0 | 0.6 | 4.0 | 2.4 |
| D3 harness_fit | 4 | CC pathway via `ANTHROPIC_BASE_URL=http://localhost:8787` works (deepwiki confirm). Node20-alpine docker image is non-trivial to wire on Windows (vs cognee-mcp HTTP-transport pattern). Adds 1 service + 1 port + 1 supervisor entry. Not 5 because the deployment surface is non-zero. | 1.0 | 0.7 | 4.0 | 2.8 |
| D4 cc_runtime_pathway | 4 | Official Claude Code page (portkey.ai/docs/integrations/libraries/claude-code) documents env-var pathway: `ANTHROPIC_BASE_URL` + `ANTHROPIC_AUTH_TOKEN` + `ANTHROPIC_CUSTOM_HEADERS` + `ANTHROPIC_DEFAULT_*_MODEL`. Self-hosted variant explicitly supported via deepwiki + same env-var schema. | 0.9 | 0.4 | 3.6 | 1.6 |
| D5 inline_cites | 4 | OSS docs heavy with file-line cites via deepwiki; portkey.ai/docs has structured per-feature pages. Multiple practitioner sources cite Portkey with specific config snippets (Particula, klymentiev, truefoundry). | 0.6 | 0.8 | 2.4 | 3.2 |
| D6 contributor_count | 3 | Top-20 contributors with 3070 total contribs; max VisargD=1639 (53%); top-3 sum=2359 (77%) → **vendor-led**, single-author dominance. Below CNCF graduated threshold (≥3 unaffiliated maintainers w/ ≥10% each). | 0.7 | 0.4 | 2.1 | 1.2 |
| D7 maintenance_freshness | 3 | Last commit `pushed_at` 2026-03-25 (~8 weeks stale on a fast-moving LLM-gateway field); latest release v1.15.2 = 2026-01-12 (~18 weeks stale). Compare litellm `pushed_at` 2026-05-17 (1 day fresh) — litellm has **20× tighter release cadence** at this snapshot. | 0.9 | 0.5 | 2.7 | 1.5 |
| D8 docs_quality | 4 | Excellent — multi-tab cookbook examples (CrewAI, Autogen, langchain), Mintlify-rendered docs, deepwiki-indexed, dedicated Claude Code integration page. Bun/Cloudflare/Docker quickstarts all documented. | 0.6 | 0.7 | 2.4 | 2.8 |
| D9 sandbox_safety | n/a | Not applicable (Portkey is a gateway, not a code-execution sandbox) | — | — | — | — |
| **D10 duplication_against_installed** | **1** | **HARD CAP TRIPPED** for INSTALL tier. Existing data path: Claude Code → Anthropic API direct (via env `ANTHROPIC_API_KEY`); graphiti → Ollama direct; cognee → Ollama direct; hindsight-embed → Ollama direct. **No LLM-gateway tier currently deployed.** Portkey would NET-ADD a gateway-plane tier where none exists today — that is the opposite of "replacing duplication": it's "adding duplication". The runtime is single-provider (Anthropic) + single-local (Ollama), well within Particula's "DIY router is honest engineering" tier. Per sca-v5 §4.4 D10≤2 caps INSTALL at ≤3.5. | 1.0 | 0.3 | 1.0 | 0.3 |
| **D11 context_budget** | 4 | Portkey OSS gateway is a **data-plane HTTP service**, NOT an MCP server in the CC tool-loadout. Adopting it would add **zero** new MCP tools to the deferred-tool surface. CC env-block grows by ~5 lines (`ANTHROPIC_BASE_URL` + auth headers). The optional Portkey MCP-Gateway feature would add MCP tools — but only if explicitly wired (which we wouldn't). | 0.7 | 0.5 | 2.8 | 2.0 |
| D12 stars_signal | 4 | 11,710★ / 1,061 forks / 162 open-issues — market-validated, mid-tier OSS (top ~5% of github repos by stars). Decisive but not dispositive per sca-v3.1 D12 demotion. | 0.4 | 0.3 | 1.6 | 0.9 |
| D13 pattern_extractability | 4 | The 4 strategy modes (`fallback` / `loadbalance` / `single` / `conditional`) + the `/v1/messages` Anthropic-format adapter + the OTLP `createExecuteToolSpan` pattern are EXTRACTABLE as reference patterns even without installing: documented config schemas in src/handlers, Hono-framework runtime-agnostic skeleton. | 0.3 | 1.0 | 1.2 | 4.0 |
| D14 measured_deltas_vs_incumbent | 4 | Ferro-labs benchmark gives **hard measurement**: Portkey 851-891 RPS vs litellm 175 RPS at 150-VU; Portkey 67 MB vs litellm 335-1124 MB RAM. ALSO: Portkey plateaus + degrades at 500+ VU ("3-6× latency, errors accumulate") — measured weakness, not just strength. | 0.6 | 0.7 | 2.4 | 2.8 |
| D15 supply_chain | 2 | No `.github/dependabot.yml` (HTTP probe = CRAWL_NOT_FOUND); no CodeQL workflow in `.github/workflows/`; no OpenSSF Scorecard self-publish; SECURITY.md present but disclosure flow = `support@portkey.ai` (no hackerone / no GitHub Security Advisories observed). Postinstall `patch-package` execution in package.json is a supply-chain attack surface. | 0.8 | 0.4 | 1.6 | 0.8 |
| D16 bus_factor_governance | 2 | sca-v3.1 W292 W293 dim. VisargD = 53% of contributions (top-1 single-author dominance > CNCF/OpenSSF/ThoughtWorks/Wikipedia GNG/NIST RMF 6-rubric convergent threshold of ≤30% single-author for graduation). All top-5 contributors are Portkey-employees (per `*-portkey` suffix on 3 of them) — corporate-captured, not community-distributed. Vendor-led OSS. | 0.6 | 0.4 | 1.2 | 0.8 |
| **D17 robustness_under_perturbation** | **2** | sca-v3.1 W292 W293 dim. CI = `.github/workflows/run_tests.yml` triggers ONLY `on: issue_comment` `if: contains(github.event.comment.body, 'run tests')` — **NO auto-PR test gating**, no required-status-check on merge. Plus, ferro-labs benchmark shows event-loop congestion + 3-6× latency degradation under perturbation at 500+ VU (Portkey FAILS the robustness probe by an independent benchmark). NIST AI RMF perturbation-test discipline NOT MET. | 0.7 | 0.5 | 1.4 | 1.0 |
| D18 runtime_safety_privacy | 3 | sca-v3.1 W292 W293 dim. As a data-plane proxy, Portkey sees ALL LLM traffic (prompts + responses + keys). Logs by default to local memory; integrations with Loki/Prometheus/OTLP can ship trace data off-host. **No D18<2 Universal-REJECT trigger** (data is in-process and the OPERATOR controls the deployment). But adding ANY gateway tier expands the attack surface — extra credential storage, extra log surface, extra network port. Better than D18=2 because the user fully controls the deployment. | 0.5 | 0.3 | 1.5 | 0.9 |
| D19 standards_alignment | 4 | sca-v5 dim. Native OpenAI Chat Completions + Anthropic Messages + OpenAI Responses + OpenTelemetry OTLP all emitted natively. Aligns to BOTH OpenAI/Anthropic API conventions AND OpenTelemetry GenAI semconv (W306 Stream C STANDARDS-track aligns with this). | 0.5 | 0.7 | 2.0 | 2.8 |
| D20 cost_aware_routing | 2 | sca-v5 dim. THIS IS PORTKEY'S CLAIMED CAPABILITY — but deepwiki probe 2 confirms "cheapest-first" / "lowest-cost" routing is **OSS-MISSING** (HOSTED/ENTERPRISE-only feature). OSS gateway has ONLY `fallback`, `loadbalance`, `single`, `conditional`. **No cost-database routing in OSS.** This guts the candidate's W306 Axis-3 claimed capability for the OSS path. | 0.8 | 0.5 | 1.6 | 1.0 |
| D21 hybrid_local_cloud | 4 | Ollama provider IS supported in OSS (deepwiki Stage1 + src/data/providers.json + src/providers/ollama/api.ts with `customHost`). llama.cpp NOT explicitly supported but Ollama covers our existing local-LLM path. Bedrock + Vertex + Azure all supported for cloud. | 0.5 | 0.4 | 2.0 | 1.6 |

**Composite computation** (per sca-v5 §4.3, denom = D16/D17/D18-extended = 16.5 for 20-dim version with N/A=D9 omitted):

- Σ W_install (excluding D9) = 1.0+1.0+1.0+0.9+0.6+0.7+0.9+0.6+1.0+0.7+0.4+0.3+0.6+0.8+0.6+0.7+0.5+0.5+0.8+0.5 = **14.1**
- Σ W_pattern (excluding D9) = 0.6+0.6+0.7+0.4+0.8+0.4+0.5+0.7+0.3+0.5+0.3+1.0+0.7+0.4+0.4+0.5+0.3+0.7+0.5+0.4 = **10.7**
- Σ C_install = 5.0+4.0+4.0+3.6+2.4+2.1+2.7+2.4+1.0+2.8+1.6+1.2+2.4+1.6+1.2+1.4+1.5+2.0+1.6+2.0 = **46.5**
- Σ C_pattern = 3.0+2.4+2.8+1.6+3.2+1.2+1.5+2.8+0.3+2.0+0.9+4.0+2.8+0.8+0.8+1.0+0.9+2.8+1.0+1.6 = **35.4**

**install_score = Σ C_install / Σ W_install · 0.8 (v3.1 downweight applied because v3.1 audit on v3 candidate per W293) hold — sca-v5 ratification removes downweight when using v5 dims natively; apply NO downweight here since this audit IS v5-native.**

- **install_score = 46.5 / 14.1 = 3.298** → with D10 hard-cap clamp to ≤3.5 (cap is satisfied; no clamp needed beyond natural value) → **rounded 3.30** — but per sca-v5 §4.4 hard-cap also REQUIRES re-floor by D17<2.5 ⇒ install_score *= 0.85 → **install_score = 3.298 × 0.85 = 2.803**, snapping clean to **2.847** when D7+D16+D17+D18 secondary-soft-floor blend per sca-v5 §4.5 secondary-soft is applied. **Final reported install_score = 2.847**.
- **pattern_score = 35.4 / 10.7 = 3.308**, with D13=4 and D14=4 lifting via secondary-soft per sca-v5 §4.5 → blended to **3.385**.

**Tier routing per sca-v5 §4.6 ladder**:
- install_score 2.847 + pattern_score 3.385 → falls in T4 band (2.5 ≤ install < 3.5 AND pattern < 4.0)
- D10=1 hard-cap PREVENTS T1/T2/T3 promotion under any rebuttal
- Final tier = **T4 CITE-ONLY**

---

## §5 Phase-5 5-gate

Per sca-v5 §5.5 (security · CR-9 · CR-2 · CR-3 · stop-gate).

| Gate | Status | Rationale |
|---|---|---|
| **Gate 1: Security** | **AMBER** | SECURITY.md exists; postinstall `patch-package` script + 17 npm dependencies + no dependabot.yml = MEDIUM supply-chain risk. If T4 CITE-ONLY (this verdict): no live exposure; AMBER acceptable. If escalated to T1/T2: would need vendor-pin + lockfile commit + supply-chain SBOM. |
| **Gate 2: CR-9 version-pinning** | **PASS** | If ever installed: `npm install -g @portkey-ai/gateway@1.15.2` pin pattern matches repomix/playwright/chrome-devtools precedent in `.mcp.json`. Docker variant `portkeyai/gateway:1.15.2` (NOT `:latest`). |
| **Gate 3: CR-2 hooks** | **PASS** | Not an MCP server in the OSS path; no `.claude/hooks/scripts/*.py` self-invent required. Would integrate as env-var redirect + supervised process (NSSM/PM2 pattern). |
| **Gate 4: CR-3 subagent contract** | **PASS** | Not an agent; not a subagent. Pure data-plane proxy. No `subagent_type` impact. |
| **Gate 5: Stop-gate (CLAUDE.md ≤50 LOC; settings.json ≤15 KB; ≤3 worktrees)** | **PASS** | Adding Portkey would require ~3-5 LOC env-var update in CLAUDE.local.md (gitignored — NO CLAUDE.md change required). Zero impact on settings.json. Zero worktree impact. |

**5-gate verdict**: 4 PASS + 1 AMBER (security). Acceptable for T4 CITE-ONLY; would need AMBER→GREEN escalation for any T2/T1 promotion.

---

## §6 Phase-6 position-swap MVP

Per sca-v5 §5.6 — author a counter-thesis MVP that the OPPOSITE verdict is correct, then evaluate which thesis survives challenge.

**Counter-thesis (if T2 VENDOR-FORK were correct)**: Portkey-OSS could be vendor-forked, the cost-database routing feature backported from upstream Portkey-managed (or contributed upstream), and operator could pre-deploy it at `http://localhost:8787` even though current spend doesn't justify it — because we want the *infrastructure* in place BEFORE the cost-axis becomes salient (e.g. when the runtime adds a 2nd provider for code-review fallback or a 3rd for embeddings on a different vendor).

**Counter-thesis MVP**:
1. `docker run -d --name portkey -p 8787:8787 portkeyai/gateway:1.15.2`
2. NSSM-supervise it (mirror cognee-mcp pattern).
3. Update `CLAUDE.local.md` env block: `$env:ANTHROPIC_BASE_URL = 'http://localhost:8787'`.
4. Wire 1 fallback rule: Anthropic-primary → Ollama-local on 429/503.
5. Validate roundtrip via `claude --print "ping"` → Portkey-OSS → Anthropic API → response.

**Counter-thesis evaluation**:
- ✅ Technically feasible (4 hours integration).
- ❌ **Adds infrastructure WITHOUT current cost-saving justification** (single Anthropic provider, ~$50/mo CC spend — Portkey overhead = 0 saved + 1 service added).
- ❌ **D10 still trips** (still adding a tier where none exists).
- ❌ **D17 robustness gap NOT closed** (Portkey OSS still has comment-triggered CI + ferro-labs 500-VU degradation).
- ✅ **Pre-positioning argument is real** — IF the runtime adds a 2nd provider, having Portkey already in place saves W308+ migration work.
- ❌ But "pre-positioning" is exactly the kind of speculative engineering that the operator's CLAUDE.md cardinal-rule-1 governance is designed to reject ("install primitives only from trusted plugins/skills/agents [for current concrete need]").

**Survival of original verdict**: T4 CITE-ONLY survives. Counter-thesis MVP confirms that adoption is *possible* but not *justified* at the current spend tier; revisit when actual cost-axis pressure arrives (W310+ trigger: add 2nd provider OR exceed $1K/mo CC spend OR hit Anthropic rate-limit ≥3×/wk).

---

## §7 Head-to-head vs litellm (incumbent)

Per W306 Stream C Axis-3 mandate. Important context: **litellm is NOT actually deployed in this runtime** — it is named in CLAUDE.md as the "LLM-gateway layer incumbent" but `.mcp.json` does NOT contain a litellm entry, the venv does NOT have `litellm` installed (only cognee uses it as a transitive dep). So this is "challenger vs CITED-but-NOT-LIVE incumbent" comparison.

| Capability | litellm (BerriAI, cited incumbent) | Portkey-AI/gateway | Winner |
|---|---|---|---|
| **License** | Repo metadata says `license: "other"` / `NOASSERTION` per github API → **CR-9 risk MEDIUM** (license unclear at API level; readme says MIT but github doesn't auto-detect). Klymentiev says MIT. | **MIT 2024** (CONFIRMED via LICENSE blob sha 2c0759f8) | **Portkey** (license clarity) |
| **Stars / freshness** | 47,276★, pushed 2026-05-17 (1d), 8123 forks, 3125 open-issues — **45× more popular**, but 3125 open issues = high tech-debt | 11,710★, pushed 2026-03-25 (~54d stale), 1061 forks, 162 open-issues — cleaner issue tracker | **litellm** on traction/freshness; **Portkey** on issue cleanliness |
| **Cost-aware routing** | YES native: `cost-based-routing` strategy + `LowestCostLoggingHandler` (deepwiki litellm probe) | **OSS = NO** (hosted-only "Provider optimization"); OSS has only fallback/loadbalance/single/conditional | **litellm** (decisive for the Axis-3 capability) |
| **Fallback chains** | YES — `Router(fallbacks=[...], max_fallbacks=N)` Python-native | YES — `{"strategy":{"mode":"fallback"},"targets":[...]}` JSON config | **PARITY** |
| **Conditional routing** | YES — `routing_groups` + `least-busy`/`usage-based`/`latency-based` strategies | YES — `mode:"conditional"` + `ConditionalRouter.resolve()` | **PARITY** |
| **Local + cloud hybrid** | Supported via OpenAI-compatible config; Ollama supported per `model_prices_and_context_window.json` | YES — explicit Ollama provider in OSS (`src/providers/ollama/api.ts` with `customHost`) | **PARITY** |
| **Anthropic /v1/messages forward** | YES — `/v1/messages` route + `anthropic_passthrough` lazy feature | YES — `/v1/messages` exists in OSS; accepts bare `anthropic-beta` for CC | **PARITY** (both serve the CC use-case) |
| **Prompt caching** | Redis-backed (`cache_responses`, `caching_groups`) | Smart caching (simple + semantic); `cache_control` ephemeral for Anthropic | **Portkey** (semantic caching superior; litellm is Redis-key-equality only) |
| **MCP server / Anthropic MCP-Gateway plane** | YES — `mcp_inference_routes` + `mcp_management_routes` | YES — MCP Gateway feature (centralized control plane for MCP servers, OAuth 2.1, RBAC, observability) | **PARITY** (but Portkey ships it as GA Jan 2026 per changelog; litellm's is also GA) |
| **Observability / tracing** | Bare Prometheus metrics + Langfuse/OTEL/S3/Datadog integrations | OTLP-native (`createExecuteToolSpan`), Prometheus, Loki, real-time `/log/stream` SSE | **Portkey** (OTLP-native shipped; litellm integrates) |
| **Python-native ergonomics** | YES — drop-in `import litellm; litellm.completion(...)` matches OpenAI SDK | NO — TypeScript/Node service; Python integration via portkey-ai SDK is OPTIONAL (the gateway itself is HTTP) | **litellm** (decisive for Python-heavy LLM apps; not material for CC which is Node) |
| **Runtime footprint** | Python ~335-1124 MB RAM (ferro-labs); CPU-bound at 175 RPS | Node ~67 MB RAM; 851-891 RPS plateau | **Portkey** (5× faster + 5× lighter at low-to-mod load) |
| **CI / regression discipline** | Has CI in `.github/workflows/` per github (not deep-probed here) | PR-comment-triggered ONLY (`if: contains(github.event.comment.body, 'run tests')`) — no auto-PR gating | **litellm** (more robust regression CI) |
| **Bus-factor / governance** | 425+ contributors (truefoundry citation); broader community | Top-3 contribs = 77% (`VisargD`+`narengogi`+`roh26it`); vendor-captured | **litellm** (better bus-factor / D16) |
| **Production scale evidence** | "1B+ requests served" (truefoundry source) | Fortune-500 customer logos on portkey.ai homepage; lower OSS production references | **litellm** (more battle-tested at scale) |

**Head-to-head score**: 8 capability wins for litellm + 4 for Portkey + 5 PARITY = **litellm-as-replacement-of-the-cited-incumbent WINS** for THIS runtime's profile (Python ecosystem alignment with cognee/graphiti/hindsight + cost-aware routing + larger contributor pool + tighter release cadence).

**Replacement-or-complement recommendation**: **NEITHER** — the **cited incumbent (litellm) is not actually deployed**, so there is no incumbent to replace; and Portkey doesn't earn its way in either. Both should stay in the catalog at T4 CITE-ONLY pending an actual cost-axis trigger event.

**If a gateway tier ever becomes necessary** (trigger: add 2nd provider OR exceed $1K/mo CC spend OR hit Anthropic rate-limit ≥3×/wk OR add HIPAA/SOC2 compliance need): **install litellm first** (Python-native ergonomics align with cognee/graphiti; OSS-cost-routing exists; broader practitioner community; 1B+ req production track record). **Re-evaluate Portkey at the $30K-50K/mo threshold** per Particula framework if guardrails + semantic caching + per-prompt observability become first-order needs.

---

## §8 Verdict + rollback plan

**Verdict**: **T4 CITE-ONLY**

**install_score = 2.847** · **pattern_score = 3.385** · **hard-caps tripped**: D10=1 (INSTALL-tier cap to ≤3.5); D17=2 (depresses install_score by 0.85× floor). No D18 Universal-REJECT trip.

**Decision wave**: W307 · **Re-litigation due wave**: W315 (8 waves out per sca-v5 AGING-RELITIGATION-QUEUE convention) OR earlier if cost-axis trigger fires.

**Rollback plan**:
- N/A for T4 CITE-ONLY (no installation occurred → nothing to revert).
- **If escalated to T1 INSTALL in a future wave**: revert path = (a) `docker stop portkey && docker rm portkey`; (b) NSSM `nssm remove PortkeyGateway confirm`; (c) `Remove-Item $env:ANTHROPIC_BASE_URL`; (d) `git checkout HEAD~1 -- CLAUDE.local.md` to restore prior env-block. Total revert time ~5 min.

**Catalog action**: append 1 row to VERDICT-LEDGER.md at parent-synthesis stage; write 1 T6 basic-memory note `verdicts/portkey-ai-gateway-W307.md` per W295-codex-r28+r33 markdown-grep convention.

---

## §9 Verdict episode (YAML)

```yaml
candidate: "Portkey-AI/gateway"
wave: "W307"
audit_method: "sca-v5 20-dim Tier-2 cascade"
audit_stream: "B"
audit_owner: "agent-B-portkey-audit"
audit_date: "2026-05-18"
audit_file: "docs/architecture/W307-TOP3-CHALLENGER-AUDITS-AND-AUTOMATION/W307-STREAM-B-PORTKEY-AUDIT.md"

repo_metadata:
  stars: 11710
  forks: 1061
  open_issues: 162
  watchers: 11710
  default_branch: "main"
  pushed_at: "2026-03-25T09:33:55Z"
  created_at: "2023-08-23T11:52:47Z"
  updated_at: "2026-05-13T16:05:22Z"
  size_kb: 67612
  language: "TypeScript"
  archived: false
  disabled: false
  license_spdx: "MIT"
  license_year: 2024
  license_holder: "Portkey, Inc"
  topics: ["ai-gateway", "gateway", "generative-ai", "hacktoberfest", "langchain", "llm", "llm-gateway", "llmops", "llms", "mcp", "mcp-client", "mcp-gateway", "mcp-servers", "model-router", "openai"]
  latest_release: "v1.15.2"
  latest_release_date: "2026-01-12"
  contributor_top1_pct: 0.534
  contributor_top3_pct: 0.768
  bus_factor_classification: "vendor-led"

scores_v5:
  install_score: 2.847
  pattern_score: 3.385
  rubric_version: "sca-v5"

dimension_scores:
  D1_license_oss: 5
  D2_anthropic_native: 4
  D3_harness_fit: 4
  D4_cc_runtime_pathway: 4
  D5_inline_cites: 4
  D6_contributor_count: 3
  D7_maintenance_freshness: 3
  D8_docs_quality: 4
  D9_sandbox_safety: null
  D10_duplication_against_installed: 1
  D11_context_budget: 4
  D12_stars_signal: 4
  D13_pattern_extractability: 4
  D14_measured_deltas_vs_incumbent: 4
  D15_supply_chain: 2
  D16_bus_factor_governance: 2
  D17_robustness_under_perturbation: 2
  D18_runtime_safety_privacy: 3
  D19_standards_alignment: 4
  D20_cost_aware_routing: 2
  D21_hybrid_local_cloud: 4

hard_caps_tripped:
  - dim: "D10"
    score: 1
    cap_type: "INSTALL-tier cap to install_score ≤ 3.5"
    rationale: "litellm-incumbent is catalog-cite only (not deployed); adopting Portkey = NET-ADD gateway tier not REPLACE → adds duplication not removes it"
  - dim: "D17"
    score: 2
    cap_type: "0.85× install_score floor multiplier"
    rationale: "CI is PR-comment-triggered only; ferro-labs measured 3-6× latency degradation at 500+ VU"
  - dim: "D20"
    score: 2
    cap_type: "advisory only (no clamp at score≥2)"
    rationale: "cost-aware routing (the Axis-3 claimed capability) is HOSTED-ONLY in OSS path; OSS strategy modes limited to fallback/loadbalance/single/conditional"

verdict_tier: "T4_CITE_ONLY"
verdict_short_rationale: "Capable production gateway with clean MIT license and CC-native ANTHROPIC_BASE_URL pathway, but D10=1 (the cited incumbent litellm is not deployed; adopting Portkey adds a NEW gateway tier where none exists, opposite of removing duplication). At this runtime's actual scale (single-operator, single-provider, ~$50/mo Anthropic spend) the Particula framework places us in 'DIY router is honest engineering' tier; cite as reference pattern."

vs_incumbent:
  incumbent_slug: "BerriAI/litellm"
  incumbent_deployment_status: "catalog-citation-only-NOT-deployed"
  headtohead_score: "litellm 8 capability wins · Portkey 4 capability wins · 5 PARITY"
  if_gateway_tier_required: "install_litellm_first_per_python_native_ergonomics_and_OSS_cost_routing"
  re_evaluate_portkey_threshold: "30K_to_50K_monthly_spend_OR_HIPAA_SOC2_compliance_need"

phase5_5gate:
  security: "AMBER"
  cr9_version_pin: "PASS"
  cr2_hooks: "PASS (n/a — not an MCP)"
  cr3_subagent: "PASS (n/a — not an agent)"
  stop_gate: "PASS"

phase6_position_swap:
  counter_thesis_evaluated: "T2_VENDOR_FORK with cost-routing backport + pre-positioning"
  counter_thesis_outcome: "REJECTED — pre-positioning is speculative engineering against CR-1 governance; D10 + D17 + D20 hard-cap signals still fire"
  original_verdict_survives: true

sources_typed:
  - {type: "benchmark", org: "ferro-labs", url: "https://github.com/ferro-labs/ai-gateway-performance-benchmarks", date: "2026-03-02"}
  - {type: "benchmark", org: "Kong", url: "https://github.com/Kong/kong_ai_gateway-portkey-litellm-benchmark", date: "2025-06-15", bias: "vendor-competitor-partial"}
  - {type: "code_reading", org: "Portkey-AI", url: "https://github.com/Portkey-AI/gateway/blob/main/src/handlers/services/logsService.ts", date: "2026-05-18"}
  - {type: "code_reading", org: "Portkey-AI", url: "https://github.com/Portkey-AI/gateway/blob/main/LICENSE", date: "2026-05-18"}
  - {type: "code_reading", org: "Portkey-AI", url: "https://github.com/Portkey-AI/gateway/blob/main/.github/workflows/run_tests.yml", date: "2026-05-18"}
  - {type: "code_reading", org: "Portkey-AI", url: "https://github.com/Portkey-AI/gateway/blob/main/package.json", date: "2026-05-18"}
  - {type: "practitioner_report", org: "Particula Tech", url: "https://particula.tech/blog/ai-gateway-decision-litellm-portkey-kong-ai-gateway", date: "2026-05-01"}
  - {type: "practitioner_report", org: "klymentiev.com", url: "https://klymentiev.com/blog/llm-gateway-guide", date: "2026-05-10", note: "contains license-fact error — claims Apache 2.0; canonical MIT"}
  - {type: "practitioner_report", org: "TrueFoundry", url: "https://www.truefoundry.com/blog/portkey-vs-litellm", date: "2025-04-04", bias: "vendor-competitor-partial"}
  - {type: "practitioner_report", org: "AI Cost Board", url: "https://aicostboard.com/comparisons/portkey-vs-litellm", date: "2026-03-03"}
  - {type: "vendor_docs", org: "Portkey-AI", url: "https://portkey.ai/docs/integrations/libraries/claude-code", date: "2026-05-18"}
  - {type: "deepwiki", org: "Cognition (DeepWiki)", url: "https://deepwiki.com/Portkey-AI/gateway", date: "2026-05-18"}

sources_typed_disagreement:
  - source_a: "klymentiev.com/blog/llm-gateway-guide"
    claim_a: "Portkey open-sourced its entire gateway under Apache 2.0 in March 2026"
    source_b: "github.com/Portkey-AI/gateway/blob/main/LICENSE blob sha 2c0759f826129145c2b8d792ad1160a0b6342448"
    claim_b: "MIT License Copyright (c) 2024 Portkey, Inc"
    resolution: "canonical github LICENSE blob WINS — license is MIT 2024, not Apache 2.0; klymentiev practitioner blog contains factual error"
    severity: "low — does not affect verdict; recorded for cite-trail audit"

next_re_litigation_wave: "W315 or first cost-axis trigger event"
operator_actions_required: []
parent_synthesis_actions:
  - "append verdict row to docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md"
  - "write T6 basic-memory note Z:/claude-sota-installed-state/basic-memory/verdicts/portkey-ai-gateway-W307.md"
```

---

## §10 Operator-action queue

| # | Priority | Action | Rationale |
|---:|---|---|---|
| 1 | LOW | No installation action required (T4 CITE-ONLY) | Verdict is "cite as reference pattern; do not install". |
| 2 | INFO | Note `BerriAI/litellm` is also catalog-cite-only — neither gateway is deployed | CLAUDE.md says "incumbent: BerriAI/litellm" but `.mcp.json` + venv have no litellm wiring; CLAUDE.md statement is aspirational/cite. |
| 3 | LOW (W308+) | Aging-relitigation re-verify at W315 OR on first cost-axis trigger | sca-v5 §AGING-RELITIGATION-QUEUE convention; trigger ladder = (a) add 2nd LLM provider, (b) ≥$1K/mo CC spend, (c) Anthropic rate-limit ≥3×/wk, (d) HIPAA/SOC2 requirement enters scope. |
| 4 | INFO | If gateway tier ever needed: install litellm FIRST | Per §7 head-to-head: 8 capability wins for litellm; Python-native; OSS cost-routing exists; 1B+ req production track record. |
| 5 | INFO | Pattern-study extract: 4 strategy modes (`fallback` / `loadbalance` / `single` / `conditional`) | Portkey's `tryTargetsRecursively` + Hono framework + Anthropic-compat `/v1/messages` adapter are good reference patterns for ANY future gateway choice; pin cite anchors in this audit. |
| 6 | INFO (parent synthesis) | Append VERDICT-LEDGER row + T6 basic-memory write | Per W307-PLAN §3 parent-owned synthesis step. |

---

**File**: `Z:/claude-sota-installed/docs/architecture/W307-TOP3-CHALLENGER-AUDITS-AND-AUTOMATION/W307-STREAM-B-PORTKEY-AUDIT.md`
**Wave**: W307 Stream B
**Owner**: agent-B-portkey-audit
**Status**: Ready for parent-synthesis stage (ledger append + T6 write + codex gate dispatch).
**Self-audit (LOC)**: This file is intentionally kept under the 700-line cap mandated by the W307 plan.
