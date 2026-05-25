

## 2026-05-08 Wave 86 Ship 1Q — CLIProxyAPI config.yaml SOTA tuning (6-line conservative diff for cache-locality + reselect-storm reduction)

### Origin
Wave 86 dispatched 3-agent SOTA deep-dive: Agent A-redo (codex-rescue BRIDGE-MODE → real GPT-5.5; SOTA repos audit on token efficiency + arch optim + rtk-ai/rtk + account rotation), Agent B (codex-rescue BRIDGE-MODE → real GPT-5.5; CLIProxyAPI v6.10.9 8-account config deep-dive), Agent C (codex-rescue BRIDGE-MODE → real GPT-5.5; account fleet snapshot + log analysis).

### Cross-model T1 gate (4-layer satisfied; cardinal-rule-3 Phase 1 bootstrap exception)
- Agent A-redo: codex-rescue BRIDGE-MODE → real GPT-5.5 (Top-7 SOTA repos ranked, rtk-ai/rtk harness-fit verdict)
- Agent B: codex-rescue BRIDGE-MODE → real GPT-5.5 (CLIProxyAPI config audit + recommended diff)
- Agent C: codex-rescue BRIDGE-MODE → real GPT-5.5 (10 OAuth fleet inventory + log analysis)
- Synthesis: real GPT-5.5 via codex CLI foreground+tee `codex exec -p deep-review-exec` (Phase 1 bootstrap exception per CR-3)
- Verdict file: `.claude/state/codex_consult_wave86_synthesis_verdict_OUT.txt` (APPROVE conf=0.9 / FIX-FORWARD-AND-PROCEED / 1 P3 advisory F-1)

### Pattern A apply (F-1 P3 advisory closed inline)
| ID | Sev | Concern | Resolution |
|---|---|---|---|
| F-1 | P3 | Provenance must cite BOTH runtime commit `785b00c3` AND source checkout `ed1458aa6d3430ba59538aeb980b8934f0e80c1f`, AND verify `/healthz` after restart | This entry cites both SHAs verbatim below; post-restart `curl -s -m 5 http://127.0.0.1:8317/healthz` returned `{"status":"ok"}` (verified 2026-05-08T12:39 UTC post-restart with PIDs 86120 + 87232) |

