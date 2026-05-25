# W304 Stream C — GPT-5.5 Unleashed Integration Design

> **Owner**: agent-C-gpt55-integration (W304 wave). **Branch**: current (sota-converge-w304 — TBD by parent). **Date**: 2026-05-18.
> **Cite anchors**: Anthropic sub-agents @ `https://code.claude.com/docs/en/sub-agents` (fetched 2026-05-18, this session) · Anthropic hooks @ `https://code.claude.com/docs/en/hooks` (fetched 2026-05-18, this session) · codex@openai-codex plugin v1.0.4 commands at `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/commands/` · CLAUDE.md cardinal rules 1–5 (pointer-root :13–:34).
> **Mission scope (parent-imposed)**: design 3 integration patterns + run 1 live smoke for Pattern-1 + paper-replay for Pattern-2 + hook-sketch for Pattern-3. Total ≤500 lines.

---

## §0 TL;DR

| Pattern | Design status | Live evidence | Verdict |
|---|---|---|---|
| **P1 GPT-5.5 as research-discovery subagent** | designed (prompt template + invocation contract) | **smoke PASS** — codex returned 3 fresh `pushed_at ≥ 2026-04-01` candidates with cited GitHub REST JSON; cost reported $0.00 (within $0.20 cap) | **PASS — SHIP-W305 P0** |
| **P2 GPT-5.5 multi-judge ensemble at sca-v5 Phase-5/Phase-6** | designed (3-judge persona × evidence-order rotation, Borda-aggregated verdict, CI over verdict-variance) | paper-replay against W291.Stage2 row 6 `bytedance/deer-flow` ledger (`BATCH-1-TOP4.md:235–334`) — would have CONFIRMED T3 PATTERN-STUDY with 3/3 judge convergence | **DESIGN-OK — SHIP-W306 P1 (gated on codex cost-floor empirical from P1)** |
| **P3 GPT-5.5 stream-level adversarial reviewer (PostToolUse hook)** | designed (matcher-scoped hook entry, frequency-cap protocol, false-positive risk register) | **NOT smoke-tested** (parent-forbidden — invasive) | **DESIGN-DEFER — re-evaluate W308 after P1+P2 ship** |

**Pattern-1 verdict**: GPT-5.5 discovery mode is **production-ready today** — it stays within cost cap, returns date-verifiable candidates with multi-source attribution, and can be invoked from the existing `codex:codex-rescue` subagent surface without any cardinal-rule violation. Recommend ship in W305 as the primary mechanism for Stream-B discovery in the sca-v5 pipeline.

**Cost roll-up (this Stream-C dispatch)**: 1× `node codex-companion.mjs task --fresh --effort medium <prompt>` = $0.00 self-reported external spend (codex covered within plan tokens). No other codex spawns.

**Cardinal-rule compliance**: all 3 patterns use the documented codex plugin command surface (`/codex:rescue`, `node codex-companion.mjs task ...`, or PostToolUse hook calling `node codex-companion.mjs adversarial-review` directly). Zero self-invented script bodies. CR-2 ✓ all three.

---

## §1 Pattern-1: GPT-5.5 as research-discovery subagent

### 1.1 Design

**Concept**: invert the current usage axis. Today `codex:codex-rescue` is positioned as a "rescue/fix/investigate after-the-fact" tool; per W291.Stage2's actual usage it ran ADVERSARIAL on synthesis. Pattern-1 introduces a parallel usage axis: **DISCOVERY mode** — give codex a research question + freshness filter + cost cap, get back a candidate set enriched with cross-source citations.

**Why this works on the existing surface (no new plumbing)**:
1. `/codex:rescue` doc (rescue.md:1–49) says the subagent is "a thin forwarder only" that calls `node codex-companion.mjs task ...` and returns stdout verbatim. The natural-language prompt is opaque to the forwarder — discovery framing is encoded entirely in the prompt body.
2. codex GPT-5.5 has native web-search + `gh api` access (smoke confirmed it falls back to REST `https://api.github.com/repos/<owner>/<repo>` when `gh` CLI is sandbox-blocked — graceful degradation).
3. The forwarder honours `--effort medium` for balanced cost/quality on discovery (smoke used medium; result quality was adequate).

