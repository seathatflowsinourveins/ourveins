# W311 Synthesis — Anthropics Upstream Pull + Runtime-vs-Official-CLI Deep Audit

**Wave**: W311
**Date**: 2026-05-19
**Branch**: `sota-converge-w310` @ HEAD `4d8fbcc` (W310 closeout) → W311 streams + synthesis
**Predecessor**: W309 (CCBP+ECC ingest + sca-v6 design) → W310 (sca-v6 ship + lag-diagnosis)
**Method**: 2-stream parallel-Agent fan-out + 1 self-executed closeout
**Operator mandate (verbatim)**: *"pull your runtime with https://github.com/anthropics, any slient error and fallback, low quality code in your runtime now vs sota offical and ccbp ... make sure your runtime itself are sota no error vs offical claude code cli ... investigate your runtime against offical sdks ... ship with convergence sota insights and e2e withgpt 5.5"*

---

## Executive verdict

**YELLOW** with 8 CRITICAL + 14 HIGH + 9 MEDIUM + 7 LOW findings across 2 streams. **34 net-new findings** orthogonal to W309/W310 already-closed set.

**Top three operator-decision items pre-codex-gate**:
1. **AI-W311-A-1 (CRITICAL)**: SDK pin `claude-agent-sdk-python==0.1.81` is 13 minor versions behind upstream `0.2.82` → carries **CVE-2025-66416** (DNS-rebinding via outdated `mcp` floor). Upgrade urgency = HIGH.
2. **AI-W311-A-6 (HIGH)**: PreToolUse hook glob `*'git push --force'*` over-matches `git push --force-with-lease` — **the very SOTA primitive that CLAUDE.md L14 explicitly recommends**. Hook regresses CLAUDE.md's own parallel-session-safety mandate.
3. **AI-W311-A-9 (HIGH)**: `defaultMode: bypassPermissions` + `skipDangerousModePermissionPrompt: true` (settings.json:86+) functionally INVERT cardinal-rule-5 ("Safety boundaries via Claude Code permissions"). Operator decision required: ratify as documented exception OR revert.

**Operator's NEW emphasis is well-served**: Stream A confirms CLI v2.1.144 absorbed 18 silent-bug fixes (5 CRITICAL incl. MCP `tools/list` pagination silent-drop + `MCP_TOOL_TIMEOUT` actually applied to HTTP/SSE). Stream B confirms `self_invented_count: 0` invariant holds.

---

## 1. CLAUDE.md drift findings (consolidated from both streams)

| # | Drift | Evidence | Severity | Auto-doable? |
|---|---|---|---|---|
| D1 | "62 plugins installed" | live count = **64** (Stream B B-1) | CRITICAL | Yes — line-edit |
| D2 | "× 18 skills" listed | actual count = **28** (Stream A C-2; `dual-review` is in `.claude/commands/`, not skills) | CRITICAL | Yes — line-edit |
| D3 | `.claude/skills/learned/` declared exists | empty directory (Stream A C-1) | CRITICAL | Operator decide: remove dir OR populate |
| D4 | Status date `2026-05-18` | HEAD now 2026-05-19 (Stream B) | LOW | Yes — line-edit |
| D5 | `cognee ✓ ACTIVE` | server `/` returns 404; end-to-end handshake unverified (Stream B B-2; **W309 C3 reconciliation already amended this to ⚠️ EMBEDDER-LIVE+LLM-key-bug — confirm marker is preserved**) | HIGH | Confirm wording in CLAUDE.md L35 |
| D6 | `hindsight ✓` via `.mcp.json` | hindsight NOT in `.mcp.json` (only as plugin); the W280b path matches but wording mis-cites (Stream B B-3) | HIGH | Operator: re-cite |

**Recommendation**: hold the auto-doable line-edits for the operator's explicit ratification (CLAUDE.md edits have always been operator-only per W309 session pattern). Surface in operator-AI queue, don't self-apply.

---

## 2. Silent-fallback / low-quality-code findings (severity-sorted)

### CRITICAL (5 from Stream B + 3 from Stream A = 8)

