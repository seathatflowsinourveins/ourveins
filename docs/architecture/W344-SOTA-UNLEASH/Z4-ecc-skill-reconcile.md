# Z4 ECC 313-vs-50+ Skill-Count Reconcile — W344-FULL-SOTA-UNLEASH P1.11

**Plugin**: everything-claude-code (ECC) — `affaan-m/everything-claude-code` per local clone dir
**Wave**: W344 Stream Z4
**Date**: 2026-05-20
**Claim observed in prompt**: "claimed 313 skills vs my runtime's installed-skills view (~50+ visible)"
**Reality**: The 313 number is an alirezarezvani/claude-skills attribution, NOT ECC's count

## Probe-paths

### A) ECC plugin source repo (local clone)
- **Path**: `Z:/repos/deps/everything-claude-code/`
- **Skill-locations found**: `.agents/skills/`, `.claude/skills/`, `.cursor/skills/`, `.kiro/skills/`, `docs/ja-JP/skills/`
- **Canonical skill-count under `skills/`**: **255 skill directories** (via `find -maxdepth 2 -type d`)
- **No top-level `plugin.json`** — ECC ships per-namespace plugin definitions

### B) Local installed cache
- **Path**: `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/`
- **SKILL.md file-count (multi-tool fan-out across `.agents/.claude/.cursor/.kiro/docs/ja-JP/`)**: **773 SKILL.md**
- **Version**: 2.0.0-rc.1 (per cache dir name)

### C) My runtime's Skill-tool view
- Available-skills list (per session-context) shows ~50+ ECC-namespace-prefixed skills via plugin entries like:
  - `engineering-advanced-skills:*` (~30+)
  - `engineering-skills:*` (~25+)
  - `developer-essentials:*` (10)
  - `llm-application-dev:*` (~10)
  - `incident-response:*` (4)
  - `tdd-workflows:*` (3)
  - `agent-teams:*` (~10)
  - `plugin-eval:*` (3)
  - `pr-review-toolkit:*` (1)
  - `code-modernization:*` (7)
  - `commit-commands:*` (3)
  - `outputai:*` (~40)
  - `shell-scripting:*` (3)
  - `superpowers:*` (~10)
- These add up to ~150+ enabled ECC-namespace skills, NOT just 50 — the prompt's "~50+ visible" was a conservative undercount

## Reconciliation Table

| View | Count | Source | Notes |
|------|-------|--------|-------|
| Marketing claim (alirezarezvani) | 313 | alirezarezvani README | DIFFERENT REPO — not ECC |
| alirezarezvani CLAUDE.md | 205 | github raw fetch | Internal contradiction with their own README |
| ECC canonical source skills/ | 255 | local-fs `find -maxdepth 2 -type d` | ECC actual count |
| ECC cache (multi-tool variants) | 773 | local-fs cache scan | ECC × ~3 adapter copies per skill |
| Runtime exposed (Skill-tool list) | ~150+ | session-context inventory | Subset enabled per `.claude/settings.json:enabledPlugins` |

## Hypotheses tested

### H1 — "313 is fabrication" → FALSE
The 313 number IS sourced in alirezarezvani README + GitHub Pages site (perplexity-cross-validated). It is real marketing, just not for ECC.

### H2 — "313 is sub-skill counting" → PARTIAL
alirezarezvani README says **313 skills + 46 agents + 60 commands + 7 personas + ~402 Python tools**. The 313 itself counts canonical SKILL.md (root + 12 multi-tool adapter copies × 313 = ~4069 total files, plausible). But the 313 is alirezarezvani's count, NOT ECC's count.

### H3 — "Disabled / shadowed skills" → TRUE (PARTIAL)
10 `@claude-code-skills` plugins SOFT-DISABLED per CLAUDE.md L43 W342 X4 §4 (the W330 axis-2 §3.2 alirezarezvani 313→48 fabrication retirement). These are the alirezarezvani-source plugins; ECC's plugins are NOT in this disabled set.

### H4 — "Aggregate of upstream-bundle skills" → TRUE
ECC bundles upstream skills (mattpocock, superpowers, agent-teams, outputai, logfire, codex, etc.) AND ships its own. The 255-source-skills + 773-cache-SKILL.md reflects this aggregation pattern.

### H5 — "Repo-source attribution mismatch" → TRUE (root cause)
The W344 prompt phrased "everything-claude-code (ECC) plugin source — full audit; reconcile claimed 313 skills". This prompt **conflated** alirezarezvani's 313-claim with ECC. ECC never claimed 313 — that's an alirezarezvani-only marketing number.

## Verdict

**Reconcile-class: ATTRIBUTION-ERROR + COUNTING-METHOD-MISMATCH (mixed)**

The "313" is an alirezarezvani number that was misattributed to ECC in the W344 prompt formulation. Once that misattribution is fixed:

- **ECC actually ships 255 canonical skills** in source `skills/` (close to alirezarezvani's 313 in magnitude but different namespace)
- **ECC cache has 773 SKILL.md** counting multi-tool variants (.agents/.claude/.cursor/.kiro/docs/ja-JP/)
- **Runtime exposes ~150+ ECC skills** via enabled-namespace plugins (engineering-skills, engineering-advanced-skills, developer-essentials, llm-application-dev, agent-teams, outputai, superpowers, etc.) — NOT just 50

### Operator-facing reconcile

| Question | Answer |
|----------|--------|
| Are 313 ECC skills missing from my runtime? | No — 313 was never ECC's count |
| What's ECC's true skill count? | 255 canonical source skills, 773 multi-tool variants in cache |
| How many ECC skills are runtime-active? | ~150+ via enabled-namespace plugins |
| What about the alirezarezvani 313? | That's a DIFFERENT plugin (`@claude-code-skills`) currently SOFT-DISABLED stage-1 of 2-stage retire per CLAUDE.md L43 W342 X4 §4 |
| Any load_failures? | Per CLAUDE.md L34 (W342 X1): `load_failures=0` after phantom-enabled flips on `clickhouse@claude-plugins-official` + `outputai@claude-plugins-official` |
| Shadowed skills? | Yes — when a bare subagent_type collides across 6 plugins (`code-reviewer`), only FQN-form (e.g. `pr-review-toolkit:code-reviewer`) resolves correctly per CLAUDE.md L25 cardinal-rule-3 W333 D5 |

### Action

**NONE** — no fabrication on ECC's side; the prompt mis-attributed alirezarezvani's count to ECC. CLAUDE.md L34 runtime-state counts (cache_dirs=15 · installed_plugin_records=64 · enablement_entries=68 enabled_true=46 enabled_false=22 · load_failures=0) are stable. The 10 SOFT-DISABLED `@claude-code-skills` are the alirezarezvani plugins on retire-track — that's the only fabrication-class entry, and it's already on the documented retire path.
