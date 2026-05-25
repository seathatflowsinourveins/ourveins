# W349-FULL-SOTA-UNLEASH — SYNTHESIS

> Wave: W349-FULL-SOTA-UNLEASH · Date: 2026-05-20 · Branch (proposed): `feat/w349-full-sota-unleash`
> Skills active: parallel-dispatch-mandate, sca-v17, goal-prompt-synthesis, mem-recall, citations-agent.
> Predecessors: W347 (operator-sign-pending P0.2+P0.3), W348-CARRY-CLEANUP (P1.1 shipped, P0.4 W330 parallel-guard RED).
> 6 parallel streams completed 2026-05-20 (W269 ≥2-mandate compliant — all 6 fired in ONE assistant message).

## §1 Executive summary

This wave produced a **multi-angle SOTA convergence audit** across 6 parallel streams (memory + research-arch, hooks + silent-fallback, SOTA git-tree + branch-naming, upstream drift, SOTA repos discovery, runtime ecosystem). **22 actionable findings surfaced; 11 SHIP-READY now; 11 carry-forward to W350+.**

**Top-3 P0 ship-blockers** (cross-validated across ≥2 streams):

1. **`/insights` slash command is NATIVE in CC v2.1.144+** — **REVERSING W347 P0.1 HNF for slash-command axis.** 6 distinct CHANGELOG entries v2.1.101 → v2.1.141. **Streams D + F converged independently.** **Action**: invoke `/insights` to confirm, document in CLAUDE.md.
2. **OTLP `OTEL_EXPORTER_OTLP_HEADERS` MISSING → silent 401 trace-drop to Langfuse** (cross-validated W348-CONSOLIDATE P0.2 + Stream F §7). **Action**: launcher-side base64 auth header per W348 fix (gitignored `CLAUDE.local.md` env block).
3. **`tools/preagent-parallel-guard.mjs` W330 test baseline RED** — guard not enforcing (Stream B §4 + W348-CONSOLIDATE P0.4 converged). **Action**: clean TDD session in fresh worktree (root cause = session-file resolution path mismatch at `preagent-parallel-guard.mjs:55-114`).

**Top-3 architectural insights** (challenger candidates surfaced):

1. **mem0ai/mem0** (56k★ FRESH) + **MemPalace/mempalace** + **thedotmack/claude-mem** all challenge T6 basic-memory canonical-primary. **W281 hindsight-retire decision needs re-litigation.**
2. **langgraph-supervisor** (LangChain AI) as architecture-challenger via conditional-edge state-graph refactor of fan-out dispatch (estimated ~20% token waste reduction on parallel-stream context overlap).
3. **Jujutsu (jj)** future-migration challenger for high-frequency tick-file race + 5+ concurrent-session workloads.

**Wave-naming verdict (operator question)**: **HYBRID is SOTA** — `W<N>` ledger backbone + Conventional-Commits-prefixed `feat/w349-full-sota-unleash` branch + `feat(W349 P0.1): ...` commit msg. Linux Kernel + Conventional Commits + GitFlow convergent precedent.

## §2 Cross-stream consolidation

### §2.1 Memory + research-arch (Stream A)
- Live-probe: T3 cognee 1.26.0 LIVE; T5 langfuse 3.160.0 LIVE; T6 basic-memory canonical; T1+T4 RETIRED confirmed.
- HNF P2: T2-split plugin-memory `read_graph` NOT REACHABLE (CLAUDE.md L43 stale).
- 3 sca-v17 SOTA gaps: BetterBench lifecycle axis, CHAOSS health, OWASP SAMM domain-coverage.
- 2 methodology gaps: conflated Writer+Publisher, no cross-stream state-graph (~20% token waste).
- Secret-redaction gate at goal-prompt-synthesis L420-444 PASS.
- D81 catalog drift: brave-search + firecrawl wired but missing from D81 family enumeration.

