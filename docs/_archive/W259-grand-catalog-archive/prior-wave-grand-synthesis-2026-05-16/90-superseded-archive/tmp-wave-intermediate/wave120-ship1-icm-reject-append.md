
---

## Wave 120 Ship 1 — ICM (rtk-ai/icm) Probe DAG audit → REJECT-FOR-FIT (DEMAND-ABSENCE)

**Date**: 2026-05-09
**Verdict**: REJECT-FOR-FIT per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 7.a DEMAND-ABSENCE
**Trigger**: user standing directive "rtk-ai/rtk and more sota repos related" + Wave 120 Ship 1 task #71
**Outcome**: NO INSTALL (HONEST-NON-FINDING per `synthesis-layer-verify.md §Reporting categories`)

### Candidate metadata (TIER-1-DIRECT via GitHub API live probe 2026-05-09)

- **Repo**: `rtk-ai/icm` (verified via `https://api.github.com/repos/rtk-ai/icm` HTTP 200)
- **Stars**: 319
- **License**: Apache-2.0 ✓ (permissive-compatible per cardinal-rule-9)
- **Created**: 2026-02-02T22:15:56Z (~96 days at probe time — JUST past 90d burn-in)
- **Updated**: 2026-05-08T23:14:25Z (active maintenance)
- **Archived**: false
- **Description**: "Permanent memory for AI agents. Single binary, zero dependencies, MCP native"

### Probe DAG verdict (per agent-harness-fit-verification.md §The 7 sub-classes)

| Probe | Status | Evidence |
|---|:---:|---|
| P1 count-OVER | ✅ PASS | 319★ live-verified |
| P2 SDK-vs-CLI | ✅ PASS | stdio MCP native — same surface as 9 existing eee MCPs |
| P3 architectural-API | ✅ PASS | MCP protocol = same as `mcp-memory` / `graphiti` / `context7` / etc |
| P4 plugin-namespace | ✅ PASS | `rtk-ai/icm` not loaded in any plugin marketplace cache (5 enabled: `addy-agent-skills` / `claude-plugins-official` / `context-mode` / `everything-claude-code` / `openai-codex`) |
| P5 mode-harness-shape | ✅ PASS | single binary stdio server fits eee shape |
| P6 LICENSE/registry | ✅ PASS | Apache-2.0 + GitHub-released |
| **P7 demand-absence** | ❌ **FAIL** | **DUPLICATES `mcp-memory` already INSTALLED** |

### P7 demand-absence detail

**Existing eee primitive that ALREADY serves ICM's value-prop**:
- `mcp-memory` v10.51.3 by doobidoo (Apache-2.0, 1809★) — installed via `pip install git+https://github.com/doobidoo/mcp-memory-service.git` per `CLAUDE.md` Memory Stack §L1 capture
- Wired in `.mcp.json` as `"memory"` stdio server pointing at `Z:/venvs/claude/Scripts/memory.exe` with sqlite_vec backend at `Z:/claude-sota-installed-state/.mcp-memory/memory.db`
- Provides: persistent memory storage with vector embeddings, MCP `memory_store` / `memory_search` / `memory_recall` tools

**ICM value-prop comparison**:
- ICM: "permanent memory for AI agents" via Go single-binary
- mcp-memory: "permanent memory" via Python+sqlite_vec
- **Same workflow surface**. Different impl.

**Probe 7.a 3-clause check** (per agent-harness-fit-verification.md):
1. **Specific path** for ICM-routed workflow that mcp-memory cannot serve? **NO** — both expose MCP `memory_*` tools
2. **Existing primitive serves the value-prop?** **YES** — mcp-memory (1809★ vs ICM 319★, 6× larger ecosystem)
3. **Displacement vs extension?** Adopting ICM would be displacement — requires migrating mcp-memory's existing store at `Z:/claude-sota-installed-state/.mcp-memory/memory.db`. No marginal value to displace.

→ **Probe 7.a DEMAND-ABSENCE confirmed → REJECT-FOR-FIT**

### Convergence-gate Axis-3 stability (supplementary corroboration)

Per `Z:/claude-sota/.claude/rules/convergence-gate.md` 5-band:
- Age = 96 days (just past 90d burn-in threshold)
- cpd = NOT MEASURED (would need full commit count probe)
- Likely band: **fast-churn anti-pattern** if cpd >10 (typical for "just-launched single binary" shipping pace)
- Even with stable burn-in, P7 already gates REJECT — Axis-3 supplementary only

### Cross-references

- `kiss-dry-yagni.md` Must-Never #4 — duplicate-functionality prohibition (refuted ICM adoption)
- `agent-harness-fit-verification.md` Probe 7.a — DEMAND-ABSENCE → REJECT-FOR-FIT
- `synthesis-layer-verify.md §Reporting categories` HONEST-NON-FINDING — REJECT IS the deliverable
- `cross-model-consensus.md §Source-cite discipline` — TIER-1-DIRECT to GitHub API live probe at HTTP 200 timestamp

### Cite trail

- `https://api.github.com/repos/rtk-ai/icm` (HTTP 200 verified 2026-05-09 11:38 EDT) — TIER-1-DIRECT
- `Z:/claude-sota-installed/.mcp.json:memory` block — existing wired mcp-memory primitive
- `https://github.com/doobidoo/mcp-memory-service` — incumbent primitive upstream

### Decision (forward-only)

NO install action. Document REJECT in this provenance log. Re-evaluate ICM only if:
1. ICM ships a unique-value capability mcp-memory lacks (e.g., decentralized/federated multi-agent memory share)
2. mcp-memory upstream becomes unmaintained (currently active per `https://github.com/doobidoo/mcp-memory-service` 1809★)
3. Operator explicit override with documented rationale

### CR conformance

- CR-1 cite SOTA primary: TIER-1-DIRECT GitHub API + upstream repo at file:line
- CR-3 cross-model gate: REJECT verdict via Probe-7 mechanical decision tree (codex T1 e2e NOT REQUIRED for HONEST-NON-FINDING per agent-harness-fit-verification.md FM-09 line 116 "HONEST-NON-FINDING is high-value output")
- CR-5 install-priority: NO install (REJECT closes the install-decision question for this candidate)
- CR-6 fresh-from-github: live probe at 2026-05-09 11:38 EDT
- CR-8 full-SOTA-content: ADAPTED-FROM-SOTA (Probe DAG verbatim per agent-harness-fit-verification.md)
- CR-9 install-risk: ZERO-RISK — no install action; pre-install REVERT check NOT triggered
- CR-10 research-first: Probe DAG IS the research; HONEST-NON-FINDING IS the result
- CR-11 META-process: standing-directive operational shape — Probe DAG executed BEFORE adoption decision per `mia-pre-apply.md` discipline

### Wave 120 Ship 1 close

REJECT-FOR-FIT documented. Task #71 → completed. Mia OVER ladder UNCHANGED at n=50 (no OVER catch this fire — Probe DAG pre-applied before any commit, so no apply-boundary gap to catch).

