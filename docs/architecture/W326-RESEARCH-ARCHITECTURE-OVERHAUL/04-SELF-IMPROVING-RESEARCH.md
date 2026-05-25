# W326 Stream-5 — Self-Improving / Meta-Research Architecture

> Status: SKELETON. Fork: w326-fork-5-self-improving. Date: 2026-05-19.
> Wave: W326. sca-rule version cited: **sca-v12** (W328). Parent CLAUDE.md HEAD: pointer-only ≤50 LOC.

## §0. TL;DR (top-3 patterns to adopt + 1 displace)

1. **inspect_ai EvalLog as the wave-deliverable scoring spine** — replace the ad-hoc `VERDICT-LEDGER.md + basic-memory writes` with replayable `.eval`/`.json` EvalLog. `model_graded_qa` natively does Claude-Opus-4.7-vs-Codex-GPT-5.5 cross-model judging via `--model-role grader=openai/gpt-5.5` (folds the W269 Phase-6 codex-gate into the harness itself). MIT, UK AISI, `pip install inspect-ai`, no Docker, no SaaS, Windows-friendly. **Tier verdict: T1 INSTALL (sca-v12 install_score est. 4.55, D-EMP needs sandbox smoke first).**
2. **GEPA reflective text evolution against skill files** — `gepa-ai/gepa` MIT, 3582★, ICLR 2026 Oral, ships a **DSPy adapter + MCP adapter** that explicitly optimizes MCP tool descriptions and system-prompt sections. Run nightly on `.claude/skills/**/SKILL.md` description fields with the inspect EvalLog as the metric; Pareto-keep variants that lift Phase-5 5-gate pass-rate. **Tier verdict: T2 VENDOR-FORK first (Hermes pattern), → T1 INSTALL once 4-wave soak hits D-EMP≥4.**
3. **Test-time rubric-guided verification (DeepVerifier pattern, arXiv 2601.15808)** — adopt the **DRA Failure Taxonomy** to expand sca-v12 §5 K-3 skip-class taxonomy from {T-skip, M-skip, E-skip} into an enumerated failure-mode catalog with rubric-guided test-time verification fired BEFORE the codex Phase-6 gate (catches failure-class earlier, cheaper). **Tier verdict: T3 PATTERN-STUDY (paper-only, no canonical OSS impl yet; vendor the failure-taxonomy table into sca-v13).**

**1 displace**: VERDICT-LEDGER.md as the source-of-truth → demote to `outputs/W*-summary.md` index; inspect EvalLog JSON files become the citeable, replayable source.

## §1. Meta-research-improvement pattern catalog

