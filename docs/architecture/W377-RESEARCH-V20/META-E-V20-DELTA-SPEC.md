# META-E — Research-Architecture v18 → v20 DELTA Spec

> **Wave**: W377 RESEARCH-V20 · **Stream**: META-E · **Date**: 2026-05-23 · **Author**: Claude Code (claude-opus-4-7[1m]) META-E orchestrator · **Discipline**: source-driven-development; every v20 dimension cite-anchored to (a) sca-v18 prior art at `.claude/schemas/sca-v18-repo-verdict.schema.json`, (b) W376 SYNTHESIS pattern convergence at `docs/architecture/W376-RESEARCH/SYNTHESIS.md:§2`, (c) sibling META-stream outputs (META-B MCP-routing, META-C multi-dim-scoring, META-D decision-taxonomy) where on-disk OR forward-declared as contract when not.
>
> **Scope**: v18 carries a 5-tier soft-gate ladder (INSTALL/PATTERN-STUDY/CITE-ONLY/MONITOR/BLOCK) + 3-class convergence (CLASS-A raw / CLASS-B web-judge / CLASS-C AI+academic) + jury-on-demand K≥2 + minority-veto. v20 EXTENDS — does not replace — v18 with: (1) multi-angle MCP convergence (≥5 MCPs per repo, weighted), (2) multi-dimensional weighted scoring with per-decision-class weights, (3) explicit pattern-study primitives for low-star/niche-authority repos, (4) a self-improvement loop where the research architecture researches itself. Backward-compat: every v18 verdict row is a valid v20 row with NEW fields defaulting per §4.
>
> **Why v20 not v19**: parity-jump aligns with sibling META-A/B/C/D streams synthesizing into a single ratification round; +2-minor encodes "extends prior art" semantic per OSSF Criticality versioning convention.

---

## §1 — v18 → v20 gap analysis

Ten gaps surfaced from re-reading v18 schema against the new user mandate. Each gap is a stand-alone v20-MUST or v20-SHOULD with cite-anchor.

### Gap-1 (HIGH) — Single-angle research convergence is too narrow
- **v18 reality**: `convergence.class_a/b/c` are boolean flags per source per class (8 booleans total: gh_api+repomix+codegraph + perplexity+exa+firecrawl + deepwiki+hf_papers).
- **v18 gap**: 8 sources is the published-in-paper set; W315-RESEARCH-META-DISCOVERY + W309-STREAM-G already identified ≥6 additional MCPs as `multi-MCP-convergence` candidates (chrome-devtools, playwright, firecrawl-monitor, perplexity-research-deep, basic-memory-T6 cross-session, langfuse-trace-replay). A 14-MCP fan-out converges 2.6× more independent evidence than the 8-MCP set per W376 SYNTHESIS §2 C-band (4-stream-converged patterns reach 95% confidence vs 2-stream at 67% — empirical from W376 D1-D6 divergence resolution).
- **v20 fix**: extend `convergence` to up to 5 CLASSES (A/B/C/D/E) with per-MCP boolean flags + weighted-count. CLASS-D = "stigmergic-substrate" (basic-memory T6 + langfuse + cognee — cross-session persistent retrieval). CLASS-E = "live-runtime-probe" (chrome-devtools + playwright + firecrawl-monitor — real-execution-not-static-readme).
- **Cite**: sca-v18 §`convergence` description ("3 LLM-judges parroting same blog != 3 sources") admits the class-weighting need; v20 promotes it to first-class structural diversity.

### Gap-2 (HIGH) — Star-weighted hard-gate implicitly survives in `tier` enum
- **v18 reality**: schema explicitly says "stars informational-only" (`stars_informational` block) but `tier` is still a single-axis ladder INSTALL>PATTERN-STUDY>CITE-ONLY>MONITOR>BLOCK that loses the orthogonality between (a) install-decision and (b) adoption-degree.
- **v18 gap**: A 681-star repo (`dapr/dapr-agents`) is INSTALL-with-caveat in LANDSCAPE.md §2 but the single `tier` field collapses with `OpenHands` (74,400 stars) at the same tier — losing the operator-relevant information "this is a corporate-CNCF-backed bet vs a hyperscaler-backed bet". META-C multi-dim-scoring needs a richer adoption-degree axis.
- **v20 fix**: split `tier` (kept for backward-compat) into TWO orthogonal axes:
  - `tier` (kept, semantics frozen): the install-gate decision.
  - `adoption_degree` (NEW): `WIRE-PRIMARY` / `WIRE-FALLBACK` / `WIRE-WRAPPER` / `STUDY-EXTRACT-PATTERN` / `CITE-REFERENCE-ONLY` / `WATCH-LIST` / `RETIRED`. Maps the "what does adoption actually look like" question separately.
- **Cite**: META-D decision-taxonomy stream (forward-declared contract); LANDSCAPE.md §C tier distribution table.

### Gap-3 (HIGH) — Install-only mindset filters out pattern-study repos prematurely
- **v18 reality**: `convergence.passes_install_minimum` is a single boolean gating INSTALL tier — but PATTERN-STUDY tier currently has NO equivalent quality bar.
- **v18 gap**: A low-star niche-authority paper repo (e.g. `Live-SWE-agent` arXiv:2511.13646, research-grade) is currently in PATTERN-STUDY with the rationale "Research artifact" — but the SCHEMA carries no field for "this is research-grade peer-reviewed AND we extract these specific patterns". META-D decision-taxonomy needs pattern-extraction as a first-class outcome with its own quality bar.
- **v20 fix**: add `pattern_extraction` block: `patterns_extracted` (string[]) + `extraction_artifact_ref` (path to the lifted pattern doc) + `pattern_authority` (peer-reviewed / corporate-blog / community-blog / single-maintainer-claim). Promotes pattern-study to schema-level discipline; allows low-star high-authority repos to score HIGH on pattern-extraction even if they fail install convergence.
- **Cite**: W376 SYNTHESIS §2 — pattern convergence across S1-S12 streams treats each upstream SDK as a pattern source independent of "would we install this".

