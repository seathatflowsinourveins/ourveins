# W321 Stream 4 — CCBP + ECC SOTA Parity Audit

**Date**: 2026-05-19
**Method**: deepwiki + GitHub API via gh CLI + ctx_fetch_and_index for CCBP raw markdown + ctx_batch_execute for local-state probes.
**Local state at audit time**: ECC cache `2.0.0-rc.1` (2026-04-28); CCBP local-clone ABSENT (`Z:/repos/deps/claude-code-best-practice-shan/` does not exist).

---

## §1 CCBP best-practices gap (advisories not yet applied)

| # | CCBP source | Advisory | Framing | Runtime status |
|---|---|---|---|---|
| 1 | `claude-settings.md:446-461` | `sandbox.*` block (`enabled`, `failIfUnavailable`, `allowUnsandboxedCommands`, `excludedCommands`) | RECOMMENDED (SHOULD) | **DRIFT** — `settings.json:393-399` has `sandbox.enabled:false`; runtime is operating with bypassPermissions + skipDangerousModePermissionPrompt = loosest permissions CC supports. W314 Stream E already flagged. Re-confirm DRIFT-INTENTIONAL for single-operator local install, OR enable sandbox per CCBP example. |
| 2 | `claude-memory.md` §1-§2 | CLAUDE.md upward-walk loading + lazy-load for descendant CLAUDE.md | DESCRIPTIVE | ✓ COMPLIANT — runtime CLAUDE.md is pointer-only ≤50 LOC body (matches CCBP "single most impactful" guidance). |
| 3 | `claude-skills.md` 15-field frontmatter spec | description, when_to_use, disable-model-invocation, user-invocable, allowed-tools, model, effort, context:fork, agent, hooks, paths, shell | SHOULD-fully-populate | **PARTIAL** — local `.claude/skills/<name>/SKILL.md` × 31 use ≤4 fields (description/name only). Operator-curated skills miss `model`/`effort`/`context:fork` precedence per CCBP §skills.md. Low impact (skills still fire). |
| 4 | `claude-subagents.md:32-34` | Subagent frontmatter `skills:` preload field | RECOMMENDED | NOT-APPLICABLE — runtime uses installed-plugin subagents (cardinal-rule-3); no operator-curated subagents to populate. |
| 5 | `claude-settings.md` `disableBypassPermissionsMode` | Set when not in trusted single-operator context | SHOULD | DRIFT-INTENTIONAL — runtime is trusted single-operator local install. |
| 6 | CCBP HEAD `48798ca` (2026-05-18) | (no new advisories; chore: README badge bump) | — | CLAUDE.md L3 cites `48f2ceb` — **STALE by 1 commit (badge-only)**; content-stable. **No re-cite required this wave** per W314 §C cross-SHA invariance check. |
| 7 | `claude-settings.md` `outputStyle` | recommend explicit per-runtime profile | RECOMMENDED | ✓ COMPLIANT — runtime sets `outputStyle:"Proactive"`. |
| 8 | `claude-hooks.md` | NOT IN REPO at expected path (404 on raw) | N/A | Document moved/renamed; deepwiki indexes `.claude/hooks/HOOKS-README.md` instead — runtime hook discipline (cardinal-rule-2 ≤2KB shim) consistent with HOOKS-README §events. |

**Net CCBP gap finding: 1 RE-CONFIRMED DRIFT (sandbox.* — known intentional), 1 PARTIAL (skill frontmatter completeness — low impact), 1 STALE-CITE 1-commit badge-only (no re-cite required).**

---

## §2 CCBP SHA drift

- CLAUDE.md L3 cite: `48f2ceb` (per W315-Stream-B 2026-05-19 refresh)
- GitHub HEAD at audit time: `48798ca` (2026-05-18T18:05:46Z, "chore(readme): bump badge timestamp to May 18, 2026 11:05 PM PKT")
- **Drift**: +1 commit, badge-only.
- **Owner**: `shanraisshan/claude-code-best-practice` per W315-r2 owner-rename (former `shanyu0`). Cite-anchor is current.
- **Recommendation**: NO CLAUDE.md edit needed this wave — content-stable per W314 §C cross-SHA invariance. Next stale-cite re-check W325 (rolling).

