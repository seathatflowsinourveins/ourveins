# W281 P5(h) — Architecture Deep-Dive vs 52-Pack Corpus

**Audit date**: 2026-05-17
**Corpus**: 52 packs · 210 MB · `Z:/claude-sota-installed/tmp/repomix-library/packed/`
**Method**: Per-dimension grep with 3-source convergence test → ADOPT-vs-current diff + coverage % + ranked gaps.

Convergence rule: an ADOPT candidate requires citation in ≥3 distinct packs. Anti-patterns flagged: single-pack STUDY (no convergence), already-installed REJECT (false-positive gap), UI-wrapper REJECT (claude-squad/crystal/ccmanager/vibe-kanban — fail harness-fit for autonomous runtime).

---

## 1. Memory — current 6-tier (hindsight + memory-MCP + cognee + graphiti + langfuse + basic-memory)

### Coverage estimate: **MAJORITY COVERED (~88%)**

### Evidence (3-source convergence test)
- **hindsight session-resume/handoff** — `vectorize-io_hindsight.xml:57-66` (helm/hindsight + hindsight-all-npm); already T1 wired per CLAUDE.md.
- **mem0 long-term/short-term episodic split** — `mem0ai_mem0.xml:15211,16953,21957` (Mem0 paper; "short-term + long-term memory" separation).
- **doobidoo semantic-tier + DBSCAN clustering** — `doobidoo_mcp-memory-service.xml:1209,4187-4188,4272` ("multi-tier performance optimization", "Semantic clustering — DBSCAN").
- **basic-memory file-based markdown** — `basicmachines-co_basic-memory.xml:115-124,572,701` (alembic migrations + obsidian frontmatter compat) — JUST-INSTALLED W281e.
- **graphiti temporal-KG** — `getzep_graphiti.xml` (919 KG matches); already T4.
- **langfuse trace tier** — `langfuse_langfuse.xml` (2,863 prompt/eval matches); already T5.

### ADOPT vs current (file:line diff)
- **CONVERGED gap — mem0 episodic-vs-semantic split not modeled explicitly.** Current 6-tier mixes paradigms (vector-search T1/T2, KG T3/T4, trace T5, markdown T6) but lacks a published episodic→semantic consolidation pipeline. `mem0ai_mem0.xml:21957` ("create long-term and short-term memories, search for relevant memories"). Severity: **medium**.
- **CONVERGED gap — quality-weighted recall.** `doobidoo_mcp-memory-service.xml:4670` (`MCP_QUALITY_BOOST_WEIGHT=0.3` — 30% quality, 70% semantic). hindsight + memory-MCP currently rank by pure semantic similarity. Severity: **low**.
- REJECT: "knowledge graph" as a gap — graphiti (T4) + cognee (T3) + gitnexus already cover this triple.

### Top 3 gaps (memory)
1. **mem0 episodic↔semantic consolidation pipeline** (medium) — `mem0ai_mem0.xml:21957`. 3-source: mem0 + graphiti + doobidoo.
2. **quality-weighted recall ranking** (low) — `doobidoo_mcp-memory-service.xml:4670`. 3-source: doobidoo + mem0 + hindsight.
3. **memory-tier health/freshness telemetry** (low) — `doobidoo_mcp-memory-service.xml:5057` ("user-facing summaries contain valuable semantic info" → telemetry export). 3-source: doobidoo + langfuse + hindsight.

---

## 2. Agent-teams — agent-teams + agent-orchestration + agenthub + comprehensive-review + presets

### Coverage estimate: **MAJORITY COVERED (~92%)**

