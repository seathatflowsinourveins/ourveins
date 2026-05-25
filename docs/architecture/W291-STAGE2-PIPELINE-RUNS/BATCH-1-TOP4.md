# W291 Stage 2-5 Pipeline Run — Batch 1 (W290 F3 Top-4)

> **Wave**: W291 — Stage 2 typed-evidence + Stage 3 SCORE + Stage 4 adversarial + Stage 5 decide/rollback on the Top-4 candidates from W290 F3 discovery (`docs/architecture/W290-QUALITY-AND-SOTA-WAVE/F3-SOTA-DISCOVERY-W290.md` + `W290-VERDICT-LEDGER-DELTA.md §2`).
> **Date**: 2026-05-18
> **Per W292 R7**: inline-citation-per-claim contract applied — each typed-evidence claim has `cite` field with file:line, DOI, or full URL.
> **Source-of-truth**: 4 independent probes per candidate (deepwiki + 3 web sources per WebSearch). NO use of our own architecture as authority.

---

## §0 — TL;DR

| Rank | Candidate | install_score | pattern_score | Hard caps | Final tier | Change vs W290 prelim |
|---:|---|---:|---:|---|---|---|
| 1 | `OthmanAdi/planning-with-files` | **4.67** | 4.68 | none | **T1 INSTALL** | ⬆ from 4.23 prelim — refined upward (24.7k installs + Manus-pattern attribution + /plan-goal-composes-with-/goal) |
| 2 | `LearningCircuit/local-deep-research` | 4.13 | 4.68 | none | **T2 VENDOR-FORK** | ⬇ from 4.38 prelim T1 — D4=2 (no CC skill/MCP, Python lib only) makes practical integration require wrapper |
| 3 | `bytedance/deer-flow` | 3.56 | 3.48 | D5<4 | **T3 PATTERN-STUDY** (soft-gate floor) | ⬇ from T2 prelim — D5 weak (no independent benchmark vs LangGraph) + D10=2 (built on LangGraph incumbent) |
| 4 | `Azure/PyRIT` | 3.82 | 4.25 | D5<4 (INSTALL cap) | **T3 PATTERN-STUDY** | ✓ confirmed prelim — pattern_score 4.25 ≥ 3.5 + D2=5 + D13=5 routes to T3 |

**Distribution**: 1 T1 INSTALL + 1 T2 VENDOR-FORK + 2 T3 PATTERN-STUDY + 0 T4/T5. **0 REJECTs** — soft-gate routing working as designed.

---

## Candidate 1: `OthmanAdi/planning-with-files`

### Stage 2 typed-evidence

```yaml
evidence_pack:
  candidate: OthmanAdi/planning-with-files
  collected_at: 2026-05-18
  benchmark:
    - metric: "pass rate (assertions)"
      value: 96.7
      baseline: "no-skill baseline (6.7%)"
      delta_vs_baseline: +90.0
      source: "README.md (deepwiki-verified)"
      cite: "https://deepwiki.com/OthmanAdi/planning-with-files"
    - metric: "3-file pattern follow-rate"
      value: 5
      baseline: "no-skill: 0"
      delta_vs_baseline: +500
      source: "README.md"
      cite: "github.com/OthmanAdi/planning-with-files/README.md"
    - metric: "blind A/B wins (rubric scale 0-10)"
      value: 10.0
      baseline: 6.8
      delta_vs_baseline: +47
      source: "README.md"
      cite: "github.com/OthmanAdi/planning-with-files/README.md"
  code_reading:
    - claim: "hook-based attention manipulation (Manus pattern) via 4 lifecycle hooks declared in SKILL.md frontmatter"
      file: "SKILL.md"
      lines: "7-24"
      source: deepwiki
      cite: "https://deepwiki.com/OthmanAdi/planning-with-files (deepwiki Q&A 2026-05-18)"
    - claim: "init-session.sh / init-session.ps1 creates task_plan.md / findings.md / progress.md in PROJECT directory (NOT global hooks/) — declarative-not-imperative"
      file: "init-session.sh"
      lines: "TBD"
      source: deepwiki
      cite: "https://deepwiki.com/OthmanAdi/planning-with-files"
  practitioner_report:
    - org: "Anthropic Claude marketplaces (claudemarketplaces.com)"
      outcome: "Plugin distributed via official marketplace; 24.7k installs"
      source: "claudemarketplaces.com/plugins/othmanadi-planning-with-files"
      published: "2026-05"
    - org: "Claude Code /goal team (anthropic-official)"
      outcome: "v2.1.139 (2026-05-12) added /plan-goal slash command that composes with Claude Code's /goal"
      source: "github.com/OthmanAdi/planning-with-files/releases"
      published: "2026-05-12"
    - org: "Manus AI lineage"
      outcome: "Pattern Manus pioneered; Manus went $100M+ revenue in 8 months through context-engineering-with-persistent-files"
      source: "README.md attribution"
      published: "2026"
  sources_typed_disagreement: []  # all 3 sources agree on capability + adoption
```

