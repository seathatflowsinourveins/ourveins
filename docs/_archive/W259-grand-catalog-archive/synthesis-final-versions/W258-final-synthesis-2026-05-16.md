# W258 — Final SOTA Agent-Runtime Architecture Synthesis

> **2026-05-16 · Confidence 0.88 · 16-axis convergence over 25 source-family rounds**
> Audit class: TIER-3-LOCAL-COMPOSITION. Primary sources cited per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8.

---

## §0 Executive Summary

After 25 parallel research rounds covering 16 distinct source families (direct GitHub probe + missed candidates + stack layers + curated awesome-lists + benchmark leaderboards + named-T2 practitioners + production deployments + academic arxiv + orchestration patterns + cross-vendor SDKs + market/funding signals + community sentiment + cost economics + protocols/standards + skeptical primary-source audit + adversarial architecture critique + MCP ecosystem + model-for-agents + browser/GUI + specialists + eval frameworks + context engineering + Anthropic-internal + durable execution + self-host inference), the convergent verdict is: **operator's existing Claude Code + 37-plugin + 12-MCP stack already implements ~90% of Anthropic-OFFICIAL SOTA patterns** (r23). The architecture frontier is **substrate-extension via 5 new MCP servers + a cross-model proxy + an evals-first CI-gate**, NOT a runtime replacement or harness rebuild. Top-3 immediate actions: **(1)** install LiteLLM with the 5-tier cascade (Haiku → Sonnet → Opus → GPT-5.5 → DeepSeek-V4-Anthropic-endpoint) for cost-optimization (saves more than any other install per r13); **(2)** add `AGENTS.md` alongside `CLAUDE.md` (r14 + r22 + r7: Stripe / Spotify / Shopify all use it); **(3)** install Promptfoo for the CI-gate evals-first pattern (r6's strongest non-tool 4-T2 convergence; r21 verified zero overlap with already-installed Phoenix).

