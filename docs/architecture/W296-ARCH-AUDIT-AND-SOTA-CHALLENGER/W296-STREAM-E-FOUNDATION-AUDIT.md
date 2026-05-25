# W296 Stream E — Foundation Audit: Skills + Agent Teams + Cardinal-Rule Depth

> **Wave**: W296 · **Stream**: E (operator-added mid-wave 2026-05-18) · **Author**: stream-E agent
> **Branch**: `sota-converge-w295` @ HEAD `567de57` · **Worktree**: `Z:\claude-sota-installed`
> **Mandate**: brutally honest no-bias audit of the runtime FOUNDATION layer across 4 pillars: skills,
>   agent-teams orchestration, cardinal-rule invariant DEPTH (not just count), and 2026-MAY SOTA convergence
>   asks at the foundation layer. Source-of-truth = external SOTA convergence, NOT runtime self-justification.
> **Anti-bias guardrails honored**: ≥3 organisationally-distinct sources per finding; cite-anchor every claim
>   to `file:line` or commit-SHA or URL+date; stars NOT a hardgate; 2026-MAY freshness mandate enforced.
> **File-isolation contract**: WRITE-ONLY this file; READ-ONLY everywhere else (Streams A/B/C/D own theirs).

---

## §0 — TL;DR — one-paragraph honest verdict + 3 highest-priority foundation gaps

The runtime foundation is **largely cardinal-rule-clean** with **3 concrete defects** that justify a focused
follow-up: (1) `.claude/skills/learned/` is an EMPTY directory shipped to disk — a phantom skill that produces
zero behavior and zero discoverability evidence (cardinal-rule-3 PARTIAL violation by omission); (2)
`.claude/hooks/context-mode-cache-heal.mjs` is a **28-line upstream-deployed shim** wired from
`settings.json:98` SessionStart — **PARTIAL FALSE-POSITIVE per team-lead verification 2026-05-18**: the file
is auto-deployed by the upstream `context-mode@context-mode` plugin (verified at
`.claude/plugins/cache/context-mode/context-mode/1.0.136/hooks/cache-heal-utils.mjs` + `start.mjs`) as a
workaround for `anthropics/claude-code#46915` ("auto-update breaks CLAUDE_PLUGIN_ROOT"). NOT operator
self-invent — but **LOW provenance-clarity gap** remains because the file lives in `.claude/hooks/`
(non-standard location) rather than under the plugin-cache path, by the plugin's own deployment design.
<!-- team-lead verification 2026-05-18: downgraded from HIGH cardinal-rule-2 violation to LOW provenance-clarity gap. Upstream-provenanced shim at non-standard location. The other 10 HIGH codex-r1 findings stand. -->
(3) the 18 local skills are an **uneven mix**: 10 of 18 are
cite-anchored TIER-1-DIRECT operator-curated skills with explicit "Use when" trigger discipline, but **3 of
them** (`vercel-composition-patterns`, `vercel-react-best-practices`, `web-design-guidelines`) are
**pointer-skills** that load body content only via `Z:/repos/deps/...` paths — fine for cite-budget but
catastrophic on a fresh clone since `Z:/repos/deps/` is unversioned, gitignored, and not in the install
manifest. <!-- codex-r1 fix #3: removed `langfuse` from pointer-hazard list per `.claude/skills/langfuse/SKILL.md:3-14` — body uses npx/bunx CLI + WebFetch, not `Z:/repos/deps/` path. langfuse remains a TIER-2-MIRROR with upstream-provenance question still open, but is NOT a fresh-clone hazard. --> The orchestration foundation (agent-teams plugin + TeamCreate native primitive + `superpowers:
dispatching-parallel-agents` + `wshobson` team-lead/-reviewer/-implementer/-debugger agents) is **SOTA-class
for 2026-MAY** — wshobson-trio + agent-teams plugin at v1.0.2 covers the 6 canonical preset shapes
(review·debug·feature·fullstack·research·security·migration) and the 7th `migration` preset is genuinely
novel; `microsoft/agent-framework@10.5k` and `openai/openai-agents-python@26.4k` cover overlapping but
**non-substitutable** ground (they target Python-SDK agent authoring, not in-runtime parallel fan-out).
**Cardinal-rule DEPTH check** finds **2 candidate extensions** initially scoped for new Rules 6/7 — but per
codex-r1 over-reach feedback, BOTH are reclassified as **discipline-tightening / remediation-gate items, NOT
cardinal-rule promotions**: (a) MCP pin discipline (the W286-arc-P0C `npx -y <pkg>@<pinned-ver>` contract is
**already embedded in Rule 2** at CLAUDE.md:19 in-line — proposed action is tighten/validate Rule 2's existing
MCP pin clause, NOT promote a duplicate Rule 6); (b) state-outside-repo (the W286-cross-fix series migrated
some cognee state to `Z:/...-state/` but **Cognee data-dir still violates the invariant** per §4.6 below —
proposed action is track as remediation gate until the deferred migration script runs + is independently
verified, NOT promote prematurely). <!-- codex-r1 fix #1+#2: removed Rule 6/7 promotion language per codex over-reach feedback; reclassified as Rule-2 tightening + state-outside-repo remediation gate. --> The 3 highest-priority foundation gaps are:

**1. Hook-discipline boundary cases (TWO findings — both NON-violation per re-verification).**
<!-- team-lead verification 2026-05-18: downgraded action #1 from "remove or upstream-justify" Hook #1 to a LOW provenance-clarity gap + Hook #3 inline-dispatcher Rule-2 boundary case. -->
- **Hook #1** (`.claude/hooks/context-mode-cache-heal.mjs`): NOT a self-invent — auto-deployed by the upstream
  `context-mode@context-mode` plugin per its `cache-heal-utils.mjs` + `start.mjs` workaround for
  `anthropics/claude-code#46915`. **LOW** severity provenance-clarity gap only: file lives in `.claude/hooks/`
  by the plugin's own deployment design, NOT under the plugin-cache path. Optional action: add a top-of-CLAUDE.md
  Rule-2-exception note citing the upstream issue + the plugin-deployment provenance + a removal-date contract
  ("delete when CC bug #46915 upstream fix ships"). No file relocation required.
- **Hook #3** (`.claude/settings.json:119-121` inline `bash -c "f=$(jq -r ...) ; case ..."`): still a Rule-2
  boundary case — inline shell program parses hook-event JSON via `jq` and dispatches per-extension to
  ruff/shellcheck. See §4.2.1B for 3 remediation options (recommended (C): split into 2 per-extension hooks
  to eliminate the inline shell program).

**2. Skill-pointer SOTA-anti-pattern + empty `learned/`.** **3 skills** (`vercel-composition-patterns`,
`vercel-react-best-practices`, `web-design-guidelines`) point at `Z:/repos/deps/vercel-labs-agent-skills/`
which is a sibling clone, not an install primitive — this creates a fresh-clone-breaks-skill hazard. Either
inline the skill bodies (cardinal-rule-3 compliant, ~150-LOC per skill) OR migrate to a pinned upstream
marketplace (`vercel-labs/agent-skills` is publicly published per its skills/ tree but no Anthropic-listed
marketplace yet). The empty `.claude/skills/learned/` is either a deletion candidate or needs a SKILL.md
authored. Both fixes are sub-hour. <!-- codex-r1 fix #3: corrected "4 skills" → "3 skills" (langfuse uses npx CLI + WebFetch, not `Z:/repos/deps/` path; per `.claude/skills/langfuse/SKILL.md:3-14`). -->

**3. Tighten Rule-2 MCP-pin clause + track state-outside-repo as remediation gate.** Both invariants are
empirically enforced today and **MCP-pin is already a sub-clause of Rule 2** (CLAUDE.md:19 in-line); state-
outside-repo lives in prose in CLAUDE.md§Status but is **currently violated by Cognee's `C:/Users/42/.cognee`
data-dir** per §4.6. <!-- codex-r1 fix #1+#2: per codex over-reach feedback, the previous "promote to Rule 6/7" recommendation duplicated existing Rule 2 (MCP pin) and prematurely ratified a still-violated invariant (state-outside-repo). Re-scoped to tightening + remediation tracking. --> Recommended actions: (a) tighten Rule 2's
existing MCP-pin clause language (no new rule); (b) track state-outside-repo as a remediation gate until
`tools/migrate-cognee-state.ps1 -Execute` runs + is independently verified, then revisit promotion in a
future wave.

---

## §1 — Method + cite-trail

**4-pillar audit, executed in order**:

1. **Inventory** — `ls`/`find` sweeps of the 4 surfaces (`.claude/skills/`, `.claude/agents/`,
   `.claude/hooks/`, `.claude/plugins/cache/<marketplace>/<plugin>/<ver>/`).
2. **Per-skill SKILL.md read** for all 18 local skills + 8 highest-weight plugin skills (superpowers,
   agent-teams, codex, comprehensive-review, debugging-toolkit, addy-agent-skills, andrej-karpathy-skills,
   wshobson-trio).
3. **Cite-anchor every claim** to `file:line` or commit-SHA where possible. No fabrication.
4. **External SOTA cross-reference** — for each foundation pillar, name ≥3 organisationally-distinct 2026-MAY
   sources (Anthropic docs · openai/anthropics/microsoft SDKs · awesome-list catalogs · community plugin
   marketplaces).

**Cite-trail sources read or grepped during this audit**:

| Source | Path | Used for |
|---|---|---|
| Runtime memory | `CLAUDE.md:17-26` | Cardinal-rule statements + cite-anchor for Pillar 3 |
| Settings | `.claude/settings.json:92-156` | All hook commands (cardinal-rule-2 audit) |
| Settings | `.claude/settings.json:164-233` | enabledPlugins map (70 plugin keys) |
| Settings | `.claude/settings.json:64-83` | `deny[]` list (Pillar 3 Rule 5 audit) |
| Local skills | `ls .claude/skills/` (18 entries) | Pillar 1 §2.1 inventory |
| Local agents | `ls .claude/agents/` (4 entries) | Pillar 2 §3.2 cite-class audit |
| Local hooks dir | `ls .claude/hooks/` | Cardinal-rule-2 surface check |
| Skill bodies | `.claude/skills/*/SKILL.md` (16 files; gitnexus + learned special) | Trigger correctness + LOC |
| Agent bodies | `.claude/agents/*.md` (4 files) | Cite-class + provenance comments |
| Superpowers plugin | `.claude/plugins/cache/superpowers-marketplace/superpowers/5.1.0/` | Plugin-skill survey, Pillar 1 §2.2 |
| Agent-teams plugin | `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/` | Pillar 2 §3.1 commands + agents |
| Agent-orch plugin | `.claude/plugins/cache/claude-code-workflows/agent-orchestration/1.2.1/` | Pillar 2 §3.1 commands |
| Codex plugin | `.claude/plugins/cache/openai-codex/codex/1.0.4/` | Pillar 2 §3.4 cross-model primitive |
| Codex hooks | `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` | Cardinal-rule-2 cross-check |
| Karpathy plugin | `.claude/plugins/cache/karpathy-skills/andrej-karpathy-skills/1.0.0/` | Pillar 1 §2.2 |
| ECC plugin hooks | `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/hooks/hooks.json` | Cardinal-rule-2 cross-check |
| ECC plugin tree | `ls .../everything-claude-code/2.0.0-rc.1/` | Cite-class verification |
| MCP wiring | `.mcp.json` (15 server entries) | Cardinal-rule-6 (proposed) MCP-pin audit |
| W295 audit | `docs/architecture/W295-AUDIT-2026-05-18.md` | Carry-forward context |
| W296 Stream A | `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-A-CURRENT-ARCH-AUDIT.md` | Stream-A's claim parity check |
| Wshobson agents | `.claude/agents/wshobson-*.md` | Cite-trail for Pillar 2 §3.2 |
| Anthropic skills docs | `https://code.claude.com/docs/en/skills` (cited in CLAUDE.md) | Cardinal-rule-3 anchor |
| Anthropic sub-agents | `https://docs.anthropic.com/en/docs/claude-code/sub-agents` | Cardinal-rule-3 anchor |
| Anthropic plugins | `https://code.claude.com/docs/en/plugins` | Cardinal-rule-1 anchor |
| Anthropic hooks | `https://docs.anthropic.com/en/docs/claude-code/hooks` | Cardinal-rule-2 anchor |

**External SOTA reference repos (2026-MAY)** — used for orgs-distinct cross-reference per anti-bias mandate:

| Org | Repo | Stars (2026-MAY) | Used for which finding |
|---|---|---|---|
| anthropics | `claude-plugins-official` | n/a (Anthropic-official) | Pillar 1 §2.2 + 2.3 |
| anthropics | `claude-agent-sdk-python` (per CLAUDE.md§Architecture cite) | ~6.9k | Pillar 2 §3.3 SDK challenger |
| anthropics | `skills` (incl. example-skills) | n/a | Pillar 1 §2.2 baseline |
| openai | `openai-agents-python` | ~26.4k | Pillar 2 §3.3 SDK challenger |
| microsoft | `agent-framework` | ~10.5k | Pillar 2 §3.3 SDK challenger |
| obra | `superpowers` | (large) | Pillar 1 §2.2 + Pillar 2 §3.4 |
| wshobson | `agents` (= claude-code-workflows marketplace) | (large) | Pillar 1 §2.2 + Pillar 2 §3.1+3.2 |
| vercel-labs | `agent-skills` | n/a | Pillar 1 §2.1 cite-defect anchor |
| addyosmani | `agent-skills` | n/a | Pillar 1 §2.2 alt-source |
| forrestchang | `andrej-karpathy-skills` | n/a | Pillar 1 §2.2 |
| mksglu | `context-mode` | n/a | Cardinal-rule-2 §4.2 cross-check |
| affaan-m | `everything-claude-code` | n/a | Cardinal-rule-2 §4.2 cross-check |
| OthmanAdi | `planning-with-files` | ~21.5k | Pillar 1 §2.2 latest install (W294) |

**Liveness probes (none required for this audit)** — Stream E is a static-state audit. No port probes;
Stream A already did the daemon-liveness sweep per its §1 cite-trail.

---

## §2 — Pillar 1 — Skills (18 local + N plugin-loaded)

### §2.1 Local skill inventory

`ls .claude/skills/` returns 18 top-level entries (verified via Bash). Per-skill audit:

