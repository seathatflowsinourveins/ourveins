# SOTA-Pure Wave 1-5 Final Synthesis — Z:\claude-sota-pure\ Build Plan

Date: 2026-05-14
Inputs: 11 Wave reports (A research, B codex BRIDGE-MODE, C architect reconciled, D adversarial BRIDGE-MODE, E extension, F context engineering, G CLI tools, H awesome-lists, J Top-3 verify, K Anthropic OFFICIAL, wave1-close-synthesis) + sibling `auto-compact-discipline.md`.

Verdict shape: **PROCEED with corrected Phase 0 → 1 → 2A → 2B-1..2B-5 → 3** after D's 20 prescribed edits applied.

---

## 1. Headline verdicts per agent

| Wave | Agent | Verdict | Confidence | Key contribution |
|---|---|---|---|---|
| 1 | A sota-researcher | DONE_WITH_CONCERNS | n/a | Top-5 additions (context-mode/agent-teams/comprehensive-review/ralph-loop/MCP-baseline); 8 promotion conditions; 8 residual risks |
| 1 | B codex BRIDGE-MODE | DONE | n/a | 256 findings; "starter four = clean upstream seed, NOT complete runtime" (finding #244); 10-axis coverage gap map |
| 1 | C architect (reconciled) | RECONCILED Option A + Option B | n/a | Phase 0-3 build plan; Option A stays production, Option B parallel-evaluation |
| 2 | D gpt5-reviewer BRIDGE-MODE | **NEEDS-REVISION** | **0.91** | 20 prescribed edits — corrects marketplace identity confusion + repo-root marketplace.json assumption + T1-T7 overclaiming + auto-compact overclaiming |
| 2 | E sota-researcher | DONE_WITH_CONCERNS | n/a | 11 candidates; 5 HNF; full table locked in transcript |
| 2 | F context-manager | ACCEPT | n/a | **1.96% projected preload** on 1M (target ≤5%); 5 smoke probes; PCT_OVERRIDE 50→70 nudge |
| 3 | G general-purpose | DONE | n/a | 10 SOTA CLI installs (winget-preferred); 5-tier launcher pre-flight gate |
| 3 | H general-purpose | DONE | n/a | Top-5 NEW candidates (later all REJECTED by J) |
| 4 | J general-purpose | **VERIFIED-REJECT (all 3)** | n/a | financial-services=DEMAND-ABSENCE; VoltAgent-subagents=DUPLICATE; claude-task-master=LICENSE BLOCKER |
| 5 | K general-purpose | **ADOPT-NOW (10 primitives)** | n/a | Anthropic-OFFICIAL gaps; Phase 2B-1..2B-5 install plan |

---

## 2. Critical corrections from Agent D (P0 + P1)

### P0-1: `claude-code-workflows` is a MARKETPLACE NAME, not independent GitHub repo
- Verified: marketplace name declared in `wshobson/agents/.claude-plugin/marketplace.json`
- Action: replace all "claude-code-workflows" repo-references with "the marketplace name registered from `wshobson/agents`"

### P0-2: Marketplace manifests live at `.claude-plugin/marketplace.json` (NOT repo root)
- Verified: NONE of 7 reviewed repos has `marketplace.json` at root
- Action: correct install commands + smoke probe Step 5 path

### P0-3: `codex@openai-codex` auto-wires ONLY SessionStart/SessionEnd/Stop (T6 partial)
- Verified: `plugins/codex/hooks/hooks.json @ 807e03ac` declares these 3 events; T1-T5 NOT auto-wired
- Action: document T1-T5 as GAPs (operator decision: accept-gap OR install upstream plugin OR command-driven workflow via `/codex:review` + `/codex:adversarial-review` + `/codex:rescue`)

### P1-1: Auto-compact = env vars + continuity plugins, NOT quality-aware
- Verified: NO upstream plugin ships proactive quality-aware compaction
- Action: language must say "documented threshold env var + continuity plugin set"; do NOT claim "SOTA proactive compaction"

### P1-2: `mksglu/context-mode` is Elastic-2.0 + young/high-churn AMBER + no named-T2 endorsement
- Verified: license non-permissive; cpd ~15.6/day over 75d; named-T2 endorsement [UNKNOWN]
- Action: install-class with guardrails (HEAD-pin + license acceptance + smoke + rollback)

---

## 3. Final marketplace + plugin install list (CORRECTED per D's 20 edits)

### 3.1 Marketplace registrations (Phase 1 — 6 marketplaces)

| # | Owner/Repo | Marketplace name (per `.claude-plugin/marketplace.json`) | HEAD SHA (verified) | License | Trust tier |
|---|---|---|---|---|---|
| 1 | `anthropics/claude-plugins-official` | `claude-plugins-official` | `1a2f18b0` | per-plugin | TIER-1-DIRECT |
| 2 | `wshobson/agents` | `claude-code-workflows` | `112197c6` | MIT root | TIER-1-NAMED-AUTHOR |
| 3 | `addyosmani/agent-skills` | `addy-agent-skills` | `5b4c6dad` | MIT root | TIER-1-NAMED-AUTHOR |
| 4 | `openai/codex-plugin-cc` | per `.claude-plugin/marketplace.json` | `807e03ac` | Apache-2.0 | TIER-1-DIRECT |
| 5 | `mksglu/context-mode` | per `.claude-plugin/marketplace.json` | `f76982c3` | Elastic-2.0 | TIER-2 (AMBER trust, guardrails) |
| 6 | `obra/superpowers` | `superpowers-dev` (NOT `superpowers` — coordinate verification required) | `f2cbfbef` | MIT root | TIER-1-NAMED-AUTHOR |

### 3.2 Plugin installs (Phase 2A — 7 plugins, ordered)

| # | Install coordinate | Marketplace repo | Plugin JSON cite | Smoke status |
|---|---|---|---|---|
| 1 | `superpowers@superpowers-dev` (or `@superpowers` if alias works) | obra/superpowers | `.claude-plugin/plugin.json` | TBD |
| 2 | `codex@openai-codex@1.0.4` | openai/codex-plugin-cc | `plugins/codex/.claude-plugin/plugin.json` (name=codex, v=1.0.4) | TBD |
| 3 | `agent-skills@addy-agent-skills` | addyosmani/agent-skills | `.claude-plugin/plugin.json` | TBD |
| 4 | `skill-creator@claude-plugins-official` | anthropics/claude-plugins-official | per marketplace.json | TBD |
| 5 | `agent-teams@claude-code-workflows` | wshobson/agents (marketplace `claude-code-workflows`) | `plugins/agent-teams/.claude-plugin/plugin.json` | TBD |
| 6 | `comprehensive-review@claude-code-workflows` | wshobson/agents (marketplace `claude-code-workflows`) | `plugins/comprehensive-review/.claude-plugin/plugin.json` | TBD |
| 7 | `context-mode@context-mode` | mksglu/context-mode | `.claude-plugin/plugin.json` (name=context-mode, v=1.0.111) — Elastic-2.0 AMBER guardrails | TBD |

### 3.3 Auto-compact stack — plugins (Phase 2A continuation, 4 plugins)

Per sibling `auto-compact-discipline.md` Rank #3.5 4-layer stack — all are PLUGIN-INSTALLED (no hand-coded hooks needed):

| # | Plugin | Source | Role | Cite |
|---|---|---|---|---|
| 8 | `intelligent-compact@claude-settings` | (TBD — claude-settings marketplace owner) | PreCompact 6-section priority injection | `intelligent-compact/1.0.0/hooks/scripts/precompact_priorities.sh:1-71` |
| 9 | `everything-claude-code@everything-claude-code` (ECC pre-compact + suggest-compact) | affaan-m/everything-claude-code | PreCompact state-save audit + PreToolUse threshold suggestion | `2.0.0-rc.1/scripts/hooks/pre-compact.js:24-31,41-47` + `suggest-compact.js:30-33,69-70` |
| 10 | `context-mode` (already in 2A row 7) | mksglu/context-mode | PreCompact session-event SQLite ≤2KB XML resume-snapshot | `1.0.111/hooks/precompact.mjs:1-76` |
| 11 | `context-management@claude-code-workflows` | wshobson/agents | `/context-save` + `/context-restore` operator commands for Rank #3 PERSIST + RESTORE | `1.2.0/commands/context-save.md + context-restore.md @ ece811f2` (MIT, Seth Hobson) |

**Total Phase 2A: 11 plugins installs.**

### 3.4 Phase 2B-1: Anthropic-OFFICIAL long-running primitives (cwc 5 + evaluator subagent)

Per Agent K verdict — install via plugin marketplace (NOT cp from `Z:/repos/deps/`):

```
/plugin marketplace add anthropics/claude-plugins-official    # already in 3.1 row 1
# cwc primitives ship in plugins-official marketplace:
/plugin install agent-sdk-dev@claude-plugins-official         # Anthropic-OFFICIAL SDK scaffolding plugin
/plugin install ralph-loop@claude-plugins-official            # Anthropic-OFFICIAL unattended-loop primitive
/plugin install frontend-design@claude-plugins-official       # Anthropic-OFFICIAL rubric-evaluator + Playwright
```

**OR** if cwc primitives are NOT shipped as plugin and require direct `.claude-plugin` install: use cwc clone at `Z:/repos/deps/cwc-long-running-agents @ ffd563d6` (Apache-2.0 license permits direct copy) → install as a local plugin per `.claude/plugins/cwc-long-running-agents/` with same 5-hook + 1-agent + PROGRESS.md scaffold.

**Operator decision required**: are cwc primitives plugin-shipped OR require direct-clone install? Probe via `/plugin search cwc` post-Phase-1 marketplace registration.

### 3.5 MCP installs (Phase 3 — 5 servers, ordered)

| # | MCP | Source | Install command | License |
|---|---|---|---|---|
| 1 | doobidoo/mcp-memory-service | `https://github.com/doobidoo/mcp-memory-service` | `pip install git+https://github.com/doobidoo/mcp-memory-service.git` | Apache-2.0 |
| 2 | context7 | `https://github.com/upstash/context7` | hosted endpoint `https://mcp.context7.com/mcp` | MIT |
| 3 | github (Anthropic OFFICIAL MCP) | `@modelcontextprotocol/server-github` | `npm install -g @modelcontextprotocol/server-github` | MIT |
| 4 | deepwiki | Devin AI hosted | `https://mcp.deepwiki.com/mcp` | (hosted) |
| 5 | repomix | `https://github.com/yamadashy/repomix` | `npm install -g repomix` | MIT |

**Optional Phase 3+ MCPs** (defer until first investigation needs them per CR-10): graphiti (FalkorDB temporal-KG) / gitnexus / serena / playwright / firecrawl / exa / perplexity.

---

## 4. Bootstrap files (10 files, per Agent C unchanged)

Per Agent F's 1.96% preload projection — bootstrap size IS achievable. C's design (CLAUDE.md ≤50 LOC pointer-only + 9 other bootstrap files) requires NO modification post-D adversarial review.

Critical bootstrap content corrections per D edits #1-#20:
- CLAUDE.md L43-46 cite text: change `T1-T7` to `Stop review + commands; T1-T5 documented as GAP`
- CLAUDE.local.md env block (h): keep PCT_OVERRIDE commented (per Agent F PCT 50→70 nudge AND D edit #9 "operator-selected threshold not SOTA-canonical")
- docs/sota-installed-manifest.md schema: add columns per D edit #14 (primitive / type / owner / repo / HEAD / version / license / trust class / install class / risk notes / rollback)
- docs/install-provenance.md: per D edit #20 add promotion blocker (UNVERIFIED coordinate = block)
- New file: `docs/operator-runbook-long-running.md` per K Phase 2B-1 Step 8 (cwc 4-line `watch` pattern + AGENT_STOP / STEER.md interventions)
- New file: `PROGRESS.md` template (4 sections: Done / In progress / Next / Notes) per K Phase 2B-1 Step 5

---

## 5. Claim freeze per D edit #19

Until smoke probes pass, Option B MUST be called:
- ✅ "upstream-sourced evaluation runtime"
- ❌ NOT "fully official and SOTA absolute"
- ❌ NOT "complete runtime"
- ❌ NOT "production-ready"

Promotion to production replaces Option A only when ALL 5 conditions hold:
1. 14 smoke probes (D Q10 audit) pass with deterministic PASS criteria
2. All plugin coordinates verified (no UNVERIFIED entries)
3. T1-T5 GAP either filled by upstream plugin OR documented as accepted gap
4. Auto-compact discipline: 4-plugin stack installed + Rank #3 operator-runbook documented (NOT promised quality-aware)
5. Operator-runbook for cwc 5 primitives + AGENT_STOP / STEER.md / PROGRESS.md scaffolded

---

## 6. Honest gaps (per D + K HNF aggregation)

| Gap class | Description | Disposition |
|---|---|---|
| T1 pre-edit consult hook | No Anthropic-OFFICIAL plugin auto-wires PreToolUse:Edit T1 gate | ACCEPT-AS-GAP or command-driven via `/codex:review` |
| T2 commit-time hook | No upstream auto-wire | ACCEPT-AS-GAP or hand-author would violate CR-5 |
| T3 post-commit hook | No upstream auto-wire | ACCEPT-AS-GAP |
| T4 pre-push hook | No upstream auto-wire | ACCEPT-AS-GAP |
| T5 plan-stage hook | No upstream auto-wire | ACCEPT-AS-GAP |
| Proactive quality-aware compaction | No upstream plugin proves this | ACCEPT-AS-GAP; use env threshold + continuity plugins as partial mitigation |
| context-mode named-T2 endorsement | Not verified | LOWER trust; install with guardrails |
| `superpowers@superpowers` marketplace name | Local marketplace name is `superpowers-dev` | Coordinate verification required pre-install |
| Punkpeye awesome-mcp-servers full audit | Deferred (722k char README) | Wave 6 candidate |
| `anthropics/skills` repo (17 community skills) | Not audited | Wave 6 candidate |
| `claude-agent-sdk-python/examples/` (17 SDK examples) | Not audited | Wave 6 candidate |
| `/ultrareview` install recipe | Not documented in CHANGELOG | Wave 6 candidate |

---

## 7. Recommended next action

### Option (a) Execute Phase 0 build now
Write the 10 bootstrap files to `Z:\claude-sota-pure\` per Section 4 (corrected per D edits). Then operator manually runs Phase 1 (`/plugin marketplace add`) since marketplace registration requires interactive `claude` session in the NEW runtime, not orchestrator's session.

### Option (b) Launch Wave 6 to close HNF gaps
3 parallel agents:
- `anthropics/skills` deep-audit (17 community skills)
- `claude-agent-sdk-python/examples/` deep-audit (17 SDK patterns)
- punkpeye/awesome-mcp-servers categorical audit (per-category fetches to avoid 722k char limit)

### Option (c) Hybrid — start Phase 0 build + dispatch Wave 6 in parallel
Phase 0 build can complete in this session (Write the 10 bootstrap files); Wave 6 fills HNF gaps in parallel; Wave 6 output informs Phase 2B-2 plugin selection.

**Recommendation**: Option (c) — concurrent build + research. Phase 0 is bootstrap-only (10 files, no plugin install yet); Wave 6 research runs independently. Once both complete, operator approves Phase 1 marketplace registration command sequence.

---

## 8. References

All 11 Wave outputs persisted to `Z:\claude-sota-installed\tmp\`:
- `sota-pure-research-A-report-2026-05-14.md` (22.5K)
- `sota-pure-codex-B-2026-05-14.md` (64.4K)
- `sota-pure-design-C-2026-05-14.md` (11.3K — reconciled)
- `sota-pure-review-D-2026-05-14.md` (29.8K — adversarial BRIDGE-MODE)
- `sota-pure-extension-E-2026-05-14.md` (26.3K)
- `sota-pure-context-F-2026-05-14.md` (29.3K)
- `sota-pure-cli-tools-G-2026-05-14.md` (21.6K)
- `sota-pure-awesome-lists-H-2026-05-14.md` (19.5K)
- `sota-pure-top3-verify-J-2026-05-14.md` (19.6K)
- `sota-pure-anthropic-official-K-2026-05-14.md` (29.5K)
- `sota-pure-wave1-close-synthesis-2026-05-14.md` (16.4K — bonus)
- Plus sibling `auto-compact-discipline.md` cited for Rank #3.5 plugin-stack mapping

Total research material: ~290K markdown across 12 files. Convergence-verified across Sonnet + real GPT-5.5 BRIDGE-MODE + Anthropic-OFFICIAL primary sources + 7 awesome-lists.
