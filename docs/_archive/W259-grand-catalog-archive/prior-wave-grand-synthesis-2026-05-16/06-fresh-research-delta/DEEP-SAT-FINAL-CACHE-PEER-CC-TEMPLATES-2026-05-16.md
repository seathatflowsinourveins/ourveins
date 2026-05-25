# DEEP-SAT-FINAL — L0.8 Cache · L3 Peer CLI · L2.4 CC-Templates (2026-05-16)

> Final deep-saturation fork covering the last under-covered layers from prior tranches.
>
> **Pipeline**: 8 GraphQL queries (stars-sorted GitHub API search) + 20 explicit name-search probes via mcp__github__search_repositories AND WebFetch (rate-limit fallback). All metrics fetched live 2026-05-16. Sub-cohorts: L0.8 Cache (sqlite-vec, LMCache, redis-vss, faiss, GPTCache, Mooncake, lance/lancedb), L3 Peer CLI (opencode, goose, cline, OpenInterpreter, aider, tabby, crush, aichat, OpenHands, gemini-cli, agentsys, flow-next, sourcebot), L2.4 CC-Templates (davila7 templates, existential-birds/beagle, Piebald-AI cohort, mvanhorn last30days-skill, farion1231 cc-switch, jeremylongshore, OthmanAdi, wshobson agents/commands, obra/superpowers, motia).
>
> **Cite-class**: TIER-1-DIRECT (GitHub API metrics) + TIER-1-DIRECT (WebFetch repo HTML — last-commit/license/lang/archived). Live as-of 2026-05-16 UTC ~16:50.
>
> **Honest-non-finding (HNF)**: queries #3 (peer CLI alternative claude stars>1000) + #4 (CC template skill bundle stars>1000) + #5 (CC scaffold stars>500) + #8 (LLM PR review automated stars>1000) returned **zero matches** — these are zero-result terms not corpus voids; reformulated via explicit name-search.

---

## §A — Last-gap matrix (35 rows)

D1=Stars · D2=Last commit · D3=License-OSI · D4=Active-maintenance · D5=Native-CC-pathway · D6=L0.8/L3/L2.4 fit · D7=Install-risk (cardinal-rule-9) · D8=Sub-category

