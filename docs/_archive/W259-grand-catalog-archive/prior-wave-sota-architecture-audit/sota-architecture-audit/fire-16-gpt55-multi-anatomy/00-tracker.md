# 00 — Fire 16 Tracker (GPT-5.5 Multi-Anatomy Convergence)

> **Purpose**: apply Fire 15 codified Path P recipe to the 4 remaining Fire 13 tier anatomies
> for full cross-model GPT-5.5 verification.
> **Method**: Path P codex T1 with 5-element discipline (minimal/focused/JSON-at-EOF/foreground-tee/300s).
> **Recipe source**: `docs/sota-architecture-audit/fire-15-gpt55-convergence/02-path-p-recovery-recipe.md`
> **Status**: 🎉 **FIRE 16 COMPLETE — 4/4 ANATOMIES SHIPPED**. Combined with Fire 15 PageIndex: **5/5 = 100% of Fire 13 tier anatomies cross-model GPT-5.5 verified**.

## Scope: 4 remaining Fire 13 anatomies → ALL DONE

| # | Anatomy | Status | Verdict |
|---|---|---|---|
| 01 | OpenSpec | ✅ DONE (this fire 16) | NEEDS-REVISION conf=0.94 (2 verified + 1 refuted) |
| 02 | PageIndex | ✅ DONE in Fire 15 | NEEDS-REVISION conf=0.90 |
| 03 | letta | ✅ DONE (this fire 16) | NEEDS-REVISION conf=0.93 (2 refuted) |
| 04 | ARIS | ✅ DONE (this fire 16) | APPROVE conf=0.97 (3 verified — full convergence) |
| **05** | **verified-avoid Cohort 3** | ✅ **THIS FIRE — FINAL** | **AFFIRM-REJECT conf=0.86 (4 verified + vendor-spam ESCALATED 3→19 topics)** |

## Fire 16 first-anatomy result (letta — `03-letta-gpt55-verdict.md`)

GPT-5.5 via codex CLI v0.130.0 — REAL cross-model verdict:
- Model: `gpt-5.5`, Reasoning: xhigh, Sandbox: read-only
- Tokens used: **136,321** (6× Fire 15 budget — letta repo is larger)
- Overall verdict: **NEEDS-REVISION conf=0.93**

### Both Fire 13 claims REFUTED

**Claim 1 (MCP-native: NO)**: REFUTED
- Letta has FIRST-CLASS MCP protocol support
- `pyproject.toml:57` declares `mcp[cli]>=1.9.4`
- `pyproject.toml:76` declares `fastmcp>=2.12.5`
- Full MCP client implementation: `letta/services/mcp/{base_client.py, stdio_client.py}`
- REST API endpoints: `letta/server/rest_api/routers/v1/mcp_servers.py:36,47,133,163,194,215,236`
- Schemas for Stdio + SSE + Streamable HTTP MCP servers
- NUANCE: MCP CLIENT/MANAGER (consumes external MCPs) is production; Letta-as-MCP-server is test fixtures only

**Claim 2 (PostgreSQL backend REQUIRED)**: REFUTED
- Letta supports BOTH backends; SQLite is DEFAULT
- `letta/settings.py:493`: returns POSTGRES only if `letta_pg_uri_no_default` set, else SQLITE
- `letta/config.py:61,66,71`: archival/recall/metadata DEFAULT to SQLite
- `alembic/env.py:21,26`: PG-prioritized but SQLite-fallback
- `alembic/versions/2c059cad97cc_create_sqlite_baseline_schema.py:24`: explicit SQLite-only migration
- `pyproject.toml:89,98`: separate optional dep groups (postgres + sqlite)

### Fire 13 verdict revision (forward-only per port-note-discipline §6)

