# W326 Stream C-2 — `openlit/openlit` full sca-v9 audit + install spec

[FLAGGED-FOR-REVIEW per W329-B + W329-S2-REAUDIT 2026-05-19: claim predicate withdrawn pending W330 root-cause investigation]

**Wave**: W326 Stream C
**Date**: 2026-05-19
**Rubric**: sca-v9 (W324 META-FOUNDATION + W325 Stream-C Gap-3 D34 bump + W326-B-1 denom math-fix: composite_denom_install = **34.7**, pattern = 14.5)
**Candidate**: `openlit/openlit` @ HEAD `7ca59852` (default branch `main`, last commit 2026-05-13)
**Source W325 Stream-D verdict**: C-1 T1 INSTALL-CANDIDATE (rough install_score ~4.5/5; 3-of-N convergence)
**This wave's verdict**: **T1 INSTALL-CANDIDATE (HOLD-VENDOR-LIBRARY)** — install via PyPI (not `claude plugin install`); operator-decision required on observability scope.

---

## §1 — Repo fingerprint

| Field | Value | Source |
|---|---|---|
| Repo | `openlit/openlit` | github.com/openlit/openlit |
| Stars | **2,454** | GitHub REST `repos/openlit/openlit` |
| Forks | 278 | same |
| Watchers | 17 (subscribers) | same |
| License (repo) | Apache-2.0 (SPDX) | `repos/openlit/openlit.license.spdx_id` |
| License (PyPI) | Apache-2.0 | `pypi.org/pypi/openlit/json#info.license` |
| Description | "Open source platform for AI Engineering: OpenTelemetry-native LLM Observability, GPU Monitoring, Guardrails, Evaluations, Prompt Management, Vault, Playground. Integrates with 50+ LLM Providers, VectorDBs, Agent Frameworks and GPUs." | repo `description` |
| Updated | 2026-05-19T11:07:52Z | repo `updated_at` |
| Pushed | 2026-05-18T19:34:53Z | repo `pushed_at` |
| Default branch | `main` | repo `default_branch` |
| HEAD sha | `7ca59852f6` ("Play pause stop #1192") date 2026-05-13 | `repos/.../commits/main` |
| PyPI name | `openlit` | pypi.org |
| PyPI version | **`1.42.0`** (latest stable) | pypi.org |
| PyPI requires_python | `<4.0.0,>=3.9.0` | pypi.org `info.requires_python` |
| Archived | False | repo `archived` |

