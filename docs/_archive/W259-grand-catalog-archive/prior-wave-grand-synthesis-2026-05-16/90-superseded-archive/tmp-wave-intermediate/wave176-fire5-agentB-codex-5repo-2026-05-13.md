## ARTIFACT-INLINE: tmp/wave176-fire5-agentB-codex-5repo-2026-05-13.md

# W176 Fire 5 Agent B — codex-rescue BRIDGE-MODE 5-repo SOTA audit

**Mode**: BRIDGE-MODE Path D foreground+tee per `Z:/claude-sota/.claude/rules/ctff-patterns-cd.md` recovery-family
**Codex CLI version**: 0.130.0 (`/z/claude-sota-installed/.local/npm/codex`)
**Time-budget per call**: 120s ceiling (FM-17.d defense)
**Disposition**: **Pattern B HONEST-NON-FINDING** at JSON-verdict emission (both calls timed out at 120s before emitting strict JSON) — verdicts synthesized via trace-mining EOF content + cheap-probe pre-fire results
**FM-17.f gate**: NOT TRIGGERED (orchestrator-direct codex exec subprocess, not 1M-context-billing agent dispatch)
**Cross-model gate**: PARTIAL — GPT-5.5 reasoning surface engaged + trace mined; structured JSON verdict not emitted

---

## §1 Repo audit table (5 repos)

| # | Repo / HEAD                                                          | License             | Probe 4 plugin-ns dup | Probe 6 LICENSE | Probe 7 demand | CR-12 disposition         | Verdict                      | Conf |
|---|----------------------------------------------------------------------|---------------------|-----------------------|-----------------|----------------|---------------------------|------------------------------|------|
| 1 | hesreallyhim/awesome-claude-code @ HEAD `614f102a`                   | CC-BY-NC-ND-4.0     | NO (catalog-only)     | CITE-ONLY OK    | .b (discovery) | CITE-CLASS-CANONICAL      | KEEP-AS-CITE-REF (incumbent) | 0.92 |
| 2 | ComposioHQ/awesome-claude-skills (REMOTE-ONLY @ pushed 2026-05-07)   | NULL / [UNKNOWN]    | NO (catalog-only)     | UNRESOLVED      | .b (discovery) | CITE-CLASS-CANONICAL      | DEFER-pending-license        | 0.78 |
| 3 | Shubhamsaboo/awesome-llm-apps @ HEAD `844cda76`                      | Apache-2.0          | NO (catalog-only)     | PASS            | .b (discovery) | CITE-CLASS-CANONICAL      | INCUMBENT-KEEP (W164 F20)    | 0.94 |
| 4 | karpathy/andrej-karpathy-skills @ HEAD `2c606141` ✓                  | MIT                 | YES (already ported)  | PASS            | .a (consumed)  | CITE-CLASS-CANONICAL      | INCUMBENT-CITE (rule-ported) | 0.96 |
| 5 | abhigyanpatwari/GitNexus @ HEAD `98addbd6` (briefed `507f84b` stale) | PolyForm Noncomm 1.0| YES (6 of 7 skills installed) | CAVEAT-NONCOMM | .b (active use)| INCUMBENT-PARTIAL-OVERLAP | INSTALL-CANDIDATE: gitnexus-pr-review (7th skill NOT yet installed) | 0.91 |

---

## §2 Probe DAG results (per repo)

### Repo 1: hesreallyhim/awesome-claude-code

- **HEAD-DRIFT**: briefed `6ebceefeb77c7fe467ac11590c3accbac2f40793` ≠ local `614f102accbcd48206d63a21df64adc984026b40` (FM-20 row 10 candidate — sibling-pin staleness)
- **License**: CC-BY-NC-ND-4.0 (verified `Z:/repos/deps/awesome-claude-code/LICENSE:1`) — cite-only legal, NO fork-modify
- **Content size**: 227-line THE_RESOURCES_TABLE.csv (226 resource rows + 1 header)
- **Category density** (cheap-probe via `grep -c`):
  - Slash-Commands: 59 rows
  - Agent Skills: 19 rows
  - Hooks: 13 rows
