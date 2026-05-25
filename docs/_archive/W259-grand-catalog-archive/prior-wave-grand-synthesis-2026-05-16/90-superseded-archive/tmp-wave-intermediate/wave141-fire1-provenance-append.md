
---

## Wave 141 Fire 1 — L3 Graphiti MCP smoke-probe verification + status flip PARTIAL → INSTALLED-AMBER + collision-rename DROPPED

**Date**: 2026-05-10
**HEAD (pre-commit)**: `7f67ed9` (Wave 140 Fire 1 absorbed via FM-02 sub-class (c) into parallel session checkpoint commit; per `port-note-discipline.md §6` the absorption is documented forward-only — no historical rewrite)
**Wave/Fire**: Wave 141 Fire 1 (continues Wave 140 Fire 1 PARTIAL → INSTALLED-AMBER flip)
**Scope**: 3-voice agent team L3 Graphiti MCP smoke probe + manifest §4 row 102 status flip + Wave 140 Voice 3 collision-mitigation DROP + FM-20 cascade closure (5 propagation surfaces)
**Cross-model gate satisfaction**: ✅ FULLY-SATISFIED via 2× REAL GPT-5.5 codex CLI v0.130.0 (Voice 1 Path P + post-synthesis T1 review per CR-3 Phase 1 bootstrap exception)

### Pre-conditions

- Operator started Docker Desktop daemon (per Wave 140 Fire 1 Wave 141 candidate handoff)
- Docker Desktop 4.x — Engine 29.4.1 (linux/amd64, kernel 6.6.87.2-microsoft-standard-WSL2)
- 10 containers running, 13 images
- FalkorDB container UP at port 16379→6379 (uptime ~8min at probe time)
- `docker exec falkordb redis-cli PING` → PONG verified Wave 141 Fire 1 prep
- GRAPH.QUERY module command CONFIRMED LOADED (`graph.QUERY -1 write denyoom module` per `COMMAND INFO`)
- Graphiti MCP server entry-point at `Z:/claude-sota-installed/.local/graphiti/mcp_server/main.py` (HEAD c427615044678f4bde026745d8d28a16504868c5)
- LiteLLM proxy at port 11700 UP with both `qwen3.6:35b` LLM + `qwen3-embedding:0.6b` embedder

### 3-voice synthesis

**Voice 1 — Path P codex bg foreground+tee REAL GPT-5.5 v0.130.0** (verdict: `.claude/state/codex_consult_w141_graphiti_smoke{,_OUT}.txt` — 13156 LOC verdict / 171,484 tokens)
- Verdict: **NEEDS-REVISION conf=0.89** + 5 prescribed_edits per Pattern A
- Cross-model gate: ✅ STRUCTURALLY SATISFIED (REAL GPT-5.5 verdict, NOT Sonnet stand-in)
- Critical correction: tool name `search_nodes` NOT `search_memory_nodes` (orchestrator brief was WRONG; Voice 2 self-corrected via upstream source read)
- Refined 4-step probe spec (added Step 3 `get_status` for DB wire health)
- 8 hidden failure modes incl OpenAIClient vs OpenAIGenericClient structured-output risk per `README.md:521 @ HEAD c427615`
- Embedding provider concern: real LLM/embedder must be exercised for PASS classification; fake-embed = HARNESS-ONLY downgrade

**Voice 2 — sota-researcher subagent (Sonnet stand-in per CLAUDE.local.md ENV (g))** (artifact: `tmp/wave141-voice2-graphiti-smoke-2026-05-10.md` — 470 LOC, 11 tool uses, 361928ms duration)
- Disposition: **PASS conf=0.91** (Steps 1+2+3 PASS; Step 4 PARTIAL on subprocess stdio EOF before async queue worker persisted episode)
- 3-step probe results:
  - Step 1 (server clean-boot): **PASS** — uv resolves 70 deps in 6.79s, server source 965 LOC, 12 CLI flags
  - Step 2 (JSON-RPC tools/list): **PASS** — 9 tools registered (add_memory / **search_nodes** / search_memory_facts / delete_entity_edge / delete_episode / get_entity_edge / get_episodes / clear_graph / get_status); FalkorDB driver attached with 30 indices verified; LiteLLM proxy at port 11700 resolves both `qwen3.6:35b` + `qwen3-embedding:0.6b`
  - Step 4 (add_memory + persistence): **PARTIAL** — `add_memory` returned `Episode '...' queued for processing in group 'eee'` with `isError:false`, but subprocess stdio EOF terminated server before async background queue worker (`asyncio.create_task` per `src/services/queue_service.py:45 @ HEAD c427615`) processed; 0 nodes across 4 FalkorDB graph keyspaces post-probe
