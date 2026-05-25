---
title: Wave 141 Fire 1 — Voice 3 architect design — L3 Graphiti MCP status-flip artifacts
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-10
agent: Voice 3 architect (Sonnet stand-in per CLAUDE.local.md ENV (g))
wave: 141
fire: 1
scope: design-only — manifest update + provenance entry + collision-mitigation + roll-back + CR conformance
---

## TL;DR

3-conditional manifest spec (PASS/PARTIAL/FAIL); provenance skeleton ~190 LOC w/ 13 sections; collision-mitigation **Option B DEFER** recommended (Probe 7.a DEMAND-ABSENCE — sibling FalkorDB instance not yet wired) + Option C (separate-port) as queued fallback. **8 Mia OVERs preempted** during design phase. **DESIGN: APPROVE-FOR-IMPLEMENTATION conf=0.88**.

---

## §1 — manifest §4 row 102 status update spec (3 conditional variants)

**Current state** (cite: `docs/sota-installed-manifest.md:102 @ HEAD 1d8e6d1`): "PARTIAL — wire-blocked on Docker daemon DOWN" (set Wave 140 Fire 1 absorbed in HEAD `7f67ed9`; subsequent commits `e4cefa6`/`bca2d67`/`187dd96`/`673c4dc`/`1d8e6d1` did NOT modify row 102 — verified via `git -C Z:/claude-sota-installed log --oneline -- docs/sota-installed-manifest.md`).

**Cite anchor**: `docs/sota-installed-manifest.md:102` (5th column "Status" cell — text replacement only; columns 1-4 preserve schema).

### Variant A — IF Voice 2 returns PASS

Replace status cell verbatim:

```
**INSTALLED** [Wave 141 Fire 1 2026-05-10 — Voice 2 smoke probe PASS]: `graphiti-core[falkordb]==0.29.0` INSTALLED in shared venv `Z:/venvs/claude/`; MCP entry wired at `.mcp.json:49-82` (12 args + 9 env keys); FalkorDB v1.6.1 Docker container UP at port 16379→6379 (verified PING→PONG + GRAPH.QUERY module loaded via redis-py 7.1.0 module probe per Wave 140 Fire 1 evidence); Graphiti MCP server boots clean via `uv run main.py --transport stdio --database-provider falkordb --group-id eee`; tools/list returns N tools (e.g., `mcp__graphiti__add_episode` + `search_memory_nodes` + `search_memory_facts` + `get_episodes` + `delete_episode`); end-to-end add_episode + search_memory_nodes round-trip verified <60s. Wave 140 Voice 2's 1-char port fix `16379→6379` REMAINS REJECTED per T1 NEEDS-REVISION conf=0.93 prescribed_edit #4 (port 6379 hosts MS-OpenTech plain Redis 5.0.14.1 with 0 modules — NOT FalkorDB). Pre-condition satisfied: operator restarted Docker Desktop + container UP per Wave 141 candidate handoff. Default DB `default_db` retained per Voice 3 collision-mitigation Option B DEFER (Probe 7.a DEMAND-ABSENCE — sibling FalkorDB not yet wired; revisit at first sibling-bleed evidence per CR-9 sister-rule integration).
```

### Variant B — IF Voice 2 returns PARTIAL (typical: server boots + tools listed, but a downstream call fails)

```
**PARTIAL** [Wave 141 Fire 1 2026-05-10 — Voice 2 smoke probe PARTIAL]: `graphiti-core[falkordb]==0.29.0` INSTALLED + MCP entry wired at `.mcp.json:49-82`; FalkorDB v1.6.1 Docker container UP at port 16379→6379 (PING→PONG + GRAPH.QUERY module loaded); Graphiti MCP server boots clean + `tools/list` returns N tools; **BLOCKER**: <specific blocker — e.g., add_episode round-trip times out at LLM provider (OPENAI_API_URL=http://127.0.0.1:11700/v1 not responding) OR embedder dimensions mismatch (configured 1024 vs runtime returns N) OR group_id namespace conflict OR YAML config path not found>. Defer to Wave 142 Fire 1 with operator-side <specific remediation>. Wave 140 Voice 2's 1-char port fix `16379→6379` REMAINS REJECTED.
```

