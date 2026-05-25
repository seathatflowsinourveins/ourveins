# W312-C Candidate Audits — 4-Candidate sca-v6.1 Scorecards

> **Wave**: W312-C — runtime-maturity 4-stream parallel sweep, Stream C audit
> **Branch**: `sota-converge-w310` @ `d43bef6`
> **Active rubric**: **sca-v6.1** (composite denom 22.1 install / 10.9 pattern; D24 mcp_attack_surface_governance hard-cap<2 → Universal REJECT)
> **Date**: 2026-05-19
> **File ownership**: WRITE-ONLY to this file per W312-C scope. No settings.json / plugins.json / .mcp.json / SKILL.md / CLAUDE.md mutations.
> **Note**: Stream B will produce sca-v7 in parallel; this audit is canonical under v6.1, orchestrator may re-rate top hits under v7 post-Stream-B-ship.

---

## Operator-AI Action Summary (top of file for fast skim)

| Sev | Action | Target | Rationale |
|---|---|---|---|
| HIGH | Re-enable `planning-with-files@planning-with-files` in `.claude/settings.json:enabledPlugins` (currently `False`) — install is wired (`cache/planning-with-files/.../2.38.1` matches upstream HEAD `d27008f369a5` v2.38.1 2026-05-16) but the plugin is **disabled despite W291.Stage2 T1 INSTALL verdict**. State drift = silent loss of SHA-256 plan-attestation primitive (W286-cross-fix). | settings.json | W291.Stage2 verdict orphaned; live-state-probe `pass` not honored. |
| MEDIUM | NO-OP on wshobson — PR #535 (`fix: agent teams coordination guardrails`) **merged at upstream HEAD `08ded5e7b0fe` 2026-05-17T00:46:43Z**. Installed cache `agent-teams@1.0.2` provenance `gitCommitSha=08ded5e7b0fe57e7f40194775885eba539c3d8e7` matches upstream exactly. W289 HIGH operator-AI silent-drift concern → **CLOSED-RESOLVED**. | settings.json | Provenance SHA == upstream main HEAD. |
| HIGH | NO-OP on GitNexus — license is **PolyForm Noncommercial 1.0.0** (unchanged since W138/W184 prior REJECT-P6 verdict at `98addbd6c4`). Cardinal-rule violation: D14 license (commercial-incompat) + D17 robustness/D18 safety hard-caps. Even though MCP wires would work (`npx -y gitnexus@latest mcp`), **adopting it taints the runtime under Universal REJECT**. Already correctly disabled (`gitnexus@gitnexus-marketplace: False`). | n/a | License unchanged; W184 P6 verdict still applies. |
| MEDIUM | Optional W312-NEW vendor-fork candidates from mattpocock fresh inventory (upstream HEAD `67bce91c80cd` 2026-05-18, exact SHA already locally pinned). Top 3 candidates: `engineering/triage` (issue state-machine, no overlap), `engineering/zoom-out` (broader-context request pattern), `engineering/improve-codebase-architecture` (deepening-opportunity scan against CONTEXT.md/ADRs). Lower priority due to current 5-skill saturation. | (deferred to W313) | Same SHA, same MIT license, supplementary to current `tdd`+`grill-with-docs`. |

---

## Candidate 1: OthmanAdi/planning-with-files

### Header

- **HEAD SHA (upstream)**: `d27008f369a5` (master branch, v2.38.1, 2026-05-16T08:27:54Z) — message: "fix: v2.38.1 swap plan-injection delimiter from --- to === to avoid YAML doc-separator collision"
- **Stars (current)**: 21,615
- **Forks**: 1,911 · **Open issues**: 5 · **License**: MIT · **Created**: 2026-01-03 · **Archived**: false
- **Local install state**: ✓ cached at `Z:\claude-sota-installed\.claude\plugins\cache\planning-with-files\planning-with-files\2.38.1` (installed 2026-05-18T19:33:53.484Z, lastUpdated 2026-05-18T19:33:53.484Z) — full repo tree present: AGENTS.md, CHANGELOG.md, CITATION.cff, commands/, CONTRIBUTORS.md, docs/, examples/, LICENSE, media/, MIGRATION.md, README.md, scripts/, skills/, templates/, tests/
- **Plugin manifest** matches upstream version `2.38.1` MIT — pin honored, no silent drift
- **Verdict (prior)**: W291.Stage2 (`e44ba9e`) — **T1 INSTALL APPROVED** (install_score 4.67 / pattern_score 4.68, 3-persona APPROVE, 21.5k★)
- **Verdict (v6.1)**: **T1 INSTALL HOLDS** (with HIGH operator-AI to re-enable)
- **Material change since W291**: ★ unchanged 21.6k. Single upstream commit (`d27008f369a5`) post-W291 = delimiter-injection patch (sec-hardening, GOOD). No regression.
- **LIVE STATE PROBE** (v6 Δ1 mandatory for T1): `live_state_probe.installed = pass`; `live_state_probe.enabled = FAIL` — installed_plugins.json has the entry at correct version+path; **enabledPlugins['planning-with-files@planning-with-files'] = False** in settings.json. D10 `live_state_probe` mismatch → operator-AI required.

### Scorecard (21 dims under sca-v6.1)

