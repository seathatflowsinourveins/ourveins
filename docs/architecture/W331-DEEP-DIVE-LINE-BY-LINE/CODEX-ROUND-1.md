# Codex GPT-5.5 Round-1 Dual-Axis Adversarial Review — W331 SYNTHESIS

**Run**: forward-order (cluster A→H)
**Date**: 2026-05-19
**Reviewer**: codex GPT-5.5
**Reviewed artefact**: docs/architecture/W331-DEEP-DIVE-LINE-BY-LINE/SYNTHESIS.md

## Axis-1 — PROCESS verdict

**Score**: 0.62
**Verdict**: NEEDS-REVISION

### Process findings

1. **Phase-1 cascade**: ISSUE. Cluster-D/H assert “≥3 org-distinct” but do not show the requested MCP-family T3/T2/T1 cascade ledger. Cluster-D only states operator constraint at `cluster-D-agent-frameworks.md:6`; Cluster-H only states the same at `cluster-H-plugin-ecosystem.md:8-9`.

2. **Phase-2 triangulation**: ISSUE. Synthesis §4 rows use “3-org-distinct” language, but Cluster-A’s row cites Anthropic/Anthropic/anthropic-experimental and explicitly relaxes to “distinct-by-artefact” at `SYNTHESIS.md:175`, not org-distinct. This violates the stated ≥3-org-distinct bar for high-scoring rows.

3. **Phase-3 anti-bias**: APPROVE with caveat. Cluster-E mem0 does not rely on stars alone: it cites V3 pipeline, install_score, D11 token delta, ECAI/AWS at `cluster-E-memory-rag.md:15`, and a bakeoff table at `cluster-E-memory-rag.md:183-189`. Star count remains over-weighted in D12 (`cluster-E-memory-rag.md:189`).

4. **Phase-4 D-EMP HARD GATE**: ISSUE. Cluster-D Microsoft policy has D-EMP=2 at `cluster-D-agent-frameworks.md:18`. Cluster-E mem0 has no D-EMP column in its verdict table (`cluster-E-memory-rag.md:29-39`) and no D-EMP in the bakeoff dimensions (`cluster-E-memory-rag.md:172-189`). Cluster-F DSPy table also lacks D-EMP (`cluster-F-llm-proxies-dsl.md:14-18`). T1/T2 claims must not ship without explicit D-EMP.

5. **Phase-5 5-gate validation**: ISSUE. Synthesis has no concrete artefact paths for provenance re-fetch, paraphrase-invariance, blinded review, contamination grep, or replayable inspect_ai EvalLog. Cluster-F claims prior 5-gate validation at `cluster-F-llm-proxies-dsl.md:588`, but that is not replay evidence for this synthesis.

6. **§3 cross-cluster themes**: PARTIAL. T-X1 has ≥3 anchors but only 2 orgs: Anthropic + Google + Microsoft (`SYNTHESIS.md:63-72`) is acceptable. T-X4 has mem0/ECAI/AWS org split (`SYNTHESIS.md:95-101`) but the score claim depends on Cluster-E’s non-D-EMP bakeoff.

7. **§5 W330 P0 cross-mapping**: ISSUE. Several “RESOLVED” labels are overclaims. P0.1 is marked resolved (`SYNTHESIS.md:248`) while X4 says the subagent-level mandate is not codified (`SYNTHESIS.md:269`). P0.2 is “operator-actionable” not resolved (`SYNTHESIS.md:249`). P0.8 was “DONE W331 Stream-4” in GOAL-W331 (`GOAL-W331.md:22`) but synthesis reframes it as “READY” (`SYNTHESIS.md:255`).

8. **§6 INDEPENDENCE-PROOF Δ-G51**: ISSUE. Org/causal/temporal distinctness is asserted, not evidenced. The causal pillar says no cross-cluster cite during authoring (`SYNTHESIS.md:299-301`) but provides no dispatch transcript, prompt hash, or agent-output ordering proof.

9. **W269 F4 compliance**: APPROVE. I found “pack” references as patterns and byte manifests, not raw repomix output pasted inline. Example: Cluster-H discusses Repomix-as-CI at `cluster-H-plugin-ecosystem.md:149-151`; synthesis lists byte totals at `SYNTHESIS.md:432`.

10. **W269 F5 compliance**: ISSUE. Empty-response patterns are discussed (`SYNTHESIS.md:75-82`; `cluster-D-agent-frameworks.md:350`), but I found no evidence that parent orchestrator stripped/tested agent `tool_result` for empty/whitespace before consuming summaries.

## Axis-2 — CONTENT verdict

**Score**: 0.72
**Verdict**: REVISE

### Content findings

1. **Cluster-A T1-INSTALL ×3**: APPROVE. Cluster-A supports T1 for cwc/skills/plugins with install/pattern ≥4.6 and D-EMP ≥2 at `cluster-A-anthropic-official.md:47-49`, plus D-EMP rationale at `cluster-A-anthropic-official.md:593-595`. Not T2-SHADOW disguised as T1.

2. **Cluster-B W331-X1**: APPROVE. Cluster-B contains the cited broker endpoint, app-server protocol, and lifecycle citations at `cluster-B-openai-codex.md:35-42`. Local source also verifies named-pipe/socket and RPC methods at `broker-endpoint.mjs:11-16`, `app-server-protocol.d.ts:59-65`, `broker-lifecycle.mjs:59-67`.

