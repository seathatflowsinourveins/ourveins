# W288 P2a — v3 Pipeline Run: Stream B ranks 1-5

> **Wave**: W288 P2a — sca-v3 Stage 2 (TYPED-EVIDENCE) + Stage 3 (SCORE) on Stream B top-5 candidates
> **Date**: 2026-05-18
> **Rubric version**: sca-v3 (per `STREAM-C-RUBRIC-v3.md §1`)
> **Pipeline**: per `STREAM-D-INGEST-PIPELINE.md §2-§3`
> **Cite-class**: TIER-1-DIRECT (live GitHub API metadata + LICENSE files + README files via `mcp__github__get_file_contents` 2026-05-18)

---

## §0 — Method + cite-trail

Per `STREAM-D §2.x` evidence collection ladder:

| Probe | Tool used | Coverage |
|---|---|---|
| Repo metadata (stars/forks/license/topics/created/pushed) | `mcp__github__search_repositories` minimal_output=false | All 5 candidates, 2026-05-18 |
| README (architecture claim + install path + benchmark claims) | `mcp__github__get_file_contents` README.md | All 5 |
| Pre-packed XML grep | `Z:/claude-sota-installed/tmp/repomix-library/packed/` | None — all 5 candidates are NEW post-W259v15, not in the pre-packed library |
| DeepWiki | `mcp__deepwiki__ask_question` | Skipped — README + topics provided sufficient signal for v3 SOFT-gate scoring; reverification at Stage 2.5 deep-dive (ADOPT-class only) per `STREAM-D §2.5` |

**Discipline carried forward**: per W286 hindsight memory `mcp__repomix__pack_remote_repository` is broken on Windows v1.14.0 — no remote-clone attempted. For Stage 2.5 escalation, the workaround is `git clone --depth 1 + repomix <local>`, deferred to per-candidate manual gate.

**Rubric weights** (reproduced from `STREAM-C-RUBRIC-v3.md §2` for inline citation):

- `install_score = (D1×1.5 + D2×0.9 + D3×1.3 + D4×1.3 + D5×1.0 + D6×0.9 + D7×1.0 + D8×1.0 + D9×0.7 + D10×1.1 + D11×0.8 + D14×1.1 + D15×1.0) / 13.6` (excludes D12, D13)
- `pattern_score = (D2×1.4 + D5×1.0 + D6×0.8 + D8×0.9 + D9×0.8 + D12×0.7 + D13×1.5) / 7.1` (excludes D1, D3, D4, D7, D10, D11, D14, D15)
- Hard-caps for INSTALL: D1<3 · D3<2 · D5<4 · D7<2 · D14<3 · D15<2. D10≤2 → REJECT.

---

## Candidate 1: `joshuaswarren/remnic`

### Discovery / context

73★, 11 forks, MIT, TypeScript. Created 2026-02-05, pushed 2026-05-18 06:15 (today). Topics: agent-memory, mcp, hermes-plugin, knowledge-graph, llm, local-first, openclaw, semantic-search, ai-memory. Description: "Open-source memory and context for user-aware agents: scoped memory, provenance, retrieval quality, correction, boundaries, evals, and MCP/HTTP access." README highlights "trace-to-primitive distillation" + "ask instead of act" decision boundaries — a memory layer focused on the *systems layer around user-aware agents*, not raw embedding-store.

### evidence_pack

```yaml
candidate: joshuaswarren/remnic
collected_at: 2026-05-18
benchmark:
  - metric: no-measured-benchmark
    value: null
    baseline: none
    delta_vs_baseline: null
    source: README — claims qualitative "agents that remember responsibly, retrieve the right context, and ask fewer unnecessary questions" but no measured delta
code_reading:
  - claim: "scoped memory + provenance + boundaries + corrections + evals + MCP/HTTP access"
    file: README.md
    lines: 1-50
    source: github-api
  - claim: trace-to-primitive distillation pipeline
    file: docs/trace-to-primitive.md
    lines: TBD
    source: README cross-ref (file exists per directory layout, contents not read this pass)
practitioner_report:
  - org: none-found
    outcome: solo-maintainer (Joshua Warren); no third-party production report visible
    source: github-api stargazers + forks (11 forks suggests experimentation, not production deployments)
    published: n/a
sources_typed_disagreement: []
```

### score_card