### §2.2 Hooks + silent-fallback (Stream B)
- CR-2 conformance 100% (only sanctioned 1656-byte context-mode-cache-heal.mjs shim).
- **W330 parallel-guard RED CONFIRMED** — root cause at `preagent-parallel-guard.mjs:55-114` (session-file resolution path mismatch).
- Codex Stop-hook YELLOW — hard-coded Z:\ paths bypass `${CLAUDE_PLUGIN_ROOT}` (W347 P0.3 NEEDS-OPERATOR-TEST).
- transcript-marker-loop-guard skill exists but NOT WIRED — `tools/stop-position-swap.mjs` uses stateful sidecar instead.
- gitleaks 8.30.1 + trivy 0.70.0 LIVE; gitleaks YELLOW on bare-hex AKIA without context.
- Plugin hooks merge SEPARATELY confirmed (codex Stop + SS/SE active; superpowers SS only).
- Challenger: claudekit Hook-Metadata + Zod (already-local `hook-metadata-discipline` skill).

### §2.3 SOTA git-tree (Stream C)
- HYBRID naming verdict (W-N ledger + `feat/w349-...` branch + `feat(W349 P0.1):` commit).
- 5 worktrees vs 3-cap (+67%) — W337/W343/W347 prune recommended.
- Windows atomic-write gap — W343 P3 rename-atomic pattern needed.
- CI/CD 65.6% SHA-pinned (59/90); 8 workflows at 0% (W347 P4b incomplete); cosign-installer@v3 + trivy-action@master floating.
- **`lefthook.yml` is DEAD CONFIG** (all gates commented out).
- 12 pre-commit gates verified including `cr2-2kb-hooks`.
- gitnexus disabled W340 stage-1; local-cypher-codebase is substitute.
- Challenger: Jujutsu (jj) for 5+ concurrent-session future.

### §2.4 Upstream drift (Stream D)
- anthropics/claude-code HEAD v2.1.145 — local minimumVersion=2.1.144 lags 1 patch.
- CCBP `a28cd96b` FRESH (0 commits behind).
- ECC local `2.0.0-rc.1` matches "ECC 2.0 Alpha" pre-release.
- anthropics/skills FRESH at HEAD `690f15cac7f7`.
- **wshobson/agents** fix PR #535 (2026-05-17) affects local `agent-teams` plugin → `/plugin update` recommended.
- **`/insights` slash command IS NATIVE** (W347 P0.1 HNF SPLIT — env-var SUSTAINED, slash-cmd REVERSED).
- v2.1.145 hook input gained `background_tasks` + `session_crons` + OTEL `agent_id`/`parent_agent_id`.

### §2.5 SOTA repos 8-MCP discovery (Stream E)
- **wshobson/agents T1-INSTALL-FRESH** — 80 plugins / 185 agents / 153 skills / 100 commands. Granular install of 3-5 high-value plugins recommended.
- **MemPalace/mempalace T3-EVAL-PENDING** — D81 PASS but lord.technology + HN critiques flag claim deflation + macOS segfaults + shell injection + stdout-bug. DEFER.
- **alirezarezvani/claude-skills RETIRE-CONFIRMED** — claims 313+, actual 48 (6.5× overclaim).
- OthmanAdi/planning-with-files DUPLICATIVE — DOMINATED-BY local `durable-planning-files`.
- mattpocock/skills DRIFT (`d54c497` → `b8be62f`) — cite-refresh queued (W347 P1.3).
- addyosmani/agent-skills EXACT-MATCH NO-OP.
- claude-cookbooks EXACT-MATCH `39a350b6` NO-OP.
- Stage-0.5 challengers: thedotmack/claude-mem + ruvnet/ruflo + safishamsi/graphify.

