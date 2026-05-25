# W307 — Top-3 Challenger Full sca-v5 Audits + sca-status Automation Dashboard

> **Wave**: W307
> **Branch**: `sota-converge-w295` (HEAD `733b0fe` post-W306-codex-r1 closure)
> **Predecessors**: W306 (3 incumbents challenged + 14 NEW; Lane-D adapter stubs SHIPPED; sca-v6 PARTIAL applied to SKILL.md)
> **Started**: 2026-05-18
> **Rubric**: sca-v5 active (sca-v6 PARTIAL applied via W306 — D-v6-4 CI advisory + D-v6-6 override audit trail)
> **Codex gate**: round-1 after synthesis commit
> **Operator mandate (5th iteration, 2026-05-18)**:
> > "you should be advanced automation and proceed with sota convergence audit your architecture and monitor system status... INTEGRATE SOTA RESEARCH WITH GPT5.5 UNLEASH..."

## §0 TL;DR

W307 closes the 3 top-priority W306 Stream C challenger audits AND ships 1 piece of advanced automation per operator's "advanced automation" mandate. 3 parallel sca-v5 audits + 1 status-dashboard tool + synthesis + codex gate.

## §1 Stream definitions

### Stream A — Full sca-v5 audit: `microsoft/mcp-gateway` (Axis-1 top pick)

- **Owner**: `agent-A-mcp-gateway-audit`
- **Owned file**: `docs/architecture/W307-TOP3-CHALLENGER-AUDITS-AND-AUTOMATION/W307-STREAM-A-MCP-GATEWAY-AUDIT.md`
- **Candidate**: `microsoft/mcp-gateway` (641★, last-pushed 2026-04-xx per W306 Stream C; T2 PRELIM as NET-NEW MCP-gateway-plane addressing `.mcp.json` flat-list scale limitation)
- **Mandate**: full sca-v5 20-dim audit (all D1-D21 except gaps); typed-evidence requirement (≥1 benchmark + ≥1 code-reading + ≥1 practitioner report); cite-anchored evidence in `sources_typed`; 3-persona adversarial fan-out (security + architect + code-reviewer); Phase-5 5-gate compliance per sca-v5 §5.5.
- **Verdict expected**: T1 INSTALL / T2 VENDOR-FORK / T3 PATTERN-STUDY / T4 CITE-ONLY / T5 REJECT — whichever the rubric routes.
- **Hard-cap audit**: D7 (maintenance), D10 (duplication-against-installed e.g. vs project `.mcp.json`), D15 (supply-chain), D18 (runtime-safety) explicit.
- **Sub-target**: full rollback plan if T1 INSTALL.
- **Deliverable**: ≤700 lines; full sca-v5 verdict episode payload at end of doc; ready for parent to append VERDICT-LEDGER row + T6 basic-memory write.

### Stream B — Full sca-v5 audit: `Portkey-AI/gateway` (Axis-3 top pick — litellm challenger)

- **Owner**: `agent-B-portkey-audit`
- **Owned file**: `docs/architecture/W307-TOP3-CHALLENGER-AUDITS-AND-AUTOMATION/W307-STREAM-B-PORTKEY-AUDIT.md`
- **Candidate**: `Portkey-AI/gateway` (11.7k★, IN, T2 PRELIM litellm-REPLACE-CANDIDATE per W306 Stream C Axis-3)
- **Mandate**: same as Stream A — full 20-dim audit + typed-evidence + 3-persona + Phase-5 5-gate.
- **Hard-cap audit**: D10 (duplication-against-installed litellm), D11 (context-budget cost vs existing model-router env), D17 (robustness under perturbation).
- **Comparison**: head-to-head against litellm-incumbent W259 verdict if available; explicit `vs_incumbent` field.
- **Deliverable**: ≤700 lines; full verdict episode + comparison-matrix vs litellm.

### Stream C — Full sca-v5 audit: `open-telemetry/semantic-conventions-genai` (Axis-2 STANDARDS)

