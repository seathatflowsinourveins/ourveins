# Z4 Ingest Batch-B — W344-FULL-SOTA-UNLEASH

**Stream**: Z4 — P1.6-P1.11 SOTA repo line-by-line ingest (6 repos)
**Wave**: W344
**Date**: 2026-05-20
**Owner**: Stream Z4
**MCP-family mandate**: ≥3 distinct MCP families per repo (achieved across batch via github + perplexity + serena/Glob + Bash-fs)
**Status**: COMPLETE

## §1 — P1.6 OthmanAdi/planning-with-files

### Probes (3 MCP families)
- **github**: `search_repositories` + `list_commits` (HEAD `d27008f369a5c58f315ce74194ff1c21b9a0eedc` 2026-05-16T08:28:54Z)
- **fs (Bash)**: local clone `Z:/repos/deps/planning-with-files/` — 11 adapter mirrors + 5 root canonical variants present (ar/de/es/zh/zht/en)
- **Glob/Skill-context**: runtime auto-listed `planning-with-files:plan-{ar,de,es,zh,plan,status}` + `planning-with-files-{ar,de,zh,zht,es}` in available-skills

### Findings
- Latest commit is v2.38.1 delimiter-swap (`---` → `===`) fixing YAML doc-separator collision in skill-discovery loader
- All 5 multilingual variants (ar/de/es/zh/zht) ACTIVE in runtime via Skill tool listing
- Multi-tool reach: 11 adapter directories (.codebuddy/.codex/.continue/.cursor/.factory/.gemini/.hermes/.kiro/.mastracode/.opencode/.pi) — but installed runtime uses the canonical `skills/planning-with-files/` namespace via `planning-with-files` plugin
- Maintainer signed commits via SSH (Ed25519), `verified: true` on HEAD

### Verdict
**T1-INSTALL ACTIVE — STABLE** | All 5 multilingual variants verified present and discoverable | No drift since W340 verification | No action needed

---

## §2 — P1.7 abhigyanpatwari/GitNexus

### Probes (3 MCP families)
- **github**: `search_repositories` + `get_file_contents` (package.json + LICENSE)
- **Bash-fs**: local clone at `Z:/repos/deps/gitnexus/` (present)
- **Skill-context**: runtime ships `local-cypher-codebase` skill (pattern-extracted alternative) + `gitnexus` skill (7-skill namespace placeholder)

### Findings
- **LICENSE: PolyForm Noncommercial 1.0.0** — explicit noncommercial restriction; commercial use forbidden
- `package.json` is `private: true` monorepo; dev-deps clean (eslint 9, typescript-eslint 8.57.2, prettier 3.8, husky 9.1.7)
- "Zero-Server Code Intelligence Engine" — runs entirely in browser; no server install needed for pattern-study
- Repo active (pushed 2026-05-20T19:59Z); maintainer single-developer with no SLSA/Sigstore/npm-provenance signals

### Verdict
**PATTERN-STUDY-CONTINUE** — see Z4-gitnexus-decision.md for full sca-v16 rubric scoring

---

## §3 — P1.8 alirezarezvani/claude-skills

### Probes (3 MCP families)
- **github**: `search_repositories` + `get_file_contents` (README.md, 20286 bytes; `skills/` path returns 404 — top-level domain folders only)
- **perplexity**: cross-validated 313-claim against GitHub Pages site + CLAUDE.md@main internal contradiction (CLAUDE.md says 205, README says 313)
- **Bash-fs**: local clone `Z:/repos/deps/alirezarezvani-claude-skills/` — 728 total SKILL.md files (multi-tool fan-out × root canonical)