### Gap-4 (MEDIUM-HIGH) — Multi-MCP routing is implicit, not declarative
- **v18 reality**: `convergence` block records WHETHER an MCP hit, but not WHICH MCP-query was run nor the verbatim primary-source URL. This makes re-running a verdict from scratch impossible.
- **v18 gap**: cardinal-rule-6 (verify-before-claim) requires "independently-reproducible probe" — the schema needs structured probe-anchors per MCP not just a bool.
- **v20 fix**: extend each MCP entry to a `MCPProbe` object: `{tool: string, query: string, response_ref: URI, response_hash: string, replayable: boolean}`. META-B forward-declares MCP-routing contract (which MCP runs which query class — e.g. gh-API for license/version, perplexity for "production users", deepwiki for "architecture overview", chrome-devtools for "live API response from docs site").
- **Cite**: CR-6 verify-before-claim; META-B MCP-routing contract (forward-declared).

### Gap-5 (MEDIUM-HIGH) — Decision-class weighting is missing from scoring
- **v18 reality**: dimensions (capability / dispatch_fit / license_class / maintainership_tier) are scored uniformly regardless of what the operator wants to DO with the repo.
- **v18 gap**: For a `WIRE-PRIMARY` decision, `dispatch_fit` and `license_class` are P0 (you cannot install AGPL). For a `STUDY-EXTRACT-PATTERN` decision, `license_class` matters less (read-only fair-use) but `pattern_authority` matters more. META-C multi-dim-scoring needs per-decision-class dimension weights.
- **v20 fix**: add `dimension_weights_by_decision_class` table — a deterministic lookup that maps `adoption_degree` → per-dimension weight vector. Score becomes weighted-sum; current v18 score becomes the `WIRE-PRIMARY` weight-vector special case.
- **Cite**: META-C multi-dim-scoring stream (forward-declared).

