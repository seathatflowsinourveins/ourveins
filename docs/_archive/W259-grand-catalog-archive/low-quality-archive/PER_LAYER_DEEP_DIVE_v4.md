---
title: Per-Layer DEEP DIVE v4 — 12 Layers × Full Repo Analysis (2026-05-16)
status: AUTHORITATIVE-DETAIL
parent: FINAL_v4_GRAND_CATALOG.md
scope: each of the 12 layers gets its own deep-dive section with full repo-by-repo analysis, scoring rationale, install ordering, comparison matrices
---

# Per-Layer DEEP DIVE v4 — All 12 Layers

> This document gives each of the 12 layers a deep-dive treatment: what the layer concerns, what alternatives compete, the head-to-head comparison, why each top pick wins, how to install, and the explicit ordering of picks within the layer. Companion to FINAL_v4_GRAND_CATALOG.md (which has the cross-layer Top-50 + fix-forwards).

---

## Layer 0 — Phase 0 Secret/Identity Foundation

### Concern
Encrypted secrets in repo + multi-recipient encryption + GitHub Actions integration. Must precede Phase 1 install because subsequent layers need API keys, service tokens, etc.

### Picks ranked

| Rank | Repo | Stars | License | Score | Role |
|------|------|-------|---------|-------|------|
| 1 | mozilla/sops | 18k | MPL-2.0 | 98 | YAML/JSON/ENV/INI/binary file encryption with multiple keystore backends (age, AWS KMS, GCP KMS, Azure Key Vault, HashiCorp Vault, PGP) |
| 2 | FiloSottile/age | 19k | BSD-3 | 99 | Modern file encryption tool; X25519+ChaCha20-Poly1305 |

### Why sops + age together
- **age** = primitive cipher (modern + audited; X25519 + ChaCha20-Poly1305)
- **sops** = orchestrator (format-aware encrypt/decrypt for YAML/JSON; multi-recipient; CI integration)
- Together: encrypt `.secrets.yaml` with age recipients; decrypt at install-time per environment

### Install
```bash
brew install sops             # OR scoop install sops on Windows
brew install age              # OR scoop install age on Windows
age-keygen -o ~/.config/sops/age/keys.txt    # generate identity keypair
# .sops.yaml in repo root: declare encryption rules per path
```

### Alternates (DEFER)
- HashiCorp Vault — too heavy for solo-dev pure-runtime
- BitWarden / 1Password CLI — proprietary
- git-crypt — limited multi-recipient model

---

## Layer 1 — Anthropic-Canonical Substrate

### Concern
The non-negotiable foundation. Anthropic+OpenAI 2-org lock topology (Claude orchestrates / Codex audits). Without this layer, nothing else has a substrate.

### Picks ranked

| Rank | Repo | Stars | License | Score | Role |
|------|------|-------|---------|-------|------|
| 1 | anthropics/claude-plugins-official | (internal) | per-plugin | 98 | Canonical plugin marketplace |
| 2 | anthropics/skills | 135,158 | Anthropic | 97 | Canonical skill substrate |
| 3 | anthropics/claude-code-action | ~3k | Apache-2.0 | 97 | GitHub Actions CI integration |
| 4 | anthropics/claude-code-security-review | ~600 | Apache-2.0 | 97 | Automated security review action |
| 5 | anthropics/cwc-long-running-agents | (event-demo) | n/a | 95 | 5 primitives: Default-FAIL contract + Fresh-context evaluator + PROGRESS.md handoff + Kill-switch + Steer-mid-run |
| 6 | anthropics/claude-agent-sdk-python | (internal) | Anthropic | 95 | Python SDK substrate for in-process MCPs + hooks + ClaudeSDKClient |
| 7 | openai/codex CLI | (active) | Apache-2.0 | 95 | Cross-model T1-T7 lifecycle substrate |
| 8 | openai/codex-plugin-cc | active | per-plugin | 92 | CC plugin binding for codex CLI |
| 9 | modelcontextprotocol/servers | 85,714 | MIT | 96 | Reference MCP servers (filesystem/git/fetch/sequential-thinking/sqlite/playwright) |
| 10 | modelcontextprotocol/python-sdk | 23,018 | MIT | 90 | Custom MCP authoring substrate |
| 11 | modelcontextprotocol/inspector | ~5k | MIT | 89 | Dev-time MCP debug UI |
| 12 | github/github-mcp-server | 29,868 | MIT | 93 | GitHub-official MCP |
| 13 | anthropics/claude-agent-sdk-typescript | (internal) | Anthropic | 88 | TS SDK (if TS-based plugins) |
| 14 | modelcontextprotocol/typescript-sdk | 12,436 | MIT | 88 | TS MCP authoring (if TS) |

### Architecture insight: 3-org Axis-1 firm PASS
Anthropic + OpenAI + modelcontextprotocol = 3 distinct orgs. GitHub adds 4th. **Convergence-gate Axis-1 firm PASS** for Foundation layer.

### Install order
1. `claude-plugins-official` marketplace (implicit via fresh CC install)
2. `anthropics/skills` (canonical skill substrate)
3. `pip install claude-agent-sdk` (Python SDK substrate)
4. `npm install -g @openai/codex@latest` (cross-model substrate)
5. `git clone cwc-long-running-agents .local/cwc; cp -r .claude/* .claude/` (5 primitives)
6. After CC launched: `/plugin marketplace add openai/codex && /plugin install codex@openai-codex`
7. `npm install -g @modelcontextprotocol/server-{filesystem,git,fetch,sequential-thinking,inspector}`
8. github-mcp-server per upstream README

