---
title: Wave 132 Fire 2 Agent C — gitnexus consumer audit + migration design
status: AUTHORITATIVE
date: 2026-05-10
agent: everything-claude-code:architect (Sonnet stand-in per CLAUDE.local.md ENV (g) commented out + frontmatter `model: sonnet` defaults — STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate)
wave: 132 fire 2
---

# Executive Summary

35-file scan reduces to: **2 Class C wires** (`.mcp.json:88-93` + `.gitnexusignore`), **0 Class A operational dependencies** (ZERO eee runtime calls `mcp__gitnexus__*` or loads `gitnexus_pre_edit_impact_guard.py`), **33 Class B documentation/historical references**. Both REMOVE and RETAIN-WITH-DOWNGRADE plans are design-ready. Operator decides based on PolyForm Noncommercial license-policy stance.

# 35-file classification table

## Class C (Wire / config — IS the install or directly loads it)

| # | File | Cite | Rationale |
|---|---|---|---|
| 1 | `.mcp.json` | :88-93 (block + _comment_gitnexus :88) | Wire — IS the MCP server install entry |
| 2 | `.gitnexusignore` | full file (34 lines) | Config consumed by `gitnexus analyze` ONLY when operator runs the CLI; orphaned without install |

## Class A (Operational dependency — would BREAK if REMOVE)

