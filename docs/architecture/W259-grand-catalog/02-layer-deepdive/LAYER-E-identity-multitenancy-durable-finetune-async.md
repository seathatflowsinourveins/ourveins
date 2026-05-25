# LAYER-E — Identity · Multi-tenancy · Durable Execution · Fine-Tune Ops · Async Workflows · Persistence · Compliance

> W259 LAYER-E (GAP-layer) catalog. Produced 2026-05-16. Cite-class: TIER-3-LOCAL-COMPOSITION (research aggregated from deepwiki + exa + github search 2026-05-16; per-candidate primary cite is the GitHub repo + deepwiki ask_question response).
>
> Mission: catalog 7 sublayers (Identity / Multi-tenant Authz / Durable Execution / Fine-Tune Ops / Async Messaging / Agent State Persistence / Compliance & Audit) for operator profile = single-dev with multi-MAX Claude accounts + hypothetical multi-tenancy, Z:-portable Windows install, unlimited codex usage.

---

## §0 — Landscape

This layer covers seven categories of primitives NOT addressed by W258 v13 Layers A-D (orchestration, retrieval, observability, model runtime). The unifying thread: **state that outlives a single chat turn**, including:

- **Identity / OAuth** — multi-MAX-account session management, per-tenant identity scoping. Operator already uses 8/8 OAuth pool (per CLAUDE.local.md W183 F1 REVERT note); a self-hosted OIDC provider would replace ad-hoc account juggling.
- **Multi-tenant authorization** — per-tenant tool/MCP-server allowlists; agent capability gating. Different in nature from OS-level sandboxing (cardinal-rule-5 territory).
- **Durable execution** — workflows that survive process restart / `/compact` / autocompact-thrash. Critical for FM-17 recovery class and for any agent task >10min wall-clock.
- **Fine-tune ops** — operator profile shows interest in customizing local models (per parent claude-sota Ollama install pattern). Single-GPU fine-tuning is the dominant operator-fit dimension.
- **Async / message-passing** — pub/sub between agents; event-driven hooks beyond Claude Code's PreToolUse/PostToolUse synchronous model. MCP Tasks SEP-1686 (FINAL, merged Nov 2025) is the in-protocol durable async primitive.
- **Agent state persistence** — CRDT-style state for collaborative agents; resumable sessions across process boundaries. Distinct from Layer C observability (read-only) and Layer A orchestration (in-memory).
- **Compliance / audit-trail** — supply-chain attestation for installed plugins/agents/skills (cardinal-rule-1 + cardinal-rule-9 install-risk discipline). SLSA + sigstore + in-toto are the canonical triad.

**Layer-E vs upstream Claude Code**: Claude Code natively provides OAuth client (Anthropic-hosted) + hooks + permissions + session JSONL. It does NOT provide: a self-hosted IdP, multi-tenant authz, durable workflow engine, fine-tune harness, async message broker, CRDT state, or supply-chain attestation. Every primitive in this layer is **additive** to the upstream runtime.

**Operator-fit invariants** applied throughout:
1. Single-binary or single-`docker-compose up` install preferred (no Kubernetes / no managed cloud).
2. Windows-native binary or WSL2-tolerant. Z:-portable when possible.
3. License must permit private commercial use (MIT/Apache-2/BSL-with-grant). AGPL = service-side only acceptable.
4. Active maintenance (commit in last 60d).
5. Multi-tenant primitives must be cheap-or-free at single-dev scale (no per-seat licensing).

---

## §1 — Identity / OAuth / authn

### §1.1 ZITADEL (`zitadel/zitadel`)
- **Stars / activity**: ~13k stars; commits in last 30d: ~daily; pushed 2026-05-15 (HOT).
- **License**: AGPL-3.0-only core + Apache-2.0 (`proto/`, `apps/docs/`) + MIT (`apps/login/`, client packages). Operator-relevant: AGPL applies only if you offer ZITADEL-as-a-service externally; self-hosted local use is fine.
- **Architecture**: Go binary + Next.js login UI + Traefik + Postgres. Event-sourcing core (full audit trail by design).
- **Multi-tenancy**: Battle-tested 3-level hierarchy — Instance → Organization → Project. Built-in.
- **Native-CC pathway**: No first-party CC integration; integrates via OIDC discovery. Could serve as IdP for MCP servers requiring OAuth (per MCP auth spec).
- **Install**: `docker compose up -d --wait` after editing `.env.example` + setting `ZITADEL_MASTERKEY`. Windows-compatible via Docker Desktop.
- **Operator-fit**: HIGH for single-dev with multi-tenant hypothetical. Multi-tenancy out-of-box; event-sourcing audit trail aligns with cardinal-rule-9 install-risk discipline. Heaviest of the OSS IdPs at single-dev scale (4+ containers).
- **Convergence axes**: Cited by Logto, Casdoor, Rauthy comparisons as the most enterprise-grade OSS IdP. CNCF-adjacent.
- **SOTA status**: SOTA for self-hosted multi-tenant OIDC as of 2026-05.

