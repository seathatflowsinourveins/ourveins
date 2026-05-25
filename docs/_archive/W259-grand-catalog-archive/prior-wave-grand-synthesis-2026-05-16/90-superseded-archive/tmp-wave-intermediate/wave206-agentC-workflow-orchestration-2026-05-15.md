# W206 Agent C — Layer workflow + orchestration + automation checklist (zero-bias)

**Scope**: ACTIVATION-AND-USAGE checklist for advanced automation workflow on fresh `Z:\claude-sota-pure` setup. Consumes install matrix from Agent B (NOT another install matrix).
**Date**: 2026-05-15
**Cite-class**: TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE. Constituents: TIER-1-DIRECT Anthropic CC docs + CCBP @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd + Karpathy named-T1 + superpowers/mattpocock/addy named-T1 + TIER-3 sibling rule cite-import-AMBER per CR-12 TERTIARY.

---

## Pillar 1 — Cross-model consensus T1-T7 lifecycle

**Authority**: `Z:/claude-sota/.claude/rules/cmc-t1-t7-lifecycle.md` + `cmc-verdict-shapes.md` + `cmc-env-funneled-disclosure.md` (cite-import-AMBER).

| Touchpoint | When fires | Profile | Timeout | Hook script | Verdict integration |
|---|---|---|---|---|---|
| **T0** (PROPOSED-PILOT) | R1→R2 boundary in sota-researcher; cost-gated only | `deep-review` | 240s | manual operator foreground+tee | APPROVE-LIST / REVISE-LIST / REJECT-LIST |
| **T1** pre-edit | BEFORE Edit/Write on design surface | `deep-review-exec` | 240s narrow / 480s deep / 900s xhigh | `codex_t1_consult_gate.py` PreToolUse `Edit|Write|MultiEdit` | APPROVE→ship / NEEDS-REVISION→Pattern A apply / REJECT→STOP |
| **T2** working-tree | BEFORE `git commit` multi-file | default (no `-p` on `codex exec review`) | 120s | `codex_t2_pre_commit_gate.py` PreToolUse `Bash(git commit *)` STRICT+FAIL_CLOSED | Sync block via `permissionDecision:"deny"` on REJECT |
| **T3** post-commit | AFTER commit lands | `deep-review-exec` | 180s | `codex_postcommit_review.py` PostToolUse async 30s | Audit trail at `.claude/state/codex_review_HEAD_<sha8>.txt` |
| **T4** post-push | AFTER push completes | `deep-review-exec` | 180s | `codex_prepush_review.py` PostToolUse async 30s | Cumulative observability + queued fix-forward |
| **T5** plan-stage | DURING `/plan-codex-review` slash command | `deep-review` | 240s | manual operator-side | Read-only sandbox suffices |
| **T6** stop-gate | AT session-end dirty tree | `deep-review-exec` | 900s | `codex_stop_review_gate.py` Stop slot [2] sync | Block via `decision:"block"` |
| **T7** ask-without-act | AT session-end pre-T6 | regex+heuristic 5s | `auto_proceed_gate.py` Stop slot [0] sync | One-shot latch at `.claude/state/auto_proceed_gate_latch.json` |

**Activation checklist (per session)**:
- [ ] T1 hook installed + `CODEX_T1_GATE_STRICT=1` in env (WARN otherwise)
- [ ] T2 hook installed + `CODEX_T2_GATE_STRICT=1` + `CODEX_T2_GATE_FAIL_CLOSED=1`
- [ ] T3/T4 PostToolUse hooks installed (async observers; never block)
- [ ] T6+T7 Stop hooks installed (T7 cheap-first slot [0] BEFORE T6 slot [2])
- [ ] `.codex/config.toml` carries 3 profiles: `deep-review-exec` / `deep-review` / `t2-exec`

**STAND-IN-NOTICE contract (env-funneling defense)**:
- If `CLAUDE_CODE_SUBAGENT_MODEL` env funnels gpt5-reviewer/gpt5-archaeologist/codex-rescue to Sonnet-only: agent MUST return `STAND-IN-NOTICE: agent ran under CLAUDE_CODE_SUBAGENT_MODEL=<model>; cross-model gate NOT structurally satisfied`
- Orchestrator MUST classify each dispatch: {true-GPT-5.5-via-codex-CLI / Sonnet-stand-in-via-SDK / codex-rescue-wrapper / unknown-FM-19-truncated}
- Reject blanket "N% GPT-5.5" claims without per-dispatch classification (Wave 17 E2 empirical: claimed 75%, measured ~25%)

**Path P codex CLI foreground+tee recovery (FM-17.d/e/f/g + FM-22 BRIDGE-MODE-refuse)**:
```bash
timeout 300 codex exec --skip-git-repo-check --color never -p deep-review-exec \
  < .claude/state/codex_consult_<topic>.txt \
  2>&1 | tee .claude/state/codex_consult_<topic>_OUT.txt
```
Use when: (a) subagent BRIDGE-MODE wrapper stalls at 600s stream-watchdog, (b) autocompact-thrash in subagent, (c) 1M-context billing-class blocker, (d) codex-readonly policy refuse, (e) wrapper "Prompt is too long" input-buffer limit.

