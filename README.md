# claude-sota-installed — install-only SOTA Claude Code runtime

> **Purpose**: A canonical Claude Code runtime where **every primitive is sourced from an upstream SOTA repository at HEAD**, installed via plugin marketplace / MCP server / CLI binary / direct `.claude/*` import. Zero hand-coded rules, agents, or skills inside this runtime — only bootstrap scaffolding (this README, `tools/eee.ps1`, `CLAUDE.md` cardinal rules, `CLAUDE.local.md` env block, `.claude/settings.json` minimum baseline).
>
> **Sibling runtime**: `Z:\claude-sota\` (active SOTA-evolving runtime; this `claude-sota-installed` is the install-only canonical reference baseline).
> **Parent runtime**: `Z:\claude\` (CCC backup, untouched per `claude-sota` cutover plan).

## Bootstrap status (P0 foundation — Wave 50 fire 1)

| Component | File | Status | SOTA cite |
|---|---|---|---|
| Launcher (PowerShell entrypoint) | `tools/eee.ps1` | DRAFT | `code.claude.com/docs/en/setup` + adapted from `Z:/claude-sota/tools/sss.ps1` |
| Launcher (cmd shim) | `bin/eee.cmd` | DRAFT | `code.claude.com/docs/en/setup` |
| Cardinal rules | `CLAUDE.md` | DRAFT | `Z:/claude-sota/CLAUDE.md` cardinal-rules-1-4 + CCBP `Z:/repos/deps/claude-code-best-practice-shan/` HEAD `64fffd53` |
| Env block | `CLAUDE.local.md` | DRAFT | adapted from `Z:/claude-sota/CLAUDE.local.md` ENV blocks (a)-(g) |
| MCP registry | `.claude/settings.json` + `.mcp.json` | EMPTY (install gates each entry) | per-MCP at install time |
| SOTA-installed manifest | `docs/sota-installed-manifest.md` | HEADER ONLY | populated per-install |
| Install provenance log | `docs/install-provenance.md` | HEADER ONLY | populated per-install |
| Install discipline | `docs/install-from-github-discipline.md` | DRAFT | user-trigger 2026-05-06 "pull from newest github before install" |

## Hard constraints

1. **NO hand-coded primitives.** Every rule, agent, skill, command, hook MUST come from an upstream SOTA install. The exceptions are this README, `tools/eee.ps1`, `bin/eee.cmd`, `CLAUDE.md`, `CLAUDE.local.md`, `.gitignore`, `.claude/settings.json` (minimum baseline) — these are bootstrap scaffolding, not architectural primitives.
2. **Pull from newest GitHub before install.** Every install command MUST refresh the upstream source first (`gh release download` / `npm view <pkg> version` + `npm install -g <pkg>@latest` / `git clone --depth 1 <upstream>` / `gh repo clone <upstream>` then `git fetch && git pull`). NEVER copy from `Z:/repos/deps/<repo>/` (those may be stale per Marker Decay corollary). Cite anchor: user directive 2026-05-06.
3. **Every install logged with HEAD SHA.** Every install entry in `docs/sota-installed-manifest.md` records: install command + upstream HEAD SHA at install time + axis-1+2+3 verdict + Probe DAG outcome. Per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md`.
4. **Convergence-gate AUTO-PROCEED.** Per user directive 2026-05-06 ("completly new sota and native install repos") + sibling-codified memory `feedback_always_ship_with_sota_convergence_2026_05_06.md` (CITE-REFERENCE-ONLY at sibling — not yet installed in this runtime per Wave 50 Agent C P2-4): when axis-1+2+3 PASS + install verified, proceed without per-install user gate. Operator gates only on (a) novel install patterns, (b) destructive operations, (c) cross-runtime sync decisions.
5. **Graduated unleash (cardinal-rule-7).** `.claude/settings.json` Phase 1 (NOW) carries `defaultMode: "default"` with empty `allow[]` — every non-SOTA-cited operation requires explicit confirm. Phase 2 (post-Tier-0+1+2 install + smoke-probe PASS) populates `allow[]` per installed-and-cited primitive. Phase 3 (mature) transitions to `defaultMode: "bypassPermissions"` per Wave 47 Agent A REAL GPT-5.5 BRIDGE-MODE empirical validation (`Z:/claude-sota/.claude/projects/Z--claude-sota/memory/feedback_bypasspermissions_real_gpt5_bridge_mode_validated_2026_05_05.md`). The full-unleashed destination requires SOTA harness primitives installed FIRST per cardinal-rule-7 phase-transition gates. (Wave 50 fire 4 Pattern A close — Agent C-redo P1-1 fix-forward.)

