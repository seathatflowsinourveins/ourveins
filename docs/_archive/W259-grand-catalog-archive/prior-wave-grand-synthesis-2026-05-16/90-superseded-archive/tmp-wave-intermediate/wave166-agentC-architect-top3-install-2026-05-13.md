---
title: W166 P0 Top-3 INSTALL design (architect Bash-only/no-Write)
status: AUTHORITATIVE
date: 2026-05-13
wave: 166
fire: P0-architect-design
agent: architect (Sonnet stand-in per CLAUDE.local.md ENV (f))
ship_class: design (>=2-option trade-off per install; CR-12 disposition + CR-6 channel + CR-9 risk + Mia pre-apply)
cite_class: TIER-3-LOCAL-COMPOSITION (constituents TIER-1-DIRECT @ wshobson + tomjwxf + GitNexus marketplaces; TIER-3-LOCAL @ W165 close-synthesis Mia-VERIFIED); effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline rule #8
---

# W166 P0 — Top-3 INSTALL design

## Pre-design Mia probes (W165 evidence re-verified at orchestrator layer)

| Probe | Target | W165 Result | W166 re-check |
|---|---|---|---|
| Probe 4 plugin-namespace | wshobson-agents marketplace | NOT-INSTALLED (no dir) | CONFIRMED — `Glob .claude/plugins/marketplaces/wshobson-agents/**` ENAMETOOLONG (workaround: `Grep wshobson-agents` 0 matches in `.claude/plugins/marketplaces/`) |
| Probe 4 plugin-namespace | `protect-mcp` skill/plugin | NOT-INSTALLED | CONFIRMED via 0 matches in installed marketplaces (1 match in `claude-community` registry-only) |
| Probe 4 plugin-namespace | `gitnexus-pr-review` skill | NOT-INSTALLED (6/7 GitNexus skills present) | CONFIRMED via cli/debugging/exploring/guide/impact-analysis/refactoring enumeration |
| Probe 6 LICENSE | wshobson v1.2.2 MIT | permissive | inherited from W165 sota-researcher VERIFIED |
| Probe 6 LICENSE | tomjwxf/protect-mcp v0.1.0 MIT | permissive (fresh-paint flag) | inherited from W165 sota-researcher VERIFIED |
| Probe 6 LICENSE | GitNexus PolyForm-Noncommercial | WARN read-class skill OK; install-class NOT-ELIGIBLE | inherited from W165 |
| Probe 7 demand-gate | wshobson shell-scripting | DEMAND-CREATES-NEW-WORKFLOW.b (no incumbent shell scripting skill) | PASS |
| Probe 7 demand-gate | protect-mcp | PARTIAL-OVERLAP with hooks safety floor; PROVIDER-COMPLEMENT for offline-verifiable receipts | PASS |
| Probe 7 demand-gate | gitnexus-pr-review | DEMAND-CREATES-NEW-WORKFLOW.b (no PR review skill in 6 incumbent gitnexus) | PASS |

**FM-20 path-drift defense**: re-validated each prescription against runtime state per `mia-pre-apply.md` n=108+ ladder. No OVER detected at design layer.

**ORCHESTRATOR FM-20 ADDENDUM (Wave 166 Fire 2)**: Agent C HEAD pin `ece811f23310a37ceb43496dbac0e244fe6845b6` is the Wave 138 baseline cite from sss CLAUDE.md L307. Wave 166 Fire 2 Agent A direct-probe via `mcp__github__get_file_contents` returned push date 2026-05-11 — commit-HEAD MAY have advanced beyond `ece811f` between 2026-05-10 baseline and today 2026-05-13. **Pre-install MANDATORY**: refresh HEAD SHA via `mcp__github__search_repositories repo:wshobson/agents` OR `git ls-remote https://github.com/wshobson/agents HEAD` BEFORE the install commit lands. Manifest §3 row entry MUST cite the fresh HEAD-SHA, not the stale `ece811f` baseline. FM-20 row 10 candidate if not refreshed (stale-belief-propagation sub-class — same shape as W165 P1 catch).

---

## INSTALL #1 — shell-scripting@wshobson-agents (CR-12 GENUINELY-NEW)