| # | Name | LOC (SKILL.md) | Description-trigger discipline | Cite-class | Verdict |
|---|---|---|---|---|---|
| 1 | `gitnexus` (folder) | n/a — 7 nested skills | each child has its own (verified `gitnexus/gitnexus-guide/SKILL.md:1-4`) | TIER-1-DIRECT (`Z:/repos/deps/gitnexus/gitnexus-claude-plugin/skills/gitnexus-guide/SKILL.md @ HEAD 98addbd6`) per body cite | KEEP — exemplar |
| 2 | `goal-prompt-synthesis` | 319 | "Use when ... 'paste-ready /goal'..." (`SKILL.md:3`) + explicit "Do NOT use" carveouts (`:3`) | TIER-3-LOCAL-COMPOSITION (operator-authored) | KEEP — exemplar |
| 3 | `langfuse` | 140 | "Interact with Langfuse and access its documentation..." (`SKILL.md:3`) | TIER-2-MIRROR (3rd-party SDK skill, no source-pinned upstream) — body uses npx/bunx CLI + WebFetch, **NOT a `Z:/repos/deps` pointer** (`SKILL.md:3-14`) <!-- codex-r1 fix #3: removed pointer-skill classification --> | KEEP — but verify against any upstream `langfuse/skills` repo |
| 4 | `learned` (folder) | **0** (empty) | n/a — no SKILL.md exists | **N/A — phantom skill** | **DEPRECATE or POPULATE** (FAIL — empty dir on disk produces zero behavior) |
| 5 | `mem-recall` | 101 | "Use when the current task mentions remembering, recalling, prior work..." (`SKILL.md:3`) + "Do NOT invoke for autonomous `/loop`..." (`:3`) | TIER-3-LOCAL-COMPOSITION | KEEP — exemplar |
| 6 | `sota-convergence-audit` | 360 | "Use when deciding whether to adopt..." (`SKILL.md:3`) + "Do NOT use for creating or improving..." (`:3`) | TIER-3-LOCAL-COMPOSITION | KEEP — flagship (Wave-N evolved through W288→v3, W293→v3.1, W295→v5 pending) |
| 7 | `speckit-analyze` | 261 | "Use when the operator runs /speckit-analyze..." (`SKILL.md:3`) | TIER-1-DIRECT (`source: Z:/repos/deps/spec-kit/templates/commands/analyze.md @ HEAD 688ca1b3...`) | KEEP — clean port |
| 8 | `speckit-checklist` | 373 | "Use when the operator runs /speckit-checklist..." (`SKILL.md:3`) | TIER-1-DIRECT (spec-kit `:688ca1b3`) | KEEP |
| 9 | `speckit-clarify` | 255 | "Use when the operator runs /speckit-clarify..." | TIER-1-DIRECT (spec-kit `:688ca1b3`) | KEEP |
| 10 | `speckit-constitution` | 158 | "Use when the operator runs /speckit-constitution..." | TIER-1-DIRECT (spec-kit `:688ca1b3`) | KEEP |
| 11 | `speckit-implement` | 211 | "Use when the operator runs /speckit-implement..." (`SKILL.md:3`) | TIER-1-DIRECT (`source: Z:/repos/deps/spec-kit/templates/commands/implement.md @ HEAD 688ca1b3`) | KEEP |
| 12 | `speckit-plan` | 153 | "Use when the operator runs /speckit-plan..." | TIER-1-DIRECT (spec-kit `:688ca1b3`) | KEEP |
| 13 | `speckit-specify` | 331 | "Use when the operator runs /speckit-specify..." (`SKILL.md:3`) | TIER-1-DIRECT (spec-kit `:688ca1b3`) | KEEP |
| 14 | `speckit-tasks` | 203 | "Use when the operator runs /speckit-tasks..." | TIER-1-DIRECT (spec-kit `:688ca1b3`) | KEEP |
| 15 | `speckit-taskstoissues` | 107 | "Use when the operator runs /speckit-taskstoissues..." | TIER-1-DIRECT (spec-kit `:688ca1b3`) | KEEP |
| 16 | `vercel-composition-patterns` | 24 | "Use when working on React composition patterns from vercel-labs/agent-skills..." (`SKILL.md:3`) | TIER-1-DIRECT-POINTER (`source: Z:/repos/deps/vercel-labs-agent-skills/skills/composition-patterns/SKILL.md @ HEAD b9c8ee06...`) but **body is in `Z:/repos/deps/...` — NOT in this runtime** | **SOTA-REFRESH** (see §2.1.1) |
| 17 | `vercel-react-best-practices` | 28 | "React and Next.js performance optimization guidance from vercel-labs/agent-skills..." | TIER-1-DIRECT-POINTER (same `Z:/repos/deps/...` issue) | **SOTA-REFRESH** |
| 18 | `web-design-guidelines` | 17 | "Vercel web interface review guidance..." (`SKILL.md:3`) | TIER-1-DIRECT-POINTER (same) | **SOTA-REFRESH** |

**Total SKILL.md LOC**: 3,041 across 16 files + 7 nested gitnexus skills + 0 in `learned/`.

#### §2.1.1 — Pointer-skill fresh-clone hazard (the 3 vercel-class skills) <!-- codex-r1 fix #3: was "the 4 vercel-class + langfuse partial" -->

Inspection of `vercel-composition-patterns/SKILL.md:13-14`:

```
Before applying this skill, read:
`Z:/repos/deps/vercel-labs-agent-skills/skills/composition-patterns/SKILL.md`.
```

This is a **TIER-1-DIRECT-POINTER pattern** — clean cardinal-rule-3 compliance (source + source_head SHA
pinned in frontmatter metadata at `:5-8`) but it assumes `Z:/repos/deps/` is present. On a fresh clone:

- `Z:/repos/deps/` is **gitignored** per the runtime's standard convention (sibling repos are not tracked).
- The install bootstrap `tools/bootstrap-runtime.ps1` does NOT clone `vercel-labs/agent-skills`.
- Result: the skill auto-fires from description match, then breaks at body-load.

**Anti-bias cross-reference (≥3 orgs)**:
- Anthropic plugin docs (`code.claude.com/docs/en/plugins`) recommend bundling skill body content in the
  plugin itself, not relying on external paths.
- `obra/superpowers` plugin (`5.1.0/skills/dispatching-parallel-agents/SKILL.md`) inlines its full body —
  no `Z:/repos/...` redirects.
- `wshobson/agents` (`claude-code-workflows/agent-teams/1.0.2/skills/multi-reviewer-patterns/SKILL.md`)
  similarly inlines bodies.

**Verdict**: the **3 pointer-skills** (vercel-composition · vercel-react · web-design) should EITHER inline
their bodies OR be migrated to a pinned upstream marketplace ref. Sub-hour fix. <!-- codex-r1 fix #3: dropped "+ langfuse partial" — langfuse uses npx/bunx CLI and WebFetch, no `Z:/repos/deps` body redirect; only an upstream-provenance question remains for langfuse, tracked separately at §2.1 row #3. -->

**Separate upstream-provenance question for `langfuse`**: the local skill body is operator-curated TIER-2-MIRROR
(uses public `npx langfuse-cli` + WebFetch domain `langfuse.com`) — kept as KEEP-but-verify, but explicitly
NOT a pointer-skill fresh-clone hazard.

### §2.2 Plugin-loaded skill survey (8 highest-weight plugins)

Enumerated by reading `ls <plugin>/skills/` and spot-reading the SKILL.md frontmatter for each:

#### A. `obra/superpowers` v5.1.0 (active provenance: `claude-plugins-official`) <!-- codex-r1 fix #11: was titled `superpowers-marketplace` but `.claude/settings.json:165` enables `superpowers@claude-plugins-official` while `:207` disables `superpowers@superpowers-marketplace`. The disabled marketplace cache was sampled in this audit — both ship the same content (per `settings.json:206` policy note + §5.2 verification table), but active provenance should cite the enabled path. Active SKILL.md citations apply to either cache; if byte-for-byte parity is required, re-resolve against `.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/`. -->

Skills directory contents (14 skills):
```
brainstorming · dispatching-parallel-agents · executing-plans ·
finishing-a-development-branch · receiving-code-review · requesting-code-review ·
subagent-driven-development · systematic-debugging · test-driven-development ·
using-git-worktrees · using-superpowers · verification-before-completion ·
writing-plans · writing-skills
```

Sampled trigger discipline (`verification-before-completion/SKILL.md:3`):
> "Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires
> running verification commands and confirming output before making any success claims; evidence before
> assertions always"

PASS — clear description-match anchor, explicit "Use when" pattern.

Sampled trigger discipline (`dispatching-parallel-agents/SKILL.md:3`):
> "Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies"

PASS — terse but specific (2+ independent + no shared state).

#### B. `wshobson/agents` (`claude-code-workflows` marketplace)

Plugin: `agent-teams@1.0.2` — 7 commands (team-debug, team-delegate, team-feature, team-review,
team-shutdown, team-spawn, team-status) + 4 agents (team-debugger, team-implementer, team-lead,
team-reviewer) + 6 skills (multi-reviewer-patterns, parallel-debugging, parallel-feature-development,
task-coordination-strategies, team-communication-protocols, team-composition-patterns).

Sampled (`team-spawn.md:2`):
> "Spawn an agent team using presets (review, debug, feature, fullstack, research, security, migration) or
> custom composition"

PASS — explicit preset list.

Plugin: `agent-orchestration@1.2.1` — 1 agent (context-manager) + 2 commands (improve-agent,
multi-agent-optimize) + 0 skills. **Minimal plugin** — adds context-manager subagent (worth retaining).

#### C. `openai/codex` v1.0.4 (`openai-codex` marketplace)

Skills (3): `codex-cli-runtime` · `codex-result-handling` · `gpt-5-4-prompting`.

Sampled (`codex-cli-runtime/SKILL.md:3`):
> "Internal helper contract for calling the codex-companion runtime from Claude Code"

Marked `user-invocable: false` (`:4`) — correctly internal-only.

Sampled (`codex-cli-runtime/SKILL.md:24`):
> "Default to a write-capable Codex run by adding `--write` unless the user explicitly asks for read-only
> behavior or only wants review, diagnosis, or research without edits."

PASS — operational discipline cleanly stated.

#### D. `claude-code-workflows` marketplace (18 plugins via wshobson)

Plugins enabled in `settings.json:194-228`:
- `shell-scripting`, `signed-audit-trails`, `comprehensive-review`, `block-no-verify`, `context-management`,
  `agent-orchestration`, `developer-essentials`, `debugging-toolkit`, `incident-response`,
  `llm-application-dev`, `tdd-workflows`, `conductor`, `ship-mate`, `agent-teams`, `plugin-eval`.
- 18 total — ~73 skills across them per `superpowers:dispatching-parallel-agents` "Skills" inventory hint.

Sampled `debugging-toolkit` / `comprehensive-review` are TIER-1-DIRECT installed-from-trusted-source. PASS.

#### E. `andrej-karpathy-skills` v1.0.0 (`karpathy-skills` marketplace, fork from `forrestchang`)

Skills (1): `karpathy-guidelines` (`SKILL.md:3`):
> "Behavioral guidelines to reduce common LLM coding mistakes. Use when writing, reviewing, or refactoring
> code to avoid overcomplication, make surgical changes, surface assumptions, and define verifiable success
> criteria."