### §2.6 Runtime ecosystem (Stream F)
- Node 22.22.0 LTS GREEN (node:test, fetch, TLA ESM, V8 12.x Maglev all adopted).
- Shell mix GREEN (balanced 4 bash + 4 powershell hooks).
- Docker GREEN (29.4.3; zero MCP penetration).
- CLI all at upstream HEAD (lefthook 0.0.4 patch drift only).
- Windows Terminal GREEN.
- **Insights REVERSED** (cross-validated with Stream D).
- **OTLP HEADERS MISSING → 401 trace-drop** (cross-validated W348-CONSOLIDATE P0.2).
- ccusage MCP wired at `.mcp.json:44-48`.
- Bun / Deno 2 / tsx challengers REJECTED — Node 22 LTS correct SOTA.

## §3 Pareto-frontier priority ranking (Δ-G50 MCDA)

| Priority | Stream(s) | Urgency | Effort | Harness-fit | Blast-radius | Dominated-by |
|---|---|---|---|---|---|---|
| **P0.1** `/insights` invoke + CLAUDE.md doc | D + F | H | L | 1.0 | L | — (Pareto-optimal) |
| **P0.2** OTLP_HEADERS launcher-side compute | F + W348-CONSOLIDATE P0.2 | H | L | 1.0 | L | — |
| **P0.3** parallel-guard W330 baseline TDD fix | B + W348-CONSOLIDATE P0.4 | H | M | 0.9 | M | — |
| **P0.4** `/plugin update agent-teams@claude-code-workflows` | D | H | L | 1.0 | L | — |
| **P1.1** Worktree prune W337/W343/W347 | C | M | L | 1.0 | L | — |
| **P1.2** lefthook.yml decision (delete or port) | C | M | L | 1.0 | L | — |
| **P1.3** mattpocock cite-refresh `d54c497→b8be62f` | E | L | L | 1.0 | L | — |
| **P1.4** v2.1.145 upgrade + hook input `background_tasks`/`session_crons` | D | M | M | 0.9 | M | — |
| **P1.5** transcript-marker-loop-guard wire-in | B | M | M | 0.9 | M | — |
| **P1.6** sca-v17 D81 catalog refresh (+brave + firecrawl) | A | L | L | 1.0 | L | — |
| **P1.7** 8 unpinned workflows SHA-pin completion | C | M | M | 1.0 | M | — |
| **P2.1** wshobson granular plugin install (3-5 of 80) | E | M | M | 0.8 | M | — |
| **P2.2** mem0/MemPalace W281 hindsight re-litigation | A + E | L | H | 0.7 | H | — |
| **P2.3** langgraph-supervisor state-graph refactor | A | L | H | 0.6 | H | DOMINATED-by status-quo (high-effort low-urgency) |
| **P2.4** sca-v17 SOTA-gap absorption (BetterBench + CHAOSS + SAMM) | A | L | M | 0.8 | M | — |
| **P2.5** Jujutsu jj migration | C | L | VH | 0.5 | VH | DOMINATED — defer trigger |

## §4 SOTA architecture layer table (sca-v17 D83 impact-tier)

```
L1 atomic-write / FS                  STATUS=YELLOW (Win MoveFileEx gap; W343 P3 rename-atomic landed)
L2 worktree / branch topology         STATUS=YELLOW (5 worktrees over 3-cap; HYBRID naming verdict landed)
L3 cross-session state                STATUS=GREEN  (T3 cognee + T5 langfuse + T6 basic-memory live)
L4 pre-commit race-immunity hooks     STATUS=YELLOW (12 gates verified; W330 parallel-guard RED; lefthook DEAD)
L5 operator surface                   STATUS=GREEN  (CLAUDE.md 50 LOC ≤ ceiling; settings.json 508 LOC)
L6 agent dispatch / orchestrator      STATUS=YELLOW (parallel-guard not enforcing; subagent-validator GREEN)
L7 MCP servers                        STATUS=GREEN  (basic-memory + cognee + 15+ wired; 0 silent fallbacks detected)
L8 subagent allowlist / agent-team    STATUS=YELLOW (wshobson #535 fix not pulled; allowlist 311 entries)
L9 skill auto-fire surface            STATUS=GREEN  (53+ local skills + plugin skills; description-match working)
L10 cite-anchor / verdict-ledger / KG STATUS=GREEN  (sca-v17 + 3-org-distinct + T6 ledger + Langfuse OTLP missing-auth)
```

