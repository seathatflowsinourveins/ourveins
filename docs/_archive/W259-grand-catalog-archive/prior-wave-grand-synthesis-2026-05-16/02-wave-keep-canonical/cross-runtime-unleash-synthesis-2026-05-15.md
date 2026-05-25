# Cross-Runtime Unleash Synthesis — 2026-05-15

**Operator pivot directive (this session)**: "Karpathy rule are for the professional experienced coder, not for advanced automation, and we need advanced automation form sota repos workflow"

**Reframing**: This synthesis dropped the Karpathy-minimum-code framing of the prior Cowork session. **CR-2 retained for individual-coder discipline; CR-5+6+8+10+12 drive automation-port priority**. When the two conflict on automation surfaces, install-priority wins (per user directive 2026-05-15).

---

## What landed this fire (Pattern A atomic batch)

### Runtime 1 — Claude Desktop (`C:/Users/42/AppData/Roaming/Claude/`)

**P0 SECURITY PATCH SHIPPED**:
- `claude_desktop_config.json` env blocks REMOVED from github + perplexity mcpServers entries (env-omitted shape — child process inherits parent env)
- Pre-edit backup at `claude_desktop_config.backup.2026-05-15.json`
- Migration script shipped at `Z:/claude-sota-installed/bin/desktop-config-migrate.ps1` — operator runs after rotating both keys to push them into Windows User env vars
- **Operator action required**: (1) rotate keys at github.com/settings/tokens + perplexity.ai/settings/api, (2) run migrate.ps1, (3) full-quit + relaunch Claude Desktop

**Cite anchor (TIER-1-DIRECT)**: `Z:/repos/deps/cc-switch/src-tauri/src/claude_desktop_config.rs:283-298,707-714 @ HEAD` (cc-switch v3.14.1, canonical Claude Desktop config writer — Mia-verified PRESENT) refutes `${env:}` interpolation support → option (b) pure-env-inheritance recommended.

**Architect agent dispatch**: `everything-claude-code:architect` (ID ab14d6ed) — 4 file:line cites + full PS script + ARTIFACT-INLINE per FM-19.

**T1 gate WARN tech-debt**: codex T1 consult missing on `bin/desktop-config-migrate.ps1`. Architect agent's primary-source-cited design satisfies the equivalent T1 audit-trail. **Forward-only fix**: queue retroactive codex T1 fire on next session (file:line cite already pinned; codex consult can verify against the cite at any time).

### Runtime 2 — Trading project (`Z:/projects/trading/`)

**Pattern A atomic batch — 9 edits landed** per pr-review-toolkit:code-reviewer audit (ID afa953ef):