| # | Pattern | Repo / paper | License | 3-org-distinct anchors | Fit to current runtime | Gap status | sca-v12 tier |
|---|---|---|---|---|---|---|---|
| P1 | **Verbal reinforcement / reflection loop** (Reflexion) | `noahshinn/reflexion` arXiv 2303.11366 NeurIPS 2023 | MIT | Princeton (Shinn) + Northeastern (Cassano) + NeurIPS 2023 conf | Partial — codex Phase-6 gate is one-shot reflection; no episodic memory buffer across waves yet | Missing: episodic reflection buffer that survives `/compact` (basic-memory T6 is fact-graph, not reflection-buffer) | T3 PATTERN-STUDY → vendor pattern into sca-v13 episodic reflection field |
| P2 | **Iterative self-feedback / refine** (Self-Refine) | `madaan/self-refine` arXiv 2303.17651 | MIT | CMU + AI2 + Anthropic (Welleck) | Partial — codex round-1/round-2 already loops on NEEDS-REVISION; matches Self-Refine pattern | Already absorbed via sca-v12 Phase-6 round-N | T4 CITE-ONLY |
| P3 | **Tool-augmented critique** (CRITIC, Gou+ 2023) | arXiv 2305.11738 | (paper-only) | Microsoft (Gou) + Princeton + UCLA | Partial — codex GPT-5.5 uses its own search/web tools during review; matches CRITIC | Already absorbed; could formalize "tool-grounded critique" line in sca-v12 Phase-6 schema | T4 CITE-ONLY |
| P4 | **Genetic-Pareto reflective text evolution** (GEPA) | `gepa-ai/gepa` arXiv 2507.19457 ICLR 2026 Oral, 3582★ | MIT | Databricks (LakshyAAAgrawal) + DSPy core (aria42 Stanford) + ICLR 2026 conf | Strong — has MCP Adapter that optimizes MCP tool descriptions + system-prompt sections + DSPy program; reads execution traces (not just scalar reward) | MISSING entirely; no nightly optimization loop on skills/CLAUDE.md/.mcp.json descriptions | **T2 VENDOR-FORK → T1 INSTALL post-soak** |
| P5 | **Skill-file evolution via DSPy+GEPA** (Hermes) | `NousResearch/hermes-agent-self-evolution` 3354★ | MIT (Apache via Reflexio precedent: Apache-2.0 also valid) | Nous Research (teknium1) + DSPy core + ICLR 2026 | Strong fit — Hermes Phase 1 (skill files) directly transferable; Phase 5 (continuous loop) is upstream-planned-but-unimplemented | MISSING; this runtime already has 33 operator-curated `.claude/skills/<n>/SKILL.md` — perfect substrate | T2 VENDOR-FORK |
| P6 | **Self-evolving Deep Research Agent / test-time rubric verification** (DeepVerifier) | arXiv 2601.15808 Jan 2026, 20 upvotes | (paper) | HKUST + Tencent + Tsinghua | Strong fit — introduces DRA Failure Taxonomy + DeepVerifier component that fires BEFORE post-hoc judge; could supplant ad-hoc Phase-3 anti-bias hard-stops | MISSING failure-taxonomy enumeration | T3 PATTERN-STUDY |
| P7 | **Rubric-guided RL with reflection-based meta-policy** (RubricEM) | arXiv 2605.10899 May 2026, 74 upvotes | (paper) | Google + JHU + UMass | Strong fit — rubric IS the policy; matches sca-v12's evolving rubric versioning | Already partially captured via sca-v1→v12 lineage; formalize "meta-policy reflection" annotation in verdict-ledger | T3 PATTERN-STUDY |
| P8 | **Closed-loop experience lifecycle** (EvolveR) | arXiv 2510.16079 Oct 2025 | (paper) | Shanghai AI Lab + Fudan + Microsoft Research Asia | Partial — basic-memory T6 stores "experience" but no offline self-distillation→online policy feedback step | MISSING offline-distill→online-replay loop | T3 PATTERN-STUDY |
| P9 | **Co-evolving multi-agent via interaction rewards** (CoMAS) | arXiv 2510.08529 Oct 2025, 19 upvotes | (paper) | NTU + Stanford + Oxford | Partial — agent-teams orchestrator-worker has no intrinsic inter-agent reward; agents are fixed-prompt | MISSING intrinsic reward; could inform W269 parallel-dispatch quality signal | T3 PATTERN-STUDY |
| P10 | **Self-referential meta-agent** (HyperAgents) | `facebookresearch/HyperAgents` arXiv 2603.19461 Mar 2026 | Likely MIT/research-only | Meta AI + Oxford (Foerster) + UBC (Clune) | Pattern — meta-agent that proposes diffs to task-agent | sca-v12 Phase-3 + GEPA already cover the safer subset; HyperAgents executes untrusted model-generated code (R5 5-control concern) | T4 CITE-ONLY (CR-5 sandbox-blocker for direct install) |
| P11 | **AutoResearch program.md pattern** (Karpathy) | `karpathy/AutoResearch` Mar 2026 | MIT (Karpathy default) | Karpathy (independent) + nanochat baseline + community fork ecosystem | Partial — `program.md` ≈ this runtime's `CLAUDE.md`; iteration loop fully autonomous via 5-min training-budget gate | Pattern transfers to "5-tool-call-budget research-org" with sca-v12 D-EMP as scalar | T3 PATTERN-STUDY |
| P12 | **Agent self-improvement harness via user-correction signal** (Reflexio) | `ReflexioAI/reflexio` 150★ Apr 2026 | Apache-2.0 | ReflexioAI (yyiilluu) + Anthropic-cookbook expert/agent pairing + ICLR 2026 reflection-line | Strong fit — uses agent-vs-expert diff (matches codex Phase-6 cross-model judge); produces playbooks (trigger/instruction/pitfall) | NEW; could supplement T3 cognee with playbook-store | T3 PATTERN-STUDY (potential T2 after smoke) |
| P13 | **MCP-native autonomous research agent w/ self-eval** | `prabureddy/ai-research-agent-mcp` 17★ Feb 2026 | MIT | Independent + MCP spec + Claude Desktop | Direct fit — already MCP-native; has built-in Evaluator Tool + quality metrics; targets Claude Desktop | NEW; small-stars but high-relevance for THIS runtime | T3 PATTERN-STUDY (low star = pattern only; arch-fit high) |
| P14 | **Meta-cognitive reflection** (MARS) | arXiv 2601.11974 Jan 2026 | (paper) | Independent (Hou) + educational-psychology prior + Sun Yat-sen Univ | Pattern — principle-based vs procedural reflection split | Could inform 2-tier reflection (codex-strategy vs codex-tactical) | T4 CITE-ONLY |
| P15 | **Agent-R iterative self-training via MCTS** | arXiv 2501.11425 Jan 2025, 109 upvotes | (paper) | Fudan + ByteDance + Shanghai AI Lab | Pattern — MCTS for self-critique trajectory selection | Tree-search overkill for current 2-round codex Phase-6; could inform future evolution | T4 CITE-ONLY |
| P16 | **Agentic Critical Training** (ACT) | arXiv 2603.08706 Mar 2026, 14 upvotes | (paper) | UMD + UCSD + Anthropic-aligned | Pattern — RL on action-quality judgment (which-of-two) | Maps cleanly to operator decision-between-2-ship-verdicts step | T4 CITE-ONLY |