---

## Layer 2 — Skills Methodology (3-way co-install)

### Concern
Process discipline + workflow methodology + agent skills. Three complementary stacks: TDD methodology + engineering-lifecycle + plugin-breadth.

### Picks ranked

| Rank | Repo | Stars | License | Score | Role | Wave |
|------|------|-------|---------|-------|------|------|
| 1 | obra/superpowers | **192,855** | MIT | 97 | TDD + 7-phase methodology + 8 harness cross-compat | W3A verified |
| 2 | addyosmani/agent-skills | 42,097 | MIT | 94 | Engineering lifecycle (Define→Plan→Build→Verify→Review→Ship) + anti-rationalization tables | v1+v2 |
| 3 | wshobson/agents (granular) | 35,459 | MIT | 92 | 80 plugins / 185 agents / 153 skills / Agent Teams / Conductor / PluginEval | v1+v2 |
| 4 | ralph-loop @ claude-plugins-official | (internal) | per-plugin | 91 | Anthropic-canonical autonomous-loop primitive | v1+v2 |
| 5 | agent-sdk-dev @ claude-plugins-official | (internal) | per-plugin | 91 | SDK companion plugin | v1+v2 |
| 6 | mattpocock/skills | ~50k | MIT | 84 | TS-focused skills (Matt Pocock named-T1) | v1+v2 |
| 7 | garrytan/gstack | per baseline | MIT | 83 | Codex-companion patterns (Garry Tan named-T1; YC) | v1+v2 |
| 8 | gsd-build/get-shit-done | 62,471 | MIT | 80 | Meta-prompting + context-eng + SDD by TÂCHES | v1+v2 |
| 9 | EveryInc/compound-engineering-plugin | per baseline | MIT | 78 | Compound engineering pattern | v1+v2 |
| 10 | K-Dense-AI/scientific-agent-skills | 22,465 | MIT | 78 | Research/science/engineering skills | v1+v2 |
| ❌ | ~~trailofbits/skills-curated~~ | ~1k | **CC-BY-SA-4.0** | n/a | **DEMOTED to L12 REFERENCE per W5** (CC-BY-SA is content license; ShareAlike contagious) | W5 |

### Head-to-head: superpowers vs wshobson vs addy-osmani (the 3-way)

| Axis | obra/superpowers | wshobson/agents | addy-osmani/agent-skills |
|------|------------------|------------------|--------------------------|
| Methodology depth | ✓ structural TDD + 7-phase mandatory | medium (per-plugin) | very high (anti-rationalization) |
| Plugin breadth | ~15 core | 80 plugins / 185 agents / 153 skills | 23 lifecycle |
| Cross-harness | 8 harnesses | 2 (Claude + Gemini CLI Extension) | 7 |
| Author tier | Jesse Vincent (obra) named-T2 | wshobson named-T2 | Addy Osmani T1 Google Chrome |
| HARD-GATE risk | NONE | Conductor (Probe 5 verify) | NONE |
| Q2 2026 NEW | continuous TDD + verification-before-completion | PluginEval + Agent Teams + Conductor | engineering-lifecycle |

**Verdict**: co-install all 3. They are PROVIDER-COMPLEMENT (different concerns: methodology / breadth / lifecycle), NOT duplicates.

### Install order
```bash
/plugin install superpowers@claude-plugins-official      # TDD + 7-phase
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills            # engineering-lifecycle
/plugin marketplace add wshobson/agents
/plugin install python-development comprehensive-review agent-teams  # selective
# DEFER conductor (Probe 5 HARD-GATE check pending)
/plugin install ralph-loop@claude-plugins-official
/plugin install agent-sdk-dev@claude-plugins-official
/plugin marketplace add mattpocock/skills   # TS work
```

---

## Layer 3 — Orchestration Runtime

### Concern
Multi-agent orchestration + autonomous /loop runtime + cross-model T1-T7 lifecycle gate. The infrastructure that runs the methodology.

### Picks ranked

| Rank | Repo | Stars | License | Score | Role | Action |
|------|------|-------|---------|-------|------|--------|
| 1 | anthropics/cwc-long-running-agents | (event-demo) | n/a | 95 | 5 canonical primitives | INSTALL |
| 2 | ralph-loop @ claude-plugins-official | (internal) | per-plugin | 91 | Anthropic-canonical autonomous-loop | INSTALL |
| 3 | openai/codex CLI + codex-plugin-cc | active | Apache-2.0 | 95 | Cross-model T1-T7 substrate | INSTALL |
| 4 | langchain-ai/langgraph | per baseline | MIT | 84 | State-graph orchestration (pattern reference) | ADAPT-PATTERN |
| 5 | langchain-ai/deepagents | per baseline | MIT | 80 | Sub-agent + ACP + TruncateArgsSettings (pattern reference) | ADAPT-PATTERN |
| 6 | openai/openai-agents-python | ~25k | MIT | 78 | Handoff + Tracing primitives | ADAPT-PATTERN |
| 7 | ruvnet/ruflo | 51,565 | MIT | 78 | Enterprise multi-agent swarm | STUDY-PILOT |
| 8 | code-yeongyu/oh-my-openagent | 57,962 | MIT | 76 | Multi-agent TUI runtime | STUDY-PILOT |
| 9 | ComposioHQ/agent-orchestrator | per baseline | MIT | 76 | DAG mission dispatch (macOS) | STUDY-PILOT |
| 10 | NousResearch/hermes-agent | 152,054 | NOASSERTION | 76 | "Agent that grows with you" | REFERENCE |