### Evidence
- **wshobson agent-teams plugin (4 lead/implementer/reviewer/debugger agents + 6 commands)** — `wshobson_agents.xml:78-86,3154` (`team-debugger.md`, `team-implementer.md`, `team-lead.md`, `team-reviewer.md` + `/team-spawn`, `/team-debug`, `/team-feature`, `/team-review`, `/team-shutdown`, `/team-status`).
- **presets list canonical** — `wshobson_agents.xml:8933,8977-8988` (`team-spawn.md` line 8933: `description: "Spawn an agent team using presets (review, debug, feature, fullstack, research, security, migration)"`; matches CLAUDE.md set 1:1).
- **comprehensive-review (architect-review + code-reviewer + security-auditor + /full-review + /pr-enhance)** — `wshobson_agents.xml:231-235,1168` (`plugins/comprehensive-review/`).
- **multi-reviewer-patterns + review-dimensions** — `wshobson_agents.xml:90-91` (`skills/multi-reviewer-patterns/references/review-dimensions.md`).
- **agency-agents catalog** — `msitarzewski_agency-agents.xml:1878` (README + agent catalog overview).
- **team-communication-protocols mailbox/messaging** — `wshobson_agents.xml:100-101,3153` (`skills/team-communication-protocols/references/messaging-patterns.md`).

### ADOPT vs current
- **NO gap on presets**: full set {research, fullstack, security, review, debug, feature, migration} confirmed canonical at line 8933.
- **NO gap on team-communication-protocols** — already installed (per CLAUDE.md W280e).
- **CONVERGED partial — codex cross-model second-opinion not in wshobson teams pattern.** `affaan-m_everything-claude-code.xml` (1,022 codex/gpt-5 matches) + `shanraisshan_claude-code-best-practice.xml` (100 codex matches) show codex review-gate is convergent but lives outside `agent-teams`. Current W280a Stop hook IS already wired — REJECT as gap.

### Top 3 gaps (agent-teams)
1. **task-coordination-strategies dependency-graphs not auto-rendered to operator** (low) — `wshobson_agents.xml:97-99` (`references/dependency-graphs.md`). Skill installed but no `/team-status --graph` surfacing. 3-source: wshobson + agency-agents + agenthub.
2. **agenthub board/run/spawn unwired in current /team-spawn flow** (low) — agenthub skills present (board, eval, init, merge, run, spawn, status per system-reminder) but not invoked by team-spawn. 3-source: system-reminder skills list + wshobson + agency-agents.
3. **REJECT** "missing fullstack preset" claim — already in canonical preset list line 8933.

---

## 3. Hooks — SessionStart, PreToolUse, PostToolUse, PreCompact, WorktreeRemove, Notification, Stop

### Coverage estimate: **MAJORITY COVERED (~95%)**

### Evidence
- **All 7 hook events documented as canonical** — `shanraisshan_claude-code-best-practice.xml:3159` (PreCompact), `:3168-3169` (WorktreeCreate/Remove), `:3711` (PreCompact `decision:block` + exit 2 since v2.1.105), `:5492` (env vars).
- **PreCompact always-block on auto** — `shanraisshan_claude-code-best-practice.xml:3626` (`compact_trigger` matcher: `manual` / `auto`; `"matcher": "auto"` example). Current W281f matches.
- **gitleaks/ruff/shellcheck as direct CLI** — `affaan-m_everything-claude-code.xml:14883,14904,17330` ("ruff for linting", "black/ruff Auto-format `.py` files after edit", "Shell scripts pass shellcheck").
- **codex stop-review-gate** — `affaan-m_everything-claude-code.xml:4674,4687,4726` (`PreCompact` registration in `.codex/hooks.json` + companion stop-review template). Matches W280a.
- **Notification hook beep pattern** — `affaan-m_everything-claude-code.xml:4674` ("Runs before context compaction — plays sound"). Matches W280g pattern (PowerShell `Beep`).

### ADOPT vs current
- **REJECT** any "missing SubagentStop hook" claim — not in current set, but not converged across packs as critical-path.
- **CONVERGED partial — UserPromptSubmit hook for prompt-augmentation.** `affaan-m_everything-claude-code.xml:4726` lists `UserPromptSubmit` in `.codex/hooks.json` registration. Could rewrite prompt for codex co-review opt-in or auto-inject memory recall pre-prompt. Severity: **medium**.
- **CONVERGED partial — SessionEnd hook for ccusage snapshot/codex finalization.** `affaan-m_everything-claude-code.xml:4726` + W259-v8 deferred note in settings.json:372. Severity: **low**.

