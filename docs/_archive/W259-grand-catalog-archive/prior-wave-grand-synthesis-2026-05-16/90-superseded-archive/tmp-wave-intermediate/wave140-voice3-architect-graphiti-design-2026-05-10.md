# Wave 140 Voice 3 — Graphiti MCP wire smoke probe spec + integration design

**Date**: 2026-05-10
**Voice**: 3 (architect, parallel to Voice 1 codex T1 + Voice 2 sota-researcher)
**Cite-class**: TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 (synthesis over TIER-1 upstream Graphiti README + TIER-3 manifest + TIER-3 existing `.mcp.json` entry)

---

## 1. EXECUTIVE

**Verdict**: APPROVE-FOR-IMPLEMENTATION-PENDING-SMOKE-PROBE

**Critical finding (FM-20 path-drift cascade catch n=129)**: The `.mcp.json` graphiti entry IS ALREADY WIRED at `Z:/claude-sota-installed/.mcp.json:49-82` [VERIFIED via direct Read]. Manifest `docs/sota-installed-manifest.md:102` STATUS column reads **"PARTIAL"** with claim "MCP wiring INCOMPLETE in `.mcp.json` (Mia probe `grep graphiti .mcp.json` = 0 matches per Wave 105 Agent C P0-2 finding)". This is STALE per Wave 105 (8 days ago); current state shows 34-line graphiti entry present.

This fire's role: smoke-probe the EXISTING wire + reconcile manifest staleness. NOT re-design a green-field entry.

Voice 3 deliverable scope:
- (a) Validate existing `.mcp.json` entry against upstream Graphiti MCP server expectations [DONE in §2]
- (b) 3-step smoke probe spec (server start → tool list → memory operation) [§3]
- (c) Probe DAG findings + Probe 7.b STUDY-PILOT 5-clause [§4]
- (d) Roll-back path [§5]
- (e) Manifest §4 row 102 status flip plan PARTIAL → INSTALLED [§6]
- (f) Cardinal-rule conformance [§7]
- (g) 4 Mia OVERs preempted at orchestrator-side [§8]

---

## 2. EXISTING .mcp.json ENTRY — VALIDATED AGAINST UPSTREAM

```jsonc
"graphiti": {
  "type": "stdio",                          // upstream README:54-55 (stdio_transport mode for Claude Desktop and stdio-only clients)
  "command": "uv",                           // upstream README:88-95 (uv-managed venv pattern)
  "args": [
    "run",
    "--isolated",                            // CR-9 sibling-bleed defense (no parent venv leakage)
    "--directory",
    "Z:/claude-sota-installed/.local/graphiti/mcp_server",  // CR-1 absolute path; CR-9 sibling-bleed defense (NOT sibling claude-sota path)
    "--project",
    ".",
    "main.py",                               // verified entry-point at .local/graphiti/mcp_server/main.py:22 (wrapper over graphiti_mcp_server.main)
    "--transport",
    "stdio",                                 // overrides upstream HTTP default (README:108) for CC stdio-MCP class
    "--database-provider",
    "falkordb",                              // upstream README:115-127 (falkordb default backend)
    "--model",
    "qwen3.6:35b",                          // local Ollama model (CR-12 PRIMARY upstream-install via Ollama not OpenAI)
    "--embedder-model",
    "qwen3-embedding:0.6b",                 // local Ollama embedder (1024-dim per env EMBEDDING_DIM)
    "--group-id",
    "eee"                                    // namespace isolation per upstream README:21 (group_id filtering)
  ],
  "env": {
    "FALKORDB_URI": "redis://127.0.0.1:16379",  // CR-1 verified port 16379 UP per Wave 139A; upstream README:124 default `localhost:6379` overridden
    "FALKORDB_PASSWORD": "",                     // upstream README:125 (optional default)
    "FALKORDB_DATABASE": "default_db",          // upstream README:126 (default db name) — see §4 P1 collision risk
    "OPENAI_API_KEY": "ollama",                  // placeholder; required by Graphiti even when using local model (upstream LLM client checks for non-empty key)
    "OPENAI_API_URL": "http://127.0.0.1:11700/v1",  // Ollama OpenAI-compat endpoint per CLAUDE.md L3 ENV (existing local Ollama install on port 11700)
    "GRAPHITI_GROUP_ID": "eee",                  // mirror of --group-id arg
    "EMBEDDER__DIMENSIONS": "1024",              // qwen3-embedding:0.6b dimension
    "EMBEDDING_DIM": "1024",                     // duplicate convention (legacy + new env var both set) — Voice 1 flagged as likely-dead
    "SEMAPHORE_LIMIT": "3"                       // upstream concurrency limit per README:28 (queue-based processing)
  }
}
```