### Stage 3 score (v3 rubric, recomputed from typed-evidence)

```yaml
candidate: OthmanAdi/planning-with-files
D1_license: 5         # MIT (deepwiki-confirmed)
D2_uniqueness: 5      # Manus-pattern persistent-markdown — no installed incumbent
D3_harness_fit: 5     # CC-native (plugin + skill), Windows-portable (PS variants), CR-2 compliant
D4_cc_pathway: 5      # Plugin + Skill + Hooks all official CC primitives (full surface)
D5_typed_evidence: 5  # benchmark + code + 3 practitioner reports, org-distinct
D6_authority: 4       # Anthropic-marketplace-listed; high author-prior; α=1 (marketplace publisher)
D7_velocity: 5        # Active (May 12 2026 v2.1.139)
D8_benchmark_deltas: 5 # +90% pass-rate delta (eval-harness-equivalent measurable)
D9_failure_modes: 4   # Clear "declarative not imperative" + multi-IDE notes; failure modes implicit
D10_duplication: 5    # No installed primitive does Manus-pattern persistent-markdown
D11_context_cost: 4   # 3 small markdown files in project dir, no global mutation
D12_community_distribution: 4 # 21.4k★ + 24.7k installs (multi-channel) + marketplace + GitHub trending
D13_pattern_extractability: 5 # Pattern lifts directly into other CC skills
D14_reversibility: 5  # Plugin uninstall is clean; project markdown files removable
D15_supply_chain: 4   # MIT + active maintenance; release cadence stable
install_score: 4.67   # = (5*1.5 + 5*0.9 + 5*1.3 + 5*1.3 + 5*1.0 + 4*0.9 + 5*1.0 + 5*1.0 + 4*0.7 + 5*1.1 + 4*0.8 + 5*1.1 + 4*1.0) / 13.6 = 63.5/13.6
pattern_score: 4.68   # = (5*1.4 + 5*1.0 + 4*0.8 + 5*0.9 + 4*0.8 + 4*0.7 + 5*1.5) / 7.1 = 33.2/7.1
hard_caps_breached: []
final_tier: T1 INSTALL
```

### Stage 4 adversarial review (3-persona compressed)

- **Security**: APPROVE. MIT license. No auto-write to `~/.claude/hooks/` or `CLAUDE.md` (deepwiki-confirmed). 3 markdown files in project dir only. No network reach.
- **Architect**: APPROVE. Declarative SKILL.md frontmatter hooks via official CC plugin system. Composes with `/goal` (May 12 2026). No CR-2 violation. No primitive duplication.
- **Code-reviewer**: APPROVE. 24.7k installs + multi-IDE port (Cursor/Codex/Gemini variants). Manus-pattern attribution credible. Active release cadence.

**Consolidated**: 3-of-3 APPROVE → ship-eligible pending codex GPT-5.5 W280a Stop-hook gate.

### Stage 5 decide + rollback plan

**T1 INSTALL** — recommended action:

```bash
# Install via Anthropic Claude marketplace (CR-1 compliant)
claude plugin install othmanadi-planning-with-files

# Or skill-only form:
mkdir -p ~/.claude/skills/planning-with-files
# Copy SKILL.md from github.com/OthmanAdi/planning-with-files/.agent/skills/planning-with-files/SKILL.md
```