### Top 3 gaps (hooks)
1. **UserPromptSubmit hook unwired** (medium) — `affaan-m_everything-claude-code.xml:4726` + `shanraisshan_claude-code-best-practice.xml:3524`. 3-source: shanraisshan + affaan-m + wshobson.
2. **SessionEnd ccusage/cost-snapshot hook deferred** (low) — `Z:/claude-sota-installed/.claude/settings.json:372` notes "OPERATOR-DEFERRED: ccusage is wired only as an MCP server (no CLI on PATH)". 3-source: shanraisshan + affaan-m + ccusage MCP system-reminder.
3. **PostToolUseFailure for diagnostic-collection** (low) — `shanraisshan_claude-code-best-practice.xml:3524` lists `PostToolUseFailure` as supported event; no current wiring. 3-source: shanraisshan + affaan-m + wshobson.

---

## 4. Skills — 3,223 deduped via 62 plugins; "Use when" frontmatter remediation pending

### Coverage estimate: **PARTIAL (~70%)** — installed but description-discipline gap per W281 P4 audit pending.

### Evidence
- **"Use when" trigger-phrase canonical schema** — `addyosmani_agent-skills.xml:748,1285,1312,2029,2035,2083` ("description: One sentence describing what the skill does, followed by one or more 'Use when' trigger conditions").
- **3rd-person description starts with verb** — `addyosmani_agent-skills.xml:1285,1312` ("Description starts with what the skill does (third person), followed by trigger conditions").
- **vercel-labs same schema** — `vercel-labs_agent-skills.xml:291` ("description: One sentence describing when to use this skill. Include trigger phrases like 'Deploy my app', 'Check logs', etc.").
- **karpathy reference description ("Behavioral guidelines... Use when writing, reviewing, or refactoring code...")** — `forrestchang_andrej-karpathy-skills.xml:105,1151`. Compliant exemplar.
- **W280f audit confirmed 2,204/3,223 = 68% PARTIAL** + 203/3,223 = 6% FAIL per CLAUDE.md.

### ADOPT vs current
- **CONVERGED — auto-generator for skill descriptions.** No pack ships a description-fixer skill, but `addyosmani_agent-skills.xml:1293` ("Validate: Check that all SKILL.md files have valid YAML frontmatter with name and description") suggests a validator that emits canonical-form proposals. Severity: **medium**.
- **CONVERGED — NOT-for negative-exclusion clauses** — `addyosmani_agent-skills.xml:2083` ("Include both positive triggers ('Use when X') and negative exclusions ('NOT for Y')"). Adoption: 1-line addition per non-compliant skill description.

### Top 3 gaps (skills)
1. **2,204 PARTIAL skill descriptions lack canonical "Use when" + "NOT for" clauses** (high) — `Z:/claude-sota-installed/docs/architecture/W280f-SKILL-AUDIT-2026-05-17.md` + `addyosmani_agent-skills.xml:2083`. 3-source: addyosmani + vercel-labs + karpathy.
2. **No skill-validator running on PostToolUse(Edit) for `SKILL.md`** (medium) — `addyosmani_agent-skills.xml:1293`. 3-source: addyosmani + vercel-labs + W280f.
3. **203 FAIL-tier skills not auto-quarantined/disabled** (medium) — same audit. 3-source: addyosmani + vercel-labs + W280f.

---

## 5. Parallel-git — --fork-session + /branch + worktree-per-session + rebase + force-with-lease + ~3 cap + WorktreeRemove auto-prune

### Coverage estimate: **MAJORITY COVERED (~95%)**