- **Owner**: `agent-C-otel-genai-audit`
- **Owned file**: `docs/architecture/W307-TOP3-CHALLENGER-AUDITS-AND-AUTOMATION/W307-STREAM-C-OTEL-GENAI-AUDIT.md`
- **Candidate**: `open-telemetry/semantic-conventions-genai` (T2 STANDARDS per W306 Stream C; forces Langfuse semconv alignment)
- **Mandate**: same as Stream A — full 20-dim audit. SPECIAL: this is a STANDARDS spec, not a runtime tool — D3 harness_fit + D4 CC-runtime-pathway will be unusual; document the STANDARDS-class scoring rubric per `STREAM-C-RUBRIC-v3.md`.
- **Hard-cap audit**: D3 (does a STANDARDS spec count as "harness-fit"?), D4 (no installable artifact); pattern_extractability D13 likely HIGH.
- **Comparison**: how does this affect the runtime's existing Langfuse T5 + Phoenix MCP entries?
- **Deliverable**: ≤700 lines; STANDARDS-class verdict + adoption-pattern recommendation (do nothing / wait for ratification / pre-align).

## §2 Parent-owned automation: sca-status dashboard tool

- **File**: `tools/sca_status_dashboard.py` (NEW, ~150-200 LOC)
- **Purpose**: per operator's "advanced automation" mandate — aggregate VERDICT-LEDGER.md + basic-memory `verdicts/*.md` + `AGING-RELITIGATION-QUEUE.md` into a single status dashboard markdown.
- **Inputs**:
  - `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — canonical ledger
  - `Z:/claude-sota-installed-state/basic-memory/verdicts/*.md` — T6 storage (markdown-grep fallback per W295-codex-r28+r33)
  - `docs/architecture/AGING-RELITIGATION-QUEUE.md` — STALE work-list (if exists)
- **Outputs** (Markdown dashboard at `docs/architecture/W307-TOP3-CHALLENGER-AUDITS-AND-AUTOMATION/W307-SCA-STATUS-DASHBOARD.md`):
  - §1 Active T1 INSTALL verdicts (per-row: candidate · install_score · reverify_due · wave-age · status)
  - §2 AGING (decision_wave + 6..11 ago) — flag for review
  - §3 STALE (decision_wave + 12+ ago) — must be re-litigated before citing
  - §4 T6 basic-memory parity check (verdicts in ledger vs verdicts in T6 storage — mismatches flagged)
  - §5 Top-5 audit-queue (NEW candidates queued for next wave per recent Stream B/C discoveries)
- **Constraints**:
  - CR-1: stdlib-only Python; no new pip installs
  - CR-2: tool lives in `tools/` (sanctioned project automation per `tools/awesome_list_deltagrep.py` precedent + `tools/eee.ps1` precedent); NOT a hook
  - CR-5: read-only (no edits to ledger; only emits dashboard file)
  - Cardinal-rule-3-compliant: no agent invocation; pure stdlib aggregation
- **Usage**:
  ```
  python tools/sca_status_dashboard.py [--out-path <path>] [--basic-memory-dir <path>]
  ```
  - Defaults: out-path = `docs/architecture/W307-.../W307-SCA-STATUS-DASHBOARD.md`; basic-memory-dir = `Z:/claude-sota-installed-state/basic-memory/verdicts/`
  - Read-only smoke: `python tools/sca_status_dashboard.py --dry-run` prints summary without writing dashboard.

## §3 Synthesis (parent-owned)

After 3 streams + dashboard tool complete:
1. Read each stream's verdict episode + dashboard output.
2. Append ≤3 VERDICT-LEDGER rows for the 3 candidates (per sca-v5 3-target contract).
3. Write T6 basic-memory verdict files (3× `mcp__basic-memory__write_note`).
4. Run the dashboard tool + commit the output.
5. Dispatch codex GPT-5.5 e2e gate.
6. Address HIGH inline; MEDIUM defer per W288/W289 precedent.

## §4 Cardinal-rule invariants — must hold post-wave

- CLAUDE.md ≤ 50 LOC (currently 43); settings.json ≤ 15 KB (currently 13.4 KB); ≤ 3 worktrees
- `self_invented_count: 0`
- T6 basic-memory + VERDICT-LEDGER.md 3-target ledger contract
- codex `reviewGateEnabled: true`
- 6-tier memory contract unchanged

## §5 Wave-success criteria

- 3/3 streams produce full sca-v5 verdict episodes
- 3 VERDICT-LEDGER rows appended + 3 T6 basic-memory writes
- `tools/sca_status_dashboard.py` lands + smoke (read-only `--dry-run` exit 0) PASS
- Codex round-1 APPROVE or REVISE-MEDIUM-only (cleared per W288/W289 precedent)
