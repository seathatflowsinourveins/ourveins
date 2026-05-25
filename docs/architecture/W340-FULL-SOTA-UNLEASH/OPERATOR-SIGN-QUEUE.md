# W340 — Operator-Sign Queue

> Items requiring operator confirmation before execution. Drafted by W340 wave-close orchestrator per Cardinal Rule 6.
> Each item lists: rationale · exact action · risk · rollback.

## Q1 — sca-v14 → sca-v15 SKILL.md (4 edit blocks)

**Rationale**: W339-P1b proposed D13-D17 dims collide with existing v3/v3.1 W288/W293 binds. Path-A renumber to D76-D80 (sca-v15 lineage) is operator-elected REPORT-ONLY per W339.

**Action**: Apply 4 proposed-edit blocks from `S3-SYNTHESIS-INTEGRATION.md §A.1`:
- Edit 1: `.claude/skills/sota-convergence-audit/SKILL.md` L12 (lineage row append)
- Edit 2: `.claude/skills/sota-convergence-audit/SKILL.md` L189 (5 new dim bullets D76-D80)
- Edit 3: `.claude/skills/sota-convergence-audit/SKILL.md` ~L300-308 (denom_install 44.0→46.5; denom_pattern 19.8→21.3)
- Edit 4: `.claude/skills/sota-convergence-audit/SKILL.md` L168 (catalog title range update)

**Risk**: LOW (additive). New denom shifts affect future ledger composites but do not retroactively alter existing rows.

**Rollback**: single `git revert <sha>` reverts entire edit set.

## Q2 — Plugin cache-delete + fresh-install (3 drifted plugins per W270)

**Rationale**: Agent-2 §B detected 3 silent SHA drifts. W270 corollary says cache-delete + fresh-install is SOTA fix for silent drift (standard `/plugin update` no-ops).

**Action** (per plugin):
```powershell
# 1. everything-claude-code@2.0.0-rc.1 (local 8148340a → upstream 1e8c7e79; closes load_failures=1)
Remove-Item -Recurse -Force Z:\claude-sota-installed\.claude\plugins\cache\everything-claude-code
# then in CC session: /plugin install everything-claude-code@everything-claude-code
# then verify SHA via git -C .claude/plugins/cache/everything-claude-code rev-parse HEAD

# 2. superpowers-marketplace@5.1.0 (local f2cbfbef → upstream 647ca50f)
Remove-Item -Recurse -Force Z:\claude-sota-installed\.claude\plugins\cache\superpowers-marketplace
# then in CC session: /plugin install superpowers@superpowers-marketplace
# then verify SHA

# 3. context-mode@1.0.146 (local 6bbcb443 → upstream 4dcbd451)
Remove-Item -Recurse -Force Z:\claude-sota-installed\.claude\plugins\cache\openai-context-mode
# then in CC session: /plugin install context-mode@openai-context-mode
# then verify SHA
```

**Risk**: MEDIUM. cache-delete is reversible (re-install pulls fresh). But fresh-install ALSO changes:
- shipped hook/agent definitions (may surface NEW behavior)
- vendored fork-skills (especially superpowers — has 5.1.0 vendor-fork at `dispatching-parallel-agents-w321-fork`)

**Rollback**:
- Pre-cleanup snapshot: `git stash push -m "pre-W340-plugin-drift-revert" .claude/plugins/`
- If post-install introduces regression: `git stash pop` restores; reinstall the OLD pinned version.

## Q3 — OTEL env additions (3 SEV-1 gaps)

**Rationale (REVISED post codex r1)**: Agent-3 §D originally flagged 3 SEV-1 gaps (`OTEL_TRACES_EXPORTER=otlp` set but metrics + logs + auth-headers UNSET). Live probe + codex r1 cross-model gate found 2 of those 3 "gaps" are NOT valid:

