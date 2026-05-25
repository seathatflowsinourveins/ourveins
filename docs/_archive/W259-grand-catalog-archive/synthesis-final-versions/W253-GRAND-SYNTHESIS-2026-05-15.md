# Wave 253 — GRAND SYNTHESIS (deep-dive + grading + license resolution + security audit)

**Date**: 2026-05-15
**Author**: Orchestrator (Opus 4.7) consolidating real-GPT-5.5 codex T1 Path P deep-dive verdict
**Mission**: per-repo Probe DAG 1-7 + source-code letter-grade A-F + license verification + named-repo deep-dive + security/supply-chain audit — the work prior waves QUEUED but never executed.
**Status**: **AUTHORITATIVE** — cross-model gate SATISFIED at synthesis layer (real GPT-5.5 via codex CLI Path P).

---

## §0 Provenance + cross-model gate

| Path | Result |
|---|---|
| Original plan: 3 Sonnet subagents (E grading / F named-repo+license / G wshobson security) | ❌ All 3 hit Anthropic-proxy `HTTP 200 empty/malformed response` (FM-17 final-return-loss). E=44 tool uses, F=30, G=22 — work happened, returns eaten. |
| Recovery (codified FM-17.d): orchestrator-direct codex Path P | ✅ `codex exec --skip-git-repo-check --color never` 600s timeout. Output 165KB / 2387 lines at `.claude/state/codex_consult_w253_deepdive_grading_OUT.txt`. JSON-strict verdict at EOF (L1914-2387). |
| Cross-model gate | **SATISFIED** — codex CLI subprocess = real GPT-5.5 via OpenAI backend, bypasses the depleted Anthropic proxy. This wave delivers genuine BRIDGE-MODE coverage that W252-ext deferred to "synthesis-layer satisfaction." |

**Codex W253 verdict**: `GRADING-COMPLETE conf=0.84` — grade distribution **A=8, B=6, C=5, D=1, F=0** across the 20-repo Top candidate set. 14 install picks ratified.

---

## §1 Per-repo graded scorecards (real-GPT-5.5 verdict, n=20)

