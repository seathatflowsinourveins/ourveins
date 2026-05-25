# Wave 240 Agent B - W237 adversarial staleness + replacement audit

## §0 BRIDGE-MODE Status

- Role received: codex-rescue BRIDGE-MODE GPT-5.5. This artifact is produced by Codex in the shared workspace as the cross-model rescue/audit handoff.
- Verification method: W237 synthesis read first from `tmp/wave237-CORRECTED-FINAL-SYNTHESIS-Pattern-A-fix-forward-2026-05-15.md`; W236 roster recovered from `tmp/wave236-FINAL-CLOSE-SYNTHESIS-W220-W235-CUMULATIVE-2026-05-15.md`.
- Upstream probes run: `gh api repos/<owner>/<repo>`, `gh release list`, `gh search repos`, `gh search prs`, `python -m pip index versions graphiti-core`, targeted web search for May-2026 alternatives.
- Date note: user requested 2026-05-15 artifact date. Live upstream probes executed at system current date 2026-05-16 UTC window; ages below are effectively as-of 2026-05-15/16.
- Codex CLI subprocess details: this environment exposes Codex directly rather than a nested `codex exec` transcript. Verdict origin for this artifact is this Codex run, with primary evidence from GitHub/PyPI/web probes.

## §1 W237 Staleness Audit Table

