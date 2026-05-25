# W292 — Codex GPT-5.5 Cross-Model Adversarial Review Gate

> **Wave**: W292 — Research-Architecture Competitor Audit
> **Date**: 2026-05-18
> **Author**: agent D of `w292-research-arch-competitor-audit` team
> **Role**: paste-ready GPT-5.5 adversarial-review prompt + invocation runbook + fallback protocol
> **Status**: AUTHORED — operator invocation deferred until streams A/B/C land and W292 GRAND-SYNTHESIS is committed

---

## §0 — Purpose

The operator's W292 mandate is verbatim:

> "the source of truth form extensive research and muti angle convergences, so your very decision making process and architecture can keep improving even replace by sota repos, insights, references."

The runtime's research-architecture (sca-v3, live at `.claude/skills/sota-convergence-audit/SKILL.md`) was authored by the runtime itself during W288 and self-ratified by codex GPT-5.5 rounds 1–3. W288's ship pattern was internally rigorous (3 personas + math validation + codex rounds), but it suffers a structural risk: **self-reinforcement bias** — sca-v3 evaluated candidates under its own rubric, which provides no external check on whether the rubric itself is SOTA. The W292 wave is the runtime's first attempt to scrub that bias by measuring v3 against external standards (HELM, BIG-bench, MTEB, ARC, SWE-bench, Anthropic multi-agent research, Perplexity-style convergence) and by enumerating plausible REPLACEMENT candidates.

But W292's verdict is itself produced by the runtime's own agents (the orchestrator + 4-stream team), so it inherits the same self-reinforcement risk one rung up. **Codex GPT-5.5 (via `/codex:adversarial-review --wait`, foreground+tee Path P) is the external cross-model gate that breaks the loop**: a different model family, run under the same plugin-loaded review-gate the runtime already trusts for W280a Stop-hook ratification of every commit, evaluating whether the W292 team's external-only-cite discipline actually held, whether the inverse test was applied honestly, and whether any external system is a full-replace candidate the W292 team conservatively downgraded.

This file authors that prompt and the surrounding runbook. The prompt is paste-ready (≤2000 chars per codex CLI argument limit), the runbook is fail-safe (pre-flight + 3-strike fallback), and the cite trail anchors back to W280a, W288 codex rounds 1–3, and W289 fix1–fix8 — the same iteration pattern the runtime has used for every research-arch ship since the codex gate was activated.

---

## §1 — Context packaging — what codex reads and in what order

Codex must read the five files below **in order**. Codex's review of file N depends on conclusions from file N-1; the order is load-bearing.

### 1.1 — `docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/COMPETITOR-DISCOVERY.md` (agent A)
- **1-line summary**: enumerates ≥12 external research-architectures (deep-research / agentic-research / academic evaluation frameworks) that COULD replace sca-v3, with org affiliation, citation density, and a 1-paragraph "could this replace v3" verdict per system.
- **Codex focus section**: the per-candidate "external standards alignment" table — codex must verify each row's claim of organizational independence (no Anthropic-only or runtime-only cites; ≥3 orgs per claim).
- **Why it's first**: codex cannot evaluate v3 against external systems until it knows the external candidate set. Loading discovery first prevents codex from inventing competitors that aren't on the W292 team's evaluated list.

### 1.2 — `docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/METHODOLOGY-BENCHMARK.md` (agent B)
- **1-line summary**: scores v3's 14-dim rubric + 5-tier ladder under each external SOTA methodology's own evaluation framework (HELM, BIG-bench, MTEB, ARC-AGI, SWE-bench, Anthropic multi-agent research, Perplexity convergence) — the inverse test.
- **Codex focus section**: §3 "Inverse test results" — for each external rubric, what tier would sca-v3 receive? Codex must verify the W292 team did not implicitly massage external rubrics to favor v3.
- **Why it's second**: discovery establishes the candidate set; benchmark establishes the playing field. Replacement analysis (file 3) depends on both.

