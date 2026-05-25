# 02 — Prescribed Updates to Existing Architecture Docs (forward-only)

> **Purpose**: enumerate concrete edits needed to `02-gap-matrix.md`, `03-sota-target-architecture.md`,
> `04-decision-tracker.md`, `05-audit-coverage-tracker.md` given Fire 16 cross-model verified data.
> **Discipline**: per `port-note-discipline.md §6` — do NOT rewrite historical commit bodies. These
> prescribed updates are forward-only Pattern A applies for FUTURE fires (W134-F18+ candidates).

## Update set 1 — `02-gap-matrix.md`

### Dimension 1 (Topology) — ADD ARIS effort-knob gap

Insert new row after current G1.4:

```markdown
| G1.5 No tunable-effort dispatch | fixed-effort agents | ARIS `effort: lite/balanced/max/beast` parameter (CROSS-MODEL VERIFIED Fire 16-a3 conf=0.97) | **STUDY-PILOT-EXTRACT** — cite-pattern only; extract knob convention to `advanced-agent-team-standing-directive.md` | extends current agent dispatch |
```

### Dimension 1 (Topology) — UPDATE Cross-model T1 status

Replace `**Cross-model T1 status:** PENDING per dimension; codex T1 e2e dispatched in subsequent fires` with:

```markdown
**Cross-model T1 status:** SATISFIED for 5 Fire 13 anatomies via Fire 15-16 Path P recipe (n=5). Per-row updates per `fire-17-architecture-gap-synthesis/01-cross-model-architecture-delta.md`. Remaining dimensions (3 / 5 / 6 / 7) pending separate cross-model fan-out.
```

### Dimension 2 (Memory) — REPLACE Letta DEFER with STUDY-PILOT-ELIGIBLE

Find existing Letta row and update:

```markdown
| G2.N Letta (4th memory layer) | DEFER (Fire 13 said custom MCP wrapper required + PostgreSQL dependency) | letta-ai/letta @ HEAD bb52a8900a79 — CROSS-MODEL VERIFIED Fire 16-a1 conf=0.93: **MCP-native CLIENT support** (`letta/services/mcp/`) + **SQLite default backend** (`letta/settings.py:493`) | **STUDY-PILOT-ELIGIBLE** with 2 remaining gates: (1) demand-surface for "self-improvement over time", (2) kiss-dry-yagni operator decision (3rd memory backend) | adds capability that L1+L3 don't provide |
```

### Dimension 2 (Memory) — UPDATE PageIndex L4 distinction

Find existing PageIndex row and update to distinguish L4a (bundled per-doc) from L4b (HOSTED-SERVICE corpus):

```markdown
| G2.N PageIndex (L4a per-document RAG) | not installed | vectifyai/pageindex — CROSS-MODEL VERIFIED Fire 15 conf=0.90: per-document tree-reasoning IS bundled + self-hostable | **STUDY-PILOT** with 3 corrections: model override (gpt-5.4 → current), concrete pilot artifact path, custom MCP wrapper for HOSTED-SERVICE integration | adds L4a layer |
| G2.N+1 PageIndex (L4b corpus-scale "File System") | not installed | Vectify HOSTED SaaS service | **DEFER** — conflicts with local-runtime baseline | NOT install-class for eee |
```

### Dimension 4 (Plugin Ecosystem) — UPDATE OpenSpec framing

Find existing OpenSpec row and update:

```markdown
| G4.N OpenSpec vs spec-kit | DEFER (Fire 13 said 4 reasons incl. cross-tool integration UNKNOWN) | Fission-AI/openspec @ HEAD 053d8a5 — CROSS-MODEL VERIFIED Fire 16-a2 conf=0.94: 29 supported tools documented at `docs/supported-tools.md:25-53`; AGENTS.md empty (verified); WORKSPACE_REIMPLEMENTATION active (verified) | **DEFER-with-narrower-reason** — workspace reimpl is load-bearing; cross-tool reach comparable to spec-kit; AGENTS.md format is a choice not a gap | spec-kit remains more mature on workspace stability |
```

## Update set 2 — `03-sota-target-architecture.md`

### Topology section — ADD ARIS effort-knob to Agent Brief Template

After existing brief template, append:

