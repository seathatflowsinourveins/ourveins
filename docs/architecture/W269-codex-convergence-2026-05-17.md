# W269 Codex Cross-Model Convergence Review (GPT-5.5)
*Date: 2026-05-17 | Wave: W265-W269 | Reviewer: Codex GPT-5.5*

## 0. Source Manifest

- VERIFIED read: `docs/architecture/W265-truth-up-and-langfuse-wiring-2026-05-17.md` - 182 lines.
- VERIFIED read: `docs/architecture/W266-codex-2nd-pass-2026-05-17.md` - 43 lines.
- VERIFIED read: `docs/architecture/W267-all-gaps-resolved-2026-05-17.md` - 91 lines.
- VERIFIED read: `docs/architecture/W267-mtp-load-failure-2026-05-17.md` - 99 lines.
- VERIFIED read: `docs/architecture/W268-final-convergence-2026-05-17.md` - 105 lines.
- VERIFIED read: `docs/architecture/W269-codex-sequencing-2026-05-17.md` - 16 lines.
- VERIFIED read: `docs/architecture/W269-option-c-spec-decode-2026-05-17.md` - 83 lines.
- MISSING from requested glob set: none.

## 1. Overclaims & Unsubstantiated Assertions

1. MAJOR - VERIFIED overclaim: W267 says "7/7 gaps verified" while Gap 1 is explicitly deferred until operator respawns producers and traces remain at `totalItems: 0`. This is not "verified" end-to-end trace flow; it is verified config plus unverified emission. Cite: `docs/architecture/W267-all-gaps-resolved-2026-05-17.md:9`, `docs/architecture/W267-all-gaps-resolved-2026-05-17.md:11`, `docs/architecture/W267-all-gaps-resolved-2026-05-17.md:91`.

2. MAJOR - VERIFIED overclaim: W267 calls MTP re-quant "RESOLVED-INLINE" and says Unsloth released the needed GGUF, but W267-mtp later shows the MTP GGUF failed to load at `blk.40.attn_qkv.weight`. The existence of the artifact was resolved; operational MTP was not. Cite: `docs/architecture/W267-all-gaps-resolved-2026-05-17.md:49-58`, `docs/architecture/W267-mtp-load-failure-2026-05-17.md:20-28`.

3. MAJOR - VERIFIED contradiction: W267 all-gaps projects MTP will "remove ngram-mod" and reclaim about 10% latency, while W267 failure recommends Path B: keep old GGUF, use ngram-mod, and defer MTP. Cite both sides: `docs/architecture/W267-all-gaps-resolved-2026-05-17.md:58`, `docs/architecture/W267-mtp-load-failure-2026-05-17.md:58-67`, `docs/architecture/W267-mtp-load-failure-2026-05-17.md:75-83`.

4. MAJOR - VERIFIED overclaim: W267-mtp says "No data loss, no service-state degradation" after a failed service-managed restart, transient PAUSED state, and all-or-nothing rollback that removed independently safe flags. It may be true, but the doc cites health/status, not a post-rollback functional regression suite. Cite: `docs/architecture/W267-mtp-load-failure-2026-05-17.md:13-14`, `docs/architecture/W267-mtp-load-failure-2026-05-17.md:46`, `docs/architecture/W267-mtp-load-failure-2026-05-17.md:91-99`.

5. CRITICAL - VERIFIED unsubstantiated assertion: W268 says secrets were "FIXED THIS TURN" and moved to `CLAUDE.local.md`, while still listing old Langfuse key revocation/rotation as operator-coordinated. Externalizing tracked secrets is not complete secret remediation until prior keys are revoked and leak gates block. Cite: `docs/architecture/W268-final-convergence-2026-05-17.md:16`, `docs/architecture/W268-final-convergence-2026-05-17.md:27`, `docs/architecture/W268-final-convergence-2026-05-17.md:83`.

6. MAJOR - VERIFIED overclaim: W268 marks eval harness "SHIP - 5 ADOPT tools, all already installed" but the same section says the end-to-end conductor and all 8 jobs need about 24h operator effort over a 7-day plan. Tool availability is applied; harness behavior is not shipped. Cite: `docs/architecture/W268-final-convergence-2026-05-17.md:37-50`.