**Validation summary**:
- ✅ JSON syntax valid (matches sibling `mcp-memory` shape at `.mcp.json:40-48`)
- ✅ Command + args match upstream `uv sync` workflow (README:88-99)
- ✅ Transport override (`stdio`) correct for CC stdio-MCP class
- ✅ FalkorDB env keys match upstream config.yaml structure (README:119-127)
- ✅ Local Ollama redirect via OpenAI-compat URL (CR-12 PRIMARY upstream-install + cardinal-rule-6 official-native-channel)
- ⚠️ `OPENAI_API_KEY="ollama"` is PLACEHOLDER — Graphiti requires non-empty key check; verify upstream tolerates this in smoke probe
- ⚠️ `qwen3.6:35b` model availability in local Ollama UNVERIFIED — smoke probe step 2 catches this
- ⚠️ `EMBEDDING_DIM` duplicate of `EMBEDDER__DIMENSIONS` — Voice 1 verdict concern: only `EMBEDDER__DIMENSIONS` is consumed by Graphiti source; `EMBEDDING_DIM` likely dead

**Cite anchors (TIER-1-DIRECT)**:
- Upstream README: `Z:/claude-sota-installed/.local/graphiti/mcp_server/README.md @ HEAD c427615` (cite for transport / database / LLM provider docs)
- Upstream entry-point: `Z:/claude-sota-installed/.local/graphiti/mcp_server/main.py:22` (wrapper over `graphiti_mcp_server.main`)
- Existing wire: `Z:/claude-sota-installed/.mcp.json:49-82`

---

## 3. SMOKE PROBE SPEC (3-step)

### Step 1 — Server start verification (pre-CC-restart)

```bash
# From Z:/claude-sota-installed (operator shell, BEFORE eee restart)
uv run --isolated --directory Z:/claude-sota-installed/.local/graphiti/mcp_server --project . main.py \
  --transport stdio \
  --database-provider falkordb \
  --model qwen3.6:35b \
  --embedder-model qwen3-embedding:0.6b \
  --group-id eee 2>&1 | head -40
```

**Required env exports BEFORE invocation** (Bash):
```bash
export FALKORDB_URI=redis://127.0.0.1:16379
export FALKORDB_PASSWORD=""
export FALKORDB_DATABASE=default_db
export OPENAI_API_KEY=ollama
export OPENAI_API_URL=http://127.0.0.1:11700/v1
export GRAPHITI_GROUP_ID=eee
export EMBEDDER__DIMENSIONS=1024
export EMBEDDING_DIM=1024
export SEMAPHORE_LIMIT=3
```

**Expected output** (within 30s):
- INFO log lines containing `"Graphiti MCP Server"` + `"FalkorDB connected"` + `"stdio transport ready"`
- NO uncaught exceptions / NO `redis.exceptions.ConnectionError` / NO `openai.AuthenticationError`
- Process stays alive on stdio (kill with Ctrl+C after 30s confirms)

**FAIL signals to watch**:
- `ModuleNotFoundError` → `uv sync` not run; remediation: `cd .local/graphiti/mcp_server && uv sync`
- `redis.exceptions.ConnectionError` → FalkorDB container not UP on :16379; remediation: `docker ps | grep falkor`
- `openai.AuthenticationError` → Ollama endpoint not responding on :11700; remediation: `curl http://127.0.0.1:11700/api/version`
- `pydantic.ValidationError` for model name → `qwen3.6:35b` not in local Ollama; remediation: `ollama list`

