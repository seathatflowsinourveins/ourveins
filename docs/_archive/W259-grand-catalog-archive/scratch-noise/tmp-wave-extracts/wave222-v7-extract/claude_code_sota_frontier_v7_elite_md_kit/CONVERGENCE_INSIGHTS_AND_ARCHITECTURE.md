# Convergence Insights and Architecture

## Winning architecture

```text
Plan → retrieve → isolate → implement → verify → challenge → merge → learn
```

## Dimensions

### 1. Context architecture

- Always-loaded: `CLAUDE.md`, minimal `AGENTS.md`, essential repo rules.
- On-demand: Skills, references, docs, playbooks, domain guides.
- Externalized: task graph, ADRs, PRs, CI logs, repo maps.
- Filtered: command output, logs, JSON, MCP responses.

### 2. Retrieval architecture

Use this order:

```text
symbol search → references → outline → focused hunk → full file only if needed
```

Best repos/patterns:

- `oraios/serena`
- `zilliztech/claude-context`
- `yamadashy/repomix`
- `aider-ai/aider`
- `ripgrep`, `fd`, `jq`, `yq`, `ast-grep`, `tree-sitter`

### 3. Automation architecture

Best pattern:

```text
GitHub issue / PRD
→ BMAD / Task Master / CCPM / PRP
→ context capsule
→ worktree worker
→ focused tests
→ reviewer subagent
→ Codex adversarial review
→ PR/CI/autofix
```

### 4. Parallel architecture

- Worktree per task.
- One branch per worker.
- File ownership per worker.
- Merge through PRs or an orchestrator.
- Use operator UIs only when supervising many agents.

### 5. Review architecture

- Claude reviewer subagent for local consistency.
- Codex review for independent model perspective.
- Codex adversarial review for design/risk challenge.
- CI/static analysis for objective gating.

### 6. Memory architecture

- Conversations are temporary.
- Git, docs, ADRs, issue trackers, rules, and Skills are durable.
- Memory plugins are optional and must be privacy-audited.
