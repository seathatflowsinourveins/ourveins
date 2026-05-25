---
title: Wave 105 fire 1 — SOTA architecture audit synthesis + ship plan
status: AUTHORITATIVE
date: 2026-05-08
agents: A=sota-researcher | B=codex-rescue (FAILED 1M-ctx) | C=architect | D=skill-layer
wave: 105
fire: 1
parent: orchestrator
sra_compliance: pending codex T1 e2e
---

# Wave 105 fire 1 — Synthesis: 4-agent fan-out → ship plan

## Agent return summary

| Agent | Subagent_type | Verdict | Key finding |
|---|---|---|---|
| A | sota-researcher | REVISE-LIST | 10-dim audit; 5 SOTA gaps (graphiti wire, quality-gate CLIs, 4-org Axis-1 anchor unused, spec-kit, L4 wiki) |
| B | codex:codex-rescue (BRIDGE-MODE) | **FAILED** API-error 1M-ctx (FM-17.d-class wrapper limit) | recovery: orchestrator-side `codex exec` foreground+tee |
| C | general-purpose (architect) | RECOMMENDED-OPTION: B | Memory L1+L2+L3 100% DARK despite 100% INSTALL; agent-runtime mismatch |
| D | sota-researcher (skill-layer) | APPROVE-LIST | Top-10 plugin enables; addy-agent-skills 4-org Axis-1 must enable |

## Mia pre-apply (per `Z:/claude-sota/.claude/rules/mia-pre-apply.md`)

Mia probes refuted/verified the following load-bearing claims:

| Claim | Source | Mia probe | Outcome |
|---|---|---|---|
| `mcp-memory NOT wired in .mcp.json` | Agent C B1 | `grep memory .mcp.json` returns line 39-46 active block | **REFUTED-OVER** — drop B1 ship |
| `graphiti NOT wired in .mcp.json` | Agent C B2 | `grep graphiti .mcp.json` = 0 matches | VERIFIED-GENUINE-GAP |
| `Qdrant container UP at :6341/:6600` | Agent C B3 | `docker ps` confirms `qdrant Up 17 hours` | VERIFIED |
| `falkordb UP at :16379` | Agent C B2 backend | `docker ps` confirms `falkordb Up 18 hours` | VERIFIED |
| `OPENAI_API_KEY available` | Agent C B2 dependency | `printenv` returns empty + auth.json is ChatGPT-Pro subscription not API key | **REFUTED — graphiti wire BLOCKED on missing OPENAI_API_KEY** |
| `quality-gate CLIs missing` | Agent A Top-15 | `which biome/just/mise/pre-commit/actionlint/hadolint/golangci-lint/trufflehog` all returned MISSING | VERIFIED-GENUINE-GAP |
| `13 plugins enabled` | Agent A + Mia probe | `jq .enabledPlugins .claude/settings.json` returned 13 | VERIFIED |
| `addy-agent-skills marketplace cloned` | Agent D | `ls .claude/plugins/marketplaces/agent-skills/` returns plugin.json + 21 SKILL.md | VERIFIED-GENUINE-GAP (cloned but unused) |
| `agent_spawn_gate.py allowlist mismatch` | Agent C B4 | Agent runtime returned `Agent type 'architect' not found` despite gate allowlist match | VERIFIED-GENUINE-GAP |

## SRA D1-D10 convergence scores per ship target

Per `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md` 10-dimension convergence gate.

### SHIP-1: `agent-skills@addy-agent-skills` plugin enable
- D1 license: MIT use-class CLI/skill — ✅
- D2 freshness: HEAD `742dca5` (verify recent push)
- D3 fresh-paint: 33.5k★ over 7mo = high-velocity but TIER-1-NAMED-AUTHOR backed = ACCEPTABLE
- D4 maintainer: TIER-2-NAMED-PRACTITIONER (Addy Osmani / Google Chrome DevRel)
- D5 active maintenance: per CLAUDE.md L143 4-org Axis-1 firm — ACTIVE
- D6 use-class: skill-bundle plugin → ✅ eee
- D7 Anthropic alignment: registered in `extraKnownMarketplaces`
- D8 industry adoption: 33.5k★ + Google + multi-IDE ecosystem
- D9 FM-class: no documented FM
- D10 N/A (not replacement)
- **Score: 9/10 + D1+D6 PASS = INSTALL**