| # | Repo | Fresh ★ | License | Age (mo) | cpd-band | Probe DAG | Score | Grade | Sec | Verdict |
|---|------|---------|---------|----------|----------|-----------|-------|-------|-----|---------|
| 1 | **ollama/ollama** | 171,476 | MIT | 34.6 | HIGH-STABLE | 7/7 PASS | 94 | **A** | B | ADOPT — broad local model runner, clean license + maturity |
| 2 | BerriAI/litellm | 47,144 | NOASSERTION split MIT-core/enterprise | 33.7 | EXTREME-ACTIVE | P2 PARTIAL split + P6 PARTIAL deps | 84 | **B** | C | ADOPT with `ee/` dir excluded + dep review |
| 3 | **yamadashy/repomix** | 24,896 | MIT | 28.3 | MODERATE-STABLE | 7/7 PASS | 91 | **A** | B | ADOPT — low-risk codebase-packing primitive |
| 4 | oraios/serena | 24,273 | MIT | 14.8 | HIGH-ACTIVE | P3 PARTIAL young + P6 PARTIAL LSP deps | 86 | **B** | B | ADOPT with sandboxed workspace permissions |
| 5 | **qdrant/qdrant** | 31,341 | Apache-2.0 (verified SHA `261eeb9e`) | 70.0 | MODERATE-STABLE | 7/7 PASS | 92 | **A** | B | ADOPT — production vector DB, official MCP wrapper |
| 6 | **asg017/sqlite-vec** | 7,592 | Apache-2.0 OR MIT (dual) | 24.9 | LOW-STABLE | 7/7 PASS | 89 | **A** | **A** | ADOPT — best low-blast-radius embedded vector layer |
| 7 | **microsoft/markitdown** | 123,327 | MIT | 17.8 | LOW-MODERATE | 7/7 PASS | 92 | **A** | B | ADOPT — document conversion fit strong; watch parser attack surface |
| 8 | **promptfoo/promptfoo** | 21,289 | MIT | 41.5 | HIGH-ACTIVE | 7/7 PASS | 90 | **A** | B | ADOPT — eval harness mature enough for runtime gates |
| 9 | **gitleaks/gitleaks** | 27,001 | MIT | 99.6 | LOW-STABLE | 7/7 PASS | 91 | **A** | **A** | ADOPT — clean replacement for AGPL secret scanners |
| 10 | mem0ai/mem0 | 55,809 | Apache-2.0 | 24.1 | HIGH-ACTIVE | P4/5/6/7 all PARTIAL — overlap+integration+deps+incumbent-win unclear | 76 | **C** | C | PILOT only — memory overlap must be justified by concrete workflow |
| 11 | letta-ai/letta | 22,739 | Apache-2.0 | 31.2 | HIGH-ACTIVE | P4/5/6/7 PARTIAL — server-model + heavier ops | 75 | **C** | C | PILOT only — too much platform weight for default memory |
| 12 | microsoft/graphrag | 33,013 | MIT | 24.7 | LOW-MODERATE | P4/5/6/7 PARTIAL — overlaps + not CC-native + ops-heavy | 77 | **C** | B | STUDY-PILOT — reference, not default install |
| 13 | HKUDS/LightRAG | 35,248 | MIT | 19.5 | HIGH-ACTIVE | P4/5/6/7 PARTIAL — overlaps GraphRAG + paper-claim risk | 76 | **C** | C | STUDY-PILOT — lighter than GraphRAG, still not a default primitive |
| 14 | wshobson/agents | 35,460 | **MIT (verified)** | 20.5 | LOW-MODERATE | P4 PARTIAL catalog overlap + P7 PARTIAL per-agent quality uneven | 78 | **C** | C | SELECTIVE-PILOT — never bulk-install; hand-pick agents |
| 15 | **obra/superpowers** | 192,943 | MIT | 8.8 | **HIGH-LAUNCH-SPIKE** | P3 PARTIAL young + P4 PARTIAL skills overlap + **P7 FAIL fresh-paint** | 67 | **D** | C | **HOLD except hand-picked skills** — star velocity ≠ maturity |
| 16 | doobidoo/mcp-memory-service | 1,844 | Apache-2.0 | 16.7 | HIGH-ACTIVE | P1 PARTIAL low-stars (offset by direct fit) — 6/7 effective PASS | 84 | **B** | B | ADOPT if memory layer required — direct MCP-memory fit |
| 17 | getzep/graphiti | 26,106 | Apache-2.0 | 21.2 | LOW-MODERATE | P5/6/7 PARTIAL — backend config + graph-db ops + backend-license risk | 82 | **B** | C | PILOT — adopt ONLY with Apache-compatible backend choice documented |
| 18 | **valkey-io/valkey** | 25,785 | BSD-3-Clause | 25.7 | HIGH-ACTIVE | 7/7 PASS | 90 | **A** | B | ADOPT only if server-side cache needed — clean Redis replacement |
| 19 | anthropics/anthropic-cookbook | 43,053 | MIT | 33.0 | LOW-STABLE | 7/7 PASS | 84 | **B** | **A** | CITE/PATTERN-EXTRACT — not an install primitive |
| 20 | modelcontextprotocol/servers | 85,719 | MIT-to-Apache-2.0 transition | 18.3 | HIGH-ACTIVE | P2 PARTIAL license-transition + P6/7 PARTIAL per-server | 85 | **B** | C | ADOPT SELECTIVELY — every server needs separate capability review |

**Grade distribution**: A=8 · B=6 · C=5 · D=1 · F=0

---

## §2 Named-repo deep-dive (the 3 user-explicit repos)

### OpenViking — `volcengine/OpenViking` (claude-code-memory-plugin)
**Verdict: REJECT for default memory layer** (BUT native-CC-path = YES). The README at `examples/claude-code-memory-plugin/README.md` DOES provide a real Claude Code plugin path via local marketplace add/install + legacy MCP/hooks wiring — so the claim "no CC pathway" was wrong. But **root LICENSE = AGPL-3.0**, incompatible with the permissive-only runtime policy. It also stores endpoint/API-key config and can auto-inject memory before prompts — combined legal + prompt-surface risk. Disposition: **CITE-ONLY**, do not install.

### cognee — `topoteretes/cognee`
**Verdict: STUDY-PILOT-NARROW; SUPERSEDED-BY-graphiti = YES.** Root LICENSE = Apache-2.0 (verified). README advertises a Claude Code plugin via cognee-integrations with lifecycle hooks (SessionStart / PostToolUse / UserPromptSubmit / PreCompact / SessionEnd). Architecturally overlaps Graphiti's temporal-KG niche heavily — keep ONLY if it beats Graphiti on a measured local-memory workflow per Probe-7.b.