```markdown
### Effort knob (Fire 16-a3 cross-model verified)

Per ARIS pattern (CROSS-MODEL VERIFIED via GPT-5.5 0.97):

`— effort: lite | balanced | max | beast` (default `balanced`)

Maps to:
- `lite`: simple lookups, 5K-10K tokens
- `balanced`: standard fan-out, 20K-50K tokens (default)
- `max`: deep audit, 100K+ tokens
- `beast`: full sweep, 250K+ tokens (caution — fleet impact)

Status: EXTRACT-CANDIDATE for `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md`.
ARIS source: `Z:/repos/deps/aris-auto-claude/AGENT_GUIDE.md:9-18`.
```

### Memory layer section — ADD Letta L4 alternative

After existing L3 Graphiti row, append:

```markdown
### L4 — Stateful agent memory (Letta — STUDY-PILOT-ELIGIBLE)

Provides "self-improvement over time" capability that L1 sqlite_vec + L3 Graphiti do NOT offer:

| Aspect | Letta |
|---|---|
| License | Apache-2.0 (CROSS-MODEL VERIFIED Fire 16-a1) |
| Backend | SQLite default; PostgreSQL optional (REFUTED Fire 13's "PostgreSQL required") |
| MCP integration | First-class CLIENT (REFUTED Fire 13's "custom wrapper required") |
| Install class | PRIMARY-eligible |
| Install gate | STUDY-PILOT-ELIGIBLE pending (1) demand-surface (2) kiss-dry-yagni operator decision |

Cite: Fire 16-a1 cross-model verification at `fire-16-gpt55-multi-anatomy/03-letta-gpt55-verdict.md`.
```

### Memory layer section — REFINE L4 PageIndex

After existing PageIndex row, update with L4a/L4b distinction:

```markdown
### L4a — Per-document tree-reasoning (PageIndex — STUDY-PILOT)
- Bundled in repo; self-hostable; INSTALLABLE-AS-LOCAL-PRIMITIVE
- Install with 3 corrections (model override + pilot artifact path + custom MCP wrapper)

### L4b — Corpus-scale "PageIndex File System" — DEFER
- HOSTED-SERVICE (Vectify SaaS) only; conflicts with local-runtime baseline
- NOT install-class

Cite: Fire 15 cross-model verification at `fire-15-gpt55-convergence/01-real-gpt55-verdict.md`.
```

### Sister-framework references — ADD ARIS as 6th-org

Find existing sister-framework table (5 orgs: LangChain + AAIF + obra + addyosmani + ?) and add 6th-org row:

```markdown
| 6 | wanshuiyin (named-individual) / ARIS | aris-auto-claude @ HEAD 5725459e | CITE-PATTERN | 74 skills; effort-knob; meta-optimize self-improvement; cross-tool CC+Codex+Cursor+Trae | Fire 16-a3 cross-model VERIFIED conf=0.97 |
```

## Update set 3 — `04-decision-tracker.md`

### Add new entries for cross-model verified decisions

```markdown
## Decision W134-F16-a1 — Letta install class upgrade

**Subject**: letta-ai/letta agent memory platform
**Fire 13 classification**: DEFER (Install class SECONDARY; custom MCP wrapper required; PostgreSQL dependency)
**Fire 16-a1 cross-model verdict** (GPT-5.5 conf=0.93): REFUTED both load-bearing concerns
**Revised decision**: STUDY-PILOT-ELIGIBLE (Install class PRIMARY-eligible; setup LOW-MEDIUM)
**Forward gate**: demand-surface + kiss-dry-yagni operator decision
**Authority**: `fire-16-gpt55-multi-anatomy/03-letta-correction-synthesis.md`

## Decision W134-F16-a2 — OpenSpec disposition narrowing

**Subject**: Fission-AI/openspec spec-driven workflow
**Fire 13 classification**: DEFER vs spec-kit (4 reasons)
**Fire 16-a2 cross-model verdict** (GPT-5.5 conf=0.94): 1 of 3 claims REFUTED (cross-tool UNKNOWN)
**Revised decision**: DEFER-with-narrower-reason (workspace stability only)
**Forward gate**: WORKSPACE_REIMPLEMENTATION_* completes (workspace commands stable per `docs/cli.md:170`)
**Authority**: `fire-16-gpt55-multi-anatomy/01-openspec-correction-synthesis.md`

## Decision W134-F16-a3 — ARIS effort-knob extraction

**Subject**: wanshuiyin/aris-auto-claude effort-knob pattern
**Fire 13 classification**: CITE-PATTERN (vertical-domain mismatch)
**Fire 16-a3 cross-model verdict** (GPT-5.5 conf=0.97): APPROVE — all 3 claims VERIFIED
**Revised decision**: EXTRACT-PATTERN — extract `effort: lite/balanced/max/beast` to `advanced-agent-team-standing-directive.md` + add ARIS as 6th-org sister-framework reference
**Authority**: `fire-16-gpt55-multi-anatomy/04-aris-reinforcement-synthesis.md`

## Decision W134-F16-a4 — verified-avoid Cohort 3 reinforcement

**Subject**: nextlevelbuilder/ui-ux-pro-max-skill
**Fire 13 classification**: Cohort 3 fresh-paint REJECT
**Fire 16-a4 cross-model verdict** (GPT-5.5 conf=0.86): AFFIRM-REJECT — all 4 claims VERIFIED; vendor-spam ESCALATED 3→19 topics
**Revised decision**: AFFIRM-REJECT-REINFORCED (permanent unless ALL 4 re-evaluate triggers hit)
**Forward action**: add explicit Cohort 3 entry to `docs/verified-avoid.md`
**Authority**: `fire-16-gpt55-multi-anatomy/05-verified-avoid-reinforcement-synthesis.md`
```