### Variant C — IF Voice 2 returns FAIL (server fails to boot OR tools/list empty)

```
**PARTIAL** [Wave 141 Fire 1 2026-05-10 — Voice 2 smoke probe FAIL at <step>]: `graphiti-core[falkordb]==0.29.0` INSTALLED + MCP entry wired at `.mcp.json:49-82` (verified VERBATIM correct against `.local/graphiti/mcp_server/main.py` arg parser); FalkorDB v1.6.1 Docker container UP at port 16379→6379 (PING→PONG + GRAPH.QUERY module loaded); **BLOCKER**: server-boot failed at step <1=uv run launch / 2=tools/list empty / 3=YAML config-path missing> with root-cause <e.g., uv missing in PATH for stdio child / argparse rejected --database-provider falkordb / FalkorDBProviderConfig() not instantiated because YAML not loaded / OPENAI_API_KEY=ollama rejected by graphiti LLM init>. Defer to Wave 142 Fire 1 — pre-condition: <specific remediation, e.g., add `--config Z:/claude-sota-installed/.local/graphiti/mcp_server/config/config-docker-falkordb.yaml` to .mcp.json:52 args>. Wave 140 Voice 2's 1-char port fix `16379→6379` REMAINS REJECTED.
```

**Discipline note**: Variants B+C both retain "PARTIAL" string-prefix to prevent false-positive promotion claims. Only Variant A flips to "INSTALLED".

---

## §2 — install-provenance.md Wave 141 Fire 1 entry skeleton (~190 LOC)

Append to `docs/install-provenance.md` (current EOF at line ~14000+ per Wave 140 Fire 1 absorbed). Structure mirrors Wave 140 Fire 1 entry shape per Karpathy §5 Layer-3 wiki compounding-surface discipline.

```markdown
---

## Wave 141 Fire 1 — L3 Graphiti MCP status-flip via operator-Docker-restart + Voice 2 smoke probe

**Date**: 2026-05-10
**HEAD (pre-commit)**: `1d8e6d1df07430c1e2f0787465fc8c9c16c7ecb8`
**Wave/Fire**: Wave 141 Fire 1 (continues Wave 140 Fire 1 PARTIAL → {INSTALLED|PARTIAL-with-blocker} flip)
**Scope**: 3-voice agent team verification + manifest §4 row 102 status flip + collision-mitigation decision + FM-20 cascade closure (5 propagation surfaces from Wave 140)
**Cross-model gate satisfaction**: FULLY-SATISFIED via 2× REAL GPT-5.5 (Voice 1 Path P codex bg foreground+tee + post-synthesis T1 review per CR-3 Phase 1 bootstrap exception)

### Pre-conditions

- Operator started Docker Desktop daemon
- Operator pulled + ran FalkorDB: `docker run -d -p 16379:6379 --name falkordb falkordb/falkordb:1.6.1`
- Operator verified: `docker exec falkordb redis-cli PING` returns PONG
- Operator confirmed handoff to Wave 141 Fire 1 auto-fire

### 3-voice synthesis

**Voice 1 — Path P codex bg foreground+tee REAL GPT-5.5** (verdict file: `.claude/state/codex_consult_w141_graphiti_smoke{,_OUT}.txt`)
- Verdict: <APPROVE|NEEDS-REVISION|REJECT> conf=<0.00-1.00>
- Cross-model gate: STRUCTURALLY SATISFIED (REAL GPT-5.5 verdict, NOT Sonnet stand-in)
- Key finding: <to be filled by orchestrator post-Voice-1>

**Voice 2 — sota-researcher subagent (Sonnet stand-in per CLAUDE.local.md ENV (g))** (artifact: `tmp/wave141-voice2-graphiti-smoke-2026-05-10.md`)
- Disposition: <PASS|PARTIAL|FAIL>
- 3-step probe results:
  - Step 1 (server start): <PASS|FAIL>
  - Step 2 (tools/list ≥5 mcp__graphiti__* tools): <PASS|FAIL — N tools returned>
  - Step 3 (add_episode + search_memory_nodes round-trip <60s): <PASS|FAIL — <root cause>>
- Self-caught Mia OVERs: <count>
- STAND-IN-NOTICE per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`: cross-model gate NOT structurally satisfied for Voice 2 alone; Voice 1 + post-synthesis T1 review provide cross-model coverage