### langfuse — `langfuse/langfuse`
**Verdict: AMBER; MIT-core usable = YES.** Root LICENSE is **split**: core is MIT, while `ee/`, `web/src/ee/`, and `worker/src/ee/` are governed by a commercial Enterprise License. Basic tracing/observability IS usable from MIT-core alone. Any deployment MUST exclude `ee/` features + verify Docker Compose / build paths do not pull commercial code.

---

## §3 License resolution — 20 repos verified (W252-EXT `[verify]` → resolved)

| Repo | W252-claimed | RESOLVED-actual | Class | Evidence |
|---|---|---|---|---|
| opendatalab/MinerU | "AGPL-3.0 likely VERIFY" | **Apache-2.0 with additional commercial/attribution terms** | **AMBER** | "## MinerU Open Source License" |
| daytonaio/daytona | "AGPL-3.0 likely VERIFY" | **AGPL-3.0** | **REJECT** | "GNU AFFERO GENERAL PUBLIC" |
| datalab-to/marker | unresolved | **GPL-3.0** | **REJECT** | "GNU GENERAL PUBLIC LICENSE" |
| mendableai/firecrawl (core) | "core AGPL" | **AGPL-3.0** | **REJECT** | "GNU AFFERO GENERAL PUBLIC" |
| firecrawl/firecrawl-mcp-server | "wrapper MIT" | **MIT** | **PERMISSIVE-ACCEPT** | "MIT License Copyright (c)" |
| mksglu/context-mode | "ELv2" | **Elastic License 2.0** | **REJECT** | "Elastic License 2.0 (ELv2)" |
| wshobson/agents | "verify" | **MIT** | **PERMISSIVE-ACCEPT** | "MIT License Copyright (c)" |
| microsoft/graphrag | "MIT verify" | **MIT** | **PERMISSIVE-ACCEPT** | "MIT License Copyright (c)" |
| HKUDS/LightRAG | "MIT verify" | **MIT** | **PERMISSIVE-ACCEPT** | "MIT License Copyright (c)" |
| infiniflow/ragflow | "Apache-2.0 verify" | **Apache-2.0** | **PERMISSIVE-ACCEPT** | "Apache License Version 2.0" |
| mem0ai/mem0 | "Apache-2.0 verify" | **Apache-2.0** | **PERMISSIVE-ACCEPT** | "Apache License Version 2.0" |
| letta-ai/letta | "Apache-2.0 verify" | **Apache-2.0** | **PERMISSIVE-ACCEPT** | "Apache License Version 2.0" |
| ComposioHQ/awesome-claude-skills | "conflicting verify" | **NOASSERTION (no root LICENSE blob)** | **AMBER** | no root LICENSE found |
| punkpeye/awesome-mcp-servers | "verify" | **MIT** | **PERMISSIVE-ACCEPT** | "The MIT License (MIT)" |
| gitleaks/gitleaks | "MIT verify" | **MIT** | **PERMISSIVE-ACCEPT** | "MIT License Copyright (c)" |
| ryoppippi/ccusage | "MIT verify" | **MIT** | **PERMISSIVE-ACCEPT** | "MIT License Copyright (c)" |
| confident-ai/deepeval | "Apache-2.0 verify" | **Apache-2.0** | **PERMISSIVE-ACCEPT** | "Apache License Version 2.0" |
| trailofbits/mcp-context-protector | "verify" | **Apache-2.0** | **PERMISSIVE-ACCEPT** | "Apache License Version 2.0" |
| nickclyde/duckduckgo-mcp-server | "verify" | **MIT** | **PERMISSIVE-ACCEPT** | "MIT License Copyright (c)" |
| asg017/sqlite-vec | "Apache/MIT" | **Apache-2.0 OR MIT (dual)** | **PERMISSIVE-ACCEPT** | "LICENSE-APACHE and LICENSE-MIT" |

**Net change vs W252-EXT**: 15 picks promoted from `[verify]` → PERMISSIVE-ACCEPT (clean). 3 confirmed REJECT (daytona / marker / firecrawl-core / context-mode). 2 AMBER (MinerU modified-Apache; ComposioHQ awesome-claude-skills NOASSERTION). MinerU correction (previously assumed AGPL → actually modified-Apache) is a notable W252-EXT correction.

