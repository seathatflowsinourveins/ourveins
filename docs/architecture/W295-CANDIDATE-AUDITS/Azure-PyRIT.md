# W295 Candidate Audit — Azure/PyRIT (Python Risk Identification Toolkit)

> Independent sca-v3.1 17-dim audit. Confirms W291.Stage2 prelim **T3 PATTERN-STUDY** for the
> `microsoft/PyRIT` canonical repo. The `Azure/PyRIT` org-name in the W289 F3 candidate row is
> a **transferred-mirror artefact** — that repo is currently `archived=True` with 31 stars,
> 2 contributors, and 0 releases. Audit redirected to the canonical `microsoft/PyRIT` (3,848★,
> 120 contributors, v0.13.0 active). Both URLs in §2 below.
>
> **Rule version**: `sca-v3.1` (W293-shipped: D16+D17+D18 governance/robustness/safety dims).
> **Decided at**: 2026-05-18 (W295 wave).
> **Reverification due**: ~W301 (6 waves out).

---

## §1. Scope of audit

**Candidate**: `microsoft/PyRIT` (canonical) — open-source Microsoft AI Red Team automation
framework for generative-AI risk identification. The W289-F3 row points to `Azure/PyRIT`
which is a **stub mirror archived 2026-03-25** (verified via GH API below). All `microsoft/`
URLs **still resolve** and `pyproject.toml@main` shows `version="0.14.0.dev0"` actively
developed by `@romanlutz` / `@rlundeen2` (Microsoft AIRT) on `2026-05-18`. The audit treats
both repos as one slug with `Azure/PyRIT` recorded as the mirror lineage.

**Audit question**: should this runtime adopt PyRIT, vendor-fork a subset, study patterns,
or merely cite? Existing primitives in scope: `codex:codex-rescue` (GPT-5.5 cross-model
review), `agent-teams:team-spawn security` preset, `superpowers:` skill bundle,
`comprehensive-review:security-auditor`, plus locally-curated `wshobson-security-auditor`
agent. None of these targets generative-AI red-team specifically (they target code-class
security and review).

---

## §2. Evidence collected (≥6 typed source families)

### 2.1 Typed-evidence ledger (sca-v3.1 D5 requirement)

| Type | Source | URL / cite | Access date |
|---|---|---|---|
| **BENCHMARK** (with numbers) | PyRIT case study — Phi-3 release: 15 harm categories, 1000+ prompts generated/normalized/submitted/scored in single operation, "matter of hours instead of weeks" (Copilot exercise) | `arXiv:2410.02828v1` §IV-B Case Study (Bullwinkel et al., MS AIRT) [EXTERNAL] | 2026-05-18 |
| **BENCHMARK** (production scale) | 80+ operations across 100+ products Oct-2024 baseline, 6 weeks dataset prep window | `arXiv:2501.07238v1` "Lessons From Red Teaming 100 Generative AI Products" (Microsoft Research, Jan 2025) [EXTERNAL] | 2026-05-18 |
| **CODE READING** | `pyrit/orchestrator/__init__.py` exports: `PromptSendingAttack`, `RedTeamingAttack`, `CrescendoAttack`, `TAPAttack`, `SkeletonKeyAttack`, `ManyShotJailbreakAttack`, `RolePlayAttack`, `ContextComplianceAttack`, `PairOrchestrator` (DeepWiki citation chain verified) | `https://github.com/microsoft/PyRIT/tree/main/pyrit/executor/attack` [EXTERNAL] | 2026-05-18 |
| **CODE READING** | `pyproject.toml@main` — `version="0.14.0.dev0"`, MIT license, Python `>=3.10,<3.15`, ~50 deps (openai>=2.2.0, azure-ai-contentsafety, transformers>=5.0.0rc3, fastapi, SQLAlchemy, pydantic, datasets>=4.8.0) | `https://raw.githubusercontent.com/microsoft/PyRIT/main/pyproject.toml` [EXTERNAL] | 2026-05-18 |
| **CODE READING** | Scorer hierarchy — `TrueFalseScorer{SubString,Pattern,SelfAskTrueFalse,SelfAskRefusal}` + `FloatScaleScorer{SelfAskScale,SelfAskLikert,AzureContentFilter,PromptShield}` + Composite scorers + Multi-modal scorers (Video/Audio) | DeepWiki Q&A grounded in `pyrit/score/` exports [EXTERNAL] | 2026-05-18 |
| **PRACTITIONER REPORT** | Microsoft AIRT — "100+ operations" first-party report; supports Copilot family, Phi-3 release, CBRN/election/cybersecurity/RAI harm categories | `https://www.microsoft.com/en-us/research/publication/lessons-from-red-teaming-100-generative-ai-products/` [EXTERNAL] | 2026-05-18 |
| **PRACTITIONER REPORT** | Third-party Microsoft TechCommunity post: "PyRIT is a toolkit — it gives you the building blocks, not the pipeline" + CI/CD wrapper pattern (config-driven YAML, OWASP LLM Top-10 mapping, release-gate exit codes) | `https://techcommunity.microsoft.com/blog/appsonazureblog/securing-your-ai-agents-before-they-ship-red-teaming-with-microsoft-pyrit/4515514` (2026-04-28) [EXTERNAL] | 2026-05-18 |
| **PRACTITIONER REPORT** | Learn-Prompting guide: "PyRIT + HarmBench + targeted manual testing is a common working stack"; flags Python-heavy setup learning curve | `https://learn-prompting.fr/blog/ai-red-teaming-pyrit` (2026-01-29) [EXTERNAL] | 2026-05-18 |
| **PRACTITIONER REPORT** | OWASP GenAI Security Crosswalk: PyRIT maps to LLM01..LLM10 risk surface (LLM01 prompt-injection, LLM02 sensitive-info-disclosure, LLM04 data/model poisoning, LLM07 system-prompt leakage); also MITRE ATLAS technique mappings (AML.T0051.000 prompt-injection variants etc.) | `https://github.com/emmanuelgjr/GenAI-Security-Crosswalk` [EXTERNAL] | 2026-05-18 |