7. MAJOR - VERIFIED overclaim: W268 states the runtime is "SHIP-applied for live use" while the same doc lists DR, supervised inference/memory chain, fresh-machine bootstrap, Hindsight failover, and secret rotation as still open. Live-use may be true for ad hoc operation; it is not equivalent to operable architecture convergence. Cite: `docs/architecture/W268-final-convergence-2026-05-17.md:12-24`, `docs/architecture/W268-final-convergence-2026-05-17.md:81-96`.

8. MAJOR - VERIFIED contradiction: W268 live state says `:8000` CogneeMCP is RUNNING; W267 all-gaps said `CogneeMCP` was Paused and required operator restart. The later doc may supersede the earlier one, but it gives no local proof line for the state transition. Cite: `docs/architecture/W267-all-gaps-resolved-2026-05-17.md:11`, `docs/architecture/W268-final-convergence-2026-05-17.md:71`.

9. MAJOR - VERIFIED contradiction: W268 live state reports `:8080` on W267 Path B with q4/q4, Hadamard, `--fit`, and `--parallel 4`; W267-mtp status says `:8080` is live again with pre-W267 q8/q8, no Hadamard, no `--fit`. W268 likely supersedes the failure log, but the transition is not evidenced in the reviewed set. Cite: `docs/architecture/W267-mtp-load-failure-2026-05-17.md:46`, `docs/architecture/W267-mtp-load-failure-2026-05-17.md:93`, `docs/architecture/W268-final-convergence-2026-05-17.md:66-68`.

10. MAJOR - VERIFIED overclaim: W269-option-c says Option C can make `:8080` text-only and put vision on `:8090`, but the same doc says `qwen3-vl-8b` is not in the live model list and llama-swap reload is required before Option C is testable. Decision is ahead of verified feasibility. Cite: `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:5-13`, `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:17-23`.

11. MAJOR - VERIFIED overclaim: W269-option-c projects 1.2-1.4x speedup for ngram-mod, while W269-codex-sequencing warns ngram-mod evidence is not a sourced +20-40% ik_llama claim for short extraction and that MTP has mixed or conditional evidence. Cite: `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:69`, `docs/architecture/W269-codex-sequencing-2026-05-17.md:1-2`.

12. MAJOR - VERIFIED contradiction: W269-option-c classifies ngram-mod MoE regression as low because PR 1261 skips expert forward, but W269-codex-sequencing says the evidence for ngram-mod on the relevant workload is weak and not short extraction. The risk may be low, but the reviewed docs do not converge on the strength of evidence. Cite: `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:78-79`, `docs/architecture/W269-codex-sequencing-2026-05-17.md:1-2`.

13. MINOR - VERIFIED unsubstantiated assertion: W265 says Cognee uses LiteLLM internally and therefore LiteLLM picks up Langfuse env vars automatically. The reviewed line does not cite Cognee implementation or LiteLLM callback config; W267 later validates some env-name expectations for a Langfuse MCP repo, not Cognee emission. Cite: `docs/architecture/W265-truth-up-and-langfuse-wiring-2026-05-17.md:55-67`, `docs/architecture/W267-all-gaps-resolved-2026-05-17.md:11`.

14. MINOR - VERIFIED overclaim corrected but still risky: W265 says a fifth request "gets refused or OOMs" from theoretical 4-slot KV math plus live 1 GiB margin. W266 confirms near-ceiling VRAM but found no sampled OOM/swap/eviction evidence. Treat as plausible risk, not observed failure. Cite: `docs/architecture/W265-truth-up-and-langfuse-wiring-2026-05-17.md:104-107`, `docs/architecture/W266-codex-2nd-pass-2026-05-17.md:8-14`.

## 2. Missed Risks