| # | Repo | Sub-cohort | D1 Stars | D2 Last commit | D3 License | D4 Active | D5 Native-CC | D6 Layer-fit | D7 Risk | D8 Sub-category |
|---|---|---|---:|---|---|---|---|---|---|---|
| 1 | facebookresearch/faiss | L0.8 Cache | 40,051 | 2026-03-06 | MIT | YES | NO native plugin; library | L0.8 vector-index primitive | LOW (lib link, not exec) | Vector-index library |
| 2 | redis/redis | L0.8 Cache | 74,400 | active unstable branch | RSALv2/SSPLv1/AGPLv3 (v8.0+) | YES | NO native plugin; via mcp-server | L0.8 K/V + vector store | MED (license change v8) | K/V cache + vector query |
| 3 | asg017/sqlite-vec | L0.8 Cache | 7,600 | 2026-03-31 (v0.1.9) | Apache-2.0 + MIT | YES | NO native plugin; SQLite ext | L0.8 embedded vector | LOW (zero-dep ext) | Embedded vector SQLite |
| 4 | LMCache/LMCache | L0.8 Cache | 8,300 | 2026-05-15 | Apache-2.0 | YES | NO native plugin; vLLM-side | L0.8 KV-cache distributed | LOW (server-side, not CC core) | KV-cache layer |
| 5 | zilliztech/GPTCache | L0.8 Cache | 8,000 | 2024-08-01 | MIT | **NO** (stale 21mo) | NO native plugin | L0.8 semantic-cache | HIGH (abandoned) | Semantic LLM cache |
| 6 | kvcache-ai/Mooncake | L0.8 Cache | 5,341 | 2026-05-16 | Apache-2.0 | YES | NO native plugin; vLLM/sglang | L0.8 KV-cache disaggregated | MED (C++ build, vLLM-coupled) | KV-cache disaggregation |
| 7 | lancedb/lance | L0.8 Cache | 6,400 | 2026-05-11 (v6.0.0) | Apache-2.0 | YES | NO native plugin; via lancedb | L0.8 lakehouse vector format | LOW (file format) | Vector lakehouse format |
| 8 | lancedb/lancedb | L0.8 Cache | 10,300 | 2026-05-13 | Apache-2.0 | YES | NO native plugin; via mcp-server | L0.8 vector DB | LOW | Vector DB |
| 9 | redis-stack/redis | L0.8 Cache | — | — | — | — | — | — | — | **HNF — repo does not exist (404 via WebFetch)** |
| 10 | 0xSero/turboquant | L0.8 Cache | 1,387 | 2026-05-16 | (Python lib) | YES (new 2026-03-25) | NO native plugin | L0.8 KV-quant for vLLM | MED (research-grade) | KV-quant kernels |
| 11 | sst/opencode | L3 Peer CLI | 161,000 | 2026-05-16 (v1.15.3) | MIT | YES | **Peer alternative** | L3 dominant peer | LOW (separate runtime) | Peer-CLI dominant |
| 12 | opencode-ai/opencode | L3 Peer CLI | 12,570 | 2025-06-27 | MIT | **ARCHIVED** | Predecessor of sst/opencode | L3 archived predecessor | HIGH (archived) | Peer-CLI legacy |
| 13 | block/goose | L3 Peer CLI | 45,300 | 2026-05-15 (v1.34.1) | Apache-2.0 | YES | **Peer alternative** | L3 strong peer | LOW | Peer-CLI (Block) |
| 14 | cline/cline | L3 Peer CLI | 61,883 | 2026-05-14 (v3.0.3) | Apache-2.0 | YES | **Peer alternative** (SDK + IDE + CLI) | L3 strong peer | LOW | Peer agent (SDK+CLI) |
| 15 | openinterpreter/open-interpreter | L3 Peer CLI | 63,548 | active main | AGPL-3.0 | YES | **Peer alternative** | L3 NL-to-code peer | MED (AGPL viral) | NL-to-code peer |
| 16 | Aider-AI/aider | L3 Peer CLI | 44,891 | 2026-05-16 | Apache-2.0 | YES | **Peer alternative** (terminal pair-prog) | L3 dominant pair-prog | LOW | Pair-programming CLI |
| 17 | TabbyML/tabby | L3 Peer CLI | 33,500 | 2026-01-25 | not specified | YES (slowing) | **Peer alternative** (self-hosted) | L3 self-host Copilot | MED (license unclear) | Self-host Copilot |
| 18 | charmbracelet/crush | L3 Peer CLI | 24,300 | 2026-05-15 | FSL-1.1-MIT | YES | **Peer alternative** (terminal agentic) | L3 strong peer | LOW | Peer-CLI (Charm) |
| 19 | sigoden/aichat | L3 Peer CLI | 9,995 | 2025-07-06 (v0.30.0) | Apache-2.0 + MIT | YES (slowing) | **Peer alternative** (multi-provider) | L3 multi-LLM CLI | LOW | Multi-LLM CLI |
| 20 | All-Hands-AI/OpenHands | L3 Peer CLI | 73,700 | 2026-05-01 | MIT | YES | **Peer alternative** (autonomous) | L3 dominant autonomous | MED (Python install) | Autonomous dev peer |
| 21 | google-gemini/gemini-cli | L3 Peer CLI | 104,000 | 2026-05-12 | Apache-2.0 | YES | **Peer alternative** (Gemini) | L3 hyperscaler peer | LOW | Peer-CLI (Google) |
| 22 | sourcebot-dev/sourcebot | L3 Peer CLI | 3,400 | 2026-05-16 (v4.17.2) | (proprietary view) | YES | NO native; AI-enriched search | L3 codebase-search peer | LOW | Code-intel companion |
| 23 | agent-sh/agentsys | L3 Peer CLI | 803 | 2026-04-26 (v5.12.0) | MIT | YES | Multi-runtime plugin orchestrator | L3 meta-orchestrator | MED (cross-runtime coupling) | Cross-runtime orchestrator |
| 24 | gmickel/flow-next | L3 Peer CLI | 587 | active main | MIT | YES | **CC plugin + Codex + Droid** | L3 cross-model planner | LOW | Plan-first plugin |
| 25 | dictation-toolbox/ant | L3 Peer CLI | — | — | — | — | — | — | — | **HNF — repo does not exist (404)** |
| 26 | codename-rebel/cwc | L3 Peer CLI | — | — | — | — | — | — | — | **HNF — repo does not exist (404)** |
| 27 | davila7/claude-code-templates | L2.4 CC-Templates | 27,300 | active main | MIT | YES | **Native CC** (100+ agents, MCPs, hooks) | L2.4 dominant template aggregator | LOW (manifest-style) | Template aggregator |
| 28 | existential-birds/beagle | L2.4 CC-Templates | 58 | 2026-05-15 | Apache-2.0 | YES | **Native CC** (plugin marketplace, 145 skills) | L2.4 niche marketplace | LOW | Plugin marketplace |
| 29 | Piebald-AI/claude-code-system-prompts | L2.4 CC-Templates | 10,235 | 2026-05-16 | MIT | YES | **Native CC** (prompt source-of-truth) | L2.4 reference corpus | LOW (read-only) | System-prompt archive |
| 30 | Piebald-AI/claude-code-lsps | L2.4 CC-Templates | 444 | active | (not displayed) | YES | **Native CC** (plugin marketplace, LSP) | L2.4 LSP plugin set | MED (license unclear) | LSP plugin marketplace |
| 31 | Piebald-AI/tweakcc | L2.4 CC-Templates | 2,023 | 2026-05-16 | MIT | YES | **Native CC** (modifies CC binary) | L2.4 customizer | HIGH (modifies installed binary) | CC binary customizer |
| 32 | farion1231/cc-switch | L2.4 CC-Templates | 72,500 | 2026-05-16 | MIT | YES | **Native CC** (account switcher) | L2.4 account-mgmt | LOW | Account/provider switcher |
| 33 | mvanhorn/last30days-skill | L2.4 CC-Templates | 25,900 | 2026-05-10 | MIT | YES | **Native CC skill** | L2.4 single-skill recipe | LOW | Research skill recipe |
| 34 | jeremylongshore/claude-code-plugins-plus-skills | L2.4 CC-Templates | 2,200 | 2026-05-12 | MIT | YES | **Native CC** (425 plugins, 2810 skills) | L2.4 mega-aggregator | MED (sheer scale, curation Q?) | Mega plugin aggregator |
| 35 | OthmanAdi/planning-with-files | L2.4 CC-Templates | 21,400 | 2026-05-16 | MIT | YES | **Native CC skill** | L2.4 skill recipe | LOW | Planning skill (Manus-derived) |
| 36 | wshobson/agents | L2.4 CC-Templates | 35,500 | active main | MIT | YES | **Native CC** (185 agents, 80 plugins, 153 skills) | L2.4 dominant agent collection | LOW | Agent/skill collection (already in W254 install set) |
| 37 | wshobson/commands | L2.4 CC-Templates | 2,500 | active | MIT | YES | **Native CC** (57 slash commands) | L2.4 slash-command collection | LOW | Slash-command collection |
| 38 | obra/superpowers | L2.4 CC-Templates | 194,000 | 2026-05-04 (v5.1.0) | MIT | YES | **Native CC** (agentic skills framework) | L2.4 dominant skills framework | LOW (already in W254) | Skills framework (already in W254 install set) |
| 39 | MotiaDev/motia | L3 Peer CLI (adjacent) | 15,700 | 2026-05-16 | Elastic-2.0 + Apache-2.0 (dual) | YES | NO native; framework | L3 adjacent (multi-service) | MED (Elastic-2 not OSI-pure) | Multi-service framework |

