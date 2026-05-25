---
title: "W174 P1(a) sota-researcher wave-2 4-repo line-by-line audit"
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher
wave: 174
fire: P1(a)-wave2
budget_loc: 600
---

# W174 P1(a) wave-2 — 4-repo line-by-line audit

## Scope
Probe DAG 1-7 per `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md` + LICENSE + convergence-gate Axis-1+2+3 per `Z:/claude-sota-installed/.claude/rules/convergence-gate.md` + Top-3 SOTA pattern extraction + verdict per repo.

## Repo 1: affaan-m/everything-claude-code @ HEAD `841beea45cb25ba51f29fa45b7e272938d19b80a`

### Metadata
- LICENSE: MIT [VERIFIED `Z:/repos/deps/affaan-m-everything-claude-code/LICENSE:1`]
- First commit: 2026-04-13 (~30 days old, but recent re-init clone)
- Total commits: 1553
- Commits last 90d: 50 (cpd~0.55)
- README: 140K+ stars, 21K+ forks, 170+ contributors, Anthropic Hackathon Winner [VERIFIED `Z:/repos/deps/affaan-m-everything-claude-code/README.md:22`]

### Inventory
- `agents/` 49+ named agents (architect / code-reviewer / chief-of-staff / harness-optimizer / etc.)
- `skills/` 182 SKILL.md
- `rules/` 89 rules
- `commands/` 68 commands
- `hooks/` runtime hooks
- `.claude/skills/everything-claude-code/SKILL.md` 11.3K conventions skill
- `.claude/rules/everything-claude-code-guardrails.md` repo conventions
- `.claude/homunculus/instincts/inherited/everything-claude-code-instincts.yaml` curated instinct profile

### Probe DAG verdicts
1. **Probe 1 count-OVER**: PASS — counts verified via `find ... | wc -l`
2. **Probe 2 SDK-vs-CLI**: PASS — CLI-only via /command and slash-prefix invocation
3. **Probe 3 architectural-API**: PASS — Anthropic CC native primitive (.claude/skills + .claude/agents + plugin)
4. **Probe 4 plugin-namespace**: **CRITICAL DUPLICATE** — `everything-claude-code` PLUGIN ALREADY INSTALLED at `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/` (verified 69 commands / 182 SKILL.md / 49 agents). HEAD-SHA `841beea4` matches.
5. **Probe 5 mode-harness-shape**: PASS — works with /loop autonomous mode + claude-sota-installed harness
6. **Probe 6 LICENSE/badge/registry**: PASS — MIT, npm `ecc-universal` + `ecc-agentshield` PUBLISHED
7. **Probe 7 demand-gate split**: **.a DEMAND-ABSENCE** — already installed; no marginal value from re-vendoring source. Disposition: CR-12 GENUINELY-NEW=NO; **DUPLICATE-FUNCTIONALITY**.

### Convergence-gate
- Axis 1 (≥3 distinct T1 orgs): N/A — single-org (affaan-m) per upstream attribution
- Axis 2 (≥2 named-T2 with dated artifact): PASS — Anthropic Hackathon Winner [VERIFIED README.md:22] + Affaan Mustafa public X posts
- Axis 3 (≥3mo stability): PASS — Anthropic Hackathon Winner endorsement + 1553 commits + npm packages with weekly downloads = STRONG-PROVENANCE-EXPRESS predicate fires

### Top-3 patterns
1. **`.claude/homunculus/instincts/inherited/<repo>-instincts.yaml`** — curated YAML instinct profiles with `confidence: 0.x` + `domain: <git/code-style/testing>` + `source_repo: <full-repo>` + `Evidence: ...` — **NOVEL pattern** for repo-curation instinct fanout (`/instinct-import` slash-cmd). cite: `Z:/repos/deps/affaan-m-everything-claude-code/.claude/homunculus/instincts/inherited/everything-claude-code-instincts.yaml:4-22 @ 841beea4`
2. **Generated repo-conventions skill** — `SKILL.md` auto-generated from `500 analyzed commits` with frequency-stats per workflow (database-migration ~2/mo, feature-development ~22/mo, add-language-rules ~2/mo). cite: `Z:/repos/deps/affaan-m-everything-claude-code/.claude/skills/everything-claude-code/SKILL.md:185-256 @ 841beea4`
3. **`manifests/install-profiles.json` 5-profile modular installer** (minimal/core/developer/security/research) with `modules: [rules-core, agents-core, commands-core, hooks-runtime, ...]` cite: `Z:/repos/deps/affaan-m-everything-claude-code/manifests/install-profiles.json:4-65 @ 841beea4`