---

## §3 ECC features NOT activated (operator-meaningful)

ECC cached install has **232 skills + 60 agents + 75 commands + 20 rules + 28 hooks** at `2.0.0-rc.1`. Currently 8 of 28 hooks disabled via `ECC_DISABLED_HOOKS` env. Major features NOT presently leveraged by this runtime:

| Feature | Type | What it does | Operator should enable when… | Status this runtime |
|---|---|---|---|---|
| `homunculus` skill | skill | sophisticated continuous-learning via atomic "instincts" + hook-driven observation | seeking granular reliable evolvable learning beyond basic `continuous-learning` | **NOT auto-firing** (skill description-match TBD verified) |
| `harness-audit` command | command | deterministic integration-health audit (tool coverage + quality gates + security guardrails) | assessing harness reliability, eval-readiness, risk posture | **NEVER INVOKED** — would surface gaps W319 missed |
| `loop-operator` agent | agent | safely executes + monitors autonomous agent loops, intervenes when needed | running recurring `/loop` runs or ralph-loop | **NOT yet routed** — ralph-loop plugin uses its own scaffold; this agent gives intervention layer |
| `quality-gate` hook (PostToolUse) | hook | runs fast quality checks immediately after Edit/Write | enforcing code quality at edit-time | ✓ ENABLED (in 28 hooks, not in disabled list) |
| `cost-tracker` Stop hook | hook | emits lightweight run-cost telemetry markers at session-end | tracking AI agent operational cost | ✗ DISABLED — RECOMMEND-ENABLE (we have Langfuse OTel pipe + W320 P1 local-cost wrapper; cost-tracker complements both) |
| `governance-capture` hook | hook | captures secrets/policy-violations/approval-requests | governance posture monitoring | ✗ DISABLED via `ECC_GOVERNANCE_CAPTURE=0` — RECOMMEND `=1` for security-conscious workflow |
| `evaluate-session` Stop hook | hook | scans session for extractable patterns into reusable form | building skill library from observed sessions | ✗ DISABLED — RECOMMEND-ENABLE for SOTA harness self-improvement |
| `session-activity-tracker` | hook | per-session tool-call + file-activity metrics (ECC2) | analyzing session-level agent activity | ✗ DISABLED — RECOMMEND-ENABLE for observability completeness |
| `/harness-audit` /`/loop-start` /`/loop-status` /`/quality-gate` /`/model-route` (v1.8.0 cmd set) | commands | harness-first ops surface | autonomous-loop operations | **NEVER INVOKED** in transcript history — high-value surface unused |
| `agent-harness-construction`, `agentic-engineering`, `nanoclaw-repl`, `continuous-agent-loop` skills | skills | autonomous-loop + harness construction skill set (v1.8.0) | building autonomous workflows | **NOT auto-firing** in recent waves — verify trigger description match |

---

## §4 ECC disabled hooks evaluation

| Hook ID | Currently | Operator-value | Recommendation |
|---|---|---|---|
| `pre:edit-write:gateguard-fact-force` | DISABLED | HIGH for unfamiliar code; FRICTION for autonomous loops | **KEEP DISABLED** for `/loop` workflow; ENABLE for high-stakes refactor wave |
| `post:edit:design-quality-check` | DISABLED | frontend-quality reminder; runtime is not frontend-heavy | **KEEP DISABLED** |
| `pre:observe:continuous-learning` | DISABLED | superseded by `homunculus` skill per ECC docs | **KEEP DISABLED** if enabling homunculus instead |
| `post:observe:continuous-learning` | DISABLED | same as above | **KEEP DISABLED** if homunculus on |
| `post:session-activity-tracker` | DISABLED | ECC2 session metrics, ~30 ms PostToolUse | **ENABLE** — observability win, low overhead |
| `stop:evaluate-session` | DISABLED | pattern extraction from session into reusable skills | **ENABLE** — SOTA self-improvement loop |
| `stop:cost-tracker` | DISABLED | run-cost telemetry markers | **ENABLE** — complements W320 P1 OTel local-cost-tracking wrapper |
| `stop:desktop-notify` | DISABLED | macOS/WSL desktop toast; runtime is unattended Win11 | **KEEP DISABLED** |

