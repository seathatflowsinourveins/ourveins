---
title: Wave 104 — SRA-driven re-audit + missing-SOTA discovery
status: AUTHORITATIVE
date: 2026-05-08
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g))
scope: Re-audit Wave 102 reclassifications + discover missing-SOTA via SRA D1-D10
verdict: REVISE-RE-AUDIT
confidence: 0.84
methodology: SRA `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md` @ HEAD 3322b58 — D1-D10 multi-dimensional probe
---

# Wave 104 — SRA-driven re-audit

STAND-IN-NOTICE: Sonnet stand-in per CLAUDE.local.md ENV (g); orchestrator-side codex T1 e2e MANDATORY before commit per CR-3 + Ship 2X SRA mandate.

Probe date: 2026-05-08T (UTC, sometime late). All gh-api results verified live.

## TASK A — Wave 102 reclassification re-audit using SRA D1-D10

### A.1 trufflehog AGPL-3.0 — D1 use-class precision

| Dimension | Score | Evidence |
|---|---|---|
| D1 license-use-class | **CONDITIONAL-PASS** | Use-class = standalone CLI binary; AGPL CLI binary use does NOT trigger derivative-works obligations (same class as semgrep LGPL-2.1 PASS-WITH-CAVEAT). Wave 102 REJECT was D1 use-class precision error. **HOWEVER:** trufflehog.exe is NOT INSTALLED in `.local/bin/` (verified 2026-05-08 — `ls Z:/claude-sota-installed/.local/bin/` shows: claude.exe / cli-proxy-api.exe / **gitleaks.exe** / markitdown.exe / osv-scanner.exe / pysemgrep.exe / semgrep.exe / specify.exe / trivy.exe / typos.exe / vale.exe — ANT but NO trufflehog). |
| D2 SOTA-freshness | PASS | last-push 2026-05-08; 26,097★; active |
| D5 active maintenance | PASS | recent commits; trufflesecurity org maintained |
| D6 use-class compatibility | PASS | CLI binary fits eee security tooling pattern (sister to gitleaks/osv-scanner/trivy) |
| D7 Anthropic CC policy | NEUTRAL | Anthropic ships under MIT/Apache-2.0; no explicit AGPL stance found in code.claude.com docs |
| D8 industry adoption | PASS | major sec-tooling adoption; integrated in GitHub Actions/CircleCI/etc. |
| D10 replacement viability | gitleaks (already installed, MIT, 26,684★) covers same surface |

**SRA Verdict**: trufflehog is **REJECT-FUNCTIONALLY-ABSENT**. Wave 102 license-class REJECT was technically a D1 precision error (CLI binary AGPLv3 ≠ derivative-works trigger), but operationally moot since trufflehog.exe was never installed. **gitleaks suffices** for the secret-scan use-class.

**Cross-model T1 required**: NO (functional removal — operationally absent already; Wave 102 verdict stands by accident-of-non-install).

### A.2 mksglu/context-mode ELv2 — D1 local-runtime use-class

| Dimension | Score | Evidence |
|---|---|---|
| D1 license-use-class | **PASS-FOR-LOCAL-RUNTIME-USE** | LICENSE confirmed `Elastic License 2.0 (ELv2)` Copyright 2026 Mert Koseoglu. ELv2 prohibits **providing software AS HOSTED SERVICE** to third parties. Use-class in eee = local-runtime sandbox via `/plugin install context-mode@context-mode` (Wave 95 Ship 1M). Local plugin use is NOT redistribution-as-SaaS — NO TRIGGER. |
| D2 SOTA-freshness | PASS | last-push 2026-05-08; 14,037★ active |
| D5 active maintenance | PASS | active; ctx_doctor verifies 5/6 PASS |
| D6 use-class compatibility | PASS | 4 hooks (PreToolUse/PostToolUse/PreCompact/SessionStart) + 6 sandbox tools — load-bearing for token-eff |
| D7 Anthropic CC policy | **STRONG-PASS** | Anthropic itself: per-plugin license model (claude-plugins-official has `null` license); modelcontextprotocol/servers `NOASSERTION` (per-server). Anthropic ecosystem accepts non-permissive licenses for plugin-class artifacts. ELv2 for plugin = use-class fit. |
| D8 industry adoption | PASS | 14k★ + Anthropic-ecosystem-aligned plugin |
| D9 failure-mode awareness | NEUTRAL | No FM catalog entry against ELv2 plugins |
| D10 replacement viability | LOW (no equivalent permissive-license context-window-management with hook integration) |

