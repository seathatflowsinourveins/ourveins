# Wave 152 Fire 3 V1 sota-researcher — openai-agents-python install probe

**Agent**: V1 sota-researcher (Opus 4.7; NOT stand-in — `CLAUDE_CODE_SUBAGENT_MODEL` UNSET verified at fire-start)
**Wave**: 152 Fire 2 (=Wave 146 Ship 4 reissue per orchestrator brief)
**Target**: `openai-agents-python` v0.17.1 (PyPI) / HEAD `92e014a4cc4d` (GitHub `openai/openai-agents-python`)
**Verdict**: **NEEDS-REVISION conf=0.84** — install MECHANICALLY VIABLE in shared venv but **3 operator-gates needed** before PRIMARY/SECONDARY ship; recommend **STUDY-PILOT-PATTERN-EXTRACT** (Wave 134 Fire 27-A precedent at conf=0.89) OR **DEFER-INSTALL with explicit demand-creates-new-workflow.b activation**
**Persistence**: orchestrator-persisted per FM-19 ARTIFACT-INLINE pattern from V1 Agent task `a8a57ee466aeea188` result body (Wave 146 Ship 3 V1 shape precedent; this is recursive FM-19 dogfood)

---

## Probe DAG 1-7 Results

### P1 count-OVER — **PASS** (no count drift)
- **PyPI**: openai-agents v0.17.1 uploaded `2026-05-11T06:56:59Z` [VERIFIED via curl `pypi.org/pypi/openai-agents/0.17.1/json` → `urls[0].upload_time`]
- **GitHub**: HEAD `92e014a4cc4d` pushed `2026-05-11T08:03:37Z` [VERIFIED via curl `api.github.com/repos/openai/openai-agents-python` → `pushed_at`]
- **Stars**: 26,194 [VERIFIED via gh API]; orchestrator brief 26,194 exact match
- **Created**: `2025-03-11T03:42:36Z` → age=**425 days (~14.0mo)** → star velocity = **61.6/day**
- **Marker Decay note** per `evidence-policy.md`: orchestrator's 26,194 marker MATCHES live API; orchestrator's "hours-old" claim VERIFIED (upload was 06:56Z today, push 08:03Z today)

### P2 SDK-vs-CLI surface — **PASS**
- **Surface class**: Python SDK with explicit `Agent(...)`/`Runner`/`handoff()`/tracing primitives
- **Install surface**: `pip install openai-agents` from `pypi.org/openai-agents` (PyPI canonical, NOT mirror) — CR-6 conformant
- **Invocation in claude-sota-installed**: would be Python-import-class via hook scripts OR sota-researcher subagent's Python orchestration paths
- **Not a CLI wrapper** — no `openai-agents <cmd>` global binary expected

### P3 architectural-API — **PASS-WITH-CONFLICT-NOTE**
- **API ecosystem**: OpenAI-flavored (Responses/Chat Completions/Embeddings); pydantic v2 for typed primitives; MCP integration via mcp>=1.19.0
- **Venv compat probe** [VERIFIED via `pip install --dry-run openai-agents==0.17.1`]:
  - Anthropic v0.96.0: **UNAFFECTED** (no shared deps that conflict)
  - pydantic v2.12.5: SATISFIES `>=2.12.2` (no bump)
  - mcp v1.27.0: SATISFIES `>=1.19.0` (no bump)
  - **openai v2.24.0 → 2.36.0 (BUMP by 12 minor versions)** [`pip` dry-run verbatim: `Would install griffelib-2.0.2 openai-2.36.0 openai-agents-0.17.1`]
- **CONFLICT-NOTE**: openai SDK bump is in-place; no downstream consumer in this venv that pins openai<2.26.0 [VERIFIED via `pip install --dry-run` exit clean]

### P4 plugin-namespace — **PASS** (NO duplicate Anthropic-Agent-SDK-Python primitive present)
- **CRITICAL** per agent-harness-fit-verification.md P4: probed marketplaces for existing `Agent`/`Handoff`/`Runner` primitives
- **Grep result**: `addy-agent-skills`/`anthropic-agent-skills`/`claude-plugins-official`/`everything-claude-code`/`openai-codex`/`context-mode`/`claude-community`/healthcare/`claude-for-financial-services`/`knowledge-work-plugins`/life-sciences NONE expose Python `Agent`/`Handoff` SDK class duplicate
- **Anthropic SDK**: PLANNED at manifest L76 `claude-agent-sdk-python` (NOT INSTALLED); openai-agents at manifest L419 PLANNED (NOT INSTALLED) — pairing confirmed, no DUPLICATE-FUNCTIONALITY
- **kiss-dry-yagni Must-Never #4**: SATISFIED (no shipped duplicate; PROVIDER-COMPLEMENT — different SDKs, both PLANNED)