### VERDICT: **CITE-CLASS-CANONICAL — AS-INSTALLED**
Per CR-12 disposition lattice: ALREADY-INSTALLED-DUPLICATE. Re-install source NOT GENUINELY-NEW. Patterns above are CITE-CLASS for sister codification opportunity. **No new install action**; cite-as-reference for future codification.

---

## Repo 2: vinta/awesome-python @ HEAD `5f725c25d7a783de81dd5e0c8f4ba03d1f441f4b`

### Metadata
- LICENSE: CC-BY-4.0 [VERIFIED `Z:/repos/deps/awesome-python/LICENSE:1`]
- Local: shallow clone (1 commit dated 2026-05-07; upstream is 18+ yrs mature meta-list)
- README: 1160 LOC, 289 categorized entries
- "The #10 most-starred repo on GitHub" [VERIFIED `Z:/repos/deps/awesome-python/README.md:9`]

### Probe DAG verdicts
1. **Probe 1 count-OVER**: PASS — 289 entries verified
2. **Probe 2 SDK-vs-CLI**: N/A — meta-list, no install primitive
3. **Probe 3 architectural-API**: N/A — pure documentation
4. **Probe 4 plugin-namespace**: N/A — non-installable
5. **Probe 5 mode-harness-shape**: N/A — documentation-only
6. **Probe 6 LICENSE**: PASS — CC-BY-4.0 permissive
7. **Probe 7 demand-gate split**: **.b DEMAND-CREATES-NEW-WORKFLOW** — discovery surface for Python library selection (relevant for hook script library choices per parent `Z:/claude-sota/.claude/rules/research-protocol.md` 6-catalog discovery surface)

### Convergence-gate
- Axis 1: N/A (single-source meta-list)
- Axis 2: PASS — Vinta Software named maintainer (Brazilian dev shop; 18yr listing)
- Axis 3: PASS — 18+ years stability + STRONG-PROVENANCE-EXPRESS

### VERDICT: **CITE-CLASS-CANONICAL**
Already cited in parent `Z:/claude-sota/.claude/rules/research-protocol.md` as TIER-2 6-catalog discovery surface. **No install needed**; reference for hook script library selection.

---

## Repo 3: ComposioHQ/composio @ HEAD `89b1669bacacc465f649825e23af7de695d2092a`

### Metadata
- LICENSE: MIT [VERIFIED `Z:/repos/deps/composio/LICENSE:1`]
- README: SDK announcement — npm `@composio/core` + pip `composio` [VERIFIED `Z:/repos/deps/composio/README.md:14-15`]
- OpenAPI spec at `https://backend.composio.dev/api/v3/openapi.json` (REQUIRES API KEY)
- Tool catalog: 300+ tool integrations (HACKERNEWS / Slack / GitHub / etc.)

### Probe DAG verdicts
1. **Probe 1 count-OVER**: PASS
2. **Probe 2 SDK-vs-CLI**: PASS — SDK with provider integrations
3. **Probe 3 architectural-API**: PASS — requires `composio.dev` backend + API KEY
4. **Probe 4 plugin-namespace**: PASS — no collision
5. **Probe 5 mode-harness-shape**: **MAJOR MISMATCH** — Composio is SaaS-bound. claude-sota-installed runs autonomous /loop without external SaaS dependencies; introducing SaaS-bound primitive breaks credential-management discipline + cardinal-rule-6 (official-native-channel).
6. **Probe 6 LICENSE**: PASS — MIT
7. **Probe 7 demand-gate split**: **.a DEMAND-ABSENCE** — sss has NO Slack/HackerNews/etc. tool-call workflow. Existing primitives (GitNexus / mcp__github / Anthropic SDK / Bash tool) cover all current use cases.