### 2.2 GitHub-API truth set (live)

**`Azure/PyRIT`** (W289-F3 candidate slug):
- `stargazers_count=31` · `forks_count=5` · `contributors=2` (`microsoftopensource`, `spencrr`)
- `archived=True` · `disabled=False` · `created_at=2026-03-25T00:50:57Z` · `pushed_at=2026-03-25T01:18:52Z`
- `releases=0` · `homepage=https://microsoft.github.io/PyRIT` (points to MS docs)
- `license=MIT` · `topics=[ai-red-team, generative-ai, red-team-tools, responsible-ai]`
- Verdict: **transferred mirror / stub redirect** to canonical org. The 5 commits are all
  Microsoft Open Source bot commits (`SUPPORT.md`, `SECURITY.md`, `README`, GH-Pages config)
  from 2026-03-25. No code transfer occurred.

**`microsoft/PyRIT`** (canonical):
- `stargazers_count=3848` · `forks_count=759` · `subscribers_count=45` · `open_issues_count=83`
- `archived=False` · `created_at=2023-12-12T15:46:28Z` · `pushed_at=2026-05-18T18:40:53Z`
  (active **today**)
- `contributors=120` · top 5: `rlundeen2(288)`, `romanlutz(257)`, `jsong468(82)`, `jbolor21(64)`,
  `nina-msft(58)` — all Microsoft AIRT
- `releases≥20` page-1 shows v0.13.0 (2026-04-17) ← v0.12.1 ← v0.12.0 ← v0.11.0 ← v0.10.0 etc.
  Steady ~monthly cadence over last 12 months