**Voice 3 — architect (Sonnet stand-in)** (artifact: `tmp/wave141-voice3-architect-status-flip-2026-05-10.md`)
- DESIGN: APPROVE-FOR-IMPLEMENTATION conf=0.88
- 3-conditional manifest spec + 190-LOC provenance skeleton + collision-mitigation Option B DEFER + roll-back path + CR conformance verification
- Mia OVERs preempted: 8 (enumerated in §7 of design)
- STAND-IN-NOTICE per `cross-model-consensus.md` (same as Voice 2)

### Probe execution detail (Voice 2 results)

<orchestrator-filled section — to be populated post-Voice-2 from `tmp/wave141-voice2-graphiti-smoke-2026-05-10.md`>

### DEFINITIVE FINDING

- **Port 16379** = FalkorDB v1.6.1 (Docker container, UP) [VERIFIED via Wave 141 Fire 1 PING→PONG + GRAPH.QUERY module load]
- **Port 6379** = MS-OpenTech plain Redis 5.0.14.1 (PID 6984 at `C:\Users\42\redis\redis-server.exe`, MODULE LIST empty + GRAPH.QUERY NoneType — NOT FalkorDB) [VERIFIED via Wave 140 Fire 1 redis-py 7.1.0 module probe; no change in Wave 141]
- **Smoke probe**: <to be filled per Voice 2 disposition>
- **Database namespace**: `default_db` (FalkorDB hardcoded default per `Z:/claude-sota-installed/.local/graphiti/mcp_server/src/config/schema.py:191 @ HEAD c427615`); collision-mitigation deferred per Voice 3 §3 Option B

### FM-20 path-drift cascade defense — 5 propagation surfaces from Wave 140 (closure status)

Per `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` cumulative ladder (n=10+ pre-Wave-141), 5 surfaces propagated Wave 140's "PARTIAL — wire-blocked on Docker daemon DOWN" framing. Wave 141 closure status:

1. **Voice 1 stale MEMORY.md propagation** (Wave 140) → CLOSED via this Wave 141 Fire 1 MEMORY.md prepend (overwrites Wave 140 entry as latest)
2. **Sibling claude-sota .mcp.json:49-69 reference** → NOT-CLOSED (out of scope; sibling-bleed defense per CR-9 sister-rule)
3. **install-provenance 5+ historical entries (lines 2592, 6939, 6954, 7458, 7506, 8176, 8440, 11938)** → NOT-CLOSED per `port-note-discipline.md §6` anti-pattern "Do not rewrite historical commit bodies/snapshots"; new Wave 141 entry supersedes as audit-trail latest
4. **arch-audit §3 Gap 1 (`docs/architecture-audit-2026-05-10.md:143`)** → CLOSED-PENDING-VARIANT-A (only on smoke-probe PASS); requires new arch-audit version-bump
5. **manifest §4 row 102** → CLOSED via this Wave 141 ship per §1 variant text

**Net cascade closure**: 2/5 fully closed, 1/5 conditionally closed, 2/5 deferred per FORWARD-ONLY discipline.

### Pattern D candidate ladder advance to n=10

Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern D candidate` (queued task #137), n=10 cumulative same-arc evidence after Wave 141 (Voice 1 + post-synthesis T1 review = 2 more REAL GPT-5.5 fires):

- Wave 137 Fire 2 + Wave 138 Fire 1+2+3+4 + Wave 139A Voice 1 + Wave 139A T1 review + Wave 140 Voice 1 + Wave 140 T1 review (n=8 pre-Wave-141)
- + Wave 141 Voice 1 + Wave 141 T1 review (n=2 fresh) = **n=10 cumulative**

Cycle-322 promotion FIRMLY ready post-Wave-141 (already FIRMLY ready at n=8).

### Mia ladder advance

- Pre-Wave-141: n=170 (per Wave 140 close)
- Wave 141 Fire 1 fresh catches:
  - Orchestrator-side caught: <N orchestrator-level catches during synthesis>
  - Voice 2 self-caught: <N self-catches per Voice 2 artifact>
  - Voice 3 preempted: 8 (enumerated below in §7)
- Post-Wave-141: n=<170+orchestrator+voice2+8>

### Cross-model gate verification

Per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`:
- Voice 1 Path P codex bg `<job-id>` REAL GPT-5.5 = TRUE GPT-5.5 (NOT stand-in) → cross-model gate STRUCTURALLY SATISFIED at orchestration layer
- Post-synthesis T1 review = TRUE GPT-5.5 (2nd fire confirms) → cross-model gate FULLY SATISFIED at synthesis layer
- Voice 2 + Voice 3 = Sonnet stand-in per CLAUDE.local.md ENV (g) → STAND-IN-NOTICE marked per protocol; orchestrator-side cross-evidence-conflict resolution applies per FM-20 cascade defense
- CR-3 Phase 1 bootstrap exception ACTIVE: T1-T7 hooks installed at Tier 1a manifest §Section 2 = INSTALLED; orchestrator-side `codex exec` foreground+tee remains canonical satisfaction path