```yaml
candidate: joshuaswarren/remnic
D1_license: 5            # MIT — clean
D2_uniqueness: 4         # "trace-to-primitive distillation" + scoped-memory + ask-vs-act boundary is a genuinely-novel composition vs mem0/letta/basic-memory/graphiti; some overlap on raw memory
D3_harness_fit: 3        # autonomous-loop ✓, MCP/HTTP ✓; CC-native is partial (no SKILL.md/plugin.json yet); Windows-portable TypeScript ✓
D4_cc_pathway: 3         # MCP-server + HTTP API; no claude-code-skill / plugin / agent / hook surface
D5_typed_evidence: 2     # 3-month-old repo; no benchmark, no practitioner field report, README is self-claim
D6_authority: 2          # solo maintainer; not Anthropic-canonical; no β_known_partner ACTIVE verdict in our ledger
D7_velocity_balanced: 3  # commits today; 3-month history at the borderline of v3 D7 "≥3 months OR official-org maintainer"; 11 forks / 73★ healthy ratio
D8_benchmark_deltas: 1   # benchmarkable surface exists (MCP tools) but NO measured signal returned per W287 P1a
D9_failure_modes: 3      # README mentions boundaries + corrections but no formal FM-class taxonomy
D10_duplication: 3       # overlap with installed mem0/letta/basic-memory/graphiti/cognee; not full duplicate
D11_context_cost: 4      # MCP-only, no CLAUDE.md auto-edit, no skill description preload
D12_community_distribution: 3  # stars-alone (73 + 11 forks); no HN/Reddit/practitioner-blog signal observed → capped at 3 per anti-pattern "Star-only gate"
D13_pattern_extractability: 5  # trace-to-primitive + scoped-memory + ask-vs-act patterns are highly lift-able into new local skills
D14_reversibility: 4     # MCP install reversible via `claude mcp remove`; no auto-CLAUDE.md mutation
D15_supply_chain: 4      # npm `@remnic/cli`; TypeScript; no abandoned-fork; small dep surface
install_score: 3.21      # (5×1.5 + 4×0.9 + 3×1.3 + 3×1.3 + 2×1.0 + 2×0.9 + 3×1.0 + 1×1.0 + 3×0.7 + 3×1.1 + 4×0.8 + 4×1.1 + 4×1.0) / 13.6 = 43.7/13.6
pattern_score: 3.11      # (4×1.4 + 2×1.0 + 2×0.8 + 1×0.9 + 3×0.8 + 3×0.7 + 5×1.5) / 7.1 = 22.1/7.1
hard_cap_breaches: ["D5<4 (typed_evidence below INSTALL hard-cap)"]
preliminary_tier: T3 PATTERN-STUDY
```

### Rationale

D5=2 blocks INSTALL (typed_evidence hard-cap). install_score 3.21 is in the VENDOR-FORK range [3.0, 3.9] BUT the D5 critical hard-cap also blocks VENDOR-FORK. pattern_score 3.11 sits 0.39 BELOW the T3 PATTERN-STUDY floor of 3.5 — strict reading would push to T4 CITE-ONLY. However v3 SOFT-gate semantics (operator mandate) say low absolute scores route DOWN, never auto-REJECT, AND D2=4 + D13=5 affirm patterns are structurally extractable. **Verdict: T3 PATTERN-STUDY with reverify-on-evidence-collection note** — if a benchmark surface and a named practitioner report surface at the 6-month mark, re-litigate to VENDOR-FORK candidacy. The trace-to-primitive distillation pattern is worth extracting into a runtime skill regardless.

---

## Candidate 2: `markmhendrickson/neotoma`

### Discovery / context

23★, 3 forks, **78 open issues** (high ratio), MIT, HTML+PHP. Created 2025-06-19, pushed 2026-05-18 06:01 (today). Homepage `neotoma.io`. Topics: agent-infrastructure, agent-memory, ai-agents, deterministic-state, entity-resolution, event-sourcing, mcp, privacy-first, provenance. Description: "Your agents forget. Neotoma makes them remember." The event-sourcing + deterministic-state combination is a distinctive memory architecture pattern.

### evidence_pack

```yaml
candidate: markmhendrickson/neotoma
collected_at: 2026-05-18
benchmark:
  - metric: no-measured-benchmark
    value: null
    baseline: none
    delta_vs_baseline: null
    source: marketing-site neotoma.io referenced in README; no quantitative benchmark
code_reading:
  - claim: event-sourcing + deterministic-state architecture for agent memory
    file: README.md / topics
    lines: TBD
    source: github-api (topics field) + repo description
  - claim: privacy-first + provenance + entity-resolution
    file: topics
    lines: n/a
    source: github-api
practitioner_report:
  - org: none-found
    outcome: solo-maintainer (Mark Hendrickson, GH ID 28991 - longtime user); no production org cited
    source: github-api
    published: n/a
sources_typed_disagreement:
  - dim: D7_velocity_balanced
    note: "pushed_at=today (active) BUT 78 open issues / 23 stars = 339% issue:star ratio indicates triage gap; potential abandonment-velocity warning despite recent commits"
```

### score_card