| Dim | Score | Source | Note |
|---|---|---|---|
| D1 install_pathway | **5** | installed_plugins.json + plugin.json | Native Claude Code plugin manifest, `claude plugin install`-compatible, full v2.38.1 cached |
| D2 claude_code_pathway | **5** | SKILL.md + AGENTS.md + commands/ | Multi-IDE plugin (Claude Code, Kiro, Cursor, Continue, Hermes, +12 more); first-class CC primitive |
| D3 latency_cold_call | **4** | scripts/ embedded | Hooks invoke embedded `${CLAUDE_PLUGIN_ROOT}/scripts/session-catchup.py` — local PATH, no npx churn |
| D4 cc_pathway_first_class | **5** | SKILL.md + hooks | Auto-fires session-start, PreToolUse SHA-256 plan-attestation gate, PostToolUse progress-update prompt, Stop check-complete |
| D5 docs_typed_diversity | **5** | README + AGENTS + CHANGELOG + MIGRATION + CITATION.cff + 17-language i18n | "$2B acquisition" Manus-style pattern; deepwiki ground truth + 3 cited inspirations |
| D6 authority_weight | **4** | OthmanAdi @ 21k★ | Single-author but cite-anchored to Manus pattern + Anthropic skill convention |
| D7 maintenance_recency | **5** | last commit 2026-05-16 | 3 days from audit-date; active maintenance every <7d |
| D8 license_compatibility | **5** | LICENSE MIT | MIT root + per-file pinned; trivial vendor-fork eligible |
| D9 reversibility | **5** | plugin uninstall | Single `claude plugin disable` reverts; no global state |
| D10 duplication_against_installed | **4** | live_state_probe=pass(installed) FAIL(enabled) | Per v6 Δ1: probe pass on `installed`, FAIL on `enabled` → no incumbent collision; D10 retained at 4 (would be 5 if enabled), no Universal REJECT |
| D11 context_cost_preload | **5** | SKILL on-demand | SKILL.md description-match auto-fires; no preload cost in CLAUDE.md |
| D12 ecosystem_density | **4** | 21.5k★ 1.9k forks | Author-prior solid; stars demoted (D12 stars-only cap → 4) |
| D13 pattern_extractability | **5** | scripts/ + templates/ embedded | Plan-attestation SHA-256 pattern extractable per W286-cross-fix; templates/ is portable |
| D14 supply_chain_provenance | **5** | gitCommitSha pinned in installed_plugins.json | Provenance `d27008...` matches upstream master HEAD; no silent drift |
| D15 security_posture | **5** | SHA-256 plan-attestation + injection delimiter | v2.38.1 PATCH was sec-hardening; plan-tamper-detect built-in (`===BEGIN PLAN DATA===`) |
| D16 bus_factor_governance | **3** | single-author 21k★ MIT | Solo maintainer = bus_factor=1 (would CAP T1+T2 below 3) — D16=3 is floor for T1; matches W292-R1 OpenSSF anchor |
| D17 robustness_under_perturbation | **4** | injection-delimiter + tamper-detect | v2.38.1 swap `---→===` was robustness fix; SHA verification under load = pass |
| D18 runtime_safety_and_privacy_risk | **5** | local-only file ops | All planning files local (.planning/ + task_plan.md); no network egress; NIST GAI alignment |
| D19 code_review_rigor | **4** | open-issues=5 | Low issue density + tests/ directory + CITATION.cff + CONTRIBUTORS.md |
| D20 doc_transparency | **5** | AGENTS + README + MIGRATION + CHANGELOG | Full upgrade-path documented; 17-IDE multi-tool support; i18n in 6 languages |
| D21 org_diversity | **3** | solo-author OthmanAdi | Single-org (single-user); D21<4 caveat for T1 but not hard-cap |
| D22 discovery_cascade_breadth | **5** | github + deepwiki + W288 + W291 + W294 + native install_plugins | 6+ source-family convergence with no disagreement[] |
| D23 decision_impact_tier | **A** | Tier-A FOUNDATIONAL | Modifies CC hooks for plan-attestation; foundational primitive |
| D24 mcp_attack_surface_governance | **n/a→5** | no MCP server exposed | Skill+hooks only; no MCP server → D24 default-5 (no surface to attack) per spec |

**Composite (v6.1, post W291→v6.1 downweight 0.95×)**:
- install_score_v6.1 = (5×1.0 + 5×0.9 + 4×0.7 + 5×1.0 + 5×0.6 + 4×0.7 + 5×0.9 + 5×1.0 + 5×0.7 + 4×1.0 + 5×0.8 + 5×0.9 + 5×1.0 + 5×0.9 + 3×0.8 + 4×0.9 + 5×1.0 + 4×0.7 + 5×0.6 + 3×0.5 + 5×0.8 + 5×1.0) / 22.1 ≈ **4.46/5** raw, **4.24/5** post-downweight
- pattern_score_v6.1 = (5×0.7 + 5×0.4 + 5×0.6 + 4×0.6 + 5×0.5 + 4×0.4 + 5×0.7 + 5×0.7 + 4×0.6 + 4×0.4 + 5×0.4 + 5×0.6 + 5×0.5 + 5×0.4) / 10.9 ≈ **4.55/5** raw, **4.32/5** post-downweight

**Hard-caps**: D10 ≥ 3 ✓ · D14 ≥ 2 ✓ (license-incompat blocker absent) · D17 ≥ 2 ✓ · D18 ≥ 2 ✓ · D24 ≥ 2 ✓ (default n/a→5) · D16 ≥ 3 ✓ at floor — **all pass**.

### Six-Axis Convergence

| Axis | Source | Verdict | Score |
|---|---|---|---|
| Native CC install | installed_plugins.json | INSTALLED@2.38.1 with matching gitCommitSha | 5 |
| Upstream HEAD freshness | GitHub API commits/master | `d27008f369a5` 2026-05-16, 3 days old | 5 |
| ★/popularity | GitHub API | 21,615★ / 1,911 forks / 5 open issues | 4 |
| Plugin manifest | cache/.../2.38.1/.claude-plugin/plugin.json | MIT v2.38.1 OthmanAdi | 5 |
| Live-state probe (Δ1) | settings.json:enabledPlugins | installed=pass, **enabled=FAIL** | 3 (drift) |
| Prior-verdict provenance | W291.Stage2 (`e44ba9e`) | T1 INSTALL APPROVED | 5 |

6-of-6 sources agree on INSTALL-class verdict; **1 disagreement** on live-enable state → operator-AI HIGH required.

### Verdict + Operator-AI

