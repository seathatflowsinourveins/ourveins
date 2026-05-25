# OPERATOR PLAYBOOK — V-FINAL (Standalone Execution Document)

**2026-05-16 · post-fix23 + codex T1 fix24 doc-sync · STANDALONE**

> **You only need to read this file** to execute the grand-synthesis-2026-05-16 outcome. Everything else (MASTER · INDEX · 4 PARTs · 7 GraphQL deep-probes · 16 codex audits · 64 fork outputs) is supporting reference. This playbook distills 23 fix-forward rounds + ~2,150 repos D1-D8 scored into a single executable plan.

---

## 1. TL;DR (5 lines)

- **Coverage**: ≥10k★=~95% · 2-10k★=~90% · 500-2k★=~75-80% (codex T1 fix23 confirmed honest).
- **Action**: Apply 3 fix24 doc-sync edits → commit → execute **Phase 0 (16 installs / ~2hrs)** → **Phase 1 (26 installs / ~4hrs)**.
- **Stability**: Phase 0/1 INSTALL set UNCHANGED across all 23 fix-forward rounds — no closing-wave finding (fix13-23) displaced any Phase 0/1 install.
- **Closure**: codex T1 fix23 verdict = NEEDS-FIX24 (3 minor edits, non-blocking) → COMMIT-AND-EXECUTE. Do NOT dispatch another wave.
- **Maintenance**: Treat catalog as living discovery surface; re-probe quarterly per layer (schedule below §6).

---

## 2. Phase 0 — INSTALL THIS WEEK (16 commands, ~2hrs, zero-cost license-clean native-CC)

Execute in order. Each is reversible <5 min via `/plugin uninstall` or `claude mcp remove`.

```bash
# Foundation layer (T1-OFFICIAL Anthropic substrate)
/plugin install anthropics:skills                                       # 1. anthropics/skills (135k★ MIT)
# 2. anthropics/claude-plugins-official — already installed via CC

# Methodology + community-skill plugins (cross-org convergence)
/plugin install obra/superpowers                                        # 3. (192k★ MIT)
/plugin install wshobson/agents                                         # 4. (35k★ MIT — dedup 5 SHA-identical first)
/plugin install addyosmani/agent-skills                                 # 5. (42k★ MIT, Google Chrome named-T2)
/plugin install openai/codex-plugin-cc                                  # 6. (18.8k★ — OFFICIAL OpenAI CC plugin)

# Memory + code-intel (highest-fitness)
npx skills add claude-supermemory                                       # 7. supermemoryai (2.5k★ — ONLY T1 plugin in memory class)
claude mcp add chunkhound                                               # 8. chunkhound v5.0.0 (1.3k★ MIT, 33 langs, local DuckDB, Opus 4.7 default)

# Worktree + skill-marketplace integration
git clone https://github.com/raine/workmux && claude plugin marketplace add ./workmux  # 9. raine/workmux (MIT)
/plugin install automazeio/ccpm                                         # 10. (8.1k★ MIT, pure-skill zero-infra)

# Security curation (per-skill install, NOT bulk — ShareAlike viral on index)
# 11. trailofbits/skills-curated (402★ CC-BY-SA-4.0) — install individual skills per use-case

# MCP substrate (Google/MCP-official)
claude mcp add chrome-devtools-mcp                                      # 12. ChromeDevTools/chrome-devtools-mcp (39.7k★ Apache, 80/80)
# 13. modelcontextprotocol/servers (86k★ MIT) — install per-server via `claude mcp add`

# Settings/conventions updates (edit-in-place)
# 14. AGENTS.md REFRESH — edit existing 15K file; sync AAIF + Code with Claude 2026
# 15. MIGRATE bypassPermissions → Claude Code auto mode (Mar 25 2026 Anthropic-OFFICIAL)
# 16. Apply 8 Pattern-A fix-forward corrections to sota-installed-manifest.md
#     (Phoenix ELv2 / firecrawl AGPL / playwright EVALUATE / codex v1.0.4 /
#      GitNexus org / BMAD bmad-code-org / SOPS getsops / supermemoryai npx-skills-add)
```

---

## 3. Phase 1 — INSTALL THIS WEEK (26 commands, ~4hrs, light infra)

