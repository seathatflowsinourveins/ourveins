# W268 — Final Beyond-Convergence Synthesis (2026-05-17 evening)

> The "research beyond + proceed with convergence insights" final synthesis. Triggered after 8 waves declared convergence (W262 → W267). This wave catches what the prior waves systematically missed — operational durability, not point-in-time correctness.

## §0 — Codex T3 catch: the ONE thing 8 waves consistently missed

> "The waves optimized the runtime as if 'live right now' were equivalent to 'operable tomorrow.' They repeatedly proved point-in-time health, pins, and wiring, but did not close the boring operational contract: secret lifecycle, backup restore, fresh-machine bootstrap, egress inventory, restart semantics, and degraded modes."  
> — `W268-codex-blind-spots-2026-05-17.md` final paragraph

**Single biggest meta-finding of the whole 8-wave arc**: all the research converged on SOTA design but skipped operational durability.

## §1 — Codex T3 P-class gap matrix

| # | Category | Severity | File:line evidence | Top remediation |
|---|---|---|---|---|
| 1 | Secrets in tracked `.mcp.json` | **P0** | `.mcp.json:96-99,126-129` | **FIXED THIS TURN** — replaced with `${LANGFUSE_*}` interpolation; keys moved to gitignored `CLAUDE.local.md:f2` |
| 2 | DR / backup runbook absent | P1 | observability `docker-compose.yml:223-409` named volumes; no restore drill | Backup pg0 + Hindsight + memory-mcp + Docker volumes to non-Z storage; one restore drill |
| 3 | Supply-chain: HEAD pulls + advisory-only gitleaks | P1 | `.claude/settings.json:54-60,86-93`; gitleaks `--exit-code 0` | Pin SHA in cite-pin discipline; make gitleaks blocking |
| 4 | Egress inventory missing | P1 | `.mcp.json:16-32` external MCPs; npm/uv/gh allow rules | Single doc enumerating endpoints + credentials + data classes |
| 5 | Multi-machine bootstrap unverified | P2 | `CLAUDE.local.md:31` requires Git Bash on C:; user-specific Node paths in `.mcp.json:37,42,105,124` | Fresh-Windows install transcript on a clean VM |
| 6 | Auto-recovery: alerts detect, nothing restarts | P1 | W267 alerts only — no `:8080`/Hindsight/Cognee/pg0 restart policy | Supervise the inference/memory chain (Servy with restart=onfail policy) |
| 7 | Autocompact fidelity untested | P2 | `.claude/settings.json:319` PostCompact priority reinjection deferred | Test that W262-W268 findings survive an actual compact |
| 8 | Hindsight failover absent | P1 | `.claude/settings.json:41-44` hard-routes to local 35B; no fallback | Add fallback chain: local 35B → Ollama qwen3-coder → degraded recall-only |

## §2 — Top 3 critical remediations (codex T3 explicit)

1. **Rotate and externalize secrets** — applied this turn (Langfuse keys ${VAR} interpolated; CLAUDE.local.md holds plaintext). Still TODO: revoke any prior OpenAI key, make gitleaks blocking (drop `--exit-code 0`).
2. **DR runbook + restore drill** — DEFERRED (operator scope; needs a non-Z backup target). Concrete next: `restic` or `kopia` to S3/local-NAS for the 4 named docker volumes + `.pg0` + `.hindsight` + `.mcp-memory`.
3. **Supervised inference/memory chain** — connects to the still-open Servy migration (W265). Operator-coordinated quiet window required.

## §3 — Multi-account routing verdict (W268-multi-account)

**KEEP-PARKED.** Anthropic CC docs explicitly endorse LiteLLM at `code.claude.com/docs/en/llm-gateway`. CLIProxyAPI is the only multi-MAX-account pool candidate (composite 26, ADOPT-WHEN). Trigger: ≥1 measured rate-limit inside a fan-out swarm. Until then, CCBP `CLAUDE_CONFIG_DIR`-per-account alias = zero-install manual switching. Codex GPT-5.5: no gateway needed.

Cardinal-rule-2 note: LiteLLM has a Sept-2025 PyPI credential-stealing malware incident (`BerriAI/litellm#24518`). **Never install via PyPI; pinned-Docker only** when the trigger fires.

## §4 — Eval-harness wire verdict (W268-eval-harness)

**SHIP — 5 ADOPT tools, all already installed**: inspect_ai 0.3.205 (Σ=29) · promptfoo 0.121.11 (Σ=26) · deepeval 4.0.0 (Σ=25) · MTEB (Σ=23) · lm-eval-harness (Σ=22). llama-sweep-bench (Σ=19) for perf-only.

