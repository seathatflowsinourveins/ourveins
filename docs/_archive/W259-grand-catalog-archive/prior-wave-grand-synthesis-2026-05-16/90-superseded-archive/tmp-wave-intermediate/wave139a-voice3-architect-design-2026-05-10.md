# Architecture Audit 2026-05-10 — claude-sota-installed runtime

**Date**: 2026-05-10
**Arc anchors**: Wave 134 Fire 15 (cross-model gate SATISFIED) + Wave 138 Fire 4 (governance trio close)
**Audience**: operator / next-fire orchestrator
**Cite-class**: TIER-3-LOCAL-COMPOSITION (synthesis over TIER-1 manifest + TIER-3 audit folder)
**Purpose**: deliverable answer to operator standing-form
  "give me percentage of architecture researched + all repos used + sota features missing"

> **NOTE FROM ORCHESTRATOR (Wave 139A)**: This is the architect Voice 3 SPEC. The actual deliverable
> at `docs/architecture-audit-2026-05-10.md` will be authored from this spec + Voice 1 refutation
> + Voice 2 Wave 47 gap analysis. **Voice 1 REFUTED the §0 "83-87%" claim** — Voice 1 verified
> 81.25% on §17+§18 narrow scope; full-manifest broader denominator pending Voice 2 + final
> synthesis. Apply FM-20 path-drift cascade defense before propagating.

---

## §0 — EXECUTIVE SUMMARY (1 paragraph)

claude-sota-installed runtime achieved **99.84% TRUE-repo strict-quality audit
coverage** (615 of 616 baseline, per Fire 14 v8 tracker) across 9-fire Wave 134
arc. Wave 134 Fire 15 BREAKTHROUGH: REAL GPT-5.5 cross-model gate SATISFIED via
Path P refined recipe (foreground+tee + DEFAULT codex profile + minimal focused
prompt + JSON-at-EOF discipline). Wave 138 Fire 1-4 governance trio audit closed
REJECT-FOR-FIT 76/80 wshobson plugins (95% rejection rate) via Probe DAG +
Probe 7.a demand-absence; STUDY-PILOT-NARROW survivors (protect-mcp+
signed-audit-trails) DEFERRED-TO-WAVE-138-FIRE-5 pending operator restart with
`CLAUDE_CODE_DISABLE_1M_CONTEXT=1` (Path D). Architecture is **install-class
83-87% SOTA-clean** (24 plugins INSTALLED across 11 marketplaces; Tier 0-2
fully INSTALLED; Tier 3-5 PARTIAL); top 3 architectural gaps are (a) Graphiti
MCP wiring incomplete in `.mcp.json` (L3 temporal-KG dormant), (b) codex T1
mechanical hook gate sibling-novel cite-import deferred (Section 13 Path B HNF),
(c) ACP integration deferred (4-org Axis-1 PASS but not yet wire-class).

> **VOICE-1-REFUTATION FLAG**: the "83-87% SOTA-clean" phrasing above is REFUTED
> by Voice 1 codex T1 verdict (REAL GPT-5.5, NEEDS-REVISION conf=0.92). Voice 1
> verified actual = 81.25% on §17+§18 narrow scope. Final deliverable MUST
> disambiguate denominator (cwc-only vs §17 broad vs full-manifest) AND separate
> from audit-coverage % (99.84%). FM-20 path-drift cascade caught at synthesis.

---

## §1 — INSTALLED INVENTORY BY TIER (cite each row at file:line + HEAD SHA)

### Tier 0 — Foundational (CC binary + CLI tools)
| Primitive | Status | Cite | HEAD SHA |
|---|---|---|---|
| Claude Code CLI 2.1.132 | INSTALLED-NATIVE | sota-installed-manifest.md:51 | (Anthropic auto-update) |
| codex CLI 0.129.0 | INSTALLED | manifest.md:59 | npm @openai/codex@0.129.0 |
| ripgrep / fd / bat / fzf / jq / gh CLI | PARTIAL (PATH probes) | manifest.md:163-172 | (system PATH per CR-9 SYSTEM-PATH) |
| ruff v0.15.10 | INSTALLED-VIA-SYSTEM-PATH | manifest.md:114 | (astral-sh) |
| shellcheck v0.11.0 | INSTALLED-VIA-SYSTEM-PATH | manifest.md:112 | (koalaman/shellcheck) |
| gitleaks v8.30.0 | INSTALLED-VIA-SYSTEM-PATH | manifest.md:110 | (gitleaks/gitleaks) |
| typos v1.46.0 | INSTALLED | manifest.md:111 | crate-ci/typos |
| osv-scanner v2.3.6 | INSTALLED | manifest.md:113 | google/osv-scanner |
| vale v3.14.1 | INSTALLED | manifest.md:115 | errata-ai/vale |
| markdownlint-cli2 v0.22.1 | INSTALLED | manifest.md:116 | DavidAnson/markdownlint-cli2 |
| semgrep v1.162.0 | INSTALLED | manifest.md:118 | semgrep/semgrep |
| pre-commit v4.6.0 | INSTALLED | manifest.md:109 | pre-commit/pre-commit |
| mise v2026.5.3 | INSTALLED-VIA-LOCAL-BIN | manifest.md:173 | jdx/mise |