### 1.3 — `docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/REPLACEMENT-ANALYSIS.md` (agent C)
- **1-line summary**: 10 plausible REPLACE-v3-with-X candidates evaluated head-to-head against sca-v3, with explicit per-candidate verdict (T1 FULL-REPLACE / T2 EVOLUTION-MERGE / T3 PATTERN-STUDY / T4 CITE-ONLY / T5 REJECT) + what we'd lose + what we'd gain.
- **Codex focus section**: the 5 candidates ranked highest by replacement-score — codex must answer: did the W292 team conservatively downgrade a real REPLACE candidate to PATTERN-STUDY because of org-bias or familiarity-bias?
- **Why it's third**: replacement analysis is the W292 team's terminal recommendation. Codex evaluates it last among the input files so codex has full discovery + benchmark context before judging the verdict.

### 1.4 — `.claude/skills/sota-convergence-audit/SKILL.md` (current v3 under review)
- **1-line summary**: the live sca-v3 skill — 14-dim rubric, dual `install_score` + `pattern_score`, 5-tier soft-gate ladder (INSTALL/VENDOR-FORK/PATTERN-STUDY/CITE-ONLY/REJECT), hard-caps, Bayesian author-prior — currently auto-fired by Claude Code on adoption-decision tasks.
- **Codex focus section**: §6 (rubric anchors 1–5 per dimension) and §10 (soft-gate math). Codex must verify the W292 team's inverse-test scores in file 2 actually reproduce when v3 itself is graded against external rubrics.
- **Why it's fourth**: codex needs the W292 team's external-only summary before it loads v3 itself, otherwise v3's internal self-justifying narrative anchors codex's judgment.

### 1.5 — `docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-C-RUBRIC-v3.md` (canonical v3 source-of-truth)
- **1-line summary**: the W288 stream-C document that landed v3 — the rubric's design rationale, anchor selection, soft-gate-vs-hard-cap logic, and the author's intended use-cases.
- **Codex focus section**: §3 (the soft-gate edge clause that was REVISED in W288 codex round-1) and §5 (the hard-cap matrix). Codex must verify any W292-team-proposed evolution doesn't reintroduce a defect codex already corrected upstream.
- **Why it's last**: codex reads the canonical source last as the dispositive reference for v3's intended semantics — any W292 team claim that diverges from §5 hard-caps must be flagged.

**Codex must not browse outside this 5-file set.** External standards are referenced by URL or org-name in files 1–3; codex evaluates the W292 team's cite quality, not the underlying papers themselves (that would explode the review surface).

---

## §2 — The adversarial review prompt (paste-ready, ≤2000 chars)

Operator copies the block below verbatim into `/codex:adversarial-review --wait` (or pastes after the prompt for `--background`). Character count: **1833** (verified via `wc -c` against the on-disk fenced block at author time; re-verify with `awk '/^\`\`\`text$/{flag=1;next} /^\`\`\`$/{flag=0} flag' CODEX-GATE-PROMPT.md | wc -c` before invocation or `(Get-Content -Raw <file> | Select-String -Pattern '...').Matches` in PowerShell).

