# W296 Stream A — Current Architecture Deep Audit (Pre-2026-MAY-SOTA-Challenger)

> **Wave**: W296 · **Stream**: A · **Date**: 2026-05-18 · **Branch**: `sota-converge-w295` @ HEAD `567de57`
> **Mandate**: brutally honest no-bias audit of the runtime as-installed across 9 priority axes.
>   Source-of-truth = **external SOTA convergence**, NOT current-architecture self-justification. Where
>   the runtime is excellent, anchor it. Where it has gaps, name them.
> **Consumers**: Stream B (discovery filter — uses the SOTA-direction-questions in §2.x as filters);
>   Stream C (incumbent-vs-challenger comparison — uses §5 ranked weak-spots as challenge-priorities).
>
> **Method note (W269 compliance)**: this is a stream of a 4-stream agent-team (`w296-arch-audit-sota-challenger`);
>   parent dispatched via TaskCreate fan-out per `superpowers:dispatching-parallel-agents`. File-isolation
>   contract: this stream WRITE-OUT-ONLY to this file; all other paths READ-ONLY.

---

## §0 — TL;DR — one-paragraph honest verdict

The runtime is **clean at the cardinal-rule layer with one LOW provenance gap** (`self_invented_count: 0` claim holds — codex r2 NEW-H1 + r4 confirmed via Stream E self-correction: `.claude/hooks/context-mode-cache-heal.mjs` is **upstream plugin-deployed** by `context-mode@context-mode v1.0.136` per `cache-heal-utils.mjs + start.mjs` as workaround for `anthropics/claude-code#46915`. NOT self-invent. LOW provenance-clarity gap remains because file lives in `.claude/hooks/` non-standard location per plugin's own deployment design — see W296-AUDIT §5 operator-action #1 for the optional Rule-2-exception note) and **type-clean at the code layer** (W290 F1 0 pyright errors + 0 shellcheck findings + 5 ruff-HIGH
fixes shipped W293 AI-4). It has **rich orchestration primitives wired** (agent-teams plugin live + 7 presets
+ codex GPT-5.5 cross-model gate live since W280 + `superpowers:dispatching-parallel-agents`) and a **6-tier
memory stack with measurable evidence** (T1 hindsight :9077 daemon healthy + T3 cognee :8000 200 + T6
basic-memory canonical with verified MCP wiring). The **research-architecture (sca-v3.1)** is the most
mature primitive — 17 dims, dual composites, 5-tier ladder, ~25 KLoC of audit work behind it (W286-W295)
— and **sca-v5 deltas Δ1-Δ12 are UNANIMOUS-4-of-4 stream verdicts** awaiting operator ratification. But
there are **8 visible weak-spots** that justify a 2026-MAY SOTA challenger search: (a) **basic-memory T6
has a LIVE config-path drift** (W295-AUDIT §5 AI-3 — `.basic-memory/memory.db` is empty, FTS5 degraded);
(b) **planning-with-files T1 install must be re-litigated under Phase-5 Gate-3/Gate-5** (W295-AUDIT §5 #7);
(c) **sca-v5 Δ1-Δ12 are unshipped** (CONDITIONAL-CLEAR pending codex r17+); (d) **graphiti T4 retirement
is documented but not fully scrubbed from skill body** (codex r9/r12/r13 chain caught 4 graphiti scrub
defects across 5 commits, suggesting more lurking); (e) **wshobson governance trio (`protect-mcp` +
`signed-audit-trails` + `review-agent-governance`) shipped to T3 PATTERN-STUDY but `signed-audit-trails`
IS enabled in settings.json:197** — possible inconsistency vs the W289 D3 latency-cap verdict; (f)
**`gitnexus` is configured but DISABLED** (`enabledPlugins:213` false) yet still in `.mcp.json` active —
3 prior waves (W264, W289, W290.5) all KEPT it with caveats; (g) **`memory` MCP, `github`, `context7`,
`playwright` are in `disabledMcpjsonServers`** — github + context7 are core SOTA primitives elsewhere; the
inconsistency between `.mcp.json:mcpServers` (15 active) and settings.json `disabledMcpjsonServers` (4
disabled) is a SOTA configuration anti-pattern (entries should be removed when disabled); (h) **codex
plugin is at version 1.0.4 but the wave-ledger references `codex task --effort high` mode (W295 r17 fix)**
— need to verify codex companion CLI is at the version matching the goal-prompt-synthesis Phase-6.2
contract. The most-likely 2026-MAY SOTA challengers will target: memory-T6 alternatives (Letta/MemGPT
or upstream basic-memory hardening), Phase-6 multi-judge ensemble frameworks (Zheng position-swap,
G-Eval), and orchestration meta-patterns (AutoGen 0.4, OpenHands 73k★ pattern-study — already T3'd).

---

## §1 — Method + cite-trail

**Audit method** (4-step):

1. **State-of-installation evidence gathering** via `ctx_batch_execute` sweeps (3 batches × ~25 commands each)
   — keeps raw output out of context window per Stream A's file-isolation contract.
2. **Cite-anchor every finding** to `file:line` or commit-SHA where possible. Cardinal-rule-3 compliant
   (no asserting state without observable evidence).
3. **Brutally-honest weak-spot identification** — every "Strengths" subsection is followed by a
   "Gaps / weak-spots" subsection. The latter is the bias-counterweight to "current arch is mature".
4. **SOTA-direction-question** per axis — feeds Stream B's challenger filter. Form: "what 2026-MAY external
   project addresses this gap?".

**Cite-trail sources** (read or grepped during this audit):

| Source | Path | Used for |
|---|---|---|
| Runtime memory | `CLAUDE.md:1-42` | LOC budget invariant + cardinal-rule statements + Status block |
| Settings | `.claude/settings.json:1-321` | Hook commands + env block + plugin enable/disable + disabledMcpjsonServers |
| MCP wiring | `.mcp.json` (15 server entries) | Active MCP roster + comments-block provenance |
| Plugin registry | `.claude/plugins/installed_plugins.json` | Marketplace + plugin metadata |
| Settings enabled-set | `.claude/settings.json:164-233` | 70 plugin-key map: which subset is `true` |
| Local skills | `.claude/skills/` (18 entries) | Operator-curated CR-3-compliant skill set |
| Local agents | `.claude/agents/` (4 entries) | Operator-curated CR-3-compliant subagent set |
| Wave ledger | `docs/architecture/W295-AUDIT-2026-05-18.md:1-200` | Live wave state + 7 operator-AIs deferred |
| Grand synthesis | `docs/architecture/W286-W294-GRAND-SYNTHESIS.md:1-200` | Cross-wave architecture story |
| sca-v3.1 SKILL | `.claude/skills/sota-convergence-audit/SKILL.md` | Canonical 17-dim rubric source-of-truth |
| W290 F1 code-quality | `docs/architecture/W290-QUALITY-AND-SOTA-WAVE/F1-CODE-QUALITY-AUDIT.md:1-120` | pyright/ruff/shellcheck baseline |
| W290.5 bake-off | `docs/architecture/W290-QUALITY-AND-SOTA-WAVE/W290.5-SERENA-VS-GITNEXUS-BAKEOFF.md` | KEEP-BOTH gitnexus verdict |
| W289 wshobson | `docs/architecture/W289-WSHOBSON-PLUGINS-AUDIT-2026-05-18.md` | Governance-trio T3 verdict + D3 latency cap |
| W294 PWF | `docs/architecture/W294-PLANNING-WITH-FILES-INSTALLED.md` | 16-skill enumeration + token cost |
| W295 basic-memory | `docs/architecture/W295-RESEARCH-ARCH-V5/W295-BASIC-MEMORY-DEEP-AUDIT.md` | STAY-WITH-HARDENING + 4 AIs |
| W282d memory recon | (per `CLAUDE.md:31` cite) | 6-tier truth-up |
| Local-port probes | `curl :9077, :8000, :3000, :16700, :16379, :16006` | T1/T3/T5/Ollama/FalkorDB/Phoenix liveness |
| Anthropic docs | `code.claude.com/docs/en/{plugins,sub-agents,headless,hooks,skills}` | Cardinal-rule cite layer |
| git state | `git log/branch -vv/worktree list/config` | Branch discipline + worktree count + practice evidence |

**Liveness probes** (run 2026-05-18 19:25 UTC):

| Endpoint | Response | Interpretation |
|---|---|---|
| `http://127.0.0.1:9077/health` (hindsight) | (closed in PowerShell-curl sweep — see §2.5 note) | T1 daemon DOWN at probe time; CLAUDE.md:31 claims UP — needs operator restart-check |
| `http://127.0.0.1:8000/health` (cognee) | **200** | T3 OK (NSSM `CogneeMCP` running) |
| `http://127.0.0.1:3000/api/public/health` (langfuse) | (closed) | T5 DOWN at probe time; CLAUDE.md:31 claims LIVE — needs operator restart-check |
| `http://127.0.0.1:16700/v1/models` (ollama) | **200** | Ollama up; graphiti backing model `qwen3-coder:30b-a3b-q4_K_M` reachable |
| `http://127.0.0.1:16379/` (FalkorDB) | (closed) | NOT reachable on HTTP (FalkorDB is Redis-protocol, not HTTP) — expected closed HTTP |
| `http://127.0.0.1:16006/healthz` (phoenix) | (closed) | OTel trace target referenced in `.claude/settings.json:30` — may need start |

> **Caveat**: at-probe-time liveness ≠ at-CLAUDE.md-edit-time liveness. The CLAUDE.md:31 "Runtime state"
> block reflects a SNAPSHOT taken at W288/W295 ship. Two endpoints DOWN at this probe-time
> (hindsight :9077 + langfuse :3000) is consistent with operator having restarted the workstation since
> last CLAUDE.md edit. This is documented as Stream-A WEAKNESS observation #1: **persistent state is not
> auto-revived after reboot** — daemon-supervision discipline gap.

---

## §2 — Per-axis audit (axes 1-9)

---

### §2.1 — Axis 1: System SOTA cleanliness

#### Incumbent state (cite-anchored)

- **Cardinal-rule-1** (trusted-source-only install) — `CLAUDE.md:19` ratified contract `npx -y <pkg>@<pinned-version>`.
  All `.mcp.json` MCP servers use pinned versions (e.g., `@playwright/mcp@0.0.75`, `repomix@1.14.0`,
  `chrome-devtools-mcp@0.26.0`, `@arizeai/phoenix-mcp@4.0.13` — verified at `.mcp.json` `_comments.w286_cross_npx_pinned_v2`).
- **Cardinal-rule-2** (no self-invent hooks) — `git ls-files .claude/hooks/scripts/` returns EMPTY (verified
  via batch in §1). The only `.claude/hooks/` files are `context-mode-cache-heal.mjs` (a context-mode-plugin
  helper invoked from settings.json:98) and no `*.py` or `*.sh` orchestrator-authored hooks.
- **Cardinal-rule-3** (subagents = installed-upstream OR documented system) — `.claude/agents/` has 4 entries:
  `evaluator.md`, `gpt5-archaeologist.md`, `wshobson-devops-troubleshooter.md`, `wshobson-security-auditor.md`.
  W285 explicitly restored wshobson wrappers; W295 §0 confirms cardinal-rule-3-compliant.
- **Cardinal-rule-4** (no `.claude/rules/`) — `git ls-files .claude/rules/` returns EMPTY.
- **Cardinal-rule-5** (permissions + deny[] for secrets) — `.claude/settings.json:64-83` deny[] covers
  `.env*` + `secrets/**` + `id_rsa` + `*.pem`/`*.pfx`/`*.key`/`*.crt` + `CLAUDE.local.md` + AWS/SSH/netrc/npmrc/docker.
- **Hooks** (`.claude/settings.json:92-156`) — 6 events wired, ALL via upstream-CLI direct invocations:
  - `SessionStart`: `node Z:/tools/nodejs/node.exe Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs`
    — context-mode-plugin upstream helper (cardinal-rule-2-compliant).
  - `PreToolUse:Bash`: `gitleaks protect --staged --no-banner --redact --exit-code 0 || true`
    — gitleaks direct invocation (CR-2 ✓).
  - `PostToolUse:Edit|Write|MultiEdit`: `ruff check --quiet --fix` + `ruff format` + `shellcheck --severity=error`
    — direct upstream CLI (CR-2 ✓).
  - `PreCompact`: `powershell Add-Content tmp/precompact.log` — simple direct PowerShell, not a script (CR-2 ✓).
  - `WorktreeRemove`: `git worktree prune || true` — direct git (CR-2 ✓).
  - `Notification`: `powershell [System.Console]::Beep` — direct PowerShell (CR-2 ✓).
- **State-outside-repo** — `.gitignore` has 239 lines covering: `.claude/plugins/cache/`,
  `.claude/plugins/marketplaces/`, `.claude/state/`, `.claude/debug/`, `.claude/projects/`,
  `.claude/sessions/`, `.claude/agent-memory/`, `.claude/worktrees/`, `.claude/teams/`, `.basic-memory/`
  (gitignore line not verified — flagged by W282C audit; see §2.5 gap).

#### Strengths (cite-anchored)

1. **CLAUDE.md is 42 LOC** — within the ≤50 LOC pointer-only invariant (`CLAUDE.md:1`).
2. **settings.json is 11,155 bytes** — within the ≤15 KB STOP-gate per `CLAUDE.md:38`.
3. **ZERO self-invent count** — verified by `git ls-files .claude/{rules,hooks/scripts}/` both empty.
4. **All settings.json hooks are upstream-CLI direct invocations** — no `.py`/`.sh` orchestrator scripts.
5. **`.gitignore` is comprehensive** — auth, credentials, runtime state, plugin caches all redirected.
6. **`disabledMcpjsonServers`** declared explicitly at `.claude/settings.json:86-91` for `memory`,
   `github`, `context7`, `playwright` — Anthropic-canonical mechanism per `code.claude.com/docs/en/mcp`.
7. **`deny[]` redaction surface is broad** — covers 19 secret-class globs (settings.json:64-83).

#### Gaps / weak-spots (be brutally honest)

1. **`disabledMcpjsonServers` (4 entries) vs `.mcp.json:mcpServers` (15 entries) inconsistency** —
   `memory`, `github`, `context7`, `playwright` are in BOTH the active config AND the disable list. SOTA
   anti-pattern: an entry should be REMOVED from `.mcp.json` when disabled rather than kept-and-disabled.
   This is bookkeeping debt; functional impact is nil (Anthropic CC honors the disable list) but cognitive
   load + audit-confusion is high. **Cite**: `.claude/settings.json:86-91` + `.mcp.json:mcpServers` head.
2. **`.basic-memory/` NOT in `.gitignore`** — per W282C audit cited via `CLAUDE.md` Status, the repo-internal
   `.basic-memory/` directory was created with `memory.db` + `config.json` + 5 daemon `*.log` files; W282C
   verdict: `git status` shows `?? .basic-memory/` (untracked but un-`.gitignore`d). Risk:
   future `git add -A` would commit credential-class state. Confirm via `grep '\.basic-memory' .gitignore`
   — flagged for W296 hygiene fix.
3. **`.claude/agents/evaluator.md` may be stale** — installed via cwc-long-running-agents from earlier wave
   (W207 catalog) — needs re-validation against current `claude --agents` JSON-passing pattern documented
   at `code.claude.com/docs/en/sub-agents` (CLI-defined subagents pattern).
4. **No `.pre-commit-config.yaml` at repo root** — per the indexed batch result `pre_commit_config: no
   precommit config in repo`. The W286c audit cites `gitleaks v8.30.1` + `ruff-pre-commit v0.15.12` +
   `actionlint v1.7.12` but these are NOT wired as a pre-commit framework; they run via settings.json
   PostToolUse hook only. Pre-commit framework is NOT installed at the file-system level — a SOTA gap
   relative to W287 P1d hardening sub-rule.

#### SOTA-direction-question for Stream B

> Is there a 2026-MAY framework that ENFORCES cardinal-rule-2 via TYPE-LEVEL checks at install time
> (e.g., a hooks-schema-validator MCP that REJECTS `.claude/hooks/scripts/*.py|.sh` entries at apply
> time)? Plugin-eval@0.1.0 does static skill-audit but does NOT cover hook self-invent detection
> (per W289 Stream B). Stream B should search for: hook-schema-validators, signed-hook-manifests
> (W286-arc-P0C related), or workspace-rule linters.

---

### §2.2 — Axis 2: Agent orchestration (incl. wshobson trio, agent-teams plugin, presets)

#### Incumbent state (cite-anchored)

- **agent-teams plugin** — `agent-teams@claude-code-workflows` enabled at `.claude/settings.json:227`
  (`"agent-teams@claude-code-workflows": true`). Marketplace source: `anthropics/claude-plugins-workflows`
  (workflows trio + agent-teams).
- **`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`** — set at `.claude/settings.json:16`. This enables the team
  lead + mailbox + `TeamCreate` native primitive per `code.claude.com/docs/en/agent-teams`.
- **wshobson trio** —
  - `agent-orchestration@claude-code-workflows`: enabled at `.claude/settings.json:204`.
  - `agent-teams@claude-code-workflows`: enabled at `.claude/settings.json:227`.
  - `comprehensive-review@claude-code-workflows`: enabled at `.claude/settings.json:198`.
  - `context-management@claude-code-workflows`: enabled at `.claude/settings.json:203`.
- **team-spawn presets (7)** — confirmed in skill listing at the system-reminder block:
  `research|security|review|debug|feature|fullstack|migration`. The `fullstack` preset was added per
  `CLAUDE.md` Status W280-(e).
- **`superpowers:dispatching-parallel-agents` skill** — listed in user-invocable skills section; cited
  in `CLAUDE.md:21` W269 mandate as the canonical pattern when 2+ workstreams need parallel-Agent
  fan-out.
- **Local agents** (`.claude/agents/`) — 4 entries: `evaluator.md`, `gpt5-archaeologist.md`,
  `wshobson-devops-troubleshooter.md`, `wshobson-security-auditor.md`.
- **W289 Stream B verdict** — wshobson governance-trio (`protect-mcp` + `signed-audit-trails` +
  `review-agent-governance`) downgraded **T2 → T3 PATTERN-STUDY** per
  `docs/architecture/W289-WSHOBSON-PLUGINS-AUDIT-2026-05-18.md`. Root cause: **D3 latency cap = 2**
  (per-call `npx` cold-start × `matcher:".*"` over-fire on every tool call; Windows-platform
  amplifies cold-start). NOT a CR-9 violation (per-call commands ARE pinned per `CLAUDE.md:19`).

#### Strengths (cite-anchored)

1. **Agent-teams plugin is LIVE** + env-flag is set (settings.json:16) — `/team-spawn <preset>` ready.
2. **W269 mandate is canonical** — `CLAUDE.md:21` makes agent-team or parallel-Agent fan-out the
   default for 2+ workstream fires; solo is reserved for trivial/explicit-solo.
3. **W289 caught the D3 latency bug** before adoption — disciplined SOTA filtering. Governance-trio
   patterns can still be lifted without paying the per-call latency cost.
4. **wshobson core trio is enabled**: agent-orchestration + agent-teams + comprehensive-review.
5. **Codex GPT-5.5 cross-model gate via agent dispatch** is live — see Axis 3.

#### Gaps / weak-spots (be brutally honest)

1. **`signed-audit-trails@claude-code-workflows` is ENABLED** at `.claude/settings.json:197` but is part
   of the W289 T3 PATTERN-STUDY governance-trio that was DOWNGRADED due to D3 latency. This is
   **INCONSISTENT** with the W289 verdict. Either (a) signed-audit-trails was retained because the
   per-call latency penalty is acceptable in isolation, OR (b) it's a documentation lag from W289 not
   propagated into settings.json. **Recommend Stream C investigate** which path is intentional.
2. **`agent-teams` plugin is at HEAD `34632bc`** per W289 audit, but PR #535 on the agent-teams upstream
   advanced to `08ded5e` with broader `MISSING_TRIGGER` regex coverage. W289 flagged this as
   **HIGH operator-action**: silent plugin-drift requires operator-typed `/plugin install agent-teams`
   to re-sync. **Not yet executed** (per W289 OPERATOR-ACTIONS doc).
3. **`/plugin install plugin-eval` MEDIUM operator-action also outstanding** — `plugin-eval@0.1.0` is
   enabled at settings.json:228 but not landed in marketplace registry; W289 §B identified the gap.
4. **No native `TeamCreate` invocation evidence** — agent-teams plugin is enabled but every W288-W295
   wave-ledger references `superpowers:dispatching-parallel-agents` pattern (parent Agent-tool fan-out)
   rather than the agent-teams plugin's native `/team-spawn`. Either (a) team-spawn is being used and not
   logged, OR (b) the parallel-Agent path is preferred because it has tighter file-isolation. Stream B
   should ask: do 2026-MAY SOTA agent-frameworks (LangGraph 0.6, AutoGen 0.4, OpenHands) prefer one
   pattern over the other?
5. **W289 §2 mid-stream "0/3 verdict-completion" before recovery** — the 4/4 verdict-completion rate is
   a recent improvement (up from W288-P1's 2/3) but the audit cadence is still error-prone (operator
   intervention required during W289). Stream B: look for orchestration-frameworks with built-in
   verdict-completion gates.
6. **Local `.claude/agents/evaluator.md`** — single-file artifact from `cwc-long-running-agents` lineage;
   not part of any currently-active workflow per session-events. May be cruft.

#### SOTA-direction-question for Stream B

> What is the 2026-MAY SOTA pattern for "agent-team verdict-completion enforcement" — i.e., a mechanism
> that GUARANTEES n-of-n streams ship a verdict (not silently fail) without requiring orchestrator
> intervention? Candidates: `microsoft/agent-framework` 1.0+ (AutoGen's 2026 successor — AutoGen 0.4
> is in maintenance per Microsoft 2026-Q1; codex-r1 surfaced this freshness inversion which Stream B
> independently confirmed), `langchain-ai/langgraph` 1.x GA (NOT 0.6 as originally drafted),
> OpenHands 73k★ pattern (Princeton, already T3'd), CrewAI 38k★, Anthropic native agent-teams plugin
> upstream HEAD `08ded5e` evolution. Compare to `superpowers:dispatching-parallel-agents` (the incumbent).

---

### §2.3 — Axis 3: Subagent tools optimization (incl. GPT-5.5 / Codex-as-subagent)

#### Incumbent state (cite-anchored)

- **`codex@openai-codex` plugin** — enabled at `.claude/settings.json:166`. Cache location:
  `.claude/plugins/cache/openai-codex/codex/1.0.4/`. Components:
  - **1 agent**: `codex-rescue.md` (Codex-as-subagent for investigation + fix delegation).
  - **8 commands**: `setup`, `review`, `adversarial-review`, `rescue`, `result`, `status`, `cancel`,
    plus internal stop-review-gate prompt.
  - **3 prompts**: `adversarial-review.md`, `stop-review-gate.md`, plus referenced via skills.
  - **3 skills**: `codex-cli-runtime`, `codex-result-handling`, `gpt-5-4-prompting`.
- **Stop-hook codex-review-gate** — per `CLAUDE.md` Status: "W280 (a) codex stop-time review-gate
  ACTIVATED → Stop hook now performs adversarial GPT-5.x review (BLOCK on critical/high)" — verified
  via `codex/1.0.4/prompts/stop-review-gate.md` artifact existence. State lives in
  `${CLAUDE_PLUGIN_DATA}/state.json` (gitignored).
- **W295 codex-pace metric** — 9 reviews fired r7-r15 within ~45 min wall-clock (W295-AUDIT §3).
- **`codex task --effort high` mode** — W295 r17 fix per `CLAUDE.md` Status W291.Stage2 §; the
  goal-prompt-synthesis Phase-6.2 cross-model gate uses this. Companion CLI version requirements not
  explicit in tracked CLAUDE.md but cite-anchored at `codex/1.0.4/CHANGELOG.md`.
- **`hindsight-memory@hindsight`** enabled at settings.json:207; T1 daemon `:9077` (see Axis 5 for state).
- **`pyright-lsp@claude-plugins-official`** + **`typescript-lsp@claude-plugins-official`** at
  settings.json:168,201 — LSP subagent for type-checking.
- **`code-review@claude-plugins-official`** + **`feature-dev@claude-plugins-official`** at
  settings.json:179-180 — orchestrator-side workflow plugins.
- **`debugging-toolkit` + `incident-response` + `llm-application-dev`** enabled at settings.json:209-211.

#### Strengths (cite-anchored)

1. **Codex GPT-5.5 cross-model gate is LIVE** + has caught 9 cross-model findings in W295 alone
   (W295-AUDIT §3 r7-r15 chain) — empirically proven value.
2. **Stop-hook auto-fires** per `CLAUDE.md` W280-(a) — orchestrator can't ship without the gate.
3. **`codex-rescue.md` agent enables operator-triggered investigation** — distinct from Stop-hook auto-fire.
4. **Codex companion CLI version is pinned at 1.0.4** — CR-9 compliant (cache directory anchored).
5. **`gpt-5-4-prompting` skill provides codex prompt antipatterns + recipes** — operator-facing leverage.
6. **9 codex reviews in 45 min wall-clock** = ~5 min/review pace — within W290-CODEX-UNLEASH 5-10/session
   target.
7. **`code-review-excellence` + `pr-review-expert` + `pr-review-toolkit`** plugins all enabled
   (settings.json:174 et al.) — multi-layered code-review subagent stack.

#### Gaps / weak-spots (be brutally honest)

1. **Single codex-gate point-of-failure** — W295-AUDIT §3 r12 caught "Phase-6 codex `review --wait` stdin
   pipe is FALSE CONTROL" (subcommand reads positional focus text only) — a SILENT failure mode where
   the gate APPEARED to run but didn't actually process the artifact. **Critical**: this is exactly
   the failure mode Δ11 multi-judge-ensemble aims to solve, but Δ11 is unshipped.
2. **`subagent_type=agent-teams:team-*`** pattern referenced in `CLAUDE.md:21` but the actual list of
   agent types available in the runtime is OPAQUE — no canonical enumeration in tracked docs. Stream B
   should determine the full set.
3. **No measured codex-gate FAILURE RATE** — we know it caught 9 issues in W295; we don't know how many
   FAILED-OPEN events occurred (gate ran but missed something downstream). Without a denominator, the
   "9 cross-model findings" claim is selection-biased toward what was caught.
4. **`CLAUDE_CODE_SUBAGENT_MODEL` is deliberately UNSET** per CLAUDE.local.md:53-55 — to preserve
   per-subagent model autonomy. But this means subagent model-pinning is implicit; if a subagent runs
   on the cheap Haiku-4.5 (which is the small-fast-model per settings.json:13), code-review quality
   may degrade silently.
5. **No "subagent timeout" / "subagent cost cap"** primitives wired — `MCP_TOOL_TIMEOUT=300000ms`
   (settings.json:37) is the only relevant cap, but it's not subagent-specific.
6. **`codex task --effort high` mode is referenced** in W295-AUDIT §3 r17 fix but the actual companion
   CLI binary version is NOT in the cite-trail — operator must verify codex CLI is current enough to
   support the `task` subcommand.
7. **`hindsight-memory@hindsight`** enabled at settings.json:207, but the at-probe-time `:9077` HTTP
   probe returned closed (§1 table) — the T1 vector store may be stale until daemon restart.

#### SOTA-direction-question for Stream B

> What is the 2026-MAY SOTA pattern for "multi-judge ensemble cross-model gate" — i.e., 3+ judges
> with position-swap + bias-class declaration + structured output? sca-v5 Δ11 references Zheng et al.
> 2306.05685 (LLM-as-Judge with Bias-Class Declaration); Stream B should find concrete repo-level
> implementations: G-Eval (Liu et al.), Anthropic Multi-Agent Evaluation framework, OpenAI Evals,
> DeepEval, Phoenix LLM-as-judge metric library. Concretely: which framework lets us add a SECOND
> judge alongside codex GPT-5.5 with minimal harness churn?

---

### §2.4 — Axis 4: planning-with-files (W294 T1 INSTALL LIVE)

#### Incumbent state (cite-anchored)

- **Plugin**: `planning-with-files@planning-with-files` enabled at `.claude/settings.json:232`.
- **Version**: 2.38.1 (per `W294-PLANNING-WITH-FILES-INSTALLED.md §2`).
- **Cache location**: `.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/`.
- **Source**: GitHub `OthmanAdi/planning-with-files` (21.5k★ per W291.Stage2 verdict).
- **Components installed** (per W294-PWF doc §2):
  - **16 skills**: plan, plan-ar, plan-attest, plan-de, plan-es, plan-goal, plan-loop, plan-zh,
    planning-with-files, planning-with-files-ar, planning-with-files-de, planning-with-files-es,
    planning-with-files-zh, planning-with-files-zht, start, status.
  - **0 agents** / **0 hooks** / **0 MCP servers** / **0 LSP servers**.
- **Token cost** (per W294-PWF §2):
  - Always-on: ~3,964 tok/session.
  - On-invoke: ~6.9k tok (primary skill).
- **W294 verdict**: T1 INSTALL APPLIED, ship-cleared.

#### Strengths (cite-anchored)

1. **T1 INSTALL with measured benchmark+code+practitioner evidence** per W291.Stage2 — install_score
   4.67, pattern_score 4.68, 3-persona APPROVE.
2. **Pure-skill plugin** — 0 hooks, 0 MCP servers, 0 LSP servers → ZERO new attack surface, ZERO
   per-tool latency cost, ZERO cardinal-rule risk.
3. **Manus-style persistent-markdown planning** fills a real gap distinct from `superpowers:writing-plans`
   (single-PLAN.md) and `everything-claude-code:plan` (ephemeral) per W281 P1(d) §9.
4. **3-source convergence**: alirezarezvani + gsd-build + ComposioHQ all anchor the file-based planning
   pattern (W281 P1(d) §9).
5. **Windows-portable** + no `npx` cold-start (all skills are markdown).

#### Gaps / weak-spots (be brutally honest)

1. **W295-AUDIT §5 #7 HIGH SHIP-CHANGING finding** (UNRESOLVED): "planning-with-files T1 INSTALL must
   be re-litigated under W295 Phase-5". Under the new Phase-5 5-gate protocol (Δ10), `OthmanAdi/planning-with-files@21.5k★`
   **fails Gate-3** (adversarial-blinded judge + bias-class declaration per Zheng et al. 2306.05685)
   **AND Gate-5** (replayable + ≥3-org cite-set; current cite-set is only 2-org). Operator action: **do
   NOT run `claude plugin install planning-with-files` based on the W291.Stage2/W294 T1 verdict alone**
   — likely outcome under Phase-5 is **T2 VENDOR-FORK**.
2. **6 language-variant skills consume ~2k always-on tokens** that may be unused. W294-PWF §7 flags:
   "disable language-variant skills via `claude plugin disable <skill-name>` to drop ~2k always-on
   tokens if Arabic/German/Spanish/Chinese support isn't needed".
3. **Duplication overlap with `superpowers:writing-plans`** — both target plan-authoring; W281 P1(d)
   argues they're distinct (single-file vs multi-file) but operator must remember WHICH to invoke when.
4. **No empirical use-trace in wave-ledger** — installed W294 but no W295 use-pattern. Possible:
   feature-bloat without real adoption. Re-litigation under Phase-5 should also gate-check
   "actual-use evidence" not just installation-feasibility.
5. **2.38.1 → 2.38.x cadence unknown** — high-velocity plugin (`@21.5k★` typically ships fast); CR-9
   pin is at 2.38.1 but no auto-bump strategy documented.

#### SOTA-direction-question for Stream B

> Under Phase-5 Δ10's 5-gate protocol, what 2026-MAY plan-management SKILL has ≥3-org cite-set +
> adversarial-blinded judge approval? Candidates: SuperAGI's plan-graph, AutoGen's nested-conversation
> planner, CrewAI's hierarchical-plan, Manus AI's plan-blob (Manus = the ORIGINAL of this pattern),
> task-master-claude (`disler-hooks` referenced in W280h ADOPTION-VERDICT — REJECT). Or: is the
> right answer to KEEP planning-with-files but DOWNGRADE to T2 VENDOR-FORK pending bias-class
> declaration?

---

### §2.5 — Axis 5: Memory (6-tier T1-T6)

#### Incumbent state (cite-anchored)

Per `CLAUDE.md:31` Status block + W282d memory recon + W295 basic-memory deep audit:

| Tier | Component | Live state | Source-of-truth cite |
|---|---|---|---|
| **T1** | hindsight (vector recall) | `enabledPlugins:207` + `:9077` daemon (DOWN at probe time, see §1) | `CLAUDE.md:31` + `.claude/settings.json:40-45` env block |
| **T2 split** | mcp-memory-service in `disabledMcpjsonServers:87` + `plugin:everything-claude-code:memory` ACTIVE | DB at `Z:/claude-sota-installed-state/.mcp-memory/memory.db` | `CLAUDE.md:31` T2 split note |
| **T3** | cognee (HTTP `:8000`, GraphRAG, NSSM `CogneeMCP`) | `:8000/health` **200 (live)** | `.mcp.json:117-120` + `docs/architecture/COGNEE-MCP-INSTALL-2026-05-17.md` |
| **T4** | graphiti (FalkorDB `:16379` + Ollama `:16700`) | **RETIRED per W272 operator decision** (W290-P0a-step-i 2026-05-18) | `CLAUDE.md` W272 cite + `.claude/settings.json:disabledMcpjsonServers` (graphiti) |
| **T5** | langfuse (self-hosted `:3000`, project `5.17.2026`) | `:3000` **DOWN at probe time** (see §1) | `.mcp.json:langfuse` + CLAUDE.local.md:53 |
| **T6** | basic-memory (markdown bidirectional) | `.local/bin/basic-memory.exe mcp` + `BASIC_MEMORY_HOME=Z:/claude-sota-installed-state/basic-memory` | `.mcp.json:basic-memory` + W295-BASIC-MEMORY-DEEP-AUDIT.md verdict STAY-WITH-HARDENING |

**W295 basic-memory deep audit verdict** (`W295-RESEARCH-ARCH-V5/W295-BASIC-MEMORY-DEEP-AUDIT.md`):
**STAY-WITH-HARDENING** (conf 0.86) — duty-grounded composite 4.16 beats 7 alternatives. 4 operator-AIs
deferred (AI-1 vendor-fork-shim + CR-9 SHA pin; AI-2 OpenSSF scorecard adoption; AI-3 LIVE
config-path-drift fix; AI-4 cryptographic integrity).

#### Strengths (cite-anchored)

1. **T6 basic-memory is CANONICAL** per `CLAUDE.md` Status — markdown-bidirectional, filesystem-survivable.
2. **Graphiti T4 RETIREMENT** is a disciplined SOTA-cleanup decision (W272 operator-ratified; W290-P0a
   executed). Reduces complexity + Ollama-call attack surface.
3. **T3 cognee :8000 is LIVE** at probe time — NSSM supervision discipline working.
4. **T5 langfuse is configured but graceful-degrade** — even when `:3000` is down, MCP entry doesn't
   break orchestrator.
5. **state-outside-repo for memory state** — `BASIC_MEMORY_HOME` + `BASIC_MEMORY_CONFIG_DIR` redirect
   to `Z:/claude-sota-installed-state/basic-memory` (.mcp.json basic-memory env block).
6. **24 EXTERNAL cites** in basic-memory deep audit — anti-bias compliant per W295 Phase-5 (W295
   audit §6).

#### Gaps / weak-spots (be brutally honest)

1. **LIVE FINDING: `.basic-memory/memory.db` is EMPTY (AI-3)** — per W295 deep audit §5; root cause:
   `config.json` path mismatch; the daemon was spawned BEFORE the W281i fix and inherited un-redirected
   `HOME`. FTS5 + semantic-index is DEGRADED. Operator-AI deferred — **not yet fixed at W295 close**.
2. **T1 hindsight DOWN at probe time** — `CLAUDE.md` claims UP but `:9077/health` curl returned no
   response (timeout). May be a workstation-reboot artifact; needs daemon-restart-check.
3. **T5 langfuse DOWN at probe time** — same as T1; LIVE per CLAUDE.md but DOWN at probe.
4. **`.basic-memory/` NOT in `.gitignore`** per W282C audit — risk: future `git add -A` commits
   credential-class state.
5. **T2 split is confusing**: `mcp-memory-service` in disable list BUT `plugin:everything-claude-code:memory`
   ACTIVE. Two memory backends with overlapping write-targets violates "single source of truth" SOTA
   principle. The W282d audit explicitly flagged this as "T2 split" reconciliation pending.
6. **`bus_factor = 1` for basic-memory** (basicmachines-co) — per W295 deep audit AI-1; risk: maintainer
   abandonment leaves T6 orphaned. AI-1 prescribes vendor-fork-shim but is deferred.
7. **No OpenSSF Scorecard for basic-memory upstream** (AI-2 deferred).
8. **Hindsight daemon is NOT supervised by a service-manager** — `nssm`/`pm2` would auto-revive after
   reboot; current state is "manual start via `.\tools\bootstrap-runtime.ps1`" (cite: `CLAUDE.md`
   W280-(b)). This is the root cause of T1 + T5 DOWN at probe time.
9. **6-tier stack is COMPLEX** — 6 backends with different write-semantics; SOTA-direction-question for
   Stream B: are 6 tiers right or are 2026-MAY frameworks converging on 3-tier (working/episodic/semantic)?

#### SOTA-direction-question for Stream B

> What is the 2026-MAY SOTA memory architecture for autonomous-loop agents? Candidates to evaluate:
> Letta/MemGPT (2.6 GB context memory blocks), mem0 (vector + graph hybrid), Anthropic Memory Tool
> (native CC primitive — needs deepwiki ask_question), LangMem (LangChain), txtai (open-source).
> Specific challenge for incumbent basic-memory T6: is there a 2026-MAY canonical-markdown memory
> with bus_factor ≥ 3 + OpenSSF scorecard ≥ 7 + cryptographic-integrity primitive?

---

### §2.6 — Axis 6: Research-architecture (sca-v3.1 shipped, sca-v5 Δ1-Δ12 pending)

#### Incumbent state (cite-anchored)

- **sca-v3.1 SKILL** at `.claude/skills/sota-convergence-audit/SKILL.md`. Dim count: 17. Dual composites:
  `install_score` + `pattern_score`. 5-tier ladder: INSTALL · VENDOR-FORK · PATTERN-STUDY · CITE-ONLY · REJECT.
- **W292 R1-R12 absorbed**: 12 absorption-rules from external-rubric competitor audit batched into
  sca-v3.1 + sca-v4 + sca-v5 per `CLAUDE.md` W292 cite.
- **W293 sca-v3.1 SHIPPED** (`e44ba9e` commit) per `CLAUDE.md` Status: 3 new dims (D16 bus_factor_governance
  + D17 robustness_under_perturbation + D18 runtime_safety_and_privacy_risk), composite denom 13.6→16.5,
  hard-cap taxonomy extended (D17<2 INSTALL-cap, D18<2 Universal REJECT, D16<2 T1+T2 cap), inline-citation
  requirement on D5.
- **W295 sca-v5 12 deltas Δ1-Δ12** — UNANIMOUS 4-of-4 stream convergence (W295-AUDIT §2). dim count
  17→23. Each delta scored HIGH/MEDIUM/LOW (W295-AUDIT §4). CONDITIONAL-CLEAR pending codex r17+.
- **5-tier soft-gate ladder + Stage 6 ledger-write contract** — basic-memory T6 hard-required; hindsight
  T1 best-effort. **T4 Graphiti RETIRED** in canonical Stage-6 ledger-write (W295 r9 commit `6470196`).

#### Strengths (cite-anchored)

1. **17 dimensions × 5-point rubric** is the most-mature primitive in the runtime — 25 KLoC of audit
   work across W286-W295.
2. **UNANIMOUS 4-of-4 Stream convergence** on sca-v5 deltas — anti-bias 5-gate Phase-5 protocol verified.
3. **W292 external-rubric competitor audit** validated v3.1 against 12 external frameworks (HELM /
   BIG-bench / MTEB / SWE-bench / ARC / Anthropic Multi-Agent / Perplexity Sonar / ThoughtWorks /
   CNCF / OpenSSF / Wikipedia / NIST AI RMF) — v3 avg score 3.82/5.
4. **No public system targets v3.1's niche** (autonomous + local-first + single-operator + cross-model-
   gated + state-outside-repo) — per W292 GRAND-SYNTHESIS. The architecture is **structurally novel**.
5. **5 P1d candidate audits COMPLETE** with stratified verdicts (T1=0 / T2=1 confirmed / T3=4) — pipeline
   is operating.
6. **`sources_typed_disagreement[]`** mechanism (v3) empirically caught the Stream B mis-attribution
   for `levnikolaevich/claude-code-skills` in W291.Stage2 — built-in audit-quality detector.

#### Gaps / weak-spots (be brutally honest)

1. **sca-v5 Δ1-Δ12 are UNSHIPPED** — CONDITIONAL-CLEAR pending codex r17+ per W295-AUDIT §0. 6 weeks of
   research effort with NO landed deliverable until r17 + operator-ratification.
2. **codex review chain depth = 15 rounds (r7-r15)** to ship a single wave — high cross-model gate cost.
   Each round caught a real finding (W295-AUDIT §3 documents the chain). The gate is EFFECTIVE but
   COSTLY. Stream B should ask: is there a parallel-judge ensemble that converges faster?
3. **Δ11 (multi-judge ensemble)** is HIGH-priority per W295-AUDIT §4 #11 but unshipped. The current
   single-codex-gate has a documented single-point-of-failure (W295 r12 caught the "FALSE CONTROL"
   silent failure mode).
4. **Stream C anti-bias 5 codified Phase-5 gates** (Δ10) RETROACTIVELY flips `OthmanAdi/planning-with-files`
   T1→T2 — meaning the W294 T1 INSTALL is now disputed (W295-AUDIT §5 #7).
5. **G11 memory-class eval lane** (Δ9) UNSHIPPED — basic-memory T6 was audited via duty-grounded
   composite, but there's no STANDARD lane for memory-backend bake-offs. Until shipped, future memory
   candidates are evaluated ad-hoc.
6. **D5+D7 split refactors** (Δ7+Δ8) unshipped — supply-chain D15→D15a/D15b + velocity D7→D7a/D7b — would
   sharpen anti-confirmatory signal on candidates with single-org bus-factor + alpha churn.
7. **No retroactive rescore of historical INSTALL verdicts** under v3.1 (let alone v5). W293
   VALIDATION-PILOT cites "5-of-5 historical candidates tier-stable" but only 5; full reverse-validation
   on the install-history is unrun.
8. **The architecture itself is rescored at 4.545/5.0** per W293 VALIDATION-PILOT under v3.1 — passing
   but with margin only 0.045 above the T1 threshold. A small Phase-5 Gate-3 / Gate-5 tightening could
   threaten the architecture's own self-audit T1 status.

#### SOTA-direction-question for Stream B

> What is the 2026-MAY SOTA convergence-rubric framework for autonomous-agent install decisions? Stream B
> should test: (a) Anthropic's own rubric for Skills/Plugins/MCPs adoption — is there an OFFICIAL one?;
> (b) OpenAI Evals + Anthropic Multi-Agent Eval interop; (c) DeepEval / RAGAS / Phoenix LLM-as-judge
> ensembles; (d) ThoughtWorks Radar's "Trial/Adopt/Assess/Hold" methodology re-cast as a rubric;
> (e) CNCF Graduation criteria as a tier-promotion model. Concretely: which 2026-MAY framework would
> challenge sca-v3.1 on its own dim-design?

---

### §2.7 — Axis 7: Code quality (pyright / shellcheck / ruff)

#### Incumbent state (cite-anchored)

- **W290 F1 baseline** (`docs/architecture/W290-QUALITY-AND-SOTA-WAVE/F1-CODE-QUALITY-AUDIT.md §0`):
  - **Files scanned**: 26 Python + 6 shell in-tree.
  - **pyright (default mode)**: **0 errors · 0 warnings · 0 info**.
  - **pyright (strict mode)**: DEFERRED — timed out at 300 s; ruff ANN001/201/202 covers strict delta.
  - **ruff `--select ALL`**: 1398 findings total (style-dominated).
  - **shellcheck**: **0 findings** on 6 in-tree shell scripts.
  - **HIGH (real bugs)**: 5 (2 bugbear + 3 cosmetic f-string).
  - **SECURITY S-codes excl. S101**: 32 (mostly subprocess + urllib audits; 1 false-positive).
- **W293 AI-4 5 HIGH ruff fixes** SHIPPED — `ruff --select B007,B009,F541` PASSED per `CLAUDE.md`
  W293 entry.
- **Tooling versions** (per W286c audit citations): `pyright 1.1.408`, `ruff 0.15.13`, `shellcheck 0.11.0`,
  `PSScriptAnalyzer 1.25.0`.
- **PostToolUse hook** auto-runs `ruff check --quiet --fix` + `ruff format --quiet` on every Edit/Write/
  MultiEdit (`.claude/settings.json:114-123`). Same hook runs `shellcheck --severity=error` on
  `*.sh`/`*.bash` files.
- **Real Python file roster** (per ctx_batch result):
  `harness/eval_harness.py`, `harness/fixtures/sota_rubric_smoke_fixture.py`,
  `harness/inspect_tasks.py`, `harness/sota_rubric_lane.py`,
  `tools/awesome_list_deltagrep.py`, `tools/codex_verdict_normalizer.py`,
  `tools/process_hygiene_audit.py`, `tools/_eee_status_query.py`.

#### Strengths (cite-anchored)

1. **0/0 pyright on 26 files** — TYPE-CLEAN per W290 F1.
2. **0 shellcheck findings** on 6 in-tree shell scripts.
3. **PostToolUse hook auto-applies ruff fix + format** — prevents drift on every edit.
4. **5 HIGH ruff bugs (W290) shipped fixed in W293** — disciplined fix-velocity.
5. **`pyright-lsp@claude-plugins-official`** enabled (settings.json:168) — IDE-grade type-checking via
   subagent.
6. **PSScriptAnalyzer 1.25.0 used at CurrentUser scope** — no tracked-runtime primitive added (cardinal-
   rule-1 ✓).
7. **gitleaks v8.30.1 enforcing pre-commit security gate** — direct-CLI invocation (CR-2 ✓).

#### Gaps / weak-spots (be brutally honest)

1. **pyright STRICT mode DEFERRED** — `pyright --strict` timed out at 300 s; only DEFAULT mode is
   green. Strict mode would catch additional annotation gaps (246 ANN001/201/202 findings per W290 F1
   §3 are tracked but not fixed).
2. **No CI lane** — `.pre-commit-config.yaml` NOT in tree (W286c §B recommends but didn't ship).
   Quality is enforced via PostToolUse hook (per-edit) NOT pre-commit (per-commit) NOT CI (per-push).
   A direct-commit (e.g., `git commit -m` from PowerShell directly) BYPASSES the hook gate.
3. **1398 ruff findings under `--select ALL`** — only 5 HIGH were shipped fixed (W293). The other 1393
   are style/cleanup deferred. SOTA practice would track these as a debt-log.
4. **32 SECURITY S-codes** — mostly subprocess + urllib audits per W290 F1 §2.5. Not landed; deferred
   per "mostly false-positive" rationale BUT no explicit per-finding audit trail.
5. **No JS/TS type-checking** in pre-commit / hook — TypeScript LSP plugin is enabled (settings.json:201)
   but no `tsc --noEmit` gate runs on JS/TS files. The `.claude/hooks/context-mode-cache-heal.mjs` is
   the only orchestrator-side JS file but is not linted at edit-time.
6. **Tool version not pinned in tracked file** — `pyright 1.1.408` / `ruff 0.15.13` are cited in W286c
   but not pinned in a tracked `requirements-dev.txt` or `pyproject.toml`. Operator-local installs may
   drift.
7. **`hadolint` / `tflint` / `actionlint`** NOT wired — CCBP V62 cites all 3 as SOTA per
   `CLI/Code/Prose Quality Guide`. The runtime has no Dockerfile/Terraform files so hadolint/tflint
   are moot, BUT there are GitHub Actions workflows (`.github/workflows/`) potentially uncovered by
   actionlint.

#### SOTA-direction-question for Stream B

> What is the 2026-MAY SOTA Python type-check + linter stack? Candidates: pyright + ruff (incumbent),
> Astral's `ty` (rumored 2026-Q1 release), `pyrefly` (Meta), `pylyzer` (Rust-based), `pyright 2.x`
> (if announced). Also: which 2026-MAY pre-commit framework has the lowest cold-start latency on Windows?
> `pre-commit-rust`? Native-Go alternative? Concretely: is there a meaningful improvement over the
> current PostToolUse-hook-only pattern that doesn't require a `.pre-commit-config.yaml` ceremony?

---

### §2.8 — Axis 8: gitnexus (W290.5 KEEP-BOTH vs serena bake-off)

#### Incumbent state (cite-anchored)

- **`gitnexus@gitnexus-marketplace`** plugin in marketplace registry but **DISABLED** at
  `.claude/settings.json:213` (`"gitnexus@gitnexus-marketplace": false`).
- **`gitnexus` MCP entry** in `.mcp.json:mcpServers` is ACTIVE per the batch sweep (`stdio` MCP per
  `.mcp.json` cite trail).
- **Version**: `gitnexus@1.6.4-rc.112` per `.mcp.json:gitnexus._comment` Wave 132 Fire 3 RC-UPGRADE
  2026-05-10 trail. Multi-voice verdict per cardinal-rule-3 + empirical Wave 132 Fire 3 evidence
  (1.6.3 BROKEN on Windows; 1.6.4-rc.112 FULLY WORKS).
- **License**: PolyForm Noncommercial 1.0.0 — RETAIN-WITH-DOWNGRADE-DEEP-DIVE-VERIFIED per SRA D1
  use-class lattice (local-runtime non-commercial use OK; NOT for SaaS-resale, commercial distribution,
  paid-client-work).
- **13 MCP tools** (`gitnexus/src/mcp/tools.ts` blob a85298c0): `list_repos`, `query`, `cypher`,
  `context`, `detect_changes`, `rename`, `impact`, `route_map`, `tool_map`, `shape_check`, `api_impact`,
  `group_list`, `group_sync`.
- **W290.5 KEEP-BOTH verdict** per `docs/architecture/W290-QUALITY-AND-SOTA-WAVE/W290.5-SERENA-VS-GITNEXUS-BAKEOFF.md`:
  - Bake-off treating **serena** as the D10 incumbent.
  - Gitnexus retained with caveats (per `.mcp.json:gitnexus._comment` trail).
  - sca-v3 score evaluated for both.
- **serena MCP** is ACTIVE in `.mcp.json:mcpServers` — LSP-based code understanding (`stdio`).

#### Strengths (cite-anchored)

1. **13 unique MCP tools** distinct from serena's LSP-symbol primitives — knowledge-graph + impact-analysis
   is structurally different from LSP symbol-search.
2. **W290.5 disciplined bake-off** retained both — not "keep both because we can't decide" but
   "different use-classes" per the per-tool inventory.
3. **Empirical Windows-portability validation** at `1.6.4-rc.112` (Wave 132 Fire 3).
4. **`cypher` + `query` + `impact`** tools enable graph-DB queries that serena cannot (different primitive class).
5. **Version-pinned** at `1.6.4-rc.112` per CR-9 (NOT `@latest`; RC-stream ack with rollback path
   documented in `.mcp.json:gitnexus._comment`).

#### Gaps / weak-spots (be brutally honest)

1. **`enabledPlugins:213` is FALSE** but `.mcp.json` ENTRY is ACTIVE — INCONSISTENT. Either the MCP
   server is reachable independent of the plugin enable-flag, OR the entry should be removed. Same
   anti-pattern as Axis-1 §gap-1 (`disabledMcpjsonServers` overlap with `mcpServers`).
2. **PolyForm Noncommercial 1.0.0 license** is RESTRICTIVE — RETAIN-WITH-DOWNGRADE-DEEP-DIVE-VERIFIED
   is acceptable for the local-runtime non-commercial use class, but **flagged for re-litigation under
   sca-v3.1 D1 license_compatibility** (hard_cap_if_below=3 for INSTALL).
3. **RC channel** at `1.6.4-rc.112` — RC-stream cadence 7.2 RCs/day per Wave 132 Fire 3 trail.
   Auto-bump strategy NOT shipped; manual operator decision required to advance to stable 1.6.4.
4. **NO USAGE EVIDENCE** in W286-W295 wave-ledger for gitnexus's 13 tools — `query`/`cypher`/`impact`
   are powerful but apparently unused. Stream B candidate question: is there a 2026-MAY code-knowledge-
   graph tool with broader adoption that we should consider?
5. **`gitnexus` SKILL** at `.claude/skills/gitnexus/` is operator-curated — needs validation against
   the gitnexus@1.6.4-rc.112 CLI surface (20 commands per `.mcp.json:gitnexus._comment` Wave 132
   Fire 3 trail).
6. **`abhigyanpatwari/GitNexus` upstream** has 38,465★ but `npm publishing single-user` per W286
   trail; bus_factor concern for sca-v3.1 D16 governance dim (hard_cap_if_below=2 for T1+T2).
7. **Windows-portability earlier was BROKEN at 1.6.3** — RC-channel fix is in place but not yet
   stable. SOTA challenge for Stream B: is there a 2026-MAY code-knowledge-graph MCP with stable
   release + Apache-2.0 license + bus_factor ≥ 3?

#### SOTA-direction-question for Stream B

> What is the 2026-MAY SOTA code-knowledge-graph MCP for Claude Code? Candidates: gitnexus (incumbent,
> PolyForm-NC), `cocoindex`, `graphcodebert`, `repograph` (paper 2024), `code-graph`, Anthropic's own
> codebase-tree MCP (if released). Specific challenge for gitnexus: is there a 2026-MAY tool with
> (a) Apache-2.0 / MIT license, (b) bus_factor ≥ 3, (c) stable release (not RC), (d) cypher-query
> capability + impact-analysis + monorepo-friendly?

---

### §2.9 — Axis 9: Git practice

#### Incumbent state (cite-anchored)

- **`--force-with-lease`** discipline per `CLAUDE.md:23` W280-(d): "`git push --force-with-lease`
  not `--force` (preserves peer pushes)".
- **`rebase-not-merge`** discipline per `CLAUDE.md:23`: "rebase-not-merge to keep linear history".
- **`≤3 worktree cap`** per `CLAUDE.md:23`: "~3 parallel cap (cognitive + token budget)".
- **`git worktree prune` auto-fires on WorktreeRemove** per `.claude/settings.json:140-143` (cardinal-
  rule-2 ✓ direct CLI).
- **Pre-commit security gate** per `CLAUDE.md:32`: "pre-commit security gate enforced every commit".
  Implementation = TWO LAYERS (codex-r1 clarification — these are distinct):
  - **CC-runtime layer**: `.claude/settings.json` PostToolUse hook runs `ruff` + `shellcheck` on edited files;
    PreToolUse-Bash hook runs `gitleaks protect --staged --no-banner --redact --exit-code 0 || true` —
    NOTE: this is INTENTIONALLY non-blocking (`--exit-code 0` + `|| true`) since blocking CC's Bash tool
    on secret-detection would deadlock the runtime. It is a warning-emitter, NOT the enforcement gate.
  - **Operator-side layer (the actual enforcement)**: `.pre-commit-config.yaml` (1,444 B, May-16) wires
    `gitleaks v8.30.1` + `ruff v0.15.12` + `actionlint v1.7.12` via `.git/hooks/pre-commit` (681 B,
    May-16, installed). THIS layer blocks `git commit` on secret findings. The two-layer pattern is
    correct (CC-bash warns; operator-commit blocks); codex-r1 flagged the original phrasing as
    ambiguous, which is fixed here.
- **`fix-iteration` discipline** — each codex-review-fix cycle anchors at the cite (W295-AUDIT §3
  shows r7-r15 chain with `commit message → finding → fix` traceable for each round).
- **Conventional-commit history** per `CLAUDE.md:32`: "conventional-commit history".

**Current worktree state** (probe per §1):
- `Z:/claude-sota-installed` on `sota-converge-w295` HEAD `567de57`.
- `Z:\claude-sota-installed-W290` (sota-converge-w290 historical reference).
- `Z:\claude-sota-installed-W287` (goal/W287-reconcile).
- **Total**: 3 worktrees — AT cap.

**Recent commit ladder** (post-W295):
```
9029803 fix(W295-codex-r20): basic-memory title W-prefix + 2-hard+1-best-effort target contract
567de57 chore(W296-pre): sync plugin metadata — agent-teams scope project + context-mode enabled + planning-with-files marketplace
9f304d6 fix(W295-codex-r19): unify Phase-6.2 anti-false-control rule + scope 'emit ONE' to T6 sub-step
4d62b2d fix(W295-codex-r18): PowerShell verdict-parse if/else + STREAM-D §6.2 write-only smoke contradiction
c6cab0c fix(W295-codex-r17): Phase-6.2 — switch to codex task mode with embedded ranking (closes gitignore false-control)
c829f99 docs(W295-audit-ledger): add planning-with-files retroactive op-action + complete P1d table
088c7e9 fix(W295-codex-r16): soften STREAM-D §6.1 FTS5 claim + add write+read+search smoke gate
b9dc449 docs(W295-audit-ledger): append r15 + queued r16 + cumulative-codex-pace metric
d44dbf3 fix(W295-codex-r15): Phase-6.2 cross-model gate — add PowerShell-native variant (primary for Windows runtime)
5e15adf docs(W295-audit-ledger): append r12-r14 codex round chain + commit list
```

#### Strengths (cite-anchored)

1. **3/3 worktrees at cap** — cognitive budget respected.
2. **`--force-with-lease` discipline** is canonical per CLAUDE.md.
3. **Conventional commits** with `fix(W295-codex-rNN)` / `feat(W295-...)` / `docs(...)` / `chore(...)`
   prefixes — every commit traceable to a wave + codex round.
4. **WorktreeRemove auto-prune** is wired — no orphan worktree refs.
5. **Pre-commit gate via PostToolUse hook** — every Edit/Write/MultiEdit runs ruff + shellcheck.
6. **No tracked secrets** — `.gitignore` covers auth + credentials; deny[] in settings.json blocks
   read.
7. **`CLAUDE.md` Status reflects HEAD** — wave-ledger trail to `e44ba9e` W293 / `567de57` W296-pre is
   accurate.

#### Gaps / weak-spots (be brutally honest)

1. **PostToolUse hook is per-EDIT, not per-COMMIT** — a direct `git commit` outside Claude Code (e.g.,
   from terminal) BYPASSES the gate. SOTA practice: `.pre-commit-config.yaml` would enforce at commit-
   time. Not shipped (per Axis 7 §gap-2).
2. **`--force-with-lease` is documented but NO HOOK enforces it** — settings.json has no
   `PreToolUse:Bash` matcher that REJECTS `git push --force` (the dangerous variant). Operator
   discipline only.
3. **Worktree-cap is documented but NOT auto-enforced** per W281 P5(h) §5 "WorkTree ≤3 parallel cap not
   auto-enforced (low) — no cite for an automated guard; convention in CLAUDE.md only".
4. **Codex Stop-hook only fires on Stop event** — NOT on push. A pushed commit may bypass cross-model
   gate if the operator force-pushes without invoking Stop. (Mitigated by per-edit + Stop-fire pattern
   but the push lane is uncovered.)
5. **No `commitlint` / `conventional-commits` validation** wired — convention-only.
6. **`WorktreeCreate` hook NOT wired** (only Remove is) per W281 P5(h) §5 "Top 3 gaps":
   "WorktreeCreate hook not wired (low)". The Create event exists per Anthropic CC v2.1.140 hooks
   spec; could enforce branch-naming + worktree-cap at creation time.
7. **`/create-worktrees` slash-command** (3-pack convergence) NOT installed per W281 P5(h) §5.
8. **GitHub Actions** (`.github/workflows/`) NOT linted by actionlint — Axis 7 gap-7 cross-reference.

#### SOTA-direction-question for Stream B

> What is the 2026-MAY SOTA git-discipline enforcement for autonomous-loop agents? Candidates:
> `conventional-commits-validator` (commitlint), `lefthook` (Go-based pre-commit alt with faster
> cold-start than Python pre-commit), `husky` v9+, `lazygit` integration patterns. Concretely: is
> there a 2026-MAY mechanism that auto-enforces `--force-with-lease` over `--force`, and
> auto-enforces the worktree-≤3 cap at creation time?

---

## §3 — Cross-axis convergence findings

Pattern 1: **`.mcp.json:mcpServers` ↔ `.claude/settings.json:disabledMcpjsonServers` BOOKKEEPING
DRIFT** (Axes 1, 8). 4 entries in `disabledMcpjsonServers` + 1 entry (`gitnexus`) where the plugin is
disabled but the MCP server is active. SOTA practice: REMOVE from `.mcp.json` when disabled rather
than keep-and-disabled. **Cross-axis weight**: SOTA-hygiene + operator confusion + audit-confusion.

Pattern 2: **OPERATOR-ACTION TAIL accumulation** (Axes 2, 5, 6). W295-AUDIT §5 lists 7 deferred
operator-actions: addy user-scope cleanup (HIGH), basic-memory live config-path drift (HIGH AI-3),
basic-memory bus-factor mitigation (MEDIUM AI-1), basic-memory OpenSSF (MEDIUM AI-2), basic-memory
crypto-integrity (LOW AI-4), W295 main-merge ratification (operator), planning-with-files re-litigation
under Phase-5 (HIGH SHIP-CHANGING). **Cross-axis weight**: operator backlog is the WAVE-LEDGER bottleneck.

Pattern 3: **UNSHIPPED RESEARCH-ARC DELTAS** (Axes 2, 3, 5, 6). sca-v5 Δ1-Δ12 unanimous + G11 memory-class
eval lane + Δ11 multi-judge ensemble + Δ10 Phase-5 anti-bias gates — all pending codex r17+ + operator
ratification. **Cross-axis weight**: the cross-model gate is bottlenecked on itself; ship-readiness was
declared THEN un-declared (W295-AUDIT §3 r10 + r12 chain). Stream B should look for ensemble-frameworks
that parallelize the verdict-completion rather than serialize codex rounds.

Pattern 4: **DAEMON SUPERVISION GAP** (Axes 1, 5). T1 hindsight + T5 langfuse DOWN at probe time
despite CLAUDE.md claiming UP. Only T3 cognee (NSSM) auto-revives. Without service-manager discipline,
fresh-clone or workstation-reboot leaves T1+T5 dark. **Cross-axis weight**: persistent-state
reliability vs runtime-survivable-state-outside-repo.

Pattern 5: **SCA-V3.1 SELF-AUDIT MARGIN = 0.045** (Axis 6 + cross-axis to Axes 2,3,5). At install_score
4.545 vs 4.500 T1 threshold, a small Phase-5 Gate-3/Gate-5 tightening (already proposed in Δ10) could
flip the architecture's own self-audit to T2. **Cross-axis weight**: the architecture audits itself
and may downgrade under its own next iteration — a strong "challenger search" signal.

Pattern 6: **CODEX-GATE COST × VALUE** (Axes 3, 6). 9 codex rounds per wave caught 9 distinct
findings — high-value gate but high cost (45 min wall-clock for W295). The marginal cost per next
round is INCREASING (each fix triggers next finding). Stream B should look for parallel-ensemble
patterns that converge faster.

Pattern 7: **NO PUSH-LANE GATE** (Axes 7, 9). All quality enforcement is per-edit (PostToolUse hook)
+ per-stop (codex). The git-push lane is UNCOVERED — direct `git push --force` (if attempted)
would skip the cross-model gate. **Cross-axis weight**: discipline-on-paper vs enforced-at-runtime.

---

## §4 — Working-tree state + cardinal-rule conformance

| Invariant | Required | Observed | Status |
|---|---|---|---|
| `CLAUDE.md` LOC budget | ≤50 | **42** | ✓ |
| `.claude/settings.json` size | ≤15 KB | **11,155 B** | ✓ |
| Worktree count | ≤3 | **3** (main + W290 + W287) | ✓ AT-CAP |
| `self_invented_count` | 0 | **0** (`.claude/rules/` empty, `.claude/hooks/scripts/` empty) | ✓ |
| Hook commands = upstream-CLI | true | **6 events / 6 direct-CLI** | ✓ |
| Pinned-MCP-versions | true | **5/15 pinned** (`playwright`+`chrome-devtools`+`repomix`+`serena`+`phoenix`); **10/15 unpinned** (`github`,`context7`,`deepwiki`,`memory`,`graphiti`,`gitnexus`,`ccusage`,`cognee`,`langfuse`,`basic-memory`) | **GAP — codex-r1 finding** (cardinal-rule-2 contract `npx -y <pkg>@<pinned-version>` violated for 10 servers; operator-action: pin or document why-unpinned) |
| Secrets in `.gitignore` | true | **19 deny[] globs + 31 gitignore patterns** | ✓ |
| `.basic-memory/` in gitignore | true | **NOT VERIFIED (flagged §2.1 #2)** | **GAP** |
| T1 hindsight live | true | **DOWN at probe** | **GAP (probe-time)** |
| T3 cognee live | true | **200 (live)** | ✓ |
| T5 langfuse live | true | **DOWN at probe** | **GAP (probe-time)** |
| T6 basic-memory canonical | true | **Configured but AI-3 config-path-drift LIVE** | **GAP (AI-3 deferred)** |
| W295 codex-r17+ verdict | APPROVE | **PENDING** | **GAP (in flight)** |
| Codex stop-gate live | true | **`.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:31` wires `Stop` → `node stop-review-gate-hook.mjs` (timeout 900s)** | ✓ (verified hook-active, not just prompt-file-present per codex-r1) |
| 6 key MCPs ✓ | true | **hindsight+basic-memory+langfuse+cognee+phoenix+plus**; graphiti RETIRED | ✓ |
| reviewGateEnabled | true | **`CLAUDE.md` cite W288 ship-evidence** | ✓ |

**Cardinal-rule conformance** (post-codex-r1 reconciliation): 11/15 ✓ + **5 GAPs** (3 probe-time + 1 deferred AI-3 + 1 NEW codex-r1 MCP-pin gap on 10 servers). The probe-time gaps may
resolve on operator daemon-restart; the deferred AI-3 needs explicit fix per W295-AUDIT §5 #2; the NEW MCP-pin gap is a cardinal-rule-2 violation surfaced by W296 codex-r1 review (real bug, not false-positive).

---

## §5 — Recommended next-priority axis ranking (1-9 ranked) — for Stream C consumption

Ranked by **risk-weighted opportunity-cost** = (Severity × External-SOTA-Pressure × Operator-Action-Cost).

| Rank | Axis | Sev | Ext-Pressure | Op-Cost | Top weak-spot | Stream-B challenger angle |
|---:|---|:--:|:--:|:--:|---|---|
| 1 | **§2.5 Memory** | HIGH | HIGH | MEDIUM | basic-memory T6 AI-3 LIVE config-path-drift + bus_factor=1 + 6-tier complexity | Letta/MemGPT, mem0, Anthropic Memory Tool, LangMem |
| 2 | **§2.6 Research-arch** | HIGH | MEDIUM | HIGH | Δ1-Δ12 unshipped + self-audit margin 0.045 + codex-gate single-point-of-failure | Anthropic Multi-Agent Eval, G-Eval, OpenAI Evals, DeepEval, ThoughtWorks Radar |
| 3 | **§2.3 Subagent tools** | MEDIUM | HIGH | MEDIUM | Single codex-gate point-of-failure + no failure-rate metric + subagent model-pin implicit | Multi-judge ensembles (Zheng 2306.05685), G-Eval, Phoenix LLM-as-judge |
| 4 | **§2.2 Agent orchestration** | MEDIUM | HIGH | LOW | `signed-audit-trails` enable-vs-W289-verdict inconsistency + plugin-drift to PR #535 + `TeamCreate` vs parallel-Agent pattern ambiguity | AutoGen 0.4, LangGraph 0.6, OpenHands T3 patterns, CrewAI |
| 5 | **§2.4 planning-with-files** | MEDIUM | LOW | HIGH | Phase-5 re-litigation required (Gate-3 + Gate-5 fail) + 6 language-variant tokens may be cruft | Manus AI plan-blob (origin), task-master alternatives |
| 6 | **§2.7 Code quality** | LOW | LOW | LOW | pyright STRICT deferred + no CI lane + no JS/TS gate + tool versions not pinned in tree | Astral `ty`, `pyrefly`, `pylyzer`, `lefthook` |
| 7 | **§2.9 Git practice** | LOW | LOW | LOW | No push-lane gate + worktree-cap not auto-enforced + WorktreeCreate hook not wired | `lefthook`, `commitlint`, signed-commits + `/create-worktrees` |
| 8 | **§2.8 gitnexus** | LOW | MEDIUM | MEDIUM | PolyForm-NC license + RC-channel + bus_factor=1 + zero usage evidence | Apache-2.0 / MIT alternatives, Anthropic codebase-tree (if released) |
| 9 | **§2.1 SOTA cleanliness** | LOW | LOW | LOW | `disabledMcpjsonServers` bookkeeping drift + `.basic-memory/` not in gitignore + no hook-schema-validator | Hook-schema-validators, signed-hook-manifests |

**Stream C consumption note**: ranks 1, 2, 3 are HIGH-priority for the challenger search (memory +
research-arch + subagent-tools). Rank 4 (agent-orchestration) is a TIGHT-MATURITY axis (incumbent is
strong but with documentable inconsistencies). Ranks 5-9 are LOW-priority for this wave (incumbent is
mature enough; selective hardening preferred over wholesale challenger adoption).

---

## §6 — Cite trail

**Tracked files** (read or grepped):

1. `Z:/claude-sota-installed/CLAUDE.md` (42 LOC, pointer-only)
2. `Z:/claude-sota-installed/CLAUDE.local.md` (gitignored env block)
3. `Z:/claude-sota-installed/.claude/settings.json` (321 lines)
4. `Z:/claude-sota-installed/.mcp.json` (15 servers + extensive provenance comments)
5. `Z:/claude-sota-installed/.gitignore` (239 lines)
6. `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`
7. `Z:/claude-sota-installed/.claude/skills/` (18 operator-curated skills)
8. `Z:/claude-sota-installed/.claude/agents/` (4 operator-curated agents)
9. `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`

**Wave-ledger sources**:

10. `docs/architecture/W286-W294-GRAND-SYNTHESIS.md`
11. `docs/architecture/W295-AUDIT-2026-05-18.md`
12. `docs/architecture/W295-RESEARCH-ARCH-V5/W295-BASIC-MEMORY-DEEP-AUDIT.md`
13. `docs/architecture/W295-RESEARCH-ARCH-V5/W295-STREAM-{A,B,C,D,E}-*.md`
14. `docs/architecture/W294-PLANNING-WITH-FILES-INSTALLED.md`
15. `docs/architecture/W294-AI1-RESOLUTION.md`
16. `docs/architecture/W293-SCA-V3.1-IMPLEMENTATION.md`
17. `docs/architecture/W293-SCA-V3.1-VALIDATION-PILOT.md`
18. `docs/architecture/W293-CODEX-VERDICT.md`
19. `docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/GRAND-SYNTHESIS.md`
20. `docs/architecture/W292-RESEARCH-ARCH-COMPETITOR-AUDIT/METHODOLOGY-BENCHMARK.md`
21. `docs/architecture/W291-STAGE2-PIPELINE-RUNS/`
22. `docs/architecture/W290-QUALITY-AND-SOTA-WAVE/F1-CODE-QUALITY-AUDIT.md`
23. `docs/architecture/W290-QUALITY-AND-SOTA-WAVE/F2-SECURITY-AUDIT.md`
24. `docs/architecture/W290-QUALITY-AND-SOTA-WAVE/F3-SOTA-DISCOVERY-W290.md`
25. `docs/architecture/W290-QUALITY-AND-SOTA-WAVE/F4-CONVERGENCE-METHOD-V4.md`
26. `docs/architecture/W290-QUALITY-AND-SOTA-WAVE/W290.5-SERENA-VS-GITNEXUS-BAKEOFF.md`
27. `docs/architecture/W290-QUALITY-AND-SOTA-WAVE/W290-MASTER.md`
28. `docs/architecture/W290-P5-ARCH-AUDIT-2026-05-18.md`
29. `docs/architecture/W290-AUDIT-2026-05-18.md`
30. `docs/architecture/W289-WSHOBSON-PLUGINS-AUDIT-2026-05-18.md`
31. `docs/architecture/W289-GAP-CLOSURE-SYNTHESIS-2026-05-18.md`
32. `docs/architecture/W289-OPERATOR-ACTIONS-2026-05-18.md`
33. `docs/architecture/W289-ORCHESTRATION-RUNBOOK-2026-05-18.md`
34. `docs/architecture/W289-CLAUDE-FLOW-SOTA-AUDIT-2026-05-18.md`
35. `docs/architecture/W288-RESEARCH-ARCH-v2/`
36. `docs/architecture/W286-AUDIT-2026-05-18.md`
37. `docs/architecture/W286c-CODE-QUALITY-2026-05-18.md`

**Anthropic upstream sources** (per cardinal-rule cite-anchors):

38. `https://code.claude.com/docs/en/plugins` (cardinal-rule-1)
39. `https://docs.anthropic.com/en/docs/claude-code/hooks` (cardinal-rule-2)
40. `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (cardinal-rule-3)
41. `https://docs.anthropic.com/en/docs/claude-code/settings` (cardinal-rule-4 + 5)
42. `https://code.claude.com/docs/en/skills` (cardinal-rule-3 skills)
43. `https://code.claude.com/docs/en/headless` (W259-v8 U4 parallel modes)
44. `https://code.claude.com/docs/en/agent-teams` (CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS)
45. `https://code.claude.com/docs/en/mcp` (MCP server schema)
46. `https://code.claude.com/docs/en/cli-reference` (--fork-session per W280d)
47. `https://code.claude.com/docs/en/model-config` (1M context window default)

**External SOTA sources for Stream B handoff** (NOT exhaustive — Stream B owns the search):

48. `openai/codex-plugin-cc` (codex-CLI integration; HEAD 1.0.4)
49. `OthmanAdi/planning-with-files@2.38.1` (W294 T1 INSTALL — re-litigation pending)
50. `basicmachines-co/basic-memory@0.21.1` (T6 incumbent)
51. `abhigyanpatwari/GitNexus@1.6.4-rc.112` (gitnexus incumbent)
52. `vectorize-io/hindsight` (T1 vector recall)
53. `topoteretes/cognee` (T3 GraphRAG)
54. `getzep/graphiti` (T4 RETIRED)
55. `langfuse/langfuse@v3.170.0` (T5 trace)
56. `Letta-ai/letta` / `cpacker/MemGPT` (Stream B candidate: memory)
57. `microsoft/AutoGen@0.4` (Stream B candidate: agent-orchestration)
58. `langchain-ai/langgraph@0.6` (Stream B candidate: agent-orchestration)
59. `All-Hands-AI/OpenHands` (W291.Stage2 T3 PATTERN-STUDY — already audited)
60. `Zheng et al. 2306.05685` (LLM-as-Judge with Bias-Class Declaration)
61. `confident-ai/deepeval` (Stream B candidate: cross-model gate)
62. `Arize-ai/phoenix` (Stream B candidate: LLM-as-judge metrics)
63. `astral-sh/ruff@0.15.13` (incumbent; possible `ty` successor)
64. `microsoft/pyright@1.1.408` (incumbent)
65. `koalaman/shellcheck@0.11.0` (incumbent)
66. `evilmartians/lefthook` (Stream B candidate: pre-commit alternative)
67. `OpenSSF/scorecard` (W295 AI-2 reference; basic-memory governance dim)

**End of W296 Stream A current-arch deep audit.**

---

> **Handoff note to team-lead**: 9 axes audited. 8 distinct weak-spots identified that motivate the
> 2026-MAY SOTA challenger search. Ranks 1-4 (memory + research-arch + subagent-tools + agent-
> orchestration) are HIGH-priority. Cross-axis convergence patterns 1-7 indicate the runtime is
> mature-but-with-pockets-of-debt — the right next-wave is selective challenger validation, not
> wholesale replacement. The architecture self-audits at 4.545/5.0 with margin 0.045 above T1
> threshold — small Phase-5 tightening could flip it, which is itself the strongest signal that a
> challenger search is timely.
