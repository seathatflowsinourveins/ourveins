# Codex GPT-5.5 Round-1 Dual-Axis Adversarial Review — W331 SYNTHESIS (POSITION-SWAP)

**Run**: reversed-order (cluster H→A)  
**Date**: 2026-05-19  
**Reviewer**: codex GPT-5.5  
**Reviewed artefact**: docs/architecture/W331-DEEP-DIVE-LINE-BY-LINE/SYNTHESIS.md

## Axis-1 — PROCESS verdict

**Score**: 0.62  
**Verdict**: NEEDS-REVISION

### Process findings

1. **Phase-1 cascade MCP-family floor — PARTIAL / FAB-RISK**  
   Synthesis has per-cluster `Stage-0 existence-probe: PASS` rows at `SYNTHESIS.md:170,179,189,199,208,217,226,235`, but does not show the required MCP-family cascade counts (`≥3/≥7/≥9`). Cluster H has no explicit Stage-0/MCP-family evidence; Cluster D has D-EMP rows but no cascade ledger (`cluster-D-agent-frameworks.md:14-24`). Add a compact Phase-1 ledger.

2. **Phase-2 triangulation — FAIL for several major claims**  
   §3 says every cross-cluster theme has ≥3-org-distinct anchors (`SYNTHESIS.md:59-61`), but T-X7 is OpenAI-only (`SYNTHESIS.md:124-130`), T-X8 is modelcontextprotocol-only (`SYNTHESIS.md:132-136`), and T-X9 is Anthropic-only (`SYNTHESIS.md:139-145`). Also §4 Cluster A cites multiple Anthropic artefacts and calls them distinct-by-artefact (`SYNTHESIS.md:175`), which does not satisfy org-distinct unless the methodology explicitly permits artefact-distinct substitution.

3. **Phase-3 anti-bias — PARTIAL**  
   Cluster F explicitly addresses popularity/star bias and 5-gate validation (`cluster-F-llm-proxies-dsl.md:588,641`). Cluster D includes an anti-bias note for the Microsoft governance toolkit (`cluster-D-agent-frameworks.md:18`). The synthesis itself does not apply a visible stars-only auto-demotion rule across all T1/T2 rows. No direct stars-only T1 install was found, but the process is not auditable.

4. **Phase-4 D-EMP HARD GATE — FAIL for H synthesis row**  
   Cluster A is good: T1 rows have D-EMP ≥2 (`cluster-A-anthropic-official.md:44,47-49,587-595`). Cluster D’s T2-CHERRY has D-EMP=2 (`cluster-D-agent-frameworks.md:18`). But the synthesis upgrades Cluster H into “T1-INSTALL CR-1 sources × 4” (`SYNTHESIS.md:55`) while Cluster H’s actual CR-1 sources are T2-CHERRY/pattern sources (`cluster-H-plugin-ecosystem.md:27-28,48,52`) and no D-EMP is recorded. That violates the D-EMP hard-gate surface.

5. **Phase-5 5-gate validation — FAIL / incomplete**  
   Cluster F says gate 2 and gate 3 are pending (`cluster-F-llm-proxies-dsl.md:641`). The synthesis nevertheless marks §4 complete and ready (`SYNTHESIS.md:435`). There is no synthesis-level gate ledger for provenance re-fetch, paraphrase invariance, adversarial blinded review, contamination, and replayability.

6. **§3 Cross-cluster themes T-X1..T-X9 — PARTIAL**  
   T-X1/T-X2/T-X3/T-X4/T-X5/T-X6 are mostly supported by multi-org anchors (`SYNTHESIS.md:63-122`). T-X7/T-X8/T-X9 fail the stated ≥3-org-distinct constraint, as noted above. Required: either demote them from “cross-cluster themes” to “single-cluster findings” or add independent org-distinct anchors.

