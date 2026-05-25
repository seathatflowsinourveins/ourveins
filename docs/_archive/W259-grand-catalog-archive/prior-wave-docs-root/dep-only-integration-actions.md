# Wave 134 Fire 5 DEP-ONLY integration actions

Date: 2026-05-12

This file records the source-file audit and safe wiring performed for priority dependency-only repos that were present in `Z:/repos/deps/` but not runtime-wired. Fire 6 inventory found 696 dependency directories under `Z:/repos/deps/`; this pass fully evaluated the user-named priority targets and left the remaining bulk catalog as inventory-only until a narrower install criterion is set.

## wshobson/agents

Source files read:
- `Z:/repos/deps/wshobson-agents/README.md @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
- `Z:/repos/deps/wshobson-agents/docs/agents.md @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
- `Z:/repos/deps/wshobson-agents/.claude-plugin/marketplace.json @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
- `Z:/repos/deps/wshobson-agents/plugins/distributed-debugging/agents/devops-troubleshooter.md @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
- `Z:/repos/deps/wshobson-agents/plugins/security-scanning/agents/security-auditor.md @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`

Highest-value action: install a narrow pair of missing specialists instead of importing the 185-agent catalog.

Implemented:
- `.claude/agents/wshobson-devops-troubleshooter.md`
- `.claude/agents/wshobson-security-auditor.md`

Deferred: wholesale marketplace install via `/plugin marketplace add wshobson/agents` because it would add 80 plugins and a large runtime surface.

## vercel-labs/agent-skills

Source files read:
- `Z:/repos/deps/vercel-labs-agent-skills/README.md @ HEAD b9c8ee0643d87d3c5a953d1e22382ff2ead39229`
- `Z:/repos/deps/vercel-labs-agent-skills/skills/react-best-practices/SKILL.md @ HEAD b9c8ee0643d87d3c5a953d1e22382ff2ead39229`
- `Z:/repos/deps/vercel-labs-agent-skills/skills/composition-patterns/SKILL.md @ HEAD b9c8ee0643d87d3c5a953d1e22382ff2ead39229`
- `Z:/repos/deps/vercel-labs-agent-skills/skills/web-design-guidelines/SKILL.md @ HEAD b9c8ee0643d87d3c5a953d1e22382ff2ead39229`

Highest-value action: expose the frontend rules as repo-local Claude skills while keeping the large rule bodies in the dependency repo for progressive disclosure.

Implemented:
- `.claude/skills/vercel-react-best-practices/SKILL.md`
- `.claude/skills/vercel-composition-patterns/SKILL.md`
- `.claude/skills/web-design-guidelines/SKILL.md`

Deferred: `npx skills add vercel-labs/agent-skills` because it is a global/interactive installer path and this runtime prefers repo-local, Z:-portable wiring.

## awesome-agentic-patterns

Source files read:
- `Z:/repos/deps/awesome-agentic-patterns/README.md @ HEAD 9c40e10042254ab896fed6953267b119711bae40`
- `Z:/repos/deps/awesome-agentic-patterns/patterns/background-agent-ci.md @ HEAD 9c40e10042254ab896fed6953267b119711bae40`
- `Z:/repos/deps/awesome-agentic-patterns/patterns/ai-assisted-code-review-verification.md @ HEAD 9c40e10042254ab896fed6953267b119711bae40`
- `Z:/repos/deps/awesome-agentic-patterns/patterns/deterministic-security-scanning-build-loop.md @ HEAD 9c40e10042254ab896fed6953267b119711bae40`
- `Z:/repos/deps/awesome-agentic-patterns/patterns/capability-escrow-receipt.md @ HEAD 9c40e10042254ab896fed6953267b119711bae40`

Top patterns selected for this runtime:
- Background Agent with CI Feedback: maps to existing cross-model and worktree loops, but needs explicit retry/terminal-state budgeting before hook wiring.
- AI-Assisted Code Review / Verification: reinforces existing Codex T1/T2 and verifier agent contracts.
- Deterministic Security Scanning Build Loop: directly complements `gitleaks`, `trivy`, `semgrep`, and commit gates with build-loop backpressure.

Implemented: documented as cite-class integration candidates in this file and the manifest.

Deferred: capability escrow receipt; useful for future agent-to-agent accounting, but not safe to wire without key management and settlement policy.

## awesome-claude-plugins