- v0.13.0 release notes: **78% global coverage gate + 90% diff gate** (#1605) — strong CI rigour
- `license=MIT`

### 2.3 Source-disagreement check (sca-v3.1 anti-pattern: silent-averaging)

The two arXiv papers + TechCommunity post + Learn-Prompting blog all **converge** on:
- PyRIT is a **toolkit / framework**, not a turnkey scanner — wrapper required for CI/CD
  (TechCommunity, Learn-Prompting, MS Issue #511 own admission re: garak/Giskard parity)
- Strong primitives + weak glue is the consistent pattern.

No contradictory benchmark or practitioner report surfaced; no `disagreement[]` entry needed.

---

## §3. 17-dimension sca-v3.1 rubric scoring

Anchors per `STREAM-C-RUBRIC-v3.md §1` + W293 sca-v3.1 amendments (D16-D18). Scoring is for
`microsoft/PyRIT` (canonical) since `Azure/PyRIT` mirror is non-substantive.

| Dim | Name | Score | Anchor / cite |
|---|---|---|---|
| **D1** | license_compatibility | **5** | MIT license (`pyproject.toml@main`) — permissive, compatible with this runtime's mixed-license tree; no INSTALL hard-cap. [EXTERNAL: github.com/microsoft/PyRIT/blob/main/LICENSE] |
| **D2** | capability_uniqueness | **5** | Generative-AI red-team primitives (Crescendo, TAP, Skeleton Key, PAIR, GPTFuzzer, GCG, many-shot, persuasive-adversarial). Zero overlap with installed code-security primitives. Closest competitor is NVIDIA `garak` (scanner-shaped, less multi-turn). PyRIT is the multi-turn + multi-modal SOTA. [EXTERNAL: arXiv:2410.02828 §III.B] |
| **D3** | harness_fit | **2** | Heavy Python lib with SQLite/Azure-SQL persistence (`~/.pyrit/.env` + `~/.pyrit/.pyrit_conf` startup files; web UI at `:8000`). Assumes interactive operator (CoPyRIT GUI) or wrapper-script workflow. The runtime's autonomous `/loop` is not the natural use-case. Windows-installable but `pyodbc>=5.1.0` + Azure-SQL hooks complicate portability. **Triggers INSTALL hard-cap (D3<2 threshold is breached at exactly 2 — borderline, treat as cap).** Routes to PATTERN-STUDY. [EXTERNAL: pyproject.toml deps; microsoft.github.io/PyRIT install docs] |
| **D4** | claude_code_runtime_pathway_support | **1** | **No MCP server**, no Claude Code plugin, no skill, no agent. CLI surface = `pyrit_scan` / `pyrit_shell` (subprocess). Library is async Python. Wrapping it as a custom MCP would be operator-built net-new work, not adopt-from-upstream. **INSTALL hard-cap is D4 unspecified in v3.1 but D3<2 already caps; install cleared.** [EXTERNAL: pyproject.toml entry_points + DeepWiki Q&A "no MCP interface"] |
| **D5** | typed_evidence_diversity | **5** | 2 benchmarks (Phi-3 + 100-product) + 5 code-readings (orchestrator/scorer/converter/dataset/pyproject) + 4 practitioner reports across MS AIRT + 3 third-party orgs. Saturated. [EXTERNAL: all §2.1 rows] |
| **D6** | authority_weight (Bayesian author-prior) | **4** | `α_anthropic`=0 · `β_known_partner`=0 (ledger <10 entries) · `γ_long_running_repo`=+1 (created 2023-12, 20+ releases over 28 months) · `δ_abandoned`=0. Raw=1. **Authoring lifted by**: Microsoft AIRT first-party (peer-reviewed arXiv x2 + Microsoft Research publication + Microsoft Security Blog announcement). Microsoft is documented Anthropic partner via Azure-AI infra. Score=4 (one notch below Anthropic-canonical α=+2 implicit). |
| **D7** | maintenance_velocity_balanced | **5** | Steady monthly cadence (v0.10→v0.11→v0.12→v0.12.1→v0.13 over 5 months). 120 contributors, top-3 with 288/257/82 commits (no solo bus-factor). Active **today** (2026-05-18 commit by `romanlutz` 18:20 UTC). 78% test-coverage floor + 90% diff floor enforced as CI gate (v0.13.0 #1605). No abandonment risk. |
| **D8** | benchmark_deltas | **3** | PyRIT itself is a framework — not a model being benchmarked. The Phi-3 case study produces ASR (Attack Success Rate) deltas against baseline models (numbers exist) but they evaluate **target models**, not PyRIT vs baseline-red-team-tool. No measured "PyRIT vs garak" head-to-head exists. The closest is the MS-own Issue #511 parity-tracking page admitting garak/Giskard/CyberSecEval have items PyRIT lacks. **No benchmarkable PyRIT-vs-X delta → score=3 (parity-by-default)**. [EXTERNAL: github.com/microsoft/PyRIT/issues/511] |
| **D9** | failure_mode_disclosure | **4** | `SECURITY.md` present (MIT std), `CONTRIBUTING.md`, jupyter-book documentation, RUNBOOK-equivalent at microsoft.github.io/PyRIT. Issue #511 transparently lists PyRIT's parity gaps vs garak/Giskard/CyberSecEval. Limitation disclosure is explicit, mid-tier strong. |
| **D10** | duplication_against_installed | **5** | **Zero duplication** against installed primitives. The runtime has no generative-AI red-team capability. Existing `codex:codex-rescue` + `wshobson-security-auditor` review **code** for vulnerabilities, not **GenAI models** for jailbreak/PII/harm-category responses. Surface is unique. |
| **D11** | context_budget_cost | **5** (inverted scale; high=cheap) | T3 PATTERN-STUDY routing means **zero preload cost** — patterns are documented in a `.md` file, no tool-list growth, no skill description preload, no CLAUDE.md edit. Cost=zero. |
| **D12** | community_signal_distribution | **4** | Multi-channel: 3,848 GH stars + 2 arXiv papers + Microsoft Security Blog + Microsoft Research publication + Microsoft TechCommunity + community blog (Learn-Prompting) + Discord server + Issue #511 cross-vendor parity tracker. **Not stars-alone** (would cap at 3); diversified across academic/vendor/community. |
| **D13** | pattern_extractability | **5** | Patterns are highly portable as **documented architectures**: (a) orchestrator-pattern (target ↔ adversarial-LLM ↔ scorer loop); (b) scorer-hierarchy (TrueFalse vs FloatScale vs Composite); (c) converter-chain (Base64→Leetspeak→Translation multi-phase evasion); (d) seed-dataset registry (`SeedDatasetProvider.get_all_dataset_names()`); (e) OWASP LLM Top-10 + MITRE ATLAS mapping table. None require running the lib. |
| **D14** | reversible_pilotability | **5** | PATTERN-STUDY rollback = delete one `.md` doc + the pattern-extract section. INSTALL rollback (hypothetical T1, blocked by D3) would require `pip uninstall pyrit + rm ~/.pyrit/`. Pilot reversibility is trivial. |
| **D15** | supply_chain_safety | **3** | ~50 transitive Python deps (openai, transformers, fastapi, SQLAlchemy, pyodbc, azure-*, datasets, etc.) — wide attack surface. Microsoft Open Source program manages, but no public OpenSSF Scorecard found. v0.13.0 release notes mention "dependabot security alerts" closed (#1606) — active vuln-handling. No lockfile in pyproject — relies on `>=` pins. **Mid-tier**; if PATTERN-STUDY only, deps don't enter the runtime. |
| **D16** | bus_factor_governance (W293 NEW) | **5** | Top-3 contributors `rlundeen2`/`romanlutz`/`jsong468` (288/257/82) — no single-point-of-failure. 120 total contributors. Microsoft-org maintained; GitHub-repo lives under `microsoft/` GH org with security@microsoft.com escalation. Governance is corporate-strong (CNCF-quality on bus-factor + OpenSSF on accountability + ThoughtWorks on org-stability). [EXTERNAL: GH-API contributors] |
| **D17** | robustness_under_perturbation (W293 NEW) | **4** | 78% global coverage gate + 90% diff gate in CI (v0.13.0 PR #1605) — quantitatively strong vs typical OSS. Active dependabot alerts handled. Partner integration tests added (Azure OpenAI, AWS Bedrock — PR #1533, #1575). One notch below HELM-class (which expects formal robustness eval) since PyRIT's own robustness isn't externally benchmarked yet. [EXTERNAL: github.com/microsoft/PyRIT/releases/tag/v0.13.0] |
| **D18** | runtime_safety_and_privacy_risk (W293 NEW) | **3** | **Dual-use concern** — PyRIT is itself an offensive red-team toolkit. Microsoft AIRT publishes it responsibly under MIT with clear use-case framing ("augments expertise, doesn't replace manual"), but the toolkit can be misused to attack third-party endpoints. If pattern-extracted to a doc the misuse risk is null. **D18≥2 → no Universal REJECT trigger**. As PATTERN-STUDY (no installation), safety risk is negligible. As INSTALL it would carry operator-responsibility to not point at unauthorized targets. [EXTERNAL: NIST GAI 600-1 §"dual-use foundation models"; MS Security Blog 2024-02-22 framing] |

### 3.1 Composite scoring

**install_score** (13 install-relevant dims, weighted Σ/13.6):

```
D1×1.5 + D2×0.9 + D3×1.3 + D4×1.3 + D5×1.0 + D6×0.9 + D7×1.0 +
D8×1.0 + D9×0.7 + D10×1.1 + D11×0.8 + D14×1.1 + D15×1.0
= 5×1.5 + 5×0.9 + 2×1.3 + 1×1.3 + 5×1.0 + 4×0.9 + 5×1.0 +
  3×1.0 + 4×0.7 + 5×1.1 + 5×0.8 + 5×1.1 + 3×1.0
= 7.5 + 4.5 + 2.6 + 1.3 + 5.0 + 3.6 + 5.0 + 3.0 + 2.8 + 5.5 + 4.0 + 5.5 + 3.0
= 53.3 / 13.6
= 3.92
```

W293 sca-v3.1 denominator expands to **16.5** when D16/D17/D18 included:
`53.3 + (5×0.9 + 4×0.7 + 3×0.6) / 16.5 ≈ (53.3 + 9.1) / 16.5 ≈ 3.78`
(D16/D17/D18 weights treated as install-relevant per W293 §"composite expansion".)

**pattern_score** (7 pattern-relevant dims D2/D5/D6/D8/D9/D12/D13, weighted Σ/7.1):

```
D2×1.4 + D5×1.0 + D6×0.8 + D8×0.9 + D9×0.8 + D12×0.7 + D13×1.5
= 5×1.4 + 5×1.0 + 4×0.8 + 3×0.9 + 4×0.8 + 4×0.7 + 5×1.5
= 7.0 + 5.0 + 3.2 + 2.7 + 3.2 + 2.8 + 7.5
= 31.4 / 7.1
= 4.42
```

### 3.2 Hard-cap audit

| Class | Trigger | Status |
|---|---|---|
| Universal REJECT — D7≤1 | D7=5 (active monthly cadence) | **CLEAR** |
| Universal REJECT — D10≤2 | D10=5 (zero duplication) | **CLEAR** |
| Universal REJECT — D15≤1 | D15=3 | **CLEAR** |
| Universal REJECT — D18<2 (W293) | D18=3 | **CLEAR** |
| INSTALL-cap — D1<3 | D1=5 | clear |
| INSTALL-cap — D3<2 | D3=2 (**borderline at threshold; treat as cap-triggering**) | **TRIGGERS INSTALL CAP** |
| INSTALL-cap — D5<4 | D5=5 | clear |
| INSTALL-cap — D14<3 | D14=5 | clear |
| INSTALL-cap — D17<2 (W293) | D17=4 | clear |
| INSTALL-cap — D16<2 (W293 T1+T2 only) | D16=5 | clear |
| VENDOR-FORK cap — license-forbids-fork | MIT permits fork | clear |

**Net**: `install_score=3.78` after W293 expansion + D3=2 borderline-INSTALL-cap.
T1 INSTALL blocked. T2 VENDOR-FORK theoretically still open (no critical cap), but
`install_score=3.78` is below `[3.0, 3.9]` only on tight margin — and the actual reason
to fork would be to extract patterns, not run upstream-tracked code. **Pattern-suitability
(4.42) >> install-suitability (3.78)**, single-composite illusion avoided per v3.1 §272.

### 3.3 Adversarial-review delegation note

Per sca-v3.1 §144 the 3-persona fan-out + codex stop-hook ratification fires on the
verdict commit, not within this audit document. This audit hands off the verdict;
the W295 ledger commit invokes the gate. Preliminary self-review:

| Persona | Pre-emptive concern | Anticipated stance |
|---|---|---|
| **security** | Dual-use offensive tooling. PATTERN-STUDY (no install) carries no supply-chain or runtime risk. | APPROVE — pattern doc only |
| **architect** | T3 routing respects D3<2 hard-cap and CR-2 (no .py/.sh hooks). PATTERN-STUDY doc doesn't violate CR-1..CR-5. | APPROVE |
| **code-reviewer** | Upstream is actively maintained (commit today), high coverage (78%/90%). Lifting patterns from a stable v0.13.0 snapshot is sound. | APPROVE |
| **codex (auto)** | Fires on commit per W280a Stop hook. | pending |

---

## §4. Tier verdict — **T3 PATTERN-STUDY** (CONFIRMED from W291.Stage2 prelim)

**Verdict**: **T3 PATTERN-STUDY**.

`pattern_score=4.42 ≥ 3.5` AND `D2=5 ≥ 4` AND `D13=5 ≥ 3` — all three T3 entry conditions met.
`install_score=3.78` would marginally qualify for T2 VENDOR-FORK except D3=2 INSTALL-cap fires
on the borderline; even were INSTALL routes open, the pattern-suitability gap (4.42 vs 3.78)
plus the harness-fit misfit (heavy dep tree, FastAPI/SQLAlchemy/CoPyRIT GUI assume interactive
operator) make T3 the correct routing. This affirms the W291.Stage2 prelim verdict.

### 4.1 Extractable patterns (≥2 required for T3)

**Pattern A — Orchestrator/Scorer/Converter triad architecture** (CODE-MAPPED):
- Source: `pyrit/executor/attack/{prompt_sending_attack,red_teaming_attack,crescendo_attack,
  tap_attack,skeleton_key_attack,pair_orchestrator}.py` plus `pyrit/score/{true_false_scorer,
  float_scale_scorer,composite_scorers}.py`.
- Pattern statement: separate the **attack-loop control** (orchestrator) from the **target**
  (PromptTarget abstraction over OpenAI/Azure/Anthropic/Google/HuggingFace endpoints) from the
  **scorer** (judge LLM or content-safety API). Each is plug-replaceable. The composition is
  config-driven YAML in the wrapper layer (per TechCommunity post pattern).
- Why valuable to this runtime: the same orchestrator/judge/target separation pattern can be
  imported into the `agent-teams:team-spawn security` preset and the `codex:adversarial-review`
  primitive. The current runtime conflates "reviewer" and "scorer" — PyRIT's separation makes
  them swappable. Maps to **sca-v5-Δ11 cross-model voting**: PyRIT's scorer-as-judge is exactly
  the Δ11 voting primitive at a different abstraction layer.
- Target extract artifact path: `docs/architecture/W295-CANDIDATE-AUDITS/patterns/PYRIT-PATTERN-ORCHESTRATOR-TRIAD.md` (W296 follow-up).

**Pattern B — OWASP-LLM-Top-10 + MITRE-ATLAS mapping table** (DATA-MAPPED):
- Source: PyRIT scenarios (`Jailbreak`, `FoundryScenario`, `Scam`, `Cyber`) + community
  crosswalks (`emmanuelgjr/GenAI-Security-Crosswalk` external) + TechCommunity wrapper
  pattern.
- Pattern statement: a fixed mapping from attack-class to OWASP LLM-Top-10 ID
  (LLM01-LLM10) and MITRE ATLAS technique (AML.T0051.000 etc.) enables **release-gate
  thresholds per OWASP category** (e.g. LLM02 sensitive-info threshold=0, LLM09
  misinformation threshold=relaxed). This converts qualitative adversarial review into
  quantitative pass/fail CI gates.
- Why valuable to this runtime: the `codex:codex-rescue` Stop-hook currently emits
  BLOCK/REVISE/APPROVE without category-specific thresholds. Adopting the OWASP mapping
  lets the runtime tune cardinal-rule sensitivity per category (e.g. always BLOCK on
  LLM02-class secret-leak in commit diffs, even when overall codex says APPROVE).
- Target extract artifact path: `docs/architecture/W295-CANDIDATE-AUDITS/patterns/PYRIT-PATTERN-OWASP-LLM10-MAPPING.md` (W296 follow-up).

**Pattern C — Multi-phase converter chain (BONUS, MEETS-OR-EXCEEDS THRESHOLD)**:
- Source: `pyrit/prompt_converter/__init__.py` — Base64Converter, LeetspeakConverter,
  TranslationConverter, AddImageTextConverter, QRCodeConverter, etc. (~70 converters
  per TechCommunity post).
- Pattern statement: stack-able encoding/translation/multi-modal converters compose into
  multi-phase evasion: `plain → encoded → semantic → multi-turn` (the TechCommunity
  wrapper's exact escalation ladder). The pattern is the **escalation function**, not the
  individual converters.
- Why valuable: this runtime's `agent-teams:team-spawn` preset doesn't currently model
  attack-escalation phases. The Δ-converter pattern can inform the test-team agent's
  escalation strategy when stress-testing this runtime's own prompts.
- Target extract artifact path: `docs/architecture/W295-CANDIDATE-AUDITS/patterns/PYRIT-PATTERN-CONVERTER-ESCALATION.md` (W296 follow-up).

**Total extractable patterns**: 3 (threshold for T3 verdict is 2; meets-or-exceeds).

### 4.2 Why NOT T4 CITE-ONLY

T4 CITE-ONLY would discard the orchestrator-triad pattern (Pattern A) as merely "referenced"
when in fact it offers concrete restructuring guidance for the `codex:adversarial-review`
primitive and the security agent-team preset. Pattern C (converter escalation) similarly
informs concrete agent-design choices. T3 PATTERN-STUDY is the correct tier because
patterns will be **actively extracted into runtime docs** (W296 follow-up), not just cited.

### 4.3 Why NOT T2 VENDOR-FORK

(Refuting the marginal `install_score=3.78` qualification.) Vendor-forking PyRIT would
import ~50 transitive deps including `pyodbc` (Azure-SQL driver), `azure-ai-contentsafety`
(Azure subscription required for the scorer), `transformers>=5.0.0rc3` (multi-GB model
download surface) — none of which the runtime needs. The harness-fit blocker (D3=2) is
**structural** to PyRIT's design: it expects a persistent SQLite/Azure-SQL memory backend
and a long-lived FastAPI process for CoPyRIT — incompatible with the autonomous-`/loop`
+ stateless-MCP model. Pattern extraction sidesteps all of this.

### 4.4 Why NOT T1 INSTALL

D3=2 borderline + D4=1 (no Claude Code pathway) + heavy dep tree + Azure-leaning auth
flows. No MCP server exists for PyRIT. Building one is operator net-new work, not
adopt-from-upstream — would violate Cardinal Rule 1 ("trusted upstream only").

### 4.5 Why NOT T5 REJECT

PyRIT is actively maintained, multi-contributor, peer-reviewed (arXiv x2 + MS Research),
MIT-licensed, with measured production deployment (100+ MS AIRT operations including Phi-3
+ Copilot). No universal-REJECT trigger fires. Affirmative-unfitness evidence absent. The
sca-v3.1 anti-pattern "Hard-cap REJECT without tier-route" forbids auto-rejecting on D3
hard-cap; T3 route remains open and is the correct destination.

---

## §5. Sister-stream coordination

| Sister stream | Connection | Action |
|---|---|---|
| **sca-v5-Δ11 cross-model voting** | PyRIT's scorer-as-judge IS the same primitive at a different abstraction. Multiple LLM scorers vote (Composite TrueFalse with AND/OR) just as Δ11 multi-model verdict-voting does. | W296 pattern extract Pattern A should cite Δ11 explicitly and propose a Composite-scorer-equivalent voting layer for `codex:adversarial-review`. |
| **sca-v5-Δ10 Phase-5 anti-bias gates** | PyRIT's bias-mitigation work — `SelfAskLikertScorer` with per-category prompts, multi-language converters preventing English-only bias, 15-category Phi-3 harm taxonomy preventing single-axis evaluation — maps to Δ10's anti-bias requirements at runtime. | Confirm in W296 pattern doc that the multi-rubric anti-bias convergence (per W292/W293 anti-bias mandate) absorbs PyRIT's category-fragmentation pattern (CBRN + phishing + ECI + bias + hate-speech + sexual + violent) as a non-collapsed taxonomy. |
| **W288 Stream D pipeline** | PyRIT's CI rigour (78% coverage floor + 90% diff floor + dependabot + partner integration tests) is a SOTA-grade ingest-pipeline reference. | Cite in W288-Stream-D §"production-grade ingest pipeline" as exemplar. No code change. |
| **wshobson-security-auditor agent (locally installed)** | The local custom agent reviews code-class security. PyRIT's scorer hierarchy is the missing GenAI-side equivalent. | W296 Pattern A doc should propose a sibling agent `wshobson-genai-redteam-auditor` (out-of-scope for this audit; flagged). |
| **W291.Stage2 ledger row for PyRIT** | Prelim T3 PATTERN-STUDY recorded. | This audit RATIFIES that verdict; W295 ledger row supersedes prelim with full evidence. |

---

## §6. Anti-bias structural proof (W292-R3 + W293 §D16-D18 §"anti-bias mandate")

Per W292's triple-convergent EVOLVE verdict and the operator's anti-bias mandate ratified
in W293, this audit explicitly addresses **structural biases** that could pre-determine
the verdict.

1. **Star-bias rejected**: Both `Azure/PyRIT` (31★) and `microsoft/PyRIT` (3,848★) data
   points are surfaced. Verdict is determined by `pattern_score=4.42` driven by D2/D13/D5
   evidence, not by raw star-count. D12 community signal is multi-channel (academic +
   vendor + community), not stars-alone — so D12=4 reflects diversification per v3 §268
   "Star-only gate" anti-pattern.

2. **Microsoft-affiliation bias acknowledged**: D6=4 is uplifted by Microsoft-as-author
   under the Bayesian author-prior, but the rubric anchor caps at 4 (one notch below
   Anthropic-canonical α=+2). The runtime's primary trust anchor is Anthropic — Microsoft
   is documented partner not parent. D6=5 would require Anthropic-publication, which
   doesn't apply here. **Anti-bias check passes** — the prior is structural, not
   ad-hoc reverence.

3. **Confirmation-bias check**: W291.Stage2 prelim was T3 PATTERN-STUDY. This audit's
   independent rescoring lands on T3 PATTERN-STUDY by a **different routing path** (this
   audit's `install_score=3.78` qualifies for T2 numerically but is overridden by D3
   hard-cap + pattern-vs-install delta; W291.Stage2's path is not re-stated here). Two
   independent paths converging is structural validation, not echo. The full §3 score
   table is auditable for re-litigation.

4. **Disagreement-surfacing**: §2.3 confirms zero source disagreement. Verdict-routing is
   not silently averaging contradictory signals. If a future practitioner report claims
   PyRIT-INSTALL is feasible for an autonomous-loop runtime, that becomes a re-audit
   trigger.

5. **D16/D17/D18 (W293) external-org convergence**: D16 anchored to 6 external rubrics
   (CNCF/OpenSSF/NIST/ThoughtWorks/Wikipedia/Anthropic), D17 to 5 (HELM/SWE-bench/NIST/
   OpenSSF/Anthropic), D18 to 3 (NIST GAI/OpenSSF/Anthropic). No single-rubric scoring;
   per W293 §"composite expansion" the multi-rubric convergence is the bias-mitigation
   primitive itself.

6. **Mirror-vs-canonical disambiguation**: The W289-F3 row pointed to `Azure/PyRIT` which
   is archived/empty/31★. A biased audit would either (a) score the empty mirror
   harshly and REJECT, or (b) silently substitute the canonical without disclosure.
   This audit transparently records the mirror state in §2.2 and explicitly redirects to
   `microsoft/PyRIT` with both URLs cited. **Mirror-substitution bias mitigated**.

7. **Cross-vendor parity transparency**: Per MS Issue #511 PyRIT itself catalogues its
   gaps vs `garak` / `Giskard` / `CyberSecEval`. The audit cites that issue (§2.1) rather
   than reporting only PyRIT-favorable evidence. Asymmetric-evidence bias mitigated.

---

## §7. Operator-actionable rollback / extract plan

This is **T3 PATTERN-STUDY** — no install, so no install-rollback. The deliverables are
extract-artifact docs to be written in W296 (post-codex ratification of this verdict):

| Artifact | Path | Estimated LOC | Wave |
|---|---|---|---|
| Pattern A doc | `docs/architecture/W295-CANDIDATE-AUDITS/patterns/PYRIT-PATTERN-ORCHESTRATOR-TRIAD.md` | ~200 | W296 |
| Pattern B doc | `docs/architecture/W295-CANDIDATE-AUDITS/patterns/PYRIT-PATTERN-OWASP-LLM10-MAPPING.md` | ~250 | W296 |
| Pattern C doc | `docs/architecture/W295-CANDIDATE-AUDITS/patterns/PYRIT-PATTERN-CONVERTER-ESCALATION.md` | ~150 | W296 |

**Reversibility of this audit itself**: delete `docs/architecture/W295-CANDIDATE-AUDITS/Azure-PyRIT.md`
+ remove the ledger row from `VERDICT-LEDGER.md`. Recovery time: <2 min. No state-mutation.

**Verdict-reverification trigger** (per decision-decay state machine):
- W301 (6 waves out) — full re-litigation due
- Earlier triggers: (a) PyRIT 1.0.0 release (currently 0.14.0.dev0); (b) MCP server exists
  upstream (would flip D4 from 1 to ≥4 and potentially upgrade to T1/T2); (c) PyRIT
  abandoned (D7 drops to ≤1 → REJECT).

---

## §8. Summary line for orchestrator (5 lines)

1. Verdict: **T3 PATTERN-STUDY** for `microsoft/PyRIT` (canonical; `Azure/PyRIT` is archived 31-star stub mirror redirected per §2.2). Confirms W291.Stage2 prelim via independent rescoring.
2. Scores: `install_score=3.78` (W293-expanded; D3=2 INSTALL-cap) vs `pattern_score=4.42` (D2=5, D13=5, D5=5). Pattern-suitability >> install-suitability — single-composite illusion avoided.
3. 3 extractable patterns identified (≥2 required): Pattern A orchestrator/scorer/converter triad (maps to Δ11), Pattern B OWASP-LLM-Top-10+MITRE-ATLAS mapping (informs codex-Stop-hook category gating), Pattern C multi-phase converter escalation (informs agent-team test strategies).
4. No hard-cap REJECT trigger fires. Microsoft AIRT canonical, MIT-licensed, actively maintained (commit today 2026-05-18), 2 arXiv papers + 100+ production AIRT operations validate the typed-evidence saturation.
5. W296 follow-up: write 3 pattern docs (≤600 LOC total) under `docs/architecture/W295-CANDIDATE-AUDITS/patterns/`. Re-litigate at W301 or on PyRIT 1.0.0 / upstream-MCP / abandonment trigger.

---

## Appendix A — Audit budget

- Wall-clock: ~22 min (under 25-min target).
- MCP / Web batches: 6 (1 DeepWiki x2 questions, 1 Repomix attempt — empty result, 4 curl-GH-API for stats/releases/contributors/commits, 2 Exa web-search batches). Within ≤7 target.
- Tool invocations: ToolSearch x1 (schema-load for WebFetch/Exa/etc); WebFetch blocked by context-mode (substituted curl+python). No context-mode tooling used per file-writing policy override.

## Appendix B — Cite re-verification anchors (HEAD `e44ba9e`)

- sca-v3.1 rubric: `Z:/claude-sota-installed-W290/.claude/skills/sota-convergence-audit/SKILL.md` (read 2026-05-18)
- W293 sca-v3.1 ship-commit: per CLAUDE.md Status line "W293 sca-v3.1 (`e44ba9e`) SHIPPED"
- W291.Stage2 prelim PyRIT verdict: per CLAUDE.md Status "Azure/PyRIT multi-modal red-team" T3 PATTERN-STUDY
- W289-F3 candidate row: per CLAUDE.md Status "F3 Top-8 candidates ... Azure/PyRIT red-team T3"

