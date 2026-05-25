# W346 Stream-A — Runtime Deep Audit

> Wave: W346-FULL-SOTA-UNLEASH · Stream: A (runtime audit)
> Date: 2026-05-20
> Branch: `w344-sota-unleash` (HEAD `72665d7` W345 verdict ledger)
> Protocol: Δ-PDM-1 skeleton-first; verify-before-claim per cardinal-rule-6
> Author: Stream-A (forked subagent of W346 orchestrator)

## §1 Hooks deep audit (settings.json + plugin hooks.json + cardinal-rule-2 ≤2KB)

### A. `.claude/settings.json:hooks` enumeration (verified probe Z:/claude-sota-installed/.claude/settings.json:116-281)

| Event | Matcher | Command-shape | Direct-CLI? |
|---|---|---|---|
| SessionStart | * | `node Z:/.../.claude/hooks/context-mode-cache-heal.mjs` | **NO — project-owned `.mjs` shim** |
| UserPromptSubmit | * | `node tools/parallel-guard-userpromptsubmit.mjs` | **NO — project-owned** |
| PreToolUse:Bash | (3 hooks) | gitleaks; trivy; codex-companion adversarial-review | direct-CLI (gitleaks/trivy/codex are CLIs) |
| PreToolUse:Edit\|Write | * | inline-bash + jq + grep VERDICT-LEDGER | inline-bash direct-CLI |
| PreToolUse:Agent | (3 hooks) | `node tools/preagent-{parallel-guard,subagent-validator,d73-gate}.mjs` | **NO — 3 project-owned `.mjs`** |
| PostToolUse:Edit\|Write\|MultiEdit | * | inline-bash → ruff/shellcheck | direct-CLI |
| PreCompact:auto | * | powershell Add-Content audit-log | direct-CLI |
| Stop:* | * | `node tools/stop-position-swap.mjs` | **NO — project-owned** |
| WorktreeRemove | * | `git worktree prune` | direct-CLI |
| SubagentStop | (2 hooks) | `node tools/subagent-stop-{audit,guard}.mjs` | **NO — 2 project-owned** |
| Notification | * | powershell Console.Beep | direct-CLI |
| **PostToolUseFailure** | Bash | powershell ConvertFrom-Json filter | direct-CLI **but see Finding F1.6** |
| TaskCompleted | * | `ruff check tools harness` | direct-CLI |

### B. Project-owned hook bodies — cardinal-rule-2 ≤2KB compliance probe

`wc -c` against every project-owned hook target (probe Z:/claude-sota-installed/ via Bash):

