# W341 Stream E — Agent-Orchestration Audit (2026-05-20)

> Parent wave: W341-FULL-SOTA-UNLEASH. Stream E scope: agent-team orchestration silent-fallback diagnosis.
> Budget: ≤15 calls / ≤140k tokens.

## §1 parallel_ratio empirical measurement

**Reproducible probe**: `node tools/parallel-ratio-telemetry.mjs` (run 2026-05-20T19:42:44Z)
**Result**: `{"window":"30d","denom":1943,"parallel_ratio":0.0031,"distribution":{"1":1937,"2":2,"3":4,"4+":0},"target":">=0.3","status":"BELOW"}`

- Denominator advanced **W325-A 1676 → 1943 turns (+267)**; parallel_ratio drifted **0.0036 → 0.0031** (worsened, NOT recovered).
- 99.69% solo-Agent dispatch (1937/1943); only 2 turns w/ exactly 2 Agent blocks + 4 turns w/ 3 Agent blocks; ZERO turns 4+.
- W331 P0.1 race-fix (tick-file POSIX-atomic-append, L297-311 of `tools/preagent-parallel-guard.mjs`) is wired but EMPIRICALLY UNDER-FIRING — measured ratio still SEV-1.
- **SEV-1 PERSISTS**. Source: `tools/parallel-ratio-telemetry.mjs` + JSONL at `Z:\claude-sota-installed\.claude\projects\Z--claude-sota-installed\*.jsonl`.

## §2 preagent-guard binding status

**Wired**: `.claude/settings.json:166-180` PreToolUse[Agent] runs both guards via Node.

- **`tools/preagent-parallel-guard.mjs`**: BINDING (`exit 2` at L398) but on **2nd consecutive solo-dispatch violation per session** (L382-399). 1st violation = advisory `exit 0` (L406). Reset on parallel evidence (≥2 Agent in 1 turn, L327-333 / L351-356) or 5-min idle (L375-377). Escape hatch: `CLAUDE_PARALLEL_GUARD_DISABLE=1` env (L251) or marker file `.claude/state/parallel-guard-bypass.marker` (L267-269).
- **`tools/preagent-subagent-validator.mjs`**: BINDING (`exit 2` at L97) on unknown `subagent_type`; soft-fail `exit 0` only if allowlist file missing/unparseable (L108-114). Built-in allowlist: `Explore, Plan, Sonnet-only, general-purpose` (L32).
- **Gap**: parallel-guard binding requires `MULTI_STREAM_RE` regex match (L42-43) on userText or last-assistant-text. If operator omits the trigger words ("audit/review/sweep/Stream X/in parallel/fan-out/investigate"), guard EXITS 0 silent (L368-372). Likely cause of `parallel_ratio=0.0031`: this audit-message DID match (multi-stream wording present) BUT prior 30d window includes many serial dispatches in contexts that didn't trigger the regex.

## §3 allowlist drift

`.claude/state/subagent-type-allowlist.json`: `allow_count=173 + legacy_bare_aliases=138 = 311 total`, `colliding_bare_names=13` (matches CLAUDE.md L37 claim).

- W340 F3/F4 closure is HELD: validator merges `allow[]` ∪ `legacy_bare_aliases[]` per `tools/preagent-subagent-validator.mjs:50-66`.
- Allowlist file lacks `generated_at` timestamp (probe returned `unknown`) — schema field is `last_built`/`metadata.generated_at`, not present. **MINOR-GAP**: freshness ungovernable without timestamp; recommend adding `generated_at` to `tools/build-subagent-allowlist.mjs` output schema. Hard cache-validity probe would require re-running the builder + diffing.
- No orphan/missing audit performed in this stream (Glob ENAMETOOLONG on plugins cache; deferred to allowlist-builder dry-run).

## §4 FQN-discipline bare-name violations

**Local skills + commands**: ZERO bare-`subagent_type` literal assignments in `.claude/commands/**/*.md` or `.claude/skills/**/SKILL.md` (Grep for `subagent_type=\"<bare>\"` returned no matches). All references are documentation/prose, not live dispatch literals.

**One MUST-FIX in `.claude/skills/sota-convergence-audit/SKILL.md:141`** — uses FQN `engineering-skills:adversarial-reviewer` (correct), confirming FQN-discipline is being followed in operator-curated skills.

**One ambiguous in `.claude/skills/improve-codebase-architecture/SKILL.md:39`**: `subagent_type=Explore` — `Explore` is a built-in (allowed). OK.

**Colliding bare names (13, from allowlist JSON `colliding_bare_names[]`)**:
1. `architect` → [everything-claude-code, ship-mate]
2. `code-architect` → [everything-claude-code, feature-dev]
3. `code-explorer` → [everything-claude-code, feature-dev]
4. `code-reviewer` → [comprehensive-review, everything-claude-code, feature-dev, incident-response, pr-review-toolkit, tdd-workflows] **(6-way collision)**
5. `code-simplifier` → [code-simplifier, everything-claude-code, pr-review-toolkit]
6. `comment-analyzer` → [everything-claude-code, pr-review-toolkit]
7. `context-manager` → [agent-orchestration, context-management]
8. `conversation-analyzer` → [everything-claude-code, hookify]
9. `debugger` → [debugging-toolkit, incident-response]
10. `pr-test-analyzer` → [everything-claude-code, pr-review-toolkit]
11. `security-auditor` → [code-modernization, comprehensive-review]
12. `silent-failure-hunter` → [everything-claude-code, pr-review-toolkit]
13. `type-design-analyzer` → [everything-claude-code, pr-review-toolkit]