```bash
# Cross-model dispatch + peer CLIs
# 17. fynnfluegge/agtx (Apache, MCP) — Phase-routed cross-model dispatch
pip install aider-chat                                                  # 18. Aider-AI/aider (44.9k★ Apache) + disler/aider-mcp-server
claude mcp add github                                                   # 19. github/github-mcp-server (30k★ MIT)
claude mcp add googleapis-toolbox                                       # 20. googleapis/mcp-toolbox (Apache)
claude mcp add dbhub                                                    # 21. bytebase/dbhub (Apache)
claude mcp add kubernetes-mcp                                           # 22. containers/kubernetes-mcp-server (Apache)

# Memory L1+L3 stack (PINNED versions per W236)
claude mcp add mcp-memory-service@10.51.3                               # 23. doobidoo/mcp-memory-service
pip install graphiti-core==0.29.0 && docker run -d falkordb/falkordb:1.6.1  # 24. getzep/graphiti + FalkorDB

# Code-intel expansion
cargo install ast-grep && claude mcp add ast-grep-mcp                   # 25. (13.8k★ MIT)
docker run -d asyncfuncai/deepwiki-open                                  # 26. (16.4k★ MIT)
# 27. cocoindex-io/cocoindex-code (1.6k★ Apache native-MCP — "70% token reduction")
# 28. probelabs/probe (595★ Apache native-MCP — Rust ripgrep+tree-sitter)

# Gateway + multi-account
pip install 'litellm[proxy]'                                            # 29. LiteLLM 5-tier cascade

# UI + HITL + eval substrate
npm install @copilotkit/react-core @copilotkit/react-ui                 # 30. CopilotKit AG-UI (31.5k★, 11+ orgs)
# 31. humanlayer/humanlayer (10.8k★) — HITL for cc/codex/opencode/amp
pip install inspect-ai inspect-evals                                    # 32. UK AISI (130+ evals substrate)

# References + quickstarts (clone-only)
git clone https://github.com/anthropics/claude-cookbooks                # 33. T4-skill clone
git clone https://github.com/anthropics/claude-quickstarts              # 34. autonomous-coding + computer-use-best-practices

# Security stack (4 sub-lanes)
# 35. L0.5.a SECRETS: getsops/sops (21.8k★ MPL) + FiloSottile/age (22.3k★ BSD)
brew install sops age || curl -L install.sigstore.dev | sh              # binary install
# 36. L0.5.b SUPPLY-CHAIN: sigstore/cosign (5.9k★) + zizmorcore/zizmor (4.9k★)
# 37. L0.5.c AGENT-AUDIT: snyk/agent-scan (2.4k★, renamed from InvariantLabs)
# 38. L0.5.d AGENT-DEFENSE: NVIDIA/garak + Anthropic-Cybersecurity-Skills + lasso-security/claude-hooks
# 39. cedar-policy/cedar (1.5k★) — AWS Cedar authz
pip install presidio-analyzer presidio-anonymizer llm-guard             # 40. presidio + llm-guard
/plugin install EveryInc/compound-engineering-plugin                    # 41. (16.8k★ MIT, 37 skills + 49 agents)

# fix24 ADDITION (per codex T1 fix23 audit — fix22 Repomix discovery)
git clone https://github.com/Mozilla-Ocho/llamafile && \                # 42. llamafile (24.4k★ Apache-2.0)
  claude plugin marketplace add ./llamafile/.llamafile_plugin           # SHIPS OFFICIAL CC PLUGIN at .llamafile_plugin/
```

---

## 4. Phase 1-A STUDY-PILOT additions (13 candidates from fix13-23, with bake-off pairs)

Run 7-day pilot before promoting to install. Each is reversible.