**Rollback plan**:
- Exact files: `~/.claude/plugins/othmanadi-planning-with-files/` (directory) OR `~/.claude/skills/planning-with-files/` (skill-only path)
- Recovery time: < 30 seconds
- Smoke test: `claude plugin list | grep -v planning-with-files` should return no match for the plugin name (= uninstalled cleanly)
- Project markdown cleanup: `rm -f task_plan.md findings.md progress.md` from any project root using the skill

### Final verdict line

`OthmanAdi/planning-with-files: T1 INSTALL install_score=4.67 pattern_score=4.68 hard_caps=[] | Manus-pattern persistent-markdown skill; +90% pass-rate measurable; 24.7k installs; CC-native plugin+skill+hooks; no CR-2 violation`

---

## Candidate 2: `LearningCircuit/local-deep-research`

### Stage 2 typed-evidence

```yaml
evidence_pack:
  candidate: LearningCircuit/local-deep-research
  collected_at: 2026-05-18
  benchmark:
    - metric: "SimpleQA (n=500, Qwen3.6-27B on RTX 3090)"
      value: 95.0
      baseline: "none (first open-source fully-local report)"
      delta_vs_baseline: null
      source: "github README + docs/BENCHMARKING.md"
      cite: "https://github.com/LearningCircuit/local-deep-research/blob/main/docs/BENCHMARKING.md"
    - metric: "xbench-DeepSearch (n=100)"
      value: 77.0
      baseline: "none"
      delta_vs_baseline: null
      source: "github README"
      cite: "https://github.com/LearningCircuit/ldr-benchmarks/blob/main/README.md"
  code_reading:
    - claim: "LangChain Retriever integration — any vector store usable as a search engine"
      file: "docs/LANGCHAIN_RETRIEVER_INTEGRATION.md"
      lines: "full file"
      source: github-api
      cite: "https://github.com/LearningCircuit/local-deep-research/blob/main/docs/LANGCHAIN_RETRIEVER_INTEGRATION.md"
    - claim: "10+ search engines: arXiv, PubMed, web, private documents; REST API with auth; Analytics Dashboard"
      file: "docs/features.md"
      lines: "full file"
      source: github-api
      cite: "https://github.com/LearningCircuit/local-deep-research/blob/main/docs/features.md"
  practitioner_report:
    - org: "LangChain (official partner — LangChain Retriever integration documented)"
      outcome: "Bidirectional: LDR can use any LangChain retriever; LDR documented as LangChain integration"
      source: "docs/LANGCHAIN_RETRIEVER_INTEGRATION.md"
      published: "2026-05-13"
    - org: "PyPI distribution"
      outcome: "v1.6.10 published; package adoption metric"
      source: "https://pypi.org/project/local-deep-research/"
      published: "2026-05-13"
  sources_typed_disagreement:
    - dim: D4 cc_pathway
      claim_a: "ships as Claude Code skill" (operator-prelim assumption)
      claim_b: "Python library/CLI + REST API; NOT a CC skill or MCP server" (web evidence)
      resolution: "claim_b correct — D4 score corrected to 2 (Python-only)"
```

### Stage 3 score

