# 99 — Fire 26-A Close Synthesis (cisco-ai-defense/mcp-scanner Path P Audit)

> **Verdict**: **STUDY-PILOT-NARROW @ codex T1 conf=0.91** (STRONGEST positive in entire Wave 134 NEW-candidate series)
> **Probe DAG**: 8/8 PASS-direction (FIRST FULL ALL-PROBES-PASS in series)
> **Mia OVER catch**: cisco-ai-mcp-scanner v4.6.0 ALREADY in `Z:/venvs/claude` (unwired)
> **Fire 26-A deliverable**: 5-file folder + atomic commit per FM-02 sub-class (b) defense

## Fire 26-A summary

FIRST of revised Top-3 priorities post-Fire-25 gap-correction. cisco-ai-defense/mcp-scanner
Apache-2.0 + Cisco TIER-1-OFFICIAL named-org + 917★ + active 2026-05-08 + multi-kit
convergence v40+v53+v54+v55+v61 = STRONGEST user-curated endorsement in entire
NN-1..NN-27 candidate dataset.

Path P codex T1 returned **STUDY-PILOT-NARROW @ conf=0.91** — STRONGEST positive verdict
in entire Wave 134 NEW-candidate audit series (Fire 24+25+26). 8/8 Probe DAG
PASS-direction (vs Agent OS v3 Fire 24-D's 7/8 PASS).

## 5 deliverables (~700 LOC)

1. `00-tracker.md` (~140 LOC) — framing + 8/8 PASS pre-codex + 5-kit convergence + 4 use cases
2. `01-mcp-scanner-anatomy.md` (~205 LOC) — anatomy + Mia confirmed venv install + 3-engine/8-analyzer/11-subcommand decomposition + install strategy
3. `02-probe-dag-application.md` (~145 LOC) — Probe DAG 8/8 PASS + FIRST FULL 5/5 P7b ELIGIBLE + cohort tracking
4. `03-codex-t1-verdict.md` (~175 LOC) — verbatim REAL GPT-5.5 verdict + 5 codex T1 contributions
5. `99-close-synthesis.md` (this file) — adoption decision + pilot plan + Fire 27+ roadmap

## Decision matrix (final)

| Decision axis | Outcome |
|---|---|
| Install verdict | **STUDY-PILOT-NARROW @ conf=0.91** (STRONGEST positive in series) |
| Run stock PyPI install | ✅ YES for zero-key analyzers (yara/readiness/prompt_defense) |
| Run SHA-pinned source install | ✅ FOR behavioral/VirusTotal scans (`@6915d44d`) |
| Initial pilot scope | Use case 1 (pre-install MCP admission) + one baseline scan of `.mcp.json` |
| Pilot duration | 30 days |
| Pilot success criteria | (1) low-latency, (2) low-noise, (3) ≥1 actionable MCP risk class catch beyond incumbent hooks |
| API keys required for baseline | NONE (4 zero-dep analyzers: yara/readiness/prompt_defense/vulnerable_package) |
| Promote to APPROVE-INSTALL | Conditional on 30-day pilot success |

## Three independent positive signals

1. **5-kit user-curated convergence** (STRONGEST endorsement in entire candidate dataset):
   v40+v53+v54+v55+v61 all reference cisco-ai-defense/mcp-scanner — convergence
   across user's external research kits over multiple revisions

2. **Cisco TIER-1-OFFICIAL named-org + 917★ + active maintenance**:
   - Apache-2.0 PURE permissive license
   - Cisco AI Defense product team (corporate-backed)
   - Active maintenance (pushed 2026-05-08, 2 days ago)
   - PyPI Trusted Publishing provenance
   - Active Discord community

3. **GENUINE NEW capability for eee (Probe 7.a demand-PRESENT)**:
   - eee has 23 MCP servers in `.mcp.json` inventory
   - Currently ZERO security scanning of MCP server tool definitions
   - Existing 26 Python hooks guard shell/destructive/secret/commit — DIFFERENT scope
   - mcp-scanner inspects MCP tools/prompts/resources/instructions/configs/server-source

## 8/8 Probe DAG PASS (strongest in series)

| Probe | Verdict |
|---|---|
| P1 count-OVER | PASS (no fabrication) |
| P2 SDK-vs-CLI | PASS (CLI + REST + SDK + static-offline) |
| P3 arch-API | PASS (multi-provider LiteLLM, vendor-neutral) |
| P4 plugin-namespace | PASS (uv tool install, no collision) |
| P5 mode-harness | PASS (autonomous-compatible static mode) |
| P6 blockers | PASS (Apache-2.0 + Cisco TIER-1 + supply-chain SHA-pin caveat noted) |
| P7a demand-absence | PASS (demand PRESENT — 23 MCP servers, no security scan) |
| P7b demand-creates | ELIGIBLE (5/5 clauses MET) |

**This is the FIRST 8/8 Probe DAG PASS in Wave 134 NEW-candidate series.**

## Pilot path (W134-F26-A-PILOT — HIGHEST-LEVERAGE next ship from this fire)

Per codex T1 next_steps verbatim:

### Phase 1: Baseline scan (immediate; zero-key)

```bash
# Run controlled baseline scan of eee's .mcp.json
mcp-scanner --analyzers yara,readiness,prompt_defense --format raw \
  config --config-path Z:/claude-sota-installed/.mcp.json \
  | tee tmp/w134-f26a-pilot-baseline-2026-05-10.json
```

This produces a JSON baseline of findings against all 23 MCP servers in eee's `.mcp.json`,
using only ZERO-KEY analyzers (yara + readiness + prompt_defense).

### Phase 2: Pilot install (uv tool)

```bash
# Optional: install fresh as uv tool (vs existing venv install)
uv tool install --python 3.13 cisco-ai-mcp-scanner

# Verify
mcp-scanner --version
```

OR for behavioral/VirusTotal scope (per codex T1 supply-chain caveat):

```bash
uv tool install --python 3.13 --from \
  git+https://github.com/cisco-ai-defense/mcp-scanner@6915d44de089cfe4f80b9b28867e02d453bb13d1 \
  cisco-ai-mcp-scanner
```

### Phase 3: 30-day measure

Log per-scan:
- Runtime (target: low-latency)
- False positive rate (target: low-noise)
- Actionable MCP risk classes caught (target: ≥1 not in existing hooks)
- Rollback cost (target: low)

### Phase 4: Promote OR retire

- **Promote**: if success criteria met after 30 days → APPROVE-INSTALL + wire as eee Dim 5 hooks/safety primitive
- **Retire**: if criteria NOT met → uninstall + document in `deprecation-discipline.md` lifecycle

## Codex T1's 5 substantial contributions

1. **Mia OVER catch**: cisco-ai-mcp-scanner v4.6.0 ALREADY in `Z:/venvs/claude` (codex live probe confirmed; orchestrator OVER refuted)
2. **PyPI lag detection**: main is 7 commits ahead of v4.6.0, includes symlink-escape security fix
3. **Apache-2.0 NOTICE analysis**: live repo check confirmed LICENSE present, NOTICE absent — distribution discipline informed
4. **Probe 7.b 5-clause full enumeration**: explicit named clauses 1-5 all MET
5. **30-day pilot success criteria**: low-latency + low-noise + ≥1 actionable catch + rollback-cost

## Forward fire roadmap (post-Fire-26-A)

### Tier 1 NEW-EXTENDED — remaining Top-3 (revised post-Fire-25)

| Fire | Subject | Pre-codex hypothesis |
|---|---|---|
| W134-F26-B | NN-17 microsoft/LLMLingua | LIKELY-STUDY-PILOT-NARROW (Microsoft TIER-1 + Fire 23 P0 token-budget directly addressable) |
| W134-F26-C | NN-18 open-compress/claw-compactor | LIKELY-CITE-PATTERN-ONLY or STUDY-PILOT-NARROW (quality lead vs LLMLingua-2) |

### Tier 1 NEW-EXTENDED — Next-5 (Fire 27+)

| Fire | Subject |
|---|---|
| W134-F27-A | NN-22 mem0ai/mem0 (Dim 2 memory) |
| W134-F27-B | NN-21 openai/openai-agents-python (Dim 1 topology — cross-vendor reference) |
| W134-F27-C | NN-23 langchain-ai/langgraph (Dim 1 topology — graph orchestration) |
| W134-F27-D | NN-13 THUDM/AgentBench (Dim 6 eval — ICLR'24) |
| W134-F27-E | NN-25/NN-26 InvariantLabs+snyk MCP-security cohort comparison |

### HIGHEST-LEVERAGE ship from Fire 26-A

**W134-F26-A-PILOT**: Execute Phase 1 baseline scan + Phase 2 pilot install + 30-day measure
+ Phase 4 promote/retire decision.

This is now the HIGHEST-LEVERAGE next ship across the entire Wave 134 backlog because:
- 5-kit user-curated convergence (strongest endorsement)
- 8/8 Probe DAG PASS (strongest fit)
- conf=0.91 STUDY-PILOT-NARROW (strongest positive verdict)
- Genuine NEW capability (Dim 5 hooks/safety gap)
- Zero-key baseline cost (no API key needed for Phase 1)
- Already pip-installed in venv (lowest install friction)

## Coverage % update

| Metric | Pre-Fire-26-A | Post-Fire-26-A |
|---|---|---|
| Wave 134 NEW-candidates verified (Fire 24+26 series) | 5/14 (35.7%) | **6/14 (42.9%)** |
| Cross-model verified claims | 28 | **29** |
| Path P recipe ladder | n=14/14 | **n=15/15** |
| Verdict shape distribution | 2 REJECT / 2 CITE-PATTERN / 1 STUDY-PILOT / 1 HNF / 0 APPROVE | + **1 STUDY-PILOT-NARROW** (2 total now) |
| Probe DAG 8/8 PASS instances | 0 | **1 (Cisco mcp-scanner FIRST)** |
| Probe 7.b FULL 5/5 ELIGIBLE | 0 | **1 (Cisco mcp-scanner FIRST)** |
| HIGHEST-LEVERAGE ship identified | 2 (D-PILOT + C3) | **3** (+ F26-A-PILOT — strongest of all) |
| Codex T1 Mia OVER catches (Wave 134 NEW-candidate series) | 1 (Fire 24-D Agent OS) | **2** (+ Fire 26-A cisco-mcp-scanner already-installed) |
| 100% architecture dim coverage | 8/8 | 8/8 ✅ (unchanged) |

## Cumulative arc Fire 5-26-A (30-fire arc)

24 folders, ~143 files, ~19,900 LOC across 30-fire arc.

Mia ladder n=130 (pre-arc) → **n=1671** (Fire 26-A close) = **+1541 verifications across 30-fire arc**.

## Closed-loop disposition

Per `closed-loop-recursive-narrowing.md`:
- Fire 26-A is STUDY-PILOT-NARROW @ conf=0.91 — positive-direction with explicit pilot scope
- No Pattern A apply needed for install decision (pilot is forward-only)
- Empty `cite_pattern_extract_candidates` (codex saw no subset patterns worth extracting separately — full pilot is the right scope)
- Pilot ship W134-F26-A-PILOT queued as HIGHEST-LEVERAGE
- Outcome A ACCEPT-WITH-DOC applies to AUDIT deliverables

## Discipline conformance

| Discipline | Status |
|---|---|
| CR-1 cite-trail | ✅ TIER-1-DIRECT GitHub API blob-SHA + Cisco AI Defense product page + PyPI Trusted Publishing |
| CR-3 cross-model | ✅ REAL GPT-5.5 codex CLI |
| CR-5 install-priority | ✅ Pilot install via uv tool (canonical) |
| CR-6 official-native-channel | ✅ PyPI canonical + uv tool install + optional SHA-pinned source for security-critical scope |
| CR-9 install-risk | ✅ Codex T1 supply-chain caveat captured (PyPI 4.6.0 lags main 7 commits) |
| CR-10 research-first-then-install | ✅ Fire 26-A audit BEFORE pilot install |
| CR-11 META-process | ✅ Fire follows META-process discipline |
| FM-02 sub-class (b) defense | ✅ Atomic git add + commit --only -- pathspec |
| SRA D1 license use-class | ✅ Apache-2.0 + patent grant + NOTICE-absent analysis |
| Mia pre-apply | ✅ Caught orchestrator OVER on "NOT installed" assumption |
| Row-2 fabrication-test | ✅ codex T1 PASS (live verified via GitHub + PyPI) |

## Mia ladder advance (Fire 26-A close)

n=1671 → n=1678 (+7: Fire 26-A close synthesis + decision matrix / 4-phase pilot plan
+ HIGHEST-LEVERAGE ship identified / 8/8 Probe DAG PASS achievement / FIRST FULL 5/5 P7b
ELIGIBLE / Forward Fire 26-B + 26-C + 27-A..E roadmap / 30-fire arc cumulative metrics
+1541 verifications)
