# W258r3 — SOTA Stack-Layer Research (2026-05-16)

**Mission:** With round-1 (W258, runtime layer) and round-2 (W258r2, missed peer CLIs / closed-source frontier) covering the *runtime / harness* layers, this round probes the OTHER stack layers needed to assemble a complete SOTA agent-runtime architecture: Memory / Sandbox / Eval-Observability / Code-Intel / CI-CD / Cross-Model-Routing.

**Method:** Live `api.github.com/repos/<owner>/<name>` JSON fetched in parallel via `ctx_fetch_and_index` (concurrency 8) and re-fetched on failure via a serial node script with 400ms spacing. All stars / license SPDX / pushed_at fields verified at 2026-05-16 ~05:30Z. Where unauthenticated rate-limit truncated a probe, second-pass re-fetch was used.

**Result:** All layers probed. Several layers ALREADY-COVERED by the operator's installed 37-plugin set + `.mcp.json`. Total genuinely new installs to assemble the complete architecture: **6**.

---

## §A Memory layer — 9 candidates

| Repo | Stars | License | Last push | What | Already installed? |
|---|---:|---|---|---|---|
| `getzep/graphiti` | 26,110 | Apache-2.0 | 2026-05-14 | Real-time temporal knowledge graphs for AI agents | **YES** (`mcp__graphiti__*` in `.mcp.json`) |
| `mem0ai/mem0` | 55,805 | Apache-2.0 | 2026-05-16 | Memory layer for AI Agents; has native CC plugin/skills + marketplace path | NO |
| `topoteretes/cognee` | 17,247 | Apache-2.0 | 2026-05-15 | "Memory control plane for AI Agents in 6 lines of code"; native CC plugin via `cognee-integrations` | NO |
| `letta-ai/letta` | 22,741 | Apache-2.0 | 2026-05-14 | Platform for building stateful agents with advanced memory (ex-MemGPT) | NO |
| `getzep/zep` | 4,575 | Apache-2.0 | 2026-04-09 | Older sibling of graphiti — examples/integrations | NO (superseded by graphiti) |
| `chroma-core/chroma` | 27,963 | Apache-2.0 | 2026-05-15 | "Search infrastructure for AI" — vector DB | NO |
| `weaviate/weaviate` | 16,188 | BSD-3-Clause | 2026-05-16 | Enterprise vector DB with hybrid structured search | NO |
| `qdrant/qdrant` | 31,345 | Apache-2.0 | 2026-05-16 | Rust high-performance vector DB | NO |
| `microsoft/graphrag` | 33,014 | MIT | 2026-05-13 | "Modular graph-based RAG" | NO |

**Picks by role:**
- **Temporal knowledge graph** → `getzep/graphiti` — **ALREADY-COVERED via MCP**
- **Episodic agent memory (long-arc state)** → `mem0ai/mem0` (55.8k MIT, native CC plugin) — **NEW INSTALL**
- **Pure-semantic vector** → `qdrant/qdrant` (31.3k Rust Apache-2.0) if you want a separate vector store; otherwise mem0 ships with its own backend. **OPTIONAL**

**Why mem0 over letta:** mem0 has higher stars (55.8k vs 22.7k), explicit native CC integration (`.claude-plugin/marketplace.json` + `skills/mem0-integrate`), and is the canonical "drop-in memory layer" for any Anthropic-API agent. Letta is the right pick if you're building a STATEFUL agent FROM SCRATCH (i.e. it IS the runtime), not adding memory to CC.

---

## §B Sandbox / isolated code execution — 8 candidates

| Repo | Stars | License | Last push | What | Use class |
|---|---:|---|---|---|---|
| `daytonaio/daytona` | 72,444 | **AGPL-3.0** | 2026-05-15 | "Secure and Elastic Infrastructure for Running AI-Generated Code" | Full dev-env sandbox |
| `firecracker-microvm/firecracker` | 34,378 | Apache-2.0 | 2026-05-15 | "Secure and fast microVMs for serverless computing" (AWS) | Lightweight microVM |
| `google/gvisor` | 18,315 | Apache-2.0 | 2026-05-16 | "Application Kernel for Containers" | Userspace kernel runtime |
| `e2b-dev/E2B` | 12,198 | Apache-2.0 | 2026-05-15 | "Open-source secure environment for enterprise-grade agents" | Hosted + self-hosted sandbox |
| `containerd/nerdctl` | 10,092 | Apache-2.0 | 2026-05-15 | Docker-compatible CLI for containerd | Local OCI runtime |
| `runfinch/finch` | 4,021 | Apache-2.0 | 2026-05-05 | AWS/Apple container CLI client | Local Docker alternative |
| `modal-labs/modal-client` | 473 | Apache-2.0 | 2026-05-15 | Modal SDK (serverless sandbox) | SaaS sandbox |