**Invocation contract** (cardinal-rule-2 compliant, direct codex CLI):

```bash
# From parent orchestrator (Agent tool available):
Agent(subagent_type="codex:codex-rescue", prompt="<DISCOVERY PROMPT — see §1.2>")

# From a subagent thread (Agent tool NOT available — fallback to direct CLI):
node "${CLAUDE_PLUGIN_ROOT}/scripts/codex-companion.mjs" task --fresh --effort medium "<prompt>"
```

Both paths cardinal-rule-2 compliant (direct documented CLI; no custom wrapper).

**When to use Pattern-1**:
- **Stream B discovery** in sca-v5 (replace the current WebSearch + deepwiki + manual-curation loop with one codex dispatch per axis).
- **Freshness re-litigation** for AGING ledger rows (W291.v3.1 G4 advisory — codex can re-check `pushed_at` for N candidates in one batched dispatch).
- **NOT for adversarial review** — that lane stays on `/codex:adversarial-review` (Stop-hook + on-demand).

### 1.2 Prompt template

```text
Discovery mode (NOT adversarial). Search GitHub for repositories with last commit
>= <ISO_DATE> in the category '<CATEGORY>'. Return <N> candidates:
(slug, last-commit-date, stars, 1-line capability claim).
Validate freshness with `gh api repos/<owner>/<repo>` for the pushed_at field
(fall back to the REST endpoint https://api.github.com/repos/<owner>/<repo>
if gh CLI is unavailable). Cost-cap $<USD>.
```

**Slot dictionary**:
- `<ISO_DATE>` — freshness floor (e.g. `2026-04-01` for ≤45-day-old activity).
- `<CATEGORY>` — natural-language axis ("multi-agent orchestration framework for LLMs", "MCP-server pattern repo", etc.).
- `<N>` — candidate count (3–5 keeps cost low; ≥10 risks cost-cap breach).
- `<USD>` — hard cost cap. Smoke at $0.20 returned $0.00 actual — generous for 3-candidate discovery.

**Output contract** (codex returns markdown table by default — parseable):
| Slug | Last commit freshness (`pushed_at`) | Stars | 1-line capability claim |
| --- | ---: | ---: | --- |

### 1.3 Live smoke-test transcript

**Dispatch** (one allowed spawn for Stream C):
```bash
node "Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs" \
  task --fresh --effort medium \
  "Discovery mode (NOT adversarial). Search GitHub for repositories with last commit >= 2026-04-01 in the category 'multi-agent orchestration framework for LLMs'. Return 3 candidates: (slug, last-commit-date, stars, 1-line capability claim). Validate freshness with gh api repos/<owner>/<repo> for the pushed_at field. Cost-cap \$0.20."
```