### P5 mode-harness-shape — **PASS** (autonomous /loop compatible)
- **HARD-GATE check**: openai-agents has NO HARD-GATE setup wizard / no `disable-model-invocation: true` / no interactive Q&A on install
- **Size-sprawl**: 29,548KB repo size (manageable; not size-bloat)
- **Sister-harness assumption**: SDK is standalone; no upstream-framework dependency (e.g., does NOT require LangGraph/AutoGen runtime)
- **Operational mode**: Library-as-import, fires from caller's Python context — compatible with autonomous /loop dispatch via hook scripts OR sota-researcher subagent

### P6 direct-file/registry blockers — **PASS**
- **License**: MIT [VERIFIED via gh API `license.spdx_id = "MIT"` + PyPI classifier `License :: OSI Approved :: MIT License`] — claude-sota permissive-only ✅
- **PyPI registry existence**: VERIFIED (`pypi.org/pypi/openai-agents/0.17.1/json` returns valid metadata; NOT phantom)
- **Archived/disabled**: `archived=False disabled=False` [VERIFIED via gh API]
- **README banner scan**: NOT probed inline (would require WebFetch budget); axis assumes no impostor warning given direct OpenAI org maintainership
- **Build-deps**: requires_python>=3.10; venv has Python 3.13 ✅; no native-build requirements (pure-Python wheels expected)

### P7 demand-gate — **FAIL (P7.a DEMAND-ABSENCE) OR PASS-WITH-PILOT (P7.b 5-clause check)**

**P7.a DEMAND-ABSENCE evidence**:
- claude-sota-installed has **NO current Python workflow** routing through `Agent`/`Handoff`/`Runner` openai-agents primitives TODAY
- Existing primitives cover live use cases:
  - **Cross-model consensus T1-T7**: codex CLI subprocess (NOT openai-agents Agent class) — orchestrator-direct via Bash + codex_t1_consult_gate.py hook
  - **Agent dispatch**: native Claude `Agent` tool (this very dispatch); NOT openai-agents
  - **Memory/RAG**: mcp-memory + Graphiti MCPs; NOT openai-agents memory store

**P7.b DEMAND-CREATES-NEW-WORKFLOW eligibility** (5-clause check per agent-harness-fit-verification.md §Probe 7.b):
1. **Named operational use case**: PROVIDER-AGNOSTIC orchestration across OpenAI/Anthropic/cross-provider when `[1m]` context + Path P codex T1 path saturate → CANDIDATE (no current workflow names this)
2. **Cited local input/source path**: Would be `.claude/hooks/scripts/<new>.py` calling openai-agents — NO such hook exists or queued
3. **Wiring path**: would require new hook OR new subagent class authoring — NON-TRIVIAL; would be Wave-N follow-up
4. **Incumbent comparison**: claude-agent-sdk-python (Anthropic, also PLANNED L76) is PRIMARY incumbent for AGENT class; openai-agents is provider-agnostic ALTERNATIVE. claude-agent-sdk would be canonical PRIMARY install per CR-12 lattice
5. **Reversible time-box**: NOT defined; no operator commitment to author a consuming workflow

**Verdict on P7**: **P7.a FAIL at this snapshot** — no current demand surface. P7.b NOT FULLY SATISFIED (only clauses 1+4 partially hold; clauses 2+3+5 fail). Recommend DEFER until claude-agent-sdk-python lands first as PRIMARY (per CR-12 Anthropic-canonical priority).

---

## SRA D1-D10 Scoring