---

## Pillar 2 — Parallel session worktree-isolation

**Authority**: CCBP `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-boris-6-tips-16-apr-26.md:93-109 @ HEAD 48f2ceb` (Boris Cherny named-T1) + sibling `parallel-session-worktree-isolation.md` (cite-import-AMBER).

**MANDATORY when ≥2 concurrent `claude` sessions on shared checkout** — n=1 race instance 2026-04-27 cost ~30 min forensic reconstruction; Axis-1 4-org convergence (Anthropic + jj-vcs + OpenAI codex CLI + libgit2).

### Outer-CLI layer (eee launcher)
- [ ] `eee --worktree` OR `eee -w` for each session (creates `.claude/worktrees/<name>/` auto-gitignored)
- [ ] `tools/eee.ps1` forwards `--worktree`/`-w` flags through to `claude.exe`
- [ ] `.gitignore` includes `.claude/worktrees/` (line 172 of sibling .gitignore)

### Inner-agent layer
- [ ] All write-capable agent frontmatter declares `isolation: worktree`
- [ ] Verify: `^isolation:` grep across `.claude/agents/*.md` returns 8/8 (or N/N)
- [ ] Read-only research probe agents EXEMPT per CR-9 read-only research probe exception

### FM-02 sub-class recovery patterns
- **(a) T2-review contamination**: narrow `git add -- <my-file>` BEFORE T2 fires
- **(b) Staging-index race**: narrow `git commit --only -- <pathspec>` form
- **(c) Commit-layer absorption**: accept absorption; supplementary memory + audit-trail correction (do NOT rewrite history per port-note-discipline §6)
- **Single-shell atomic**: `git add <f> && git commit -o <f> -F <msg>` per audit-action-loop step 4 atomic-batch
- **Long-term**: full filesystem isolation via Layer 0 `eee --worktree`

---

## Pillar 3 — Advanced agent team standing-directive (8-invariant pre-flight)

**Authority**: `.claude/rules/advanced-agent-team-standing-directive.md` (cite-import-AMBER Wave 24-D OWNED n=3 user-trigger).

**Trigger scope**: every non-trivial fire (architecture audit / SOTA convergence / token-eff investigation / cross-model verification / gap-resolution wave). Output fires only — rule-edit fires gated by T1/T2/T3 alone.

### 8-invariant pre-flight checklist
- [ ] **(1) BRIDGE-MODE ≥2 agents** — codex-rescue + gpt5-reviewer + gpt5-archaeologist; Sonnet wrapper invoking real GPT-5.5 via `codex exec` subprocess
- [ ] **(1a) Per-call codex time-budget** — default 90s / normal cap 120s / 180s with explicit reason; FM-17.d defense
- [ ] **(2) File:line cites in brief** — every claim: `Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA>` OR `code.claude.com/docs/...` OR `mcp__github__get_file_contents`
- [ ] **(3) Line-by-line SOTA repo audit** — agents Read candidate repo's relevant `<file>` end-to-end (NOT skim README); Probe DAG 1-7 per `ahfv-probe-dag.md`
- [ ] **(4) Anthropic CC docs TIER-1** — `code.claude.com/docs/en/*` is authority; CCBP HEAD-pinned is TIER-2 reinforcement
- [ ] **(5) ARTIFACT-INLINE per FM-19** — Bash-only/no-Write agents (architect/gpt5-reviewer/gpt5-archaeologist/code-reviewer) embed `## ARTIFACT-INLINE: tmp/wave<N>-<agent>-<topic>-<date>.md` in final return
- [ ] **(6) Mia pre-apply** — every prescription with `prescribed_edits`/specific file:line gets cheap-probe verification BEFORE Edit (n=29 base rate: 28/29 broad-fan-out OVER)
- [ ] **(7) Forward-only persistence** — `tmp/wave<N>-<agent>-<topic>-<date>.md` convention; orchestrator-side `mv` to canonical path; reference memory for cross-arc
- [ ] **(8) OUTPUT_BUDGET + TERMINATION** — every brief: `OUTPUT_BUDGET: <max LOC>` + `TERMINATION: on_handoff_to: orchestrator | max_turns: N | terminationCondition: <predicates>`

### CADP concurrency cap
- [ ] Pre-dispatch fleet probe `python Z:/claude/ccc/tools/status.py | head -40` shows ≥3 accounts <50%
- [ ] If cache <50%: max-3 concurrent dispatch only
- [ ] If cache ≥50% verified: max-5 cumulative per session-arc
- [ ] If neither: STOP, wait for resets, OR Sonnet fallback per CLAUDE.local.md ENV (g) deprecated

### Spawn template (paste into orchestrator turn)
Reference: `advanced-agent-team-standing-directive.md §How to apply` 5-agent template (A/B/C/D/E) with OUTPUT_BUDGET + TERMINATION + ARTIFACT-INLINE mandate.

---

## Pillar 4 — Research-first-then-install workflow

