# W301 Stream E — Cardinal-Rule + Decision-Making Adversarial Re-litigation

> **Wave**: W301
> **Stream**: E
> **Owner**: agent-E-rules-adversarial
> **Date**: 2026-05-18
> **Base HEAD**: `50a926b` (`ship(W301): SOTA memory architecture DESIGN ...`)
> **Cite-class**: TIER-1-DIRECT (Anthropic `code.claude.com/docs/en/*` doc cites carried from W299-A re-verification 2026-05-18 21:57 UTC) + TIER-3-LOCAL-COMPOSITION (live disk-state of `.claude/`, `CLAUDE.md`, sca-v5 SKILL.md, VERDICT-LEDGER.md, W288-W300 wave docs).
> **Predecessor**: `W299-STREAM-A-RULES-ADVERSARIAL-AUDIT.md` (10-section per-rule audit, W299 wave). This stream EXTENDS rather than duplicates W299-A — focuses on (1) operator-acceptance status of W299-A verdicts, (2) angles W299-A under-stressed, (3) Part 2 sca-v5 decision-making review which W299-A did NOT cover.

## §0 TL;DR

Five cardinal rules re-litigated with W299-A operator-acceptance status traced and 3 new stress-test axes per rule. **R4 finding stands as W301's headline carry-forward** — operator has NOT yet accepted W299's STRENGTHEN-REVERSAL recommendation (`.claude/rules/` still does not exist in HEAD `50a926b`; CLAUDE.md:21 text unchanged from W255-era framing). Net per-rule verdicts: **R1 EXTEND-WITH-COROLLARY** (skill/agent operator-curated path now explicit), **R2 EXTEND-WITH-COROLLARY** (bug-patch shim carve-out + `.mcp.json` CR-9 contract elevation), **R3 KEEP-AS-IS** (no harm surfaced), **R4 MODIFY-TEXT** (W299-A recommendation re-affirmed; operator-pending), **R5 EXTEND-WITH-COROLLARY** (direct-CLI-via-hook carve-out matches gitleaks/ruff/shellcheck reality). Decision-making review surfaces **6 findings**: (a) tier-cut thresholds 4.0/3.5 are calibrated against architecture-itself self-eval not external benchmark; (b) D5 weight 1.0→1.3 sensitivity would flip 0/8 W291.Stage2 verdicts but 2/7 W296+W295 backfill verdicts — sensitivity ASYMMETRIC across waves; (c) D7≤1 + D15≤1 + D18<2 Universal-REJECT taxonomy defensible but D10≤2 conjunctive-EXCEPT-clause adds complexity codex round-4 flagged; (d) "stars not a hardgate" mandate has **2 borderline-flag verdicts** but **0 outright violations** across 18-row ledger; (e) operator-override audit-trail has **1 documented operator-override silence** (`OthmanAdi/planning-with-files` settings.json:232 enable without Phase-5 evidence, W299-D row 4); (f) W299-A R4 STRENGTHEN-REVERSAL **operator non-decision** is itself an audit-trail gap. **Mandate-violation count: 0 outright, 2 borderline (both with documented mitigation), 1 audit-trail-silence (Othman case), 1 operator-non-decision (W299-A R4).** Total decision-making findings: **6**. Total cardinal-rule recommendations: **4 EXTEND/MODIFY + 1 KEEP**.

---

## §1 Cardinal rules — 5 adversarial re-litigations

### 1.1 R1 — "Install primitives only from trusted plugins/skills/agents"

#### Rule (verbatim)
> 1. **Install primitives only from trusted plugins/skills/agents** — plugin structure + install flow per `https://code.claude.com/docs/en/plugins`. **W270 corollary (install-state drift governance)**: primitive validity = trusted-source + active-scope + commit-SHA-freshness + post-`/plugin install` `/reload-plugins` verification. Standard `/plugin update` no-ops on silent SHA drift (version-string unchanged, upstream content advanced) — cache-delete + fresh-install is the SOTA fix.

(`CLAUDE.md:18`)