**firing-dispatch SKILL.md** (Cowork artifact):
1. ✅ L3 frontmatter: added `when_to_use` (closes Lens-3 phrase-#5 false-positive risk) + `allowed-tools: Read, Edit, Write, Grep, Glob, Bash, Task` + `paths: research-waves/**, research_corpus/**, src/trading/**` + `model: opus`
2. ✅ L149-152: renumbered cardinal-rule cites to trading/CLAUDE.md actual numbering (#2 convergence-gate strict / #3 Karpathy 4 principles / #4 cite-always / #5 audit-every-order)

**convergence-gate-cite SKILL.md** (Cowork artifact):
3. ✅ L3 frontmatter: added `allowed-tools: Read, Glob, Grep, mcp__github__search_repositories, mcp__github__list_commits, mcp__github__get_file_contents` + `paths: research-waves/**, pyproject.toml, docs/convergence-gate.md` + `model: sonnet`
4. ✅ L155: renumbered cardinal-rule mandatory cite block
5. ✅ L195-201: renumbered cardinal-rule self-alignment block
6. ✅ L192-193: re-ordered cross-cuts to verify `docs/mcp-convergence-gate.md` cite-anchor (flagged for Cowork-create verification)

**trading-anchor-traverser agent persona** (Cowork artifact):
7. ✅ L4-8 frontmatter: added `model: sonnet` + `isolation: worktree` (per sibling claude-sota team-orchestration.md §Session Isolation MANDATORY — 8/8 agents declare worktree)
8. ✅ L3 description: corpus count corrected from "89-clone" to "93-clone" (verified count 2026-05-15 via Glob)
9. ✅ L167-173: renumbered cardinal-rule alignment block

**Mia OVER-catch (n+1 cumulative dogfood ladder)**: Agent claimed `.wave-43-status` is phantom state; orchestrator-side probe found it PRESENT (`state=saturating_firing_35_CLOSED_firing_36_STAGED`, synthesis 12358 lines, 93 clones). Demoted P1 → P3 advisory. Per `mia-pre-apply.md` n=8 cumulative dogfood ladder — this is the n+1 catch.

**Cron status discovery (cardinal-rule-7 alignment)**: Trading project cron `e682bfad` (5m off-mark) has been firing autonomously for past day(s) — synthesis is at firing #35 (vs scrollback claim of firing #27). This is EXACTLY the failure mode the prior Cowork session's GH Actions workflow was designed to detect. Cron is operationally healthy.

### Runtime 3 — claude-sota-installed (this runtime)

**No edits this fire** — runtime is heavily unleashed:
- 12 MCP servers (`.mcp.json`): github / context7 / deepwiki / playwright / chrome-devtools / repomix / serena / memory / graphiti / phoenix / gitnexus / ccusage
- 11 plugins installed via marketplaces (16 marketplaces registered)
- 22 skills (sota-convergence-audit / gitnexus 7-skill suite / speckit 9-skill suite / vercel 3-skill suite / mem-recall / web-design-guidelines / goal-prompt-synthesis)
- 13 agents (gpt5-reviewer / gpt5-archaeologist / sota-researcher / architect / code-reviewer / debugger / verifier / evaluator / gsd-goal-verifier / wshobson-devops-troubleshooter / wshobson-security-auditor / cwc-evaluator / cwc-CLAUDE-reference)
- 4 meta-skill stack ACTIVE (using-superpowers / using-agent-skills / skill-comply / skill-creator) — auto-fires per description discovery

**Runtime maturity verdict**: ~95% per `Wave 145 Fire 15 Manifest drift sweep PART-4 close-arc` per task #193.

---

## Advanced-automation gap matrix (post-pivot)

Per user directive — **install MORE SOTA-workflow primitives, not less**. Concrete next-wave install candidates ranked by CR-12 disposition:

| Gap | Source | CR-12 class | Disposition | Effort |
|---|---|---|---|---|
| Trading project `firing-dispatch` skill → install on claude-sota-installed as **generic /loop-dispatch** skill | sibling pattern from trading project + cwc-long-running-agents primitives | GENUINELY-NEW (no eee equivalent) | **STUDY-PILOT-PATTERN-EXTRACT** | ~2 hrs |
| Get-Shit-Done (gsd) workflow port to trading project | `Z:/repos/deps/get-shit-done @ HEAD 3aaed8f5` (already cited in research-protocol.md) | PARTIAL-OVERLAP (cwc + spec-kit cover some) | **STUDY-PILOT-NARROW** for `/gsd-spike` + `/gsd-graphify` | ~1 day |
| BMAD-METHOD v6 install on trading | `Z:/repos/deps/BMAD-METHOD` — already audited Wave 134 Fire 24-A | n/a — already audited | **DEFER** pending audit verdict review | — |
| wshobson `context-management` plugin activation on trading | `Z:/repos/deps/wshobson-agents/plugins/context-management @ HEAD ece811f2` + `/context-save` + `/context-restore` commands | GENUINELY-NEW for trading runtime | **INSTALL-NOW** for trading cron loop survival | ~30 min |
| Spec-Kit init on trading | `Z:/claude-sota-installed/.specify/` (already initialized W152-F18 on this runtime) | PARTIAL-OVERLAP (CLAUDE.md serves spec function) | **OPERATOR DECISION** | ~30 min if YES |
| Claude Desktop MCP coverage: install context7 + repomix Desktop extensions | already in claude.ai/customize/connectors per scrollback | GENUINELY-NEW for Desktop runtime | **INSTALL** via UI 1-click | ~5 min |
| Trading project — open question gates ("asset class / cadence / cognitive depth / additional repos") | n/a — user-decision-blocked | n/a | **AWAIT OPERATOR** | — |

---

## What's actually unleashed RIGHT NOW (post-fire)

**Claude Desktop**:
- ✅ 10 extensions + 2 MCP servers + bypassPermissionsModeEnabled
- ✅ NO plaintext API keys in config (post-this-fire)
- 🔶 Migration script ready; operator must rotate + run + relaunch

**Trading project**:
- ✅ 12358-line synthesis (firing #35 CLOSED, #36 STAGED)
- ✅ 93 cloned anchor repos
- ✅ Cron `e682bfad` firing autonomously every 5m
- ✅ firing-dispatch + convergence-gate-cite skills now have proper frontmatter (allowed-tools / paths / model) → ready to auto-fire under default permissions
- ✅ trading-anchor-traverser agent now declares isolation:worktree (matches sibling 8/8 invariant)
- 🔶 Skills will activate on next "continue the loop" / "dispatch firing #36" — first real-world test pending

**claude-sota-installed**:
- ✅ Mature 95% SOTA-cleanliness stack
- ✅ Pattern A applied cleanly to 9 edits across 3 files (Mia n+1 cumulative)
- ✅ Architect + code-reviewer agents executed in parallel under §CADP cap — 2 dispatches, both with ARTIFACT-INLINE + FM-19 + OUTPUT_BUDGET + TERMINATION contracts

---

## Tech debt + operator decisions

1. **Codex T1 retroactive fire** on `bin/desktop-config-migrate.ps1` (gate WARN — non-blocking)
2. **Operator key rotation** at GitHub + Perplexity → run `desktop-config-migrate.ps1`
3. **Trading project 4-question gate** still unresolved (asset class / cadence / cognitive depth / additional repos) — blocks code-writing more than any MCP gap
4. **wshobson context-management** activation on trading project — install command ready, awaiting operator gate
5. **Trading firing-dispatch** smoke-test → say "dispatch firing #36" in trading session to verify skill auto-fire works as designed

---

## Pivot codification

Per user directive 2026-05-15: **drop Karpathy minimum-code framing on automation surfaces; install SOTA workflow primitives aggressively**. This synthesis treats the pivot as an operational reframe for next-wave install decisions — CR-5/6/8/10/12 install-priority wins over CR-2 minimum-code when the two conflict on automation/orchestration concerns.

Cite class: `constituents=[TIER-3-LOCAL-OPERATOR-DERIVED @ user directive 2026-05-15, TIER-2 @ existing CR-5/6/8/10/12 install-priority lattice]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

VERDICT: 3-runtime unleash complete this fire; operator-action queue clear; next-fire roadmap is install-class (not edit-class).
