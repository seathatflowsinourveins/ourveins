---
title: Research-Arch v18 E2E Automation Pipeline — Multi-Session Program Design
date: 2026-05-21
status: APPROVED-FOR-PLANNING (revision-2 after course-correction to E2E automation)
wave: W353 (pending wave-number race-check; P1 of multi-session program)
branch: feat/research-arch-v18-pipeline-foundation
phase: P1 of multi-session program (S4+S7+S9 full-impl + design framework)
authority_model: 3-org-distinct + Anthropic-docs-anchored hybrid
codex_cadence: r1 → rN until APPROVE (no upper bound; S7 stage mechanizes this)
acceptance_bar_p1: pipeline framework + 4 schemas + populated catalog + 3 stages full-impl + 7 stage stubs + ALL P0+P1 drive-by fixes
program_phases:
  - P1 (this session): design pipeline + S4 validate + S7 codex-dispatch + S9 commit+push
  - P2 (next session): S5 drift-detect + S8 wave-allocate + S10 audit-ledger
  - P3 (third session): S1 discover + S2 score + S3 converge + S6 cite-refresh
  - P4 (fourth session): full self-improving feedback loop + research-MCP wiring
supersedes:
  - W283-stream2
  - W286d
  - W288-RESEARCH-ARCH-v2
  - W292
  - W295-V5
  - W296
  - W301-v6
  - W309
  - W312-B (v7)
  - W315 (v8-design)
  - W318
  - W319
  - W320-J
  - W322
  - W323-stream4 (v9)
references:
  kept_as_impl_history:
    - W326-RESEARCH-ARCHITECTURE-OVERHAUL (00-09 sub-docs)
    - W352-SOTA-CONVERGENCE-FOUNDATIONAL
    - .claude/skills/sota-convergence-audit/SKILL.md (sca-v17 506 LOC)
  cite_anchors_v18_root:
    - https://code.claude.com/docs/en/plugins
    - https://docs.anthropic.com/en/docs/claude-code/sub-agents
    - https://docs.anthropic.com/en/docs/claude-code/hooks
    - https://docs.anthropic.com/en/docs/claude-code/settings
    - https://docs.anthropic.com/en/docs/claude-code/memory
    - https://code.claude.com/docs/en/skills
revision_history:
  - r1 2026-05-21: initial design (static deliverables)
  - r2 2026-05-21: course-corrected to E2E automation pipeline as multi-session program
---

# Research-Arch v18 — E2E Automation Pipeline (Multi-Session Program Design)

## §0 Context (audit-grounded; 5-stream parallel audit 2026-05-21 + course-correction)

**Course-correction note (r2 2026-05-21):** Operator clarified requirement is "fully automation the entire sota workflow e2e". Original r1 spec shipped static deliverables (doc + schemas + populated data) as one-shot work. r2 re-scopes v18 as a **10-stage E2E automation pipeline** delivered as a **multi-session program** with explicit phasing (see acceptance bar + program_phases). This session = P1.