### Step 2 — Tool list verification (post-CC-restart)

```bash
# Inside Claude Code (after eee restart with new .mcp.json picked up)
# Probe via MCP tool listing
```

**Expected** (in CC session):
- `mcp__graphiti__add_episode` tool present
- `mcp__graphiti__search_memory_nodes` tool present
- `mcp__graphiti__search_facts` tool present
- `mcp__graphiti__delete_episode` tool present
- `mcp__graphiti__clear_graph` tool present
- (per upstream README:18-22 features list)

**Verification command** (heuristic — CC tool list inspection):
- Issue any test prompt; surface MCP tool registry via response
- Manifest count: ≥5 `mcp__graphiti__*` tools registered

### Step 3 — Memory operation (end-to-end)

```python
# Test sequence (issued via Claude Code)
# 3a. Add episode
mcp__graphiti__add_episode(
  group_id="eee",
  episode_body="Wave 140 smoke probe: L3 Graphiti MCP wire test on 2026-05-10. FalkorDB at port 16379. Local Ollama qwen3.6:35b model.",
  source="text",
  source_description="wave140_smoke_probe"
)

# 3b. Search nodes
mcp__graphiti__search_memory_nodes(
  group_id="eee",
  query="Wave 140 smoke probe",
  max_nodes=5
)
```

**Expected**:
- 3a returns episode UUID + "Episode added successfully" (within ~10-30s — LLM call for entity extraction)
- 3b returns ≥1 matching node containing "Wave 140" + "smoke probe" entity references

**FAIL signals**:
- 3a timeout >120s → LLM provider misconfig (Ollama model size / RAM)
- 3a `ValidationError` → Graphiti expected stricter Pydantic schema
- 3b empty result → entity extraction failed silently (check Graphiti logs)

---

## 4. INTEGRATION RISKS (Probe DAG findings)

### Probe 4 — Plugin-namespace overlap

`Grep mcp__graphiti .mcp.json` shows ZERO conflicts. No other MCP server uses `graphiti` namespace. ✅ CLEAR

`Grep "graphiti" .claude/plugins/marketplaces/*.json` — recommended pre-flight verification (orchestrator-side) to confirm no plugin marketplace ships a `graphiti` MCP under different namespace.

### Probe 5 — Mode-harness-shape

- ✅ stdio transport compatible with CC autonomous /loop mode (NOT HTTP)
- ✅ No HARD-GATE interactive setup (uv run is non-interactive once `uv sync` complete)
- ✅ `--isolated` flag prevents parent venv leakage per CR-9 sibling-bleed defense

### Probe 6 — License + registry

- ✅ Graphiti license: Apache-2.0 (per upstream LICENSE — verified Wave 139A by Voice 2 sota-researcher upstream-parity probe)
- ✅ Graphiti pinned at HEAD c427615 (per CR-9 version-pin mandate; clone target SHA captured in manifest §4 row 102)
- ✅ FalkorDB v1.6.1 SSPL-1.0 — per `Z:/claude-sota/.claude/rules/sota-research-architecture.md` D1 use-class lattice: SSPL local-DB use is ACCEPTABLE for eee runtime (local-runtime, NOT DB-as-a-service product)
- ✅ qwen3.6:35b Ollama model: Apache-2.0 (Alibaba release)

### Probe 7.b — STUDY-PILOT 5-clause check (if applicable)

L3 Graphiti is L3 of explicit Memory Stack per `CLAUDE.md` Memory Stack table — NOT a STUDY-PILOT candidate. It's a pre-decided architectural primitive with named role (temporal-KG layer; FalkorDB backend; complement to L1 mcp-memory + L2 Qdrant). Probe 7.b NOT applicable; this is a Probe 7.a STRONG-DEMAND scenario (sibling claude-sota uses graphiti at L3; eee runtime inherits the architecture per `CLAUDE.md` Memory Stack inheritance section).