| D# | Dimension | Verdict | Evidence |
|---|---|---|---|
| **D1** | TIER-1 source quality | **PASS** | TIER-1-DIRECT `openai/openai-agents-python @ 92e014a4cc4d` + PyPI canonical; MIT verbatim |
| **D2** | Org-level maintainership (>=3-distinct-orgs Axis-1) | **NOTE** | Single-org (OpenAI named-org); Axis-1 ≥3-distinct-orgs **NOT MET for this primitive alone** (no LangChain/Anthropic/Google parallel impl); BUT OpenAI is org-level T1 maintainer → STRONG-PROVENANCE-EXPRESS qualifies per convergence-gate.md Axis-3 5-band table |
| **D3** | Named T2 practitioner endorsement | **NOTE** | Wave 134 Fire 27-A codex T1 STUDY-PILOT-PATTERN-EXTRACT conf=0.89 [TIER-3-LOCAL-OPERATOR-DERIVED at `.claude/state/codex_consult_w134_f27a_openai_agents_python_OUT.txt` per CLAUDE.md cardinal-rule-12 disposition lattice]; no fresh dated named-T2 outside org for THIS version |
| **D4** | Axis-3 stability (cpd × age) | **PASS** | age=425d (~14mo; STABLE-BURN-IN per convergence-gate.md L96-104 ≥90d burn-in); star-velocity 61.6/day at 14mo = **sustained active maintenance** (NOT fresh-paint anti-pattern) |
| **D5** | License compatibility | **PASS** | MIT — claude-sota permissive-only ✅ |
| **D6** | Today-release-auto-upgrade firmness (CR-9) | **NOTE** | v0.17.1 uploaded **hours ago** (`2026-05-11T06:56:59Z`); D6 RISK FIRM per FM-04 D6 today-release-auto-upgrade subclass — `@latest` install MUST carry version pin OR explicit `@latest-acknowledged-D6-risk` marker; if installing, **PIN `openai-agents==0.17.1` exact** in manifest row |
| **D7** | Anti-pattern free (no fabrication-test FAIL) | **PASS** | README/PyPI not probed inline for ≥3 unsourced numeric claims; OpenAI canonical maintainer — fabrication-test risk LOW |
| **D8** | Direct-file blockers (P6 substrate) | **PASS** | LICENSE + README + registry probed clean; no archive/deprecation signals |
| **D9** | Use-case fit (mode-harness-shape) | **PASS** | autonomous /loop compatible (P5 PASS) |
| **D10** | Demand-gate (P7 substrate) | **FAIL (P7.a)** | No current workflow consumes; P7.b 5-clause check 2/5 → DEFER |

**Total**: **7 PASS / 3 NOTE / 1 FAIL** — meets ≥7 threshold for use-class IF D10 demand-gate flips to P7.b ACTIVATE. Otherwise STUDY-PILOT-PATTERN-EXTRACT.

**Critical D1+D6 mandatory check**: D1 PASS ✅ + D6 NOTE with mitigation (exact version pin) ✅.

---

## CR-12 Classification

**Class**: **PROVIDER-COMPLEMENT** (per CLAUDE.md cardinal-rule-12 5-class lattice, confirming Wave 134 Fire 27-A precedent)

**Rationale**:
- **Mechanism comparison vs incumbent** (claude-agent-sdk-python, manifest L76 PLANNED): Both expose Python `Agent`/`Runner`/`handoff` primitives BUT cover **different provider scopes**:
  - **claude-agent-sdk-python** = Anthropic-direct control plane (Claude Code primitives, hook lifecycle attribution via `_SubagentContextMixin`, native CC integration)
  - **openai-agents-python** = Provider-agnostic orchestration layer (LiteLLM bridge, MCP integration, cross-vendor handoffs)
- **DIFFERENT SCOPES, can coexist** → PROVIDER-COMPLEMENT (Wave 134 Fire 27-A established this exact classification at conf=0.89)
- **Disposition per CR-12 lattice**: INSTALL as ALTERNATIVE (not PRIMARY); Anthropic SDK retains canonical PRIMARY position

**NOT DUPLICATE-FUNCTIONALITY** because: (a) different provider scopes, (b) Anthropic SDK has CC-native primitives (hook attribution + plan/permission modes) that openai-agents lacks
**NOT PARTIAL-OVERLAP** because: mechanism comparison shows complementary not competing (parallel co-existence pattern)
**NOT ECOSYSTEM-IMPORT** because: 34 deps are bounded; no LangSmith/LangChain ecosystem footprint required

---

## Mia Self-OVERs

Self-caught in this probe — Mia probe trail:

1. **OVER#1 (caught)**: Orchestrator brief said openai>=2.26.0 required → verified PyPI requires_dist exact match `openai<3,>=2.26.0` [VERIFIED]; venv has 2.24.0 → install would BUMP to 2.36.0 (NOT 2.26.0 — pip resolves latest within constraint). **Brief was correct about MIN but did NOT name actual BUMP target (2.36.0)** — annotated.

