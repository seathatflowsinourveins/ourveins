---
name: goal-prompt-synthesis
description: Synthesize a definitive, paste-ready /goal predicate from a sprawling operator request. Use when the operator asks for "definitive next steps", a "paste-ready /goal", the "next /goal", a "comprehensive /goal", a "/goal less than N characters", a "/goal with priority", or otherwise asks to author or improve a /goal predicate — especially when the request names multiple SOTA repos, several priority axes, and a character ceiling. Do NOT use for routine /loop cron re-entries or session-checkpoint commits (an active /goal already exists), or for single-file edits (just make the edit).
---

# goal-prompt-synthesis

Turn a long, multi-topic operator request into one tight, prioritized, paste-ready `/goal`
predicate — a prompt the operator pastes into a fresh Claude Code session, which then
executes the work.

The deliverable is **a prompt, not the work itself**. Research only enough to prioritize
correctly; the synthesized `/goal` carries the execution.

## Process

Seven phases. Phases 1-3 are research and can run concurrently (parallel `Agent` forks);
phases 4-7 are serial: compose → anti-bias gate → cross-model convergence → persist.

### 1. Discover — breadth before depth (multi-MCP, multi-channel, W295)

Probe **≥6 independent source families** for the repos/patterns the operator named:
1. **Official Anthropic docs** — `code.claude.com/docs` (Context7 + `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index`)
2. **GitHub** — `mcp__github__*` (search + commits + releases + issues + PR diffs) + GraphQL via `gh api graphql`
3. **DeepWiki** — `mcp__deepwiki__ask_question` on any GitHub repo (NOT limited to popular ones)
4. **Repomix** — `mcp__repomix__pack_remote_repository` + `grep_repomix_output` for whole-repo cross-reference
5. **Awesome-list catalogs** — hesreallyhim/awesome-claude-code, awesome-mcp-servers, etc.
6. **Multi-vendor cross-search** — Perplexity MCP (when wired) + Exa MCP (when wired) + WebSearch + WebFetch for non-GitHub sources (blog posts, HN, academic, vendor docs)

**Single-source discovery is auto-FAIL** — inherits GitHub popularity bias and misses low-star high-quality candidates. Each family returns either a concrete finding or an explicit "nothing found" — never a silent gap.

**Stars are NOT a hardgate** — per W288 sca-v3 mandate, stars are a sub-signal of D12 (caps at 3 when only stars present). Low-star repos can win on pattern_score even when failing install_score.

### 2. Verify — harness-fit, not just quality

A pattern can be excellent and still not fit this runtime. For each candidate ask:
- Does it assume an interactive operator, when this runtime is an autonomous `/loop`?
- Is it Claude-Code-native / Anthropic-API, or another vendor's SDK?
- Is the capability already exposed by an installed plugin? Don't re-adopt what's installed.
- Does it require a self-invented hook or script? That conflicts with cardinal-rule-2 — find the official equivalent.
- Windows / PowerShell portability.

Down-rank or reject candidates that fail harness-fit even if they are SOTA elsewhere.

### 3. Converge — typed-evidence diversity (W295 — supersedes "≥3 orgs")

Before a candidate becomes an adoption target in the `/goal`, the evidence set MUST include all three TYPED categories from **≥3 organizationally-distinct sources**:

- **≥1 BENCHMARK with numbers** — measured performance/capability delta with explicit metric + value (e.g., "67% cost reduction", "+18% MRR@10 vs baseline"). README claims without numbers do NOT count.
- **≥1 CODE READING** — direct citation of candidate's source code (file:line) demonstrating the claimed capability is actually implemented, not just promised in docs.
- **≥1 PRACTITIONER FIELD REPORT** — a named org/practitioner reporting outcome from running the candidate in production (issue threads, postmortems, blog posts). Marketing claims by the candidate's own author do NOT count.

The three typed sources MUST be organizationally-distinct (≥3 different authors/orgs). One repo's README echoed across forks is evidentially singular.

### 3.5. Freshness verification (W324-r11 codex-ratified; operator-mandated 2026-May-or-newer floor)

Every cited repo MUST be activity-verified BEFORE composition. Stale references fail-CLOSED:

```bash
gh api "/repos/<owner>/<name>" --jq '.pushed_at' | cut -c1-10
# accept:  last-30-days  → FRESH
# accept:  last-90-days  → ACCEPTABLE-Q1 (annotate)
# demote:  >90-days OR archived:true → PATTERN-STUDY-ONLY (drop from foundation)
```

Demotion policy: repos with `pushed_at` >90 days OR `archived:true` move to PATTERN-STUDY-ONLY tier; do NOT use in foundation P-block ranking. Document the demotion in the `/goal` body so receiving session does not re-elevate.

**Full-SHA discipline (W324-r8 codex critique)**: codex rejects short SHAs (8/12-char) for the "verifiable URLs" criterion. Always fetch full 40-char via `gh api /repos/<owner>/<name>/commits/HEAD --jq .sha` and embed in tree URLs: `https://github.com/<owner>/<name>/tree/<40-char-sha>`.

### 4. Compose — tight, prioritized, paste-ready

