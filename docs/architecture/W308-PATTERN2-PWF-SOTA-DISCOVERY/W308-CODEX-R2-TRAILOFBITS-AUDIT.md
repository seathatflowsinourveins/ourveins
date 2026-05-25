# W308 Codex r2 — Trail of Bits Curated PWF Fork Audit (2026-05-19)

> **Model**: gpt-5.5 via codex CLI v0.130.0 · **Session**: separate from r1
> **Tokens**: ~similar to r1; **Cost**: <$2 · **Web access**: enabled
> **Dispatched by**: Claude Opus 4.7 session in response to operator "use gpt5.5 aggressively" directive
> **Trigger**: codex r1 (W308-CODEX-R1-GPT5-5-REVIEW.md) surfaced Trail of Bits curated fork as NEW 3rd-path option for PWF DEACTIVATE-vs-RATIFY decision. This audit closes that 3rd-path question with a full sca-v5 verdict.

## §0 TL;DR

**T3 PATTERN-STUDY** + **Operator-action: DEACTIVATE BOTH** OthmanAdi/PWF AND trailofbits/skills-curated/plugins/planning-with-files.

This is a 2-codex convergent verdict closing the PWF DEACTIVATE decision with strong evidence:

- W308-Stream-B (Claude Opus 4.7 audit): strict-letter Phase-5 4-of-5 FAIL → CONDITIONAL-RATIFY default-DEACTIVATE
- Codex r1 (GPT-5.5 cross-model review): DEACTIVATE unless replacing with Trail of Bits curated fork
- Codex r2 (THIS audit, GPT-5.5 full sca-v5 of the fork): **T3 PATTERN-STUDY — DEACTIVATE BOTH**

Operator-state confirmed: PWF already flipped to `false` in `.claude/settings.json:enabledPlugins:263` at commit `edddf94` (sibling session). **This codex r2 verdict RATIFIES that decision.**

## §1 Composite scores

- **install_score: 7.6 / 16.5** (= 0.46 normalized; far below T1 threshold ≥4.0)
- **pattern_score: 5.6 / 7.1** (= 0.79 normalized; borderline T3)