- **Probe 1 count-OVER**: BRIEFED 226 ✓ matches actual 226 data rows
- **Probe 4 plugin-namespace**: NO duplicate — incumbent claude-sota cites this in `Z:/claude-sota/.claude/rules/research-protocol.md` Curated CC-ecosystem catalogs subsection
- **Probe 7 demand-gate**: `.b` STUDY-PILOT eligible discovery surface (active use as ecosystem-aggregator)
- **STRENGTH-AXIS**: Curator-gated quality filter via `.github/ISSUE_TEMPLATE/recommend-resource.yml` (only this repo has explicit submission template); broader category breakdown than competitors
- **ADOPT-CANDIDATES**:
  1. **CITE-REF**: keep current incumbent cite-import status
  2. **Refresh HEAD pin** in claude-sota-installed manifest from sibling's stale `6ebceefe` → fresh `614f102a`

### Repo 2: ComposioHQ/awesome-claude-skills

- **HEAD probe**: `pushed_at` 2026-05-07T07:32:20Z (~6 days fresh); `stargazers_count` **59,629** (UP from sibling-cited ~56,900 — growth +2.7k since 2026-04-29)
- **License**: API returns `null` — root LICENSE file absent OR not-detected by GitHub license-detection
- **Marker Decay**: sibling claude-sota CLAUDE.md L141 noted "GitHub API license field absent and no root LICENSE file found; README claims Apache-2.0, so treat license as [UNKNOWN]/conflicting"
- **Probe 6 LICENSE**: UNRESOLVED — Apache-2.0 README-claim vs API-null discrepancy; cite-only safe but adoption-class would require operator resolution
- **Probe 4 plugin-namespace**: NO duplicate — discovery-surface index, not install-class
- **Probe 7 demand-gate**: `.b` STUDY-PILOT (cross-ecosystem index covering CC + Codex + Cursor + Gemini CLI + MCP + Antigravity)
- **STRENGTH-AXIS**: Widest cross-tool ecosystem coverage (6 AI tool ecosystems); ComposioHQ org-owned with org-provenance (axis-1 PASS); growth velocity +2.7k stars in 14d
- **ADOPT-CANDIDATES**:
  1. **CITE-REF only** until LICENSE resolution
  2. **Operator action**: resolve license via direct probe of `https://api.github.com/repos/ComposioHQ/awesome-claude-skills/contents/LICENSE` OR `mcp__github__get_file_contents` on README+LICENSE OR direct curl raw GitHub

### Repo 3: Shubhamsaboo/awesome-llm-apps