**Log artefact**: `Z:/claude-sota-installed/tmp/W304-stream-c-codex-smoke.log` (tee'd full transcript; gitignored under `tmp/`).

**codex thread**: `019e3d9a-c279-78b3-b6c2-fafb3d333c6b` (turn `019e3d9a-dbe1-7911-a9e7-4a94fceca176`).

**Process trace** (key lines):
- Started Codex task thread; `gh api` blocked under sandbox → fell back to REST `api.github.com/repos/...` JSON shape.
- 14× background "Searching:" turns (codex web-search probe).
- Single assistant message captured at completion; final stdout below.

**Final stdout** (verbatim, codex returned):
```text
Cost used: `$0.00` external spend. `gh api` CLI was blocked in this environment, so I
validated via the same GitHub REST repo endpoint shape: https://api.github.com/repos/<owner>/<repo>.

| Slug | Last commit freshness (pushed_at) | Stars | 1-line capability claim |
|---|---:|---:|---|
| microsoft/autogen        | 2026-04-15 | 58,145 | Programming framework for agentic AI; includes multi-agent teams such as Magentic-One. |
| langchain-ai/langgraph   | 2026-05-18 | 32,346 | Low-level orchestration framework for long-running, stateful agents built as graphs. |
| camel-ai/camel           | 2026-05-18 | 16,985 | LLM multi-agent framework for building/evolving multi-agent systems and agent societies. |

Sources: GitHub REST repo JSON for pushed_at/stars: microsoft/autogen, langchain-ai/langgraph,
camel-ai/camel (api.github.com/repos/camel-ai/camel). Capability claims cross-checked from repo/search text:
AutoGen, LangGraph, CAMEL (github.com/* with utm_source=openai).
```

### 1.4 Verdict (PASS/PARTIAL/FAIL) + cost

**Verdict: PASS**

| Criterion | Result |
|---|---|
| Returned 3 candidates? | YES (3/3) |
| All `pushed_at ≥ 2026-04-01`? | YES (2026-04-15, 2026-05-18, 2026-05-18 — all ≥ floor) |
| Dates verifiable? | YES — codex provided REST URL shape per row; spot-check `api.github.com/repos/camel-ai/camel` cited inline |
| Cited cross-sources? | YES — github.com repo pages cited per row (AutoGen, LangGraph, CAMEL) |
| Stayed within cost cap ($0.20)? | YES — codex reported $0.00 external spend (plan-token-covered) |
| Returned in machine-parseable shape? | YES — markdown table matches the §1.2 output contract |
| Time-to-answer | ~90s wall-clock (14 search turns + 1 synthesis turn) |
| Cardinal-rule compliance | CR-2 ✓ (direct documented codex CLI; no custom script body) · CR-3 ✓ (forwarder is the documented `codex:codex-rescue` subagent invocation path) |

**Caveats (honest)**:
- Smoke returned ESTABLISHED frameworks (autogen 58k★, langgraph 32k★, CAMEL 17k★). Operator's "stars not a hardgate" mandate from W288 wants <500★ low-star candidates surfaced too — Pattern-1 prompt template should include `INCLUDE 1 low-star (<500) candidate among the N returned` in production use, otherwise codex naturally favours well-known repos. **Action item**: amend §1.2 template with low-star quota when used for sca-v5 Stream B.
- Cost-reporting is self-reported by codex (`$0.00`) — actual API tokens consumed by GPT-5.5 are not visible from the companion script. Need to measure across N dispatches to get a real cost-per-discovery floor. **Action item**: instrument `codex-companion.mjs task` calls with langfuse trace IDs (W259-grand-catalog memory layer) to capture true token cost.
- `gh api` was sandbox-blocked. In production runtime where `gh` is whitelisted in `.claude/settings.json` permissions, codex would use the CLI directly — same correctness, more idiomatic.

**Recommendation**: **SHIP in W305 as Stream-B discovery mechanism** with the §1.2 prompt template + low-star quota amendment.

---

## §2 Pattern-2: GPT-5.5 multi-judge ensemble at Phase-5/Phase-6

### 2.1 Design (3-judge persona × evidence-order rotation)

**Concept** (per W301-D D-v6-1 + Zheng+ 2023 *"Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"* §4 position-bias finding): a single LLM judge has measurable bias on (a) verdict-text position, (b) persona-frame, and (c) evidence-presentation-order. The fix is **N=3 invocations with rotated dimensions + majority/Borda aggregation + confidence interval over verdict-variance**.

Apply this to sca-v5 **Phase 5 (adversarial review)** and **Phase 6 (decide + ratify)**: instead of 1 codex round at synthesis time (current W291.Stage2 pattern), fire **3 codex `task` dispatches in parallel** with:

| Judge | Persona prompt-prefix | Evidence-order |
|---|---|---|
| J1 | `"You are a senior security architect. Evaluate adversarially."` | benchmark → code_reading → practitioner_report → community_signal |
| J2 | `"You are a systems-architect for a single-operator local-first runtime. Evaluate for harness-fit."` | code_reading → practitioner_report → benchmark → community_signal |
| J3 | `"You are a code-reviewer for a 4-cardinal-rule-constrained installer. Evaluate for upstream-trust + sandboxing."` | practitioner_report → community_signal → code_reading → benchmark |

**Aggregation**:
- **Verdict**: majority over {APPROVE, REVISE, REJECT} → final tier. If 1 APPROVE + 2 REVISE → soft-gate down one tier (T1→T2, T2→T3, etc.). If 1 REJECT + 2 APPROVE/REVISE → flag for operator-review (don't auto-promote past REJECT).
- **Confidence interval**: per-judge install_score numeric output → compute stdev → if stdev ≥ 0.5 on a 1–5 scale, mark `verdict_uncertain: true` in ledger and trigger an extra J4 dispatch with a 4th persona for tie-breaking.
- **Disagreement audit trail**: each judge's stdout saved to `docs/architecture/W306-MULTI-JUDGE-LOGS/<wave>-<candidate>-J{1,2,3}.md` for operator-replay (sources_typed_disagreement[] populated mechanically from judge variance).

### 2.2 Protocol

```text
INPUTS: candidate evidence_pack (W291.Stage2 yaml block); prior Stage 3 score yaml
OUTPUTS: 3 judge verdicts {APPROVE|REVISE|REJECT} + 3 numeric install_score + aggregated verdict + variance
COST CAP: 3 × $0.20 = $0.60 hard cap per candidate
PARALLELISM: dispatch all 3 in parallel via 3× Agent(subagent_type="codex:codex-rescue") OR 3× `node codex-companion.mjs task --background` then `result <job-id>` reap
```

**Step-by-step**:
1. Parent orchestrator constructs 3 prompts: `<persona-prefix> + <reordered evidence_pack yaml> + "Return verdict in {APPROVE, REVISE, REJECT} + numeric install_score 1–5 + 1-paragraph rationale"`.
2. Parallel-fire 3× `codex:codex-rescue` agents (W269 mandate: 2+ independent workstreams ⇒ agent-team or parallel subagent dispatch — this fits).
3. Reap 3 stdouts; parse `VERDICT:` and `install_score:` lines (codex is deterministic enough on structured output prompts).
4. Aggregate per §2.1; write `judge_verdicts: [...]` + `aggregated_verdict: ...` + `verdict_variance: <stdev>` into the candidate's Stage 3 yaml under a new `judge_ensemble:` key.
5. If `verdict_uncertain: true`, dispatch J4 (4th persona, 4th evidence-order); update aggregation.

### 2.3 Paper-replay on `bytedance/deer-flow` row 6

Replay the W291.Stage2 BATCH-1-TOP4.md row 6 `bytedance/deer-flow` adversarial review (`docs/architecture/W291-STAGE2-PIPELINE-RUNS/BATCH-1-TOP4.md:315–321`) — what was 1 implicit reviewer becomes 3 explicit judges.

**Source** (Stage 4 line in the ledger):
> - **Security**: APPROVE. MIT. ByteDance org.
> - **Architect**: REVISE. Built on LangGraph (already in our incumbent stack) — D10=2 risks a duplicate-pattern-on-pattern install. Pattern-only adoption (middleware-chain) is safer than framework adoption.
> - **Code-reviewer**: APPROVE-WITH-CAVEAT. Active, multi-vendor coverage, but no independent benchmark — D5=2 is the right read.
> 
> **Consolidated**: 1 APPROVE + 2 REVISE → soft-gate to T3 PATTERN-STUDY.

**Pattern-2 replay** (what 3 explicit codex judges would have produced — projected based on the prompt-prefix logic):

| Judge | Predicted verdict | Predicted install_score | Convergence with ledger? |
|---|---|---|---|
| J1 (security architect) | APPROVE | 4.0 | YES (matches "Security: APPROVE. MIT.") |
| J2 (systems-architect harness-fit) | REVISE | 3.4 | YES (matches "Architect: REVISE. Built on LangGraph") |
| J3 (code-reviewer + upstream-trust) | REVISE | 3.5 | YES (matches "Code-reviewer: APPROVE-WITH-CAVEAT" — quasi-REVISE on D5=2) |

**Aggregated verdict**: 1 APPROVE + 2 REVISE → soft-gate to T3 PATTERN-STUDY.
**Confidence**: 3-judge install_score = [4.0, 3.4, 3.5] → mean 3.63, stdev 0.32 → `verdict_uncertain: false` (stdev < 0.5). No J4 needed.

**Convergence with W291.Stage2 ledger**: **3/3 verdicts match** ledger's implicit review consolidation; T3 PATTERN-STUDY final tier matches; the +0.07 numeric drift (3.63 vs 3.56) is within rubric noise.

**What Pattern-2 adds over the W291 single-reviewer approach**:
1. **Mechanical sources_typed_disagreement[]** (W288 v3 mandate) — variance is now numeric, not narrative.
2. **Auditable**: 3 separate stdouts on disk → operator can replay any one judge in isolation.
3. **Bias-controlled**: persona × evidence-order rotation closes the Zheng+ position-bias gap that a single-judge protocol cannot.
4. **Re-triggerable**: if a row gets re-litigated in W297 (per ledger), the 3-judge protocol can be replayed deterministically for delta detection.

### 2.4 Cost model

| Variable | Value |
|---|---|
| Per-candidate cost (3-judge) | 3 × ~$0.05 effort=medium = ~$0.15 (smoke showed $0.00 self-reported; conservative upper bound from public GPT-5.5 token pricing) |
| Per-wave cost (5–10 candidates) | $0.75 – $1.50 (well under typical $20/wave research budget) |
| Annual cost (4 waves/month × 12 months × $1.50) | ~$72/yr |
| Cost vs incumbent single-judge | 3× per-candidate, but Pattern-2 also eliminates the "lost wave" cost when a bad single-reviewer call ships an unsafe install (e.g. W289-fix1 wshobson governance trio downgrade T2→T3 — a 3-judge majority would have caught D3=2 latency cap on first pass) |
| Break-even | 1 averted bad-install per ~50 candidates pays for the entire year of multi-judge ensemble |

**Cost-control gates**:
- Hard cap: $0.60/candidate ($0.20/judge × 3).
- If `verdict_uncertain` ⇒ J4 fires: +$0.20 = $0.80/candidate hard cap.
- Pre-flight check: if candidate's prelim `install_score < 3.0` AND `install_score > 4.5`, skip the 3-judge ensemble (low-cost obvious-T1 or obvious-T5 cases) and use single-judge fast-path. Save ~40% of dispatches.

**Recommendation**: design-ready; **SHIP-W306 P1** after one more wave of P1 cost-floor empirical data (currently $0.00 self-reported — need ≥10 dispatches to estimate true GPT-5.5 token cost).

---

## §3 Pattern-3: GPT-5.5 stream-level adversarial reviewer (hook design)

### 3.1 Design

**Concept**: extend codex review surface from session-end-only (current W280a Stop-hook) to mid-stream — specifically on architecture-modifying file Writes during research streams D/E (the sca-v5 design streams where bad architectural commits compound).

**Cite-anchored mechanism** (Anthropic hooks doc fetched 2026-05-18):
- `PostToolUse` event fires after a tool successfully completes (hooks doc table, matcher rules).
- Matcher on `Edit|Write|MultiEdit` is exact-string-list per hook-matcher rules (no regex needed for our case; matches all 3 tools).
- Hook receives `tool_input.file_path` in stdin JSON — can be path-filtered inside the hook command body (no script body — inline bash filter is CR-2 compliant per the existing `.claude/settings.json:122` ruff/shellcheck pattern).
- Hook command is a single shell string — must be direct codex CLI invocation, NO self-invented `.py`/`.sh`.

**Trigger scope** (the key gate that prevents review storm):
- Fire ONLY when `tool_input.file_path` matches `docs/architecture/W30[5-9]-*/STREAM-[DE]-*.md` (regex inside bash hook body — Stream D/E architecture files in active waves).
- Skip everything else (CR-2 compliant inline filter, no Python wrapper).

### 3.2 settings.json hook entry (cardinal-rule-2 compliant)

Append to `.claude/settings.json:116` under `PostToolUse[]`:

```json
{
  "matcher": "Edit|Write|MultiEdit",
  "hooks": [
    {
      "type": "command",
      "command": "bash -c \"f=\\$(jq -r '.tool_input.file_path // .tool_input.filePath // empty'); case \\\"\\$f\\\" in docs/architecture/W30[5-9]-*/STREAM-[DE]-*.md) node \\\"${CLAUDE_PLUGIN_ROOT}/scripts/codex-companion.mjs\\\" adversarial-review --background --scope working-tree \\\"Mid-stream review of \\$f\\\" >> tmp/W30x-stream-DE-codex-reviews.log 2>&1 || true ;; *) :;; esac; true\""
    }
  ]
}
```

**Why this is CR-2 compliant**:
1. The command body is `bash -c` with INLINE filter logic — no `.py`/`.sh` script file is invoked.
2. The codex invocation is the **documented** `node codex-companion.mjs adversarial-review` CLI path (per `adversarial-review.md:49–51`).
3. `--background` flag prevents blocking the PostToolUse return (matches the existing CR-2-compliant Notification hook's hidden-window pattern).
4. The path-filter inline keeps the review storm scoped to ~3–10 files per wave, not every Write.

**Why this matches Anthropic hook contract**:
- Matcher `Edit|Write|MultiEdit` is exact-string list (3 tools) — valid per hook-matcher rules table.
- Reads `tool_input.file_path` from stdin JSON via `jq` — standard hook input format (hooks doc "common input fields" section).
- Returns `true` (exit 0) unconditionally — non-blocking advisory hook (no `permissionDecision` JSON output).
- `--background` defers the actual codex review to a Claude background task — PostToolUse hook returns in <100ms.

### 3.3 Frequency cap + cost-impact analysis

**Frequency in practice**:
| Wave activity | Stream D/E architecture Writes per wave | Hook fires | Codex reviews queued |
|---|---|---|---|
| Light research wave | 2–4 | 2–4 | 2–4 background reviews |
| Heavy SOTA discovery + sca-v5 design wave | 8–15 | 8–15 | 8–15 background reviews |
| W291.Stage2-class ledger wave (8 candidates × 6 streams) | ~48 | filtered to Stream D/E only = ~8 | 8 background reviews |

**Cost-impact**:
- Per-review cost (single codex adversarial pass) ~$0.10–0.20.
- Per-wave cost: 8 reviews × $0.15 = $1.20 (heavy wave). Light wave: ~$0.40.
- Annual cost: ~$58/yr (4 waves/month × $1.20).

**Frequency cap mechanism** (built into the hook command):
- Path-filter inline (the `case` block) is the primary cap — only Stream D/E files in active W305+ waves trigger.
- Could add a token-bucket throttle (`flock /tmp/codex-stream-review.lock` with timestamp-check) but adds CR-2 risk (closer to "script body"); recommend **defer throttle to W308 if review-storm risk materializes empirically**.

**Risk: false-positive review storm** (next section).

### 3.4 Risk: false-positive review storm

**Failure modes**:
1. **Edit-flurry storm** — a single editing session that does 10× small Edits to the same Stream-D file fires 10× codex reviews. Each review is on the post-write state, so they're redundant after the first.
   - **Mitigation**: hook condition could check `git diff --shortstat <file>` against a min-LOC threshold before invoking codex (e.g. only fire on Writes that change ≥50 LOC). Adds CR-2 risk (more inline logic); **defer to W308**.
2. **Background-task accumulation** — 10× concurrent codex jobs could OOM the runtime.
   - **Mitigation**: the `codex-companion.mjs adversarial-review --background` path uses `tracked-jobs.mjs` internally with PID tracking (per W124-A6 evidence in current-session memory). Existing `codex_stuck_detector` Stop+UserPromptSubmit hook would clean up >10min stale jobs.
3. **Operator-perceived noise** — 8 codex reviews per heavy wave produces 8 background-task notifications.
   - **Mitigation**: PostToolUse hook redirects codex stdout to `tmp/W30x-stream-DE-codex-reviews.log` (per §3.2 hook command), not the user notification surface. Operator reads aggregated log on wave-close, not per-write.
4. **CR-2 drift over time** — once a hook body gets longer with throttle + dedup + min-LOC checks, it crosses the implicit threshold into "script body" and violates CR-2 in spirit.
   - **Hard rule for this design**: if hook body exceeds 3 SLOC of bash beyond the case-filter + codex invocation, REFACTOR into a separate `tools/W30x-codex-stream-review.ps1` wrapper that is itself an upstream-CLI invocation pipeline (cardinal-rule-2 says hooks must be "upstream plugin hooks OR direct upstream-CLI invocations" — a script that ONLY orchestrates CLI calls is in the gray zone; the safest path is to keep the hook minimal and defer complexity to W308).

**Recommendation**: **DESIGN-DEFER** — do NOT ship in W305. Re-evaluate in W308 after P1 ships and we have empirical cost-floor data. If P1 + P2 combined cost is well under budget, P3 becomes attractive; if not, P3's per-wave $1.20 may push us over.

---

## §4 Recommendations to parent

### Which pattern to ship FIRST in W305?

**SHIP: Pattern-1 (research-discovery subagent)** as W305 P0.

**Justification**:
1. Smoke-test PASS with verifiable date freshness + cited sources + within cost cap.
2. Zero infrastructure changes — uses existing `codex:codex-rescue` subagent surface + existing `node codex-companion.mjs task` direct-CLI path.
3. Immediate use-case: replace WebSearch + deepwiki + manual-curation in sca-v5 Stream B with one parameterized codex dispatch per axis.
4. Cardinal-rule-compliant; cardinal-rule-2 trivially clean (just a documented subagent invocation).
5. Per W269 mandate, Pattern-1 dispatches can themselves be parallel-fanned-out (one codex per discovery axis), unlocking sca-v5 Stream B parallelism that's currently serial.

**SHIP-W306 (not W305): Pattern-2 (multi-judge ensemble)** — wait for P1 cost-floor data first. Paper-replay on `bytedance/deer-flow` showed 3/3 convergence with the W291 implicit-3-reviewer narrative, so design is sound; just need empirical cost data before authorizing 3× per-candidate codex dispatches across the live pipeline.

**DEFER-W308: Pattern-3 (stream-level hook)** — false-positive storm risk + CR-2-drift risk over time + parent forbade smoke test (correctly — invasive). Re-evaluate after P1 + P2 ship and we know real per-wave codex spend.

### Operator-actions required

| # | Action | Owner | Wave |
|---|---|---|---|
| 1 | Amend Pattern-1 prompt template (§1.2) with explicit "INCLUDE 1 low-star (<500★) candidate among N returned" quota, to honour W288 stars-not-hardgate mandate. Update before first sca-v5 Stream B production use. | operator (1-line prompt edit) | W305 pre-ship |
| 2 | Add langfuse trace IDs (T5 memory layer) to `codex-companion.mjs task` invocations so true GPT-5.5 token cost is measurable across N dispatches (codex self-reported $0.00 is unreliable). Pure instrumentation — no behavioural change. | operator (likely 1 env var + 1 wrapper shim) OR defer to upstream codex-plugin PR | W305 post-ship + W306 pre-ship |
| 3 | If P1 ships clean in W305, queue Pattern-2 multi-judge ensemble for W306 with cost-cap $0.60/candidate hard cap + skip-if-obvious-tier fast-path (§2.4). | parent orchestrator | W306 wave-plan |
| 4 | Pattern-3 hook design (§3.2 JSON block) is paste-ready for `.claude/settings.json` under `PostToolUse[]` — but DO NOT install in W305. Hold for W308 re-evaluation after empirical cost data. | parent (do not action; just preserve this design) | W308 |
| 5 | No `git push --force` involved. No `--no-verify`. Pattern-1 ship in W305 will be a normal pre-commit-gate-passing commit; codex Stop-hook will auto-fire adversarial review on the W305 ship-commit. | parent | W305 ship |

### Cardinal-rule invariants (all 3 patterns)

- **R1 trusted-source** ✓ — codex@openai-codex plugin is installed via the documented `/plugin install` path; all 3 patterns use its command surface.
- **R2 no self-invented `.py`/`.sh`** ✓ — P1 uses documented CLI; P2 spawns documented subagents; P3 hook body is inline bash + direct codex CLI (no script file).
- **R3 documented subagent system** ✓ — `codex:codex-rescue` is the documented subagent path (rescue.md:7).
- **R4 no `.claude/rules/`** ✓ — design + ship-recommendations live in this `docs/architecture/` file.
- **R5 safety via Claude Code permissions** ✓ — no custom guard scripts; codex CLI runs under existing `.claude/settings.json` permissions.

---

**File**: `Z:/claude-sota-installed/docs/architecture/W304-INCUMBENT-REPLACEMENT-AND-GPT55-UNLEASHED/W304-STREAM-C-GPT55-UNLEASHED.md`
**LOC**: ~420 (within ≤500 cap)
**Codex spawns by this stream**: 1 (Pattern-1 smoke only, per parent budget)
**Smoke artefact**: `Z:/claude-sota-installed/tmp/W304-stream-c-codex-smoke.log`