1. CRITICAL - VERIFIED/INFERRED: secret lifecycle remains partly open. W268 explicitly catches tracked `.mcp.json` secrets and claims interpolation fixed it, but it still requires old key rotation and blocking gitleaks. Missed risk: a post-fix doc may cause operators to stop before revocation and hook hardening. Cite: `docs/architecture/W268-final-convergence-2026-05-17.md:16-18`, `docs/architecture/W268-final-convergence-2026-05-17.md:27`, `docs/architecture/W268-final-convergence-2026-05-17.md:83`.

2. CRITICAL - VERIFIED/INFERRED: service-state claims are drifting across docs. Cognee moves from Paused to RUNNING, and `:8080` moves from pre-W267 rollback flags to Path B flags, without a contained transition ledger in the reviewed files. Next regression could come from acting on stale state. Cite: `docs/architecture/W267-all-gaps-resolved-2026-05-17.md:11`, `docs/architecture/W267-mtp-load-failure-2026-05-17.md:93`, `docs/architecture/W268-final-convergence-2026-05-17.md:66-72`.

3. CRITICAL - VERIFIED/INFERRED: speculative decoding experiments are being sequenced before operational durability is closed. W268 says the actual frontier is operability, not more research; W269-codex-sequencing explicitly calls W269 premature pending W268 operational items. Cite: `docs/architecture/W268-final-convergence-2026-05-17.md:92-96`, `docs/architecture/W269-codex-sequencing-2026-05-17.md:13-16`.

4. MAJOR - VERIFIED/INFERRED: MTP/PR-level correctness is not pinned before new flag experiments. W269-codex-sequencing says local HEAD `1f8c603` lacks PR #1816, notes MTP parallel-slot semantics, and prioritizes rebuild before Option C or Path A. W269-option-c gives operational steps but does not make PR sweep a hard precondition. Cite: `docs/architecture/W269-codex-sequencing-2026-05-17.md:4-11`, `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:15-39`.

5. MAJOR - VERIFIED/INFERRED: mixed text/vision latency can regress CC-facing flows. W269-option-c acknowledges first vision call evicts the 35B and the next text call reloads with 30-60s class cost, but its decision section says eviction is acceptable because no CC-side caller consumes vision. Missed risk: future or hidden callers may interleave vision and text after the path is advertised. Cite: `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:7`, `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:55-58`, `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:69-70`.

6. MAJOR - VERIFIED/INFERRED: alerting still may not produce recovery. W265 designs VRAM alerts, and W268 says alerts detect but nothing restarts. Risk remains until supervisor/fallback semantics exist for `:8080`, Hindsight, Cognee, and pg0. Cite: `docs/architecture/W265-truth-up-and-langfuse-wiring-2026-05-17.md:104-148`, `docs/architecture/W268-final-convergence-2026-05-17.md:21`, `docs/architecture/W268-final-convergence-2026-05-17.md:85`.

7. MAJOR - VERIFIED/INFERRED: rollback backups live in volatile/local paths without a DR drill. W267-mtp celebrates the NSSM rollback backup; W268 says backup/restore runbook is absent and needs non-Z storage. A local AppParameters backup does not cover machine loss, bad disk, or corrupted state. Cite: `docs/architecture/W267-mtp-load-failure-2026-05-17.md:38-46`, `docs/architecture/W267-mtp-load-failure-2026-05-17.md:87-89`, `docs/architecture/W268-final-convergence-2026-05-17.md:17`, `docs/architecture/W268-final-convergence-2026-05-17.md:28`.

8. MAJOR - VERIFIED/INFERRED: frozen-work boundaries are unstable. W265 freezes new model/plugin work until Langfuse traces and VRAM alert are wired; W267 proceeds into MTP download/restart; W268 lists MTP retry and Option C as still operator-coordinated. The docs do not define the release gate that permits W269 experiments. Cite: `docs/architecture/W265-truth-up-and-langfuse-wiring-2026-05-17.md:151-164`, `docs/architecture/W267-mtp-load-failure-2026-05-17.md:7-14`, `docs/architecture/W268-final-convergence-2026-05-17.md:87-90`.