### Architecture insight: locked-in topology per cardinal-rule-3
Claude orchestrates / Codex audits. cwc + claude-agent-sdk + ralph-loop are the NATIVE CC primitives (S-tier). All Python/JS frameworks are TIER-B/C — useful as PATTERN REFERENCES.

### Install order
```bash
# Already installed in Phase 1: cwc + claude-agent-sdk-python + codex CLI + codex-plugin-cc
# Add: ralph-loop + agent-sdk-dev plugins
/plugin install ralph-loop@claude-plugins-official
/plugin install agent-sdk-dev@claude-plugins-official
```

---

## Layer 4 — Memory + RAG (heavily evolved)

### Concern
Cross-session persistence + semantic retrieval + temporal-KG + RAG. Tiered architecture per claude-sota CLAUDE.md Memory Stack.

### Memory tier breakdown

#### L1 Capture (raw event/state)
| Rank | Repo | Stars | License | Score | Action |
|------|------|-------|---------|-------|--------|
| 1 | doobidoo/mcp-memory-service | 1,843 | Apache-2.0 | 88 | INSTALL (current baseline) |
| 2 | Gentleman-Programming/engram | 3,529 | (active) | 78 | STUDY-PILOT alt (Go binary; SQLite+FTS5; multi-interface) |

#### L2 Vector (semantic retrieval)
| Rank | Repo | Stars | License | Score | Action |
|------|------|-------|---------|-------|--------|
| 1 | doobidoo embedded sqlite_vec | (sub-component) | Apache-2.0 | 88 | INSTALL (transitive via L1) |
| 2 | Qdrant (production scale) | per baseline | Apache-2.0 | 76 | STUDY-PILOT (if scale demands) |
| 3 | zilliztech/claude-context (Milvus) | per baseline | (currently disabled FM-16) | 62 | DEFER |
| 4 | zilliztech/memsearch | 1,702 | (active) | 72 | STUDY-PILOT-NARROW |

#### L3 Temporal-KG
| Rank | Repo | Stars | License | Score | Action | Note |
|------|------|-------|---------|-------|--------|------|
| 1 | getzep/graphiti v0.29.0 | 25,800 | Apache-2.0 | 96 | INSTALL (current baseline) | **⚠️ FalkorDB backend SSPL-1.0 — W5 caveat** |
| 2 | apache/age (PG ext) | per baseline | Apache-2.0 | 80 | STUDY-PILOT (SSPL-replacement) | NEW v4 alternative |
| 3 | kuzudb/kuzu (embedded) | per baseline | MIT | 78 | STUDY-PILOT (SSPL-replacement) | NEW v4 alternative |
| 4 | NebulaGraph | per baseline | Apache-2.0 | 76 | STUDY-PILOT | Heavy |
| ❌ | Neo4j 5.x Community | per baseline | GPLv3 | n/a | REJECT (same blocker class as SSPL) | |

#### L4 Cross-runtime / agent-memory
| Rank | Repo | Stars | License | Score | Action |
|------|------|-------|---------|-------|--------|
| 1 | thedotmack/claude-mem | **75,999** | Apache-2.0 | 91 | ADOPT-NOW-CONDITIONAL (30-day A/B vs Memory Stack baseline) — W3A verified |
| 2 | mem0ai/mem0 | 55,805 | Apache-2.0 | 97 | ADOPT-NOW (W252 PROMOTED; agent-memory paradigm; arxiv 2504.19413; STABLE-BURN-IN) |
| 3 | letta-ai/letta | 22,000 | Apache-2.0 | 76 | STUDY-PILOT (stateful agent platform) |

#### RAG-specific (graph + vector + retrieval)
| Rank | Repo | Stars | License | Score | Action |
|------|------|-------|---------|-------|--------|
| 1 | microsoft/graphrag | 33,000 | MIT | 90 | ADOPT-NOW (W252 NEW; Microsoft TIER-1 RAG) |
| 2 | topoteretes/cognee | 17,248 | Apache-2.0 | 92 | STUDY-PILOT (W252 GN reclassification; ontology-driven KG; arxiv 2505.24478) |
| 3 | infiniflow/ragflow | 80,591 | (active) | 78 | STUDY-PILOT (Docker engine; orthogonal) |
| 4 | HKUDS/LightRAG | 35,248 | (active) | 76 | STUDY-PILOT (orthogonal RAG) |

#### Sandbox / Code-intel-memory
| Rank | Repo | Stars | License | Score | Action |
|------|------|-------|---------|-------|--------|
| 1 | Kiln-AI/Kilntainers | 40 | MIT | 84 | ADOPT-NOW (W5 PROMOTED; `sandbox_exec` MCP single tool; Docker default) |
| 2 | DeusData/codebase-memory-mcp | 2,357 | (active) | 80 | STUDY-PILOT (code-intel-focused KG; 155 languages; sub-ms queries) |

