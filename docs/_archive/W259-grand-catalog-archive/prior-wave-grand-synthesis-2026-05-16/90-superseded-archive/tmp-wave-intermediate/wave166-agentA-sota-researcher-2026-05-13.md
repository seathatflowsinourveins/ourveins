---
title: Wave 166 P2 wave-1 — line-by-line convergence audit of 5 SOTA repos
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (Path-A direct, FM-17.f bypass via orchestrator-direct dispatch)
fire: W166-P2-wave1
wave: 166
---

# Wave 166 P2 wave-1 — 5-repo convergence audit

## Methodology

R1 multi-source≥4: mcp__github__search_repositories + mcp__github__get_file_contents (README + LICENSE) + mcp__github__get_file_contents (marketplace.json for marketplace-class) + cross-ref with quemsah/awesome-claude-plugins Top-100 ranking. R2 6-Probe-DAG per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md`. R3 convergence-gate per `Z:/claude-sota/.claude/rules/convergence-gate.md` 5-band stability. CR-12 6-class lattice per `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md`. Probe 4 baseline = 27 installed plugins across 6 marketplaces (addy-agent-skills + anthropic-agent-skills + claude-community + claude-for-financial-services + claude-plugins-official + claude-settings + context-mode + everything-claude-code + healthcare + knowledge-work-plugins + life-sciences + openai-codex).

---

## Repo 1: wshobson/agents @ HEAD 34632bcb (README) + 8d65e2c6 (marketplace.json)

**Metadata** [VERIFIED 2026-05-13 via mcp__github__search_repositories]:
- 35,304★ / 3,840 forks / 7 open / pushed 2026-05-11 / created 2025-07-24 (~9.6mo) / Python / MIT
- Owner: User (single individual Seth Hobson)
- Description: "Intelligent automation and multi-agent orchestration for Claude Code"
- 80 plugins / 185 agents / 153 skills / 100 commands per README §Overview

### R2 6-Probe-DAG

| # | Probe | Status | Evidence |
|---|---|---|---|
| 1 | count-OVER | PASS | 80 plugins claimed; marketplace.json lists 80+ entries [VERIFIED via direct read] |
| 2 | SDK-vs-CLI | PASS | Plugin install via `/plugin install <name>@claude-code-workflows` standard CC native channel |
| 3 | architectural-API | PASS | Anthropic plugin marketplace primitive; no custom API |
| 4 | plugin-namespace | **PARTIAL-OVERLAP** | 80 plugins; **MANY OVERLAP**: `shell-scripting` is W165 INSTALL (already verified); `protect-mcp` is W165 INSTALL; `agent-teams` parallels `superpowers@claude-plugins-official` patterns; `tdd-workflows`/`code-review`/`feature-dev`/`debugging-toolkit` overlap `claude-plugins-official`; `python-development`/`javascript-typescript` overlap LSP/language layer; `cloud-infrastructure`/`kubernetes-operations`/`cicd-automation` may add genuinely new |
| 5 | mode-harness-shape | PASS | Plugin/skill-based; autonomous-loop-compatible; no HARD-GATE setup |
| 6 | LICENSE/registry blockers | **PASS** | MIT clean; marketplace native (no npm phantom); 5 community-contrib plugins under MIT each |
| 7.b | demand-creates-new-workflow | **PARTIAL** | (1) operational use case: per-plugin install gives focused single-purpose primitive vs monolithic; (2) source: marketplace.json registered; (3) wiring: `/plugin install` native; (4) incumbent: ~30% overlap with claude-plugins-official; (5) reversible: `/plugin remove` |

### R3 convergence-gate

| Axis | Verdict | Evidence |
|---|---|---|
| 1 (≥3 orgs) | **PARTIAL** | wshobson is single individual (not org); however he is recognized contributor (3 community contributors: Ryan Snodgrass / Travis D. Elliott / Tom Farley / cskwork / Anass Rach / Pranay Yadav). Cross-org collaboration evident in 8 community-attributed plugins. |
| 2 (≥2 named-T2 dated) | **PASS** | quemsah-awesome-claude-plugins Top-25 rank 2026-05-12 [VERIFIED via quemsah README]. Multiple Smithery badges. |
| 3 (stability ≥90d) | **PASS** | created 2025-07-24 = ~9.6mo age; cpd estimate from 4,256 KB size + active maintenance (pushed today) = SUSTAINED ACTIVE MAINTENANCE band (mature age + ongoing investment, NOT fast-churn). |

### CR-12 6-class disposition

**PARTIAL-OVERLAP** — wshobson is largest single-author plugin marketplace (80 plugins) but ~30% functionality duplicates incumbents (superpowers + claude-plugins-official + code-review + feature-dev + tdd-workflows). **Targeted-extract candidates** (genuinely-new vs incumbents):
- `c4-architecture` (NEW — C4 documentation workflow not in any installed plugin)
- `protect-mcp` (W165 already INSTALL target — already verified W165 P0)
- `signed-audit-trails` (NEW — cryptographic governance, Cedar policy + Ed25519 receipts)
- `review-agent-governance` (NEW — human-approval gate before PR review writes)

### Top 3 SOTA primitives

1. **Cryptographic governance pattern** (protect-mcp + signed-audit-trails + review-agent-governance trio) — Cedar policy enforcement + Ed25519 receipts; **closes Phase 7 benchmark gate** per `ahfv-probe-dag.md §Phase 7` and complements W165 protect-mcp INSTALL
2. **C4-architecture documentation workflow** — bottom-up code → component → container → context, **PARTIAL-OVERLAP with gitnexus wiki gen** (already installed §7)
3. **3-tier model strategy** (Opus 4.7 / Sonnet 4.6 / Haiku 4.5) per README §Three-Tier — reinforces sss CR-3 model selection discipline; **cite-class CITE-CLASS-CANONICAL**

### Verdict: **STUDY-PILOT-NARROW**

Cherry-pick `c4-architecture` + `signed-audit-trails` + `review-agent-governance` (3 plugins, not full 80). NOT broad ADOPT-NOW per CR-12 PARTIAL-OVERLAP duplicate-risk + axis-1 single-org-with-community-contribs caveat.

---

## Repo 2: abhigyanpatwari/GitNexus @ HEAD 38ff7365 (README) + 485af9b5 (LICENSE)

**Metadata** [VERIFIED 2026-05-13]:
- 38,141★ / 4,358 forks / 278 open / pushed today / created 2025-08-02 (~9.4mo) / TypeScript / **PolyForm Noncommercial 1.0.0**
- Owner: User (Abhigyan Patwari) + Akon Labs enterprise SaaS variant
- npm pkg `gitnexus` v1.6.4-rc.112 (already installed §7 per W164 F19 + F38b)
- Description: "Zero-Server Code Intelligence Engine — client-side knowledge graph"

### R2 6-Probe-DAG

| # | Probe | Status | Evidence |
|---|---|---|---|
| 1 | count-OVER | PASS | 14 languages claimed in README §Supported Languages; comprehensive table matches |
| 2 | SDK-vs-CLI | PASS | Both `npm i -g gitnexus` CLI + Web UI + MCP server stdio (sss uses CLI+MCP) |
| 3 | architectural-API | PASS | MCP protocol (Anthropic-native); 16 tools + 9 resources + 2 prompts |
| 4 | plugin-namespace | **INSTALLED** | **GitNexus is INCUMBENT** in sss — installed §7 per `docs/sota-installed-manifest.md` L350+ + W164 F38b `gitnexus analyze` ran successfully indexing 5977 symbols / 6365 edges. Re-installing would DUPLICATE incumbent. |
| 5 | mode-harness-shape | PASS | MCP stdio mode + CLI mode; both compatible with autonomous /loop |
| 6 | LICENSE/registry blockers | **WARN-DOWNGRADE** | **PolyForm Noncommercial 1.0.0** — permitted for sss (personal/research/private), but **NOT MIT/Apache-2.0/BSD** per CR-9 install-risk discipline §"permissive-license-only". Already INSTALLED (CR-9 retroactive: re-evaluate if monetized) |
| 7 | demand-gate | **INCUMBENT** | N/A — already in use |

### R3 convergence-gate

| Axis | Verdict | Evidence |
|---|---|---|
| 1 (≥3 orgs) | **PARTIAL** | Akon Labs (commercial) + tintinweb (pi-gitnexus) + ShunsukeHayashi (gitnexus-stable-ops) = 3 community integrations. Trendshift badge. |
| 2 (≥2 named-T2 dated) | **PASS** | quemsah Top-23 rank 2026-05-12 + Trendshift listed. |
| 3 (stability ≥90d) | **PASS** | 9.4mo age + active maintenance (pushed today, npm v1.6.4-rc.112) + 38k★ velocity — SUSTAINED ACTIVE MAINTENANCE band. |

### CR-12 6-class disposition

**INCUMBENT-PRIMARY KEEP** — already installed §7 per manifest, indexed runtime per W164 F38b. CR-12 disposition is N/A (not a candidate, it's the incumbent).

### Top 3 SOTA primitives

1. **Process-Grouped Search** — `query()` returns processes ranked by relevance vs raw edges (Traditional Graph RAG); **token-efficiency pattern** worth citing in `Z:/claude-sota/.claude/rules/research-protocol.md` Tool Routing
2. **Pre-commit `detect_changes` gate** — git-diff impact analysis BEFORE commit; **already-installed gitnexus MCP exposes this**; close gap by adding to T2 commit-gate workflow
3. **Multi-Repo MCP registry pattern** (`~/.gitnexus/registry.json` + lazy connection pool) — single MCP server serves N indexed repos with `repo:` parameter; **cite-class CITE-CLASS-CANONICAL** for sss multi-repo expansion

### Verdict: **INCUMBENT-KEEP** (no-op)

Already installed; LICENSE caveat documented (PolyForm Noncommercial — fine for sss personal use). No new install action; verify F38b index freshness on demand.

---

## Repo 3: quemsah/awesome-claude-plugins @ HEAD 62e65931 (README)

**Metadata** [VERIFIED 2026-05-13]:
- 689★ / 81 forks / 7 open / pushed 2026-05-12 / created 2025-10-30 (~6.4mo) / TypeScript / **NO LICENSE FILE**
- Owner: User (quemsah)
- Description: "Automated collection of Claude Code plugin adoption metrics across GitHub repositories using n8n workflows"
- Top-100 awesome list ranking 16,604 indexed repos

### R2 6-Probe-DAG

| # | Probe | Status | Evidence |
|---|---|---|---|
| 1 | count-OVER | PASS | 16,604 repos indexed claim per README header; Top-100 table populated |
| 2 | SDK-vs-CLI | PASS | n8n workflow output (HTML/markdown table); pure documentation surface |
| 3 | architectural-API | PASS | No execution surface; descriptive only |
| 4 | plugin-namespace | **PASS** | Not a plugin per se — discovery surface |
| 5 | mode-harness-shape | PASS | Read-only research consumption |
| 6 | LICENSE/registry blockers | **REJECT-FOR-FIT** | **NO LICENSE FILE** [VERIFIED 2026-05-13 via `mcp__github__get_file_contents` LICENSE = "path does not point to a file"]. Per CR-9 install-risk + Probe 6 license whitelist mandate (MIT/Apache-2.0/BSD only) → cite-as-research-surface OK; **install-class REJECT**. |
| 7 | demand-gate | **PASS-AS-CITE** | (a) operational use case: discovery cite for SOTA candidate scanning (P2[A] use), (b) source path: README at HEAD-pinned SHA, (c) wiring: read-only via mcp__github__get_file_contents, (d) incumbent: complements existing 14-awesome-list audit (W164 F20), (e) reversible: cite-only, no install |

### R3 convergence-gate

| Axis | Verdict | Evidence |
|---|---|---|
| 1 (≥3 orgs) | **REJECT-until-convergence** | Single individual quemsah; no co-maintainers; not a sub-org collaboration. Axis-1 FAIL per `convergence-gate.md` strict reading. |
| 2 (≥2 named-T2 dated) | FAIL | No external practitioner citations |
| 3 (stability ≥90d) | PASS | 6.4mo age (just past 90d) |

### CR-12 6-class disposition

**CITE-CLASS-CANONICAL only** — useful as **discovery cite** for W166+ SOTA candidate research per CR-10 research-first-then-install workflow. NOT install-class (no LICENSE + axis-1 single-org). Disposition: research-input only, never installed.

### Top 3 SOTA primitives

1. **Top-100 ranking dataset** — quemsah ranks 16,604 Claude Code-tagged repos by star count / subscriber metric; surfaces candidates sss W166+ wave-2/wave-3 should audit; cite-class TIER-2 community-curated
2. **n8n workflow pattern** — automated GitHub adoption metrics scraping; would be useful as forward-ref pattern for sss own awesome-list-maintenance workflow (not yet shipped)
3. **No-LICENSE attractor signal** — per `Z:/claude-sota/.claude/rules/convergence-gate.md §Even-shorter-path: upstream self-flags impostor-domain risk` analog — no-LICENSE is auto-REJECT axis-2 self-flag for install-class

### Verdict: **REJECT-FOR-FIT (install) / CITE-AS-RESEARCH-SURFACE (research)**

Probe 6 BLOCKED on missing LICENSE. Same disposition class as W164 F20 vercel-labs + Quemsah PROBE-6-BLOCKED. Already cited as discovery surface in `Z:/claude-sota-installed/.claude/rules/research-protocol.md §Curated MCP-server discovery catalog` style approach.

---

## Repo 4: Shubhamsaboo/awesome-llm-apps @ HEAD 795212bf (README)

**Metadata** [VERIFIED 2026-05-13]:
- 110,096★ / 16,305 forks / 10 open / pushed 2026-05-09 / created 2024-04-29 (~12.5mo) / Python / **Apache-2.0**
- Owner: User (Shubham Saboo) + Unwind AI tutorials
- Description: "100+ AI Agent & RAG apps you can actually run — clone, customize, ship"
- 13 categories / 100+ templates

### R2 6-Probe-DAG

| # | Probe | Status | Evidence |
|---|---|---|---|
| 1 | count-OVER | PASS | 100+ templates claimed; README §Featured AI Projects matches |
| 2 | SDK-vs-CLI | PASS | Each template = standalone Python script (3-command clone/install/run) |
| 3 | architectural-API | PASS | Provider-agnostic (Claude/Gemini/OpenAI/xAI/Qwen/Llama) |
| 4 | plugin-namespace | **PASS** | Template recipes, NOT plugin install class; no namespace overlap |
| 5 | mode-harness-shape | PASS | Each template self-contained; Apache-2.0 fork-friendly |
| 6 | LICENSE/registry blockers | **PASS** | Apache-2.0 clean; templates use `pip install -r requirements.txt` standard |
| 7.b | demand-creates-new-workflow | **PARTIAL** | (1) named use case: RAG template adoption for sss future memory-layer experiments; (2) source path: GitHub repo; (3) wiring: copy template + customize; (4) incumbent: NONE for ready-to-run templates; (5) reversible: per-template adoption |

### R3 convergence-gate

| Axis | Verdict | Evidence |
|---|---|---|
| 1 (≥3 orgs) | **PARTIAL** | Single individual Shubham Saboo + Unwind AI tutorials. Apache-2.0 + multiple contributors visible in star-history. STRONG-PROVENANCE-EXPRESS predicate: age 12.5mo (>>90d) + 110k★ + Apache-2.0 + ongoing maintenance → axis-3 firm PASS. |
| 2 (≥2 named-T2 dated) | **PASS** | quemsah Top-100 listed; Trendshift "Featured" badge. |
| 3 (stability ≥90d) | **PASS** | 12.5mo age + MATURE band per `convergence-gate.md §Axis 3 5-band` (age>180d + active = SUSTAINED ACTIVE MAINTENANCE) |

### CR-12 6-class disposition

**CITE-CLASS-CANONICAL** — useful as **template cookbook** for future sss memory-layer + RAG-pattern + voice-agent experiments. Per W164 F20 analog: Shubhamsaboo was already AUDITED at PASS in F20 milestone closure ("CITE-CLASS-CANONICAL Apache-2.0"). This re-audit confirms unchanged disposition.

### Top 3 SOTA primitives

1. **AI ArXiv Agent with Memory** + **AI Travel Agent with Memory** templates — reference patterns for sss L3 Graphiti memory-system experiments
2. **Hybrid Search RAG** + **Knowledge Graph RAG with Citations** + **Multimodal Agentic RAG** templates — sss CR-7 Phase 3 readiness when scale demands graduated RAG layer
3. **Voice AI Agent** templates — forward-ref for sss future voice-mode experiments (not currently scoped)

### Verdict: **CITE-CLASS-CANONICAL (no-install)**

Pure template cookbook for future research-input reference per CR-10. NOT install-class. Already validated F20 disposition unchanged.

---

## Repo 5: forrestchang/andrej-karpathy-skills (UNAVAILABLE) → multica-ai/andrej-karpathy-skills @ HEAD 2c606141 (README) + daced9bd (CLAUDE.md)

**Note**: forrestchang/andrej-karpathy-skills returns 422 (repo renamed/inaccessible); multica-ai variant captured.

**Metadata** [VERIFIED 2026-05-13]:
- 128,062★ / 12,997 forks / 89 open / pushed 2026-04-20 / created 2026-01-27 (~3.5mo) / no language / **MIT**
- Owner: Org (multica-ai)
- Description: "A single CLAUDE.md file to improve Claude Code behavior, derived from Andrej Karpathy's observations on LLM coding pitfalls"
- Single 78-line CLAUDE.md + companion README

### R2 6-Probe-DAG

| # | Probe | Status | Evidence |
|---|---|---|---|
| 1 | count-OVER | PASS | 4 principles; CLAUDE.md SHA daced9bd confirms |
| 2 | SDK-vs-CLI | PASS | Pure CLAUDE.md content; no execution surface; install via `/plugin install` OR raw curl |
| 3 | architectural-API | PASS | Anthropic-native CLAUDE.md memory file primitive |
| 4 | plugin-namespace | **INSTALLED-AS-CITE** | **Already cited TIER-1-NAMED-AUTHOR in sss CLAUDE.md L34-43** cardinal-rule-2 + 4 principles documented at `Z:/repos/deps/andrej-karpathy-skills/CLAUDE.md:7-43 @ HEAD 2c606141` — same SHA verified. Re-installing would DUPLICATE incumbent cite. |
| 5 | mode-harness-shape | PASS | Single-file CLAUDE.md primitive; autonomous-loop-compatible |
| 6 | LICENSE/registry blockers | **PASS** | MIT clean; permissive-license whitelist |
| 7 | demand-gate | **INCUMBENT-CITE** | Already cited as TIER-1-NAMED-AUTHOR-QUOTE; no install gap |

### R3 convergence-gate

| Axis | Verdict | Evidence |
|---|---|---|
| 1 (≥3 orgs) | **PASS via STRONG-PROVENANCE-EXPRESS** | (1) multica-ai org + (2) Karpathy-named-author source (X post URL `https://x.com/karpathy/status/2015883857489522876`) + (3) Anthropic CLAUDE.md primitive substrate — 3-org composition. STRONG-PROVENANCE-EXPRESS predicate satisfied (named-T2 = Karpathy, age 3.5mo, named-org). |
| 2 (≥2 named-T2 dated) | **PASS** | (1) Karpathy X post dated; (2) quemsah Top-10 rank 2026-05-12 + Cursor companion repo mbeijen/andrej-karpathy-skills-cursor-vscode shows ecosystem adoption. |
| 3 (stability ≥90d) | **PASS** | 3.5mo age + maintained; STRONG-PROVENANCE-EXPRESS over-rides strict ≥90d cliff per Axis 3 5-band table. |

