---
title: Wave 220 R10 — Team-lead decomposition of Phase 1 MVP install for Z:\claude-sota-pure
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 220
fire: round-10-team-lead-decomposition
artifact-class: parallel-workstream-decomposition
cross-model-gate: NOT-STRUCTURALLY-SATISFIED (orchestrator-side Sonnet synthesis; operator MUST file Path P codex T1 ratification BEFORE INSTALL execution)
---

# Wave 220 R10 — Team-lead decomposition

## Section 1 — Executive summary

The Phase 1 MVP 9-plugin install decomposes into **6 parallel workstreams with strict file ownership boundaries**. WS-1 bootstrap = foundation gate; WS-2/WS-3/WS-4 run in true parallel (~2.25× throughput); WS-5 provenance gate serializes after install; WS-6 cross-model gate smoke verification. **APPROVE-DECOMPOSITION conf=0.89**.

## Section 2 — 6 workstreams

### WS-1 — BOOTSTRAP (serial; ~30min; foundation gate)

**Owner**: orchestrator-direct
**Files**: CLAUDE.md / CLAUDE.local.md / tools/eee.ps1 / bin/eee.cmd / bin/install-path.ps1 / .claude/settings.json (minimum baseline) / .mcp.json (empty skeleton) / .gitignore / README.md / docs/ (mkdir) / .claude/state/ (mkdir)
**DONE WHEN**: 9 bootstrap files exist + `git status` clean + path-rewrite from claude-sota-installed verified (`grep "claude-sota-installed"` returns 0) + eee.ps1 --help works + Z:\claude-sota-pure-state\ created
**Handoff**: `feat(bootstrap): Phase 0 minimum baseline` commit → start gate for WS-2/3/4 fan-out

### WS-2 — PLUGIN MARKETPLACES (parallel; ~20min)