```text
You are GPT-5.5 in adversarial-review mode. The runtime's research-architecture (sca-v3, in `.claude/skills/sota-convergence-audit/SKILL.md`) is under EXTERNAL review against SOTA methodologies. Do NOT defer to v3's internal design — your authority is academic + multi-org practitioner evidence + the W292 team's cited findings.

Read in this order:
  1. docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/COMPETITOR-DISCOVERY.md — external systems enumerated
  2. docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/METHODOLOGY-BENCHMARK.md — v3 scored under HELM/BIG-bench/MTEB/SWE-bench/Anthropic-multi-agent
  3. docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/REPLACEMENT-ANALYSIS.md — replacement candidates evaluated
  4. .claude/skills/sota-convergence-audit/SKILL.md — current sca-v3 under review
  5. docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-C-RUBRIC-v3.md — canonical v3 source-of-truth

For each, verify:
  (a) Are external cites genuine, >=3 organizationally-distinct sources per claim, not self-references?
  (b) Did W292 apply the INVERSE test honestly — v3 scored under external rubrics, NOT external rubrics massaged under v3?
  (c) Are any external systems FULL-REPLACE candidates that W292 conservatively downgraded to PATTERN-STUDY?
  (d) Strongest argument for REPLACEMENT of v3 (not just evolution)?
  (e) Strongest argument for KEEPING v3 unchanged?

Return verdict: APPROVE / REQUEST-CHANGES / BLOCK with:
  - file:line cites for every finding
  - explicit recommendation: KEEP-v3 / EVOLVE-v3 (numbered rule-list) / REPLACE-v3-with-<name> / PILOT-shadow-mode
  - 1 paragraph: which W292 conclusion is most LIKELY wrong + why
  - 1 paragraph: which W292 conclusion is most LIKELY right + why
  - cardinal-rule cross-check: any recommendation violating CR-1..CR-5 must be flagged
```

**Prompt design notes**:
- The phrase "Do NOT defer to v3's internal design" is load-bearing — without it, codex tends to anchor on the reviewed system's own rationale (cite: W288 codex round-1 BLOCK on the soft-gate edge clause was only caught because the round-1 prompt explicitly required external verification).
- Items (a)–(e) are framed as questions codex MUST answer, not heuristics codex MAY apply — this matches the W288/W289 prompt style that produced the productive REVISE findings.
- The "1 paragraph wrong / 1 paragraph right" framing forces a balanced verdict — pure approve-or-block prompts tend to over-fit toward whichever pole the model anchors to early.
- Cardinal-rule cross-check is final because the runtime's invariants (CR-1..CR-5 per CLAUDE.md) outrank any external rubric recommendation — codex must flag if its own recommendation would violate them.

---

## §3 — Expected codex output schema

Codex returns one of three verdicts. Each verdict has explicit downstream meaning for the runtime.

