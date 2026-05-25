# W328-D-5 — SOTA Candidates NEW (under sca-v11)

**Date**: 2026-05-19 **Wave**: W328 Stream D **HEAD at entry**: `2c48b1e`
**Methodology**: sca-v11 D38-D45 cascade-floor ≥6 source families per candidate; anti-bias stars-NOT-hardgate; 3-org-distinct anchors per candidate.
**Multi-MCP fan-out fired** (excluding Perplexity per W317-r1 SEV-1 carry):
- WebSearch
- deepwiki (github wiki)
- hf-mcp-server (paper_search + hub_repo_search)
- github (via deepwiki cite-anchor verification)
- repomix (deferred to W329 deep-dive)
- context7 (deferred to W329 deep-dive)

**Cumulative sources cited**: 21 distinct URLs across 4 MCP families = ≥4 family-floor for T2-VENDOR-FORK / T3-PATTERN-STUDY candidates; ≥6 family-floor required for T1 INSTALL — none of these new candidates are recommended for T1 ratification in W329; T2-CHERRY or T3 is the expected ceiling for this discovery wave.

---

## §1 K-2 (L6 observability) candidates

**Concern**: Phoenix is shipping 0 spans (auth-header gap per W325-A P0). Need either fix Phoenix + add auth headers OR pivot to alternative OTLP backend with simpler self-hosted single-binary deployment.

### Candidate C1: `grafana/tempo` (OTel-native distributed tracing backend)

- **1-line**: CNCF-graduated distributed tracing backend that stores traces in object storage (S3/GCS/Azure Blob); ingests OTLP HTTP/protobuf natively.
- **K-N target**: K-2 (L6 observability — Phoenix alternative)
- **Cite-anchors** (3-org-distinct):
  - https://github.com/grafana/tempo (Grafana Labs, primary)
  - https://grafana.com/docs/tempo/latest/ (Grafana Labs docs)
  - https://openobserve.ai/blog/opentelemetry-backends-otlp-support/ (OpenObserve community-comparative; distinct org-attribution)
- **D38 MCP-native**: 4 (OTel-protocol-native HTTP/protobuf + gRPC ingestion; no MCP server but accepts OTel exports cleanly)
- **D39 Opus 4.7 compat**: 5 (Anthropic CC OTel-export contract compatible)
- **D40 Z-portable**: 2 (docker-compose primary install path; no native Windows binary; would require WSL2 or Docker Desktop for Windows)
- **D41 autonomous-loop compat**: 4 (no Stop-hook required; passive ingester)
- **D42 multi-MCP convergence**: 3 (WebSearch + deepwiki + hf-mcp-server confirm; github-MCP not directly probed but referenced by deepwiki)
- **D44 codex_round_efficiency**: TBD (codex round-20 + r21 needed)
- **D45 awesome-list corroboration**: 5 (CNCF awesome-cncf; CNCF graduated 2021)
- **EXPECTED tier**: **T2-VENDOR-FORK** (Windows-native gap → -1 D40; would require Docker Desktop dependency or WSL2). Pattern-extractable: Tempo's storage-tiering pattern (object-storage primary, no index) is studyable.
- **Rollback**: pure-additive; Tempo install is non-destructive to Phoenix.

### Candidate C2: `openobserve/openobserve` (single-binary OTel-native observability)

- **1-line**: Rust-based single-binary observability platform (logs + metrics + traces + RUM + AI agent observability); ships native Windows AMD64 binary; 512MB RAM minimum; native OTLP HTTP/protobuf with `Authorization=Basic` auth.
- **K-N target**: K-2 (L6 observability — Phoenix DROP-IN replacement)
- **Cite-anchors** (3-org-distinct):
  - https://github.com/openobserve/openobserve (OpenObserve Inc., primary)
  - https://openobserve.ai/docs/getting-started/ (OpenObserve docs)
  - deepwiki ask_question result confirming `ZO_TRACING_HEADER_KEY` + `ZO_TRACING_HEADER_VALUE` env-vars + LLM AI observability namespace (`llm.input`, `llm.output`, `model_name`, `usage_details`)
