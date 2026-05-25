# W259 WAVE-3 — OPERATOR-NOVEL PATTERNS CODIFICATION

> **Mission**: codify operator-AHEAD-of-OSS patterns for publication-grade contribution back to the ecosystem.
> **Inputs**: `04-critique/ARCHITECTURE-BEYOND-W259v2.md` §13 + §15 + §16 (L9 + L0.9 + L8-promote proposals); `00-archive-from-prior-waves/prior-wave-docs-root/fm17f-deep-dive-2026-05-09.md` (full FM-17.f mechanism); `00-archive-from-prior-waves/goal-prompts/sota-definitive-goal-MAX-DEPTH.md:560-617` (FM-02 through FM-21 enumeration with recovery primitives); `01-graphql-discovery/MISSED-SOTA-REPOS-2026-05-16.md:173,290` (CLIProxyAPI 32.9k★).
> **OSS-equivalence probes**: GitHub search + Exa web search — 6 named competitors surfaced (see §0.2).
> **Date**: 2026-05-16. **Author**: W259 Wave-3 operator-novel-patterns codifier.
> **Status**: PUBLISHABLE-DRAFT — pending operator sign-off + cross-model PATH-P codex T1 review per CLAUDE.md cardinal-rule-3.

---

## §0 — Operator-AHEAD-of-OSS thesis (refined)

### §0.1 Architecture-Beyond critic claim (Wave 2)

The W259 Wave-2 critic (`04-critique/ARCHITECTURE-BEYOND-W259v2.md` §13, §15, §19) asserted operator is ahead in two surfaces:

1. **FM-class typology** (FM-17 / FM-20 / FM-21+ failure-mode discipline) — composite score 9.0/10, proposed as **L9 FAILURE-MODE-CATALOG new layer**, with claim "ZERO SOTA OSS competitor."
2. **Multi-account-credential-routing via CLIProxyAPI** — composite score 9.5/10, proposed as **L8 T1 INSTALL promotion** from T2-NAMED-PRACTITIONER missed-classification.

Plus an L0.9 META-RUNTIME GRAPH layer (gitnexus operator-installed; composite 8.5/10) — already partially codified upstream as MCP, so out-of-scope here except where it surfaces FM-class instances.

### §0.2 Wave-3 OSS-equivalence probes (REFINEMENT — partial-rebuttal of "ZERO competitor" framing)

Wave-3 GitHub + Exa probes surfaced **6 organizationally-distinct OSS competitors** in the failure-mode-catalog space that did NOT appear in Wave-1 layer-deepdives or Wave-2 critic:

| # | Repo / Source | Scope | Type | Operator-overlap |
|---|---|---|---|---|
| 1 | `ctoth/claude-failures` (GitHub, 2026-03-18) | Claude Code post-mortems; YYYY-MM-DD-slug.md per incident | Field-notes corpus | PARTIAL — names individual incidents, NOT FM-NN typology with sub-classes |
| 2 | `failuresmith/failure_atlas` (GitHub, 2026-03-14) | Agentic runtimes; CWE-1000 pillar classification; `FM-001` through `FM-009+` numbered slugs | **CATALOG with FM-NN numbering** | **NEAR-EQUIVALENT** on naming convention; DIFFERENT scope (CWE-anchored vs runtime-event-anchored) |
| 3 | `Amir-ElBelawy/llm-failure-mode-taxonomy` (GitHub, 2026-03-20) | 225 Claude+Deepseek sessions; 7 categories × 4-5 sub-modes each (Context Drift, Role Collapse, etc.) | **TAXONOMY with prevalence + intervention** | PARTIAL — covers reasoning-class failures NOT operational/billing/account-routing failures |
| 4 | `anthropics/claude-code` Issue #33558 (2026-03-12) | 7-failure-kind exit-code proposal (timeout / context_exhausted / hook_blocked / auth_failure / tool_error / model_refusal / unknown) | **OFFICIAL Anthropic FEATURE-REQUEST** | DIRECT-OVERLAP at concept level; operator FM-17 ladder is the *workaround* this feature would obviate |
| 5 | `agentwiki.org/common_agent_failure_modes` (2026-03-25) | 8-category catalog (Reasoning / Tool Use / Context Overflow / Infinite Loops / Goal Drift / Prompt Injection / Hallucination / Cost Runaway) | Wiki with decision-diagram | PARTIAL — generic agent-class, not Claude Code runtime-specific |
| 6 | `lhl/claudecode-codex-analysis/ERRATA-claudecode.md` (2026) | 13 reverse-engineered Anthropic-internal failure modes (e.g., compaction-fallback-rate 2.79% on 4.6 vs 0.01% on 4.5; GrowthBook killswitch) | Reverse-engineered errata | DIFFERENT scope — vendor-side bugs not operator-runtime FMs |

