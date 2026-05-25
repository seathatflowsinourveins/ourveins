

---

## Wave 140 Fire 1 — L3 Graphiti MCP probe + Voice 2 1-char fix REJECTED via T1 evidence (2026-05-10)

**Trigger**: Wave 139A focus args identified L3 Graphiti MCP wire as P0 UNBLOCKED next-fire (no FM-17.f dependency); 3-voice agent team dispatched per advanced-agent-team-standing-directive.

**Disposition**: 3-voice convergence achieved with CRITICAL DIVERGENCE caught at orchestrator-side. T1 cross-model review verdict NEEDS-REVISION conf=0.93 selected_option=B prescribed PROCEDURAL probe-then-decide. Pattern A applied. Wire fix DEFERRED to Wave 141 (operator must restart Docker Desktop + FalkorDB container on 16379 first).

### 3-voice agent team (Wave 140 Fire 1)

| Voice | Agent type | Verdict | Tool count | Wall time | Cross-model gate |
|---|---|---|---|---|---|
| 1 | Path P codex T1 (DEFAULT profile, Pattern D candidate) | APPROVE conf=0.94 + 0 prescribed_edits | n/a | ~3min | FULL (REAL GPT-5.5 codex CLI v0.130.0) |
| 2 | sota-researcher (Sonnet stand-in) | NEEDS-CONFIG-DECISION + 1-char port fix | 27 | 314s | STAND-IN per CLAUDE.local.md ENV (g) |
| 3 | architect (Sonnet stand-in) | APPROVE-FOR-IMPLEMENTATION + 4 Mia OVERs preempted | 8 | 197s | STAND-IN per CLAUDE.local.md ENV (g) |
| T1 review | Path P codex T1 (DEFAULT profile, Pattern D candidate) | NEEDS-REVISION conf=0.93 + 6 prescribed_edits + selected_option=B | n/a | ~4min | FULL (REAL GPT-5.5 codex CLI v0.130.0) |

### Voice 1 verdict (REAL GPT-5.5 Path P)

- Verdict file: `.claude/state/codex_consult_w140_graphiti_mcp_config_OUT.txt` (4577 LOC, 395KB)
- VERDICT: APPROVE conf=0.94 + 0 prescribed_edits
- Cited Z:/claude-sota-installed/.local/graphiti/mcp_server/main.py:8-11,22-26 + config/config.yaml:73-80 + src/services/factories.py:421-438 + src/graphiti_mcp_server.py:212-230
- 4 concerns: docs/manifest stale; OPENAI_API_KEY=ollama placeholder; EMBEDDING_DIM dead; uv PATH mention
- **CRITICAL OVER**: cited MEMORY.md (FalkorDB UP @ port 16379) WITHOUT runtime probe — propagated stale claim from Wave 105+ era
- Cross-model gate FULL via REAL GPT-5.5 (DEFAULT codex profile recovery 7th-time KEY UNLOCK same-arc)

### Voice 2 verdict (Sonnet stand-in sota-researcher)

- Deliverable: `tmp/wave140-voice2-graphiti-mcp-verify-2026-05-10.md` (350 LOC)
- VERDICT: NEEDS-CONFIG-DECISION (1-char port fix `.mcp.json:72` `16379` → `6379`)
- Ran netstat probe — found port 6379 LISTENING (redis-server.exe PID 6984), port 16379 NOT LISTENING, Docker daemon DOWN
- 3 fresh Mia OVERs caught:
  - OVER #1: MEMORY.md L9 "FalkorDB v1.6.1 Docker container UP at port 16379 PING/PONG" REFUTED via netstat
  - OVER #2: manifest §4 row 102 "MCP wiring INCOMPLETE" REFUTED via direct grep returning lines 49-82 entry
  - OVER #3: own pre-apply candidate "FalkorDB Docker container UP" propagating MEMORY.md uncorrected — caught via docker probe failure
- Recommended Wave 140 Fire 2 (port fix) + Fire 3 (manifest reconciliation) + Fire 4 (env redundancy investigation)

### Voice 3 verdict (Sonnet stand-in architect)

- Deliverable (ARTIFACT-INLINE persisted by orchestrator per FM-19): `tmp/wave140-voice3-architect-graphiti-design-2026-05-10.md` (312 LOC)
- VERDICT: APPROVE-FOR-IMPLEMENTATION + 4 Mia OVERs preempted (orchestrator ladder n=128→n=132)
- Mia OVER #129: manifest staleness (FM-20 cascade)
- Mia OVER #130: brief-OVER "design green-field entry" (entry already exists)
- Mia OVER #131: cross-voice scope-collision risk (preempted)
- Mia OVER #132: **NEW LOAD-BEARING** — port 16379 + default_db collision between eee runtime + sibling claude-sota; mitigation `FALKORDB_DATABASE=eee_db`
- 3-step smoke probe spec (47 LOC) — server start verification + tool list verification + memory operation end-to-end
- Roll-back path: atomic single-file `git checkout HEAD -- .mcp.json` + eee restart (no data loss; FalkorDB volume persists)

