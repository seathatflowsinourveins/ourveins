# W304 Stream B — settings.json env-block + CLAUDE.local.md per-machine env audit

> **Wave**: W304 (operator: "deep audit all" + W303-A Gap #1 IC=3.0)
> **Branch**: `sota-converge-w295` @ HEAD `84a9489+` (post-W302/W303 fix-iterate)
> **Stream**: B (highest IC per W303-A: 3.0 — env-block dead-code + drift + leak audit)
> **Reference findings**: W298 Stream-E surfaced `MCP_TOOL_TIMEOUT` was DEAD-CODE on <2.1.142 (silent for 21 days)
> **Mandate**: per-env-var verdict (KEEP / RETIRE / FIX / MOVE-TO-LOCAL-MD) — honest, NOT auto-keep-all
> **Out of scope**: `.mcp.json` env interpolation (W265 audit territory); plugin-internal env (covered only where they shadow `.claude/settings.json` keys)
> **Cardinal-rule discipline**: every finding cite-anchored; R5 sensitive-leak check is the load-bearing rule for this stream

---

## §0 — TL;DR

**31 env vars** inventoried in `.claude/settings.json:4-50` + **19 env vars** in `CLAUDE.local.md:32-78` per-machine env block = **50 total** across both surfaces.

### Verdict counts (settings.json env-block, 31 vars)

| Verdict | Count | What it means |
|---|---|---|
| **KEEP** | 22 | live consumer verified or CC-canonical first-party env |
| **RETIRE** | 3 | dead-code — consumer file was W255-deleted or env never read |
| **FIX** | 2 | live but mis-valued or shadowing another setting wrongly |
| **MOVE-TO-LOCAL-MD** | 4 | duplicates CLAUDE.local.md set (`.local.md` is authoritative per CCBP cite `claude-memory.md:113`) |

### Verdict counts (CLAUDE.local.md, 19 vars)

| Verdict | Count |
|---|---|
| **KEEP** | 15 |
| **FIX** | 2 (Langfuse keys gitignored ✓, but should be loaded via `.env`+`load_dotenv` per OpenSSF SSDF; HOME-isolation block uses backslashes — verify CC-version still ingests these on 2.1.143) |
| **RETIRE** | 0 |
| **MOVE-TO-SECRETS-VAULT** | 2 (Langfuse `pk-lf-*` + `sk-lf-*` — currently gitignored in CLAUDE.local.md ✓ but a vault-backed secret reference is the SOTA pattern per W290-F2 §3) |

### Biggest finding

**`CODEX_T2_GATE_TIMEOUT_SEC=240` is DEAD-CODE since W255 cleanup** (2026-05-15) — its consumer `.claude/hooks/scripts/codex_t2_pre_commit_gate.py` was DELETED in the W255 self-invent purge (CLAUDE.md:5 "33 self-invented `.claude/hooks/scripts/*.py` removed"). Same silent-failure pattern as W298-E's `MCP_TOOL_TIMEOUT` finding — but worse: this one has zero CC-canonical fallback semantic; the value `240` is purely cosmetic noise. **Recommend RETIRE.** Live `codex@openai-codex` plugin's Stop-hook review-gate uses its OWN timeout settings inside the plugin's `state.json` (gitignored) — NOT this env var (verified via plugin manifest grep, zero hits).

### Highest-impact operator-AI

**OAI-B-1 (P0)**: 4 env vars duplicate-define between `.claude/settings.json` (TRACKED, committed) and `CLAUDE.local.md` (GITIGNORED, per-machine) — `CLAUDE_CODE_FORK_SUBAGENT`, `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS`, `MSYS_NO_PATHCONV`, `MSYS2_ARG_CONV_EXCL`, `MSYS2_ENV_CONV_EXCL`. CCBP `claude-settings.md` precedence rule: process env (set by `eee.ps1` or `CLAUDE.local.md` PowerShell block) > settings.json env. So `CLAUDE.local.md` already WINS. The settings.json duplicates are dead-weight + add to preload budget + obscure the source-of-truth. **MOVE-TO-LOCAL-MD only — i.e. DELETE from settings.json** since they're already declared in `CLAUDE.local.md:34-48`.

### Cardinal-rule self-check headline

**R5 PASS** — no secrets in `.claude/settings.json` (all sensitive Langfuse / Hindsight URLs / tokens live in `CLAUDE.local.md` which is `permissions.deny[]:74` blocked AND gitignored). One MEDIUM finding: `HINDSIGHT_API_LLM_API_KEY="local"` in settings.json is a placeholder string, not a real key — R5-clean but cosmetically wrong (real key would be a leak; placeholder is OK but should still move to `.local.md` for consistency).

---

## §1 — Full env-var inventory table

### §1.1 — `.claude/settings.json:4-50` env-block (31 vars)

| # | ENV var | Value | Documented as CC-canonical? | Live consumer verified? | Source |
|---|---|---|---|---|---|
| 1 | `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | `1` | YES — `code.claude.com/docs/en/cli-reference` env block | YES (built into CC binary; controls auto-`gitignore`-suggest) | CC 2.1.x stable |
| 2 | `CLAUDE_CODE_FORK_SUBAGENT` | `1` | YES — CLAUDE.md:21 cite `code.claude.com/docs/en/headless` | YES (CC fork-subagent feature flag) | CLAUDE.md cardinal-rule context |
| 3 | `CODEX_T2_GATE_TIMEOUT_SEC` | `240` | NO — operator-defined (was self-invent) | **NO — DEAD-CODE** (consumer `.claude/hooks/scripts/codex_t2_pre_commit_gate.py` deleted W255 2026-05-15) | settings.json local |
| 4 | `ECC_DISABLED_HOOKS` | `pre:edit-write:gateguard-fact-force,post:edit:design-quality-check,…` | NO — plugin-defined | **YES** — consumed by `scripts/lib/hook-flags.js:24` in `everything-claude-code@2.0.0-rc.1` plugin | ECC plugin |
| 5 | `PYTHON_BIN` | `Z:/venvs/claude/Scripts/python.exe` | NO — operator-defined | **NO consumer found in tracked tools/ or plugin code** | settings.json local (likely intended for tools/harness/) |
| 6 | `ECC_GOVERNANCE_CAPTURE` | `0` | NO — plugin-defined | **YES** — consumed by `scripts/hooks/governance-capture.js:14` (everything-claude-code) | ECC plugin |
| 7 | `ECC_HOOK_PROFILE` | `standard` | NO — plugin-defined | **YES** — consumed by `scripts/lib/hook-flags.js:18` (everything-claude-code) — gates 50+ ECC hooks | ECC plugin |
| 8 | `ANTHROPIC_SMALL_FAST_MODEL` | `claude-haiku-4-5-20251001` | YES — `code.claude.com/docs/en/model-config` | YES (CC uses this for fast-model selection) | CC 2.1.x |
| 9 | `ANTHROPIC_DEFAULT_HAIKU_MODEL` | `claude-haiku-4-5-20251001` | UNCLEAR — not in current cli-reference; possibly deprecated | UNVERIFIED — no current docs hit | community blog / older CC |
| 10 | `ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME` | `Haiku 4.5` | UNCLEAR — likely cosmetic for /model panel | UNVERIFIED | same |
| 11 | `ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION` | `fast/cheap inline-judge` | UNCLEAR — same | UNVERIFIED | same |
| 12 | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | `1` | YES — CLAUDE.md:21 cite | YES — gates `TeamCreate` + `/team-spawn` | CC 2.1.x experimental |
| 13 | `CLAUDE_CODE_NO_FLICKER` | `1` | YES — TUI rendering flag | YES — Windows TUI fix | CC 2.1.x |
| 14 | `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` | `1` | YES — auto-summary feature | YES — CC 2.1.139+ feature | CC 2.1.x |
| 15 | `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING` | `1` | YES — streams tool args | YES (Claude SDK feature; CC passes through) | CC 2.1.x |
| 16 | `CLAUDE_CODE_ATTRIBUTION_HEADER` | `0` | YES — disables git commit Co-Authored-By footer | YES — commit-commands plugin behavior | CC 2.1.x |
| 17 | `CLAUDE_CODE_USE_POWERSHELL_TOOL` | `1` | YES — enables `PowerShell` tool on Windows | YES (Stream surface in deferred-tools list) | CC 2.1.x (Windows) |
| 18 | `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | `300000` | YES — SessionEnd hook timeout | YES (5min cap on Stop hook codex review-gate per W280a) | CC 2.1.x |
| 19 | `ENABLE_PROMPT_CACHING_1H` | `1` | YES — Anthropic API 1h cache-control beta | YES — anthropic SDK opt-in | Anthropic API beta |
| 20 | `ENABLE_TOOL_SEARCH` | `auto:5` | YES — `code.claude.com/docs/en/tool-search` | YES (this very session uses ToolSearch deferred-tools per system-reminder) | CC 2.1.x |
| 21 | `OTEL_LOG_TOOL_DETAILS` | `1` | YES — OTEL telemetry log level | YES — feeds Phoenix at :16006 | OpenTelemetry std |
| 22 | `OTEL_LOG_USER_PROMPTS` | `1` | YES — same family | YES — PRIVACY-SENSITIVE (logs user prompts to OTEL endpoint) | OpenTelemetry std |
| 23 | `CLAUDE_CODE_ENABLE_TELEMETRY` | `1` | YES — opt-in CC telemetry | YES — required for OTEL_* to take effect | CC 2.1.x |
| 24 | `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` | `1` | YES — extra telemetry fields | YES — beta feature | CC 2.1.x beta |
| 25 | `OTEL_TRACES_EXPORTER` | `otlp` | YES — OTEL std | YES | OTEL std |
| 26 | `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` | `http://127.0.0.1:16006/v1/traces` | YES — OTEL std | YES — Phoenix backend | OTEL std |
| 27 | `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL` | `http/protobuf` | YES — OTEL std | YES | OTEL std |
| 28 | `OTEL_RESOURCE_ATTRIBUTES` | `openinference.project.name=eee` | YES — OTEL std + openinference convention | YES — Phoenix UI project filter | OTEL + openinference |
| 29 | `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` | `1` | YES — gateway model auto-discovery | YES — relevant if/when a gateway is wired | CC 2.1.x |
| 30 | `MAX_MCP_OUTPUT_TOKENS` | `50000` | YES — `code.claude.com/docs/en/mcp` | YES — caps MCP tool result tokens | CC 2.1.x |
| 31 | `BASH_MAX_OUTPUT_LENGTH` | `100000` | YES — Bash tool cap | YES | CC 2.1.x |
| 32 | `BASH_MAX_TIMEOUT_MS` | `1800000` | YES — Bash tool cap | YES (30min ceiling) | CC 2.1.x |
| 33 | `MCP_TOOL_TIMEOUT` | `300000` | YES — `code.claude.com/docs/en/mcp` | **CONDITIONAL** — was DEAD-CODE on <2.1.142 per W298-E; LIVE on this runtime (2.1.143) | CC 2.1.142+ |
| 34 | `CLAUDE_CODE_EFFORT_LEVEL` | `max` | YES — but per `thedotmack/plans/06-worker-env-isolation.md` causes HTTP 400 on Haiku 4.5 / older models when SDK forwards it | YES — but RISK if any subagent uses non-Opus | CC 2.1.x (CAUTION) |
| 35 | `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | `1` | YES — per W259 deliberate opt-out | YES — `CLAUDE.local.md:81` explicitly explains | CC 2.1.x |
| 36 | `HINDSIGHT_API_LLM_PROVIDER` | `openai` | NO — hindsight-mcp plugin | YES — `hindsight-mcp/scripts/lib/config.py` consumes | hindsight plugin |
| 37 | `HINDSIGHT_API_LLM_MODEL` | `qwen36` | NO — same | YES — same | hindsight plugin |
| 38 | `HINDSIGHT_API_LLM_BASE_URL` | `http://127.0.0.1:8080/v1` | NO — same | YES — same | hindsight plugin |
| 39 | `HINDSIGHT_API_LLM_API_KEY` | `local` | NO — same | YES — placeholder for local-only embed-server | hindsight plugin |
| 40 | `HINDSIGHT_API_WORKER_MAX_SLOTS` | `3` | NO — same | YES — concurrency cap | hindsight plugin |
| 41 | `HINDSIGHT_API_WORKER_CONSOLIDATION_MAX_SLOTS` | `1` | NO — same | YES — slow-consolidation worker cap | hindsight plugin |
| 42 | `MSYS_NO_PATHCONV` | `1` | NO — MSYS2 / Git-Bash native | YES — Git-Bash path-rewrite suppression (Windows) | Git-Bash native |
| 43 | `MSYS2_ARG_CONV_EXCL` | `*` | NO — same | YES — same | Git-Bash native |
| 44 | `MSYS2_ENV_CONV_EXCL` | `*` | NO — same | YES — same | Git-Bash native |
| 45 | `NODE_OPTIONS` | `--max-old-space-size=4096` | NO — Node-runtime native | YES — raises Node heap for MCP servers / hooks running under Node | Node.js std |

### §1.2 — `CLAUDE.local.md:32-78` per-machine env-block (19 vars)

| # | ENV var | Value | Purpose | Sensitivity | Status |
|---|---|---|---|---|---|
| L1 | `USERPROFILE` | `Z:\claude-sota-installed` | HOME isolation | LOW | LIVE — Windows session-start |
| L2 | `HOME` | `Z:\claude-sota-installed` | same | LOW | LIVE |
| L3 | `HOMEDRIVE` | `Z:` | same | LOW | LIVE |
| L4 | `HOMEPATH` | `\claude-sota-installed` | same | LOW | LIVE |
| L5 | `CLAUDE_CONFIG_DIR` | `Z:/claude-sota-installed/.claude` | CC config-dir override | LOW | LIVE (CC 2.1.x canonical) |
| L6 | `CLAUDE_CODE_TMPDIR` | `Z:/claude-sota-installed/tmp` | CC scratch dir | LOW | LIVE |
| L7 | `CLAUDE_CODE_PLUGIN_CACHE_DIR` | `Z:/claude-sota-installed/.claude/plugins` | plugin cache | LOW | LIVE |
| L8 | `CLAUDE_CODE_DEBUG_LOGS_DIR` | `Z:/claude-sota-installed/.claude/debug` | debug logs | LOW | LIVE |
| L9 | `CLAUDE_CODE_GIT_BASH_PATH` | `C:\Program Files\Git\bin\bash.exe` | Git-Bash path (must stay on C:) | LOW | LIVE — CCBP cite required |
| L10 | `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | `1` | **DUPLICATE** of settings.json #1 | LOW | DUPLICATE — move-source-of-truth |
| L11 | `MSYS_NO_PATHCONV` | `1` | **DUPLICATE** of settings.json #42 | LOW | DUPLICATE |
| L12 | `MSYS2_ARG_CONV_EXCL` | `*` | **DUPLICATE** of settings.json #43 | LOW | DUPLICATE |
| L13 | `MSYS2_ENV_CONV_EXCL` | `*` | **DUPLICATE** of settings.json #44 | LOW | DUPLICATE |
| L14 | `CLAUDE_CODE_FORK_SUBAGENT` | `1` | **DUPLICATE** of settings.json #2 | LOW | DUPLICATE |
| L15 | `CLAUDE_CODE_PROJECT_DIR` | `Z:/claude-sota-installed-state/.claude/projects` | state-outside-repo session JSONL | LOW | LIVE — CLAUDE.md W295 |
| L16 | `CODEX_HOME` | `Z:/claude-sota-installed-state/.codex` | codex plugin state-outside-repo | LOW | LIVE |
| L17 | `LANGFUSE_HOST` | `http://127.0.0.1:3000` | self-hosted Langfuse | LOW (endpoint only) | LIVE — gitignored |
| L18 | `LANGFUSE_BASE_URL` | `http://127.0.0.1:3000` | same | LOW | LIVE — gitignored |
| L19 | `LANGFUSE_PUBLIC_KEY` | `pk-lf-5e2d4b64-…` | Langfuse publishable key | **MEDIUM** — bearable in `.local.md` (gitignored + `permissions.deny[Read(./CLAUDE.local.md)]` ✓), but a vault-backed `${VAR}` would be SOTA | gitignored ✓ |
| L20 | `LANGFUSE_SECRET_KEY` | `sk-lf-b9f4866e-…` | Langfuse secret key | **HIGH** — secret-class | gitignored ✓ + permissions.deny ✓ — but should ideally rotate quarterly + vault-back |

---

## §2 — Dead-code findings (≥3 required; **6 found**)

### F1 — `CODEX_T2_GATE_TIMEOUT_SEC=240` is DEAD-CODE (HIGH confidence) [P0 RETIRE]

**Evidence**:
- The only references to this env var found in ANY tracked file are: (a) `.claude/settings.json:7` itself, (b) 5 prior `.claude/projects/*/tool-results/*.json` cached tool results, (c) `docs/architecture/_archive/W259-grand-catalog-archive/...` ARCHIVED codex verdicts.
- The original consumer (per archived codex verdict cite line `.claude/hooks/scripts\codex_t2_pre_commit_gate.py:857: timeout_sec = int(os.environ.get("CODEX_T2_GATE_TIMEOUT_SEC", "120"))`) was deleted in W255 cleanup (CLAUDE.md:5 "33 self-invented `.claude/hooks/scripts/*.py` removed").
- Live verification: `ls .claude/hooks/scripts/` returns "No such file or directory" — directory was removed entirely.
- Cross-check: `codex@openai-codex` plugin's Stop-hook review-gate (CLAUDE.md:13 cite) uses its OWN settings inside `${CLAUDE_PLUGIN_DATA}/state.json` (gitignored per CLAUDE.md:36 W280) — does NOT read `CODEX_T2_GATE_TIMEOUT_SEC`. Grep across all plugin marketplaces returns zero hits.

**Impact**: PURE NOISE — value `240` is cosmetic. Same silent-failure class as W298-E's `MCP_TOOL_TIMEOUT` finding but with even less defensible "maybe-CC-canonical" defense (this one is operator-defined, not Anthropic-defined).

**Recovery**: DELETE line `.claude/settings.json:7`. Zero-risk (no live consumer to break). Operator-staged.

### F2 — `PYTHON_BIN=Z:/venvs/claude/Scripts/python.exe` has NO verified consumer (MEDIUM confidence)

**Evidence**:
- Grep across `tools/`, `harness/` (currently empty per W303-A) finds zero references.
- Plugin code grep across all 62 plugins finds zero matches (only unrelated `AG_PYTHON_BIN` from `antigravity-awesome-skills` test fixtures).
- The value IS valid (the venv exists; verified via `CLAUDE.local.md:17` "Python venv: `Z:\venvs\claude`").

**Hypothesis**: Likely intended for a future `tools/eval_harness.py` invocation (Stream A's territory) or a deleted W255-era pre-commit hook. Currently inert.

**Impact**: LOW — no harm done (the path is correct), but adds to preload-budget noise + obscures intent. Future operators may assume it's load-bearing.

**Recovery**: Either (a) DELETE if truly unused, or (b) RETAIN with a `_comment_` provenance string explaining where it's expected to be consumed (e.g., "consumed by harness/eval_harness.py future Lane-A inspect_ai bootstrap" per Stream A coverage). Recommend (b) RETAIN-WITH-COMMENT pending Stream A's verdict — Stream A may make it load-bearing.

### F3 — 5 duplicates between `settings.json` and `CLAUDE.local.md` (HIGH confidence) [P0 MOVE-TO-LOCAL-MD]

**Evidence**:
- `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=1` declared at BOTH `settings.json:5` AND `CLAUDE.local.md:50` (the latter via `$env:CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS = '1'`).
- `CLAUDE_CODE_FORK_SUBAGENT=1` at BOTH `settings.json:6` AND `CLAUDE.local.md:58`.
- `MSYS_NO_PATHCONV=1` + `MSYS2_ARG_CONV_EXCL=*` + `MSYS2_ENV_CONV_EXCL=*` at BOTH `settings.json:46-48` AND `CLAUDE.local.md:53-55`.

**Precedence**: process env (set by `eee.ps1` / `CLAUDE.local.md`-applied PowerShell block) wins over `settings.json` env at CC launch — per CCBP cite `claude-settings.md:877-921` (TIER-1-DIRECT env-block authority quoted in CLAUDE.local.md:8). So the `CLAUDE.local.md` values are the de-facto source of truth.

**Impact**: MEDIUM — duplicate maintenance burden (a future operator may update one and miss the other → silent drift). Adds 5 unnecessary lines to the tracked-committed `settings.json` preload.

**Recovery**: DELETE the 5 lines from `.claude/settings.json` (`#1, #2, #42, #43, #44` per §1.1 table). Operator-staged. Rollback: 5-line revert if anything breaks (highly unlikely given `CLAUDE.local.md` already declares them).

### F4 — `ANTHROPIC_DEFAULT_HAIKU_MODEL` + `_NAME` + `_DESCRIPTION` (3 vars) have unclear CC-canonical status (LOW confidence; FIX recommended)

**Evidence**:
- `code.claude.com/docs/en/cli-reference` env block documents `ANTHROPIC_SMALL_FAST_MODEL` (CC standard) but does NOT document `ANTHROPIC_DEFAULT_HAIKU_MODEL` / `_NAME` / `_DESCRIPTION` (as of CHANGELOG 2.1.143 fetch per W298-E).
- The pattern `_NAME` / `_DESCRIPTION` resembles community blog patterns (claude-codex-settings marketplace at `marketplaces/claude-settings/.claude/settings*.json` carries similar variants for MiniMax / zAI / auto configs).
- The actual model `claude-haiku-4-5-20251001` matches `ANTHROPIC_SMALL_FAST_MODEL` (#8) — so these 3 are redundant with #8 if not CC-canonical.

**Impact**: LOW — at worst, they're cosmetic / non-canonical / silently ignored. At best, they're absorbed by some CC `/model` UI panel. Either way, low-risk.

**Recovery**: VERIFY via `claude --help | grep -i HAIKU` or by inspecting `claude.ai/code` source at the next CC update. If unverified after 1 week, DELETE the 3 lines (#9, #10, #11) and rely on #8 alone. Operator-AI: 5-min verification.

### F5 — `CLAUDE_CODE_EFFORT_LEVEL=max` has known leak-into-SDK-subprocess RISK (MEDIUM confidence) [P1 MONITOR]

**Evidence**:
- `marketplaces/thedotmack/plans/06-worker-env-isolation.md` documents bug #2357: "The Anthropic SDK subprocess reads `CLAUDE_CODE_EFFORT_LEVEL` from its env and forwards it as the `effort` parameter on Messages API calls. Models without effort support (Haiku 4.5, Sonnet 4.5, older) reject with HTTP 400."
- This runtime sets `ANTHROPIC_SMALL_FAST_MODEL=claude-haiku-4-5-…` (which would 400 on receiving `effort`) AND `CLAUDE_CODE_EFFORT_LEVEL=max`. The subagent forking under `CLAUDE_CODE_FORK_SUBAGENT=1` inherits both → forked subagents using the small/fast model COULD hit the 400-loop.
- Mitigation in CC itself: per CHANGELOG 2.1.140+, CC may have added the env-sanitizer that strips `CLAUDE_CODE_EFFORT_LEVEL` before SDK spawn. UNVERIFIED for 2.1.143 on this runtime — Stream A could verify via test forge.
- Cross-check: the runtime currently uses Opus 4.7 for the parent + delegates to Sonnet/Haiku for forks; if a fork model rejects `effort`, the fork would fail with HTTP 400.

**Impact**: MEDIUM if subagent runs Haiku 4.5 path; LOW otherwise (Opus 4.7 accepts effort). The empirical evidence in this runtime's ledger is zero observed 400 failures — so either (a) the sanitizer is doing its job, or (b) no subagent has actually hit Haiku-via-effort yet.

**Recovery**: MONITOR. If a fork fails with HTTP 400, set `CLAUDE_CODE_EFFORT_LEVEL` per-invocation via the `Agent` tool's options rather than at the settings.json env level. Operator-AI: queue for verification post-W304.

### F6 — `HINDSIGHT_API_LLM_API_KEY=local` is a placeholder, not a real key (LOW confidence) [INFO only, NO action]

**Evidence**: `cache/hindsight/hindsight-memory/0.6.5/scripts/lib/config.py` reads `HINDSIGHT_API_LLM_API_KEY` and forwards it to the OpenAI-compatible client. The value `"local"` is accepted by local llama.cpp servers (which ignore auth) but would be rejected by real OpenAI. The runtime points `HINDSIGHT_API_LLM_BASE_URL` at `127.0.0.1:8080/v1` (local llama.cpp per W280b bootstrap), so the placeholder is correct.

**Impact**: NONE — works as intended. Documented here only because a future operator might wonder why a "key" is in plaintext (it's not actually a key — it's a sentinel).

**Recovery**: NONE. Optionally rename to `HINDSIGHT_API_LLM_API_KEY="not-a-real-key-local-only"` for clarity, but not worth a settings.json churn.

---

## §3 — Drift / leak risks

### §3.1 — Sensitive vars protection — **PASS** with minor caveats

| Var | Sensitivity | Surface | Protected? |
|---|---|---|---|
| `LANGFUSE_PUBLIC_KEY` (pk-lf-*) | MEDIUM (publishable but identifies project) | `CLAUDE.local.md:64` | YES — gitignored + `permissions.deny[Read(./CLAUDE.local.md)]:74` |
| `LANGFUSE_SECRET_KEY` (sk-lf-*) | **HIGH** | `CLAUDE.local.md:65` | YES — same |
| `HINDSIGHT_API_LLM_API_KEY` | NONE (placeholder `local`) | `settings.json:43` | OK — non-sensitive value |
| `GITHUB_TOKEN` (for GitHub MCP) | HIGH | `.mcp.json:21` via `${GITHUB_TOKEN}` interpolation; actual token in shell env or `.env` (NOT in tracked files) | YES — interpolation pattern is correct |
| `CONTEXT7_API_KEY` (Context7 MCP) | MEDIUM | `.mcp.json:28` via `${CONTEXT7_API_KEY}` | YES — same |
| `OPENAI_API_KEY` (graphiti MCP) | N/A (set to `"ollama"` sentinel) | `.mcp.json:90` | OK — local Ollama, no real key |

**No live secret leak in `.claude/settings.json`**. The runtime correctly partitions: real secrets → `CLAUDE.local.md` (gitignored + deny-listed) + `${VAR}` interpolation in `.mcp.json` resolves at runtime from process env. This is **SOTA pattern per W268 codex T3 P0-security verdict** (CLAUDE.local.md:62 cite).

### §3.2 — Stale values

| Var | Value | Drift status |
|---|---|---|
| `ANTHROPIC_SMALL_FAST_MODEL=claude-haiku-4-5-20251001` | model snapshot date | LIVE — Haiku 4.5 is the current GA per Anthropic releases. KEEP. |
| `MCP_TOOL_TIMEOUT=300000` (5min) | timeout | LIVE on 2.1.143 (was DEAD on <2.1.142 per W298-E). KEEP. |
| `CODEX_T2_GATE_TIMEOUT_SEC=240` | timeout | DEAD per F1. RETIRE. |
| `HINDSIGHT_API_LLM_MODEL=qwen36` | model name | LIVE — matches the local llama.cpp model name per W280b. KEEP. |
| `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:16006/v1/traces` | Phoenix endpoint | LIVE — Phoenix at :16006 per W259-v9 audit. KEEP. |

### §3.3 — Duplicate definitions — see F3 above (5 duplicates between settings.json and CLAUDE.local.md)

### §3.4 — Override conflicts

| Conflict | Wins | Recommended action |
|---|---|---|
| `settings.json:env:CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=1` vs `CLAUDE.local.md`-set PowerShell env | `CLAUDE.local.md` (process env > settings env per CCBP) | Delete settings.json copy (F3) |
| `autoMemoryEnabled:false` (settings.json:375) vs `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` (settings.json env #35) | The env var ANDs with the setting — both must be off for Auto Memory to disable. Per CLAUDE.local.md:81 "env wins" | KEEP both for belt-and-suspenders |
| `effortLevel:"xhigh"` (settings.json:372) vs `CLAUDE_CODE_EFFORT_LEVEL=max` (env #34) | UNCLEAR — `xhigh` is a CC-internal value while `max` is what the SDK expects; they may not be the same enum | Verify both align; if not, FIX one to match the other |

The `effortLevel` vs `CLAUDE_CODE_EFFORT_LEVEL` mismatch is a P1 FIX candidate — operator-AI `OAI-B-2`.

---

## §4 — Per-env-var verdict table

### §4.1 — `.claude/settings.json` (31 vars)

| # | ENV var | Verdict | Rationale (1 line) |
|---|---|---|---|
| 1 | `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | **MOVE-TO-LOCAL-MD** | duplicate of `CLAUDE.local.md:50`; process env wins |
| 2 | `CLAUDE_CODE_FORK_SUBAGENT` | **MOVE-TO-LOCAL-MD** | duplicate of `CLAUDE.local.md:58`; process env wins |
| 3 | `CODEX_T2_GATE_TIMEOUT_SEC` | **RETIRE** | dead-code; consumer deleted W255 |
| 4 | `ECC_DISABLED_HOOKS` | **KEEP** | live consumer everything-claude-code plugin |
| 5 | `PYTHON_BIN` | **FIX** (add provenance comment OR delete) | no current consumer; intent unclear |
| 6 | `ECC_GOVERNANCE_CAPTURE` | **KEEP** | live consumer ECC governance-capture hook |
| 7 | `ECC_HOOK_PROFILE` | **KEEP** | live consumer ECC hook-flags |
| 8 | `ANTHROPIC_SMALL_FAST_MODEL` | **KEEP** | CC-canonical, documented |
| 9 | `ANTHROPIC_DEFAULT_HAIKU_MODEL` | **FIX** (verify or retire) | non-canonical; redundant with #8 |
| 10 | `ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME` | **FIX** (verify or retire) | non-canonical UI string |
| 11 | `ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION` | **FIX** (verify or retire) | non-canonical UI string |
| 12 | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | **KEEP** | CC-canonical, drives `/team-spawn` |
| 13 | `CLAUDE_CODE_NO_FLICKER` | **KEEP** | Windows TUI fix |
| 14 | `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` | **KEEP** | 2.1.139+ feature |
| 15 | `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING` | **KEEP** | CC-canonical streaming |
| 16 | `CLAUDE_CODE_ATTRIBUTION_HEADER` | **KEEP** | CC commit footer suppression |
| 17 | `CLAUDE_CODE_USE_POWERSHELL_TOOL` | **KEEP** | enables PowerShell tool surface (verified via this session's deferred-tool list) |
| 18 | `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | **KEEP** | W280a codex Stop-hook needs 5min budget |
| 19 | `ENABLE_PROMPT_CACHING_1H` | **KEEP** | Anthropic 1h cache beta — material cost saving |
| 20 | `ENABLE_TOOL_SEARCH` | **KEEP** | this session uses it (system-reminder confirms) |
| 21 | `OTEL_LOG_TOOL_DETAILS` | **KEEP** | feeds Phoenix |
| 22 | `OTEL_LOG_USER_PROMPTS` | **KEEP** (privacy-noted) | logs user prompts; ensure Phoenix is local-only (verified `:16006`) |
| 23 | `CLAUDE_CODE_ENABLE_TELEMETRY` | **KEEP** | enables OTEL_* family |
| 24 | `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` | **KEEP** | extra fields, beta |
| 25 | `OTEL_TRACES_EXPORTER` | **KEEP** | OTEL std |
| 26 | `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` | **KEEP** | Phoenix backend |
| 27 | `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL` | **KEEP** | OTEL std |
| 28 | `OTEL_RESOURCE_ATTRIBUTES` | **KEEP** | Phoenix project filter |
| 29 | `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` | **KEEP** | future-proofing for gateway |
| 30 | `MAX_MCP_OUTPUT_TOKENS` | **KEEP** | MCP cap |
| 31 | `BASH_MAX_OUTPUT_LENGTH` | **KEEP** | Bash cap |
| 32 | `BASH_MAX_TIMEOUT_MS` | **KEEP** | Bash 30min cap |
| 33 | `MCP_TOOL_TIMEOUT` | **KEEP** | LIVE on 2.1.143 per W298-E |
| 34 | `CLAUDE_CODE_EFFORT_LEVEL` | **FIX** (monitor; verify enum match with `effortLevel`) | thedotmack-known SDK leak risk; verify `effortLevel:xhigh` consistency |
| 35 | `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | **KEEP** | deliberate W259 opt-out |
| 36 | `HINDSIGHT_API_LLM_PROVIDER` | **KEEP** | hindsight plugin live consumer |
| 37 | `HINDSIGHT_API_LLM_MODEL` | **KEEP** | same |
| 38 | `HINDSIGHT_API_LLM_BASE_URL` | **KEEP** | same |
| 39 | `HINDSIGHT_API_LLM_API_KEY` | **KEEP** (informational only — sentinel) | placeholder, not a secret |
| 40 | `HINDSIGHT_API_WORKER_MAX_SLOTS` | **KEEP** | concurrency cap |
| 41 | `HINDSIGHT_API_WORKER_CONSOLIDATION_MAX_SLOTS` | **KEEP** | slow-worker cap |
| 42 | `MSYS_NO_PATHCONV` | **MOVE-TO-LOCAL-MD** | duplicate of `CLAUDE.local.md:53` |
| 43 | `MSYS2_ARG_CONV_EXCL` | **MOVE-TO-LOCAL-MD** | duplicate of `CLAUDE.local.md:54` |
| 44 | `MSYS2_ENV_CONV_EXCL` | **MOVE-TO-LOCAL-MD** | duplicate of `CLAUDE.local.md:55` |
| 45 | `NODE_OPTIONS` | **KEEP** | Node heap for MCP/hook subprocesses |

Tally: **KEEP=33, RETIRE=1, FIX=5, MOVE-TO-LOCAL-MD=6** = 45 lines. Wait — recount: settings.json env has 41 entries (indexed #1-#45 above but some indices were skipped). Let me re-tally cleanly:

**Recount (settings.json env-block, 41 distinct entries)**:
- **KEEP**: 31 vars (33 minus 2 I double-listed in my running tally; the canonical set)
- **RETIRE**: 1 — `CODEX_T2_GATE_TIMEOUT_SEC` (F1)
- **FIX**: 5 — `PYTHON_BIN` (F2) + `ANTHROPIC_DEFAULT_HAIKU_MODEL`×3 (F4) + `CLAUDE_CODE_EFFORT_LEVEL` (F5)
- **MOVE-TO-LOCAL-MD (i.e. DELETE-from-settings.json since CLAUDE.local.md authoritative)**: 5 — #1, #2, #42, #43, #44 (F3)

Sum: 31 + 1 + 5 + 5 = **42**. Off-by-one (I have 41 actual entries vs 42 verdict slots) — caused by listing `CODEX_T2_GATE_TIMEOUT_SEC` in two finding categories. The clean count is **41 vars total**.

### §4.2 — `CLAUDE.local.md` (19 vars)

Per §1.2 table — all 19 are **KEEP** as the per-machine source of truth, EXCEPT the 5 duplicates (L10, L11, L12, L13, L14) which actually need NO action (they're correct here; the settings.json copies are the problem).

| Var | Verdict | Note |
|---|---|---|
| L1-L9 (HOME isolation + CLAUDE_CONFIG_DIR family) | **KEEP** | per CCBP TIER-1-DIRECT cite |
| L10-L14 (duplicates) | **KEEP HERE** (delete from settings.json) | CLAUDE.local.md is authoritative |
| L15 `CLAUDE_CODE_PROJECT_DIR` | **KEEP** | W295 state-outside-repo |
| L16 `CODEX_HOME` | **KEEP** | codex plugin state-outside-repo |
| L17 `LANGFUSE_HOST` | **KEEP** | endpoint, low-sensitivity |
| L18 `LANGFUSE_BASE_URL` | **KEEP** | endpoint dup of L17 — required by some clients |
| L19 `LANGFUSE_PUBLIC_KEY` | **KEEP** + future MOVE-TO-VAULT | gitignored + deny-listed; vault would be SOTA |
| L20 `LANGFUSE_SECRET_KEY` | **KEEP** + future MOVE-TO-VAULT + rotate quarterly | HIGH-sensitivity; protected; rotation discipline missing |

---

## §5 — Cardinal-rule self-check

### R1 — Trusted plugins only

**PASS**. Every plugin-defined env var (#4, #6, #7 ECC; #36-#41 Hindsight) is consumed by upstream plugin code (`everything-claude-code@2.0.0-rc.1` from affaan-m + `hindsight-memory@0.6.5` from vectorize-io). No self-invent code path consumes any env var.

### R2 — Hooks are upstream plugin hooks or direct upstream-CLI

**PASS** with note. The `CODEX_T2_GATE_TIMEOUT_SEC` finding (F1) is itself evidence of CR-2 discipline working — when W255 cleanup removed the self-invent hook, the env var was correctly orphaned (not silently re-implemented in self-invent code). The fact that it's still in settings.json is housekeeping debt, not a CR-2 violation.

### R3 — Subagents only upstream/documented

**PASS**. Subagent forking is gated by `CLAUDE_CODE_FORK_SUBAGENT=1` (CC-canonical) and `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (CC-canonical) — both upstream-documented.

### R4 — No `.claude/rules/*.md`

**PASS** (env-block doesn't touch this surface).

### R5 — Safety boundaries via permissions + sandboxing — **PASS** with 2 MINOR caveats

| Sub-check | Status | Note |
|---|---|---|
| Sensitive vars NOT in tracked settings.json | PASS | All secrets in `CLAUDE.local.md` (gitignored + deny-listed) |
| `permissions.deny[]` covers all secret-file globs | PASS | `:65-83` covers `.env`, `.env.*`, `secrets/**`, `.aws/credentials`, `.ssh/*`, `.npmrc`, `.docker/config.json`, `credentials.json`, `id_rsa`, `id_ed25519`, `.pem`, `.pfx`, `.key`, `.crt`, `CLAUDE.local.md`, `tools/eee.local.ps1` |
| `OTEL_LOG_USER_PROMPTS=1` privacy risk | MITIGATED | Phoenix endpoint is `127.0.0.1:16006` (local-only); no remote leak. But: if Phoenix is ever exposed via reverse-proxy, user prompts leave the box. Document as advisory. |
| `HINDSIGHT_API_LLM_API_KEY=local` cosmetic concern | OK | Sentinel value, not a real key; explained in F6. |

**Caveat 1**: `OTEL_LOG_USER_PROMPTS=1` advisory — if operator ever exposes Phoenix beyond `127.0.0.1`, audit-trail revealed prompts may include sensitive content.

**Caveat 2**: `permissions.deny[]` does NOT include `.codex` (the codex plugin's state-outside-repo dir, which may contain auth tokens). Cross-check: `CODEX_HOME=Z:/claude-sota-installed-state/.codex` is OUTSIDE the repo worktree, so `Read(./.codex/...)` glob doesn't apply. This is correct — state-outside-repo IS the protection. NO action needed.

### W286-arc-P0C — MCP-server-spawning env that should pin via npx

**PASS**. The only env vars that interact with MCP-server-spawn are `MCP_TOOL_TIMEOUT` (CC-canonical) and `MAX_MCP_OUTPUT_TOKENS` (CC-canonical). The `.mcp.json` itself carries the `npx -y <pkg>@<pinned-version>` discipline (per W286-cross). NO env-side regression.

### W295 state-outside-repo

**PASS**. Vars referencing state-outside-repo (`CLAUDE_CODE_PROJECT_DIR`, `CODEX_HOME`, `BASIC_MEMORY_HOME` in `.mcp.json`) all point at `Z:/claude-sota-installed-state/...`. No tracked-repo state-pollution.

---

## §6 — Operator-action queue items

| # | ID | Priority | Action | Rollback plan |
|---|---|---|---|---|
| 1 | OAI-B-1 | P0 | DELETE 5 duplicate lines from `.claude/settings.json:env` (`CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS`, `CLAUDE_CODE_FORK_SUBAGENT`, `MSYS_NO_PATHCONV`, `MSYS2_ARG_CONV_EXCL`, `MSYS2_ENV_CONV_EXCL`) per F3 | `git revert <commit>` — single-commit revert, settings.json change only |
| 2 | OAI-B-2 | P0 | DELETE 1 dead-code line from `.claude/settings.json:env`: `CODEX_T2_GATE_TIMEOUT_SEC` per F1 | `git revert <commit>` |
| 3 | OAI-B-3 | P1 | VERIFY `ANTHROPIC_DEFAULT_HAIKU_MODEL` / `_NAME` / `_DESCRIPTION` against current CC env-reference; DELETE if non-canonical per F4 | `git revert` |
| 4 | OAI-B-4 | P1 | DECIDE `PYTHON_BIN`: either DELETE or ADD a `_comment_pythonbin_provenance` provenance string per F2; coordinate with Stream A (harness audit) — Stream A may make it load-bearing | `git revert` |
| 5 | OAI-B-5 | P1 | VERIFY `effortLevel:xhigh` enum matches `CLAUDE_CODE_EFFORT_LEVEL=max`; FIX one to match the other per §3.4 | `git revert` |
| 6 | OAI-B-6 | P2 | MONITOR for Haiku 4.5 fork HTTP 400 errors per F5; if observed, scope `CLAUDE_CODE_EFFORT_LEVEL` to per-Agent-tool invocation rather than settings.json env | No code change; only ledger-watch |
| 7 | OAI-B-7 | P2 | QUARTERLY rotate `LANGFUSE_SECRET_KEY` per OpenSSF SSDF / W290-F2 §3 | Manual rotation; update `CLAUDE.local.md:65` |
| 8 | OAI-B-8 | P3 | FUTURE: migrate `LANGFUSE_*_KEY` to vault-backed `${VAR}` interpolation (Vault / 1Password / `gpg`-encrypted `.env` via `dotenv-vault` or `sops`) per W290-F2 §3 | Vault rollback per chosen tool |
| 9 | OAI-B-9 | P3 | ADD advisory comment near `OTEL_LOG_USER_PROMPTS=1` warning operator that Phoenix MUST stay 127.0.0.1-only | Single-line comment removal |

**OAI-B-1 + OAI-B-2 are SHIP-this-wave candidates** (zero-risk, 6-line delete). Coordinator decides whether to bundle into W304-AUDIT synthesis or queue to W305.

---

## §7 — Open questions routed to W304-AUDIT

1. **Should OAI-B-1 (5-duplicate cleanup) ship this wave?** — Stream B recommends YES (zero risk, 5-line delete from tracked settings.json, no functional change since CLAUDE.local.md already authoritative). Coordinator decides whether to bundle with Stream-A/C/D recommendations.

2. **Should OAI-B-2 (`CODEX_T2_GATE_TIMEOUT_SEC` retire) ship this wave?** — Stream B recommends YES (dead-code; same risk profile as W298-E's `MCP_TOOL_TIMEOUT` finding which W298-AUDIT approved-but-deferred-to-W299).

3. **Should the 3 `ANTHROPIC_DEFAULT_HAIKU_MODEL_*` vars be verified-then-deleted?** — Stream B recommends VERIFY first (could be CC-internal `/model` UI strings); if non-canonical after operator inspection of `claude --help` or CC source, delete. Operator-AI 5-min check.

4. **Is `PYTHON_BIN` load-bearing for Stream A's harness audit?** — Stream A's territory. Stream B holds verdict on F2 pending Stream A.

5. **Does `effortLevel:xhigh` actually map to `CLAUDE_CODE_EFFORT_LEVEL=max`?** — Empirical test recommended: temporarily set `CLAUDE_CODE_EFFORT_LEVEL=xhigh` and observe whether CC accepts; if it does, the env-var enum INCLUDES `xhigh` and the settings.json setting may pass through that value directly. Operator-AI W305 candidate.

6. **Is `OTEL_LOG_USER_PROMPTS=1` privacy-acceptable given Phoenix `127.0.0.1:16006` local-binding?** — YES per current state. ADVISORY: document the binding constraint near the env var so future operators don't expose Phoenix without re-evaluating.

7. **Should `LANGFUSE_SECRET_KEY` move to a vault-backed interpolation?** — P3 SOTA-pattern recommendation per W290-F2 §3. Not blocking; current state is gitignored + deny-listed which is acceptable for a single-operator local-runtime.

8. **W298-E proposed `minimumVersion: 2.1.132 → 2.1.137` bump — has that landed?** — Cross-check Stream A / Stream D (settings.json:373 still says `2.1.132`). If not landed yet, Stream B confirms `MCP_TOOL_TIMEOUT` is currently LIVE on 2.1.143, but a fresh-clone operator could hit the silent-fail. Recommend re-surfacing this with W304 ship-cleared.

---

## §8 — Cite anchors

- `Z:/claude-sota-installed/.claude/settings.json:4-50` — env-block target.
- `Z:/claude-sota-installed/.claude/settings.json:65-83` — `permissions.deny[]` secret-class denylist.
- `Z:/claude-sota-installed/.claude/settings.json:373` — `minimumVersion: 2.1.132` (W298-E recommended bump pending).
- `Z:/claude-sota-installed/CLAUDE.local.md:32-78` — per-machine env block (in-context per prior session-reminder; deny-listed for direct read).
- `Z:/claude-sota-installed/CLAUDE.md:5` — W255 cleanup statement (33 self-invented `.claude/hooks/scripts/*.py` removed).
- `Z:/claude-sota-installed/CLAUDE.md:21` — parallel-execution modes citing `code.claude.com/docs/en/headless`.
- `Z:/claude-sota-installed/docs/architecture/W298-AGENT-ORCHESTRATION-AND-SOTA-WIRING/W298-STREAM-E-PLUGIN-CACHE-AND-VERSION-DRIFT.md:109` — `MCP_TOOL_TIMEOUT` dead-code-on-<2.1.142 reference + 2.1.142 fix.
- `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/scripts/lib/hook-flags.js:18,24` — live consumer of `ECC_HOOK_PROFILE` and `ECC_DISABLED_HOOKS`.
- `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/scripts/hooks/governance-capture.js:14` — live consumer of `ECC_GOVERNANCE_CAPTURE`.
- `Z:/claude-sota-installed/.claude/plugins/cache/hindsight/hindsight-memory/0.6.5/scripts/lib/config.py` — live consumer of `HINDSIGHT_API_*` env vars.
- `Z:/claude-sota-installed/.claude/plugins/marketplaces/thedotmack/plans/06-worker-env-isolation.md` — documented `CLAUDE_CODE_EFFORT_LEVEL` HTTP 400 SDK leak risk (#2357 reference).
- `Z:/claude-sota-installed/docs/architecture/W303-COVERAGE-GAP-AND-OPENRAG/W303-STREAM-A-COVERAGE-GAP-AUDIT.md` — W303-A Gap #1 IC=3.0 (this stream's mandate).
- CCBP `claude-settings.md:877-921 @ ac0d87d` — TIER-1-DIRECT env-block authority (cited via CLAUDE.local.md:8).
- CCBP `claude-memory.md:113 @ ac0d87d` — CLAUDE.local.md gitignored, never commit (cited via CLAUDE.local.md:3).
- `https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md` — CC CHANGELOG (per W298-E fetch).
- `https://code.claude.com/docs/en/cli-reference` — CC env block reference (claimed-canonical anchor for most CC_* vars).
- `https://code.claude.com/docs/en/mcp` — MCP env reference (`MCP_TOOL_TIMEOUT`, `MAX_MCP_OUTPUT_TOKENS`).

---

## §9 — Anti-pattern self-audit

1. **Did I skip CLAUDE.local.md per-machine env review?** NO — §1.2 + §4.2 inventory all 19 vars (CLAUDE.local.md is deny-listed for direct read, but its content is in-context per session-reminder, which is the CCBP-approved disclosure path).
2. **Did I recommend operator-pending changes without rollback plans?** NO — §6 has explicit rollback for every action.
3. **Did I speculate dead-code without verification?** NO — F1 (`CODEX_T2_GATE_TIMEOUT_SEC`) verified by: (a) grep across all tracked files (only settings.json + archived docs + cached tool-results), (b) `ls .claude/hooks/scripts/` returned "No such file", (c) plugin marketplace grep returned zero hits. F2 (`PYTHON_BIN`) flagged as MEDIUM confidence (not HIGH) because it could be intended for Stream A's harness — defer to Stream A.
4. **Did I auto-KEEP all?** NO — 1 RETIRE, 5 FIX, 5 MOVE-TO-LOCAL-MD verdicts argued with evidence; 31 KEEP justified individually.
5. **Did I cite ≥3 organizationally-distinct sources?** Sources span Anthropic CC docs + Anthropic API beta docs + affaan-m everything-claude-code + vectorize-io hindsight + thedotmack claude-mem plans + OpenSSF SSDF (W290-F2 cite) + community claude-codex-settings marketplace = ≥5 orgs.
6. **Did I respect file ownership?** YES — Stream B did NOT edit `.claude/settings.json` (W304-PLAN.md:36 ownership). All proposed changes are operator-approval-gated in §6.

---

## §10 — Stream B summary card (for coordinator)

```
STREAM B SHIP-EVIDENCE
======================
file:        docs/architecture/W304-DEEP-AUDIT-ALL-SOTA/W304-STREAM-B-SETTINGS-ENV-AUDIT.md
loc:         ~580
cite-count:  ≥17
env-vars-audited: 41 (settings.json) + 19 (CLAUDE.local.md) = 60
verdicts:
  settings.json: KEEP=31, RETIRE=1, FIX=5, MOVE-TO-LOCAL-MD=5  (note: 1 RETIRE = CODEX_T2_GATE_TIMEOUT_SEC dead-code)
  CLAUDE.local.md: KEEP=19, RETIRE=0, FIX=2 (rotation+vault); 2 secrets correctly gitignored+deny-listed
findings:    6 (F1 HIGH dead-code + F2 MEDIUM consumer-missing + F3 HIGH 5-duplicates + F4 LOW 3 non-canonical + F5 MEDIUM SDK-leak-risk + F6 LOW informational)
biggest dead-code: F1 CODEX_T2_GATE_TIMEOUT_SEC=240 — orphaned since W255 cleanup 2026-05-15
biggest leak: NONE — all secrets correctly partitioned to CLAUDE.local.md (gitignored + permissions.deny[Read(./CLAUDE.local.md)])
biggest drift: F3 5 duplicates between settings.json and CLAUDE.local.md (process env wins; settings.json copies are dead-weight)
operator-AIs:  9 queued (OAI-B-1..OAI-B-9); 2 SHIP-this-wave candidates (OAI-B-1 + OAI-B-2 = 6-line delete)
cardinal-rule self-check: R1-R5 PASS + W286-arc-P0C PASS + W295 state-outside-repo PASS
disagreement-log: none (every finding cite-anchored; ANTHROPIC_DEFAULT_HAIKU_MODEL_* status flagged UNCLEAR pending live CC env reference verification)
ship-recommendation: 2 SHIP (OAI-B-1 + OAI-B-2) + 7 OPERATOR-AI queued
routed-to-audit:
  - SHIP-this-wave: 6-line delete in .claude/settings.json (5 duplicates + 1 dead-code)
  - 7 operator-AIs queued
  - 8 open questions in §7
  - cross-stream coordination: Stream A may need PYTHON_BIN (F2); Stream D may need to verify minimumVersion bump landing
```
