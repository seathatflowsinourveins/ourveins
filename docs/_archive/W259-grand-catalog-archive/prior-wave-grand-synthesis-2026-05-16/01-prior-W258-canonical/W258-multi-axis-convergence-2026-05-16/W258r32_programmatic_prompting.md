# W258r32 — Programmatic Prompting / Structured-Prompt Frameworks (2026-05-16)

**Mission:** Probe programmatic-prompting frameworks (prompt-as-code-module: typing / optimization / composition). Distinct from agent runtimes (driver) and eval frameworks (validator).
**Method:** Parallel `mcp__plugin_everything-claude-code_github__search_repositories` + WebSearch for star counts + Anthropic structured-output state.
**Result:** 10/10 candidates verified. **Verdict: PARTIAL-SATURATION** with one PATTERN-CITE-WORTH probe (DSPy) and one TIER-1 anti-finding (Anthropic native covers most use-cases).

---

## §1 Per-framework cards

| Framework | Stars (approx) | License | Last push | Description (verbatim/short) | Anthropic-API compat |
|---|---|---|---|---|---|
| **stanfordnlp/dspy** | ~34.3k | MIT | 2026-05-15 (daily-active) | "DSPy: The framework for programming—not prompting—language models". Declarative self-improving (signatures + modules + optimizers). | Yes (multi-provider) |
| **zou-group/textgrad** | n/a (Nature paper) | MIT | **2025-07-25 (STALE ~10mo)** | "TextGrad: Automatic 'Differentiation' via Text — using LLMs to backpropagate textual gradients. Published in Nature." | Yes (multi-provider) |
| **UKGovernmentBEIS/inspect_ai** | n/a (active) | MIT | 2026-05-15 (daily-active) | "Inspect: A framework for LLM evaluations". Maintained by UK AI Security Institute — **eval-framework class, overlaps Promptfoo/Phoenix**, not pure prompting. | Yes |
| **eth-sri/lmql** | n/a | Apache-2.0 | **2025-05-22 (STALE 12mo)** | "A language for constraint-guided and efficient LLM programming". ETH Zurich research project. | Yes |
| **dottxt-ai/outlines** | n/a (active) | Apache-2.0 | 2026-05-13 (daily-active) | "Structured Outputs" — constrained generation via FSM/grammar. **Local-models-strongest; less load-bearing for hosted Claude.** | Limited (logit-bias not exposed on Claude API) |
| **BoundaryML/baml** | n/a (active, default branch `canary`) | Apache-2.0 | 2026-05-16 (daily-active) | "AI framework that adds the engineering to prompt engineering (Python/TS/Ruby/Java/C#/Rust/Go)". **DSL-first (`.baml` files) with VSCode playground + tracing.** | Yes |
| **567-labs/instructor** (renamed from `jxnl/instructor`) | ~11k | MIT | active (v1.14.5 Jan 29 2026) | "Structured outputs for LLMs" — Pydantic-typed outputs over multi-provider. **3M monthly downloads** — most-popular Python pick. | Yes (`instructor.from_provider("anthropic/…")`) |
| **guidance-ai/guidance** | n/a (active) | MIT | 2026-05-06 | "A guidance language for controlling large language models". Originally Microsoft; spun out 2024. | Yes (multi-provider) |
| **Mirascope/mirascope** | n/a (active) | MIT | 2026-05-15 (daily-active) | "The LLM Anti-Framework" — Pythonic, no DSL, Pydantic-native. Direct competitor to Instructor with leaner surface. | Yes |
| **langroid/langroid** | n/a (active) | MIT | 2026-05-06 | "Harness LLMs with Multi-Agent Programming". **Multi-agent overlap — not pure prompting; closer to agent runtime, partially covered by W258r10/r9.** | Yes |

---

## §2 Operator-fit analysis (solo dev on Claude Code + 37 plugins + 12 MCPs, Opus 4.7 daily)

Programmatic prompting addresses three sub-roles:

| Sub-role | OSS pick | Operator needs? |
|---|---|---|
| Typed structured outputs | Instructor / BAML / Mirascope | **Anthropic native covers this — see §3.** No install. |
| Prompt optimization (gradient/compile) | DSPy / TextGrad | **PATTERN-CITE WORTH** — DSPy compiles signatures into optimized programs; could lift evals-first loop (r6+r21 4-T2 pattern). |
| Constrained generation (FSM/grammar) | Outlines / LMQL / Guidance | **Local-model use-case** — Claude API does not expose logit-bias; this layer is dead for hosted Claude work. |
| Multi-agent programming | Langroid | Covered by W258 r9 patterns + Claude Code subagents. No install. |