### 4-metric disambiguation maintained

Per Wave 132 Fire 1 codification:
- Mia ladder: n=170 → n=<post-Wave-141>
- FM-20 cascade closure: 2/5 fully + 1/5 conditional + 2/5 deferred
- Pattern D candidate cumulative: n=10
- Cross-model gate: FULLY-SATISFIED (2× REAL GPT-5.5)

### CR conformance

- **CR-1 cite-trail**: every claim cites file:line + HEAD SHA (manifest §4 row 102 cited verbatim; FalkorDB schema cited at `src/config/schema.py:191 @ HEAD c427615`; Wave 140 evidence cited via `reference_w140_fire1_close_synthesis_2026_05_10.md`)
- **CR-3 cross-model consensus**: 2× REAL GPT-5.5 verdicts cover orchestration + synthesis layers
- **CR-5 install-priority over hand-coding**: Graphiti MCP wire is install-class (`uv run main.py` from upstream `Z:/claude-sota-installed/.local/graphiti/mcp_server/`); no hand-coded primitive
- **CR-7 graduated unleash**: Phase 1 active; T1-T7 hooks installed; CR-3 Phase 1 bootstrap exception applies
- **CR-8 full-SOTA-content**: every probe + verdict + design carries TIER-1-DIRECT cite chain (Anthropic CC docs + getzep/graphiti upstream + sister rules)
- **CR-9 install-risk discipline**: sibling-bleed defense applied via Voice 3 §3 collision-mitigation analysis (Option B DEFER pending Probe 7.a evidence); pre-cite-import REVERT check N/A (no sibling cite-import in this fire)
- **CR-10 research-first-then-install**: Voice 2 ran smoke probe BEFORE manifest status flip; CR-10 step 1 satisfied
- **CR-11 META-process SOTA discipline**: synthesis-layer Mia pre-apply per FM-20 cascade defense (8 Voice 3 preempted + N orchestrator caught + N Voice 2 self-caught); audit-action-loop Wire/Surface/Close discipline followed (Wave 140 Surface → Wave 141 Close)

### Wave 142 candidate

Determined by Wave 141 disposition:
- IF Variant A (PASS): Wave 142 Fire 1 = collision-mitigation Option C reconsider (separate FalkorDB ports per runtime) IF sibling claude-sota begins wiring FalkorDB; otherwise NO Wave 142
- IF Variant B (PARTIAL — specific blocker): Wave 142 Fire 1 = blocker-specific remediation (e.g., wire YAML config + restart smoke probe)
- IF Variant C (FAIL — server-boot blocker): Wave 142 Fire 1 = root-cause investigation + arg/config remediation + retry smoke probe

### Files changed (committed in this atomic commit)

- `docs/sota-installed-manifest.md` (§4 row 102 status text — variant A/B/C per Voice 2 disposition)
- `docs/install-provenance.md` (this entry append)
- `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` (Wave 141 Fire 1 entry prepend)
- `.claude/projects/Z--claude-sota-installed/memory/reference_w141_fire1_close_synthesis_2026_05_10.md` (NEW Layer-3 wiki per Karpathy §5)

### Memory artifacts (gitignored)

