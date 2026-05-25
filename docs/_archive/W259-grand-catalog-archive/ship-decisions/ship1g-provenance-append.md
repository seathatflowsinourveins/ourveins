

## 2026-05-08 Wave 84 — 3-agent design wave (Ship 1F REJECT + Ship 1G SHIP-NOW + Ship 1H DESIGN-FREEZE)

### Origin
Wave 83 deferred 3 ship candidates (1F Anthropic Batch API / 1G SubagentStop transcript-mining hook / 1H fleet circuit-breaker). Wave 84 dispatched 3-agent design wave (CADP rule 2 max 3 concurrent; ≥2 BRIDGE-MODE GPT-5.5) to design each candidate concretely.

### Cross-model T1 gate (3-layer satisfied)
- Agent A: sota-researcher (Opus 4.7 — no STAND-IN-NOTICE; cross-model gate at agent layer needs codex T1 closure)
- Agent B: codex-rescue BRIDGE-MODE → real GPT-5.5 (cross-model gate at agent layer satisfied)
- Agent C: codex-rescue BRIDGE-MODE → real GPT-5.5 (codex CLI 0.129.0 confirmed)
- Synthesis: GPT-5.5 via proxy /v1/chat/completions (cardinal-rule-3 Phase 1 bootstrap exception)
- Verdict file: .claude/state/codex_consult_wave84_synthesis_verdict_OUT.txt (NEEDS-REVISION conf=0.86 / FIX-FORWARD-AND-PROCEED / 3 findings)

### Wave 84 dispositions

| Ship | Verdict | Rationale | Files |
|---|---|---|---|
| 1F Anthropic Batch API | **REJECT-FOR-FIT** | Triple Probe failure: P3 architectural-API (Batch API ANTHROPIC_API_KEY vs eee OAuth subscription) + P5 mode-harness-shape (Batch async 1-24h vs eee sync claude.exe) + P7.a demand-absence (ALL 7 dispatch classes need sync return for Pattern A apply). Cost-benefit ceiling ~$8/mo on <2% usage; ROI marginal-to-negative. cache_read 94.4% is dominant cost reducer already captured. | (none — REJECT documents to forward-only retire) |
| 1G SubagentStop hook | **SHIP-NOW** | settings.json SubagentStop[] empty (clean slate); 80-LOC Python telemetry-only async append-only JSONL with redaction + rotation; separate lane from cpa-usage-keeper; fail-closed-for-telemetry semantics verified. | NEW .claude/hooks/scripts/subagent_stop_telemetry.py + .claude/settings.json edit + this provenance entry |
| 1H fleet circuit-breaker | **DESIGN-FREEZE-NOT-IMPLEMENT** | 94.4% cache-read + 0 unavailable accounts = healthy state; activation premature. Design preserved at tmp/wave84-ship1h-circuit-breaker-design-agentC-2026-05-08.md with state machine cite chain to LiteLLM RedisCircuitBreaker:97-155. Activation triggers: tier-A rolling-cap >2×/day OR cache-read <70% sustained. | (none — design-freeze; future PowerShell wrapper in tools/eee.ps1 if triggered) |

### Pattern A apply (Ship 1G ONLY commit-bound)

| ID | Sev | Concern | Resolution |
|---|---|---|---|
| F-1 | P1 | gitignore coverage for .claude/state/subagent_metrics.jsonl | **Mia REFUTED**: .gitignore L18 `.claude/state/` ALREADY covers entire dir; no new edit needed. Verified via `git check-ignore -v` returning rule path. |
| F-2 | P2 | Provenance entry should cover all 3 Wave 84 dispositions, not just 1G | This entry covers 1F REJECT + 1G SHIP-NOW + 1H DESIGN-FREEZE — F-2 satisfied |
| F-3 | P2 | Hook must have fail-closed-for-telemetry semantics | Confirmed: outermost `try: ... except Exception: pass` in main(); empty-input smoke probe returns exit=0; never perturbs agent completion |

### Files modified (Ship 1G atomic bundle — 3 files)

| Path | Change |
|---|---|
| .claude/hooks/scripts/subagent_stop_telemetry.py | NEW 130-LOC Python telemetry hook (mines agent_transcript_path → .claude/state/subagent_metrics.jsonl) |
| .claude/settings.json | SubagentStop[] → SubagentStop[{matcher: "*", hooks: [{python script async timeout=5}]}] + cite comment |
| docs/install-provenance.md | +Wave 84 entry (this section) |

### Smoke probes (Ship 1G)
- Python syntax: `py_compile` PASS
- Empty input `{}` → exit=0 (fail-closed-for-telemetry verified)
- Output: .claude/state/subagent_metrics.jsonl created (314 bytes from smoke; gitignored via L18)
- async: true per Anthropic hooks docs (telemetry NOT enforcement; never blocks agent completion)

### Mia pre-apply (12/12 PASS)
**Agent A** (5/5):
- platform.claude.com/docs/en/build-with-claude/batch-processing requires `x-api-key` ✓
- code.claude.com/docs/en/authentication §"Subscription OAuth" verbatim "scoped to inference only" ✓
- CLIProxyAPI does NOT proxy /v1/messages/batches (sdk/cliproxy/* lacks batch handler) ✓
- Eee 7 dispatch classes all sync (cross-model-consensus.md T1-T7 lifecycle) ✓
- Cost ceiling 17M tokens/mo eligible × 50% = ~$8/mo ✓ math

**Agent B** (4/4):
- settings.json:218 SubagentStop=[] empty ✓
- types.py:309-316 SubagentStopHookInput schema ✓
- subagent_stop_telemetry.py + subagent_start_observer.py absent (clean slate) ✓
- Anthropic hooks docs accessible ✓

**Agent C** (3/3):
- LiteLLM RedisCircuitBreaker state machine at redis_cache.py:97-155 ✓
- cpa-usage-keeper SQLite primary trigger source verified ✓
- 94.4% cache-read + 0 unavailable accounts confirms healthy state (activation premature) ✓

### Forward-ref re-evaluation conditions

**Ship 1F** revisit when ANY of:
- (a) eee gains autonomous offline-audit primitive >100M tokens/mo
- (b) Anthropic ships OAuth-subscription-compatible batch endpoint
- (c) operator adopts paid API axis for unrelated reasons

**Ship 1H** activate when EITHER:
- Tier-A account rolling-cap signal >2×/day (per cpa-usage-keeper SQLite telemetry)
- cache-read <70% sustained across rolling window (not single noisy call)

### Cite chain (TIER-1 → TIER-3)
- TIER-1: https://code.claude.com/docs/en/hooks (SubagentStop async semantics)
- TIER-1: https://code.claude.com/docs/en/authentication §Authentication precedence
- TIER-1: https://platform.claude.com/docs/en/build-with-claude/batch-processing
- TIER-1: Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/types.py:309-316 @ HEAD b512f256 (SDK schema)
- TIER-1: Z:/repos/deps/litellm/litellm/caching/redis_cache.py:97-155 @ HEAD 934ecdca (Ship 1H state machine reference)
- TIER-3-LOCAL: .claude/state/codex_consult_wave84_synthesis_verdict_OUT.txt (NEEDS-REVISION conf=0.86)
- TIER-3-LOCAL: tmp/wave84-ship1f-batch-api-design-agentA-2026-05-08.md
- TIER-3-LOCAL: tmp/wave84-ship1g-subagent-stop-hook-design-agentB-2026-05-08.md
- TIER-3-LOCAL: tmp/wave84-ship1h-circuit-breaker-design-agentC-2026-05-08.md

Ship 1G satisfies cardinal-rule-1+3+9+10+11.