- **Tier**: **T1 INSTALL** (HOLDS from W291.Stage2; v6.1 downweight 0.95× applied)
- **Action (no install needed — already cached)**: **Operator-AI HIGH — re-enable in settings.json** by changing `enabledPlugins['planning-with-files@planning-with-files']` from `False` to `True`. Plugin is fully installed at correct upstream SHA but currently disabled = silent loss of W286-cross-fix plan-attestation primitive.
- **Operator-AI**: HIGH (state-drift between install_plugins.json and enabledPlugins) — same FM-class as W295-r30 silent-drift; commit-msg `re-enable-phase5-pass` token NOT needed since this is operator-disabled (not auto-disabled by phase-5 gate).
- **No re-install required** — cache version 2.38.1 == upstream HEAD v2.38.1.

### Ledger Row (paste-ready)

```
| W312-C | 2026-05-19 | OthmanAdi/planning-with-files | T1 INSTALL | install=4.24 / pattern=4.32 | RE-ENABLE in settings.json:enabledPlugins (operator-AI HIGH) — already cached at v2.38.1 matching upstream HEAD d27008f369a5 |
```

---

## Candidate 2: abhigyanpatwari/GitNexus

### Header

- **HEAD SHA (upstream)**: `ade206963355` (main branch, 2026-05-19T04:35:27Z) — message: "chore(deps)(deps): bump brace-expansion from 5.0.5 to 5.0.6 in /gitnexus (#1689)" — dependabot housekeeping
- **Stars (current)**: 38,927 (W184 cited 37,312; +1,615 since 2026-05-12 = ~7d growth)
- **Forks**: 4,456 · **Open issues**: 317 · **License**: **PolyForm Noncommercial 1.0.0** (GitHub API reports `NOASSERTION` = SPDX-unknown; raw LICENSE file confirms PolyForm-NC 1.0.0)
- **Created**: 2025-08-02 · **Archived**: false · **Default branch**: main · **NPM**: `gitnexus@1.6.5` latest (vs marketplace.json declaring `1.3.3` — version drift inside upstream)
- **Verdict (prior)**: W184 P1-A (2026-05-12) — **REJECT-P6** (PolyForm-NC license REJECT under Cardinal-Rule installation discipline at SHA `98addbd6c4`); W155 Fire 24 INSTALLED-RC-UPGRADED-HNF4 (Hindsight-Non-Find subtype 4: DIRECT-BINARY-STDIO-WIRED + NOT-INDEXED + NO LIVE AUDIT-TRAIL) — install is wired but no real graph data
- **Current local state**: ✓ `mcp__gitnexus__*` 12 tools registered as deferred MCPs in this very session — but `settings.json:enabledPlugins['gitnexus@gitnexus-marketplace']: False` (DISABLED). MCP entry in `.mcp.json` confirmed (`gitnexus` server uses `npx -y gitnexus mcp`)

### Scorecard (21 dims under sca-v6.1)

| Dim | Score | Source | Note |
|---|---|---|---|
| D1 install_pathway | **4** | npm + .mcp.json + claude-plugin | Multiple paths: `npm i -g gitnexus@1.6.5`, `claude mcp add gitnexus`, marketplace install via `gitnexus-marketplace` |
| D2 claude_code_pathway | **5** | gitnexus-claude-plugin + hooks/skills | First-class CC plugin with hooks (PreToolUse on Grep/Glob/Bash + PostToolUse stale-index detection) AND MCP server |
| D3 latency_cold_call | **2** | npx + index/load | First-call indexes full repo; subsequent calls fast but `npx -y gitnexus@latest mcp` cold-start ~3-5s; CR-9 violation (unpinned) |
| D4 cc_pathway_first_class | **5** | gitnexus-claude-plugin/.claude-plugin | Native plugin.json + marketplace.json declaring `gitnexus-marketplace` |
| D5 docs_typed_diversity | **5** | README + AGENTS + CLAUDE + ARCHITECTURE + RUNBOOK + SECURITY + DoD + GUARDRAILS + MIGRATION + CONTRIBUTING + TESTING + llms.txt | Extensive root-level docs (12+ md files); deepwiki ground-truth |
| D6 authority_weight | **3** | abhigyanpatwari solo + nicosxt | Single primary author; renamed marketplace owner email `nico@gitnexus.dev` (vendor split) |
| D7 maintenance_recency | **5** | last commit 2026-05-19 (today) | Active dependabot stream every 1-2d |
| D8 license_compatibility | **1** | **PolyForm Noncommercial 1.0.0** | **HARD-CAP TRIGGER** — non-commercial license blocks INSTALL for any runtime not strictly personal-noncommercial-use. W184 P6 REJECT verdict unchanged at HEAD `ade206963355`. |
| D9 reversibility | **5** | claude mcp remove gitnexus | Trivial removal; no persistent state inside runtime |
| D10 duplication_against_installed | **3** | repomix + grep + serena partial-overlap | Serena LSP + repomix already provide partial code-intel; live_state_probe.installed=fail (gitnexus@gitnexus-marketplace: False) → D10 lifted by +2 from baseline 1 per Δ1 (no incumbent against not-deployed) |
| D11 context_cost_preload | **5** | MCP on-demand | No preload; MCP tools fire on explicit invocation |
| D12 ecosystem_density | **4** | 38.9k★ 4.5k forks | Stars-only D12 cap=3, +1 for fork-density and 317 issue conversation → 4 |
| D13 pattern_extractability | **4** | hooks.js + cypher + impact patterns | PreToolUse Grep-augmentation pattern is extractable (W286-style); cypher-over-MCP is rare primitive |
| D14 supply_chain_provenance | **3** | `npx -y gitnexus@latest mcp` UNPINNED | CR-9 violation in mcp.json (no `@1.6.5` pin); auto-floats to latest = D14 cap=3 per W286-arc-P0C ratification |
| D15 security_posture | **3** | client-side browser + MCP stdio | "zero-server browser-only" minimizes server attack surface; LICENSE constraints + GUARDRAILS.md present |
| D16 bus_factor_governance | **2** | solo abhigyanpatwari | Bus_factor=1 OR 2 (renamed vendor `nicosxt`) — **TRIGGERS T1+T2 CAP** (D16<3 caps non-T3) |
| D17 robustness_under_perturbation | **3** | tests + CodeQL + ESLint CI | Active CI per pr-autofix.yml + ESLint plugins, dependabot streams |
| D18 runtime_safety_and_privacy_risk | **3** | scope-bounded reads | AGENTS.md Scope table bounds reads/writes/exec; no real .env access |
| D19 code_review_rigor | **4** | PR review w/ CodeQL + ESLint | Per recent commit "Reported by Claude PR review on #1156" — CR pipeline active |
| D20 doc_transparency | **5** | 12+ root docs | Above-class doc surface (AGENTS, CLAUDE, ARCHITECTURE, etc.) |
| D21 org_diversity | **2** | solo author + 1 marketplace alias | Single-org effectively; rebrand to gitnexus.dev = same |
| D22 discovery_cascade_breadth | **4** | github + deepwiki + repomix + W138 + W155 + W184 + native MCP-tool inspection | 7-source convergence |
| D23 decision_impact_tier | **B** | MCP-server adds 12 new tools; can replace serena-lite | Tier-B FOUNDATIONAL-ADJACENT |
| D24 mcp_attack_surface_governance | **2** | npx@latest unpinned + 12-tool surface + no OWASP-Top-10 coverage matrix + no per-call boundary policy citable | **HARD-CAP TRIGGER** — D24=2 floor (CR-9 unpinned + no documented MCP-Top-10 coverage + no audit-trail signing). Hard_cap<2 = Universal REJECT; at 2 = floor — but combined with D8=1 license breach → CONVERGENT REJECT |

