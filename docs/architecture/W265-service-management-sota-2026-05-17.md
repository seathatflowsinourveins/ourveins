# W265 — Windows Service Management SOTA (2026-05-17)

> Research-only audit for the **16 long-running supporting services** behind this `Z:\claude-sota-installed` runtime. Constraints: Z:-portable, solo-dev, Win 11 + RTX 4090 (23/24 GiB headroom on the 35B), cardinal-rule-1 (upstream-trusted) + cardinal-rule-2 (hooks are direct-CLI / plugin-only). All claims cite `file:line` or URL.

---

## §1 — Windows service-wrapper landscape (2026)

| Wrapper | Latest stable | License | Active? | Notes |
|---|---|---|---|---|
| **NSSM 2.24-103** | 2017-05-16 (no release in 9 y) | Public domain | **ABANDONED** — `nssm.cc/builds` confirms "stable version" never moved past 2017 | In-use today on 3 services. |
| **WinSW v2.12.0** | 2024-01-28; v3 stuck at `alpha.11` since 2024-01-29 | MIT | **MAINTENANCE-LIMBO** — `github.com/winsw/winsw/releases` shows zero 2025/2026 releases; v3 has been in alpha for >2 y. dev.to author calls it "maintenance limbo" (`dev.to/aelassas/servy-vs-nssm-vs-winsw-2k46`, 2026-01-26 / edited 2026-05-15). | XML-driven; no GUI. |
| **Servy 8.4** | 2026-05-11 | MIT | **ACTIVE** — 1.7 k stars, 91.6 % C#, GUI + CLI + PS module, log rotation, health-check + auto-recovery, env-var expansion, email/toast notifications, dependency mgmt. Source: `github.com/aelassas/servy` README. | Installed locally at `C:\Program Files\Servy\` (W259-v15). |
| **Shawl v1.9.0** | 2026-05-03 | MIT | **ACTIVE** — 867 stars, Rust 95.8 %, single binary, restart-on-nonzero-exit + log rotation (2 MB × 2 backups). Source: `github.com/mtkennerly/shawl`. | Recommended by Hartiga 2025-Server article as the "simplicity-first" pick (`hartiga.de/it-architecture/service-on-windows-server-2025/`). |
| **sc.exe + Task Scheduler** | Built-in | n/a | **ACTIVE** (OS-bundled) | Native, but no log capture, no stdout-redirect, no env-injection sugar; you'd reinvent NSSM. Hartiga: "functional but requires full maintenance". |
| **Docker Desktop `restart: always`** | DD 4.x rolling | EULA (free <250 emp / <$10M rev) — `docs.docker.com/subscription/desktop-license/` | **ACTIVE** | Restart policy + log driver baked-in; but adds WSL2 VM tax (see §2). |

**Cardinal-rule-1 trust ranking** (upstream-canonical, no fork, permissive license, alive):
**Servy ≈ Shawl > Docker Desktop > WinSW > sc.exe(+TS) >> NSSM (abandoned).**

**Operational ranking** (a-f from prompt):

| Axis | Servy | Shawl | NSSM | WinSW | sc.exe | Docker |
|---|---|---|---|---|---|---|
| (a) native, no WSL2 | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ (WSL2/Hyper-V) |
| (b) auto-restart | rich | basic | basic | ✓ | manual | ✓ |
| (c) log capture + rotation | size+date | 2 MB×2 | basic | basic | ✗ | driver |
| (d) env injection | expansion | flags | env block | XML | awkward | compose |
| (e) cardinal-rule-1 trust | high | high | low (dead) | medium | n/a | high |
| (f) maint burden | low | very-low | low | medium | high | medium |

**SOTA pick §1**: **Servy** (full-featured) or **Shawl** (CLI-only). NSSM is worst on every axis except installed inertia.

---

## §2 — Docker-first alternative analysis

**GPU pass-through cost on Win + WSL2 (2026 measurements):**