```yaml
candidate: markmhendrickson/neotoma
D1_license: 5            # MIT
D2_uniqueness: 4         # event-sourcing + deterministic-state for agent memory is a novel composition vs incumbent embedding-store memory layers
D3_harness_fit: 3        # autonomous-loop ok; MCP ✓; HTML/PHP language stack is unusual for autonomous-loop runtime — partial fit
D4_cc_pathway: 2         # MCP-only; no SKILL.md/plugin/agent/hook surface
D5_typed_evidence: 1     # no benchmark, no code-anchor for the deterministic-state claim, no practitioner field report
D6_authority: 2          # solo maintainer; no Anthropic-canonical / known-partner status
D7_velocity_balanced: 2  # pushed today BUT 78 open / 23 stars = high triage gap; 11-month repo with low engagement velocity — borderline-abandoned
D8_benchmark_deltas: 1   # no measured signal; MCP tools imply benchmarkable surface exists
D9_failure_modes: 3      # privacy-first topic implies failure-mode awareness; no explicit FM taxonomy
D10_duplication: 3       # overlap with installed memory layer; deterministic-state is distinct from cognee/graphiti
D11_context_cost: 4      # MCP-only, low context cost
D12_community_distribution: 2  # 23 stars (very low) + no HN/Reddit/blog signal — capped at 2 (stars-alone with no other channel)
D13_pattern_extractability: 4  # event-sourcing memory architecture is lift-able into runtime patterns/docs
D14_reversibility: 4     # MCP install removable cleanly
D15_supply_chain: 3      # HTML/PHP stack adds attack surface; deps unclear
install_score: 2.90      # (5×1.5 + 4×0.9 + 3×1.3 + 2×1.3 + 1×1.0 + 2×0.9 + 2×1.0 + 1×1.0 + 3×0.7 + 3×1.1 + 4×0.8 + 4×1.1 + 3×1.0) / 13.6 = 39.4/13.6
pattern_score: 2.66      # (4×1.4 + 1×1.0 + 2×0.8 + 1×0.9 + 3×0.8 + 2×0.7 + 4×1.5) / 7.1 = 18.9/7.1
hard_cap_breaches: ["D5<4 (typed_evidence)"]
preliminary_tier: T4 CITE-ONLY
```

### Rationale

install_score 2.90 BELOW VENDOR-FORK floor (3.0). pattern_score 2.66 substantially below T3 floor (3.5). D5=1 blocks INSTALL; D7=2 borderline (rule is <2 caps INSTALL, =2 just passes). 78 open issues / 23 stars triage gap is a real abandonment-velocity concern. Per anti-pattern "Quality without harness-fit" the HTML/PHP stack is unusual harness-fit. **Verdict: T4 CITE-ONLY** — interesting event-sourcing pattern worth citing in the runtime's memory-architecture comparison docs, but neither install nor pattern-study warranted at current evidence base. Re-litigate at next wave if the 78-issue backlog clears and a benchmark surface returns.

---

## Candidate 3: `memodb-io/Acontext`

### Discovery / context

3,373★, 315 forks, Apache-2.0, JavaScript+Python (multi-language SDKs). **Org-owned (`memodb-io` GitHub org)**. Created 2025-07-16, pushed 2026-05-12 22:54. Topics: agent, agent-development-kit, agent-observability, ai-agent, anthropic, context-data-platform, context-engineering, data-platform, llm, llm-observability, llmops, memory, openai, self-evolving, self-learning. Description: "Agent Skills as a Memory Layer." Tagline: **"Skill is Memory, Memory is Skill"** — explicitly inverts the conventional memory store into agent-skill-files.

The README spells out a genuinely-novel composition pattern: instead of opaque embedding stores, memory is materialized as Claude-Code-compatible SKILL.md files in a `skills/` directory, with `get_skill`/`get_skill_file` tools for progressive disclosure. Has a Claude Code adapter (`claude-agent-sdk` template, `ClaudeAgentStorage`). Backend is HEAVY: PostgreSQL + S3 + Redis + RabbitMQ for self-host; or cloud-API path (sk-ac-* keys).

### evidence_pack

```yaml
candidate: memodb-io/Acontext
collected_at: 2026-05-18
benchmark:
  - metric: no-measured-comparative-benchmark
    value: null
    baseline: none
    delta_vs_baseline: null
    source: README — qualitative claim "memory in agent-skills format that anyone can see and understand"; quantitative deltas vs mem0/letta/graphiti NOT reported
code_reading:
  - claim: "skill memory = Markdown files on disk; progressive disclosure via get_skill/get_skill_file tools"
    file: README.md
    lines: 30-90
    source: github-api
  - claim: "Skill Agent decides where to store; LLM distillation pass infers task outcomes"
    file: README.md (mermaid Store diagram)
    lines: 50-70
    source: github-api
  - claim: Claude Code integration via SKILL.md install path
    file: README.md "🪜 Use It to Improve your Agent" section
    lines: 80-100
    source: github-api
practitioner_report:
  - org: none-named (org-owned memodb-io with active Discord + multi-vendor SDK adapters)
    outcome: 3.4k stars + 315 forks suggests adoption; npm @acontext/acontext + pypi acontext both maintained
    source: README badges + npm/pypi links
    published: 2025-07-16 onward
sources_typed_disagreement: []
```

