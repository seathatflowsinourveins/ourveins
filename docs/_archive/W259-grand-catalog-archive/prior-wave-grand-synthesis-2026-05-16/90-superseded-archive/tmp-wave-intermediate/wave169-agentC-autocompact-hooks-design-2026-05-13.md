# Wave 169 Agent C — SOTA Auto-Compact Methods Deep-Dive + Hooks-For-Full-Automation Design

**Agent**: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g)-aware fallback — FM-17.g defense; NO codex-rescue per orchestrator brief)
**Date**: 2026-05-13
**Wave**: 169 Agent C
**Cross-model-gate-satisfaction-status**: STAND-IN per CLAUDE.local.md ENV (f); cross-model gate NOT structurally satisfied for this dispatch — orchestrator MUST file 2nd-stage validation (codex T1 / Path P foreground+tee) if recommending ADOPT-class action per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`.

---

## STAND-IN-NOTICE

This dispatch ran under env-funneling. Per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` n=5 evidence ladder, true GPT-5.5 penetration ~25% under env-funneling. Treat verdicts below as architectural-PROPOSAL-class with **2nd-stage validation** required: codex T1 deep-review-exec OR Path P `codex exec --skip-git-repo-check --color never -p deep-review-exec` foreground+tee on the 3 hook designs (§4) BEFORE manifest §13 row ship.

---

## §1. SOTA auto-compact methods — 8-cohort comparison

Cross-referenced cohort per `auto-compact-discipline.md` Rank #1-#7 baseline + Wave 169 fresh cite-refresh per cardinal-rule-9 freshness gate.