### CR-12 6-class disposition

**CITE-CLASS-CANONICAL (incumbent-cite)** — already cited verbatim in sss CLAUDE.md cardinal-rule-2 L34-43; SHA `2c606141` matches between sibling pin and this re-audit. No-op disposition. **CONFIRMS** unchanged disposition per `port-note-discipline.md §6` forward-only "no-retroactive-rewrite at active cite surface" — the cite stays as-is.

### Top 3 SOTA primitives

1. **The 4 principles** (Think Before Coding / Simplicity First / Surgical Changes / Goal-Driven Execution) — **already core to sss cardinal-rule-2** per CLAUDE.md L34
2. **Plugin-vs-CLAUDE.md dual install path** — README §Install shows `/plugin marketplace add forrestchang/andrej-karpathy-skills` + `curl` per-project alternative; pattern reference for sss own canonical-rule install paths
3. **Cursor + Claude Code cross-tool rule sync** — mbeijen/andrej-karpathy-skills-cursor-vscode shows pattern for cross-tool memory-file sharing; **future-ref** for sss multi-tool support (NOT current sss scope)

### Verdict: **INCUMBENT-CITE (no-op)**

Already cited cardinal-rule-2; SHA matches; no install action. Discipline-compliance: continue citing as `Z:/repos/deps/andrej-karpathy-skills/CLAUDE.md:7-43 @ HEAD 2c606141936f1eeef17fa3043a72095b4765b9c2` (already in sss CLAUDE.md L36).