## §2. Eval-harness comparison for THIS runtime

Filter criteria for THIS runtime (Z:-portable Windows, codex GPT-5.5 Stop-hook cross-model judge, basic-memory T6 canonical, CR-1 license, CR-2 hooks-only-direct-CLI, CR-9 npx-pin-or-pip-pin):

| Harness | License | Python | CLI | Replayable JSON log | Cross-model judge | MCP-tool aware | Requires Docker | Requires SaaS acct | Windows-friendly | Verdict for THIS runtime |
|---|---|---|---|---|---|---|---|---|---|---|
| **inspect_ai** (UK AISI) | **MIT** | ✓ `pip install inspect-ai` | ✓ `inspect eval` | **✓ EvalLog `.eval`/`.json` schema; `inspect log schema`** | **✓ `model_graded_qa(model=[..])` + `--model-role grader=openai/gpt-5.5`** | **✓ Built-in MCP tools support** | Optional (only for untrusted-code sandbox) | ✗ None | ✓ (VS Code ext + pure-Python) | **PRIMARY — T1 INSTALL after sandbox smoke** |
| **promptfoo** | MIT | Node.js (npx) | ✓ YAML + `promptfoo eval` | ✓ CSV/JSON output | ✓ via assertions | ✗ (red-team focus) | ✗ | ✗ (local-first) | ✓ | **SECONDARY — T1 INSTALL for safety/red-team coverage gap** |
| **langfuse** | MIT (core) | ✓ SDK + self-host | ✓ | ✓ Session-trace JSON | ✓ LLM-as-judge | Partial (OpenTelemetry) | ✓ Docker Compose for self-host | Self-host OR cloud | ✓ (already T5 LIVE per CLAUDE.md L106) | **TERTIARY — KEEP (already wired); session-traces feed inspect EvalLog** |
| **ragas** | Apache-2.0 | ✓ | (lib only) | (lib only) | ✓ | ✗ | ✗ | ✗ | ✓ | **SKIP — RAG-specific; this runtime is not RAG-primary** |
| **DeepEval** | MIT | ✓ | ✓ pytest-style | ✓ | ✓ G-Eval | ✗ | ✗ | ✗ (OSS) | ✓ | **T3 PATTERN-STUDY — borrow 14+ metric library; do not add as 2nd primary harness** |
| **braintrust** | Proprietary commercial | ✓ SDK | ✓ | ✓ (hosted) | ✓ | ✗ | ✗ | **✓ SaaS-only** | ✓ | **SKIP — SaaS conflicts with offline-first + Z:-portable** |
| **W&B Weave** | Proprietary commercial | ✓ SDK | ✓ | ✓ | ✓ | ✗ | ✗ | **✓ Hosted W&B account** | ✓ | **SKIP — SaaS conflict** |
| **langsmith** | Proprietary commercial | ✓ SDK | ✓ | ✓ | ✓ | LangChain-coupled | ✗ | **✓ Hosted account** | ✓ | **SKIP — SaaS + LangChain-coupled (this runtime is framework-agnostic)** |
| **Arize Phoenix** | Apache-2.0 (Elastic License 2.0 for newer) | ✓ | ✓ | ✓ OpenTelemetry-native | ✓ | ✗ | Optional | ✗ (OSS) | ✓ | **T3 PATTERN-STUDY — OpenTelemetry pattern worth absorbing into inspect EvalLog → OTLP pipe** |
| **Comet Opik** | Apache-2.0 | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ (OSS-free) | ✓ | **T4 CITE-ONLY — fast trace ingestion (23s vs Langfuse 14× slower); benchmark only** |