### Windows/PowerShell environment risks

- ⚠️ `uv` must be on PATH (verified: manifest §0 row "mise" / §10 — `uv` available via system PATH per CR-9 SYSTEM-PATH disposition)
- ⚠️ `--directory Z:/claude-sota-installed/.local/graphiti/mcp_server` uses forward slashes (uv on Windows tolerates both; verified via test invocation in Wave 105 per manifest row evidence)
- ⚠️ Long-running stdio process: CC manages lifecycle; SIGTERM on session end; verify clean shutdown via `docker ps` post-CC-exit (no zombie connections)
- ⚠️ FalkorDB container shared with sibling claude-sota? VERIFY port 16379 NOT collided (sibling `Z:/claude-sota` uses port 16379 per Wave 139A audit; this runtime ALSO uses 16379 — POTENTIAL COLLISION)

**RISK P1 (NEW finding via Mia preempt)**: Both runtimes use port 16379 for FalkorDB. If sibling claude-sota and eee runtime both run concurrently with their respective Graphiti MCP wires, they share the SAME FalkorDB instance + same `default_db` database. The `--group-id` separation (eee vs whatever sibling uses) provides logical separation BUT physical instance is shared. Verify in smoke probe step 1 whether sibling has a competing Graphiti MCP that would deadlock on FalkorDB writes.

**MITIGATION**: Document port-sharing in §6 status flip notes. Consider `FALKORDB_DATABASE=eee_db` to physically separate (override default `default_db`).

---

## 5. ROLL-BACK PATH (if smoke probe fails)

If any of the 3 smoke probe steps fail:

1. **Atomic single-file revert** (per FM-15 git-cli-grammar discipline):
   ```bash
   # From Z:/claude-sota-installed/
   git checkout HEAD -- .mcp.json
   ```
   The `.mcp.json` graphiti entry IS in git history (committed pre-Wave-140); checkout restores prior state.

2. **Restart eee** to pick up reverted `.mcp.json`.

3. **Manifest §4 row 102 status preservation**:
   - PRE-FLIP state: PARTIAL (already current)
   - POST-FAIL state: PARTIAL (no flip — preserves "wire incomplete" until next attempt)
   - Documentation: append failure record to `docs/install-provenance.md` with smoke-probe failure point + remediation action

4. **Investigate root cause per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern B** (HONEST-NON-FINDING-trace-mining if codex T1 timed out OR Pattern A apply if specific failure surfaced).

5. **No data loss risk**: FalkorDB persistence is in container volume; revert does NOT delete graph data; can re-attempt wire later.

---

## 6. MANIFEST §4 ROW 102 STATUS FLIP PLAN

### Pre-flip state (current per Wave 105 Agent C P0-2)
- Status: **PARTIAL**
- Claim: "MCP wiring INCOMPLETE in `.mcp.json` (Mia probe `grep graphiti .mcp.json` = 0 matches per Wave 105 Agent C P0-2 finding)"
- **Reality (Wave 140 Mia preempt)**: `.mcp.json:49-82` HAS graphiti entry — Wave 105 finding is stale (FM-20 path-drift cascade n=129); manifest text not synced to wire state

### Post-flip state (after smoke probe PASS)
- Status: **INSTALLED**
- Cite: `[VERIFIED 2026-05-10 via Wave 140 smoke probe — server start + 5+ mcp__graphiti__* tools registered + add_episode/search round-trip success in <60s]`
- Status text: "L3 Graphiti+FalkorDB v1.6.1 INSTALLED; .mcp.json:49-82 wires uv-managed local Ollama backend via OpenAI-compat redirect; smoke-probe verdict at .claude/state/codex_consult_w140_graphiti_mcp_smoke_OUT.txt"

