
---

## 2026-05-10 — Wave 138 Fire 4 — governance trio install pre-flight verification — REVISED-INSTALL-DEFERRED-TO-FIRE-5 close-synthesis

**Atomic chain extension**: `e7666de → 96248cd → 55204a2 → e785fc5 → f0c2ca2 → e087cbc → <Wave 138 Fire 4 SHA>` (5 parallel-session w134-f8 + checkpoint + w134-f9/f10/f11 commits absorbed since Wave 138 Fire 3 per FM-02 sub-class (c) commit-layer absorption discipline; accept absorption, do NOT rewrite history per `port-note-discipline.md §6` anti-pattern)

**Trigger**: task #136 — Wave 138 Fire 4 candidate governance trio install (protect-mcp + signed-audit-trails) per CR-6 official-native-channel + CR-12 upstream-install-priority. 7 pre-install gates per Voice 2+3 Wave 138 Fire 3 convergent findings: (a) v0.5.5→v0.6.0 / (b) FSL-1.1-MIT verify / (c) Cedar policy author / (d) receipt-path state-outside-repo / (e) Ed25519 keypair / (f) Phase 7 benchmark / (g) cross-model T1 review.

### 4-voice advanced agent team disposition

| Voice | Type | Outcome | Notes |
|---|---|---|---|
| Voice 1 | Bash codex bg foreground+tee REAL GPT-5.5 (DEFAULT profile) | **SUCCESS** NEEDS-REVISION conf=0.88 + fm17_signature: Path P-DEFAULT-profile-success + cross_model_gate_status: FULL + sra_t1_satisfied: partial | 7-axis verdict: AXIS-1+2 PASS / AXIS-3 NEEDS-REVISION-CEDAR-POLICY (Cedar default-deny ≠ default-allow; my brief had wrong axiom) / AXIS-4 APPROVE-PATH / AXIS-5 RECOMMEND-METHOD (protect-mcp init OR openssl) / AXIS-6 NEEDS-FIXTURES (npx-per-tool-call latency unmeasured) / AXIS-7 NEEDS-REVISION (signed-audit-trails npm 404, global `.*` hook risk, npx cold-start, silent-fallback risk). Verdict at `.claude/state/codex_consult_w138f4_governance_trio_install_OUT.txt` |
| Voice 2 | sota-researcher CC subagent | **SUCCESS** STAGED-WITH-3-CRITICAL-CORRECTIONS — 27 tool_uses; 423s; agentId `ae4eac5d194df9343` | ARTIFACT-INLINE persisted at `tmp/wave138-fire4-voice2-sota-researcher-2026-05-10.md`; **GATE-BLOCKING DISCOVERY**: `evaluate`/`sign` subcommands DO NOT EXIST in v0.5.5 OR v0.6.0; wshobson plugin's hooks.json is **architecturally broken** vs canonical CLI surface; canonical pattern is `npx protect-mcp init-hooks` + `npx protect-mcp serve --port 9377` (HTTP server, hooks POST to `/hook` endpoint); 5 self-caught Mia OVERs preserved as cite-trail corrections |
| Voice 3 | everything-claude-code:architect CC subagent | **SUCCESS** DESIGN STAGED-INSTALL-WITH-SHADOW-MODE-ROLLOUT — 26 tool_uses; 195s; agentId `aea945340e418c0ae` | ARTIFACT-INLINE persisted at `tmp/wave138-fire4-voice3-architect-cedar-ed25519-design-2026-05-10.md`; ~150 LOC concrete Cedar policy template + Node.js Ed25519 keypair design + receipt-path APPROVE-PATH + 7-day shadow-mode rollout discipline; 3 self-caught Mia OVERs (12-pattern→13-pattern correction; v0.5.5→v0.6.0; daemon-mode latency mitigation); design built on UNVERIFIED `daemon` subcommand assumption — REFUTED by Voice 2 evidence |
| Voice 4 | codex:codex-rescue CC subagent (BRIDGE-MODE) | **FM-17.f BLOCKED** — pre-fire 204ms / 0 tokens / 0 tool_uses / "API Error: Extra usage is required for 1M context" — n=4 cumulative FM-17.f evidence ladder advance | Standing-directive ≥2 BRIDGE-MODE unsatisfiable in current session due to FM-17.f 1M-context-entitlement billing-class blocker; Voice 4 brief at orchestrator-side; recovery via Path D (CLAUDE_CODE_DISABLE_1M_CONTEXT=1 operator-restart) DEFERRED to next session per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.f`. Per CR-3 Phase 1 bootstrap exception: Voice 1 = REAL GPT-5.5 direct ALONE satisfies cross-model gate |

### Synthesis verdict (3-voice convergence + Voice 4 FM-17.f failure)

**STAGED-WITH-REVISED-INSTALL-DEFERRED-TO-WAVE-138-FIRE-5**: governance trio install plan needs re-architecture before any actual `/plugin install` or `npm install` fires.

**Per-plugin disposition (re-verified vs Wave 138 Fire 3)**:
- **protect-mcp v0.6.0**: STAGED — npm verified MIT + Tom Farley TIER-4 confirmed BUT install path needs revision (canonical `init-hooks` + `serve` HTTP, NOT wshobson plugin's broken `evaluate`/`sign` hooks.json)
- **signed-audit-trails**: STAGED-AS-CC-PLUGIN — NOT npm package (Voice 2 confirmed npm 404); install via `claude plugin install wshobson/agents/signed-audit-trails` (teaching skill, NOT runtime hook)
- **review-agent-governance**: REJECTED-FOR-FIT (Wave 138 Fire 3 disposition stands per Probe 7.a DEMAND-ABSENCE)

### Wave 138 Fire 3 cite-trail corrections (5 OVERs caught by Voice 2 — propagation-defense per FM-20 path-drift cascade)

| # | Wave 138 Fire 3 cite | Voice 2 finding | Action |
|---|---|---|---|
| 1 | "Microsoft AGT PR#667 in microsoft/agentic-cookbook MERGED" | `microsoft/agentic-cookbook` is **404 Not Found**; correct repo is `microsoft/agent-governance-toolkit` (1463 stars MIT) with PRs 1186/1197/1202/1203/1205 by tomjwxf — **substantive footprint actually STRONGER than cited** | Forward-only correction in this Fire 4 close-synthesis; Wave 138 Fire 3 commit body NOT rewritten per port-note-discipline §6 anti-pattern |
| 2 | "Cedar PR#64 in cedar-policy/cedar MERGED" | `cedar-policy/cedar/pull/64` is **404 Not Found**; correct PR is `cedar-policy/cedar-for-agents/pull/73` "feat: RequestGenerator WASM bindings" merged 2026-04-20T15:11:17Z by tomjwxf | Forward-only correction |
| 3 | "signed-audit-trails v0.6.0 npm package" | npm probe returned **404 Not Found** for `signed-audit-trails`; pure wshobson plugin (`skills/signed-audit-trails-recipe/SKILL.md` cookbook teaching skill) | Install path is `claude plugin install wshobson/agents/signed-audit-trails`, NOT npm install |
| 4 | "README 10K+ monthly downloads" | npm-stat actual = **940 downloads** last 30 days (10x overstated; vendor-aspirational marketing claim) | Cite npm-stat 940 figure with date range; do NOT propagate "10K+" claim |
| 5 | "FSL-1.1-MIT vs MIT divergence concern" | License crossover at v0.4.0 (2026-03-26); v0.4.0+ ALL MIT; current pin **v0.5.5 IS MIT** | Voice 2's earlier FSL-1.1-MIT framing was version-ambiguous — true for archived v0.1.0–v0.3.3 only; install proceeds with MIT confidence for v0.5.5+ |

### GATE-BLOCKING discovery: install architecture refutation

**Voice 2 empirical probe**: `node dist/cli.js evaluate --tool Bash --input '...' --policy /tmp/x` returned `[PROTECT_MCP] Error: Missing "--" separator before the command to wrap.` — CONFIRMS `evaluate` is NOT a documented subcommand.

**Documented subcommands** (from extracted v0.5.5 + v0.6.0 tarballs, IDENTICAL): `serve`, `init-hooks`, `quickstart`, `connect`, `init`, `demo`, `trace`, `status`, `digest`, `receipts`, `bundle`, `simulate`, `report`. **NEVER documented**: `evaluate`, `sign`, `verify`, `hook-eval`, `bench`.

**wshobson plugin's hooks.json**:
```json
"command": "npx protect-mcp@0.5.5 evaluate --policy ... --tool ..."  // FAILS — no evaluate subcommand
"command": "npx protect-mcp@0.5.5 sign --tool ... --output ..."       // FAILS — no sign subcommand
```

**Tarball-internal hooks template** at `package/policies/claude-code-hooks.json` calls `npx protect-mcp hook-eval --tool ...` — **also non-existent subcommand**.

**Implication**: BOTH wshobson plugin AND tarball-internal hooks template ship architecturally-broken configs vs the actual CLI surface. The CORRECT install pattern per protect-mcp README is:
1. `npx protect-mcp init-hooks --port 9377` (generates correct hooks.json)
2. `npx protect-mcp serve --port 9377 --policy ./protect.cedar` (HTTP server)
3. Hooks POST to `http://127.0.0.1:9377/hook` endpoint

