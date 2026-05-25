# W259-v16 — Gap-Resolution Deep-Dive Synthesis

> "gap resolute with max depth" — 6 parallel max-depth primary-source dives (repomix source-packing + deepwiki + GitHub-MCP + Context7) of all 22 W259-v16 coverage gaps. **Supersedes** the quick dispositions in the 6 coverage receipts and `MASTER-SCORING-MATRIX-W259.md §5`. `effective_tier = TIER-3-LOCAL-COMPOSITION`. Date 2026-05-17.

## §1 — Headline: depth changed the picture

The quick coverage sweep concluded "0 of 22 install-grade." Max depth revised that:

- **2 repos flipped to INSTALL-grade** — `j178/prek` and `opengrep/opengrep` — both commit-gate upgrades (a live-gate change → operator sign-off required).
- **3 repos hardened DOWN** — `RagaAI-Catalyst` → REJECT, `langwatch` → REJECT, `Not-Diamond/self-care` → CITE+WATCH — the quick sweep was too generous.
- **~6 catalog-accuracy errors corrected** from primary source (licenses, statuses).

This is exactly why max depth was run: quick GitHub-stars sweeps mis-call repos in both directions. The deep dive is the authoritative resolution.

## §2 — The 22 gaps — definitive evidence-backed verdicts

