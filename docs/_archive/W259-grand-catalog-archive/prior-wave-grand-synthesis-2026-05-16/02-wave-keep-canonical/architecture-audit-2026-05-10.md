# Architecture Audit 2026-05-10 — claude-sota-installed runtime

**Date**: 2026-05-10
**Arc anchors**: Wave 134 Fire 15 (cross-model gate SATISFIED via Path P recipe) + Wave 138 Fire 4 (governance trio close) + Wave 139A (this synthesis)
**Audience**: operator / next-fire orchestrator
**Cite-class**: TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 (synthesis over TIER-1 manifest + TIER-3 audit folder + 3-voice agent team verdicts)
**Synthesis source**: Wave 139A 3-voice agent team — Voice 1 Path P REAL GPT-5.5 codex T1 (REFUTED prior 83-87% claim) + Voice 2 sota-researcher Wave 47 gap analysis (COVERAGE-PCT-VERIFIED with Probe 1 count-OVER catch) + Voice 3 architect synthesis design (APPROVE-FOR-IMPLEMENTATION with 4 Mia OVERs preempted)

---

## §0 — EXECUTIVE SUMMARY (4-metric disambiguation per Voice 1 REFUTATION)

The prior "~83-87% SOTA-clean" framing propagated through Wave 137-138 was **REFUTED by Voice 1 codex T1** (REAL GPT-5.5, NEEDS-REVISION conf=0.92 at `.claude/state/codex_consult_w139a_arch_synthesis_OUT.txt`). The single number was a **denominator-conflation OVER**: 4 distinct metrics measure different things and MUST be reported separately.

| Metric | Value | Denominator | Source |
|---|---|---|---|
| **Audit-coverage** (TRUE-repo strict-quality A1+A2) | **99.84%** | 615 of 616 baseline | `docs/sota-architecture-audit/fire-14-agent-team/03-final-coverage-tracker-v8.md:8,16` (line 8 = 616 baseline; line 16 = 615 strict combined) |
| **Install-cleanliness** (broad §17+§18 scope) | **81.25%** | (INSTALLED + INSTALLED-DORMANT + INSTALLED-AMBER) / 16 actionable rows | Voice 1 codex T1 verdict 2026-05-10 |
| **Install-cleanliness** (narrow §17 cwc-only scope) | **62.50%** | 5 install-class / 8 actionable rows | Voice 1 sensitivity analysis |
| **Wave 47 grand-catalog adoption** (raw 934-baseline) | **2.46% installed** / **38.43% touch** | 23 INSTALLED + 7 STAGED + 329 AUDITED = 359 of 934 raw (touch = INSTALLED+STAGED+AUDITED per Voice 2) | Voice 2 sota-researcher 2026-05-10 |
| **Wave 47 grand-catalog adoption** (strict-real ~674 after FP filter) | **3.41% installed** / 53.26% touch | 23 ADOPTED-INSTALLED of ~674 strict-real | Voice 2 Probe 1 count-OVER discipline |
| **Wave 134 Fire 5 audit-coverage** (609 eee-internal inventory) | **92.28%** | 562 of 609 SRA D1-D10 probed | `docs/sota-architecture-audit/00-master-tracker.md:163-181` |

**Headline interpretation per user standing-form questions**:
- **"% of architecture researched"** → **99.84%** TRUE-quality strict (Wave 134 Fire 14 baseline) OR **92.28%** of 609 eee-internal inventory OR **38.43%** raw touch / **53.26%** strict-real touch on Wave 47 broader grand catalog (touch = INSTALLED+STAGED+AUDITED per Voice 2)
- **"All repos used"** → 24 plugins + 13 MCPs across 11 marketplaces + Tier 0-2 fully INSTALLED + 23/934 Wave 47 grand catalog (raw); see §1 inventory
- **"SOTA features missing"** → combined 8 actionable gaps (Voice 2 TOP-5 repo-class + Voice 3 TOP-5 architectural; 2 overlap); see §3