| Dimension | Fire 13 verdict | GPT-5.5 corrected | Net impact |
|---|---|---|---|
| MCP integration | "REQUIRES custom MCP wrapper" | First-class MCP CLIENT support; off-the-shelf wiring possible | Removes wiring-complexity penalty |
| PostgreSQL dependency | "ADDS new infrastructure" | SQLite default; PostgreSQL optional | Removes infrastructure-add penalty |
| kiss-dry-yagni risk | HIGH (3rd memory backend) | UNCHANGED — Letta IS still 3rd memory primitive vs L1+L3 | Standalone concern preserved |
| Install class | "SECONDARY (custom wrapper)" | **PRIMARY-eligible** (native MCP) | Material upgrade |
| Setup complexity | "MEDIUM-HIGH (PostgreSQL setup)" | **LOW-MEDIUM** (SQLite default) | Material downgrade |
| Probe 7.b clause 3 (wiring) | ⚠️ PARTIAL | ✅ VERIFIED (native MCP-client) | Upgrade |
| Probe 7.b clause 4 (incumbent) | ❌ FAIL (current stack covers needs) | UNCHANGED — Letta self-improvement is genuinely NEW capability | Concern preserved |

### Revised disposition

**Fire 13 said**: DEFER ("eee's current memory stack is sufficient for current operational needs; Letta would be premature complexity")

**GPT-5.5-informed revision**: **STUDY-PILOT-ELIGIBLE** with 2 remaining gates:
1. Probe 7.b clause 4 (incumbent vs Letta): still requires specific "self-improvement over time" use case demand surfaced
2. kiss-dry-yagni Must-Never #4 (3rd memory primitive): still requires operator decision on whether the unique capability (cross-session learning) earns 3rd backend

The CROSS-MODEL gate caught 2 OVER claims that single-model audit missed.

## Cross-model gate state

✅ **SATISFIED for letta anatomy** (claims 1+2 audited)
⏸ PENDING for OpenSpec / ARIS / verified-avoid Cohort 3 (next 3 anatomies in queue)

## Mia ladder advance

n=1238 (Fire 15 close) → n=1248 (Fire 16 anatomy 1 close, +10):
- Real GPT-5.5 verdict captured + 7-row verdict table
- Both claims REFUTED with line-cited evidence
- Forward-only Pattern A revision matrix (7 dimensions)
- Revised disposition documented
- Token-budget calibration: ~136k tokens per medium-repo anatomy
- Path P recipe APPLIED successfully (5-element discipline)
- 22k Fire 15 budget vs 136k Fire 16 = 6× variance — large-repo anatomies cost more
- Letta install-class upgrade documented (SECONDARY → PRIMARY-eligible)
- Letta setup-complexity downgrade documented (MEDIUM-HIGH → LOW-MEDIUM)
- Anatomy 02 (PageIndex Fire 15) + Anatomy 03 (letta Fire 16) = 2 of 5 Fire 13 anatomies cross-model verified

## Path P recipe validation (n=2 success)

Fire 15 invocation pattern WORKS at Fire 16 anatomy with larger repo:
- Minimal focused prompt (51 LOC vs 48 LOC Fire 15) ✅
- JSON-at-EOF marker ✅
- Foreground tee ✅
- 300s timeout ✅ (consumed ~250s wall-clock; ~136k tokens)
- Verdict produced cleanly ✅

Recipe is recurringly reproducible. Pattern D codification candidate per `codex-t1-fix-forward-pattern.md`.

## W134-F17+ queued forward fires (Fire 16 ALL anatomies done)

1. ~~**W134-F17-openspec-gpt55**~~ — ✅ COMPLETED Fire 16 (NEEDS-REVISION conf=0.94)
2. ~~**W134-F17-aris-gpt55**~~ — ✅ COMPLETED Fire 16 (APPROVE conf=0.97)
3. ~~**W134-F17-verified-avoid-cohort3-gpt55**~~ — ✅ COMPLETED Fire 16 (AFFIRM-REJECT conf=0.86)
4. **W134-F17-effort-knob-ship** — extract ARIS `effort: lite/balanced/max/beast` (CROSS-MODEL VERIFIED 0.97)
5. **W134-F17-aris-cite-ship** — add ARIS as 6th-org architectural-comparison row
6. **W134-F18-letta-install-pilot** — install Letta IF demand surface
7. **W134-F18-pageindex-pilot-install** — install PageIndex per-document (3 corrections applied)
8. **W134-F18-openspec-watch** — re-audit OpenSpec when WORKSPACE_REIMPLEMENTATION_* completes
9. **W134-F17-path-p-skill-promotion** — codify Path P recipe at `.claude/skills/path-p-codex-t1-invoker/SKILL.md`
10. **W134-F17-verified-avoid-cohort3-doc-add** — add explicit Cohort 3 entry to `docs/verified-avoid.md` (currently only in Fire 13 anatomy)