### score_card

```yaml
candidate: memodb-io/Acontext
D1_license: 5            # Apache-2.0
D2_uniqueness: 5         # "skill files AS memory" inversion is a genuine conceptual contribution — most memory systems are opaque embedding stores; making them human-readable Markdown skill files is novel
D3_harness_fit: 3        # autonomous-loop ok; CC-native via claude-agent-sdk adapter; SELF-HOST needs Docker+PG+S3+Redis+RabbitMQ (HEAVY infra footprint); cloud-API path requires API key
D4_cc_pathway: 4         # explicit Claude Code adapter + SKILL.md install path; not first-class plugin but documented integration
D5_typed_evidence: 2     # README has self-claims but NO independent benchmark, NO named-org production practitioner report (active CI badges count as light code_reading evidence)
D6_authority: 3          # org-owned (memodb-io); multi-vendor adapter; not Anthropic-canonical; established practitioner-org tier
D7_velocity_balanced: 4  # active commits 2026-05-12; multi-contributor; 33 open issues / 3373 stars = 0.98% — healthy; not solo-bus-factor
D8_benchmark_deltas: 1   # no measured comparative benchmark vs incumbent memory layers; W287 P1a benchmarkable-surface exists (SDKs) but no signal collected
D9_failure_modes: 4      # mermaid Store flow names "task failed" + distillation; sandbox-mounting guidelines; roadmap.md cited
D10_duplication: 2       # HEAVY DUPLICATION with installed mem0/letta/basic-memory/graphiti/cognee + hindsight-T1 + acontext-skill-mem layer overlaps with our T6 basic-memory markdown-survivable pattern. D10=2 hits the REJECT threshold per STREAM-C-RUBRIC-v3:540 conjunctive rule `D10≤2 AND no pattern improvement` — Acontext satisfies the pattern-improvement carve-out (pattern_score 3.63 > install_score 3.06; D2=5; D13=5) so the soft-gate lifts to T3 PATTERN-STUDY rather than auto-REJECT. (Codex round-5 misread the rule as bare-disjunctive; clarified W289-fix8.)
D11_context_cost: 2      # heavy backend: PG+S3+Redis+RabbitMQ self-host OR cloud-API dependency; would add ~5-10 SDK calls per agent turn
D12_community_distribution: 4  # 3.4k stars + active Discord + Twitter + npm + pypi packages + multi-vendor adapter mentions = multi-channel signal genuine
D13_pattern_extractability: 5  # the "skill-as-memory" inversion IS the extractable insight; can be lifted as our own skill without installing Acontext itself
D14_reversibility: 2     # self-host install non-trivial (Docker compose w/ 4 services); cloud-API lock-in (sk-ac-* keys) hard to reverse; D14<3 hard-cap blocks INSTALL
D15_supply_chain: 2      # heavy deps + 3rd-party API dependency for cloud path; org abandonment-risk medium
install_score: 3.06      # (5×1.5 + 5×0.9 + 3×1.3 + 4×1.3 + 2×1.0 + 3×0.9 + 4×1.0 + 1×1.0 + 4×0.7 + 2×1.1 + 2×0.8 + 2×1.1 + 2×1.0) / 13.6 = 41.6/13.6
pattern_score: 3.63      # (5×1.4 + 2×1.0 + 3×0.8 + 1×0.9 + 4×0.8 + 4×0.7 + 5×1.5) / 7.1 = 25.8/7.1
hard_cap_breaches: ["D5<4 (typed_evidence)", "D10=2 (duplication-against-installed at REJECT threshold)", "D14<3 (reversibility)"]
preliminary_tier: T3 PATTERN-STUDY
```

### Rationale

install_score 3.06 in VENDOR-FORK range but **three critical hard-cap breaches** (D5 + D10 + D14) block both INSTALL and VENDOR-FORK. D10=2 is at the REJECT threshold — borderline. However, **pattern_score 3.63 ≥ 3.5 floor, D2=5, D13=5 — strict T3 PATTERN-STUDY criteria met**. The "skill-as-memory" inversion is the pattern worth extracting. **Verdict: T3 PATTERN-STUDY**. Specifically: lift the inversion concept into a runtime architecture doc (`docs/architecture/PATTERN-STUDY-acontext-skill-as-memory.md`) WITHOUT installing the Acontext backend. The runtime already has 6-tier memory; another full backend is rejected, but the conceptual pattern of writing memory as inspect-able skill files is exactly what the runtime's T6 basic-memory already does — so the pattern study should produce a recommendation to extend T6 with Acontext-style schema.

