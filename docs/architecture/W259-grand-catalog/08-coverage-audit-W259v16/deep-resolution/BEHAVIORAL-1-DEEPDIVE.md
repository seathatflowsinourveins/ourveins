# W259-v16 MAX-DEPTH Gap Resolution — Behavioral/Ecosystem Layer (Batch 1)

> **Scope**: 3 CC behavioral/ecosystem-layer coverage-audit gap repos, deep-dived to definitive evidence-backed resolution via primary source (repomix + GitHub MCP + DeepWiki). Each repo's W259-v16 QUICK disposition (`08-coverage-audit-W259v16/BEHAVIORAL-ECOSYSTEM-COVERAGE.md §c`) is **confirmed or revised** with hard evidence.
> **Date**: 2026-05-17 · **Wave**: W259-v16 deep-resolution · **Method**: source tree read (not README claims) — `mcp__github__get_file_contents` on LICENSE / plugin.json / marketplace.json / SKILL.md / hooks / commands / agents + `mcp__deepwiki__ask_question` architecture probe.
> **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 — composes TIER-1-DIRECT GitHub API live source (commit-pinned SHAs below) + W259 incumbent catalog.
> **Runtime-fit frame**: Windows 11 Z:-portable single-operator CC runtime; 42 plugins installed (obra/superpowers full behavioral set + wshobson/agents + agent-teams + karpathy-guidelines; `gsd-goal-verifier` agent already installed). Cardinal rule: **no `.claude/rules/*.md` self-invent** — a repo depending on a `.claude/rules/` pattern is a poor fit. A behavioral repo earns INSTALL-NOW only if it adds discipline the 42 installed plugins do not already cover.

---

## Repo 1 — `gsd-build/get-shit-done` (62,605★) — **operator-named, deepest dive**

**Source pin**: commit `ae63cbe557e97b0638a277b42ce26d9cdc8180cf` (default branch `main`). npm pkg `get-shit-done-cc` v`1.50.0-canary.0`. Created 2025-12-14, pushed 2026-05-17 (live-active). 60 open issues, 5,320 forks. Language JavaScript (CommonJS root + TypeScript `sdk/`).

### Source-verified capabilities (read from tree, not README)

GSD ("Get Shit Done", by "TÂCHES" / Lex Christopherson) is **not a thin SDD template — it is a heavyweight, genuinely-engineered meta-prompting + context-engineering + spec-driven-development system**. Source evidence:

- **~71 slash commands** under `commands/gsd/` (verified file listing): the six-command core loop (`new-project`, `discuss-phase`, `plan-phase`, `execute-phase`, `verify-work`, `ship`) plus `autonomous`, `ultraplan-phase`, `map-codebase`, `ingest-docs`, `forensics`, `graphify`, `spike`, `sketch`, `secure-phase`, `complete-milestone`, `workstreams`, and a two-stage hierarchical `ns-*` namespace-router (`ns-workflow`, `ns-project`, `ns-context`, `ns-ideate`, `ns-manage`, `ns-review`) explicitly built "to reduce the token cost of the eager skill listing."
- **35 specialized subagents** under `agents/gsd-*.md` (verified count): researchers, synthesizers, planners (`gsd-planner.md` = 49KB), checkers, executors (`gsd-executor.md` = 35KB), verifiers, debuggers (`gsd-debugger.md` = 47KB), auditors. The thin-orchestrator pattern is real and source-confirmed: `execute-phase.md` declares `Context budget: ~15% orchestrator, 100% fresh per subagent` and `autonomous.md` carries `allowed-tools: [..., Agent]` — commands spawn fresh-context subagents.
- **`gsd-verifier.md` is a 35KB adversarial goal-backward verification spec** — this is the standout artifact. It mandates a **4-level artifact verification** (exists → substantive → wired → data-flows), explicit stub-detection grep patterns (React/API/wiring red-flags), `probe-*.sh` execution with exit-code contract, a `gaps:`/`overrides:` YAML-frontmatter protocol feeding `/gsd:plan-phase --gaps`, and an "adversarial FORCE stance" ("assume the phase goal was not achieved until codebase evidence proves it"). This is materially more rigorous than a generic "verify" command.
- **File-based state** in a `.planning/` directory: `PROJECT.md` / `REQUIREMENTS.md` / `ROADMAP.md` / `STATE.md` / `CONTEXT.md` + per-phase `PLAN.md` / `SUMMARY.md` / `VERIFICATION.md`. Survives context resets — the context-engineering core.
- Ships a TypeScript SDK (`sdk/`, `gsd-sdk query` verb surface) and 13 `hooks/` files (JS + sh).

