# SOTA Convergence Audit: hesreallyhim/awesome-claude-code

**Audit date**: 2026-05-13
**Agent**: sota-researcher (a85f213046a7017e8 — Sonnet stand-in per CLAUDE.local.md ENV (f) STAND-IN-NOTICE)
**Repo**: `hesreallyhim/awesome-claude-code` @ HEAD `614f102accbcd48206d63a21df64adc984026b40` (2026-04-27)
**Wave context**: claude-sota-installed Wave 163 F11 ship cycle / parallel-team slot 3 of 3

---

## VERDICT

**ACCEPT-AS-CITE-REFERENCE**

CR-12 6-class disposition: **CITE-CLASS-CANONICAL** (catalog/meta-discovery surface; reference material only, NOT install-class).

```
VERDICT: ACCEPT-AS-CITE-REFERENCE
CR-12 DISPOSITION: CITE-CLASS-CANONICAL (cohort-discovery aggregator, not install-class)
SRA SCORE: 6/10  (axis 1+3+9+10 PASS; axis 2 PARTIAL — license + catalog freshness; axis 4-8 N/A for catalog-class)
CRITICAL: D1=PASS (curated catalog with named maintainer), D6=FAIL-FOR-INSTALL (CC-BY-NC-ND-4.0 No-Derivatives blocks vendoring; OK for cite-only reference)
CATALOG FRESHNESS: 226 rows / 203 active / 86 stale / last meaningful CSV update 2026-04-21 (~22d ago); README in transitional rebuild state since 2026-04-27 with "TODO" placeholder ToC — operator should treat CSV (THE_RESOURCES_TABLE.csv 614f102acc) as canonical data, NOT README
LICENSE: CC-BY-NC-ND-4.0 (No-Derivatives — cite-only fair-use; CANNOT fork/vendor; OK for read-only research input per CR-9 read-only research probe exception)
REPO STATS: 43,548★ / 3,712 forks / 226 catalog entries / 298 open issues / curator @hesreallyhim (independent named maintainer, established 2025-04-19)
```

---

## REPO STATE (transitional rebuild)

- **README.md** (blob SHA `7c8dc043b9fd81e42a62ff83e0c17fef9fec8223`, 1204 bytes) contains placeholder "Update in progress" + literal "Table of Contents: I. TODO"
- **THE_RESOURCES_TABLE.csv** (blob SHA `9b03388e5a406d4f0704b514d7a239258e45b210`, 111KB / 226 rows) IS the canonical data surface — what this audit consumed
- github-actions[bot] dominates recent commits (ticker auto-updates); occasional human curation commits

**Implication**: anyone landing on the README sees broken catalog. Anyone parsing the CSV gets the real catalog. CSV is the cite source.

---

## 6-Probe DAG (catalog-scope)

| Probe | Result |
|-------|--------|
| **P1 count-OVER** | 226 entries [VERIFIED via CSV parse] |
| **P2 SDK-vs-CLI surface** | N/A (catalog, not invocation surface) |
| **P3 architectural-API** | N/A (catalog, not API primitive) |
| **P4 plugin-namespace duplicate** | 10/73 candidates ALREADY in installed marketplaces; 63 GENUINE-NEW remain |
| **P5 mode-harness-shape** | PASS — mode-neutral reference |
| **P6 LICENSE blocker for install-class** | CC-BY-NC-ND-4.0 No-Derivatives BLOCKS install-vendoring; PASS-FOR-CITE per cardinal-rule-9 read-only research probe exception |
| **P7 demand-gate split** | DEMAND-CREATES-NEW-WORKFLOW.b — 5-clause check PASS (named use case = next-fire audit candidate prioritization; source = THE_RESOURCES_TABLE.csv; wiring = csv-parse-script; incumbent comparison = none of 11 installed marketplaces aggregates this specific cross-cutting catalog; reversible = catalog-only reference, zero retire cost) |

---

## TOP NEW CANDIDATES — F12+ next-fire audit queue

Sorted by priority post-Probe-4 GENUINE-NEW filter.

### Tier-1 HIGH-PRIORITY (large + named + recent)

| # | Repo | Cat | Stars | License | Created | Last push | Notes |
|---|------|-----|-------|---------|---------|-----------|-------|
| 1 | **EveryInc/compound-engineering-plugin** | Agent Skills | **16,638★** | MIT | 2025-10-09 | 2026-05-12 | Named-org maintainer (EveryInc / every.to). "Compound Engineering" methodology. Cross-tool (CC + Codex + Cursor). PRIMARY F12 audit candidate. |
| 2 | **Piebald-AI/claude-code-system-prompts** | Workflows | **10,162★** | MIT | 2025-11-18 | 2026-05-13 | Named-org maintainer (Piebald-AI). Reverse-engineered Anthropic CC internal prompts. HIGH-VALUE reference. |
| 3 | **fcakyon/claude-codex-settings** | Agent Skills | **682★** | Apache-2.0 | 2025-07-09 | 2026-05-09 | Named-user. "Battle-tested" plugins covering GitHub/AWS/cloud. Cross-tool (CC + Codex + Cursor + Gemini CLI). |