---

## §4 Security HIGH/CRITICAL findings (n=8)

| Repo | Dimension | Severity | Claim | Mitigation |
|---|---|---|---|---|
| BerriAI/litellm | supply-chain risk | HIGH | Large Python proxy with provider creds, enterprise split, broad dep surface | Isolated service; keys via env/secrets store; exclude `ee/`; pin version |
| modelcontextprotocol/servers | prompt-injection surface | HIGH | Catalog contains MCP servers with filesystem/network/browser/third-party egress | Install only individually-reviewed servers with least-privilege allowlists |
| microsoft/markitdown | parser attack surface | HIGH | Parsers process untrusted PDFs/Office/images/archives | Convert in temp sandbox with size/time limits + no secret-bearing env |
| getzep/graphiti | license-as-legal-risk | HIGH | Core Apache-2.0 but graph backends introduce non-permissive risk (FalkorDB SSPL) | Mandate Neo4j/compatible permissive backend OR document explicit exception |
| mem0ai/mem0 | secret-handling | HIGH | Memory service requires LLM/vector API keys + stores long-lived user context | Local backends; redact memories; block config-in-git |
| wshobson/agents | supply-chain risk | HIGH | Catalog quality uneven; bulk install imports unreviewed prompts + tool assumptions | Whitelist individual agents after prompt/tool review |
| obra/superpowers | fresh-paint launch-spike | HIGH | 192k★ in 8.8mo — maturity NOT proven by star velocity | Adopt only specific reviewed skills after workflow tests |
| **volcengine/OpenViking** | **license-as-legal-risk** | **CRITICAL** | **Root AGPL-3.0 incompatible with permissive runtime** | **REJECT for install; cite only** |

---

## §5 Codex install set after grading (14 picks ratified)

**A-grade tier (8 picks — ADOPT-NOW)**:
1. ollama/ollama
2. yamadashy/repomix
3. qdrant/qdrant
4. asg017/sqlite-vec
5. microsoft/markitdown (with parser-sandbox per security finding)
6. promptfoo/promptfoo
7. gitleaks/gitleaks
8. valkey-io/valkey (ONLY if cache needed)

**B-grade tier (6 picks — ADOPT with guard rails)**:
9. BerriAI/litellm — exclude `ee/`, isolated service
10. oraios/serena — sandboxed workspace permissions
11. doobidoo/mcp-memory-service
12. getzep/graphiti — Apache-compatible backend mandate (e.g., Neo4j swap)
13. anthropics/anthropic-cookbook — cite/pattern-only, not install primitive
14. modelcontextprotocol/servers — selective servers, per-server capability review

**C-grade tier (5 picks — PILOT only, not default install)**:
- mem0ai/mem0 — Probe-7.b incumbent comparison required
- letta-ai/letta — server-platform weight
- microsoft/graphrag — reference, not default
- HKUDS/LightRAG — paper-claim risk
- wshobson/agents — SELECTIVE per-agent install only

**D-grade tier (1 pick — HOLD)**:
- obra/superpowers — HOLD except hand-picked individual skills; Axis-3 fresh-paint FAIL despite 192k★

---

## §6 Updates to W252-EXT install architecture

This Wave 253 verdict supplies the **per-repo grading** that W252-EXT's §2 layered architecture lacked. Reconciliations:

