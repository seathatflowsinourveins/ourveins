---
name: local-cypher-codebase
description: Use when the operator asks for a Cypher-style graph query over the codebase (calls of X, all overrides of M, diamond-inheritance detection, members of a "community"), wants to traverse code structure rather than text-grep, or requests pattern-extracted GitNexus capability without installing the gitnexus MCP. Built-in graph walks via serena symbol-find + Grep chains; no external service required.
allowed-tools: serena.find_symbol, serena.find_referencing_symbols, serena.find_implementations, serena.find_declaration, serena.get_symbols_overview, Grep, Glob, Read
---

# Local Cypher-Codebase — Built-In Graph Query (Pattern from GitNexus, no install)

## What this skill replaces

GitNexus ships an MCP `cypher` tool (see `Z:/repos/deps/gitnexus/gitnexus/src/mcp/tools.ts:140-197`) that executes Cypher over a pre-built KuzuDB knowledge graph of the codebase. **We do not install GitNexus** (D8=1 PolyForm-Noncommercial 1.0.0 — see ledger row 33 + W317-D pattern-extract). Instead, this skill encodes the same *query patterns* as a sequence of native serena + Grep tool calls. No graph index, no external service, no licence entanglement.

## When to use vs. plain Grep

| Question shape | Tool |
|---|---|
| "Find the string X anywhere" | plain Grep |
| "Find calls of `validateUser`" | this skill (graph walk) |
| "What functions write to property `address`?" | this skill |
| "Method overrides in the `UserService` hierarchy" | this skill |
| "Files in the auth subsystem" | this skill (Glob-by-community-pattern) |

## Pattern translations (Cypher → native tools)

### 1. Find callers of a function (GitNexus example A)

```cypher
MATCH (a)-[:CodeRelation {type: 'CALLS'}]->(b:Function {name: "validateUser"})
RETURN a.name, a.filePath
```

Native equivalent:

```yaml
- serena.find_symbol:
    name_path: "validateUser"
    include_kinds: [function, method]
- serena.find_referencing_symbols:
    name_path: "<resolved_path_from_step_1>"
    relative_path: "."
# → returns all referencing symbols + their containing files
```

### 2. Find all methods of a class (GitNexus example D)

```cypher
MATCH (c:Class {name: "UserService"})-[r:CodeRelation {type: 'HAS_METHOD'}]->(m:Method)
RETURN m.name, m.parameterCount
```

Native equivalent:

```yaml
- serena.find_symbol:
    name_path: "UserService"
    include_kinds: [class]
- serena.get_symbols_overview:
    relative_path: "<file_from_step_1>"
# → returns the class body with all method symbols + signatures
```

### 3. Find method overrides (GitNexus example G — MRO resolution)

```cypher
MATCH (winner:Method)-[r:CodeRelation {type: 'METHOD_OVERRIDES'}]->(loser:Method)
RETURN winner.name, winner.filePath, loser.filePath
```

Native equivalent (works for languages with LSP server):

```yaml
- serena.find_symbol:
    name_path: "<method_name>"
    include_kinds: [method]
- serena.find_implementations:
    name_path: "<resolved_path>"
# → returns all implementations across the hierarchy (the LSP-defined MRO chain)
```

### 4. Find all writers of a field (GitNexus example F)

```cypher
MATCH (f:Function)-[r:CodeRelation {type: 'ACCESSES', reason: 'write'}]->(p:Property)
WHERE p.name = "address"
RETURN f.name, f.filePath
```

Native equivalent (two-pass — reads + writes can't be distinguished by serena alone, so we filter post-hoc):

```yaml
- serena.find_referencing_symbols:
    name_path: "address"
    relative_path: "."
# → all references
- Grep:
    pattern: '\.address\s*='
    output_mode: content
    -n: true
# → narrow to assignment-context (writes)
```

### 5. Diamond inheritance detection (GitNexus example H)

This one needs explicit graph traversal — no single serena call gives diamond detection. Two-step:

```yaml
- serena.get_symbols_overview:
    relative_path: "<directory>"
    # collect all class declarations
- For each class C:
    serena.find_implementations:
      name_path: C
    # → if a class appears in 2+ chains converging on the same ancestor → diamond
```

(This is heavier than Cypher's one-liner but works without an index. For very large monorepos, prefer building a one-off DOT graph via `tree-sitter`-extracted relations.)

## Decision tree

```
Operator asks "find callers / overrides / writers / diamond" ?
├── YES → use this skill, translate to serena + Grep
└── NO  → use plain Grep (faster)
```

## Limitations vs. real GitNexus

- **No incremental indexing**: every query re-walks. Acceptable for ≤100k-LOC repos.
- **No community detection** (Leiden algorithm): substitute manual directory/module grouping.
- **No execution-flow `Process` nodes**: substitute call-graph reasoning from `find_referencing_symbols` chains.

## Why this is cardinal-rule-compliant

- **CR-1** (trusted plugins only): no install — serena is already installed; this SKILL.md is operator-curated per Anthropic-sanctioned `.claude/skills/<name>/SKILL.md` path (see `https://code.claude.com/docs/en/skills`).
- **CR-2** (hooks only upstream/CLI): no hooks added.
- **CR-3** (subagents only from upstream): no subagent definitions.
- **CR-4** (project behavior in CLAUDE.md + SKILL.md): this is the SKILL.md per the path rule.
- **CR-5** (safety via permissions): all listed tools (serena.*, Grep, Glob, Read) are read-only.

## References

- GitNexus `cypher` tool schema: `Z:/repos/deps/gitnexus/gitnexus/src/mcp/tools.ts:140-197` (read for pattern reference only — license blocks install/vendor-fork).
- GitNexus ledger row 33 (`docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md:177`): T3 PATTERN-STUDY, "Pattern-mine: Cosign signed-Docker workflow + pre-computed-graph parser cache".
- Serena MCP: `https://github.com/oraios/serena` (T1 INSTALL, MIT — see ledger row 15).
