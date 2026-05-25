# W314-C — Paste-Ready CLAUDE.md / settings.json Refinements (2026-05-19)

> Stream C / W314 ship. 5 paste-ready edits for parent orchestrator to apply at W314 close. Each is cardinal-rule-conformant, settings.json-byte-budget-aware (current 15,035 / 15,360 limit), and cite-anchored.

---

## Refinement #1 — Lift W269 parallel-Agent-dispatch mandate into a real auto-fire skill

**Rationale**: parallel_ratio 0.587 (W314 measurement) ≡ 0.584 (W312 baseline) ≡ no improvement from CLAUDE.md prose. Anthropic docs `https://code.claude.com/docs/en/skills` mandate that behavioral discipline live in plugin-loaded skills with `description:`-match auto-fire, NOT in pointer prose.

**Action**: create `.claude/skills/parallel-dispatch-mandate/SKILL.md` — local operator-curated skill (cardinal-rule-4-compliant per W308 reversal already in CLAUDE.md L34).

**File body** (paste as-is):

```markdown
---
name: parallel-dispatch-mandate
description: W269 parallel-Agent-dispatch enforcement. Use when the user prompt contains 2+ independent workstreams, mentions "audit", "review", "research", "sweep", "fan-out", "in parallel", "Stream A/B/C", "investigate", "verify across", "compare", or asks for parallel work on independent files/dimensions. Fires BEFORE any Agent/Task tool call in multi-stream contexts.
---

# W269 Parallel-Dispatch Mandate (auto-fire)

## When this skill activates

Any user prompt where 2+ independent workstreams exist. Heuristic triggers:
- explicit "Stream A", "Stream B" enumeration
- "in parallel", "fan-out", "parallel sweep"
- "audit X across", "review N candidates", "research M sources"
- 2+ independent files / dimensions / repos named for investigation

## Mandatory behavior

When the orchestrator dispatches subagents for ≥2 of these streams:
1. MUST issue 2+ Agent (or Task) tool_use blocks in a SINGLE assistant message.
2. MUST NOT issue them across separate assistant messages (silent-serial fallback).
3. Solo serial dispatch is only acceptable when streams have hard sequential dependencies — and the orchestrator MUST explicitly note "single-target dependent stream, parallel impossible".

## Why

- W312-D 1586-JSONL audit measured 29% silent-serial-fallback failure rate.
- W314 re-measurement (post W269-tightening in CLAUDE.md prose only) showed parallel_ratio 0.587 vs 0.584 baseline — no improvement.
- Target ≥0.7 per W269 mandate.

## Compliance check (self-verify before any Agent dispatch)

- [ ] Does the prompt contain 2+ independent workstreams?
- [ ] If yes, am I issuing all Agent calls in ONE assistant message?
- [ ] If issuing serial Agent calls, did I explicitly justify "sequential dependency"?

## References

- `https://code.claude.com/docs/en/skills` — auto-fire description-match
- `superpowers:dispatching-parallel-agents` skill — companion pattern
- CLAUDE.md L19 — operator mandate
- `docs/architecture/W314-SILENT-FALLBACK-V5-AGENT-TEAM/W314-C-PARALLEL-RATIO-MEASUREMENT.md` — empirical baseline
```

**Cite-anchor**: `https://code.claude.com/docs/en/skills @ HEAD ac0d87d`.

---

## Refinement #2 — Fix CLAUDE.md cite drift: `wshobson-agents` → `claude-code-workflows`

**Location**: `CLAUDE.md` L19 + W312 status block paragraph 3.

**Current**: `wshobson-agents/agent-teams@1.0.2 silent-drift CLOSED-RESOLVED`

**Replacement** (drop-in):

```
claude-code-workflows:agent-teams@1.0.2 (author Wshobson, marketplace-shipped via Anthropic claude-code-workflows) silent-drift CLOSED-RESOLVED — PR #535 merged 2026-05-17, SHA-pin `08ded5e7b0fe` matches upstream HEAD exactly.
```

**Why**: Physical plugin location is `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/`. The slug used by `enabledPlugins["agent-teams@claude-code-workflows"]: true` matches the marketplace, NOT the author. Future auditor following the wshobson-agents cite would fail to find the plugin.

**Byte cost**: −0 to +60 bytes — fits within settings.json budget (15,035 / 15,360).

---

## Refinement #3 — Enable `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in settings.json env

**Location**: `.claude/settings.json:env` block.

**Action**: append one entry to the env object. Stream A owns the edit (cardinal-rule-1 file ownership). Paste-ready key/value:

```json
"CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
```