PASS — clear trigger. Also ships a `CLAUDE.md` at `1.0.0/CLAUDE.md` (re-rendered in this audit's context-load)
— content is `Z:/repos/deps/karpathy-skills/.../CLAUDE.md` upstream-identical.

#### F. `anthropic-agent-skills` marketplace (Anthropic-affiliated `example-skills` plugin) <!-- codex-r1 fix #10: was titled `(anthropics/skills` marketplace)` with implicit "Anthropic-official" trust tier. Per `.claude/plugins/marketplaces/anthropic-agent-skills/.claude-plugin/marketplace.json:2-9`, the marketplace owner field names "Keith Lazuka" with `klazuka@anthropic.com` email and metadata description "Anthropic example skills" — i.e. an individual Anthropic email identity, NOT a first-party `anthropics/`-org marketplace URL or signed official provenance. The plugin name at `marketplace.json:24-39` is `example-skills` ("a collection of example skills"). Trust-tier wording corrected to "Anthropic-affiliated/example-skills via configured marketplace source". -->

Trust tier: **Anthropic-affiliated/example-skills via configured marketplace source** (owner Keith Lazuka at
@anthropic.com per `marketplace.json:2-9`; plugin name `example-skills` per `:24-39` is explicitly a
collection of examples). NOT promoted to "Anthropic-official" unless a first-party `anthropics/`-org
marketplace URL or signed official provenance is cited.

Versioned: `6a5bb06904ab` + `f458cee31a75` + `unknown`. Per `ls`, three side-by-side install paths suggest
**version-drift hazard** — the marketplace is shipping commit-hash version dirs, not semver. Worth flagging
to Stream A as a wave-hygiene defect (low severity — marketplace-side, not runtime).

#### G. `everything-claude-code` v2.0.0-rc.1 (`affaan-m/everything-claude-code` marketplace)

Massive plugin — `ls` returns 40+ top-level entries including `skills/`, `agents/`, `commands/`, `hooks/`,
`scripts/`. Its **hooks layer is the bulk of the runtime's hook-fire surface** — `settings.json` only wires
6 hooks but `everything-claude-code/hooks/hooks.json` adds many more (pre:bash:dispatcher,
pre:write:doc-file-warning, pre:edit-write:suggest-compact, pre:observe:continuous-learning, etc.).

Cardinal-rule-2 cross-check: ECC's hooks are **plugin-supplied** (`.claude/plugins/cache/.../hooks/hooks.json`)
which IS upstream — but the hook commands invoke `plugin-hook-bootstrap.js` + `pre-bash-dispatcher.js` from
`...marketplaces/everything-claude-code/scripts/hooks/...`. This is **upstream-plugin-supplied script
execution**, not self-invent. PASS cardinal-rule-2.

#### H. Other notable plugins

- `planning-with-files@planning-with-files` (OthmanAdi/planning-with-files, T1 INSTALL per W294) — **installed-cache-present but DISABLED** per `.claude/settings.json:233` (`"planning-with-files@planning-with-files": false`); its 16 cached skills are NOT loaded at session start. <!-- codex-r1 fix #4: was "(T1 INSTALL per W294) — 16 skills" implying enabled/loaded. Actual setting at `.claude/settings.json:233` is false; cache exists at `.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/.claude-plugin/plugin.json:1-10` but plugin is disabled. The W294 T1 INSTALL decision was operator-cleared, but enablement was NOT yet flipped — deferred-operator-action carry-forward. -->
- `hindsight-memory@hindsight` — T1 memory layer (enabled).
- `context-mode@context-mode` — sandbox tools + the broken cache-heal issue (see §4.2; enabled).

### §2.3 SOTA-skill convergence — 2026-MAY gaps

Cross-referencing 2026-MAY external SOTA skill catalogs (≥3 orgs):

#### Gap 1: Eval-driven skill design (NOT covered)

The runtime has skills BUT no `eval-driven-skill-design` pattern — i.e. a skill that proves its trigger
discipline + body content via adversarial evaluation. Per `superpowers/skills/writing-skills/SKILL.md`
references (e.g. `testing-skills-with-subagents.md` present in the plugin's references dir), the upstream
recommended pattern is to test skills with subagents. The runtime has the `plugin-eval@claude-code-workflows`
plugin enabled (per `settings.json:228`) but no operator-curated eval-driven skill-design discipline.

**External SOTA anchors**:
- Anthropic skills doc `code.claude.com/docs/en/skills` (cited per CLAUDE.md:13) — recommends eval-driven.
- `obra/superpowers/5.1.0/skills/writing-skills/testing-skills-with-subagents.md` — concrete recipe.
- `everything-claude-code:skill-comply` skill (already loaded per available-skills list) — visualises whether
  skills auto-fire correctly. **This is already available — operator should be reminded to use it post-W296.**

#### Gap 2: Prompt-engineering recent advances (PARTIAL coverage)

The runtime has `andrej-karpathy-skills:karpathy-guidelines` (4-axis behavioral). 2026-MAY SOTA work
beyond Karpathy:
- `microsoft/PromptWizard` (T2 VENDOR-FORK per W291.Stage2) — +15% GSM8k vs DSPy.
- `Azure/PyRIT` (T3 PATTERN-STUDY per W291.Stage2) — multi-modal red-team / prompt-injection robustness.
- Anthropic's `building-pydantic-ai-agents` (`ai@pydantic-skills` enabled per `settings.json:215`) —
  Pydantic-AI patterns.

The runtime has `ai@pydantic-skills` enabled — PARTIAL coverage. Gap = the W291 `microsoft/PromptWizard`
T2 VENDOR-FORK hasn't shipped yet (per CLAUDE.md§Status W291.Stage2 line — verdict produced, fork-vendoring
deferred). This is **a Stream B/C concern, not Stream E** — flagged for awareness.

#### Gap 3: Source-driven-development variant (NOT covered)

`addy-agent-skills@addy-agent-skills` is in the marketplaces list (`settings.json:289-293` config), enabled:
`false` (`:178`). The plugin includes `source-driven-development` skill (referenced in CLAUDE.md:13 as
"behavioral discipline" target install set). Currently **NOT enabled**.

**Decision**: re-enable `addy-agent-skills` OR vet the `source-driven-development` skill and inline if novel.
This is a low-priority gap — superpowers + agent-teams + karpathy already cover much of the development-loop
discipline.

#### Gap 4 (NEGATIVE finding — runtime is ahead of SOTA here)

Anthropic's `example-skills` plugin ships 17 example skills (algorithmic-art · brand-guidelines · canvas-design ·
claude-api · doc-coauthoring · docx · frontend-design · internal-comms · mcp-builder · pdf · pptx ·
skill-creator · slack-gif-creator · theme-factory · web-artifacts-builder · webapp-testing · xlsx). These are
**examples**, not foundation patterns — the runtime is correct to not auto-enable them all.

### §2.4 Pillar 1 — Verdict roll-up

<!-- codex-r1 fix #14: roll-up reconciled to a single axis = 18 top-level directories under `.claude/skills/`. Previous version mixed axes by counting `gitnexus(7-nested)` AND counting speckit children separately, producing a roll-up that exceeded 18. Per §2.1 inventory at line 131 ("18 top-level entries"), the canonical axis is top-level directories. Recursive `SKILL.md` count (23 files: 16 single + 7 nested under gitnexus + 0 in learned) is noted as a sub-fact only. -->

| Verdict class | Count (axis: top-level dirs, 18 total) | Skills |
|---|---|---|
| KEEP — exemplar | 4 | gitnexus (folder w/ 7 nested SKILL.md), goal-prompt-synthesis, mem-recall, sota-convergence-audit |
| KEEP — clean port | 9 | speckit-analyze · -checklist · -clarify · -constitution · -implement · -plan · -specify · -tasks · -taskstoissues |
| KEEP — operator-curated TIER-2-MIRROR | 1 | langfuse (npx/bunx CLI; upstream-provenance question only) |
| SOTA-REFRESH | 3 | vercel-composition-patterns, vercel-react-best-practices, web-design-guidelines (inline-body fix) |
| DEPRECATE-OR-POPULATE | 1 | **`learned/` (empty)** |
| NEW-NEEDED | 0 | (Gaps 1/3 covered by existing enabled plugins; Gap 2 is Stream B/C) |

Sum: 4+9+1+3+1 = 18 top-level entries. Recursive `SKILL.md` count = 23 (16 + 7 gitnexus-nested + 0 learned).

**Pillar 1 highest-priority action**: fix the **3** pointer-skills + delete/populate `learned/`. **Sub-hour
total**. This converts the local skill set from 17-of-18 SOTA-clean to 18-of-18. <!-- codex-r1 fix #3: "4 pointer-skills" → "3 pointer-skills" (langfuse excluded). -->

---

## §3 — Pillar 2 — Agent teams + orchestration foundation

### §3.1 TeamCreate native vs agent-teams plugin

**Native primitive** (visible in this audit's deferred-tool list at session start): `TeamCreate` —
direct Claude Code SDK primitive. Per Anthropic sub-agents doc (`docs.anthropic.com/en/docs/claude-code/sub-agents`),
this is the canonical multi-agent orchestration primitive at the runtime layer. Backed by env
`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` per `settings.json:16`.

**Plugin** (`claude-code-workflows:agent-teams@1.0.2`):
- 7 commands at `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/commands/`: `team-debug.md`,
  `team-delegate.md`, `team-feature.md`, `team-review.md`, `team-shutdown.md`, `team-spawn.md`, `team-status.md`.
- 4 agent definitions at `.../agents/`: `team-debugger.md`, `team-implementer.md`, `team-lead.md`, `team-reviewer.md`.
- 6 skills at `.../skills/`: `multi-reviewer-patterns`, `parallel-debugging`, `parallel-feature-development`,
  `task-coordination-strategies`, `team-communication-protocols`, `team-composition-patterns`.

**Relationship**: the plugin provides **slash-command recipes + agent role definitions + skill conveniences**
that **instruct Claude to invoke the native `TeamCreate`, `Agent`, and `TaskCreate` tools** — it does NOT
provide programmatic wrapper code around the native primitive. <!-- codex-r1 fix #6: was "the plugin doesn't replace the native primitive — it wraps it"; codex correctly noted this overstates implementation reality. Verified at `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/commands/team-spawn.md:72-84` — the command body is markdown instructions telling Claude to "Use the `TeamCreate` tool", "use the `Agent` tool with…", and "Use `TaskCreate`". The 4 agent definitions under `agents/*.md` are role descriptions / behavioral lifecycles, not executable wrapper code. --> Verified at `team-spawn.md:72-84` (the
markdown command body instructs Claude to call `TeamCreate` + `Agent` + `TaskCreate` and references
`agent-teams:team-lead`, `agent-teams:team-implementer`, etc. as `subagent_type` strings) and
`agents/team-lead.md:77-83` (behavioral lifecycle, not wrapper code).

**Verdict**: native + plugin are complementary, not substitutable. The plugin's value: 7 named presets that
encode common team shapes; the native primitive's value: arbitrary team composition. KEEP both.

### §3.2 Current 7 presets — coverage matrix

Per `team-spawn.md:28-65`:

| Preset | Default members | Default agents | Coverage |
|---|---|---|---|
| `review` | 3 | 3 × `team-reviewer` (security/performance/architecture) | Multi-dimensional code review |
| `debug` | 3 | 3 × `team-debugger` (competing hypotheses) | Bug investigation |
| `feature` | 3 | 1 `team-lead` + 2 `team-implementer` | Parallel feature dev |
| `fullstack` | 4 | 1 frontend + 1 backend + 1 tests + 1 `team-lead` | Full-stack feature |
| `research` | 3 | 3 × `general-purpose` (each w/ different research question) | Parallel research |
| `security` | (per plugin spec) | (per plugin spec) | Security audit (W289 added) |
| `migration` | (per plugin spec) | (per plugin spec) | Code migration |

7 presets. Already cited in CLAUDE.md:14 as "`/team-spawn research|security|review|debug|feature|fullstack|migration`".

**Coverage gaps (anti-bias cross-reference)**:
- No `eval` preset (vs `openai/openai-agents-python` evaluator patterns).
- No `red-team` preset (vs `Azure/PyRIT` 2026-MAY).
- No `docs-author` preset (vs `microsoft/agent-framework` documentation-agent patterns).

The 3 missing presets are **value-add but not blocking** — `general-purpose` covers all 3 with the right
task brief. Verdict: KEEP as-is; consider adding `eval` preset in a future wave.

### §3.3 2026-MAY org-SDK challenger comparison

Per `superpowers:dispatching-parallel-agents`-style cross-reference, the 4 most-cited 2026-MAY agent
orchestration frameworks:

| SDK | Stars | Org | Primitive | Coverage overlap | Substitutable? |
|---|---|---|---|---|---|
| `anthropics/claude-agent-sdk-python` | ~6.9k | Anthropic | Python SDK exposing SDK-native subagents (`AgentDefinition`), `SdkPluginConfig`, agent skills, hooks, permissions, sessions, file-checkpointing (`enable_file_checkpointing`), custom tools — per `https://platform.claude.com/docs/en/agent-sdk/python:75-88` + `:1032-1045` | **Parallel runtime surface** to Claude Code — exposes foundation primitives the runtime uses internally; deserves dedicated audit (see §5.5). Not a TeamCreate replacement but DOES expose plugin/skill/hook/permission/checkpoint contracts. <!-- codex-r1 fix #8: was "Author-time, not runtime-orchestration. Does NOT replace TeamCreate. NO — orthogonal". Codex correctly noted the SDK exposes foundation primitives directly relevant to this audit's plugin/skill/hook/subagent/permission policy. --> | NO direct replacement of TeamCreate, but **YES pattern-parity check needed** for plugin/skill/hook/checkpoint contracts |
| `openai/openai-agents-python` | ~26.4k | OpenAI | Python SDK, Swarm successor, supports handoffs | Multi-agent in-Python, not in-Claude-Code-runtime | NO — Python-process layer, not CC-runtime layer |
| `microsoft/agent-framework` | ~10.5k | Microsoft | AutoGen successor, multi-agent Python+.NET SDK — **2026 releases add**: experimental skills API aligned to `agentskills.io` (`SkillFrontmatter`), A2A v1.0 migration, functional workflow API, OpenTelemetry integration, checkpoint path-traversal hardening (per `https://github.com/microsoft/agent-framework/releases:232-242` + `:810-817` 2026-04-24 release) | **Skills-spec compatibility** + A2A bridge semantics + workflow API + telemetry + checkpoint security — concrete pattern-study targets, not just "documentation-agent patterns" <!-- codex-r1 fix #9: was "Same — Python-side multi-agent. NO — orthogonal". Codex correctly noted 2026 active foundation-layer primitives: skills API + A2A + workflow + telemetry + security hardening. --> | NO direct replacement, but **YES skills-spec + A2A + checkpoint-security pattern-study** |
| `agentscope-ai/agentscope` | ~25.2k | (community) | Multi-agent platform | Same — Python-side | NO — orthogonal |

**Critical finding (REVISED per codex-r1)**: <!-- codex-r1 fix #8+#9: the prior "all 4 orthogonal" verdict obscured 2 substantive foundation gaps — Agent SDK Python exposes foundation primitives directly comparable to this runtime's policy; Microsoft Agent Framework 2026 added a skills API + A2A + workflow + telemetry + checkpoint-security layer. -->
- `anthropics/claude-agent-sdk-python` is NOT a TeamCreate replacement, but it IS a **parallel SDK surface**
  exposing the same plugin/skill/hook/subagent/permission/checkpoint primitives the runtime uses. The runtime
  has NOT audited its policy against the SDK-native `AgentDefinition`, `SdkPluginConfig`,
  `enable_file_checkpointing`, and tool-permission APIs. **Action**: dedicated subsection §5.5 added below.
- `microsoft/agent-framework` 2026 releases ship: experimental skills API (`SkillFrontmatter`) aligned to
  `agentskills.io`, A2A v1.0 migration, functional workflow API, OpenTelemetry integration, checkpoint
  path-traversal hardening — **concrete pattern-study rows**, not generic "documentation-agent patterns".
- `openai/openai-agents-python` + `agentscope-ai/agentscope` remain orthogonal Python-process-layer.

**Pattern-extractability**:
- **Anthropic Agent SDK** — pattern-parity audit of plugin/skill/hook/checkpoint contracts (NEW §5.5).
- **Microsoft Agent Framework 2026** — skills-spec compat row + A2A bridge semantics + workflow API row +
  telemetry row + checkpoint security row (5 concrete pattern-study rows).
- Swarm-style handoffs (openai-agents-python) — could enrich the agent-teams plugin's `team-delegate.md`.
- Group-chat termination (microsoft/agent-framework AutoGen 0.4 lineage) — termination-condition patterns
  underspecified in `team-shutdown.md`.
- Tool-use lifecycle (agentscope) — observability patterns.

**Verdict**: **2 of 4 SDKs (Anthropic SDK + Microsoft Agent Framework 2026) require dedicated pattern-study
follow-up** — these are NOT TeamCreate replacements but they DO expose foundation primitives the runtime has
not yet audited. The other 2 (openai-agents-python, agentscope) remain orthogonal pattern-study candidates.

### §3.4 Parallel-fan-out primitive (Agent tool + dispatching-parallel-agents)

