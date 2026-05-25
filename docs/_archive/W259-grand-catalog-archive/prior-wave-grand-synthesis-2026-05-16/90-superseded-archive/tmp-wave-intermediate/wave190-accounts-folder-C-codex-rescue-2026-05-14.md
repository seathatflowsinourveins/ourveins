# Wave190 Accounts Folder Pre-Design Review

## 1. 5-Axis Adversarial Findings

| Axis | A `accounts/` | B `.local/accounts/` | C `Z:/claude-sota-installed-state/accounts/` | D hybrid | Severity |
|---|---:|---:|---:|---:|---|
| Secret exposure | repo-root; new unignored top-level risk | repo-local; `.local/state/` ignored, but `.local/accounts/` not proven ignored | outside repo; best default | ok only if secrets live in C | P0 |
| CR-5 install-priority | top-level hand-coded primitive smell | mirrors installed `.local/graphiti` shape but not install-class | state placement, not architectural primitive | acceptable only with C as authority | P1 |
| Windows Z-portable | ok path, bad git blast radius | ok, still repo-local | best: existing state root + absolute Z path | more rewiring | P2 |
| Migration/retirement | encourages new duplicate surface | hides duplicate surface | centralizes runtime state; retire shims | split brain if not strict | P1 |
| Hooks/MCP impact | must expand ignores/guards | must expand ignores/guards | no hook rewiring unless consumers move | more path adapters | P1 |

Blocking findings:

| ID | Sev | Finding | Evidence |
|---|---|---|---|
| F1 | P0 | OAuth/refresh/account JSON must not be under tracked repo path. | `.gitignore:102-104` already treats `.cli-proxy-api/` as operator-private with OAuth tokens; `CLAUDE.md:177` says NEVER commit secrets. |
| F2 | P1 | `scripts/cpa_oauth_quota_poller.py` currently writes derived quota state into `.claude/state`; migration must separate secret material from observability JSONL. | `scripts/cpa_oauth_quota_poller.py:56-59,143-149,197,352,373,391,411`. |
| F3 | P1 | Duplicate/shim retirement convention is move-to-retired or delete, not second canonical copy. | `git show a995498` retired aperant shims as CR-5/CR-10/CR-12 violations; `tools/cpa-cache-rate.py:31` is only current cache-rate script; `scripts/cpa-cache-rate.py` missing. |
| F4 | P2 | Bridge-mode Codex invocation failed locally with Windows access denied initializing app-server temp state; this review is local Codex analysis, not successful second-process consensus. | `codex exec --ephemeral -p deep-review-exec` returned `failed to initialize in-process app-server client: Access is denied`. |

## 2. Hardcoded-Path Audit

| Surface | Hits | Action |
|---|---|---|
| `.claude/settings.json` | no `cpa_oauth`, `cpa-cache`, `fleet`, `accounts`, `quota`; has `OTEL_LOG_TOOL_DETAILS=1`, `OTEL_LOG_USER_PROMPTS=1`, deny `Read(./secrets/**)`, secret hook at L84, SessionStart hooks L448-483 | no rewiring for Option C; avoid adding secrets to telemetry-readable paths |
| `.mcp.json` | no CPA/account hard path except unrelated state root `MCP_MEMORY_SQLITE_PATH=Z:/claude-sota-installed-state/.mcp-memory/memory.db` at L57 | no rewiring |
| hooks `*.py` | broad `.claude/state/*.jsonl` telemetry; no direct CPA folder dependency found | no rewiring; add redaction only if new account summary enters hook stdout/stderr |
| `scripts/cpa_oauth_quota_poller.py` | `AUTH_DIR=.cli-proxy-api` L56; `STATE_DIR=.claude/state` L57; quota JSONL/state L58-59 | migrate auth source to C or CPA native; keep JSONL summary redacted |
| `tools/cpa-cache-rate.py` | reads `.cli-proxy-api/logs/main.log` L31; prints account filenames L85-96 | either retain as operator tool or point at redacted summary; do not duplicate under `scripts/` |
| `tools/_eee_status_query.py` | CPA base `:8317` L27; secret file in installed-state L32; bearer sent only in header L130-131 | precedent for secret outside repo |
| `.gitignore` | `.claude/state/` L18; credentials L25-32; `.local/state/` L59; `.cli-proxy-api/` L102-104 | Option C avoids relying on repo ignore coverage |

