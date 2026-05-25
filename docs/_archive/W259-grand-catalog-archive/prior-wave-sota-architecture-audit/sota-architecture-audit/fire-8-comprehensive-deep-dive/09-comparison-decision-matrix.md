# 09 — Comparison Decision Matrix (line-by-line SOTA cross-comparison)

> **Purpose**: load-bearing synthesis of Fire 8 deep-dives. Per-repo decision process,
> why-SOTA, replacement-of, comparison. Direct deliverable per user directive:
> "give me their decision process, the replacement, why are they SOTA, comparison and more".

## Master comparison matrix — 8 architectural-anchor repos

| Field | spec-kit | superpowers | ccpm | planning-with-files | agent-os | anthropics/skills | piebald-cc-prompts | bmad-method |
|---|---|---|---|---|---|---|---|---|
| **Tier** | T1 method | T1 method | T2 PM | T2 PM | T3 standards | T0 foundation | T5 reference | T1 method (alt) |
| **Stars** | 95k+ | 185k | 8k | 21k | 4.5k | 131k | 10k | 47k |
| **License** | MIT | MIT | MIT | MIT | MIT (probe pending) | MIXED (per-skill) | MIT | MIT |
| **HEAD SHA** | 688ca1b | f2cbfbe | 7d7e462 | 6cd6254 | NEW clone | f458cee | 648d3b3 | e36f219 |
| **Last push** | 2d | 6d | 53d | 5d | 0d | 2d | 2d | 9d |
| **Version** | v0.8.1 | v5.1.0 | (n/a) | v2.37.0 | v3.0 | (rolling) | v2.1.137 | v6 |
| **SRA score** | 10/10 | 9/10 + 1 PARTIAL (D7 intentional) | 8/10 + 2 PARTIAL (D2/D5) | 10/10 | 9/10 + 1 PENDING (D1 LICENSE) | 10/10 | 10/10 | 10/10 (Fire 6) |
| **Fire-8 verdict** | INSTALL F7 | ALREADY INSTALLED | INSTALL F7 (53d caveat) | INSTALL F7 (smallest-reversible) | INSTALL F8 | OVERLAP probe | CITE-IMPORT F8 | DEFER per Probe 7.b |
| **Install class** | uv tool install | /plugin install | git clone + symlink | git clone + symlink | git clone + commands | /plugin marketplace add | cite-anchor only | git clone (DEFERRED) |
| **Cross-tool** | YES (10+ agents) | YES (CC/Codex/OpenCode/Gemini/Cursor) | YES (Agent Skills standard) | YES (Agent Skills + 6 locales) | YES (CC focus) | OFFICIAL marketplace | reference-only | YES (v6) |
| **Storage namespace** | `.specify/` | `.claude/skills/superpowers/` | `.claude/prds/` + `.claude/epics/` | `task_plan.md` + `findings.md` + `progress.md` | `agent-os/standards/` | (per-plugin) | (none — cite-only) | `bmad-method/` |

## Per-repo decision process (Why these verdicts)

### spec-kit — Tier-1 method (INSTALL F7)

**Decision process**:
1. SRA D1-D10 → 10/10 PASS (MIT + 2d push + 95k★ + GitHub OFFICIAL + 70+ extensions)
2. Fire 6 audit confirmed (commit `ac8ea8a` definitive-architecture-v1)
3. Fire 8 anatomy (file 01) verified workflow grammar: 7-step constitution → specify →
   clarify → plan → tasks → analyze → implement
4. Skills mode (`--integration-options="--skills"`) = Anthropic-canonical Agent Skills format
5. COMPLEMENTARY to Superpowers (spec-as-contract vs HOW-process)

**Why SOTA**: Microsoft/GitHub OFFICIAL + Anthropic-aligned skills mode + 70+ community
extensions + 10+ agent integrations + cross-tool lingua-franca. Only spec-driven framework
with this convergence at this velocity.

**Replacement-of**: NONE direct. Adds spec-as-contract layer above existing Superpowers method.

### superpowers — Tier-1 method (ALREADY INSTALLED)

**Decision process**:
1. SRA D1-D10 → 9/10 + 1 PARTIAL (D7 deliberate divergence from Anthropic guidance, BACKED BY EVALS)
2. 185k★ = highest signal in CC ecosystem
3. Ships in claude-plugins-official Anthropic-OFFICIAL marketplace
4. 14 production-tested skills; 6 already vendored to eee
5. Eval-first PR bar = matches eee's cardinal-rule-9 discipline

**Why SOTA**: Highest stars + Anthropic-OFFICIAL distribution + named-author Jesse Vincent
TIER-2 + eval-tested skills + N-lateral cross-tool (CLAUDE.md + AGENTS.md + GEMINI.md +
extension JSON).

