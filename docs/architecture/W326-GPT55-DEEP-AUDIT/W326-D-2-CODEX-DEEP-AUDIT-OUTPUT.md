# W326-D-2 — codex GPT-5.5 Deep Architecture Audit (Raw Output)

**Date**: 2026-05-19  **Wave**: W326 Stream D  **Job ID**: `task-mpczi0yt-dt3sq9`  **Thread ID**: `019e418f-a871-70c1-a0cf-06cf87147733`  **Session ID**: `42df836b-6b6a-458c-adb5-f62755808880`  **Elapsed**: 2m 25s  **Model**: GPT-5.5 high-effort  **Status**: completed (verdict: 7 architecture-level concerns surfaced)

**Invocation**:
```
node "Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs" task --effort high "<W326-D prompt>" 2>&1 | tee tmp/W326-D-codex-deep-audit.txt
```

**Prompt source**: `Z:/claude-sota-installed/tmp/W326-D-codex-prompt.txt` (full 5-axis architecture-audit prompt; anti-bias self-check directives embedded)

**Token cost**: NOT EXACTLY MEASURED — codex-companion job log records show no token field exposed in the public log surface; based on W316-S5 7-layer Blueprint codex round-1 reference (129,743 tokens for similar-depth audit at high-effort) and the 2m 25s wall-time vs W316-S5's ~similar wall-time, **estimated ~100-140k tokens / ~$2-4** at GPT-5.5 high-effort pricing tier. Within operator unlimited budget.

**Tool-use during the audit**: codex sampled 8+ files using pwsh `Get-Content` + `Select-String` (rg) — confirmed in the run log that codex read CLAUDE.md, settings.json, .mcp.json, SKILL.md (sca-v10), W325-SYNTHESIS.md, W325-MULTI-SESSION-RECONCILE/STREAM-B-SYNTHESIS.md, INDEX.md, and W323-COMPREHENSIVE-AUDIT-WAVE/STREAM-4-RESEARCH-ARCH-V9.md before producing the audit. **1 Select-String command was DECLINED** (sandbox/auto-approval), but the file-content sample appears complete based on cite-anchor specificity (codex cited line ranges like `settings.json:92,414-419` correctly).

**Secret-redaction sweep**: scanned codex output for `pplx-*`, `pk-lf-*`, `sk-lf-*`, `ghp_*`, `sk-*`, `Bearer ` literals — none found. Output is safe to persist.

---

## codex GPT-5.5 Output (verbatim)

# W326-D codex GPT-5.5 deep architecture audit

## Concern 1 — CRITICAL: R5 Option C is not threat-model equivalent to OS sandboxing

**Category**: Axis 4
**Severity**: CRITICAL
**Confidence**: HIGH
**Cite anchor**: `Z:/claude-sota-installed/.claude/settings.json:92,414-419`; `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md:381-403`; https://code.claude.com/docs/en/sandboxing

**Diagnosis** (2-3 sentences):
The runtime still has `defaultMode: bypassPermissions`, `sandbox.enabled:false`, `failIfUnavailable:false`, `allowUnsandboxedCommands:true`, and excludes high-risk package runners (`npx`, `uvx`) from sandboxing if sandboxing is later enabled. Anthropic's sandbox docs define the security property as OS-level filesystem plus network enforcement over Bash subprocesses; current controls are policy prompts/hooks/deny globs, which do not constrain a malicious dependency, prompt-injected shell, or hook subprocess after execution starts.

**Inverse-test** (would this apply under a counterfactual architecture?):
Yes. I would flag the same issue if GPT-5.5 were the primary orchestrator: no model choice converts advisory permission policy into OS-level containment.

**W327+ recommendation** (1-2 sentences):
Do not call Option C "equivalent." Reclassify it as `R5-WINDOWS-NATIVE-ACCEPTED-RISK` unless moved into WSL2/devcontainer/VM sandbox, or set `permissions.defaultMode` away from bypass, `permissions.disableBypassPermissionsMode:"disable"`, `sandbox.failIfUnavailable:true`, and `allowUnsandboxedCommands:false` in managed settings.

**Effort estimate**: L (7-wave)

---

## Concern 2 — HIGH: L5 install decisions are shipping without L6 runtime-fitness telemetry

**Category**: Axis 1
**Severity**: HIGH
**Confidence**: HIGH
**Cite anchor**: `Z:/claude-sota-installed/.claude/settings.json:23-28`; `Z:/claude-sota-installed/docs/architecture/W325-CLOSURE-SYNTHESIS/W325-SYNTHESIS.md:20-24,61-75`; https://code.claude.com/docs/en/monitoring-usage

**Diagnosis** (2-3 sentences):
The architecture treats installs and plugin/MCP additions as "smoke verified," but the main CC telemetry path is known-broken: `OTEL_EXPORTER_OTLP_HEADERS` is absent and W325 found zero native CC traces in Langfuse. That means L4/L5 can approve runtime primitives while L6 cannot confirm tool latency, hook failures, subagent/tool span shape, MCP connection churn, or actual activation frequency.

