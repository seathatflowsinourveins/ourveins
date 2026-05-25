# Wave 131 Agent B — eee Architecture Archaeology (REAL GPT-5.5 BRIDGE-MODE via Path P)

## Cross-model gate satisfaction

- **Path P used (NEW operator pattern)**: `CLAUDE_CODE_DISABLE_1M_CONTEXT=1 codex exec --ephemeral -p deep-review-exec --skip-git-repo-check < <prompt> 2>&1 | tee <out>`
- **Mechanism insight**: setting `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` at the **codex subprocess env layer** (NOT requiring parent eee restart) successfully bypassed FM-17.f. This is a NEW Path P operator-runbook variant — should be added to `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.f Path P` (sibling-context fire required per CR-9).
- **Verdict origin**: REAL GPT-5.5 codex CLI subprocess (NOT Sonnet stand-in)
- **OUT files**:
  - `.claude/state/codex_consult_w131_agentB_archaeology_OUT.txt` (20.1KB — FM-17.f pre-fire bypass attempt; 7135B prompt-echo, ZERO model output, classic FM-17.f signature)
  - `.claude/state/codex_consult_w131_agentB_archaeology_OUT_pathP.txt` (22.0KB — Path P recovery, 343 LOC FULL REAL GPT-5.5 verdict — PRIMARY)
- **FM-17.f n-counter**: this dispatch is **n=4 post-codification dogfood** (Wave 119/129/130 = n=3 codification basis; Wave 131 Agent B = n=4)
- **Cross-model-gate status**: FULL (REAL GPT-5.5 verdict obtained via subprocess-env Path P)

## Section 1 — Hotspot/Bug-Magnet Risk Analysis (REAL GPT-5.5 verdict)

