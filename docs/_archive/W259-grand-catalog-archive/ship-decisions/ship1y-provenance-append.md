

## 2026-05-08 Wave 89 Ship 1Y — codex CLI sandbox unleash (CR-7 graduated-unleash; APPROVE conf=0.99 / 5/5 smoke probes PASS)

### Origin
User directive 2026-05-08: "codex and all sandbox must be unleashed, full premision with sota harness references" + reinforcement "they need to be unleashed as long as they gave full premission for sota references fetch, sota repos's source code deep dive, whether local or via graphql etc with only the high quality repos" + "all gpt5.5 full sota".

Wave 87+88 evidence ladder: 5+ codex CLI dispatches hit Pattern B HONEST-NON-FINDING because `Z:/claude-sota-installed-state/.codex/config.toml` had `sandbox_mode = "read-only"` on all 3 profiles + `network_access = false`. Codex investigated extensively but couldn't run PowerShell / sqlite3 / git / web-search probes — preventing terminal verdicts.

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee)
- Smoke probe consult prompt at `.claude/state/codex_consult_wave89_ship_1y_unleash.txt`
- Codex T1 foreground+tee `codex exec --ephemeral -p deep-review-exec --color never` 120s budget
- Verdict file: `.claude/state/codex_consult_wave89_ship_1y_unleash_OUT.txt`
- **APPROVE conf=0.99 / PROCEED-WITH-SHIP-1Y / 5/5 smoke probes PASS**:
  - powershell_run: PASS (was BLOCKED Wave 87+88)
  - sqlite_query: PASS (Python sqlite3 returned `('3.50.4', 4)`)
  - network_access: PASS (curl reached `https://api.github.com`)
  - file_read_writable_root: PASS
  - cite_verification: PASS (codex HEAD `993e3f407ea8213f7d32cb9367ae7616b7e15b4a` + `config_tests.rs:1438-1572` + `config.schema.json:255-257` all VERIFIED via direct file read)

### Edits applied to `Z:/claude-sota-installed-state/.codex/config.toml` (CODEX_HOME; outside git per state-outside-repo redirect; this provenance entry IS the canonical audit trail)

| Section | Field | Old | New | Cite |
|---|---|---|---|---|
| `[sandbox_workspace_write]` | `network_access` | `false` | `true` | Codex source `codex-rs/core/src/config/config_tests.rs:1438,1572 @ HEAD 993e3f40` |
| `[sandbox_workspace_write]` | `writable_roots` | `["Z:/claude-sota-installed", "Z:/repos/deps"]` | `[..., "Z:/claude-sota-installed-state"]` | (added state-outside-repo for CODEX_HOME write access) |
| `[profiles.deep-review-exec]` | `sandbox_mode` | `"read-only"` | `"danger-full-access"` | Codex source `config_tests.rs:842,1438,1572 @ HEAD 993e3f40` (verbatim `&SandboxPolicy::DangerFullAccess` + `sandbox_mode = "danger-full-access"`) |
| `[profiles.review]` | `sandbox_mode` | `"read-only"` | `"danger-full-access"` | (same cite) |
| `[profiles.headless-exec]` | `sandbox_mode` | `"read-only"` | `"danger-full-access"` | (same cite) |

### TIER-1 SOTA cite chain (all VERIFIED via direct file read AND GPT-5.5 e2e cite_verification PASS)

- **TIER-1**: `Z:/repos/deps/codex/codex-rs/core/src/config/config_tests.rs:842 @ HEAD 993e3f407ea8213f7d32cb9367ae7616b7e15b4a` — `&SandboxPolicy::DangerFullAccess` enum variant test
- **TIER-1**: `Z:/repos/deps/codex/codex-rs/core/src/config/config_tests.rs:1438,1572 @ HEAD 993e3f40` — verbatim `sandbox_mode = "danger-full-access"` upstream tests
- **TIER-1**: `Z:/repos/deps/codex/codex-rs/core/config.schema.json:255-257 @ HEAD 993e3f40` — verbatim "Never ask the user to approve commands. Failures are immediately returned to the model" for `approval_policy = "never"`
- **TIER-1**: `https://developers.openai.com/codex/security` (codex `docs/sandbox.md:1-3` references this canonical security page)

### Operational preservation: CC-side safety floor still active

The codex unleash is at the codex CLI subprocess layer. Claude Code's safety primitives remain operational:
- `.claude/settings.json:permissions.deny[]` — Read blocks for `**/.env`, `**/secrets/**`, `**/id_rsa`, `**/*.pem`, `**/*.key` (Wave 75 baseline)
- `.claude/hooks/scripts/safety_guard.py` — narrow catastrophic-pattern Bash deny-list (rm -rf /, fork bombs, mkfs.*) per Wave 11A `layered-gates-architecture.md §4.1`
- `.claude/hooks/scripts/agent_plan_readonly_bash_guard.py` — read-only restriction for `permissionMode: plan` subagents
- Cardinal-rule-1 cite-class enforcement — every adopted SOTA pattern requires file:line + HEAD SHA cite at TIER-1 level (no wholesale ports without cite verification)

### What this unleashes (operational scope per user reinforcement)