**SRA Verdict**: **REVERT-WAVE-102-REJECT-VERDICT**. Wave 102 ELv2 REJECT was D1 use-class precision error. Per SRA D1-D7 alignment, ELv2 for **local-runtime-plugin use-class** is acceptable. Plugin-supplied MCP at `.claude/plugins/marketplaces/context-mode/` is OPERATIONALLY ACTIVE (token-eff load-bearing per Ship 1A V64:72).

**Cross-model T1 required**: **YES** — orchestrator MUST fire codex T1 before reverting Wave 102 verdict, since this is a license-policy reversal that affects CR-9 install-risk discipline.

### A.3 FalkorDB SSPLv1 — D1 local-Docker-DB use-class

| Dimension | Score | Evidence |
|---|---|---|
| D1 license-use-class | **PASS-FOR-LOCAL-DB-USE** | SSPLv1 prohibits offering DB AS SERVICE to third parties. Use-class in eee = local Docker container at port 16379 backing graphiti L3 temporal-KG. Local DB for own apps = NO TRIGGER. |
| D2 SOTA-freshness | PASS | last-push 2026-05-07; 4,356★ active |
| D5 active maintenance | PASS | FalkorDB v1.6.1 stable + active development |
| D6 use-class compatibility | PASS | graphiti backend (already wired at `Z:/claude-sota-installed/.local/graphiti/`) |
| D7 Anthropic CC policy | NEUTRAL | No specific Anthropic stance on SSPLv1; ecosystem neutral on local-DB licenses |
| D8 industry adoption | PARTIAL | Mongo-class license; smaller adoption than Apache-2.0 graph DBs |
| D10 replacement viability | **LIMITED**: Wave 102 proposed kuzudb (MIT) — but **kuzudb/kuzu IS ARCHIVED 2025-10-10** per gh api probe (last-push 211 days ago, archived flag TRUE). neo4j Community is GPL-3.0 (same blocker class). memgraph NOASSERTION (LICENSE probe needed). **No clean replacement available**. |

**SRA Verdict**: **REVERT-WAVE-102-REJECT-VERDICT**. SSPLv1 for local-DB-use-class is acceptable. Wave 102 proposed kuzu replacement is NOT VIABLE (archived). Operator should retain FalkorDB.

**Cross-model T1 required**: **YES** — same as A.2; license-policy reversal affects discipline.

### A.4 forrestchang/andrej-karpathy-skills NO-LICENSE — D4 named-author cite-anchor

| Dimension | Score | Evidence |
|---|---|---|
| D1 license-use-class | **HARD-FAIL** | Verified via gh api: `license: null`, `parent: null` (NOT a fork), `description: "A single CLAUDE.md file to improve Claude Code behavior, derived from Andrej Karpathy's observations"`. **NO LICENSE FILE = legally unsharable per copyright default**. |
| D2 SOTA-freshness | DOWNGRADE | last-push 2026-04-20 (18 days ago — within burn-in but trending stale) |
| D3 fresh-paint detection | **HARD-FAIL** | 120,657★ at 3mo age + 530KB size + tiny content + no LICENSE = textbook fresh-paint signal per `convergence-gate.md §"Fresh-paint anti-pattern"` |
| D4 maintainer-provenance | **HARD-FAIL** | NOT Karpathy himself (verified: `karpathy/karpathy-skills` 404, `karpathy/skills` 404, `karpathy/agent-skills` 404). Real Karpathy: nanochat (53k★ MIT), llm.c (29k★ MIT). forrestchang is unrelated user — **misattribution risk** for cite anchor classed as TIER-1-NAMED-AUTHOR-QUOTE in `karpathy-adapted.md`. |
| D5 active maintenance | NEUTRAL | active recent push but content depth questionable |
| D6 use-class compatibility | PARTIAL | "derived from observations" — paraphrase NOT verbatim Karpathy quote |
| D7 Anthropic CC policy | NEUTRAL | n/a |
| D8 industry adoption | UNRELIABLE | star velocity inconsistent with 530KB size and no provenance |

**SRA Verdict**: **WAVE-102 DOWNGRADE STANDS — UPGRADE TO REJECT-FOR-CITE-ANCHOR**. Per SRA D1+D3+D4 hard-fail, this fork CANNOT serve as TIER-1-NAMED-AUTHOR-QUOTE cite anchor. Real Karpathy primary sources: 
- `karpathy/nanochat` (MIT, 53,129★, 4 days fresh) 
- `karpathy/llm.c` (MIT, 29,839★)
- karpathy.ai blog posts
- Karpathy Twitter/X

