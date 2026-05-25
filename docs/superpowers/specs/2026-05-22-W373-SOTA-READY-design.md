# W373-SOTA-READY — Runtime Audit + SOTA-Readiness for W374-EXT — Design Spec

> **Wave name:** W373-SOTA-READY
> **Date:** 2026-05-22
> **Brainstorming source:** this conversation (skill `superpowers:brainstorming` invoked 2026-05-22)
> **Author:** Claude Code Opus 4.7 (operator-confirmed Approach A++ "full resolution, max quality advanced workflow pipeline")
> **Status:** DESIGN — awaiting operator review before `writing-plans` skill invocation
> **Blocks:** W374-EXT Tasks 7-9 execution (CoVe verifier · pre-L3 test gate · Jury-on-Demand)

---

## Goal

Land catalog-grade SOTA-readiness audit + remediation in **one wave** so that W374-EXT Tasks 7-9 can ship against a runtime with **zero known hidden errors, zero stale references, zero unresolved fallbacks, and zero silent-low-quality install drift**. Engage every quality primitive this runtime already ships (parallel agent-team dispatch · codex dual-position review · 3-judge jury · 4-suite eval lane · sca-v18 rubric · CoVe-factored verification).

## Tech Stack

- **Languages:** PowerShell 7 / Bash (Git Bash) / Node 22 / Python 3.13 venv `Z:/venvs/claude/`
- **Runtime primitives:** Claude Code 2.1.144+ · 16 MCPs in `.mcp.json` · 47 enabled plugins · 63 local skills · pre-commit gates (gitleaks v8.30.1 + ruff v0.15.12 + actionlint v1.7.12 + commitlint + 7 in-tree gates)
- **External tools:** `codex exec` (Path P foreground+tee) · `perplexity_research` (sonar-deep-research) · `exa.web_search_exa` · `firecrawl.firecrawl_search` · `hf-mcp-server.hub_repo_search` · `harness/eval_harness.py` (inspect_ai + promptfoo + RAGAS + DeepEval)
- **Branch / worktree:** `goal/W373-sota-ready` at `Z:/claude-sota-installed-W373` (created via `tools/eee.ps1 --Wave W373 --Slug sota-ready` per W363)
- **Parent spec:** none (this is a meta-audit wave; downstream W374-EXT spec at `docs/superpowers/plans/2026-05-22-W374-EXT-tasks-7-8-9-quality-amplifications.md`)

## Cite-Anchors (CR-6 verify-before-claim)