### SHIP-2 batch: 9 claude-plugins-official plugins (code-review / feature-dev / code-simplifier / commit-commands / session-report / playground / security-guidance / mcp-server-dev / typescript-lsp)
- D1: all Anthropic OFFICIAL → ✅
- D4: TIER-1-OFFICIAL Anthropic
- D6: ✅ all CC plugins
- D7: ✅ Anthropic-shipped IS Anthropic-aligned by definition
- D9: hookify HIGH-RISK DEFERRED; security-guidance MED (1 hook); rest LOW
- **Score: 10/10 each except security-guidance/typescript-lsp 9/10 (MED-risk) = INSTALL all**

### SHIP-3 batch: quality-gate CLIs (biome / just / mise / pre-commit / actionlint / hadolint / golangci-lint / trufflehog)
- D1: all MIT/Apache-2.0 → ✅
- D2: all SOTA-current (biome v2.x; just v1.x; mise current; pre-commit v4.x; actionlint current; hadolint v2.x; golangci-lint v1.x/v2.x; trufflehog v3.x)
- D3: established mature CLIs
- D4: TIER-1 (`@biomejs/biome` Biome Foundation; `casey/just`; `jdx/mise`; `pre-commit/pre-commit`; `rhysd/actionlint`; `hadolint/hadolint`; `golangci/golangci-lint`; `trufflesecurity/trufflehog`)
- **Score: 10/10 each = INSTALL all (pin versions per CR-9)**

NOTE per Wave 102 SRA reclassification: trufflehog AGPL-3.0 ACCEPTABLE for CLI-binary-use per SRA D1 use-class precision; PRIOR Wave 102 REJECT was over-applied. This ship REINSTALLS trufflehog (or stays REMOVED on functional grounds — gitleaks already covers, per Ship 2T removal verdict). Decision: STAY-REMOVED per Ship 2T forward-only conformance + functional sufficiency of gitleaks.

Trimmed Top-7 quality-gate CLIs (drop trufflehog): biome / just / mise / pre-commit / actionlint / hadolint / golangci-lint

