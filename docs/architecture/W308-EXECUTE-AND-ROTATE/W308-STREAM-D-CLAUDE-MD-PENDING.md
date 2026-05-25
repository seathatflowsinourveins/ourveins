# W308 Stream D — CLAUDE.md R2 Broadening + Plugin-State Fold-in (SURFACE-ONLY)

> **Wave**: W308; **Stream**: D; **Status**: SURFACE-ONLY — operator applies via separate confirmed commit
> **R4 status**: REVERSED externally pre-W308 (codex-r1 W308 VERIFIED 2026-05-19; see `CLAUDE.md:21`)
> **R2 scope**: broaden ban from `.py` only to `.py|.sh|.mjs|.js|.ts|.ps1|.bat` + add ≤2 KB bug-patch shim exception + W300-AI-1 P0C corollary
> **Owner**: agent-D-claude-md-r2-broadening (this doc)
> **Scope-restriction**: this doc OWNS only itself; CLAUDE.md / settings.json / .mcp.json are NOT edited by this stream

## §1 Why this stream

Per `W301-STREAM-E-CARDINAL-RULE-AND-DECISION-MAKING.md:330-336` Recommendation 2 + `W300-AUDIT-2026-05-18.md` §3 AI-1 (P0C-CR-9 exception case for basic-memory local-`.exe` invocation):

R2 today (CLAUDE.md:19) literally reads "No `.claude/hooks/scripts/*.py` self-invent" — this is precise to the W255 historic violation pattern (a `scripts/` subdir under `.claude/hooks/` × 33 `.py` files) but **textually narrow**. The W301 Stream E adversarial analysis identified two weaknesses:

- **Adversary 1 (rule too strict)**: the runtime legitimately needs `.claude/hooks/context-mode-cache-heal.mjs` to patch upstream `anthropics/claude-code` cache-corruption — but its non-`.py` extension AND non-`scripts/` location render R2-as-written unable to describe its own legitimate state. Strength: HIGH.
- **Adversary 2 (rule too loose)**: the narrow textual ban masks the broader W255 spirit (no project-owned hook bodies). A future drift could re-introduce 22,060 LOC of self-invent under `.mjs` or `.sh` and never hit R2's literal text. Strength: HIGH.

The W301 Stream E codex-r1 review also flagged a citation-gap: R2's narrow text creates audit-friction because the runtime's `.claude/hooks/context-mode-cache-heal.mjs` is provably-legitimate (patches `anthropics/claude-code#46915` cache-corruption) yet uncovered by R2-as-written.

The W300-AI-1 finding adds an orthogonal P0C corollary: `.mcp.json` basic-memory invocation uses a local-`.exe` path rather than `npx -y <pkg>@<pinned-version>` per R2's W286-arc-P0C ratification — this is a known-exception pending remediation, and R2 should acknowledge it surface-level rather than appear-as-violated.

## §2 The exact diff to apply (CLAUDE.md:19)

```diff
-2. **Hooks may only be upstream plugin hooks OR direct upstream-CLI invocations** declared in `.claude/settings.json` — semantics per `https://docs.anthropic.com/en/docs/claude-code/hooks`. **No `.claude/hooks/scripts/*.py` self-invent.** **W286-arc-P0C ratification 2026-05-18**: `.mcp.json` MCP-server `command/args` contract is `npx -y <pkg>@<pinned-version>` (per W286-cross commits `fcafe05`+`77dc081`); W155 F13 native-node migration RETIRED — CR-9 version-pin discipline wins over spawn-churn optimization. The W280a Stop-hook codex-review-gate auto-enforces post-commit.
+2. **Hooks may only be upstream-plugin hooks OR direct upstream-CLI invocations** declared in `.claude/settings.json` — semantics per `https://docs.anthropic.com/en/docs/claude-code/hooks`. **No project-owned hook bodies (any extension `.py|.sh|.mjs|.js|.ts|.ps1|.bat` under `.claude/hooks/**`), EXCEPT documented bug-patch shims cite-anchored to a specific `anthropics/claude-code` GitHub issue and ≤2 KB** (current sanctioned exception: `.claude/hooks/context-mode-cache-heal.mjs` patching `anthropics/claude-code#46915` [PLACEHOLDER — operator confirms exact upstream issue number at apply-time]). **W286-arc-P0C ratification 2026-05-18**: `.mcp.json` MCP-server `command/args` contract is `npx -y <pkg>@<pinned-version>` (per W286-cross commits `fcafe05`+`77dc081`); W155 F13 native-node migration RETIRED — CR-9 version-pin discipline wins over spawn-churn optimization. **W300-AI-1 corollary** (added W308): a basic-memory-style local-`.exe` `.mcp.json` invocation is a P0C-CR-9-exception case pending remediation per `W300-AUDIT-2026-05-18.md` §3. The W280a Stop-hook codex-review-gate auto-enforces post-commit.
```

### §2.1 Citation-anchor note (operator-must-confirm at apply-time)

The diff above cites `anthropics/claude-code#46915` for the sanctioned `context-mode-cache-heal.mjs` shim exception. This issue number is a **PLACEHOLDER** flagged in this design doc — the actual upstream issue tracking the cache-corruption bug-patch this shim patches MUST be operator-confirmed before the diff lands. Three options:

1. Operator confirms `#46915` is the correct upstream issue → apply diff verbatim.
2. Operator substitutes the actual issue number → edit diff inline before applying.
3. Operator confirms no upstream issue yet exists → file the issue first, then update the diff with the assigned number before applying.

This placeholder is per the agent's task-prompt constraint: "The diff MUST cite the exact `anthropics/claude-code#46915` issue OR mark it as a placeholder pending operator-confirm of the actual issue number for the context-mode-cache-heal.mjs shim."

## §3 Pre-application checklist

| Check | Status | Notes |
|---|---|---|
| CLAUDE.md current LOC | 42 | Verified `Read` on CLAUDE.md (above); codex-r1 W308 spot-check confirmed |
| R4 reversal landed | ✓ | CLAUDE.md:21 shows updated R4 with W308 reversal note (W299-A REVERSAL W308 2026-05-19) |
| Post-application LOC estimate | ~45 | New R2 paragraph adds ~3 LOC of dense prose (the diff replaces 1 paragraph with 1 longer paragraph; total prose change ~+3 lines after wrap) |
| ≤50 LOC cap headroom | ~5 LOC remaining | Post-application LOC ~45 leaves ~5 LOC headroom under the pointer-only-root invariant |
| `.claude/hooks/context-mode-cache-heal.mjs` exists | ✓ | Verified: 28 LOC, 1656 bytes (well under ≤2 KB cap) |
| settings.json | UNTOUCHED | Out of this stream's ownership |
| .mcp.json | UNTOUCHED | Out of this stream's ownership |
| `self_invented_count: 0` invariant | PRESERVED | Diff adds rule text only; no new project-owned hook bodies introduced. The `context-mode-cache-heal.mjs` shim already exists and is sanctioned-by-citation, not "self-invented" |

## §4 Risk analysis

**Risk level**: LOW.

- **Type of change**: text-only rule-broadening (BROADEN-NOT-NARROW). The change tightens R2's surface (closes the W255 spirit-vs-letter loophole adversary 2) while simultaneously legitimizing the one provably-needed exception (adversary 1 closure via cite-anchored ≤2 KB bug-patch shim).
- **Behavioral impact**: zero immediate runtime effect — the diff documents existing legitimate state (`context-mode-cache-heal.mjs` already exists at 28 LOC / 1656 bytes; basic-memory `.mcp.json` invocation already exists). The diff aligns rule text with reality, not vice versa.
- **Future-drift impact**: tightens the surface against `.mjs/.sh/.ps1/.bat/.js/.ts` re-introduction of W255-class self-invent. Closes a genuine attack-surface.
- **Adversary closures**:
  - Adversary 1 (rule too strict): CLOSED via cite-anchored ≤2 KB exception.
  - Adversary 2 (rule too loose): CLOSED via broadened extension list `.py|.sh|.mjs|.js|.ts|.ps1|.bat`.
- **Cardinal-rule-self-citation**: the W300-AI-1 corollary surfaces a known-exception under the rule's text itself, rather than letting it appear as a silent violation. This is a HIGH-value audit-trail improvement.

**Residual risks**:
- The ≤2 KB cap on bug-patch shims is operator-curated and arbitrary — but defensible per the principle "if a shim needs to grow past 2 KB it should be filed as an upstream PR, not perpetuated as a project-owned workaround".
- If the placeholder citation `anthropics/claude-code#46915` is incorrect, the rule-text would carry a wrong cite. Mitigation: §2.1 operator-confirm step.

## §5 Rollback

If the operator-applied R2 broadening commit causes any regression or downstream-doc inconsistency:

```bash
git revert HEAD --no-edit  # reverts the R2-broadening commit specifically
```