### T1 cross-model review verdict (REAL GPT-5.5 Path P)

- Verdict file: `.claude/state/codex_consult_w140_synthesis_t1_review_OUT.txt` (4868 LOC, 500KB)
- VERDICT: NEEDS-REVISION conf=0.93 + selected_option=B + 6 prescribed_edits
- Voice 1 assessment: "OVER-confident on wire disposition (cited MEMORY.md without runtime probe); credible only on entry shape compatibility"
- Voice 2 assessment: "correctly caught live-port drift; 1-char fix prescription INCOMPLETE because didn't verify FalkorDB module on 6379"
- Voice 3 assessment: "port collision warning is LOAD-BEARING sibling-bleed class risk"
- FM-20 path-drift cascade ladder advance to n=9+ minimum (potentially n=10+ counting arch-audit Gap 1 separately)
- 6 prescribed_edits = PROCEDURAL probe-then-decide (NOT pure file-edits)

### T1-prescribed probe execution (Pattern A apply this fire)

**Step 1**: redis-py 7.1.0 socket probe to 127.0.0.1:6379

```
PING: True
INFO server redis_version: 5.0.14.1
MODULE LIST: (empty — NO modules loaded)
COMMAND INFO GRAPH.QUERY: NoneType (command does NOT exist)
```

**Step 2**: Process binary identification

```
Path: C:\Users\42\redis\redis-server.exe
Description: Redis for Windows, based on MS OpenTech port
```

**Step 3**: Docker daemon verification

```
docker version → Client v29.4.1 INSTALLED; Daemon UNREACHABLE (npipe error)
docker ps → daemon-unreachable
```

**DEFINITIVE FINDING**: port 6379 = MS-OpenTech plain Redis 5.0.14.1 (2016 Windows port from `https://github.com/MicrosoftArchive/redis`). NO FalkorDB module. NO GRAPH.QUERY. Voice 2's 1-char fix would BREAK the wire (move from "down 16379" to "wrong-engine 6379").

### T1 prescribed_edit #4 fires

> "If 6379 is plain Redis or GRAPH.QUERY is absent, do not apply the 1-char port fix; either restore Docker Desktop plus the FalkorDB container on 16379 to match current config, or make an explicit backend migration decision with fresh evidence."

**Disposition**: KEEP `.mcp.json:72` at port 16379. DEFER actual smoke probe to Wave 141 after operator restarts Docker Desktop.

### Pattern D candidate ladder advance — n=9 same-arc KEY UNLOCK

| # | Wave/Fire | Voice | Profile | Verdict |
|---|---|---|---|---|
| 1 | Wave 137 Fire 2 | Voice 1 | DEFAULT | NEEDS-REVISION conf=0.86 |
| 2 | Wave 138 Fire 1 | Voice 1 | DEFAULT | NEEDS-REVISION conf=0.88 |
| 3 | Wave 138 Fire 2 | Voice 1 | DEFAULT | NEEDS-REVISION conf=0.88 |
| 4 | Wave 138 Fire 3 | Voice 1 | DEFAULT | APPROVE conf=0.84 |
| 5 | Wave 138 Fire 4 | Voice 1 | DEFAULT | NEEDS-REVISION conf=0.88 |
| 6 | Wave 139A | Voice 1 | DEFAULT | NEEDS-REVISION conf=0.92 |
| 7 | Wave 139A | T1 review | DEFAULT | NEEDS-REVISION conf=0.93 |
| 8 | Wave 140 | Voice 1 | DEFAULT | APPROVE conf=0.94 |
| 9 | Wave 140 | T1 review | DEFAULT | NEEDS-REVISION conf=0.93 |