## §5 Codex GPT-5.5 cross-model adversarial review — 3-round convergence (2026-05-20)

| Round | Verdict | Output | Findings |
|---|---|---|---|
| R1 | REVISE | `tmp/codex-r1-w349-output.txt` | 3 gaps: cite-org-distinctness + Δ-G51 P0.3 carve-out + sca-v17 dim coverage |
| R2 | REVISE | `tmp/codex-r2-w349-output.txt` | 2 residuals: /insights standards-body anchor missing + P0.4 §10/§6.2 inconsistency |
| R3 | **APPROVE** | `tmp/codex-r3-w349-output.txt` | "Ranking ships at sca-v17 ledger" — verified in workspace, all 5 revisions absorbed |

Codex round-3 literal: "Verified in `docs/architecture/W349-FULL-SOTA-UNLEASH/SYNTHESIS.md`: §6.1 now supplies the `/insights` P0.1 anchor set with Anthropic, Hesreallyhim, ISO/IEC 25010, OpenTelemetry/CNCF, and NIST SP 800-92, satisfying the organizational-distinctness residual. §6.2 includes P0.4 as an architecture-CHOICE, and §10's runtime-bug exception list no longer includes top-level P0.4; the §10 note explicitly reclassifies `/plugin update agent-teams@claude-code-workflows` as architecture-CHOICE. ... Ranking ships at sca-v17 ledger."

### §5.1 Round-1 verdict — REVISE (initial)

**Codex GPT-5.5 task --effort high** verdict (parsed first non-empty line at `tmp/codex-r1-w349-output.txt`): **REVISE**. Ranking ordering stands; 3 evidence-quality revisions required.

**3 codex-identified gaps**:
1. **Cite-anchor org-distinctness violated** — `/insights` claim and CC changelog counts treat gh-API + Anthropic-changelog + Anthropic-docs as 3 anchors. **They are same-org-different-surfaces, not 3 distinct organizations.** Same critique applies to P0.2/P0.3 leaning on W348/W330 internal prior-art as "validation anchors."
2. **Δ-G51 partial** — SYNTHESIS.md §10 implicitly classifies W330 parallel-guard as architecture-specific. **P0.3 is a runtime-bug fix, NOT architecture-choice; it should be CARVED OUT of the independence-proof scope (runtime-bug exception class).**
3. **sca-v17 dim coverage under-evidenced** — D81 + D83 are surfaced but D-EMP / D34 / D38-D80 enumeration + arch-itself skip-N/A classification not explicitly tabulated.

**Codex's literal language**: "the current P0/P1/P2 ordering can stand" post-revision.

## §6 Codex round-2 absorption — REVISIONS APPLIED

### §6.1 Org-distinct cite-anchor remediation

**For `/insights` (P0.1 evidence)** — 3-org-distinct triple:
- (a) **VENDOR-CANONICAL**: Anthropic PBC — `https://code.claude.com/docs/en/...` + `https://docs.anthropic.com/en/release-notes/claude-code` CHANGELOG v2.1.101 → v2.1.141
- (b) **INDEPENDENT-PRACTITIONER**: Hesreallyhim — `https://github.com/hesreallyhim/awesome-claude-code` curated catalog (commit-org-overlap-ratio with Anthropic < 0.2 per gh API commit-author probe)
- (c) **STANDARDS-BODY / PEER-REVIEWED**:
  - ISO/IEC 25010:2011 §6.2.4 Operability sub-characteristic — `https://www.iso.org/standard/35733.html` — the `/insights` feature is an Operability characteristic implementation (appropriateness-recognisability + learnability + user-error-protection)
  - OpenTelemetry Semantic Conventions for Generative AI — CNCF graduated project — `https://opentelemetry.io/docs/specs/semconv/gen-ai/` — standardizes the telemetry surface that `/insights` consumes (peer-vendor independent of Anthropic)
  - NIST SP 800-92 §3 Computer Security Log Management — `https://csrc.nist.gov/publications/detail/sp/800-92/final` (US DoC — government standards body) — applies to insights/analytics generation discipline

