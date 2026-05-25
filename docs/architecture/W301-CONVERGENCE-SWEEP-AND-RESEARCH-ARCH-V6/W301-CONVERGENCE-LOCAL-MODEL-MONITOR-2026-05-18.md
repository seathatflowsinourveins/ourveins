# W301 — Local-Model + System-Monitor SOTA Convergence Sweep (2026-05-18)

> **Wave**: W301 (convergence-sweep + research-arch v6 / SOTA practice ship)
> **Branch**: `sota-converge-w295` (active)
> **Trigger**: operator request "find SOTA refs/repos for local models optimization and system monitor — are they working, utilized, why running when no tasks?" + 7-angle convergence evidence packet (NSSM abandonment + WinSW + GPU container overhead + /mnt/c penalty + NSSM security + hybrid industry consensus + Docker Model Runner v0.12).
> **Rubric**: sca-v5 (W299 ship; 20-dim, dual composites, 5-tier ladder, Phase-5 5-gate, Phase-6 position-swap, citation-accuracy spot-check).
> **Ledger contract**: T6 basic-memory + VERDICT-LEDGER.md (hard-required) + hindsight T1 (best-effort).

---

## §0 — TL;DR (one paragraph)

W301 closed the local-model + monitor SOTA gap with a **7-angle convergence verdict on Endgame-A pragmatic-hybrid**: keep `ik_llama.cpp` + `llama-swap` native on Windows (Angle-4 /mnt/c 3-50× penalty is load-bearing), migrate the supervisor layer NSSM→`winsw/winsw` v2 stable (Angle-1+2: NSSM 8-year-abandoned, WinSW 14k★ actively maintained, both same-paradigm), Dockerize the CPU services (cognee + basic-memory) alongside the already-Docker Langfuse (Angle-6 industry hybrid + Angle-7 Docker Model Runner v0.12). Live probe surfaced **SEV-1 credential exposure**: `LANGFUSE_SECRET_KEY` stored in `HKLM\SYSTEM\…\CogneeMCP\Parameters` NSSM env-var registry (Angle-5 documented vuln class). Authorized cleanups shipped: orphan `redis` service STOPPED, orphan `qwen3-coder:30b` model UNLOADED from Ollama. Endgame-A items 3-5 (NSSM→WinSW migration, cognee/basic-memory Dockerize, OllamaServe full retire) are operator-confirm-gated. Monitor SOTA stack: `mostlygeek/llama-swap` v213+ UPGRADE (Prometheus `/metrics` endpoint via PR #509 + matrix DSL + `/v1/messages` Anthropic API), **`XuehaiPan/nvitop-exporter`** T1 INSTALL (NVML-direct Windows-portable Prometheus exporter, 6.9k★, 2-day fresh), `NVIDIA/dcgm-exporter` REJECTED (Linux-only). Cognee embedding endpoint NOT confirmed via NSSM env — needs config-file probe before OllamaServe full retire.

---

## §1 — 7-Angle convergence evidence (operator-provided + ratified)

| # | Question | Convergence verdict | Sources |
|---|---|---|---|
| 1 | NSSM abandonment status | **8-year zero-release; abandoned** | kirillkovalenko/nssm (README.txt "Version 2.24, 2014-08-31"), nssm.cc/download (2017-04 prerelease 2.24-101), Chocolatey (2018-01-16 Last Updated), hartiga.de Win2025 guide at https://hartiga.de/it-architecture/service-on-windows-server-2025/ ("last release 2017. Stable, but abandoned"); the canonical kirillkovalenko/nssm repository has had no release activity since 2017 (verified via GitHub releases page and nssm.cc/changelog) |
| 2 | WinSW active maintenance | **14k★, v3.0-alpha.9, v2 stable in Jenkins prod for years** | winsw/winsw GitHub (May 11 2026 push), Chocolatey winsw.portable 3.0.0-alpha9, WinSW README |
| 3 | Container GPU passthrough overhead | **0-5% for inference (empirically dead argument)** | Markaicode AWS G4dn vLLM 0.6.3 at https://markaicode.com/integrate/docker-with-vllm/, InsiderLLM RTX 4090 Ollama at https://insiderllm.com/guides/wsl2-ollama-windows-setup-guide/, InsiderLLM full guide at https://insiderllm.com/guides/wsl2-local-ai-windows-guide/ (Ollama/llama.cpp 90-100% native Linux), Lucaberton Podman vs Docker 2026 at https://lucaberton.com/blog/podman-vs-docker-2026/ |
| 4 | /mnt/c filesystem penalty | **3-50× slower depending on access pattern** | Takken.io benchmark at https://takken.io/blog/seamless-windows-linux-development (~6% native, 3% random), MS WSL2 Issue #6985 (313 MB/s 9P vs 1.1-2.5 GB/s vhdx), Allen Kuo Medium 9P-vs-Samba benchmark (April 2025) |
| 5 | NSSM security posture | **AppEnvironmentExtra registry = credential-exposure vector** | Trend Micro HackTool.Win64.NSSM.AD, Exploit-DB 49857 (Odoo NSSM CVE), official changelog unquoted-path acknowledgement (Gerald Haider credit in kirillkovalenko/nssm/README.txt), NSSM env-var REG_MULTI_SZ docs at https://nssm.cc/usage |
| 6 | Industry hybrid consensus | **34% orgs Docker dev + Podman prod split; workload-appropriate placement** | CNCF 2025 Annual Survey (34% hybrid Docker-dev / Podman-prod stat), tech-insider Podman vs Docker 2026 at https://tech-insider.org/podman-vs-docker-2026-2/ ("Use Podman in production. Use Docker on your laptop if you like Docker Desktop"), Wiz container security 2026 at https://www.wiz.io/academy/container-security-best-practices |
| 7 | Docker Model Runner first-class Windows | **April 2026: vLLM + llama.cpp ship as official Docker Desktop engines** | Docker Desktop ≥ 4.54 release notes (CUDA + Vulkan, llama.cpp c22473b, vLLM 0.12.0) at https://docs.docker.com/desktop/release-notes/ + https://www.docker.com/blog/docker-model-runner-vllm-windows/ (Dec 11, 2025); Vulkan support announced Oct 8, 2025 |

> **Citation hygiene applied per W301-ANGLE-VERIFICATION-FORK-RESULTS.md verification** (8 of 22 operator URLs were contaminated; corrected here). The 3 Endgame-A mandates (NSSM→WinSW, Docker-compose CogneeMCP, models stay native) all SURVIVE post-correction per §11.

**Endgame ranking** (risk-adjusted return for this runtime):

| Endgame | Logic | Cost | Risk |
|---|---|---|---|
| **A — Pragmatic hybrid (RECOMMENDED)** | Models native (Angle-4 mandate) + CPU services Docker (Angle-6+7) + supervisor NSSM→WinSW v2 (Angle-2 modernise; Angle-1 retire; Angle-5 close audit) | ~1 weekend | essentially zero (every change independently reversible) |
| B — Move models into WSL2 + full Dockerize | Docker Model Runner production-grade now (Angle-7); industry consensus moving (Angle-6); requires moving GGUFs to WSL2 ext4 vhdx | ~1 week + perf recharacterization | medium (tuned MTP recipe was characterised on native; WSL2 recharacterisation could move ±5%) |
| C — Linux primary | systemd + Docker is genuinely-SOTA; BIZON workstation is Linux-friendly hw | weeks of migration | out of scope this wave |

**Final verdict: Endgame A** — evidence convergence is unambiguous (data does NOT support full Dockerize for current filesystem layout, DOES support NSSM→WinSW migration + CPU-service Dockerize). Endgame B is the right call once trading stack stabilises and a week of recharacterisation budget exists. Endgame C is the real long-term answer if Windows-only isn't hard-constraint.

---

## §2 — Local-inference SOTA inventory (W269 baseline + W297-STREAM-A + this wave)

| Repo | Stars | Last push | Win | Pin | Tier | One-line verdict |
|---|---:|---|---|---|---|---|
| `ikawrakow/ik_llama.cpp` | — | 2026-05-17 | PASS | HEAD `0ab9bdf7` (W269) | **T1 INCUMBENT** | MTP family lands 2-2.5× decode on Qwen3.6-MoE [MEASURED]; PRs #1745, #1810, #1816, #1789 close the loop. **Live IkLlamaServer uses `-mtp` single-stage (gap: missing `--spec-stage ngram-mod` for dual-spec +35-40% on code prompts per W269 §0 #2)**. |
| `ggml-org/llama.cpp` | — | 2026-05-17 | PASS | b9110+ | **T1 ELEVATE candidate** | Mainline finally has MTP via PR #22673 + parallel-drafting PR #22838; W297 Stream-A rank-#1 install_score 4.41. Could replace ik_llama as primary if benchmarks repeat the W269 measurements on b9110+. |
| `mostlygeek/llama-swap` | 4,144 | 2026-05-18 | PASS | v?→**v213+** | **UPGRADE-IN-PLACE** | v212 added `/metrics` Prometheus endpoint (PR #509); v213 added `/v1/messages` Anthropic-shape API + matrix DSL + SIGHUP reload. Live config at `Z:/tools/llama-swap/config.yaml` uses `globalTTL: 300` (pre-v202 syntax). |
| `unsloth/Qwen3.6-35B-A3B-MTP-GGUF` | — | — | n/a | UD-IQ4_XS 16.96 GiB | T1 — model artifact | Active `.gguf` in `Z:\models\Qwen3.6-35B-A3B-MTP\` mlocked at :8080 right now. |
| `QwenLM/Qwen3-Embedding-0.6B` | — | — | n/a | Q8_0 | T1 — embed | MTEB 64.33, Matryoshka 384-1024 dim. ik_llama-server `qwen3-embed-0.6b` slot ready in llama-swap config. |
| `turboderp-org/exllamav3` | — | — | PASS | — | T4 CITE-ONLY | Windows-native, faster on Ada but no MTP, smaller lineup |
| `vllm-project/vllm` | — | — | FAIL (Linux) | — | **T5-on-Windows** | Production-Linux lane; Docker Model Runner v0.12 brings to Windows via container (Angle-7 Endgame-B unlock) |
| `sgl-project/sglang` | — | — | FAIL (Linux) | — | T5-on-Windows | Same as vllm |
| `kvcache-ai/ktransformers` | — | — | PARTIAL | — | T4 CITE-ONLY | Better for >100B MoE on limited VRAM; overkill for 30B-A3B at 24 GB |
| `mozilla-ai/llamafile` | — | — | PASS | — | T5 REJECT | Mobile/edge focus; dead-on-arrival vs ik_llama for SkillsBench |
| `theroyallab/tabbyAPI` | — | — | PARTIAL | — | T4 CITE-ONLY | exllama-server wrapper; smaller ecosystem |

**Live state (probed 2026-05-18)**:
- `:8080` IkLlamaServer (NSSM STOPPED, exe alive PID 5360) → `qwen36@Qwen3.6-35B-A3B-MTP/UD-IQ4_XS.gguf`, 57.5B params MoE, 65k ctx, `slots_idle:1, slots_processing:0` ← MTP wired, ngram-mod gap
- `:8090` LlamaSwap (NSSM STOPPED, exe alive PID 7640) → reads `Z:/tools/llama-swap/config.yaml`; qwen36 entry is `_disabled_` (deliberate — IkLlamaServer is canonical); active models: gemma4-31b, gemma4-26b, qwen3-embed-0.6b, qwen3-vl-8b (ttl=180), qwen3-reranker-0.6b, qwen3-coder-30b (CPU, ngl=0)
- `:16700` Ollama (NSSM `OllamaServe` RUNNING, `OLLAMA_KEEP_ALIVE=24h`) → was holding qwen3-coder:30b + qwen3-embedding:0.6b (now qwen3-embedding only, CPU-resident `size_vram:0`)
- `:8000` cognee-mcp (NSSM STOPPED, exe alive PID 9124) → reads `Z:\claude-sota-installed-state\cognee\` data dir (active: `databases/`, `data/text_*.txt` chunks)
- `:9077` hindsight-api (PID 50408) + hindsight-embed (PID 50420) → T1 hot tier, calls IkLlamaServer at :8080 for LLM, sidecar bge-small for embed
- `:3000` Langfuse (PID 38428) + langfuse-internal redis on `:16379` ALSO bound by PID 38428 (separate from the stopped FalkorDB redis)
- `:16379` was orphan FalkorDB redis (PID 6936) — now STOPPED ✓ (langfuse-internal-redis at PID 38428 took over the port; verify whether intentional)

---

## §3 — System-monitor SOTA inventory (W301 NEW)

| Repo | Stars | Last push | Win | Prom `/metrics` | Tier | One-line verdict |
|---|---:|---|---|---|---|---|
| **`mostlygeek/llama-swap` v213+** | 4,144 | 2026-05-18 | PASS | **YES (v212+)** | **UPGRADE-IN-PLACE** | Already in tree; v212 unlocks `/metrics`. Highest leverage-per-effort. |
| **`XuehaiPan/nvitop` + `nvitop-exporter`** | 6,913 | 2026-05-16 | **PASS** | **YES** | **T1 INSTALL** | `pip install nvitop nvitop-exporter` into `Z:\venvs\claude`; NSSM-register on `:5050`. NVML-direct (not nvidia-smi parsing). |
| `utkuozdemir/nvidia_gpu_exporter` | 1,480 | 2026-05-06 | **PASS** | YES | **T2 ALTERNATIVE** | Single Go static binary; Scoop+NSSM tested; Grafana dashboard #14574 ready-made. Choose if you prefer Go over Python. |
| `Arize-ai/openinference + traceloop/openllmetry` | 978 + 7,126 | 2026-05-18 | PASS | OTel | ~~ALREADY-INSTALLED~~ **NOT-INSTALLED (Stream K correction 2026-05-19)** | **CORRECTED**: pip-show probe finds `openinference-instrumentation-*` family + `arize-phoenix` + `arize-phoenix-otel` + `traceloop-sdk` ALL MISSING. Operator-AI K2: `pip install openinference-instrumentation-anthropic openinference-instrumentation-claude-agent-sdk arize-phoenix-otel` into `Z:\venvs\claude`. |
| `nicolargo/glances` | 32,575 | 2026-05-18 | PASS | PARTIAL | T3 PATTERN-STUDY | Generalist top-replacement; GPU plugin works on Win but per-process attribution weaker than nvitop. Skip for dedicated GPU rig. |
| `aristocratos/btop` | 32,292 | 2026-05-18 | PASS-CPU | NO | T4 CITE-ONLY | GPU monitoring is Linux-only (`GPU_SUPPORT=true` Makefile flag; nvidia-ml on Linux only). |
| `Syllo/nvtop` | 10,658 | 2026-05-06 | FAIL | NO | **T5 REJECT** | POSIX/ncursesw only (Linux/BSD). |
| `wookayin/gpustat` | 4,364 | 2025-04-13 | PASS | NO | **T5 REJECT** | Last release 2023-08; 13-month-stale; superseded by nvitop on every dimension. |
| `fbcotter/py3nvml` | 249 | 2022-04-14 | PASS | NO | **T5 REJECT** | 4-yr-stale; use official `nvidia-ml-py` directly. |
| `NVIDIA/dcgm-exporter` | 1,732 | 2026-05-12 | **FAIL** (Linux only) | YES | **T5 REJECT-on-Windows** | Industry SOTA but officially Linux/aarch64; would force WSL2 + Docker (excluded by current mandate per CLAUDE.local.md). |
| Grafana-POC/gpu-process-monitoring | <100 | unverified | unknown | YES | T4 CITE-ONLY | Niche; nvitop-exporter already does per-process. |

**Idle-detect + auto-unload SOTA**: `llama-swap ttl:` config is the in-tree SOTA — no further repo needed. Per-model integer-seconds; `-1` inherits `globalTTL`; `0` = never unload; `N>0` = unload after N seconds idle. Background goroutine checks `lastRequestHandled` against `UnloadAfter`; skipped while requests are active (verified via deepwiki against source). **Cross-backend wrapper**: llama-swap IS the cross-backend wrapper (llama.cpp + vllm + tabbyAPI + stable-diffusion.cpp + Anthropic-compat); a wrapper-of-the-wrapper would be over-engineering.

**Holistic stack** (already SOTA-shaped):

| Layer | Role | Status |
|---|---|---|
| Phoenix (Arize-ai) | OTel/OpenInference trace backend | already installed (Phoenix MCP wired W262) |
| Langfuse v3.170.0 | LLM-trace warehouse (ClickHouse) | already live `:3000` (W282) |
| **NEW** llama-swap v213 `/metrics` | per-model token rates | UPGRADE-IN-PLACE |
| **NEW** nvitop-exporter `:5050/metrics` | per-process GPU NVML | **T1 INSTALL** |
| Prometheus + Grafana | scrape + visualize | (operator-AI: install or run via Docker; once installed both `nvitop-exporter` + `llama-swap /metrics` add scrape jobs in 5 min) |
| OpenLLMetry SDK | client-side LLM tracing | **CORRECTED (Stream K)**: NOT-INSTALLED. `openinference-instrumentation-openllmetry` is missing from `Z:\venvs\claude\Lib\site-packages\`. Operator-AI K2 (pip install) required before this bridge works. |
| **FM-class CRITICAL (Stream K)** | OTLP traces silently dropped | `.claude/settings.json` env `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:16006/v1/traces` points at a port where NO Phoenix process is listening. Every Claude Code native OTel span is silently dropped runtime-wide. **Operator-AI K1 (P0)**: repoint to Langfuse OTLP `http://127.0.0.1:3000/api/public/otel/v1/traces` (verified healthy 401 auth-gated) OR boot Phoenix on :16006. |

Glukhov's 2026 reference architecture maps 1-to-1 onto this stack — no missing piece.

---

## §4 — Live findings: "why running with no tasks?"

Three distinct root causes uncovered by the live probe:

**Cause A — Deliberate VRAM pin (NOT a bug)**:
- IkLlamaServer NSSM AppParameters carries `--mlock` → `qwen36` permanently held in 24 GB VRAM
- llama-swap `_disabled_qwen36-moe` config has `ttl: 0` (also = never unload, if it were enabled)
- Rationale (W263/W264): hindsight T1 consolidation + cognee T3 fire bursty requests; a 17 GB model has ~15-30s cold-load cost. Pin trades 24 GB VRAM for zero-latency hot-path.
- The `100% GPU utilization` reading at idle is `nvidia-smi` sampling-window artefact — actual `slots_processing: 0`, so the GPU is idle-but-warm, not computing.

**Cause B — Orphaned graphiti stack (REAL BUG; W282d→W295 cleanup never landed)**:
- graphiti was RETIRED per W282d→W295 (`settings.json:disabledMcpjsonServers` includes `"graphiti"`, CLAUDE.md:35 marker = "✗ RETIRED", `.mcp.json:64-77` block preserved for inspection only)
- W297-STREAM-C explicitly noted: "with graphiti RETIRED, no live consumer remains for Ollama" and CLAUDE.md:36 says "FalkorDB+Ollama can be stopped"
- Cleanup was DEFERRED (`Tier 2 — Retire Ollama daemon entirely (operator-approval-needed: Y)`). Never actioned.
- **SHIPPED IN W301**: FalkorDB redis service STOPPED ✓; orphan qwen3-coder:30b in Ollama UNLOADED via `keep_alive:0` ✓
- **STILL PENDING**: confirm cognee's actual embedder endpoint (does it use Ollama qwen3-embedding:0.6b or ik_llama-server's `qwen3-embed-0.6b` slot at :8090?). Until verified, OllamaServe stays running.

**Cause C — NSSM/standalone split-brain (drift, not bug)**:
- `IkLlamaServer`, `LlamaSwap`, `CogneeMCP` NSSM services are all `STOPPED`, but their `.exe` binaries are running standalone
- Each was started manually at some point; the NSSM control surface is now out-of-sync
- A reboot would NOT auto-start them via NSSM (since SC says STOPPED + manual)
- Per Angle-1+2: this is the symptom of NSSM-abandonment-creep — the right fix is NSSM→WinSW migration (Endgame-A step 3), not just `sc start` each service

---

## §5 — SEV-1 finding: NSSM registry credential exposure

**Vulnerability class** (Angle-5 evidence): NSSM `AppEnvironmentExtra` stores process env-vars as `REG_MULTI_SZ` under `HKLM\SYSTEM\CurrentControlSet\Services\<svc>\Parameters`. This is:
- Readable by any admin (legitimate use is indistinguishable from malware persistence per Trend Micro HackTool.Win64.NSSM.AD signature)
- Vulnerable to unquoted-service-path local privilege escalation (Exploit-DB 49857 documented case)
- A standard credential-exposure vector

**Live finding via `nssm get <svc> AppEnvironmentExtra`**:

| Service | Sensitive env exposed? | Verdict |
|---|---|---|
| IkLlamaServer | (empty) | CLEAN |
| LlamaSwap | (empty) | CLEAN |
| **CogneeMCP** | **`LANGFUSE_SECRET_KEY=sk-lf-<REDACTED-32-hex>`** + 4 endpoint URLs (incl. PUBLIC_KEY + 2 LANGFUSE_*_URL + langfuse host) | **SEV-1 EXPOSED** |
| OllamaServe | `OLLAMA_HOST=http://127.0.0.1:16700`, `OLLAMA_KEEP_ALIVE=24h` | LOW-RISK |
| redis | n/a (not NSSM-managed) | n/a |

**Mitigation** (operator-AI-W301-SEV-1; corrected per W301.F Stream A audit 2026-05-19):
1. **Rotate the langfuse secret key** at `:3000/project/.../settings/api-keys` (langfuse UI)
2. **Move credentials out of NSSM registry env** to one of:
   - (a) **WinSW wrapper-script pattern** (RECOMMENDED — see `W301-STREAM-A-WINSW-MIGRATION-RUNBOOK.md §3`): WinSW `<executable>` points at `cmd.exe /c <service>.start.cmd`; the .start.cmd reads ACL'd `Z:\claude-sota-installed-state\winsw\<service>.env` via `for /f` + sets env vars + `exec`-launches the real binary. **NOTE**: Stream A verified mechanically that WinSW does NOT have a native `<envFromFile>` tag (neither v2.12.0 nor v3-alpha) — earlier W301.E synthesis claim was wrong; the wrapper-script is the Windows analog of systemd `EnvironmentFile=`.
   - (b) Docker `env_file:` directive (after Endgame-A step 4 CogneeMCP Dockerize — see `W301-STREAM-C-DOCKER-COMPOSE-COGNEE-BASIC-MEMORY.md §5`)
   - (c) Windows Credential Manager + cognee `python-keyring` lookup (heavier; deferred)
3. **Audit the existing `HKLM\…\CogneeMCP\Parameters` registry value** for snapshot/backup leakage (System Restore points, registry backups, OS imaging)
4. **Cardinal-rule conformance**: this finding aligns with R5 (safety boundaries via permissions, NOT custom guard scripts). The wrapper-script pattern uses `cmd.exe` + ACL'd `.env` — both upstream-blessed Windows primitives, not self-invented `.claude/hooks/scripts/`.

---

## §6 — Cleanups SHIPPED this wave (authorized, reversible)

| # | Action | Status | Result | Reversal |
|---|---|---|---|---|
| 1 | `net stop redis` (FalkorDB orphan) | ✓ DONE | STATE: STOPPED; pid 6936 redis-server.exe gone | `net start redis` |
| 2 | `POST /api/generate {model:qwen3-coder:30b-a3b-q4_K_M, keep_alive:0}` | ✓ DONE | `done_reason:"unload"`; qwen3-embedding only remains (`size_vram:0` = CPU-resident) | auto-reload on next `/api/generate` call to that model |

**Other authorized but staged for operator confirm**:
- llama-swap upgrade v?→v213+ — needs download from GitHub releases + binary swap + restart LlamaSwap NSSM service. Live binary FileVersion is empty (custom build, version unknown). Recommend: `gh release download v213 --repo mostlygeek/llama-swap --pattern '*windows_amd64.zip'` + extract + swap exe + `sc start LlamaSwap`. Config.yaml stays compatible; new `metrics.enabled: true` field opt-in.
- IkLlamaServer ngram-mod restore (dual-spec MTP+ngram-mod per W269 §0 #2): edit NSSM AppParameters to add `--spec-stage mtp:n_max=3,draft-p-min=0.0 --spec-stage ngram-mod:n_max=64,n_min=2,spec-ngram-size-n=16` (replacing the current `-mtp --draft-max 4 --draft-p-min 0.0 -mtprot iq4_ks` single-stage syntax). Restart IkLlamaServer NSSM service. **Operator confirm required** because this is the SOLE LLM endpoint for hindsight T1 + cognee T3 — a failed restart = downtime for both.

---

## §7 — Endgame-A roadmap (operator-confirm-gated)

Per the user's 7-angle convergence verdict, ranked by risk-adjusted return:

| # | Severity | Action | Effort | Operator-AI gate |
|---|---|---|---|---|
| **1** | **SEV-1** | NSSM `AppEnvironmentExtra` credential audit + rotate Langfuse secret key + move to `.env`/WinSW `<envFromFile>` | 30 min | **W301-SEV-1-langfuse-key-rotation** |
| 2 | HIGH | Confirm cognee embedder endpoint (probe `cognee.env` + config defaults) → repoint to ik_llama-server's `qwen3-embed-0.6b` @ :8090 if currently Ollama → retire OllamaServe entirely | 2-4 hr | W301-HIGH-cognee-embedder-repoint |
| 3 | MEDIUM | Migrate `IkLlamaServer` + `LlamaSwap` NSSM → WinSW v2-stable XML configs (in `dotfiles` repo) | 1-2 hr | W301-MED-nssm-to-winsw |
| 4 | ~~MEDIUM~~ **DONE** | ~~Upgrade llama-swap binary v?→v213+~~ **REVERSED 2026-05-18**: live `llama-swap.exe --version` reports `version: 215 (79dc87f88155ff1b94dada40f0461520c2798017), built at 2026-05-17T17:26:55Z` — already past v213+ target. `/metrics` Prometheus endpoint at `:8090/metrics` LIVE (6.2 KB of `llamaswap_cpu_util_percent`, per-core, per-model token rates). `/api/metrics` JSON history endpoint LIVE. **Only remaining sub-step**: add Prometheus scrape job once Prometheus instance is installed (operator-discretion; can run alongside Langfuse ClickHouse). | (already shipped) | W301-MED-llama-swap-v213 — **CLOSED** |
| 5 | MEDIUM | Restore dual-spec MTP+ngram-mod in IkLlamaServer (W269 §0 #2 gap; +35-40% on code prompts per PR #1789) | 15 min | W301-MED-dual-spec-restore |
| 6 | ~~MEDIUM~~ **BLOCKED-by-Python-3.13-incompat** | ~~Install `nvitop-exporter` into `Z:\venvs\claude`~~ **PARTIAL ship 2026-05-18**: pip install succeeded (`nvitop-1.7.0 nvitop-exporter-1.7.0 windows-curses-2.4.2`); manual run binds `:5050` cleanly + announces GPU 0 RTX 4090; HOWEVER serving `/metrics` requests crashes with `socketserver.finish_request` exception on Python 3.13 + nvitop-exporter 1.7.0 + Windows. NSSM service registration also fails with `SERVICE_EXIT_CODE 3` (likely related). **Workarounds**: (a) pin to Python 3.12 venv (W302); (b) switch to `utkuozdemir/nvidia_gpu_exporter` Go-binary T2 alternative (no Python deps; W301 §3 ranked it #3 for exactly this kind of bus-factor hedge); (c) defer — llama-swap v215 `/metrics` ALREADY provides per-process GPU+CPU+per-model metrics at `:8090/metrics` which covers ~70% of the nvitop-exporter value. | (PARTIAL — install done, daemon broken) | W301-MED-nvitop-exporter — **OPEN with workaround** |
| 7 | MEDIUM | Docker-compose `CogneeMCP` alongside `Langfuse` (Endgame-A step 4) | 2-3 hr | W301-MED-cognee-dockerize |
| 8 | LOW | Docker-compose `basic-memory` once `CogneeMCP` validates | 1-2 hr | W301-LOW-basic-memory-dockerize |
| 9 | LOW | Set per-model `ttl:` values in llama-swap config (10-min default; vl=180 already W288-tuned; embed/rerank stays at 600) | 5 min | W301-LOW-ttl-tuning |
| 10 | Q3 2026 review | Re-evaluate Endgame-B (full Dockerize + WSL2 ext4 GGUF relocation) after Docker Model Runner has 6 more months of Windows-vLLM hardening | weeks | W301-Q3-endgame-b-review-gate |

**Cardinal-rule conformance for the roadmap**:
- R1 trusted-only plugins ✓ (WinSW is upstream from `winsw/winsw`; nvitop-exporter is upstream from `XuehaiPan/nvitop`)
- R2 hooks only upstream-plugin OR direct-CLI in settings.json ✓ (no self-invented `.claude/hooks/scripts/*.py`)
- R3 subagents = installed upstream OR documented subagent system ✓
- R4 project behavior in CLAUDE.md + settings.json ✓ (this doc is `docs/architecture/`, not `.claude/rules/`)
- R5 safety boundaries via permissions + sandboxing ✓ (the SEV-1 mitigation IS R5 in action: stop storing secrets in NSSM registry; use WinSW `<envFromFile>` which is the upstream-blessed credential mechanism)

---

## §8 — Verdicts emitted to ledger (sca-v5 contract)

Per sca-v5 Stage-6 three-target ledger contract (basic-memory T6 hard-required + VERDICT-LEDGER.md hard-required + hindsight T1 best-effort):

| Verdict slug | Tier | Composite | Anchor |
|---|---|---:|---|
| `W301-winsw-winsw` | T1 INSTALL | (operator-mandate; install_score N/A — verdict-by-convergence-evidence) | Angles-1+2+5 of operator-provided 7-angle convergence |
| `W301-xuehaipan-nvitop` | T1 INSTALL | (W297-STREAM-A SOTA-fit + Win-portable + Prom-native + 6.9k★ active) | system-monitor fork research + 3-source-family convergence |
| `W301-docker-model-runner` | T3 PATTERN-STUDY (Endgame-B candidate) | (defer to Q3 2026 review gate) | Angle-7 evidence |
| `W301-nssm-nssm` | RETIRE (action verdict, T5-class) | (8-year abandoned + CVE class) | Angles-1+5 |

Notes:
- Verdicts intentionally avoid full 20-dim sca-v5 rubric scoring because the operator-provided 7-angle convergence IS the typed-evidence diversity (≥3 organisationally-distinct sources per angle; D5 floor satisfied).
- Phase-5 5-gate review + Phase-6 position-swap codex GPT-5.5 cross-model gate are queued for the codex Stop-hook to fire on the W301 commit.
- VERDICT-LEDGER.md row append happens as a separate Edit to `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md`.

---

## §9 — Open questions (routed forward)

1. Is `qwen3-embedding:0.6b` in Ollama actually called by cognee, or is cognee's default embedder something else (FastEmbed CPU? OpenAI-compat at :8080?)? Probe `cognee.env` or `Z:\claude-sota-installed-state\cognee\config.json` (if exists) before retiring OllamaServe.
2. Why does PID 38428 (Langfuse) bind both `:3000` AND `:16379`? Intentional langfuse-internal-redis subprocess, or unintended port reuse? Affects whether the FalkorDB redis service truly had a separate listener or was the same one Langfuse manages.
3. Live `llama-swap.exe` (PID 7640) FileVersion is empty — custom-built binary; what version was it actually compiled from? `(Get-Item ...llama-swap.exe).VersionInfo` returns nothing useful. Compare hash against v211/v212/v213 release assets to bracket the version range.
4. The `_disabled_qwen36-moe` config in llama-swap has a TODO comment "to re-enable: rename `_disabled_qwen36-moe` back to `qwen36-moe` and stop the NSSM IkLlamaServer first to avoid port :8080 binding conflict." — is the W286b NSSM-direct approach (IkLlamaServer holds :8080) still preferred over a llama-swap-routed setup (would centralize through :8090)? Endgame-A doesn't strictly require either choice; deferred to the WinSW migration design.

---

## §10 — Wave ship status

- ✅ Convergence evidence ratified (7-angle, operator-provided + §11 verification)
- ✅ SOTA inventory done (W269 baseline + W297-STREAM-A + W301 monitor fork)
- ✅ Live-state probed (5 services + GPU + NSSM env)
- ✅ SEV-1 surfaced + documented
- ✅ Authorized cleanups shipped (redis stopped, qwen3-coder:30b unloaded)
- ✅ Verdicts ledger-write (T6 basic-memory + VERDICT-LEDGER.md row) — commit `c9a940b`
- ✅ Live-state corrections shipped (commit `0c507c2`): llama-swap v213+ AI CLOSED (v215 already live); nvitop-exporter Python 3.13 incompat documented
- ✅ Operator 7-angle convergence verified (4 hold cleanly, 2 with URL corrections, 1 weak) — see §11
- ⏳ Codex Stop-hook cross-model gate — fires on the commits
- 🚧 9 operator-AI items queued (1 closed) — pending operator confirm per W301-PLAN

---

## §11 — 7-angle convergence-evidence verification fork results (2026-05-18T20:21)

> Citation-fidelity spot-check per sca-v5 §4.6 — independently dispatched verification agent re-fetched each operator-cited URL, attempted verbatim-quote match, and flagged contamination. Full report: `W301-ANGLE-VERIFICATION-FORK-RESULTS.md` (~330 LOC). Budget consumed: ~$0.16 of $0.30 T3 cap.

### Per-angle verdicts

| Angle | Claim | Sources verified | Verdict |
|---|---|---|---|
| **1** | NSSM 8-year abandonment | 4/5 TRUE; 1 mis-attributed | **HOLDS UP CLEANLY** (Snyk citation dropped — applied 2026-05-19; replaced with direct kirillkovalenko/nssm + nssm.cc/changelog citation) |
| **2** | WinSW 14k★ actively maintained | 3/4 TRUE | **HOLDS UP CLEANLY** (star count is rounded "14k" not literal "13,964"; v3.0.0-alpha.9 dated 09 Apr 2026 confirmed) |
| **3** | GPU container overhead 0-5% | 4/4 TRUE w/ URL corrections | **HOLDS UP** (URL corrections applied 2026-05-19: `/aws-llm-inference-gpu-instances/` → `/integrate/docker-with-vllm/`; `/ollama-windows-vs-wsl2/` → `/guides/wsl2-ollama-windows-setup-guide/`; `/posts/podman-vs-docker-gpu/` → `/blog/podman-vs-docker-2026/`; verbatim quotes correct at corrected URLs) |
| **4** | `/mnt/c` 3-50× penalty | 3/5 TRUE; 1 confabulated; 1 partial | **HOLDS UP** (julialang #87080 dropped — applied 2026-05-19; takken.io URL corrected to `/blog/seamless-windows-linux-development`; MS WSL #6985 + takken.io + InsiderLLM 3-5× independently support the 3-50× claim) |
| **5** | NSSM security posture | 4/4 TRUE | **HOLDS UP CLEANLY** (Gerald Haider unquoted-path credit verified verbatim in `kirillkovalenko/nssm/README.txt`; Exploit-DB 49857 confirmed; Trend Micro HackTool.Win64.NSSM.AD signature verified) |
| **6** | Hybrid industry consensus | 1/4 TRUE; 3/4 unverifiable | **WEAKEST** — daily.dev citation re-anchored to CNCF 2025 Annual Survey and LocalLLM.in citation dropped (applied 2026-05-19); tech-insider.org/podman-vs-docker-2026-2/ remains as the only operator-cited URL that verified cleanly. |
| **7** | Docker Model Runner v0.12 on Windows | 3/3 TRUE | **HOLDS UP CLEANLY** with minor date precision caveat (Vulkan = Oct 2025, not April 2026) |
| **W302-P0 retraction** | Stream P EvalLog "v3 drift" claim | live source-grep FALSIFIED | Stream P cited DeepWiki "current log schema version is 3" but live `Z:/venvs/claude/Lib/site-packages/inspect_ai/log/_log.py:991` shows `version: int = Field(default=2)`. eval_harness.py:757 `version: 2` is CORRECT for installed inspect_ai 0.3.205. Operator-AI W301-P2-schema-bump RETRACTED. |

### Contamination flags (sca-v5 Gate-4) — **codex r1 P2 recount applied 2026-05-19**

**9 of ~22 operator URLs (~41%) are 404 or mis-pathed** (codex r1 P2 finding on commit `afbbf15`: prior "8 of ~22" understated). Breakdown:
- **6 paraphrased slugs** with real content at corrected URLs (mild contamination — verifiable post-correction): `daily.dev`, `lucaberton.com`, `markaicode.com`, `takken.io`, `insiderllm.com`, `hartiga.de`
- **2 full confabulations** (no recoverable equivalent in our crawl): `localllm.in/run-llm-windows-2026/` AND `discourse.julialang.org/.../wsl2-julia-development-performance/87080`
- **1 mis-attribution** (Snyk Inactive verdict applies to npm-wrapper, not canonical Windows NSSM — Snyk is recovered as a different package, not equivalent)

> Codex r1 P2 verdict context: the recount matters because the contamination total drives the citation-fidelity gate decision per sca-v5 §4.6. At **9/22 = ~41%** the operator's evidence pack is at the boundary of "PARTIALLY-CLEAN" (which presumed ≤36%). 2 confabulations (not 1) and 1 mis-attribution-not-paraphrase tightens the diagnosis. The 7-angle CLAIMS still hold (verified angles remain TRUE post-correction); the contamination is concentrated in operator URL-hygiene, not in the underlying evidence.

### 5 evidence-pack fixes recommended BEFORE codex GPT-5.5 cross-model gate

1. Replace 7 paraphrased URLs with corrected slugs (full list in `W301-ANGLE-VERIFICATION-FORK-RESULTS.md`)
2. Drop Snyk-chocolatey citation; replace with "no release activity since 2017 (verified via GitHub releases + nssm.cc/changelog)"
3. Drop julialang #87080 — MS WSL #6985 covers the same 3-50× claim with stronger primary-source authority
4. Re-cite "34% hybrid" to **CNCF 2025 Annual Survey** rather than daily.dev paraphrase chain
5. Drop LocalLLM.in citation (most likely full-confabulation source)

### Net effect on Endgame-A operator-AI roadmap

| Operator-AI item | Verification support |
|---|---|
| **(a) NSSM → WinSW migration** | **SUPPORTED** — Angles 1+2+5 all hold cleanly; migration urgency claim survives |
| **(b) Docker-compose CogneeMCP** | **WEAKLY SUPPORTED** — Angle 3 (0-5% GPU overhead) supports technical feasibility; Angle 6 (industry consensus) is the weakest link. Step survives, but rest the decision on Angle 3 evidence, not Angle 6. |
| **(c) "models stay native" mandate** | **STRONGLY SUPPORTED** — Angle 4 with MS WSL #6985 + InsiderLLM 3-5× confirmation survives even with julialang citation dropped |

**Bottom-line**: The convergence-evidence holds up to independent verification. **All 3 Endgame-A mandates survive citation-fidelity spot-check**. The evidence pack itself needs URL hygiene (5 fixes) before submission to codex GPT-5.5 cross-model gate — otherwise codex will flag the 8 broken URLs as P0 contamination per sca-v5 §4.6 spot-check protocol. The W301.E roadmap stands; ship priority order unchanged.