9. MINOR - HYPOTHESIS: the current docs do not quantify Langfuse/observability storage growth after graphiti/cognee/hindsight wiring. W266 explicitly flags missing trace volume, retention, ClickHouse growth, and disk budget; W268 reports Langfuse live but does not close those capacity numbers. Cite: `docs/architecture/W266-codex-2nd-pass-2026-05-17.md:15-20`, `docs/architecture/W268-final-convergence-2026-05-17.md:74`.

10. MINOR - HYPOTHESIS: test gates may be brittle because some commands in W269-option-c inspect logs immediately after stopping the service. The intent is clear, but the pass criterion depends on log file identity and timing. Cite: `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:41-49`.

## 3. Pre-Registration: Parallel Agent Scoring Criteria

### 3a. W269-system-monitor scoring criteria

1. It must reconcile live service state against the contradictory docs: Cognee Paused vs RUNNING, `:8080` pre-W267 rollback vs Path B flags, `qwen3-vl-8b` absent from `:8090` live list. Cite baselines: `docs/architecture/W267-all-gaps-resolved-2026-05-17.md:11`, `docs/architecture/W267-mtp-load-failure-2026-05-17.md:93`, `docs/architecture/W268-final-convergence-2026-05-17.md:66-72`, `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:11-13`.
2. It must separate "alert exists" from "recovery exists" and score the restart/fallback gap W268 calls out. Cite baseline: `docs/architecture/W268-final-convergence-2026-05-17.md:21`, `docs/architecture/W268-final-convergence-2026-05-17.md:85`.
3. It must include measured VRAM, slot, and process evidence rather than restating the 23.8/24 GiB and theoretical 5th-request risk. Cite baseline: `docs/architecture/W265-truth-up-and-langfuse-wiring-2026-05-17.md:104-107`, `docs/architecture/W266-codex-2nd-pass-2026-05-17.md:8-14`.
4. It must produce a restart-safe operational runbook with rollback checkpoints for `IkLlamaServer`, llama-swap, Cognee, Hindsight, and backing stores, or explicitly mark them out of scope. Cite baseline: `docs/architecture/W268-final-convergence-2026-05-17.md:25-30`.
5. It must not declare system health from HTTP 200 alone; it should include traces/emission, degraded-mode behavior, and post-restart checks. Cite baseline: `docs/architecture/W267-all-gaps-resolved-2026-05-17.md:9-12`.

### 3b. W269-local-model-sota scoring criteria

1. It must distinguish MTP, ngram-mod, and dual-spec evidence by workload, especially short structured extraction vs long-context repetition/editing. Cite baseline: `docs/architecture/W269-codex-sequencing-2026-05-17.md:1-2`.
2. It must treat ik_llama PR sweep/rebuild as a correctness gate before Path A or Option C, including the PR #1816 and parallel-slot concerns identified in W269 sequencing. Cite baseline: `docs/architecture/W269-codex-sequencing-2026-05-17.md:4-11`, `docs/architecture/W269-codex-sequencing-2026-05-17.md:13-16`.
3. It must account for live multimodal/spec-decode exclusion from `--mmproj`, not just throughput projections. Cite baseline: `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:1-4`.
4. It must score Option C with cold-load, eviction, and future vision-caller risks, not only current absence of CC-side vision callers. Cite baseline: `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:7`, `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:55-58`, `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:69-70`.
5. It must avoid unsourced speedup claims unless tied to measured local tokens/sec before and after the exact flag change. Cite baseline conflict: `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:69`, `docs/architecture/W269-codex-sequencing-2026-05-17.md:1-2`.

### 3c. W269-gap-audit scoring criteria