Main deductions on install_score:
- License ambiguity (upstream MIT vs curated CC-BY-SA surfaces both exist)
- No release artifact (no per-plugin changelog, no pinned releases — only HEAD SHA available)
- No curated-fork-specific benchmark (the original's 96.7% benchmark applies to hook-heavy original, NOT curated fork that DROPS expensive hooks)
- Duplication vs native TodoWrite + eee planning gates
- Weakened autonomous-loop evidence (curated fork is a different architecture from the benchmarked original)

Main support on pattern_score:
- Clean three-file durable planning pattern (`task_plan.md` + `findings.md` + `progress.md`)
- Low implementation complexity (extractable in <100 LOC)
- Reversible manual use (no permanent runtime state)

## §2 3-persona adversarial review (codex r2 fan-out)

### §2.1 Security reviewer

- Curated fork IMPROVES posture by dropping expensive hooks + multi-IDE bloat
- BUT still retains Stop hook (not hook-free)
- Trail of Bits says curated entries are code-reviewed line-by-line → real safety uplift
- License ambiguity = supply-chain governance risk
- No release artifact = rollback-by-version weaker than rollback-by-SHA
- **Verdict**: Do not install by default. Manual SHA-pinned no-autoupdate pilot OK only with explicit operator hook+license risk acceptance.

### §2.2 Architect

- Core abstraction is simple: 3 plan-files + read-before-decide pattern
- Original's strong architecture relies on PreToolUse/PostToolUse hooks for plan injection (curated fork DROPS these)
- Curated fork ≠ benchmarked original = different architecture
- eee already has planning + cross-model gates + file-backed rule discipline = high duplication
- **Verdict**: Extract the pattern, NOT the plugin. Local conventions or tiny eee-native command if adoption desired.

### §2.3 Code reviewer

- Small visible surface: 1 skill + 2 commands + hooks
- Original has substantial churn → activity proven but broad bug surface
- Trail of Bits curated repo: 35 commits + 0 releases = insufficient to establish ongoing per-plugin maintenance beyond initial curation drop
- No test harness, no release artifacts, no per-plugin changelog visible
- **Verdict**: Reject default installation until pinned release + explicit plugin license file + curated-fork-specific smoke test exist.

**Net 3-persona**: 3 of 3 REJECT-default-install.

## §3 Comparison vs original OthmanAdi/PWF

Trail of Bits curated fork changes:
- Restructured as curated Claude Code plugin
- Removes multi-IDE bloat
- **Drops expensive hooks** (PreToolUse + PostToolUse + UserPromptSubmit + SessionStart all removed)
- Cleans templates
- Visibly retains only Stop hook in documented component table
- Exposes `/plan` and `/status` (slim)

Original retains:
- Full hook-suite (5 lifecycle hooks)
- Broad IDE matrix
- The 96.7% benchmark applies HERE (NOT to the fork)

**Critical insight**: Trail of Bits dropped exactly the components that drove the original's measured performance. The fork's pattern remains but its capability claim is unverified.

## §4 Maintenance signal

| Signal | Original | Trail of Bits curated |
|---|---|---|
| Stars | 21.5k★ | Trail of Bits skills-curated repo (not per-plugin) |
| Commits | Substantial churn | 35 commits total |
| Releases | Multiple | **0 releases** |
| Per-plugin changelog | Yes | **No** |
| Version | (multiple) | v1.0.0 (single drop) |
| Continued maintenance proof | Yes | **NOT proven** |

## §5 Cardinal-rule conformance (codex r2 check)

- **R1** cite-primary: PASS for audit; FAIL for install (insufficient primary evidence for install-grade claims)
- **R2** upstream-install: FAIL for default install (curated fork is downstream of OthmanAdi; original previously failed strict sca-v5)
- **R3** cross-model adversarial: PASS for audit intent (3-persona + codex r1 + r2 = quadruple-judge convergence)
- **R4** minimal-diff/no speculative primitive: PASS only if DEACTIVATED (install introduces duplicate planning primitive vs native TodoWrite)
- **R5** no contamination/no star-anchor: FAIL for T1/T2; PASS for T3 (curated fork cannot claim original benchmark performance after dropping expensive hooks)
- **W286 P0C**: NO-GO for default activation (hook behavior + no releases + ambiguous license)

## §6 Final decision (codex r2)

**T3 PATTERN-STUDY** + **Operator-action: DEACTIVATE BOTH**.

Trail of Bits curated PWF is the better artifact if a human INSISTS on a PWF pilot, but strict sca-v5 does NOT justify default runtime adoption. The right move:
- Keep the durable-file planning IDEA
- Discard the plugin dependency for now
- Revisit ONLY IF Trail of Bits publishes:
  - Pinned release
  - Explicit per-plugin license
  - Curated-fork-specific changelog
  - Fork-specific smoke tests
  - Independent capability evidence (replicating or supplanting the original's hook-heavy benchmark)

## §7 Pattern extraction (the operator-actionable takeaway)

For complex tasks spanning many steps or sessions, eee-native pattern: maintain `task_plan.md` + `findings.md` + `progress.md` files. Use native TodoWrite for ordinary work. Document this as a `.claude/skills/` operator-curated skill if adoption desired.

(Pattern extraction is independent of any plugin install. Zero runtime risk. Zero supply chain. Reversible by deleting the 3 files.)

## §8 Rollback plan (if operator overrides to T1/T2)

Only needed if operator rejects T3 verdict:

1. Record current `settings.json:enabledPlugins` before change
2. Add ONLY `trailofbits/skills-curated/plugins/planning-with-files` at SHA `022fa0948818c9f2f738a428f4546cc65c427767`
3. Disable original `OthmanAdi/planning-with-files` to avoid duplicate `/plan` `/status` command resolution
4. Smoke task: invoke `/plan` → verify 3-file creation → invoke `/status`
5. Verify no unexpected hook writes / no command-resolution conflicts
6. Roll back by removing entry + deleting pilot files

**Exit-immediately criteria**: Stop hook blocks eee lifecycle / planning files capture secrets / `/plan`+`/status` command conflicts

## §9 Operator-action queue update

**RESOLVED**: PWF DEACTIVATE-vs-RATIFY decision (codex r1 + codex r2 convergent verdict = DEACTIVATE both; already applied at `edddf94` by sibling)

**NEW carry-forward**:
- (W310+) Author `.claude/skills/durable-planning-files/SKILL.md` (operator-curated) capturing the extracted 3-file planning pattern. Cite this audit as evidence for the pattern's value + reasons for not adopting either plugin form.

## §10 Cite-anchors

- Codex r2 raw output: `tmp/codex-output/w309-trailofbits-audit.md` (932 LOC raw; final synthesis ~180 LOC strip-ANSI)
- Codex r1 review: `docs/architecture/W308-PATTERN2-PWF-SOTA-DISCOVERY/W308-CODEX-R1-GPT5-5-REVIEW.md`
- W308-Stream-B re-litigation: `W308-STREAM-B-PWF-PHASE5-RELITIGATION.md`
- Trail of Bits curated PWF plugin page: https://agentskill.sh/plugins/trailofbits/planning-with-files
- Trail of Bits skills-curated repo: https://github.com/trailofbits/skills-curated
- OthmanAdi/PWF README: https://github.com/OthmanAdi/planning-with-files
- OthmanAdi/PWF Codex docs: https://github.com/OthmanAdi/planning-with-files/blob/master/docs/codex.md
- Settings.json:enabledPlugins:263 (post-deactivate state at HEAD)
- Edddf94 commit (the deactivation commit, sibling-shipped)

## §11 Net codex-r1+r2 ratification status

- W308-Stream-B verdict (CONDITIONAL-RATIFY default-DEACTIVATE): **RATIFIED + EXTENDED** by 2 codex passes
- 3rd-path option (Trail of Bits curated fork): **EVALUATED + REJECTED** by codex r2 — not adequate for default adoption
- Convergent operator-action: **DEACTIVATE BOTH** (already applied)
- Pattern preservation: **RECOMMENDED** as `.claude/skills/durable-planning-files/SKILL.md` operator-curated entry for W310+

## §12 Cardinal-rule self-check (this commit)

- R1 ✓ no install; codex verdict is RECOMMEND-only beyond confirming already-applied DEACTIVATE
- R2 ✓ no `.claude/hooks/scripts/*.py` added
- R3 ✓ codex CLI dispatch + 3-persona fan-out per documented W280a Path P pattern
- R4 REVERSED ✓ (per W308 Batch-A 609cba0)
- R5 ✓ safety via CC permissions
- W286 P0C ✓
- `self_invented_count: 0` ✓