### §1.2 better-auth (`better-auth/better-auth`)
- **Stars / activity**: ~14k stars; pushed 2026-05-16 (HOT).
- **License**: MIT.
- **Architecture**: TypeScript framework-agnostic library; not a server — it's a library you embed in your Node/Next/Hono/SvelteKit app. Database adapter pattern (Postgres / SQLite / Drizzle / Prisma).
- **Multi-tenancy**: First-class via `Organization` plugin + `Multi Session` plugin (multiple concurrent accounts per browser — directly relevant to operator's multi-MAX-account pattern).
- **Native-CC pathway**: No. CC OAuth is Anthropic-hosted; better-auth would be for *your* app, not for CC's session.
- **Install**: `npm install better-auth` + adapter pkg. Zero infrastructure.
- **Operator-fit**: HIGH for single-dev building user-facing apps (TypeScript). Multi-session plugin is the strongest direct match for operator's multi-MAX-account workflow.
- **Convergence axes**: Migration guides from Auth.js, Clerk, Supabase Auth — i.e., it positions itself as the SOTA replacement for all of them. Active migration ecosystem.
- **SOTA status**: SOTA for TypeScript app auth as of 2026-05. Recent ascendant.

### §1.3 Auth.js / NextAuth (`nextauthjs/next-auth`)
- **Stars / activity**: ~28k stars; active.
- **License**: ISC.
- **Architecture**: `@auth/core` framework-agnostic + per-framework packages (`next-auth`, `@auth/sveltekit`, `@auth/solid-start`, `@auth/express`, `@auth/qwik`).
- **Multi-tenancy**: Limited — single-account-per-session model; no first-class org/team.
- **Install**: `npm install next-auth`.
- **Operator-fit**: MEDIUM. Established, stable, but lacks multi-tenancy primitives better-auth provides.
- **SOTA status**: Established but being displaced by better-auth for new projects.

### §1.4 Ory Kratos (`ory/kratos`)
- **License**: Apache-2.0 (open core) + paid Ory Enterprise License (OEL) for multi-tenancy + advanced features.
- **Architecture**: API-first identity flows (registration, login, MFA, recovery). Headless — you build the UI. Integrates with Ory Hydra (OIDC server) + Ory Keto (Zanzibar authz) + Ory Oathkeeper (IAP).
- **Multi-tenancy**: GATED behind OEL. Open-source version: single-tenant.
- **Operator-fit**: LOW for single-dev multi-tenant. The multi-tenancy gate eliminates it for the operator's hypothetical.
- **SOTA status**: Established but the OEL gate makes ZITADEL strictly better for OSS multi-tenant.

### §1.5 Other notable candidates
- **Keycloak** (`keycloak/keycloak`) — Apache-2.0, Java-heavy, the de facto enterprise OSS IdP for 10+ years. Heavyweight (JVM + Wildfly + Postgres). Operator-fit LOW for single-dev (JVM tax). 26k+ stars; pushed 2026-05-16.
- **Casdoor** (`casdoor/casdoor`) — Apache-2.0, Go + React. Multi-tenancy via "Organization" primitive. Lighter than Keycloak. 11k+ stars.
- **Rauthy** (`sebadob/rauthy`) — Rust single-binary OIDC provider. Smallest footprint of all. 1k+ stars; pushed 2026-05-15.
- **Logto** (`logto-io/logto`) — TypeScript OIDC + OAuth 2.1 with multi-tenancy/SSO/RBAC. Modern stack. 10k+ stars.
- **Lucia-auth** — DEPRECATED upstream (last push 2025-07-13). Skip.
- **Supabase Auth (GoTrue)** — MIT, multi-tenancy NOT supported. Single-tenant only.
- **Clerk-equivalents OSS** — Stack-auth (hexclave/stack-auth) is the leading OSS Clerk alternative; pushed 2026-05-16.
- **Fief / WorkOS-OSS** — Not actively maintained at SOTA cadence.

### §1.6 Sublayer §1 verdict
**Top-3**: (1) **better-auth** — operator-fit champion for TypeScript apps + multi-session = operator's multi-MAX use case. (2) **ZITADEL** — heavyweight but SOTA for self-hosted multi-tenant OIDC if operator hypothesizes externally-facing multi-tenant. (3) **Rauthy** — single-binary Rust OIDC for minimum-footprint deployments.

---

## §2 — Multi-tenant agent orchestration / Authorization

### §2.1 OpenFGA (`openfga/openfga`)
- **License**: Apache-2.0.
- **Architecture**: Zanzibar-inspired ReBAC engine. CNCF Sandbox project (originated as Auth0 FGA, open-sourced). Single Go binary, precompiled Windows binary (`openfga run`).
- **Model**: Authorization-as-data; you write a `model` and store `relation tuples`. Queries: `check`, `list_objects`, `list_users`, `expand`.
- **Native-CC pathway**: Not direct. Useful for per-tenant tool/MCP-server allowlists if operator builds a tool-gating layer.
- **Operator-fit**: HIGH. Single binary + Windows-compiled + Apache-2 + cheap-at-single-dev-scale.
- **Convergence axes**: Zanzibar paper convergence — Authzed/SpiceDB, Ory Keto, OpenFGA, Permify all implement Google Zanzibar. OpenFGA has the strongest CNCF momentum.
- **SOTA status**: SOTA for OSS Zanzibar ReBAC.

### §2.2 OPA / Open Policy Agent (`open-policy-agent/opa`)
- **License**: Apache-2.0.
- **Architecture**: CNCF *Graduated* policy engine. Rego policy language. Three integration modes: sidecar daemon (REST API), Go SDK (embedded library), Wasm (compile policy → run in any runtime).
- **Use case**: General-purpose policy decision point. Authorize HTTP requests, K8s admission, Terraform plans, *and* agent tool calls.
- **Native-CC pathway**: Could embed in a wrapper around MCP tool calls. Wasm mode = lightweight enough to drop into Claude Code hooks.
- **Operator-fit**: HIGH. Battle-tested, single binary, every major lang has client.
- **SOTA status**: SOTA for OSS general policy engine.

### §2.3 Cedar (`cedar-policy/cedar`)
- **License**: Apache-2.0.
- **Architecture**: AWS-originated policy DSL (powers AWS Verified Permissions). Rust core + JS/Java/Python bindings. Designed for *analyzability* — automated reasoning over policies (formal verification of "can policy X grant access Y").
- **Compared to OPA Rego**: Cedar is purpose-built for authz; Rego is general-purpose. Cedar policies are more constrained → more tractable for formal analysis. OPA more flexible.
- **Operator-fit**: MEDIUM-HIGH. Smaller community than OPA but technically superior for authz-specific scenarios.
- **SOTA status**: SOTA for analyzable authorization DSL (formal-methods-grade).

### §2.4 Casbin (`apache/casbin`)
- **License**: Apache-2.0 (now Apache TLP).
- **Architecture**: Multi-language authorization library (Go, Java, Python, Node.js, .NET, Rust, PHP, etc.). PERM model (Policy/Effect/Request/Matcher). Supports ACL, RBAC, ABAC. NOT Zanzibar-style ReBAC.
- **Operator-fit**: HIGH for application-embedded authz (lib in any lang). LOW for cross-service authz (no central service mode like OpenFGA).
- **SOTA status**: Established but less SOTA than OpenFGA/Cedar for new projects.

### §2.5 Other candidates
- **Ory Keto** — Apache-2.0 Zanzibar implementation. OpenFGA has stronger momentum.
- **Oso** — pivoted to commercial-only; OSS abandoned. Skip.
- **Permify** — Apache-2 Zanzibar-style. Smaller community.

### §2.6 Sublayer §2 verdict
**Top-3**: (1) **OpenFGA** — single-binary Zanzibar, Windows-native, CNCF-blessed. (2) **OPA** — general-purpose policy, embeddable via Wasm for hook-level enforcement. (3) **Cedar** — pick if formal-analysis matters; lighter than OPA for pure authz.

---

## §3 — Durable execution

### §3.1 Temporal (`temporalio/temporal`)
- **License**: MIT (server) — most permissive of any durable-exec system in this layer.
- **Architecture**: Distributed workflow engine. Workers run code; server persists state. SDKs in Go/Java/TS/Python/.NET/PHP/Ruby. Latest server: 1.31.0.
- **Local dev**: `temporal server start-dev` (single command, in-memory). On Windows: WSL2 recommended; native binary exists for amd64+arm64.
- **Native-CC pathway**: Not direct. Could wrap long-running Claude Code Agent() dispatches as Temporal workflows for crash-resilience. Would replace fragile `codex exec` subprocess pattern.
- **Operator-fit**: HIGH for orchestration durability (replaces ad-hoc Bash retry-in-sleep-loops). MEDIUM for single-dev daily use (steeper learning curve than Inngest).
- **Convergence axes**: Cited by Hatchet, Restate, DBOS as the reference architecture. Industry SOTA for durable execution.
- **SOTA status**: SOTA. Most-cited.

### §3.2 Inngest (`inngest/inngest`)
- **License**: SSPL + Apache-2.0 delayed open-source (DOSP) for server. SDKs Apache-2.0.
- **Architecture**: Event-driven durable functions; "steps" are individually retryable. Cloud-hosted + OSS dev server.
- **Local dev**: `npx inngest-cli@latest dev` — single-binary Windows-compatible (`inngest.exe`).
- **Operator-fit**: HIGH for single-dev TypeScript. Best DX of the durable-exec systems. SSPL caveat: do not run as SaaS (operator does not).
- **SOTA status**: SOTA for TypeScript-first durable execution.

### §3.3 Hatchet (`hatchet-dev/hatchet`)
- **License**: MIT (fully).
- **Architecture**: Postgres-backed task queue + DAG orchestrator + durable execution. SDKs in Py/TS/Go.
- **Single-binary**: `hatchet-lite` — bundles API + engine + UI; backed only by Postgres (uses Postgres as message queue *and* state store).
- **Local dev**: `docker compose up` with `hatchet-lite` image.
- **Operator-fit**: HIGH. Single Postgres dependency + MIT license + multi-lang SDKs + native DAG primitives. Strongest for operator if Postgres is already in the stack.
- **SOTA status**: SOTA for Postgres-backed durable execution; ascendant.

### §3.4 Restate (`restatedev/restate`)
- **License**: BUSL-1.1 with use-grant; converts to Apache-2 after 4 years.
- **Architecture**: Distributed durable execution; exactly-once semantics. Rust core.
- **Windows**: No first-party Windows binary (Linux/macOS only via npm). Must use WSL2 or Docker.
- **Operator-fit**: MEDIUM. Windows gap + BUSL license vs MIT alternatives.
- **SOTA status**: SOTA architecture (exactly-once) but adoption < Temporal.

### §3.5 DBOS (`dbos-inc/dbos-transact-py`, `dbos-inc/dbos-transact-ts`)
- **License**: MIT (both py and ts).
- **Architecture**: Database-backed durable workflows. Decorator-based — annotate Python/TS functions; DBOS handles checkpointing in the DB.
- **Compared to Temporal**: "Database IS the orchestrator" — no separate server. Simpler dependency footprint.
- **Operator-fit**: HIGH for single-dev. Smallest deployment footprint.
- **SOTA status**: SOTA for embedded durable execution (no separate orchestrator).

### §3.6 Trigger.dev v4 (`triggerdotdev/trigger.dev`)
- **License**: Apache-2.0.
- **Architecture**: Background job platform; TypeScript-first. V4 (current) unified `provider`+`coordinator` into single `supervisor`; resource limits + horizontal worker scaling default.
- **Self-host**: Docker Compose; stack = Webapp + Worker + Postgres + ClickHouse + Redis + Minio + S2 Streamstore. Heavier than Inngest dev-server but more feature-complete.
- **Operator-fit**: MEDIUM. Heavier stack but Apache-2 + active.
- **SOTA status**: SOTA for v4-era TS background jobs.

### §3.7 Prefect 3 / Dagster (data orchestration adjacency)
- **Prefect 3** — Apache-2; Python-first; `prefect server start` single-command local. SQLite default for single-dev. Strong AI MCP integration recently (Prefect MCP server).
- **Dagster** — Apache-2; asset-based (different paradigm); Python-first. Heavier than Prefect for single-dev.

### §3.8 Conductor OSS (`conductor-oss/conductor`)
- Apache-2 fork of Netflix Conductor; "event-driven agentic workflow engine". Java/JVM-heavy. Pushed 2026-05-15.
- **Operator-fit**: LOW (JVM weight).

### §3.9 MCP Tasks (SEP-1686) — IN-PROTOCOL
- **Status**: FINAL, merged 2025-11-14 into MCP spec; spec version 2025-11-25.
- **Capability**: Adds `tasks` primitive to MCP — call-now, fetch-later. Receivers declare `tasks` capability per request category. Task has lifecycle: `working` → (`input_required`?) → `completed`/`failed`/`cancelled`. `taskId` is **receiver-generated** (per Nov 2025 PR review, the original client-generated proposal was rejected for tenant isolation reasons). `ttl` controls result retention.
- **Java SDK PR** open Jan 2026 (`modelcontextprotocol/java-sdk#755`); TS/Python SDK implementations rolling out.
- **Native-CC pathway**: YES — once Claude Code's MCP client implements SEP-1686, ANY task >turn-duration can be polled. Replaces brittle process-keepalive pattern.
- **SOTA status**: SOTA in-protocol durable async primitive. Operator-relevant: this is the LONG-TERM correct path; durable-exec systems above (Temporal/Inngest/Hatchet) are stopgaps until SDK adoption + MCP server support land.

### §3.10 Sublayer §3 verdict
**Top-3**: (1) **MCP Tasks SEP-1686** — in-protocol, final, will subsume external systems for MCP-mediated tasks. (2) **Hatchet** — best operator-fit for explicit durable-workflow stack (MIT + Postgres-only + multi-lang). (3) **Inngest** — best TS DX; pair with Hatchet if operator splits TS/Python.

---

## §4 — Fine-tune / training ops

### §4.1 LLaMA-Factory (`hiyouga/LlamaFactory`)
- **License**: Apache-2.0.
- **Architecture**: Unified harness — 100+ models supported. Methods: full-tune, freeze, LoRA, QLoRA (2/3/4/5/6/8-bit), OFT, QOFT. Stages: pt, sft, rm, ppo, dpo, kto.
- **GPU**: 7B QLoRA 4-bit = ~6GB VRAM (operator-feasible on a single consumer GPU).
- **Web UI**: LLaMA Board (no-code).
- **Unsloth integration**: First-class — `use_unsloth: true` → 170% speedup, 50% memory reduction.
- **Operator-fit**: HIGH. Most-supported model coverage; widest method coverage. Apache-2.
- **SOTA status**: SOTA for general-purpose fine-tuning.

### §4.2 Unsloth (`unslothai/unsloth`)
- **License**: Dual — Apache-2.0 (core) + AGPL-3.0 (Unsloth Studio UI).
- **Architecture**: Custom Triton + math kernels. 2× faster, 70% less VRAM, no accuracy loss; RL = 80% less VRAM.
- **Windows**: FULL support — `install.ps1` for Unsloth Studio; `pip install unsloth` for core.
- **Operator-fit**: HIGH for single-GPU consumer-hardware fine-tuning. Windows-native = operator-fit champion.
- **SOTA status**: SOTA for memory-efficient fine-tuning; widely cited as the speed/memory floor.

### §4.3 Axolotl (`axolotl-ai-cloud/axolotl`)
- **License**: Apache-2.0.
- **Architecture**: YAML-config-driven fine-tuner. SFT + PEFT (LoRA/QLoRA) + RLHF (DPO/KTO/ORPO/GRPO via TRL integration). Axolotl pioneered LoRA optimizations later adopted by Unsloth.
- **Windows**: Recommends WSL2 or Docker (no native Windows).
- **Operator-fit**: MEDIUM (Windows tax). Strong for cloud GPU rental scenario; less native for operator's local Z: install.
- **SOTA status**: SOTA for YAML-declarative fine-tuning.

### §4.4 TRL (`huggingface/trl`)
- **License**: Apache-2.0.
- **Architecture**: HuggingFace's RLHF library. SFTTrainer, DPOTrainer, PPOTrainer (experimental). Foundation that LLaMA-Factory + Axolotl build on top of for RL.
- **Operator-fit**: HIGH if operator goes lower-level. Library, not harness.
- **SOTA status**: SOTA RLHF library (canonical).

### §4.5 torchtune (`pytorch/torchtune`)
- **License**: BSD-3-Clause.
- **Architecture**: PyTorch-native; recipes in YAML + Python. Hackable design — composition over inheritance. SFT + DPO + PPO + KD + QAT.
- **Operator-fit**: MEDIUM-HIGH. Cleanest code; smaller community than LLaMA-Factory/Axolotl.
- **SOTA status**: SOTA for PyTorch-native; preferred for research/customization.

### §4.6 MLX-LM (`ml-explore/mlx-lm`)
- **License**: MIT.
- **Architecture**: Apple-silicon-optimized LLM lib. Supports LoRA/DoRA/QLoRA + full fine-tune. Has CUDA + CPU backends — can technically run on Windows-NVIDIA but NOT the optimization target.
- **Operator-fit**: LOW on Windows (operator is not on Apple silicon). N/A for operator.
- **SOTA status**: SOTA on Apple silicon; non-applicable on operator's Z:-portable Windows.

### §4.7 Other candidates
- **H2O LLM Studio** — Apache-2; no-code GUI for fine-tuning. Heavier UI but easier ramp.
- **Ludwig** (`ludwig-ai/ludwig`) — Low-code framework. Less SOTA than LLaMA-Factory for current LLMs.
- **maxtext** — Google JAX-based; TPU-targeted. N/A on operator hardware.
- **kubeflow/trainer** — K8s-targeted. N/A at single-dev scale.
- **NVIDIA NeMo-Curator** — data prep tooling; complement to fine-tuners.

### §4.8 Sublayer §4 verdict
**Top-3 for operator** (Windows, single-GPU): (1) **Unsloth** — Windows-native installer, 2× speed, MIT/Apache-2 core. (2) **LLaMA-Factory** — widest model + method coverage, integrates Unsloth, web UI. (3) **TRL** + **torchtune** — lower-level libs for when LLaMA-Factory abstractions are too coarse.

---

## §5 — Async / message-passing infrastructure

### §5.1 NATS (`nats-io/nats-server`)
- **License**: Apache-2.0.
- **Architecture**: Single Go binary; cross-compiled for Windows (amd64/386/arm64). Runs as Windows service. Subject-based pub/sub + queue groups + request/reply.
- **JetStream**: Built-in persistence layer — durable streams + durable consumers. Account-level multi-tenancy with per-account JetStream limits (`MaxMemory`, `MaxStore`, `MaxStreams`).
- **Operator-fit**: VERY HIGH. Single binary + Windows-service + multi-tenant accounts native + Apache-2 + lightest of the brokers.
- **SOTA status**: SOTA for cloud-native lightweight messaging; CNCF Incubating.

### §5.2 Redpanda (`redpanda-data/redpanda`)
- **License**: BSL with grant → Apache-2 after Change Date.
- **Architecture**: C++ Kafka-API-compatible streaming platform. No ZooKeeper, no JVM. Single binary; precompiled for Debian/Ubuntu/Fedora/RedHat/Amazon Linux/macOS. Windows: NOT first-party (Linux containers via WSL2).
- **Operator-fit**: MEDIUM (Windows gap) but HIGH if operator uses WSL2 for stream-heavy workloads. Kafka-compat means any Kafka client lib works.
- **SOTA status**: SOTA Kafka-compatible drop-in; replaces Kafka+ZK heaviness.

### §5.3 Kafka — established giant
- Apache-2 reference but JVM-heavy. Redpanda strictly better for new deployments at single-dev scale.

### §5.4 RabbitMQ — established AMQP broker
- MPL-2; mature. Lighter than Kafka but heavier than NATS for the operator's likely use case (small fan-out, no audit-class durability).

### §5.5 Apache Pulsar (`apache/pulsar`)
- **License**: Apache-2.0.
- **Architecture**: Distributed pub-sub on top of Apache BookKeeper. Native multi-tenancy: Clusters → Tenants → Namespaces → Topics. Geo-replication first-class. New "Scalable Topics" feature (in Pulsar 5.0) eliminates partition-recreation downtime.
- **Operator-fit**: LOW for single-dev (BookKeeper + ZK + brokers + proxies + admin UI = 4+ processes). Strong for enterprise multi-tenant.
- **SOTA status**: SOTA for geo-replicated multi-tenant streaming; not operator-fit at single-dev scale.

### §5.6 NSQ / ZeroMQ
- **NSQ** — Go; simple distributed messaging; durable to disk. Lighter than Kafka. Less active than NATS.
- **ZeroMQ** — Library not broker; for embedded use. Different problem.

### §5.7 RobustMQ (`robustmq/robustmq`)
- Rust single-binary multi-protocol broker (MQTT/Kafka/AMQP). Self-described "communication infrastructure for the AI era". Pushed 2026-05-16 (HOT). Apache-2.
- Early-stage; not yet SOTA but promising.

### §5.8 Cloudflare Queues equivalents (OSS)
- No exact open-source equivalent of CF Queues. Closest: NATS JetStream + worker pattern.

### §5.9 Sublayer §5 verdict
**Top-3**: (1) **NATS+JetStream** — operator-fit champion (Windows-native single binary, account-level multi-tenancy, JetStream durable streams). (2) **Redpanda** — pick if Kafka-API compat needed (WSL2-tolerant). (3) **RobustMQ** — watch list; could displace NATS for AI-specific scenarios within 12-18mo.

---

## §6 — Agent state persistence

### §6.1 Yjs (`yjs/yjs`)
- **License**: MIT.
- **Architecture**: CRDT for collaborative apps. Shared types: `Y.Map`, `Y.Array`, `Y.Text`. Network-agnostic — y-websocket/y-webrtc; Persistence — y-indexeddb/y-mongodb-provider/y-postgresql/y-fire.
- **Use for agent state**: Multi-agent shared workspace; collaborative drafting; resumable agent sessions stored as Y.Doc.
- **Operator-fit**: HIGH for TS/JS agents. Mature, modular, well-documented.
- **SOTA status**: SOTA CRDT for JS/TS apps.

### §6.2 Automerge (`automerge/automerge`)
- **License**: MIT.
- **Architecture**: Rust core + WASM JS bindings + C/C++ FFI. JSON-like CRDT with Map/List/Text/Counter. Columnar binary format; explicit save/load + incremental sync.
- **Compared to Yjs**: Automerge is more general (full JSON CRDT including arbitrary nesting); Yjs is faster for text. Automerge has stronger Rust support.
- **Operator-fit**: HIGH. Rust core = good for Z:-portable cross-lang use.
- **SOTA status**: SOTA general-purpose CRDT.

### §6.3 ElectricSQL (`electric-sql/electric`)
- **License**: Apache-2.0.
- **Architecture**: Postgres-sync engine — HTTP replication protocol (not WebSocket); CDN-cacheable. "Shapes" = partial replicas via SQL WHERE clauses. "Durable Sessions" / "Durable Streams" patterns for AI agent state + token streaming.
- **Operator-fit**: VERY HIGH for Postgres-backed agents. The "Durable Streams" framing is the most agent-aligned of all in this section — multiplexes AI token streams with structured state into resumable, addressable sessions.
- **SOTA status**: SOTA for Postgres-sync with AI-agent extension.

### §6.4 jazz-tools (`garden-co/jazz`)
- **License**: MIT.
- **Architecture**: Local-first toolkit on top of Jazz distributed database. CoMap/CoList/CoFeed primitives + Group permissions. React/RN/Expo/Svelte integrations.
- **Operator-fit**: MEDIUM-HIGH for collaborative-app scenarios.
- **SOTA status**: SOTA for "tall abstraction" local-first.

### §6.5 LiveKit Agents (`livekit/agents`)
- **License**: Apache-2.0.
- **Architecture**: Python framework for real-time voice/multi-modal AI agents. STT/LLM/TTS/VAD orchestration. WebRTC client. Self-host LiveKit server.
- **Operator-fit**: LOW for text-only Claude Code workflows; HIGH if operator builds voice agents.
- **SOTA status**: SOTA for real-time voice agents.

### §6.6 liveblocks / durable-objects
- **liveblocks** — Commercial-SaaS-only OSS adapter. Not OSS-server.
- **Cloudflare Durable Objects** — Not open-sourced server-side.

### §6.7 Sublayer §6 verdict
**Top-3**: (1) **ElectricSQL** — operator-fit champion (Postgres + AI-agent-aware Durable Streams pattern + Apache-2). (2) **Yjs** — pick for browser-side collaborative agent state. (3) **Automerge** — pick for Rust/cross-lang scenarios.

---

## §7 — Compliance / audit-trail / supply chain

### §7.1 sigstore / cosign (`sigstore/cosign`)
- **License**: Apache-2.0.
- **Architecture**: Keyless container/artifact signing via OIDC ephemeral certs + Rekor transparency log. The default verification primitive for the entire Kubernetes/CNCF ecosystem.
- **Use for operator**: Sign installed plugins; verify upstream agent/skill provenance before install (cardinal-rule-1 install-priority + cardinal-rule-9 install-risk).
- **Operator-fit**: HIGH. Single binary `cosign verify` for any container/blob.
- **SOTA status**: SOTA artifact signing.

### §7.2 in-toto (`in-toto/in-toto`)
- **License**: Apache-2.0.
- **Architecture**: Supply-chain attestation framework. `Layout` defines authorized steps + functionaries; `Link` files record each step with signed artifact hashes; `in-toto-verify` validates end-to-end.
- **Single-dev fit**: Single developer can act as both project-owner and functionary. CNCF Sandbox.
- **Use for operator**: Audit trail for installed plugins — record which plugin version was installed, by whom (operator), with what hashes — verifiable later.
- **SOTA status**: SOTA attestation framework.

### §7.3 SLSA (slsa-framework/slsa-github-generator)
- **License**: Apache-2.0.
- **Architecture**: GitHub Actions workflows that generate SLSA v0.2/v1.0 provenance in in-toto attestation format. Signed via sigstore-keyless + Rekor. Builders for Go/Node.js/Maven/Gradle/Bazel; generic generator for arbitrary artifacts.
- **Operator-fit**: HIGH if operator publishes plugins. For *consuming* plugins, operator should check that upstream uses SLSA — gate of install acceptance.
- **SOTA status**: SOTA for GitHub-native supply-chain provenance.

### §7.4 OpenTelemetry baggage
- W3C-standardized propagation primitive. NOT a supply-chain primitive — it's a runtime trace-correlation primitive. Mentioned in mission as "compliance" candidate but actually fits Layer C (observability). Cite-anchor only; not catalog-listed here.

### §7.5 audit-log-frameworks
- **audit-protocol** family — generic; no single OSS leader at SOTA. Operator can roll own with structured-event log on top of any of Layer C observability stack.

### §7.6 Sublayer §7 verdict
**Top-3**: (1) **sigstore/cosign** — operator-fit champion; single binary; verifies any artifact. (2) **in-toto** — attestation grammar; pair with cosign for signed attestations. (3) **SLSA + slsa-github-generator** — pick if/when operator publishes; verify upstream of trusted plugins.

---

## §8 — Convergence axes

| Axis | Sublayer | Champion | 2nd | 3rd |
|---|---|---|---|---|
| Single-binary Windows-native | §5 messaging | NATS | OpenFGA (§2) | Rauthy (§1.5) |
| Postgres-only durable backend | §3 durable | Hatchet | DBOS | ElectricSQL (§6) |
| TypeScript-first DX | §1+§3 | better-auth + Inngest | Auth.js + Trigger.dev v4 | — |
| Zanzibar ReBAC | §2 | OpenFGA | Ory Keto | Permify |
| CRDT for collaborative state | §6 | Yjs | Automerge | jazz-tools |
| Supply-chain trifecta | §7 | sigstore + in-toto + SLSA | — | — |
| In-protocol durable async | §3 | MCP Tasks SEP-1686 (FINAL) | — | — |
| Single-GPU fine-tuning on Windows | §4 | Unsloth | LLaMA-Factory + Unsloth | TRL |
| Multi-tenant OIDC (self-hosted) | §1 | ZITADEL | Casdoor | Logto |
| AI-agent-aware durable streams | §6 | ElectricSQL Durable Streams | NATS JetStream (§5) | — |

**Cross-axis convergence**: The "Postgres-everywhere" pattern dominates — Hatchet (durable exec), DBOS (durable exec), better-auth (auth DB), ElectricSQL (sync), Supabase Auth (auth). Operator picking Postgres as the single state backend simplifies all of L1+L3+L6.

**MCP-native convergence**: SEP-1686 (Tasks, FINAL) + the existing MCP auth/resource spec means that within 6-12mo, much of this Layer's primitives become *in-protocol* rather than *bolted-on*. Adopting external durable-exec systems (Temporal/Hatchet) is a stopgap.

**License convergence**: Apache-2 is the dominant license (15+ of catalog candidates); MIT next (better-auth, Yjs, Automerge, Temporal-server, Hatchet, sigstore-as-MIT-tools, Unsloth-core). BSL with grant (Redpanda, Restate) is acceptable for operator's non-public use. AGPL (ZITADEL core) is acceptable for self-hosted-only use. **No SOTA primitive in this layer has a hostile license for operator's single-dev profile.**

---

## §9 — Architecture recommendation (operator-fit-specific)

### §9.1 Recommended adopt set (Tier-A, IMMEDIATE)
For the operator's profile (single-dev, multi-MAX-accounts, Z:-portable Windows, unlimited codex, *hypothetical* multi-tenancy):

| Sublayer | Adopt | Rationale | Install effort |
|---|---|---|---|
| §1 Identity | **better-auth** (when operator builds a user-facing app) | TS-native, multi-session = multi-MAX pattern match, MIT, zero infra | `npm install` |
| §2 Authz | **OpenFGA** | Single Win-native binary, Zanzibar SOTA, Apache-2 | `openfga.exe run` |
| §3 Durable exec | **MCP Tasks SEP-1686** (track), **Hatchet** (deploy now) | SEP-1686 final but SDK adoption lagging; Hatchet bridges with MIT + Postgres-only | docker-compose for Hatchet |
| §4 Fine-tune | **Unsloth** + **LLaMA-Factory** | Win-native installer, 2× speed, 7B@4-bit ≈ 6GB VRAM | `pip` |
| §5 Async msg | **NATS+JetStream** | Win-service single-binary, account multi-tenancy native, Apache-2 | NSSM/Windows service |
| §6 Persistence | **ElectricSQL** | Apache-2, AI-agent-aware Durable Streams, Postgres-only | docker-compose |
| §7 Compliance | **sigstore/cosign** + **in-toto** verify-only | Apache-2 single binary; verify upstream plugins before install | `cosign verify ...` |

**Total deployment**: 1 Postgres + 1 NATS service + 1 OpenFGA binary + 1 ElectricSQL container + 1 Hatchet container. ~4 background processes; all Windows-tolerant (1 binary, 4 containers via Docker Desktop).

### §9.2 Defer set (Tier-B, conditional)
- **ZITADEL** — defer until externally-facing multi-tenant scenario materializes. Heavyweight overlay vs better-auth's library-level approach.
- **Temporal / Inngest** — defer in favor of Hatchet; both are excellent but Hatchet's Postgres-only invariant aligns with operator's emerging Postgres-as-state pattern.
- **Cedar** — defer until OPA proves inadequate for analyzability needs.
- **TRL / torchtune** — defer until LLaMA-Factory's abstractions become limiting.
- **Pulsar / Redpanda** — defer; NATS covers operator scale.
- **Yjs / Automerge** — defer until in-browser collaborative agent UI materializes.

### §9.3 Watch set (Tier-C, monitor)
- **MCP Tasks SEP-1686 SDK adoption** — track TS/Python SDK PRs; pivot from Hatchet → MCP-native when SDKs land + Claude Code MCP client implements task polling.
- **RobustMQ** — Rust AI-era broker; could displace NATS within 12-18mo if it stabilizes.
- **DBOS** — could displace Hatchet if "DB IS the orchestrator" pattern matures; reduces deployment surface by 1 container.
- **Restate** — track Windows binary availability; would re-enter consideration if first-party Windows lands.

### §9.4 Reject set (NOT a fit)
- **Keycloak** — JVM tax + heavyweight; ZITADEL/Logto/better-auth all strictly better at operator scale.
- **Ory Kratos** — multi-tenancy gated behind paid OEL; ZITADEL strictly better.
- **MLX-LM** — Apple-silicon-optimized; operator on Windows-Nvidia.
- **Pulsar** — multi-process deployment surface incompatible with single-dev.
- **Kafka** — Redpanda strictly better for new deployments.
- **liveblocks / durable-objects** — commercial-SaaS-only.
- **Lucia-auth** — DEPRECATED upstream.

### §9.5 Critical dependency between Layer-E primitives
**Postgres is the keystone**: better-auth, Hatchet, ElectricSQL, DBOS, supabase-style auth all want Postgres. Operator should install **one Postgres** at `Z:\claude-sota-installed-state\postgres\` (per CLAUDE.local.md state-outside-repo discipline) and let multiple Layer-E primitives share it via schema isolation.

**NATS is the messaging keystone**: Layer-E inter-component events (auth event → Hatchet workflow → notify ElectricSQL clients) should flow through NATS subjects, not direct HTTP. This composes with operator's Path P (codex foreground+tee) pattern: NATS subjects can replay codex review verdicts to multiple subscribers without re-running.

### §9.6 MCP Tasks SEP-1686 — strategic note
The mission asked for "MCP Tasks SEP-1686 implementations". Status as of 2026-05-16:
- **Spec**: FINAL, merged 2025-11-14, in MCP spec version 2025-11-25 ("experimental").
- **TS SDK**: implementation in progress.
- **Python SDK**: implementation in progress.
- **Java SDK**: PR #755 open since Jan 2026; under active iteration (TaskStore session-isolation + reactor-context refactor in Feb 2026).
- **Claude Code MCP client**: unverified whether it currently supports task-augmented requests. Operator should probe.

The architectural implication: **once SEP-1686 lands across SDKs + clients, the durable-execution layer (§3) becomes in-protocol for MCP-mediated tasks**. Long-running tool calls (e.g., Codex review wrapper, fine-tune kickoff, NATS-fanout-with-aggregation) all gain native call-now/fetch-later. Operator's `/codex:review` and `/codex:rescue` patterns become natural fits.

**Recommendation**: Hatchet now (deploy and use), MCP Tasks SEP-1686 by Q3 2026 (track SDK adoption + Claude Code client capability). Operator should NOT build durable-exec infrastructure that conflicts with SEP-1686 semantics (`taskId` server-generated; session-isolated; tenant-scoped).

---

**Catalog complete.** 7 sublayers · 35+ candidates evaluated · 3 verdicts per sublayer · 1 operator-fit-specific architecture.