### Wave 86 fleet snapshot (Agent C)
- 10 OAuth files at `Z:/claude-sota-installed/.cli-proxy-api/`: 7 Claude + 1 Codex Pro (zfan7@sva.edu, expires 2026-05-18) + 1 Antigravity (expires 2026-05-08T12:51 UTC) + 1 Gemini
- Today snapshot pre-Ship-1Q: 921M tokens / $790.16 / 94.4% cache-read aggregate
- Per-account capacity_score: dreamweaverhoudini=100, avantmanifest=100, 739955940fc=85, zfan7=67, mr.euphoriaincarnate=0 (EXHAUSTED), aesthetic9c=N/A, nalawowac=N/A
- Real-time usage: aesthetic9c dominant (8 calls / 32K tokens / 100% cache rate); 739955940fc 4-failed-of-6 (high failure); codex zfan7 26K tokens 0% cache (codex doesn't use Anthropic cache)
- Errors: 32 auth_unavailable_reselect events; 2× 429 on avantmanifest at 03:50-03:51; 0 cooldown / 0 ECONNREFUSED

### Wave 86 SOTA repos discovery (Agent A-redo)
Top-7 NOT-YET-ADOPTED repos by leverage:
1. **rtk-ai/rtk** @ HEAD `80a6fe606f73b19e52b0b330d242e62a6c07be42` (Mia VERIFIED via `git -C Z:/repos/deps/rtk-ai__rtk rev-parse HEAD`) — shell-output compaction proxy (60-90% reduction); WSL auto-rewrite, native PowerShell explicit wrappers only; harness-fit P4 PASS WSL / PARTIAL Windows
2. **cnighswonger/claude-code-cache-fix** @ HEAD `12cc30a1078c` — cache prefix stability A/B 95.5% vs 82.3% direct first-warm-turn; 7 cache-fix extensions (fingerprint stripping, TTL management, cache-control normalization, telemetry); P5 MEDIUM (rewrites request structure)
3. **motiful/cc-cache-audit** @ HEAD `6bd20812bd46` — billing-header cache-bust quantified (header ON = 12K tokens/session rebuilt; OFF = 99.98% hit ratio; effective 16,380 vs 2,351 equiv tokens); P5 LOW (read-only A/B harness)
4. **open-compress/claw-compactor** @ HEAD `c1b936d40b11` — content-aware reversible compression 14-stage Fusion Pipeline (15-82% compression, AST-aware code, hash-addressed RewindStore); P5 MEDIUM (per-payload-class benchmarking required)
5. **LiteLLM** @ HEAD `934ecdca78da` — production gateway (virtual keys, spend tracking, retry/fallback, load-balancing, Auto Router); P4 PARTIAL as REFERENCE only, NOT replacement (already have CLIProxyAPI)
6. **Portkey Gateway** @ HEAD `351692fd9236` — second gateway reference (1600+ models, retry/fallback boundaries, virtual-key management); P4 PARTIAL as REFERENCE
7. **Restate** @ HEAD `de5bcd3bc4de` — durable execution + reliable communication runtime (workflows-as-code, exactly-once messaging, durable promises/timers); P4 PASS as outer orchestrator prototype, NOT inline

Top-3 leverage adopts (deferred to next-iter ships):
- 1R motiful/cc-cache-audit (regression harness; lowest risk; high-signal cache prefix discipline)
- 1S rtk canary on WSL (60-90% shell-output token reduction; partial Windows requires explicit wrappers)
- 1T cnighswonger/claude-code-cache-fix prototype AFTER 1R validates no prefix regression

### Wave 86 CLIProxyAPI config audit (Agent B; 216-LOC artifact)
- Source SHA: `ed1458aa6d3430ba59538aeb980b8934f0e80c1f` (Mia VERIFIED via `git -C Z:/repos/deps/CLIProxyAPI rev-parse HEAD`)
- Runtime banner SHA: `785b00c3` (running binary at `Z:/claude-sota-installed/.local/bin/cli-proxy-api.exe`, built 2026-05-07T01:37:01Z; per F-1 P3 advisory closure: source/runtime skew exists)
- Sibling check: `Z:/claude-sota/.cli-proxy-api/config.yaml` ABSENT — sibling-bleed defense N/A per CR-9
- 22-row line-by-line audit: 16 OPTIMAL / 6 SUBOPTIMAL / 1 MISSING

### Ship 1Q — 6-line conservative diff (operational state at Z:/claude-sota-installed/.cli-proxy-api/config.yaml; gitignored per .gitignore:104; this provenance entry IS the canonical audit trail)

| Line | Key | Old | New | Cite |
|---|---|---|---|---|
| 18 | `disable-control-panel` | `false` | `true` | Reduces 30s management polling noise per Agent B Section 1 row "panel polling noisy in logs every ~30s" |
| 20 | `auth-dir` | `"~/.cli-proxy-api"` | `"Z:/claude-sota-installed/.cli-proxy-api"` | Absolute path prevents home-directory drift per Agent B Section 6 harness-fit notes |
| 41 | `auth-auto-refresh-workers` | `32` | `16` | Aggressive for 10 auths; reduces refresh-burst risk against provider rate limits per Agent B Section 1 |
| 44 | `request-retry` | `5` | `3` | Reduces reselect storms (main.log lines 655-704 evidence: repeated reselect bursts before 03:50-03:51 429s) per Agent B Section 5 |
| 45 | `max-retry-credentials` | `3` | `4` | More fanout when first-option-unavailable; works with 7 Claude lanes per Agent B Section 1 |
| 72 | `session-affinity-ttl` | `"1h"` | `"4h"` | KEY change for cache locality; covers typical multi-turn arc beyond 1h wave segment per Agent B Section 3. Cite: `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:498-535 @ HEAD ed1458aa6d3430ba59538aeb980b8934f0e80c1f` (session affinity keys by `provider::session::model`) |

### YAML validity verification (post-edit)
- `python3 -c "import yaml; d=yaml.safe_load(...); print('YAML OK; top-level keys:',len(d))"` returned `YAML OK; top-level keys: 26`

### Smoke probes (Ship 1Q post-restart per F-1)
- Restart: `Stop-Process cli-proxy-api -Force` + `nohup ./.local/bin/cli-proxy-api.exe -config .cli-proxy-api/config.yaml &`
- Post-restart healthz: `curl -s -m 5 http://127.0.0.1:8317/healthz` → `{"status":"ok"}` ✓ (per F-1 P3 advisory closure)
- Post-restart processes: PIDs 86120 (33MB RSS) + 87232 (36MB RSS) at 12:39:36 UTC
- Routing strategy preserved: `fill-first` + `session-affinity: true`

### DEFERRED ships (5 candidates; next-iter design waves)
| Ship | Description | Class | Risk |
|---|---|---|---|
| 1R | motiful/cc-cache-audit clone + run regression harness baseline (read-only A/B) | install-class | LOW |
| 1S | rtk canary on WSL — partial Windows compat documented | install-class (WSL prereq) | MEDIUM |
| 1T | cnighswonger/claude-code-cache-fix prototype AFTER 1R validates | install-class | MEDIUM |
| 1U | open-compress/claw-compactor evaluate as sidecar for tool-output compression | install-class | MEDIUM |
| 1V | capacity_score=0 mr.euphoriaincarnate@gmail.com account disable in CPA OR replace with fresh OAuth | operational | LOW |

### REJECTED-DEFER (architectural-novel; no immediate eee fit)
- LiteLLM/Portkey full gateway swap — high install-risk per CR-9; reference-only consumption acceptable
- Restate — defer indefinitely (architectural-novel, no immediate eee orchestration need)

### Mia pre-apply (7/7 PASS via direct probe)
1. Current config values verified at exact line numbers Agent B claimed (config.yaml:18,20,41,44,45,71,72,75,76)
2. Sibling `Z:/claude-sota/.cli-proxy-api/config.yaml` ABSENT — sibling-bleed defense N/A per CR-9
3. `docs/outer research/kits/` exists with v10-v21 + wave52/ folders (Agent A-redo's hyphen-path HONEST-NON-FINDING REFUTED at SPACE-path; actual content present)
4. CLIProxyAPI source SHA `ed1458aa6d3430ba59538aeb980b8934f0e80c1f` confirmed via `git -C Z:/repos/deps/CLIProxyAPI rev-parse HEAD`
5. rtk-ai/rtk source SHA `80a6fe606f73b19e52b0b330d242e62a6c07be42` confirmed via `git -C Z:/repos/deps/rtk-ai__rtk rev-parse HEAD`
6. `/healthz` returns `{"status":"ok"}` — Agent B's recommendation (use `/healthz` not `/health`) verified pre-edit and post-restart
7. 5/7 Claude OAuth files have `capacity_score` field (mr.euphoria=0 EXHAUSTED — Ship 1V candidate)

### Cite chain (TIER-1 → TIER-3)
- TIER-1: `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:498-535 @ HEAD ed1458aa6d3430ba59538aeb980b8934f0e80c1f` (session affinity primitives)
- TIER-1: `Z:/repos/deps/CLIProxyAPI/internal/runtime/executor/claude_executor.go:174-2331 @ HEAD ed1458aa` (cache-control injection mechanics — last tool / last system / second-to-last user, max 4 breakpoints)
- TIER-1: `Z:/repos/deps/CLIProxyAPI/internal/config/config.go:232-242,687-689 @ HEAD ed1458aa` (universal session affinity, retry-credential clamping)
- TIER-1: `Z:/repos/deps/rtk-ai__rtk/README.md:6,38-56,103-120,316-393 @ HEAD 80a6fe606f73` (rtk shell-output compaction, Quick Start, hook rewrite, Windows limitation, failure tee)
- TIER-1: `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:7-15,28-42,214-224,478-480 @ HEAD 12cc30a1078c` (cache-fix extensions, A/B 95.5% vs 82.3%)
- TIER-1: `Z:/repos/deps/motiful-cc-cache-audit/README.md:3,16-77 @ HEAD 6bd20812bd46` (billing-header cache-bust)
- TIER-2-RUNTIME: CLIProxyAPI runtime commit `785b00c3` (built 2026-05-07T01:37:01Z; binary at `Z:/claude-sota-installed/.local/bin/cli-proxy-api.exe`)
- TIER-3-LOCAL: `.claude/state/codex_consult_wave86_synthesis_verdict_OUT.txt` (APPROVE conf=0.9 / FIX-FORWARD-AND-PROCEED)
- TIER-3-LOCAL: `tmp/wave86-cliproxy-config-deepdive-agentB-2026-05-08.md` (216 LOC)
- TIER-3-LOCAL: `tmp/wave86-sota-repos-deepdive-agentAredo-2026-05-08.md` (166 LOC)
- TIER-3-LOCAL: `tmp/wave86-account-fleet-snapshot-agentC-2026-05-08.md` (101 LOC)

Ship 1Q satisfies cardinal-rule-1 (TIER-1 cite chain at file:line + HEAD SHA) + cardinal-rule-3 (cross-model gate via 4-layer GPT-5.5 + synthesis verdict) + cardinal-rule-9 (install-risk: reversible config tuning; sibling-bleed defense N/A; 2-round fix-forward budget unused — APPROVE first-round) + cardinal-rule-10 (research-first via 3-agent SOTA dispatch + Mia probes 7/7) + cardinal-rule-11 (META-process SOTA: Pattern A apply + Mia pre-apply via context7 + provenance log + post-restart healthz verify per F-1).
