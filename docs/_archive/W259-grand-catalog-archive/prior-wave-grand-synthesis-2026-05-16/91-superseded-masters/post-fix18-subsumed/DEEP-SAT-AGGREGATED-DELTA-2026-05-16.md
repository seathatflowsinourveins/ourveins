# DEEP-SATURATION AGGREGATED DELTA — V-FINAL (post-OPERATOR-DECISIONS supplement)

**2026-05-16 · 21:00 PT · Per-layer deep-saturation findings from 6 parallel forks**

> Operator feedback: "memory mcp and much more layers didnot fully convered with all the sota repos". Dispatched 6 DEEP-SATURATION forks targeting under-covered layers (L0.2 Memory-MCP, L0.4 Code-Intel, L0.5 Security, L0.6+L5.5 Parallel-Agent, L0.MCP All-Servers, L4 Eval+Obs). Each fork: 10 GraphQL probes + 25-30 name-searches + D1-D8 scoring per repo.

---

## §1 — NEW INSTALLs to ADD to OPERATOR-DECISIONS Phase 0/1 (high-fitness deep-sat finds)

### L0.4 Code-Intel — chunkhound is the standout

| Repo | ★ | License | Why DECISIVE-INSTALL |
|---|---|---|---|
| **chunkhound/chunkhound** | 1,258 | MIT | **HIGHEST FITNESS for this runtime** — v5.0.0 ships **Claude Opus 4.7/4.6 + Sonnet 4.6 defaults**, 33 langs, local DuckDB, native MCP. Better fit than Aider for runtime indexing. |
| **probelabs/probe** | 595 | Apache-2.0 | Rust ripgrep+tree-sitter, daily-cadence RC releases, native MCP |
| **cocoindex-io/cocoindex-code** | 1,661 | Apache-2.0 | "70% token reduction" AST-based, native MCP |
| **bgauryy/octocode-mcp** | 832 | MIT | Cross-repo public+private GitHub-auth semantic queries |
| **kantord/SeaGOAT** | 1,291 | MIT | Local-first CLI semantic search |
| **Aider-AI/aider** | 44,891 | **Apache-2.0 VERIFIED via LICENSE SHA** | TIER-1 SOTA CLI; daily commits; 12 active 3rd-party adapters; score 74/80; pair with `disler/aider-mcp-server` (297★) |

### L0.2 Memory MCP — supermemoryai/claude-supermemory is TIER-1 native CC plugin

| Repo | ★ | Native-CC | Why DECISIVE-INSTALL |
|---|---|---|---|
| **supermemoryai/claude-supermemory** | 2,500 | **T1 official `/plugin install`** | ONLY TIER-1 native CC plugin in memory class |
| **MemoriLabs/Memori** | 14,500 (10mo) | T3 MCP | High-velocity in 10 months |
| **rohitg00/agentmemory** | 10,000 | T3 MCP | High-velocity |
| **elvismdev/mem0-mcp-selfhosted** | n/a | T3 MCP | **REPLACES mem0-mcp** (which is ARCHIVED) |
| **basicmachines-co/basic-memory** | n/a | T2 community | Karpathy LLM-KB pattern (4+ repo convergence) |
| **Vvkmnn/claude-historian-mcp** + **alioshr/memory-bank-mcp** + **blader/napkin** | varies | T2-T3 | Conversation-history sub-lane (CC-specific niche) |

**L0.2 architecture decision**: SPLIT into 5 sub-lanes — L0.2-A vector / L0.2-B KG / L0.2-C agent-state / L0.2-D conversation-history / L0.2-E RAG+cache. 8-10 final INSTALL rows (vs prior 5).

### L0.MCP All Servers — top-tier 75-80/80 INSTALL

| Repo | Sum/80 | License | Why |
|---|---|---|---|
| **ChromeDevTools/chrome-devtools-mcp** | **80/80** | Apache | Google OFFICIAL — was MISSING, now top-tier MAX |
| **modelcontextprotocol/servers** | 78/80 | MIT | Official MCP substrate |
| **googleapis/mcp-toolbox** | 78/80 | Apache | Google OFFICIAL |
| **github/github-mcp-server** | 78/80 | MIT | GitHub OFFICIAL |
| **bytebase/dbhub** | 75/80 | Apache | Database MCP unified |
| **containers/kubernetes-mcp-server** | 75/80 | Apache | K8s MCP |

### L0.5 Security — 4-sub-lane SPLIT recommendation

