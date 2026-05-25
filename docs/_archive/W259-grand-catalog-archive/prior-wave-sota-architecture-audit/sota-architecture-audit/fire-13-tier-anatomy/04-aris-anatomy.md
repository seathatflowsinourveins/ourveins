# 04 — wanshuiyin/Auto-claude-code-research-in-sleep (ARIS) anatomy

> **Source**: `Z:/repos/deps/aris-auto-claude @ HEAD 5725459ef5847263e9982f3390a6aa12f2320eaa [VERIFIED 2026-05-10]`
> **License**: MIT (verified at root LICENSE)
> **Stars**: 8,704 (Fire 12 discovery)
> **Push**: 2026-05-07 (3 days ago — ACTIVE)
> **Audit depth**: README (1039+ LOC) + AGENT_GUIDE.md + skills directory inventory

## What it is

**ARIS ⚔️🌙 (Auto-Research-In-Sleep)** — Lightweight Markdown-only research harness that
orchestrates the **ML research lifecycle** through cross-model adversarial collaboration.
Built by `wanshuiyin` (named individual). Cross-tool: Claude Code + Codex CLI + Cursor + Trae.

## Top-level structure

```
aris-auto-claude/
├── AGENT_GUIDE.md             ← guide for AI agents using ARIS
├── CONTRIBUTING.md
├── CONTRIBUTING_CN.md         ← Chinese version
├── LICENSE                     ← MIT
├── README.md (1039+ LOC)
├── README_CN.md                ← Chinese
├── assets/
├── community_papers/          ← real research papers built with ARIS
├── docs/
├── mcp-servers/               ← MCP integrations
├── skills/                    ← 20+ research skills
└── templates/
```

## 20+ research skills (sample inventory)

```
ablation-planner             ← experiment design
alphaxiv                     ← arxiv exploration
analyze-results              ← analyze experiment outputs
arxiv                        ← arxiv search/scrape
auto-paper-improvement-loop  ← iterative paper improvement
auto-review-loop             ← peer-review automation
auto-review-loop-llm         ← LLM-driven review
auto-review-loop-minimax     ← minimax review (adversarial)
citation-audit               ← citation verification
claims-drafting              ← claim formulation
comm-lit-review              ← literature review
deepxiv                      ← deep arxiv reasoning
dse-loop                     ← data-science engineering loop
embodiment-description       ← embodied AI descriptions
exa-search                   ← Exa-API integrated search
experiment-audit             ← experiment validity audit
experiment-bridge            ← experiment-design-to-execution bridge
experiment-plan              ← experiment planning
experiment-queue             ← experiment scheduling
feishu-notify                ← Feishu/Lark notification
```

(+ many more not shown in first 20-line listing)

## Workflow grammar (from README headings)

```
Workflow 1: Idea Discovery & Method Refinement (line 489)
Workflow 1.5: Experiment Bridge (line 568)
Workflow 2: Auto Research Loop 🔁 (sleep & wake up to results) (line 613)
Workflow 3: Paper Writing Pipeline (line 678)
Workflow 4: Rebuttal — reply to reviewers safely (line 791)
Research Wiki — Persistent Research Memory (line 846)
Workflow M: Meta-Optimize 🧬 (ARIS optimizes itself) (line 913)
```

## Skill invocation grammar (AGENT_GUIDE.md)

```
Claude Code / Cursor / Trae:
  /skill-name "arguments" — key: value, key2: value2

Codex CLI:
  /skill-name "arguments" — key: value
```

**Common parameters across ALL skills**:
- `— effort: lite | balanced | max | beast` (work intensity, default balanced)
- `— human checkpoint: true | false` (pause for approval, default false)
- `— AUTO_PROCEED: true | false` (auto-continue at gates, default true)

**Workflow-specific**:
- `— difficulty: medium | hard | nightmare` (reviewer adversarial level)
- `— venue: ICLR | NeurIPS | ICML | ...` (target venue)
- `— sources: web, zotero, deepxiv, ...` (literature sources)
- `— gpu: local | remote | vast | modal` (GPU backend)