CLAUDE.md returns to the pre-W308 R2 narrow text. The `context-mode-cache-heal.mjs` shim and basic-memory `.mcp.json` invocation are unaffected by the rollback (they exist independent of R2's text).

## §6 Operator confirm + apply procedure

1. **Review this doc** — operator reads §1-§5.
2. **Resolve the placeholder citation** per §2.1 (confirm `#46915` or substitute the correct upstream issue number).
3. **Apply via Edit tool** with explicit `Edit(CLAUDE.md)` permission grant per `settings.json:51-55` permission scheme.
4. **Verify post-apply LOC** — `wc -l CLAUDE.md` must report ≤50 (target ~45).
5. **Commit** with message `docs(CLAUDE.md): R2 broaden ban to non-.py + ≤2KB shim exception + W300-AI-1 corollary (W308 Stream D)`.
6. **Codex Stop-hook auto-fires** per W280a → adversarial cross-model review → BLOCK on critical/high → operator clears or addresses per review.

## §7 Plugin-state §2.4 fold-in (W301 audit-trail backfill)

Per `W301-SYNTHESIS-2026-05-18.md` §2.4 (lines 174-194), commit `98a83d2` shipped two pre-existing `.claude/settings.json` `enabledPlugins` changes that landed unledgered prior to the codex-r1 HIGH-1 disclosure:

- `agent-skills@addy-agent-skills` REMOVED from `enabledPlugins` (W290 cleanup alignment — plugin already uninstalled at marketplace layer per `W290-AUDIT-2026-05-18.md:58-63`; this commit aligned the project `enabledPlugins` declaration with the already-uninstalled state, NOT a new uninstall).
- `hookify@claude-plugins-official` flipped `true → false` (W255/W278 hook-cleanup alignment — prior `true` was inconsistent residue from before the hook-disable; flipping to `false` aligns declaration with hook-disabled state).

**Plugin count delta**: 62 → 62 (no net change; the addy-agent-skills was already uninstalled at marketplace layer; `enabledPlugins` aligned to runtime).

**Fold-in mechanism**: NO change to CLAUDE.md text is required for the §2.4 backfill — `W301-SYNTHESIS-2026-05-18.md` §2.4 already documents these state changes formally per codex-r1 W301-HIGH-1 prescription. This stream simply records the back-reference here for the W308 audit trail. Future CLAUDE.md history-comment blocks (if added) can cite `W301-SYNTHESIS-2026-05-18.md` §2.4 for the audit-trail provenance.

**No additional CLAUDE.md edit is requested** for the §2.4 fold-in — it is a documentation back-reference, not a new state change.

## §8 Cardinal-rule conformance

| Rule | Conformance | Notes |
|---|---|---|
| R1 (trusted-only plugins) | ✓ PRESERVED | No plugin install/uninstall in this stream |
| R2 (hook discipline) | ✓ STRENGTHENED | This diff broadens R2's surface (more strict ban on more extensions) + adds cite-anchored exception |
| R3 (subagents = installed upstream agents) | ✓ PRESERVED | No agent definitions changed |
| R4 (CLAUDE.md/settings.json/.claude/rules) | ✓ COMPATIBLE | R4 already reversed externally pre-W308 (CLAUDE.md:21); R2 broadening is orthogonal to R4 |
| R5 (safety via Claude Code permissions) | ✓ PRESERVED | No custom guard scripts introduced |

**Invariant validation post-apply**:
- `find .claude/hooks -type f -name '*.py' -o -name '*.sh' -o -name '*.mjs' -o -name '*.js' -o -name '*.ts' -o -name '*.ps1' -o -name '*.bat' | wc -l` MUST equal exactly 1 (the sanctioned `context-mode-cache-heal.mjs` shim).
- `wc -l CLAUDE.md` MUST report ≤50.
- `wc -c .claude/hooks/context-mode-cache-heal.mjs` MUST report ≤2048 bytes (currently 1656).

## §9 References

- `CLAUDE.md:19` (current R2 text; pre-apply)
- `CLAUDE.md:21` (R4 reversal landed externally pre-W308; codex-r1 W308 VERIFIED)
- `docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/W301-STREAM-E-CARDINAL-RULE-AND-DECISION-MAKING.md:330-336` (Recommendation 2 source)
- `docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/W301-SYNTHESIS-2026-05-18.md:174-194` (§2.4 plugin-state fold-in source)
- `docs/architecture/W300-AUDIT-2026-05-18.md` §3 (W300-AI-1 P0C-CR-9 corollary source)
- `.claude/hooks/context-mode-cache-heal.mjs` (sanctioned bug-patch shim; 28 LOC / 1656 bytes)
- `https://docs.anthropic.com/en/docs/claude-code/hooks` (R2 cite-anchor)
- `https://code.claude.com/docs/en/plugins` (R1 cite-anchor)
- `https://docs.anthropic.com/en/docs/claude-code/settings` (R5 + R4-reversal cite-anchor)