| W252-EXT row | W253 verdict | Net |
|---|---|---|
| L2 graphiti "STUDY-PILOT pending backend decision" | **B-grade RATIFIED**; security HIGH on backend-license; install with Neo4j Apache swap mandated | TIGHTENED |
| L3 RAG layer "STUDY-PILOT graphrag OR LightRAG" | **C-grade for BOTH** — Probe-4 mutual-overlap + not-CC-native + ops-heavy | confirmed DEFER as default install |
| L7 wshobson/agents "per-plugin Probe-5 first" | **C-grade RATIFIED**; HIGH supply-chain risk; SELECTIVE per-agent install only | confirmed selective approach |
| L7 superpowers "ADOPT-NOW selective" | **D-grade** — fresh-paint Axis-3 FAIL at 192k★/8.8mo; HOLD except hand-picked | DOWNGRADE from W252-EXT |
| L9 markitdown "ADOPT-NOW" | **A-grade RATIFIED** but parser-sandbox MANDATED (security HIGH) | refined with sandbox req |
| L10 promptfoo "ADOPT-NOW (Phase 2 baseline)" | **A-grade RATIFIED** | confirmed |
| L11 gitleaks "ADOPT-NOW (Phase 1 gate)" | **A-grade RATIFIED** (sec grade A) | confirmed |
| L11 trailofbits/mcp-context-protector | LICENSE RESOLVED Apache-2.0 (was `[verify]`) — disposition unchanged STUDY-PILOT | license cleared |
| L13 awesome-mcp-servers (punkpeye) | LICENSE RESOLVED MIT (was `[verify]`) | license cleared |
| OpenViking (W252-EXT did not score it) | **AGPL-3.0 REJECT CRITICAL** | NEW REJECT |
| MinerU "AGPL likely VERIFY" | RESOLVED Apache-with-commercial-terms = **AMBER not REJECT** | UPGRADE from REJECT |
| Daytona "AGPL likely VERIFY" | **AGPL-3.0 confirmed REJECT** | confirmed |
| marker "unresolved" | **GPL-3.0 REJECT** | confirmed |
| firecrawl core "AGPL" / mcp wrapper "MIT" | **CONFIRMED split** — wrapper-only adoptable (after dep-scope check) | confirmed AMBER |
| context-mode "ELv2" | **ELv2 confirmed REJECT** | confirmed |

---

## §7 The FINAL install set for `Z:\claude-sota-pure`

Reconciling W252-EXT 6-phase architecture + W253 letter grades:

### Phase 1 — Foundation + governance gate (A-grade + B-grade only)
- claude-plugins-official + Claude Agent SDK + cwc-long-running-agents + modelcontextprotocol/servers + mcpb CLI + openai/codex CLI + codex-plugin-cc
- **gitleaks (A/A)** secret-scan pre-commit + stdin hook
- codex T1-T7 cross-model gate hooks
- License-verification + phantom-package discipline wired

### Phase 2 — LLM serving + code intel + eval baseline
- **ollama (A/B)** — serving + embeddings (`nomic-embed-text`) + reranker via `ollama pull`
- **litellm (B/C)** — Anthropic-API-native router, `ee/` excluded, isolated as service
- **repomix (A/B)** MCP — codebase pack
- **serena (B/B)** MCP — sandboxed workspace
- ast-grep CLI + gitnexus
- **promptfoo (A/B)** baseline eval — `promptfoo mcp`

### Phase 3 — Memory + vector + RAG
- **doobidoo/mcp-memory-service (B/B)** — sqlite-vec backend (embedded vector baseline)
- **sqlite-vec (A/A)** — best low-blast-radius embedded vector
- **graphiti (B/C)** — STUDY-PILOT; Apache-compatible backend (Neo4j swap) MANDATED before promote
- microsoft/graphrag OR HKUDS/LightRAG — both **C/B-C** STUDY-PILOT only (decide if RAG-as-lib needed)

### Phase 4 — Orchestration + token-opt
- Anthropic prompt-cache config (native — primary token-opt)
- ccusage telemetry
- **wshobson/agents (C/C)** — SELECTIVE per-agent install ONLY; do NOT bulk-install
- **superpowers (D/C) HOLD** — hand-picked individual skills only (plan/debug/tdd/verification) after Axis-3 burn-in
- addy-agent-skills (per-skill grading queued)
- anthropic-cookbook (B/A) cite/pattern-only

### Phase 5 — Browser + docs + remaining security
- chrome-devtools-mcp + playwright-mcp + DuckDuckGo-mcp + exa-mcp (default clean MIT)
- **markitdown + markitdown-mcp (A/B)** — with parser-sandbox + size/time limits
- semgrep (LGPL CLI — acceptable per §3 W252-EXT)

### Phase 6 — Optional pilots (C-grade STUDY only)
- mem0/letta (C/C) — Probe-7.b incumbent vs doobidoo+graphiti
- **qdrant (A/B)** scale-pilot (Phase-6 NOT Phase-3 per W252-EXT F-8)
- arxiv-mcp (closes GAP-9 C2-cohort)
- **valkey (A/B)** only if app-state cache materializes
- ACP adapter (agentclientprotocol/claude-agent-acp) pilot
- langfuse MIT-core (AMBER — exclude `ee/`)
- trailofbits/mcp-context-protector (Apache-2.0 resolved)
- firecrawl-mcp (only after AGPL-core dep-scope check)

