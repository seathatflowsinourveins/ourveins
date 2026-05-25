# Agent E audit: SOTA extension candidates for Option B parallel-evaluation runtime

Date: 2026-05-15T01:55Z verification pass, requested artifact name retains 2026-05-14.
Scope: `Z:/repos/deps/awesome-claude-code/` and `Z:/repos/deps/awesome-agentic-patterns/`.
Output target: `Z:/claude-sota-installed/tmp/sota-pure-extension-E-2026-05-14.md`.
Role: Agent E, SOTA extension researcher for `Z:/claude-sota-pure/` Option B parallel-evaluation runtime.

## Constraints and evidence notes

- `Z:/claude-sota-pure/` was not present in this session; Wave 1 exclusion is inferred from `docs/sota-installed-manifest.md` and Wave 1 mentions in `docs/install-provenance.md`.
- Local awesome catalog SHAs:
- `awesome-claude-code`: `614f102accbcd48206d63a21df64adc984026b40`.
- `awesome-agentic-patterns`: `9c40e10042254ab896fed6953267b119711bae40`.
- `awesome-agentic-patterns` emitted a stale `.git/index.lock` unlink warning during `git status`; I treated that repo as read-only.
- GitHub repo metadata was spot-checked with `gh api repos/<slug>` on 2026-05-15 UTC.
- Stars are volatile. Treat counts as verification-time counts, not durable pins.
- License is GitHub `license.spdx_id`; empty means no detected license.
- Axis-3 band uses repository age plus recency/adoption proxy: stars, created date, and pushed date. I did not fetch full commit counts for every repo under the 300s wall-clock target.
- Convergence gate shorthand:
- Axis 1 = provenance and license are usable.
- Axis 2 = runtime fit for `claude-sota-pure` without replacing existing primitives.
- Axis 3 = adoption/freshness is strong enough for install-class, cite-class, or study-pilot.

## Existing Wave 1 / installed baseline exclusions

- Excluded as already covered or functionally covered: `openai/codex`, `openai/codex-plugin-cc`, `anthropics/claude-code`, `anthropics/claude-code-action`, `anthropics/claude-code-base-action`.
- Excluded as already covered or functionally covered: `obra/superpowers`, `affaan-m/everything-claude-code`, `carlrannaberg/claude-code-context-mode`, `dylan-frankland/claude-agent-skills`.
- Excluded as already covered or functionally covered: official `claude-plugins-official` marketplace subplugins already listed in manifest Section 17.
- Excluded as already covered or functionally covered: Context7, DeepWiki, GitHub MCP, Git MCP, memory-service, Graphiti, Repomix, Serena, Playwright MCP, Exa, Perplexity, Firecrawl, arXiv rows already planned or installed.
- Excluded as already covered or functionally covered: `rg`, `fd`, `bat`, `eza`, `jq`, `fzf`, `zoxide`, `delta`, `lazygit`, `gh`, `mise`, Docker CLI/plugin rows already in manifest.
- Foundation tools below are therefore mostly PINS hygiene or gap-fill recommendations, not first-time discovery.

## Priority findings

- INSTALL: `jarrodwatts/claude-hud` - huge adoption, fresh, Claude Code-native telemetry/status surface; install only if it does not duplicate current statusline hooks.
- INSTALL: `EveryInc/compound-engineering-plugin` - strong fit for mistake-to-skill feedback loops and governance; high adoption and fresh.
- INSTALL: `nizos/tdd-guard` - narrow hook primitive; useful for Option B evaluation gating.
- INSTALL: `backnotprop/plannotator` - narrow plan annotation hook; complements, not replaces, existing gates.
- INSTALL: `trailofbits/skills` - security-skill library; license is content-oriented CC-BY-SA-4.0, so import policy must preserve attribution/share-alike obligations.
- STUDY-PILOT: `Piebald-AI/claude-code-system-prompts` - excellent cite/diagnostic value; not install-class except as research mirror.
- STUDY-PILOT: `TencentCloudADP/youtu-graphrag` - GraphRAG architecture candidate; license missing blocks install-class.
- CITE: `onestardao/WFGY` - reliability/problem-map methods are useful, but no license means reject install-class.
- PINS: add portable pins for `just`, `hyperfine`, `difftastic`, `yq`, `glow`, `bottom`, `dust`, `procs`, `xh`, `uv`, `tree-sitter` if Option B wants reproducible toolchain parity.

