# STREAM-B-mksglu-context-mode — W319 Stream B

## HEAD-SHA-AT-INGEST
- `898ecc9f2a1451e9d1f949772def3e6c34447e50` @ 2026-05-19 12:59:35 +0000
- Current version: `1.0.141` (per `package.json`)
- Latest CHANGELOG entries: 1.0.141 → 1.0.140 → 1.0.136 (W315-r2 baseline was v1.0.141; HEAD adds `898ecc9 ci: update install stats` cosmetic-only after release)

## CITE-DRIFT

| Cite location | Cited value | Current truth | Action |
|---|---|---|---|
| CLAUDE.md L42 (W315-r2 Stream A) | "T0 IMMEDIATE-UPGRADE mksglu/context-mode v1.0.136 → v1.0.141" | repo HEAD is `898ecc9` post-1.0.141; version still `1.0.141` per `package.json` | none — W315 ship-decision was the upgrade to v1.0.141 |
| Operator-AI-W316 carry-forward | check current latest version on GitHub | **v1.0.141 confirmed** | **CLOSED** — no further upgrade needed; HEAD-of-1.0.141 stable |
| `.mcp.json` (this repo) | check if pinned | live install via plugin marketplace, not `.mcp.json` MCP-server entry | none |

ZERO version drift — v1.0.141 is current.

## NET-NEW-PATTERNS

| PRIO | Pattern | Cite (path:line) | Why net-new |
|---|---|---|---|
| 1 | OpenCode (`opencode` plugin variant) coerces stringified primitives on native plugin path (PR #627, fixes Zod-preprocessor symptoms) | `package.json` v1.0.141 + commit `7c82220` | Cross-harness alignment. Direct relevance: PR #627 was the exact symptom that motivated W315-r2 Stream A T0 immediate-upgrade. **Confirms upgrade was correct, no further action.** |
| 1 | `OPENCLAW` plugin variant (`./build/adapters/openclaw/plugin.js` exposed as `./openclaw` export) | `package.json` `exports` + `bin` field | NET-NEW context-mode adapter for OpenClaw harness; not relevant to our Claude-Code-only stack. PRIO-1 informational. |
| 2 | `BENCHMARK.md` (new file at repo root) — 21 scenarios, 96% context savings benchmark | `BENCHMARK.md` lines 1-25 | Empirically anchored benchmark for context-mode's 98%-context-savings claim. Useful for our W295 typed-evidence Tier-B claims. **PRIO-2 W320 cite-anchor candidate.** |
| 2 | `llms.txt` + `llms-full.txt` at repo root | `llms.txt` + `llms-full.txt` | Standard LLM-facing index files. PRIO-2 informational. |
| 2 | `hooks/pretooluse.mjs` matches an expanded list of MCP tools: `mcp__plugin_context-mode_context-mode__ctx_execute` + `Bash|Read|Write|Edit|NotebookEdit|Glob|Grep|TodoWrite|TaskCreate|TaskUpdate|EnterPlanMode|ExitPlanMode|Skill|Agent|AskUserQuestion|EnterWorktree|mcp__` | `hooks/hooks.json` | NET-NEW matcher includes `Skill|Agent|AskUserQuestion|EnterWorktree|TaskCreate|TaskUpdate` — captures recent CC primitives. Already in our installed plugin; pattern confirms cardinal-rule-2 compliant matchers. PRIO-2 informational. |
| 2 | `hooks/security.bundle.mjs` — bundled security checks dispatched from hooks (curl/wget escape hatch, quoted-arg false positives, closes #625) | PR #625 + `hooks/security.bundle.mjs` | NET-NEW security-bundle pattern; bundled JS dispatched at hook time. Cardinal-rule-2 acceptable (single CLI command per hook). PRIO-2 informational. |
| 3 | Gemini-CLI hook adapter (`hooks/gemini-cli/`) + Kiro (`hooks/kiro/`) + JetBrains Copilot (`hooks/jetbrains-copilot/`) | `hooks/` subdirs | Cross-harness expansion; not relevant to Claude-Code-only stack. |
| 3 | `fix(pi): normalise context_mode_ prefix and path→file_path for event extraction (#624)` | commit `b759709` | Internal event-extraction normalization. PRIO-3. |
| 3 | `fix(upgrade): fail loud when Step 1 GitHub clone/install throws (#628)` | commit `76559cf` | Aligned with our F-1 silent-fallback hardening (W314-r2). PRIO-3 pattern reinforcement. |
| 3 | `fix(gemini): map beforeagent in dispatcher and fix doctor paths (#629)` | commit `605177a` | Cross-harness fix. PRIO-3. |
| 4 | `docs: Replace outdated Smart Truncation with FTS5 externalization (#626)` | commit `227230d` | Doc update — confirms context-mode uses FTS5 with auto-externalize to disk. PRIO-4. |
| 4 | New configs files (`configs/`) | `configs/` | Internal config. |
| 4 | `bin/` directory for installer scripts | `bin/` | Standard. |
| 5 | `ci: update install stats` HEAD commit (`898ecc9`) | commit ref | Cosmetic. |
| 5 | `ci: update server.bundle.mjs, cli.bundle.mjs, session hook & security bundles` (`6bbcb44`) | commit ref | Build artifact refresh. |

## STALE-IN-UPSTREAM
None. The W315-r2 Stream A T0 upgrade to v1.0.141 closed all open drift.

## HARNESS-FIT
- Decision: HOLD-INSTALLED (T1 ACTIVE-INSTALLED); pre-existing as plugin via `claude-plugins-official` marketplace
- Action: none — current version stable; CLAUDE.md L34 already cites correctly
- License: Elastic-2.0 (per package.json)
- W320 micro-action: cite `BENCHMARK.md` (96% context savings) as Tier-B typed-evidence anchor in W295/I9 evidence chain for context-mode value claim

## License
Elastic-2.0