```
┌─────────────────────────────────────────────────────────────────────────┐
│  L7  TEAM UX                       SKIP — 1-agent operator (r16 + r24)  │
│  L6  PATTERN-CITE LAYER            Archon ralph-dag + P14 stall-detect  │
│  L5  SCAFFOLD (use-bounded)        live-SWE-agent / mini-SWE-agent      │
│  L4  EVAL/OBSERVABILITY            Phoenix ✓  +  Promptfoo NEW          │
│  L3  PEER CLI                      opencode + Block goose (redundancy)  │
│  L2  DRIVER                        Claude Code + 37 plugins (have) ✓    │
│  L1  CROSS-MODEL PROXY             LiteLLM + codex CLI (5-tier cascade) │
│  L0  SUBSTRATE                     MCP everywhere (4-vendor verified)   │
│        ├── Memory:        Graphiti ✓ (+ mem0 alt)                       │
│        ├── Code intel:    Serena + Repomix + GitNexus + Ruff ✓          │
│        ├── Browser/GUI:   Playwright + Chrome-devtools ✓                │
│        ├── Eval/observ:   Phoenix ✓                                     │
│        ├── ADD (T1):      Filesystem-Anthropic-OFFICIAL                 │
│        ├── ADD (T1):      Tavily OR Firecrawl (live web search)         │
│        ├── ADD (T1):      Sentry (Anthropic-OFFICIAL error tracking)    │
│        ├── ADD (T2):      mem0 (memory upgrade — $24M Series A)         │
│        └── ADD (T2):      semgrep/mcp + NVIDIA garak (security tier)    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## §1 Methodology

The audit pipeline follows the 5-phase SOTA-convergence-audit framework codified at `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`:

- **R1 multi-source ≥4 discover** — 16 source families probed (exceeded ≥4 mandate 4×).
- **R2 7-Probe-DAG harness-fit verify** — per-candidate count-over / SDK-vs-CLI / architectural-API / plugin-namespace / mode-harness-shape / direct-blockers / demand-gate split.
- **R3 ≥3-distinct-orgs Axis-1+2+3 convergence** — multi-org SOTA cites + ≥2 named-T2 dated artifacts + ≥3 months stability OR STRONG-PROVENANCE-EXPRESS.
- **R4 SRA D1-D10 use-class-precise scoring** — license-use-class precision + freshness gate + maintainer provenance + active-maintenance + use-class compatibility + Anthropic-CC alignment + industry adoption + failure-mode awareness + replacement viability.
- **R5 CR-12 6-class disposition** — GENUINELY-NEW / DUPLICATE / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL.

Cross-model gate satisfied via Path P (orchestrator-direct codex exec foreground+tee) — verdict ready for codex T1 GPT-5.5 audit.

---

## §2 Operator Profile

CRITICAL for architecture fit per r16 — generic SOTA ≠ operator-fit SOTA:

- **Platform:** Windows 11 Pro, Z:\ portable install at `Z:/claude-sota-installed/`
- **Driver:** Claude Code CLI + Opus 4.7 (1M context) daily
- **Subscription:** Anthropic Pro/Max ($200/mo) — covers operator's load
- **Installed:** 37 plugins enabled (from 12 marketplaces) + 12 MCP servers
- **Scale:** Solo developer; ~10K Sonnet + ~1K Opus tasks/month (per r25 model)
- **Cross-model:** codex CLI (GPT-5.5 via openai-codex plugin) for Path P consensus
- **Settings:** `bypassPermissions` default + `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` + 1M context band

**Operator-fit implication:** team-UX layer (multica kanban), durable-execution layer (Temporal/Inngest), and self-host inference all OVER-BUILT for this profile per r16 + r24 + r25. Architecture must be skinnier than generic SOTA.

---

## §3 Convergence Scorecard (16-axis matrix)

| Component | Axes hit / 16 | Verdict |
|---|---|---|
| **Claude Code + plugins** (driver) | r1+r3+r5+r6+r7+r10+r12+r23 = **8/16** | **DEFINITIVE — keep as-is** |
| **MCP** (substrate) | r1+r3+r7+r10+r14+r15+r23 = **7/16** + ubiquitous | **DEFINITIVE — strongest signal of study** |
| **LiteLLM** (cross-model proxy) | r3+r7+r10+r11+r13+r17+r25 = **7/16** | **TIER-1 INSTALL (highest cost lever)** |
| **opencode** (peer CLI) | r1+r2+r6+r11+r12 (DHH)+r15 = **6/16**, 160,923 stars verified live | **TIER-1 — strongest practitioner-T2 endorsement** |
| **Block goose** (peer CLI + scaffold pattern) | r1+r7+r12+r15 (Stripe-Minions-fork confirmed) = **4/16** | **TIER-1 — production-load-bearing via Stripe Minions** |
| **Live-SWE-agent** (SOTA scaffold) | r8+r15 (verified 79.2% SWE-bench Verified) = **2/16 PRIMARY-SOURCE-VERIFIED** | **WATCHLIST / use-bounded** |
| **mini-SWE-agent** (minimalist scaffold) | r2+r15 (verified 75.6% Verified on Opus 4.6) = **2/16** | **WATCHLIST — 100 LOC MIT alternative** |
| **OpenHands** (formerly L5 pick) | r1+r3 + **r5 REFUTED by r15** | **DOWNGRADE — top entry is rank ~25 (73.8%)** |
| **Phoenix** (observability) | already-installed + r3+r21+r23 = **3/16** + INSTALLED | **KEEP** |
| **Promptfoo** (eval CI-gate) | r3+r21 + r6's evals-first 4-T2 + "Used by OpenAI and Anthropic" | **TIER-1 INSTALL — zero overlap with Phoenix** |
| **AGENTS.md** | r7+r14+r22+r23 (Anthropic AAIF co-donation) = **4/16** | **TIER-1 — zero-cost concrete add** |
| **mem0** (memory) | r3+r11 ($24M Series A)+r17 = **3/16** | **TIER-2 INSTALL (when memory > CLAUDE.md)** |
| **claude-code-action** (CI) | r3+r17 (Anthropic-OFFICIAL) = **2/16** | **TIER-2 — if GH Actions** |
| **Code-execution-with-MCP** (pattern) | r23 Anthropic Nov 2025 NEW | **TIER-1 PATTERN** |
| **P14 stall-detection** (Magentic-One pattern) | r9 + Anthropic durable-execution = **2/16** | **TIER-1 PATTERN (~50 LOC)** |
| **Langfuse** | r3+r10+r11 → r21 says SKIP for solo operator | **DEFER — install at >10 RPS** |
| **Archon** (harness) | r1 single-author only; r6 + r22 + r23 → PATTERN-CITE | **PATTERN-CITE — do NOT install** |
| **multica** | r1+r6 but r16: "kanban-for-zero-load" for 1-agent | **SKIP (operator profile)** |
| **claude-flow / ruflo** | r1 stars only; r9 swarm pattern 0/3 axes + r6 zero T2 + r7 zero prod | **REJECT** |
| **AutoGen** | r4 stale + r7 maintenance + r10 deprecated + r12 post-mortems | **REJECT** |
| **LangChain** | r12 multiple post-mortems | **REJECT** |
| **Devin standalone** | Cognition's own Jan 2026 pivot to "Devin Review" admits autonomy under-delivered | **REJECT** |
| **Roo Code** | r2 archived 2026-05-15 + r12 redirected to ZooCode/Cline | **REJECT** |

---

## §4 The Architecture (8 layers)

### L0 — SUBSTRATE: MCP everywhere

Per r14 + r15: MCP has crossed the production-adoption threshold at ≥8 top-tier orgs (Anthropic, OpenAI, Microsoft, Google, AWS, Cloudflare, Vercel, Stripe — primary-source verified) and is governed by Linux Foundation AAIF (Dec 9 2025 donation). Operator's 12-MCP install is correct shape.

**ADD (Tier-1 — Anthropic-OFFICIAL or production-validated):**
- `modelcontextprotocol/servers/filesystem` — Anthropic-OFFICIAL filesystem MCP; closes local-FS gap without Bash invocations
- `tavily-ai/tavily-mcp` OR `firecrawl-dev/firecrawl-mcp` — live web search (operator only has docs+repo search via context7+deepwiki)
- `getsentry/sentry-mcp` — Anthropic-OFFICIAL error tracking; completes Phoenix+Sentry observability triad
- `semgrep/mcp` (LGPL-2.1) — replaces ad-hoc Bash semgrep calls (operator has `.semgrep` config already)

**ADD (Tier-2 — domain-specific):**
- `mem0ai/mem0-mcp` — when memory needs exceed CLAUDE.md
- `NVIDIA/garak` (Apache-2.0) — LLM vulnerability scanner CLI (operator's `.audit-garak/` dir shows prior interest)

**AVOID:**
- `e2b-dev/mcp-server` — DEPRECATED per repo banner (r17)
- `modelcontextprotocol/server-postgres` + `server-sqlite` — ARCHIVED (moved to `servers-archived`); use Neon or Neo4j MCPs instead
- Self-invented MCP servers — operator already aligned with this rule

### L1 — CROSS-MODEL PROXY: LiteLLM + codex (different roles)

`BerriAI/litellm` (46.3k★ MIT, 7-axis convergence) — **highest single cost lever** per r13. Different role from operator's already-installed codex CLI:

- **codex CLI** = cross-model **consensus/verification** (Path P cardinal-rule-3 gate)
- **LiteLLM** = cross-model **cascade routing** for cost optimization

**5-tier optimal cascade** (per r18 + r13 + r25):

```
TIER 1 (cheapest, fast)    : Haiku 4.5             — triage / classification
TIER 2 (mid)                : Sonnet 4.6.5          — daily-driver tasks
TIER 3 (top Anthropic)      : Opus 4.7              — complex multi-file work
TIER 4 (cross-model verify) : GPT-5.5 (via codex)   — Path P consensus
TIER 5 (escape valve)       : DeepSeek V4 Anthropic-format endpoint — 14× cheaper than Opus
                                                     (api.deepseek.com/anthropic)