| # | Finding | Stream | Operator-AI |
|---|---|---|---|
| C1 | Plugin count drift 62 → 64 in CLAUDE.md L34 | B-1 | AI-W311-B-1 |
| C2 | Skill count drift 18 → 28 in CLAUDE.md L30 | A-C-2 | AI-W311-A-1 |
| C3 | `.claude/skills/learned/` empty (declared in pointer) | A-C-1 | AI-W311-A-2 |
| C4 | cognee `/` 404 (handshake unverified) | B-2 | AI-W311-B-2 |
| C5 | hindsight `.mcp.json` mis-cite | B-3 | AI-W311-B-3 |
| C6 | phoenix `.mcp.json` dead-cite (`--baseUrl http://127.0.0.1:16006` ECONNREFUSED; phoenix MCP retired this session) | B-4 | AI-W311-B-4 |
| C7 | graphiti `.mcp.json` block has 5 env vars + 2 model args pointing at retired ollama+FalkorDB — time-bomb if `disabledMcpjsonServers` ever rolled back | B-5 | AI-W311-B-5 |
| C8 | gitnexus plugin disabled but 7 `gitnexus-*/SKILL.md` operator-curated skills still active — inconsistent signal | A-C-3 | AI-W311-A-3 |

### HIGH (8 from Stream B + 6 from Stream A = 14)

| # | Finding | Stream | Operator-AI |
|---|---|---|---|
| H1 | tmp/ accumulated to **2,182 MB / 65,371 files / 569 top-level items** including `gitleaks-W290.json` (28.69 MB potentially sensitive) | B-6 | AI-W311-B-6 |
| H2 | 2 of 4 `.claude/agents/*.md` fail YAML frontmatter parse (BOM in `evaluator.md`; HTML comment before YAML in `gpt5-archaeologist.md`) | B-7 | AI-W311-B-7 |
| H3 | 14-of-22 marketplaces stale 36.5-36.7h (W270 discipline = ≤24h) | B-8 | AI-W311-B-8 |
| H4 | 9 of 13 `.claude/plugins/data/` subdirs are empty stubs | B-9 | AI-W311-B-9 |
| H5 | Status block date 2026-05-18 is 1+ day stale | B-10 | AI-W311-B-10 |
| H6 | settings.json at **14.5 KB** (0.5 KB headroom remaining vs 15 KB cap) | B-11 | AI-W311-B-11 |
| H7 | basic-memory MCP local-`.exe` cite path (per W300-AI-1 corollary) still pending remediation | B-12 | AI-W311-B-12 |
| H8 | Codex bg-session bookkeeping accumulating in tmp/ | B-13 | AI-W311-B-13 |
| H9 | **9 speckit-* SKILL.md files (32% of all skills) carry slash-command frontmatter keys (`argument-hint`, `user-invocable`, `disable-model-invocation`) that the official `quick_validate.py:42` ALLOWED_PROPERTIES set rejects** | A-H-1 | AI-W311-A-4 |
| H10 | **SDK pin `claude-agent-sdk-python==0.1.81` is 13 minor versions behind upstream `0.2.82` → CVE-2025-66416 risk** | A-H-2 | **AI-W311-A-5 (P0)** |
| H11 | PreToolUse hook glob `*'git push --force'*` over-matches `git push --force-with-lease` — **regresses CLAUDE.md L14's SOTA recommendation** | A-H-3 | AI-W311-A-6 |
| H12 | PostToolUse hook `>/dev/null 2>&1; true` silently absorbs all ruff/shellcheck errors; case-sensitive extension match misses `.MJS`/`.JS`/`.TS`/`.JSON` (extends W309 V2 H-V2-2) | A-H-4 | AI-W311-A-7 |
| H13 | PostToolUseFailure powershell hook no try/catch around `ConvertFrom-Json` → silent crash on malformed `$input` | A-H-5 | AI-W311-A-8 |
| H14 | **`defaultMode: bypassPermissions` (settings.json:86) + `skipDangerousModePermissionPrompt: true` functionally INVERT cardinal-rule-5** | A-H-6 | **AI-W311-A-9 (REQUIRES OPERATOR DECISION)** |