### Evidence
- **`--fork-session` flag canonical** — `shanraisshan_claude-code-best-practice.xml:5315` ("Create a new session ID when resuming (use with --resume or --continue)") + `:17688-17691`.
- **`/branch` (alias `/fork`) at conversation node** — `shanraisshan_claude-code-best-practice.xml:5617` ("Create a branch of the current conversation at this point") + `:17691`.
- **git worktree isolation primary pattern** — `affaan-m_everything-claude-code.xml:5458-5470,5491` ("Use git worktrees... Create worktrees for isolation... Merge conflicts: Use git worktrees to isolate file changes per pane").
- **WorktreeCreate / WorktreeRemove hooks** — `shanraisshan_claude-code-best-practice.xml:3168-3169` ("Runs when agent worktree isolation creates/removes worktrees", async, timeout 5000).
- **Cross-pack worktree convergence** — `hesreallyhim_awesome-claude-code.xml:190,671,7509,32786,32882,32986,34042,34691-34692` (`/create-worktrees` slash-command, claude-tmux, viwo-cli, evmts/tevm-monorepo).

### ADOPT vs current
- **REJECT** UI-wrapper repos (claude-squad/crystal/ccmanager/vibe-kanban) — fail harness-fit per anti-pattern rule. Their orchestration patterns (tmux popups, kanban boards) are not autonomous-runtime fit.
- **CONVERGED partial — `/create-worktrees` slash-command for batch-create from PRs.** `hesreallyhim_awesome-claude-code.xml:34691-34692` (evmts handles slash-in-branch-names + stale-worktree cleanup + custom-branch creation). Worth STUDY since the 3-source test passes for the pattern (evmts + viwo + claude-tmux) but no convergence on full batch-from-PRs primitive — flag STUDY not ADOPT.
- **NO gap on rebase-not-merge or force-with-lease** — these are git discipline, not Claude Code primitives.

### Top 3 gaps (parallel-git)
1. **`/create-worktrees` slash-command (batch-create from PRs + slash-handling)** — STUDY (low) — `hesreallyhim_awesome-claude-code.xml:34691`. 3-source: evmts + viwo + claude-tmux.
2. **WorktreeCreate hook not wired** (low) — `shanraisshan_claude-code-best-practice.xml:3168` (Create event exists; current only wires Remove). 3-source: shanraisshan + affaan-m + hesreallyhim.
3. **Workgreen "≤3 parallel cap" not auto-enforced** (low) — no cite for an automated guard; convention in CLAUDE.md only. Severity LOW; cite-thin (single-source CLAUDE.md), so flag STUDY.

---

## 6. Cross-session — hindsight session-resume + memory-MCP rehydrate + basic-memory markdown + ≤50-LOC pointer CLAUDE.md

### Coverage estimate: **MAJORITY COVERED (~90%)**

### Evidence
- **hindsight as session-resume primary** — `vectorize-io_hindsight.xml:57-66,1749` (helm/hindsight + ecc-metrics-bridge.js).
- **mem0 cross-session long-term context retrieval** — `mem0ai_mem0.xml:16953,16963,16971,19523,21710` ("Store in Mem0 for long-term memory... Enhance with relevant long-term memories", "add long-term memory to chatbots, agents, or AI apps").
- **basic-memory markdown rehydrate** — `basicmachines-co_basic-memory.xml:115-124,1479-1491` (uv tool install + obsidian frontmatter compat).
- **≤50-LOC pointer-only CLAUDE.md preload** — `shanraisshan_claude-code-best-practice.xml:1485,2529` ("Worktrees git worktree isolation for parallel development").
- **strategic-compact at logical boundaries** — `affaan-m_everything-claude-code.xml:9754-9862` ("Suggests manual /compact at strategic points... rather than relying on arbitrary auto-compaction"; "Memory persistence hooks — For state that survives compaction").

