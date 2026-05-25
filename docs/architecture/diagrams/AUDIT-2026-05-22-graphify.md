# Graphify SOTA-Convergence Audit — 2026-05-22

**VERDICT**: **SKIP** (install) · **PATTERN-ONLY** (one discipline borrow) · **confidence 0.92**

Source: `https://github.com/safishamsi/graphify` (v8 branch)
Audit method: 3 parallel Agent streams per W269 + parallel-dispatch-mandate; cross-checked against installed runtime state.

## CR-1 trust-tuple

| Leg | Status | Evidence |
|---|---|---|
| (a) Signed-release / provenance | **FAIL** | PyPI `graphifyy 0.8.14` shows `Uploaded using Trusted Publishing? No` + `Unverified details`. No SLSA / Sigstore / PEP 740 attestations on any of 110 releases. Uploader is `uv/0.9.26` from a one-shot Ubuntu host, not GitHub-Actions Trusted Publishing. |
| (b) License | **PASS** | MIT (17-LOC standard text, Copyright 2026 Safi Shamsi). |
| (c) Malicious-update review | **AMBER** | 110 releases, latest `0.8.14` dated 2026-05-20 — 2 days before this audit, breaches CR-1's 30-day cooldown. Solo PyPI maintainer `captainturbo`. `0.7.10` release notes mention CVE-class fixes (Cypher escape, YAML escape, MCP `sanitize_label`, C-preprocessor exfiltration block) that landed 2 weeks ago → unsettled security surface. |
| (d) Dependency blast-radius | **AMBER** | 16 install extras including `faster-whisper`, `yt-dlp`, plus multiple LLM SDKs in `[all]`. Core `Requires-Dist` not surfaced on PyPI page. Not Snyk/Socket-flagged in indexed material, but transitive clean-state unverified. |

## CR-4 disqualifier (the real install blocker)

`graphify claude install` writes a graphify section into the host project's `CLAUDE.md` **AND** injects a `PreToolUse` hook entry into `.claude/settings.json`. v0.7.10 strengthened generated `CLAUDE.md` / `AGENTS.md` / `GEMINI.md` with `ALWAYS` / `NEVER` / `IF…EXISTS` graph-first directives. `graphify hook install` separately adds post-commit + post-checkout git hooks.

This is exactly the auto-fire-via-CLAUDE.md-injection pattern W255 cleaned 22,060 LOC of self-invented rules to eliminate. Direct **CR-4 violation**. Post-commit hook injection would also collide head-on with this runtime's existing 9-hook pre-commit gate stack (commitlint · codex-trailer · provenance-lint · cr2-2kb · msys-hooks-form · gitnexus-detect-changes · npm-audit · cr7-worktree-collision · gitleaks).

## Capability-overlap matrix

| Capability | graphify | gitnexus (installed) | codegraph (installed) |
|---|---|---|---|
| Knowledge-graph build over code | **DUP** | resident | resident |
| Cypher query / Neo4j push | **DUP** | resident | — |
| MCP stdio server | **DUP** (extra `mcp`) | resident | resident |
| Symbol-level callers / callees | **DUP** | resident | resident |
| Community detection (Leiden) | UNIQUE | — | — |
| Multi-modal ingest (PDF/video/SQL/papers) | UNIQUE | — | — |
| HTML/SVG/GraphML/Obsidian/Wiki export | UNIQUE | — | — |

The only UNIQUE axis (multi-modal corpus ingest — papers/videos/SQL/scripts) is not on this runtime's critical path.

## PATTERN-ONLY borrow (the one safe extraction)

**Regen-on-source-change discipline** — landed in `.claude/skills/sota-diagram-expression/SKILL.md` §"Regen-on-source-change discipline (borrowed pattern)" as a SKILL.md doc-section. Borrows the **discipline** from graphify's `graphify export callflow-html` + `graphify hook install` (Mermaid call-flow auto-regen on commit): treat `.mmd` / `.d2` sources as canonical and renders as derived; update source in the SAME commit as the architecture change. **We do NOT install graphify, the regen hook, or any installer machinery** — discipline only, enforced by the auto-fire skill itself.

Skipped patterns (CR-incompatible or low-fit): `graphify --mcp` stdio server (17-MCP budget + CR-1), per-platform installer that mutates `AGENTS.md` / `.cursor/rules/` (CR-4 host-file mutation), tree-sitter / Leiden / watch-mode / multi-format ingest (scope creep, solves graphify's whole-codebase-graph problem, not our diagrams problem), natural-language graph query (already DUP-covered by codegraph).

## 3-org-distinct cite-anchors

1. **graphify** README + LICENSE + CHANGELOG `safishamsi/graphify@v8` (project itself — self-evidence)
2. **PyPI** `graphifyy 0.8.14` metadata (Python Software Foundation — registry-side evidence of Trusted Publishing absence)
3. **OpenSSF Scorecard + SLSA v1.0** (Linux Foundation OpenSSF) — the independent supply-chain-security standards CR-1 cite-anchors to (CLAUDE.md L16-19); graphify's release shape fails both (no SLSA attestations + low Scorecard signed-releases score, consistent with PyPI's "Trusted Publishing? No")

## Reproducibility

Audit done 2026-05-22 via 3 parallel `Agent` dispatches:
- Stream A — graphify CR-1 deep audit (`general-purpose`, 9 tools, 103.8s, 95k tokens)
- Stream B — msys-hooks-form root cause (`incident-response:debugger`, 2 tools, 73.9s, 41k tokens) — confirmed hook JS is read-only; pre-commit-framework misfire on Windows; W348 escape hatch sanctioned.
- Stream C — pattern extraction (`general-purpose`, 6 tools, 76.4s, 78k tokens) — produced the SKILL.md doc-section borrow.

Reproduce SKIP verdict: re-fetch `pypi.org/project/graphifyy/`; verify `Uploaded using Trusted Publishing?` is still `No`; re-check release cadence against 30-day cooldown; re-verify `graphify claude install` README docs still mutate host CLAUDE.md.
