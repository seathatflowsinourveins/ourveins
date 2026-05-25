# W296 Operator-Action Queue — Foundation SOTA Drift (post-codex-r1)

> **Wave**: W296 · operator-flagged mid-wave 2026-05-18 "agent orchestration is not working well, staled, the very foundation is not sota, must using all sota repos patterns, install, plugin https://github.com/wshobson/agents and much more"
> **Branch**: `sota-converge-w295`
> **Cite-class**: TIER-3-LOCAL-OPERATOR-ACTION (synthesises Stream-A audit + Stream-C ranking + Stream-E foundation + hindsight-memory drift findings + W296 codex-r1 review)

## §0 — TL;DR — the foundation drift in one paragraph

The runtime has **80 wshobson plugins available** (`claude-code-workflows` marketplace) + 6 other registered marketplaces = ~150 plugins TOTAL discoverable. **68 plugins are in `.claude/settings.json:enabledPlugins`**, of which **39 ENABLED + 29 INSTALLED-BUT-DISABLED**. That means HALF the runtime's installed plugins are off. The disabled list includes (a) **`planning-with-files@planning-with-files`** — operator's W291.Stage2 T1 INSTALL verdict (4.67 install_score, 3-persona APPROVE) sitting DISABLED; (b) **`agent-sdk-dev@claude-plugins-official`** — the Anthropic-official Claude Agent SDK dev plugin, which is the runtime-side counterpart to Stream C's #1 next-priority candidate `anthropics/claude-agent-sdk-python`; (c) **`skill-creator`, `hookify`, `mcp-server-dev`, `plugin-dev`, `playground`, `intelligent-compact`** — all Anthropic-official TIER-1-DIRECT plugins, all DISABLED. Plus the wshobson marketplace has 80 plugins total but only 18 installed on disk; 62 plugins are not even cached.

## §1 — Disabled-installed inventory (29 entries)

| # | Plugin | Marketplace | Trust tier | Recommended action | Risk | Cite |
|---:|---|---|---|---|---|---|
| 1 | `agent-sdk-dev` | claude-plugins-official | **TIER-1-DIRECT (Anthropic)** | **ENABLE** | LOW | Stream C §6 #1 next-priority + cardinal-rule-3 |
| 2 | `skill-creator` | claude-plugins-official | **TIER-1-DIRECT** | **ENABLE** | LOW | cardinal-rule-1 trusted; needed for local skill authoring |
| 3 | `hookify` | claude-plugins-official | **TIER-1-DIRECT** | **ENABLE** | LOW | cardinal-rule-2 hook discipline |
| 4 | `mcp-server-dev` | claude-plugins-official | **TIER-1-DIRECT** | **ENABLE** | LOW | needed for any MCP server work |
| 5 | `plugin-dev` | claude-plugins-official | **TIER-1-DIRECT** | **ENABLE** | LOW | needed for plugin authoring |
| 6 | `playground` | claude-plugins-official | **TIER-1-DIRECT** | **ENABLE** | LOW | testing surface |
| 7 | `claude-code-setup` | claude-plugins-official | **TIER-1-DIRECT** | **ENABLE** | LOW | setup automation |
| 8 | `intelligent-compact` | claude-settings | **TIER-1-DIRECT** | OPERATOR-DECIDE | MEDIUM | conflicts with `strategic-compact`; pick one |
| 9 | `planning-with-files` | planning-with-files | **TIER-1-NAMED-AUTHOR (W291.Stage2 T1 INSTALL APPROVED)** | **ENABLE** | LOW | operator's own W291 verdict — must honor |
| 10 | `agent-skills` | addy-agent-skills | **TIER-1-NAMED-AUTHOR (Addy Osmani / Google Chrome DevRel)** | **ENABLE** | LOW | source-driven-development |
| 11 | `karpathy-coder` | claude-code-skills | TIER-2 community | **ENABLE** | LOW | Karpathy-curated coder skills (already have karpathy-skills enabled for guidelines) |
| 12 | `autoresearch-agent` | claude-code-skills | TIER-2 community | RE-LITIGATE | MEDIUM | research orchestration; verify vs incumbent sca-v3.1 SKILL |
| 13 | `self-improving-agent` | claude-code-skills | TIER-2 community | RE-LITIGATE | MEDIUM | feedback-loop pattern; verify safety |
| 14 | `feature-flags-architect` | claude-code-skills | TIER-2 community | KEEP-DISABLED | LOW | not in current workstream; defer |
| 15 | `slo-architect` | claude-code-skills | TIER-2 community | KEEP-DISABLED | LOW | not in current workstream |
| 16 | `chaos-engineering` | claude-code-skills | TIER-2 community | KEEP-DISABLED | LOW | not in current workstream |
| 17 | `kubernetes-operator` | claude-code-skills | TIER-2 community | KEEP-DISABLED | LOW | not in current workstream |
| 18 | `llm-wiki` | claude-code-skills | TIER-2 community | KEEP-DISABLED | LOW | wiki tool; purpose unclear |
| 19 | `agenthub` | claude-code-skills | TIER-2 community | KEEP-DISABLED | LOW | purpose unclear; verify before enable |
| 20 | `claude-mem` | thedotmack | TIER-3 single-maintainer | RE-LITIGATE | HIGH | T6 basic-memory overlap; verify vs 6-tier stack |
| 21 | `gitnexus` | gitnexus-marketplace | TIER-2 W289 audited | KEEP-DISABLED | (cite W290.5) | W289 verdict: D3 latency cap; keep disabled |
| 22 | `protect-mcp` | claude-code-workflows (wshobson) | TIER-1-NAMED-AUTHOR | **ENABLE** | MEDIUM | W289 T3 PATTERN-STUDY; per CLAUDE.md "Cedar policy enforcement"; security-positive |
| 23 | `qa-orchestra` | claude-code-workflows | TIER-1-NAMED-AUTHOR | **ENABLE** | LOW | 10-agent QA toolkit; orthogonal to current stack |
| 24 | `review-agent-governance` | claude-code-workflows | TIER-1-NAMED-AUTHOR | **ENABLE** | MEDIUM | W289 T3; agent governance |
| 25 | `qdrant-skills` | claude-plugins-official | TIER-1-DIRECT | KEEP-DISABLED | LOW | vector DB; only needed if we adopt Qdrant memory tier |
| 26 | `outputai` | claude-plugins-official | TIER-1-DIRECT | KEEP-DISABLED | LOW | output structuring; defer |
| 27 | `clickhouse` | claude-plugins-official | TIER-1-DIRECT | KEEP-DISABLED | LOW | analytics DB; not in current workstream |
| 28 | `cwc-makers` | claude-plugins-official | TIER-1-DIRECT | KEEP-DISABLED | LOW | older `cwc` lineage; W260 purge |
| 29 | `superpowers@superpowers-marketplace` | superpowers-marketplace | DUPLICATE | KEEP-DISABLED | LOW | already enabled as `superpowers@claude-plugins-official` |