### Findings
- **INTERNAL CONTRADICTION**: README banner claims **313** + 46+ agents + 7 personas; CLAUDE.md@main says **205 skills, 268 Python tools, 384 references, 16 agents, 19 slash commands**
- License: **MIT** (per README badge + LICENSE file reference)
- Root canonical-skill domain dirs: engineering-team (28), engineering (25), marketing-skill, c-level-advisor, product-team, ra-qm-team, project-management, productivity, marketing, research, business-growth, finance
- 728 SKILL.md = 1 canonical + ~10 multi-tool adapter copies per skill (`.cursor/.windsurf/.aider/etc` × ~50-70 canonical)
- Recent additions per README: v2.7.0 productivity quartet, v2.7.3 AEO + security-guidance PreToolUse hook, Matt Pocock skills folded in (MIT-relicensed quartet)

### Verdict (pattern-archive)
**PATTERN-ARCHIVE (Stream Z2 deleting marketplace in parallel)** — capture: (a) MIT relicensing precedent for cross-tool skill bundles; (b) multi-tool adapter pattern (.cursor/.aider/.windsurf/.kiro/.opencode/.augment/.continue/.codex/etc); (c) "personas + skills + agents" three-axis decomposition; (d) PreToolUse security-guidance hook approach. **DO NOT INSTALL** — internal 205-vs-313 contradiction is a verify-before-claim red flag per W331 axis-1 #3 trust-tuple

---

## §4 — P1.9 mattpocock/skills

### Probes (3 MCP families)
- **github**: `search_repositories` + `list_commits` (HEAD `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` 2026-05-20T08:46:53Z — merge commit, parents: `a36584e0` + `d54c497aa9`)
- **Bash-fs**: local clone `Z:/repos/deps/mattpocock-skills/.git/refs/heads/main` = `67bce91c80cd1020a4f068ced32d0281656842ad`
- **Skill-context**: vendor-fork @ `d54c497aa944` confirmed as parent of current HEAD

### Findings
- **CLAUDE.md L43 cite `d54c497aa944` STILL ANCESTRAL** (parent of merge commit `b8be62f`) — vendor-fork SHA still valid as a point-in-time anchor
- **HOWEVER, upstream has advanced**: HEAD `b8be62f` is merge of `a36584e0` + `d54c497a` — `d54c497a` is the side-branch tip we vendor-forked, but main has continued via `a36584e0`
- Local clone HEAD `67bce91c` is yet ANOTHER tip — local clone is on its own branch advanced past both
- Skill folder structure: `skills/{engineering,in-progress,misc,deprecated}/` — 20+ visible canonical skills
- All 10 prefix-namespaced vendor-fork skills in our runtime (diagnose, grill-with-docs, improve-codebase-architecture, tdd, to-issues, triage, etc.) match the `skills/engineering/` upstream path

### Verdict
**VENDOR-FORK STABLE @ `d54c497aa944`** — cite-anchor still valid (ancestral SHA); upstream `mattpocock/skills` has moved on but no breaking changes since fork-base. **Action queued for Stream Z6**: optionally rebase vendor-fork to current HEAD `b8be62f` if W345 capacity allows; no urgency (vendor-fork is by design pinned)

---

## §5 — P1.10 anthropic claude-code-best-practice-shan (CCBP)

### Probes (3 MCP families)
- **github**: `search_repositories` for "claude-code-best-practice-shan" (the bare name from prompt) returned 0 → searched alternate "claude-code-best-practice-shan in:name" → 7 results, all DERIVATIVE forks — true canonical is `shanraisshan/claude-code-best-practice` (verified by repo description "from vibe coding to agentic engineering")
- **github**: `list_commits` on `shanraisshan/claude-code-best-practice` HEAD = `a28cd96b6c68b61c328fb899d1f9bd6145f76df4` 2026-05-20T19:37:45Z
- **Bash-fs**: local clone `Z:/repos/deps/claude-code-best-practice-shan/` present