| Repo | Category | Last-Commit-Age | Stars-Trend | License | Verdict |
|---|---:|---:|---|---|---|
| getsops/sops | Phase 0 secrets | 0d, pushed 2026-05-15 | Positive, 21,793★ | MPL-2.0 | KEEP |
| FiloSottile/age | Phase 0 encryption | 56d, pushed 2026-03-20 | Positive, 22,298★ | BSD-3-Clause | KEEP |
| doobidoo/mcp-memory-service | Phase 1 L1 memory | 0d, pushed 2026-05-15 | Positive, 1,843★ | Apache-2.0 | KEEP |
| getzep/graphiti | Phase 1 temporal KG | 1d, pushed 2026-05-14 | Strong positive, 26,104★ | Apache-2.0 | KEEP |
| FalkorDB/FalkorDB | Phase 1 Graphiti backend | 1d, pushed 2026-05-14 | Positive, 4,415★ | NOASSERTION | RECHECK license file before pure pin |
| BurntSushi/ripgrep | Phase 2 CLI search | 78d, pushed 2026-02-27 | Strong, 63,796★ | Unlicense | KEEP |
| sharkdp/fd | Phase 2 CLI find | 13d, pushed 2026-05-02 | Strong, 42,993★ | Apache-2.0 | KEEP |
| sharkdp/bat | Phase 2 CLI pager | 4d, pushed 2026-05-11 | Strong, 58,893★ | Apache-2.0 | KEEP |
| eza-community/eza | Phase 2 CLI ls | 35d, pushed 2026-04-10 | Strong, 21,791★ | EUPL-1.2 | KEEP |
| sharkdp/hyperfine | Phase 2 CLI benchmark | 15d, pushed 2026-04-30 | Strong, 28,115★ | Apache-2.0 | KEEP |
| XAMPPRocky/tokei | Phase 2 CLI code metrics | 9d, pushed 2026-05-06 | Positive, 14,426★ | NOASSERTION | KEEP with license recheck |
| bootandy/dust | Phase 2 CLI disk | 84d, pushed 2026-02-21 | Positive, 11,695★ | Apache-2.0 | KEEP, near 90d threshold |
| ClementTsang/bottom | Phase 2 CLI monitor | 0d, pushed 2026-05-16 | Positive, 13,336★ | MIT | KEEP |
| cli/cli | Phase 2 GitHub CLI | 0d, pushed 2026-05-15 | Positive, 44,412★ | MIT | KEEP |
| jqlang/jq | Phase 2 JSON | 4d, pushed 2026-05-11 | Positive, 34,735★ | NOASSERTION | KEEP with license recheck |
| mikefarah/yq | Phase 2 YAML | 0d, pushed 2026-05-15 | Positive, 15,399★ | MIT | KEEP |
| microsoft/presidio | Phase 2.5 PII | 1d, pushed 2026-05-14 | Positive, 8,075★ | MIT | KEEP |
| openai/codex + local hooks | Phase 3 cross-model gate | External/local mixed | Active externally; local hooks are repo-owned | Mixed | KEEP, scope is runtime-local |
| protectai/llm-guard | Phase 3.5 safety scanner | 151d, pushed 2025-12-15 | Stagnant-ish, 2,954★ | MIT | REPLACE/DEFER subset only |
| Tom Farley protect-mcp | Phase 3.5/11 MCP governance | npm/web shows 0.5.x/0.5.5 era; PyPI latest visible 0.4.0 Mar 27 | Low stars/registry split; external evidence active | MIT on PyPI; IETF draft says FSL-1.1-MIT for reference impl | RECHECK, do not install until source/crypto/license audit |
| pre-commit/pre-commit | Phase 4 dev hygiene | 3d, pushed 2026-05-12 | Positive, 15,276★ | MIT | KEEP |
| mozilla/sccache | Phase 4 compiler cache | 0d, pushed 2026-05-15 | Positive, 7,276★ | Apache-2.0 | KEEP |
| mkdocs/mkdocs | Phase 4 docs | 208d, pushed 2025-10-20 | Mature, 22,083★ | BSD-2-Clause | KEEP but stale-maintenance RECHECK |
| wshobson/agents shell-scripting | Phase 4 plugin | 1d, parent repo pushed 2026-05-14 | Strong positive, 35,456★ | MIT parent | KEEP after F14 source-audit |
| wshobson/agents plugin-eval | Phase 4 plugin eval | 1d, parent repo pushed 2026-05-14 | Strong positive, 35,456★ | MIT parent; plugin metadata gap unresolved | RECHECK: license-fix PR not found/merged |
| wshobson/agents block-no-verify | Phase 4 plugin | 1d, parent repo pushed 2026-05-14 | Strong positive, 35,456★ | MIT parent | KEEP after F14 source-audit |
| gitnexus | Phase 5 code intelligence | Local/incumbent | Not revalidated as public repo | Unknown | KEEP as incumbent, not net-new install |
| ast-grep/ast-grep | Phase 5 structural search | W237 cites local pin; not directly re-probed in batch | Known active project | MIT in upstream historically | KEEP, re-pin before pure |
| oraios/serena | Phase 5 semantic tooling | Incumbent | Not revalidated in this batch | Unknown | KEEP as incumbent, re-pin before pure |
| semgrep/semgrep | Phase 5 SAST | Not in W237 direct repo batch | Known active | LGPL/other mixed historically | KEEP but license recheck |
| google/osv-scanner | Phase 5 vuln scan | Not in W237 direct repo batch | Known active | Apache-2.0 historically | KEEP, re-pin before pure |
| crate-ci/typos | Phase 5 spellcheck | Not in W237 direct repo batch | Known active | MIT/Apache historically | KEEP, re-pin before pure |
| microsoft/acon | Phase 5 context compression | 214d, pushed 2025-10-14 | Weak/stagnant, 72★ | MIT | REPLACE as install candidate; retain cite/study only |
| jia-gao/leanctx | Phase 5 context layer | 11d, pushed 2026-05-04 | Positive, 226★ | MIT via repo API | KEEP/PRIMARY replacement for LLMLingua class |
| ace-agent/ace | Phase 5 context engineering | 24d, pushed 2026-04-21 | Positive, 1,079★ | Apache-2.0 | KEEP STUDY-PILOT.b |
| langfuse/langfuse | Phase 6 observability | 0d, pushed 2026-05-15 | Strong positive, 27,281★ | NOASSERTION repo; MIT-core claim needs file-scope audit | KEEP with MIT-core extraction audit |
| ryoppippi/ccusage | Phase 6 cost telemetry | 0d, pushed 2026-05-15 | Strong positive, 14,222★ | NOASSERTION | KEEP with license recheck |
| langfuse/mcp-server-langfuse | Phase 6 MCP bridge | 454d, pushed 2025-02-16 | Stagnant, 167★ | MIT | REPLACE/DEFER; use native Langfuse/OTel first |
| Arize-ai/phoenix | Phase 6 tracing/evals | 0d, pushed 2026-05-16 | Positive, 9,693★ | NOASSERTION | KEEP with license recheck |
| promptfoo/promptfoo | Phase 6 eval | 0d, pushed 2026-05-16 | Strong positive, 21,290★ | MIT | KEEP |
| PaddlePaddle/PaddleOCR | Phase 7 OCR | 1d, pushed 2026-05-14 | Strong positive, 77,915★ | Apache-2.0 | KEEP with Baidu disclosure |
| microsoft/playwright | Phase 8 browser | 0d, pushed 2026-05-16 | Strong positive, 88,781★ | Apache-2.0 | KEEP |
| ChromeDevTools/chrome-devtools-mcp | Phase 8 browser MCP | 0d, pushed 2026-05-15 | Strong positive, 39,715★ | Apache-2.0 | KEEP |
| elevenlabs/elevenlabs-mcp | Phase 8 voice | 56d, pushed 2026-03-20 | Positive, 1,364★ | MIT | KEEP |
| onyx-dot-app/onyx | Phase 9 RAG option | 0d, pushed 2026-05-16 | Strong positive, 29,432★ | NOASSERTION | DEFER operator decision |
| infiniflow/ragflow | Phase 9 RAG option | 0d, pushed 2026-05-15 | Strong positive, 80,585★ | Apache-2.0 | DEFER operator decision |
| topoteretes/cognee | Phase 9 graph-RAG L4 | 0d, pushed 2026-05-15 | Strong positive, 17,248★ | Apache-2.0 | KEEP/RECHECK fit vs Graphiti overlap |
| ntfy-mcp | Phase 10 notifications | Repo identity unresolved in W237 | Unknown | Unknown | RECHECK exact repo/package |
| Anthropic mcp-builder skill | Phase 10 workflow harness | Marketplace/skill, not GitHub repo row | Official provider signal | Unknown | KEEP with marketplace pin |
| signed-audit-trails | Phase 11 cite-class governance | Markdown/cite, no install | Low-star ecosystem but active adjacent repos | Unknown | KEEP as cite-class only |
| anthropics/claude-code-base-action | Conditional Δ-N1 | 0d, pushed 2026-05-15 | Positive, 828★ | MIT | KEEP conditional |
| anthropics/claude-code-security-review | Conditional Δ-N2 | 94d, pushed 2026-02-11 | Strong interest, 4,613★ | MIT | RECHECK just over 90d |
| github/gh-aw | Conditional Δ-N4 | 0d, pushed 2026-05-16 | Positive, 4,481★ | MIT | KEEP conditional |
| openai/skills | HOLD Δ-N3 | 0d, pushed 2026-05-15 | Strong positive, 19,184★ | GitHub license API 404, no root LICENSE file | HOLD unchanged |
| microsoft/LLMLingua | User-directed staleness target | 38d, pushed 2026-04-08 | Positive-ish, 6,190★ | MIT | REPLACE for 2026 agent runtime use |

