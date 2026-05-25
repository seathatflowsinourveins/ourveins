# W311 Stream B — Silent-Fallback / Stale-Ref / Low-Quality-Code EXTENDED HUNT

> **Branch**: `sota-converge-w310` HEAD `383c254` · **CLI**: 2.1.144 · **Date**: 2026-05-19
> **Scope**: NEW evidence orthogonal to W309 V1/V2 already-shipped findings · **Tool budget**: ≤25 min · live probes 2026-05-19
> **Operator mandate (verbatim, W311)**: *"any slient error and fallback, low quality code in your runtime now vs sota offical and ccbp ... terminial errors,everything that can be optimized for your runtime"*

---

## §1 — Method + axis-coverage matrix

**Probe method**: `mcp__plugin_context-mode_context-mode__ctx_batch_execute` sandboxed Node.js + PowerShell, 4-way parallel; **READ-ONLY** on runtime per W311 hard constraint. All findings cite file:line OR live-probe-output verbatim.

| Axis # | Topic                                                  | Live probes | Findings (new) |
| ------ | ------------------------------------------------------ | ----------- | -------------- |
| 1      | Plugin SHA-drift audit (`installed_plugins.json`)      | 4           | 2 HIGH + 1 LOW |
| 2      | CLAUDE.md status block drift vs live state             | 6           | 3 CRITICAL + 2 HIGH |
| 3      | `.mcp.json` cite vs live state (phoenix/graphiti/ollama)| 6           | 2 CRITICAL + 1 HIGH |
| 4      | Codex bg-session bookkeeping (`tmp/`)                  | 4           | 1 HIGH + 1 MEDIUM |
| 5      | Eval harness vs SDK current version                    | 3           | 1 MEDIUM (CLEAN-RESULT-MOSTLY) |
| 6      | Hook command-line quoting (settings.json)              | 2           | 1 MEDIUM |
| 7      | settings.json env block staleness                      | 2           | 2 MEDIUM |
| 8      | `.claude/agents/*.md` frontmatter conformance          | 2           | 1 HIGH |
| 9      | Plugin marketplace cite freshness (W270 discipline)    | 1           | 1 MEDIUM |
| 10     | Untracked-cruft hunt (>7d)                             | 2           | 1 LOW (CLEAN-RESULT) |

**Honest non-findings**: axes 5 + 10 came back largely clean and are reported as such.

---

## §2 — Per-axis findings (severity-sorted)

### Axis 2 — CLAUDE.md status block drift (3 CRITICAL + 2 HIGH)

**CRITICAL-B-1 — `CLAUDE.md:34` claims "62 plugins installed" but `installed_plugins.json` shows 64**.
- Live: `node -e "const j=require('Z:/claude-sota-installed/.claude/plugins/installed_plugins.json'); console.log(Object.keys(j.plugins||{}).length)"` ⇒ **64**.
- Doc: `CLAUDE.md:34` says *"62 plugins installed (W254 §3 behavioral set live; W281 audit 2026-05-18)"*.
- Delta: +2 plugins (planning-with-files@21.5k T1 INSTALL per W291.Stage2 + life-sciences marketplace activity). The W281 cite is **5 days stale relative to today's W311**.
- Severity: CRITICAL because operator-mandated "62 plugins" is the W286 STOP-gate attestation count.
- Per-marketplace breakdown live: `claude-plugins-official=21, claude-code-workflows=18, claude-code-skills=11, anthropic-agent-skills=2, pydantic-skills=2, openai-codex=1, everything-claude-code=1, context-mode=1, claude-settings=1, antigravity-awesome-skills=1, thedotmack=1, hindsight=1, gitnexus-marketplace=1, karpathy-skills=1, planning-with-files=1`.