**Operator should NOT install any of these as a runtime layer.** The Claude API now natively supports the load-bearing capability (typed JSON outputs + strict tool-use validation). Installing Instructor/BAML/Mirascope on top of Claude is *redundant infrastructure* — they were architected against OpenAI's pre-2026 surface.

---

## §3 Anthropic-native alternatives (CRITICAL FINDING)

**Anthropic shipped first-class structured outputs in 2026:**
- **`output_config.format` (JSON outputs)** — constrains Claude's response to a specific JSON schema; valid/parseable guaranteed.
- **`strict: true` on tool use** — guarantees schema validation on tool names + inputs.
- **GA on Opus 4.7, Opus 4.6, Sonnet 4.6, Sonnet 4.5, Opus 4.5, Haiku 4.5, Mythos Preview**.
- **Compiled grammars cached 24h** — first-call latency, then fast.
- ⚠ **Prefill (response prefix) is NO LONGER SUPPORTED on latest models** (Sonnet 4.6 / Opus 4.6 / Opus 4.7) as of April 2026. Older prefill-based patterns must migrate.

**Implication for W258 architecture:** add a new pattern-cite to §7 ("Use Anthropic native structured outputs + strict tool use over 3rd-party frameworks; prefill is deprecated"). No new install slot.

---

## §4 GENUINELY-NEW W258 install pick?

**NO new install slot.** Two PATTERN-CITES worth adding:

1. **DSPy as a `compile-evals-first` pattern reference** — when running >100-prompt eval-loops where prompt quality is the bottleneck (matches r6 evals-first + r21 Promptfoo). Pattern only; don't install as runtime layer for a solo-Claude operator.
2. **Anthropic structured-outputs (`output_config.format` + `strict: true`) as the canonical Claude-native solution** — replaces the entire Instructor/BAML/Mirascope category for Claude-API work. Add to L0.5 / §7 of the synthesis as a first-class pattern.

**REJECT additions:**
- LMQL (12mo stale)
- TextGrad (10mo stale, single-paper)
- Outlines/Guidance (logit-bias use-case; not applicable to hosted Claude)
- Instructor/BAML/Mirascope as installed-runtime layers (Anthropic native is the SOTA)

---

## §5 Verdict

**CONFIRMS W258 SATURATION on the install-pick axis** — no new architectural slot needed. Frameworks that compete for this category target the pre-2026 API surface; Anthropic's native structured-output GA closes the use-case.

**Two refinements for synthesis v3 (if operator commissions):**
1. New §7 pattern entry: "Anthropic native structured outputs (`output_config.format` + `strict: true`) over 3rd-party Instructor/BAML; prefill deprecated April 2026."
2. New §6 pattern-cite: "DSPy compile-loop pattern" — reference for evals-first prompt optimization at scale.

Confidence: **0.86** (10/10 verified, Anthropic primary source cross-checked via WebSearch).

---

## Sources (primary)

- [Anthropic — Structured outputs (Claude API docs)](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)
- [Anthropic — Get structured output from agents (Agent SDK)](https://platform.claude.com/docs/en/agent-sdk/structured-outputs)
- [stanfordnlp/dspy](https://github.com/stanfordnlp/dspy) — MIT, 34.3k stars, daily-active 2026-05-15
- [zou-group/textgrad](https://github.com/zou-group/textgrad) — MIT, STALE (last push 2025-07-25)
- [UKGovernmentBEIS/inspect_ai](https://github.com/UKGovernmentBEIS/inspect_ai) — MIT, daily-active
- [eth-sri/lmql](https://github.com/eth-sri/lmql) — Apache-2.0, STALE (last push 2025-05-22)
- [dottxt-ai/outlines](https://github.com/dottxt-ai/outlines) — Apache-2.0, daily-active
- [BoundaryML/baml](https://github.com/BoundaryML/baml) — Apache-2.0, daily-active (canary branch)
- [567-labs/instructor](https://github.com/567-labs/instructor) — MIT, v1.14.5 (Jan 29 2026), 3M downloads/mo, ~11k stars
- [guidance-ai/guidance](https://github.com/guidance-ai/guidance) — MIT, daily-active
- [Mirascope/mirascope](https://github.com/Mirascope/mirascope) — MIT, daily-active
- [langroid/langroid](https://github.com/langroid/langroid) — MIT, daily-active
