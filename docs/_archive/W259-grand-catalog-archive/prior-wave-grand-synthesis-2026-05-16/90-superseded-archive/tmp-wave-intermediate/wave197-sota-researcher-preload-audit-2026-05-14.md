---
title: W197 P1 — Session-preload reduction audit (64 rules paths: narrowing)
status: AUTHORITATIVE
date: 2026-05-14
agent: sota-researcher
wave: 197
fire: 1
persisted-by: orchestrator (FM-19 ARTIFACT-INLINE persist)
codex-convergence: APPROVE conf=0.84 (Path P real GPT-5.5, .claude/state/codex_consult_w197_preload_mechanism_OUT.txt + bg task bxqohvw69)
---

# W197 P1 — Session-Preload Reduction Audit

**Verdict in one line**: The 28.2% cold-load is NOT a `.claude/rules/**` self-ref glob (refuted by orchestrator + confirmed here — zero such literal glob). The real driver is that **44 of 64 rules carry a startup-always-active glob** (`CLAUDE*.md` / `CLAUDE.md` / `CLAUDE.local.md` / `.claude/settings.json` / `.mcp.json`) — these files load at session start per CCBP ancestor-loading, so every rule globbing them ALSO loads. Narrowing those globs (MOVE-not-DELETE) drops an estimated **~19 rules out of the preload set** → projected preload ~14-16%, beating the ≤17% target.

## CODEX CONVERGENCE NOTE (orchestrator, post-audit)
codex Path P (real GPT-5.5) verdict: **APPROVE conf=0.84**, `q2_fix_approved=true`. codex `narrowing_rule` matches this audit's taxonomy. CAVEAT — `needs_empirical_test=true`: `CLAUDE.md`/`CLAUDE.local.md` startup-active is CONFIRMED; `.claude/settings.json`/`.mcp.json` startup-activation is UNDOCUMENTED. Disposition: apply this table as-is (the per-rule judgment — strip where not-legitimate, keep where legitimate — is correct regardless of settings.json startup-status); the fresh-session preload re-measurement IS the empirical test codex requested. If post-ship preload is not ≤17%, the settings.json hypothesis gets a follow-up tightening.

---

## 1. MECHANISM — VERIFIED

CCBP authority — `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md` @ HEAD `48f2cebeb88b389b27231c418ceadb65baf813fd`:
- `:36` — ancestor CLAUDE.md walk loads "immediately at startup"
- `:40` — subdirectory CLAUDE.md "NOT loaded at launch ... lazy loading"
- `:91` — "Ancestors always load at startup"
- `:93` — "Descendants load lazily"
- `:105` — lazy loading "avoids loading potentially hundreds of kilobytes of irrelevant instructions at startup"

CC's `paths:` frontmatter on a rule file is the same lazy-load primitive applied to rule files — a rule injects only when a file Claude touches matches its `paths:` glob. Orchestrator PROVEN: Read of `.claude/settings.json` injected exactly the 5 rules globbing it. Cross-confirmed by `sessionstart-preload-discipline.md:11` citing the same `claude-memory.md:30-40` anchor.

### Startup-always-active file set (this runtime)
| File | Startup-active? | Why |
|---|---|---|
| `CLAUDE.md` | YES (confirmed) | ancestor / cwd root — claude-memory.md:68 |
| `CLAUDE.local.md` | YES (confirmed) | personal-prefs memory — claude-memory.md:113; injected this session |
| `.claude/settings.json` | UNDOCUMENTED (codex needs_empirical_test) | CC reads at startup to wire hooks — orchestrator proved mid-session Read triggers it, NOT proven startup-active |
| `.mcp.json` | UNDOCUMENTED (codex needs_empirical_test) | CC reads at startup to wire MCPs |
| `MEMORY.md` / `.claude/projects/*/memory/MEMORY.md` | YES | ancestor — sessionstart-preload-discipline.md:28 |
| Glob `CLAUDE*.md` | YES — matches BOTH CLAUDE.md AND CLAUDE.local.md | broadest single preload trigger |

Non-preloading (genuinely task-specific): `.claude/agents/**`, `.claude/skills/**`, `.claude/commands/**`, `.claude/hooks/**`, `.claude/rules/<specific>.md`, `.claude/state/*`, `docs/**`, `reports/**`, `scripts/**`, `tools/**`, `tests/**`, `evals/**`, `tmp/**`, `*.toml`, `.gitignore`, `manifests/*`, `bin/**`. CAVEAT: `.claude/rules/*.md` (deprecation-discipline) + `docs/**` are "task-broad" — re-bloat fast during rule-editing work.

Mechanism is startup-file-match, NOT post-compact carryover. `paths:` narrowing directly helps.

## 2. PER-RULE NARROWING TABLE

STRIP = drop all startup globs. KEEP-narrow = drop some, keep ≥1 legit. LEGITIMATE-KEEP = retain startup trigger. ADD = currently always-load, add a `paths:` block.