3. **Cluster-D Microsoft policy**: APPROVE. The YAML exists and contains >32 named rules across ASI-01..ASI-10; local source shows rule names from `general-saas.yaml:30` through `general-saas.yaml:411`. Cluster cite is accurate at `cluster-D-agent-frameworks.md:18` and examples at `cluster-D-agent-frameworks.md:173-207`.

4. **Cluster-E mem0 score**: ISSUE. Cluster-E has per-dimension bakeoff rows (`cluster-E-memory-rag.md:183-189`) but no weighting formula deriving final 4.04 vs 3.63. It calls D1 itself “install_score 4.04” (`cluster-E-memory-rag.md:185`) and then uses the same number as winner score (`cluster-E-memory-rag.md:196-198`). Needs score provenance.

5. **Cluster-F DSPy double-score**: APPROVE with caveat. Cluster-F explicitly separates install_score 4.55 and pattern_score 4.70 and calls DSPy orthogonal to LlamaSwap at `cluster-F-llm-proxies-dsl.md:18`. It is not double-counted as two installs, but synthesis wording should avoid “4.55/4.70 DSPy (top)” ambiguity (`SYNTHESIS.md:53`).

6. **Cluster-G coverage gap**: APPROVE. Cluster-G directly states no metrics/logs from CC hook stream and only outbound model-call wrapping exists at `cluster-G-evals-observability.md:29`; it cites Traceloop triple-exporter at `cluster-G-evals-observability.md:101-104`.

7. **Cluster-H GitNexus 803f0bed**: FAB-RISK. Cluster-H says the fix is “probe-then-load” (`cluster-H-plugin-ecosystem.md:129-137`), but local source at `pool-adapter.ts:423-429` says Windows guard skips loading and BM25 errors return empty results gracefully. That contradicts the “probe-then-load” description. Also synthesis mislabels GitNexus as “W330 P0.6” (`SYNTHESIS.md:55`, `SYNTHESIS.md:238`) while GOAL-W331 P0.6 is the mem0/Letta/Zep bakeoff (`GOAL-W331.md:18`).

8. **Cluster-H CR-1 trust extension**: APPROVE. Cluster-H contains all four org cites: OSSF (`cluster-H-plugin-ecosystem.md:251`), Aqua (`cluster-H-plugin-ecosystem.md:253`), Cloudflare (`cluster-H-plugin-ecosystem.md:254`), Obra (`cluster-H-plugin-ecosystem.md:255`), summarized at `cluster-H-plugin-ecosystem.md:257`.

9. **W331-X1..X9 spot-check**: PARTIAL. X1 has file-line and remediation (`SYNTHESIS.md:266`; Cluster-B lines above). X3 has evidence/remediation (`SYNTHESIS.md:268`; `cluster-G-evals-observability.md:29`, `101-104`). X8 has evidence in Cluster-C (`cluster-C-mcp-foundation.md:112-122`) but synthesis lacks a specific file:line in the X8 row (`SYNTHESIS.md:273`). X2 has FAB-RISK per finding #7.

## Composite verdict

**Composite score**: 0.67
**Composite verdict**: NEEDS-REVISION

## Required revisions

1. Add explicit D-EMP values for mem0 and DSPy before any T1/T2 verdict ships: target `SYNTHESIS.md:209-222`, source `cluster-E-memory-rag.md:29-39`, `cluster-F-llm-proxies-dsl.md:14-18`.

2. Replace or downgrade unsupported Phase-5 validation claims. Add concrete artefact paths for re-fetch SHAs, paraphrase-invariance, blinded review, contamination grep, and EvalLog, or mark Phase-5 incomplete: target `SYNTHESIS.md:414-438`.

3. Fix W330 P0 cross-map overclaims: P0.1/P0.2 should not be “RESOLVED” if codification/operator action remains; P0.8 should reconcile with GOAL-W331 “DONE W331 Stream-4”: target `SYNTHESIS.md:248-260`.

4. Correct Cluster-H GitNexus wording from “probe-then-load” to the actual Windows skip/degrade behavior, or cite a different commit/file that really implements probe-then-load: target `cluster-H-plugin-ecosystem.md:129-137`, `SYNTHESIS.md:55`, `SYNTHESIS.md:238`.

5. Stop calling GitNexus “W330 P0.6”; P0.6 is the T1 memory bakeoff per `GOAL-W331.md:18`. Retag GitNexus as W331-X2 or W330 D2: target `SYNTHESIS.md:55`, `SYNTHESIS.md:238`, `cluster-H-plugin-ecosystem.md:462-466`.

6. Add evidence for W269 F5 actual strip-and-test of agent `tool_result`, or remove the implied compliance. Target `SYNTHESIS.md:75-82`, `SYNTHESIS.md:380-382`.

## Recommended improvements

1. Replace “3-org-distinct” with “3 artefact-distinct” where Cluster-A relies on Anthropic-only sources, or add non-Anthropic corroboration: target `SYNTHESIS.md:175`.

2. Add file:line anchors directly into W331-X rows, especially X8: target `SYNTHESIS.md:266-274`.

3. Add a small dispatch manifest proving causal independence: agent id, prompt hash, start/end time, deliverable path. Target `SYNTHESIS.md:297-301`.

## Reviewer confidence

0.82 — high for direct file/cite verification and content defects; medium for process completeness because some missing evidence may exist outside the reviewed files but is not cited here.