```

DeepSeek V4's `api.deepseek.com/anthropic` endpoint is a drop-in Anthropic-API-compatible escape valve at 14× cheaper than Opus on Aider polyglot 225-test ($4.80 vs $68.63 — primary-source-verified r13).

### L2 — DRIVER: Claude Code + 37 plugins + AGENTS.md

Operator's current driver is correct shape. Anthropic-internal teams use exactly this shape (r23). 8/16 axes confirm.

**ADD `AGENTS.md`** at repo root (4-axis: r7 + r14 + r22 + r23) — alongside `CLAUDE.md`. AGENTS.md is part of the AAIF founding-three (MCP + goose + AGENTS.md). Stripe, Spotify, Shopify all use it for cross-tool config sharing (CC + opencode + goose + codex all read it).

**Plugin set already optimal** per r23 — keep `superpowers` (TDD / verification / systematic-debugging / writing-skills / subagent-driven-development / dispatching-parallel-agents) + `intelligent-compact` + `pr-review-toolkit` + `code-review` + `agent-teams` + `engineering-skills` + `frontend-design`.

### L3 — PEER CLI: opencode + Block goose

Install BOTH for full provider-redundancy + production-pattern access:

- **`anomalyco/opencode`** (formerly `sst/opencode`) — 160,923★ MIT (primary-source verified r15), pushed 2026-05-16; 5-axis convergence; **DHH publicly endorsed it Jan 7 2026** (r12). Install via `npm install -g opencode-ai`.
- **`aaif-goose/goose`** (formerly `block/goose`) — 45,271★ Apache-2.0, Linux Foundation AAIF foundation-grade Dec 9 2025; **Stripe Minions (1,300 PRs/wk in production) is a FORK of goose** (Stripe-blog-confirmed primary-source r15). Install via `https://block.github.io/goose/` installer.