| File | Size (B) | Over 2KB? | Cardinal-Rule-2 status |
|---|---|---|---|
| `.claude/hooks/context-mode-cache-heal.mjs` | **1,656** | NO (≤2048) | **COMPLIANT** (the W332-sanctioned anthropics/claude-code#46915 shim — verified STILL OPEN per CLAUDE.md L19) |
| `tools/preagent-parallel-guard.mjs` | **20,612** | YES (10.1×) | **VIOLATION** (CR-5-exception condition-(b) sanctioned per W330 r1 — but no `≤2KB` exception cite) |
| `tools/preagent-subagent-validator.mjs` | **5,507** | YES (2.7×) | **VIOLATION** (Δ-DPA-5 sanctioned — no `≤2KB` exception cite) |
| `tools/preagent-d73-gate.mjs` | **11,474** | YES (5.6×) | **VIOLATION** (no documented W-wave exception cite at all) |
| `tools/parallel-guard-userpromptsubmit.mjs` | **3,916** | YES (1.9×) | **VIOLATION** (no documented exception cite) |
| `tools/stop-position-swap.mjs` | **10,141** | YES (5.0×) | **VIOLATION** (no documented exception cite) |
| `tools/subagent-stop-audit.mjs` | **2,027** | NO (≤2048) | COMPLIANT |
| `tools/subagent-stop-guard.mjs` | **5,596** | YES (2.7×) | **VIOLATION** (no documented exception cite) |
| `tools/eee-status.ps1` | 9,386 | n/a (not a hook target) | N/A — launcher script, not a hooks.* entry |

**Total cardinal-rule-2 violations: 6 hook-targets >2KB**. The `tools/` path NOT under `.claude/hooks/**` (the CR-2 violation-zone) — but cardinal-rule-2's *intent* per CLAUDE.md L19 is "No project-owned hook bodies (any extension … under `.claude/hooks/**`)". The pre-commit `cr2-2kb-hooks` gate (probe `.pre-commit-config.yaml:107-114`) only scans `.claude/hooks/` — `tools/` IS NOT GATED, making this a discoverable evasion path.

**Pre-commit gate scope mismatch**:
- CLAUDE.md L19 cite: "extension `.py|.sh|.mjs|.js|.ts|.ps1|.bat` under `.claude/hooks/**`"
- `.pre-commit-config.yaml:109` actual gate: `git diff --staged --name-only --diff-filter=AM | grep -E "^\.claude/hooks/"`
- Settings.json reality: 5+ `tools/preagent-*.mjs` + `tools/stop-position-swap.mjs` + `tools/subagent-stop-*.mjs` + `tools/parallel-guard-userpromptsubmit.mjs` invoked as PreToolUse[Agent]/Stop/SubagentStop/UserPromptSubmit hook commands

### C. Plugin-shipped hooks (CR-2 W332 audit-trap surface)

| Plugin | hooks.json location | Hook events |
|---|---|---|
| `openai-codex/codex/1.0.4` | `cache/openai-codex/codex/1.0.4/hooks/hooks.json` | SessionStart + SessionEnd + Stop (review-gate, 900s timeout) |
| `everything-claude-code/2.0.0-rc.1` | `cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/hooks/hooks.json` | PreToolUse:Bash dispatcher · Write doc-warning · Edit\|Write suggest-compact · pre:observe (async) · governance-capture · config-protection · mcp-health-check · … (8+ hook entries) |
| 17 hookify SHAs cached | `cache/claude-plugins-official/hookify/*/hooks/hooks.json` | DISABLED in settings (`hookify@claude-plugins-official: false`) — but **17 hookify cache SHA dirs persist** = leftover cache drift |
| dash0 / outputai | `cache/claude-plugins-official/dash0/0.1.2`, `outputai/0.2.1` | hooks.json present; plugins disabled in settings |
| addy-agent-skills `1.0.0` | `cache/addy-agent-skills/agent-skills/1.0.0` | hooks.json present (enabled) |

**W332 audit-trap reaffirmed**: empty `settings.json:hooks.Stop:[]` does NOT mean Stop-hook absent — codex `1.0.4` Stop-review-gate (900s timeout) loads via plugin `hooks.json` separately. The W344 Z5 finding "F5 — Plugin-shipped hook visibility" remains LOW-OPEN — no `tools/list-active-hooks.mjs` operator-audit tool exists yet.

### Finding F1.1 — CR-2 violation surface NOT captured by pre-commit gate — SEV: HIGH

Six project-owned hook bodies exceed 2KB but live under `tools/` (not `.claude/hooks/**`), making them invisible to the `cr2-2kb-hooks` pre-commit gate. CLAUDE.md L19 cardinal-rule-2 SPIRIT (any-project-owned-hook-body ≤2KB) IS violated; LETTER (`.claude/hooks/**` path-scoped) IS NOT. The pre-commit gate's path filter is too narrow.

**Recommendation**: Expand pre-commit `cr2-2kb-hooks` to include `tools/preagent-*.mjs`, `tools/stop-position-*.mjs`, `tools/subagent-stop-*.mjs`, `tools/parallel-guard-*.mjs` — OR document each of these 6 files as CR-5-exception-condition-(b) sanctioned with explicit per-file cite-anchor + size waiver in CLAUDE.md.

### Finding F1.2 — `tools/preagent-d73-gate.mjs` (11,474 B) has NO documented exception cite — SEV: HIGH

Probe via `grep -rn "d73-gate" CLAUDE.md docs/architecture/` returns no W-wave creating-cite for this 11KB hook. The CR-5-exception condition-(b) requires explicit per-W-wave sanctioning. d73-gate's existence is not anchored to any wave-cite in CLAUDE.md or in W340/W341/W342/W343/W344 verdict ledgers.

**Recommendation**: Either (a) excise the hook entirely, (b) shrink it to ≤2KB shim that calls out to a `tools/lib/d73-gate-core.mjs` (the lib is not a hook body), or (c) add explicit W-wave sanctioning with cite-anchor.

### Finding F1.3 — 17 hookify cache SHA dirs persist despite plugin disabled — SEV: LOW

`hookify@claude-plugins-official=false` in settings.json yet 17 cache-SHA directories at `.claude/plugins/cache/claude-plugins-official/hookify/*/` remain. Cardinal-rule-1 W270 corollary: stale cache = SHA-drift risk.

**Recommendation**: `rm -rf .claude/plugins/cache/claude-plugins-official/hookify/` per W270 governance.

## §2 Stale references (CLAUDE.md cite-chain freshness)

### A. CCBP HEAD cite-chain

CLAUDE.md L5 claims CCBP HEAD `a28cd96b` per W342 X4 cross-SHA chain. Local clone state probe via `cd Z:/repos/deps/claude-code-best-practice-shan && git rev-parse HEAD`: **NOT PROBED THIS WAVE** — last verified W342 X4 2026-05-20 (today). HOLDS pending operator probe. Stream-A cannot independently verify upstream advance without external network (browser/perplexity could check; out-of-budget here).

### B. CLAUDE.md self-claim count mismatches

| Self-claim (CLAUDE.md) | Actual probe | Drift |
|---|---|---|
| L67 "53 local skills" | `ls .claude/skills/` count — NOT PROBED (out-of-budget) | UNVERIFIED |
| L67 W344 "skill count 50→53 + ledger refresh" cite | git log `--oneline | grep W344` | confirmed `52378ac` |
| L77 "enabled_true=46" canonical | actual settings.json count: **47 enabled_true / 11 enabled_false / 58 total** | **+1 drift on enabled_true** (matches L78 "single-flip self-improving-agent=false") but the count delta wording at L77 says "enabled_true 59→58" — **inconsistent with the actual count**. CLAUDE.md L77 is STALE/CONFUSED. |
| L80 "context-mode 1.0.146 active" | `ls cache/context-mode/context-mode/` shows BOTH `1.0.141` and `1.0.146` | **stale 1.0.141 dir not pruned** (W270 governance gap) |

### C. docs/architecture/* dead-link survey — NOT PROBED THIS WAVE (out-of-budget)

W340-Stream-A/W344-Z6-stale-clean is the canonical staling-cleanup stream — this audit references that as prior-art. No NEW dead-link sweep performed. CARRY-FORWARD to a future wave.

### Finding F2.1 — CLAUDE.md L77 plugin-count wording inconsistent — SEV: MEDIUM

L77 text "enabled_true 59→58" contradicts actual `47/11/58` count (47 true vs claim of 58). The "58" appears to be `total`, not `enabled_true`. Wording needs reflow: e.g. "enabled_true=47 enabled_false=11 (total=58)".

### Finding F2.2 — context-mode `1.0.141` stale cache dir persists — SEV: LOW

Active is `1.0.146`; `1.0.141` directory should be deleted per W270 cache-pruning hygiene. Same pattern as the 17 hookify dirs in F1.3 — same fix-shape: `rm -rf .claude/plugins/cache/context-mode/context-mode/1.0.141`.

## §3 Silent fallbacks

### A. parallel_ratio gate — DWELL-CLASS

Latest measurement: `.claude/state/parallel-ratio-W343.json` (probed):
- denom=1750 / parallel_turns=6 / **parallel_ratio = 0.0034**
- gate_status = **FAIL** (0.0034 << 0.05 PASS-threshold; far below 0.30 stretch)
- baseline_W342_Z = 0.003; delta_abs = +0.0004 (statistical noise)

**Interpretation**: W330 P0-A binding-gate fix (exit-2 on 2nd-violation) did NOT move the needle. **CLAUDE.md L23 still cites "Target parallel_ratio ≥0.7"** vs actual 0.0034 = **0.5% of target**. The W329-D root-cause (advisory exit 0) was fixed, but parallel_ratio is still observably-low → either (1) the binding-gate fires too rarely (single-violation advisory + 2nd-violation block lets sessions stay solo), or (2) most CC sessions in the window genuinely had no multi-stream signal.

### B. subagent_type validation soft-fail

`tools/preagent-subagent-validator.mjs` per CR-5-exception condition-(b): soft-fail exit 0 fires when `state/subagent-type-allowlist.json` is deleted/corrupted. This is documented in CLAUDE.md L39 as "operator-broken-state fallback" — sanctioned. **Probe-NOT-required**.

### C. agent-team experimental flag

`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` set in settings.json line 9 → confirmed active. `teammateMode: "in-process"` (line 504) → in-process teammate mode. Consistent with CLAUDE.md L13.

### D. Codex Stop-gate path

`.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` Stop-hook present with 900s timeout. Settings.json line 211-221 ALSO defines `hooks.Stop: tools/stop-position-swap.mjs` — **TWO Stop-hooks fire on the same event**. The codex Stop-review-gate is the W331 P0.7 FRONTIER-PEER authority; `stop-position-swap.mjs` is an audit/lint that adds. Risk: both hooks can compete for the Stop event budget.

### Finding F3.1 — parallel_ratio gate FAIL with stale W343 measurement — SEV: HIGH

The W343 measurement (`parallel-ratio-W343.json` measured_at `2026-05-20T21:47:49Z`) reports 0.0034 vs CLAUDE.md target 0.7. The W344 verdict ledger §3 marks `P0.2 parallel_ratio` as `DWELL-CLASS: P0.2_WALL_CLOCK_GATE` — meaning operator is waiting for 7+ days of post-W330-fix traffic to re-measure. **No W344 measurement file** (`parallel-ratio-W344.json`) exists yet. The DWELL-clock IS the silent-fallback here — closure deferred by wall-clock rather than fix.

**Recommendation**: Either acknowledge in CLAUDE.md L23 that the 0.7 target is aspirational + may take N waves to reach, OR identify a deeper root-cause (e.g. is the hook firing-rate too low, or is it firing correctly but the multi-stream signal detection is too narrow?).

### Finding F3.2 — Two Stop-hooks racing on same event — SEV: MEDIUM

Both `settings.json:hooks.Stop` (tools/stop-position-swap.mjs, 5s timeout) and `cache/openai-codex/codex/1.0.4/hooks/hooks.json:Stop` (codex review-gate, 900s timeout) fire on Stop. Likely intentional (audit + review-gate) but not documented in CLAUDE.md.

**Recommendation**: Document the dual-Stop wiring in CLAUDE.md or stream-doc.

### Finding F3.3 — `parallel-guard-bypass.marker` still active — SEV: MEDIUM

Marker `.claude/state/parallel-guard-bypass.marker` reads "Created 2026-05-20 … Expires at W344 closure commit OR 24h". W344 has CLOSED (W345 verdict ledger at HEAD), so the marker SHOULD have been removed. The marker is STILL PRESENT → bypass is still active for this W346 stream.

**Recommendation**: `rm .claude/state/parallel-guard-bypass.marker` (W344 closed; marker stale).

## §4 Insights-feature parity (ENABLE_TOOL_SEARCH, ENABLE_PROMPT_CACHING_1H, OTEL_*, CLAUDE_CODE_INSIGHTS_* vs CCBP + ECC + anthropics docs)

### A. CCBP insights primitives (cross-referenced from W344 Z2-insights-parity.md + this audit's CCBP grep)

| Primitive | CCBP cite | Runtime status |
|---|---|---|
| `/insights` (built-in CC command #23) | `claude-commands.md:65` | **PRESENT** (built into `claude` binary; no install needed) |
| `/usage` `/cost` `/stats` (built-in) | `claude-commands.md:64,66` | **PRESENT** (built-in) |
| OTel env vars | `claude-settings.md:779-999` | **EXCEEDS** — actively wired to `127.0.0.1:3000` Langfuse |
| `session-report` (3rd-party plugin) | NOT in CCBP | PRESENT (installed) |
| `context-mode:ctx-insight` | 3rd-party | PRESENT (W340 F1) |
| **`CLAUDE_CODE_INSIGHTS_*` env-flag family** | **0 matches in CCBP** | **DOES NOT EXIST AS A FAMILY** |

### B. Settings.json env-flag inventory vs CCBP-blessed primitives

Probed settings.json:env (lines 5-53):

| ENV var | Status | CCBP cite or stream |
|---|---|---|
| `CLAUDE_CODE_FORK_SUBAGENT=1` | sanctioned | CLAUDE.md L13 |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | sanctioned | CLAUDE.md L13 |
| `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1` | sanctioned per CCBP | claude-settings.md (CCBP) |
| `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING=1` | sanctioned per CCBP | claude-settings.md |
| `ENABLE_TOOL_SEARCH=auto:5` | sanctioned per CCBP | claude-settings.md (tool-search) |
| `ENABLE_PROMPT_CACHING_1H=1` | sanctioned per CCBP | claude-settings.md (1h cache) |
| `CLAUDE_CODE_ENABLE_TELEMETRY=1` | sanctioned per CCBP | claude-settings.md:779 |
| `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` | UNVERIFIED — beta-flag | CHECK against CCBP HEAD |
| `OTEL_*` (8 vars) | sanctioned | claude-settings.md:779-999 |
| `OTEL_LOG_TOOL_DETAILS=1` | UNVERIFIED — non-CCBP-cited | CHECK against OTEL spec |
| `OTEL_LOG_USER_PROMPTS=1` | UNVERIFIED — non-CCBP-cited | CHECK against OTEL spec |
| `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` | UNVERIFIED | CHECK CCBP HEAD |
| `MAX_MCP_OUTPUT_TOKENS=50000` | sanctioned | claude-settings.md |
| `BASH_MAX_TIMEOUT_MS=1800000` | sanctioned | claude-settings.md |
| `MCP_TOOL_TIMEOUT=300000` | sanctioned | claude-settings.md |
| `CLAUDE_CODE_EFFORT_LEVEL=max` | UNVERIFIED — non-CCBP-cited | CHECK CCBP HEAD |
| `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK=1` | UNVERIFIED | CHECK CCBP HEAD |
| `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE=1` | UNVERIFIED | CHECK CCBP HEAD |
| `CLAUDE_CODE_SYNC_PLUGIN_INSTALL=1` | UNVERIFIED | CHECK CCBP HEAD |
| `ECC_DISABLED_HOOKS=pre:observe,post:observe` | ECC-specific | ECC docs |
| `MSYS_HOOKS_FORM_GATE_ENFORCE=1` | UNVERIFIED — looks project-specific | CHECK if upstream |

### C. Missing CCBP insights primitives

**Zero confirmed-missing primitives** — `/insights` is built-in. **However: `CLAUDE_CODE_INSIGHTS_*` env-flag family DOES NOT EXIST in CCBP** (zero matches in `Z:/repos/deps/claude-code-best-practice-shan/best-practice/`). The W346 predicate's hypothesis "CLAUDE_CODE_INSIGHTS_* enable-flags vs CCBP" was a **fishing hypothesis with no upstream basis**.

### Finding F4.1 — `CLAUDE_CODE_INSIGHTS_*` is a fishing hypothesis (zero CCBP basis) — SEV: LOW

Stream-A grep across CCBP best-practice/ returns zero matches for `CLAUDE_CODE_INSIGHTS_` or `INSIGHTS_DIR`/`INSIGHTS_EXPORT`. The hypothesis is closed-NEGATIVE — no missing primitive. W344 Z2-insights-parity.md decision NO-OP still holds.

### Finding F4.2 — 6 env-flags in settings.json have NO CCBP cite-anchor — SEV: MEDIUM

`CLAUDE_CODE_ENHANCED_TELEMETRY_BETA`, `OTEL_LOG_TOOL_DETAILS`, `OTEL_LOG_USER_PROMPTS`, `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY`, `CLAUDE_CODE_EFFORT_LEVEL`, `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK`, `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE`, `CLAUDE_CODE_SYNC_PLUGIN_INSTALL`, `MSYS_HOOKS_FORM_GATE_ENFORCE` — none probed against CCBP `claude-settings.md` in this stream's probe. May be valid upstream flags that just weren't enumerated; may be fabrications. **Cardinal-rule-6 verify-before-claim applies — each needs an independent cite.**

**Recommendation**: Each env-flag entry in `.claude/settings.json:env` should have an inline JSON5-style comment with CCBP cite (e.g. `claude-settings.md:779`) — current state is bare key-value with no provenance.

### Finding F4.3 — OTel `OTEL_LOG_USER_PROMPTS=1` is privacy-sensitive — SEV: MEDIUM

If real, this exports raw user-prompts to the Langfuse OTel endpoint. Combined with `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` (line 24, which says DON'T capture message content), the two are CONTRADICTORY. Audit which one actually wins at runtime; current configuration is ambiguous.

## §5 Shell/terminal/CLI SOTA gaps

### A. Probed versions

| Tool | Installed | SOTA-current (claimed in CLAUDE.md) | Status |
|---|---|---|---|
| node | v22.22.0 | v22+ per W332 axis | OK (matches gitnexus engines.node 20→22 bump cited W342) |
| git | 2.51.0.windows.2 | latest stable | OK |
| docker | 29.4.3 | 27+ as of Dec 2024 baseline | **AHEAD of SOTA baseline** — verify 29.x is GA, not RC |
| PowerShell | n/a — `defaultShell: powershell` in settings line 288 | PS 7+ | UNVERIFIED — `pwsh --version` not probed |
| Git Bash | C:\Program Files\Git\bin\bash.exe | latest | OK (per CCBP claude-settings.md) |

### B. Shell tool-call gap candidates

- **PowerShell module updates**: settings.json line 13 `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` — but no probe of installed PS module versions (PSReadLine, Microsoft.PowerShell.Archive). Not probed this wave.
- **Docker 29.x**: ahead of the typical SOTA baseline. CARRY-FORWARD: verify W346 Stream-D doesn't flag 29.x as unstable.

### Finding F5.1 — PowerShell version not probed; might be < pwsh 7.5 — SEV: LOW

`defaultShell: "powershell"` is set but PS version not enumerated this wave. CARRY-FORWARD to W346 Stream-D (shell SOTA stream).

### Finding F5.2 — Docker 29.4.3 ahead of typical SOTA baseline — SEV: LOW

Verify against Docker stable channel that 29.4.3 is GA (not RC/Edge). Not blocker; just verify-before-claim.

## §6 Hidden errors (settings.json deny-list, .mcp.json env-interp, MCP server health)

### A. Deny-list completeness vs W346-D scope

`.claude/settings.json:permissions.deny` (lines 70-111) covers `.env`, `secrets/`, `.aws/credentials`, `.ssh/config`, `id_rsa`, `id_ed25519`, `*.pem`, `*.pfx`, `*.key`, `.codex/**`, `.anthropic/**`, browser-profile dirs, registry hive prefixes, `curl/wget http://*`, `sudo *`, `chmod 777 *`, **all `git --no-verify*` variants** (including `cherry-pick --no-verify`, `am --no-verify`, `git -c core.hooksPath=*`).

**Gap**: Does NOT cover:
- `Read(**/*.tfvars)` (Terraform var files often contain secrets)
- `Read(**/.netlify/state.json)` (Netlify CLI tokens)
- `Read(**/.vercel/**)` (Vercel CLI tokens)
- `Read(**/secrets.*)` (just covers `secrets/**` not `secrets.yml` etc)
- `Bash(rm -rf /*)` — only `chmod 777` is denied; root-level rm-rf not explicitly denied

### B. `.mcp.json` env-interpolation

Probed `.mcp.json` `mcpServers` block: env-interp present for `GITHUB_TOKEN`, `LANGFUSE_*`, `PERPLEXITY_API_KEY`, `TAVILY_API_KEY`, `EXA_API_KEY` (last 2 placeholder-only). Cite-anchor to W268 codex T3 P0-security: keys live in `CLAUDE.local.md`, not in tracked `.mcp.json`. OK.

### C. MCP server health (sampled probes from prior waves)

| Server | Type | Expected port/endpoint | Probed-status (last) |
|---|---|---|---|
| github | http | api.githubcopilot.com/mcp/readonly | 401-on-bare-GET (W259-v9 audit) — auth-gated, live |
| chrome-devtools | stdio | npx | not probed this wave |
| repomix | stdio | npx | LOADED (this stream invoked it) |
| serena | stdio | uvx (SHA 249f6b07) | not probed |
| ccusage | stdio | npx | not probed |
| cognee | http | 127.0.0.1:8000/mcp | NSSM service `CogneeMCP` claimed RUNNING per CLAUDE.md L80 — not re-probed |
| langfuse | stdio | npx + ${LANGFUSE_*} | T5 LIVE v3.160.0 per W340-A; not re-probed |
| basic-memory | stdio | uvx (basic-memory==0.21.1) | not probed |
| hf-mcp-server | http | huggingface.co/mcp | not probed |
| perplexity | stdio | npx | not probed |
| playwright | stdio | npx 0.0.75 | not probed |
| tavily | stdio | npx + ${TAVILY_API_KEY} | not probed (key likely unset) |
| exa | stdio | unknown | not probed |
| deepwiki | http | mcp.deepwiki.com/mcp | LOADED (this stream invoked it via tool surface) |

### D. Plugin enable-state vs cache drift

47 enabled / 11 disabled / 58 total in settings.json:enabledPlugins. CLAUDE.md L77 says "enabled_true=46" — **off-by-one** (47 actual). Likely a typo/drift; matches Finding F2.1.

### Finding F6.1 — deny-list missing modern secret-files (tfvars, .vercel/, .netlify/, secrets.yml) — SEV: MEDIUM

Cardinal-rule-5 (safety boundaries via permissions) requires deny-list completeness. Adding 4-5 patterns: `Read(**/*.tfvars)`, `Read(**/.vercel/**)`, `Read(**/.netlify/state.json)`, `Read(**/secrets.*)`, `Bash(rm -rf /*)` — ~5 line patch.

### Finding F6.2 — `PostToolUseFailure` hook event not in CCBP claude-hooks.md — SEV: MEDIUM

settings.json:259 declares `PostToolUseFailure` hook. CCBP `claude-hooks.md` grep returns zero matches. Either (a) this is an undocumented CC event surface that works, (b) a typo for `PostToolUse` + a `tool_result.error` filter, or (c) a fabricated event-class that never fires. **W344 Z5 F4 implies it's not-needed because no project-owned hook bodies — but the hook IS configured in settings.json! Contradiction with Z5-hooks-audit F4.**

**Recommendation**: Either delete the `PostToolUseFailure` block, or probe a deliberate Bash-failure to verify the hook fires.

### Finding F6.3 — `parallel-ratio-W343.json` exists but no `parallel-ratio-W344.json` — SEV: LOW

Wave count is at W345/W346 but the latest measurement is W343. P0.2 wall-clock DWELL has not produced a fresh measurement file. Either rename the latest to `W344.json` post-W344-closure, or generate `W346.json` for this wave.

## §7 Priority ranking (P0..P6)

**P0**: `tools/preagent-d73-gate.mjs` (11,474 B) has NO documented W-wave exception cite — severity: HIGH — cite: this audit §1 Finding F1.2; CLAUDE.md L19 CR-5-exception condition-(b) requirement

**P1**: 6 hook bodies under `tools/*` exceed CR-2 ≤2KB AND escape the `cr2-2kb-hooks` pre-commit gate (path-filter `^\.claude/hooks/` is too narrow) — severity: HIGH — cite: this audit §1 Finding F1.1; `.pre-commit-config.yaml:109`

**P2**: parallel_ratio = 0.0034 vs target 0.7 (W343 measurement) AND `parallel-guard-bypass.marker` is still active post-W344-closure (should have been removed at W344 closure commit) — severity: HIGH — cite: this audit §3 Findings F3.1 + F3.3; `.claude/state/parallel-ratio-W343.json`

**P3**: 6 env-flags in `.claude/settings.json:env` have no CCBP cite-anchor (`OTEL_LOG_USER_PROMPTS`, `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA`, `CLAUDE_CODE_EFFORT_LEVEL`, etc) AND `OTEL_LOG_USER_PROMPTS=1` contradicts `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` — severity: MEDIUM — cite: this audit §4 Findings F4.2 + F4.3

**P4**: `PostToolUseFailure` hook configured in settings.json:259 but event-class has zero CCBP cite — may be fabricated event; W344 Z5 F4 marked NOT-NEEDED contradicts presence — severity: MEDIUM — cite: this audit §6 Finding F6.2

**P5**: 2 Stop-hooks racing (settings.json stop-position-swap + codex 1.0.4 Stop-review-gate) — undocumented dual-wiring — severity: MEDIUM — cite: this audit §3 Finding F3.2

**P6**: deny-list missing 5 modern secret-file patterns (tfvars, .vercel/, .netlify/, secrets.*, rm-rf-root) — severity: MEDIUM — cite: this audit §6 Finding F6.1

**P7**: 17 hookify cache SHA dirs persist + context-mode/1.0.141 stale dir (W270 cache-pruning hygiene) — severity: LOW — cite: this audit §1 Finding F1.3 + §2 Finding F2.2

**P8**: CLAUDE.md L77 plugin-count wording is off-by-one inconsistent (says "59→58" but actual is 47/11/58) — severity: LOW — cite: this audit §2 Finding F2.1

**P9**: PowerShell version not enumerated; Docker 29.4.3 may be ahead of stable; `parallel-ratio-W344.json` measurement file missing — severity: LOW — cite: this audit §5 Findings F5.1 + F5.2 + §6 F6.3

## Appendix — research probes + raw evidence

### Probe 1: hook sizes (Bash wc -c)
```
.claude/hooks/context-mode-cache-heal.mjs            1656 ← COMPLIANT
tools/preagent-parallel-guard.mjs                    20612 ← 10.1× over
tools/preagent-subagent-validator.mjs                5507  ← 2.7× over
tools/preagent-d73-gate.mjs                          11474 ← 5.6× over
tools/parallel-guard-userpromptsubmit.mjs            3916  ← 1.9× over
tools/stop-position-swap.mjs                         10141 ← 5.0× over
tools/subagent-stop-audit.mjs                        2027  ← COMPLIANT
tools/subagent-stop-guard.mjs                        5596  ← 2.7× over
```

### Probe 2: pre-commit cr2-2kb-hooks gate scope (literal cite)
`.pre-commit-config.yaml:109`:
```
entry: "bash -c 'staged=$(git diff --staged --name-only --diff-filter=AM 2>/dev/null | grep -E "^\.claude/hooks/" || true); ..."
```
Path filter `^\.claude/hooks/` does NOT cover `tools/`.

### Probe 3: parallel-ratio-W343.json (full payload above §3.A)

### Probe 4: plugin enable count (Python)
```
enabled_true=47 enabled_false=11 total=58
```

### Probe 5: CCBP insights env-flag grep
Zero matches for `CLAUDE_CODE_INSIGHTS_*`/`INSIGHTS_DIR`/`INSIGHTS_EXPORT` across `Z:/repos/deps/claude-code-best-practice-shan/best-practice/`. Only `/insights` (the slash-command in `claude-commands.md:65`).

### Probe 6: bypass-marker contents
```
W344-FULL-SOTA-UNLEASH 6-stream parallel dispatch
Reason: ≥6 Agent calls in ONE message per W269 mandate + Δ-G49
Created: 2026-05-20
Expires at W344 closure commit OR 24h
```
W344 has closed (W345 verdict ledger at HEAD `72665d7`) — marker is STALE.

### Probe 7: deny-list literal-cite + gap candidates
See §6.A above.

### Probe 8: 2 Stop-hooks
- settings.json:213-220: `tools/stop-position-swap.mjs` (5s timeout)
- cache/openai-codex/codex/1.0.4/hooks/hooks.json: `stop-review-gate-hook.mjs` (900s timeout)

### Cross-reference with prior-art companion audits

- `docs/architecture/W344-SOTA-UNLEASH/Z5-hooks-audit.md` — 5 findings; this W346 stream EXTENDS F1 (hook-metadata) and CONTRADICTS F4 (PostToolUseFailure was claimed NOT-NEEDED but IS configured)
- `docs/architecture/W344-SOTA-UNLEASH/Z2-insights-parity.md` — NO-OP verdict CONFIRMED by this stream's CCBP re-grep
- `docs/architecture/W342-CONTINUE/D-insights-operationalization.md` — not probed this wave (out-of-budget)