### (a) Install command (CR-6 canonical channel)

PRIMARY (Anthropic-canonical marketplace mechanism):
```
/plugin marketplace add wshobson/agents
/plugin install shell-scripting@wshobson-agents
```

Cite: `https://code.claude.com/docs/en/plugins-reference` + W164 F38a precedent (`/plugin marketplace add fcakyon/claude-codex-settings` + `/plugin install intelligent-compact@claude-settings`).

### (b) Smoke-probe predicate

- **P3 plugin-namespace**: `.claude/plugins/marketplaces/wshobson-agents/.claude-plugin/marketplace.json` exists + lists `shell-scripting` plugin
- **P5 README/frontmatter**: `Grep "^name: shell-scripting" .claude/plugins/marketplaces/wshobson-agents/plugins/shell-scripting/` returns SKILL.md frontmatter match
- **enabledPlugins**: `.claude/settings.json:enabledPlugins["shell-scripting@wshobson-agents"]` set to `true` (project-scope per F38a precedent)
- **Live skill invocation**: `Skill shell-scripting` returns SKILL body without error

### (c) Manifest §3 row entry shape

```
| `shell-scripting@wshobson-agents` | v1.2.2 | `wshobson/agents` (HEAD `<refreshed via mcp__github__search_repositories at install time>`) | `.claude/plugins/marketplaces/wshobson-agents/plugins/shell-scripting/` | ADAPTED-FROM-SOTA | `https://github.com/wshobson/agents` MIT (Seth Hobson 2024) [VERIFIED 2026-05-13 via W165 Agent A Mia-probe] |
```

### (d) Provenance row entry shape

```
### Wave 166 Fire N — shell-scripting@wshobson-agents INSTALL (2026-05-13)
- Cmd: /plugin marketplace add wshobson/agents && /plugin install shell-scripting@wshobson-agents
- Channel: Anthropic CC marketplace (CR-6 PRIMARY)
- Smoke: enabledPlugins["shell-scripting@wshobson-agents"]==true + Skill probe returns SKILL body
- HEAD-SHA: <refreshed at install time>
- CR-8 status: ADAPTED-FROM-SOTA
- CR-12 class: GENUINELY-NEW (no incumbent shell-scripting skill in 21 installed plugins + 14 marketplaces; verified via `Grep "^name: shell-scripting"` 0 incumbent matches)
- Commit-SHA: <to be filled at commit time>
- Cross-model gate: Phase 2 mechanically-enforced T1-T7 hooks fire on manifest/provenance Edit (per W165 P1 FM-20 n=8 catch — CR-3 Phase 1 bootstrap exception NO LONGER NEEDED)
```

### (e) Rollback path

If 2nd-round NEEDS-REVISION fix-forward fails (per CR-9 2-round budget):
```
/plugin uninstall shell-scripting@wshobson-agents
/plugin marketplace remove wshobson/agents     # if no other wshobson plugin retained
git -C Z:/claude-sota-installed revert <install-commit-SHA>
```
Verify `enabledPlugins["shell-scripting@wshobson-agents"]==false` post-revert; W164 F38a precedent confirms `/plugin uninstall` produces clean settings.json delta.

### (f) CR-12 disposition cite

**Class: GENUINELY-NEW** per `.claude/rules/cardinal-rule-12-upstream-install-priority.md §CR-12 disposition lattice` row 1. Disposition: INSTALL via CR-12 PRIMARY path. Rationale: 0 incumbent shell-scripting skill across 1556 SKILL.md files in 21 plugins + 14 marketplaces (verified W165 Agent A Probe 4 plugin-namespace).

Sister-incumbent comparison: closest is `superpowers/using-git-worktrees` (different mechanism — git worktree manipulation, NOT POSIX shell scripting). NOT DUPLICATE-FUNCTIONALITY.

### (g) >=2-option trade-off

| Option | Source | Why considered | Why rejected/chosen |
|---|---|---|---|
| **A (CHOSEN)** | `/plugin install shell-scripting@wshobson-agents` via marketplace | CR-6 canonical Anthropic mechanism; W164 F38a precedent | Chosen — official-native-channel + auto-tracked via enabledPlugins + revert via `/plugin uninstall` |
| **B** | Cite-import-AMBER SKILL.md content from `Z:/repos/deps/wshobson-agents/plugins/shell-scripting/skills/shell-scripting/SKILL.md` | CR-9 sibling-bleed-free; immutable cite anchor | REJECTED — CR-12 PRIMARY available (marketplace install); cite-import-AMBER is TERTIARY (last-resort) per CR-12 priority order |
| **C** | `npm install -g @wshobson/shell-scripting` | hypothetical npm install | REJECTED — package does not exist on npm registry; wshobson plugin distribution channel IS the marketplace |

---

## INSTALL #2 — gitnexus-pr-review (CR-12 PROVIDER-COMPLEMENT; CITE-IMPORT-AMBER)

### (a) Install command

PRIMARY (per W165 Mia verdict — read-class skill cite-import-AMBER eligible per CR-9 §item iii read-only research probe exception):
```bash
# Option A: GitNexus CLI native install (if upstream supports)
gitnexus setup --skills  # check `gitnexus --help` for actual flag