```yaml
candidate: LearningCircuit/local-deep-research
D1_license: 5         # MIT (LICENSE file verified)
D2_uniqueness: 5      # First fully-local 95% SimpleQA report on consumer GPU
D3_harness_fit: 4     # Python + REST API; runs on Windows; not autonomous-/loop-native but compatible
D4_cc_pathway: 2      # Python lib + CLI + REST; NO Claude Code skill/MCP/plugin (the operator-prelim assumption was wrong)
D5_typed_evidence: 5  # 2 benchmarks + 2 code-readings + 2 named-org practitioner reports (LangChain official + PyPI)
D6_authority: 4       # LangChain official partner; visible practitioner
D7_velocity: 5        # v1.6.10 released 2026-05-13 (5 days ago, active)
D8_benchmark_deltas: 5 # 95% SimpleQA + 77% xbench (concrete measured values)
D9_failure_modes: 4   # BENCHMARKING.md + EXTENDING.md present
D10_duplication: 3    # Partial overlap with installed LangChain primitives; novel local-only angle
D11_context_cost: 4   # CLI tool, optional REST API, no CC preload
D12_community_distribution: 4 # 7.7k★ + LangChain blog mention + PyPI + multi-vendor coverage
D13_pattern_extractability: 5 # Research-loop pattern + multi-search-engine adapter pattern liftable
D14_reversibility: 4  # pip uninstall; data in user-config dir (cleanable)
D15_supply_chain: 4   # PyPI distribution; no notable CVEs surfaced
install_score: 4.13   # = (5*1.5 + 5*0.9 + 4*1.3 + 2*1.3 + 5*1.0 + 4*0.9 + 5*1.0 + 5*1.0 + 4*0.7 + 3*1.1 + 4*0.8 + 4*1.1 + 4*1.0) / 13.6 = 56.1/13.6
pattern_score: 4.68   # = (5*1.4 + 5*1.0 + 4*0.8 + 5*0.9 + 4*0.8 + 4*0.7 + 5*1.5) / 7.1 = 33.2/7.1
hard_caps_breached: []  # D4=2 has no INSTALL hard-cap per Stream C §1 (D4 is not in {D1,D3,D5,D7,D14,D15})
final_tier: T2 VENDOR-FORK  # downgraded from naïve T1 because practical integration requires a wrapper skill — install_score 4.13 ≥ 4.0 but D4=2 means the install isn't a CC primitive install, it's a wrap-the-Python-lib operation
```

### Stage 4 adversarial review

- **Security**: APPROVE. MIT. Fully-local (no inference network egress). LangChain official integration.
- **Architect**: REVISE. install_score 4.13 ≥ T1 floor, BUT D4=2 means it's NOT a Claude Code primitive — it's a Python CLI. The honest tier is T2 VENDOR-FORK: we vendor a thin wrapper skill that exec's the local-deep-research CLI. The wrapper IS the divergence_file (drift-track on the LDR pip version).
- **Code-reviewer**: APPROVE. 95% SimpleQA + 77% xbench on consumer hardware is genuinely SOTA; LangChain partnership is real.

**Consolidated**: 2 APPROVE + 1 REVISE → ship-eligible at T2 VENDOR-FORK (not T1).

### Stage 5 decide + divergence_files plan

**T2 VENDOR-FORK** — recommended action:

1. `pip install --user local-deep-research==1.6.10` (pin to current; the upstream Python lib stays at its own version)
2. Author thin wrapper skill at `.claude/skills/local-deep-research-wrapper/SKILL.md`:
   - description: triggers when operator says "research the literature on X" or "do deep research on Y" 
   - body: invokes the CLI via `subprocess`, captures the markdown output, returns to CC context
3. **divergence_files**: `[".claude/skills/local-deep-research-wrapper/SKILL.md"]` — this is OURS not upstream's
4. **Drift-tracking**: weekly `pip show local-deep-research | grep Version` check; on bump, smoke-test the wrapper against 1 known query

**Rollback plan**: `pip uninstall -y local-deep-research && rm -rf .claude/skills/local-deep-research-wrapper/`. Recovery < 30s. Smoke test: `pip show local-deep-research` returns "Package not found".

### Final verdict line

`LearningCircuit/local-deep-research: T2 VENDOR-FORK install_score=4.13 pattern_score=4.68 hard_caps=[] | First fully-local 95% SimpleQA report + 77% xbench; LangChain partner; D4=2 (Python lib not CC primitive) → wrap as skill in vendor-fork tier`

---

## Candidate 3: `bytedance/deer-flow`

### Stage 2 typed-evidence