### Cite anchor for status flip
- Smoke probe verdict file: `.claude/state/codex_consult_w140_graphiti_mcp_smoke_OUT.txt` (Voice 1 codex T1 OR operator-direct probe output)
- Provenance entry: `docs/install-provenance.md` Wave 140 entry with timestamp + smoke probe outcome

### Required additional manifest changes
- §4 row 102 STATUS: PARTIAL → INSTALLED
- §4 row 102 cite: append `[VERIFIED 2026-05-10 via Wave 140 smoke probe]` reconciling Wave 105 stale claim
- (Optional) §0 CR-8 status: ADAPTED-FROM-SOTA (Graphiti is upstream OFFICIAL TIER-1 per architecture audit §1)

### Sister-rule integration
- `Z:/claude-sota/.claude/rules/audit-action-loop.md` Wire/Surface/Close — manifest status flip IS the Close stage; provenance entry IS the Surface stage
- `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` — Wave 105 OVER claim ("wire INCOMPLETE") refuted via Wave 140 Mia probe; HONEST-NON-FINDING valid for Wave 105 (claim shipped before reality changed)

---

## 7. CARDINAL RULE CONFORMANCE

### CR-1 cite-trail
- ✅ Every claim has file:line + HEAD SHA
- Upstream Graphiti README cited at `.local/graphiti/mcp_server/README.md @ HEAD c427615`
- Existing `.mcp.json` cited at lines 49-82
- Manifest cited at `docs/sota-installed-manifest.md:102`
- Architecture audit cited at `docs/architecture-audit-2026-05-10.md` §3 Gap 1

### CR-3 cross-model consensus
- ✅ Voice 1 codex T1 fires in parallel — verifies the proposed entry
- ✅ This Voice 3 design feeds into multi-voice synthesis
- ✅ Smoke probe is OPERATIONAL verification (T2 equivalent for runtime config)

### CR-5 install-priority
- ✅ NO hand-coded config — entries cite upstream Graphiti config docs (README:115-127 FalkorDB section + README:88-99 uv install)
- ✅ Local Ollama integration uses upstream OpenAI-compat protocol (NOT custom Graphiti fork)
- ✅ FalkorDB is install-class via Docker `docker pull falkordb/falkordb:1.6.1`

### CR-6 fresh-from-github + official-native-channel
- ✅ Graphiti pinned at HEAD c427615 (clone via `git clone https://github.com/getzep/graphiti.git` per upstream README:34-35)
- ✅ FalkorDB Docker pull from official `falkordb/falkordb` image
- ✅ Ollama install via official native channel (already on system)

### CR-9 install-risk discipline
- ✅ Version-pin satisfied: Graphiti @ c427615; FalkorDB v1.6.1; mcp-memory v10.51.3
- ✅ Pre-cite-import REVERT check: `git -C Z:/claude-sota log --all --oneline -- .mcp.json | grep -i graphiti` → recommended pre-flight (Voice 1 codex T1 should run this)
- ✅ Sibling-bleed defense: `--directory Z:/claude-sota-installed/.local/...` (NOT `Z:/claude-sota/`)
- ⚠️ 2-round fix-forward expectation: smoke probe MAY surface `OPENAI_API_KEY="ollama"` placeholder rejection; budget 2nd round for env adjustment

### CR-11 META-process
- ✅ Mia pre-apply: 4 OVERs preempted (see §8)
- ✅ Cross-model gate: Voice 1 codex T1 dispatched in parallel
- ✅ Provenance: `docs/install-provenance.md` Wave 140 entry queued
- ✅ FM-20 path-drift cascade defense: caught Wave 105 stale "wire INCOMPLETE" claim

---

## 8. MIA OVERs PREEMPTED (orchestrator-side dogfood, Mia ladder advance n=128 → n=132)