**Why**: `agent-teams/1.0.2/commands/team-spawn.md` L12-14 declares pre-flight gate. Without the env var, /team-spawn ALWAYS aborts at pre-flight with a generic message. This is the structural cause of W312-D F2's "agent-teams-primitive unused since W289" — operator was silently blocked. Setting it brings the primitive online without further code change.

**Cite**: `agent-teams/1.0.2/commands/team-spawn.md:12-14 @ plugin-version 1.0.2`.

**Risk**: opt-in experimental feature flag. Reversibility: delete the env var. ~10 seconds.

**Byte cost**: +49 bytes (key + value + comma). Settings.json post-edit: 15,084 / 15,360 — still under cap.

---

## Refinement #4 — Refresh cognee data-dir cite (close W312 operator-AI-7)

**Location**: `CLAUDE.md` L40 ("Runtime state" section, T3 cognee entry).

**Current**: `data-dir cite C:/Users/42/.cognee VERIFIED MISSING on disk per W312-A §4 A.7 — operator-AI-W312-A-7: inspect NSSM PathName and refresh cite to actual data-dir`

**Replacement** (drop-in):

```
data-dir at Z:/claude-sota-installed-state/cognee/{data,databases,logs,models,tmp} — VERIFIED 2026-05-19 W314-C via filesystem inspection + NSSM `CogneeMCP` SERVICE_RUNNING handshake (HTTP POST initialize at `:8000/mcp` returns serverInfo `Cognee 1.26.0`). Closes W312-A AI-7.
```

**Why**: stream verified NSSM is live, handshake succeeds, data dir located. The CLAUDE.md AI is closeable.

**Byte cost**: net −80 bytes (replaces longer-than-fix text). CLAUDE.md goes 48 → 48 LOC (under 50-LOC cap).

---

## Refinement #5 — Document ECC_DISABLED_HOOKS rationale

**Location**: `.claude/settings.json` add `_comment_w314c_ecc_disables` key OR append a CLAUDE.md pointer line.

**Action**: paste-ready `_comment_*` key to settings.json (cardinal-rule-conformant per existing `_comment_provenance_trail` pattern):

```json
"_comment_w314c_ecc_disables": "W314-C 2026-05-19 — ECC_DISABLED_HOOKS rationale: (1) pre:edit-write:gateguard-fact-force = blocks edits while quizzing; runtime prioritizes flow over interrogation. (2) post:edit:design-quality-check = duplicate of plugin-skill auto-fire. (3) pre/post:observe:continuous-learning = continuous-learning v2 active separately via skill. (4) post:session-activity-tracker = duplicated by Anthropic native session tracking. (5) stop:evaluate-session/cost-tracker/desktop-notify = duplicated by codex Stop-hook adversarial-review gate + ccusage MCP. Each disable is intentional and replaceable by inverting one env-list entry."
```

**Why**: F-SS-5 — undocumented disables silently mislead future auditors. The W314 fix is cite-trail discipline, not a code change.

**Byte cost**: +750 bytes — pushes settings.json to ~15,830 (over 15,360 cap). **Alternative**: add a CLAUDE.md pointer line `ECC disables rationale: docs/architecture/W314-SILENT-FALLBACK-V5-AGENT-TEAM/W314-C-SILENT-FALLBACK-V5-FINDINGS.md §F-SS-5` (one line, ~110 bytes, keeps settings.json within cap). **Recommended**: the CLAUDE.md pointer.

---

## Order-of-application recommendation

1. **First**: Refinement #4 (closes W312 AI; trivial). 
2. **Second**: Refinement #2 (CLAUDE.md cite drift fix; trivial).
3. **Third**: Refinement #3 (settings.json env addition; activates agent-teams). Stream A coordinates.
4. **Fourth**: Refinement #5-alternate (CLAUDE.md pointer line). Stream A coordinates.
5. **Fifth**: Refinement #1 (create the parallel-dispatch-mandate skill). Highest impact for parallel_ratio gap closure.

All five together: net **+0 byte settings.json delta** (#3 +49B, #5-alt 0B in settings.json), net **+1 LOC CLAUDE.md** (#5-alt only, leaving CLAUDE.md at 49 LOC — still under 50-LOC cap), and one new skill directory under `.claude/skills/parallel-dispatch-mandate/`.

## Invariants preserved

- CLAUDE.md ≤50 LOC (post-edit: 49 LOC) ✓
- settings.json ≤15.36 KB (post-edit: 15,084 bytes) ✓
- `self_invented_count: 0` (skills are operator-curated per W308 reversal) ✓
- R1-R5 cardinal rules — all refinements cite-anchored to Anthropic docs OR plugin source.