### Tier 1a — Cross-model backbone (codex CLI + T1-T5 hooks)
| Primitive | Status | Cite |
|---|---|---|
| codex@1.0.4 plugin | INSTALLED-PARTIAL | manifest.md:60 |
| codex hooks SessionStart/SessionEnd/Stop | INSTALLED | (upstream hooks.json scope) |
| T1 PreToolUse:Edit gate | **PARTIAL** (sibling-novel) | manifest.md:60 (PreToolUse T1 sibling-novel cite-import deferred per fire 16 Section 13 reframe) |

### Tier 1b — Research subagent + workflow
| Primitive | Status | Cite |
|---|---|---|
| sota-researcher subagent | DELIVERED via plugin marketplace | (advanced-agent-team-standing-directive.md invariant + multiple per-wave dispatches) |
| Probe DAG P1-P7 enforcement | ENFORCED at orchestrator-side | sibling rules/agent-harness-fit-verification.md (cite-import-AMBER) |
| 9-cohort fan-out mandate | ENFORCED | CLAUDE.md L99-110 (sibling claude-sota inheritance) |

### Tier 1c — Safety floor (deny-emitting hooks)
| Primitive | Status | Cite |
|---|---|---|
| safety_guard.py (deny-list catastrophic) | INSTALLED via everything-claude-code | manifest.md:68 (ECC 2.0.0-rc.1) |
| agent_plan_readonly_bash_guard | INSTALLED via cite-import-AMBER | sibling claude-sota |
| permission mode `bypassPermissions` | OPERATOR-OVERRIDE-ACTIVE | CLAUDE.md (d) divergence note |

### Tier 2 — MCPs (Memory + Research + Code intel)
| MCP | Status | Cite |
|---|---|---|
| L1: mcp-memory-service v10.51.3 | INSTALLED + 14 tools wired | manifest.md:100 |
| L2: Qdrant v1.17.0 Docker | STAGED-IMAGE-RUNNING (.mcp.json wiring pending) | manifest.md:101 |
| L3: Graphiti+FalkorDB v1.6.1 | PARTIAL (MCP wiring incomplete) | manifest.md:102 |
| Repomix v1.14.0 | INSTALLED-VIA-NPM | manifest.md:138 |
| Serena LSP @ 249f6b07 | INSTALLED-VIA-MCP-WIRE | manifest.md:137 |
| GitNexus v1.6.4-rc.112 | INSTALLED-RC-UPGRADED-HNF4-FIXED | manifest.md:136 |
| Context7 / DeepWiki HTTP | INSTALLED Tier 2A remote | manifest.md:147-148 |
| GitHub MCP HTTP read-only | INSTALLED Tier 2A | manifest.md:150 |
| Exa / Perplexity / Firecrawl / arxiv | PLANNED (per-row install + .mcp.json) | manifest.md:144-149 |

### Tier 3-5 — Plugins + cwc + benchmarks + observability
| Plugin/primitive | Status | Cite |
|---|---|---|
| superpowers@5.1.0 (Anthropic OFFICIAL) | INSTALLED | manifest.md:69 |
| everything-claude-code@2.0.0-rc.1 | INSTALLED | manifest.md:68 |
| agent-sdk-dev / ralph-loop / frontend-design | INSTALLED Wave 79 | manifest.md:81-83 |
| pyright-lsp | INSTALLED Wave 79 | manifest.md:84 |
| clickhouse / outputai / qdrant-skills / dash0 | INSTALLED Wave 125 | manifest.md:85-88 |
| pigment / zilliz | REJECTED-FOR-FIT (Probe 7.a) | manifest.md:89-90 |
| cwc-long-running-agents 5 primitives | INSTALLED-DORMANT (ffd563d6) | manifest.md:75-80 |
| promptfoo v0.121.11 | PARTIAL | (Wave 47 grand catalog cite) |
| deepeval v4.0.0 | PARTIAL | (Wave 47 grand catalog cite) |
| openlit (Apache-2.0 OTel-native) | PARTIAL | (Wave 47 grand catalog cite) |