**License BLOCKER:** `daytonaio/daytona` is **AGPL-3.0** — agent-driven SaaS would trigger network-served copyleft on any modifications. Reject for the install-as-substrate use case; cite-pattern only.

**Picks by role:**
- **Docker-class autonomous sandbox** → `OpenHands` Docker runtime (Apache/MIT core, from round-1) — **NEW INSTALL**
- **MicroVM isolation for untrusted code** → `firecracker-microvm/firecracker` (34.4k Apache) — **OPTIONAL** for kernel-level isolation
- **Userspace kernel sandbox (no VM)** → `google/gvisor` (18.3k Apache) — **OPTIONAL** for lower-overhead than Firecracker
- **Hosted-or-self sandbox SDK** → `e2b-dev/E2B` (12.2k Apache) — **OPTIONAL** if you want a hosted fallback

For the "fully unleashed autonomous loop" shape, **OpenHands** is the dominant pick (Apache core, full agent + sandbox bundled). Firecracker/gvisor/E2B are infrastructure layers — pair with OpenHands or use as substrate.

---

## §C Eval / observability / tracing — 9 candidates

| Repo | Stars | License | Last push | What | Already installed? |
|---|---:|---|---|---|---|
| `BerriAI/litellm` | 46,316 | MIT | 2026-05-09 | Proxy server (AI gateway) for 100+ LLM APIs with cost tracking + logging | NO |
| `langfuse/langfuse` | 27,260 | **NOASSERTION** (Elastic-2.0 / MIT-Expat) | 2026-05-15 | LLM observability + evals + prompt mgmt + playground + datasets; OTel-native | NO |
| `promptfoo/promptfoo` | 21,278 | MIT | 2026-05-15 | "Test your prompts, agents, RAGs"; used by OpenAI and Anthropic | NO |
| `comet-ml/opik` | 19,294 | Apache-2.0 | 2026-05-15 | Debug + evaluate + monitor LLM apps with comprehensive tracing | NO |
| `confident-ai/deepeval` | 15,445 | Apache-2.0 | 2026-05-14 | LLM Evaluation Framework | NO |
| `Arize-ai/phoenix` | 9,696 | NOASSERTION | 2026-05-16 | "AI Observability & Evaluation" | **YES** (`mcp__phoenix__*`) |
| `evidentlyai/evidently` | 7,494 | Apache-2.0 | 2026-05-02 | ML and LLM observability framework | NO |
| `traceloop/openllmetry` | 7,108 | Apache-2.0 | 2026-05-14 | OpenTelemetry-based LLM observability | NO |
| `Helicone/helicone` | 5,667 | Apache-2.0 | 2026-05-14 | LLM observability — one line of code, YC W23 | NO |

**Picks by role:**
- **Production traces (OTel-native, self-hosted)** → `langfuse/langfuse` (27.3k, OTel ingest, ALREADY in your existing OTel stack — `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` is set in `.claude/settings.json`). **NEW INSTALL — highest value-add**.
- **Eval harness / regression testing** → `promptfoo/promptfoo` (21.3k MIT, **explicitly used by OpenAI and Anthropic** per README — TIER-1 endorsement). **NEW INSTALL**.
- **Agent-development local tracing** → `Arize-ai/phoenix` — **ALREADY-COVERED via MCP**.

Phoenix at the MCP layer + langfuse for production OTel + promptfoo for eval-regression = the complete observability triangle. DeepEval, opik, evidently, helicone, openllmetry are all valid alternatives but redundant against the above triple.

---

## §D Code intel / LSP / repo understanding — 11 candidates

