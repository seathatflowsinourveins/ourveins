# W309 Stream B — Phoenix MCP Cleanup

> **Wave**: W309; **Stream**: B; **Closes**: W307 Stream C Phoenix MCP backend dead-letter HIGH (carried 2 waves; same finding tracked as W295 op-action HIGH-2).
> **Cost**: $0 (read-only probes + zero edits this wave — Action C selected).
> **Owner**: agent-B-phoenix-cleanup; **Files owned**: `.mcp.json` (no edit applied), this doc.

## §1 Pre-cleanup state

### 1.1 Phoenix entry in `.mcp.json` (lines 103-107)

```json
"phoenix": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@arizeai/phoenix-mcp@4.0.13", "--baseUrl", "http://127.0.0.1:16006"]
},
```

Pinned `@arizeai/phoenix-mcp@4.0.13` (CR-9 compliant per W286-cross "npx pinned-version" contract — CLAUDE.md cardinal-rule-2 ratification 2026-05-18).

### 1.2 Port :16006 probe

```text
python -c "...connect_ex(('127.0.0.1',16006))..." → CLOSED rc=10035
```

`rc=10035` = WSAEWOULDBLOCK on Windows = connection refused — no process bound.

### 1.3 `disabledMcpjsonServers` state (`.claude/settings.json:88-95`)

```json
"disabledMcpjsonServers": [
  "memory",
  "github",
  "context7",
  "playwright",
  "graphiti",
  "phoenix"      // ← already present; phoenix is NEUTERED at the harness level
]
```

Phoenix MCP server **is already gated off** — Claude Code will not spawn `npx @arizeai/phoenix-mcp@4.0.13 --baseUrl :16006` on startup; no `mcp__phoenix__*` tools surface in the deferred-tool catalog as live invocation paths.

### 1.4 OTEL endpoint state (`.claude/settings.json:29`)

```json
"OTEL_EXPORTER_OTLP_TRACES_ENDPOINT": "http://127.0.0.1:3000/api/public/otel/v1/traces"
```

Repointed by autonomous commit `baab2df` 2026-05-18 from `http://127.0.0.1:16006/v1/traces` → Langfuse `:3000`. Phoenix is no longer the OTLP target — span dead-letter FM-class silent failure closed.

### 1.5 Recent-wave usage scan

`grep -r "mcp__phoenix__" docs/architecture/W3* → 0 matches`.

Zero `mcp__phoenix__*` tool invocations across W302..W309 docs. The Phoenix MCP toolset is listed in the runtime's deferred-tool catalog (visible to ToolSearch) but has not been called by any agent in 8 waves.

### 1.6 Cross-reference — W307 Stream C ratification

`docs/architecture/W307-TOP3-CHALLENGER-AUDITS-AND-AUTOMATION/W307-STREAM-C-OTEL-GENAI-AUDIT.md:97,385-390,497`:

> "Phoenix MCP (currently broken per op-action HIGH-2; would be running on :16006 if restored)" ... "Phoenix MCP backend at `:16006` is broken per CLAUDE.md status block; restore is a separate operator-action" ... "Phoenix MCP restoration (op-action HIGH-2 from W295) can proceed independently of OTel-GenAI adoption".

Stream C frames Phoenix-restoration as an **independent operator-decision**, NOT a blocker. This is consistent with leaving the entry wired-but-disabled — flips back live the moment the operator (a) boots Phoenix on `:16006` and (b) removes `phoenix` from `disabledMcpjsonServers`.

## §2 Decision rationale

Per the W309 mission decision-matrix:

| State | Action |
|---|---|
| entry exists + port CLOSED + zero usage + **already in `disabledMcpjsonServers`** | **C: Leave + document** |

All four predicates hold. The entry is functionally inert — already neutered by the harness-level disable. Removing it from `.mcp.json` would:

- Save **zero** startup spawn cost (the harness already skips disabled servers per Anthropic MCP spec `https://modelcontextprotocol.io/docs` — `disabledMcpjsonServers` is checked BEFORE `command/args` is spawned).
- **Lose** the ratified pin + `--baseUrl` literal that the operator would need to restore on next install.
- Force a re-pin lookup if/when Phoenix gets restored (currently `@4.0.13` is the W286-cross-validated version).

Conversely, **Action A removal** is defensible as future hygiene IF the operator decides Phoenix is permanently retired (analogous to W272+W290+W295 `graphiti` retirement: `graphiti` was both added to `disabledMcpjsonServers` AND the `.mcp.json:64-77` block was preserved "for inspection" — see CLAUDE.md line 28). The current W309 disposition is **same pattern as graphiti** — disabled-but-preserved.

**Action selected: C (Leave + document).** No `.mcp.json` edit this wave. The disable state is the source of truth; the entry is a documented dead-letter ready for restore.