cycle-322 promotion to `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` FIRMLY ready as Pattern D codification (task #137).

### FM-20 path-drift cascade — 5 propagation surfaces caught

1. Voice 1 MEMORY.md/provenance propagation of stale 16379-UP evidence
2. Sibling `Z:/claude-sota/.mcp.json:49-69` still targets 16379 + LiteLLM:4000
3. `docs/install-provenance.md` 5+ entries citing FalkorDB Docker UP @ 16379 (lines 2592-2593, 7458, 8176, 8440, 11938)
4. `docs/architecture-audit-2026-05-10.md:142-147` stale 16379-UP claim
5. `docs/sota-installed-manifest.md:102` "MCP wiring INCOMPLETE" stale (Wave 105)

### Cross-model gate satisfaction status

**FULLY SATISFIED** via 2× REAL GPT-5.5 codex CLI v0.130.0 dispatches (Voice 1 + T1 review). Per CR-3 Phase 1 bootstrap exception: orchestrator-side `codex exec` foreground+tee dispatch satisfies cross-model gate.

Standing-directive ≥2 GPT-5.5 BRIDGE-MODE unsatisfiable in current session due to FM-17.f. Documented as known-limitation per `fm17-subagent-fleet-depletion.md §FM-17.f` STAND-IN-NOTICE convention.

### CR conformance for THIS fire

| CR | Conformance |
|---|---|
| CR-1 cite-trail | TIER-1 cites: Graphiti @ HEAD c427615 + .mcp.json file:line + Wave 140 Voice 1+2+3 + T1 review |
| CR-3 cross-model gate | FULLY SATISFIED via 2× REAL GPT-5.5 (Phase 1 bootstrap exception) |
| CR-5 install-priority | NO install-class artifact added (verification-only; Voice 2 fix EVIDENCE-REJECTED) |
| CR-6 fresh-from-github | Graphiti HEAD c427615 verified as latest (zero drift since Wave 105) |
| CR-7 graduated-unleash | Phase 1 active (defaultMode: bypassPermissions per Wave 82d temporary override) |
| CR-8 full-SOTA-content | All edits cite-trail-anchored to upstream Graphiti + Wave 140 evidence |
| CR-9 install-risk | T1 prescribed_edit #1 = "do not edit .mcp.json until probe" applied; pre-cite-import REVERT check via T1 |
| CR-10 research-first | Probe BEFORE edit (Voice 2 netstat; Wave 140 Fire 1 redis-py module probe) |
| CR-11 META-process | Per ALWAYS LAUNCH ADVANCED AGENT TEAM standing-directive; Mia at synthesis layer caught Voice 1 OVER |
| CR-12 upstream-install-priority | Honored — defer install pending Wave 141 operator-Docker-restart prerequisite |

### FM tracker

| FM | Status |
|---|---|
| FM-09 codex-rescue blind-spot | n=6/6 100% base rate STILL holds (no codex-rescue dispatched this fire) |
| FM-17.f 1M-context blocker | n=4 firm (no advance this fire — no codex-rescue attempted) |
| FM-17.i Pattern B HNF (Pattern D candidate) | **n=9 same-arc** ladder — Wave 139 codification queued task #137 (FIRMLY ready) |
| FM-20 path-drift cascade | **5 fresh propagation surfaces caught** — cumulative ladder advances minimum n=9+, potentially n=10+ |
| Mia ladder | n=170 (orchestrator-side caught Voice 1 OVER + own framing OVER + Voice 3 4 OVERs preempted + Voice 2 3 self-OVERs) |

### Architecture SOTA-cleanliness

**~83-87% maintained** — no install-debt added (verification-only fire); evidence-driven REJECT prevents wrong-direction adoption (Voice 2's 1-char fix would have moved wire to plain Redis); Wave 141 stages clean operator-Docker-restart path.

### Files changed (committed in this atomic commit)

- `docs/sota-installed-manifest.md` (§4 row 102 status text correction — PARTIAL still, but cause clarified)
- `docs/install-provenance.md` (this entry append)
- `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` (Wave 140 Fire 1 entry prepend)
- `.claude/projects/Z--claude-sota-installed/memory/reference_w140_fire1_close_synthesis_2026_05_10.md` (NEW Layer-3 wiki per Karpathy §5)

### Memory artifacts (gitignored)

- `tmp/wave140-voice2-graphiti-mcp-verify-2026-05-10.md` (350 LOC)
- `tmp/wave140-voice3-architect-graphiti-design-2026-05-10.md` (312 LOC ARTIFACT-INLINE persisted by orchestrator per FM-19)
- `.claude/state/codex_consult_w140_graphiti_mcp_config{,_OUT}.txt` (Voice 1 prompt 86 LOC + verdict 4577 LOC)
- `.claude/state/codex_consult_w140_synthesis_t1_review{,_OUT}.txt` (T1 review prompt 60 LOC + verdict 4868 LOC)

### Wave 141 candidate queued (operator-Docker-restart prerequisite)

**Pre-conditions**: Operator must:
1. Start Docker Desktop daemon
2. `docker pull falkordb/falkordb:1.6.1`
3. `docker run -d -p 16379:6379 --name falkordb falkordb/falkordb:1.6.1`
4. Verify: `docker exec falkordb redis-cli PING` returns PONG

**Wave 141 Fire 1**: Auto-fire smoke probe per Voice 3 §3 spec:
- Step 1: server start verification (uv run main.py from operator shell)
- Step 2: tool list verification (≥5 mcp__graphiti__* tools post-CC-restart)
- Step 3: add_episode + search_memory_nodes round-trip <60s

**Wave 141 Fire 2**: Decide `default_db` → `eee_db` per Voice 3 collision-mitigation (sibling-bleed defense)

**Wave 141 Fire 3**: Manifest §4 row 102 status flip PARTIAL → INSTALLED + reconcile arch-audit §3 Gap 1 + reconcile install-provenance.md historical 16379 references (FM-20 cascade closure)