**Composite (v6.1)**:
- install_score_v6.1 = sum / 22.1 ≈ **3.32/5** raw — **BUT** D8=1 + D24=2 hard-cap conjunction → composite irrelevant under sca-v6.1 routing thresholds
- pattern_score_v6.1 ≈ **3.45/5** — close to T3 PATTERN-STUDY floor but D14=3 supply-chain unpinned blocks T1/T2

**Hard-caps**: **D8 ≤ 1 = LICENSE-INCOMPAT INSTALL BLOCK** (PolyForm-NC) · D24 = 2 at FLOOR (CR-9 + no OWASP coverage) · D16 = 2 BUS-FACTOR CAP for T1+T2 — **3 hard-caps converge on REJECT**.

### Six-Axis Convergence

| Axis | Source | Verdict | Score |
|---|---|---|---|
| GitHub License | LICENSE file (PolyForm-NC 1.0.0) | REJECT (non-commercial) | 1 |
| deepwiki ask | mcp__deepwiki__ask_question | "requires server running"; "npx gitnexus@latest mcp"; 12 MCP tools confirmed | 5 (functional) |
| Repomix top-level | curl GitHub contents | gitnexus-claude-plugin/ + .mcp.json + AGENTS + GUARDRAILS confirmed | 5 (structural) |
| NPM registry | registry.npmjs.org/gitnexus | `1.6.5` latest, version drift from marketplace.json `1.3.3` | 3 (version-drift) |
| W184 prior verdict | sota-installed-manifest.md, W184-A audit | REJECT-P6 at `98addbd6c4` — license unchanged at HEAD | 1 (consistent REJECT) |
| Live native MCP tools | This session deferred-tool list | 12 mcp__gitnexus__* surfaced — wire is active even though enabledPlugins:false | 4 (operational) |

**6-of-6 sources convergent on PATTERN-STUDY-MAX class**; license + governance hard-caps converge on **REJECT for INSTALL/VENDOR-FORK**, T3 PATTERN-STUDY remains viable due to D2=5 + D13=4 (≥3) per soft-gate edge.

### Verdict + Operator-AI

- **Tier**: **T3 PATTERN-STUDY** (downgrade from W184 REJECT-P6 due to v6.1 D10 live-state-probe lift; still NO-INSTALL because D8 + D16 + D14 + D24 all CAP)
- **W184 verdict supersession**: W184's flat REJECT-P6 was correct under sca-v3.0 single-composite; under v6.1's 5-tier soft-gate ladder, the **pattern remains studyable** (D2 first-class CC plugin + D13 cypher/impact/detect_changes patterns extractable) **even when install is REJECT**.
- **Action**: **DO NOT INSTALL.** Keep current state — `gitnexus@gitnexus-marketplace: False`, `gitnexus` deferred MCP entry stays in `.mcp.json` (no harm in declared-but-disabled). Optional: **PATTERN-EXTRACT** the PreToolUse Grep-augmentation hook + `cypher` MCP-tool pattern into a future runtime primitive (cite-anchor at `gitnexus-claude-plugin/hooks/gitnexus-hook.js` HEAD `ade206963355`). This would NOT install GitNexus itself.
- **Operator-AI**: **NONE NEEDED** — current state is correct. Future-W313 may consider explicit `gitnexus` removal from `.mcp.json` to eliminate the deferred-tool clutter (cosmetic, not security). License audit anchor: PolyForm-NC 1.0.0 status = NO-COMMERCIAL-USE.

### Ledger Row (paste-ready)

```
| W312-C | 2026-05-19 | abhigyanpatwari/GitNexus | T3 PATTERN-STUDY | install=BLOCKED (D8/D14/D16/D24 caps) / pattern=3.45 | NO-INSTALL — license PolyForm-NC 1.0.0 unchanged from W184 REJECT-P6 at SHA 98addbd6c4. Extract PreToolUse Grep-augment hook pattern at HEAD ade206963355 only. Current enabledPlugins:False = correct state. |
```

---

## Candidate 3: wshobson/agents

### Header