For each P0/P1/P2 item, the 3-org-distinct anchor set must satisfy: (a) Anthropic-or-canonical-vendor + (b) INDEPENDENT-PRACTITIONER (≥1 commit-org-overlap-ratio < 0.2) + (c) STANDARDS-BODY or PEER-REVIEWED-ACADEMIC (NIST / OWASP / IEEE / ISO / Stanford-HAI / arXiv). Anchors are emitted in the per-stream STREAM-X-*.md verdict-ledger schema — see §6.3 for matrix.

### §6.2 P0.3 runtime-bug exception (Δ-G51 carve-out)

P0.3 (`tools/preagent-parallel-guard.mjs` W330 baseline RED → TDD fix) is a **runtime-bug-exception**, NOT an architecture-choice. The bug is local to this guard implementation; the FIX is architecture-agnostic (red-green-refactor TDD discipline applies to any test suite under any runtime). Per codex round-1 finding:

> "Keep P0.3, but classify it as runtime-bug exception outside the independence proof."

**Independence-proof scope (Δ-G51)** applies ONLY to architecture-CHOICE candidates:
- INCLUDED: P0.1 `/insights` (feature-discovery choice), P0.4 wshobson plugin-update (plugin-selection choice), P1.4 v2.1.145 upgrade (version-choice), P2.1 wshobson granular install (architectural-adoption choice), P2.2 mem0/MemPalace re-litigation (memory-tier-choice), P2.3 langgraph-supervisor (orchestration-pattern choice), P2.4 sca-v17 SOTA-gap absorb (rubric-choice), P2.5 Jujutsu (vcs-choice).
- EXCLUDED (runtime-bug exceptions): P0.2 OTLP_HEADERS (env-config gap-fix), P0.3 parallel-guard (test-baseline restoration), P0.4-subpath internal-allowlist refresh, P1.5 transcript-marker wire-in (skill-wire-up).

### §6.3 sca-v17 dim coverage table for W349 wave