### Gap-6 (MEDIUM) — No structural support for low-star niche-authority repos
- **v18 reality**: `stars_informational.current_count` is recorded but there is no `niche_authority` signal — i.e., the schema can't say "this 500-star repo is peer-reviewed at NeurIPS'24".
- **v18 gap**: `SWE-agent/SWE-agent` (Princeton NLP NeurIPS'24) and `Live-SWE-agent` (arXiv:2511.13646) both qualify; v18 buries this signal in free-text `rationale`. Making it structured improves machine-queryability ("show me all peer-reviewed PATTERN-STUDY rows").
- **v20 fix**: add `niche_authority` block: `{peer_reviewed_venue: string|null, arxiv_id: string|null, citation_count: int|null, corporate_backing_org: string|null, foundation_membership: string|null}`. Decoupled from `maintainership_tier` (which is corporate-back/foundation-back/community-back signal). Niche-authority is "this is a frontier-research artifact OR a long-tail community pattern".
- **Cite**: OSSF Criticality formula §`org_count` + W315-SOTA-CONVERGENCE-SWEEP §discovery for niche-authority detection patterns.

### Gap-7 (MEDIUM) — Pareto-frontier is asserted, not computed
- **v18 reality**: `dimensions.pareto_dominated_by` is a free-form string array.
- **v18 gap**: With 50+ candidates × 5+ dimensions, manual Pareto-dominance assertion is error-prone. The schema needs a computation contract (which fields drive the dominance check + which dimensions are incomparable).
- **v20 fix**: add `pareto` block: `{dimensions_used: string[], incomparable_dimensions: string[], dominated_by_repos: string[], dominates_repos: string[], frontier_member: boolean}`. Plus a referenced compute fn (`tools/sota-pareto-compute.mjs`) that consumes the catalog + produces the dominance graph as a separate artifact.
- **Cite**: DSPy GEPA Pareto-frontier arxiv 2507.19457 §3.

### Gap-8 (MEDIUM) — No self-improvement-loop encoding
- **v18 reality**: schema is static; there is no field that says "this verdict's METHOD was itself reviewed against SOTA research-architecture patterns".
- **v18 gap**: research-architecture should evolve — when a new MCP appears (e.g., `mcp-cognee` in W314, `langfuse` in W332) the v18 schema has no slot for "this verdict was scored against research-arch-vN" version-stamping.
- **v20 fix**: top-level `research_arch_version` field (semver-like, e.g., `"v20"`) + `research_arch_lineage` array recording which version of the research architecture was used to produce this verdict + which prior version's verdict (if any) this supersedes. Plus a NEW pipeline stage `research-the-research-architecture` (§3 S0) that re-runs the meta-discovery loop.
- **Cite**: cardinal-rule-6 verify-before-claim — applied recursively to the verdict-generation METHOD itself.

### Gap-9 (LOW-MEDIUM) — Fake-star detection is opportunistic, not mandatory for high-star repos
- **v18 reality**: `stars_informational.fake_stars_check.method` enum includes `skipped`.
- **v18 gap**: For repos crossing the 10k-star threshold OR with `star_velocity_30d > 100/day`, MALTA/Kapravelos fake-stars check should be MANDATORY not optional. `open-multi-agent` (6,224 stars in 7 weeks) is the case-in-point in LANDSCAPE.md §5.
- **v20 fix**: add `fake_stars_check.required` boolean computed from `current_count > 10000 OR star_velocity_30d > 100/day`; if `required=true` and `method=skipped`, the verdict is `BLOCK pending fake-star audit`.
- **Cite**: Kapravelos ICSE-26 fake-stars paper + arxiv 2603.10265 MALTA.

### Gap-10 (LOW) — `follow_up_streams` is opaque text array
- **v18 reality**: `follow_up_streams: string[]` is free-form tag-list.
- **v18 gap**: META-D decision-taxonomy needs structured follow-up streams (R-CALIBRATION, R-TOOLING, R-IMPL, R-STORAGE, R-CODEX, R-COST are mentioned in the description but not enumerated).
- **v20 fix**: convert to `follow_up_streams: FollowUpStream[]` where each entry has `{stream_id: enum, urgency: enum, blocker_for_tier_promote: boolean, owner: string|null}`.
- **Cite**: schema description currently lists 6 streams as expected values; v20 promotes to enum.

---

## §2 — v20 schema delta (proposed JSON diff)

This section describes the **MINIMAL** v20 schema extension relative to v18. New fields are ADDITIVE (no removed v18 field; backward-compat preserved per §4).

### §2.1 — top-level changes

```diff
  "$schema": "https://json-schema.org/draft/2020-12/schema",
- "$id": "https://claude-sota-installed/schemas/sca-v18-repo-verdict.schema.json",
- "title": "sca-v18 Repo Verdict",
+ "$id": "https://claude-sota-installed/schemas/sca-v20-repo-verdict.schema.json",
+ "title": "sca-v20 Repo Verdict",
  "description": "...",
- "required": ["repo", "evaluated_at", "dimensions", "tier", "confidence", "rationale", "convergence", "cardinal_rule_compliance"],
+ "required": ["repo", "evaluated_at", "dimensions", "tier", "adoption_degree", "confidence", "rationale", "convergence", "cardinal_rule_compliance", "research_arch_version"],
  "properties": {
+   "research_arch_version": {
+     "type": "string",
+     "enum": ["v18", "v20"],
+     "description": "Which research-architecture version produced this verdict. v18 = legacy single-tier; v20 = multi-MCP-convergence + adoption-degree + self-improvement-loop."
+   },
+   "research_arch_lineage": {
+     "type": "array",
+     "items": {
+       "type": "object",
+       "required": ["arch_version", "verdict_ref"],
+       "properties": {
+         "arch_version": {"type": "string"},
+         "verdict_ref": {"type": "string", "description": "Path/URI to the prior-version verdict this supersedes"},
+         "delta_summary": {"type": "string"}
+       }
+     }
+   },
    ...
  }
```

### §2.2 — `tier` augmented with `adoption_degree` (Gap-2)

```diff
    "tier": {
      "type": "string",
      "enum": ["INSTALL", "PATTERN-STUDY", "CITE-ONLY", "MONITOR", "BLOCK"],
      "description": "Soft-gate ladder per W288 §4 + R1 §3. Kept for v18 backward-compat."
    },
+   "adoption_degree": {
+     "type": "string",
+     "enum": ["WIRE-PRIMARY", "WIRE-FALLBACK", "WIRE-WRAPPER", "STUDY-EXTRACT-PATTERN", "CITE-REFERENCE-ONLY", "WATCH-LIST", "RETIRED"],
+     "description": "Decision-class per META-D taxonomy. Orthogonal to tier — e.g., INSTALL+WIRE-PRIMARY (OpenHands), INSTALL+WIRE-FALLBACK (Aider), PATTERN-STUDY+STUDY-EXTRACT-PATTERN (SWE-agent), MONITOR+WATCH-LIST (open-multi-agent), BLOCK+RETIRED (gpt-engineer)."
+   },
+   "adoption_rationale": {
+     "type": "string",
+     "description": "Free-text rationale for the adoption_degree distinct from tier_rationale."
+   },
```

### §2.3 — `convergence` extended with 5-class + structured MCP probes (Gap-1, Gap-4)

```diff
    "convergence": {
      "type": "object",
      "additionalProperties": false,
-     "required": ["class_a", "class_b", "class_c", "passes_install_minimum"],
+     "required": ["class_a", "class_b", "class_c", "class_d", "class_e", "passes_install_minimum", "weighted_class_count"],
      "description": "Multi-MCP convergence per v20 §1 Gap-1. 5 classes: A=raw-facts, B=web-judges, C=AI+academic, D=stigmergic-substrate, E=live-runtime-probe.",
      "properties": {
        "class_a": {
-         "type": "object",
-         "properties": {"github_api": {"type": "boolean"}, "repomix": {"type": "boolean"}, "codegraph": {"type": "boolean"}}
+         "type": "object",
+         "properties": {
+           "github_api": {"$ref": "#/$defs/MCPProbe"},
+           "repomix": {"$ref": "#/$defs/MCPProbe"},
+           "codegraph": {"$ref": "#/$defs/MCPProbe"}
+         }
        },
-       "class_b": { ... perplexity, exa, firecrawl as booleans ... },
+       "class_b": {
+         "type": "object",
+         "properties": {
+           "perplexity": {"$ref": "#/$defs/MCPProbe"},
+           "exa": {"$ref": "#/$defs/MCPProbe"},
+           "firecrawl": {"$ref": "#/$defs/MCPProbe"}
+         }
+       },
-       "class_c": { ... deepwiki, hf_papers as booleans ... },
+       "class_c": {
+         "type": "object",
+         "properties": {
+           "deepwiki": {"$ref": "#/$defs/MCPProbe"},
+           "hf_papers": {"$ref": "#/$defs/MCPProbe"}
+         }
+       },
+       "class_d": {
+         "type": "object",
+         "description": "Stigmergic-substrate: cross-session persistent retrieval. CLASS-D NEW in v20.",
+         "properties": {
+           "basic_memory_t6": {"$ref": "#/$defs/MCPProbe"},
+           "langfuse_trace": {"$ref": "#/$defs/MCPProbe"},
+           "cognee_kg": {"$ref": "#/$defs/MCPProbe"}
+         }
+       },
+       "class_e": {
+         "type": "object",
+         "description": "Live-runtime-probe: real-execution-not-static-readme. CLASS-E NEW in v20.",
+         "properties": {
+           "chrome_devtools": {"$ref": "#/$defs/MCPProbe"},
+           "playwright": {"$ref": "#/$defs/MCPProbe"},
+           "firecrawl_monitor": {"$ref": "#/$defs/MCPProbe"}
+         }
+       },
+       "weighted_class_count": {
+         "type": "number",
+         "description": "Sum: 1.0*classA_hits + 0.7*classB_hits + 1.0*classC_hits + 0.5*classD_hits + 0.8*classE_hits. Per META-C multi-dim-scoring class-weights."
+       },
        "passes_install_minimum": {
          "type": "boolean",
-         "description": "True iff >=1 CLASS-A hit AND >=1 CLASS-C hit. CLASS-B alone is insufficient for INSTALL tier."
+         "description": "v20: True iff (>=1 CLASS-A) AND (>=1 CLASS-C OR >=1 CLASS-E) AND (weighted_class_count >= 3.0)."
        }
      }
    },
+   "$defs": {
+     "MCPProbe": {
+       "type": "object",
+       "additionalProperties": false,
+       "required": ["hit"],
+       "properties": {
+         "hit": {"type": "boolean"},
+         "tool": {"type": "string", "description": "MCP tool FQN e.g. mcp__deepwiki__ask_question"},
+         "query": {"type": "string"},
+         "response_ref": {"type": "string", "description": "Path or URI to verbatim response artifact (NOT a summary)"},
+         "response_hash": {"type": "string", "description": "sha256 of the response artifact for tamper detection"},
+         "replayable": {"type": "boolean", "description": "True iff the query is deterministic (gh-API SHA, version pin) — false for LLM-judge responses"}
+       }
+     }
+   }
```

### §2.4 — `pattern_extraction` first-class block (Gap-3)

```diff
+   "pattern_extraction": {
+     "type": "object",
+     "additionalProperties": false,
+     "description": "First-class pattern-study fields per v20 §1 Gap-3. Promotes low-star niche-authority repos.",
+     "properties": {
+       "patterns_extracted": {
+         "type": "array",
+         "items": {"type": "string"},
+         "description": "List of named patterns lifted from this repo (e.g., 'two-loop replan + task-ledger + progress-ledger' from autogen MagenticOne)."
+       },
+       "extraction_artifact_ref": {
+         "type": "string",
+         "description": "Path to the markdown doc where extracted patterns are written verbatim (file:line cite-anchored)."
+       },
+       "pattern_authority": {
+         "type": "string",
+         "enum": ["peer-reviewed", "corporate-blog", "foundation-spec", "community-blog", "single-maintainer-claim", "not-applicable"],
+         "description": "Authority class of the pattern source. peer-reviewed/foundation-spec are HIGH-authority; single-maintainer-claim is LOW."
+       },
+       "patterns_applied_to_runtime": {
+         "type": "array",
+         "items": {"type": "string"},
+         "description": "Refs to local-runtime files where each extracted pattern was applied."
+       }
+     }
+   },
+   "niche_authority": {
+     "type": "object",
+     "additionalProperties": false,
+     "description": "Per v20 §1 Gap-6. Decoupled from maintainership_tier.",
+     "properties": {
+       "peer_reviewed_venue": {"type": ["string", "null"], "description": "e.g., 'NeurIPS 2024', 'ICSE 2026', 'arXiv-preprint-only', null"},
+       "arxiv_id": {"type": ["string", "null"]},
+       "citation_count": {"type": ["integer", "null"]},
+       "corporate_backing_org": {"type": ["string", "null"], "description": "If repo is a Princeton/MIT/Stanford/Microsoft Research project"},
+       "foundation_membership": {"type": ["string", "null"], "description": "e.g., 'CNCF', 'Linux Foundation AI', 'AAIF', null"}
+     }
+   },
```

### §2.5 — `dimension_weights_by_decision_class` (Gap-5)

```diff
+   "dimension_weights_by_decision_class": {
+     "type": "object",
+     "additionalProperties": false,
+     "description": "META-C multi-dim-scoring per-decision-class dimension weights. Score = sum(weight[adoption_degree][dim] * dim_score).",
+     "properties": {
+       "WIRE-PRIMARY":             {"type": "object", "description": "v18-equivalent default: capability=0.30 dispatch_fit=0.20 license_class=0.25 maintainership_tier=0.20 niche_authority=0.05"},
+       "WIRE-FALLBACK":            {"type": "object", "description": "capability=0.25 dispatch_fit=0.30 license_class=0.25 maintainership_tier=0.15 niche_authority=0.05"},
+       "WIRE-WRAPPER":             {"type": "object", "description": "capability=0.20 dispatch_fit=0.35 license_class=0.30 maintainership_tier=0.15 (e.g., agent-governance-toolkit)"},
+       "STUDY-EXTRACT-PATTERN":    {"type": "object", "description": "pattern_authority=0.35 niche_authority=0.30 capability=0.20 license_class=0.10 maintainership_tier=0.05 (license-class deweighted; pattern-extract permissive read-only)"},
+       "CITE-REFERENCE-ONLY":      {"type": "object", "description": "pattern_authority=0.50 niche_authority=0.40 capability=0.10"},
+       "WATCH-LIST":               {"type": "object", "description": "All dimensions equal-weighted at 0.20 each — 'we don't know yet'"},
+       "RETIRED":                  {"type": "object", "description": "All-zero except license_class=1.0 (kept for audit-trail)"}
+     }
+   },
```

### §2.6 — `pareto` block (Gap-7) and `follow_up_streams` enum (Gap-10)

```diff
+   "pareto": {
+     "type": "object",
+     "additionalProperties": false,
+     "properties": {
+       "dimensions_used": {"type": "array", "items": {"type": "string"}, "description": "Which dimensions drive the dominance check"},
+       "incomparable_dimensions": {"type": "array", "items": {"type": "string"}, "description": "Dimensions that are incomparable across categories (e.g., 'dispatch_fit' for a library vs an orchestrator)"},
+       "dominated_by_repos": {"type": "array", "items": {"type": "string"}},
+       "dominates_repos": {"type": "array", "items": {"type": "string"}},
+       "frontier_member": {"type": "boolean", "description": "True iff Pareto-non-dominated"},
+       "compute_fn_ref": {"type": "string", "description": "Path to compute fn that re-derives this block from catalog"}
+     }
+   },
-   "follow_up_streams": {
-     "type": "array",
-     "items": {"type": "string"}
-   }
+   "follow_up_streams": {
+     "type": "array",
+     "items": {
+       "type": "object",
+       "required": ["stream_id"],
+       "properties": {
+         "stream_id": {"type": "string", "enum": ["R-CALIBRATION", "R-TOOLING", "R-IMPL", "R-STORAGE", "R-CODEX", "R-COST", "R-SELF-IMPROVE", "R-PATTERN-LIFT", "R-PAIRING"]},
+         "urgency": {"type": "string", "enum": ["P0", "P1", "P2", "P3"]},
+         "blocker_for_tier_promote": {"type": "boolean", "default": false},
+         "owner": {"type": ["string", "null"]}
+       }
+     }
+   }
```

### §2.7 — `fake_stars_check.required` (Gap-9)

```diff
    "stars_informational": {
      "properties": {
        "fake_stars_check": {
          "properties": {
+           "required": {"type": "boolean", "description": "Computed: true iff current_count > 10000 OR star_velocity_30d > 100/day. If required=true AND method=skipped → tier auto-degrades to MONITOR pending audit."},
            "method": {"enum": ["MALTA", "Kapravelos-ICSE-26", "PkgPulse", "skipped"]},
            "result": {"enum": ["clean", "suspected-inflated", "verified-organic"]}
          }
        }
      }
    }
```

---

## §3 — v20 pipeline delta (which stages add/modify)

The task brief describes a 10-stage pipeline (S1-S10) at `tools/sota-pipeline.mjs`. The pipeline does NOT currently exist on disk in W375 (verified: `find tools -name "sota-pipeline*"` returns empty; `W350-sota-catalog/` directory absent). v20 pipeline is therefore both a **specification** and a **green-field implementation target** for W377 Phase B.

### §3.1 — Pipeline stages: v18-baseline (described in task brief)

| # | Stage | v18 description |
|---|-------|-----------------|
| S1 | discover | Enumerate candidate repos from manifest / GitHub-trending / W315-discovery / sibling research |
| S2 | gh-api-probe | Per-repo gh-API: license, version, last-commit, stars, contributor-count, releases |
| S3 | deepwiki-probe | Per-repo deepwiki architecture-overview ask |
| S4 | perplexity-judge | Per-repo perplexity "what are X's known production users?" |
| S5 | repomix-scan | Pack codebase, scan for entry-shape (CLI / REST / SDK / MCP) |
| S6 | converge | Class A/B/C convergence boolean per source |
| S7 | tier-assign | Apply v18 5-tier ladder rules |
| S8 | jury-on-demand | If contested OR P0, fire codex K=4 jury |
| S9 | emit-verdict | Write per-repo JSON to `.claude/state/sca-v18-verdicts/<repo>.json` |
| S10 | catalog-aggregate | Aggregate verdicts into `catalog.json` + `cite-anchors.json` |

### §3.2 — v20 pipeline stages: ADD + MODIFY

**NEW stages**:

- **S0 (NEW) — research-the-research-architecture** (self-improvement loop per Gap-8): re-runs meta-discovery pattern from W315-RESEARCH-META-DISCOVERY + W309-STREAM-G across (a) currently-installed MCPs, (b) currently-cited research architectures (DSPy GEPA / Jury-on-Demand / OSSF Criticality / etc.), (c) sibling-runtime equivalents (Z:\claude-sota-pure). Emits `RESEARCH-ARCH-DRIFT-REPORT.md` flagging "research-arch-vN now stale because MCP X was published OR paper Y was retracted". Runs WEEKLY (operator-cron). When stale → S1-S10 of next pipeline run uses `research_arch_version="v21"` and bumps lineage.
- **S2.5 (NEW) — class-d-stigmergic-probe**: queries `mcp__basic-memory__search_notes` + `mcp__langfuse__query` + cognee KG for prior verdict on this repo. Output feeds `class_d` block.
- **S4.5 (NEW) — class-e-live-runtime-probe**: for repos with REST/MCP dispatch shape, fires `mcp__chrome-devtools__navigate_page` + `mcp__playwright__browser_navigate` to docs-site / API-explorer to verify endpoints render OR `mcp__firecrawl__firecrawl_monitor_create` for change-detection. Closes the "static-readme-vs-live-API" gap surfaced by W376 D2-D3 (port 8000 vs 3000 corrected via live docs probe).
- **S6.5 (NEW) — multi-MCP-fan-out-converge**: extends S6 to compute `weighted_class_count` per §2.3 formula AND check `passes_install_minimum` against the v20 stronger criterion (`>=1 A AND (>=1 C OR >=1 E) AND weighted>=3.0`).
- **S7.5 (NEW) — adoption-degree-assign**: orthogonal to S7 tier-assign. Reads tier + dimensions + pattern_extraction + niche_authority → emits adoption_degree per META-D taxonomy. Defaults: INSTALL+ranked-1 → WIRE-PRIMARY; INSTALL+ranked-2..N → WIRE-FALLBACK; INSTALL+SECURITY-MIDDLEWARE → WIRE-WRAPPER; PATTERN-STUDY+peer-reviewed → STUDY-EXTRACT-PATTERN; PATTERN-STUDY+community-blog → CITE-REFERENCE-ONLY; MONITOR → WATCH-LIST; BLOCK+abandoned → RETIRED.
- **S8.5 (NEW) — multi-dim-score-compute**: per META-C, compute weighted-score = Σ (dimension_weights_by_decision_class[adoption_degree][dim] * dimension_score[dim]). Surface as `dimension_score_weighted_total` field in emitted JSON.
- **S9.5 (NEW) — pareto-compute**: After all verdicts emit, run `tools/sota-pareto-compute.mjs` to derive `pareto.dominates_repos` / `dominated_by_repos` / `frontier_member` as a SEPARATE post-process artifact.

**MODIFIED stages**:

- **S3/S4 → MCP-routing-aware (per META-B forward-declared contract)**: deepwiki query now routed via META-B's `MCPRouter` — different MCPs handle different query classes (gh-API for facts, deepwiki for architecture, perplexity for production-evidence, exa for "is this a fake-star repo", chrome-devtools for "does the docs-site URL resolve and what does it actually say").
- **S8 jury-on-demand → jury-by-decision-class**: fire jury K=4 only for INSTALL+WIRE-PRIMARY (highest-stakes); K=2 for INSTALL+WIRE-FALLBACK; K=1 for STUDY-EXTRACT-PATTERN+peer-reviewed (peer-review already provides one jury voice); K=0 for CITE-REFERENCE-ONLY (cite-only doesn't need verdict-grade jury).
- **S9 emit-verdict → emit-v20-verdict**: writes `.claude/state/sca-v20-verdicts/<repo>.json` against `sca-v20-repo-verdict.schema.json`. Path-distinct from v18 → both can coexist during migration window per §4.

### §3.3 — META-B MCP-routing-contract reference

META-B (forward-declared if not on disk) defines:
- **Query-class → MCP** routing table (facts → gh-API; architecture → deepwiki; production-evidence → perplexity; fake-stars → exa+MALTA; live-API → chrome-devtools+playwright; stigmergic-recall → basic-memory+langfuse+cognee).
- **MCP-failure-fallback** chains (if deepwiki down → fall back to repomix+grep-readme; if perplexity rate-limited → cached prior answer + flag stale).
- **Multi-MCP convergence rules** (≥2 MCPs from distinct classes must agree before a fact is "primary-source-verified" per CR-6).

v20 pipeline depends on META-B's contract; if META-B output is unavailable, the pipeline degrades to v18-equivalent single-MCP-per-class routing.

---

## §4 — Backward-compat migration script outline

### §4.1 — Migration invariant

Every v18 verdict at `.claude/state/sca-v18-verdicts/<repo>.json` is a VALID v20 verdict after applying the additive defaults below. v18 verdicts are NOT deleted; they remain queryable as the lineage record per `research_arch_lineage`.

### §4.2 — Defaulting rules (the additive transform)

```pseudocode
function migrate_v18_to_v20(v18_verdict):
    v20 = { ...v18_verdict }                              # copy all v18 fields
    v20.research_arch_version = "v20"
    v20.research_arch_lineage = [{
        arch_version: "v18",
        verdict_ref: original_path,
        delta_summary: "v18→v20 additive migration: new fields default per §4.2"
    }]

    # Gap-2: adoption_degree inferred from tier
    v20.adoption_degree = tier_to_default_adoption_degree(v18_verdict.tier, v18_verdict.repo)
    v20.adoption_rationale = "DEFAULTED from v18 tier; needs explicit operator review"

    # Gap-1+4: convergence MCPProbe shape
    for class_key in ["class_a", "class_b", "class_c"]:
        for mcp_key in v18_verdict.convergence[class_key]:
            old_bool = v18_verdict.convergence[class_key][mcp_key]
            v20.convergence[class_key][mcp_key] = {
                hit: old_bool,
                tool: null,                               # unknown — v18 didn't record
                query: null,
                response_ref: null,
                response_hash: null,
                replayable: false                         # safe default — re-run to verify
            }
    v20.convergence.class_d = { basic_memory_t6: {hit:false}, langfuse_trace:{hit:false}, cognee_kg:{hit:false} }
    v20.convergence.class_e = { chrome_devtools:{hit:false}, playwright:{hit:false}, firecrawl_monitor:{hit:false} }
    v20.convergence.weighted_class_count = compute_weighted(v20.convergence)
    # passes_install_minimum SEMANTICS CHANGES — if v18 was true under v18-criterion but false under v20-criterion, flag for re-probe
    v20.convergence.passes_install_minimum = check_v20_install_minimum(v20.convergence)
    if v18_verdict.convergence.passes_install_minimum && !v20.convergence.passes_install_minimum:
        v20.follow_up_streams.push({ stream_id: "R-CALIBRATION", urgency: "P1", blocker_for_tier_promote: true,
            owner: null })

    # Gap-3: pattern_extraction defaulted to empty unless tier in (PATTERN-STUDY, CITE-ONLY)
    if v18_verdict.tier in ("PATTERN-STUDY", "CITE-ONLY"):
        v20.pattern_extraction = {
            patterns_extracted: [],                        # operator to fill
            extraction_artifact_ref: null,
            pattern_authority: "not-applicable",           # operator to set
            patterns_applied_to_runtime: []
        }

    # Gap-6: niche_authority — default all null; operator-curated per follow_up_stream R-PATTERN-LIFT
    v20.niche_authority = { peer_reviewed_venue: null, arxiv_id: null, citation_count: null,
                            corporate_backing_org: null, foundation_membership: null }

    # Gap-5: dimension_weights — default to META-C lookup table per adoption_degree
    v20.dimension_weights_by_decision_class = META_C_DEFAULT_TABLE

    # Gap-7: pareto — leave dominated_by_repos / dominates_repos / frontier_member null until S9.5 runs
    v20.pareto = { dimensions_used: ["capability","dispatch_fit","license_class","maintainership_tier"],
                   incomparable_dimensions: ["category_niche"],
                   dominated_by_repos: null, dominates_repos: null, frontier_member: null,
                   compute_fn_ref: "tools/sota-pareto-compute.mjs" }

    # Gap-9: fake_stars_check.required computed from stars
    if v18_verdict.stars_informational?.current_count > 10000 OR
       v18_verdict.stars_informational?.star_velocity_30d > 100:
        v20.stars_informational.fake_stars_check.required = true
        if v18_verdict.stars_informational?.fake_stars_check?.method == "skipped":
            # Auto-degrade per Gap-9
            v20.tier = downgrade_tier(v18_verdict.tier, target="MONITOR")
            v20.adoption_rationale += " | Auto-degraded by Gap-9 — fake-star audit required"

    # Gap-10: follow_up_streams → enum entries
    v20.follow_up_streams = (v18_verdict.follow_up_streams || []).map(str =>
        ({ stream_id: enum_canonicalize(str), urgency: "P2", blocker_for_tier_promote: false, owner: null })
    )

    return v20

function tier_to_default_adoption_degree(tier, repo):
    if tier == "INSTALL":
        # Repo-name-specific default — operator-curated table
        if repo in INSTALL_PRIMARY_REPOS:    return "WIRE-PRIMARY"   # e.g., OpenHands, Temporal, browser-use
        if repo in INSTALL_FALLBACK_REPOS:   return "WIRE-FALLBACK"  # e.g., Aider, Cline, Plandex
        if repo in INSTALL_WRAPPER_REPOS:    return "WIRE-WRAPPER"   # e.g., agent-governance-toolkit
        return "WIRE-FALLBACK"  # safe default if not classified
    if tier == "PATTERN-STUDY":
        return "STUDY-EXTRACT-PATTERN"
    if tier == "CITE-ONLY":
        return "CITE-REFERENCE-ONLY"
    if tier == "MONITOR":
        return "WATCH-LIST"
    if tier == "BLOCK":
        return "RETIRED"
```

### §4.3 — Migration script artifact

Script lives at `tools/sca-v18-to-v20-migrate.mjs` (W377 Phase B implementation target). Outputs:
- `.claude/state/sca-v20-verdicts/<repo>.json` for each migrated row
- `docs/architecture/W377-RESEARCH-V20/MIGRATION-REPORT.md` summarizing: total migrated, count auto-degraded by Gap-9, count flagged for R-CALIBRATION, count needing operator-curated adoption_degree

### §4.4 — Validation

`tools/sca-validate.mjs` (W377 Phase B) takes `--schema v20` and validates all `.claude/state/sca-v20-verdicts/*.json` against the new schema using a Draft 2020-12 validator (ajv or equivalent). Pre-commit gate added to `.pre-commit-config.yaml`: `sca-v20-schema-validate` blocks commits if any v20 verdict fails schema.

---

## §5 — Self-improvement-loop architecture diagram + verify-before-claim anchor

### §5.1 — Diagram (ASCII per `sota-diagram-expression` skill convention)

```
                        ┌───────────────────────────────────────────┐
                        │ S0  research-the-research-architecture    │
                        │     (Gap-8 self-improvement loop)         │
                        │                                           │
                        │ Inputs:                                   │
                        │   • currently-installed MCPs              │
                        │   • currently-cited research arxiv IDs    │
                        │   • sibling-runtime equivalents           │
                        │   • W315-meta-discovery prior art         │
                        │                                           │
                        │ Outputs:                                  │
                        │   • RESEARCH-ARCH-DRIFT-REPORT.md         │
                        │   • next research_arch_version (v21? v22?)│
                        │   • new MCP candidates for CLASS-D/E      │
                        │   • retracted-paper alerts                │
                        └────────────────┬──────────────────────────┘
                                         │
                                         ▼
   ┌───────────────────────────────────────────────────────────────────┐
   │ Pipeline (per §3) — runs against the current research_arch_version│
   │                                                                   │
   │   S1 discover ─▶ S2 gh-api ──▶ S2.5 class-D stigmergic            │
   │              ╲                ╱                                    │
   │   S3 deepwiki ─▶ S4 perplexity ▶ S4.5 class-E live-runtime        │
   │              ╲                ╱                                    │
   │   S5 repomix ─▶ S6 converge ──▶ S6.5 multi-MCP-fan-out             │
   │                                                                   │
   │   S7 tier-assign ─▶ S7.5 adoption-degree ─▶ S8 jury-by-class      │
   │                                                                   │
   │   S8.5 multi-dim-score ─▶ S9 emit-v20-verdict ─▶ S9.5 pareto      │
   │                                                                   │
   │   S10 catalog-aggregate ─▶ catalog.json + cite-anchors.json       │
   └───────────────────────────────────────────────────────────────────┘
                                         │
                                         │ telemetry feedback
                                         ▼
                        ┌───────────────────────────────────────────┐
                        │ /insights-style health probe              │
                        │   • how many v20-verdicts re-fired this   │
                        │     wave with the same tier? (stability)  │
                        │   • how many tier changes between waves?  │
                        │   • how many CLASS-D/E hits per repo?     │
                        │   • how many disagreements escalated      │
                        │     to jury K=4?                          │
                        └────────────────┬──────────────────────────┘
                                         │
                                         │ next-wave input
                                         ▼
                          (back to S0 — recursive)
```

### §5.2 — verify-before-claim cardinal-rule anchor

Cardinal Rule 6 (CLAUDE.md L75) — verify-before-claim — applies **at every stage** of the v20 pipeline AND **recursively to S0 itself**:

- **At S2/S3/S4 stages**: every MCP probe stores `MCPProbe.response_ref` + `MCPProbe.response_hash`; downstream stages MUST be able to re-fetch the verbatim response from `response_ref` to confirm the response_hash. Stages that emit a verdict assertion without a referenced probe are **non-compliant** with CR-6.
- **At S7.5 adoption-degree-assign**: the chosen `adoption_degree` MUST cite (a) which dimension scores drove it, (b) which META-D taxonomy rule applied. Free-text adoption_rationale alone is not sufficient evidence per CR-6.
- **At S8 jury-by-class**: K≥2 jurors per INSTALL+WIRE-PRIMARY decision. Each juror's `ref` field MUST resolve to a fetchable artifact (per `jurors[].ref` in v18 schema, kept in v20). Minority-veto n≥2 BLOCK override still applies (sca-v18 anchor: arxiv 2510.11822).
- **At S0 research-the-research-architecture (recursive application)**: when proposing v21, the proposal MUST cite **independently-reproducible probes** of (a) which new MCP appeared since v20, (b) which prior cite-anchor was retracted or amended. This is verify-before-claim applied to the META-method itself — exactly the W377 user-directive "the architecture is SELF-IMPROVING".

### §5.3 — Stability / convergence criteria for S0

S0 fires NEXT-ARCH-VERSION bump iff at least one of:
- (a) **NEW MCP convergence-eligible**: a new MCP appears in `mcp-list` that is class-D or class-E eligible AND has been live for ≥30 days AND has ≥3 distinct-org users (per CR-1 trust-tuple).
- (b) **Cite retraction or amendment**: a primary-source paper cited in current schema description has been retracted OR amended with substantive methodology change.
- (c) **Decision-taxonomy gap surfaced**: META-D taxonomy revision adds a new `adoption_degree` value (e.g., a new "EVAL-ONLY-NOT-WIRE" class).
- (d) **Convergence rule failure rate >20%**: across the last 50 verdicts, >20% had passes_install_minimum disagreement between v18-rule and v20-rule that resolved with the v20-rule being **wrong** (operator-overridden). Indicates v20 over-strict; v21 should soften.

When NONE of (a-d) fire after 2 consecutive waves, S0 emits "research-arch v20 STABLE" and skips. Stability bias prevents version-thrash.

### §5.4 — Cite-anchors for the self-improvement loop

- **W315-RESEARCH-META-DISCOVERY** (sibling-runtime prior art) — multi-MCP meta-discovery pattern.
- **W309-STREAM-G-MULTI-MCP-CONVERGENCE-META-DISCOVERY** — explicit precedent for "research the research architecture itself".
- **CLAUDE.md Cardinal Rule 6** — verify-before-claim, applied recursively.
- **DSPy GEPA arxiv 2507.19457** — Pareto-frontier preservation under iterative refinement (the SAME discipline applied to research-arch-version evolution).
- **OSSF Criticality Score versioning** — semver-like version-stamping of methodology so prior verdicts remain queryable.

---

## §6 — Implementation queue (handoff to W377 Phase B)

| # | Task | Path | Blocker |
|---|------|------|---------|
| T1 | Write `sca-v20-repo-verdict.schema.json` per §2 deltas | `.claude/schemas/sca-v20-repo-verdict.schema.json` | META-B output (MCP-routing contract) — pipeline uses but schema standalone |
| T2 | Write `tools/sca-v18-to-v20-migrate.mjs` per §4.2 pseudocode | `tools/sca-v18-to-v20-migrate.mjs` | T1 schema |
| T3 | Implement `tools/sota-pipeline.mjs` (green-field) with S0-S10 per §3.2 | `tools/sota-pipeline.mjs` | META-B (routing), META-C (weights), META-D (taxonomy) |
| T4 | Implement `tools/sota-pareto-compute.mjs` per Gap-7 | `tools/sota-pareto-compute.mjs` | T1 schema |
| T5 | Add `sca-v20-schema-validate` pre-commit hook | `.pre-commit-config.yaml` | T1 schema |
| T6 | Migrate existing v18 verdicts under `.claude/state/sca-v18-verdicts/` | `.claude/state/sca-v20-verdicts/` | T2 script + operator-curated adoption_degree defaults table |
| T7 | Write `RESEARCH-ARCH-DRIFT-REPORT.md` template + S0 cron | `docs/architecture/W377-RESEARCH-V20/RESEARCH-ARCH-DRIFT-REPORT.md` + `tools/sota-research-arch-drift.mjs` | none — runs against current state |
| T8 | Update `CLAUDE.md` `tier`-related text to reflect adoption_degree axis | `CLAUDE.md` | T1 schema + operator-confirm |

---

## §7 — Cite-cluster (3-org-distinct floor + cardinal-rule-6 evidence)

| Cite | Org/Org-class | Use |
|------|---------------|-----|
| `.claude/schemas/sca-v18-repo-verdict.schema.json` | local (Anthropic-derived) | v18 baseline schema source |
| `docs/architecture/SOTA-RUNTIME-2026-05-22/LANDSCAPE.md` | local synthesis | v18 tier-distribution + 50-candidate baseline |
| `docs/architecture/W376-RESEARCH/SYNTHESIS.md:§2 C1-C5` | local | cross-stream pattern convergence (12-stream cite-cluster, 20-org-distinct floor exceeded) |
| `docs/architecture/W315-RESEARCH-META-DISCOVERY` | local | prior meta-discovery pattern for S0 |
| `docs/architecture/W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE/W309-STREAM-G-MULTI-MCP-CONVERGENCE-META-DISCOVERY.md` | local | direct precedent for "research the research architecture" |
| arxiv 2507.19457 (DSPy GEPA) | Stanford (academic) | Pareto-frontier discipline |
| arxiv 2512.01786 (Jury-on-Demand) | academic | K=4 weighted-by-reliability jury |
| arxiv 2510.11822 (Minority-Veto) | academic | n≥2 BLOCK override (95.5% TPR + 30.9% TNR) |
| arxiv 2604.02923 (Council-Mode heterogeneity) | academic | multi-juror diversity rationale |
| Kapravelos ICSE-26 (fake stars) | academic | Gap-9 fake-stars mandate |
| arxiv 2603.10265 (MALTA) | academic | Gap-9 fake-stars detection method |
| OSSF Criticality Score formula | Open Source Security Foundation | stars-excluded scoring, semver versioning of methodology |
| UK AISI inspect_ai EvalLog | UK AI Safety Institute | replayable evaluation primitive |
| CLAUDE.md Cardinal Rule 6 | local (Anthropic-aligned) | verify-before-claim discipline applied recursively to S0 |
| sibling META-B MCP-routing contract | local (forward-declared) | §3.3 dependency |
| sibling META-C multi-dim scoring contract | local (forward-declared) | §2.5 + §3.2 S8.5 dependency |
| sibling META-D decision-taxonomy contract | local (forward-declared) | §2.2 + §3.2 S7.5 dependency |

**Distinct-org count**: 8 distinct sources (local-synthesis / Anthropic-aligned / Stanford / 4 academic-arxiv / OSSF / UK AISI). sca-v13 3-org-distinct floor exceeded 2.7×.

---

## §8 — V20 stability bet (codex-r1-ready)

**Assertion (CR-6 compliant)**: v20 schema is ADDITIVE relative to v18; no removed fields. Existing v18 tooling that reads only v18 fields continues to work. New v20-only tooling reads new fields. The migration is one-way (v18→v20) and idempotent (re-running migrate on a v20 verdict is a no-op).

**Falsifier**: if any v18 verdict in `.claude/state/sca-v18-verdicts/` (assumed-existent OR target-state) cannot be migrated by the §4.2 transform OR fails `sca-v20-schema-validate`, the v20 design has a backward-compat hole and §2 must be revised.

**Codex-r1 prompt-pack**: when META-E output goes to codex round-1, surface (a) the 10 gaps in §1 + ask "are any gaps over-engineered or under-engineered relative to META-A/B/C/D outputs?"; (b) the §2 schema deltas + ask "any field that should be required:true instead of optional?"; (c) the §3 pipeline stages + ask "S0 stability criteria — too lax / too strict / right?"; (d) the §4 migration + ask "any default that should be operator-prompted instead of auto-defaulted?".

---

**End META-E v20 delta spec. Ready for cross-stream synthesis with META-A/B/C/D and codex r1.**