NEW INSTALLs:
| Repo | Sub-lane | D8/10 | Why |
|---|---|---|---|
| **zizmorcore/zizmor** | L0.5.b SUPPLY-CHAIN-SIGN | 99 | GitHub Actions security (4.9k★) |
| **cedar-policy/cedar** | L0.5.d AGENT-DEFENSE policy | 98 | AWS Cedar authz (1.5k★) |
| **sigstore/cosign + rekor** | L0.5.b SUPPLY-CHAIN-SIGN | 99/92 | Signing infrastructure |
| **Anthropic-Cybersecurity-Skills** | L0.5.d AGENT-DEFENSE | 80 | 6.3k★ semi-official |
| **lasso-security/claude-hooks** | L0.5.d AGENT-DEFENSE | 80 | 239★ CC-specific prompt-injection defense |
| **kaplanelad/shellfirm** | L0.5.d AGENT-DEFENSE guardrails | 78 | 906★ shell guardrails |
| **snyk/agent-scan** | L0.5.c AGENT-AUDIT | n/a | Renamed from InvariantLabs/mcp-scan (2.4k★ confirmed) |
| **cisco-ai-defense/mcp-scanner** | L0.5.c AGENT-AUDIT | n/a | Cisco-org backed |

**L0.5 architecture**: SPLIT into 4 sub-lanes — L0.5.a SECRETS / L0.5.b SUPPLY-CHAIN-SIGN / L0.5.c AGENT-AUDIT / L0.5.d AGENT-DEFENSE.

### L0.6+L5.5 Worktree+Parallel-Agent — CRITICAL FINDS

| Repo | ★ | License | Why DECISIVE-INSTALL |
|---|---|---|---|
| **raine/workmux** | n/a | MIT | **ONLY CLI binary with LITERAL `claude plugin marketplace add` integration** — strongest native-CC-pathway in field |
| **fynnfluegge/agtx** | n/a | Apache-2.0 | **Uniquely implements D1 Phase-routed cross-model dispatch** (Gemini→research, Claude→implement, Codex→review) — aligns with Path P |
| **automazeio/ccpm** | 8,113 | MIT | Pure skill install (zero-infra) |
| **BloopAI/vibe-kanban** | 26,286 | Apache-2.0 | Highest adoption |
| **Wirasm/worktree-manager-skill + Spillwave/parallel-worktrees** | varies | MIT | Pure skills zero-infra |

**L0.6 architecture**: SPLIT into 3 sub-lanes — L0.6a worktree-runner / L0.6b multi-agent-orchestrator / L0.6c terminal-mux.

**L5.5 5-class dispatch-strategy taxonomy** (NEW codification):
- D1 Phase-routed cross-model (agtx)
- D2 Reviewer-fan-out
- D3 Issue-routed
- D4 Tier-routed cost-aware
- D5 Lock-coordinated farm

**REJECTS confirmed in L0.6**: claude-squad+herdr (AGPL), cmux (GPL-3.0), agor (BSL until 2029), golutra (BSL until 2030).

### L4 Eval+Obs — Phoenix RETAINED, Opik STUDY-PILOT

**DEFINITIVE Phoenix vs Langfuse vs Opik comparison (47-row matrix)**:

| Verdict | Action |
|---|---|
| **RETAIN Phoenix as incumbent** | Phoenix has 3 Claude-Code-unique substrates competitors DON'T: `openinference-instrumentation-claude-agent-sdk`, `@arizeai/phoenix-cli` "for Claude Code", dedicated coding-agent skill in repo |
| Install Opik in STUDY-PILOT alongside | OSS-purity edge cases |
| Langfuse MCP weak | 2 tools vs Opik's 7 toolsets |
| Zero Anthropic-official L4 plugins | Only vendor MCPs + OpenInference instrumentation |

## §2 — REJECTS / RETRACTIONS confirmed by deep-sat

- **mem0-mcp ARCHIVED** → use `elvismdev/mem0-mcp-selfhosted` or `pinkpixel-dev/mem0-mcp`
- **protectai/rebuff ARCHIVED** confirmed
- **mozilla/sops** → renamed to **getsops/sops** (verified)
- **InvariantLabs-AI/mcp-scan** → acquired/renamed to **snyk/agent-scan** (verified)
- **claude-squad + herdr + cmux + agor + golutra** = AGPL/GPL/BSL all REJECT
- **giancarloerra/SocratiCode** (2.6k★) = AGPL-3.0 — legal review required before install
- **ShebinKMohan/Grove** NOT FOUND (likely misnomer)
- **Tom Farley triad** NOT findable in fresh 2026-05-16 probe (was in W237 corpus only — may be sibling-local)

## §3 — Architecture Updates from Deep-Sat