**Routing risk**: dispatch with bare `code-reviewer` (6-way) is non-deterministic per CLAUDE.md L34 (W333-D-5). No live-dispatch usage detected, but session-transcripts not scanned (denom 1943 JSONL; multi-session search out of stream budget).

## §5 agent-teams wiring liveness

- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` PRESENT at `.claude/settings.json:9`.
- `teammateMode: "in-process"` set at `.claude/settings.json:496`.
- Skills surfaced via system-reminder confirm all 7 agent-teams commands are reachable: `agent-teams:team-spawn / team-debug / team-feature / team-review / team-delegate / team-status / team-shutdown`.
- Plugin cache root: `Z:\claude-sota-installed\.claude\plugins\cache\claude-code-workflows\` (parent of `agent-teams`).
- Plugin enabled at `.claude/settings.json:333` (`"agent-teams@claude-code-workflows": true`).
- **DRY-RUN status**: did NOT actually `/team-spawn` (out-of-stream; would burn budget + side-effect TaskList). Path verified — no silent fallback observable at config level.

## §6 mailbox tool availability

- `TaskStop` — schema LOADED via ToolSearch (params: `task_id`).
- `TaskCreate` / `TaskGet` / `TaskList` / `SubagentCreate` / `TeamCreate` — **NOT FOUND** in deferred-tool registry (ToolSearch `select:` returned "No matching deferred tools"). These are docs-cited primitives but **NOT currently exposed as MCP/native tools in this runtime**. Likely accessed indirectly through `Agent` tool + `agent-teams` plugin's internal Task object.
- **Implication**: mailbox is an `agent-teams` plugin-internal abstraction; the orchestrator interacts via `Agent({subagent_type: "agent-teams:team-lead"})` or `/team-*` slash commands, not via direct TaskCreate primitives.

## §7 D76-D78 skill liveness

All THREE skills available in current system-reminder skill list:

- **D76 / Δ-G49 `empty-final-message-guard`**: ACTIVE — auto-fires on "synthesize results / collect findings / merge teammate outputs / subagent completed / team-spawn / team-debug / team-review / team-feature". SKILL.md present at `.claude/skills/empty-final-message-guard/SKILL.md`.
- **D77 / Δ-G50 `worker-failure-termination-guard`**: ACTIVE — fail-CLOSED on subagent exception / non-zero / errored status. SKILL.md present at `.claude/skills/worker-failure-termination-guard/SKILL.md`.
- **D78 `agent-budget-discipline`**: ACTIVE — mid-loop budget guards (max-message/token/time) per microsoft/autogen v0.4. SKILL.md present at `.claude/skills/agent-budget-discipline/SKILL.md` + `references/autogen-conditions.md`.

## §8 P0 silent-fallback closures (recommendations)

1. **P0-E1**: parallel_ratio still SEV-1 at **0.0031** (worse than W325-A 0.0036) despite W331-r3 multi-stream-intent flag + W333-P0-a race-free tick file. Root cause likely BOTH: (a) `MULTI_STREAM_RE` regex too narrow → many silent-pass exit-0 paths at L368-372 of parallel-guard; (b) most multi-stream operator prompts don't include guard's keyword set. **Fix**: broaden `MULTI_STREAM_RE` (add "diagnose|map|enumerate|sweep across|each of|across N") AND lower binding threshold from 2nd-violation to 1st-violation when explicit Stream-X markers present in user prompt.
2. **P0-E2**: Allowlist file missing `generated_at` timestamp — freshness uncheckable without rebuild. **Fix**: add `generated_at: <ISO>` to `tools/build-subagent-allowlist.mjs` output.
3. **P0-E3**: 13 colliding bare names enumerated but NO CI enforcement preventing future bare-name dispatch in skills/commands/transcripts. **Fix**: extend `tools/preagent-subagent-validator.mjs` to WARN when bare-name in colliding-set submitted (suggest FQN form); add to pre-commit-config grep over `.claude/skills/**` + `.claude/commands/**` for `subagent_type=<bare>` literals.
4. **P0-E4**: `TaskCreate/TaskGet/TaskList` not exposed as deferred tools — operator cannot manually inspect mailbox state outside `/team-status`. **Fix-or-doc**: clarify in CLAUDE.md/agent-teams docs that mailbox is plugin-internal, OR vendor an MCP shim exposing `mcp__agent-teams__task_*` primitives.

## §9 cite-anchors

- `tools/parallel-ratio-telemetry.mjs:1-N` (executable; W340 baseline scanner)
- `tools/preagent-parallel-guard.mjs:42-43,251,267-269,327-333,351-356,368-372,375-377,382-399,406` (regex, hatches, reset logic, blocking ladder)
- `tools/preagent-subagent-validator.mjs:32,50-66,97,108-114` (BUILTIN set, allowlist merge, block, soft-fail)
- `.claude/settings.json:9` `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
- `.claude/settings.json:166-180` PreToolUse[Agent] dual-guard wiring
- `.claude/settings.json:333,496` agent-teams plugin enabled + teammateMode
- `.claude/state/subagent-type-allowlist.json:colliding_bare_names[]` (13 entries; W340 F4 closure)
- `.claude/skills/{empty-final-message-guard,worker-failure-termination-guard,agent-budget-discipline}/SKILL.md` (D76-D78 active)
- CLAUDE.md L16 (W269 mandate), L19 (4 parallel modes), L34 (W329-D / W340 F4 13-collision claim), L37 (allowlist counts)
- W325-A F1 prior baseline 0.0036/1676 turns (root-line in CLAUDE.md L19)
- Probe timestamp: 2026-05-20T19:42:44Z

STATUS: COMPLETE
