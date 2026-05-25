# W188 main-thread P0 audit

## P0-a per-folder counts

| folder | files | LOC_total | files_with_TIER1_cite | files_with_AMBER | files_w/o_any_cite |
|---|---|---|---|---|---|
| .claude/rules | 64 | 3037 | 49 | 52 | 1 |
| .claude/agents | 13 | 751 | 11 | 9 | 2 |
| .claude/skills | 22 | 1916 | 9 | 0 | 13 |
| .claude/hooks/scripts | 75 | 5581 | 44 | 8 | 23 |
| .claude/commands | 4 | 283 | 4 | 0 | 0 |
| scripts | 9 | 623 | 4 | 4 | 5 |
| tools | 16 | 1428 | 13 | 3 | 3 |
| docs | 2441 | 118673 | 163 | 80 | 2246 |
| manifests | (missing) | - | - | - | - |
| .codex | (missing) | - | - | - | - |
| bin | 3 | 137 | 3 | 0 | 0 |

## P0-b STRICT non-SOTA hook candidates (Top-15 by grep)

Strict non-SOTA (no upstream @ HEAD <SHA> external cite): **13/35**

Top candidates:
- _codex_plugin_root.py
- _codex_preflight.py
- agent_plan_readonly_bash_guard.py
- block_no_verify_guard.py
- codex_failure_audit.py
- codex_gate.py
- codex_review_queue.py
- codex_review_thread_bridge.py
- codex_stuck_detector.py
- fm17_class_lint.py
- safety_guard.py
- secret_scan_guard.py
- utils.py

## P0-c A1 split-brain CLAUDE.local.md:86-94 vs .claude/settings.json:25

### CLAUDE.local.md L86-100 (ENV i + j context):
L86: # (i) Auto-compact pre-emptive threshold override — fire native CC autocompact at ~70% instead of default ~80%
L87: # Cite-class: constituents=[TIER-2 cite-import-AMBER @ Z:/claude-sota/.claude/rules/coordination.md §12 "Rewind-first over correct-layered" (Thariq named-T2 2026-04-16 quote: "CLAUDE_AUTOCOMPACT_PCT_O
L88: # HONEST-NON-FINDING: env var name `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` NOT directly verified at https://code.claude.com/docs/en/env-vars this fire (context >540k near hard-ceiling — research-first defer
L89: # Rationale: post-compact hook chain re-inflation per fm20 row 15 (~80-100KB inject vs ~50KB net summary = ~13% reclaim @ 540k); firing autocompact earlier at 70% (~700k of 1M ceiling) reserves ~300k 
L90: # Activation: uncomment + restart eee. Banner unchanged; effect visible only at autocompact trigger time.
L91: # Revert: comment out — falls back to Anthropic CC default (~80% per coordination.md §12 row).
L92: # W180 F4 codification 2026-05-13 user-trigger explicit "compact at around 70% — auto compact with SOTA references" + cardinal-rule-9 install-risk discipline applied (env var reversible <1min via comm
L93: # W183 F1 REVERT 2026-05-13 — comment-out per operator directive "your runtime are extremely under performed" diagnosis: combined with auth fleet collapse (8/8 OAuth dead since 2026-05-08 + aperant_po
L94: # $env:CLAUDE_AUTOCOMPACT_PCT_OVERRIDE = '70'
L95: ```
L96: 
L97: ## Key Paths
L98: 
L99: | Path | Purpose | Status |
L100: |---|---|---|
L101: | `Z:\claude-sota-installed\` | This workspace | CREATED 2026-05-06 |
L102: | `Z:\claude-sota\` | **Sibling SOTA-evolving runtime** — active; cite source for inherited cardinal rules | ACTIVE |
L103: | `Z:\claude\` | **Parent CCC harness (backup)** — untouched | BACKUP |
L104: | `Z:\claude-sota-installed-state\` | State-outside-repo (CODEX_HOME + session JSONL) | TO BE CREATED post-codex-install |
L105: | `Z:\repos\deps\` | 673+ upstream repo directories — **DO NOT use for installs** (may be stale per cardinal-rule-6); use only for cite verification | CITE-REFERENCE-ONLY for this runtime |
L106: | `Z:\repos\deps\claude-code-best-practice-shan\` | CCBP HEAD `48f2ceb` — TIER-1 cite-anchor for cardinal rules | CITE-REFERENCE |
L107: | `Z:\venvs\claude\` | Python 3.13 venv (shared) | SHARED |
L108: 
L109: ## Services (planned for install — Tier-A install wave)
L110: 
L111: Currently EMPTY. Populated per `docs/sota-installed-manifest.md` install rows. Examples expected post-install:
L112: - Qdrant (vector DB) — `docker pull qdrant/qdrant:latest`
L113: - LiteLLM (LLM proxy) — `docker pull berriai/litellm:latest`
L114: - FalkorDB (graph DB for Graphiti) — `docker pull falkordb/falkordb:latest`
L115: - Ollama (local model runtime) — fresh install per `docs/install-from-github-discipline.md`

### settings.json L20-35 (env-block area):
L20:     "CLAUDE_CODE_ATTRIBUTION_HEADER": "0",
L21:     "CLAUDE_CODE_USE_POWERSHELL_TOOL": "1",
L22:     "CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS": "60000",
L23:     "ENABLE_PROMPT_CACHING_1H": "1",
L24:     "ENABLE_TOOL_SEARCH": "auto:5",
L25:     "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "70",
L26:     "CONTEXT_WINDOW_COMPACT_WARN_TOKENS": "350000",
L27:     "CONTEXT_WINDOW_COMPACT_HIGH_TOKENS": "500000",
L28:     "CONTEXT_WINDOW_COMPACT_CRIT_TOKENS": "600000",
L29:     "CONTEXT_WINDOW_WARN_PERCENT": "35",
L30:     "CONTEXT_WINDOW_CRITICAL_PERCENT": "60",
L31:     "OTEL_LOG_TOOL_DETAILS": "1",
L32:     "OTEL_LOG_USER_PROMPTS": "1",
L33:     "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
L34:     "CLAUDE_CODE_ENHANCED_TELEMETRY_BETA": "1",
L35:     "OTEL_TRACES_EXPORTER": "otlp",

### settings.json CONTEXT_WINDOW_COMPACT_* references:
L26: CONTEXT_WINDOW_COMPACT_WARN_TOKENS
L27: CONTEXT_WINDOW_COMPACT_HIGH_TOKENS
L28: CONTEXT_WINDOW_COMPACT_CRIT_TOKENS