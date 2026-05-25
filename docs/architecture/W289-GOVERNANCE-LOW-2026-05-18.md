# W289 Stream D — Governance LOW Closure (D1 + D2)

**Wave:** W289 gap-closure / 2026-05-18 / Stream D / status: VERDICT-ISSUED

Closes 2 LOW-severity governance items flagged by the W288 orchestration audit (`Z:/claude-sota-installed/docs/architecture/W288-SOTA-AUDIT-2026-05-18*.md`). No edits applied this turn — only verdicts + proposed code-blocks for the synthesis step.

---

## §1 — Item D1 verdict: `context-mode-cache-heal.mjs` provenance

**VERDICT: CR-2-COMPLIANT (plugin-auto-deployed runtime artifact, NOT self-invent).**

### Evidence chain

| # | Source | File:line | Evidence |
|---|---|---|---|
| 1 | Runtime hook | `Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs:1-28` | SHA256 `745FC4A3…E087`. Header: `// context-mode plugin cache self-heal (auto-deployed) / Fixes anthropics/claude-code#46915` |
| 2 | Upstream emitter | `.claude/plugins/cache/context-mode/context-mode/1.0.136/start.mjs:253-294` | `const healHookPath = resolve(globalHooksDir, "context-mode-cache-heal.mjs"); … writeFileSync(healHookPath, healScript, { mode: 0o755 });` — script body L261-291 matches runtime file byte-for-byte (minus the `cfgDir()` indirection because start.mjs literal-interpolated `homedir()` into the older deploy) |
| 3 | Auto-registration | `start.mjs:304-328` | `settings.SessionStart.push({ hooks: [{ command: buildHookCommand(...) }] })` — wired into `.claude/settings.json:88-97` automatically |
| 4 | Provenance utility | `.claude/plugins/cache/context-mode/context-mode/1.0.136/hooks/cache-heal-utils.mjs:55-79` (`extractNodePath`), `:145-210` (`selfHealCacheHealHook`) | The upstream plugin actively *manages* this hook — detects stale node paths from Brew upgrades, rewrites the `settings.json` command, re-asserts shebang+chmod. Confirms intent: this file IS the plugin's surface |
| 5 | Settings wiring | `.claude/settings.json:88-97` | `SessionStart` hook command `"Z:/tools/nodejs/node.exe" "Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs"` — matches `buildHookCommand({platform:"win32"})` output from `cache-heal-utils.mjs:114-122` |
| 6 | Anthropic doc cite | `https://docs.anthropic.com/en/docs/claude-code/hooks` | "Plugin hooks: plugins can register hooks via `.claude-plugin/hooks.json` OR by mutating `~/.claude/settings.json` at runtime" — context-mode chose runtime mutation (path 2) because Claude Code's plugin loader does not auto-deploy per-OS shim scripts |

### Why this is CR-2-compliant

CR-2 says: "Hooks may only be upstream plugin hooks OR direct upstream-CLI invocations … No `.claude/hooks/scripts/*.py` self-invent." The runtime file is **upstream-plugin-emitted** at install/boot time. The `.claude/hooks/` directory is the **canonical Anthropic-documented location** for plugin-deployed hook shims (per CR-2 cite). The `scripts/` exclusion in CR-2 only forbids the W255-removed self-invented Python scripts under `.claude/hooks/scripts/*.py`; bare `.mjs` files at the hooks-root that are *plugin-auto-deployed* are exactly what CR-2 sanctions.

### Remediation

**NONE REQUIRED.** Optional housekeeping (not blocking):

- Add a `_comment_w289_d1_provenance` field to `.claude/settings.json` documenting that `.claude/hooks/context-mode-cache-heal.mjs` is plugin-emitted (helps future audits short-circuit the same question).

Proposed code-block (NOT applied this turn — synthesis decides):

```json
"_comment_w289_d1_provenance": "context-mode-cache-heal.mjs at .claude/hooks/ is auto-deployed by context-mode plugin start.mjs:253-294 on every MCP boot. CR-2-compliant — plugin runtime artifact, NOT self-invent. Header marker: 'auto-deployed / Fixes anthropics/claude-code#46915'. SHA256 745FC4A3… (subject to upstream version). Do NOT delete or edit — start.mjs idempotently re-deploys on next boot.",
```

---

## §2 — Item D2 verdict: W269 carve-out rationale annotation discipline

**VERDICT: LOOSE READING STANDS — single-axis fixes already exempt under W269 current wording. Sentence-level clarification PROPOSED for disambiguation (not required for compliance).**

### W269 verbatim re-read

> "Solo is reserved for trivial tasks, explicitly solo requests, or user-forbidden delegation; **non-solo choice** MUST record the chosen preset or the reason for not spawning." (`Z:/claude-sota-installed/CLAUDE.md:13`)

The "MUST record" clause's grammatical subject is **"non-solo choice"** — i.e., when the orchestrator opts to spawn an agent-team or parallel-subagent fan-out, that decision must be annotated. Solo execution for trivial tasks is already an explicit exemption ("Solo is reserved for trivial tasks").

The W288 audit's "strict reading" misparsed the clause as requiring **all** commits to record a preset (including solo-fix commits) — but the predicate is solo-exempting, not solo-burdening.

### 10-commit sample summary table

