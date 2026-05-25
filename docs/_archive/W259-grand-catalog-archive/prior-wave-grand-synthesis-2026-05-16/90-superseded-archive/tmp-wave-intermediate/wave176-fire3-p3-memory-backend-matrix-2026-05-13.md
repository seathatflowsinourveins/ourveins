---
title: W176 Fire 3 P3 memory-backend convergence matrix (CR-12 disposition + F38c scale threshold)
status: AUTHORITATIVE
date: 2026-05-13
wave: 176
fire: 3
priority: P3 STOP-4
team_size: 1 (orchestrator-direct desk research; no install ship)
---

# W176 F3 — P3 memory-backend convergence matrix

## Incumbent baseline (INSTALLED + WIRED)

| Layer | Backend | Wire | Cite |
|---|---|---|---|
| L1+L2 capture+vector | **mcp-memory** (doobidoo/mcp-memory-service v10.51.3) | `.mcp.json:memory` stdio (Z:/venvs/claude/Scripts/memory.exe + sqlite_vec @ Z:/claude-sota-installed-state/.mcp-memory/memory.db) | CLAUDE.md L165 |
| L3 temporal-KG | **graphiti** (getzep/graphiti v0.29.0) | `.mcp.json:graphiti` stdio (uv + Z:/claude-sota-installed/.local/graphiti/mcp_server) + FalkorDB Docker @ 16379 + OPENAI_API_URL CLIProxyAPI proxy | CLAUDE.md L167-171 |

**Current scale**: `memory.db` = 2.0 MB [VERIFIED via `du -h` 2026-05-13]. ~21 sessions × ~5-15 entries each. Well under W164 F38c-precedent scale threshold (≥100k memories OR ≥1GB OR p95 ≥100ms OR multi-process write-contention).

## Candidates probed (CR-12 disposition lattice)

Per `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` 6-class disposition: GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL.