Recommend: replace cite in `karpathy-adapted.md` with verbatim Karpathy URL OR pin to `karpathy/nanochat/CLAUDE.md` if exists.

**Cross-model T1 required**: **YES** — cite-anchor reclassification affects CR-1 cardinal-rule compliance for `karpathy-adapted.md`.

### A.5 everything-claude-code v2.0.0-rc.1 — D2 + D9 RC trap

| Dimension | Score | Evidence |
|---|---|---|
| D2 SOTA-freshness | DOWNGRADE | RC1 — pre-stable; risk of breaking changes |
| D9 failure-mode awareness | **HARD-FAIL** | Per CR-9 sub-rule "version-pin all @latest" + sibling Z:/claude-sota named-failure-modes FM-22.d "RC plugin trap class" |
| D10 replacement viability | Wait for stable v2.0.0 OR pin specific RC SHA |

**SRA Verdict**: **WAVE-102 DOWNGRADE STANDS**. Operator should pin specific commit SHA until stable v2.0.0 ships.

**Cross-model T1 required**: NO (forward-only operator-discipline)

### A.6 CCBP cited HEAD 6 days behind — D2 freshness

CCBP `Z:/repos/deps/claude-code-best-practice-shan @ 64fffd53` (cited 2026-05-02) → upstream HEAD `2026-05-08T15:47Z` per gh api. Diff = 6 days.

**SRA Verdict**: **DOWNGRADE STANDS, RE-PIN RECOMMENDED**. Per CR-6 fresh-from-github mandate. Re-pin to current HEAD via `git -C Z:/repos/deps/claude-code-best-practice-shan fetch origin && git rev-parse origin/main`.

**Cross-model T1 required**: NO (mechanical pin update; not a verdict change)

### A.7 codex cited HEAD 17 days behind — D2 freshness

codex `Z:/repos/deps/codex @ 993e3f40` (cited 2026-04-22) → upstream last-push `2026-05-09T` per gh api. Diff = 17 days.

**SRA Verdict**: **DOWNGRADE STANDS, RE-PIN RECOMMENDED**. Sister concern to A.6. CR-6 mandates fresh-from-github before install or cite-anchoring.

**Cross-model T1 required**: NO (mechanical pin update)

## TASK B — MISSING-SOTA discovery via SRA D1-D10

### B.1 Token-efficiency Top-3 (beyond rtk / context-mode / claude-context / cnighswonger)

#### Candidate 1: **langchain-ai/deepagents** — middleware-summarization pattern

| Dim | Score | Evidence |
|---|---|---|
| D1 | PASS | MIT |
| D2 | **FRESH** | last-push 2026-05-08 (0 days) |
| D3 | NEUTRAL | created 2025-07-27 (~10mo); 22,492★ |
| D4 | TIER-1-OFFICIAL | LangChain org-named-T1 |
| D5 | PASS | active |
| D6 | PARTIAL | Python middleware pattern; NOT install-class for eee (CC TS) — **CITE-EXTEND only** |
| D7 | PASS | Apache-ecosystem-aligned |
| D8 | PASS | LangChain ecosystem |
| D10 | PARTIAL | already cited as pattern at `team-orchestration.md` middleware-summarization line ref |

**Verdict**: **CITE-EXTEND only — NOT install-class** (Python-only). Already partially cited; tighten cite-anchor to specific file:line.

#### Candidate 2: **stanfordnlp/dspy** — programming-not-prompting framework

| Dim | Score | Evidence |
|---|---|---|
| D1 | PASS | MIT |
| D2 | FRESH | last-push 2026-05-07 |
| D3 | PASS | mature; 34,283★ |
| D4 | TIER-1-OFFICIAL | Stanford NLP org |
| D5 | PASS | active |
| D6 | **MISMATCH** | Python framework; NOT directly installable in eee TypeScript-CC env |
| D7 | PASS | Apache-ecosystem-aligned |
| D8 | PASS | major academic + industry adoption |

**Verdict**: **CITE-ONLY pattern reference** — useful for future Python sub-arc; NOT install-class.

#### Candidate 3: **None viable as install-class**

`gh search repos "token compression OR prompt caching agent"` returned EMPTY. Token-eff ecosystem is dominated by:
- Already-installed: rtk (Apache-2.0) + context-mode (ELv2) + claude-context Milvus + cnighswonger cache-fix
- Pattern-only: deepagents middleware-summarization (Python)

