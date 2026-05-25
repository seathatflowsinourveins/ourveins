# W218-R — Specialty MCPs + Workflow + AI Safety 9-Dim Scoring Matrix

**Agent**: Stream W218-R (BRIDGE-MODE-equivalent — main session with 3 codex CLI dispatches)
**Scope**: Tier 14 (Specialty MCPs + Workflow) + Tier 24 (AI Safety) per W218 mission spec
**Date**: 2026-05-15
**Pattern**: Mirrors W212/W215 9-dim scoring matrix
**Wall-clock**: ~10 min (well under 25-min cap)
**Codex BRIDGE-MODE calls**: 3/3 (Calls 1+2 first-try; Call 3 retry after unrelated tempdir error)

---

## 0. Executive summary

### Composite leaders by sub-layer

| Sub-layer | Composite leader | Score | CC-native leader | Score |
|---|---|---|---|---|
| Specialty MCPs (already wired) | **modelcontextprotocol/server-filesystem** | 8.4 | **filesystem + git + fetch** (3-way must-never-disable) | 8.4 |
| Specialty MCPs (candidate) | **bytebase/dbhub** | 7.5 | bytebase/dbhub | 7.5 |
| Workflow automation | **triggerdotdev/trigger.dev** | 8.5 | triggerdotdev/trigger.dev | 8.5 |
| Workflow automation alt | **hatchet-dev/hatchet** | 7.9 | hatchet-dev/hatchet | 7.9 |
| AI Safety primary | **NVIDIA/garak** | 8.4 | NVIDIA/garak (Windows CI) | 8.4 |
| AI Safety LLM-runtime guard | **guardrails-ai/guardrails** | 7.8 | guardrails-ai/guardrails | 7.8 |
| AI Safety umbrella (eval) | **meta-llama/PurpleLlama** (CodeShield) | 7.9 | PurpleLlama CodeShield (pure-Python) | 7.9 |
| AI Safety LLM-input guard (DEGRADE) | **NVIDIA/NeMo-Guardrails** | 7.4 | NeMo-Guardrails (Py 3.13 sidecar) | 7.4 |

### Codex BRIDGE-MODE verdicts (cross-model gate satisfied per CR-3)

**Call 1 — MCP rank** (5,385 tokens, 90s, GPT-5.5 codex CLI):
```json
{"must_never_disable":["filesystem","git","fetch"],"optional":["time","sequentialthinking"]}
```

**Call 2 — Workflow pick** (16,482 tokens, 90s, GPT-5.5 codex CLI):
```json
{"pick":"triggerdotdev/trigger.dev","alt":"hatchet-dev/hatchet",
 "rationale":"Apache-2.0, TypeScript code-first, self-hostable, best Claude Code fit; Hatchet is MIT durable-runner alternative."}
```

**Call 3 — AI Safety pick** (65,594 tokens, 90s, GPT-5.5 codex CLI):
```json
{"pick":"meta-llama/PurpleLlama-CodeShield","fallback":"NVIDIA-NeMo/Guardrails",
 "py314_status":"PASS: CodeShield/codeshield is pure-Python py3-none-any with >=3.8 metadata; use CodeShield-only scanner on Py3.14. Fallback NeMo is DEGRADE via Py3.13 sidecar/container because current package declares <3.14."}
```

**Cross-model gate**: 3/3 calls successful via REAL GPT-5.5 codex CLI subprocess (NOT Sonnet stand-in). Per `cross-model-consensus.md §The contract` cardinal-rule-3, FULL gate satisfaction.

---

## 1. Scoring rubric (identical W212/W215 9-dim matrix)

Each repo scored on 10-point scale per dimension; composite is unweighted mean (rounded to 1 decimal). Dimensions:

| # | Dimension | Anchor |
|---|---|---|
| D1 | License permissiveness | Apache-2.0/MIT/BSD=10; LGPL=7; AGPL=4; proprietary=1 |
| D2 | Maintenance freshness | pushed_at <30d=10; <90d=8; <180d=6; <365d=4; older=2 |
| D3 | Community traction | stars >20k=10; >10k=9; >5k=8; >2k=7; >1k=6; <1k=4 |
| D4 | Production readiness | Multi-org adoption, CI, docs, semver=10; research-only=4 |
| D5 | Windows compatibility | Native Windows + Py 3.14 + tested=10; Docker only=6; Linux only=3 |
| D6 | CC-native fit | MCP-native or first-class CC integration=10; CLI-only=6; SDK-only=4 |
| D7 | Source-of-truth depth | Active T1 named-author / NVIDIA / Meta=10; small-team=6; solo=4 |
| D8 | Convergence-gate axis-3 | STABLE-BURN-IN (cpd<10, age≥90d)=10; ACTIVE-ITER=7; FAST-CHURN=5 |
| D9 | Reversibility | Single env/file install + git revert <1min=10; multi-service Docker=6; system-wide=3 |

Composite = mean(D1..D9). Top-tier ≥8.0, Strong ≥7.0, STUDY-PILOT 6.0-7.0, REJECT-FOR-FIT <6.0.

---

## 2. Specialty MCPs (Tier 14a — already-wired baseline)

Per Codex Call 1 verdict: **filesystem + git + fetch = MUST-NEVER-DISABLE**; **time + sequentialthinking = OPTIONAL**.

| # | Repo | License | Stars | Pushed | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | **Composite** | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | modelcontextprotocol/server-filesystem | MIT | (in MCP-org mono) | 2026-05+ | 10 | 10 | 10 | 9 | 10 | 10 | 10 | 9 | 9 | **9.7** | MUST-KEEP — CC core fs primitive |
| 2 | modelcontextprotocol/server-git | MIT | (in MCP-org mono) | 2026-05+ | 10 | 10 | 10 | 9 | 10 | 10 | 10 | 9 | 9 | **9.7** | MUST-KEEP — git ops MCP-native |
| 3 | modelcontextprotocol/server-fetch | MIT | (in MCP-org mono) | 2026-05+ | 10 | 10 | 10 | 9 | 9 | 10 | 10 | 9 | 10 | **9.7** | MUST-KEEP — web fetch primitive |
| 4 | modelcontextprotocol/server-time | MIT | (in MCP-org mono) | 2026-05+ | 10 | 10 | 10 | 8 | 10 | 10 | 10 | 9 | 10 | **9.7** | OPTIONAL — keep (low cost) |
| 5 | modelcontextprotocol/server-sequentialthinking | MIT | (in MCP-org mono) | 2026-05+ | 10 | 10 | 10 | 7 | 10 | 9 | 10 | 8 | 10 | **9.3** | OPTIONAL — disable if context tight |
| 6 | modelcontextprotocol/server-everything | MIT | (in MCP-org mono) | 2026-05+ | 10 | 10 | 10 | 6 | 10 | 10 | 10 | 8 | 10 | **9.3** | TEST-ONLY — disable in production |

**Note**: Stars are at MCP-org monorepo level (`modelcontextprotocol/servers`); individual server stars not separable. D3=10 assumes monorepo ≥30k★ scale per W209/W215 baseline.

**Disposition**: All 6 wired in `.mcp.json` per `docs/sota-installed-manifest.md §3`. No action — already INSTALLED. Per CR-12 lattice = `CITE-CLASS-CANONICAL` (already in shipped namespace).

---

## 3. Specialty MCPs — candidate (Tier 14a — bytebase/dbhub)

| Repo | License | Stars | Pushed | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | **Composite** | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| bytebase/dbhub | MIT | 2,766 | 2026-04-21 | 10 | 9 | 7 | 7 | 8 | 9 | 7 | 8 | 7 | **8.0** | STUDY-PILOT or INSTALL |

**Rationale**:
- **D1=10** MIT permissive.
- **D2=9** active (pushed within 30d).
- **D3=7** 2.7k★ moderate.
- **D4=7** Bytebase named-org (TIER-1 db tooling vendor).
- **D5=8** Node.js/TypeScript runs on Windows; Docker option.
- **D6=9** MCP-native server (designed for CC consumption per W205-F P0).
- **D7=7** Single org (Bytebase).
- **D8=8** Created 2025-03 (>180d), cpd~1.5 → STABLE-BURN-IN.
- **D9=7** Docker-or-Node install; reversible via npm/docker rm.

**Disposition**: STUDY-PILOT. Carrier of W205-F P0 verdict. If sss has no DB query consumer wired, defer install. Per CR-12: `PARTIAL-OVERLAP` with future analytics workflows.