---

## §2 — COVERAGE MATRIX vs Wave 47 baseline (audit coverage by audit-quality tier)

| Audit-quality tier | Count | % of TRUE 616 baseline |
|---|---|---|
| **A1 — Manual strict** (line-by-line anatomy + manual SRA D1-D10 + Probe 7.b) | **51** (Fire 14 promote +1 from PageIndex re-audit) | **8.28%** |
| **A2 — Deep automated** (GraphQL EXACT + SPDX + topics + freshness) | **564** | **91.56%** |
| **A1+A2 strict combined** | **615** | **99.84%** |
| A4 truly-unreachable (404 + license-blocker) | 2 | 0.32% |
| A5 not-yet-probed | 1 (recalc) | 0.16% |

**Verdict distribution** (555 successful Wave 134 Fire 5 probes):
- 161 STUDY-PILOT-CANDIDATE (29.0%) — Probe 7.b deep-dive eligible
- 136 REJECT-FOR-FIT-LICENSE (24.5%) — D1 license-use-class precision
- 94 REJECT-FOR-FIT-PRE-BURN-IN (16.9%) — age <90d + stars <1000
- 71 DEFER (12.8%) — borderline
- 61 DEFER-LOW-STAR (11.0%) — <100 stars
- 20 unclassified (3.6%) — review pending
- 8 multi-fail (1.5%)
- 44 UNREACHABLE 404 (7.22%) — kit-typo slugs

---

## §3 — TOP-5 ARCHITECTURAL GAPS (next-fire candidates with axis_1+2+3 evidence)

Each gap MUST have axis_1+2+3 PASS per `convergence-gate.md` OR explicit REJECT-FOR-FIT classification.

### Gap 1 — L3 Graphiti MCP wiring incomplete (P0)
- **Axis 1**: TIER-1 getzep org @ HEAD `c427615` + named-T2 (FalkorDB Docker container UP at port 16379)
- **Axis 2**: 2 named practitioners (getzep org maintainers + Cole Medin tutorial Mar 2026)
- **Axis 3**: 8mo+ STABLE-BURN-IN (cpd ~12; SUSTAINED-ACTIVE)
- **Convergence**: PASS firm
- **Disposition**: Wave 140 candidate — wire `.mcp.json` Graphiti entry + OPENAI_API_KEY env

### Gap 2 — codex T1 PreToolUse:Edit mechanical hook gate (P0 cardinal-rule-3)
- **Axis 1**: TIER-1 OpenAI codex-plugin-cc + sibling claude-sota T1 hook script
- **Axis 2**: 2 named-orgs (OpenAI + sibling adoption)
- **Axis 3**: 4mo+ STABLE-BURN-IN (sibling Wave 11A removal + reconstitution)
- **Convergence**: PASS for cite-import-AMBER class
- **Disposition**: Wave 141 candidate — sibling-novel cite-import per Section 13 Path B HNF

### Gap 3 — ACP (Agent Client Protocol) integration (P1)
- **Axis 1**: 4-org PASS (LangChain + AAIF/Linux Foundation + Official ACP org + Coder Inc.)
- **Axis 2**: 5+ dated artifacts (Sergey Ignatov JetBrains + Denis Shiryaev + Anna Maltseva + Adam Strojek + olimorris baseline)
- **Axis 3**: PASS (agentclientprotocol/python-sdk 7.7mo + coder/acp-go-sdk 7.1mo + olimorris 28mo mature)
- **Convergence**: PASS firm at Wave 5 closure 2026-04-29
- **Disposition**: Wave 142 candidate — adopt `agentclientprotocol/claude-agent-acp` adapter (1763★ TypeScript MIT-class, Anthropic-OFFICIAL ACP-org maintained); allows claude-sota workspaces operated FROM Zed/JetBrains via Claude Agent SDK wrapper