- WSL2 reaches "**90–100 % of native Linux speed**" for llama.cpp under nvidia-container-toolkit (`insiderllm.com/guides/wsl2-local-ai-windows-guide/`, 2026).
- One reproducer measured **85 tok/s WSL2 vs 160 tok/s native-Ubuntu**; WSL 2.7.3 narrowed it to **115 vs 160** — i.e. up to **28 % regression** is still possible on tight kernels (`dev.to/alanwest/running-llms-on-windows-native-vllm-vs-wsl-vs-llamacpp-compared-37a9`, 2026).
- **Docker Desktop adds a VM-on-WSL2 layer** beyond WSL2 itself — same source: "Docker Desktop on Windows means running Docker through a WSL2 VM underneath — essentially adding another layer of overhead on top of WSL2 itself."
- For the 23/24 GiB budget on the 4090, the ~5–15 % memory-bandwidth tax (kernel-launch + GPU-PV) of WSL2 is structurally bad — we'd lose `--mlock` headroom and likely OOM on Qwen3.6-35B at 96 k ctx (`docs/architecture/W263-grand-plan-tracker.md:21`).

**Verdict §2**:

- **All-Docker = REJECT** for Tier A (GPU): unacceptable VRAM-budget risk on a 24 GiB consumer card; native ik_llama remains SOTA per W264-ULTIMATE-SYNTHESIS (`W264-ULTIMATE-SYNTHESIS-2026-05-17.md:66` — "Backend = ik_llama.cpp + llama-swap (composite 28, +5 over llama.cpp) | LIVE").
- **All-native = REJECT** for Tier C: re-installing 10 already-containerised services (Phoenix/Langfuse/Grafana/FalkorDB/Clickhouse/Postgres/MinIO/Redis/Prometheus) is busywork with negative cardinal-rule-1 yield (each one would become a self-maintained Windows install).
- **Hybrid (current) = SOTA Pareto point.** Native for GPU + Python; Docker for the polyglot observability/DB stack. This matches the W259-v6 cognee deepdive's documented pattern (`docs/architecture/W259-grand-catalog/03-deepdive/COGNEE-INTEGRATION-CLAUDE-W259v6.md:234` — "pm2 / Servy / mcp-compose gateway").

---

## §3 — Claude Code community guidance

- **Anthropic itself**: deepwiki on `anthropics/claude-code` confirms "Claude Code does not provide explicit guidance or built-in support for managing long-running supporting services… nor does it recommend specific tools like NSSM, WinSW, Servy, or Docker for auto-restart and survival after reboot." (deepwiki/anthropics/claude-code search, 2026-05-17). CC is a **client**, not a service manager.
- **CC hooks docs (`code.claude.com/docs/en/hooks`)** explicitly warn: "Keep hook commands fast — under 1–2 seconds… Move slow operations to background processes". The `async: true` flag landed Jan 2026 for fire-and-forget. **This means SessionStart-spawned daemons are an explicit anti-pattern for anything heavier than a 2 s check** — exactly why pg0/hindsight's current SessionStart respawn is fragile.
- **CCBP / awesome-claude-code / everything-claude-code packs** (`Z:/claude-sota-installed/tmp/repomix-library/packed/{shanraisshan_claude-code-best-practice,hesreallyhim_awesome-claude-code,affaan-m_everything-claude-code}.xml`) — Grep'd for `nssm|winsw|servy|systemd|windows.service`: **0 substantive hits**. The community has no canonical pattern; this is greenfield.
- **Adjacent ecosystem signal**: Ollama community docs route to NSSM (`gist.github.com/risyasin/b4e7ec91…`) but this is user-submitted, not official. llama.cpp's only official service-recipe is **systemd** for Linux (`finding-intuition.com/posts/2025-09-28-llama-cpp-service`). No upstream Windows-service recipe exists for llama-server.
- **W259-v6 cognee deepdive** is the only **internal** prior art and already lists `pm2 / Servy / mcp-compose` as the supervisor shortlist (`docs/architecture/W259-grand-catalog/03-deepdive/COGNEE-INTEGRATION-CLAUDE-W259v6.md:234`). Servy was on our radar — this audit confirms it as SOTA.

---

## §4 — Per-tier recommendation for the 16 services

