# W258 — Final SOTA Agent-Runtime Architecture Synthesis (v3 — codex GPT-5.5 + r30/r31/r32/r33 patches applied · Anthropic-Q1/Q2 official primitives integrated)

> **2026-05-16 · Confidence 0.91 → 0.93 post-Q2-frontier-integration · 22-axis convergence over 33+ source-family rounds · ship-readiness 9.5/10 post-revision**
> Audit class: TIER-3-LOCAL-COMPOSITION. Primary sources cited per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8.
> Cross-model gate satisfied: codex GPT-5.5 audit at `Z:/claude-sota-installed/.claude/state/codex_consult_w258_e2e_audit_OUT.txt` (verdict NEEDS-REVISION → APPROVE-SHIP-v2 → NEEDS-REVISION-FOR-Q2-FRONTIER → APPROVE-SHIP-v3).
> v3 patch sources: r30 (codex follow-ups resolved), r31 (Q2 frontier scan), r32 (programmatic prompting), r33 (Anthropic Q1/Q2 blog deep).

---

## §0 Executive Summary

After 33+ parallel research rounds covering 22 distinct source families plus a final-sweep + V5-kit-missed probe + adversarial GPT-5.5 audit + Q1/Q2-2026 frontier integration, the convergent verdict is: operator's existing Claude Code + 37-plugin + 12-MCP stack is **strongly aligned with Anthropic-published SOTA patterns** (CC + CLAUDE.md hierarchy + MCP + subagents + memory-persistence + simple-composable > frameworks). The previously-cited "~90%" figure is a W258r23 internal-audit estimate, **not an Anthropic-measured fact**. The architecture frontier is **substrate-extension via 1-2 validated MCP additions + a cross-model proxy + an evals-first CI-gate + a new L0.5 security/provenance layer + Anthropic-OFFICIAL Q2 primitives (Claude Managed Agents / Advisor tool / Tool search tool / Compaction API / Claude Code auto mode / Adaptive thinking)**, NOT a runtime replacement or harness rebuild.

**Top-3 immediate actions (v3 — Anthropic-OFFICIAL primitives prioritized):**

1. **REFRESH `AGENTS.md`** at repo root (operator HAS it already at 15K per r26) — sync with W258 AAIF conventions + the May 6 2026 Code with Claude announcements (zero new file; minutes-cost edit).
2. **Migrate `bypassPermissions: true` → Claude Code auto mode** (Mar 25 2026, Anthropic-OFFICIAL per r33) — safer skip-permissions semantics, cardinal-rule-9 reversibility-friendly. Highest-leverage operator-fit fix.
3. **Pilot Promptfoo on ONE critical flow** before broad install — strongest non-tool 4-T2 convergence (r6 + r21 + Anthropic Jan 9 2026 *Demystifying evals* blog post per r33), with the r30 §6 runnable `promptfooconfig.yaml`.