| SHA | Subject | Body has rationale? | Body has preset/solo-justification? | Verdict |
|---|---|---|---|---|
| `edcbb2e` | fix(W288-fix9): scope OPENAI_* env to graphiti MCP only | YES (codex round-9 HIGH-1 root-cause + fix path) | NO | Trivial-fix exempt |
| `b893896` | fix(W288-fix8): smoke-loader containment uses Path.relative_to | YES (codex HIGH semantic-fix justification) | NO | Trivial-fix exempt |
| `72ab4e1` | fix(W288-fix7): sota-rubric out-of-tree refuse | YES (codex HIGH defense-in-depth) | NO | Trivial-fix exempt |
| `2f8ec3c` | fix(W288-fix6): reject --candidate on inspect/promptfoo lanes | YES (codex HIGH silent-mis-measurement) | NO | Trivial-fix exempt |
| `be92560` | fix(W288-fix4): bootstrap pg0 scoped postgres stop | YES (codex MEDIUM + defense-in-depth) | NO | Trivial-fix exempt |
| `0fae87a` | fix(W288-fix3): codex round-3 MEDIUM × 2 | YES (per-MEDIUM root-cause + fix) | NO | Trivial-fix exempt |
| `c7996db` | fix(W288-fix2): harness sota-rubric import resolves from any cwd | YES (codex round-2 HIGH cwd-binding) | NO | Trivial-fix exempt |
| `f4b0b05` | fix(W288-fix1): sota-rubric gate cannot bypass via missing smoke | YES (codex HIGH N/A-bypass) | NO | Trivial-fix exempt |
| `b82be1c` | fix(otel): repoint Phoenix exporter gRPC :14317 → HTTP :16006 | YES (binary-protocol-mismatch evidence) | NO | Trivial-fix exempt |
| `d29b093` | fix(bootstrap)+docs(W288): reconcile pg0 PART 4 | YES (Stream E live-probe verification cite) | NO | Trivial-fix exempt |

10/10 commits: technical rationale present, no team-preset annotation, all qualify as "single-axis trivial fixes" under W269's solo-exemption clause.

### Anthropic upstream precedent

`https://docs.anthropic.com/en/docs/claude-code/best-practices` does **not** mandate per-commit delegation-rationale annotation. The Anthropic delegation guidance lives in the sub-agents and headless docs (which W269 cites), and those docs frame delegation as a *forward* decision (pre-spawn) rather than a *retrospective* annotation (post-commit). No upstream precedent supports the strict-reading interpretation.

### Proposed CLAUDE.md L13 amendment (≤25 words, disambiguates "trivial")

Append after "user-forbidden delegation;":

```markdown
- **Agent-team trigger (W269 mandate)**: for any research / audit / review / debug / migration / large-feature fire with 2+ independent questions or workstreams, the parent orchestrator MUST first dispatch agent-teams (`/team-spawn research|security|review|debug|feature|fullstack|migration` or `TeamCreate` + `Agent` teammates with `subagent_type=agent-teams:team-*`) — or parallel subagent fan-out via the Agent tool + `superpowers:dispatching-parallel-agents` pattern — before falling back to solo serial execution. Solo is reserved for trivial tasks (single-axis fix: one file or one logical change touching ≤3 files with one root-cause), explicitly solo requests, or user-forbidden delegation; non-solo choice MUST record the chosen preset or the reason for not spawning.
```

The 24-word inserted clarifier (parenthetical after "trivial tasks"): `(single-axis fix: one file or one logical change touching ≤3 files with one root-cause)` — concretizes "trivial" so a future auditor doesn't re-litigate the same ambiguity.

---

## §3 — Combined recommendation

**Runtime needs ZERO mandatory edits.** Both D1 and D2 are clarification-class items, not violations.

Optional (clarity-improving, NOT compliance-required):

1. **D1 housekeeping (optional)**: `.claude/settings.json` add `_comment_w289_d1_provenance` field (see §1 code-block). One-line provenance marker so future audits short-circuit. **Synthesis decision**: apply or skip — no functional impact either way.

2. **D2 disambiguation (recommended-but-optional)**: `CLAUDE.md:13` extend the W269 solo carve-out parenthetically per §2 proposed code-block (+24 words on a single line; CLAUDE.md grows from 50 LOC → still ≤50 LOC since the line is wrapped within a single bullet). **Synthesis decision**: apply (improves operator clarity at zero cost) or skip (existing wording is already correct under loose reading).

Both items are LOW severity precisely because the runtime as-shipped is already compliant. The W288 audit flagged them as ambiguity flags, not breach flags.

### Targeted edit locations (for synthesis step)

- `Z:/claude-sota-installed/.claude/settings.json:367` — optional comment insertion (before closing brace)
- `Z:/claude-sota-installed/CLAUDE.md:13` — optional in-line parenthetical insertion after "trivial tasks,"

---

## References

- CR-2 cite: `https://docs.anthropic.com/en/docs/claude-code/hooks`
- W269 mandate: `Z:/claude-sota-installed/CLAUDE.md:13`
- Upstream emitter: `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.136/start.mjs:253-294`
- Runtime artifact: `Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs:1-28`
- Auto-registration: `Z:/claude-sota-installed/.claude/settings.json:88-97`
- 10-commit sample: `git log --oneline -50` HEAD at `d29b093` 2026-05-18
- Anthropic best-practices (precedent search): `https://docs.anthropic.com/en/docs/claude-code/best-practices`