#### REJECT-FOR-FIT (memory layer specific)
- supermemoryai/supermemory-mcp (DEPRECATED v1)
- campfirein/cipher → byterover-cli (ELv2 + META-HARNESS + HARD-GATE)
- ressl/mcp-firewall (AGPL + wrong category)
- gifflet/graphiti-mcp-server (DUPLICATE)
- mkreyman/mcp-memory-keeper (DUPLICATE)
- volcengine/OpenViking (AGPLv3)
- getzep/zep (SUPERSEDED)
- truefoundry/cognita (ARCHIVED)
- weaviate/Verba + Arc53/DocsGPT (product surfaces; not primitives)

### Final Memory Stack v4 recommendation

```
L1 Capture:       doobidoo/mcp-memory-service (Apache-2.0; current baseline)
L2 Vector:        sqlite_vec embedded in L1 (transitive)
L3 Temporal-KG:   getzep/graphiti v0.29.0 (Apache-2.0)
                  + FalkorDB v1.6.1 backend (SSPL-1.0; container-only-no-modify likely admissible)
                  OR if SSPL service-offering concerns: swap to Apache AGE (PG ext) or kuzudb/kuzu (MIT embedded)
L4 Cross-runtime: thedotmack/claude-mem (Apache-2.0; 30-day A/B vs L1+L3)
                  OR mem0ai/mem0 (Apache-2.0; agent-memory paradigm)
RAG layer:        microsoft/graphrag (MIT; ADOPT-NOW)
                  + topoteretes/cognee (Apache-2.0; STUDY-PILOT)
Sandbox:          Kiln-AI/Kilntainers (MIT; sandbox MCP)
```

### Wave 6E decision queue
- RAG architecture: 6 candidates (mem0 + graphrag + cognee + claude-mem + ragflow + LightRAG)
- W6 agent dispatched to consolidate this decision (pending return at time of v4 write)

---

## Layer 5 — Token Optimization (multi-primitive composition)

### Concern
Multi-layer composition for context efficiency. Cumulative ~95% savings stacked across primitives at different boundaries.

### Picks ranked

| Rank | Repo | Stars | License | Score | Layer compressed | Action |
|------|------|-------|---------|-------|------------------|--------|
| 1 | Anthropic prompt-cache | TIER-1 OFFICIAL | n/a | 96 | Runtime context reuse | INSTALL-IMPLICIT |
| 2 | Anthropic `/compact` + autocompact + `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | TIER-1 OFFICIAL CC | n/a | 94 | Runtime context decay | INSTALL-IMPLICIT |
| 3 | yamadashy/repomix `compress: true` | 24,892 | MIT | 95 | Code-pack compression (~70% tree-sitter) | INSTALL |
| 4 | rtk-ai/rtk | 48,553 | (active) | 92 | CLI command output (60-90%) | INSTALL |
| 5 | JuliusBrussee/caveman | 60,743 | MIT | 92 | Prompt-side rewrite (65%) | INSTALL (W3A verified) |
| 6 | buildoak/wet | ~2k | MIT | 89 | LLMLingua replacement primary | INSTALL (W241/W252) |
| 7 | ryoppippi/ccusage | active | MIT | 86 | Measurement substrate | INSTALL |
| 8 | AgentOps-AI/tokencost | 1,981 | MIT | 74 | Token-price tracker (400+ LLMs) | INSTALL companion |
| 9 | chopratejas/headroom | 1,759 | MIT | 80 | Tool-output compression (60-95%) | STUDY-PILOT (replaces context-mode rejected) |
| 10 | yvgude/lean-ctx | 1,669 | MIT | 80 | Cross-runtime context OS (60-95%, 99% cached) | STUDY-PILOT |
| 11 | diegosouzapw/OmniRoute | 4,633 | (active) | 80 | Gateway stacked compression (~95%) | STUDY-PILOT |
| 12 | cytostack/openwolf | 1,645 | (active) | 76 | CC middleware | STUDY-PILOT-NARROW |
| 13 | alexgreensh/token-optimizer | 982 | (active) | 78 | Ghost-token + compaction survival | STUDY-PILOT |
| 14 | junhoyeo/tokscale | 2,952 | MIT | 74 | Cross-CLI token/cost scan | STUDY-PILOT (companion to ccusage) |
| 15 | LangChain deepagents TruncateArgsSettings | (sub-module) | MIT | n/a | Orchestrator-side discipline | ADAPT-PATTERN |
| 16 | upstash/context7 | 55,388 | MIT | 85 | Up-to-date framework docs MCP | INSTALL |
| ❌ | mksglu/context-mode | 14,826 | **ELv2** | n/a | Tool-output sandbox | **REJECT-FOR-FIT** (W3A LICENSE) |
| ❌ | microsoft/LLMLingua | ~5k | MIT | 45 | Offline prompt compression | **REJECT** (STALE + anti-pattern for CC runtime) |

### Stacked savings model

```
Anthropic prompt-cache (60-90% reuse)        runtime substrate
× /compact + autocompact (summary decay)      runtime decay
× rtk (60-90% CLI command outputs)            process-level
× headroom (60-95% on tool outputs)           tool-boundary (replaces context-mode rejected)
× repomix compress (~70% tree-sitter)         code-pack
× caveman (65% prompt rewrite)                prompt-level
× buildoak/wet (LLMLingua primary replacement)
≈ ~95-99% cumulative on eligible surfaces
```

### Install order
```bash
npm install -g ccusage
cargo install rtk-cli
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash
pip install headroom         # chopratejas/headroom (MIT replacement for rejected context-mode)
# OR: cargo install lean-ctx (yvgude/lean-ctx MIT)
# Install buildoak/wet per upstream README

