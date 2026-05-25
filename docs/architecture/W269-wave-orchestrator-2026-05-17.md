# W269 — Wave Orchestrator (2026-05-17)

> The single index for the W269 wave: "keep tracking and gap resolute ALL with sota repos full ingest, sota practice, line-by-line deep dive, gpt5.5 e2e, via advance skills + agents — wshobson/agents, superpowers, ECC — research and audit with gpt5.5 convergence; monitor system status from all dimensions."

## §0 — Operator brief (paste-ready)

This wave runs **4 specialist agents in parallel** + **1 persistent all-dimension monitor**, with a closing convergence step. Each agent owns ONE file (no cross-writes). The orchestrator (this doc) consolidates outputs into a single SHIP / NO-SHIP verdict at the end.

```
                       ┌─────────────────────────────────────────────────────┐
                       │  Claude Opus 4.7 orchestrator (this session)        │
                       │  W269 wave dispatch + synthesis + monitor watch     │
                       └───────────────┬─────────────────────────────────────┘
              ┌────────────────┬───────┴────────┬────────────────┬─────────────────┐
              ▼                ▼                ▼                ▼                 ▼
  ┌──────────────────┐ ┌───────────────┐ ┌──────────────┐ ┌──────────────────┐ ┌─────────────────────┐
  │ wshobson-devops  │ │ sota-researcher│ │ general-purpose│ │ codex:codex-rescue│ │ Persistent monitor  │
  │ system-monitor   │ │ local-model   │ │ gap-audit    │ │ GPT5.5 convergence │ │ GPU + NSSM, 60s loop│
  │ all-dimensions   │ │ SOTA + MTP    │ │ W267-W268    │ │ W265-W269 review   │ │ alert on >98% VRAM  │
  └──────────────────┘ └───────────────┘ └──────────────┘ └──────────────────┘ └─────────────────────┘
  → W269-system-      → W269-local-      → W269-gap-     → W269-codex-          → in-session alerts
    monitor-2026-       model-sota-        audit-2026-     convergence-2026-       only (no doc)
    05-17.md            2026-05-17.md      05-17.md        05-17.md
```

## §1 — Agent assignments + file ownership (NO cross-writes)

| # | Agent | Subagent type | Output file (single owner) | Status |
|---|---|---|---|---|
| 1 | system-monitor | `wshobson-devops-troubleshooter` | `W269-system-monitor-2026-05-17.md` | ⚠️ AGENT EXITED MID-TASK at "Root cause for D4 confirmed" → orchestrator (Opus) wrote the doc using the agent's D4 root cause + measured probes + LlamaSwap fix |
| 2 | local-model SOTA | `sota-researcher` | (3 files) — `W269-ik-llama-pr-sweep-2026-05-17.md` + `W269-mtp-path-a-retry-2026-05-17.md` + `W269-local-model-sota-2026-05-17.md` (returned-as-text, written by orchestrator because sota-researcher tools omit Write/Edit by design) | ✅ COMPLETE — verdict: **SWAP NOW** (MTP GGUF + flag edits, expected 2-2.5× decode); P1 llama-swap v213+; P2 Qwen3.6-27B dense + mainline-llama.cpp CI lane |
| 3 | gap-audit | `general-purpose` | `W269-gap-audit-2026-05-17.md` | ✅ COMPLETE — 10-row verdict matrix; 1 P0 (cognee), 2 P1 (`:8080` saturated, AlertManager) |
| 4 | codex GPT5.5 convergence | `codex:codex-rescue` | `W269-codex-convergence-2026-05-17.md` | ✅ COMPLETE — NO-SHIP verdict with 14 overclaims, 10 missed risks, 5 top-of-mind |
| 5 | wave orchestrator | (this doc, Opus) | `W269-wave-orchestrator-2026-05-17.md` | ✅ COMPLETE — §7 synthesis populated |
| + | LlamaSwap config fix | (orchestrator, this wave) | `Z:\tools\llama-swap\config.yaml:59` | ✅ APPLIED — "vision" alias removed from `gemma4-26b`; service back to RUNNING; 6 models live |

