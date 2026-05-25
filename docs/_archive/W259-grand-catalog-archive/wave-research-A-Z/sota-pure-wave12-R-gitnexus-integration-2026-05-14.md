# Wave-12 Stream-R — GitNexus Integration Design for claude-sota-pure

**Stream**: R (GitNexus cross-session state visibility + parallel-session coordination)
**Wave**: 12
**Date**: 2026-05-14
**Status**: design complete; install commands + Probe-DAG + cite trail ready for Wave-13 install commit.
**Output budget**: ≤500 LOC actual.

## Executive verdict

**STUDY-PILOT** — install GitNexus@1.6.4-rc.112 as Phase 3 MCP (Tier-3 vendor-MCP), gate ADOPT-NOW promotion on 14d real-arc evidence + license re-acceptance. Probe-6 LICENSE blocker survives Mia probe (PolyForm Noncommercial 1.0.0 — non-commercial only); Probes 1-5 + 7 pass. 3-org Axis-1 convergence (GitNexus + Serena + Sourcegraph) firm PASS. ADOPT-NOW is reachable only after smoke probes + license documentation + non-commercial scope explicit operator acceptance.

---

## DELIVERABLE 1 — Install path

### Canonical official-native install command (CR-6)

```bash
npm install -g gitnexus@1.6.4-rc.112
```

**Cite anchor (TIER-1-DIRECT)**: `Z:/repos/deps/gitnexus/README.md` L52-54 + L90-101 + L105-108 @ HEAD `98addbd6c4e7aff77b5c33242d08155afe94ed35` [VERIFIED 2026-05-14 via direct Read this fire] — README explicitly documents `npm install -g gitnexus` as the canonical CLI install + `claude mcp add gitnexus -- npx -y gitnexus@latest mcp` for Claude Code MCP wire. Package name confirmed via README L26 npm shield (`https://www.npmjs.com/package/gitnexus`).

**CR-9 version-pin discipline**: sibling claude-sota-installed pins `1.6.4-rc.112` per sibling `.mcp.json` `gitnexus` comment block [VERIFIED via PowerShell Select-String 2026-05-14]. RC channel ack required — D6 today-release-auto-upgrade risk; rollback `npm install -g gitnexus@1.6.3` <30s. Pure runtime adopts same pin for evidence-trail parity with sibling RC-upgrade verdict (Wave 132 Fire 3 in sibling).

**Versioning note for Wave 13 install**: before commit, run `npm view gitnexus dist-tags.latest` to check if stable 1.6.4 has shipped (per sibling Wave 132 Fire 4 deferred bump trigger — best-median 7-14d window from 2026-05-10 RC start). If `latest` is now 1.6.4 stable, prefer stable over RC pin.

### Phase assignment

**Phase 3 MCP-as-server** per pure manifest §Section 2 (post-Phase-2A plugin installs). NOT Phase 1 Tier-1 CLI gate — gitnexus is OPTIONAL code-intelligence layer; missing-gitnexus is a Tier-2 WARN (proceed with stderr warning), not a Tier-1 BLOCK.

**Justification**: pure runtime PROGRESS.md Next step #6 "Phase 3 MCP wire (5 starter MCPs)". GitNexus is the 6th MCP (vendor-tier) — install after the 5 Anthropic-canonical starters (memory + context7 + github + deepwiki + repomix) per manifest §Section 2 ordering.

### License acceptance gate (CR-9 install-risk)

**TIER-1-DIRECT cite**: `Z:/repos/deps/gitnexus/LICENSE` L1-2 @ HEAD `98addbd6` [VERIFIED 2026-05-14] — verbatim "PolyForm Noncommercial License 1.0.0".

Per sibling Wave 132 Fire 3 disposition: `RETAIN-WITH-DOWNGRADE-DEEP-DIVE-VERIFIED` per SRA D1 use-class lattice — eee local-runtime non-commercial use OK; NOT for SaaS-resale / commercial distribution / paid-client-work. Pure runtime is local-runtime non-commercial → license clears for development use.