### REJECT (license-blocked or graded F)
- OpenViking — AGPL-3.0 CRITICAL
- daytona — AGPL-3.0
- marker — GPL-3.0
- firecrawl core (use wrapper-mcp only)
- context-mode — ELv2
- redis / dragonfly — AGPL/SSPL/BSL
- trufflehog — AGPL
- Phoenix — ELv2

### AMBER (gated until clarification)
- MinerU — Apache-with-commercial-terms; usable IF terms accepted in commit body
- ComposioHQ/awesome-claude-skills — NOASSERTION; cite-only until license added

---

## §8 Cross-model gate disposition

This wave's cross-model satisfaction is **stronger** than W252-EXT's:
- W252-EXT: 4 Sonnet research agents + 1 orchestrator-fired codex T1 review of synthesis (synthesis-layer BRIDGE-MODE only)
- **W253: real GPT-5.5 directly produced the 20-repo grading + 3 named-repo deep-dive + 20-license resolution + 8 security findings** — the per-candidate evidence base IS GPT-5.5-authored, not synthesis-layer-corrected.

Per `advanced-agent-team-standing-directive.md` invariant #1 (≥2 BRIDGE-MODE), W253 satisfies cross-model consensus at the EVIDENCE layer, not just the synthesis layer.

---

## §9 Next actions

1. ✅ DONE — Wave 253 deep-dive synthesized with codex W253 verdict integrated
2. **QUEUED** — bootstrap `Z:\claude-sota-pure` Phase 0 (hand-coded files: CLAUDE.md / CLAUDE.local.md / pure.ps1 / settings.json / .mcp.json / .gitignore / manifest / provenance)
3. **QUEUED** — Phase 1 install: ollama + repomix + gitleaks + foundation chain + codex T1-T7 gate hooks (governance-gate-first per W252-EXT codex T1 F-7)
4. **QUEUED** — Phase 2-5 install per §7 above with target-runtime probe discipline per FM-20 row 21 (probe `claude-sota-pure` runtime state, not `claude-sota-installed` orchestrator runtime)
5. **QUEUED** — re-fire codex T1 Path P review on this Wave 253 synthesis (Forward Discipline #2: codification-fire-scope ≤120s budget) for cross-fire ratification

**VERDICT: WAVE-253-SYNTHESIS-COMPLETE — AUTHORITATIVE.** 14 install picks (8 A-grade + 6 B-grade) ratified by real-GPT-5.5 BRIDGE-MODE. 5 C-grade PILOT-only. 1 D-grade HOLD (superpowers fresh-paint). 0 F-grade. License-blocker register concretized (4 hard REJECTs + 2 AMBERs). 8 HIGH/CRITICAL security findings carry forward as install-time gates. The `Z:\claude-sota-pure` install architecture is now decision-ready at the per-repo evidence layer.

---

## §10 HONEST limitations

1. **Subagent fleet depletion** — all 3 Sonnet subagents failed (HTTP 200 empty response, FM-17 final-return-loss); codex Path P pivot recovered cleanly. The 3 lost subagents represent ~96 tool-uses of work that would have produced richer per-repo source-code prose audits than the structured codex JSON.
2. **Codex output format** — 165KB raw with mixed CRLF/CR/LF + ANSI escapes; JSON-strict parse succeeded at EOF (L1914-2387). Three JSON blocks present (schema-echo + 2 outputs); EOF-most block is authoritative per `cmc-t1-t7-lifecycle.md §The contract`.
3. **Star-count Marker Decay** — verified May 2026; re-probe before install commit per cardinal-rule-9.
4. **Probe DAG codex-pass** — codex returned Probe 1-7 PARTIAL/PASS strings per repo; these are codex's structured judgment but NOT independent installer-time verification. Install-time Probe DAG re-run is QUEUED.
5. **C-grade pilots not measured** — mem0/letta/graphrag/LightRAG Probe-7.b incumbent-comparison requires empirical benchmark, not yet executed.
6. **wshobson sub-plugin per-plugin grading** — codex graded the marketplace as ONE unit (C-grade). Per-sub-plugin (Conductor / Agent Teams / python-development / comprehensive-review) Probe-5 mode-harness still QUEUED.