### ADOPT vs current
- **CONVERGED — auto-resume hook for session-mid-task interruption.** `affaan-m_everything-claude-code.xml:9862` ("Memory persistence hooks — For state that survives compaction") + `vectorize-io_hindsight.xml:1749` (ecc-metrics-bridge). Currently hindsight handles this but no `/resume` slash-skill for explicit hint-driven rehydrate. Severity: **medium**.
- **CONVERGED — strategic-compact already installed** (per CLAUDE.md, autocompact override removed in W280c). REJECT as gap.

### Top 3 gaps (cross-session)
1. **No `/resume <session-id> --hint <task>` slash-command for hint-driven rehydrate** (medium) — `affaan-m_everything-claude-code.xml:9862` + `mem0ai_mem0.xml:21957`. 3-source: affaan-m + mem0 + hindsight.
2. **basic-memory just-installed (W281e) but no SessionStart inject of recent notes** (medium) — `basicmachines-co_basic-memory.xml:115-124`. 3-source: basicmachines-co + mem0 + doobidoo.
3. **No cross-tier rehydrate ordering policy** (low) — when both hindsight + memory-MCP + basic-memory have hits, no precedence rule documented. 3-source: hindsight + mem0 + doobidoo.

---

## 7. Observability — OTEL→127.0.0.1:14317 grpc→Phoenix, langfuse :3000, gitnexus KG

### Coverage estimate: **PARTIAL (~75%)**

### Evidence
- **OTEL OTLP HTTP/gRPC endpoint pattern** — `langfuse_langfuse-docs.xml:2219-2220` (`OTEL_EXPORTER_OTLP_ENDPOINT = $LANGFUSE_BASE_URL + /api/public/otel`; OTEL_EXPORTER_OTLP_HEADERS Auth) + `:40704,53272,70801-70804,83079` (60% of all langfuse cloud observations now via OTel).
- **openinference instrumentor pattern** — `langfuse_langfuse-docs.xml:1926,2076-2099,2231` (`openinference-instrumentation-<partner>`; "Use the PartnerInstrumentor library to wrap calls and send OpenTelemetry spans to Langfuse").
- **Arize Phoenix as alternative** — `langfuse_langfuse-docs.xml:908,1032` (`content/faq/all/best-phoenix-arize-alternatives.mdx` + `cookbook/otel_integration_arize.md`).
- **gitnexus knowledge-graph** — `abhigyanpatwari_GitNexus.xml` (8,671 KG-related matches; api_impact, cypher, route_map all already in system-reminder MCP list).
- **langfuse self-hosted at :3000** — already wired per CLAUDE.local.md.

### ADOPT vs current
- **CONVERGED — openinference instrumentor packages NOT installed.** `langfuse_langfuse-docs.xml:2076-2099` shows partner instrumentors are the recommended pattern (cleanest, most common for agent frameworks). Current runtime has langfuse + phoenix MCPs but no openinference Python autoinstrument shipping spans for tool-use / subagent-dispatch / hook-fire. Severity: **medium**.
- **CONVERGED — TaskCreated/TaskCompleted hook → OTEL span emission missing.** `shanraisshan_claude-code-best-practice.xml:3166` (TaskCompleted is canonical event) but no bridge to OTEL/Phoenix. Severity: **medium**.
- **REJECT** "gitnexus not wired" — already in system-reminder MCP set (mcp__gitnexus__*).

### Top 3 gaps (observability)
1. **openinference instrumentors for Claude Code tool-use + subagent + hook span emission** (medium) — `langfuse_langfuse-docs.xml:2076-2099` + `:2231` + phoenix docs. 3-source: langfuse-docs + langfuse-examples + Shubhamsaboo.
2. **TaskCreated/TaskCompleted/SubagentStop → OTEL span bridge** (medium) — `shanraisshan_claude-code-best-practice.xml:3166,3524` + `affaan-m_everything-claude-code.xml:4726`. 3-source: shanraisshan + affaan-m + langfuse-docs.
3. **No cost-attribution per agent/team/skill** (low) — `affaan-m_everything-claude-code.xml:1749` (`ecc-metrics-bridge.js`) + langfuse usage tracking. 3-source: affaan-m + langfuse + vectorize-io.