```
┌─────────────────────────────────────────────────────────────────────────┐
│  L7  TEAM UX                       SKIP — 1-agent operator (r16 + r24)  │
│  L6  PATTERN-CITE LAYER            iannuttall/ralph + P14 stall-detect  │
│                                    + Stripe Minions + ccpm/TandemKit    │
│                                    + DSPy compile-loop (r32 NEW)        │
│  L5  SCAFFOLD (use-bounded, 3-way) Claude Managed Agents (NEW, beta)    │
│                                    /  live-SWE-agent  /  mini-SWE-agent │
│                                    [Windows = WSL2 required; r30+r33]   │
│  L4  EVAL/OBSERVABILITY            Phoenix ✓  +  Promptfoo (pilot)      │
│  L3  PEER CLI                      opencode + goose (stage; one first)  │
│                                    + `ant` CLI watchlist (NEW r33)      │
│  L2  DRIVER                        Claude Code + 37 plugins (have) ✓    │
│                                    + REFRESH AGENTS.md (exists at 15K)  │
│                                    + Claude Code auto mode (NEW r33)    │
│  L1  CROSS-MODEL PROXY             LiteLLM (5-tier validated r30 YAML)  │
│                                    + codex CLI (separate Path P gate)   │
│                                    + Advisor tool API (NEW r33)         │
│  L0.5 SECURITY / PROVENANCE        path allowlist + MCP source-verify   │
│                                    + sandbox + secrets boundary +       │
│                                    AAIF founding-three (MCP+goose+AGENTS.md)
│  L0  SUBSTRATE                     MCP everywhere (AAIF foundation)     │
│        ├── Memory:        Graphiti ✓ (+ mem0 alt T2 + Managed Agents    │
│        │                  Memory beta NEW r33)                          │
│        ├── Code intel:    Serena + Repomix + GitNexus + Ruff ✓          │
│        │                  + ast-grep NEW (AST-codemod, r29) T1          │
│        ├── Cost lever:    rtk-ai/rtk NEW (60-90% token tree-shake) T1   │
│        ├── Browser/GUI:   Playwright + Chrome-devtools ✓                │
│        ├── Eval/observ:   Phoenix ✓                                     │
│        ├── ADD (T2):      Filesystem (reference-grade, path-allowlist)  │
│        ├── ADD (T1):      Tavily OR Firecrawl (live web search)         │
│        ├── ADD (T2):      Sentry MCP (getsentry-OFFICIAL, conditional)  │
│        ├── ADD (T1-PyPI): semgrep-mcp (via pipx — r30 correction)       │
│        ├── STUDY-PILOT:   zilliztech/claude-context (vector code MCP)   │
│        ├── ADD (T2):      NVIDIA garak (LLM red-team CLI)               │
│        └── Anthropic API: Tool search tool GA (canonical MCP-flood fix) │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## §1 Methodology

The audit pipeline follows the 5-phase SOTA-convergence-audit framework codified at `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`:

- **R1 multi-source ≥4 discover** — 22+ source families probed (exceeded ≥4 mandate 5×; r1-r25 + r27 final-sweep + r29 V5-missed + r30-r33 Q2 patches).
- **R2 7-Probe-DAG harness-fit verify** — per-candidate count-over / SDK-vs-CLI / architectural-API / plugin-namespace / mode-harness-shape / direct-blockers / demand-gate split.
- **R3 ≥3-distinct-orgs Axis-1+2+3 convergence** — multi-org SOTA cites + ≥2 named-T2 dated artifacts + ≥3 months stability OR STRONG-PROVENANCE-EXPRESS.
- **R4 SRA D1-D10 use-class-precise scoring** — license-use-class precision + freshness gate + maintainer provenance + active-maintenance + use-class compatibility + Anthropic-CC alignment + industry adoption + failure-mode awareness + replacement viability.
- **R5 CR-12 6-class disposition** — GENUINELY-NEW / DUPLICATE / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL.

**Cross-model gate satisfied:** Path P (orchestrator-direct codex exec foreground+tee) — codex GPT-5.5 verdict file at `Z:/claude-sota-installed/.claude/state/codex_consult_w258_e2e_audit_OUT.txt`. NEEDS-REVISION → APPROVE-SHIP-v2 → NEEDS-REVISION-FOR-Q2-FRONTIER → APPROVE-SHIP-v3 after applying P0/P1 + r30/r31/r32/r33 patches.

---

## §2 Operator Profile

CRITICAL for architecture fit per r16 — generic SOTA ≠ operator-fit SOTA:

- **Platform:** Windows 11 Pro, Z:\ portable install at `Z:/claude-sota-installed/`
- **Driver:** Claude Code CLI + Opus 4.7 (1M context) daily — **Fast mode now Opus 4.7 default** (May 12 2026 release per r31; was 4.6)
- **Shell:** **PowerShell default-enabled on Windows** (Bedrock/Vertex/Foundry per Claude Code May 2026 update per r31) — confirmed operator-relevant
- **Subscription:** Anthropic Pro/Max ($200/mo) — covers operator's load
- **Installed:** 37 plugins enabled (from 12 marketplaces) + 12 MCP servers
- **Scale:** Solo developer; ~10K Sonnet + ~1K Opus tasks/month (per r25 model)
- **Cross-model:** codex CLI (GPT-5.5 via openai-codex plugin) for Path P consensus
- **Settings:** `bypassPermissions` default + `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` + 1M context band (MIGRATE per §6 to Claude Code auto mode + server-side Compaction API per r33)
- **Plugin dep enforcement** now active in Claude Code (May 2026 release per r31) — operator's 37-plugin set affected; deferred plugins now properly disabled.
- **Worktree background isolation** (`worktree.bgIsolation: "none"`) — new setting available per r31 for repos where worktrees are impractical on operator's Z:-portable setup.

**Windows-specific execution caveats — CRITICAL r30+r33 finding:**

> SWE-bench-Live announcement explicitly states: **"none of SWE-agent, OpenHands, and ClaudeCode can run on Windows containers"** — they built `Win-agent` purpose-built for Windows benchmarking only. (r30 §4)

- Docker on Windows requires WSL2 backend; volume mount path-handling differs from Linux/macOS
- mini-SWE-agent install: requires WSL2 distro + `/mnt/z/` mount per r30 §5; NOT Windows-native
- Live-SWE-agent's 79.2% Verified is on Linux containers — operator must use WSL2 or remote Linux to run unattended
- Lower-friction alternative: use GitHub Actions for headless CI runs to sidestep Windows-local install
- **HIGHEST-CONVENIENCE:** Use **Claude Managed Agents** (Apr 8 2026 beta, r33) — Anthropic hosts the sandbox; no Windows/Linux container concerns for operator

**Operator-fit implication:** team-UX layer (multica kanban), durable-execution layer (Temporal/Inngest), and self-host inference all OVER-BUILT for this profile per r16 + r24 + r25. Architecture must be skinnier than generic SOTA. **codex critique on install appetite:** 8 immediate T1 installs is too aggressive for a Windows operator with 37 plugins/12 MCPs already — staged adoption with reversible pilots is the right shape.

---

## §3 Convergence Scorecard (22+ axis matrix)

| Component | Axes hit | Verdict |
|---|---|---|
| **Claude Code + plugins** (driver) | r1+r3+r5+r6+r7+r10+r12+r23+r33 = **9/33** | **DEFINITIVE — keep as-is** |
| **MCP** (substrate) | r1+r3+r7+r10+r14+r15+r17+r23+r33 = **9/33** + ubiquitous | **DEFINITIVE — strongest signal of study** |
| **AGENTS.md (REFRESH)** | r7+r14+r22+r23+r26 (already at 15K) | **TIER-1 — REFRESH (zero-cost concrete)** |
| **Claude Managed Agents** (beta, NEW r33) | r33 Apr 8 2026 Anthropic-OFFICIAL | **NEW — TIER-1 L5 alternative (Anthropic-OFFICIAL beats self-host where available)** |
| **Tool search tool** (GA Feb 17, NEW r33) | r33 = canonical MCP-context-flood fix | **TIER-1 — supersedes "code-execution-with-MCP" framing** |
| **Claude Code auto mode** (Mar 25, NEW r33) | r33 = safer bypassPermissions | **TIER-1 — operator-fit migration** |
| **Adaptive thinking** (Feb 5 GA, NEW r33) | r33 = supersedes `budget_tokens` | **TIER-1 PATTERN — replace manual budget_tokens** |
| **Server-side Compaction API** (Feb 5 beta, NEW r33) | r33 = supersedes client-side autocompact | **TIER-1 — replaces CLAUDE_AUTOCOMPACT_PCT_OVERRIDE env relic** |
| **Advisor tool** (Apr 9, NEW r33) | r33 = executor+advisor mid-generation pair | **TIER-1 PATTERN — plan/execute at API level** |
| **Anthropic native structured outputs** (`output_config.format` + `strict:true`, NEW r32) | r32 GA across Opus 4.7/4.6/Sonnet 4.6/Haiku 4.5 | **TIER-1 PATTERN — replaces Instructor/BAML/Mirascope** |
| **LiteLLM** (cross-model proxy) | r3+r7+r10+r11+r13+r17+r25+r30 = **8/33** | **TIER-2 INSTALL** (validated YAML in r30 §1) |
| **opencode** (peer CLI) | r1+r2+r6+r11+r12 (DHH)+r15 = **6/33**, 160,923 stars verified live | **TIER-1 candidate — DHH-endorsed; install one peer-CLI first** |
| **Block goose** (peer CLI + scaffold pattern) | r1+r7+r12+r15 (Stripe-Minions-fork) = **4/33** | **TIER-1 candidate — Stripe-Minions production via fork-of-goose** |
| **`ant` CLI** (NEW r33) | r33 Apr 8 2026 Anthropic-OFFICIAL | **WATCHLIST — peer to codex/opencode/goose** |
| **Live-SWE-agent** (academic SOTA scaffold) | r8+r15 (79.2% Verified MIT)+r30 (Windows caveat) = **3/33** | **WATCHLIST — WSL2 required; Verified now caveated by SWE-Bench Pro contamination finding r31** |
| **mini-SWE-agent** (minimalist scaffold) | r2+r15+r30 (WSL2 required) = **3/33** | **WATCHLIST — 100 LOC MIT; GitHub Action alternative** |
| **OpenHands** (formerly L5 pick) | r1+r3 + **r5 REFUTED by r15** + r12 zero-HN-footprint | **DOWNGRADE — top entry rank ~25 (73.8%); not SOTA scaffold** |
| **Phoenix** (observability) | already-installed + r3+r21+r23 = **3/33** + INSTALLED | **KEEP** |
| **Promptfoo** (eval CI-gate) | r3+r21+r6's 4-T2+r33's Jan 9 Anthropic blog | **TIER-1 PILOT — zero overlap with Phoenix; r30 §6 runnable config ready** |
| **mem0** (memory) | r3+r11+r17 = **3/33** | **TIER-2 INSTALL (when memory > CLAUDE.md)** |
| **Managed Agents Memory** (beta Apr 23 NEW r33) | r33 Anthropic-OFFICIAL | **WATCHLIST — alternative to mem0/Graphiti when Managed Agents adopted** |
| **claude-code-action** (CI) | r3+r17 (Anthropic-OFFICIAL) = **2/33** | **TIER-2 — if GH Actions** |
| **Code-execution-with-MCP** (pattern) | r23 Anthropic Nov 2025 → **SUPERSEDED r33** by Tool search tool | **DEPRECATED — use Tool search tool instead** |
| **P14 stall-detection** (Magentic-One) | r9 + Anthropic durable-execution = **2/33** | **TIER-1 PATTERN (~50 LOC)** |
| **Extended Thinking dial** (`thinking:{type:"adaptive"}`, GA r33) | r27+r33 GA Feb 5 | **TIER-1 PATTERN — first-class reasoning escalation** |
| **DSPy compile-loop** (PATTERN-CITE, r32) | r32 (34.3k MIT daily-active) | **PATTERN-CITE — prompt-optimization-at-scale reference** |
| **ast-grep** (AST-codemod) | r29 (13.8k★ MIT) | **TIER-1 INSTALL — fills semantic-grep slot** |
| **rtk-ai/rtk** (token tree-shake) | r29 (MIT Rust, 60-90% reduction) | **TIER-1 INSTALL — closes r13 cost gap** |
| **zilliztech/claude-context** (vector code MCP) | r29 (11.1k★) | **STUDY-PILOT vs Repomix before commit** |
| **iannuttall/ralph** (ralph-dag origin) | r27 (primary-source origin; Archon implements) | **PATTERN-CITE — correct attribution** |
| **aattaran/deepclaude** (DeepSeek CC backend) | r27 ("Same UX, 17× cheaper") | **PATTERN-CITE — install reference for L1 cascade** |
| **Mastra.ai** (TS agent framework) | r27 | **WATCHLIST — pairs with agent-sdk-dev plugin** |
| **Filesystem MCP** | r17 reference-grade (not production-ready per README) | **TIER-2 conditional — path allowlist required** |
| **Sentry MCP** | r17 (getsentry-OFFICIAL, not Anthropic-OFFICIAL) | **TIER-2 conditional — install if active Sentry projects** |
| **`semgrep-mcp` PyPI** (NEW r30 correction) | r30: codex audit was misleading — repo archived but **function lives on as PyPI package**; install via `pipx install semgrep-mcp` | **TIER-2 INSTALL via PyPI (NOT GitHub clone)** |
| **Langfuse** | r3+r10+r11 → r21 says SKIP for solo operator | **DEFER — install at >10 RPS or >3 concurrent CC** |
| **Archon** (harness) | r1 single-author + Anthropic May 6 *Claude Code Routines* primitive likely supersedes per r31 | **PATTERN-CITE-OR-MIGRATE — see Claude Code Routines (r31)** |
| **multica** | r1+r6 + r16 + r30 LICENSE inspection ("modified Apache 2.0 with SaaS+branding restrictions") | **HARD REJECT — not commercial-safe** |
| **BMAD-METHOD** | r29 (46k★ but heavy install collides) | **REJECT-FOR-FIT per r16 over-build** |
| **claude-task-master** | r29 (27k★ but context-flood risk) | **DEFER** |
| **claude-flow / ruflo** | r1 stars only; r9 swarm 0/3 axes + r6 zero T2 + r7 zero prod | **REJECT** |
| **AutoGen** | r4 stale + r7 maintenance + r10 deprecated + r12 post-mortems | **REJECT** |
| **LangChain** | r12 multiple post-mortems | **REJECT** |
| **Devin standalone** | Cognition Jan 2026 pivot admits autonomy under-delivered | **REJECT** |
| **Roo Code** | r2 archived 2026-05-15 | **REJECT** |
| **Instructor / BAML / Mirascope** (3rd-party typed-output) | r32 — Anthropic native now SOTA for Claude work | **REJECT for Claude-API work** |
| **LMQL / TextGrad** | r32 — 10-12 months stale | **REJECT** |
| **Outlines / Guidance** | r32 — logit-bias n/a on Claude API | **REJECT for Claude API** |
| **M&A signal:** Salesforce → Convergence.ai May 15 (r31) | r31 adjacent | **Ecosystem signal only — closed-source consolidation** |

---

## §4 The Architecture (9 layers — L0.5 added per codex audit; L5 now 3-way per r33)

### L0 — SUBSTRATE: MCP everywhere

Per r14 + r15 + r33: MCP has crossed the production-adoption threshold at ≥8 top-tier orgs (Anthropic, OpenAI, Microsoft, Google, AWS, Cloudflare, Vercel, Stripe — primary-source verified) and is governed by Linux Foundation AAIF (Dec 9 2025 donation). Operator's 12-MCP install is correct shape.

**Anthropic Feb 17 2026 GA: Tool search tool** (r33) — structural fix for "12-MCP context flood" via dynamic tool loading from large catalogs. **This SUPERSEDES the r23 "code-execution-with-MCP" pattern** as the canonical Anthropic-OFFICIAL approach.

**ADD (Tier-1):**
- `tavily-ai/tavily-mcp` OR `firecrawl-dev/firecrawl-mcp` — live web search (operator only has docs+repo search via context7+deepwiki)
- **`ast-grep/ast-grep`** (13.8k★ MIT, r29 ADOPT-NOW) — AST-pattern codemod slot W258 missed; adds semantic-grep capability beyond Repomix's text grep. Native CLI, optional MCP wrap.
- **`rtk-ai/rtk`** (MIT Rust, r29 ADOPT-NOW) — 60-90% token reduction per Bash call (closes r13 cost gap). Drop-in wrapper around shell calls in CC.
- **`semgrep-mcp`** via **PyPI** (`pipx install semgrep-mcp`) — r30 §2 PRIMARY-SOURCE correction to codex audit: the GitHub repo is archived, but the canonical function moved to PyPI integrated into main `semgrep` binary. Install via `pipx install semgrep-mcp` then wire into `.mcp.json`. **NOT a dead project — install via PyPI, not GitHub clone.**

**ADD (Tier-2 — conditional per codex audit):**
- `modelcontextprotocol/servers/filesystem` — **reference-grade** (modelcontextprotocol/servers README explicitly states reference servers are *"educational examples, not production-ready"*). Install ONLY with path-allowlist + sandbox per L0.5; do NOT install if Bash already covers the workload.
- `getsentry/sentry-mcp` — **`getsentry`-OFFICIAL, optimized for Claude Code** (NOT Anthropic-official). Install only if operator has active Sentry projects.
- `mem0ai/mem0-mcp` — when memory needs exceed CLAUDE.md ($24M Series A market signal r11)
- `NVIDIA/garak` (Apache-2.0) — LLM vulnerability scanner CLI (operator's `.audit-garak/` dir shows prior interest)

**STUDY-PILOT (compare before commit):**
- `zilliztech/claude-context` (11.1k★, r29 STUDY-PILOT) — vector-embedding code MCP from Milvus team. Pilot vs operator's existing Repomix before committing; may complement rather than replace.

**AVOID:**
- `e2b-dev/mcp-server` — DEPRECATED per repo banner (r17)
- `modelcontextprotocol/server-postgres` + `server-sqlite` — ARCHIVED → use Neon or Neo4j MCPs instead

### L0.5 — SECURITY / PROVENANCE / PERMISSION (codex audit missing-component fix; r33 confirms)

Operator runs `bypassPermissions` default — **MIGRATE to Claude Code auto mode (Mar 25 2026, Anthropic-OFFICIAL per r33)** for safer skip-permissions semantics. Codex audit P0/P1 verdict: **before adding any new MCP, install a first-class security layer.** Anthropic's Apr 8 Managed Agents post (r33) explicitly endorses this layer: *"Credentials are never reachable from the sandbox... bundling auth with resources... using MCP proxies that fetch credentials from external vaults."*

**Required disciplines:**

1. **Path allowlist policy for filesystem MCP + Bash:**
   - Filesystem MCP must be restricted to `Z:/<project>/` only — never root drive
   - Bash command allowlist already covers `git/mkdir/rm/mv/navigation` per context-mode policy
   - Pair `bypassPermissions: true` (or new Claude Code auto mode) with strict `permissions.deny` glob list (operator's settings.json already denies `.env*` / `id_rsa` / `id_ed25519` / `*.pem` / `*.pfx` / `*.key` / `secrets/**` — extend this list as new MCPs add file-read surface).

2. **Secrets boundary:**
   - Existing deny list is correct shape — extend to cover `.aws/`, `.ssh/known_hosts`, `*.kdbx`, `tokens.json`, any tool-specific credential file.
   - Add `Z:/claude-sota-installed-state/.codex/` and `.claude.json` to deny if they contain auth state.

3. **MCP server source verification (provenance):**
   - Probe **official MCP Registry** at `https://github.com/modelcontextprotocol/registry` FIRST
   - Cross-check **Smithery.ai** if relevant
   - Verify maintainership badge + last-commit date + LICENSE file before any install
   - **Reject archived/abandoned** (semgrep/mcp lesson learned — but per r30 §2, verify upstream/PyPI before rejecting; sometimes function moves while repo archives)

4. **Update policy:**
   - Pin MCP server versions in `.mcp.json` (operator already does this — see `playwright_pin` / `serena_pin` / `repomix v1.14.0` / `gitnexus@1.6.4-rc.112`)
   - Review changelog before bump; never use `@latest` for any L0 substrate primitive

5. **Sandbox requirements for any code-execution pattern:**
   - Tool search tool (Anthropic GA Feb 17 per r33) is the **canonical Anthropic-OFFICIAL approach** for dynamic tool loading; preferred over code-execution-with-MCP
   - If using code-execution-with-MCP: path/data policy declared + resource limits (CPU/mem/network) + monitoring to Phoenix
   - Do not adopt in operator's existing repo without prior pilot in throwaway sandbox

6. **Claude Code auto mode (Mar 25 2026 — r33 NEW Anthropic-OFFICIAL):**
   - **Replaces blanket `bypassPermissions:true`** with safer scoped invocation
   - Pair with strict allowlist (above) for defense-in-depth
   - Document the pairing in CLAUDE.md cardinal-rule line so future maintainers don't loosen it

7. **AAIF founding-three alignment** (r14 + r33):
   - **MCP** (substrate) — operator has 12 servers ✓
   - **goose** (peer CLI / pattern source) — install one peer CLI (opencode first per r12 DHH endorsement)
   - **`AGENTS.md`** (cross-tool config) — REFRESH the existing 15K file per r26

### L1 — CROSS-MODEL PROXY: LiteLLM (validated) + codex CLI (separate) + Advisor tool (NEW r33)

**codex audit P0 correction + r30 §1 validation:** codex CLI is **NOT a LiteLLM model provider** — it's a separate external verification command. The two play different roles:

- **codex CLI** = cross-model **consensus/verification** (Path P cardinal-rule-3 gate). Dispatched via `codex exec` foreground+tee in operator's existing pattern. NOT routed through LiteLLM.
- **LiteLLM** = cross-model **cascade routing** for cost optimization. Routes API calls only.
- **Advisor tool API** (Apr 9 2026 Anthropic-OFFICIAL beta `advisor-tool-2026-03-01` per r33) = **first-class plan/execute decoupling at the API level** — pair faster executor with higher-intelligence advisor mid-generation. NEW peer to codex Path P.

**Validated 5-tier LiteLLM cascade (r30 §1 — primary-source verified against current LiteLLM docs):**

```yaml
# LiteLLM 5-tier cost-aware cascade — W258r30 validated 2026-05-16
# CAVEATS:
# - claude-haiku-4-5 not in LiteLLM catalog at fetch; use exact dated string from
#   docs.anthropic.com/en/docs/about-claude/models or wait for catalog refresh.
# - DeepSeek V4 Anthropic-format endpoint = ENV-level base_url swap, NOT a LiteLLM
#   provider entry. See pattern below.
# - codex CLI is NOT routed through this config (separate Path P subprocess).

model_list:
  # Tier 1 — cheapest (drafting, classification, summarization)
  - model_name: tier1-haiku
    litellm_params:
      model: anthropic/claude-haiku-4-5-VERIFY-EXACT-DATED-STRING
      api_key: os.environ/ANTHROPIC_API_KEY
      rpm: 1000

  # Tier 2 — default Sonnet
  - model_name: tier2-sonnet
    litellm_params:
      model: anthropic/claude-sonnet-4-6
      api_key: os.environ/ANTHROPIC_API_KEY
      rpm: 500

  # Tier 3 — Opus for hard tasks
  - model_name: tier3-opus
    litellm_params:
      model: anthropic/claude-opus-4-6-20260205
      api_key: os.environ/ANTHROPIC_API_KEY
      rpm: 100

  # Tier 4 — GPT-5.5 for cross-provider verification
  - model_name: tier4-gpt55
    litellm_params:
      model: openai/gpt-5.5
      api_key: os.environ/OPENAI_API_KEY
      reasoning_effort: high
      rpm: 100

  # Tier 4.5 — GPT-5.5 Instant (NEW per r31, May 5 2026 — new ChatGPT default)
  - model_name: tier4-gpt55-instant
    litellm_params:
      model: openai/gpt-5.5-instant
      api_key: os.environ/OPENAI_API_KEY
      rpm: 200

  # Tier 5 — DeepSeek cheap escape valve (NOT for multimodal/MCP-native paths)
  - model_name: tier5-deepseek
    litellm_params:
      model: deepseek/deepseek-chat
      api_key: os.environ/DEEPSEEK_API_KEY
      rpm: 200

litellm_settings:
  # Cascade: Haiku → Sonnet → Opus → GPT-5.5 → DeepSeek (NEVER fall back to DS for multimodal)
  fallbacks:
    - tier1-haiku: [tier2-sonnet]
    - tier2-sonnet: [tier3-opus]
    - tier3-opus: [tier4-gpt55]
    - tier4-gpt55: [tier5-deepseek]
  num_retries: 2
  context_window_fallbacks:
    - tier1-haiku: [tier2-sonnet, tier3-opus]   # 1M ceiling

router_settings:
  routing_strategy: usage-based-routing
  model_group_alias:
    sota-default: tier2-sonnet
    sota-deep: tier3-opus
    sota-cheap: tier1-haiku
    sota-verify: tier4-gpt55
    sota-instant: tier4-gpt55-instant
    sota-escape: tier5-deepseek
  num_retries: 2
  timeout: 60
```

**DeepSeek Anthropic-format pattern (NOT a LiteLLM tier — use ENV swap per r30 §1):**

```powershell
# For raw CC → DeepSeek (multimodal + MCP-native paths NOT supported per DeepSeek docs):
$env:ANTHROPIC_BASE_URL = 'https://api.deepseek.com/anthropic'
$env:ANTHROPIC_API_KEY  = $env:DEEPSEEK_API_KEY
# Reversible: `Remove-Item Env:ANTHROPIC_BASE_URL` to revert to native Anthropic.
```

**DeepSeek V4 Anthropic-format endpoint caveats (codex audit P1 — primary-source verified r30):**

DeepSeek's `api.deepseek.com/anthropic` endpoint is **Anthropic-format compatible for text/tool-call paths ONLY**. Per DeepSeek's own docs, the endpoint **does NOT support Claude-native blocks**:

- images / documents / multimodal content
- web search results / code execution results
- MCP tool blocks / MCP server fields

**Do NOT route multimodal or MCP-native CC tasks through DeepSeek.** Restrict cascade routing to text-completion + tool-call workloads only. **Add data-residency + ToS review** before routing private repo prompts through any external provider including DeepSeek.

**Reference implementation:** `aattaran/deepclaude` (r27) — concrete DeepSeek V4 Pro CC backend wrapper *"Same UX, 17× cheaper"*. Use as install-reference; verify Anthropic-format compat with current DeepSeek API contract before adoption.

### L2 — DRIVER: Claude Code + 37 plugins + REFRESH AGENTS.md + Claude Code auto mode

Operator's current driver is correct shape. Anthropic-internal teams use exactly this shape (r23 + r33 Mar 24 harness-design post). 9/33 axes confirm.

**REFRESH `AGENTS.md`** at repo root (r26 found it already exists at 15K — change from prior v1 "ADD" wording to **REFRESH**). 4-axis convergence (r7 + r14 + r22 + r23). AGENTS.md is part of the AAIF founding-three (MCP + goose + AGENTS.md). Stripe, Spotify, Shopify all use it for cross-tool config sharing (CC + opencode + goose + codex all read it). Action: sync existing file's content with W258 AAIF conventions + the May 6 2026 Code with Claude announcements (Remote Agents / Routines / Managed-agent orchestration / Advisor tool / CI auto-fix); no new file write needed.

**Migrate to Claude Code auto mode (Mar 25 2026 NEW r33):**

```powershell
# OLD (operator's current settings.json):
#   "permissions": { "defaultMode": "bypassPermissions" }
# NEW (safer per Anthropic Mar 25 2026 blog post):
#   "permissions": { "defaultMode": "auto" }
# Per Anthropic: "a safer way to skip permissions" — scoped invocation vs blanket bypass.
# Pair with strict permissions.deny list per L0.5 for defense-in-depth.
```

**Plugin set already optimal** per r23 — keep `superpowers` (TDD / verification / systematic-debugging / writing-skills / subagent-driven-development / dispatching-parallel-agents) + `intelligent-compact` + `pr-review-toolkit` + `code-review` + `agent-teams` + `engineering-skills` + `frontend-design`.

**Plugin dep enforcement** (Claude Code May 2026 release per r31) — operator's 37-plugin set will auto-validate dependency chains; surfaces any broken/deferred plugins.

**Marketplace overlap audit pending** (per r22 anti-pattern #4 — see §6 fix).

### L3 — PEER CLI: opencode + Block goose (staged adoption) + `ant` CLI (watchlist)

**codex audit anti-pattern flagged:** installing both opencode and goose immediately may create tool sprawl for a solo operator. **Install ONE first** unless provider-redundancy is an active need. Recommended order: opencode first (DHH endorsement + stronger T2 convergence), goose later only if pattern-cite from Stripe Minions becomes a load-bearing reference.

- **`anomalyco/opencode`** (formerly `sst/opencode`) — **160,923★ MIT (primary-source verified r15)**, pushed 2026-05-16; 6-axis convergence; **DHH publicly endorsed it Jan 7 2026** (r12). Install via `npm install -g opencode-ai`.
- **`aaif-goose/goose`** (formerly `block/goose`) — 45,271★ Apache-2.0, Linux Foundation AAIF foundation-grade Dec 9 2025; **Stripe Minions (>1,000 PRs/wk Stripe-blog-confirmed; 1,300 from named-engineer Steve Kaliski podcast — secondary-source) is a FORK of goose**. Install via `https://block.github.io/goose/` installer.
- **`ant` CLI (NEW r33, Apr 8 2026)** — Anthropic-OFFICIAL command-line client with YAML resource versioning + native CC integration. **Watchlist** — peer to codex/opencode/goose; characterize on next probe.

This staged install is *insurance* against r11's Anthropic OpenClaw-subscriber-ban precedent (Apr 2026). Provider-redundancy is production-grade hygiene **once you need it** — solo operator may not need it yet.

### L4 — EVAL / OBSERVABILITY: Phoenix + Promptfoo (pilot first)

r21 resolved r16's DRY critique cleanly:
- Phoenix ↔ Langfuse = substantial runtime-tracing overlap (r16 correct)
- Phoenix ↔ Promptfoo = **zero overlap** (different lifecycle: runtime trace vs CI-gate eval)

**Phoenix** (operator already installed) — runtime tracing via OTel; OpenInference project.

**Promptfoo (TIER-1 PILOT — codex-T1 reordered)** — declarative YAML CI-gate eval + LLM-as-judge + red-team. Project's GitHub description verbatim: *"Used by OpenAI and Anthropic."* **This is a project self-claim, not an independent vendor endorsement** — codex audit anti-pattern flag. Install via `npm install -g promptfoo`, but pilot on ONE critical flow before broad adoption.

**Anthropic Jan 9 2026 endorsement** (r33): Anthropic published *"Demystifying evals for AI agents"* — foundational concepts confirming r6's 4-T2 evals-first convergence. Promptfoo's CI-gate role aligns with Anthropic-recommended discipline.

**Concrete pilot config (r30 §6 — runnable on Windows):** see `Z:/claude-sota-installed/.claude/state/W258r30_codex_followups.md` §6 — `promptfooconfig.yaml` with 5 test cases (clear bug report / vague feature request / multi-cause incident / security-sensitive report / performance regression) running on `anthropic:messages:claude-sonnet-4-6`. ~60 LOC YAML + ~10 LOC CI. Gate at ≥80% pass rate.

**Defer Langfuse** until any of: (a) ≥3 concurrent CC instances, (b) production traffic >10 RPS, (c) prompt-versioning needs exceed git + CLAUDE.md. Also: Langfuse default port :3000 collides with OpenHands :3000 (r16) — port-allocation map needed before any future L4 scaling.

### L5 — SCAFFOLD (USE-BOUNDED, not daily-driver) — NOW 3-WAY CONTEST per r33

**MAJOR r33 revision:** L5 scaffold slot is now a **three-way contest**:

1. **Claude Managed Agents (Apr 8 2026, Anthropic-OFFICIAL beta — `managed-agents-2026-04-01` header)** — Anthropic-hosted scaffold. Stateless harness + sandbox-as-cattle + session-as-event-log + 60-90% time-to-first-token reduction per Apr 8 Anthropic eng blog. **For operator: PREFER this over self-host** per cardinal-rule-12 PRIMARY upstream-install priority. May 6 expansion: multiagent sessions + Outcomes + Webhooks + Vault credential refresh. Apr 23: persistent Memory beta.

2. **Live-SWE-agent (academic SOTA)** — 79.2% SWE-bench Verified on Opus 4.5 (r15 + r30 §4 primary-source-verified). MIT. **HOWEVER:** r31 found OpenAI+Anthropic confirmed **SWE-bench Verified contamination** (59.4% of hard tasks flawed) — Verified score is now caveated. Self-host requires Linux/WSL2 — fails on native Windows containers per r30 §4 SWE-bench-Live finding.

3. **OpenHands (Docker, use-bounded)** — best for fully-isolated overnight autonomous runs. Same Windows-container limitation as Live-SWE-agent. Round-5's 68.4% Verified claim was REFUTED by r15 primary-source audit.

**Benchmark contamination caveat (codex audit + r31 NEW):**
- **SWE-Bench Pro replaces Verified** — OpenAI + Anthropic now recommend Pro. Verified scores are saturated/contaminated 2026-Q2.
- Static-bench numbers do NOT reflect live-PR performance — pair any scaffold install with operator-domain pilot eval (Promptfoo regression suite on real tasks)
- Cite Pro numbers where available

**Anthropic-explicit guidance (r23 + r33 Mar 24 harness-design post):** *"Workflows > agents until you need agents."* Solo-developer daily work is workflow-class; don't default to L5 scaffold. Use-bounded triggers for installing a scaffold:

- **For unattended runs on operator's Windows-Z:-portable** → **Claude Managed Agents** beta (Apr 8 r33) — no Windows-container concerns; Anthropic hosts the sandbox; pair with Memory + Outcomes APIs
- **For Linux/WSL2-side benchmark-grade unattended Docker** → `live-SWE-agent` (79.2% Verified caveated; MIT). Pattern: `docker run` with workspace volume mount, pull from `OpenAutoCoder/live-SWE-agent` repo.
- **For embedded benchmarking / 100-LOC fork** → `mini-SWE-agent` (75.6%-76.8% Verified, MIT) — radical minimalism, easy to fork/embed. WSL2 required on Windows per r30 §5.
- **For batch CI parallel-fix runs** → keep claude-code-action + agent-teams plugins; no separate L5 install needed.

### L6 — PATTERN-CITE LAYER (do NOT install black-box)

Per r22 + r23 + r16 + r33: Anthropic explicitly recommends *"simple composable patterns > frameworks."* Adopt these AS PATTERNS in CLAUDE.md / skills / agents, not as installed third-party black boxes.

**MAJOR r31 reframing:** Anthropic's **Claude Code Routines** primitive (announced May 6 2026 Code with Claude keynote per r31) **likely SUPERSEDES the Archon ralph-dag PATTERN-CITE recommendation as a declarative workflow primitive at the API level**. Re-evaluate Archon adoption as Routines becomes available — operator should adopt Routines if/when it ships, and treat Archon as historical pattern reference.

Adopted patterns:

1. **`iannuttall/ralph` ralph-dag pattern** (r27 — **primary-source ORIGIN**; Archon implements it; Ralph is the carrier). PRD loop with `loop: until: ALL_TASKS_COMPLETE; fresh_context: true`. Author as `.claude/skills/ralph-dag/SKILL.md` (pattern, not the engine). **Migrate to Anthropic Claude Code Routines (per r31) when available** — Routines provides declarative-workflow at API level.
2. **P14 stall-detection + replan** (r9 — Magentic-One pattern) — outer-loop Task Ledger + inner-loop Progress Ledger + `stall_count > 2 → outer-loop-replan`. ~50 LOC adoption cost.
3. **Tool search tool** (Anthropic GA Feb 17 per r33) — **SUPERSEDES code-execution-with-MCP framing**. Dynamic tool loading from large MCP catalogs. **This is the Anthropic-OFFICIAL canonical fix to "12-MCP context flood"** — adopt as first-class API call, not custom pattern.
4. **Programmatic tool calling** (Anthropic GA Feb 17 per r33) — Claude calls tools from inside code execution. Adopt for batch operations on tool catalogs.
5. **Anthropic Mar 24 2026 harness-design pattern** (r33) — "3-agent (planner/generator/evaluator) pattern + sprint contracts + context-resets > compaction + concrete grading criteria" — **Anthropic-OFFICIAL ratification** of r9 P10 plan-execute decoupling + r22 context engineering + r29 TandemKit pattern-cite. Adopt as canonical multi-agent harness pattern.
6. **Stripe Minions fork-of-goose** (r15 verified) — production-pattern reference for autonomous PR-shipping at scale. Learn the architecture (one-shot end-to-end + classification + checkpointing); don't fork goose blindly.
7. **incident.io 12-parallel-reviewer pattern** (r7) — for high-stakes review consensus.
8. **Spotify Honk** (r7) — thin-wrapper-on-CC pattern. Spotify built 50+ features Q4'25-Q1'26 with no manual code.
9. **`ccpm` Issues-as-state pattern** (r29 PATTERN-CITE) — matches Stripe Minions r7 (GitHub Issues as agent task state).
10. **`TandemKit` Planner/Generator/Evaluator file-spec** (r29 PATTERN-CITE) — concrete implementation of Anthropic Mar 24 3-agent pattern (now ratified by Anthropic).
11. **`KARIMO` stall-detection + complexity-routing** (r29 PATTERN-CITE) — concrete implementation of P14 stall-detection + complexity-based routing.
12. **DSPy compile-loop pattern** (r32 NEW) — prompt-optimization-at-scale reference for >100-prompt eval-loops where prompt quality is bottleneck. Pattern only — don't install Stanford DSPy as a runtime layer; Anthropic native structured outputs cover the typed-output use-case.

### L7 — TEAM UX layer: SKIP for operator

`multica-ai/multica` (28.7k★) — **HARD REJECT per r30 §3 LICENSE inspection**: modified Apache 2.0 with material SaaS+branding restrictions. Operator's solo-dev internal use is permitted, but the license is incompatible with any commercial/hosted-service scenario and the branding clause makes it a non-starter for white-label use. **REJECT regardless of operator profile.**

Durable execution layer (Temporal / Inngest / LangGraph / Trigger.dev) per r24: **DO NOT ADD at operator's solo+5-task scale**. Crossover threshold: install only if concurrent agentic tasks >20 OR single task >6h wall-clock OR multi-host. Operator's existing `cron + ScheduleWakeup + JSON state files` is the right shape.

---

## §5 What to INSTALL (priority order — codex-T1 REORDERED + r33 Anthropic-OFFICIAL primitives prioritized)

**Codex audit operator-fit critique:** 8 immediate T1 installs is too aggressive for a solo Windows operator with 37 plugins / 12 MCPs already. **Stage adoption with reversible pilots; verify each before adding the next.**

### MCP Registry / Package Provenance Workflow (codex missing-component fix)

Before any MCP install:
1. Probe **official MCP Registry**: `https://github.com/modelcontextprotocol/registry` — preferred source
2. Cross-check **Smithery.ai** registry if relevant
3. Verify on the target repo: **maintainership badge** + **last commit < 90 days** + **LICENSE file present** + **issues/PRs activity**
4. **Verify PyPI / npm if repo archived** (r30 §2 lesson — semgrep-mcp's GitHub repo archived but PyPI package alive) — sometimes function moves while the legacy repo archives
5. Pin the version in `.mcp.json` per operator's existing discipline (no `@latest`)

### T1 — Install now (highest leverage; reversible; ZERO-COST or zero-cost-edit changes)

```powershell
# 1. REFRESH AGENTS.md — operator HAS it at 15K (r26); sync with W258 AAIF + Code with Claude 2026 conventions
#    Edit Z:/<your-project>/AGENTS.md to align with Linux Foundation AAIF founding-three docs
#    Add Code with Claude 2026 keynote references (Routines / Remote Agents / Managed-agent / Advisor)
#    Zero new file write; minutes-cost edit
#    Cite: https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation

# 2. MIGRATE bypassPermissions → Claude Code auto mode (Mar 25 2026 Anthropic-OFFICIAL per r33)
#    Edit Z:/claude-sota-installed/.claude/settings.json:
#      permissions.defaultMode: "bypassPermissions" → "auto"
#    Pair with strict permissions.deny list per L0.5
#    Zero new install; safer skip-permissions semantics; cardinal-rule-9 reversibility-friendly
#    Cite: https://www.anthropic.com/engineering/claude-code-auto-mode

# 3. Promptfoo PILOT — install + run on ONE critical flow first
npm install -g promptfoo
# Use the r30 §6 runnable promptfooconfig.yaml (5 test cases ready)
# Cite: W258r30_codex_followups.md §6 (runnable config) + Anthropic Jan 9 2026 evals blog

# 4. ast-grep — AST-codemod slot (r29 ADOPT-NOW)
#    Direct CLI install or via MCP wrap depending on workflow
#    Cite: https://github.com/ast-grep/ast-grep (13.8k★ MIT)

# 5. rtk-ai/rtk — token tree-shake (r29 ADOPT-NOW; 60-90% reduction per Bash call)
#    Install per repo README; integrate as Bash wrapper in CC
#    Cite: https://github.com/rtk-ai/rtk

# 6. semgrep-mcp via PyPI (r30 §2 correction — function lives on PyPI even though GitHub archived)
pipx install semgrep-mcp
# Wire into .mcp.json as MCP server
# Cite: https://semgrep.dev/docs/mcp

# 7. Migrate manual compact thresholds → server-side Compaction API (Feb 5 2026 beta per r33)
#    Test Compaction API in throwaway repo; if stable, remove CLAUDE_AUTOCOMPACT_PCT_OVERRIDE env
#    Cite: Anthropic Feb 5 2026 release notes

# 8. Migrate manual budget_tokens → adaptive thinking (Feb 5 GA per r33)
#    Replace any explicit budget_tokens in subagent prompts with:
#      "thinking": {"type": "adaptive"}
#    Cite: Anthropic Feb 5 2026 release notes
```

### T2 — Install conditional (after T1 validated; specific triggers)

```powershell
# 9. LiteLLM — install AFTER validating Haiku 4.5 exact model ID against Anthropic docs
pip install litellm[proxy]
# Use validated YAML from §4 L1 / r30 §1
# Reference: https://docs.litellm.ai/docs/providers/

# 10. Tavily OR Firecrawl MCP — live web search gap (pick one)
# Probe MCP Registry first; verify maintainership before install

# 11. opencode — peer CLI (after T1 validated; one of the two peer-CLIs first)
npm install -g opencode-ai

# 12. Filesystem MCP — reference-grade (NOT production-ready per README)
#    Install ONLY with path-allowlist per L0.5
#    Cite: https://github.com/modelcontextprotocol/servers (README disclaimer)

# 13. Sentry MCP — getsentry-OFFICIAL (NOT Anthropic-official)
#    Install ONLY if operator has active Sentry projects

# 14. claude-code-action — Anthropic-OFFICIAL CI (install if/when using GitHub Actions)

# 15. mem0 — memory upgrade (install when memory needs exceed CLAUDE.md)

# 16. NVIDIA garak — LLM red-team scanner (install if security workloads materialize)

# 17. Block goose — peer CLI #2 (install only if provider-redundancy becomes a real need)
# Follow https://block.github.io/goose/ installer

# 18. zilliztech/claude-context — STUDY-PILOT vs Repomix before commit (r29)

# 19. Claude Managed Agents beta — adopt when stable (Apr 8 2026 Anthropic-OFFICIAL)
#     API: managed-agents-2026-04-01 beta header
#     Pair with Memory beta (Apr 23) + Outcomes (May 6) + Webhooks (May 6)
#     This is the L5 scaffold for operator-fit Windows-friendly autonomous runs

# 20. WSL2 setup runbook — required for any Live-SWE-agent / mini-SWE-agent / OpenHands install
#     wsl --install ; map Z: into /mnt/z/ ; test scaffold install in known-good repo
```

### T3 — Pattern-cite only (do NOT install)

- **`iannuttall/ralph` ralph-dag pattern** (origin) — adopt as `.claude/skills/ralph-dag/SKILL.md` (Archon = derivative; migrate to Anthropic Claude Code Routines when available per r31)
- **P14 stall-detection** — ~50 LOC adoption as native skill
- **Tool search tool** (Anthropic GA Feb 17 r33) — adopt as first-class API call (supersedes code-execution-with-MCP pattern)
- **Anthropic Mar 24 harness-design pattern** (3-agent planner/generator/evaluator + sprint contracts + context-resets > compaction) — adopt as `.claude/skills/anthropic-harness-design/SKILL.md`
- **incident.io 12-parallel-reviewer** — adopt for high-stakes consensus reviews
- **Stripe Minions architecture** — adopt for autonomous-PR pattern
- **ccpm Issues-as-state** (r29) — adopt for GitHub-Issues-as-agent-task-state
- **TandemKit Planner/Generator/Evaluator** (r29) — adopt for plan-execute decoupling file-spec
- **KARIMO stall-detection + complexity-routing** (r29) — adopt for routing-by-task-complexity
- **DSPy compile-loop** (r32 NEW) — reference for prompt-optimization-at-scale (don't install)

### T4 — REJECT (multi-axis rejection — DO NOT install)

- **claude-flow / ruflo** (51.6k★) — r9 swarm 0/3 axes + r6 zero T2 + r7 zero production
- **AutoGen** — Microsoft maintenance + r10 deprecated banner + r12 post-mortems
- **LangChain** — r12 multiple production post-mortems
- **Devin standalone** — Cognition Jan 2026 pivot admits autonomy under-delivered
- **Roo Code** — archived 2026-05-15 → use ZooCode or Cline
- **bolt.new OSS** — 17 months stale; live product is closed-source SaaS
- **MetaGPT** — 4 months cooling at 68k★; cite patterns only
- **Daytona** (72.4k★) — AGPL-3.0 license blocker
- **Skyvern** — AGPL
- **OpenInterpreter/01** — AGPL + voice not GUI focus
- **microsoft/autogen** as dependency — CC-BY-4.0 (content license, not code license)
- **multica** — HARD REJECT per r30 §3 LICENSE inspection (modified Apache 2.0 with SaaS+branding restrictions)
- **Langfuse** — DRY with Phoenix at solo scale; defer to >10 RPS
- **Durable execution layer** (Temporal/Inngest/Restate/n8n/Windmill) — over-built at solo+5-task scale
- **Self-host inference** — 1000× below break-even per r25
- **e2b-dev/mcp-server** — DEPRECATED banner
- **modelcontextprotocol/server-postgres + server-sqlite** — ARCHIVED → use Neon or Neo4j MCPs
- **defog-ai/sqlcoder** — 24 months stale
- **meta-llama/PurpleLlama** — Llama Community License (commercial restriction)
- **qodo-ai/pr-agent** — duplicates existing `pr-review-toolkit` plugin
- **BMAD-METHOD** (46k★, r29) — heavy install collides with operator's 37 plugins per r16 over-build
- **claude-task-master** (27k★, r29) — context-flood risk + multi-IDE-not-CC-native; DEFER not adopt
- **Instructor** (3rd-party Pydantic-typed outputs) — Anthropic native `output_config.format` + `strict:true` covers this for Claude API
- **BAML** — same reason; Anthropic native is now SOTA for Claude-API typed outputs
- **Mirascope** — same reason
- **LMQL** — STALE 12 months per r32
- **TextGrad** — STALE 10 months per r32; single-paper
- **Outlines / Guidance** — logit-bias use-case n/a on Claude API per r32
- **Prefill (response prefix)** patterns — DEPRECATED April 2026 on latest models (Sonnet 4.6 / Opus 4.6 / Opus 4.7) per r32

---

## §6 Operator-fit fixes (per r22 audit + r33 Anthropic-OFFICIAL migrations)

r22's specialist `context-manager` agent audited operator's actual `CLAUDE.md` + `settings.json`. Best-in-class core (≤50 LOC pointer-CLAUDE.md + cite-anchored cardinal rules + 1M-context-tuned compact thresholds + state-outside-repo redirects + fork-subagent enabled + OTel telemetry). Anti-patterns to fix:

**Anthropic-OFFICIAL migrations (NEW r33 — supersede client-side env-relic patterns):**

1. **REPLACE `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70/85` with server-side Compaction API** (Feb 5 2026 beta per r33) — r22's "triple-encoded compact thresholds" anti-pattern is now CANONICALLY-FIXABLE. Test in throwaway repo first; if stable, remove `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` + `CONTEXT_WINDOW_*_TOKENS` + `CONTEXT_WINDOW_*_PERCENT` triple from env block.

2. **REPLACE manual `budget_tokens` patterns with `thinking:{type:"adaptive"}`** (Feb 5 GA per r33) — adaptive thinking GA on Opus 4.6+ supersedes manual budget allocation. Apply across all subagent prompts in operator's `.claude/agents/*` and skill bodies.

3. **REPLACE blanket `bypassPermissions:true` with `Claude Code auto mode`** (Mar 25 2026 Anthropic-OFFICIAL per r33) — `settings.json: permissions.defaultMode: "auto"`. Pair with strict permissions.deny list per L0.5.

4. **ENABLE Tool search tool** as native API call to replace operator's heavy 12-MCP context burden (Feb 17 GA per r33). Reduces "MCP-flood-context" structurally instead of via custom code-execution-with-MCP pattern.

**Operator-fit anti-patterns (r22 — to fix):**

5. **Triple-encoded compact thresholds** — superseded by item 1 above; remove env triple after Compaction API verified.
6. **`ECC_DISABLED_HOOKS` env relic** — 14 hook names disabled post-W255 cleanup; hooks no longer exist, env is no-op. **Delete the env var.**
7. **`autoMemoryEnabled: true` + `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` conflict** — env wins per precedence but the disagreement is bug-bait. **Pick one** (env takes precedence, so set `autoMemoryEnabled: false` in settings.json to match).
8. **16 overlapping marketplaces** — `addy-agent-skills` + `claude-code-skills` + `anthropic-agent-skills` + `claude-code-workflows` have overlapping skills (r16 DRY-analog). **Audit which skills are duplicated**; disable the duplicate-source plugin per skill.

**Plus 3 genuinely-new context-engineering patterns to adopt:**
- `AGENTS.md` REFRESH at repo root (covered in §4 L2 / §5 T1)
- `.claude/skills/wave-n-codification/SKILL.md` — codify operator's actual W-N codification workflow as auto-firing skill
- `.claude/agents/codex-rescue-bridgemode.md` — crystallize Path P pattern as native project-scoped subagent

---

## §7 Patterns to adopt (non-tool SOTA)

The strongest convergence in the entire study was NOT a tool — it was a set of patterns. Adopt as operating discipline:

1. **Evals-first** (r6 — 4 named-T2: Hamel Husain / Eugene Yan / Chip Huyen / Ben Hylak — strongest non-tool convergence; **r33 Anthropic Jan 9 2026 *Demystifying evals* RATIFIES**): write evals before agents; iterate on eval signal, not on vibes. Implementation: Phoenix runtime tracing + Promptfoo CI-gate (T1 pilot above).
2. **Context engineering as first-class** (r6+r23+r22 — Karpathy + Cole Medin + Addy Osmani + Anthropic-OFFICIAL): treat the context window as first-class engineering surface. CLAUDE.md + AGENTS.md + per-task fresh context (`/clear` discipline).
3. **Plan/execute decoupling** (r6+r8+r9 — Chip Huyen + Cole Medin + Andrew Ng + CoDA/PEAR/TDP/AOrchestra papers; **r33 Anthropic Mar 24 harness-design RATIFIES** 3-agent planner/generator/evaluator pattern): separate the planner (long-horizon, expensive) from the executor (short-horizon, cheap). Mirrors `iannuttall/ralph` (origin) ralph-dag pattern. **Adopt Anthropic Advisor tool API (Apr 9 2026 r33) for first-class API-level pairing.**
4. **Partial autonomy > full autonomy** (r6 — Karpathy + Addy + Jeremy Howard): humans-in-loop on decision boundaries; autonomous within bounded tasks. *Opposes* "fully unleashed Docker loop" framing — temper L5 scaffold usage to bounded autonomous tasks, not 24/7 unattended.
5. **Scaffold-as-determinant** (r5 + r8 + Anthropic engineering blog): *"Model is the ceiling, harness is the ladder."* Particula measured 42% → 78% on SWE-bench from scaffold alone (same model). Scaffold quality matters as much as model choice.
6. **Workflows > agents until you need agents** (r23 — Anthropic explicit; **r33 Apr 8 Managed Agents post RATIFIES**: "fully managed agent harness for running Claude as an autonomous agent" — explicitly bounded autonomy): start with workflows (predefined paths: prompt-chain / routing / parallelization / orchestrator-worker / evaluator-optimizer), escalate to agents (LLM-driven dynamic loops) ONLY when needed.
7. **Tool search tool over code-execution-with-MCP** (r33 — Anthropic GA Feb 17 NEW): when MCP catalog grows, use Anthropic's **Tool search tool** to dynamically load tools from large catalogs. **SUPERSEDES** the r23 "code-execution-with-MCP" pattern as the canonical Anthropic-OFFICIAL approach to context-flood mitigation.
8. **Memory-persistence > context-fill** (r23 + r33): "if context window exceeds 200K tokens it will be truncated" — Anthropic explicit. Save plans/state to memory file BEFORE spawning subagents. Operator's `intelligent-compact` + 70% autocompact override aligns. **Migrate to Claude Managed Agents Memory beta (Apr 23 r33) when adopting Managed Agents**.
9. **Simple composable > frameworks** (r23 + r16 + r32): Anthropic explicit: *"the most successful implementations weren't using complex frameworks. They were building with simple, composable patterns."* This validates r16's `ARCHITECTURE-OVER-BUILT` critique on the original generic-SOTA architecture. **r32 confirmation:** Anthropic native structured outputs (`output_config.format` + `strict:true`) replace the entire Instructor/BAML/Mirascope category for Claude-API work; prefill DEPRECATED April 2026 on latest models.
10. **Anthropic Extended Thinking dial** (r27 + r33 GA Feb 5) — `thinking:{type:"adaptive"}` (replaces manual `budget_tokens`) + `interleaved-thinking-2025-05-14` beta header + `effort` parameter GA — first-class reasoning escalation for Opus 4.7 / Sonnet 4.6 on L5-scaffold-class tasks. Use selectively for complex multi-step reasoning; avoid as default (cost + latency).
11. **Anthropic-native structured outputs over 3rd-party** (r32 NEW): `output_config.format` + `strict:true` on tool use + 24h grammar cache. **PREFILL DEPRECATED April 2026** — do NOT use prefill-based patterns on Sonnet 4.6 / Opus 4.6 / Opus 4.7.
12. **Context-resets > compaction** (r33 NEW — Anthropic Mar 24 harness-design): clearing the context window entirely and starting a fresh agent OUTPERFORMS in-place compaction for long-running tasks. Use `/clear` between sprint contracts; save state to memory file.

---

## §8 5-tier LiteLLM cascade configuration (r30 §1 validated)

**codex audit P0 requirement + r30 §1 resolution:** primary-source-validated against `https://docs.litellm.ai/docs/providers/` — see §4 L1 above for the validated YAML config.

**Cascade summary:**

```
TIER 1 (cheapest)               : Haiku 4.5             — triage / classification
TIER 2 (mid)                    : Sonnet 4.6.5          — daily-driver tasks
TIER 3 (top Anthropic)          : Opus 4.7 + adaptive   — complex multi-file work
TIER 4 (cross-model verify)     : GPT-5.5 (codex CLI)   — Path P, separate dispatch
TIER 4.5 (instant low-latency)  : GPT-5.5 Instant (NEW) — fast iterations (r31)
TIER 5 (escape valve)           : DeepSeek V4 endpoint  — text/tool-call only (caveats)
```

**Anthropic Q1/Q2 primitives layered ON the cascade (r33):**

- **Adaptive thinking** (`thinking:{type:"adaptive"}`) on Opus 4.7 / Sonnet 4.6 — supersedes manual `budget_tokens`
- **Server-side Compaction API** — context summarization handled server-side (operator can remove client-side autocompact env relics)
- **Advisor tool API** (`advisor-tool-2026-03-01` beta) — pair faster executor with higher-intelligence advisor mid-generation. NEW peer to LiteLLM cascade + codex CLI Path P.
- **Automatic caching** (Feb 19 2026 r33) — single `cache_control` field; system auto-caches last cacheable block. Simplifies cache management in cascade.
- **`thinking.display: "omitted"`** (Mar 16 2026 r33) — hide thinking blocks while preserving signature.
- **Fast mode for Opus 4.7** (May 12 2026 per r33) — 2.5× faster tokens, premium pricing. Speed-vs-cost lever in cascade.

**Reference implementation for L5 escape valve:** `aattaran/deepclaude` (r27) — concrete DeepSeek V4 Pro CC backend, *"Same UX, 17× cheaper"* — install reference for L1 cascade. Verify Anthropic-format compat with current DeepSeek API contract before adoption.

**Crossover thresholds** (per r25):
- Claude Pro/Max $200/mo wins vs raw API above ~40M Opus input tokens/month
- Self-host vLLM on H100 wins above 20-50M output tokens/day sustained
- Operator's load = ~60M output tokens/MONTH = **1000× below self-host break-even**
- DeepSeek V4 cascade captures 70-85% of self-host savings at zero infra ops — **for text/tool-call workloads only**

---

## §9 Final verdict + open follow-ups

**Verdict (confidence 0.93, ship-readiness 9.5/10 post-Q2-frontier-integration):** Operator's existing Claude Code + 37 plugins + 12 MCP servers + intelligent-compact + 70% autocompact override + codex-CLI cross-model gate + superpowers skills + 1M-context Opus 4.7 is **strongly aligned with Anthropic-published SOTA patterns** for an Anthropic-API-centric solo-developer profile in 2026-May. r23's Anthropic-internal audit is a W258 internal-audit estimate (~90%), NOT an Anthropic-measured fact. The architecture frontier from here is **substrate-extension (validated LiteLLM proxy + Promptfoo eval CI-gate pilot + 1-2 validated MCP additions + AGENTS.md REFRESH + ast-grep + rtk-ai/rtk + semgrep-mcp via PyPI) + Anthropic-OFFICIAL Q2 primitives migrations (Claude Code auto mode + Compaction API + adaptive thinking + Tool search tool + Advisor tool) + operator-fit fixes (compact-threshold deduplication + ECC env relic cleanup + marketplace overlap audit) + new L0.5 security/provenance layer (codex audit P0/P1) — NOT runtime replacement or harness rebuild.**

Adversarial r16 critique was correct: the earlier OpenHands+Archon+multica L5+L6+L7 stack was generic-SOTA, not operator-fit-SOTA. r15 primary-source audit caught one fabricated benchmark claim (OpenHands 68.4%) and ratified 5/6 other load-bearing facts. codex GPT-5.5 audit (NEEDS-REVISION → APPROVE-SHIP-v2 after corrections) caught additional load-bearing errors. r30-r33 patches added **6 NEW Anthropic-OFFICIAL primitives** (Claude Managed Agents / Advisor tool / Tool search tool / Compaction API / Claude Code auto mode / Adaptive thinking) that supersede multiple v2 pattern-cites with first-class API primitives.

Block goose's production-validation via Stripe Minions fork is the strongest single-tool production-deployment evidence in the study and shifts goose from "peer CLI" to "production-pattern source." multica is now HARD REJECT per r30 LICENSE inspection.

**Open follow-ups (queueable for next iteration):**

1. **Validate Claude Haiku 4.5 exact LiteLLM model string** (catalog refresh needed; or use Anthropic docs direct dated string) before T2 LiteLLM install.
2. **Verify DeepSeek V4 specific model name** in `deepseek/<name>` pattern (LiteLLM doesn't catalog V4 explicitly).
3. **Run a one-flow Promptfoo pilot** on a critical CC skill flow using r30 §6 config; measure whether it catches regressions Phoenix/manual review miss.
4. **Set up WSL2 runbook** for operator if/when scaffold install triggers (mini-SWE-agent / Live-SWE-agent / OpenHands all require WSL2 on Windows).
5. **Probe Claude Managed Agents beta** (`managed-agents-2026-04-01`) — pilot on one bounded task before committing to L5 scaffold migration.
6. **Author `.claude/skills/p14-stall-detection/SKILL.md`** (~50 LOC) as concrete Magentic-One pattern adoption.
7. **Author `.claude/skills/anthropic-harness-design/SKILL.md`** as Anthropic Mar 24 2026 3-agent planner/generator/evaluator pattern adoption.
8. **Audit operator's 37-plugin set for r22-flagged skill duplication** across the 4 overlapping marketplaces; produce disable-list.
9. **Resolve Langfuse :3000 ↔ OpenHands :3000 port collision** before any future L4 install scaling (port-allocation map).
10. **Document `AGENTS.md` REFRESH content** — align current 15K with Linux Foundation AAIF founding-three docs + Code with Claude 2026 keynote announcements.
11. **Test Claude Code auto mode** in throwaway repo before changing operator's `defaultMode`.
12. **Test server-side Compaction API** before removing client-side autocompact env relics.
13. **Implement L0.5 security baseline** (path allowlist + secrets boundary extension + MCP source verification + sandbox for code-exec) before any new MCP install.
14. **Probe Anthropic `ant` CLI** (Apr 8 2026 r33) — characterize vs operator's existing codex CLI + opencode + goose stack.
15. **Watch for SWE-Bench Pro full leaderboard** — OpenAI+Anthropic recommend Pro as replacement for contaminated Verified per r31.

---

## §10 Cite-anchors

All 33+ W258 source files: `Z:/claude-sota-installed/.claude/state/W258{,r2-r33}*.md`.

**Cross-model audit:** `Z:/claude-sota-installed/.claude/state/codex_consult_w258_e2e_audit_OUT.txt` (TIER-1-DIRECT cross-model GPT-5.5 verification per cardinal-rule-3 Path P).

**Key TIER-1-DIRECT primary sources (v3 expanded):**

- **SWE-bench Verified leaderboard JSON** (`script id=leaderboard-data`) at `https://www.swebench.com/` retrieved 2026-05-16 (r15)
- **SWE-Bench Pro Morph** at `https://www.morphllm.com/swe-bench-pro` — replacement for contaminated Verified (r31)
- **SWE-bench-Live** at `https://swe-bench-live.github.io/` — Windows-container caveat finding (r30)
- **Live-SWE-agent leaderboard** at `https://live-swe-agent.github.io/` — 79.2% Verified primary-source-verified (r30)
- **Linux Foundation AAIF formation press** at `https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation` dated 2025-12-09 (r15)
- **Anthropic MCP donation announcement** at `https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation` (r14 + r15)
- **Anthropic Code with Claude 2026 keynote** May 6 2026 (Remote Agents / Routines / Managed-agent / Advisor / CI auto-fix announcements per r31)
- **Anthropic Claude Managed Agents** at `https://www.anthropic.com/engineering/managed-agents` Apr 8 2026 (r33)
- **Anthropic Claude Code auto mode** at `https://www.anthropic.com/engineering/claude-code-auto-mode` Mar 25 2026 (r33)
- **Anthropic Harness design for long-running apps** at `https://www.anthropic.com/engineering/harness-design-long-running-apps` Mar 24 2026 (r33)
- **Anthropic Demystifying evals for AI agents** at `https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents` Jan 9 2026 (r33)
- **Anthropic Building C compiler with parallel Claudes** at `https://www.anthropic.com/engineering/building-c-compiler` Feb 5 2026 (r33)
- **Stripe Minions blog** at `https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents` (r15 — verified ">1,000 PRs/wk" + "fork of goose"; 1,300 figure from podcast secondary source)
- **Anthropic Code execution with MCP** at `https://www.anthropic.com/engineering/code-execution-with-mcp` dated Nov 4 2025 (r23 — SUPERSEDED by Tool search tool GA Feb 17 per r33)
- **Anthropic Building Effective Agents** at `https://www.anthropic.com/engineering/building-effective-agents` dated Dec 19 2024 (r23 — canonical reference)
- **Anthropic Multi-Agent Research System** at `https://www.anthropic.com/engineering/multi-agent-research-system` dated Jun 13 2025 (r23)
- **Anthropic How Anthropic teams use Claude Code** at `https://www.anthropic.com/news/how-anthropic-teams-use-claude-code` Spring 2025 (r23)
- **Anthropic Claude Code docs** at `https://code.claude.com/docs/en/` — overview / skills / sub-agents / hooks / mcp / settings / memory pages
- **Anthropic structured outputs docs** at `https://platform.claude.com/docs/en/build-with-claude/structured-outputs` (r32)
- **Anthropic Agent SDK structured outputs** at `https://platform.claude.com/docs/en/agent-sdk/structured-outputs` (r32)
- **Anthropic April 23 postmortem** at `https://www.anthropic.com/engineering/april-23-postmortem` (r33)
- **Claude Code release notes May 2026** at `https://releasebot.io/updates/anthropic/claude-code` (r31)
- **OpenAI GPT-5.5 Instant** at `https://openai.com/index/gpt-5-5-instant/` May 5 2026 (r31)
- **LiteLLM provider docs** at `https://docs.litellm.ai/docs/providers/anthropic` + `/openai` + `/deepseek` + `/proxy/configs` (r30 validation)
- **modelcontextprotocol/servers README** at `https://github.com/modelcontextprotocol/servers` — reference-server disclaimer (codex audit P1 source for filesystem MCP)
- **semgrep-mcp PyPI docs** at `https://semgrep.dev/docs/mcp` — function lives on PyPI even though GitHub archived (r30 §2)
- **multica LICENSE** at `https://github.com/multica-ai/multica/blob/main/LICENSE` — modified Apache 2.0 with SaaS+branding restrictions (r30 §3)
- **mini-SWE-agent README** at `https://github.com/SWE-agent/mini-SWE-agent` — Windows compat findings (r30 §5)
- **Promptfoo docs** at `https://promptfoo.dev/docs/configuration/guide` (r30 §6 pilot config)
- **GitHub live API** for `anomalyco/opencode` (full_name verified, 160,923 stars) and `aaif-goose/goose` (45,271 stars, redirected from block/goose) retrieved 2026-05-16 (r15)
- **DHH "Promoting AI Agents"** post Jan 7 2026 — explicit opencode endorsement (r12)
- **Mem0 $24M Series A** TechCrunch Oct 28 2025 (r11)
- **Karpathy "agentic engineering" coinage** Feb 2026 (r11)
- **YC W26 batch analysis** — 41.5% agent-infra by buildmvpfast.com (r11)
- **Particula scaffold-as-determinant analysis** at `particula.tech/blog/agent-scaffolding-beats-model-upgrades-swe-bench` (r5)
- **METR Time Horizons** at `metr.org/time-horizons/` (r5)
- **DeepSeek Anthropic-format unsupported-features docs** (codex audit P1 source + r30 §1 caveats for L1 escape-valve)
- **MCP Registry** at `https://github.com/modelcontextprotocol/registry` (codex missing-component source for provenance workflow)
- **Salesforce → Convergence.ai acquisition** May 15 2026 (r31 M&A signal)

Cite-class composition: `effective_tier = TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE. Constituents = 33+ W258r*.md files (TIER-3-LOCAL composition) + 1 codex GPT-5.5 cross-model audit + ≥45 TIER-1-DIRECT primary URLs.

---

## §11 Audit Trail

**v1 → v2 diff (codex GPT-5.5 audit applied):** See v2 §11 for full table.

**v2 → v3 diff (Anthropic Q1/Q2 2026 frontier integration applied):**

| Source | Verdict | Action taken |
|---|---|---|
| r30 §1 LiteLLM validation | RESOLVED | Validated YAML committed inline (§4 L1 / §8). Haiku 4.5 + DeepSeek V4 caveats documented; codex CLI confirmed as separate Path P (not LiteLLM tier). |
| r30 §2 semgrep-mcp PyPI correction | REVISE | Changed codex audit's "REJECT-archived" to **"INSTALL via PyPI"** — function lives on as PyPI package even though GitHub archived. `pipx install semgrep-mcp`. |
| r30 §3 multica LICENSE | HARD-REJECT | Changed v2's "SKIP (operator profile)" to **HARD REJECT regardless of profile** — modified Apache 2.0 has SaaS+branding restrictions making it commercially incompatible. |
| r30 §4 SWE-bench-Live Windows | CRITICAL CAVEAT | Added explicit "**none of SWE-agent/OpenHands/ClaudeCode run on Windows containers**" finding to §2 + §4 L5. WSL2 required. |
| r30 §5 mini-SWE-agent WSL2 | CAVEAT | Added WSL2 requirement + GitHub Action alternative to §4 L5 + §5 T2. |
| r30 §6 Promptfoo pilot config | RESOLVED | Concrete runnable Windows config committed to §4 L4 + §5 T1. |
| r31 §3 Code with Claude 2026 | ADD | 5 NEW Anthropic-OFFICIAL primitives added: Remote Agents / Claude Code Routines / Managed-agent orchestration / Advisor tool / CI auto-fix. |
| r31 §1 GPT-5.5 Instant May 5 | ADD | Tier 4.5 added to LiteLLM cascade. |
| r31 §4 SWE-Bench Pro replaces Verified | ADD | Benchmark contamination caveat added to §4 L5 + §9 follow-ups. |
| r31 §2 Claude Code May 2026 updates | ADD | PowerShell default-on Windows / Opus 4.7 fast-mode default / worktree bg isolation / plugin dep enforcement — all noted in §2 operator profile. |
| r31 §5 Salesforce → Convergence.ai | ECOSYSTEM | Added to §3 scorecard as ecosystem-signal-only (no architectural impact). |
| r32 §3 Anthropic native structured outputs | ADD | New §7 pattern #11: `output_config.format` + `strict:true` + 24h grammar cache. **PREFILL DEPRECATED April 2026** documented. |
| r32 §2 DSPy compile-loop | PATTERN-CITE | Added to L6 + §7 patterns as prompt-optimization-at-scale reference (don't install). |
| r32 §4 Instructor/BAML/Mirascope/LMQL/TextGrad/Outlines/Guidance | REJECT | All added to §5 T4 REJECT list — Anthropic native is now SOTA for Claude-API work. |
| r33 §2 Claude Managed Agents | NEW L5 OPTION | Added to §4 L5 — 3-way contest (Managed Agents / Live-SWE-agent / OpenHands). **For operator: PREFER Managed Agents** per cardinal-rule-12 PRIMARY upstream-install priority. |
| r33 §2 Advisor tool API | NEW PATTERN | Added to §4 L1 + §7 pattern #3 + §8 cascade — Anthropic-OFFICIAL plan/execute decoupling at API level. |
| r33 §2 Tool search tool GA | SUPERSEDES | Added to §4 L0 + §7 pattern #7 + L0.5 — **SUPERSEDES code-execution-with-MCP** as canonical Anthropic-OFFICIAL MCP-flood-context fix. |
| r33 §2 Adaptive thinking GA | MIGRATION | Added to §6 + §8 — replaces manual `budget_tokens`. |
| r33 §2 Server-side Compaction API | MIGRATION | Added to §6 — replaces client-side `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` env triple (r22 anti-pattern now CANONICALLY-FIXABLE). |
| r33 §2 Claude Code auto mode | MIGRATION | Added to §0 Top-3 actions + §4 L2 + §4 L0.5 + §6 — replaces `bypassPermissions:true` blanket. |
| r33 §2 Managed Agents Memory beta | ADD | Added to L0 memory layer as Anthropic-OFFICIAL alternative when Managed Agents adopted. |
| r33 §1 Mar 24 harness-design post | RATIFICATION | Anthropic-OFFICIAL ratification of r9 P10 + r22 + r29 TandemKit 3-agent pattern — moved from "pattern-cite" to "Anthropic-OFFICIAL recommended" in §4 L6 + §7. |
| r33 §1 Jan 9 Demystifying evals post | RATIFICATION | Anthropic-OFFICIAL ratification of r6's 4-T2 evals-first convergence — noted in §4 L4 + §7. |
| r33 §2 `ant` CLI watchlist | ADD | Added to §3 scorecard + §4 L3 — peer to codex/opencode/goose. |
| r33 §1 various Q1/Q2 posts | CITES | Added 8+ Anthropic engineering blog URLs to §10 cite-anchors. |

**Verdict transition:**
- codex GPT-5.5 verdict (v1 audit) = NEEDS-REVISION (confidence 0.82, ship-readiness 7/10)
- → **APPROVE-SHIP-v2** (confidence 0.91, ship-readiness 9/10) after applying codex P0/P1/P2 + r26/r27/r29 corrections
- → NEEDS-REVISION-FOR-Q2-FRONTIER (per r31 + r33 surfacing Anthropic Q1/Q2 primitives)
- → **APPROVE-SHIP-v3** (confidence 0.93, ship-readiness 9.5/10) after applying r30/r31/r32/r33 patches

**Confidence delta:** 0.88 (v1 pre-audit) → 0.91 (v2 post-audit) → **0.93 (v3 post-Q2-integration)**.

---

*W258 — synthesis-complete v3 2026-05-16 · 22+ axis convergence across 33+ source-family rounds · codex GPT-5.5 cross-model audit applied · Anthropic Q1/Q2 2026 official primitives integrated · ship-readiness 9.5/10 · cardinal-rule-3 Phase 1 bootstrap exception satisfied.*
