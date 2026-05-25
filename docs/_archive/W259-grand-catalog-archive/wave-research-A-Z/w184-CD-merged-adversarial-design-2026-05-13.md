## VERDICT: C-Adversarial

Repo HEAD for local anchors: `9c7721c41a4340b53e63631c3495d2bc431a0644`.

### Q1 answer

Agent B hypothesis: **PARTIAL / not sufficient as primary root cause**.

Measured/default Stop-hook emission:

| Hook | Default/current probe | Blocking/error path size | Cite |
|---|---:|---:|---|
| `auto_proceed_gate.py` | 0 stdout / 0 stderr | 644B stdout JSON on synthetic ask-without-act block; stderr only latch/telemetry errors | `.claude/hooks/scripts/auto_proceed_gate.py:285,296,625-626 @ 9c7721c` |
| `commit-on-stop-throttled.sh` | wrapper normally 0; safe probe blocked by Git Bash startup error outside script | debug skip line ~51B; upstream commit redirects commit stdout/stderr to `/dev/null` | `.claude/hooks/scripts/cwc/commit-on-stop-throttled.sh:55-63 @ 9c7721c`; `.local/cwc/.../commit-on-stop.sh` redirects at commit line |
| `stop-review-gate-hook.mjs` | 0 stdout / 0 stderr under current config probe | fixed block reasons ~141-149B, plus unbounded child stderr/stdout on failure path | `.claude/plugins/marketplaces/openai-codex/plugins/codex/scripts/stop-review-gate-hook.mjs:30,37,121-126,177-181 @ 9c7721c` |
| `codex_stuck_detector.py` | 0 stdout / 0 stderr under current state probe | per event line tens to low hundreds of bytes; sample kill/janitor/bridge lines total ~265B | `.claude/hooks/scripts/codex_stuck_detector.py:86-88,130-133,186-197,264-292 @ 9c7721c` |

Conclusion: **Stop-hook chain re-inflation is not sound for explaining compact-at-40% by byte volume alone**. The measured steady-state chain emits 0B; even common exceptional paths are sub-KB except `stop-review-gate-hook.mjs` when it embeds unbounded child output.

Important correction: `CLAUDE.local.md` has the override commented at line 94, but `.claude/settings.json` still sets `"CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "70"` at line 25. Runtime env may still be active despite the W183 local-file revert note. Cite: `CLAUDE.local.md:86-94 @ 9c7721c`; `.claude/settings.json:25 @ 9c7721c`.

Alternative root causes with higher prior than Stop stderr:

1. **Active settings override / config split-brain**: local doc says reverted, settings env says 70. A 40% observed trigger could be denominator/model-window confusion, statusline percent basis, or inherited env collision, but this split-brain must be resolved before blaming hooks.
2. **MCP/tool-list injection**: 11 MCPs wired, `MAX_MCP_OUTPUT_TOKENS=50000`, `BASH_MAX_OUTPUT_LENGTH=100000`. Tool schema + server reconnect + output budget can dwarf Stop stderr. Cite: `.mcp.json:1-100 @ 9c7721c`; `.claude/settings.json:29-31 @ 9c7721c`.
3. **Session preload/rule layer**: AGENTS/CLAUDE/rules + lazy-loaded rules + large memory index risk. `architecture-audit-scorecard.md` records `MEMORY.md` at 706 lines / 2.8MB. Cite: `docs/architecture-audit-scorecard.md:71 @ 9c7721c`.
4. **Skills/plugin injection**: many enabled plugins; skills and plugin hooks can add tool definitions and startup context. Cite: `.claude/settings.json:526-665 @ 9c7721c`.
5. **PreCompact preservation stack**: expected to emit small targeted material, not huge Stop stderr. Rule says context-mode PreCompact snapshot is `<2KB`. Cite: `.claude/rules/auto-compact-discipline.md:72-83 @ 9c7721c`.

### Q2 answer

Likely culprit ranking for context re-injection:

| Rank | Hook | Impact | Rationale |
|---:|---|---|---|
| 1 | `stop-review-gate-hook.mjs` | **MEDIUM normally / HIGH on child failure** | Only Stop hook with unbounded propagation of child `stderr || stdout` into block reason. If Codex task fails noisily, it can inject large JSON reason. Current config probe emitted 0B. |
| 2 | `auto_proceed_gate.py` | **MEDIUM** | Emits a 644B stdout block JSON when assistant asks instead of acting; can re-engage model. Not enough for large re-inflation by itself, but can cause extra turns. |
| 3 | `codex_stuck_detector.py` | **LOW-MEDIUM** | Emits only on stale-kill/janitor/bridge errors. Current state emitted 0B; event lines are small. |
| 4 | `commit-on-stop-throttled.sh` | **LOW** | Wrapper silent unless debug; upstream commit output is redirected to `/dev/null`. Primary risk is side effect/autocommit, not context bytes. |

### Q3 answer

Agent B Pattern A fix-forward has **REVERT-AND-REMOVE edge cases**.

Removing only `CLAUDE.local.md` override was incomplete because `.claude/settings.json` still exports `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70`. If auth-fleet collapse was the root cause, reverting aggressive compaction was directionally reasonable, but not sufficient as implemented and not proven as the causal fix.

Scenarios where the fix worsens outcomes:

- If auth fleet is healthy and long-arc sessions approach rot, returning to blind ~80% autocompact violates the local SOTA recipe: pre-emptive `/compact <hint>` around 250k and stop new work around 300k. Cite: `.claude/rules/auto-compact-discipline.md:61-69,130-139 @ 9c7721c`.
- If settings.json still overrides to 70, operators believe revert happened while runtime still compacts early.
- If compact loss came from preload/MCP/tool-schema injection, changing percent threshold does not remove the injected budget.
- If auth fleet is dead, any threshold can be bad because post-compact reconstruction cannot be delegated. Threshold must be gated on fleet health, not set globally.

## DESIGN-FINAL: D-Matrix

### D1 compact reform - winner recommendation

Winner: **Option C as policy + Option B as targeted hardening; do not ship Option A until env split-brain and auth predicate are live-verified.**

| Option | SOTA cite anchor | LOC delta est. | Reversibility | Primary failure mode |
|---|---|---:|---|---|
| A. Re-enable 75-78% with auth-health predicate | Local recipe rejects blind 80% and prefers pre-emptive `/compact <hint>`: `.claude/rules/auto-compact-discipline.md:61-69,130-139 @ 9c7721c`; split-brain evidence `.claude/settings.json:25` vs `CLAUDE.local.md:94` | 20-60 LOC if launcher/settings predicate only; 80-140 if health probe added | HIGH | Predicate lies stale; env var unverified; healthy-auth check passes while model/tool preload still bloated |
| B. Stop-hook re-inflation defense | Anthropic hook contract pattern is stdout JSON block / stderr notes; local high-risk source is `stop-review-gate-hook.mjs:121-126,177-181 @ 9c7721c` | 25-80 LOC | HIGH | Truncation hides actionable failure detail or changes block semantics |
| C. SOTA pattern Rank #1-#3 | `ctx_batch_execute` Rank #1, repomix Rank #2, pre-emptive compact Rank #3: `.claude/rules/auto-compact-discipline.md:32-69 @ 9c7721c`; repomix cite `Z:/repos/deps/repomix/README.md:979,1089 @ b9970613`; deepagents arg truncation `Z:/repos/deps/deepagents/.../summarization.py:122-149 @ 95f845d2` | 0-30 LOC if discipline/runbook; 80-160 if statusline/hook reminder | HIGH | Operator discipline drift; manual `/compact <hint>` skipped during long autonomous arcs |

Recommended sequence:

1. **Mia first**: verify runtime env source of truth: settings env, launcher env, process env.
2. **Adopt C immediately**: route high-output probes through context-mode/repomix and compact with hints before rot.
3. **Add B narrow guard**: cap `stop-review-gate-hook.mjs` child failure detail to e.g. 2KB + path pointer.
4. **Reconsider A only after** OAuth healthy count >0 and measured compact reclaim recovers; use 75-78%, not 70.