1. It must separate DECIDED, CONFIGURED, APPLIED, LIVE, and OPERABLE. This distinction is repeatedly blurred across W265-W268. Cite baselines: `docs/architecture/W265-truth-up-and-langfuse-wiring-2026-05-17.md:21`, `docs/architecture/W267-all-gaps-resolved-2026-05-17.md:91`, `docs/architecture/W268-final-convergence-2026-05-17.md:52-63`.
2. It must preserve contradictions instead of smoothing them: MTP resolved vs failed, Cognee Paused vs RUNNING, `:8080` q8 rollback vs Path B flags. Cite baselines: `docs/architecture/W267-all-gaps-resolved-2026-05-17.md:49-58`, `docs/architecture/W267-mtp-load-failure-2026-05-17.md:20-28`, `docs/architecture/W267-all-gaps-resolved-2026-05-17.md:11`, `docs/architecture/W268-final-convergence-2026-05-17.md:66-72`.
3. It must rank operational durability gaps ahead of new inference experiments unless it explicitly justifies an operator override. Cite baselines: `docs/architecture/W268-final-convergence-2026-05-17.md:92-96`, `docs/architecture/W269-codex-sequencing-2026-05-17.md:13-16`.
4. It must close or carry forward the W268 P-class matrix item by item, especially secrets, DR, egress, bootstrap, recovery, autocompact, and Hindsight failover. Cite baseline: `docs/architecture/W268-final-convergence-2026-05-17.md:12-24`.
5. It must include evidence freshness: line-cited docs are useful, but claims about live ports, NSSM state, model lists, and trace counts need same-day probes or must be marked stale. Cite examples: `docs/architecture/W267-all-gaps-resolved-2026-05-17.md:11`, `docs/architecture/W268-final-convergence-2026-05-17.md:64-79`, `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:9-13`.

## 4. Convergence Verdict

VERIFIED: The W265-W269 wave is converging on better truthfulness, but diverging on release discipline. W265 honestly downgrades prior claims from 9/9 applied to 6/9 applied plus 3 pending; W266 challenges migration, Langfuse, and VRAM optimism; W267 records a real MTP rollback; W268 identifies the deeper operational-durability axis; and W269-codex-sequencing rejects more speculative-decoding work before PR sweep and operational closure. Cite: `docs/architecture/W265-truth-up-and-langfuse-wiring-2026-05-17.md:21`, `docs/architecture/W266-codex-2nd-pass-2026-05-17.md:1-6`, `docs/architecture/W267-mtp-load-failure-2026-05-17.md:85-89`, `docs/architecture/W268-final-convergence-2026-05-17.md:92-96`, `docs/architecture/W269-codex-sequencing-2026-05-17.md:13-16`.

INFERRED: The next regression is most likely to come from state drift plus flag-stack coupling around `IkLlamaServer`/llama-swap, not from a missing research paper. Evidence: the docs disagree on live `:8080` flags and Cognee state, MTP failed because several flags were bundled into one AppParameters string, Option C requires llama-swap reload before it is even testable, and W269 sequencing warns the local ik_llama build is missing correctness PRs. Cite: `docs/architecture/W267-mtp-load-failure-2026-05-17.md:46`, `docs/architecture/W267-mtp-load-failure-2026-05-17.md:87-88`, `docs/architecture/W268-final-convergence-2026-05-17.md:66-72`, `docs/architecture/W269-option-c-spec-decode-2026-05-17.md:11-13`, `docs/architecture/W269-codex-sequencing-2026-05-17.md:4-11`.

HYPOTHESIS: The highest-leverage W270 action is a single live-state and operability freeze: produce an audited service-state manifest, rotate/revoke old Langfuse keys, make gitleaks blocking, add a restore drill target, and only then run an isolated ik_llama PR-sweep/rebuild benchmark. That action resolves the biggest W268 finding and gives W269 model experiments a stable baseline. Cite: `docs/architecture/W268-final-convergence-2026-05-17.md:25-30`, `docs/architecture/W268-final-convergence-2026-05-17.md:81-90`, `docs/architecture/W269-codex-sequencing-2026-05-17.md:10-16`.

## 5. Top-of-Mind (5 lines)

- W269 should not stack new decode experiments before W268 operational P0/P1s are closed.
- "Resolved" must mean live behavior verified, not artifact exists or config staged.
- `IkLlamaServer` AppParameters are the highest-risk coupling point.
- Secret remediation is incomplete until old keys are revoked and leak gates block.
- The parallel agents should score current live state, not harmonize stale docs.

---
VERDICT: NO-SHIP - convergence is improving, but W265-W269 is not yet a stable architecture baseline because live-state contradictions, unfinished secret lifecycle, missing recovery/DR, and pre-rebuild speculative-decoding work remain open.
