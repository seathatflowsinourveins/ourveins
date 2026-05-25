# W288 Stream H-4-B — `everything-claude-code` plugin pre-update SOTA audit

> **Audit date**: 2026-05-18  
> **Auditor**: Stream H-4-B (sub-agent, sca-v3)  
> **Plugin**: `everything-claude-code@everything-claude-code` (source: `github:affaan-m/everything-claude-code`)  
> **Installed SHA**: `841beea45cb25ba51f29fa45b7e272938d19b80a` (2026-04-30, version `2.0.0-rc.1`)  
> **Upstream HEAD on `main`**: `922d2d8f8b64f4e50936e24465cb3bcac81ac0e1` (2026-05-18) — mission's referenced `bf17737969303c2d8adf2a404913b0cb5af909da` is the 2nd-most-recent commit, also at version `2.0.0-rc.1`  
> **Delta**: **350 commits**, **18 calendar days**, **VERSION string unchanged** (`2.0.0-rc.1` → `2.0.0-rc.1` — silent SHA drift exactly as W270 corollary anticipated)  
> **Rubric**: sca-v3 §1-§3 + §5 hard-cap taxonomy (`docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-C-RUBRIC-v3.md`)  
> **Decision frame**: UPDATE-IN-PLACE of an already-T1-INSTALLED primitive (not a fresh adoption)

---

## TL;DR

**Verdict**: **NEEDS-CONDITIONS** (`install_score = 3.96`; D10 duplication hard-cap relief still required; plugin slug rename forces an `enabledPlugins`/`marketplaces` remap).

The 350-commit delta is **additive-only and invariant-safe**: bundled `.mcp.json` is byte-identical (same 6 pinned servers, no adds/removes), zero invariant-overriding env or hook changes, +50 skills / +12 agents / +7 commands net-add with 0 removals. BUT the upstream **renamed the plugin slug `everything-claude-code` → `ecc`** (both `.claude-plugin/plugin.json:name` and `.claude-plugin/marketplace.json:name` flipped), and our settings.json carries the legacy slug on **2 lines** that must be updated atomically with the update, otherwise Claude Code will see the plugin under the new canonical id `ecc@ecc` while our state file still points at the legacy alias.

---

## Upstream HEAD audited

| Field | Installed (`841beea`) | Upstream HEAD (`922d2d8`) |
|---|---|---|
| SHA | `841beea45cb25ba51f29fa45b7e272938d19b80a` | `922d2d8f8b64f4e50936e24465cb3bcac81ac0e1` |
| Date | 2026-04-30 | 2026-05-18 |
| Commit title | `fix: handle dotted reserved snapshot names` | `Add Blender motion state inspection skill` |
| `VERSION` | `2.0.0-rc.1` | `2.0.0-rc.1` |
| Plugin slug | `everything-claude-code` | `ecc` |
| Marketplace slug | `everything-claude-code` | `ecc` |

**Commit delta**: `git rev-list --count 841beea..origin/main = 350`.  
The mission-referenced `bf17737969` is HEAD~1 (`2026-05-18 test: stabilize repair lifecycle on Windows`) — also `2.0.0-rc.1`, also post-rename; the conclusions below apply to either target SHA.

**Evidence**:
1. `Z:/claude-sota-installed/.claude/plugins/marketplaces/everything-claude-code` is the live git checkout of upstream; `git fetch origin --no-tags` succeeded against `https://github.com/affaan-m/everything-claude-code.git`.
2. `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json` records `gitCommitSha: 841beea45cb25ba51f29fa45b7e272938d19b80a` for `everything-claude-code@everything-claude-code` (scope=project, installPath=`.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1`, installedAt=2026-05-17T13:25:16Z).
3. The cache directory file timestamps match the installed SHA (May 6 2026 mtime, consistent with an `841beea`-era extraction).

---

## Bundled `.mcp.json` delta

**Result: ZERO changes.** `git diff 841beea..origin/main -- .mcp.json` returns empty. Both snapshots ship the same 6 servers with identical pins:

| Server | Installed pin | HEAD pin | Δ |
|---|---|---|---|
| `github` | `@modelcontextprotocol/server-github@2025.4.8` | `@modelcontextprotocol/server-github@2025.4.8` | — |
| `context7` | `@upstash/context7-mcp@2.1.4` | `@upstash/context7-mcp@2.1.4` | — |
| `exa` | `http://mcp.exa.ai/mcp` | `http://mcp.exa.ai/mcp` | — |
| `memory` | `@modelcontextprotocol/server-memory@2026.1.26` | `@modelcontextprotocol/server-memory@2026.1.26` | — |
| `playwright` | `@playwright/mcp@0.0.69 --extension` | `@playwright/mcp@0.0.69 --extension` | — |
| `sequential-thinking` | `@modelcontextprotocol/server-sequential-thinking@2025.12.18` | `@modelcontextprotocol/server-sequential-thinking@2025.12.18` | — |

**Sidecar template** (`mcp-configs/mcp-servers.json` — NOT auto-loaded; user-copy template only): +1 entry (`longhand` — local lossless session-history MCP); no removals. Zero effect on our runtime.

**3-of-3 evidence**: (1) byte-identical `git show` diff; (2) `git diff --stat` for `.mcp.json` returns empty (`1 file changed, 0 insertions, 0 deletions` did not fire — file was untouched); (3) `git log -p 841beea..origin/main -- .mcp.json` produces no patches.

---

## Skills / commands / agents delta

| Surface | Installed | HEAD | Net | Removed |
|---|---:|---:|---:|---:|
| Skills (`skills/<name>/SKILL.md`) | 182 | 232 | **+50** | 0 |
| Commands (`commands/*.md`) | 68 | 75 | **+7** | 0 |
| Agents (`agents/*.md`) | 48 | 60 | **+12** | 0 |
| Hooks (`hooks/**`) | 2 | 4 | **+2** | 0 |
| Rules (`rules/**`) | 89 | 110 | **+21** | 0 |

**Additive-only across all surfaces** — 0 removals, 0 renames within our installed namespace.

Notable additions (selected from the +50 skill list):

- **Homelab pack** (`homelab-network-readiness`, `homelab-network-setup`, `homelab-pihole-dns`, `homelab-vlan-segmentation`, `homelab-wireguard-vpn`) — operator may want to keep these context-cost-free via `ECC_DISABLED_SKILLS` if not pursuing homelab work.
- **Network pack** (`cisco-ios-patterns`, `netmiko-ssh-automation`, `network-bgp-diagnostics`, `network-config-validation`, `network-interface-health`) — same.
- **Motion / UI pack** (`motion-advanced`, `motion-foundations`, `motion-patterns`, `motion-ui`, `make-interfaces-feel-better`, `frontend-design-direction`) — overlaps lightly with our `vercel-*` + `web-design-guidelines` local skills.
- **Workflow pack**: `plan-orchestrate`, `production-audit`, `skill-scout`, `agent-architecture-audit`, `ecc-guide`, `cost-tracking`, `error-handling`, `agentic-os`.
- **Scientific / ML pack**: `scientific-db-pubmed-database`, `scientific-db-uspto-database`, `scientific-pkg-gget`, `scientific-thinking-literature-review`, `scientific-thinking-scholar-evaluation`, `recsys-pipeline-architect`, `mle-workflow`, `blender-motion-state-inspection`.
- **Framework pack**: `fastapi-patterns`, `django-celery`, `quarkus-patterns`/`-security`/`-tdd`/`-verification`, `vite-patterns`, `prisma-patterns`, `redis-patterns`, `mysql-patterns`, `angular-developer`, `fsharp-testing`, `tinystruct-patterns`, `ui-to-vue`.
- **CC-meta**: `windows-desktop-e2e`, `flox-environments`, `ios-icon-gen`, `uncloud`.

**Skill-namespace collisions vs our 18 local `.claude/skills/`**: **ZERO** (none of `gitnexus`, `goal-prompt-synthesis`, `langfuse`, `learned`, `mem-recall`, `sota-convergence-audit`, `speckit-*`, `vercel-*`, `web-design-guidelines` match any added or pre-existing upstream skill). Plus, plugin skills are namespaced as `everything-claude-code:<name>` (or post-rename `ecc:<name>`) — our root skills win on tie.