The `Agent` tool (deferred from the top tool list) IS the canonical parallel-fan-out primitive per Anthropic
sub-agents doc. `superpowers:dispatching-parallel-agents/SKILL.md:3` triggers on "2+ independent tasks
that can be worked on without shared state or sequential dependencies" — clean.

**2026-MAY SOTA-status check**:
- Anthropic docs (`docs.anthropic.com/en/docs/claude-code/sub-agents`) — `Agent` is still the SOTA primitive
  for invoking subagents.
- Anthropic's `dispatching-parallel-agents` skill is also available as a `superpowers` plugin skill (verified
  in the available-skills list at session start) — **same content as the obra/superpowers ship**.
- No newer Anthropic-published primitive has emerged that supersedes `Agent` per the 2026-MAY freshness check.

**Cross-reference**: this audit's parent context (Stream-E spawned via TaskCreate #462 within team
`w296-arch-audit-sota-challenger`) IS itself an instance of the SOTA pattern — TeamCreate + Agent fan-out
+ file-ownership boundaries + cite-anchored mandates. The runtime is dogfooding the foundation.

**Verdict**: Agent tool + dispatching-parallel-agents skill = **SOTA-clean at 2026-MAY**. No challenger.

### §3.5 Pillar 2 — Verdict roll-up

| Component | Verdict | Action |
|---|---|---|
| TeamCreate native primitive | KEEP — SOTA | none |
| agent-teams plugin v1.0.2 | KEEP — SOTA | none |
| 7 presets (review/debug/feature/fullstack/research/security/migration) | KEEP | consider `eval` preset future wave |
| 4 wshobson `team-*.md` agent definitions | KEEP — TIER-1-DIRECT cite-clean | none |
| Agent tool + dispatching-parallel-agents | KEEP — SOTA | none |
| codex Stop-hook + codex:codex-rescue | KEEP — SOTA-class cross-model gate | none |
| 4 SDKs (anthropic/openai/microsoft/agentscope) | NOT substitutable | pattern-extract for future agent-teams enrich |

**Pillar 2 highest-priority action**: NONE at foundation layer. Orchestration is SOTA.

---

## §4 — Pillar 3 — Cardinal-rule invariant DEPTH

### §4.1 Rule 1 (plugin trust) depth check

**Rule (CLAUDE.md:17)**: "Install primitives only from trusted plugins/skills/agents — plugin structure +
install flow per `https://code.claude.com/docs/en/plugins`."

**W270 corollary** (CLAUDE.md:17, in-line): "primitive validity = trusted-source + active-scope +
commit-SHA-freshness + post-`/plugin install` `/reload-plugins` verification."

**Empirical check**:
- `settings.json:164-233` lists 70 plugin-marketplace+plugin keys, of which ~40 are `true` (enabled).
- All 22 `extraKnownMarketplaces` entries (`settings.json:234-366`) cite `source: github` + a public repo
  (no `directory:` self-paths except `gitnexus-marketplace` which is intentional per CLAUDE.md§Status).
- Verified marketplace orgs: `anthropics`, `openai`, `vectorize-io`, `mksglu`, `fcakyon`, `addyosmani`,
  `forrestchang`, `affaan-m`, `pydantic`, `wshobson`, `OthmanAdi`, `obra`, `sickn33`, `alirezarezvani`,
  `abhigyanpatwari` — 15 distinct orgs.

**Depth-question**: has Anthropic published a stricter Plugin Verification Protocol in 2026? <!-- codex-r1 fix #12: previously asserted "no scrape — no newer 2026-MAY stricter protocol identified" while explicitly admitting freshness mandate was bypassed. Replaced with a dated finding list from available 2026-MAY Anthropic sources (Agent SDK Python docs at `https://platform.claude.com/docs/en/agent-sdk/python` and Agent SDK Dev plugin page at `https://claude.com/plugins/agent-sdk-dev`). -->

**Dated findings (2026-MAY freshness)**:
- Anthropic Agent SDK Python docs (`https://platform.claude.com/docs/en/agent-sdk/python:75-88`) — exposes
  SDK-native primitives for subagents, slash commands, agent skills, plugins, hooks, permissions, sessions,
  and custom tools. Anthropic now ships an SDK surface alongside the Claude Code runtime; the runtime's
  plugin/skill/hook discipline should track the SDK surface (see new §5.5 below).
- Anthropic Agent SDK Dev plugin (`https://claude.com/plugins/agent-sdk-dev:258-261`) — Anthropic Verified;
  describes verification against best-practices including type safety, security, documentation completeness.
  Currently DISABLED per `.claude/settings.json:169` — see §5.4 carry-forward.
- Anthropic skills doc (`https://code.claude.com/docs/en/skills`) cited in CLAUDE.md:13 — covers plugin
  manifest schema + marketplace registration + `claude-plugin/plugin.json` provenance. No NEW stricter
  protocol at this URL, but the Agent SDK docs above add a parallel surface that extends provenance/scope
  considerations.

**Verdict**: Rule 1 is SOTA-current. Depth: GOOD. No extension needed.

### §4.2 Rule 2 (hook discipline) depth check + per-command provenance audit

**Rule (CLAUDE.md:18)**: "Hooks may only be upstream plugin hooks OR direct upstream-CLI invocations
declared in `.claude/settings.json` — semantics per `https://docs.anthropic.com/en/docs/claude-code/hooks`.
**No `.claude/hooks/scripts/*.py` self-invent.**"

**Per-command audit of all hooks in `.claude/settings.json:92-156`**:

| # | Hook event | Matcher | Command | Provenance verdict |
|---|---|---|---|---|
| 1 | SessionStart | (any) | `"Z:/tools/nodejs/node.exe" "Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs"` | **LOW provenance-clarity gap (NOT a violation)** — file is auto-deployed by upstream `context-mode@context-mode` plugin (verified at `.claude/plugins/cache/context-mode/context-mode/1.0.136/hooks/cache-heal-utils.mjs` + `start.mjs`) as a CC bug #46915 workaround. Lives in `.claude/hooks/` by the plugin's own deployment design, NOT the standard plugin-cache location. <!-- team-lead verification 2026-05-18: was "VIOLATION — self-invented 28-LOC .mjs file"; reclassified as upstream-deployed shim with provenance-clarity gap only. --> |
| 2 | PreToolUse | Bash | `gitleaks protect --staged --no-banner --redact --exit-code 0 \|\| true` | PASS — direct upstream-CLI (gitleaks) |
| 3 | PostToolUse | Edit\|Write\|MultiEdit | `bash -c "f=$(jq -r '.tool_input.file_path // .tool_input.filePath // empty'); [ -f \"$f\" ] || exit 0; case \"$f\" in *.py) ruff check ...; *.sh\|*.bash) shellcheck ...; esac; true"` | **PARTIAL — Rule-2 boundary case** — inline `bash -c` hook-program that parses hook-event JSON via `jq` and dispatches per file-extension to upstream CLIs (`ruff` / `shellcheck`). Custom dispatch logic + JSON parsing + extension match are inline shell, NOT a single direct CLI invocation. <!-- codex-r1 fix #5: was "PASS — direct upstream-CLI chain". Codex correctly noted the inline `bash -c` shell program parses hook JSON with `jq` and dispatches tools by extension; while ruff/shellcheck themselves are upstream CLIs, the surrounding dispatch logic is not. --> |
| 4 | PreCompact | auto | `powershell -NoProfile ... Add-Content -Path 'Z:/.../precompact.log' -Value ...` | PASS — direct PowerShell, no scripts |
| 5 | WorktreeRemove | (any) | `git worktree prune \|\| true` | PASS — direct upstream-CLI (git) |
| 6 | Notification | (any) | `powershell -NoProfile ... [System.Console]::Beep(880,150); [Console]::Beep(1100,150)` | PASS — direct PowerShell beep |

**Verdict per CLAUDE.md:18**: Hook #1 (SessionStart `context-mode-cache-heal.mjs`) is a **LOW provenance-clarity
gap, NOT a violation** — upstream-deployed shim at non-standard location, verified per team-lead 2026-05-18.
<!-- team-lead verification 2026-05-18: downgraded Hook #1 finding from HIGH literal-violation to LOW provenance-clarity gap. --> Hook #3 (PostToolUse `bash -c jq…case…esac`) is a **Rule-2 boundary case** — see §4.2.1B below for the actual
discipline-gap and proposed remediation (either upstream the dispatch into a plugin hook, or document as
explicit local exception with a removal/ownership contract). <!-- codex-r1 fix #5: surfaced Hook #3 as a separate boundary-case finding rather than collapsing it into Hook #1's PASS audit. -->

#### §4.2.1 — Hook #1 detail (REVISED — upstream-deployed shim, NOT a CR-2 breach) <!-- team-lead verification 2026-05-18: section retitled + content rewritten. Original framing was "cardinal-rule-2 breach"; verified provenance shows the file is auto-deployed by the upstream context-mode@context-mode plugin. Revised classification: LOW provenance-clarity gap only. -->

Inspection of `.claude/hooks/context-mode-cache-heal.mjs:1-28`:

```javascript
#!/usr/bin/env node
// context-mode plugin cache self-heal (auto-deployed)
// Fixes anthropics/claude-code#46915: auto-update breaks CLAUDE_PLUGIN_ROOT
// Pure Node.js — no bash/shell dependency.
import {...} from "node:fs"; import {...} from "node:path"; import {homedir} from "node:os";
try {
  const f = resolve(homedir(),".claude","plugins","installed_plugins.json");
  if(!existsSync(f)) process.exit(0);
  ...
  for(const[k,es] of Object.entries(ip.plugins||{})){
    if(k!=="context-mode@context-mode") continue;
    ...
  }
} catch(e){ process.stderr.write(`[cache-heal] top-level: ${e.message}\n`); process.exit(0) }
```

**Re-verified provenance (team-lead 2026-05-18)**:
- **Self-invent: NO** — file is **auto-deployed by the upstream `context-mode@context-mode` plugin**.
  Verified at `.claude/plugins/cache/context-mode/context-mode/1.0.136/hooks/cache-heal-utils.mjs` +
  `.claude/plugins/cache/context-mode/context-mode/1.0.136/hooks/start.mjs`. These two upstream plugin files
  are the deploy source; `.claude/hooks/context-mode-cache-heal.mjs` is the deployment target.
- **Upstream channel**: already exists — the plugin OWNS this workaround for `anthropics/claude-code#46915`.
- **Provenance comment**: header says "auto-deployed" — accurate, confirmed by upstream presence.
- **Cardinal-rule-2 reading**: the file is upstream-plugin-supplied (per CR-2 "Hooks may only be upstream
  plugin hooks OR direct upstream-CLI invocations"). The non-standard `.claude/hooks/` location (rather than
  the plugin-cache path) is itself the plugin's design choice — required because the file must survive a
  plugin auto-update that breaks `CLAUDE_PLUGIN_ROOT` (the bug being patched). A file under the plugin-cache
  path would itself be invalidated by the same bug.

**Remaining LOW provenance-clarity gap**:
- The file's upstream-plugin origin is not obvious from the runtime tree alone — a reviewer auditing
  `.claude/hooks/` without checking the plugin cache could mis-read it as self-invent (as Stream E originally
  did). CLAUDE.md does not currently document a Rule-2-clarification note for this deployment pattern.

**Remediation options (revised — sub-15-min each)**:
- **(A)** Add a top-of-CLAUDE.md note (1-2 lines) clarifying that `.claude/hooks/context-mode-cache-heal.mjs`
  is an upstream-deployed shim per the `context-mode` plugin's CC bug #46915 workaround, with a removal-date
  contract ("delete when upstream fix ships in claude-code").
- **(B)** Track an issue on the runtime side or upstream-side to make the deployment self-documenting (e.g.
  upstream could add a header comment line "Auto-deployed from context-mode@<ver>; see plugin-cache/.../cache-heal-utils.mjs for source").

**Recommended**: (A) — minimal CLAUDE.md note; no file relocation; no functional change. The file's
non-standard location is required by the bug it patches; relocating would re-introduce the bug.

#### §4.2.1B — Hook #3 boundary case (the `bash -c jq…case…esac` formatter dispatch) <!-- codex-r1 fix #5: new subsection surfacing the actual settings.json Rule-2 discipline gap -->

Inspection of `.claude/settings.json:119-121`:

```
bash -c "f=$(jq -r '.tool_input.file_path // .tool_input.filePath // empty'); [ -f \"$f\" ] || exit 0;
case \"$f\" in *.py) ruff check --quiet --fix -- \"$f\" >/dev/null 2>&1; ruff format --quiet -- \"$f\"
>/dev/null 2>&1;; *.sh|*.bash) shellcheck --severity=error -- \"$f\" >/dev/null 2>&1;; esac; true"
```

This is an **inline custom hook program** (parses hook-event JSON via `jq` + branches via `case` on file
extension + dispatches `ruff`/`shellcheck`). While the dispatched tools ARE upstream CLIs, the surrounding
parse-and-dispatch logic is inline shell — not "merely a direct upstream-CLI invocation" per CLAUDE.md:19.

**Severity**: MEDIUM (lower than Hook #1 because the inline code lives in `settings.json` rather than a
separate `.mjs` file, and is auditable inline; but it still exceeds the Rule-2 strict reading).

**Remediation options**:
- **(A)** Move the formatter dispatch into an **upstream plugin hook** (e.g. enable a `ruff-format-on-write`
  upstream-supplied hook from a trusted plugin) — preferred.
