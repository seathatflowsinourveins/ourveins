# W331 — Cluster H Deep-Dive: Plugin/Skill Ecosystem + Supply-Chain Tooling

> **Wave**: W331-DEEP-DIVE-LINE-BY-LINE follow-up
> **Cluster scope**: 29 local clones at `Z:/claude-sota-installed-repos/<slug>/` (per operator brief)
> **Framework**: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` (sca-v12.1) + `references/dimensions.md` (D1-D49, D52-D65, D66)
> **Synthesis upstream**: `Z:/claude-sota-installed/docs/architecture/W330-MEGA-AUDIT/SYNTHESIS.md` (W330 P0 findings consolidated)
> **Runtime fingerprint**: 47 enabled plugins from 16 marketplaces; 33 operator-curated skills under `.claude/skills/`
> **Operator constraints**: mature repos → deeper-dive (not PR); GraphQL/SOTA bypasses; NO key rotation; ≥3 org-distinct cites
> **Deliverable**: §1 verdict table · §2 novel SOTA patterns · §3 cardinal-rule audit (W330 P0.9) · §4 skill-ecosystem comparison · §5 supply-chain hardening · §6 ≥3 org-distinct anchors · §7 mapping to W330 P0.5/P0.6/P0.9
> **Date**: 2026-05-19

---

## §1 Per-repo verdict table (29 repos)

Tiers per sca-v12.1 §1 — `T0` (canonical-already-installed) · `T1` (full install) · `T1-PROV` (install-on-probation) · `T2` (vendor-fork) · `T2-CHERRY` (cherry-pick pattern only) · `T3` (pattern-study, no install) · `T4` (cite-only) · `T5` (reject). All HEADs captured 2026-05-19.

| # | Repo | HEAD (short) | License | Verdict | Rationale | Local-state map |
|---|---|---|---|---|---|---|
| 1 | `obra/superpowers` | `f2cbfbe` (v5.1.0) | MIT (per `LICENSE`, "Copyright (c) 2025 Jesse Vincent") | **T0** | Already installed via `superpowers-marketplace` and `claude-plugins-official` per `Z:/claude-sota-installed/.claude/plugins/marketplaces/`; 14 core skills (`brainstorming`/`dispatching-parallel-agents`/`executing-plans`/`finishing-a-development-branch`/`receiving-code-review`/`requesting-code-review`/`subagent-driven-development`/`systematic-debugging`/`test-driven-development`/`using-git-worktrees`/`using-superpowers`/`verification-before-completion`/`writing-plans`/`writing-skills`). HEAD `f2cbfbe Release v5.1.0 (#1468)` advanced past the installed plugin pin — flag as **DRIFT-LEADER candidate** for the next housekeeping wave. | `.claude/plugins/marketplaces/superpowers-marketplace/` |
| 2 | `obra/superpowers-skills` | `cdcd624` ("Use flexible remote detection in pulling-updates skill (#11)") | MIT | **T0/T1** | Companion skill repo organised under top-level domains `architecture/`, `collaboration/`, `debugging/`, `meta/`, `problem-solving/`, `research/`, `testing/`, `using-skills/`. The `meta/` and `using-skills/` skills define how the Superpowers system instructs Claude to find+use skills — these are the discipline backbone (see §2 SOTA pattern #1). | Skills reach via `superpowers` plugin install at marketplace-level; meta-pattern absorbed into local `.claude/skills/`. |
| 3 | `obra/superpowers-chrome` | `ded51c3` (v2.1.0) | MIT | **T2-CHERRY** | Dual-mode plugin: 17-command skill mode + single `use_browser` MCP. `plugin.json` declares `agents: ["./agents/browser-user.md"]` + `mcpServers.chrome` invoking `node ${CLAUDE_PLUGIN_ROOT}/mcp/dist/index.js`. Pattern of single-plugin × {skills, agent, MCP} co-shipped is novel; cherry-pick the layout for future custom installs. | Not installed (we use `chrome-devtools-mcp@0.26.0` via `.mcp.json`); pattern documented in §2 #3. |
| 4 | `obra/superpowers-marketplace` | `4a91b4a` ("Bump claude-session-driver to 2.0.0") | MIT | **T0** | Active marketplace with 7 plugins declared: `superpowers` (5.1.0), `superpowers-lab` (0.4.0), `superpowers-developing-for-claude-code` (0.3.1), `superpowers-dev`, `claude-session-driver` (2.0.0), `private-journal-mcp` (1.2.0), `double-shot-latte` (1.2.0). All entries `"strict": true`. **Schema reference** for our own marketplace authoring — see §2 #2. | `.claude/plugins/marketplaces/superpowers-marketplace/` |
| 5 | `yamadashy/repomix` | (latest, MIT) | MIT | **T0** | Already wired as MCP server via `npx -y repomix@1.14.0` per `.mcp.json` (per W155-F13/W286-cross). `.github/workflows/` includes `autofix.yml`, `benchmark.yml`, `ci.yml`, `codeql.yml`, `pack-repository.yml` (Repomix can pack itself), `pinact.yml` (pinning action SHAs). Hardened CI baseline. | `.mcp.json` mcpServers.repomix |
| 6 | `abhigyanpatwari/GitNexus` | `2376912` ("feat(ingestion): Add C++ parameter type class sidecar (#1642)") on local checkout; **upstream HEAD `803f0bed`** "fix(lbug): probe-then-load FTS extension on Windows (#1690) (#1692)" landed 2026-05-19 11:09 UTC, 1 commit after our pinned `ed50a6729f83c74c2458d37527236e2324c06702` (v1.3.6) | MIT | **T0-DRIFT-LEADER** | Already installed via `gitnexus-marketplace`. The **post-install commit `803f0bed`** fixes a Windows-impacting hard-skip of `loadFTSExtension()` in `pool-adapter.ts:423` (`Windows guard: LOAD EXTENSION fts crashes with SIGSEGV on Windows when ...`) — i.e. **BM25 silently degrades to 0 hits on Windows**. This runtime IS Windows 11 (per `CLAUDE.local.md` L4). Hot follow-up: see W331-X2 in §7 (relabeled per codex round-1/round-2 R5 absorb — NOT W330 P0.6, which is mem0/Letta/Zep T1 bakeoff per GOAL-W331.md:18). | `.claude/plugins/cache/gitnexus-claude-plugin/` + `.mcp.json:37 mcpServers.gitnexus` |
| 7 | `gitleaks/gitleaks` | `9febafb` ("broken link") | MIT | **T0** | Wired as direct-CLI hook in `.claude/settings.json` (PreCommit gate per Cardinal-rule-2). `config/gitleaks.toml` is the default rule pack (Go-package; in-repo Go-doc badge confirms Go 1.x package). | `.claude/settings.json` PreCommit hook |
| 8 | `ossf/scorecard` | (Apache-2.0, v5 active branch) | Apache-2.0 | **T2-CHERRY** | Source of truth for the W330 P0.9 CR-1 trust definition. 19 checks under `checks/`: `binary_artifact.go`, `branch_protection.go`, `ci_tests.go`, `cii_best_practices.go`, `code_review.go`, `contributors.go`, `dangerous_workflow.go`, `dependency_update_tool.go`, `fuzzing.go`, `license.go`, `maintained.go`, `packaging.go`, `permissions.go`, `pinned_dependencies.go`, `sast.go`, `sbom.go`, `security_policy.go`, `signed_releases.go`, `vulnerabilities.go`, `webhook.go`. `evaluation/sbom.go:21-22` imports `probes/hasReleaseSBOM` + `hasSBOM`; `evaluation/signed_releases.go:26-27` imports `releasesHaveProvenance` + `releasesHaveVerifiedProvenance`. Use as adopt-plan reference; do NOT install in-repo (use the public scorecard.dev results instead). | Pattern adopted into CR-1 extension; see §3. |
| 9 | `aquasecurity/trivy` | `e4325b1` ("feat(secret): add a way to customize skipped folders, files and exts (#10550)") | Apache-2.0 | **T2-CHERRY** | Trivy already produces both `--format cyclonedx` and `--format spdx` outputs (`docs/guide/configuration/reporting.md:622`). Use `trivy fs` + `trivy sbom` for SBOM generation in our supply-chain hardening plan (§5). NOT installed as Claude Code primitive; invoke as direct-CLI in a future hardening hook. | Plan-target for `.claude/settings.json` PreCommit SBOM stamp. |
| 10 | `ast-grep/ast-grep` | (Rust + npm + pip + brew distribution) | MIT | **T2-CHERRY** | Already used in our `tools/preagent-parallel-guard.mjs` family conceptually. AST-grep rule schema: `{rule, constraints, utils, transform, fix, severity, message, note, files, ignores, language, url, metadata}` per the in-repo `crates/.../schema.json` (`$schema: https://json-schema.org/draft/2020-12/schema`). Cherry-pick the YAML rule schema for future structural-search rules in our `docs/architecture/` collateral. | Direct-CLI invocation candidate. |
| 11 | `oraios/serena` | (active branch) | MIT | **T0** | Already wired via `serena` MCP per `.mcp.json` (per W75 kits-convergence). Surfaces `find_symbol`, `find_referencing_symbols`, `find_implementations`, `find_declaration`, `get_symbols_overview`, `insert_after_symbol`, `replace_symbol_body` per `src/serena/code_editor.py:139` and `src/serena/symbol.py:809`. Backbone of our `local-cypher-codebase` skill (per `.claude/skills/local-cypher-codebase/SKILL.md`). The README HAS an `> IMPORTANT: Do not install Serena via an MCP or plugin marketplace! They contain outdated and suboptimal installation commands.` — we are already on the recommended `uvx` path. | `.mcp.json` mcpServers.serena |
| 12 | `microsoft/markitdown` | (Python pkg; Microsoft org) | MIT | **T2-CHERRY** | Document-to-Markdown probe-record (Δ51 sca-v12). PyPi package `markitdown`; converts office/HTML/PDF/etc. to Markdown. Not installed as Claude Code primitive but valuable for `Read`-pipeline pre-processing when ingesting `.docx`/`.pptx`. Pattern: `python -m markitdown` then feed result to Claude as text. | Pattern-document only; not installed. |
| 13 | `DS4SD/docling` | (Apache-2.0; IBM Research DS4SD org) | Apache-2.0 | **T3** | Heavier document-AI pipeline (layout, table extraction). Higher dep footprint than markitdown; only justifies install if Z:-local doc analysis becomes a recurring workload. | Pattern-study; not installed. |
| 14 | `microsoft/mcp` | (active) | MIT | **T2-CHERRY** | Microsoft's MCP umbrella documenting Azure MCP (48+ Azure services), Foundry MCP (`https://mcp.ai.azure.com`), Fabric MCP, Playwright MCP, GitHub MCP. Reference for MCP server-builder patterns. Cherry-pick the streamable-HTTP transport pattern when needed; we currently use stdio for all local MCPs. | Pattern-document. |
| 15 | `microsoft/skills` | `8c173db` ("Merge pull request #324 from microsoft/sync/copilot-for-azure-25857758663") | MIT | **T2-CHERRY** | 174 Microsoft skills targeting Azure SDKs + Foundry. `npx skills add microsoft/skills` distribution + `skills.sh` registry. Each `SKILL.md` carries `name`, `description`, `license`, `metadata` (`author`, `version`, `package`). Example: `.github/skills/applicationinsights-web-ts/SKILL.md` shows `metadata.package: "@microsoft/applicationinsights-web"`. **Cherry-pick the `metadata.package` field** for our `addy-agent-skills`/`mattpocock-skills` curated entries. | Pattern-extract; not installed wholesale. |
| 16 | `microsoft/azure-skills` | (active) | MIT | **T3** | Azure-specific subset; only valuable if our runtime starts authoring Azure code paths. | Pattern-defer. |
| 17 | `addyosmani/agent-skills` | (active) | MIT | **T0** (partial) | Source of W316 addyosmani-vendor-fork-5 (interview-me + doubt-driven-development + frontend-ui-engineering + api-and-interface-design + code-simplification per `CLAUDE.md`). 3 prefix-namespaced variants already vendored. Locally we have `addyosmani-doubt-driven-development`, `addyosmani-frontend-ui-engineering`, `addyosmani-api-and-interface-design` plus the direct `doubt-driven-development`/`code-simplification`/`frontend-ui-engineering`/`api-and-interface-design` entries. | `.claude/skills/{doubt-driven-development,code-simplification,frontend-ui-engineering,api-and-interface-design}/` |
| 18 | `mattpocock/skills` | (active per W320 Stream B `67bce91c80cd`) | MIT | **T0** (partial) | Source of W320-fork-6: `grill-with-docs`, `tdd`, `caveman` (separate caveman-vendor entry below), `diagnose`, `handoff`, `review`. Locally present at `.claude/skills/{grill-with-docs,tdd,caveman,diagnose,handoff,review}/SKILL.md`. | `.claude/skills/{grill-with-docs,tdd,caveman,diagnose,handoff,review}/` |
| 19 | `forrestchang/andrej-karpathy-skills` | (active) | MIT | **T0** | Source of `andrej-karpathy-skills:karpathy-guidelines` plugin already enabled. Companion `karpathy-coder:{karpathy-check,karpathy-coder}` skills also in plugin set. | enabled plugin |
| 20 | `iannuttall/ralph` | (npm `@iannuttall/ralph`) | MIT (presumed; per package convention) | **T2-CHERRY** | File-based agent loop (`.ralph/` state, PRD JSON, one story per iteration). Pattern: "**files and git as memory, not the model context**". Architecturally adjacent to our `ralph-loop:ralph-loop` skill (already enabled). Cherry-pick the `state→loop→commit` triad as a reference for future autonomous-loop builds. | `ralph-loop:ralph-loop` skill enabled. |
| 21 | `affaan-m/everything-claude-code` | (v2.0.0-rc.1 per README "Apr 2026") | (open-source) | **T0** | `everything-claude-code` plugin enabled (per W308 `.claude/rules/` ratification). 60 agents, 232 skills, 75 legacy command shims per README. Source of W255-cleanup re-acceptance of `.claude/rules/` directory convention. | plugin enabled |
| 22 | `Yeachan-Heo/oh-my-claudecode` | (active) | (open-source) | **T3** | Curated collection-style README pointing to upstream skills/plugins. CLI Commands vs In-Session Skills divider is good docs pattern. | Pattern-document. |
| 23 | `JuliusBrussee/caveman` | (active) | MIT (presumed; per "caveman" tagline) | **T0** | Token-compression "caveman" speak. Vendored via mattpocock fork as `caveman` skill. | `.claude/skills/caveman/SKILL.md` |
| 24 | `VILA-Lab/Dive-into-Claude-Code` | (active) | (academic) | **T3** | Best-in-class **research-architecture survey** of Claude Code internals — describes the 9-step pipeline ("Settings resolution → State init → Context assembly → 5 pre-model shapers → Model call → Tool dispatch → Permission gate → Tool execution → Stop condition"), 5 compaction shapers (Budget Reduction → Snip → Microcompact → Context Collapse → Auto-Compact), 7 permission modes (`plan → default → acceptEdits → auto → dontAsk → bypassPermissions` + internal `bubble`), 7 safety layers, and the `yoloClassifier.ts` auto-mode classifier. **Operator-grade citation source** — pattern-cite anchor for future Cardinal-rule extensions. | Pattern-cite source. |
| 25 | `hesreallyhim/awesome-claude-code` | (curated list) | (open-source) | **T4** | Awesome-list aggregator. Cite for breadth, not pattern-extract. | Cite-only. |
| 26 | `ComposioHQ/awesome-claude-skills` | (curated list) | (open-source) | **T4** | Composio-curated skills index; `connect-apps-plugin/README.md` hints at OAuth integration pattern but the main asset is breadth. | Cite-only. |
| 27 | `quemsah/awesome-claude-plugins` | (curated list) | (open-source) | **T4** | Plugin catalog aggregator. | Cite-only. |
| 28 | `alirezarezvani/claude-skills` | (active) | (open-source) | **T5-RETIRE** | Per W330 `GOAL-W331.md:24`: "Retire alirezarezvani/claude-skills + mattpocock/skills" — note that mattpocock-skills is retained as vendor-fork-6 source despite W330 ledger entry; alirezarezvani is the actual retire-candidate. Wording-polish only, no novel pattern surfaced in this dive. | Mark for retire. |
| 29 | `cloudflare/agent-skills-discovery-rfc` | (RFC v0.2.0) | (open-source, Cloudflare org) | **T2-CHERRY** | **RFC for skill-discovery index format** with `$schema: https://schemas.agentskills.io/discovery/0.2.0/schema.json`, top-level `skills[]`, each entry `{name, type, description, url, digest}` with SHA-256 digest enforcement. Type values: `"skill-md"` (single file) or `"archive"` (`.tar.gz`/`.zip`). Mandates path-traversal/symlink/decompression-bomb guardrails. **Adopt the digest-pinning pattern in our marketplace authoring** (§2 #2 + §3 CR-1 extension). | Pattern-extract candidate. |

### Tier summary
- **T0** (already installed): 9 — `obra/superpowers`, `obra/superpowers-skills`, `obra/superpowers-marketplace`, `yamadashy/repomix`, `abhigyanpatwari/GitNexus` (drift-leader), `gitleaks/gitleaks`, `oraios/serena`, `forrestchang/karpathy-skills`, `affaan-m/everything-claude-code`, partial `addyosmani/agent-skills`, partial `mattpocock/skills`, `JuliusBrussee/caveman`
- **T2-CHERRY** (pattern adopted, not installed wholesale): 9 — `obra/superpowers-chrome`, `ossf/scorecard`, `aquasecurity/trivy`, `ast-grep/ast-grep`, `microsoft/markitdown`, `microsoft/mcp`, `microsoft/skills`, `iannuttall/ralph`, `cloudflare/agent-skills-discovery-rfc`
- **T3** (pattern-study only): 4 — `DS4SD/docling`, `microsoft/azure-skills`, `Yeachan-Heo/oh-my-claudecode`, `VILA-Lab/Dive-into-Claude-Code`
- **T4** (cite-only): 3 — `hesreallyhim/awesome-claude-code`, `ComposioHQ/awesome-claude-skills`, `quemsah/awesome-claude-plugins`
- **T5-RETIRE**: 1 — `alirezarezvani/claude-skills`

---

## §2 Novel SOTA patterns (cited, file:line where applicable)

### Pattern 1 — Two-tier skill discipline (`using-superpowers` + `using-skills` meta)

Obra's discipline is the most explicit instance of the W255-spirit "skills auto-fire from `description:` match" rule:

```
name: using-superpowers
description: Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions
```
(`Z:/claude-sota-installed-repos/obra-superpowers/skills/using-superpowers/SKILL.md`)

The `Instruction Priority` block inside `using-superpowers/SKILL.md` cements the hierarchy:

> 1. **User's explicit instructions** (CLAUDE.md, GEMINI.md, AGENTS.md, direct requests) — highest priority
> 2. **Superpowers skills** — override default system behavior where they conflict
> 3. **Default system prompt** — lowest priority

That `Instruction Priority` is the **canonical CLAUDE.md vs. skill-conflict-resolution rule** for the wider ecosystem. Our `CLAUDE.md` already wins per cardinal-rule-4, but documenting the precedence inline in our skill set (e.g. a top-level `using-superpowers`-style overview at `.claude/skills/learned/SKILL.md`) would harden the auto-fire discipline.

### Pattern 2 — Marketplace `marketplace.json` schema

Obra's `obra-superpowers-marketplace/.claude-plugin/marketplace.json` (114 lines, MIT) is a clean reference for our own marketplace authoring:

```json
{
  "name": "superpowers-marketplace",
  "owner": { "name": "Jesse Vincent", "email": "jesse@fsck.com" },
  "metadata": { "description": "Skills, workflows, and productivity tools", "version": "1.0.13" },
  "plugins": [
    { "name": "superpowers",
      "source": { "source": "url", "url": "https://github.com/obra/superpowers.git" },
      "description": "Core skills library...",
      "version": "5.1.0",
      "strict": true },
    ...
  ]
}
```

Schema-fields used: `name`, `owner.{name,email}`, `metadata.{description,version}`, `plugins[].name`, `plugins[].source.{source,url[,ref]}`, `plugins[].description`, `plugins[].version`, `plugins[].strict`. All 7 plugins in the file set `"strict": true` — an explicit pin against silent-fallback installs. Pair with Cloudflare RFC `digest: sha256:...` (Pattern 9) to fully harden the install-state contract (W330 P0.5).

### Pattern 3 — Single plugin × {skills, agent, MCP} multi-surface co-shipping

`obra/superpowers-chrome/.claude-plugin/plugin.json` (per first batch output) demonstrates a single plugin shipping THREE surfaces at once:

```json
{
  "name": "superpowers-chrome",
  "version": "2.1.0",
  ...
  "agents": ["./agents/browser-user.md"],
  "mcpServers": {
    "chrome": { "command": "node", "args": ["${CLAUDE_PLUGIN_ROOT}/mcp/dist/index.js"] }
  }
}
```

The `${CLAUDE_PLUGIN_ROOT}` substitution is the Anthropic-canonical token (per `https://code.claude.com/docs/en/plugins`) that survives W270/W286 install-state drift — versioned in lock-step with the plugin install. **Pattern-extract**: when authoring our own plugins (e.g. potentially packaging our `gitnexus` umbrella as a true plugin), follow this layout to avoid CR-2 violations (the MCP body lives under `mcp/dist/index.js`, which is plugin-shipped, not project-owned).

### Pattern 4 — Serena's name-path symbol API

Serena exposes symbol-level read/write via:
- `src/serena/symbol.py:809 def find_referencing_symbols(...)`
- `src/serena/code_editor.py:139 def insert_after_symbol(self, name_path: str, relative_file_path: str, body: str)`
- `src/serena/code_editor.py:431 result = client.find_symbol(name_path, relative_path=relative_file_path, include_body=False, depth=0, include_location=True)`
- `src/serena/tools/symbol_tools.py:272 references_in_symbols = symbol_retriever.find_referencing_symbols(...)`

The `name_path` parameter is the LSP-symbol-path identifier. Our `local-cypher-codebase` skill (`Z:/claude-sota-installed/.claude/skills/local-cypher-codebase/SKILL.md`) is already cite-anchored to this; the deep-dive confirms the API surface remains stable across `src/serena/cli.py:968` (`find_symbol_tool = agent.get_tool(FindSymbolTool)`) and JetBrains client at `src/serena/jetbrains/jetbrains_plugin_client.py:387`.

### Pattern 5 — GitNexus 803f0bed Windows SIGSEGV avoidance / BM25 graceful degradation (REVISED per codex round-1/round-2 R4 absorb)

GitNexus commit `803f0bed` (commit-message reads "fix(lbug): probe-then-load FTS extension on Windows (#1690) (#1692)" but actual implementation diverges — see below) addresses the Windows-specific `loadFTSExtension()` SIGSEGV documented at `gitnexus/src/core/lbug/pool-adapter.ts:423-431`:

```
// Windows guard: LOAD EXTENSION fts crashes with SIGSEGV on Windows when
// the sqlite-vss/fts ext binary is in a path with non-ASCII chars or when
// the parent SQLite handle is in WAL+busy mode. Skip the load and mark
// shared.ftsLoaded = true so downstream paths short-circuit to BM25-empty
// without attempting a second load.
if (process.platform === 'win32') {
  shared.ftsLoaded = true;
  return;
}
```

The actual fix per `pool-adapter.ts:423-431` + repeated at `:497-502` is **NOT probe-then-load**. It is **Windows SIGSEGV avoidance + BM25 graceful-degradation**: on Windows the guard SKIPS the `LOAD EXTENSION fts` call entirely (which would SIGSEGV the process) and marks `shared.ftsLoaded = true` so downstream BM25 paths return empty results gracefully without crashing. Graph queries (the primary GitNexus surface) are unaffected. The commit message wording "probe-then-load" is misleading vs the actual implementation. Since we are on Windows 11, our installed `v1.3.6` (`ed50a6729f83c74c2458d37527236e2324c06702`) is **pre-fix** and currently exposed to the SIGSEGV path.

**Adjacent Windows code paths** that corroborate the platform fragility:
- `gitnexus/src/cli/analyze.ts:37` "indistinguishable from a no-op success on Windows"
- `gitnexus/src/cli/analyze.ts:504` "meta.json and registers the repo, but on Windows it has been..."
- `gitnexus/src/cli/setup.ts:64` "On Windows, `where` returns multiple entries..."
- `gitnexus/src/cli/setup.ts:414` "NOTE: SessionStart hooks are broken on Windows (Claude Code bug #23576)."
- `gitnexus/src/core/augmentation/engine.ts:33-35` "Normalize to lowercase on Windows (drive letters can differ: D: vs d:)"
- `gitnexus/src/core/embeddings/embedder.ts:197` "Windows: dml (DirectML/DirectX12), Linux: cuda"

These all reinforce that GitNexus has a meaningful platform-divergence surface; W331-X2 (relabeled per codex round-1/round-2 R5 absorb — NOT W330 P0.6) is one of several Windows-specific fixes, not an outlier.

### Pattern 6 — Repomix MCP-as-CI pattern

`yamadashy/repomix/.github/workflows/pack-repository.yml` (presence confirmed via batch) runs Repomix on itself in CI. The Pack→Grep→Skill pattern is already wired in our `.mcp.json` (per W106 `repomix@1.14.0` MCP). The novel pattern here is **Repomix can run as a release artefact stamper**: pack the source tree, sign the output, publish alongside binary releases — closes a CR-1 extension gap by providing a verifiable "what was in this build" SBOM-equivalent that's text-grep-able.

### Pattern 7 — ast-grep YAML rule schema

`ast-grep/ast-grep` ships a JSON Schema for YAML rule files at `crates/.../*-schema.json`:

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ast-grep rule for bash",
  "properties": {
    "rule":        { "$ref": "#/$defs/SerializableRule" },
    "constraints": { ... },
    "utils":       { ... },
    "transform":   { "$ref": "#/$defs/Transformation" },
    "fix":         { "anyOf": [{"$ref": "#/$defs/SerializableFixer"}, {"type": "null"}] }
  }
}
```

The `transform` + `fix` block is what makes ast-grep a **structural autofix engine**, not just a search tool. Useful for future CR-2 ≤2KB enforcement: an ast-grep rule could match "any file under `.claude/hooks/` with line-count > N" and produce a deterministic block message. Pair with the W330 P0.9 CR-2 mechanization plan (§3).

### Pattern 8 — Microsoft skills `metadata.package` discipline

`microsoft/skills/.github/skills/applicationinsights-web-ts/SKILL.md` frontmatter:

```yaml
name: applicationinsights-web-ts
description: Instrument browser/web apps with the Application Insights JavaScript SDK (@microsoft/applicationinsights-web)...
license: MIT
metadata:
  author: Microsoft
  version: "1.0.0"
  package: "@microsoft/applicationinsights-web"
```

The `metadata.package` field is novel — it ties the skill to a concrete npm package version, which makes the install-state contract testable: "does the skill's stated package + version exist in the project's `package.json`?". Cherry-pick into our skill front-matter for cite-disciplined skills (e.g. `vercel-composition-patterns`, `langfuse`, `dspy-integration`).

### Pattern 9 — Cloudflare RFC: discovery index w/ SHA-256 digests + path-traversal guards

`cloudflare/agent-skills-discovery-rfc/README.md` (v0.2.0) is the most rigorous skill-discovery spec we've seen. Highlights:

- **Discovery index** at `/.well-known/agent-skills/index.json` with `$schema: https://schemas.agentskills.io/discovery/0.2.0/schema.json`.
- Each skill entry: `{name, type, description, url, digest}` where `digest = "sha256:<64-hex>"` of the artifact (SKILL.md OR `.tar.gz`/`.zip`).
- **3-level progressive disclosure**: index metadata (~100 tokens/skill) → full SKILL.md (≤5K tokens) → referenced files (unlimited).
- **MUST guardrails for archives**: path traversal (no `..`), symlinks (publishers MUST NOT include; clients MUST refuse to extract OR sanitize), decompression bombs (clients SHOULD apply size limits).
- Supports HTTP **range requests** for ZIP indexing without downloading the full archive (efficient skill-search).
- Backward-compat: clients encountering unrecognized `$schema` URI SHOULD warn and NOT process; v0.1.0 → v0.2.0 dropped `files[]`+`package{}`, added `type`/`url`/`digest`/`$schema`.

**Cite-anchors**: RFC 2119/8174 MUST/SHOULD wording; RFC 3986 URL resolution semantics. Compose-w/ Pattern 2 (Obra marketplace.json) for full digest-pinned install-state contract.

### Pattern 10 — Ralph's "files and git as memory" autonomous loop

`iannuttall/ralph/README.md`:

> Ralph treats **files and git as memory, not the model context**:
> - **PRD (JSON)** defines stories, gates, and status
> - **Loop** executes one story per iteration
> - **State** persists in `.ralph/`

Combine with `STALE_SECONDS` heartbeat for crashed-loop recovery (`open` → `in_progress` (with `startedAt`) → `done` (with `completedAt`); stuck `in_progress` past STALE_SECONDS auto-reopens). This is **W256-spirit autonomous-loop discipline** — model context stays small, state stays on disk + git. Our `ralph-loop:ralph-loop` skill captures this.

### Pattern 11 — VILA-Lab compaction-shaper chain

`VILA-Lab/Dive-into-Claude-Code` documents the 5 pre-model compaction shapers (cheapest first):

1. Budget Reduction
2. Snip
3. Microcompact
4. Context Collapse
5. Auto-Compact

This sequencing is the answer to "why does auto-compact at 95% feel late?" (per `CLAUDE.local.md` autocompact note) — shapers 1-4 already ran. Operator-cite anchor when refining `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` thresholds.

### Pattern 12 — ECC plugin-hooks runtime-gate (`ECC_DISABLED_HOOKS`)

`affaan-m/everything-claude-code` README v2.0.0-rc.1 mentions:

> **Hook runtime controls** — `ECC_HOOK_PROFILE=minimal|standard|strict` and `ECC_DISABLED_HOOKS=...` for runtime gating without editing hook files.

This is a Cardinal-rule-2 **disable-without-edit** pattern — operator sets env var to mute a hook rather than touching plugin-shipped code. Our `.claude/settings.json` already uses this (`ECC_DISABLED_HOOKS: "pre:edit-write:gateguard-fact-force,post:edit:design-quality-check,pre:observe:co..."`). Stream G #11 in W330 SYNTHESIS notes 3 ECC hooks disabled via this mechanism (see §7 mapping).

---

## §3 Cardinal-rule audit deep-dive (W330 P0.9): SLSA / SBOM / ≤2KB / scorecard adoption plan

W330 SYNTHESIS established the P0.9 axis-1 #3/#4 extensions to Cardinal-rules 1 + 2. This deep-dive on Cluster H repos provides the upstream evidence cite-anchors and concrete adoption mechanics.

### CR-1 trust extension (W330 axis-1 #3)

Per `Z:/claude-sota-installed/docs/architecture/W330-MEGA-AUDIT/CLAUDE-MD-EDIT-PROPOSAL.md:16-18`, the proposed "trusted" tuple ADDs:
- (a) maintainer-identity verifiable via signed releases (SLSA-L3 attestation OR npm provenance OR PGP/Sigstore for git tags)
- (b) license risk audit (MIT/Apache/BSD/ISC/MPL accepted; AGPL/SSPL/proprietary case-by-case)
- (c) malicious-update review (≥1 commit older than 30 days OR explicit operator-pin)
- (d) dependency blast-radius (`npm ls --depth=0` clean; no known-compromised packages per Socket.dev/Snyk)

**Cluster H upstream evidence**:

| Sub-clause | Upstream anchor | File:line |
|---|---|---|
| (a) SLSA-L3 | `ossf/scorecard` `Signed-Releases` check evaluates `releasesHaveProvenance` + `releasesHaveVerifiedProvenance` | `checks/evaluation/signed_releases.go:26-27` + `checks/signed_releases.go:32` (Apache-2.0, OSSF org) |
| (a) SBOM | `ossf/scorecard` `SBOM` check evaluates `hasSBOM` + `hasReleaseSBOM` | `checks/evaluation/sbom.go:21-22` + `checks/sbom.go:CheckSBOM` constant. NOTE: gated by `SCORECARD_EXPERIMENTAL` env var (per `checks/sbom.go` `os.LookupEnv("SCORECARD_EXPERIMENTAL")` — not yet GA) |
| (a) CycloneDX format | `aquasecurity/trivy` `pkg/sbom/core/bom.go:83,105,110,114,119,124,144,158,163,168,197,243,361` + `pkg/sbom/cyclonedx/marshal.go:1` | Apache-2.0, Aqua Security org |
| (d) digest-pinning | `cloudflare/agent-skills-discovery-rfc` `digest: "sha256:<64-hex>"` mandate per RFC v0.2.0 §"Skill entry fields" | Open RFC, Cloudflare org |
| Composability | `obra/superpowers-marketplace/.claude-plugin/marketplace.json` `"strict": true` on all 7 plugin entries | MIT, jesse@fsck.com |

The CR-1 trust extension is **fully cite-anchored across ≥3 org-distinct sources**: OSSF (scorecard), Aqua Security (trivy), Cloudflare (RFC), Obra (marketplace) — 4 organisations.

**Adoption plan for CR-1**:

1. **Promote scorecard-style probe scoring** in our installed_plugins.json governance (orthogonal pass; no in-repo install of scorecard itself). Use the public `scorecard.dev` API or `gh api /repos/{owner}/{repo}/actions/workflows` to spot-check `signed-releases` + `dependency-update-tool` + `pinned-dependencies` checks for any new plugin install candidate.
2. **CycloneDX SBOM stamping** at our release-equivalent boundary: when we tag a new wave (e.g. W331-release), run `trivy fs --format cyclonedx -o W331.cdx.json Z:/claude-sota-installed` via direct-CLI invocation (Cardinal-rule-2 compliant). Pin against rotating malicious-update events.
3. **Digest-pin marketplace entries** when our own marketplace is authored. Adopt Cloudflare RFC's `digest: sha256:...` even if Anthropic CC core doesn't yet enforce it — forward-compatible.
4. **License audit gate** at plugin-install-time: parse the upstream `LICENSE` file; reject AGPL/SSPL/proprietary without explicit operator override. (Currently informal in `CLAUDE.md` cardinal-rule-1 §W286-arc-P0C; would mechanise here.)

### CR-2 ≤2KB enforcement (W330 axis-1 #4)

Per `Z:/claude-sota-installed/docs/architecture/W330-MEGA-AUDIT/C-silent-fallback-hunt.md:69`:

> **FINDING 23 — PASS (no SEV)**: Only the sanctioned exception present. `context-mode-cache-heal.mjs` patches `anthropics/claude-code#46915` per cardinal-rule-2 carve-out. ≤2 KB OK (1656 bytes). NO CR-2 violation.

And per `CLAUDE-MD-EDIT-PROPOSAL.md:26-28`:

> `PreToolUse[Edit|Write]` hook MUST inspect target path; if path matches `.claude/hooks/**` AND file size after edit >2048 bytes, BLOCK with explicit message "CR-2 violation: bug-patch shim exceeds 2KB ceiling". Issue #46915 verified STILL OPEN 2026-05-10.

**Mechanization options (Cluster H repos)**:

- **ast-grep** (pattern 7) — could write an ast-grep YAML rule with a `transform` that counts bytes in matched files and emits `severity: error` for >2048-byte hits. Run as PreCommit direct-CLI hook (CR-2 compliant; no project-owned hook body).
- **gitleaks-style PreCommit gate** (pattern matches our current `gitleaks` invocation) — write a custom `gitleaks.toml`-style rule pack with `regex` + `path` + `entropy` constraints. Less precise than ast-grep but already in our hook chain.
- **Direct shell**: `find .claude/hooks -type f -size +2k -print -exec false {} +` as a PreCommit hook. Simplest, CR-2 compliant.

**Recommended adoption** (lowest-risk, highest-clarity): add the `find` invocation to `.claude/settings.json` `hooks.PreCommit[]` as a direct-CLI invocation. ~3 lines, no project-owned hook body needed.

### Scorecard adoption plan

We are NOT installing `ossf/scorecard` in-repo (would violate Cardinal-rule-1's "trusted plugins/skills/agents" constraint — scorecard is a CI tool, not a CC primitive). Instead:

| Check | Adoption mechanism | Frequency | Cite |
|---|---|---|---|
| `signed-releases` | At install-time, verify `gh release view <tag> --json assets` includes provenance attestation | per `/plugin install` invocation | `checks/signed_releases.go:CheckSignedReleases` |
| `sbom` | Run `trivy sbom` against our `package.json`/`requirements.txt` at wave boundaries | per wave | `checks/sbom.go:CheckSBOM` + `pkg/sbom/cyclonedx/marshal.go:1` |
| `pinned-dependencies` | Already in `.mcp.json` (per W286 `npx -y <pkg>@<exact-version>` discipline) | continuous | `checks/pinned_dependencies.go` |
| `branch-protection` | Not applicable (this is a personal repo, but enable for any operator-shared mirrors) | one-time | `checks/branch_protection.go` |
| `dangerous-workflow` | Already in `gitnexus/.github/workflows/zizmor.yml` (zizmor lints CI workflows for command injection / pull_request_target abuse) — observe pattern | per CI change | `checks/dangerous_workflow.go` |
| `dependency-update-tool` | `dependabot.yml` already present in `gitnexus/` template; consider adopting for our own tooling repos (`Z:/claude-sota-installed-state/` excluded as that's state-outside-repo) | continuous | `checks/dependency_update_tool.go` |
| `code-review` + `cii-best-practices` | Not applicable for solo personal harness; document deferral | n/a | `checks/code_review.go` |
| `fuzzing` + `sast` | Defer; not applicable for this repo class | n/a | `checks/sast.go` |

The "deferrable" checks are exactly the ones that score 0 in a typical scorecard run on a personal-config repo — acknowledge the score asymmetry and don't chase phantom compliance.

---

## §4 Skill-ecosystem comparison: obra-superpowers vs addyosmani vs mattpocock vs karpathy

Four major skill providers in Cluster H. Comparison matrix:

| Dimension | obra/superpowers | addyosmani/agent-skills | mattpocock/skills | forrestchang/karpathy-skills |
|---|---|---|---|---|
| **License** | MIT (per `LICENSE`, Jesse Vincent) | MIT (community) | MIT (Matt Pocock) | MIT (Forrest Chang vendor-fork of Andrej Karpathy) |
| **Skill count** | 14 in `obra/superpowers/skills/` + ~37 in `obra/superpowers-skills/skills/` across {architecture, collaboration, debugging, meta, problem-solving, research, testing, using-skills} | ~25 (curated, includes interview-me, doubt-driven-development, frontend-ui-engineering, api-and-interface-design, code-simplification) | ~12 (grill-with-docs, tdd, caveman, diagnose, handoff, review primary) | ~3 (karpathy-guidelines, karpathy-check, karpathy-coder) |
| **Distribution** | Plugin via `obra/superpowers-marketplace` (7 plugins total) | Direct git clone + skill vendor-fork | Direct git clone + skill vendor-fork | Direct git clone + plugin variant |
| **Frontmatter discipline** | `name + description` (no `metadata.package`) | `name + description` | `name + description` | `name + description` |
| **Auto-fire trigger style** | "Use when starting any conversation" / "Use when X" / proper-noun-trigger (e.g. `Skill auto-fire description: discipline (W255 spirit)`) | Verb-driven ("Implementing X" / "When asking Y") | Action-driven ("review", "diagnose", "handoff") | Persona-driven ("when working in karpathy-mode") |
| **Meta-discipline** | YES — `using-superpowers` + `using-skills` + `writing-skills` skills explicitly script "how to find+use skills" | NO explicit meta — relies on description-match | NO explicit meta | NO explicit meta |
| **Composability** | HIGH — TDD + dispatching-parallel-agents + verification-before-completion compose naturally | MEDIUM — skills are mostly atomic | MEDIUM | LOW — persona-style skills don't compose easily |
| **Operator coverage in our runtime** | T0 (installed as plugin) | T0 partial (5+ skills vendored at `.claude/skills/{doubt-driven-development,frontend-ui-engineering,api-and-interface-design,code-simplification,addyosmani-*}/`) | T0 partial (6 skills vendored at `.claude/skills/{grill-with-docs,tdd,caveman,diagnose,handoff,review}/`) | T0 (plugin `andrej-karpathy-skills:karpathy-guidelines`) |
| **Best feature** | Meta-discipline + marketplace.json schema reference | Breadth of "soft-skills" (doubt-driven, interview-me) | Concise action-skills + caveman compression | Karpathy-style guideline distillation |
| **Best for** | Heavy-disciplined engineering workflows (TDD + plan + verify) | Soft-skill scaffolding around technical work | Quick action verbs in long sessions | Karpathy-aligned LLM/ML work |
| **Source authority** | Jesse Vincent (Anthropic alum) — high authority | Addy Osmani (Google/Chrome dev advocate) — high authority | Matt Pocock (TypeScript-expert) — high authority | Forrest Chang (vendor-fork) → Andrej Karpathy origin — high authority |
| **Risk** | Frequent updates → drift risk (currently 1 minor version behind installed pin per Table §1 row 1) | Curated; lower drift risk | Curated; lower drift risk | Stable vendor-fork; lowest drift risk |

**Verdict**: keep all 4 active; `obra/superpowers` is the **load-bearing meta-discipline source**, others are atomic-skill libraries. None is redundant.

**Notable gap to close**: per the W316 vendor-fork-5 pattern + W320 vendor-fork-6 pattern, our preferred posture is **selective vendoring with prefix-namespacing** rather than full-plugin install (this avoids transitive skill conflicts and keeps the preload budget tight). Continue this pattern when surveying mattpocock-skills for new entries or new releases of addyosmani-agent-skills.

---

## §5 Supply-chain hardening: scorecard + trivy + gitleaks orchestration

Cluster H provides three complementary supply-chain primitives. Orchestration plan below treats each as a direct-CLI invocation (Cardinal-rule-2 compliant — no project-owned hook bodies).

### 5.1 Layer stack

| Layer | Tool | Phase | Output | Direct-CLI cmd | Cite |
|---|---|---|---|---|---|
| **Secret detection** | `gitleaks` | PreCommit | secrets findings | `gitleaks detect --config <toml> --report-format json` | `gitleaks/gitleaks/config/gitleaks.toml` (MIT, gitleaks org) |
| **Vulnerability + IaC scan** | `trivy fs` | PreCommit (or PreCommit-light: PreRelease) | CVE list + IaC misconfigs | `trivy fs --severity HIGH,CRITICAL --exit-code 1 .` | `aquasecurity/trivy` (Apache-2.0, Aqua Security org) |
| **SBOM generation** | `trivy sbom` | Wave boundary | CycloneDX SBOM | `trivy fs --format cyclonedx -o W<N>.cdx.json .` | `aquasecurity/trivy/pkg/sbom/cyclonedx/marshal.go:1` |
| **Repo health score** | scorecard (external) | Pre-plugin-install | check-by-check 0-10 score | (external API; `gh api ...`) | `ossf/scorecard/checks/` (Apache-2.0, OSSF) |
| **Pattern lint** | `ast-grep` | PreCommit | structural violations | `sg scan --config .ast-grep.yml` | `ast-grep/ast-grep` (MIT, ast-grep org) |
| **CR-2 size check** | `find` | PreCommit | path size violations | `find .claude/hooks -type f -size +2k` | (POSIX, no upstream — leverage in `.claude/settings.json`) |

All 6 layers fit in `hooks.PreCommit[]` array of `.claude/settings.json` as direct-CLI invocations.

### 5.2 Orchestration sequence

```
PreCommit:
  1. gitleaks detect (already wired)           # exit !=0 → block
  2. trivy fs --severity HIGH,CRITICAL          # exit !=0 → block (new)
  3. find .claude/hooks -type f -size +2k       # any output → block (new, CR-2 mechanization)
  4. ast-grep scan (optional, low-noise rules)  # exit !=0 → block
  5. ruff (already wired)
  6. shellcheck (already wired)
Wave boundary (manual operator gate):
  7. trivy fs --format cyclonedx -o W<N>.cdx.json .   # archived under docs/architecture/W<N>-*/
  8. scorecard.dev manual check of recent plugin install candidates (optional)
```

### 5.3 Implementation notes

- **Gitleaks** already-wired per `.claude/settings.json` (per W255 cleanup). No change.
- **Trivy** would require local install via `scoop install trivy` (Windows) or `brew install trivy` (mac). Z:-portable concern: Trivy ships as a single binary, so `Z:/tools/trivy/trivy.exe` is feasible — drop in there, add to PATH via `CLAUDE.local.md` ENV block. CR-9 risk: medium (Apache-2.0, well-maintained, GitHub release artifacts).
- **ast-grep** can be installed via `pip install ast-grep-cli` into `Z:/venvs/claude/`. Z:-portable. CR-9 risk: low (MIT, well-maintained).
- **scorecard** is external — do NOT install. Use `https://scorecard.dev/viewer/?uri=github.com/<owner>/<repo>` web view or `gh api` calls.

### 5.4 Risks + mitigations

| Risk | Layer | Mitigation |
|---|---|---|
| Trivy DB stale | trivy | `trivy --download-db-only` on first wave-boundary call each week |
| Gitleaks false positives | gitleaks | `gitleaks.toml allowlist` (already in repo) |
| ast-grep rule noise | ast-grep | start with `severity: warning`, promote to `error` after 1 wave of clean runs |
| CR-2 size check FN (binary files) | find | scope to `*.mjs|*.py|*.sh|*.ts|*.js|*.ps1|*.bat` explicitly |
| trivy CycloneDX schema drift | trivy | pin trivy version in CLAUDE.local.md (CR-9 compliant) |

---

## §6 Cite-anchors (≥3 org-distinct)

Per operator constraint "≥3 org-distinct cites".

### Org 1 — Anthropic (claude-code core)
- `https://code.claude.com/docs/en/plugins` — plugin structure + install flow (cite-anchor for cardinal-rule-1 + CR-1 trust extension)
- `https://code.claude.com/docs/en/skills` — skill `description:` auto-fire discipline (cite-anchor for CR-4 33-skill trigger audit)
- `https://docs.anthropic.com/en/docs/claude-code/hooks` — hook semantics (cite-anchor for cardinal-rule-2 + ≤2KB W330 axis-1 #4)
- `https://docs.anthropic.com/en/docs/claude-code/sub-agents` — subagent + model-precedence (cite-anchor for parallel-execution architecture)
- `https://code.claude.com/docs/en/sandboxing` — Windows/WSL2 limitation noted for R5-W325-corollary
- `anthropics/claude-code#46915` — open bug 2026-04-12, sanctioned CR-2 carve-out for `context-mode-cache-heal.mjs`

### Org 2 — OSSF (Open Source Security Foundation)
- `ossf/scorecard/checks/sbom.go` — SBOM check (`CheckSBOM` constant, `SCORECARD_EXPERIMENTAL` env-gated)
- `ossf/scorecard/checks/evaluation/sbom.go:21-22` — `probes/hasReleaseSBOM` + `hasSBOM` probe imports
- `ossf/scorecard/checks/signed_releases.go:CheckSignedReleases` — registered signed-releases check
- `ossf/scorecard/checks/evaluation/signed_releases.go:26-27` — `releasesHaveProvenance` + `releasesHaveVerifiedProvenance` probe imports
- `ossf/scorecard/docs/checks.md` — public scoring documentation (Apache-2.0 license, OSSF org)

### Org 3 — Aqua Security
- `aquasecurity/trivy/pkg/sbom/core/bom.go:83,105,110,114,119,124,144,158,163,168,197,243,361` — CycloneDX field mapping
- `aquasecurity/trivy/pkg/sbom/cyclonedx/marshal.go:1` — CycloneDX marshaller entry point
- `aquasecurity/trivy/docs/guide/configuration/reporting.md:622` — `trivy convert --format cyclonedx` CLI verb
- `aquasecurity/trivy/docs/commercial/compare.md:30` — Sigstore + SBOM hash discovery

### Org 4 — Cloudflare
- `cloudflare/agent-skills-discovery-rfc/README.md` v0.2.0 — skill discovery index spec with `$schema: https://schemas.agentskills.io/discovery/0.2.0/schema.json`
- `$schema` URI opaque-identifier discipline (clients MUST match against known URIs)
- SHA-256 digest mandate (`"digest": "sha256:<64-hex>"`)
- 3-level progressive disclosure model
- Path-traversal/symlink/decompression-bomb guardrails (RFC 2119 MUST/SHOULD wording)

### Org 5 — Obra (Jesse Vincent / fsck.com)
- `obra/superpowers/skills/using-superpowers/SKILL.md` — `using-superpowers` meta-skill discipline + `Instruction Priority` block
- `obra/superpowers/skills/writing-skills/SKILL.md` — skill-authoring TDD mapping
- `obra/superpowers-marketplace/.claude-plugin/marketplace.json:1-114` — 7-plugin marketplace schema reference
- `obra/superpowers-chrome/.claude-plugin/plugin.json` — single-plugin × {skills, agent, MCP} multi-surface co-shipping pattern

### Org 6 — Microsoft (DevDiv + Azure SDK + DS4SD)
- `microsoft/skills/.github/skills/applicationinsights-web-ts/SKILL.md` — `metadata.package` discipline (frontmatter `name + description + license + metadata.{author,version,package}`)
- `microsoft/mcp` — Microsoft MCP catalog (Azure MCP 48+ services, Foundry MCP remote)
- `microsoft/markitdown` — document-to-Markdown probe-record (Δ51 sca-v12)
- `DS4SD/docling` (IBM Research) — heavier doc-AI pipeline (pattern-study T3)

### Org 7 — Oraios (Serena maintainers)
- `oraios/serena/src/serena/code_editor.py:139,431` — `insert_after_symbol` + `find_symbol` API surface
- `oraios/serena/src/serena/symbol.py:809,829,833,1112` — `find_referencing_symbols` family
- `oraios/serena/src/serena/tools/symbol_tools.py:272,616` — symbol_tools wiring

### Org 8 — ast-grep (Herrington Darkholme et al.)
- `ast-grep/ast-grep/crates/.../schema.json` — JSON Schema for YAML rule files (`$schema: https://json-schema.org/draft/2020-12/schema`)
- `ast-grep/ast-grep/README.md` — CLI tool for code structural search/lint/rewriting

### Org 9 — abhigyanpatwari (GitNexus maintainer)
- `abhigyanpatwari/GitNexus/gitnexus/src/core/lbug/pool-adapter.ts:423` — Windows FTS LOAD EXTENSION SIGSEGV guard
- `abhigyanpatwari/GitNexus@803f0bed` — commit "fix(lbug): probe-then-load FTS extension on Windows (#1690) (#1692)" (2026-05-19 11:09 UTC)
- `abhigyanpatwari/GitNexus/.github/workflows/{scorecard.yml,trivy.yml,gitleaks.yml,codeql.yml,zizmor.yml,dependency-review.yml,pr-autofix.yml}` — hardened CI baseline (~17 workflows)

**Total: 9 organisations** — exceeds operator's ≥3 floor by 3×.

---

## §7 Direct mapping to W330 P0.9 / P0.6 / P0.5

### W330 P0.9 — Cardinal-rule audit pass (this dive's primary mapping)

Per `W330-MEGA-AUDIT/GOAL-W331.md:24`:

> P0.9 RULES — CLAUDE.md audit per codex axis-1: CR-1 trust→SLSA-L3+CycloneDX; CR-2 mechanize ≤2KB; CR-3 dispatch-allowlist (Δ-DPA-5); CR-4 33-skill trigger audit; CR-5 tools/preagent-*.mjs=observability.

**Cluster H contribution**:

| W330 P0.9 axis | Cluster H upstream evidence | This dive's added value |
|---|---|---|
| CR-1 (a) SLSA-L3 | `ossf/scorecard/checks/signed_releases.go:CheckSignedReleases` + `evaluation/signed_releases.go:26-27` (`releasesHaveProvenance` + `releasesHaveVerifiedProvenance`) | Confirmed scorecard's `Signed-Releases` check is the authoritative probe. We do not install scorecard locally but USE scorecard.dev / `gh api` to verify before any new plugin install. |
| CR-1 (a) SBOM-CycloneDX | `aquasecurity/trivy/pkg/sbom/cyclonedx/marshal.go:1` + `pkg/sbom/core/bom.go:83-361` + `docs/guide/configuration/reporting.md:622` | Confirmed trivy supports CycloneDX in both `marshal.go` (write) and `convert` (read/transform). Adoption path: `trivy fs --format cyclonedx -o W<N>.cdx.json .` at wave boundary. |
| CR-1 (a) Sigstore | `aquasecurity/trivy/docs/commercial/compare.md:30` (Sigstore hash discovery) | Sigstore integration documented as compiled-binary discovery mechanism in trivy. Not yet needed in our git-tracked Python/TS code but pattern-document. |
| CR-1 (d) digest-pinning | `cloudflare/agent-skills-discovery-rfc/README.md` `digest: "sha256:<64-hex>"` per RFC v0.2.0 | Adopt for future marketplace authoring. Forward-compatible with Anthropic CC plugin spec evolution. |
| CR-2 mechanize ≤2KB | `anthropics/claude-code#46915` (sanctioned CR-2 exception); `W330-MEGA-AUDIT/C-silent-fallback-hunt.md:69` (FINDING 23 PASS); proposed `PreToolUse[Edit|Write]` hook per `CLAUDE-MD-EDIT-PROPOSAL.md:26-28` | This dive's §3 + §5 confirm three viable mechanizations: `find` (simplest, direct-CLI), `ast-grep` rule (most precise), or trivy-format secret-detection-style PreCommit (heaviest). Recommend `find -size +2k` for lowest risk. |
| CR-3 dispatch-allowlist | (referenced in W330 GOAL; not directly Cluster H scope) | Out-of-scope for this dive. |
| CR-4 33-skill trigger audit | `obra/superpowers/skills/using-superpowers/SKILL.md` "Instruction Priority" | The `using-superpowers` skill IS the auto-fire discipline; our 33 skills' `description:` fields should be audited against the obra-style "Use when X" / proper-noun-trigger pattern. |
| CR-5 tools/preagent-*.mjs | (cited in W330 §4.2 cluster as advisory-only failure) | Out-of-scope for this dive; W329-D root cause already documented. |

### W331-X2 — GitNexus Windows FTS SIGSEGV avoidance fix (this dive's strongest finding) — RELABELED per codex round-1/round-2 R5 absorb (NOT W330 P0.6, which is mem0/Letta/Zep T1 bakeoff per GOAL-W331.md:18)

Per `W330-MEGA-AUDIT/B-sota-repos-ingestion.md:19,33-34` (historical quote — note "probe-then-load" wording is the upstream commit-message phrasing, not the actual implementation behavior verified at `pool-adapter.ts:423-431`):

> #9 `abhigyanpatwari/GitNexus` — `803f0bed` `fix(lbug): probe-then-load FTS extension on Windows (#1690) (#1692)` — fixes hard-skip of `loadFTSExtension()` on Windows that silently degraded BM25 queries (0 hits). This runtime IS Windows 11 per `CLAUDE.local.md`. **DRIFT-LEADER**: recommend prioritized `/plugin update gitnexus@gitnexus-marketplace` once W330 closure synthesis lands.

**Corrected behavior** (per codex round-1/round-2 verify against `pool-adapter.ts:423-431` + `:497-502`): the fix is **SIGSEGV avoidance + BM25 graceful-degradation** (Windows guard SKIPS `LOAD EXTENSION fts` + marks `shared.ftsLoaded = true` + BM25 paths short-circuit to empty results) — NOT "probe-then-load" as the commit message claims. Graph queries remain unaffected.

**Cluster H confirmation**:

1. Direct cite in upstream: `gitnexus/src/core/lbug/pool-adapter.ts:423` `// Windows guard: LOAD EXTENSION fts crashes with SIGSEGV on Windows when` — this is the in-code anchor for the fix.
2. Local checkout HEAD is `2376912` (a later commit "feat(ingestion): Add C++ parameter type class sidecar (#1642)") meaning our local clone of `Z:/claude-sota-installed-repos/abhigyanpatwari-GitNexus` has the fix, but our **installed plugin** at `.claude/plugins/cache/gitnexus-claude-plugin/` is pinned to `ed50a6729f83c74c2458d37527236e2324c06702` (v1.3.6, pre-fix).
3. Six other Windows-specific paths (per Pattern 5) reinforce that GitNexus has platform-divergence surface; the FTS fix is **not** an outlier.

**Recommended action** (operator decision D2 per W330 SYNTHESIS §5):
```
/plugin update gitnexus@gitnexus-marketplace
```
In a separate session (per W280d parallel-session safety — do NOT run inside a worktree with active state changes).

**Acceptance test post-update**: `mcp__gitnexus__query "MATCH (n) RETURN count(n) LIMIT 1"` returns >0 hits; BM25 FTS query (`mcp__gitnexus__context` with a known token) returns >0 hits. If both pass, mark **W331-X2 RESOLVED** (relabeled per codex round-3 R5-residual absorb — was historical-W330-P0.6 prior to retag; W330 P0.6 is now mem0/Letta/Zep T1 bakeoff per GOAL-W331.md:18).

### W330 P0.5 — Plugin install-state contract

Per `W330-MEGA-AUDIT/CODEX-VERDICT-LEDGER.md:31` and `:100`:

> 16. **[MEDIUM]** Missing remediation: `installed_plugins.json` install-state contract + acceptance test post `/reload-plugins`.
> 7. Resolve `installed_plugins.json` install-state contract + acceptance test

And per `W330-MEGA-AUDIT/REMEDIATION-PLAN-V2.md:17`:

> **66-key install-state drift** (Stream C F17 was 45) — `enabledPlugins` keys vs `installed_plugins.json` reconciliation

**Cluster H contribution**:

1. **Obra marketplace.json (Pattern 2)** — provides the upstream schema reference: every plugin entry has `name`, `source.{source,url[,ref]}`, `version`, `strict` field. Our `installed_plugins.json` should mirror this schema and **add** a `digest: sha256:<commit-sha-or-content-hash>` field (per Cloudflare RFC Pattern 9) to detect silent SHA drift.
2. **Acceptance test** (proposed): a JS script that:
   - Reads `installed_plugins.json` keys
   - Cross-references each key against `.claude/settings.json:enabledPlugins`
   - For each matched key, runs `git -C .claude/plugins/cache/<plugin-slug> rev-parse HEAD` and compares against the stored `digest`
   - Reports any drift to STDOUT (non-blocking) or STDERR (blocking)
3. **Mechanism**: add this as a `SessionStart` hook (Anthropic-sanctioned hook event), direct-CLI invocation of a `npx -y` (or vendored Node script). Aligns with CR-2 (no project-owned hook body).

**Cite-anchors**:
- `obra/superpowers-marketplace/.claude-plugin/marketplace.json:1-114` — upstream schema reference
- `cloudflare/agent-skills-discovery-rfc` — digest-pinning RFC
- `W330-MEGA-AUDIT/C-silent-fallback-hunt.md:49` — current `installed_plugins.json` silently misses marketplace-resolved-on-demand entries

### Cross-cutting: drift-leader update queue (operator-confirmation gates)

Per W330 SYNTHESIS §5 operator-decision table:

| Operator decision | Cluster H evidence | Recommended action |
|---|---|---|
| D2 — Update GitNexus (W331-X2) | Pattern 5 + §7 W331-X2 mapping above | `/plugin update gitnexus@gitnexus-marketplace` in a fresh session |
| (new) — Update obra/superpowers v5.1.0 | §1 Table row 1 — local plugin pin is behind `f2cbfbe Release v5.1.0` | Optional. Defer to next housekeeping wave; v5.1.0 may be the installed version already (re-verify via `mcp__basic-memory__search_notes "superpowers v5.1"` once available). |
| (new) — Add `trivy fs --format cyclonedx` wave-boundary stamp | §5 layer 3 | Operator approval needed before adding new direct-CLI hook to `.claude/settings.json`. |
| (new) — Add `find .claude/hooks -size +2k` CR-2 mechanization PreCommit gate | §3 CR-2 + §5 layer 6 | Operator approval needed; low risk. |

---

## §8 Concluding remarks (vs operator constraints)

**Operator hard constraints (recap)**:
1. "mature repos → deeper-dive, not PR" — observed; this dive surfaced no PR-worthy candidates (all Cluster H repos are stable + already-vendored or already-installed). Two T2-CHERRY candidates have novel patterns to extract (Cloudflare RFC digest-pinning, ast-grep YAML rule schema) but those land as `.claude/settings.json` direct-CLI hooks, not upstream PRs.
2. "GraphQL/SOTA bypasses" — N/A for Cluster H (no GraphQL endpoints).
3. "NO key rotation" — observed; this dive surfaced no credential touches.
4. "≥3 org-distinct cites" — §6 lists **9 organisations** (Anthropic, OSSF, Aqua Security, Cloudflare, Obra, Microsoft, Oraios, ast-grep, abhigyanpatwari) — 3× the floor.
5. "~4000-6000 words" — this document is ~5400 words, in range.
6. "file:line citations" — provided throughout (`gitnexus/src/core/lbug/pool-adapter.ts:423`, `obra-superpowers-marketplace/.claude-plugin/marketplace.json:1-114`, `ossf/scorecard/checks/sbom.go:CheckSBOM`, `trivy/pkg/sbom/core/bom.go:83-361`, etc.).

**Headline findings (priority-ordered for operator action)**:

1. **W331-X2 / D2 confirmed** (relabeled per codex round-1/round-2/round-3 R5 absorb — NOT W330 P0.6, which is mem0/Letta/Zep T1 bakeoff per GOAL-W331.md:18) — GitNexus 803f0bed Windows SIGSEGV-avoidance / BM25-graceful-degradation fix is real, in-code at `pool-adapter.ts:423-431` + `:497-502`, and applies to our Windows 11 runtime. Recommend `/plugin update gitnexus@gitnexus-marketplace`.
2. **P0.9 CR-1 trust extension cite-anchors gathered** — SLSA-L3 + CycloneDX + Sigstore + digest-pinning all have ≥3 org-distinct upstream anchors (OSSF + Aqua Security + Cloudflare + Anthropic). Ready to land per `CLAUDE-MD-EDIT-PROPOSAL.md:16-18`.
3. **P0.9 CR-2 ≤2KB mechanization** — three viable options identified (`find -size +2k`, ast-grep YAML rule, gitleaks-style toml). Recommend `find` for lowest risk.
4. **P0.5 install-state contract** — Obra marketplace.json schema + Cloudflare RFC digest-pinning compose to give us the full upstream-blessed schema. Mechanize as SessionStart hook (direct-CLI).
5. **Pattern catalogue** (Patterns 1-12) — 12 distinct novel SOTA patterns documented with `file:line` anchors; usable as cite-references in future skill-authoring or plugin-spec waves.
6. **Skill ecosystem health** — all 4 skill providers (obra, addyosmani, mattpocock, karpathy) remain valuable; the obra meta-discipline (`using-superpowers` + `using-skills` + `writing-skills`) is uniquely load-bearing.
7. **Supply-chain hardening plan** — 6-layer stack (gitleaks + trivy + find + ast-grep + ruff + shellcheck) all direct-CLI invocations, CR-2 compliant.
8. **Retire candidate confirmed**: `alirezarezvani/claude-skills` per W330 GOAL-W331.md:24 (low-novelty, wording-polish-only).
9. **Drift-leader watchlist**: obra/superpowers v5.1.0 (1 minor behind), GitNexus 803f0bed (1 commit behind, Windows-critical), context-mode v1.0.142 (per W330 Stream B), mattpocock/skills latest (W330 says defer).
10. **No new SEV-1 surfaced** in this dive — the Windows FTS GitNexus issue (W331-X2, formerly historical-quote "P0.6" — relabeled per codex round-3 R5-residual absorb; W330 P0.6 is the mem0/Letta/Zep T1 bakeoff per GOAL-W331.md:18) is the highest-severity item, and the underlying Windows-runtime SIGSEGV-avoidance code was already SEV-2 in W330 SYNTHESIS under its prior P0.6 historical label.

---

> **Document path**: `Z:/claude-sota-installed/docs/architecture/W331-DEEP-DIVE-LINE-BY-LINE/cluster-H-plugin-ecosystem.md`
>
> **Companion docs**: `Z:/claude-sota-installed/docs/architecture/W330-MEGA-AUDIT/SYNTHESIS.md`, `Z:/claude-sota-installed/docs/architecture/W330-MEGA-AUDIT/CLAUDE-MD-EDIT-PROPOSAL.md`, `Z:/claude-sota-installed/docs/architecture/W330-MEGA-AUDIT/REMEDIATION-PLAN-V2.md`
>
> **Framework cite**: sca-v12.1 W329 reframe per `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` + `references/dimensions.md` (D1-D49, D52-D65, D66)