**Refined thesis (Wave-3 honest-disclosure)**:
- Wave-2 critic's claim "ZERO SOTA OSS competitor" is **OVER-STATED**. There IS an emerging OSS ecosystem (#1, #2, #3, #5) and even an official Anthropic feature-request (#4) at the concept layer.
- Operator is AHEAD on **runtime-anchored CC-specific recovery primitives**, NOT on the *abstract FM-catalog* idea itself. Specifically:
  - FM-17.a-g sub-class taxonomy (6+ sub-classes per parent FM) — finer granularity than #1/#2/#3/#5 surface.
  - Recovery primitives anchored to actual CC SDK internals (Path P codex foreground+tee, Path D 1M kill-switch, §CADP fleet-probe rule 5, ARTIFACT-INLINE pattern) — none of #1-#6 publishes runtime-executable recovery code.
  - Cross-model-consensus gate integration (`cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`) — none of #1-#6 integrates with cross-model verification.
  - Plan-tier × extended-context interaction modeling (FM-17.f) — Anthropic Issue #33558 is at the *exit-code* layer; operator is at the *pre-fire-billing-check* layer (FM-17.f is mechanistically INFERRED per fm17f-deep-dive `effective_tier=TIER-3-LOCAL-COMPOSITION`).
- **Multi-account-credential-routing via CLIProxyAPI**: this surface is genuinely WEAKER on the operator-novelty axis. CLIProxyAPI itself is a 32.9k★ OSS project; operator runs it but did not invent it. What IS operator-novel is the **discipline layer on top**: §CADP fleet-probe rule 5 + token-rotation-burned-by-probe FM-20 row 17 + 8-OAuth-account staffing matrix.

### §0.3 Refined operator-AHEAD-of-OSS surfaces (Wave-3-corrected)