## Install topology (planned — design phase Wave 50 fire 1)

| Layer | Install pattern | Examples (axis-pass candidates) |
|---|---|---|
| **Plugin marketplace** | `/plugin install <repo>` against marketplace.json | obra/superpowers (180k★) / mattpocock/skills (62k★) / affaan-m/everything-claude-code (1.10.0 cached at parent claude-sota) |
| **MCP server (npx/uvx/direct-binary)** | `.mcp.json` entry pointing at `npx -y <pkg>@latest` or pinned `Z:/tools/...exe` | `@modelcontextprotocol/server-github` / `mcp__serena__*` / `gitnexus` / `@perplexity-ai/mcp-server` |
| **MCP server (HTTP)** | `.mcp.json` entry with `"type": "http"` + `"url"` | context7 / deepwiki |
| **CLI binary** | `npm install -g` / `uvx install` / `cargo install` / `gh release download` | rtk-ai/rtk / ryoppippi/ccusage / openai/codex |
| **Direct .claude/* import** | `git clone --depth 1` then symlink/copy `<repo>/.claude/{agents,skills,commands,rules}/` into runtime | repos shipping `.claude/*` artifacts (e.g., parts of CCBP) |
| **Codex backend (T1-T7)** | `CODEX_HOME` env redirect + `codex auth login` | openai/codex (already at `Z:/claude-sota-state/.codex` per parent CLAUDE.local.md ENV (f)) |

## Launch

```powershell
# After P0 foundation lands + Tier-A installs (per docs/sota-installed-manifest.md):
eee                          # launches Claude Code with CLAUDE_CONFIG_DIR=Z:/claude-sota-installed/.claude
eee --worktree feature-x     # parallel-session-isolation per Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md
```

## Layout invariant

- `tools/eee.ps1` — PowerShell entrypoint (Z:-portable env block)
- `bin/eee.cmd` — cmd shim → `tools/eee.ps1`
- `.claude/settings.json` — minimum baseline only; per-install settings additions deferred to install entries in manifest
- `.claude/plugins/cache/` — populated by `/plugin install` commands; never hand-edited
- `.claude/marketplaces/` — marketplace.json sources for plugin discovery
- `.mcp.json` — MCP server registry (ALL entries cite-anchored to upstream install command)
- `docs/sota-installed-manifest.md` — single source of truth for what's installed + why + axis verdicts
- `docs/install-provenance.md` — append-only install log (timestamps, commands, HEAD SHAs, outcomes)
- `docs/install-from-github-discipline.md` — the "pull from newest" rule that gates every install

## W375 OpenHands Dispatch — first-time setup

After cloning + checking out the W375 wave worktree:

1. Install pre-commit hooks (both stages):
   ```bash
   pre-commit install --hook-type pre-commit --hook-type commit-msg
   ```
   This installs BOTH the `pre-commit` stage hooks (gitleaks, ruff, etc.) AND the `commit-msg`
   stage hooks — including `cr6-w375-eval-regression` (SWE-Bench-Verified-50 regression gate)
   and `commitlint`/`codex-trailer-gate`. The `default_install_hook_types: [pre-commit, commit-msg]`
   top-level key in `.pre-commit-config.yaml` ensures portability: `pre-commit install` (no flags)
   installs both types automatically on fresh clones (codex r6 P2-3).

   The `cr6-w375-eval-regression` hook runs `tools/eval_gate.py --commit-msg-file <COMMIT_EDITMSG>`
   at commit-msg stage. It either:
   - Honors an `OVERRIDE-W375-EVAL: <rationale>` trailer in the commit message (bypass), OR
   - Compares the SWE-Bench-Verified-50 score in `docs/architecture/W375-EVAL-RESULTS/last-ship-evidence.md`
     against `last-ship` from `ship-history.jsonl` (5 pp regression band blocks with exit 2).
   - Bootstrap path (no `ship-history.jsonl` yet): exits 0 (no prior baseline to compare against).

2. Set the HMAC token for FastMCP two-phase confirm (rotate periodically):
   ```powershell
   $env:OPENHANDS_DISPATCH_TOKEN = (python -c "import secrets; print(secrets.token_urlsafe(32))")
   ```

3. One-time OpenHands subscription_login OAuth dance (interactive browser):
   ```bash
   python -c "from openhands.sdk import LLM; LLM.subscription_login(vendor='openai', model='gpt-5.3-codex', force_login=False, open_browser=True)"
   ```

4. Reload MCP servers in Claude Code:
   `/mcp` then Reconnect

5. Smoke test the W375 CLI:
   ```bash
   python -m tools.dispatch_temporal doctor
   ```