### MEDIUM (5 + 4 = 9) and LOW (3 + 4 = 7)

Detailed in `W311-STREAM-A-ANTHROPICS-RUNTIME-DIFF.md` §5 and `W311-STREAM-B-SILENT-FALLBACK-EXTENDED.md` §2.

---

## 3. Anthropic-upstream net-new primitives (Stream A § §)

### CLI v2.1.144 → upstream HEAD harvest

**Already absorbed** (passive — operator upgraded CLI):
- C8 grep-no-match exit-1
- C10 MCP `tools/list` pagination silent-drop
- C11 `claude mcp list` parse-error surfacing
- C12 plugin-install hint
- C14 `MCP_TOOL_TIMEOUT` actually applied to HTTP/SSE (+13 other fixes; 18 total, 5 CRITICAL)

### Net-new official primitives the runtime is NOT yet leveraging

1. **`claude plugin lint`** (from `anthropics-financial-services@9affc6e plugin-validate.yml`) — official linter for plugin manifests. Runtime has **62 enabledPlugins never linted** against the official linter. Quick-win: add `claude plugin lint --all` to CI gate. → `AI-W311-A-3`
2. **SDK 0.2.82 primitives** (vs runtime's pinned 0.1.81): `EffortLevel` type alias · `skills` option · `strict_mcp_config` · `include_hook_events` · MCP 1.23.0+ floor · `api_error_status` · `resolveSettings()` · Task tools transition. → `AI-W311-A-5`
3. **TS SDK 0.3.142** `MCP_CONNECTION_NONBLOCKING=1` default → turn-1 race against cold-start MCPs (basic-memory, cognee, langfuse). Mitigation: per-server `alwaysLoad: true`. → `AI-W311-A-13`

### Repos drifted but absorbed (no runtime change required):

- `anthropics-claude-code-action@2449274` — GHA wrapper updates
- `anthropics-claude-cookbooks@a102bbe` — cookbook recipes
- `anthropics-financial-services@9affc6e` — vertical-specific (REJECTED-BY-DESIGN per W280h)

---

## 4. Consolidated operator-action queue (38 AIs from W311 + carry-over from W309)

### P0 — fix or ratify-as-documented-exception within current session (4 AIs)

- [ ] **AI-W311-A-5 (CRITICAL)**: SDK pin 0.1.81 → 0.2.82 upgrade; closes CVE-2025-66416. Reversibility: pip rollback.
- [ ] **AI-W311-A-6 (HIGH)**: Fix PreToolUse glob to exclude `--force-with-lease`. Reversibility: revert hook line.
- [ ] **AI-W311-A-9 (HIGH)**: Decide on `defaultMode: bypassPermissions` — either ratify as documented cardinal-rule-5 exception in CLAUDE.md, OR flip to `defaultMode: acceptEdits`. Reversibility: settings.json single-line edit.
- [ ] **AI-W311-A-3 (HIGH)**: Run `claude plugin lint --all`; surface findings; remediate per finding.

### P1 — within 24h (8 AIs)

- [ ] **AI-W311-A-7**: Replace PostToolUse `>/dev/null 2>&1; true` with proper exit-code propagation (extends W309 V2 H-V2-2)
- [ ] **AI-W311-A-8**: Wrap PostToolUseFailure ConvertFrom-Json in try/catch
- [ ] **AI-W311-B-1**: CLAUDE.md L34 plugin count 62 → 64
- [ ] **AI-W311-A-1 / D2**: CLAUDE.md L30 skill count 18 → 28
- [ ] **AI-W311-A-2 / D3**: Decide `.claude/skills/learned/` — remove or populate
- [ ] **AI-W311-B-4**: phoenix `.mcp.json` block — remove or repoint
- [ ] **AI-W311-B-5**: graphiti `.mcp.json` env-vars — purge or fence
- [ ] **AI-W311-B-6**: tmp/ cleanup — purge `gitleaks-W290.json` (sensitive); compact `tmp/codex-dual-review-*.log`

### P2 — within 1 week (carry forward) (26 AIs)

W309 P0 ship-blocker AIs partially open:
- AI-1 phoenix retire-or-restore — **NOW SUPERSEDED by AI-W311-B-4 (phoenix retired this session)**
- AI-2 OTel auth header → CLAUDE.local.md
- AI-3 cognee LLM-key bug
- AI-G-1 OWASP MCP Top-10 scan (CRITICAL still open)

W309 P1+ HIGH AIs:
- AI-4 fnm-path pin · AI-5 node.exe refresh · AI-6 promptfoo install · AI-7 graphiti-core uninstall · AI-8 W308 wave-residue audit · AI-9 PWF closure (now PARTIALLY closed via W310 ledger row 29)

Plus the 15 W311 AIs spread above + 17 W311-B numbered AIs + carry items.

---

## 5. Cardinal-rule invariants (verified post-W311)

| Rule | Status | Evidence |
|---|---|---|
| **R1 trusted plugins** | ✓ | 64 plugins all resolve to trusted sources; SHA pins per W270; lint pending |
| **R2 hooks = plugin/CLI** | ✓ | Confirmed in Stream B; `.mjs` bug-patch shim sanctioned per CLAUDE.md L19 amendment |
| **R3 cite-anchored agents** | ⚠️ | 2 of 4 `.claude/agents/*.md` fail YAML parse (H2) — fix-class |
| **R4 no self-invent rules** | ✓ | `.claude/rules/` does not exist; `self_invented_count: 0` upheld |
| **R5 safety via permissions** | ⚠️ | `defaultMode: bypassPermissions` ratification pending (AI-W311-A-9) |

**STOP-gate state**:
- CLAUDE.md ≤50 LOC ✓
- settings.json ≤15 KB ⚠️ (14.5 KB, 0.5 KB headroom — AI-W311-B-11)
- worktrees ≤3 ✓ (3: main + W287-reconcile + W290)
- codex `reviewGateEnabled:true` ✓

---

## 6. Files shipped in W311

W310 closeout (`4d8fbcc`, 10 files / 1921 LOC):
- 5 W310-LAG-DIAGNOSIS docs (Phase 1 + Phase 2 + 3 deep-dives)
- 3 W310-SCA-V6-SHIP-AND-AUDIT-QUEUE/Agent-N docs (ICLR + mattpocock + anthropics-top3)
- Plugin SHA-drift sync

W311 (this commit):
- `W311-STREAM-A-ANTHROPICS-RUNTIME-DIFF.md` (47 KB / 423 LOC)
- `W311-STREAM-B-SILENT-FALLBACK-EXTENDED.md` (per Stream B; ~32 KB)
- `W311-SYNTHESIS.md` (this file)

---

## 7. Codex GPT-5.5 cross-model gate (E2E ship gate per persistent operator mandate)

Per operator's standing mandate "ship with convergence sota insights and e2e with gpt 5.5": codex `/codex:adversarial-review --wait` fires async post-commit via `claude --bg` background-session pattern.

**Tiebreaker items queued for codex review**:
1. CLAUDE.md drift items (D1-D6) — auto-doable line-edits vs operator-only-edits boundary
2. AI-W311-A-9 (`defaultMode: bypassPermissions`) — ratify-as-exception OR revert
3. AI-W311-A-5 (SDK pin CVE-2025-66416) — within-session-upgrade vs separate-PR

HIGH/CRITICAL codex findings → round-2 close before ship-cleared per W308 precedent.

---

## 8. W312 next-wave preview

Suggested decomposition (3 parallel streams):

- **Stream A**: P0 operator-AI batch execution (SDK upgrade + hook fixes + bypassPermissions decision + plugin lint)
- **Stream B**: P1 doc-hygiene batch (CLAUDE.md drift fixes + `.mcp.json` retirement cleanup + tmp/ cleanup + agent YAML fixes)
- **Stream C**: OWASP MCP Top-10 scan (W309 AI-G-1 carryover) — runtime's 11 active MCP servers vs OWASP/Agentic Top-10

Each stream codex-gated; convergence → W312-SYNTHESIS.md.
