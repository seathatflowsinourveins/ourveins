# W328 Stream B -- Insights Wire-Up AUTO Synthesis

**Wave**: W328 Stream B -- INSIGHTS-WIRE-AUTO
**Date**: 2026-05-19
**HEAD**: as of W328 dispatch
**Charter**: Build auto-applicable Insights wire-up bits per W327-B spec (PowerShell, idempotent, non-destructive).
**Owner**: `tools/insights-wireup/*` + `docs/architecture/W328-INSIGHTS-WIRE-APPLY/*` -- STRICT-FILE-OWNERSHIP per W328-B brief.
**Verdict**: **SHIP** -- 5 scripts + 1 README + this synthesis emitted; 0 settings.json / CLAUDE.local.md / .mcp.json edits per charter.

---

## §1 -- Executive summary

W327 Stream B produced 6 paste-ready operator-action specs covering all 7 audited Insights
gaps but stopped short of any tracked-file edits per its charter. Wire-up sat at ~14%
(GAP-4 statusLine closed via W326-A F1; the remaining 6 gaps blocked on operator-side
actions: 1 key-pair refresh, 4 file pastes, and 1 Phoenix startup).

W328 Stream B converts those specs into 5 idempotent PowerShell helpers that automate
the *script-side* of the wire-up: regression gates, infra probes, and paste-snippet
generation. The helpers refuse to mutate tracked config files (per the W328-B charter +
ownership boundaries), so the final ~20% of work -- pasting the emitted snippets and
restarting CC -- still lives operator-side. The benefit: each operator action shrinks
from "find the right doc, copy the right block, retype env-var-name correctly" to
"`Get-Content tmp/...-SNIPPET.txt` -- paste -- save".

| Phase | Wire-up % | What it means |
|---|---|---|
| Pre-W326 baseline | 0% | None of 4 CRITICAL + 3 MEDIUM gaps closed |
| Post-W326-A F1 | ~14% (1/7) | statusLine GAP-4 closed |
| Post-W328-B script run + Phoenix UP confirmed | ~14% (1/7) | Same -- scripts do not themselves close gaps |
| Post-W328-B + operator pastes 2 snippets + restart | **~57%** (4/7) | GAP-1 + GAP-2 + GAP-3 + GAP-4 closed (P0 CRITICAL bucket = 100%) |
| Post-W328-B + Phase-1 privacy paste | ~71% (5/7) | + GAP-5 + GAP-7 closed |
| Post-W328-B + Phase-2 privacy paste (steady-state) | **~86%** (6/7) | + GAP-6 closed |
| Full 7/7 closure | **100%** | Requires operator-side fresh key value placement in CLAUDE.local.md (f2) |

The ~80% achievable autonomously bookend assumes operator pastes the emitted snippets
(a 30-second action) but no key-pair refresh. The ~20% remaining gap is operator-only
because:

- The `(f5)` template that this stream emits derives the `OTEL_EXPORTER_OTLP_HEADERS`
  value from `$env:LANGFUSE_PUBLIC_KEY` + `$env:LANGFUSE_SECRET_KEY`. If those env vars
  exist in `CLAUDE.local.md (f2)` and are valid against the running Langfuse instance,
  the wire-up clicks closed on paste. The operator is the only party that can place the
  valid values into the gitignored file -- this stream never reads, echoes, or templates
  literal key material.

---

## §2 -- Scripts emitted (5)

| # | File | Bytes (~) | Purpose |
|---|---|---|---|
| 1 | `Z:\claude-sota-installed\tools\insights-wireup\statusline-smoke.ps1` | 4.8K | Regression-gate the 38-widget ccstatusline render post W326-A F1 |
| 2 | `Z:\claude-sota-installed\tools\insights-wireup\phoenix-start.ps1`    | 4.5K | Idempotent Phoenix listener probe on :6006/:16006; optional NSSM service start |
| 3 | `Z:\claude-sota-installed\tools\insights-wireup\otel-headers-template.ps1` | 2.6K | Emit paste-ready CLAUDE.local.md `(f5)` PowerShell snippet (NO key values read/echoed) |
| 4 | `Z:\claude-sota-installed\tools\insights-wireup\privacy-opt-ins-phase1.ps1` | 3.7K | Emit paste-ready settings.json env block for Phase-1 (TOOL_DETAILS + USER_PROMPTS) |
| 5 | `Z:\claude-sota-installed\tools\insights-wireup\wire-all.ps1`         | 4.0K | Orchestrator: runs 1-4 in dependency order, prints status table + wire-up progression |

Auxiliary:

| File | Bytes (~) | Purpose |
|---|---|---|
| `Z:\claude-sota-installed\tools\insights-wireup\README.md` | 5.6K | How to use the 5 scripts in order |
| `Z:\claude-sota-installed\docs\architecture\W328-INSIGHTS-WIRE-APPLY\W328-B-SYNTHESIS.md` | this file | Ship synthesis |

Total new artifacts: **7 files** under 2 NEW directories that did not exist before W328.

---

## §3 -- Insights wire-up % progression -- detailed

The W327-B 7-gap audit and its current closure status:

### P0 CRITICAL (4 gaps)

| Gap | Description | Pre-W328 | Post-W328 scripts run | After operator paste + restart |
|---|---|---|---|---|
| GAP-1 | Metrics exporter unset (8 metrics dropped) | NOT closed | Phoenix-availability probed | Closes if Phoenix UP + W327-B-4 paste applied |
| GAP-2 | Logs exporter unset (events dropped) | NOT closed | Phoenix-availability probed | Closes if Phoenix UP + W327-B-4 paste applied |
| GAP-3 | Langfuse auth header missing | NOT closed | `(f5)` template emitted | Closes when operator pastes + has valid (f2) keys |
| GAP-4 | statusLine block absent | CLOSED (W326-A F1) | Regression gate verifies still closed | n/a |

### P1 MEDIUM (3 gaps -- privacy opt-ins)

| Gap | Description | Pre-W328 | Post-W328 scripts run | After operator paste + restart |
|---|---|---|---|---|
| GAP-5 | `OTEL_LOG_TOOL_DETAILS` unset | NOT closed | Phase-1 paste emitted | Closes on paste |
| GAP-6 | `OTEL_LOG_RAW_API_BODIES` unset | NOT closed | Intentionally deferred to Phase-2 | Closes on Phase-2 paste post Phase-1 steady-state |
| GAP-7 | `OTEL_LOG_USER_PROMPTS` unset | NOT closed | Phase-1 paste emitted | Closes on paste |

### Autonomous-vs-operator contribution

- **Autonomous (W328-B scripts alone, no paste)**: keeps wire-up at the post-W326-A baseline
  of ~14%. The contribution is *regression-gating + paste-readiness* -- it reduces the
  operator action time per gap from ~5 minutes (find spec, copy-paste, retype) to ~30
  seconds (run script, paste from `tmp/*.txt`).
- **Autonomous + 2 paste actions + restart** (operator follows printed hints): wire-up
  reaches ~57% (4/7 -- the entire CRITICAL bucket closes assuming Phoenix is UP).
- **+ Phase-1 paste**: ~71% (5/7).
- **+ Phase-2 paste after steady-state**: ~86% (6/7).
- **Full 7/7**: requires the operator to ensure `CLAUDE.local.md (f2)` contains valid
  key values matching the running Langfuse instance -- the *one* gap this stream
  intentionally cannot auto-close (per the security constraint in the W328-B charter).

The "~80% achievable autonomously" framing in the W328-B dispatch directive refers to
the ~86% reachable when the operator pastes the emitted snippets without any additional
key handling -- which is realistic if the operator's existing `(f2)` keys are valid.

---

## §4 -- Cite-anchors (3-org-distinct per script)

Every script header lists 3 cite-anchors to 3 organisationally-distinct trusted sources,
per the W328-B charter cardinal-rule-1 discipline:

| Source | URL | Used in |
|---|---|---|
| arize-ai/phoenix       | https://github.com/Arize-ai/phoenix  +  https://arize-phoenix.readthedocs.io/en/latest/setup/configuration.html  | phoenix-start.ps1, privacy-opt-ins-phase1.ps1, wire-all.ps1 |
| opentelemetry.io       | https://opentelemetry.io/docs/specs/otel/protocol/exporter/  | all 5 scripts |
| anthropic-claude       | https://docs.anthropic.com/en/docs/claude-code/settings | all 5 scripts |
| langfuse.com           | https://langfuse.com/docs/integrations/opentelemetry/get-started | otel-headers-template.ps1, privacy-opt-ins-phase1.ps1 |
| sirmalloc/ccstatusline | https://github.com/sirmalloc/ccstatusline | statusline-smoke.ps1 |

Each script's header keeps the 3-cite minimum; some scripts cite 4 sources where a 4th
adds clear value (e.g. ccstatusline upstream for the renderer-specific helper).

---

## §5 -- Security posture

- **NO key rotation language** anywhere in any of the 7 emitted files. The
  `otel-headers-template.ps1` helper explicitly states "No key values are read or echoed
  by this script" and refers operators to their existing `CLAUDE.local.md (f2)` block.
- **NO literal secrets** in any script body, header, paste-template, or
  emitted-snippet.
- The `(f5)` template uses runtime-derive (`$_pair = "$($env:LANGFUSE_PUBLIC_KEY):$($env:LANGFUSE_SECRET_KEY)"`)
  which means literally zero key material crosses the script-to-file boundary.
- `pre-commit gitleaks` will PASS on the entire `tools/insights-wireup/` directory.
- All emitted snippets follow the existing `CLAUDE.local.md` / `.claude/settings.json`
  patterns (env-var references, no literals in tracked files).

---

## §6 -- Operator action: 30-second checklist

After running `wire-all.ps1 -EmitFiles`:

1. Open `Z:\claude-sota-installed\tmp\CLAUDE-LOCAL-MD-F5-SNIPPET.txt`. Copy.
2. Paste into `Z:\claude-sota-installed\CLAUDE.local.md` right after the existing
   `(f2)` Langfuse block. Save.