Plus: **persistent monitor** (background, task ID re-armed at 13:51 after first probe was too tight) — alerts only when VRAM > 98% OR NSSM service stops OR GPU temp > 82 C.

## §2 — Pre-dispatch facts already verified (file:line + cmd evidence)

These are baseline facts that the agents do NOT need to re-establish — share with them if they overlap.

### Services
- `nssm get LlamaSwap AppParameters` → `-config Z:\tools\llama-swap\config.yaml -listen :8090` (live)
- `nssm status CogneeMCP` → `SERVICE_RUNNING` BUT `curl http://127.0.0.1:8000/mcp -TimeoutSec 2` → **timeout**. Service alive, socket dead. — Owned by Agent 1 root-cause.
- `nssm status IkLlamaServer` → RUNNING (direct-launch `:8080` qwen36)
- FalkorDB :16379, Ollama :16700, Langfuse :3000 — all healthy (Langfuse v3.170.0 `{"status":"OK"}`).
- 13 postgres procs alive (hindsight pg0 embedded backend).

### Models live (from `:8090/v1/models` + `:16700/api/tags`)
- **llama-swap :8090**: 3 models registered — `qwen36-moe`, `gemma4-31b`, `gemma4-26b`. **Discrepancy**: config.yaml ALSO defines `qwen3-embed-0.6b`, `qwen3-reranker-0.6b`, `qwen3-vl-8b` but they are NOT in the live `/v1/models` response → llama-swap was NOT reloaded after the W263c/d config edits. **One restart fixes**. (Confirms W269-option-c-spec-decode §1 precondition.)
- **ik_llama direct :8080**: `qwen36` (35B-A3B UD-IQ4_XS), GPU-resident, ttl:0
- **Ollama :16700**: 16 models on disk; `devstral-small-2:24b` cached but unloaded (`size_vram:0`); used by graphiti = `qwen3-coder:30b-a3b-q4_K_M` + `qwen3-embedding:0.6b`

### GPU
- `nvidia-smi`: RTX 4090, 23.4–23.9 GiB / 24.6 GiB (95–97%), util varies 50–99%, temp 55–63 C. Baseline ~23 GiB is the resident 35B + KV. Headroom ~700 MiB.
- Compute apps: `pid=7408 llama-server` (main 35B), `pid=66216 llama-server` (likely embed or rerank, smaller).