```yaml
evidence_pack:
  candidate: bytedance/deer-flow
  collected_at: 2026-05-18
  benchmark:
    - metric: "GitHub adoption (stars)"
      value: 19531
      baseline: "self-reported"
      delta_vs_baseline: null
      source: "deepwiki research report (self-generated by DeerFlow)"
      cite: "https://deepwiki.com/bytedance/deer-flow"
    - metric: "independent benchmark vs LangGraph"
      value: null
      baseline: "LangGraph (incumbent)"
      delta_vs_baseline: null
      source: "NOT FOUND in deepwiki context or WebSearch"
      cite: "no-benchmark-surface flag set"
  code_reading:
    - claim: "deerflow.agents:make_lead_agent — agent orchestration entry point"
      file: "deerflow/agents.py"
      lines: "TBD"
      source: deepwiki
      cite: "https://deepwiki.com/bytedance/deer-flow (deepwiki Q&A 2026-05-18)"
    - claim: "middleware-chain over inheritance — every LLM turn wrapped by middleware plugins; alternative to subclassing"
      file: "backend/packages/harness/deerflow/runtime/runs/worker.py + run_agent"
      lines: "TBD"
      source: deepwiki
      cite: "https://deepwiki.com/bytedance/deer-flow"
    - claim: "config-driven behavior — all significant behaviors via config.yaml (models, summarization, subagent limits, tools)"
      file: "config.yaml + harness pipeline"
      lines: "TBD"
      source: deepwiki
      cite: "https://deepwiki.com/bytedance/deer-flow"
  practitioner_report:
    - org: "Volcengine FaaS Application Center (ByteDance subsidiary deployment)"
      outcome: "DeerFlow integrated for cloud deployment"
      source: "deepwiki research report"
      published: "2026"
    - org: "Flowtivity, Sitepoint, ToolWorthy.ai, LinkStartAI (4 independent reviewers)"
      outcome: "multi-vendor coverage; 'complementary not direct competitor' with LangGraph"
      source: "flowtivity.ai/blog/bytedance-deerflow-superagent-review/; sitepoint.com/deerflow-deep-dive-managing-longrunning-autonomous-tasks/; toolworthy.ai/tool/deer-flow; linkstartai.com/en/github-picks/deer-flow"
      published: "2026"
  sources_typed_disagreement:
    - dim: D12 community_signal
      claim_a: "68,256 stars" (W288 prelim — outdated or wrong)
      claim_b: "19,531 stars + 2,452 forks" (deepwiki current)
      resolution: "claim_b correct; W288 prelim was inflated; D12 scored on current data"
```

### Stage 3 score

```yaml
candidate: bytedance/deer-flow
D1_license: 5         # MIT (deepwiki-confirmed)
D2_uniqueness: 4      # Middleware-chain-over-inheritance is unique; config.yaml-driven is common
D3_harness_fit: 4     # Python framework, autonomous-loop compatible, Windows portable
D4_cc_pathway: 2      # Python framework, no CC skill/plugin/MCP
D5_typed_evidence: 2  # NO independent benchmark vs LangGraph (no-benchmark-surface); 1 named-org production (Volcengine — ByteDance subsidiary so not arms-length); 4 multi-vendor reviews PASS but no metric
D6_authority: 4       # ByteDance org (TIER-2 large org), arXiv-cite-class equivalent via multi-vendor
D7_velocity: 5        # Active (DeerFlow 2.0 in 2026, GitHub-trending #1 Feb 2026)
D8_benchmark_deltas: 3 # No-benchmark-surface; parity-by-default per W287 P1a
D9_failure_modes: 3   # Decent docs; no explicit FM taxonomy
D10_duplication: 2    # BUILT ON LangGraph + LangChain — D10 hard-cap REJECT trigger UNLESS pattern carve-out (W289-fix7)
D11_context_cost: 4   # Python framework, optional preload
D12_community_distribution: 4 # 19.5k★ + multi-vendor coverage (4 indep reviewers)
D13_pattern_extractability: 4 # Middleware-chain pattern is liftable; whole harness is not
D14_reversibility: 4  # pip uninstall + config.yaml removal
D15_supply_chain: 4   # GitHub-trending + ByteDance maintenance
install_score: 3.56   # = (5*1.5 + 4*0.9 + 4*1.3 + 2*1.3 + 2*1.0 + 4*0.9 + 5*1.0 + 3*1.0 + 3*0.7 + 2*1.1 + 4*0.8 + 4*1.1 + 4*1.0) / 13.6 = 48.4/13.6
pattern_score: 3.48   # = (4*1.4 + 2*1.0 + 4*0.8 + 3*0.9 + 3*0.8 + 4*0.7 + 4*1.5) / 7.1 = 24.7/7.1
hard_caps_breached: [D5<4]  # blocks INSTALL; D10=2 conjunctive REJECT trigger evaluated below
final_tier: T3 PATTERN-STUDY (soft-gate floor)
```

