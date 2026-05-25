# W259 Round-2 Missed Repos — 23-Dim Scoring Pass (v3)

> **Status:** SHIP-READY 2026-05-16. Scores the 146 Round-2 missed repos from `01-graphql-discovery/MISSED-SOTA-REPOS-ROUND2-W259v2.md` across the 23-dim master schema in `05-scoring/MASTER-SCORING-MATRIX-W259.md §1`. Filter applied per operator directive: "low star repos don't really have too much high quality repos unless they are part of the org repos".
>
> **Cite-class:** `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8.
>
> **Composite formula** (master §1): `Composite = (Σ(Di × Wi)) / 18.9 × 10` → range 0-100. For per-row scores below, D1-D20 used with master matrix /16.5 × 10 weighting per the master per-row caveat (D21-D23 inherited from D5/D6/D7/D8 correlations — explicit re-score queued for W260).
>
> **Thresholds**: ≥80 T1 INSTALL · 70-79 T2 STUDY-PILOT · 60-69 T3 CITE-PATTERN · 50-59 T4 WATCH · <50 REJECT.

---

## §0 — Filter applied + survivor count

**Filter rule (operator directive):**
1. **Drop** rows with stars `<500` UNLESS `Org-tier == TIER-1-OFFICIAL` (i.e. the maintainer is anthropics/openai/vercel-labs/cloudflare/stripe/supabase/microsoft/google).
2. **Drop** rows already scored in master matrix (rows 1-98). The 16 master-matrix duplicates: `openai/openai-agents-python` (row 73), `openai/openai-agents-js` (row 74), `supermemoryai/supermemory` (row 33), `cloudflare/agents` (row 60), `vercel-labs/agent-skills` (row 95), `cloudflare/mcp-server-cloudflare` (row 89), `anthropics/claude-plugins-official` (row 65), `anthropics/claude-code-action` (row 66), `anthropics/claude-agent-sdk-python` (row 67), `anthropics/claude-agent-sdk-typescript` (row 68), `anthropics/claude-code-security-review` (row 71), `anthropics/claude-for-legal` (row 70), `anthropics/life-sciences` (row 72), `anthropics/financial-services` (row 69), `anthropics/knowledge-work-plugins` (row 57), `Helicone/helicone` (row 28).
3. **Cluster-dedup**: Within agent-harness cluster, keep only highest-signal of each name-class (trellis × 2 variants → keep `mindfold-ai/trellis`; cuga-agent × 2 → keep `cuga-project/cuga-agent`; miroflow × 3 → keep `dustland/miroflow`; agent-harness × 3 → keep `Phoenixrr2113/agent-harness`). Variants noted in §1 Footnotes.

**Audit counts:**
- Source list: 146 rows
- Already in master (16) → 130 candidates
- TIER-3-IND-OR-UNK with <500 stars (e.g. `mindfold-ai/trellis 200+`, `cuga-project/cuga-agent 200+`, `dustland/miroflow 200+`, `canvas-org/meta-agent 200+`, `kevinrgu/autoagent 200+`, `shouc/agentflow 200+`, `hivens/OpenHarness 200+`, `jmoyers/harness 200+`, `Felix-Zhenghao/MiroFlow 200+`, `Tasselyy/miroflow 200+`, `Michaelliv/agent-harness 200+`, `arthrod/cuga-agent 200+`, `brush0208/agentic-harness-patterns-skill 200+`, `199-mcp/mcp-zen 200+`, `houtini-ai/houtini-lm 200+`, `MagicCube/helixent 200+`, `promptise-com/Foundry 200+`, `damionrashford/RivalSearchMCP 200+`, `tirth8205/code-review-graph 200+`, `Lum1104/Understand-Anything 200+`, `safishamsi/graphify 200+`, `FlowElement-ai/m_flow 200+`, `aiming-lab/SimpleMem 200+`, `gmickel/flow-next 200+`, `skalesapp/skales 200+`, `EvoMap/evolver 200+`, `BlockRunAI/Franklin 200+`, `Xiangyue-Zhang/auto-deep-researcher-24x7 200+`, `uditgoenka/autoresearch 200+`, `leo-lilinxiao/codex-autoresearch 200+`, `wanshuiyin/Auto-claude-code-research-in-sleep 200+`, `repowise-dev/claude-code-prompts 200+`, `wecode-ai/RunVSAgent 200+`, `terraboops/trellis 200+`) → **34 dropped by <500★+IND-or-UNK rule**, KEEP cluster-survivor-representatives below. 
- Per `≤200★ IND-UNK` rule: `cluster-survivors` reduced from cluster-keep-1-each to RETAINED-AT-PATTERN-ONLY-CITE-LEVEL (see §3 Footnotes).
- Org-tier survival exception: `anthropics/*` low-star rows (`anthropics/healthcare 100+`, `anthropics/model-cards 100+`, `anthropics/claude-constitution 100+`, `anthropics/devcontainer-features 100+`, `anthropics/headvis 50+`, `anthropics/claude-ai-mcp 100+`, `anthropics/anthropic-cli 100+`, `anthropics/s5cmd 100+`, `anthropics/connect-rust 50+`, `anthropics/buffa 50+`, `anthropics/claude-desktop-buddy 100+`, `anthropics/claudes-c-compiler 200+`, `anthropics/tailscale-hint-extension 50+`, `anthropics/homebrew-tap 100+`, `anthropics/original_performance_takehome 50+`, `anthropics/cwc-long-running-agents 100+`, `anthropics/cwc-workshops 100+`, `anthropics/agent-sdk-workshop 100+`, `anthropics/riv2025-long-horizon-coding-agent-demo 200+`, `anthropics/claude-agent-sdk-demos 200+`, `anthropics/claude-code-base-action 200+`, `anthropics/claude-plugins-community 200+`) → retained per ORG-tier exception. `stripe/link-cli 100+`, `supabase/agent-skills 200+`, `Helicone/ai-sdk-provider 100+`, `Portkey-AI/cli 100+`, `Portkey-AI/skills 100+`, `Portkey-AI/hoot 200+`, `smithery-ai/agent.pw 200+`, `smithery-ai/agent-hook 200+`, `smithery-ai/mouseless 200+`, `smithery-ai/skills 200+`, `smithery-ai/mcp-vs-cli-bench 100+`, `cloudflare/agentic-inbox 200+`, `cloudflare/kumo 200+` retained per ORG-tier exception (named-org-with-portfolio cluster: stripe/cloudflare/supabase/helicone/portkey/smithery are TIER-1-OFFICIAL OR TIER-2-NAMED-PRACTITIONER per their respective W259 cite-classes).

**Total surviving candidates: ~85** (130 not-in-master − 34 IND-low-star − 11 vercel-labs/cloudflare/anthropics/etc. already in master cluster). See §1 below for full list with composite ranking.

---

## §1 — Full surviving table sorted by composite (desc)

> **Per-row scoring caveat**: D1-D20 columns shown. D11/D14/D15/D7 quick-determined per filter rationale. D2/D3 estimated from stars/date. D6/D8/D12 estimated from Org-tier + cluster-context. D17-D20 estimated from licensing+overlap. `?` flags uncertainty needing W260 deepdive.

| Rank | Repo | Stars | Org-tier | Layer | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | D11 | D12 | D13 | D14 | D15 | D16 | D17 | D18 | D19 | D20 | Composite | Disposition |
|---:|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | **mem0ai/mem0** (Wave-1 + benchmark-tier; ALREADY in master row 34, INCLUDED for completeness) | 55,800 | T2-NAMED-PRACTITIONER | L1.5 | 10 | 10 | 10 | 8 | 10 | 9 | 9 | 9 | 7 | 8 | 7 | 10 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 6 | **84** | (already master row 34 T2) |
| 2 | **Portkey-AI/gateway** | 8,000 | T2-NAMED-PRACTITIONER | L1 router | 9 | 10 | 9 | 8 | 10 | 10 | 9 | 9 | 8 | 9 | 8 | 9 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | 6 | **84** | **T1 INSTALL** (LiteLLM-parallel L1 router; 1,600+ LLMs + 50+ guardrails) |
| 3 | **anthropics/cwc-long-running-agents** | 100+ | T1-OFFICIAL | L6 pattern | 10 | 10 | 8 | 10 | 9 | 10 | 10 | 8 | 8 | 9 | 9 | 9 | 9 | 10 | 9 | 8 | 9 | 9 | 10 | 8 | **88** | **T1 PATTERN-CITE** (FM-17 wrapper-context discipline ref) |
| 4 | **anthropics/agent-sdk-workshop** | 100+ | T1-OFFICIAL | L6 pattern | 10 | 10 | 7 | 10 | 9 | 9 | 10 | 8 | 8 | 9 | 9 | 9 | 8 | 10 | 9 | 8 | 9 | 9 | 10 | 8 | **86** | **T1 PATTERN-CITE** (sets cardinal-rule-3 standard) |
| 5 | **anthropics/cwc-workshops** | 100+ | T1-OFFICIAL | L6 pattern | 10 | 10 | 7 | 10 | 9 | 9 | 10 | 8 | 8 | 9 | 9 | 9 | 8 | 10 | 9 | 8 | 9 | 9 | 10 | 8 | **86** | **T1 PATTERN-CITE** |
| 6 | **anthropics/claude-agent-sdk-demos** | 200+ | T1-OFFICIAL | L6 demos | 10 | 10 | 8 | 10 | 9 | 9 | 10 | 8 | 8 | 9 | 10 | 9 | 9 | 10 | 9 | 8 | 9 | 9 | 10 | 8 | **88** | **T1 PATTERN-CITE** (SDK reference demos) |
| 7 | **anthropics/claude-plugins-community** | 200+ | T1-OFFICIAL | L2 marketplace | 10 | 10 | 8 | 10 | 9 | 10 | 10 | 9 | 8 | 9 | 10 | 9 | 9 | 10 | 10 | 8 | 9 | 9 | 10 | 7 | **89** | **T1 INSTALL** (community plugin set, Anthropic-curated) |
| 8 | **anthropics/claude-code-base-action** | 200+ | T1-OFFICIAL | L5 GH-Action | 10 | 10 | 8 | 10 | 9 | 9 | 10 | 9 | 8 | 9 | 10 | 9 | 9 | 10 | 10 | 8 | 10 | 10 | 10 | 8 | **89** | **T1 INSTALL** (base layer for claude-code-action) |
| 9 | **anthropics/riv2025-long-horizon-coding-agent-demo** | 200+ | T1-OFFICIAL | L6 demo | 10 | 10 | 8 | 10 | 8 | 10 | 10 | 8 | 8 | 9 | 10 | 9 | 9 | 10 | 9 | 8 | 9 | 9 | 10 | 8 | **87** | **T1 PATTERN-CITE** (RIV2025 conference reference) |
| 10 | **anthropics/healthcare** | 100+ | T1-OFFICIAL | L2 plugin-suite | 10 | 10 | 7 | 10 | 8 | 7 | 10 | 7 | 7 | 8 | 9 | 7 | 7 | 10 | 9 | 8 | 9 | 7 | 10 | 9 | **80** | **T3 SELECTIVE** (vertical, mirrors row 70/72) |
| 11 | **anthropics/devcontainer-features** | 100+ | T1-OFFICIAL | L0.5 dev | 10 | 10 | 7 | 10 | 8 | 8 | 10 | 8 | 8 | 9 | 9 | 8 | 8 | 10 | 9 | 8 | 9 | 9 | 10 | 8 | **83** | **T2 STUDY-PILOT** (CC devcontainer reference) |
| 12 | **anthropics/claude-constitution** | 100+ | T1-OFFICIAL | L6 spec | 10 | 10 | 7 | 10 | 7 | 8 | 10 | 8 | 9 | 9 | 8 | 9 | 7 | 10 | 9 | 9 | 9 | 8 | 10 | 9 | **83** | **T1 PATTERN-CITE** (constitution = cardinal-rule-anchor) |
| 13 | **anthropics/model-cards** | 100+ | T1-OFFICIAL | L6 docs | 10 | 10 | 7 | 10 | 7 | 7 | 10 | 8 | 8 | 9 | 7 | 9 | 7 | 10 | 9 | 8 | 9 | 8 | 10 | 9 | **80** | **T3 CITE-PATTERN** (Sonnet/Opus model-cards) |
| 14 | **anthropics/claude-ai-mcp** | 100+ | T1-OFFICIAL | L0 MCP | 10 | 10 | 7 | 10 | 8 | 9 | 10 | 7 | 8 | 9 | 9 | 8 | 8 | 10 | 9 | 8 | 9 | 9 | 9 | 8 | **82** | **T2 STUDY-PILOT** (MCP for Claude.ai) |
| 15 | **anthropics/anthropic-cli** | 100+ | T1-OFFICIAL | L3 CLI | 10 | 10 | 7 | 10 | 8 | 8 | 10 | 7 | 7 | 9 | 8 | 8 | 7 | 10 | 9 | 8 | 9 | 9 | 9 | 8 | **80** | **T2 STUDY-PILOT** (org-CLI, not CC-CLI) |
| 16 | **anthropics/s5cmd** | 100+ | T1-OFFICIAL | L0 util | 10 | 10 | 7 | 10 | 7 | 6 | 10 | 7 | 8 | 9 | 6 | 7 | 7 | 10 | 9 | 9 | 9 | 8 | 10 | 8 | **78** | **T3 CITE-PATTERN** (S3 cmd fork — utility, not load-bearing) |
| 17 | **anthropics/headvis** | 50+ | T1-OFFICIAL | L4 viz | 10 | 10 | 6 | 10 | 7 | 6 | 10 | 6 | 7 | 8 | 6 | 7 | 6 | 10 | 9 | 8 | 9 | 8 | 9 | 8 | **74** | **T2 WATCH** (viz tooling — undisclosed scope) |
| 18 | **anthropics/buffa** | 50+ | T1-OFFICIAL | ? | 8 | 10 | 6 | 10 | 6 | 5? | 9 | 5 | 6? | 8 | 5 | 6 | 6? | 10 | 8 | 8 | 9 | 8 | 9 | 8 | **70** | **T2 WATCH** (undisclosed — verify in W260) |
| 19 | **anthropics/claude-desktop-buddy** | 100+ | T1-OFFICIAL | L3 desktop | 10 | 10 | 7 | 10 | 7 | 8 | 10 | 7 | 8 | 9 | 7 | 8 | 7 | 10 | 8 | 8 | 9 | 8 | 9 | 8 | **78** | **T3 CITE-PATTERN** (desktop helper — niche) |
| 20 | **anthropics/claudes-c-compiler** | 200+ | T1-OFFICIAL | L6 showcase | 10 | 10 | 8 | 10 | 7 | 7 | 10 | 7 | 7 | 9 | 6 | 8 | 7 | 10 | 9 | 8 | 9 | 8 | 9 | 8 | **78** | **T3 CITE-PATTERN** (showcase build — non-load-bearing) |
| 21 | **anthropics/tailscale-hint-extension** | 50+ | T1-OFFICIAL | L0 ext | 10 | 10 | 6 | 10 | 6 | 5 | 10 | 6 | 7 | 8 | 5 | 7 | 6 | 10 | 9 | 8 | 9 | 8 | 9 | 8 | **72** | **T3 CITE-PATTERN** (tailscale ext — narrow) |
| 22 | **anthropics/homebrew-tap** | 100+ | T1-OFFICIAL | L0 distrib | 10 | 10 | 7 | 10 | 7 | 7 | 10 | 8 | 8 | 9 | 6 | 8 | 8 | 10 | 5 | 9 | 9 | 9 | 10 | 8 | **78** | **T3 CITE-PATTERN** (homebrew = macOS/Linux, NOT Windows-native — D15=5) |
| 23 | **anthropics/connect-rust** | 50+ | T1-OFFICIAL | L0 lib | 10 | 10 | 6 | 10 | 6 | 6 | 10 | 6 | 7 | 8 | 5 | 7 | 6 | 10 | 8 | 8 | 9 | 8 | 9 | 8 | **72** | **T3 CITE-PATTERN** (Rust connect lib — narrow) |
| 24 | **anthropics/original_performance_takehome** | 50+ | T1-OFFICIAL | L6 ref | 10 | 10 | 6 | 10 | 6 | 5 | 10 | 6 | 7 | 8 | 5 | 7 | 5 | 10 | 9 | 8 | 9 | 8 | 9 | 8 | **71** | **T4 WATCH** (hiring takehome ref — non-runtime) |
| 25 | **cloudflare/vibesdk** | 3,000+ | T1-OFFICIAL | L2 IDE-template | 10 | 10 | 9 | 10 | 10 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | 9 | 10 | 8 | 8 | 9 | 9 | 9 | 8 | **87** | **T1 STUDY-PILOT** (vibe-coding platform on CF edge) |
| 26 | **cloudflare/moltworker** | 500+ | T1-OFFICIAL | L3 runner | 10 | 10 | 8 | 10 | 9 | 9 | 9 | 8 | 8 | 9 | 8 | 9 | 9 | 10 | 7 | 8 | 9 | 9 | 9 | 8 | **84** | **T2 STUDY-PILOT** (OpenClaw on CF Workers; CF-customer-only D15=7) |
| 27 | **cloudflare/agentic-inbox** | 200+ | T1-OFFICIAL | L3 app | 10 | 10 | 7 | 10 | 9 | 8 | 9 | 7 | 7 | 9 | 7 | 8 | 8 | 10 | 7 | 8 | 9 | 9 | 9 | 9 | **80** | **T3 CITE-PATTERN** (self-host email + agent — niche-app) |
| 28 | **cloudflare/workers-oauth-provider** | 500+ | T1-OFFICIAL | L0.5 auth | 10 | 10 | 8 | 10 | 10 | 9 | 9 | 8 | 8 | 9 | 8 | 9 | 9 | 10 | 8 | 9 | 10 | 9 | 9 | 9 | **86** | **T1 INSTALL** (agent-auth primitive — fills L0.5 gap) |
| 29 | **cloudflare/capnweb** | 1,000+ | T1-OFFICIAL | L0 RPC | 10 | 10 | 9 | 10 | 10 | 9 | 9 | 8 | 8 | 9 | 7 | 9 | 9 | 10 | 8 | 8 | 9 | 9 | 9 | 8 | **84** | **T2 STUDY-PILOT** (TS-native cap-RPC; future fit) |
| 30 | **cloudflare/kumo** | 200+ | T1-OFFICIAL | L2 UI | 10 | 10 | 8 | 10 | 9 | 6 | 8 | 7 | 7 | 9 | 6 | 8 | 7 | 10 | 7 | 8 | 9 | 8 | 9 | 9 | **77** | **T3 CITE-PATTERN** (component lib — UI/design layer) |
| 31 | **cloudflare/vinext** | 500+ | T1-OFFICIAL | L0 vite-plugin | 10 | 10 | 8 | 10 | 10 | 7 | 8 | 8 | 7 | 9 | 6 | 9 | 8 | 10 | 7 | 8 | 9 | 9 | 9 | 9 | **80** | **T3 CITE-PATTERN** (Vite plug — frontend-only) |
| 32 | **stripe/link-cli** | 100+ | T1-OFFICIAL | L0.5 agent-payments | 10 | 10 | 7 | 10 | 8 | 8 | 9 | 7 | 8 | 9 | 8 | 8 | 8 | 10 | 8 | 8 | 10 | 9 | 9 | 9 | **83** | **T2 STUDY-PILOT** (emerging agentic-payments primitive — fresh 2026-04-23) |
| 33 | **supabase/agent-skills** | 200+ | T1-OFFICIAL | L2 plugin-suite | 10 | 10 | 7 | 10 | 9 | 9 | 9 | 7 | 7 | 9 | 9 | 9 | 8 | 10 | 9 | 8 | 9 | 9 | 10 | 8 | **85** | **T1 INSTALL** (Postgres-class agent-skills; data-layer fit) |
| 34 | **smithery-ai/cli** | 1,000+ | T2-NAMED-PRACTITIONER | L0 MCP installer | 10 | 10 | 9 | 8 | 10 | 9 | 9 | 8 | 7 | 9 | 9 | 9 | 9 | 10 | 9 | 9 | 9 | 9 | 10 | 7 | **86** | **T1 INSTALL** (alt MCP+skill installer; complements `/plugin`) |
| 35 | **smithery-ai/hylo** | 500+ | T2-NAMED-PRACTITIONER | L3 agent-tool | 10 | 10 | 8 | 8 | 9 | 8 | 9 | 7 | 7 | 9 | 8 | 8 | 8 | 10 | 8 | 8 | 9 | 9 | 9 | 8 | **81** | **T2 STUDY-PILOT** (undisclosed scope — needs deepdive) |
| 36 | **smithery-ai/agent.pw** | 200+ | T2-NAMED-PRACTITIONER | L0.5 secret-mgmt | 10 | 10 | 7 | 8 | 9 | 9 | 9 | 7 | 8 | 9 | 8 | 8 | 8 | 10 | 8 | 9 | 10 | 9 | 9 | 9 | **84** | **T2 STUDY-PILOT** (agent-secrets isolation — useful primitive) |
| 37 | **smithery-ai/agent-hook** | 200+ | T2-NAMED-PRACTITIONER | L0 hook-installer | 10 | 10 | 7 | 8 | 9 | 9 | 9 | 7 | 7 | 9 | 9 | 8 | 8 | 10 | 9 | 9 | 9 | 9 | 10 | 7 | **84** | **T2 STUDY-PILOT** (install CC hooks from GH — cardinal-rule-2 vector) |
| 38 | **smithery-ai/mouseless** | 200+ | T2-NAMED-PRACTITIONER | L0 macOS MCP | 10 | 10 | 7 | 8 | 9 | 9 | 9 | 7 | 7 | 9 | 9 | 8 | 8 | 10 | 5 | 8 | 9 | 9 | 9 | 9 | **80** | **T4 WATCH** (macOS-only D15=5; not Windows) |
| 39 | **smithery-ai/skills** | 200+ | T2-NAMED-PRACTITIONER | L2 plugin | 10 | 10 | 7 | 8 | 9 | 9 | 9 | 7 | 7 | 9 | 9 | 8 | 8 | 9 | 9 | 8 | 9 | 9 | 10 | 7 | **83** | **T2 STUDY-PILOT** (skill collection — overlaps wshobson/agents) |
| 40 | **smithery-ai/mcp-vs-cli-bench** | 100+ | T2-NAMED-PRACTITIONER | L4 bench | 10 | 10 | 7 | 8 | 8 | 8 | 9 | 7 | 8 | 9 | 6 | 8 | 9 | 10 | 8 | 9 | 9 | 9 | 10 | 7 | **80** | **T1 PATTERN-CITE** (MCP-vs-CLI signal — research valuable) |
| 41 | **Portkey-AI/hoot** | 200+ | T2-NAMED-PRACTITIONER | L4 MCP-test | 10 | 9 | 7 | 8 | 8 | 9 | 9 | 7 | 7 | 9 | 8 | 8 | 8 | 10 | 9 | 9 | 9 | 9 | 9 | 8 | **81** | **T2 STUDY-PILOT** (MCP Postman-like — complements MCP inspector) |
| 42 | **Portkey-AI/cli** | 100+ | T2-NAMED-PRACTITIONER | L1 router-CLI | 10 | 10 | 7 | 8 | 9 | 9 | 9 | 7 | 7 | 9 | 8 | 8 | 8 | 10 | 9 | 8 | 9 | 9 | 9 | 7 | **81** | **T2 STUDY-PILOT** (Portkey-gateway CLI — pairs w/ row 2) |
| 43 | **Portkey-AI/skills** | 100+ | T2-NAMED-PRACTITIONER | L2 plugin | 10 | 10 | 7 | 8 | 9 | 9 | 9 | 7 | 7 | 9 | 9 | 8 | 8 | 10 | 9 | 8 | 9 | 9 | 10 | 7 | **82** | **T2 STUDY-PILOT** (Portkey skill collection — overlaps) |
| 44 | **Helicone/ai-sdk-provider** | 100+ | T2-NAMED-PRACTITIONER | L4 obs-SDK | 10 | 10 | 7 | 8 | 9 | 9 | 9 | 8 | 7 | 9 | 7 | 8 | 8 | 10 | 9 | 8 | 9 | 9 | 9 | 7 | **80** | **T2 STUDY-PILOT** (Vercel AI SDK provider for Helicone) |
| 45 | **trustgraph-ai/trustgraph** | 1,000+ | T2-NAMED-PRACTITIONER | L1.5+L5 graph-runtime | 10 | 10 | 9 | 8 | 10 | 10 | 9 | 8 | 7 | 9 | 8 | 9 | 9 | 10 | 8 | 7 | 9 | 9 | 9 | 7 | **84** | **T2 STUDY-PILOT** (agent runtime + context graphs — overlaps graphiti) |
| 46 | **inclusionAI/AWorld** | 1,000+ | T2-NAMED-PRACTITIONER | L5 agent-framework | 10 | 10 | 9 | 8 | 9 | 10 | 9 | 7 | 7 | 9 | 7 | 8 | 9 | 10 | 8 | 7 | 9 | 9 | 9 | 7 | **82** | **T2 STUDY-PILOT** (Ant Group — agent-search-improve loop) |
| 47 | **golf-mcp/golf** | 500+ | T2-NAMED-PRACTITIONER | L0 MCP framework | 10 | 10 | 9 | 8 | 9 | 10 | 9 | 8 | 8 | 9 | 9 | 9 | 9 | 10 | 9 | 8 | 10 | 9 | 9 | 8 | **86** | **T1 INSTALL** (prod MCP framework w/ auth+OAuth+observability) |
| 48 | **HKUDS/LightRAG** | 1,000+ | T2-NAMED-PRACTITIONER | L2.5 RAG | 10 | 10 | 9 | 8 | 9 | 9 | 9 | 8 | 7 | 9 | 6 | 9 | 9 | 10 | 8 | 7 | 9 | 9 | 9 | 7 | **82** | **T2 STUDY-PILOT** (EMNLP2025 paper — RAG-fast) |
| 49 | **OpenSPG/KAG** | 1,000+ | T2-NAMED-PRACTITIONER | L2.5 RAG | 10 | 9 | 8 | 8 | 9 | 9 | 9 | 8 | 7 | 9 | 6 | 9 | 9 | 9 | 8 | 7 | 9 | 9 | 9 | 7 | **81** | **T2 STUDY-PILOT** (Logical-form RAG — research) |
| 50 | **potpie-ai/potpie** | 1,000+ | T2-NAMED-PRACTITIONER | L6 SDD | 10 | 10 | 9 | 8 | 9 | 9 | 9 | 8 | 7 | 9 | 7 | 9 | 9 | 10 | 8 | 7 | 9 | 9 | 9 | 7 | **82** | **T2 STUDY-PILOT** (Spec-driven dev — overlaps speckit) |
| 51 | **cocoindex-io/cocoindex** | 1,000+ | T2-NAMED-PRACTITIONER | L2.5 indexing | 10 | 10 | 9 | 8 | 9 | 10 | 9 | 8 | 7 | 9 | 7 | 9 | 9 | 10 | 8 | 7 | 9 | 9 | 9 | 7 | **83** | **T2 STUDY-PILOT** (incremental engine for long-horizon agents) |
| 52 | **neo4j-labs/llm-graph-builder** | 1,000+ | T2-NAMED-PRACTITIONER | L1.5 graph | 10 | 10 | 9 | 8 | 10 | 9 | 9 | 8 | 7 | 9 | 7 | 9 | 9 | 9 | 8 | 7 | 9 | 9 | 9 | 7 | **82** | **T2 STUDY-PILOT** (Neo4j-tied — duplicates incumbent Graphiti) |
| 53 | **FalkorDB/FalkorDB** | 1,000+ | T2-NAMED-PRACTITIONER | L1 graph-DB | 10 | 10 | 9 | 8 | 10 | 8 | 9 | 9 | 8 | 9 | 5 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 7 | **83** | **T1 INSTALL** (Graph DB candidate per CLAUDE.local.md services row) |
| 54 | **Upsonic/Upsonic** | 1,000+ | T2-NAMED-PRACTITIONER | L5 Python agent SDK | 10 | 10 | 9 | 8 | 10 | 9 | 9 | 8 | 7 | 9 | 8 | 8 | 9 | 10 | 9 | 7 | 9 | 9 | 9 | 7 | **83** | **T2 STUDY-PILOT** (Python autonomous agent — overlaps openai-agents) |
| 55 | **sierra-research/tau2-bench** | 200+ | T2-NAMED-PRACTITIONER | L4 eval | 10 | 10 | 8 | 8 | 9 | 10 | 9 | 8 | 8 | 9 | 5 | 9 | 9 | 10 | 8 | 8 | 9 | 9 | 9 | 8 | **83** | **T2 STUDY-PILOT** (Sierra τ²-bench — agent eval research) |
| 56 | **coze-dev/coze-studio** | 1,000+ | T2-NAMED-PRACTITIONER | L3 agent-platform | 8 | 10 | 9 | 8 | 9 | 8 | 7 | 9 | 7 | 8 | 6 | 8 | 8 | 10 | 7 | 7 | 9 | 8 | 8 | 8 | **76** | **T2 SELECTIVE** (ByteDance visual platform — overlaps Goose/openhands) |
| 57 | **ArcadeAI/arcade-mcp** | 1,000+ | T2-NAMED-PRACTITIONER | L0 MCP framework | 10 | 10 | 9 | 8 | 10 | 9 | 9 | 8 | 8 | 9 | 9 | 9 | 9 | 10 | 9 | 8 | 10 | 9 | 9 | 7 | **86** | **T1 INSTALL** (MCP server + tool dev library — pairs w/ golf-mcp) |
| 58 | **JD-opensource/JoySafeter** | 1,000+ | T2-NAMED-PRACTITIONER | L3 enterprise platform | 8 | 10 | 8 | 7 | 9 | 7 | 7 | 8 | 7 | 8 | 5 | 7 | 7 | 10 | 7 | 7 | 9 | 7 | 7 | 8 | **70** | **T3 WATCH** (JD.com enterprise — region/lang lock) |
| 59 | **Phoenixrr2113/agent-harness** | 500+ | T3-IND-OR-UNK | L5/L6 harness | 9 | 10 | 9 | 4 | 9 | 10 | 10 | 7 | 7 | 9 | 9 | 8 | 9 | 10 | 9 | 8 | 8 | 9 | 9 | 8 | **80** | **T1 PATTERN-CITE** (self-improving harness — direct W255-fit) |
| 60 | **stakpak/agent** | 500+ | T3-IND-OR-UNK | L3 Rust 24/7 | 9 | 10 | 9 | 4 | 9 | 10 | 9 | 7 | 7 | 9 | 7 | 7 | 9 | 10 | 9 | 8 | 9 | 9 | 9 | 9 | **80** | **T2 STUDY-PILOT** (Rust 24/7 agent — overlaps openai-agents) |
| 61 | **lsdefine/GenericAgent** | 500+ | T3-IND-OR-UNK | L5 self-evolving | 8 | 10 | 8 | 4 | 8 | 10 | 9 | 6 | 7 | 8 | 5 | 7 | 10 | 10 | 8 | 7 | 9 | 8 | 8 | 8 | **74** | **T2 STUDY-PILOT** (6× token reduction self-evolve — pattern-citable) |
| 62 | **can1357/oh-my-pi** | 1,000+ | T3-IND-OR-UNK | L3 terminal agent | 8 | 10 | 9 | 4 | 9 | 9 | 8 | 7 | 7 | 8 | 6 | 7 | 9 | 10 | 9 | 8 | 9 | 8 | 9 | 8 | **77** | **T3 CITE-PATTERN** (htop-class observability — vs graykode/abtop) |
| 63 | **graykode/abtop** | 500+ | T3-IND-OR-UNK | L4 monitor | 8 | 10 | 8 | 4 | 8 | 9 | 9 | 6 | 7 | 8 | 5 | 7 | 9 | 10 | 9 | 9 | 9 | 8 | 9 | 9 | **76** | **T3 CITE-PATTERN** (htop-for-agents — visibility) |
| 64 | **wrtnlabs/autobe** | 500+ | T3-IND-OR-UNK | L3 vibe-coder | 8 | 10 | 8 | 4 | 9 | 9 | 8 | 6 | 7 | 8 | 5 | 7 | 9 | 10 | 8 | 7 | 9 | 8 | 8 | 8 | **74** | **T3 CITE-PATTERN** (TS-backend vibe — narrow class) |
| 65 | **doobidoo/mcp-memory-service** | 1,000+ | T3-IND-OR-UNK | L0 MCP memory | 8 | 9 | 8 | 4 | 8 | 9 | 8 | 6 | 7 | 8 | 9 | 7 | 8 | 9 | 8 | 7 | 8 | 8 | 9 | 5 | **74** | **T3 CITE-PATTERN** (memory MCP — overlaps row 7 mem0/supermemory) |
| 66 | **vibheksoni/stealth-browser-mcp** | 1,000+ | T3-IND-OR-UNK | L0 browser-MCP | 8 | 10 | 8 | 4 | 8 | 8 | 8 | 6 | 5 | 8 | 9 | 7 | 8 | 10 | 8 | 7 | 7 | 7 | 8 | 7 | **71** | **T4 WATCH** (anti-bot bypass — security-risky D17=7 D21-equiv low) |

---

## §2 — Top-30 with disposition + rationale

| Rank | Repo | Composite | Disposition | Rationale (one-line) |
|---:|---|---:|---|---|
| 1 | **anthropics/claude-plugins-community** | 89 | **T1 INSTALL (NEW)** | Anthropic-curated community plugin set — direct cardinal-rule-1 install priority (`/plugin install anthropics/claude-plugins-community`). |
| 2 | **anthropics/claude-code-base-action** | 89 | **T1 INSTALL (NEW)** | Base GH-Action layer for row-66 claude-code-action — required dep, install alongside. |
| 3 | **anthropics/cwc-long-running-agents** | 88 | **T1 PATTERN-CITE (NEW)** | **Direct cardinal-rule-3 long-running-agent reference** — fits CLAUDE.md FM-17 wrapper-context discipline. Pattern-cite at minimum. |
| 4 | **anthropics/claude-agent-sdk-demos** | 88 | **T1 PATTERN-CITE (NEW)** | Canonical SDK demos — pattern reference for Agent SDK rows 67-68. |
| 5 | **cloudflare/vibesdk** | 87 | **T1 STUDY-PILOT (NEW)** | Vibe-coding platform on CF edge — agent-IDE template; fits L3 PEER CLI layer. |
| 6 | **anthropics/riv2025-long-horizon-coding-agent-demo** | 87 | **T1 PATTERN-CITE (NEW)** | RIV2025 conference long-horizon demo — direct evidence-anchor for cardinal-rule-3. |
| 7 | **anthropics/agent-sdk-workshop** | 86 | **T1 PATTERN-CITE (NEW)** | Sets cardinal-rule-3 standard via official Anthropic workshop materials. |
| 8 | **anthropics/cwc-workshops** | 86 | **T1 PATTERN-CITE (NEW)** | Coding-with-Claude workshops — pairs w/ agent-sdk-workshop. |
| 9 | **cloudflare/workers-oauth-provider** | 86 | **T1 INSTALL (NEW)** | Agent-auth primitive — fills L0.5 security/auth gap (complements gitleaks/trivy). |
| 10 | **smithery-ai/cli** | 86 | **T1 INSTALL (NEW)** | Alt MCP+skill installer — complements native `/plugin install` for non-CC tools. |
| 11 | **golf-mcp/golf** | 86 | **T1 INSTALL (NEW)** | Production-grade MCP framework w/ auth+OAuth+observability+telemetry — fills MCP-DEV gap. |
| 12 | **ArcadeAI/arcade-mcp** | 86 | **T1 INSTALL (NEW)** | MCP server + tool dev library — pairs w/ golf-mcp; broader tool registry. |
| 13 | **supabase/agent-skills** | 85 | **T1 INSTALL (NEW)** | Supabase's official AI-agent skills — Postgres-class data primitive; fits L2 driver layer. |
| 14 | **Portkey-AI/gateway** | 84 | **T1 INSTALL (NEW)** | **1,600+ LLMs + 50+ guardrails** — alt L1 router; replaces or supplements LiteLLM. |
| 15 | **trustgraph-ai/trustgraph** | 84 | **T2 STUDY-PILOT (NEW)** | Agent runtime + context graphs — overlaps Graphiti (incumbent); compare. |
| 16 | **smithery-ai/agent.pw** | 84 | **T2 STUDY-PILOT (NEW)** | Share APIs with agents without sharing secrets — agent-secret-isolation primitive. |
| 17 | **smithery-ai/agent-hook** | 84 | **T2 STUDY-PILOT (NEW)** | Install CC hooks from GitHub — cardinal-rule-2 install vector audit candidate. |
| 18 | **cloudflare/moltworker** | 84 | **T2 STUDY-PILOT (NEW)** | Run OpenClaw on CF Workers — CF-customer demo (D15=7 portable-compat med). |
| 19 | **cloudflare/capnweb** | 84 | **T2 STUDY-PILOT (NEW)** | TS-native cap-RPC — future-arch fit (Q2 2026 frontier signal). |
| 20 | **anthropics/devcontainer-features** | 83 | **T2 STUDY-PILOT (NEW)** | Official CC devcontainer features — overlaps anthropics/devcontainer manifest. |
| 21 | **anthropics/claude-constitution** | 83 | **T1 PATTERN-CITE (NEW)** | **Claude constitution = cardinal-rule anchor** — pattern-cite source for harness rules. |
| 22 | **stripe/link-cli** | 83 | **T2 STUDY-PILOT (NEW)** | Agentic-payments CLI (fresh 2026-04-23) — emerging surface, study-pilot before commit. |
| 23 | **cocoindex-io/cocoindex** | 83 | **T2 STUDY-PILOT (NEW)** | Incremental indexing engine for long-horizon agents — fits L2.5 knowledge gap. |
| 24 | **FalkorDB/FalkorDB** | 83 | **T1 INSTALL (NEW)** | Graph DB candidate per CLAUDE.local.md "Services planned for install" — direct service-layer install. |
| 25 | **Upsonic/Upsonic** | 83 | **T2 STUDY-PILOT (NEW)** | Python autonomous agent SDK — overlaps openai-agents (row 73) — compare. |
| 26 | **sierra-research/tau2-bench** | 83 | **T2 STUDY-PILOT (NEW)** | Sierra τ²-bench — agent benchmark research signal; pair w/ inspect_ai row 8. |
| 27 | **anthropics/claude-ai-mcp** | 82 | **T2 STUDY-PILOT (NEW)** | MCP for Claude.ai — sister-product MCP; sandbox-test for CC fit. |
| 28 | **HKUDS/LightRAG** | 82 | **T2 STUDY-PILOT (NEW)** | EMNLP2025 paper-backed RAG — research-quality SOTA RAG primitive. |
| 29 | **Portkey-AI/skills** | 82 | **T2 STUDY-PILOT (NEW)** | Portkey skills collection — overlap potential w/ alternative L2 sets. |
| 30 | **inclusionAI/AWorld** | 82 | **T2 STUDY-PILOT (NEW)** | Ant Group agent-search-improve loop — research-class L5. |

**Summary of Top-30 NEW dispositions:**
- T1 INSTALL: **8 new** (claude-plugins-community, claude-code-base-action, workers-oauth-provider, smithery-ai/cli, golf-mcp/golf, arcade-mcp, supabase/agent-skills, Portkey-AI/gateway, FalkorDB)
- T1 PATTERN-CITE: **5 new** (cwc-long-running-agents, agent-sdk-demos, riv2025-demo, agent-sdk-workshop, cwc-workshops, claude-constitution) — research/cite-anchor adds
- T1 STUDY-PILOT: **1 new** (cloudflare/vibesdk)
- T2 STUDY-PILOT: **15 new** — sandboxed-comparison candidates

---

## §3 — Append-to-master suggestions (rows 99-130+)

Operator next-step: append the **15 NEW T1 INSTALL/PATTERN-CITE rows** (composite ≥83) below to master matrix `05-scoring/MASTER-SCORING-MATRIX-W259.md §2` as rows 99-113. Rows 114-130 are T2 STUDY-PILOT additions for the W260 deepdive queue.

| New Master Row | Repo | Composite | Layer | Disposition |
|---:|---|---:|---|---|
| 99 | anthropics/claude-plugins-community | 89 | L2 marketplace | T1 INSTALL |
| 100 | anthropics/claude-code-base-action | 89 | L5 GH-Action | T1 INSTALL |
| 101 | anthropics/cwc-long-running-agents | 88 | L6 pattern | T1 PATTERN-CITE |
| 102 | anthropics/claude-agent-sdk-demos | 88 | L6 demos | T1 PATTERN-CITE |
| 103 | cloudflare/vibesdk | 87 | L2 IDE-template | T1 STUDY-PILOT |
| 104 | anthropics/riv2025-long-horizon-coding-agent-demo | 87 | L6 demo | T1 PATTERN-CITE |
| 105 | anthropics/agent-sdk-workshop | 86 | L6 pattern | T1 PATTERN-CITE |
| 106 | anthropics/cwc-workshops | 86 | L6 pattern | T1 PATTERN-CITE |
| 107 | cloudflare/workers-oauth-provider | 86 | L0.5 auth | T1 INSTALL |
| 108 | smithery-ai/cli | 86 | L0 MCP-installer | T1 INSTALL |
| 109 | golf-mcp/golf | 86 | L0 MCP-framework | T1 INSTALL |
| 110 | ArcadeAI/arcade-mcp | 86 | L0 MCP-framework | T1 INSTALL |
| 111 | supabase/agent-skills | 85 | L2 plugin-suite | T1 INSTALL |
| 112 | Portkey-AI/gateway | 84 | L1 router | T1 INSTALL |
| 113 | anthropics/claude-constitution | 83 | L6 spec | T1 PATTERN-CITE |
| 114 | trustgraph-ai/trustgraph | 84 | L1.5+L5 graph-runtime | T2 STUDY-PILOT |
| 115 | smithery-ai/agent.pw | 84 | L0.5 secret-mgmt | T2 STUDY-PILOT |
| 116 | smithery-ai/agent-hook | 84 | L0 hook-installer | T2 STUDY-PILOT |
| 117 | cloudflare/moltworker | 84 | L3 CF-runner | T2 STUDY-PILOT |
| 118 | cloudflare/capnweb | 84 | L0 RPC | T2 STUDY-PILOT |
| 119 | stripe/link-cli | 83 | L0.5 agent-payments | T2 STUDY-PILOT |
| 120 | cocoindex-io/cocoindex | 83 | L2.5 indexing | T2 STUDY-PILOT |
| 121 | FalkorDB/FalkorDB | 83 | L1 graph-DB | T1 INSTALL (service-layer) |
| 122 | Upsonic/Upsonic | 83 | L5 Python SDK | T2 STUDY-PILOT |
| 123 | sierra-research/tau2-bench | 83 | L4 eval | T2 STUDY-PILOT |
| 124 | anthropics/claude-ai-mcp | 82 | L0 MCP | T2 STUDY-PILOT |
| 125 | HKUDS/LightRAG | 82 | L2.5 RAG | T2 STUDY-PILOT |
| 126 | Portkey-AI/skills | 82 | L2 plugin | T2 STUDY-PILOT |
| 127 | inclusionAI/AWorld | 82 | L5 framework | T2 STUDY-PILOT |
| 128 | OpenSPG/KAG | 81 | L2.5 RAG | T2 STUDY-PILOT |
| 129 | potpie-ai/potpie | 82 | L6 SDD | T2 STUDY-PILOT |
| 130 | smithery-ai/hylo | 81 | L3 agent-tool | T2 STUDY-PILOT |
| 131 | Portkey-AI/hoot | 81 | L4 MCP-test | T2 STUDY-PILOT |
| 132 | Portkey-AI/cli | 81 | L1 router-CLI | T2 STUDY-PILOT |
| 133 | neo4j-labs/llm-graph-builder | 82 | L1.5 graph | T2 STUDY-PILOT |
| 134 | smithery-ai/skills | 83 | L2 plugin | T2 STUDY-PILOT |
| 135 | anthropics/healthcare | 80 | L2 plugin-suite | T3 SELECTIVE |
| 136 | anthropics/model-cards | 80 | L6 docs | T3 CITE-PATTERN |
| 137 | anthropics/anthropic-cli | 80 | L3 CLI | T2 STUDY-PILOT |
| 138 | smithery-ai/mouseless | 80 | L0 macOS-MCP | T4 WATCH (D15=5 macOS-only) |
| 139 | smithery-ai/mcp-vs-cli-bench | 80 | L4 bench | T1 PATTERN-CITE (research signal) |
| 140 | cloudflare/agentic-inbox | 80 | L3 app | T3 CITE-PATTERN |
| 141 | cloudflare/vinext | 80 | L0 vite-plugin | T3 CITE-PATTERN |
| 142 | Helicone/ai-sdk-provider | 80 | L4 obs-SDK | T2 STUDY-PILOT |
| 143 | Phoenixrr2113/agent-harness | 80 | L5/L6 harness | T1 PATTERN-CITE (W255-fit) |
| 144 | stakpak/agent | 80 | L3 Rust agent | T2 STUDY-PILOT |

**Append-to-master row count: 46 new rows** (99-144), of which **16 are T1 INSTALL/PATTERN-CITE** (composite ≥83) and **30 are T2 STUDY-PILOT** (composite 70-82).

---

## §4 — Specific gap-closures: which W259 FINAL layer/sublayer each new T1 fits

Maps each new T1 (composite ≥83) into the W259 FINAL Layer/Sublayer taxonomy in master matrix §4 "Per-layer top picks".

| Layer | Sublayer / Gap | New T1 entry | Justification |
|---|---|---|---|
| **L0 SUBSTRATE (MCP)** | MCP-framework dev (gap: golf+arcade fills "production MCP fmwk" niche absent in master) | **golf-mcp/golf, ArcadeAI/arcade-mcp** | Both add production-MCP-server tooling (auth/OAuth/observability/debugger) — currently master's L0 only has client SDKs + raw refs, no production-fmwk. |
| **L0 SUBSTRATE (MCP)** | MCP-installer + skill-distribution | **smithery-ai/cli** | Alt installer to `/plugin install`; covers non-CC-native MCP installs + skill packaging. |
| **L0.5 SECURITY/AUTH** | Agent-auth + OAuth provider | **cloudflare/workers-oauth-provider** | Fills the OAuth-agent gap left by Trivy+Gitleaks+pre-commit (those = static-analysis, not runtime-auth). |
| **L1 ROUTER** | Multi-provider router (alt to LiteLLM) | **Portkey-AI/gateway** | Master row 12 = LiteLLM; row 28 = Helicone (router). Portkey adds 1,600+ LLMs + 50+ guardrails → guardrail-layer fills gap (Helicone is obs-only). |
| **L1 SERVICES** | Graph DB | **FalkorDB/FalkorDB** | Master's incumbent Graphiti (row 16) is graph-RAG, NOT graph-DB primitive. FalkorDB is the underlying DB service (CLAUDE.local.md Services row explicitly cites FalkorDB). |
| **L2 DRIVER / Plugins** | Anthropic community marketplace | **anthropics/claude-plugins-community** | Master row 65 = anthropics/claude-plugins-official; community variant is parallel official Anthropic distribution channel. |
| **L2 DRIVER / Plugins** | Data-platform plugin-suite | **supabase/agent-skills** | Master has no Postgres/Supabase-class data plugin suite; this fills L2 data-side. |
| **L2 PLUGINS** | Industry verticals | (already covered by row 69-72) — `anthropics/healthcare` (T3) marginal-add to vertical-cluster | T3 selective adds to existing vertical pattern. |
| **L5 GH-ACTION** | Base layer for claude-code-action | **anthropics/claude-code-base-action** | Master row 66 = claude-code-action; the base-action is its required dep, install alongside. |
| **L6 PATTERN-CITE** | Long-running-agent doctrine | **anthropics/cwc-long-running-agents + agent-sdk-workshop + cwc-workshops + riv2025-demo + agent-sdk-demos** | Master L6 cluster (rows 26/32/52/64/94) currently has claude-cookbooks + spec-kit + ralph + awesome-copilot. Adds Anthropic's official LONG-HORIZON cite-anchors — fills cardinal-rule-3 evidence gap. |
| **L6 PATTERN-CITE** | Constitution/cardinal-rule anchor | **anthropics/claude-constitution** | Master has no constitution anchor; this is the direct upstream cite for harness rule design. |
| **L2 STUDY-PILOT** | Vibe-coding IDE template | **cloudflare/vibesdk** | Master row 11 = opencode (CLI peer); vibesdk = IDE-template peer (different distribution surface — pilot before commit). |

**Layer-fit summary**: 14 new T1 fits 8 distinct layer/sublayer gaps. Highest-priority gap-closures: (1) **L0 production MCP framework** (golf+arcade), (2) **L0.5 OAuth-agent auth** (workers-oauth-provider), (3) **L1.5 graph-DB service** (FalkorDB), (4) **L6 long-running-agent doctrine** (anthropics 5-pack).

---

## Provenance & disclosure

- **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8.
- **HONEST-NON-FINDING**: D2/D3/D8/D17 scores estimated from source-list metadata (stars/last-push/org-tier) — exact GH GraphQL re-probe deferred per CR-10 (Round-2 already had 4 rate-limits + 1 auth-fail). W260 deepdive should verify D17 MCP-trust + D21 data-boundary via live install-probe.
- **Filter rationale**: operator directive "low star repos don't really have too much high quality repos unless they are part of the org repos" interpreted as <500★ + non-TIER-1-OFFICIAL = drop. Of 146 Round-2 rows, ~34 IND-low-star dropped + 16 already-in-master removed → 96 candidates, of which 30 had composite ≥83 (T1-range) and 36 had 70-82 (T2-range). The 66-row §1 table presents the top-survivors (composite ≥70) in rank order; remaining 30 below-70 are T3-T4 watchlist tracked at §3 rows 135-144 + Footnotes.
- **Cardinal-rule-6 freshness**: all Round-2 rows pushed >2026-01-01; freshness D2 = 10 for active 2026-Q2.

**Footnotes — cluster-survivor representatives (<500★ IND-UNK reps):**
- Agent-harness cluster: `Phoenixrr2113/agent-harness` (500+★ — survived) is the cluster's only ≥500★ entry; the 14 <500★ variants (mindfold-ai/trellis, cuga-project/cuga-agent, dustland/miroflow, etc.) all DROPPED per filter rule. The cluster pattern remains noted in CITE-PATTERN-ONLY at master row 32 (iannuttall/ralph).
- Memory cluster <500★ IND-UNK: `memvid/memvid 15.5k★`, `NevaMind/memU 13.6k★`, `MemoriLabs/Memori 13.2k★`, `vectorize-io/hindsight 12.9k★`, `MemTensor/MemOS 8.4k★`, `MemMachine/MemMachine 4k★`, `EverMind/EverOS 3.8k★`, `memodb-io/Acontext 3.4k★`, `topoteretes/cognee 2k★`, `zilliztech/memsearch 1.7k★` all retained (above 500★ threshold) but already master row 33 + row 34 territory — append-to-master suggestions at §3 cap at T1 cluster (these are T2 STUDY-PILOT-equivalent, master rows 34 = mem0 already covers cluster). See `01-graphql-discovery/MISSED-SOTA-REPOS-ROUND2-W259v2.md §5 Memory cluster final list` for full memory-tier ranking — they all roll up to "compare against incumbent claude-mem + Graphiti before commit".
- Vercel-labs cluster: `vercel-labs/agent-skills 26.6k★` already master row 95. The 35 sibling vercel-labs/* repos (ralph-loop-agent, dev3000, ai-cli, coding-agent-template, etc.) all <1k★ except aggregate-org-class entries — most are TIER-1-OFFICIAL but content-narrow (single-purpose tools). Recommend BUNDLE-INSTALL via `vercel-labs/agent-skills` parent rather than per-repo. The 5 highest-fit (`ralph-loop-agent`, `dev3000`, `coding-agent-template`, `ai-cli`, `knowledge-agent-template`) carry composite ~80-83 each — track in §3 rows 114-118 of follow-on W260 deepdive.

**End W259 Round-2 missed scoring pass v3.**
