# Proposed CLAUDE.md edits (P0.9 cardinal-rule audit)

> Wave **W330** · 2026-05-19 · Codex round-1 axis-1 findings #2-#6 absorb. **Operator-review-gated** — these edits are NOT applied this session. Operator inspects, then applies via Edit tool with explicit per-line approval.

## §1 Edits proposed

### Edit 1 — CR-1 trust definition extension (axis-1 #3)

**Current (CLAUDE.md L18)**:
```
1. **Install primitives only from trusted plugins/skills/agents** — plugin structure + install flow per `https://code.claude.com/docs/en/plugins`. **W270 corollary (install-state drift governance)**: primitive validity = trusted-source + active-scope + commit-SHA-freshness + post-`/plugin install` `/reload-plugins` verification. Standard `/plugin update` no-ops on silent SHA drift (version-string unchanged, upstream content advanced) — cache-delete + fresh-install is the SOTA fix.
```

**Proposed**:
```
1. **Install primitives only from trusted plugins/skills/agents** — plugin structure + install flow per `https://code.claude.com/docs/en/plugins`. **W270 corollary (install-state drift governance)**: primitive validity = trusted-source + active-scope + commit-SHA-freshness + post-`/plugin install` `/reload-plugins` verification. Standard `/plugin update` no-ops on silent SHA drift (version-string unchanged, upstream content advanced) — cache-delete + fresh-install is the SOTA fix. **W330 axis-1 #3 extension**: "trusted" tuple ADDS (a) maintainer-identity verifiable via signed releases (SLSA-L3 attestation OR npm provenance OR PGP/Sigstore for git tags); (b) license risk audit (MIT/Apache/BSD/ISC/MPL accepted; AGPL/SSPL/proprietary case-by-case); (c) malicious-update review (≥1 commit older than 30 days OR explicit operator-pin); (d) dependency blast-radius (transitive `npm ls --depth=0` clean; no known-compromised packages per Socket.dev/Snyk). Cite: SLSA v1.0 + CycloneDX SBOM spec + OSSF Scorecard.
```

### Edit 2 — CR-2 ≤2KB mechanization (axis-1 #4)

**Current (CLAUDE.md L19)**:
```
2. **Hooks may only be upstream-plugin hooks OR direct upstream-CLI invocations** declared in `.claude/settings.json` — semantics per `https://docs.anthropic.com/en/docs/claude-code/hooks`. **No project-owned hook bodies (any extension `.py|.sh|.mjs|.js|.ts|.ps1|.bat` under `.claude/hooks/**`), EXCEPT documented bug-patch shims cite-anchored to a specific `anthropics/claude-code` GitHub issue and ≤2 KB** (current sanctioned exception: `.claude/hooks/context-mode-cache-heal.mjs` patching `anthropics/claude-code#46915` — verified open 2026-04-12, title "Plugin auto-update deletes old cache dir, breaking ${CLAUDE_PLUGIN_ROOT} in running sessions"). [...]
```

**Proposed inline append after "≤2 KB"**:
```
[append after "≤2 KB"]: **W330 axis-1 #4 mechanization**: `PreToolUse[Edit|Write]` hook MUST inspect target path; if path matches `.claude/hooks/**` AND file size after edit >2048 bytes, BLOCK with explicit message "CR-2 violation: bug-patch shim exceeds 2KB ceiling". Issue #46915 verified STILL OPEN 2026-05-10 (W330 orchestrator probe), exception remains valid until upstream merges fix.
```

### Edit 3 — CR-3 dispatch-site allowlist (axis-1 #5)

**Current (CLAUDE.md L20)**:
```
3. **Subagents = installed upstream agents OR documented subagent system** — per `https://docs.anthropic.com/en/docs/claude-code/sub-agents`.
```

**Proposed**:
```
3. **Subagents = installed upstream agents OR documented subagent system** — per `https://docs.anthropic.com/en/docs/claude-code/sub-agents`. **W330 axis-1 #5 mechanization (Δ-DPA-5)**: every `Agent` dispatch MUST pre-flight validate `subagent_type` against the runtime allowlist (`tools/preagent-subagent-validator.mjs` enforces; emits WARN with fuzzy top-3 matches on unknown name; defensive-default: HARD-BLOCK until empirical CC behavior on unknown subagent_type is verified per `docs/architecture/W320-P0-CLOSURES/W320-A-2-SUBAGENT-TYPE-TYPO-TEST.md`).
```

### Edit 4 — CR-4 33-skill trigger audit (axis-1 #6)

**Current (CLAUDE.md L21)**:
```
4. **Project behavior in CLAUDE.md + settings.json**; `.claude/rules/*.md` permitted ONLY if (a) upstream-plugin-shipped OR (b) operator-curated path-gated via SKILL.md — NO ad-hoc auto-fire prompts (W255 spirit). [...]
```

**Proposed inline append after "(W255 spirit)"**:
```
[append after "(W255 spirit)"]: **W330 axis-1 #6 corollary**: operator-curated local skills under `.claude/skills/<name>/SKILL.md` MUST pass a per-skill trigger audit — `description:` phrase cardinality ≤8 distinct triggers; no overlap with sibling-skill triggers >50%; auto-fire-cardinal-rule explicitly stated. The same standard applied to alirezarezvani's 313-skill bundle in W330 Stream B-2 retire-verdict applies symmetrically to the 33 local skills.
```

### Edit 5 — CR-5 contradiction resolution (axis-1 #2 — CRITICAL)

**Current (CLAUDE.md L22)**:
```
5. **Safety boundaries via Claude Code permissions + sandboxing**, NOT custom guard scripts — per `https://docs.anthropic.com/en/docs/claude-code/settings`.
```

**Proposed**:
```
5. **Safety boundaries via Claude Code permissions + sandboxing**, NOT custom guard scripts — per `https://docs.anthropic.com/en/docs/claude-code/settings`. **W330 axis-1 #2 resolution**: `tools/preagent-*.mjs` files (parallel-guard, subagent-validator) are classified as **observability instrumentation** (audit-log / telemetry / advisory) — CR-5 spirit-compliant as long as they emit `exit 0` (advisory). Promotion to "binding gate" (`exit 2` blocking) requires either (a) the gate is moved to an upstream-supported anthropics-canonical hook surface (settings.json hooks already-supported events), OR (b) explicit operator-confirmed cardinal-rule-5 exception cite-anchored to a specific `anthropics/claude-code` issue documenting the upstream gap.
```

## §2 Application order

These edits are independent and can be applied in any order. Recommended: 1 → 2 → 5 → 3 → 4 (foundation first, then mechanization, then specific gates).

## §3 Verification checklist (post-application)

- [ ] CLAUDE.md still ≤50 LOC body (extensions land in pointer-only-friendly inline appends; verbose rationale in W330-MEGA-AUDIT/)
- [ ] `self_invented_count: 0` preserved
- [ ] All cite URLs reachable (W295 I1 ≥3-org-distinct each)
- [ ] Edit 5 specifically: P0.3 parallel-guard exit-code flip (W331 P0) now has BOTH (a) and (b) conditions documented — either path is operator-electable

## §4 Rollback

Single `git revert <commit-sha>` reverses all 5 edits if landed in one commit. Recommended commit subject: `docs(claude.md): W330-axis-1 cardinal-rule audit absorb (CR-1..5 tightening)`.