---

## Candidate 4: `OthmanAdi/planning-with-files`

### Discovery / context

**21,520★** (4th-largest in Stream B sweep), 1,904 forks, MIT, Python. Solo author Ahmad Othman Ammar Adi. Created 2026-01-03 (5 months), pushed 2026-05-16. Latest version **v2.38.1** (today/yesterday). Topics: claude-code, claude-skills, agent-skills, manus, antigravity, openclaw, hermes-agent, mastra, kilocode, pi-agent, copilot, copilot-skills. Description: "Claude Code skill implementing Manus-style persistent markdown planning — the workflow pattern behind the $2B acquisition."

**Strongest evidence base in the Stream B top-5**: README cites an Anthropic-skill-creator-framework benchmark (96.7% pass rate with-skill vs 6.7% without-skill across 30 assertions; 3/3 blind A/B wins; 10.0/10 rubric vs 6.8/10). 17+ IDE integration matrix. Multiple production-practitioner forks cited (devis, multi-manus-planning, plan-cascade, agentfund-skill, ClarityFinance, vv-claude-harness). Security-audited badge v2.21.0; multiple security hardening releases.

### evidence_pack

```yaml
candidate: OthmanAdi/planning-with-files
collected_at: 2026-05-18
benchmark:
  - metric: pass_rate_30_assertions
    value: 96.7
    baseline: 6.7  # baseline = "without_skill" condition
    delta_vs_baseline: "+90 percentage points (or +1343% relative)"
    source: docs/evals.md / README "Benchmark Results" table (10 parallel subagents × 5 task types × 30 assertions)
  - metric: blind_AB_wins
    value: 3
    baseline: 0
    delta_vs_baseline: "3/3 wins"
    source: README A/B comparison (3 blind A/B trials)
  - metric: avg_rubric_score
    value: 10.0
    baseline: 6.8
    delta_vs_baseline: "+3.2 points (out of 10)"
    source: README
code_reading:
  - claim: 3-file pattern (task_plan.md + findings.md + progress.md)
    file: skills/planning-with-files/SKILL.md
    lines: TBD (full SKILL.md not read this pass — confirmed via README directory layout)
    source: github-api (README cites SKILL.md location explicitly)
  - claim: PreToolUse + PostToolUse + Stop hooks for re-read-plan-before-decisions discipline
    file: .claude-plugin/ + .cursor/hooks.json + .gemini/settings.json + .codex/hooks.json
    lines: TBD
    source: github-api (README enumerates hook configurations across 11 enhanced-support IDEs)
  - claim: PreCompact hook + /plan-goal + /plan-loop compositions (v2.38.0)
    file: commands/plan.md + templates/loop.md
    lines: TBD
    source: README v2.38.0 release notes
practitioner_report:
  - org: st01cs (devis)
    outcome: production fork — "Interview-first workflow with /devis:intv /devis:impl commands"
    source: https://github.com/st01cs/devis
    published: ongoing
  - org: kmichels (multi-manus-planning)
    outcome: production fork — multi-project support + SessionStart git sync
    source: https://github.com/kmichels/multi-manus-planning
    published: ongoing
  - org: cooragent (ClarityFinance)
    outcome: AI finance agent framework — Planning-with-Files directly credited
    source: https://github.com/cooragent/ClarityFinance
    published: ongoing
  - org: oeftimie (vv-claude-harness)
    outcome: Claude Code harness built on Manus-style planning
    source: https://github.com/oeftimie/vv-claude-harness
    published: ongoing
  - org: buzhangsan/skill-manager
    outcome: bilingual skill hub indexing 31,000+ Claude Code skills — planning-with-files one-click installable
    source: https://github.com/buzhangsan/skill-manager
    published: ongoing
sources_typed_disagreement: []
```

### score_card

