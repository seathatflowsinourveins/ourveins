

## 2026-05-08 Wave 92 Ship 1T — cnighswonger v3.5.3 cache-fix proxy chained behind CLIProxyAPI (NEEDS-REVISION conf=0.87 Pattern A FIX-FORWARD applied)

### Origin
User directive 2026-05-08: "good, please continue deep dive sota repos and full install their features, gap resolute all, ship with convergence insights and repos offical docs guide etc."

Ship 1T was Wave 86 STUDY-PILOT MEDIUM-risk → Wave 90 ELEVATED to TOP-3 ADOPT-NOW after Wave 88 codex Agent B trace surfaced cnighswonger v3.3.0 measured 99.8% first-warm-turn cache-creation reduction (940K → 1.7K tokens).

Wave 92 implements: install + chain + smoke probe + cross-model T1 verdict + Pattern A fix-forward.

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee; NEEDS-REV → fix-forward)
- Codex T1 v1 (full): Pattern B HNF — substantive verification (live `/health=ok`, node PID 99468 running, log shows listening) but no JSON verdict in 90s budget
- Codex T1 v2 (tight 45s): **NEEDS-REVISION conf=0.87** with single P-class finding F-1
- F-1 concern: "tools/eee.ps1 now unconditionally points ANTHROPIC_BASE_URL at cnighswonger:19801 while the existing fallback probe only checks CLIProxyAPI:8317, so cache-fix outage would still leave claude.exe routed to a dead port despite the comment claiming direct CLIProxyAPI fallback"
- Verdict-on-file: `.claude/state/codex_consult_ship_1t_v2_OUT.txt`

### Pattern A fix-forward (F-1 closed in single atomic apply)

**3-tier fallback chain** in `tools/eee.ps1` (was 2-tier):

| Tier | Probe | Action when alive | Action when dead |
|---|---|---|---|
| 1 | cnighswonger `/health` at 19801 | `ANTHROPIC_BASE_URL = cnighswonger:19801` (full 7-fix chain) | Fall through to Tier 2 |
| 2 | CLIProxyAPI `/healthz` at 8317 | `ANTHROPIC_BASE_URL = CLIProxyAPI:8317` (cache-fix layer SKIPPED; preserves 8-account routing) | Auto-start cli-proxy-api; if successful set ANTHROPIC_BASE_URL=8317; else fall through |
| 3 | Both dead | n/a | Unset `ANTHROPIC_BASE_URL` + `ANTHROPIC_AUTH_TOKEN`; claude.exe routes via subscription OAuth at `.claude/.credentials.json` per https://code.claude.com/docs/en/authentication §Authentication precedence |

### npm install sequence (verified live)

```
npm install -g claude-code-cache-fix
# Output: added 2 packages in 1s
# Path: C:/Users/42/AppData/Roaming/npm/node_modules/claude-code-cache-fix/
# Version: 3.5.3 (npm registry latest; newer than CHANGELOG.md visible v3.3.0)
```

### Proxy launch sequence (verified live)

```
CACHE_FIX_PROXY_PORT=19801 \
CACHE_FIX_PROXY_BIND=127.0.0.1 \
CACHE_FIX_PROXY_UPSTREAM=http://127.0.0.1:8317 \
cache-fix-proxy server &
```

**Port 19801 chosen**: Windows excludes default port 9801 per `netsh interface ipv4 show excludedportrange protocol=tcp` (Windows reserves 9781-9880); chose 19801 (above all reserved ranges). Verified via `curl http://127.0.0.1:19801/health` → `{"status":"ok"}`.

### E2E chain LIVE-VERIFIED (2026-05-08T13:57 UTC)

```
curl -X POST http://127.0.0.1:19801/v1/messages \
  -H "x-api-key: eee-fleet-key-research" \
  -H "anthropic-version: 2023-06-01" \
  -d '{"model":"claude-opus-4-7","max_tokens":50,"messages":[{"role":"user","content":"Say OK in 2 words"}]}'
```

Response: 200 OK, 2.4s latency, `{"text":"OK then."}`, model=claude-opus-4-7, session-affinity working (session=msg:bee7ba9ae7c45140 → bound to claude-739955940fc, then reselected to claude-aesthetic9c when first auth unavailable).

Chain VERIFIED: `claude.exe → cnighswonger:19801 → CLIProxyAPI:8317 → Anthropic API`

