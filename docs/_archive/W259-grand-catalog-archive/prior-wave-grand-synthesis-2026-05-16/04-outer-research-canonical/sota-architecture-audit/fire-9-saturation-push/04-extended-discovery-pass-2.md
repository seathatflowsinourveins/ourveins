# 04 — Extended discovery pass 2 (beyond Fire 8's 622 baseline)

> **Purpose**: broader GitHub queries beyond Fire 8's narrow `topic:claude-skills` /
> `topic:agent-os` / SKILL.md search. Sweeps 5 NEW angles: subagent-frameworks /
> claude-hooks / mcp-servers / agent-evals / cc-marketplace.

## Probe methodology

5 GitHub search queries via `api.github.com/search/repositories`:

1. `topic:subagent + pushed:>2026-03-01 + stars:>200`
2. `topic:claude-code-hooks + pushed:>2026-03-01 + stars:>100`
3. `topic:mcp-server + pushed:>2026-04-01 + stars:>500`
4. `topic:agent-evaluation + pushed:>2026-03-01 + stars:>200`
5. `topic:claude-marketplace + stars:>50`

## NEW HIGH-SIGNAL discoveries (15 raw + 5 actionable)

### 🥇 Top NEW Tier-1/2 candidates worth deeper investigation

| # | Repo | Stars | License | Pushed | Category | Probe verdict |
|---|---|---|---|---|---|---|
| F9-E1 | ruvnet/ruflo | 48,409 | MIT | 2026-05-10 | Tier-1 orchestration platform | 🔬 STUDY-PILOT (alternative to existing eee Ralph loop) |
| F9-E2 | ChromeDevTools/chrome-devtools-mcp | 39,085 | Apache-2.0 | 2026-05-10 | Tier-2 dev utility MCP | 🔬 STUDY-PILOT (Chrome DevTools for coding agents) |
| F9-E3 | Jeffallan/claude-skills | 8,938 | MIT | 2026-05-01 | Tier-4 vertical-domain skill catalog | 📚 CITE-CATALOG (full-stack dev skills 66 specialized) |
| F9-E4 | truera/trulens | 3,303 | MIT | 2026-05-10 | Tier-5 eval framework | 🔬 STUDY-PILOT (eval-and-tracking alternative to promptfoo/DeepEval) |
| F9-E5 | timescale/pg-aiguide | 1,721 | Apache-2.0 | 2026-04-28 | Tier-2 MCP utility (Postgres skills/docs) | 📚 CITE if eee adopts Postgres |

### Already-INSTALLED confirmed (2 hits)

| Repo | Status |
|---|---|
| upstash/context7 (55k★ MIT) | ✅ ALREADY INSTALLED (mcp__plugin_everything-claude-code_context7__*) |
| mksglu/context-mode (14k★ NOASSERTION) | ✅ ALREADY INSTALLED (mcp__plugin_context-mode_context-mode__ctx_*); license probe pending |

### Eval / observability cohort (alternatives to existing eee primitives)

| Repo | Stars | License | Pushed | Comparison with existing eee |
|---|---|---|---|---|
| truera/trulens | 3.3k | MIT | 2026-05-10 | overlap with promptfoo (INSTALLED) + DeepEval (INSTALLED); evaluate for tracking-axis-only |
| coze-dev/coze-loop | 5.4k | Apache-2.0 | 2026-05-09 | overlap with openlit observability (INSTALLED); CN-origin org |
| Giskard-AI/giskard-oss | 5.3k | Apache-2.0 | 2026-05-07 | LLM-eval library with security testing angle |
| mozilla-ai/any-agent | 1.2k | Apache-2.0 | 2026-05-01 | cross-framework eval abstraction (NEW direction) |
| rungalileo/agent-leaderboard | 219 | MIT | 2026-04-17 | LLM ranking + agent-task benchmarks |
| reacher-z/ClawBench | 211 | Apache-2.0 | 2026-05-10 | open-source browser AI agent benchmark |
| ifixai-ai/iFixAi | 307 | Apache-2.0 | 2026-05-08 | "diagnostic for AI misalignment" — fabrication testing angle |

### Hooks / agent-comm cohort

| Repo | Stars | License | Pushed | Verdict |
|---|---|---|---|---|
| karanb192/claude-code-hooks | 379 | MIT | 2026-04-26 | 📚 CITE-CATALOG (small, focused; cherry-pick if specific hook needed) |
| aannoo/hcom | 267 | MIT | 2026-05-09 | 🔬 NOVEL primitive — "AI agents message/watch/spawn across terminals"; potential team-orchestration cite |
| secondsky/claude-skills | 140 | MIT | 2026-05-04 | 📚 CITE (Cloudflare/React/Tailwind production skills) |
| Alfredo7777777/claude-design-agents-toolkit | 202 | NONE | 2026-05-01 | ❌ REJECT (NO LICENSE) |
| Julpygo/Claude-Code-AI-Design | 251 | MIT | 2026-04-29 | 🔬 STUDY (Figma to Code AI Agent design tool) |
| juanandresgs/claude-ctrl | 180 | NONE | 2026-05-04 | ❌ REJECT (NO LICENSE) |

