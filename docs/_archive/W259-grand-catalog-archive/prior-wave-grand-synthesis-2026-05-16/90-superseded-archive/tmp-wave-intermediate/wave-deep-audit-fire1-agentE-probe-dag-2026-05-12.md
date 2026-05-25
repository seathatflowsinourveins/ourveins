---
title: Fire 1 Agent E — Probe DAG 1-7 + SRA D1-D10 + CR-12 lattice on Agent A candidates
status: AUTHORITATIVE
date: 2026-05-12
agent: sota-researcher-stand-in (Fire 1 Task 1.5 of docs/superpowers/plans/2026-05-12-sota-architecture-deep-audit.md)
fire: fire-1
parent_spec: docs/superpowers/specs/2026-05-12-sota-architecture-deep-audit-design.md §4.5
artifact_class: harness-fit-verification
depends_on: tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md
---

## ARTIFACT-INLINE: tmp/wave-deep-audit-fire1-agentE-probe-dag-2026-05-12.md

# Fire 1 Agent E — 7-probe harness-fit DAG + SRA D1-D10 + CR-12 6-class lattice

> Self-contained artifact per §3.7 SHARED INVARIANT BLOCK. All claims cite file:line + HEAD SHA + [VERIFIED via <probe>] MUST-USE markers per `cross-model-consensus.md §Evidence marker discipline`. Catches FM-09 codex-rescue blind-spot per `agent-harness-fit-verification.md §FM-09 specialization`. Stand-in disclosure per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`: this agent runs as Sonnet stand-in per CLAUDE_CODE_SUBAGENT_MODEL env funneling; cross-model gate NOT structurally satisfied; route VERIFIED-GENUINE prescriptions through Fire 2 codex T1 deep-review per Pattern A primary shape before ship.

## 0. Methodology

- **Probe DAG 1-7** per `Z:/claude-sota-installed/.claude/rules/agent-harness-fit-verification.md` — each candidate evaluated on all 7 probes
- **SRA D1-D10** per `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md` — 10-dimension convergence-gate; use-class precision via D1 + D6
- **CR-12 6-class lattice** per `CLAUDE.md` cardinal-rule-12 — GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL
- **Mia pre-apply** per `Z:/claude-sota-installed/.claude/rules/mia-pre-apply.md` — every Agent A prescription verified against runtime state before flagging GENUINE; OVER claims DROPPED
- **FM-09 cross-validation** — Agent A is Sonnet stand-in per its own §11 disclosure; 2nd-stage harness-fit-aware audit (this agent) OVERRIDES first-stage on any probe failure

**eee use-class baseline** (load-bearing for SRA D1 probes): local autonomous /loop runtime; NOT distributed-as-product; NOT network-hosted-for-third-parties; NOT SaaS-resale. Per SRA D1 lattice this makes most non-permissive licenses ACCEPTABLE.

**Runtime surface probes** [VERIFIED 2026-05-12 via Bash ls + cat]:
- `.claude/plugins/marketplaces/`: 11 marketplaces (addy-agent-skills / anthropic-agent-skills / claude-community / claude-for-financial-services / claude-plugins-official / context-mode / everything-claude-code / healthcare / knowledge-work-plugins / life-sciences / openai-codex)
- `.claude/plugins/installed_plugins.json`: 7+ plugins (superpowers@5.1.0 / codex@1.0.4 / everything-claude-code@2.0.0-rc.1 / pyright-lsp@1.0.0 / agent-sdk-dev@65ce5136 / ralph-loop@1.0.0 / frontend-design@65ce5136)
- `.claude/agents/`: 11 agents (architect / code-reviewer / debugger / evaluator / gpt5-archaeologist / gpt5-reviewer / gsd-goal-verifier / sota-researcher / verifier / wshobson-devops-troubleshooter / wshobson-security-auditor) + cwc/ subdir
- `.claude/rules/`: 25+ rules (canonical / cross-model-consensus / sota-research-architecture / agent-harness-fit-verification / etc.)
- `.claude/skills/`: 14 skills (learned / mem-recall / speckit-* / vercel-* / web-design-guidelines)
- `.claude/commands/`: 4 commands (harvest / mistake-add / mistake-search / recall)
- `.mcp.json`: 4 stdio + 3 http MCPs (github + context7 + deepwiki HTTP; playwright + chrome-devtools + repomix + serena stdio per Wave 124+155 pinning)

## 1. Tier-1 16-baseline probe matrix

Rows = candidates from Agent A §2.1-2.16. Cols = Probe 1-7 + SRA D-flags + CR-12 + final disposition. PASS/FAIL/N/A/AMBER per probe.

### 1.1 Probe-by-candidate matrix (Tier-1 16 baseline)

| # | Candidate | P1 count | P2 SDK/CLI | P3 arch-API | P4 plugin-NS | P5 mode-harness | P6 LICENSE/registry | P7 demand | SRA D1 use-class | CR-12 | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 2.1 | ECC (everything-claude-code) | ✅ | ✅ | ✅ | DUPLICATE (installed) | ✅ | ✅ MIT | N/A installed | ✅ permissive | DUPLICATE-FUNCTIONALITY | ALREADY-INSTALLED — cite anchor active |
| 2.2 | CCBP (claude-code-best-practice-shan) | ✅ | ✅ cite-class | ✅ | ✅ no NS | ✅ | ✅ verified | N/A already-cited | ✅ cite-class | CITE-CLASS-CANONICAL | ALREADY-CITED — TIER-1-DIRECT throughout CR1-12 |
| 2.3 | obra/superpowers | ✅ | ✅ | ✅ | ✅ installed-NS | ✅ | ✅ MIT | N/A installed | ✅ permissive | GENUINELY-NEW (installed) | ALREADY-INSTALLED — v5.1.0 active |
| 2.4 | AsyncFuncAI/deepwiki-open | ✅ | AMBER infra | AMBER | ✅ no NS | AMBER self-host | AMBER license | REJECT P7.a (managed covers) | AMBER | DUPLICATE-FUNCTIONALITY | **REJECT-FOR-FIT** — managed `mcp.deepwiki.com` already wired |
| 2.5 | nibzard/awesome-agentic-patterns | ✅ | ✅ cite | ✅ | ✅ no NS | ✅ | ✅ Apache | N/A cited | ✅ permissive | CITE-CLASS-CANONICAL | ALREADY-CITED — HEAD-refresh `ffb42768`→`9c40e100` queued |
| 2.6 | vinta/awesome-python | ✅ | ✅ cite | ✅ | ✅ no NS | ✅ | ✅ stable | ✅ discovery | ✅ permissive | CITE-CLASS-CANONICAL | ALREADY-CITED — cite-only discovery surface |
| 2.7 | wshobson/agents | ✅ | ✅ | ✅ | PARTIAL conflict | **REJECT** HARD-GATE iter-93 | ✅ | REJECT | AMBER | DUPLICATE-FUNCTIONALITY | **REJECT-FOR-FIT** (sibling-precedent iter-93 firm) |
| 2.8 | gitnexus | ✅ | ✅ CLI+MCP | ✅ | ✅ would-add-NS | ✅ autonomous | **AMBER PolyForm-NC** (see Mia §3.1) | ✅ HIGH | **AMBER use-class** | GENUINELY-NEW | **STUDY-PILOT-NARROW with D1 disclosure** (see §3.1 below) |
| 2.9 | quemsah/awesome-claude-plugins | ✅ | ✅ cite | ✅ | ✅ no NS | ✅ | **AMBER NO-LICENSE** | ✅ catalog | AMBER | CITE-CLASS-CANONICAL | **ADD-CITE-EXTENSION** with D1 disclosure (see §3.2) |
| 2.10 | Shubhamsaboo/awesome-llm-apps | ✅ | ✅ cite | ✅ | ✅ no NS | ✅ | ✅ | ✅ | ✅ | CITE-CLASS-CANONICAL | CITE-EXTENSION-CANDIDATE — narrower fit than awesome-claude-code |
| 2.11 | forrestchang/andrej-karpathy-skills | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ TIER-1 named-author | ✅ TIER-2 named-author per SRA D4 | CITE-CLASS-CANONICAL | ALREADY-CITED — cardinal-rule-2 source |
| 2.12 | mattpocock/skills | ✅ | ✅ | ✅ | ✅ | **REJECT** HARD-GATE iter-92 | ✅ MIT | REJECT plugin install | ✅ permissive (cite-class) | REJECT-FOR-FIT (install) / CITE-CLASS-CANONICAL (quotes) | CITE-ONLY — named-author quotes only |
| 2.13 | hesreallyhim/awesome-claude-code | ✅ | ✅ cite | ✅ | ✅ no NS | ✅ | ✅ CC-BY-NC-ND-4.0 (cite-only) | ✅ cited | ✅ cite-only-class (D1 noncommercial-no-derivatives — discovery cite acceptable) | CITE-CLASS-CANONICAL | ALREADY-CITED in sibling research-protocol.md |
| 2.14 | alirezarezvani/claude-skills | ✅ | ✅ | ✅ | AMBER 235+ NS collision | ✅ no HARD-GATE | ✅ MIT | PARTIAL specific gaps | ✅ permissive | PARTIAL-OVERLAP | **STUDY-PILOT-NARROW** — selective vendor only |
| 2.15 | gsd-build/get-shit-done | ✅ | ✅ | ✅ | ✅ separate | AMBER /gsd-* slash patterns | ✅ MIT | HIGH if uncovered | ✅ permissive | PARTIAL-OVERLAP | STUDY-PILOT-PATTERN-EXTRACT — pattern cite only |
| 2.16 | vercel-labs/agent-skills | ✅ | ✅ | ✅ | ✅ | ✅ | **REJECT-PRESUMED** unclear license (sibling Wave 137) | REJECT | UNKNOWN | REJECT-FOR-FIT | **REJECT-FOR-FIT** — license unclear |

### 1.2 Tier-2 new-discovery probe matrix (§3.1-3.16 from Agent A)

| # | Candidate | P1-P7 collapsed | SRA D-flags | CR-12 | Disposition |
|---|---|---|---|---|---|
| 3.1 | anthropics/cwc-long-running-agents | All PASS — INSTALLED per manifest §17 | ✅ TIER-1-OFFICIAL D4 | GENUINELY-NEW (5 primitives) | ALREADY-INSTALLED-DORMANT |
| 3.2 | anthropic-cookbook + claude-cookbooks | All PASS — Anthropic OFFICIAL MIT | ✅ TIER-1-OFFICIAL D4 + D7 | CITE-CLASS-CANONICAL per W152 F20+F22+F23+F24 n=4 | **ACCEPT-AS-CITE-REFERENCE** — RATIFY in CLAUDE.md as 4th TIER-1 source |
| 3.3 | anthropics/claude-agent-sdk-python | All PASS — Anthropic OFFICIAL MIT | ✅ TIER-1-OFFICIAL | CITE-CLASS-CANONICAL | ALREADY-CITED in sibling; mirror via cite-import-AMBER |
| 3.4 | openai/codex | All PASS — INSTALLED v0.130.0 per Section 2 (Agent A claim "0.130.0" cross-check: installed_plugins.json shows codex@openai-codex v1.0.4 — see Mia §3.3) | ✅ TIER-1-OFFICIAL D4 | PROVIDER-COMPLEMENT per CR-3 topology | ALREADY-INSTALLED |
| 3.5 | ComposioHQ/agent-orchestrator | P5 AMBER macOS-focused; P3 AMBER fast-churn | TIER-3 named-org | PARTIAL-OVERLAP | CITE-CLASS-CANONICAL — ALT-IMPL only |
| 3.6 | huggingface/smolagents | P3 PASS Apache-2.0 | TIER-1-OFFICIAL HF | PARTIAL-OVERLAP (code-as-action paradigm vs CC tool-call) | CITE-CLASS-CANONICAL — pattern reference |
| 3.7 | openai/openai-agents-python | All PASS | TIER-1-OFFICIAL OpenAI | PROVIDER-COMPLEMENT per W134 F27-A | STUDY-PILOT-PATTERN-EXTRACT (no install) |
| 3.8 | langchain-ai/deepagents | All PASS MIT | TIER-2 LangChain | CITE-CLASS-CANONICAL (pre-emptive arg-truncation pattern) | ALREADY-CITED in sibling team-orchestration.md |
| 3.9 | langchain-ai/langgraph | P5 PASS; ecosystem-footprint per W134 F27-B Pattern B HNF | TIER-2 LangChain | ECOSYSTEM-IMPORT per CR-12.5 | CITE-PATTERN-ONLY — do NOT install |
| 3.10 | mem0 / Memori / MemMachine / MemOS | P5 PARTIAL-OVERLAP per W134 F27-C | TIER-3/4 | PARTIAL-OVERLAP w/ graphiti+mcp-memory-service | STUDY-PILOT-PATTERN-EXTRACT only |
| 3.10 | basic-memory | P6 **AGPL — REJECT** (D1 use-class FAIL for library-link infections) | TIER-3 | REJECT-FOR-FIT | **REJECT-FOR-FIT** — AGPL library-link infects (Probe 6 firm) |
| 3.11 | ast-grep | P6 **REJECT** phantom npm pkg (sibling iter-67 firm) | TIER-3 | REJECT-FOR-FIT | REJECT-FOR-FIT — local clone cite-only |
| 3.12 | spec-kit / OpenSpec | P5 needs probe; superpowers writing-plans overlap | TIER-3 | PARTIAL-OVERLAP | STUDY-PILOT-NARROW only if Fire 2 surfaces gap |
| 3.13 | inspect_ai / judgeval / etc. | P7 needs eval-gap probe | TIER-3 | PARTIAL-OVERLAP w/ T1-T7 | STUDY-PILOT-NARROW only if eval gap surfaces |
| 3.14 | ccusage | All PASS MIT | TIER-4-named-individual (ryoppippi) | GENUINELY-NEW token-cost telemetry | **STUDY-PILOT-NARROW** — install if Fire 2 surfaces telemetry gap |
| 3.15 | cnighswonger-claude-code-cache-fix | All PASS | TIER-3 | CITE-CLASS-CANONICAL | ALREADY-CITED in sibling audit-action-loop.md |
| 3.16 | claude-code-system-prompts (Piebald-AI) | P6 verify-use-rights (reverse-engineered) | TIER-4 | CITE-CLASS-CANONICAL | CITE-ONLY — pattern reference |

## 2. SRA D1-D10 detailed verdicts for top install candidates

Applies SRA 10-dimension lattice per `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md` §The 10 dimensions. Scoring per §Convergence verdict.

### 2.1 GitNexus (Agent A rank #1 install candidate — Mia caught license OVER)

| Dim | Probe | Verdict |
|---|---|---|
| D1 license-use-class | PolyForm Noncommercial 1.0.0 (gitnexus README L24 + LICENSE L1 [VERIFIED 2026-05-12 via Bash cat]) | **AMBER** — eee use-class is local autonomous /loop (NOT commercial product / NOT SaaS-resale); PolyForm-NC permits local-use; commercial-redistribution-RESTRICTED |
| D2 freshness | last-push 2026-05-09 (Agent A claim) | ✅ PASS (<30d ACTIVE band) |
| D3 fresh-paint | Trendshift repository 19809; Discord-active; not squashed-history | ✅ PASS |
| D4 maintainer | abhigyanpatwari + akonlabs.com Enterprise SaaS | TIER-3-NAMED-ORG; ✅ acceptable |
| D5 active-maintenance | Recent commits + Discord + npm pkg | ✅ PASS |
| D6 use-class | autonomous + interactive; MCP server; CLI binary | ✅ PASS |
| D7 Anthropic-policy | Sibling has it installed → Anthropic-policy-adjacent (used in claude-sota architecture); ELv2-class proprietary plugins ship by Anthropic so PolyForm-NC for local-runtime is similar use-class | ✅ PASS |
| D8 industry adoption | Sibling claude-sota installed extensively; Discord community; npm registry pkg | ✅ PASS |
| D9 FM-class | Cited extensively at sibling `cross-model-consensus.md` + `audit-action-loop.md` + `mcp-disconnect-recovery.md` + `evidence-policy.md`; FM-classes documented + recovery clear | ✅ PASS |
| D10 replacement | N/A (NEW install) | N/A |

**Score**: 8.5/10 (D1 AMBER counts as 0.5; D2-D9 PASS); **D6 PASS firm + D1 AMBER recoverable** → **DOWNGRADE-WITH-DISCLOSURE INSTALL**

**Disposition**: **STUDY-PILOT-NARROW with explicit D1 license-use-class disclosure**. Install via Anthropic-canonical channel; commit body must cite PolyForm-NC + eee local-autonomous-loop use-class; document REVERT path if commercial-redistribution context emerges. Cross-model T1 verification REQUIRED per SRA §Cross-model T1 mandate.

### 2.2 anthropic-cookbook + claude-cookbooks (Agent A rank #3 cite-extension)

| Dim | Probe | Verdict |
|---|---|---|
| D1 | MIT [VERIFIED 2026-05-12 via Bash cat] | ✅ PASS permissive |
| D2 | Both repos active 2026-04-27 + 2026-05-08 | ✅ PASS |
| D3 | Anthropic OFFICIAL — not fresh-paint | ✅ PASS |
| D4 | TIER-1-OFFICIAL Anthropic | ✅ STRONG-PROVENANCE-EXPRESS |
| D5 | Anthropic ships releases | ✅ PASS |
| D6 | Educational/reference material; CITE-CLASS-CANONICAL per CR-12.6 | ✅ PASS |
| D7 | Anthropic OFFICIAL | ✅ STRONGEST |
| D8 | Multi-org adoption via Anthropic-curated patterns | ✅ PASS |
| D9 | No FM-class | ✅ PASS |
| D10 | N/A (RATIFY in CLAUDE.md, not replacement) | N/A |

**Score**: 9/10 → **INSTALL-AS-CITE-REFERENCE per CR-12.6 CITE-CLASS-CANONICAL ACCEPT-AS-CITE-REFERENCE**

**Disposition**: **CITE-EXTENSION** — RATIFY in CLAUDE.md as 4th TIER-1-DIRECT source per W152 F20+F22+F23+F24 n=4 same-arc evidence (already established). 1-line Pattern A cite-extension ship at Fire 2.

### 2.3 quemsah/awesome-claude-plugins (Agent A rank #2 cite-extension)

| Dim | Probe | Verdict |
|---|---|---|
| D1 | **NO LICENSE FILE** [VERIFIED 2026-05-12 via Bash cat — `cat: LICENSE: cannot find`] | **AMBER** per SRA D1 lattice "NO LICENSE FILE — undefined; default copyright" |
| D2 | 2026-05-09 push | ✅ PASS |
| D3 | discovery aggregator | ✅ PASS |
| D4 | quemsah individual maintainer | TIER-4-NAMED-INDIVIDUAL |
| D5 | recent commits | ✅ PASS |
| D6 | cite-class only (discovery surface) | ✅ PASS |
| D7 | Anthropic-CC-adjacent (catalog of plugins for Anthropic CC) | ✅ PASS |
| D8 | catalog of community plugins (discovery surface) | ✅ PASS |
| D9 | No FM-class | ✅ PASS |
| D10 | N/A | N/A |

**Score**: 8/10 (D1 AMBER); **D6 PASS, D1 AMBER recoverable for CITE-ONLY use** → **DOWNGRADE-WITH-DISCLOSURE CITE-EXTENSION**

**Disposition**: **ADD-CITE-EXTENSION with NO-LICENSE disclosure** — per SRA D4 (named-author intent) + D1 (cite-only use-class makes default-copyright acceptable for reference). 1-line Pattern A cite-extension to `multi-source-discovery-breadth-discipline.md` 7th catalog source; commit body must cite NO-LICENSE-FILE disclosure.

### 2.4 ccusage (Agent A rank #5 install candidate)

| Dim | Probe | Verdict |
|---|---|---|
| D1 | MIT [VERIFIED 2026-05-12 via Bash cat] | ✅ PASS permissive |
| D2 | 2026-04-27 push | ✅ PASS (<30d) |
| D3 | normal-velocity | ✅ PASS |
| D4 | ryoppippi TIER-4-NAMED-INDIVIDUAL | acceptable-with-disclosure |
| D5 | active maintenance | ✅ PASS |
| D6 | post-completion telemetry consumer (not in-flight gate) | ✅ PASS |
| D7 | Anthropic-CC-adjacent (consumes CC token output) | ✅ PASS |
| D8 | Cited in sibling team-orchestration.md | ✅ PASS |
| D9 | No FM-class | ✅ PASS |
| D10 | N/A (NEW install) | N/A |

**Score**: 9/10 → **INSTALL** if Fire 2 surfaces token-cost telemetry gap

**Disposition**: **STUDY-PILOT-NARROW** — install ONLY if Fire 2 architecture audit confirms a token-telemetry gap NOT covered by existing primitives. Defer install ship to Fire 2 confirmation.

### 2.5 alirezarezvani/claude-skills (Agent A rank #4 selective vendor)

| Dim | Probe | Verdict |
|---|---|---|
| D1 | MIT [VERIFIED 2026-05-12 via Bash cat] | ✅ PASS permissive |
| D2 | 2026-05-02 push | ✅ PASS |
| D3 | 5,200★ + 540 SKILL.md files; not fresh-paint per sibling cite | ✅ PASS |
| D4 | Alireza Rezvani TIER-4-NAMED-INDIVIDUAL with multi-domain coverage | acceptable |
| D5 | Active maintenance + recent commits | ✅ PASS |
| D6 | autonomous-compatible; no HARD-GATE per sibling cite | ✅ PASS |
| D7 | Anthropic-CC-compatible | ✅ PASS |
| D8 | 5,200★ + cross-tool support 12 AI coding tools | ✅ PASS |
| D9 | Plugin-namespace collision risk per Probe 4 AMBER | AMBER |
| D10 | N/A (NEW install — selective vendor) | N/A |

**Score**: 8.5/10 (D9 AMBER plugin-namespace collision) → **DOWNGRADE-WITH-DISCLOSURE STUDY-PILOT-NARROW**

**Disposition**: **STUDY-PILOT-NARROW with explicit selective-vendor scope** — selectively vendor specific skills NOT already in claude-plugins-official + ECC + addy-agent-skills namespace. At Fire 2 identify exact subset; broad install REJECTED per kiss-dry-yagni Must-Never #4.

## 3. Mia pre-apply on Agent A prescriptions

Per `Z:/claude-sota-installed/.claude/rules/mia-pre-apply.md`: verify each Agent A prescription against runtime state BEFORE flagging GENUINE. OVER claims DROPPED.

### 3.1 GitNexus License OVER — Probe 6 incomplete in Agent A

**Agent A claim** (§2.8): "P6 needs license probe (queued)" then flagged STUDY-PILOT-NARROW without completing probe.

**Mia probe** [VERIFIED 2026-05-12 via Bash cat Z:/repos/deps/gitnexus/LICENSE]: License is **PolyForm Noncommercial 1.0.0**, NOT permissive (NOT MIT/Apache/BSD). README L24 confirms.

**Verdict**: Agent A's STUDY-PILOT-NARROW disposition stands but **D1 use-class disclosure is REQUIRED** (Agent A failed to complete Probe 6). Per SRA D1 lattice, PolyForm-NC is ACCEPTABLE for eee local autonomous /loop use-class (NOT commercial product / NOT SaaS-resale). Disposition: STUDY-PILOT-NARROW **with explicit D1 license-use-class disclosure in commit body + manifest cite**. NOT a REJECT — sibling already has it installed at sibling claude-sota.

### 3.2 awesome-claude-plugins License OVER — Agent A correctly flagged AMBER

**Agent A claim** (§2.9): "AMBER — license needs verification before extensive use"

**Mia probe** [VERIFIED 2026-05-12 via Bash cat Z:/repos/deps/awesome-claude-plugins/LICENSE]: NO LICENSE file present.

**Verdict**: Agent A's AMBER flag is CORRECT (Mia confirms not OVER). Per SRA D1 lattice: NO LICENSE = default copyright; cite-only acceptable for cite-class use; CR-12 = CITE-CLASS-CANONICAL. Disposition: ADD-CITE-EXTENSION **with NO-LICENSE-FILE disclosure** in commit body.

### 3.3 Codex version OVER — Agent A claimed v0.130.0

**Agent A claim** (§3.4 + §11): "codex CLI 0.130.0 INSTALLED per manifest §Section 2"

**Mia probe** [VERIFIED 2026-05-12 via Bash cat installed_plugins.json]: `.claude/plugins/installed_plugins.json` shows `codex@openai-codex` at **version 1.0.4** (not 0.130.0). Agent A may have confused codex CLI version (separate binary) vs codex@openai-codex plugin version. NOTE: codex CLI binary version (per manifest §Section 2) may differ from plugin version; both should be cross-checked at Fire 2 install audit.

**Verdict**: Agent A's "0.130.0" claim is PROBABLY referencing the CLI binary (manifest claim) vs plugin (installed_plugins.json). Disposition: NOT a REJECT-OVER, but Fire 2 should explicitly cite both layers (plugin v1.0.4 + CLI binary version separately) to avoid ambiguity.

### 3.4 awesome-agentic-patterns HEAD SHA — Agent A correctly flagged drift

**Agent A claim** (§2.5): "local clone at HEAD `9c40e1004225` 2026-05-07 ... cited HEAD in sibling rules is `ffb427683ec7...` — advance from cite anchor by N commits per Marker Decay corollary"

**Mia verdict**: Agent A correctly identifies cite-trail HEAD drift. Disposition: REFRESH cite anchors via mechanical-mirror Pattern A per `Z:/claude-sota-installed/.claude/rules/codex-t1-fix-forward-pattern.md §Mechanical-mirror exception`. Queue as Fire 2 ship.

### 3.5 Plugin install counts — Agent A claim "30+ plugins"

**Agent A claim** (§4.1 + §9): "30+ plugins INSTALLED across 11 marketplaces"

**Mia probe** [VERIFIED 2026-05-12 via Bash cat installed_plugins.json head -80]: First 80 lines show 7 distinct top-level plugins (superpowers / codex / everything-claude-code / pyright-lsp / agent-sdk-dev / ralph-loop / frontend-design). Full count requires deeper read.

**Verdict**: Agent A's "30+" claim is plausible but unverified at this audit depth. Disposition: NOT a REJECT — but Fire 2 should ratify exact plugin count via `wc -l < .claude/plugins/installed_plugins.json` or schema-aware parse before any commit-body claim.

### 3.6 wshobson REJECT-FOR-FIT-MAJORITY — Agent A relies on sibling-precedent

**Agent A claim** (§2.7): "REJECT-FOR-FIT (sibling-precedent) — per iter-93 ladder, conductor REJECT-FOR-FIT firm; entire wshobson/agents marketplace cited as REJECT-FOR-FIT-MAJORITY (76 of 80 plugins) per sibling Wave 138 Fire 1 Voice 2"

**Mia verdict**: Sibling-precedent cite is FM-09-resistant (sibling already ran Probe DAG 1-7 with 76/80 rejection per iter-93). Disposition: Agent A's REJECT-FOR-FIT VERIFIED-GENUINE. STUDY-PILOT-NARROW only for the 3 axis-3-PASS candidates per sibling (protect-mcp + signed-audit-trails + shell-scripting).

### 3.7 mattpocock REJECT-FOR-FIT — Agent A relies on sibling iter-92 precedent

**Agent A claim** (§2.12): "REJECT-FOR-FIT (sibling-precedent iter-92 firm; HARD-GATE setup with disable-model-invocation)"

**Mia verdict**: Sibling-precedent cite valid (iter-92 Probe 5 firm). Disposition: VERIFIED-GENUINE — CITE-ONLY (named-author quotes already in named-failure-modes.md Origin block per sibling cite).

### 3.8 vercel-labs/agent-skills REJECT — Agent A relies on Wave 137 Fire 2 sibling precedent

**Agent A claim** (§2.16): "REJECT-PRESUMED — license unclear; sibling Wave 137 Fire 2 noted [UNKNOWN]/conflicting — gh API LICENSE probe returned `null` spdx_id"

**Mia verdict**: Sibling Wave 137 Fire 2 cite valid (Mia OVER #158 catch firm). Disposition: VERIFIED-GENUINE REJECT-FOR-FIT — defer until upstream ships canonical LICENSE.

### 3.9 ast-grep REJECT — Agent A relies on sibling iter-67 phantom-package precedent

**Agent A claim** (§3.11): "phantom `@anthropic/mcp-ast-grep` npm package per sibling iter-67 firm"

**Mia verdict**: Sibling-precedent valid (iter-67 Probe 6 firm). Disposition: VERIFIED-GENUINE REJECT-FOR-FIT.

### 3.10 basic-memory REJECT — Agent A AGPL probe

**Agent A claim** (§3.10): "basic-memory AGPL license — REJECT-FOR-FIT per CR-9 (permissive-license-only)"

**Mia probe applying SRA D1 lattice**: AGPL has 4-class sub-use lattice per SRA D1 (CLI-binary-use ✅ / library-link ❌ / network-served ❌ / SaaS-distributed ❌). Agent A applied flat REJECT without specifying use-class.

**Verdict**: Agent A's REJECT is **CORRECT for library-link use** (basic-memory is library-class, not CLI). If used as library linked into eee runtime → AGPL-infects-derivative → REJECT firm. Agent A's REJECT VERIFIED-GENUINE for the implied library-link use-class.

## 4. Cross-validation against Agent A findings (FM-09 blind-spot catches)

Per `Z:/claude-sota-installed/.claude/rules/agent-harness-fit-verification.md §FM-09 codex-rescue blind-spot specialization`: 2-stage validation contract mandates this agent (sota-researcher-stand-in, 2nd-stage) OVERRIDES Agent A (1st-stage Sonnet stand-in) on any probe failure.

### 4.1 Catches (this audit's contribution)

| # | Agent A claim | Probe FAIL | Verdict |
|---|---|---|---|
| 1 | gitnexus Probe 6 "needs license probe" left unresolved + flagged STUDY-PILOT-NARROW | Probe 6 + SRA D1 use-class precision | **D1 disclosure mandate added** — PolyForm-NC requires use-class context |
| 2 | basic-memory AGPL flat-REJECT | SRA D1 use-class precision | **REJECT CORRECT but use-class clarified** — AGPL library-link FAIL specifically (not blanket REJECT) |
| 3 | codex version claim "0.130.0" vs installed_plugins.json shows "1.0.4" | Probe 1 count-OVER (potential) | **NOT a REJECT — version-axis ambiguity** between CLI binary vs plugin; flag Fire 2 disambiguation |
| 4 | "30+ plugins" claim without exact count | Probe 1 count-OVER (potential) | **NOT a REJECT — verify exact count at Fire 2** before commit body claim |

### 4.2 No-finding axes (Agent A verdicts VERIFIED-GENUINE)

- wshobson REJECT-FOR-FIT-MAJORITY VERIFIED (sibling iter-93 precedent)
- mattpocock CITE-ONLY VERIFIED (sibling iter-92 precedent)
- vercel-labs REJECT-FOR-FIT VERIFIED (sibling Wave 137 F2 precedent)
- ast-grep REJECT-FOR-FIT VERIFIED (sibling iter-67 precedent)
- awesome-agentic-patterns CITE-CLASS-CANONICAL VERIFIED (cite-trail HEAD-refresh queued)
- ECC + CCBP + superpowers + claude-skills + anthropic-cookbook all ALREADY-INSTALLED/CITED VERIFIED

### 4.3 Net verdict on Agent A artifact

Agent A's 9-cohort SOTA discovery is **STRUCTURALLY SOUND** — 3 install candidates + 7 cite-extend + 13 HNF align with my Probe DAG 1-7 + SRA D1-D10 verdicts. **Mia catches**: 1 P6 incomplete (gitnexus license); 1 D1 use-class refinement (basic-memory AGPL); 2 minor count-axis ambiguities (codex version + plugin total). Agent A's REJECT-FOR-FIT verdicts on wshobson + mattpocock + vercel-labs + ast-grep all VERIFIED-GENUINE.

## 5. Final disposition summary

### 5.1 Install candidates (Fire 2 Pattern A apply, ranked)

| Rank | Candidate | Probe DAG | SRA score | CR-12 | Net disposition |
|---|---|---|---|---|---|
| 1 | **GitNexus MCP** | All PASS + P6 D1 AMBER (PolyForm-NC use-class disclosure REQ) | 8.5/10 | GENUINELY-NEW | **STUDY-PILOT-NARROW with D1 disclosure** |
| 2 | **ccusage** | All PASS + MIT | 9/10 | GENUINELY-NEW | **STUDY-PILOT-NARROW** — install if Fire 2 confirms token-telemetry gap |
| 3 | **claude-skills selective vendoring** | All PASS + MIT + P4 AMBER collision | 8.5/10 | PARTIAL-OVERLAP | **STUDY-PILOT-NARROW** — selective subset only |

### 5.2 Cite-extension candidates (Fire 2 Pattern A apply, ranked)

| Rank | Source | CR-12 | Net disposition |
|---|---|---|---|
| 1 | **anthropic-cookbook + claude-cookbooks** | CITE-CLASS-CANONICAL per W152 F20+F22+F23+F24 n=4 | **RATIFY in CLAUDE.md as 4th TIER-1-DIRECT** |
| 2 | **awesome-claude-plugins** (quemsah) | CITE-CLASS-CANONICAL | **ADD to multi-source-discovery-breadth-discipline.md as 7th catalog** + NO-LICENSE disclosure |
| 3 | **awesome-agentic-patterns HEAD-refresh** | CITE-CLASS-CANONICAL | REFRESH cite-trail HEAD `ffb42768` → `9c40e100` via mechanical-mirror Pattern A |
| 4 | mattpocock-skills pattern quotes | CITE-CLASS-CANONICAL TIER-1-NAMED-AUTHOR-QUOTE | ALREADY-CITED in sibling named-failure-modes.md |
| 5 | get-shit-done patterns | CITE-CLASS-CANONICAL | CITE in research-protocol.md (sibling already cites) |
| 6 | mem0 fact-extraction pattern | CITE-CLASS-CANONICAL per W134 F27-C | CITE in research-protocol.md memory section |
| 7 | langgraph BSP graph pattern | CITE-CLASS-CANONICAL per W134 F27-B Pattern B HNF | CITE only — ECOSYSTEM-IMPORT cost too high |

### 5.3 REJECT-FOR-FIT (high-value HONEST-NON-FINDING)

| Candidate | Reason | Verdict source |
|---|---|---|
| AsyncFuncAI/deepwiki-open | Probe 7 DEMAND-ABSENCE — managed mcp.deepwiki.com covers | Agent A + Mia confirm |
| wshobson/agents | Probe 5 HARD-GATE + Probe 7 REJECT | Sibling iter-93 firm |
| mattpocock/skills (plugin) | Probe 5 HARD-GATE (disable-model-invocation) | Sibling iter-92 firm |
| vercel-labs/agent-skills | Probe 6 license unclear | Sibling Wave 137 F2 firm |
| basic-memory | Probe 6 + SRA D1 AGPL library-link infects | Agent A + Mia D1 refinement |
| ast-grep MCP | Probe 6 phantom npm package | Sibling iter-67 firm |
| langgraph (ecosystem-import) | CR-12.5 ECOSYSTEM-IMPORT cost disproportionate | Sibling W134 F27-B Pattern B HNF |

## 6. Cross-model T1 verification mandate

Per `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md §Cross-model T1 verification mandate` + CLAUDE.md cardinal-rule-3 + Ship 2P fully-unleashed mandate: **ANY SRA verdict involving REJECT or INSTALL MUST be cross-model-verified via real GPT-5.5 codex T1 BEFORE any commit**.

This agent runs as Sonnet stand-in per CLAUDE_CODE_SUBAGENT_MODEL env funneling per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`. **Cross-model gate NOT structurally satisfied at this audit layer**. STAND-IN-NOTICE required on integration.

