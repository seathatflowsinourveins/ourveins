# W348-SOTA-FIX P1-P6 Operator Runbook

> **Status**: P0 SHIPPED at `bb56b74` (codex APPROVE; W330 GREEN; bypass-marker absent). P1-P6 deferred per predicate STOP clause "Operator-sign W349: ... + P1 env picks". This runbook gives exact remediation steps so operator can execute each phase autonomously after the coordination decisions are made.

## P1 — settings.json + CLAUDE.md (PARTIAL operator-sign)

### P1.a — Add `OTEL_EXPORTER_OTLP_HEADERS` (autonomous-safe once concurrent settings.json reconciled)

**Why**: W348 Stream-D probe-2 confirmed unauthenticated Langfuse OTLP trace POSTs are rejected with HTTP `400`. Adding the Basic-Auth header closes the telemetry loop; once authenticated, the auth probe should return `200` (OK) or `415` (Unsupported Media Type — auth was accepted but Content-Type missing from probe), both of which indicate the credentials were accepted. `401` would mean auth was rejected; investigate key validity.

**Step 1**: In `CLAUDE.local.md` env block (gitignored), pre-compute the base64 auth string and add:

```powershell
# (f4) W348 P1.a — OTLP Basic-Auth header for Langfuse trace ingestion.
# Required because OTEL_EXPORTER_OTLP_TRACES_ENDPOINT points at self-hosted Langfuse
# at :3000 which requires HTTP Basic Auth (verified via W348 Stream-D probe-2: 400=auth-required).
#
# OTel env-var format is "Authorization=Basic <base64>" (equals sign per OTel spec
# https://opentelemetry.io/docs/specs/otel/protocol/exporter/ — the SDK converts the
# env-var into the HTTP header "Authorization: Basic <base64>" on request emission).
#
# PowerShell note: use delimited-variable form ${env:NAME} so the literal `:` between
# public and secret keys is parsed as a separator, not as part of the variable name
# (codex r2 finding 2026-05-20).
$auth = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("${env:LANGFUSE_PUBLIC_KEY}:${env:LANGFUSE_SECRET_KEY}"))
$env:OTEL_EXPORTER_OTLP_HEADERS = "Authorization=Basic $auth"
```

**Step 2**: Add to `.claude/settings.json:env` block (AFTER coordinating with concurrent session):

```json
"OTEL_EXPORTER_OTLP_HEADERS": "${OTEL_EXPORTER_OTLP_HEADERS}"
```

**Probe** (verify Langfuse accepts the auth — uses HTTP-header form `Authorization: Basic ...`, NOT the env-var form `Authorization=Basic ...`):

```powershell
# PowerShell — reconstruct the HTTP-header form from env-var, send a test POST
$envHeader = $env:OTEL_EXPORTER_OTLP_HEADERS  # "Authorization=Basic <b64>"
$httpHeader = $envHeader -replace '^Authorization=', 'Authorization: '
curl -s -o NUL -w "%{http_code}" -H "$httpHeader" -X POST http://127.0.0.1:3000/api/public/otel/v1/traces
# expect 200 (was 400 pre-fix); a 415 means auth was accepted but Content-Type missing — both indicate auth OK
```

```bash
# Bash equivalent
AUTH=$(printf '%s:%s' "$LANGFUSE_PUBLIC_KEY" "$LANGFUSE_SECRET_KEY" | base64 -w0)
curl -s -o /dev/null -w '%{http_code}\n' -H "Authorization: Basic $AUTH" -X POST http://127.0.0.1:3000/api/public/otel/v1/traces
```

### P1.b — Add `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=5` (autonomous-safe)

**Why**: Per CC v2.1.143 release — limits Stop-hook BLOCK retries to 5 (prevents infinite-loop scenarios when codex review-gate keeps BLOCKING).

**Step**: Add to `.claude/settings.json:env`:

```json
"CLAUDE_CODE_STOP_HOOK_BLOCK_CAP": "5"
```

### P1.c — `EFFORT_LEVEL max → xhigh` [OPERATOR-SIGN REQUIRED]