- **Ceiling**: ≤3800 chars; honor any tighter ceiling the operator gives. The paste tooling rejects long inputs.
- **Structure**: header line → `P0…Pn` priority blocks (most important first, one execution surface per block) → `MANDATES` → `REPORT / SHIP` → `STOP`.
- **Research-first**: every gap instructs *research the SOTA source, then remediate* — never "hand-code a fix".
- **Agent teams**: if the `/goal` spawns ≥3 agents, MANDATES must name the orchestration plugin (`agent-teams` / `agent-orchestration`), cap concurrency, and require a cross-model review pass (`codex` / `comprehensive-review`).
- **Parallel sessions**: for a multi-session arc, the header declares a branch + `git worktree` so parallel sessions don't collide.
- **Preload hygiene**: a STOP-gate item verifies `CLAUDE.md` stays pointer-only and the memory index stays bounded.
- **Verify paths**: confirm every file path named in the predicate exists in the live tree before shipping.

### 4.1. Triadic decomposition (Δ-G47, W321→W328 absorb) — Planner/Researcher/Reporter

For multi-priority `/goal` synthesis (≥3 priorities), decompose into three typed roles dispatched as separate `Agent` streams (W269-mandate compliant — 3 streams ≥ 2-stream trigger):

| Role | Input | Output | Source-anchor |
|---|---|---|---|
| Planner | (operator_request, ceiling, harness_constraints) | ordered_priorities[] | assafelovic/gpt-researcher `EditorAgent` (serial — emits ordered section outline) |
| Researcher | (priority, ≥6 source families) | evidence_set (≥3 typed) | Anthropic Multi-Agent Research blog + gpt-researcher `ResearchAgent` (parallel via `asyncio.gather` in `_run_parallel_research`) |
| Reporter | (priorities, evidence, ceiling) | /goal predicate | microsoft/autogen `GroupChatManager` + gpt-researcher `WriterAgent` + `PublisherAgent` |

The three roles ARE the W295 anti-bias enforcement at structural level — separating planning from researching prevents the same model from both ranking AND verifying its own priorities (the exact failure §5 inverse-test catches reactively).

**3-org-distinct cite-anchors**:
- `https://github.com/assafelovic/gpt-researcher` — Tavily / Assaf Elovic canonical OSS triadic implementation (`multi_agents_ag2/agents/orchestrator.py` `ChiefEditorAgent.run_research_task`)
- `https://www.anthropic.com/research/built-a-multi-agent-research-system` — Anthropic PBC orchestrator-dispatches-typed-subagents
- `https://github.com/microsoft/autogen` — Microsoft Research AutoGen 0.4 `GroupChatManager` + `RoutedAgent`