| # | Rule | Action | RECOMMENDED narrowed `paths:` |
|---|---|---|---|
| 1 | advanced-agent-team-standing-directive | STRIP | `[".claude/agents/**", ".claude/skills/**/SKILL.md", ".claude/commands/**", "tmp/wave**"]` |
| 6 | audit-action-loop | STRIP | `[".claude/state/*.jsonl", ".claude/projects/*/memory/MEMORY.md", ".claude/hooks/scripts/*_audit.py", "scripts/*_audit.py"]` |
| 7 | auto-compact-discipline | KEEP-narrow | `["MEMORY.md", ".claude/hooks/scripts/*compact*", ".claude/hooks/scripts/precompact*", ".claude/hooks/scripts/sessionstart*", ".claude/projects/*/memory/**", "tmp/**", ".claude/rules/auto-compact-discipline.md"]` |
| 14 | cmc-env-funneled-disclosure | STRIP | `[".claude/agents/**", ".claude/commands/**", ".claude/skills/**/SKILL.md", ".claude/state/codex_consult_*.txt", ".claude/state/codex_review_HEAD_*.txt"]` |
| 15 | cmc-t1-t7-lifecycle | STRIP | `[".claude/agents/**", ".claude/commands/**", ".claude/skills/**/SKILL.md", ".claude/state/codex_consult_*.txt", ".claude/state/codex_review_HEAD_*.txt", ".claude/hooks/scripts/codex_*.py"]` |
| 16 | cmc-verdict-shapes | STRIP | `[".claude/agents/**", ".claude/commands/**", ".claude/skills/**/SKILL.md", ".claude/state/codex_consult_*.txt", ".claude/state/codex_review_HEAD_*.txt", "evals/**"]` |
| 19 | codex-t1-pattern-b-forward-discipline | STRIP | `[".claude/state/codex_consult_*.txt", ".claude/rules/codex-t1-*.md", ".claude/rules/ctff-*.md", ".claude/rules/cardinal-rule-*.md", ".claude/rules/codification-threshold.md", ".claude/rules/citation-discipline.md", ".claude/agents/**", ".claude/skills/**/SKILL.md", "docs/codex-*"]` |
| 29 | deprecation-discipline | STRIP | `["docs/sota-installed-manifest.md", "docs/install-provenance.md", ".claude/plugins/installed_plugins.json", ".claude/agents/**", ".claude/commands/**", ".claude/skills/**/SKILL.md", ".claude/hooks/**", "scripts/**", "tools/**"]` |
| 31 | fm17-subagent-fleet-depletion | STRIP | `[".claude/agents/**", ".claude/state/subagent_*.jsonl", ".claude/state/agent_*.jsonl", ".claude/rules/fm*.md"]` |
| 36 | git-cli-grammar-discipline | STRIP | `[".claude/rules/git-*.md", ".claude/hooks/scripts/*.py", ".claude/agents/**", "tmp/*.txt", "tmp/*-msg.txt"]` |
| 37 | karpathy-adapted | STRIP | `[".claude/agents/**", ".claude/commands/**", ".claude/hooks/**", ".claude/skills/**", "scripts/**", "tests/**", "evals/**", ".claude/rules/karpathy-adapted.md"]` |
| 38 | kiss-dry-yagni | STRIP | `["scripts/**", "tools/**", "tests/**", "evals/**", ".claude/agents/**", ".claude/commands/**", ".claude/hooks/**", ".claude/skills/**"]` |
| 39 | launch-discipline | KEEP-narrow | `["tools/**", "bin/**", "scripts/**", "deploy/**", "ci/**", ".claude/agents/**", ".claude/commands/**", ".claude/rules/launch-discipline.md"]` |
| 40 | layered-gates-architecture | STRIP | `[".claude/hooks/scripts/**", ".claude/agents/**", ".codex/config.toml", ".claude/rules/lga-*.md"]` |
| 41 | lga-async-rewake | STRIP | `[".claude/hooks/scripts/*async*.py", ".claude/hooks/scripts/**", ".claude/rules/lga-async-rewake.md"]` |
| 42 | lga-five-layers | LEGITIMATE-KEEP | `[".claude/settings.json", ".claude/hooks/scripts/**", ".codex/config.toml", "tests/**"]` (unchanged — owns settings.json gate governance) |
| 43 | lga-worktree-prereq | STRIP | `[".claude/hooks/scripts/**", ".claude/rules/lga-worktree-prereq.md", "tmp/**"]` |
| 45 | mia-pre-apply | STRIP | `[".claude/agents/**", ".claude/skills/**/SKILL.md", ".claude/state/codex_consult_*"]` |
| 49 | parallel-session-worktree-isolation | KEEP-narrow + FIX stale names | `[".claude/agents/**", ".claude/commands/**", ".claude/rules/parallel-*.md", "tools/**", "bin/**"]` (drop CLAUDE.md/CLAUDE.local.md; sss.ps1/sss.cmd were already stale sibling names) |
| 50 | parallel-sessions | STRIP | `[".claude/agents/**", ".claude/commands/**", ".claude/hooks/**", ".claude/rules/parallel*.md", "tools/**", "bin/**"]` |
| 51 | port-note-discipline | STRIP | `[".claude/hooks/scripts/**/*.py", ".claude/agents/**", ".claude/commands/**", ".claude/skills/**/SKILL.md", "*.toml"]` |
| 52 | research-protocol | KEEP-narrow | `["docs/**", "reports/**", ".claude/skills/sota-research/**", ".claude/projects/*/memory/**"]` (drop CLAUDE*.md) |
| 53 | sessionstart-preload-discipline | KEEP-narrow | `[".claude/hooks/scripts/sessionstart*.py", "MEMORY.md", ".claude/projects/*/memory/**", ".claude/state/*.jsonl", "docs/install-provenance.md", "tmp/wave*close-synthesis*.md", ".claude/rules/sessionstart-preload-discipline.md"]` (drop settings.json + CLAUDE*.md; KEEP MEMORY.md) |
| 54 | skill-orchestration-discipline | KEEP-narrow | `[".claude/skills/**", ".claude/agents/**", ".claude/plugins/**"]` (drop CLAUDE.md) |
| 34 | fm21-queue-time-prompt-freeze | ADD `paths:` | ADD frontmatter `paths: [".claude/rules/fm*.md", ".claude/state/*.jsonl", "tmp/wave**"]` (currently plain-comment header, no frontmatter block — always-loads) |
| — | named-failure-modes | ADD `paths:` | ADD `paths: [".claude/rules/fm*.md", ".claude/rules/named-failure-modes.md", ".claude/state/*.jsonl", "tmp/wave**"]` (has frontmatter, missing paths line — always-loads) |