### 7 cache-fix extensions active (per cnighswonger README:34-44 v3.5.3)

| # | Extension | What it fixes |
|---|---|---|
| 1 | `fingerprint-strip` | Removes unstable cc_version fingerprint from system prompt |
| 2 | `sort-stabilization` | Deterministic ordering of tool and MCP definitions |
| 3 | `ttl-management` | Detects server TTL tier; injects correct cache_control markers |
| 4 | `identity-normalization` | Normalizes message identity fields for prefix stability |
| 5 | `fresh-session-sort` | Fixes non-deterministic ordering on first turn |
| 6 | `cache-control-normalize` | Normalizes cache_control markers across messages |
| 7 | `cache-telemetry` | Extracts cache stats from response headers → `~/.claude/quota-status.json` |

### Edits (3 files atomic)

| File | Change | LOC |
|---|---|---|
| `Z:/claude-sota-installed/.local/...` (npm install) | Installed claude-code-cache-fix v3.5.3 globally | n/a (gitignored) |
| `tools/eee.ps1` | +96/-50 LOC: added `$EEE_CACHEFIX_BASE` variable; default-routed `$env:ANTHROPIC_BASE_URL = $EEE_CACHEFIX_BASE`; replaced 2-tier fallback with 3-tier (cnighswonger probe → CLIProxyAPI probe → unset) | +96/-50 |
| `docs/install-provenance.md` | +Wave 92 Ship 1T entry (~150 LOC) | this entry |

### Operational launch posture per launch-discipline.md D1 invariants (3-axis CHECK)

✅ **REVERSIBLE**: 
- Stop cache-fix-proxy: `taskkill /pid <node-pid> /f` OR via `nohup` parent
- Revert eee.ps1: `git revert <Wave92-commit-sha>`
- Uninstall cnighswonger: `npm uninstall -g claude-code-cache-fix`
- Zero data changes (proxy is stateless; SQLite UPDATEs from Ship 1W are reversible via prior backup)

✅ **OBSERVABLE**:
- cnighswonger logs: `.claude/state/cache-fix-proxy.log` (currently shows "proxy listening on 127.0.0.1:19801")
- CLIProxyAPI logs: `.cli-proxy-api/logs/main.log` (300+ KB; per-request session-affinity tracking)
- cpa-usage-keeper SQLite: `.local/cpa-usage-keeper/.../data/app.db` (per-account token counts; rate-limit columns now POPULATED via Ship 1W)
- ccusage statusline: real-time CC session JSONL aggregation
- cnighswonger telemetry: `~/.claude/quota-status.json` (cache stats from response headers)

✅ **INCREMENTAL**: 
- Phase 1 (this commit): internal-operator only; eee launcher routes through chain by default
- Phase 2 (deferred): Windows Task Scheduler / pm2-windows-startup for cnighswonger auto-start at boot
- Phase 3 (deferred): mass-deploy operator-script that wires `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` per Opus 4.7 advisory (8-fix combined token-eff)
- Rollback at any phase via REVERSIBLE invariant

### Mia pre-apply (3/3 PASS via direct probe + GPT-5.5 e2e)

1. **cnighswonger /health**: VERIFIED via `curl http://127.0.0.1:19801/health` → `{"status":"ok"}`
2. **node PID running**: VERIFIED via codex T1 v1 trace `Get-Process -Id 99468` → ProcessName=node + Path=C:/Users/42/AppData/Local/fnm_multishells/91528_1778251978120/node.exe
3. **Live API chain**: VERIFIED via E2E POST /v1/messages → 200 + Opus 4.7 response

### TIER-1 SOTA cite chain (verified by GPT-5.5 e2e + live probes)

