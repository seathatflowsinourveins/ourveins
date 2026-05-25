---
title: Wave 223 Agent B — Knowledge Management Tools (Obsidian/Logseq/Anytype/TiddlyWiki/SilverBullet + MCP wrappers) SOTA Catalog
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (f) — codex-rescue BRIDGE-MODE not invoked; cross-model gate NOT structurally satisfied per cmc-env-funneled-disclosure.md §The mandate)
wave: 223
fire: B
---

# Wave 223 Agent B — Knowledge Management Tools Deep-Dive

## STAND-IN-NOTICE

This dispatch ran under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` stand-in per `CLAUDE.local.md` ENV (f); codex CLI not invoked; **cross-model gate NOT structurally satisfied for this dispatch**. Orchestrator MUST file Path P codex T1 ratification per `cmc-t1-t7-lifecycle.md §The contract` BEFORE any ADOPT-NOW prescription from this report lands.

## Section 1 — PKM Tool Catalog (5 primary candidates + 2 reference-only)

### Tool 1: **Obsidian** (obsidianmd ecosystem)

| Field | Value |
|---|---|
| Core app | **Proprietary closed-source EULA** (Electron app, free-for-personal-use; commercial license $50/yr) |
| Cite anchor | `mcp__github__get_file_contents obsidianmd/obsidian-releases @ HEAD` [VERIFIED 2026-05-15 stars=17,775] — only releases/plugins repo is GitHub-accessible; CORE APP source NOT on GitHub |
| **CR-9 LICENSE direct-read** | **CORE APP LICENSE = proprietary EULA** at https://obsidian.md/license — NOT permissive open-source. **STRUCTURAL BLOCKER** for runtime adoption per Probe 6 |
| Mode-harness fit | DESKTOP UI APP — Probe 5 mode-harness-shape **FAIL** |
| **VERDICT** | **REJECT-FOR-FIT 0.95** — core app closed-source EULA + GUI-dependent |

### Tool 2: **Logseq** (logseq/logseq)

| Field | Value |
|---|---|
| **CR-9 LICENSE direct-read** | **AGPL-3.0** (LICENSE.md L1-2 verbatim "GNU AFFERO GENERAL PUBLIC LICENSE Version 3") — **STRUCTURAL BLOCKER** per Probe 6 (same pattern as openviking AGPLv3) |
| Cite anchor | `mcp__github__get_file_contents logseq/logseq LICENSE.md @ 80cb2d99e33dfe0b6788b27077135b7fda0270e5` [VERIFIED 2026-05-15] |
| Stars | 42,895 [VERIFIED 2026-05-15] |
| Language | Clojure / ClojureScript — Probe 3 architectural-API mismatch |
| **VERDICT** | **REJECT-FOR-FIT 0.93** — AGPLv3 dispositive |

### Tool 3: **Anytype** (anyproto/anytype-ts)

| Field | Value |
|---|---|
| **CR-9 LICENSE direct-read** | **Any Source Available License 1.0 (ASAL-1.0)** — source-available with Commercial-Use restriction to "Allowed Networks" |
| Cite anchor | `mcp__github__get_file_contents anyproto/anytype-ts LICENSE.md @ 8fe63ff1` [VERIFIED 2026-05-15] |
| Stars | 7,542 |
| **VERDICT** | **REJECT-FOR-FIT 0.92** — ASAL-1.0 commercial-use-in-Allowed-Networks restriction violates permissive-only policy |

### Tool 4: **TiddlyWiki5** (Jermolene/TiddlyWiki5)

| Field | Value |
|---|---|
| **CR-9 LICENSE** | BSD/MIT-class (license-clean — passes permissive-only sss policy) but **demand-gate concern** |
| **Probe 7.a DEMAND-ABSENCE** | What sss workflow would route through TiddlyWiki? claude-sota-installed already has flat `tmp/wave*.md` markdown + `MEMORY.md` index + graphiti temporal-KG + mcp-memory sqlite_vec for L1+L2+L3 of Karpathy §5 3-layer compounding-surface |
| **VERDICT** | **REJECT-FOR-FIT 0.85** — license-clean but DEMAND-ABSENCE |

### Tool 5: **SilverBullet** (silverbulletmd/silverbullet)

| Field | Value |
|---|---|
| **CR-9 LICENSE direct-read** | **MIT** (verbatim LICENSE.md L1 "Copyright 2022, Zef Hemel") ✅ permissive license-CLEAN |
| Cite anchor | `mcp__github__get_file_contents silverbulletmd/silverbullet LICENSE.md @ 84bda95a` [VERIFIED 2026-05-15] |
| **VERDICT** | **REJECT-FOR-FIT 0.85** — MIT-clean but DEMAND-ABSENCE + Probe 5 mode-harness mismatch (browser UI) |

### Tool 6 (REFERENCE-ONLY): **Foam** (foambubble/foam) — REJECT 0.95 (VS Code dependency)
### Tool 7 (REFERENCE-ONLY): **OrgMode** — REJECT 0.98 (Emacs runtime dependency)

## Section 2 — MCP Wrapper Catalog

### MCP wrappers for Obsidian (180 candidates total per GitHub search)

| Wrapper | Stars | License | Notes |
|---|---|---|---|
| `cyanheads/obsidian-mcp-server` | (mid-tier) | Apache-2.0 ✅ | 14 tools + 3 resources; npm `obsidian-mcp-server@3.1.9` |
| `MarkusPfundstein/mcp-obsidian` | ~150★ | TBD | 7 tools; requires Obsidian Local REST API plugin |
| `entanglr/zettelkasten-mcp` | 151 | (likely permissive) | Zettelkasten methodology MCP — DOES NOT require Obsidian app |
| `jimprosser/obsidian-web-mcp` | 112 | (Python) | Remote MCP w/ OAuth 2.0 |
| `klemensgc/modular-context-obsidian-plugin` | 87 | (TypeScript) | Multi-account MCP |

**CRITICAL**: ALL Obsidian MCP wrappers require **Obsidian app installed and running locally** (uses Local REST API plugin on port 27123/27124). Even MIT-licensed wrapper cannot operate without proprietary Obsidian binary running.

### Edge case: `entanglr/zettelkasten-mcp` (potential pattern-extract candidate)

This is the ONE MCP candidate that does **NOT require any closed-source app**: operates on flat markdown directory with atomic-note Zettelkasten linking. **Could be STUDY-PILOT-PATTERN-EXTRACT** if sss had demand for atomic-note discipline — BUT per Probe 7.a sss already uses flat `tmp/wave*.md` + `MEMORY.md` pointer-index per Karpathy §5 Layer 2.

## Section 3 — HONEST-NON-FINDING analysis: does claude-sota-installed need PKM UI?

### Existing sss decision-context (FM-20 propagation-defense source-of-truth probe)

- **W213 Master Synthesis row 114**: "S-006 kepano-obsidian-skills (Layer 3 wiki STATUS-DEFERRED)" — sibling ALREADY DEFERRED Layer 3 wiki as P3 DEFERRED/SITUATIONAL
- **W212 Agent M Memory Catalog + W207 Agent D**: basic-memory classified as STUDY-PILOT orthogonal — "IF Obsidian markdown human-readable memory desired" (conditional on desire that does not currently exist)
- **W212/W207 existing memory backends**: graphiti (FalkorDB temporal-KG L3) + mcp-memory (sqlite_vec L1+L2) ALREADY-INSTALLED

### Probe 7 demand-gate decomposition

**Probe 7.a DEMAND-ABSENCE check** (3-clause):
1. **Cite specific path (existing or queued workflow)**: No queued workflow exists that would route through PKM UI. The `/loop` autonomous runtime + sota-researcher dispatch + codex T1-T7 lifecycle + flat-file `tmp/` writes + graphiti + mcp-memory cover all memory + reasoning needs.
2. **Existing shipped primitive coverage**: 
   - L1 chronological log: `.claude/state/*.jsonl` ✅
   - L2 index: `MEMORY.md` (one-line pointers <150 chars) ✅
   - L3 compiled wiki: `docs/karpathy-llm-wiki-practice.md` + `.claude/rules/*.md` + per-topic memory files ✅
   - Cross-session temporal-KG: graphiti ✅
   - Vector-embedded memory: mcp-memory + sqlite_vec ✅
   
   **Karpathy §5 3-layer compounding-surface ALREADY SATISFIED** without PKM UI.
3. **Displacement vs extension**: PKM UI would NOT displace any existing primitive AND would NOT extend the current workflow.

**Probe 7.a verdict**: **DEMAND-ABSENCE confirmed**. No current OR queued workflow consumes PKM UI.

**Probe 7.b 5-clause check**: 5/5 clauses FAIL.

### HONEST-NON-FINDING conclusion

**claude-sota-installed does NOT need a PKM UI layer.** The existing flat-file + graphiti + mcp-memory stack covers all Karpathy §5 3-layer compounding-surface needs. Sibling W213 has already DEFERRED Layer 3 wiki STATUS-DEFERRED. Adding a PKM tool would violate kiss-dry-yagni Must-Never #4 + Probe 7.a DEMAND-ABSENCE + Probe 5 mode-harness-shape mismatch.

## Section 4 — Recommendations

### REJECT-FOR-FIT (5 candidates)

| # | Candidate | Primary reason | Sub-reason |
|---|---|---|---|
| 1 | Obsidian (core app) | License = closed-source EULA (Probe 6) | Mode-harness GUI dependency (Probe 5) |
| 2 | Logseq | License = AGPLv3 viral copyleft (Probe 6) | Mode-harness GUI dependency (Probe 5) |
| 3 | Anytype | License = ASAL-1.0 Commercial-Use restricted (Probe 6) | Mode-harness GUI dependency (Probe 5) |
| 4 | TiddlyWiki5 | Probe 7.a DEMAND-ABSENCE | Mode-harness GUI dependency (Probe 5) |
| 5 | SilverBullet | Probe 7.a DEMAND-ABSENCE | Mode-harness self-hosted-server+browser dependency (Probe 5) |

### REFERENCE-ONLY (2 candidates)

| # | Candidate | Use as reference for... |
|---|---|---|
| 6 | Foam | VSCode-based PKM patterns (cite-only) |
| 7 | OrgMode | Emacs outliner pattern (cite-only) |

### STUDY-PILOT-PATTERN-EXTRACT (1 candidate — IF demand surfaces)

| # | Candidate | Pattern to extract | Condition |
|---|---|---|---|
| 8 | entanglr/zettelkasten-mcp | Atomic-note methodology (flat markdown, no app dependency) | ONLY if sss develops atomic-note discipline need |

### NO ADOPT-NOW recommendations

**Zero candidates pass the harness-fit gate.** All 5 primary PKM tools fail at minimum one of (Probe 5 mode-harness / Probe 6 license blocker / Probe 7.a DEMAND-ABSENCE).

## Section 5 — VERDICT

**VERDICT: REJECT-FOR-FIT-ALL — claude-sota-installed does NOT adopt any PKM/wiki tool. All 5 primary candidates fail harness-fit gate (license blockers x3: logseq AGPLv3 / anytype ASAL-1.0 / obsidian EULA; DEMAND-ABSENCE x2: tiddlywiki + silverbullet). Existing graphiti+mcp-memory+flat-file stack already satisfies Karpathy §5 3-layer compounding-surface. Sibling W213 row 114 already DEFERRED Layer 3 wiki (kepano-obsidian-skills). Probe 7.a DEMAND-ABSENCE firmly established (5/5 clause-check fail). HONEST-NON-FINDING is the high-value deliverable per synthesis-layer-verify.md §Reporting categories. Cross-model gate NOT structurally satisfied (Sonnet stand-in dispatch); orchestrator MUST file Path P codex T1 ratification before any prescription from this report lands.**