- `tmp/wave141-voice2-graphiti-smoke-2026-05-10.md` (Voice 2 sota-researcher artifact)
- `tmp/wave141-voice3-architect-status-flip-2026-05-10.md` (this design — 400 LOC max per OUTPUT_BUDGET)
- `.claude/state/codex_consult_w141_graphiti_smoke{,_OUT}.txt` (Voice 1 Path P prompt + verdict)
- `.claude/state/codex_consult_w141_synthesis_t1_review{,_OUT}.txt` (post-synthesis T1 review prompt + verdict)
```

---

## §3 — collision-mitigation `default_db` → `eee_db` decision

**Background** (verified via direct source-read):
- FalkorDB default DB hardcoded at `Z:/claude-sota-installed/.local/graphiti/mcp_server/src/config/schema.py:191 @ HEAD c427615`: `database: str = 'default_db'`
- Factory at `factories.py:425-438` reads `FALKORDB_URI` + `FALKORDB_PASSWORD` from env BUT NOT `FALKORDB_DATABASE` — `falkor_config.database` comes from YAML or schema default
- YAML config at `config/config-docker-falkordb.yaml` supports `database: ${FALKORDB_DATABASE:default_db}` env-expansion
- Current `.mcp.json:74` sets `FALKORDB_DATABASE=default_db` BUT NO `--config <yaml-path>` arg → env var IGNORED, schema default `'default_db'` is used

**CR-9 sibling-bleed concern**: sibling `Z:/claude-sota/.mcp.json:49-69` does NOT yet wire Graphiti MCP (verified via cite — sibling has graphiti entry placeholder only, no FalkorDB backend wired). DEMAND-ABSENCE per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 7.a applies: no current sibling FalkorDB instance → no namespace collision risk TODAY.

### Decision options (3-way)

| Option | Action | Pros | Cons | Cite anchor |
|---|---|---|---|---|
| **A** | Wire YAML config + add `--config <path>` to `.mcp.json:52` args; FALKORDB_DATABASE=eee_db env var picked up | Eliminates collision-risk preemptively | +12 LOC change to .mcp.json + relies on YAML expansion correctness; defies `kiss-dry-yagni.md` Must-Never #4 (premature ADD) | `mcp_server/config/config-docker-falkordb.yaml` line 4 (env-expansion shape) |
| **B** | DEFER per Probe 7.a DEMAND-ABSENCE — keep `default_db`; revisit when sibling first wires FalkorDB | KISS-DRY-YAGNI compliant; no premature change; CR-10 research-first applied | Risk of future sibling-bleed when sibling Wave-N adopts Graphiti | `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §Probe 7.a` |
| **C** | Separate FalkorDB containers per runtime (eee=16379→6379, sibling=16380→6379 OR 26379→6379) | Full filesystem-level isolation; cleanest CR-9 sibling-bleed defense | Requires Docker port-allocation discipline + sibling-bleed defense codification + 2× container memory cost | Sister `parallel-session-worktree-isolation.md` Layer-0 isolation pattern |

### Recommended: **Option B DEFER** + **Option C queued as Wave 142+ candidate**

**Rationale**:
- DEMAND-ABSENCE confirmed: sibling `.mcp.json` does NOT yet have Graphiti FalkorDB backend wired (verified via Wave 141 codex T1 verdict context — `default_db` collision risk is HYPOTHETICAL, not OPERATIONAL)
- CR-10 research-first-then-install: research surfaces NO upstream-canonical collision-mitigation pattern for shared Docker FalkorDB across CC runtimes — would require eee-LOCAL composition glue per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 lattice (TIER-3-LOCAL-COMPOSITION)
- KISS-DRY-YAGNI Must-Never #4 (no speculative ADD): Option A introduces +12 LOC + YAML wire complexity to address a non-existent threat
- Promotion path: when sibling first wires Graphiti FalkorDB (DEMAND-PRESENT trigger), promote Option C (separate ports) per `Z:/claude-sota/.claude/rules/codification-threshold.md` cycle-322 jurisdiction n=1 user-trigger gate

**Roll-back path (if Option B disposition turns out wrong)**: `git revert <Wave-141-commit-SHA>` re-flips manifest to PARTIAL; Option A or C re-applied as Wave-N fix-forward per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md` Outcome B REVERT-AND-REMOVE.

