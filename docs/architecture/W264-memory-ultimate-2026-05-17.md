# W264 — Memory-Layer Ultimate SOTA-Convergence Audit (2026-05-17)

> 3-axis gate (A1 ≥3 orgs · A2 ≥2 T2 · A3 ≥3-mo) + D1-D10 SRA scoring against LIVE 4-tier incumbent: T0 CC-native / T1 hindsight 0.6.5 :9077 / T2 doobidoo sqlite_vec / T4 graphiti FalkorDB+Ollama. Cites: `W262-memory-stack-audit`, `MEMORY-{SOTA-EVIDENCE,RAG-COVERAGE,ULTIMATE-ARCHITECTURE}-W259v16`, `COGNEE-INTEGRATION-CLAUDE-W259v6`. Operator-catalog coverage **49/50** (`MemoClaw/Eve` unresolvable).

## §0 — Headline

**No tier swaps. KEEP-INCUMBENT across T0/T1/T2/T4.** Two config deltas (≤2 each) + one deferred-conditional re-add (`cognee-memory` plugin). Operator catalog adds zero displacing engines. Hindsight PRIMARY on integration not benchmark — every LongMemEval number (hindsight 94.6 included) self-reported per `MEMORY-SOTA-EVIDENCE §7`.

## §1 — Tier-1 plugins (D-sum / A1 / A2 / A3 / verdict)

| Candidate (org/repo, ★, license) | D/30 | A1 | A2 | A3 | Verdict |
|---|---|---|---|---|---|
| `thedotmack/claude-mem` (89k★, MIT) | 24 | P | P | P | WATCHLIST — Windows failure-mode (`FOREN §4.1`); same role as hindsight |
| `supermemoryai/claude-supermemory` (2.5k★, MIT) | 23 | P | P | P | REJECT-FOR-FIT — Pro-API-gated |
| `letta-ai/claude-subconscious` (2.4k★, Apache-2.0) | 18 | ½ | ½ | P | REJECT-FOR-FIT — demo; competing harness |
| **`vectorize-io/hindsight`** (MIT) | **27** | P | P | P | **KEEP — T1 incumbent** (Q5 = 10/10: 4 hooks + MCP + skill) |
| `AgriciDaniel/claude-obsidian` (MIT) | 21 | P | ½ | P | WATCHLIST — markdown-vault role not memory-core |
| `basicmachines-co/basic-memory` (AGPL) | 17 | P | ½ | P | REJECT-FOR-FIT — AGPL D1 |
| `russbeye/claude-memory-bank` (MIT) | 19 | ½ | F | P | REJECT — hindsight subsumes |
| `napkin` (416★) | 16 | F | F | ½ | REJECT — low-star single-author |
| `ensue-skill` (393★) | 16 | F | F | ½ | REJECT — low-star |
| `homunculus` (216★) | 15 | F | F | ½ | REJECT — low-star |
| `cartographer` (420★) | 16 | F | F | ½ | REJECT — low-star |
| `iannuttall/claude-sessions` (1.1k★, MIT) | 21 | P | P | P | WATCHLIST — session-mgmt adjacent |
| `claude-canvas` (1.1k★) | 19 | P | ½ | P | REJECT-FOR-FIT — visual, not memory |
| `musistudio/claude-code-router` (25.3k★) | — | — | — | — | MIS-FILED — L1 router (`RECON T1.15`) |
| `NevaMind-AI/memU` (3.5k★, Apache-2.0, LoCoMo 92.09) | 22 | P | ½ | P | WATCHLIST — no LongMemEval, no native CC |
| `rohitg00/agentmemory` (memory_layer) | 20 | ½ | F | P | STUDY-PILOT — decay pattern citeable |
| `mem0ai/claude-code-plugin` (OpenMemory) | 23 | P | P | P | REJECT — engine ceiling 49-66 % OSS (`Q3`) |

**T1 SHIP: KEEP hindsight 0.6.5.** Q5 integration depth (`hindsight-integrations/claude-code/hooks/hooks.json`) + MIT + Windows-portable + installed = decisive. claude-mem stays watchlist swap if pg0/Z:-junction breaks.

## §2 — Tier-2 MCP servers