**Replacement-of**: ALREADY INSTALLED — no replacement.

### ccpm — Tier-2 PM (INSTALL F7 with caveat)

**Decision process**:
1. SRA D1-D10 → 8/10 PASS + 2 PARTIAL (D2 53d push, D5 contribute-rate not probed)
2. User external SOTA-research synthesis ranks #1 PM despite 53d push gap
3. Files-as-source-of-truth = matches Manus markdown-as-working-memory pattern
4. Agent Skills standard native (harness-agnostic)
5. STRONG-PROVENANCE-EXPRESS predicate compensates D2/D5 PARTIAL

**Why SOTA**: PRD → Epic → GitHub Issues → Parallel Agents traceability; "No Vibe Coding"
discipline; GitHub-Issues-as-database; Agent Skills native install.

**Replacement-of**: Optionally replaces ad-hoc `tmp/wave*.md` planning with structured
`.claude/prds/<feature>.md` + `.claude/epics/<feature>/` hierarchy. Complementary to TaskList
(in-session) — adds long-term feature-stream tracking.

### planning-with-files — Tier-2 PM (INSTALL F7 — smallest-reversible)

**Decision process**:
1. SRA D1-D10 → 10/10 PASS
2. v2.37.0 just shipped 2026-05-05 with hash-attestation primitive
3. 3-file Manus pattern = smallest blast radius of any Tier-2 candidate
4. i18n FIRST-CLASS (6 locales)
5. Cryptographic plan-integrity (hash-attest) is UNIQUE among PM cohort

**Why SOTA**: Minimalist Manus pattern + 21k★ + 5d push + hash-attestation + i18n. Highest
velocity + lowest blast radius makes it the F7-alt-path smallest-reversible install.

**Replacement-of**: Optionally migrate `tmp/wave*.md` to `task_plan.md` + `findings.md` +
`progress.md`. Per-feature scope (not multi-feature like ccpm).

### agent-os — Tier-3 standards (INSTALL F8)

**Decision process**:
1. SRA D1-D10 → 9/10 PASS + 1 PENDING (D1 LICENSE classification still being verified for newly-cloned repo)
2. v3 EXPLICITLY retired its own implementation phase = Anthropic-canonical-deference
3. 5 commands focused on standards-injection (the unique-value remainder)
4. Plan-mode-gated `/shape-spec` = Anthropic-recommended discipline
5. Brian Casel @ Builder Methods = TIER-3-NAMED-ORG with named-owner

**Why SOTA**: Retirement-of-overlap = convergence-by-deference. Pure additive value
(standards-injection) without competing with Plan Mode.

**Replacement-of**: Optionally replaces manual standards-in-CLAUDE.md (per W134-F9 hygiene
queue: CLAUDE.md size review).

### anthropics/skills — Tier-0 foundation (OVERLAP probe required)

**Decision process**:
1. SRA D1-D10 → 10/10 PASS (per-skill license; OFFICIAL marketplace install)
2. 131k★ Anthropic OFFICIAL = canonical authority
3. Agent Skills standard birthplace (Dec 2025 open spec)
4. skill-creator = Anthropic-canonical skill-authoring loop with quant evals
5. Fire 6 "TRULY-UNLICENSED" framing CORRECTED in Fire 8 → MIXED per-skill (Apache 2.0 majority)

**Why SOTA**: This IS Anthropic's foundation repo for the Agent Skills standard. Single
authoritative source. Marketplace install respects per-skill licensing.

**Replacement-of**: VERIFY OVERLAP with existing `claude-plugins-official` marketplace
(may already be installed). If non-overlapping: install `document-skills` and/or
`example-skills` plugins via `/plugin install ...@anthropic-agent-skills`.

### Piebald-AI/claude-code-system-prompts — Tier-5 reference (CITE-IMPORT F8)

**Decision process**:
1. SRA D1-D10 → 10/10 PASS
2. NOT install-class — pure CITE-ANCHOR reference
3. v2.1.137 matches CC v2.1.137 = per-CC-release sync velocity
4. Reverse-engineered Anthropic CC internals = highest-fidelity reference
5. 10k★ + multi-year history + named-org Piebald-AI

**Why SOTA**: Reference for understanding HOW CC reasons internally. Cite-anchor pattern
in citation-discipline.md TIER-2 makes Anthropic-canonical conventions accessible at
skill-authoring time without installing as runtime.

**Replacement-of**: NONE. Pure augmentation via cite-anchors. Zero runtime impact.

### BMAD-METHOD — Tier-1 method alternative (DEFER per Probe 7.b)