### D2 memory stack - winner recommendation

Winner: **Option A verify-only smoke now. Defer claude-mem install; consider Option C only behind scale trigger.**

| Option | SOTA cite anchor | LOC delta est. | Reversibility | Primary failure mode |
|---|---|---:|---|---|
| A. Verify-only current mcp-memory + graphiti | `.mcp.json:52-87 @ 9c7721c`; `docs/4class-memory-taxonomy-discipline.md:29,41,86-89,131-136 @ 9c7721c`; `docs/install-provenance.md:24503-24504,24537-24538,24572-24577 @ 9c7721c` | 0-20 LOC artifact/provenance only | HIGH | Smoke passes shallow path but recall quality remains unmeasured |
| B. Install claude-mem | Upstream `https://github.com/thedotmack/claude-mem`; local cite `Z:/repos/deps/claude-mem/README.md:123-157,171-176,223-236,275-287 @ 13d5fa7`; plugin metadata `Z:/repos/deps/claude-mem/.claude-plugin/plugin.json:2-9 @ 13d5fa7`; package repo/license `package.json:2-24 @ 13d5fa7` | Repo is ~99,455 lines across tracked js/ts/json/md; eee integration likely 30-120 LOC settings/provenance plus external plugin state | MEDIUM | Duplicates current memory stack; adds 5 lifecycle hooks, worker service on 37777, SQLite + Chroma/vector dependencies, context injection unpredictability |
| C. Active-passive L1 mcp-memory + L2 claude-mem overflow | Same as A+B; local scale trigger from W169 says keep incumbents at current small scale: `docs/install-provenance.md:24577 @ 9c7721c` | 80-200 LOC if routing/overflow discipline; more if automated | LOW-MEDIUM | Two memory authorities conflict; stale/contradictory recall; hard-to-debug token injection and privacy surface |

Recommendation:

- Run verify-only smoke: `mcp-memory` store/search and graphiti add/search against group `eee`.
- Do not install claude-mem in W184 unless smoke fails in a way claude-mem uniquely solves.
- Define scale trigger for C: >=100k memories, >=1GB memory DB, p95 recall >100ms, or multi-process named workflow requiring overflow.

## Mia pre-apply checklist

- Verify `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` in all runtime sources: `CLAUDE.local.md`, `.claude/settings.json`, launcher process env, live `eee` child env.
- Verify OAuth/auth fleet predicate: healthy OAuth accounts >0 before any compact threshold override.
- Probe Stop hooks with current runtime payload and byte-count stdout/stderr before editing.
- For `stop-review-gate-hook.mjs`, verify `stopReviewGate` config state and whether child failure output can exceed 2KB.
- For CWC hook, verify no dirty tracked files before any non-disabled run; never let test invoke upstream autocommit path.
- Verify MCP preload/tool-list size and `MAX_MCP_OUTPUT_TOKENS` before blaming Stop hooks.
- Smoke `mcp-memory`: store one namespaced W184 fact, search it, delete/mark test if supported.
- Smoke graphiti: add one W184 episode to group `eee`, search by exact title, confirm Falkor/Ollama are reachable.
- Before claude-mem install: verify upstream HEAD, license, Windows support, hook list, worker port collision, token injection size, and current incumbent failure it uniquely fixes.

## Convergence assessment

C findings agree with D recommendations.

Agent B correctly noticed a plausible re-inflation class, but measured Stop-hook output does **not** support it as the primary cause of compact-at-40%. The strongest immediate finding is config split-brain: local revert commented the override, settings still exports 70. Therefore D1 should not blindly re-enable another threshold; it should first restore source-of-truth clarity, follow the existing SOTA compact recipe, and add narrow truncation only to the one Stop hook with unbounded child-output propagation.

For memory, the same pattern holds: current mcp-memory + graphiti are already installed/wired enough to verify. Adding claude-mem before smoke failure would stack another context-injection system on top of an already-bloated runtime. Verify first, install only on a proven gap.