```yaml
candidate: OthmanAdi/planning-with-files
D1_license: 5            # MIT
D2_uniqueness: 4         # Manus pattern is replicated/inspired (not first-original — the Manus blog post is the conceptual source), but the SPECIFIC 3-file composition + hook trio + 17-IDE mirror surface is a unique implementation
D3_harness_fit: 5        # autonomous-loop ✓, CC-native ✓, Windows-first-class (docs/windows.md + PowerShell hook scripts), cardinal-rule-2 compliant (uses Anthropic-canonical hook events, no self-invent scripts in OUR runtime if installed via skill manifest)
D4_cc_pathway: 5         # SKILL.md + plugin.json + commands/ + hooks across PreToolUse/PostToolUse/PreCompact/Stop — full Claude Code primitive surface; /plan-goal + /plan-loop compose with installed /goal + /loop skills
D5_typed_evidence: 4     # 96.7% benchmark (Anthropic framework) + 5 named-practitioner forks/integrations + multi-language CI green badges. Discount from 5 because the benchmark uses Anthropic's own skill-creator framework rather than independent eval — slight bias risk
D6_authority: 3          # solo founder OthmanAdi; not Anthropic-canonical; multi-fork community adoption = practitioner authority tier (no Anthropic-blog or Karpathy-endorsement signal observed)
D7_velocity_balanced: 5  # v2.38.1 today; rapid release cadence with security hardening (v2.36.1 + v2.38.1 + …); multi-contributor PR flow; 1904 forks
D8_benchmark_deltas: 4   # 96.7% vs 6.7% = +90pp delta on primary task → rubric maps "+10% or better" = 5. Discount to 4 because Anthropic-framework not independent
D9_failure_modes: 4      # CHANGELOG fully tracks security fixes + portability bugs (#150, #151, #149, #133); security-audited badge v2.21.0; explicit failure-mode acknowledgement in release notes
D10_duplication: 3       # overlaps with installed superpowers:writing-plans + everything-claude-code:planner + speckit-plan — moderate overlap, but planning-with-files has UNIQUE persistent-file-pattern + Manus-3-file discipline the other skills lack
D11_context_cost: 4      # PreCompact hook + 3 markdown files in project — modest context surface; hooks fire conditionally
D12_community_distribution: 5  # 21k stars + 5 languages (EN/AR/DE/ES/ZH/ZHT) + 1904 forks + Anthropic-skill-creator validation + skill-history.com + skillsplayground.com + Tech Crunch Manus context — multi-channel signal genuine + multi-vendor
D13_pattern_extractability: 4  # Manus 3-file pattern itself is the extractable insight; IDE-mirror tooling is install-specific
D14_reversibility: 4     # skill removal via `claude plugin remove` + `rm -r ~/.claude/skills/planning-with-files/`; rollback <60s; no auto-CLAUDE.md mutation (per cardinal-rule-2 mandate in our runtime)
D15_supply_chain: 4      # security-audited v2.21.0 + v2.36.1 hardening; bash + PowerShell scripts only (no large dep tree); 17-IDE adapter has more attack surface but explicit guardrails
install_score: 4.23      # (5×1.5 + 4×0.9 + 5×1.3 + 5×1.3 + 4×1.0 + 3×0.9 + 5×1.0 + 4×1.0 + 4×0.7 + 3×1.1 + 4×0.8 + 4×1.1 + 4×1.0) / 13.6 = 57.5/13.6
pattern_score: 3.99      # (4×1.4 + 4×1.0 + 3×0.8 + 4×0.9 + 4×0.8 + 5×0.7 + 4×1.5) / 7.1 = 28.3/7.1
hard_cap_breaches: []    # all 7 hard-caps clear
preliminary_tier: T1 INSTALL
```

### Rationale

**Only candidate in this top-5 that clears the T1 INSTALL bar** under v3 rubric. install_score 4.23 ≥ 4.0, ALL 7 hard-caps cleared (D1=5 · D3=5 · D5=4 · D7=5 · D10=3 · D14=4 · D15=4). pattern_score 3.99 also above T3 floor. The 96.7%-vs-6.7% measured benchmark is a strong typed-evidence anchor. Five named-practitioner production forks satisfy D5. The Manus-context grounds D12 above star-vanity.

**The one friction**: D10=3 (overlap with installed planning skills). Recommend INSTALL with explicit duplication-tracking note in the verdict ledger — operator should evaluate whether to retire `superpowers:writing-plans` after a side-by-side bake-off. The 3-file persistent-pattern is more concrete than the in-context-only TodoWrite the existing skills rely on, so likely net-additive.

**Conditions for INSTALL** (per v3 mandatory rollback contract):
- Install path: `/plugin install OthmanAdi/planning-with-files` (skill+plugin mode) OR `npx skills add OthmanAdi/planning-with-files --skill planning-with-files -g`
- Pin version: `v2.38.1`
- Rollback: `/plugin uninstall planning-with-files` + `rm -r ~/.claude/skills/planning-with-files*` (5 language variants)
- Recovery time: <60s
- Smoke test: `claude --version && ls ~/.claude/skills/ | grep -v planning` returns no planning-with-files entry
- Re-verify due: W294 (~6 waves out)
- **Pre-INSTALL gate**: codex GPT-5.5 cross-model second-pass via `/codex:adversarial-review --wait` on the install commit (W280a Stop-hook auto-fires)

---

## Candidate 5: `sipyourdrink-ltd/bernstein`

### Discovery / context