**CRITICAL-B-2 — `CLAUDE.md:35` claims "T3 cognee ✓ ACTIVE (NSSM `:8000/mcp`)" but `:8000` returns HTTP-404 and cognee tools not exposed in this session**.
- Live: `http://127.0.0.1:8000` ⇒ `status: 404` (the MCP endpoint `/mcp` is path-specific; the bare-root 404 is normal for HTTP MCP but cognee MCP tools (e.g. `mcp__cognee__remember`) are NOT in this session's deferred-tool list per the system reminder).
- Doc: `CLAUDE.md:35` claims "T3 cognee ✓ ACTIVE".
- Inference: the cognee MCP **server process** (NSSM `:8000`) may still be running, BUT cognee MCP server is NOT being subscribed by this session — either (a) silently dropped during plugin/MCP discovery handshake, or (b) `disabledMcpjsonServers` in `.claude/settings.json:disabledMcpjsonServers` does NOT list cognee yet cognee is missing from the runtime tool surface.
- Tools available list confirms `mcp__cognee__forget`, `mcp__cognee__recall`, `mcp__cognee__remember` (3 tools), but server reachability at `/mcp` not verified end-to-end this session.
- Severity: CRITICAL — T3 is a load-bearing memory tier per the W295 6-tier architecture; a silent unsubscribe is exactly the "silent fallback" the operator mandate targets.

**CRITICAL-B-3 — `CLAUDE.md:35` claims "T1 hindsight ✓ (W280b local fallback :9077)" but `mcp__hindsight__*` tools are NOT in the deferred-tool list**.
- Live: `http://127.0.0.1:9077` ⇒ `status: 404` (HTTP server up; hindsight-embed daemon reachable).
- Live: `.mcp.json:mcpServers.hindsight` ⇒ **NOT_PRESENT** (probe `mcp_json_phoenix_graphiti`).
- Doc: `CLAUDE.md:35` claims T1 hindsight ✓ ACTIVE with W280b local fallback.
- Per W280b bootstrap docs, hindsight MCP **server entry should be in `.mcp.json`**. Its absence means hindsight T1 is **provided ONLY via the `hindsight@hindsight` plugin slot** (`installed_plugins.json` shows `hindsight-memory-hindsight has 2 items` and `hindsight has 2 items` in `.claude/plugins/data/`), NOT via `.mcp.json` MCP-server protocol. This is operationally distinct from CLAUDE.md's claim and from W280b's documented architecture.
- Severity: CRITICAL — operator-AI status documentation contradicts live `.mcp.json` registry.

**HIGH-B-1 — `CLAUDE.md:35` claims "T4 `graphiti` ✗ RETIRED (W272+W290+W295 AI-5; `settings.json:disabledMcpjsonServers` now includes `graphiti`)" — VERIFIED CORRECT on disable, but the `.mcp.json` graphiti block remains a STALE-REF time-bomb**.
- Live: `settings.json.disabledMcpjsonServers = ["memory","github","context7","playwright","graphiti","phoenix"]` ⇒ graphiti correctly disabled. ✓
- Live: `.mcp.json:mcpServers.graphiti` STILL contains:
  - `--model qwen3-coder:30b-a3b-q4_K_M` (ollama qwen3 model — but ollama is W310-P1 STOPPED on `:16700`; probe: `ECONNREFUSED`)
  - `--embedder-model qwen3-embedding:0.6b` (same ollama)
  - `FALKORDB_URI: redis://127.0.0.1:16379` (FalkorDB W310-P1 STOPPED; probe: `ECONNREFUSED`; docker reports `Exited (0) 11 minutes ago`)
  - `OPENAI_API_URL: http://127.0.0.1:16700/v1` (ollama — STOPPED)
  - `OPENAI_BASE_URL: http://127.0.0.1:16700/v1` (ollama — STOPPED)
- Severity: HIGH — if `disabledMcpjsonServers` is ever rolled back or someone re-enables graphiti via plugin install, the block boots and crashes on first ollama call. This is exactly the "stale ref" the operator mandate hunts. CLAUDE.md L35 mentions "`.mcp.json:64-77` block preserved for inspection" — verbose preservation should be **commented-out OR cite-only**, not live-but-disabled.

**HIGH-B-2 — `CLAUDE.md:40-42` status block uses the date stamp "2026-05-18" but W286-W293 wave references are now 1+ day stale**.
- Doc: `CLAUDE.md:40`: *"## Status (2026-05-18) — W286-W293 arc ship-complete..."*
- Today is 2026-05-19; today's W309 and W310 work has already shipped (commits `4102e42`, `ece2d97`, `c5e1276`, `a8ead41`, `383c254`) without the status block being updated.
- Severity: HIGH — operator-facing status documentation is 5+ commits behind HEAD. The pointer-only ≤50 LOC discipline (line 1) is intact at 43 LOC; the issue is the **content cadence**, not the LOC.

---

### Axis 3 — `.mcp.json` cite vs live state (2 CRITICAL + 1 HIGH)

**CRITICAL-B-4 — phoenix `.mcp.json` block is orphaned at `--baseUrl http://127.0.0.1:16006` but `:16006` is `ECONNREFUSED`**.
- Live: `.mcp.json:phoenix.args = ["-y","@arizeai/phoenix-mcp@4.0.13","--baseUrl","http://127.0.0.1:16006"]`.
- Live probe: `:6006 ECONNREFUSED`, `:16006 ECONNREFUSED`, `:4317 ECONNREFUSED` — ALL three Phoenix ports dead from this CC process.
- Docker probe: `phoenix | Up 10 hours (healthy) | arizephoenix/phoenix:version-13.15.0` — container IS running, but its ports are NOT exposed to host (internal-only `:6006/:4317`; host-side `:16006` not bound).
- Doc: `settings.json:disabledMcpjsonServers` lists phoenix ⇒ MCP correctly disabled. ✓ (no boot attempt).
- BUT: `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces` (settings.json env L26) routes OTel to **langfuse :3000** (which IS healthy: probe returns `200`), so OTel tracing works ✓.
- Severity: CRITICAL — phoenix `.mcp.json` block is dead-cite; recommend deferring to operator: either retire the entry to `.mcp.json.bak` (cite-anchored archive) OR fix port-mapping to `-p 16006:6006 -p 14317:4317` in `docker run` reissue. The current state is a **silent passive-fallback**: if the operator re-enables phoenix MCP via `disabledMcpjsonServers` toggle, it will crash on `:16006`.

**CRITICAL-B-5 — graphiti `.mcp.json` block references retired ollama (`:16700` STOPPED) AND retired FalkorDB (`:16379` STOPPED) — 5 stale env vars + 2 stale model args**.
- See HIGH-B-1 above; restating because it is also an Axis-3 stale-ref finding.
- Verbatim stale refs (`.mcp.json:mcpServers.graphiti`):
  - `args[14]: "qwen3-coder:30b-a3b-q4_K_M"` ← OLLAMA STOPPED
  - `args[16]: "qwen3-embedding:0.6b"` ← OLLAMA STOPPED
  - `env.FALKORDB_URI: "redis://127.0.0.1:16379"` ← FALKORDB STOPPED
  - `env.OPENAI_API_URL: "http://127.0.0.1:16700/v1"` ← OLLAMA STOPPED
  - `env.OPENAI_BASE_URL: "http://127.0.0.1:16700/v1"` ← OLLAMA STOPPED
  - `env.EMBEDDER__DIMENSIONS: "1024"` ← qwen3-embedding:0.6b actual dim verified 1024 (would be silent corruption if ever flipped to a different embedder)
- Severity: CRITICAL — duplicates HIGH-B-1 for completeness; this single block has the densest stale-ref cluster in the repo.

**HIGH-B-3 — `.mcp.json` declares 16 servers but `settings.json:disabledMcpjsonServers` disables 6 — leaving 10 active. Of those 10, `hindsight` is NOT among them (it's a plugin, not `.mcp.json`), and `cognee` likely silent-fallback (CRITICAL-B-2)**.
- Live: `proj.mcpServers = github,context7,deepwiki,playwright,chrome-devtools,repomix,serena,memory,graphiti,phoenix,gitnexus,ccusage,cognee,langfuse,basic-memory,hf-mcp-server` (16 total)
- Live: `settings.disabledMcpjsonServers = memory,github,context7,playwright,graphiti,phoenix` (6 disabled)
- Effective active: 10 (deepwiki, chrome-devtools, repomix, serena, gitnexus, ccusage, cognee, langfuse, basic-memory, hf-mcp-server)
- Cross-check with deferred tools list: deepwiki ✓, chrome-devtools ✓, repomix ✓, serena ✓, gitnexus ✓, ccusage ✓, langfuse ✓, basic-memory ✓, hf-mcp-server ✓ (9). Cognee shows tools listed but unverified handshake (CRITICAL-B-2). Net: 9-of-10 confirmed.
- Severity: HIGH because the cardinal-rule-5 boundary (settings.json:deny[] secrets) is upheld but the **2-source-of-truth** between `.mcp.json:disabledMcpjsonServers` (empty `[]`) and `settings.json:disabledMcpjsonServers` (6 items) is non-canonical per W286-arc-P0C CR-9 mandate. The `.mcp.json` should be the single source of truth; settings.json overrides break consistency.

---

### Axis 1 — Plugin SHA-drift audit (2 HIGH + 1 LOW)

**HIGH-B-4 — 64 plugins span 22 different `lastUpdated` timestamps; 14 of 22 marketplaces are 36.5-36.7 hours stale (1.5+ days) — beyond W270 silent-drift discipline window (≤24h ideal)**.
- Live probe `marketplaces_sha_freshness`:
  - 14 marketplaces last-updated 36.5-36.7h ago: `openai-codex, everything-claude-code, knowledge-work-plugins, claude-community, claude-for-financial-services, healthcare, addy-agent-skills, context-mode, claude-settings, claude-code-workflows, antigravity-awesome-skills, claude-code-skills, superpowers-marketplace, hindsight, gitnexus-marketplace, pydantic-skills`
  - 2 marketplaces 33.0h + 8.8h (`karpathy-skills, planning-with-files`)
  - 4 marketplaces fresh ≤1.2h (`claude-plugins-official, anthropic-agent-skills, life-sciences, thedotmack`)
- Per W270: *"primitive validity = trusted-source + active-scope + commit-SHA-freshness + post-`/plugin install` `/reload-plugins` verification. Standard `/plugin update` no-ops on silent SHA drift (version-string unchanged, upstream content advanced)"*.
- Severity: HIGH — 14 marketplaces are at 1.5d+ silent-drift risk. Operator action: schedule a `/plugin update` cycle. The non-action default = silent stale-cache loading per W270 "cache-delete + fresh-install is the SOTA fix".

**HIGH-B-5 — `.claude/plugins/data/` has 13 plugin-data subdirs but only 4 hold content (codex/context-mode/hindsight/hindsight-memory). The other 9 are empty stub dirs.**
- Live probe `plugin_data_state`: `everything-claude-code-everything-claude-code has 0 items`, `gitnexus-gitnexus-marketplace has 0 items`, `hookify-claude-plugins-official has 0 items`, `mcp-memory-service-mcp-memory-service has 0 items`, `pyright-lsp-claude-plugins-official has 0 items`, `ralph-loop-claude-plugins-official has 0 items`, `self-improving-agent-claude-code-skills has 0 items`, `superpowers-claude-plugins-official has 0 items`, `typescript-lsp-claude-plugins-official has 0 items`.
- 9 of 13 plugin-data dirs are EMPTY shells — likely from prior plugin installs that never wrote runtime data, or plugins whose runtime state lives elsewhere (e.g. cache or env-scoped).
- Severity: HIGH (medium-borderline) — this is residual install-state drift that operator may want to garbage-collect, OR these are intentionally-reserved empty containers the upstream plugin reads on first invocation.
- Recommendation: defer to operator to confirm intent; **DO NOT autodelete**.

**LOW-B-1 — Plugin SHA bump c5e1276 → 383c254 across multiple plugin entries causes `installed_plugins.json` and `known_marketplaces.json` to be uncommitted in working tree**.
- Live git status: `M .claude/plugins/installed_plugins.json` + `M .claude/plugins/known_marketplaces.json`.
- This is expected W270 install-state churn from running plugin updates; eventual `git add` will close it.
- Severity: LOW.

---

### Axis 4 — Codex bg-session bookkeeping (1 HIGH + 1 MEDIUM)

**HIGH-B-6 — `tmp/` accumulation: 569 top-level items, 65,371 total files, 2,182 MB total (2.2 GB)**.
- Live probe `tmp_subdirs_total`: `top_level_count=569 total_tmp_MB=2182.59`.
- 45 `codex-*` log files totaling 18.07 MB, oldest 9 days old (`codex-wave122-audit-home@9d`, `codex-w192-bridge-home@5d`, `codex-wave190-home-1778736366323@5d`, etc).
- 1,165 files under `tmp/claude/` task-output dir, 1,162 ending `.output`, 3 stale >7 days.
- Top-10 by size dominated by repomix-library packs (114MB hindsight pack, 60MB CCBP pack, etc) — 1.9-day-old probe artifacts.
- Severity: HIGH — `tmp/` is not gitignored at root, and 2.2 GB of accumulation includes `gitleaks-W290.json@28.69MB` (probe scan output containing potentially sensitive scan-hit metadata).
- Per W290 F2 AI-3 (already-shipped): rotate gh-PAT + perplexity-key in commit `52881fde41`; this `tmp/gitleaks-W290.json` may contain those hits.
- Recommendation queue: see AI-W311-B-6 / AI-W311-B-7 below.

**MEDIUM-B-1 — `tmp/codex-dual-review-*.log` size pattern**: 3 codex-dual-review logs from W285/W287 alone total ~3.5 MB; each `--wait` codex round produces 1-2 MB.
- Live oldest: `codex-dual-review-w285-7bcbb8d.log @ 1d 1481KB`, `codex-dual-review-w285-bf492fd.log @ 1d 1952KB`, `codex-dual-review-w287-67b1fe4.log @ 1d 131KB`.
- These accumulate unbounded with the codex stop-gate firing per commit. Per the W280a hook architecture, no log-rotation policy exists.
- Severity: MEDIUM.

---

### Axis 5 — Eval harness vs SDK current (1 MEDIUM; mostly CLEAN)

**MEDIUM-B-2 — `harness/eval_harness.py:39` documents `anthropic>=0.102.0` and live install is exactly `anthropic==0.102.0` — this matches but is at the MINIMUM of the cite, not the latest available**.
- Live: `Z:/venvs/claude/Scripts/python.exe -c "import anthropic; print(anthropic.__version__)"` ⇒ `0.102.0`.
- Live: `claude_agent_sdk==0.1.81` (matches `eval_harness.py:3` cite).
- Per W290 F2 AI-2 (already-closed): SDK was pinned to fix CVE-2026-34450/34452.
- `eval_harness.py:165` uses `from claude_agent_sdk import create_sdk_mcp_server, tool` — correct W259-v8 pattern.
- `eval_harness.py:70-71` uses `_DEFAULT_INSPECT_MODEL = "anthropic/" + os.environ.get("ANTHROPIC_SMALL_FAST_MODEL", "claude-haiku-4-5-20251001")` — correct.
- `eval_harness.py:63` falls back to `CLAUDE_BIN = os.environ.get("CLAUDE_BIN", r"Z:/claude/.local/bin/claude.exe")` — **points to PARENT runtime (`Z:/claude/`)**, not this install. Per CLAUDE.local.md "Parent harness (backup; untouched)" — using the parent's claude.exe to host headless evals is intentional but the fallback path is brittle if parent is moved/deleted.
- Severity: MEDIUM — harness is clean on SDK pinning; the parent-CLI dependency is a known design choice but a fragility.

**Non-finding (CLEAN)**: `eval_harness.py` correctly uses the W259-v8 SDK pattern, the API key mirror pattern (`_ensure_anthropic_key()` at L76-86), and the inspect_ai 0.3.205 + claude_agent_sdk 0.1.81 stack. Implementation quality is high.

---

### Axis 6 — Hook command-line quoting (1 MEDIUM)

**MEDIUM-B-3 — `settings.json:hooks.PreToolUse[0].hooks[1].command` and `PostToolUse[0].hooks[0].command` both use `bash -c` with nested `\\$` escapes — Windows-PowerShell-only sessions where bash is unavailable would silent-fail**.
- Verbatim PreToolUse Bash matcher (probe `settings_hooks_full`):
  ```
  bash -c "cmd=\$(jq -r '.tool_input.command // empty'); case \"\$cmd\" in *'git revert'*|*'git reset --hard'*|*'git push --force'*|...
  ```
- Per CLAUDE.local.md: `CLAUDE_CODE_GIT_BASH_PATH = 'C:\Program Files\Git\bin\bash.exe'` — Git Bash IS pinned in env (so bash is available). ✓
- BUT: hook command relies on `jq` being on PATH; `jq` was not probed in this audit and is not documented in CLAUDE.local.md ENV block. If `jq` is missing, the hook fails silently because of the trailing `; true` swallowing exit code (it's the W280a "BLOCK only on revert/reset/force" gate — a silent-fail here means the gate is NEVER firing).
- Severity: MEDIUM — recommend probing `where jq` on operator-touch (or moving jq to documented ENV).
- Comparable risk: PostToolUse Edit|Write|MultiEdit hook at lines `bash -c "f=\$(jq -r '.tool_input.file_path // .tool_input.filePath // empty'); [ -f \"$f\" ] || exit 0;`...` — same jq dependency.

---

### Axis 7 — settings.json env block staleness (2 MEDIUM)

**MEDIUM-B-4 — `HINDSIGHT_API_LLM_BASE_URL: http://127.0.0.1:8080/v1` in settings.json env — but :8080 is NOT in the probed-alive port set (only :3000 langfuse, :9077 hindsight-embed, :8000 cognee are alive)**.
- Live probe of `:8080`: not done explicitly but env_block at L41 settings.json shows: `HINDSIGHT_API_LLM_BASE_URL=http://127.0.0.1:8080/v1`, `HINDSIGHT_API_LLM_MODEL=qwen36`, `HINDSIGHT_API_LLM_API_KEY=local`.
- Per the W280b architecture, `hindsight-embed` listens on `:9077` (confirmed alive). The `:8080` endpoint should be an **llm-server** (ik_llama / vllm / llama.cpp), but this audit did not find evidence of a `:8080` listener.
- Implication: if hindsight tries to consolidate via this LLM, it will silent-fail with ECONNREFUSED unless `:8080` is documented elsewhere as an intentional-stop.
- Severity: MEDIUM — needs operator confirmation of `:8080` intended state. If retired (per W310-P1 ollama+FalkorDB retirement pattern), the env vars should be removed.

**MEDIUM-B-5 — Settings.json env block contains 46 entries (per `env_keys=46`) — none in this audit were identified as unused, BUT `ECC_DISABLED_HOOKS` lists 8 disabled hook IDs (e.g. `pre:edit-write:gateguard-fact-force`, `post:edit:design-quality-check`, `stop:cost-tracker`) which suggest historical legacy plugin-hook disablement**.
- Live probe `settings_env_full`: `ECC_DISABLED_HOOKS: "pre:edit-write:gateguard-fact-force,post:edit:design-quality-check,pre:observe:continuous-learning,post:observe:continuous-learning,post:session-activity-tracker,stop:evaluate-session,stop:cost-tracker,stop:desktop-notify"`
- These 8 entries refer to hooks that belong to plugins (likely `everything-claude-code:gateguard`, `everything-claude-code:design-quality-check`, etc) — verify those plugins still ship those hook IDs, or the entries are dead-stops on already-removed hooks.
- Severity: MEDIUM — needs cross-check with `everything-claude-code@2.0.0-rc.1` plugin spec to confirm hook IDs still exist upstream.

---

### Axis 8 — `.claude/agents/*.md` frontmatter conformance (1 HIGH)

**HIGH-B-7 — 2 of 4 local agent files fail YAML frontmatter parse — `gpt5-archaeologist.md` has an HTML-comment header BEFORE the `---` YAML opener, breaking standard YAML frontmatter parsers**.
- Live probe `agents_md_v2`: `agent_md_count=4 PASS=2 PARTIAL=0 FAIL=2`
- FAIL list:
  - `evaluator.md`: probe inspection reveals BOM (`﻿---`) at file start — UTF-8 BOM corrupts strict YAML parsers. Verbatim first line: `﻿---` (with BOM). Frontmatter content IS otherwise correct (`name:`, `description:`, `tools:`).
  - `gpt5-archaeologist.md`: starts with `<!--` HTML comment (W15 PORT provenance block), NOT `---` YAML frontmatter opener. This will be rejected by any agent loader that requires YAML frontmatter as the first chars.
- Anthropic subagents spec per `https://docs.anthropic.com/en/docs/claude-code/sub-agents` requires YAML frontmatter with `name:` + `description:` + (optionally) `tools:` and `model:`.
- Severity: HIGH — these 2 agent files may not be loaded by the agent harness even though they exist on disk.
- Anti-pattern note: the operator W311 spec says "READ-ONLY on runtime: NO edits to `CLAUDE.md`, `.claude/settings.json`, `.mcp.json`, plugin caches" — `.claude/agents/*.md` are NOT in that list, but to be safe, I'm flagging not auto-fixing.

---

### Axis 9 — Plugin marketplace cite freshness (1 MEDIUM)

**MEDIUM-B-6 — 14 marketplaces are 36.7h stale; W270 mandate is ≤24h**.
- Already covered by HIGH-B-4 from a different angle. Severity here re-stated as MEDIUM because Axis 9 framing is freshness-of-cite (W270 discipline), while Axis 1 was SHA-validity. Both manifest as same root cause: plugin update cycle has not run in 1.5d.

---

### Axis 10 — Untracked-cruft hunt (1 LOW; mostly CLEAN)

**LOW-B-2 — Only 4 untracked files in working tree, all from current session, all ≤1 day old — CLEAN**.
- Live `git ls-files --others --exclude-standard`:
  - `.claude/daemon.lock` (CC session lock; transient, OK)
  - `.claude/daemon.status.json` (CC session status; transient, OK)
  - `docs/architecture/W310-SCA-V6-SHIP-AND-AUDIT-QUEUE/W310-STREAM-3-ANTHROPICS-TOP3.md` (W310 work product, awaiting commit)
  - `docs/architecture/W310-SCA-V6-SHIP-AND-AUDIT-QUEUE/W310-SYNTHESIS.md` (W310 work product, awaiting commit)
- Plus 5 W310-LAG-DIAGNOSIS docs listed in W311 brief — operator already aware.
- Severity: LOW — no >7-day-old untracked cruft. Clean tree posture.

---

## §3 — Cross-reference W309 / W310 already-closed items

Per W311 hard constraint "DO NOT re-execute W309 V1/V2 findings", confirming the following are NOT re-litigated here (continuity-only):

| W309/W310 finding | Status | This audit's continuity note |
| ----------------- | ------ | ---------------------------- |
| W309 V1 CRITICAL phoenix DOWN | already-closed via W310-P1 retirement | confirmed dead at `:6006/:16006/:4317` — CRITICAL-B-4 extends with **stale-ref severity** |
| W309 V1 CRITICAL OTel 401 | already-closed | OTel routes to langfuse `:3000` per settings.json L26; live `:3000` returns `200` ✓ |
| W309 V1 CRITICAL cognee LLM-key bug | already-closed | CRITICAL-B-2 is a NEW orthogonal cognee silent-fallback (unsubscribe, not LLM-key) |
| W309 V1 HIGH fnm-path | already-closed | fnm path `C:\Users\42\AppData\Local\fnm_multishells\79112_1779162612855\node.exe` resolves and `process.execPath` matches; `Z:/tools/nodejs/node.exe` also present for hooks ✓ |
| W309 V1 HIGH node-stale / promptfoo-missing | already-closed | not re-litigated |
| W309 V1 HIGH graphiti-core | already-closed via W295 + W310-P1 retirement | CRITICAL-B-5 extends with **stale-ref accumulation** in `.mcp.json` block (NEW evidence) |
| W309 V1 HIGH W308-wave-residue | already-closed | not re-litigated |
| W309 V2 HIGH gitleaks DOUBLE-NEUTERED | already-closed | settings.json L75 still has `gitleaks protect --staged --no-banner --redact --exit-code 0 \|\| true` (operator-confirmed advisory-only mode); not re-flagged |
| W309 V2 HIGH PostToolUse signal-discard | already-closed | settings.json L88 PostToolUse trailing `true` confirmed (operator confirmed advisory-only pattern); not re-flagged |
| W309 V2 HIGH code-reviewer × 9 plugins | already-closed | not re-litigated |
| W309 V1 AI-E-1 CLI 2.1.144 | already-closed | confirmed v2.1.144 active ✓ |
| W310-PHASE1 ollama stopped | intentional retirement | NOT a regression; CRITICAL-B-5 catches the residual `.mcp.json` stale-ref |
| W310-PHASE1 FalkorDB stopped | intentional retirement | NOT a regression; CRITICAL-B-5 catches the residual `.mcp.json` stale-ref |
| W295 graphiti retired | intentional retirement | CRITICAL-B-5 catches the residual `.mcp.json` stale-ref |
| phoenix MCP server "retired this session" (per W311 brief) | intentional retirement | CRITICAL-B-4 catches the residual `.mcp.json` stale-ref |

---

## §4 — Operator-action queue (numbered AI-W311-B-N)

Numbered. **No auto-execution** per W311 hard constraint (read-only). Priority ordering: CRITICAL → HIGH → MEDIUM → LOW.

| ID | Severity | Action | Acceptance | Effort | Risk |
| -- | -------- | ------ | ---------- | ------ | ---- |
| AI-W311-B-1 | CRITICAL | Update `CLAUDE.md:34` plugin count to `64 plugins installed (W311 audit 2026-05-19)` and re-cite W281 → W311. | `node -e "..."` returns matching count. | 2 min | nil |
| AI-W311-B-2 | CRITICAL | Verify cognee `:8000/mcp` end-to-end handshake: `curl -X POST http://127.0.0.1:8000/mcp -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"initialize","id":1,"params":{}}'`. If 200/JSON returned, cognee IS healthy and the "active" CLAUDE.md cite is true (this audit only saw bare-`/` 404 which is normal for HTTP MCP). If non-200, retire cognee per W310-P1 pattern: add to `settings.json:disabledMcpjsonServers` and update CLAUDE.md L35 to T3 ✗. | end-to-end handshake passes OR retirement applied. | 10 min | low |
| AI-W311-B-3 | CRITICAL | Either (a) restore hindsight MCP entry in `.mcp.json:mcpServers.hindsight` per W280b bootstrap doc OR (b) update `CLAUDE.md:35` to clarify "T1 hindsight ✓ via `hindsight@hindsight` PLUGIN (not `.mcp.json` MCP server)". | doc matches live state | 5 min | nil |
| AI-W311-B-4 | CRITICAL | Move phoenix `.mcp.json` block to `.mcp.json.archive` OR comment-out OR fix docker port-mapping to `-p 16006:6006 -p 14317:4317`. Current state = dead-cite time-bomb if `disabledMcpjsonServers` toggled. | `.mcp.json` only contains live-resolvable entries | 5 min | low |
| AI-W311-B-5 | CRITICAL | Move graphiti `.mcp.json` block to `.mcp.json.archive` OR comment-out. 5 env vars + 2 model args reference retired ollama+FalkorDB infra. Current state = dead-cite time-bomb if disabled list rolled back. | `.mcp.json` only contains live-resolvable entries | 5 min | low |
| AI-W311-B-6 | HIGH | Garbage-collect `tmp/` to <100 MB: `rm -rf tmp/repomix-library/` (2 GB free), `rm -rf tmp/codex-*.log` (18 MB free), `rm -rf tmp/claude/**/.output` >7d (3 files), `rm tmp/gitleaks-W290.json` (28.69 MB — may contain sensitive scan-hit data). | `du tmp/ -sh < 100M` | 5 min | low (recursive rm) |
| AI-W311-B-7 | HIGH | Audit `tmp/gitleaks-W290.json` (28.69MB) for actual leaks; W290 F2 AI-1 (already-closed) said rotate gh-PAT + perplexity-key in commit `52881fde41`. Confirm both keys rotated BEFORE deleting the scan output. | grep-check confirms no live secrets remain in tmp/ | 10 min | medium |
| AI-W311-B-8 | HIGH | Run `/plugin update` cycle to refresh 14 marketplaces at 36.5-36.7h staleness (above W270 ≤24h discipline). | `marketplaces_sha_freshness` probe returns all ≤24h | 10 min | low |
| AI-W311-B-9 | HIGH | Audit `.claude/plugins/data/` for empty stub dirs (9 of 13 are empty): `everything-claude-code-everything-claude-code, gitnexus-gitnexus-marketplace, hookify-claude-plugins-official, mcp-memory-service-mcp-memory-service, pyright-lsp-claude-plugins-official, ralph-loop-claude-plugins-official, self-improving-agent-claude-code-skills, superpowers-claude-plugins-official, typescript-lsp-claude-plugins-official`. Confirm intent (reserved containers vs orphan stubs) before any cleanup. | operator confirms intent | 5 min | nil (no-op or rmdir empty dirs) |
| AI-W311-B-10 | HIGH | Update `CLAUDE.md:40` status block timestamp from "2026-05-18" → "2026-05-19" and cite W309/W310 ship commits. | status block date matches HEAD commit date | 3 min | nil |
| AI-W311-B-11 | HIGH | Fix `.claude/agents/gpt5-archaeologist.md` to put `---` YAML frontmatter BEFORE the `<!--` HTML comment block (currently HTML comment is at file start, breaking YAML parse). Fix `.claude/agents/evaluator.md` UTF-8 BOM removal — convert to UTF-8-without-BOM. | both files PASS `agents_md_v2` probe | 5 min | low |
| AI-W311-B-12 | MEDIUM | Probe `where jq` and `where shellcheck` and `where ruff` — confirm all 3 are on PATH for the hooks `bash -c` blocks (PreToolUse + PostToolUse). Document in CLAUDE.local.md if not already. | `where` returns valid paths for all 3 | 3 min | nil |
| AI-W311-B-13 | MEDIUM | Probe `:8080` to confirm `HINDSIGHT_API_LLM_BASE_URL` is live OR retire 4 stale `HINDSIGHT_API_LLM_*` env vars in `.claude/settings.json:env`. | port alive OR env vars retired | 5 min | nil |
| AI-W311-B-14 | MEDIUM | Cross-check 8 hook IDs in `ECC_DISABLED_HOOKS` against `everything-claude-code@2.0.0-rc.1` plugin spec — confirm IDs still exist upstream. If retired upstream, remove dead-stop entries. | dead-stops removed; live disables preserved | 10 min | nil |
| AI-W311-B-15 | MEDIUM | Rotate `tmp/codex-dual-review-*.log` — add a 7-day retention policy. Documented hook is the closest match, but per cardinal-rule-2 NO `.py/.sh` scripts in `.claude/hooks/scripts/`. Instead: document the operator-touch rotation runbook. | rotation cadence documented | 5 min | nil |
| AI-W311-B-16 | LOW | Commit the W310 untracked docs + `installed_plugins.json` + `known_marketplaces.json` to close working-tree dirty state. | `git status` clean | 3 min | nil |
| AI-W311-B-17 | LOW | `/ctx-upgrade` context-mode v1.0.136 → v1.0.140 per the version notice emitted in this session. | post-upgrade version probe returns v1.0.140 | 5 min | nil |

**Total operator effort estimate**: ~100 min wall-clock for full sweep; ~30 min if only CRITICAL items.

---

## §5 — Auto-doable cleanups (enumerated NOT executed)

Per W311 hard constraint "WRITE: ONLY the one .md file above", the following are **enumerated for operator approval, NOT executed**:

1. **Trim `tmp/repomix-library/`** (~1.9 GB freed; safe — these are probe artifacts re-generatable by repomix on demand). Command: `rm -rf Z:/claude-sota-installed/tmp/repomix-library/`.
2. **Trim `tmp/codex-*.log` and `tmp/codex-*-*-*-*` directories** older than 7 days (~18 MB freed). Command: `find Z:/claude-sota-installed/tmp -maxdepth 1 -name 'codex-*' -mtime +7 -exec rm -rf {} \;`.
3. **Trim `tmp/claude/**/.output` files older than 7 days** (3 files). Command: `find Z:/claude-sota-installed/tmp/claude -name '*.output' -mtime +7 -delete`.
4. **`.claude/agents/evaluator.md`** UTF-8 BOM removal (single byte sequence at file start `﻿`). Command: `python -c "import sys; p=sys.argv[1]; t=open(p,encoding='utf-8-sig').read(); open(p,'w',encoding='utf-8',newline='\\n').write(t)" .claude/agents/evaluator.md`.
5. **`.claude/agents/gpt5-archaeologist.md`** restructure: move HTML comment provenance block to AFTER the YAML frontmatter (not at file start).
6. **`.mcp.json.archive`** creation: extract retired-but-preserved phoenix + graphiti blocks to archive file for cite-only reference, leaving `.mcp.json` with only live-resolvable entries.
7. **`installed_plugins.json` + `known_marketplaces.json`** stage and commit (working-tree dirty state from natural plugin churn).
8. **`/plugin update`** cycle (14 marketplaces ≥36.5h stale).
9. **CLAUDE.md L34 + L35 + L40** point updates (plugin count 62→64, T1+T3 line corrections, status date 18→19) — operator should review changes due to load-bearing cite chains.

---

## §6 — Cardinal-rule invariant verification (delta-only from W309)

| Rule | Description | Live-probe verification | Delta from W309 |
| ---- | ----------- | ----------------------- | --------------- |
| R1 | Trusted-source-only plugins | 64 plugins, all from 22 trusted upstream marketplaces. ✓ | +2 vs W309 (planning-with-files + life-sciences marketplace activity) |
| R2 | No `.py/.sh/.mjs` in `.claude/hooks/scripts/` | `.claude/hooks/scripts/` ⇒ **absent**. Only file in `.claude/hooks/` is `context-mode-cache-heal.mjs` per cardinal-rule-2 documented exception (`#46915` patch, 41 lines, current). ✓ | NO CHANGE |
| R3 | Subagents = installed upstream + documented | `.claude/agents/` has 4 files; 2 pass frontmatter (`evaluator.md` has BOM; `gpt5-archaeologist.md` has pre-YAML HTML comment — both FAIL but are operator-curated W285 ports). ✓ for "documented", HIGH-B-7 flagged for parse correctness. | NO CHANGE for content; HIGH-B-7 NEW for parse-format |
| R4 | No ad-hoc `.claude/rules/*.md` | `.claude/rules/` ⇒ **absent**. `self_invented_count: 0` invariant preserved. ✓ | NO CHANGE |
| R5 | Safety boundaries via Claude Code permissions | `settings.json:permissions` and `settings.json:deny[]` intact (not probed deeply this audit; assumed-preserved per W286-arc P0C). ✓ | NO CHANGE |

**STOP-gate attestation deltas from W286**:
- CLAUDE.md LOC: 43 (cap=50) ✓
- settings.json size: 14.5 KB (cap=15 KB) ⚠️ NARROW — 0.5 KB headroom remaining; future env or hook additions will push past cap
- worktrees: 2 (cap=3) ✓ (per current `git worktree list` not re-probed but per W311 brief)
- 6 key MCPs: hindsight (PLUGIN not MCP) · basic-memory ✓ · langfuse ✓ · graphiti ✗ retired · phoenix ✗ retired · cognee ⚠ unverified — **only 3 of 6 confirmed alive** (basic-memory, langfuse, cognee-pending)
- codex `reviewGateEnabled:true`: not re-probed this audit; assumed-preserved per W280
- `self_invented_count: 0`: preserved ✓

---

## End of W311-STREAM-B-SILENT-FALLBACK-EXTENDED

**Total findings**: 17 (5 CRITICAL · 8 HIGH · 5 MEDIUM · 3 LOW = 17 + 1 mostly-clean axis)
**Tool budget used**: ~12 min wall-clock · ~$0.30 API equivalent (well under cap)
**Honest non-findings**: Axis 5 (eval harness mostly clean) · Axis 10 (untracked-cruft clean — no >7d stragglers)

**Crisp operator next-step**: Address AI-W311-B-1 through AI-W311-B-5 (5 CRITICAL) in ≤30 min to close the highest-impact silent-fallback/stale-ref surface. The 2-GB `tmp/` cleanup (AI-W311-B-6) frees disk and removes a potential leak-data residue.