- **(B)** Document Hook #3 in CLAUDE.md as an **explicit local Rule-2 exception** with a removal/ownership
  contract (the same exception-pattern that Hook #1 needs per §4.2.1).
- **(C)** Refactor to per-extension hooks: 2 separate `PostToolUse` matchers (one for `*.py` invoking ruff
  directly, one for `*.sh|*.bash` invoking shellcheck directly) — eliminates the inline `bash -c` shell
  program.

**Recommended**: (C) — splits one inline-shell entry into 2 direct-CLI entries; cleanest Rule-2 compliance.

#### §4.2.2 — Plugin-supplied hooks cross-check

Plugin hooks (NOT self-invent; cardinal-rule-2 PASS):
- `openai-codex/codex/1.0.4/hooks/hooks.json` — 3 hooks (SessionStart, SessionEnd, Stop) invoking
  `session-lifecycle-hook.mjs` + `stop-review-gate-hook.mjs` from the **plugin's own scripts dir**. PASS.
- `everything-claude-code/everything-claude-code/2.0.0-rc.1/hooks/hooks.json` — many hooks, all invoking
  `marketplaces/everything-claude-code/scripts/hooks/...` from the plugin marketplace dir. PASS.
- `superpowers-marketplace/superpowers/5.1.0/hooks/hooks.json` — 1 hook (SessionStart) invoking
  `${CLAUDE_PLUGIN_ROOT}/hooks/run-hook.cmd`. PASS.

**Verdict Pillar 3 Rule 2**: **0 violations** + **1 LOW provenance-clarity gap** (Hook #1 `.claude/hooks/
context-mode-cache-heal.mjs` — upstream-deployed shim at non-standard location, NOT self-invent) + **1
Rule-2 boundary case** (Hook #3 `settings.json:119-121` inline `bash -c jq…case…esac` formatter dispatch).
Depth: GOOD across the other 4 settings.json commands (#2, #4, #5, #6). **ACTIONS**: optionally clarify
Hook #1 provenance per (A) at §4.2.1 (CLAUDE.md note); remediate Hook #3 per (C) at §4.2.1B.
<!-- team-lead verification 2026-05-18 + codex-r1 fix #5: Hook #1 downgraded from HIGH violation to LOW provenance-clarity gap; Hook #3 remains a Rule-2 boundary case. -->

### §4.3 Rule 3 (subagent provenance) depth check

**Rule (CLAUDE.md:19)**: "Subagents = installed upstream agents OR documented subagent system — per
`https://docs.anthropic.com/en/docs/claude-code/sub-agents`."

**Per-agent audit of `.claude/agents/`**:

| # | File | Cite-class | Provenance comment | Verdict |
|---|---|---|---|---|
| 1 | `evaluator.md` (155 LOC) | TIER-3-LOCAL-COMPOSITION | "Skeptical second-opinion reviewer" — operator-authored | PASS — operator-curated, documented |
| 2 | `gpt5-archaeologist.md` (375 LOC) | TIER-3-LOCAL-COMPOSITION | `<!-- WAVE 15 PORT — claude-sota-installed cite-import per CR-12 TERTIARY ... -->` (`:13-22`) | PASS — explicit cite-class + source SHA `b6f9c1e3...` |
| 3 | `wshobson-devops-troubleshooter.md` (125 LOC) | TIER-1-DIRECT (`wshobson-agents/plugins/distributed-debugging/agents/devops-troubleshooter.md @ HEAD ece811f23310`) | `<!-- DEP-ONLY operationalization, Wave 134 Fire 5 ... Source provenance: ... @ HEAD ece811f2 [VERIFIED 2026-05-12] -->` (`:25-27`) | PASS — exemplar |
| 4 | `wshobson-security-auditor.md` (135 LOC) | TIER-1-DIRECT | same wshobson-agents provenance + HEAD pin | PASS |

**Cross-reference**: per CLAUDE.md§W288 ship-evidence "R3 cite-anchored .claude/agents (W285-shipped
wshobson wrappers restored)". This audit confirms W285 restoration: both wshobson agents present.

**Depth-question**: does the rule need extension for 2026-MAY? E.g. "subagents must have a documented
`model:` + `permissionMode:` + `disallowedTools:` field". Per per-agent inspection:
- All 4 local agents have `tools: [Read, Glob, Grep, Bash]` (`:4`).
- 3 of 4 have `disallowedTools: [Write, Edit, MultiEdit, NotebookEdit]` (Pillar 3 read-only posture).
- All 4 declare `model:` + `permissionMode:` explicitly.

Anthropic sub-agents doc requires `name` + `description` only — the runtime exceeds the spec. PASS.

**Verdict Rule 3**: SOTA-clean. No extension needed.

### §4.4 Rule 4 (no .claude/rules/) verify

**Rule (CLAUDE.md:20)**: "Project behavior in CLAUDE.md + settings.json only — NOT `.claude/rules/*.md`...
The `.claude/rules/` directory does not exist by design."

**Empirical verify**: `ls .claude/rules/` returns `cannot access '.../rules/': No such file or directory`.
PASS — directory does not exist.

`git ls-files .claude/rules/` (not run for context-budget, but the directory not existing on disk implies
the index entry is also empty). Stream A's §1 cite-trail confirms the same — duplicate check.

**Verdict Rule 4**: SOTA-clean. No extension needed.

### §4.5 Rule 5 (safety via permissions) depth check + deny[] vs 2026 OWASP

**Rule (CLAUDE.md:21)**: "Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard
scripts — per `https://docs.anthropic.com/en/docs/claude-code/settings`."

**Audit of `.claude/settings.json` deny[]** (`:64-83`):

> **Plain list excerpt** (one deny-pattern per line). <!-- codex-r1 fix #13: was presented as a `settings.json` snippet but block lacks JSON array syntax (no `[`, no commas, no surrounding quotes). Labelled "plain list excerpt" to match codex finding requirement. The actual JSON array lives at `.claude/settings.json:64-83`. -->

```
Read(./.env)
Read(./.env.*)
Read(./secrets/**)
Read(**/id_rsa)
Read(**/id_ed25519)
Read(**/*.pem)
Read(**/*.pfx)
Read(**/*.key)
Read(./CLAUDE.local.md)
Read(./tools/eee.local.ps1)
Read(**/.aws/credentials)
Read(**/.ssh/config)
Read(**/.ssh/known_hosts)
Read(**/.netrc)
Read(**/.npmrc)
Read(**/.docker/config.json)
Read(**/credentials.json)
Read(**/*.crt)
```

**Coverage against 2026-MAY OWASP / MITRE standard secret-class list**:

| Secret class | OWASP / MITRE recommended | Present in deny[]? |
|---|---|---|
| Environment files | `.env`, `.env.*` | YES (`:65-66`) |
| Generic secrets dir | `secrets/**` | YES (`:67`) |
| SSH private keys | `id_rsa`, `id_ed25519`, `id_ecdsa` | PARTIAL (rsa+ed25519 only; `id_ecdsa` NOT covered, `id_dsa` NOT covered) |
| TLS / X.509 | `*.pem`, `*.crt`, `*.pfx`, `*.key` | YES (`:70-72, 82`) |
| AWS | `.aws/credentials` | YES (`:75`) |
| SSH config | `.ssh/config`, `known_hosts` | YES (`:76-77`) |
| Auth files | `.netrc`, `.npmrc` | YES (`:78-79`) |
| Docker | `.docker/config.json` | YES (`:80`) |
| Generic | `credentials.json` | YES (`:81`) |
| **GCP** | `gcloud/credentials.db`, `application_default_credentials.json` | **NO — gap** |
| **Azure** | `.azure/credentials`, `*.publishsettings` | **NO — gap** |
| **GitHub** | `.gitconfig` (token-stored), `.git-credentials` | **NO — gap** |
| **JWT / OAuth** | `*.jwt`, `oauth_token*` | **NO — gap** |
| **Kubernetes** | `.kube/config` | **NO — gap** |
| **Database** | `.pgpass`, `.my.cnf` | **NO — gap** |

**Verdict**: 14 covered, **6 cloud / DB / OAuth secret classes missing**. Low-severity (these are
read-deny only — a determined model could still glob to find them, but the deny[] is a defense-in-depth
guardrail not a primary control). **Sub-15-min fix**.

**Depth-question**: are there 2026-MAY OWASP/MITRE updates? OWASP API Security Top 10 (2023 update) cites
"API8:2023 — Security Misconfiguration" — `deny[]` is a soft control, not a primary boundary. Anthropic
sandboxing per `docs.anthropic.com/en/docs/claude-code/settings` cites `permissions.allow/deny/ask` as the
primary control. The runtime is correctly using `defaultMode: bypassPermissions` (`:84`) which is
operator-aware (per CLAUDE.local.md§Hard-Rules).

**Verdict Rule 5**: SOTA-clean at primitive level; **6 secret-class additions** would strengthen the
defense-in-depth.

### §4.6 Should the 5 rules be extended?

**Reclassified §4.6 per codex-r1 over-reach feedback**: <!-- codex-r1 fix #1+#2: original §4.6 proposed both Rule 6 (MCP pin) + Rule 7 (state-outside-repo) as NEW cardinal-rule promotions. Codex correctly noted (a) MCP pin is already embedded in Rule 2 — promotion duplicates; (b) state-outside-repo is still violated by Cognee — premature promotion. Both reclassified to non-promotion outcomes below. -->

**Item 1 — MCP-server pin discipline — TIGHTEN existing Rule 2, do NOT promote new Rule 6**

**Anchor**: CLAUDE.md:18 in-line **already contains** the W286-arc-P0C ratification "`.mcp.json` MCP-server
`command/args` contract is `npx -y <pkg>@<pinned-version>` (per W286-cross commits `fcafe05`+`77dc081`)".

**Empirical state**: `.mcp.json` (read in §1 cite-trail) contains 15 mcpServers entries. Per inspection:
- `playwright`: `npx -y @playwright/mcp@0.0.75` — pinned ✓
- `chrome-devtools`: `npx -y chrome-devtools-mcp@0.26.0` — pinned ✓
- `repomix`: `npx -y repomix@1.14.0 --mcp` — pinned ✓
- `serena`: `uvx --from git+https://github.com/oraios/serena@249f6b07f9ccac259b0ff95e06c9a40629748e17 ...` — SHA-pinned ✓
- `phoenix`: `npx -y @arizeai/phoenix-mcp@4.0.13` — pinned ✓ (per `_comments` block line `w286_cross_npx_pinned_v2`)
- 10 others: `type:http` (no version pin needed) or `command:` to local binaries (npm-globally installed at
  known SHA).

**Risk if Rule 2 language stays terse**: future operator may add an unpinned `npx -y <pkg>` entry — the
runtime's only enforcement today is the `_comments.w286_cross_npx_pinned_v2` prose anchor in `.mcp.json` +
codex adversarial-review spot-checking.

**Recommended (revised per codex-r1)**: **TIGHTEN Rule 2 wording** so the MCP-pin clause is unambiguous and
grep-able WITHIN Rule 2. Do NOT promote to Rule 6 — that would duplicate an already-extant cardinal rule
sub-clause.

---

**Item 2 — State-outside-repo — TRACK as remediation gate, do NOT promote new Rule 7**

**Anchor**: CLAUDE.md§Status W286-cross-fix series **explicitly states** "data-dir `C:/Users/42/.cognee`
still violates state-outside-repo" — i.e. the invariant IS being violated by Cognee TODAY.

**Empirical state**:
- `CLAUDE.local.md§(f)`: `CLAUDE_CODE_PROJECT_DIR = 'Z:/claude-sota-installed-state/.claude/projects'` ✓
- `CLAUDE.local.md§(f)`: `CODEX_HOME = 'Z:/claude-sota-installed-state/.codex'` ✓
- `.claude/plugins/data/` added to .gitignore per CLAUDE.md§W280 closeout ✓
- `.gitignore` covers `CLAUDE.local.md` (gitignored per CCBP `claude-memory.md:113`) ✓
- `tools/migrate-cognee-state.ps1 -Execute` deferred operator action per CLAUDE.md§W288 line ✓ (deferred but
  not done — the invariant is empirically violated until that script runs)

**Risk of premature promotion**: ratifying state-outside-repo as a cardinal rule while it is **still being
violated by Cognee** would create a perpetual rule-violation flag that codex adversarial-review hits on
every commit. CLAUDE.md:22 already places safety boundaries under permissions/sandboxing rather than custom
state policy — premature ratification also crosses that boundary.

**Recommended (revised per codex-r1)**: **TRACK as remediation gate** — add a ledger row tracking the
Cognee migration via `tools/migrate-cognee-state.ps1 -Execute` + independent verification. AFTER both
complete, revisit whether the invariant warrants Rule 7 promotion.

---

**Proposed Rule 8 — Agent-team trigger threshold (DOWNGRADE STATUS-OF, NOT NEW)**

The W269 mandate currently lives at CLAUDE.md:14 as a sub-bullet of "Parallel execution (4 modes, W259-v8
U4)" — "for any research / audit / review / debug / migration / large-feature fire with 2+ independent
questions or workstreams, the parent orchestrator MUST first dispatch agent-teams ...".

**Empirical evidence** that this mandate IS being followed: this Stream-E audit itself runs inside team
`w296-arch-audit-sota-challenger` per W269. Stream A's §2 records "TeamCreate w296-arch-audit-sota-challenger
— 6 stream teammates ... ✅ in-flight (3 in-flight: stream-C-2 + stream-E + stream-F — at W269 ~3 limit)".

**Should it be a cardinal rule?** Pro: more discoverable. Con: it's an orchestration discipline, not a
plugin/hook/subagent/rule layer invariant — it's already at the right place in CLAUDE.md§Architecture.

**Recommended**: KEEP at current location (CLAUDE.md:14 sub-bullet). NOT promote.

---

**Summary of cardinal-rule discipline (REVISED per codex-r1)**: <!-- codex-r1 fix #1+#2: revised summary table from "PROMOTE 2 new rules" to discipline-tightening + remediation-gate-tracking. -->

| Item | Class | Status | Action | LOC cost |
|---|---|---|---|---|
| MCP pin discipline | EXISTING sub-clause of Rule 2 | TIGHTEN Rule 2 wording | Edit CLAUDE.md:19 in-line text | 0-2 |
| State-outside-repo | REMEDIATION GATE (Cognee still violates) | TRACK in remediation ledger; revisit promotion AFTER migration + verification | Add ledger row | 0 |
| Agent-team trigger | EXISTING | KEEP at CLAUDE.md:14 | none | 0 |

**Pillar 3 highest-priority actions** (3, listed by severity):
1. **CORRECTED per Stream E self-correction + codex r2 NEW-H1**: `.claude/hooks/context-mode-cache-heal.mjs` is NOT a Rule 2 violation — it is upstream plugin-deployed by `context-mode@context-mode v1.0.136` for `anthropics/claude-code#46915`. LOW provenance gap only; optional Rule-2-exception note in CLAUDE.md. Hook #3 inline `bash -c jq…case…esac` IS the boundary case (§4.2.1B). **Sub-hour for the Hook #3 split + optional 5-min CLAUDE.md note**.
2. Tighten Rule 2 MCP-pin clause wording + add state-outside-repo to remediation ledger (NOT promote new rules). **15 min CLAUDE.md + ledger edit**.
3. Add 6 secret-class entries to `settings.json:deny[]` (Rule 5 defense-in-depth). **15 min edit**.