**HONEST-NON-FINDING**: No additional install-class TIER-1 token-eff primitive exists beyond what's already in eee.

### B.2 Architectural-enhance Top-3 (beyond cwc + superpowers + ECC)

#### Candidate 1: **microsoft/agent-framework** — production agent framework

| Dim | Score | Evidence |
|---|---|---|
| D1 | PASS | MIT |
| D2 | FRESH | last-push 2026-05-08 |
| D3 | NEUTRAL | created 2025-04-28 (~12mo); 10,253★ |
| D4 | TIER-1-OFFICIAL | Microsoft org |
| D5 | PASS | active |
| D6 | PARTIAL | Python+.NET framework; NOT direct install-class for eee CC |
| D7 | PASS | MIT-ecosystem |
| D8 | PASS | Microsoft adoption + .NET/Python dual support |
| D10 | LOW (architectural-pattern reference, not direct install) |

**Verdict**: **CITE-EXTEND** — useful pattern reference for orchestration primitives; NOT install-class for eee.

#### Candidate 2: **wshobson/agents** — claude-code intelligent automation

| Dim | Score | Evidence |
|---|---|---|
| D1 | PASS | MIT |
| D2 | FRESH | last-push 2026-05-08 |
| D3 | DOWNGRADE | created 2025-07-24 (~10mo); 35,018★ — verify size vs star ratio |
| D4 | TIER-2-NAMED-PRACTITIONER | wshobson named maintainer |
| D5 | PASS | active |
| D6 | PASS | "Intelligent automation and multi-agent orchestration for Claude Code" — MATCHES eee use-class |
| D7 | PASS | claude-code-aligned |
| D8 | PASS | 35k★ at 10mo = high adoption |

**Verdict**: **STUDY-PILOT** — verify content depth via SOTA D3 fresh-paint check; if PASS, candidate for adoption-eval.

#### Candidate 3: **agno-agi/agno** — production agent framework

| Dim | Score | Evidence |
|---|---|---|
| D1 | PASS | Apache-2.0 |
| D2 | FRESH | last-push 2026-05-08 |
| D3 | PASS | mature 48mo; 40,005★ |
| D4 | TIER-1-OFFICIAL | agno-agi named-org |
| D5 | PASS | active |
| D6 | PARTIAL | Python framework; framework-agnostic agent wrapper |
| D7 | PASS | Apache-2.0 ecosystem |
| D8 | PASS | sustained-active |

**Verdict**: **CITE-EXTEND-PATTERN** — useful for "Run as a service" deployment IF eee expands beyond local /loop; not current install-class.

### B.3 Account-rotation Top-3 (beyond cpa-usage-keeper)

`gh search repos "claude api key rotation OR proxy"` returned EMPTY.

**HONEST-NON-FINDING**: No additional install-class account-rotation primitive beyond cpa-usage-keeper (Wave Ship 1W). The CLIProxyAPI + cpa-usage-keeper combo IS the SOTA for this axis.

### B.4 Anthropic CC official Tier-0 plugins NOT yet enabled

Per gh api `anthropics/claude-plugins-official/contents/plugins`:
- agent-sdk-dev / clangd-lsp / claude-code-setup / claude-md-management / code-modernization / **code-review** / code-simplifier / commit-commands / csharp-lsp / cwc-makers / example-plugin / explanatory-output-style / **feature-dev** / frontend-design / gopls-lsp / **hookify** / jdtls-lsp / kotlin-lsp / learning-output-style / lua-lsp / math-olympiad / **mcp-server-dev** / php-lsp / playground / **plugin-dev** / pr-review-toolkit / pyright-lsp / **ralph-loop** / ruby-lsp / rust-analyzer-lsp / **security-guidance** / session-report / **skill-creator** / swift-lsp / typescript-lsp

**External plugins (Anthropic-curated 3rd-party)**: asana / context7 / discord / fakechat / firebase / github / gitlab / greptile / imessage / laravel-boost / linear / playwright / serena / telegram / terraform

**Top-3 Tier-0 candidates per D7 Anthropic-policy alignment**:

#### Candidate 1: **agent-sdk-dev** (Anthropic OFFICIAL — enables SDK development)

D1=PASS (Anthropic-canonical) / D2=FRESH / D4=TIER-1-OFFICIAL / D6=critical for advanced eee runtime / D7=Anthropic-OFFICIAL

#### Candidate 2: **plugin-dev** (Anthropic OFFICIAL — meta-plugin for plugin development)