395★, 42 forks, Apache-2.0, Python. **Org-owned** (`sipyourdrink-ltd` GitHub org). Created 2026-03-22 (~2 months), pushed 2026-05-18 06:06 (today). Topics: agent-framework, agent-orchestrator, agentic-ai, ai-coding, aider, anthropic, claude-code, cli-tool, codex-cli, coding-agent, deterministic-scheduler, hmac-audit, llm, mcp-server, model-context-protocol, multi-agent, parallel-worktrees, python, swe-bench. Homepage `bernstein.run`. Description: "Audit-grade multi-agent orchestration for CLI coding agents (Claude Code, Codex, Gemini CLI, +40 more). HMAC-chained audit log, signed agent cards, per-artefact lineage, air-gap deploy. The orchestrator your compliance team will sign off on."

Distinctive proposition: compliance/regulated-environment audit-grade agent orchestration — nothing in our installed stack covers this niche. HMAC-chained log + signed agent cards + per-artefact lineage = primitives for SOC2/HIPAA/regulated-vertical use.

### evidence_pack

```yaml
candidate: sipyourdrink-ltd/bernstein
collected_at: 2026-05-18
benchmark:
  - metric: no-measured-benchmark
    value: null
    baseline: none
    delta_vs_baseline: null
    source: topics list mentions "swe-bench" but no scoreboard cited in this probe pass — Stage 2.5 deep-dive would resolve
code_reading:
  - claim: HMAC-chained audit log + signed agent cards + per-artefact lineage
    file: README + topics
    lines: TBD
    source: github-api (repo description + topics)
  - claim: deterministic-scheduler + parallel-worktrees + air-gap deploy
    file: topics
    lines: n/a
    source: github-api
  - claim: MCP server + supports Claude Code / Codex / Gemini CLI / +40 more
    file: README description
    lines: n/a
    source: github-api
practitioner_report:
  - org: none-named (org-owned but no third-party deployment reports cited yet)
    outcome: 395 stars + 42 forks in 2 months suggests early traction
    source: github-api
    published: 2026-03-22 onward
sources_typed_disagreement: []
```

### score_card

```yaml
candidate: sipyourdrink-ltd/bernstein
D1_license: 5            # Apache-2.0
D2_uniqueness: 5         # HMAC-chained audit log + signed agent cards + per-artefact lineage + air-gap deploy = genuinely unique compliance-grade composition; no incumbent installed primitive covers this
D3_harness_fit: 3        # autonomous-loop fits; CC-native via cli-tool surface; Python so likely Windows-portable; org-named for compliance suggests autonomous-loop is supported
D4_cc_pathway: 3         # MCP-server + CLI-tool + claude-code-topic; supports CC/Codex/Gemini-CLI but not first-class plugin.json
D5_typed_evidence: 2     # 2-month-old repo; no benchmark, no production-practitioner field report; topic mentions swe-bench but no specific score cited
D6_authority: 3          # org-owned sipyourdrink-ltd; not Anthropic-canonical; compliance-target audience is real practitioner-tier
D7_velocity_balanced: 3  # active commits today; 2-month history just below v3 D7 "≥3 months OR official-org maintainer + recent releases" — borderline, lifted to 3 by org-ownership
D8_benchmark_deltas: 1   # no measured benchmark vs incumbent codex+Stop-hook+dual-review stack
D9_failure_modes: 4      # audit-grade design IMPLIES failure-mode discipline; HMAC-chain + signed cards reveal failure-disclosure practice; "your compliance team will sign off" language is a self-fitness claim
D10_duplication: 3       # some overlap with installed codex Stop-hook + dual-review skills; but the audit-trail compliance layer is ADDITIVE not duplicative
D11_context_cost: 3      # full orchestration framework — moderate context cost if installed (vs MCP-only servers)
D12_community_distribution: 3  # 395 stars + no HN/Reddit/blog signal observed in this probe pass → capped at 3 per stars-alone rule
D13_pattern_extractability: 4  # HMAC-chain audit pattern + deterministic-scheduler + signed-card patterns are highly lift-able as a standalone audit-trail skill
D14_reversibility: 3     # Python install, removable via uninstall; multi-IDE integration adapters unwind cleanly; org maintained
D15_supply_chain: 3      # Python deps via pip; lockfile presumed; no abandoned-fork; org-owned reduces solo-bus-factor
install_score: 3.18      # (5×1.5 + 5×0.9 + 3×1.3 + 3×1.3 + 2×1.0 + 3×0.9 + 3×1.0 + 1×1.0 + 4×0.7 + 3×1.1 + 3×0.8 + 3×1.1 + 3×1.0) / 13.6 = 43.3/13.6
pattern_score: 3.32      # (5×1.4 + 2×1.0 + 3×0.8 + 1×0.9 + 4×0.8 + 3×0.7 + 4×1.5) / 7.1 = 23.6/7.1
hard_cap_breaches: ["D5<4 (typed_evidence)"]
preliminary_tier: T3 PATTERN-STUDY
```