### Native-CC pathway (TYPE — verified)

**CLI installer, NOT a plugin.json marketplace.** `package.json` `bin` exposes `get-shit-done-cc` → `bin/install.js` (a 476KB installer). `npx get-shit-done-cc@latest` detects the runtime and **copies files in**. For Claude Code the install target is **`~/.claude/skills/gsd-*/`** (README "Troubleshooting" + DeepWiki both confirm — commands install as **skills**, plus `agents/` and `hooks/`). There is **no `.claude-plugin/` directory and no `plugin.json`** in the tree — GSD is explicitly *not* a CC plugin-marketplace entry; it is a multi-runtime (Claude Code, Codex, Gemini, Cursor, Windsurf, OpenCode, Kilo, Copilot — 15 runtimes) file-copy installer.

- **Hooks**: registered into the runtime's `settings.json` by the installer (not free-standing `.claude/hooks/scripts`). Verified hook `gsd-workflow-guard.js` is a **soft PreToolUse advisory** — `config.hooks.workflow_guard` defaults **false**, fails silent, never blocks. `gsd-statusline.js` binds the `statusLine` event. So GSD's hooks are upstream-plugin-style settings.json entries, default-off — *not* the cardinal-rule-2-violating self-invent class.
- **`.claude/rules/` dependency — NONE.** DeepWiki confirmed and source-verified: GSD uses `.planning/` for all state; it has a `.clinerules` file (for the *Cline* runtime only) but **no `.claude/rules/`** pathway. `gsd-verifier.md` references loading a project's own `rules/*.md` *if the host project has them* — it does not create them. **GSD does not violate cardinal-rule-4.**

### License / Windows / maintenance

- **License**: **MIT** (verified `LICENSE` file — "Copyright (c) 2025 Lex Christopherson"; `package.json` `"license": "MIT"`). Clean — no blocker.
- **Windows-compat**: **explicitly supported** — README "Works on Mac, Windows, and Linux"; documents `CLAUDE_CONFIG_DIR` for container/tilde-expansion edge cases. Installer is Node `>=22`. Good Z:-portable fit on that axis.
- **Maintenance**: very high velocity — pushed same-day as audit, 196KB CHANGELOG, Conventional Commits, changesets, CodeRabbit, GitHub Actions test workflow, 70% coverage gate. Healthy single-maintainer-led OSS project.
- **Provenance caveat (TIER-1-DIRECT, README)**: the repo markets a **`$GSD` Solana memecoin** (Dexscreener badge, `gsd_foundation` X account). The *code* is MIT and clean; the *project* is crypto-token-attached. For a disciplined install runtime this is a soft negative signal (token-driven star inflation; governance risk) but not a code-licensing blocker. Installer also runs `secret-scan.sh` / `base64-scan.sh` / `prompt-injection-scan.sh` — security-aware.

### Duplication vs installed stack

GSD's core loop overlaps a **lot** of already-installed surface: `superpowers` (writing-plans, subagent-driven-development, verification-before-completion, brainstorming, TDD), `wshobson/agents`, `feature-dev`, `speckit-*` skills, `github/spec-kit` (catalogued row 52), `gotalab/cc-sdd` (W259v14 §1.11). The runtime *already* has `gsd-goal-verifier` as an installed agent — i.e. the GSD goal-backward-verification *idea* is partially present. GSD is the most complete single packaging of SDD+context-engineering, but it is a **whole-workflow opinionated harness** that wants to own the project lifecycle (`.planning/` dir, `--dangerously-skip-permissions`, its own statusline). Installing it whole would *collide* with the runtime's existing wave-doc discipline, `context_window_statusline.sh`, and intelligent-compact stack rather than compose with them.

### DEFINITIVE RESOLUTION — `get-shit-done`: **CITE-PATTERN** (revised UP from QUICK "GENUINE GAP / STUDY-PILOT-border ≈78", revised within the same non-install band — **NOT an INSTALL-grade surprise**)