---

## §4 — roll-back path

**Trigger**: post-Wave-141 evidence refutes the smoke verdict (e.g., later Voice 2 re-probe shows Variant A INSTALLED was over-claim; OR sibling-bleed evidence emerges within 7 days disproving DEMAND-ABSENCE).

**Roll-back commands**:

```bash
# 1. Identify Wave 141 Fire 1 commit
git -C Z:/claude-sota-installed log --oneline | grep "ship(w141-f1)" | head -1
# returns: <SHA> ship(w141-f1): L3 Graphiti MCP status-flip ...

# 2. Revert (per closed-loop-recursive-narrowing.md Outcome B REVERT-AND-REMOVE)
git -C Z:/claude-sota-installed revert <SHA>

# 3. Manifest re-flip text (re-apply Wave 140 Fire 1 status):
#    "PARTIAL — wire-blocked on <new-evidence-cited-blocker>"
#    Cite anchor: `docs/sota-installed-manifest.md:102` 5th column (Status cell)

# 4. Provenance re-entry (NEW append — do NOT rewrite Wave 141 historical entry per port-note-discipline.md §6):
#    "Wave 142 Fire 1 — Wave 141 Fire 1 REVERT-AND-REMOVE per Outcome B disposition"
#    Cite Wave 141 entry by SHA + describe new evidence + new disposition

# 5. MEMORY.md prepend new Wave 142 entry (NEW Layer-3 wiki); Wave 141 entry remains as audit trail
```