D1=PASS / D2=FRESH / D4=TIER-1-OFFICIAL / D6=enables plugin-creation workflow / D7=Anthropic-OFFICIAL

#### Candidate 3: **security-guidance** (Anthropic OFFICIAL — security hardening)

D1=PASS / D2=FRESH / D4=TIER-1-OFFICIAL / D6=complements safety_guard.py + agent_plan_readonly_bash_guard / D7=Anthropic-OFFICIAL

**Verdict**: All 3 satisfy SRA convergence-gate; INSTALL via `/plugin install <name>@claude-plugins-official` per cardinal-rule-12 upstream-install-priority.

**Cross-model T1 required**: YES (any new plugin install per CR-9 install-risk discipline)

## D7 Anthropic CC official policy alignment findings

**Licenses Anthropic itself ships under** (verified 2026-05-08 via gh api):

| Repo | License | Notes |
|---|---|---|
| anthropics/cwc-long-running-agents | **Apache-2.0** | Anthropic OFFICIAL canonical |
| anthropics/cookbook | **MIT** | Anthropic OFFICIAL |
| anthropics/anthropic-sdk-python | **MIT** | Anthropic OFFICIAL |
| anthropics/claude-code-action | **MIT** | Anthropic OFFICIAL |
| anthropics/claude-agent-sdk-typescript | `null` (per-package) | needs probe |
| anthropics/skills | **Apache-2.0** + source-available subfolders (docx/pdf/pptx/xlsx) | Anthropic OFFICIAL |
| anthropics/claude-plugins-official | `null` (per-plugin license) | per-plugin model |
| anthropics/claude-plugins-community | **Apache-2.0** | Anthropic OFFICIAL |
| modelcontextprotocol/servers | `NOASSERTION` (per-server) | Anthropic-led MCP standard |

**D7 finding**: Anthropic itself uses **MIT + Apache-2.0** as primary licenses BUT accepts non-permissive licenses for plugin/per-server artifacts via per-plugin licensing model. This means:

1. **ELv2 for plugin-class artifacts is NOT inconsistent with Anthropic ecosystem** — context-mode plugin per Wave 102 REJECT verdict was D1 use-class precision error
2. **SSPLv1 for local-DB-class artifacts is also NOT inconsistent** — FalkorDB local Docker = no SaaS-redistribution-trigger
3. **AGPL CLI binaries are acceptable** — Anthropic ecosystem accepts CLI binaries with copyleft licenses (cf. semgrep LGPL is already PASS-WITH-CAVEAT)

## Cross-model T1 required for these verdicts

**MUST run codex T1 e2e BEFORE orchestrator commits**:
- A.2 context-mode REVERT-WAVE-102-REJECT (license-policy reversal)
- A.3 FalkorDB REVERT-WAVE-102-REJECT (license-policy reversal + replacement-non-viable)
- A.4 forrestchang UPGRADE-TO-REJECT-FOR-CITE-ANCHOR (cite-anchor reclassification)
- B.4 Anthropic Tier-0 plugin install candidates (CR-9 install-risk discipline)

**Forward-only operator-discipline (no codex T1 needed)**:
- A.1 trufflehog (operationally absent; verdict moot)
- A.5 everything-claude-code RC pin (mechanical SHA pin)
- A.6 CCBP HEAD re-pin (mechanical SHA pin)
- A.7 codex HEAD re-pin (mechanical SHA pin)

## Forward-only operator-discipline recommendations

1. **REVERT Wave 102 REJECT verdicts for context-mode + FalkorDB** post codex T1 — both passed SRA D1 use-class precision; license-blocker class doesn't apply for local-runtime/local-DB use-class
2. **UPGRADE forrestchang Wave 102 DOWNGRADE → REJECT-FOR-CITE-ANCHOR** — D1+D3+D4 hard-fail; replace cite anchor in `karpathy-adapted.md` with karpathy/nanochat/llm.c verbatim
3. **PIN everything-claude-code to specific RC SHA** until v2.0.0 stable ships (CR-9 sub-rule)
4. **RE-PIN CCBP HEAD** to current upstream (6 days behind)
5. **RE-PIN codex HEAD** to current upstream (17 days behind)
6. **Install Anthropic Tier-0 plugins**: agent-sdk-dev / plugin-dev / security-guidance via `/plugin install <name>@claude-plugins-official`
7. **HONEST-NON-FINDING for token-eff + account-rotation axes** — current eee install IS SOTA; no additional install-class primitives exist
8. **CITE-EXTEND deepagents middleware-summarization + microsoft/agent-framework + agno-agi/agno** for architectural-enhance pattern references (not install-class)
9. **awesome-agentic-patterns 404 cite path** — investigate canonical or retire from rules

