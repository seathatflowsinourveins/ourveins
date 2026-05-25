# W377 Research-Architecture v20 — Synthesis of 6 META Streams

> **Status**: SYNTHESIS spec/design LANDED 2026-05-23 from META-A through META-F deliverables. v20 schema is a **migration-required superset** of v18 (NOT auto-valid: v20 requires `schema_version`/`per_class_scores`/`decision_class_rationale` and uses `additionalProperties:false`; v18 rows must run through `tools/sca-v18-to-v20-migrate.mjs` per META-E §4). Pending operator-sign before promotion to canonical. **codex V20-r1 NR 0.91 findings 1-9 addressed below in v15.**

## §1 Synthesis Overview

The user's W377 directive (mid-W376 wave): "research and enhance your research architecture itself, find sota repos, and improve the repos quality gate, NOT a hardgate because some time repos with low stars can be high quality in certain area with pattern study etc. but when come to the decision making, such as install, patterns study, and improve your decision making itself."

Six parallel META research streams ran via `general-purpose` subagent fan-out using perplexity + exa + github + deepwiki + repomix + hf-mcp + serena multi-angle MCP convergence. All 6 streams landed STATUS: DONE.

| Stream | Title | Key deliverable | LOC |
|---|---|---|---|
| META-A | SOTA agent-orchestration 2026 | 30 NEW candidate repos beyond W376 12-stream cluster; 5 high-confidence adopt/pattern-study recs | 264 |
| META-B | SOTA research-MCP discovery | 15-MCP installed audit + 16 NEW MCPs + 4-stage Router→Fan-out→Scorer→Consenser convergence framework | 367 |
| META-C | Multi-dim repo scoring framework | 19 dimensions × 8 clusters; 4 per-class scores (INSTALL/PATTERN-STUDY/CITE-ONLY/MONITOR); sca-v20-multi-dim.schema.json landed | 433 |
| META-D | Install vs pattern-study taxonomy | 4-class decision-tree (7-stage); 12/12 retroactive alignment with W376; niche-domain-authority anti-pattern catalog | 757 |
| META-E | v18→v20 delta spec | 10 v18 gaps; additive schema delta; 7 NEW pipeline stages (S0/S2.5/S4.5/S6.5/S7.5/S8.5/S9.5); self-improvement loop | landed |
| META-F | Soft-gate quality redesign | 3-class adoption gate matrix; PROVENANCE-LINT v4 tier-router; 10 live `gh API` case studies; 9/10 over-rejected by hard-gate confirmed | landed |

## §2 v20 Architectural Pillars

### §2.1 Multi-angle MCP convergence (META-B)

Replaces v18's undirected MCP rotation with a **4-stage routed-fan-out**:

1. **Router**: classify research question into 9-class routing table (file:line code / API contract / paper / repo discovery / etc.). Each class has a known-good MCP-trust-tier ordering.
2. **Fan-out**: parallel-dispatch to N MCPs from the routed tier (non-blocking — slow MCPs like perplexity get 300s timeout but don't block the convergence).
3. **Scorer**: compute per-claim **normalized** `C-score(j) = (Σ_i w_i · I(claim j surfaced in MCP i)) / (Σ_i w_i · 1[MCP i queried])` per META-B §3 (codex V20-r1 finding-3 fix: synthesis now uses META-B's normalized formula verbatim). Denominator gates against missing-MCP inflation; cite-anchor density cap = 5 anchors per claim; 3-org-distinct hard-gate per META-B §3.2. `w_i` is MCP-trust-tier weight (0.00 langfuse-observability → 1.00 serena/github/codegraph). Memory-MCP returns discounted by 0.5 to prevent echo-chamber inflation.
4. **Consenser**: emit 5-tier verdict (TIER-1 FACTUAL-CONVERGED → TIER-5 NO-EVIDENCE). Anti-patterns explicitly flagged: echo-chamber, single-source claim, premature-cite, memory-recall-not-fact.

**Empirical gain** (META-B §4): ~50% API call reduction vs v19 + ~70% latency reduction. Convergence-scored surfaces under-confirmed sub-claims that v19's binary tier-emit collapses.

### §2.2 Multi-dim scoring (META-C)

19 dimensions across 8 clusters. **NOT a single weighted sum** — produces 4 independent per-class scores. **codex V20-r1 finding-2 fix**: popularity (D01-D03) is **informational-only** for INSTALL/PATTERN-STUDY/CITE-ONLY (weight=0.00); only contributes to MONITOR drift-detection (per META-C §2 + sca-v20-multi-dim.schema.json invariant).

| Cluster | Dims | INSTALL weight | PATTERN-STUDY | CITE-ONLY | MONITOR |
|---|---|---|---|---|---|
| I Popularity | D01-D03 (stars/forks/watchers) | **0.00** | **0.00** | **0.00** | 0.30 |
| II Activity | D04-D06 (recency/contributors/issue-rate) | 0.20 | 0.10 | 0.05 | 0.20 |
| III Trust | D07-D09 (signed-release/license/maintainer) | 0.25 | 0.10 | 0.05 | 0.10 |
| IV Quality | D10-D12 (tests/CI/docs) | 0.15 | 0.20 | 0.05 | 0.05 |
| **V Claude Code fit** | D13-D16 (SDK-path/pattern-density/cite-density/deepwiki) | 0.30 | 0.40 | 0.40 | 0.05 |
| VI Production | D17-D18 (image-pin/semver) | 0.10 | 0.05 | 0.05 | 0.05 |
| VII Architectural | D19 (compat fit) | 0.00 | 0.15 | 0.10 | 0.10 |
| VIII Community | (signal) | 0.00 | 0.00 | 0.30 | 0.15 |

(INSTALL column sum: 0.00 + 0.20 + 0.25 + 0.15 + 0.30 + 0.10 + 0.00 + 0.00 = 1.00 ✓)

**Schema**: `.claude/schemas/sca-v20-multi-dim.schema.json` (376 LOC; Draft 2020-12) — sca-v20 is strict superset of sca-v18. Pareto-frontier preserved per sca-v18 + DSPy GEPA lineage. Forward-compat `extensions.x_*` namespace reserved for v21+.

**Worked example** (META-C §4): block/goose would INSTALL on every other axis, but D13=cli-only correctly downgrades to PATTERN-STUDY (the operator's "runtime pathway support" dimension working as designed).

### §2.3 Decision-tree (META-D)

4-class taxonomy + 7-stage decision tree:

```
candidate_repo + multi-dim-score (from §2.2) + convergence-tier (from §2.1)
         ↓
[Stage 1] HARD-BLOCK preamble (short-circuit; codex V20-r1 finding-6 fix):
  - license-proprietary OR AGPL/SSPL-without-license-grant → AVOID-BLOCK
  - archived >90d → AVOID-BLOCK for INSTALL; CITE-ONLY admits with @SHA pin
  - signed-release-claim-FAIL OR Sigstore-verify-FAIL → AVOID-BLOCK for INSTALL
  - CVE-OPEN (CVSS ≥7.0) without 90d patch ETA → AVOID-BLOCK for INSTALL
  - malicious-maintainer-flag (npm-audit / Socket.dev / Snyk RED) → AVOID-BLOCK
  - fake-star-ratio >0.30 per OSSF Scorecard or LegitOSS detector → AVOID-BLOCK for INSTALL
  - typosquat suspect (Levenshtein ≤2 of canonical pkg name AND <30d age) → AVOID-BLOCK
[Stage 2] cite-only gate    → if no install primitive needed → CITE-ONLY
[Stage 3] jury-on-demand    → if novelty score >threshold → fire 3-judge codex panel
[Stage 4] monitor gates     → if trust-tuple incomplete (per META-D §1.4) → MONITOR (30d window)
[Stage 5] install routing   → **codex V20-r1 finding-4 fix**: if ALL INSTALL-row per-dimension
                              thresholds pass (NOT cluster aggregates) per META-C §3 decision matrix → INSTALL
  [Stage 5a] Pareto check   → ensure not dominated by existing installed
  [Stage 5a-escape] niche-authority → low-star but THE-authority routes INSTALL (META-D §4)
[Stage 6] pattern-study     → if pattern_density ≥ 2 + dispatch_fit < 2 → PATTERN-STUDY
[Stage 7] default           → CITE-ONLY (most permissive)
```

**Anti-pattern catalog** (META-D §4):
- Legitimate low-star INSTALL: niche-domain authority (haizelabs/verdict ~339 stars = jury patterns canon), spec-anchor authority (MCP spec itself), reference-implementation authority, first-mover-with-correct-API
- Negative controls: star-velocity spike (fake-stars), founder personal repo, single-source claim

**Retroactive audit** (META-D §3): 12/12 alignment with W376 SYNTHESIS implicit verdicts — the tree codifies operator reasoning, doesn't impose new bias.

### §2.4 Soft-gate quality (META-F)

Quality gates branch per adoption-class instead of uniform CR-3 trust-tuple:

| Gate | INSTALL | PATTERN-STUDY | CITE-ONLY |
|---|---|---|---|
| signed-release (SLSA-L3 / npm-provenance / Sigstore) | ✅ required | ❌ not required | ❌ not required |
| license-permissive (MIT/Apache/BSD/ISC/MPL) | ✅ required | ✅ required | ⚪ permits-quotation OK |
| transitive-clean (no Socket.dev/Snyk red) | ✅ required | ❌ not required | ❌ not required |
| maintainer-identity verified | ✅ required | ❌ not required | ❌ not required |
| not-archived | ✅ required | ✅ required | ❌ archived OK with `@SHA` |
| named-source | ✅ required | ✅ required | ✅ required |
| file:line@SHA resolves | (implicit) | ✅ required for pattern cite | ✅ required |

**Live `gh API` validation** (META-F §3): 10 case studies — 9/10 over-rejected by uniform hard-gate today; soft-gate correctly admits niche-authority + cite-quotation.

**Concrete configs** designed:
- `tools/sca-tier-router.mjs` (new) — routes commit-message `INSTALL:` / `PATTERN-STUDY:` / `CITE-ONLY:` trailers to the right gate
- `provenance-lint-v4` — extends current `provenance-lint` (W328-C) to recognize the 3-class trailer
- `.pre-commit-config.yaml` — adds `sca-tier-router` block before existing `provenance-lint`
- CLAUDE.md L17-21 cardinal-rule-3 amendment diff

### §2.5 v18→v20 delta + self-improvement loop (META-E)

**10 v18 gaps** identified: single-angle convergence too narrow, star-weighted hard-gate implicit, install-only mindset filters pattern-study repos, MCP routing implicit, decision-class weighting missing, no niche-authority support, Pareto-frontier asserted not computed, no self-improvement encoding, fake-stars check optional for high-velocity repos, opaque follow-up streams.

**Critical CLAUDE.md drift surfaced** (META-E §1): `W350-sota-catalog/` directory + `tools/sota-pipeline.mjs` cited in CLAUDE.md L60-66 **DO NOT EXIST** on disk — cardinal-rule-6 verify-before-claim violation. v20 spec is therefore BOTH spec + green-field implementation target for Phase B.

**Pipeline delta** — 7 NEW stages added to v18 10-stage pipeline:
- S0: **research-the-research-architecture** (recursive self-improvement; META-E §5)
- S2.5: class-D stigmergic probe (live behavioral signal from running deployments)
- S4.5: class-E live-runtime probe (does the install path actually work?)
- S6.5: multi-MCP fan-out weighted (META-B §3)
- S7.5: adoption-degree assign (META-D §2)
- S8.5: multi-dim score (META-C §2)
- S9.5: Pareto post-process (META-C §1 + META-D §5a)

**Self-improvement loop**: S0 fire-rules — new MCP appears in M[i+1] vs M[i] / cite retraction observed / decision-taxonomy gap surfaced in retroactive audit / >20% convergence-rule failure rate. Cite-anchored to CLAUDE.md CR-6 applied recursively.

**Backward-compat**: every v18 verdict valid v20 verdict after additive defaults. Idempotent migration via `tools/sca-v18-to-v20-migrate.mjs` (script outline in META-E §4).

## §3 Implementation Roadmap (W377+)

8 Phase-B tasks per META-E §6, sequenced:

| # | Task | Owner-wave | Acceptance |
|---|---|---|---|
| 1 | sca-v20-multi-dim.schema.json validate + lint | W377 | `ajv validate` green |
| 2 | tools/sca-v18-to-v20-migrate.mjs | W377 | Idempotent migration of W259 + W376 verdicts |
| 3 | Author tools/sota-pipeline.mjs (was missing — META-E surfaced) | W377 | E2E pipeline runs S0-S10 |
| 4 | Implement S0 stage script + Pareto computation | W378 | Self-improvement fire-rules empirically calibrated |
| 5 | Pre-commit gate `sca-tier-router` | W378 | All-3-class trailers parsed correctly |
| 6 | Backfill W376 verdicts to v20 schema | W379 | 14 W376 + 30 META-A + 16 META-B MCPs scored |
| 7 | Drift cron (3-month MCP discovery sweep) | W379+ | Auto-fire when convergence rate drops |
| 8 | CLAUDE.md update — cardinal-rule-3 amendment + drift fix on W350 ghost references | W377 | Verify-before-claim re-audit clean |

## §4 Carry-forwards into W377+

**codex V20-r1 finding-7 fix**: each row now has explicit acceptance criterion + source anchor.

| ID | Source META | Sev | Description | Acceptance Criterion | Source Anchor |
|---|---|---|---|---|---|
| **C-V20-1** | META-A | P0 | `microsoft/agent-framework` + `dbos-inc/dbos-transact-py` + `bytedance/deer-flow` — 3 top-tier INSTALL candidates | 30-day version-pin window per CR-1 condition-(c); SLSA-L3 or npm-provenance verified before install | META-A §4.1-§4.3 |
| **C-V20-2** | META-A | P1 | Production-Grade/stigmergy + Billy1900/Arbor — PATTERN-STUDY candidates | spec/design lands at `docs/architecture/W378-SOTA-PATTERNS/` with W375-bench comparison numbers | META-A §4.4-§4.5 |
| **C-V20-3** | META-A | P1 | maryanskyy "weak-cheap-model paradox" (g=0.87) — relitigate W331 axis-2-#4 | spec/design re-audit committed at `docs/architecture/W378-AXIS2-RELITIGATE.md` with codex r2 verdict | META-A §5 |
| **C-V20-4** | META-B | P0 | 3 NEW MCPs pending operator-sign for `.mcp.json`: paper-search-mcp / Octocode / context7 | `.mcp.json` shadow-install lands at `.mcp.json.next` with each `npx -y <pkg>@<version>` line | META-B §4.C + §6 |
| **C-V20-5** | META-B | P1 | NotebookLM-mcp-secure (N14) requires operator go/no-go | operator decision recorded in `docs/architecture/W378-MCP-DECISIONS.md` | META-B §6 |
| **C-V20-6** | META-C | P0 | sca-v20 R-CALIBRATION (empirical weight tuning on 50-repo backtest) | `tools/sca-v20-calibrate.mjs` runs, outputs `verdict-deltas.json` with ≥80% retroactive agreement on W259 + W376 verdicts | META-C §8 R-CALIBRATION |
| **C-V20-7** | META-D | P1 | Stage 5a niche-authority predicate `provides_novel_niche` formalization | `tools/sca-niche-classifier.mjs` lands with named anti-pattern enum + 5-case-study test | META-D §4 |
| **C-V20-8** | META-E | P0 | **Cardinal-rule-6 violation in CLAUDE.md L60-66**: W350-sota-catalog + tools/sota-pipeline.mjs don't exist | CLAUDE.md L60-66 either deleted OR W350-sota-catalog/ + tools/sota-pipeline.mjs created with verify-before-claim live probe in CI | META-E §1 |
| **C-V20-9** | META-F | P0 | sca-tier-router.mjs + provenance-lint-v4 + .pre-commit-config.yaml block | All 3 files committed; pre-commit gate runs green on 3 sample commits (one per adoption class) | META-F §4 |

## §5 Convergence Evidence (codex V20-r1 finding-5+9 fix: honest floor reporting)

All 6 META streams produced ≥3-org-distinct cite clusters (sca-v13 floor):
- META-A: 30 candidate repos × multiple orgs (Microsoft / DBOS / ByteDance / haizelabs / others). **Honesty caveat per V20-r1 finding-9**: 5 of 30 candidates are single-source pattern-study only (kept per operator directive "low-stars can be high quality"); these are explicitly marked single-source in META-A §2 tier-3 table — NOT counted toward convergence-confirmed adoption.
- META-B: 16 NEW MCPs × multiple orgs (openags / upascal / scholar-mcp / Octocode / Tavily / NotebookLM / openalex / TAM)
- META-C: 14 distinct orgs (anchored W376 SYNTHESIS S9-S12 + sca-v18 lineage + Anthropic/MSFT/Pydantic/Stanford/haize-labs/CrewAI/Block/Continue/OpenHands/Temporal/OSSF/Kapravelos/UK-AISI)
- META-D: 10+ orgs (sca-v13 floor exceeded ≥3.3×)
- META-E: **8 distinct orgs** — meets sca-v13 ≥3-org floor at 2.7×, but **BELOW the ≥10-per-section sca-v18 floor** (codex V20-r1 finding-9 honest disclosure). Operator may choose to (a) accept ≥3-org floor for META-E as design-spec section vs research-section, or (b) require META-E padding to 10 orgs as a W377+ acceptance criterion.
- META-F: 10 live-probed orgs via `gh API` 2026-05-23 (probes ran in this session via `ctx_execute` shell-call — artifacts NOT persisted to disk; codex V20-r1 finding-5 fix: claim downgraded to "spec/design landed via live-probe-in-session" pending persistence to `docs/sota-research/probe-artifacts/2026-05-23.json` as W377+ Phase-B task).

**Anti-fabrication audit** (codex V20-r1 finding-5 closure):
- Floating `@ main` anchors in META-F (META-F:399, META-F:111) — DOWNGRADED to "spec landed" pending file:line@SHA pin in W377+.
- META-A §5 explicit "star/license values still need manual verification" — NOT a fabrication, IS a verify-before-claim caveat; carry-forward C-V20-1 acceptance criterion now requires 30-day window verification per CR-1 condition-(c).
- META-E surfaced TWO real CLAUDE.md cardinal-rule-6 drift instances: (1) W350-sota-catalog ghost reference → C-V20-8; (2) NONE of 30 META-A candidates advertise SLSA-L3/Sigstore/CycloneDX → all C-V20-1 candidates require 30-day verify window.

## §6 Schema validation status (codex V20-r1 finding-8 disclosure)

`.claude/schemas/sca-v20-multi-dim.schema.json` validates as **JSON Schema Draft 2020-12** under Python `jsonschema` library (META-C verification on landing). Does NOT yet have a checked-in AJV (`ajv-cli`) validation script — codex V20-r1 finding-8 explicit acceptance gap. W377-Phase-B task: add `package.json` dev-dependency on `ajv` + `ajv-cli`, author `tools/validate-sca-v20.mjs` + record `npx ajv validate` output as committed artifact.

## §7 Next: codex GPT-5.5 review + operator-sign

Per cardinal-rule-3 + sca-v18 jury-on-demand contract, this synthesis HAS BEEN cross-model-reviewed by codex GPT-5.5 (V20-r1 NR 0.91; 7 P0 + 2 P1 findings, all surgically addressed in v15). Codex V20-r2 to verify v15 closure before promotion to v20 canonical.

Per cardinal-rule-6, every claim in this synthesis must be operator-verifiable via the cited line ref. The 9 carry-forwards (§4) each have an explicit acceptance criterion + source anchor + W377+ owner-wave.