| Layer | Prior state | Deep-sat recommendation |
|---|---|---|
| L0.2 | Monolithic agent-memory cohort | SPLIT into 5 sub-lanes (vector/KG/agent-state/conversation-history/RAG+cache) |
| L0.5 | Monolithic security | SPLIT into 4 sub-lanes (SECRETS/SUPPLY-CHAIN-SIGN/AGENT-AUDIT/AGENT-DEFENSE) |
| L0.6 | Monolithic git-worktree | SPLIT into 3 sub-lanes (worktree-runner/multi-agent-orchestrator/terminal-mux) |
| L0.MCP | General catalog | 11 sub-types catalogued; 11 cohort GAPS identified (comm/office/cloud-control/etc.) |
| L0.4 | Code-intel general | Best modeled as MCP-server fleet at L0 (NOT separate horizontal layer) |
| L4 | Eval+Obs primary Phoenix | RETAIN Phoenix as incumbent + Opik STUDY-PILOT alongside |
| L5.5 | Generic durable execution | 5-class dispatch-strategy taxonomy NEW (D1-D5) |

## §4 — Final Saturation Stats (cumulative)

| Tranche | Repos probed | Net-new scored |
|---|---|---|
| V4 5 BACKLOG-TRANCHE (A-E) | ~600 | ~480 |
| V5 4 BACKLOG-TRANCHE (F/G/H/I) | ~480 | ~150 |
| V-FINAL 2 (J/K license+frontier) | 32 | 7 |
| **V-FINAL 6 DEEP-SAT (this round)** | **320** | **220** | 
| **CUMULATIVE TOTAL** | **~1,432 unique probed** | **~857 net-new scored** |

## §5 — Net Phase 0/1 INSTALL Additions (post-deep-sat)

Add to OPERATOR-DECISIONS-V-FINAL Phase 0/1:

**Phase 0 immediate additions** (license-clean, high-fitness):
1. **chunkhound/chunkhound** L0.4 (MIT native-MCP, ships Opus 4.7 defaults)
2. **supermemoryai/claude-supermemory** L0.2 (TIER-1 native CC plugin)
3. **raine/workmux** L0.6 (MIT, native plugin marketplace integration)
4. **chrome-devtools-mcp** L0.MCP (80/80 Google OFFICIAL)
5. **googleapis/mcp-toolbox** L0.MCP (78/80 Apache)
6. **automazeio/ccpm** L0.6 (8113★ MIT pure skill)

**Phase 1 (this week)**:
7. **fynnfluegge/agtx** L0.6+L5.5 (Apache, Path P dispatch)
8. **Aider-AI/aider** L0.4 (Apache verified, 44.9k★) + disler/aider-mcp-server
9. **bytebase/dbhub** L0.MCP (75/80)
10. **containers/kubernetes-mcp-server** L0.MCP (75/80)
11. **zizmorcore/zizmor** L0.5.b (99/100 GitHub Actions security)
12. **cedar-policy/cedar** L0.5.d (98/100 policy)
13. **sigstore/cosign + rekor** L0.5.b (signing infrastructure)
14. **Anthropic-Cybersecurity-Skills** L0.5.d (6.3k★)
15. **lasso-security/claude-hooks** L0.5.d (239★ CC-specific injection defense)
16. **probelabs/probe** L0.4 (Apache native-MCP)
17. **cocoindex-io/cocoindex-code** L0.4 (Apache native-MCP)

**Phase 2 (within month)**:
18. **MemoriLabs/Memori** L0.2 (14.5k★)
19. **rohitg00/agentmemory** L0.2 (10k★)
20. **basicmachines-co/basic-memory** L0.2 (Karpathy LLM-KB pattern)
21. **BloopAI/vibe-kanban** L0.6 (26.3k★ Apache)
22. **Vvkmnn/claude-historian-mcp + alioshr/memory-bank-mcp** L0.2-D (conversation-history sub-lane)
23. **Opik STUDY-PILOT** L4 (OSS-purity edge cases — alongside Phoenix incumbent)
24. **kaplanelad/shellfirm** L0.5.d (906★ shell guardrails)
25. **bgauryy/octocode-mcp + kantord/SeaGOAT** L0.4 (cross-repo + local-first semantic)

## §6 — Status

**SATURATION ACHIEVED through deep-per-layer probing.** Operator's concern about "memory MCP and much more layers under-covered" is RESOLVED — 320 deep-sat repos scored across 6 critical layers with 25 net-new Phase 0/1/2 INSTALLs surfaced.

**Total cumulative session**: 40 parallel forks + 14 codex T1 audits + ~1,432 unique repos D1-D8 scored + ~857 net-new = comprehensive landscape mapped.

**Operator-Decisions update**: This delta file should be read ALONGSIDE `OPERATOR-DECISIONS-V-FINAL-2026-05-16.md`. Phase 0/1 install list grows from 25 to ~50 items with these 25 deep-sat additions.