## Fire 16 anatomy 4 (verified-avoid Cohort 3) summary

**4 audited claims — ALL VERIFIED (AFFIRM-REJECT)**:
- Claim 1 (Stars 76,425): ✅ VERIFIED-CURRENT (76,300 current; 0.16% drift)
- Claim 2 (Disk 3,949 KB): ✅ VERIFIED-CLOSE (unchanged)
- Claim 3 (Density 0.0517 KB/★): ✅ VERIFIED-FRESH-PAINT (0.0518 current; 9.66× below threshold)
- Claim 4 (Vendor-spam + uupm.cc): ✅ VERIFIED-SPAM-INTACT — **ESCALATED 3 → 19 topics (6 NEW vendor markers)**

**Disposition**: REJECT → **AFFIRM-REJECT-REINFORCED** — Vendor-spam pattern is ESCALATING, not improving. Fresh-paint Cohort 3 discriminator correctly applied.

## 🎉 Fire 16 close-synthesis

See `99-fire16-close-synthesis.md` — DEFINITIVE-DEFINITIVE-DEFINITIVE close. Cross-model gate
fully satisfied for ALL 5 Fire 13 tier anatomies (Fire 15 PageIndex + Fire 16 anatomies 1-4).

Path P recipe **5/5 success** — RECURRINGLY REPRODUCIBLE across 4 distinct subject types
(document-RAG primitive / agent-memory platform / spec-driven workflow / research harness)
PLUS live-GitHub-metadata audit. Token-budget calibration confirmed:
- Small repo / single-file probe: 20-30k tokens
- Medium-small repo: 80-90k tokens
- Medium repo: 130-140k tokens
- Live-GitHub scraping (no clone): 200k+ tokens

## Fire 16 anatomy 3 (ARIS) summary

**3 audited claims — ALL VERIFIED (full convergence)**:
- Claim 1 (Skill count "20+"): ✅ VERIFIED — actual 74 skills (3.7× over-claim; under-counted)
- Claim 2 (Workflow line cites): ✅ VERIFIED-EXACT — all 7 cites resolve EXACTLY (zero drift)
- Claim 3 (Cross-tool 4 tools): ✅ VERIFIED — CC + Codex + Cursor + Trae documented

**ARIS disposition**: CITE-PATTERN-REINFORCED. Forward fire candidates: effort-knob extraction + aris-cite as 6th-org sister-framework reference. Minor caveat: `comm-lit-review/SKILL.md:2` frontmatter `name: comm-lit-review-claude-single` (P3 LOW data-quality observation; directory inventory correct).

## Fire 16 anatomy 2 (OpenSpec) summary

**3 audited claims**:
- Claim 1 (AGENTS.md empty 0 LOC): ✅ VERIFIED-EMPTY — Fire 13 correct
- Claim 2 (WORKSPACE_REIMPLEMENTATION ACTIVE): ✅ VERIFIED-ACTIVE — Fire 13 correct
- Claim 3 (Cross-tool integration UNKNOWN): ❌ REFUTED — OpenSpec documents 29 supported tools (`docs/supported-tools.md:25-53` incl. Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, Kiro, ForgeCode, Windsurf)

**Revised disposition**: DEFER → **DEFER-with-narrower-reason** (workspace reimpl incomplete is load-bearing; cross-tool reach is comparable to spec-kit; AGENTS.md format-divergence is a choice not a gap)
