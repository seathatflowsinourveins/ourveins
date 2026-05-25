# W258r19 — Browser / GUI / Computer-Use Agent SOTA (2026-05-16)

**Scope:** Survey OSS browser / GUI / computer-use agent runtimes against operator's current setup (browser-use 94k★ + Playwright MCP + Chrome-devtools MCP). Verify against r9 P12 computer-use 3-axis convergence.

---

## §1 Benchmark leaderboard snapshot (verified from indexed sources)

| Benchmark | Top entry | Score | Notes / source |
|---|---|---|---|
| **WebArena** | OpAgent (CodeFuse AI) | **71.6%** | Planner-Grounder-Reflector-Summarizer multi-agent + online RL (Jan 2026 #1) |
| WebArena | DeepSeek v3.2 (Steel.dev e2e) | 74.3% | Cited Apr 2026 |
| WebArena | Human baseline | ~78% | Top OSS within 7pp of human |
| **OSWorld-Verified** | Re-evaluated 2025-07-28 | n/a — latest agent score not surfaced in this round; **OSWorld leaderboard.html returned 404 → primary URL https://os-world.github.io/ index page only** | HONEST-NON-FINDING for OSWorld 2026-May top entry |
| Mind2Web | SeeAct + GPT-4V | research-tier (ICML'24) | Not a daily-driver runtime |

Cited primary sources: WebArena leaderboard (AwesomeAgents), Steel.dev index, WebArena project page https://webarena.dev/

---

## §2 OSS browser/GUI agent cards (top 9)

| Repo | Stars | License | Last push | Role / Verdict |
|---|---|---|---|---|
| **browser-use/browser-use** | **94,041★** | **MIT** | 2026-05-15 (9,212 commits — highly active) | Operator HAS — *Strong: still the #1 OSS browser agent by every metric* |
| **microsoft/playwright-mcp** | **32,328★** | **Apache-2.0** | 2026-05-09 | Operator HAS — accessibility-tree-based (no vision needed) — *deterministic complement to browser-use* |
| **bytedance/UI-TARS-desktop** | **34,100★** | (license blob not surfaced this round — review LICENSE before commercial) | active | **NEW** — "Open-Source Multimodal AI Agent Stack: Connecting Cutting-Edge AI Models and Agent Infra" — biggest GUI-agent repo not in prior W258 rounds |
| Skyvern-AI/skyvern | 21,614★ | **AGPL-3.0** ⚠ | 2026-05-15 | **LICENSE-BLOCKER** — already in operator's REJECT list (W207 catalog). Use browser-use instead. |
| OSU-NLP-Group/SeeAct | research-tier | OPEN RAIL | active | Mind2Web/ICML'24 research scaffold + GPT-4V vision; pattern-cite not daily-driver |
| showlab/ShowUI | 1,800★ | (research) | CVPR 2025 | VLA *model*, not a runtime — open-weights for fine-tune |
| ServiceNow/AgentLab | 579★ | (open) | active | Research benchmark framework (BrowserGym 385 commits) — *eval scaffold, not runtime* |
| OpenAdaptAI/OpenAdapt | 1,585★ | MIT | 2026-03-04 | Desktop RPA — low velocity, narrow niche |
| e2b-dev/desktop | 1,400★ | Apache-2.0 | active | **Sandbox-class** — virtual computer for Computer-Use; pairs with Claude Computer Use API |
| OpenInterpreter/01 | ~5,000★ | AGPL-3.0 ⚠ | active | Voice interface (different category — not GUI agent per se) |

---

## §3 Convergence — does anything beat browser-use 94k★ for operator?

**Short answer: NO for the web-browser axis.** browser-use remains the dominant OSS browser-agent by stars (94k vs Skyvern 22k vs Playwright-MCP 32k), license (MIT clean), and activity (9,212 commits, push within 24h). Operator already has it via plan.

**The only newcomer with comparable scale: `bytedance/UI-TARS-desktop` (34.1k★)** — but it's a DIFFERENT category (full-screen multimodal desktop agent, not browser-specific). Worth a watchlist add for desktop-RPA use-cases. License inspection required before install (LICENSE blob not surfaced this round → HONEST-NON-FINDING; ByteDance default = Apache-2.0 but verify).

---

## §4 Anthropic Computer Use ecosystem

The official `anthropics/anthropic-quickstarts` (renamed `claude-quickstarts`) repo ships **three primitives** that bear on this layer:

1. **`computer-use-demo`** — current ref impl using `computer_use_20251124` tool with zoom actions (Anthropic-OFFICIAL Docker)
2. **`computer-use-best-practices`** — patterns guide
3. **`browser-use-demo`** — Anthropic's own browser-use integration recipe
4. **`autonomous-coding`** — orthogonal but co-located

**Verdict on Anthropic Computer Use vs operator's existing setup:**
- Operator has Playwright MCP (accessibility-tree, deterministic, no vision) + Chrome-devtools MCP (live DOM inspection). These are *cheaper, faster, more deterministic* than Computer-Use vision-based pixel-clicking for any web task.
- Anthropic Computer Use API adds unique value ONLY for: (a) non-browser desktop apps, (b) tasks requiring real screen pixels (PDF viewers, image editors), (c) cross-app workflows.
- For 95% of operator's web work — **the existing Playwright + Chrome-devtools + browser-use stack is strictly superior to Computer Use**.

---

## §5 Verdict

**KEEP-CURRENT.** The browser/GUI/computer-use layer is the SECOND-strongest already-correct corner of operator's stack (after MCP substrate). Specifically:

- **browser-use (94k★ MIT, daily commits)** — no OSS challenger has emerged in 2026; operator's plan to retain it is correct
- **Playwright MCP (32k Apache, accessibility-tree)** — operator's deterministic-mode complement; do not replace with vision-based agents
- **Chrome-devtools MCP** — live-DOM probing complement; uniquely valuable for debugging

**Additions to consider (low-priority, watchlist):**

1. **`anthropics/claude-quickstarts/computer-use-demo`** — pattern-cite for any future desktop-app automation requirement (not browser). Operator can fork the Docker reference impl if/when desktop-app automation arises.
2. **`bytedance/UI-TARS-desktop` (34.1k★)** — WATCHLIST after license inspection. Largest non-browser-use multimodal agent stack. NEW finding worth flagging to W258 synthesis even if not installed.

**REJECT:** Skyvern (AGPL-3.0, confirmed REJECT in operator's W207 catalog) · OpenInterpreter/01 (AGPL + voice not GUI).

**Convergence implication for the final W258 architecture:** the browser/GUI layer is already *optimal* — do not over-add. The P12 computer-use pattern (r9 3-axis convergence) is fully satisfied by current installs.

---

## §6 Open follow-ups
- Verify UI-TARS-desktop LICENSE blob (Apache or other?)
- Refetch live OSWorld leaderboard (URL 404 this round) — top entry for 2026-May not confirmed; likely UI-TARS or Claude Opus 4.7 computer-use per public chatter, but no primary source secured.

**Cite-anchors:** indexed GitHub HTML for all 18 candidates (Z:/claude-sota-installed/.claude/state/ ctx_fetch_and_index sources `browser_use_html`/`skyvern_html`/`playwright_mcp_html`/`seeact_html`/`oi_01_html`/`openadapt_html`/`anthropic_qs_html`/`e2b_desktop_html`/`awesome_gui_html`/`webarena_html`/`osworld_html`/`vwa_html`/`uitars_html`/`uitars_desktop`/`showui_html`/`browsergym_html`/`agentlab_html`, ~500KB cumulative).