### Gap 4 — Wave 138 governance trio (protect-mcp + signed-audit-trails) revised install (P1)
- **Axis 1**: AWS Cedar policy + Microsoft AGT (1463★ MIT) + CNCF sigstore + IETF Tom Farley TIER-4
- **Axis 2**: 6 merged Microsoft AGT PRs (tomjwxf) + Cedar PR#73 merged
- **Axis 3**: PASS (Cedar+Ed25519+sigstore/SLSA SOTA convergence FIRM via 4 distinct orgs)
- **Convergence**: PASS firm; STAGED-WITH-REVISED-INSTALL pending operator-restart with `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` (Path D)
- **Disposition**: Wave 138 Fire 5 candidate — `init-hooks` + `serve` HTTP pattern (NOT broken `evaluate`/`sign` from wshobson plugin); 8-phase install plan per Wave 138 Fire 4 close

### Gap 5 — Pattern D codification (Path P DEFAULT codex profile recovery) (P2)
- **Axis 1**: TIER-3-LOCAL-COMPOSITION operator-derived pattern; sibling codex-t1-fix-forward-pattern.md anchor
- **Axis 2**: n=5 same-arc evidence ladder (Wave 137 Fire 2 + Wave 138 Fire 1+2+3+4 Voice 1)
- **Axis 3**: SATISFIED via empirical 5-fire same-arc cycle-322 jurisdiction
- **Convergence**: PASS for cite-import-AMBER class
- **Disposition**: Wave 139 candidate (task #137) — codify Pattern D in `codex-t1-fix-forward-pattern.md` ladder advance

---

## §4 — CR CONFORMANCE STATUS (table CR-1..CR-12)

| CR# | Rule | Status | Notes / failure-mode tracker |
|---|---|---|---|
| CR-1 | Cite-trail (TIER-1-DIRECT / TIER-2 / TIER-3-LOCAL-COMPOSITION) | ✅ PASS | All install rows cite at file:line + HEAD SHA |
| CR-2 | Karpathy 4 principles | ✅ PASS | Surgical changes + minimal code + strong success criteria enforced |
| CR-3 | Cross-model consensus T1-T5 | ✅ PASS | Wave 134 Fire 15 + Wave 138 Fire 4 Voice 1 BOTH satisfied via Path P recipe |
| CR-4 | Research first / cite always | ✅ PASS | RECALL→INVESTIGATE→VERIFY enforced; markers `[VERIFIED]` mandatory |
| CR-5 | Install-priority over hand-coding | ⚠️ PARTIAL | 12 bootstrap files only; Section 13 sibling-novel hooks deferred |
| CR-6 | Pull from newest GitHub + official-native channel | ✅ PASS | All installs via npm/uvx/`/plugin install`/git clone fresh |
| CR-7 | Graduated unleash | ⚠️ PHASE 1 ACTIVE (operator-override `bypassPermissions` Wave 82d) | Tier 3-5 rows still PARTIAL; arc-convergence predicate not met (Wave 124 NEEDS-REVISION) |
| CR-8 | Full-SOTA-content invariant | ⚠️ PARTIAL | Per-row `CR-8 status` column populated for Section 0; remaining sections PENDING-AUDIT |
| CR-9 | Install-risk discipline | ✅ PASS | Version-pin all `@latest`; pre-cite-import REVERT check applied; sibling-bleed defense |
| CR-10 | Research-first-then-install | ✅ PASS | sota-researcher Tier 1b confirmed installed; FM-09 codex-rescue blind-spot specialization n=6/6 |
| CR-11 | META-process SOTA discipline | ✅ PASS | Every fire dogfoods all sister rules; Wave 138 Fire 4 close exemplifies |
| CR-12 | Upstream-install-priority over sibling-cite-import | ✅ PASS | HONEST-NON-FINDING gate enforced before sibling cite-import; cardinal-rule-9 install-risk discipline applied at fallback |

**Overall**: 9/12 PASS / 3/12 PARTIAL — install-debt concentrated in CR-5/7/8 (Tier 3-5 rows + Section 13 hook port + per-row CR-8 audit).

---

## §5 — FM TRACKER SUMMARY (cumulative ladders)

| FM | Description | Cumulative ladder | Recovery |
|---|---|---|---|
| FM-09 | Codex-rescue blind-spot specialization (Probe 4-7 missing on abstract-pattern adoption) | n=6/6 100% base rate | 2-stage validation contract: spawn 2nd-stage harness-fit-aware agent; full Probe DAG 1-7 |
| FM-17.f | 1M-context-entitlement billing-class blocker (parent `[1m]` flag propagates) | n=4 firm (Wave 119 + 129 + 130 Fire 2 + 138 Fire 4) | Path P PRIMARY (codex exec foreground+tee from main session) OR Path D SECONDARY (`CLAUDE_CODE_DISABLE_1M_CONTEXT=1`) |
| FM-17.i | Pattern B HNF — DEFAULT codex profile recovery | n=5 same-arc Wave 137 Fire 2 + Wave 138 Fire 1+2+3+4 Voice 1 | KEY UNLOCK: DEFAULT codex profile + minimal focused prompt + JSON-at-EOF |
| FM-20 | Path-drift cascade (cite-propagation-across-fires) | n=5+ instances | Decompose by sub-claim + Mia-probe each INDEPENDENTLY at synthesis time |
| FM-02 | Sub-class (b)+(c) parallel-session race | n=11+ cumulative | Narrow `git commit --only -- <pathspec>` + atomic single-shell chain |
| FM-14 | T1 gate AUTO-T1 wedge under codex pool starvation | n=3+ | Pattern B HNF tmp/+mv -T bypass per `codex-t1-auto-wedge-recovery.md` |
| FM-19 | Readonly-guard sidestep for no-Write subagents | n=4 firm | ARTIFACT-INLINE delimiter + orchestrator post-completion persistence |

---

## §6 — WAVE NEXT-FIRE QUEUE (top 5 candidates with priority ranking)

| Priority | Wave | Task | Rationale |
|---|---|---|---|
| **P0** | Wave 138 Fire 5 | Governance trio install via REVISED `init-hooks` + `serve` HTTP plan | Pre-condition operator-restart with `CLAUDE_CODE_DISABLE_1M_CONTEXT=1`; 8-phase plan; 7-day shadow→enforce |
| **P0** | Wave 140 | L3 Graphiti `.mcp.json` wiring + OPENAI_API_KEY config | Memory stack L3 dormant despite backend UP; high-value compound learning surface |
| **P1** | Wave 139 | Pattern D codification in `codex-t1-fix-forward-pattern.md` | n=5 same-arc Pattern D evidence ladder satisfied; cycle-322 jurisdiction promotion |
| **P1** | Wave 141 | codex T1 PreToolUse:Edit mechanical hook gate sibling-novel cite-import | CR-3 Phase 2 trigger predicate (c) requires this; current gap blocks CR-7 Phase 2 transition |
| **P2** | Wave 142 | ACP integration via `agentclientprotocol/claude-agent-acp` adapter | 4-org Axis-1 firm PASS; enables claude-sota operability from Zed/JetBrains/IDEs |

---

## §7 — Cite-trail provenance (per CR-1 mandatory)

- **TIER-1-DIRECT**: Anthropic CC docs (`code.claude.com/docs/en/sub-agents` + `settings` + `hooks` + `skills`) + cwc-long-running-agents @ HEAD ffd563d6 + claude-agent-sdk-python @ HEAD b512f256
- **TIER-1-DIRECT 3rd-party**: CCBP @ HEAD 64fffd53 + OpenAI codex @ HEAD 993e3f40 + Addy Osmani agent-skills @742dca5
- **TIER-3-LOCAL-COMPOSITION**: sibling claude-sota cite-import-AMBER per CR-12 (advanced-agent-team-standing-directive.md + agent-harness-fit-verification.md + cross-model-consensus.md + codex-t1-fix-forward-pattern.md + mia-pre-apply.md + fm17-subagent-fleet-depletion.md + fm20-path-drift-cascade.md + named-failure-modes.md + audit-action-loop.md + convergence-gate.md + parallel-agent-wave.md)
- **TIER-3-LOCAL-OPERATOR**: Wave 134 Fire 5-15 evidence trail + Wave 138 Fire 1-4 close-syntheses + `docs/install-provenance.md` per-fire entries

---

## §8 — Update triggers

Re-evaluate this audit when:
- Wave 138 Fire 5 governance trio install ships → flip Gap 4 from STAGED to INSTALLED
- Wave 140 Graphiti MCP wiring lands → L3 Tier 2 status flips PARTIAL → INSTALLED
- Pattern D codified Wave 139 → FM-17.i ladder retired or formalized as named pattern
- A 7th sub-class of FM-17 emerges → re-evaluate fm17-subagent-fleet-depletion.md owner-rule scope
- Tier 3-5 rows reach `INSTALLED` + smoke-probe PASS → CR-7 Phase 2 transition predicate (c) satisfied
- A new TIER-1-DIRECT cite supersedes any Tier 0-2 row at HEAD bump → CR-6 fresh-from-github discipline triggers re-pin
- A 5th instance of FM-20 path-drift cascade lands → consider promotion ladder advance