**Existing foundation that v18 builds on:**
- 131 SOTA repos cloned at `Z:\claude-sota-installed-repos\`
- 708 upstream cite-reference clones at `Z:\repos\deps\`
- sca-v17 rubric (`.claude/skills/sota-convergence-audit/SKILL.md`) — 83 dimensions, 506 LOC
- W326-RESEARCH-ARCHITECTURE-OVERHAUL (00-09 sub-docs) — fullest existing meta-design
- W352-SOTA-CONVERGENCE-FOUNDATIONAL/DESIGN.md — most recent decisions
- 17 LIVE MCPs, 47/58 enabled plugins, 6 git worktrees (1 over cap), gpg-signed commits
- 59 active operator-curated skills, all 6 cardinal rules PASS/PARTIAL
- codex GPT-5.5 plugin LIVE with Stop-review-gate WIRED + `/codex:setup` + `/codex:rescue` commands

**Critical gaps v18 P1 resolves (foundational subset of full E2E):**
- No machine-readable canonical SOTA-repo catalog (12+ unmerged research-arch versions)
- No pipeline orchestration layer (codex rounds today are manual + ad-hoc)
- No mechanized codex r1→rN convergence loop
- 23-dim ↔ D83 rubric drift in CLAUDE.md (CR-6 violation)
- 4 numeric drifts in CLAUDE.md (skill 58→59, colliding-bare 13→14, orphaned-FQN 38→43, sca dim 23→83)
- 6 worktrees > cap=5, WorktreeAdd hook absent, 50% Codex-Verdict trailer bypass rate
- CLAUDE.md L7 pre-W255 history claim FACTUALLY WRONG (no commits before 2026-05-15 reachable)

## §1 Authority model (locked)

**3-org-distinct + Anthropic-docs-anchored hybrid.**

Every SOTA claim in v18 requires BOTH:
1. **(a)** Anthropic docs URL OR Claude Code primitive cite, AND
2. **(b)** ≥3 independent organizations converging (extends sca-v13 W332 rule)

Mechanization: schema custom keyword `minDistinctOrgs: 3` on cite-anchor arrays. Codex GPT-5.5 acts as cross-org verifier during S7 codex-dispatch stage.

## §2 Schema scope (locked)

**Full meta-graph: 4 schemas.**

| # | Schema file | Validates | Required fields |
|---|---|---|---|
| 1 | `catalog.schema.json` | Repo entries × sca-v17 scores | `id, name, org, url, sha, sca_v17_scores{D1..D83}, cite_anchor_ids[], tier, install_pathway, status` |
| 2 | `cite-anchors.schema.json` | 3-org-distinct cite manifest | `id, claim_text, anchors[≥3]: {org, url, sha, line, last_verified_date}` |
| 3 | `codex-rounds.schema.json` | r1/r2/rN verdict records | `round_id, wave, model, sha_under_review, verdict, findings[], cite_anchor_ids[]` |
| 4 | `skill-provenance.schema.json` | Skill ↔ repo edges | `skill_path, source_repo_id, source_sha, vendor_fork_type, divergence_summary` |

Plus a new fifth schema for pipeline state:

| 5 | `pipeline-run.schema.json` | Per-pipeline-run state | `run_id, wave, started_at, stages: {S1..S10: {status, exit_code, output_uri, duration_ms}}, overall_verdict` |

All five use JSON Schema 2020-12 draft. Validator: ajv-2020 strict mode.

## §3 Migration strategy (locked)

Archive 13 obsolete + keep W326+W352 as implementation history. Details unchanged from r1.

## §4 Naming convention (locked — W352 hybrid)

| Surface | Pattern | Example |
|---|---|---|
| Branch | Conventional Branch | `feat/research-arch-v18-pipeline-foundation` (revised from r1's `-consolidate` to reflect E2E framing) |
| Wave dir | `W<N>-<TOPIC-UPPER-KEBAB>` | `docs/architecture/W353-RESEARCH-ARCH-V18-PIPELINE/` |
| Worktree | `<repo>-W<N>` | `Z:/claude-sota-installed-W353` |
| Commits | Conventional + Wave trailer + Codex-Verdict trailer | `feat(W353): land S4 validate stage\n\nWave: W353\nCodex-Verdict: APPROVE` |
| Codex round tags | `w<n>-codex-r<N>` | `w353-codex-r1`, ..., `w353-codex-rN` |

Concurrency race-check is MANUAL in P1; mechanized in P2 via S8 wave-allocate stage.

## §5 Acceptance bar P1 (locked — maximum depth)

**This session ships:**
- Codex GPT-5.5 r1→rN until APPROVE on the v18 design + 3 full-impl stages
- All 131 repos in `catalog.json` validate green via S4 validate stage
- All 59 skills in `skill-provenance.json` validate green
- ALL P0 + P1 drive-by fixes landed (8 fixes)
- 4 positive sample validations green, 4 negative validations error correctly
- 13 prior obsolete versions archived; W326+W352 kept inline
- `node tools/sota-pipeline.mjs --run --stages S4,S7,S9 --fixture sample` exits 0 on E2E run
- 7 stub stage scripts present with planned-impl markers
- Final commit signed (gpg) + carries `Codex-Verdict: APPROVE` + `Wave: W353` trailers
- Sonnet 4.6 tie-breaker invoked if codex r3↔r4 diverge (per CLAUDE.md L11 W331 P0.7)

## §6 Architecture (3-layer + pipeline orchestrator)

```
┌────────────────────────────────────────────────────────────────────────┐
│  E2E AUTOMATION PIPELINE (10 stages, multi-session phased)             │
│  ──────────────────────────────────────────────────────────────────    │
│  S1: DISCOVER       [P3] scan SOTA orgs + arXiv/Scholar/Crossref       │
│  S2: SCORE          [P3] apply sca-v17 (83 dims) to new candidates     │
│  S3: CONVERGE       [P3] 3-org-distinct cite gate                      │
│  S4: VALIDATE       [P1] ajv strict on all 5 schemas + sample data    ★│
│  S5: DRIFT-DETECT   [P2] CLAUDE.md numeric drift sweep                 │
│  S6: CITE-REFRESH   [P3] sweep cite-anchors >30d stale                 │
│  S7: CODEX-DISPATCH [P1] r1→rN until APPROVE; Sonnet 4.6 tie-break    ★│
│  S8: WAVE-ALLOCATE  [P2] race-safe next W<N> with file-lock            │
│  S9: COMMIT+PUSH    [P1] Wave+Codex-Verdict trailers; pre-commit gate ★│
│  S10: AUDIT-LEDGER  [P2] verdict-ledger row + T6 basic-memory write    │
│                                                                         │
│  ★ = full-impl in P1; others = stub in P1, full-impl in P2/P3         │
│                                                                         │
│  Orchestrator: tools/sota-pipeline.mjs (chains stages, per-stage exit) │
│  Pipeline state: docs/sota-research/pipeline-state/run-<id>.json       │
│  Trigger: manual `node tools/sota-pipeline.mjs --run` + future cron    │
└────────────────────────────────────────────────────────────────────────┘
                              │ underneath
                              ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Layer 1: NORMATIVE DOC                                                 │