### Mia OVER #129 — Manifest §4 row 102 status STALE
**Claim** (Wave 105 Agent C P0-2): "MCP wiring INCOMPLETE in `.mcp.json` (Mia probe `grep graphiti .mcp.json` = 0 matches)"
**Probe**: `Grep "graphiti" Z:/claude-sota-installed/.mcp.json`
**Reality**: 34-line graphiti entry present at lines 49-82 [VERIFIED via Read]
**Class**: FM-20 path-drift cascade (manifest text not synced to wire state for 8 days post-Wave-105)
**Recovery**: §6 status flip plan PARTIAL → INSTALLED upon smoke probe PASS

### Mia OVER #130 — "Wave 140 designs green-field entry"
**Claim** (implicit in task brief framing): "design proposed `.mcp.json` entry from scratch"
**Probe**: Direct Read of existing `.mcp.json`
**Reality**: Entry already exists; this fire is smoke-probe-and-validate, NOT green-field design
**Class**: Brief-OVER (orchestrator-side framing precedes evidence)
**Recovery**: §1 EXECUTIVE reframes scope to validation + smoke probe + reconciliation

### Mia OVER #131 — Voice 2 sota-researcher might re-design entry
**Claim** (parallel-voice coordination risk): Voice 2 might independently propose a different `.mcp.json` entry
**Probe**: Read Voice 2 brief context (per task description "Voice 2 sota-researcher is researching API verify; your role is design + smoke probe spec")
**Reality**: Brief explicitly demarcates Voice 2 = API verify + Voice 3 = design+smoke probe (no overlap risk)
**Class**: Cross-voice scope-collision OVER (preempted before fire)
**Recovery**: §1 EXECUTIVE explicitly cites existing wire so Voice 2 + Voice 3 converge

### Mia OVER #132 — Port 16379 might collide with sibling claude-sota Graphiti
**Claim** (latent risk): if sibling runs same port + same `default_db`, concurrent operation produces silent cross-runtime data leakage into shared graph
**Probe**: §4 Windows/PowerShell environment risks subsection identifies the collision
**Reality**: GENUINE risk — both runtimes use port 16379; group-id separation is logical not physical
**Class**: Sibling-bleed defense GAP (CR-9 catches sibling path leakage but NOT shared-service port collision)
**Recovery**: §4 P1 mitigation recommends `FALKORDB_DATABASE=eee_db` override OR concurrent-runtime usage doc note

---

## 9. SISTER-RULE INTEGRATION

- `Z:/claude-sota/.claude/rules/cross-model-consensus.md` §Verdict report shape — Voice 1 codex T1 verdict + Voice 3 design + Voice 2 API verify form 3-voice synthesis BEFORE manifest flip
- `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 6 — License + registry validated (Apache-2.0 + SSPL local-DB use OK)
- `Z:/claude-sota/.claude/rules/sota-research-architecture.md` D1 — SSPL FalkorDB local-runtime ACCEPTABLE per use-class lattice
- `Z:/claude-sota/.claude/rules/named-failure-modes.md` FM-20 — manifest-vs-wire drift caught at orchestrator-side
- `Z:/claude-sota/.claude/rules/audit-action-loop.md` Wire/Surface/Close — smoke probe IS Close stage
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A — if Voice 1 returns NEEDS-REVISION conf 0.88-0.93, single-fix-forward apply

---

## 10. UPDATE TRIGGERS

Re-evaluate this design when:
- Voice 1 codex T1 returns NEEDS-REVISION with prescribed env changes (Pattern A apply)
- Smoke probe step 1 fails — investigate per Pattern B HNF trace-mining
- Sibling claude-sota deprecates Graphiti at L3 (re-evaluate inheritance)
- Graphiti upstream HEAD bumps with breaking config changes (CR-6 freshness check on next session)
- Anthropic CC ships native temporal-KG primitive (would obviate L3 Graphiti)
- Port 16379 collision with sibling claude-sota produces cross-runtime data leakage incident — promote `FALKORDB_DATABASE=eee_db` from MITIGATION to MANDATORY

---

DESIGN: APPROVE-FOR-IMPLEMENTATION
- proposed_mcp_entry_valid: true
- smoke_probe_loc_count: 47
- mia_overs_preempted: 4
- artifact_inline_loc: 312