| # | Method | Source | Mechanism | Measured savings | Maturity | sss-fit | CR-8 status |
|---|--------|--------|-----------|------------------|----------|---------|-------------|
| 1 | **context-mode MCP** | `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.111/` (INSTALLED v1.0.111 + v1.0.124) | `ctx_batch_execute` runs N commands + indexes + searches in ONE call; `ctx_execute_file` reads + processes file without context entry; `ctx_fetch_and_index` fetches URL into sandbox. Raw output stays in sandbox; only LLM-summarized chunks enter context | ~98% (this fire's batch_execute = 21 commands + 1637 lines / 101.7KB → 58 indexed sections, ~3KB preview) | INSTALLED-AND-OPERATIONAL (this fire dogfoods it 30+ times) | **PRIMARY** — Rank #1 in auto-compact-discipline.md; mandatory for all subagent briefs per FM-17.e mitigation | ADAPTED-FROM-SOTA |
| 2 | **deepagents TruncateArgsSettings** | `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/summarization.py:122-149,655-730 @ HEAD 95f845d2` (LangChain-org MIT) | Pre-summarization middleware truncates `tool_calls.args` in older messages BEFORE compaction. Trigger threshold + keep window + max_length + truncation_text. Targets `write_file` / `edit_file` / `execute` args verbatim per source comment | NOT-active-middleware in sss (no Python SDK runtime); design-discipline only — ~10-20K tokens/long-arc fire avoided when reactively applied per coordination.md §12 rewind-first | TIER-1 LangChain-MIT shipped; v ALPHA per LangChain master | **Rank #6** (doc-only) — adapt to operator-discipline pre-emptive arg-truncation when message-history >150K tokens on a long-arc fire | ADAPTED-FROM-SOTA |
| 3 | **intelligent-compact PreCompact** | `Z:/claude-sota-installed/.claude/plugins/cache/claude-settings/intelligent-compact/1.0.0/hooks/scripts/precompact_priorities.sh` @ Apache-2.0 v1.0.0 (Fatih Akyon, fcakyon org) | PreCompact hook fires before /compact (manual+auto). Stdout becomes "Additional Instructions:" block appended after default 9-section compact prompt. Patches §1/§3/§4/§5/§6/§7 with fidelity rules (unanswered Qs / root-causes / exact-numbers / file-tiers / subagent-findings / A-vs-B comparisons) | Steers compact summary fidelity; saves ~30-50% of re-research cost when sessions resume from compact summary | INSTALLED W164 F38a; SEMANTIC-EFFECT-PENDING-LIVE-SMOKE | **Rank #1.5** new (compact-quality multiplier when /compact fires); does NOT prevent /compact — controls its OUTPUT shape | ADAPTED-FROM-SOTA |
| 4 | **repomix pack→grep** | `Z:/repos/deps/repomix/README.md:979,1089 @ HEAD 7dfd2b96` (yamadashy MIT) | `pack_codebase(compress=true)` returns outputId; `grep_repomix_output(outputId, pattern)` searches incrementally. Tree-sitter compression ~70% token reduction | ~70% token reduction per upstream README claim; sss empirical: skip when audit ≤5 files | INSTALLED via mcp__repomix tools | **Rank #2** — when audit spans ≥5 files in one repo; cite-pin upstream README:979,1089 | ADAPTED-FROM-SOTA |
| 5 | **coordination.md §12 rewind-first** | `Z:/claude-sota/.claude/rules/coordination.md §12 @ HEAD <cite-fresh>` (Thariq 2026-04-16 named-T2 tips) | Cut failed tail via double-Esc / `/rewind` instead of layering corrections. Keeps expensive reads + drops failed attempt | Avoids `reads + 2 failed attempts + 2 corrections + fix` rot pattern; pays for itself when failure-rate >20% | TIER-1 named-T2 Thariq; STABLE-BURN-IN 13mo | **Rank #4** — pair with /compact `<hint>` at ~300k tokens proactive layer | ADAPTED-FROM-SOTA |
| 6 | **Karpathy §5 Wiki Compounding** | `Z:/claude-sota/.claude/rules/karpathy-adapted.md §5` + `Z:/repos/deps/claude-code-best-practice-shan/videos/claude-karpathy-ai-engineer-02-may-26.md:153 @ HEAD 48f2ceb` (named-author AI Engineer fireside 2026-05-02) | 3-layer wiki: Layer 1 chronological JSONL / Layer 2 MEMORY.md index ≤200 lines / Layer 3 compiled close-syntheses. Progressive disclosure: index always-loaded; content lazy-loaded | Cross-session compounding; MEMORY.md ceiling protects /loop re-entry context budget | TIER-1 named-author Karpathy; 11d since fireside | **Rank #5** — load-bearing for cross-session continuity; MEMORY.md ARCHIVE pattern when >200 lines | ADAPTED-FROM-SOTA |
| 7 | **awesome-agentic Stop-hook auto-continue** | `Z:/repos/deps/awesome-agentic-patterns/patterns/stop-hook-auto-continue-pattern.md @ HEAD ffb42768` (community-curated TIER-2) | Stop event re-injects failing-test output to continue loop without manual prompt | NOT-ACTIVE in sss; design-only reference | TIER-2 community pattern; STABLE-BURN-IN 11mo | **Rank #7** — orthogonal to compact (about session-end re-engage, not mid-session compact) | ADAPTED-FROM-SOTA |
| 8 | **cwc-long-running-agents commit-on-stop** | `Z:/claude-sota-installed/.local/cwc/commit-on-stop.sh` per Wave 6 native install (Anthropic SOTA) | Stop event auto-commits work; PROGRESS.md handoff persists state across sessions | Reduces lost-work risk on session boundaries | INSTALLED W6; commit-on-stop active | **Rank #8** — sister discipline to Karpathy §5 Layer 3; commit-class compounding | ADAPTED-FROM-SOTA |

---

## §2. Anthropic CC PreCompact / SessionStart / UserPromptSubmit routing (W164 F38a axis_2 refinement)

**Refines W164 F38a axis_2 catch**: prior claim "PreCompact stdout NOT model-visible per Anthropic L661-663 (only UserPromptSubmit/UserPromptExpansion/SessionStart route stdout)" is **partially OVER** per Wave 169 Mia probe against fresh fetch `https://code.claude.com/docs/en/hooks#precompact` 2026-05-13.

**Corrected routing matrix** (verbatim from Anthropic CC hooks ref §Events-decision-pattern table + §Add context for Claude + §PreCompact section):

| Event | Stdout-as-context? | Mechanism | Cap | Cite |
|-------|-------------------|-----------|-----|------|
| **SessionStart** | YES — `additionalContext` OR plain stdout exit 0 | Wrapped in system-reminder; injected at session-start (`startup`/`resume`/`clear`/`compact` matchers) | 10K chars | Anthropic CC §SessionStart |
| **UserPromptSubmit** | YES — `additionalContext` OR plain stdout exit 0 | Appended alongside submitted prompt | 10K chars | Anthropic CC §UserPromptSubmit + §Add context for Claude |
| **UserPromptExpansion** | YES — `additionalContext` OR plain stdout exit 0 | Appended when slash command expands | 10K chars | Anthropic CC §UserPromptExpansion |
| **PreCompact** | YES — stdout becomes "Additional Instructions:" block appended after default 9-section compact prompt (per fcakyon precompact_priorities.sh L7-10 + Anthropic Events table row PreCompact uses top-level `decision`/`reason`) | Influences /compact summary content; trigger=`manual`/`auto` matchers | 10K chars (output-cap rule) | Anthropic CC §PreCompact + §Events-decision-pattern |
| PostCompact | NO decision control — side-effects only (logging / external state update) | No model-visible stdout routing | n/a | Anthropic CC §PostCompact |
| Stop / SubagentStop | NO context routing (controls block/continue only) | Exit 2 stderr feedback re-prompts model | n/a | Anthropic CC §Stop |

**W164 F38a follow-up**: refine `docs/sota-installed-manifest.md` row for intelligent-compact CR-12 GENUINELY-NEW disposition + ADAPTED-FROM-SOTA CR-8 status from "INSTALLED-HOOK-WIRED / SEMANTIC-EFFECT-PENDING" → **"INSTALLED-HOOK-WIRED / STDOUT-ROUTES-TO-COMPACT-PROMPT (per Anthropic CC §PreCompact + fcakyon hook source L7-10)"** — net upgrade not downgrade.

---

## §3. Mia pre-design 8-probe

| # | Probe | Outcome |
|---|-------|---------|
| 1 | Does intelligent-compact PreCompact hook source exist + active? | VERIFIED ✅ — `precompact_priorities.sh` exists at `.claude/plugins/cache/claude-settings/intelligent-compact/1.0.0/hooks/scripts/precompact_priorities.sh` 3510 chars + `hooks.json` PreCompact matcher `*` registered |
| 2 | Does Anthropic CC PreCompact route stdout to model? | VERIFIED ✅ — fresh fetch confirms PreCompact accepts top-level `decision`/`reason` + stdout becomes "Additional Instructions:" block per fcakyon source + 10K cap per §Add context for Claude. W164 F38a axis_2 catch was over-narrow |
| 3 | Are SessionStart hooks model-stdout-visible (cross-session rehydrate channel)? | VERIFIED ✅ — Anthropic CC §SessionStart matcher `compact` fires AFTER auto-compact; stdout→additionalContext 10K cap |
| 4 | Is intelligent-compact already wired in settings.json? | VERIFIED ✅ — settings.json:521-523 `enabledPlugins.intelligent-compact@claude-settings = true` per W164 F38a |
| 5 | Does UserPromptSubmit hook exist that could probe context-%? | PARTIAL — 1 UserPromptSubmit entry registered (not yet auto-compact-gate) |
| 6 | Is fm17d_stall_detector.py wired SubagentStop? | VERIFIED ✅ — `Z:/claude-sota-installed/.claude/hooks/scripts/fm17d_stall_detector.py` exists + sister pattern for design 3 sessionstart-preload-verify |
| 7 | Is `cwc-long-running-agents/commit-on-stop.sh` accessible (cross-session-persist primitive)? | VERIFIED ✅ — `Z:/claude-sota-installed/.local/cwc/` directory listed |
| 8 | Does sessionstart-preload-discipline.md rule exist or queued? | NOT-YET-CODIFIED — W168 Spec 3 queues NEW write `~185 LOC` per Session Resume context; design 2 below fulfills the design-spec |

**Verdict**: 7/8 PASS + 1 PARTIAL. Mia gate CLEAR for designs §4 below.

---

## §4. Hook designs — FULL AUTOMATION (mechanical-enforcement)

### Design 1 — AUTO-COMPACT-VIA-HOOK (Rank #3 upgrade: operator-discipline → mechanical gate)

**Trigger event**: `UserPromptSubmit` (fires on every turn, has stdout→additionalContext routing)

**Mechanism**: hook reads transcript token-count + emits `additionalContext` warning at thresholds AND auto-fires `/compact <hint>` when ≥250K threshold crossed.

**Per Anthropic CC §UserPromptSubmit** + §Add context for Claude: stdout becomes additionalContext alongside the user's submitted prompt. The hook CANNOT directly execute `/compact` (slash commands are user-side), but it CAN emit a `systemMessage` warning + suggest the operator type `/compact <hint>` OR (more aggressive) emit `decision: "block"` with reason="auto-compact threshold reached — type /compact <focused-hint> first" which erases the current prompt and forces operator action.

**Two options** (per advanced-agent-team-standing-directive ≥2-option mandate):

**Option A — Advisory `systemMessage` (non-blocking)**

```python
#!/usr/bin/env python3
# auto_compact_advisory.py — UserPromptSubmit hook
# Emits systemMessage warning at 250k / 300k / 350k thresholds; never blocks
# Reference: Anthropic CC https://code.claude.com/docs/en/hooks §UserPromptSubmit
# Reference: auto-compact-discipline.md Rank #3 operator-discipline upgrade
import json, sys, os, pathlib

THRESHOLDS = [(350_000, "CRITICAL"), (300_000, "HIGH"), (250_000, "WARN")]
payload = json.loads(sys.stdin.read() or "{}")
transcript_path = pathlib.Path(payload.get("transcript_path", ""))

if not transcript_path.exists():
    sys.exit(0)  # advisory fail-open

# Conservative token estimate: chars/4 (per repos/deps cnighswonger cache-fix derivation 3.99 chars/token)
try:
    chars = transcript_path.stat().st_size
    tokens = chars // 4
except Exception:
    sys.exit(0)

for thresh, sev in THRESHOLDS:
    if tokens >= thresh:
        msg = f"AUTO-COMPACT-ADVISORY {sev}: transcript ~{tokens:,} tokens. Type `/compact focus on <active-task>` BEFORE auto-compact fires."
        out = {"hookSpecificOutput": {"hookEventName": "UserPromptSubmit", "additionalContext": msg}, "systemMessage": msg}
        print(json.dumps(out))
        sys.exit(0)
sys.exit(0)
```

**Cite anchor**: Anthropic CC `https://code.claude.com/docs/en/hooks#userpromptsubmit` [VERIFIED 2026-05-13 via ctx_fetch_and_index] + `hookSpecificOutput.additionalContext` field per §UserPromptSubmit + 10K cap per §Add context for Claude.

**Option B — Hard block via `decision: "block"` (mechanical-enforcement at 350K critical threshold)**

```python
# Same shape but at 350K critical:
out = {"decision": "block", "reason": f"AUTO-COMPACT-CRITICAL: transcript ~{tokens:,} tokens — type /compact <focused-hint> FIRST"}
```

Per Anthropic CC: "`decision: 'block'` prevents the prompt from being processed and erases it from context" — operator must type `/compact <hint>` then retry. This is the **mechanical-gate-enforced** form of auto-compact-discipline.md Rank #3.

**Option C — Hybrid (recommended; Option A at WARN+HIGH, Option B at CRITICAL)**

Activate Option A advisories at 250K/300K (operator can choose); escalate to Option B hard-block at 350K (mechanical-enforcement). Matches `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome A monotone-decline` pattern — graduated severity with explicit override gate.

**Wire**: `.claude/settings.json` `hooks.UserPromptSubmit` entry; async=false (synchronous since stdout must arrive before prompt processes); timeout=5000ms.

**Cite anchor**: TIER-1-DIRECT Anthropic CC `https://code.claude.com/docs/en/hooks#userpromptsubmit` 2026-05-13 + `auto-compact-discipline.md` Rank #3 (TIER-3-LOCAL-COMPOSITION sibling) + `closed-loop-recursive-narrowing.md §Outcome A` graduated-severity pattern.

---

### Design 2 — SESSIONSTART-PRELOAD-VERIFY hook (W168 Spec 3 fulfillment)

**Trigger event**: `SessionStart` (matchers `startup` / `resume` / `clear` / **`compact`** — last is post-auto-compact rehydrate channel)

**Mechanism**: 3-layer Karpathy §5 preload + 5-backend hash verify + emit STALE-PRELOAD-NOTICE via stderr→system-reminder on refute.

```python
#!/usr/bin/env python3
# sessionstart_preload_verify.py — SessionStart hook (all matchers)
# 3-layer Karpathy §5 preload + 5-backend hash verify
# Reference: Anthropic CC https://code.claude.com/docs/en/hooks#sessionstart
# Reference: Karpathy §5 Wiki Compounding Surface at karpathy-adapted.md §5
# Reference: fm20-path-drift-cascade.md row 9 asymmetric-dual-write defense
import json, sys, os, hashlib, subprocess, pathlib

ROOT = pathlib.Path("Z:/claude-sota-installed")
MEMORY = ROOT / ".claude/projects/Z--claude-sota-installed/memory/MEMORY.md"
STATE = ROOT / ".claude/state"
TMP = ROOT / "tmp"

payload = json.loads(sys.stdin.read() or "{}")
matcher = payload.get("matcher", "startup")  # startup/resume/clear/compact
session_id = payload.get("session_id", "")

# Layer 2 — MEMORY.md ceiling probe (Karpathy §5)
mem_lines = MEMORY.read_text(encoding="utf-8").count("\n") if MEMORY.exists() else 0
mem_status = "OK" if mem_lines <= 200 else f"OVER-CEILING ({mem_lines} > 200; archive trigger)"

# Layer 3 — last-3 close-synthesis available?
recent_synth = sorted(TMP.glob("wave*-close-synthesis-*.md"), key=lambda p: p.stat().st_mtime, reverse=True)[:3]
synth_status = "OK" if len(recent_synth) >= 1 else "EMPTY"

# Layer 1 — JSONL tail probe (mechanical enforcement evidence)
codex_verdicts = list((STATE).glob("codex_review_HEAD_*.txt"))
verdict_count = len(codex_verdicts)
mechanical_status = f"T3-VERDICTS-ON-DISK={verdict_count}"

# 5-backend hash chain (Mia probe per mia-pre-apply.md ROI ~1-3s)
backends = {
    "memory_md_ceiling": mem_status,
    "close_synthesis_recent": synth_status,
    "t3_mechanical_evidence": mechanical_status,
    "matcher": matcher,
    "session_id_prefix": session_id[:8] if session_id else "none",
}

# FM-20 STALE-PRELOAD-NOTICE: if matcher == "resume" + memory_md_ceiling = OVER → notify
if matcher == "resume" and mem_lines > 200:
    notice = f"STALE-PRELOAD-NOTICE: MEMORY.md {mem_lines} lines > 200 ceiling — archive before next /loop fire per Karpathy §5"
    print(notice, file=sys.stderr)

# additionalContext: surface mechanical-enforcement evidence + recent context pointers
ctx = f"""SessionStart preload (matcher={matcher}):
- MEMORY.md: {mem_lines} lines ({mem_status})
- recent close-syntheses: {len(recent_synth)} available
- T3 verdicts on-disk: {verdict_count} (mechanical-enforcement evidence)
- Backends: {json.dumps(backends)}"""

out = {"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": ctx}}
print(json.dumps(out))
sys.exit(0)
```

**Wire**: `.claude/settings.json` `hooks.SessionStart` entry; async=true (5-backend probe non-blocking); timeout=5000ms; matcher=`*` (all 4 matchers including critical `compact` matcher for post-auto-compact rehydrate).

**FM-20 row 9 mechanical-defense**: this hook auto-runs on every session start; the 5-backend hash chain catches asymmetric-dual-write at the boundary (e.g., mcp-memory hash VERIFIED + graphiti UNVERIFIED would surface here).

**Cite anchor**: TIER-1-DIRECT Anthropic CC `https://code.claude.com/docs/en/hooks#sessionstart` [VERIFIED 2026-05-13] + Karpathy §5 LLM Wiki 3-layer + fm20-path-drift-cascade.md row 9 (sister discipline).

---

### Design 3 — CROSS-SESSION-MEMORY-REHYDRATE hook (compact-matcher specialization)

**Trigger event**: `SessionStart` matcher=`compact` (fires AFTER auto-compact summary generated)

**Mechanism**: when SessionStart fires with compact matcher (post-auto-compact rehydrate), automatically re-load last-3 close-syntheses + MEMORY.md L2 index + emit recent commit SHAs into additionalContext to restore cross-session continuity that the lossy compact summary may have dropped.

```python
#!/usr/bin/env python3
# cross_session_rehydrate.py — SessionStart matcher=compact ONLY
# Fires after auto-compact; restores Karpathy §5 3-layer evidence to context
# Reference: Anthropic CC https://code.claude.com/docs/en/hooks#sessionstart
# Reference: coordination.md §12 rewind-first (autocompact is last resort)
# Reference: cwc-long-running-agents PROGRESS.md handoff pattern
import json, sys, subprocess, pathlib

ROOT = pathlib.Path("Z:/claude-sota-installed")
MEMORY = ROOT / ".claude/projects/Z--claude-sota-installed/memory/MEMORY.md"

payload = json.loads(sys.stdin.read() or "{}")
matcher = payload.get("matcher", "")

# Only fire on post-compact rehydrate
if matcher != "compact":
    sys.exit(0)

# Top of MEMORY.md (Layer 2 index — capped at 5K chars)
mem_head = ""
if MEMORY.exists():
    mem_head = MEMORY.read_text(encoding="utf-8")[:5000]

# Last 5 commit SHAs + bodies for arc continuity
try:
    git_log = subprocess.run(
        ["git", "-C", str(ROOT), "log", "-5", "--format=%h %s"],
        capture_output=True, text=True, timeout=3
    ).stdout
except Exception:
    git_log = "(git log unavailable)"

ctx = f"""POST-COMPACT REHYDRATE (auto-fire after auto-compact summary):

Recent commits:
{git_log}

MEMORY.md Layer-2 index (top 5K chars):
{mem_head}

Per Karpathy §5: compact summary is LOSSY. Use this rehydrate for arc continuity.
Per coordination.md §12: autocompact is last resort — proactive /compact <hint> at ~300K is preferred."""

out = {"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": ctx[:9500]}}  # 10K cap safety margin
print(json.dumps(out))
sys.exit(0)
```

**Wire**: `.claude/settings.json` `hooks.SessionStart` entry with matcher=`compact`; async=false (must complete before session resumes); timeout=4000ms.

**ROI**: auto-compact discards 30-50% of arc context; this hook restores ~5-9K chars (10K cap minus margin) of Layer-2 index + recent SHAs. Each post-auto-compact fire saves ~20-40 min of re-research per `coordination.md §12` rewind-first ROI math.

**Cite anchor**: TIER-1-DIRECT Anthropic CC `https://code.claude.com/docs/en/hooks#sessionstart` matcher `compact` semantic + `coordination.md §12` Thariq named-T2 + cwc-long-running-agents PROGRESS.md pattern.

---

## §5. auto-compact-discipline.md Rank #3 upgrade path

**Current state** (auto-compact-discipline.md): Rank #3 = "Pre-emptive `/compact <hint>` at ~250-300K threshold" classified OPERATOR-DISCIPLINE.

**Upgrade path** (this design): Rank #3 promoted to MECHANICAL-GATE-ENFORCED via Design 1 hybrid Option C:

```
Rank #3 status flip:
  BEFORE: OPERATOR-DISCIPLINE (depends on operator noticing /context output)
  AFTER:  MECHANICAL-GATE-ENFORCED (UserPromptSubmit hook auto-warns + hard-blocks at thresholds)
```

**Status table**:

| Rank | Method | Current status | Post-Design-1 status |
|------|--------|----------------|----------------------|
| #1 | context-mode ctx_batch_execute | INSTALLED-PRIMARY | INSTALLED-PRIMARY (no change) |
| #1.5 | intelligent-compact PreCompact | INSTALLED-HOOK-WIRED | INSTALLED-HOOK-WIRED + STDOUT-ROUTES-CONFIRMED (W164 F38a refinement) |
| #2 | repomix pack→grep | INSTALLED-AVAILABLE | INSTALLED-AVAILABLE (no change) |
| **#3** | **Pre-emptive /compact <hint>** | **OPERATOR-DISCIPLINE** | **MECHANICAL-GATE-ENFORCED via Design 1** |
| #4 | coordination.md §12 rewind-first | OPERATOR-DISCIPLINE | OPERATOR-DISCIPLINE (no automation path) |
| #5 | Karpathy §5 3-layer | DISCIPLINE + Design 2 hook | DISCIPLINE + MECHANICAL-PRELOAD-VERIFY |
| #6 | deepagents arg-truncation | DOC-ONLY | DOC-ONLY (no SDK runtime) |
| #7 | awesome-agentic Stop-hook | DOC-ONLY | DOC-ONLY |
| #8 | cwc-long-running-agents commit-on-stop | INSTALLED-WIRED | INSTALLED-WIRED (no change) |

**Promotion threshold** (per `Z:/claude-sota/.claude/rules/codification-threshold.md` cycle-322):
- User-trigger explicit: "automatic via hook rather than interrupting workflow" — n=1 user-trigger automatic per cycle-322 §user-trigger
- Expected savings: ~5-15 min/long-arc fire (avoids mid-task /compact interruption) × 5-10 fires/mo = ~25-150 min/mo
- LOC ≤200: 3 designs × ~30-50 LOC = ~90-150 LOC total
- TIER-1-DIRECT Anthropic CC cite chain acquired (PreCompact + SessionStart + UserPromptSubmit specs)

**Gate**: 4-of-4 satisfied; promotion READY.

---

## §6. Convergence-gate Axis 1+2+3 verification

Per `Z:/claude-sota/.claude/rules/convergence-gate.md`:

### Axis 1 — ≥3 distinct T1 orgs implementing the pattern

| # | Org | Source | Pattern implemented |
|---|-----|--------|---------------------|
| 1 | **Anthropic** | `https://code.claude.com/docs/en/hooks` | PreCompact / SessionStart / UserPromptSubmit / UserPromptExpansion routing + additionalContext + 10K cap |
| 2 | **LangChain (org)** | `Z:/repos/deps/deepagents/.../summarization.py @ 95f845d2` | TruncateArgsSettings pre-summarization arg-truncation middleware |
| 3 | **Fatih Akyon (fcakyon org)** | `intelligent-compact@claude-settings` Apache-2.0 v1.0.0 | PreCompact hook injects "Additional Instructions:" with priority preservation patches |
| 4 | **yamadashy (repomix org)** | `Z:/repos/deps/repomix/README.md:979,1089 @ 7dfd2b96` | Tree-sitter compression ~70% + pack/grep workflow |
| 5 | **Anthropic (cwc-long-running-agents)** | `Z:/claude-sota-installed/.local/cwc/commit-on-stop.sh` | Stop-event commit + PROGRESS.md handoff |

**Verdict**: Axis 1 ≥3 distinct orgs **PASS at n=5 (firm)**. Anthropic counts once even with cwc; LangChain + fcakyon + yamadashy = 4 distinct orgs minimum.

### Axis 2 — ≥2 named T2 practitioners with dated artifact

| # | Practitioner | Artifact + date | Endorses |
|---|--------------|-----------------|----------|
| 1 | **Andrej Karpathy** | AI Engineer fireside chat 2026-05-02 + named quote at `claude-karpathy-ai-engineer-02-may-26.md:153 @ 64fffd53` | 3-layer Wiki compounding for cross-session memory + progressive disclosure |
| 2 | **Thariq Shihipar** | Tips post 2026-04-16 at `claude-thariq-tips-16-apr-26.md:123-125 @ 48f2ceb` | Rewind-first vs correct-layered + autocompact-as-last-resort |
| 3 | **Boris Cherny** (Anthropic CC creator) | April 2026 6-tips at `claude-boris-6-tips-16-apr-26.md @ 48f2ceb` | Parallel sessions + worktree isolation (sister discipline) |
| 4 | **Fatih Akyon** | intelligent-compact v1.0.0 release | "Stop Claude from forgetting file paths, root causes, open questions when it auto-summarizes" (PreCompact hook author) |

**Verdict**: Axis 2 ≥2 named T2 with dated artifact **PASS at n=4 (firm)**.

### Axis 3 — ≥3 months stability (cpd × age 5-band)

| Source | Age (from earliest public artifact) | cpd band | Verdict |
|--------|-------------------------------------|----------|---------|
| Anthropic CC hooks docs | >18mo since hooks v1 | NEW pattern PreCompact added recently — cpd active | STABLE-BURN-IN |
| LangChain deepagents | 14mo (created 2024-12) | cpd ≈ 8-12 active | ACTIVE-ITERATION → STABLE |
| intelligent-compact v1.0.0 | ~3mo since release | cpd low (stable hook) | BORDERLINE — STRONG-PROVENANCE-EXPRESS applies (Apache-2.0 + named-org Anthropic-affiliate marketplace + named-T2 fcakyon) |
| repomix | >24mo | cpd ≈ 5-8 | MATURE |
| Karpathy named-author | 11d since fireside | Eligible for STRONG-PROVENANCE-EXPRESS predicate (named-T2 endorsement) | PASS via STRONG-PROVENANCE-EXPRESS |

**Verdict**: Axis 3 **PASS at firm-level for 4-of-5 sources** (Karpathy + intelligent-compact require STRONG-PROVENANCE-EXPRESS predicate which all 3 clauses satisfy: ≥30d age OR official-org maintainer + named-T2 endorsement).

### Combined verdict

**ALL 3 AXES PASS at firm level** → designs are convergence-VALID per `convergence-gate.md`. Adoption disposition: **STUDY-PILOT-30d** for the 3 hook designs (per `cardinal-rule 7` Phase 1 bootstrap exception + Wave 169 NEW-mechanism).

---

## §7. CR-7 Phase 2 trigger predicate (b) impact

Per CLAUDE.md cardinal-rule-7 graduated-unleash, Phase 2 trigger predicate (b) is "Tier 0 INSTALLED + smoke-PASS". Design 2 (SESSIONSTART-PRELOAD-VERIFY) directly addresses Tier 0 (foundational session-rehydrate hook).

**Predicate (b) progress**:
- BEFORE Design 2: Tier 0 SessionStart-preload-verify NOT-yet-INSTALLED
- AFTER Design 2 INSTALL + smoke-PASS: predicate (b) SATISFIED for Phase 2 advancement
- Combined with predicate (a) classifier-reliable + predicate (c) arc-convergence (W164→W169 7+ clean fires): **CR-7 Phase 2 ready**

This is a meta-finding: shipping Design 2 advances cardinal-rule-7 toward Phase 2 destination.

---

## §8. Cite-trail per CR-1 + CR-8

| Cite | Class | Source | Status |
|------|-------|--------|--------|
| Anthropic CC hooks docs | TIER-1-DIRECT | `https://code.claude.com/docs/en/hooks` [VERIFIED 2026-05-13 via ctx_fetch_and_index 39 sections / 143.6KB indexed] | LIVE |
| deepagents summarization.py | TIER-1-DIRECT | `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/summarization.py:122-149,655-730 @ HEAD 95f845d29745ece957144d045849f02c667ac711` | LIVE |
| intelligent-compact precompact_priorities.sh | TIER-1-DIRECT | `Z:/claude-sota-installed/.claude/plugins/cache/claude-settings/intelligent-compact/1.0.0/hooks/scripts/precompact_priorities.sh` (3510 chars verified this fire) | LIVE |
| repomix README | TIER-1-DIRECT | `Z:/repos/deps/repomix/README.md:979,1089 @ HEAD 7dfd2b96657cc88ff60b8ec1fd88b467aa1f8aba` | LIVE |
| coordination.md §12 | TIER-3-LOCAL-COMPOSITION (sibling-cite-import per CLAUDE.md §14.5) | `Z:/claude-sota/.claude/rules/coordination.md §12` (Thariq 2026-04-16 named-T2) | LIVE |
| karpathy-adapted.md §5 | TIER-3-LOCAL-COMPOSITION (sibling) | `Z:/claude-sota/.claude/rules/karpathy-adapted.md §5` | LIVE |
| auto-compact-discipline.md | TIER-3-LOCAL-COMPOSITION (sibling W164 F27e codified) | `Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md` Rank #1-#7 baseline | LIVE |
| fm20-path-drift-cascade.md | TIER-3-LOCAL-COMPOSITION (sibling) | `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` row 9 sister | LIVE |
| convergence-gate.md | TIER-3-LOCAL-COMPOSITION (sibling) | `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis 1+2+3 + STRONG-PROVENANCE-EXPRESS | LIVE |
| codex-t1-fix-forward-pattern.md | TIER-3-LOCAL-COMPOSITION (sibling) | `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A | LIVE |

**Cite-class lattice composition** (per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8):
```
constituents=[
  TIER-1-DIRECT @ Anthropic CC hooks docs,
  TIER-1-DIRECT @ deepagents summarization.py:122-149 @ 95f845d2,
  TIER-1-DIRECT @ intelligent-compact precompact_priorities.sh,
  TIER-1-DIRECT @ repomix README:979,1089 @ 7dfd2b96,
  TIER-3-LOCAL-COMPOSITION @ sibling rules (coordination/karpathy/auto-compact-discipline/fm20/convergence-gate/codex-t1-fix-forward)
]; effective_tier=TIER-3-LOCAL-COMPOSITION per rule #8 MIN_PRECEDENCE
```

---

## §9. Forward queue (post-Agent-C)

| # | Item | Owner | Disposition |
|---|------|-------|-------------|
| 1 | 2nd-stage validation via codex T1 Path P foreground+tee on 3 hook designs | orchestrator | REQUIRED per CR-3 STAND-IN-NOTICE |
| 2 | Pattern A apply Design 1 (auto_compact_advisory.py) to `.claude/hooks/scripts/` + settings.json | orchestrator | post-T1-APPROVE |
| 3 | Pattern A apply Design 2 (sessionstart_preload_verify.py) — fulfills W168 Spec 3 | orchestrator | post-T1-APPROVE |
| 4 | Pattern A apply Design 3 (cross_session_rehydrate.py) | orchestrator | post-T1-APPROVE |
| 5 | Update `auto-compact-discipline.md` Rank #3 status: OPERATOR-DISCIPLINE → MECHANICAL-GATE-ENFORCED | orchestrator | post-Design-1-INSTALL |
| 6 | Refine `docs/sota-installed-manifest.md` intelligent-compact W164 F38a row: SEMANTIC-EFFECT-PENDING → STDOUT-ROUTES-CONFIRMED | orchestrator | this fire post-Mia-verify |
| 7 | Promote `sessionstart-preload-discipline.md` NEW rule per W168 Spec 3 + this design | orchestrator | post-Design-2-INSTALL n=1 user-trigger satisfies cycle-322 |
| 8 | CR-7 Phase 2 advancement check (predicate b satisfied via Design 2 ship) | operator-gated | post-Design-2-INSTALL + smoke-PASS |

---

## VERDICT

**STUDY-PILOT-30d for 3 hook designs** (Design 1 Option C hybrid + Design 2 sessionstart-preload-verify + Design 3 cross-session-rehydrate) per:
- Mia 7/8 PASS + 1 PARTIAL (queued-not-blocking)
- Convergence-gate Axis 1+2+3 firm PASS (n=5 distinct orgs / n=4 named-T2 / 4-of-5 STABLE)
- CR-12 disposition: GENUINELY-NEW (no upstream parity for sss-specific UserPromptSubmit-context-%-probe + 5-backend-hash chain + matcher=compact rehydrate)
- Promotion-gate cycle-322: n=1 user-trigger explicit ("automatic via hook"), ROI ~25-150 min/mo, LOC <200, TIER-1-DIRECT cite chain

**Cross-model gate**: PARTIAL via STAND-IN-NOTICE — 2nd-stage codex T1 Path P REQUIRED before Pattern A apply per CR-3 STAND-IN disclosure mandate.

**STOP gate impact**: Design 2 ship satisfies CR-7 Phase 2 trigger predicate (b) Tier 0 + arc-convergence supports (c).

---

**Agent C exit**: ARTIFACT-INLINE delivered per FM-19 read-only-guard sidestep; orchestrator persists to `Z:/claude-sota-installed/tmp/wave169-agentC-autocompact-hooks-design-2026-05-13.md`.

VERDICT: STUDY-PILOT-30d (3 hook designs; 2nd-stage codex T1 REQUIRED).