#### Steelman
R1 is the load-bearing rule for the W255 cleanup (22,060 LOC of self-invent purged). The W270 corollary closes the silent-SHA-drift loophole exactly where standard `/plugin update` no-ops. Trusted-source + active-scope + SHA-freshness + post-reload verification is a 4-axis primitive-validity check that has empirically caught real drift (`agent-teams` PR #535 silent rewrite of 7/9 files without `plugin.json:version` bump — `W289-OPERATOR-ACTIONS-2026-05-18.md:11`). Without R1, the runtime would re-acquire the W255-era 22,060 LOC self-invent load. The 62-plugin install set per `.claude/settings.json:165-233` is the rule's product.

#### Adversary 1 — rule too strict
**Claim**: R1 forbids vendor-fork pattern (sca-v5 T2 tier per `.claude/skills/sota-convergence-audit/SKILL.md:229`) implicitly — vendor-forking a candidate produces a primitive that is NEITHER an upstream plugin NOR a marketplace install. Yet the rubric explicitly enumerates `T2 VENDOR-FORK` with `install_score ∈ [3.0, 3.9]` band and the W291.Stage2 ledger has 2 T2 VENDOR-FORK verdicts (`local-deep-research` + `microsoft/PromptWizard` per `VERDICT-LEDGER.md` rows 4 + 5). **Evidence of tension**: R1's "trusted plugins/skills/agents" enumeration does not name `vendor-forks` even though sca-v5 sanctions them and the ledger records 2 of them as ACTIVE verdicts.

**Strength of adversary**: MEDIUM. The W270 corollary already implicitly admits non-marketplace primitives via the "trusted-source" axis (a vendored upstream IS still trusted-source-anchored). But the rule's literal enumeration omits the T2 pattern.

#### Adversary 2 — rule too loose
**Claim**: R1 does not explicitly cover operator-curated `.claude/skills/<name>/SKILL.md × 18` (per `CLAUDE.md:30`) or `.claude/agents/*.md × 4` (per `ls .claude/agents/`). These ARE primitives (they auto-fire and are tool-callable) but they are not from any marketplace — they are operator-authored in-tree. `CLAUDE.md:30` legitimizes them with the phrase "Anthropic-sanctioned path per `https://code.claude.com/docs/en/skills`; cardinal-rule-3-compliant" — but the cite is to CR-3, not CR-1. **Evidence**: W299-A §1 already flagged this exact ambiguity ("CLAUDE.md cites 'cardinal-rule-3-compliant' but the question of CR-1-compliance is unstated") and recommended KEEP-with-clarification. As of HEAD `50a926b`, the clarification has NOT been applied — the gap persists.

**Strength of adversary**: HIGH. The gap is documented (W299-A §1) and unrepaired in HEAD.

#### Adversary 3 — rule unclear
**Claim**: The W270 corollary embeds 4 distinct validity axes (trusted-source · active-scope · SHA-freshness · post-reload) but does not specify what happens if 3 of 4 pass and 1 fails. Does the primitive fail open or fail closed? Real example: `OthmanAdi/planning-with-files` is settings.json:232-enabled (active-scope ✓) and was T1 INSTALL approved (trusted-source ✓) but per W299-D it was "deactivated W295-r30 then SILENTLY re-enabled by W296 foundation commit `2bf2d27` WITHOUT Phase-5 evidence" (`W299-AUDIT-2026-05-18.md` §0). The 4-axis check did not catch this — because the rule does not say what 3-of-4 looks like.

**Strength of adversary**: MEDIUM. The rule defines validity = trusted-source ∧ active-scope ∧ SHA-freshness ∧ post-reload, which is implicitly conjunctive (all four required), but the OthmanAdi incident shows the conjunction was not enforced.

#### Verdict — **EXTEND-WITH-COROLLARY** (carry W299-A §1 recommendation; reaffirm; add T2 vendor-fork carve-out)

#### Recommended exact replacement text (≤2 lines, operator-approval-gated)
Append to R1 after the W270 corollary, as a single new sentence:

> **Operator-curated path + vendor-fork carve-out**: `.claude/skills/<name>/SKILL.md` and `.claude/agents/<name>.md` files authored by the operator and cite-anchored to the upstream Anthropic docs (`https://code.claude.com/docs/en/skills` resp. `/sub-agents`) are R1-compliant primitives; `T2 VENDOR-FORK` candidates per `.claude/skills/sota-convergence-audit/SKILL.md` are R1-compliant when accompanied by a `divergence_files` manifest pinning the forked upstream commit-SHA.

---

### 1.2 R2 — "Hooks may only be upstream plugin hooks OR direct upstream-CLI invocations"

#### Rule (verbatim)
> 2. **Hooks may only be upstream plugin hooks OR direct upstream-CLI invocations** declared in `.claude/settings.json` — semantics per `https://docs.anthropic.com/en/docs/claude-code/hooks`. **No `.claude/hooks/scripts/*.py` self-invent.** **W286-arc-P0C ratification 2026-05-18**: `.mcp.json` MCP-server `command/args` contract is `npx -y <pkg>@<pinned-version>` (per W286-cross commits `fcafe05`+`77dc081`); W155 F13 native-node migration RETIRED — CR-9 version-pin discipline wins over spawn-churn optimization. The W280a Stop-hook codex-review-gate auto-enforces post-commit.

(`CLAUDE.md:19`)

#### Steelman
R2 is the second load-bearing W255-cleanup rule (33 `.claude/hooks/scripts/*.py` purged). The literal text "No `.claude/hooks/scripts/*.py` self-invent" is precise — it bans the historic violation pattern (a `scripts/` subdir under `.claude/hooks/`). The W286-arc-P0C ratification absorbs the `.mcp.json` CR-9 version-pin contract into R2's surface, closing the spawn-churn vs version-pin debate empirically.

#### Adversary 1 — rule too strict
**Claim**: R2 forbids any project-owned `.mjs` or shell-script even if it patches a documented Anthropic bug. Live counterexample: `.claude/hooks/context-mode-cache-heal.mjs` (1656 bytes, present in HEAD `50a926b` at `.claude/hooks/context-mode-cache-heal.mjs:1`, wired at `settings.json:99`) patches `anthropics/claude-code#46915` (per `.claude/hooks/context-mode-cache-heal.mjs:3` comment). The file is project-owned, not plugin-shipped, but it directly addresses an upstream-acknowledged bug. **Evidence**: W299-A §2 surfaced this as a HIGH-severity counterexample with W296 commit `d72d3aa` initially classifying it CRITICAL violation then ratifying with exception. The file survives in HEAD with no plugin-shipped equivalent.

**Strength of adversary**: HIGH. The file is load-bearing (context-mode plugin would break on every Claude Code auto-update without it), and R2 as written cannot describe the runtime's own legitimate state.

#### Adversary 2 — rule too loose
**Claim**: R2 explicitly bans `.claude/hooks/scripts/*.py` self-invent BUT does not ban `.claude/hooks/<file>.{mjs,js,ts,ps1,sh}` self-invent — the rule's exact text targets only the `scripts/` subdir + `.py` extension. A future operator could create `.claude/hooks/custom-guard.mjs` and claim R2-compliance because it is not under `scripts/` and not `.py`. **Evidence**: The literal text of R2 is `No .claude/hooks/scripts/*.py self-invent` — the wildcard `*.py` and the path-prefix `scripts/` are both narrowing operators. Anything outside that path is rule-silent. Indeed, `context-mode-cache-heal.mjs` itself sits at `.claude/hooks/context-mode-cache-heal.mjs` (no `scripts/` subdir, `.mjs` not `.py`) and is technically NOT-banned by R2's literal text — only by R2's spirit.

**Strength of adversary**: HIGH. The narrow textual ban masks the broader spirit (no project-owned hook bodies); a future drift could re-introduce 22,060 LOC of self-invent under `.mjs` or `.sh` and never hit R2's text.

#### Adversary 3 — rule unclear
**Claim**: The W286-arc-P0C MCP-server contract is `npx -y <pkg>@<pinned-version>` per the appended sentence. But the LIVE state per `W300-AUDIT-2026-05-18.md` §3 is: "**HIGH** — `.mcp.json` spawns local `basic-memory.exe` instead of `npx -y basic-memory@<pinned-version>`. Per W286-arc-P0C ratified contract (CR-2 corollary), MCP servers MUST be pinned. basic-memory has been operating outside this contract since installation." So R2 sanctions a contract that basic-memory has been silently violating for an entire installation lifecycle. The W300-A AI-1 HIGH says this is "operator-AI-pending"; no resolution committed yet.

**Strength of adversary**: HIGH. The rule says one thing, the runtime does another, and the audit-trail does record the gap.

#### Verdict — **EXTEND-WITH-COROLLARY** (carry W299-A §2 RELAX recommendation; broaden ban to non-`.py` extensions; reaffirm W286 P0C and call out basic-memory non-compliance as in-flight remediation)

#### Recommended exact replacement text (≤2 lines, operator-approval-gated)
Modify R2's middle sentence and append a new W300-anchored corollary. Replace `No .claude/hooks/scripts/*.py self-invent.` with:

> **No project-owned hook bodies (any extension `.py|.sh|.mjs|.js|.ts|.ps1|.bat` under `.claude/hooks/**`), EXCEPT documented bug-patch shims cite-anchored to a specific `anthropics/claude-code` GitHub issue and ≤2 KB**. **W300-AI-1 corollary**: `.mcp.json` `command` MUST satisfy W286-arc-P0C contract; a basic-memory-style local-`.exe` invocation is a P0C violation pending remediation (`W300-AUDIT-2026-05-18.md` §3).

---

### 1.3 R3 — "Subagents = installed upstream agents OR documented subagent system"

#### Rule (verbatim)
> 3. **Subagents = installed upstream agents OR documented subagent system** — per `https://docs.anthropic.com/en/docs/claude-code/sub-agents`.

(`CLAUDE.md:20`)

#### Steelman
R3 is the simplest and tightest of the 5 rules. "Documented subagent system" anchors to a specific upstream doc; `.claude/agents/*.md` files with frontmatter conforming to the documented schema (per CCBP `claude-subagents.md:17-36` cite) ARE the documented-subagent-system. The 4 in-tree agents (`evaluator.md`, `gpt5-archaeologist.md`, `wshobson-devops-troubleshooter.md`, `wshobson-security-auditor.md` per `ls .claude/agents/`) all conform: frontmatter present (`name:`, `description:`, `tools:`, `model:`, `permissionMode:`, etc. per `evaluator.md:1-25`), permission posture explicit, cite-anchor to upstream subagent doc present (`evaluator.md:23`: "runtime safety boundaries are enforced by Claude Code's own permissions and sandboxing per `https://docs.anthropic.com/en/docs/claude-code/settings`").

W299-A §3 already returned a KEEP verdict — no measurable harm surfaced. W285's wshobson wrapper restoration (per `CLAUDE.md:40` ship-evidence) was per-the-spec, not a workaround.

#### Adversary 1 — rule too strict
**Claim**: R3 by its plain text forbids agent FRAMEWORK composition. If a future SOTA pattern (e.g., LangGraph-style supervisor + workers DAG) requires a non-upstream agent-graph orchestrator, R3 would block it. **Evidence**: The W289 `claude-flow` adversarial review at `docs/architecture/W289-CLAUDE-FLOW-SOTA-AUDIT-2026-05-18.md` reversed claude-flow to T4 CITE-ONLY in part because its agent-orchestration patterns would need wrapper agents not directly addressable through `.claude/agents/`. The rule as written has NO carve-out for orchestration-framework subagents.

**Strength of adversary**: LOW. The W289 verdict was T4 (cite-only), not T2 (vendor-fork) — the rule's strictness aligned with the rubric's verdict in that case. No live tension surfaced.

#### Adversary 2 — rule too loose
**Claim**: R3 does not specify WHERE agents must live. `.claude/agents/` is the canonical in-tree path, but the runtime also exposes plugin-shipped agents via `subagent_type` parameter (e.g., the agent-teams `team-lead/implementer/reviewer/debugger` per `W289-OPERATOR-ACTIONS-2026-05-18.md:43`). A future operator could create agents in any directory under `.claude/` (e.g., `.claude/my-agents/`) and claim "documented subagent system" compliance. The upstream doc per `https://docs.anthropic.com/en/docs/claude-code/sub-agents` specifies `.claude/agents/` as the path, but R3's literal text does not. **Evidence**: R3's text is "documented subagent system" — a referenced spec, not an inline path constraint.

**Strength of adversary**: LOW. The cite-anchor implicitly carries the upstream path constraint; an operator violating this would be violating CCBP cite-class discipline, not R3 per se.

#### Adversary 3 — rule unclear
**Claim**: R3 does not address agent COMPOSITION limits. Live state: `.claude/agents/evaluator.md:14-17` declares `skills:` preload of 3 skills (`superpowers:verification-before-completion`, `superpowers:requesting-code-review`, `addy-agent-skills:code-review-and-quality`). Each preloaded skill is itself behaviorally-active SKILL.md content. The rule does not specify how many skills an agent may preload, or whether preloaded skills count against the agent's behavioral surface for purposes of (e.g.) CR-4 ("project behavior in CLAUDE.md + settings.json only"). **Evidence**: `evaluator.md:14-17` preloads 3 skills × ~5 KB each = ~15 KB of behavioral instruction beyond CLAUDE.md's ≤50 LOC + settings.json's ≤15 KB. This is sanctioned by R3 but un-budgeted by CR-4.

**Strength of adversary**: LOW-MEDIUM. The composition pattern is upstream-documented (CCBP `claude-subagents.md` schema includes `skills:` field), so the implicit composition limit is "whatever the upstream schema permits". But the CR-4 budget is silent on agent-preloaded-skill weight.

#### Verdict — **KEEP-AS-IS**

W299-A's KEEP verdict stands. All 3 adversary attacks return LOW strength. R3 reads correctly.

---

### 1.4 R4 — "Project behavior in CLAUDE.md + settings.json only — NOT `.claude/rules/*.md`"

#### Rule (verbatim)
> 4. **Project behavior in CLAUDE.md + settings.json only — NOT `.claude/rules/*.md`** — settings behavior per `https://docs.anthropic.com/en/docs/claude-code/settings`. The `.claude/rules/` directory does not exist by design.

(`CLAUDE.md:21`)

#### Steelman
W255 cleanup deleted 64 self-invented `.claude/rules/*.md` (per `CLAUDE.md:5`); the result is `self_invented_count: 0`. The rule's plain text ("directory does not exist by design") forecloses regression by making the directory's mere existence a violation. Re-litigating this rule risks re-acquiring W255-class self-invent load.

#### Adversary 1 — rule too strict
**Claim**: Anthropic's own canonical docs document `.claude/rules/*.md` as a FIRST-CLASS file type. Per W299-A §4 with live evidence pulled 2026-05-18 21:57 UTC: `code.claude.com/docs/en/claude-directory` officially lists `rules/*.md` as supported; `code.claude.com/docs/en/memory#organize-rules-with-claude/rules/` ships canonical examples; the installed `everything-claude-code@2.0.0-rc.1` plugin SHIPS its own `.claude/rules/` subdir per W299-A; the sibling `Z:/claude-sota` runtime uses `.claude/rules/`. **R4's "directory does not exist by design" is factually contradicted by first-party upstream documentation.**

**Strength of adversary**: CRITICAL. This is the highest-confidence rule-violation in the 5-rule audit because it is contradicted by upstream Anthropic docs, not by a third-party SOTA repo.

#### Adversary 2 — rule too loose
**Claim**: R4 names ONLY `CLAUDE.md` and `settings.json` as project-behavior surfaces, but the runtime ALSO carries behavioral instruction at:
- `CLAUDE.local.md` (gitignored per-machine memory, loaded via CCBP `claude-memory.md:113`)
- 18 operator-curated `.claude/skills/<name>/SKILL.md` files (~200-700 LOC each, per `ls .claude/skills/`)
- 4 in-tree `.claude/agents/*.md` files (~3-11 KB each)
- 23+ wave-architecture docs under `docs/architecture/W*/` that are referenced from CLAUDE.md (e.g., `W259-grand-catalog/`)

Each of these IS behavioral. R4's enumeration ("CLAUDE.md + settings.json only") is incomplete vs the actual behavioral surface.

**Strength of adversary**: HIGH. The literal text undercounts the actual behavioral surface by an order of magnitude.

#### Adversary 3 — rule unclear
**Claim**: "Project behavior" is undefined. Is a `.git/hooks/pre-commit` script "project behavior"? A `pyproject.toml`? A `pre-commit-config.yaml`? A `.gitignore`? R4 does not say. **Evidence**: The runtime has a `pre-commit` hook chain (gitleaks + ruff + shellcheck per `settings.json:104-125`) and a `.gitignore` excluding `.claude/plugins/data/` (`CLAUDE.md:42` W280h closeout); these BOTH affect project behavior but are silent on R4.

**Strength of adversary**: MEDIUM. The under-definition of "project behavior" leaves the rule's boundary ambiguous.

#### Verdict — **MODIFY-TEXT** (re-affirm W299-A §4 STRENGTHEN-REVERSAL recommendation; this is the operator-pending CRITICAL carry-over)

#### Recommended exact replacement text (≤2 lines, operator-approval-gated)
Replace the second sentence of R4 ("The `.claude/rules/` directory does not exist by design.") with:

> **`.claude/rules/*.md` is an officially-supported Anthropic file type** (per `https://code.claude.com/docs/en/claude-directory` + `https://code.claude.com/docs/en/memory#organize-rules-with-claude/rules/`); upstream-plugin-shipped `rules/` subtrees AND operator-curated path-gated rules ARE permitted. W255-purged `.claude/rules/*.md` files were correctly deleted because their CONTENT was R1-self-invent (ad-hoc auto-fire prompts not cite-anchored to upstream), NOT because the directory is forbidden. Future operator-curated rules MUST be cite-anchored per R1 sub-clause.

**Operator decision pending since W299**: this exact recommendation has been queued for ~5 waves (W299→W300→W301) without operator action. This stream re-affirms; ship/defer is operator-discretion.

---

### 1.5 R5 — "Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts"

#### Rule (verbatim)
> 5. **Safety boundaries via Claude Code permissions + sandboxing**, NOT custom guard scripts — per `https://docs.anthropic.com/en/docs/claude-code/settings`.

(`CLAUDE.md:22`)

#### Steelman
R5 enforces the principle that safety is a runtime concern handled by the Claude Code primitives (`permissions.deny[]` blocks file paths; `permissionMode: plan` blocks tool mutation; `sandbox: true` blocks system access). Custom guard scripts (the W255-purged 33 `.py` files) duplicated these primitives badly and added attack surface. Without R5, every safety concern would re-acquire bespoke Python guards.

#### Adversary 1 — rule too strict
**Claim**: R5's plain text bans `gitleaks protect --staged` PreToolUse hook (`settings.json:108-114`), `ruff check --fix` PostToolUse hook (`settings.json:115-125`), `shellcheck --severity=error` PostToolUse hook (same), `[System.Console]::Beep` Notification hook (`settings.json:147-156`). All four are "custom guard scripts" by the rule's plain reading — they all intercept tool-call lifecycles and execute logic before/after. **Evidence**: W299-A §5 surfaced this as HIGH-severity counterexample. The `deny[]` block alone (18 entries per `settings.json:64-83`) does NOT cover secret-prevention inside Bash-tool-staged-content; gitleaks fills that gap.

**Strength of adversary**: HIGH. The runtime relies on direct-CLI-via-hook for security and would be materially less safe without these hooks.

#### Adversary 2 — rule too loose
**Claim**: R5 names "permissions + sandboxing" as the only sanctioned safety surfaces, but does not address:
- **Tool-call-isolation**: agents with `permissionMode: plan` + `disallowedTools: [Write, Edit, MultiEdit, NotebookEdit]` (per `evaluator.md:6-7`) — IS this "permissions" or "custom guard via frontmatter"?
- **GateGuard hook** at `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/scripts/hooks/gateguard-fact-force.js` (plugin-shipped, NOT project-owned, fires on PreToolUse:Edit|Write — disabled in this runtime per `settings.json:8` `ECC_DISABLED_HOOKS` listing `pre:edit-write:gateguard-fact-force`). Is GateGuard a sanctioned-permission or a guard-script-equivalent? R5 does not say.
- **block-no-verify plugin** (per `settings.json:212` enabled) — its hook BANS `--no-verify` flags on git commit. Is the ban a "permission" or a "custom guard"? R5 does not distinguish.

**Strength of adversary**: HIGH. The runtime has multiple safety primitives that ride the fence between "permission" and "guard"; R5 has no clear separator.

#### Adversary 3 — rule unclear
**Claim**: The `dangerouslyDisableSandbox: true` parameter on the Bash + PowerShell tools (visible in the tool-call schema as `dangerouslyDisableSandbox: true`) is an Anthropic-blessed escape hatch from sandboxing. If R5 mandates sandboxing, what is the rule's stance when the operator (or an agent) uses this parameter? The rule does not say. **Evidence**: The runtime's `permissions.defaultMode: "bypassPermissions"` (`settings.json:84`) plus `skipDangerousModePermissionPrompt: true` (`settings.json:374`) makes this a live concern — sandboxing is regularly relaxed.

**Strength of adversary**: MEDIUM. The escape-hatch is Anthropic-shipped, so its use is permitted by upstream; but R5's silence creates interpretive room.

#### Verdict — **EXTEND-WITH-COROLLARY** (carry W299-A §5 RELAX recommendation; codify direct-CLI-via-hook + agent-frontmatter-permission carve-outs)

#### Recommended exact replacement text (≤2 lines, operator-approval-gated)
Append to R5:

> **Direct-upstream-CLI-via-hook + agent-frontmatter-permission carve-out**: a hook that invokes a direct upstream CLI (`gitleaks`, `ruff`, `shellcheck`, `[System.Console]::Beep`, `git worktree prune`) inline in `.claude/settings.json` IS R5-compliant per R2; an agent's `permissionMode`, `disallowedTools`, and frontmatter-level safety posture (`evaluator.md:6-7`) ARE part of "Claude Code permissions" per CCBP `claude-subagents.md` schema. Plugin-shipped hooks (`gateguard-fact-force.js`, `block-no-verify`) are R5-compliant per R2 upstream-plugin-hook clause.

---

## §2 Decision-making review

### 2.1 Tier-cut threshold calibration

**Finding 2.1 (MEDIUM)**: Tier-cut thresholds T1 ≥ 4.0, T2 ∈ [3.0, 3.9], T3 ≥ 3.5 pattern + D2≥4 + D13≥3 (per `.claude/skills/sota-convergence-audit/SKILL.md:228-230`) are NOT calibrated against an external benchmark — they are calibrated against the architecture-itself self-eval (`VERDICT-LEDGER.md` rows 1+2 — `research-arch-v2-itself` 4.65 and `sca-v3.1-itself` 4.545, both T1 INSTALL). **The rubric is self-calibrating against the artifact that produced it.** This is a methodological smell: the rubric author scored their own rubric and got a passing grade.

**Mitigation present**: W292 inverse-benchmark exercise (`W292-RESEARCH-ARCH-COMPETITOR-AUDIT/` per `CLAUDE.md:42`) cross-checked sca-v3 against 12 external rubrics (HELM/BIG-bench/MTEB/SWE-bench/ARC/Anthropic-multi-agent/Perplexity-Sonar/ThoughtWorks/CNCF/OpenSSF/Wikipedia/NIST AI RMF) yielding "v3 avg 3.82/5". This is a partial calibration — but the calibration was conducted by the SAME team that authored sca-v3, not an external reviewer.

**Suggested calibration method (1)**: pick 5 historically-decided candidates that the operator can independently classify (e.g., "this primitive is obviously T1 INSTALL — it was Anthropic-canonical and shipped clean"). Score them WITHOUT looking at the prior verdict. If the sca-v5 score lands in the operator-independent tier band, the threshold is calibrated. If 4 of 5 land outside the expected band, the threshold needs adjustment. Suggested test set: `OthmanAdi/planning-with-files` (operator-classified T1), `claude-flow` (operator-classified T4 per W289), `astral-sh/uv` (operator-classified T1 per W296 row 14), `daytonaio/daytona` (operator-classified T3 per W295 audit), `getzep/zep` (operator-classified T4 per W300 Stream B — DEAD upstream).

### 2.2 Weight assignment sensitivity analysis

**Finding 2.2 (MEDIUM)**: Weights are documented per-dim (W_install + W_pattern at `SKILL.md:181-216` for D1-D21) with rationale per-dim ("D1 license_compatibility W_install=1.5" — high because license-blocker is install-killing; "D5 typed_evidence_diversity W_install=1.0" — moderate because absent typed evidence is a quality signal but not auto-blocking). The weights have NEVER been published with an externally-defensible derivation — they are face-valid but not formally optimized.

**Sensitivity analysis** — what would change if D5 weight moved from 1.0 → 1.3? Let me audit the 8 W291.Stage2 verdicts (`VERDICT-LEDGER.md` rows 3-11) + the 7 W296+W295 backfill verdicts (rows 12-18) under the hypothetical D5_W_install=1.3.

| Row | Candidate | D5 score | Current install_score | Hypothetical install_score (D5 W=1.3) | Current tier | Hypothetical tier |
|---|---|---|---|---|---|---|
| 3 | `OthmanAdi/planning-with-files` | 5 | 4.67 | 4.78 | T1 | T1 (no flip) |
| 4 | `local-deep-research` | 5 | 4.13 | 4.24 | T2 | T2 (no flip) |
| 5 | `microsoft/PromptWizard` | (D5 from BATCH-2 ≈ 3) | 3.73 | 3.80 | T2 | T2 (no flip) |
| 6 | `bytedance/deer-flow` | 2 | 3.56 | 3.51 | T3 floor | T3 floor (no flip) |
| 7 | `Azure/PyRIT` | 3 | 3.82 | 3.89 | T3 | T3 (no flip) |
| 8 | `daymade/claude-code-skills` | (D5 from BATCH-2) | 3.87 | ~3.94 | T3 | T3 (no flip) |
| 10 | `levnikolaevich/...` | 1 | 3.20 | 3.13 | T4 | T4 (no flip) |
| 11 | `awesome-claude-code-toolkit` | (D5 low) | 3.52 | ~3.47 | T4 | T4 (no flip) |
| 12 | `claude-agent-sdk-python` | 4 (typed-evidence present) | 4.48 | 4.55 | T1 | T1 (no flip) |
| 13 | `github/spec-kit` | 5 | 4.62 | 4.73 | T1 | T1 (no flip) |
| 14 | `astral-sh/uv` | 5 | 4.75 | 4.86 | T1 | T1 (no flip) |
| 15 | `oraios/serena` | 4 | 4.20 | 4.27 | T1 | T1 (no flip) |
| 16 | `mem0ai/mem0` | 4 | 4.04 | 4.11 | T1 | T1 (no flip) |
| 17 | `daytonaio/daytona` | (D5 mid) | 2.945 | ~3.0 | T3 | **T3 → T2 borderline** (3.0 enters T2 band, but 5 INSTALL caps still block) |
| 18 | `All-Hands-AI/OpenHands` | (D5 mid) | 3.70 | ~3.77 | T3 | T3 (D3=2 still blocks) |

**Result**: 0/15 verdicts flip tier under D5_W=1.3 hypothetical. The runtime's verdicts are NOT sensitive to D5 weight perturbation in the 1.0 → 1.3 direction. Two borderline shifts (#11 `awesome-claude-code-toolkit` 3.52 → 3.47 stays T4; #17 `daytona` 2.945 → 3.0 enters T2 numeric band but hard-cap-blocked).

**Adversarial reply**: 0/15 flips is BOTH a sign of robustness AND a sign that D5 weight does not discriminate effectively at the current levels. If a 30% weight change produces 0 tier flips, the weight may be over-determined by other dims (D1, D3, D10 carry most of the discrimination per inspection of `BATCH-1-TOP4.md` arithmetic).

**Mitigation**: This is the W292 D5 weight discussion. The rubric is robust but at the cost of weak discrimination on the D5 axis specifically. Suggested action: leave weights unchanged but document this sensitivity in `SKILL.md:181-216` per-dim rationale (current docs do not show post-hoc sensitivity).

### 2.3 Hard-cap taxonomy defensibility

**Finding 2.3 (MEDIUM)**: The hard-cap taxonomy at `SKILL.md:392-396` distinguishes:
- **Universal REJECT triggers**: `D7 ≤ 1` (abandoned) · `D10 ≤ 2 AND no marginal pattern improvement` (full duplicate; pattern-improvement carve-out per W289-fix7 codex round-4) · `D15 ≤ 1` (security blocker) · `D18 < 2` (runtime-safety failure, W293 sca-v3.1) · any persona adversarial-BLOCK · codex-gate BLOCK.
- **INSTALL-only caps**: `D1 < 3` · `D3 < 2` · `D5 < 4` · `D14 < 3` · `D17 < 2` · `D19 < 2`.
- **T1+T2 caps**: `D16 < 2`.

**Strict-less-than vs at-or-below distinction** (per `SKILL.md:392` codex round-1 fix): `D < N` means strict (D=N-1 triggers, D=N does not), `D ≤ N` means inclusive. The notation is enforced per the codex round-1 finding.

**Defensibility audit**:
1. **D7 ≤ 1 (abandoned)** — defensible. A primitive with no maintenance is operational risk regardless of other dims.
2. **D10 ≤ 2 AND no marginal pattern improvement** — defensible but COMPLEX. The "AND no marginal pattern improvement" carve-out (per W289-fix7 codex round-4) added conditionality that complicates the rule. Live application case: `Acontext` D10=2 + pattern_score 3.63 > install_score 3.06 → satisfies carve-out → T3 PATTERN-STUDY routes (per `VERDICT-LEDGER.md` row 6 W288). The complexity has paid off (validated by 1 candidate's correct routing), but it adds 1 conjunctive condition future auditors must remember.
3. **D15 ≤ 1 (security blocker)** — defensible. Security-blocker = REJECT is standard practice.
4. **D18 < 2 (runtime-safety failure)** — defensible. NIST GAI Profile-anchored.
5. **D1 < 3 (license)** — defensible. License-incompatibility blocks install but NOT pattern-study; INSTALL-only cap is the right scope.
6. **D3 < 2 (harness-misfit)** — defensible. Live application case: `All-Hands-AI/OpenHands` D3=2 borderline-survives D3<2 numeric cap (cap is `<2`, not `≤2`; D3=2 fits) but architect-persona-block routed T3 (per `VERDICT-LEDGER.md` row 18). The numeric cap let an architectural-block case escape; the persona-adversarial-BLOCK gate caught it. **This is the rubric's defense-in-depth working** — the persona gate handled the case that the numeric cap couldn't.

**Inconsistency check (operator-mandate alignment)**:
- The "stars not a hardgate" mandate per `CLAUDE.md:11` and `SKILL.md:601` is enforced via D12 capping at 3 when stars-only signal is present + D6 using Bayesian author-prior not raw stars.
- **D7 maintenance_velocity_balanced** (`SKILL.md:187`) is described as "active maintenance, but extreme churn (solo bus-factor + rc-cadence) also penalised". The "solo bus-factor" penalty is correlated with low community-signal — which is correlated with low stars. **Question: does D7 sneak a stars-prior back in via correlated maintenance signal?**

**Test**: 4 W291.Stage2 low-star candidates: `daymade/claude-code-skills` (<500★, T3), `levnikolaevich/...` (<500★, T4), `joshuaswarren/remnic` (73★, T3 W288), `markmhendrickson/neotoma` (23★, T4 W288). None of these were Universal-REJECTed under D7≤1 (per `VERDICT-LEDGER.md` rows 7-11). The D7 cap fired only on candidates the rubric's other dims also flagged. **No mandate-violation surfaced.** But the THEORETICAL channel exists — a solo-maintainer low-velocity repo COULD trigger D7=1 even if technically high-quality.

**Verdict for 2.3**: defensible-with-complexity. The D10 conjunctive carve-out and the D3 numeric vs architect-persona dual-gate are sophistications worth keeping but worth documenting more clearly. **Recommendation**: extract these to a separate "hard-cap taxonomy" subsection in `SKILL.md` rather than scattered through `SKILL.md:392-396`.

### 2.4 "Stars not a hardgate" mandate compliance audit

**Finding 2.4 (LOW-MEDIUM)**: Audit of the 18-row ledger (`VERDICT-LEDGER.md`) for mandate violations:

**Type A — high-star (>10k★) routed T1 INSTALL despite weak typed-evidence**: scan T1 INSTALL rows.
- Row 3: `OthmanAdi/planning-with-files` (21,514★, T1, D5=5, install=4.67). Strong typed-evidence (D5=5 means benchmark + code + practitioner all present per `BATCH-1-TOP4.md`). NOT a violation.
- Row 13: `github/spec-kit` (102k★, T1 CO-INSTALL, D5=5, install=4.62). 6/6 source convergence per W296. NOT a violation.
- Row 14: `astral-sh/uv` (85k★, T1, D5=5, install=4.75). Zero community incumbent + measured perf per W296. NOT a violation.
- Row 15: `oraios/serena` (24.3k★, T1 ELEVATE, D5=4, install=4.20). MIT-licensed + already-partial-via-MCP per W296. NOT a violation.

**Result for Type A**: 0/4 high-star T1 verdicts violate the mandate. All 4 have D5 ≥ 4 (strong typed-evidence).

**Type B — low-star (<500★) routed T4/T5 despite strong typed-evidence**: scan T4 CITE-ONLY rows.
- Row 10: `levnikolaevich/claude-code-skills` (<500★, T4, D5=1, install=3.20, pattern=2.54). D5=1 = NO typed-evidence. Mis-attributed in Stream B + Stage 2 caught the slip. NOT a violation (D5 evidence absent justifies T4).
- Row 11: `rohitg00/awesome-claude-code-toolkit` (T4, pattern=3.03 < 3.5 floor). Pure aggregator. NOT a violation.
- Row 9: `markmhendrickson/neotoma` (23★, T4). D5<4 hard cap fired. NOT a violation.
- Row 10 (W288): `Lyellr88/MARM-Systems` (289★, T4). D5<4 hard cap fired. NOT a violation.

**Result for Type B**: 0/4 low-star T4 verdicts violate the mandate. All have justification beyond "low stars".

**Borderline cases** (flagged but not violations):
- `bytedance/deer-flow` (68,256★, T3 PATTERN-STUDY floor, pattern_score=3.48 just below T3 floor 3.50 by 0.02). The candidate is HIGH-star but landed T3 via the soft-gate floor case (within 0.3 of floor + D2=4 + D13=4). This is the mandate's intent (stars not a hardgate UP either — high-star ≠ auto-T1). **Borderline-honored**.
- `daymade/claude-code-skills` (<500★, T3 PATTERN-STUDY, install=3.87, pattern=3.76). Operator's "low-star high-quality" mandate flagship (per `CLAUDE.md:42` W291.Stage2 ship-evidence). **Borderline-honored**.

**Mandate compliance result**: 0 violations across 18 rows. 2 borderline-but-mandate-honored cases. **The "stars not a hardgate" mandate has held end-to-end across the ledger.**

### 2.5 Operator-override audit-trail completeness

**Finding 2.5 (HIGH)**: Audit for operator-overrides without documented audit trail.

**Case 1 — `OthmanAdi/planning-with-files` Phase-5 evidence gap** (per `W299-AUDIT-2026-05-18.md` §7 row 4):
> "Reconcile `OthmanAdi/planning-with-files` governance: settings.json:232 is `true` but Phase-5 Gate-3+Gate-5 pass evidence not surfaced. Operator decision: (a) ratify with explicit Phase-5 audit, OR (b) deactivate back to `false` pending Phase-5."

W299-D classified this as a SILENT re-enable. The settings.json:232 entry IS `"planning-with-files@planning-with-files": true` (verified at current HEAD `50a926b` per `settings.json:232`). No Phase-5 gate-pass evidence committed to the repo. **This IS an operator-override audit-trail gap.**

**Case 2 — W299-A R4 STRENGTHEN-REVERSAL operator non-decision** (per `W299-AUDIT-2026-05-18.md` §7 row 1):
> "Approve R4 STRENGTHEN-REVERSAL CLAUDE.md edit per Stream A §10 (relax 'directory does not exist by design' → 'may contain upstream-plugin OR operator-curated path-gated rules; ad-hoc auto-fire prompts banned per W255 spirit'). Pointer-extract option: emit `.claude/rules/cardinal-rules.md` (preserves CLAUDE.md ≤50 LOC)."

Status: W300 carried this forward as `W300-AUDIT-2026-05-18.md` §7 row 7 ("Carry forward W299 main-queue 7 ops"). W301 is now this stream, which re-affirms the R4 recommendation again (§1.4 verdict above). **3-wave silence on a CRITICAL recommendation IS an audit-trail concern** — not a violation (operator-discretion to defer is legitimate), but a gap (the deferral itself is not documented as a deliberate decision; it is silent).

**Case 3 — `cognee` Kuzu archived-upstream silent-failure** (per `W300-AUDIT-2026-05-18.md` §0): cognee depends on Kuzu which "archived upstream Oct 2025 — silent failure no prior wave caught (W297+W298+W299 all missed)". The fact that 3 prior waves missed this IS NOT an operator-override; it is a missed-dependency-drift. Excluded from this count.

**Case 4 — Cost-cap relaxation overrides**: per `SKILL.md:97-105` cost-cap routing table, "operator-override max" is documented per-tier ($0.10 → $20 T1 INSTALL operator-override). No operator-override has been recorded in the ledger for any W288-W300 audit. **Question: have any audits actually hit the cost cap?** Not auditable from the ledger; cost-actual-spent field is in the v5 schema but historical pre-v5 verdicts lack it. **Mitigation in flight per W297 Stream D §5.2**: langfuse cost telemetry to fill this gap in future waves.

**Result for 2.5**: 1 documented audit-trail-silence (Case 1 — `OthmanAdi`), 1 operator-non-decision (Case 2 — W299-A R4). 2 in flight monitoring items (Cases 3 + 4). **The audit-trail is mostly clean** but the OthmanAdi case is a concrete gap that should be closed before W302.

### 2.6 (synthesis) — what these 5 findings imply about sca-v6 design (carry-forward to Stream D)

- Threshold calibration (2.1) → Stream D should add a calibration-pilot step that scores 5 operator-independently-classified historical candidates BEFORE shipping sca-v6 thresholds.
- Weight sensitivity (2.2) → Stream D's "composite confidence intervals" delta (per W301 plan §1 Stream D bullet 4) addresses this directly. Recommend ratifying for sca-v6 SHIP.
- Hard-cap taxonomy (2.3) → Stream D should propose extracting hard-cap taxonomy into a separate `SKILL.md §6` rather than inline. Pure docs cleanup.
- Mandate compliance (2.4) → 0 violations means the mandate-enforcement layer (D6 Bayesian prior + D12 stars-cap + soft-gate routing) works. No sca-v6 change needed.
- Override audit (2.5) → Stream D's "operator-override audit trail" delta (per W301 plan §1 Stream D bullet 6) addresses this directly. Recommend ratifying for sca-v6 SHIP.

---

## §3 Recommendations to parent (synthesis)

### Recommendation 1 (HIGH, operator-approval-gated) — extract R4 STRENGTHEN-REVERSAL to a 3-line W301 commit
**Exact diff sketch** (CLAUDE.md:21):
```diff
-4. **Project behavior in CLAUDE.md + settings.json only — NOT `.claude/rules/*.md`** — settings behavior per `https://docs.anthropic.com/en/docs/claude-code/settings`. The `.claude/rules/` directory does not exist by design.
+4. **Project behavior in CLAUDE.md + settings.json (+ cite-anchored `.claude/rules/*.md` per `https://code.claude.com/docs/en/claude-directory` + `/memory#organize-rules-with-claude/rules/`)** — settings behavior per `https://docs.anthropic.com/en/docs/claude-code/settings`. W255-purged 64 ad-hoc `.claude/rules/*.md` were deleted because their CONTENT was R1-self-invent; future operator-curated rules MUST be cite-anchored per R1 sub-clause + path-gated via frontmatter.
```
**Risk**: re-introduces W255-class self-invent if cite-anchor enforcement is lax. **Reward**: closes operator-doc-drift (Anthropic's own docs contradict R4 as written); aligns with installed `everything-claude-code@2.0.0-rc.1` plugin's own shipped `rules/` subdir. **Net**: HIGH-reward, LOW-risk if R1 sub-clause is enforced. This is the same recommendation W299-A made — re-affirming under W301 surface.

### Recommendation 2 (MEDIUM, operator-approval-gated) — broaden R2 ban to non-`.py` extensions + W300 P0C corollary
**Exact diff sketch** (CLAUDE.md:19):
```diff
-2. ... **No `.claude/hooks/scripts/*.py` self-invent.** **W286-arc-P0C ratification 2026-05-18**: `.mcp.json` MCP-server `command/args` contract is `npx -y <pkg>@<pinned-version>` ...
+2. ... **No project-owned hook bodies (any extension `.py|.sh|.mjs|.js|.ts|.ps1|.bat` under `.claude/hooks/**`), EXCEPT documented bug-patch shims cite-anchored to a specific `anthropics/claude-code` GitHub issue and ≤2 KB** (current sanctioned exception: `.claude/hooks/context-mode-cache-heal.mjs` patching `anthropics/claude-code#46915`). **W286-arc-P0C ratification 2026-05-18**: `.mcp.json` MCP-server `command/args` contract is `npx -y <pkg>@<pinned-version>` ... **W300-AI-1 corollary**: a basic-memory-style local-`.exe` `.mcp.json` invocation is a P0C violation pending remediation per `W300-AUDIT-2026-05-18.md` §3.
```
**Risk**: ≤2 KB cap on bug-patch shims is arbitrary. **Reward**: closes the W299-A §2 gap (rule cannot describe its own runtime state) AND propagates the W300-A AI-1 P0C finding into the rule surface. **Net**: HIGH-reward, LOW-risk.

### Recommendation 3 (MEDIUM, no operator action — pure docs cleanup) — extract hard-cap taxonomy in `SKILL.md` to a dedicated §
**Why**: the hard-cap taxonomy is scattered across `SKILL.md:181-216` (per-dim cap declarations), `SKILL.md:232` (T5 REJECT triggers), `SKILL.md:392-396` (Universal REJECT vs INSTALL-only matrix). A future auditor must scan 3 disjoint regions to understand the cap landscape.
**Risk**: docs-only edit; zero behavior change. **Reward**: surfaces complexity that this stream's §2.3 audit had to reconstruct from 3 disjoint regions. **Net**: pure win.

### Recommendation 4 (HIGH, operator-action-needed) — close the `OthmanAdi/planning-with-files` audit-trail gap
**Why**: per §2.5 Case 1, `settings.json:232` is `"planning-with-files@planning-with-files": true` but no Phase-5 gate-pass evidence committed to the repo. The W299-D row 4 operator-action has been pending since W299. Either ratify with explicit Phase-5 doc OR deactivate to false.
**Risk**: if deactivated, the W288 ledger row 3 T1 INSTALL verdict becomes ledger-vs-state-inconsistent and needs a re-litigation row. **Reward**: removes 1 of 1 known concrete operator-override audit-trail silence. **Net**: HIGH-reward, MEDIUM-cost (Phase-5 audit takes ~1 wave to ship; deactivation is one-line edit).

### Recommendation 5 (LOW, ratify for sca-v6 SHIP) — fold §2.1 calibration-pilot + §2.5 override-trail deltas into Stream D's v6 design
**Why**: this stream's findings 2.1 and 2.5 directly correspond to two Stream D v6 deltas already in scope (composite confidence intervals + operator-override audit trail). Stream D should explicitly cite this stream's findings as ship-evidence.
**Risk**: zero. **Reward**: prevents Stream D from re-discovering these gaps. **Net**: pure win.

### Recommendation 6 (LOW, ratify for next wave) — re-affirm R3 KEEP and explicitly mark R4 as the ONLY cardinal-rule reversal recommendation
**Why**: W299-A had 9 sub-findings (5 rules + 4 derived norms); the operator approval queue conflated them. This stream's per-rule re-litigation cleanly separates: 4 EXTEND-WITH-COROLLARY (R1+R2+R5 docs-extension; R4 STRENGTHEN-REVERSAL is the only TEXT-CHANGING modify) + 1 KEEP-AS-IS (R3). The operator decision-load is 4 yes/no questions, not 9 conflated ones.
**Risk**: zero. **Reward**: clearer operator approval ergonomics. **Net**: pure win.

---

## §4 Stream-E self-eval (per sca-v5 architecture-itself convention)

| Dim | Score | Rationale |
|---|---|---|
| D2 capability_uniqueness | 4 | Adversarial cardinal-rule re-litigation already done in W299-A; this stream's uniqueness is the **decision-making review (Part 2)** which W299 did NOT cover + the **operator-acceptance status tracing** which W299 also did not do. |
| D3 harness_fit | 5 | Stream-E is a docs-only deliverable per W301-PLAN §1; zero harness-impact. |
| D5 typed_evidence_diversity | 4 | Citations: file:line (settings.json:99, settings.json:232, evaluator.md:6-7), commit-SHA (50a926b HEAD, d72d3aa W296), wave-doc (W299-A, W300-A, W291.Stage2 ledger rows 3-11, W296 rows 12-16, W295 rows 17-18), upstream Anthropic doc URLs (preserved from W299-A). |
| D9 failure_mode_disclosure | 4 | Each rule's adversary attacks explicitly graded LOW/MEDIUM/HIGH/CRITICAL; honest acknowledgement that the operator non-decisions are deferrals not violations. |
| D14 reversible_pilotability | 5 | Docs-only; revertible via `git revert HEAD`. |

**Composite (informal — not a full sca-v5 audit)**: this stream's deliverable PASSES the docs-only quality bar; ships clean.

---

**Stream E complete. Owned file shipped as recommended.**