The QUICK pass scored it ≈78 "T2/T3 border, GENUINE GAP, low install-priority." **Deep-dive confirms the GAP is genuine and the disposition is correctly non-install — but sharpens *why*: CITE-PATTERN, not STUDY-PILOT.** Evidence-backed reasoning:

- **What deep-dive found that raises it**: GSD is substantively better-engineered than its README "light-weight" framing suggests. `gsd-verifier.md`'s 4-level (exists/substantive/wired/data-flows) goal-backward verification + stub-grep catalogue + probe-exit-code contract + `gaps:`/`overrides:` frontmatter protocol is a **genuinely SOTA verification pattern** — directly relevant to this runtime's ship-gate discipline and worth *studying and porting the pattern* into how the runtime's own verification skills + `gsd-goal-verifier` agent operate. Same for the thin-orchestrator `~15% orchestrator / 100% fresh subagent` budget rule and the `ns-*` two-stage namespace-router (a real token-cost mitigation for large skill surfaces).
- **What keeps it non-install**: (1) whole-harness collision — GSD wants to *own* the lifecycle (`.planning/`, its own statusline, skip-permissions default) and would fight the installed superpowers + agent-teams + context-mode stack, not extend it; (2) heavy overlap — every GSD core capability maps to an already-installed plugin; (3) the `$GSD` memecoin attachment is a governance/longevity smell inappropriate for a canonical baseline runtime; (4) it installs as `~/.claude/skills/gsd-*` file-copy, not a clean plugin-marketplace entry — harder to manage/uninstall under the runtime's plugin-manifest discipline.
- **Verdict**: **CITE-PATTERN** — add a catalog row (L2/L6, composite **≈80**, "T3 CITE-PATTERN — SDD + meta-prompting system; the *patterns* to harvest are gsd-verifier's 4-level goal-backward verification, the thin-orchestrator context-budget rule, and the ns-* namespace router; do NOT install whole — collides with installed superpowers/agent-teams/context-mode + `$GSD` memecoin governance smell"). **Not INSTALL-grade.** A future wave *may* STUDY-PILOT a single extracted artifact (the verifier pattern) but the whole system is a study target, not an install.

---

## Repo 2 — `ComposioHQ/awesome-claude-skills` (60,166★) — discovery-feed gap

**Source pin**: commit `f2b5e29bc315f04c8e09591ba275f4c4f7d4b8fe` (default branch `master`). Created 2025-10-17, pushed 2026-05-07 (README updated 2026-05-17). 640 open issues, 6,549 forks. Language Python.

### Source-verified capabilities (read from tree, not README)

The QUICK pass called it "awesome-list / discovery feed." **Deep-dive revises that: it is a hybrid — an awesome-list README PLUS an in-repo skills/plugins monorepo.** Source evidence:

- The repo root contains **~35 actual skill directories** with real content (verified tree): `artifacts-builder/`, `brand-guidelines/`, `canvas-design/`, `mcp-builder/`, `skill-creator/`, `theme-factory/`, `webapp-testing/`, `slack-gif-creator/`, `internal-comms/`, `changelog-generator/`, plus ~25 `*-automation/` skills (Composio app-automation: Gmail, Slack, Jira, Notion, GitHub, Stripe…) and `connect-apps-plugin/` (a real CC plugin dir).
- **Verified provenance of the in-repo skills**: they are **vendored copies of Anthropic's official skills** — `mcp-builder/SKILL.md` (13.5KB) is the Anthropic mcp-builder skill; `artifacts-builder` / `brand-guidelines` / `canvas-design` / `skill-creator` / `slack-gif-creator` / `theme-factory` / `webapp-testing` are the Anthropic `example-skills` set (the runtime **already has these installed** via `example-skills@anthropic-agent-skills`). The `*-automation/` skills are Composio's own Rube-MCP workflow skills.
- The README itself is a large curated index ("1000+ skills/plugins") spanning Document Processing → Security, organized by category, linking out to ~120 external skill repos (including obra/superpowers skills, `yusufkaraaslan/Skill_Seekers`, `OthmanAdi/langsmith-fetch`).

### Native-CC pathway (TYPE — verified)