## 3. Secret-Exposure Threat Model

| Threat | A | B | C | SOTA cite |
|---|---:|---:|---:|---|
| Git commit | high unless new ignore perfect | medium; `.local/accounts/` not proven ignored | low: outside repo | `mcp-memory-service/SECURITY.md:94-97`; `.gitignore:25-32,102-104` |
| `.claude/state` grep/JSONL | high if copied into state | high if summaries land in state | low if state stores redacted aggregate only | `CLAUDE.md:181`; hooks write `.claude/state` at `codex_t2_pre_commit_gate.py:98,140-153,293-320` |
| Hook stdout/stderr | high if path/token printed | medium | low if C paths only + redaction | `codex/docs/js_repl.md:94,103,121`; `codex_mcp_healthcheck.py:175-188,365-382` |
| MCP stdout telemetry | high if server emits tokens | medium | low | `codex-rs/app-server/README.md:53,86-87,977,1087`; `mcp-memory-service/SECURITY.md:117,145` |
| Secret store pattern | file-only repo folder is worst | repo-local fallback | external state or OS keyring | `codex-rs/rmcp-client/src/oauth.rs:1-17,155-210,371-454` |
| Repo packing/AI context | top-level likely packed | `.local` may be packed unless ignored | outside repo excluded | `repomix/.../security.md:10-13`; `configuration.md:115-122,357-363` |

## 4. Recommended Option

Weighted score: secret 40%, CR-5 20%, Windows 15%, migration 15%, hooks 10%.

| Option | Score | Decision |
|---|---:|---|
| A | 41/100 | REJECT: new repo top-level secret-adjacent folder |
| B | 62/100 | NEEDS-REVISION: acceptable for installed non-secret local packages, not credentials |
| C | 93/100 | APPROVE: state-outside-repo, matches secret-file precedent |
| D | 78/100 | APPROVE only if hybrid means C for secrets + repo wrappers/summaries only |

Recommended shape:

| Class | Location |
|---|---|
| OAuth tokens / refresh tokens / CPA auth files | `Z:/claude-sota-installed-state/accounts/` or CPA native store |
| Redacted quota summaries | `.claude/state/cpa_oauth_quota*.jsonl` allowed, no tokens |
| Operator tools | `tools/` single canonical script; no `scripts/` duplicate |
| Retired one-offs | `tmp/retired/YYYY-MM-DD-*` or delete if untracked/orphaned |

## 5. PROBE-DAG 5 Mode-Harness-Shape Verdict

| Probe | A | B | C | D |
|---|---|---|---|---|
| P1 install-vs-state class | FAIL | AMBER | PASS | AMBER |
| P2 secret boundary | FAIL | AMBER | PASS | PASS if C-only secrets |
| P3 Windows Z-portable | PASS | PASS | PASS | PASS |
| P4 retirement/duplicate hygiene | FAIL | AMBER | PASS | AMBER |
| P5 hook/MCP stdout shape | AMBER | AMBER | PASS | AMBER |

Mode-harness verdict: C is the only option that is simultaneously repo-clean, Z-portable, and compatible with existing hook/MCP telemetry without new deny rules.

## 6. Verdict

VERDICT: APPROVE-OPTION-C conf=0.90

Conditions:

1. No OAuth/refresh/access tokens in `accounts/`, `.local/accounts/`, `.claude/state`, hook stdout/stderr, or MCP stdout.
2. If repo-local path is desired, use it only for checked-in docs/wrappers or redacted summaries; add explicit `.gitignore` if any generated files appear.
3. Retire duplicate/stale scripts by single-canonical-tool policy: keep `tools/cpa-cache-rate.py`; do not recreate missing `scripts/cpa-cache-rate.py`.
4. Codex bridge-mode consensus attempt failed locally due access-denied; rerun after `CODEX_HOME` temp permissions are fixed before treating this as CR-3 FULL.