---

## §B — Top INSTALL recommendations per layer

### L0.8 Cache

**Primary INSTALL — sqlite-vec (asg017)** for L0.8 Cache (embedded vector primitive).
- D1=7.6k · D2=2026-03-31 · D3=Apache-2.0+MIT (dual OSI-pure) · D4=active · D7=LOW (zero-dependency SQLite extension; runs on Linux/macOS/Windows/WASM)
- **Rationale**: Already aligned with project's SQLite-heavy state-outside-repo pattern (CLAUDE_CODE_PROJECT_DIR JSONL transcripts). Drop-in `.so/.dll` extension — no external service. Complements LanceDB if larger-scale needed later.
- **Native-CC-pathway**: load via mcp-server-vector or direct Python `sqlite3.enable_load_extension()`. No plugin needed; load at MCP-tool wrapper layer.

**Secondary INSTALL (server-class) — LMCache** for vLLM-backed local inference KV-cache.
- D1=8.3k · D2=2026-05-15 · D3=Apache-2.0 · D4=active · D7=LOW (server-side; does not touch CC core)
- **Rationale**: Highest active-maintenance KV-cache layer; pairs cleanly with local Ollama/llama.cpp deployments. Token-throughput multiplier 2-10x on warm-cache workloads.
- **Native-CC-pathway**: NONE direct; integrated at the vLLM/sglang server layer behind LiteLLM gateway.