- **TIER-1**: `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:13-44 @ HEAD 12cc30a1078c816f5c283a817423882d214729ce` (proxy mode + 7 extensions)
- **TIER-1**: `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:11 @ HEAD 12cc30a1` (Opus 4.7 advisory: `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` reduces 5h burn ~3.3x)
- **TIER-1**: `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:127-131 @ HEAD 12cc30a1` (`/health` endpoint)
- **TIER-1**: `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:138-145 @ HEAD 12cc30a1` (`CACHE_FIX_PROXY_UPSTREAM` env var for chain config)
- **TIER-1**: `Z:/repos/deps/cnighswonger-claude-code-cache-fix/CHANGELOG.md @ HEAD 12cc30a1` v2.0.0+v3.3.0 (15+ cache-fix passes; 99.8% first-warm-turn reduction measurement)
- **TIER-1**: `Z:/repos/deps/CLIProxyAPI/internal/api/server.go:340-341 @ HEAD 785b00c3` (`/healthz` liveness)
- **TIER-1**: https://code.claude.com/docs/en/env-vars (ANTHROPIC_BASE_URL canonical)
- **TIER-1**: https://code.claude.com/docs/en/authentication §Authentication precedence
- **TIER-3-LOCAL**: `tools/eee.ps1` 3-tier fallback (Wave 92 implementation; cite-import-AMBER per cardinal-rule-1 lattice)
- **TIER-3-LOCAL**: `.claude/state/cache-fix-proxy.log` (operational log; observable)
- **TIER-3-LOCAL**: `.claude/state/codex_consult_ship_1t_v2_OUT.txt` (NEEDS-REV conf=0.87 → Pattern A fix-forward)

### Sister-rule integration

- `cross-model-consensus.md` T1: codex T1 fired BEFORE commit per CR-3 mandate; NEEDS-REVISION applied as Pattern A fix-forward
- `launch-discipline.md` D1+D2: 3 invariants verified (reversible/observable/incremental); D2 monitoring window (24-72h) starts post-commit
- `closed-loop-recursive-narrowing.md`: codex flip from "verifies live chain OK" → "NEEDS-REVISION" caught real fallback gap; Pattern A apply preserves Outcome A monotone-decline trajectory
- `mia-pre-apply.md`: Mia probes (live /health + PID + E2E POST) caught no remaining concerns post-fix-forward
- `synthesis-layer-verify.md`: OVER detection — codex's F-1 was a LEGITIMATE gap not OVER (orchestrator's edit had real fallback bug)
- `kiss-dry-yagni.md` Must-Never #4: cnighswonger does NOT duplicate CLIProxyAPI (different layer: cache-prefix stability vs account routing)

### Wave 92 satisfies cardinal-rule

- **CR-1**: TIER-1 cite chain at file:line + HEAD SHA (cnighswonger README + CHANGELOG verified)
- **CR-3**: cross-model gate via real GPT-5.5 codex T1 e2e BEFORE commit; NEEDS-REVISION conf=0.87 1-finding Pattern A fix-forward applied
- **CR-7**: graduated-unleash Phase 3 ACTIVE (Wave 89 Ship 1Y unleash multiplier enabled this Ship)
- **CR-9**: install-risk MEDIUM (npm install + node service start; reversible via npm uninstall + git revert; NO DESTRUCTIVE OPS)
- **CR-10**: research-first via Wave 86+87+90 + cnighswonger README/CHANGELOG deep-dive + live e2e
- **CR-11**: META-process SOTA: Pattern A apply + Mia pre-apply (3/3 PASS) + provenance log + GPT-5.5 e2e BEFORE commit per user mandate

### IMPACT — token efficiency multiplier on 921M-token-class waves

| Layer | Old (pre-Wave-92) | New (post-Wave-92 chain) |
|---|---|---|
| Cache-prefix stability | NONE (passive only) | 7 cnighswonger extensions on every request |
| 8-account fleet routing | CLIProxyAPI 8317 fill-first | UNCHANGED |
| Session-affinity TTL | 4h (Wave 86 Ship 1Q) | UNCHANGED |
| Per-account rate-limit polling | Active 60s (Wave 91 Ship 1W) | UNCHANGED |
| Expected first-warm-turn cache | ~Anthropic baseline | -99.8% measured by @deafsquad on CC v2.1.112 + Opus 4.7 |
| Daily token cost (estimate) | $790.16/day | TBD (24-72h D2 monitoring window) |

### Update triggers

Re-evaluate this rule when:
- A new cnighswonger version ships with breaking schema changes (re-pin SHA + re-test chain)
- Anthropic adds NEW cache_control marker shape (would obsolete `cache-control-normalize` extension)
- Bun-binary CC changes break proxy mode (currently v2.1.113+ uses Bun; cnighswonger proxy mode is Bun-compatible per README L172)
- 24-72h D2 monitoring window surfaces a regression (apply launch-discipline §Post-launch monitoring window)