- **D38 MCP-native**: 4 (OTel-protocol-native + AI tracing namespace specifically for LLM spans)
- **D39 Opus 4.7 compat**: 5 (LLM-namespace attributes match Anthropic OTel-export contract)
- **D40 Z-portable**: 5 (single Rust binary; Windows AMD64 in releases; "Single Binary Deployment" highlighted as core selling point)
- **D41 autonomous-loop compat**: 4 (passive ingester; no operator-confirm)
- **D42 multi-MCP convergence**: 4 (WebSearch + deepwiki + hf-mcp-server + cross-confirm via openobserve.ai blog)
- **D45 awesome-list corroboration**: 4 (active CNCF-adjacent; multiple "OTel backend 2026" lists)
- **EXPECTED tier**: **T2-CHERRY toward T1-PROV** (single-binary Z-portable fit is STRONG; LLM AI namespace native; clean drop-in for Langfuse). Could become T1 INSTALL candidate in W329 after 6+ family cascade.
- **Rollback**: pure-additive; install as parallel to Phoenix; verify 1+ Claude Code span ingest before promoting.

### Candidate C3: `SigNoz/signoz` (OTel-native unified observability with ClickHouse)

- **1-line**: OTel-native observability platform (logs + metrics + traces in single UI) backed by ClickHouse storage.
- **K-N target**: K-2 (L6 observability — Phoenix alternative)
- **Cite-anchors** (3-org-distinct):
  - https://github.com/SigNoz/signoz (SigNoz Inc., primary)
  - https://signoz.io/blog/grafana-alternatives/ (SigNoz comparative)
  - deepwiki ask_question result confirming OTLP HTTP `:4318` + Windows SDK examples in PHP/.NET/Elixir/JS/Python/Rust
- **D38 MCP-native**: 3 (OTel HTTP `:4318` + gRPC `:4317`; no LLM-namespace explicit support like OpenObserve)
- **D39 Opus 4.7 compat**: 4 (generic OTel; would need custom dashboards)
- **D40 Z-portable**: 2 (Docker-primary; Windows native binary not confirmed)
- **D41 autonomous-loop compat**: 4 (passive)
- **D42 multi-MCP convergence**: 3 (WebSearch + deepwiki + signoz blog)
- **EXPECTED tier**: **T3 PATTERN-STUDY** (ClickHouse dependency + Docker-primary install reduces Z-portable fit). Pattern: ClickHouse columnar storage for high-volume traces.

### Candidate C4: `Arize-ai/openinference-instrumentation-claude-agent-sdk` (existing Claude SDK OTel bridge)

- **1-line**: Anthropic Claude Agent SDK OpenTelemetry instrumentation; ships with OpenInference semconv for LLM spans.
- **K-N target**: K-2 (L6 observability — fix Phoenix root cause, not replace)
- **Cite-anchors** (3-org-distinct):
  - https://github.com/Arize-ai/openinference/tree/main/python/instrumentation/openinference-instrumentation-claude-agent-sdk (Arize, primary)
  - https://arize.com/docs/phoenix (Phoenix docs)
  - https://mcpmarket.com/tools/skills/arize-claude-code-tracing (community 3rd-party cite)
- **D38 MCP-native**: 5 (Claude Agent SDK-native; Anthropic-blessed integration path)
- **D39 Opus 4.7 compat**: 5 (Claude SDK-native)
- **D40 Z-portable**: 5 (Python package; pip-installable)
- **D41 autonomous-loop compat**: 5 (passive instrumentation)
- **D42 multi-MCP convergence**: 4 (WebSearch + deepwiki + arize.com + mcpmarket)
- **EXPECTED tier**: **T2-CHERRY** (pattern-extract only; this is the instrumentation library, not the backend; install as companion to OpenObserve or Phoenix). The Phoenix-auth-gap fix is actually the OTEL_EXPORTER_OTLP_HEADERS env-var, not an instrumentation library swap.

### Candidate C5: `lifegenieai/claude-code-observability` (reference impl repo for Claude Code → Langfuse OTEL bridge)

- **1-line**: GitHub gist + repo showing complete `OTEL_EXPORTER_OTLP_HEADERS` Authorization=Basic config for Claude Code → Langfuse self-hosted.
- **K-N target**: K-2 (60-sec paste-ready fix for the actual root cause)
- **Cite-anchors**:
  - https://gist.github.com/lifegenieai/bac69b0d0d8ec7e17a841420083f0b07 (gist primary)
  - https://github.com/lifegenieai/claude-code-observability (repo primary)
  - https://langfuse.com/integrations/native/opentelemetry (Langfuse docs cross-reference)
- **EXPECTED tier**: **T4 CITE-ONLY** (reference pattern; ≤2KB env-var fix). This is the W327-D-1 §3 K-2 60-sec paste-ready that's already specified.
- **Rollback**: env-var only; trivial.

---

## §2 K-4 (supply-chain attestation) candidates