- `/api/public/otel/v1/traces` → POST 401 (endpoint exists, requires auth header — pre-existing)
- `/api/public/otel/v1/metrics` → POST 401 (endpoint EXISTS but Langfuse does NOT surface OTEL metrics into dashboards per https://langfuse.com/integrations/native/opentelemetry — Langfuse derives metrics from traces, not OTLP metrics ingestion)
- `/api/public/otel/v1/logs` → POST 404 (endpoint does NOT exist on Langfuse)

So setting `OTEL_METRICS_EXPORTER=otlp` + `OTEL_LOGS_EXPORTER=otlp` against Langfuse is a silent-fallback: requests would 401/404 with no operator-visible insights gain. Cardinal-rule-6 violation if shipped.

**Action (REDUCED-SCOPE per codex r1)**:

(a) Add to `.claude/settings.json` env block — ONLY the safe metadata tag (NOT metrics/logs exporters):
```json
"OTEL_SERVICE_NAME": "claude-sota-installed"
```

(a-rejected — DO NOT add these against Langfuse; they were originally proposed by Stream F but codex r1 vetoed):
```
"OTEL_METRICS_EXPORTER": "otlp"            # rejected — Langfuse no metrics dashboard
"OTEL_LOGS_EXPORTER": "otlp"               # rejected — /v1/logs 404
"OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": ... # rejected — see above
"OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": ...    # rejected — see above
```

(a-carry-forward — to surface metrics+logs we need a SEPARATE backend that ingests OTLP metrics+logs (Langfuse traces-only): Prometheus + OTEL Collector + Loki + Tempo, or Grafana Cloud OTLP, or SigNoz. Out of scope this wave.):

(b) Add to `CLAUDE.local.md` §f2 env block (secret-bearing — base64 of pk:sk). **DO NOT inline-paste literal pk-lf-* / sk-lf-* values into this tracked doc**; load from OS-vault (see Q9 vault setup):
```powershell
# Compute base64 once (run in PowerShell):
$pk = Get-Secret -Vault 'claude-sota' -Name 'langfuse-pk' -AsPlainText  # see Q9 for vault setup
$sk = Get-Secret -Vault 'claude-sota' -Name 'langfuse-sk' -AsPlainText
$b64 = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("${pk}:${sk}"))
$env:OTEL_EXPORTER_OTLP_HEADERS = "Authorization=Basic ${b64}"
```

**STATUS UPDATE (this commit, codex r1→r4 revision history)**: REDUCED-SCOPE LANDED. `settings.json` in this commit adds ONLY `OTEL_SERVICE_NAME=claude-sota-installed` (safe metadata tag on existing traces). Codex r1 caught that `OTEL_METRICS_EXPORTER` + `OTEL_LOGS_EXPORTER` + matching endpoints were INVALID — live probe confirmed: `/api/public/otel/v1/traces` returns 401 (endpoint exists, needs auth header — pre-existing not in scope), `/api/public/otel/v1/metrics` returns 401 (endpoint exists but Langfuse does NOT surface OTEL metrics in dashboards per langfuse.com/integrations/native/opentelemetry), `/api/public/otel/v1/logs` returns 404 (endpoint does NOT exist on Langfuse). Metrics + logs reverted from staged diff per codex r1 VERDICT: REVISE. Headers-based auth path + metrics+logs backend (Prometheus/Loki/Tempo) carry-forward to next wave per Q3 (a)+(b) above.

**Risk**: LOW (additive env vars; no removals). Secret stays gitignored.

**Rollback**: remove the env lines.

## Q4 — `self-improving-agent@claude-code-skills` disable rationale

**Rationale**: Agent-3 §C detected `self-improving-agent@claude-code-skills` is now disabled (was likely the 9→10 enabled_false flip). Operator decision needed: intentional disable or accidental?

**Action**: Either (a) document disable rationale in CLAUDE.md L35 (or sub-doc), or (b) re-enable via `/plugin enable self-improving-agent@claude-code-skills`.

**Risk**: LOW (doc-only OR single-flip).

## Q5 — Install `zilliztech/claude-context` + `snyk/agent-scan`

**Rationale**: Agent-1 TOP-3 NEW SOTA candidates (sca-v13 18 + 17). Both ≥17/21 = T2-INSTALL threshold per W340-S1.

**Action** (per CR-1 trust-tuple re-check first):
```
# In CC session:
/plugin install <marketplace-url-for-claude-context>
/plugin install <marketplace-url-for-agent-scan>
```

Pre-install discipline:
- Verify SLSA-L3 / npm-provenance / Sigstore signed (CR-1 trust-tuple §a)
- License audit (CR-1 §b — MIT/Apache/BSD/ISC/MPL OK)
- ≥1 commit older than 30d OR operator-pin (CR-1 §c)
- Transitive dep clean via `npm ls` / Snyk / Socket.dev (CR-1 §d)

**Risk**: MEDIUM (new install, expands trust surface).

**Rollback**: `/plugin uninstall` + cache cleanup.

## Q6 — Run `repatch-context-mode-hooks-json.ps1`

**Rationale**: Agent-2 §D corrects W339-P0a evidence — the `1.0.146/hooks/hooks.json` `command` fields still bake ephemeral `fnm_multishells/75360_1779286054358/node.exe` (NOT `${CLAUDE_PLUGIN_ROOT}`). Each new fnm session shifts this path → hooks break.

**Action**:
```powershell
Z:\claude-sota-installed\tools\repatch-context-mode-hooks-json.ps1 `
  -NodePath 'Z:/tools/nodejs/node.exe'
```

The script is idempotent (per W339-P0a). Substitutes stable Z: path for ephemeral fnm path.

**Risk**: LOW (idempotent script; reversible — original hooks.json was generated from upstream).

**Rollback**: `Remove-Item .claude/plugins/cache/openai-context-mode/1.0.146/hooks/hooks.json` + re-pull plugin.

## Q7 — TC-3 fork-vs-task probe (Δ-G49 hypothesis)

**Rationale**: Agent-3 §E.2 says TC-3 has highest signal for actionable mitigation (`CLAUDE_CODE_FORK_SUBAGENT=0` workaround test).

**Action**: Operator-side eval script — run same prompts in mode (a) `CLAUDE_CODE_FORK_SUBAGENT=1` vs mode (b) `=0`; ≥5 trials each; instrument empty-rate via `empty-final-message-guard`. If empty-rate ~37% in (a) vs ~0% in (b) → H4 confirmed.

**Risk**: LOW (read-only eval).

**Rollback**: N/A.

## Q8 — Mechanize Δ-G49 via `hooks.SubagentStop`

**Rationale**: Agent-3 §D.2 gap #6 — current `empty-final-message-guard` is advisory skill, not hard-gate hook. SubagentStop hook converts to mechanized enforcement.

**Action**: Add hook to `.claude/settings.json` `hooks.SubagentStop`:
- Must be ≤2KB per CR-2 OR direct-CLI invocation (e.g. PowerShell one-liner that checks last-message content)
- Hook fires on SubagentStop; reads final teammate message; exit non-zero if empty + no NO-FINDINGS sentinel
- Cite-anchor: Anthropic CC SubagentStop hook docs + Δ-G49 anti-pattern catcher contract

**Risk**: LOW (additive hook).

**Rollback**: remove hook entry.

---

## Q9 — Codex r1 SHIP-BLOCKER #1: Langfuse secret exposure (P0 — credential hygiene)

**Rationale**: stream-K codex r1 verdict L14 — Langfuse `pk-lf-<REDACTED>` + `sk-lf-<REDACTED>` are literal-assigned in `CLAUDE.local.md` §f2 PowerShell env block (full values intentionally NOT inlined here per codex r1 P0 — see CLAUDE.local.md directly for full prefix on operator-side rotation). Even though CLAUDE.local.md is gitignored, it sits in model-readable memory + on-disk in cleartext. Codex flags as P0 credential hygiene.

**Action**:
1. Rotate Langfuse keys in self-hosted instance (`http://127.0.0.1:3000` admin UI → API keys → rotate)
2. Move keys to OS-vault — `Get-Secret` via `PowerShellGet.SecretManagement` + `Microsoft.PowerShell.SecretStore`:
   ```powershell
   # One-time setup:
   Register-SecretVault -Name 'claude-sota' -ModuleName Microsoft.PowerShell.SecretStore
   Set-Secret -Vault 'claude-sota' -Name 'langfuse-pk' -Secret 'pk-lf-NEW-KEY-HERE'
   Set-Secret -Vault 'claude-sota' -Name 'langfuse-sk' -Secret 'sk-lf-NEW-KEY-HERE'
   # In CLAUDE.local.md §f2 replace literals with:
   $env:LANGFUSE_PUBLIC_KEY = Get-Secret -Vault 'claude-sota' -Name 'langfuse-pk' -AsPlainText
   $env:LANGFUSE_SECRET_KEY = Get-Secret -Vault 'claude-sota' -Name 'langfuse-sk' -AsPlainText
   ```
3. Audit git history for prior commits leaking keys; if found → `git filter-repo` excision OR rotate-with-acknowledgement

**Risk**: MEDIUM (rotation + vault setup; needs verification post-rotation that Langfuse OTLP still authenticates)
**Rollback**: re-assign literals temporarily; rotate again later

## Q10 — Codex r1 SHIP-BLOCKER #2: CI/CD not at SOTA (P0 — supply chain hardening)

**Rationale**: stream-K codex r1 L17-21 — pre-commit hooks (local) ≠ SOTA. Need:
- GitHub Actions branch protection rules (require status checks, signed commits, ≥1 review)
- SLSA L3 provenance attestations (via `slsa-github-generator`)
- Signed-commits enforcement (GPG or sigstore-cosign)
- CI-enforced CodeQL + Dependabot security + Trivy scan jobs

**Action**: add `.github/workflows/` jobs:
- `ci-codeql.yml` — CodeQL static analysis
- `ci-dependabot.yml` — Dependabot security update enforcement
- `ci-trivy.yml` — Trivy fs + config scan (already-installed locally per W339 P1c ecosystem audit)
- `ci-slsa-provenance.yml` — SLSA L3 provenance generator
- `ci-commit-signing.yml` — require signed commits for main branch

Plus GitHub repo settings:
- Branch protection rule on `main` requiring all 5 above + ≥1 PR review

**Risk**: MEDIUM (CI infrastructure work; potential to slow down existing merge cadence)
**Rollback**: disable individual workflows; remove branch protection rules

## Q11 — Codex r1 SHIP-BLOCKER #3: Agent orchestration soft-fail-first (P0 — discipline hardening)

**Rationale**: stream-K codex r1 L23-27 — current state:
- `tools/preagent-parallel-guard.mjs` line 4+17 hardcoded `exit 0` advisory-only (per CLAUDE.md L13 W325-A F1 baseline `0.0036` = 99.6% silent-serial fallback)
- `tools/preagent-subagent-validator.mjs` soft-fails on missing allowlist
- These were CR-5-exception condition-(b) per W330 r1 + Δ-DPA-5 per W331 r4 — but soft-fail-first means binding-gate is bypassable on cold start

**Action**: per CLAUDE.md L13 proposed P0-A fix: **block on 2nd-violation per session** for `preagent-parallel-guard.mjs`:
```javascript
// pseudocode
const violations = readSessionState('parallel-violations') || 0;
if (violations >= 1 && currentDispatchIsSingle) {
  console.error('BLOCK: 2nd parallel-violation in session; dispatch ≥2 Agents in 1 message per W269 mandate');
  process.exit(2);
}
writeSessionState('parallel-violations', violations + 1);
```

For `preagent-subagent-validator.mjs`: if allowlist file missing → exit 2 with operator-instruction to regenerate (per W331 axis-1#5 mechanization comment in validator L100-104).

**Risk**: HIGH (changes binding behavior — might block legitimate workflows during transition)
**Rollback**: revert binding flip; restore exit-0 advisory mode

---

## Triage recommendation (operator)

**P0 (codex r1 ship-blockers)**: **Q9 (secret rotation) + Q10 (CI/CD) + Q11 (orchestration mechanization)** — these must close before next ship attempt per W331 cross-model gate.

**P1 highest-value low-risk**: **Q3 (OTEL) + Q4 (self-improving disable doc) + Q1 (sca-v15 SKILL.md)** — close near-term gaps.

**P2 medium-term**: **Q2 (plugin drift) + Q6 (repatch hooks)** — state-mutating, well-bounded with snapshot.

**P3 future waves**: **Q5 (new installs), Q7 (TC-3 fork probe), Q8 (SubagentStop)** — exploratory.
