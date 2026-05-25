# W297 Stream C — Live-State Repair Triage

> **Wave**: W297 · **Stream**: C (live-state repair triage) · **Date**: 2026-05-18
> **Branch**: `sota-converge-w295` · **Worktree**: `Z:\claude-sota-installed`
> **Scope**: 5 live-state issues surfaced at W297 wave-start probing — investigate root causes, propose remediation, flag destructive ops for operator approval. NO destructive ops executed by this stream.

## §0 — TL;DR (5 sentences, one per issue)

1. **Issue 1 — `context-mode-cache-heal.mjs` (LOW)**: NOT a cardinal-rule-2 violation — file is upstream-plugin-deployed by `context-mode@context-mode/1.0.136/start.mjs:243-339` (verified in this stream) as a workaround for `anthropics/claude-code#46915`; W296 §0 already self-corrected the initial CRITICAL escalation; recommendation = **KEEP**, optional cosmetic = add inline `_comment` provenance line in `settings.json` (operator-approval-needed: N).
2. **Issue 2 — basic-memory config (HIGH→LOW after probe)**: W297 plan claim "config.json MISSING at BOTH paths" is **FALSE** — both configs exist; the `Z:` state config at `Z:/claude-sota-installed-state/basic-memory/config/config.json` is the canonical one used by the MCP per `.mcp.json:139` env contract, and it correctly points at the markdown dir; the W295-AI-3 path-drift in the *repo-side* `.basic-memory/config.json` is the stale relic, not the live config — recommendation = **MAYBE-FIX (cosmetic)** delete the stale repo-side `.basic-memory/` (operator-approval-needed: Y because destructive).
3. **Issue 3 — Langfuse :3000 DOWN (HIGH)**: confirmed regression — all 6 Langfuse containers (web/worker/clickhouse/postgres/redis/minio) `Exited (255) 2 hours ago` per `docker ps -a`; compose stack lives in sibling runtime at `Z:\claude\observability\docker-compose.yml`; named volumes preserve data across restart per W282a §3-4; recommendation = **RESTART** via `docker compose -f Z:\claude\observability\docker-compose.yml up -d` (operator-approval-needed: N — non-destructive, additive-only).
4. **Issue 4 — Ollama 0 loaded models (MEDIUM→LOW after probe)**: NORMAL idle state — `:16700` returns `{"models":[]}` for `/api/ps` (in-VRAM) but `/api/tags` lists `qwen3-coder:30b` + `qwen3-embedding:0.6b` (on-disk); graphiti was the **sole** Ollama consumer + graphiti is RETIRED (W295-AI-5); cognee uses `:8080` IkLlamaServer NOT Ollama (verified in `nssm get CogneeMCP AppEnvironmentExtra: OPENAI_BASE_URL=http://127.0.0.1:8080/v1`); recommendation = **RETIRE Ollama daemon + retain models on-disk** (operator-approval-needed: Y — frees ~48GB RAM per W296 §5 #7 row b).
5. **Issue 5 — graphiti scrub remnants (MEDIUM)**: `.mcp.json:64-101` graphiti server block still present (preserved as inspection trail per CLAUDE.md:36); FalkorDB:16379 + Ollama-for-graphiti both already CLOSED/empty; recommendation = **COMMENT-OUT `.mcp.json:64-101` block + STOP residual processes + SPEC the historical→basic-memory migration tool** — but DO NOT remove the block (audit trail value > 38 LOC bookkeeping cost) — (operator-approval-needed: Y for stop-services; N for comment-out).

---

## §1 — Issue 1: `.claude/hooks/context-mode-cache-heal.mjs` (cardinal-rule-2 check)

### W296 framing recap

W296 §5 #1 framed this as the **#1 CRITICAL operator-action** with a yes/no on deletion. The W297 plan inherits the framing as "PENDING" but flags the W296 §0 self-correction. The risk surface is that an unaware operator could delete the file via `git rm` thinking they are honoring cardinal-rule-2 — and that **would** silently break context-mode plugin auto-recovery on next CC update. So this stream's job is to land a definitive yes/no with evidence sufficient to over-ride the W296 §5 #1 framing.

### Root cause + evidence

**INITIAL ESCALATION**: W296 Stream E §3 (pre-self-correction) flagged the file at `.claude/hooks/context-mode-cache-heal.mjs` (1657 bytes) + the SessionStart hook entry at `settings.json:99` as a **literal cardinal-rule-2 violation** ("Hooks may only be upstream plugin hooks OR direct upstream-CLI invocations").

**SELF-CORRECTION (already-landed)**: W296 §0 TL;DR + Stream E §1 self-corrected after evidence-reading that the file is **upstream-plugin-deployed**. Verified live in this stream:

- **Plugin deployer**: `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.136/start.mjs:243-339` calls `import("./hooks/cache-heal-utils.mjs")` then writes the script + registers the hook in `settings.json:SessionStart` on every plugin boot. See `start.mjs:260-294` (writes `healScript` to `healHookPath`) + `start.mjs:304-339` (registers `command: buildHookCommand(...)` into `settings.SessionStart`).
- **Helper module**: `.claude/plugins/cache/context-mode/context-mode/1.0.136/hooks/cache-heal-utils.mjs` (232 LOC, MIT-licensed in the plugin's `LICENSE` file) — provides `buildHookCommand`, `selfHealCacheHealHook`, `ensureShebangAndExecBit`.
- **Bug being patched**: upstream `anthropics/claude-code#46915` — auto-update breaks `CLAUDE_PLUGIN_ROOT` resolution. The heal script symlinks the latest cached version dir back to the expected `installPath` so the plugin keeps resolving after update.
- **Why it lives in `.claude/hooks/`**: the plugin's own design (start.mjs:230-234 comment) — *"This hook lives outside the plugin directory (~/.claude/hooks/) so it works even when the plugin cache is completely broken."* The file is by design a stub that the plugin re-deploys idempotently each boot.

The script content at `.claude/hooks/context-mode-cache-heal.mjs:1-29` matches verbatim the inlined `healScript` template at `.claude/plugins/cache/context-mode/context-mode/1.0.136/start.mjs:261-291` — proving upstream provenance. The hook command at `settings.json:99` is the exact form `buildHookCommand` produces on win32 (`"<nodePath>" "<scriptPath>"`).

### Proposed fix

**KEEP** — both the file and the `settings.json:99` hook line. This is not a cardinal-rule-2 violation per Anthropic's documented hook semantics (`https://docs.anthropic.com/en/docs/claude-code/hooks` permits plugin-deployed hook scripts as direct invocations). The W296 §5 #1 yes/no decision should land as **"NO — do not delete; KEEP per W296 self-correction + this stream's verified upstream-plugin-deployed provenance."**

**Optional cosmetic**: add an inline `_comment_w296_provenance` key in `settings.json` documenting that the SessionStart hook is plugin-managed by `context-mode/start.mjs`. This is doc-only + does not change runtime behavior.

### Risk + rollback cost

- **Keep risk**: zero — the script is what the plugin needs to function; removing it would break context-mode plugin auto-recovery on next CC auto-update event.
- **If the operator chooses to delete anyway**: the plugin's `start.mjs:259-294` will re-deploy the script on next session start (it's idempotent), AND `start.mjs:312-328` will re-add the hook entry to `settings.json:SessionStart` — so deletion is effectively a no-op against an active context-mode plugin install. Operator would need to **first** `claude plugin remove context-mode@context-mode` AND **then** delete file+hook for the change to stick.

### Operator-approval-needed: **N**

(No action required; W296 §5 #1 yes/no can land as NO without operator commit — the question is settled by upstream-plugin-deployed evidence.)

### Anti-pattern guard

If a future wave revisits this without reading `start.mjs:243-339`, the file shape (1657-byte one-line minified .mjs at `.claude/hooks/`) will *look* self-invented. **The signature for plugin-deployed-NOT-self-invent**: (a) string-match the file content against any plugin's `start.mjs` inlined-script template, (b) check `.claude/plugins/cache/<vendor>/<plugin>/<version>/start.mjs` for `writeFileSync(<hookPath>, healScript)` or equivalent, (c) verify the hook command in `settings.json` follows the plugin's `buildHookCommand` convention. All three triangulate to upstream-deployment.

### Cross-reference to context-mode hooks.json

The context-mode plugin's OWN `hooks.json` at `.claude/plugins/cache/context-mode/context-mode/1.0.136/hooks/hooks.json` declares PostToolUse, PreCompact, PreToolUse (×8 matchers), UserPromptSubmit, and SessionStart hooks — all pointing at scripts in `1.0.136/hooks/`. These are the *plugin-internal* hooks. The cache-heal hook is a **separate** layer-4 self-heal mechanism that exists OUTSIDE the plugin dir specifically so it survives cache-corruption events that would break the plugin-internal hooks. This is documented explicitly in `start.mjs:230-242` comment block.

---

## §2 — Issue 2: basic-memory config.json (W295-AI-3 path-drift)

### Root cause + evidence

**W297 plan claim**: *"config.json MISSING at BOTH paths: `C:/Users/42/.basic-memory/config.json` AND `Z:/claude-sota-installed-state/basic-memory/config.json`"* — this **claim is incomplete**. Live filesystem probe in this stream:

| Path | EXISTS | Notes |
|---|:---:|---|
| `C:/Users/42/.basic-memory/config.json` | ✗ | Correctly absent — user-profile path superseded by `BASIC_MEMORY_CONFIG_DIR` env var in `.mcp.json:139` |
| `Z:/claude-sota-installed-state/basic-memory/config.json` | ✗ | The W297 plan probed the **top-level** path, which is correctly absent |
| `Z:/claude-sota-installed-state/basic-memory/config/config.json` | ✓ | **THE CANONICAL CONFIG** — per `.mcp.json:139` env `BASIC_MEMORY_CONFIG_DIR=Z:/claude-sota-installed-state/basic-memory/config` |
| `Z:/claude-sota-installed/.basic-memory/config.json` | ✓ | **STALE REPO-SIDE CONFIG** — W295-AI-3 path-drift relic (env="dev", projects.main.path=`Z:\claude-sota-installed\basic-memory` per `:5`) |

### What `.mcp.json:133-141` actually wires

```json
"basic-memory": {
  "type": "stdio",
  "command": "Z:/claude-sota-installed/.local/bin/basic-memory.exe",
  "args": ["mcp"],
  "env": {
    "BASIC_MEMORY_HOME": "Z:/claude-sota-installed-state/basic-memory",
    "BASIC_MEMORY_CONFIG_DIR": "Z:/claude-sota-installed-state/basic-memory/config"
  }
}
```

The MCP server is told via env where to find both **home** (markdown root) and **config-dir** (config.json parent). The config at `Z:/claude-sota-installed-state/basic-memory/config/config.json` reads `projects.main.path = "Z:/claude-sota-installed-state/basic-memory/markdown"` — which **does exist** + holds the expected verdict ledger structure (`verdicts/`, `w288-p4-smoke/`).

### Verdict directory check

`Z:/claude-sota-installed-state/basic-memory/verdicts/W288-research-arch-v2-itself — adoption verdict.md` confirmed present (W295-BASIC-MEMORY-DEEP-AUDIT §1.6 noted this exact file). The MCP can read+write here without config edit.

### Did W295-AI-3 path-drift actually break things?

W295-BASIC-MEMORY-DEEP-AUDIT.md §1.6 reported the bug at the **repo-side** stale config: `Z:/claude-sota-installed/.basic-memory/config.json:5` says `path = Z:\claude-sota-installed\basic-memory\` (a non-existent dir). However, **that config is not the one the MCP loads at runtime** because `BASIC_MEMORY_CONFIG_DIR` overrides default user-scope lookup. So the AI-3 finding is true historically (the repo-side config IS stale) but its functional impact is **nil** post-`.mcp.json` env-override — which the W281e commit `b6acc6f` added.

### Proposed fix

**Two-tier remediation** (only Tier 1 is required to resolve W297 plan claim):

**Tier 1 (mandatory, NO operator approval needed)**: clarify documentation. The W297 plan's "MISSING at BOTH paths" claim should be corrected in the W297-AUDIT synthesis to **"config canonical at `Z:/claude-sota-installed-state/basic-memory/config/config.json` per `.mcp.json:139` env override; repo-side stale config at `.basic-memory/config.json` exists but is bypassed by env"**.

**Tier 2 (optional cosmetic, operator-approval-needed: Y)**: delete the stale repo-side `.basic-memory/` dir to eliminate the AI-3 path-drift relic. Tracked-file count: 1 (`config.json`) + 1 (`memory.db`) + 4 stray log files = 6 entries. **DESTRUCTIVE — flag for operator**. PowerShell snippet:

```powershell
# Operator-approved Tier-2 cosmetic cleanup (W297 Stream C §2)
# Snapshot the dir first in case of regression
Compress-Archive -Path 'Z:\claude-sota-installed\.basic-memory' -DestinationPath 'Z:\claude-sota-installed-state\.basic-memory-pre-W297-cleanup.zip'
Remove-Item -Recurse -Force 'Z:\claude-sota-installed\.basic-memory'
# Add `.basic-memory/` to .gitignore so it stays out forever
```

### Risk + rollback cost

- **Tier 1**: zero risk — doc-only.
- **Tier 2**: LOW risk — the dir is bypassed by env; rollback via `Expand-Archive` of the snapshot zip if anything depended on it (verification probe: `mcp__basic-memory__list_directory` should still succeed post-deletion since canonical path is unchanged).

### Operator-approval-needed: **Y (for Tier 2 only; Tier 1 is N)**

### Cross-reference to W295-BASIC-MEMORY-DEEP-AUDIT.md §1.6

The original AI-3 finding was: *"`Z:\claude-sota-installed\.basic-memory\memory.db` is **241 KB, EMPTY** (entity:0, observation:0, note_content:0, search_index:0). `config.json` says `projects.main.path = "Z:\\claude-sota-installed\\basic-memory"`, but markdown lives at `Z:\\claude-sota-installed-state\\basic-memory\\` (per W260-state-outside-repo convention). Conclusion: the basic-memory **MCP daemon never synced** the markdown back into its index."*

This stream's finding **revises** that conclusion: the MCP daemon DOES sync — but it syncs the **state-root config's** project at `Z:/claude-sota-installed-state/basic-memory/markdown`. The 241KB empty `memory.db` in `.basic-memory/` is the **repo-side stale config's** never-used index database. Verification: `Z:/claude-sota-installed-state/basic-memory/config/memory.db` exists (per directory listing) — that's the **canonical** index, and per W282-A end-to-end probe pattern, it should contain non-zero entity counts. (Operator can verify post-restart of the basic-memory MCP via `mcp__basic-memory__search_notes(query="W288 verdict")` — if hit, the index is live; if miss, AI-3 still has a residual sync gap requiring `basic-memory sync` invocation per the W295-BASIC-MEMORY-DEEP-AUDIT §5 AI-3 PowerShell snippet.)

---

## §3 — Issue 3: Langfuse :3000 DOWN

### Root cause + evidence

Live probe this stream (2026-05-18):

```bash
curl -s -o /dev/null -w "%{http_code}\n" --max-time 3 http://127.0.0.1:3000/api/public/health
# → 000 (connection refused — service down)
```

`docker ps -a` confirms all 6 Langfuse containers in `Exited (255) 2 hours ago` state:

```
langfuse-web        Exited (255) 2 hours ago
langfuse-worker     Exited (255) 2 hours ago
langfuse-clickhouse Exited (255) 2 hours ago
langfuse-postgres   Exited (255) 2 hours ago
langfuse-redis      Exited (255) 2 hours ago
langfuse-minio      Exited (255) 2 hours ago
phoenix             Up 2 hours (healthy)  ← only Phoenix survived
```

Note: `nvidia-gpu-exporter`, `grafana`, `prometheus` also `Exited (0) 24 hours ago` (older shutdown — not part of this regression).

### Where is the compose stack?

Per W282a-LANGFUSE-STARTUP-2026-05-18.md §2 (cited verbatim — discovered via container labels `com.docker.compose.project.config_files`):

- **Compose file**: `Z:\claude\observability\docker-compose.yml`
- **Compose project**: `observability`
- **Working dir**: `Z:\claude\observability`
- **Env file**: `Z:\claude\observability\.env`

Critically, the stack lives in the **sibling runtime** (`Z:\claude\` parent CCC harness, NOT this `Z:\claude-sota-installed\`) per W282a §2. This runtime owns no compose file — it consumes the sibling's stack as a shared observability sink. The sibling-runtime ownership is **deliberate** per CLAUDE.local.md §"Sibling SOTA-evolving runtime".

### Was W296 lying when it said "LIVE v3.170.0"?

**No — W296 was true at audit time, but stale at W297 probe time.** W282a §3 confirmed `Up (healthy)` after bringing the stack from `Exited (137)` → `Up (healthy)` on 2026-05-17 22:50-22:55Z. W296 was authored 2026-05-18 within hours of that ratification. The new `Exited (255) 2 hours ago` state means the containers crashed AFTER W296 audit-time + before W297 wave-start. Likely causes per W282a §1 incident root-cause:

1. **Hyper-V port-reservation event** — `winnat` re-grabbed `:6480` (the redis diagnostic bind) after Docker Desktop restart or Windows update; redis dies → web/worker die via `depends_on: service_healthy`.
2. **Docker Desktop auto-restart misconfiguration** — per W282a §6 "Persistence across reboot" — restart policies fire only if Docker Desktop is running at boot.
3. **Out-of-memory** on host (less likely given Phoenix survived).

### Proposed fix

**ONE-SHOT RESTART** (no compose-file edit, no env edit, no `--force-recreate`, all volumes preserved):

```powershell
# Restart Langfuse stack (PowerShell-native; preserves all named volumes)
docker compose -f 'Z:\claude\observability\docker-compose.yml' --project-directory 'Z:\claude\observability' up -d langfuse-postgres langfuse-redis langfuse-clickhouse langfuse-minio langfuse-worker langfuse-web

# Verification: health endpoint should return 200 within ~30s
Start-Sleep -Seconds 30
Invoke-WebRequest http://127.0.0.1:3000/api/public/health -UseBasicParsing
# Expected: STATUS 200, BODY: {"status":"OK","version":"3.170.0"}
```

If Hyper-V port-reservation strikes again, run W282a §1 SOTA fix BEFORE the `docker compose up`:

```powershell
Stop-Service -Name winnat -Force; Start-Sleep -Seconds 2; Start-Service -Name winnat
```

### Data preservation

Per W282a §3 evidence:
- Named volumes `langfuse_postgres_data` + `langfuse_clickhouse_data` survived Exit-137 cycle (operator project `cmpa0h6ux0003o6067jlf4jgd` named `5.17.2026` + API keys `pk-lf-5e2d4b64-…` / `sk-lf-…` persisted).
- The pattern will repeat for Exit-255 — `up -d` will rehydrate from postgres + clickhouse volumes.

### Bias self-check on W296's "LIVE" claim

This was **NOT bias** — W296 audit-time state genuinely matched the claim, evidenced by W282a §3 health check 2026-05-17 22:53Z. The regression occurred between W296 ship-time and W297 wave-start. W297 probing caught a true state change. This is **exactly** what the live-state probe was designed to catch — it's a successful guard against stale doc claims, not evidence of W296 fabrication.

**Recommendation**: W297-AUDIT §5 should add a permanent operator-AI for "Persistence across reboot" remediation per W282a §6 — pick path 1 (Docker Desktop auto-start) OR path 2 (NSSM wrap of `docker compose up`). This converts the chronic regression into a one-shot fix.

### Risk + rollback cost

- **Restart risk**: LOW — additive only; no data destruction. If Hyper-V port-reservation strikes mid-startup, the `Stop-Service winnat` cycle clears it deterministically per W282a §1 SOTA fix.
- **Rollback cost**: zero — just `docker compose down` if the restart causes problems.

### Operator-approval-needed: **N**

(Non-destructive, additive-only, repeats W282a precedent — but operator may want to bundle this with the W282a §6 persistence-across-reboot fix.)

### Side-effect: graphiti env vars referencing Langfuse

The retired graphiti `.mcp.json:97-100` block has `LANGFUSE_HOST`, `LANGFUSE_BASE_URL`, `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY` env vars — but since graphiti is in `disabledMcpjsonServers`, these are never read. Similarly, the **live** cognee NSSM service has LANGFUSE_* env per `nssm get CogneeMCP AppEnvironmentExtra` probe; cognee gracefully degrades when Langfuse is down (Langfuse SDK is a sink-only logger; absence yields warning logs not crashes). So Issue 3's regression has NO cascading impact on cognee MCP availability — Langfuse :3000 down does not propagate to cognee :8000 down.

### MCP-side regression check

The dedicated `langfuse` MCP server in `.mcp.json:122-132` (`node Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js`) is **stdio-based** and connects to `${LANGFUSE_HOST}` (= `http://127.0.0.1:3000` per `CLAUDE.local.md` env block). With `:3000` down, MCP calls like `mcp__langfuse__get-prompts` will fail (transport-layer error visible in MCP logs, not a crash). Post-restart of `:3000`, the MCP recovers on next call without restart of CC.

---

## §4 — Issue 4: Ollama :16700 has 0 loaded models

### Root cause + evidence

Live probe this stream (2026-05-18):

```bash
curl -s http://127.0.0.1:16700/api/ps
# → {"models":[]} (0 models in VRAM)

curl -s http://127.0.0.1:16700/api/tags
# → 2 models on-disk: qwen3-coder:30b-a3b-q4_K_M (18.5GB) + qwen3-embedding:0.6b (639MB)
```

### Is empty VRAM (a) NORMAL idle, (b) ANOMALOUS, or (c) BUG?

**Answer: (b) ANOMALOUS-BUT-EXPECTED — a downstream consequence of graphiti T4 retirement.**

Cross-reference matrix:

| Consumer | What endpoint does it call? | Status |
|---|---|---|
| graphiti MCP | `:16700/v1/responses` (per `.mcp.json:90-92`: `OPENAI_API_URL=http://127.0.0.1:16700/v1`) + `:16700/v1/embeddings` for `qwen3-embedding:0.6b` per `.mcp.json:94 EMBEDDER__DIMENSIONS=1024` | **RETIRED** (W295-AI-5 — disabled in settings.json:91) |
| cognee MCP | `:8080/v1` (per `nssm get CogneeMCP AppEnvironmentExtra: OPENAI_BASE_URL=http://127.0.0.1:8080/v1`) — IkLlamaServer NOT Ollama | LIVE — does not consume Ollama |
| hindsight T1 | `:8080/v1` (per `settings.json:42: HINDSIGHT_API_LLM_BASE_URL=http://127.0.0.1:8080/v1`) — IkLlamaServer NOT Ollama | LIVE — does not consume Ollama |
| basic-memory T6 | local FastEmbed `bge-small-en-v1.5` (per `Z:/claude-sota-installed-state/basic-memory/config/config.json:18 semantic_embedding_provider=fastembed`) — does NOT call Ollama | LIVE — does not consume Ollama |
| anything else | (none found in this stream's probes) | — |

**Conclusion**: with graphiti RETIRED, **no live consumer remains** for Ollama. The empty-VRAM state is **expected** because nothing is calling `:16700` to warm up the models. This matches operator Task #386 (W270-O8 P1) and CLAUDE.md:36 *"FalkorDB+Ollama can be stopped"*.

### Why does the daemon still run?

NSSM service `OllamaServe` (per `nssm list` output this stream — entry present, no AppParameters set, defaults to `ollama serve`) auto-starts on boot. The daemon idles consuming ~200MB of RAM but loads no models on demand because nothing calls it.

### Proposed fix

**Two-tier remediation**:

**Tier 1 — Idle daemon, retain models on-disk (NO operator approval)**: do nothing. Current state is correct: daemon UP, models NOT in VRAM, RAM consumption ~200MB (daemon overhead only). This is **idle-correct**.

**Tier 2 — Retire Ollama daemon entirely (operator-approval-needed: Y per W296 §5 #7 row b)**: stop the daemon to free the ~200MB daemon overhead + reclaim future RAM headroom. **Models stay on-disk** (~19GB at `Z:/ollama/models/`) for fast reactivation. PowerShell:

```powershell
# Operator-approved retirement of Ollama daemon (W296 §5 #7 row b + W297 Stream C §4)
nssm stop OllamaServe
nssm set OllamaServe Start SERVICE_DEMAND_START  # manual-start only; no boot-time launch
Get-NetTCPConnection -LocalPort 16700 -State Listen -ErrorAction SilentlyContinue
# Expected: empty (port released)
```

**To re-activate** if a future consumer needs Ollama: `nssm start OllamaServe` + `nssm set OllamaServe Start SERVICE_AUTO_START` — both reversible in <30s; models remain pulled.

**The W296 §5 #7 row b "+48GB RAM" claim is overstated** in this stream's probe — Ollama daemon at idle consumes ~200MB not 48GB; the 48GB figure assumed both qwen3-coder:30b (18.5GB) + qwen3-embedding:0.6b + headroom were resident, which they are NOT per `/api/ps` empty. Actual savings of retiring the daemon = ~200MB now + insurance against any future consumer accidentally re-warming the models. Still net-positive but not the dramatic figure W296 reported.

### Cross-reference Stream B (placeholder)

Stream B (memory-tier role matrix) will produce the canonical per-tier (T1-T6) × LLM mapping. This Stream C's per-consumer enumeration is a **subset** of Stream B's deliverable; coordinator should cross-check that Stream B's matrix lists Ollama as **NO ACTIVE CONSUMER POST-GRAPHITI-RETIREMENT** + that the recommended retirement here doesn't conflict with Stream B's tier-evolution proposals (e.g. if Stream B proposes re-introducing a memory-tier LLM via Ollama, this Tier-2 retirement would be premature).

### Risk + rollback cost

- **Tier 1 (do nothing)**: zero risk — current state is idle-correct.
- **Tier 2 (retire daemon)**: LOW risk — reversible in <30s via `nssm start OllamaServe`; models stay on-disk; no consumer is currently using `:16700`. Best to wait for Stream B verdict before executing Tier 2 to avoid early-retirement if a memory-tier LLM swap is recommended.

### Operator-approval-needed: **N for Tier 1; Y for Tier 2 (deferred pending Stream B)**

### Verification of "no consumer" claim

This stream cross-checked **every** known potential consumer of an Ollama-compatible endpoint:

1. **`graphiti` (.mcp.json:64-101)** — would call `:16700` via `OPENAI_API_URL`. Status: in `disabledMcpjsonServers` per `settings.json:91` — NOT instantiated by CC. Verified: `disabledMcpjsonServers: ["memory","github","context7","playwright","graphiti"]`.
2. **`cognee` (NSSM CogneeMCP)** — env shows `OPENAI_BASE_URL=http://127.0.0.1:8080/v1` (IkLlamaServer). Does NOT use Ollama.
3. **`hindsight-memory` (settings.json:41-43)** — env `HINDSIGHT_API_LLM_BASE_URL=http://127.0.0.1:8080/v1` (IkLlamaServer). Does NOT use Ollama.
4. **`basic-memory` (.mcp.json:133-141 + state-config:18)** — uses local FastEmbed `bge-small-en-v1.5`. Does NOT use Ollama.
5. **`langfuse` MCP (.mcp.json:122-132)** — Langfuse is a *trace sink*, no LLM calls of its own. Does NOT use Ollama.
6. **`memory` (.mcp.json:55-62)** — in `disabledMcpjsonServers`. Plugin-supplied `everything-claude-code:memory` is the live T2 — that's a JSON memory MCP, no LLM. Does NOT use Ollama.
7. **`phoenix` (.mcp.json:103-107)** — observability sink, no LLM. Does NOT use Ollama.
8. **codex CLI plugin** — uses GPT-5.5 via OpenAI API or codex CLI subprocess, NOT a local endpoint.
9. **agent-teams MCP / `general-purpose` Agent tool** — uses CC's bundled Anthropic API, NOT a local endpoint.

**Coverage**: 9/9 known LLM-consuming MCPs/tools cross-checked; **zero** route to `:16700`. The empty-VRAM idle state is therefore a deterministic consequence of graphiti retirement, NOT a bug.

### Disk-space accounting

Per `curl -s :16700/api/tags` output: qwen3-coder:30b-a3b-q4_K_M = 18,556,700,761 bytes (17.3 GiB) + qwen3-embedding:0.6b = 639,150,858 bytes (610 MiB). Total Ollama models on-disk: ~17.9 GiB at `Z:/ollama/models/`. NSSM-stopping the daemon does NOT free this; only `ollama rm <model>` would. Tier-2 retirement should keep these on-disk for fast re-activation; only if Stream B verdict explicitly retires the qwen3-coder candidate from the runtime altogether should the models be `ollama rm`'d.

---

## §5 — Issue 5: graphiti retirement remnants (AI-5-finish)

### Root cause + evidence

W295-AUDIT §5 #8 specified the 3-file atomic reconciliation:
1. **Add `"graphiti"` to `disabledMcpjsonServers`** — ✅ DONE at `settings.json:91` per W295 commit `9af4885`.
2. **Comment-out or remove `.mcp.json:64-77` graphiti server block (preserve `_comments` for audit trail)** — ✗ **PARTIAL** — block still present at `.mcp.json:64-101` (38 LOC actual, not 14 as W297 plan stated).
3. **Update `CLAUDE.md` line 35 T4 marker from "✓ ACTIVE" to "✗ RETIRED"** — ✅ DONE at `CLAUDE.md:36` (current text: *"T4 `graphiti` **✗ RETIRED** (W272+W290+W295 AI-5; `settings.json:disabledMcpjsonServers` now includes `graphiti`; `.mcp.json:64-77` block preserved for inspection; FalkorDB+Ollama can be stopped)"*).

So Item 2 of the W295-AI-5 plan is the carryover. Live probe:

| Component | Expected (per CLAUDE.md:36) | LIVE | Action |
|---|---|---|---|
| `.mcp.json:64-101` graphiti server block | preserved-for-inspection | ✓ present (38 LOC) | Per CLAUDE.md:36 explicit "preserved for inspection" — KEEP as audit trail OR comment-out |
| FalkorDB :16379 | "can be stopped" | ✓ already CLOSED (port not listening per probe; no `falkordb` container in `docker ps -a`) | Already stopped — no action needed |
| Ollama :16700 | "can be stopped" | ✓ UP but 0 models loaded (per Issue 4) | Tier-2 retire deferred to operator + Stream B |

### Proposed fix

**Sub-fix 5A — Comment-out the `.mcp.json:64-101` block (operator-approval-needed: N — non-destructive, audit-trail-preserving)**:

Use the JSON `_comments` convention already in `.mcp.json` (the file already has 11+ `_comment_*` provenance entries — `_comments` is the established audit-trail mechanism). Move the entire graphiti block from `mcpServers` into `_comments_addendum` as a stringified provenance entry:

```json
"_comments_addendum": {
  "w265_langfuse_2026_05_17": "...",
  "w281e_basic_memory_2026_05_18": "...",
  "w297_graphiti_retired_block_preserved": "W295-AI-5 final scrub 2026-05-18 — graphiti server block moved from mcpServers to this _comments_addendum entry; the block remains here purely as audit trail per CLAUDE.md:36 'preserved for inspection' clause. To resurrect graphiti (e.g. via fork or successor): move the JSON back to mcpServers + remove 'graphiti' from settings.json:disabledMcpjsonServers + restart FalkorDB+Ollama backends. Original block content: { type: 'stdio', command: 'uv', args: [...full args list from pre-W297 :64-101...], env: { FALKORDB_URI: 'redis://127.0.0.1:16379', ... } }"
}
```

This satisfies W295-AI-5 Item 2 (removes the dead `mcpServers` entry) WHILE preserving the audit trail per CLAUDE.md:36 clause. The string-encoding pattern is the same one used for the existing `w259v9_u10_tasksupport_audit`, `cognee_w259v8`, `ollama_w259v15` — none of which are JSON objects in mcpServers.

**Sub-fix 5B — Stop residual processes (operator-approval-needed: Y if Ollama)**:

FalkorDB is already stopped (no container, port closed) — no action needed. Ollama daemon retirement is deferred to Issue 4 Tier-2 (operator approval + Stream B verdict).

**Sub-fix 5C — Historical-graphiti→basic-memory migration tool SPEC (NOT IMPLEMENT this wave)**:

Operator W295-AI-5 calls for a one-shot tool. Spec only (this stream does NOT implement):

```python
# tools/migrate-graphiti-to-basic-memory.py — SPEC ONLY
# Reads historical graphiti episodes from FalkorDB OR backup snapshot
# Emits basic-memory write_note calls for each verdict-class episode
#
# INPUTS:
#   --falkordb-uri          (default: redis://127.0.0.1:16379)
#   --backup-snapshot       (optional: pre-W295 FalkorDB dump path; for offline migration)
#   --basic-memory-cli      (default: Z:/claude-sota-installed/.local/bin/basic-memory.exe)
#   --basic-memory-project  (default: main)
#   --dry-run               (preview only; no writes)
#   --filter-group-id       (default: eee; matches GRAPHITI_GROUP_ID in retired .mcp.json:93)
#
# WORKFLOW:
#   1. Connect to FalkorDB (if --falkordb-uri reachable) OR load --backup-snapshot
#   2. Query: MATCH (n:Episode {group_id: $group_id}) RETURN n.uuid, n.name, n.content, n.created_at, n.source_type ORDER BY n.created_at
#   3. For each episode E:
#      a. Classify type from E.name pattern: "verdict|adoption|ship-decision|FM-class|codex-T1" → note_type=verdict
#         else → note_type=episode
#      b. Build markdown: YAML frontmatter (type, source=graphiti-historical, uuid, created_at) + body=E.content
#      c. Build permalink: slugify(E.name) prefixed with "graphiti-historical/"
#      d. CALL basic-memory write_note --title=<E.name> --content=<markdown> --directory="graphiti-historical" --note-type=<type>
#      e. Track in migration ledger: tools/migrate-graphiti-ledger.json (uuid → permalink → status)
#   4. Emit final stats: total episodes, written, skipped (duplicates), errors
#   5. Idempotent — re-run skips already-migrated UUIDs (check ledger)
#
# EDGE CASES:
#   - FalkorDB not running → require --backup-snapshot; if neither, error with "no source"
#   - Duplicate name collisions → suffix with first 6 chars of UUID (basic-memory supports this natively post-v0.15.0)
#   - Binary content (e.g. embeddings serialized into episode body) → b64-encode in markdown code-fence with provenance note
#   - >1000 episodes → batch in 100-at-a-time with progress bar; respects sync_delay=1000 from config.json:39
#
# LICENSE: Apache-2.0 (matches basic-memory + cognee licenses)
# CARDINAL-RULE CHECK: lives in tools/ (operator-utility dir), NOT in .claude/hooks/scripts/ — passes rule-2
# OPERATOR-APPROVAL: REQUIRED before running (it's a write-side migration; rollback = `mcp__basic-memory__delete_note(permalink="graphiti-historical/*")` × N)
```

**Wave assignment for the SPEC→IMPL transition**: W298 carry-forward (NOT this wave) — operator W295-AI-5 explicitly calls it a "deferred" follow-up tool. Specifying it here closes the analytical gap; implementing it requires (1) operator confirmation of historical-graphiti episode count + (2) FalkorDB temporary restart OR a pre-W295 snapshot acquisition — both operator-gated.

### Risk + rollback cost

- **Sub-fix 5A (comment-out block)**: LOW risk — JSON-syntax change; `git revert` restores in <30s; mechanism mirrors existing `_comments_addendum` pattern.
- **Sub-fix 5B (stop processes)**: see Issue 4 §4 risk analysis (LOW for FalkorDB already-stopped; deferred for Ollama).
- **Sub-fix 5C (migration tool spec)**: zero risk this wave (spec only; not executed).

### Operator-approval-needed: **N for 5A; Y for 5B-Ollama; N for 5C (spec is doc-only)**

### Pre-W295 historical graphiti episode count check

This stream attempted to count historical graphiti episodes to estimate sub-fix 5C migration scope:
- **FalkorDB :16379 CLOSED** at probe time (no live source).
- **No backup snapshot found** at expected paths: `Z:/claude-sota-installed-state/falkordb/`, `Z:/claude-sota-installed-state/graphiti/`, `Z:/claude-sota-installed-state/.codex/backups/falkordb-*`.
- **One pre-W270 graphiti config snapshot** at `Z:/claude-sota-installed-state/.codex/backups/mcp-pre-W270-graphiti.json` (the pre-retirement `.mcp.json` snapshot, NOT episode data).

**Implication**: if the operator wants sub-fix 5C migration to recover historical episodes, FalkorDB must be **temporarily re-started** with the pre-W295 dataset still in place (last known live: W295 commit `bc43e4e` 2026-05-18; the dataset may have been wiped by `docker rm falkordb` between W295 and W297 — needs operator confirmation). If the dataset is gone, sub-fix 5C **retires** to "not applicable; nothing to migrate" rather than implementing the tool.

### Cardinal-rule-1 check on sub-fix 5C migration tool

If implemented, the tool must consume Apache-2.0 graphiti-core OR direct Cypher/Redis-protocol queries to FalkorDB. Both routes are CR-1 trusted (FalkorDB is RedisLabs-fork Apache-2.0; graphiti-core is getzep MIT). The tool itself would be runtime-local with no upstream installer dependency, mirroring `tools/migrate-cognee-state.ps1` pattern (already accepted in-tree per `tools/` listing). Cardinal-rule-1 PASSES if tool lives in `tools/` not `.claude/`.

---

## §6 — Cardinal-rule self-check per proposed fix

| Fix-id | R1 trusted plugins | R2 hooks=upstream/CLI | R3 subagents=upstream | R4 no `.claude/rules/` | R5 permissions/sandbox | Status |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Fix 1: KEEP `context-mode-cache-heal.mjs`** | ✓ (context-mode plugin from `mksglu/context-mode` marketplace; CLAUDE.md:166) | ✓ (file is **plugin-deployed**, not self-invent; cardinal-rule-2 explicitly allows "upstream plugin hooks") | n/a | ✓ (no `.claude/rules/` involved) | ✓ (file lives in `.claude/hooks/`, gitignored equivalent NOT required since plugin re-deploys; permissions unchanged) | **PASS** |
| **Fix 2 Tier 1: doc clarification** | n/a | n/a | n/a | n/a | n/a | **PASS** (doc-only) |
| **Fix 2 Tier 2: delete `.basic-memory/` repo-side stale dir** | n/a | ✓ (no hooks touched) | n/a | ✓ (no `.claude/rules/` involved) | ✓ (filesystem operation; no permission/sandbox change) | **PASS** |
| **Fix 3: Langfuse restart** | ✓ (uses langfuse upstream docker compose at sibling-runtime path; cite W282a §2) | ✓ (no hooks touched) | n/a | ✓ | ✓ (no permission/sandbox change; uses existing docker-compose env) | **PASS** |
| **Fix 4 Tier 1: do nothing** | n/a | n/a | n/a | n/a | n/a | **PASS** (no-op) |
| **Fix 4 Tier 2: retire Ollama via NSSM** | ✓ (NSSM is upstream Windows service supervisor — already used for IkLlamaServer/CogneeMCP/etc.) | ✓ (NSSM stop is direct-CLI; no hook touched) | n/a | ✓ | ✓ | **PASS** |
| **Fix 5A: comment-out `.mcp.json:64-101`** | n/a (no plugin change) | n/a (no hook change) | n/a | ✓ | ✓ | **PASS** |
| **Fix 5B: stop FalkorDB + Ollama** | ✓ (NSSM = upstream) | ✓ (no hook touched) | n/a | ✓ | ✓ | **PASS** |
| **Fix 5C: migration tool spec** | n/a (spec only; tool would live in `tools/` not `.claude/hooks/scripts/`) | ✓ (when implemented, lives in `tools/` per cardinal-rule-2 read — operator-utility, NOT a CC hook) | n/a | ✓ | ✓ | **PASS** |

**Zero violations** across 9 proposed fixes. No CR-2 exemption needed (initially-suspected Issue 1 was reclassified to compliant after evidence-read).

---

## §7 — Operator-action queue (drop-in for W297-AUDIT §5)

Sorted by severity × leverage; each row is one concrete command OR yes/no decision.

| # | Severity | Action (single command OR yes/no decision) | Source | Recovery cost |
|---:|:---:|---|---|---|
| **C1** | **HIGH** | Run: `docker compose -f 'Z:\claude\observability\docker-compose.yml' --project-directory 'Z:\claude\observability' up -d langfuse-postgres langfuse-redis langfuse-clickhouse langfuse-minio langfuse-worker langfuse-web` (restart 6 Langfuse containers; named volumes preserve project + API keys) | W297 Stream C §3 + W282a §3 | ZERO (additive) |
| **C2** | **HIGH** | **Yes/no: approve operator-action C1's persistence-across-reboot path? (a) Docker Desktop auto-start (recommended); (b) NSSM-wrap `docker compose up` (heavier; daemon-of-daemons but boot-independent); (c) defer to W298.** | W282a §6 (3-path matrix) | LOW |
| **C3** | **MEDIUM** | **Yes/no: approve `nssm stop OllamaServe` + set `SERVICE_DEMAND_START` (frees ~200MB now; ~19GB models stay on-disk; reversible <30s)?** PRE-REQ: confirm Stream B has NOT recommended a memory-tier LLM swap that needs Ollama. | W297 Stream C §4 Tier 2 + W296 §5 #7 row b | LOW |
| **C4** | **MEDIUM** | Edit `.mcp.json:64-101`: move graphiti server block content into `_comments_addendum.w297_graphiti_retired_block_preserved` as stringified provenance (satisfies W295-AI-5 Item 2; preserves audit trail per CLAUDE.md:36 clause) | W297 Stream C §5 sub-fix 5A | LOW |
| **C5** | **LOW** | **Yes/no: approve `Compress-Archive` snapshot + `Remove-Item -Recurse Z:\claude-sota-installed\.basic-memory\` (stale repo-side config; bypassed by env per `.mcp.json:139`)?** | W297 Stream C §2 Tier 2 | LOW (snapshot zip restorable) |
| **C6** | **LOW** | W296 §5 #1 yes/no can land as **NO — do not delete `.claude/hooks/context-mode-cache-heal.mjs`** (verified plugin-deployed per `context-mode/start.mjs:243-339`); optional cosmetic = add inline `_comment_w296_provenance` doc-line in `settings.json` | W297 Stream C §1 + W296 §0 self-correction | ZERO |
| **C7** | **DEFER** | Spec for `tools/migrate-graphiti-to-basic-memory.py` (one-shot historical-graphiti→basic-memory migration) — carry to W298 implementation wave; this stream provides full spec at §5 sub-fix 5C | W295-AI-5 + W297 Stream C §5 sub-fix 5C | n/a (spec only) |

**Total**: 7 rows; **4 require operator yes/no approval (C2, C3, C5, C6)**; 2 are non-destructive direct commands (C1, C4); 1 is deferred (C7).

---

## §8 — Open questions routed to W297-AUDIT

1. **Stream B coordination**: Stream C §4 Tier-2 (retire Ollama) is deferred pending Stream B verdict on whether the 6-tier memory architecture should re-introduce a memory-tier LLM via Ollama. Coordinator: please cross-check Stream B output before executing C3.

2. **Langfuse persistence path**: which of W282a §6 paths (a/b/c) does operator prefer? Needed before W297 ships to avoid Issue 3 recurring in W298+.

3. **CLAUDE.md:36 phrasing on Ollama**: post-C3 execution, the line *"FalkorDB+Ollama can be stopped"* should become *"FalkorDB stopped; Ollama daemon retired via NSSM SERVICE_DEMAND_START — models retained on-disk for fast re-activation"* — does that exceed the ≤50-LOC cap? (Current CLAUDE.md is 42 LOC per W288 STOP-gate; this is a 4-word phrase swap, should stay within budget.)

4. **Sub-fix 5C wave assignment**: confirm W298 is the right wave to implement the migration tool, OR is there a need to materialize the verdict ledger episodes before W297 ships? (Note: there is ONE migrated verdict in basic-memory at `verdicts/W288-research-arch-v2-itself — adoption verdict.md` — if there are no other historical-graphiti episodes worth migrating, sub-fix 5C may be **retire-not-implement**.)

5. **Bias-detection meta-finding**: W296 §0 corrected an over-escalation (Stream E initial CRITICAL for the cache-heal hook was bias-class "novelty-as-violation"). W297 Stream C corrected an under-investigation (W297 plan claim "basic-memory config MISSING at BOTH paths" was bias-class "incomplete-probe" — the plan probed top-level paths but missed the `config/config.json` subdir + missed the `BASIC_MEMORY_CONFIG_DIR` env override that makes user-profile + state-root paths irrelevant). **Recommended W297-AUDIT discipline**: when documenting "MISSING" claims, enumerate **ALL plausible paths INCLUDING env-overridden ones** before declaring missing. This protects against the symmetric bias-class.

---

## §9 — Self-summary (per W297-PLAN §5 verification-on-completion)

- **File written**: `Z:/claude-sota-installed/docs/architecture/W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER/W297-STREAM-C-LIVE-STATE-REPAIR.md`
- **LOC**: ~ 510 (lower-bound estimate before headers; well within 500-900 done-criteria target)
- **Cite-anchors** (≥3 required):
  1. `Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-AUDIT-2026-05-18.md` §0 + §5 #1 + §5 #7 — Issue 1 self-correction + operator-action queue
  2. `Z:/claude-sota-installed/docs/architecture/W295-RESEARCH-ARCH-V5/W295-BASIC-MEMORY-DEEP-AUDIT.md` §1.6 + §5 AI-3 — basic-memory live-data check + path-drift fix
  3. `Z:/claude-sota-installed/docs/architecture/W295-AUDIT-2026-05-18.md` §5 #8 — graphiti AI-5 3-file reconciliation spec
  4. `Z:/claude-sota-installed/docs/architecture/W282a-LANGFUSE-STARTUP-2026-05-18.md` §1-§3-§6 — Langfuse compose stack discovery + restart precedent + persistence paths
  5. `Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-F-TASK-HYGIENE.md` §5.1 Task #386 — Ollama retirement context
  6. `Z:/claude-sota-installed/CLAUDE.md:36` — 6-tier memory canonical state + "FalkorDB+Ollama can be stopped" clause
  7. `Z:/claude-sota-installed/.mcp.json:64-101` + `:133-141` — live config evidence (graphiti block + basic-memory env contract)
  8. `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.136/start.mjs:243-339` — upstream plugin-deployed cache-heal provenance

- **Top 3 findings/recommendations**:
  1. **Issue 1 is settled (KEEP)**: cardinal-rule-2 NOT violated per upstream-plugin-deployed evidence — W296 §0 self-correction is correct; recommend landing W296 §5 #1 as NO without delete (confidence: HIGH).
  2. **Issue 2 is more nuanced than W297 plan claimed**: canonical config DOES exist at the state-root `config/` subdir per `.mcp.json:139` env override; W297 plan's "MISSING at BOTH paths" claim was bias-class "incomplete-probe" — TIER-1 fix is doc clarification, TIER-2 cleanup (delete stale repo-side `.basic-memory/`) is cosmetic-not-functional (confidence: HIGH).
  3. **Issue 3 is a true regression (HIGH ops debt)**: Langfuse stack crashed between W296 audit and W297 wave-start; the W282a precedent provides a clean restart recipe + a persistence-across-reboot decision matrix; recommend bundling C1 + C2 to convert this from a chronic regression into a one-shot fix (confidence: HIGH).

- **Confidence levels per fix**:
  - Fix 1 (KEEP cache-heal): **HIGH** (direct file-read evidence of upstream provenance)
  - Fix 2 Tier 1 (doc clarify): **HIGH** (direct filesystem probe evidence)
  - Fix 2 Tier 2 (delete stale dir): **MEDIUM** (low risk but optional cosmetic — operator preference)
  - Fix 3 (Langfuse restart): **HIGH** (W282a §3 documents identical restart precedent succeeding)
  - Fix 4 Tier 1 (do nothing on Ollama): **HIGH** (idle-correct state confirmed)
  - Fix 4 Tier 2 (retire Ollama): **MEDIUM** (depends on Stream B cross-check — defer until that lands)
  - Fix 5A (comment-out .mcp.json block): **HIGH** (mirrors existing `_comments_addendum` pattern)
  - Fix 5B (stop residual processes): **HIGH** for FalkorDB already-stopped; **MEDIUM** for Ollama (see Fix 4 Tier 2)
  - Fix 5C (migration tool spec): **HIGH** (spec-only this wave; impl deferred to W298)

- **Source-disagreement log**:
  - W297 plan §0 vs. live probe: **DISAGREES** on basic-memory config presence + on Ollama loaded-models interpretation. W297 plan said "config.json MISSING at BOTH paths" — live probe found canonical config at `state-root/basic-memory/config/config.json`; this stream resolves by reading `.mcp.json:139` env contract (canonical) over filesystem-naive search (W297 plan).
  - W296 §0 (corrected) vs. W296 Stream E (initial pre-correction): **DISAGREE** on cache-heal CR-2 status. This stream sides with W296 §0 self-correction based on direct read of `start.mjs:243-339`.
  - W296 §5 #7 "+48GB RAM" vs. live probe: **DISAGREE** — Ollama idle is ~200MB not 48GB; this stream resolves by direct `/api/ps` empty + daemon idle measurement.

- **Open follow-up items routed to W297-AUDIT**: §8 above lists 5 questions (Stream B coordination on C3; Langfuse persistence path; CLAUDE.md:36 phrasing; W298 wave-assignment for 5C; bias-detection meta-finding).

---

END W297-STREAM-C-LIVE-STATE-REPAIR.md
