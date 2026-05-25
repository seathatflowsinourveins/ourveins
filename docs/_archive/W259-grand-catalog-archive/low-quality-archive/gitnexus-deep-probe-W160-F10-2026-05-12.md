# GitNexus deep-probe + MCP integration verify — Wave 160 Fire 10 (2026-05-12)

> **Status**: **STAND-IN-DRAFT** — Fire 10 of 12-fire mega-wave per `.claude/plans/fluttering-wandering-pond.md`. **NOT AUTHORITATIVE** for downstream Fire 11 ship decisions. AUTHORITATIVE label deferred to Fire 11 convergence ship after cross-model gate completes.
>
> **Downstream-consumer contract**: Fire 11 (convergence ship) MAY use this document for **disposition recommendation + license-class concern surfacing ONLY**. Operator decides actionable response to license-class finding in §3.
>
> **Cite class** (per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8):
> `constituents=[TIER-1-DIRECT @ Z:/repos/deps/GitNexus/LICENSE @ 98addbd6 (PolyForm Noncommercial 1.0.0 verbatim L1), TIER-1-DIRECT @ Z:/repos/deps/GitNexus/README.md @ 98addbd6 (cryptocurrency-scam self-flag L1-3), TIER-3-LOCAL-OPERATOR-DERIVED @ orchestrator-direct gitnexus CLI smoke + .mcp.json wire probe 2026-05-12]; effective_tier=TIER-3-LOCAL-COMPOSITION` per MIN_PRECEDENCE.

---

## §1 Methodology

Phase 1 Explore agent dispatch foreclosed by FM-17.502 same-arc systemic failure (5+ instances per Fire 1 STAND-IN-NOTICE context). Orchestrator-direct probes:
- `cat .mcp.json` for MCP wire configuration
- `cat Z:/repos/deps/GitNexus/LICENSE` for license-class verify
- `head -60 Z:/repos/deps/GitNexus/README.md` for upstream provenance + self-flags
- `git -C Z:/repos/deps/GitNexus log --oneline -3` for HEAD freshness
- `grep -lE "gitnexus" .claude/hooks/scripts/*.py` for hook integration depth
- `gitnexus --help` for CLI operational smoke

---

## §2 Current install state (TIER-1-DIRECT verified)

### `.mcp.json` configuration

```json
"gitnexus": {
  "type": "stdio",
  "command": "gitnexus",
  "args": ["mcp"]
}
```

### CLI surface (`gitnexus --help` smoke probe 2026-05-12 returned 0)

```
GitNexus local CLI and MCP server

Commands:
  setup     One-time setup: configure MCP for Cursor, Claude Code, OpenCode, Codex
  analyze   Index a repository (full analysis)
  index     Register an existing .gitnexus/ folder into the global registry
  serve     Start local HTTP server for web UI connection
  mcp       Start MCP server (stdio) — serves all indexed repos
  list      List all indexed repositories
```

### Hook integration

2 hook scripts reference `gitnexus`:
- `.claude/hooks/scripts/codex_prepush_review.py`
- `.claude/hooks/scripts/codex_t1_consult_gate.py`

(No GitNexus-specific PreToolUse/PostToolUse hooks wired in `.claude/settings.json` — integration is via codex T1/T4 hook scripts that may invoke `mcp__gitnexus__*` MCP tools at runtime.)

### HEAD freshness (per `git -C Z:/repos/deps/GitNexus log --oneline -3` 2026-05-12)

```
98addbd6 chore(deps)(deps-dev): bump @types/node in /gitnexus (#1436)
f2914786 chore(deps)(deps): bump fast-uri from 3.1.0 to 3.1.2 in /gitnexus (#1441)
b89ec5b5 chore(deps)(deps): bump hono from 4.12.16 to 4.12.18 in /gitnexus (#1443)
```

Last 3 commits are dependabot/renovate dep bumps — active maintenance pattern; STABLE-BURN-IN bandwidth per `Z:/claude-sota/.claude/rules/convergence-gate.md` axis-3.

---

## §3 ⚠️ HIGH-severity finding: LICENSE class

**TIER-1-DIRECT cite**: `Z:/repos/deps/GitNexus/LICENSE:1 @ 98addbd6` verbatim L1:

```
PolyForm Noncommercial License 1.0.0
```

Full URL: `<https://polyformproject.org/licenses/noncommercial/1.0.0>`

**Per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §The 7 sub-classes Probe 6 direct-file/registry blockers**: "claude-sota is permissive-license-only — MIT / Apache-2.0 / BSD acceptable; AGPLv3 / GPLv3 / SSPL / proprietary REJECT". PolyForm Noncommercial 1.0.0 is **NOT in the permissive-license whitelist** — it restricts non-commercial use only.

**Current status discrepancy**: this MCP is currently wired in `.mcp.json` per Wave 50+ install decision. The license-class check appears to have been:
- (a) Made by operator-override (acceptable per CR-7 graduated-unleash discipline), OR
- (b) Bypassed under the rationale that MCP CLI consumption ≠ source code vendoring (the npm `gitnexus` CLI binary is consumed via stdio; source code is NOT redistributed in this runtime), OR
- (c) An oversight that needs operator review

**Recommendation for Fire 11 / operator review**:
1. Verify use context: is `claude-sota-installed` being used in commercial vs non-commercial deployment?
2. If commercial: review GitNexus PolyForm Noncommercial 1.0.0 terms vs MCP CLI consumption pattern (this is a legal-policy question, NOT a technical question)
3. If non-commercial OR rationale (b) applies: document explicitly in `docs/sota-installed-manifest.md §Section 7 Code intelligence` row as `INSTALLED-PER-NONCOMMERCIAL-LICENSE-RATIONALE` with operator-cite

