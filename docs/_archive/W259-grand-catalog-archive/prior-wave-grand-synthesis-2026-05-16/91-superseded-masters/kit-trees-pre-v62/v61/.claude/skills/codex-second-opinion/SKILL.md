---
name: codex-second-opinion
description: Run Codex review, adversarial review, or rescue via openai/codex-plugin-cc.
allowed-tools: Read Grep Glob Bash
---

# codex-second-opinion

Run Codex review, adversarial review, or rescue via openai/codex-plugin-cc.

## Steps
1. State the goal and constraints.
2. Gather minimal context.
3. Use deterministic tools before broad model reasoning.
4. Produce a concise action plan.
5. Execute only scoped steps.
6. Verify with tests/gates.
7. Summarize evidence and remaining risks.
