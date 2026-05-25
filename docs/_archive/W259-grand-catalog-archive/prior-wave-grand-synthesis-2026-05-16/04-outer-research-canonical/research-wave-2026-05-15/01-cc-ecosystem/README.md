# Layer 1: Claude Code Ecosystem Deep-Dive

> See `../05-grand-catalog/GRAND_CATALOG_2026-05-15.md` Sections 1 + 2 + 3 + 4 + 10 for full per-repo dimensional scoring.

## ADOPT-NOW picks (8)

1. **anthropics/claude-plugins-official** (98) — canonical marketplace; mandatory substrate
2. **anthropics/skills** (135k★ — 97) — Anthropic-official skill publication repo
3. **anthropics/cwc-long-running-agents** (93) — 5 canonical primitives (Default-FAIL + Fresh-context evaluator + PROGRESS.md + Kill-switch + Steer-mid-run)
4. **anthropics/claude-agent-sdk-python** (95) — required substrate for in-process MCPs + hooks + ClaudeSDKClient
5. **obra/superpowers** (171k★ — 96) — TDD + 7-phase methodology + 8 harness cross-compat
6. **wshobson/agents** (35k★ — 94, granular only) — 80 plugins; install `python-development` + `agent-teams` + `conductor` (verify HARD-GATE) + `comprehensive-review`
7. **addyosmani/agent-skills** (42k★ — 93) — engineering-lifecycle workflow + anti-rationalization tables
8. **anthropics/claude-plugins-official `plugins/ralph-loop`** (92) — canonical autonomous-loop primitive

## STUDY-PILOT-FAVORABLE picks (10+)

- **shanraisshan/claude-code-best-practice** (53k★ — 84) — Boris-style methodology reference (cite-only)
- **gsd-build/get-shit-done** (62k★ — 78) — meta-prompting + context-engineering + spec-driven dev
- **garrytan/gstack** — codex-companion patterns (named-T1 Garry Tan; cited at sibling for Pattern-B mitigation)
- **affaan-m/everything-claude-code** (183k★ — 88) — broadest pattern library; cherry-pick
- **EveryInc/compound-engineering-plugin** — Q2 2026 NEW
- **alirezarezvani/claude-skills** (15k★ — 76) — 263+ skills with maintainer self-audit (POWERFUL/SOLID/GENERIC/WEAK grading)
- **K-Dense-AI/scientific-agent-skills** (22k★ — 78) — research/science/engineering skills
- **OthmanAdi/planning-with-files** (21k★ — 72) — Manus-style markdown planning
- **davila7/claude-code-templates** (27k★ — 76) — CC config templates + monitoring CLI
- **github/spec-kit** (78) — GitHub-official spec-driven dev

## Discovery aggregators (cite-only)

- ComposioHQ/awesome-claude-skills (60k★, CC-BY-NC-ND-4.0)
- hesreallyhim/awesome-claude-code (44k★)
- VoltAgent/awesome-agent-skills (22k★)
- sickn33/antigravity-awesome-skills (38k★) — has installer CLI (verify before bulk)
- rohitg00/awesome-claude-code-toolkit (1.7k★) — curated 176+ plugins
- davepoon/buildwithclaude (2.9k★) — multi-runtime hub

## Operator UI options

- **farion1231/cc-switch** (72k★) — Tauri/Rust cross-platform all-in-one
- **CherryHQ/cherry-studio** (46k★) — AI productivity studio (broader than CC)
- **iOfficeAI/AionUi** (25k★) — local-first cowork for 20+ CLIs
- **smtg-ai/claude-squad** — tmux+worktree (NOT supported on Windows-native per FM-04)
- **ComposioHQ/agent-orchestrator** — DAG mission dispatch (macOS-focused)

## Key convergence findings

1. **3-way orchestration methodology** (superpowers + wshobson + addy-osmani) = 4 distinct authoring orgs satisfying Axis-1 ≥3 PASS firm.
2. **superpowers wins for methodology depth** (TDD + 7-phase mandatory). wshobson wins for breadth + granularity. addy-osmani wins for engineering-lifecycle anti-rationalization.
3. **wshobson Q2 2026 NEW** introduces PluginEval + Agent Teams + Conductor. **Conductor specifically has HARD-GATE setup risk** per Wave 138 Fire 1 prior catch — verify Probe 5 mode-harness-shape before install.
4. **Marketplaces are NOT install candidates** — install granularly. Discovery aggregators are cite-only surfaces.
5. **Anthropic-canonical chain** beats community alternatives in convergence-gate provenance — claude-plugins-official is the only Anthropic-blessed marketplace.

See Grand Catalog Sections 1-4 + 10 for full dimensional scoring.