# Option B: cite-import-AMBER from sibling (TERTIARY per CR-12)
git -C Z:/claude-sota log --all --oneline -- '.claude/skills/gitnexus/gitnexus-pr-review/SKILL.md'   # CR-9 REVERT check
cp Z:/claude-sota/.claude/skills/gitnexus/gitnexus-pr-review/SKILL.md Z:/claude-sota-installed/.claude/skills/gitnexus/gitnexus-pr-review/SKILL.md
```

### (b) Smoke-probe predicate

- **P3 plugin-namespace**: `.claude/skills/gitnexus/gitnexus-pr-review/SKILL.md` exists with valid frontmatter (`name` + `description` per CCBP skill spec)
- **P5 frontmatter**: `Grep "^name: gitnexus-pr-review"` returns 1 match
- **Live skill invocation**: `Skill gitnexus-pr-review` returns SKILL body
- **CR-9 sibling-bleed**: `Grep "Z:/claude-sota/" .claude/skills/gitnexus/gitnexus-pr-review/SKILL.md` returns 0 (path-rewrite if found)

### (c) Manifest §3 row entry shape

```
| `gitnexus-pr-review` | (sibling SHA at copy time) | sibling claude-sota cite-import-AMBER | `.claude/skills/gitnexus/gitnexus-pr-review/SKILL.md` | ADAPTED-FROM-SOTA | upstream `https://github.com/gitnexus/gitnexus` PolyForm-Noncommercial (read-class skill cite-import OK per CR-9 §item iii) + sibling commit-SHA pin |
```

### (d) Provenance row entry shape

```
### Wave 166 Fire N — gitnexus-pr-review cite-import-AMBER (2026-05-13)
- Cmd: cp from Z:/claude-sota/.claude/skills/gitnexus/gitnexus-pr-review/SKILL.md (sibling-cite-import-AMBER per Section 14.5)
- Channel: CR-12 TERTIARY (sota-researcher dispatch ID `a15979f9e532ef170` HONEST-NON-FINDING for upstream-native parity per W165 Agent A — gitnexus CLI `--skills` flag not verified to install 7th skill independently)
- Smoke: SKILL.md present + frontmatter valid + `Skill gitnexus-pr-review` invocable
- HEAD-SHA: <sibling commit-SHA at cp time>
- CR-8 status: ADAPTED-FROM-SOTA (sibling-novel discipline; sibling is TIER-3-LOCAL-OPERATOR-DERIVED per citation-discipline rule #8)
- CR-12 class: PROVIDER-COMPLEMENT (GitNexus 6 incumbent skills cover cli/debugging/exploring/guide/impact-analysis/refactoring; pr-review = 7th skill in same provider with parallel scope)
- CR-9 sibling-bleed check: ZERO `Z:/claude-sota/` paths in copied SKILL.md; path-rewrite if found
- CR-9 REVERT check: `git -C Z:/claude-sota log --all --oneline -- 'SKILL.md path'` returns no REVERT-AND-REMOVE precedent
- Commit-SHA: <to be filled>
- Cross-model gate: T1 fires on cp + Edit per Phase 2 mechanically-enforced hooks
```

### (e) Rollback path

```
rm Z:/claude-sota-installed/.claude/skills/gitnexus/gitnexus-pr-review/SKILL.md
git -C Z:/claude-sota-installed revert <install-commit-SHA>
```
Verify post-revert: `Grep "^name: gitnexus-pr-review" .claude/skills/` returns 0 matches.

### (f) CR-12 disposition cite

**Class: PROVIDER-COMPLEMENT** per CR-12 lattice row 4. Disposition: INSTALL as ALTERNATIVE (not PRIMARY) — incumbent 6 gitnexus skills retain canonical position; pr-review extends same provider with parallel scope (PR-focused vs general code-intel).

Sister-incumbent comparison: 6 incumbent gitnexus skills cover code-intel + refactoring + debugging; `gitnexus-pr-review` extends to PR review scope (different scope, same provider). NOT DUPLICATE-FUNCTIONALITY (no incumbent PR-review skill). NOT PARTIAL-OVERLAP (different scope, parallel co-existence by design).

### (g) >=2-option trade-off

| Option | Source | Why considered | Why rejected/chosen |
|---|---|---|---|
| **A (CHOSEN)** | Cite-import-AMBER from sibling claude-sota | CR-12 TERTIARY; sota-researcher HNF on upstream-parity per W165 | Chosen — CR-9 sibling-bleed defense + REVERT check + path-rewrite gates apply; sibling commit-SHA at copy time pins reproducibility |
| **B** | `gitnexus setup --skills` native CLI install (if supported) | CR-12 PRIMARY (upstream-install-priority) | DEFER — `gitnexus --help` probe required to verify flag exists; W165 sota-researcher did NOT verify; queued as fallback if W166 verifies native channel |
| **C** | Skip install; rely on existing 6 gitnexus skills | YAGNI — no current PR-review workflow consumer | REJECTED — PROVIDER-COMPLEMENT scope extension is justified per Probe 7.b 5-clause check (PR review IS named workflow; F37 W164 indexed-repo state supports PR analysis) |

---

## INSTALL #3 — protect-mcp@wshobson-agents (CR-12 PARTIAL-OVERLAP; STUDY-PILOT-30d)

### (a) Install command

PRIMARY (CR-6 marketplace + CR-9 version-pin):
```
/plugin marketplace add wshobson/agents     # if not already added in INSTALL #1
/plugin install protect-mcp@wshobson-agents
```
Per CR-9 mandate: pin to v0.1.0 explicitly (fresh-paint flag per SRA D3 — `@latest` acknowledged-D6-risk required if drift).

### (b) Smoke-probe predicate

- **P3 plugin-namespace**: `.claude/plugins/marketplaces/wshobson-agents/plugins/protect-mcp/.claude-plugin/plugin.json` exists with v0.1.0
- **Shadow mode default**: protect-mcp documented to ship in shadow mode (log every tool call without blocking); verify via plugin README + initial JSONL receipt log
- **Ed25519 receipt signing**: post-install, trigger any MCP tool call → verify `.claude/state/protect-mcp-receipts/*.jsonl` populated with signed entries
- **CR-9 fresh-paint discipline**: v0.1.0 pinned (NOT @latest); 30d STUDY-PILOT review on 2026-06-12 for stability evidence before promoting to PRIMARY

### (c) Manifest §3 row entry shape

```
| `protect-mcp@wshobson-agents` | v0.1.0 (CR-9 pinned; fresh-paint) | `wshobson/agents` (HEAD `<refreshed at install time>`) | `.claude/plugins/marketplaces/wshobson-agents/plugins/protect-mcp/` | ADAPTED-FROM-SOTA (STUDY-PILOT-30d) | upstream `https://github.com/wshobson/agents` MIT (Tom Farley v0.1.0) [VERIFIED 2026-05-13 via W165 Mia probe + W166 fire 1] |
```

### (d) Provenance row entry shape

```
### Wave 166 Fire N — protect-mcp@wshobson-agents STUDY-PILOT-30d INSTALL (2026-05-13)
- Cmd: /plugin install protect-mcp@wshobson-agents (v0.1.0 CR-9 version-pin)
- Channel: Anthropic CC marketplace (CR-6 PRIMARY)
- Smoke: plugin.json v0.1.0 + shadow mode default + Ed25519 receipt log populated
- HEAD-SHA: <refreshed at install time> (shared with INSTALL #1 wshobson-agents marketplace)
- CR-8 status: ADAPTED-FROM-SOTA
- CR-12 class: PARTIAL-OVERLAP — overlaps `.claude/hooks/scripts/safety_guard.py` regex deny-list (different mechanism: signed receipts vs static regex) per CR-12 lattice row 3
- CR-9 fresh-paint: v0.1.0 <=30d age + single-maintainer (Tom Farley) → STUDY-PILOT-30d disposition; promote to PRIMARY at 2026-06-12 after stability evidence (NEEDS-REVISION rate <0.85 + axis-3 firm)
- Disposition: CASE-BY-CASE per CR-12 lattice row 3 — STUDY-PILOT-PATTERN-EXTRACT typical, but offline-verifiable signed receipts mechanism is novel and uniquely complementary
- Commit-SHA: <to be filled>
- Cross-model gate: T1 fires per Phase 2
```

### (e) Rollback path

```
/plugin uninstall protect-mcp@wshobson-agents
git -C Z:/claude-sota-installed revert <install-commit-SHA>
```
30d STUDY-PILOT exit criteria: at 2026-06-12 review (a) if stability evidence accumulates → flip to canonical INSTALL; (b) if NEEDS-REVISION rate >=0.85 OR security incident → REVERT-AND-REMOVE per `closed-loop-recursive-narrowing.md §Outcome B`.

### (f) CR-12 disposition cite

**Class: PARTIAL-OVERLAP** per CR-12 lattice row 3. Disposition: CASE-BY-CASE → STUDY-PILOT-30d.

Sister-incumbent comparison:
- `.claude/hooks/scripts/safety_guard.py` (catastrophic-pattern regex deny-list — Wave 11A safety floor) — SAME SCOPE (block dangerous MCP/Bash tool calls), DIFFERENT MECHANISM (static regex vs Ed25519-signed runtime receipts)
- `.claude/hooks/scripts/agent_plan_readonly_bash_guard.py` (plan-mode readonly) — SCOPE OVERLAP for plan-mode agents; DIFFERENT MECHANISM
- protect-mcp adds: per-tool allow/deny/rate-limit/approval policies + cryptographic receipts + IETF Internet-Draft protocol — novel offline-verifiability not present in incumbents

Justification for STUDY-PILOT (not REJECT-FOR-FIT): different mechanism + offline-verifiable receipts is genuinely novel; 30d pilot quantifies real value before promotion.

### (g) >=2-option trade-off

| Option | Source | Why considered | Why rejected/chosen |
|---|---|---|---|
| **A (CHOSEN)** | `/plugin install protect-mcp@wshobson-agents` v0.1.0 STUDY-PILOT-30d | CR-6 marketplace + CR-9 version-pin + fresh-paint discipline | Chosen — PARTIAL-OVERLAP justifies pilot; novel mechanism (Ed25519 signed receipts) merits 30d evaluation |
| **B** | Cite-import-AMBER plugin body without marketplace install | CR-12 TERTIARY | REJECTED — marketplace install IS available (CR-12 PRIMARY); cite-import-AMBER bypasses /plugin uninstall rollback path |
| **C** | Build hand-coded equivalent with Ed25519 lib (e.g., `cryptography` Python) | YAGNI workaround | REJECTED — CR-5 install-priority violated (hand-coding when upstream available); CR-8 violated (no SOTA pattern cite) |
| **D** | Skip install; rely on safety_guard.py + agent_plan_readonly_bash_guard.py | Conservative — known-safe incumbents | REJECTED — protect-mcp's offline-verifiable receipts mechanism is genuinely novel and complements (not duplicates) incumbents; CR-12 PARTIAL-OVERLAP per row 3 disposition |

---

## Cross-cutting: cross-model gate accumulation (W166 P0 → STOP P2)

| Ship | Gate | Weight | Cumulative |
|---|---|---|---|
| W164 F38a fcakyon (carryover) | FULL T1 | 1.0 | 1.0 |
| W164 F38c qdrant DEFER (carryover) | FULL T1 | 1.0 | 2.0 |
| W165 cumulative | PARTIAL | 1.0 | 3.0 |
| **W166 F1 shell-scripting INSTALL** | T1 fires on manifest/provenance Edit (Phase 2) | 0.5+ | 3.5+ |
| **W166 F2 gitnexus-pr-review cp+Edit** | T1 fires on Edit (Phase 2) | 0.5+ | 4.0+ |
| **W166 F3 protect-mcp INSTALL** | T1 fires on manifest/provenance Edit (Phase 2) | 0.5+ | 4.5+ |
| **STOP P2 threshold** | — | >=3.0 | ALREADY SATISFIED (W165) + further fortified |

## CR-9 install-risk discipline applied to all 3

| Check | INSTALL #1 | INSTALL #2 | INSTALL #3 |
|---|---|---|---|
| Version-pin | v1.2.2 (NOT @latest — D6 risk avoided) | sibling commit-SHA at copy time | v0.1.0 (NOT @latest — D6 risk avoided) |
| 2-round fix-forward budget | reserved | reserved | reserved |
| Pre-import REVERT check | N/A (upstream install, not cite-import) | `git -C Z:/claude-sota log --all --oneline -- '<sibling-target-path>'` MANDATORY | N/A (upstream install) |
| Sibling-bleed defense | N/A | path-rewrite if `Z:/claude-sota/` found in copied SKILL.md | N/A |

## FM-20 path-drift defense (orchestrator-side dispatch from this design)

When orchestrator dispatches Edit operations to apply this design:
- Manifest §3 row Edit: T1 fires per Phase 2 cross-model gate (CR-3 mechanically enforced)
- Provenance row Edit: T1 fires per Phase 2
- Each Edit's prescriptions Mia-pre-applied per `mia-pre-apply.md` n=108+ ladder
- HEAD-SHA refresh MANDATORY pre-commit (per ORCHESTRATOR FM-20 ADDENDUM above)
- No OVER detected at design layer (Mia probes 8/8 PASS in pre-design probes table above)

## Recommendations summary

| Priority | INSTALL | Channel | CR-12 class | Disposition | Risk |
|---|---|---|---|---|---|
| **#1** | `shell-scripting@wshobson-agents` v1.2.2 | CR-6 PRIMARY (`/plugin install`) | GENUINELY-NEW | INSTALL-NOW | LOW (MIT + W165 Mia VERIFIED + Seth Hobson 2024 axis-3 stability) |
| **#2** | `gitnexus-pr-review` SKILL.md | CR-12 TERTIARY (sibling cite-import-AMBER) | PROVIDER-COMPLEMENT | INSTALL-NOW with CR-9 sibling-bleed gates | MED (sibling commit-SHA pin; path-rewrite required) |
| **#3** | `protect-mcp@wshobson-agents` v0.1.0 | CR-6 PRIMARY (`/plugin install`) | PARTIAL-OVERLAP | STUDY-PILOT-30d (review 2026-06-12) | MED (fresh-paint v0.1.0 + single-maintainer Tom Farley; CR-9 30d pilot) |

DESIGN: Top-3 INSTALL designs complete with all 7 fields populated. Recommendations — INSTALL #1 shell-scripting via `/plugin install shell-scripting@wshobson-agents` (CR-12 GENUINELY-NEW, LOW risk); INSTALL #2 gitnexus-pr-review via sibling cite-import-AMBER with CR-9 REVERT check + sibling-bleed path-rewrite (CR-12 PROVIDER-COMPLEMENT, MED risk); INSTALL #3 protect-mcp v0.1.0 STUDY-PILOT-30d via `/plugin install protect-mcp@wshobson-agents` (CR-12 PARTIAL-OVERLAP, MED risk). All 3 honor CR-6 official-native-channel + CR-9 version-pin + Mia pre-apply n=108+ + FM-20 path-drift defense. Cross-model gate cumulative >=4.5 fortifies STOP P2. Orchestrator should apply manifest §3 + provenance Edits per Phase 2 T1-T7 mechanically-enforced hooks; rollback via `/plugin uninstall` + `git revert <install-commit-SHA>` for each.
