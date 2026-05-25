# W314 Stream E — Adversarial Audit of THIS Runtime's Architecture

**Date**: 2026-05-19
**Reviewer role**: Skeptical second-opinion (NOT orchestrator)
**Scope**: Question rules, repo selection, status-block hygiene, wave-versioning, wiring drift, hook compliance
**Method**: Read-only; cite evidence (file:line OR SHA); ≥3 substantive concerns mandatory
**Operator directive**: "questioning your architecture itself" + "VS CCBP-shan / enhance all rules"

---

## §1 Stale Rules Report (R1-R5)

### R1 — "Install primitives only from trusted plugins/skills/agents"
**Verdict: DRIFT — definition of "trusted" is implicit, not codified.**

`CLAUDE.md:18` defines validity = trusted-source + active-scope + commit-SHA-freshness + post-install verification. But "trusted" is never **enumerated** — the only enumeration lives in `settings.json:259-391` (11 marketplaces). A new contributor cannot tell which sources qualify as "trusted" without reverse-engineering the `extraKnownMarketplaces` block. Evidence: `claude-codex-settings` (line 326), `gitnexus-marketplace` (line 368, blocked per W312-C), and `antigravity-awesome-skills` (line 344) are all single-maintainer repos — yet none are flagged in R1.

**Recommendation**: Append to R1 an **explicit trust-tier ladder** (Anthropic-owned / org-named / individual-curated) with the marketplace mapping moved into a footnote pointer.

### R2 — "Hooks may only be upstream-plugin hooks OR direct upstream-CLI invocations"
**Verdict: HOLDS, but exception clause is creep-prone.**

`CLAUDE.md:19` allows "documented bug-patch shims ≤2 KB cite-anchored to a specific anthropics/claude-code GitHub issue". Current sanctioned exception: `.claude/hooks/context-mode-cache-heal.mjs` for issue #46915. The clause has held to one exception — but the **cite-anchor freshness check is implicit**. There is no rule that the bug-patch shim must be retired when the upstream issue closes. The issue is "verified open 2026-04-12" — if it closed 2026-04-15, the shim is now dead-code masquerading as live. **No automated check exists.**

**Recommendation**: Add to R2: "Bug-patch shims MUST be re-verified against the cited issue every N waves (cadence: quarterly); a closed-upstream issue auto-triggers retire-or-defend."

### R3 — "Subagents = installed upstream agents OR documented subagent system"
**Verdict: DRIFT — "agent teams" is a *de-facto* primitive but not codified in R3.**