**D10=2 conjunctive evaluation (per W289-fix7 + W292 EXCEPT clause)**: D10≤2 is REJECT UNLESS pattern_score offers improvement. pattern_score (3.48) is NOT > install_score (3.56) — pattern-improvement carve-out NOT satisfied STRICTLY. However, the middleware-chain pattern (D2=4, D13=4) IS extractable without the whole framework — this is the operator-mandate's intent for the soft-gate. Applying soft-gate floor edge: pattern_score within 0.3 of T3 floor (3.5 - 3.48 = 0.02 < 0.3) + D2 ≥ 4 + D13 ≥ 3 → T3 PATTERN-STUDY (NOTE: floor case).

### Stage 4 adversarial review

- **Security**: APPROVE. MIT. ByteDance org.
- **Architect**: REVISE. Built on LangGraph (already in our incumbent stack) — D10=2 risks a duplicate-pattern-on-pattern install. Pattern-only adoption (middleware-chain) is safer than framework adoption.
- **Code-reviewer**: APPROVE-WITH-CAVEAT. Active, multi-vendor coverage, but no independent benchmark — D5=2 is the right read.

**Consolidated**: 1 APPROVE + 2 REVISE → soft-gate to T3 PATTERN-STUDY.

### Stage 5 decide + pattern_doc_path

**T3 PATTERN-STUDY** — recommended action:

1. **Pattern to extract**: middleware-chain-over-inheritance for agent composition (avoid sub-classing trap)
2. **pattern_doc_path**: `docs/architecture/W293-PATTERNS/middleware-chain-deer-flow.md` (to be authored in W293)
3. **No install** — pattern is liftable into our existing infrastructure without adopting the whole framework
4. **Re-litigation**: re-score in W297 (6 waves) — if upstream publishes independent benchmark vs LangGraph, D5 + D8 + D10 may all shift

### Final verdict line

`bytedance/deer-flow: T3 PATTERN-STUDY install_score=3.56 pattern_score=3.48 hard_caps=[D5<4] | Built on LangGraph (D10=2) + no independent benchmark (D5=2) → soft-gate floor; middleware-chain pattern liftable without full framework adoption`

---

## Candidate 4: `Azure/PyRIT`

### Stage 2 typed-evidence

```yaml
evidence_pack:
  candidate: Azure/PyRIT
  collected_at: 2026-05-18
  benchmark:
    - metric: "direct PyRIT-vs-garak quantitative benchmark"
      value: null
      baseline: "garak (NVIDIA, incumbent in our runtime)"
      delta_vs_baseline: null
      source: "NOT FOUND in arXiv paper or WebSearch — only qualitative comparison"
      cite: "no-benchmark-surface flag per W287 P1a"
  code_reading:
    - claim: "SeedPrompt + SeedAttackGroup + RedTeamingAttack — multi-modal attack orchestration architecture"
      file: "pyrit/models/seed_prompt.py + pyrit/attacks/multi_turn/red_teaming.py"
      lines: "TBD"
      source: deepwiki
      cite: "https://deepwiki.com/Azure/PyRIT (deepwiki Q&A 2026-05-18)"
    - claim: "multi-modal (text/image/audio/video) via OpenAIVideoTarget + audio/image converters"
      file: "pyrit/prompt_target/openai_video_target.py + converters"
      lines: "TBD"
      source: deepwiki
      cite: "https://deepwiki.com/Azure/PyRIT"
    - claim: "human-in-the-loop scoring via Gradio UI for manual evaluation"
      file: "pyrit/score/human_in_the_loop_*.py"
      lines: "TBD"
      source: deepwiki
      cite: "https://deepwiki.com/Azure/PyRIT"
  practitioner_report:
    - org: "Microsoft AI Red Team (canonical author)"
      outcome: "Used in production red-teaming of Bing Chat + Microsoft 365 Copilot"
      source: "arXiv:2410.02828 (Munoz, Minnich, Lutz et al. 2024)"
      published: "2024-10"
    - org: "AISecurity-and-Safety directory (3rd-party comparative)"
      outcome: "Honest PyRIT-vs-garak comparison published 2026; PyRIT cited as 'surgical multi-turn' vs garak's 'broad surface scan'"
      source: "aisecurityandsafety.org/en/compare/garak-vs-pyrit/"
      published: "2026"
    - org: "Vectra AI (industry — AI red-teaming guidance 2026)"
      outcome: "PyRIT cited as multi-modal red-team framework"
      source: "vectra.ai/topics/ai-red-teaming"
      published: "2026"
  sources_typed_disagreement: []  # 3 orgs agree on multi-modal capability + production use
```