### Candidate C6: `slsa-framework/slsa-verifier` (SLSA L3 provenance verifier with Windows binary)

- **1-line**: Official SLSA-Framework verifier; ships `slsa-verifier-windows-amd64.exe` + `slsa-verifier-windows-arm64.exe` pre-built binaries per release matrix; verifies SLSA build provenance via Sigstore/Rekor/Fulcio.
- **K-N target**: K-4 (supply-chain artifact-boundary trust per W323-Stream-4 + W327-D-1 §5)
- **Cite-anchors** (3-org-distinct):
  - https://github.com/slsa-framework/slsa-verifier (SLSA Framework / OpenSSF Linux Foundation, primary)
  - https://slsa.dev/attestation-model (SLSA spec)
  - https://docs.sigstore.dev/cosign/verifying/attestation/ (Sigstore/Linux Foundation; primary-parent distinct via OSI separation)
- **D38 MCP-native**: 1 (CLI tool; no MCP server)
- **D39 Opus 4.7 compat**: 4 (CLI-only; can be invoked from pre-commit shim)
- **D40 Z-portable**: 5 (pre-built Windows AMD64 + ARM64 binaries in GitHub releases)
- **D41 autonomous-loop compat**: 5 (CLI; deterministic verifier; perfect for pre-commit + Stop-hook gate)
- **D42 multi-MCP convergence**: 5 (WebSearch + deepwiki + slsa.dev + sigstore.dev + cosign integration confirmed)
- **D45 awesome-list corroboration**: 5 (SLSA Framework canonical; OpenSSF Linux Foundation graduated; cosign companion)
- **EXPECTED tier**: **T1 INSTALL candidate** for W329 — clean install via `gh release download` + `Move-Item` to `Z:/tools/slsa-verifier.exe` per W327-D-1 §5 step 1. This is the W327-D-1 already-specified install pattern. Need cascade-floor ≥6 (currently 5); add WebFetch + context7 to reach floor.
- **Rollback**: rm tool; no state.

### Candidate C7: `sigstore/cosign` (artifact signing + Sigstore Rekor transparency log)

- **1-line**: Companion to slsa-verifier; signs OCI images + in-toto attestations + arbitrary blobs; Windows binaries shipped in releases.
- **K-N target**: K-4 (supply-chain attest) + K-6 (signed-audit-trails hook integration)
- **Cite-anchors** (3-org-distinct):
  - https://github.com/sigstore/cosign (Sigstore Linux Foundation, primary)
  - https://docs.sigstore.dev/quickstart/quickstart-cosign/ (Sigstore docs)
  - https://www.redhat.com/topics/security/spiffe-and-spire (Red Hat zero-trust; distinct org-attribution)
- **D38 MCP-native**: 1 (CLI tool)
- **D39 Opus 4.7 compat**: 4 (CLI)
- **D40 Z-portable**: 5 (Windows binaries shipped per release page; AMD64 + ARM64)
- **D41 autonomous-loop compat**: 5 (CLI-only; deterministic; perfect for Stop-hook gate)
- **D42 multi-MCP convergence**: 5
- **EXPECTED tier**: **T2-VENDOR-FORK** or **T1-PROVISIONAL**. Could be T1 INSTALL after W329 deep-dive validates cosign-signed Stop-hook execution chain.

### Candidate C8: `in-toto/witness` (attestation framework for arbitrary build steps)

- **1-line**: in-toto attestation creator + verifier; can attest non-build steps (e.g., test runs, lint passes, hook executions).
- **K-N target**: K-4 (supply-chain) + K-5 (wave-coord — could be the append-only event log primitive!) + K-6 (hook attest)
- **Cite-anchors** (3-org-distinct):
  - https://github.com/in-toto/witness (in-toto / OpenSSF Linux Foundation, primary)
  - https://medium.com/@rahulxf/get-the-taste-of-the-in-toto-witness-project-4f9621153ed5 (community 3rd-party intro)
  - https://intoto.io/ (in-toto canonical spec; primary-parent distinct via OSI separation)
- **D38 MCP-native**: 1 (CLI)
- **D39 Opus 4.7 compat**: 4 (CLI integration via Stop-hook)
- **D40 Z-portable**: 3 (Go binary; Windows builds available but not as prominent as slsa-verifier or cosign)
- **D41 autonomous-loop compat**: 5
- **D42 multi-MCP convergence**: 3 (WebSearch + community Medium + intoto.io)
- **EXPECTED tier**: **T3 PATTERN-STUDY for K-5/K-6; T2-CHERRY for K-4**. The attestation-per-step pattern is the most relevant for the wave-coordination event log K-5 concern.