**Why**: Per CCBP `claude-settings.md:891` (W342 Stream X4 cite-refresh @ a28cd96b), `xhigh` is the new SOTA tier above `max`. Predicate calls this out as operator-sign because `xhigh` consumes ~2× tokens vs `max` and operator may want budget-aware control.

**Decision options**:
- (a) Promote to `xhigh` — accept ~2× token cost for marginal quality
- (b) Stay at `max` — preserve current budget, accept slightly lower ceiling

**Step (if a)**: Change `CLAUDE_CODE_EFFORT_LEVEL` from `"max"` → `"xhigh"` in `.claude/settings.json:env`

### P1.d — Resolve `OTEL_LOG_USER_PROMPTS` vs `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` [OPERATOR-SIGN REQUIRED]

**Why**: Current state has BOTH `OTEL_LOG_USER_PROMPTS=1` AND `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` — contradiction. Per OTel GenAI semconv spec, these control overlapping concerns.

**Decision options**:
- (a) Capture-all: `OTEL_LOG_USER_PROMPTS=1` + `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true` — full prompt/response in traces (privacy concern)
- (b) Capture-none: `OTEL_LOG_USER_PROMPTS=0` + `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` — no message content (operational metrics only)
- (c) Hybrid: keep current contradiction (CC-specific flag overrides OTel-standard flag)

### P1.e — `CLAUDE.md` L50 53→56; L86 13→14

**SKIP**: this update was based on the predicate-author's expectation that 3 new skills would be added in W348-SOTA-FIX. Since no new skills were added (only audit deliverables), the count stays at 53. If concurrent W348-CARRY-CLEANUP or W349 adds new skills, those waves should bump the count.

## P2 — Git-tree cleanup [OPERATOR COORDINATION REQUIRED]

```bash
# Inventory (read-only)
git worktree list
git branch -a | grep -E 'W321|archive|goal/W33[1-6]|sota-converge-w' | wc -l  # expect 14

# After coordinating with concurrent session:
# Drop dormant W347 worktree (was b34ecd2, work landed)
git worktree remove Z:/claude-sota-installed-W347

# Reconcile w348 worktree (was faf018f) and w348-carry (now f5a47a5)
# Recommended: merge goal/W348-carry-cleanup into w344-mainsession-ship first, then drop both
git checkout w344-mainsession-ship && git merge --no-ff goal/W348-carry-cleanup
git worktree remove Z:/claude-sota-installed-W348
git worktree remove Z:/claude-sota-installed-W348-carry

# Prune stale branches
git branch -D $(git branch | grep -E 'W321|archive|goal/W33[1-6]|sota-converge-w' | tr -d ' ')

# Push (28+ ahead of origin/main b34ecd2)
git push --force-with-lease origin w344-mainsession-ship

# Stash review (5 entries — drop {0}+{1} if concurrent-session-rebase-prep superseded)
git stash list  # review before destructive actions
git stash drop stash@{0}  # only if confirmed superseded
git stash drop stash@{1}  # only if confirmed superseded
```

## P3 — Skill prunes + cite-refresh [SEMI-AUTONOMOUS]

```bash
# Verify duplicates before deletion (compare locally-curated skills to installed plugin skills)
ls .claude/skills/{tdd,review,doubt-driven-development,api-and-interface-design}/SKILL.md
ls .claude/plugins/cache/*/plugins/*/skills/tdd 2>/dev/null  # confirm plugin version exists

# Delete 4 plugin-duplicates
rm -rf .claude/skills/{tdd,review,doubt-driven-development,api-and-interface-design}

# Bundle cite-refresh (mechanical SHA bumps)
# Find: f17c6e88 (addyosmani/agent-skills) → keep (HEAD per W316)
# Find: 39a350b6 (Anthropic claude-cookbooks) → keep (HEAD per W342)
# Find: d54c497a (mattpocock) → bump to b8be62ff per concurrent W348-CARRY-CLEANUP
rg -l 'd54c497a' .claude/skills/
# For each match, replace d54c497a → b8be62ff

# Slug rename (cite-anchor refresh)
rg -l 'forrestchang' .claude/skills/
# Replace forrestchang → multica-ai for andrej-karpathy-skills owner-handle
```