**Inverse-test** (would this apply under a counterfactual architecture?):
Yes. Any autonomous runtime that grades runtime-fit without ingestion of its own tool/hook/MCP spans is blind, independent of Claude-vs-GPT orchestration.

**W327+ recommendation** (1-2 sentences):
Make `observability_present=true` a ship gate for T1 installs: traces, logs/events, and at least one post-install runtime span must arrive before "LIVE" status. Add the missing OTLP auth header and promote metrics/log exporters from backlog to precondition.

**Effort estimate**: S (1-wave)

---

## Concern 3 — HIGH: Self-evaluation now has a widened skip-N/A escape hatch

**Category**: Axis 3
**Severity**: HIGH
**Confidence**: HIGH
**Cite anchor**: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md:171-182,291-293,428-432,465`; `Z:/claude-sota-installed/docs/architecture/W325-MULTI-SESSION-RECONCILE/STREAM-B-SYNTHESIS.md:14-17`

**Diagnosis** (2-3 sentences):
sca-v10 skips D-EMP, D34, and D42-D45 for arch-itself, while those same dimensions hard-cap or soft-cap external candidates. Some skips are defensible tautology avoidance, but the combined effect is asymmetric: the runtime avoids empirical viability and corroboration penalties exactly where its own open P0s are concentrated.

**Inverse-test** (would this apply under a counterfactual architecture?):
Yes. A GPT-5.5-primary runtime using a rubric that excludes its weakest self-dimensions while enforcing them externally would get the same finding.

**W327+ recommendation** (1-2 sentences):
Split "not applicable because tautological" from "not measured because self." For arch-itself, replace D42-D45 skip with external-auditor-only scoring and replace D-EMP skip with operational probes over Langfuse/ledger/service health.

**Effort estimate**: M (3-wave)

---

## Concern 4 — HIGH: Supply-chain execution remains trusted at the runner boundary, not the artifact boundary

**Category**: Axis 2
**Severity**: HIGH
**Confidence**: MED
**Cite anchor**: `Z:/claude-sota-installed/.mcp.json:21-24,28-33,63-77,87-98`; `Z:/claude-sota-installed/docs/architecture/W323-COMPREHENSIVE-AUDIT-WAVE/STREAM-4-RESEARCH-ARCH-V9.md:27-32`; https://code.claude.com/docs/en/settings

**Diagnosis** (2-3 sentences):
Pinned `npx -y`/`uvx --from` improves reproducibility but still executes package-manager resolution and package lifecycle code inside a runtime that bypasses permissions and lacks OS sandbox containment. The W323 supply-chain-attestation dimension was proposed but not shipped as a scored gate, and settings do not use managed `strictKnownMarketplaces`, `allowManagedMcpServersOnly`, or artifact attestation as a hard boundary.

**Inverse-test** (would this apply under a counterfactual architecture?):
Yes. The risk is package/artifact execution under broad local authority, not an Anthropic-specific plugin model concern.

**W327+ recommendation** (1-2 sentences):
Promote supply-chain provenance to a hard install gate: lock marketplace refs, verify signatures/SLSA where available, cache immutable artifacts, and deny unapproved MCP/plugin sources via managed settings. Treat `npx`/`uvx` as acquisition channels, not trust guarantees.

**Effort estimate**: M (3-wave)

---

## Concern 5 — MED: Parallel orchestration outruns memory write coordination

**Category**: Axis 1
**Severity**: MED
**Confidence**: MED
**Cite anchor**: `Z:/claude-sota-installed/CLAUDE.md:12-14`; `Z:/claude-sota-installed/.claude/skills/goal-prompt-synthesis/SKILL.md`; `Z:/claude-sota-installed/docs/architecture/W325-MULTI-SESSION-RECONCILE/STREAM-B-SYNTHESIS.md:13-17,66-74`

**Diagnosis** (2-3 sentences):
L2 mandates aggressive parallel fan-out and parallel sessions, while L3/T6 memory and verdict ledgers are still file/note oriented with no visible lease, compare-and-swap, per-wave lock, or conflict protocol. W325's reconciliation shows parallel work bundling and post-hoc survival checks; that is recovery, not prevention.

**Inverse-test** (would this apply under a counterfactual architecture?):
Yes. Any multi-agent runtime with shared ledgers and no transactional write protocol risks stale verdicts, duplicated carry items, and last-writer-wins synthesis.

**W327+ recommendation** (1-2 sentences):
Introduce a wave-scoped coordination primitive: ownership manifest, append-only event log, lock file with TTL, and merge bot that rejects stale base SHA writes. Keep T6 memory opt-in for sensitive prompts, but make architecture ledgers transactional.

**Effort estimate**: M (3-wave)

---

## Concern 6 — MED: Hooks are acting as governance, but hooks are themselves an RCE and evidence boundary

**Category**: Axis 2 / Axis 4
**Severity**: MED
**Confidence**: HIGH
**Cite anchor**: `Z:/claude-sota-installed/.claude/settings.json:7,99-131,142-185,241-242`; https://code.claude.com/docs/en/hooks

**Diagnosis** (2-3 sentences):
The runtime leans on hooks for gitleaks/trivy/codex review and feedback, yet ECC governance/cost/evaluate hooks are disabled and signed-audit/protect-mcp plugins are disabled. Anthropic documents that most hook stdout is not visible to Claude, exit code semantics are event-specific, and hooks inherit the parent environment; a compromised hook or plugin can leak secrets through stderr/stdout/network before downstream review notices.

**Inverse-test** (would this apply under a counterfactual architecture?):
Yes. Hook-based governance has the same trust inversion under any orchestrator: the guard process must be at least as trusted and contained as the action it guards.

**W327+ recommendation** (1-2 sentences):
Move governance-critical hooks to managed/force-enabled plugin hooks with signed audit trails, minimal environment, and explicit egress policy. Treat project-local hook exceptions as temporary CVE-style waivers with expiry dates.

**Effort estimate**: M (3-wave)

---

## Concern 7 — MED: P0 carry-forward has become an architectural deadlock pattern

**Category**: Axis 5
**Severity**: MED
**Confidence**: HIGH
**Cite anchor**: `Z:/claude-sota-installed/docs/architecture/W325-CLOSURE-SYNTHESIS/W325-SYNTHESIS.md:41-49,103-119`; `Z:/claude-sota-installed/docs/architecture/W325-MULTI-SESSION-RECONCILE/STREAM-B-SYNTHESIS.md:55-74,92-95`

**Diagnosis** (2-3 sentences):
R5, Perplexity rotation, ECC update, and `claude doctor` EXIT-0-silent have persisted across enough waves that "carry-forward" is now masking a queueing failure. Some items are operator-bound and some are AI-bound, but the architecture does not force conversion into accepted risk, owner escalation, or stop-the-line remediation after a dwell threshold.

**Inverse-test** (would this apply under a counterfactual architecture?):
Yes. A GPT-5.5 runtime with eight-wave P0 dwell and no escalation state machine would get the same process finding.

**W327+ recommendation** (1-2 sentences):
Add a P0 dwell policy: after 3 waves, require owner/date/next irreversible action; after 5 waves, auto-escalate to operator mailbox or reclassify as signed accepted risk; after 8 waves, block new T1 installs unrelated to the P0. Wrap `claude doctor` with an independent parser until upstream exit semantics are fixed.

**Effort estimate**: S (1-wave)

---

## Summary statistics

| Severity | Count |
|---|---|
| CRITICAL | 1 (R5 Option C) |
| HIGH | 3 (L5-L6 telemetry gap, skip-N/A escape, supply-chain artifact boundary) |
| MED | 3 (parallel-vs-memory race, hook RCE boundary, P0 carry-forward fatigue) |
| LOW | 0 |
| **Total** | **7** |

| Axis | Count |
|---|---|
| Axis 1 (layer-mis-alignment) | 2 (Concern 2, Concern 5) |
| Axis 2 (missing canonical patterns) | 2 (Concern 4, Concern 6) |
| Axis 3 (self-reference invariant) | 1 (Concern 3) |
| Axis 4 (R5 sandbox mismatch) | 2 (Concern 1, Concern 6) |
| Axis 5 (carry-forward fatigue) | 1 (Concern 7) |
| Axis 6 (anti-pattern observed) | 0 (none surfaced) |
| Axis 7 (Anthropic-canonical omissions) | 0 (none surfaced) |

| Effort | Count |
|---|---|
| S (1-wave) | 2 (Concern 2, Concern 7) |
| M (3-wave) | 4 (Concern 3, 4, 5, 6) |
| L (7-wave) | 1 (Concern 1) |

## codex anti-bias self-check (it confirmed inversely on each)

All 7 concerns received `Inverse-test: Yes` — meaning codex itself concluded the finding would hold under a counterfactual GPT-5.5-primary architecture, not Claude-orchestrator-specific bias.

## Codex's confidence calibration

- HIGH confidence: 5 of 7 concerns (Concerns 1, 2, 3, 6, 7)
- MED confidence: 2 of 7 concerns (Concerns 4, 5)
- LOW confidence: 0

## Notable absences from codex output (W326-D Claude observation)

Codex did NOT surface:
- Axis 6 specific anti-pattern observed post-W325 (the prompt asked optionally; codex declined)
- Axis 7 specific Anthropic-canonical primitives omitted (the prompt asked optionally; codex declined)
- Anything about `tool_use` vs OpenAI function-calling (good — codex passed its own anti-bias check on its OpenAI-flavored tendency)
- Anything about CLAUDE.md ≤50-LOC body cap correctness (consistent with W325 closure)
- Anything about MCP-server count or pin-discipline correctness (CR-9 holds)
- Anything about parallel-dispatch-mandate skill effectiveness (operator queried W325 — codex didn't re-litigate)
- Anything about Phase-5 5-gate validation correctness (sca-v10 §3 — codex didn't re-litigate)