## §3 Applied diff (`.mcp.json`)

```diff
(none — Action C selected)
```

No edit applied. Phoenix entry preserved at `.mcp.json:103-107` in current form.

**Operator-AI carried forward** (NOT applied this wave; flagged for next-wave or operator confirm):

- Optional follow-up: remove `.mcp.json` entry entirely IF operator confirms Phoenix is permanently retired. Reverts `disabledMcpjsonServers` to no-longer-include `phoenix` (no longer needed since the entry would be gone). Risks: loses pin + URL literal; restore requires re-research.
- Recommended path: re-litigate Phoenix vs. Langfuse as observability backends in W310+ once `gen_ai.*` semconv stabilizes (W307-C T2 verdict — Langfuse is the current OTLP target).

## §4 Verification

No edit applied → no post-state JSON validation needed. Confirming pre-state:

- `.mcp.json` JSON-valid (Read tool parsed the full file successfully in §1.1).
- `.claude/settings.json` `disabledMcpjsonServers` contains `"phoenix"` (line 94 — Read tool confirmed).
- OTEL endpoint at `:3000` not `:16006` (line 29 — Read tool confirmed).
- Probe rc=10035 confirms no listener on `:16006` (Bash tool confirmed).

Cardinal-rule conformance:

- R1 (trusted plugins/skills/agents): N/A — no install or uninstall.
- R2 (hooks): N/A — no hook change. Existing `.mcp.json` entry is a Anthropic-blessed stdio MCP per `https://modelcontextprotocol.io/docs`.
- R3 (subagents): N/A.
- R4 (no `.claude/rules/*.md`): N/A.
- R5 (safety boundaries): improved by the existing `disabledMcpjsonServers` entry — harness denies spawn at startup, not a custom guard script.

## §5 Rollback

Since no edit was applied, rollback is N/A. If the operator later applies Action A (remove entry) and wants to undo:

```bash
git revert <removal-commit-sha> --no-edit
```

OR restore the entry manually from §1.1 verbatim (re-insert the 4 lines between `"graphiti": {...},` and `"gitnexus": {...},` in `.mcp.json`, then remove `"phoenix"` from `disabledMcpjsonServers` in `settings.json` to re-enable).

To re-enable Phoenix in current state (operator action, separate from this wave):

1. Boot Phoenix on `:16006` (e.g., `phoenix serve --port 16006` or NSSM-supervised).
2. Edit `.claude/settings.json`: remove `"phoenix"` from `disabledMcpjsonServers`.
3. Restart Claude Code session — MCP server spawns on next session start.

## §6 SOTA-refs

- Anthropic MCP spec: `https://modelcontextprotocol.io/docs` (`.mcp.json` schema; `disabledMcpjsonServers` precedence over `mcpServers[*]`).
- Claude Code MCP docs: `https://code.claude.com/docs/en/mcp` (stdio/http transport contract).
- OpenTelemetry OTLP HTTP exporter: `https://opentelemetry.io/docs/specs/otlp/` (`/v1/traces` POST contract; the langfuse `:3000/api/public/otel/v1/traces` endpoint conforms).
- W295 op-action HIGH-2 (Phoenix MCP backend dead-letter — original finding).
- W307 Stream C: `docs/architecture/W307-TOP3-CHALLENGER-AUDITS-AND-AUTOMATION/W307-STREAM-C-OTEL-GENAI-AUDIT.md:97,385-390,497` (Phoenix MCP restoration framed as independent op-action).
- W308 baab2df precedent: OTLP endpoint repoint `:16006 → :3000` Langfuse (FM-class silent OTLP drop CLOSED).
- W259-v8 `cognee_w259v8` pattern (CLAUDE.md `.mcp.json:12`) — analogous "entry preserved for inspection, disabled in settings.json" pattern previously applied to graphiti per CLAUDE.md status block.

## §7 Cardinal-rule conformance summary

| Rule | Impact | Notes |
|---|---|---|
| R1 trusted-only install primitives | none | no install/uninstall touched |
| R2 hooks = upstream-plugin or direct-upstream-CLI | none | no hook touched |
| R3 subagents = installed-agents or documented system | none | no subagent change |
| R4 project behavior in CLAUDE.md + settings.json only | improved-by-status-quo | the disable is already in settings.json (canonical location); no new rules file |
| R5 safety boundaries via permissions/sandboxing | improved-by-status-quo | `disabledMcpjsonServers` is the upstream-blessed denylist mechanism; no custom guard |

**Conclusion**: Phoenix MCP entry is in a stable, documented, dead-letter-but-restorable state. No `.mcp.json` edit applied this wave (Action C). W307 Stream C HIGH carried 2 waves is **closed-as-documented** — Phoenix-restoration is the operator's call.
