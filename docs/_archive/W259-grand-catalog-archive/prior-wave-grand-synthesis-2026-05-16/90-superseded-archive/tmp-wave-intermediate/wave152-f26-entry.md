
---

## Wave 152 Fire 26 — Output.ai SDK Probe DAG audit + CR-12 PROVIDER-COMPLEMENT (already-installed-but-operationally-dormant; NEW research surface post-W152-F20-priority-queue exhaustion; user 14th-verbatim directive; USER-CORRECTION-ACK n=18→n=19; FM-21.c n=10→n=11 same-wave; FM-21.a defense n=8→n=9; CR-12 PROVIDER-COMPLEMENT 2nd same-arc instance after W152-F19)

**Date**: 2026-05-11
**Wave**: 152 Fire 26 (NEW research surface — W152-F20 priority queue exhausted at F25)
**Type**: Fresh research-class audit of Anthropic-OFFICIAL marketplace plugin already INSTALLED but unused in eee
**Risk class**: LOW per `launch-discipline.md §D1`
**HEAD pre-ship**: `922de03` (W152-F25 session-browser CITE-PATTERN-ONLY)

### Audit target

**Output.ai SDK** — `outputai@claude-plugins-official` plugin
- Site: `https://output.ai`
- Docs: `https://docs.output.ai/packages/core` + `https://docs.output.ai/workflows`
- LICENSE: Apache-2.0
- Provenance: Anthropic-OFFICIAL marketplace plugin
- npm packages: `@outputai/core` + `@outputai/http` + `@outputai/credentials` + `@outputai/llm` + `@outputai/evals` + `@outputai/cli`
- Backend: Temporal.io (Docker Compose for local dev)

### Discovery surprise

Plugin is **ALREADY ENABLED** in `.claude/settings.json` as `outputai@claude-plugins-official` (line 130 per grep). SessionStart hook context loads ~40 `outputai:*` skills. But never deep-audited at Probe DAG + CR-12 disposition level.

### Memory file shipped (gitignored)

`Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/reference_outputai_sdk_audit_2026_05_11.md` (~155 LOC)

### Core architecture verbatim (TIER-1-OFFICIAL via Exa)

> "Output is built on Temporal.io for durable execution. Your abstractions map to Temporal primitives:
> | Output.ai | Temporal |
> | --- | --- |
> | `workflow()` | Workflow |
> | `step()` | Activity |
> | `evaluator()` | Activity |"

> "Everything you know you should be doing: prompts, evals, tracing, cost tracking, security, durable execution. Done for you and perfectly set up for Claude Code. One open-source TypeScript framework instead of a dozen SaaS subscriptions."

### Probe DAG verdict

P1 PASS / P2 TypeScript SDK + CLI hybrid / P3 npm canonical channel ✓ / P4 INSTALLED-VIA-PLUGIN ✓ / P5 INCOMPATIBLE-primary-eee-scope but COMPATIBLE-secondary-build-app-scope / P6 Apache-2.0 PASS / P7.a PARTIAL (operationally dormant in primary scope; available for secondary scope) / P7.b PARTIAL-PASS for operator-build-app scope

### CR-12 disposition: PROVIDER-COMPLEMENT @ conf=0.85

Parallel scope, parallel mechanism, coexistence without DUPLICATE concern:
- eee = META-process layer (autonomous-loop research + cite-extraction + provenance audit)
- Output.ai = BUILT-PRODUCT layer (durable user-facing LLM workflow apps for operator to build)

2nd PROVIDER-COMPLEMENT same-arc instance after W152-F19 ACP adapter (parallel-frontend); 3rd cumulative cross-arc instance after Wave 134 F27-A openai-agents-python (PRIMARY claude-agent-sdk in eee → openai-agents ALTERNATIVE).

### Prescribed action

**KEEP `outputai@claude-plugins-official` plugin ENABLED** in `.claude/settings.json`. Document operationally-dormant status. Activation trigger: operator commits to building Output.ai TypeScript app inside Claude Code session (named workflow + cited input path + wiring path).