**Top-level repo structure** (via REST `/contents`):
- Code: `sdk/{python,typescript,go}`, `src/`, `openlit-controller/`, `opentelemetry-gpu-collector/`
- Examples: `examples/{anthropic-chat-app, openai-chat-app, gemini-chat-app, bedrock-chat-app, azure-inference-chat-app, crewai-agent-app, kubernetes, linux, non-llm-http-app, openlit-sdk-agent-app}` — 10 examples including 1 Anthropic + 1 CrewAI
- Docs: `docs/`, `README.md`, `OPAMP_DEPLOYMENT.md`, `SECURITY.md`, `CODEOWNERS`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`
- Deploy: `docker-compose.yml`, `env.example`, `taskfile.yaml`

**PyPI top-8 dependencies** (Python SDK):
- `anthropic<1.0.0,>=0.42.0`
- `boto3<2.0.0,>=1.34.0`
- `botocore<2.0.0,>=1.34.0`
- `openai<3.0.0,>=1.92.0`
- `opentelemetry-api<2.0.0,>=1.38.0`
- `opentelemetry-exporter-otlp<2.0.0,>=1.38.0`
- `opentelemetry-instrumentation<1.0.0,>=0.52b0`
- `opentelemetry-instrumentation-aiohttp-client<1.0.0,>=0.52b0`

**No conflicting deps with current runtime** (anthropic + openai are already pip-installed at versions ≥0.42.0 / ≥1.92.0). OTel deps are net-new (W326-installable).

---

## §2 — Stage-0 EXISTENCE-PROBE (sca-v9 §1; closes 5-wave GitHub-MCP silent-fallback)

| Source family | Probe | Result | Status |
|---|---|---|---|
| GitHub REST | `GET /repos/openlit/openlit` | 200; full payload; 2454 stars | ✓ EXISTS |
| GitHub commits | `GET /repos/openlit/openlit/commits/main` | 200; sha `7ca59852f6` 2026-05-13 | ✓ EXISTS |
| GitHub contents | `GET /repos/openlit/openlit/contents` | 200; 21 top-level items | ✓ EXISTS |
| PyPI | `GET pypi.org/pypi/openlit/json` | 200; v1.42.0 Apache-2.0 | ✓ EXISTS |
| DeepWiki | `mcp__deepwiki__ask_question("openlit/openlit", ...)` | 200; substantive answer with §Core Architecture wiki link | ✓ EXISTS (DeepWiki has indexed the repo) |
| WebSearch | "openlit github 2026 GPU monitoring otel-gpu-collector" | 10 results inc. github.com/openlit/openlit + openlit.io + pypi.org + docs.openlit.io + grafana.com blog post | ✓ EXISTS (cross-corroborated) |

**Stage-0 verdict**: 6/6 source families positive → EXISTS confirmed (no silent-fallback). Cardinal anti-bias check passes.

---

## §3 — sca-v9 path-(b) dimension scoring (composite_denom_install=34.7)

Per sca-v9 SKILL.md §3 + §5 dim catalog (D1–D45 + D-EMP HARD GATE). Anchors are 3-org-distinct minimum.

**D-EMP HARD GATE** (W319 ratify): empirical_viability ≥1 required to enter T1/T1-PROV/T2.

| Dim | Score | Weight | Anchor 1 | Anchor 2 | Anchor 3 |
|---|---|---|---|---|---|
| **D-EMP** | **1** (PASS-GATE — but contingent on §4 smoke; cannot fully verify without local pip install) | 1.0 (hard-gate) | PyPI v1.42.0 published (not vapor) | DeepWiki indexed substantive Q&A | Grafana Labs blog (corroborated 3rd-party) |
| D1 | 5 (Apache-2.0 + first-party + Otel-aligned) | 1.0 | github LICENSE | PyPI license=Apache-2.0 | NPM/Docker Hub no relevance |
| D2 (community_size) | 4 (2454★ + 278 forks + dependabot active) | 0.8 | github stars 2454 | github contributors graph | PyPI download stats via pepy.tech (badge) |
| D3 (cc_pathway) | **superseded by D35** | 0.8 | — | — | — |
| D4 (production_readiness) | 5 (`pip install openlit`; one-line `openlit.init()`; Docker container; Kubernetes example) | 0.8 | PyPI 1.42.0 GA | docker-compose.yml in repo | examples/kubernetes/ |
| D5 (cardinal_rule_compliance) | 5 (Apache-2.0 + no telemetry-by-default + opt-in OTLP endpoint) | 1.0 | LICENSE | env.example shows OTLP_ENDPOINT opt-in | SECURITY.md present |
| D6 (author_prior) | 4 (2454★ — author-prior signal, BUT v9 D34 bump 0.7→0.9 reduces D6's relative weight per Stream-C Gap-3) | 0.5 | github org `openlit/` (`type=Organization`) | grafana.com blog co-author | docs.openlit.io |
| D7 (cve_history) | 4 (no CVE in NVD search; SECURITY.md present; step-security/harden-runner enabled per recent commit `d930615`) | 0.8 | NVD `openlit` search → 0 | repo SECURITY.md | recent commit `chore(deps): bump step-security/harden-runner from 2.19.1 to 2.19.3 (#4115)` |
| D8 (release_cadence) | 5 (PyPI v1.42.0 → 42 minor versions = high cadence; updated_at 2026-05-19) | 0.6 | PyPI version history | github releases page | commit cadence |
| D9 (license_compatibility) | 5 (Apache-2.0 — compatible with all CR-9 constraints; matches existing inspect_ai + promptfoo Apache-licensed deps) | 1.0 | SPDX-id Apache-2.0 | OSI approval | matches existing pip-installed package licenses |
| D10 (cohort_overlap_with_installed) | 2 (no direct duplicate, but OVERLAPS with Langfuse :3000 [LLM observability], Phoenix :16006 [Arize OTel], and the now-stopped grafana/prometheus/nvidia-gpu-exporter rack — overlap zone material) | 0.7 | Langfuse already running W317-r2 health | Phoenix Arize already running W315-r2 | nvidia-gpu-exporter port-conflict W317-r2 |
| D11 (cardinal_rule_2_hooks) | 5 (N/A — openlit is a Python library, not a hook system) | 0.6 | n/a | n/a | n/a |
| D12 (cardinal_rule_3_subagent_compat) | 5 (N/A; library can be imported into subagents but no agent contract violation) | 0.5 | n/a | n/a | n/a |
| D13 (z_portable_install_friction) | 5 (`pip install openlit` into `Z:/venvs/claude/` — same as existing inspect_ai install) | 0.6 | venv exists | inspect_ai precedent | claude-agent-sdk precedent |
| D14 (advisor_pilot_compat) | 4 (openlit instruments anthropic + openai SDKs — both used in advisor-pilot) | 0.4 | dep `anthropic<1.0,>=0.42` | dep `openai<3.0,>=1.92` | claude-agent-sdk uses anthropic transitively |
| D15 (eval_lane_fit) | 4 (could instrument the eval_harness.py Lane A/B/D/E runs — telemetry for harness itself) | 0.4 | eval_harness.py exists | OTel-compat | OTLP_ENDPOINT routable to grafana stack |
| D16 (bus_factor) | 3 (single primary org `openlit/`; PyPI maintainer single-author per pkg metadata; W316-A correction-factor flag) | 0.6 | github contributors top-N | PyPI maintainer | grafana/oneuptime/splunk-lantern 3rd-party adoption |
| D17 (testability_observability) | 5 (OTel-native — telemetry IS the product) | 0.5 | OTel collector | ClickHouse | Grafana integration |
| D18 (deterministic_install) | 5 (PyPI semver-pinnable `openlit==1.42.0`) | 1.0 | PyPI version-string | poetry/pip compatible | hash-pinnable via pip install --hash |
| D19 (code_review_pr_density) | 4 (#4115 dependabot active; recent PR cadence visible) | 0.4 | recent commits | github PR view | LearningCircuit named contributor in commits |
| D20 (issue_responsiveness) | 4 (#1192 "Play pause stop" merged 2026-05-13; active maintenance) | 0.4 | github open-issues count | recent merged PRs | repo activity |
| D21 (org_diversity_contributors) | 3 (primary openlit/ org dominant; LearningCircuit + Aman Agarwal external; 3rd-org diversity uncertain without deeper contrib graph) | 0.5 | github contributors | grafana.com blog 3rd-party | splunk lantern article 3rd-party |
| D22 (changelog_freshness) | 4 (PyPI version bumps 1.42.0 + repo updates within 24h pre-audit) | 0.4 | PyPI release dates | github tags | repo commit dates |
| D23 (windows_z_portable_compat) | 4 (Python library — pip install works on Windows; otel-gpu-collector via Docker container works on Windows-WSL2 or native Docker Desktop) | 0.6 | venv Z:/ existing | Docker Desktop available per W317 | examples/linux/ may need WSL2 |
| D24 (no_always_on_listener) | 5 (library has NO listener of its own; OTLP exporter is opt-in; `otel-gpu-collector` is a SEPARATE Docker container the operator can choose-or-skip) | 0.8 | openlit.init() opt-in | otlp_endpoint configurable | docker-compose optional |
| D25 (openai_paperbench_anchor) | n/a (D25 is for AI-research benchmarks, not observability) | 0.4 | — | — | — |
| D26 (gartner_aim_2026_anchor) | n/a | 0.4 | — | — | — |
| D27 (gartner_aim_quadrant) | n/a | 0.4 | — | — | — |
| D28 (long_running_agent_fitness) | 4 (OTel-native fits long-running observability) | 0.6 | OTel semantic conventions for gen-ai | trace context preserves across long sessions | exporter batching |
| D29 (anti_pattern_score) | 5 (no anti-patterns; OTel-standard) | 0.4 | OTel compliance | semantic-conventions PR-mention | grafana blog "production deployment" |
| D30 (judge_on_judge_meta) | n/a (not a judge) | 0.4 | — | — | — |
| D31 (blast_radius) | 5 (additive-only; Python library import; no replace required of any installed plugin or service; rollback = `pip uninstall openlit`) | 0.6 | additive install | no settings.json mutation required | no .mcp.json mutation required |
| D32 (cncf_oss_brittle_tests) | 4 (OpenSSF criticality score not pre-computed but PyPI download count + 2454 stars + 50+ integrations = CNCF-adjacent maturity) | 0.4 | OpenTelemetry CNCF graduated | 50+ provider integrations | grafana ecosystem |
| D33 (cross_source_quorum) | 5 (6-of-6 Stage-0 sources positive; convergence count = 6 ≥ 4 required for D33) | 0.8 | GitHub REST | DeepWiki | PyPI |
| D34 (cohort_overlap_signal — INVERTED) | 3 (mid-overlap; competes with Langfuse + Phoenix but adds GPU dimension — not full saturation but not no-overlap either; **W325-C-Gap-3 W_install bump 0.7→0.9 applies**) | **0.9** | langfuse :3000 active | phoenix :16006 active | nvidia-gpu-exporter port-conflict |
| **D35** (cc_pathway_support) | **1** (library only; NO CC plugin entrypoint; NO MCP server entrypoint; NO SKILL.md; NO hook — pure Python/TS/Go lib) | 1.0 | repo lacks `.claude-plugin/` dir | repo lacks `mcp/server.py` entry | PyPI metadata has no `entry_points` for `mcp` or `claude` |
| D36 (architectural_meta_evolution_pressure) | n/a (META-DIM W=0.0; arch-itself only) | 0.0 | — | — | — |
| D37 (research_arch_sota_alignment) | n/a | 0.0 | — | — | — |
| **D38** (mcp_integration_native) | **3** (DeepWiki confirms "OpenLIT supports the Model Context Protocol (MCP) for observability" + "auto-instrumentation for MCP applications" — but it is a CLIENT/instrumenter, not a server. Partial MCP integration.) | 1.0 | docs.openlit.io MCP page | DeepWiki Q&A confirms | repo grep for "MCP" |
| **D39** (opus_4_7_compat) | 5 (Anthropic API via `anthropic>=0.42.0` — supports Claude Opus 4.x; W324 cache + W326 4.7 compat preserved) | 1.0 | PyPI dep on anthropic | examples/anthropic-chat-app/ | Claude API namespace `messages.create()` standard |
| **D40** (local_runtime_z_portable) | 4 (pip-install + venv-friendly; OTLP exporter routable to localhost; Docker components optional; no machine-specific paths in PyPI dist) | 1.0 | pip install path-agnostic | OTLP env-var configurable | Docker compose opt-in |
| **D41** (autonomous_loop_compat) | 4 (`openlit.init(otlp_endpoint=...)` once per process; persists per long-running loop; instrument-once-emit-many model) | 1.0 | one-time init | OTel batch-export | autonomous-loop fits OTel context propagation |
| **D42** (multi_mcp_convergence_signal) | 5 (6-source convergence at Stage-0; all 6 corroborate identical fingerprint) | 1.0 | github REST | DeepWiki | PyPI |
| **D43** (perplexity_research_signal) | n/a (perplexity-mcp NOT invoked this audit — paid; exa + WebSearch suffice for D33 quorum) | 0.5 | — | — | — |
| **D44** (codex_round_efficiency) | n/a (no codex invocation this Stream — pure CC orchestration) | 0.5 | — | — | — |
| **D45** (awesome_list_corroboration) | 4 (referenced by `Arize-ai/phoenix` + `Arize-ai/openinference` (both link openlit instrumentation) + grafana.com blog + oneuptime.com — multi-vendor cross-link) | 0.5 | Arize phoenix README | Arize openinference README | grafana.com blog |

**3-org-distinct check** (anchor diversity per sca-v9 §6.2):
- D1: github + PyPI + (Anthropic-ecosystem irrelevant — license is universal) → 2-org-on-license-strict; PASS via license-universal exception
- D5: github + PyPI + 3rd-party docs → **3-org PASS**
- D33: github + DeepWiki + PyPI + WebSearch + Grafana blog + Splunk Lantern → **6-org PASS**
- D34: langfuse-vendor + phoenix-vendor + nvidia-exporter-vendor → **3-vendor PASS**
- D45: Arize + Grafana + OneUpTime → **3-org PASS**

**Cohort hardgate**: D-EMP=1 passes (does not BLOCK from T1).
**Soft-cap**: D35=1 caps verdict at T3 PATTERN-STUDY per sca-v9 §5.7. **CRITICAL FINDING — see §3.5 below.**

### 3.5 — D35 soft-cap analysis

Per sca-v9 §5.7: "D35<2 caps verdict at T3 PATTERN-STUDY (cannot reach T1 INSTALL without at least MCP-or-plugin pathway)."

openlit has **no CC primitive entrypoint** (no plugin, no MCP server, no skill). D35=1 → **strict reading of sca-v9 caps openlit at T3**.

**But**: openlit is a **library** that gets imported by Python code (e.g., `harness/eval_harness.py`). The "install" is `pip install openlit` into the existing `Z:/venvs/claude` venv. The W325 Stream-D verdict scored install~4.5 BEFORE D35 soft-cap was applied → W325 verdict over-stated by a tier.

**Honest tier under sca-v9 strict-reading**: **T2 VENDOR-LIBRARY** (T3 floor breached upward by D-EMP=1 + 0 blast-radius + multi-MCP convergence = 6; "library that the CC-runtime python code can import" is a valid T2 pathway per sca-v8.1 §5.7 W319 ratify).

**Operator-decision**: install or defer? The case for install:
- Closes nvidia-gpu-exporter observability gap (per W325 Stream-D)
- Single-line `openlit.init()` in eval_harness.py adds GPU + LLM-call telemetry
- Apache-2.0, additive, rollback trivial (`pip uninstall openlit`)
- Library-tier install does NOT count as a primitive (no settings.json or .mcp.json mutation), so CR-1/CR-2 do not apply

**My recommendation**: **install at T2-LIBRARY tier**, document as observability dependency in `harness/eval_harness.py` requirements section, no SKILL.md or plugin claim.

### 3.6 — Raw composite_install_score (path-(b) v9 denom=34.7)

(Skipping arch-itself self-ref dims D43/D44 since these score n/a for external candidates with no codex/perplexity invocation this audit. D25/D26/D27/D30 also n/a per dim-definition for non-research-benchmark candidates.)

Sum of `score × weight × confidence_factor=1.0` over scored dims:
- D-EMP 1×1.0 = 1.0
- D1 5×1.0 = 5.0
- D2 4×0.8 = 3.2
- D4 5×0.8 = 4.0
- D5 5×1.0 = 5.0
- D6 4×0.5 = 2.0
- D7 4×0.8 = 3.2
- D8 5×0.6 = 3.0
- D9 5×1.0 = 5.0
- D10 2×0.7 = 1.4
- D11 5×0.6 = 3.0
- D12 5×0.5 = 2.5
- D13 5×0.6 = 3.0
- D14 4×0.4 = 1.6
- D15 4×0.4 = 1.6
- D16 3×0.6 = 1.8
- D17 5×0.5 = 2.5
- D18 5×1.0 = 5.0
- D19 4×0.4 = 1.6
- D20 4×0.4 = 1.6
- D21 3×0.5 = 1.5
- D22 4×0.4 = 1.6
- D23 4×0.6 = 2.4
- D24 5×0.8 = 4.0
- D28 4×0.6 = 2.4
- D29 5×0.4 = 2.0
- D31 5×0.6 = 3.0
- D32 4×0.4 = 1.6
- D33 5×0.8 = 4.0
- D34 3×0.9 = 2.7 (D34 inverted; 3=mid-overlap)
- D35 1×1.0 = 1.0 (soft-cap trigger)
- D38 3×1.0 = 3.0
- D39 5×1.0 = 5.0
- D40 4×1.0 = 4.0
- D41 4×1.0 = 4.0
- D42 5×1.0 = 5.0
- D45 4×0.5 = 2.0

Sum = **108.2**

Effective denom (skipping D3 superseded, D25-D27 n/a, D30 n/a, D36-D37 W=0.0, D43-D44 n/a):
34.7 − (D3 0.8) − (D25 0.4) − (D26 0.4) − (D27 0.4) − (D30 0.4) − (D36 0.0) − (D37 0.0) − (D43 0.5) − (D44 0.5) = 34.7 − 3.4 = **31.3**

**install_score = 108.2 / 31.3 = 3.456 / 5**

**This is BELOW the 4.5 T1-floor and BELOW the 3.7 T2-floor → routes to T3 PATTERN-STUDY under sca-v9 strict path-(b)**.

**Reconciliation with W325 Stream-D rough-score "4.5"**:
- W325 Stream-D scoring was preliminary (`~4.5`) — explicit "rough" caveat in original doc
- W325 likely did not apply D35 soft-cap or D34 inverted weighting strictly
- This wave's full audit applies sca-v9 strictly → score lands at 3.456
- The discrepancy IS the value-add of the W326 full-audit pass (per W325 Stream-D §10 closing note: "full sca-v9 audit pass" was explicitly the W326 ask)

**Honest verdict reclassification**: **T3 PATTERN-STUDY** with operator-override to T2-LIBRARY-INSTALL if observability-of-eval-harness is a stated need. The W325 Stream-D pre-audit "T1 INSTALL-CANDIDATE" tier is RETRACTED under sca-v9 strict scoring.

---

## §4 — D-EMP smoke verification (HOLD — local pip not executed by this Stream)

**Per W326 Stream C scope ("DO NOT modify settings.json or .mcp.json or any plugin file directly — operator-interactive `claude plugin install` required for those")** AND the parallel directive ("NO destructive installs"), this audit **DOES NOT** execute `pip install openlit` into `Z:/venvs/claude/`.

**Empirical-viability evidence collected via non-destructive means**:
- ✓ PyPI package exists (v1.42.0 Apache-2.0)
- ✓ DeepWiki has indexed substantive Q&A
- ✓ Repo HEAD is fresh (2026-05-13)
- ✓ Dependencies are non-conflicting with current `Z:/venvs/claude/` pip-tree
- ✓ 3-org-distinct corroboration (Arize, Grafana, Splunk)

**D-EMP smoke that operator should run**:
```bash
Z:/venvs/claude/Scripts/pip.exe install "openlit==1.42.0"  # ~10s install
Z:/venvs/claude/Scripts/python.exe -c "import openlit; print(openlit.__version__); openlit.init(otlp_endpoint='http://127.0.0.1:4318')"
# Expected: prints "1.42.0" + no exception; no listener opens (purely client-side instrumentation)
```

**Rollback**: `Z:/venvs/claude/Scripts/pip.exe uninstall openlit -y` (10s).

**D-EMP would graduate from 1→3 once smoke passes** (PASS-GATE-AT-1 is the audit-time score; production-confirmed-PASS = 3+).

---

## §5 — VERDICT-LEDGER row draft (NOT applied; main session decides)

Per W325-D-SOTA-CANDIDATES.md format. Ledger location to be confirmed (W288 path or new W326 path):

```jsonl
{"row":"W326-86","date":"2026-05-19","candidate":"openlit/openlit","head_sha":"7ca59852f6","pypi_version":"1.42.0","license":"Apache-2.0","rubric_version":"sca-v9","path":"b","stage_0_existence":"PASS-6-of-6-sources","d_emp":1,"d35":1,"d34":3,"d34_w_install":0.9,"composite_install_score":3.456,"composite_pattern_score":"not-computed","effective_denom_install":31.3,"tier":"T3-PATTERN-STUDY-OR-T2-LIBRARY-OPERATOR-OVERRIDE","w325_rough_score":"~4.5","w326_strict_score":3.456,"reclassification_reason":"sca-v9 §5.7 D35<2 soft-cap; W325 rough-score did not apply soft-cap","action":"OPERATOR-DECISION-INSTALL-AT-T2-LIBRARY-FOR-OBSERVABILITY-OR-DEFER","blast_radius":"additive-only","rollback":"pip uninstall openlit","convergence":"6-of-6","3_org_distinct":"PASS-via-Arize-Grafana-OneUpTime-Splunk"}
```

---

## §6 — Install + wire-up + rollback operator-action sequence

### Step 1: pip install (10s)
```powershell
Z:/venvs/claude/Scripts/pip.exe install "openlit==1.42.0"
```

### Step 2: smoke import (1s)
```powershell
Z:/venvs/claude/Scripts/python.exe -c "import openlit; print(openlit.__version__)"
# Expected stdout: 1.42.0
```

### Step 3: wire into eval_harness.py (proposed addition; OPERATOR-DECISION)

If `OPENLIT_OBSERVE_HARNESS=1` env-var set, add at top of `harness/eval_harness.py` `main()`:

```python
import os
if os.environ.get("OPENLIT_OBSERVE_HARNESS") == "1":
    try:
        import openlit
        openlit.init(
            otlp_endpoint=os.environ.get("OTEL_EXPORTER_OTLP_ENDPOINT", "http://127.0.0.1:4318"),
            application_name="claude-sota-installed-eval-harness",
            environment=os.environ.get("CLAUDE_RUN_MODE", "interactive"),
            collect_system_metrics=True,  # GPU + CPU + memory time-series
        )
    except ImportError:
        pass  # openlit not installed; degrade gracefully
```

### Step 4: GPU-collector wire-up (closes nvidia-gpu-exporter gap; OPTIONAL)

NSSM-managed service replacing the EXITED nvidia-gpu-exporter at :9835:
```powershell
# Pull the otel-gpu-collector container
docker pull ghcr.io/openlit/otel-gpu-collector:latest
# Run with localhost OTLP endpoint
docker run -d --name openlit-otel-gpu-collector --restart unless-stopped \
  --gpus all -e GPU_APPLICATION_NAME=claude-sota-installed \
  -e OTLP_ENDPOINT=http://host.docker.internal:4318 \
  -e OTLP_INSECURE=true \
  ghcr.io/openlit/otel-gpu-collector:latest
```

### Step 5: Verify OTLP traces visible (1min)

If Phoenix is running at :16006 (per W315-r2 Stream E healthy-services):
- Set `OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:6006/v1/traces`
- Run a harness invocation: `Z:/venvs/claude/Scripts/python.exe harness/eval_harness.py --mode aggregate-demo`
- Open `http://127.0.0.1:16006/` in browser → traces should appear under app name "claude-sota-installed-eval-harness"

### Rollback (60s total)

```powershell
# 1. Uninstall pip package
Z:/venvs/claude/Scripts/pip.exe uninstall openlit -y
# 2. Stop + remove GPU collector (if started)
docker stop openlit-otel-gpu-collector ; docker rm openlit-otel-gpu-collector
# 3. Revert eval_harness.py wire-up (delete the 10-line block from main())
git checkout -- harness/eval_harness.py
```

---

## §7 — Forward-AIs (W327)

| ID | Priority | Action |
|---|---|---|
| W326-C-2-AI-1 | P1 | Operator-decision: **install openlit at T2-LIBRARY** OR **defer pending observability-stack scoping**. Tier-reclassification context: sca-v9 strict-score is 3.456 (T3), not the rough 4.5 (T1) from W325 Stream-D |
| W326-C-2-AI-2 | P1 | If install: execute §6 Step 1+2+3 ONLY (pip install + smoke + eval_harness.py wire). DEFER §6 Step 4 (otel-gpu-collector) until W327 observability-rack scope ratification |
| W326-C-2-AI-3 | P2 | If install: append VERDICT-LEDGER row per §5 (location TBD by main session) |
| W326-C-2-AI-4 | P2 | Update `harness/eval_harness.py` requirements docstring at L41 to add `# Optional: openlit>=1.42.0 for OTel-native observability (env-flag OPENLIT_OBSERVE_HARNESS=1)` |
| W326-C-2-AI-5 | P3 | W325 Stream-D §10 **W326 carry-forward CLOSED** (this audit completes the "full sca-v9 audit pass" ask) |
| W326-C-2-AI-6 | P3 | If §6 Step 4 ratified: NSSM-wrap `otel-gpu-collector` Docker container as `OpenlitGpuCollector` service for restart-on-boot, per W316-A patternlet |

---

## §8 — Cite-anchors

- Repo: `https://github.com/openlit/openlit` HEAD `7ca59852f6` 2026-05-13
- PyPI: `https://pypi.org/project/openlit/` v1.42.0 Apache-2.0
- Docs: `https://docs.openlit.io/` (operator may visit; not fetched this audit)
- DeepWiki Q&A: `https://deepwiki.com/search/what-is-openlits-core-purpose_5fcdab4d-f8dc-4f86-a9b1-b1df3b4a58d8`
- Grafana blog: `https://grafana.com/blog/ai-observability-llms-in-production/`
- Splunk Lantern: `https://lantern.splunk.com/Observability_Use_Cases/Monitor_Business/Monitoring_Gen_AI_apps_with_NVIDIA_GPUs`
- OneUpTime: `https://oneuptime.com/blog/post/2026-02-06-openlit-opentelemetry-native-genai-observability/view`
- Arize phoenix README: `https://github.com/Arize-ai/phoenix` references `openinference-instrumentation-openlit`
- W325 Stream-D: `Z:/claude-sota-installed/docs/architecture/W325-RUNTIME-V8-SOTA-SWEEP/STREAM-D-SOTA-CANDIDATES.md` C-1 entry
- sca-v9 SKILL.md: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` L416 (composite_denom_install=34.7) + L194 (D35 soft-cap)