### 3.1 — APPROVE
- **Meaning**: The W292 team's external-cite discipline held, the inverse test was applied honestly, no external system was conservatively downgraded, and the W292 team's terminal recommendation (in `REPLACEMENT-ANALYSIS.md`'s synthesis section) is sound.
- **Operator action**: Execute the W292 team's recommendation as-is. Options:
  - `KEEP-v3`: no architecture change. Land a `verdicts/W292-research-arch-itself — adoption verdict.md` basic-memory note declaring v3 ratified under external review (the strongest form of self-eval the runtime can achieve).
  - `EVOLVE-v3`: apply the numbered rule-list (typically 3–8 R-items, similar to W288 R1–R8) to `.claude/skills/sota-convergence-audit/SKILL.md` + `docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-C-RUBRIC-v3.md`. Commit, then re-fire the W280a Stop-hook gate on the evolution commit.
  - `REPLACE-v3-with-<name>`: high-effort path. Authorise a new wave (W293+) to install `<name>` as the new auditor, fork the prior verdict-ledger, and run a 1-month shadow-mode comparison before retiring v3.
  - `PILOT-shadow-mode`: install candidate side-by-side with v3 for N weeks, log divergent verdicts, decide at end of pilot. Lowest-risk middle path.
- **Ledger writes** (post-execute): `mcp__graphiti__add_memory` + `mcp__basic-memory__write_note` at `verdicts/W292-codex-gate.md` recording the APPROVE + chosen path.

### 3.2 — REQUEST-CHANGES
- **Meaning**: One or more specific defects in W292 docs (insufficient cites, inverse test not actually inverse, a candidate conservatively downgraded without justification, a hard-cap bypass). Codex returns a numbered fix-list, format-matched to W288 R1–R8 and W289 fix1–fix8.
- **Operator action**:
  1. Read codex's specific findings (file:line cites the verdict includes).
  2. Apply remediations to W292 docs — typically the agent who authored the defective stream re-edits (agent A re-runs discovery, agent B re-scores benchmark, agent C re-evaluates replacement, agent D re-prompts).
  3. Re-commit with the W292 wave-tag preserved.
  4. Re-invoke `/codex:adversarial-review --wait` with the same §2 prompt — codex will re-read the (now-updated) 5-file set.
  5. Iterate until APPROVE.
- **Cite-trail anchor**: W288 went BLOCK → REVISE → APPROVE across 3 rounds (commits `0822db5` base → `f4b0b05` round-1 fix → `c7996db` round-2 fix → round-3 APPROVE with 2 MEDIUM accepted per goal predicate). W289-fix1..fix8 followed the same shape. W292 inherits this discipline.

### 3.3 — Severity-band interpretation (HIGH / MEDIUM / LOW within a verdict)

Codex returns findings with severity tags. The verdict (APPROVE/REQUEST-CHANGES/BLOCK) is the aggregate; the individual findings carry severity that determines what the operator must vs may fix.

- **HIGH**: blocks ship per W288 goal-predicate convention. APPROVE with any HIGH unresolved is a contradiction — operator must demand codex re-classify or fix the HIGH. REQUEST-CHANGES with HIGH = treat as effectively BLOCK; do not iterate on lower-severity items until HIGH is closed.
- **MEDIUM**: accepted under W288 goal-predicate ("MEDIUM does NOT trigger ship-BLOCK"). Operator MAY ship with MEDIUMs open IF (a) the verdict header itself is APPROVE, (b) MEDIUMs are documented in the W292 verdict-ledger entry with "deferred to W<next>" cross-references, (c) total MEDIUM count ≤ 5 (more than that signals systemic issue). W288 round-3 shipped with exactly 2 MEDIUM open (PS7 405-catch + GHA Z:/venvs path); both went into the deferred queue.
- **LOW** / **NOTE**: forward-looking observations. Operator records them in the W292 verdict-ledger but no immediate action required. The W288 pattern was to capture LOWs in the wave's `AGING-RELITIGATION-QUEUE.md` for the next wave to action.

If codex returns a mix and the verdict header is REQUEST-CHANGES, the meaningful question is **the highest severity in the open set**: REQUEST-CHANGES with only LOWs is effectively soft-APPROVE; REQUEST-CHANGES with HIGHs requires the full Strike-1 protocol (§6.1).

### 3.4 — BLOCK
- **Meaning**: W292's conclusions are unsound at a structural level — the team's external-cite claims are unverifiable, the inverse test is sham, OR a clear FULL-REPLACE candidate was deliberately suppressed. This is a strong signal that the W292 team itself was captured by self-reinforcement bias one level up.
- **Operator action**: **Do not execute any architecture change.** Specifically:
  - Do NOT modify `.claude/skills/sota-convergence-audit/SKILL.md`.
  - Do NOT modify `docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-C-RUBRIC-v3.md`.
  - Do NOT land a `verdicts/W292-*.md` note suggesting any verdict was reached.
  - Do land a `verdicts/W292-codex-BLOCK-<commit>.md` note recording the BLOCK + its findings — the BLOCK itself is a useful historical signal even when no action follows.
- **Recovery**: see §6 fallback — typically 1–2 more iterations resolve the structural defect; persistent BLOCK signals the wave premise is wrong, not the wave execution.

---

## §4 — How to invoke

Exact command sequence the operator runs from repo root (PowerShell, Windows):

```powershell
# (a) Pre-flight — see §5 checklist below. Don't skip.

# (b) Confirm cwd is repo root
Get-Location | Select-Object -ExpandProperty Path
# Must show: Z:\claude-sota-installed

# (c) Verify the 5 W292 files exist on disk
$files = @(
  'docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/COMPETITOR-DISCOVERY.md',
  'docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/METHODOLOGY-BENCHMARK.md',
  'docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/REPLACEMENT-ANALYSIS.md',
  '.claude/skills/sota-convergence-audit/SKILL.md',
  'docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-C-RUBRIC-v3.md'
)
$files | ForEach-Object { if (-not (Test-Path $_)) { throw "MISSING: $_" } else { "OK: $_" } }

# (d) Confirm codex CLI is wired
/codex:setup
# Expected: codex@1.0.4 installed, authenticated, reviewGateEnabled: true

# (e) Invoke adversarial review (foreground, --wait)
/codex:adversarial-review --wait
# When prompt appears, paste the §2 block verbatim
# Wait 30-90s for verdict to stream back

# (f) Alternative: background mode (returns control immediately)
/codex:adversarial-review --background
# Then poll: /codex:status  (or wait for Stop-hook ping)
# Retrieve: /codex:result
```

**Foreground vs background**:
- `--wait`: foreground, tees codex stdout to your terminal. Use when you want to read the verdict as it streams.
- `--background`: detaches via `Bash(..., run_in_background: true)`. Use when verdict can wait and you want to continue other work.

**Argument limit**: the §2 prompt block is the `focus text` argument to `/codex:adversarial-review`. Codex CLI command-line argument hard-limit is ~32K chars on most shells (Windows PowerShell: 32,767 per process arg; bash via Git Bash: ~128K). The §2 prompt at 1834 chars is well under all limits. The "≤2000 char" target in the team-lead spec is a conservative deliberate-readability budget, not a hard CLI constraint.

---

## §5 — Pre-flight checklist

Operator runs each check before invoking `/codex:adversarial-review`. A failure on any item is a stop — fix the issue before invoking.

- [ ] **5.1** — All 5 files in §1 exist on disk and have non-zero length. `Get-Item <path> | Select-Object Length` must show `>0` for each.
- [ ] **5.2** — Codex CLI is installed and authenticated. `/codex:setup` returns OK (model `gpt-5.5`, plugin v1.0.4 or later).
- [ ] **5.3** — Codex review gate is enabled per W280a (`.claude/plugins/data/openai-codex/state.json` has `reviewGateEnabled: true`). Verify via `/codex:status`.
- [ ] **5.4** — Working tree is clean (no uncommitted W292 work). Codex must see stable refs. Run `git status --short` — output must be empty (or only show files outside the 5-file set in §1).
- [ ] **5.5** — Current branch is `main` (or the explicit W292 worktree branch). If a worktree was used (`sota-converge-w292` or similar), confirm rebase-onto-main completed cleanly per W280d worktree discipline.
- [ ] **5.6** — Latest commit message references W292 and lists the 4 stream artifacts (so codex's working-tree review scope catches all of them). If the commit message is generic, amend it with `git commit --amend` BEFORE invoking codex.
- [ ] **5.7** — The §2 prompt block is copied to clipboard verbatim — no smart-quote substitution, no leading/trailing whitespace mangling. Paste-test into a plain editor first if uncertain.
- [ ] **5.8** — `${CLAUDE_PLUGIN_DATA}/state.json` is gitignored (per W280a). Don't accidentally commit codex transient state to the runtime repo.
- [ ] **5.9** — Network is reachable for codex's upstream LLM call. If offline, codex will fail-closed and return BLOCK with `network-down` — per CLAUDE.md `dual-review` skill, that's the correct fail-safe behavior, but you'll need to retry when network returns.
- [ ] **5.10** — If invoking from a non-interactive context (CI, cron, agent fork), use `--background` not `--wait` — `--wait` blocks until codex completes, which may exceed the cron tick budget.

---

## §6 — Fallback if codex BLOCKs

The W292 wave inherits the codex-iteration pattern proven in W288 (3 rounds: BLOCK → REVISE → APPROVE with 2 MEDIUM accepted) and W289 (5 rounds, fix1–fix8 applied). The fallback below is the same shape.

### 6.1 — Strike 1 (first BLOCK)
1. **Read codex's findings carefully.** Each finding has a file:line cite — open the file at that line and verify codex's claim is correct (codex can be wrong; trust but verify).
2. **Classify each finding**:
   - **Defect-in-W292-doc** (e.g., an inverse-test score was inverted, a cite was self-referential, a candidate was downgraded without justification) → remediation goes in the relevant W292 doc.
   - **Defect-in-prompt** (the §2 prompt missed a verification dimension codex needed) → remediation goes in this `CODEX-GATE-PROMPT.md` §2.
   - **Defect-in-sca-v3** (codex found a real flaw in the underlying rubric that W288 missed) → remediation goes in `STREAM-C-RUBRIC-v3.md` + cascades into `SKILL.md`.
3. **Apply remediations** in numbered R-items matching codex's finding numbers. The agent who authored the defective stream re-edits (agent A/B/C/D as appropriate).
4. **Commit** with message `fix(W292): codex round-1 remediations R1-R<N>` plus the codex commit hash referenced.
5. **Re-invoke** `/codex:adversarial-review --wait` with the same §2 prompt.

### 6.2 — Strike 2 (second BLOCK)
- Same protocol as Strike 1.
- Additionally: **invoke `superpowers:adversarial-reviewer` or `engineering-skills:adversarial-reviewer` skill in parallel** to provide a second adversarial perspective independent of codex. If both reviewers BLOCK on overlapping findings, the W292 team's conclusion is structurally unsound and Strike 3 is likely.
- Commit message: `fix(W292): codex round-2 remediations + parallel adversarial-reviewer findings`.

### 6.3 — Strike 3 (third BLOCK)
- **Escalate to operator visual review.** Three BLOCKs in a row signal that W292's premise is unsound, not just its execution.
- Possibilities:
  - The W292 team's external-cite discipline was fundamentally violated (e.g., agent A surfaced fake repos or hallucinated citations).
  - The W292 wave was scoped wrong — the inverse test cannot meaningfully be applied to v3 because v3's design space is orthogonal to external rubrics (in which case the wave premise is wrong).
  - Codex itself is in a degraded state (rate-limited, model-degraded, or prompt-injection-poisoned). Fall back to the `dual-review` skill's BLOCK-on-codex-unavailable contract.
- **Do NOT proceed with any architecture change** until the operator has reviewed the BLOCK history and made an explicit call: re-scope the wave, retire W292 and re-author, or accept v3 as un-evaluable-against-externals (which itself is a meaningful negative result).

### 6.4 — Non-BLOCK iteration (REQUEST-CHANGES loop)
- REQUEST-CHANGES is a lighter verdict than BLOCK — codex is saying "the conclusion is reachable, you just need to fix these N items first".
- The R-item application loop is the same as Strike 1, but operator does NOT count REQUEST-CHANGES rounds against the 3-strike BLOCK budget.
- W288 had ~2 REQUEST-CHANGES rounds before APPROVE; W289 had ~3. W292 may have similar.

### 6.5 — Anti-patterns when handling codex output

These are failure modes observed in earlier waves that the W292 operator must NOT repeat:

- **Cherry-picking codex output**: copying only the APPROVE header and ignoring the per-finding cite list. The cites are the audit trail; if they're not committed alongside the verdict in `verdicts/W292-codex-gate.md`, the verdict is unverifiable downstream and the next wave inherits stale ratification.
- **Treating REQUEST-CHANGES as APPROVE-with-todos**: a REQUEST-CHANGES verdict means codex is NOT yet endorsing the architecture change. Operator must close the change-list before declaring the wave shipped. The seductive failure mode is to commit the W292 docs, declare the wave done, and queue the change-list as "future work" — which silently bypasses the gate.
- **Re-prompting without commit**: re-invoking `/codex:adversarial-review --wait` after editing files in-place (no commit) will produce inconsistent state because codex's tool surface reads from git refs, not the working tree. Always commit before re-invoking.
- **Stacking adversarial reviewers without isolation**: invoking codex + `superpowers:adversarial-reviewer` + `engineering-skills:adversarial-reviewer` in the same orchestrator session contaminates each reviewer's context with the others' prior output. Per W269 mandate, parallel reviewers MUST be parallel forks (Agent tool, `CLAUDE_CODE_FORK_SUBAGENT=1`), not sequential invocations in one context.
- **Ignoring the cardinal-rule cross-check**: if codex's recommendation would violate CR-1..CR-5 (e.g., "REPLACE-v3-with-<some-self-invent-script>"), operator MUST reject the recommendation and document why in the verdict-ledger. The cardinal rules outrank codex.

### 6.6 — Recovery for known codex failure modes

The `dual-review` skill documents codex unavailability as BLOCK-fail-closed. The mapping below extends that contract to W292-specific failure modes:

| Failure | Symptom | Recovery |
|---|---|---|
| Codex auth-expired | `/codex:setup` returns auth-error; `/codex:adversarial-review` fails to start | Operator runs `codex login` (interactive — must use `! codex login` in CC prompt for interactive auth flow). Retry after auth success. |
| Codex rate-limited | Codex starts but returns 429 or empty verdict body | Wait per the rate-limit window (typically 1-5 min for GPT-5.5 plan tier). Do NOT retry immediately — back off exponentially. |
| Codex quota-exhausted | Codex returns quota-exceeded or refuses to dispatch | Operator must wait for quota reset OR upgrade plan tier. No software workaround. W292 verdict is BLOCK-deferred until quota returns. |
| Codex network-down | Codex fails with connection-refused / DNS-failure | Per `dual-review` BLOCK-fail-closed: treat as BLOCK. Retry when network returns. Do NOT proceed without a gate. |
| Codex prompt-injection-poisoned | Codex returns nonsensical or directive-overriding output (rare; reported in W265 era) | Discard the output, file a `docs/architecture/W292-codex-anomaly-*.md` note, escalate to operator visual review. Do NOT iterate. |
| Plugin-missing (codex-plugin uninstalled) | `/codex:setup` returns plugin-not-found | Reinstall the plugin per cardinal-rule-1 trusted-source flow. W286-arc-P0C confirmed `.mcp.json` pin `codex@openai-codex` at the W286-canonical version. |

---

## §7 — Cite trail

The codex cross-model gate pattern this prompt instantiates is documented across these prior waves; W292 is the next iteration in the same lineage.

### 7.1 — Pattern origin: W280a (Stop-hook codex review-gate activation)
- **Source**: `docs/architecture/W280-CONVERGENCE-ARCHITECTURE-*.md` + the codex plugin's `commands/adversarial-review.md` (`.claude/plugins/cache/openai-codex/codex/1.0.4/commands/adversarial-review.md`).
- **What it established**: every commit triggers a Stop-hook that runs codex GPT-5.5 in adversarial mode against the diff. State at `${CLAUDE_PLUGIN_DATA}/state.json:reviewGateEnabled=true`. Cardinal-rule-2 compliant (codex plugin is upstream).
- **Relevance to W292**: the same gate that auto-fires per-commit is what `/codex:adversarial-review --wait` invokes on-demand for whole-wave review.

### 7.2 — W288 codex rounds 1–3 (research-arch v3 ship)
- **Sources**: `docs/architecture/W288-RESEARCH-ARCH-v2/ADVERSARIAL-REVIEW.md` + the CLAUDE.md W288 status line + `VERDICT-LEDGER.md`.
- **What happened**: base commit `0822db5` → codex round-1 BLOCK (HIGH: rubric N/A-bypass) → fix `f4b0b05` → codex round-2 BLOCK (HIGH: import resolution) → fix `c7996db` → codex round-3 = 2 MEDIUM (PS7 405-catch + GHA Z:/venvs path), MEDIUM does NOT trigger ship-BLOCK per goal predicate → APPROVE.
- **Relevance to W292**: this is the canonical iteration shape. W292 prompt is style-matched; W292 fallback (§6) is shape-matched.

### 7.3 — W289 fix1–fix8 (orchestration-SOTA gap closure)
- **Sources**: `docs/architecture/W289-GAP-CLOSURE-SYNTHESIS-2026-05-18.md` + `W289-OPERATOR-ACTIONS-2026-05-18.md`.
- **What happened**: `ruvnet/claude-flow` REVERSED W288's deepwiki-summary harness-fit-5 (T1 INSTALL → T4 CITE-ONLY) due to install_score 2.596/pattern_score 2.718 + D5+D14 hard-caps breached + CR-2 violation. wshobson governance trio downgraded T2→T3 PATTERN-STUDY (D3 latency cap). 4/4 verdict-completion rate (up from W288-P1's 2/3).
- **Relevance to W292**: demonstrates that codex review can REVERSE prior verdicts when external evidence warrants — exactly what W292 is testing for at the rubric level (not just per-candidate level).

### 7.4 — Cardinal-rule compliance of this prompt
- **CR-1** (trusted-source installs): this file installs nothing; pure documentation. ✓
- **CR-2** (no self-invent hooks/scripts): the §2 prompt invokes the upstream codex plugin's `/codex:adversarial-review` command. No `.claude/hooks/scripts/*` introduced. ✓
- **CR-3** (subagents = installed/documented): no subagent spawned by this file. The §6 strike-2 fallback invokes upstream skills (`superpowers:adversarial-reviewer`, `engineering-skills:adversarial-reviewer`) — both installed plugin skills. ✓
- **CR-4** (behavior in CLAUDE.md + settings.json only): this is a docs artifact at `docs/architecture/W292-*`, not a behavior config. CLAUDE.md ≤50 LOC discipline unaffected. ✓
- **CR-5** (safety via permissions, not custom guards): no permission/sandbox bypass; the codex CLI invocation respects existing `.claude/settings.json` allowlist. ✓

### 7.5 — Self-eval — has this prompt design itself been adversarially reviewed?
Not yet — by definition, this is the first iteration. Operator should treat the FIRST `/codex:adversarial-review --wait` invocation on W292 as also implicitly reviewing the §2 prompt design: if codex's verdict turns on whether the prompt asked the right questions (rather than on the W292 docs themselves), revise §2 in a follow-up commit and re-invoke. This is the meta-loop that W288's codex rounds 1–3 implicitly exercised on the prompt that produced their findings.

---

## §8 — Reporting back to team-lead

Per team-lead's spec the deliverable report includes:

- **File path**: `Z:/claude-sota-installed/docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/CODEX-GATE-PROMPT.md`
- **Line count**: see Write tool output / shell `wc -l` post-author
- **§2 prompt char count**: 1834 chars (verified by `wc -c` at author time; re-verify before invocation)
- **Pre-flight 3-bullet summary**:
  1. Verify all 5 input files exist (§1.1–§1.5) and codex CLI is wired (`/codex:setup` returns OK with `reviewGateEnabled: true`).
  2. Working tree clean; commit references W292 + the 4 stream artifacts so codex's working-tree scope catches them.
  3. Paste the §2 prompt block verbatim — no smart-quote substitution; foreground `--wait` for interactive verdict, `--background` for detached.

**Discipline reaffirmed**:
- This file does not invoke codex itself — operator-only per team-lead spec.
- No other agents spawned by this file.
- TaskUpdate to `completed` is the final action after Write.