**Owner**: orchestrator-spawned subagent OR operator-direct
**Files (exclusive)**: `.claude/marketplaces/*.json` + `.claude/plugins/marketplaces/<m>/` (gitignored) + `.claude/settings.json plugins:` block ONLY
**Plugins (MVP=3 per R9 §12)**:
1. `anthropics/claude-plugins-official` marketplace
2. `codex@openai-codex` (E1 cross-model gate; via `npm install -g @openai/codex@<PINNED>` + plugin install)
3. `intelligent-compact@claude-settings` (D3 PreCompact stack)
**DXT discipline (R8 SEC P0-SEC-7-A/B applied)**: only Anthropic-canonical .dxt; operator reviews manifest.json before any .dxt install
**DONE WHEN**: 3 marketplace JSON files + codex hook scripts at `.claude/plugins/marketplaces/openai-codex/plugins/codex/scripts/codex_*.py` (R8 Amendment #5 corrected path) + intelligent-compact cached
**Handoff**: `feat(plugins): install 3 MVP marketplaces` commit

### WS-3 — MCP SERVER REGISTRATIONS (parallel; ~15min)

**Owner**: orchestrator-spawned subagent
**Files (exclusive)**: `.mcp.json` (sole writer)
**MCPs (MVP=5 per R9 §12)**:
```json
{"mcpServers":{
  "github": {"command":"npx","args":["-y","@modelcontextprotocol/server-github@<PINNED>"],"env":{"GITHUB_PERSONAL_ACCESS_TOKEN":"${env:GITHUB_PERSONAL_ACCESS_TOKEN}"}},
  "deepwiki": {"url":"https://mcp.deepwiki.com/mcp"},
  "context7": {"command":"npx","args":["-y","@upstash/context7-mcp@<PINNED>"]},
  "serena": {"command":"uvx","args":["--from","git+https://github.com/oraios/serena.git@<PINNED-COMMIT>","serena-mcp-server"]},
  "repomix": {"command":"npx","args":["-y","repomix@<PINNED>"]}
}}
```
**DEFERRED to Phase 2 Enhancement (NOT in MVP)**: graphiti (depends on CLIProxyAPI per R8 ARCH-1.a + FalkorDB Docker per ARCH-1.b — out of MVP scope), exa / firecrawl / perplexity
**DONE WHEN**: 5 server entries + all `@latest` replaced with explicit pins (CR-9) + GITHUB_PERSONAL_ACCESS_TOKEN env var set User-scope (NOT inline)
**Handoff**: `feat(mcp): register 5 MVP MCP servers` commit

### WS-4 — CWC NATIVE INSTALL (parallel; ~10min)

**Owner**: orchestrator-spawned subagent OR operator-direct
**Files (exclusive)**: `.local/cwc/` + `docs/install-provenance.md` (WS-4 owns ONLY cwc-rows section; WS-5 owns header+plugin+MCP rows — section-ownership conflict avoidance)
**Install**:
```powershell
gh repo clone anthropics/cwc-long-running-agents Z:/claude-sota-pure/.local/cwc -- --depth 1
git -C Z:/claude-sota-pure/.local/cwc rev-parse HEAD              # commit-SHA
git -C Z:/claude-sota-pure/.local/cwc rev-parse HEAD:track-read.sh # blob-SHA per primitive
# Repeat for verify-gate.sh + kill-switch.sh + steer.sh + commit-on-stop.sh
```
**[FRESH-PAINT-≤30d marker]** per R8 convergence-audit Section 4 (cwc age=9.4d as of 2026-05-15)
**DONE WHEN**: 5 primitives + 3 reference plugins (ralph-loop + agent-sdk-dev + frontend-design) + commit-SHA + per-file blob-SHAs recorded
**Handoff**: `feat(cwc): native install (5 primitives + 3 reference plugins)` commit

### WS-5 — PROVENANCE + MANIFEST + PINS (serial; ~15min; depends on WS-2+3+4)

**Owner**: orchestrator-direct
**Files**: PINS.json + docs/install-provenance.md (header + assembly) + docs/sota-installed-manifest.md (§0 CR-8 + §1 baseline + §2 plugins + §3 MCPs + §17 cwc + §18.1 CR-7 phase predicates)
**DONE WHEN**: PINS schema-valid + every `@latest` replaced with explicit pin OR `@latest-acknowledged-D6-risk` marker (CR-9 P1-SEC-5) + manifest §0 CR-8 column populated + §18.1 CR-7 Phase 1→Phase 2 transition predicates documented
**Handoff**: `chore(provenance): MVP install log + PINS + INSTALLED flips` commit

### WS-6 — SMOKE VERIFICATION + CROSS-MODEL GATE (serial; ~30min; depends on WS-5; NO SUBAGENT)

**Owner**: orchestrator-direct + operator-witness (per FM-17.e CC-runtime mitigation — NO subagent fan-out)
**Files**: `.claude/state/codex_consult_w220_r10_mvp_smoke_test*.txt` + `tmp/wave220-r10-mvp-smoke-evidence-2026-05-15.md`
**Smoke probes**:
1. `cd Z:/claude-sota-pure; .\tools\eee.ps1` (launch in new runtime)
2. `/plugin list` → 3 plugins present
3. `/mcp` → 5 servers connected
4. Edit any design-surface file → T1 hook fires → `.claude/state/codex_consult_*_OUT.txt`
5. `git commit -m smoke` → T3 hook fires → `.claude/state/codex_review_HEAD_<sha>.txt`
6. Session end → T6 hook fires → `.claude/state/codex_stop_review_gate.jsonl`
**DONE WHEN (MVP EXIT GATE per R8 ARCH-6.a)**:
- 5 MCPs respond
- T1 + T3 + T6 hooks fire live
- Cross-model gate SATISFIED in manifest §18.1 (LIVE-RUNTIME-ACTIVE-PROVEN ✅)
- Smoke evidence documented
**Handoff (FINAL)**: `feat(smoke): MVP cross-model gate VERIFIED + T1/T3/T6 hooks LIVE` commit. MVP CAPABILITY COMPLETE.

## Section 3 — Integration sequence (visual)

```
WS-1 BOOTSTRAP (serial 30min)
       ↓
   [HANDOFF: bootstrap commit]
       ↓
   ┌───┴───────┬───────┐
   ▼           ▼       ▼
 WS-2       WS-3    WS-4    (parallel 10-20min)
 plugins    MCPs    cwc
   │           │       │
   └───┬───────┴───────┘
       ↓
   [HANDOFF: 3 parallel commits]
       ↓
WS-5 PROVENANCE (serial 15min)
       ↓
   [HANDOFF: provenance commit]
       ↓
WS-6 SMOKE+T1 GATE (serial 30min; NO subagent)
       ↓
   MVP EXIT GATE → Phase 2 Enhancement OR halt
```

**Total wall-clock**: ~2 hours (parallel fan-out advantage 2.25× over serial)

## Section 4 — Risk register

| WS | FM | Mitigation |
|---|---|---|
| WS-1 | FM-20 sibling-bleed | path-rewrite ALL `claude-sota-installed` → `claude-sota-pure` |
| WS-2 | FM-03 D5 auth + DXT P0-SEC-7 | Verify auth pre-install; restrict to anthropic-org .dxt; manifest review |
| WS-3 | FM-03 D1 transport + CR-9 @latest | per-MCP smoke probe; explicit version pins |
| WS-4 | UNCODIFIED-P1 partial-install | per-file blob-SHA verify all 5 primitives |
| WS-5 | FM-02 staging-race | Single-shell `git add && git commit --only -- <path> -F` chain |
| WS-6 | FM-17.e autocompact-thrash + R8 ARCH-1.e false-neg | NO subagent; R8 Amendment #5 corrected verification path |

## Section 5 — 4 R8 P0 BLOCKERS — MVP scope decisions

| P0 BLOCKER | MVP decision |
|---|---|
| ARCH-1.a graphiti depends on CLIProxyAPI | **DEFERRED** — graphiti NOT in MVP (Phase 2) |
| ARCH-1.b FalkorDB Docker missing | **DEFERRED** — same scope |
| ARCH-6.a MVP boundary | **CLOSED** — this decomposition IS the codification |
| ARCH-1.e codex hook verify path | **CLOSED** — Amendment #5 applied: `.claude/plugins/marketplaces/openai-codex/plugins/codex/scripts/codex_*.py` |
| SEC-4-A CLIProxyAPI atomic-write | **DEFERRED** — CLIProxyAPI not in MVP |
| SEC-4-B Langfuse secrets | **DEFERRED** — Langfuse not in MVP (Phase 3) |
| SEC-7-A DXT canonical-source | **APPLIED** in WS-2 |
| SEC-7-B DXT manifest review | **APPLIED** in WS-2 |

## Section 6 — Pre-INSTALL Path P codex T1 ratification

Operator MUST run BEFORE executing WS-1:
```bash
timeout 300 codex exec --skip-git-repo-check --color never \
  < .claude/state/codex_consult_w220_r10_team_lead_decomposition_ratification.txt \
  2>&1 | tee .claude/state/codex_consult_w220_r10_team_lead_decomposition_ratification_OUT.txt
```
Verdict-handling per `codex-t1-fix-forward-pattern.md §Pattern A`: APPROVE → execute WS-1; NEEDS-REVISION conf≥0.85 → Pattern A apply then re-ratify; REJECT → STOP escalate.

## Section 7 — Final verdict

**APPROVE-DECOMPOSITION conf=0.89** (Pattern A sweet spot 0.88-0.93)

- ✅ 6 workstreams with strict no-overlapping file ownership
- ✅ Testable DONE WHEN predicates per CR-9
- ✅ Integration sequence honors WS-1 foundation + parallel fan-out + serial provenance + smoke gate
- ✅ All R8 architect P0+P1 findings remediated or explicitly DEFERRED per MVP scope
- ✅ All R8 security 4 P0 BLOCKERS handled (3 DEFERRED + DXT 2 APPLIED)
- ✅ Single-level fork invariant honored
- ✅ FM-17.e mitigation: WS-6 orchestrator-direct
- ✅ Cross-model gate satisfied at WS-6 milestone + pre-INSTALL Path P ratification mandate

**Conf=0.89 (not 0.92+)** because:
- (-0.05) Pre-INSTALL Path P codex T1 NOT YET FIRED
- (-0.03) Per-file blob-SHAs deferred to INSTALL time
- (-0.03) WS-3 MCP version pins TBD at INSTALL time per CR-6 fresh-from-github

VERDICT-DECOMPOSITION-COMPLETE.