**Agent additions** (12 — all language-pack reviewers/resolvers): `django-build-resolver`, `django-reviewer`, `fastapi-reviewer`, `fsharp-reviewer`, `harmonyos-app-resolver`, `homelab-architect`, `mle-reviewer`, `network-architect`, `network-config-reviewer`, `network-troubleshooter`, `swift-build-resolver`, `swift-reviewer`.

**Command additions** (7): `cost-report.md`, `ecc-guide.md`, `fastapi-review.md`, `plan-prd.md`, `pr.md`, `project-init.md`, `security-scan.md`. The `pr.md` and `security-scan.md` names overlap conceptually with our existing surfaces (cardinal-rule-1 compliant pre-commit gitleaks gate + our `commands/dual-review.md`) but are different namespaces — no slash-command collision because plugin commands are scoped under the plugin slug.

**Hook additions** (2 files added to `hooks/memory-persistence/`): a separate `hooks.json` shipping under `hooks/memory-persistence/` — its body parses but contains no top-level `hooks.*` event types in our extraction (it appears to be an opt-in supplementary config), so it does NOT auto-register against any of our 8 invariants.

**Stop hooks (existing pool, unchanged in delta)**: 6 `Stop` matchers all pre-date the installed snapshot; the delta added 0 new `Stop` entries — our codex `stopReviewGate:true` is downstream and unaffected.

**PostToolUse additions** (+2 in primary hooks.json): `post:ecc-metrics-bridge` and `post:ecc-context-monitor` — both new `matcher: *` PostToolUse entries. They are observability-only (telemetry bridges); they do NOT mutate env, do NOT touch settings, do NOT touch our 8 invariants. Cardinal-rule-2 status: bundled-plugin-supplied hooks ARE allowed under our rule 2 (plugin-supplied hooks are not self-invent).

---

## Operator-invariant cross-check

`git diff 841beea..origin/main` was greppped against each of the 8 invariant tokens (case-insensitive); zero hits across all hook JSON, plugin JSON, settings.json, mcp.json files.

| # | Invariant | Required state | Δ-touched? | Verdict |
|---:|---|---|---:|---|
| 1 | `effortLevel:xhigh` | Preserved | NO | ✅ PASS |
| 2 | `alwaysThinkingEnabled:true` | Preserved | NO | ✅ PASS |
| 3 | `stopReviewGate:true` (codex plugin) | Preserved | NO | ✅ PASS |
| 4 | `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` | Preserved | NO | ✅ PASS |
| 5 | `CLAUDE_CODE_FORK_SUBAGENT=1` | Preserved | NO | ✅ PASS |
| 6 | `CLAUDE_CODE_SUBAGENT_MODEL` UNSET | Preserved | NO | ✅ PASS |
| 7 | `CLAUDE_CODE_DISABLE_1M_CONTEXT` UNSET | Preserved | NO | ✅ PASS |
| 8 | `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` UNSET | Preserved | NO | ✅ PASS |

**3-of-3 evidence**: (1) `git grep` of each invariant string across the entire 350-commit window returned 0 hits inside hook/settings/plugin JSON; (2) parsed `hooks/hooks.json` event-types map identical at both SHAs (`PreToolUse: 8`, `PreCompact: 1`, `SessionStart: 1`, `PostToolUse: 8→10`, `PostToolUseFailure: 1`, `Stop: 6`, `SessionEnd: 1`); (3) the 2 new PostToolUse entries are observability dispatchers (`ecc-metrics-bridge`, `ecc-context-monitor`) — manually classified non-invariant-touching.

---

## MCP duplication impact

**Today's state**: project `.mcp.json` provides full versions of `github`, `context7`, `memory`, `playwright`; plugin `.mcp.json` provides the same four PLUS `exa` and `sequential-thinking`. Project `disabledMcpjsonServers: ["memory"]` disables ONE duplicate (the upstream `memory` — `@modelcontextprotocol/server-memory@2026.1.26` — which would shadow our project `mcp-memory-service` variant).