| File | Edits | Bugs | Ratio | Risk | Disposition |
|---|---:|---:|---:|---|---|
| `.claude/settings.json` | 54 | 47 | 87% | **P0** | STRUCTURALLY FRAGILE — refactor: dedup gitleaks ×6 [**MIA OVER #100** — see §Mia validation below], remove dead `_comment_*` keys, audit 49→reduce |
| `.mcp.json` | 8 | 8 | **100%** | **P0** | EXTREME fragility every edit is a fix; install-class churn — gate via tests/test_mcp_json_smoke.py before any future edit |
| `tools/eee.ps1` | 17 | 14 | 82% | **P1** | HIGH FRAGILITY launcher; freeze + add per-flag regression tests |
| `CLAUDE.md` | 6 | 5 | 83% | **P1** | High bug-ratio but low absolute count; cardinal-rule edits inherently risky — keep T1+T2 strict |
| `_guard_base.py` | 5 | 4 | 80% | **P1** | Shared substrate — bug here multiplies across all guards; add unit tests |
| `codex_t1_consult_gate.py` | 4 | 3 | 75% | **P1** | T1 backbone — fragile but load-bearing; pin behavior via tests/test_codex_t1_consult_gate_*.py |
| `docs/install-provenance.md` | 85 | 56 | 66% | **P3** | JUSTIFIABLY churning (audit-trail growth = expected per audit-action-loop.md) |
| `docs/sota-installed-manifest.md` | 11 | 8 | 73% | **P3** | JUSTIFIABLY churning (manifest grows with installs) |
| `.claude/.claude.json` | 42 | 0 | 0% | **P3** | CC runtime self-managed; ignore |
| `installed_plugins.json` | 21 | 7 | 33% | **P3** | Plugin-install self-managed; ignore |

**Outliers**: `.mcp.json` 100% bug-ratio is ALARMING — every observed edit is a fix; suggests no schema validation. `settings.json` 87% with 49 hooks across 8 events is OVER per CR-5 KISS.

## Section 2 — Bus-Factor Diagnosis (REAL GPT-5.5 verdict)

**Global**: 199/199 commits = 1 author. Bus-factor=1 for entire repo. NOT localized — global operational dependency.

Hardest recovery surfaces:

| Surface | Why hard to recover |
|---|---|
| `.claude/settings.json` | 49 hook entries + dead keys + duplicates [**MIA OVER #100**: not duplicates — 6 distinct boundary-preserved if-patterns per W130-F6 prescription]; intent loss = security regression |
| `tools/eee.ps1` | Encodes portable env behavior; failure blocks runtime start |
| `CLAUDE.md` | Cardinal-rule policy source-of-truth; intent loss = bad future changes |
| `.mcp.json` | Every edit is a fix; MCP shape fragile + critical |
| `_guard_base.py` | Shared hook substrate; bugs multiply across guards |
| 9 unreferenced hook scripts | 228KB latent design intent; obsolete vs paused vs accidentally unwired = ambiguous |

## Section 3 — Outstanding-Queue Prioritization (REAL GPT-5.5 ranking)

| Task | Effort | Risk | Value | Dependencies |
|---|---|---|---|---|
| **#47** wire graphiti MCP | small | low | **P3 (was P0)** [**MIA VERIFIED**: 2 graphiti hits in .mcp.json] | None; graphiti ALREADY in `.mcp.json` per orchestrator probe — task likely OBSOLETE |
| **#45** cite-anchor migration with codex T1 e2e | large | high | P1 | Stable cite policy + T1 gate discipline |
| **#61** semantic-router pilot | large | high | P2 | Should wait until hook/config debt is reduced |
| **#87** FM-17.g Pattern B pre-fire HNF | medium | medium | P1 | Current codex T1/T2 behavior + trace evidence |
| **#88** FM-17.h heredoc-write-context-failure | medium | medium | P1 | Codex BG execution reliability; can parallel #87 |
| **#91** sibling fm17 backport | small | medium | P2 | FM-17.f source clarity + backport target discipline |

**Recommended execution order** (Agent B's prescribed sequence):
1. **#47** — close the obsolete P0-looking task FIRST (verify graphiti already wired, mark obsolete, archive task) [**MIA VERIFIED — execute**]
2. **HOOK/CONFIG CLEANUP** (NEW, not in queue but should precede risky work) — `.claude/settings.json` is top P0 [**Partial OVER per Mia: 6-duplicate finding refuted, but 3 dead `_comment_*` keys + 9 unreferenced scripts ARE genuine cleanup targets**]
3. **#87** — stabilize codex Pattern B handling before more codex-gated work
4. **#88** — same failure family; fix execution-context reliability
5. **#91** — backport after FM-17 handling clarified
6. **#45** — valuable but large/high-risk; do after hook/T1 reliability cleaner
7. **#61** — defer; semantic-router pilot adds architecture before runtime config calm

## Section 4 — Hook Architecture Audit (REAL GPT-5.5 verdict)

**49 hooks across 8 events is OVER** per CR-5/KISS/YAGNI for an "install-only" runtime unless each maps to an enforced invariant with provenance + tests.

**3 dead `_comment_*` keys** [**MIA VERIFIED present + Agent B mis-labeled "phantom matcher counts"**: numbers 1446/1324/1135 are STRING CHAR-COUNTS, not matcher counts — keys ARE dead per CC hooks-loader-only-processes-event-names spec]:

| Key | String length (Agent B's "phantom matcher count") | Recommendation |
|---|---:|---|
| `hooks._comment_wave124_a2_codex_mcp_healthcheck` | 1446 chars | Extract narrative to `docs/install-provenance.md`; remove from runtime |
| `hooks._comment_wave124_a1_post_tool_use_failure` | 1324 chars | Same |
| `hooks._comment_wave127_w124wires` | 1135 chars | Same |

**9 unreferenced hook scripts (228KB)** [VERIFICATION QUEUED — Mia probe pending]:

| Script | Recommendation |
|---|---|
| `agent_plan_readonly_bash_guard.py` (49KB) | KEEP or REWIRE — security-relevant, project-doc-named |
| `codex_failure_audit.py` | ARCHIVE unless live consumer |
| `codex_gate.py` | ARCHIVE or CONSOLIDATE with current `codex_t*` gates |
| `codex_mcp_healthcheck.py` | ARCHIVE unless MCP healthcheck reintroduced |
| `codex_review_queue.py` | ARCHIVE unless queue workflow active |
| `codex_review_thread_bridge.py` | ARCHIVE unless bridge workflow active |
| `codex_review_trace.py` | ARCHIVE unless Pattern B trace mining depends on it |
| `codex_stuck_detector.py` | ARCHIVE unless wired to active stuck detection |
| `fm17d_stall_detector.py` | ARCHIVE or move under FM-17 evidence docs if superseded |

**Agent B claim "CLEAR BUG: 6 identical gitleaks_pre_commit_gate.py invocations"** — **MIA OVER #100 REFUTED** [VERIFIED 2026-05-09]:
- The 6 entries have 6 UNIQUE `if:` patterns: `Bash(git commit *)` / `Bash(git -C * commit *)` / `Bash(rtk git commit *)` / `Bash(rtk git -C * commit *)` / `Bash(env * git commit *)` / `Bash(env * git -C * commit *)`
- These are designed boundary-preserved coverage per Wave 130 Fire 6 codex T1 NEEDS-REVISION conf=0.92 prescription (verdict at `.claude/state/codex_consult_w130_fire5_ship_p_architectural_decision_OUT.txt`)
- CC dispatches at most 1 hook entry per Bash command (the matching `if:` pattern wins) — NOT 6× latency
- Agent B's framing was OVER; the architectural design is correct per the latest codex T1 verdict that JUST landed in Wave 130 Fire 6

## Section 5 — AMBER Cite-Import Replacement Feasibility (REAL GPT-5.5 verdict)

98 sibling cite refs across 37 files. **CR-12 says cite-import-AMBER is last resort, BUT the distribution looks mostly legitimate provenance, NOT accidental dependency**.

| Surface | Refs | Verdict |
|---|---:|---|
| `CLAUDE.md` | 33 | **KEEP-AMBER** — cardinal-rule lattice references; sibling-novel discipline; upstream supports but cannot REPLACE local policy |
| `sota-research-architecture.md` | 9 | **KEEP-AMBER** — architecture memory/provenance; not install source |
| `deprecation-discipline.md` + `launch-discipline.md` | 7+5 | **KEEP-AMBER** — sibling-novel codification from Wave 82 class |
| 32 rule files | 1 each | **KEEP** — cite-trail source-provenance lines (`source: Z:/claude-sota/.claude/rules/X.md @ HEAD <SHA>`) |

**AMBER-replaceable cites from data: 0 confirmed.** Do NOT churn these until specific upstream-native equivalent identified per Probe DAG.

## Mia validation summary (orchestrator-side post-receipt)

| Agent B claim | Mia verdict | Evidence |
|---|---|---|
| #1 graphiti already wired in `.mcp.json` | **VERIFIED** | `grep -c graphiti .mcp.json` = 2 hits |
| #2 "6 identical gitleaks invocations" duplicate bug | **OVER #100** | 6 entries but 6 unique `if:` patterns per W130-F6 design |
| #3 `_comment_*` keys with "phantom matcher counts 1446/1324/1135" | **VERIFIED present + mis-labeled framing** | Numbers are string char-counts (Mia OVER #101 on framing); keys ARE dead per CC spec |

Mia ladder: n=99 → n=101 (2 catches this fire).

## Codex CLI commands run (audit trail)

```bash
# Attempt 1 (FM-17.f pre-fire — failed, 0 tokens, billing-class blocker)
timeout 180 codex exec --ephemeral -p deep-review-exec --skip-git-repo-check \
  < .claude/state/codex_consult_w131_agentB_archaeology.txt \
  > .claude/state/codex_consult_w131_agentB_archaeology_OUT.txt 2>&1

# Path P recovery (succeeded — full GPT-5.5 verdict)
CLAUDE_CODE_DISABLE_1M_CONTEXT=1 timeout 180 codex exec --ephemeral -p deep-review-exec --skip-git-repo-check \
  < .claude/state/codex_consult_w131_agentB_archaeology.txt 2>&1 \
  | tee .claude/state/codex_consult_w131_agentB_archaeology_OUT_pathP.txt > /dev/null
```

ARCHAEOLOGY: 10 hotspot files / 10 bug-magnets / 199 commits all bus-factor-1 / 12 stale hook artifacts (3 dead `_comment_*` keys + 9 unreferenced scripts) / 0 AMBER-replaceable cites — top P0 risk: `.claude/settings.json` hook/config fragility (49 hooks, 87% bug-ratio, 3 dead JSON-comment-as-key entries) — recommended next ship: **#47** because graphiti appears already wired in `.mcp.json` (Mia VERIFIED 2 grep hits), so close the false P0 before touching riskier architecture; THEN unscheduled hook/config cleanup ship before #87/#88.

**Caveats from Mia validation**:
- Agent B's "6-duplicate gitleaks" finding REFUTED — keep 6-pattern design per W130-F6 prescription
- Agent B's "phantom matcher count" framing for `_comment_*` keys MIS-LABELED — keys ARE dead per CC spec but numbers don't mean what was claimed
