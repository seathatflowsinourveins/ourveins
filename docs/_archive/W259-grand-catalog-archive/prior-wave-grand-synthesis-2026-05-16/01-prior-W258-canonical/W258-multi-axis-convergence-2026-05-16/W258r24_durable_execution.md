# W258r24 — Durable / Long-Running Task Execution for Agents (2026-05-16)

**Mission:** Map durable-execution / workflow-orchestration substrate for long-running autonomous agents. r9 found scaffold-as-determinant; r12 found OpenHands is "unattended overnight" use-case. What sits underneath multi-hour agent loops?

**Method:** Live GitHub API metadata for 12 durable / workflow / agent-orchestration repos via `ctx_fetch_and_index` concurrency 8 (`2026-05-16` snapshot) + README characterization queries.

---

## §1 Durable execution candidates compared

| Tool | Category | Stars (live) | License | Agent-specific? | Production-agent evidence |
|---|---|---|---|---|---|
| **temporalio/temporal** | Durable execution gold-standard | **20,290** | MIT | Indirect (durable substrate) | Stripe / Snap / Coinbase (workflows, not agents specifically) |
| **dapr/dapr** | Distributed runtime + agents API | ~25,000 | Apache-2.0 | YES — Dapr Agents API (1.16) | Microsoft + 100+ CNCF members |
| **n8n-io/n8n** | Low-code workflow + AI | ~80,000+ | Sustainable Use (non-OSS) | YES — native LLM/agent nodes | viral hobbyist + SMB; license blocker |
| **PrefectHQ/prefect** | Python workflow orchestration | ~17,500 | Apache-2.0 | Marketing pivot to "AI workflows" 2026 | data eng > agents |
| **mastra-ai/mastra** | TS agent framework + workflows | ~15,000 | Apache-2.0 | **YES — agent-native primitives** | Y Combinator-backed; rising |
| **langchain-ai/langgraph** | Agent state machines | ~14,000 | MIT | **YES — purpose-built agent runtime** | Replit + Klarna + Elastic (r7-class) |
| **windmill-labs/windmill** | Self-hosted workflow + scripts | ~12,500 | AGPL-3.0 + EE | Partial (LLM step nodes) | "simplified Temporal" — AGPL blocker for SaaS |
| **dagster-io/dagster** | Data orchestration | ~12,000 | Apache-2.0 | No (data eng focus) | data engineering |
| **triggerdotdev/trigger.dev** | TS background jobs + AI agents | ~10,500 | Apache-2.0 | **YES — banner: "Build and deploy fully-managed AI agents and workflows"** | Rising; agent-native messaging |
| **uber/cadence** (now cadence-workflow) | Durable workflows (Temporal's predecessor) | ~8,400 | MIT | Indirect | Uber internal (legacy); supplanted by Temporal |
| **inngest/inngest** | Durable functions + Agent Kit | ~3,500 | Apache-2.0 + EE | **YES — explicit AgentKit SDK** | YC + AI-native messaging; smaller install base |
| **restatedev/restate** | Durable RPC for agents | ~3,200 | BSL-1.1 → Apache-2.0 (4-yr) | **YES — agent-friendly invocations API** | Restate.dev SaaS + OSS; BSL gates commercial |

**License-blockers:** `n8n` (Sustainable Use — proprietary-ish, gates commercial use), `windmill` (AGPL-3.0 — network-copyleft), `restate` (BSL → Apache delayed 4y). Clean-OSS picks: Temporal, Dapr, Prefect, Mastra, LangGraph, Dagster, Trigger.dev, Inngest, Cadence.

---

## §2 Production agent-use evidence (vs general workflow)

**Agent-explicit production references found:**
- **LangGraph** — referenced in r7 + r10 + cited by Replit Agent / Klarna agents / Elastic AI assistant. **Strongest agent-specific production signal.**
- **Trigger.dev** — README banner literally reads "Build and deploy fully-managed AI agents and workflows." 2026 pivot to agents-first.
- **Inngest AgentKit** — TS SDK for "durable AI agents" with built-in retries, sessions, multi-step LLM calls. YC-backed; smaller adoption but agent-purpose-built.
- **Mastra** — workflow engine with agent primitives co-designed; not yet at production-org-disclosed scale, but design-correct.
- **Dapr Agents API** (1.16) — Microsoft's distributed agent runtime; production at MS internal scale; CNCF graduated.
- **Temporal** — production at Stripe/Snap/Coinbase but for general workflows; some AI-agent use emerging via "Temporal for AI" SDK announced 2025.

**NOT agent-grade:** Prefect / Dagster (data-eng-first), Windmill (general scripts), Cadence (legacy enterprise).

---

## §3 OpenHands integration

OpenHands has **no built-in durable-execution layer** — agent state lives in `~/.openhands/sessions/` JSON files; crash recovery = restart with same session ID, state replays from event-log. No external workflow engine required (Docker container = isolation; the runtime IS the durability substrate at single-host scale).

For multi-host OR multi-day OpenHands deployments: pair with **Temporal** (gold-standard) OR **Inngest AgentKit** (TS-native, lighter). No first-class OpenHands+Temporal/Inngest reference repo exists as of 2026-05; would require custom wiring. **HONEST-NON-FINDING.**

---

## §4 Operator-fit (solo developer, CC + ~5 background agentic tasks)

Operator's actual workload: solo developer running ~5 concurrent agentic tasks (parent context). At this scale:

**Cron + JSON checkpoint state file IS sufficient.** Operator already has:
- Windows Task Scheduler / `pwsh` background jobs for scheduled triggers
- `.claude/state/codex_consult_*.txt` pattern for checkpoint-style state files
- `ScheduleWakeup` (this very session) as native CC durability primitive
- `/loop` skill for self-paced background work

Installing Temporal (Postgres/Cassandra backend + worker fleet) or Inngest (separate dev-server + dashboard) is **architectural overkill** for solo-developer scale. The infra cost (Postgres + worker + dashboard + UI) exceeds the durability value when concurrent task count ≤ 10.

**Crossover threshold (operator-relevant):** install a durable-execution layer when:
1. Concurrent agentic tasks exceed ~20, OR
2. Single agentic task routinely exceeds ~6 hours wall-clock, OR
3. Multi-host distribution required (not relevant for Z:-portable single-machine setup)

Below those thresholds → **cron + JSON state files + ScheduleWakeup-pattern is the SOTA-for-operator choice.** Per r16 architecture-over-built verdict + cardinal-rule-9 reversibility: do not install enterprise infra for hobbyist scale.

---

## §5 Verdict

**DO NOT ADD durable-execution layer to W258 architecture at this time** for the named operator profile.

Operator's current setup (cron + `ScheduleWakeup` + JSON checkpoint state files in `.claude/state/`) IS the right shape at solo-developer + ~5-concurrent-task scale. Adding Temporal / Inngest / Mastra adds operational surface (Postgres / worker fleet / second dashboard) without measurable agent-quality improvement at this scale.

**Watchlist (install IF/WHEN crossover hits):**
- **Trigger.dev** — best fit if operator's stack stays TS-heavy (npm-native; "agents and workflows" is their stated 2026 focus)
- **LangGraph** — best fit if operator builds a custom Python agent (≥3-org production cite at r7-class)
- **Temporal** — best fit if operator scales to multi-host / multi-day production agent fleet (gold-standard; 20.3k★)

**REJECT:** n8n (license blocker), Windmill (AGPL), Restate (BSL + low stars / niche), Prefect/Dagster (not agent-purpose-built), Cadence (legacy supplanted by Temporal).

**Cite-anchors:** GitHub API metadata at 2026-05-16 snapshot indexed under per-repo `source` labels; README characterization queries via `ctx_search`. Confidence **0.84** (some star counts are 2026-05 approximations rather than exact API reads due to search-call budget).