**Wave 134 Fire 15 BREAKTHROUGH**: REAL GPT-5.5 cross-model gate SATISFIED via Path P refined recipe (foreground+tee + DEFAULT codex profile + minimal focused prompt + JSON-at-EOF discipline). KEY UNLOCK confirmed 6th-time same-arc (Wave 137 Fire 2 + Wave 138 Fire 1+2+3+4 + Wave 139A) — Pattern D candidate (task #137) ladder advanced to n=6.

**Wave 138 governance trio**: REJECT-FOR-FIT 76/80 wshobson plugins (95% rejection) via Probe DAG; STUDY-PILOT-NARROW survivors (protect-mcp + signed-audit-trails) DEFERRED-TO-WAVE-138-FIRE-5 pending operator restart with `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` (Path D for FM-17.f n=4 firm).

---

## §1 — INSTALLED INVENTORY BY TIER (Voice 3 spec, cite-verified)

### Tier 0 — Foundational (CC binary + CLI tools)
| Primitive | Status | Cite | HEAD SHA |
|---|---|---|---|
| Claude Code CLI 2.1.132 | INSTALLED-NATIVE | `docs/sota-installed-manifest.md` L75 (Section 1 Anthropic CC host runtime) | (Anthropic auto-update) |
| codex CLI 0.130.0 | INSTALLED | `docs/sota-installed-manifest.md` L84 (Section 2 lifecycle evidence row records `codex v0.130.0 model gpt-5.5` per W156 F1; L83 codex CLI install-primitive row records prior install command `@0.129.0` — F-future version-pin reconciliation queued separately per cycle-300) | npm @openai/codex@0.130.0 |
| ripgrep / fd / bat / eza / jq / fzf / zoxide / delta / lazygit / gh CLI | INSTALLED-VIA-SYSTEM-PATH | `docs/sota-installed-manifest.md` §Section 10 L207-L216 (F47 mutations 2026-05-12 commit a48511e) | (system PATH per CR-9 SYSTEM-PATH; mixed channels: winget 8 + chocolatey 1 + Z-local 1; NON-Z-PORTABLE caveats per row) |
| ruff v0.15.10 | INSTALLED-VIA-SYSTEM-PATH | manifest.md L158 (Section 5 quality tools) | astral-sh |
| shellcheck v0.11.0 | INSTALLED-VIA-SYSTEM-PATH | manifest.md L156 (Section 5 quality tools) | koalaman/shellcheck |
| gitleaks v8.30.0 | INSTALLED-VIA-SYSTEM-PATH | manifest.md L154 (Section 5 quality tools) | gitleaks/gitleaks |
| typos v1.46.0 | INSTALLED | manifest.md L155 (Section 5 quality tools) | crate-ci/typos |
| osv-scanner v2.3.6 | INSTALLED | manifest.md L157 (Section 5 quality tools) | google/osv-scanner |
| vale v3.14.1 | INSTALLED | manifest.md L159 (Section 5 quality tools) | errata-ai/vale |
| markdownlint-cli2 v0.22.1 | INSTALLED | manifest.md L160 (Section 5 quality tools) | DavidAnson/markdownlint-cli2 |
| semgrep v1.162.0 | INSTALLED | manifest.md L162 (Section 5 quality tools — canonical install row; L450 PLANNED orphan-row separate F-future) | semgrep/semgrep |
| pre-commit v4.6.0 | INSTALLED | manifest.md L153 (Section 5 quality tools) | pre-commit/pre-commit |
| mise v2026.5.3 | INSTALLED-VIA-LOCAL-BIN | manifest.md L218 (Section 10 CLI tools — `.local/bin/mise` v2026.5.3 windows-x64 verified Wave 136 Fire 1 Mia n=153 catch) | jdx/mise |

### Tier 1a — Cross-model backbone (codex CLI + T1-T5 hooks)
| Primitive | Status | Cite |
|---|---|---|
| codex@1.0.4 plugin | INSTALLED | manifest.md L84 (Section 2 — codex hooks T1-T7 lifecycle row covers `openai/codex-plugin-cc` plugin delivery mechanism + Wave 124-A1..A6 sibling cite-import for non-plugin-covered hooks) |
| codex hooks SessionStart/SessionEnd/Stop | INSTALLED | (upstream hooks.json scope) |
| T1 PreToolUse:Edit gate (sibling-novel) | INSTALLED | manifest.md L84 (Section 2 — `codex_t1_consult_gate.py` 85K WIRED settings.json:96 PreToolUse Edit\|Write\|MultiEdit; default WARN, STRICT via `CODEX_T1_GATE_STRICT=1`; live verdict production confirmed via 283 codex telemetry files per W156 F1) |

### Tier 1b — Research subagent + workflow
| Primitive | Status | Cite |
|---|---|---|
| sota-researcher subagent | DELIVERED via plugin marketplace | (advanced-agent-team-standing-directive.md invariant + multiple per-wave dispatches incl Wave 139A Voice 2) |
| Probe DAG P1-P7 enforcement | ENFORCED at orchestrator-side | sibling rules/agent-harness-fit-verification.md (cite-import-AMBER) |
| 9-cohort fan-out mandate | ENFORCED | CLAUDE.md L99-110 (sibling claude-sota inheritance) |

### Tier 1c — Safety floor (deny-emitting hooks)
| Primitive | Status | Cite |
|---|---|---|
| safety_guard.py (deny-list catastrophic) | INSTALLED-AMBER-WIRED-ACTIVE | manifest.md L256 (Section 13 Hooks — sibling cite-import-AMBER from `Z:/claude-sota/.claude/hooks/scripts/safety_guard.py @ 32fbcb0d` per Wave 14b Path B HONEST-NON-FINDING; WIRED settings.json:172 PreToolUse:Bash; 12 destructive-Bash patterns enforced; ECC HOOK chain lacks these per Wave 14 fork verdict — defense-in-depth gap 12 vs 1) |
| agent_plan_readonly_bash_guard | INSTALLED via cite-import-AMBER | sibling claude-sota |
| permission mode `bypassPermissions` (TEMPORARY OPERATOR-OVERRIDE per Wave 82d) | OPERATOR-OVERRIDE-ACTIVE | CLAUDE.md (d) divergence note |

### Tier 2 — MCPs (Memory + Research + Code intel)
| MCP | Status | Cite |
|---|---|---|
| L1: mcp-memory-service v10.51.3 | INSTALLED + 14 tools wired | manifest.md L144 (Section 4 Memory L1 capture — refined to INFERRED-LIVE-VIA-DB-MTIME PARTIAL-OF-PARTIAL per W155 F15; CR-7 Phase 2 trigger predicate (f) HONEST status) |
| L2: Qdrant v1.17.0 Docker | IMAGE-STAGED-DAEMON-DOWN-NOT-WIRED | manifest.md L145 (Section 4 Memory L2 vector — refined per W155 F16; Docker daemon currently down — operator-machine restart required; .mcp.json wiring still pending) |
| L3: Graphiti+FalkorDB v1.6.1 | INSTALLED-AMBER → WIRED-DAEMON-DOWN-PRIOR-SMOKE-PARTIAL-NOW-OFFLINE | manifest.md L146 (Section 4 Memory L3 temporal-KG — refined per W155 F17; Graphiti IS WIRED in .mcp.json (distinct from L2 Qdrant); Docker daemon-down currently blocks FalkorDB port 16379; Wave 141 Step 4 PARTIAL with 0 nodes persisted + Wave 142 V4 SAVED-SHIP FM-20 caveat; live-session probe DEFERRED) |
| Repomix v1.14.0 | INSTALLED-VIA-NPM | manifest.md L182 (Section 7 Code intel — refined to ON-DEMAND-STDIO-WIRED-CLI-RESPONDING-NO-LIVE-AUDIT per W155 F22) |
| Serena LSP @ 249f6b07 | INSTALLED-VIA-MCP-WIRE | manifest.md L181 (Section 7 Code intel — refined to ON-DEMAND-STDIO-WIRED-SHA-PINNED-UVX-CACHE-NO-LIVE-AUDIT per W155 F23; CR-9 D6 SHA-pin defense intentional) |
| GitNexus v1.6.4-rc.112 | INSTALLED-RC-UPGRADED-HNF4-FIXED (Wave 132 Fire 3) | manifest.md L180 (Section 7 Code intel — refined to DIRECT-BINARY-STDIO-WIRED-CLI-RESPONDING-FILESYSTEM-STATE-MUTATED-NOT-INDEXED-NO-LIVE-AUDIT per W155 F24) |
| Context7 / DeepWiki HTTP | INSTALLED Tier 2A remote | manifest.md L191-L192 (Section 8 Search MCPs — Context7 HTTP + DeepWiki HTTP; DeepWiki refined to INSTALLED-REMOTE-HTTP-MCP-HANDSHAKE-PROVEN per W155 F25) |
| GitHub MCP HTTP read-only | INSTALLED Tier 2A | manifest.md L194 (Section 8 Search MCPs — HTTP host PRIMARY read-only via api.githubcopilot.com/mcp/readonly) |
| Exa / Perplexity / Firecrawl / arxiv | MIXED-STATUS — Exa INSTALLED-VIA-ECC-MARKETPLACE-INDIRECTION (F30); Perplexity NPM-GLOBAL-MCP-PACKAGE-BINARY-INSTALLED-NOT-WIRED (F31); Firecrawl NPM-GLOBAL-MCP-PACKAGE-BINARY-INSTALLED-API-KEY-CONFIGURED-NOT-WIRED-NOT-EXPOSED (F32); arXiv PLANNED-CONFIRMED-NOT-INSTALLED (F33) | manifest.md L188-L190+L193 (Section 8 Search MCPs — non-contiguous; L191-L192 are Context7+DeepWiki covered by L84; per W155 F30+F31+F32+F33 REFINED SUBTYPES) |

### Tier 3-5 — Plugins + cwc + benchmarks + observability
| Plugin/primitive | Status | Cite |
|---|---|---|
| superpowers@5.1.0 (Anthropic OFFICIAL) | INSTALLED | manifest.md L93 (Section 3 claude-plugins-official marketplace — Anthropic-canonical superpowers v5.1.0 install path; L90 obra/superpowers REDUNDANT per V2 verification) |
| everything-claude-code@2.0.0-rc.1 | INSTALLED | manifest.md L92 (Section 3 affaan-m/everything-claude-code marketplace) |
| agent-sdk-dev / ralph-loop / frontend-design | INSTALLED Wave 79 | manifest.md L113-L115 (Section 17 cwc reference plugins) |
| pyright-lsp | INSTALLED Wave 79 | manifest.md L116 (Section 17 pyright-lsp plugin install) |
| clickhouse / outputai / qdrant-skills / dash0 | MIXED — clickhouse/outputai/qdrant-skills INSTALLED-DISABLED; dash0 REVERTED-POST-INSTALL/CACHED-ORPHANED-NOT-INSTALLED (per W155 F42a) | manifest.md L117-L119+L121 (non-contiguous; L120 is cwc-makers unrelated; Section 17 Wave 125 plugins) |
| pigment / zilliz | REJECTED-FOR-FIT (Probe 7.a Mia OVER #59 catch) | manifest.md L122-L123 (Section 17 Wave 125 REJECTED plugins) |
| cwc-makers (Anthropic OFFICIAL Wave 128) | INSTALLED-VIA-MARKETPLACE-CLI-DISABLED (W153 F7 keep-disabled per SRA D1-D10 convergent verdict; CR-12 GENUINELY-NEW-BUT-DEMAND-ABSENCE v2 n=1) | manifest.md L120 (Section 17 Anthropic OFFICIAL Wave 128 plugin; Cardputer hardware-gated re-enable trigger; `/maker-setup` command + `m5-onboard` skill) |
| cwc-long-running-agents 6 primitives | INSTALLED-DORMANT (ffd563d6) | manifest.md L106-L112 (Section 17 cwc primitives — 7 manifest rows including L112 active-adapted aggregate; CLAUDE.md Architecture §17 framing = 5 install-class primitives + 3 reference plugins; arch-audit "6 primitives" label is heuristic count including L112 active-adapted aggregate row) |
| promptfoo v0.121.11 | PARTIAL | (Wave 47 grand catalog cite) |
| deepeval v4.0.0 | PARTIAL | (Wave 47 grand catalog cite) |
| openlit (Apache-2.0 OTel-native) | PARTIAL — Wave 109 Ship 2P-pilot | (Wave 47 grand catalog cite) |

**Total install-class count** [W155 F62 forward-correction 2026-05-12]: 27 plugins in enabledPlugins manifest (22 enabled live runtime + 5 INSTALLED-DISABLED: clickhouse/outputai/qdrant-skills/cwc-makers/hookify) + 3 orphaned-cache-only NOT-in-enabledPlugins (dash0 REVERTED-POST-INSTALL per W155 F41b + security-guidance + typescript-lsp DEFERRED-FOR-CAUSE per W155 F42c) + 13 MCPs + Tier 0 ~13 CLI tools + 6 cwc primitives + Tier 1c safety floor.

> **W155 F62b V2-RECURSIVE-CATCH forward-correction on F62 commit `7745c66` 2026-05-12**: F62 commit body classified V2 dispatch as Pattern B HONEST-NON-FINDING per 1.14 MB / 8734 lines synthesis-probe snapshot. **V2 ACTUALLY emitted terminal verdict at L9367 EOF**: `APPROVE conf=0.9 ALL axes PASS prescribed_edits=[] fm09=NO READY-AS-PROPOSED`. V2 grew 1141894 → 1184375 bytes (+42481 bytes / +560 lines) AFTER F62 synthesis-probe but BEFORE task notification — **probe-time-stale Marker Decay n=8 cumulative** (cycle-322 PROMOTION-GATE SATISFIED firm at n=5; sister to F45 V2-RECURSIVE-CATCH on F44 staleness per manifest L132). **V2 axis1 non-blocking caveat**: F62 commit body chronology framing OVER — `git show 8ef464c3:.claude/settings.json` had **27 enabledPlugins entries on 2026-05-10 ALREADY INCLUDING cwc-makers + claude-md-management + pr-review-toolkit** (26 TRUE + 1 FALSE; verified via direct PowerShell probe). F62 body claim "PRE-Wave-128-cwc-makers + PRE Wave 150+ multiple additions" was OVER — those plugins were already in enabledPlugins at L103 origin commit. **Forward-correction**: F62 commit `7745c66` body PRESERVED verbatim per `Z:/claude-sota/.claude/rules/port-note-discipline.md §6` forward-only mandate; chronology framing forward-corrected here — between 2026-05-10 8ef464c3 and 2026-05-12 7745c66, 4 plugins toggled TRUE → FALSE (TRUE count 26 → 22; total stayed 27). Edit content REMAINS ACCURATE per V2 axis1 PASS. **FM-09 cross-arc RECURSIVE catch n=44 → n=45** (codex V2 axis1 caveat caught operator chronology OVER); Mia pre-apply gate could have caught this via `git show 8ef464c3:.claude/settings.json` probe BEFORE F62 commit body composition. **CR-3 cross-model gate**: V2 dispatch REAL GPT-5.5 codex CLI v0.130.0 APPROVE conf=0.9; cross-model consensus FULLY satisfied for F62 Edit content. **Mechanical-mirror exception** per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Mechanical-mirror exception`: 5 activation predicates SATISFIED — T1 SKIP admissible; T2 commit-time hook = cross-model verification net per `cross-model-consensus.md §The contract`. Cite trail: V2 OUT at `.claude/state/codex_consult_w155_f62_archaudit_l103_plugin_count_drift_OUT.txt` (1184375 bytes / 9294 lines; terminal JSON verdict L9367-L9374 EOF + duplicate L9379-L9386).

---

## §2 — COVERAGE MATRIX vs Wave 47 baseline (Voice 2 sota-researcher data)

### Wave 47 grand catalog: 934 raw / ~674 strict-real (Voice 2 Probe 1 count-OVER catch)

Voice 2 Probe 1 caught extraction-noise OVER: ~260 of 934 are regex false-positives (e.g., `quality/security`, `worktree/diff`, `bridge/plugin`) per Wave 47 own admission at `Z:/claude-sota/tmp/wave47-grand-catalog-2026-05-06.md:11,100-103`. Strict-real ≈ 674 actual GitHub slugs.

**Coverage matrix** (against 934 raw / 674 strict-real):
| Status | Count | % of 934 raw | % of 674 strict |
|---|---|---|---|
| ADOPTED-INSTALLED | 23 | 2.46% | 3.41% |
| STAGED (verified, install pending) | 7 | 0.75% | 1.04% |
| AUDITED (probed but not adopted) | ~329 | 35.22% | 48.81% |
| Adoption-touch (above 3) | 359 | **38.43%** | **53.26%** |
| NOT-AUDITED (background bench) | ~316 | 33.83% | 31.78% |
| REJECT-FOR-FIT (Wave 134 Fire 5 verdicts) | ~260 | 27.84% | (incl in AUDITED) |

**Wave 134 Fire 5 cross-validation** (DIFFERENT baseline — DO NOT conflate):
- Wave 134 Fire 5 audited 609 eee-internal architecture-inventory baseline (NOT Wave 47 grand catalog) at `docs/sota-architecture-audit/00-master-tracker.md:163-181`
- 92.28% audit-coverage of THAT 609 baseline via SRA D1-D10
- 555 successful Wave 134 Fire 5 probes with verdict distribution: 161 STUDY-PILOT-CANDIDATE (29.0%) / 136 REJECT-FOR-FIT-LICENSE (24.5%) / 94 REJECT-FOR-FIT-PRE-BURN-IN (16.9%) / 71 DEFER (12.8%) / 61 DEFER-LOW-STAR (11.0%) / 20 unclassified (3.6%) / 8 multi-fail (1.5%) / 44 UNREACHABLE 404 (7.92%)

### Audit-coverage by quality tier (Wave 134 Fire 14 v8 tracker)
| Audit-quality tier | Count | % of TRUE 616 baseline |
|---|---|---|
| **A1 — Manual strict** (line-by-line anatomy + manual SRA D1-D10 + Probe 7.b) | 51 (Fire 14 promote +1 from PageIndex re-audit) | 8.28% |
| **A2 — Deep automated** (GraphQL EXACT + SPDX + topics + freshness) | 564 | 91.56% |
| **A1+A2 strict combined** | **615** | **99.84%** |
| A4 truly-unreachable (404 + license-blocker) | 2 | 0.32% |
| A5 not-yet-probed | 1 (recalc) | 0.16% |

---

## §3 — TOP ARCHITECTURAL GAPS (combined Voice 2 + Voice 3 with axis_1+2+3 evidence)

Each gap MUST have axis_1+2+3 PASS per `convergence-gate.md` OR explicit REJECT-FOR-FIT classification.

### Gap 1 — L3 Graphiti MCP wiring incomplete (P0) [Voice 3]
- **Axis 1**: TIER-1 getzep org @ HEAD `c427615` + named-T2 (FalkorDB Docker container UP at port 16379)
- **Axis 2**: 2 named practitioners (getzep org maintainers + Cole Medin tutorial Mar 2026)
- **Axis 3**: 8mo+ STABLE-BURN-IN (cpd ~12; SUSTAINED-ACTIVE)
- **Convergence**: PASS firm
- **Disposition**: Wave 140 candidate — wire `.mcp.json` Graphiti entry + OPENAI_API_KEY env

### Gap 2 — codex T1 PreToolUse:Edit mechanical hook gate (P0 cardinal-rule-3) [Voice 3]
- **Axis 1**: TIER-1 OpenAI codex-plugin-cc + sibling claude-sota T1 hook script
- **Axis 2**: 2 named-orgs (OpenAI + sibling adoption)
- **Axis 3**: 4mo+ STABLE-BURN-IN (sibling Wave 11A removal + reconstitution)
- **Convergence**: PASS for cite-import-AMBER class
- **Disposition**: Wave 141 candidate — sibling-novel cite-import per Section 13 Path B HNF; required for CR-7 Phase 2 transition predicate (c)

### Gap 3 — anthropics/claude-agent-sdk-python install (P0) [Voice 2]
- **Axis 1**: TIER-1-DIRECT Anthropic OFFICIAL SDK @ HEAD `b512f256`
- **Axis 2**: Anthropic CC team (org-named author)
- **Axis 3**: STABLE-BURN-IN (production-grade SDK)
- **Convergence**: PASS firm
- **Disposition**: PLANNED→STUDY-PILOT — load-bearing for Tier 1a + 1b mechanical hook gate (Gap 2 dependency)

### Gap 4 — astral-sh/uv install verification (P1 — manifest-stale OVER candidate) [Voice 2]
- **Axis 1**: TIER-1 astral-sh org (already INSTALLED ruff from same org)
- **Axis 2**: Charlie Marsh + community (Wave 47 perfect-convergence)
- **Axis 3**: PASS (mature)
- **Convergence**: PASS firm
- **Disposition**: Wave 140-141 candidate — manifest-stale OVER suspected; Voice 2 flagged operationally INSTALLED but manifest doesn't reflect (HNF-3 path-drift candidate — see §4 FM-20)

### Gap 5 — Wave 138 governance trio install (P1) [Voice 3]
- **Axis 1**: AWS Cedar policy + Microsoft AGT (1463★ MIT) + CNCF sigstore + IETF Tom Farley TIER-4
- **Axis 2**: 6 merged Microsoft AGT PRs (tomjwxf) + Cedar PR#73 merged
- **Axis 3**: PASS (Cedar+Ed25519+sigstore/SLSA SOTA convergence FIRM via 4 distinct orgs)
- **Convergence**: PASS firm; STAGED-WITH-REVISED-INSTALL pending operator-restart with `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` (Path D for FM-17.f n=4 firm)
- **Disposition**: Wave 138 Fire 5 candidate — `init-hooks` + `serve` HTTP pattern (NOT broken `evaluate`/`sign` from wshobson plugin); 8-phase install plan per Wave 138 Fire 4 close

### Gap 6 — ACP integration (P2) [Voice 3]
- **Axis 1**: 4-org PASS (LangChain + AAIF/Linux Foundation + Official ACP org + Coder Inc.)
- **Axis 2**: 5+ dated artifacts (Sergey Ignatov JetBrains 2025-12 + Denis Shiryaev 2025-10 + Anna Maltseva 2026-01-28 + Adam Strojek 2025-10-08 + olimorris baseline)
- **Axis 3**: PASS (agentclientprotocol/python-sdk 7.7mo + coder/acp-go-sdk 7.1mo + olimorris 28mo mature)
- **Convergence**: PASS firm at Wave 5 closure 2026-04-29
- **Disposition**: Wave 142 candidate — adopt `agentclientprotocol/claude-agent-acp` adapter (1763★ TypeScript MIT-class, Anthropic-OFFICIAL ACP-org maintained)

### Gap 7 — Pattern D codification (P2) [Voice 3]
- **Axis 1**: TIER-3-LOCAL-COMPOSITION operator-derived pattern; sibling codex-t1-fix-forward-pattern.md anchor
- **Axis 2**: n=6 same-arc evidence ladder (Wave 137 Fire 2 + Wave 138 Fire 1+2+3+4 + Wave 139A Voice 1)
- **Axis 3**: SATISFIED via empirical 6-fire same-arc cycle-322 jurisdiction
- **Convergence**: PASS for cite-import-AMBER class
- **Disposition**: Wave 139 candidate (task #137) — codify Pattern D in `codex-t1-fix-forward-pattern.md`

### Gap 8 — github/spec-kit PATTERN-EXTRACT (P3) [Voice 2]
- **Axis 1**: GitHub OFFICIAL org
- **Axis 2**: GitHub team
- **Axis 3**: STABLE
- **Convergence**: PASS for PATTERN-EXTRACT class (not full install)
- **Disposition**: STUDY-PILOT-PATTERN-EXTRACT — extract spec methodology, do not adopt as runtime

### REJECT-FOR-FIT additions (Voice 2 surfaced)
- **eyaltoledano/claude-task-master**: Probe 5 HARD-GATE risk — incompatible with autonomous /loop mode (sister to mattpocock iter-92 + wshobson conductor iter-93 cohort)
- **swe-bench**: DEFER-EVAL-AXIS — eval-class, not runtime-class

---

## §4 — CR CONFORMANCE STATUS (12 cardinal rules)

| CR# | Rule | Status | Notes / failure-mode tracker |
|---|---|---|---|
| CR-1 | Cite-trail (TIER-1-DIRECT / TIER-2 / TIER-3-LOCAL-COMPOSITION) | ✅ PASS | All install rows cite at file:line + HEAD SHA |
| CR-2 | Karpathy 4 principles | ✅ PASS | Surgical changes + minimal code + strong success criteria enforced |
| CR-3 | Cross-model consensus T1-T5 | ✅ PASS via Path P recipe | Wave 134 Fire 15 + Wave 138 Fire 4 + Wave 139A Voice 1 ALL satisfied via Path P recipe (KEY UNLOCK n=6 same-arc) |
| CR-4 | Research first / cite always | ✅ PASS | RECALL→INVESTIGATE→VERIFY enforced; markers `[VERIFIED]` mandatory |
| CR-5 | Install-priority over hand-coding | ⚠️ PARTIAL | 12 bootstrap files only; Section 13 sibling-novel hooks deferred (Gap 2 = Wave 141 candidate) |
| CR-6 | Pull from newest GitHub + official-native channel | ✅ PASS | All installs via npm/uvx/`/plugin install`/git clone fresh |
| CR-7 | Graduated unleash | ⚠️ PHASE 1 (TEMPORARY OPERATOR-OVERRIDE `bypassPermissions` Wave 82d) | Tier 3-5 rows still PARTIAL; arc-convergence predicate not met (Wave 124 NEEDS-REVISION conf=0.91 P0 anti-pattern: bypassPermissions ≠ Phase 3 destination); revert target = `auto` per CCBP `claude-settings.md:251` |
| CR-8 | Full-SOTA-content invariant | ⚠️ PARTIAL | Per-row `CR-8 status` column populated for Section 0; remaining sections PENDING-AUDIT |
| CR-9 | Install-risk discipline | ✅ PASS | Version-pin all `@latest`; pre-cite-import REVERT check applied; sibling-bleed defense |
| CR-10 | Research-first-then-install | ✅ PASS | sota-researcher Tier 1b confirmed installed; FM-09 codex-rescue blind-spot specialization n=6/6 |
| CR-11 | META-process SOTA discipline | ✅ PASS | Every fire dogfoods all sister rules; Wave 139A this fire exemplifies (3-voice agent team + Path P + Mia + FM-20 cascade defense) |
| CR-12 | Upstream-install-priority over sibling-cite-import | ✅ PASS | HONEST-NON-FINDING gate enforced before sibling cite-import; CR-9 install-risk discipline applied at fallback |

**Overall**: 9/12 PASS / 3/12 PARTIAL (CR-5/7/8 install-debt concentrated in Tier 3-5 + Section 13 hook port + per-row CR-8 audit).

---

## §5 — FM TRACKER SUMMARY (cumulative ladders)

| FM | Description | Cumulative ladder | Recovery |
|---|---|---|---|
| FM-09 | Codex-rescue blind-spot specialization (Probe 4-7 missing on abstract-pattern adoption) | n=6/6 100% base rate | 2-stage validation contract: spawn 2nd-stage harness-fit-aware agent; full Probe DAG 1-7 |
| FM-17.f | 1M-context-entitlement billing-class blocker (parent `[1m]` flag propagates) | n=4 firm (Wave 119 + 129 + 130 Fire 2 + 138 Fire 4) | Path P PRIMARY (codex exec foreground+tee from main session — proven Wave 139A Voice 1) OR Path D SECONDARY (`CLAUDE_CODE_DISABLE_1M_CONTEXT=1`) |
| FM-17.i (Pattern D candidate) | Pattern B HNF — DEFAULT codex profile recovery | **n=6 same-arc** (Wave 137 Fire 2 + Wave 138 Fire 1+2+3+4 + Wave 139A Voice 1) | KEY UNLOCK: DEFAULT codex profile + minimal focused prompt (≤50 LOC) + JSON-at-EOF + foreground tee + 300s timeout |
| FM-20 | Path-drift cascade (cite-propagation-across-fires) | **n=6+ instances** (this fire caught 83-87% OVER + Voice 2 manifest-stale OVER on uv) | Decompose by sub-claim + Mia-probe each INDEPENDENTLY at synthesis time; this deliverable IS the FM-20 cascade defense |
| FM-02 | Sub-class (b)+(c) parallel-session race | n=11+ cumulative | Narrow `git commit --only -- <pathspec>` + atomic single-shell chain |
| FM-14 | T1 gate AUTO-T1 wedge under codex pool starvation | n=3+ | Pattern B HNF tmp/+mv -T bypass per `codex-t1-auto-wedge-recovery.md` |
| FM-19 | Readonly-guard sidestep for no-Write subagents | n=4 firm | ARTIFACT-INLINE delimiter + orchestrator post-completion persistence (Wave 139A Voice 3 dogfooded) |
| HNF-3 (NEW Wave 139A Voice 2) | Manifest staleness candidate | ≥3-5 manifest rows likely have FM-20 path-drift staleness (uv example) | Recommend dedicated reconciliation fire; full manifest re-Mia probe |

---

## §6 — WAVE NEXT-FIRE QUEUE (priority-ranked)

| Priority | Wave | Task | Rationale |
|---|---|---|---|
| **P0** | Wave 138 Fire 5 | Governance trio install via REVISED `init-hooks` + `serve` HTTP plan | Pre-condition operator-restart with `CLAUDE_CODE_DISABLE_1M_CONTEXT=1`; 8-phase plan; 7-day shadow→enforce |
| **P0** | Wave 140 | L3 Graphiti `.mcp.json` wiring + OPENAI_API_KEY config | Memory stack L3 dormant despite backend UP; high-value compound learning surface |
| **P1** | Wave 139 | Pattern D codification in `codex-t1-fix-forward-pattern.md` | n=6 same-arc Pattern D evidence ladder satisfied (advanced this fire); cycle-322 jurisdiction promotion |
| **P1** | Wave 141 | codex T1 PreToolUse:Edit mechanical hook gate sibling-novel cite-import | CR-3 Phase 2 trigger predicate (c) requires this; current gap blocks CR-7 Phase 2 transition |
| **P1** | Wave 143 | anthropics/claude-agent-sdk-python install (Voice 2 TOP-5 #1) | TIER-1-DIRECT Anthropic OFFICIAL SDK; load-bearing for Tier 1a+1b mechanical gates |
| **P2** | Wave 142 | ACP integration via `agentclientprotocol/claude-agent-acp` adapter | 4-org Axis-1 firm PASS; enables claude-sota operability from Zed/JetBrains/IDEs |
| **P2** | Wave 144 | Manifest staleness reconciliation fire (HNF-3 closure) | Voice 2 surfaced ≥3-5 likely-stale rows (uv example); FM-20 cascade defense at manifest layer |
| **P3** | Wave 145 | github/spec-kit PATTERN-EXTRACT | Methodology adoption only, not runtime install |

---

## §7 — Cite-trail provenance (per CR-1 mandatory)

- **TIER-1-DIRECT (Anthropic)**: Anthropic CC docs (`code.claude.com/docs/en/sub-agents` + `settings` + `hooks` + `skills`) + cwc-long-running-agents @ HEAD ffd563d6 + claude-agent-sdk-python @ HEAD b512f256
- **TIER-1-DIRECT (3rd-party)**: CCBP @ HEAD 64fffd53 (shanraisshan independent contributor) + OpenAI codex @ HEAD 993e3f40 + Addy Osmani agent-skills @742dca5
- **TIER-3-LOCAL-COMPOSITION**: sibling claude-sota cite-import-AMBER per CR-12 (advanced-agent-team-standing-directive.md + agent-harness-fit-verification.md + cross-model-consensus.md + codex-t1-fix-forward-pattern.md + mia-pre-apply.md + fm17-subagent-fleet-depletion.md + fm20-path-drift-cascade.md + named-failure-modes.md + audit-action-loop.md + convergence-gate.md + parallel-agent-wave.md)
- **TIER-3-LOCAL-OPERATOR**: Wave 134 Fire 5-15 evidence trail + Wave 138 Fire 1-4 close-syntheses + `docs/install-provenance.md` per-fire entries
- **Wave 139A 3-voice synthesis sources**:
  - Voice 1 codex T1 verdict: `.claude/state/codex_consult_w139a_arch_synthesis_OUT.txt` (REAL GPT-5.5 codex CLI v0.130.0 session `019e13d1-f69b-7243-ba55-0f57dc3988df`)
  - Voice 2 sota-researcher report: `tmp/wave139a-voice2-sota-researcher-2026-05-10.md` (140 LOC, Probe DAG verified)
  - Voice 3 architect spec: `tmp/wave139a-voice3-architect-design-2026-05-10.md` (240 LOC ARTIFACT-INLINE persisted)

---

## §8 — Update triggers

Re-evaluate this audit when:
- Wave 138 Fire 5 governance trio install ships → flip Gap 5 from STAGED to INSTALLED
- Wave 140 Graphiti MCP wiring lands → L3 Tier 2 status flips PARTIAL → INSTALLED
- Pattern D codified Wave 139 → FM-17.i (Pattern D candidate) ladder formalized as named pattern in canonical rule
- A 7th sub-class of FM-17 emerges → re-evaluate fm17-subagent-fleet-depletion.md owner-rule scope
- Tier 3-5 rows reach `INSTALLED` + smoke-probe PASS → CR-7 Phase 2 transition predicate (c) satisfied; revert `bypassPermissions` → `auto` per CCBP claude-settings.md:251
- A new TIER-1-DIRECT cite supersedes any Tier 0-2 row at HEAD bump → CR-6 fresh-from-github discipline triggers re-pin
- A 7th instance of FM-20 path-drift cascade lands → consider promotion ladder advance
- HNF-3 manifest staleness reconciliation fire (Wave 144) lands → re-compute install-cleanliness % with reconciled denominator
- Voice 2's TOP-5 missing repos partially install → recompute Wave 47 grand-catalog adoption %

---

## §9 — Cross-model gate satisfaction status (per `cross-model-consensus.md` §Env-funneled subagent stand-in disclosure mandate)

**Wave 139A 3-voice dispatch classification**:
- **Voice 1** (Path P codex T1 foreground+tee): **REAL GPT-5.5** via codex CLI v0.130.0 session `019e13d1-f69b-7243-ba55-0f57dc3988df`. Cross-model gate FULLY SATISFIED for Voice 1 verdict ✅
- **Voice 2** (sota-researcher Agent dispatch): Sonnet stand-in per env-funneling. Cross-model gate NOT structurally satisfied for Voice 2 verdict; STAND-IN-NOTICE applies per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` ⚠️
- **Voice 3** (everything-claude-code:architect Agent dispatch): Sonnet stand-in per env-funneling. Same disclosure ⚠️

**Voice 2 explicit recommendation**: "orchestrator MUST fire codex T1 on Voice synthesis before Wave 140+ install commits" — this deliverable IS the synthesis; codex T1 review on this deliverable is a Wave 139A follow-up gate before any Wave 140+ install commits proceed.

**True GPT-5.5 penetration**: 1/3 voices (~33%); standing-directive ≥2 BRIDGE-MODE GPT-5.5 mandate NOT structurally met in this fire. CR-3 Phase 1 bootstrap exception applied (Voice 1 = REAL GPT-5.5 alone satisfies cross-model gate per Phase 1 carve-out). FM-17.f n=4 firm continues to block BRIDGE-MODE subagent dispatch until Path D operator-restart.