## §2 Newer-Replacement Findings

### Context compression / LLMLingua-class replacements

1. `jia-gao/leanctx` - 226★, pushed 2026-05-04, MIT. Better than LLMLingua for Claude Code/Codex runtime because it targets agent context policy, compression, budgets, and tool-visible integration rather than generic prompt token pruning. Axis score: 1=4/5, 2=3/5, 3=3/5.
2. `open-compress/claw-compactor` - 2,217★, pushed 2026-04-01, repo has LICENSE but GitHub API did not classify SPDX; description claims MIT. Better for deterministic zero-inference compaction, AST-aware code handling, and hook-side preprocessor use. Axis score: 1=3/5, 2=3/5, 3=3/5 pending license blob.
3. `ace-agent/ace` - 1,079★, pushed 2026-04-21, Apache-2.0. Better as research/pilot layer for context evolution and plan caching; less directly installable than leanctx. Axis score: 1=4/5, 2=4/5, 3=3/5.
4. `microsoft/acon` - 72★, pushed 2025-10-14, MIT. W237 called it LLMLingua successor, but as of this audit it is stale by the 90d criterion and low-adoption. Retain as cite-class/research, not pure runtime ADOPT-NOW.

### LLM guard / prompt-injection scanner replacements

1. `snyk/agent-scan` - 2,409★, pushed 2026-05-15, Apache-2.0. Better than `protectai/llm-guard` for active 2026 agent/MCP scanning; successor lineage from Invariant/Snyk per web findings. Axis score: 1=4/5, 2=4/5, 3=4/5.
2. `cisco-ai-defense/mcp-scanner` - 924★, pushed 2026-05-13, Apache-2.0. Better for pre-deploy MCP server/tool scanning; complements, not replaces, runtime hooks. Axis score: 1=4/5, 2=4/5, 3=3/5.
3. `trailofbits/mcp-context-protector` - 219★, pushed 2026-04-14, license not detected. Strong security-org signal, but license must be resolved before install. Axis score: 1=3/5, 2=4/5, 3=3/5.

