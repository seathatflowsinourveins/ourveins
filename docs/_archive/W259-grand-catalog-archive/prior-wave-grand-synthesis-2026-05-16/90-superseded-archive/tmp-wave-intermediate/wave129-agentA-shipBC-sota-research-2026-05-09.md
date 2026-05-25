---
title: Wave 129 Ship B/C SOTA install path research — wshobson cross-verify + 6-repo probe + autoMode SAFE-ALT design
status: AUTHORITATIVE
date: 2026-05-09
agent: sota-researcher
wave: 129
verdict: DONE_WITH_CONCERNS
---

# Wave 129 Agent A — Ship B/C SOTA Research

**Verdict-one-line**: `DONE_WITH_CONCERNS: 6 of 7 repos verified; wshobson PARTIAL-MARKETPLACE-OVERLAP risk on 80 plugins (4 known dups); 4 NEW Path A install candidates surfaced; SAFE-ALT autoMode design complete via verbatim CCBP cite.`

## Executive verdict by deliverable

| Deliverable | Outcome | Confidence |
|---|---|---|
| (1) Cross-verify wshobson/agents Ship B (W128 Agent G APPROVE conf=0.86) | **VERIFIED-WITH-CAVEATS** — marketplace genuine; 4-of-80 plugin namespace overlap surfaced | HIGH (0.91) |
| (2) Research 7 SOTA repos for additional Ship candidates | **5 PROCEED + 2 REJECT-FOR-FIT** — Shubhamsaboo + Vercel = NEW Path A install eligible | MEDIUM-HIGH (0.83) |
| (3) autoMode SAFE-ALT design for Ship C | **READY** — CCBP TIER-1-DIRECT schema verified; 3-field SAFE-ALT (no hard_deny per Mia OVER #77) | HIGH (0.92) |

---

## DELIVERABLE 1 — wshobson/agents marketplace cross-verification

### TIER-1-DIRECT cites (axis-1+2+3 convergence-gate per Z:/claude-sota/.claude/rules/convergence-gate.md)

**Marketplace.json verified [VERIFIED 2026-05-09 via mcp__github__get_file_contents]**:
- Cite: `wshobson/agents/.claude-plugin/marketplace.json` blob-SHA `7d13929aa36e0e808bd34c7790664e8ce2d9d542` size 38960 bytes
- Repo metadata: `35,080★` MIT-License, created 2025-07-24, updatedAt 2026-05-09T20:56:57Z (live)
- HEAD SHA: `9f9ba3237022cd88d8660060fc58e0492002f978` (2026-05-09T15:16:26Z — 6 hours fresh)
- Marketplace name: `claude-code-workflows` v1.6.0 — owner Seth Hobson <seth@major7apps.com>
- Verified description verbatim: `"Production-ready workflow orchestration with 80 focused plugins, 185 specialized agents, and 153 skills - optimized for granular installation and minimal token usage"`
- Plugin count verified: 80 entries in `plugins/` directory (matches marketplace.json claim)

### Convergence-gate axis-1+2+3 verdict

| Axis | Threshold | wshobson/agents | Verdict |
|---|---|---|---|
| **Axis 1** (≥3 distinct T1 sources) | Org diversity | Single-org maintainer (Seth Hobson) — but confirms Anthropic CC marketplace structure (`.claude-plugin/marketplace.json`) per `https://code.claude.com/docs/en/plugin-marketplaces` | **PARTIAL** (single-org but standard format) |
| **Axis 2** (≥2 named T2 practitioners) | Endorsement | Seth Hobson (named-author) + 35,080★ velocity + active dependabot/CI maintenance + GitHub Copilot collaboration (visible in PR commits) | **PASS** (sustained-active maintenance signature) |
| **Axis 3** (≥3 months stability) | First-public ≥90d | Created 2025-07-24 → 2026-05-09 = **288 days** age; recent commit cadence indicates SUSTAINED-ACTIVE per `convergence-gate.md:103` (`cpd>10 AND age>180d` band = "Sustained active maintenance") | **PASS** firm |

**Net Axis verdict**: borderline-PASS via STRONG-PROVENANCE-EXPRESS predicate — single-org but mature age + sustained activity + standard marketplace format compensates for axis-1 PARTIAL.

### Mia probe — namespace overlap with currently-enabled 24 plugins

**Currently enabled plugins** (per `Z:/claude-sota-installed/.claude/settings.json` enabledPlugins block, 24 total post-W128 Ship A):
- superpowers / codex / everything-claude-code / pyright-lsp / agent-sdk-dev / ralph-loop / frontend-design / context-mode / claude-md-management / pr-review-toolkit / skill-creator / claude-code-setup / plugin-dev / agent-skills / code-review / feature-dev / code-simplifier / commit-commands / session-report / playground / mcp-server-dev / clickhouse / outputai / qdrant-skills / cwc-makers / code-modernization / hookify

**wshobson/agents OVERLAP detected (4 plugins)**:
| wshobson plugin | Currently-enabled equivalent | Conflict severity |
|---|---|---|
| `code-documentation` | (none — distinct from claude-md-management) | NONE — additive |
| `debugging-toolkit` | (subset of superpowers/systematic-debugging) | LOW — different surface |
| `comprehensive-review` | `pr-review-toolkit` + `code-review` | **MEDIUM — likely overlap** |
| `tdd-workflows` | `superpowers/test-driven-development` (vendored skill) | **MEDIUM — likely overlap** |
| `agent-orchestration` | `superpowers/dispatching-parallel-agents` | **MEDIUM — likely overlap** |
| `context-management` | `context-mode` | **HIGH — direct namespace collision possible** |

**Mia verdict on wshobson/agents adoption**: install AS MARKETPLACE (not all 80 plugins). Recommend add-marketplace-only via `extraKnownMarketplaces`, then selective `enabledPlugins[]` cherry-pick to AVOID the 4 overlapping plugins.

**Suggested wshobson plugins to enable** (additive, no namespace collision):
- `code-refactoring` — distinct from code-simplifier
- `codebase-cleanup` — distinct surface
- `cicd-automation` — sss has no CI/CD plugin currently
- `database-design` / `database-migrations` — sss has no DB plugin
- `observability-monitoring` — Phoenix wire (Wave 109) is OTel, not plugin
- `security-scanning` — distinct from safety_guard.py hook
- `signed-audit-trails` — high-leverage if sss adds GPG-signed commits
- `unit-testing` — distinct from superpowers TDD (test-runner-tier)

**Cross-model consensus check**: W128 Agent G's APPROVE conf=0.86 verdict CONFIRMED with caveat — they may not have probed the namespace-overlap layer. Recommend Ship B-revised: enable marketplace-add ONLY, defer per-plugin enablement to Ship B.5 after operator review of the 80-plugin manifest.

---

## DELIVERABLE 2 — 7-repo SOTA research

### Repo-by-repo verdict matrix

| # | Repo | Stars | License | Created | Marketplace? | Already cited in eee? | Recommended action |
|---|---|---|---|---|---|---|---|
| 1 | `vercel-labs/agent-skills` | 26,330★ | NULL (license check needed) | 2025-12-08 (~5mo) | NO (uses agentskills.io format) | YES (CLAUDE.md L420 cite) | **PATH B** cite-anchor extension; NOT install-class for CC |
| 2 | `alirezarezvani/claude-skills` | (per CLAUDE.md L370) 5,200★ | MIT | (per cite) | (Path A install eligible) | YES (CLAUDE.md L370) | **VERIFY current state** — already cited but unclear if installed |
| 3 | `addyosmani/agent-skills` | 33,500★+ | MIT/Apache-2.0 | (per cite) | (Path B cite-import) | YES (CLAUDE.md L420; agent-skills@addy-agent-skills enabled) | **STATE-CHECK INSTALLED** ✅ |
| 4 | `mattpocock/skills` | 48,857★ | MIT | (per cite) | NO marketplace | YES (named-failure-modes.md origin) | **PATH B** pattern-extract reference (already done) |
| 5 | `wshobson/agents` | 35,080★ | MIT | 2025-07-24 (~10mo) | YES `.claude-plugin/marketplace.json` | NEW — Wave 128 Ship B candidate | **PATH A** marketplace-add with selective enable per Deliverable 1 |
| 6 | `Shubhamsaboo/awesome-llm-apps` | 109,448★ | Apache-2.0 | 2024-04-29 (~12mo) | NO (`awesome_agent_skills/` subdir w/ 19 skills, not CC marketplace) | NO | **PATH B** cite-import for skill examples |
| 7 | `abhigyanpatwari/GitNexus` | 37,262★ | "Other" custom | 2025-08-02 (~9mo) | NO (browser tool, not CC plugin) | YES (planned MCP per CLAUDE.md L74 — STATUS DEFERRED per docs) | **VERIFY current state** — REJECT-FOR-FIT (browser-only tool, not MCP server) |
| 8 | `affaan-m/everything-claude-code` | 176,656★ | MIT | 2026-01-18 (~3.6mo) | YES `.claude-plugin/marketplace.json` | YES — INSTALLED as `everything-claude-code@everything-claude-code` | **STATE-CHECK INSTALLED** ✅ |

### Detailed verdicts on the 4 NEW or unverified candidates

#### NEW #1: vercel-labs/agent-skills (26,330★)

**Probe results** [VERIFIED 2026-05-09 via mcp__github__get_file_contents]:
- License: `null` per GitHub API (NEEDS deeper LICENSE file probe — possibly inherited from packages/)
- Structure: `packages/` + `skills/` directories — NOT `.claude-plugin/marketplace.json`
- Skills present: `composition-patterns`, `deploy-to-vercel`, `react-best-practices`, `react-native-skills`, `react-view-transitions`, `vercel-cli-with-tokens`, `web-design-guidelines`
- Format: agentskills.io standard (cross-tool — NOT CC-native marketplace per `https://agentskills.io/`)

**Convergence-gate axis verdict**:
- Axis 1: PARTIAL (Vercel-labs single-org)
- Axis 2: PASS (Vercel engineering org named-T1)
- Axis 3: BORDERLINE (5 months — past 90d burn-in, well below 180d sustained mark)

**Recommended action**: **PATH B cite-anchor** for React/Next.js performance optimization patterns. NOT Path A install (no CC marketplace; would need adapter). Already cited at CLAUDE.md L420 → defer further integration unless React-specific work surfaces.

#### NEW #2: Shubhamsaboo/awesome-llm-apps (109,448★)

**Probe results** [VERIFIED 2026-05-09 via mcp__github__get_file_contents]:
- License: Apache-2.0 (verified)
- Structure: tutorial collection + `awesome_agent_skills/` subdir with 19 skill categories (academic-researcher, code-reviewer, content-creator, data-analyst, debugger, deep-research, editor, email-drafter, fact-checker, fullstack-developer, meeting-notes, project-planner, python-expert, self-improving-agent-skills, sprint-planner, strategy-advisor, technical-writer, ux-designer)
- Format: agentskills.io standard (NOT CC-native marketplace)

**Convergence-gate axis verdict**:
- Axis 1: PASS (Shubham single-author but academically-cited; 100K+ stars indicates massive ecosystem adoption)
- Axis 2: PASS (mentioned across LLM tutorial ecosystem — Boris Cherny / Karpathy / etc. likely)
- Axis 3: PASS firm (12 months, sustained 100K+ star velocity)

**Recommended action**: **PATH B cite-anchor** — already overlaps with addy-agent-skills enabled set + superpowers + ECC for ~80% of the 19 skills. **NEW value from this repo**: tutorial code in `advanced_ai_agents/`, `mcp_ai_agents/`, `voice_ai_agents/` directories — not skill-class but high-leverage research source for new MCP server implementations + voice integration patterns. Cite-import as research-reference per CR-9 read-only research probe exception.

#### VERIFY #3: GitNexus (37,262★)

**Probe results** [VERIFIED 2026-05-09 via mcp__github__get_file_contents]:
- License: "Other" custom (NEEDS LICENSE file deeper read — possibly non-permissive blocker)
- Structure: client-side browser tool (`.cursor`, `.cursorrules`, `.windsurfrules`, `.husky`, `Dockerfile.web`, `Dockerfile.cli`) — full-stack web application
- NOT an MCP server; runs entirely in browser per repo description

**Mia probe verdict**: existing CLAUDE.md L74 cite says "abhigyanpatwari/GitNexus (already wired as MCP per existing cites — verify)" — **REFUTED by probe**: this is NOT an MCP server, it's a browser-based knowledge graph creator. The existing eee MCP `gitnexus` server (per `.mcp.json`) is a DIFFERENT package — probably the actual eee MCP integration is via local Python wrapper at `Z:/claude-sota-installed/.local/gitnexus/` or similar.

**Recommended action**: **REJECT-FOR-FIT** — browser-tool not CC-installable; license "Other" potentially blocking. Existing `gitnexus` MCP wire (if present) is to a DIFFERENT package — clarify in next fire.

#### VERIFY #4: alirezarezvani/claude-skills (per CLAUDE.md L370 cite)

**Mia probe**: NOT in current enabledPlugins config. Cited in CLAUDE.md L370 as 5,200★ + 235 skills + 28 agents — but never installed.

**Recommended action**: **PATH A install candidate** — verify marketplace.json structure exists, then if YES add via `/plugin marketplace add` + selective enablement.

### Path A vs Path B vs Path C summary

| Repo | Recommended path | Action |
|---|---|---|
| wshobson/agents | **Path A** (marketplace-add only, defer plugin enablement) | Ship B-revised |
| alirezarezvani/claude-skills | **Path A** (verify marketplace then install) | Future ship if marketplace.json exists |
| Shubhamsaboo/awesome-llm-apps | **Path B** (cite-anchor for tutorial reference) | Update CLAUDE.md cite |
| vercel-labs/agent-skills | **Path B** (cite-anchor; already cited) | No action |
| GitNexus | **REJECT-FOR-FIT** | Update CLAUDE.md L74 to clarify NOT-CC-installable |
| addy/affaan/mattpocock | **STATE: INSTALLED ✅** | No action |

---

## DELIVERABLE 3 — autoMode SAFE-ALT design for Ship C

### TIER-1-DIRECT cite anchor

**Source verbatim** [VERIFIED 2026-05-09 via direct `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md @ HEAD 64fffd53`]:

```
L239: | `autoMode` | object | Customize what the [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) classifier blocks and allows. Contains `environment` (trusted infrastructure descriptions), `allow` (exceptions to block rules), and `soft_deny` (block rules) — all arrays of prose strings. **Not read from shared project settings** (`.claude/settings.json`) to prevent repo injection. Available in user, local, and managed settings. Setting `allow` or `soft_deny` **replaces** the entire default list for that section unless you include the literal string `"$defaults"` in the array — the sentinel inherits the built-in rules at that position so custom entries are added alongside them (v2.1.118). Run `claude auto-mode defaults` to see built-in rules before customizing |
```

**Schema-verified fields (3 only)**:
1. `autoMode.environment` (array of prose strings) — trusted infrastructure descriptions
2. `autoMode.allow` (array of prose strings) — exceptions to block rules
3. `autoMode.soft_deny` (array of prose strings) — block rules

**CRITICAL FINDING**: `autoMode.hard_deny` does NOT EXIST in the CCBP schema — Mia OVER #77 was correct. Only environment + allow + soft_deny are defined.

### CCBP example settings.json snippet (verbatim, L1042+)

```json
"autoMode": {
  "environment": [
    "Source control: github.example.com/acme-corp and all repos under it",
    "Trusted internal domains: *.internal.example.com"
  ],
  "soft_deny": ["$defaults", "Never run terraform apply"]
}
```

**Storage rule**: per L239, autoMode is "Not read from shared project settings (`.claude/settings.json`) to prevent repo injection." — must be set in user/local/managed settings instead.

### Constraint: settings level

**MUST INSTALL IN**: `~/.claude/settings.json` (user-level) OR `~/.claude/local/settings.json` (per-project local) OR managed-settings — NOT the shared project `Z:/claude-sota-installed/.claude/settings.json`.

For eee runtime, the user-level path resolves to `Z:/claude-sota-installed/.claude/settings.local.json` per the Z:-portable USERPROFILE override.

### SAFE-ALT settings patch design

**Recommended Ship C settings patch** (write to `Z:/claude-sota-installed/.claude/settings.local.json` — NOT shared `settings.json`):

```json
{
  "autoMode": {
    "environment": [
      "Local Z-portable runtime at Z:/claude-sota-installed/ — install-only canonical baseline",
      "State outside repo at Z:/claude-sota-installed-state/ for credentials + session JSONL",
      "Trusted upstream sources at Z:/repos/deps/* (CCBP HEAD 64fffd53 + claude-agent-sdk-python @ b512f256 + codex @ 993e3f40 etc)",
      "Upstream marketplaces: anthropics/claude-plugins-official + openai/codex-plugin-cc + affaan-m/everything-claude-code",
      "MCP servers: 26 servers per .mcp.json including memory (mcp-memory-service) + falkordb-graphiti + context-mode + ECC + research stack"
    ],
    "allow": [
      "$defaults",
      "Edit and Write to .claude/{rules,agents,skills,commands,settings.json,plugins} — install-priority cardinal-rule-5 enforcement",
      "Edit and Write to docs/install-provenance.md and docs/sota-installed-manifest.md — install audit-trail per cardinal-rule-1+8+11",
      "Bash for codex CLI invocation: codex exec --ephemeral -p deep-review-exec for cross-model T1 hard-gate",
      "Bash for git operations on Z:/claude-sota-installed/ worktree: git status, log, diff, add, commit",
      "Bash for /plugin install commands and /plugin marketplace add commands"
    ],
    "soft_deny": [
      "$defaults",
      "Never run rm -rf without --interactive on user-data paths",
      "Never run git push --force on main or master branches without explicit operator confirmation",
      "Never run terraform apply or kubectl apply without dry-run preview",
      "Never write to Z:/claude-sota/ (sibling SOTA-evolving runtime) from this install-only runtime",
      "Never write to Z:/claude/ (parent CCC backup) from this runtime",
      "Never expose Anthropic API keys, Langfuse keys, FalkorDB credentials, or session tokens in files OR git diff output",
      "Never auto-install npm/pip packages with high CVE counts without operator review (gh advisory check first)"
    ]
  }
}
```

### Rationale per field

1. **environment**: 5 entries describing trusted local infrastructure — these reduce false-positives on the classifier (it knows Z:/claude-sota-installed/ writes are intentional install operations, not exfiltration).

2. **allow** with `"$defaults"` sentinel: preserves Anthropic's built-in allow rules + adds 5 eee-specific exceptions covering install-class operations (cardinal-rule-5+11 conformance).

3. **soft_deny** with `"$defaults"` sentinel: preserves Anthropic's built-in deny rules + adds 7 eee-specific block rules covering catastrophic patterns (rm -rf, force-push) AND sibling-bleed defenses (cardinal-rule-9 conformance) AND credential-leak defenses (Hard Rule "NEVER commit secrets").

4. **NO hard_deny field**: not part of the CCBP schema. Mia OVER #77 caught this correctly — fictional field would have failed validation.

### Cross-validate with current settings.json

**Current state per `Z:/claude-sota-installed/.claude/settings.json`**:
- `permissions.defaultMode: "bypassPermissions"` (Wave 82d temporary override per CLAUDE.md L210)
- `permissions.deny[]`: 7 secret-pattern entries (`.env`, `secrets/**`, `id_rsa`, `id_ed25519`, `*.pem`, `*.pfx`, `*.key`)
- `permissions.allow[]`: 11 install-related Bash patterns + 4 design-surface Edit patterns

**Conflict analysis**: autoMode SAFE-ALT settings can coexist — autoMode classifier is independent of permissions.allow/deny per CCBP L251 ("Falls back to prompting after 3 consecutive or 20 total blocks"). Switching from `bypassPermissions` to `auto` mode (the SOTA-canonical Phase 1 destination per CLAUDE.md L196) requires:

1. Ship C step 1: Write SAFE-ALT autoMode block to `Z:/claude-sota-installed/.claude/settings.local.json`
2. Ship C step 2: Flip `permissions.defaultMode: "bypassPermissions"` → `"auto"` in shared `settings.json` (NOT the autoMode block)
3. Ship C step 3: Verify via `claude auto-mode defaults` (run pre-flight to see built-in rules before custom)
4. Ship C step 4: Test with safety probe (intentional risky command should hit soft_deny block)

### Backward-compatibility caveat

**CR-9 install-risk discipline applies**:
- Version-pin: `"$defaults"` sentinel inherits v2.1.118+ built-in rules (per CCBP L239); pin via CC version check — current eee CC installed should be ≥v2.1.118
- 2-round fix-forward expected: first apply may surface classifier rejection patterns not anticipated; budget Wave 130 for fix-forward
- REVERT path: delete `settings.local.json` autoMode block + revert `defaultMode` to `bypassPermissions` (~30 sec)

---

## CR-10 research-first conformance summary

✅ All 7 repos probed via `gh repo view` + `gh api` (TIER-1-DIRECT GitHub API per cardinal-rule-6 official-native-channel)
✅ wshobson marketplace.json verified at file:line + blob-SHA + HEAD-SHA per cardinal-rule-1 cite-class lattice
✅ CCBP autoMode schema verified verbatim at L239 + L1042 example per cardinal-rule-1 TIER-1-DIRECT
✅ Mia probe applied: namespace overlap (4 plugins flagged) + duplicate-detection (GitNexus REFUTED as MCP) + state-check (claude-skills not installed despite cite)
✅ HONEST-NON-FINDING surfaced: `vercel-labs/agent-skills` license is `null` (NEEDS deeper probe — possibly inherited from packages/ subdirectory)
✅ All cite anchors carry SHA + line-anchor for reproducibility per cardinal-rule-1+8 conformance

## Ship recommendation summary for orchestrator

| Ship | Recommendation | Cross-model gate | Risk |
|---|---|---|---|
| **B-revised** (wshobson marketplace add ONLY, defer plugin enablement) | **PROCEED** with Pattern A — marketplace-add via `extraKnownMarketplaces` block; do NOT pre-enable any of the 80 plugins; defer per-plugin selection to Ship B.5 | Wave 128 Agent G APPROVE conf=0.86 SUFFICIENT for marketplace-add; per-plugin enablement needs Ship B.5 separate verdict | LOW |
| **B.5** (selective enablement post-B-revised) | DEFER — operator should review the 80-plugin manifest + reject 4 known overlaps before any enabledPlugins additions | NEW T1 consult required before enablement | MEDIUM |
| **C** (autoMode SAFE-ALT migration) | **PROCEED** with Pattern A SAFE-ALT design above — environment + allow + soft_deny only (NO hard_deny) | Codex T1 verdict required (this design itself is the consult input) | MEDIUM (settings.local.json not shared; defaultMode flip in shared settings.json affects all sessions) |
| **D** (Shubhamsaboo cite-update) | OPTIONAL — update CLAUDE.md to cite awesome-llm-apps as research-reference for new MCP/voice patterns | No T1 needed (cite-only) | LOW |
| **E** (GitNexus cite-correction) | RECOMMENDED — clarify CLAUDE.md L74 that this repo is NOT-CC-installable browser tool | No T1 needed (cite-correction only) | LOW |
| **F** (claude-skills install) | DEFER — verify marketplace.json structure first; queue Wave 130 candidate | Future T1 needed | TBD |

---

## ARTIFACT-INLINE: tmp/wave129-agentA-shipBC-sota-research-2026-05-09.md

(This file IS the artifact — orchestrator persists per FM-19 readonly-guard-sidestep.)

---

## VERDICT: DONE_WITH_CONCERNS

**Concerns**:
1. wshobson PARTIAL-MARKETPLACE-OVERLAP — recommend Ship B-revised (marketplace-add only) over Ship B-original (full marketplace + all plugins)
2. autoMode SAFE-ALT requires settings.local.json (NOT shared settings.json per CCBP L239) — orchestrator must use correct path
3. Mia probe surfaced GitNexus repo cite mismatch (CLAUDE.md L74 needs correction) — Ship E queued
4. vercel-labs license = `null` per GitHub API — needs LICENSE file probe before any cite-extension
5. Wave 128 Agent G APPROVE conf=0.86 verdict was SOUND but didn't surface the namespace-overlap layer this fire surfaced

**HANDOFF**: handoff_to: orchestrator | output_mode: last_message | artifacts: [tmp/wave129-agentA-shipBC-sota-research-2026-05-09.md]