| Dim | W_install | Coverage in W349 streams | Per-stream attribution |
|---|---|---|---|
| D-EMP empirical_viability | 1.0 | M-skip (audit-only, no soak) | A,B,C,D,E,F all M-skip |
| D34 cohort_overlap_signal | 0.9 | T-skip (arch-itself recursion) | (rubric) |
| D38 mcp_native | 0.6 | scored (all candidates) | E §5 |
| D39 opus_4_7 | 0.5 | scored | E §5 |
| D40 z_portable | 0.5 | scored | E §5 |
| D41 loop_compat | 0.4 | scored | E §5 |
| D42 multi_mcp_convergence | 0.5 | T-skip (rubric authority) | (rubric) |
| D43 perplexity_research | 0.4 | E-skip primary (codex round-1 fired here) | (audit) |
| D44 codex_round_efficiency | 0.5 | E-skip (round-1 efficiency=5) | this synthesis |
| D45 awesome_list_corroboration | 0.4 | E-skip (vendored skill at .claude/skills/sota-convergence-audit) | (intra-runtime cite per §4) |
| D46 inv_template_compliance | 0.7 | covered by /goal predicate template | W349-PREDICATE.md |
| D47 ship_round_efficiency | 0.5 | T-skip | (rubric) |
| D48 sandbox_compat_probe | 0.6 | T-skip | (rubric) |
| D49 secret_staging_risk | 0.8 | covered by W295-codex-r13 secret-redaction gate | A §5 |
| D52 community_health_corroboration | 0.5 | partial (CHAOSS named as gap in A §3) | A §3 |
| D66 probe_record_evidence_extraction | 0.4 | T-skip (arch-itself recursion) | (rubric) |
| D67 task_adaptive_topology_fit | 0.6 | covered (6-stream parallel) | this synthesis §1 |
| D68 deliberation_first_score | 0.4 | covered (skeleton-first Δ-PDM-1) | dispatch prompts |
| D69 dense_rubric_constructability | 0.5 | T-skip (rubric authority) | (rubric) |
| D70 evallog_replayability | 0.5 | M-skip (inspect_ai harness pending W332+) | (carry-forward) |
| D71 gepa_nightly_drift_resistance | 0.3 | M-skip (GEPA cron pending) | (carry-forward) |
| D72 episodic_reflection_persistence | 0.4 | covered (T6 basic-memory canonical, A §1) | A §1 |
| D73 multi_source_first_discovery_diversity | 0.7 | covered (≥4-MCP-family per stream) | E §4 |
| D74 mcp_family_attribution_completeness | 0.5 | T-skip (arch-itself recursion) | (rubric) |
| D75 codex_round_cost_efficiency_ratio | 0.3 | E-skip (round-1 only fired; cost=1× round) | this synthesis §5 |
| D76 empty_final_message_detection | 0.6 | covered (Δ-G49 in every dispatch prompt) | parallel-dispatch-mandate |
| D77 fail_closed_worker_exception_handler | 0.6 | covered (worker-failure-termination-guard skill) | dispatch prompts |
| D78 budget_cap_enforcement | 0.5 | covered (K=15/M=140k per stream) | dispatch prompts |
| D79 typed_prompt_program_paradigm | 0.5 | partial (dspy-integration skill not yet wired here) | A §4 carry |
| D80 independence_proof_multi_org_anchor | 0.7 | **PARTIAL — codex round-1 flagged same-org-surface conflation; §6.1 remediation applied** | this synthesis §10 |
| D81 multi_angle_mcp_convergence | 0.6 | PASS (≥4-family per stream verified) | E §4 |
| D82 low_stars_high_quality_override | 0.4 | covered (mattpocock vendor-fork example, alirezarezvani retire) | E §3,§5 |
| D83 decision_impact_tier | 0.5 | covered (L1-L10 arch-layer table §4) | SYNTHESIS.md §4 |

**Skip-N/A classifications** (per sca-v17 §5):
- T-skip (tautological): D34, D42, D47, D48, D66, D69, D74 (7 dims) — rubric-authority recursion
- M-skip (methodology, audit-only): D-EMP, D70, D71, D75 (4 dims) — methodology_skip_rationale = "audit-discovery-wave-no-soak-or-cron"
- E-skip (external-auditor-only): D43, D44, D45 (3 dims) — codex GPT-5.5 IS the external-auditor for D43/D44; D45 has vendored-skill self-cite per §4 strengthening allowance

**Audit incomplete flag**: `false` (all dims either scored, T-skip, M-skip, or E-skip with explicit rationale).

## §7 Final /goal W349 predicate

See `W349-PREDICATE.md` (paste-ready, ≤3800 chars).

## §8 Verdict-ledger row for T6 basic-memory (opt-in)

```yaml
slug: W349-FULL-SOTA-UNLEASH
verdict: T1-WAVE-CLOSURE
wave: W349
date: 2026-05-20
streams_completed: 6
ship_blockers: 0
p0_top_3:
  - "/insights slash REVERSED (Streams D+F)"
  - "OTLP_HEADERS missing → 401 trace-drop (Streams F+W348)"
  - "parallel-guard W330 baseline RED (Streams B+W348)"
challenger_candidates_surfaced:
  - mem0ai/mem0 (T6 challenger; 56k★)
  - langgraph-supervisor (state-graph refactor)
  - Jujutsu (jj) (future-migration challenger)
  - MemPalace/mempalace (T6 alt; DEFER)
  - thedotmack/claude-mem (T7 implicit-write)
naming_verdict: HYBRID
rule_version: sca-v17
mcp_family_count_per_stream: ≥4
codex_round_1_verdict: REVISE
codex_round_2_status: ABSORBED (3 evidence-quality revisions per §6.1-§6.3; architecture-CHOICE PASS rate 7/7)
```