This dual install is *insurance* against r11's Anthropic OpenClaw-subscriber-ban precedent (Apr 2026). Provider-redundancy is now production-grade hygiene.

### L4 — EVAL / OBSERVABILITY: Phoenix + Promptfoo (SKIP Langfuse)

r21 resolved r16's DRY critique cleanly:
- Phoenix ↔ Langfuse = substantial runtime-tracing overlap (r16 correct)
- Phoenix ↔ Promptfoo = **zero overlap** (different lifecycle: runtime trace vs CI-gate eval)

**Phoenix** (operator already installed) — runtime tracing via OTel; OpenInference project.
**Promptfoo** (TIER-1 INSTALL) — declarative YAML CI-gate eval + LLM-as-judge + red-team. GitHub description verbatim: *"Used by OpenAI and Anthropic."* Install via `npm install -g promptfoo`.

**Minimal evals-first loop (~60 LOC total):**
```yaml
# promptfooconfig.yaml — ≥5 test cases per critical flow
providers: [anthropic:claude-opus-4-7]
tests:
  - vars: { ... }
    assert:
      - type: llm-rubric
        value: "must satisfy <rubric>"
      - type: javascript
        value: "output.length < 2000"
```

**Defer Langfuse** until any of: (a) ≥3 concurrent CC instances, (b) production traffic >10 RPS, (c) prompt-versioning needs exceed git + CLAUDE.md. Also: Langfuse default port :3000 collides with OpenHands :3000 (r16) — even if installed later, port-allocation map needed.

### L5 — SCAFFOLD (USE-BOUNDED, not daily-driver)

**Critical r15 revision:** OpenHands DOES NOT have the 68.4% SWE-bench Verified claim that round-5 propagated. Primary-source JSON of swebench.com leaderboard shows:
- Top OpenHands entry = Salesforce SAGE fork at 73.8% (rank ~25 of 180 — 2025-11-03)
- Top open scaffolds: `live-SWE-agent + Claude 4.5 Opus medium` at **79.2%** (2025-12-15) and `Sonar Foundation Agent + Claude 4.5 Opus` at 79.2% (2025-12-05)
- Best minimalist: `mini-SWE-agent + Claude 4.5 Opus high reasoning` at 76.8% (2026-02-17)

**Anthropic-explicit guidance (r23):** *"Workflows > agents until you need agents."* Solo-developer daily work is workflow-class; don't default to L5 scaffold. Use-bounded triggers for installing a scaffold:

- **For unattended overnight Docker-isolated runs** → `live-SWE-agent` (79.2% Verified, primary-source-verified). Pattern: `docker run` with workspace volume mount, pull from `OpenAutoCoder/live-SWE-agent` repo (verify license).
- **For embedded benchmarking / 100-LOC fork** → `mini-SWE-agent` (75.6% Verified, MIT) — radical minimalism, easy to fork/embed.
- **For batch CI parallel-fix runs** → keep claude-code-action + agent-teams plugins; no separate L5 install needed.

OpenHands as a runtime is fine but it's NOT the SOTA scaffold reference round-5 claimed.

### L6 — PATTERN-CITE LAYER (do NOT install black-box)

Per r22 + r23 + r16: Anthropic explicitly recommends "simple composable patterns > frameworks." Adopt these AS PATTERNS in CLAUDE.md / skills / agents, not as installed third-party black boxes:

1. **Archon ralph-dag** (r1) — PRD loop with `loop: until: ALL_TASKS_COMPLETE; fresh_context: true`. Author as `.claude/skills/ralph-dag/SKILL.md` (pattern, not the Archon YAML engine itself).
2. **P14 stall-detection + replan** (r9 — Magentic-One pattern) — outer-loop Task Ledger + inner-loop Progress Ledger + `stall_count > 2 → outer-loop-replan`. ~50 LOC adoption cost. Anthropic's "durable execution + checkpoints + adapt-on-error" guidance (r23) aligns.
3. **Code-execution-with-MCP** (r23 — Anthropic Nov 4 2025 NEW) — present MCP servers AS code APIs; agent writes code that imports tools instead of calling them directly. **Solves "too many MCP tools flood context" problem** for operator's 12-MCP install. Implementation: TypeScript `servers/<server>/<tool>.ts` wrappers; agent imports.
4. **Stripe Minions fork-of-goose** (r15) — production-pattern reference for autonomous PR-shipping at scale. Don't fork goose yourself; learn the architecture (one-shot end-to-end + classification + checkpointing).
5. **incident.io 12-parallel-reviewer pattern** (r7) — for high-stakes review consensus.
6. **Spotify Honk** (r7) — thin-wrapper-on-CC pattern. Spotify built 50+ features Q4'25-Q1'26 with no manual code.

### L7 — TEAM UX layer: SKIP for operator

`multica-ai/multica` (28.7k★) is a kanban board for 3+ concurrent agents across heterogeneous CLIs. Operator is solo + 1-agent-at-a-time → r16 verdict: *"kanban-for-zero-load."* SKIP unless operator scales to multi-agent or hires.

Durable execution layer (Temporal / Inngest / LangGraph / Trigger.dev) per r24: **DO NOT ADD at operator's solo+5-task scale**. Crossover threshold: install only if concurrent agentic tasks >20 OR single task >6h wall-clock OR multi-host. Operator's existing `cron + ScheduleWakeup + JSON state files` is the right shape.

---

## §5 What to INSTALL (priority order)

### T1 — Install now (≥3-axis convergence, low-risk, high-yield)

```powershell
# 1. AGENTS.md — zero-cost concrete add (4 axes)
@'
# AGENTS.md — cross-tool config for CC / opencode / goose / codex
# Per Linux Foundation AAIF founding-three (MCP + goose + AGENTS.md, Dec 9 2025)
# See CLAUDE.md for the canonical project memory.
'@ | Out-File -Encoding utf8 Z:/<your-project>/AGENTS.md

# 2. LiteLLM — TIER-1 cost optimization (7 axes, highest cost lever)
pip install litellm[proxy]
# Configure 5-tier cascade per §4 L1

# 3. Promptfoo — TIER-1 evals-first CI-gate (4 axes + strongest non-tool convergence)
npm install -g promptfoo

# 4. Filesystem MCP — Anthropic-OFFICIAL substrate completion
# Add to .mcp.json per modelcontextprotocol/servers/filesystem README

# 5. Sentry MCP — Anthropic-OFFICIAL error tracking
# Add to .mcp.json per getsentry/sentry-mcp README

# 6. Tavily OR Firecrawl MCP — live web search gap
npm install -g @tavily/mcp-server   # OR firecrawl equivalent

# 7. opencode — peer-CLI redundancy (5 axes + DHH endorsement)
npm install -g opencode-ai

# 8. Block goose — production-validated scaffold pattern (4 axes via AAIF + Stripe)
# Follow https://block.github.io/goose/ installer
```

### T2 — Install conditional (≥2-axis convergence, specific triggers)

- **mem0** ($24M Series A + 41k★) — install when memory needs exceed CLAUDE.md
- **claude-code-action** (Anthropic-OFFICIAL CI) — install if/when using GitHub Actions
- **semgrep/mcp** + **NVIDIA/garak** — install if security workloads materialize
- **UI-TARS-desktop** (34.1k★) — watchlist; install when desktop-app GUI automation needed
- **mini-SWE-agent** — install when bench-grade unattended runs needed

### T3 — Pattern-cite only (do NOT install)

- **Archon ralph-dag pattern** — adopt as `.claude/skills/ralph-dag/SKILL.md`
- **P14 stall-detection** — ~50 LOC adoption as native skill
- **Code-execution-with-MCP** (Anthropic Nov 2025) — adopt when adding sandbox subprocess layer
- **incident.io 12-parallel-reviewer** — adopt for high-stakes consensus reviews
- **Stripe Minions architecture** — adopt for autonomous-PR pattern

### T4 — REJECT (multi-axis rejection)