### Cardinal-rule conformance

CR-1 ✅ TIER-1-OFFICIAL Exa-fetched + `.claude/settings.json` ENABLED status / CR-3 ✅ Phase 1 bootstrap exception (Path P SKIPPED per FM-21.a) / CR-5/6 N/A (no install action — already installed) / CR-7 ✅ FULL (PROVIDER-COMPLEMENT classified with explicit operationally-dormant disclosure) / CR-8 ✅ FULL / CR-9 ✅ Apache-2.0 permissive / CR-10 ✅ FULL (research-first; fresh discovery surface) / CR-11 ✅ FULL (META-process autonomous-loop fire) / CR-12 ✅ (PROVIDER-COMPLEMENT 2nd same-arc instance codified)

### Risk class

LOW per launch-discipline D1 (no install action; doc-only audit + memory file).

### CronCreate SKIP rationale (9th consecutive same-arc)

Same as W152-F17→F25: FM-21.a anti-pattern defense.

### Ladders advanced

- USER-CORRECTION-ACK n=18→n=19 (+1: 14th-verbatim user directive)
- Mia n=316 unchanged (cite-extraction outcome)
- FM-21.c sub-class evidence n=10→n=11 same-wave
- FM-21.a anti-pattern defense n=8→n=9 (9th consecutive CronCreate SKIP)
- CR-12 PROVIDER-COMPLEMENT 2nd same-arc instance (W152-F19 ACP adapter + W152-F26 Output.ai)
- CR-12 PROVIDER-COMPLEMENT 3rd cumulative cross-arc instance (Wave 134 F27-A openai-agents + W152-F19 + W152-F26)
- **NEW research surface explored post-W152-F20 priority queue exhaustion**
- Cite-extraction memory file shipped (gitignored ~155 LOC)
- All other ladders unchanged: FM-20 n=22 / FM-02 (c) n=20 / Path P n=28 / Pattern D n=28 / FM-09 14/14 firm / FM-17.f firm n=6 / Inverse-FM-09 n=1 / Stale-wakeup n=1 / FM-08 n=1 / Stale-tmp-file-rename n=1 / Inline-bash quote-trap n=17 / Recursive promotion-fire dogfood n=6

### Files (committed + gitignored)

- `docs/install-provenance.md` (W152-F26 entry +100 LOC committed)
- `.claude/projects/Z--claude-sota-installed/memory/reference_outputai_sdk_audit_2026_05_11.md` (~155 LOC; gitignored)

### Refs

- Output.ai official site + docs (TIER-1-OFFICIAL via Exa)
- `.claude/settings.json` `outputai@claude-plugins-official` ENABLED status
- SessionStart hook context: ~40 outputai-* skills loaded
- W134-F27-A openai-agents-python PROVIDER-COMPLEMENT precedent (1st instance)
- W152-F19 ACP adapter PROVIDER-COMPLEMENT (2nd cumulative; 1st same-arc)
- W152-F26 Output.ai PROVIDER-COMPLEMENT (3rd cumulative; 2nd same-arc)

### Forward Top-5 (post-W152-F26)

🥇 **OPERATOR-DECISION**: cron break-cycle 4 ranked options
🥈 **OPERATOR-DECISION** formal CR-12 6th + 7th class codification at next-T1 boundary (CITE-CLASS-CANONICAL n=4 + CITE-PATTERN-ONLY n=1)
🥉 W152-F27 candidate: fresh research surface continuation (e.g., review `code-modernization:` namespace from available skills list — never audited)
#4 OPERATOR-SUPERVISED 🅳 Docker cutover (W150-F3)
#5 OPERATOR-DECISION Forward Top-5 pending items (W152-F2/F3/F4 + W141 Graphiti + FM-17.{g,h,i} + #207 Spec-Kit RUNTIME-ROOT VIOLATION operator decision)