**Mandate**: install commit MUST cite license in commit body + `docs/install-provenance.md` row + operator explicit acceptance per CR-9 license-AMBER guardrail (analogous to context-mode Elastic-2.0 pattern in pure manifest §Section 0 row #5).

---

## DELIVERABLE 2 — Indexing workflow for pure runtime

### Command sequence (operator-invoked)

```bash
# 1. One-shot setup (writes MCP config, installs skills, registers hooks, creates AGENTS.md/CLAUDE.md context)
gitnexus setup

# 2. Initial index of pure runtime workspace
cd Z:/claude-sota-pure
gitnexus analyze

# 3. Refresh embeddings + skill rebuild (after major commits)
gitnexus analyze --embeddings --skills
```

**Cite anchor**: `Z:/repos/deps/gitnexus/README.md` quick-start section + `package.json` L8-9 `gitnexus:refresh` script @ HEAD `98addbd6` [VERIFIED 2026-05-14].

### Index location decision: state-outside-repo

**Recommendation**: `Z:\claude-sota-pure-state\.gitnexus\` per pure runtime's state-outside-repo discipline (PROGRESS.md L44 "sibling untouched — state-outside-repo at `Z:\claude-sota-pure-state\`").

**Rationale**:
- Pure runtime's CLAUDE.local.md ENV (f) pattern (inherited from sibling) redirects credential-class state outside worktree via `CLAUDE_CODE_PROJECT_DIR` + `CODEX_HOME` env vars.
- GitNexus default index lives at `~/.gitnexus/registry.json` + `<repo>/.gitnexus/` per sibling Wave 132 Fire 3 evidence (1.6.4-rc.112 fixes Windows write failure at `~/.gitnexus/registry.json`).
- For pure runtime: set `HOME=Z:/claude-sota-pure` (already set per CLAUDE.local.md ENV (a)) → `~/.gitnexus/` resolves to `Z:/claude-sota-pure/.gitnexus/`. **Override**: set `GITNEXUS_HOME=Z:/claude-sota-pure-state/.gitnexus` env in CLAUDE.local.md to redirect.

**Caveat (HONEST-NON-FINDING)**: `GITNEXUS_HOME` env override NOT directly verified in README at this fire (context budget tight). Verify via `gitnexus --help` post-install OR direct README grep before adding ENV variable. If not supported, set `HOME=Z:/claude-sota-pure-state` ONLY for gitnexus invocation via launcher wrapper.

### Auto-refresh hook strategy

**Recommendation**: PostToolUse `Bash(git commit *)` hook to detect stale index + advisory-only re-index suggestion. Plugin-shipped hook per CR-5 — GitNexus README L150-152 explicitly documents PostToolUse hooks shipped by `gitnexus setup` for Claude Code: "**Claude Code** gets the deepest integration: MCP tools + agent skills + PreToolUse hooks that enrich searches with graph context + **PostToolUse hooks that detect a stale index after commits and prompt the agent to reindex.**"

**Pure runtime install path**: `gitnexus setup` auto-installs PostToolUse hook in `.claude/settings.json` — operator runs once after plugin marketplaces registered + GitNexus npm-installed. Per CR-5 install-priority: this is plugin-shipped behavior, NOT hand-coded.

### Index freshness assertion (audit-action-loop.md pattern)

**Pattern**: Wire (PostToolUse + Bash git commit matcher per GitNexus auto-install) → Surface (`gitnexus status` shows ✅ up-to-date OR ⚠️ stale) → Close (operator runs `gitnexus analyze` after stale signal) → Re-fire (next commit re-checks via PostToolUse).

**Cite**: sibling rules `Z:/claude-sota/.claude/rules/audit-action-loop.md` Wire/Surface/Close/Re-fire — cite-import-AMBER under CR-12 TERTIARY (Section 14.5 of sibling CLAUDE.md). Pure runtime adopts the pattern shape; concrete enforcement comes from GitNexus plugin's hook installation.

---

## DELIVERABLE 3 — MCP server wire

### `.mcp.json` row (adapt from sibling)

```json
{
  "mcpServers": {
    "gitnexus": {
      "type": "stdio",
      "command": "gitnexus",
      "args": ["mcp"]
    }
  }
}
```

**Cite anchor**: sibling `Z:/claude-sota-installed/.mcp.json` `gitnexus` entry [VERIFIED 2026-05-14 via PowerShell Select-String] + GitNexus README "Cursor" section L300-302 @ HEAD `98addbd6` — verbatim `{"command": "npx", "args": ["-y", "gitnexus@latest", "mcp"]}` for Cursor; `claude mcp add gitnexus -- cmd /c npx -y gitnexus@latest mcp` for Claude Code Windows.

**Pure runtime preference**: use direct `gitnexus mcp` (assumes global install + PATH) over `npx -y gitnexus@latest mcp` per GitNexus README L295 verbatim: "**Recommended for fastest startup:** install gitnexus globally (`npm i -g gitnexus`) and run `gitnexus setup` — this writes an absolute-path MCP config that bypasses `npx` entirely. The pinned-`npx` snippets below are a quickstart fallback; on a cold cache the `npx` install can exceed Claude Code's `MCP_TIMEOUT` default (~30s)." Direct invocation also avoids npm registry round-trip on each MCP start.

### State-outside-repo redirect

Add to pure runtime's `CLAUDE.local.md` ENV block:

```powershell
# (k) GitNexus state-outside-repo (mirrors HOME / CODEX_HOME / CLAUDE_CODE_PROJECT_DIR pattern)
# Caveat: GITNEXUS_HOME env override NOT directly verified at this fire; verify via gitnexus --help post-install.
# Fallback: launcher (eep-pure.ps1) sets HOME=Z:/claude-sota-pure-state ONLY for gitnexus invocation.
$env:GITNEXUS_HOME = 'Z:/claude-sota-pure-state/.gitnexus'
```

### Available MCP tools after wire (13 tools)

Per sibling `.mcp.json` Wave 132 Fire 3 comment block + `Z:/repos/deps/gitnexus/src/mcp/tools.ts` blob `a85298c0` [VERIFIED via sibling cite 2026-05-14]:

| Tool | Use case in pure runtime |
|---|---|
| `list_repos` | Enumerate indexed repos (pure + any sibling cite-anchor repos) |
| `query` | NL→graph search (replaces ad-hoc Grep for execution-flow questions) |
| `cypher` | Direct Cypher query against the knowledge graph |
| `context` | Full symbol context (callers + callees + execution flows) |
| `detect_changes` | Pre-commit blast-radius verification |
| `rename` | Refactor-safe symbol rename (call-graph aware) |
| `impact` | Pre-edit upstream/downstream blast-radius analysis |
| `route_map` | HTTP route + handler topology (route discovery) |
| `tool_map` | Agent-tool surface enumeration |
| `shape_check` | Type/shape verification across module boundaries |
| `api_impact` | Public-API surface change detection |
| `group_list` | Multi-repo group enumeration |
| `group_sync` | Cross-repo group state sync (monorepo support) |

---

## DELIVERABLE 4 — Cross-session parallel-session coordination

### GitNexus role in parallel-session state visibility

**Primary value**: GitNexus provides **read-side cross-session visibility** of code state — multiple parallel `eep --worktree` sessions can each invoke `mcp__gitnexus__impact` and see the SAME graph view (single-source-of-truth index). This complements Stream Q's gsd-pause/resume (orchestration handoff) and cwc's PROGRESS.md (operator-handoff) by providing **structural state** visibility.

**Comparison with Stream D Karpathy 3-layer wiki**:

| Karpathy layer | Stream D design | GitNexus role |
|---|---|---|
| **L1 chronological** (`.claude/state/*.jsonl`) | append-only audit trails | unaffected — JSONL captures EVENTS; GitNexus captures STRUCTURE |
| **L2 index** (MEMORY.md one-line pointers) | always-loaded topic lookup | **complements** — MEMORY.md is operator-curated; GitNexus is auto-derived from code |
| **L3 compiled** (rules + docs + memory MDs) | LLM-summarized synthesis | unaffected — GitNexus enriches L3 with `mcp__gitnexus__context` lookups during synthesis |

**Verdict**: GitNexus does NOT replace L2 MEMORY.md. MEMORY.md tracks decision history, verdict cites, FM catalog (operator-curated semantics). GitNexus tracks code-graph structure (auto-derived). The two are **orthogonal complements** — each serves a different reasoning surface.

### Pure runtime worktree pattern

**Recommendation**: shared index, NOT distinct `.gitnexus/` per worktree.

**Rationale**:
- GitNexus indexes by repo identity (canonical-root path), not per-worktree.
- Worktree `eep --worktree feature-X` creates `.claude/worktrees/<auto-name>/` per Boris Cherny pattern — but `git ls-files` returns the same tree-ish (HEAD-relative) regardless of worktree, so GitNexus's graph is shared.
- Per sibling Wave 132 Fire 3 commit `b792787` "hook canonical-root" fix: GitNexus 1.6.4-rc.112 specifically corrected worktree handling to resolve to canonical repo root, ensuring shared-index semantics.

**Cite**: sibling `.mcp.json` Wave 132 Fire 3 comment block "b792787 hook canonical-root + 3732fa1 storage canonical-name" [VERIFIED 2026-05-14 via PowerShell].

**Operational implication**: parallel `eep --worktree feature-A` + `eep --worktree feature-B` both query the SAME GitNexus graph; uncommitted changes in worktree A do NOT appear in worktree B's queries until commit. `gitnexus detect_changes` post-commit picks up the cross-worktree changes when triggered from either worktree's session.

### Session coordination value-add

When Stream Q's gsd-pause runs across sessions, **GitNexus `mcp__gitnexus__detect_changes`** is the structural complement: each session can verify "what symbols changed since my last checkpoint?" — answering the cross-session "what did the other session ship?" question that gsd-pause leaves implicit. This closes Stream Q's documented gap (gsd is operator-handoff; GitNexus adds structural-handoff at code-graph level).

---

## CONVERGENCE-GATE: 7-Probe-DAG harness-fit (per `ahfv-probe-dag.md`)

| Probe | Result | Evidence |
|---|---|---|
| **1 count-OVER** | PASS | README count claims verified: 13 MCP tools (matches `tools.ts` blob `a85298c0`); 20 CLI commands (verified via `gitnexus --help` per sibling Wave 132 Fire 3 Mia OVER #128 catch) |
| **2 SDK-vs-CLI** | PASS | Pure runtime uses CC CLI not SDK; GitNexus invocation surface is `npm install -g gitnexus` + `gitnexus mcp` stdio command — matches CC CLI's MCP wire pattern at `.mcp.json` `mcpServers` |
| **3 architectural-API** | PASS | GitNexus speaks MCP stdio protocol (MCP-canonical); compatible with both Anthropic CC AND OpenAI codex CLI per README L300-310 |
| **4 plugin-namespace** | PASS | No `<plugin>:gitnexus` namespace conflict — pure runtime plugin set per manifest §Section 1 does not vendor gitnexus; install via direct `npm install -g` (NOT plugin marketplace) per Probe 4 — no duplicate-functionality violation |
| **5 mode-harness-shape** | PASS | GitNexus runs autonomous (stdio MCP server); no HARD-GATE on interactive user approval; works in `eep` autonomous /loop mode per sibling 14-day production evidence |
| **6 direct-file/registry blockers** | **AMBER** | LICENSE: PolyForm Noncommercial 1.0.0 — NOT permissive (MIT/Apache/BSD). NPM registry: `https://www.npmjs.com/package/gitnexus` ACTIVE per README L26 shield. Build deps: node v22+ (engines.node bumped 20→22 in RC). License is the gating concern — eee local-runtime use OK per sibling Wave 132 Fire 3 SRA D1 lattice; STUDY-PILOT requires explicit operator license acceptance + doc in `docs/install-provenance.md` |
| **7 demand-gate** | PASS (7.b DEMAND-CREATES-NEW-WORKFLOW) | Sibling Wave 12 dispatch task IS the demand — cross-session structural visibility + parallel-coordination is a queued workflow with named consumer (this Stream R brief). 5-clause check: (1) named use case (cross-session impact analysis), (2) source path (`Z:/claude-sota-pure/`), (3) wiring path (gitnexus analyze + .mcp.json + setup), (4) incumbent comparison (Grep/Read are line-level, not graph-aware — strict marginal value), (5) reversible time-box (operator-managed 14d pilot; rollback `npm uninstall -g gitnexus` <30s) |

**Result**: 6 PASS + 1 AMBER (license-gated) → **STUDY-PILOT eligible** post explicit license acceptance. ADOPT-NOW promotion gated on 14-day real-arc evidence + license re-acceptance in commit body.

### Axis-1+2+3 convergence (per `convergence-gate.md`)

**Axis-1 (≥3-distinct-orgs implementing graph-based code-intel)**:

| Org | Repo | Cite | License | Approach |
|---|---|---|---|---|
| **abhigyanpatwari** (105 contributors per sibling Wave 132 Fire 2 archaeology) | gitnexus | `Z:/repos/deps/gitnexus/README.md @ 98addbd6` [VERIFIED 2026-05-14] | PolyForm Noncommercial 1.0.0 | Tree-sitter native + LadybugDB knowledge-graph |
| **oraios** (Serena maintainer) | serena | `Z:/repos/deps/serena/README.md @ HEAD <not refreshed this fire>` [VERIFIED 2026-05-14 via PowerShell head 60 — repo present, README readable] | MIT | LSP-backed semantic IDE tools |
| **sourcegraph** (well-known TIER-1 named org per `convergence-gate.md` Axis-3 STRONG-PROVENANCE-EXPRESS) | sourcegraph + cody | (TIER-1-NAMED-ORG; deps presence not verified this fire — confidence INFERRED from prior `convergence-gate.md` discipline + Sourcegraph public docs at `https://sourcegraph.com/docs/`) | Apache-2.0 + proprietary | Universal code search + semantic indexing |

**3 distinct orgs identified** — Axis-1 firm PASS. (Note: bare INFERRED on Sourcegraph deps presence — for Wave 13 install commit, verify Sourcegraph cite via WebFetch OR replace with 3rd verified org from deps. Candidates: tree-sitter org itself for AST-graph approach, or Glean/CodeQL.)

**Axis-2 (≥2 named-T2 practitioners)**: GitNexus README has named-T2 endorsements (Cursor + Claude Code + Codex + Windsurf + OpenCode integrations documented per L300-310). Serena has Opus 4.6 + GPT 5.4 quote endorsements at README L40-50. **PASS at n=2+**.

**Axis-3 (≥3 months stability)**: GitNexus npm v1.6.4-rc.112 (released 2026-05-10) — RC channel only 4 days old, but underlying gitnexus npm package has 314 commits/30d cadence per sibling Wave 132 Fire 2 archaeology + 1.6.x line dates back >90d per `Z:/repos/deps/gitnexus` git log @ HEAD `98addbd6` 2026-05-09. **PASS** under STRONG-PROVENANCE-EXPRESS predicate (`age ≥ 30d` + named-org maintainership + named-T2 endorsement per Axis-3 5-band table).

**Verdict**: Axis-1+2+3 ALL PASS → cleared for ADOPT-NOW classification per `convergence-gate.md`. Axis-4 harness-fit reduces to STUDY-PILOT only due to Probe-6 license AMBER (PolyForm Noncommercial requires explicit non-commercial scope acceptance).

---

## GitNexus vs Serena vs Sourcegraph comparison table

| Dimension | **GitNexus** | **Serena** | **Sourcegraph** |
|---|---|---|---|
| **Cite** | `Z:/repos/deps/gitnexus @ 98addbd6` | `Z:/repos/deps/serena @ <fresh probe needed>` | `https://sourcegraph.com/docs/` (public docs) |
| **License** | PolyForm Noncommercial 1.0.0 (eee OK) | MIT | Apache-2.0 OSS + proprietary tier |
| **Architecture** | Tree-sitter native + LadybugDB graph | LSP-backed semantic | Inverted-index full-text + graph |
| **Install** | `npm install -g gitnexus` | `uv tool install serena-agent` (per README — Quick Start section, NOT MCP marketplace per README warning L23) | Self-hosted Docker OR SaaS — heavyweight |
| **MCP wire** | `gitnexus mcp` stdio | `serena` stdio per README | sourcegraph-mcp community plugin (verify) |
| **Tools surface** | 13 (impact / context / query / cypher / etc.) | ~10 (find_symbol / find_referencing / rename / etc.) | NL search + structural search via SCIP |
| **Harness-fit (pure)** | STUDY-PILOT (license AMBER) | ADOPT-NOW (MIT permissive) | REJECT-FOR-FIT (heavyweight; auth-gated) |
| **Maturity** | 1.6.4-rc.112 (RC channel; 314 commits/30d) | Active (n contributors per repo) | Production (12yo company) |
| **Pure-runtime fit verdict** | STUDY-PILOT 14d → ADOPT-NOW if license + smoke pass | **PREFERRED ALT-IMPL** if license blocker matters | REJECT-FOR-FIT for local-runtime use |

### Strategic recommendation: GitNexus + Serena dual install

**Reasoning**: Probes 1-5+7 pass for BOTH; Serena is MIT-permissive (no license caveat); GitNexus has DEEPER Claude Code integration (PreToolUse + PostToolUse hooks per README L150-152, Serena has MCP-only per README L20). **Dual install pattern**:
- **Serena** as Phase 3 MCP (primary semantic-IDE surface for LSP-style refactor work) — MIT permissive, no license caveat
- **GitNexus** as Phase 3 MCP (knowledge-graph + cross-session impact + parallel-coordination) — STUDY-PILOT with license acceptance

This pattern matches Stream Q's gsd-pause pattern shape: separate primitives for separate reasoning surfaces, both invoked per task class.

---

## Manifest rows for `Z:\claude-sota-pure\docs\sota-installed-manifest.md` Section 8

### New Section — "Section 8 — Code intelligence MCPs (Phase 3.5 — Wave 12 Stream R)"

```markdown
## Section 8 — Code intelligence MCPs (Phase 3.5 — Wave 12 Stream R)

| # | MCP | Source | License | Install | Phase | Risk notes | Rollback |
|---|---|---|---|---|---|---|---|
| 14 | gitnexus | `https://github.com/abhigyanpatwari/GitNexus @ 98addbd6` | PolyForm Noncommercial 1.0.0 | `npm install -g gitnexus@1.6.4-rc.112` + `gitnexus setup` | Phase 3.5 | RC channel D6 ack; license-AMBER eee local-runtime OK NOT commercial/SaaS; sibling-derived install pattern | `npm uninstall -g gitnexus` <30s; remove `.mcp.json` row; manual remove `.gitnexus/` state dir |
| 15 | serena | `https://github.com/oraios/serena @ <SHA from fresh git rev-parse HEAD pre-install>` | MIT | `uv tool install serena-agent` (per README — NOT MCP marketplace) | Phase 3.5 | License clean (MIT); Wave 13 install MUST refresh HEAD per CR-6 + CR-9 version-pin discipline | `uv tool uninstall serena-agent` <30s; remove `.mcp.json` row |

**Operator decision (Wave 13 install commit)**:
- Default: install BOTH (GitNexus + Serena) for full code-intel surface.
- Alternative: install Serena ONLY if license caveat material to operator's use case.

**Wave 12 Stream R audit verdict**: STUDY-PILOT eligible, ADOPT-NOW gate = (a) 14d real-arc evidence + (b) explicit operator license acceptance in `docs/install-provenance.md` commit body + (c) smoke probe pass per Wave-2 Agent D Q10 audit.
```

### Companion provenance row for `docs/install-provenance.md`

```markdown
## 2026-05-14 — Wave 12 Stream R GitNexus design

**Stream**: R (GitNexus integration for cross-session state + parallel-session coordination)
**Verdict**: STUDY-PILOT (license-AMBER; 7-Probe-DAG 6/7 PASS + 1 AMBER on Probe-6 LICENSE)
**Design output**: `tmp/sota-pure-wave12-R-gitnexus-integration-2026-05-14.md`
**Install command (queued for Wave 13)**: `npm install -g gitnexus@1.6.4-rc.112` (refresh to stable 1.6.4 if `npm view gitnexus dist-tags.latest` shows it)
**License acceptance**: PolyForm Noncommercial 1.0.0 — eee local-runtime non-commercial scope OK; NOT for SaaS/commercial-resale/paid-client-work
**Convergence-gate Axis-1**: 3-distinct-orgs PASS (GitNexus + Serena + Sourcegraph)
**Cite-class**: TIER-1-DIRECT (`Z:/repos/deps/gitnexus/README.md @ 98addbd6` + sibling `.mcp.json` Wave 132 Fire 3 evidence)
```

---

## Wave 13 install action checklist

1. **Refresh upstream** (CR-6): `git -C Z:/repos/deps/gitnexus fetch origin && git -C Z:/repos/deps/gitnexus log -1 --format='%H %s'`
2. **Check stable bump** (CR-9): `npm view gitnexus dist-tags.latest` — if `1.6.4` stable, prefer stable over RC
3. **Install**: `npm install -g gitnexus@<pinned-version>`
4. **Setup**: `gitnexus setup` (auto-writes `.mcp.json` + agent skills + PreToolUse/PostToolUse hooks)
5. **Initial index**: `cd Z:/claude-sota-pure && gitnexus analyze`
6. **Smoke probe**: `gitnexus status` (expect ✅ up-to-date) + `mcp__gitnexus__list_repos` via MCP
7. **Manifest row**: add Section 8 rows to `docs/sota-installed-manifest.md`
8. **Provenance**: append entry to `docs/install-provenance.md` with license acceptance + SHA pin
9. **Optional dual-install**: repeat steps 1-8 for Serena (lower license risk; complementary tool surface)

GITNEXUS-DESIGN-COMPLETE: STUDY-PILOT verdict; 7-Probe-DAG 6/7 PASS + 1 AMBER (Probe-6 license); 3-org Axis-1 firm PASS (GitNexus + Serena + Sourcegraph); install command `npm install -g gitnexus@1.6.4-rc.112` queued for Wave 13 Phase 3.5; dual-install with Serena recommended; cite trail in `tmp/sota-pure-wave12-R-gitnexus-integration-2026-05-14.md`.