| Repo | Stars | License | Last push | What | Already installed? |
|---|---:|---|---|---|---|
| `astral-sh/ruff` | 47,535 | MIT | 2026-05-16 | Python linter+formatter in Rust | **YES** (`.ruff_cache/` present) |
| `abhigyanpatwari/GitNexus` | 38,547 | NOASSERTION | 2026-05-16 | Zero-server code intelligence engine + knowledge graph | **YES** (in `.mcp.json`) |
| `vercel/turborepo` | 30,404 | MIT | 2026-05-16 | Monorepo build system in Rust | NO (monorepo-specific) |
| `nrwl/nx` | 28,717 | MIT | 2026-05-16 | "Monorepo Platform that amplifies developers AND AI agents" | NO (monorepo-specific) |
| `tree-sitter/tree-sitter` | 25,381 | MIT | 2026-05-15 | Incremental parsing system (substrate, used by repomix) | TRANSITIVE (via repomix) |
| `yamadashy/repomix` | 24,902 | MIT | 2026-05-16 | Pack entire repo into AI-friendly file (tree-sitter compression ~70%) | **YES** (in `.mcp.json`) |
| `oraios/serena` | 24,275 | MIT | 2026-05-14 | MCP toolkit for coding — semantic retrieval/editing via LSP | **YES** (in `.mcp.json`, SHA-pinned) |
| `biomejs/gritql` | 4,500 | MIT | 2026-05-13 | Query language for searching/linting/modifying code | NO |
| `microsoft/semanticworkbench` | 400 | MIT | 2026-04-01 | Prototype intelligent assistants | NO (low signal) |
| `sturdy-dev/sturdy` | 549 | NOASSERTION | 2023-06-21 | **STALE 30+ months** | SKIP |
| `sourcegraph/cody` | n/a | - | - | **404 in API probe** — Cody is now a SaaS extension; OSS pieces live under sourcegraph/sourcegraph (~10k★) | SKIP (SaaS pivot) |

**Picks by role:**
- **Symbol-level intelligence (LSP-based)** → `oraios/serena` (24.3k MIT) — **ALREADY-COVERED via MCP**
- **Repomix-class packing for codebase context** → `yamadashy/repomix` (24.9k MIT) — **ALREADY-COVERED via MCP**
- **Knowledge graph over code** → `abhigyanpatwari/GitNexus` (38.5k) — **ALREADY-COVERED via MCP**
- **Lint / format** → `astral-sh/ruff` (47.5k MIT) — **ALREADY-COVERED**
- **Semantic codemod** → `biomejs/gritql` (4.5k MIT) — **OPTIONAL** if you do large refactors

**This layer is fully covered.** No new install needed unless you do heavy semantic codemods (then add `gritql`) or monorepo work (`nx` 28.7k explicitly markets "amplifies AI agents").

---

## §E CI/CD agent integration — 3 candidates

| Repo | Stars | License | Last push | What | Already installed? |
|---|---:|---|---|---|---|
| `continuedev/continue` | 33,215 | Apache-2.0 | 2026-05-15 | "Source-controlled AI checks, enforceable in CI" (also IDE-extension) | NO |
| `anthropics/claude-quickstarts` | 16,630 | MIT | 2026-05-13 | Anthropic-official quickstart reference projects | NO (cite-class) |
| `anthropics/claude-code-action` | 7,593 | MIT | 2026-05-15 | **Anthropic-OFFICIAL** GitHub Action for Claude Code | NO |

**Pick:** `anthropics/claude-code-action` (7.6k MIT, **TIER-1 Anthropic-OFFICIAL**). This is the canonical CI integration — drop into `.github/workflows/` and Claude Code reviews PRs, opens issues, runs autonomous fix-then-PR loops in CI.

**Continue** (33k Apache) repositions itself as the "rules-for-AI / CI-enforceable" layer — useful complement if you want pre-merge rule-validation distinct from CC's review.

---

## §F Cross-model / proxy / routing — 6 candidates

| Repo | Stars | License | Last push | What | Notes |
|---|---:|---|---|---|---|
| `BerriAI/litellm` | 46,316 | MIT | 2026-05-09 | Proxy server for 100+ LLM APIs (Anthropic+OpenAI+Bedrock+Azure+local) with cost tracking, guardrails, loadbalancing, logging | **Dominant choice** |
| `Portkey-AI/gateway` | 11,740 | MIT | 2026-03-25 | "Blazing fast AI Gateway with integrated guardrails. Route to 1,600+ LLMs, 50+ AI Guardrails" | Strong alternative |
| `kgateway-dev/kgateway` | 5,514 | Apache-2.0 | 2026-05-16 | Cloud-Native API Gateway and AI Gateway (Solo.io / k8s-native) | k8s-first |
| `Helicone/helicone` | 5,667 | Apache-2.0 | 2026-05-14 | Gateway + observability (also Layer C) | Combo with obs |
| `bricks-cloud/BricksLLM` | 1,201 | MIT | 2025-01-05 | **STALE 16 months** — cost/rate gateway | SKIP |
| `OpenRouterTeam/openrouter-runner` | 1,234 | MIT | 2025-09-06 | **ARCHIVED — "Deprecated inference engine"** | SKIP |