Source files read:
- `Z:/repos/deps/awesome-claude-plugins/README.md @ HEAD 765d795e76b3912c07e7b98c5f07824b75cfcf75`
- `Z:/repos/deps/awesome-claude-plugins/ui/src/data/repos.json @ HEAD 765d795e76b3912c07e7b98c5f07824b75cfcf75`
- `Z:/repos/deps/awesome-claude-plugins/ui/src/hooks/useInstallCommand.ts @ HEAD 765d795e76b3912c07e7b98c5f07824b75cfcf75`
- `Z:/repos/deps/awesome-claude-plugins/ui/src/schemas/repo.schema.ts @ HEAD 765d795e76b3912c07e7b98c5f07824b75cfcf75`
- `Z:/repos/deps/awesome-claude-plugins/ui/src/lib/constants.ts @ HEAD 765d795e76b3912c07e7b98c5f07824b75cfcf75`

Top MCP/plugin candidates not already active in `.mcp.json`:
- ChromeDevTools/chrome-devtools-mcp: no-secret browser inspection MCP, official ChromeDevTools source, complements Playwright.
- mem0ai/mem0: high-signal memory layer, but would overlap current `memory` and `graphiti` MCPs and requires LLM/embedder policy choices.
- MemPalace/mempalace: strong memory MCP candidate, but requires storage sizing and mining policy before activation.

Implemented:
- `.mcp.json` now includes pinned `chrome-devtools` using `npx -y chrome-devtools-mcp@0.25.0 --no-usage-statistics`.

Deferred:
- `mem0` and `mempalace` remain cite-class candidates until memory-stack duplication and storage policy are resolved.

## get-shit-done

Source files read:
- `Z:/repos/deps/get-shit-done/README.md @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5`
- `Z:/repos/deps/get-shit-done/CONTEXT.md @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5`
- `Z:/repos/deps/get-shit-done/agents/gsd-verifier.md @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5`
- `Z:/repos/deps/get-shit-done/hooks/gsd-validate-commit.sh @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5`

Highest-value action: adapt the goal-backward verifier as a dedicated local subagent.

Implemented:
- `.claude/agents/gsd-goal-verifier.md`

Deferred: full `npx get-shit-done-cc@latest` install because this repo already has Spec-Kit, existing wave rules, and commit hooks; full GSD would introduce a parallel planning system and permission-mode assumptions.

## gstack

Source files read:
- `Z:/repos/deps/gstack/AGENTS.md @ HEAD 06605477e25bf9b302888465baec132fa6093f39`
- `Z:/repos/deps/gstack/codex/SKILL.md @ HEAD 06605477e25bf9b302888465baec132fa6093f39`
- `Z:/repos/deps/gstack/careful/SKILL.md @ HEAD 06605477e25bf9b302888465baec132fa6093f39`
- `Z:/repos/deps/gstack/autoplan/SKILL.md @ HEAD 06605477e25bf9b302888465baec132fa6093f39`

Evaluation: gstack is a large skill/workflow distribution with useful patterns for Codex second-opinion calls, review pipelines, browser work, context save/restore, and destructive-command guardrails. It is not a clean direct import for this runtime because its generated skills assume `~/.claude/skills/gstack/bin/*`, Bash preambles, interactive AskUserQuestion flows, telemetry prompts, and optional state under `~/.gstack`; this conflicts with the repo's Z:-portable install discipline and duplicates existing eee primitives (`codex` T1/T2 gates, `safety_guard.py`, Spec-Kit planning, and existing verifier/reviewer agents).

Implemented: no active wiring. Recorded as DEP-ONLY / CITE-ONLY candidate.

Recommended future extraction:
- Treat `careful` as a cite-class comparison source for the existing `safety_guard.py` pattern set, not a replacement.
- Treat `codex` as a cite-class comparison source for timeout handling, JSONL streaming, and review/challenge mode UX in existing `/codex:*` commands.
- Treat `autoplan` as a cite-class comparison source only after Spec-Kit collision analysis; do not install alongside current planning stack without an explicit routing decision.

## Live SOTA research snapshot

External discovery on 2026-05-12 found rapidly moving Claude Code plugin directories and skill/MCP indexes. Anthropic's official Claude Code docs describe marketplaces as the native distribution channel for plugins containing skills, agents, hooks, and MCP servers, and warn that third-party plugins are highly trusted code. Current public indexes worth future local dependency mirroring before install decisions:
- `claudemarketplaces.com`: claims 4,200+ skills, 770+ MCP servers, and 2,500+ marketplaces, updated 2026-05-11.
- `skillsplayground.com`: claims 8,825 skills and 3,561 MCP servers, with `vercel-labs/agent-skills` and Anthropic frontend skills among top entries.
- `mcp-use/mcp-use`: marketplace candidate for MCP-builder and ChatGPT-app-builder skills.
- `ccplugins/awesome-claude-code-plugins`, `EricGrill/agents-skills-plugins`, `kivilaid/plugin-marketplace`, and `davepoon/buildwithclaude`: aggregation candidates, but require local clone + provenance audit before runtime install.

Disposition: research-only. No additional external repo was installed in Fire 6 because the repo requires pinned local dependency snapshots, smoke probes, and trust review before adding active runtime code.