## 3. LEGITIMATE-KEEP SET — DO NOT over-narrow (orchestrator: protect these)
| Rule | MUST keep | Why |
|---|---|---|
| canonical | `CLAUDE*.md` (+ optionally settings/mcp) | governance contract for authoring agents/skills/hooks/CLAUDE.md |
| cardinal-rule-7-graduated-unleash | `CLAUDE*.md` + `.claude/settings.json` | directly governs `permissions.defaultMode` in settings.json + CLAUDE.md cardinal text |
| cardinal-rule-11-meta-process-sota | `CLAUDE*.md` | cardinal rule — must keep CLAUDE*.md |
| cardinal-rule-12-upstream-install-priority | `CLAUDE*.md` + `.mcp.json` | cardinal rule — governs install decisions in CLAUDE.md + manifest + .mcp.json |
| cross-model-consensus | `CLAUDE*.md` + `.claude/settings.json` + `.mcp.json` | pointer-index parent of cmc-* split; T1-T7 = cardinal-rule-3 |
| sota-pin-discipline | `CLAUDE.md` + `CLAUDE.local.md` | ENTIRE surface is the version-pin claims in CLAUDE*.md — narrowing orphans it |
| lga-five-layers | `.claude/settings.json` | THE child rule that owns the settings.json 5-layer gate |
| mcp-disconnect-recovery | `.mcp.json` | owns MCP disconnect/registration recovery |
| cardinal-rule-8-full-sota-content | NO `paths:` (intentional always-load) | codex T1 W160 SB6 prescription #1 — universal content invariant. DO NOT add `paths:` |

## 4. PRELOAD-DROP ESTIMATE
Current: ~44 rules preload. After: STRIP 17 (−17) + ADD-paths 2 (−2) = preload set ~44→~25 rules (−19, ~43% fewer). Projected ~14-16% preload, beats ≤17%. KEEP-narrow tier shrinks re-bloat surface (deprecation-discipline dropping `.claude/rules/*.md` stops it injecting on every rule edit). Caveat: % not perfectly proportional to rule count (rules differ in size); fresh-session re-measure is the precise test.

## 5. KEY FINDINGS
1. /goal stated cause REFUTED — zero `.claude/rules/**` glob; real cause = 44 rules globbing 5 startup-active files (`CLAUDE*.md` biggest offender).
2. Mechanism IS startup-file-match, NOT post-compact carryover — narrowing directly helps.
3. 2 always-load rules need `paths:` ADDED (fm21, named-failure-modes); cardinal-rule-8 is the ONLY legitimate always-load.
4. cmc-* split children inherited parent's broad globs — strip children, keep parent. Same for lga-* (only lga-five-layers needs settings.json).
5. deprecation-discipline `.claude/rules/*.md` = worst task-broad re-bloat glob — strip it.
6. MOVE-not-DELETE honored: every STRIP leaves task-specific globs covering the genuine surface.
7. STALE-NAME FLAG: parallel-session-worktree-isolation `paths:` targets `tools/sss.ps1`+`bin/sss.cmd` (sibling names) — fix to `eee.ps1`/`eee.cmd` not needed since recommendation drops those globs entirely.

## Sources
- `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-105 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` (TIER-1-DIRECT)
- `.claude/rules/sessionstart-preload-discipline.md:11,28`
- `.claude/rules/cardinal-rule-8-full-sota-content.md` frontmatter (intentional always-load precedent)
- codex Path P verdict `.claude/state/codex_consult_w197_preload_mechanism_OUT.txt` + bg task `bxqohvw69` (APPROVE conf=0.84)
- Orchestrator-verified: zero `.claude/rules/**` glob; no SessionStart hook injects rules; `paths:` lazy-load PROVEN via settings.json Read → 5-rule injection