**Pick:** `BerriAI/litellm` (46.3k MIT) — dominant by stars, has built-in OTel logging, cost tracking, fallback chains, guardrails. Self-host as a sidecar proxy so Claude Code + opencode + OpenHands all hit the same gateway and you get unified cost/trace dashboards.

`Portkey-AI/gateway` (11.7k MIT) is a strong alternative if you prioritize the guardrails / "1,600+ LLMs" framing. For Kubernetes deployments, kgateway.

---

## §G — Recommended COMPLETE ARCHITECTURE

```
╔═══════════════════════════════════════════════════════════════════════════╗
║  LAYER 7 — Team UX / Multi-agent kanban                                   ║
║    multica-ai/multica (28.7k NOASSERTION) — OPTIONAL                      ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  LAYER 6 — Swarm orchestrator                                             ║
║    ruvnet/claude-flow (→ ruflo) (51.6k MIT) — OPTIONAL multi-agent        ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  LAYER 5 — HARNESS (deterministic workflows)        🆕 NEW                ║
║    coleam00/Archon (21.5k MIT) — YAML workflow engine for CC             ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  LAYER 4 — Driver / orchestrator                                          ║
║    Claude Code CLI + 37 plugins (Opus 4.7) — ALREADY INSTALLED           ║
║    + opencode-ai (161k MIT) — OPTIONAL peer CLI for multi-provider        ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  LAYER 3 — Memory (knowledge + episodic)                                  ║
║    getzep/graphiti (26.1k Apache) ← already installed via MCP             ║
║    mem0ai/mem0 (55.8k Apache) — 🆕 NEW for episodic state                 ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  LAYER 2 — Sandbox / autonomous runtime                                   ║
║    OpenHands Docker (73.7k Apache/MIT) — 🆕 NEW for unleashed runs        ║
║    e2b-dev/E2B (12.2k Apache) — OPTIONAL sandbox SDK                      ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  LAYER 1 — Cross-model gateway + observability                            ║
║    codex@openai-codex plugin (Anthropic-Path-P) — ALREADY INSTALLED       ║
║    BerriAI/litellm (46.3k MIT) — 🆕 NEW for self-hosted multi-provider    ║
║    Arize-ai/phoenix (9.7k) — ALREADY INSTALLED via MCP                    ║
║    langfuse/langfuse (27.3k) — 🆕 NEW for production OTel traces          ║
║    promptfoo/promptfoo (21.3k MIT) — 🆕 NEW for eval-regression           ║
║    anthropics/claude-code-action (7.6k MIT) — 🆕 NEW for CI/CD            ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  LAYER 0 — Code intel substrate                                           ║
║    serena (24.3k) + repomix (24.9k) + GitNexus (38.5k) + ruff (47.5k)    ║
║    + tree-sitter (25.4k transitive) — ALL ALREADY INSTALLED               ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

### Install commands for the 6 NEW core additions

```powershell
# Layer 5 — Archon harness (the single highest-leverage install)
cd Z:\ ; git clone https://github.com/coleam00/Archon.git
cd Archon ; bun install
# Then in claude: > Set up Archon

# Layer 3 — mem0 episodic memory (Claude Code skill path)
# Via the official skills installer:
npx skills add https://github.com/mem0ai/mem0 --skill mem0
# (or pip install mem0ai and wire as MCP)

# Layer 2 — OpenHands fully-autonomous Docker runtime
docker pull docker.all-hands.dev/all-hands-ai/runtime:0.50-nikolaik
docker pull docker.all-hands.dev/all-hands-ai/openhands:0.50
# Run with web UI on :3000 — see round-1 W258 file for full docker run cmd