## Candidate table: Claude Code plugins, hooks, skills, and tooling

| # | Repo slug | License | Stars | Axis-3 age+cpd band | Gate | Disposition |
|---:|---|---|---:|---|---|---|
| 1 | `jarrodwatts/claude-hud` | MIT | 22776 | 134d age; pushed <1d; breakout-high | PASS | INSTALL |
| 2 | `EveryInc/compound-engineering-plugin` | MIT | 16748 | 218d age; pushed <1d; high | PASS | INSTALL |
| 3 | `nizos/tdd-guard` | MIT | 2110 | 312d age; pushed 5d; medium-high | PASS | INSTALL |
| 4 | `backnotprop/plannotator` | Apache-2.0 | 5314 | 139d age; pushed <1d; high | PASS | INSTALL |
| 5 | `trailofbits/skills` | CC-BY-SA-4.0 | 5189 | 121d age; pushed 4d; high | PASS-with-license-caveat | INSTALL/CITE |
| 6 | `Piebald-AI/claude-code-system-prompts` | MIT | 10196 | 177d age; pushed <1d; high | PASS | CITE |
| 7 | `matt1398/claude-devtools` | MIT | 3362 | 97d age; pushed 1d; high | PASS | STUDY-PILOT |
| 8 | `davila7/claude-code-templates` | MIT | 27281 | 315d age; pushed <1d; high | STUDY-PILOT | CITE |
| 9 | `agent-sh/agentsys` | MIT | 800 | 120d age; pushed 19d; medium | PASS | STUDY-PILOT |
| 10 | `agent-sh/agnix` | Apache-2.0 | 241 | 105d age; pushed <1d; medium | PASS | INSTALL |
| 11 | `lis186/ccxray` | MIT | 170 | 42d age; pushed 2d; fresh-low | STUDY-PILOT | STUDY-PILOT |
| 12 | `Astro-Han/claude-pace` | MIT | 170 | 58d age; pushed 14d; fresh-low | STUDY-PILOT | CITE |
| 13 | `Piebald-AI/tweakcc` | MIT | 2014 | 299d age; pushed <1d; medium-high | PASS | STUDY-PILOT |
| 14 | `dyoshikawa/rulesync` | MIT | 1093 | 331d age; pushed 1d; medium-high | PASS | INSTALL |
| 15 | `vaporif/parry-guard` | MIT | 39 | 87d age; pushed 2d; low | STUDY-PILOT | CITE |
| 16 | `aannoo/hcom` | MIT | 278 | 298d age; pushed 6d; medium-low | STUDY-PILOT | STUDY-PILOT |
| 17 | `tombii/better-ccflare` | MIT | 216 | 228d age; pushed 6d; medium-low | STUDY-PILOT | CITE |
| 18 | `carlrannaberg/claudekit` | MIT | 708 | 308d age; pushed 45d; medium | PASS | STUDY-PILOT |
| 19 | `fcakyon/claude-codex-settings` | Apache-2.0 | 685 | 310d age; pushed 6d; medium | PASS | CITE |
| 20 | `automazeio/ccpm` | MIT | 8109 | 269d age; pushed 58d; high but cooling | STUDY-PILOT | CITE |
| 21 | `SuperClaude-Org/SuperClaude_Framework` | MIT | 22787 | 327d age; pushed 18d; high | STUDY-PILOT | CITE |
| 22 | `eyaltoledano/claude-task-master` | NOASSERTION | 27140 | 437d age; pushed 17d; high | FAIL-license | REJECT-INSTALL/CITE |
| 23 | `smtg-ai/claude-squad` | AGPL-3.0 | 7463 | 432d age; pushed 48d; high | FAIL-license-fit | REJECT-INSTALL |
| 24 | `rullerzhou-afk/clawd-on-desk` | AGPL-3.0 | 2475 | 58d age; pushed <1d; fresh-high | FAIL-license-fit | REJECT-INSTALL |
| 25 | `FlineDev/ContextKit` | MIT | 169 | 246d age; pushed 66d; low-medium | STUDY-PILOT | CITE |
| 26 | `slopus/happy` | MIT | 20716 | 301d age; pushed 1d; high | FAIL-overlap | REJECT |
| 27 | `ruvnet/ruflo` | MIT | 51067 | 347d age; pushed <1d; very-high | FAIL-suspicious-fit | REJECT |