7. **§5 W330 P0 cross-mapping — PARTIAL / overclaims**  
   P0.6/P0.11 mem0 mapping is supported (`cluster-E-memory-rag.md:183-206`). P0.8/P0.12 DSPy mapping is supported (`cluster-F-llm-proxies-dsl.md:18,252-266`). P0.2 is weak: synthesis claims “official `/insights` corpus contract” (`SYNTHESIS.md:249`), but Cluster A only says project-dir redirect patterns inform the env-var probe (`cluster-A-anthropic-official.md:609`). P0.4 “INSTALL-STATE CONTRACT” is also over-marked RESOLVED by CR-1 trust anchors, not by a verified installed_plugins reconciliation mechanism (`SYNTHESIS.md:251`).

8. **§6 INDEPENDENCE-PROOF Δ-G51 — PARTIAL**  
   The synthesis includes org/causal/temporal pillars (`SYNTHESIS.md:278-301`), but causal and temporal distinctness are asserted rather than evidenced with dispatch logs, task IDs, or per-cluster creation order. The cluster ownership table has agent IDs (`SYNTHESIS.md:13-22`), which is a useful start.

9. **W269 F4 + F5 compliance — PARTIAL**  
   GOAL-W331 explicitly requires no inline repomix-pack and empty final-message handling (`GOAL-W331.md:29-30`). I found no inline repomix pack embedded in the synthesis. Empty-output handling is discussed as a theme (`SYNTHESIS.md:73-82`), but there is no proof that all worker outputs were strip-tested before synthesis. Add a manifest row for each cluster final_message: non-empty / NO-FINDINGS.

## Axis-2 — CONTENT verdict

**Score**: 0.74  
**Verdict**: NEEDS-REVISION

### Content findings

1. **Cluster-H GitNexus 803f0bed Windows FTS fix — FAIL / FAB-RISK**  
   The source line exists and mentions SIGSEGV: `pool-adapter.ts:423-426` says LOAD EXTENSION crashes with SIGSEGV on Windows. But the actual code still skips FTS load on Windows and marks `shared.ftsLoaded = true` (`pool-adapter.ts:427-431`, repeated at `497-502`). That contradicts Cluster H’s “probe-then-load” / “BM25 with extension active” claim (`cluster-H-plugin-ecosystem.md:137`) and the synthesis’s “Windows FTS fix” framing (`SYNTHESIS.md:55,238`). Required correction: describe it as a Windows SIGSEGV avoidance / graceful degradation guard unless a later commit actually probes and loads.

2. **Cluster-H CR-1 trust extension 4-org cite — PASS with tier caveat**  
   OSSF Scorecard, Aqua Trivy, Cloudflare digest-pin, and Obra strict-pin are present in Cluster H (`cluster-H-plugin-ecosystem.md:251-257,392-415`). Content support is good; synthesis tier wording “T1-INSTALL CR-1 sources × 4” is the problem.

3. **Cluster-G OTLP metrics/logs gap — PASS**  
   Cluster G explicitly states no repo exports OTLP metrics/logs from CC hook event stream and distinguishes outbound model-call wrapping (`cluster-G-evals-observability.md:29`). It also cites Traceloop triple-exporter support (`cluster-G-evals-observability.md:101-104`) and defers metrics/logs implementation (`cluster-G-evals-observability.md:268-270`).

4. **Cluster-F DSPy v3.2.1 dual-T1 — PASS**  
   DSPy install_score 4.55 and pattern_score 4.70 are present (`cluster-F-llm-proxies-dsl.md:18`). Orthogonality is explicitly stated: DSPy complements LlamaSwap/proxy routing (`cluster-F-llm-proxies-dsl.md:18,175,455`). Not duplicative.

5. **Cluster-E mem0 v2.0.2 T1 bakeoff winner — PASS**  
   Cluster E provides install_score 4.04 vs graphiti 3.63, per-D breakdown D1/D3/D8/D11/D12/D13, and winner rationale (`cluster-E-memory-rag.md:183-206`). The synthesis accurately carries this (`SYNTHESIS.md:210,253`).

6. **Cluster-D Microsoft agent-governance-toolkit T2-CHERRY — PASS**  
   The YAML exists and is 1-418 cited by cluster/synthesis. Rule names run from line 30 through 404, with defaults at 413-417. There are 40+ named rules, so “32+ ASI-Top-10 rules” is conservative (`cluster-D-agent-frameworks.md:18,173-207`; source `general-saas.yaml:30-417`).