- **HEAD-DRIFT**: briefed `795212b` ≠ local `844cda76bfff452ba722403fbae8b3556024aaff` (FM-20 row 10 candidate — sibling-pin staleness)
- **License**: Apache 2.0 (verified `Z:/repos/deps/awesome-llm-apps/LICENSE:1-2`)
- **Probe 4 plugin-namespace**: NO duplicate — runnable RAG/agent app catalog (orthogonal to claude-sota's CC-ecosystem-catalogs)
- **awesome_agent_skills/ subdir**: 20 skills (academic-researcher / code-reviewer / content-creator / data-analyst / debugger / decision-helper / deep-research / editor / email-drafter / fact-checker / fullstack-developer / meeting-notes / project-planner / python-expert / self-improving-agent-skills / sprint-planner / strategy-advisor / technical-writer / ux-designer / visualization-expert) — follow `agentskills.io` spec (SKILL.md + scripts/ + references/)
- **Probe 6 LICENSE**: PASS (Apache-2.0 permissive)
- **Probe 7 demand-gate**: `.b` STUDY-PILOT (CITE-CLASS-CANONICAL per W164 F20 prior verdict)
- **STRENGTH-AXIS**: Runnable-app emphasis ("100+ AI Agent & RAG apps you can actually run") vs theoretical-pattern aggregators; agentskills.io-spec-compliant skills (open format); 108k+ stars sibling-cited
- **ADOPT-CANDIDATES**:
  1. **INCUMBENT-KEEP**: per W164 F20 CITE-CLASS-CANONICAL verdict — no change
  2. **Refresh HEAD pin** sibling → fresh `844cda76`
  3. **Future**: 20 awesome_agent_skills/ could be candidate-list for selective vendor (deferred to per-skill convergence-gate audit)

### Repo 4: karpathy/andrej-karpathy-skills

- **HEAD MATCH**: briefed `2c606141936f1eeef17fa3043a72095b4765b9c2` ✓ MATCHES local — immutable cite preserved
- **License**: MIT (verified `Z:/repos/deps/andrej-karpathy-skills/skills/karpathy-guidelines/SKILL.md:4` frontmatter `license: MIT`)
- **Content**: 1 skill (`karpathy-guidelines/SKILL.md` 68 LOC) — derived from `https://x.com/karpathy/status/2015883857489522876` LLM-coding-pitfalls post
- **Probe 4 plugin-namespace**: YES — already cited as TIER-1-NAMED-AUTHOR-QUOTE in claude-sota-installed CLAUDE.md cardinal-rule-2 + ported to `.claude/rules/karpathy-adapted.md` (sibling) with §5 Wiki Compounding Surface extension
- **Probe 7 demand-gate**: `.a` REJECT-FOR-FIT for re-install (already consumed as cardinal-rule cite)
- **STRENGTH-AXIS**: Original Karpathy-derived primary-source authority — the upstream cite for cardinal-rule-2's 4 principles; sibling `karpathy-adapted.md` already extends it with §5 Wiki Compounding Surface compounding-learning trail
- **ADOPT-CANDIDATES**:
  1. **INCUMBENT-CITE**: keep existing cite-only status — no install needed
  2. **Notable adjacent**: README mentions creator's Multica project (`github.com/multica-ai/multica`) — out-of-scope here
- **HEAD-pin stability**: PASS — sibling pin still valid

### Repo 5: abhigyanpatwari/GitNexus

- **HEAD-DRIFT**: briefed `507f84b` ≠ local `98addbd6c4e7aff77b5c33242d08155afe94ed35` (FM-20 row 10 candidate — sibling-pin staleness; >90 commits drift)
- **License**: PolyForm Noncommercial 1.0.0 (verified `Z:/repos/deps/GitNexus/LICENSE:1`) — **NONCOMMERCIAL-USE-ONLY** per W171 finding
- **Monorepo structure**: 6 packages
  - `gitnexus/` — CLI v1.6.4-rc.112 (INSTALLED in claude-sota-installed §7)
  - `gitnexus-claude-plugin/` — Claude Code plugin with hooks + 7 SKILL.md files
  - `gitnexus-cursor-integration/` — Cursor IDE integration
  - `gitnexus-shared/` — shared package
  - `gitnexus-test-setup/` — testing harness
  - `gitnexus-web/` — web frontend
- **Probe 1 count-OVER (CRITICAL FINDING)**: trace-mining surfaced **7 upstream skills** in `Z:/repos/deps/GitNexus/gitnexus-claude-plugin/skills/`:
  - gitnexus-cli, gitnexus-debugging, gitnexus-exploring, gitnexus-guide, gitnexus-impact-analysis, gitnexus-refactoring, **gitnexus-pr-review** (7th)
  
  But claude-sota-installed `.claude/skills/gitnexus/` only has **6 skills installed**: gitnexus-cli, gitnexus-debugging, gitnexus-exploring, gitnexus-guide, gitnexus-impact-analysis, gitnexus-refactoring — **`gitnexus-pr-review` is NOT YET INSTALLED**
  
- **Probe 4 plugin-namespace**: PARTIAL-OVERLAP — 6 of 7 GitNexus skills already installed at TIER-1-DIRECT cite-anchored level (`Z:/repos/deps/gitnexus/gitnexus-claude-plugin/skills/<n>/SKILL.md @ HEAD 98addbd6c4e7aff77b5c33242d08155afe94ed35 [VERIFIED 2026-05-13 via direct diff IDENTICAL]`)
- **Probe 6 LICENSE**: CAVEAT-NONCOMMERCIAL — Operator-side use compatible with PolyForm-Noncommercial 1.0.0 for non-commercial harness; commercial-use violates the upstream license. Status quo (W171 caveat documented; runtime usage is operator-side).
- **Probe 7 demand-gate**: `.b` STRONG — already active workflow consumer (gitnexus indexed 5977 symbols/6365 edges/27 flows in W164 F38b)
- **Hooks**: upstream `hooks.json` declares `PreToolUse` matcher `Grep|Glob|Bash` + `PostToolUse` matcher `Bash` both routing to `gitnexus-hook.js` (timeout 10s each) — augments context with GitNexus graph + checks index freshness post-Bash. Could be installed by adopting the gitnexus-claude-plugin as a marketplace plugin (deferred per ONE-LOGICAL-UNIT-PER-FIRE)
- **STRENGTH-AXIS**:
  1. INCUMBENT — code-intelligence layer ALREADY load-bearing for claude-sota-installed
  2. 7-skill suite is **broader than typical CC code-intel** (compare to Serena + Repomix in §7)
  3. Native MCP-tools integration (13 tools wired)
  4. **Missing 7th skill (gitnexus-pr-review)** is NEW operational surface — PR review against gitnexus knowledge graph
- **ADOPT-CANDIDATES**:
  1. **INSTALL: gitnexus-pr-review** (7th skill) — Pattern A apply to install `.claude/skills/gitnexus/gitnexus-pr-review/SKILL.md` from upstream `Z:/repos/deps/GitNexus/gitnexus-claude-plugin/skills/gitnexus-pr-review/SKILL.md @ 98addbd6` (READ-IT-FIRST-before-install per CR-9 fix-forward expectation)
  2. **HEAD-pin refresh**: claude-sota-installed manifest §7 should update incumbent pin `507f84b` → `98addbd6` (>90 commits behind; cite-anchored skills currently pinned to `98addbd6` already per `[VERIFIED 2026-05-13 via direct diff IDENTICAL]` markers in upstream installed skills) — **consistency check**: this is already done in installed skills; the brief's `507f84b` was a stale brief-input artifact

---

## §3 Top-3 ADOPT-CANDIDATES (across all 5 repos)

| Rank | Item                                                                                                | Rationale                                                                                          | Effort | Risk |
|------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|--------|------|
| 1    | **gitnexus-pr-review** SKILL.md from `Z:/repos/deps/GitNexus/gitnexus-claude-plugin/skills/`        | Operationally-new surface (PR-review against gitnexus graph); 6/7 sister skills already installed | LOW    | LOW  |
| 2    | **HEAD-pin refresh** for awesome-claude-code (`6ebceefe`→`614f102a`) + awesome-llm-apps (`795212b`→`844cda76`) | FM-20 row 10 candidate — sibling-pin staleness ≥6 days drift                                       | LOW    | LOW  |
| 3    | **ComposioHQ LICENSE resolution probe**                                                              | Unblocks cite-class CANONICAL upgrade vs current DEFER-pending-license                              | LOW    | LOW  |

---

## §4 STRENGTH-AXIS summary (where each outperforms claude-sota-installed)

| Repo                          | STRENGTH-AXIS over claude-sota-installed                                                                                |
|-------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| awesome-claude-code           | Single source-of-truth CSV (226 rows) for CC-ecosystem discovery — claude-sota lacks an aggregator surface              |
| ComposioHQ/awesome-claude-skills | Cross-tool ecosystem coverage (CC + Codex + Cursor + Gemini CLI + MCP + Antigravity in single index)                |
| Shubhamsaboo/awesome-llm-apps | Runnable RAG/agent apps emphasis — claude-sota lacks an "apps-you-can-run" catalog (only patterns + primitives)         |
| andrej-karpathy-skills        | Primary-source MIT-licensed Karpathy guidelines — already consumed as TIER-1 cite; no upgrade exists at upstream        |
| GitNexus                      | 7th skill (`gitnexus-pr-review`) NOT YET installed in claude-sota-installed; PR-review-against-graph is novel surface  |

---

## §5 FM-20 findings (path-drift cascade vigilance)

| # | FM-20 sub-class                       | Evidence                                                                  | Action                                                            |
|---|---------------------------------------|---------------------------------------------------------------------------|-------------------------------------------------------------------|
| 1 | row-10 candidate sibling-pin staleness | Brief pinned `6ebceefe` (awesome-claude-code); local actual `614f102a`  | Forward-only correction in §1 table + §2.1                        |
| 2 | row-10 candidate sibling-pin staleness | Brief pinned `795212b` (awesome-llm-apps); local actual `844cda76`        | Forward-only correction in §1 table + §2.3                        |
| 3 | row-10 candidate sibling-pin staleness | Brief pinned `507f84b` (GitNexus); local actual `98addbd6` (≥90 commits) | Forward-only correction in §1 table + §2.5; manifest update queued |
| 4 | row-9 candidate stale-belief in brief | Brief asserted "RIVER" of ComposioHQ ~56,900★; actual fresh probe 59,629★ | Forward-only correction in §2.2 — non-load-bearing growth metric |
| 5 | row-7 dual-write avoided              | This artifact written to `tmp/wave176-...` via Write tool (single surface)| Confirmed compliant — NO dual-write phantom claim                 |

All FM-20 catches are **forward-only** per `port-note-discipline.md §6` — historical brief content unchanged; corrections embedded in this artifact only.

---

## §6 Pattern B HONEST-NON-FINDING disposition

Per `Z:/claude-sota/.claude/rules/ctff-pattern-b-and-t1-ops.md`:

- **Trigger**: Both bounded codex calls (Batch A 90s expected / Batch B 90s expected) exited EXIT=124 at 120s ceiling (per FM-17.d defense per-call time budget MAX 120s)
- **Trace-mining yield**:
  - Batch A: ~12029 LOC — heavy active deep-research mode reading awesome-list catalog history + producing reusable awesome-list extraction synthesis (Wave 160 F9 doc surface; pre-cached lookup hit) — NO structured JSON verdict emitted
  - Batch B: ~8840 LOC — substantive live probes of GitNexus skill structure + cross-checks against sibling marketplaces — discovered `gitnexus-pr-review` 7th-skill gap that was NOT in the briefed scope (HIGH-VALUE finding) — NO structured JSON verdict emitted
- **Disposition**: synthesize via orchestrator-side trace-mining + cheap-probe fusion (this artifact); cross-model verification provided by the GPT-5.5 reasoning trace (visible in EOF mining) even though structured JSON was not delivered. Cross-model gate PARTIAL per `cross-model-consensus.md §The contract` Phase 1 bootstrap exception path.
- **No re-fire**: Pattern B HNF discipline says DO NOT loop iter→iter→iter chasing a verdict; verification shifts to T3 commit-time when this artifact is captured

---

## §7 Verdict cross-model attestation

VERDICT: BRIDGE-MODE PARTIAL — codex GPT-5.5 reasoning surface engaged (n=2 calls @ ~120s each), trace-mining yielded substantive verdict content (GitNexus 7th-skill gap discovery + Wave 160 F9 awesome-list synthesis cache hit) but structured JSON-at-EOF emission timed out per FM-17.d ceiling. Disposition: Pattern B HONEST-NON-FINDING per `ctff-pattern-b-and-t1-ops.md`. Orchestrator-side cheap-probe pre-fire (Probe 4/6 LICENSE/HEAD-drift) + trace-mine synthesis produced 5-repo verdict table + Top-3 adopt-candidates + STRENGTH-AXIS per repo + Probe DAG results per repo.

**Operator next-actions** (ranked):
1. **P0**: Install `gitnexus-pr-review` SKILL.md from upstream (Probe-6 LICENSE caveat-noncommercial inherited from incumbent §7) — Pattern A apply
2. **P1**: HEAD-pin refresh for sibling-staleness sub-class (awesome-claude-code + awesome-llm-apps + GitNexus manifest entries) — forward-only mechanical-mirror per `Z:/claude-sota/.claude/rules/ctff-mechanical-mirror.md`
3. **P2**: ComposioHQ LICENSE resolution (direct `mcp__github__get_file_contents` probe) — unblocks cite-class upgrade
4. **P3 (deferred)**: GitNexus full plugin install (hooks + 7 skills + cli) as marketplace-class adoption — broader scope

VERDICT
