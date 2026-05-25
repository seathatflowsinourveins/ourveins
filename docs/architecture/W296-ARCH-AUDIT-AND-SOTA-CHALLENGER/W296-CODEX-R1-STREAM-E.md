[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:33 — Proposed Rule 6 is cardinal-rule over-reach because MCP pin discipline is already embedded in existing Rule 2, so promoting it duplicates an existing cardinal rule instead of extending coverage.
Required-fix: Remove the Rule 6 promotion recommendation and instead say "tighten/validate Rule 2's existing MCP pin clause".
Evidence: CLAUDE.md:19 already states the `.mcp.json` `npx -y <pkg>@<pinned-version>` contract; `.mcp.json:7` plus `.mcp.json:35-38`, `.mcp.json:40-48`, and `.mcp.json:103-106` show the existing pinned entries.

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:682 — Proposed Rule 7 is over-promoted while the audit itself admits the invariant is still violated by Cognee, making it a remediation/status item rather than a ratified cardinal rule.
Required-fix: Reclassify state-outside-repo as a tracked remediation gate until Cognee migration is executed and independently verified, then revisit rule promotion.
Evidence: Stream E states the Cognee data-dir still violates the invariant at docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:684-693; CLAUDE.md:22 already places safety boundaries under permissions/sandboxing rather than custom state policy.

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:24 — The audit falsely classifies `langfuse` as a `Z:/repos/deps` pointer-skill even though the actual skill body is local and uses CLI/docs references, so the "4 pointer-skills" claim is wrong.
Required-fix: Change every "4 pointer-skills" claim to "3 vercel pointer-skills", remove `langfuse` from the pointer hazard, and keep only a separate upstream-provenance question for `langfuse` if desired.
Evidence: `.claude/skills/langfuse/SKILL.md:3-14` contains a local description and npx/bunx CLI permissions with no `Z:/repos/deps` body pointer; `.claude/skills/vercel-composition-patterns/SKILL.md:13-17` and `.claude/skills/web-design-guidelines/SKILL.md:13-16` are the actual pointer examples.

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:282 — `planning-with-files` is reported as enabled/loaded, but the actual settings disable it, so Stream E's plugin-loaded skill survey and deferred finding are stale.
Required-fix: Reclassify `planning-with-files` as installed-cache-present but disabled, and do not count its skills as loaded until `settings.json` enables it.
Evidence: `.claude/settings.json:232` has `"planning-with-files@planning-with-files": false`; `.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/.claude-plugin/plugin.json:1-10` only proves the cached plugin exists.

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:495 — Hook #3 is marked "PASS - direct upstream-CLI chain", but the command is an inline custom `bash -c` hook program that parses hook JSON with `jq` and dispatches tools, which is not merely a direct upstream CLI invocation.
Required-fix: Reclassify Hook #3 as a Rule-2 exception or violation, then either move the formatter dispatch into an upstream plugin hook or document the inline hook as an explicit local exception with a removal/ownership contract.
Evidence: `.claude/settings.json:119-120` contains the custom `bash -c "f=$(jq ...); case ... ruff ... shellcheck ..."` hook; CLAUDE.md:19 allows upstream plugin hooks or direct upstream-CLI invocations only.

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:365 — The "plugin wraps TeamCreate" comparison overstates implementation reality: `agent-teams` is a slash-command/agent recipe that instructs Claude to call `TeamCreate`, `Agent`, and task tools, not a programmatic wrapper around the native primitive.
Required-fix: Rewrite §3.1 to say the plugin provides command recipes and role definitions that exercise native tools, and avoid claiming a native wrapper unless actual executable plugin code is cited.
Evidence: `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/commands/team-spawn.md:72-84` instructs use of `TeamCreate`, `Agent`, and `TaskCreate`; `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/agents/team-lead.md:77-83` describes a behavioral lifecycle, not wrapper code.

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:807 — The audit dismisses `agent-sdk-dev` as correctly disabled "dev-only", but 2026 Anthropic plugin docs describe it as a verified lifecycle and verification kit for Agent SDK apps, which is directly relevant to a foundation audit.
Required-fix: Add an explicit `agent-sdk-dev` decision: either enable it for SDK/foundation work, keep it disabled with rationale, or add a runbook for on-demand enabling and verification-agent use.
Evidence: `.claude/settings.json:169` disables `"agent-sdk-dev@claude-plugins-official"`; Anthropic's plugin page says Agent SDK Dev is Anthropic Verified and covers project scaffolding plus verification agents for SDK usage, type safety, security practices, and documentation completeness (https://claude.com/plugins/agent-sdk-dev lines 234-261).

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:404 — The audit treats `anthropics/claude-agent-sdk-python` as merely "author-time" and non-substitutable, but current Agent SDK docs expose foundation primitives Stream E did not audit: SDK plugins, skills, hooks, subagents, permissions, sessions, checkpoints, and custom tools.
Required-fix: Add a 2026 Agent SDK foundation subsection comparing this runtime's plugin/skill/hook/subagent policy against SDK-native `AgentDefinition`, `SdkPluginConfig`, permissions, file checkpointing, and tool APIs.
Evidence: Anthropic's Python SDK reference lists Agent SDK support for subagents, slash commands, agent skills, plugins, hooks, permissions, sessions, and custom tools at https://platform.claude.com/docs/en/agent-sdk/python lines 75-88 and `enable_file_checkpointing` plus permissions/tool controls at lines 1032-1045.

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:406 — The Microsoft Agent Framework comparison misses active 2026 foundation-layer primitives: an experimental skills API aligned to agentskills.io, A2A v1.0 migration, functional workflow API, OpenTelemetry integration, and checkpoint path-traversal hardening.
Required-fix: Replace the "documentation-agent patterns" summary with a concrete pattern-study row for skills-spec compatibility, A2A bridge semantics, workflow API, telemetry, and checkpoint security.
Evidence: Microsoft Agent Framework releases list skills API alignment and `SkillFrontmatter`, A2A v1.0 migration, and checkpoint path-traversal fix at https://github.com/microsoft/agent-framework/releases lines 232-242; the 2026-04-24 release adds functional workflow API, OpenTelemetry integration, and Agent Framework to A2A bridge at lines 810-817.

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:262 — The audit calls `anthropic-agent-skills` canonical `anthropics/skills`, but the marketplace manifest owner is an individual Anthropic email identity and the plugin is "example-skills", so the trust tier needs to cite actual marketplace provenance instead of assuming Anthropic-official status.
Required-fix: Change the tier wording to "Anthropic-affiliated/example-skills via configured marketplace source" unless a first-party Anthropic marketplace URL or signed official provenance is cited.
Evidence: `.claude/plugins/marketplaces/anthropic-agent-skills/.claude-plugin/marketplace.json:2-9` names owner Keith Lazuka and "Anthropic example skills"; `.claude/plugins/marketplaces/anthropic-agent-skills/.claude-plugin/marketplace.json:24-39` defines `example-skills` as a collection of examples.

[MED] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:188 — The plugin-loaded survey samples `superpowers-marketplace/superpowers` even though that marketplace variant is disabled and the active setting is `superpowers@claude-plugins-official`.
Required-fix: Re-run the sampled skill/hook citations against `.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/` or prove byte-for-byte parity before using the disabled marketplace cache as evidence.
Evidence: `.claude/settings.json:165` enables `superpowers@claude-plugins-official`, while `.claude/settings.json:206` disables `superpowers@superpowers-marketplace`; both hook files exist, but active provenance should cite the enabled path.

[MED] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:476 — The audit claims no stricter 2026-MAY plugin protocol was found while explicitly saying it did not scrape the current docs, which violates its own freshness mandate.
Required-fix: Replace the no-scrape assertion with a fresh-source check of official plugin, Agent SDK, and skill-creator docs, then list dated findings.
Evidence: Stream E says "no scrape" at docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:476-479; current Anthropic Agent SDK docs expose SDK plugins and Agent Skills in the SDK at https://platform.claude.com/docs/en/agent-sdk/python lines 75-88, and the Agent SDK Dev plugin page describes verification against best practices at https://claude.com/plugins/agent-sdk-dev lines 258-261.

[MED] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:602 — The settings `deny[]` excerpt is presented as a `settings.json` snippet but is not valid JSON, which fails the schema-validity criterion for cited settings snippets.
Required-fix: Either label the block "plain list excerpt" or replace it with a valid JSON array excerpt including commas and quotes.
Evidence: The block at docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:602-620 omits JSON array syntax; the real JSON array appears in `.claude/settings.json:64-83`.

[LOW] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:338 — The Pillar 1 roll-up counts are internally inconsistent because "KEEP - exemplar" includes `gitnexus(7-nested)` plus named local skills while "KEEP - clean port" separately counts 9 speckit skills, producing a misleading total against the 18 top-level local-skill inventory.
Required-fix: Recompute the roll-up with one axis only: either 18 top-level directories or all `SKILL.md` files including nested gitnexus, but not both.
Evidence: Stream E inventory says 18 top-level entries at docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md:131; the actual recursive list contains 23 `SKILL.md` files because `gitnexus` contributes 7 nested skills.

VERDICT: REVISE