| Candidate | D/30 | A1 | A2 | A3 | Verdict |
|---|---|---|---|---|---|
| `@modelcontextprotocol/server-memory` (MIT, Anthropic-ref) | 21 | P | P | P | REJECT — KV-only; doobidoo strict superset |
| **`doobidoo/mcp-memory-service`** | **25** | P | P | P | **KEEP — T2 incumbent** (sqlite_vec, OAuth, Windows-clean) |
| `CaviraOSS/OpenMemory` | 20 | P | ½ | P | STUDY-PILOT — belief-quality angle |
| `elvismdev/mem0-mcp-selfhosted` (84★) | 18 | F | F | P | REJECT — mem0 ceiling |
| `WhenMoon-afk/claude-memory-mcp` | 14 | F | F | ½ | REJECT — unverified |
| `mem0ai/mem0-mcp` (Apache-2.0) | 19 | P | ½ | P | REJECT — engine ceiling |
| `Heirloom` (Rust, AES-SQLite) | 18 | ½ | F | P | WATCHLIST — license unverified |
| `basicmachines-co/basic-memory` | 17 | P | ½ | P | REJECT-FOR-FIT — AGPL |
| `mcp-obsidian` (MIT) | 19 | P | ½ | P | WATCHLIST — Obsidian bridge |
| `@bitbonsai/mcpvault` | 16 | ½ | F | P | REJECT-FOR-FIT — secrets, not memory |

**T2 SHIP: KEEP doobidoo.** 3.7 MB store live; migrating to mem0/qdrant pays integration cost for lower engine ceiling.

## §3 — Tier-3 engines (LongMemEval-ranked)

| Engine (license) | LongMemEval | D/30 | A1 | A2 | A3 | Verdict |
|---|---|---|---|---|---|---|
| OMEGA (Apache-2.0) | 95.4 [self] | 22 | ½ | F | ½ | REJECT-FOR-FIT — Windows-untested, ~600-mem ceiling (`MATRIX §0.5`) |
| Mastra OM (Apache-2.0) | 94.87 [self] | 21 | P | P | P | CITE-PATTERN — Observer/Reflector; no CC plugin (Q5 = 4/10) |
| **hindsight** (MIT) | 94.6 [self] | **27** | P | P | P | **KEEP — incumbent** (stat-tie at top; Q5 = 10/10) |
| Emergence AI (proprietary) | 86 | — | F | F | — | REJECT — not installable |
| `letta-ai/letta` (Apache-2.0) | 83.2 [self] | 20 | P | P | P | CITE-PATTERN — competing harness |
| `supermemoryai/supermemory` (MIT) | 81.6-85.2 [self] | 22 | P | P | P | STUDY-PILOT — Pro-API-gated |
| `getzep/zep` + `getzep/graphiti` (Apache-2.0) | 71.2 / 63.8 [cross-agreed] | 24 | P | P | P | KEEP — graphiti is T4 incumbent (highest non-promotional) |
| `mem0ai/mem0` (Apache-2.0) | 49-66 OSS [independent] | 19 | P | P | P | REJECT — engine ceiling (Vectorize + TrueMemory) |
| `topoteretes/cognee` (Apache-2.0) | n/a [HotPotQA] | 23 | P | P | P | DEFERRED-CONDITIONAL — see §5 |
| `langchain-ai/langmem` (MIT) | n/a | 17 | P | ½ | P | REJECT-FOR-FIT — LangChain-coupled |
| `plastic-labs/honcho` (AGPL) | 92.6 LME-S [self] | 18 | P | ½ | P | REJECT — AGPL |
| `GibsonAI/memori` (Apache-2.0) | n/a | 17 | ½ | F | P | REJECT — no CC primitive |
| `MemoClaw/Eve` | — | — | F | F | F | NOT FOUND — unresolvable (`RAG-COVERAGE §3`) |
| MemPalace | disputed | 17 | ½ | F | ½ | STUDY — benchmark dispute (`FOREN §4.6`) |
| MemU | LoCoMo 92.09 only | 22 | P | ½ | P | WATCHLIST |
| Cloudflare Agent Memory | n/a | 18 | P | F | P | REJECT-FOR-FIT — CF-managed |
| `byterover/campfirein-cli` | 87 | 22 | P | P | P | STUDY-PILOT — vs-graphiti pair |
| `MemTensor/MemOS` | LoCoMo 75.80 | 19 | P | ½ | P | REJECT — relative-uplift claim only |
| EverMemOS | unverified | 19 | ½ | F | ½ | WATCHLIST |