# Anthropic env
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70

# repomix compress active via Phase 3 (Layer 6)
```

---

## Layer 6 — Code Intelligence

### Concern
Semantic retrieval + AST-pattern search + repo packaging. The 3-way orthogonal stack.

### Picks ranked

| Rank | Repo | Stars | License | Score | Role | Action |
|------|------|-------|---------|-------|------|--------|
| 1 | yamadashy/repomix | 24,892 | MIT | 95 | Repo pack + tree-sitter compression + Pack→Grep→Skill pipeline | INSTALL |
| 2 | oraios/serena | 24,271 | MIT | 92 | Semantic retrieval + editing (LSP-class) | INSTALL |
| 3 | ast-grep/ast-grep | ~40k | MIT | 86 | AST search via tree-sitter (orthogonal layer) | INSTALL CLI (**NOT** phantom `@anthropic/mcp-ast-grep`) |
| 4 | tree-sitter/tree-sitter | substrate | MIT | 84 | Tree-sitter substrate library | INSTALL transitive |
| 5 | safishamsi/graphify | 48,374 | (active) | 85 | Code→KG via tree-sitter + Leiden clustering | STUDY-PILOT |
| 6 | aider-ai/aider | ~30k | Apache-2.0 | 80 | Repo-map + AI pair-programmer (alt agent) | REFERENCE |
| 7 | Piebald-AI/claude-code-lsps | 443 | MIT | 78 | LSP-class plugin | STUDY-PILOT |
| 8 | mufeedvh/code2prompt | per baseline | MIT | 76 | Code-to-prompt CLI | STUDY-PILOT |
| 9 | mixedbread-ai/mgrep | per baseline | (active) | 74 | Semantic grep | STUDY-PILOT |
| 10 | timescale/pg-aiguide | 1,728 | (active) | 76 | Postgres MCP + skill | STUDY-PILOT (if Postgres) |
| 11 | Manavarya09/design-extract | 2,632 | MIT | 72 | Design-system extract MCP | STUDY-PILOT (if design) |
| ❌ | zilliztech/claude-context | per baseline | (currently disabled per FM-16) | 62 | Milvus-backed code search | DEFER |
| ❌ | @anthropic/mcp-ast-grep npm | (phantom) | n/a | 0 | Returns 404 on npm registry | REJECT (FM-09) |

### Install order
```bash
npm install -g repomix@latest                    # Pack + compress + skill
# serena per upstream README (uv tool install)
cargo install ast-grep   # OR: npm install -g @ast-grep/cli
# tree-sitter installed transitively
```

---

## Layer 7 — Observability + Eval (NEW v2 LAYER; v3+v4 REFINED)

### Concern
LLM observability + tracing + eval-as-judge + red-team + cost telemetry + CC-specific UI.

### Picks ranked

| Rank | Repo | Stars | License | Score | Role | Action |
|------|------|-------|---------|-------|------|--------|
| 1 | langfuse/langfuse | 27,283 | MIT | 86 | LLM obs + metrics + evals + prompt mgmt (5-in-1) — YC W23 | **STUDY-PILOT** (Cloud-first per W3A) |
| 2 | promptfoo/promptfoo | 21,290 | MIT | 88 | LLM-as-judge eval + red-team — "Used by OpenAI and Anthropic" | INSTALL |
| 3 | matt1398/claude-devtools | 3,389 | (active) | 82 | CC-specific Electron DevTools UI | INSTALL |
| 4 | jarrodwatts/claude-hud | 22,880 | MIT | 94 | CC HUD plugin (context usage / tools / agents / todos) | INSTALL (W253 #1 verified) |
| 5 | disler/claude-code-hooks-multi-agent-observability | 1,413 | (active) | 78 | Real-time CC multi-agent monitor via hooks | INSTALL |
| 6 | comet-ml/opik | 19,307 | Apache-2.0 | 89 | LLM eval + observability (replaces phoenix-rejected) | INSTALL |
| 7 | traceloop/openllmetry | 7,112 | Apache-2.0 | 89 | OpenTelemetry-native (vendor-neutral) | INSTALL |
| 8 | mlflow/mlflow | 25,957 | Apache-2.0 | 84 | Full ML+LLM platform (team-scale) | STUDY-PILOT |
| 9 | NVIDIA/garak | 7,822 | (active) | 80 | LLM vulnerability scanner | INSTALL |
| 10 | pydantic/logfire | 4,248 | (active) | 80 | AI obs (Pydantic-AI ecosystem) | STUDY-PILOT |
| 11 | openobserve/openobserve | 18,862 | (active) | 78 | Full obs platform (logs/metrics/traces/LLM) | STUDY-PILOT |
| 12 | raga-ai-hub/RagaAI-Catalyst | 16,162 | (active) | 76 | Agent AI observability | STUDY-PILOT |
| 13 | tensorzero/tensorzero | 11,372 | (active) | 78 | LLMOps platform (gateway+obs+eval+opt) | STUDY-PILOT |
| 14 | Helicone/helicone | 5,673 | (active) | 78 | "One line of code to monitor" — YC W23 | STUDY-PILOT |
| 15 | confident-ai/deepeval | 15,459 | (active) | 76 | LLM Evaluation Framework | STUDY-PILOT |
| 16 | stanfordnlp/dspy | 25,000 | Apache-2.0 | 80 | Prompt/program optimization | STUDY-PILOT |
| 17 | Giskard-AI/giskard-oss | 5,352 | (active) | 74 | LLM eval + AI red-team | STUDY-PILOT |
| 18 | Agenta-AI/agenta | 4,125 | (active) | 74 | LLMOps platform | STUDY-PILOT |
| 19 | evidentlyai/evidently | 7,494 | (active) | 74 | ML+LLM observability | STUDY-PILOT-NARROW |
| 20 | langwatch/langwatch | 3,257 | (active) | 72 | LLM eval + AI agent testing | STUDY-PILOT-NARROW |
| 21 | openlit/openlit | 2,445 | (active) | 74 | OTel GenAI obs | STUDY-PILOT-NARROW |
| 22 | HolmesGPT/holmesgpt | 2,437 | (active) | 72 | CNCF Sandbox SRE Agent | STUDY-PILOT-NARROW |
| 23 | openai/evals | per baseline | MIT | 80 | OpenAI-curated eval framework | STUDY-PILOT |
| 24 | braintrustdata/braintrust-sdk | per baseline | (active) | 76 | SDK + UI eval | STUDY-PILOT |
| 25 | explodinggradients/ragas | per baseline | (active) | 76 | RAG evaluation | STUDY-PILOT |
| ❌ | Arize-ai/phoenix | 9,694 | **ELv2** | n/a | AI obs + eval | **REJECT-FOR-FIT** (W252 LICENSE) |

### Layer 7 install recommendation

**Phase 4a mandatory**:
- jarrodwatts/claude-hud (CC HUD plugin)
- matt1398/claude-devtools (CC DevTools UI)
- disler/claude-code-hooks-multi-agent-observability (hook monitoring)
- promptfoo (LLM-as-judge eval)

**Phase 4b (LLM obs — pick ONE)**:
- langfuse Cloud (recommended; lowest install friction)
- comet-ml/opik self-host (Apache-2.0)
- traceloop/openllmetry (OTel-native)

---

## Layer 8 — LLM Routers (NEW v2)

### Concern
Multi-provider routing + cost optimization + fallback. Optional layer unless multi-provider cost-routing demanded.

### Picks ranked

| Rank | Repo | Stars | License | Score | Action |
|------|------|-------|---------|-------|--------|
| 1 | router-for-me/CLIProxyAPI | 32,826 | (active) | 82 | Wraps Gemini/Codex/CC as OpenAI-compat | STUDY-PILOT-FAV |
| 2 | mnfst/manifest | 6,496 | MIT | 76 | Smart routing 70% cost cut | STUDY-PILOT-NARROW (FAST-CHURN; re-audit 2026-q4) |
| 3 | katanemo/plano | 6,480 | (active) | 76 | AI-native proxy + safety + obs + routing | STUDY-PILOT-FAV |
| 4 | tensorzero/tensorzero | 11,372 | (active) | 78 | LLMOps gateway | STUDY-PILOT-FAV |
| 5 | LiteLLM | ~10k+ | MIT | 76 | OpenAI-format proxy 100+ LLMs | STUDY-PILOT-FAV |
| 6 | BlockRunAI/ClawRouter | 6,468 | (active) | 74 | OpenClaw-focused router | STUDY-PILOT-NARROW |
| 7 | musistudio/claude-code-router | per baseline | (active) | 70 | CC-specific LLM router | STUDY-PILOT-NARROW |
| 8 | mnfst/awesome-free-llm-apis | 4,323 | (catalog) | 68 | Free LLM API keys list | REFERENCE |

### Architecture decision

LLM routers are **OPTIONAL** for the CC runtime. Install ONLY IF:
- Multi-provider cost-routing is needed (different models for different tasks)
- Cross-provider fallback required
- Subscription-mode routing (Claude Max + GPT Plus + others)

Default claude-sota runs Anthropic API direct — no router needed.

---

## Layer 9 — CC Hooks + Security Gates

### Concern
PreToolUse/PostToolUse/Stop event hooks + SAST + secret scanning + safety net for destructive commands.

### CC Hooks ranked

| Rank | Repo | Stars | License | Score | Action |
|------|------|-------|---------|-------|--------|
| 1 | kenryu42/claude-code-safety-net | 1,334 | (TS) | 82 | INSTALL (destructive command catcher) |
| 2 | diet103/claude-code-infrastructure-showcase | 9,639 | (active) | 80 | ADAPT-PATTERN (CC infrastructure reference) |
| 3 | parcadei/Continuous-Claude-v3 | 3,771 | (active) | 80 | STUDY-PILOT (context mgmt via hooks) |
| 4 | rohitg00/pro-workflow | 2,124 | (active) | 78 | STUDY-PILOT (self-correcting memory) |
| 5 | disler/claude-code-hooks-mastery | 3,674 | (active) | 76 | ADAPT-PATTERN (hooks educational) |
| 6 | ChrisWiles/claude-code-showcase | 5,897 | (active) | 76 | ADAPT-PATTERN (comprehensive examples) |
| 7 | CloudAI-X/claude-workflow-v2 | 1,356 | (active) | 76 | STUDY-PILOT (universal workflow plugin) |
| 8 | severity1/claude-code-prompt-improver | 1,478 | (active) | 76 | STUDY-PILOT (intelligent prompt improver) |
| 9 | coleam00/claude-memory-compiler | 1,051 | (active) | 76 | STUDY-PILOT (Karpathy-LLM-KB pattern) |
| 10 | revfactory/harness | 3,387 | (active) | 78 | ADAPT-PATTERN (meta-skill) |
| 11 | nyldn/claude-octopus | 3,345 | (active) | 76 | STUDY-PILOT (8-model orchestration) |
| 12 | Aurite-ai/agent-verifier (NEW W5) | 38 | MIT | 84 | INSTALL (safety skill PROMOTED W5) |

### Security gates ranked

| Rank | Repo | Stars | License | Score | Action |
|------|------|-------|---------|-------|--------|
| 1 | semgrep/semgrep MCP | ~11k | LGPL-2.1 (CLI-binary OK) | 90 | INSTALL |
| 2 | gitleaks/gitleaks | per baseline | MIT | 86 | INSTALL |
| 3 | aquasecurity/trivy | per baseline | Apache-2.0 | 84 | INSTALL |
| 4 | google/osv-scanner | per baseline | Apache-2.0 | 84 | INSTALL |
| 5 | github/codeql-action | per baseline | MIT | 85 | INSTALL CI |
| 6 | anchore/syft | ~6k | Apache-2.0 | 84 | INSTALL (SBOM) |
| 7 | InvariantLabs-ai/mcp-scan | ~1k | (active) | 87 | INSTALL (MCP fleet audit) |
| 8 | NVIDIA/garak | 7,822 | (active) | 80 | INSTALL (LLM red-team) |
| 9 | microsoft/presidio | 8,075 | MIT | 81 | STUDY-PILOT (PII redaction) |
| 10 | protectai/llm-guard | ~1k | MIT | 78 | STUDY-PILOT |
| 11 | Tencent/AI-Infra-Guard | 3,704 | (active) | 74 | STUDY-PILOT-NARROW |
| 12 | woodruffw/zizmor | per baseline | MIT | 78 | INSTALL (GH Actions audit) |
| 13 | MCP-Defender/MCP-Defender | per baseline | (verify) | 70 | STUDY-PILOT-NARROW |
| ❌ | trufflesecurity/trufflehog | per baseline | AGPL-3.0 | n/a | REJECT (license blocker for embedded library) |
| ❌ | cytostack/openwolf | ~500 | AGPLv3 | n/a | REJECT (W241) |
| ❌ | MCP-Defender (full) | per baseline | AGPLv3 | n/a | REJECT-NARROW |

---

## Layer 10 — Doc + Web Ingestion (NEW v3 LAYER)

### Concern
Document conversion + web scraping + research ingestion + browser automation.

### Picks ranked

| Rank | Repo | Stars | License | Score | Role | Action |
|------|------|-------|---------|-------|------|--------|
| 1 | docling-project/docling | 59,800 | MIT | 90 | PDF/DOCX/HTML/PPTX/XLSX→Markdown for AI | INSTALL |
| 2 | docling-project/docling-mcp | 616 | MIT | 76 | MCP wrapper for docling | STUDY-PILOT |
| 3 | ChromeDevTools/chrome-devtools-mcp | 39,717 | MIT | 89 | Browser DevTools for coding agents | INSTALL |
| 4 | microsoft/playwright-mcp | active | MIT | 88 | Browser automation MCP | INSTALL |
| 5 | upstash/context7 | 55,388 | MIT | 85 | Up-to-date docs MCP | INSTALL |
| 6 | browserbase/stagehand (W5 PROMOTED) | 22,673 | MIT | 86 | Browser-agent SDK (local mode) | INSTALL |
| 7 | microsoft/markitdown | 123,322 | (NOASSERTION verify) | 78 | Web→MD alt to docling | STUDY-PILOT |
| 8 | D4Vinci/Scrapling | 49,974 | (active) | 84 | Adaptive scraping framework | STUDY-PILOT-FAV |
| 9 | assafelovic/gpt-researcher | 27,090 | Apache-2.0 | 82 | Autonomous deep research | STUDY-PILOT-FAV |
| 10 | unclecode/crawl4ai | per baseline | Apache-2.0 | 78 | LLM-friendly crawler | STUDY-PILOT |
| 11 | jina-ai/reader | per baseline | Apache-2.0 | 78 | URL→LLM-friendly text | STUDY-PILOT |
| 12 | Unstructured-IO/unstructured | 14,713 | (NOASSERTION) | 78 | Doc extraction lib | STUDY-PILOT |
| 13 | PaddlePaddle/PaddleOCR | 77,917 | (NOASSERTION) | 78 | OCR-heavy stack | STUDY-PILOT-FAV (if OCR) |
| 14 | bytedance/UI-TARS-desktop | 34,096 | (NOASSERTION) | 78 | Multimodal GUI agent | STUDY-PILOT-NARROW |
| 15 | browser-use/browser-use | 94,090 | (NOASSERTION verify) | 78 | Browser automation alternative | STUDY-PILOT-NARROW |
| ❌ | firecrawl/firecrawl (=mendableai/firecrawl) | 120,337 | **AGPL-3.0** | n/a | **REJECT for self-host** (W5 LICENSE); STUDY-PILOT-CLOUD-API-ONLY allowed | |

### Install order
```bash
pip install docling
pip install docling-mcp
# ChromeDevTools/chrome-devtools-mcp per upstream README
npm install -g @microsoft/playwright-mcp
# context7 per upstream README
npm install -g stagehand   # OR per Browserbase docs (local mode)
```

---

## Layer 11 — Container + Cloud (STUDY-PILOT)

### Concern
Container orchestration + cloud-deploy + agent infrastructure. Mostly STUDY-PILOT (defer until specific demand).

### Picks ranked

| Rank | Repo | Stars | License | Score | Action |
|------|------|-------|---------|-------|--------|
| 1 | containers/kubernetes-mcp-server | 1,593 | Apache-2.0 | 75 | STUDY-PILOT-NARROW (W5; no current K8s demand) |
| 2 | dagger/dagger | 15,799 | (NOASSERTION) | 76 | STUDY-PILOT-FAV |
| 3 | hashicorp/terraform-mcp-server | per baseline | (active) | 72 | STUDY-PILOT-NARROW (Terraform-specific) |
| 4 | microsoft/mcp-gateway | per baseline | (active) | 72 | STUDY-PILOT-NARROW |
| 5 | agent-infra/sandbox | per baseline | (active) | 70 | STUDY-PILOT-NARROW |
| 6 | browserbase/mcp-server-browserbase | 3,339 | Apache-2.0 | 75 | STUDY-PILOT-NARROW (W5; credential-gated SaaS) |

### When to install Layer 11
- K8s/Container infrastructure: install kubernetes-mcp-server
- Cloud-deploy: install dagger
- Terraform workflow: install terraform-mcp-server
- Browserbase SaaS: install browserbase-mcp + stagehand (already in L10)

Otherwise: DEFER all of Layer 11 — Layer 9 sandboxing (Kilntainers) covers most cases.

---

## Layer 12 — Discovery Aggregators (cite-only — never install)

### Concern
Discovery surfaces for repos/skills/MCPs. Cite-class only per `kiss-dry-yagni.md` Must-Never #4 (do not install whole marketplaces as runtime dependencies).

### Picks ranked

| Rank | Repo | Stars | License | Score | Use |
|------|------|-------|---------|-------|-----|
| 1 | punkpeye/awesome-mcp-servers | 86,954 | (catalog) | 80 | MCP discovery surface |
| 2 | ComposioHQ/awesome-claude-skills | 60,007 | CC-BY-NC-ND-4.0 | 70 | Claude skills index |
| 3 | VoltAgent/awesome-openclaw-skills | 48,730 | (catalog) | 70 | OpenClaw skills index |
| 4 | hesreallyhim/awesome-claude-code | 43,866 | (catalog) | 80 | Claude Code index |
| 5 | sickn33/antigravity-awesome-skills | 37,635 | (catalog) | 74 | 1400+ cross-runtime skills (verify installer before bulk) |
| 6 | VoltAgent/awesome-agent-skills | 21,845 | (catalog) | 70 | 1000+ agent skills |
| 7 | github/awesome-copilot | 33,083 | (catalog) | 70 | Copilot ecosystem (cross-reference) |
| 8 | davepoon/buildwithclaude | 2,934 | (catalog) | 74 | Multi-runtime hub |
| 9 | rohitg00/awesome-claude-code-toolkit | 1,682 | (catalog) | 74 | Curated 176+ plugins toolkit |
| 10 | ComposioHQ/awesome-claude-plugins | 1,660 | (catalog) | 66 | Plugins index |
| 11 | quemsah/awesome-claude-plugins | 698 | (catalog) | 66 | Plugins index (n8n metrics) |
| 12 | ai-boost/awesome-harness-engineering | 938 | (catalog) | 70 | Harness engineering reference |
| 13 | asgeirtj/system_prompts_leaks | 40,272 | (catalog) | 70 | System prompts reference (verify ethical use) |
| 14 | **trailofbits/skills-curated (DEMOTED from L2)** | ~1k | CC-BY-SA-4.0 | n/a | Security-vetted skills (REFERENCE only per W5) |
| 15 | mnfst/awesome-free-llm-apis | 4,323 | (catalog) | 68 | Free LLM API keys list |

### Cite-only discipline
- Use these aggregators as discovery starting points
- Grep their README for specific repos
- Verify each candidate via TIER-1 source repo at file:line depth BEFORE adopting (cardinal-rule-1)
- DO NOT install the catalog itself; do NOT fork/modify (CC-BY-SA contagious)

---

## VERDICT — Per-layer deep-dive v4

This document gives each of 12 layers a comprehensive analysis with:
- Layer concern definition
- Per-pick scoring + license + role
- Head-to-head comparisons where multiple picks compete
- Install order with concrete commands
- Alternates (STUDY-PILOT + REFERENCE + REJECT) per layer
- Architectural insight per layer

**Companion to FINAL_v4_GRAND_CATALOG.md** (which provides cross-layer Top-50 + fix-forwards + 5-phase install plan + REJECT consolidated list).

Total v2+v3+v4 deep-synthesis documents = 9 files / ~370 KB of analysis.

Wave 6 candidates remain queued for follow-up (Q2 2026 Anthropic CC features + RAG architecture decision + Top-100 Probe DAG batch).