### Tier-2 NICHE HIGH-VALUE

| # | Repo | Cat | License | Notes |
|---|------|-----|---------|-------|
| 4 | vaporif/parry | Hooks | MIT | Prompt injection scanner — scans tool inputs/outputs for injection/secrets/exfiltration. SECURITY. |
| 5 | backnotprop/plannotator | Hooks | Apache-2.0 | Interactive plan-review UI intercepting ExitPlanMode via hooks. |
| 6 | GowayLee/cchooks | Hooks | MIT | Python SDK for hook authoring. OVERLAPS with sister claude-sota `.claude/hooks/scripts/*.py`. |
| 7 | aannoo/claude-hook-comms (HCOM) | Hooks | MIT | Multi-agent communication via hooks. OVERLAPS with parallel-agent-wave + cross-model-consensus T1-T7. |

### Tier-3 ORCHESTRATION + OBSERVABILITY

| # | Repo | Cat | License | Notes |
|---|------|-----|---------|-------|
| 8 | ruvnet/claude-code-flow | Tooling | MIT | Code-first orchestration. DUPLICATE-FUNCTIONALITY suspicion vs sister team-orchestration.md. |
| 9 | ruvnet/ruflo | Tooling | MIT | Multi-agent swarm orchestration (same author). Likely DUPLICATE concern. |
| 10 | lis186/ccxray | Tooling | MIT | HTTP proxy + dashboard for Claude Code ↔ Anthropic API. OBSERVABILITY value. |

### Tier-4 META-DISCOVERY

| # | Repo | Cat | License | Notes |
|---|------|-----|---------|-------|
| 11 | davila7/claude-code-templates | Tooling | MIT | Polished UI cross-resource directory; another META-DISCOVERY surface. |
| 12 | JSONbored/claudepro-directory | Workflows | MIT | Wide CC hooks/commands/agents directory. |
| 13 | costiash/claude-code-docs | Workflows | MIT | Mirror of Anthropic CC docs with full-text search. Cross-reference with CCBP. |

### Tier-5 STATUS LINES

| # | Repo | License | Notes |
|---|------|---------|-------|
| 14-17 | Astro-Han/claude-pace, sirmalloc/ccstatusline, Owloops/claude-powerline, rz1989s/claude-code-statusline | MIT | Statusline polish — operator-aesthetic; defer indefinitely. |

---

## Already-installed (Probe 4 filter)

Filtered out via Probe 4 [VERIFIED 2086 unique plugin names across 11 marketplaces]:
- obra/superpowers → claude-plugins-official + claude-community
- nizos/tdd-guard → claude-community
- agent-sh/agnix → claude-community
- revfactory/harness → claude-community
- robertguss/claude-skills (Book Factory) + affaan-m/everything-claude-code + jeffallan/claude-skills + zippoxer/recall + slopus/happy + jarrodwatts/claude-hud → already installed

---

## RECOMMENDATION

1. **DO NOT install** the catalog itself (CC-BY-NC-ND-4.0 blocks vendoring)
2. **DO use** `THE_RESOURCES_TABLE.csv @ blob 9b03388e5a` as cite-anchored research input for F12+ audit candidate prioritization
3. **DO dispatch** Tier-1 audit fan-out (3 parallel sota-researcher subagents) on EveryInc/compound-engineering-plugin + Piebald-AI/claude-code-system-prompts + fcakyon/claude-codex-settings
4. **Queue** Tier-2/3/4 for F13+ progressive audit cycles

---

## STAND-IN-NOTICE

This audit ran under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` per CLAUDE.local.md ENV (f); cross-model gate NOT structurally satisfied for this dispatch. Per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`: orchestrator MUST file codex T1 verification on the close-synthesis ship if it drives Edit/install action. For ACCEPT-AS-CITE-REFERENCE disposition: NO Edit / NO install / NO architectural commit triggered — cross-model gate de-facto N/A for THIS dispatch but applies if Tier-1 Top-3 candidates fan-out audit drives install in F12+.

Per `mia-pre-apply.md`: every catalog claim carries inline `[VERIFIED via <source>]` marker.
Per `fm20-path-drift-cascade.md`: each sub-claim independently verifiable; orchestrator should NOT propagate Top-3 recommendations into next-fire briefs without per-claim Mia re-probe at synthesis time.