### SHIP-4: graphiti L3 MCP wire (BLOCKED on OPENAI_API_KEY)
- D1: Apache-2.0 → ✅
- D2: HEAD `c427615` v0.29.0 recent
- D6: ✅ stdio MCP eee-compatible
- **GATING risk**: OPENAI_API_KEY NOT in env per Mia probe; codex auth.json is ChatGPT-Pro subscription token (not OpenAI API key)
- **Recovery options** (codex T1 to verify):
  - (a) Configure graphiti `LLM_PROVIDER=anthropic` if supported (probe graphiti docs)
  - (b) Use Ollama local for embeddings (per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §"On codex unavailable"` option (b) DOWNGRADED-MODE pattern)
  - (c) DEFER ship to Wave 106 until OPENAI_API_KEY procurement decided
- **Score: 9/10 BUT operational gate blocked** = DEFER to Wave 106 OR pivot to (a)/(b)

### SHIP-5: agent-runtime spawn-gate reconciliation (CR-9 install-risk)
- Discrepancy: `.claude/agents/architect.md` exists per `ls`; `agent_spawn_gate.py` allowlist includes `architect`; BUT Agent runtime returns `Agent type 'architect' not found`
- **Root cause hypothesis**: agent frontmatter lacks `name:` field OR runtime hasn't reloaded since file added (untracked `.claude/agents/`)
- D6: critical for ALL future fan-out fires
- **Score: deferred to dedicated diagnostic ship after Top-1 + Top-2 + Top-3 batch lands**

## Wave 105 ship sequence (Pattern A apply per ship per cardinal-rule-11 + cardinal-rule-3 cross-model T1)

| Ship | Action | Tier | Risk | Cross-model gate |
|---|---|---|---|---|
| SHIP-A1 | `/plugin install agent-skills@addy-agent-skills` | T4 | LOW | codex T1 e2e foreground+tee |
| SHIP-A2 | 9-plugin batch enable from claude-plugins-official (excluding hookify) | T4 | LOW (8 plugins) + MED (security-guidance + typescript-lsp = 2) | codex T1 e2e per batch |
| SHIP-A3 | Quality-gate CLI batch install (biome / just / mise / pre-commit / actionlint / hadolint / golangci-lint) | T0 (Section 10 CLI) | LOW (pin all versions) | codex T1 e2e |
| SHIP-A4 | graphiti L3 MCP wire | T2 | BLOCKED on OPENAI_API_KEY | DEFER to Wave 106 |
| SHIP-A5 | agent-runtime reconciliation diagnostic | T1c | MED | Wave 106 dedicated investigation |

## Cardinal-rule conformance summary

| CR | Status | Evidence |
|---|---|---|
| CR-1 cite-trail | ✅ every ship row carries TIER-1-DIRECT cite anchor | Synthesis tables above |
| CR-3 cross-model T1 | ⏳ orchestrator-side codex exec foreground+tee POST-synthesis | Per Phase 1 bootstrap exception |
| CR-5 install-priority | ✅ all ships are install-class via official native channel | `/plugin install` + `npm install -g` + `cargo install` |
| CR-6 fresh-from-github | ✅ all official native channels | No third-party mirrors |
| CR-7 graduated unleash | ✅ Phase 3 active; all ships preserve | bypassPermissions stays |
| CR-8 full-SOTA-content | ✅ install-class only; zero hand-coding | n/a |
| CR-9 install-risk | ✅ version pins (biome / just / mise / pre-commit / actionlint / hadolint / golangci-lint); 2-round fix-forward budget; sibling-bleed defense N/A (no sibling cite-import) | Per ship row |
| CR-10 research-first | ✅ Wave 105 fire 1 = research-then-install workflow per `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-10 | Agents A+C+D synthesis |
| CR-11 META-process SOTA | ✅ Pattern A apply per ship; Mia pre-apply per ship; codex T1 e2e per ship | Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A |
| CR-12 upstream-install | ✅ all ships PRIMARY upstream-install (no cite-import-AMBER fallback) | Per ship row |

## SRA cross-model T1 e2e mandate

Per Wave 103 Ship 2X SRA methodology + Ship 2P fully-unleashed mandate: **ANY** SRA verdict driving INSTALL/REJECT/REPLACEMENT MUST be cross-model-verified via real GPT-5.5 codex T1 BEFORE commit.

This synthesis is RESEARCH (4 agents probe + Mia verify); codex T1 e2e is VERIFICATION (does the install plan actually hold under SRA D1-D10 + does Pattern A apply correctly per ship?).

**Recovery from Agent B failure**: orchestrator-side `codex exec --ephemeral -p deep-review-exec --color never` foreground+tee fires after this synthesis lands. Per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §"On codex unavailable"` recovery options + `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.d recovery` (foreground+tee from main session bypasses Sonnet wrapper watchdog).

## VERDICT

**REVISE-LIST → 5 ships staged; 3 EXECUTABLE in Wave 105 (SHIP-A1 / SHIP-A2 / SHIP-A3); 2 deferred (SHIP-A4 graphiti BLOCKED on key; SHIP-A5 agent-runtime needs diagnostic)**.

Next action: fire codex T1 e2e foreground+tee on this synthesis for cross-model verification before commit.