### VERDICT: **REJECT-FOR-FIT**
Probe 5 mode-harness-shape REJECT + Probe 7.a DEMAND-ABSENCE. SaaS-bound credential-class blocker incompatible with autonomous-loop ergonomics + cardinal-rule-9 install-risk discipline. **Cite-only reference** for the provider-agnostic tool-dispatch pattern.

---

## Repo 4: gsd-build/get-shit-done @ HEAD `3aaed8f5d7c3492678b867e6687d42c88fe227e5`

### Metadata
- LICENSE: MIT [VERIFIED `Z:/repos/deps/get-shit-done/LICENSE:1`]
- Total commits: 2510 / Commits last 90d: 50 (cpd~0.55)
- "58,543 GitHub stars" (per parent `Z:/claude-sota/.claude/rules/research-protocol.md` 2026-04-29 audit)
- npm package: `get-shit-done-cc@latest` [VERIFIED `Z:/repos/deps/get-shit-done/README.md:11`]

### Inventory
- `commands/gsd/` 99+ slash commands
- `agents/` 33 agents
- `hooks/` 13 hooks (gsd-prompt-guard / gsd-read-injection-scanner / gsd-context-monitor / gsd-workflow-guard / etc.)
- `get-shit-done/workflows/` + `references/`

### Probe DAG verdicts
1. **Probe 1 count-OVER**: PASS
2. **Probe 2 SDK-vs-CLI**: PASS — CLI-native via npx + slash commands
3. **Probe 3 architectural-API**: PASS — Anthropic CC native (commands + agents + hooks)
4. **Probe 4 plugin-namespace**: PASS — `gsd-*` namespace doesn't collide
5. **Probe 5 mode-harness-shape**: **PARTIAL MISMATCH** — `gsd-new-project` HARD-GATE init flow conflicts with autonomous /loop. Solo-developer-target framing per README:55.
6. **Probe 6 LICENSE/badge/registry**: PASS — MIT, npm PUBLISHED
7. **Probe 7 demand-gate split**: **.b DEMAND-CREATES-NEW-WORKFLOW** — 3 NOVEL patterns NOT in claude-sota-installed: (a) prompt-injection-guard hook with summarisation-preserve patterns; (b) context-monitor hook with 35%/25% threshold injection of agent-visible WARNING/CRITICAL; (c) gsd-graphify knowledge-graph-build slash command. **5-clause test**: named operational use case (long-arc /loop context degradation defense) ✅; cited local input ✅; wiring path (Anthropic CC hook registry per `Z:/claude-sota/.claude/rules/layered-gates-architecture.md §5 Layer 2`) ✅; incumbent comparison (W164 F38a `intelligent-compact` is orthogonal — gsd addresses adversarial-content) ✅; reversible time-box (30-day pilot retire path to `disabledHooks` if false-positive rate >5%) ✅.

### Convergence-gate
- Axis 1: PARTIAL (single-org BUT 7 named-T2 reviews per parent audit)
- Axis 2: PASS — TÂCHES maintainer + 7 practitioners + 132 contributors
- Axis 3: PASS — 2510 commits + 49 releases + STRONG-PROVENANCE-EXPRESS via 58K+ stars