✅ **SOTA repo deep-dives via local `Z:/repos/deps/`** — codex can now `cat`/`grep`/`rg` 673+ deps repos for source-code analysis (e.g., Wave 88 codex Agent C retrieved `usage-monitor.ts fetchCodexUsage` TypeScript reference)
✅ **SOTA repo discovery via GraphQL** — `network_access: true` enables codex to call `mcp__github__search_*` patterns, GitHub REST API, npm registry, PyPI, crates.io for high-quality-repo scoring (convergence-gate Axis-1 ≥3-distinct-orgs verification)
✅ **Web fetch for SOTA references** — codex can now WebFetch + Perplexity / Exa / Firecrawl-style searches (formerly blocked)
✅ **PowerShell + sqlite3 + git + Python full execution** — Mia-probe-class verifications no longer require orchestrator-direct fallback
✅ **Cross-model gate satisfaction at codex CLI layer** — Pattern B HNF rate should drop substantially in subsequent waves
✅ **Real-time fleet polling** — codex can now hit Anthropic `/api/oauth/usage` + ChatGPT `/backend-api/wham/usage` for Ship 1W implementation (no longer blocked by network_access:false)

⚠️ **Trust scope still bounded** by `[projects.*] trust_level = "trusted"` declarations (currently Z:/claude-sota-installed + Z:/repos/deps + Z:/repos/deps/cwc-long-running-agents only). Codex remains untrusted on arbitrary other paths.

### Quality-gate preservation (per user "with only the high quality repos")

- Cardinal-rule-1 file:line + HEAD SHA cite enforcement — every adoption claim requires TIER-1 verification (NOT relaxed by sandbox unleash)
- Convergence-gate Axis-1 ≥3-distinct-orgs requirement — STILL OPERATIONAL (per `Z:/claude-sota/.claude/rules/convergence-gate.md`)
- Convergence-gate Axis-3 stability bands (cpd × age) — STILL OPERATIONAL
- 7-probe harness-fit DAG (P1-P7 per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md`) — STILL OPERATIONAL
- Cardinal-rule-9 install-risk discipline — STILL OPERATIONAL (pre-cite-import REVERT check, sibling-bleed defense, version-pin)

### Mia pre-apply (3/3 PASS via direct probe + GPT-5.5 e2e re-verification)
1. Codex source HEAD `993e3f407ea8213f7d32cb9367ae7616b7e15b4a` confirmed via `git -C Z:/repos/deps/codex rev-parse HEAD`
2. `config_tests.rs:1438,1572` content `sandbox_mode = "danger-full-access"` confirmed via direct grep
3. `config.schema.json:255-257` content for `approval_policy = "never"` confirmed via codex T1 cite_verification PASS

### Smoke probes verified by GPT-5.5 (codex T1 verdict at `.claude/state/codex_consult_wave89_ship_1y_unleash_OUT.txt`)

| Probe | Result | Evidence |
|---|---|---|
| PowerShell `Get-Date` execution | PASS | Successfully ran (was rejected pre-Ship-1Y) |
| Python sqlite3 inline query | PASS | Returned `('3.50.4', 4)` |
| `curl https://api.github.com` | PASS | Network access reached external HTTPS endpoint |
| File read from writable root | PASS | Read `.claude.json` from `Z:/claude-sota-installed/` |
| TIER-1 cite verification | PASS | Verified codex HEAD + config_tests.rs lines + config.schema.json lines via direct read |

### Cite chain (TIER-1 → TIER-3)
- **TIER-1**: `Z:/repos/deps/codex/codex-rs/core/src/config/config_tests.rs:842,1438,1572 @ HEAD 993e3f407ea8213f7d32cb9367ae7616b7e15b4a` (sandbox_mode + DangerFullAccess + approval_policy=never verbatim)
- **TIER-1**: `Z:/repos/deps/codex/codex-rs/core/config.schema.json:255-257,633-651,3041-3055 @ HEAD 993e3f40` (sandbox_mode + sandbox_workspace_write schema)
- **TIER-1**: `https://developers.openai.com/codex/security` (canonical security page; cited by `Z:/repos/deps/codex/docs/sandbox.md:1-3 @ HEAD 993e3f40`)
- **TIER-2-RUNTIME**: codex-cli v0.129.0 (binary at `.local/bin/codex.exe` — runtime version verified)
- **TIER-3-LOCAL**: `.claude/state/codex_consult_wave89_ship_1y_unleash_OUT.txt` (codex T1 verdict APPROVE conf=0.99 / 5/5 smoke probes PASS)
- **TIER-3-LOCAL**: `Z:/claude-sota-installed-state/.codex/config.toml` (operational state outside git; this provenance entry is canonical audit trail)

Ship 1Y satisfies cardinal-rule-1 (TIER-1 cite chain at file:line + HEAD SHA + verified by GPT-5.5 e2e cite_verification PASS) + cardinal-rule-3 (cross-model gate via real GPT-5.5 codex T1 e2e BEFORE commit; APPROVE conf=0.99) + cardinal-rule-7 (graduated-unleash Phase 3 destination per CC settings.json defaultMode:bypassPermissions PRESERVED + codex CLI sandbox now matching Phase 3 unleash semantics) + cardinal-rule-9 (install-risk: config-tuning is reversible via git revert / TOML edit; smoke-probe-validated; CC safety floor preserved) + cardinal-rule-10 (research-first via direct cite verification + GPT-5.5 verdict before commit) + cardinal-rule-11 (META-process SOTA: Pattern A apply + Mia pre-apply + provenance log + GPT-5.5 e2e BEFORE commit per user mandate "always using gpt5.5 fully e2e before commit").