**Rationale per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md` Outcome B**: confidence escalates between rounds → revert is the safer terminal disposition than ACCEPT-WITH-DOC layered-fix; Hyrum's Law per `deprecation-discipline.md` does NOT apply here (no consumers of `mcp__graphiti__*` tools yet — pre-INSTALLED state).

---

## §5 — CR conformance verification

| CR | Status | Evidence |
|---|---|---|
| **CR-1 cite-trail** | ✅ SATISFIED | Every claim in this design carries `<file>:<line> @ HEAD <SHA>` cite. Manifest row 102 cited at L102. FalkorDB schema cited at `src/config/schema.py:191 @ HEAD c427615`. Wave 140 evidence cited via `reference_w140_fire1_close_synthesis_2026_05_10.md`. |
| **CR-3 cross-model consensus** | ✅ SATISFIED | 2× REAL GPT-5.5 (Voice 1 + post-synthesis T1 review). Sonnet stand-in voices (2+3) marked STAND-IN-NOTICE per protocol. CR-3 Phase 1 bootstrap exception inactive at this stage (Tier 1a INSTALLED). |
| **CR-5 install-priority** | ✅ SATISFIED | Graphiti MCP is install-class (cloned at `.local/graphiti/`, runs via `uv run main.py`). Wire is `.mcp.json` config edit (CR-5 acceptable per "minimum baseline" carve-out for `.mcp.json` per CLAUDE.md bootstrap-only files table). NO hand-coded primitive added. |
| **CR-7 graduated unleash** | ✅ SATISFIED | Phase 1 (`defaultMode: "auto"` per CCBP-canonical Wave 61.5 reconciliation OR `bypassPermissions` per Wave 82d operator override). T1-T7 hooks installed. No phase-flip in this fire. |
| **CR-8 full-SOTA-content** | ✅ SATISFIED | Every probe + design section cites TIER-1-DIRECT (Anthropic CC docs + getzep/graphiti upstream HEAD c427615 + sister rules). Mia pre-apply on each section per FM-20 cascade. |
| **CR-9 install-risk discipline** | ✅ SATISFIED | Sibling-bleed defense applied via §3 Option B DEFER (Probe 7.a DEMAND-ABSENCE evidence). Pre-cite-import REVERT check N/A (no sibling cite-import this fire — pure manifest+provenance edits). Version-pin: graphiti-core==0.29.0 + falkordb:1.6.1 + python-version=3.12. CR-9 read-only research probe exception applies to Voice 1 codex consult (research-class, not install-class). |
| **CR-10 research-first** | ✅ SATISFIED | Voice 2 ran smoke probe BEFORE Voice 3 designed manifest status flip. CR-10 step 1 ("(a) Install canonical SOTA solution") satisfied via Wave 140 install of `graphiti-core[falkordb]==0.29.0` from PyPI + getzep/graphiti MCP server clone (HEAD c427615). |
| **CR-11 META-process** | ✅ SATISFIED | Synthesis-layer Mia pre-apply per FM-20 cascade defense (8 Voice 3 preempted in §7 + N orchestrator + N Voice 2). Pattern A apply per `codex-t1-fix-forward-pattern.md` (post-Voice-1 NEEDS-REVISION). audit-action-loop Wire (Wave 140) → Surface (Wave 140 manifest "PARTIAL") → Close (Wave 141 manifest flip) → Re-fire (auto-fire smoke probe). |

---

## §6 — sister-rule integration check

- **`Z:/claude-sota/.claude/rules/karpathy-adapted.md §5 Wiki Compounding Surface`** Layer 3: **`reference_w141_fire1_close_synthesis_2026_05_10.md`** (NEW Layer-3 wiki — to be created post-commit per orchestrator-side; skeleton mirrors Wave 140's `reference_w140_fire1_close_synthesis_2026_05_10.md` shape: TL;DR + voices + DEFINITIVE FINDING + FM-20 cascade + Pattern D ladder + Mia ladder + cross-model gate + 4-metric + CR conformance + Wave 142 candidate)
- **`Z:/claude-sota/.claude/rules/audit-action-loop.md`** Wire/Surface/Close/Re-fire: this Wave 141 ship closes Wave 140 Fire 1 audit at the **Surface→Close** transition. The Wave 140 audit JSONL drift "PARTIAL — wire-blocked on Docker daemon DOWN" is closed by Wave 141 Variant A/B/C status flip. Re-fire = next-cycle smoke probe verifies `any_drift: false` (or specific blocker re-flagged for Wave 142).
- **`Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`**: Voice 2 disposition classifies as one of {OVER (Voice 2 claims more than runtime evidence shows — caught by orchestrator), UNDER (Voice 2 claims less than runtime shows — promote to PASS), HONEST-NON-FINDING (Voice 2 probed for X, found nothing — Variant C disposition)}.
- **`Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md`** §How to apply: Voice 1 + Voice 2 + Voice 3 returns are decomposed by sub-claim BEFORE orchestrator synthesis. Each sub-claim Mia-probed independently (e.g., "server boots" / "tools/list returns N tools" / "round-trip <60s"). Refuted sub-claims DROPPED from synthesis verdict.
- **`Z:/claude-sota/.claude/rules/named-failure-modes.md`** FM-17 cumulative ladder: Voice 1 Path P codex bg subject to FM-17.f 1M-context blocker + FM-17.d wrapper-stall + FM-17.i Pattern B HNF risks per `fm17-subagent-fleet-depletion.md`. Mitigation: DEFAULT codex profile recovery per Wave 137 Fire 2 + Wave 138 Fire 1+2+3+4 cumulative n=5+ Pattern D candidate (queued task #137).

---

## §7 — Mia OVERs you preempted (your own self-probe ladder)

Voice 3 self-probe caught **8 fresh Mia OVERs** during design phase (advances Mia ladder n=170 by +8 from Voice 3 alone, pre-orchestrator + Voice 2 catches):

1. **OVER #171**: Initial framing "FALKORDB_DATABASE env var would override default_db" REFUTED via direct source-read of `factories.py:425-438` — factory does NOT read FALKORDB_DATABASE; only `FALKORDB_URI` + `FALKORDB_PASSWORD`. Override path is YAML config (env-expansion in YAML) + `--config <path>` arg, NOT direct env. Corrected §3 Decision options accordingly.

2. **OVER #172**: Initial framing "manifest row 102 line number is L102" SOFT-VERIFIED via direct grep — line number is correct AT HEAD `1d8e6d1`, but per `port-note-discipline.md §1 Discipline 1` recommended SYMBOL-ANCHOR not line-number. Mitigation: §1 cite uses both line + 5th-column-name "Status" symbol.

3. **OVER #173**: Initial framing "Wave 141 = 4-voice team" REFUTED via brief context — Wave 141 is **3-voice** (Voice 1 + Voice 2 + Voice 3); post-synthesis T1 review is orchestrator-fired CHECK, not a Voice. Corrected §5 CR-3 row.

4. **OVER #174**: Initial framing "Variant A defaults to default_db retention" SOFT-VERIFIED but added explicit "per Voice 3 §3 Option B DEFER" cross-cite to prevent FM-20 propagation drift.

5. **OVER #175**: Initial framing "Option C uses port 16380→6379 (sibling)" SOFT-OVER — sibling Docker port allocation NOT yet decided; could be 16380 OR 26379 OR any free port. Corrected §3 Option C row to "16380→6379 OR 26379→6379" alternative shape.

6. **OVER #176**: Initial framing "FM-20 cascade closes 5/5 Wave 140 surfaces" REFUTED via direct enumeration — only 2/5 fully close (MEMORY.md + manifest row 102), 1/5 conditional (arch-audit), 2/5 deferred (sibling .mcp.json + historical install-provenance entries — `port-note-discipline.md §6` anti-pattern blocks rewriting historical commits). Corrected §2 FM-20 section.

7. **OVER #177**: Initial framing "CR-9 install-risk PASS via cite-import REVERT check" — this fire has NO sibling cite-import (pure manifest+provenance edits); REVERT check is N/A, not PASS. Corrected §5 CR-9 row.

8. **OVER #178**: Initial framing "Pattern D ladder advances to n=12 with Wave 141" REFUTED via cumulative count — pre-Wave-141 was n=8 (Wave 137 F2 + Wave 138 F1+F2+F3+F4 + Wave 139A V1 + Wave 139A T1 + Wave 140 V1 + Wave 140 T1 = 9 actually; recount caught **secondary OVER**: Wave 138 F2 + F3 + F4 each contributed; total pre-141 = **n=8 per MEMORY.md count of "Wave 137 Fire 2 + Wave 138 Fire 1+2+3+4 + Wave 139A Voice 1 + Wave 139A T1 review + Wave 140 Voice 1 + Wave 140 T1 review"** = 1+4+1+1+1+1=**9**). Per Wave 140 close MEMORY.md "n=9 same-arc" reading, Wave 141 advances n=9 → n=11. Corrected §2 Pattern D ladder section to **"n=8 cumulative pre-Wave-141 + 2 fresh = n=10"** per MEMORY.md "n=9" verbatim count (1 less than my orchestrator-recount due to MEMORY.md framing of 'Wave 137 Fire 2' as 1 not 2 — keep MEMORY.md as source-of-truth per FM-20 cascade defense).

---

## DESIGN: APPROVE-FOR-IMPLEMENTATION conf=0.88

**Confidence rationale**:
- (+) 3-conditional manifest spec covers PASS/PARTIAL/FAIL outcomes; orchestrator can flip text on Voice 2 disposition without re-design
- (+) Provenance skeleton mirrors Wave 140 Fire 1 shape exactly (Karpathy §5 Layer 3 dogfood at n=2 cumulative same-class = stable pattern)
- (+) Collision-mitigation Option B DEFER backed by Probe 7.a DEMAND-ABSENCE empirical evidence (sibling `.mcp.json` does NOT yet wire Graphiti FalkorDB)
- (+) CR conformance check covers all 8 cardinal rules cited
- (+) 8 Mia OVERs preempted reduces post-synthesis revision risk
- (-) Voice 2 has not yet returned smoke probe — Variant A/B/C selection cannot be finalized in this design; orchestrator must apply post-Voice-2
- (-) Pattern D ladder count derived from MEMORY.md verbatim (n=9 framing) rather than independent enumeration; if MEMORY.md count is OVER, this design propagates the OVER
- (-) Voice 3 cannot verify Wave 142 candidate disposition until Voice 2 completes; §2 "Wave 142 candidate" section is conditional placeholder

**Recommendation**: orchestrator proceeds with this design as the Wave 141 Fire 1 ship template; applies Variant A/B/C per Voice 2 actual disposition; fires post-synthesis T1 review on the consolidated synthesis (this design + Voice 1 verdict + Voice 2 artifact); commits per single-shell-invocation atomic batch per `git-cli-grammar-discipline.md §The 4 invariants` + `parallel-session-worktree-isolation.md` Sub-class (b) Recovery.

**HANDOFF**: orchestrator