| # | Repo | Quick disp. | **DEEP verdict** | Key source-verified evidence |
|--:|---|---|---|---|
| 1 | `agno-agi/agno` | T2 | **STUDY-PILOT** | Peer orchestrator; no `.claude-plugin/` (404). License Apache-2.0 (not MPL-2.0). |
| 2 | `langchain-ai/deepagents` | T3 | **CITE-PATTERN** | A CC-harness mirror ("inspired by Claude Code"); `libs/code` competes with CC. No CC plugin. |
| 3 | `mastra-ai/mastra` | T2 | **STUDY-PILOT** | TS-native; `.claude/` is repo-internal dogfooding, not shippable. Dual-license (Apache-2.0 + proprietary `ee/`). |
| 4 | `strands-agents/sdk-python` | T2 | **STUDY-PILOT** | AWS-official, Production/Stable, verified Windows support; no CC plugin. |
| 5 | `HKUDS/LightRAG` | T2/T3 | **CITE-PATTERN** | 35k★ GraphRAG; no MCP/CC-plugin; redundant with installed graphiti/cognee. |
| 6 | `HKUDS/RAG-Anything` | T2/T3 | **CITE-PATTERN** | Built on LightRAG; no CC pathway; multimodal RAG not load-bearing. |
| 7 | `j178/prek` | STUDY-PILOT | **★ INSTALL-NOW** | MIT Rust single-binary; drop-in for the existing `.pre-commit-config.yaml`; Windows-native; supply-chain-hardened `auto-update`; ships a CC skill. |
| 8 | `tensorzero/tensorzero` | T2 | **STUDY-PILOT** | Apache-2.0 Rust LLMOps; duplicates catalogued LiteLLM. A `.claude-plugin/plugin.json` exists but its skill is a TODO placeholder → no real pathway. |
| 9 | `raga-ai-hub/RagaAI-Catalyst` | T2 (scored-row) | **REJECT** | Mandatory hosted `catalyst.raga.ai` SaaS account; uploads traces off-box; ~1yr dormant; dominated by installed Phoenix. |
| 10 | `Not-Diamond/self-care` | T2-pilot/T3 | **CITE-PATTERN + WATCH** | Real CC plugin but maintenance-frozen (maintainer's own README); trace-validator hard-fails on raw CC session JSONL → pathway structurally hollow. |
| 11 | `Kiln-AI/Kiln` | T3 | **WATCH** | Split license (MIT lib / proprietary EULA app); MCP exposes task tools not evals; duplicates inspect_ai+promptfoo. |
| 12 | `evidentlyai/evidently` | T3 | **CITE-PATTERN** | Apache-2.0 ML+LLM eval lib; plain pip/CLI, no CC pathway; duplicates DeepEval/Phoenix. |
| 13 | `langwatch/langwatch` | T3 | **REJECT** | License **BSL-1.1, not MIT** (non-OSS, Change Date 2099); Phoenix-overlap. (`@langwatch/scenario`, MIT, → STUDY-PILOT watch-line.) |
| 14 | `evilmartians/agent-prism` | T4 WATCH | **WATCH** | Alpha, ~3mo stale, no installable package (source-copy only), no CC pathway. |
| 15 | `QwenLM/qwen-code` | T4 WATCH | **WATCH** | gemini-cli fork; Terminal-Bench 37.5% « Codex 82%; competitor harness, not a CC primitive. |
| 16 | `gsd-build/get-shit-done` | T2/T3 | **CITE-PATTERN** | MIT; CLI installer (not a plugin marketplace); collides with installed superpowers/agent-teams; `gsd-verifier.md` is genuinely-SOTA worth citing. |
| 17 | `ComposioHQ/awesome-claude-skills` | T3 | **CITE-PATTERN** | Discovery feed; in-repo skills are vendored Anthropic examples already installed. |
| 18 | `jarrodwatts/claude-hud` | T2/T3 | **STUDY-PILOT** | MIT; clean native CC plugin (`.claude-plugin/` + marketplace.json); native statusLine API; candidate `context_window_statusline.sh` replacement. |
| 19 | `OthmanAdi/planning-with-files` | T2/T3 | **CITE-PATTERN** | Valid CC plugin but overlaps installed superpowers/writing-plans; SKILL.md embeds bash-pipeline hooks the W255 cleanup removed. |
| 20 | `yusufkaraaslan/Skill_Seekers` | T3 | **STUDY-PILOT** | MIT; `.mcp.json` FastMCP server (cardinal-rule-compliant); unique bulk docs→skill ingestion; on-demand option. |
| 21 | `opengrep/opengrep` | STUDY-PILOT | **★ INSTALL-grade (pilot ruleset)** | LGPL-2.1 verified; native Windows binary; direct-CLI (same shape as the gate's gitleaks/ruff); **fills the gate's empty SAST slot**. |
| 22 | `envoyproxy/ai-gateway` | T4 WATCH | **WATCH** | Apache-2.0 CNCF; hard K8s + Envoy dependency; zero CC pathway; non-fit for a single-operator non-K8s runtime. |

**Tally:** 2 INSTALL-grade · 6 STUDY-PILOT · 8 CITE-PATTERN · 4 WATCH · 2 REJECT.

## §3 — The 2 install-grade finds (operator decision — live-gate change)

### `j178/prek` → INSTALL-NOW
A Rust drop-in replacement for the `pre-commit` hook runner — reads the *same* `.pre-commit-config.yaml` unchanged. Wins over incumbent `pre-commit`: single binary (no Python dependency), Windows-native, faster, and `auto-update` adds supply-chain hardening (impostor-commit detection, pinned-SHA validation). Verified-safe adoption path:
1. `winget install --id j178.Prek`
2. `prek run --all-files` — verify it correctly runs gitleaks-system + ruff + actionlint on *this* repo (non-destructive — does not touch the git hook).
3. If clean → `prek install -f` (rewrites `.git/hooks/pre-commit` to invoke prek).
4. Verify with a test commit. **Reversible <1 min**: `pre-commit install -f` restores the incumbent.

### `opengrep/opengrep` → INSTALL-grade (pilot the ruleset first)
LGPL-2.1 license-clean Semgrep fork. It fills a **real hole**: the commit gate runs gitleaks (secrets) + ruff (Python lint) + actionlint — but **no SAST**. opengrep is direct-CLI (cardinal-rule-2-compliant, same shape as the existing scanners). Path: install the CLI → pilot a curated low-false-positive ruleset against this repo → decide gate-hook vs manual-run. The ruleset-tuning step is required before it joins the gate (a noisy ruleset would block commits).

## §4 — Catalog-accuracy corrections (primary-source verified)

| Repo | Catalog said | Verified truth |
|---|---|---|
| `agno` | MPL-2.0 | **Apache-2.0** |
| `mastra` | (open) | **dual-license** — Apache-2.0 core + proprietary Enterprise License on `ee/` |
| `strands-agents` | — | **Production/Stable + verified Windows support** |
| `langwatch` | MIT core | **BSL-1.1** — non-OSS, Change Date 2099 |
| `tensorzero` | "no first-party CC plugin" | a `.claude-plugin/plugin.json` exists — but its only skill is a TODO placeholder (functionally no pathway) |
| `RagaAI-Catalyst` | scored-row candidate | requires a hosted SaaS account — data-boundary risk → REJECT |

## §5 — Verdict

All 22 gaps resolved at max depth with primary-source evidence. **2 are install-grade** (`prek`, `opengrep`) — both commit-gate upgrades, held for operator sign-off (a live-security-gate change). The other 20 are correctly non-install (STUDY-PILOT / CITE-PATTERN / WATCH / REJECT). The pre-existing W259 install set is unchanged. Gap resolution — at max depth — is complete.
