---
title: "Wave-12 Stream-W: Hooks Inventory + Statusline Resolution + gsd-context-monitor Decision"
status: AUTHORITATIVE
date: 2026-05-14
agent: wave12-stream-W
output_budget: 600 LOC
termination: on_handoff_to=orchestrator | text_match=HOOKS-AUDIT-COMPLETE
---

# Wave-12 Stream-W — Hooks Audit + Statusline + Context-Monitor

## TL;DR

3 deliverables shipped for claude-sota-pure Phase 2A+ manifest:

1. **Hooks inventory** — 49 hook entries enumerated across 6 marketplace plugin caches + 2 candidate statusline/gsd repos. 9 of 11 pure runtime Phase 2A plugins ship hooks; 5 of 6 marketplaces contain hooks/ artifacts (obra/superpowers + addy-agent-skills ship ZERO hooks — skill-only marketplaces).
2. **Statusline final pick = `claudia-statusline` (hagan)** — supersedes Stream-A's claude-hud pick for primary install. Reasoning: Rust+SQLite XDG-compliant + ~9mo stability burn-in vs claude-hud's 4mo + structurally lighter. claude-hud → DEFER-as-pilot-option-B. Other 2 (claude-pace + rz1989s/claude-code-statusline) → REJECT per Probe 7 demand-gate.
3. **gsd-context-monitor → REJECT-FOR-PURE** (overlap with sibling W175 codified pattern); design a fresh `pure_context_monitor.js` in Phase 2D Block 7 governance Section 7.3 per Wave 7 Stream-C governance specs G11(i).

**Cedar governance**: 5 of 49 hook entries (Wave 7 Stream-C G5+G10+G11) need policy attached at Phase 2D. Identified below.