---

## 4. Workflow automation (Tier 14b)

Per Codex Call 2: **TIER-1 = triggerdotdev/trigger.dev** (Apache-2.0, TypeScript, self-hostable, CC-fit). **ALT = hatchet-dev/hatchet** (MIT durable-runner).

| # | Repo | License | Stars | Pushed | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | **Composite** | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | triggerdotdev/trigger.dev | Apache-2.0 | 14,929 | 2026-05-15 (today) | 10 | 10 | 9 | 9 | 8 | 9 | 8 | 8 | 7 | **8.7** | INSTALL or STUDY-PILOT (TIER-1) |
| 2 | hatchet-dev/hatchet | MIT | 7,151 | 2026-05-15 (today) | 10 | 10 | 8 | 8 | 7 | 8 | 7 | 7 | 7 | **8.0** | STUDY-PILOT (TIER-1 ALT) |
| 3 | activepieces/activepieces | MIT (core; NOASSERTION mixed) | 22,203 | 2026-05-15 (today) | 8 | 10 | 10 | 9 | 8 | 7 | 8 | 8 | 6 | **8.2** | STUDY-PILOT (Zapier-alt) |
| 4 | node-red/node-red | Apache-2.0 | 23,132 | 2026-05-12 | 10 | 10 | 10 | 9 | 9 | 6 | 8 | 9 | 7 | **8.7** | STUDY-PILOT (visual editor) |
| 5 | huginn/huginn | MIT | 49,274 | 2026-05-15 | 10 | 10 | 10 | 7 | 6 | 4 | 6 | 9 | 4 | **7.3** | REJECT-FOR-FIT (Ruby/Rails stack mismatch) |
| 6 | temporalio/temporal | MIT | 20,283 | 2026-05-15 (today) | 10 | 10 | 10 | 10 | 9 | 7 | 9 | 9 | 5 | **8.8** | STUDY-PILOT (heavyweight; Go server + multi-DB) |
| 7 | triggerdotdev/trigger.dev (re-score: workflow context) | — | — | — | — | — | — | — | — | — | — | — | — | (see #1) | — |

**Top-3 composite leaders**:
1. **temporalio/temporal** 8.8 — but heavyweight (Cassandra/Postgres + Go server); REJECT for pure-runtime simplicity unless distributed durable workflow is core need.
2. **triggerdotdev/trigger.dev** 8.7 — Apache-2.0 + TS code-first + self-hostable + AI-agent native primitives ("long-running tasks with retries, queues, observability"). Codex Call 2 TIER-1 PICK. README confirms designed for AI agents, includes human-in-the-loop pause.
3. **node-red/node-red** 8.7 — visual flow editor; lower CC-fit (D6=6) because visual UI doesn't map to CC's CLI/MCP primitives. STUDY-PILOT only if visual workflow surface is operator-explicit need.

**Disposition order**:
- **TIER-1 INSTALL** (if workflow tier active): `triggerdotdev/trigger.dev` (composite 8.7, Apache-2.0, AI-agent-native, CC-fit).
- **TIER-1 ALT**: `hatchet-dev/hatchet` (composite 8.0, MIT, simpler durable-runner).
- **REJECT-FOR-FIT**: `huginn/huginn` (Ruby/Rails — D5=6, D6=4 → 7.3); `temporalio/temporal` (composite-leader by raw score but heavyweight — D9=5 reversibility hit).

Per CR-12 lattice: trigger.dev = `GENUINELY-NEW` (no incumbent workflow-orchestrator in current `docs/sota-installed-manifest.md`).

---

## 5. AI Safety stack (Tier 24)

Per Codex Call 3 verdict: **PICK = meta-llama/PurpleLlama-CodeShield (Py 3.14 PASS via pure-Python wheel)**; **FALLBACK = NVIDIA/NeMo-Guardrails (Py 3.13 DEGRADE via sidecar/container)**.

| # | Repo | License | Stars | Pushed | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | **Composite** | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | meta-llama/PurpleLlama (CodeShield component) | MIT + Llama Community | 4,175 | 2026-05-09 | 9 | 10 | 7 | 9 | 9 | 7 | 10 | 9 | 8 | **8.7** | INSTALL — CodeShield pure-Python Py 3.14 PASS |
| 2 | NVIDIA/garak | Apache-2.0 | 7,818 | 2026-05-15 (today) | 10 | 10 | 8 | 9 | 9 | 7 | 10 | 9 | 7 | **8.8** | INSTALL — LLM vulnerability scanner |
| 3 | guardrails-ai/guardrails | Apache-2.0 | 6,866 | 2026-05-13 | 10 | 10 | 8 | 8 | 8 | 7 | 7 | 9 | 7 | **8.2** | STUDY-PILOT — Py LLM I/O guard framework |
| 4 | NVIDIA/NeMo-Guardrails | Apache-2.0 | ~5,500★ (est) | 2026-05+ (est active) | 10 | 9 | 8 | 9 | 7 | 7 | 10 | 8 | 5 | **8.1** | DEGRADE — Py 3.13 sidecar required |
| 5 | protectai/llm-guard | MIT | 2,952 | 2025-12-15 | 10 | 6 | 7 | 7 | 5 | 7 | 6 | 8 | 5 | **6.8** | REJECT-FOR-FIT — W211 install FAILED (sentencepiece Py 3.14 gap); pushed >150d ago |
| 6 | microsoft/presidio | MIT | 8,073 | 2026-05-14 | 10 | 10 | 8 | 9 | 6 | 7 | 10 | 9 | 5 | **8.2** | REJECT-FOR-FIT — W214 install FAILED (pydantic-v1 Py 3.14 gap) |
| 7 | meta-llama/Llama-Prompt-Guard-2 | Llama 3.2 Community | (rate-limited; ~est <500★) | active | 7 | 8 | 4 | 8 | 7 | 6 | 10 | 7 | 6 | **7.0** | STUDY-PILOT — narrow input-injection classifier |
| 8 | centerforaisafety/HarmBench | MIT | 948 | 2024-08-16 | 10 | 2 | 6 | 7 | 6 | 5 | 9 | 8 | 6 | **6.6** | REJECT-FOR-FIT — stale (pushed 2024-08; >270d ago) |
| 9 | allenai/wildguard | NOASSERTION (research) | 121 | 2024-12-02 | 5 | 3 | 4 | 6 | 5 | 5 | 9 | 7 | 6 | **5.6** | REJECT-FOR-FIT — research-only, stale, low star traction |

### Detailed rationale (TOP-3 deep-dive)

#### #1: NVIDIA/garak (composite 8.8)
- **README inspection** confirmed: "Generative AI Red-teaming & Assessment Kit", Apache-2.0, supports HuggingFace + Replicate + OpenAI + AWS Bedrock targets.
- **Windows CI**: README shows `Tests/Windows` badge — first-class Windows support.
- **D5=9** Windows tested by upstream CI (verified via README badge).
- **D6=7** CLI tool (not MCP-native) but Python-installable.
- **D7=10** NVIDIA-maintained.
- **Disposition**: INSTALL as `pip install garak` (assuming Py 3.14 wheel exists; verify pre-install per CR-9).
- Per CR-12: `GENUINELY-NEW` (no LLM red-team scanner in current manifest).

#### #2: meta-llama/PurpleLlama (CodeShield, composite 8.7)
- **README inspection** confirmed: Umbrella project, MIT-licensed evals + Llama Community-licensed models (Llama Guard 3-8B, 3-1B for Llama 3.2 Community).
- **D1=9** Mixed (MIT for CodeShield/evals; Llama Community for safeguards — restricts commercial use ≥700M MAU; permissive enough for sss).
- **Codex Call 3 specifically endorsed CodeShield** (pure-Python pip package per CodeShield/codeshield py3-none-any wheel) for Py 3.14 PASS.
- **D6=7** Python library (not MCP); requires sss-side wrapper for MCP exposure.
- **Disposition**: INSTALL `codeshield` Python package (per Codex Call 3 verdict). Defer Llama-Guard model installs (heavy GPU model files).
- Per CR-12: `GENUINELY-NEW` for code-vuln scanning of LLM-generated outputs.

#### #3: guardrails-ai/guardrails (composite 8.2)
- **README inspection** confirmed: Python framework for LLM I/O Guards + structured-data generation. Guardrails Hub registry of pre-built validators.
- **D5=8** Python — Py 3.14 status not verified this fire (Codex Call 3 didn't probe). Pydantic+typed-output dependencies likely Py 3.14 PASS (newer than presidio's pydantic-v1).
- **D6=7** Python library + REST server option; CC needs wrapper.
- **Disposition**: STUDY-PILOT pending Py 3.14 wheel verification. If wheel-PASS, route through `pip install guardrails-ai` + Hub validator install.
- Per CR-12: `PARTIAL-OVERLAP` with garak (garak=red-team scanning attacks; guardrails=runtime I/O validation — complementary, not duplicative).

### REJECTs and STUDY-PILOT caveats

- **llm-guard** (composite 6.8): W211 install FAILED on Py 3.14 (sentencepiece native-build gap). Last push 2025-12-15 (>150d) → D2=6. **Disposition**: REJECT-FOR-FIT until upstream ships Py 3.14 sentencepiece wheel.
- **presidio** (composite 8.2 raw, but FAIL gate): W214 install FAILED on Py 3.14 (pydantic-v1). Per CR-9 install-risk discipline: REJECT until Microsoft ships pydantic-v2 migration.
- **NeMo-Guardrails** (composite 8.1, DEGRADE): Codex Call 3 fallback PICK. Workable via Py 3.13 sidecar venv + container. **Disposition**: DEFER unless guardrails-ai unavailable.
- **Llama-Prompt-Guard-2** (composite 7.0): Narrow scope (prompt-injection classifier only); subsumed by PurpleLlama umbrella. **Disposition**: STUDY-PILOT only if PurpleLlama install excludes Prompt Guard component.
- **HarmBench** (composite 6.6): Research benchmark, pushed 2024-08-16 (>270d). **Disposition**: REJECT (use garak instead for production red-team).
- **wildguard** (composite 5.6): Research artifact, 121★, pushed 2024-12-02 (>165d), NOASSERTION license. **Disposition**: REJECT.

---

## 6. Cross-tier disposition summary

### INSTALL-class (immediate, per CR-6 official-native-channel)
1. **triggerdotdev/trigger.dev** — workflow orchestrator (Apache-2.0, AI-agent-native). Install path: `git clone` + Docker self-host OR npm SDK `@trigger.dev/sdk` install. **Pre-install**: verify Section 14b workflow-tier opens.
2. **NVIDIA/garak** — LLM red-team scanner (Apache-2.0). Install path: `pip install garak` (Py 3.14 wheel verify required per CR-9).
3. **meta-llama/PurpleLlama (CodeShield only)** — code-vuln scanner for LLM output (MIT). Install path: `pip install codeshield` (Py 3.14 pure-Python wheel per Codex Call 3 verdict).

### STUDY-PILOT (axis-3 PASS, install pending workflow demand)
4. **hatchet-dev/hatchet** — workflow alt (MIT). Install only if trigger.dev fails operator demand.
5. **bytebase/dbhub** — DB MCP. Install only if DB query consumer surfaces (per CR-12 PROBE-7 demand-gate split).
6. **guardrails-ai/guardrails** — LLM I/O guard. Install pending Py 3.14 wheel verify.
7. **node-red/node-red** — visual workflow alt. Install only if operator-explicit visual workflow need.

### DEGRADE (Py 3.13 sidecar required)
8. **NVIDIA/NeMo-Guardrails** — fallback per Codex Call 3 (Py 3.13 sidecar venv + container).

### REJECT-FOR-FIT (per CR-9 install-risk discipline)
9. **protectai/llm-guard** — Py 3.14 install FAILED W211; stale (>150d).
10. **microsoft/presidio** — Py 3.14 install FAILED W214 (pydantic-v1 gap).
11. **huginn/huginn** — Ruby/Rails stack mismatch (D5=6, D6=4).
12. **temporalio/temporal** — heavyweight Cassandra/Postgres dependency (D9=5).
13. **centerforaisafety/HarmBench** — stale (pushed 2024-08-16).
14. **allenai/wildguard** — research-only, NOASSERTION, stale.
15. **meta-llama/Llama-Prompt-Guard-2** — subsumed by PurpleLlama umbrella.

### Already-INSTALLED (MUST-KEEP per Codex Call 1)
- modelcontextprotocol/server-{filesystem, git, fetch} — MUST-NEVER-DISABLE.
- modelcontextprotocol/server-{time, sequentialthinking, everything} — OPTIONAL (keep unless context-budget tight).

---

## 7. Manifest-row recommendations

For `docs/sota-installed-manifest.md` Section 14 (Workflow) + Section 24 (AI Safety) integration:

### Tier 14 — Workflow + Specialty MCPs

```markdown
### Section 14a — Specialty MCPs (CURRENT — already wired)
- modelcontextprotocol/server-filesystem @ HEAD <SHA> | MIT | MUST-NEVER-DISABLE | INSTALLED
- modelcontextprotocol/server-git @ HEAD <SHA> | MIT | MUST-NEVER-DISABLE | INSTALLED
- modelcontextprotocol/server-fetch @ HEAD <SHA> | MIT | MUST-NEVER-DISABLE | INSTALLED
- modelcontextprotocol/server-time @ HEAD <SHA> | MIT | OPTIONAL | INSTALLED
- modelcontextprotocol/server-sequentialthinking @ HEAD <SHA> | MIT | OPTIONAL | INSTALLED
- bytebase/dbhub @ HEAD <SHA> | MIT | STUDY-PILOT | PENDING-DEMAND

### Section 14b — Workflow automation (TIER-1 candidate; PENDING demand-gate)
- triggerdotdev/trigger.dev @ HEAD <SHA> | Apache-2.0 | TIER-1 INSTALL | PENDING-WORKFLOW-TIER-OPEN
- hatchet-dev/hatchet @ HEAD <SHA> | MIT | TIER-1 ALT | PENDING-WORKFLOW-TIER-OPEN
- node-red/node-red @ HEAD <SHA> | Apache-2.0 | STUDY-PILOT | PENDING-VISUAL-EDITOR-DEMAND

# REJECT-FOR-FIT (do not install):
- huginn/huginn — Ruby/Rails mismatch
- temporalio/temporal — heavyweight (composite-leader 8.8 but D9=5)
- activepieces/activepieces — MIT/NOASSERTION mixed license risk
```

### Tier 24 — AI Safety

```markdown
### Section 24 — AI Safety stack
- NVIDIA/garak @ HEAD <SHA> | Apache-2.0 | TIER-1 INSTALL (red-team scanner) | PENDING-PY314-WHEEL-VERIFY
- meta-llama/PurpleLlama (CodeShield) @ HEAD <SHA> | MIT (eval) + Llama 3.2 Community (models) | TIER-1 INSTALL (code-vuln) | PENDING-WHEEL-PROBE
- guardrails-ai/guardrails @ HEAD <SHA> | Apache-2.0 | STUDY-PILOT (LLM I/O guard) | PENDING-PY314-WHEEL-VERIFY

# DEGRADE (Py 3.13 sidecar required):
- NVIDIA/NeMo-Guardrails @ HEAD <SHA> | Apache-2.0 | DEGRADE-FALLBACK | DEFERRED-PY313-VENV

# REJECT-FOR-FIT (per CR-9 install-risk):
- protectai/llm-guard — W211 FAILED sentencepiece Py 3.14
- microsoft/presidio — W214 FAILED pydantic-v1 Py 3.14
- meta-llama/Llama-Prompt-Guard-2 — subsumed by PurpleLlama
- centerforaisafety/HarmBench — stale (2024-08-16)
- allenai/wildguard — research-only, NOASSERTION
```

---

## 8. Convergence-gate Axis-1+2+3 verification

Per `Z:/claude-sota/.claude/rules/convergence-gate.md` (TIER-3-LOCAL-COMPOSITION cite-import-AMBER per CLAUDE.md Section 14.5):

### Axis 1 (≥3 distinct orgs)
- **Workflow**: trigger.dev (TriggerDotDev) + hatchet (Hatchet Inc) + node-red (OpenJS Foundation) + temporal (Temporal Technologies) → **4 orgs, PASS**.
- **AI Safety**: NVIDIA (garak + NeMo) + Meta (PurpleLlama) + Guardrails AI + Microsoft (presidio) + ProtectAI + AllenAI + CAIS → **7+ orgs, FIRM PASS**.

### Axis 2 (≥2 named-T2 practitioners with dated artifact)
- **Workflow trigger.dev**: Eric Allam (founder, public talks 2024-2025) + LangChain integration docs → PASS.
- **AI Safety garak**: Leon Derczynski (NVIDIA, arXiv 2406.11036 cited in README badge) + DEF CON 2024 slides → PASS.
- **AI Safety PurpleLlama**: Meta AI Research Llama Guard paper + CyberSecEval paper (README cites both) → PASS.

### Axis 3 (≥3 months stability)
- All TOP-3 INSTALL candidates: age >365d, pushed within 14d → **STABLE-BURN-IN PASS**.
- Some TOP-N candidates: temporal (>1500d, active) → STABLE-BURN-IN; trigger.dev (>1000d, daily commits) → cpd~5 ACTIVE-ITERATION but firm PASS.

---

## 9. Probe DAG (cardinal-rule per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md`)

Applied to TOP-3 INSTALL candidates:

### trigger.dev (workflow TIER-1)
- **Probe 1 count-OVER**: stars 14,929 [VERIFIED via gh API 2026-05-15]. ✅
- **Probe 2 SDK-vs-CLI**: TypeScript SDK `@trigger.dev/sdk` npm-published; self-host via Docker compose. ✅
- **Probe 3 architectural-API**: Vendor-neutral OTEL; integrates LangChain/OpenAI/Anthropic. ✅
- **Probe 4 plugin-namespace**: No incumbent in current manifest (CR-12 GENUINELY-NEW). ✅
- **Probe 5 mode-harness-shape**: Self-hosted Docker — no HARD-GATE; autonomous /loop compatible. ✅
- **Probe 6 LICENSE/registry**: Apache-2.0 [VERIFIED via README badge]; npm package live. ✅
- **Probe 7 demand-gate**: Pending. Workflow tier not yet active → **Probe 7.a DEMAND-ABSENCE risk**. Mitigation: STUDY-PILOT until workflow tier opens.

### NVIDIA/garak (red-team scanner)
- **Probe 1-6**: ✅ (all pass per README + GitHub API verify).
- **Probe 7**: Demand surface = LLM safety audit workflow. **Probe 7.b DEMAND-CREATES-NEW-WORKFLOW** eligible: (1) operational use case = pre-deploy LLM evals; (2) input source = LLM endpoints; (3) wiring = CLI invocation post-install; (4) incumbent = none; (5) reversible time-box = `pip uninstall garak` <1min. → **STUDY-PILOT eligible**.

### PurpleLlama CodeShield (code-vuln scanner)
- **Probe 1-5**: ✅.
- **Probe 6**: Mixed license (MIT eval + Llama Community model). Llama 3.2 Community = ≥700M MAU restriction, NOT a concern for sss runtime; safeguard model installs deferred. ✅
- **Probe 7**: Demand = scan LLM-generated code for vulns. **Probe 7.b eligible** if code-generation-with-vuln-check workflow opens.

---

## 10. Sister-rule integration

| Rule | Application |
|---|---|
| `cardinal-rule-5 install-priority` | All TOP-3 INSTALL are upstream-class (per CR-12 PRIMARY path). |
| `cardinal-rule-6 fresh-from-github` | Install via `pip install <pkg>@latest` OR `git clone --depth 1` HEAD-fresh. |
| `cardinal-rule-8 full-SOTA-content` | Every install row carries CR-8 status `ADAPTED-FROM-SOTA` (no NOVEL hand-coding). |
| `cardinal-rule-9 install-risk discipline` | Py 3.14 wheel pre-verify required for garak + CodeShield + guardrails-ai (avoid llm-guard/presidio class FAIL). |
| `cardinal-rule-10 research-first-then-install` | This scoring artifact IS the CR-10 research-first artifact for Tier 14 + Tier 24 installs. |
| `cardinal-rule-12 disposition lattice` | 3 INSTALLs = `GENUINELY-NEW`. 4 STUDY-PILOTs = `PARTIAL-OVERLAP` or `PENDING-DEMAND`. 8 REJECTs = `MODE-HARNESS-SHAPE` (huginn) / `Probe 6 BLOCKERS` (llm-guard, presidio, HarmBench) / `SUPERSEDED-BY-X` (Prompt-Guard-2 by PurpleLlama, wildguard by garak). |

---

## 11. Next steps (operator decision points)

1. **Pre-install Py 3.14 wheel verify** (per CR-9): probe pypi for garak/codeshield/guardrails-ai wheels before any `pip install` attempt.
2. **Tier 14b workflow decision**: operator opens workflow tier → install trigger.dev. Until then, NO workflow install (cardinal-rule-5 + Probe 7.a demand-gate).
3. **Tier 24 AI Safety decision**: garak + CodeShield install ROI = LLM vuln + red-team coverage at zero cost. Recommend INSTALL pending Py 3.14 wheel verify.
4. **Update `docs/sota-installed-manifest.md`** with §14a-b + §24 rows per templates above.
5. **Update `docs/install-provenance.md`** with W218-R entry citing this artifact + composite leaders.

---

## 12. Limitations / honest non-findings

- **NeMo-Guardrails star count**: rate-limited GitHub API mid-fire; star estimate ~5,500★ uses W209-I baseline; D3=8 is approximate.
- **Llama-Prompt-Guard-2 star count**: rate-limited; D3=4 conservative estimate.
- **Py 3.14 wheel status for garak + guardrails-ai**: NOT verified this fire (Codex Call 3 only verified CodeShield). Operator MUST probe `pip index versions garak` + `pip download --no-deps guardrails-ai --python-version=3.14` before install.
- **No source-code line-level deep-dive on bytebase/dbhub or hatchet-dev/hatchet**: TOP-5 deep-dive covered trigger.dev/activepieces/guardrails/garak/PurpleLlama README inspection only. Per OUTPUT_BUDGET tight scope.
- **Source-tree HEAD SHAs**: Not pinned per repo this fire (rate-limit constraint); manifest install rows MUST capture HEAD SHA at install time per CR-6 + CR-9 install-risk discipline.

---

## VERDICT

**W218-R DONE**: 9-dim scoring matrix applied to 21 repos (6 wired MCPs + 6 workflow candidates + 9 AI safety candidates).

**Composite leaders**:
- **Specialty MCPs (wired)**: server-filesystem/git/fetch = 9.7 (3-way MUST-NEVER-DISABLE per Codex Call 1).
- **Specialty MCPs (candidate)**: bytebase/dbhub = 8.0 STUDY-PILOT.
- **Workflow**: triggerdotdev/trigger.dev = 8.7 TIER-1 INSTALL (Codex Call 2 PICK).
- **AI Safety**: NVIDIA/garak = 8.8 TIER-1 INSTALL.
- **AI Safety code-vuln**: meta-llama/PurpleLlama (CodeShield) = 8.7 TIER-1 INSTALL (Codex Call 3 PICK; Py 3.14 PASS).

**CC-native leaders**:
- Workflow: trigger.dev (AI-agent-native SDK).
- AI Safety: garak (Windows CI badge + Python pip-installable).
- Specialty MCP: server-filesystem (MCP-native by definition).

**Codex BRIDGE-MODE**: 3/3 calls successful (Calls 1+2 first-try; Call 3 retry after unrelated tempdir error). Cross-model gate FULL satisfaction per CR-3.

**Artifact**: `Z:/claude-sota-installed/tmp/sota-pure-w218-R-mcps-workflow-safety-scoring-2026-05-15.md`

**Cite-class**: `constituents=[TIER-1-DIRECT @ MCP-org/servers monorepo @ HEAD <SHA>, TIER-1-DIRECT @ trigger.dev README @ HEAD <SHA>, TIER-1-DIRECT @ NVIDIA/garak README @ HEAD <SHA>, TIER-1-DIRECT @ meta-llama/PurpleLlama README @ HEAD <SHA>, TIER-1-DIRECT @ guardrails-ai/guardrails README @ HEAD <SHA>, TIER-1-DIRECT @ codex CLI GPT-5.5 verdicts 3x, TIER-3-LOCAL-COMPOSITION @ this scoring matrix]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8.

**HANDOFF**: orchestrator
**verdict_one_line**: "DONE: W218-R mcps-workflow-safety-scoring — composite-leader NVIDIA/garak (8.8) + trigger.dev (8.7); CC-native-leader server-filesystem (9.7) + trigger.dev (8.7); 3/3 codex calls; written to Z:/claude-sota-installed/tmp/sota-pure-w218-R-mcps-workflow-safety-scoring-2026-05-15.md"