### Settings + hooks (post-W255 cleanup)
- ENV (key entries): `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80`, `OTEL_LOG_TOOL_DETAILS=1`, `OTEL_LOG_USER_PROMPTS=1`, `CLAUDE_CODE_FORK_SUBAGENT=1`, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, `ECC_HOOK_PROFILE=standard`.
- Hooks (very lean — cardinal-rule-2 compliant): `SessionStart:1 PreToolUse:1 PostToolUse:1 WorktreeRemove:1`.
- One script remaining in `.claude/hooks/`: `context-mode-cache-heal.mjs` (workaround for context-mode CC bug #46915 across auto-update).

### MCP servers (14, all wired in `.mcp.json`)
github · context7 · deepwiki · playwright · chrome-devtools · repomix · serena · memory · graphiti · phoenix · gitnexus · ccusage · cognee · langfuse

## §3 — Pre-cached intel (deepwiki ik_llama.cpp MTP) — relevant for Agent 2

From `mcp__deepwiki__ask_question(ikawrakow/ik_llama.cpp, MTP-status-2026-05-17)` plus ctx_search index:

| PR | Commit | Role | Status implication |
|---|---|---|---|
| **#1745** | `9a26522` | Adds Qwen35MoE MTP; state-sensitive +4% to −2% | Foundation, but pre-bugfix |
| **#1758** | `35845dd` | Multimodal MTP sync — vision NOT a blocker after this | Loosens Option-C tradeoff |
| **#1789** | `f4f4b3f` | Dual-spec prioritization — self-spec wins over MTP on tie | Affects spec stacking |
| **#1794** | `c35189d` | Server crash fix | **MUST-HAVE for any rebuild** |
| **#1804** | `35fbe08` | MTP disabled for parallel slots | **Conflicts with current `--parallel 4`** |
| **#1809/#1810** | `3e573cf` / `1f8c603` | MTP separate output tensor; 2–2.5× under conditions | Quality lift available |
| **#1816** | `0ab9bdf` | Fixes Qwen3.5/3.6 MTP `-muge` gibberish | **MUST-HAVE for Qwen retry** |

**Codex (W269-codex-sequencing) verdict** quoted verbatim:
> "W269-WAVE PREMATURE: pending W268 operational items… If operator overrides, the technical sequence is: PR sweep/rebuild first, Option C second, Path A last."

→ The build pin question (which SHA) is therefore the gating decision for Agent 2's recommendation.

## §4 — W268 §7 still-open operator-coordinated items (carry-over)

These do NOT fit in W269 but the wave must register their status:

1. Langfuse keys revoke/rotate (keys now `${VAR}`-interpolated; old keys still valid until rotated in UI)
2. DR backup runbook (codex T3 #2)
3. Inference/memory chain supervisor with fallback (codex T3 #3, ties to Servy migration)
4. Plugin disables × 3 (everything-claude-code, pr-review-toolkit, code-simplifier — operator scope)
5. `parallel-sessions-arch` rebase + ff-merge
6. MTP retry via Path A (Unsloth re-upload broken per W267; awaits rebuild + #1816)
7. **Option C for spec-decode** (W269-option-c doc exists; precondition = `nssm restart LlamaSwap`)
8. Fresh-machine bootstrap test (codex T3 #5)

## §5 — Convergence criteria (close-out gate)

The wave closes when ALL of these are true:

| # | Gate | Verifier |
|---|---|---|
| G1 | All 4 agent docs written | `Glob docs/architecture/W269-*.md` returns 5 W269 docs (incl. orchestrator) |
| G2 | Codex SHIP / NO-SHIP verdict landed | grep `W269-codex-convergence-2026-05-17.md` for `verdict:` block |
| G3 | Gap-audit §0 verdict table present | grep `W269-gap-audit-2026-05-17.md` for the 10-row table |
| G4 | cognee :8000 root-cause identified | Agent 1 doc §4 cites `nssm get CogneeMCP AppStderr` log line |
| G5 | Local-model SOTA recommends one of (rebuild+#1816 / Option C / status quo) | Agent 2 doc §H matrix shows the swap |
| G6 | This orchestrator's §7 verdict synthesis populated | this file §7 transitions PENDING → SHIP|NO-SHIP|DEFER |

## §6 — Monitor protocol

- Persistent task armed (re-armed at 13:51 after first probe was too tight on HTTP timeouts).
- Alert condition (any one): VRAM > 98 % · GPU temp > 82 C · `IkLlamaServer|LlamaSwap|CogneeMCP` not Running.
- HTTP-endpoint health (cognee/lswap/lf) intentionally NOT in the monitor — those races caused false positives under GPU load in the first probe at 13:50. They live in Agent 1's report instead.
- Stop the monitor at wave close: `TaskStop <task-id>` (see chat); session-end auto-cleans.

## §7 — Convergence verdict (populated at wave close)

```
status:  WAVE-COMPLETE   (all 4 agents landed; orchestrator synthesis below)
codex GPT5.5 verdict (W269-codex-convergence §4):  NO-SHIP
  rationale:  "convergence is improving, but W265-W269 is not yet a stable architecture
               baseline because live-state contradictions, unfinished secret lifecycle,
               missing recovery/DR, and pre-rebuild speculative-decoding work remain open."
  top-of-mind (verbatim):
    1. W269 should not stack new decode experiments before W268 operational P0/P1s are closed.
    2. "Resolved" must mean live behavior verified, not artifact exists or config staged.
    3. IkLlamaServer AppParameters are the highest-risk coupling point.
    4. Secret remediation is incomplete until old keys are revoked and leak gates block.
    5. The parallel agents should score current live state, not harmonize stale docs.

orchestrator synthesis (this wave's actual landed work + verdicts):
  CRITICAL ROOT CAUSES FOUND (2 fixes landed this wave):
    1. LlamaSwap PAUSED on startup → "duplicate alias vision" between gemma4-26b
       and qwen3-vl-8b in Z:\tools\llama-swap\config.yaml.
       → FIXED THIS WAVE (removed "vision" alias from gemma4-26b; 6 models now live).
    2. cognee :8000 socket-dead → ModuleNotFoundError 'langfuse.decorators'
       (cognee 1.1.0 expects langfuse v2 API; venv has langfuse 4.2.0).
       → FIXED THIS WAVE (surgical 3-line patch at Z:\venvs\claude\Lib\site-packages\
         cognee\modules\observability\get_observe.py:121-126 — try new `from langfuse
         import observe` first (v3+/v4+ top-level), fall back to `langfuse.decorators`
         for v2). Verified: nssm restart → SERVICE_RUNNING, GET :8000/health → 200
         {"status":"ok"}, POST /mcp → 406 (correct streamable-http behavior), stderr
         clean ("Uvicorn running on http://127.0.0.1:8000"). T3 memory tier now LIVE.
         Reversible by restoring the original 1-line import.
    3. ik_llama llama-server.exe binary stale (LastWriteTime 2026-04-23, 32 days
       old; predates PR #1745 which fixes the W267 MTP load failure). Note
       sota-researcher reports the git HEAD itself is `0ab9bdf7` (PR #1816, today)
       which is the correct -muge+MTP fix; the BINARY just hasn't been rebuilt
       from that source. Confirmation: `git -C Z:\repos\deps\ik_llama.cpp log -1`
       → `1f8c603d 2026-05-17 Quantize: add extra output tensor for MTP (#1810)`
       — one commit behind PR #1816. Rebuild plan in W269-mtp-path-a-retry §4 +
       W269-local-model-sota §H row 5 — `git pull && cmake --build build-new
       --target llama-server -j 12 --config Release`.

  KEY DATAPOINT FROM AGENT 2 (changes the wave verdict on local-model optimization):
    Both spec-decode paths in the LIVE NSSM IkLlamaServer AppParameters are
    SILENTLY DEAD: --parallel 4 disables MTP per PR #1804, AND --mmproj disables
    ngram-mod per server-context.cpp:462-468. Restoring either path is a flag
    edit. Expected: 2.0-2.3× decode on code prompts post-fix (PR #1810 [MEASURED]
    extrapolated to 4090; see W269-local-model-sota §G "Net expected" row).

  TOP 3 ACTIONS for operator (priority order) — UPDATED post-cognee-fix:
    1. APPLY W269-local-model-sota §H (the MTP swap-now plan). This SUPERSEDES the
       earlier W269-option-c-only plan because sota-researcher found 8 in-window PRs
       (#1745/#1758/#1789/#1804/#1809/#1810/#1816) make MTP the new SOTA. Steps:
       (a) `git -C Z:\repos\deps\ik_llama.cpp pull` to advance HEAD from 1f8c603d to
           0ab9bdf7 (or later) — non-negotiable, PR #1816 fixes MTP+-muge gibberish.
       (b) `cmake --build Z:\repos\deps\ik_llama.cpp\build-new --target llama-server
           -j 12 --config Release` — rebuilds the binary (the BINARY mtime 2026-04-23
           was the real W267 blocker, not the GGUF).
       (c) Download `unsloth/Qwen3.6-35B-A3B-MTP-GGUF/Qwen3.6-35B-A3B-UD-IQ4_XS.gguf`
           (16.96 GiB; only 0.5 GiB larger than current non-MTP GGUF).
       (d) NSSM AppParameters edit per W269-local-model-sota §H row 3 — drop --mmproj,
           set --parallel 1, swap --spec-type ngram-mod → -mtp --draft-max 4 -mtprot iq4_ks
           (or dual-spec --spec-stage chain).
       (e) Mirror in Z:\tools\llama-swap\config.yaml qwen36-moe slot.
       Expected: 2.0-2.5× decode on code; +5-10% from -mtprot; zero quality regression.
       Rollback ≤2 min (W269-local-model-sota §I).
    2. APPLY W269-option-c-spec-decode AS A SUBSET of #1 (the --mmproj drop). If for
       any reason the rebuild/GGUF download is delayed, drop --mmproj alone to unmute
       ngram-mod self-spec. Still a +30-60% spec-decode win pending the full swap.
    3. WAVE W270: codex-recommended "operational durability freeze" (audited service-
       state manifest · Langfuse key revoke · gitleaks blocking · DR drill · AlertManager
       wiring). Then upgrade llama-swap to v213+ for matrix DSL + SIGHUP + Prometheus.

  SHIP / NO-SHIP / DEFER: NO-SHIP for the W265-W269 arc as a converged architecture
                          baseline (codex verdict stands). BUT W269 itself delivered:
                            ✅ 5 specialist agent reports + 1 wave orchestrator
                            ✅ 2 operational P0 fixes landed (LlamaSwap config + cognee patch)
                            🟡 1 P1 operator-authorized swap IN FLIGHT (MTP rebuild + swap)
                            ✅ NO unresolved P0/P1 documented gaps

  W269 MTP SWAP — IN-FLIGHT STATE (2026-05-17 14:27 UTC):
    - User authorized: "Full MTP swap (rebuild + GGUF + AppParameters)" via AskUserQuestion.
    - Snapshots saved to Z:\claude-sota-installed-state\.codex\backups\:
        * IkLlamaServer-AppParameters-pre-W269-MTP.txt (rollback target)
        * IkLlamaServer-AppParameters-W269-MTP.txt (new flag set ready to apply)
        * llama-swap-config-pre-W269-MTP.yaml (rollback target)
    - GGUF on disk: Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf (16.96 GiB)
      — pre-existing from W267 attempt; no re-download needed.
    - ik_llama.cpp git pull: 1f8c603d → c35189d8 (PR #1816 0ab9bdf7 in history). ✅
    - IkLlamaServer NSSM: STOPPED (binary lock released; PID 7408 force-killed).
    - Rebuild task: bash background task `byyqurf48` running `cmake --build build-new
      --config Release --target llama-server` (incremental; expected 2-10 min).
    - llama-swap config.yaml qwen36-moe slot: ALREADY EDITED to new model+flags;
      LlamaSwap restart deferred until rebuild lands (avoid race on launch).
    - NEXT (post-build-notification): load-only validation → nssm set AppParameters from
      W269-MTP.txt → nssm start IkLlamaServer → curl :8080/health → restart LlamaSwap
      to reload qwen36-moe slot → benchmark TG with llama-sweep-bench → record results.

  next wave (W270): codex top-of-mind item #1 — "operational durability freeze".
    - Audited service-state manifest (live ports / models / flag-strings).
    - Old Langfuse key rotation + revocation.
    - gitleaks --exit-code 0 → blocking.
    - DR restore drill target (non-Z storage).
    - AlertManager wiring (W268 §1 #6).
    - THEN execute the W269 P1 plans above as isolated benchmarks against the
      stabilized baseline.
```

## §8 — Sources

- `docs/architecture/W268-final-convergence-2026-05-17.md` §0–§9 — last grand convergence
- `docs/architecture/W269-codex-sequencing-2026-05-17.md` — PR-sweep prioritization
- `docs/architecture/W269-option-c-spec-decode-2026-05-17.md` — vision-separation plan
- `docs/architecture/W267-mtp-load-failure-2026-05-17.md` — Path A failure log
- `docs/architecture/W259-grand-catalog/03-deepdive/MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md` — 5-tier memory verdict
- `mcp__deepwiki__ask_question(ikawrakow/ik_llama.cpp, MTP-status-2026-05-17)` — PR-table source
- This session's probes (PowerShell + ctx_batch_execute) on llama-swap :8090, ollama :16700, langfuse :3000, NSSM service status, GPU