**Authority**: `CLAUDE.md` cardinal-rule-10 + `Z:/claude-sota/.claude/rules/research-protocol.md` (cite-import-AMBER).

### sota-researcher subagent invocation pattern
**Multi-source ≥4 mandate** per Axis-1 ≥3-distinct-orgs:
- [ ] `mcp__github__search_repositories` / `search_code` / `get_file_contents` (TIER-1 upstream)
- [ ] `mcp__exa__web_search_exa` (if enabled; route to perplexity/firecrawl per FM-16 if disabled)
- [ ] `mcp__deepwiki__ask_question` / `read_wiki_contents` (AI-generated wiki Q&A)
- [ ] `mcp__perplexity__perplexity_search` (recency-filtered named-T2 endorsements)
- [ ] `mcp__context7__resolve-library-id` + `query-docs` (official docs)
- [ ] `mcp__repomix__pack_codebase` + `grep_repomix_output` (cross-file pattern scan)
- [ ] `mcp__firecrawl__firecrawl_scrape` / `firecrawl_search` (JS-rendered + paywall)
- [ ] `mcp__plugin_context-mode_context-mode__ctx_batch_execute` (PRIMARY token-savings; ~98% reduction vs raw Read/Bash)

### 6-Probe-DAG harness-fit (per `ahfv-probe-dag.md`)
1. **Probe 1 count-OVER** — verify claimed deltas via `git log` / `wc -l` / `Glob | wc -l`
2. **Probe 2 SDK-vs-CLI surface** — does claude-sota use SDK or CLI? does candidate map to actual mode?
3. **Probe 3 architectural-API** — Anthropic-API vs OpenAI-API vs vendor-neutral; codex hooks talk to OpenAI-API
4. **Probe 4 plugin-namespace** — check `<plugin>:<artifact>` exposure FIRST (kiss-dry-yagni Must-Never #4)
5. **Probe 5 mode-harness-shape** — HARD-GATE incompat with autonomous /loop? sister-skill assumption?
6. **Probe 6 direct-file/registry blockers** — LICENSE permissive? README archived/deprecated? npm/PyPI package exists?
7. **Probe 7 demand-gate split** — 7.a DEMAND-ABSENCE→REJECT / 7.b DEMAND-CREATES-NEW-WORKFLOW→STUDY-PILOT 5-clause

### Convergence-gate Axis-1+2+3 + STRONG-PROVENANCE-EXPRESS
- [ ] **Axis-1**: ≥3 distinct orgs/repos/papers implementing the pattern
- [ ] **Axis-2**: ≥2 named T2 practitioners with dated artifact (URL + date)
- [ ] **Axis-3**: ≥90 days stability from first public artifact OR STRONG-PROVENANCE-EXPRESS (age≥30d + official-org maintainer + named-T2/org-equivalent endorsement)

### Remediation priority (cardinal-rule-10)
- (a) **Install canonical SOTA solution** — research surfaces upstream repo (e.g. FM-17.d→install `fm17d_stall_detector.py`)
- (b) **Cite-adapt SOTA pattern** — adapt with file:line cite anchor per CR-8
- (c) **Best SOTA-recommended approach** — operator picks with explicit Axis-1+2+3 verdict
- (d) **HONEST-NON-FINDING** — classify as GENUINE-GAP per `synthesis-layer-verify.md §Reporting categories`, document in `docs/install-provenance.md`

---

## Pillar 5 — SOTA 9-cohort discovery menu

**Authority**: `CLAUDE.md` §SOTA Repository Discovery L99-110 + `multi-source-discovery-breadth-discipline.md`.

| Cohort | Source | When to apply |
|---|---|---|
| **C1** GraphQL star+topic | `mcp__github__search_repositories sort=stars topic:<tag>` | Tooling-axis fan-out |
| **C2** arxiv citation graph | `mcp__arxiv__search_papers` + benchmark-cite cascade | Benchmark-anchored research |
| **C3** HuggingFace | models + datasets via API | ML/embedding/eval research |
| **C4** PapersWithCode | benchmark leaderboards | SOTA-by-measured-metric |
| **C5** named-author | blog/talk/tweet/conference | Practitioner endorsement (Axis-2) |
| **C6** awesome-list | curated catalogs (awesome-python / awesome-claude-code) | Ecosystem inventory |
| **C7** conference proceedings | ACL / NeurIPS / ICML / Anthropic blog | Peer-reviewed authority |
| **C8** trending feeds | GitHub trending + HN + Reddit | Emerging-pattern discovery |
| **C9** stars-sorted-direct | `mcp__github__search_repositories sort=stars order=desc` (NO topic filter) | Star-popular-but-topic-untagged recall (Ship #233 user-trigger 2026-05-02) |

### ≥2-cohort fan-out mandate
- [ ] Every adoption verdict cites ≥2 distinct cohorts (forward-only commit-body convention)
- [ ] Form A: `cohorts: [C1, C3, C6]` OR Form B: `cohort-coverage: C1+C3+C6`
- [ ] Audit hook `cohort_coverage_audit.py` PostToolUse `Bash(git commit *)` emits:
  - **DRIFT_SINGLE_COHORT** (P1) — only 1 cohort in commit body
  - **DRIFT_NO_COHORT_TAG** (P2 scope-aware) — adoption verdict without cohort cite
  - **DRIFT_TRENDING_ONLY** (P3 advisory) — only C8 trending feed (low-signal)
  - **WARN_NO_COHORT_TAG_KEYWORD_ONLY** (P3 telemetry) — subject-keyword-only fires

---

## Pillar 6 — Karpathy §5 Wiki Compounding Surface (3-layer)

**Authority**: `Z:/claude-sota-installed/.claude/rules/karpathy-adapted.md` §5 + named-T1 Karpathy quote "You can outsource your thinking but you can't outsource your understanding" (AI Engineer fireside 2026-05-02).

### Layer activation checklist
| Karpathy Layer | claude-sota artifact | Activation |
|---|---|---|
| **L1 — Chronological log** (raw entries by date) | `.claude/state/*.jsonl` audit trails | `codex_review_HEAD_*.jsonl` + `codex_consult_*_OUT.txt` + `mcp_health.jsonl` + `mcp_overhead_audit.jsonl` + `subagent_transcripts.jsonl` + 8 other audit JSONLs |
| **L2 — Index** (organized lookup) | `MEMORY.md` topic index (≤200 lines per Karpathy §5; one-line pointers ≤150 chars) | Always-loaded per CCBP `claude-memory.md:34-40 @ HEAD f8468e87` Ancestor loading |
| **L3 — Compiled wiki** (LLM-summarized synthesis) | `tmp/wave<N>-close-synthesis-*.md` + `docs/*.md` rule-layer + per-topic `memory/*.md` | Last-3 close-synthesis window per `sessionstart-preload-discipline.md` §The contract step 2 |

### Per-iter close required surfaces
- [ ] **L1 Telemetry JSONL** (MANDATORY) — Wave entry to `.claude/state/loop_*.jsonl` AND `.claude/state/compounding_learning.jsonl` (FORWARD-REF in install runtime)
- [ ] **L3 Wiki Run Log** (MANDATORY) — `docs/karpathy-llm-wiki-practice.md` entry with phase/iter/score/findings
- [ ] **Feedback memory** (CONDITIONAL — per codification-threshold gate): write ONLY when (a) user-trigger explicit, (b) expected savings ≥10 min/mo + LOC ≤200, (c) n=2 same-pattern recurrence, OR (d) T3/T7/T8 explicit prescription
- [ ] Otherwise record `secondary_surface: none_this_iter` + reason in JSONL/wiki

### Source-of-truth hierarchy when surfaces disagree
- Shipped artifacts → git commit/diff/test wins
- Elapsed budget + iter metrics → telemetry JSONL wins
- Rationale/lesson → wiki narrative wins
- Recurrence policy → feedback/rule memory wins (after gate)
- Volatile external facts → re-probe

---

## Pillar 7 — Pattern A/B/C/D fix-forward + closed-loop

**Authority**: `Z:/claude-sota-installed/.claude/rules/codex-t1-fix-forward-pattern.md` + `closed-loop-recursive-narrowing.md`.

### Verdict-shape decision tree
```
codex T1/T2/T3 returns:
├── JSON verdict found (Pattern A path)
│   ├── APPROVE conf ≥0.90 → ship as-proposed
│   ├── NEEDS-REVISION conf 0.88-0.93 + ≤10 prescribed_edits → Pattern A
│   │   └── Apply ALL prescriptions in SINGLE atomic commit per cycle-300
│   │       (NO iter-N→N.1→N.2 — that's cycle-539 layered-correction anti-pattern)
│   ├── NEEDS-REVISION conf <0.85 → escalate to user OR refire narrowed
│   └── REJECT → STOP, do not commit; remove untracked; escalate
└── NO JSON verdict (Pattern B path)
    ├── Timeout-without-verdict → trace-mine for line-cited evidence
    ├── Ship per prior-fire research + standing-directive defaults
    └── T3 post-commit verifies cross-model gate at commit time
```

### Pattern C — T2 verifier-precision
- [ ] T2 close-the-loop prompt MUST include EXACT runtime invocation
- [ ] `LIVE SMOKE PRE-COMMIT: $ <exact subcommand + flags + cwd-context>` block
- [ ] `VERIFIER MUST USE THIS EXACT INVOCATION` mandate (n=2 iter-37/38 evidence)

### Pattern D — DEFAULT-profile foreground+tee recovery
- [ ] When Pattern B HNF surfaces (zero-investigation Pattern B variant): switch to DEFAULT codex profile
- [ ] 6-parameter Path P recipe:
  ```bash
  timeout 300 codex exec --skip-git-repo-check --color never \
    < .claude/state/codex_consult_<topic>.txt \
    2>&1 | tee .claude/state/codex_consult_<topic>_OUT.txt
  ```
- [ ] ≤50 LOC focused prompt + single-claim audit + JSON-at-EOF schema

### Outcome A/B/C disposition (closed-loop arc)
- [ ] **Outcome A — ACCEPT-WITH-DOC** (monotone confidence decline + severity-gate satisfied): low/medium severity OR concrete-verification probe passes; ship with doc-comment ACCEPT
- [ ] **Outcome B — REVERT-AND-REMOVE** (confidence escalates OR unresolved high/critical): remove surface; re-add later gated on proper fix
- [ ] **Outcome C — MANUAL-OVERRIDE** (operator accepts known high/critical risk): explicit `MANUAL-OVERRIDE` marker in patch + commit body; track as code-review-burn metric

### Stop criteria
- [ ] Round-5 ceiling (arcs not converged by round 5 over-investing)
- [ ] Confidence-trend reversal (declining→escalating on same concern)
- [ ] Cost asymmetry (next-fix vendored-drift exceeds value)

---

## Pillar 8 — FM-20 path-drift cascade + Mia pre-apply defense

**Authority**: `fm20-path-drift-cascade.md` (n=20 cumulative as of W199 2026-05-14) + `mia-pre-apply.md` (Wave 16 fire-7 OWNED).

### FM-20 sub-class catalog (≥20 rows; recognize signature)
- Stale CLAUDE.md cite (rows 1-6) — agent return / task-tracking / brief-implicit-assumption verbatim propagation
- Silent-dual-write (row 7) — claim landed but neither backend called
- Stale-belief INSTALL state (row 8) — /goal predicate carries stale "NOT-INSTALLED" / "INSTALLED" claim
- Asymmetric-dual-write (row 9) — partial-fabrication; ONE backend verified, other absent
- README-blob-pin drift (rows 10-13) — upstream README/LICENSE SHA propagated stale
- MEMORY-index-vs-artifact (row 14) — MEMORY.md L<N> sub-claim doesn't match artifact
- Compact-hook-chain re-inflation (row 15) — /compact reclaim ~13% vs SOTA 50-60%
- ENV-state-claim-survives-revert (row 16) — POST-REVERT residue
- Token-rotation-burned-by-probe (row 17) — RT rotation invalidated, response body discarded
- Dual-source-precedence-drift (row 18) — SIMULTANEOUS dual-declare with different values
- Junction-bypass-gitignore-via-aliasing (row 19) — Windows-junction TARGET vs PATH semantic
- Parallel-cron-absorption (row 20) — session-checkpoint cron sweeps staged files

### Mia pre-apply 4-clause cheap-probe matrix per claim type
| Subclaim type | Cheapest probe |
|---|---|
| **CATEGORY-CLAIM** ("X is wired" / "X is missing") | `Grep` / `Glob` / `ls -la` |
| **OPERATIONAL-CLAIM** (state-flip / hook-fire / git history) | `git log --grep` / actual `wc -l` / `Grep -c` |
| **UPSTREAM-CLAIM** (README content / repo metadata) | Re-WebFetch / `mcp__github__get_file_contents` |
| **SHAPE-CLAIM** (settings.json hook entry / .mcp.json server / JSONL payload) | `Grep` + schema-validate per `synthesis-layer-verify.md §Output-form verification modifier` |

### Mia pre-apply discipline (n=29 base rate; 28/29 broad-fan-out OVER)
- [ ] Decompose agent's "X+Y+Z" prescription into 3 independent claims
- [ ] Pick cheapest probe per sub-claim
- [ ] Verify EACH sub-claim
- [ ] Classify refuted → OVER → DROP from ship queue
- [ ] Apply ONLY verified-genuine prescriptions in single atomic Pattern A commit
- [ ] **ROI**: ~1-3s probe vs ~5-15min revert = ~100× per catch

### Alternate-install-path probe (Wave 112 Ship 2CC; n=36 ladder)
- [ ] `command -v <cli>` (PATH probe — NOT sufficient alone)
- [ ] `find .local/bin .cargo/bin ~/go/bin npm-global WinGet -name '<cli>*'` (alternate paths)
- [ ] `npm ls -g | grep -i <cli>` / `uv tool list` / `pipx list` / `winget list` / `brew list` (channel registries)
- [ ] ALL hits = pre-existing canonical → DROP install prescription per OVER classification

---

## Pillar 9 — Audit-action-loop discipline (Wire/Surface/Close/Re-fire)

**Authority**: `Z:/claude-sota/.claude/rules/audit-action-loop.md` (cite-import-AMBER).

### 12 active JSONL audit hooks (status table)
| Audit script | Status | Drift surface |
|---|---|---|
| `claude_md_count_audit.py` | ACTIVE PostToolUse Bash(git commit *) async 15s + SessionEnd async 30s | CLAUDE.md/CLAUDE.local.md count claims |
| `cite_drift_audit.py` | ACTIVE same wiring | settings.json line-drift |
| `mcp_self_audit.py` | ACTIVE same wiring | `.mcp.json` staleness |
| `mcp_overhead_audit.py` | ACTIVE same wiring | `.mcp.json` static config-cost overhead (~chars/4 token estimate) |
| `repo_cite_existence_audit.py` | ACTIVE same wiring | `Z:/repos/deps/` phantom citations |
| `cohort_coverage_audit.py` | ACTIVE PostToolUse Bash(git commit *) async 15s | 9-cohort discipline drift on adoption-verdict commits |
| `agent_frontmatter_audit.py` | ACTIVE SessionEnd async 30s | Agent frontmatter drift vs CCBP 16 docs fields + sss invariants |
| `tmp_md_inventory.py` | ACTIVE SessionEnd async 30s | `tmp/*.md` sprawl + frontmatter drift vs Wave 8 architect §2.4 spec |
| `tmp_promote_authoritative.py` | ACTIVE SessionEnd async 30s | AUTHORITATIVE-CANDIDATE promotion advisory |
| `process_hygiene_audit.py` | ACTIVE SessionEnd async 30s | Subprocess hygiene (orphan codex.exe; claude.exe EXCLUDED) |
| `vendor_pin_audit.py` | FORWARD-REF (P3 hooks port) | `.upstream-vendor.sha256` manifest drift |
| `sota_freshness_sweep.py` | FORWARD-REF/NOT-INSTALLED | model-SHA pins / ollama / tools / MCP inventory / plugin VERSIONs / cited-dep HEADs |

### 4-stage Wire → Surface → Close → Re-fire
- [ ] **Wire**: hook configured on commit/event matcher
- [ ] **Surface**: JSONL accumulates `any_drift: true` records
- [ ] **Close**: /loop fire ships surgical edit + provenance line (SHA + cycle)
- [ ] **Re-fire**: next audit produces `any_drift: false` confirming closure

### Hook telemetry contract (agent_id/agent_type propagation)
- [ ] Every JSONL-emitting hook persists `agent_id` + `agent_type` at top-level per Anthropic SDK `_SubagentContextMixin` at `Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/types.py:246-262 @ b512f256`
- [ ] Read hook stdin at top-level: `payload.get("agent_id")` + `payload.get("agent_type")`
- [ ] Mandatory collision boundary (Round-2 fix-forward): atomic temp-rename OR filename-namespace OR lockfile+O_CREAT|O_APPEND atomic-write with `0o600` mode
- [ ] Use `_atomic_jsonl_append.py` shared module for SHARED JSONL append targets

---

## Pillar 10 — 5-backend persist + STOP gate

**Authority**: `sessionstart-preload-discipline.md` §The contract step 4 + W198 round-1 5-backend hash chain verification.

### Per-fire 5-backend persist checklist
- [ ] **mcp-memory**: `mcp__memory__memory_store` with content-hash; verify via `memory_search` recall
- [ ] **graphiti episode**: `mcp__graphiti__add_memory group_id=eee` ; verify via `get_episodes(group_id="eee", last_n=3)`
- [ ] **tmp/wave artifact**: `tmp/wave<N>-<topic>-<date>.md` exists + mtime fresh
- [ ] **MEMORY.md L2 entry**: one-line topic pointer (≤150 chars) under §Active wave block
- [ ] **provenance row**: `docs/install-provenance.md` row with wave/fire/SHA

### STOP gate evaluation (4-of-5 PASS = STOP-eligible)
- [ ] Count PASS surfaces (verify hashes match commit-body claims)
- [ ] If ≥4/5 PASS → STOP eligible at /goal STOP gate
- [ ] If <4/5 PASS → emit STALE-PRELOAD-NOTICE per `cross-model-consensus.md §Env-funneled` Option 2 disclosure shape
- [ ] Operator decides: (a) proceed with degraded continuity + queue Layer-N rebuild, (b) STOP + investigate FM-20 fabricated-claim sub-class, (c) abandon resume + start fresh

### Session-resume 3-layer preload (BEFORE first user-facing turn)
- [ ] **L2 index preload** — Read `MEMORY.md` (≤200 lines; archive if violated)
- [ ] **L3 compiled wiki preload** — `Glob tmp/wave*close-synthesis*.md | sort -r | head -3`
- [ ] **L1 chronological verify** — `tail -3 .claude/state/codex_review_HEAD_*.jsonl` + `subagent_transcripts.jsonl` + `mcp_health.jsonl`
- [ ] **5-backend hash verify** — Mia-probe all 5 surfaces; emit STALE-PRELOAD-NOTICE on mismatch

---

## Pillar 11 — Auto-compact 4-layer discipline

**Authority**: `auto-compact-discipline.md` Rank #1-#3.5 + Thariq named-T2 quote "model at its least intelligent point when compacting".

### Pre-emptive /compact cadence (Rank #3 SOTA save→compact→restore loop)
- [ ] **CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70** in CLAUDE.local.md ENV (i) — autocompact fires at ~700k of 1M ceiling
- [ ] **CONTEXT_WINDOW_COMPACT_WARN_TOKENS=600000** ENV (j) — 60% on 1M
- [ ] **CONTEXT_WINDOW_COMPACT_HIGH_TOKENS=650000** ENV (j) — 65% rot-zone progression
- [ ] **CONTEXT_WINDOW_COMPACT_CRIT_TOKENS=700000** ENV (j) — 70% CRIT threshold (preserves buffer before autocompact)
- [ ] **Required invariant**: CRIT_tokens < autocompact_pct × context_window_size

### PreCompact hook stack (Rank #3.5 — 4-layer incumbent)
| Layer | Plugin | Surface | Event | LOC |
|---|---|---|---|---|
| Prompt-augmentation | fcakyon/intelligent-compact | 6-section priority A-F | PreCompact | 71 |
| State-save audit | ECC pre-compact | `compaction-log.txt` timestamp | PreCompact | 48 |
| Session-event SQLite | context-mode `precompact.mjs` | <2KB XML resume-snapshot | PreCompact | 76 |
| Tool-call threshold | ECC suggest-compact | `/compact` suggestion at N=50 + every 25 | PreToolUse Edit\|Write | 80 |
| Compact-remind risk | `precompact_hint_emitter.py` + `sessionstart_compact_hint_reader.py` + `posttooluse_context_monitor.js` | advisory `additionalContext` around compact boundaries | PreCompact + SessionStart(compact) + PostToolUse | W192 |

**CRITICAL**: per CC v2.1.105+ PreCompact `{"decision":"block"}` BLOCKS compaction — reserve for hard-block scenarios. ALL 4 layers above exit 0 / advisory-only.

### Operational compact discipline
- [ ] Spot-check `/context` (CC built-in) approaching threshold
- [ ] Pre-emptive `/compact <focused hint>` BEFORE autocompact fires
  ```
  /compact focus on Bundle ship cumulative state and active queue, drop verbose codex T1 verdict bodies
  ```
- [ ] If degraded summary: REWIND per `coordination.md §12 Thariq` instead of layering corrections
- [ ] Karpathy §5 L1+L2+L3 survives compact via persisted artifacts (PERSIST step BEFORE /compact)

### 3-step PERSIST→COMPACT→RESTORE loop
1. **PERSIST** — write to mcp-memory `memory_store` + graphiti `add_memory group=eee` + bridge artifact `.claude/state/compact_hint.json` (8 required fields per `compact_hint.v1.json`)
2. **SELF-/COMPACT** — agent invokes `/compact <focused hint>`
3. **RESTORE** — SessionStart reader (`sessionstart_compact_hint_reader.py`) auto-injects compact_hint.json (≤300s) as `additionalContext`; agent cite-adapts `/context-save` + `/context-restore` (wshobson MIT)

---

## Pillar 12 — Skill orchestration 4-skill meta-stack

**Authority**: `skill-orchestration-discipline.md` + Anthropic CC native discovery `https://code.claude.com/docs/en/skills`.

### 4 meta-skills active (auto-fire per description-match)
| # | Meta-skill | Source plugin | Role |
|---|---|---|---|
| 1 | `using-superpowers` | superpowers@claude-plugins-official | 1% rule + Skill Priority (Process first / Implementation second) + Red Flags |
| 2 | `using-agent-skills` | agent-skills@addy-agent-skills | Discovery + invocation for 21 engineering-phase skills (Addy Osmani named-T1) |
| 3 | `skill-comply` | everything-claude-code | Post-invocation verification skill checklist completion |
| 4 | `skill-creator` | skill-creator@claude-plugins-official | Anthropic OFFICIAL authoring loop (draft→eval→iterate→benchmark→optimize description) |

### Invocation discipline
- [ ] **Main thread**: invoke ANY skill with ≥1% chance of applying BEFORE response/action; skill check BEFORE clarifying questions
- [ ] **Announce**: "Using [skill] to [purpose]" before each invocation per superpowers digraph
- [ ] **Subagents**: brief includes skill-awareness; frontmatter `skills:` preload for role-specific (e.g., sota-researcher → `deep-research` + `research-ops` + `iterative-retrieval`; code-reviewer → `silent-failure-hunter` + `requesting-code-review`)
- [ ] **Multi-skill chains** (workflow grammar L7): brainstorming → writing-plans → subagent-driven-development → test-driven-development → requesting-code-review → finishing-a-development-branch
- [ ] **Multi-skill layers** (parallel): `feature-dev` + `incremental-implementation` + `tdd` + `safety-guard` + `verification-before-completion`

### Default skill catalog by domain
- Workflow grammar: superpowers (12 skills)
- Engineering phases: addy-agent-skills (21 skills)
- ECC autonomous-loop: everything-claude-code (16+ skills)
- Plugin/skill authoring: skill-creator / plugin-dev / agent-sdk-dev
- Cross-model + verification: verification-before-completion / requesting-code-review / pr-review-toolkit
- Frontend/visual: frontend-design / playground / browser-testing-with-devtools

---

## Activation-and-usage daily checklist (consolidated)

### Session-start probe set (every `claude -c` / fresh `claude` / Stop re-fire / /loop tick)
- [ ] Read `MEMORY.md` (verify ≤200 lines)
- [ ] `Glob tmp/wave*close-synthesis*.md | sort -r | head -3` + Read each
- [ ] `tail -3 .claude/state/codex_review_HEAD_*.jsonl` + `subagent_transcripts.jsonl` + `mcp_health.jsonl`
- [ ] 5-backend hash verify (mcp-memory + graphiti + provenance + tmp/ + JSONL)
- [ ] Emit STALE-PRELOAD-NOTICE if ANY refutes; operator decides proceed/STOP/abandon
- [ ] `python Z:/claude/ccc/tools/status.py | head -40` fleet probe IF planning agent fan-out
- [ ] Verify `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` + CONTEXT_WINDOW_COMPACT_*_TOKENS ENV (j) sourced

### Pre-design-edit T1 fire (every Edit/Write on design surface)
- [ ] Compose consult prompt at `.claude/state/codex_consult_<topic>.txt` (canonical pair-basename)
- [ ] Fire `codex_t1_consult_gate.py` via PreToolUse `Edit|Write|MultiEdit` matcher
- [ ] OR manual: `timeout 300 codex exec --skip-git-repo-check --color never -p deep-review-exec < prompt 2>&1 | tee out`
- [ ] Read verdict EOF first (`wc -l` + `tail -200` + `grep -nE "VERDICT:|^F-[0-9]|conf="`)
- [ ] Pattern A (NEEDS-REVISION 0.88-0.93): apply ALL prescriptions in single atomic commit
- [ ] Pattern B (timeout-no-JSON): trace-mine + ship + T3 verify
- [ ] Mia pre-apply 4-clause verify on prescriptions BEFORE Edit (decompose → probe → drop OVER → apply VERIFIED-GENUINE)

### Pre-commit T2 fire (multi-file changes)
- [ ] T2 hook fires automatically via PreToolUse `Bash(git commit *)` matcher (STRICT+FAIL_CLOSED)
- [ ] If STRICT off: manual `codex exec review --uncommitted` per `cmc-t1-t7-lifecycle.md §The contract` step 5
- [ ] Verifier-precision Pattern C: cite EXACT runtime invocation in close-loop prompt
- [ ] FM-02 staging-race defense: `git add -- <my-file> && git commit -o <my-file> -F <msg>` atomic chain

### Post-commit T3 audit (every commit)
- [ ] PostToolUse `Bash(git commit *)` fires `codex_postcommit_review.py` async 30s
- [ ] Verdict lands at `.claude/state/codex_review_HEAD_<sha8>.txt`
- [ ] Audit hooks fire: claude_md_count + cite_drift + mcp_self + repo_cite_existence + cohort_coverage + mcp_overhead
- [ ] Cite verdict file in next commit body if revised: `T3 NEEDS-REVISION conf=X [VERIFIED via <path>]`

### Pre-stop T6 + T7 audit (session-end)
- [ ] T7 fires first (slot [0]) — `auto_proceed_gate.py` regex+heuristic 5s
- [ ] T6 fires after T7 passes (slot [2]) — `codex_stop_review_gate.py` deep-review-exec 900s
- [ ] Dirty-tree commit-class edits trigger T6 deep review
- [ ] Verdict lands at `.claude/state/codex_stop_review_gate.jsonl`

### Iter-close 5-backend persist
- [ ] **mcp-memory** `memory_store` with content-hash + verify via `memory_search`
- [ ] **graphiti episode** `add_memory group_id=eee` + verify via `get_episodes`
- [ ] **tmp/wave artifact** `tmp/wave<N>-<topic>-<date>.md` written + mtime fresh
- [ ] **MEMORY.md L2 entry** one-line topic pointer ≤150 chars
- [ ] **provenance row** `docs/install-provenance.md` wave/fire/SHA row
- [ ] STOP gate: ≥4/5 PASS = STOP-eligible; <4/5 = STALE-PRELOAD-NOTICE
- [ ] Wiki Run Log entry to `docs/karpathy-llm-wiki-practice.md` (Karpathy §5 L3)
- [ ] L1 Telemetry JSONL append to `.claude/state/loop_*.jsonl` + `compounding_learning.jsonl`
- [ ] Feedback memory CONDITIONAL per codification-threshold gates (a/b/c/d); otherwise record `secondary_surface: none_this_iter`

### Pre-fan-out 8-invariant pre-flight (every non-trivial fire)
- [ ] BRIDGE-MODE ≥2 agents (codex-rescue / gpt5-reviewer / gpt5-archaeologist)
- [ ] Per-call codex 90s/120s/180s budget in brief
- [ ] File:line cites at every claim
- [ ] Line-by-line SOTA repo audit (Probe DAG 1-7) for adoption-class
- [ ] Anthropic CC docs TIER-1 cite + CCBP HEAD-pinned TIER-2
- [ ] ARTIFACT-INLINE mandate in brief (Bash-only/no-Write classes)
- [ ] Mia pre-apply codified in brief
- [ ] Forward-only persistence convention `tmp/wave<N>-<agent>-<topic>-<date>.md`
- [ ] OUTPUT_BUDGET + TERMINATION in brief (typical 400-600 LOC + on_handoff_to + max_turns + terminationCondition)
- [ ] CADP fleet probe (max-3 concurrent until cache ≥50% verified)

---

ARTIFACT-INLINE: tmp/wave206-agentC-workflow-orchestration-2026-05-15.md