## SRA D1-D10 verdict

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS | MIT |
| D2 freshness | PASS | 3-day push, ACTIVE |
| D3 fresh-paint clear | PASS | 8.7k★ + 20+ skills + community-papers showcase + multi-locale |
| D4 maintainer-provenance | PARTIAL | wanshuiyin TIER-4-NAMED-INDIVIDUAL (probe via community submissions) |
| D5 active-maintenance | PASS | active commits + community contributions |
| D6 use-class compat | PASS | Markdown-only Agent Skills format = native cross-tool |
| D7 Anthropic-aligned | PASS | Agent Skills standard + cross-tool (CC/Codex/Cursor/Trae) |
| D8 industry adoption | PASS | community-papers folder + 8.7k★ + community-submissions showcase |
| D9 FM-class clear | PASS | "Assurance Gate" effort:max system at L1039 = explicit reliability gate |
| D10 replacement viability | NOT REPLACEMENT — DOMAIN ADDITION | ML research vertical; eee has no ML-research-specific primitives |

**SRA score: 9/10 PASS + 1 PARTIAL (D4 individual maintainer)** — strong vertical-domain
candidate.

## Architecture comparison with eee patterns

| ARIS primitive | eee equivalent | Verdict |
|---|---|---|
| `effort: lite/balanced/max/beast` | eee has fixed-effort agents | ARIS pattern WORTH-EXTRACTING for tunable-effort dispatch |
| `human checkpoint: true/false` | eee has auto-proceed-gate | DIRECT PARALLEL |
| `AUTO_PROCEED: true/false` | eee has auto-proceed-gate | DIRECT PARALLEL |
| Workflow grammar (1, 1.5, 2, 3, 4, M) | eee has Fire-N sequencing | ANALOGUE |
| Auto Research Loop (sleep & wake) | eee has /loop autonomous arc | DIRECT PARALLEL |
| Research Wiki — Persistent Research Memory | Karpathy 3-layer wiki (eee) | DIRECT PARALLEL |
| Meta-Optimize (ARIS optimizes itself) | eee META-process per CR-11 | DIRECT PARALLEL |
| Cross-model adversarial collaboration | eee cross-model T1-T7 lifecycle | DIRECT PARALLEL |
| Reviewer adversarial level (medium/hard/nightmare) | eee FM-09 codex-rescue blind-spot specialization | ANALOGUE |
| GPU backend (local/remote/vast/modal) | eee N/A (not ML research) | NOT-APPLICABLE for eee core; useful if eee adds ML training surface |

**Convergence count**: 7 direct parallels + 2 analogues + 1 not-applicable. **STRONG-CONVERGENCE**
with eee architecture similar to Q00/ouroboros (Fire 9 file 02).

## Architecture verdict: CITE-PATTERN (not install) 📚

**📚 CITE-PATTERN** — extract ARIS-specific patterns as architectural inspiration; do NOT
install whole as eee is not ML-research-focused.

**Patterns worth extracting**:
1. **Tunable-effort dispatch** (`effort: lite/balanced/max/beast`) → could enhance eee's
   agent-team-standing-directive with effort-knob
2. **Reviewer adversarial level** (`difficulty: medium/hard/nightmare`) → could augment
   eee's cross-model T2 review with severity-knob
3. **Meta-Optimize self-improvement** (Workflow M) → echoes eee's CR-11 META-process
   and Karpathy §5 wiki-compounding-surface

## Why-SOTA in its vertical

1. **Markdown-only** = lightweight, cross-tool, parseable
2. **Cross-tool native** (CC + Codex + Cursor + Trae) — N-lateral architecture
3. **20+ skills** for the ML research lifecycle
4. **Auto Research Loop** = "sleep & wake up to results" autonomous pattern
5. **Community papers showcase** = empirical validation
6. **Meta-Optimize** = self-improving research harness
7. **Cross-model adversarial collaboration** = quality-via-disagreement principle (matches eee CR-3)

## Risk classification

- **Install class**: N/A — CITE-PATTERN only (vertical domain mismatch with eee core)
- **Reversibility**: TRIVIAL (cite-only)
- **Blast radius**: ZERO (no install)
- **License**: MIT clean
- **kiss-dry-yagni**: respected by not installing (eee not ML-research-focused)

## Forward fire candidates

- **W134-F14-effort-knob**: introduce `effort: lite/balanced/max/beast` parameter to
  eee's `advanced-agent-team-standing-directive.md`
- **W134-F14-aris-cite**: cite ARIS in `team-orchestration.md §Sister-framework references`
  as 6th-org architectural-comparison

## Mia ladder advance

n=1192 → n=1196 (+4: MIT verified / 20+ skill inventory / 7-of-10 convergence with eee
patterns / CITE-PATTERN verdict)