Forward-AI W329+: consider 4-role ROMA + GEPA+ split (Atomizer + Planner + Executors + Aggregator) per arXiv 2602.01848v1 — reported 2-6 point absolute accuracy gains over standard GEPA with 3-4× fewer metric evaluations (https://github.com/sentient-agi/gepa-plus).

### 4.2. DSPy Signature/Module/Optimizer goal-decomposition (Δ-G48, W321→W328 absorb)

Express goal-decomposition as a typed DSPy prompt-program (DSPy 3.2.1 already-INSTALLED per W317; companion skill `dspy-integration`):

```python
import dspy

class GoalDecompose(dspy.Signature):
    """Decompose a sprawling operator request into a prioritized /goal predicate."""
    operator_request:    str  = dspy.InputField(desc="Free-form multi-topic operator request")
    ceiling_chars:       int  = dspy.InputField(desc="Hard character ceiling for output")
    harness_constraints: str  = dspy.InputField(desc="Runtime-specific constraints (Windows/Z:/etc)")
    priorities:          list = dspy.OutputField(desc="Ordered list of P0..Pn priority blocks")
    rationale:           str  = dspy.OutputField(desc="3-line rationale per priority")

class GoalSynthesisPipeline(dspy.Module):
    def __init__(self):
        super().__init__()
        self.plan    = dspy.ChainOfThought(GoalDecompose)
        self.compose = dspy.ChainOfThought("priorities, evidence -> goal_predicate")
    def forward(self, request, ceiling, constraints, evidence):
        plan = self.plan(operator_request=request, ceiling_chars=ceiling, harness_constraints=constraints)
        return self.compose(priorities=plan.priorities, evidence=evidence)
```

**Optimizer selection** (per DSPy DeepWiki verification):
- ≤~10 labeled examples: `dspy.BootstrapFewShot` (recommended starter)
- 50-200 labeled examples: `dspy.MIPROv2`
- Reflective with textual feedback: `dspy.GEPA` (Pareto-frontier — Δ-G50 dependency)

Optimize against tri-axis `(decomposition_quality, harness_fit, ceiling_compliance)`.

**Why**: turns prompt-synthesis from artisanal prose into a measurable, optimizable program. Zero install cost.

**3-org-distinct cite-anchors**:
- `https://github.com/stanfordnlp/dspy` — Stanford NLP DSPy 3.x Signature/Module/Optimizer
- `https://www.databricks.com/blog/how-databricks-builds-compound-ai-systems-dspy` — Databricks independent practitioner field report
- `https://arxiv.org/abs/2507.19457` — GEPA Agrawal et al. 2025 (Berkeley + Stanford + MIT + Databricks co-authored; NeurIPS 2025) — corrected arXiv ID

### 5. Anti-bias source-of-truth gate (W295 NEW)

The /goal predicate's adoption-decision criteria MUST be sourced from EXTERNAL convergence evidence, NOT from this runtime's current architecture (sca-v3.1, current rubric weights, current installed-set). Apply the **inverse test**:

- **Inverse test**: would this `/goal` recommend the SAME adoption if the operator gave a DIFFERENT current architecture (different rubric weights, different installed plugins, different cardinal-rule numbering)?
- **If YES (architecture-agnostic)** → the decision is sourced from external SOTA convergence. Pass.
- **If NO (architecture-dependent)** → the decision is self-referencing. The `/goal` is biased; revise.

**Falsifiable-inverse template (W324-r11 codex-ratified + Δ-G51 W321→W328 INDEPENDENCE-PROOF tightening; transferability-claims FAIL)** — every ranked P-block MUST state inverse as:

```
COUNTERFACTUAL: IF <foundation anchor X> deprecated/abandoned/relicensed
THEN <criterion Y> STILL preserved
BECAUSE <independent external URL anchor Z (not same-family as foundation X)>
INDEPENDENCE-PROOF (Δ-G51, W321→W328 — three sub-assertions):
  (a) ORG-DISTINCT:      Z.org ∉ {X.org, X.contributors-overlap-ratio > 0.2}
  (b) CAUSAL-DISTINCT:   Z does NOT cite X as a precondition (transitive check)
  (c) TEMPORAL-DISTINCT: Z published BEFORE X.first-release OR by independently-arrived team
```

The three sub-assertions are derived from Popper falsifiability — "the test must be independent of the hypothesis it tests". microsoft/promptflow YAML pipeline + OpenSSF Best Practices codify the org-distinct and causal-distinct sub-assertions as practical contracts.

Pure transferability claims ("applies-to-any-runtime", "any-tool-class") are NOT falsifiable inverses per codex r1-r10 rejections. The independent anchor MUST:
- Be a full URL (not bare domain)
- Be organizationally-distinct from the foundation anchor (e.g., if foundation is anthropics, inverse must be OpenAI/Gemini/DeepSeek/NIST/OpenJS — NOT another anthropics endpoint)
- Preserve the EXACT tested property, not just a generic capability class
- Have numeric pkg/version enforcement WHERE applicable (not regex-shape probes)

**3-org-distinct cite-anchors (Δ-G51)**:
- `https://plato.stanford.edu/entries/popper/` — Stanford Encyclopedia of Philosophy Karl Popper falsifiability + independence-of-test
- `https://github.com/microsoft/promptflow` — Microsoft promptflow YAML DAG pipeline independence assertions
- `https://www.bestpractices.dev/en` — OpenSSF Best Practices §15 multi-org-anchor independence requirement

Concrete anti-bias checks before §6:
- Does the /goal cite ≥3 external orgs (NOT this runtime, NOT sibling claude-sota-pure) as the source of the rubric criteria it applies?
- Does the /goal include at least 1 candidate whose adoption would CHALLENGE current architecture (e.g. supersede sca-v3.1 itself, replace a currently-installed plugin)?
- If 0 challenger candidates surface, escalate to operator with HONEST-NON-FINDING: "all surfaced candidates are confirmatory of current architecture — this suggests either (a) current is genuinely SOTA or (b) discovery missed challengers; recommend re-discovery via alt-MCPs."

The runtime's source of truth is **external SOTA convergence**, NOT internal-architecture-as-axiom.

### 5.5. Pareto-frontier priority ranking (Δ-G50, W321→W328 absorb)

When the `/goal` carries ≥4 priorities, single-axis ranking (importance-only) hides dominated alternatives. Apply multi-criteria decision analysis (MCDA) on four axes BEFORE settling P0..Pn ordering:

| Axis | Definition | Source |
|---|---|---|
| `urgency` | Days-until-stale OR blocker-count (higher = more urgent) | operator-derived |
| `effort` | Estimated tool-call cost in K-units (lower = cheaper) | Δ-PDM-2 budget model |
| `harness-fit` | 0-1 score from §2 Verify (higher = better fit) | Phase 2 verdict |
| `blast-radius` | Files touched × cardinal-rule-classes affected (higher = riskier) | static-analysis estimate |

Compute the Pareto-non-dominated set: priority Pi dominates Pj iff Pi is better-or-equal on all axes AND strictly better on ≥1 axis. Surface the FRONTIER block in the `/goal` predicate:

```
FRONTIER (Δ-G50 Pareto-non-dominated):
  P0: <name> — (urgency=H, effort=M, harness-fit=0.9, blast-radius=L)
  P1: <name> — (urgency=H, effort=L, harness-fit=0.7, blast-radius=L)  # dominates P3 (lower effort, equal urgency, equal fit)
  P2: <name> — (urgency=M, effort=L, harness-fit=0.8, blast-radius=L)
  DOMINATED (excluded from frontier):
    P3-dominated-by-P1: <name> — (urgency=H, effort=H, harness-fit=0.7, blast-radius=L)
```

Receiving session executes the frontier set first; dominated priorities deferred to a follow-up `/goal`. EC-PROMETHEE Borda aggregation (pyDecision) handles ties at the frontier; GEPA Pareto-frontier sampling provides reflective optimization when the frontier is large (≥6 candidates).

**3-org-distinct cite-anchors (Δ-G50)**:
- `https://github.com/Valdecy/pyDecision` — Valdecy / Universidade Federal Fluminense MCDA library (EC-PROMETHEE Borda aggregation)
- `https://arxiv.org/abs/2507.19457` — GEPA Agrawal et al. 2025 Pareto-frontier candidate sampling (independent academic team — Berkeley + Stanford + MIT + Databricks)
- `https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Measure/2_3` — NIST AI 600-1 MEASURE-2.3 multi-criteria evaluation guidance

### 6. Cross-model convergence + team-shape orchestration (W295)

#### 6.1 Team-shape selection heuristic (W295 P0b — multi-agent-optimize derived)

The receiving `/goal` session executes via multi-agent orchestration. Specify the team-shape inline so the receiver does not re-derive. Pick from the matrix (sourced from W289-ORCHESTRATION-RUNBOOK §1-§2 + empirical W288/W289/W290 verdict-completion stats):

| Goal structure | Team-shape | Streams | Preset / mechanism |
|---|---|---|---|
| Single-axis fix (≤3 files, 1 root-cause) | Solo | 1 | W269 exempt; record carve-out in commit msg |
| Multi-persona pre-merge review | `/team-spawn review` | 3 | `review` (3× team-reviewer: sec/perf/arch) |
| Competing-hypothesis debug | `/team-spawn debug` | 3 | `debug` (3× team-debugger, one hypothesis each) |
| Parallel-buildable feature (FE+BE+tests) | `/team-spawn fullstack` | 4 | `fullstack` |
| **Research / audit / discovery sweep** | **Orchestrator-Worker (Δ-G49) + 4-stream Agent fan-out** | **4 (empirical optimum)** | `research` preset OR symmetric general-purpose fan-out — see §6.1.b for MANDATES |
| Security audit (OWASP+auth+deps+config) | `/team-spawn security` | 4 | `security` |
| Multi-file migration (≥3 slices) | `/team-spawn migration` | 3-4 | `migration` |
| Cross-model peer review | TeamCreate (bespoke) | 3 | 2× `agent-teams:team-reviewer` (Claude) + 1× `codex:codex-rescue` (GPT-5.5) |
| Off-critical-path long-running | `claude --bg` | 1 (background) | detached session — frees REPL |
| What-if side-quest with full context | `/fork` (panel) | 1 fork | inherits convo; no re-explain cost |

**Why 4 streams is the empirical optimum for research/audit/discovery** (preserves operator's W295 anti-bias mandate — multi-angle ≥6 source families ÷ ≥4 cap = ~1.5 families/stream):
- W288 4-stream sweep (A methodology + B discovery + C rubric v3 + D ingest pipeline): 4/4 verdict-completion
- W289 4-stream gap-closure (A claude-flow + B wshobson + C runbook + D governance): 4/4 deliverables
- W290 4-fork audit (F1 quality + F2 security + F3 SOTA-discovery + F4 convergence-method): 4/4 on-disk
- 1-2 streams under-utilize parallelism; 5-6 exceeds W269 cap-4 (cognitive + token + coordination cost); 7+ requires batched 4-waves (W291.Stage2 pattern)

**Preset vs fan-out choice**:
- `/team-spawn <preset>` when streams have **distinct typed roles** (sec/perf/arch; FE/BE/tests) — preset hard-wires role-specific subagent_type
- `TeamCreate + Agent fan-out` when streams are **symmetric** (4 research questions, 8 candidate audits) — saves preset overhead, allows tailored prompts per stream
- `superpowers:dispatching-parallel-agents` (cap=4 fork pattern) when streams are **stateless one-shots** with no inter-stream coordination
- Reject any choice that violates W269 (≥2-stream → MUST use multi-agent; carve-out only for trivial-explicit-solo)

**Stream-count rule of thumb**: research/audit/discovery default = 4. Adjust DOWN to 2-3 only when the goal has fewer independent questions. Adjust UP to 5-6 only when each stream has bounded file-ownership + zero cross-stream dependency (rare). For ≥7 candidates: batch 4 at a time, persist intermediate verdicts, then next batch.

#### 6.1.b Orchestrator-Worker MANDATES with empty-final-message detection (Δ-G49, W321→W328 absorb)

When the team-shape resolves to **Orchestrator-Worker** (4-stream research/audit/discovery fan-out), the `/goal` predicate MUST encode the following MANDATES so the receiving session does not silently lose worker outputs:

```
MANDATES (Δ-G49 Orchestrator-Worker contract):
- Each worker MUST return a non-empty final assistant message OR an explicit "NO-FINDINGS" sentinel.
- Orchestrator MUST raise OrchestrationError on empty final message — silent-drop is fail-CLOSED.
- Re-dispatch failed workers up to 2× with a stricter output-format reminder ("you MUST end with a non-empty summary or the literal token NO-FINDINGS") before escalating to operator.
- Worker outputs MUST be aggregated into a single ranked verdict by the orchestrator BEFORE composing the /goal — partial aggregation is fail-CLOSED.
```

**Why**: Anthropic claude-cookbooks `orchestrator_workers.ipynb @ 2eed173a` documents the empty-final-message failure mode (worker returns assistant turn with only tool_use blocks, no text). LangGraph StateGraph supervisor tutorial codifies the re-dispatch retry semantics. OpenAI Cookbook `Orchestrating_agents.ipynb` independently confirms the "explicit sentinel beats silent empty" pattern.

**3-org-distinct cite-anchors (Δ-G49)**:
- `https://github.com/anthropics/claude-cookbooks/blob/2eed173a/patterns/agents/orchestrator_workers.ipynb` — Anthropic PBC orchestrator-worker reference (cell-3 final-message extraction loop)
- `https://langchain-ai.github.io/langgraph/tutorials/multi_agent/agent_supervisor/` — LangChain AI LangGraph StateGraph supervisor with retry semantics
- `https://github.com/openai/openai-cookbook/blob/main/examples/orchestrating_agents.ipynb` — OpenAI Cookbook independent confirmation

#### 6.2 Cross-model convergence checkpoint (W295 — W295-codex-r12 corrected)

Before composing the `/goal` (§7), fire a codex GPT-5.5 adversarial review on the **proposed priority ranking** (not the full predicate). The `review` subcommand does NOT read piped stdin (per W295-codex-r12), AND `adversarial-review --scope working-tree` collects via `git ls-files --others --exclude-standard` which EXCLUDES gitignored paths like `tmp/` (per W295-codex-r17). The correct path is `task --effort high` mode with the ranking EMBEDDED in the prompt — bypassing working-tree collection entirely.

**PowerShell variant (W295-codex-r17 — REQUIRED for this Windows/PowerShell-first runtime; supersedes the r15 working-tree pattern which had the gitignore false-control)**:

```powershell
# 1. Build the ranking content as a PowerShell single-quoted here-string (literal, no expansion):
$ranking = @'
# Proposed /goal priority ranking

<list each priority with 3-line rationale: discovered-via, harness-fit verdict, convergence-count>

## Source-of-truth assertions
- ≥6 source families consulted: <yes/no + list>
- ≥1 challenger candidate present: <yes/no + name>
- All cites EXTERNAL (not from this runtime): <yes/no>
- Inverse test PASS (verdict holds under different current architecture): <yes/no>
'@

# 2. Build the codex review prompt with the ranking embedded directly (NO working-tree path required):
$reviewPrompt = @"
You are performing a cross-model adversarial review of a proposed /goal priority ranking authored by Claude (the orchestrator). Apply the W295 anti-bias gates (Phase-5 protocol per sca-v5-Δ10) and return your verdict.

CRITERIA (all must hold):
- ≥6 EXTERNAL source families consulted (NOT including this runtime's prior W286-W295 docs)
- ≥1 challenger candidate present (a candidate whose adoption would CHALLENGE current architecture, not just confirm it)
- All cites are external + verifiable + dated
- Inverse test: the ranking would hold under a DIFFERENT current architecture
- Harness-fit: each candidate is Claude-Code-runtime-compatible OR explicitly flagged as PATTERN-STUDY-only
- No architecture-self-reference (criteria sourced from external SOTA convergence, not this runtime's current shape)

RANKING TO REVIEW:
$ranking

OUTPUT FORMAT (REQUIRED — the orchestrator parses this):
Start your response with one of these literal markers on a single line:
- VERDICT: APPROVE (criteria satisfied)
- VERDICT: REVISE (minor gaps; list specific revisions needed)
- VERDICT: BLOCK (critical bias or false-control; ranking must be re-done)

After the verdict line, provide a brief justification (≤300 words) citing which CRITERIA you applied.
"@

# 3. Resolve the codex companion path dynamically (handles two CLAUDE_PLUGIN_ROOT shapes — W295-codex-r23 HIGH closure):
#    - Inside plugin context: $env:CLAUDE_PLUGIN_ROOT IS the versioned plugin root → expect ${ROOT}/scripts/codex-companion.mjs directly
#    - Outside plugin context: fall back to the cache root → expect ${cacheRoot}/codex/<version>/scripts/codex-companion.mjs (pick latest version by Sort-Object Name -Descending)
$codexCompanion = $null
if ($env:CLAUDE_PLUGIN_ROOT) {
    $direct = Join-Path $env:CLAUDE_PLUGIN_ROOT 'scripts/codex-companion.mjs'
    if (Test-Path -LiteralPath $direct) { $codexCompanion = $direct }
}
if (-not $codexCompanion) {
    $cacheRoot = if ($env:CLAUDE_PLUGIN_ROOT) { $env:CLAUDE_PLUGIN_ROOT } else { 'Z:/claude-sota-installed/.claude/plugins/cache/openai-codex' }
    # Semantic-version sort (W295-codex-r24 MEDIUM closure): string-sort would pick 1.0.9 over 1.0.10. Parse as [version] when possible.
    $codexCompanion = Get-ChildItem -Path "$cacheRoot/codex" -Directory -ErrorAction SilentlyContinue |
        ForEach-Object {
            $v = $null
            if ([System.Version]::TryParse($_.Name, [ref]$v)) {
                [PSCustomObject]@{ Dir = $_; Version = $v }
            } else {
                # Fall back to filesystem mtime for non-parseable version dirs (e.g., HEAD-checkout snapshots):
                [PSCustomObject]@{ Dir = $_; Version = [System.Version]::new(0, 0, 0, [int][Math]::Min([Math]::Floor($_.LastWriteTimeUtc.Subtract([DateTime]'1970-01-01').TotalSeconds), 2147483647)) }
            }
        } |
        Sort-Object Version -Descending |
        Select-Object -First 1 |
        ForEach-Object { Join-Path $_.Dir.FullName 'scripts/codex-companion.mjs' }
}
if (-not $codexCompanion -or -not (Test-Path -LiteralPath $codexCompanion)) {
    throw "codex-companion.mjs not found via CLAUDE_PLUGIN_ROOT or cache/openai-codex/codex/*/scripts — install/update the codex plugin first"
}

# 4. Ensure the output directory exists (use $env:CLAUDE_CODE_TMPDIR when available; fall back to repo tmp/):
$outputDir = if ($env:CLAUDE_CODE_TMPDIR) { $env:CLAUDE_CODE_TMPDIR } else { 'tmp' }
$null = New-Item -ItemType Directory -Force -Path $outputDir
$outputFile = Join-Path $outputDir 'codex-review-output.txt'

# 5. Fire codex task mode with the ranking embedded directly in the prompt — bypasses working-tree collection (closes W295-codex-r17 false-control HIGH):
node $codexCompanion task --effort high $reviewPrompt 2>&1 | Tee-Object -FilePath $outputFile

# 6. Parse the verdict from the output — REQUIRE the marker on the FIRST non-empty line (W295-codex-r23 MEDIUM closure: unanchored regex would pick up a verdict-token inside prose like "Do not use VERDICT: APPROVE here; VERDICT: BLOCK..." causing a false APPROVE).
$firstNonEmpty = (Get-Content -LiteralPath $outputFile) | Where-Object { $_.Trim() -ne '' } | Select-Object -First 1
if ($firstNonEmpty -and ($firstNonEmpty -match '^\s*VERDICT:\s*(APPROVE|REVISE|BLOCK)\s*$')) {
    $verdict = $Matches[1]
    # Sanity-check: no conflicting markers later in output (W295-codex-r25 HIGH closure: must scan line-by-line, NOT -Raw single-string mode where ^ only anchors at file start).
    # Pipe per-line content into Select-String so each line is matched independently against the anchored pattern:
    $allMarkers = (Get-Content -LiteralPath $outputFile | Select-String -Pattern '^\s*VERDICT:\s*(APPROVE|REVISE|BLOCK)\s*$').Count
    if ($allMarkers -gt 1) { throw "Codex output has $allMarkers VERDICT markers — ambiguous; fail-CLOSED. Re-fire with stricter output-format reminder." }
    # Smoke-test pattern (operator can paste to verify the fix locally):
    #   $sample = "VERDICT: APPROVE`nfollowed by some text`nVERDICT: BLOCK"
    #   ($sample -split "`n" | Select-String -Pattern '^\s*VERDICT:\s*(APPROVE|REVISE|BLOCK)\s*$').Count  # MUST return 2 (would have returned 1 under the r24 -Raw bug)
} else {
    throw "First non-empty line of $outputFile is not 'VERDICT: <APPROVE|REVISE|BLOCK>' — gate FAILED CLOSED (do not proceed to §7 compose). Re-fire codex with a stricter output-format reminder, or escalate to operator."
}
# 7. Branch on $verdict — APPROVE proceeds to §7; REVISE or BLOCK halts:
switch ($verdict) {
    'APPROVE' { Write-Host "Cross-model gate APPROVE — proceed to §7" }
    'REVISE'  { Write-Host "Cross-model gate REVISE — adjust ranking per codex findings, re-run §6.2"; exit 1 }
    'BLOCK'   { Write-Host "Cross-model gate BLOCK — ranking has critical bias; re-do discovery (§1-§3)"; exit 2 }
    default   { throw "Unexpected verdict marker '$verdict' (expected APPROVE|REVISE|BLOCK)" }
}
```

**Bash variant (Git Bash at `C:\Program Files\Git\bin\bash.exe` — secondary)**:

```bash
RANKING=$(cat <<'EOF'
# Proposed /goal priority ranking
<list each priority with 3-line rationale>

## Source-of-truth assertions
- ≥6 source families consulted: <yes/no + list>
- ≥1 challenger candidate present: <yes/no + name>
- All cites EXTERNAL: <yes/no>
- Inverse test PASS: <yes/no>
EOF
)

REVIEW_PROMPT="You are performing a cross-model adversarial review of a proposed /goal priority ranking. CRITERIA: ≥6 EXTERNAL source families, ≥1 challenger candidate, all cites external+dated, inverse-test PASS, harness-fit, no architecture-self-reference.

RANKING:
$RANKING

OUTPUT: Start your response with one of: 'VERDICT: APPROVE' | 'VERDICT: REVISE' | 'VERDICT: BLOCK' on a single line, then ≤300 word justification."

# Resolve codex companion path — handles two CLAUDE_PLUGIN_ROOT shapes (W295-codex-r23 HIGH closure):
#   - In plugin context: $CLAUDE_PLUGIN_ROOT IS the versioned plugin root → ${ROOT}/scripts/codex-companion.mjs
#   - Outside plugin context: cache root → ${cacheRoot}/codex/<version>/scripts/codex-companion.mjs
CODEX_COMPANION=""
if [ -n "$CLAUDE_PLUGIN_ROOT" ] && [ -f "$CLAUDE_PLUGIN_ROOT/scripts/codex-companion.mjs" ]; then
    CODEX_COMPANION="$CLAUDE_PLUGIN_ROOT/scripts/codex-companion.mjs"
else
    CACHE_ROOT="${CLAUDE_PLUGIN_ROOT:-Z:/claude-sota-installed/.claude/plugins/cache/openai-codex}"
    CODEX_COMPANION=$(ls -d "$CACHE_ROOT"/codex/*/scripts/codex-companion.mjs 2>/dev/null | sort -V | tail -1)
fi
[ -z "$CODEX_COMPANION" ] || [ ! -f "$CODEX_COMPANION" ] && { echo "codex-companion.mjs not found via CLAUDE_PLUGIN_ROOT or cache fallback"; exit 1; }
OUTPUT_DIR="${CLAUDE_CODE_TMPDIR:-tmp}"
mkdir -p "$OUTPUT_DIR"
OUTPUT_FILE="$OUTPUT_DIR/codex-review-output.txt"

node "$CODEX_COMPANION" task --effort high "$REVIEW_PROMPT" | tee "$OUTPUT_FILE"

# Parse verdict — REQUIRE on the FIRST non-empty line (W295-codex-r23 MEDIUM closure: unanchored regex risks false-positive on prose containing VERDICT marker):
FIRST_LINE=$(awk 'NF { print; exit }' "$OUTPUT_FILE")
VERDICT=$(echo "$FIRST_LINE" | grep -oE '^[[:space:]]*VERDICT:[[:space:]]*(APPROVE|REVISE|BLOCK)[[:space:]]*$' | grep -oE 'APPROVE|REVISE|BLOCK')
[ -z "$VERDICT" ] && { echo "First non-empty line is not 'VERDICT: <APPROVE|REVISE|BLOCK>' — gate FAILED CLOSED"; exit 1; }
# Sanity: no multiple verdict markers (ambiguous = fail-CLOSED):
MARKER_COUNT=$(grep -cE '^[[:space:]]*VERDICT:[[:space:]]*(APPROVE|REVISE|BLOCK)[[:space:]]*$' "$OUTPUT_FILE")
[ "$MARKER_COUNT" -gt 1 ] && { echo "Codex output has $MARKER_COUNT VERDICT markers — ambiguous; fail-CLOSED"; exit 1; }
echo "verdict=$VERDICT"
```

Codex returns APPROVE / REVISE / BLOCK with cross-model second-opinion in its native structured-output schema (see `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/schemas/review-output.schema.json`). If BLOCK at conf ≥ 0.85 OR REVISE: revise priority ranking before composing. If APPROVE: proceed to §7.

This converts the synthesis from solo-Claude to **cross-model convergence-consensus** per operator mandate. Both Claude (orchestrator) AND GPT-5.5 (reviewer) must agree on the ranking before any `/goal` ships.

**Pace mandate (W290-CODEX-UNLEASH)**: fire codex 5-10 reviews/session; parallel-batch on ≥2 artifacts when fixes are independent. The codex review is the cross-model gate — single-model verdicts are vulnerable to Claude-specific blindspots (e.g., over-trust of training-data heritage; under-weighting of novel patterns).

**Anti-false-control discipline (W295-codex-r12 + r17 + r19 cumulative — UNAMBIGUOUS RULE)**: ALWAYS use `codex-companion.mjs task --effort high` with the ranking content EMBEDDED in the prompt (per §6.2 PowerShell/Bash variants above). The cross-model ranking gate MUST NOT route the ranking through `adversarial-review --scope working-tree` — that path was r17-disqualified because gitignored paths (like `tmp/`) are excluded from working-tree collection (`git ls-files --others --exclude-standard`), recreating the original r12 false-control. The `task` mode bypasses working-tree collection entirely + the embedded-prompt pattern guarantees the ranking content reaches codex unambiguously. Parsed-verdict pattern (§6.2 step 4-5) is the only sanctioned gate-result handoff.

### 7. Compose + Persist — paste-ready predicate + OPTIONAL basic-memory T6 emit (W295-codex-r13 corrected)

The `/goal` predicate composition is the load-bearing deliverable — ALWAYS returned to the operator. Persistence to basic-memory T6 is **OPT-IN per request** (W295-codex-r13 HIGH closure — auto-persistence of the full predicate creates a privacy/trust-boundary regression because /goal contents can include secrets, proprietary plans, repo paths, or incident context).

**Default behavior (no persist)**: compose + return the predicate. No memory write. No T6 footprint.

**Opt-in persist** (operator explicitly requests via "persist this /goal", "save to mem-recall", "T6 it", or sets a `persist_to_t6: true` flag in the request):

1. **Pre-write secret-redaction gate** (HARD-REQUIRED before any T6 write):
   - Scan the predicate body for patterns matching: API keys (`sk-`, `pk-`, `ghp_`, `gho_`, `xoxb-`, `AIza`, `AKIA`, base64-blob >40-chars), tokens (`Bearer ...`, `Authorization: ...`), passwords (`password=`, `secret=`), private IPs (`10.x.x.x`, `192.168.x.x`, `172.16-31.x.x`), user-home paths (`C:\Users\<name>`, `/home/<name>`, `~/.ssh/`), incident IDs (`INC-...`, `SEV-...`), org-internal repo URLs.
   - If ANY match: show redacted predicate to operator + ask explicit confirmation before writing. Operator can redact OR cancel persist.
   - Use `mcp__basic-memory__write_note` only AFTER operator confirms.

2. **Persistence destination contract** (shown to operator before write):
   - **Path**: `goal-prompts/W<wave>-<slug>.md` (NOT `verdicts/` — `verdicts/` is reserved for sca-v3.1 adoption decisions per Stage-6 contract).
   - **Body**: redacted predicate + `## Provenance` block (wave, model, source families ≥6 from Phase 1, convergence count ≥3 from Phase 3, ceiling honored, codex-gate verdict from §6.2).
   - **Tags**: `["goal-synth", "W<wave>", "operator-confirmed-persist", <one tag per P0..Pn>]`.
   - **Note-type**: `note_type="goal-synth"` (distinct from adoption-decision verdicts).

3. **Documented delete/rollback path** (always communicated to operator at write-time; verified against actual `mcp__basic-memory__delete_note` + `search_notes` schemas via ToolSearch — W295-codex-r14 HIGH closure):
   - **Single-note delete** (by permalink): `mcp__basic-memory__delete_note(identifier="goal-prompts/W<wave>-<slug>")` — `identifier` accepts title, permalink, or path; defaults to single-file delete (`is_directory=false`).
   - **Bulk list by wave + tag** (for selective delete-loop): `mcp__basic-memory__search_notes(query="W<wave>", tags=["goal-synth", "operator-confirmed-persist"], note_types=["goal-synth"])` — schema does NOT support a `folder` param; use `tags`+`note_types`+`query` to scope. The returned list provides permalinks to feed back into `delete_note`.
   - **Hard purge of all persisted /goals**: `mcp__basic-memory__delete_note(identifier="goal-prompts", is_directory=true)` — deletes the entire `goal-prompts/` directory; requires explicit operator confirmation before invocation given irreversibility.

**Anti-regression rule (W295-codex-r13)**: NEVER write a /goal predicate to T6 without operator opt-in. NEVER skip the secret-redaction gate. If implementation tooling can't enforce these (e.g., the persisting agent is autonomous), the skill MUST default to NO persist. The codex round-13 finding "automatic /goal persistence can leak sensitive operator intent" is the canonical reason — this rule supersedes any prior W295-skill-upgrade autopersist behavior.

## Anti-patterns

- **Single-source discovery** — false negatives + popularity bias. Always ≥6 families (W295 upgrade).
- **Stars-as-hardgate** — low-star high-quality candidates exist; star count is D12 sub-signal only (caps at 3 when only stars).
- **Quality without harness-fit** — a pattern that assumes an interactive operator breaks an autonomous runtime.
- **Manufactured convergence** — one claim echoed across forks of one repo is not three independent sources.
- **Over-ceiling predicate** — the paste tooling rejects long inputs; cut ruthlessly.
- **Doing the work instead of authoring the prompt** — this skill produces a `/goal`; the audit/cleanup runs in the receiving session.
- **Citing dead files** — a `/goal` (or skill) that references deleted paths is worse than useless. Verify against the live tree.
- **Architecture-self-reference (W295)** — sourcing adoption criteria from THIS runtime's current architecture instead of external SOTA convergence. Apply the inverse test at §5.
- **Solo-Claude synthesis (W295)** — bypassing the §6 codex GPT-5.5 cross-model convergence checkpoint produces single-model verdicts vulnerable to Claude-specific blindspots.
- **Confirmatory-only candidate set (W295)** — if 100% of surfaced candidates support current architecture, discovery is biased; surface a challenger or escalate HONEST-NON-FINDING.

## References

- Official Claude Code docs — `/skills`, `/sub-agents`, `/hooks`, `/settings`, `/output-styles` at `code.claude.com/docs`
- `superpowers` — `brainstorming` (scope the request), `writing-plans` (structure), `writing-skills` (skill format), `requesting-code-review` (review gate)
- `agent-teams` / `agent-orchestration` plugins — the multi-agent execution a `/goal` mandates
- `codex` plugin — cross-model (GPT-5.x) review for the convergence / adversary pass
- CCBP Research → Plan → Implement workflow — phases 1-3 are Research, 4 is Plan; the `/goal` recipient does Implement

### W321→W328 absorb anchors (Δ-G47-Δ-G51)

- Δ-G47 Triadic decomposition: `https://github.com/assafelovic/gpt-researcher` + `https://www.anthropic.com/research/built-a-multi-agent-research-system` + `https://github.com/microsoft/autogen`
- Δ-G48 DSPy goal-decomposition: `https://github.com/stanfordnlp/dspy` + `https://www.databricks.com/blog/how-databricks-builds-compound-ai-systems-dspy` + `https://arxiv.org/abs/2507.19457`
- Δ-G49 Orchestrator-Worker MANDATES: `https://github.com/anthropics/claude-cookbooks/blob/2eed173a/patterns/agents/orchestrator_workers.ipynb` + `https://langchain-ai.github.io/langgraph/tutorials/multi_agent/agent_supervisor/` + `https://github.com/openai/openai-cookbook/blob/main/examples/orchestrating_agents.ipynb`
- Δ-G50 Pareto-frontier MCDA: `https://github.com/Valdecy/pyDecision` + `https://arxiv.org/abs/2507.19457` + `https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Measure/2_3`
- Δ-G51 INDEPENDENCE-PROOF triple: `https://plato.stanford.edu/entries/popper/` + `https://github.com/microsoft/promptflow` + `https://www.bestpractices.dev/en`
- Forward-AI W329+: 4-role ROMA + GEPA+ split — `https://arxiv.org/abs/2602.01848v1` + `https://github.com/sentient-agi/gepa-plus`