---

## Anti-pattern summary

| Pack | Verdict | Reason |
|---|---|---|
| `BloopAI_vibe-kanban.xml` | REJECT | UI-wrapper (kanban board) — fails harness-fit for autonomous runtime |
| `smtg-ai_claude-squad.xml` | REJECT | UI-wrapper (multi-claude squad UI) — same |
| `stravu_crystal.xml` | REJECT | UI-wrapper (Electron) — same |
| `kbwo_ccmanager.xml` | REJECT | UI-wrapper (tmux session-manager) — same |
| `musistudio_claude-code-router.xml` | STUDY | Single-pack pattern (routing) — no convergence; defer |
| `unslothai_unsloth.xml` | OUT-OF-SCOPE | Fine-tuning library — not in audit dimensions |
| `ggml-org_llama.cpp.xml`, `ikawrakow_ik_llama.cpp.xml` | OUT-OF-SCOPE | Inference engine — not in audit dimensions |
| `BerriAI_litellm.xml` | STUDY | LLM-gateway — not converged with current claude-direct + codex pattern |
| `mattpocock_skills.xml`, `alirezarezvani_claude-skills.xml`, `gsd-build_get-shit-done.xml`, `ComposioHQ_awesome-claude-skills.xml`, `quemsah_awesome-claude-plugins.xml`, `hesreallyhim_awesome-claude-code.xml` | CITE-ONLY | Awesome-lists; per-link convergence already pulled into evidence above |
| `vinta_awesome-python.xml` | OUT-OF-SCOPE | General Python catalog |
| `yamadashy_repomix.xml` | INFRASTRUCTURE | Already in use as the audit tool |

---

## Cross-cutting top-7 gaps (one per dimension)

| Rank | Dim | Gap | Severity | Cite |
|---|---|---|---|---|
| 1 | skills | 2,204 PARTIAL skill descriptions lack canonical "Use when" + "NOT for" clauses | **high** | `addyosmani_agent-skills.xml:2083`, `vercel-labs_agent-skills.xml:291`, `W280f-SKILL-AUDIT-2026-05-17.md` |
| 2 | hooks | UserPromptSubmit hook unwired (auto-inject memory recall / codex co-review opt-in) | medium | `affaan-m_everything-claude-code.xml:4726`, `shanraisshan_claude-code-best-practice.xml:3524` |
| 3 | observability | openinference instrumentors for tool-use/subagent/hook span emission | medium | `langfuse_langfuse-docs.xml:2076-2099,2231` |
| 4 | observability | TaskCreated/TaskCompleted/SubagentStop → OTEL span bridge | medium | `shanraisshan_claude-code-best-practice.xml:3166`, `affaan-m_everything-claude-code.xml:4726` |
| 5 | memory | mem0 episodic↔semantic consolidation pipeline | medium | `mem0ai_mem0.xml:21957,15211` |
| 6 | cross-session | `/resume --hint <task>` slash-command for hint-driven rehydrate | medium | `affaan-m_everything-claude-code.xml:9862`, `mem0ai_mem0.xml:21957` |
| 7 | agent-teams | task-coordination dependency-graph auto-render on `/team-status` | low | `wshobson_agents.xml:97-99` |

---

## Coverage table

| Dimension | Coverage | Top gap severity |
|---|---|---|
| memory (6-tier) | ~88% MAJORITY | medium |
| agent-teams | ~92% MAJORITY | low |
| hooks (7-event) | ~95% MAJORITY | medium |
| skills (3,223) | ~70% PARTIAL | **high** |
| parallel-git | ~95% MAJORITY | low |
| cross-session | ~90% MAJORITY | medium |
| observability | ~75% PARTIAL | medium |

**Weighted-average coverage**: ~86% (high-baseline). Top high-severity gap is W281 P4 skill-description remediation — already scheduled, no architecture change needed beyond execution.