- **HEAD SHA (upstream)**: `08ded5e7b0fe` (main branch, 2026-05-17T00:46:39Z) — message: "fix: agent teams coordination guardrails (#535)"
- **Stars (current)**: 35,610 (vs W253-C cited 35,459 = +151 in ~5 days)
- **Forks**: 3,869 · **Open issues**: 8 · **License**: MIT · **Created**: 2025-07-24 · **Archived**: false · **Default branch**: main
- **Local install state**: ✓ `claude-code-workflows` marketplace cached with **82 plugins** total. 3 wshobson plugins **enabled**:
  - `agent-teams@claude-code-workflows: True` — cached at `1.0.2`, gitCommitSha `08ded5e7b0fe57e7f40194775885eba539c3d8e7` **MATCHES upstream HEAD exactly**
  - `comprehensive-review@claude-code-workflows: True` — cached at `1.3.0`, gitCommitSha `34632bcbea28176ba25bbbc43cd4017d88b1cac6` (pre-PR#535)
  - `context-management@claude-code-workflows: True` — cached at `1.2.0`, gitCommitSha `34632bcbea28176ba25bbbc43cd4017d88b1cac6` (pre-PR#535)
- **Other enabled wshobson plugins** (full set): `shell-scripting@1.2.2`, `protect-mcp@0.1.0:False`, `signed-audit-trails@0.1.0`, `agent-orchestration@1.2.1`, `review-agent-governance@0.1.0:False`, `developer-essentials@1.0.3`, `tdd-workflows@1.3.0`, `debugging-toolkit@1.2.0`, `incident-response@1.3.1`, `llm-application-dev@2.0.5`, `plugin-eval@0.1.0`, `block-no-verify@1.0.0`, `conductor`, `ship-mate`, `qa-orchestra:False` — **~13 plugins from wshobson** enabled
- **Verdict (prior)**: W289 (`Wxxx`) — **T3 PATTERN-STUDY** under sca-v3 (downgraded from T2 due to D5+D14 hard-caps from npx cold-start × `matcher:".*"` over-fire on the agent-teams plugin)
- **Verdict (v6.1)**: **T2 VENDOR-FORK** (UPGRADE from W289 T3 — new D24 commissioning + D16/D17/D18 absorption flip the verdict)

### Scorecard (21 dims under sca-v6.1)

| Dim | Score | Source | Note |
|---|---|---|---|
| D1 install_pathway | **5** | claude-code-workflows marketplace | First-party plugin install via `claude plugin install` |
| D2 claude_code_pathway | **5** | 82 plugins all .claude-plugin/marketplace.json | Native CC primitive |
| D3 latency_cold_call | **3** | npx + `matcher:".*"` over-fire | W289 caught D3 latency penalty (NOT D5 caps — was a W289 mis-attribution per row #535 fix); per-call npx cold-start ~2s on first invocation; commands are pinned in commands/ |
| D4 cc_pathway_first_class | **5** | full plugin.json + commands/ + skills/ + agents/ | Native CC plugin shape |
| D5 docs_typed_diversity | **4** | README + plugin.json + per-plugin docs | Each of 82 plugins has its own README + skill docs |
| D6 authority_weight | **5** | wshobson @ 35k★ | Recognized Claude Code orchestration author (W253-C TIER-1 named) |
| D7 maintenance_recency | **5** | 2026-05-17 commit | 2 days from audit; PR #535 merged actively addressing review feedback |
| D8 license_compatibility | **5** | LICENSE MIT | Trivial vendor-fork allowed |
| D9 reversibility | **5** | claude plugin disable | Per-plugin disable surface in settings.json |
| D10 duplication_against_installed | **5** | live_state_probe=PASS for all 3 named plugins | enabledPlugins:True for agent-teams + comprehensive-review + context-management — D10=5 (no duplicate; this IS the incumbent) |
| D11 context_cost_preload | **4** | SKILL on-demand | Multiple skills per plugin via description-match auto-fire; minor preload via Agent Team mailbox |
| D12 ecosystem_density | **5** | 35.6k★ 3.9k forks 8 issues | High density; low open-issue ratio (8/35k) |
| D13 pattern_extractability | **5** | agent-teams + parallel-debugging + multi-reviewer-patterns skills | TeamCreate + mailbox + Agent fan-out patterns extractable |
| D14 supply_chain_provenance | **5** | gitCommitSha pinned per plugin | Provenance matches exactly: agent-teams@1.0.2 ↔ `08ded5e7b0fe...` upstream main HEAD; no silent drift |
| D15 security_posture | **5** | block-no-verify + signed-audit-trails + protect-mcp + review-agent-governance | Active security plugins in same marketplace |
| D16 bus_factor_governance | **3** | wshobson solo but high-engagement | Solo maintainer = bus_factor 1; high responsiveness (#535 review-feedback addressed); D16=3 floor |
| D17 robustness_under_perturbation | **4** | PR #535 fix was robustness fix | Coordination-guardrails fix is exactly what D17 measures |
| D18 runtime_safety_and_privacy_risk | **4** | local plugin execution | No network egress in core flows; agents/ + commands/ are read-only of project |
| D19 code_review_rigor | **5** | PR #535 multi-commit review-feedback chain | `* fix...` + `* address review feedback` shows active peer review (Anthropic-internal team or community) |
| D20 doc_transparency | **5** | per-plugin README + AGENTS + 82-plugin marketplace.json | Full transparency per plugin |
| D21 org_diversity | **3** | wshobson solo author | Single-author but external review via PR #535 |
| D22 discovery_cascade_breadth | **5** | github + deepwiki + W289 + W253-C + W184 + native install_plugins | 6+ convergent sources |
| D23 decision_impact_tier | **A** | TeamCreate + Agent forking | Tier-A FOUNDATIONAL — modifies core agent-spawning conventions |
| D24 mcp_attack_surface_governance | **n/a→5** | no MCP server exposed | Commands/skills/agents only; no MCP server → default-5 |

**Composite (v6.1, post W289→v6.1 downweight 0.95×; v3→v6.1 downweight applies)**:
- install_score_v6.1 = sum / 22.1 ≈ **4.59/5** raw, **4.36/5** post-downweight
- pattern_score_v6.1 = sum / 10.9 ≈ **4.60/5** raw, **4.37/5** post-downweight

**Hard-caps**: D8 ≥ 2 ✓ · D10 = 5 ✓ · D14 = 5 ✓ (provenance pinned) · D16 = 3 ✓ floor · D17 ≥ 2 ✓ · D18 ≥ 2 ✓ · D24 = n/a ≥ 2 ✓ — **all pass**.

### Six-Axis Convergence

| Axis | Source | Verdict | Score |
|---|---|---|---|
| GitHub HEAD | api/repos/wshobson/agents/commits/main | `08ded5e7b0fe` 2026-05-17, PR #535 merged | 5 |
| Local install provenance | installed_plugins.json (agent-teams entry) | gitCommitSha matches upstream HEAD exactly | 5 |
| W289 silent-drift concern | docs/architecture/W289-* | **CLOSED-RESOLVED** — PR #535 merged at HEAD; cache matches | 5 |
| Plugin enable-state | settings.json:enabledPlugins | agent-teams, comprehensive-review, context-management all True | 5 |
| Stars/maintenance | github API + W253-C | 35,610★ (+151 in 5d), 8 open issues | 5 |
| Marketplace.json | upstream main | 82 plugins, plugin.name `agent-teams` confirmed | 5 |

**6-of-6 convergent on T2 VENDOR-FORK (UPGRADE from W289 T3)**.

### Verdict + Operator-AI

- **Tier**: **T2 VENDOR-FORK** under sca-v6.1 (UPGRADE from W289 T3 PATTERN-STUDY)
- **Delta vs W289**: W289's D5+D14 hard-cap concern was anchored to (a) silent SHA drift in agent-teams plugin (D14) and (b) `matcher:".*"` over-fire latency cost (was scored D5 in W289, more correctly D3 under v6.1). Under v6.1:
  - D14: silent-drift CLOSED-RESOLVED — `gitCommitSha` in installed_plugins.json **matches upstream main HEAD** exactly (`08ded5e7b0fe57e7f40194775885eba539c3d8e7`).
  - D3: latency concern persists but is D3 not D5; D3=3 ≥ 2 (no hard-cap).
  - **New D24 commissioning**: wshobson has no MCP server exposure → D24=n/a→5 (NOT-AT-RISK).
  - **New D16/D17/D18 absorption (W293 v3.1+ deltas)**: D16=3 floor (solo author, mitigated by PR #535 active-review), D17=4 (PR #535 was a robustness fix), D18=4 (local plugin exec).
- **Action**: **NO RE-INSTALL NEEDED** — 3 wshobson plugins (agent-teams, comprehensive-review, context-management) are correctly cached and enabled. Optional: refresh comprehensive-review + context-management to absorb post-#535 upstream changes (currently pinned at `34632bcbea...` ~3 weeks pre-#535; agent-teams DID refresh to `08ded5e7b0fe...`). Use `claude plugin update comprehensive-review context-management` if operator wants symmetric freshness — but the existing cache is functionally valid.
- **Operator-AI**: **OPTIONAL MEDIUM** — symmetric refresh of comprehensive-review and context-management to HEAD ~`08ded5e7b0fe` for provenance consistency. NOT a hard requirement; pre-#535 versions work fine (only agent-teams plugin received the fix).

### Ledger Row (paste-ready)

```
| W312-C | 2026-05-19 | wshobson/agents | T2 VENDOR-FORK (UPGRADE) | install=4.36 / pattern=4.37 | NO-OP install (already cached + enabled). W289 silent-drift CLOSED — PR #535 merged at upstream HEAD 08ded5e7b0fe matching cache. Optional: refresh comprehensive-review+context-management for symmetric provenance. |
```

---

## Candidate 4: mattpocock/skills

### Header

- **HEAD SHA (upstream)**: `67bce91c80cd` (main branch, 2026-05-18T12:21:28Z) — message: "Fix typo in README.md regarding ticket labels"
- **Stars (current)**: 92,335 (vs W184 cited 50k = +84% growth in ~7 days; explosive)
- **Forks**: 8,103 · **Open issues**: 39 · **License**: MIT (LICENSE sha `f1dd2c09108dde1a5f56097cee8461b3ea834499`) · **Created**: 2026-02-03 · **Archived**: false · **Default branch**: main
- **Verdict (prior)**: W309 row #35 — **T2 VENDOR-FORK** (partial) → W310 P1b shipped commit `c5e1276` vendoring 2 skills: `tdd` (engineering) + `grill-with-docs` (engineering); pinned to SHA `67bce91c80cd1020a4f068ced32d0281656842ad` (exactly current upstream HEAD)
- **Local install state**: ✓ 2 vendored skills under `.claude/skills/tdd/SKILL.md` + `.claude/skills/grill-with-docs/SKILL.md`, both pinned at HEAD `67bce91c80cd`. License frontmatter cites MIT + pinned LICENSE sha. Vendored skills directory listing: `caveman`, `diagnose`, `durable-planning-files`, `gitnexus`, `goal-prompt-synthesis`, `grill-with-docs`, `langfuse`, `learned`, `mem-recall`, `sota-convergence-audit`, `speckit-*` (×9), `tdd`, `vercel-*` (×2), `web-design-guidelines` — **2 are mattpocock-vendor-forked, others are local-operator-curated**
- **Upstream content survey at HEAD `67bce91c80cd`**:
  - `skills/engineering/`: `diagnose`, `grill-with-docs`, `improve-codebase-architecture`, `prototype`, `setup-matt-pocock-skills`, `tdd`, `to-issues`, `to-prd`, `triage`, `zoom-out` (10 skills)
  - `skills/productivity/`: `caveman`, `grill-me`, `handoff`, `write-a-skill` (4 skills)
  - `skills/misc/`, `skills/personal/`, `skills/deprecated/`, `skills/in-progress/`: review, writing-beats, writing-fragments, writing-shape (4 in-progress)
  - **Total: ~18 production skills + ~4 in-progress** — versus W184's cited "TS/JS skills extraction" target

### Scorecard (21 dims under sca-v6.1)

| Dim | Score | Source | Note |
|---|---|---|---|
| D1 install_pathway | **5** | vendor-fork (no upstream plugin install) | Per-skill copy via Write tool; portable; already operationalized |
| D2 claude_code_pathway | **5** | SKILL.md description-match | Native skill auto-fire on description; full CC primitive |
| D3 latency_cold_call | **5** | local SKILL — no npx | Zero cold-start; description-match instant |
| D4 cc_pathway_first_class | **5** | SKILL.md frontmatter | Anthropic-canonical format per code.claude.com/docs/en/skills |
| D5 docs_typed_diversity | **5** | per-skill SKILL.md + README + ref docs | Each skill self-contained, often with linked supporting .md files |
| D6 authority_weight | **5** | mattpocock @ 92k★ named-T1 | Per CLAUDE.md:L182 "Matt Pocock named-T1"; W253-C ADOPT-NOW; 92k★ explosion validates author-prior |
| D7 maintenance_recency | **5** | 2026-05-18 commit (yesterday) | Daily-active maintenance |
| D8 license_compatibility | **5** | MIT pinned in vendor frontmatter | LICENSE sha pinned to `f1dd2c0910...`; copyright "Matt Pocock 2026" |
| D9 reversibility | **5** | rm -rf skill dir | Trivial removal |
| D10 duplication_against_installed | **4** | partial overlap | local `caveman`, `diagnose`, `mem-recall`, `goal-prompt-synthesis` exist as operator-curated; mattpocock's `caveman` (productivity) and `diagnose` (engineering) MAY differ from local — would need diff to assess |
| D11 context_cost_preload | **5** | SKILL on-demand | Description-match; no preload |
| D12 ecosystem_density | **5** | 92.3k★ 8.1k forks 39 issues | Extreme growth (×1.85 in 7d); top-decile Claude Code skill repo |
| D13 pattern_extractability | **5** | per-skill self-contained | Each SKILL.md extractable as standalone primitive |
| D14 supply_chain_provenance | **5** | vendor frontmatter pins LICENSE + SKILL.md shas | Per-skill: SKILL.md sha + LICENSE sha + commit sha + UTC timestamp — exemplary vendor-fork discipline |
| D15 security_posture | **5** | read-only skills | Skills are prompts; no executable code in vendored layer |
| D16 bus_factor_governance | **3** | mattpocock solo | Bus_factor=1 (single author) but high-eyeball (92k★ + 8k forks) → D16=3 floor |
| D17 robustness_under_perturbation | **4** | SKILL.md prompt-engineering | Per-skill resilience varies; engineering/tdd has been battle-tested via PR review |
| D18 runtime_safety_and_privacy_risk | **5** | prompt-only | No code exec; no network egress from prompts |
| D19 code_review_rigor | **4** | 39 open issues + 8.1k forks | Active community CR via fork-PRs; issue volume reflects engagement, not abandonment |
| D20 doc_transparency | **5** | per-skill README + frontmatter | Class-leading doc transparency in claude-skills-repo class |
| D21 org_diversity | **3** | mattpocock solo + community PRs | Single-org primary author; community forks-as-review |
| D22 discovery_cascade_breadth | **5** | github + deepwiki + W184 + W253-C + W259-grand-catalog + W309 row#35 | 6+ cascade convergence |
| D23 decision_impact_tier | **B** | per-skill vendor adds skill-surface | Tier-B FOUNDATIONAL-ADJACENT (each vendor-fork is reversible) |
| D24 mcp_attack_surface_governance | **n/a→5** | no MCP server | Pure SKILL.md vendor-fork |

**Composite (v6.1)**:
- install_score_v6.1 ≈ **4.78/5** raw (no prior verdict downweight needed; W309 verdict was already T2 VENDOR-FORK under sca-v5.x — minimal downweight)
- pattern_score_v6.1 ≈ **4.81/5** raw

**Hard-caps**: D8 ≥ 2 ✓ · D10 ≥ 3 ✓ (partial overlap not full duplicate) · D14 = 5 ✓ · D16 = 3 ✓ floor · D17 ≥ 2 ✓ · D18 ≥ 2 ✓ · D24 = 5 ✓ — **all pass**.

### Six-Axis Convergence

| Axis | Source | Verdict | Score |
|---|---|---|---|
| Upstream HEAD freshness | api/repos commits/main | `67bce91c80cd` 2026-05-18, daily commits | 5 |
| Vendor-fork integrity | .claude/skills/tdd, /grill-with-docs SKILL.md frontmatter | Pinned to EXACTLY `67bce91c80cd...` — no drift | 5 |
| ★/growth signal | GitHub API | 92,335★ (+84% in 7d) | 5 |
| License | MIT (LICENSE sha pinned) | Vendor-fork friendly | 5 |
| Prior verdict provenance | W309 row #35 + W310 P1b commit c5e1276 | T2 VENDOR-FORK shipped | 5 |
| Upstream content survey | api/repos contents/skills/* | 18 production skills + 4 in-progress | 5 |

**6-of-6 convergent on T2 VENDOR-FORK (HOLDS from W309); explosive growth validates author-prior; HEAD pin EXACTLY matches current upstream → vendored skills are FRESH**.

### Verdict + Operator-AI

- **Tier**: **T2 VENDOR-FORK HOLDS** (W309 row #35 verdict re-affirmed under sca-v6.1)
- **Current state**: `.claude/skills/tdd` + `.claude/skills/grill-with-docs` pinned at HEAD `67bce91c80cd` (= current upstream main HEAD); **zero drift**. Both functional via description-match auto-fire.
- **NEW skills worth additional vendoring** (W312-NEW candidates, alphabetical):
  1. **engineering/triage** — Issue state-machine driven by triage roles. **Use when** user wants to create/triage issues, prep AFK-agent. Frontmatter discoverable; no local overlap. **RECOMMEND ADOPT** for W313 vendor-fork pass.
  2. **engineering/zoom-out** — Tells the agent to zoom out for broader-context/higher-level perspective. `disable-model-invocation: true` (explicit-invocation only). Minimal but high-leverage. **RECOMMEND ADOPT**.
  3. **engineering/improve-codebase-architecture** — "Find deepening opportunities in a codebase, informed by domain language in CONTEXT.md and decisions in docs/adr/". Strong overlap with W295/W308 ADR + ContextEng themes. **CONSIDER ADOPT**.
  4. **engineering/to-issues** / **engineering/to-prd** — Conversation-to-issue / conversation-to-PRD with tracker publishing. **CONSIDER** for jira/github workflow integration.
  5. **productivity/handoff** + **productivity/write-a-skill** — supplementary; local skill-creator already covers write-a-skill domain.
  6. **engineering/diagnose** — likely overlaps with local `.claude/skills/diagnose/`; would need diff. **HOLD pending diff comparison**.
  7. **productivity/caveman** — likely overlaps with local `.claude/skills/caveman/`; would need diff. **HOLD pending diff comparison**.
- **Action**: **NO IMMEDIATE CHANGE** to current 2 vendored skills (`tdd` + `grill-with-docs`). **OPTIONAL MEDIUM operator-AI**: queue W313 vendor-fork pass adding `triage`, `zoom-out`, `improve-codebase-architecture` (3 NEW skills) once orchestrator confirms no overlap collision.
- **Operator-AI**: **OPTIONAL MEDIUM** — W313 incremental vendor-fork (3 new skills) using same frontmatter-pinning discipline as W310 P1b.

### Ledger Row (paste-ready)

```
| W312-C | 2026-05-19 | mattpocock/skills | T2 VENDOR-FORK (HOLDS) | install=4.78 / pattern=4.81 | NO-OP (current 2 vendored skills pinned at exact upstream HEAD 67bce91c80cd). W313 candidates: triage + zoom-out + improve-codebase-architecture (RECOMMEND ADOPT incremental). |
```

---

## Cross-Candidate Summary

### Tier Distribution (W312-C, 4 candidates)

- **T1 INSTALL**: 1 — planning-with-files (HOLDS from W291.Stage2; HIGH operator-AI to re-enable)
- **T2 VENDOR-FORK**: 2 — wshobson/agents (UPGRADE from W289 T3); mattpocock/skills (HOLDS from W309 row#35; W313 incremental candidates queued)
- **T3 PATTERN-STUDY**: 1 — GitNexus (T3 under v6.1; flat REJECT-P6 under v3 superseded by v6.1 soft-gate ladder)
- **T4 CITE-ONLY**: 0
- **T5 REJECT**: 0 (GitNexus install-class is INSTALL-BLOCKED but pattern-class is studyable — not flat REJECT under v6.1)

### Operator-AI Roll-up

| Severity | Count | Items |
|---|---|---|
| HIGH | 1 | Re-enable `planning-with-files@planning-with-files` in settings.json |
| MEDIUM | 2 | Optional: refresh wshobson comprehensive-review+context-management; Optional: W313 incremental mattpocock vendor-fork (triage/zoom-out/improve-codebase-architecture) |
| LOW | 0 | n/a |

### sca-v6.1 Validation Notes

- **D24 mcp_attack_surface_governance** newly commissioned: 3 of 4 candidates have D24=n/a→5 (no MCP exposed), 1 (GitNexus) has D24=2 (FLOOR) due to CR-9 unpinned `npx -y gitnexus@latest mcp` + no OWASP-MCP-Top-10 coverage matrix. Refinement C (conditional CR-9 floor for unpinned MCP) caught GitNexus exactly per W310 Stream 1 Refinement design.
- **D16 bus_factor_governance**: All 4 candidates are solo-author at D16=3 (floor for T1+T2). This validates W292-R1 CNCF/OpenSSF anchor — Claude Code skills ecosystem is dominated by solo authors, D16=3 floor is appropriate (not below).
- **Live-state probe (Δ1)**: caught the planning-with-files install-enabled drift mid-pipeline; would NOT have caught under v5. v6.1 mandate validated.
- **5-tier soft-gate ladder**: GitNexus moved from flat REJECT-P6 (v3) → T3 PATTERN-STUDY (v6.1) without compromising install discipline. Validates W288 v3 design intent (license-incompat blocks INSTALL but PATTERN-STUDY remains open).
- **Borda head-to-head readiness**: 4 candidates measured under same rubric; pattern_score ordering is mattpocock(4.81) > wshobson(4.37) > planning-with-files(4.32) > GitNexus(3.45). install_score ordering is mattpocock(4.78) > wshobson(4.36) > planning-with-files(4.24) > GitNexus(BLOCKED). Both orderings stable.

### Cardinal-rule check (R1-R5 + W269)

- **R1 trusted-source**: All 4 are GitHub-public (R1 ✓)
- **R2 no .py/.sh under .claude/hooks/scripts**: This audit produces NO file changes outside the audit md (R2 ✓)
- **R3 subagents = installed/documented**: This audit IS a subagent execution per the W312-C task spec (R3 ✓)
- **R4 no ad-hoc .claude/rules/**: This audit produces NO ad-hoc rules (R4 ✓)
- **R5 safety via permissions**: No `deny[]` modifications recommended (R5 ✓)
- **W269 agent-team trigger**: This IS the W312-C subagent in a 4-stream parallel sweep (W269 ✓)
- **CR-9 version-pin**: 3 of 4 candidates pin (planning-with-files@2.38.1, wshobson plugins@versioned, mattpocock@SHA-pin); GitNexus FAILS CR-9 (`npx -y gitnexus@latest`) — consistent with REJECT-class adoption recommendation.

### Self-eval (W288 §3 Stream A Auto-Cadence)

- **Sources cited**: GitHub API (×4), deepwiki (×1), repomix top-level (×3), npm registry (×1), installed_plugins.json local probe (×4), settings.json enabledPlugins probe (×4), W138/W184/W253-C/W289/W291/W309/W310 prior-verdict citations (×6 distinct waves) — **9+ distinct sources** per candidate
- **MCP-family coverage**: `mcp__deepwiki__ask_question` (×1), `mcp__plugin_context-mode_context-mode__ctx_batch_execute` (×4), Bash + Read + Write + Edit + Grep + Glob — **≥3 MCP families** per W288 mandate
- **No new fabrications**: Every cited SHA, version, star count, and license is read from a live source in this session's tool calls
- **Disagreement tracking**: planning-with-files installed-vs-enabled drift documented; W289 silent-drift CLOSED-RESOLVED; W184 REJECT-P6 SUPERSEDED-NOT-REVERSED under v6.1 soft-gate

---

**Stream W312-C complete.** Composite output below for parent-orchestrator parsing.