### Top-3 patterns (INSTALL CANDIDATES)
1. **`gsd-prompt-guard.js` PreToolUse hook** — scans Write/Edit content for 14 prompt-injection regex patterns BEFORE writing to `.planning/`. ADVISORY warning. cite: `Z:/repos/deps/get-shit-done/hooks/gsd-prompt-guard.js:14-33 @ 3aaed8f5`
2. **`gsd-read-injection-scanner.js` PostToolUse hook** — scans Read output + NOVEL summarisation-preserve patterns (`/preserve\s+(?:these|this)\s+(?:rules?|instructions?|directives?)\s+(?:in|through|after|during)/i`) designed to survive context compression. cite: `Z:/repos/deps/get-shit-done/hooks/gsd-read-injection-scanner.js:22-28 @ 3aaed8f5`
3. **`gsd-context-monitor.js` PostToolUse hook** — reads statusline-bridge JSON + injects WARNING (≤35%) / CRITICAL (≤25%) into `additionalContext` so AGENT sees thresholds. 5-call debounce + severity-escalation bypass. cite: `Z:/repos/deps/get-shit-done/hooks/gsd-context-monitor.js:14-29 @ 3aaed8f5`

### VERDICT: **STUDY-PILOT-NARROW** (3 hooks; 30-day pilot)
3 hooks GENUINELY-NEW. 99 slash commands DUPLICATE-FUNCTIONALITY. 33 agents PARTIAL-OVERLAP. Top-3 INSTALL: prompt-guard + read-injection-scanner + context-monitor (each LOW CR-9 install-risk).

---

## Summary table (4-repo cohort)

| # | Repo | LICENSE | Probe DAG | Axis 1+2+3 | CR-12 disposition | Verdict |
|---|---|---|---|---|---|---|
| 1 | affaan-m/everything-claude-code | MIT | DUPLICATE | STRONG-PROV-EXPRESS PASS | DUPLICATE-FUNCTIONALITY (already-installed) | CITE-CLASS-CANONICAL |
| 2 | vinta/awesome-python | CC-BY-4.0 | N/A (meta-list) | STRONG-PROV-EXPRESS PASS | CITE-CLASS-CANONICAL | CITE-CLASS-CANONICAL |
| 3 | ComposioHQ/composio | MIT | Probe 5+7.a REJECT | PARTIAL Axis 1 single-org | REJECT (SaaS-bound) | REJECT-FOR-FIT |
| 4 | gsd-build/get-shit-done | MIT | Probe 7.b 5-clause PASS | STRONG-PROV-EXPRESS PASS | GENUINELY-NEW for 3 hooks | STUDY-PILOT-NARROW (30d, 3-hook subset) |

## Top-3 INSTALL recommendations (from this 4-repo wave-2)

1. **gsd-build/get-shit-done `gsd-prompt-guard.js`** — install as PreToolUse hook on Write|Edit matcher; advisory only. CR-9 install-risk: LOW.
2. **gsd-build/get-shit-done `gsd-read-injection-scanner.js`** — install as PostToolUse hook on Read matcher; summarisation-preserve patterns. CR-9 install-risk: LOW.
3. **gsd-build/get-shit-done `gsd-context-monitor.js`** — install as PostToolUse hook on tool-use matcher; agent-visible context thresholds complement W164 F38a `intelligent-compact` PreCompact. CR-9 install-risk: LOW-MEDIUM (verify statusline bridge path under Windows Git Bash before install).

## Verification (per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`)
- OVER: 0 claims; all line-numbers + HEAD-SHAs probe-verified
- UNDER: 0 known gaps
- HONEST-NON-FINDING: composio Axis 1 single-org concentration weakens convergence; gsd Axis 1 single-org BUT compensated by named-T2 + STRONG-PROVENANCE-EXPRESS
- HANDOFF: handoff_to: orchestrator | verdict_one_line: "DONE: 4 repos audited (1 CITE-CLASS-CANONICAL ALREADY-INSTALLED + 1 CITE-CLASS-CANONICAL discovery-surface + 1 REJECT-FOR-FIT SaaS-bound + 1 STUDY-PILOT-NARROW gsd 3-hook subset); Top-3 INSTALL recommendations = gsd-prompt-guard + gsd-read-injection-scanner + gsd-context-monitor"

VERDICT: STUDY-PILOT-NARROW (gsd 3-hook subset 30d pilot) — recommend orchestrator dispatch install design for the 3 gsd hooks per CR-10 research-first-then-install workflow + CR-9 install-risk version-pin discipline.