## P4 — CI/CD hardening [AUTONOMOUS-SAFE]

```bash
# SHA-pin 32 unpinned `uses:` actions to 40-char commit SHAs
# Per OpenSSF Scorecard + GitHub Actions security-hardening guide
# Workflows to audit: .github/workflows/*.yml (9 workflows)
rg -n 'uses: [a-z]+/[a-z]+@v[0-9]' .github/workflows/

# For each match, look up the latest release SHA from upstream and replace
# Example: uses: actions/checkout@v4 → uses: actions/checkout@<40-char-sha>  # v4.x.y

# Optional: TruffleHog secondary secret-scanning (gitleaks is primary)
# Optional: cosign-verify on .mcp.json plugin SHAs
# Operator-decision: ultrareview CLI integration
```

## P5 — Incumbent drift + retire [SEMI-AUTONOMOUS]

```bash
# context-mode SHA bump 6bbcb443 → 4dcbd451 v1.0.146
# (concurrent W348-CARRY-CLEANUP P1.2 also has this — coordinate to avoid duplicate)
rg -l '6bbcb443' .claude/  # find references
# Replace 6bbcb443 → 4dcbd451 in all matches

# 4 SKILL.md autogen-cite forward-redirects
# microsoft/autogen RETIRED 2026-04-06 → microsoft/agent-framework (W342-Z SOTA)
rg -l 'microsoft/autogen' .claude/skills/
# For each, add forward-redirect note: "RETIRED 2026-04-06 → microsoft/agent-framework"
```

## P6 — SOTA + Insights ledger + audit-trail revive [LARGE-SCOPE; OPERATOR PRIORITY]

```bash
# T2-VENDOR-FORK candidate: CodeAlive-AI/agents-reflection-skills (7 meta-skills)
# PATTERN-STUDY-FIRST per sca-v17 D80 (4-6h estimated)
# Promote to T1-PROV iff sca-score ≥ 4.5
# (this is a multi-hour research task — schedule as dedicated wave)

# T6 ledger updates
mkdir -p docs/architecture/W348-SOTA-FIX/
# Write to basic-memory:
#   - main/audits/w348-sota-fix-multi-stream (per README anchor)
#   - main/learnings/w348-honest-non-findings (Insights HONEST-NON-FINDING per Stream-B)

# Revive dead audits
# codex_failure_audit: 55× empty since 2026-05-15 — investigate why
# codex_gate: 382× dead since 2026-05-15 — investigate why
grep -r 'codex_failure_audit\|codex_gate' .claude/settings.json .claude/plugins/cache/openai-codex/
```

## Wave-close Verification (post-P1-P6)

```bash
# CR-6 verify-before-claim probes
node tools/test-parallel-guard-w330.mjs && echo "W330 GREEN"
ls .claude/state/parallel-guard-bypass.marker 2>/dev/null || echo "bypass-marker absent"
wc -l CLAUDE.md  # must be ≤50
git status --short  # should be clean post-commit
git log --oneline -5  # verify codex-verdict trailers on all wave commits
```

## Coordination with Concurrent W348-CARRY-CLEANUP

Concurrent session at `goal/W348-carry-cleanup@f5a47a5` covers:
- W347 P0.3 (Win32 hooks.json paths)
- commitlint.config.cjs verification
- gitnexus `--repo` flag
- mattpocock SHA bump `d54c497a → b8be62ff`
- W343 P3 atomic-write codex r3 APPROVE @46d6102

**Do NOT duplicate these items**. P5 context-mode SHA bump is also in their P1.2 — coordinate before executing.

## Anchor ledger refresh

This runbook inherits the anchor ledger from `GOAL-FINAL-V2.md`:
- 8 org-distinct (Anthropic ×2, OTel, GitHub, OpenSSF, Sigstore, Microsoft, NIST)
- 4 standards bodies (OTel/CNCF, OpenSSF/LF, Sigstore/CNCF, NIST/US-gov)
- sca-v17 D80 floor satisfied
