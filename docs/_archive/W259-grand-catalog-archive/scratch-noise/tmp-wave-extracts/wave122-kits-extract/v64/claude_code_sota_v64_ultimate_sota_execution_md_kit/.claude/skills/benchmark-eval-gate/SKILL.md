---
name: benchmark-eval-gate
description: Compare baseline vs candidate tool on tokens, correctness, wall time, review quality, safety, rollback complexity.
allowed-tools: Read Grep Glob Bash
---

# benchmark-eval-gate

Compare baseline vs candidate tool on tokens, correctness, wall time, review quality, safety, rollback complexity.

## Steps

1. State goal and scope.
2. Use the smallest context required.
3. Prefer deterministic CLI checks.
4. Return findings in structured form.
5. Do not install executable tools without source audit.