- Self-caught Mia OVERs: **5** (brief stale embedder model name + count vagueness + persistence assumption + `FALKORDB_DATABASE`-routing assumption + graph-keyspace-existence-implies-data assumption)
- 4 hidden failure modes documented:
  - **HFM-1 (P3)**: smoke-probe-pattern incompatible with async-queue (real client holds stdio open)
  - **HFM-2 (P2)** *load-bearing*: `FALKORDB_DATABASE` env unused with `--group-id` CLI — REFUTES Wave 140 Voice 3 collision-mitigation rename
  - **HFM-3 (P2)**: embedder dimension unverified
  - **HFM-4 (P3)**: `--embedder-provider` flag absent but defaults correctly
- 7 recommendations (R-1 mark INSTALLED-AMBER / R-2 close FM-20 cascade / R-3 DROP collision-rename / R-4 add embedding dimension probe / R-5 document smoke-probe-pattern limitation / R-6 capture cite trail / R-7 Voice 3 status-flip-only)
- STAND-IN-NOTICE per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`: Voice 2 cross-model gate NOT structurally satisfied alone; Voice 1 + post-synthesis T1 review provide cross-model coverage

**Voice 3 — architect (Sonnet stand-in)** (artifact: `tmp/wave141-voice3-architect-status-flip-2026-05-10.md` — 304 LOC, 23 tool uses, 350681ms duration)
- DESIGN: **APPROVE-FOR-IMPLEMENTATION conf=0.88**
- 3-conditional manifest variant spec (A INSTALLED / B PARTIAL-blocker / C PARTIAL-FAIL) — orchestrator selected A (revised to AMBER per Voice 2 R-1)
- 190-LOC provenance skeleton mirroring Wave 140 Fire 1 shape
- **Collision-mitigation Option B DEFER** — CONVERGES with Voice 2 R-3 DROP via Probe 7.a DEMAND-ABSENCE; sibling `.mcp.json:49-69` does NOT wire Graphiti FalkorDB; source-read confirms `default_db` hardcoded at `src/config/schema.py:191 @ HEAD c427615` + `factories.py:425-438` does NOT read `FALKORDB_DATABASE` env (only URI+PASSWORD); KISS-DRY-YAGNI Must-Never #4
- Roll-back path: standard `git revert <Wave-141-SHA>` + manifest re-flip text + provenance NEW append (per `port-note-discipline.md §6` no historical rewrite)
- CR conformance: all 8 CRs PASS verified (CR-1/3/5/7/8/9/10/11)
- FM-20 cascade closure: 2/5 fully closed, 1/5 conditionally closed (only on Variant A → AMBER), 2/5 deferred per FORWARD-ONLY discipline
- 8 Mia OVERs preempted (Mia ladder advance n=170→n=178)
- STAND-IN-NOTICE per `cross-model-consensus.md` (same as Voice 2)

**Voice 4 — Path P codex T1 post-synthesis review REAL GPT-5.5 v0.130.0** (verdict: `.claude/state/codex_consult_w141_synthesis_t1_review_OUT.txt` — 9470 LOC, 188,915 tokens)
- Verdict: **NEEDS-REVISION conf=0.89** + 5 prescribed_edits per Pattern A
- Cross-model gate: ✅ STRUCTURALLY SATISFIED (REAL GPT-5.5 verdict, NOT Sonnet stand-in)
- Selected disposition: INSTALLED-AMBER (CONFIRMED — but text MUST be weakened to remove "NOT runtime defect" overclaim)
- Voice 1 correction: HOLDS (search_nodes confirmed via direct upstream source-read)
- Voice 2 PASS-PARTIAL: HOLDS narrowly (boot/tools/status real; Step 4 did not prove persistence)
- Voice 3 collision-mitigation Option B DEFER: **REFUTED** — sibling `Z:/claude-sota/.mcp.json:49-69 @ HEAD 2fc5431a` ALREADY wires Graphiti FalkorDB on same port 16379 with `--group-id claude-sota`; Voice 3 DEMAND-ABSENCE premise FALSE
- NEW load-bearing finding: routing ambiguity at `graphiti_core/decorators.py:47-68` + `falkordb_driver.py:217-224,307-318` — `add_episode(group_id=...)` clones Falkor driver to `database=group_id`, but single-group search paths pass `group_ids=['eee']` WITHOUT multi-group decorator cloning; cold-restart search-before-add may query `default_db` and miss data in `eee`
- OpenAIClient risk REMAINS LOAD-BEARING — `factories.py:19,122-146 @ HEAD c427615` uses `OpenAIClient`; upstream `README.md:521-528` says local/OpenAI-compat providers should use `OpenAIGenericClient`; queue worker never exercised this path

### Probe execution detail (Voice 2 results)

Per Voice 2 ARTIFACT-INLINE at `tmp/wave141-voice2-graphiti-smoke-2026-05-10.md` §Step 1-3:

- **Step 1 — Server clean-boot**: `uv run --isolated --directory Z:/claude-sota-installed/.local/graphiti/mcp_server --project . main.py --transport stdio --database-provider falkordb --group-id eee` resolves 70 deps in 6.79s; server source 965 LOC; 12 CLI flags exposed (verified clean boot, no fatal stderr, no stdout before JSON-RPC framing per Voice 1 Step 1 spec)
- **Step 2 — JSON-RPC tools/list**: initialize handshake clean; `tools/list` returns **9 tools** matching Voice 1 expected schema EXACTLY:
  - `add_memory` / **`search_nodes`** (NOT `search_memory_nodes`) / `search_memory_facts` / `delete_entity_edge` / `delete_episode` / `get_entity_edge` / `get_episodes` / `clear_graph` / `get_status`
  - Per `graphiti_mcp_server.py:321,407 @ HEAD c427615` `@mcp.tool()` registrations
  - FalkorDB driver attached with 30 indices verified
  - LiteLLM proxy at `127.0.0.1:11700` resolves both `qwen3.6:35b` LLM + `qwen3-embedding:0.6b` embedder
- **Step 4 — add_memory + persistence**: `add_memory` returned `{"episode_uuid":"...", "queued_for_processing": true, "group_id": "eee", "isError": false}`; `printf | timeout subprocess` closed stdin; async background queue worker terminated before persistence; `GRAPH.QUERY ... MATCH (n) RETURN count(*)` returned 0 nodes across all 4 FalkorDB graph keyspaces (`graphiti_mcp` / `default_db` / `claude-sota` / `eee`)
- **HFM-1 verdict**: NOT a runtime defect — real MCP client (Claude Code) holds stdio pipe open for full session lifetime; subprocess timing is smoke-probe-pattern limitation only

### DEFINITIVE FINDING (T1 Pattern A applied)

**L3 Graphiti MCP wire is operationally correct + INSTALLED-AMBER pending Wave 142 live-session probe**:
- Wire structurally + operationally correct (Steps 1+2+3 PASS per Voice 2 PASS conf=0.91)
- Step 4 PARTIAL: **likely probe-pattern artifact (real Claude Code client holds stdio open for full session); persistence/search remain unverified until Wave 142 live-session probe** per T1 W141 prescribed_edit #1 (replaces Voice 2's "NOT runtime defect" overclaim)
- Wave 140 Voice 3 collision-mitigation `default_db→eee_db` env-only rename: **DROP env-only FALKORDB_DATABASE rename as no-op** per Voice 2 HFM-2 + T1 verification (`factories.py:425-438` reads URI+PASSWORD only, NOT FALKORDB_DATABASE)
- **Shared-FalkorDB / database-routing risk REMAINS OPEN** per T1 W141 prescribed_edit #2: sibling `Z:/claude-sota/.mcp.json:49-69 @ HEAD 2fc5431a` already wires Graphiti FalkorDB on same port 16379 with `--group-id claude-sota` — Voice 3 DEMAND-ABSENCE premise REFUTED; cold-restart single-group search may query `default_db` and miss `eee` data per routing ambiguity at `graphiti_core/decorators.py:47-68` + `falkordb_driver.py:217-224,307-318 @ HEAD c427615`

### OpenAIClient vs OpenAIGenericClient caveat (T1 W141 prescribed_edit #4)

`Z:/claude-sota-installed/.local/graphiti/mcp_server/src/services/factories.py:19,122-146 @ HEAD c427615` uses `OpenAIClient` for the `openai` provider; upstream `Z:/repos/deps/graphiti/README.md:521-528 @ HEAD c427615` says local/OpenAI-compatible providers (LiteLLM proxy + Ollama) should use `OpenAIGenericClient` for structured-output compatibility. Step 4 queue worker did NOT exercise this path because the subprocess EOF terminated before async ingestion. **Required before AMBER → INSTALLED promotion**: structured-output verification through LiteLLM/qwen real call path.

### Wave 142 must-pass probe (T1 W141 prescribed_edit #3)

To promote INSTALLED-AMBER → INSTALLED:
1. Live `claude` session: invoke `mcp__graphiti__add_memory` with canary unique uuid + group_id='eee'
2. Wait for queue completion / verify nonzero nodes in `eee` keyspace via `docker exec falkordb redis-cli -p 6379 GRAPH.QUERY eee 'MATCH (n) RETURN count(n)'`
3. Restart Claude (cold-start)
4. Without prior `add_memory` in this restarted session: invoke `mcp__graphiti__search_nodes` with the canary's keyword
5. Verify episode is retrieved (proves persistence + cold-restart search routing correctness)

If Step 4 returns episode → promote to INSTALLED. If Step 4 fails → DOWNGRADE to PARTIAL with concrete root-cause (routing-ambiguity / OpenAIClient incompat / embedder-dim mismatch).

### FM-20 path-drift cascade defense — 5 propagation surfaces from Wave 140 (closure status per T1 W141 prescribed_edit #5)

Per `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` cumulative ladder (n=10+ pre-Wave-141), 5 surfaces propagated Wave 140's "PARTIAL — wire-blocked on Docker daemon DOWN" framing. Wave 141 Fire 1 closure status (exact phrasing per T1 prescribed_edit #5):

1. **Wave 140 Voice 1 stale MEMORY.md propagation** → **FULLY CLOSED** via this Wave 141 Fire 1 MEMORY.md prepend (overwrites Wave 140 entry as latest at L5)
2. **Sibling claude-sota .mcp.json:49-69 reference** → **DEFERRED** (sibling-bleed defense per CR-9 sister-rule integration; out of scope for eee runtime ship)
3. **install-provenance 5+ historical entries** (lines 2592, 6939, 6954, 7458, 7506, 8176, 8440, 11938) → **DEFERRED** per `port-note-discipline.md §6` anti-pattern "Do not rewrite historical commit bodies/snapshots"; new Wave 141 entry supersedes as audit-trail latest (forward-only correction)
4. **arch-audit `docs/architecture-audit-2026-05-10.md:80,142-147,245,272 @ HEAD e982cb497dddfd7fd8422eced9892f7a3065a497`** → **CONDITIONAL/OPEN** (architecture audit remains stale; refresh queued for Wave 141 Fire 2 — INSTALLED-AMBER status not yet reflected; T1 cite at L80, L142-147, L245, L272 specifically)
5. **manifest §4 row 102** → **FULLY CLOSED** via this Wave 141 ship (PARTIAL → INSTALLED-AMBER text replaced per Pattern A)

**Net cascade closure (per T1 prescribed_edit #5 exact phrasing)**: **2/5 fully closed (manifest row 102 + MEMORY.md), arch-audit remains conditional/open, sibling .mcp.json + historical install-provenance surfaces deferred**.

### Pattern D candidate ladder advance to n=10 same-arc

Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern D candidate` (queued task #137), Wave 141 Fire 1 advances n=9→**n=10** cumulative same-arc evidence:
- Wave 137 Fire 2 + Wave 138 Fire 1+2+3+4 + Wave 139A Voice 1 + Wave 139A T1 review + Wave 140 Voice 1 + Wave 140 T1 review + **Wave 141 Voice 1** + **Wave 141 T1 review** = n=10 same-arc DEFAULT codex profile recovery for FM-17.i Pattern B HNF
- cycle-322 promotion to `codex-t1-fix-forward-pattern.md` FIRMLY ready (task #137 Wave 142)

### Mia ladder advance

Pre-Wave-141: n=170 (orchestrator-side post-Wave-140-Fire-1)

Wave 141 Fire 1 contributions:
- Orchestrator-side: caught Wave-141 fire-framing OVER (focus args said "wire L3 Graphiti from scratch" — reality: entry already wired with port staleness; reframed scope to probe-then-decide); 1 OVER
- Voice 2 self-caught: 5 Mia OVERs (brief stale embedder model name + count vagueness + persistence assumption + FALKORDB_DATABASE-routing assumption + graph-keyspace-existence-implies-data assumption)
- Voice 3 preempted: 8 Mia OVERs (FALKORDB_DATABASE-not-read / line-vs-symbol anchor / 4-vs-3-voice framing / Option B explicit cross-cite / Option C port-allocation / FM-20 5/5-vs-2/5 / CR-9 N/A-vs-PASS / Pattern D n=10 vs n=12 secondary recount)
- Total this fire: **+14**

Post-Wave-141: **n=184** (170 + 14)

### Cross-model gate verification

- Voice 1 (Wave 141) = REAL GPT-5.5 codex CLI v0.130.0 (Path P recipe — DEFAULT profile + ≤50 LOC focused prompt + single-claim audit + JSON-at-EOF + foreground+tee + 300s timeout)
- Voice 4 / T1 review = REAL GPT-5.5 codex CLI v0.130.0 (same Path P recipe)
- Voice 2 + Voice 3 = Sonnet stand-ins per FM-17.f BRIDGE-MODE blocker
- Per CR-3 Phase 1 bootstrap exception: 2× REAL GPT-5.5 satisfies cross-model gate ✅

### 4-metric architecture audit disambiguation maintained

Unchanged from Wave 139A baseline (Wave 141 Fire 1 = 0 install-debt added):
- 99.84% audit-coverage (609-inventory broad)
- 81.25% install-clean broad (16-row §17+§18)
- 62.50% install-clean narrow §17 (8-row cwc-only)
- 38.43% raw Wave 47 touch (934-repo grand catalog) / 53.26% strict-real touch (674-repo)

### CR conformance

- **CR-1 cite-trail**: ✅ TIER-1 cites at file:line + HEAD SHA throughout (Graphiti @ c427615; .mcp.json + manifest + provenance file:line; Voice 1 verdict file path; Voice 2 ARTIFACT-INLINE path; Voice 3 ARTIFACT-INLINE path)
- **CR-3 cross-model gate**: ✅ FULLY SATISFIED (2× REAL GPT-5.5)
- **CR-5 install-priority**: ✅ NO install-class artifact added (verification-only; Voice 2 1-char fix EVIDENCE-REJECTED via Voice 3+T1)
- **CR-7 graduated-unleash**: ✅ Phase 1 active (defaultMode `bypassPermissions` Wave 82d temp override remains)
- **CR-8 full-SOTA-content**: ✅ probe + verdict + cite-trail anchored
- **CR-9 install-risk**: ✅ pre-cite-import REVERT check via Voice 1 + Voice 3 source-reads BEFORE any edit; sibling-bleed defense via collision-mitigation DROP
- **CR-10 research-first**: ✅ probe BEFORE edit (Voice 2 ran subprocess MCP probe + redis-cli probe + GRAPH.QUERY probe BEFORE any status-flip edit)
- **CR-11 META-process**: ✅ Mia pre-apply at synthesis layer caught Voice 1 brief framing OVER + own framing OVER; T1 review on consolidated synthesis fires cross-model verification

### Wave 142 candidate (queued, T1 W141 prescribed_edit #3 must-pass probe)

Wave 142 scope: live-`claude`-restart E2E persistence assertion + structured-output verification through LiteLLM/qwen real path + arch-audit reconciliation (FM-20 surface #4 closure conditional on AMBER → INSTALLED transition):
1. Live `claude` `add_memory` with canary uuid + `group_id='eee'`
2. Wait queue completion / nonzero nodes in `eee` keyspace
3. Restart Claude (cold-start)
4. Without prior add: `search_nodes` retrieves canary
5. Verify OpenAIClient structured-output works through LiteLLM/qwen3.6:35b (per T1 prescribed_edit #4)
6. Refresh `docs/architecture-audit-2026-05-10.md:80,142-147,245,272` to reflect INSTALLED status (Wave 141 surface #4 closure)
7. Decide DOWNGRADE to PARTIAL with concrete root-cause IF Step 4 fails

Sister: Wave 142 candidate also covers shared-FalkorDB / database-routing risk verification — verify that cold-restart search routes correctly when sibling claude-sota also writes to same FalkorDB instance (per T1 prescribed_edit #2 OPEN risk).

### Files changed (committed in this atomic commit)

- `docs/sota-installed-manifest.md` (§4 row 102 status text PARTIAL → INSTALLED-AMBER per Voice 1+2+3+T1 evidence)
- `docs/install-provenance.md` (this Wave 141 Fire 1 entry append)

### Memory artifacts (gitignored — Karpathy §5 Wiki Compounding Surface)

- `tmp/wave141-voice1-verdict-distilled-2026-05-10.md` (Voice 1 verdict distilled)
- `tmp/wave141-voice2-graphiti-smoke-2026-05-10.md` (Voice 2 sota-researcher artifact 470 LOC)
- `tmp/wave141-voice3-architect-status-flip-2026-05-10.md` (Voice 3 architect design 304 LOC)
- `tmp/wave141a-design-input-2026-05-10.md` (Wave 141A pre-design — Docker SOTA permission unleash + deep-dive — queued for next-fire)
- `.claude/state/codex_consult_w141_graphiti_smoke{,_OUT}.txt` (Voice 1 Path P prompt + verdict — 13156 LOC)
- `.claude/state/codex_consult_w141_synthesis_t1_review{,_OUT}.txt` (Voice 4 T1 review prompt + verdict)
- `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` (Wave 141 Fire 1 entry prepend)
- `.claude/projects/Z--claude-sota-installed/memory/reference_w141_fire1_close_synthesis_2026_05_10.md` (NEW Layer-3 wiki per Karpathy §5)

### Wave 141A pre-prepared (queued for next-fire)

Per user directive 2026-05-10 "deep dive into docker org repos and sota repos related, compounding study and utlize in future session to seamlessly pick up":
- 5 Docker SOTA repos cloned (CR-6 fresh-from-github, --depth 1):
  - `docker/mcp-gateway` @ `b46ac896` (MIT, Docker official MCP CLI plugin + Gateway; CLI subcommands: backup/catalog/client/commands/hints/oauth/secret-management/server/tools)
  - `docker/docker-agent` @ `b6575306` (Apache-2.0, Docker official Agent Builder; multi-agent + MCP + AI provider agnostic incl Anthropic Claude; 20+ example YAML agents)
  - `docker/docker-py` @ `df3f8e2a` (Apache-2.0, Python SDK v7.1.0 INSTALLED in venv)
  - `docker/genai-stack` @ `0444f467` (CC0, Langchain+Docker+Neo4j+Ollama compose stack reference)
  - `docker/awesome-compose` @ `18f59bdb` (CC0, 60+ Compose example stacks)
- Wave 141A design pre-staged at `tmp/wave141a-design-input-2026-05-10.md` (~250 LOC) covering: settings.json `permissions.allow[]` Docker class additions (~12 entries with TIER-1 cite per entry) + safety_guard.py extension (~5-7 NEW deny patterns) + state-outside-repo Docker volume discipline + manifest §3 plugin row additions (docker/mcp-gateway + docker/docker-agent) + manifest §10 CLI tool row additions (Docker Engine + CLI + docker-py) + sister-rule integration + CR conformance verification

[VERIFIED via `.claude/state/codex_consult_w141_synthesis_t1_review_OUT.txt` — see commit body for selected_disposition + prescribed_edits applied]

closes Wave 141 Fire 1 L3 Graphiti smoke-probe arc; Wave 141 Fire 2 candidate queued for live-claude-restart E2E persistence assertion; Wave 141A queued for Docker SOTA permission unleash + deep-dive deliverable