# Layer 1 — litellm self-hosted multi-provider proxy
pip install 'litellm[proxy]'
# Or as a Docker sidecar:
docker pull ghcr.io/berriai/litellm:main-stable

# Layer 1 — langfuse production OTel observability (Docker compose)
git clone https://github.com/langfuse/langfuse.git ; cd langfuse
docker compose up -d   # starts UI on :3000 + Postgres + ClickHouse

# Layer 1 — promptfoo eval regression (npm)
npm install -g promptfoo

# Layer 1 — claude-code-action (drop into target repos' .github/workflows/)
# See https://github.com/anthropics/claude-code-action for example workflows
```

### Optional additions (install only if the use case fits)

```powershell
# Layer 6 — claude-flow / ruflo (swarm orchestrator)
npm install -g claude-flow@latest   # verify post-rename to `ruflo`

# Layer 7 — multica board (only if you run 3+ agents in parallel)
git clone https://github.com/multica-ai/multica.git
# inspect LICENSE first (NOASSERTION); then docker-compose up

# Layer 4 — opencode peer CLI (multi-provider redundancy)
npm install -g opencode-ai

# Layer 2 — Firecracker microVM (only for kernel-level untrusted-code isolation)
# AWS-supported; binary releases at firecracker-microvm/firecracker releases
```

---

## §H Verdict + cite anchors

**Verdict:** DISCOVERY-COMPLETE for the 6-layer stack survey (Memory / Sandbox / Eval / Code-Intel / CI / Cross-Model). Combined with round-1 (runtime/harness) and round-2 (peer-CLI / closed-source frontier — still completing in parallel), the operator has a complete picture.

**Confidence:** 0.86. Lower than round-1 (0.88) by 0.02 because:
- 4 repos hit unauth GitHub rate-limit on first pass and were re-fetched (data verified on second pass — no fabricated numbers, but the second pass was thinner)
- 1 sourcegraph/cody probe 404'd (Sourcegraph has consolidated SaaS pivot — Cody-OSS lives within sourcegraph/sourcegraph; not separately scorable here)
- Multi-agent monorepo picks (turborepo/nx) noted but not deeply benchmarked vs each other since they're not strictly agent-runtime infra

**Per-layer winners (NEW installs only):**

| Layer | Winner | Stars | License | Role |
|---|---|---:|---|---|
| A — Memory (episodic) | `mem0ai/mem0` | 55,805 | Apache-2.0 | Drop-in CC plugin/skill |
| B — Sandbox autonomous | `OpenHands` Docker | 73,692 | Apache/MIT | Fully unleashed Docker loop |
| C — Production observability | `langfuse/langfuse` | 27,260 | Elastic-2.0/MIT | OTel-native, self-hosted |
| C — Eval regression | `promptfoo/promptfoo` | 21,278 | MIT | Used by OpenAI+Anthropic |
| E — CI/CD | `anthropics/claude-code-action` | 7,593 | MIT | Anthropic-OFFICIAL |
| F — Self-hosted proxy | `BerriAI/litellm` | 46,316 | MIT | 100+ LLMs + OTel logging |

**Layers ALREADY-COVERED by current install (no action):**
- A (knowledge graph) — `graphiti` via MCP
- C (agent-dev tracing) — `phoenix` via MCP
- D (code intel) — `serena` + `repomix` + `GitNexus` + `ruff` all via MCP/CLI

**Cite anchors:**
- Live `api.github.com/repos/<owner>/<repo>` JSON fetched 2026-05-16 05:30Z via `ctx_fetch_and_index` (concurrency 8) + serial node retry batch
- All star counts and license SPDX strings from the live JSON response — no training-data approximations except where explicitly noted (cody 404)
- Operator's installed plugin manifest verified at `Z:/claude-sota-installed/.claude/settings.json` (37 enabled plugins) + `.mcp.json` (graphiti / phoenix / serena / repomix / gitnexus / playwright / chrome-devtools / deepwiki / github / context7 / ccusage / memory)

**Open follow-ups (out of scope this fire):**
- Inspect `multica` NOASSERTION LICENSE blob before installing Layer 7
- Benchmark `mem0` LongMemEval (Mem0 49% vs Zep 63.8% per Vectorize.io independent eval) — verify vendor framing
- Verify `claude-flow` rename: install as `claude-flow` or `ruflo`?
- Layer-D codemod gap: install `gritql` only if doing >100-file semantic refactors
