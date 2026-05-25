# W259 Grand-Catalog — Unaddressed Gap Survey (2026-05-17 15:20Z)

> Survey of `docs/architecture/W259-grand-catalog/` cross-checked against live runtime state. Excludes work currently being done by 3 parallel agents (ik_llama -fmoe rebuild, cognee-mcp install, graphiti structured-extract). Read-only audit.
>
> **Headline:** of ~23 architecture slots, the catalog is materially satisfied — but **5 IMPORTANT and ~6 NICE-TO-HAVE gaps remain**. The biggest unresolved class is **observability wiring** (Hindsight OTEL off, Prom scrape mis-targeted, Langfuse dead-stack idle) and **parallel-session safety primitives sitting on an unmerged branch**.

## §1 — Layer-by-layer gap matrix

| Layer | Documented Recommendation | Current State | Gap | Class | Suggested Action |
|---|---|---|---|---|---|
| **L0 MCP substrate** | 11+ servers wired; AgentRank #1 = playwright-mcp INSTALLED | LIVE (12 servers, cognee comment-only) | none | — | — |
| **L0.4 VCS substrate** | git + git-worktree + lefthook + git-cliff + git-sizer + git-branchless RECOMMENDED | git LIVE; pre-commit gate LIVE | git-cliff/lefthook/git-branchless/git-sizer never installed | NICE-TO-HAVE | install on next quiet window if changelog/hook-mgmt becomes load-bearing |
| **L0.5 Security** | gitleaks + ruff + actionlint LIVE; trivy RECOMMENDED; **opengrep INSTALL-grade (deep-resolution)** | gitleaks/ruff/actionlint LIVE; trivy + opengrep NOT installed | **opengrep fills the gate's empty SAST slot** (deep-dive §3) | **IMPORTANT** | pilot opengrep ruleset → add to pre-commit gate (cardinal-rule-2-compliant direct-CLI) |
| **L0.5 Security (gate runner)** | **prek INSTALL-NOW** (deep-resolution §3) — Rust drop-in for pre-commit, Windows-native, supply-chain hardened | `pre-commit` (Python) LIVE | prek not installed | NICE-TO-HAVE | elective swap; current gate works |
| **L0.6 Identity / OAuth** | `cloudflare/workers-oauth-provider` RECOMMENDED | not installed | not load-bearing yet | OUT-OF-SCOPE | install only when agent-OAuth surfaces |
| **L0.8 Wiki / PKM** | `foam` RECOMMENDED | not installed | docs/ partly covers it; license-ambiguity flag | NICE-TO-HAVE | defer pending operator decision |
| **L0.9 Meta-runtime-graph** | gitnexus MCP + plugin INSTALLED-LIVE | both LIVE (plugin enabled this session) | none | — | — |
| **L1 LLM Router / Gateway** | `BerriAI/litellm` RECOMMENDED (DeepSeek/local-fallback escape valve) | NOT installed | router not deployed; LLM routing flows direct to Anthropic + (for hindsight) to local `:8080` | NICE-TO-HAVE | install when non-Claude routing is needed; cardinal-rule-clean |
| **L1.5 T0 working-memory** | CLAUDE.md @imports, Auto-Memory off | LIVE | none | — | — |
| **L1.5 T1 hindsight** | INSTALLED + provider=openai→local 35B; embedder=local | LIVE; backlog drained | **embeddings-provider lock not yet pinned** (W262 §2A) — vulnerable to silent OpenAI-API fallback if config drifts | **IMPORTANT** | append `HINDSIGHT_API_EMBEDDINGS_PROVIDER=local` + `_LOCAL_MODEL=BAAI/bge-small-en-v1.5` to `.hindsight/profiles/claude-code.env` |
| **L1.5 T2 memory MCP (sqlite_vec)** | LIVE; `--with-ml` opt for sentence-transformers; busy_timeout=15000 recommended | LIVE; busy_timeout NOT applied; `--with-ml` install state unverified | concurrent-session SQLite contention risk; episodic recall quality unverified | NICE-TO-HAVE | add `MCP_MEMORY_SQLITE_PRAGMAS=busy_timeout=15000,cache_size=20000` to `.mcp.json` env |
| **L1.5 T3 cognee** | OPERATOR-DECISION (server-start); now being installed by parallel agent | being-installed (skip) | doc T3 row still says "OPERATOR-DECISION (server-start)" — `.mcp.json` mcpServers does not have `cognee` key; the W262 audit flagged the doc says "5-tier" but runtime is "4-tier" | NICE-TO-HAVE (doc drift) | reconcile `MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md` §1 T3 row after parallel install settles |
| **L1.5 T4 graphiti** | FalkorDB + Ollama qwen3:8b LIVE | LIVE (parallel agent fixing structured-extract) | structured-extract fix in flight — skip | — | — |
| **L2 Orchestration** | superpowers + agent-teams + agent-orchestration INSTALLED-LIVE | LIVE | none | — | — |
| **L2.5 Knowledge / Structured-Output** | `pydantic-ai` + `instructor` RECOMMENDED (W259 §1, BFCL #1 cloud-compatible) | NEITHER installed | the only TIER-1 catalog item left genuinely missing on L2.5 | **IMPORTANT** | `/plugin install ai@pydantic-skills` (W262-plugin-gaps §3); reversible single-uninstall |
| **L3 Peer CLI** | codex CLI via plugin INSTALLED-LIVE | LIVE | none | — | — |
| **L4 Eval frameworks** | inspect_ai + promptfoo LIVE | LIVE (`harness/eval_harness.py`) | none | — | — |
| **L4 Observability** | Phoenix INSTALLED-LIVE; Langfuse OPERATOR-DECISION | Phoenix LIVE serving ~1000 spans/hr; **Langfuse 6-container stack idle (0 events/hr) eating ~2 GiB RAM**; Grafana lacks Phoenix datasource; **hindsight `/metrics` Prom scrape misconfigured (`:17888` should be `:9077`)**; **hindsight OTEL off by default — Phoenix not seeing hindsight traces** | doc never updated post-Phoenix-promotion; Langfuse never decommissioned; hindsight OTEL never enabled | **IMPORTANT** | (a) drop Langfuse compose stack, (b) fix Prom scrape port, (c) set `HINDSIGHT_API_OTEL_TRACES_ENABLED=true` + endpoint `:14317`, (d) add Phoenix Grafana datasource |
| **L4.5 FinOps** | ccusage LIVE; defer until >$5K/mo | LIVE | none | — | — |
| **L5 Scaffold** | Managed Agents (ToS-gated) | DECLINED | none — operator-decision intact | — | — |
| **Layer-C LLM serving** | vLLM OPERATOR-DECISION (WSL2-only) | ik_llama.cpp `:8080` serving 35B locally; embedder `:8082` | none for current scale; vLLM remains optional | — | — |
| **L6 Pattern-cite** | 18 patterns adopted; ralph-loop plugin LIVE | LIVE | none | — | — |
| **L6.5 ADR / decision-log** | MADR convention RECOMMENDED zero-install | not adopted in docs/ | structured ADRs would clean up the proliferating W259/W260/W261/W262 ledger | NICE-TO-HAVE | adopt MADR template under `docs/adr/` |
| **L8 Multi-MAX governance** | CLIProxyAPI OPERATOR-DECISION | submodule present (`accounts/repos/CLIProxyAPI`) but not actively routing | promote-to-T1 if multi-account routing becomes load-bearing | NICE-TO-HAVE | wire when multi-account need surfaces |
| **L9 FM-catalog** | publish-to-OSS plan | INSTALLED-LIVE (operator-authored) | publication not executed | NICE-TO-HAVE | operator-elective |
| **Parallel-session safety primitives** | `worktree.baseRef:"head"` + `teammateMode:"in-process"` (PARALLEL-SESSION-ARCHITECTURE.md W1/W2 punch-list) | NOT WIRED on `main` (commit `37394f8` on `parallel-sessions-arch` branch only); **CLAUDE.md missing pointers to `parallel-feature-development` + `team-communication-protocols` skills** — invisible to autoloader = the §9 collision precondition | live incident (5× both-writers-on-main, ~23 min) proves this is load-bearing | **IMPORTANT** | rebase `parallel-sessions-arch` onto main, ff-merge; append 2-line pointer to CLAUDE.md parallel-execution paragraph |
| **Permission posture (D26)** | `defaultMode:"auto"` (W259-v12 F1: confirmed valid value) | `bypassPermissions` standing operator-option | unleashes destructive ops in `claude --bg` runs; **CC-DIMENSIONS-UNLEASHED W259v7 listed D26 as ROI=7** | NICE-TO-HAVE | operator-elective flip; safety-tradeoff acknowledged in CLAUDE.md |
| **Plugin budget (T0.0)** | `claude plugin details` audit + ACTIVE/DORMANT/DISCOVERY-ONLY classification; target ≤15 ACTIVE; 62% dead-weight per PLUGIN-MARKETPLACE-AUDIT-W259v2.md; flip ECC discovery-only | NOT executed since claude 2.1.143 unblocked it | preload-tax never paid down; ECC alone = ~50% preload | NICE-TO-HAVE | run `claude plugin details` → codify enabledPlugins |
| **OPENAI_API_KEY exfil risk** | unset / dummy after hindsight provider switch | KEY STILL SET (User+Process scope per W262 §0 row 23) | unused by hindsight LLM-path but still on disk — security drift surface | NICE-TO-HAVE | revoke at platform.openai.com + delete from User env |

## §2 — IMPORTANT-class gaps (5) — clear SOTA win, low cost

1. **`opengrep` install** — fills the empty SAST slot in the commit gate (deep-resolution §3 INSTALL-grade). Cardinal-rule-2-compliant direct-CLI. Cost: pilot ruleset + add to `.pre-commit-config.yaml`.
2. **`pydantic-ai` skill install** — closes the only TIER-1 L2.5 catalog item still genuinely missing (W262-plugin-gaps §3). Cost: single `/plugin install`.
3. **Hindsight embeddings-provider lock** — pin `HINDSIGHT_API_EMBEDDINGS_PROVIDER=local` to prevent silent OpenAI-API fallback (W262 §2A). Cost: 3 env-file lines.
4. **Observability cleanup (Langfuse drop + Prom scrape fix + hindsight OTEL on + Grafana Phoenix datasource)** — W262-observability §4 one-shot remediation. Drops 6 idle containers, gains hindsight trace stream, fixes one broken target.
5. **Parallel-session safety wiring + CLAUDE.md pointer** — commit `37394f8` (worktree.baseRef + teammateMode + memory busy_timeout) sits on `parallel-sessions-arch` unmerged; CLAUDE.md missing 2-line pointer to `parallel-feature-development` / `team-communication-protocols` skills. Live §9 collision proves this is load-bearing. Cost: rebase + ff-merge + 2 lines in CLAUDE.md.

## §3 — Explicit non-gaps (verified satisfied)

- 5-tier memory stack: hindsight T1 + memory-MCP T2 + cognee T3 + graphiti T4 — runtime is 4-tier (cognee being installed by parallel agent). **T2-T5 = doobidoo/mcp-memory-service (sqlite_vec) / cognee / graphiti / Phoenix-as-observability-not-memory.**
- Skill discovery: SkillTool auto-fires per `description:` match per `code.claude.com/docs/en/skills` — no AgentTool migration needed; multiple skills installed (superpowers, agent-teams, wshobson, codex, etc.).
- Pinned cite-anchored install commands: `tmp/repomix-library/packed/` exists with 23 priority repos — used by W262 deep-dives; no further pinning needed.
- Model-routing recommendation: LiteLLM RECOMMENDED but explicitly demand-gated (W259-SHIP-DECISIONS L1) — cardinal-rule-clean (no hooks, env-redirect only); not currently load-bearing.

## §4 — Verdict

**Catalog convergence is intact**: of ~23 layers, 11 INSTALLED-LIVE, 6 RECOMMENDED-not-yet, 4 OPERATOR-DECISION, 5 DECLINED. Of the 6 RECOMMENDED, **2 became IMPORTANT post-W259-v16 deep-resolution** (`opengrep` + `pydantic-ai`); the other 4 (`litellm`, `foam`, `workers-oauth`, MADR) remain correctly NICE-TO-HAVE. The biggest non-catalog gaps are **observability wiring drift** and **parallel-session safety primitives stranded on a side branch** — both fixable in a single quiet-window pass with the W262 §2 commands.