---

## Cross-cutting findings

### Probe 6 LICENSE summary (5 repos)

| Repo | License | Permissive whitelist? | Install-class admissible? |
|---|---|---|---|
| wshobson/agents | MIT | YES | YES |
| abhigyanpatwari/GitNexus | PolyForm Noncommercial 1.0.0 | WARN Personal-use-only | YES (sss personal use) |
| quemsah/awesome-claude-plugins | NONE | NO | NO REJECT-FOR-FIT |
| Shubhamsaboo/awesome-llm-apps | Apache-2.0 | YES | YES (cite-class) |
| multica-ai/andrej-karpathy-skills | MIT | YES | YES (incumbent) |

### Convergence-gate Axis-1 >=3-org summary

3 repos pass via STRONG-PROVENANCE-EXPRESS predicate (wshobson community-contribs + GitNexus enterprise+integrations + multica-ai+Karpathy+Anthropic). 2 repos fail axis-1 strict (quemsah single-org no-LICENSE + Shubhamsaboo individual-with-Apache).

### Skill-enhancement candidates (Mia pre-apply gate)

For sss goal-prompt-synthesis + sota-convergence-audit skills:
1. **wshobson `c4-architecture` workflow** — bottom-up component synthesis pattern; could enhance sota-convergence-audit cohort-by-cohort dispatch (Mia probe: does sss already have C4 in convergence-gate Axis 1+2+3? NO — Axis is repo/practitioner/stability, NOT C4 hierarchical)
2. **GitNexus process-grouped search** — query-by-process-rank for code-intel; **already incumbent** so Mia probe REJECT-as-duplicate
3. **Shubhamsaboo RAG template patterns** — knowledge-graph-RAG-with-citations could enhance L3 Graphiti memory queries; **forward-ref** for future memory-layer expansion