**Net W321 recommendation**: drop **3** hook IDs from `ECC_DISABLED_HOOKS` (`post:session-activity-tracker`, `stop:evaluate-session`, `stop:cost-tracker`). Keep **5** (gateguard-fact-force, design-quality-check, pre+post observe:continuous-learning, desktop-notify). Add `ECC_GOVERNANCE_CAPTURE=1` to settings.json env.

---

## §5 ECC plugin-cache drift — recommended-update impact

| Field | Value |
|---|---|
| Cache version | `2.0.0-rc.1` (CHANGELOG dated 2026-04-28) |
| GitHub HEAD | `d6022d6b8dc5ef1393cf18ae40ee58f646f3754e` (2026-05-19T15:10:51Z, "docs: refresh may 19 evidence after linear sync merge") |
| Calendar drift | **~21 days** |
| W319-S6 carry-over | Operator-AI `33ed494a → f3cd00625222` is DOUBLY-STALE — actual HEAD is now `d6022d6`. Both `33ed494a` and `f3cd00625222` are eclipsed. |
| Marketplace vs cache | only `.git` differs (content identical) → both stale equally |
| Recent landed (per CHANGELOG since 2.0.0-rc.1) | observer memory-throttling (#536), observer sandbox-access for Haiku (#661), worktree project-ID mismatch (#665), 5-layer loop-prevention (#399), Windows .cmd hook portability, biome hook optimization (#359), InsAIts security opt-in (#370), Windows spawnSync export fix (#431), secret scrubbing in hooks (#348). v1.8.0 added harness-audit, loop-start, loop-status, quality-gate, model-route commands. |
| **Highest-value lands NOT in our cache** | (1) Windows .cmd hook portability — same MSYS-class fix family as W317; (2) secret-scrubbing in hooks (#348) — complements our gitleaks; (3) observer memory-throttling (#536) — if we re-enable continuous-learning |
| **CR-2 risk if we update** | LOW — we patched ECC `plugin-hook-bootstrap.js` per W317 with backup at `.pre-w317-msys-norm`. A `/plugin update` will **clobber** our W317 patch unless the upstream PR landed first (PR-drafted but not submitted per W317 Stream E). Re-apply W317 patch post-update if it gets clobbered. |
| **Action** | `/plugin update everything-claude-code@everything-claude-code` THEN re-verify W317 bootstrap patch + re-run `tools/test-msys-norm.mjs` (must hold 42/42). Estimated time: <5 min including re-patch. |

---

## Report-back (3 sentences)

**1 RE-CONFIRMED CCBP drift (sandbox.* — operator-intentional for single-operator local install) + 1 PARTIAL (skill 15-field frontmatter; low impact)**; CLAUDE.md L3 cite `48f2ceb` is +1 commit behind HEAD `48798ca` but the delta is a README badge bump (content-stable; no re-cite required).

**ECC plugin-cache is 21 calendar days behind GitHub HEAD** (`2.0.0-rc.1` 2026-04-28 vs `d6022d6` 2026-05-19); the W319-S6 operator-AI target `33ed494a → f3cd00625222` is now DOUBLY-STALE — actual HEAD `d6022d6` should be the new update target, AND the W317 `plugin-hook-bootstrap.js` MSYS-fix patch must be re-applied post-`/plugin update` (it sits on the un-merged upstream PR path).

**Most-important ECC feature to enable**: `stop:evaluate-session` hook (currently disabled) — it scans each session for extractable patterns into reusable skills, which is the SOTA self-improvement loop this runtime explicitly seeks; pair it with re-enabling `stop:cost-tracker` (complements W320 P1 local-cost OTel wrapper) and `post:session-activity-tracker` (ECC2 metrics) by removing those 3 IDs from `ECC_DISABLED_HOOKS` and adding `ECC_GOVERNANCE_CAPTURE=1`.