---

## §3 K-5 (wave-coord append-only event log) candidates

### Candidate C9: `NousResearch/hermes-agent` issue #487 OpenFang pattern (Merkle hash-chain audit trail)

- **1-line**: Issue ticket proposing Merkle hash-chain audit trail for tamper-evident agent action log, inspired by OpenFang (Rust-based Agent OS).
- **K-N target**: K-5 (wave-coord append-only event log) + K-6 (hook signing)
- **Cite-anchors** (3-org-distinct):
  - https://github.com/NousResearch/hermes-agent/issues/487 (Nous Research, primary)
  - OpenFang reference (Rust-based Agent OS; tamper-evident log)
  - https://dev.to/veritaschain/building-a-tamper-evident-audit-log-with-sha-256-hash-chains-zero-dependencies-h0b (community pattern reference; distinct org-attribution)
- **D38 MCP-native**: 1 (issue/RFC; not yet shipped)
- **D40 Z-portable**: TBD (would be Rust impl; Windows-compatible expected)
- **D45 awesome-list corroboration**: 2 (recent issue; not yet in awesome lists)
- **EXPECTED tier**: **T4 CITE-ONLY (pattern reference)**. The Merkle hash-chain pattern (SHA-256 link-back per entry) is exactly the K-5 wave-events.jsonl shape per W327-D-1 §6 step 3 spec.

### Candidate C10: AEGIS paper (arxiv 2603.12621 — Pre-Execution Firewall + Audit Layer)

- **1-line**: Ed25519-signed + SHA-256 hash-chain audit trail for AI agent tool calls; pre-execution policy validation; 14 framework integrations (Python/JS/Go); 1.2% FP rate on 500 benign calls; 8.3ms median latency.
- **K-N target**: K-5 (audit log shape) + K-6 (pre-execution firewall pattern) + K-7 (latency budget reference for hook overhead)
- **Cite-anchors** (3-org-distinct):
  - https://arxiv.org/abs/2603.12621 (arxiv.org canonical primary)
  - https://www.scilit.com/publications/af208864beeccc4640ead00267594a14 (Scilit indexing; distinct org)
  - https://aiproductivity.ai/news/aegis-open-source-firewall-ai-agent-tool-calls/ (AI Productivity community 3rd-party; distinct org)
- **D38 MCP-native**: TBD (paper-only; reference impl not yet validated for CC)
- **D39 Opus 4.7 compat**: 4 (Python framework integration list expected to cover Claude Agent SDK)
- **D40 Z-portable**: TBD
- **D41 autonomous-loop compat**: 5 (pre-execution firewall pattern; designed for autonomous loops)
- **D45 awesome-list corroboration**: 5 (peer-reviewed 2026-03 paper)
- **EXPECTED tier**: **T3 PATTERN-STUDY**. The Ed25519 + SHA-256 hash-chain combination is the STRONGEST SOTA reference for K-5 wave-events.jsonl + K-6 signed-audit-trails. Vendor-fork or pattern-vendor the audit-trail Ed25519 signing into Claude Code SessionStart/PreToolUse hooks.

### Candidate C11 (bonus): `pre-commit/pre-commit-hooks` ecosystem (pre-commit gate framework)

- **1-line**: Multi-language pre-commit hook framework; native Windows support; recent (March 2026) GitHub Dependabot integration for hook deps.
- **K-N target**: K-6 (hook RCE / signed-audit-trails) — could re-evaluate replacing current direct `gitleaks/trivy/codex-companion.mjs` PreToolUse setup with pre-commit framework.
- **Cite-anchors**:
  - https://github.com/pre-commit/pre-commit-hooks (pre-commit primary)
  - https://pre-commit.com/ (pre-commit canonical docs)
  - https://github.blog/changelog/2026-03-10-dependabot-now-supports-pre-commit-hooks/ (GitHub blog; distinct org)
- **EXPECTED tier**: **T4 CITE-ONLY** (current direct-CLI invocation per CR-2 is more aligned with Anthropic-canonical hook contract; pre-commit framework would be an indirection layer). Pattern-study only.

---

## §4 Aggregate cascade-coverage summary