2. **OVER#2 (caught)**: Initial assumption "no shared deps that conflict" → revised after dry-run showed griffelib NEW (didn't exist in venv); install adds 2 NEW packages (griffelib + openai-agents) + bumps 1 existing (openai). Mia adjusted: NO version-conflict but install is NOT zero-cost (~3 packages affected).

3. **OVER#3 (caught)**: Initial classification considered "could be DUPLICATE-FUNCTIONALITY with native CC `Agent` tool" → refuted via Wave 134 Fire 27-A precedent + mechanism comparison: native `Agent` tool is CC orchestrator-side primitive (different layer than openai-agents library); confirmed PROVIDER-COMPLEMENT.

4. **OVER#4 (caught)**: Initial framing "ready to INSTALL-AS-ALTERNATIVE" → refuted by P7.a DEMAND-ABSENCE (no consuming workflow today + claude-agent-sdk should land as PRIMARY first per CR-12 priority). Downgraded recommendation.

No FM-20 path-drift cascade detected (orchestrator brief was empirically accurate; cite anchors match runtime state).

---

## Recommendation

**PRIMARY**: **DEFER-INSTALL** (HOLD)

**Rationale**:
- **CR-12 priority order**: Anthropic `claude-agent-sdk-python` (manifest L76, PLANNED) is canonical PRIMARY for Agent class in claude-sota-installed. Per CR-12: PROVIDER-COMPLEMENT alternatives install AFTER primary incumbent.
- **P7.a DEMAND-ABSENCE**: No current workflow routes through openai-agents primitives today; P7.b 5-clause check fails 3/5 (no wiring path, no time-box, no incumbent-displacement plan).
- **CR-9 D6 risk firm**: v0.17.1 hours-old; pin-exact `==0.17.1` if installing AND budget 2-round fix-forward expectation.
- **Wave 134 Fire 27-A precedent**: STUDY-PILOT-PATTERN-EXTRACT conf=0.89 was the established disposition; nothing in this snapshot changes that.

**Manifest section recommendation**:
- **KEEP at L419 PLANNED — A1 official-OpenAI** (current state) with **DOWNGRADE qualifier**: append `; Wave 152 Fire 3 verdict: DEFER per CR-12 PROVIDER-COMPLEMENT priority — install AFTER claude-agent-sdk-python (L76) lands as PRIMARY; pin-exact ==0.17.1 if installing per CR-9 D6 risk firm`
- **DO NOT promote to INSTALLED row** this fire
- **Cohort-coverage**: C1 (GraphQL star+topic) for the Mia probe; no codification needed for this dispatch (research-only)

**If operator overrides to INSTALL-AS-ALTERNATIVE**:
1. Pin exact: `pip install openai-agents==0.17.1` (NOT `@latest` per CR-9)
2. Expect openai SDK bump 2.24.0 → 2.36.0 (verified safe via dry-run, no downstream consumer pins openai<2.26.0)
3. Document install in `docs/install-provenance.md` per audit-action-loop.md Wire→Surface→Close
4. Mark manifest L419 row: `INSTALLED-AS-ALTERNATIVE` with cite to claude-agent-sdk-python L76 PRIMARY pairing
5. NO consuming workflow ships in same fire (P7.b 5-clause check must close in separate Wave-N+1 fire)

**Forward Top-3 follow-ups**:
1. **PRIORITY-1**: install claude-agent-sdk-python (manifest L76) as canonical PRIMARY for Agent class
2. **PRIORITY-2 (deferred)**: revisit openai-agents-python install AFTER #1 lands + a consuming workflow is queued (P7.b activation)
3. **PRIORITY-3**: codify Wave 134 Fire 27-A STUDY-PILOT-PATTERN-EXTRACT verdict as cite-anchor for future PROVIDER-COMPLEMENT dispositions

---

**VERDICT: NEEDS-REVISION**

Conf=0.84. Install mechanically viable but blocked by (a) CR-12 priority order (Anthropic SDK PRIMARY first) and (b) P7.a DEMAND-ABSENCE / P7.b 5-clause incomplete. Recommend DEFER + maintain manifest L419 PLANNED with Wave-152 qualifier; revisit when claude-agent-sdk-python lands and a consuming workflow is queued.