7. **Cluster-C MCP draft spec SEP-2575 — PASS**  
   Cluster C references SEP-2575 and the draft removal/addition correctly (`cluster-C-mcp-foundation.md:41-49`). Source changelog verifies removal of `initialize`/`notifications/initialized` and addition of `server/discover` (`changelog.mdx:14-16`).

8. **Cluster-B W331-X1 SEV-2 — PASS**  
   Cluster B cites the correct files for broker endpoint, app-server protocol, and lifecycle (`cluster-B-openai-codex.md:33-46`). Local plugin cache verifies named pipe / Unix socket and JSON-RPC method-map (`broker-endpoint.mjs:12-16`; `app-server-protocol.d.ts:59-64`; `broker-lifecycle.mjs:50,63-71`). CLAUDE.md still contains the outdated `codex exec` foreground+tee wording (`CLAUDE.md:10`).

9. **Cluster-A T1-INSTALL ×3 — PASS**  
   Cluster A has T1-INSTALL rows for cwc-long-running-agents, anthropics-skills, and claude-plugins-official, all with D-EMP ≥2 and install/pattern ≥4.5 (`cluster-A-anthropic-official.md:47-49,587-595`). Composite support is adequate.

## Position-bias self-check

Reading H first increased my sensitivity to the GitNexus claim because it was the first high-severity “source-of-truth” claim encountered. That made me verify `pool-adapter.ts` directly rather than accepting the synthesis row. This did not cause a broad anti-H bias: I still pass H’s CR-1 cite set and most later-cluster claims. The biggest weighting shift is that the H GitNexus contradiction now dominates the content verdict because it is repeated in both Cluster H and the synthesis (`cluster-H-plugin-ecosystem.md:137,470`; `SYNTHESIS.md:55,238`).

I would expect a forward-order reviewer to foreground Cluster A/B successes and perhaps give a higher first-impression score, but the same direct source check should converge on NEEDS-REVISION.

## Composite verdict

**Composite score**: 0.68  
**Composite verdict**: NEEDS-REVISION

## Required revisions

1. `docs/architecture/W331-DEEP-DIVE-LINE-BY-LINE/cluster-H-plugin-ecosystem.md:137` and `SYNTHESIS.md:55,238`: replace “probe-then-load / BM25 with extension active / Windows FTS fix” with the verified behavior from `pool-adapter.ts:423-431`: Windows SIGSEGV guard skips FTS load and BM25 degrades gracefully/empty while graph queries remain unaffected.

2. `SYNTHESIS.md:44`: remove stale “7/8 clusters delivered. H pending” statement. It contradicts the populated H row and §9 completion status.

3. `SYNTHESIS.md:55`: change “T1-INSTALL CR-1 sources × 4” for Cluster H to T2-CHERRY / cite-anchor sources, or add D-EMP evidence and explicit install rationale. Current wording violates the D-EMP hard gate.

4. `SYNTHESIS.md:124-145`: demote T-X7/T-X8/T-X9 to single-cluster findings or add ≥3-org-distinct anchors for each. Do not label them cross-cluster themes as written.

5. `SYNTHESIS.md:248-260`: revise P0.2 and P0.4 statuses. P0.2 needs an actual `/insights` corpus contract cite; P0.4 needs installed_plugins reconciliation evidence, not only CR-1 trust anchors.

6. Add a Phase-1/Phase-5 process appendix to `SYNTHESIS.md`: MCP-family cascade counts per cluster, D-EMP gate table for every T1/T1-PROV/T2, 5-gate validation status, and final_message strip-test manifest.

## Recommended improvements

1. Add source-file paths to every synthesis claim that currently cites only a cluster summary. This would reduce FAB-RISK in future reviews.

2. Split “resolved” from “operator-actionable input ready” in §5. Several rows are decisions prepared, not mechanisms landed.

3. Keep the forward/swap comparison artifact explicit: add a small table for divergent findings after the A→H review returns.

## Reviewer confidence

0.86