**T3 SHIP: KEEP-INCUMBENT** (hindsight T1 + graphiti T4). Rest fail A1/A2, hit engine ceilings (mem0), license-block (honcho), or lack CC pathway (Mastra/letta).

## §4 — Swap / re-add candidates

1. **`topoteretes/cognee-integrations` (`cognee-memory` plugin)** — DEFERRED: best cognee↔CC bridge (`COGNEE §1.2`); re-add only when a doc-corpus ingest workflow lands.
2. **Override hindsight embedder** (HIGH-PRI) — `HINDSIGHT_API_EMBEDDINGS_LITELLM_MODEL=ollama/qwen3-embedding:0.6b` + `..._API_BASE=http://127.0.0.1:16700`. Default `text-embedding-3-small` (`config.py:560`) silently burns OpenAI. Cost 2.
3. **Verify `HINDSIGHT_LLM_PROVIDER=claude-code`** resolves (avoids quota-dead `OPENAI_API_KEY`) — `MEMORY-ULTIMATE §3`.
4. **Watchlist `byterover/campfirein-cli`** — only 87-grade graphiti-pair with native CC skill. STUDY-PILOT lane.
5. **No engine swap.** Mastra (94.87 self) strongest non-incumbent but Q5 = 4/10 loses to hindsight 10/10.

## §5 — `topoteretes/cognee-integration-claude` re-add?

**NO. Category mismatch** (`COGNEE §0.6`, composite 48 / REJECT-FOR-FIT). It is a Python *Agent SDK* helper, not a CC integration: D11 ≈ 0, no LICENSE (cardinal-rule-1 blocker), `migration_status: pending` 5-mo stale. The cognee-CC pathway you want is `cognee-integrations` (the **plugin**, §4 item 1) — not this repo.

## §6 — MIRIX / A-MEM / Mem0g cross-check

| System | Reported | Disposition |
|---|---|---|
| **MIRIX** (arxiv 2507.07957) | LoCoMo 85.4 | CITE-PATTERN — research-tier (`RAG-COVERAGE §2`); hierarchy parallels hindsight session/cross-session split; no CC primitive |
| **A-MEM** (arxiv 2502.12110) | zettelkasten | SUBSUMED — already realised by hindsight T1 structured-fact graph (`W262 §2`) |
| **Mem0g** (mem0.ai blog) | LoCoMo 91.6 / LME 94.4 | REJECT — SaaS-only; OSS install measures 49-66 % (`Q3`) |

None displaces the incumbent — pattern signals already reflected in hindsight; Mem0g takedown already in `MEMORY-SOTA-EVIDENCE §Q3`.

## §7 — Definitive SHIP verdicts

| Tier | Incumbent | Verdict | Rationale |
|---|---|---|---|
| **T0** | CC-native CLAUDE.md ≤50 LOC + Auto-Memory-off | KEEP | CCBP `claude-memory.md:34-40`; deliberate opt-out per `CLAUDE.local.md` |
| **T1** | `vectorize-io/hindsight` 0.6.5 | KEEP-INCUMBENT | 27/30; Q5 = 10/10; stat-tie at LongMemEval top |
| **T2** | `doobidoo/mcp-memory-service` | KEEP-INCUMBENT | 25/30; sqlite_vec live |
| **T3** | (removed cognee) | DEFERRED-CONDITIONAL | Re-add `cognee-memory` PLUGIN only when doc-corpus workflow lands |
| **T4** | `graphiti` FalkorDB + Ollama qwen3:8b | KEEP-INCUMBENT | 24/30; highest cross-agreed score |

**Actions by ROI:** (1) override hindsight embedder env vars (cost 2 — kills silent OpenAI spend); (2) verify `HINDSIGHT_LLM_PROVIDER=claude-code` (cost 1); (3) append W262 §2 decision tree as §6 of `MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md` (cost 1).

**Net: 4-tier is SOTA-converged. 49/50 catalog saturation; genuine gaps 0; no swaps; two config deltas.**