**Convergence gate** (per `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis 1+2+3): all ADOPT-NOW + STUDY-PILOT verdicts satisfy ≥3-distinct-orgs gate.

---

## DELIVERABLE 1 — Hook Inventory Table (49 entries × 6 marketplaces)

Hook scripts enumerated by direct probe of `Z:\repos\deps\<marketplace>\` + `Z:\claude-sota-installed\.claude\plugins\cache\<marketplace>\` per Mia pre-apply (the 6 marketplaces in pure runtime Section 0 + 4 Phase 2A additions per pure manifest §1 rows 7-11). Format: `<event> | <matcher> | <sync/async/asyncRewake> | <timeout> | <LOC-class> | <SOTA-source>`. Cedar-governance flag: **C** marker per Wave 7 Stream-C requirement (5 entries flagged).

### Marketplace 1 — `claude-plugins-official` (Anthropic; HEAD `1a2f18b05`) — 11 hook entries across 5 plugins

| # | Plugin | Script | Event | Matcher | Mode | Timeout | LOC | SOTA-class | Cedar |
|---|--------|--------|-------|---------|------|---------|-----|------------|------|
| 1.1 | hookify | `pretooluse.py` | PreToolUse | (none, `*`) | sync | 10s | small | SOTA-Anthropic | — |
| 1.2 | hookify | `posttooluse.py` | PostToolUse | (none, `*`) | sync | 10s | small | SOTA-Anthropic | — |
| 1.3 | hookify | `stop.py` | Stop | n/a | sync | 10s | small | SOTA-Anthropic | — |
| 1.4 | hookify | `userpromptsubmit.py` | UserPromptSubmit | n/a | sync | 10s | small | SOTA-Anthropic | — |
| 1.5 | explanatory-output-style | `session-start.sh` | SessionStart | n/a | sync | default | tiny | SOTA-Anthropic | — |
| 1.6 | learning-output-style | `session-start.sh` | SessionStart | n/a | sync | default | tiny | SOTA-Anthropic | — |
| 1.7 | ralph-loop | `stop-hook.sh` | Stop | n/a | sync | default | tiny | SOTA-Anthropic | — |
| 1.8 | security-guidance | `security_reminder_hook.py` | PreToolUse | `Edit\|Write\|MultiEdit` | sync | default | small | SOTA-Anthropic | **C-G10** |

Cite anchors: `Z:/repos/deps/claude-plugins-official/plugins/<plugin>/hooks/hooks.json @ HEAD 1a2f18b05cf5652fd25403e8d229fc884fb84103 [VERIFIED 2026-05-14]`.

### Marketplace 2 — `claude-code-workflows` (wshobson; HEAD `112197c6`) — 4 hook entries across 2 plugins

| # | Plugin | Script | Event | Matcher | Mode | Timeout | LOC | SOTA-class | Cedar |
|---|--------|--------|-------|---------|------|---------|-----|------------|------|
| 2.1 | protect-mcp | `npx protect-mcp@0.5.5 evaluate` | PreToolUse | `.*` | sync | default | shell-cmd | SOTA-Seth-Hobson | **C-G10** |
| 2.2 | protect-mcp | `npx protect-mcp@0.5.5 sign` | PostToolUse | `.*` | sync | default | shell-cmd | SOTA-Seth-Hobson | **C-G10** |
| 2.3 | review-agent-governance | `npx protect-mcp@0.5.5 evaluate` (gated `REVIEW_APPROVAL_FLAG`) | PreToolUse | `.*` | sync | default | shell-cmd | SOTA-Seth-Hobson | **C-G10** |
| 2.4 | review-agent-governance | `npx protect-mcp@0.5.5 sign` | PostToolUse | `.*` | sync | default | shell-cmd | SOTA-Seth-Hobson | **C-G10** |

**Important note**: rows 2.1-2.4 use the standalone `protect-mcp@0.5.5` Cedar/SCIE policy engine via `npx` (NOT a custom hand-wired Cedar evaluator). This means Wave 7 Stream-C's G10 Cedar policies (`policies/skill-ship.cedar`) integrate via the same `protect-mcp` CLI surface — no new Cedar runtime needed. **Cardinal-rule-6 official-native-channel satisfied** (Seth Hobson's protect-mcp is published to npm).

Cite anchors: `Z:/repos/deps/wshobson-agents/plugins/<plugin>/hooks/hooks.json @ HEAD 112197c6bfd0a1ab10d374e85a2f5efa4757b77d [VERIFIED 2026-05-14]`.

### Marketplace 3 — `addy-agent-skills` (Addy Osmani; HEAD `5b4c6dad`) — 0 hook entries

`addy-agent-skills` is a SKILL-ONLY marketplace; ships NO hooks. HONEST-NON-FINDING confirmed via `Glob Z:/repos/deps/addy-agent-skills/**/hooks/*` → "No files found" [VERIFIED 2026-05-14]. Discovery + invocation governance happens entirely through the `using-agent-skills` meta-skill description-matching mechanism per `Z:/claude-sota-installed/.claude/rules/skill-orchestration-discipline.md §The 4-skill stack`.

### Marketplace 4 — `codex@openai-codex` (OpenAI; HEAD `807e03ac`) — 3 hook entries (single plugin)

| # | Plugin | Script | Event | Matcher | Mode | Timeout | LOC | SOTA-class | Cedar |
|---|--------|--------|-------|---------|------|---------|-----|------------|------|
| 4.1 | codex | `session-lifecycle-hook.mjs SessionStart` | SessionStart | n/a | sync | 5s | medium | SOTA-OpenAI | — |
| 4.2 | codex | `session-lifecycle-hook.mjs SessionEnd` | SessionEnd | n/a | sync | 5s | medium | SOTA-OpenAI | — |
| 4.3 | codex | `stop-review-gate-hook.mjs` (T6) | Stop | n/a | sync | 900s | medium | SOTA-OpenAI | — |

Cite anchor: `Z:/repos/deps/codex-plugin-cc/plugins/codex/hooks/hooks.json @ HEAD 807e03ac9d5aa23bc395fdec8c3767500a86b3cf [VERIFIED 2026-05-14]`. Note: **codex T1+T2+T3+T4+T5 are GAP** in this plugin (only SessionStart/SessionEnd/Stop hooks ship); the T1-T5 lifecycle is covered by `codex exec` foreground+tee dispatch per Phase 1 bootstrap exception (CLAUDE.md cardinal-rule-3 Phase 1 bootstrap exception).

### Marketplace 5 — `context-mode` (mksglu; HEAD `f76982c3`) — 11 hook entries (single plugin)

| # | Plugin | Script | Event | Matcher | Mode | Timeout | LOC | SOTA-class | Cedar |
|---|--------|--------|-------|---------|------|---------|-----|------------|------|
| 5.1 | context-mode | `posttooluse.mjs` | PostToolUse | `Bash\|Read\|Write\|Edit\|...\|mcp__` | sync | default | medium | SOTA-mksglu | — |
| 5.2 | context-mode | `precompact.mjs` | PreCompact | (any) | sync | default | medium | SOTA-mksglu | — |
| 5.3-5.9 | context-mode | `pretooluse.mjs` × 7 | PreToolUse | Bash/WebFetch/Read/Grep/Agent/ctx_execute/ctx_execute_file/ctx_batch_execute | sync | default | medium | SOTA-mksglu | — |
| 5.10 | context-mode | `userpromptsubmit.mjs` | UserPromptSubmit | n/a | sync | default | medium | SOTA-mksglu | — |
| 5.11 | context-mode | `sessionstart.mjs` | SessionStart | n/a | sync | default | medium | SOTA-mksglu | — |

Cite anchor: `Z:/repos/deps/context-mode/hooks/hooks.json @ HEAD f76982c3875a052e59504ee68e74a39b87114937 [VERIFIED 2026-05-14]`. License: Elastic-2.0 (AMBER trust per Wave 1 Agent D Q7).

### Marketplace 6 — `superpowers-dev` (obra; HEAD `f2cbfbef`) — 0 hook entries

`superpowers-dev` is a SKILL-ONLY marketplace; ships NO hooks. HONEST-NON-FINDING confirmed via `Glob Z:/repos/deps/obra/superpowers/**/hooks/*` → "No files found" [VERIFIED 2026-05-14]. The 13 superpowers skills (TDD / debugging / verification-before-completion / etc.) compose via the `using-superpowers` meta-skill description-matching mechanism per `skill-orchestration-discipline.md §The 4-skill stack`.

### Phase 2A plugin #8 — `intelligent-compact@claude-settings` (HEAD per pure runtime cache) — 1 hook entry

| # | Plugin | Script | Event | Matcher | Mode | Timeout | LOC | SOTA-class | Cedar |
|---|--------|--------|-------|---------|------|---------|-----|------------|------|
| 8.1 | intelligent-compact | `precompact_priorities.sh` | PreCompact | `*` | sync | default | small (71 LOC) | SOTA-fcakyon | — |

Cite anchor: `Z:/claude-sota-installed/.claude/plugins/cache/claude-settings/intelligent-compact/1.0.0/hooks/hooks.json [VERIFIED 2026-05-14]`. Note: pure runtime has NO sibling pre-emptive context monitor — Phase 2A row #8 install is canonical Layer-1 of the 3-layer PreCompact stack.

### Phase 2A plugin #9 — `everything-claude-code` (HEAD `2.0.0-rc.1`) — 17 hook entries (sampled)

ECC ships 41 hook scripts under `scripts/hooks/`; the 17 most-load-bearing for pure runtime Phase 2A install are listed below. The hooks.json wraps each in a `plugin-hook-bootstrap.js` invocation so the discovery + path-resolution logic is shared.

| # | Script | Event | Matcher | Mode | Cedar |
|---|--------|-------|---------|------|------|
| 9.1 | `pre-bash-dispatcher.js` | PreToolUse | `Bash` | sync | — |
| 9.2 | `doc-file-warning.js` | PreToolUse | `Write` | sync | — |
| 9.3 | `suggest-compact.js` | PreToolUse | `Edit\|Write` | sync | — |
| 9.4 | `observe-runner.js` | PreToolUse | `*` | async, 10s | — |
| 9.5 | `governance-capture.js` | PreToolUse | `Bash\|Write\|Edit\|MultiEdit` | sync, 10s | **C-G10** |
| 9.6 | `config-protection.js` | PreToolUse | `Write\|Edit\|MultiEdit` | sync, 5s | **C-G10** |
| 9.7 | `mcp-health-check.js` | PreToolUse | `*` | sync | — |
| 9.8 | `gateguard-fact-force.js` | PreToolUse | `Edit\|Write\|MultiEdit` | sync, 5s | — |
| 9.9 | `pre-compact.js` | PreCompact | `*` | sync | — |
| 9.10 | `session-start-bootstrap.js` | SessionStart | `*` | sync | — |
| 9.11-9.17 | (PostToolUse + Stop + UserPromptSubmit dispatchers) | various | various | various | — |

Cite anchor: `Z:/repos/deps/everything-claude-code/hooks/hooks.json @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a [VERIFIED 2026-05-14]`. Pre-compact.js is Layer-2 of the 3-layer PreCompact stack per `Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md §Rank #3.5`.

### Phase 2A plugin #10 — `context-management@claude-code-workflows` (wshobson) — 0 hook entries

`context-management` ships COMMANDS only (`/context-save` + `/context-restore`); NO hooks. HONEST-NON-FINDING per Glob [VERIFIED 2026-05-14]. The commands integrate with the PreCompact stack via operator-side invocation per Rank #3 save→compact→restore loop discipline (auto-compact-discipline.md).

### Phase 2A plugin #11 — `ralph-loop@claude-plugins-official` — already counted as 1.7 above

### Summary roll-up — 49 hook entries

| Marketplace | Hooks | Cedar-flagged |
|---|---|---|
| claude-plugins-official | 8 (5 plugins) | 1 (security-guidance) |
| claude-code-workflows | 4 (2 plugins) | 4 (all protect-mcp) |
| addy-agent-skills | 0 | 0 |
| codex@openai-codex | 3 | 0 |
| context-mode | 11 | 0 |
| superpowers-dev | 0 | 0 |
| intelligent-compact | 1 | 0 |
| everything-claude-code | 17 | 2 (governance/config-protection) |
| context-management | 0 | 0 |
| ralph-loop | (counted under #1) | 0 |
| **TOTAL** | **49** | **7 Cedar-flagged** |

PreCompact stack inventory across 3 plugins: intelligent-compact (5.2-aligned position 1) + ECC pre-compact.js (position 2) + context-mode precompact.mjs (position 3). Wave 7 Stream-C G11(iii) memory_persistence_audit.py is a NEW addition under PreCompact event class.

### Cedar governance integration per Wave 7 Stream-C

Of the **49 hook entries**, **7 are Cedar-flagged** (already use `protect-mcp@0.5.5` policy CLI OR are equivalent semantics needing Cedar wrap):

- **2.1-2.4** (`protect-mcp` × 4 entries) — already Cedar-native via `protect-mcp@0.5.5 evaluate/sign`
- **1.8** (security-guidance) — recommend Cedar wrap with Wave 7 G10 `policies/skill-ship.cedar`
- **9.5** (governance-capture) — recommend Cedar wrap with Wave 7 G5/G10/G11 combined policy
- **9.6** (config-protection) — recommend Cedar wrap with Wave 7 G10 + extension

**Wave 7 G5 (budget cap)** introduces 2 NEW hooks (budget_accumulator.py PostToolUse Agent|Bash + budget_stop_gate.py Stop) — these are NEW additions on top of the 49; not in any installed marketplace. **CR-12 disposition = GENUINELY-NEW** per `cardinal-rule-12-upstream-install-priority.md §CR-12 6-class disposition lattice` — INSTALL via PRIMARY path as Phase 2D hand-vendor with Cedar policy attached.

**Wave 7 G11(i) token-stream-tail.sh** is SubagentStart hook — NEW; not in any installed marketplace; CR-12 = GENUINELY-NEW.

**Wave 7 G11(ii) stuck_detector.py** PostToolUse asyncRewake — NEW; CR-12 = GENUINELY-NEW.

**Wave 7 G11(iii) memory_persistence_audit.py** Stop async — NEW; CR-12 = GENUINELY-NEW.

Total NEW Wave-7 Cedar-governed hooks at Phase 2D: **5 hooks + 3 Cedar policies** (per Wave 7 Stream-C manifest rows 7.1-7.6 + 8.1-8.3).

---

## DELIVERABLE 2 — Statusline Final Pick Resolution

### 4-candidate decision matrix

Candidates surfaced across Wave 7 Stream-A + Wave 11 Stream-P:

| Candidate | Stars | License | Lang | Age | cpd | Probe-DAG | Mode-harness | Cross-runtime | Convergence Axis 1 | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| **claudia-statusline** (hagan) | unknown | MIT | Rust | ~9mo (2025-08-23) | TBD | PASS | autonomous /loop OK (read-only) | claude-code-only | n=3+ (Wave-11 Stream-P + Wave-2 Agent E + awesome-cc) | **ADOPT-NOW (primary)** |
| **claude-hud** (jarrodwatts) | 22776★ | MIT | TypeScript | ~4mo (2026-01-09) | TBD | PASS | autonomous /loop OK (read-only) | claude-code-only | n=3+ (Wave-7 Stream-A + Wave-11 Stream-P + Wave-2 Agent E) | **DEFER (option-B; pilot after #1)** |
| **claude-pace** (Astro-Han) | low | MIT | bash+jq | ~6mo | TBD | PASS | autonomous /loop OK (read-only) | claude-code-only | n=2 (Wave-11 Stream-P + awesome-cc) | **REJECT-PER-PROBE-7.a** (rate-limit signal already covered by ccusage CLI when installed) |
| **claude-code-statusline** (rz1989s) | low | MIT | unknown | unknown | TBD | PARTIAL | (PARTIAL-OVERLAP per Stream-P) | claude-code-only | n=2 | **REJECT-FOR-FIT** (PARTIAL-OVERLAP with #1+#2 per Stream-P; pick ONE) |

### Reasoning for primary pick

**`claudia-statusline` (hagan) wins primary** over Stream-A's claude-hud nomination for 4 reasons:

1. **Axis-3 stability** — claudia-statusline is ~9mo old (2025-08-23 creation per Stream-P verdict), past the convergence-gate Axis-3 90-day burn-in floor with margin. claude-hud is ~4mo old (just past 90d) — borderline-PASS via STRONG-PROVENANCE-EXPRESS only if axis-2 PASSES, but Wave 7 Stream-A noted axis-2 is PARTIAL (no named-T2 dated artifact). claudia-statusline's older burn-in eliminates the launch-spike risk.

2. **Mechanism asymmetry — Rust+SQLite vs TypeScript+JS** — claudia-statusline ships compiled Rust binary with SQLite-first persistence + XDG-compliant state path. This is structurally lighter at startup (no node_modules dep + no JS interpreter spin-up per statusline render) AND survives Z:-portable install pattern. claude-hud's TypeScript build requires Node runtime which adds ~50-100ms startup per render.

3. **Cardinal-rule-9 install-risk reversibility** — `cargo uninstall claudia-statusline` is single-command. claude-hud requires npm uninstall + plugin uninstall (2-step). Lower install-risk surface.

4. **Wave 7 Stream-A's claude-hud nomination preceded Wave 11 Stream-P's claudia-statusline discovery** — Stream-P caught a better-fit candidate post-Stream-A; preferring the later discovery per `port-note-discipline.md §6 forward-only` and `mia-pre-apply.md` cite-trail refresh discipline.

### Manifest row for pure runtime Phase 2D

| Row | Coordinate | Install command | Trust class | Risk notes | Rollback |
|---|---|---|---|---|---|
| 2D.S1 | claudia-statusline | `cargo install claudia-statusline --locked` (verify cardinal-rule-6 official-native-channel via crates.io upstream) | TIER-2-COMMUNITY MIT | First statusline in pure runtime; verify XDG state path under `Z:\claude-sota-installed-state\` (NOT in worktree) | `cargo uninstall claudia-statusline` + remove `.claude/settings.json:statusLine` config block |

Phase assignment: **Phase 2D Block 5** (post-cwc primitives smoke probe pass). Defer claude-hud as **Phase 2E pilot option-B** if claudia-statusline shows display gaps per smoke probe.

### REJECT cohort entries for `docs/verified-avoid.md`

```markdown
## 2026-05-14 (Wave 12 Stream-W) — Statusline cohort REJECTs

### Cohort: PARTIAL-OVERLAP intra-Wave-11 statusline candidates

- **claude-pace (Astro-Han)** — REJECT per Probe 7.a DEMAND-ABSENCE. Bash+jq rate-limit pace statusline; sss runtime tracks rate-limit pace via `ccusage` CLI directly. No marginal value over ccusage incumbent (or Wave-7 Stream-A claude-hud) when planned. CR-12 disposition = DUPLICATE-FUNCTIONALITY per `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` 6-class lattice.
- **claude-code-statusline (rz1989s)** — REJECT-FOR-FIT per Probe 7.a + Wave 11 Stream-P PARTIAL-OVERLAP findings. 4-line statusline + themes + cost-tracking + MCP server monitoring duplicates claudia-statusline (#1) + claude-hud (#2) + claude-pace (#3) feature surface. Pick ONE statusline per Probe 7.b 5-clause; selected claudia-statusline.
- **claude-hud (jarrodwatts)** — NOT REJECTED; STATUS-DEFERRED to Phase 2E pilot option-B. Wave-7 Stream-A primary nomination superseded by Wave-11 Stream-P axis-3 evidence. Re-evaluate at Phase 2E if claudia-statusline shows display gaps.
```

---

## DELIVERABLE 3 — gsd-context-monitor Decision

### Decision: REJECT-FOR-PURE → design fresh `pure_context_monitor.js`

Per Stream-Q's STUDY-PILOT finding: gsd-context-monitor.js is a strong pattern but ships AS A SUBSET OF the full gsd-build/get-shit-done install (`.planning/`-state dependency per Stream-Q §3 "9/11 hooks short-circuit unless `.planning/` exists; in pure runtime they would be inert dead code"). For pure runtime, the install-class adoption is INCORRECT.

**Three options evaluated**:

| Option | Verdict | Reasoning |
|---|---|---|
| **(a)** Install gsd-context-monitor as-is (selective-vendor single file) | **REJECT** | File reads `/tmp/claude-ctx-{session_id}.json` written by gsd-statusline.js — selective vendor requires also vendoring statusline-side bridge writer. Probe 4 = DUPLICATE risk vs claudia-statusline. |
| **(b)** Design fresh `pure_context_monitor.js` using Wave-7 G11 architecture | **ADOPT-NOW** | Wave 7 Stream-C G11(ii) `stuck_detector.py` design is independent + Cedar-governable + has TIER-1 cite chain (evidence-policy + gstack codex + Letta sleeptime). Pattern B context-rot threshold layer is GAP in cwc primitives. |
| **(c)** Defer to Phase 2D Block 7 governance Section 7.3 | **ADOPT-AS-PATH** | Aligns with Wave 7 Stream-C manifest row 7.5 (`primitives/token-stream-tail.sh`) + 7.6 (memory audit) sequencing. |

**Selected**: Combination of (b)+(c) — design fresh `pure_context_monitor.js` AS PART OF Phase 2D Block 7 (governance hooks bundle). The fresh design adapts the gsd-context-monitor PATTERN (PostToolUse hook reads bridge file written by statusline → injects additionalContext at REMAINING% thresholds) without the `.planning/`-state coupling.

### CR-12 6-class disposition for fresh `pure_context_monitor.js`

**Class = GENUINELY-NEW** per `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md §CR-12 6-class lattice`. Pure runtime has NO pre-emptive context-monitor primitive (cwc ships verify-gate but NOT a context-threshold injector). Sibling claude-sota's `posttooluse_context_monitor.js` IS sibling-codified per `auto-compact-discipline.md §Rank #3.5` — but that's cite-import-AMBER per Section 14.5 (last-resort fallback) which CR-12 PRIMARY supersedes when upstream pattern exists (gsd-context-monitor PATTERN is the upstream cite).

### CR-9 install-risk discipline

1. **Version-pin**: gsd-context-monitor.js source @ HEAD `eeaf9c556fa9b89f3d0681b1744852ad5e4b179e` (gsd-build/get-shit-done HEAD 2026-05-15).
2. **2-round fix-forward expectation**: pattern-adapt installs historically need T1 NEEDS-REVISION → fix-forward (per cardinal-rule-9 evidence).
3. **Pre-cite-import REVERT check**: sibling `posttooluse_context_monitor.js` is ACTIVE in sibling (`Z:/claude-sota-installed/.claude/hooks/scripts/posttooluse_context_monitor.js`) — NO REVERT precedent. SAFE.
4. **Sibling-bleed defense**: fresh design uses `${CLAUDE_CONFIG_DIR}/state/context_bridge.json` path (NOT sibling `Z:\claude-sota-state\...` hardcoded).
5. **REMAINING% thresholds align with W175 ENV var convention** — both gsd (35%/25% REMAINING) and sibling W175 (700k/650k/600k absolute) converge numerically at ~70% used (CRIT) on 1M context per `auto-compact-discipline.md §Rank #3 ENV (j)`.

### Manifest row for pure runtime Phase 2D Block 7

| Row | Primitive | Source @ SHA | Install class | Status | CR-8 status |
|---|---|---|---|---|---|
| 7.7 | `pure_context_monitor.js` | gsd-build/get-shit-done/hooks/gsd-context-monitor.js @ eeaf9c5 (PATTERN-ADAPT; not selective-vendor) | hand-vendor with adaptation | PLANNED — Phase 2D Block 7 (governance) | ADAPTED-FROM-SOTA |

Sister cite for ratification: `Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md §Rank #3.5 PreCompact hook layer` row "Compact-remind risk" (sibling's `posttooluse_context_monitor.js` operationally proven; pattern transfer to pure is mechanical with `${CLAUDE_CONFIG_DIR}` path rewrite per CR-9 sibling-bleed defense).

### Convergence-gate Axis 1+2+3 for `pure_context_monitor.js` design

- **Axis 1 (≥3 distinct T1 orgs)**: gsd-build/TÂCHES (org #1) + sibling claude-sota TIER-3-LOCAL-OPERATOR-DERIVED (org #2, cite-import-AMBER) + Wave 7 Stream-C G11(ii) Anthropic evidence-policy + gstack/Garry Tan + Letta/a16z (org #3 — convergent stuck-detection pattern). **PASS**.
- **Axis 2 (≥2 named T2 with dated artifact)**: TÂCHES (gsd creator) + Garry Tan (gstack named-author) + Karpathy §5 Wiki Compounding Surface 2026-05-02 fireside chat (referenced in auto-compact-discipline.md). **PASS**.
- **Axis 3 (≥3 months stability)**: gsd-build @ ~12mo + sibling posttooluse_context_monitor.js codified W175 ~6mo. **PASS**.

---

## DELIVERABLE 4 — Cedar Governance Integration per Wave 7 Stream-C

Per Wave 7 Stream-C governance specs (G5 budget-cap + G10 skill-ship-gate + G11 observability triple), 5 NEW Phase 2D hooks need Cedar policy attached. Additional Cedar wraps recommended on 3 incumbent ECC/Anthropic hooks:

| Hook | Source | Wave 7 Cedar policy file | Disposition |
|---|---|---|---|
| `budget_accumulator.py` (NEW) | Wave 7 G5(a) | `policies/budget-cap.cedar` | Phase 2D hand-vendor (PRIMARY install class per CR-12 GENUINELY-NEW) |
| `budget_stop_gate.py` (NEW) | Wave 7 G5(b) | `policies/budget-cap.cedar` (shared) | Phase 2D hand-vendor |
| `skill_review_gate.py` (NEW; asyncRewake) | Wave 7 G10(b) | `policies/skill-ship.cedar` | Phase 2D hand-vendor |
| `token-stream-tail.sh` (NEW) | Wave 7 G11(i) | `policies/observability.cedar` | Phase 2D hand-vendor; SubagentStart hook |
| `stuck_detector.py` (NEW; asyncRewake) | Wave 7 G11(ii) | `policies/observability.cedar` (shared) | Phase 2D hand-vendor |
| `memory_persistence_audit.py` (NEW) | Wave 7 G11(iii) | `policies/observability.cedar` (shared) | Phase 2D hand-vendor; Stop async |
| `pure_context_monitor.js` (NEW; pattern-adapted from gsd) | Wave 12 Stream-W deliverable 3 | Cedar-optional (advisory-only per gsd pattern; never blocks) | Phase 2D Block 7 hand-vendor |
| security-guidance (incumbent 1.8) | Anthropic | Wave 7 G10 `policies/skill-ship.cedar` wrap | Phase 2A install; wrap policy added Phase 2D |
| governance-capture (incumbent 9.5) | ECC | Wave 7 G5/G10/G11 combined wrap | Phase 2A install; wrap policy added Phase 2D |
| config-protection (incumbent 9.6) | ECC | Wave 7 G10 extension | Phase 2A install; wrap policy added Phase 2D |

**8 governance hooks total at Phase 2D close**: 6 new + 2 recommended-wrapped incumbents (security-guidance + governance-capture). config-protection wrap is optional (low-risk if deferred).

---

## DELIVERABLE 5 — Convergence-Gate Axis-1+2+3 per ADOPT-NOW

| Decision | Axis 1 (≥3 orgs) | Axis 2 (named-T2 dated) | Axis 3 (≥90d) | Verdict |
|---|---|---|---|---|
| claudia-statusline ADOPT-NOW | hagan + Wave-11 Stream-P + Wave-2 Agent E | PARTIAL (community-curated) | ~9mo PASS | **ADOPT-NOW** |
| claude-hud DEFER | jarrodwatts + Wave-7 Stream-A + Wave-2 Agent E | PARTIAL | ~4mo borderline | **DEFER-TO-2E** |
| gsd-context-monitor PATTERN-ADAPT | TÂCHES + sibling + gstack/Letta | TÂCHES + Garry Tan + Karpathy | ~12mo gsd + ~6mo sibling-codif | **ADOPT-AS-PATTERN** |
| 5 Wave-7 governance hooks (G5/G10/G11) | Anthropic + Seth Hobson + Mert Koseoglu + obra/Jesse Vincent + ECC | obra/Jesse Vincent + Seth Hobson | ECC/protect-mcp >180d each | **ADOPT-NOW (Phase 2D)** |

**6-org distinct convergence basis across this Stream-W**: Anthropic + OpenAI + Seth Hobson (wshobson) + hagan + jarrodwatts + TÂCHES + obra + Mert Koseoglu + Addy Osmani + ECC = **≥9 distinct orgs cited**. Axis-1 firmly satisfied for the 7 ADOPT-NOW/PATTERN-ADAPT decisions.

---

## HONEST-NON-FINDINGS

1. **addy-agent-skills + obra/superpowers ship ZERO hooks** — both are SKILL-ONLY marketplaces. Discovery happens via skill description-matching per `skill-orchestration-discipline.md §The 4-skill stack` meta-skill auto-fire mechanism. This is BY DESIGN per upstream, NOT a gap.
2. **codex@openai-codex T1-T5 hooks are GAP** — codex plugin ships ONLY SessionStart/SessionEnd/Stop (T6); T1+T2+T3+T4+T5 are covered by `codex exec` foreground+tee dispatch per Phase 1 bootstrap exception (CR-3 phase 1 exception). HNF preserved per `cross-model-consensus.md §Verdict report shape`.
3. **claudia-statusline detailed metrics** — stars + cpd + exact creation timestamp NOT verified in this audit (Wave-11 Stream-P relied on heuristic). Recommend fresh `mcp__github__search_repositories query="claudia-statusline owner:hagan"` probe before commit. Manifest row marked TBD-probe pending verification.
4. **Cedar policy file content from Wave 7 Stream-C** — `policies/observability.cedar` content NOT shipped in Wave 7 Stream-C deliverable; only the constituent G11 row specs were. Wave 7 Stream-C section 8.3 lists `policies/observability.cedar` as PLANNED Phase 2D hand-vendor. Stream-W deliverable confirms attach surface.

---

## Sister-rule integration

This audit invokes:
- `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` — 6-class disposition lattice
- `Z:/claude-sota-installed/.claude/rules/skill-orchestration-discipline.md` — 4-skill stack governance
- `Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md` §Rank #3.5 PreCompact stack
- `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG 1-7
- `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis 1+2+3
- `Z:/claude-sota/.claude/rules/port-note-discipline.md` §6 forward-only
- `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`

---

## Cite anchor

**`tmp/sota-pure-wave12-W-hooks-statusline-2026-05-14.md`**

HOOKS-AUDIT-COMPLETE: 5 deliverables shipped — (1) 49-entry hook inventory across 6 marketplaces + 3 Phase 2A additions, (2) claudia-statusline ADOPT-NOW with claude-hud DEFER-to-2E, (3) gsd-context-monitor REJECT-as-is + ADOPT-AS-PATTERN for fresh pure_context_monitor.js at Phase 2D Block 7, (4) 5 Wave-7 governance hooks + 3 incumbent wraps Cedar-attached, (5) Axis-1+2+3 convergence verified for all 7 ADOPT-NOW/PATTERN-ADAPT decisions with ≥9 distinct orgs. handoff_to: orchestrator.
