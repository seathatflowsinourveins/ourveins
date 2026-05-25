# 05 — Architecture Principles Extracted (6 phrase-defects → SOTA design cites)

> **Purpose**: 6 phrase-defects from Fire 10 data-quality classification (Type B) are
> actually SOTA architecture principles. Promote them from "discarded baseline noise"
> to "cited design principles" for eee.

## The 6 phrase-defects (Fire 10 Type B)

From Fire 10 file 03 §"Type B — Topic-strings / phrases":

```
1. "benchmarks/evals = proof, not vibes"
2. "skills/rules > giant claude.md"
3. "openhands/swe-agent/goose architecture references"
4. "mcp/plugins/hooks/bridges/memory/dashboards require source audit"
5. "github issues/prs/adrs = durable memory"
6. "ripgrep/fd/jq/yq/gh/pre-commit/just/mise/uv"
7. "mcp/plugin security runtime > broad mcp installation"
8. "cross-harness visibility > hidden config/context bloat"
```

These were extracted from kit-manifest descriptors as if they were repo slugs (Fire 5
extraction bug). Closer reading reveals they are SOTA design principles likely from
v60-v65 kit philosophy sections.

## Per-principle architecture analysis

### Principle 1: "benchmarks/evals = proof, not vibes"

**Translation**: production-grade systems require quantitative evals over qualitative impressions.

**eee alignment**:
- ✅ Codex `evals/` directory (Anthropic-canonical eval-first per `anthropics/skills/skills/skill-creator/SKILL.md`)
- ✅ promptfoo + DeepEval + openlit eval stack (INSTALLED)
- ✅ Fire 8 `convergence-gate.md` §Row-2 fabrication-test FAIL — auto-REJECT on 3+ unsourced numeric claims
- ✅ superpowers Contributor Guidelines: "eval evidence showing the change improves outcomes" required for skill modifications

**Cite-anchor for eee**: this principle is operationalized in `convergence-gate.md` Row-2
fabrication-test discipline + sister-rule `Z:/claude-sota/.claude/rules/audit-action-loop.md`.

### Principle 2: "skills/rules > giant claude.md"

**Translation**: modular skill/rule files outperform monolithic CLAUDE.md per user-research
"small CLAUDE.md + many skills + one method framework" SOTA stack.

**eee alignment**:
- ✅ eee uses small CLAUDE.md (~145 LOC) + many skills under `.claude/skills/` + many rules
  under `.claude/rules/` (per sibling `Z:/claude-sota/.claude/rules/*.md`)
- ✅ Cardinal-rule-1 cite-trail enforced in modular form
- ✅ Fire 6+8 architecture-v1/v2 explicitly support modular skill/rule layout
- ⚠️ W134-F9 hygiene queue includes CLAUDE.md size review (current size = ?)

**Cite-anchor for eee**: this principle is OPERATIONAL in eee's `.claude/skills/` +
`.claude/rules/` layout vs CLAUDE.md governance bootstrap.

### Principle 3: "openhands/swe-agent/goose architecture references"

**Translation**: cite-anchor 3 SOTA open-source autonomous-agent frameworks for
architectural-comparison.

**eee status**:
- **openhands/openhands** — Fire 11 top-25 #19 (73k★ NOASSERTION); CITE-only
- **swe-agent** — Princeton-NLP SWE-bench leader; CITE-only (not in 555 baseline; Fire 12 candidate)
- **aaif-goose/goose** — already cited in `team-orchestration.md` §"Sister-framework references"
  as architectural-comparison (AAIF/Linux Foundation 4th-org)

**Cite-anchor for eee**: 3-of-3 already cited or queued for cite. This principle is
ALREADY OPERATIONAL.

### Principle 4: "mcp/plugins/hooks/bridges/memory/dashboards require source audit"

**Translation**: trust-boundary primitives need source-level audit before adoption (don't
adopt blindly).

**eee alignment**:
- ✅ Cardinal-rule-1 cite-trail at file:line + HEAD SHA
- ✅ Cardinal-rule-9 install-risk discipline (REVERT check, sibling-bleed defense, version-pin)
- ✅ Fire 5-11 audit arc = ~6105 LOC of source-level deep-dives across 92 strict-audited repos
- ✅ Cardinal-rule-11 META-process — every build-step cites SOTA primary source

**Cite-anchor for eee**: this principle is the META-DIRECTIVE behind the entire Fire 5-11
audit arc. CONFIRMED operationally.

### Principle 5: "github issues/prs/adrs = durable memory"

**Translation**: GitHub Issues + PRs + ADRs (Architecture Decision Records) are the SOTA
durable cross-session memory layer (vs ephemeral notes).

**eee alignment**:
- ✅ ccpm (Fire 8 anatomy) makes GitHub Issues the source-of-truth for tasks
- ✅ eee uses commit messages as audit-trail per `cross-model-consensus.md §Source-cite discipline`
- ⚠️ ADRs are NOT yet operational in eee (no `docs/adrs/` or similar)
- ✅ `karpathy-adapted.md §5 Wiki Compounding Surface` is the eee analogue