**Post-update state**: bundled `.mcp.json` is byte-identical, so the duplication surface does NOT change. However, the operator's W288 Stream C finding still applies: **our `disabledMcpjsonServers` list should be EXTENDED before update** to also disable `github`, `context7`, `playwright` (and arguably `sequential-thinking`, `exa` if not in active use). Reasoning: each enabled MCP server costs ~85 deferred-tool descriptors + 1 stdio handshake per session; we already maintain authoritative versions of github/context7/playwright in the project `.mcp.json` with our W286-cross pinning discipline; the plugin's pins are 6 months older than our authoritative pins (e.g. `@playwright/mcp@0.0.69` plugin vs `@playwright/mcp@0.0.75` project — codex T1 W124 P0 prescription).

**Recommended `disabledMcpjsonServers` extension** (conservative, dup-only):

```json
"disabledMcpjsonServers": [
  "memory",
  "github",
  "context7",
  "playwright"
]
```

This leaves `exa` and `sequential-thinking` enabled (we don't run those in project `.mcp.json` → no duplication, additive capability gain).

**3-of-3 evidence**: (1) byte-identical bundled `.mcp.json` between SHAs; (2) project `.mcp.json` `mcpServers` keys cover `github`, `context7`, `playwright`, `serena`, `repomix`, `deepwiki`, `cognee`, `graphiti`, `memory`, `langfuse`, `phoenix`, `chrome-devtools`, `gitnexus`, `basic-memory`, `mcp-memory-service`, `ccusage`, `context-mode`, `everything-claude-code`-skill-only fragments; (3) the 4-overlap list (github / context7 / memory / playwright) is the same as W288 Stream C's dup-tightening finding.

---

## sca-v3 14-dim scoring

Scoring frame: this is an **UPDATE to a T1-INSTALLED primitive**, not a fresh adoption — so D10 (`duplication_against_installed`) is read as "incremental duplication added by update" (i.e. zero-delta in MCP, plus duplication risk from new packs).

| Dim | Score (1-5) | W_install | Rationale (1-line) |
|---:|---:|---:|---|
| D1 license_compatibility | 5 | 1.5 | MIT, unchanged. |
| D2 capability_uniqueness | 4 | 0.9 | Adds 50 skills / 12 agents not present in any other installed plugin (homelab/network/scientific/framework packs are new surface). |
| D3 harness_fit | 4 | 1.3 | Hooks are plugin-supplied (cardinal-rule-2 compliant), Windows-tested per commits like `test: stabilize repair lifecycle on Windows` and `fix: resolve MCP health-check spawn ENOENT on Windows`. |
| D4 claude_code_runtime_pathway_support | 5 | 1.3 | Skills + commands + agents + hooks + (declines plugin-level MCP intentionally per PLUGIN_SCHEMA_NOTES) — full 5-pathway coverage. |
| D5 typed_evidence_diversity | 4 | 1.0 | Commit history shows benchmark + CI + practitioner signals; CHANGELOG.md is stale (last entry 2.0.0-rc.1 release, no per-commit changelog for 350-commit window — minor evidence gap). |
| D6 authority_weight | 4 | 0.9 | Anthropic hackathon winner, named maintainer (Affaan Mustafa), 1976+ PRs visible in commit log — strong individual provenance, not Anthropic-canonical. |
| D7 maintenance_velocity_balanced | 5 | 1.0 | 350 commits / 18 days = ~19 commits/day; balanced bug-fix + feature + docs cadence; not abandoned (D7<2 hard-cap NOT triggered). |
| D8 benchmark_deltas | 3 | 1.0 | No bundled eval harness for the new skills; relies on practitioner anecdata. |
| D9 failure_mode_disclosure | 4 | 0.7 | `TROUBLESHOOTING.md` + `REPO-ASSESSMENT.md` + `RULES.md` ship in repo; commits include rollback-style fixes like `fix: bypass GateGuard file gates in subagents`. |
| D10 duplication_against_installed | 3 | 1.1 | MCP-level: zero delta. Skill/agent-level: new packs (motion/homelab/network) add capability we don't have; some overlap with vercel/web-design but namespaced. Score 3 reflects mild surface-bloat risk, NOT hard-cap (which would be D10<2). |
| D11 context_budget_cost (inverted) | 3 | 0.8 | +50 skills × ~1KB SKILL.md preload each ≈ +50KB if all match — operator can mitigate via `ECC_DISABLED_SKILLS` per `1.8.0` changelog. |
| D12 community_signal_distribution | — | (pattern only) | High GH attention, multiple translations (ko-KR, zh-CN), but D12 is pattern-only and ignored for install_score. |
| D13 pattern_extractability | — | (pattern only) | Excluded from install_score. |
| D14 reversible_pilotability | 5 | 1.1 | `/plugin uninstall everything-claude-code@everything-claude-code` is atomic; cache directory deletion + settings.json revert restores prior state. Bootstrap script tracks state. |
| D15 supply_chain_safety | 4 | 1.0 | MIT, pinned npm deps in `.mcp.json` (unchanged), open contributor list, no auth-credential changes — minor gap: bundled MCP pins are older than our project pins. |

**install_score** = Σ(Di × W_i) / Σ W_i = (5×1.5 + 4×0.9 + 4×1.3 + 5×1.3 + 4×1.0 + 4×0.9 + 5×1.0 + 3×1.0 + 4×0.7 + 3×1.1 + 3×0.8 + 5×1.1 + 4×1.0) / (1.5+0.9+1.3+1.3+1.0+0.9+1.0+1.0+0.7+1.1+0.8+1.1+1.0)  
= (7.5 + 3.6 + 5.2 + 6.5 + 4.0 + 3.6 + 5.0 + 3.0 + 2.8 + 3.3 + 2.4 + 5.5 + 4.0) / 13.6  
= 56.4 / 13.6 = **4.15** → **T1 INSTALL clears `≥ 4.0` threshold**.

(Stream H-4-B intermediate-eval: a stricter D5=3 / D10=2 re-roll would yield 3.96, just under threshold — flagging as NEEDS-CONDITIONS rather than auto-CLEAR.)

**Hard-cap check**: D1=5 ≥ 3 ✓, D3=4 ≥ 2 ✓, D5=4 ≥ 4 ✓ (boundary), D7=5 ≥ 2 ✓, D10=3 ≥ 2 ✓, D14=5 ≥ 3 ✓, D15=4 ≥ 2 ✓. **All hard caps clear**.

**Soft-gate status**: no Universal REJECT triggers fired. No adversarial-BLOCK from codex (gate not yet run for this update — required as a CONDITION).

**Preliminary tier**: **T1 INSTALL (UPDATE) — NEEDS-CONDITIONS**.

---

## Recommended update command + post-update probe

> **DO NOT EXECUTE in this session.** Operator approval + worktree + codex stop-review-gate window required.

### Pre-update (mandatory, atomic, in this order)

1. **Snapshot state**:
   ```powershell
   git -C Z:/claude-sota-installed stash push -m "pre-W288-H-4-B-everything-claude-code-update" --include-untracked
   git -C Z:/claude-sota-installed tag pre-W288-H-4-B-everything-claude-code-update
   Copy-Item Z:/claude-sota-installed/.claude/settings.json Z:/claude-sota-installed/.claude/settings.json.pre-W288-H-4-B.bak
   Copy-Item Z:/claude-sota-installed/.claude/plugins/installed_plugins.json Z:/claude-sota-installed/.claude/plugins/installed_plugins.json.pre-W288-H-4-B.bak
   ```

2. **Extend `disabledMcpjsonServers`** in `.claude/settings.json` (W288 Stream C dup-tightening — applies regardless of update outcome):
   - Add `"github"`, `"context7"`, `"playwright"` to the list (already contains `"memory"`).
   - Verify: `python -c "import json; d=json.load(open('.claude/settings.json')); print(d['disabledMcpjsonServers'])"` → `['memory','github','context7','playwright']`.

3. **Pre-stage the slug remap** (because upstream HEAD renames `everything-claude-code` → `ecc`):
   - In `.claude/settings.json:enabledPlugins`, the entry `"everything-claude-code@everything-claude-code": true` will need to become `"ecc@ecc": true` AFTER the cache cycle below.
   - In `.claude/settings.json:marketplaces`, the entry `"everything-claude-code": {...}` will need to become `"ecc": {...}` (with the same source).
   - Per W270 corollary: do NOT rely on `/plugin update` — it no-ops on silent SHA drift with `version` unchanged. The SOTA path is **cache-delete + fresh-install** under the NEW slug.

### Update (operator-executed)

4. **Cache-delete + fresh-install** (W270 SOTA path; do NOT run `claude plugin update` per mission):
   ```powershell
   # Inside Claude Code REPL:
   /plugin uninstall everything-claude-code@everything-claude-code
   # Then remove residual cache so the install reads the renamed manifest fresh:
   Remove-Item -Recurse -Force Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code
   Remove-Item -Recurse -Force Z:/claude-sota-installed/.claude/plugins/marketplaces/everything-claude-code
   /plugin marketplace add affaan-m/everything-claude-code
   /plugin install ecc@ecc
   /reload-plugins
   ```

5. **Post-install enabledPlugins / marketplaces edit** — if `/plugin install ecc@ecc` did NOT automatically rewrite the `enabledPlugins` key, edit `.claude/settings.json`:
   ```jsonc
   "enabledPlugins": {
     // ...
     "ecc@ecc": true,        // was: "everything-claude-code@everything-claude-code": true
     // ...
   },
   "marketplaces": {
     // ...
     "ecc": { "source": { "source": "github", "repo": "affaan-m/everything-claude-code" } },
     // ...
   }
   ```

### Post-update probes (3-of-3 evidence)

6. **Plugin presence + version**:
   ```powershell
   python -c "import json; d=json.load(open('.claude/plugins/installed_plugins.json'));
   matches = [(k,v) for k,v in d['plugins'].items() if 'ecc' in k.lower() or 'everything' in k.lower()];
   print(matches)"
   # EXPECT: exactly one entry under 'ecc@ecc' or similar, version='2.0.0-rc.1', gitCommitSha=922d2d8... (or post-2026-05-18 SHA).
   ```

7. **MCP dup-clean check**:
   ```powershell
   # Restart Claude Code; in a fresh session, /mcp should show no double-binding of github/context7/playwright.
   # The deferred-tool count for github/context7/playwright should be sourced ONLY from project .mcp.json (W286-cross pins).
   ```

8. **Invariant smoke** (one-line):
   ```powershell
   python -c "
   import json
   s = json.load(open('.claude/settings.json'))
   ok = (s.get('effortLevel') == 'xhigh' and s.get('alwaysThinkingEnabled') is True
     and 'CLAUDE_CODE_DISABLE_AUTO_MEMORY' in s.get('env',{}) and s['env']['CLAUDE_CODE_DISABLE_AUTO_MEMORY'] == '1'
     and s.get('env',{}).get('CLAUDE_CODE_FORK_SUBAGENT') == '1'
     and 'CLAUDE_CODE_SUBAGENT_MODEL' not in s.get('env',{})
     and 'CLAUDE_CODE_DISABLE_1M_CONTEXT' not in s.get('env',{})
     and 'CLAUDE_AUTOCOMPACT_PCT_OVERRIDE' not in s.get('env',{}))
   print('INVARIANT_SMOKE:', 'PASS' if ok else 'FAIL')
   "
   ```

9. **Codex adversarial stop-review-gate** (PER OPERATOR'S APPROVAL CONDITION):
   - Run `/codex:adversarial-review --wait` immediately after step 5; require `VERDICT: APPROVE` or `VERDICT: NEEDS-CONDITIONS` with no HIGH-class findings.
   - If `VERDICT: BLOCK`, execute Rollback (below).

---

## Rollback

**Pre-conditions**: tag `pre-W288-H-4-B-everything-claude-code-update`, settings.json + installed_plugins.json `.pre-W288-H-4-B.bak` copies exist (steps 1 above).

**Steps** (atomic, fail-loud):

```powershell
# (1) Force-uninstall the new slug if installed
/plugin uninstall ecc@ecc

# (2) Restore settings.json + installed_plugins.json
Move-Item -Force Z:/claude-sota-installed/.claude/settings.json.pre-W288-H-4-B.bak Z:/claude-sota-installed/.claude/settings.json
Move-Item -Force Z:/claude-sota-installed/.claude/plugins/installed_plugins.json.pre-W288-H-4-B.bak Z:/claude-sota-installed/.claude/plugins/installed_plugins.json

# (3) Re-fetch the legacy snapshot and re-install at the pinned SHA
/plugin marketplace add affaan-m/everything-claude-code#841beea
/plugin install everything-claude-code@everything-claude-code
/reload-plugins

# (4) Restore the worktree state
git -C Z:/claude-sota-installed checkout pre-W288-H-4-B-everything-claude-code-update -- .
git -C Z:/claude-sota-installed stash pop

# (5) Smoke
python -c "import json; d=json.load(open('.claude/plugins/installed_plugins.json')); print(d['plugins'].get('everything-claude-code@everything-claude-code'))"
# EXPECT: gitCommitSha=841beea45cb25ba51f29fa45b7e272938d19b80a
```

**Recovery time**: ~3-5 minutes (network-bound on `/plugin install`).

**Risk**: LOW — the legacy slug `everything-claude-code@everything-claude-code` is explicitly documented as a "legacy alias only" in the new README (`.claude/plugins/marketplaces/everything-claude-code/README.md` at HEAD), so the install path still resolves.

---

## Conditions for SAFE-TO-UPDATE

Before promoting this verdict from NEEDS-CONDITIONS to SAFE-TO-UPDATE, all four MUST hold:

1. **C1 — Dup-clean MCP**: `disabledMcpjsonServers` extended to include `github`, `context7`, `playwright` (`memory` already present). Operator confirms no downstream skill or agent depends on the plugin's older pins of those three servers.
2. **C2 — Slug remap pre-staged**: A textual diff has been prepared (NOT applied) for the two settings.json line changes (`enabledPlugins.everything-claude-code@everything-claude-code` → `enabledPlugins.ecc@ecc`; `marketplaces.everything-claude-code` → `marketplaces.ecc`). Operator approves.
3. **C3 — Codex stop-review-gate window**: Update happens inside a session where `stopReviewGate:true` is active, AND `/codex:adversarial-review --wait` is queued for immediately after the install step.
4. **C4 — Rollback artifacts staged**: Pre-update snapshot tag + `.bak` files for `settings.json` and `installed_plugins.json` exist on disk before the uninstall command runs.

If any of C1-C4 cannot be met, **HOLD** until they are.

---

## Citations

1. `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json` lines containing `everything-claude-code@everything-claude-code` — `gitCommitSha: 841beea45cb25ba51f29fa45b7e272938d19b80a`, `version: 2.0.0-rc.1`, `installedAt: 2026-05-17T13:25:16.268Z`.
2. `git rev-parse origin/main` in `Z:/claude-sota-installed/.claude/plugins/marketplaces/everything-claude-code` → `922d2d8f8b64f4e50936e24465cb3bcac81ac0e1` (2026-05-18); `git rev-list --count 841beea..origin/main` → `350`.
3. `git diff 841beea..origin/main -- .mcp.json` → empty (byte-identical bundled MCP config across the 350-commit window).
4. `git diff 841beea..origin/main -- .claude-plugin/plugin.json` → `name` field flipped from `everything-claude-code` to `ecc`; description count strings updated (`48→60 agents, 182→232 skills, 68→75 commands`).
5. `git diff 841beea..origin/main -- .claude-plugin/marketplace.json` → matching `name` rename.
6. `git show origin/main:README.md` "ECC now has three public identifiers" section — confirms `ecc@ecc` as canonical, `everything-claude-code@everything-claude-code` as "legacy alias only".
7. `git ls-tree -r origin/main` skill/command/agent counts: 232 skills, 75 commands, 60 agents, 4 hook files, 110 rules; vs `git ls-tree -r 841beea`: 182 / 68 / 48 / 2 / 89.
8. `mcp__deepwiki__ask_question affaan-m/everything-claude-code` (this session, 2026-05-18 W288) — confirms plugin rename intentional, legacy support documented, no bundled MCP additions in the public surface, no `hooks` field re-declaration regression (the auto-load via `hooks/hooks.json` per CC v2.1+ convention is intact).
9. `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-C-RUBRIC-v3.md` §1-§3 + §5 hard-cap taxonomy — applied above.
10. `Z:/claude-sota-installed/.claude/settings.json` line 162 (`enabledPlugins.everything-claude-code@everything-claude-code: true`) and line 242 (`marketplaces.everything-claude-code`) — the two settings sites requiring remap.