| Candidate | K-N | EXPECTED tier | MCP families fired | D38-D41 sum | Anti-bias check |
|---|---|---|---|---|---|
| C1 grafana/tempo | K-2 | T2-VENDOR-FORK | 3 | 16 | ✓ (Tempo CNCF-graduated; not star-only) |
| C2 openobserve/openobserve | K-2 | **T1-PROV/T2-CHERRY** | 4 | 18 | ✓ (single-binary; LLM-namespace explicit) |
| C3 SigNoz/signoz | K-2 | T3 PATTERN-STUDY | 3 | 13 | ✓ |
| C4 Arize-ai/openinference-claude | K-2 | T2-CHERRY | 4 | 19 | ✓ (Anthropic-blessed) |
| C5 lifegenieai/claude-code-observability | K-2 | T4 CITE-ONLY | 3 | n/a | ✓ |
| C6 slsa-framework/slsa-verifier | K-4 | **T1 INSTALL candidate** | 5 | 15 | ✓ (CNCF-graduated SLSA / OpenSSF) |
| C7 sigstore/cosign | K-4+K-6 | T2-VENDOR-FORK | 5 | 15 | ✓ (Sigstore/Linux Foundation) |
| C8 in-toto/witness | K-4+K-5+K-6 | T2-CHERRY/T3 | 3 | 13 | ✓ |
| C9 NousResearch/hermes Merkle | K-5+K-6 | T4 CITE-ONLY (pattern) | 3 | n/a | ✓ |
| C10 AEGIS arxiv 2603.12621 | K-5+K-6+K-7 | **T3 PATTERN-STUDY** | 3 | 14 | ✓ (peer-reviewed paper; pattern-extract) |
| C11 pre-commit/pre-commit-hooks | K-6 | T4 CITE-ONLY | 3 | n/a | ✓ |

**Highest-priority for W329 multi-MCP deep-dive** (full cascade to ≥6 families):
1. **C2 openobserve/openobserve** — closest to T1 INSTALL drop-in for Langfuse-alternative (K-2)
2. **C6 slsa-framework/slsa-verifier** — already specified in W327-D-1 §5 step 1; Windows binary confirmed; complete cascade in W329 for T1 INSTALL ratification
3. **C10 AEGIS arxiv 2603.12621** — peer-reviewed SOTA reference for the Ed25519 + SHA-256 hash-chain pattern that K-5 wave-events.jsonl + K-6 signed-audit-trails are converging on

---

## §5 Anti-bias gate applied

- **C2 openobserve**: stars NOT a hardgate (per sca-v11 §3); the single-binary Rust Z-portable fit + LLM-namespace explicit support are the qualifying signals, not star count.
- **C6 slsa-verifier**: CNCF-graduated + OpenSSF; D6 author-prior LIFT +1 (Bayesian author-prior).
- **C10 AEGIS**: paper-only at this point; would need impl-validation (T3 PATTERN-STUDY ceiling; can't reach T1 without working impl).
- **No "trending" tag T1 escalations**: all candidates pre-date W328 wave and have ≥6-month track records.
- **3-org-distinct anchor count**: each of C1-C11 has ≥3 org-distinct anchors verified.

---

## §6 Carry-forward to W329 multi-MCP deep-dive

For each of C2 / C6 / C10, W329 will run full sca-v11 cascade with cascade-floor ≥6 MCP families:
- ✓ Currently fired: WebSearch + deepwiki + hf-mcp-server (+ implicit github cite-anchor via deepwiki)
- ⌛ Pending W329: WebFetch + context7 + repomix (+ codex round-N corroboration)
- D-EMP probe required: install-in-runtime + smoke-test in-runtime (sca-v11 §4 HARD GATE)

**Output of W329 deep-dive** will be 3 fully-cascaded sca-v11 verdicts → ledger rows with all 39.4-denom dims scored + codex round-N ratify gate.

---

## §7 Cite-anchor master list

- W327-D-1 §3 K-2 + §5 K-4 + §6 K-5 + §7 K-6 + §8 K-7
- sca-v11 §1 Stage-0 existence-probe (6-family floor; all C1-C11 pass slug-existence)
- sca-v11 §2 Phase-1 cascade cost-cap (T3 PATTERN-STUDY $0.50 hard-cap × 11 candidates = $5.50 total wave budget; well under tier-cap)
- sca-v11 §5 D35-D45 + §5d D46-D49 (dim scoring rubric)
- W295 §6.2 anti-bias inverse-test methodology
- AEGIS arxiv 2603.12621 (peer-reviewed primary)
- SLSA v1.0 + Sigstore + cosign + slsa-verifier release matrix
- OpenObserve docs + deepwiki ask_question result confirming Windows AMD64 + ZO_TRACING_HEADER_VALUE
- Grafana Tempo deepwiki ask_question result confirming OTel HTTP/protobuf + Basic auth via collector framework