### `jarrodwatts/claude-hud`

- Catalog source: `awesome-claude-code` Status Lines / Tooling candidate.
- License: MIT.
- Stars: 22776 at verification.
- Axis-3 age+cpd band: 134d, pushed within 1 day, breakout-high adoption.
- Axis 1: PASS, permissive license and public GitHub repo.
- Axis 2: PASS if installed as status-only primitive; FAIL if it rewires Stop/UserPrompt hooks without isolation.
- Axis 3: PASS, current and widely adopted.
- Recommended disposition: INSTALL behind disabled-by-default Option B flag, then compare against existing statusline/telemetry hooks.
- Rationale: strong operator observability value without deep execution authority if scoped to read-only/session data.

### `EveryInc/compound-engineering-plugin`

- Catalog source: `awesome-claude-code` Agent Skills.
- License: MIT.
- Stars: 16748.
- Axis-3 age+cpd band: 218d, pushed within 1 day, high sustained adoption.
- Axis 1: PASS.
- Axis 2: PASS for skill/command import; likely overlaps with memory and mistake-search workflows, so avoid wholesale enablement.
- Axis 3: PASS.
- Recommended disposition: INSTALL selected skills and commands only; cite full repo.
- Rationale: matches eee's learning-from-failures discipline and can enrich Option B evaluation without altering MCP substrate.

### `nizos/tdd-guard`

- Catalog source: `awesome-claude-code` Hooks.
- License: MIT.
- Stars: 2110.
- Axis-3 age+cpd band: 312d, pushed 5d, medium-high.
- Axis 1: PASS.
- Axis 2: PASS; narrow hook primitive useful for test-first or fail-fast evaluation lanes.
- Axis 3: PASS.
- Recommended disposition: INSTALL as disabled hook profile for projects with test suites.
- Rationale: low conceptual overlap with current safety hooks; it guards workflow quality rather than permission safety.

### `backnotprop/plannotator`

- Catalog source: `awesome-claude-code` Hooks.
- License: Apache-2.0.
- Stars: 5314.
- Axis-3 age+cpd band: 139d, pushed within 1 day, high.
- Axis 1: PASS.
- Axis 2: PASS if scoped to plan artifacts; avoid modifying global planning discipline.
- Axis 3: PASS.
- Recommended disposition: INSTALL as Option B plan-evaluation sidecar.
- Rationale: useful for parallel-evaluation runtime because it can mark plan deltas and assist cross-agent review.

### `trailofbits/skills`

- Catalog source: `awesome-claude-code` Agent Skills.
- License: CC-BY-SA-4.0.
- Stars: 5189.
- Axis-3 age+cpd band: 121d, pushed 4d, high.
- Axis 1: PASS-with-license-caveat; attribution and share-alike obligations must be preserved.
- Axis 2: PASS for security review skills; no need to install all skills.
- Axis 3: PASS.
- Recommended disposition: INSTALL/CITE selected security skills with explicit license note in manifest.
- Rationale: high-quality security audit capability; should complement existing gitleaks/semgrep/osv floors.

### `Piebald-AI/claude-code-system-prompts`

- Catalog source: `awesome-claude-code` Workflows and Knowledge Guides.
- License: MIT.
- Stars: 10196.
- Axis-3 age+cpd band: 177d, pushed within 1 day, high.
- Axis 1: PASS.
- Axis 2: PASS as cite-only diagnostic mirror; install-class not needed.
- Axis 3: PASS.
- Recommended disposition: CITE, not INSTALL.
- Rationale: valuable for prompt-change diffing and feature tracking, but not a runtime primitive.