**Note**: there is a "Enterprise (SaaS & Self-hosted)" link to `akonlabs.com` in the README — suggests a commercial license SKU exists separately.

---

## §4 ⚠️ MEDIUM-severity finding: cryptocurrency-scam self-flag

**TIER-1-DIRECT cite**: `Z:/repos/deps/GitNexus/README.md:1-3 @ 98addbd6` verbatim:

```
# GitNexus
**⚠️ Important Notice:** GitNexus has NO official cryptocurrency, token, or coin. 
Any token/coin using the GitNexus name on Pump.fun or any other platform is 
**not affiliated with, endorsed by, or created by** this project or its maintainers. 
Do not purchase any cryptocurrency claiming association with GitNexus.
```

Per `Z:/claude-sota/.claude/rules/convergence-gate.md §Even-shorter-path: upstream self-flags impostor-domain risk`:
> "If a README opens with a `[!CAUTION] Scam alert` block warning of impostor domains distributing malware, that's a STRONG axis-2 self-flag — the upstream itself is signaling the candidate exists in a high-volume scam-attractor space"

GitNexus README opens with a cryptocurrency-scam warning (functionally equivalent to impostor-domain self-flag). This is an attractor-space signal — the project exists in a high-attention high-trust-volatility area where bad actors create lookalike forks/tokens. Per convergence-gate.md: this is a STRONG axis-2 signal.

**Disposition**: NOT auto-REJECT (the MCP is already wired + operational); but operator should be aware that GitNexus is in a scam-attractor space. Recommend:
1. Pin to specific HEAD SHA `98addbd6` in `.mcp.json` (currently wired without SHA pin — operator should pin per CR-9 install-risk discipline)
2. Re-verify HEAD SHA before every upgrade; CR-9 install-risk: "version-pin all `@latest`"
3. Monitor `https://github.com/abhigyanpatwari/GitNexus/releases` for breaking changes vs Pump.fun lookalike forks

---

## §5 ✅ Operational verify (PASS)

- ✅ `gitnexus --help` returns 0; CLI installed on PATH
- ✅ 6 subcommands documented: setup / analyze / index / serve / mcp / list
- ✅ `.mcp.json` wire correct: stdio + `gitnexus mcp` invocation
- ✅ 2 hook scripts integrate gitnexus (codex_prepush_review.py + codex_t1_consult_gate.py)
- ✅ HEAD 98addbd6 active-maintained (3 recent dependabot commits)

**Operational health**: GREEN (CLI responsive, MCP wire correct, hook integration present).

---

## §6 Recommendations (operator-decision-pending)

| Priority | Action | Rationale |
|---|---|---|
| P1 | Operator review of PolyForm Noncommercial license vs deployment context | License-class compliance question; not auto-determinable by orchestrator |
| P2 | Pin `.mcp.json:gitnexus` to specific HEAD SHA `98addbd6` per CR-9 | Currently wired without SHA pin — Marker Decay risk |
| P3 | Document `INSTALLED-PER-NONCOMMERCIAL-LICENSE-RATIONALE` status in manifest §Section 7 | Audit-trail discipline per `audit-action-loop.md` Surface stage |
| P3 | Add to `PINS.json` for upstream HEAD freshness tracking | CR-9 install-risk discipline — fresh-from-GitHub re-verify on next session |
| P4 | Periodic re-verify of upstream releases vs Pump.fun fork detection | Attractor-space monitoring per convergence-gate.md self-flag |

---

## §7 Forward direction (post-Fire-10)

Fire 10 closes (this doc ships). Operator-actionable findings surfaced in §3-§4 for Fire 11 / operator review:
- License-class rationale documentation (operator-cite required)
- HEAD SHA pinning in `.mcp.json` (operator decision per CR-9)
- Manifest §Section 7 row status flip

Fire 11 (convergence ship) will synthesize Fire 9 install-candidate ranking + Fire 10 license/operational verify into final convergence verdict per CR-3 cross-model gate.

---

## §8 Cross-references

- `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §Probe 6` direct-file/registry blockers (LICENSE class check)
- `Z:/claude-sota/.claude/rules/convergence-gate.md §Even-shorter-path: upstream self-flags impostor-domain risk` (cryptocurrency-scam self-flag interpretation)
- `Z:/claude-sota/.claude/rules/audit-action-loop.md` Wire/Surface stage (this fire's Surface deliverable)
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A (will apply on Fire 11 convergence)
- `docs/sota-installed-manifest.md §Section 7 Code intelligence` (current row status needs update per §6 P3)
- `docs/audit-refresh-W160-F1-2026-05-12.md` (Fire 1 baseline; STAND-IN-DRAFT)
- `docs/awesome-list-extraction-W160-F9-2026-05-12.md` (Fire 9 cross-reference; STAND-IN-DRAFT)
- `.claude/plans/fluttering-wandering-pond.md` Fire 10 spec
- `.mcp.json` gitnexus stdio configuration

---

## §9 Provenance

- **Fire 10 dispatch**: 2026-05-12 post-Fire-9 close (commit `a711a6b`)
- **Empirical probes**: orchestrator-direct Bash/grep/cat/git (Path P analog per FM-17.502 systemic context)
- **Plan file**: `.claude/plans/fluttering-wandering-pond.md` Fire 10
- **Input source**: `Z:/repos/deps/GitNexus/` @ HEAD `98addbd6` + `.mcp.json` + `.claude/hooks/scripts/*.py`
- **Output deliverable**: this file (`docs/gitnexus-deep-probe-W160-F10-2026-05-12.md`)