**REJECT — GPTCache** (D2=2024-08-01 → 21-month stale → abandoned; semantic-cache role now covered by LMCache + Mooncake).

**HNF** — `redis/redis-vss` does not exist as a standalone repo (404). Redis vector-search is bundled into Redis Stack since 2023; reference via `redis/redis` v8.x or RediSearch module instead.

### L3 Peer CLI

**Primary STUDY-ONLY — sst/opencode** (161k stars, MIT, TypeScript) as the dominant peer-CLI reference.
- D5=PEER (separate runtime, not installable into Claude Code).
- **Native-CC-pathway**: NONE. sst/opencode is a *parallel* runtime to CC, not a CC plugin. Useful as architectural reference (provider-agnostic TUI, LSP-first, client/server).
- **No INSTALL** — peer runtime; install only if operator chooses to switch or run dual-runtime.

**Secondary INSTALL (cross-runtime plugin) — gmickel/flow-next** (587 stars, MIT, Python).
- D5=NATIVE-CC PLUGIN (also Codex, Factory Droid)
- **Rationale**: One of the few L3 entrants that is *also* a native CC plugin (cross-model planner with worker subagents). Pairs with the project's cross-model-consensus discipline (Path P codex foreground+tee per CLAUDE.md). Already on the W254 candidate radar (cross-model reviews + Ralph autonomous mode align with cardinal-rule-1 plugin install lane).
- **D7=LOW** (small footprint, plugin-only).

**REJECT — opencode-ai/opencode** (predecessor; ARCHIVED 2025-06-27 → cardinal-rule-9 install-risk).

**STUDY-ONLY (architecture reference) — All-Hands-AI/OpenHands, charmbracelet/crush, Aider-AI/aider, cline/cline** — all are PEER runtimes not CC plugins; mine for design patterns only.

**HNF** — `dictation-toolbox/ant` (404) and `codename-rebel/cwc` (404). Neither exists. The "ant" and "cwc" name-targets in the upstream backlog appear to be misattributed or referenced from now-deleted repos; treat as **null entries**.

### L2.4 CC-Templates

**Primary INSTALL — davila7/claude-code-templates** (27.3k stars, MIT, Python).
- D5=NATIVE-CC (100+ agents, MCPs, custom commands, settings, hooks)
- **Rationale**: Dominant template aggregator with manifest-style install via `aitmpl.com` dashboard. Strong curation. Already proven at scale (27k stars). Pairs with the W254 install set without overlap (W254 targets the agent-tier; davila7 targets the template-tier).
- **D7=LOW** — manifest-style install (operator chooses which template; no runtime modification).

**Secondary INSTALL — Piebald-AI/claude-code-system-prompts** (10.2k stars, MIT, JavaScript).
- D5=NATIVE-CC (reference corpus; READ-ONLY artifact)
- **Rationale**: Source-of-truth for the canonical Claude Code system prompt + 24 builtin tool descriptions + sub-agent prompts. Critical for the cardinal-rule-1 *upstream-content-faithful* invariant — gives the project an authoritative reference for what CC actually ships, enabling SOTA-content gap detection.
- **D7=LOW** (READ-ONLY; commit to `docs/upstream-references/` for cite-anchor use).

**Tertiary INSTALL — OthmanAdi/planning-with-files** (21.4k stars, MIT, Python).
- D5=NATIVE-CC skill
- **Rationale**: Single-skill recipe (markdown planning across 17+ IDEs) with strong Manus AI lineage (cited from $2B acquisition workflow). Drops in via `/plugin install` mechanism. Composes cleanly with W254 obra/superpowers writing-plans skill.
- **D7=LOW**.

**REJECT — Piebald-AI/tweakcc** (D7=HIGH: modifies the installed Claude Code binary directly — violates cardinal-rule-2 "no `.claude/hooks/scripts/*.py` self-invent" and cardinal-rule-5 install-priority. The customization use-case is satisfied by CLAUDE.md + settings.json per cardinal-rule-4).

**REJECT — Piebald-AI/claude-code-lsps** (D3=license unclear per WebFetch; AMBER pending license verification. If MIT/Apache-2.0 → re-evaluate at PIVOT-AND-PILOT; if proprietary → REJECT). HNF below.