| Component | Primary cite (organizationally distinct) |
|---|---|
| Parallel agent-team dispatch | `claude-cookbooks @ 39a350b6 patterns/agents/prompts/research_lead_agent.md:135-137` (`<use_parallel_tool_calls>` MUST-block) + W269/W312-D/W320-B-2 mandate (this runtime's CLAUDE.md) |
| Codex dual-position review | W372 P0-2 commits (this runtime) + Anthropic `docs.anthropic.com/en/docs/claude-code/sub-agents` model-precedence |
| 3-judge codex jury (temps 0/0.3/0.7 + position-swap + CISC aggregation) | Zheng+ `arXiv:2306.05685` MT-Bench position-swap protocol + Wang+ `arXiv:2310.17631` JudgeLM aggregation + OpenReview 2025 paper id `XdcofpTCyq` + haizelabs/verdict v0.2.7 MIT (3-org-distinct) |
| CoVe-factored verification | Dhuliawala+ Meta AI `arXiv:2309.11495` factored mode +8.4pt |
| sca-v18 5G D101-D105 rubric | `docs/architecture/SOTA-RUNTIME-2026-05-22/LANDSCAPE.md` §sca-v18 + W369 P1.6 commit `44a54ba` |
| inspect_ai + promptfoo + RAGAS + DeepEval | `harness/eval_harness.py` W346 Stream-D + W369 P1.5 commit `3fe52d2` |
| Multi-MCP convergence (perplexity + exa + firecrawl + hf + deepwiki) | sca-v17 §multi-MCP-convergence (W346 Stream-B) |
| Pre-commit gates SHA pins | gitleaks v8.30.1 `@HEAD 8863af47` · ruff v0.15.12 `@HEAD 6fec9b7e` · actionlint v1.7.12 `@HEAD 011a6d15` (W347 P4c SHA-pin) · commitlint v20.5.3 |
| Worktree topology cap=5 + tools/eee.ps1 wave/slug discipline | W350 GIT-TREE-SOTA-ARCHITECTURE §2 + W363 |
| Cardinal-rule-6 verify-before-claim | CLAUDE.md cardinal rules + OWASP A06:2021 + ISO/IEC 25010:2011 §4.2.6-4.2.7 + NIST SP 800-218 PW.7/RV.1 |

## Non-Goals

- This wave does NOT execute W374-EXT Tasks 7-9 (CoVe verifier · review-gate · jury panel). It only RATIFIES the W374-EXT plan file by committing it, and ensures the runtime is ready.
- This wave does NOT ship the CPA-FLEET-ZERO-ERROR work (separate operator project, stashed to `feat/cpa-fleet-zero-error`).
- This wave does NOT migrate W362a/b/c worktrees — only probes them and gates any prune action through the jury.
- This wave does NOT modify CLAUDE.md beyond cite-refresh on stale facts (cardinal rules + Cardinal-Rule-6 verify-before-claim require active maintenance, not rewrite).

## Architecture

### Phase shape (sequential phases; Phase 1 internal parallelism)

```
                          ┌─────────────────────────────────────────┐
                          │  W373-SOTA-READY worktree topology      │
                          │  Z:/claude-sota-installed-W373          │
                          │  branch goal/W373-sota-ready            │
                          └────────────────┬────────────────────────┘
                                           │
       ┌───────────────────────────────────┼───────────────────────────────────┐
       │                                   │                                   │
   ┌───▼───┐                          ┌────▼────┐                         ┌───▼───┐
   │  P0   │                          │   P1    │                         │  P2   │
   │ Pre-  │  current wt              │ Audit   │ W373 wt                 │ Synth │
   │ flight│  ~30 min                 │ Streams │ ~60 min wall            │ ~30m  │
   │       │                          │ A B C D │ (6 parallel agents,     │       │
   │       │                          │   E F   │  1 message)             │       │
   └───┬───┘                          └────┬────┘                         └───┬───┘
       │                                   │                                  │
       │                                   │                                  │
       │   ┌─────────────────────────────┐ │   ┌──────────────────────────┐   │
       └──▶│ CPA-FLEET work → stash      │ │   │ CoVe-factored verify ────┼───┘
           │ W374-EXT plan → P0 commit   │ │   │ sca-v18 D101-D105 score  │
           │ eee.ps1 mods  → P0 commit   │ │   │ Topo-sort + DAG          │
           └─────────────────────────────┘ │   └──────────────────────────┘
                                           │                  │
                                           ▼                  ▼
                                      ┌─────────┐        ┌─────────┐
                                      │   P3    │        │   P4    │
                                      │ Remed.  │  ────▶ │  Ship   │
                                      │ LOW=fire│        │  Gate   │
                                      │ HIGH=   │        │  r1+r2  │
                                      │  jury   │        │  eval-4 │
                                      │ ~2-3 hr │        │  ~45 min│
                                      └────┬────┘        └────┬────┘
                                           │                  │
                                           │                  ▼
                                           │              ┌───────┐
                                           └─────────────▶│  P5   │
                                                          │ Wave- │
                                                          │ close │
                                                          │ ~15m  │
                                                          └───────┘
```

### Component boundaries (per brainstorming "design for isolation")

| Unit | Purpose | Interface | Depends on |
|---|---|---|---|
| `tools/w373/P0-preflight.ps1` | Triage uncommitted work + create W373 worktree | git working tree + `tools/eee.ps1` | nothing |
| Phase 1 Stream A-F agents | 6 parallel independent audits | each writes `.claude/state/W373-stream-{ID}-*.md`; pure-read of runtime | P0 complete |
| `tools/w373/P2-synthesis.py` | Merge + CoVe-verify + sca-v18 + risk-class + topo-sort | reads 6 stream files; writes `docs/architecture/W373-SOTA-READY/W373-FINDINGS.md` + `REMEDIATION-MANIFEST.md` | Phase 1 complete |
| `tools/w373/P3-remediation.py` | Walks manifest; LOW auto-fires, HIGH stops at jury (jury logic INLINED in this module — no separate file, to avoid path-conflict with W374-EXT Task 9's planned `tools/codex-jury-panel.mjs`) | reads `REMEDIATION-MANIFEST.md`; writes `REMEDIATION-LOG.md` + commits | P2 complete |
| `tools/w373/P4-ship-gate.ps1` | Bundle diff + dispatch codex r1+r2 + fire eval lane | reads `tmp/W373-ship-diff.patch`; writes `tmp/W373-codex-r{1,2}-*.txt` + `harness/eval-results/W373-*.json` | P3 complete |
| `tools/w373/P5-wave-close.ps1` | VERDICT-LEDGER row + T6 basic-memory + worktree prune decision | writes `docs/architecture/W373-SOTA-READY/VERDICT-LEDGER.md` + T6 entry | P4 ship-gate APPROVE |

Each unit is independently testable: stream agents are idempotent (re-dispatch overwrites output); synthesis/remediation/ship-gate scripts are unit-tested in `tests/`; codex-jury has fixture-based tests.

## Components

### P0 Pre-flight (~30 min, current worktree)

1. **Triage uncommitted work:**
   - `auto_offload.py` + `docs/architecture/CPA-FLEET-ZERO-ERROR-2026-05-22/` + `accounts/scripts/fleet_status.ps1` → `git stash push -m "cpa-fleet-zero-error WIP"` → later `git branch feat/cpa-fleet-zero-error stash@{0}^1` (separate ship)
   - `docs/superpowers/plans/2026-05-22-W374-EXT-tasks-7-8-9-quality-amplifications.md` → moves to W373 worktree, commits in P0
   - `tools/eee.ps1` + `tools/eee-status.ps1` + `.claude/plugins/installed_plugins.json` + `.claude/plugins/known_marketplaces.json` → fold into W373 P0 housekeeping commit (these mods are W373-relevant)

2. **Create W373 worktree:**
   ```powershell
   .\tools\eee.ps1 --Wave W373 --Slug sota-ready
   ```
   Creates `Z:/claude-sota-installed-W373` on `goal/W373-sota-ready` branched off `feat/W370-substrate-carryforward` HEAD `3d355c0`.

3. **Skill auto-fires in new worktree:**
   - `superpowers:using-superpowers` loads (this skill)
   - `mem-recall` searches T6 for prior W373 / SOTA-audit context
   - `sota-convergence-audit` may auto-fire on `description:` match (operator confirms or dismisses)

4. **P0 housekeeping commit:**
   ```
   docs(W373): bootstrap wave + ratify W374-EXT plan file
   
   - tools/eee.ps1 + eee-status.ps1 W373 wave-slug support
   - .claude/plugins/{installed_plugins,known_marketplaces}.json plugin state
   - docs/superpowers/plans/2026-05-22-W374-EXT-*.md (pre-execution ratify)
   
   Codex-Verdict: PENDING (W373 ship gate)
   ```

### Phase 1 Audit Streams (~60 min, 6 parallel agents in 1 message)

Six independent streams written to non-overlapping files in `.claude/state/`. Each stream agent is `subagent_type: general-purpose` with verify-before-claim discipline (per cardinal-rule-6). Output format is structured Markdown with required fields:

```markdown
## Stream {ID} — {NAME}
**Owner agent:** {agent ID}  **Started:** {ts}  **Completed:** {ts}

### Findings

| ID | Subject | Evidence (file:line / cmd / URL) | Risk-class-draft | sca-draft |
|----|---------|----------------------------------|------------------|-----------|
| W373-F001 | ... | ... | LOW / MED / HIGH | 0.0-5.0 |
...

### Coverage
- audited: ...
- not-audited (out-of-scope): ...

### Confidence
- claim → cite-anchor → exists? (verify-before-claim)
```

#### Stream A — Runtime inventory deep audit
- 16 MCPs: version pin · upstream HEAD SHA · npm `dist-tags.latest` · license · 30d-cadence · CVE (Socket.dev API)
- 47 enabled plugins: same axes; plus `gitCommitSha` vs upstream HEAD
- 63 local skills: SKILL.md `description:` field cardinality (≤8 distinct triggers per cardinal-rule-4 corollary); sibling-overlap <50%
- Hooks + settings.json: cardinal-rule-2 + MSYS-form + 2KB cap re-verify
- Subagent allowlist: 14 colliding + 43 orphan_fqn disposition recommendations

#### Stream B — SOTA catalog cross-check + live May-2026 refresh
- LANDSCAPE.md 50 candidates × 6 tiers: PRESENT? PINNED? LATEST-OK? license-OK? Active maintainer?
- User's 9 list resolution:
  - `shanraisshan/claude-code-best-practice` → install as marketplace? (currently cite-only at `Z:/repos/deps/`)
  - `ComposioHQ` → resolve to specific repo: candidates Composio · RubeApp · composio-mcp · composio-toolkit
  - `rohitg00/agentmemory` → resolve to npm package name + check if MCP-shaped
- Live SOTA refresh: `perplexity_research "claude-code SOTA repos May 2026"` + `exa.web_search_exa` + `firecrawl.firecrawl_search` + `hf-mcp.hub_repo_search` 3-org-distinct convergence per sca-v17

#### Stream C — Git-tree + automation/CI hygiene
- `git worktree list` → 5 worktrees (main + W362a/b/c + W374); per-worktree `git log <branch>..main` → KEEP / PRUNE classification
- Pre-commit gate cite-refresh: gitleaks/ruff/actionlint SHAs vs npm/PyPI/GitHub latest
- `.github/workflows/` audit: parallel-ratio gate (W370 P2.2) · codex-jury workflow · branch-protection v2025
- `tools/eee.ps1` + `tools/preagent-*.mjs` binding-mode verification per W329 R5-corollary

#### Stream D — Hidden-error / silent-fallback / stale-reference sweep
- Run preagent gates in dry-run audit-mode
- W342 phantom-enabled pattern re-scan (settings.json `enabledPlugins` vs cache dirs)
- W370 stale-fact pattern (claims in CLAUDE.md / docs vs live state)
- parallel_ratio empirical re-probe (current vs 0.7 target per W325-A F1)
- claudelint + everything-claude-code checkers

#### Stream E — MCP / memory-tier live deep-probe
- Per MCP: `initialize` handshake + `tools/list` response + endpoint reachability
- Memory tiers live status: T2 sqlite_vec · T3 cognee :8000 (NSSM `CogneeMCP`) · T5 langfuse :3000 + OTel · T6 basic-memory + Ollama :16700 + LlamaSwap :8090 + FalkorDB :16379
- Per-MCP `dist-tags.latest` vs pinned version drift
- License + maintainer + dep-CVE per CR-1 axis-1#3

#### Stream F — Research-arch + skill-trigger + documentation cite-refresh
- All CLAUDE.md cite-anchors: file exists? SHA still HEAD? upstream advanced?
- CCBP cite-anchor refresh: `Z:/repos/deps/claude-code-best-practice-shan @ HEAD a28cd96b` → check actual HEAD
- Skill SKILL.md trigger phrases: cardinality + overlap audit
- VERDICT-LEDGER rows cumulative integrity
- `mcp__basic-memory__search_notes "Wave-N"` cross-reference

#### Synchronization point
All 6 streams must hit TaskUpdate `completed` before Phase 2 fires. Parent orchestrator polls every 5 min via `TaskList`; at +60min sends `SendMessage` to laggers; at +90min escalates to operator.

### Phase 2 Synthesis (~30 min)

`P2-synthesis.py` runs:

1. **Mechanical merge** — parse 6 stream outputs, consolidate into master finding list, deduplicate cross-stream.
2. **CoVe-factored verification** per finding (Anthropic API calls):
   - Draft visible: generate 3-5 verification questions
   - Draft HIDDEN: answer each Qi in isolated Claude call (factored mode per `arXiv:2309.11495`)
   - Reconcile: does any isolated answer challenge the finding's risk-class or evidence? If yes, re-class + log.
3. **sca-v18 5G D101-D105 scoring** per finding (0.0-5.0)
4. **Risk-class final** per Q2 settled rule (LOW = additive non-destructive non-config-surface; HIGH = anything else or sca<3.0 or CoVe-flipped)
5. **Dependency ordering** — topological sort into DAG; remediation walks in topo order

Output: `docs/architecture/W373-SOTA-READY/W373-FINDINGS.md` + `REMEDIATION-MANIFEST.md`.

### Phase 3 Remediation (~2-3 hr)

`P3-remediation.py` walks `REMEDIATION-MANIFEST.md` in topo order. Per finding F:

```
if F.risk == LOW:
    execute remediation
    run probe (smoke-test specific to type — see test matrix)
    commit with cite-anchor + Codex-Verdict trailer
    pre-commit gate fires (12+ checks)
    on failure: git restore + log + skip
    
if F.risk == HIGH:
    stage diff in temp branch
    dispatch 3 parallel codex rounds (1 message, 3 Agent calls):
        Judge α temp=0.0
        Judge β temp=0.3
        Judge γ temp=0.7
        position-swap protocol (each sees diff with different stream's cite prefix)
    aggregate via CISC confidence-weighted majority:
        APPROVE → fire remediation + commit
        REVISE  → apply prescriptions inline + re-dispatch (max 2 cycles)
        BLOCK   → log "DEFER-TO-W374-or-later"
        NEEDS-ROUND-2 → re-dispatch with shuffled temps
    operator notified via TaskCreate "[W373 JURY-DECISION] F_i: <verdict>"
```

Smoke-test matrix per remediation type defined in Section 4 of brainstorming output (above).

### Phase 4 Ship Gate (~45 min)

`P4-ship-gate.ps1`:
1. Bundle: `git diff goal/W373-sota-ready..main > tmp/W373-ship-diff.patch` + findings + logs + stream outputs
2. **Codex r1 position-A (attacker):** Path P foreground+tee; output `tmp/W373-codex-r1-position-A.txt`
3. **Codex r2 position-B (defender):** input r1 verdict; output `tmp/W373-codex-r2-position-B.txt`
4. **Eval lane concurrent:** `python harness/eval_harness.py --suite all --runtime W373-postdiff`
   - inspect_ai SWE-Bench-mini (3 tasks)
   - promptfoo regression (12 prompts × 3 runs)
   - RAGAS faithfulness + context-precision on memory
   - DeepEval correctness + bias on jury outputs
5. **Ship decision logic:**
   ```
   if r1==APPROVE and r2==SHIP and eval-lane==no-regression:
       squash-PR to main per W350 P0.1 + apply-branch-protection
   elif r2==APPLY-R1-PRESCRIPTIONS-*:
       apply inline, loop to step 2 (r3 with new diff); max 5 rounds
   else:
       ESCALATE via TaskCreate "[W373 SHIP-GATE BLOCK]"; no auto-merge
   ```
6. Required commit-msg gate: `Codex-Verdict:` trailer + `Codex-Round:` + `Codex-Eval-Lane:` + `Codex-SHA:`

### Phase 5 Wave-close (~15 min)

`P5-wave-close.ps1`:
1. `docs/architecture/W373-SOTA-READY/VERDICT-LEDGER.md` row
2. T6 basic-memory write: `mcp__basic-memory__write_note "Wave-W373-SOTA-READY"`
3. Worktree disposition: if W374-EXT execution immediate → KEEP worktree; else PRUNE per `WorktreeRemove` hook
4. Update CLAUDE.md Runtime State pointer (CR-6 verify-before-claim — only if state advanced)
5. CLAUDE.md Status pointer to `docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-CURRENT-W373.md`

## Data Flow

```
Operator request (this conversation)
    │
    ▼
P0: uncommitted-work triage + W373 worktree create
    │
    ▼ (worktree boundary)
P1: 6 parallel agents read runtime → 6 stream files
    │
    ▼ (sync point)
P2: stream files → CoVe-verify → sca-v18 → topo-sort → FINDINGS.md + REMEDIATION-MANIFEST.md
    │
    ▼
P3: MANIFEST.md → walk topo:
        LOW  → execute + probe + commit (auto)
        HIGH → jury (3 codex rounds parallel) → APPROVE/REVISE/BLOCK
        → REMEDIATION-LOG.md
    │
    ▼
P4: diff + findings → codex r1 (attacker) → codex r2 (defender) → eval lane
        → ship decision (APPROVE / loop / ESCALATE)
    │
    ▼ (only on APPROVE)
P5: VERDICT-LEDGER row → T6 memory write → CLAUDE.md pointer update → worktree decision
    │
    ▼
W373-SOTA-READY DONE; W374-EXT unblocked
```

## Error Handling

| Phase | Failure mode | Rollback |
|---|---|---|
| P0 | Stash conflict | `git stash pop` retry; if persistent → abort with operator notification |
| P1 | Stream agent timeout >90min | SendMessage probe; if no response, re-dispatch with new agent ID; if 2 re-dispatches fail, mark stream FAILED + log "unaudited region" |
| P1 | Stream agent crash | Findings file partial; non-fatal; coverage gap noted in synthesis |
| P2 | CoVe call fails | Fall back to risk-class-draft from stream; log no-CoVe disclaimer |
| P2 | sca-v18 schema validation fails | Finding gets sca=0.0 + manual-review flag |
| P3 LOW | Smoke-probe fails | `git restore .` reverts; log + skip to next |
| P3 LOW | Pre-commit gate fails | Commit aborts; restore + log + skip |
| P3 HIGH | Jury divergence after 2 rounds | BLOCK + DEFER-TO-W374; finding parks in carry-forward |
| P3 HIGH | Codex round timeout | Re-dispatch with timeout=1800s once; then BLOCK |
| P4 | r1 NEEDS-MAJOR-REWORK | Escalate to operator; do NOT auto-rework |
| P4 | Eval-lane regression | Block ship; log delta; investigate before retry |
| P5 | Worktree prune fails | Leave worktree; log; operator decides |

**Failure isolation guarantee:** any phase failure leaves the runtime in the SAME state as before that phase started (modulo non-destructive `.claude/state/W373-*.md` artifacts).

## Testing

1. **Each stream is independently testable** — re-dispatch via Agent tool; output is idempotent (overwrites own file).
2. **CoVe step** — input list + mock Anthropic client (pre-canned responses) → verify reconcile flips happen.
3. **Risk-class rule** — table-driven unit test in `tests/test_w373_risk_class.py`.
4. **Jury aggregator** — fixture-based test for the inlined jury logic in `tools/w373/P3-remediation.py` (kept inline to avoid path-conflict with W374-EXT Task 9's planned `tools/codex-jury-panel.mjs`; W374-EXT lands the proper reusable tool, W373 just hand-rolls for this wave).
5. **Eval lane** — `harness/eval_harness.py --dry-run --suite all` exits 0 + writes expected file format.
6. **Smoke-probes** — each remediation type has a probe; per-finding `probe:` field in manifest; runs in P3.
7. **DONE-state probes** (verify-before-claim per cardinal-rule-6) — 9 reproducible probes defined in Section 6 of brainstorming output (above), all must exit 0 + emit expected output for wave to be DONE.

## DONE Criteria (verify-before-claim)

```bash
# 1. Git tree clean + W373 merged
cd Z:/claude-sota-installed && git status --short && git log --oneline -5 | grep "W373"

# 2. 6 stream findings persisted
ls .claude/state/W373-stream-{A,B,C,D,E,F}-*.md  # exactly 6 files

# 3. Synthesis artifacts present
ls docs/architecture/W373-SOTA-READY/{W373-FINDINGS,REMEDIATION-MANIFEST,REMEDIATION-LOG,VERDICT-LEDGER}.md

# 4. 3 of 9 listed-repo gaps closed (install-shape determined by Stream B
#    → CCBP: marketplace OR cite-only retained; Composio: MCP wired at
#    resolved repo; agentmemory: MCP/plugin/skill as Stream B determines)

# 5. Catalog-grade audit ledger
wc -l docs/architecture/W373-SOTA-READY/CATALOG-CROSS-CHECK-LEDGER.md  # ≥50 rows (Tier 1+2)

# 6. Codex r1+r2 verdicts present
ls tmp/W373-codex-r{1,2}-position-{A,B}.txt  # 2 files

# 7. Eval lane PASS
jq '.regression' harness/eval-results/W373-ship-gate-*.json  # false

# 8. T6 basic-memory write
basic-memory search_notes "W373-SOTA-READY"  # ≥1 hit

# 9. W374-EXT plan file committed
git log --all --oneline --follow docs/superpowers/plans/2026-05-22-W374-EXT-tasks-7-8-9-quality-amplifications.md  # ≥1
```

## Tactical Decisions Locked

| Decision | Resolution |
|---|---|
| SOTA bar | Catalog-grade — Tier 1+2 of LANDSCAPE.md (~25 items); Tier 3+ deferred unless Stream B surfaces critical gap |
| Remediation aggressiveness | Auto-fix LOW (additive non-destructive); jury-gate HIGH (destructive / settings-surface / sca<3.0 / CoVe-flipped) |
| W374-EXT sequencing | Block W374-EXT until W373 ships; commit W374-EXT plan file in W373 P0 housekeeping |
| Worktree | New `Z:/claude-sota-installed-W373` on `goal/W373-sota-ready` per W363 `eee.ps1 --Wave W373 --Slug sota-ready` |
| CPA-FLEET work | Stash + later branch `feat/cpa-fleet-zero-error`; separate ship |
| W362a/b/c worktrees | Stream C probes; prune action JURY-GATED |
| Codex rounds | r1 + r2 default; up to r5 if r2 calls APPLY-R1-PRESCRIPTIONS; then escalate |
| Eval lane | All 4 suites (inspect_ai + promptfoo + RAGAS + DeepEval) |
| Audit streams | 6 parallel (A runtime / B catalog / C git-CI / D hidden-errors / E MCP-memory-live / F cite-refresh) |
| Synthesis quality | CoVe-factored verification + sca-v18 D101-D105 scoring |
| Multi-MCP convergence (Stream B) | perplexity_research + exa + firecrawl + hf + deepwiki (sca-v17 3-org-distinct) |

## Out-of-Scope (deferred to follow-up waves)

- LANDSCAPE.md Tier 3+ catalog items (deferred unless surfaced as critical by Stream B)
- W362a/b/c worktree topology re-architecture (only prune action in this wave)
- CPA-FLEET-ZERO-ERROR work (separate branch, separate wave)
- W374-EXT Tasks 7-9 execution (blocked by this wave; follow-up wave)
- alirezarezvani 313→48 fabrication: already retired stage-2 per W342 X4 §4; no action this wave
- CLAUDE.md rewrite (only cite-refresh on stale facts per Stream F)
- `tools/codex-jury-panel.mjs` as a reusable Node tool — RESERVED for W374-EXT Task 9 ; W373 jury logic stays INLINED in `tools/w373/P3-remediation.py` to avoid path conflict
- `agents/cove_verifier.py` as a reusable Python module — RESERVED for W374-EXT Task 7; W373 CoVe pattern stays INLINED in `tools/w373/P2-synthesis.py`
- `agents/jury_aggregator.py` — RESERVED for W374-EXT Task 9; W373 aggregator stays INLINED
- `agents/review_gate.py` — RESERVED for W374-EXT Task 8 (pre-L3 test gate); no W373 equivalent

## Reversibility

Every phase is rollback-safe:
- P0: `git stash pop` + drop worktree → state reverts to pre-W373
- P1: pure-read; no rollback needed
- P2: write-only to docs/ + tmp/; delete those dirs to revert
- P3: per-commit revert via `git revert`; pre-commit gate aborts dangerous commits
- P4: read-only review; no state change
- P5: bookkeeping only; ledger row can be marked WITHDRAWN

Full wave revert: `git branch -D goal/W373-sota-ready && git worktree remove Z:/claude-sota-installed-W373 --force` → state identical to pre-W373 (modulo non-destructive stream artifacts under `.claude/state/`).

## Acceptance Criteria (per finding type)

| Finding type | Accept iff |
|---|---|
| New install (LOW) | upstream HEAD SHA pinned + license-OK + smoke-probe exit 0 + CR-9 version-pin discipline |
| Cite-refresh (LOW) | SHA matches new HEAD + previous SHA captured in commit msg |
| Settings surgery (HIGH) | jury APPROVE + smoke-probe exit 0 + no regression in eval lane |
| Plugin retire (HIGH) | jury APPROVE + W342 X1 §3 phantom-enabled false + no skill auto-fire on retired-plugin description match |
| MCP swap (HIGH) | jury APPROVE + initialize handshake on new MCP + tools/list complete + cardinal-rule-2 contract |
| Worktree prune (HIGH) | jury APPROVE + `git log <branch>..main` empty (no orphaned commits) + cardinal-rule-6 verify-before-claim |
| FQN regen (LOW) | `tools/build-subagent-allowlist.mjs --regenerate` exit 0 + W340 F3/SB-3 schema |
| Hidden-error fix (varies) | reproducer probe pre-fix FAILS + reproducer probe post-fix PASSES |

## Open Questions Settled in Brainstorming

| Q | Resolution |
|---|---|
| Q1 SOTA bar | Catalog-grade |
| Q2 Remediation | Auto-fix LOW + jury-gate HIGH |
| Q3 W374-EXT timing | Block until W373 ships |
| Q4 (implicit, from operator's "max depth" directive) | Approach A++ — all quality primitives engaged |

## Execution handoff

On operator approval of this spec, invoke `superpowers:writing-plans` skill to produce the task-by-task implementation plan with TDD discipline + per-step checkboxes per skill convention. The plan goes to `docs/superpowers/plans/2026-05-22-W373-SOTA-READY-execution-plan.md`.

The plan will:
- One task per phase (P0..P5)
- Per-phase sub-tasks for each component
- Per-stream agent dispatch prompt (in plan as inline ready-to-paste)
- TDD cycle per script (`P2-synthesis.py` + `P3-remediation.py` + `tools/codex-jury-panel.mjs` + smoke-probe registry)
- Codex-Verdict trailer template per commit type
- Rollback checklist per phase

---

> **Status:** DESIGN AWAITING OPERATOR REVIEW.
> Review this spec at `docs/superpowers/specs/2026-05-22-W373-SOTA-READY-design.md`. On approval, the `superpowers:writing-plans` skill produces the implementation plan; execution then fires per Phase 0 → Phase 5.