### Larger ecosystem (rejected — out-of-scope)

| Repo | Stars | Why REJECT |
|---|---|---|
| n8n-io/n8n | 187k | "Fair-code" license — non-permissive; workflow-automation not CC-aligned |
| google-gemini/gemini-cli | 103k | competing CLI tool, not CC-enhancement |
| sansan0/TrendRadar | 57k | trend-monitor, not CC ecosystem |
| D4Vinci/Scrapling | 48k | web-scraping, not CC ecosystem |
| bytedance/UI-TARS-desktop | 32k | competing multimodal AI agent stack |

## ruvnet/ruflo deeper analysis (top NEW candidate)

**48,409★ MIT — "leading agent orchestration platform for Claude"** (per repo description).

Per `convergence-gate.md` Axis-3 STRONG-PROVENANCE-EXPRESS:
- 48k★ + MIT + 0d push velocity + named-author ruvnet (per repo owner) +
  "for Claude" target = candidate for Tier-1 orchestration alternative

**Risk**: ruvnet is solo-named (not org-backed). Per SRA D4: TIER-4-NAMED-INDIVIDUAL.
"leading" framing in description = self-attestation, not third-party endorsement.
Star velocity vs age requires probe (Fire 10 candidate).

**Comparison with existing eee Ralph loop**:
- eee Ralph = single-loop autonomous /loop arc via Stop-hook + ralph-wiggum-stop.sh
- ruflo = full orchestration PLATFORM ("Deploy intelligent m..." — agents likely)
- Potentially conflict in multi-agent orchestration domain (sister to BMAD's
  virtual-team or wshobson/agents)

**Verdict**: 🔬 STUDY-PILOT — clone + line-by-line read in W134-F10

## chrome-devtools-mcp deeper analysis

**39,085★ Apache-2.0 — "Chrome DevTools for coding agents"** by `ChromeDevTools` org.

**Why interesting**:
- ChromeDevTools = Google Chrome OFFICIAL org
- Apache-2.0 = clean license
- 0-day push = VERY ACTIVE
- MCP server primitive = native CC integration path

**eee fit**:
- eee already has `mcp__plugin_everything-claude-code_playwright__*` for browser automation
- chrome-devtools-mcp may COMPLEMENT (DevTools console / network / DOM specific)
  or DUPLICATE Playwright's coverage
- Probe required

**Verdict**: 🔬 STUDY-PILOT — Fire 10 candidate for browser-tools convergence audit

## truera/trulens deeper analysis

**3,303★ MIT — "Evaluation and Tracking for LLM Experiments and AI Agents"**.

**eee fit**:
- eee has promptfoo (eval) + DeepEval (eval) + openlit (observability)
- trulens adds TRACKING axis (run-history / regression-detection)
- Potential overlap with openlit OR DeepEval

**Verdict**: 🔬 STUDY-PILOT — Fire 10 SRA D1-D10 vs existing eval stack overlap probe

## Cumulative baseline update

- Fire 8 baseline: 622
- Fire 9 NEW probed: 15 new GH-search hits (5 actionable + 2 already-installed + 8 cite/reject)
- **Cumulative baseline post-Fire-9: 637** (622 + 15 newly probed)

## Top 5 NEW Fire-9 architecture additions

1. **ruvnet/ruflo** (48k★ MIT) → STUDY-PILOT Tier-1 orchestration (W134-F10)
2. **ChromeDevTools/chrome-devtools-mcp** (39k★ Apache-2.0) → STUDY-PILOT Tier-2 utility (W134-F10)
3. **truera/trulens** (3.3k★ MIT) → STUDY-PILOT Tier-5 eval-tracking (W134-F10)
4. **Jeffallan/claude-skills** (8.9k★ MIT) → CITE-CATALOG Tier-4 full-stack vertical
5. **timescale/pg-aiguide** (1.7k★ Apache-2.0) → CITE Tier-2 IF eee adopts Postgres

## Forward fires queued

| Fire | Action | Status |
|---|---|---|
| W134-F10-ruflo | line-by-line SRA D1-D10 vs Ralph loop overlap | PENDING |
| W134-F10-chrome-mcp | overlap probe vs existing Playwright MCP | PENDING |
| W134-F10-trulens | overlap probe vs promptfoo + DeepEval + openlit | PENDING |
| W134-F10-jeffallan | catalog cite-import for full-stack skills | PENDING |
| W134-F10-context-mode-license | classify mksglu/context-mode NOASSERTION (we use it as INSTALLED) | PENDING |

## Mia ladder advance

n=987 → n=992 (+5: 15 new repos probed with stars/license/push verification +
5 ALREADY-INSTALLED confirmations resolved + REJECT classifications)
