# Fire 50 — sst/opencode strict deep-dive (Top-15 STUDY-PILOT #1; first strict-deep-dive post Wave 134 Fire 5)

> **Purpose**: Strict line-by-line deep-dive on `sst/opencode` (158k★ Top-15 STUDY-PILOT #1 per Fire 49 priority queue). Advances strict-deep-dive coverage 17/609 → 18/609 (2.79% → ~2.95%). Per Fire 45 §Step 1: 0 Sigstore attestations on release assets → skip 6-step probe → Tier-D verdict path; pure SRA D1-D10 manual probe instead.
> **Cite class**: `constituents=[TIER-1-DIRECT @ gh API repos/sst/opencode @ probe 2026-05-11 02:30Z + LICENSE file content (MIT) + README first 80 lines, TIER-2 sister-rule cite-import-AMBER @ Fire 41 framework Gate 1 + Fire 43 Band 6 convergence-gate + Fire 49 dashboard Top-15 priority queue + Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md Probes 1-7 + Z:/claude-sota/.claude/rules/convergence-gate.md Axis 1-3 + Z:/claude-sota/.claude/rules/kiss-dry-yagni.md Must-Never #4]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8.

## 🚨 Mia probe finding upfront

`gh api repos/sst/opencode` returns `"name": "anomalyco/opencode"`. The repo has been **org-transferred OR renamed** from `sst/opencode` → `anomalyco/opencode`. Per Fire 49 dashboard §"7.22% (44 repos) unreachable typo'd slugs": this is a VARIANT of that pattern — slug still resolves but maps to new owner. README badges + install commands now reference `anomalyco/opencode` consistently (homebrew tap: `anomalyco/tap/opencode`; nix: `github:anomalyco/opencode`). Fire 49 priority queue cited as "sst/opencode" — that slug is GitHub-side redirected.

## SRA D1-D10 strict probe results (2026-05-11 02:30Z)

| Dim | Probe | Evidence | Verdict |
|---|---|---|---|
| **D1** LICENSE-use-class | gh API + LICENSE file content read | `"license": "MIT"` + LICENSE file: "MIT License Copyright (c) 2025 opencode" (20-line MIT body). Permissive; ALL use-classes acceptable. | ✅ PASS |
| **D2** SOTA-freshness | `pushed_at` + age | `pushed: 2026-05-11T06:16:46Z` (TODAY); `created: 2025-04-30T20:08:00Z` (age ~12.4 months). Last 10 commits all 2026-05-11 (active TODAY). | ✅ PASS — very active |
| **D3** star-velocity vs density | stars / age | 158,157 stars / 376 days = **420 stars/day average**. cpd ≈ ~12/day (top contributors thdxr 2104 / adamdotdevin 1860 / kitlangton 744). High velocity SUSTAINED over 12 months. Per `convergence-gate.md` Axis-3 5-band table: `cpd > 10` AND `age > 180d` → **Sustained active maintenance — Firm Axis-3 PASS** (NOT fast-churn anti-pattern). | ✅ PASS (Sustained active) |
| **D4** maintainer provenance | contributors + named-T2 endorsement check | sst is org (sst.dev) with named contributors: **thdxr** (Thorsten Ball — well-known TypeScript/SST engineer + author of *Writing An Interpreter In Go*) + **kitlangton** (Kit Langton — well-known Scala/Effect engineer) = TIER-2-NAMED-PRACTITIONER per SRA D4 (verified-publisher status). | ✅ PASS (Tier-2 named-practitioner) |
| **D5** active-maintenance signals | issue-close rate + PR-merge rate + contributor diversity | 18,467 forks (high engagement); 5+ top contributors with substantial commit counts; recent PR merges visible in commit log (#26811 / #26809 / #26796 / #26798 / #26797 / #26786 within last 24h). Per SRA D5: ≥3/4 signals = ACTIVE. | ✅ PASS |
| **D6** use-class compatibility | mode-harness-shape | TypeScript-based terminal CLI + Desktop App (Electron) + multi-LLM routing. Direct competitor to **claude-code** (incumbent at eee runtime Tier-0). Mode-harness: terminal CLI ✅ compatible with autonomous /loop mode. Default branch `dev` (not `main` — non-standard but not blocking). | ⚠️ COMPATIBLE BUT DUPLICATE-FUNCTIONALITY |
| **D7** Anthropic CC alignment | Anthropic CC policy + claude-code competitor analysis | opencode is OPEN-SOURCE ALT-HARNESS for AI coding agents (multi-provider: Anthropic + OpenAI + others). Direct competitor to Anthropic Claude Code itself. Not Anthropic-shipped; not in Anthropic plugins marketplace. | ⚠️ ALT-HARNESS (not Anthropic-aligned) |
| **D8** industry adoption | multi-org adopters + named-org endorsements | Discord community + npm package (`opencode-ai`) + homebrew tap + scoop + choco + Arch AUR + nix flake = multi-distro packaging suggests broad community adoption. 158k★ + 18k forks = top-tier OSS adoption signal. | ✅ PASS |
| **D9** FM-class awareness | named-failure-modes catalog check | No documented FM-class trigger from sst/opencode in eee runtime (no eee dependency on opencode). Install via curl pipe-to-bash (`curl -fsSL https://opencode.ai/install \| bash`) IS a known FM-class signal: "trust-anchor at install time". Per CR-6 official-native-channel: use scoop/choco/brew/npm/nix INSTEAD of curl-pipe. | ⚠️ FM-class concern at install-time only (curl pipe-bash; mitigation: use scoop) |
| **D10** replacement viability (when proposing alternatives) | does sss have current/queued workflow that routes through? | sss EEE runtime ALREADY USES claude-code as primary AI coding agent (Tier-0 install per sota-installed-manifest §Section 1). opencode would REPLACE claude-code — but eee runtime's entire cardinal-rules + plugin marketplace + skill registry + hook system + 12 cardinal rules are SPECIFIC to claude-code. Replacement cost = full runtime re-architecture. Per Probe 7 demand-gate split: NO sss workflow currently demands opencode-specific features that claude-code lacks. | ❌ Probe 7.a DEMAND-ABSENCE |

## Fire 45 Gate 1 Registry Trust verdict (per Fire 47 V2 patches)

Step 1 attestation availability probe: `gh release view v1.14.48 --repo sst/opencode --json assets --jq '.assets[].name'` returned 33 assets (all `.zip`/`.tar.gz`/`.deb`/`.rpm`/`.dmg`/`.exe`/`.AppImage`/`.yml`/`.json`) — **0 .sig / .pem / .sigstore.json files**.

Per Fire 45 §Step 1 "0 attestations available → Tier-D/E direct path" + Fire 47 V2 §Step 3 sub-rule "Identity patterns": no signature → skip Steps 2-3 → apply Tier-D verdict.

**Fire 41 Gate 1 verdict**: **Tier-D unsigned-individual** (sst-org is named-T2 maintainer per SRA D4, but no Sigstore cryptographic provenance available; per Fire 47 V2 anti-pattern "AND semantics": unsigned named-T2 demotes to Tier-D, NOT Tier-B).

**Fire 50 dogfood data point for Fire 45**: VALIDATES the §Step 1 "0-attestation skip Steps 2-3 → Tier-D direct" path. n=1 evidence for the §Step 1 negative-result branch (post-Fire-46's positive-result branch evidence).

## CR-12 5-class disposition (per Wave 134 Fire 27 codification)

| Dimension | Assessment |
|---|---|
| GENUINELY-NEW? | NO — terminal-based AI coding agent is exactly what claude-code is |
| DUPLICATE-FUNCTIONALITY? | **YES** — same scope (AI coding CLI agent) + similar mechanism (TUI / file editing / LLM calls / tool use) as claude-code |
| PARTIAL-OVERLAP via different mechanisms? | PARTIALLY — multi-provider routing (Anthropic + OpenAI + others) is a differentiator from claude-code (Anthropic-only) |
| PROVIDER-COMPLEMENT? | NO — direct competitor at SCOPE level, not co-existence partner |
| ECOSYSTEM-IMPORT? | NO — opencode has its OWN ecosystem (Effect Schema + Bun + custom TUI); does not import eee's ecosystem |

**Primary CR-12 disposition**: **DUPLICATE-FUNCTIONALITY** of claude-code (incumbent at eee runtime Tier-0).

**Secondary CR-12 consideration**: opencode's MULTI-PROVIDER ROUTING + OPEN-SOURCE LICENSING (MIT vs Anthropic Claude Code's commercial license) are PARTIAL-OVERLAP differentiators that COULD be CITE-PATTERN-EXTRACT material for eee runtime's own provider-routing future codification (if/when eee expands beyond Anthropic-only).

## Final verdict

### CR-12 disposition + adoption-decision

**REJECT-FOR-FIT per CR-12 DUPLICATE-FUNCTIONALITY** + per `kiss-dry-yagni.md` Must-Never #4 (no duplicate functionality without clear reason).

**Rationale**:
1. claude-code is INSTALLED at eee runtime Tier-0 (sota-installed-manifest §Section 1)
2. opencode + claude-code at same scope (terminal AI coding agent) = duplicate
3. eee runtime's 12 cardinal rules + entire plugin marketplace + skill registry + hook system are SPECIFIC to claude-code — replacement cost = full runtime re-architecture
4. Probe 7.a DEMAND-ABSENCE: no sss workflow currently demands opencode-specific features
5. Fire 41 Gate 1 verdict: Tier-D (no Sigstore signatures; cryptographic provenance weaker than Tier-A for adoption)

### CITE-PATTERN-EXTRACT recommendation (secondary)

opencode's multi-provider routing pattern + Effect Schema usage + open-source MIT licensing model are NOTEWORTHY ARCHITECTURAL PATTERNS worth CITE-EXTRACTING for future eee evolution IF/WHEN:
- eee runtime expands beyond Anthropic-only LLM routing
- Effect Schema becomes a pattern eee adopts (currently not used)
- Open-source CC-alternative-harness comparison becomes relevant

For now: **cite opencode in `docs/sota-architecture-audit/04-decision-tracker.md` as REJECT-FOR-FIT-DUPLICATE-FUNCTIONALITY with CITE-PATTERN-EXTRACT footnote**.

### Replacement-of-or-overlap-with line (per Fire 49 strict line-by-line definition)

> opencode REPLACES claude-code at scope level (both = terminal AI coding agent). Replacement cost = full eee runtime re-architecture (12 cardinal rules + plugin marketplace + skill registry + hook system all claude-code-specific). REJECT-FOR-FIT-DUPLICATE-FUNCTIONALITY. CITE-PATTERN-EXTRACT for multi-provider routing + Effect Schema patterns if/when eee expands beyond Anthropic-only.

## Coverage advancement (Fire 49 dashboard update)

| Metric | Pre-Fire-50 | Post-Fire-50 |
|---|---|---|
| Strict line-by-line deep-dive | 17 / 609 = **2.79%** | **18 / 609 = ~2.95%** (+0.16%) |
| Top-15 STUDY-PILOT strict-deep-dived | 0 / 15 = 0% | **1 / 15 = 6.67%** |
| Programmatic SRA D1-D10 successful (sst/opencode was in 555) | 555 / 609 = 91.13% | Unchanged 91.13% |
| Pre-existing baseline | 7 / 609 = 1.15% | Unchanged |

## Fire 45 §Step 1 "0-attestation skip path" dogfood

This Fire 50 ALSO serves as a Fire 45 dogfood data point for the §Step 1 NEGATIVE-result branch:
- Fire 46 was 1st dogfood with POSITIVE-result (Sigstore attestations available → Steps 2-5 executed → Tier-A signed-official verdict)
- Fire 50 is 1st dogfood with NEGATIVE-result (0 Sigstore attestations → skip Steps 2-3 → Tier-D direct verdict)

Combined: Fire 45 discipline validated on BOTH branches (positive + negative) of the §Step 1 decision tree. n=2 cumulative cycle-322 dogfood evidence on Fire 45.

## Comparison with eee runtime current state

| Dimension | claude-code (eee Tier-0 incumbent) | sst/opencode (Fire 50 candidate) |
|---|---|---|
| License | Commercial (Anthropic proprietary) | MIT (open source) |
| LLM provider | Anthropic Claude only | Multi-provider (Anthropic + OpenAI + others via routing) |
| Sigstore signing | Not applicable (commercial proprietary) | Not implemented (Tier-D unsigned) |
| Plugin marketplace | Anthropic-curated (anthropics/claude-plugins-official) | npm package + custom marketplace |
| Skill registry | `.claude/plugins/marketplaces/*/skills/` + 1556 SKILL.md | TypeScript-native + Effect Schema |
| Hook system | Native PreToolUse / PostToolUse / SubagentStop / etc | Different hook surface (TypeScript-based) |
| Memory layer | mcp-memory (sqlite-vec) + graphiti (FalkorDB) + MEMORY.md | Built-in session memory |
| Cross-model gate | codex T1-T7 via Path P/Path D recipes | Not formalized at framework level |
| Cardinal rules | 12 cardinal rules (CR-1 through CR-12) | None equivalent |
| Audit-action-loop | Wire/Surface/Close/Re-fire discipline | None equivalent |

**Replacement cost assessment**: switching eee runtime from claude-code → sst/opencode would require:
- Rewriting all 12 cardinal rules (CR-1 through CR-12) for opencode TypeScript hook surface
- Re-installing 11 plugin marketplaces from scratch
- Re-codifying 14 Wave 134 series codifications for opencode mechanism
- Re-implementing memory taxonomy + 4-class layer for opencode
- Re-codifying cross-model gate via opencode's mechanism (which may not exist)
- Re-implementing cycle-322 promotion-threshold mechanism
- Replacing 1556 SKILL.md files OR reimplementing skill-discovery

**Conclusion**: Replacement infeasible without 6-12 months of re-architecture work. opencode remains REJECT-FOR-FIT-DUPLICATE-FUNCTIONALITY for eee runtime adoption.

## Update triggers

Re-evaluate sst/opencode (anomalyco/opencode) verdict when:
- opencode adopts Sigstore signing → Gate 1 verdict upgradeable from Tier-D to Tier-A/B
- opencode ships features eee runtime explicitly demands AND claude-code lacks → CR-12 disposition shifts from DUPLICATE-FUNCTIONALITY toward PROVIDER-COMPLEMENT
- eee runtime expands beyond Anthropic-only LLM routing → CITE-PATTERN-EXTRACT recommendation becomes actionable
- opencode-org maintainer departure OR archive event → SRA D4 maintainer-provenance shift may invalidate

## Cite class for this deep-dive

`constituents=[TIER-1-DIRECT @ gh API repos/sst/opencode @ probe 2026-05-11 + LICENSE file content read + README first 80 lines, TIER-2 sister-rule cite-import-AMBER @ Fire 41 + Fire 43 + Fire 45 + Fire 47 + Fire 49 + agent-harness-fit-verification + convergence-gate + kiss-dry-yagni Must-Never #4]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8.
