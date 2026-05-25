# W285 — Deprecated Local Agents Citation Preservation (2026-05-18)

> Preserves unique TIER-1 citations from 6 REPLACE-verdict `.claude/agents/*.md` files before their deletion in W285b/c. Per W282-fix1 codex-HIGH risk mitigation pattern — citation provenance survives even when the subagent file is removed.

W285 audit (`docs/architecture/W285-LOCAL-AGENTS-AUDIT-2026-05-18.md`) graded these 6 local agents REPLACE because plugin-installed equivalents exist. The agents themselves carry sibling-novel ENRICHMENT in the form of cited references to upstream patterns. Those references are catalogued below so future operators can find them by topic without needing the deleted subagent files.

## architect.md → `comprehensive-review:architect-review.md`

Unique TIER-1 references that the plugin equivalent does NOT contain:

- **Continuous-Claude-v3 composition-gate pattern algebra**
  `Z:/repos/deps/Continuous-Claude-v3/.claude/hooks/src/shared/composition-gate.ts:39-56 @ d07ff4b06b62f43771bc0c927d0211b734d6149e` [VERIFIED 2026-04-28] (pattern algebra)
- **Anthropic SDK `AgentDefinition` 13-field dataclass mapping** — `Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/types.py:82-99 @ HEAD b512f256450dba8f0dd1399e485563b7deb9c534` [VERIFIED 2026-05-02]. The 13 fields: `description / prompt / tools / disallowedTools / model / skills / memory / mcpServers / initialPrompt / maxTurns / background / effort / permissionMode`. Local `architect.md` mapped 12 of 13 (only `skills:` absent).
- CCBP frontmatter contract — `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-subagents.md:19-36 @ 48f2cebeb88b389b27231c418ceadb65baf813fd` (CC 2.1 frontmatter)

## code-reviewer.md → `comprehensive-review:code-reviewer.md`

- **Phantom 9-invariant validation framework** — `Z:/repos/deps/phantom/src/evolution/invariant-check.ts:48-360 @ f8c7ab42d885936ee54abc785528000260f4acc5` [VERIFIED 2026-04-28] (9-invariant validation with hard/soft tiers — this is the same 9-invariant cite re-used by verifier.md)
- **Codex review-only stop-after-review contract** — `Z:/repos/deps/codex-plugin-cc/plugins/codex/commands/review.md:14-16,48-49 @ 807e03ac9d5aa23bc395fdec8c3767500a86b3cf` [VERIFIED 2026-04-28]

## debugger.md → `debugging-toolkit:debugger.md` + `superpowers:systematic-debugging`

- **Deer-flow loop-detection middleware** — `Z:/repos/deps/deer-flow/backend/packages/harness/deerflow/agents/middlewares/loop_detection_middleware.py:107-137 @ f394c0d8c8de8821ac6a5becc73f5a9587a03e42` [VERIFIED 2026-04-28] (loop detection)

## gsd-goal-verifier.md → `superpowers:verification-before-completion` + `goal-prompt-synthesis`

- get-shit-done port — TIER-3-LOCAL-COMPOSITION; no unique upstream cite. The 4-level (exists/substantive/wired/data-flowing) framework is fully covered by `superpowers:verification-before-completion` SKILL.

## verifier.md → `superpowers:verification-before-completion` SKILL

- **Phantom 9-invariant sweep** — `Z:/repos/deps/phantom/src/evolution/invariant-check.ts:48-360 @ f8c7ab42d885936ee54abc785528000260f4acc5` [VERIFIED 2026-04-28] (hard-fail + soft-warn tiers)
- **Continuous-Claude-v3 pre-compact verification** — `Z:/repos/deps/Continuous-Claude-v3/.claude/hooks/src/pre-compact-continuity.ts:45-86 @ d07ff4b06b62f43771bc0c927d0211b734d6149e` [VERIFIED 2026-04-28]
- **Verification-specialist self-awareness + Command-run PASS contract** — `Z:/repos/deps/claude-code-system-prompts/system-prompts/agent-prompt-verification-specialist.md:10-18,100-134 @ a59a3544513c4d7c9fc54030e6762409ed7b7311` [VERIFIED 2026-04-28]

## gpt5-reviewer.md → `/dual-review` slash-command (NEW W285b) + `/codex:review` + `/codex:adversarial-review` + `openai-codex:agents/codex-rescue.md`

- **Codex review-only contract** — `Z:/repos/deps/codex-plugin-cc/plugins/codex/commands/review.md:8-16 @ 807e03ac9d5aa23bc395fdec8c3767500a86b3cf` [VERIFIED 2026-04-28]
- **Codex adversarial-review command contract** — `Z:/repos/deps/codex-plugin-cc/plugins/codex/commands/adversarial-review.md:8-18 @ 807e03ac9d5aa23bc395fdec8c3767500a86b3cf` [VERIFIED 2026-04-28]
- **Codex-companion shared CLI subcommands** — `Z:/repos/deps/codex-plugin-cc/plugins/codex/scripts/codex-companion.mjs:77-80 @ 807e03ac9d5aa23bc395fdec8c3767500a86b3cf` [VERIFIED 2026-04-28]
- **GPT-5.5 release benchmarks** — `https://openai.com/index/introducing-gpt-5-5/` (official OpenAI release page, 2026-04-23; reports 82.7% Terminal-Bench 2.0 and 58.6% SWE-Bench Pro) [VERIFIED 2026-04-28]
- **Codex-unavailable fail-closed BLOCK contract** — ported into `.claude/commands/dual-review.md` (W285b). Original gpt5-reviewer.md §"Codex unavailable — fail-closed contract" specified that the agent MUST return `VERDICT: BLOCK — Codex unavailable: <cause>` where `<cause>` ∈ `plugin-missing | auth-expired | rate-limited | quota-exhausted | network-down | unknown-error`. The slash-command wrapper preserves this fail-closed contract.

## CR-12 cite-class status

All deprecated agents carried `effective_tier: TIER-3-LOCAL-COMPOSITION` (sibling-derived per CLAUDE.md cardinal-rule-12 cite-class lattice). Their TIER-1 references above remain TIER-1 in this doc — the deletion removes the SUBAGENT-shape wrapper, not the referenced upstream patterns.

## Reverting any deletion

`git revert <sha>` of the corresponding W285b/c commit restores the local agent file. The plugin-installed equivalents stay; the local file regains its previous read-only/maxTurns/model frontmatter discipline.