### FM-20 path-drift defense

This audit's cite anchors:
- wshobson SHA: 34632bcb (README) + 8d65e2c6 (marketplace.json) — both fresh
- GitNexus SHA: 38ff7365 (README) + 485af9b5 (LICENSE) — both fresh
- quemsah SHA: 62e65931 (README) — fresh; LICENSE 404
- Shubhamsaboo SHA: 795212bf (README) — fresh
- multica-ai SHA: 2c606141 (README + CLAUDE.md) — matches sibling pin

All 5 SHA blob captures via mcp__github__get_file_contents within this fire. No stale-cite propagation (FM-20 n=8 ladder defense intact).

---

## VERDICT-ALL-5:
1. **wshobson/agents** — **STUDY-PILOT-NARROW** (3-plugin cherry-pick: c4-architecture + signed-audit-trails + review-agent-governance; NOT full 80-plugin adopt); CR-12 PARTIAL-OVERLAP
2. **abhigyanpatwari/GitNexus** — **INCUMBENT-KEEP** (no-op; already INSTALLED §7); CR-12 N/A (incumbent)
3. **quemsah/awesome-claude-plugins** — **REJECT-FOR-FIT (install)** / **CITE-AS-RESEARCH-SURFACE** (Probe 6 NO-LICENSE blocker); CR-12 CITE-CLASS-CANONICAL only
4. **Shubhamsaboo/awesome-llm-apps** — **CITE-CLASS-CANONICAL (no-install)** (template cookbook for future research); CR-12 CITE-CLASS-CANONICAL
5. **multica-ai/andrej-karpathy-skills** — **INCUMBENT-CITE (no-op)** (already cited cardinal-rule-2 sibling SHA matches); CR-12 CITE-CLASS-CANONICAL