**ZERO.** Verified independently per orchestrator preflight:
- `codex_prepush_review.py:32` is a HISTORICAL COMMENT referencing `gitnexus_pre_edit_impact_guard cycle-305` — that hook DOES NOT EXIST in eee (`Glob .claude/hooks/scripts/gitnexus*` returns no files).
- `codex_t1_consult_gate.py:325` `.gitnexus/**` is a FILE PATH GLOB inside `_UNIVERSAL_EXCLUSIONS` tuple (`offset=320, limit=10` confirms it's bracketed by `.octocode/**` + `.pyscn/**` etc.) — NOT an MCP tool invocation.
- No tests reference gitnexus (`Glob tests/**/*gitnexus*` returns 0 files).

## Class B (Documentation / reference only — NO break on REMOVE)

| # | File | Cite | Type |
|---|---|---|---|
| 3 | `CLAUDE.md` | :94 | Cardinal-rule-9 sibling-bleed defense EXAMPLE (`gitnexus --repo claude-sota` cited as illustrative path-rewrite example) |
| 4 | `README.md` | :34 | Lists gitnexus among MCP server install patterns (illustrative example) |
| 5 | `AGENTS.md` | :151 | Cross-tool MCP inventory listing ("10 active — context7 / deepwiki / github / gitnexus / ...") |
| 6 | `docs/sota-installed-manifest.md` | :136 (Section 7 row) + :8470,8478,8655-8713,8761,8774 (install-provenance refs in same file unclear — use grep result; mostly Wave 112 Ship 2AA decision-record content) | Manifest Tier-2 Code intel row + provenance entries |
| 7 | `docs/install-provenance.md` | :8655-8713 (Wave 112 Ship 2AA decision-record) | Wave 112 Ship 2AA install entry — append-only audit trail |
| 8 | `docs/wave118-architecture-audit-2026-05-09.md` | :26 | MCP server inventory table |
| 9 | `docs/wave119-next-session-plan.md` | :41,179,180,182,183,249,382 | SHIP A8 gitnexus native bindings recovery planning |
| 10 | `docs/wave120-next-session-plan.md` | :35,128-130,176,237 | SHIP A8 gitnexus recovery plan continuation |
| 11 | `docs/wave121-next-session-plan.md` | :67,327,346 | SHIP A8 follow-up + HNF-4 docs |
| 12 | `.gitignore` | :99 (`.gitnexus/`) | Indexed-data dir gitignore (orphaned without install — but harmless to retain; pattern blocks future stray dirs) |
| 13 | `.claude/settings.json` | :52 (in `_comment_mcp_tool_timeout` doc-comment) | Doc-only mention "gitnexus 10K+ symbol graph" as timeout-rationale example |
| 14 | `.claude/hooks/scripts/codex_prepush_review.py` | :32 (historical COMMENT) | Comment cycle-305 reference; hook NOT shipped in eee — comment is dead history |
| 15 | `.claude/hooks/scripts/codex_t1_consult_gate.py` | :325 (`.gitnexus/**` in EXCLUSIONS) | File path glob in EXCLUSIONS tuple — gates AGAINST gitnexus's data dir, not invocation |
| 16 | `.claude/agents/architect.md` | :125 | "If gitnexus is registered" CONDITIONAL example for blast-radius pre-redesign |
| 17 | `.claude/agents/code-reviewer.md` | :92 | "or `mcp__gitnexus__impact` if gitnexus is registered — [PORT-PENDING]" CONDITIONAL example |
| 18 | `.claude/agents/debugger.md` | :68 | Inherited cite-import comment ("gitnexus, and hindsight backends remain omitted or PORT-PENDING") |
| 19 | `.claude/agents/verifier.md` | :171,172 | "If gitnexus registered (PORT-PENDING in sss):" CONDITIONAL example |
| 20 | `.claude/agents/gpt5-archaeologist.md` | (preflight grep matched but Read returned no matches) | False-positive in orchestrator preflight (Grep returned "No matches" on actual content) |
| 21 | `.claude/rules/named-failure-modes.md` | :32 (FM-01 row) | FM-01 T2 EARLY-HANG at gitnexus MCP — historical failure-mode catalog row; cite anchor for sibling claude-sota prior arc |
| 22 | `.claude/rules/team-orchestration.md` | :487,496 (Rule 3 + C3 row) | Sibling-derived rule: pre-commit verification example via `gitnexus_detect_changes` |
| 23 | `.claude/rules/parallel-sessions.md` | :141 | `worktree.symlinkDirectories` example mentions `.gitnexus` among skip-dup dirs |
| 24 | `.claude/rules/layered-gates-architecture.md` | :25,29,104,106,139,221,318 | Sibling-derived rule layered-gates examples — `gitnexus_pre_edit_impact_guard.py` as illustrative asyncRewake hook (NOT eee-installed) |
| 25 | `.claude/rules/codex-t1-fix-forward-pattern.md` | :293,330 | iter-37/38 T2 verifier-precision sibling case study |
| 26 | `.claude/rules/citation-discipline.md` | :22,72 | PARENT-ATTRIBUTION historical cite (`project_gitnexus_full_audit_2026_04_18.md`) |
| 27 | `.claude/rules/canonical.md` | :93 | Skill cite-schema example (`gitnexus/*` skill listing) |
| 28 | `.claude/rules/codex-t1-system-meta-review-fallback.md` | :109 | iter-37 historical T2 case-study |
| 29 | `.claude/rules/mcp-disconnect-recovery.md` | :92 | Sister rule cross-ref example (gitnexus/repomix as MCPs hooks depend on) |
| 30 | `.claude/rules/codex-t1-auto-wedge-recovery.md` | :43 | FM-01 T2 EARLY-HANG router pointer (sibling cite-import) |
| 31 | `.claude/rules/research-protocol.md` | :93,113 | Tool routing table — `mcp__gitnexus__detect_changes/impact/context` ACTIVE rows |
| 32 | `.claude/rules/agent-harness-fit-verification.md` | (preflight matched but actual Grep returned "No matches found") | False-positive in orchestrator preflight |
| 33 | `.claude/context-mode/sessions/990932fe5068cb8f__0271062c-events.md` | (session log artifact) | Transient session telemetry — gitignored content; auto-purges |
| 34 | `.claude/session-data/2026-05-09-257bb28d-session.tmp` | (session tmp) | Transient session-state cache; auto-purges |
| 35 | `Z:/claude-sota/...` (sibling references in install-provenance) | sibling cite-anchors | TIER-3 read-only research probe per CR-9 read-only research probe exception |

# Mia OVER catches (this fire)

- **Mia OVER #117 candidate** (Wave 132 Fire 1 codex Path P REVIEWED conf=0.86 hypothesis): codex framed PolyForm Noncommercial as REJECT, but per SRA D1 use-class lattice (extended below) PolyForm Noncommercial IS valid for eee local-runtime use-class — same shape as Wave 102 Ship 2T-correction reclassifying SSPLv1/AGPL-3.0/ELv2 as ACCEPTABLE for local-runtime. **Disposition**: REQUIRES ORCHESTRATOR DECISION based on cross-model T1 path-P verdict + Agent B verdict synthesis.
- **Mia OVER candidate (false-positive in orchestrator preflight)**: 2 of the 35 files (`gpt5-archaeologist.md` + `agent-harness-fit-verification.md`) returned "No matches found" on direct Grep — orchestrator preflight grep had false-positive matches (likely whole-file re-listing of search-target). True file count = 33.

# REMOVE migration plan (concrete edits)

## Atomic single-shell commit per `git-cli-grammar-discipline.md`

```bash
# Edit 1: .mcp.json — remove gitnexus block + _comment
# Edit 2: .gitnexusignore — DELETE file entirely (orphaned config)
# Edit 3: .gitignore:99 — keep `.gitnexus/` (defensive — blocks future stray dirs even post-removal)
# Edit 4: docs/sota-installed-manifest.md:136 — flip Section 7 row Status from PLANNED → REJECTED-POST-PROBE-WAVE132 with cite to PolyForm Noncommercial license-policy decision
# Edit 5: docs/install-provenance.md — APPEND Wave 132 Fire 2 REMOVE decision-record entry citing this dispatch + codex Path P verdict + cross-model T1 result
# Edit 6: AGENTS.md:151 — remove "gitnexus" from MCP listing; update count "10 active" → "9 active"
# Edit 7: README.md:34 — remove "gitnexus" from MCP server install pattern list (or replace with another example)
# Edit 8: .claude/settings.json:52 — update _comment_mcp_tool_timeout to remove "gitnexus 10K+ symbol graph" example (replace with serena LSP graph or repomix large-repo example)
# (Class B documentation references in 11 rules + 5 agents + 3 wave-N docs are CONCEPTUAL EXAMPLES — NO edit needed; they remain illustrative even when the install is absent. Per port-note-discipline.md §6 "Do not rewrite historical commit bodies" — wave-N docs are HISTORICAL audit trail.)

git add -- .mcp.json .gitnexusignore docs/sota-installed-manifest.md docs/install-provenance.md AGENTS.md README.md .claude/settings.json && \
git commit --only -F tmp/wave132-fire2-remove-gitnexus-msg.txt -- .mcp.json .gitnexusignore docs/sota-installed-manifest.md docs/install-provenance.md AGENTS.md README.md .claude/settings.json
```

**Tests impact**: NONE — no `tests/test_gitnexus*.py` exists (verified via `Glob tests/**/*gitnexus*` returned 0 files).

**Operational impact**: ZERO runtime breakage — confirmed Class A = empty.

# RETAIN-WITH-DOWNGRADE documentation update plan (concrete edits)

If operator decides RETAIN with sharper documentation:

## Edit 1: `.claude/rules/sota-research-architecture.md:39-48` — Extend D1 lattice with PolyForm Noncommercial row

```diff
 | License | CLI-binary-use | Library-link | Network-served | SaaS-distributed |
 |---|---|---|---|---|
 | MIT / Apache-2.0 / BSD | OK | OK | OK | OK |
 | LGPL-2.1/3.0 | OK | dynamic-link OK; static-link infects | OK | OK |
 | GPL-2.0/3.0 | OK (no source-distribute mandate) | infects derivative | requires source-disclosure | full GPL-class restrictions |
 | AGPL-3.0 | OK (local-CLI use) | infects derivative + network-trigger | requires source-disclosure | full AGPL-class restrictions |
 | SSPL-1.0 | OK (local DB) | OK | OK | restricts SaaS-as-product |
 | Elastic License 2.0 (ELv2) | OK (local plugin) | OK | OK | restricts managed-service-resale |
+| PolyForm Noncommercial 1.0.0 | OK (local-runtime non-commercial) | OK (non-commercial only) | OK (non-commercial only) | REJECT requires commercial license from licensor |
 | Proprietary (commercial) | per-license-terms | per-license-terms | per-license-terms | per-license-terms |
 | **NO LICENSE FILE** | undefined; default copyright; technically no permission to use | undefined | undefined | undefined |
```

Cite anchor: TIER-1-DIRECT `https://polyformproject.org/licenses/noncommercial/1.0.0/` + Wave 132 Fire 2 ratification SHA (this commit's SHA).

## Edit 2: `.claude/rules/sota-research-architecture.md:50-56` — Extend Probe 6 application list

```diff
 **Probe 6 application** is use-class-aware:
 - AGPL CLI binary used to scan local files = OK ACCEPTABLE for eee
 - AGPL library linked into eee runtime code = REJECT (license infects derivative)
 - AGPL network-served as part of eee = REJECT (requires source-disclosure)
 - ELv2 plugin loaded into eee runtime = OK ACCEPTABLE (eee is not SaaS-resale)
+- PolyForm Noncommercial CLI/MCP used in local autonomous /loop runtime = OK ACCEPTABLE for eee (eee is not commercial product distribution)
+- PolyForm Noncommercial component re-distributed commercially = REJECT (requires commercial license from licensor)
 - SSPL DB used as local backend = OK ACCEPTABLE (eee is not DB-as-a-service product)
```

## Edit 3: `docs/install-provenance.md` — APPEND Wave 132 Fire 2 RATIFICATION entry

```markdown
## 2026-05-10 Wave 132 Fire 2: GitNexus PolyForm Noncommercial RATIFICATION

**Trigger**: Wave 132 Fire 1 codex Path P REVIEWED conf=0.86 flagged GitNexus PolyForm Noncommercial as REJECT candidate — possible Mia OVER #117.

**Investigation**: Wave 132 Fire 2 4-dispatch advanced agent team (Path P codex bg REAL GPT-5.5 + Agent A consumer audit + Agent B SRA D1 license re-evaluation + Agent C migration design).

**Verdict**: RATIFY Wave 112 Ship 2AA RETAIN-WITH-DOWNGRADE per SRA D1 use-class precision. PolyForm Noncommercial 1.0.0 added to SRA D1 license lattice (extension Edit 1 above) as 9th license class. eee runtime use-class = local autonomous /loop runtime; NOT SaaS-distributed; NOT commercial-product-resale; NOT network-hosted-for-third-parties → PolyForm Noncommercial CLI/MCP use is ACCEPTABLE.

**Consumer audit results** (Agent C 35-file scan):
- Class A (operational dependency) = 0 files
- Class B (documentation reference) = 33 files
- Class C (wire/config) = 2 files (`.mcp.json:88-93` + `.gitnexusignore`)

**ZERO eee runtime breakage from RETAIN.** ZERO need for migration code.

**Outstanding operator caveat (Wave 112 Ship 2AA preserved)**:
- MUST NOT redistribute eee commercially without commercial license from `akonlabs.com`
- MUST NOT bundle gitnexus into commercial product variant
- Maintainer abhigyanpatwari (TIER-4-NAMED-INDIVIDUAL — bus-factor risk disclosed)
- HNF-4 active: `gitnexus list/impact/context` blocked by `@ladybugdb/core` native binding issue (deferred per Wave 119-121 SHIP A8 plan; orthogonal to license decision)

**Cross-model T1 evidence**: cross-model gate satisfied via Wave 132 Fire 2 codex Path P foreground+tee dispatch (REAL GPT-5.5) — verdict at `.claude/state/codex_consult_w132_fire2_polyform_OUT.txt`.

**Cite trail**: SRA D1 lattice extension at `.claude/rules/sota-research-architecture.md:39-56` + Wave 112 Ship 2AA install-provenance L8655-8713 + this Wave 132 Fire 2 entry.
```

## Edit 4: `.mcp.json:88` — Update `_comment_gitnexus` for tighter rationale

```diff
-    "_comment_gitnexus": "Wave 112 Ship 2AA 2026-05-09 — added gitnexus MCP per operator URL https://github.com/abhigyanpatwari/GitNexus + CR-9 sibling-bleed closure (9 inherited rule references at .claude/rules/* + ZERO eee install pre-this-ship). License: PolyForm Noncommercial 1.0.0 (DOWNGRADE-WITH-DISCLOSURE per SRA D1 use-class lattice — eee local-runtime non-commercial use OK; NOT for SaaS-resale or commercial distribution; consistent with FalkorDB SSPLv1 + context-mode ELv2 prior verdicts). [...]
+    "_comment_gitnexus": "Wave 112 Ship 2AA 2026-05-09 + Wave 132 Fire 2 ratification 2026-05-10 — added gitnexus MCP per operator URL https://github.com/abhigyanpatwari/GitNexus + CR-9 sibling-bleed closure (9 inherited rule references at .claude/rules/* + ZERO eee install pre-this-ship). License: PolyForm Noncommercial 1.0.0 (RETAIN-WITH-DOWNGRADE per SRA D1 use-class lattice extended Wave 132 Fire 2 — eee local-runtime non-commercial use OK; NOT for SaaS-resale or commercial distribution; consistent with FalkorDB SSPLv1 + context-mode ELv2 prior verdicts; PolyForm Noncommercial added as 9th license class to SRA D1 lattice at .claude/rules/sota-research-architecture.md:39-56). Wave 132 Fire 2 ratification: cross-model T1 verified via Path P foreground+tee codex REAL GPT-5.5; consumer audit confirms Class A operational dependency = 0 (Agent C verdict at tmp/wave132-fire2-agentC-consumer-audit-migration-design-2026-05-10.md). [Original Wave 112 trail preserved]"
```

## Edit 5: `docs/sota-installed-manifest.md:136` — Update Section 7 status

```diff
-| GitNexus (graph code intel MCP) | npm install -g | `npm install -g gitnexus@latest` | https://github.com/abhigyanpatwari/gitnexus | PLANNED |
+| GitNexus (graph code intel MCP) | npm install -g | `npm install -g gitnexus@1.6.3` (CR-9 version-pinned per Wave 112 Ship 2AA + Wave 132 Fire 2 ratification) | https://github.com/abhigyanpatwari/gitnexus @ HEAD 55d5042 | INSTALLED-AMBER (license RETAIN-WITH-DOWNGRADE per SRA D1 PolyForm Noncommercial; HNF-4 native bindings broken — `gitnexus list/impact/context` deferred per Wave 119-121 SHIP A8) |
```

## Atomic single-shell commit (RETAIN path)

```bash
git add -- .claude/rules/sota-research-architecture.md docs/install-provenance.md .mcp.json docs/sota-installed-manifest.md && \
git commit --only -F tmp/wave132-fire2-retain-gitnexus-msg.txt -- .claude/rules/sota-research-architecture.md docs/install-provenance.md .mcp.json docs/sota-installed-manifest.md
```

# Decision-input summary for orchestrator

| Axis | REMOVE | RETAIN-WITH-DOWNGRADE |
|---|---|---|
| Cardinal-rule conformance | Resolves CR-1 PolyForm-as-permissive concern | Requires SRA D1 lattice extension (Wave 132 Fire 2 ratifies extension) |
| Cardinal-rule-9 install-risk | Reduces installed surface | Preserves Wave 112 Ship 2AA install (no REVERT-AND-REMOVE precedent created) |
| Operational impact | ZERO breakage (Class A = 0) | ZERO disruption |
| Audit trail | New REMOVE decision-record entry | New RATIFICATION decision-record entry; Wave 112 trail preserved |
| Functional value | gitnexus capability lost (HNF-4 already blocks `list/impact/context`; only `setup/analyze/serve/index/status` remain) | Same partial functionality (HNF-4 active) |
| License policy | "permissive-only" stricter standard | "use-class precision" matching SRA D1 design + prior FalkorDB SSPL / context-mode ELv2 / trufflehog AGPL precedents |
| Mia OVER #117 disposition | CONFIRMED (REJECT was correct) | REFUTED (REJECT was over-applied; matches Wave 102 Ship 2T-correction pattern) |

# Risk notes

- **Sibling-bleed (Wave 132 OVER candidate)**: 11 sibling-derived rule references + 5 sibling-derived agent references all use gitnexus as ILLUSTRATIVE example — not load-bearing on the install. REMOVE does NOT require sibling rule edits; RETAIN does not require either.
- **HNF-4 orthogonal**: `gitnexus list/impact/context` broken regardless of license decision (per Wave 119-121 SHIP A8). License decision does not affect HNF-4 status.
- **CR-9 REVERT precedent**: REMOVE creates a 4th REVERT-AND-REMOVE precedent (joins `bash_command_allowlist.py` + `fleet_health_start.py` + `permission_request_auto_approve.py`) — operator-discipline impact: future cite-imports MUST pre-check this REVERT per CR-9 sibling-bleed defense.

DESIGN: NEEDS-OPERATOR-INPUT — both REMOVE and RETAIN-WITH-DOWNGRADE plans design-ready