### `matt1398/claude-devtools`

- Catalog source: `awesome-claude-code` Tooling.
- License: MIT.
- Stars: 3362.
- Axis-3 age+cpd band: 97d, pushed 1d, high.
- Axis 1: PASS.
- Axis 2: STUDY; devtools may overlap with existing observability/status tools.
- Axis 3: PASS.
- Recommended disposition: STUDY-PILOT.
- Rationale: likely useful, but install should wait for blast-radius review of hooks, UI, and telemetry surfaces.

### `davila7/claude-code-templates`

- Catalog source: `awesome-claude-code` Tooling.
- License: MIT.
- Stars: 27281.
- Axis-3 age+cpd band: 315d, pushed within 1 day, high.
- Axis 1: PASS.
- Axis 2: STUDY; template frameworks often duplicate local bootstrap discipline.
- Axis 3: PASS.
- Recommended disposition: CITE.
- Rationale: harvest patterns and examples, but do not install as active runtime scaffolder until template writes are sandboxed.

### `agent-sh/agentsys`

- Catalog source: `awesome-claude-code` Agent Skills; local CSV slug redirected from `avifenesh/agentsys`.
- License: MIT.
- Stars: 800.
- Axis-3 age+cpd band: 120d, pushed 19d, medium.
- Axis 1: PASS.
- Axis 2: PASS for selected lint/review tools; possible overlap with current agent and hook discipline.
- Axis 3: PASS-low.
- Recommended disposition: STUDY-PILOT.
- Rationale: useful if `agnix` checks agent configs more rigorously than current static validation.

### `agent-sh/agnix`

- Catalog source: `awesome-claude-code` Tooling.
- License: Apache-2.0.
- Stars: 241.
- Axis-3 age+cpd band: 105d, pushed within 1 day, medium despite lower stars.
- Axis 1: PASS.
- Axis 2: PASS; narrow agent-configuration linter fits Option B.
- Axis 3: STUDY-PILOT due star count, PASS due freshness and parent ecosystem.
- Recommended disposition: INSTALL as a pinned CLI if smoke probe confirms Windows support.
- Rationale: foundation-adjacent validator for `.claude/agents` and skill metadata.

### `lis186/ccxray`

- Catalog source: `awesome-claude-code` Tooling.
- License: MIT.
- Stars: 170.
- Axis-3 age+cpd band: 42d, pushed 2d, fresh-low.
- Axis 1: PASS.
- Axis 2: STUDY; likely observability overlap.
- Axis 3: STUDY-PILOT.
- Recommended disposition: STUDY-PILOT.
- Rationale: fresh diagnostic tool, but star count and maturity are below install threshold.

### `Astro-Han/claude-pace`

- Catalog source: `awesome-claude-code` Status Lines.
- License: MIT.
- Stars: 170.
- Axis-3 age+cpd band: 58d, pushed 14d, fresh-low.
- Axis 1: PASS.
- Axis 2: STUDY; statusline duplicate risk.
- Axis 3: STUDY-PILOT.
- Recommended disposition: CITE.
- Rationale: compare UX ideas against `claude-hud`; do not install both without a winner.

### `Piebald-AI/tweakcc`

- Catalog source: `awesome-claude-code` Tooling.
- License: MIT.
- Stars: 2014.
- Axis-3 age+cpd band: 299d, pushed within 1 day, medium-high.
- Axis 1: PASS.
- Axis 2: STUDY; any tool that tweaks Claude Code internals can collide with bootstrap rules.
- Axis 3: PASS.
- Recommended disposition: STUDY-PILOT.
- Rationale: useful for controlled experiments, but needs explicit permission-boundary review.

### `dyoshikawa/rulesync`

