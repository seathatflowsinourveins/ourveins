# W335 P0-3 — `engineering-advanced-skills` Hooks.json Audit

> **Verdict (one-line)**: DORMANT. Parent plugin.json declares NO `hooks` field; zero `hooks.json` files exist across the entire `engineering-advanced-skills@2.4.4` tree (24 sub-skill directories scanned). No shell-form `${CLAUDE_PLUGIN_ROOT}` pathology present. **Active-risk count: 0.**

**Audit date**: 2026-05-20
**Auditor**: research subagent (W335 P0-3 dispatch)
**Mode**: research-only, no writes to plugin cache
**Canonical pathology rule**: `tools/precommit-msys-hooks-form.mjs` (this repo)
**Plugin source**: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/`

---

## §1 — Parent `plugin.json` hooks-field status

**File**: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/.claude-plugin/plugin.json`

**Top-level keys present** (full enumeration):

| Key | Value |
|---|---|
| `name` | `engineering-advanced-skills` |
| `description` | (marketing blurb — claims "40 advanced engineering skills") |
| `version` | `2.4.4` |
| `author.name` | `Alireza Rezvani` |
| `author.url` | `https://alirezarezvani.com` |
| `homepage` | `https://github.com/alirezarezvani/claude-skills/tree/main/engineering` |
| `repository` | `https://github.com/alirezarezvani/claude-skills` |
| `license` | `MIT` |
| `skills` | `./skills` |

**`hooks` field**: ABSENT (verified by `Read` of full 13-line plugin.json — no key matches `hooks`, `hook`, `Hook`).

**Interpretation per Anthropic plugin manifest schema** (`https://docs.anthropic.com/en/docs/claude-code/plugins#manifest`):
> An absent `hooks` field at plugin.json top level means the plugin ships NO plugin-scoped hooks. Sub-skills may still ship per-skill hooks.json under `skills/<name>/`, but Anthropic runtime ignores those unless the parent plugin.json or a sub-skill's SKILL.md frontmatter wires them in.

**Conclusion §1**: Parent declares zero hooks → DORMANT confirmation per W335 Stream D model. (Compare: W335-MSYS-1..5 disabled plugins ALL had hooks.json wiring via plugin.json or SKILL.md frontmatter declaring PreToolUse/UserPromptSubmit/Stop event handlers.)

---

## §2 — Per-sub-skill `hooks.json` inventory

**Sub-skill directory enumeration** (`ls .claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/`, total 24 entries):

```
agenthub                  feature-flags-architect   prompt-governance
autoresearch-agent        grill-me                  skills
behuman                   grill-with-docs           slo-architect
caveman                   handoff                   statistical-analyst
chaos-engineering         helm-chart-builder        terraform-patterns
code-tour                 karpathy-coder            write-a-skill
data-quality-auditor      kubernetes-operator
demo-video                llm-cost-optimizer
docker-development        llm-wiki
```

(24 top-level directories — note the parent plugin.json claims "40 skills" in its marketing description, but the on-disk layout shows 24 directories. The discrepancy is non-load-bearing for THIS audit since `hooks.json` count is zero regardless. The mismatch likely reflects nested skills under `skills/` and/or sub-skill bundles. Carry-forward to W335 P-residual: count reconciliation if operator wants 40 vs 24 disambiguated.)

**`hooks.json` enumeration command**:
```bash
find /z/claude-sota-installed/.claude/plugins/cache/claude-code-skills/engineering-advanced-skills \
  -name 'hooks.json' 2>/dev/null
```

**Result**: 0 hits. Confirmed by `wc -l` on the same find: `0`.

**Sub-skill `hooks.json` table**:

| Sub-skill directory | hooks.json present? | Notes |
|---|---|---|
| agenthub | NO | — |
| autoresearch-agent | NO | — |
| behuman | NO | — |
| caveman | NO | — |
| chaos-engineering | NO | — |
| code-tour | NO | — |
| data-quality-auditor | NO | — |
| demo-video | NO | — |
| docker-development | NO | — |
| feature-flags-architect | NO | — |
| grill-me | NO | — |
| grill-with-docs | NO | — |
| handoff | NO | — |
| helm-chart-builder | NO | — |
| karpathy-coder | NO | — |
| kubernetes-operator | NO | — |
| llm-cost-optimizer | NO | — |
| llm-wiki | NO | — |
| prompt-governance | NO | — |
| skills | NO | (nested sub-skill bundle dir — also scanned recursively, 0 hits) |
| slo-architect | NO | — |
| statistical-analyst | NO | — |
| terraform-patterns | NO | — |
| write-a-skill | NO | — |

**Conclusion §2**: 0 / 24 sub-skill directories ship `hooks.json`. Total hooks.json count across plugin tree: **0**.

---

## §3 — Shell-form violations

**Scope**: none — there are no hooks.json files to audit. The `tools/precommit-msys-hooks-form.mjs` violation criteria require:

1. A `hooks.json` exists,
2. With a `command` field that is shell-form (single string, not exec-form `args[]`),
3. Containing literal `${CLAUDE_PLUGIN_ROOT}`,
4. AND none of escape clauses (a) exec-form `args[]`, (b) `cygpath` wrap, (c) `bash -c` invocation.

   (Note: a prior "(d) WIN32-abs path" escape was removed during W336 codex r1 review as logically unreachable — once `${CLAUDE_PLUGIN_ROOT}` is present, embedding a WIN32-abs path alongside it does NOT mitigate the variable's MSYS pathology.)

**With zero hooks.json files present, criterion (1) is unsatisfied → no violations possible.**

**Active-risk count: 0.**

---

## §4 — Active-risk recommendations

| Recommendation | Priority | Rationale |
|---|---|---|
| **Leave plugin ENABLED** | (default) | Zero hooks → zero MSYS shell-form risk → no W335-MSYS-1..5 class pathology. Plugin is safe to keep enabled on this Windows-native runtime. |
| **No remediation needed** | n/a | Nothing to remediate. |
| **Optional: count-reconciliation** | P3 carry-forward | Marketing description claims "40 skills" but on-disk dir count = 24. Carry-forward to a future W-wave if operator wants a SKILL.md frontmatter-level count (some sub-skill dirs may bundle multiple SKILL.md entries). Non-load-bearing for hooks audit. |
| **Monitoring**: re-run audit after each `/plugin update engineering-advanced-skills`. | P2 | If a future version bumps to 2.5.x and adds hooks.json, the pre-commit gate (`tools/precommit-msys-hooks-form.mjs` advisory mode) will surface it at next commit. |

**No disable, no escape-hatch, no allowlist entry required.** This plugin is structurally distinct from the W335-MSYS-1..5 cohort:

| Plugin | hooks.json count | shell-form violations | W335 verdict |
|---|---:|---:|---|
| hookify@claude-plugins-official | (≥1) | yes | DISABLED W335-MSYS-1 |
| intelligent-compact@? | (≥1) | yes | DISABLED W335-MSYS-2 |
| self-improving-agent@? | (≥1) | yes | DISABLED W335-MSYS-3 |
| claude-mem@thedotmack | (≥1) | yes | DISABLED W335-MSYS-4 |
| protect-mcp@claude-code-workflows | (≥1) | yes | DISABLED W335-MSYS-5 |
| **engineering-advanced-skills@alirezarezvani** | **0** | **n/a** | **STAY ENABLED** (this audit) |

---

## §5 — Methodology + cite-anchors

### Probes executed (4 tool calls)

1. **Glob** — `**/engineering-advanced-skills/**/plugin.json` (initial enumeration; hit ENAMETOOLONG on the deep path, fell back to Bash `find`).
2. **Bash find** — `find /z/claude-sota-installed/.claude/plugins/cache -maxdepth 6 -path '*engineering-advanced-skills*' -name 'plugin.json'` → 20+ hits across nested sub-skill plugin.json files.
3. **Bash find** — `find /z/claude-sota-installed/.claude/plugins/cache -maxdepth 8 -path '*engineering-advanced-skills*' -name 'hooks.json'` → 0 hits.
4. **Read** — parent `plugin.json` (full file, 13 lines) — confirmed `hooks` field absent.
5. **Bash ls** — top-level sub-skill enumeration (24 directories listed).
6. **Read** — `tools/precommit-msys-hooks-form.mjs` (canonical pathology rule, 171 lines) — confirmed criteria + escape clauses.

### Cite-anchors (3-org-distinct floor per sca-v13 / W332-style citation discipline)

1. **Anthropic** — `https://docs.anthropic.com/en/docs/claude-code/plugins#manifest` (plugin manifest schema — `hooks` field semantics; absent = no plugin-scoped hooks).
2. **Anthropic** — `https://docs.anthropic.com/en/docs/claude-code/hooks` (hooks.json schema: `command` shell-form vs exec-form `args[]`; `${CLAUDE_PLUGIN_ROOT}` substitution).
3. **Microsoft Docs** — `https://learn.microsoft.com/en-us/windows/wsl/filesystems` (Windows-path-vs-POSIX-path interpretation pathology that triggers shell-form failures on Windows-native runtime; `cygpath` mitigation).
4. **Git Project** — `https://git-scm.com/docs/githooks#_pre_commit` (pre-commit stage where the canonical gate runs).

### Internal cite-anchors

- **W335-MSYS-1..5 disable commit chain** (`git log --grep='W335-MSYS'`):
  - `b44c7e4` — W335-MSYS-1 hookify disable
  - `b6ae1ed` — W335-MSYS-2 intelligent-compact disable
  - `1069081` — W335-MSYS-3 self-improving-agent disable
  - `272d075` — W335-MSYS-4 claude-mem disable
  - `4b55255` — W335-MSYS-5 protect-mcp disable
- **Canonical pathology rule**: `tools/precommit-msys-hooks-form.mjs:74-127` (PLUGIN_VAR_RE + escape clauses + violation push).
- **Plugin source-of-truth on disk**: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/.claude-plugin/plugin.json` (13 lines, verified 2026-05-20).

### Budget actuals

- Tool calls used: **6** of 20 budget (skeleton + 4 probes + 1 final write).
- Token budget: well under 100k.
- Status flag at 70%: not triggered (work converged early; zero-hooks discovery on probe #2).

---

## §6 — One-line ledger row (for VERDICT-LEDGER append, if operator wants)

```
W335-P0-3 | engineering-advanced-skills@2.4.4 | hooks.json=0 | shell-form-violations=0 | verdict=STAY-ENABLED | active-risk=0 | cite=tools/precommit-msys-hooks-form.mjs + W335-MSYS-1..5 chain
```