**Mixed.** (1) As a *list* — README is a discovery index, no CC pathway (D11≈0). (2) As a *monorepo* — the in-repo `*/SKILL.md` directories ARE native CC skills (install per README via `cp -r skill-name ~/.config/claude-code/skills/`), and `connect-apps-plugin/` is a native CC plugin (`claude --plugin-dir ./connect-apps-plugin`). But the install instructions are manual file-copy — there is **no top-level `.claude-plugin/marketplace.json`**, so it is *not* a one-command CC marketplace.

### License / Windows / maintenance

- **License**: **Apache-2.0** at the repo level (verified README "This repository is licensed under the Apache License 2.0"). **Critical caveat — per-skill licenses differ**: `mcp-builder/` ships its own `LICENSE.txt` (11KB — Anthropic's license for the vendored skill). README explicitly warns "Individual skills may have different licenses — please check each skill's folder." So this is **not a clean single-license repo**; any adoption must license-check the specific subdirectory. (No repo-root `LICENSE` file was found in the tree — only the README assertion + per-skill `LICENSE.txt` files.)
- **Windows-compat**: skill content is markdown (portable); install is `cp -r` (trivial on any OS). The `connect-apps-plugin` requires a Composio API key + network. No Windows blocker for the skill content itself.
- **Maintenance**: high — pushed within days of audit, org-maintained, 6.5k forks, active PR flow ("PRs welcome").

### Duplication vs installed stack

**Heavy and direct.** The repo's in-repo skills are *the Anthropic example-skills set the runtime already has installed* (`example-skills@anthropic-agent-skills`) plus `mcp-builder` / `skill-creator` (the runtime already has `skill-creator` + `mcp-server-dev` plugins). The `*-automation/` skills duplicate functionality the runtime would get from MCP servers, not skills. As a *discovery list* it overlaps the already-catalogued `VoltAgent/awesome-agent-skills` (W259v14 §1.9, the catalog's *preferred* feed) and `hesreallyhim/awesome-claude-code` (§1.3).

### DEFINITIVE RESOLUTION — `ComposioHQ/awesome-claude-skills`: **CITE-PATTERN (discovery-feed only)** — QUICK disposition **CONFIRMED** (QUICK said "GENUINE GAP, discovery-feed only, ≈73, non-installable")

Deep-dive **confirms** the QUICK verdict and adds precision:

- It IS a genuine catalog-coverage hole — the largest org-maintained CC-skills awesome-list not yet catalogued (60k★, Composio is a funded org with cleaner provenance than the ND-licensed `hesreallyhim` list).
- But it is **not an install target**: the in-repo skills are vendored Anthropic skills the runtime *already has*; the value is the *index* (finding external skill repos), making it a peer to — and arguably weaker than — the already-catalogued `VoltAgent/awesome-agent-skills`. The Apache-2.0-with-per-skill-exceptions licensing also makes whole-repo adoption messy.
- **Verdict**: **CITE-PATTERN / discovery-feed** — add an appendix row (L8 directory, composite **≈73**, "T3 — org-maintained CC-skills discovery feed; hybrid list+monorepo but in-repo skills are vendored Anthropic example-skills already installed; peer to VoltAgent's list; Apache-2.0 + per-skill-license caveat — never adopt whole-repo, license-check any specific subdir"). Discovery-feed gap, **not** a capability gap, **not** an install.

---

## Repo 3 — `jarrodwatts/claude-hud` (22,961★) — observability plugin gap

**Source pin**: commit `6f7d07323c5615afc08771cebc22073e8c04a946` (default branch `main`). Created 2026-01-02, pushed 2026-05-16 (live-active). 20 open issues, 1,030 forks. Language JavaScript/TypeScript.

### Source-verified capabilities (read from tree, not README)

`claude-hud` is a **focused, single-purpose Claude Code statusline/HUD plugin**. Source evidence:

- It uses **Claude Code's native `statusLine` API** — stdin JSON → `claude-hud` → stdout, refreshes ~300ms. No tmux, no separate window, no extra process. It also parses the session transcript JSONL for tool/agent/todo activity.
- Renders, in expanded mode: model + provider label, project path (1–3 dir levels), git branch/dirty/ahead-behind/file-stats, a **context-health bar** (green→yellow→red), Claude **subscriber rate-limit usage** bars (5h + 7d windows), and optional lines for **tool activity, running subagents, and todo progress**. Configurable via `/claude-hud:configure` with Full/Essential/Minimal presets and an extensive `config.json` (~60 documented options).
- Source tree (verified): `src/` + `dist/` (built JS), `commands/setup.md` + `commands/configure.md`, `tests/`, `tsconfig.json`. Real test suite (`TESTING.md`, `npm test`).
- Explicitly **1M-context-aware**: README — "Scales with Claude Code's reported context window size, including newer 1M-context sessions."

### Native-CC pathway (TYPE — verified)

**Proper CC plugin-marketplace plugin — the cleanest pathway of the three repos.** Verified:

- `.claude-plugin/plugin.json` present — `{"name":"claude-hud","version":"0.1.0","commands":["./commands/setup.md","./commands/configure.md"],"license":"MIT"}`.
- `.claude-plugin/marketplace.json` present — installable directly via `/plugin marketplace add jarrodwatts/claude-hud` → `/plugin install claude-hud`. **This is a one-command CC marketplace install**, fully aligned with cardinal-rule-1 (install primitives from trusted plugins) and the runtime's plugin-manifest discipline.
- Mechanism is the documented native `statusLine` settings entry — **no self-invent hooks, no `.claude/rules/`**. `/claude-hud:setup` writes the `statusLine` config. Cardinal-rule-2 and -4 clean.

### License / Windows / maintenance

- **License**: **MIT** (verified `LICENSE` file — "Copyright (c) 2026 Jarrod Watts"; `plugin.json` `"license":"MIT"`). Clean — no blocker.
- **Windows-compat**: **explicitly supported with a documented Windows path** — README has a dedicated Windows note ("Node.js LTS is the supported runtime… `winget install OpenJS.NodeJS.LTS`… full Claude Code restart after setup"). Requirements: CC v1.0.80+, Windows → Node 18+. Strong Z:-portable fit. (The README's `EXDEV` note is a *Linux*-only `/tmp` caveat — irrelevant on Windows.)
- **Maintenance**: high velocity — pushed one day before audit, 12.6KB CHANGELOG, CONTRIBUTING/SECURITY/CODE_OF_CONDUCT/MAINTAINERS files, GitHub Actions, real test suite. Indie single-maintainer (also ships `claude-stt`) but professionally run. No crypto attachment.

### Duplication vs installed stack

**Partial overlap, with genuine net-new.** The runtime already runs `context_window_statusline.sh` (the official `statusLine` command per CLAUDE.md "Status" section) + `context-mode` + `intelligent-compact` for context-budget tracking. `claude-hud` *is* a statusline, so it overlaps the *context-bar* function. **But** it adds visibility the current statusline does not have: live **running-subagent tracking**, **todo-progress**, **tool-activity** lines, and subscriber rate-limit (5h/7d) bars — directly useful for a 1M-context autonomous-`/loop` runtime that fans out subagents and agent-teams. The matrix has **no CC-observability/statusline plugin row at all** — a real, if small, coverage hole. It is a *replacement candidate* for `context_window_statusline.sh`, not an additive install (CC has one `statusLine` slot).

### DEFINITIVE RESOLUTION — `claude-hud`: **STUDY-PILOT** (QUICK said "GENUINE GAP, T2 STUDY-PILOT, ≈75, low pilot") — **CONFIRMED, and it is the strongest of the three** (a clean, low-risk pilot — flagged as the batch's best-fit candidate, though still NOT a blind INSTALL-NOW)

Deep-dive **confirms** the QUICK STUDY-PILOT verdict and strengthens the evidence:

- **Why it is genuinely pilot-worthy**: it is the *only* one of the three repos that is a clean native CC plugin-marketplace plugin (`.claude-plugin/plugin.json` + `marketplace.json`, one-command install, MIT, no self-invent hooks, no `.claude/rules/`, explicit Windows support, 1M-context-aware). It adds real net-new observability (running-subagent + todo + tool-activity + rate-limit) that the runtime's current `context_window_statusline.sh` lacks — and that visibility is *especially* valuable for this runtime's subagent/agent-teams fan-out and long-arc `/loop` posture.
- **Why STUDY-PILOT and not INSTALL-NOW**: CC exposes a **single `statusLine` slot**. Installing `claude-hud` means *replacing* the runtime's current official `context_window_statusline.sh` — a deliberate swap, not an additive install. That swap must be operator-decided and piloted (verify the HUD renders correctly under the Z:-portable Windows config, verify it does not fight `context-mode`/`intelligent-compact`, confirm the subscriber-usage bars work on the operator's plan). It is low-risk and reversible (`/plugin uninstall` + restore the old statusLine command) — exactly a STUDY-PILOT, not a blind INSTALL.
- **Verdict**: **STUDY-PILOT** — add a catalog row (L2 plugin, composite **≈77**, "T2 STUDY-PILOT — native CC HUD/statusline plugin; MIT; clean plugin.json+marketplace.json one-command install; Windows-supported; 1M-context-aware; pilot as a *replacement* for `context_window_statusline.sh` — adds running-subagent + todo + tool-activity + rate-limit visibility; verify no conflict with context-mode/intelligent-compact before adopting"). **The batch's best-fit repo and a recommended near-term pilot — but a deliberate operator-decided statusLine swap, not an unconditional INSTALL-NOW.**

