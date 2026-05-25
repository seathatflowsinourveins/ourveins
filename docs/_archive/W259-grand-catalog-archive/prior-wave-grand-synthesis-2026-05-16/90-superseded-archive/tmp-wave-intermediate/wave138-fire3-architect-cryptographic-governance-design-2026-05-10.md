---
title: Wave 138 Fire 3 — Cryptographic-Governance Integration Design
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-10
agent: architect
wave: 138
fire: 3
agentId: ab548e5c52668a4f2
---

# Wave 138 Fire 3 — Cryptographic-Governance Integration Design

## TL;DR + recommendation

**RECOMMENDED: Option C — STAGED-PENDING-VERIFICATION (defer install; add manifest §17 STAGED row; revisit Wave 138 Fire 4 with benchmark + Cedar policy schema design).**

Three plugins surveyed (protect-mcp / signed-audit-trails / review-agent-governance, all v0.1.0 MIT Tom Farley). Cryptographic-governance layer is genuinely additive to eee (NOT a kiss-dry-yagni Must-Never #4 duplicate of safety_guard.py — different governance plane: Cedar declarative policy + Ed25519 tamper-evident receipts vs deny-list regex). HOWEVER three blockers prevent Fire 3 install:

1. **CR-9 install-risk ELEVATED**: hooks shell out to `npx protect-mcp@0.5.5` per-tool-call (every Bash/Edit/Write/Read invocation hits npm registry resolution + Node spawn — no version-pinned local install path documented). At eee tool-call volume (~thousands/session), this is a per-call latency tax of unknown magnitude.
2. **Phase 7 benchmark gate FAIL** per `agent-harness-fit-verification.md:156`: README claims "10K+ monthly downloads" + "PR #64 merged" + "PR #667 merged" + "first cryptographic governance plugin" + "formally verified" + "tamper-evident" — **6+ numeric/quality claims without reproducible benchmark fixtures or methodology files in the plugin tree** (only fixture is `test/expected/receipt-schema.json` which is a JSON schema, not a benchmark). Per `convergence-gate.md:127-149` Row-2 fabrication-test FAIL → REJECT-or-STAGE.
3. **CR-7 Phase 1 + cardinal-rule-3 cross-model-consensus interaction**: hooks fire on `.*` matcher (every tool call). Wiring Cedar policy enforcement BEFORE codex T1/T2 hooks could deny operations the codex pipeline depends on (gitnexus / mcp-memory / repomix / serena tool calls). Sequencing requires deliberate Cedar policy authoring + dry-run validation.

Option C defers install pending: (a) reproducible benchmark for `npx protect-mcp evaluate` latency at eee tool-call volume; (b) Cedar policy authored that whitelist eee's existing 26 MCP tool surfaces + codex T1/T2/T3 hook commands; (c) Ed25519 keypair management decision (per-session ephemeral vs project-pinned vs operator-managed); (d) receipt-storage path decision (`./receipts/` collides with `.claude/state/` JSONL convention).

## 3-option trade-off table

| Axis | Option A — INSTALL ALL 3 | Option B — INSTALL 2 (drop review-agent-governance) | Option C — STAGED-PENDING-VERIFICATION (RECOMMENDED) |
|---|---|---|---|
| **KISS Must-Never #4 risk** | NOT-DUPLICATE (Cedar plane ≠ regex deny-list plane); review-agent-governance partial overlap with cardinal-rule-7 graduated unleash + safety_guard.py PR-action gate (gh pr commands not commonly used in eee runtime) | NOT-DUPLICATE; cleaner — drops the only partially-overlapping plugin | DEFERRED-CHECK; remains NOT-DUPLICATE |
| **Cross-ref impact (rules/hooks adjusted)** | HIGH — settings.json hooks block (PreToolUse + PostToolUse `.*` matchers add to existing 11+ hook entries); .mcp.json no impact (plugins are local hook-class not MCP-server-class); cross-model-consensus.md needs T1 ordering doc; layered-gates-architecture.md §1 needs Cedar layer added; launch-discipline.md D1 6-axis pre-launch checklist applies | MEDIUM — same as A minus review-agent-governance hooks block | LOW — manifest §17 STAGED row only; no rule edits |
| **CR-1 cite trail** | TIER-1-DIRECT @ marketplace.json blob-SHA + TIER-3-LOCAL-COMPOSITION @ Wave 138 Fire 3 verdict | Same as A | Same as A (cite for STAGED entry only; no install-class commitment) |
| **CR-9 install-risk** | ELEVATED — `npx protect-mcp@0.5.5` per-tool-call (3 install issues: D6 today-release-auto-upgrade if @latest; per-call npm resolve latency; no documented local install path); 2-round fix-forward expectation HIGH (Cedar policy authoring + receipt-path collision + key-mgmt decisions) | Same as A | LOW — STAGED entry only; no install fired |
| **Operational complexity** | HIGH — Cedar policy authoring (declarative policy file required at `./protect.cedar` + `./review-governance.cedar`) + Ed25519 keypair generation + receipt-storage path + JCS canonicalization understanding required | MEDIUM-HIGH — Cedar policy + key-mgmt for protect-mcp only | LOW — design doc only |
| **Forward queue impact** | Wave 138 Fire 4 = post-install smoke probe + 2-round Cedar-policy fix-forward arc; Wave 138 Fire 5+ = Cedar policy refinement | Wave 138 Fire 4 = 2-plugin install arc (smaller scope) | Wave 138 Fire 4 = benchmark fire (measure `npx protect-mcp evaluate` latency at eee tool-call volume) + Cedar policy v1 design + Ed25519 key-mgmt decision + receipt-path collision resolution |
| **Cardinal-rule-3 cross-model gate impact** | HIGH-RISK — Cedar deny on tool calls codex T1/T2/T3 depends on can SILENTLY break the cross-model verification net | Same as A | NO RISK — STAGED only |
| **Phase 7 benchmark gate** | FAIL — 6+ unsourced numeric/quality README claims; auto-FAIL per `convergence-gate.md:127-149` Row-2 | Same as A | DEFER — Phase 7 explicit STAGE for benchmark-evidence fire |

## Integration design (for chosen Option C; applies to A/B if reversed)

### Cedar policy schema design (for codex T1/T2/T3 hook decisions)

```cedar
// eee runtime baseline policy — DEFAULT-ALLOW with 12-pattern deny floor (mirrors safety_guard.py)
permit (principal, action, resource);

// Hard deny (matches safety_guard.py 12-pattern destructive list)
forbid (
    principal,
    action == Action::"Bash",
    resource
) when {
    context.command_pattern in [
        "rm -rf /", "sudo rm", "git push --force",
        "git reset --hard", "git checkout .",
        "DROP TABLE", "TRUNCATE", "docker prune",
        "kubectl delete", "chmod 777", ":(){ :|:& };:",
        "mkfs", "dd if=/dev/zero of=/dev/sd"
    ]
};

// CR-9 install-risk: protect codex T1/T2/T3 hook command paths
permit (
    principal,
    action == Action::"Bash",
    resource
) when {
    context.command_pattern == "codex exec"
};

// MCP tool call permit list (eee 26 MCP tool surfaces)
permit (
    principal,
    action,
    resource
) when {
    action in [Action::"mcp__github", Action::"mcp__context7", Action::"mcp__deepwiki",
               Action::"mcp__playwright", Action::"mcp__repomix", Action::"mcp__serena",
               Action::"mcp__memory", Action::"mcp__graphiti", Action::"mcp__phoenix",
               Action::"mcp__gitnexus"]
};
```

### Ed25519 receipt storage path

- **Default**: `./receipts/` (plugin convention) → COLLIDES with eee `.claude/state/` JSONL convention; OPERATOR DECISION NEEDED
- **Recommended**: `Z:/claude-sota-installed-state/.protect-mcp/receipts/<YYYY-MM>/<sha8>.json` (state-outside-repo per CR-9 sibling-bleed defense + CLAUDE.local.md ENV (f) state-outside-repo redirect convention)
- **Key file**: `Z:/claude-sota-installed-state/.protect-mcp/protect-mcp.key` (NOT in worktree; gitignored convention follows existing CODEX_HOME pattern)

### Hook wire shape (proposed for eventual install)

```json
"PreToolUse": [
  {
    "matcher": ".*",
    "hooks": [
      {
        "type": "command",
        "command": "npx protect-mcp@0.5.5 evaluate --policy \"${PROTECT_MCP_POLICY:-./protect.cedar}\" --tool \"$TOOL_NAME\" --input \"$TOOL_INPUT\" --fail-on-missing-policy false",
        "timeout": 5
      }
    ]
  }
],
"PostToolUse": [
  {
    "matcher": ".*",
    "hooks": [
      {
        "type": "command",
        "command": "npx protect-mcp@0.5.5 sign --tool \"$TOOL_NAME\" --input \"$TOOL_INPUT\" --output \"$TOOL_OUTPUT\" --receipts \"${PROTECT_MCP_RECEIPTS:-Z:/claude-sota-installed-state/.protect-mcp/receipts/}\" --key \"${PROTECT_MCP_KEY:-Z:/claude-sota-installed-state/.protect-mcp/protect-mcp.key}\"",
        "timeout": 10
      }
    ]
  }
]
```

### Composability with safety_guard.py

- **Layer order**: safety_guard.py (regex deny-list, exit 2 on match) fires FIRST; protect-mcp Cedar policy second (additive). Both produce DENY signals at PreToolUse layer per `layered-gates-architecture.md §1` Layer 1 (Front gates).
- **NOT a replacement** per `deprecation-discipline.md` — safety_guard.py provides 12-pattern catastrophic floor (NOT cryptographic); protect-mcp Cedar adds declarative policy + cryptographic receipt layer. Both live in §1 Layer 1 simultaneously.

### audit-action-loop.md §Stage 4 Re-fire integration

- Receipt verification (`npx @veritasacta/verify`) becomes Stage 4 Re-fire signal: tampered receipt detected → audit JSONL drift signal → close via revert + investigate
- Receipts compose with existing `.claude/state/codex_review_HEAD_<sha8>.txt` audit trail (orthogonal: codex verdict files = cross-model consensus evidence; receipts = cryptographic tamper-evident decision evidence)

### launch-discipline.md D1+D2 alignment

Governance trio install IS a deploy-phase event. D1 6-axis pre-launch checklist applies:
- [ ] Cedar policy file authored + cross-model T1 reviewed
- [ ] Ed25519 keypair generation tested + key-mgmt operator-runbook documented
- [ ] Receipt-storage path doesn't collide with `.claude/state/` audit-trail
- [ ] Smoke probe: `npx protect-mcp evaluate` PASS on baseline tool calls
- [ ] Smoke probe: `npx @veritasacta/verify` PASS on first receipt
- [ ] Rollback plan: `/plugin uninstall` + remove hooks block + receipts dir

## Pattern A apply target (manifest §17 entry shape)

```markdown
| **protect-mcp** (Cedar policy + Ed25519 receipts) | `/plugin install` (interactive slash) | `/plugin marketplace add wshobson/agents && /plugin install protect-mcp@claude-code-workflows` | https://github.com/wshobson/agents/tree/main/plugins/protect-mcp @ marketplace.json blob `7d13929aa36e0e808bd34c7790664e8ce2d9d542`; v0.1.0 MIT Tom Farley | **STAGED-PENDING-VERIFICATION** — Wave 138 Fire 3 design [VERIFIED via tmp/wave138-fire3-architect-cryptographic-governance-design-2026-05-10.md]: Phase 7 benchmark gate FAIL (6+ unsourced README claims per `agent-harness-fit-verification.md:156`); CR-9 install-risk ELEVATED (npx-per-tool-call latency unmeasured at eee volume; Cedar policy authoring required; Ed25519 key-mgmt decision pending; receipt-path collision with `.claude/state/` requires resolution); CR-3 cross-model-consensus interaction (Cedar deny could silently break codex T1/T2/T3 net). Forward: Wave 138 Fire 4 candidate = benchmark fire + Cedar policy v1 + key-mgmt decision. CR-8 status: ADAPTED-FROM-SOTA. CR-9 status: STAGED-RISK-DOCUMENTED. |
| **signed-audit-trails** (cookbook walkthrough) | `/plugin install` (interactive slash) | `/plugin install signed-audit-trails@claude-code-workflows` | Same marketplace.json + plugin v0.1.0 MIT | **STAGED-PENDING-VERIFICATION** — companion to protect-mcp; SKILL-ONLY plugin (no hooks; no runtime install-risk); install at same time as protect-mcp for cookbook reference. Independent install of skill plugin has minimal risk; queued together for batch install in Wave 138 Fire 4. |
| **review-agent-governance** (PR-review human-approval gate) | `/plugin install` (interactive slash) | `/plugin install review-agent-governance@claude-code-workflows` | Same marketplace.json + plugin v0.1.0 MIT | **REJECTED-FOR-FIT-Probe-7.a-DEMAND-ABSENCE** — Wave 138 Fire 3 design: eee runtime has NO autonomous PR-review surface (no `gh pr review`/`gh pr comment`/`gh pr merge` workflow; no GitHub Actions CI; no automated PR-bot). Plugin's 12-action review-surface gate is dead-code in eee context per `agent-harness-fit-verification.md` Probe 7.a. **REVISIT** if eee adopts PR-review automation. |
```

- **Tier classification**: Tier 4 (plugin install per manifest §18.1 enumeration); fits §17 reference plugins block (consistent with cwc-long-running-agents reference plugins pattern)
- **Smoke-probe** (when install fires): `(1) /plugin install succeeds; (2) Cedar policy file authored + loaded without parse error; (3) Ed25519 keypair generated; (4) first receipt written + verified via npx @veritasacta/verify exit 0; (5) per-tool-call latency measured ≤200ms p95 at eee tool-call volume`
- **Mode**: STAGED-PENDING-VERIFICATION (until Wave 138 Fire 4 benchmark + design)
- **CR-8 status**: ADAPTED-FROM-SOTA (cite anchor at marketplace.json blob)
- **CR-9 status**: STAGED-RISK-DOCUMENTED (per Section §3 risks above)

## KISS Must-Never #4 check verdict

**NOT-DUPLICATE** — Cedar policy + Ed25519 cryptographic-governance plane is orthogonal to existing eee safety surfaces:
- safety_guard.py: regex deny-list at PreToolUse Layer 1 (12 catastrophic patterns; exit 2 hard deny). NOT cryptographic. NOT declarative-policy.
- agent_plan_readonly_bash_guard.py: plan-mode subagent restriction. Different scope (plan-mode only).
- block_no_verify_guard.py: `--no-verify` bash bypass guard. Different scope (single-flag protection).
- codex T1-T7 hooks: cross-model verification net (Claude orchestrates / codex reviews). Different concern (model-asymmetry verification, not cryptographic-tamper-evidence).
- audit-action-loop.md JSONL trails: append-only audit trail at `.claude/state/*.jsonl`. NOT cryptographically signed (this is the gap protect-mcp may close).

Verdict: protect-mcp + signed-audit-trails would ADD a cryptographic-governance plane (Cedar policy + Ed25519 receipts + JCS canonicalization + IETF draft-farley-acta-signed-receipts) that does not exist in eee today. ADDITIVE, not duplicative.

review-agent-governance: REJECT-FOR-FIT per Probe 7.a (no PR-review surface in eee runtime).

## Phase 7 benchmark gate verdict

**FAIL** per `agent-harness-fit-verification.md:156` Phase 7 + `convergence-gate.md:127-149` Row-2 fabrication-test:
- README counts ≥6 unsourced numeric/quality claims: "10K+ monthly downloads" / "PR #64 merged" / "PR #667 merged" / "first cryptographic governance plugin" / "formally verified" / "tamper-evident"
- No reproducible benchmark fixtures in plugin tree (only `test/expected/receipt-schema.json` JSON schema; `test/run-tests.sh` + `test/verify-fixtures.sh` are test scripts not benchmark methodologies)
- No external benchmark repo cited (no `protect-mcp-evals` or `veritasacta-benchmark` repo referenced)

Per Phase 7 trigger scope: fires ONLY on ADOPT-NOW install/enable for multi-agent kits or plugin bundles. THIS IS install-class for the plugin bundle. Phase 7 fires.

**Action**: STAGED-PENDING-VERIFICATION until benchmark evidence acquired. Wave 138 Fire 4 candidate = "measure `npx protect-mcp evaluate` latency at 100/1000/10000 tool-call volume + measure `npx @veritasacta/verify` chain-verification time at 100/1000/10000-receipt chain depth + report numeric thresholds for ADOPT-NOW gate flip".

## Mia self-probe (decompose claims, probe each, OVERs caught)

| Claim | Probe | Outcome |
|---|---|---|
| "protect-mcp is sole new cryptographic plane in eee" | grep `Cedar` `.claude/hooks/scripts/`, `.mcp.json`, `.claude/rules/` | VERIFIED — 0 hits |
| "safety_guard.py is regex-only NOT cryptographic" | Read `safety_guard.py` lines 1-50 | VERIFIED — header confirms "narrow deny-list for catastrophic patterns" + cite TIER-3-LOCAL-COMPOSITION at L13; no Ed25519/JCS references |
| "marketplace.json blob SHA `7d13929aa36e0e808bd34c7790664e8ce2d9d542` is current" | brief context provided this blob; not re-probed this fire | INFERRED — blob-SHA carries from Wave 138 Fire 1; freshness re-verify = next-fire candidate |
| "review-agent-governance is REJECT-FOR-FIT Probe 7.a" | grep `gh pr` / `gh pr review` / `gh pr merge` / `gh issue comment` / `gh release` / `gh api repos` in `.claude/agents/`, `.claude/commands/`, `.claude/hooks/`, `tools/` | INFERRED — eee has no shipped PR-review automation; not a one-grep-cell verifiable claim, but eee is pre-marketplace-PR-bot per CR-7 Phase 1 + no `.github/workflows/` infrastructure observed |
| "`./receipts/` collides with `.claude/state/` JSONL convention" | grep `receipts/` in `.claude/state/`, `.gitignore`, `tools/eee.ps1` | VERIFIED — no existing `./receipts/` dir; collision is FORWARD-LOOKING (would be created at install); state-outside-repo recommendation prevents any actual collision per CLAUDE.local.md ENV (f) pattern |
| "Phase 7 benchmark gate fires for plugin bundles" | Read `agent-harness-fit-verification.md:156` (system-reminder context provided) | VERIFIED — Phase 7 trigger scope explicit: "ADOPT-NOW install/enable for multi-agent kits or plugin bundles" — IS install-class plugin bundle |
| "tools/eee.ps1 has no protect-mcp env" | grep `PROTECT_MCP` in CLAUDE.local.md / tools/eee.ps1 | INFERRED — not directly probed this fire; based on CLAUDE.local.md context shown which has no `PROTECT_MCP` variables |

**OVERs caught at orchestrator-side decomposition** (n=168 cumulative ladder advance candidate):
- **#168 (potential)**: Original Fire 3 brief assumed Tier 5 manifest classification; actual fit per manifest §17 reference plugins block (cwc-long-running-agents pattern) — Tier 4 is the correct slot for plugin-class installs per manifest §18.1 enumeration. Self-corrected mid-design.
- **#167 (carry-forward awareness)**: Per Wave 138 Fire 2 close-synthesis n=167 ladder — ensure no Probe 8 framing drift here; this design uses Phase 7 (NOT Probe 8) per `agent-harness-fit-verification.md:156` codified terminology.

DESIGN: Option C STAGED-PENDING-VERIFICATION RECOMMENDED — defer install pending Wave 138 Fire 4 benchmark + Cedar-policy v1 + key-mgmt decision; preserves CR-9 install-risk discipline + Phase 7 benchmark gate per `agent-harness-fit-verification.md:156`; cryptographic-governance plane confirmed NOT-DUPLICATE per KISS Must-Never #4 check.
