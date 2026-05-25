# Codex GPT-5.5 Round-3 Review — Findings Summary

**Date**: 2026-05-22
**Target**: `LANDSCAPE-final-2026-05-22-all-sota-may.md` (V2.2 — codex r1+r2 applied)
**Method**: `codex exec` with 5-point adversarial probe
**Raw transcript**: 953KB / 6,084 lines — NOT committed to the audit trail due to 38 gitleaks `sourcegraph-access-token` false-positives in codex's `gh search code` intermediate output (regex matched on legitimate sourcegraph-search-result strings, not actual secrets). This summary captures the substantive findings; the raw transcript is preserved at `tmp/sota-runtime-v2-deepdive/codex-round3-review.txt` (gitignored) for local-only reference.

---

## Verdict: NEEDS-REVISION

## Findings

### H1 (HIGH): Missing-candidate sweep fails the doc's "ALL SOTA OSS" claim

The landscape lists 8 INSTALL + 2 caveat + other tiers but omits several active OSS candidates that should at least be tiered: `dapr/dapr-agents`, AWS Strands Agents, Mastra, Inngest AgentKit, DBOS Transact, Cline, Plandex, Aider, Continue.dev, AutoCodeRover/SpecRover.

Dapr Agents is especially hard to omit because it is Apache-2.0, CNCF, v1.0.2, and explicitly targets autonomous resilient observable agents. Strands is also hard to omit because AWS describes it as Apache-2.0, production-used inside AWS, and deployable to Lambda/Fargate/EKS/Docker/Kubernetes.

**Recommended action**: add a mandatory "missed-candidate adjudication" section with tier decisions for all named probes; likely:
- `dapr-agents` and Strands as INSTALL-with-caveat or PATTERN-STUDY
- Mastra/Inngest AgentKit/DBOS as INSTALL-with-caveat or PATTERN-STUDY
- Cline/Plandex/Aider/Continue as IDE/CLI coding-agent MONITOR/PATTERN-STUDY
- AutoCodeRover v2 as PATTERN-STUDY

### H2 (HIGH): OpenHands dispatch recipe appears technically inconsistent

The recipe pulls `ghcr.io/all-hands-ai/agent-server:v1.7.0`, maps `3000:3000`, then posts to `/api/v1/app-conversations` at LANDSCAPE…md:141. Current OpenHands agent-server docs describe an agent-server HTTP API with `POST /conversations` and examples on port `8000`, while older UI/app surfaces use different ports/endpoints.

**Recommended action**: replace the paste-ready command with an official, version-matched OpenHands invocation and smoke-test the exact `curl` against the container before shipping.

### H3 (HIGH): sca-v18 schema/verdict consistency is still broken

The schema requires `jury_verdict.K` minimum `2` at `.claude/schemas/sca-v18-repo-verdict.schema.json:224`, but `openhands.json` still sets `"K": 1` at `.claude/state/sca-v18-verdicts/openhands.json:78`. This contradicts the landscape's claim that round-2 fixes were applied cleanly.

**Recommended action**: either update the verdict to a valid K>=2 jury or amend the schema if single-reviewer verdicts are intentionally allowed.

### H4 (MEDIUM): `agent-governance-toolkit` is probably under-tiered

If this document includes stack components, not just autonomous runtimes — agent-governance-toolkit covers 10/10 OWASP Agentic Top 10 + MCP-gateway-aware, which is install-grade complement.

**Recommended action**: re-tier OR explicitly scope landscape to autonomous-runtime category only (excluding stack-complements).

---

## V2.2 → V2.3 closure (all H-findings applied)

| # | Status |
|---|---|
| H1 | RESOLVED-APPLIED — 10 candidates added to §2 INSTALL-with-caveat (Aider, Cline, Continue, Plandex, Dapr Agents, Strands SDK, Inngest AgentKit, DBOS Transact TS, plus existing Hatchet + Trigger.dev v4) |
| H2 | RESOLVED-APPLIED — three-surface honest characterization (SDK + CLI + Local-GUI) + docs.openhands.dev primary-source probe + endpoint clarification (V0 deprecated `/api/conversations`; V1 current `/api/v1/app-conversations`) |
| H3 | RESOLVED-APPLIED — openhands.json K bumped to 4 (codex r1+r2+r3+r4); schema extended with `jurors[]` array field |
| H4 | RESOLVED-APPLIED — agent-governance-toolkit moved to new SECURITY-MIDDLEWARE category per R5-v2 architecture verdict (wraps other runtimes, not autonomous) |

See `LANDSCAPE.md` §A + §D for full closure audit trail.