│ docs/sota-research/V18-RESEARCH-ARCHITECTURE.md                         │
│ (supersedes 15 prior versions; cites W326+W352 as impl history)        │
└────────────────┬───────────────────────────────────────────────────────┘
                 │ references schemas as normative
                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Layer 2: 5 SCHEMAS (JSON Schema 2020-12 strict)                        │
│ docs/sota-research/schemas/                                             │
│   ├─ catalog.schema.json                                                │
│   ├─ cite-anchors.schema.json                                           │
│   ├─ codex-rounds.schema.json                                           │
│   ├─ skill-provenance.schema.json                                       │
│   └─ pipeline-run.schema.json                                           │
└────────────────┬───────────────────────────────────────────────────────┘
                 │ validates
                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Layer 3: POPULATED DATA + PIPELINE STATE                                │
│ docs/sota-research/data/                                                │
│   ├─ catalog.json (131 repos × 83 dims)                                │
│   ├─ cite-anchors.json (all v18 + W326 + W352 cite-clusters)           │
│   ├─ codex-rounds/r{1..N}.json                                          │
│   ├─ skill-provenance.json (59 skills)                                  │
│   └─ pipeline-state/run-<id>.json (per-pipeline-run state)              │
└────────────────────────────────────────────────────────────────────────┘
```

## §7 Components — P1 deliverables (22 components)

### Foundation (canonical doc + 5 schemas + populated data) — C1-C11 (renumbered)

| C# | Path | Status | Notes |
|---|---|---|---|
| C1 | `docs/sota-research/V18-RESEARCH-ARCHITECTURE.md` | FULL-IMPL P1 | ≤1500 LOC; sections 1:1 with schemas + pipeline |
| C2 | `schemas/catalog.schema.json` | FULL-IMPL P1 | See §2 |
| C3 | `schemas/cite-anchors.schema.json` | FULL-IMPL P1 | minDistinctOrgs=3 custom keyword |
| C4 | `schemas/codex-rounds.schema.json` | FULL-IMPL P1 | See §2 |
| C5 | `schemas/skill-provenance.schema.json` | FULL-IMPL P1 | See §2 |
| C6 | `schemas/pipeline-run.schema.json` | FULL-IMPL P1 | NEW; per-run pipeline state |
| C7 | `data/catalog.json` | FULL-IMPL P1 | 131-repo entries, 4-parallel populated |
| C8 | `data/cite-anchors.json` | FULL-IMPL P1 | All clusters ≥3 distinct orgs |
| C9 | `data/codex-rounds/r{N}.json` | FULL-IMPL P1 | Generated as r1..rN run |
| C10 | `data/skill-provenance.json` | FULL-IMPL P1 | 59 skills × source repos |
| C11 | `_archived/research-arch-v1-v17-lineage/INDEX.md` | FULL-IMPL P1 | Migration manifest |

### Pipeline orchestrator + foundational validator — C12-C13

| C# | Path | Status | Notes |
|---|---|---|---|
| C12 | `tools/sota-pipeline.mjs` | FULL-IMPL P1 | Orchestrator: parses `--stages S4,S7,S9`, dispatches each stage, writes pipeline-state run-id file, exits non-zero on any stage failure |
| C13 | `tools/validate-sota-catalog.mjs` | FULL-IMPL P1 | ajv-2020 strict validator; called by S4 |

### 10 stage scripts — C14-C23 (3 full-impl + 7 stubs)

| C# | Path | Phase | Status | Notes |
|---|---|---|---|---|
| C14 | `tools/sota-stages/s1-discover.mjs` | P3 | **STUB P1** | Reads `--input <stub-config>`; emits `discovered-candidates.json` with hard-coded sample; logs "STUB: full-impl deferred to P3" |
| C15 | `tools/sota-stages/s2-score.mjs` | P3 | **STUB P1** | Reads `discovered-candidates.json`; emits `scored-candidates.json` with sample scores; STUB marker |
| C16 | `tools/sota-stages/s3-converge.mjs` | P3 | **STUB P1** | Reads scored; emits `converged-candidates.json` after 3-org check (stubbed pass); STUB marker |
| C17 | `tools/sota-stages/s4-validate.mjs` | **P1** | **FULL-IMPL** | Wraps C13 validator; runs against all 5 schemas + 4 data files; exit 0 only if all green |
| C18 | `tools/sota-stages/s5-drift-detect.mjs` | P2 | **STUB P1** | Stub: emits `drift-report.json` with TODO markers; STUB marker |
| C19 | `tools/sota-stages/s6-cite-refresh.mjs` | P3 | **STUB P1** | Stub: emits `freshness-report.json` listing cite-anchors >30d stale (placeholder logic); STUB marker |
| C20 | `tools/sota-stages/s7-codex-dispatch.mjs` | **P1** | **FULL-IMPL** | Calls `codex exec` via codex plugin; r1→rN loop until verdict=APPROVE OR max-round=10; emits `data/codex-rounds/r{N}.json` per round; Sonnet 4.6 tie-breaker on r3↔r4 divergence |
| C21 | `tools/sota-stages/s8-wave-allocate.mjs` | P2 | **STUB P1** | Stub: emits `wave-claim.json` with hard-coded next-W; STUB marker |
| C22 | `tools/sota-stages/s9-commit-push.mjs` | **P1** | **FULL-IMPL** | Stages files, builds commit msg with Wave+Codex-Verdict trailers, runs pre-commit gate, commits, pushes with `--force-with-lease` |
| C23 | `tools/sota-stages/s10-audit-ledger.mjs` | P2 | **STUB P1** | Stub: emits `audit-ledger-row.json` placeholder; full T6 basic-memory write in P2; STUB marker |

### Tests + samples — C24-C26

| C# | Path | Status | Notes |
|---|---|---|---|
| C24 | `tests/sota-research/positive/*.json` | FULL-IMPL P1 | 4 positive samples |
| C25 | `tests/sota-research/negative/*.json` | FULL-IMPL P1 | 4 negative samples |
| C26 | `tests/sota-research/pipeline-e2e-fixture.json` | FULL-IMPL P1 | E2E fixture for `--run --stages S4,S7,S9 --fixture sample` |

## §8 Data flow (pipeline run-N)

```
              ┌─────────────────────────────────────┐
              │  tools/sota-pipeline.mjs --run     │
              │  --stages <comma-sep>              │
              │  --fixture <name>                  │
              └────────────────┬────────────────────┘
                               │ allocate run-id
                               ▼
              ┌──────────────────────────────────────┐
              │  pipeline-state/run-<id>.json (init) │
              └────────────────┬─────────────────────┘
                               │ dispatch each stage in order
       ┌───────────────────────┼──────────────────────────────┐
       ▼                       ▼                              ▼
[S1 DISCOVER stub]    [S2 SCORE stub]              [S3 CONVERGE stub]
       │                       │                              │
       └───────────────────────┴──────────────────────────────┘
                               │ candidates → catalog updates
                               ▼
                  [S4 VALIDATE full-impl] ──fail──▶ exit non-zero
                               │ pass
                               ▼
              [S5 DRIFT-DETECT stub]
                               │
                               ▼
              [S6 CITE-REFRESH stub]
                               │
                               ▼
              [S7 CODEX-DISPATCH full-impl]
                  │ r1 → r2 → ... rN until APPROVE
                  │ Sonnet 4.6 tie-break on r3↔r4 divergence
                               │
                               ▼
              [S8 WAVE-ALLOCATE stub]
                               │
                               ▼
              [S9 COMMIT+PUSH full-impl]
                  │ pre-commit gate must pass
                               │
                               ▼
              [S10 AUDIT-LEDGER stub]
                               │
                               ▼
              ┌──────────────────────────────────────┐
              │  pipeline-state/run-<id>.json (final)│
              │  overall_verdict: APPROVE / BLOCK    │
              └──────────────────────────────────────┘
```

In P1, only S4/S7/S9 do real work; others run as stubs and emit valid (but synthetic) stage outputs. The orchestrator validates each stage's output against `pipeline-run.schema.json` regardless of stub/full status.

## §9 Error handling / validation

- JSON Schema 2020-12 (`ajv-2020 strict-mode`)
- Each stage exits 0 (success), 1 (recoverable failure — pipeline continues with degraded flag), 2 (fatal — pipeline aborts)
- Pipeline orchestrator catches stage failures and writes `failure_reason` to pipeline-state file
- Custom keyword `minDistinctOrgs: 3` enforces 3-org-distinct rule
- SHA pattern: `'^[0-9a-f]{7,40}$'`
- ISO 8601 date pattern for `last_verified_date`
- catalog `tier`, `install_pathway`, `status` use enum-only
- Validator output captured in `docs/sota-research/validation-report.md` on each run

## §10 Testing

`tests/sota-research/` (per r1) + new pipeline integration tests:

**Positive (4) + Negative (4)** — unchanged from r1.

**E2E pipeline integration:**
- `tests/sota-research/pipeline-e2e-fixture.json` — sample data covering all 5 schemas
- `node tools/sota-pipeline.mjs --run --stages S4,S7,S9 --fixture pipeline-e2e-fixture.json --dry-run` must exit 0
- Non-dry-run E2E ships with `Codex-Verdict: BOOTSTRAP` for initial smoke; full E2E run with codex APPROVE is the P1 ship gate

**Stub stage contract tests:**
- Each stub stage must accept the same input shape as its full-impl counterpart will
- Each stub emits a valid output file against the relevant schema
- This way P2/P3 implementers can swap in full-impl without orchestrator changes

## §11 Codex round structure (W331 P0.7 frontier-peer + W335 trailer + S7 stage formalized)

S7 codex-dispatch stage is the mechanized version of the previously-manual codex round process:

| Round | Purpose | Trigger | Verdict outcomes |
|---|---|---|---|
| r1 | Critic | First v18 schemas + doc draft | APPROVE / REVISE (≥5 findings expected) |
| r2 | Post-revision | After r1 findings addressed | APPROVE / REVISE / new findings |
| r3+ | Convergence | Until no new findings OR max-round=10 | APPROVE / REVISE |
| Sonnet 4.6 tie-breaker | Cross-model arbiter | If r3 ↔ r4 verdicts diverge | Final decision |

Each round emits `docs/sota-research/data/codex-rounds/r{N}.json` validating against C4 schema. Each round is git-tagged: `w353-codex-r{N}`. Max-round=10 hard wall per Risk R3 (operator-escalate if not converged by r10).

## §12 P0+P1 drive-by fixes (interleaved with codex rounds)

Unchanged from r1. 8 fixes (DBF1-DBF8).

## §13 Branch + commit + worktree structure (W352 hybrid; renamed for E2E framing)

- Branch: `feat/research-arch-v18-pipeline-foundation`
- Wave dir: `docs/architecture/W353-RESEARCH-ARCH-V18-PIPELINE/`
- Worktree: `Z:/claude-sota-installed-W353` (after DBF1 excise)
- Commits: Conventional Commit + `Wave: W353` trailer + `Codex-Verdict: <verdict>` trailer
- Git tags per codex round: `w353-codex-r1`, ..., `w353-codex-rN`
- Pre-commit gate: existing 10-hook pipeline
- Race-check: manual in P1; mechanized in P2 via S8 wave-allocate stage

## §14 Risks + mitigations

| Risk | Mitigation |
|---|---|
| R1: v18 doc exceeds 1500 LOC | Hard cap via `wc -l`; overflow sections extract to `docs/sota-research/sub/` |
| R2: 131-repo catalog populate misses repos | Cross-check against `Z:\claude-sota-installed-repos\` `ls` enumeration + subagent-type-allowlist |
| R3: codex round count grows unbounded | Hard wall at r10; escalate to operator for sign-off decision |
| R4: W353 collides with parallel session | Manual `git fetch && grep` race-check before wave-dir creation; advance to W354 if needed |
| R5: 3-org-distinct rule too strict; some claims have ≤2 orgs | Mark `tier: PATTERN-CITE` with `provisional: true` flag; doc carries policy note |
| R6: Schema-first approach surfaces design issues mid-doc-write | Schemas finalized BEFORE doc body written |
| R7: P0+P1 drive-by fixes cause merge conflict with parallel sessions | Drive-by fixes land in atomic separate commits; rebase rather than merge |
| **R8 (new): Pipeline orchestrator complexity exceeds P1 budget** | Stub stages keep complexity bounded; full E2E happens with 3 real stages |
| **R9 (new): Stub stage output drift from full-impl contract** | Schema-validate every stub output; contract tests in C24-C25 |
| **R10 (new): S7 codex-dispatch infinite loop** | Max-round=10 hard wall; operator-escalate sentinel |
| **R11 (new): S9 commit+push race-condition with parallel session** | `--force-with-lease` semantics + pre-commit cr7-worktree-collision gate already wired |
| **R12 (new): Multi-session program drift between P1/P2/P3 sessions** | This spec is the single source-of-truth; P2/P3 specs supersede only with explicit operator-sign |

## §15 Success criteria P1 (operator sign-off)

v18 P1 is shipped when ALL of:

- [ ] Codex GPT-5.5 r1→rN convergence reached on this spec + 3 full-impl stages
- [ ] All 5 schemas in `docs/sota-research/schemas/` exist + ajv-2020-strict-validate green
- [ ] `data/catalog.json` populated with 131 repos, all validate green
- [ ] `data/cite-anchors.json` populated, all clusters ≥3 distinct orgs, validate green
- [ ] `data/codex-rounds/r{1..N}.json` all validate green
- [ ] `data/skill-provenance.json` populated with 59 skills, validate green
- [ ] 4 positive + 4 negative sample tests pass
- [ ] 13 obsolete prior versions archived under `_archived/research-arch-v1-v17-lineage/`
- [ ] W326 + W352 preserved inline as cite-anchored impl history
- [ ] All 8 drive-by fixes landed (DBF1-DBF8)
- [ ] `node tools/sota-pipeline.mjs --run --stages S4,S7,S9 --fixture pipeline-e2e-fixture.json` exits 0
- [ ] 7 stub stage scripts present and pass contract tests
- [ ] Final commit signed (gpg) + `Codex-Verdict: APPROVE` + `Wave: W353` trailers
- [ ] Operator reviews + signs off on this spec's acceptance bar match

## §16 Multi-session program phasing roadmap

| Phase | Session | Stages full-impl | Other deliverables |
|---|---|---|---|
| **P1** | This session | S4 validate, S7 codex-dispatch, S9 commit+push | Pipeline orchestrator framework + 5 schemas + populated data + 7 stage stubs + 8 drive-by fixes |
| **P2** | Next session | S5 drift-detect, S8 wave-allocate, S10 audit-ledger | Pre-commit validator hook; `tools/sweep-cite-freshness.mjs` foundation |
| **P3** | Third session | S1 discover, S2 score, S3 converge, S6 cite-refresh | Wire 4 new research-source MCPs (arxiv/scholar/crossref/openalex) into `.mcp.json`; full sca-v17 mechanization |
| **P4** | Fourth session | Full self-improving feedback loop | CI workflow `.github/workflows/cite-3org-gate.yml`; cron-scheduled pipeline runs; W326-04-SELF-IMPROVING-RESEARCH built out |

Each phase's spec supersedes only with explicit operator-sign. P1 spec is canonical for the foundational pipeline shape.

## §17 References (cite-anchored)

**Anthropic primary sources:**
- [Plugins](https://code.claude.com/docs/en/plugins)
- [Sub-agents](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [Hooks](https://docs.anthropic.com/en/docs/claude-code/hooks)
- [Settings](https://docs.anthropic.com/en/docs/claude-code/settings)
- [Memory](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Skills](https://code.claude.com/docs/en/skills)

**Local impl history (preserved):**
- `docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/` (00-09)
- `docs/architecture/W352-SOTA-CONVERGENCE-FOUNDATIONAL/DESIGN.md`
- `.claude/skills/sota-convergence-audit/SKILL.md` (sca-v17)

**Cardinal-rule anchors (CLAUDE.md):** CR-1 through CR-6 — unchanged from r1.

**3-org-distinct convergence sources** — unchanged from r1.

**Pipeline orchestration pattern anchors (3-org-distinct):**
- Anthropic: claude-cookbooks @39a350b6 `patterns/agents/orchestrator_workers.ipynb`
- Microsoft: autogen v1.0 GA `GroupChat` + `SelectorGroupChat`
- lastmile-ai/mcp-agent: Orchestrator (planner-workers-synthesizer) + Evaluator-Optimizer patterns
- LangChain.ai: langgraph BaseCheckpointSaver + thread-id checkpoints for resume-after-failure

## §18 Self-review notes (r2 revision)

**Placeholder scan:** No "TBD" / "TODO" remain in spec body. Stub stages have explicit `[STUB]` markers (intentional).

**Internal consistency:**
- §1 authority ↔ §3 cite-anchors schema custom keyword (consistent)
- §4 naming ↔ §13 branch+commit (consistent)
- §5 acceptance bar P1 ↔ §15 success criteria (1:1 match)
- §6 architecture pipeline ↔ §7 components C12-C23 (1:1 stages mapped)
- §16 multi-session phasing ↔ §7 phase column (consistent)
- §8 data flow shows S4/S7/S9 as ★ which matches the 3 full-impl stages in §7

**Scope check:**
- P1 ships pipeline framework + 3 stages full-impl + 7 stubs + foundation (doc + schemas + data)
- P2-P4 stages explicitly out-of-P1-scope via §16
- 11 foundation components + 1 orchestrator + 1 validator + 10 stage scripts + 3 test suites = 25 deliverables P1
- Codex r1→rN remains under R3 max-r10 hard wall

**Ambiguity resolved:**
- "Stub stage" = runnable Node script that accepts input, emits schema-valid synthetic output, logs `STUB: full-impl deferred to P<N>` to stderr
- "Full-impl stage" = does the real work, full convergence
- Branch name changed `consolidate` → `pipeline-foundation` to reflect E2E framing
- Wave dir name added `-PIPELINE` suffix for same reason

**Course-correction trace (r1 → r2):**
- r1 framed v18 as static deliverables (doc + schemas + populated data)
- r2 reframes v18 as 10-stage E2E automation pipeline delivered as multi-session program
- All r1 deliverables are preserved as foundation under the new pipeline layer
- 3 stages move from "implicit manual workflow" to "explicit automated stage script" in P1
- 7 stages added as stubs in P1 with planned-impl in P2/P3/P4

---

**STATUS:** Approved-for-planning (r2). Next step: operator reviews this r2 spec; on approval, invoke `superpowers:writing-plans` to produce P1 implementation plan.