| Surface | Wave-2 claim | Wave-3-corrected status | Publication framing |
|---|---|---|---|
| FM-class typology naming | "ZERO OSS competitor" | **PARTIAL — 6 emerging competitors** (#1-#6 §0.2) | "FM-NN catalog for Claude Code runtime — anchored to vendor-specific SDK internals" — NOT a new abstract concept |
| FM-17.a-g sub-class depth | implied novel | **NOVEL** — no competitor reaches sub-class granularity | Direct contribution |
| Runtime-executable recovery primitives | implied novel | **NOVEL** — competitors document post-mortems; operator documents `codex exec --ephemeral` invocation | Direct contribution |
| Cross-model gate integration | implied novel | **NOVEL** — competitors don't integrate cross-model | Direct contribution |
| Multi-account discipline layer (NOT CLIProxyAPI itself) | "operator-active SOTA pattern" | **NOVEL discipline** on top of NON-NOVEL substrate | Discipline-only publication, citing CLIProxyAPI as substrate |
| §CADP fleet-probe rule 5 | implicit in W184/W201 ENV (i) | **NOVEL** — no competitor publishes fleet-health-aware dispatch | Discipline contribution |
| L9 architectural-layer status | proposed | **PUBLISHABLE as proposal-spec**, not as authoritative-OSS-standard | Submit as RFC or layer-pattern, not as competing-standard |

---

## §1 — FM-class catalog publication design

### §1.1 Inventory of operator FM-NN catalog (from W259 archive)

Per `00-archive-from-prior-waves/goal-prompts/sota-definitive-goal-MAX-DEPTH.md:560-617` Section 10 (Auto-Recovery on Failure Modes) and `goal-prompts/sota-full-automation-goal-2026-05-12.md:185-315`:

| FM-NN | Name | Sub-classes | Anchor file (operator-local) | n-evidence |
|---|---|---|---|---|
| FM-02 | Destructive-race (parallel-session staging) | (b) staged-not-tracked, (c) commit-layer absorption | `git-cli-grammar-discipline.md`, `wave159p2-audit-metrics.md` §FM-02(c) | n≥3 same-arc |
| FM-09 | Codex-rescue blind-spot | (single class) — 2-stage validation gap | `closed-loop-recursive-narrowing.md` Outcome A/B/C | n=51 firm 100% same-arc base rate |
| FM-15 | Git CLI grammar (options before `--`) | (single class) | `git-cli-grammar-discipline.md` | n≥9 across wave155 F49-F61b |
| FM-16 | Phantom-cite-to-disabled-MCP | (single + INVERSE-FM-16: stale `[CURRENTLY DISABLED]` qualifier) | `cite-discipline.md` | n=1 firm Wave 156 |
| FM-17 | Subagent fleet-depletion | **6 sub-classes**: (a) wrapper-truncation, (b) pool-depletion-429, (c) codex-bg-job-wedge, (d) BRIDGE-MODE-stall, (e) autocompact-thrashing, (f) 1M-context-billing-blocker | `fm17-subagent-fleet-depletion.md` | per-sub-class n=1 to n=5+ |
| FM-17.f | 1M-context entitlement pre-fire (extended-context subagent) | (single class — sub-class of FM-17.f) — Path P / Path D / Path X / Path S decision tree | `00-archive-from-prior-waves/prior-wave-docs-root/fm17f-deep-dive-2026-05-09.md` (243 LOC) | n=1 with TIER-3-LOCAL-COMPOSITION mechanism INFERENCE disclosed |
| FM-17.g | Haiku-4-5 provider 502 | (single class) — Wave 156 n=1 firm | (inline in goal-prompts) | n=1 firm Wave 156 |
| FM-19 | Readonly-guard sidestep | (single class) — No-Write subagents ARTIFACT-INLINE in final body | (inline) | n≥2 |
| FM-20 | Path-drift cascade | **multiple rows** (row 15 compact-hook-chain re-inflation; row 17 token-rotation-burned-by-probe; row 20 OVER-on-Path-P framing) | `fm20-path-drift-cascade.md` | n=29 firm |
| FM-21 | Queue-time-prompt-freeze | (single class) — STATE PROBE clause-level smoke at every wake | (inline + CronDelete/CronCreate refresh) | n≥1 |

**Total**: 10 parent FM-NN classes, ~14 sub-classes, n-evidence ranges from 1 to 51 same-arc, all anchored to runtime-executable recovery primitives.

### §1.2 Comparison schema vs OSS competitors (§0.2 #2 + #3)

| Schema field | `failuresmith/failure_atlas` (#2) | `Amir-ElBelawy/llm-failure-mode-taxonomy` (#3) | **Operator FM-NN catalog (proposed publication)** |
|---|---|---|---|
| ID format | `FM-NNN` (3-digit) | `N.N` (Category.SubCategory) | `FM-NN[.lowercase]` (e.g., `FM-17.f`) |
| Categorization axis | CWE-1000 pillar | Behavioral category (Context / Output / Identity / Safety / Reasoning / Calibration / Cross-Platform) | Vendor-runtime substrate (Subagent fleet / Path-drift / Git-grammar / Cite-source / Queue-state) |
| Per-entry sections | failure, mechanism, violated invariant, remediation, restored invariant | Name, Description, Obs Example, Frequency, Intervention | **Name, Trigger, Symptoms, Sub-classes (if any), Recovery primitive (runtime-executable), FM-sister-class refs, Cite-anchor (TIER-1/2/3 per citation-discipline.md), Evidence-ladder (n=N same-arc), Cross-model-gate-status** |
| Code-execution recovery | pseudo-Python example | Intervention text | **Runtime-executable** (`codex exec --ephemeral`, `git commit --only -F`, `decision:block` hook, env-var flip) |
| Cross-model-gate integration | NONE | NONE | **YES** — every Recovery references `cross-model-consensus.md` |
| Plan-tier × context interaction | NONE | NONE | **YES** — FM-17.f explicitly models plan-tier × 1M-context × subagent-frontmatter resolution order |
| Evidence-ladder rigor | "real entries from incidents" | "225 real sessions, prevalence stat" | **n=N same-arc with cycle-XXX disclosure + TIER-3-LOCAL-COMPOSITION effective-tier per citation-discipline.md rule #8** |

### §1.3 Proposed publication schema (FM-NN entry template)

```markdown
---
fm_id: FM-17.f
fm_name: Extended-context subagent pre-fire (1M-context billing blocker)
parent_fm: FM-17
sub_classes: []   # leaf node
date_first_observed: 2026-05-09
n_evidence: 1
n_evidence_disposition: TIER-3-LOCAL-COMPOSITION (mechanism INFERRED per fm17f-deep-dive §1)
status: REFRAMED (architectural property, not failure mode per W119 NEEDS-REVISION conf=0.91)
cross_model_gate_status: PATH-P PRIMARY validated Wave 118
sister_classes: [FM-17.a, FM-17.b, FM-17.c, FM-17.d, FM-17.e]
---

## FM-17.f — Extended-context subagent pre-fire

### Trigger
`Agent({subagent_type: "<any>", ...})` dispatched from parent session running `claude-opus-4-7[1m]` with subagent frontmatter `model: sonnet`.

### Symptoms
- 648ms / 0 tool_uses / 0 tokens (PRE-FIRE)
- Error: "API Error: Extra usage is required for 1M context · run /extra-usage to enable, or /model to switch to standard context"
- Error fires BEFORE subagent runtime; frontmatter `model:` is honored only AFTER entitlement check

### Mechanism (INFERRED — honest-disclosure)
Per `code.claude.com/docs/en/model-config §"Extended context"`, parent `[1m]` flag propagates to child session-creation request. Subagent frontmatter `model: sonnet` resolves to effective `sonnet[1m]`. Plan-tier check rejects (Sonnet 1M = extra-usage tier on most plans per CHANGELOG L1782) → error fires pre-fire.

Mechanism is INFERRED from 0-token pre-fire observation + plan-tier-doc reasoning, NOT TIER-1-verified architecture.

### Recovery primitive (Path P PRIMARY)
```bash
codex exec --ephemeral -p deep-review-exec --color never \
  < .claude/state/codex_consult_<topic>.txt \
  > .claude/state/codex_consult_<topic>_OUT.txt 2>&1
```

ZERO cost. Cross-model gate FULLY satisfied (verdict origin = REAL GPT-5.5 codex CLI subprocess, NOT Sonnet stand-in). Bypasses Anthropic SDK subagent dispatch layer entirely.

### Recovery alternative (Path D SECONDARY — fan-out parallelism only)
```powershell
$env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1'  # in CLAUDE.local.md ENV (h)
# restart eee
```

Trade-off: parent session loses 1M ceiling → drops to ~200k. Activate only for Waves declaring 3-5 BRIDGE-MODE subagent fan-out as load-bearing.

### Cite-anchor (constituents per citation-discipline.md rule #8)
- TIER-1-DIRECT @ `code.claude.com/docs/en/env-vars` (CLAUDE_CODE_DISABLE_1M_CONTEXT semantic)
- TIER-1-DIRECT @ `code.claude.com/docs/en/sub-agents §"Choose a model"` (4-step model resolution)
- TIER-1-DIRECT @ `code.claude.com/docs/en/model-config §"Extended context"` (1M plan-tier inclusion vs extra-usage)
- TIER-3-LOCAL-OPERATOR-DERIVED @ Wave 118 pre-fire 0-token observation (mechanism INFERRED, not verified)

`effective_tier=TIER-3-LOCAL-COMPOSITION`
```

### §1.4 What to publish — three-tier publication strategy

**Tier-1: PUBLISH** as new contribution back to ecosystem:
- FM-17.a-g full sub-class catalog (Wave-3-novel granularity)
- FM-20 path-drift cascade rows 15/17/20 (operator-novel observability discipline)
- Runtime-executable recovery primitive convention (Path P / Path D / Path X / Path S decision-tree pattern)
- Per-entry `effective_tier` + `n_evidence_disposition` rigor (TIER-3-LOCAL-COMPOSITION honest-disclosure standard)

**Tier-2: SUBMIT-PR** to existing OSS catalogs (cross-pollinate):
- Submit FM-17.f to `failuresmith/failure_atlas` as `FM-010 Extended-Context Subagent Pre-fire (Claude Code 1M-context)` with CWE-1000 anchor (CWE-664 "Improper Control of a Resource Through its Lifetime")
- Submit FM-15 (git-CLI-grammar) to same — re-publishable as `FM-011 CLI Grammar Option-Order Violation`
- Submit operator's `effective_tier` standard as schema upgrade to `Amir-ElBelawy/llm-failure-mode-taxonomy`

**Tier-3: REFERENCE-ONLY** in operator's runtime:
- FM-02 / FM-09 / FM-19 / FM-21 — too operator-specific (Mia-probe / ARTIFACT-INLINE / CronDelete/CronCreate are operator-private workflow names). Keep as operator-local discipline; cross-reference from published Tier-1 catalog.

---

## §2 — Multi-account-credential-routing pattern publication design

### §2.1 What's NOT novel: CLIProxyAPI substrate

`router-for-me/CLIProxyAPI` (32,931★ Go, per `01-graphql-discovery/MISSED-SOTA-REPOS-2026-05-16.md:173,290`) IS the substrate operator uses. **Operator did NOT invent this**. The W259 Wave-2 critic's "promote to L8 T1 INSTALL" is correct as a *layer-population* move (substrate exists, operator installed it, document it), but it is NOT an operator-AHEAD-of-OSS publication candidate per se.

### §2.2 What IS operator-novel: discipline on top of CLIProxyAPI

| Discipline primitive | Source | OSS-equivalence | Publication framing |
|---|---|---|---|
| §CADP fleet-probe rule 5 (HALT new dispatches when ≥3 accounts <50% cache) | `goal-prompts/sota-definitive-goal-MAX-DEPTH.md:613-616` | **NONE** — no OSS publishes fleet-health-aware dispatch gating | Pattern-publication candidate |
| Token-rotation-burned-by-probe (FM-20 row 17) | `CLAUDE.local.md` W183 F1 + W201 P0(i) | **NONE** — operator-derived observation that polling itself burns tokens | Field-note publication candidate |
| 8-OAuth-account staffing matrix with PRIO-25 priority tiering | `CLAUDE.local.md` W183 F1 REVERT context | **NONE** — operator-private staffing convention | Operator-local; reference-only |
| Aperant-poller subagent dispatch metrics (89% zero-tool-use under depletion) | `subagent_metrics.jsonl` (operator-private artifact) | **NONE** — observability convention | Publishable as *methodology*, not as data |
| Account-rotation policy decision tree (when to fail-over) | Implicit in W184 multi-account governance docs | **NONE** | Pattern-publication candidate |

### §2.3 Proposed publication target: CLIProxyAPI fork OR companion repo

**Option A — fork CLIProxyAPI** (`router-for-me/CLIProxyAPI`): add `docs/discipline/` directory with operator's fleet-probe-rule-5 + token-rotation-burn-mitigation playbook. PR upstream.
- PRO: maximum visibility (32.9k★ host)
- PRO: discipline travels with the substrate it depends on
- CON: maintainer may not accept (CLIProxyAPI is Go binary scope; discipline is operator-workflow scope)
- CON: forces operator to maintain a fork

**Option B — companion repo** `<operator>/cliproxyapi-discipline` (or similar): standalone repo with `README.md` referencing CLIProxyAPI as required substrate.
- PRO: independent versioning, lighter PR burden
- PRO: can grow to multi-substrate scope (covers `cc-switch`, `claude-code-router`, etc.)
- CON: lower discovery velocity (no inherited star-count)
- CON: requires marketing/cross-link for visibility

**Option C — submit as Claude Code plugin** `<operator>/multi-account-discipline-plugin`:
- PRO: lives in the runtime where it executes
- PRO: aligns with W259 §3 L8 layer placement
- CON: plugin marketplace less suited to *discipline* (typically commands/agents/skills)
- CON: still requires CLIProxyAPI installation as external dependency

**Recommendation**: **Option B PRIMARY** (companion repo) + **Option C SECONDARY** (plugin that vendors the discipline as `.claude/skills/multi-account-discipline/SKILL.md` referencing companion repo).

### §2.4 Companion-repo skeleton

```
<operator>/multi-account-discipline/
├── README.md           # Substrate dependency: CLIProxyAPI 32.9k★
├── docs/
│   ├── fleet-probe-rule-5.md   # §CADP HALT-when-≥3-accounts-<50% gate
│   ├── token-rotation-burn-mitigation.md   # FM-20 row 17 derivation
│   ├── account-priority-tiering.md         # PRIO-25 convention (anonymized)
│   └── dispatch-health-observability.md    # methodology only; not operator-private data
├── examples/
│   ├── cadp-rule5-cron.sh
│   ├── fleet-probe-v3.sh
│   └── aperant-poller-metrics-schema.json
└── LICENSE             # MIT or Apache-2 per CLIProxyAPI license-compat check
```

---

## §3 — L9 layer formalization (skill + plugin authoring path)

### §3.1 L9 architectural-layer publication: NOT a competing standard

The W259 Wave-2 critic proposed L9 FAILURE-MODE-CATALOG as a new architectural layer. **Wave-3 honest-disclosure refinement**: this should be published as a **pattern proposal** (e.g., blog-post + RFC) NOT as a competing-OSS-standard (which would conflict with `failuresmith/failure_atlas` FM-NN numbering convention).

**Concrete publication path**:

1. **Blog-post / RFC** (medium-form): "Runtime Failure-Mode Catalogs for AI Coding Agents — A Pattern-Layer Proposal" — frame as additive to `failuresmith/failure_atlas` (a CWE-anchored catalog) by introducing the **vendor-runtime-substrate axis** (operator's FM-NN-catalog convention).
2. **Reference implementation** = the operator's FM-NN catalog (when published per §1.4 Tier-1).
3. **Adoption template** = a `.claude/fm-catalog/` directory convention with one FM-NN file per failure mode + index README.md. Operator releases this as a Claude Code plugin.

### §3.2 Claude Code plugin authoring path

Per `https://code.claude.com/docs/en/plugins` (CCBP cardinal-rule-1 cite-anchor), plugin authoring requires:

```
plugins/<operator>-fm-catalog/
├── .claude-plugin/
│   └── plugin.json              # name: operator-fm-catalog, version: 0.1.0
├── skills/
│   └── fm-class-discipline/
│       └── SKILL.md             # description: "Auto-fires when operator mentions FM-NN, fleet depletion, autocompact-thrash, path-drift, queue-freeze, billing-pre-fire, codex-rescue-blind-spot, readonly-guard-sidestep, or related FM-class failure modes. Returns recovery primitive for the named failure mode from the FM catalog."
├── commands/
│   └── fm-lookup.md             # /fm-lookup FM-17.f → returns recovery primitive
├── fm-catalog/
│   ├── README.md                # index of all FM-NN entries
│   ├── FM-02-destructive-race.md
│   ├── FM-09-codex-rescue-blindspot.md
│   ├── FM-15-git-cli-grammar.md
│   ├── FM-16-phantom-cite-disabled-mcp.md
│   ├── FM-17-subagent-fleet-depletion.md         # parent
│   ├── FM-17.a-wrapper-truncation.md             # leaf
│   ├── FM-17.b-pool-depletion-429.md             # leaf
│   ├── FM-17.c-codex-bg-job-wedge.md             # leaf
│   ├── FM-17.d-bridge-mode-stall.md              # leaf
│   ├── FM-17.e-autocompact-thrashing.md          # leaf
│   ├── FM-17.f-extended-context-pre-fire.md      # leaf (the deep-dive)
│   ├── FM-17.g-haiku-provider-502.md             # leaf
│   ├── FM-19-readonly-guard-sidestep.md
│   ├── FM-20-path-drift-cascade.md
│   └── FM-21-queue-time-prompt-freeze.md
└── README.md                    # publication discipline + cross-link to §0.2 OSS competitors
```

**Skill auto-fire description (CC-plugin convention per `code.claude.com/docs/en/skills`)**:
```yaml
description: |
  Auto-fires when operator mentions FM-NN, fleet depletion, autocompact-thrash, path-drift cascade,
  queue-freeze, 1M-billing-pre-fire, codex-rescue-blind-spot, readonly-guard-sidestep, git CLI
  options-before-double-dash, phantom-cite-disabled-MCP, or any FM-class failure mode keyword.
  Returns runtime-executable recovery primitive from the operator FM-NN catalog with cite-anchor
  to underlying mechanism (TIER-1/2/3 per citation-discipline standard).
  Skip when: discussing FM unrelated to AI runtime (e.g., mechanical engineering failure modes).
```

### §3.3 Cross-skill machine-readable index

To enable downstream tooling (gitnexus L0.9 meta-graph cross-referencing per Wave-2 §10), publish `fm-catalog/index.json`:

```json
{
  "version": "0.1.0",
  "spec": "operator-fm-catalog/v0",
  "entries": [
    {
      "fm_id": "FM-17.f",
      "fm_name": "Extended-context subagent pre-fire",
      "parent_fm": "FM-17",
      "sub_classes": [],
      "n_evidence": 1,
      "effective_tier": "TIER-3-LOCAL-COMPOSITION",
      "recovery_primitive_class": "codex-exec-foreground-tee",
      "cross_model_gate_status": "PATH-P-PRIMARY-VALIDATED",
      "sister_classes": ["FM-17.a", "FM-17.b", "FM-17.c", "FM-17.d", "FM-17.e", "FM-17.g"],
      "cite_anchor_count_tier1": 3,
      "cite_anchor_count_tier3": 1
    }
  ]
}
```

---

## §4 — Publication actions (concrete next steps)

### §4.1 Repository paths (recommended)

| Surface | Repo path | License | Initial scope |
|---|---|---|---|
| FM-NN catalog (Tier-1 publishable) | **`<operator-gh>/claude-code-fm-catalog`** | MIT | FM-17.a-g + FM-20 rows 15/17/20 + FM-17.f deep-dive |
| Claude Code plugin | **`<operator-gh>/cc-fm-catalog-plugin`** | MIT | Wraps `claude-code-fm-catalog` content as plugin per §3.2 layout |
| Multi-account discipline (Tier-1 publishable) | **`<operator-gh>/multi-account-discipline`** | MIT | §CADP rule 5 + FM-20 row 17 + dispatch-health-observability methodology |
| Cross-pollinate PRs | PRs against `failuresmith/failure_atlas` + `Amir-ElBelawy/llm-failure-mode-taxonomy` | matches each repo's license | Submit FM-17.f as `FM-010` (failure_atlas) + schema upgrade to taxonomy repo |
| Anthropic Issue #33558 comment | `anthropics/claude-code#33558` | N/A | Comment with operator FM-17.a-g sub-class evidence as expanded reference for proposed exit-code design |

### §4.2 Pre-publication checklist

- [ ] Operator-private content scrub: remove `aperant_poller` private metrics, `cpa-keeper` private artifacts, `PRIO-25` account names (replace with anonymous tiers like `T1`, `T2`)
- [ ] Citation-discipline.md normalization: rewrite TIER-3-LOCAL-OPERATOR-DERIVED entries to be standalone-comprehensible (replace `per wave N+12 fire N+M` with `per Internal-Evidence-Ladder-A in repo README`)
- [ ] FM-17.f deep-dive: re-verify mechanism INFERRED disclosure is preserved (no over-confidence creep on publication)
- [ ] License audit: confirm MIT is compatible with all cited substrates (`CLIProxyAPI` MIT; `failure_atlas` likely MIT — verify before PR)
- [ ] Cross-model gate review: PATH-P codex T1 review per CLAUDE.md cardinal-rule-3 BEFORE publication (this Wave-3 doc itself should go through that gate before any PR fires)
- [ ] Cross-reference each FM-NN entry to its publication-state OSS competitor (#0.2 table) — explicit "additive to X, distinct because Y" framing in every entry

### §4.3 Cross-model gate satisfaction for this doc

Per CLAUDE.md cardinal-rule-3 + W259 codex-as-continuous-adversarial-evaluator extension, this Wave-3 doc should be PATH-P-codex-reviewed before any of §4.1 publication actions fire.

**Recommended adversarial probe**:
```bash
codex exec --ephemeral -p deep-review-exec --color never \
  < .claude/state/codex_consult_w259v3_operator_novel_patterns.txt \
  > .claude/state/codex_consult_w259v3_operator_novel_patterns_OUT.txt 2>&1
```

Probe prompts (suggested):
1. Re-test §0.2 OSS-equivalence probe — does Wave-3 miss any organizationally-distinct OSS FM-catalog competitor? (n=6 currently surfaced; target ≥3-org-distinct convergence per CR-3)
2. §1.3 publication schema — is the operator FM-NN naming convention semantically distinct enough from `failuresmith/failure_atlas` FM-NNN convention to NOT cause downstream-consumer confusion?
3. §3.2 plugin authoring — does the skill auto-fire description preserve the "skip when: discussing FM unrelated to AI runtime" negation per `code.claude.com/docs/en/skills` skill-design discipline?
4. §4.2 license audit — is MIT compatible with CLAUDE.md cardinal-rule-1 trusted-plugins discipline (i.e., does operator's MIT publication conflict with the CCBP TIER-1-DIRECT install-priority mandate)?

### §4.4 Sequencing (recommended phase order)

1. **Phase 1 (no-publication)**: PATH-P codex T1 adversarial review of this Wave-3 doc. Apply Pattern A if NEEDS-REVISION conf ≥ 0.85. Operator approval gate.
2. **Phase 2 (private dry-run)**: stand up `claude-code-fm-catalog` repo as PRIVATE on operator-gh org. Populate per §3.2 layout. Internal review.
3. **Phase 3 (cross-pollinate first)**: submit `failuresmith/failure_atlas` PR (FM-010 = our FM-17.f) BEFORE publishing competing catalog — this establishes operator as contributor-to-existing-standard NOT competing-standard-creator. Same for `Amir-ElBelawy/llm-failure-mode-taxonomy`.
4. **Phase 4 (catalog public)**: flip `claude-code-fm-catalog` to PUBLIC. Publish blog-post / RFC per §3.1.
5. **Phase 5 (plugin)**: publish `cc-fm-catalog-plugin` on Claude Code plugin marketplace.
6. **Phase 6 (multi-account)**: publish `multi-account-discipline` (separate timeline; less time-pressure than FM-catalog).

---

## §5 — Per-pattern publication design status summary

| Pattern | Wave-3 status | Recommended path |
|---|---|---|
| **FM-class catalog (full)** | **DESIGN-COMPLETE — Tier-1/2/3 split per §1.4** | `<operator-gh>/claude-code-fm-catalog` + plugin (`cc-fm-catalog-plugin`); cross-PR to `failuresmith/failure_atlas` |
| **FM-17.a-g sub-class depth** | **NOVEL — direct publication** | Lead with FM-17.f deep-dive (most novel); pair with full FM-17 parent doc |
| **Cross-model-gate-integrated recovery primitives** | **NOVEL — direct publication** | Embed in every FM-NN entry; document in catalog README's "What's different" section |
| **Multi-account discipline (not CLIProxyAPI itself)** | **DESIGN-COMPLETE — Option B companion repo + Option C plugin per §2.3** | `<operator-gh>/multi-account-discipline` companion repo |
| **CLIProxyAPI substrate L8 promotion** | **W259-v2 fix per Wave-2 §15 — NOT operator-novel publication** | Just promote to T1 INSTALL in W259-v2; cite operator-runtime as evidence |
| **L9 architectural-layer status** | **REFRAMED — pattern-proposal not competing-standard per §3.1** | RFC / blog-post; reference impl = our FM-NN catalog |
| **§CADP fleet-probe rule 5** | **NOVEL — direct publication** | Embed in `multi-account-discipline` companion repo |
| **Token-rotation-burned-by-probe (FM-20 row 17)** | **NOVEL — direct publication** | Embed in both FM-catalog (under FM-20) AND `multi-account-discipline` |
| **`effective_tier` honest-disclosure standard** | **NOVEL — propose as schema upgrade** | PR against `Amir-ElBelawy/llm-failure-mode-taxonomy` schema; cite operator's `citation-discipline.md` rule #8 |

---

## §6 — Honest-disclosure caveats

1. **§0.2 OSS-competitor surface is NEW evidence** that should propagate back to Wave-2 critic's claim. The "ZERO SOTA OSS competitor" framing in `ARCHITECTURE-BEYOND-W259v2.md` §13 line 225 needs forward-only correction per `port-note-discipline.md §6` (suggest adding `[FORWARD-CORRECTED W259-WAVE-3]: 6 emerging OSS competitors surfaced; novelty refined to runtime-anchored CC-specific recovery primitives, NOT abstract FM-catalog concept.`).
2. **Wave-3 has not Path-P-codex-reviewed itself.** This doc satisfies cardinal-rule-3 only via Wave-2 critic upstream Path-P validation. Section §4.3 explicitly requires a Phase-1 codex T1 review BEFORE any publication action.
3. **License compatibility audit deferred to §4.2 checklist.** `failuresmith/failure_atlas` license not directly probed in Wave-3 (visible only via README excerpt). Confirm before PR firing.
4. **n=N same-arc evidence for each FM-NN entry is operator-local** (per `subagent_metrics.jsonl`, fleet-probe artifacts, etc.). When publishing, these become field-notes with publication-time honest disclosure of evidence ladder.
5. **Operator-private content** (Mia-probe pattern names, ARTIFACT-INLINE workflow naming, PRIO-25 account tiers) is NOT publication-ready as-is. §4.2 checklist mandates scrub.
6. **CLIProxyAPI maintainer-acceptance is UNKNOWN.** Option A fork-and-upstream-PR path may bounce. Option B companion repo is fail-safe default.

---

## §7 — Wave-3 verdict

**Operator IS ahead-of-OSS in 2 surfaces**, but with Wave-3-corrected nuance:

1. **FM-class catalog**: ahead on **sub-class granularity** (FM-17.a-g 7 sub-classes), **runtime-executable recovery primitives** (Path P/D/X/S decision-tree), and **cross-model-gate integration** — NOT on the abstract FM-catalog idea itself (6 OSS competitors emerging §0.2).
2. **Multi-account discipline**: ahead on **§CADP fleet-probe rule 5** + **token-rotation-burned-by-probe (FM-20 row 17)** observation — NOT on the CLIProxyAPI substrate which is 32.9k★ pre-existing OSS.

**Publication-readiness**: DESIGN-COMPLETE. Per §4.4 phase ordering, recommended sequencing is (1) Path-P-codex T1 review of THIS doc → (2) private dry-run repo stand-up → (3) cross-pollinate PRs FIRST → (4) public catalog flip → (5) plugin release → (6) multi-account companion repo.

**Forward-only correction propagation**: §6.1 requires updating Wave-2 critic `04-critique/ARCHITECTURE-BEYOND-W259v2.md` §13 with `[FORWARD-CORRECTED W259-WAVE-3]` annotation. This is a NEEDS-REVISION conf~0.85 finding (operator-AHEAD claim REFINED-not-revoked; underlying disposition unchanged).

---

**File**: `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\07-final-synthesis\OPERATOR-NOVEL-PATTERNS-W259v3.md`
**LOC**: ~500
**Companion to**: `04-critique/ARCHITECTURE-BEYOND-W259v2.md` (§13 + §15 + §16), `07-final-synthesis/W259-ULTIMATE-SYNTHESIS-FINAL.md` (15-layer baseline)
**Cross-model gate status**: PRE-PATH-P (requires Phase-1 codex T1 review per §4.3 before publication)
**Effective tier per citation-discipline.md rule #8**: TIER-3-LOCAL-COMPOSITION (mix of TIER-1-DIRECT Anthropic docs, TIER-2-NAMED-PRACTITIONER OSS competitors, TIER-3-LOCAL-OPERATOR-DERIVED FM-evidence)