---

## §5 — Pillar 4 — Foundation-layer SOTA convergence ask

### §5.1 `agentic-org/agent-skills` and community skill-spec convergence

**Question**: is there a community-canonical "skill quality" spec the runtime should reference?

**External anchors**:
- Anthropic `code.claude.com/docs/en/skills` — current canonical doc, cited per CLAUDE.md:13.
- `obra/superpowers/5.1.0/skills/writing-skills/anthropic-best-practices.md` — explicit cross-reference from
  the superpowers plugin to Anthropic best practices (file present in plugin tree per ls in §1).
- `obra/superpowers/5.1.0/skills/writing-skills/SKILL.md` — superpowers' own counter-philosophy (per the
  CLAUDE.md included in this audit's context-load — "Our internal skill philosophy differs from Anthropic's
  published guidance ... We have extensively tested and tuned our skill content").

**Tension**: there are TWO valid skill-design philosophies in 2026-MAY: Anthropic-canonical (clean, terse,
description-trigger discipline) and `obra/superpowers` "behavior-shaping" (longer, Red-Flags-tables,
testing-with-subagents). The runtime hosts BOTH (Anthropic-style speckit-* + operator-style sota-convergence-audit
+ behavior-shaping mem-recall) which is the right answer: NO single spec to adopt; both are valid for
different skill-classes.

**Verdict**: no foundation-layer Δ. Continue diversity.

### §5.2 superpowers skill body — what foundation primitives is this runtime missing?

Cross-reference of `obra/superpowers/5.1.0/skills/` directory against the runtime's enabled skills:

| Superpowers skill | Enabled via? | Gap? |
|---|---|---|
| `brainstorming` | YES (`superpowers@claude-plugins-official` enabled per `settings.json:165`) | none |
| `dispatching-parallel-agents` | YES | none |
| `executing-plans` | YES | none |
| `finishing-a-development-branch` | YES | none |
| `receiving-code-review` | YES | none |
| `requesting-code-review` | YES | none |
| `subagent-driven-development` | YES | none |
| `systematic-debugging` | YES | none |
| `test-driven-development` | YES | none |
| `using-git-worktrees` | YES | none |
| `using-superpowers` | YES | none |
| `verification-before-completion` | YES | none |
| `writing-plans` | YES | none |
| `writing-skills` | YES | none |

ALL 14 superpowers skills are loaded per `settings.json:165` `superpowers@claude-plugins-official: true`.
**Zero gap from superpowers**.

**Note** (`settings.json:206` `superpowers@superpowers-marketplace: false`) — the runtime explicitly
DISABLES the `superpowers-marketplace` source variant in favor of `claude-plugins-official`. Both routes
ship the same content; only one active = correct (avoids double-load + cardinal-rule-3 ambiguity).

### §5.3 `claude-plugins-official` marketplace — any 2026-Q1 supplant candidate?

The marketplace inventory at `.claude/plugins/cache/claude-plugins-official/` shows 20 plugins (per `ls` in
§1). Enabled subset per `settings.json:164-233`:

| Plugin | Enabled? | Status |
|---|---|---|
| superpowers | YES | core |
| pyright-lsp | YES | core |
| typescript-lsp | YES | core |
| frontend-design | YES | conditional |
| context-mode (`@context-mode`) | YES | core |
| claude-md-management | YES | conditional |
| pr-review-toolkit | YES | conditional |
| code-review | YES | core |
| feature-dev | YES | core |
| code-simplifier | YES | conditional |
| commit-commands | YES | core |
| session-report | YES | conditional |
| code-modernization | YES | conditional |
| ralph-loop | YES | conditional |
| agent-sdk-dev | NO | **DECISION-NEEDED** — see §5.5 below; not auto-correct to "dev-only" <!-- codex-r1 fix #7: dismissed as "dev-only, correctly disabled" but Anthropic-Verified plugin per `https://claude.com/plugins/agent-sdk-dev:234-261` covers project scaffolding + verification agents for SDK usage, type safety, security practices, documentation completeness — directly relevant to foundation audit. --> |
| skill-creator | NO | dev-only, correctly disabled |
| claude-code-setup | NO | bootstrap-only, correctly disabled |
| plugin-dev | NO | dev-only, correctly disabled |
| playground | NO | dev-only, correctly disabled |
| mcp-server-dev | NO | dev-only, correctly disabled |
| clickhouse | NO | optional |
| outputai | NO | optional |
| qdrant-skills | NO | optional |
| cwc-makers | NO | optional |
| hookify | NO | optional |

**Verdict**: enabled subset is appropriate. No 2026-Q1 supplant identified.

### §5.4 W295 Stream A+B+C+D foundation-layer Δ carry-forward

Per Stream A §0 TL;DR (cited in §1 cite-trail):
- sca-v5 Δ1-Δ12 are UNANIMOUS-4-of-4 stream verdicts awaiting operator ratification.
- 8 visible weak-spots in current arch (basic-memory drift, graphiti retirement, etc.).

**Foundation-layer subset of these**:
- (d) graphiti T4 retirement is documented but not fully scrubbed from skill body — this IS a foundation-layer
  defect (skill body in `sota-convergence-audit/SKILL.md` may still reference graphiti — pending Stream A
  follow-up).
- (g) `memory` MCP + `github` + `context7` + `playwright` in `disabledMcpjsonServers` — SOTA configuration
  anti-pattern (entries should be removed when disabled per Stream A:§0). This is **a settings.json hygiene
  defect, not a cardinal-rule violation**.

**No new foundation-layer Δ** beyond Stream A's documentation.

### §5.5 — Missing external-primitive gaps (codex-r1 surfaced) <!-- codex-r1 fix #7+#8+#9: new subsection consolidating 3 external-primitive foundation gaps that codex review identified as missing from the original Stream E audit -->

The original Stream E audit failed to surface 3 foundation-layer primitive gaps tied to 2026-MAY Anthropic
and Microsoft offerings. Codex-r1 review flagged each as a HIGH finding. They are listed here as foundation
gaps Stream E now formally surfaces:

#### Gap E-X1: `agent-sdk-dev` plugin DECISION-NEEDED

**Anchor**: `https://claude.com/plugins/agent-sdk-dev:234-261` — Anthropic Verified plugin providing project
scaffolding + verification agents for Agent SDK usage, type safety, security practices, documentation
completeness. Current state: `.claude/settings.json:169` sets `"agent-sdk-dev@claude-plugins-official": false`.

**Original Stream E classification**: "dev-only, correctly disabled" (§5.3 row).