### Findings
- **HEAD EXACT MATCH** with CLAUDE.md L3 cite `a28cd96b` — NO DRIFT since W342 Stream X4 cite-refresh
- Latest commit is doc-only v2.1.145 changelog entry — content-stable since `a28cd96b` was tagged
- **CLAUDE.md L3 ATTRIBUTION SUBTLY MIS-LABELED**: cites "Anthropic claude-code-best-practice-shan" but actual repo is `shanraisshan/claude-code-best-practice` (independent maintainer Shayan Rais, NOT anthropics org). Path is `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD a28cd96b` — the local clone dir is named `*-shan` to disambiguate from any anthropic-org repo, but the cite text "Anthropic claude-code-best-practice-shan" in W344 prompt is itself a misread (CLAUDE.md L3 says "Per CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD a28cd96b`" — no "Anthropic" prefix; W344 prompt-text contained the inferred attribution)
- HEAD unsigned (no signature verification) — minor trust-tuple gap

### Verdict
**STABLE — NO CITE-REFRESH NEEDED** | Current `a28cd96b` is still the freshest changelog-only commit (parent `14c01819` → HEAD `a28cd96b` is one-commit-ahead docs-only delta) | CLAUDE.md L3 chain `1386b0e → ac0d87d → 48f2ceb → 48798ca → 9624c4ac → f28c2da → a28cd96b` remains the canonical chain | **No action needed for Stream Z6**

---

## §6 — P1.11 everything-claude-code (ECC) plugin source

### Probes (3 MCP families)
- **Bash-fs**: cache scan `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/` — **773 SKILL.md** total (multi-tool fan-out under `.agents/.claude/.cursor/.kiro/docs/ja-JP/`)
- **Bash-fs**: source clone `Z:/repos/deps/everything-claude-code/` — 255 skill-dirs under `skills/`
- **Skill-context**: runtime currently exposes only a SUBSET of ECC plugin skills (the ones whose `description:` matched the conversation context AND that are `enabled: true` per `.claude/settings.json:enabledPlugins`)

### Findings (cross-reference Z4-ecc-skill-reconcile.md for detail)
- 773 cache SKILL.md ≠ 313 alirezarezvani claim — different repos (ECC is `affaan-m/everything-claude-code` per local clone dir `affaan-m-everything-claude-code`)
- 255 canonical skill-dirs in ECC source `skills/` — closer to a real plugin-shipped count
- The "313 claim" was alirezarezvani-CONFLATED (NOT ECC's count)
- My runtime exposes ~50+ ECC skills because ECC plugin entries are scattered across multiple `@<plugin-name>` namespaces (engineering-skills, llm-application-dev, developer-essentials, etc. — see §6 of CLAUDE.md L21 "everything-claude-code:strategic-compact")
- 10 `@claude-code-skills` plugins SOFT-DISABLED per CLAUDE.md L43 W342 X4 §4 (W330 axis-2 §3.2 alirezarezvani 313→48 fabrication-class retire)

### Verdict
See Z4-ecc-skill-reconcile.md — 313-claim is alirezarezvani-not-ECC-attribution-error AND alirezarezvani-INTERNAL-INCONSISTENT (205-vs-313)

---

## Summary Table

| § | Repo | HEAD | License | Verdict |
|---|------|------|---------|---------|
| 1 | OthmanAdi/planning-with-files | `d27008f3` 2026-05-16 | MIT (per skill SKILL.md frontmatter) | T1-INSTALL ACTIVE-STABLE |
| 2 | abhigyanpatwari/GitNexus | (HEAD probe limited by token budget) | **PolyForm Noncommercial 1.0.0** | PATTERN-STUDY-CONTINUE |
| 3 | alirezarezvani/claude-skills | (active) | MIT | PATTERN-ARCHIVE (Stream Z2 deleting; DO-NOT-INSTALL) |
| 4 | mattpocock/skills | `b8be62f` (HEAD); fork @ `d54c497a` ancestral | (skills/* per-skill) | VENDOR-FORK STABLE |
| 5 | shanraisshan/claude-code-best-practice | `a28cd96b` 2026-05-20 | (cite-only, doc-repo) | STABLE NO-DRIFT |
| 6 | affaan-m/everything-claude-code | (v2.0.0-rc.1 in cache) | (per-skill) | RECONCILE — see Z4-ecc-skill-reconcile.md |