---

## Batch summary

| Repo | Stars | CC-pathway TYPE (verified) | License (verified) | Windows | QUICK disposition | **DEEP resolution** | Composite |
|---|---:|---|---|:--:|---|---|---:|
| `gsd-build/get-shit-done` | 62,605 | CLI installer → `~/.claude/skills/gsd-*` (NOT plugin.json); settings.json hooks (soft, default-off); `.planning/` state (no `.claude/rules/`) | **MIT** | Yes (explicit) | GENUINE GAP, STUDY-PILOT-border ≈78 | **CITE-PATTERN** ≈80 — harvest gsd-verifier 4-level verification + thin-orchestrator budget + ns-router; do NOT install whole (harness collision + `$GSD` memecoin smell) | ≈80 |
| `ComposioHQ/awesome-claude-skills` | 60,166 | hybrid: list (no pathway) + in-repo `SKILL.md` monorepo (manual `cp -r`); no top-level marketplace.json | **Apache-2.0** repo-level, **per-skill licenses differ** | Yes (markdown) | GENUINE GAP, discovery-feed ≈73 | **CITE-PATTERN / discovery-feed** ≈73 — confirmed; in-repo skills are vendored Anthropic skills already installed; license-check any subdir | ≈73 |
| `jarrodwatts/claude-hud` | 22,961 | proper CC plugin — `.claude-plugin/plugin.json` + `marketplace.json`, one-command install; native `statusLine` API; no self-invent | **MIT** | Yes (explicit, documented winget path) | GENUINE GAP, STUDY-PILOT ≈75 | **STUDY-PILOT** ≈77 — confirmed; batch's strongest fit; pilot as a deliberate `context_window_statusline.sh` replacement | ≈77 |

**INSTALL-grade surprises**: **NONE.** Per the operator's flag-request — `get-shit-done` specifically did **not** deep-dive as INSTALL-grade. It deep-dives as a *better-engineered system than its README implies* (the `gsd-verifier` 4-level goal-backward verification is genuinely SOTA), but it remains correctly **non-install**: it is a whole-lifecycle harness that would collide with the runtime's installed superpowers + agent-teams + context-mode stack, it overlaps heavily with already-installed plugins, and it carries a `$GSD` Solana-memecoin governance smell inappropriate for a canonical baseline. Resolution moves it from QUICK "GAP/STUDY-border" to **CITE-PATTERN** (study + port the patterns, do not install).

**Net catalog action**: all 3 remain genuine catalog-completeness holes (add 3 rows to `MASTER-SCORING-MATRIX-W259.md`); **0 require a hard install**; **1 (`claude-hud`) is a recommended near-term STUDY-PILOT** as a deliberate, reversible statusLine swap. No QUICK disposition was wrong — two were *sharpened* (`get-shit-done` GAP→CITE-PATTERN; `claude-hud` ≈75→≈77 with stronger evidence) and one (`ComposioHQ`) was *confirmed verbatim*.

---

**Artifact**: `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\08-coverage-audit-W259v16\deep-resolution\BEHAVIORAL-1-DEEPDIVE.md`
