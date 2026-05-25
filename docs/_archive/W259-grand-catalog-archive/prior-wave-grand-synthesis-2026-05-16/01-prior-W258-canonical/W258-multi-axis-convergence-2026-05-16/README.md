# W258 Source Convergence Data (2026-05-16)

The 33 research-round source files backing `W258-final-synthesis-2026-05-16-v3.md`.

| Round | Axis | File | Confidence |
|---|---|---|---|
| r1  | Direct GitHub probe — runtime layer | `W258_runtime_research.md` | 0.88 |
| r2  | Missed candidates + closed-source frontier | `W258r2_runtime_research_round2.md` | 0.91 |
| r3  | Stack-layer dimensions (memory/sandbox/eval/code-intel/CI-CD/proxy) | `W258r3_stack_layer_research.md` | 0.86 |
| r4  | Awesome-list cross-curator convergence | `W258r4_awesome_lists_convergence.md` | 0.74 |
| r5  | Benchmark leaderboard evidence | `W258r5_benchmark_leaderboards.md` | 0.87 |
| r6  | Named-T2 practitioner artifacts | `W258r6_named_practitioners.md` | 0.84 |
| r7  | Production deployment evidence | `W258r7_production_deployments.md` | 0.87 |
| r8  | Academic / arxiv papers | `W258r8_academic_papers.md` | 0.83 |
| r9  | Multi-agent orchestration patterns | `W258r9_orchestration_patterns.md` | 0.89 |
| r10 | Cross-vendor agent SDK comparison | `W258r10_vendor_sdks.md` | 0.89 |
| r11 | Market funding signals | `W258r11_market_signals.md` | 0.86 |
| r12 | Community sentiment + post-mortems | `W258r12_community_sentiment.md` | 0.78 |
| r13 | Cost + token economics | `W258r13_cost_economics.md` | 0.78 |
| r14 | Agent protocols + standards | `W258r14_protocols.md` | 0.86 |
| r15 | **Primary-source SOTA audit** (refuted OpenHands 68.4%) | `W258r15_primary_source_audit.md` | 0.95 |
| r16 | Architecture critique (adversarial) | `W258r16_architecture_critique.md` | n/a |
| r17 | MCP server ecosystem deep-dive | `W258r17_mcp_ecosystem.md` | 0.85 |
| r18 | Foundation model selection for agent loops | `W258r18_model_for_agents.md` | 0.84 |
| r19 | Browser / GUI agent SOTA | `W258r19_browser_gui.md` | n/a |
| r20 | Specialist + niche agents | `W258r20_specialist_agents.md` | 0.72 |
| r21 | Eval framework deep-dive | `W258r21_eval_frameworks.md` | 0.91 |
| r22 | Context engineering (operator audit) | `W258r22_context_engineering.md` | 0.88 |
| r23 | Anthropic-internal engineering practices | `W258r23_anthropic_internal.md` | 0.87 |
| r24 | Durable / long-running task execution | `W258r24_durable_execution.md` | 0.84 |
| r25 | Self-hosted LLM inference | `W258r25_self_host_inference.md` | 0.84 |
| r26 | Prior artifact inventory + organize plan | `W258r26_artifact_organization.md` | n/a |
| r27 | Final missed-angles sweep — DEFINITIVE-SATURATED | `W258r27_final_sweep.md` | 0.89 |
| r29 | V5-kit missed candidates probe | `W258r29_v5_kit_missed.md` | 0.86 |
| r30 | Codex open-followups resolution | `W258r30_codex_followups.md` | 0.94 |
| r31 | 2026-Q2 frontier scan (post-cutoff) | `W258r31_frontier_scan.md` | n/a |
| r32 | Programmatic prompting frameworks | `W258r32_programmatic_prompting.md` | 0.86 |
| r33 | Anthropic Q1/Q2 2026 engineering blog deep | `W258r33_anthropic_q1q2_blog.md` | 0.91 |

## Codex GPT-5.5 cross-model audits

| File | Purpose |
|---|---|
| `codex_consult_w258_e2e_audit_OUT.txt` | First-pass audit of v1 synthesis → NEEDS-REVISION (7/10) → drove v2 |
| `codex_consult_w258_v3_audit_OUT.txt` | Second-pass audit of v3 synthesis (post-Q1/Q2 frontier integration) |

## Out-of-band notes

- **r28** = synthesis writer (output landed at `../W258-final-synthesis-2026-05-16.md` directly; no state file)
- **r34** = this folder-organization fork (output at `.claude/state/W258r34_folder_organized.md`)

## Reading order recommendation

1. Start with `../W258-final-synthesis-2026-05-16-v3.md` — the canonical architecture
2. For convergence-math: r15 (primary-source) + r16 (adversarial critique) + r22 (operator audit)
3. For Anthropic-OFFICIAL alignment: r23 + r33 + the v3 audit OUT
4. For cost economics: r13 + r25 + r30 (validated LiteLLM cascade)