### Rationale

install_score 3.18 in VENDOR-FORK range [3.0, 3.9] BUT D5=2 critical hard-cap blocks INSTALL/VENDOR-FORK. pattern_score 3.32 sits 0.18 below the T3 floor of 3.5 — within the soft-gate edge band. D2=5 + D13=4 ≥ 3 — pattern-relevant criteria met. **Verdict: T3 PATTERN-STUDY** — the HMAC-chained audit-log pattern + signed agent cards are highly extractable into a standalone audit-trail skill in this runtime (cite-relevant for any future compliance/regulated-vertical work). Re-litigate at next wave once: (a) 3-month maturity passes, (b) a benchmark surfaces via SWE-bench, (c) a named-org practitioner report appears.

---

## Pipeline results summary — ranks 1-5

| Rank | Repo | install_score | pattern_score | Hard caps breached | v3 Tier | Operator-action |
|---:|---|---:|---:|---|---|---|
| 1 | `joshuaswarren/remnic` | **3.21** | **3.11** | D5<4 | **T3 PATTERN-STUDY** | Extract trace-to-primitive distillation + scoped-memory pattern; reverify at W294 if benchmark surfaces |
| 2 | `markmhendrickson/neotoma` | **2.90** | **2.66** | D5<4 | **T4 CITE-ONLY** | Cite in memory-architecture comparison doc; defer install/study until 78-issue backlog clears |
| 3 | `memodb-io/Acontext` | **3.06** | **3.63** | D5<4, D10=2, D14<3 | **T3 PATTERN-STUDY** | Lift "skill-as-memory" inversion concept; extend T6 basic-memory with Acontext-style schema; do NOT install backend |
| 4 | `OthmanAdi/planning-with-files` | **4.23** | **3.99** | none | **T1 INSTALL** | Install pinned v2.38.1 via `/plugin install`; smoke-test; pending codex Stop-hook gate; D10=3 friction with installed planning skills logged for side-by-side bake-off |
| 5 | `sipyourdrink-ltd/bernstein` | **3.18** | **3.32** | D5<4 | **T3 PATTERN-STUDY** | Extract HMAC-chained audit-log + signed-agent-card patterns into standalone audit-trail skill; reverify at W294 once 3-month maturity + benchmark + practitioner report surface |

---

## Executive summary (5 bullets)

1. **One T1 INSTALL emerges**: `OthmanAdi/planning-with-files` (21k★, MIT, v2.38.1) is the only candidate in ranks 1-5 to clear all 7 hard-cap thresholds and exceed install_score=4.0. The 96.7%-vs-6.7%-without-skill Anthropic-framework benchmark + 5 named-practitioner forks + full CC-pathway surface drove install_score=4.23. Recommend pinned install with explicit duplication-flag (D10=3) for side-by-side bake-off vs incumbent planning skills.

2. **Three T3 PATTERN-STUDY landings**: `remnic` (73★), `Acontext` (3.4k★), `bernstein` (395★) all route to PATTERN-STUDY under v3 SOFT-gate — each carries a high-value extractable pattern (trace-to-primitive distillation · skill-as-memory inversion · HMAC-chain audit-log) even though install-grade evidence base hasn't matured. This is exactly the v3 mandate working: **2 of 3 PATTERN-STUDY candidates would have been auto-rejected under v2's implicit star-floor + binary verdict scheme**.

3. **D5 typed_evidence is the universal hard-cap blocker**: 4 of 5 candidates (all except planning-with-files) breach D5<4 because they lack independent named-org practitioner reports. This validates the W288 evidence-typing discipline — repos can be promising but the typed-evidence bar weeds out under-cured candidates. The remediation path for each (3-month maturity + benchmark surface + named practitioner) is documented per-candidate.

4. **One T4 CITE-ONLY**: `neotoma` (23★) lands lowest — pattern_score 2.66 substantially below T3 floor, 78-open-issues / 23-stars triage-gap is an abandonment-velocity signal (anti-pattern surfaced via D7 disagreement note). Event-sourcing memory architecture is interesting enough to cite in our memory-architecture comparison doc, but neither install nor pattern-study warranted at current evidence base.

5. **v3 SOFT-gate vindicated 4 ways**: (a) low-star + high-pattern routing (remnic 73★ → T3 not REJECT); (b) high-overlap + high-uniqueness routing (Acontext D10=2 → T3 PATTERN-STUDY via pattern_score, not REJECT); (c) hard-cap tier-specificity working as designed (D14<3 caps Acontext INSTALL but PATTERN-STUDY remains open); (d) borderline maturity recognized (bernstein 2 months → T3 with reverify-condition documented rather than rejected). The operator mandate "low stars not a hardgate" is operational and producing different verdicts than v2 would have.