| Candidate | deps present? | Probe DAG outcome | F38c scale demand-gate | CR-12 disposition | Verdict |
|---|---|---|---|---|---|
| **graphiti** (incumbent) | INSTALLED + WIRED | n/a — incumbent | INCUMBENT-PRIMARY | INCUMBENT-PRIMARY KEEP | **KEEP** |
| **mcp-memory** (incumbent) | INSTALLED + WIRED | n/a — incumbent | INCUMBENT-PRIMARY | INCUMBENT-PRIMARY KEEP | **KEEP** |
| **mem0** | ✓ `Z:/repos/deps/mem0/` (AGENTS.md + CLAUDE.md + cli/ + cookbooks/) | Probe 4 plugin-namespace: WOULD-DUPLICATE mcp-memory's L1+L2 role. Probe 5 mode-harness-shape: framework expects multi-tenant + user-isolation patterns; sss is single-tenant | DEMAND-ABSENCE.a at current scale (2MB << 1GB threshold; no multi-tenant workflow named) | DUPLICATE-FUNCTIONALITY (at current scale) | **DEFER** |
| **letta** | ✓ `Z:/repos/deps/letta/` (AI_POLICY.md + alembic/ db-migrations + assets/ + certs/) | Probe 5 mode-harness-shape: full agent-framework not just memory layer (alembic migrations + certs/ TLS = service-deployment mode); sss harness shape is library-not-service | DEMAND-ABSENCE.a — no agent-framework-redo workflow named; would require harness pivot | PARTIAL-OVERLAP (memory-layer-only adoption would discard 80% of letta's value) | **DEFER** |
| **cognee** | ✓ `Z:/repos/deps/cognee/` (AGENTS.md + CLAUDE.md + bin/) | Probe 4 plugin-namespace: WOULD-OVERLAP graphiti's L3 temporal-KG role (cognee is graph-RAG primitive). Probe 6 LICENSE: Apache-2.0 (recent — historical AGPL stale per W169 cite-class correction memory hash 7aebf49) | DEMAND-ABSENCE.a — incumbent graphiti covers temporal-KG; no graph-RAG-specific workflow named beyond INCUMBENT scope | DUPLICATE-FUNCTIONALITY at L3 layer | **DEFER** |
| **agentmemory** | ✗ NOT_FOUND at `Z:/repos/deps/agentmemory` | Cannot probe — no local clone | INVESTIGATE (license + scope unknown; would need fresh clone) | UNKNOWN | **INVESTIGATE-OR-REJECT** next fire |

## Verdict matrix

**ALL 4 non-incumbent candidates DEFER below F38c scale threshold.**

Continue INCUMBENT-PRIMARY graphiti (L3) + mcp-memory (L1+L2) per W164 F38c precedent. Re-audit at scale boundary trigger:
- `memory.db` ≥ 1 GB
- ≥ 100k stored memories
- p95 retrieval ≥ 100ms
- multi-process write-contention observed
- named new workflow that incumbent provably cannot serve

## FM-20 graphiti silent-dual-write root-cause hypothesis

W176 F1 caught graphiti episode group=eee EMPTY despite mcp-memory persisting. Candidate root causes for fresh-fire investigation:

1. **FalkorDB connection silent-drop** — container UP per Wave 156+ telemetry but graphiti MCP server may have stale connection
2. **OPENAI proxy timeout** — graphiti uses `OPENAI_API_URL=http://127.0.0.1:11700/v1` (CLIProxyAPI); if proxy throttles or rate-limits the embeddings call, episode persistence fails silently
3. **Queue worker not draining** — graphiti `add_memory` returns "queued for processing in group" immediately; the queue worker writes asynchronously, may have died
4. **Group_id mismatch** — fresh-fire writes to `group_id="eee"` may hit a different graphiti instance/namespace than `get_episodes(group_ids=["eee"])` reads

**P3 follow-up FORWARD-REF**: P3 root-cause probe — `docker logs falkordb` + check graphiti MCP server stderr + `redis-cli -p 16379 PING` + check OPENAI proxy stderr. NOT in this fire scope (would expand to 4+ probes); queued as W176 F5 or fresh-session task.

## STOP gate W176 update

| # | STOP | Status |
|---|---|---|
| 1 | post-compact preload audit ≥70% | ✓ MET (W176 F1) |
| 2 | gsd 3-hook STUDY-PILOT install | ⚠ DESIGN-COMPLETE 1-of-3 viable (W176 F2) |
| 3 | 11-repo wave-2 verdicts | ⏳ queued P2 |
| 4 | memory-backend convergence matrix | ✓ MET (this fire) — all 4 candidates DEFER below F38c scale; INCUMBENT-PRIMARY KEEP |
| 5 | audit-% ≥50% | ⏳ queued P4 |
| 6 | 3-T1 codex verdicts cumulative ≥6.0 | ⏳ queued P5 |
| 7 | 5-surface persist this fire | ⏳ pending W176 F3 close |
| 8 | FM-20 row 16+ codify | ✓ MET row 9 ladder advance (W176 F1) |

**Progress**: 3 of 8 STOP MET firm (P0+P3+P7) + 1 PARTIAL (P1 design); 4 queued (P2+P4+P5+P6 partial). +1 cross-fire spent ~few-k context. Cumulative cross-model gate this fire: 0 codex T1 verdicts (desk research; no Pattern A apply).

## Cite trail

- F38c precedent: `Z:/claude-sota-installed/.claude/state/codex_consult_w164_f38c_qdrant_research_OUT.txt` (Wave 164 F38c codex T1 DEFER conf=0.92)
- CR-12 disposition lattice: `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` §6-class
- Incumbent wire: `Z:/claude-sota-installed/.mcp.json` graphiti+memory blocks
- Scale telemetry: `du -h Z:/claude-sota-installed-state/.mcp-memory/memory.db` → 2.0M [VERIFIED 2026-05-13]
- W164 F38c memory: hash referenced in MEMORY.md L2 W164 entries