`CLAUDE.md:12-13` extensively documents agent-teams (`/team-spawn`, `TeamCreate`, `SendMessage`, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`), and the W269 mandate threats serial-Agent dispatch as a fail. But R3 only cites `https://docs.anthropic.com/en/docs/claude-code/sub-agents` — agent-teams is documented at the **separate** `https://code.claude.com/docs/en/agent-teams` page (referenced in `enabledPlugins` line 251). The text "subagent system" reads ambiguously — does it cover `Agent` tool only, or also `TaskCreate`/`SendMessage`?

**Recommendation**: Tighten R3 to "**Subagents = `Agent` tool subagents OR `TaskCreate`/`TeamCreate` agent-teams, per the two distinct Anthropic docs**" with both URLs cited.

### R4 — ".claude/rules/ permitted ONLY if upstream-plugin-shipped OR operator-curated path-gated via SKILL.md"
**Verdict: HOLDS post-W308-REVERSAL, but is being honored too quietly.**

`CLAUDE.md:21` says the W299-A REVERSAL is valid (Anthropic docs at `https://code.claude.com/docs/en/claude-directory` DO document `.claude/rules/` as canonical). `self_invented_count: 0` is preserved. **However**, no SKILL.md in the runtime currently path-gates a `.claude/rules/*.md` entry — the operator could legitimately add one but the **workflow is undocumented**. If the operator does add a path-gated rule next wave, where does it live? What's the SKILL.md frontmatter contract?

**Recommendation**: Either add a worked example pointer to R4 (e.g. "see `.claude/skills/<example>/SKILL.md` for path-gated-rule template"), or add an empty `.claude/rules/.gitkeep` with a README pointer to the SKILL.md contract.

### R5 — "Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts"
**Verdict: DRIFT — sandbox-coverage is incomplete vs CCBP best practice.**

CCBP `claude-settings.md:446-461` documents a `sandbox` block with `sandbox.enabled`, `sandbox.failIfUnavailable`, `sandbox.allowUnsandboxedCommands`, `sandbox.excludedCommands`. **The runtime's `settings.json` has ZERO `sandbox` configuration** — every key from CCBP §sandbox is absent. The `permissions.deny[]` array (lines 66-84) covers credential files, but not the `sandbox.enabled: true` enterprise-grade defense-in-depth.

Combined with `permissions.defaultMode: "bypassPermissions"` (line 86) and `skipDangerousModePermissionPrompt: true` (line 399), the runtime is **operating with the loosest permission model that CC supports**. This may be appropriate for a single-operator local install, but R5's "Safety boundaries via Claude Code permissions + sandboxing" is **half-implemented** — permissions yes, sandboxing no.

**Recommendation**: Either enable `sandbox.enabled: true` + `sandbox.excludedCommands: [...]` per CCBP example, or **explicitly document in R5 that single-operator local installs intentionally disable sandbox** with the trade-off rationale.

---

## §2 Over-Engineering Report

### Pattern: 6-tier memory stack (T1-T6)
**Verdict: SIMPLIFY — collapse to 3 tiers.**

Evidence (`CLAUDE.md:35`): T1 hindsight ✓ · T2 split (memory plugin only; .mcp.json memory disabled) · T3 cognee ✓ (cite **VERIFIED MISSING on disk**, AI-W312-A-7 still open) · T4 graphiti **✗ RETIRED** · T5 langfuse ✓ · T6 basic-memory ✓.

**Net active**: T1 + T2-partial + T3-with-cite-broken + T5 + T6 = effectively 4 tiers, two of which (T3 cognee + T5 langfuse) are not memory-stores but orchestration substrates (GraphRAG + traces). The "6-tier" framing is **wave-number-inflation theater** — the runtime really has:

- **Episodic vector recall**: hindsight (T1) — primary
- **Markdown canonical ledger**: basic-memory (T6) — primary
- **Traces/observability**: langfuse (T5) — secondary, NOT memory
- **Cold-tier GraphRAG**: cognee (T3) — provisional, cite broken
- **Disabled/retired**: T2 mcp-memory, T4 graphiti

**Recommendation**: Rename tiers as **M1 vector + M2 markdown + M3 graph (provisional)** with langfuse moved to a separate "Observability" line. Drop the "T6" wave-versioning. The current 6-tier framing makes the runtime look more complex than it is.

### Pattern: 4-mode parallel-execution stack
**Verdict: KEEP, but `superpowers:dispatching-parallel-agents` should be the canonical surface.**

`CLAUDE.md:12` lists 4 modes (subagents/agent-teams/worktrees/background sessions). All 4 are anthropic-documented. **However**, W312-D found 29% silent serial-Agent fallback on multi-stream contexts — the **mode-selection mental model is too rich for the parent orchestrator to use reliably**. The W269 mandate now forces "2+ Agent calls in 1 assistant message" as the discipline. **The 4-mode taxonomy is technically correct but operationally a single discipline ("fan out via Agent tool, in parallel").**

**Recommendation**: KEEP the 4-mode taxonomy in CLAUDE.md but add a **"default mode = subagents via parallel Agent calls"** sentence that reduces choice paralysis.

### Pattern: PostToolUseFailure hook (settings.json:158-168)
**Verdict: KEEP — but the inline PowerShell script is at the **edge** of cardinal-rule-2.**

The hook body is 290 chars of inline PowerShell (`ConvertFrom-Json` + match + JSON output). It's a **direct-CLI invocation** (powershell.exe + -Command), which IS cardinal-rule-2 compliant. But the **complexity is creeping** — at some point this should move to a documented bug-patch shim per R2 exception clause.

### Pattern: 11 marketplace registrations × 67 plugin entries
**Verdict: SIMPLIFY — audit + retire false-enabled-plugins.**

settings.json `enabledPlugins` has 67 entries with 30 set to `false`. Each `false` entry still **costs preload-budget at marketplace-resolve time** (the marketplace fetch happens regardless of enabled-state). **Recommendation**: remove the `false` entries entirely from `enabledPlugins` — they should default to off and not be enumerated.

---

## §3 Missing Rules Report (proposed R6+)

### R6 (proposed): Multi-MCP cascade governance
**Anchor**: `https://docs.anthropic.com/en/docs/claude-code/mcp` + sca-v6 Δ1 + W297 ship-decision-B.
**Rationale**: Currently buried in `sota-convergence-audit` SKILL.md §1 (cost-bounded multi-MCP cascade, Tier-0/1/2/3 fallback ladder). This pattern is **runtime-wide** but only cited inside the SCA skill. A new skill that does discovery without invoking SCA can silently single-source from GitHub.

**Proposed text**: "**Discovery operations MUST fan out across ≥4 distinct MCP families** before producing a recommendation — single-source discovery inherits GitHub popularity bias and is forbidden for any T1/T2 adoption candidate."

### R7 (proposed): Live-state probe before any MCP-call against a named incumbent
**Anchor**: sca-v6 §1.5 LIVE STATE PROBE + W307 row #27 Portkey anti-pattern.
**Rationale**: Currently a sca-v6 Δ1 (in SKILL.md only). The "named-but-not-deployed" failure mode is **runtime-general** — any skill that probes "is X installed" without a live-state check inherits the failure.

**Proposed text**: "**Before recommending duplication-against-incumbent, the incumbent MUST be probed live** (HTTP for HTTP MCPs, port-check for stdio MCPs, tool-listing for plugin primitives) — text-mention in settings.json is insufficient evidence of deployment."

### R8 (proposed): Stop-hook codex review-gate as a runtime invariant
**Anchor**: `https://docs.anthropic.com/en/docs/claude-code/hooks` Stop hook + W280a + W312-A.1.
**Rationale**: Currently plugin-shipped only (`.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:24-37`). If the codex plugin is uninstalled or the SHA drifts, the gate silently disappears. CLAUDE.md L40 claims it auto-fires; but the **claim has no R-level rule** binding it to runtime invariants.

**Proposed text**: "**Cross-model adversarial-review gate at session-end is REQUIRED**. Implementation MAY be plugin-shipped (current: `openai-codex@1.0.4`) but the invariant MUST hold — gate-absence is a ship-blocker." Combined with: "**Plugin SHA-drift verification** for review-gate-providing plugins MUST run on `/plugin update` and on session-start."

### R9 (proposed): Parallel-ratio target as a measurable invariant
**Anchor**: `https://code.claude.com/docs/en/headless` + W312-D F1.
**Rationale**: Currently embedded in W269 mandate prose ("Target parallel_ratio ≥0.7"). It is a **measurable invariant**, not just a guideline. Without telemetry it cannot be enforced.

**Proposed text**: "**Parallel-ratio per multi-stream session MUST be ≥0.7**. Measurement: count(parallel Agent batches) / count(Agent dispatches in multi-stream contexts). Sessions below 0.7 require a recorded rationale."

---

## §4 Marketplace Audit (per-marketplace)

| Marketplace | Source | Verdict | Rationale |
|---|---|---|---|
| `claude-plugins-official` | anthropics/claude-plugins-official | **KEEP** | Anthropic-owned canonical |
| `openai-codex` | openai/codex-plugin-cc | **KEEP** | OpenAI-owned canonical (cross-model gate provider) |
| `everything-claude-code` | affaan-m/everything-claude-code | **REVIEW** | Single-maintainer "everything" kitchen-sink (`@2.0.0-rc.1` per CLAUDE.md L21). RC channel is ship-risk for production discipline |
| `skills` | anthropics/skills | **KEEP** | Anthropic-owned |
| `knowledge-work-plugins` | anthropics/knowledge-work-plugins | **KEEP** | Anthropic-owned |
| `claude-plugins-community` | anthropics/claude-plugins-community | **KEEP** | Anthropic-owned |
| `financial-services` / `healthcare` / `life-sciences` | anthropics/* | **REVIEW** | Anthropic-owned BUT none enabled — preload-budget waste; could drop from extraKnownMarketplaces until needed |
| `addy-agent-skills` | addyosmani/agent-skills | **KEEP** | Named-individual but Anthropic-DevRel-adjacent (Addy Osmani) |
| `context-mode` | mksglu/context-mode | **REVIEW** | Single-maintainer ELv2 license (noted line 3 of .mcp.json) — license drift risk per sca-v6.1 D14 |
| `claude-settings` | fcakyon/claude-codex-settings | **RETIRE-OR-DEFEND** | Single-maintainer, NO plugins from this enabled (line 216 intelligent-compact:false). Why is it still registered? |
| `anthropic-agent-skills` | anthropics/skills | **DEDUPE** | Duplicates the `skills` marketplace above (lines 278-282 vs 332-336 are the SAME repo) |
| `claude-code-workflows` | wshobson/agents | **KEEP** | Named-org (wshobson), high-active, W312-C SHA-pin verified |
| `antigravity-awesome-skills` | sickn33/antigravity-awesome-skills | **REVIEW** | Single-maintainer (sickn33); only `antigravity-bundle-essentials` enabled |
| `claude-code-skills` | alirezarezvani/claude-skills | **REVIEW** | Single-maintainer; 5 of 10 plugins from this enabled |
| `superpowers-marketplace` | obra/superpowers-marketplace | **REVIEW** | DUPLICATES claude-plugins-official's superpowers (line 190 `superpowers@claude-plugins-official:true` vs line 231 `superpowers@superpowers-marketplace:false`). Why register the dup? |
| `hindsight` | vectorize-io/hindsight | **KEEP** | Named-org canonical T1 memory |
| `gitnexus-marketplace` | local directory | **RETIRE** | W312-C verdict: T3 PATTERN-STUDY DO NOT INSTALL (PolyForm-NC + D24 MCP-attack-surface floor + solo bus-factor). Already enabled:false. The **marketplace registration itself should be retired** to remove the path |
| `pydantic-skills` | pydantic/skills | **KEEP** | Named-org canonical |
| `karpathy-skills` | forrestchang/andrej-karpathy-skills | **REVIEW** | Vendored-by-forrestchang of Karpathy content; consider direct karpathy source |
| `planning-with-files` | OthmanAdi/planning-with-files | **KEEP-DEACTIVATED** | W312-codex-r1 confirms DEACTIVATE-correct state; marketplace registration is fine |

**Net recommendation**: Retire `gitnexus-marketplace` + `claude-settings` + dedupe `anthropic-agent-skills`/`skills` + drop the 3 unused anthropics/{financial,healthcare,life-sciences}. 11 marketplaces → 6-7.

---

## §5 Status-Block Retention Policy Proposal

**Current state**: CLAUDE.md is 48 LOC of body PLUS appendices stretching to L48+ (W313 status appendix alone is ~6000 chars; W312, W310, W286-W293, W280 are all still inline). The "≤50 LOC body" invariant is preserved technically but the FILE is multi-thousand-line.

**Problem**: Anthropic CCBP `claude-memory.md:34-40` says "ancestor CLAUDE.md loads at session start". Even though appendices are below the "body" marker, **they ARE in the file**. Every session, every appendix loads. The preload-budget invariant the runtime claims to honor (line 3 "body kept ≤50 LOC to minimize preload budget") is **violated by the appendices**.

**Proposed retention policy**:

1. **Active appendices**: Only the LAST 2 status blocks (current + previous wave) live in CLAUDE.md.
2. **Archive trigger**: When a 3rd status block lands, the oldest moves to `docs/architecture/CLAUDE-MD-ARCHIVE/W<wave>-status.md`.
3. **Cadence**: Per-wave (since waves ship multiple per day, the rolling 2 stays current).
4. **Pointer back**: Active CLAUDE.md keeps a 1-line pointer per archived wave (e.g. "Earlier waves: see archive directory").
5. **Net effect**: CLAUDE.md file size targets ≤200 LOC total (50 body + 2 × ~75 LOC appendices + pointer list).

**Implementation**: Operator-AI to retroactively move W280, W286-W293, W310 to archive (W312 + W313 remain). One-time cleanup; ongoing rolling cadence per wave-ship.

---

## §6 Wave-Number Versioning Critique

**Current state**: 50 ledger verdicts spanning W184 → W312. Internal status blocks reference W184, W229, W252-W255, W259-v16, W269, W272, W280-W313 (and counting). Wave-N is **internal** — not exposed to upstream, not legible without context.

**Critique**:
- **Signal-degrading**: "W259-v8 U4" requires recall of what U4 did at the v8 sub-iteration. New contributors cannot orient.
- **Audit-trail value**: Real — basic-memory ledger uses Wave-N as primary key. Cannot retire without migration.
- **CCBP comparison**: CCBP @ HEAD `1386b0e` cites use **semver-style + SHA**, not Wave-N. The Wave-N system is `claude-sota-installed` specific.

**Recommended alternative** (hybrid):

1. **Internal**: Keep Wave-N as the immutable ledger key (don't break basic-memory).
2. **Display**: Add a **YYYY-MM-QQ designator** alongside (e.g. "W314 (2026-05-Q2)") so a future reader can place the wave in calendar time without ledger lookup.
3. **Monthly anchor**: Every 1st-of-month, snapshot a "month-anchor" tag (`month/2026-05`) — a future contributor can `git checkout month/2026-05` to see runtime state at month-end without parsing 30 Wave-N events.
4. **Feature-level milestones**: When a wave introduces a NEW runtime primitive (e.g. sca-v7 cutover, 6-tier→3-tier collapse), tag a `feature/<slug>` annotated tag.

**Net effect**: Wave-N stays as the immutable internal key; calendar + feature designators give external legibility. No basic-memory migration required.

---

## §7 Wiring Drift Probe — Does Codex Stop-Hook Actually Fire?

**Probed surface**: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json`

**Evidence (read-only)**:
```json
"Stop": [{ "hooks": [{ "type": "command",
  "command": "\"Z:\\tools\\nodejs\\node.exe\" \"Z:\\claude-sota-installed\\.claude\\plugins\\cache\\openai-codex\\codex\\1.0.4\\scripts\\stop-review-gate-hook.mjs\"",
  "timeout": 900 }]}]
```

**Verdict: GATE IS WIRED at the plugin level.** Three Stop-class hooks exist (SessionStart + SessionEnd + Stop), pointing at absolute Win32 paths (per the "Fire 46" patch comment — bypassing POSIX-form `${CLAUDE_PLUGIN_ROOT}` Windows-injection bug).

**BUT — TWO drift risks not currently flagged**:

1. **Win32-absolute-path bake-in**: The plugin hooks.json bakes `Z:\\claude-sota-installed\\` paths verbatim (instead of `${CLAUDE_PLUGIN_ROOT}`). This is the **same anti-pattern** that W286-cross commit `fcafe05` REVERSED for `.mcp.json` MCP servers (Z:-baked .exe paths broke fresh-clone portability). **The plugin Stop-hook is currently NOT Z:-portable** — a fresh clone to D:\ or to a different machine username would have to re-patch this file every install.

2. **Backup files in cache**: `hooks.json.pre-fire44-fix` + `pre-fire45-fix` + `pre-fire46-fix` all sit alongside the live `hooks.json`. These are not gitignored (they're under `.claude/plugins/cache/` which IS gitignored per W280 closeout — but **the patching script wrote backups inline**, meaning if a future `/plugin update` runs, it may resurrect a backup as live).

**Recommendation**: 
- File operator-AI to inspect whether `${CLAUDE_PLUGIN_ROOT}` Win32 injection is FIXED at upstream `openai/codex-plugin-cc` HEAD (the patch dates to "Wave 50 Fire 46" — that's pre-W255, very old).
- If fixed, revert hooks.json to the upstream-shipped form (preserves CR-2 compliance).
- If still broken, document the patch as a sanctioned R2-exception per the bug-patch-shim clause.

---

## §8 Cardinal-Rule-2 Edge-Case Audit (per-hook)

Auditing each `.claude/settings.json:hooks` entry against R2 ("direct upstream-CLI invocations" only).

| Hook | Entry | CR-2 status | Notes |
|---|---|---|---|
| SessionStart | `node ".../context-mode-cache-heal.mjs"` | **EXCEPTION** | Documented R2-exception per CLAUDE.md L19 (anthropics/claude-code#46915) — ≤2KB shim. **COMPLIANT** |
| PreToolUse:Bash:1 | `gitleaks protect --staged ...` | **DIRECT CLI** | Pure gitleaks invocation. COMPLIANT |
| PreToolUse:Bash:2 | `bash -c "..."` with case-stmt + node codex-companion.mjs | **EDGE CASE** | bash + inline case-statement IS direct CLI, but the **inline-case logic** is project-owned glue. The node invocation hits a plugin-shipped script (CR-2 ok). The bash glue is ~700 chars of project-owned logic — borderline. **MOSTLY COMPLIANT** but should be promoted to a documented exception or a tiny shim. |
| PostToolUse:Edit\|Write\|MultiEdit | `bash -c "..."` ruff + shellcheck dispatch | **EDGE CASE** | Same pattern — bash inline case-statement (~600 chars) over `ruff` + `shellcheck` direct invocations. **MOSTLY COMPLIANT** but inline-bash glue creep. |
| PreCompact | `powershell ... Add-Content` log-only | **DIRECT CLI** | Pure logging. COMPLIANT |
| WorktreeRemove | `git worktree prune` | **DIRECT CLI** | Pure git. COMPLIANT |
| Notification | `powershell ... Console::Beep` | **DIRECT CLI** | Pure powershell beep. COMPLIANT |
| PostToolUseFailure | `powershell ... ConvertFrom-Json ... ConvertTo-Json` | **EDGE CASE** | ~700 chars inline PowerShell with JSON parse/match/emit logic. **Most project-owned glue in the file**. Should be documented exception or shim. |
| TaskCompleted | `ruff check tools harness` | **DIRECT CLI** | Pure ruff. COMPLIANT |

**Net edge cases**: PreToolUse:Bash:2 (codex review-gate dispatch glue), PostToolUse:Edit (ruff/shellcheck dispatch), PostToolUseFailure (JSON-event parse). All are **technically `bash -c` or `powershell -Command` direct invocations**, but the **inline script bodies** are growing. CR-2 compliance is preserved by the letter; the spirit (no project-owned hook bodies) is being tested.

**Recommendation**: Codify a **CR-2 inline-glue size limit** — e.g. "inline `bash -c "..."` or `powershell -Command "..."` bodies MUST be ≤500 chars; longer logic MUST be promoted to a documented R2-exception shim file with cite-anchor".

---

## §9 Summary Verdict — How SOTA Is This Architecture?

**Score: 7.5 / 10**

**What works (8-9 range strengths)**:
- Cardinal-rule discipline is **rare and effective** (`self_invented_count: 0`)
- Cross-model adversarial gate (codex Stop-hook) **is wired and live** (§7 confirmed)
- 6-axis convergence + multi-MCP cascade in sca-v7 is **research-arch SOTA**
- W269 parallel-Agent mandate + W312-D telemetry is **operationally measured**
- Pre-commit gitleaks + ruff + shellcheck are **direct-CLI compliant** and effective

**What blocks 10/10**:

### 3 changes that would move 7.5 → 10:

1. **Status-block retention policy + CLAUDE.md archive cycle** (§5). Currently the file is multi-thousand-line because every wave's status appendix lives inline. Implement the rolling-2 archive policy; CLAUDE.md drops to ≤200 LOC total. This is **the single highest-leverage change** — restores the preload-budget invariant the runtime claims to honor.

2. **Sandbox configuration ratification** (§1 R5). Either enable CCBP `sandbox.enabled:true` per `claude-settings.md:446-461` with documented `excludedCommands`, OR explicitly document the trade-off in R5 ("single-operator local install intentionally omits sandbox; threat model: trusted operator + untrusted upstream content"). Right now R5 reads as "permissions + sandboxing" but only permissions are configured.

3. **R6-R9 codification + Wave-N → calendar designator hybrid** (§3 + §6). Lift 4 currently-implicit invariants (multi-MCP cascade, live-state probe, Stop-hook invariant, parallel-ratio target) from SKILL.md prose to CLAUDE.md cardinal-rule-class. AND add calendar-month designators alongside Wave-N for external legibility. **Together these close the largest "implicit but should be explicit" gap.**

**Substantive concerns flagged (≥3 mandate met)**:
1. Memory stack is over-engineered as "6-tier"; effectively 3 tiers active (§2).
2. 11 marketplaces with 30 false-enabled plugins; ≥4 marketplaces are retire-able (§4).
3. CR-2 inline-bash/powershell glue is creep-prone; no size-limit codified (§8).
4. Status appendices violate the preload-budget invariant they claim to honor (§5).
5. CCBP-shan documents `sandbox.*` keys — none configured in this runtime (§1 R5).
6. Stop-hook Win32 paths baked into plugin cache; not Z:-portable per W286-cross discipline (§7).

**End of audit.**