### Langfuse MCP bridge

1. Replace `langfuse/mcp-server-langfuse` as install candidate with native Langfuse v3 + OTel/export pipeline unless the MCP bridge revives. The bridge is MIT but last pushed 2025-02-16; W237 already had Phoenix/OTel surfaces, so this should be DEFER/REMOVE from ADOPT-NOW.

### Memory / graph-RAG competitors

1. `qdrant/mcp-server-qdrant` - 1,396★, pushed 2026-04-27, Apache-2.0. Good vector-memory complement, not a drop-in replacement for mcp-memory-service's current command surface.
2. `modelcontextprotocol/servers` memory server - 85,716★ parent repo, pushed 2026-05-12. Official reference memory, but simpler KG memory; use as baseline/reference, not replacement.
3. `DeusData/codebase-memory-mcp` - 2,357★, pushed 2026-05-10, MIT. Net-new codebase-memory layer; not replacement for semantic user/session memory.

## §3 LLMLingua Replacement Deep-Dive

| Candidate | Stars + last commit | License | Compression evidence | GPT-5.5 / Claude Opus 4.7 awareness | Harness fit | Verdict |
|---|---:|---|---|---|---|---|
| `jia-gao/leanctx` | 226★, 2026-05-04 | MIT | Product claims 4-layer compression, policy/budget gates; needs local benchmark | Explicitly markets Claude Code/Codex/Copilot integration | High: hook/proxy style fits `eee` runtime | ADOPT as primary LLMLingua replacement |
| `open-compress/claw-compactor` | 2,217★, 2026-04-01 | LICENSE present, SPDX unresolved; description says MIT | Blog/repo claim 54% average, deterministic 14-stage pipeline; verify benchmark before gate | Token-boundary/code-aware, not model-specific | High for pre-tool/file-read compaction hook | STUDY-PILOT.b pending license + benchmark |
| `ace-agent/ace` | 1,079★, 2026-04-21 | Apache-2.0 | ICLR 2026 context evolution/plan caching, ~47% serving-cost claim on project site | Agent-level context evolution rather than tokenizer-specific | Medium: research pilot, heavier integration | KEEP STUDY-PILOT.b |
| `microsoft/acon` | 72★, 2025-10-14 | MIT | ACON paper claims 26-54% token reduction; repo stale | Research is agent-context oriented, but no GPT-5.5/Opus-specific adapter found | Medium-low unless repo revives | DEMOTE from ADOPT-NOW to CITE/STUDY |
| `microsoft/LLMLingua` | 6,190★, 2026-04-08 | MIT | Legacy token-pruning benchmarks; user directive says outdated for May 2026 | Not GPT-5.5/Opus-4.7-agent-runtime aware | Low for hooks without adapter work | REMOVE/REPLACE |

Final recommendation: replace LLMLingua-class install pressure with `leanctx` as the pure-runtime primary, add `claw-compactor` as deterministic compression pilot, retain `ace-agent/ace` as research pilot, and demote `microsoft/acon` to cite/study until it shows fresh maintenance. Confidence: 0.78.

## §4 Net-New Layer Probes