| # | Repo | Layer | Pair against incumbent | Bake-off metric |
|---|---|---|---|---|
| P1 | alibaba/zvec (9.6k★ Apache) | L0.0 | vs Qdrant | Throughput @99% recall |
| P2 | Gentleman-Programming/engram (3.5k★ MIT) | L0.2 | vs supermemoryai | Latency p95 |
| P3 | DeusData/codebase-memory-mcp (2.4k★ MIT) | L0.2/L0.4 | vs chunkhound | 99% token-reduction claim (fix21 VERIFIED: 99.2%/121x; 28M-LOC kernel in 3min; <1ms Cypher) |
| P4 | facebook/pyrefly (6k★ MIT) | L4.0 | vs pyright | Type-check throughput |
| P5 | run-llama/liteparse (5.1k★ Apache) | L4.5 | vs Docling/MinerU | Doc-conversion fidelity |
| P6 | microsoft/agent-framework (10.5k★ MIT) | L6.0 | vs LangGraph | AutoGen-successor maturity |
| P7 | UfoMiao/zcf (6k★ MIT) | L2.0 | vs base-CC | Zero-config bootstrap value-add |
| P8 | isaacphi/mcp-language-server (1.5k★) | L0.4 | NEW (LSP→MCP bridge) | Coverage of CC's missing LSP surface |
| P9 | Tencent/WeKnora (15k★ MIT) | L0.3 | vs LightRAG+Graphiti | Self-maintaining wiki cost (fix22: too-heavy Docker stack, fork pattern only) |
| P10 | modu-ai/moai-adk (1k★) | L6.0 | vs in-house /loop+/goal | DOWNGRADED-PATTERN per fix22 (extract 4 patterns: PreCompact auto-matcher / `.mcp.json` staggered / AskUserQuestion-only / Strategic Orchestrator) |
| P11 | QwenLM/qwen-code (24k★) | L3 | vs CC | PATTERN-EXTRACT ONLY per cardinal-rule-1 (do NOT install — fork patterns) |
| P12 | deepseek-ai/DeepSeek-OCR (23k★) | L4.5 | vs MinerU | Visual context compression |
| P13 | openclaw/clawhub + Mozilla-Ocho/llamafile (fix19/22) | L2.1/L0.25 | Already INSTALL (Phase 1 item 42) — bake-off vs claude-plugins-official marketplace |

---

## 5. PERMANENT REJECT LIST (do not install — one-line reasons)

| Repo | Reason |
|---|---|
| **bytedance/Dolphin** (8.9k★) | Qwen Research License non-commercial only (fix14b) |
| **microsoft/graphrag** | Own upstream warning "indexing is expensive" — use LightRAG+Graphiti hybrid |
| **chroma-mcp** | UNPATCHED SQL-injection vuln 2026-04 |
| **Piebald-AI/tweakcc** | Modifies CC binary directly — cardinal-rule-2+5 violation |
| **Milvus** (CVE-2026-26190) | Security vuln; use Qdrant instead |
| **vanna-ai/vanna** | ARCHIVED (was Tranche H Top INSTALL) |
| **kuzudb/kuzu** | ARCHIVED 2025-10-10 |
| **microsoft/autogen** | Use ag2ai/ag2 successor (deprecated) |
| **claude-squad+herdr / cmux / agor / golutra** | AGPL/GPL/BSL license-blockers |
| **wshobson 5 DEMOTED-DUPLICATE plugins** | Identical SHA siblings (dedup) |
| **All anonymous LLM zip-drops kits v25-v61, v63, v64** | Cohort 7 REJECT class (0/23 ADOPT-NOW historical) |
| **26 confirmed HALLUCINATIONS** | Did not resolve on GitHub probe (see MASTER §2) |
| **Sourcegraph Cody Free/Pro** | Terminated Jul 2025 (Enterprise $59/user remains) |
| **AWS Q standalone** | Forced migration to Kiro; new signups blocked May 15 2026 |

---

## 6. Quarterly re-probe schedule

Treat catalog as living discovery surface. Per-layer re-probe cadence:

| Layer | Re-probe trigger | Method |
|---|---|---|
| **L0.0/L0.1/L0.2** (memory+vector+KG) | Q1, Q3 each year | GraphQL topic-filter for `vector-database`, `agent-memory`, `knowledge-graph` ≥1k★ |
| **L0.4** (code-intel) | Q2 each year | Topic `code-intelligence`, `treesitter`, `lsp` + name-search for incumbent competitors |
| **L0.25** (local inference) | Q3 each year + on any new hardware-class | Topic `llm-inference`, `local-llm`, `edge-llm` (fix18 surfaced 5 NEW sub-lanes — re-probe quarterly) |
| **L0.MCP** (MCP servers) | **monthly** (highest velocity) | Topic `mcp`, `model-context-protocol` ≥500★; new Anthropic-official surfaces |
| **L2.x** (agents+skills+templates) | Q2 each year | 4-org skills convergence (fix23) — re-check anthropics/microsoft/google/openai for new `org/skills` |
| **L3.x** (peer CLIs + HITL) | Q3 each year | Direct gh API on incumbents (opencode/aider/codex) for forks/successors |
| **L4.x** (eval + obs + doc-ingestion) | Q2 each year | Topic `llm-eval`, `llm-observability`; new arxiv leaders |
| **L5.x** (security + workflow) | **on any CVE** (event-driven) | Trigger: any new CVE on Phase 0/1 installed repo |
| **L6.x** (frameworks + orchestration) | Q4 each year | Topic `agent-framework`, `multi-agent` (4-way SOTA tie — re-check rankings) |
| **Big-org sweep** (anthropics/openai/google/microsoft/meta-llama/amazon-science/aws) | Q2 each year | `gh search repos "org:<owner>"` per fix23 method (4 orgs UNDER-saturated: microsoft 29%, meta-llama 0%, amazon-science 0%, aws 0%) |
| **Chinese ecosystem** (paddlepaddle/deepseek/InternLM/modelscope/QwenLM) | Q3 each year | Per-org `gh search` (fix20 confirmed 277 org-affiliated repos active) |