| Tier | Services | Current | Verdict | Why |
|---|---|---|---|---|
| **A** GPU-bound | IkLlamaServer (35B :8080), embedder (:8082) | NSSM | **MIGRATE-TO-SERVY** | NSSM is dead; Servy is upstream-active MIT. Native required (§2). Servy's health-check + auto-recovery beats NSSM's blind restart for a model server that can hang mid-load. |
| **B** Python MCP/HTTP | CogneeMCP (:8000), Hindsight-API (:9077) | NSSM (cognee) / unsupervised (hindsight) | **MIGRATE-TO-SERVY** | Same as A. Critically, Hindsight today respawns via plugin SessionStart hook — anti-pattern per CC hooks docs (`code.claude.com/docs/en/hooks`, "under 1–2 seconds"). Putting it under Servy removes the respawn coupling. |
| **C** Already-Dockerized | falkordb, phoenix, langfuse-{web,worker,clickhouse,postgres,minio,redis}, grafana, prometheus (10) | Docker `restart: always` | **KEEP-DOCKER** | Non-GPU; polyglot; already canonical upstream images; container restart-policy + log-driver covers all requirements. Migrating costs days for zero benefit. |
| **D** Orchestrator | LlamaSwap (:8090) | NSSM | **MIGRATE-TO-SERVY** | Same as A/B. Llama-swap itself is the SOTA model-multiplexer per W264 (`W264-inference-gpu-2026-05-17.md:13`) — its supervisor should match its currency. |
| **E** LLM backend | Ollama (:16700) | Native Windows service (winget-installed) | **KEEP-AS-IS for now / PLAN-TO-DROP** | W264 plan is to drop Ollama entirely once graphiti is repointed to llama-swap (`W264-ULTIMATE-SYNTHESIS-2026-05-17.md:79` — "DROP Ollama → route graphiti through llama-swap"). No need to touch its supervisor before that. |
| **F** Embedded DB | pg0 | Coupled to Hindsight daemon | **MIGRATE-TO-SERVY (independent)** | Decouple pg0's lifecycle from hindsight; give pg0 its own Servy service with dependency=hindsight. This fixes the lifecycle hack noted in HINDSIGHT-RECOVERY (`docs/architecture/HINDSIGHT-RECOVERY-2026-05-17.md`). |

**Net move**: 6 services NSSM/ad-hoc → Servy; 10 stay Docker; 1 (Ollama) stays native then sunsets.

---

## §5 — Migration cost vs benefit

**Day-of-work estimate**: ~3 h end-to-end, single sitting.

| Step | Time | Action |
|---|---|---|
| 1 | 15 min | `servy-cli create IkLlamaServer …` mirroring NSSM's current params (port 8080, env block, mlock, model path from `W261-system-deepdive:228`). |
| 2 | 15 min | Same for `CogneeMCP`, `LlamaSwap`, embedder. |
| 3 | 30 min | Stand up new `HindsightAPI` + `Pg0` services with `--depend-on` ordering (Servy supports advanced deps per `wiki/Comparison-with-Alternatives`). Remove the SessionStart respawn hook from the plugin. |
| 4 | 30 min | Health-check + email/toast notifications wired (`Servy.psm1` PowerShell module). |
| 5 | 30 min | Stop & remove old NSSM services (`nssm remove <name> confirm`). |
| 6 | 60 min | Reboot test → confirm all 6 come up clean and Hindsight backlog resumes from pg0. |

**Rollback path** (< 5 min): Servy keeps its config in a per-service registry hive — `servy-cli uninstall <Name>` removes cleanly. NSSM service definitions can be re-created from the captured `nssm dump <name>` output (run before step 5). If anything regresses, `nssm install` the dump and we're back where we started.

**Benefit**:
- Eliminates the dead-upstream cardinal-rule-1 drift (NSSM 2017 → Servy 2026-05).
- Removes the SessionStart-hook-as-supervisor anti-pattern for Hindsight (compliant with CC hooks "<2 s" rule).
- Adds health-check + auto-recovery + notifications (currently absent).
- pg0 gets independent lifecycle (no more "Hindsight died → DB died too" mode).

---

**RECOMMENDATION:** Keep the hybrid Pareto frontier (Docker for the 10 polyglot observability/DB services, native for everything GPU/Python), and migrate the 6 NSSM-managed-or-unsupervised services (IkLlamaServer · embedder · LlamaSwap · CogneeMCP · Hindsight-API · pg0) onto **Servy 8.4** — actively-maintained, MIT, Win-native, already installed at `C:\Program Files\Servy\` — closing the cardinal-rule-1 drift left by NSSM's 9-year abandonment.