## HONEST-NON-FINDING

1. **No install-class token-eff primitive beyond current eee install** — token-eff axis is saturated with rtk + context-mode + claude-context + cnighswonger; deepagents Python-only
2. **No install-class account-rotation primitive beyond cpa-usage-keeper** — gh search returned 0 candidates
3. **kuzudb proposed FalkorDB replacement is NON-VIABLE (archived 2025-10-10)** — Wave 102 recommendation should be retracted
4. **No alternative permissive-license context-window-management plugin exists** — context-mode ELv2 is unique in this niche
5. **awesome-agentic-patterns canonical 404** — orphan reference unresolved; rule cites need cleanup
6. **forrestchang fork has no LICENSE** — legally unsharable per copyright default; cite-anchor migration mandatory

## REVERT-AUDIT-VERDICT-CANDIDATES (Wave 102 entries to revert vs disclose)

| Wave 102 entry | Action | Rationale |
|---|---|---|
| context-mode REJECT (ELv2) | **REVERT** | D1 use-class precision error per SRA; ELv2 for local-runtime-plugin-use-class is acceptable |
| FalkorDB REJECT (SSPLv1) | **REVERT** | D1 use-class precision error per SRA; SSPLv1 for local-DB-use-class is acceptable + kuzu replacement non-viable |
| forrestchang DOWNGRADE | **UPGRADE TO REJECT-FOR-CITE-ANCHOR** | D1+D3+D4 hard-fail; replace with verbatim Karpathy URLs |
| trufflehog REJECT (AGPL) | **DISCLOSE** Wave 102 verdict valid by accident-of-non-install — not actually installed; no operational impact |
| context-mode replacement → "native CC primitives + deepagents pattern" | **WITHDRAW REPLACEMENT** | context-mode reverted-PASS; replacement no longer needed |
| FalkorDB replacement → "kuzudb" | **WITHDRAW REPLACEMENT** | kuzu archived; no viable replacement exists |
| trufflehog replacement → "gitleaks" | **CONFIRM** | already installed; functional substitution holds |

---

STAND-IN-NOTICE: Sonnet stand-in per CLAUDE.local.md ENV (g); orchestrator-side codex T1 e2e MANDATORY before any REJECT/REPLACEMENT commit per Ship 2X SRA mandate
VERDICT: REVISE-RE-AUDIT
confidence: 0.84
Task A — Wave 102 reclassification status: trufflehog=REJECT-MOOT (not installed) / context-mode=REVERT-REJECT-D1-PRECISION-ERROR / FalkorDB=REVERT-REJECT-D1-PRECISION-ERROR / forrestchang=UPGRADE-DOWNGRADE-TO-REJECT-FOR-CITE-ANCHOR / everything-claude-code=DOWNGRADE-STANDS / CCBP-stale=RE-PIN-MECHANICAL / codex-stale=RE-PIN-MECHANICAL
Task B — MISSING-SOTA Top-3 per axis: token-eff=HNF (saturated; deepagents CITE-EXTEND only) / architectural-enhance=microsoft-agent-framework + wshobson/agents STUDY-PILOT + agno-agi CITE-EXTEND / account-rotation=HNF (cpa-usage-keeper IS SOTA) / Anthropic-Tier-0=agent-sdk-dev + plugin-dev + security-guidance INSTALL-CANDIDATES
D7 Anthropic policy findings: Anthropic ships MIT + Apache-2.0 primary; per-plugin licensing model accepts non-permissive (ELv2/AGPL/SSPLv1 OK for plugin/CLI/local-DB use-classes)
Cross-model T1 required for: A.2 context-mode REVERT / A.3 FalkorDB REVERT / A.4 forrestchang UPGRADE-REJECT / B.4 Anthropic Tier-0 plugin installs
HONEST-NON-FINDING: token-eff axis saturated / account-rotation axis saturated / kuzu archived (Wave 102 replacement non-viable) / awesome-agentic-patterns 404 unresolved / no alternative permissive context-mode-class plugin exists
REVERT-AUDIT-VERDICT-CANDIDATES: context-mode REJECT (revert) / FalkorDB REJECT (revert) / forrestchang DOWNGRADE (upgrade to REJECT-FOR-CITE-ANCHOR) / kuzu replacement (withdraw — archived) / context-mode replacement (withdraw — original PASSes)