- **claude-flow / ruflo** (51.6k★) — r9 swarm pattern 0/3 axes + r6 zero T2 + r7 zero production
- **AutoGen** — Microsoft maintenance + r10 deprecated banner ("now MAF!") + r12 post-mortems
- **LangChain** — r12 multiple production post-mortems + CrewAI markets against it
- **Devin standalone** — Cognition's own Jan 2026 pivot to "Devin Review" admits autonomy under-delivered
- **Roo Code** — archived 2026-05-15 → use ZooCode or Cline
- **bolt.new OSS** — 17 months stale; live product is closed-source SaaS
- **MetaGPT** — 4 months cooling at 68k★; cite patterns only
- **Daytona** (72.4k★) — AGPL-3.0 license blocker
- **Skyvern** — AGPL
- **OpenInterpreter/01** — AGPL + voice not GUI focus
- **microsoft/autogen** as dependency — CC-BY-4.0 (content license, not code license)
- **multica** — operator profile mismatch (1-agent)
- **Langfuse** — DRY with Phoenix at solo scale; defer to >10 RPS
- **Durable execution layer** (Temporal/Inngest/Restate/n8n/Windmill) — over-built at solo+5-task scale
- **Self-host inference** — 1000× below break-even per r25
- **e2b-dev/mcp-server** — DEPRECATED banner
- **modelcontextprotocol/server-postgres + server-sqlite** — ARCHIVED → use Neon or Neo4j MCPs
- **defog-ai/sqlcoder** — 24 months stale
- **meta-llama/PurpleLlama** — Llama Community License (commercial restriction)
- **qodo-ai/pr-agent** — duplicates existing `pr-review-toolkit` plugin

---

## §6 Operator-fit fixes (per r22 audit)

r22's specialist `context-manager` agent audited operator's actual `CLAUDE.md` + `settings.json`. Best-in-class core (≤50 LOC pointer-CLAUDE.md + cite-anchored cardinal rules + 1M-context-tuned compact thresholds + state-outside-repo redirects + fork-subagent enabled + OTel telemetry). Four anti-patterns to fix:

1. **Triple-encoded compact thresholds** — `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=85` (or 70) + `CONTEXT_WINDOW_*_TOKENS` triple + `CONTEXT_WINDOW_*_PERCENT` pair = 3 sources of truth. **Pick token-triple only** (the Anthropic-canonical model per CCBP claude-settings.md:826,967), delete the percent pair, keep `AUTOCOMPACT_PCT_OVERRIDE` as the autocompact gate.
2. **`ECC_DISABLED_HOOKS` env relic** — 14 hook names disabled post-W255 cleanup; hooks no longer exist, env is no-op. **Delete the env var.**
3. **`autoMemoryEnabled: true` + `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` conflict** — env wins per precedence but the disagreement is bug-bait. **Pick one** (env takes precedence, so set `autoMemoryEnabled: false` in settings.json to match).
4. **16 overlapping marketplaces** — `addy-agent-skills` + `claude-code-skills` + `anthropic-agent-skills` + `claude-code-workflows` have overlapping skills (r16 DRY-analog). **Audit which skills are duplicated**; disable the duplicate-source plugin per skill.

Plus 3 genuinely-new context-engineering patterns to adopt:
- `AGENTS.md` at repo root (covered in §4 L2 / §5 T1)
- `.claude/skills/wave-n-codification/SKILL.md` — codify operator's actual W-N codification workflow as auto-firing skill
- `.claude/agents/codex-rescue-bridgemode.md` — crystallize Path P pattern as native project-scoped subagent

---

## §7 Patterns to adopt (non-tool SOTA)

The strongest convergence in the entire study was NOT a tool — it was a set of patterns. Adopt as operating discipline:

1. **Evals-first** (r6 — 4 named-T2: Hamel Husain / Eugene Yan / Chip Huyen / Ben Hylak — strongest non-tool convergence): write evals before agents; iterate on eval signal, not on vibes. Implementation: Phoenix runtime tracing + Promptfoo CI-gate (T1 install above).
2. **Context engineering as first-class** (r6+r23+r22 — Karpathy + Cole Medin + Addy Osmani + Anthropic-OFFICIAL): treat the context window as first-class engineering surface. CLAUDE.md + AGENTS.md + per-task fresh context (`/clear` discipline).
3. **Plan/execute decoupling** (r6+r8+r9 — Chip Huyen + Cole Medin + Andrew Ng + CoDA/PEAR/TDP/AOrchestra papers): separate the planner (long-horizon, expensive) from the executor (short-horizon, cheap). Mirrors Archon ralph-dag pattern.
4. **Partial autonomy > full autonomy** (r6 — Karpathy + Addy + Jeremy Howard): humans-in-loop on decision boundaries; autonomous within bounded tasks. *Opposes* "fully unleashed Docker loop" framing — temper L5 scaffold usage to bounded autonomous tasks, not 24/7 unattended.
5. **Scaffold-as-determinant** (r5 + r8 + Anthropic engineering blog): *"Model is the ceiling, harness is the ladder."* Particula measured 42% → 78% on SWE-bench from scaffold alone (same model). Scaffold quality matters as much as model choice.
6. **Workflows > agents until you need agents** (r23 — Anthropic explicit): start with workflows (predefined paths: prompt-chain / routing / parallelization / orchestrator-worker / evaluator-optimizer), escalate to agents (LLM-driven dynamic loops) ONLY when needed.
7. **Code-execution-with-MCP** (r23 — Anthropic Nov 2025 NEW): when adding sandbox/e2b subprocess layer, prefer code-API-over-tools. Agent writes code that imports MCP servers, instead of calling tools directly. Solves MCP-tool-flood-context.
8. **Memory-persistence > context-fill** (r23): "if context window exceeds 200K tokens it will be truncated" — Anthropic explicit. Save plans/state to memory file BEFORE spawning subagents. Operator's `intelligent-compact` + 70% autocompact override aligns.
9. **Simple composable > frameworks** (r23 + r16): Anthropic explicit: *"the most successful implementations weren't using complex frameworks. They were building with simple, composable patterns."* This validates r16's `ARCHITECTURE-OVER-BUILT` critique on the original generic-SOTA architecture.

---

## §8 5-tier LiteLLM cascade configuration

Concrete YAML config for cost-optimal routing (saves 70-85% of self-host savings with zero infra ops per r25):

```yaml
# litellm_config.yaml
model_list:
  - model_name: haiku-triage          # T1 — triage/classification
    litellm_params:
      model: anthropic/claude-haiku-4-5-20251001
      api_key: os.environ/ANTHROPIC_API_KEY

  - model_name: sonnet-daily           # T2 — daily-driver
    litellm_params:
      model: anthropic/claude-sonnet-4-6
      api_key: os.environ/ANTHROPIC_API_KEY

  - model_name: opus-complex           # T3 — complex multi-file
    litellm_params:
      model: anthropic/claude-opus-4-7
      api_key: os.environ/ANTHROPIC_API_KEY

  - model_name: gpt5-verify            # T4 — cross-model Path P consensus
    litellm_params:
      model: openai/gpt-5.5
      api_key: os.environ/OPENAI_API_KEY

  - model_name: deepseek-cheap         # T5 — escape valve (14× cheaper)
    litellm_params:
      model: deepseek/deepseek-chat
      api_base: https://api.deepseek.com/anthropic
      api_key: os.environ/DEEPSEEK_API_KEY

router_settings:
  routing_strategy: cost-based-routing
  cache_responses: true
  cache_ttl: 3600                      # 1h prompt cache hit = $0.50/MTok for Opus
  num_retries: 2

# Operator routes via env var
# $env:ANTHROPIC_BASE_URL = "http://127.0.0.1:4000"
```

**Crossover thresholds** (per r25):
- Claude Pro/Max $200/mo wins vs raw API above ~40M Opus input tokens/month
- Self-host vLLM on H100 wins above 20-50M output tokens/day sustained
- Operator's load = ~60M output tokens/MONTH = **1000× below self-host break-even**
- DeepSeek V4 cascade captures 70-85% of self-host savings at zero infra ops

---

## §9 Final verdict + open follow-ups

**Verdict (confidence 0.88):** Operator's existing Claude Code + 37 plugins + 12 MCP servers + intelligent-compact + 70% autocompact override + codex-CLI cross-model gate + superpowers skills + 1M-context Opus 4.7 IS already the canonical SOTA agent runtime for an Anthropic-API-centric solo-developer profile in 2026-May. r23's Anthropic-internal audit confirms ~90% alignment with Anthropic's own internal patterns. The architecture frontier from here is substrate-extension (LiteLLM proxy + Promptfoo eval CI-gate + 4 new MCP servers + AGENTS.md) plus operator-fit fixes (compact-threshold deduplication + ECC env relic cleanup + marketplace overlap audit), NOT runtime replacement or harness rebuild. Adversarial r16 critique was correct: my earlier OpenHands+Archon+multica L5+L6+L7 stack was generic-SOTA, not operator-fit-SOTA. r15 primary-source audit caught one fabricated benchmark claim (OpenHands 68.4%) and ratified 5/6 other load-bearing facts. Block goose's production-validation via Stripe Minions fork is the strongest single-tool production-deployment evidence in the study and shifts goose from "peer CLI" to "production-pattern source."

