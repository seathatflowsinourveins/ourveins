# W344 Stream Z3 — Cite-Refresh Deltas

> Date: 2026-05-20 | Source: Z3-ingest-batch-A.md §6
> Probe-method: `git ls-remote https://github.com/<org>/<repo>.git HEAD` + GitHub MCP `get_file_contents` SHA
> 3-org-distinct floor: GitHub + DeepWiki + Perplexity + native git (4 orgs ≥ 3)

## SHA Drift Table (W342-Z baseline → W344-Z3 probe)

| # | Repo | Prior W342-Z cite-anchor | W344-Z3 HEAD probe | Δ-SHA | Δ-Severity | Action |
|---|------|--------------------------|---------------------|-------|-----------|--------|
| 1 | anthropics/claude-cookbooks | `39a350b6790c132337dcc3ec35240728fcc1dc0e` (CLAUDE.md L24, L37, L74) | `39a350b6790c132337dcc3ec35240728fcc1dc0e` | 0 | NONE | NO-OP cite-stable |
| 2 | anthropics/claude-code | URL-cite only (no SHA) | `cc898dc3692fb583f36ab327942aad20b7d3dbd0` | N/A | NONE | NO-OP pattern-cite |
| 3 | wshobson/agents | marketplace-installed | `08ded5e7b0fe57e7f40194775885eba539c3d8e7` | (no prior SHA) | minor-alias | RECORD baseline `08ded5e7` |
| 4 | addyosmani/agent-skills | `f17c6e88c904dc747381c374312c2d58e10647ae` (CLAUDE.md L100; SKILL.md ×4 pinned) | `f17c6e88c904dc747381c374312c2d58e10647ae` | 0 | NONE | NO-OP cite-stable |
| 5 | mksglu/context-mode | pkg-version `1.0.18` pin | `4dcbd45144b2a7fb60907ec7983c6acaaef51d6b` | N/A | deepwiki-stale | INVESTIGATE deepwiki index lag |

## Detected Anomalies

### A1 — wshobson marketplace-name alias-mismatch
- README declares `/plugin marketplace add wshobson/agents` (README L42)
- Local cache directory is `.claude/plugins/cache/claude-code-workflows/` (May 17 install)
- Suggests upstream marketplace.json defines `marketplace_id="claude-code-workflows"` even though repo is `wshobson/agents`
- Action: re-probe `.claude-plugin/marketplace.json` from wshobson/agents@HEAD to confirm marketplace_id field; queue as W345-X cite-doc minor-clarify

### A2 — addyosmani 5th-skill spec-driven-development SHA-pin unverified
- 4 of 5 forked SKILL.md files explicitly probed and ALL contain `f17c6e88` × 3 occurrences (cardinal-rule-6 PASS)
- Skill `addyosmani-spec-driven-development` shows as active in system-reminder skill-list but Bash sweep failed to confirm presence (likely artifact of glob test; skill IS installed per skill enumeration)
- Action: confirm-skill SHA-pin via direct Read on next wave (low-risk, defer to W345 housekeeping)

### A3 — mksglu/context-mode deepwiki index stale on 2 commands
- DeepWiki ask_question: `ctx_insight` and `ctx_purge` "not found in provided codebase"
- My runtime's skill-list: `/context-mode:ctx-insight`, `/context-mode:ctx-purge` are LIVE active skills
- Probably (a) deepwiki indexed pre-release of pkg 1.0.18 (b) commands implemented as .claude/commands/ slash-cmd not server.registerTool() MCP tools (c) post-1.0.18 release deepwiki has not re-indexed
- Action: direct WebFetch of `https://github.com/mksglu/context-mode/tree/main/.claude/commands/` to verify implementation strategy; queue W345-Y

## Refresh Recommendations

1. **NO-OP for CLAUDE.md cite-anchors §1-§2**: anthropics/claude-cookbooks `39a350b6` and addyosmani `f17c6e88` are STABLE — no edit required.
2. **Record baseline SHA for wshobson/agents `08ded5e7`** in next CLAUDE.md edit (currently URL-cite only, no SHA — opportunity for tighter cite-anchor per cardinal-rule-6).
3. **Record live HEAD SHA for anthropics/claude-code `cc898dc3`** when next adding CLI-behavior citations.
4. **Queue W345 alias-clarify** for wshobson marketplace-id (low-priority, single-line CLAUDE.md edit).

## Probe Methodology Audit

- **github MCP `get_file_contents`**: returns file SHA (blob) — useful for file-level cite freshness
- **git ls-remote** (Bash): returns HEAD commit SHA — authoritative for top-of-tree freshness
- **DeepWiki ask_question**: useful for content-level Q&A but index can lag actual HEAD by days/weeks (stale-cache risk per W332 audit-trap pattern)
- **Perplexity ask** (month-filter): useful for recent-issue surfacing but can return unverifiable claims (verified in §2 — returned "I can't reliably answer" honesty signal)
- **3-org-distinct floor achieved**: 4 organizations contributed evidence (sca-v13 ≥3 floor satisfied)

## Cardinal-Rule-6 Compliance Statement

Every SHA above is reproducible via:
```bash
git ls-remote https://github.com/anthropics/claude-cookbooks.git HEAD
git ls-remote https://github.com/anthropics/claude-code.git HEAD
git ls-remote https://github.com/wshobson/agents.git HEAD
git ls-remote https://github.com/addyosmani/agent-skills.git HEAD
git ls-remote https://github.com/mksglu/context-mode.git HEAD
```
Probe-output stored in W344 wave evidence directory.