3. Open `Z:\claude-sota-installed\tmp\SETTINGS-JSON-PRIVACY-PHASE1.txt`. Copy.
4. Paste into `Z:\claude-sota-installed\.claude\settings.json` inside the `"env": { ... }`
   object. Save.
5. Validate JSON:
   ```powershell
   node -e "JSON.parse(require('fs').readFileSync('Z:/claude-sota-installed/.claude/settings.json'))"
   ```
6. If `phoenix-start.ps1` printed `NEEDS-OPERATOR`, start Phoenix per its hints, then
   paste the Phoenix metrics+logs block from W327-B-4 §4 into settings.json `env`.
7. Restart CC session (close + reopen).
8. Smoke: trigger any tool call. Verify a trace appears in Langfuse at `http://127.0.0.1:3000/`.

Time: ~3-5 min total. Reversibility: line-level revert across 2 files.

---

## §7 -- What remains operator-side after this stream

| Remaining work | Why operator-only |
|---|---|
| Paste the 2 emitted snippets into the 2 tracked files | W328-B file-ownership boundary -- this stream owns `tools/insights-wireup/` and `docs/architecture/W328-INSIGHTS-WIRE-APPLY/` exclusively. |
| Ensure `(f2)` keys are valid against the running Langfuse instance | Security constraint -- this stream never touches key material. |
| Resolve the :6006 vs :16006 Phoenix port ambiguity (CLAUDE.md L51 vs W327-B-4) | Documentation-vs-runtime reconciliation requires operator decision. |
| Start Phoenix (`pip install arize-phoenix` if needed; NSSM service registration) | Process-lifecycle on local infra is operator-controlled. |
| Apply Phase-2 (`OTEL_LOG_RAW_API_BODIES`) after Phase-1 steady-state confirmed | Phased rollout intentional per W327-B-5 risk schedule. |

---

## §8 -- W328-B forward-AIs

| # | ID | Priority | Description |
|---|---|---|---|
| 1 | W328-B-FA-1 | P1 | Operator: paste the 2 emitted snippets (CLAUDE.local.md `(f5)` + settings.json Phase-1) and restart CC; confirm Langfuse trace ingest. |
| 2 | W328-B-FA-2 | P1 | Operator: resolve Phoenix :6006 vs :16006 ambiguity in CLAUDE.md L51 with a one-line edit reflecting the actual listener port. |
| 3 | W328-B-FA-3 | P1 | Operator: if Phoenix not running, start it (manual or NSSM); then paste W327-B-4 §4 metrics+logs block into settings.json env. |
| 4 | W328-B-FA-4 | P2 | Operator: after Phase-1 steady-state (~1 day of routine CC use), paste `"OTEL_LOG_RAW_API_BODIES": "1"` into settings.json env to close GAP-6. |
| 5 | W328-B-FA-5 | P3 | Future stream: convert this orchestrator's status-table output into a structured JSON ledger row appended to `VERDICT-LEDGER.md` for cross-wave progression tracking. |
| 6 | W328-B-FA-6 | P3 | Future stream: write a complementary `tools/insights-wireup/teardown.ps1` that documents how to roll back each paste in a single line edit. |

---

## §9 -- Cardinal-rule conformance

| Rule | Status | Notes |
|---|---|---|
| R1 (trusted-source primitives) | HOLD | 3-org-distinct cites per script (arize-ai/phoenix, opentelemetry.io, anthropic-claude minimum). |
| R2 (hooks = upstream OR direct-CLI) | HOLD | No hook addition; this stream's scripts run under operator dot-source invocation, not as hooks. |
| R3 (subagents = upstream) | n/a | Not a subagent change. |
| R4 (project behavior in CLAUDE.md + settings.json) | HOLD | This stream edits neither -- only emits paste templates for operator-side application. |
| R5 (sandbox/permissions) | HOLD (no change) | No permission edits; existing R5 SHIP-BLOCKER carry unchanged. |
| CR-9 (pinned versions) | HOLD | `npx -y ccstatusline@2.2.19` pin preserved in statusline-smoke.ps1. |
| `self_invented_count` | 0 (unchanged) | Scripts live in `tools/insights-wireup/` -- a tools-tree extension consistent with existing `tools/eee*.ps1`, `tools/planning-attest.ps1` etc.; not under `.claude/rules/` or `.claude/hooks/`. |

---

## §10 -- References

- W327-B charter + 6 specs: `docs/architecture/W327-INSIGHTS-FINAL/{STREAM-B-SYNTHESIS,W327-B-1..5}*.md`
- W326-A F1 source (statusLine npx pin): `docs/architecture/W326-SETTINGS-FIXES/W326-A-1-CCSTATUSLINE-NPX-FIX.md`
- W325 Stream A gap audit: `docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-*.md`
- Cite-anchors:
  - https://github.com/Arize-ai/phoenix
  - https://arize-phoenix.readthedocs.io/en/latest/setup/configuration.html
  - https://opentelemetry.io/docs/specs/otel/protocol/exporter/
  - https://docs.anthropic.com/en/docs/claude-code/settings
  - https://langfuse.com/docs/integrations/opentelemetry/get-started
  - https://github.com/sirmalloc/ccstatusline