**Recommended stack for W326**:
- **PRIMARY**: inspect_ai (capability + cross-model judge + MCP-native + replayable EvalLog → becomes the wave-deliverable scoring spine).
- **SECONDARY**: promptfoo (safety + red-team coverage; covers a different axis from inspect's capability-eval focus).
- **TERTIARY (already-wired)**: langfuse T5 LIVE — keep for trace observability; pipe `model_graded_qa` events into Langfuse session-traces for trend visualization.
- **PATTERN-STUDY**: DeepEval G-Eval metric library + Arize Phoenix OTLP pattern → vendor metrics into inspect scorers.

## §3. Self-improvement workflow (wave-N → wave-(N+1) feedback loop)

```
┌────────────────────────────────────────────────────────────────────────┐
│ WAVE-N OPEN                                                             │
│                                                                         │
│  /goal predicate (via goal-prompt-synthesis)                            │
│         │                                                               │
│         ▼                                                               │
│  Parent orchestrator dispatches Stream A..N (W269 parallel-mandate)     │
│         │                                                               │
│         ▼                                                               │
│  Each stream writes skeleton-first deliverable to                       │
│      docs/architecture/W<N>-*/<stream>.md                               │
│         │                                                               │
│         ▼                                                               │
│  Stop-hook auto-fires codex GPT-5.5 round-1 cross-model review          │
│      (current: per CLAUDE.md L17; sca-v12 Phase-6 Δ50 Unit/Layer/Block) │
│         │                                                               │
│         ▼                                                               │
│  [NEW W326] inspect eval wave-N.task --model anthropic/claude-opus-4-7  │
│             --model-role grader=openai/gpt-5.5                          │
│         → produces EvalLog .eval JSON                                   │
│         → ledger row in verdicts/W<N>-<slug>-evallog.json               │
│         │                                                               │
│         ▼                                                               │
│  basic-memory T6 write_note with verdict + EvalLog path                 │
│      (current per CLAUDE.md L106 + sca-v12 §10 ledger schema)           │
│         │                                                               │
│         ▼                                                               │
│  WAVE-N CLOSURE-SYNTHESIS                                               │
│         │                                                               │
│         │ (async, nightly)                                              │
│         ▼                                                               │
│  [NEW W326] GEPA optimizer reads last-K EvalLogs                        │
│         → mutates .claude/skills/<n>/SKILL.md description fields        │
│         → re-runs inspect eval against held-out wave-deliverable set    │
│         → Pareto-keeps variants that lift D-EMP + sca-v12 install_score │
│         → produces git diff for operator review                         │
│         │                                                               │
│         ▼                                                               │
│  Operator merges Pareto-improved variants → CLAUDE.md & skill files     │
│  → sca-v13 rubric annotations updated                                   │
│         │                                                               │
│         ▼                                                               │
│ WAVE-(N+1) OPEN with improved skills + rubric annotations               │
└────────────────────────────────────────────────────────────────────────┘
```

**Concrete dataflow**:
1. Wave deliverable (`.md`) lands → orchestrator runs `inspect eval` with a task definition that loads (a) the deliverable, (b) the sca-v12 scoring rubric prompt, (c) the wave's `/goal` predicate as task context.
2. `model_graded_qa(model=["openai/gpt-5.5", "anthropic/claude-opus-4-7"])` produces TWO judge scores per deliverable; majority-vote or position-swap mediate.
3. EvalLog JSON gets two-way pipe: (a) `basic-memory write_note` for cross-session lookup; (b) `verdicts/W<N>-<slug>-evallog.json` for git-tracked replay.
4. Nightly cron (LlamaSwap idle + `claude --bg`) invokes `python -m gepa optimize --candidates .claude/skills/*/SKILL.md --metric "inspect_eval_score(wave-deliverable-set)" --pareto-frontier`.
5. GEPA mutations gated by 5-gate Phase-5 (provenance + paraphrase-invariance + adversarial-blinded + contamination + replayable).
6. Operator-AI consumes `git diff` of skill files at wave-open; merges or reverts.

**Closes loop in 3 places**:
- (a) Phase-6 codex gate becomes inspect-native (model_graded_qa subsumes codex Stop-hook).
- (b) GEPA evolves skill descriptions → next wave fires improved skills auto-trigger surface.
- (c) Failure modes accumulate as ledger rows → sca-v13 K-3 skip-class taxonomy expands with DRA failure taxonomy.

## §4. Gap-list vs SOTA self-improving-research stacks

| # | Gap | Current state | SOTA evidence | Severity | Fix path |
|---|---|---|---|---|---|
| G1 | **No replayable EvalLog format** | Ad-hoc `VERDICT-LEDGER.md` (markdown text) + `basic-memory write_note`; not consumable by inspect_ai/promptfoo replay tools | inspect_ai EvalLog `.eval`/`.json` schema with full prompt+response+score+events trace; UK AISI canonical for frontier eval | **HIGH** | T1 INSTALL `inspect-ai`; pipe Phase-6 codex output into EvalLog scorer |
| G2 | **No nightly GEPA optimization loop** | Skills are manually edited; description fields hand-tuned | gepa-ai/gepa MCP Adapter + DSPy adapter + Hermes Phase 1; ICLR 2026 Oral; 67%→93% on MATH | **HIGH** | T2 VENDOR-FORK then T1 INSTALL gepa-ai/gepa; nightly cron via `claude --bg` |
| G3 | **No DRA Failure Taxonomy** | sca-v12 §5 K-3 has 3 skip-classes but no enumerated agent failure modes | DeepVerifier paper (arXiv 2601.15808) defines DRA Failure Taxonomy + test-time rubric verification | **MED** | T3 PATTERN-STUDY → expand sca-v13 §5 with failure-mode enumeration; vendor taxonomy table |
| G4 | **Codex Phase-6 fires post-hoc, not at test-time** | Stop-hook fires after wave-end | DeepVerifier inference-time scaling: verify BEFORE next-action, not after-completion | **MED** | T3 PATTERN-STUDY → add `pre_action_verify` hook stage that runs cheap rubric-check before expensive tool fan-out |
| G5 | **No episodic reflection buffer** | basic-memory T6 stores facts; no Reflexion-style verbal-feedback episodic memory | Reflexion arXiv 2303.11366; 91% pass@1 HumanEval | **MED** | T3 PATTERN-STUDY → add `reflection_buffer` field to sca-v13 ledger schema; persist last-N codex round-2 NEEDS-REVISION findings |
| G6 | **No closed-loop offline-distill → online-replay** | basic-memory writes are write-only; no learned-policy update | EvolveR arXiv 2510.16079 closed-loop experience lifecycle | **LOW** | T4 CITE-ONLY → defer; current Phase-6 cross-model gate covers most of the value at lower complexity |
| G7 | **No inter-agent intrinsic reward in parallel-dispatch** | W269 parallel fan-out uses fixed prompts; agents don't reward each other | CoMAS arXiv 2510.08529 co-evolving multi-agent | **LOW** | T4 CITE-ONLY → defer; orthogonal to current SOTA-convergence-audit work |
| G8 | **No GEPA on CLAUDE.md system-prompt sections** | CLAUDE.md hand-edited; pointer-only ≤50 LOC | gepa-ai/gepa explicitly optimizes "system prompt sections" (Hermes Phase 3 planned) | **MED** | T2 VENDOR-FORK; gate behind operator-merge of `git diff CLAUDE.md` |
| G9 | **No promptfoo red-team gate** | gitleaks PreToolUse + trivy PostToolUse advisory cover secret-leak; no prompt-injection / jailbreak eval | promptfoo 500+ adversarial vectors; OWASP+NIST presets | **MED** | T1 INSTALL promptfoo as SECONDARY harness; tie to sca-v12 R5 layered-defense control-3 |
| G10 | **Skill descriptions not Pareto-optimized** | 33 operator-curated skills; description-match fires the skill — no measurement of false-positive/false-negative trigger rates | GEPA optimizes MCP tool descriptions for trigger accuracy | **HIGH** | Same fix path as G2 (GEPA install) |
| G11 | **No `inspect log schema` regression-test against ledger schema** | sca-v12 ledger schema is documentation-only; no machine-checked validator | inspect_ai EvalLog has JSON schema with frontend type-safety guarantee | **LOW** | After G1 land, add `jsonschema` validator step to wave-closure |
| G12 | **No expert/agent pairing signal** | codex round-1 gives expert-level review BUT no persisted "what would-have-been-the-expert-answer" diff per Reflexio pattern | Reflexio Apache-2.0 user-correction-signal → playbook generation | **LOW** | T3 PATTERN-STUDY → adapt Reflexio playbook (trigger/instruction/pitfall) format into sca-v13 cognee T3 graph |
| G13 | **No `program.md`-style autonomous-research-org** | CLAUDE.md acts as system-prompt index; no autonomous loop iterates ON it per wave | karpathy/AutoResearch `program.md` + 5-min-budget loop | **LOW** | T4 CITE-ONLY → pattern absorbed via durable-planning-files skill already; karpathy is research-org-as-prompt, not a separate primitive |

## §5. Cited reference table

| Anchor | URL | Org-class | License | Wave-N citation |
|---|---|---|---|---|
| Reflexion paper | https://arxiv.org/abs/2303.11366 | arXiv + Princeton + Northeastern (Shinn+) — NeurIPS 2023 | view license (paper); code MIT | P1 |
| Reflexion code | https://github.com/noahshinn/reflexion | Independent (Shinn) | MIT | P1 |
| Self-Refine paper | https://arxiv.org/abs/2303.17651 | arXiv + CMU + AI2 (Madaan+) | (paper); code via repo | P2 |
| Self-Refine code | https://github.com/madaan/self-refine | Independent (Madaan) | code | P2 |
| CRITIC paper | https://arxiv.org/abs/2305.11738 | arXiv + Microsoft + Princeton + UCLA | (paper) | P3 |
| GEPA paper | arXiv 2507.19457; https://gepa-ai.github.io/gepa/ | arXiv + Databricks + DSPy/Stanford — ICLR 2026 Oral | MIT (code) | P4 |
| GEPA code | https://github.com/gepa-ai/gepa | Multi-org (40 contributors) | MIT | P4 |
| Hermes Self-Evolution | https://github.com/NousResearch/hermes-agent-self-evolution | Nous Research | MIT | P5 |
| DeepVerifier paper | https://hf.co/papers/2601.15808 | HKUST + Tencent + Tsinghua | (paper) | P6 |
| RubricEM paper | https://hf.co/papers/2605.10899 | Google + JHU + UMass | (paper) | P7 |
| EvolveR paper | https://hf.co/papers/2510.16079 | Shanghai AI Lab + Fudan + MSRA | (paper) | P8 |
| CoMAS paper | https://hf.co/papers/2510.08529 | NTU + Stanford + Oxford | (paper) | P9 |
| HyperAgents | https://github.com/facebookresearch/HyperAgents | Meta AI + Oxford + UBC | research-only-license | P10 |
| AutoResearch | https://github.com/karpathy/AutoResearch | Independent (Karpathy) | MIT default | P11 |
| Reflexio | https://github.com/ReflexioAI/reflexio | ReflexioAI Inc | Apache-2.0 | P12 |
| ai-research-agent-mcp | https://github.com/prabureddy/ai-research-agent-mcp | Independent (Prabu Reddy) | MIT | P13 |
| MARS paper | https://hf.co/papers/2601.11974 | Independent + Sun Yat-sen Univ | (paper) | P14 |
| Agent-R paper | https://hf.co/papers/2501.11425 | Fudan + ByteDance + Shanghai AI Lab | (paper) | P15 |
| ACT paper | https://hf.co/papers/2603.08706 | UMD + UCSD | (paper) | P16 |
| **inspect_ai code** | https://github.com/UKGovernmentBEIS/inspect_ai | **UK AI Security Institute (UK gov)** + Meridian Labs + 200+ pre-built evals | **MIT** | §2 PRIMARY |
| **inspect_ai docs** | https://inspect.aisi.org.uk/ | UK AISI | docs | §2 PRIMARY |
| inspect EvalLog schema | https://github.com/UKGovernmentBEIS/inspect_ai/blob/main/src/inspect_ai/_view/www/log-schema.json | UK AISI | MIT | G1 fix |
| promptfoo | https://www.promptfoo.dev/ | Promptfoo Inc | MIT | §2 SECONDARY |
| langfuse | https://langfuse.com/ | Langfuse GmbH (Berlin) | MIT (core) | §2 TERTIARY (already T5 LIVE) |
| Arize Phoenix | https://github.com/Arize-ai/phoenix | Arize AI | Apache-2.0 (Elastic License 2.0 newer) | T3 PATTERN-STUDY |
| DeepEval | https://github.com/confident-ai/deepeval | Confident AI | MIT | T3 PATTERN-STUDY |
| Comet Opik | https://github.com/comet-ml/opik | Comet ML | Apache-2.0 | T4 CITE-ONLY |
| Anthropic claude-cookbooks orchestrator_workers | https://github.com/anthropics/claude-cookbooks/blob/main/patterns/agents/orchestrator_workers.ipynb @2eed173a | Anthropic PBC | MIT | F5 codify ref (already cited in parallel-dispatch-mandate) |

**Org-distinct rule satisfied** (sca-v12 I1): all P4-P9 + §2 picks each carry ≥3 org-distinct anchors (academia + industry + community/conference). DeepVerifier, RubricEM, EvolveR, CoMAS each have 3+ distinct academic + industry orgs per author affiliation.

## §6. cascade_degraded flag + provenance

**`cascade_degraded = true`** — 2 of 4 primary MCP families failed; fell back to alternates. Per sca-v12 Phase-1 graceful-degradation ladder, this caps D5 at 4 on any verdict relying on this fork's evidence base.

| MCP family | Status | Details |
|---|---|---|
| `mcp__perplexity__perplexity_research` (deep) | **FAILED** | 300s timeout; perplexity Sonar Deep Research model timed out |
| `mcp__perplexity__perplexity_search` (shallow) | ✓ OK | Fallback; 2 queries fired (eval-harness comparison + Reflexion/Self-Refine canonical) |
| `mcp__tavily__tavily_research` | **FAILED** | API error: "account currently disabled due to unpaid pay-as-you-go balance" — operator action required (renew Tavily); flag as W326 carry-forward |
| `mcp__exa__web_search_exa` | ✓ OK | 15 results; surfaced GEPA + Hermes + Karpathy/AutoResearch + HyperAgents + Reflexio + ai-research-agent-mcp + autoevolve + GEPA artifact |
| `mcp__deepwiki__ask_question` | ✓ OK | 1 query against UKGovernmentBEIS/inspect_ai for EvalLog schema + cross-model judge mechanics |
| `mcp__hf-mcp-server__paper_search` | ✓ OK | 15 papers 2024-2026; surfaced MARS / DeepVerifier / Agent-R / RubricEM / EvolveR / CoMAS / Reflexio precedents / WebEvolver / SELF / SEA / SWE-Search / AgencyBench / Yunjue / EvoPresent / ACT / Re-ReST |
| github-MCP (Stage-0 existence probe family-1) | not fired | This fork did not need Stage-0 (no specific candidate slug to vet); §1 catalog candidates passed via Phase-1 discovery directly |
| WebSearch | not fired | exa + perplexity_search covered |
| WebFetch | not fired | Forbidden per context_window_protection |

**Operator carry-forward items**:
- **OAI-1 (P1)**: Tavily account disabled — renew or remove from cascade family list for future waves. Operator-fix at `https://tavily.com/billing`.
- **OAI-2 (P2)**: perplexity_research timeout — consider lowering `reasoning_effort` from `high` to `medium` for future deep-research calls; OR switch to `perplexity_reason` (Sonar Reasoning Pro, faster).
- **OAI-3 (P3)**: This fork did NOT execute Phase-5 5-gate validation on any sca-v12 candidate; that is parent-orchestrator's job during W326 closure-synthesis. T1 INSTALL verdicts for inspect_ai + promptfoo MUST be ratified via parent's codex GPT-5.5 Phase-6 cross-model gate before any actual `pip install` or `npm install` fires.

**Skeleton-first protocol confirmation**: skeleton written FIRST (commit-1), then iteratively edited 6× (commits 2-7); fork-context budget held under 70% threshold; no STATUS:BUDGET-EXHAUST-PARTIAL marker needed.

**Self-reference invariant (sca-v12 I9)**: this deliverable is META-research about the runtime's research-architecture; D-EMP is E-skip primary (external auditor = parent's codex round-1; pending), D34 cohort_overlap_signal is T-skip (the catalog IS the cohort), D45 awesome_list_corroboration is E-skip (no external awesome-self-improving-research list cited in evidence). Operator-AI ratification required via codex Stop-hook on parent session.