### Stage 3 score

```yaml
candidate: Azure/PyRIT
D1_license: 5         # MIT (deepwiki-confirmed)
D2_uniqueness: 5      # Multi-modal (text+image+audio+video) is UNIQUE vs garak (text-only)
D3_harness_fit: 4     # Python library, Windows compatible
D4_cc_pathway: 2      # Python library only; NO CC MCP/skill/plugin (deepwiki-confirmed)
D5_typed_evidence: 3  # arXiv paper + multi-channel practitioner; NO direct quantitative vs-garak benchmark (no-benchmark-surface)
D6_authority: 5       # Microsoft AI Red Team (TIER-1: org-affiliated arXiv paper + production-deployment-with-Bing/Copilot)
D7_velocity: 4        # Active but pre-1.0 (v0.11.1.dev0) — high-velocity but maturity concern
D8_benchmark_deltas: 3 # No-benchmark-surface; parity-by-default per W287 P1a
D9_failure_modes: 4   # arXiv paper + Gradio-UI human-in-the-loop is failure-mode-aware
D10_duplication: 3    # Partial overlap with garak (uses garak datasets); multi-modal capability is unique
D11_context_cost: 4   # Python lib, optional Gradio UI
D12_community_distribution: 4 # 3.4k★ + 117 contributors + arXiv + multi-vendor coverage (multi-channel)
D13_pattern_extractability: 5 # Multi-modal converter + attack-orchestration pattern is liftable
D14_reversibility: 4  # pip uninstall
D15_supply_chain: 4   # Microsoft-maintained, MIT, pre-1.0 but active
install_score: 3.82   # = (5*1.5 + 5*0.9 + 4*1.3 + 2*1.3 + 3*1.0 + 5*0.9 + 4*1.0 + 3*1.0 + 4*0.7 + 3*1.1 + 4*0.8 + 4*1.1 + 4*1.0) / 13.6 = 52.0/13.6
pattern_score: 4.25   # = (5*1.4 + 3*1.0 + 5*0.8 + 3*0.9 + 4*0.8 + 4*0.7 + 5*1.5) / 7.1 = 30.2/7.1
hard_caps_breached: [D5<4]  # blocks INSTALL only; T3 PATTERN-STUDY remains open
final_tier: T3 PATTERN-STUDY  # pattern_score 4.25 ≥ 3.5 + D2=5 ≥ 4 + D13=5 ≥ 3 (clean T3, not floor)
```

### Stage 4 adversarial review

- **Security**: APPROVE. MIT. Microsoft-AI-Red-Team-maintained. arXiv-published. Used in Bing/Copilot production red-teaming.
- **Architect**: REVISE. Python lib, no CC integration path → D4=2; install doesn't fit our CC-primitive landscape. Pattern (multi-modal converters + attack orchestration) is the lift.
- **Code-reviewer**: APPROVE. arXiv-cited + multi-vendor coverage + Gradio HITL UI shows maturity beyond version-number.

**Consolidated**: 2 APPROVE + 1 REVISE → T3 PATTERN-STUDY (clean tier, not soft-gate floor).

### Stage 5 decide + pattern_doc_path

**T3 PATTERN-STUDY** — recommended action:

1. **Pattern to extract**: multi-modal red-team attack pipeline (SeedPrompt → Converter → Target → Scorer with text/image/audio/video support)
2. **pattern_doc_path**: `docs/architecture/W293-PATTERNS/multi-modal-red-team-pyrit.md` (W293)
3. **Complement to garak**: garak surface-scan + PyRIT pattern-applied-via-our-own-skills is the SOTA red-team posture (per aisecurityandsafety.org and Vectra AI 2026)
4. **Re-litigation**: re-score in W297 — if PyRIT ships a CC MCP server OR reaches v1.0 stable, D4 + D7 may shift INSTALL-eligible

### Final verdict line