- Catalog source: `awesome-claude-code` Tooling.
- License: MIT.
- Stars: 1093.
- Axis-3 age+cpd band: 331d, pushed 1d, medium-high.
- Axis 1: PASS.
- Axis 2: PASS if used only to compare/sync rule files in an audit lane.
- Axis 3: PASS.
- Recommended disposition: INSTALL as pinned CLI or CITE if it writes too broadly.
- Rationale: useful for Option B multi-agent rule parity checks across Codex/Cursor/Gemini/Claude files.

### `vaporif/parry-guard`

- Catalog source: `awesome-claude-code` Hooks; local CSV slug was `vaporif/parry`.
- License: MIT.
- Stars: 39.
- Axis-3 age+cpd band: 87d, pushed 2d, low.
- Axis 1: PASS.
- Axis 2: STUDY; guard semantics may overlap with existing safety hooks.
- Axis 3: FAIL for install-class due adoption.
- Recommended disposition: CITE.
- Rationale: harvest policy ideas; do not install until adoption or tests mature.

### `aannoo/hcom`

- Catalog source: `awesome-claude-code` Hooks; local CSV slug was `aannoo/claude-hook-comms`.
- License: MIT.
- Stars: 278.
- Axis-3 age+cpd band: 298d, pushed 6d, medium-low.
- Axis 1: PASS.
- Axis 2: STUDY; hook communication can create hidden coupling.
- Axis 3: STUDY-PILOT.
- Recommended disposition: STUDY-PILOT.
- Rationale: potentially valuable for parallel-evaluation coordination, but must prove no secret/log leakage.

### `tombii/better-ccflare`

- Catalog source: `awesome-claude-code` Tooling.
- License: MIT.
- Stars: 216.
- Axis-3 age+cpd band: 228d, pushed 6d, medium-low.
- Axis 1: PASS.
- Axis 2: STUDY; likely UX/observability overlap.
- Axis 3: STUDY-PILOT.
- Recommended disposition: CITE.
- Rationale: use as comparative design reference, not active runtime primitive.

### `carlrannaberg/claudekit`

- Catalog source: `awesome-claude-code` Tooling.
- License: MIT.
- Stars: 708.
- Axis-3 age+cpd band: 308d, pushed 45d, medium.
- Axis 1: PASS.
- Axis 2: STUDY; author ecosystem already represented by context-mode.
- Axis 3: PASS-low.
- Recommended disposition: STUDY-PILOT.
- Rationale: avoid duplicate framework adoption; extract only missing primitives.

### `fcakyon/claude-codex-settings`

- Catalog source: `awesome-claude-code` Agent Skills.
- License: Apache-2.0.
- Stars: 685.
- Axis-3 age+cpd band: 310d, pushed 6d, medium.
- Axis 1: PASS.
- Axis 2: PASS as cite/reference; likely redundant with installed codex lifecycle.
- Axis 3: PASS-low.
- Recommended disposition: CITE.
- Rationale: use for cross-agent settings examples; no install unless it contains a unique command or validator.

### `automazeio/ccpm`

- Catalog source: `awesome-claude-code` Workflows and Knowledge Guides.
- License: MIT.
- Stars: 8109.
- Axis-3 age+cpd band: 269d, pushed 58d, high but cooling.
- Axis 1: PASS.
- Axis 2: STUDY; project-management frameworks can overtake existing governance docs.
- Axis 3: PASS.
- Recommended disposition: CITE.
- Rationale: good process reference; not needed as active runtime unless Option B needs PM-specific agents.

### `SuperClaude-Org/SuperClaude_Framework`

- Catalog source: `awesome-claude-code` Tooling.
- License: MIT.
- Stars: 22787.
- Axis-3 age+cpd band: 327d, pushed 18d, high.
- Axis 1: PASS.
- Axis 2: STUDY; broad framework duplicate risk.
- Axis 3: PASS.
- Recommended disposition: CITE.
- Rationale: broad high-adoption framework, but wholesale install would conflict with zero-self-inventing plus existing plugin stack.

### Rejected Claude Code-side candidates