Per-job routing:
- J1/J5 (hindsight extract, graphiti extract) → inspect_ai + LLM-as-judge via codex GPT-5.5
- J2 (consolidation) → deepeval HHEM-2.5 hallucination metric
- J3/J6/J8 (embeddings + reranker) → MTEB retrieval subset
- J7 (35B general) → lm-eval-harness weekly (MMLU-Pro, GPQA, Arena-Hard-v2, SWE-Verified)
- J4 (reranker nDCG@10) → deepeval custom

Storage: quality → Phoenix Datasets (new `eval` project); retrieval/perf → SQLite at `harness/results/eval.db`; Langfuse Datasets secondary for prompt-version A/B.

**7-day install plan**: ~24h operator effort across 10 actions wiring all 8 jobs end-to-end via a new `harness/eval_jobs.py` conductor. Dataset bootstrap: snapshot-freeze (J1/J2/J5) → synthetic seed-prompt (J3/J4/J6) → codex GPT-5.5 LLM-as-judge cross-check (5% sample anchor).

## §5 — Net W262→W268 ledger

| Wave | Headline | Verdict |
|---|---|---|
| W262 | Morning audit → 9-row verdict matrix | SHIP-DECIDED |
| W263 | Per-job model + quant + KV stack | SHIP-APPLIED |
| W264 | 9-layer ULTIMATE-SYNTHESIS | SHIP-DECIDED (PARTIAL-APPLIED per codex W265) |
| W265 | Codex consensus + Langfuse WIRE + service-mgmt + container | SHIP-DECIDED (mixed APPLIED) |
| W266 | 4-agent convergence + doc-corrections | SHIP-DECIDED |
| W267 | VRAM alert + MTP attempt → rollback → Path B safe-W263 | PARTIAL SHIP (MTP failed; KV+Hadamard+fit landed) |
| W268 | Beyond — multi-account + eval-harness + blind-spots | SHIP-PLAN (codex T3 caught 8 operational gaps) |

## §6 — What's APPLIED LIVE right now

```
:8080 — Qwen3.6-35B-A3B UD-IQ4_XS, KV q4_0/q4_0 + Hadamard, --fit, --parallel 4, --mlock
        (NSSM IkLlamaServer, W267 Path B flags)
:8082 — Qwen3-Embedding-4B Q4_K_M GPU (W263 flags applied)
:9077 — Hindsight healthy, openai-compat → :8080/v1, OTEL→Phoenix env queued
:8000 — cognee-mcp NSSM service RUNNING (T3 memory tier)
:16700 — Ollama with qwen3-coder:30b-a3b-q4_K_M (graphiti)
:16379 — FalkorDB (graphiti backing)
:3000 — Langfuse v3.170.0, project 5.17.2026, keys via ${VAR} interpolation (P0 fixed)
:9835 — nvidia-gpu-exporter v1.4.1 + 4 Prometheus alert rules
:14317/:16006 — Phoenix OTel + UI (load-bearing, 1000 spans/hr)
:3001 — Grafana w267-vram-monitor dashboard + Phoenix datasource
:19090 — Prometheus
```

## §7 — What's STILL operator-coordinated

1. Langfuse keys revoke/rotate (now safe in CLAUDE.local.md, but old keys still valid until operator rotates in Langfuse UI)
2. DR backup runbook (codex T3 #2)
3. Inference/memory chain supervisor with fallback (codex T3 #3 + W265 Servy)
4. Plugin disables × 3 (everything-claude-code, pr-review-toolkit, code-simplifier)
5. `parallel-sessions-arch` rebase + ff-merge
6. MTP retry via Path A (drop `--merge-qkv`, use Unsloth MTP GGUF)
7. Option C for spec-decode (separate Qwen3-VL-8B target, drop `--mmproj` from main)
8. Fresh-machine bootstrap test (codex T3 #5)

## §8 — The honest "saturation" statement

**Research saturation is real, but it was on the wrong axis.** All 8 waves drove convergence on SOTA-correctness. None of them drove convergence on operability. Codex T3 caught this in §0. The 8 gaps in §1 are the actual saturation frontier — and they need operator-coordinated execution, not more research.

**Recommendation for the next operator-week**: stop new research, execute the 3 critical remediations (secrets rotation, DR drill, supervised inference chain). The runtime is SHIP-applied for live use; making it SHIP-operable is the remaining work.

## §9 — Sources

- `W268-codex-blind-spots-2026-05-17.md` (codex GPT-5.5 T3)
- `W268-multi-account-routing-2026-05-17.md` (3-axis convergence on gateway layer)
- `W268-eval-harness-wire-2026-05-17.md` (5-ADOPT pipeline + 7-day plan)
- `W267-mtp-load-failure-2026-05-17.md` (Path A failure log + Path B recovery)
- `W267-vram-alert-wiring-2026-05-17.md` (live alerts + Grafana dashboard)
- All W262-W266 historical record (unchanged; corrections in W266-doc-corrections + this doc)