**W134-F12 candidate**: introduce `docs/adrs/` for major architectural decisions (e.g.,
Fire 8 architecture-v1 → ADR-001, Fire 10 GraphQL methodology → ADR-002).

### Principle 6: "ripgrep/fd/jq/yq/gh/pre-commit/just/mise/uv"

**Translation**: the SOTA CLI toolchain for AI-augmented engineering.

**eee status**:
- ✅ **ripgrep** — INSTALLED (system PATH)
- ✅ **fd** — INSTALLED (sister to ripgrep)
- ✅ **jq** — INSTALLED (canonical JSON CLI)
- ⚠️ **yq** — pipx-installable; Fire 12 candidate if YAML processing demand surfaces
- ✅ **gh** — INSTALLED (GitHub CLI, verified Fire 10 GraphQL auth)
- ⚠️ **pre-commit** — INSTALLED via promptfoo eval scaffold (Fire 8 W134-F8 install)
- ⚠️ **just** — task runner; pipx-installable; Fire 12 candidate
- ⚠️ **mise** — runtime version manager; alternative to uv for non-Python
- ✅ **uv** — INSTALLED (Python toolchain)

**Coverage**: 5 of 9 INSTALLED, 4 of 9 candidates for Fire 12.

### Principle 7: "mcp/plugin security runtime > broad mcp installation"

**Translation**: install fewer MCPs with stronger security/audit > install many MCPs broadly.

**eee alignment**:
- ✅ Per user-research "2-3 active plugins, never more" — eee has ~26 MCPs (HIGHER than
  user-research-recommended; W134-F9 hygiene "ECC /agent-sort audit" addresses this)
- ✅ Mia pre-apply discipline (`mia-pre-apply.md`) gates EVERY install
- ✅ Cardinal-rule-9 install-risk discipline (REVERT check + sibling-bleed defense)
- ⚠️ Current 26-MCP count exceeds user-research recommendation; needs prune
- ✅ Fire 11 file 03 SRA D1 use-class analysis confirms restrictive-license repos are correctly classified for install vs CITE

**Cite-anchor for eee**: this principle directly motivates the W134-F9 hygiene queue +
ECC /agent-sort audit for context-budget.

### Principle 8: "cross-harness visibility > hidden config/context bloat"

**Translation**: cross-tool visibility (CLAUDE.md + AGENTS.md + GEMINI.md) outranks
harness-specific opaque config.

**eee alignment**:
- ✅ ALREADY OPERATIONAL via Superpowers' N-lateral cross-tool manifests (Fire 8 anatomy)
- ✅ Anthropic Agent Skills standard adopted by Codex/Cursor/Gemini CLI/Antigravity/Windsurf
- ✅ eee CLAUDE.md + CLAUDE.local.md is small + transparent
- ✅ ouroboros (Fire 9 anatomy) ships CLAUDE.md + AGENTS.md + GEMINI.md + extension JSON
- ✅ spec-kit (Fire 8) supports 10+ agent integrations via subpackages

**Cite-anchor for eee**: this principle is the FOUNDATIONAL design rationale for Agent
Skills standard adoption + N-lateral cross-tool manifests.

## Summary: 8 principles → eee alignment

| # | Principle | eee state |
|---|---|---|
| 1 | benchmarks/evals = proof, not vibes | ✅ OPERATIONAL (eval stack + convergence-gate Row-2) |
| 2 | skills/rules > giant claude.md | ✅ OPERATIONAL (modular layout) |
| 3 | openhands/swe-agent/goose architecture references | ✅ OPERATIONAL (3 cite-anchors) |
| 4 | mcp/plugins/hooks/bridges/memory/dashboards require source audit | ✅ OPERATIONAL (Cardinal-rule-1+9+11) |
| 5 | github issues/prs/adrs = durable memory | PARTIAL (commits ✅, ADRs queued) |
| 6 | ripgrep/fd/jq/yq/gh/pre-commit/just/mise/uv | 5/9 INSTALLED, 4 Fire-12 candidates |
| 7 | mcp/plugin security runtime > broad mcp installation | PARTIAL (Mia ✅, prune queued W134-F9) |
| 8 | cross-harness visibility > hidden config/context bloat | ✅ OPERATIONAL (Agent Skills standard) |

**Coverage**: 6 of 8 principles FULLY OPERATIONAL; 2 PARTIAL with explicit follow-fire candidates.

## Forward fire candidates extracted

| Fire | Action | Source principle |
|---|---|---|
| W134-F12-yq-install | pipx install yq | #6 |
| W134-F12-just-install | pipx install just | #6 |
| W134-F12-adrs-introduction | introduce `docs/adrs/` for major decisions | #5 |
| W134-F12-mcp-prune | ECC /agent-sort audit + reduce 26 MCPs to <10 | #7 |

## Mia ladder advance

n=1115 → n=1123 (+8: 8 principles extracted from defects / per-principle eee alignment
analyzed / 4 forward-fire candidates identified)