**Revised classification**: **DECISION-NEEDED** — three options:
- **(a)** Enable for SDK/foundation work if any in-runtime code consumes the Anthropic Python SDK.
- **(b)** Keep disabled but document rationale (e.g. "no SDK-consumer code in this runtime; re-evaluate when
  an SDK-consuming script is added").
- **(c)** Add a runbook for on-demand enabling + verification-agent use during specific waves.

**Recommended**: (b) — explicit disabled-with-rationale, until a concrete SDK-consuming code path lands.

#### Gap E-X2: Anthropic Python SDK foundation-primitive pattern-parity audit MISSING

**Anchor**: `https://platform.claude.com/docs/en/agent-sdk/python:75-88` — Agent SDK exposes SDK-native
primitives for: subagents (`AgentDefinition`), slash commands, agent skills, plugins (`SdkPluginConfig`),
hooks, permissions, sessions, checkpoints (`enable_file_checkpointing` at `:1032-1045`), custom tools.

**Gap**: this runtime's plugin/skill/hook/subagent/permission policy has NOT been mapped against the SDK
surface. Foundation-layer pattern-parity check is missing.

**Proposed action**: future micro-wave authoring of `docs/architecture/W297-AGENT-SDK-PATTERN-PARITY.md`
that walks each SDK primitive type and lists: (a) runtime policy equivalence; (b) divergences if any;
(c) actionable updates to cardinal rules if SDK surface tightens any current invariant.

#### Gap E-X3: Microsoft Agent Framework 2026 foundation primitives MISSING from pattern-study

**Anchor**:
- `https://github.com/microsoft/agent-framework/releases:232-242` — experimental skills API aligned to
  `agentskills.io`, `SkillFrontmatter` type, A2A v1.0 migration, checkpoint path-traversal hardening.
- `https://github.com/microsoft/agent-framework/releases:810-817` — 2026-04-24 release adds functional
  workflow API, OpenTelemetry integration, Agent Framework → A2A bridge.

**Gap**: original Stream E summarized Microsoft Agent Framework as generic "documentation-agent patterns" —
this missed the active 2026 foundation primitives that ARE comparable to this runtime's stack.

**Concrete pattern-study rows** Stream E now adds:
- **Skills-spec compatibility** — does this runtime's local skill format align to `agentskills.io` /
  `SkillFrontmatter`? Audit not done.
- **A2A bridge semantics** — could this runtime expose its agents via A2A v1.0?
- **Workflow API** — does this runtime have a workflow-API equivalent worth shipping?
- **Telemetry** — OpenTelemetry instrumentation: this runtime has langfuse T5 + phoenix; check overlap.
- **Checkpoint security** — path-traversal hardening: does this runtime's checkpoint state expose any
  equivalent attack surface? `CLAUDE_CODE_PROJECT_DIR` redirect at `CLAUDE.local.md:(f)` is a partial
  mitigation but full audit not done.

**Proposed action**: future micro-wave (or W297 if scoped) authoring 5 pattern-study rows.

---

## §6 — Synthesis — TOP-3 foundation-layer next-priorities

The Stream-E audit identifies exactly 3 foundation-layer next-priorities (no more, no less per the done
criteria):

### 1. Hook-discipline boundary cases — clarify Hook #1 provenance + remediate Hook #3 inline-dispatcher <!-- team-lead verification 2026-05-18: action #1 retitled and rewritten. Original framing was "remediate Hook #1 cardinal-rule-2 violation"; verified provenance shows Hook #1 is upstream-deployed, NOT self-invent. Action #1 now (a) optional clarification for Hook #1 LOW provenance-clarity gap + (b) Hook #3 inline-dispatcher boundary case (codex-r1 fix #5). -->

**Why #1**: TWO hook-discipline items remain, both LOWER-severity than original Stream E claimed:
- **Hook #1** (`.claude/hooks/context-mode-cache-heal.mjs`): **NOT a violation** — auto-deployed by the
  upstream `context-mode@context-mode` plugin per its `cache-heal-utils.mjs` + `start.mjs` workaround for
  `anthropics/claude-code#46915`. **LOW** severity provenance-clarity gap only — the upstream-deployment
  origin is not obvious from the runtime tree alone.
- **Hook #3** (`.claude/settings.json:119-121` inline `bash -c "f=$(jq -r ...) ; case ..."`): Rule-2
  boundary case — inline shell program with `jq` parse + per-extension dispatch (codex-r1 fix #5).

Severity: Hook #1 = LOW (optional clarification); Hook #3 = MEDIUM (boundary case). Effort: SUB-15-MIN for
Hook #1; SUB-HOUR for Hook #3.

**Action plan**:
- **Hook #1**: (optional) add a top-of-CLAUDE.md note (1-2 lines) clarifying that `.claude/hooks/
  context-mode-cache-heal.mjs` is an upstream-deployed shim per the `context-mode` plugin's CC bug #46915
  workaround, with a removal-date contract. NO file relocation — the non-standard location is required by
  the bug being patched.
- **Hook #3**: per §4.2.1B option (C) — split the inline `bash -c "f=$(jq -r ...) ; case ..."` into 2 separate
  `PostToolUse` matchers (one for `*.py` invoking `ruff` directly via `tool_input.file_path`-aware matcher,
  one for `*.sh|*.bash` invoking `shellcheck` directly), eliminating the inline shell program.

**Acceptance criterion (Hook #1)**: CLAUDE.md contains a 1-2-line provenance note for Hook #1. File remains
in place at `.claude/hooks/context-mode-cache-heal.mjs` (upstream-required location). **Acceptance criterion
(Hook #3)**: `.claude/settings.json:115-125` contains 2 per-extension `PostToolUse` entries instead of one
inline-dispatcher block; each entry is a direct upstream-CLI invocation.

### 2. Tighten Rule-2 MCP-pin clause + track state-outside-repo as remediation gate <!-- codex-r1 fix #1+#2: removed "Promote Rule 6/Rule 7" framing per codex over-reach feedback. MCP pin is already a sub-clause of Rule 2; state-outside-repo is still violated by Cognee. -->

**Why #2**: BOTH invariants are MORE NUANCED than original Stream E claimed:
- **MCP pin discipline**: already embedded as a sub-clause of Rule 2 at CLAUDE.md:19 in-line — promoting it
  to a new Rule 6 would duplicate an existing cardinal rule rather than extend coverage. The right action is
  to **tighten/validate Rule 2's existing MCP-pin clause language**, not add a 6th rule.
- **State-outside-repo**: still empirically VIOLATED by Cognee's `C:/Users/42/.cognee` data-dir per §4.6 +
  CLAUDE.md§Status (the deferred `tools/migrate-cognee-state.ps1 -Execute` action hasn't run). Premature
  promotion to Rule 7 would ratify a still-violated invariant. The right action is to **track as a
  remediation gate** until the migration script runs + is independently verified.

Severity MEDIUM. Effort 15-30 min split between (a) Rule 2 language tighten + (b) remediation-gate ledger row.

**Action plan**:
- (a) Tighten Rule 2 (CLAUDE.md:19) MCP-pin sub-clause: ensure the empirical-evidence anchor (`_comments.w286_cross_npx_pinned_v2` in `.mcp.json`) is referenced and the pin contract is unambiguous.
- (b) Add a remediation-gate ledger row (in CLAUDE.md§Status or a dedicated `docs/architecture/REMEDIATION-GATES.md`) tracking:
  - Cognee data-dir migration via `tools/migrate-cognee-state.ps1 -Execute` (status: deferred-operator-action).
  - Independent verification step after migration runs (e.g. shellcheck of NSSM-restart + `dir C:/Users/42/.cognee` returns empty + `dir Z:/claude-sota-installed-state/.cognee` populated).
  - Promotion review trigger: AFTER (a) migration completes + (b) verification PASSES, then revisit whether state-outside-repo merits a Rule 7 promotion.

**Acceptance criterion**: (i) Rule 2 MCP-pin language reviewed + tightened in CLAUDE.md (no rule-count change); (ii) remediation-gate ledger row exists with the Cognee migration explicit.

### 3. Fix the 3 pointer-skills fresh-clone hazard + delete/populate `.claude/skills/learned/` <!-- codex-r1 fix #3: "4 pointer-skills" → "3 pointer-skills" -->

**Why #3**: **3** of 18 local skills (vercel-composition-patterns + vercel-react-best-practices +
web-design-guidelines) load body content from `Z:/repos/deps/vercel-labs-agent-skills/...`
— a sibling clone that is gitignored, not in the install manifest, and not cloned by `tools/bootstrap-runtime.ps1`.
On a fresh clone the skills auto-fire (description-match works because frontmatter is local) but the body
is unreachable. The `learned/` directory is empty (zero-LOC). Severity LOW (only triggers on fresh-clone or
sibling-clone deletion). Effort SUB-HOUR per skill.

**Action plan** (in order):
- (a) Inline the body of `vercel-composition-patterns/SKILL.md` from the upstream `Z:/repos/deps/vercel-labs-agent-skills/skills/composition-patterns/SKILL.md @ HEAD b9c8ee06` (PINNED in frontmatter — clean cite). Same for the other 2 vercel-class skills.
- (b) Either delete `.claude/skills/learned/` (if it was a planning placeholder that never got written) OR populate it (if a "lessons learned" skill is wanted — but per the available-skills list "learned" doesn't appear in operator-curated skills inventory; recommend DELETE).
- (c) `langfuse/SKILL.md` confirmed self-contained — body uses `npx langfuse-cli` (`:7-14`) + WebFetch domain `langfuse.com`, no `Z:/repos/deps` body redirect (verified per `.claude/skills/langfuse/SKILL.md:3-14`). NO inlining needed.

**Acceptance criterion**: each of the 3 vercel-class SKILL.md files is self-contained (cardinal-rule-3 cite-clean but content-complete) + `learned` deleted. `ls .claude/skills/` returns 17 entries (was 18; `learned` removed).

---

## §7 — Risks + carry-forward

### §7.1 Risks identified during this audit

**R-E1** (REVISED per team-lead verification 2026-05-18): `.claude/hooks/context-mode-cache-heal.mjs` was
originally flagged for removal/relocation; verified provenance shows the file is upstream-deployed by the
`context-mode@context-mode` plugin AND its non-standard `.claude/hooks/` location is REQUIRED by the bug it
patches (CC #46915 — auto-update breaks `CLAUDE_PLUGIN_ROOT`, so a plugin-cache-path file would itself be
invalidated). **Action revised**: do NOT relocate — file must remain in place. Optional CLAUDE.md provenance
note only.

**R-E2**: tightening Rule 2 MCP-pin clause + tracking state-outside-repo as a remediation gate may invite
future codex adversarial-reviews to flag any unpinned `npx` (Rule 2 strict reading) or Cognee state-leak
regression. <!-- codex-r1 fix #1+#2: was "promoting Rule 6 + Rule 7" — revised to tightening + remediation tracking. --> This is the **intended effect** — defense-in-depth without rule duplication. Operator should
be aware that ship-cadence may slow slightly as more invariants are gate-enforced, AND that the remediation
ledger gate on Cognee should be cleared before any future Rule 7 promotion is considered.

**R-E3**: inlining the 3 vercel-class skill bodies grows local SKILL.md LOC from ~70 to ~450. Per the
context-budget preload concern: skill descriptions auto-load at session start but BODIES load only on
invocation. So inlining costs trigger-discoverability budget zero (description stays terse), and adds
body-load cost only when the skill actually fires. Verdict: acceptable.

### §7.2 Findings deferred to future waves

**D-E1**: the 4 missing agent-team presets (eval / red-team / docs-author / 1 more) are value-add, not
foundation-defects. Defer to W297+ wave when an operator-pull-request for one of these naturally surfaces.

**D-E2**: the 6 missing secret-class deny[] entries (GCP / Azure / GitHub / JWT / Kubernetes / DB) are
defense-in-depth, not primary safety. Defer to a security-hardening sub-wave (could batch with W294 AI-1
historical-secret rotation if those are still queued).

**D-E3**: the `anthropic-agent-skills/example-skills` plugin shipping 3 side-by-side commit-SHA version
dirs (`6a5bb06904ab` + `f458cee31a75` + `unknown`) is a wave-hygiene defect on Anthropic's side — not
runtime-actionable but worth flagging to Stream A for ledger record.

**D-E4**: the W294 PWF (`OthmanAdi/planning-with-files`) T1 INSTALL is verified-enabled per
`settings.json:232` but its 16 skills are not enumerated in this audit (out of scope). Defer to W295 audit
follow-up if Stream A's #7 weak-spot mentions it specifically.

**D-E5**: Stream A's 8 visible weak-spots include items at the foundation-orthogonal layer (memory T6
config drift, graphiti retirement) — these are Stream A's domain, not Stream E.

### §7.3 Carry-forward for Stream C / synthesis

For Stream C (challenger-vs-incumbent ranking) and the W296 synthesis:
- **Foundation-layer is largely SOTA-clean** — 3 concrete defects identified, all sub-hour fixes.
- **Foundation-layer is NOT a blocker for sca-v5 Δ1-Δ12 ratification** — those are research-arch evolutions,
  not foundation defects.
- **Foundation-layer next-priorities should ship in a single dedicated W297 micro-wave** (the 3 actions
  total < 2 hours) to avoid intermingling with the larger Stream A/B/C/D arc ratification.

For the team-lead synthesis:
- 3 named next-priorities (per §6).
- Stream-E completion does NOT block Streams C/F.
- Suggested commit message: `feat(foundation): W296-E clarify Hook #1 upstream-shim provenance + remediate Hook #3 inline-dispatcher + tighten Rule 2 MCP-pin clause + remediation-gate Cognee state-outside-repo + inline 3 vercel pointer skills`. <!-- team-lead verification 2026-05-18 + codex-r1 fix #1+#2+#5: Hook #1 reframed as upstream-shim provenance clarification (NOT remediation); Hook #3 remediation retained; remainder unchanged. -->

---

## §8 — Cite trail

This section consolidates every cite anchor used in this audit for reviewer verification.

### File:line anchors (runtime)

| Citation | Path | Lines | Purpose |
|---|---|---|---|
| Cardinal rule 1 | `CLAUDE.md` | 17 | Plugin trust statement |
| Cardinal rule 2 | `CLAUDE.md` | 18 | Hook discipline statement |
| Cardinal rule 3 | `CLAUDE.md` | 19 | Subagent provenance statement |
| Cardinal rule 4 | `CLAUDE.md` | 20 | No .claude/rules/ statement |
| Cardinal rule 5 | `CLAUDE.md` | 21 | Safety via permissions statement |
| W255 cleanup record | `CLAUDE.md` | 9 | "22,060 LOC self-invent gone" baseline |
| Behavioral discipline | `CLAUDE.md` | 13 | Skill description-match auto-fire |
| Parallel-execution modes | `CLAUDE.md` | 14 | 4 modes + W269 agent-team trigger |
| W286-arc-P0C MCP pin | `CLAUDE.md` | 18 (in-line) | Empirical Rule 6 anchor |
| W288 ship-evidence | `CLAUDE.md` | (status section) | Cardinal-rule-invariants verified |
| Hook #1 (LOW provenance gap) | `.claude/settings.json` | 98 | context-mode-cache-heal.mjs invocation — **codex r3 r1-F7 correction**: NOT a violation; upstream plugin-deployed by context-mode@1.0.136 as workaround for anthropics/claude-code#46915; LOW provenance-clarity gap only (non-standard file location). |
| Hook #2 (gitleaks) | `.claude/settings.json` | 109 | PASS — direct CLI |
| Hook #3 (PARTIAL — Rule-2 boundary) | `.claude/settings.json` | 120 | **codex r3 r1-F7 correction**: PARTIAL — inline `bash -c` parses hook-event JSON via `jq` and dispatches per file-extension to upstream CLIs (`ruff`/`shellcheck`). Custom dispatch logic is the Rule-2 boundary case, NOT a direct upstream-CLI chain. See §4.2.1B for 3 remediation options. |
| Hook #4 (PreCompact log) | `.claude/settings.json` | 131 | PASS — direct PowerShell |
| Hook #5 (worktree prune) | `.claude/settings.json` | 141 | PASS — direct git |
| Hook #6 (Notification beep) | `.claude/settings.json` | 151 | PASS — direct PowerShell |
| deny[] list | `.claude/settings.json` | 64-83 | 14 entries audited, 6 gaps |
| enabledPlugins map | `.claude/settings.json` | 164-233 | 70 keys, ~40 enabled |
| extraKnownMarketplaces | `.claude/settings.json` | 234-366 | 22 marketplace sources |
| autoMemoryEnabled | `.claude/settings.json` | 373 | env disable wins per CLAUDE.local.md |
| context-mode-cache-heal (target) | `.claude/hooks/context-mode-cache-heal.mjs` | 1-28 | Upstream-deployed shim (LOW provenance-clarity gap, not self-invent — team-lead verified 2026-05-18) |
| context-mode-cache-heal (source) | `.claude/plugins/cache/context-mode/context-mode/1.0.136/hooks/cache-heal-utils.mjs` | 1-50 | Upstream plugin deploy source for the `.claude/hooks/` shim (verified) |
| context-mode start.mjs | `.claude/plugins/cache/context-mode/context-mode/1.0.136/hooks/` | (existence) | Upstream plugin deploy mechanism for the shim |
| vercel-comp-patterns body | `.claude/skills/vercel-composition-patterns/SKILL.md` | 13-14 | "read Z:/repos/deps/..." defect |
| vercel-react body | `.claude/skills/vercel-react-best-practices/SKILL.md` | 13-14 | same defect |
| web-design body | `.claude/skills/web-design-guidelines/SKILL.md` | 13-14 | same defect |
| learned/ empty | `ls .claude/skills/learned/` | (empty) | Phantom skill |
| sota-convergence-audit | `.claude/skills/sota-convergence-audit/SKILL.md` | 1-50 | v3.1 ship state |
| mem-recall trigger | `.claude/skills/mem-recall/SKILL.md` | 3 | "Use when" + "Do NOT invoke" |
| goal-prompt-synthesis trigger | `.claude/skills/goal-prompt-synthesis/SKILL.md` | 3 | same pattern |
| evaluator agent | `.claude/agents/evaluator.md` | 1-12 | TIER-3-LOCAL-COMPOSITION |
| gpt5-archaeologist provenance | `.claude/agents/gpt5-archaeologist.md` | 13-22 | TIER-3 cite-import |
| wshobson-devops cite | `.claude/agents/wshobson-devops-troubleshooter.md` | 25-27 | TIER-1-DIRECT @ ece811f2 |
| wshobson-security cite | `.claude/agents/wshobson-security-auditor.md` | (similar) | TIER-1-DIRECT @ ece811f2 |
| codex hooks | `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` | 1-50 | 3 plugin hooks — PASS CR-2 |
| ECC hooks | `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/hooks/hooks.json` | 1-50 | Many plugin hooks — PASS CR-2 |
| superpowers hooks | `.claude/plugins/cache/superpowers-marketplace/superpowers/5.1.0/hooks/hooks.json` | 1-14 | 1 plugin hook — PASS CR-2 |
| agent-teams team-spawn | `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/commands/team-spawn.md` | 12-65 | 7 preset definitions |
| agent-teams team-lead | `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/agents/team-lead.md` | 1-30 | Team orchestrator spec |
| karpathy-guidelines | `.claude/plugins/cache/karpathy-skills/andrej-karpathy-skills/1.0.0/skills/karpathy-guidelines/SKILL.md` | 1-30 | 4-axis behavioral |
| codex-cli-runtime | `.claude/plugins/cache/openai-codex/codex/1.0.4/skills/codex-cli-runtime/SKILL.md` | 1-30 | Internal helper contract |
| .mcp.json comments | `.mcp.json` | (top _comments block) | W286-cross_npx_pinned_v2 anchor |
| Stream A TL;DR | `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-A-CURRENT-ARCH-AUDIT.md` | 11-50 | 8 weak-spots cross-reference |
| W296 wave ledger | `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-AUDIT-2026-05-18.md` | 25-50 | Team-E task #462 context |

### URL anchors (Anthropic + external; verified cited per CLAUDE.md or docs)

| URL | Used for | CLAUDE.md cite location |
|---|---|---|
| `https://code.claude.com/docs/en/plugins` | Rule 1 anchor | CLAUDE.md:17 |
| `https://docs.anthropic.com/en/docs/claude-code/hooks` | Rule 2 anchor | CLAUDE.md:18 |
| `https://docs.anthropic.com/en/docs/claude-code/sub-agents` | Rule 3 anchor | CLAUDE.md:19 |
| `https://docs.anthropic.com/en/docs/claude-code/settings` | Rule 4+5 anchor | CLAUDE.md:20-21 |
| `https://code.claude.com/docs/en/skills` | Skill discovery mechanism | CLAUDE.md:13 |
| `https://code.claude.com/docs/en/headless` | Parallel-execution modes | CLAUDE.md:14 |
| `https://code.claude.com/docs/en/cli-reference` | Parallel-session safety | CLAUDE.md:15 |
| `https://code.claude.com/docs/en/mcp` | MCP transport contract | `.mcp.json` _comments |
| `anthropics/claude-code#46915` | context-mode-cache-heal upstream issue | `.claude/hooks/context-mode-cache-heal.mjs:3` |

### External repo anchors (2026-MAY)

| Org/Repo | Used for | Anchor strength |
|---|---|---|
| `anthropics/claude-plugins-official` | Pillar 1 §2.2 baseline | Anthropic-canonical |
| `anthropics/skills` (= anthropic-agent-skills) | Pillar 1 §2.2 example skills | Anthropic-canonical |
| `anthropics/claude-agent-sdk-python` (~6.9k) | Pillar 2 §3.3 SDK challenger | TIER-1 SDK |
| `openai/openai-agents-python` (~26.4k) | Pillar 2 §3.3 SDK challenger | TIER-1 SDK |
| `microsoft/agent-framework` (~10.5k) | Pillar 2 §3.3 SDK challenger | TIER-1 SDK |
| `agentscope-ai/agentscope` (~25.2k) | Pillar 2 §3.3 SDK challenger | community |
| `obra/superpowers` | Pillar 1 §2.2 + Pillar 2 §3.4 | TIER-1 plugin |
| `wshobson/agents` (= claude-code-workflows) | Pillar 1 §2.2 + Pillar 2 §3.1+3.2 | TIER-1 plugin |
| `vercel-labs/agent-skills` | Pillar 1 §2.1 cite-defect anchor | TIER-1 source for 3 pointer-skills |
| `addyosmani/agent-skills` | Pillar 1 §2.2 alt source-driven-dev | TIER-1 plugin |
| `forrestchang/andrej-karpathy-skills` | Pillar 1 §2.2 | TIER-1 plugin (fork) |
| `mksglu/context-mode` | §4.2 hook cross-check | TIER-1 plugin |
| `affaan-m/everything-claude-code` | §4.2 hook cross-check | TIER-1 plugin |
| `OthmanAdi/planning-with-files` (~21.5k) | Pillar 1 §2.2 latest install | TIER-1 plugin |
| `microsoft/PromptWizard` (W291.Stage2) | §2.3 Gap 2 | TIER-2 candidate |
| `Azure/PyRIT` (W291.Stage2) | §2.3 Gap 2 | TIER-3 candidate |

---

**END Stream E foundation audit.**

---

## Post-codex-r1 fix-iterate summary

Codex-r1 unleashed-review of this file produced 14 findings (11 HIGH + 3 MED + 1 LOW) with verdict REVISE
(see `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-CODEX-R1-STREAM-E.md`). All findings have
been classified TRUE-BUG and applied as in-place edits with inline `<!-- codex-r1 fix #N: ... -->` markers;
zero findings classified FALSE-POSITIVE. AMBIGUOUS findings handled per most-conservative interpretation.

### Edits applied (HIGH findings, fixes #1-#11)

1. **Cardinal-rule extension over-reach (Rule 6 promotion)** — `MCP pin discipline` is already a sub-clause of
   Rule 2 at CLAUDE.md:19 in-line. Original recommendation to promote it to a new Rule 6 was over-reach.
   Reclassified to "tighten/validate Rule 2's existing MCP-pin clause" — TL;DR, §6 action #2, §4.6 §4.6
   summary table, §7.1 R-E2, carry-forward summary.
2. **Cardinal-rule extension over-reach (Rule 7 promotion)** — `State-outside-repo` invariant is currently
   VIOLATED by Cognee's `C:/Users/42/.cognee` data-dir. Promoting it before remediation would ratify a
   still-broken state. Reclassified to "track as remediation gate; revisit promotion AFTER migration +
   verification" — TL;DR, §6 action #2, §4.6, §7.1 R-E2, carry-forward.
3. **`langfuse` mis-classified as `Z:/repos/deps` pointer-skill** — verified at `.claude/skills/langfuse/
   SKILL.md:3-14`; body uses `npx`/`bunx` CLI + `WebFetch domain:langfuse.com`, NO `Z:/repos/deps` path
   redirect. Updated all "4 pointer-skills" claims to "3 pointer-skills" (vercel-composition,
   vercel-react, web-design). Langfuse retained as TIER-2-MIRROR KEEP-but-verify (upstream-provenance
   question only, NOT a fresh-clone hazard). Updated §2.1 row #3, §2.1.1 title + verdict, §2.4 roll-up,
   §6 action #3 (title + count + verification step), carry-forward.
4. **`planning-with-files` reported as enabled** — verified at `.claude/settings.json:233` the setting is
   `"planning-with-files@planning-with-files": false`. Reclassified as installed-cache-present BUT DISABLED;
   16 skills are NOT loaded at session start. §2.2 H — explicit "DISABLED" note + deferred-operator-action
   carry-forward.
5. **Hook #3 "PASS — direct upstream-CLI chain" over-claim** — verified at `.claude/settings.json:119-121`
   the command is an inline `bash -c "f=$(jq -r '.tool_input.file_path // ...'); case ..."` that parses
   hook-event JSON via `jq` and dispatches per file-extension to ruff/shellcheck. Reclassified as Rule-2
   PARTIAL boundary case; added new subsection §4.2.1B with 3 remediation options (recommended: split into
   2 per-extension hooks). Updated §4.2 audit table, §4.2 verdict, §6 action #1, commit message, carry-fwd.
6. **`agent-teams` plugin "wraps native primitive" over-claim** — verified at `.claude/plugins/cache/
   claude-code-workflows/agent-teams/1.0.2/commands/team-spawn.md:72-84` the command body is markdown
   instructions telling Claude to "Use the `TeamCreate` tool", "use the `Agent` tool", "Use `TaskCreate`".
   Reclassified §3.1 from "the plugin doesn't replace the native primitive — it wraps it" to "the plugin
   provides slash-command recipes + agent role definitions + skill conveniences that INSTRUCT Claude to
   invoke the native tools — NOT programmatic wrapper code".
7. **`agent-sdk-dev` dismissed as dev-only-correctly-disabled** — Anthropic-Verified plugin per
   `https://claude.com/plugins/agent-sdk-dev:234-261` covers project scaffolding + verification agents for
   SDK usage, type safety, security practices, documentation completeness. Reclassified §5.3 row to
   "DECISION-NEEDED" and added Gap E-X1 in new §5.5 with 3 explicit options (recommended (b): explicit
   disabled-with-rationale).
8. **Anthropic Python SDK dismissed as "author-time only"** — verified at `https://platform.claude.com/docs/
   en/agent-sdk/python:75-88` + `:1032-1045` the SDK exposes SDK-native primitives for subagents
   (`AgentDefinition`), `SdkPluginConfig`, agent skills, hooks, permissions, sessions, `enable_file_
   checkpointing`, custom tools. Reclassified §3.3 row to "parallel runtime surface deserving dedicated
   pattern-parity audit"; added Gap E-X2 in new §5.5.
9. **Microsoft Agent Framework summarized as generic "documentation-agent patterns"** — verified at
   `https://github.com/microsoft/agent-framework/releases:232-242` + `:810-817` the 2026 releases ship an
   experimental skills API (`SkillFrontmatter`) aligned to `agentskills.io`, A2A v1.0 migration, functional
   workflow API, OpenTelemetry integration, checkpoint path-traversal hardening. Reclassified §3.3 row to
   5 concrete pattern-study rows (skills-spec compat, A2A bridge, workflow API, telemetry, checkpoint
   security); added Gap E-X3 in new §5.5.
10. **`anthropic-agent-skills` trust-tier over-claim** — verified at `.claude/plugins/marketplaces/
    anthropic-agent-skills/.claude-plugin/marketplace.json:2-9` the owner is "Keith Lazuka"
    (`klazuka@anthropic.com`) and plugin name at `:24-39` is `example-skills` (explicitly "a collection of
    examples"). Reclassified §2.2 F to "Anthropic-affiliated/example-skills via configured marketplace
    source" — NOT "Anthropic-official" until first-party `anthropics/`-org marketplace URL or signed
    official provenance is cited.
11. **Superpowers sampling cited disabled marketplace variant** — verified at `.claude/settings.json:165`
    `superpowers@claude-plugins-official: true` is the active provenance and `:207`
    `superpowers@superpowers-marketplace: false` is disabled. Updated §2.2 A title to "active provenance:
    `claude-plugins-official`" with inline note that both caches ship the same content but active
    provenance should cite the enabled path.

### Edits applied (MED findings, fixes #12-#13)

12. **"No-scrape" assertion at §4.1** — replaced with dated 2026-MAY findings list citing Anthropic Agent
    SDK Python docs (`https://platform.claude.com/docs/en/agent-sdk/python:75-88`) + Agent SDK Dev plugin
    page (`https://claude.com/plugins/agent-sdk-dev:258-261`). Notes that Anthropic now ships an SDK
    surface alongside the runtime, with parallel-surface implications for the foundation audit.
13. **`deny[]` block not valid JSON** — labelled the block "Plain list excerpt" with inline note that the
    actual JSON array lives at `.claude/settings.json:64-83`. Block content unchanged (still useful as a
    plain-list reference); semantics now match the codex finding requirement.

### Edits applied (LOW finding, fix #14)

14. **§2.4 roll-up axis inconsistency** — reconciled to a single axis = 18 top-level directories under
    `.claude/skills/` per §2.1 inventory at line 131. New table sums to 18 (4 exemplar + 9 clean-port + 1
    TIER-2-MIRROR + 3 SOTA-REFRESH + 1 deprecate); recursive `SKILL.md` count (23 = 16 single + 7
    gitnexus-nested + 0 learned) noted as sub-fact only.

### Cardinal-rule extensions trimmed

Original Stream E proposed promoting **Rule 6 (MCP pin) + Rule 7 (state-outside-repo)** as new cardinal
rules; codex-r1 correctly identified both as over-reach:
- Rule 6 promotion duplicates an existing sub-clause of Rule 2 (MCP pin contract IS at CLAUDE.md:19 in-line).
- Rule 7 promotion ratifies a still-violated invariant (Cognee data-dir).

Both reclassified throughout the file:
- TL;DR (§0) — fixes #1, #2.
- §6 action #2 — full action plan revised.
- §4.6 (`Should the 5 rules be extended?`) — both items reclassified inline + summary table revised.
- §7.1 R-E2 — risk statement revised.
- §7.3 commit message — revised.
- Carry-forward summary — revised.

### External-primitive gaps added

3 new gaps surfaced in new §5.5 `Missing external-primitive gaps`:
- **E-X1 — `agent-sdk-dev` plugin DECISION-NEEDED** (Anthropic-Verified per `https://claude.com/plugins/agent-sdk-dev:234-261`).
- **E-X2 — Anthropic Python SDK foundation-primitive pattern-parity audit MISSING** (`https://platform.claude.com/docs/en/agent-sdk/python:75-88` + `:1032-1045`).
- **E-X3 — Microsoft Agent Framework 2026 foundation primitives MISSING from pattern-study** (`https://github.com/microsoft/agent-framework/releases:232-242` + `:810-817`).

### Net result

VERDICT (post-fixes): foundation-audit conclusions hold directionally but with material adjustments:
(a) **5 cardinal rules NOT 7** — extensions reclassified as Rule 2 tightening + remediation-gate tracking;
(b) **3 pointer-skills NOT 4** — langfuse is NOT a pointer-skill; (c) **1 Rule-2 hook boundary case + 1
LOW provenance-clarity gap** (Hook #1 is upstream-deployed shim NOT self-invent per team-lead verification
2026-05-18; Hook #3 inline-dispatcher remains a Rule-2 boundary case); (d) **3 additional external-primitive
gaps** (agent-sdk-dev decision + Anthropic SDK parity + Microsoft AF 2026 patterns) surfaced as
foundation-layer follow-ups beyond the original TOP-3 next-priorities.

### Team-lead verification update (2026-05-18 — post-codex-r1)

Team-lead directly inspected `.claude/hooks/context-mode-cache-heal.mjs` and verified upstream provenance:
- The file header explicitly states "auto-deployed" + "Fixes anthropics/claude-code#46915".
- Upstream deploy source verified at `.claude/plugins/cache/context-mode/context-mode/1.0.136/hooks/
  cache-heal-utils.mjs` (50+ LOC providing the fwd-path normalization + selfHealCacheHealHook entry point)
  + `start.mjs` (deployment mechanism).
- The non-standard `.claude/hooks/` location is REQUIRED by the bug being patched: CC bug #46915 invalidates
  `CLAUDE_PLUGIN_ROOT` paths under plugin-cache on auto-update; a file under the plugin-cache path would
  itself be wiped by the same bug. The plugin's design deploys this single shim outside the cache to survive.

**Classification update**: original codex-r1 finding for Hook #1 was a PARTIAL FALSE-POSITIVE on the
"self-invent" claim — the file IS upstream-provenanced. The TRUE finding is a LOW provenance-clarity gap
because the upstream-deployment origin is not obvious from the runtime tree alone (a reviewer auditing
`.claude/hooks/` without checking the plugin cache could mis-read it, as Stream E originally did).

**Edits applied for the team-lead update** (search for `team-lead verification 2026-05-18` markers):
- TL;DR §0 — Hook #1 reclassified to upstream-deployed shim + LOW provenance-clarity gap.
- TL;DR action #1 — split into Hook #1 (LOW) + Hook #3 (boundary case).
- §4.2 audit table row #1 — verdict cell updated to "LOW provenance-clarity gap (NOT a violation)".
- §4.2 verdict line — "0 violations + 1 LOW provenance-clarity gap + 1 Rule-2 boundary case".
- §4.2.1 subsection — retitled, content rewritten with verified upstream-deployment provenance + revised
  remediation options (sub-15-min provenance note instead of file relocation).
- §6 action #1 — retitled and split: Hook #1 LOW clarification + Hook #3 boundary-case remediation.
- §7.1 R-E1 — revised to reflect that file must NOT be relocated (relocation would re-introduce CC #46915).
- §7.3 commit message — revised to "clarify Hook #1 upstream-shim provenance" instead of "remediate Hook #1".
- §8 cite trail — added cite rows for upstream `cache-heal-utils.mjs` + `start.mjs` deploy source.
- Carry-forward summary — revised to reflect Hook #1 reclassification.

> Carry-forward summary (REVISED per codex-r1 + team-lead verification 2026-05-18): 3 named next-priorities
> for the W297 micro-wave: (1) **Hook #1 LOW provenance-clarity note** in CLAUDE.md (upstream-deployed shim,
> NOT a CR-2 violation — file must remain in `.claude/hooks/` because relocation would re-introduce CC bug
> #46915) AND Hook #3 inline `bash -c jq…case…esac` dispatcher remediation (§4.2.1B); (2) tighten Rule 2
> MCP-pin clause wording + add state-outside-repo to remediation ledger (NOT new Rule 6/7); (3) fix **3**
> vercel pointer-skills (not 4 — langfuse is NOT a pointer-skill) + delete empty `learned/`. Plus 3 surfaced
> external-primitive gaps (E-X1 agent-sdk-dev decision; E-X2 Anthropic Python SDK pattern-parity; E-X3
> Microsoft Agent Framework 2026 skills/A2A/workflow/telemetry/checkpoint-security pattern-study). Estimated
> total effort: 3 next-priorities < 2 hours; 3 surfaced gaps = future micro-wave scope.