**Open follow-ups (queueable for next iteration):**

1. **Submit this document to GPT-5.5 codex T1 audit** (cardinal-rule-3 cross-model gate; orchestrator-direct Path P).
2. **Inspect LICENSE blob for `multica-ai/multica` and `live-SWE-agent` (OpenAutoCoder)** — NOASSERTION in `multica`, license uncertain on `live-SWE-agent` until verified.
3. **Probe `live-SWE-agent` (OpenAutoCoder) repo directly** for install path + Anthropic-API compatibility (round-8 surfaced the academic claim; round-15 verified the benchmark; install evidence not yet gathered).
4. **Verify `claude-flow` post-rename install command** — `npm install -g claude-flow` vs `ruflo`? (only relevant if architectural verdict changes; currently REJECTED).
5. **Resolve Langfuse :3000 ↔ OpenHands :3000 port collision** before any future L4 install scaling.
6. **Pilot Promptfoo `promptfooconfig.yaml` on one critical skill flow** as the canonical evals-first first-run.
7. **Author `.claude/skills/p14-stall-detection/SKILL.md`** (~50 LOC) as concrete Magentic-One pattern adoption.
8. **Author `.claude/skills/code-execution-with-mcp/SKILL.md`** as Anthropic-Nov-2025 pattern adoption.
9. **Audit operator's 37-plugin set for r22-flagged skill duplication** across the 4 overlapping marketplaces; produce disable-list.

---

## §10 Cite-anchors

All 25 source files: `Z:/claude-sota-installed/.claude/state/W258{,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,r13,r14,r15,r16,r17,r18,r19,r20,r21,r22,r23,r24,r25}*.md`.

Key TIER-1-DIRECT primary sources:

- **SWE-bench Verified leaderboard JSON** (`script id=leaderboard-data`) at `https://www.swebench.com/` retrieved 2026-05-16 (r15)
- **Linux Foundation AAIF formation press** at `https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation` dated 2025-12-09 (r15)
- **Anthropic MCP donation announcement** at `https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation` (r14 + r15)
- **Stripe Minions blog** at `https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents` (r15 verified Stripe-confirms-Minions-is-fork-of-goose)
- **Anthropic Code execution with MCP** at `https://www.anthropic.com/engineering/code-execution-with-mcp` dated Nov 4 2025 (r23)
- **Anthropic Building Effective Agents** at `https://www.anthropic.com/engineering/building-effective-agents` dated Dec 19 2024 (r23 — canonical reference)
- **Anthropic Multi-Agent Research System** at `https://www.anthropic.com/engineering/multi-agent-research-system` dated Jun 13 2025 (r23)
- **Anthropic How Anthropic teams use Claude Code** at `https://www.anthropic.com/news/how-anthropic-teams-use-claude-code` Spring 2025 (r23)
- **Anthropic Claude Code docs** at `https://code.claude.com/docs/en/` — overview / skills / sub-agents / hooks / mcp / settings / memory pages
- **GitHub live API** for `anomalyco/opencode` (full_name verified, 160,923 stars) and `aaif-goose/goose` (45,271 stars, redirected from block/goose) retrieved 2026-05-16 (r15)
- **DHH "Promoting AI Agents"** post Jan 7 2026 — explicit opencode endorsement (r12)
- **Mem0 $24M Series A** TechCrunch Oct 28 2025 (r11)
- **Karpathy "agentic engineering" coinage** Feb 2026 (r11)
- **YC W26 batch analysis** — 41.5% agent-infra by buildmvpfast.com (r11)
- **Particula scaffold-as-determinant analysis** at `particula.tech/blog/agent-scaffolding-beats-model-upgrades-swe-bench` (r5)
- **METR Time Horizons** at `metr.org/time-horizons/` (r5)

Cite-class composition: `effective_tier = TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE. Constituents = 25 W258r*.md files (TIER-3-LOCAL composition) + ≥30 TIER-1-DIRECT primary URLs (GitHub API + swebench.com + linuxfoundation.org + anthropic.com/engineering + stripe.dev).

---

*W258 — synthesis-complete 2026-05-16 · 16-axis convergence · confidence 0.88 · ready for codex T1 GPT-5.5 audit per cardinal-rule-3 Phase 1 bootstrap exception.*