## Update set 4 — `05-audit-coverage-tracker.md`

### Add new column to coverage table — Cross-model GPT-5.5 verified

```markdown
| Fire | Date | Audited | Total | Coverage % | Cross-model verified | Notes |
|---|---|---|---|---|---|---|
| Baseline | 2026-05-10 | 7 | 609 | 1.1% | 0 | pre-Wave-134 already-cited |
| W134-F5 B1-B6 | 2026-05-10 | 555+44 | 609 | 91.13% | 0 | A2 deep automated programmatic |
| W134-F10 | 2026-05-10 | 555 | 609 | A3→A2 promotion | 0 | GraphQL retry; 95.5% 404-elim |
| W134-F11 | 2026-05-10 | 555 | 609 | 99.83% strict | 0 | full GraphQL re-sweep |
| W134-F13 | 2026-05-10 | 50 anatomy + 1 cohort | 609 | A1 manual strict | 0 | 5 tier-anatomy line-by-line |
| W134-F15 | 2026-05-10 | 1 anatomy | 609 | 99.84% | **2 claims** | 1st GPT-5.5 cross-model |
| W134-F16-a1 | 2026-05-10 | 1 anatomy | 609 | 99.84% | **4 claims** | letta GPT-5.5 conf=0.93 |
| W134-F16-a2 | 2026-05-10 | 1 anatomy | 609 | 99.84% | **7 claims** | OpenSpec GPT-5.5 conf=0.94 |
| W134-F16-a3 | 2026-05-10 | 1 anatomy | 609 | 99.84% | **10 claims** | ARIS GPT-5.5 conf=0.97 (APPROVE) |
| W134-F16-a4 close | 2026-05-10 | 1 anatomy | 609 | 99.84% | **14 claims (5/5 anatomies = 100%)** | verified-avoid Cohort 3 AFFIRM-REJECT conf=0.86 |
| **W134-F17** | **2026-05-10** | **synthesis** | **616 TRUE** | **99.84% A1+A2 / 100% Fire 13 cross-model** | **14 claims** | **Architecture gap synthesis** |
```

## Application discipline

These updates are PRESCRIBED but NOT YET APPLIED. Per `port-note-discipline.md §6` + `codex-t1-fix-forward-pattern.md §Pattern A`:

- W134-F17 SHIPS the prescription (this folder)
- W134-F18-edit-existing-docs SHIPS the Pattern A apply (separate fire — atomic edits to 02/03/04/05)
- All historical commits remain UNTOUCHED

## Risk management

Per `synthesis-layer-verify.md §Reporting categories`: this prescription document IS subject to Mia pre-apply discipline. Future W134-F18 fire should:
1. Read the existing 02/03/04/05 documents in their current state
2. Verify each prescribed edit STILL MAKES SENSE given any intervening changes
3. Apply atomic single-commit Pattern A per `codex-t1-fix-forward-pattern.md`

## Mia ladder advance

n=1297 → n=1305 (+8: 4 update-set prescriptions / 4 decision-tracker entries / 1 coverage-table extension / application-discipline / risk-management / forward-only Pattern A convention)