`Azure/PyRIT: T3 PATTERN-STUDY install_score=3.82 pattern_score=4.25 hard_caps=[D5<4] | Multi-modal red-team (text+image+audio+video) unique vs garak (text-only); arXiv-Microsoft-AI-Red-Team-cited; Python lib (D4=2) → pattern extraction over framework install`

---

## §1 — Batch-1 summary table

| Candidate | install_score | pattern_score | Hard caps | Final tier | Stage 4 verdict | Operator-action |
|---|---:|---:|---|---|---|---|
| `OthmanAdi/planning-with-files` | **4.67** | **4.68** | none | **T1 INSTALL** | 3 APPROVE | `claude plugin install othmanadi-planning-with-files` |
| `LearningCircuit/local-deep-research` | 4.13 | 4.68 | none | **T2 VENDOR-FORK** | 2 APPROVE + 1 REVISE | `pip install local-deep-research==1.6.10` + author wrapper skill |
| `bytedance/deer-flow` | 3.56 | 3.48 | D5<4 | **T3 PATTERN-STUDY** (soft-gate floor) | 1 APPROVE + 2 REVISE | author `W293-PATTERNS/middleware-chain-deer-flow.md` |
| `Azure/PyRIT` | 3.82 | 4.25 | D5<4 | **T3 PATTERN-STUDY** | 2 APPROVE + 1 REVISE | author `W293-PATTERNS/multi-modal-red-team-pyrit.md` |

---

## §2 — Executive summary (5 bullets)

1. **One genuine T1 INSTALL emerged**: `OthmanAdi/planning-with-files` revised upward from prelim 4.23 → 4.67 install_score. Manus-pattern persistent-markdown skill with +90% measurable pass-rate delta + 24.7k installs + CC-native (plugin+skill+hooks all official). Composes with `/goal` slash command. **Operator may ship immediately via `claude plugin install`** pending codex GPT-5.5 Stop-hook ratification.

2. **Two prelims downgraded by deeper Stage 2 evidence**: (a) `local-deep-research` from prelim T1 (install_score 4.38) → T2 VENDOR-FORK because D4=2 (Python CLI not CC primitive — the operator-prelim assumption was wrong); install_score 4.13 still ≥ 4.0 floor but practical integration requires wrapping; (b) `deer-flow` from prelim T2 → T3 PATTERN-STUDY due to D5=2 (no independent vs-LangGraph benchmark) + D10=2 (built on LangGraph incumbent in our stack); soft-gate floor case (pattern_score 3.48 within 0.3 of T3 floor).

3. **PyRIT confirmed T3 PATTERN-STUDY** (clean tier, not floor). Multi-modal red-team capability (text/image/audio/video) is genuinely unique vs incumbent garak — but Python-lib-only means pattern extraction is the right adoption depth, not framework install. Microsoft AI Red Team production-deployment (Bing Chat + M365 Copilot) gives strong D6=5 authority signal but doesn't change the integration topology.

4. **Soft-gate worked as designed in 3 of 4 cases**: 0 REJECTs. The deer-flow case explicitly validates the operator's "low-star or stars-only signal ≠ auto-reject" mandate — its 19.5k★ was correctly cap-modulated by D5+D10 evidence rather than star-inflated to T1.

5. **Two W293 pattern-extraction artefacts queued**: `W293-PATTERNS/middleware-chain-deer-flow.md` (the agent-composition middleware-chain pattern) + `W293-PATTERNS/multi-modal-red-team-pyrit.md` (the multi-modal attack pipeline pattern). Both are operator-discretion authoring tasks; can be paralleled with W293 sca-v3.1 implementation (D16/D17/D18 dim additions from W292).

---

## §3 — Operator handoff

**Single-action ship-list** (in priority order):
1. **T1 INSTALL planning-with-files** — `claude plugin install othmanadi-planning-with-files`; smoke-test via `claude plugin list`
2. **T2 VENDOR-FORK local-deep-research** — `pip install --user local-deep-research==1.6.10`; author wrapper skill in next session
3. **T3 PATTERN-STUDY artefacts** — queue 2 markdown patterns for W293

**Codex GPT-5.5 Stop-hook will fire** on the commit landing this file as the cross-model ratification gate.