---

## 7. Single commit command (operator copy-paste)

```bash
git add docs/grand-synthesis-2026-05-16/ && \
  git commit -m "feat: grand-synthesis-2026-05-16 V-FINAL fix24 — 24 fix-forward rounds · 64 forks · 16 codex T1 audits · ~2,150 repos D1-D8 scored · 25 super-layers + 30+ sub-lanes · Phase 0/1 = 42 installs · saturation 95/90/75-80 percent (10k+/2-10k+/500-2k+) · operator-actionable closure"
```

---

## 8. Audit chain (proof this was rigorous)

Read these files in order ONLY if you need to verify the rigor of the playbook above:

| File | Purpose |
|---|---|
| `00-MASTER/THE-ULTIMATE-MASTER-2026-05-16.md` | 325 LOC consolidated final synthesis (§1 install plan · §6 23 fix-forward rounds · §7 honest saturation) |
| `00-MASTER/THE-GRAND-CATALOG-INDEX-2026-05-16.md` | 156 LOC navigational map across 4 PART files (1,831 sharded rows) + 4 GraphQL deep-probe files |
| `00-MASTER/CODEX-T1-FIX23-DEFINITIVE-VERDICT-2026-05-16.md` | THIS audit's closure verdict (NEEDS-FIX24 → COMMIT-AND-EXECUTE) |
| `00-MASTER/CODEX-T1-FIX18-FINAL-VERDICT-2026-05-16.md` | Prior closure audit (NEEDS-MINOR-REVISION conf=0.88) |
| `05-codex-consults/codex_consult_fix23_definitive_OUT-2026-05-16.txt` | Full GPT-5.5 transcript (569 LOC, 46,810 tokens, session 019e31ee) |
| `06-fresh-research-delta/GRAPHQL-FINAL-MISSING-2026-05-16.md` | fix13 closing-wave evidence (55 net-new) |
| `06-fresh-research-delta/GRAPHQL-CHINESE-MULTILANG-2026-05-16.md` | fix16 evidence (15 net-new, 7 NEW-P0) |
| `06-fresh-research-delta/GRAPHQL-NICHE-500-1K-2026-05-16.md` | fix17 evidence (~64 net-new at 500-1k★ floor) |
| `06-fresh-research-delta/GRAPHQL-HARDWARE-RUNTIME-2026-05-16.md` | fix18 evidence (44 net-new + llamafile omission discovery) |
| `06-fresh-research-delta/GRAPHQL-CHINESE-ORGS-DEFERRED-2026-05-16.md` | fix20 evidence (16 net-new Chinese-org repos) |
| `06-fresh-research-delta/REPOMIX-DEEP-DIVE-TOP5-2026-05-16.md` | fix22 evidence (llamafile CC-plugin discovery + 4 downgrades) |
| `06-fresh-research-delta/GRAPHQL-BIG-ORGS-SWEEP-2026-05-16.md` | fix23 evidence (4-org skills convergence + 20 P0) |
| `06-fresh-research-delta/LICENSE-VERIFY-FIX13-2026-05-16.md` | fix14b evidence (35 license blob decodes; Dolphin REJECT) |
| `06-fresh-research-delta/HALLUCINATION-AUDIT-PARTS-2026-05-16.md` | fix14c evidence (B+ grade, 0% pure hallucination) |

**Rigor stats**: 24 fix-forward rounds · 64 parallel fork agents · 16 codex T1 audits · ~2,150 unique repos D1-D8 multi-dimensionally scored · 25 super-layers + 30+ sub-lanes · 3 major catalog-omissions surfaced + fixed (ClawHub · llamafile CC-plugin · 4-org skills convergence) · 1,440+ files / 27 MB in canonical convergence layer.

**Status**: V-FINAL session COMPLETE. Operator may execute Phase 0 + Phase 1 NOW.