**Voice 3 architect's daemon-mode design** also REFUTED: daemon subcommand was UNVERIFIED in Voice 3 brief; Voice 2's exhaustive subcommand list confirms `daemon` is also NOT documented. Voice 3's design is solid for Cedar policy + Ed25519 keypair + receipt-path BUT the latency-mitigation daemon-wrapper is built on a non-existent subcommand assumption.

### KEY UNLOCK 5th-time confirmation: Pattern D candidate ladder advance n=5

DEFAULT codex profile recovery for FM-17.i Pattern B HNF — **n=5 same-arc evidence ladder** (Wave 137 Fire 2 + Wave 138 Fire 1+2+3+4 Voice 1). Voice 1 in this Fire 4 used DEFAULT profile (NOT deep-review-exec) and successfully completed with NEEDS-REVISION conf=0.88 + cross_model_gate_status: FULL + fm17_signature: Path P-DEFAULT-profile-success.

Per Voice 1 Q6 verdict (Wave 138 Fire 2): NOT FM-17.i sub-class advancement; **Pattern D candidate** in `codex-t1-fix-forward-pattern.md`. Ladder advance n=4→n=5 — Wave 139 candidate codification queued (task #137).

### FM-17.f cumulative ladder advance n=4 (this fire's NEW evidence)

- **Wave 119**: pre-fire 648ms / 0 tokens (Voice 4 codex-rescue)
- **Wave 129 Agent C**: pre-fire 277ms / 0 tokens (codex-rescue)
- **Wave 130 Fire 2 Agent A**: pre-fire 839ms / 0 tokens (codex-rescue)
- **Wave 138 Fire 4 Voice 4** (this fire): pre-fire 204ms / 0 tokens (codex-rescue)

All 4 instances: BRIDGE-MODE codex-rescue dispatch from `[1m]`-flagged eee parent session → `<status>completed</status>` (mis-named — actually failed) + "API Error: Extra usage is required for 1M context · run /extra-usage to enable, or /model to switch to standard context". Per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.f` mechanism: parent session's `[1m]` context flag carries into subagent session-creation request; on plans where Sonnet 1M requires `/extra-usage`, request fails at billing-class entitlement check BEFORE any tool call or token consumption.

**Wave 138 Fire 4 Voice 4 confirmed FM-17.f n=4 firm**. Recovery options per `fm17-subagent-fleet-depletion.md §FM-17.f`:
- **Path P PRIMARY**: orchestrator `codex exec` foreground+tee from main session — Voice 1 USED THIS, cross-model gate FULLY satisfied at ZERO cost
- **Path D SECONDARY**: `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` per `CLAUDE.local.md` ENV (h) — DEFERRED to next session (operator-restart required)

### Mia ladder advance n=168 → n=169 (1 fresh orchestrator-side OVER)

| # | Source | Class | Catch |
|---|---|---|---|
| **#169** | **Orchestrator-side (this fire)** | **Cross-voice evidence-conflict resolution** | Voice 3 architect's daemon-mode wrapper design assumed `daemon` subcommand exists in protect-mcp v0.6.0. Voice 3 self-flagged this as UNVERIFIED HONEST-NON-FINDING, requesting Voice 1/2 verification. Voice 2's exhaustive subcommand probe (extracted v0.5.5 + v0.6.0 tarballs, ran `node dist/cli.js --help`) returned 13 documented subcommands; `daemon` NOT among them. **REFUTED**: Voice 3's daemon-mode design built on non-existent subcommand. Orchestrator-side resolution: defer Voice 3's daemon-mode to Wave 138 Fire 5 with revised plan (use `serve` HTTP instead of `daemon` subprocess). Per FM-20 path-drift cascade defense at `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md`: cross-voice evidence MUST be resolved at synthesis layer, not propagated forward. |

3 Voice 2 agent-side catches preserved for Wave 138 Fire 5 (NOT counted in orchestrator ladder): Cedar PR cite WRONG / Microsoft AGT repo WRONG / `evaluate`+`sign` non-existence.

3 Voice 3 agent-side catches preserved for Wave 138 Fire 5 (NOT counted): 13-pattern correction / v0.5.5→v0.6.0 / daemon-mode latency mitigation refuted by Voice 2.

### Cross-model gate satisfaction status

**FULLY SATISFIED** via Voice 1 Path P codex foreground+tee REAL GPT-5.5 NEEDS-REVISION conf=0.88 verdict at `.claude/state/codex_consult_w138f4_governance_trio_install_OUT.txt`. Per CR-3 Phase 1 bootstrap exception: orchestrator-side `codex exec` foreground+tee dispatch satisfies cross-model gate.

Standing-directive ≥2 GPT-5.5 BRIDGE-MODE unsatisfiable in current session due to FM-17.f. Documented as known-limitation per `fm17-subagent-fleet-depletion.md §FM-17.f` STAND-IN-NOTICE convention. Voice 4 was attempted in good faith; FM-17.f is environmental blocker, not orchestrator violation.

### Wave 138 Fire 5 candidate (next-fire — task #138 NEW)

**Pre-conditions**: operator restart with `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` per CLAUDE.local.md ENV (h) → enables BRIDGE-MODE subagent dispatch (currently FM-17.f-blocked).

**Revised install plan** (3-voice convergent recommendation):

Phase 1 (preflight):
- `npm view protect-mcp@0.6.0 license` → confirm MIT (already done — PASS)
- `npm view @veritasacta/verify` → verify package exists + version (NOT YET PROBED — Wave 138 Fire 5 candidate)
- `mkdir -p Z:/claude-sota-installed-state/.protect-mcp/{keys,receipts,policies,audit}`

Phase 2 (bootstrap):
- `npx protect-mcp@0.6.0 init --dir Z:/claude-sota-installed-state/.protect-mcp/`
- `npx protect-mcp@0.6.0 init-hooks --dir Z:/claude-sota-installed-state/.protect-mcp/ --port 9377`
- Author Cedar policy at `Z:/claude-sota-installed-state/.protect-mcp/policies/protect.cedar` per Voice 3 template (13-pattern hard deny + LAYER 0 default-allow + MCP/codex permits)
- Generate Ed25519 keypair via Node.js per Voice 3 method at `Z:/claude-sota-installed-state/.protect-mcp/keys/`

Phase 3 (start server in SHADOW mode):
- `npx protect-mcp@0.6.0 serve --port 9377 --policy <policy> ` (run in background; SHADOW is default; --enforce flag flips to enforce)

Phase 4 (wire CC settings.json hooks):
- Use init-hooks-generated config verbatim (replaces wshobson plugin's broken hooks.json)
- Order: AFTER safety_guard.py + BEFORE codex_t2_pre_commit_gate.py
- HTTP POST to `http://127.0.0.1:9377/hook` (NOT direct subcommand invocation)

Phase 5 (signed-audit-trails install):
- `claude plugin install wshobson/agents/signed-audit-trails` (teaching skill, NOT runtime hook)

Phase 6 (smoke probe):
- Trigger Edit on test file → verify codex T1 + protect-mcp HTTP audit-only + NO actual deny
- Trigger git commit → verify codex T2 + protect-mcp logs git Bash + commit succeeds
- Trigger codex T3 postcommit → verify T3 + receipt at `Z:/claude-sota-installed-state/.protect-mcp/receipts/<YYYY-MM>/<sha8>.json`
- Audit shadow log: 0 false-deny on codex/git/Edit paths

Phase 7 (Phase 7 benchmark gate satisfaction):
- HTTP loopback bench: `for i in {1..1000}; do curl -X POST http://127.0.0.1:9377/hook ...; done`
- Target SLO: p95 ≤200ms (industry MCP-class standard)
- Tamper-detection bench via `simulate --policy ... --log ... --json`

Phase 8 (7-day shadow → enforce flip):
- Review shadow audit log for would-have-denied events
- If zero false-deny on codex/MCP/install paths → flip to `--enforce`
- Otherwise tune Cedar policy and extend shadow window

### CR conformance for THIS fire

| CR | Conformance |
|---|---|
| CR-1 cite-trail | TIER-1 cites: npm registry + GitHub blob SHAs + IETF datatracker + Cedar AWS docs + RFC 8032 |
| CR-3 cross-model gate | FULLY SATISFIED via Voice 1 Path P REAL GPT-5.5 (Phase 1 bootstrap exception) |
| CR-5 install-priority | NO install-class artifact added (verification-only fire) |
| CR-6 fresh-from-github | npm view probed @ 2026-05-10 (today); v0.6.0 verified latest |
| CR-7 graduated-unleash | Phase 1 active (defaultMode: bypassPermissions per Wave 82d temporary override) |
| CR-8 full-SOTA-content | All edits cite-trail-anchored to Wave 138 Fire 1+3 + Voice 1+2+3 evidence |
| CR-9 install-risk | pre-cite-import REVERT check N/A (verification fire); Voice 2 caught wshobson hooks.json broken BEFORE install |
| CR-10 research-first | Advanced agent team dispatched BEFORE any install attempt |
| CR-11 META-process | Per ALWAYS LAUNCH ADVANCED AGENT TEAM standing-directive |
| CR-12 upstream-install-priority | Honored — defer install pending Wave 138 Fire 5 revised plan |

### FM tracker

| FM | Status |
|---|---|
| FM-09 codex-rescue blind-spot | n=6/6 100% base rate STILL holds (Voice 4 FM-17.f-blocked, no codex-rescue verdict to evaluate) |
| FM-17.f 1M-context blocker | **n=4 firm** (Wave 119 + Wave 129 + Wave 130 Fire 2 + Wave 138 Fire 4 Voice 4) — confirmed cumulative ladder advance |
| FM-17.i Pattern B HNF (Pattern D candidate) | **n=5 ladder** (Wave 137 Fire 2 + Wave 138 Fire 1+2+3+4 Voice 1 DEFAULT profile recovery) — Wave 139 codification queued task #137 |
| FM-20 path-drift cascade | 5 Wave 138 Fire 3 cite-trail corrections via Voice 2 — defense applied at synthesis layer |
| FM-02 sub-class (c) commit-layer absorption | 5 parallel-session commits absorbed (e7666de → e087cbc) — accept absorption per discipline |

### Architecture SOTA-cleanliness

**~83-87% maintained** — no install-debt added (verification-only fire); gate-blocking discovery PREVENTS future wrong-direction adoption (would have shipped broken hooks.json that fails on first hook fire); revised install plan stages clean canonical install for Wave 138 Fire 5.

### Files changed (committed)

- `docs/install-provenance.md` (+~150 LOC: this entry)

### Memory artifacts (gitignored)

- `tmp/wave138-fire4-voice2-sota-researcher-2026-05-10.md` (~310 LOC ARTIFACT-INLINE persisted by orchestrator post-Voice-2-completion per FM-19)
- `tmp/wave138-fire4-voice3-architect-cedar-ed25519-design-2026-05-10.md` (~370 LOC ARTIFACT-INLINE persisted post-Voice-3-completion per FM-19)
- `.claude/state/codex_consult_w138f4_governance_trio_install.txt` (Voice 1 codex prompt 155 LOC)
- `.claude/state/codex_consult_w138f4_governance_trio_install_OUT.txt` (Voice 1 verdict ~6300+ LOC)
- `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` (L5 prepend Wave 138 Fire 4 entry)
- `.claude/projects/Z--claude-sota-installed/memory/reference_w138_fire4_close_synthesis_2026_05_10.md` (NEW Layer-3 wiki)