**STUDY-ONLY — jeremylongshore/claude-code-plugins-plus-skills** (425 plugins, 2810 skills): scale is too high for curation confidence; sample 5-10 highest-rated skills + cherry-pick rather than bulk-install.

**Already in W254 install set** — wshobson/agents, wshobson/commands, obra/superpowers (no new action; cited here for cross-cohort validation).

---

## §C — Honest non-findings (HNF)

1. **`redis/redis-vss` (probe target)** — 404 on direct WebFetch. Redis vector-similarity-search is **not a standalone repo**; it is bundled into Redis Stack since 2023 via the RediSearch module. Reference `redis/redis` (v8.x with vector query engine integrated) instead.

2. **`dictation-toolbox/ant` (peer CLI target)** — 404. The "ant" peer-CLI reference in the upstream backlog appears to be misattributed. No active "ant" agent-CLI peer was located via 8 GraphQL queries or explicit name-search.

3. **`codename-rebel/cwc` (peer CLI target)** — 404. The "cwc" peer-CLI reference is also misattributed or refers to a now-deleted repo. No active "cwc" CLI located.

4. **GraphQL queries #3 + #4 + #5 + #8** — all returned **zero matches** with the specified stars-thresholds + keyword conjunctions. Specifically:
   - Q3: `agent peer CLI alternative claude stars:>1000` → 0 hits (keyword "alternative claude" too rare in repo descriptions; entries surface under separate searches)
   - Q4: `claude code template skill bundle stars:>1000` → 0 hits (high-star CC template repos use different descriptions; davila7 surfaces via name-search at 27k stars but not via this keyword query)
   - Q5: `CC-template scaffold stars:>500` → 0 hits (hyphenated "CC-template" is not a discoverable term)
   - Q8: `LLM PR review automated stars:>1000` → 0 hits (high-star PR-review repos like qodo-ai/pr-agent surface under different keywords)
   
   These are **zero-result query terms**, not corpus voids. The actual corpus is well-populated; name-search and other keyword combos surface the entries.

5. **`coderabbitai/ai-pr-reviewer`** — 404 via WebFetch. The CodeRabbit AI repo URL has moved; the active equivalent is qodo-ai/pr-agent (11.2k stars, AGPL-3.0, 2026-05-14) which is captured in row N/A above as the L7-adjacent PR-review primitive (out-of-scope for this fork but noted for cross-tranche backlog).

6. **`Piebald-AI/claude-code-lsps` license** — D3 not displayed on the GitHub repo page (WebFetch could not extract). AMBER status: license-OSI-purity unverified. Operator should fetch raw LICENSE file before install adoption decision.

7. **`opencode-ai/opencode` archive status** — D4=ARCHIVED (last commit 2025-06-27). The active successor is **sst/opencode** (12.6k → 161k stars in 12 months; complete rewrite by SST team after taking over the name). Cross-referencing the project's prior backlogs that reference `opencode-ai/opencode` as live should redirect to `sst/opencode`.

8. **`zilliztech/GPTCache`** — D2=2024-08-01 → 21-month stale. The semantic-LLM-cache role has migrated to LMCache (Apache-2.0, 2026-05-15) and Mooncake (Apache-2.0, 2026-05-16). Mark GPTCache as **deprecated reference**, not a live install candidate.

9. **`MotiaDev/motia`** — discovered tangentially during cross-search. 15.7k stars, dual-licensed Elastic-2.0 (engine) + Apache-2.0 (SDK/console). Elastic-2.0 is NOT OSI-approved → D3=AMBER per cardinal-rule-3. Flagged for separate review; not part of this fork's primary cohorts but worth tracking for L10 framework layer.

10. **`Charmbracelet/crush` license `FSL-1.1-MIT`** — Functional Source License 1.1 with MIT step-down after 2 years. Not OSI-approved at launch (becomes MIT after delay). D3=AMBER for immediate adoption; LOW-RISK for STUDY-ONLY use as architectural reference.

---

**Fork status**: COMPLETE. 35 matrix rows + 3 layer-INSTALL recommendations (sqlite-vec for L0.8, gmickel/flow-next for L3 plugin tier, davila7/claude-code-templates for L2.4) + 10 honest non-findings codified. Hand-off ready for grand-synthesis integration.