- `eyaltoledano/claude-task-master`: 27140 stars, license `NOASSERTION`; REJECT-INSTALL until license is explicit and overlap with existing task workflow is justified.
- `smtg-ai/claude-squad`: 7463 stars, AGPL-3.0; REJECT-INSTALL for license and competing multi-agent harness risk.
- `rullerzhou-afk/clawd-on-desk`: 2475 stars, AGPL-3.0; REJECT-INSTALL despite freshness.
- `slopus/happy`: 20716 stars, MIT; REJECT for Option B because it appears to be a competing agent/harness rather than extension primitive.
- `ruvnet/ruflo`: 51067 stars, MIT; REJECT pending separate trust/adoption anomaly review and concrete runtime fit.

## Candidate table: MCP servers and agentic-pattern repos

| # | Repo slug | License | Stars | Axis-3 age+cpd band | Gate | Disposition |
|---:|---|---|---:|---|---|---|
| 1 | `TencentCloudADP/youtu-graphrag` | NOASSERTION | 1176 | 256d age; pushed 78d; medium | FAIL-license | CITE/STUDY-PILOT |
| 2 | `onestardao/WFGY` | NOASSERTION | 1748 | 345d age; pushed <1d; medium-high | FAIL-license | CITE |
| 3 | `ZiwayZhao/agent-coworker` | MIT | 17 | 55d age; pushed 41d; low | STUDY-PILOT | CITE |
| 4 | `RioTheGreat-ai/agentfund-mcp` | none detected | 0 | 102d age; pushed 102d; low | FAIL | REJECT |
| 5 | `RioTheGreat-ai/agentfund-skill` | none detected | 12 | 102d age; pushed 102d; low | FAIL | REJECT |
| 6 | `openclaw/openclaw` | MIT | 371899 | 172d age; pushed <1d; anomalous-very-high | STUDY-PILOT | CITE |
| 7 | `nickzsche/aip-identity` | unavailable in batch | unknown | pattern source only | STUDY-PILOT | CITE |

### `TencentCloudADP/youtu-graphrag`

- Catalog source: `awesome-agentic-patterns` schema-guided graph retrieval pattern.
- License: NOASSERTION.
- Stars: 1176.
- Axis-3 age+cpd band: 256d, pushed 78d, medium.
- Axis 1: FAIL for install-class until license is explicit.
- Axis 2: PASS as architecture reference for schema-guided GraphRAG.
- Axis 3: STUDY-PILOT; not fresh enough for direct install without more evidence.
- Recommended disposition: CITE/STUDY-PILOT.
- Rationale: potentially useful to compare against Graphiti/Qdrant memory pipeline, but license blocks runtime import.

### `onestardao/WFGY`

- Catalog source: `awesome-agentic-patterns` reliability problem map.
- License: NOASSERTION.
- Stars: 1748.
- Axis-3 age+cpd band: 345d, pushed within 1 day, medium-high.
- Axis 1: FAIL for install-class due no license.
- Axis 2: PASS as a reliability taxonomy and eval checklist.
- Axis 3: PASS as active reference.
- Recommended disposition: CITE.
- Rationale: may enrich failure-mode taxonomy, but should not be installed or copied.

### `ZiwayZhao/agent-coworker`

- Catalog source: `awesome-agentic-patterns` black-box skill invocation.
- License: MIT.
- Stars: 17.
- Axis-3 age+cpd band: 55d, pushed 41d, low.
- Axis 1: PASS.
- Axis 2: PASS as protocol idea, not install primitive.
- Axis 3: FAIL for install-class; too low adoption.
- Recommended disposition: CITE.
- Rationale: schema-only skill invocation is relevant, but the repo is too immature for Option B runtime install.

### `RioTheGreat-ai/agentfund-mcp`

- Catalog source: `awesome-agentic-patterns` agentfund crowdfunding.
- License: none detected.
- Stars: 0.
- Axis-3 age+cpd band: 102d, pushed 102d, low.
- Axis 1: FAIL.
- Axis 2: FAIL; finance/escrow MCP is not core to coding runtime.
- Axis 3: FAIL.
- Recommended disposition: REJECT.
- Rationale: no adoption, no license, high-risk domain.

### `openclaw/openclaw`

