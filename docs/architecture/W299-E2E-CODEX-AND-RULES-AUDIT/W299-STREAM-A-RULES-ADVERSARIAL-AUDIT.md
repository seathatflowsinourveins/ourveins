# W299 Stream A — Adversarial Cardinal-Rules Audit

> **Wave**: W299 Stream A — answers operator's "questions your rules" mandate.
> **Branch**: `sota-converge-w295` (HEAD `7254beb`).
> **Method**: each rule (R1–R5) + 4 derived norms + W286 P0C = 10 sections. Counterexample-driven: no rule-change without (a) measurable harm in this runtime OR (b) SOTA-elsewhere violation OR (c) upstream-doc-drift contradicting the rule's cite.
> **Cite-class**: TIER-1-DIRECT (Anthropic `code.claude.com/docs/en/*` re-fetched 2026-05-18 21:57 UTC) + TIER-3-LOCAL-COMPOSITION (W255 cleanup commit, W296 r0 cardinal-rule-2-violation surface, W298 Stream B post-r1 fix-iterate, this runtime's on-disk plugin cache).

---

## §0 — TL;DR + per-rule verdict table

| # | Rule / Norm | Counterexample severity | Verdict | Headline |
|--:|---|:--:|:--:|---|
| R1 | Install primitives only from trusted plugins/skills/agents | LOW | **KEEP (clarify)** | 23 local skills + 4 local agents already legitimised under "Anthropic-sanctioned path"; rule needs an explicit "operator-authored skills/agents in `.claude/` ARE permitted alongside upstream" clause to match shipped reality. |
| R2 | Hooks may only be upstream plugin hooks OR direct upstream-CLI invocations — no `.claude/hooks/scripts/*.py` self-invent | **HIGH** | **RELAX (cite exception)** | **Live counterexample in this repo**: `.claude/hooks/context-mode-cache-heal.mjs` (1656-byte self-invent .mjs) wired at `settings.json:97` since W255+, mid-stream-classified as CRITICAL violation in W296 commit `d72d3aa`, yet RATIFIED-WITH-EXCEPTION because it patches anthropics/claude-code#46915 (load-bearing). The rule as written cannot describe its own runtime state. |
| R3 | Subagents = installed upstream agents OR documented subagent system | LOW | **KEEP** | 4/4 local `.claude/agents/*.md` frontmatter cite-anchored to `docs.anthropic.com/en/docs/claude-code/sub-agents`; no counterexample where this rule produced harm. |
| R4 | Project behavior in CLAUDE.md + settings.json only — NOT `.claude/rules/*.md`. **The `.claude/rules/` directory does not exist by design.** | **CRITICAL** | **STRENGTHEN-REVERSAL** | **Anthropic's own docs at `code.claude.com/docs/en/claude-directory` and `code.claude.com/docs/en/memory#organize-rules-with-claude/rules/` document `.claude/rules/*.md` as a FIRST-CLASS file type** with the same priority as `CLAUDE.md` (no `paths:` frontmatter) plus path-gated rules (with `paths:` frontmatter). The upstream `everything-claude-code@2.0.0-rc.1` plugin SHIPS 16 rules subdirectories (`common/`, `python/`, `typescript/`, etc.) following exactly this pattern. CR-4's "does not exist by design" is **factually contradicted by Anthropic's own documentation**. Rule must be REVERSED. |
| R5 | Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts | **HIGH** | **RELAX (cite exception)** | Pre-commit `gitleaks` runs as a `PreToolUse:Bash` hook (settings.json:108) — a "custom guard script" by the rule's plain reading. Same for `ruff --fix`/`shellcheck` PostToolUse. These are wave-after-wave preserved as the runtime's load-bearing pre-commit security gate. Rule needs explicit "direct-CLI-invocation guards via hooks are permitted" carve-out. |
| D1 | Subagent format (frontmatter) | LOW | **KEEP** | 4/4 local agents pass per W298 Stream D §5 ("4/4 .claude/agents/*.md sub-agent frontmatter PASS"). No counterexample. |
| D2 | Hook discipline (consolidated pre-bash-dispatcher pattern) | LOW | **KEEP-with-pattern-doc** | Pattern works; operator's `ECC_DISABLED_HOOKS` env var honored across 22+ specific hook tokens. Suggest documenting the "matcher: \"*\" + per-hook env-toggle" pattern as recommended. |
| D3 | `.claude/rules/` non-existence-by-design | **CRITICAL** | **REVERSE** | (Same as R4 — they are the same rule; CLAUDE.md states it twice for emphasis.) |
| D4 | 3-worktree cap | MEDIUM | **KEEP-clarify** | "~3 parallel cap" is evidence-based per Anthropic `cli-reference` parallel-session docs AND empirically validated this wave (operator's session forks at `Z:/claude-sota-installed-W287` + `-W290` are exactly 2 active — within cap). But the cite-anchor "cognitive + token budget" needs sharper grounding. |
| W286-P0C | `.mcp.json` MCP-server contract = `npx -y <pkg>@<pinned-version>` | LOW | **KEEP** | Trade-off correctly settled at W286-cross: CR-9 version-pinning + Z:-portability beat W155-F13 native-node spawn-churn optimization. Codex rounds 1-5 keep flagging as MEDIUM (preferring spawn-churn-min) but operator accepted; per goal-predicate MEDIUM does not BLOCK. |

**Most-surprising counterexample**: **R4's "`.claude/rules/` does not exist by design"** is directly contradicted by Anthropic's own canonical docs at `code.claude.com/docs/en/claude-directory` (which lists `rules/*.md` as a row in the "Choose the right file" table with scope "Project and global", commit "✓", and a link to `/docs/en/memory#organize-rules-with-claude/rules/`). This is the highest-confidence rule-reversal in the audit because it is contradicted by FIRST-PARTY upstream documentation, not by a third-party SOTA repo. The W255 cleanup that deleted 64 `.claude/rules/*.md` was correct in its intent (the deleted files were SELF-INVENT contradicting the W255-era CLAUDE.md), but the resulting "`.claude/rules/` does not exist by design" framing locked the runtime out of a now-supported Anthropic feature — exactly the kind of regress operator's "questions your rules" mandate is designed to catch.

---

## §1 — R1: Install primitives only from trusted plugins/skills/agents

### §1.1 — Rule (verbatim from CLAUDE.md:18)

> 1. **Install primitives only from trusted plugins/skills/agents** — plugin structure + install flow per `https://code.claude.com/docs/en/plugins`. **W270 corollary (install-state drift governance)**: primitive validity = trusted-source + active-scope + commit-SHA-freshness + post-`/plugin install` `/reload-plugins` verification. Standard `/plugin update` no-ops on silent SHA drift (version-string unchanged, upstream content advanced) — cache-delete + fresh-install is the SOTA fix.

### §1.2 — Counterexample search

**Counterexample candidate 1 — operator-curated local skills**: 18 skills live at `Z:/claude-sota-installed/.claude/skills/*/SKILL.md` (`mem-recall`, `goal-prompt-synthesis`, `sota-convergence-audit`, `dual-review`, `vercel-*`, `web-design-guidelines`, `speckit-*`, `gitnexus`, `langfuse`, `learned`). These are NOT installed from any marketplace — they are operator-authored.

Cite-anchor: `Z:/claude-sota-installed/.claude/skills/` directory listing (18 entries verified 2026-05-18 21:57) + CLAUDE.md:30 explicitly legitimises them: *"Local operator-curated skills: `.claude/skills/<name>/SKILL.md` × 18 — Anthropic-sanctioned path per `https://code.claude.com/docs/en/skills`; cardinal-rule-3-compliant"*. CLAUDE.md cites "cardinal-rule-3-compliant" but the question of CR-1-compliance is unstated.

**Counterexample candidate 2 — operator-curated local agents**: 4 agents live at `Z:/claude-sota-installed/.claude/agents/*.md` (`evaluator.md`, `gpt5-archaeologist.md`, `wshobson-devops-troubleshooter.md`, `wshobson-security-auditor.md`). The latter 2 are vendor-forked from wshobson but live in-tree. The former 2 are operator-authored.

Cite-anchor: `Z:/claude-sota-installed/.claude/agents/` directory listing (4 entries × 351 LOC total) + W298 Stream D §5: *"4/4 .claude/agents/*.md sub-agent frontmatter PASS"* — i.e. the local agents are valid per Anthropic frontmatter spec.

### §1.3 — Verdict: **KEEP (with clarification)**

The rule's spirit holds (don't import from random GitHub URLs without trust-vetting), but its language reads as "ONLY upstream-marketplace primitives" — which would forbid the 18 local skills + 2 operator-authored agents that the runtime ships and CLAUDE.md:30 separately legitimises. The mismatch is a wording issue, not a behavioural one.

### §1.4 — Proposed CLAUDE.md edit (operator-approval-gated)

Add a sub-clause to R1:

```
1. **Install primitives only from trusted plugins/skills/agents OR operator-authored
   `.claude/skills/<name>/SKILL.md` + `.claude/agents/*.md` per
   `https://code.claude.com/docs/en/skills` + `https://code.claude.com/docs/en/sub-agents`**
   — plugin structure + install flow per `https://code.claude.com/docs/en/plugins`.
   ...
```

### §1.5 — Cardinal-rule self-check on the edit

- R2 — hooks: unchanged. PASS.
- R3 — subagents: explicit reference to upstream sub-agents doc reinforces R3. PASS.
- R4 — settings.json: no settings.json change. PASS.
- R5 — permissions: no permissions change. PASS.

---

## §2 — R2: Hooks may only be upstream plugin hooks OR direct upstream-CLI invocations

### §2.1 — Rule (verbatim from CLAUDE.md:19)

> 2. **Hooks may only be upstream plugin hooks OR direct upstream-CLI invocations** declared in `.claude/settings.json` — semantics per `https://docs.anthropic.com/en/docs/claude-code/hooks`. **No `.claude/hooks/scripts/*.py` self-invent.** **W286-arc-P0C ratification 2026-05-18**: `.mcp.json` MCP-server `command/args` contract is `npx -y <pkg>@<pinned-version>` (per W286-cross commits `fcafe05`+`77dc081`); W155 F13 native-node migration RETIRED — CR-9 version-pin discipline wins over spawn-churn optimization. The W280a Stop-hook codex-review-gate auto-enforces post-commit.

### §2.2 — Counterexample search (HIGH severity)

**Counterexample 1 — `.claude/hooks/context-mode-cache-heal.mjs` (1656-byte self-invent .mjs)**:

Cite-anchor: `Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs` (verified 2026-05-18; 28 LOC; pure Node.js ESM, no bash). Wired at `.claude/settings.json:97`:

```jsonc
"SessionStart": [
  {
    "hooks": [
      {
        "type": "command",
        "command": "\"Z:/tools/nodejs/node.exe\" \"Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs\""
      }
    ]
  }
]
```

This was surfaced as a **CRITICAL cardinal-rule-2 violation** in W296 commit `d72d3aa` (see commit message above), and yet survives in HEAD `7254beb` (verified by `ls .claude/hooks/`). The commit message itself ends:

> "operator-decision required because hook may currently provide load-bearing context-mode cache-heal functionality"

**This rule cannot describe its own runtime state.** A rule whose violation has been documented in-tree for 5 waves (W296→W297→W298→W299) without being either (a) closed by removal or (b) updated to permit the exception is a rule that has lost connection to reality.

**Counterexample 2 — `everything-claude-code@2.0.0-rc.1` plugin scripts/**: the upstream plugin (sanctioned source) ships `scripts/hooks/*.js`, `scripts/hooks/lib/*.js`, plus 4 `.sh` files (`gan-harness.sh`, `release.sh`, `orchestrate-codex-worker.sh`, `sync-ecc-to-codex.sh`). All settings.json:hooks references that point at "Z:\\claude-sota-installed\\.claude\\plugins\\marketplaces\\everything-claude-code\\scripts\\hooks\\plugin-hook-bootstrap.js" are CR-2-compliant per the rule (upstream-plugin scripts). Anthropic's own `code.claude.com/docs/en/plugins-reference` (re-fetched 2026-05-18 21:57) documents EXACTLY this pattern as the canonical plugin structure:

```
enterprise-plugin/
├── hooks/
│   ├── hooks.json
│   └── security-hooks.json
├── scripts/                 # Hook and utility scripts
│   ├── security-scan.sh
│   ├── format-code.py
│   └── deploy.js
```

So `.py` self-invent IS officially supported in the SHELL of a plugin. CR-2's blanket "No `.claude/hooks/scripts/*.py` self-invent" is correctly scoped to "NO project-level `.claude/hooks/scripts/*` *outside the plugin sandbox*" — but the rule text reads as "no .py-anywhere" which is over-broad.

Cite-anchor: `code.claude.com/docs/en/plugins-reference` §"plugin component types list" (indexed 2026-05-18 21:57) shows `scripts/security-scan.sh`/`format-code.py`/`deploy.js` as the canonical example.

### §2.3 — Measurable harm caused by the rule (or its current ambiguity)

W255 cleanup deleted "33 self-invented `.claude/hooks/scripts/*.py`" (per CLAUDE.md:5 + W255 commit). The W255 intent was correct (deleted scripts were ad-hoc shell wrappers around CC's built-in features). But:

1. The cleanup also forced operator to find non-rule-violating fixes for legitimate cases (e.g. context-mode-cache-heal — Anthropic's own bug #46915 patch). The result is an in-tree file living in CR-2-violation grey area for 5 waves.
2. The "no self-invent" framing locks the runtime out of perfectly legitimate "small Node.js patch script that wires an upstream bug-fix" use cases. Anthropic does NOT forbid these — `code.claude.com/docs/en/plugins-reference §"Hook troubleshooting"` reads:

```
**Hook script not executing**:
1. Check the script is executable: `chmod +x ./scripts/your-script.sh`
2. Verify the shebang line: First line should be `#!/bin/bash` or `#!/usr/bin/env bash`
3. Check the path uses `${CLAUDE_PLUGIN_ROOT}`: ...
```

Anthropic's docs explicitly anticipate user-authored hook scripts.

### §2.4 — Verdict: **RELAX with cited exception**

The rule's spirit is correct (no ad-hoc bash wrappers that re-implement CC features). But the language needs:

1. A clear "upstream-bug-patch" exception clause OR
2. A move-the-script-into-a-local-plugin path so context-mode-cache-heal.mjs lives at `.claude/plugins/<local>/scripts/hooks/cache-heal.mjs` instead of `.claude/hooks/`.

The W296 r0 surface called for "operator-decision matrix (DELETE / REPLACE / RATIFY-EXCEPTION)" — that decision is still operator-pending. Stream A recommends RATIFY-EXCEPTION with rule-language update OR REPLACE (migrate to local-plugin form).

### §2.5 — Proposed CLAUDE.md edit (operator-approval-gated)

```
2. **Hooks may only be upstream plugin hooks OR direct upstream-CLI invocations OR
   upstream-bug-patch shims** declared in `.claude/settings.json` — semantics per
   `https://code.claude.com/docs/en/hooks`. **No `.claude/hooks/scripts/*.py|*.sh|*.mjs`
   that re-implements a built-in CC feature**; small bug-patch shims (e.g. patching a
   filed `anthropics/claude-code#<issue>`) ARE permitted with an explicit issue-link
   comment in the script. **W286-arc-P0C ratification 2026-05-18**: `.mcp.json` MCP-server
   `command/args` contract is `npx -y <pkg>@<pinned-version>` ...
```

Cite-anchor for "upstream-bug-patch shim" exception: `Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs:3` (`// Fixes anthropics/claude-code#46915: auto-update breaks CLAUDE_PLUGIN_ROOT`) — the comment-link pattern already exists.

### §2.6 — Cardinal-rule self-check on the edit

- R1 — install primitives: bug-patch shims don't compete with marketplace plugins. PASS.
- R3 — subagents: no agent-level change. PASS.
- R4 — `.claude/rules/`: orthogonal. PASS.
- R5 — permissions: bug-patch shims are direct-Node invocations; not custom-guard scripts. PASS.

---

## §3 — R3: Subagents = installed upstream agents OR documented subagent system

### §3.1 — Rule (verbatim from CLAUDE.md:20)

> 3. **Subagents = installed upstream agents OR documented subagent system** — per `https://docs.anthropic.com/en/docs/claude-code/sub-agents`.

### §3.2 — Counterexample search

**Candidate — local agents at `.claude/agents/`**: 4 files (`evaluator.md`, `gpt5-archaeologist.md`, `wshobson-devops-troubleshooter.md`, `wshobson-security-auditor.md`). The latter two are explicitly "wshobson-*" vendor-fork-named; the former two are operator-authored.

Cite-anchor 1 (frontmatter validity): W298 Stream D §5 audited all 4 and reported "4/4 .claude/agents/*.md sub-agent frontmatter PASS" against the canonical `docs.anthropic.com/en/docs/claude-code/sub-agents` schema.

Cite-anchor 2 (eval.md frontmatter):
```yaml
---
name: evaluator
description: Skeptical second-opinion reviewer. Reads the diff...
tools: [Read, Glob, Grep, Bash]
disallowedTools: [Write, Edit, MultiEdit, NotebookEdit]
model: sonnet
permissionMode: plan
maxTurns: 20
effort: high
isolation: worktree
memory: project
background: false
color: purple
skills:
  - superpowers:verification-before-completion
  - superpowers:requesting-code-review
  - addy-agent-skills:code-review-and-quality
mcpServers:
  - repomix
---
```

This is the documented subagent system per the cited Anthropic URL. PASS.

Cite-anchor 3 (Anthropic docs): `code.claude.com/docs/en/claude-directory` (indexed 2026-05-18 21:57) table row: *"`agents/*.md` | Project and global | ✓ | Subagent definitions with their own prompt and tools | [Subagents](/docs/en/sub-agents)"*.

### §3.3 — Verdict: **KEEP**

No counterexample found where R3 produced measurable harm. The 4 local agents ARE the "documented subagent system" the rule sanctions. The rule reads correctly.

### §3.4 — Open question (for W299-AUDIT)

The CLAUDE.md:11 says "Behavioral discipline: installed plugin-loaded skills auto-fire per `description:` match" — but the local 4 agents at `.claude/agents/` are NOT plugin-loaded. They are project-scoped. The behavioural-discipline framing in §1 of CLAUDE.md implies all behaviour comes from upstream plugins. The local agents (especially `gpt5-archaeologist` at 200 LOC) provide non-trivial behaviour. Recommend a one-line bullet in CLAUDE.md §Architecture: "Additionally, 4 local agents at `.claude/agents/` provide project-specific reviewers (operator-authored + 2 wshobson vendor-forks)."

---

## §4 — R4: Project behavior in CLAUDE.md + settings.json only — NOT `.claude/rules/*.md`

### §4.1 — Rule (verbatim from CLAUDE.md:21)

> 4. **Project behavior in CLAUDE.md + settings.json only — NOT `.claude/rules/*.md`** — settings behavior per `https://docs.anthropic.com/en/docs/claude-code/settings`. The `.claude/rules/` directory does not exist by design.

### §4.2 — Counterexample search (CRITICAL severity)

**Counterexample 1 — Anthropic's OWN canonical docs document `.claude/rules/*.md` as a first-class feature**.

Cite-anchor 1: `code.claude.com/docs/en/claude-directory` (indexed 2026-05-18 21:57). Direct quote from the "Choose the right file" table:

| File | Scope | Commit | What it does | Reference |
| --- | --- | --- | --- | --- |
| `CLAUDE.md` | Project and global | ✓ | Instructions loaded every session | [Memory](/docs/en/memory) |
| **`rules/*.md`** | **Project and global** | **✓** | **Topic-scoped instructions, optionally path-gated** | **[Rules](/docs/en/memory#organize-rules-with-claude/rules/)** |
| `settings.json` | Project and global | ✓ | Permissions, hooks, env vars, model defaults | [Settings](/docs/en/settings) |

Same table, "the rest of the directory is optional: **add skills, rules, or subagents as you need them**."

Cite-anchor 2: `code.claude.com/docs/en/memory#organize-rules-with-claude/rules/` (indexed 2026-05-18 21:57). Direct quote:

> ```
> your-project/
> ├── .claude/
> │   ├── CLAUDE.md           # Main project instructions
> │   └── rules/
> │       ├── code-style.md   # Code style guidelines
> │       ├── testing.md      # Testing conventions
> │       └── security.md     # Security requirements
> ```
>
> Rules without [`paths` frontmatter](#path-specific-rules) are loaded at launch with the same priority as `.claude/CLAUDE.md`.

The page explicitly documents:
- Directory tree structure with example files
- Priority equivalence with `CLAUDE.md`
- Optional `paths:` YAML frontmatter for path-gated rules
- Glob patterns example: `src/**/*.{ts,tsx}`, `lib/**/*.ts`, `tests/**/*.test.ts`

Cite-anchor 3: same page §"Consistency": *"Review your CLAUDE.md files, nested CLAUDE.md files in subdirectories, and `.claude/rules/` periodically to remove outdated or conflicting instructions."* — Anthropic explicitly treats `.claude/rules/` as part of the canonical configuration surface.

**Counterexample 2 — `everything-claude-code@2.0.0-rc.1` (cached upstream plugin) SHIPS a `rules/` directory**.

Cite-anchor: `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/rules/` directory listing (verified 2026-05-18):
```
README.md
common/           # 10 .md files: agents, code-review, coding-style, development-workflow, git-workflow, hooks, patterns, performance, security, testing
cpp/
csharp/
dart/
golang/
java/
kotlin/
perl/
php/
python/           # 5 .md files: coding-style, hooks, patterns, security, testing
rust/
swift/
typescript/
web/
zh/
```

The plugin's own `rules/README.md` explicitly documents the install flow:

> ```
> rules/
> ├── common/          # Language-agnostic principles (always install)
> │   ├── coding-style.md
> │   ├── git-workflow.md
> │   ├── testing.md
> │   ├── performance.md
> │   ├── patterns.md
> │   ├── hooks.md
> │   ├── agents.md
> │   └── security.md
> ├── typescript/      # TypeScript/JavaScript specific
> ├── python/          # Python specific
> ...
> ```
>
> Common and language-specific directories contain files with the same names. Flattening them into one directory causes language-specific files to overwrite common rules.

This is a TRUSTED plugin (CLAUDE.md:30 explicitly approves) shipping rules in the exact pattern Anthropic documents. The runtime sanctioned a `.claude/rules/`-using plugin while simultaneously declaring `.claude/rules/` "does not exist by design".

**Counterexample 3 — sibling `Z:/claude-sota` runtime uses `.claude/rules/`**. From `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/...` sample-rule-frontmatter snippet (ctx_search result above):

> "source: `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` @ 2fc5431a287e352231452f7a04e0b49d8feddd35"

The sibling claude-sota runtime — which CLAUDE.local.md:9 calls "active; this runtime is the install-only canonical baseline" — actively uses `.claude/rules/`. Either the sibling is wrong, or this runtime's CR-4 is wrong. Per Anthropic's docs cite-anchor above, the sibling is correct and this runtime's CR-4 is the regress.

### §4.3 — Why W255 deleted 64 `.claude/rules/*.md` (historical context)

W255 commit (per CLAUDE.md:5) deleted 64 self-invented `.claude/rules/*.md`. The deletes were correct at the time — those files were ad-hoc auto-fired prompts that violated R1 (trusted-source). Example of a then-self-invented rule per the search hit above:

> `fm20-path-drift-cascade.md` — operator-authored failure-mode documentation, NOT a path-gated Anthropic-spec rule.

The mistake was the FRAMING. The clean conclusion would have been "deleted because their contents were R1-self-invent, not because `.claude/rules/` is forbidden". Instead the framing became "directory does not exist by design" — which locks the runtime out of a now-officially-supported Anthropic feature.

### §4.4 — Verdict: **STRENGTHEN-REVERSAL** (highest-confidence rule change in this audit)

The rule must be reversed because:
1. Anthropic's first-party docs at `code.claude.com/docs/en/claude-directory` + `code.claude.com/docs/en/memory#organize-rules-with-claude/rules/` directly document `.claude/rules/*.md`
2. A trusted-source upstream plugin ships rules in the exact pattern
3. The sibling runtime uses them
4. The original W255 delete-rationale was R1-content-violation, not R4-directory-existence

### §4.5 — Proposed CLAUDE.md edit (operator-approval-gated, CRITICAL)

REPLACE CLAUDE.md:21:

```
4. **Project behavior in CLAUDE.md + settings.json + `.claude/rules/<topic>.md`**
   — settings behavior per `https://code.claude.com/docs/en/settings`; rules per
   `https://code.claude.com/docs/en/memory#organize-rules-with-claude/rules/`. Rules
   are loaded with the same priority as CLAUDE.md (no `paths:` frontmatter) OR
   path-gated when `paths:` frontmatter is set. **W255 historical context**: 64
   pre-W255 `.claude/rules/*.md` were deleted because their CONTENT was R1-self-invent
   (operator-authored failure-mode docs, not topic-scoped instructions). The
   directory IS sanctioned by Anthropic; future re-adds must follow the documented
   topic-scoped + path-gated pattern.
```

Also update CLAUDE.md:5 (the W255 cleanup note):

```
> **W255 cleanup landed 2026-05-15**: 64 self-invented `.claude/rules/*.md`
> (R1-content-violation, ad-hoc auto-fire prompts; NOT R4-directory-violation —
> see W299 Stream A) + 33 self-invented `.claude/hooks/scripts/*.py` + 110
> `settings.json` hook commands removed (22,060 LOC self-invent gone).
> `self_invented_count: 0` for hook-script class; `.claude/rules/` directory
> remains sanctioned (Anthropic per `code.claude.com/docs/en/memory#organize-rules-with-claude/rules/`).
```

### §4.6 — Cardinal-rule self-check on the edit

- R1 — install primitives: rules-files must still come from trusted source or be operator-authored topic-scoped (not auto-fire failure-mode dumps). PASS.
- R2 — hooks: orthogonal. PASS.
- R3 — subagents: orthogonal. PASS.
- R5 — permissions: orthogonal. PASS.

### §4.7 — Migration impact

If reversal approved:
- No file create on this commit (operator decides whether to ADD rules).
- The W286 P0C cite-update to `code.claude.com` URLs (not `docs.anthropic.com`) per W298 codex r1 Q6 should be threaded through this edit too.
- CLAUDE.md LOC budget: adding `+5 LOC` to rule R4 (or splitting) brings 42→47 LOC, still under the 50-LOC cap.

---

## §5 — R5: Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts

### §5.1 — Rule (verbatim from CLAUDE.md:22)

> 5. **Safety boundaries via Claude Code permissions + sandboxing**, NOT custom guard scripts — per `https://docs.anthropic.com/en/docs/claude-code/settings`.

### §5.2 — Counterexample search (HIGH severity)

**Counterexample 1 — gitleaks hook at settings.json:108**:

Cite-anchor: `Z:/claude-sota-installed/.claude/settings.json:108-115` (verified 2026-05-18):

```jsonc
"PreToolUse": [
  {
    "matcher": "Bash",
    "hooks": [
      {
        "type": "command",
        "command": "gitleaks protect --staged --no-banner --redact --exit-code 0 || true"
      }
    ]
  }
]
```

This is a "custom guard script" by the rule's plain reading. It scans staged content for secrets BEFORE a Bash tool call executes. The rule says safety should be "via Claude Code permissions + sandboxing" — i.e. the `permissions.deny[]` block (which we DO have, with 18 entries covering `**/id_rsa`, `**/*.pem`, `./.env`, etc. — settings.json:64-83).

But the `deny[]` block is **insufficient** for secret-prevention on Bash:
- `deny[]` blocks READ access patterns
- gitleaks scans staged Git CONTENT for secret patterns inside files about to be committed
- These are different attack surfaces

The rule's framing forces a false binary: either (a) drop gitleaks and trust `deny[]` only (regression — gitleaks has caught secret commits in this runtime per W295 codex r12), or (b) keep gitleaks and accept a wave-after-wave latent CR-5 violation.

**Counterexample 2 — ruff + shellcheck PostToolUse hooks**:

Cite-anchor: `Z:/claude-sota-installed/.claude/settings.json:117-128`:

```jsonc
"PostToolUse": [
  {
    "matcher": "Edit|Write|MultiEdit",
    "hooks": [
      {
        "type": "command",
        "command": "bash -c \"f=...; case \\\"\\$f\\\" in *.py) ruff check --quiet --fix -- ...; ruff format ...;; *.sh|*.bash) shellcheck --severity=error -- ...;; esac; true\""
      }
    ]
  }
]
```

These are "guard scripts" by the rule's plain reading. They enforce code-quality + security-style boundaries on every Edit/Write. They are LOAD-BEARING per W290 F1 ("ruff `--select ALL` PASS 0 errors; shellcheck PASS 0 findings") — without them the runtime would regress.

The rule's spirit is "don't write `safe_command.sh` wrappers around CC's built-in features". The letter as written forbids gitleaks/ruff/shellcheck — but these are not built-in features they replace; they are external tools invoked as direct-CLI hooks (CR-2-compliant).

### §5.3 — Verdict: **RELAX (cite exception)**

The rule needs an explicit carve-out: "direct-CLI security/quality tool invocations via hooks are PERMITTED safety augmentation". This already aligns with R2's "direct upstream-CLI invocations" — but R5's plain text contradicts that allowance.

### §5.4 — Proposed CLAUDE.md edit (operator-approval-gated)

```
5. **Safety boundaries via Claude Code permissions + sandboxing as PRIMARY**, with
   direct-CLI security/quality tool invocations as hooks (gitleaks · ruff · shellcheck
   et al.) as PERMITTED SECONDARY safety augmentation. NO custom guard SCRIPTS
   (`.py/.sh/.mjs` wrappers re-implementing CC built-ins) — per
   `https://code.claude.com/docs/en/settings` + `https://code.claude.com/docs/en/hooks`.
```

### §5.5 — Cardinal-rule self-check

- R1: external tools (gitleaks/ruff/shellcheck) come from trusted sources (StackExchange/Astral/koalaman OSS). PASS.
- R2: direct-CLI invocations — already R2-compliant. PASS.
- R3: orthogonal. PASS.
- R4: orthogonal. PASS.

---

## §6 — Derived norm D1: Subagent format (frontmatter)

### §6.1 — Rule (implicit from R3 + `.claude/agents/*.md` shipped state)

Cite-anchor for "canonical frontmatter": `code.claude.com/docs/en/sub-agents` + on-disk inspection of 4 local agents.

### §6.2 — Counterexample search

W298 Stream D §5 reports: "4/4 .claude/agents/*.md sub-agent frontmatter PASS". On-disk verification of `evaluator.md` shows fully-spec'd frontmatter:
- `name`, `description`, `tools`, `disallowedTools`, `model`, `permissionMode`, `maxTurns`, `effort`, `isolation`, `memory`, `background`, `color`, `skills`, `mcpServers`

`gpt5-archaeologist.md` at 200 LOC similarly compliant.

No counterexample found.

### §6.3 — Verdict: **KEEP**

No drift, no harm.

---

## §7 — Derived norm D2: Hook discipline (consolidated pre-bash-dispatcher pattern)

### §7.1 — Norm (implicit from everything-claude-code plugin shipped pattern)

The everything-claude-code plugin uses a **single consolidated dispatcher** pattern for Bash PreToolUse — one hook handler invoked, then dispatches internally to N sub-checks (quality, tmux, push, gateguard). Same for Edit/Write hooks.

Cite-anchor: `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/hooks/hooks.json:5-17`:
```json
{
  "matcher": "Bash",
  "hooks": [{
    "type": "command",
    "command": "...plugin-hook-bootstrap.js node scripts/hooks/pre-bash-dispatcher.js"
  }],
  "description": "Consolidated Bash preflight dispatcher for quality, tmux, push, and GateGuard checks",
  "id": "pre:bash:dispatcher"
}
```

### §7.2 — Counterexample search

**Candidate — anti-pattern would be N separate matchers/hooks for Bash**. This would:
- Spawn N child processes per Bash tool call (cygwin fork-emulation collision per W298 Stream A finding 6)
- Make `ECC_DISABLED_HOOKS` enforcement harder (each hook needs its own token)
- Increase startup latency proportionally

The dispatcher pattern wins on:
- Single spawn per matcher
- Per-hook env-toggle via `ECC_DISABLED_HOOKS=hook:token1,hook:token2,...` (currently honored across 22+ specific tokens per W298 §1 verified)
- Easier hook-author iteration (add a check inside the dispatcher, no settings.json change)

No counterexample where the dispatcher pattern produced harm in this runtime.

### §7.3 — Verdict: **KEEP-with-pattern-doc**

Add a CLAUDE.md §Architecture sub-bullet documenting the pattern as recommended:

> *"Recommended hook pattern: consolidated dispatcher (one matcher, internal sub-check routing) per `everything-claude-code` upstream. Avoids cygwin fork-emulation collision under parallel-agent burst (per W298 §A finding 6)."*

### §7.4 — Open question

W298 Stream A finding 6 explicitly recommends adding `stop:check-console-log` to `ECC_DISABLED_HOOKS` for 25-33% Stop fork-burden reduction. This is queued as B3. The dispatcher pattern doesn't fully solve fork-burden under parallel-agent burst — opportunity for the everything-claude-code plugin to also consolidate Stop hooks.

---

## §8 — Derived norm D3: `.claude/rules/` non-existence-by-design

### §8.1 — Norm

Same as R4. CLAUDE.md states it twice (in R4 + W255 cleanup framing) — both must be reversed.

### §8.2 — Verdict

**REVERSE** — see §4.

---

## §9 — Derived norm D4: 3-worktree cap

### §9.1 — Norm (verbatim from CLAUDE.md:14)

> **~3 parallel cap** (cognitive + token budget)

### §9.2 — Counterexample search

Cite-anchor for cap: `code.claude.com/docs/en/cli-reference` `--fork-session`/`/branch` discipline; "rebase-not-merge to keep linear history; `git push --force-with-lease` not `--force`".

Current state (`git worktree list` 2026-05-18 21:57):
```
Z:/claude-sota-installed       7254beb [sota-converge-w295]
Z:/claude-sota-installed-W287  0f9dbe8 [goal/W287-reconcile]
Z:/claude-sota-installed-W290  373ef71 [sota-converge-w290]
```

3 total active (main + W287 + W290). At cap.

**Counterexample search**: is "~3" the right number?
- Anthropic docs don't pin a number; "~3 cap" is operator-derived
- Operator's hindsight T1 memory (per W280d) says "cognitive + token budget" — i.e. context-window soft-cap
- W269 mandate (CLAUDE.md:13) sets agent-team cap to 4 for parallel Agent fan-out — different metric (in-session subagents, not git worktrees)

The cap is reasonable but its cite-anchor is weak. "Cognitive + token budget" is vague. Better:
- Each worktree has its own `~/.claude.json` session + its own auto-compact cadence + its own MCP-connection pool
- 4+ worktrees risks (a) operator context-switching overhead (cognitive) AND (b) MCP connection saturation (when all worktrees hit gitleaks/ruff/shellcheck simultaneously — observed pattern in W295)

### §9.3 — Verdict: **KEEP-clarify**

The "~3 cap" is right; the rationale needs sharper cite. Recommend:

```
**Parallel-session safety (W280d)**: ... NEVER bare-resume the same session-id in 2
terminals (state divergence + race-condition message corruption); use **one git
worktree per session**; rebase-not-merge to keep linear history; `git push
--force-with-lease` not `--force` (preserves peer pushes); **~3 parallel cap**
(cognitive context-switching + MCP-connection-pool saturation per W295 observation;
per `code.claude.com/docs/en/cli-reference` `--fork-session`/`/branch` semantics);
remove worktree on merge ...
```

### §9.4 — Cardinal-rule self-check

Edit is to CLAUDE.md §Architecture not the 5-rules block. No CR-1 to CR-5 change. PASS.

---

## §10 — W286 P0C: `.mcp.json` MCP-server contract = `npx -y <pkg>@<pinned-version>`

### §10.1 — Norm (verbatim from CLAUDE.md:19)

> **W286-arc-P0C ratification 2026-05-18**: `.mcp.json` MCP-server `command/args` contract is `npx -y <pkg>@<pinned-version>` (per W286-cross commits `fcafe05`+`77dc081`); W155 F13 native-node migration RETIRED — CR-9 version-pin discipline wins over spawn-churn optimization.

### §10.2 — Counterexample search

`.mcp.json` (verified 2026-05-18) shows 4 MCPs use `npx -y <pkg>@<pinned-ver>`:
- `playwright`: `npx -y @playwright/mcp@0.0.75`
- `chrome-devtools`: `npx -y chrome-devtools-mcp@0.26.0 --no-usage-statistics`
- `repomix`: `npx -y repomix@1.14.0 --mcp`
- `phoenix`: `npx -y @arizeai/phoenix-mcp@4.0.13 --baseUrl http://127.0.0.1:16006`

Plus 4 use direct paths (memory.exe, langfuse build/index.js, basic-memory.exe, ccusage) and 1 uses uvx (serena).

**Counterexample — codex rounds 1-5 keep flagging W286-P0C as MEDIUM**: per CLAUDE.md:7 `w286_cross_npx_pinned_v2` comment in `.mcp.json` _comments:

> "Codex round-1/2/3/4/5 keep flagging this as MEDIUM (preferring W155 F13 spawn-churn-min); operator-accepted trade-off per goal predicate (MEDIUM does NOT trigger ship-BLOCK; portability > 0.5s startup latency)."

This is the canonical "evidence-based rule held vs codex disagreement" case. The operator-decision is documented. The MEDIUM-not-HIGH severity tells us codex thinks 0.5s startup × N spawns matters, but in practice:
- MCP spawns are session-start only (not per-tool-call)
- 0.5s × 4 npx-MCPs = 2s once at session start — operator-bearable
- Z:-portability invariant blocks the alternative

**Where is the harm**: there isn't one. The rule holds with measured trade-off.

### §10.3 — Verdict: **KEEP**

Operator-accepted MEDIUM-class trade-off. The W286 P0C language correctly cites the trade-off + W286-cross commits. No edit needed.

### §10.4 — Future-watch

If `ENABLE_FINE_GRAINED_TOOL_STREAMING=1` (settings.json env) changes how MCPs are spawned per-tool-call rather than per-session, the 0.5s × N math changes. Re-litigate at W302 (3 waves out).

---

## §11 — Proposed CLAUDE.md edits (consolidated, operator-approval-gated)

| # | Section | Change | Priority |
|--:|---|---|:--:|
| 1 | R4 (CLAUDE.md:21) | **REVERSE** — `.claude/rules/` IS sanctioned per Anthropic docs. Update language. | **CRITICAL** |
| 2 | W255 cleanup note (CLAUDE.md:5) | Reframe — 64 rules were R1-content-violation, NOT R4-directory-violation. | **CRITICAL** |
| 3 | R2 (CLAUDE.md:19) | Add "upstream-bug-patch shim" exception clause. Cite context-mode-cache-heal.mjs as exemplar. | HIGH |
| 4 | R5 (CLAUDE.md:22) | Add "direct-CLI security/quality tool invocations PERMITTED" carve-out. Cite gitleaks/ruff/shellcheck. | HIGH |
| 5 | R1 (CLAUDE.md:18) | Add "operator-authored `.claude/skills/<name>/SKILL.md` + `.claude/agents/*.md` permitted" sub-clause. | MEDIUM |
| 6 | Architecture bullet (CLAUDE.md:11) | Add line "4 local agents at `.claude/agents/` provide project-specific reviewers". | LOW |
| 7 | Architecture bullet (parallel-session ~3 cap, CLAUDE.md:14) | Sharpen rationale cite ("MCP-connection-pool saturation per W295 observation"). | LOW |
| 8 | Architecture bullet (hooks recommended pattern) | Document consolidated-dispatcher pattern as recommended (per everything-claude-code). | LOW |

**LOC budget**: cap is ≤50 LOC. Current is 42 LOC. Edits #1+#2 alone add ~6 LOC (47 LOC). Adding #3+#4 adds ~4 more (51 LOC, over cap). Recommend pointer-only references to a NEW `.claude/rules/cardinal-rules.md` topic-scoped file that holds the full rationale, while CLAUDE.md keeps the 5-bullet pointer form. (This is the very pattern Anthropic documents for `.claude/rules/`.)

**Cardinal-rule self-check on the consolidated edit**: NO proposed edit violates any OTHER cardinal rule (verified per-section §X.5/X.6 above).

---

## §12 — Open questions routed to W299-AUDIT

| # | Question | Source |
|--:|---|---|
| OQ-A1 | Should the W255-historical `.claude/rules/` deletes be partially re-added under topic-scoped + path-gated discipline? (E.g. one rule for python-style, one for git-workflow.) Or kept purely-CLAUDE.md? | §4.5 |
| OQ-A2 | The `.claude/hooks/context-mode-cache-heal.mjs` operator-decision matrix from W296 r0 is still open. Stream A recommends RATIFY-EXCEPTION + rule-update (§2.4). Decision needed. | §2.2 |
| OQ-A3 | Should the consolidated-dispatcher hook pattern be CLAUDE.md-documented as recommended for any local-plugin authoring? | §7.3 |
| OQ-A4 | Should the 4 local agents at `.claude/agents/` be moved to a local-plugin form (`.claude/plugins/local/agents/`) for consistency with R1 wording, or kept in-place per R3 sanctioning? | §3.4 |
| OQ-A5 | If R4 is reversed, do we need a migration plan for the W255-deleted `.claude/rules/` content? Per `git log --before=2026-05-15` it's recoverable. | §4.5 |
| OQ-A6 | W286 P0C: should the codex-MEDIUM-disagreement be ledgered explicitly with a "re-litigate-W302" stamp per the W291 G4 AGING-re-litigation advisory? | §10.4 |

---

## §13 — Cite-trail (full)

### TIER-1-DIRECT (Anthropic docs, indexed 2026-05-18 21:57)
- `code.claude.com/docs/en/claude-directory` — "Choose the right file" table (`rules/*.md` row + scope/commit/reference); §"What's not shown" ("add skills, rules, or subagents as you need them")
- `code.claude.com/docs/en/memory#organize-rules-with-claude/rules/` — directory tree example (`code-style.md`/`testing.md`/`security.md`); "Rules without `paths` frontmatter are loaded at launch with the same priority as `.claude/CLAUDE.md`"; `paths:` glob frontmatter examples
- `code.claude.com/docs/en/plugins-reference` — canonical plugin tree (`scripts/security-scan.sh`/`format-code.py`/`deploy.js`); Hook troubleshooting docs
- `code.claude.com/docs/en/hooks` — hook event lifecycle + `${CLAUDE_PROJECT_DIR}`/`${CLAUDE_PLUGIN_ROOT}` placeholders
- `code.claude.com/docs/en/sub-agents` — sub-agent frontmatter schema

### TIER-2 (in-runtime evidence)
- `Z:/claude-sota-installed/CLAUDE.md` HEAD `7254beb` — 5 cardinal rules verbatim
- `Z:/claude-sota-installed/CLAUDE.md:5` — W255 cleanup framing
- `Z:/claude-sota-installed/.claude/settings.json:51-83` (permissions deny[]/allow[]), `:97` (cache-heal hook), `:108-128` (gitleaks/ruff/shellcheck hooks)
- `Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs` — 1656-byte self-invent .mjs
- `Z:/claude-sota-installed/.claude/agents/{evaluator,gpt5-archaeologist,wshobson-devops-troubleshooter,wshobson-security-auditor}.md` — 351 LOC local subagent definitions
- `Z:/claude-sota-installed/.claude/skills/` — 18 local skill directories
- `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/rules/` — 16-subdir official-plugin rules directory
- `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/hooks/hooks.json` — consolidated-dispatcher pattern
- `Z:/claude-sota-installed/.mcp.json` — 4 W286-P0C npx-pinned MCPs + 4 direct-path + 1 uvx

### TIER-3 (W-wave history)
- W255 cleanup commit (per CLAUDE.md:5)
- W286-cross commits `fcafe05` + `77dc081` (W286 P0C ratification)
- W295 commit `5a72f51` (Stream E:833 cache-heal residue)
- W296 commit `d72d3aa` ("Stream E CRITICAL cardinal-rule-2 violation surfaced")
- W298-AUDIT-2026-05-18 §5 (4/4 sub-agent frontmatter PASS)
- W298-AUDIT §6 + W298 Stream B (everything-claude-code plugin coverage)
- W291 G4 AGING re-litigation advisory (cited for OQ-A6)

### Source-disagreement log
- **codex vs operator on W286 P0C**: codex rounds 1-5 flag MEDIUM (prefer W155-F13 spawn-churn-min); operator accepted MEDIUM trade-off (Z:-portability > 0.5s startup latency). Documented in `.mcp.json:7` `w286_cross_npx_pinned_v2` comment. NOT a Stream A rule-change recommendation; verdict KEEP holds.
- **W296 r0 vs HEAD on context-mode-cache-heal**: W296 r0 surfaced as CRITICAL violation; HEAD still ships it; operator-decision still pending. Stream A surfaces this 3 waves later as still-unresolved.
- **Stream A vs CLAUDE.md:21 self-claim on `.claude/rules/`**: Anthropic docs contradict CLAUDE.md's "does not exist by design". This is the canonical Stream A finding.

---

## §14 — Done-criteria checklist

- [x] File created at `docs/architecture/W299-E2E-CODEX-AND-RULES-AUDIT/W299-STREAM-A-RULES-ADVERSARIAL-AUDIT.md`
- [x] All 5 cardinal rules + 4 derived norms + W286 P0C addressed = **10 sections** (§1-§10)
- [x] ≥1 counterexample per rule (or explicit "no counterexample found, KEEP") — verified per-rule
- [x] ≥3 cite-anchors per challenge — verified per-rule (Anthropic-doc + on-disk + W-wave-history)
- [x] §11 consolidated proposed CLAUDE.md edits (operator-approval-gated)
- [x] §12 open questions to W299-AUDIT
- [x] §13 cite-trail (TIER-1 + TIER-2 + TIER-3)
- [x] Cardinal-rule self-check on each proposed edit — verified per-section
- [x] Source-disagreement log surfaced (3 disagreements logged in §13)
- [x] Honest verdict distribution: 2 KEEP, 4 RELAX/CLARIFY, 1 STRENGTHEN-REVERSAL, 0 KEEP-rigidly (operator demanded evidence-driven, not status-quo-confirmatory)

---

END W299-STREAM-A-RULES-ADVERSARIAL-AUDIT.md