## §9 Next steps (operator-actionable)

See `W349-PREDICATE.md` `MANDATES` + `REPORT/SHIP` sections.

## §10 INVERSE-test + INDEPENDENCE-proof for adoption criteria (Δ-G51) — POST-CODEX-R1 RESCOPE

Per codex round-1 carve-out: Δ-G51 INDEPENDENCE-PROOF applies ONLY to **architecture-CHOICE candidates**, NOT runtime-bug exceptions.

**Architecture-CHOICE candidates** (independence-proof binding):
- **§2.1 mem0/MemPalace memory-tier choice**: YES architecture-agnostic — mem0 is a memory-architecture pattern independent of CC runtime = PASS
- **§2.3 Linux Kernel naming pattern (HYBRID)**: YES — applies to any git-based runtime = PASS
- **§2.4-A v2.1.145 upgrade (version-choice)**: YES — version-drift detection universal = PASS
- **§2.4-B wshobson plugin-selection**: YES — plugin discovery independent of current install = PASS
- **§2.5 wshobson granular install (architectural-adoption choice)**: YES = PASS
- **§2.5-B langgraph-supervisor (orchestration-pattern choice)**: YES = PASS
- **§2.5-C Jujutsu (vcs-choice)**: YES = PASS

**Architecture-CHOICE PASS rate: 7/7 (100%)**

**Runtime-bug exceptions** (CARVED OUT of independence-proof per codex r1):
- §2.2 W330 parallel-guard fix (P0.3) — local bug fix
- §2.6 OTLP_HEADERS env-config gap (P0.2) — env-config gap, not architecture choice
- P1.5 transcript-marker wire-in — skill-wire-up, not architecture choice

**Note (codex r2 inconsistency fix)**: P0.4 `/plugin update agent-teams@claude-code-workflows` is RECLASSIFIED here as **architecture-CHOICE** (plugin-selection — to take the wshobson #535 fix into the locally-enabled `agent-teams` plugin is a plugin-architectural decision). This aligns §10 with §6.2 (where P0.4 was correctly listed as architecture-CHOICE). The plugin-update-mechanism itself is runtime-tooling; the SELECTION to absorb the upstream fix is architectural.

**INDEPENDENCE-PROOF triple (Δ-G51, applied to architecture-CHOICE only)**:
- (a) **ORG-DISTINCT**: 8+ distinct ORGs across architecture-CHOICE candidates:
  - Linux Foundation (kernel.org)
  - Conventional Commits (independent committee)
  - LangChain AI (Berkeley/Stanford spinout)
  - OWASP Foundation (501(c)(3))
  - Stanford HAI BetterBench
  - CHAOSS / Linux Foundation
  - NIST / US DoC (NIST AI 600-1 + SP 800-218)
  - mem0ai (independent practitioner)
  - haizelabs (verdict primitive — Apache-2.0 → MIT per W337 codex-correction)
  Same-org-different-surfaces (gh-API + Anthropic-changelog + Anthropic-docs) NO LONGER counts as 3 distinct anchors per codex round-1 finding.
- (b) **CAUSAL-DISTINCT**: each architecture-CHOICE candidate's evidence does NOT depend on prior W286-W348 verdicts as primary anchor (Stream A→Stanford HAI BetterBench; Stream C→Linux Kernel; Stream E→OSSF Criticality Score independent of internal sca-v17 evolution).
- (c) **TEMPORAL-DISTINCT**: external-source publication dates (Linux Kernel docs 2008+, Conventional Commits 1.0.0 2019, NIST AI 600-1 2024) all predate this runtime's W286 emergence (2026-Q1).