- Catalog source: `awesome-agentic-patterns` sandboxed-tool-authorization via redirected `clawdbot/clawdbot` source.
- License: MIT.
- Stars: 371899.
- Axis-3 age+cpd band: 172d, pushed within 1 day, anomalous-very-high.
- Axis 1: PASS license, but star count is anomalous enough to require trust review.
- Axis 2: STUDY; authorization policy patterns are relevant, but active install may duplicate safety hooks.
- Axis 3: STUDY-PILOT, not PASS, until repo trust and release provenance are checked.
- Recommended disposition: CITE.
- Rationale: harvest tool-policy ideas only after manual provenance review.

## Foundation CLI / PINS candidates

| # | Repo slug | License | Stars | Axis-3 age+cpd band | Gate | Disposition |
|---:|---|---|---:|---|---|---|
| 1 | `casey/just` | CC0-1.0 | 33644 | 3620d age; pushed <1d; mature-high | PASS | INSTALL/PIN |
| 2 | `sharkdp/hyperfine` | Apache-2.0 | 28110 | 3044d age; pushed 15d; mature-high | PASS | INSTALL/PIN |
| 3 | `Wilfred/difftastic` | MIT | 25303 | 2705d age; pushed 5d; mature-high | PASS | INSTALL/PIN |
| 4 | `mikefarah/yq` | MIT | 15393 | 3884d age; pushed <1d; mature-high | PASS | INSTALL/PIN |
| 5 | `charmbracelet/glow` | MIT | 25207 | 2384d age; pushed 19d; mature-high | PASS | INSTALL/PIN |
| 6 | `ClementTsang/bottom` | MIT | 13330 | 2452d age; pushed <1d; mature-high | PASS | INSTALL/PIN |
| 7 | `bootandy/dust` | Apache-2.0 | 11692 | 2983d age; pushed 83d; mature | PASS | INSTALL/PIN |
| 8 | `dalance/procs` | MIT | 6042 | 2664d age; pushed 1d; mature | PASS | INSTALL/PIN |
| 9 | `ducaale/xh` | MIT | 7806 | 2073d age; pushed 4d; mature | PASS | INSTALL/PIN |
| 10 | `astral-sh/uv` | Apache-2.0 | 84925 | 956d age; pushed <1d; mature-very-high | PASS | PIN |
| 11 | `tree-sitter/tree-sitter` | MIT | 25369 | 4574d age; pushed 3d; mature-high | PASS | PIN |
| 12 | `ast-grep/ast-grep` | MIT | 13800 | 1414d age; pushed 2d; mature-high | PASS | PIN |
| 13 | `BurntSushi/ripgrep` | Unlicense | 63764 | 3718d age; pushed 77d; mature-core | ALREADY-INSTALLED | PIN |
| 14 | `sharkdp/fd` | Apache-2.0 | 42984 | 3293d age; pushed 13d; mature-core | ALREADY-INSTALLED | PIN |
| 15 | `sharkdp/bat` | Apache-2.0 | 58889 | 2947d age; pushed 3d; mature-core | ALREADY-INSTALLED | PIN |
| 16 | `eza-community/eza` | EUPL-1.2 | 21782 | 1022d age; pushed 35d; mature-core | ALREADY-INSTALLED | PIN |
| 17 | `jqlang/jq` | NOASSERTION | 34730 | 5050d age; pushed 3d; mature-core | ALREADY-INSTALLED | PIN |
| 18 | `junegunn/fzf` | MIT | 80256 | 4590d age; pushed <1d; mature-core | ALREADY-INSTALLED | PIN-UPGRADE |
| 19 | `dandavison/delta` | MIT | 30797 | 2517d age; pushed 48d; mature-core | ALREADY-INSTALLED | PIN-UPGRADE |
| 20 | `jesseduffield/lazygit` | MIT | 77944 | 2919d age; pushed 2d; mature-core | ALREADY-INSTALLED | PIN-UPGRADE |

### New PINS recommendations