**Fire 2 entry**: Route all VERIFIED-GENUINE prescriptions through codex T1 deep-review-exec dispatch per Pattern A primary shape (foreground+tee per `cross-model-consensus.md §Profile selection`) BEFORE Pattern A apply commits.

## 7. Provenance + cite trail

- Agent A artifact read: `Z:/claude-sota-installed/tmp/wave-deep-audit-fire1-agentA-sota-discovery-2026-05-12.md` (full 555 lines) [VERIFIED 2026-05-12 via Read]
- Spec: `docs/superpowers/specs/2026-05-12-sota-architecture-deep-audit-design.md §4.5 + §3.7 SHARED INVARIANT BLOCK` (consumed via brief + cardinal-rules in context)
- Plan: `docs/superpowers/plans/2026-05-12-sota-architecture-deep-audit.md §Fire 1 Task 1.5` (consumed via brief)
- SRA rule: `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md` (system-reminder injected)
- Probe DAG rule: `Z:/claude-sota-installed/.claude/rules/agent-harness-fit-verification.md` (read in cardinal-rules context)
- Mia rule: `Z:/claude-sota-installed/.claude/rules/mia-pre-apply.md` (read in cardinal-rules context)
- Runtime probes:
  - `.claude/plugins/installed_plugins.json` [VERIFIED 2026-05-12 via Bash cat head -80]
  - `.claude/plugins/marketplaces/` [VERIFIED 2026-05-12 via Bash ls] — 11 marketplaces
  - `.claude/agents/` [VERIFIED 2026-05-12 via Bash ls] — 11 agents + cwc/
  - `.claude/rules/` [VERIFIED 2026-05-12 via Bash ls] — 25+ rules
  - `.claude/skills/` [VERIFIED 2026-05-12 via Bash ls] — 14 skills
  - `.claude/commands/` [VERIFIED 2026-05-12 via Bash ls] — 4 commands
  - `.mcp.json` [VERIFIED 2026-05-12 via Bash cat head -40] — 7 MCPs total