**Decision process**:
1. SRA D1-D10 → 10/10 (Fire 6 audit; LICENSE-classifier false-negative corrected to MIT)
2. v6 introduced Skills Architecture = Anthropic-aligned
3. 12+ persona-based agent team (Analyst / PM / Architect / Scrum Master / Dev / QA / UX)
4. Two-phase model: agentic planning + context-engineered story files Scrum-Master → Dev
5. Heavier than spec-kit/superpowers — virtual-team overhead

**Why DEFER (not REJECT)**: Per Probe 7.b 5-clause check, BMAD's virtual-team overhead
doesn't fit eee's current solo-loop pattern. Could re-evaluate IF eee scales to multi-role
team workflows.

**Replacement-of**: Would replace EVERYTHING (full team paradigm). Too heavy for current
eee scale.

## Cross-cutting decisions (the architecturally-coherent stack)

### Tier 1 method — RECOMMENDED: spec-kit + superpowers (BOTH, complementary)

**Justification**:
- spec-kit = spec-as-contract artifact layer (WHAT/WHEN)
- superpowers = behavior-shaping process (HOW)
- ALREADY INSTALLED: superpowers
- TO INSTALL: spec-kit (W134-F7)
- DEFER: bmad-method (virtual-team overhead) + ouroboros (newer entrant, less proven)

### Tier 2 PM — RECOMMENDED: planning-with-files FIRST, ccpm SECOND

**Justification**:
- planning-with-files = smallest-reversible (single-feature scope; 3 files)
- ccpm = multi-feature PRD/epic hierarchy (when feature-count > 1)
- Non-conflicting storage namespaces (`task_plan.md` vs `.claude/prds/`)
- DEFER: claude-task-master (re-evaluate post-CCPM pilot)

### Tier 3 standards — RECOMMENDED: agent-os

**Justification**:
- Unique additive value (standards-injection)
- v3 retirement-of-overlap with Plan Mode = SOTA design discipline
- DEFER: russbeye/claude-memory-bank (D2 staleness blocks adoption)

### Tier 4 catalogs — CITE-ONLY (no install)

Add Fire 8 finding: K-Dense-AI/scientific-agent-skills (20k★) for vertical-domain discovery.

### Tier 5 reference — CITE-IMPORT: Piebald-AI system-prompts (W134-F8)

Pure cite-anchor TIER-2 in citation-discipline.md.

### Memory layer (Tier-3 sister) — STUDY-PILOT: thedotmack/claude-mem (74k★)

NEW Fire 8 discovery (extended-repo-discovery doc #08). Probe overlap with existing
mcp-memory L1 + Graphiti L3 stack in W134-F9.

## The architecturally-coherent eee SOTA stack (Fire 8 synthesis)

```
INSTALLED ALREADY:
  T0 anthropics/claude-plugins-official marketplace
  T1 superpowers (185k★ via plugin marketplace)
  Memory L1: mcp-memory-service (Apache-2.0, sqlite_vec)
  Memory L3: Graphiti + FalkorDB

TO INSTALL (W134-F7+ FIRE QUEUE, GATED on cross-model T1):
  T0 anthropics/skills marketplace (if non-overlapping with existing)
  T1 spec-kit (uv tool install, with --skills mode)
  T2 planning-with-files (smallest-reversible FIRST)
  T2 ccpm (after planning-with-files validates)
  T3 agent-os (5 commands, standards-injection)
  T4 catalogs (cite-only: + K-Dense-AI/scientific-agent-skills)
  T5 Piebald-AI/claude-code-system-prompts (cite-anchor only)
  T3-bis MEMORY STUDY-PILOT: thedotmack/claude-mem (Fire 9 probe)

DEFERRED:
  T1 bmad-method (Probe 7.b virtual-team overhead)
  T1 Q00/ouroboros (DEFER pending spec-kit pilot)
  T2 claude-task-master (DEFER pending ccpm pilot)
  T3 russbeye/claude-memory-bank (D2 staleness)
```

## Forward fire queue (post Fire 8 close)

| Fire | Action | Status |
|---|---|---|
| W134-F7-retry | re-fire codex T1 with `--json` + turn-completed event count | PENDING |
| W134-F7-alt-path | install planning-with-files only (smallest-reversible) | GATED ON T1 |
| W134-F7-then-F8 | install spec-kit + ccpm + agent-os + cite Piebald | GATED ON F7 |
| W134-F9-overlap | probe anthropics/skills vs claude-plugins-official overlap | PENDING |
| W134-F9-claudemem | SRA probe thedotmack/claude-mem vs L1/L3 memory stack | PENDING |
| W134-F9-hygiene | anthropics/skills LICENSE upstream issue + CLAUDE.md size review + ECC /agent-sort | PENDING |
| W134-F10-close | verify all installs + cross-model T1 e2e on full architecture | PENDING |

## Mia ladder advance

n=957 → n=964 (+7: 8-repo cross-comparison matrix + per-repo decision-process synthesis + stack-coherence verification)