- Add `casey/just`: reproducible command runner; good replacement for ad hoc scripts in Option B harness experiments.
- Add `sharkdp/hyperfine`: benchmark harness for CLI/runtime latency, token-economics wrappers, and search-tool comparisons.
- Add `Wilfred/difftastic`: structural diff tool; complements `delta` for AST-aware review.
- Add `mikefarah/yq`: YAML/TOML/JSON manifest surgery; useful for `.mcp.json`, settings, workflow YAML, and plugin metadata.
- Add `charmbracelet/glow`: local Markdown renderer for AGENTS/CLAUDE/manifest review in terminal.
- Add `ClementTsang/bottom`: portable process/system monitor; useful during MCP daemon tests.
- Add `bootandy/dust`: disk usage triage for cache and plugin trees.
- Add `dalance/procs`: process tree inspection; useful for stuck MCP/Claude/Codex child processes.
- Add `ducaale/xh`: friendlier HTTP client than curl for local MCP/gateway smoke probes.
- Add `astral-sh/uv`: already likely in ecosystem; ensure PINS records exact version and install channel.
- Add `tree-sitter/tree-sitter`: parser substrate for structural code intelligence and diffs.
- Add `ast-grep/ast-grep`: already referenced in AGENTS; ensure PINS records exact version and channel.

### Existing PINS hygiene

- `fzf` is installed but stale per manifest; prioritize upgrade pin.
- `delta` is installed but stale per manifest; prioritize upgrade pin.
- `lazygit` is installed but stale per manifest; prioritize upgrade pin.
- `rg`, `fd`, `bat`, `eza`, `jq`, `zoxide`, and `gh` should remain pinned; prefer Z-local portable binaries over C:-resident WinGet/Chocolatey where feasible.
- `jq` has GitHub `NOASSERTION` despite practical permissive licensing history; record license evidence from release/source docs before using as CR-1 authority.
- `eza` EUPL-1.2 is acceptable for binary use, but note stronger copyleft than MIT/Apache when vendoring.

## Install sequencing proposal

- Batch A, low-risk CLI pins: `just`, `hyperfine`, `difftastic`, `yq`, `glow`, `bottom`, `dust`, `procs`, `xh`.
- Batch B, Claude Code read-only/status: `claude-hud`, `ccxray` study, `claude-pace` cite comparison.
- Batch C, governance hooks: `tdd-guard`, `plannotator`, `agnix`, `rulesync`.
- Batch D, skills: selected `compound-engineering-plugin` and `trailofbits/skills`.
- Batch E, cite-only research: `claude-code-system-prompts`, `youtu-graphrag`, `WFGY`, `agent-coworker`, `openclaw`.

## Rejection reasons to carry forward

- No detected license blocks install-class even when stars are strong.
- AGPL-3.0 blocks runtime install unless the operator explicitly accepts copyleft network/process implications.
- Broad competing harnesses should be rejected unless a single primitive can be isolated.
- Low-star MCPs in payment/escrow or identity domains require stronger provenance than ordinary devtools.
- Statusline/telemetry tools must not all be installed together; pick one primary after smoke/eval.

## Commands run

- `Get-ChildItem` against both catalog repos.
- `git -C <catalog> rev-parse HEAD`.
- `rg --files` over both catalogs.
- `Import-Csv THE_RESOURCES_TABLE.csv` to inspect schema and candidate rows.
- `rg -n "github.com/..."` across `awesome-agentic-patterns` patterns and public data.
- `Get-Content docs/sota-installed-manifest.md -TotalCount 260` to identify installed baseline and Section 10 pins.
- `gh api repos/<slug>` for selected Claude Code, MCP, agentic-pattern, and foundation CLI metadata.

## Recommended next actions

- Create or update `PINS.json` with Batch A plus existing stale pin upgrades.
- Run per-repo install probes for `claude-hud`, `tdd-guard`, `plannotator`, `agnix`, and `rulesync`.
- Run license due diligence before any import from `trailofbits/skills`, `youtu-graphrag`, `WFGY`, or `openclaw`.
- For each INSTALL candidate, run the normal convergence gate with direct repo README/install docs, release tags, Windows support, smoke probe, and uninstall path.