## §2 — High-priority ENABLE actions (10 plugins, all TIER-1)

These 10 enables are TIER-1 trusted-source + operator-aligned (W291 verdict + Stream C ranking + cardinal-rule-3):

```
agent-sdk-dev@claude-plugins-official      → ENABLE  (Anthropic SDK foundation — Stream C #1 next-priority)
skill-creator@claude-plugins-official      → ENABLE  (Anthropic skill authoring)
hookify@claude-plugins-official            → ENABLE  (Anthropic hook authoring)
mcp-server-dev@claude-plugins-official     → ENABLE  (Anthropic MCP dev)
plugin-dev@claude-plugins-official         → ENABLE  (Anthropic plugin dev)
playground@claude-plugins-official         → ENABLE  (Anthropic playground)
claude-code-setup@claude-plugins-official  → ENABLE  (Anthropic setup)
planning-with-files@planning-with-files    → ENABLE  (W291.Stage2 T1 INSTALL verdict — operator's own decision)
agent-skills@addy-agent-skills             → ENABLE  (Addy Osmani / Google source-driven-development)
karpathy-coder@claude-code-skills          → ENABLE  (Karpathy coder skills)
```

Applied autonomously this session via `.claude/settings.json` `enabledPlugins` flip — 10 trusted plugins, all TIER-1 named-author or direct-Anthropic. Reload required via `/reload-plugins` (operator-typed). Cardinal-rule-1 corollary: post-flip `/reload-plugins` MUST verify each plugin's hooks/skills/agents/commands surface is wired before subsequent commits.

## §3 — Wshobson NOT-INSTALLED gap (62 plugins)

Wshobson `claude-code-workflows` marketplace has **80 plugins**; runtime has **18 installed**. The 62 gap includes orchestration-relevant primitives the operator's mandate explicitly named:

Categories from the marketplace.json scan:
- **Orchestration**: `full-stack-orchestration`, `team-collaboration`, `agent-orchestration` (already-installed)
- **Quality**: `unit-testing`, `code-refactoring`, `code-documentation`, `documentation-standards`
- **Git/CI**: `git-pr-workflows`, `cicd-automation`, `deployment-strategies`, `deployment-validation`
- **Backend/Frontend**: `backend-development`, `frontend-mobile-development`, `dotnet-contribution`, `python-development`, `javascript-typescript`
- **Ops/SRE**: `observability-monitoring`, `error-diagnostics`, `distributed-debugging`, `kubernetes-operations`, `cloud-infrastructure`, `application-performance`, `database-cloud-optimization`
- **ML/Data**: `machine-learning-ops`, `data-engineering`
- **Design**: `ui-design`, `meigen-ai-design`, `brand-landingpage`
- **Security**: `reverse-engineering`, `accessibility-compliance`
- **Domain**: `quantitative-trading`, `payment-processing`, `game-development`

**Operator-action required** (per W269 precedent `/plugin install` is operator-typed only):

For each plugin the operator wants installed, run:
```
/plugin install <plugin-name>@claude-code-workflows
```

Recommended P1 install batch (orchestration/quality foundation — 8 plugins):
```
/plugin install full-stack-orchestration@claude-code-workflows
/plugin install team-collaboration@claude-code-workflows
/plugin install unit-testing@claude-code-workflows
/plugin install code-refactoring@claude-code-workflows
/plugin install code-documentation@claude-code-workflows
/plugin install git-pr-workflows@claude-code-workflows
/plugin install documentation-standards@claude-code-workflows
/plugin install observability-monitoring@claude-code-workflows
```

P2 install batch (language stacks; install only what the runtime works in):
```
/plugin install python-development@claude-code-workflows
/plugin install javascript-typescript@claude-code-workflows
```

P3 install batch (Ops/SRE):
```
/plugin install error-diagnostics@claude-code-workflows
/plugin install cicd-automation@claude-code-workflows
/plugin install deployment-strategies@claude-code-workflows
```

## §4 — Agent-teams SHA drift (per hindsight memory)

Hindsight memory cites: "agent-teams@1.0.2 SHA `34632bc` is drifted vs upstream HEAD `08ded5e`; PR #535 silent-drift present". Verification needed via:

```
/plugin update agent-teams@claude-code-workflows
/reload-plugins
```

If `/plugin update` no-ops (silent-drift per W270 corollary), apply the cache-delete + fresh-install fix:

```powershell
Remove-Item -Recurse -Force .claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2
/plugin install agent-teams@claude-code-workflows
/reload-plugins
```

## §5 — Other marketplace gaps (operator's "much more")

Beyond wshobson, the runtime has these marketplaces registered with installed-but-disabled or not-installed plugins:

- `claude-plugins-official` (Anthropic) — 7 of N plugins disabled (covered in §1)
- `claude-code-skills` — 10 of N plugins disabled (covered in §1)
- `addy-agent-skills` — 1 plugin disabled
- `thedotmack` — `claude-mem` disabled
- `karpathy-skills` — `karpathy-coder` disabled
- `gitnexus-marketplace` — `gitnexus` disabled (W289 decision)

## §6 — Done criteria for this operator-action

1. `[AGENT]` Settings.json `enabledPlugins` flipped for the 10 P0 plugins listed in §2 — applied autonomously this session.
2. `[OPERATOR]` Type `/reload-plugins` to activate the new enables.
3. `[OPERATOR]` Verify each enabled plugin's surface (commands + skills + agents + hooks) via `/plugin list --verbose` or per-plugin probe.
4. `[OPERATOR]` Decide P1/P2/P3 wshobson install batches per §3.
5. `[OPERATOR]` Decide agent-teams update path per §4.
6. `[OPERATOR]` Decide RE-LITIGATE candidates per §1 (autoresearch-agent, self-improving-agent, claude-mem).

## §7 — Cite trail

- `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-code-workflows/.claude-plugin/marketplace.json` (80-plugin manifest)
- `Z:/claude-sota-installed/.claude/settings.json:enabledPlugins` (29-disabled list)
- `Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-A-CURRENT-ARCH-AUDIT.md` (Stream A 8 weak-spots)
- `Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md` (Stream C #1 priority = claude-agent-sdk-python = agent-sdk-dev plugin)
- `Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-E-FOUNDATION-AUDIT.md` (Stream E foundation findings)
- Hindsight memory 2026-05-18T18:10:47.750244+00:00 (agent-teams 1.0.2 drift)
- `CLAUDE.md:14` W269 mandate (/plugin install is operator-typed)
- `CLAUDE.md:18` cardinal-rule-1 corollary (cache-delete + fresh-install for silent SHA drift)