| Layer | Verdict | Top candidate | Rationale |
|---|---|---|---|
| Local-model-runtime | ADD optional Phase 1.5/8.5 | `ollama/ollama` 171,475★, pushed 2026-05-15; `vllm-project/vllm` 80,128★, pushed 2026-05-16; `ggml-org/llama.cpp` 110,310★, pushed 2026-05-16 | Pure runtime should have a local inference decision point. Ollama is easiest operator UX; vLLM is server-throughput SOTA; llama.cpp is portable/edge baseline. |
| Apple Foundation Models on-device | SKIP for now | No verified official MCP/Claude Code integration found | Web results surfaced anecdotal Reddit claims, not a stable official MCP server. Recheck after Apple publishes official tooling. |
| GPT-5.5-aware token compression | ADD pilot | `jia-gao/leanctx`, `open-compress/claw-compactor` | Post-LLMLingua direction is policy/context-layer compression, not token-pruning-only. |
| Agent handoff protocols | ADD cite/pilot | `a2aproject/A2A` 23,796★, Apache-2.0, pushed 2026-05-14 | A2A is active and major-vendor backed. `GongRzhe/A2A-MCP-Server` is archived/stale, so do not install that bridge. ACP should remain cite-class unless an active bridge is identified. |
| Multi-agent benchmarks | ADD research-only | `openai/simple-evals` 4,487★, 2026-04-22; `MultiagentBench/MARBLE` 47★, stale 2025-06-21; `cxcscmu/AgentWebBench` 2★, 2026-04-13 | No mature ADOPT-NOW benchmark framework emerged. Use simple-evals/promptfoo for immediate harness, track AgentWebBench/MARBLE as cite/research. |
| MCP security/audit beyond protect-mcp | ADD | `snyk/agent-scan`, `cisco-ai-defense/mcp-scanner` | These are active 2026 scanner layers and should be evaluated before or alongside protect-mcp. |
| Codebase memory MCP | ADD pilot | `DeusData/codebase-memory-mcp` 2,357★, MIT, pushed 2026-05-10 | Distinct from mcp-memory-service and Graphiti: code-structure KG/token reduction. Pilot only because GitNexus/Serena already cover part of this layer. |

## §5 Marker Decay Catches

| W237-line | Marker-date | Days-old | Status |
|---:|---|---:|---|
| 8 | No dated marker: `[VERIFIED via .claude/state/codex_consult_w236_synthesis_review_OUT.txt]` | n/a | RECHECK evidence file if committing; no >7d dated marker in W237 |

No `[VERIFIED 2026-05-XX]` dated markers were present in the W237 final synthesis itself. The artifact date is 2026-05-15 and live probes were refreshed during this Wave 240 audit, so marker-decay catch count is 0 for dated markers.

## §6 Adversarial Verdict Summary

REMOVE:
- `microsoft/LLMLingua` from any implied install path: user-confirmed outdated and agent-runtime alternatives are better.
- `langfuse/mcp-server-langfuse` from ADOPT-NOW: last pushed 2025-02-16; use Langfuse v3/OTel directly.

REPLACE:
- `microsoft/acon` ADOPT-NOW install role -> `jia-gao/leanctx` primary + `open-compress/claw-compactor` STUDY-PILOT.b; keep ACON as research/cite until repo freshens.
- `protectai/llm-guard` broad safety role -> `snyk/agent-scan` + `cisco-ai-defense/mcp-scanner`; keep llm-guard only as narrow legacy scanner subset if a local test proves value.

ADD:
- Local-model-runtime decision layer: `ollama/ollama` default UX, `vllm-project/vllm` throughput option, `ggml-org/llama.cpp` portable baseline.
- MCP security scanner layer: `snyk/agent-scan` and `cisco-ai-defense/mcp-scanner`.
- A2A protocol cite/pilot: `a2aproject/A2A`; do not use archived `GongRzhe/A2A-MCP-Server` as install bridge.
- Codebase-memory pilot: `DeusData/codebase-memory-mcp`, only if GitNexus/Serena overlap audit passes.
- Compression pilot: `open-compress/claw-compactor`, gated on SPDX/license and benchmark verification.

KEEP:
- 37 rows confirmed active/fresh enough or mature-stable with acceptable maintenance signal: core CLI set, mcp-memory-service, Graphiti, Presidio, wshobson parent repo after F14 audit, Playwright, Chrome DevTools MCP, PaddleOCR, promptfoo, Phoenix, onyx/ragflow deferred options, cognee L4 as graph-RAG complement, and the Anthropic/GitHub conditional candidates except security-review requiring freshness recheck.

OPEN-QUESTIONS:
- `openai/skills` remains HOLD: GitHub API reports no detected license and root contents show no LICENSE file.
- `protect-mcp` has conflicting license signals: PyPI page says MIT, IETF draft names FSL-1.1-MIT for reference implementation, npm/package source audit still pending. Do not install before source/crypto/license audit.
- `wshobson/plugin-eval` license-fix PR was not found/merged by `gh search prs`; keep W237 F14 gate.
- `Langfuse v3` repo license is NOASSERTION from GitHub API; MIT-core extraction must read package/file scopes before vendoring.
- `ntfy-mcp` exact upstream identity is unresolved in W237; require package/repo pin before ADOPT-NOW.