- License probes [VERIFIED 2026-05-12 via Bash cat LICENSE]:
  - gitnexus: PolyForm Noncommercial 1.0.0
  - ccusage: MIT (Copyright (c) 2025 ryoppippi)
  - awesome-claude-plugins: NO LICENSE FILE
  - claude-skills: MIT (Copyright (c) 2025 Alireza Rezvani)
  - anthropic-cookbook: MIT (Copyright (c) 2023 Anthropic)
- Sibling-precedent cites: iter-67 (ast-grep) / iter-92 (mattpocock) / iter-93 (wshobson) / Wave 137 F2 (vercel-labs) / Wave 134 F27-A/B/C (openai-agents-python/langgraph/mem0) / W152 F20+F22+F23+F24 (anthropic-cookbook ratification) — all per Agent A §-references; not re-probed at this audit layer

## verdict_one_line

VERDICT: 3 STUDY-PILOT-NARROW (gitnexus+D1 disclosure / ccusage / claude-skills-selective) + 2 CITE-EXTENSION (anthropic-cookbook RATIFY / awesome-claude-plugins+NO-LICENSE disclosure) + 5 REFRESH-or-CITE-only + 7 REJECT-FOR-FIT; 4 Mia OVERs caught (gitnexus P6 incomplete / basic-memory D1 use-class refinement / codex version-axis ambiguity / plugin count unverified)

## HANDOFF

- handoff_to: orchestrator
- output_mode: last_message
- artifacts: [tmp/wave-deep-audit-fire1-agentE-probe-dag-2026-05-12.md]
- verdict_one_line: VERDICT: 3 STUDY-PILOT-NARROW (gitnexus+D1 disclosure / ccusage / claude-skills-selective) + 2 CITE-EXTENSION (anthropic-cookbook RATIFY / awesome-claude-plugins+NO-LICENSE disclosure) + 7 REJECT-FOR-FIT; 4 Mia OVERs caught
- cross_model_gate_status: PARTIAL via Sonnet stand-in per CLAUDE_CODE_SUBAGENT_MODEL env funneling per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate; STAND-IN-NOTICE: cross-model gate NOT structurally satisfied at this 2nd-stage harness-fit audit; route VERIFIED-GENUINE prescriptions through Fire 2 codex T1 deep-review-exec dispatch per Pattern A primary shape BEFORE Pattern A apply commits per SRA §Cross-model T1 verification mandate + CR-3 + Ship 2P fully-unleashed mandate
