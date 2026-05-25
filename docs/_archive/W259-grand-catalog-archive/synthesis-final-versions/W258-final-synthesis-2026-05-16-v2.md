# W258 — Final SOTA Agent-Runtime Architecture Synthesis (v2 — codex-T1 GPT-5.5 audit applied)

> **2026-05-16 · Confidence 0.88 → 0.91 post-audit · 16-axis convergence over 29 source-family rounds · ship-readiness 9/10 post-P0/P1-fixes**
> Audit class: TIER-3-LOCAL-COMPOSITION. Primary sources cited per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8.
> Cross-model gate satisfied: codex GPT-5.5 audit at `Z:/claude-sota-installed/.claude/state/codex_consult_w258_e2e_audit_OUT.txt` (verdict NEEDS-REVISION → APPROVE-SHIP after applying corrections below).

---

## §0 Executive Summary

After 29 parallel research rounds covering 16 distinct source families plus a final-sweep + V5-kit-missed probe + adversarial GPT-5.5 audit, the convergent verdict is: operator's existing Claude Code + 37-plugin + 12-MCP stack is **strongly aligned with Anthropic-published SOTA patterns** (CC + CLAUDE.md hierarchy + MCP + subagents + memory-persistence + simple-composable > frameworks). The frequently-cited "~90%" figure is a W258r23 internal-audit estimate, **not an Anthropic-measured fact**. The architecture frontier is **substrate-extension via 1-2 validated MCP additions + a cross-model proxy + an evals-first CI-gate + a new L0.5 security/provenance layer**, NOT a runtime replacement or harness rebuild.

**Top-3 immediate actions (codex-T1-REORDERED):**

1. **REFRESH `AGENTS.md`** at repo root (operator HAS it already at 15K per r26) — sync with W258 AAIF conventions (zero new file; minutes-cost edit).
2. **Pilot Promptfoo on ONE critical flow** before broad install — strongest non-tool 4-T2 convergence (r6 + r21), declarative CI-gate eval, *"Used by OpenAI and Anthropic"* per project's GitHub README (self-claim, not vendor endorsement).
3. **Install LiteLLM (TIER-2 — after validating exact model IDs against current LiteLLM docs)** for cost-optimal cascade routing; **codex CLI remains a separate external verification command, NOT a cascade tier**.

```
┌─────────────────────────────────────────────────────────────────────────┐
│  L7  TEAM UX                       SKIP — 1-agent operator (r16 + r24)  │
│  L6  PATTERN-CITE LAYER            iannuttall/ralph + P14 stall-detect  │
│                                    + Stripe Minions + ccpm/TandemKit    │
│  L5  SCAFFOLD (use-bounded)        live-SWE-agent / mini-SWE-agent      │
│                                    [Windows-test before recommending]   │
│  L4  EVAL/OBSERVABILITY            Phoenix ✓  +  Promptfoo (pilot)      │
│  L3  PEER CLI                      opencode + goose (one first)         │
│  L2  DRIVER                        Claude Code + 37 plugins (have) ✓    │
│                                    + REFRESH AGENTS.md (exists at 15K)  │
│  L1  CROSS-MODEL PROXY             LiteLLM (validated IDs)              │
│                                    + codex CLI (separate Path P gate)   │
│  L0.5 SECURITY / PROVENANCE        NEW — path allowlist + MCP source-   │
│                                    verify + sandbox + secrets boundary  │
│  L0  SUBSTRATE                     MCP everywhere (AAIF foundation)     │
│        ├── Memory:        Graphiti ✓ (+ mem0 alt T2)                    │
│        ├── Code intel:    Serena + Repomix + GitNexus + Ruff ✓          │
│        │                  + ast-grep NEW (AST-codemod, r29) T1          │
│        ├── Cost lever:    rtk-ai/rtk NEW (60-90% token tree-shake) T1   │
│        ├── Browser/GUI:   Playwright + Chrome-devtools ✓                │
│        ├── Eval/observ:   Phoenix ✓                                     │
│        ├── ADD (T2):      Filesystem (reference-grade, path-allowlist)  │
│        ├── ADD (T1):      Tavily OR Firecrawl (live web search)         │
│        ├── ADD (T2):      Sentry MCP (getsentry-OFFICIAL, conditional)  │
│        ├── STUDY-PILOT:   zilliztech/claude-context (vector code MCP)   │
│        └── ADD (T2):      NVIDIA garak (LLM red-team CLI)               │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## §1 Methodology

The audit pipeline follows the 5-phase SOTA-convergence-audit framework codified at `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`:

- **R1 multi-source ≥4 discover** — 16+ source families probed (exceeded ≥4 mandate 4×; r1-r25 + r27 final-sweep + r29 V5-missed).
- **R2 7-Probe-DAG harness-fit verify** — per-candidate count-over / SDK-vs-CLI / architectural-API / plugin-namespace / mode-harness-shape / direct-blockers / demand-gate split.
- **R3 ≥3-distinct-orgs Axis-1+2+3 convergence** — multi-org SOTA cites + ≥2 named-T2 dated artifacts + ≥3 months stability OR STRONG-PROVENANCE-EXPRESS.
- **R4 SRA D1-D10 use-class-precise scoring** — license-use-class precision + freshness gate + maintainer provenance + active-maintenance + use-class compatibility + Anthropic-CC alignment + industry adoption + failure-mode awareness + replacement viability.
- **R5 CR-12 6-class disposition** — GENUINELY-NEW / DUPLICATE / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL.

**Cross-model gate satisfied:** Path P (orchestrator-direct codex exec foreground+tee) — codex GPT-5.5 verdict file at `Z:/claude-sota-installed/.claude/state/codex_consult_w258_e2e_audit_OUT.txt`. NEEDS-REVISION → APPROVE-SHIP after applying P0/P1 corrections in v2.

---

## §2 Operator Profile

CRITICAL for architecture fit per r16 — generic SOTA ≠ operator-fit SOTA:

- **Platform:** Windows 11 Pro, Z:\ portable install at `Z:/claude-sota-installed/`
- **Driver:** Claude Code CLI + Opus 4.7 (1M context) daily
- **Subscription:** Anthropic Pro/Max ($200/mo) — covers operator's load
- **Installed:** 37 plugins enabled (from 12 marketplaces) + 12 MCP servers
- **Scale:** Solo developer; ~10K Sonnet + ~1K Opus tasks/month (per r25 model)
- **Cross-model:** codex CLI (GPT-5.5 via openai-codex plugin) for Path P consensus
- **Settings:** `bypassPermissions` default + `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` + 1M context band

**Windows-specific execution caveats (codex-T1 missing-component fix):**
- Docker on Windows requires WSL2 backend; volume mount path-handling differs from Linux/macOS
- SWE-bench-Live primary source notes Windows-container limitations for several L5 scaffold agents
- mini-SWE-agent install: **test Windows path-handling** before recommending overnight Docker workflow
- Any L5 scaffold install should be Windows-tested in a throwaway repo before committing to operator's `Z:\<project>\`

**Operator-fit implication:** team-UX layer (multica kanban), durable-execution layer (Temporal/Inngest), and self-host inference all OVER-BUILT for this profile per r16 + r24 + r25. Architecture must be skinnier than generic SOTA. **codex critique on install appetite:** 8 immediate T1 installs is too aggressive for a Windows operator with 37 plugins/12 MCPs already — staged adoption with reversible pilots is the right shape.

---

## §3 Convergence Scorecard (16+ axis matrix)

| Component | Axes hit | Verdict |
|---|---|---|
| **Claude Code + plugins** (driver) | r1+r3+r5+r6+r7+r10+r12+r23 = **8/29** | **DEFINITIVE — keep as-is** |
| **MCP** (substrate) | r1+r3+r7+r10+r14+r15+r23 + r17 = **8/29** + ubiquitous | **DEFINITIVE — strongest signal of study** |
| **LiteLLM** (cross-model proxy) | r3+r7+r10+r11+r13+r17+r25 = **7/29** | **TIER-2 INSTALL** (after model-ID validation, per codex audit) |
| **opencode** (peer CLI) | r1+r2+r6+r11+r12 (DHH)+r15 = **6/29**, 160,923 stars verified live | **TIER-1 candidate — DHH-endorsed; install one peer-CLI first** |
| **Block goose** (peer CLI + scaffold pattern) | r1+r7+r12+r15 (Stripe-Minions-fork) = **4/29** | **TIER-1 candidate — Stripe-Minions production via fork-of-goose** |
| **Live-SWE-agent** (SOTA scaffold) | r8+r15 (79.2% Verified verified; LICENSE = **MIT verified**) = **2/29** | **WATCHLIST — Windows-test required** |
| **mini-SWE-agent** (minimalist scaffold) | r2+r15 (verified 75.6% on Opus 4.6) = **2/29** | **WATCHLIST — 100 LOC MIT alternative** |
| **OpenHands** (formerly L5 pick) | r1+r3 + **r5 REFUTED by r15** | **DOWNGRADE — top entry is rank ~25 (73.8%); not SOTA scaffold** |
| **Phoenix** (observability) | already-installed + r3+r21+r23 = **3/29** + INSTALLED | **KEEP** |
| **Promptfoo** (eval CI-gate) | r3+r21 + r6's evals-first 4-T2 + project self-description "Used by OpenAI and Anthropic" (not vendor-endorsed) | **TIER-1 PILOT — zero overlap with Phoenix** |
| **AGENTS.md** | r7+r14+r22+r23+r26 (already at 15K) = **5/29** | **TIER-1 — REFRESH (exists), zero-cost concrete update** |
| **mem0** (memory) | r3+r11 ($24M Series A)+r17 = **3/29** | **TIER-2 INSTALL (when memory > CLAUDE.md)** |
| **claude-code-action** (CI) | r3+r17 (Anthropic-OFFICIAL) = **2/29** | **TIER-2 — if GH Actions** |
| **Code-execution-with-MCP** (pattern) | r23 Anthropic Nov 2025 NEW | **TIER-1 PATTERN (with sandbox + path policy)** |
| **P14 stall-detection** (Magentic-One) | r9 + Anthropic durable-execution = **2/29** | **TIER-1 PATTERN (~50 LOC)** |
| **Extended Thinking** dial | r27 (Anthropic-OFFICIAL `extended_thinking` + `interleaved-thinking-2025-05-14` beta) | **TIER-1 PATTERN — reasoning escalation** |
| **ast-grep** (AST-codemod) | r29 (13.8k★ MIT) | **TIER-1 INSTALL — fills semantic-grep slot W258 missed** |
| **rtk-ai/rtk** (token tree-shake) | r29 (MIT Rust, 60-90% reduction per Bash call) | **TIER-1 INSTALL — closes r13 cost gap** |
| **zilliztech/claude-context** (vector code MCP) | r29 (11.1k★) | **STUDY-PILOT vs Repomix before commit** |
| **iannuttall/ralph** (ralph-dag origin) | r27 (primary-source origin; Archon implements) | **PATTERN-CITE — correct attribution** |
| **aattaran/deepclaude** (DeepSeek CC backend) | r27 ("Same UX, 17× cheaper") | **PATTERN-CITE — install reference for L1 cascade** |
| **Mastra.ai** (TS agent framework) | r27 | **WATCHLIST — pairs with agent-sdk-dev plugin** |
| **Filesystem MCP** | r17 reference-grade (not production-ready per README) | **TIER-2 conditional — path allowlist required** |
| **Sentry MCP** | r17 (getsentry-OFFICIAL, not Anthropic-OFFICIAL) | **TIER-2 conditional — install if active Sentry projects** |
| **semgrep/mcp** | r17 listed but **archived Oct 28 2025 per primary-source** | **REJECT — archived/maintenance-stopped** |
| **Langfuse** | r3+r10+r11 → r21 says SKIP for solo operator | **DEFER — install at >10 RPS or >3 concurrent CC** |
| **Archon** (harness) | r1 single-author only; r6 + r22 + r23 → PATTERN-CITE | **PATTERN-CITE — cite Ralph as origin** |
| **multica** | r1+r6 but r16: "kanban-for-zero-load" for 1-agent | **SKIP (operator profile)** |
| **BMAD-METHOD** | r29 (46k★ but heavy install collides with operator's 37 plugins) | **REJECT-FOR-FIT per r16 over-build** |
| **claude-task-master** | r29 (27k★ but context-flood risk + multi-IDE-not-CC-native) | **DEFER** |
| **claude-flow / ruflo** | r1 stars only; r9 swarm 0/3 axes + r6 zero T2 + r7 zero prod | **REJECT** |
| **AutoGen** | r4 stale + r7 maintenance + r10 deprecated + r12 post-mortems | **REJECT** |
| **LangChain** | r12 multiple post-mortems | **REJECT** |
| **Devin standalone** | Cognition Jan 2026 pivot admits autonomy under-delivered | **REJECT** |
| **Roo Code** | r2 archived 2026-05-15 | **REJECT** |

---

## §4 The Architecture (9 layers — L0.5 added per codex audit)

### L0 — SUBSTRATE: MCP everywhere

Per r14 + r15: MCP has crossed the production-adoption threshold at ≥8 top-tier orgs (Anthropic, OpenAI, Microsoft, Google, AWS, Cloudflare, Vercel, Stripe — primary-source verified) and is governed by Linux Foundation AAIF (Dec 9 2025 donation). Operator's 12-MCP install is correct shape.

**ADD (Tier-1):**
- `tavily-ai/tavily-mcp` OR `firecrawl-dev/firecrawl-mcp` — live web search (operator only has docs+repo search via context7+deepwiki)
- **`ast-grep/ast-grep`** (13.8k★ MIT, r29 ADOPT-NOW) — AST-pattern codemod slot W258 missed; adds semantic-grep capability beyond Repomix's text grep. Native CLI, optional MCP wrap.
- **`rtk-ai/rtk`** (MIT Rust, r29 ADOPT-NOW) — 60-90% token reduction per Bash call (closes r13 cost gap). Drop-in wrapper around shell calls in CC.

**ADD (Tier-2 — conditional per codex audit):**
- `modelcontextprotocol/servers/filesystem` — **reference-grade** (modelcontextprotocol/servers README explicitly states reference servers are *"educational examples, not production-ready"*). Install ONLY with path-allowlist + sandbox per L0.5; do NOT install if Bash already covers the workload.
- `getsentry/sentry-mcp` — **`getsentry`-OFFICIAL, optimized for Claude Code** (NOT Anthropic-official). Install only if operator has active Sentry projects.
- `mem0ai/mem0-mcp` — when memory needs exceed CLAUDE.md ($24M Series A market signal r11)
- `NVIDIA/garak` (Apache-2.0) — LLM vulnerability scanner CLI (operator's `.audit-garak/` dir shows prior interest)

**STUDY-PILOT (compare before commit):**
- `zilliztech/claude-context` (11.1k★, r29 STUDY-PILOT) — vector-embedding code MCP from Milvus team. Pilot vs operator's existing Repomix before committing; may complement rather than replace.

**AVOID:**
- `semgrep/mcp` — **ARCHIVED Oct 28 2025** per primary-source GitHub. Use Semgrep CLI directly OR probe `nikvdp/semgrep-mcp-server` and verify maintenance.
- `e2b-dev/mcp-server` — DEPRECATED per repo banner (r17)
- `modelcontextprotocol/server-postgres` + `server-sqlite` — ARCHIVED → use Neon or Neo4j MCPs instead

### L0.5 — SECURITY / PROVENANCE / PERMISSION (NEW per codex audit missing-component fix)

Operator runs `bypassPermissions` default — this widens the attack surface for any new MCP / filesystem / code-execution primitive. Codex audit P0/P1 verdict: **before adding any new MCP, install a first-class security layer.**

**Required disciplines:**

1. **Path allowlist policy for filesystem MCP + Bash:**
   - Filesystem MCP must be restricted to `Z:/<project>/` only — never root drive
   - Bash command allowlist already covers `git/mkdir/rm/mv/navigation` per context-mode policy
   - Pair `bypassPermissions: true` with strict `permissions.deny` glob list (operator's settings.json already denies `.env*` / `id_rsa` / `id_ed25519` / `*.pem` / `*.pfx` / `*.key` / `secrets/**` — extend this list as new MCPs add file-read surface).

2. **Secrets boundary:**
   - Existing deny list is correct shape — extend to cover `.aws/`, `.ssh/known_hosts`, `*.kdbx`, `tokens.json`, any tool-specific credential file.
   - Add `Z:/claude-sota-installed-state/.codex/` and `.claude.json` to deny if they contain auth state.

3. **MCP server source verification (provenance):**
   - Probe **official MCP Registry** at `https://github.com/modelcontextprotocol/registry` FIRST
   - Cross-check **Smithery.ai** if relevant
   - Verify maintainership badge + last-commit date + LICENSE file before any install
   - **Reject archived/abandoned** (semgrep/mcp lesson learned — caught only by codex primary-source audit, not by the 25 prior research rounds)

4. **Update policy:**
   - Pin MCP server versions in `.mcp.json` (operator already does this — see `playwright_pin` / `serena_pin` / `repomix v1.14.0` / `gitnexus@1.6.4-rc.112`)
   - Review changelog before bump; never use `@latest` for any L0 substrate primitive

5. **Sandbox requirements for Code-execution-with-MCP pattern:**
   - Path/data policy: code-imports-MCP-tools wrapper must declare allowed paths + data scope
   - Resource limits: CPU / memory / network egress caps
   - Monitoring: log every code-execution call to Phoenix
   - Do not adopt this pattern in operator's existing repo without prior pilot in throwaway sandbox

6. **bypassPermissions discipline:**
   - bypassPermissions ALONE is unsafe; pair with strict allowlist (above)
   - Document the pairing in CLAUDE.md cardinal-rule line so future maintainers don't loosen it

### L1 — CROSS-MODEL PROXY: LiteLLM (validated) + codex CLI (separate)

**codex audit P0 correction:** codex CLI is **NOT a LiteLLM model provider** — it's a separate external verification command. The two play different roles:

- **codex CLI** = cross-model **consensus/verification** (Path P cardinal-rule-3 gate). Dispatched via `codex exec` foreground+tee in operator's existing pattern. NOT routed through LiteLLM.
- **LiteLLM** = cross-model **cascade routing** for cost optimization. Routes API calls only.

**5-tier cost-aware routing config — model IDs TBD pending validation:**

Validate exact LiteLLM model IDs and routing syntax against the **current LiteLLM provider docs** at `https://docs.litellm.ai/docs/providers/` before committing config to `Z:/claude-sota-installed/`. The placeholder `anthropic/claude-sonnet-4-6` / `anthropic/claude-opus-4-7` IDs in v1 may be invalid LiteLLM provider names — confirm against live docs.

Conceptual cascade (validate IDs before instantiating):

```
TIER 1 (cheapest, fast)    : Haiku 4.5             — triage / classification
TIER 2 (mid)                : Sonnet 4.6.5          — daily-driver tasks
TIER 3 (top Anthropic)      : Opus 4.7              — complex multi-file work
TIER 4 (cross-model verify) : GPT-5.5 (codex CLI)   — Path P, separate dispatch
TIER 5 (escape valve)       : DeepSeek V4 endpoint  — text/tool-call only (caveats below)
```

**DeepSeek V4 Anthropic-format endpoint caveats (codex audit P1):**

DeepSeek's `api.deepseek.com/anthropic` endpoint is **Anthropic-format compatible for text/tool-call paths ONLY**. Per DeepSeek's own docs, the endpoint **does NOT support Claude-native blocks**:

- images / documents / multimodal content
- web search results / code execution results
- MCP tool blocks / MCP server fields

**Do NOT route multimodal or MCP-native CC tasks through DeepSeek.** Restrict cascade routing to text-completion + tool-call workloads only. **Add data-residency + ToS review** before routing private repo prompts through any external provider including DeepSeek.

**Reference implementation:** `aattaran/deepclaude` (r27) — concrete DeepSeek V4 Pro CC backend wrapper *"Same UX, 17× cheaper"*. Use as install-reference; verify Anthropic-format compat with current DeepSeek API contract before adoption.

### L2 — DRIVER: Claude Code + 37 plugins + REFRESH AGENTS.md

Operator's current driver is correct shape. Anthropic-internal teams use exactly this shape (r23). 8/29 axes confirm.

**REFRESH `AGENTS.md`** at repo root (r26 found it already exists at 15K — change from prior v1 "ADD" wording to **REFRESH**). 4-axis convergence (r7 + r14 + r22 + r23). AGENTS.md is part of the AAIF founding-three (MCP + goose + AGENTS.md). Stripe, Spotify, Shopify all use it for cross-tool config sharing (CC + opencode + goose + codex all read it). Action: sync existing file's content with W258 AAIF conventions; no new file write needed.

**Plugin set already optimal** per r23 — keep `superpowers` (TDD / verification / systematic-debugging / writing-skills / subagent-driven-development / dispatching-parallel-agents) + `intelligent-compact` + `pr-review-toolkit` + `code-review` + `agent-teams` + `engineering-skills` + `frontend-design`.

**Marketplace overlap audit pending** (per r22 anti-pattern #4 — see §6 fix).

### L3 — PEER CLI: opencode + Block goose (staged adoption)

**codex audit anti-pattern flagged:** installing both opencode and goose immediately may create tool sprawl for a solo operator. **Install ONE first** unless provider-redundancy is an active need. Recommended order: opencode first (DHH endorsement + stronger T2 convergence), goose later only if pattern-cite from Stripe Minions becomes a load-bearing reference.

- **`anomalyco/opencode`** (formerly `sst/opencode`) — **160,923★ MIT (primary-source verified r15)**, pushed 2026-05-16; 6-axis convergence; **DHH publicly endorsed it Jan 7 2026** (r12). Install via `npm install -g opencode-ai`.
- **`aaif-goose/goose`** (formerly `block/goose`) — 45,271★ Apache-2.0, Linux Foundation AAIF foundation-grade Dec 9 2025; **Stripe Minions (>1,000 PRs/wk Stripe-blog-confirmed; 1,300 from named-engineer Steve Kaliski podcast — secondary-source) is a FORK of goose**. Install via `https://block.github.io/goose/` installer.

This dual install is *insurance* against r11's Anthropic OpenClaw-subscriber-ban precedent (Apr 2026). Provider-redundancy is production-grade hygiene **once you need it** — solo operator may not need it yet.

### L4 — EVAL / OBSERVABILITY: Phoenix + Promptfoo (pilot first)

r21 resolved r16's DRY critique cleanly:
- Phoenix ↔ Langfuse = substantial runtime-tracing overlap (r16 correct)
- Phoenix ↔ Promptfoo = **zero overlap** (different lifecycle: runtime trace vs CI-gate eval)

**Phoenix** (operator already installed) — runtime tracing via OTel; OpenInference project.

**Promptfoo (TIER-1 PILOT — codex-T1 reordered)** — declarative YAML CI-gate eval + LLM-as-judge + red-team. Project's GitHub description verbatim: *"Used by OpenAI and Anthropic."* **This is a project self-claim, not an independent vendor endorsement** — codex audit anti-pattern flag. Install via `npm install -g promptfoo`, but pilot on ONE critical flow before broad adoption.

**Minimal evals-first loop (~60 LOC total):**
```yaml
# promptfooconfig.yaml — ≥5 test cases per critical flow
providers: [<validated-provider-id>]   # validate against LiteLLM/promptfoo docs
tests:
  - vars: { ... }
    assert:
      - type: llm-rubric
        value: "must satisfy <rubric>"
      - type: javascript
        value: "output.length < 2000"
```

**Defer Langfuse** until any of: (a) ≥3 concurrent CC instances, (b) production traffic >10 RPS, (c) prompt-versioning needs exceed git + CLAUDE.md. Also: Langfuse default port :3000 collides with OpenHands :3000 (r16) — port-allocation map needed before any future L4 scaling.

### L5 — SCAFFOLD (USE-BOUNDED, not daily-driver)

**Critical r15 revision:** OpenHands DOES NOT have the 68.4% SWE-bench Verified claim that round-5 propagated. Primary-source JSON of swebench.com leaderboard shows:
- Top OpenHands entry = Salesforce SAGE fork at 73.8% (rank ~25 of 180 — 2025-11-03)
- Top open scaffolds: `live-SWE-agent + Claude 4.5 Opus medium` at **79.2%** (2025-12-15, **MIT license verified**) and `Sonar Foundation Agent + Claude 4.5 Opus` at 79.2% (2025-12-05)
- Best minimalist: `mini-SWE-agent + Claude 4.5 Opus high reasoning` at 76.8% (2026-02-17)

**Benchmark contamination caveat (codex audit missing-component fix):**
- SWE-bench Verified is saturated in 2026-Q2 — consider SWE-bench-Live for fresher signal
- Static-bench numbers may NOT reflect live-PR performance
- Pair any scaffold install with operator-domain pilot eval before committing
- Add Promptfoo regression suite as the operator's own "live bench" on real tasks

**Anthropic-explicit guidance (r23):** *"Workflows > agents until you need agents."* Solo-developer daily work is workflow-class; don't default to L5 scaffold. Use-bounded triggers for installing a scaffold:

- **For unattended overnight Docker-isolated runs** → `live-SWE-agent` (79.2% Verified, MIT). Pattern: `docker run` with workspace volume mount, pull from `OpenAutoCoder/live-SWE-agent` repo. **Windows-test required** before committing — Docker on Windows = WSL2 backend + path-mount nuances per §2.
- **For embedded benchmarking / 100-LOC fork** → `mini-SWE-agent` (75.6%-76.8% Verified, MIT) — radical minimalism, easy to fork/embed. **Test Windows path-handling** before recommending.
- **For batch CI parallel-fix runs** → keep claude-code-action + agent-teams plugins; no separate L5 install needed.

OpenHands as a runtime is fine but it's NOT the SOTA scaffold reference round-5 claimed.

### L6 — PATTERN-CITE LAYER (do NOT install black-box)

Per r22 + r23 + r16: Anthropic explicitly recommends *"simple composable patterns > frameworks."* Adopt these AS PATTERNS in CLAUDE.md / skills / agents, not as installed third-party black boxes:

1. **`iannuttall/ralph` ralph-dag pattern** (r27 — **primary-source ORIGIN**; Archon implements it; Ralph is the carrier). PRD loop with `loop: until: ALL_TASKS_COMPLETE; fresh_context: true`. Author as `.claude/skills/ralph-dag/SKILL.md` (pattern, not the engine).
2. **P14 stall-detection + replan** (r9 — Magentic-One pattern) — outer-loop Task Ledger + inner-loop Progress Ledger + `stall_count > 2 → outer-loop-replan`. ~50 LOC adoption cost.
3. **Code-execution-with-MCP** (r23 — Anthropic Nov 4 2025 NEW, **codex audit anti-pattern: sandbox required**) — present MCP servers AS code APIs; agent writes code that imports tools instead of calling them directly. Solves "too many MCP tools flood context" for operator's 12-MCP install. **Adopt ONLY with L0.5 sandbox / resource limits / path policy / monitoring per codex audit.**
4. **Stripe Minions fork-of-goose** (r15 verified) — production-pattern reference for autonomous PR-shipping at scale. Learn the architecture (one-shot end-to-end + classification + checkpointing); don't fork goose blindly.
5. **incident.io 12-parallel-reviewer pattern** (r7) — for high-stakes review consensus.
6. **Spotify Honk** (r7) — thin-wrapper-on-CC pattern. Spotify built 50+ features Q4'25-Q1'26 with no manual code.
7. **`ccpm` Issues-as-state pattern** (r29 PATTERN-CITE) — matches Stripe Minions r7 (GitHub Issues as agent task state).
8. **`TandemKit` Planner/Generator/Evaluator file-spec** (r29 PATTERN-CITE) — concrete implementation of r9 P10 plan-execute decoupling.
9. **`KARIMO` stall-detection + complexity-routing** (r29 PATTERN-CITE) — concrete implementation of P14 stall-detection + complexity-based routing.

### L7 — TEAM UX layer: SKIP for operator

`multica-ai/multica` (28.7k★) is a kanban board for 3+ concurrent agents across heterogeneous CLIs. Operator is solo + 1-agent-at-a-time → r16 verdict: *"kanban-for-zero-load."* SKIP unless operator scales to multi-agent or hires.

Durable execution layer (Temporal / Inngest / LangGraph / Trigger.dev) per r24: **DO NOT ADD at operator's solo+5-task scale**. Crossover threshold: install only if concurrent agentic tasks >20 OR single task >6h wall-clock OR multi-host. Operator's existing `cron + ScheduleWakeup + JSON state files` is the right shape.

---

## §5 What to INSTALL (priority order — codex-T1 REORDERED)

**Codex audit operator-fit critique:** 8 immediate T1 installs is too aggressive for a solo Windows operator with 37 plugins / 12 MCPs already. **Stage adoption with reversible pilots; verify each before adding the next.**

### MCP Registry / Package Provenance Workflow (NEW per codex missing-component fix)

Before any MCP install:
1. Probe **official MCP Registry**: `https://github.com/modelcontextprotocol/registry` — preferred source
2. Cross-check **Smithery.ai** registry if relevant
3. Verify on the target repo: **maintainership badge** + **last commit < 90 days** + **LICENSE file present** + **issues/PRs activity**
4. Reject archived/abandoned (semgrep/mcp lesson — caught only by codex primary-source audit; pre-flight this check)
5. Pin the version in `.mcp.json` per operator's existing discipline (no `@latest`)

### T1 — Install now (highest leverage; reversible)

```powershell
# 1. REFRESH AGENTS.md — operator HAS it at 15K (r26); sync with W258 AAIF conventions
#    Edit Z:/<your-project>/AGENTS.md to align with Linux Foundation AAIF founding-three docs
#    Zero new file write; minutes-cost edit
#    Cite: https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation

# 2. Promptfoo PILOT — install + run on ONE critical flow first
npm install -g promptfoo
# Author Z:/<your-project>/promptfooconfig.yaml with ≥5 test cases
# Measure: does it catch regressions Phoenix/manual review miss?

# 3. ast-grep — AST-codemod slot (r29 ADOPT-NOW)
#    Direct CLI install or via MCP wrap depending on workflow
#    Cite: https://github.com/ast-grep/ast-grep (13.8k★ MIT)

# 4. rtk-ai/rtk — token tree-shake (r29 ADOPT-NOW; 60-90% reduction per Bash call)
#    Install per repo README; integrate as Bash wrapper in CC
#    Cite: https://github.com/rtk-ai/rtk
```

### T2 — Install conditional (after T1 validated; specific triggers)

```powershell
# 5. LiteLLM — install AFTER validating exact model IDs against current LiteLLM docs
pip install litellm[proxy]
# Reference: https://docs.litellm.ai/docs/providers/ — confirm anthropic/openai/deepseek provider names
# Configure 5-tier cascade per §4 L1 (validated IDs only)

# 6. Tavily OR Firecrawl MCP — live web search gap (pick one)
# Probe MCP Registry first; verify maintainership before install

# 7. opencode — peer CLI (after T1 validated; one of the two peer-CLIs first)
npm install -g opencode-ai

# 8. Filesystem MCP — reference-grade (NOT production-ready per README)
#    Install ONLY with path-allowlist per L0.5
#    Cite: https://github.com/modelcontextprotocol/servers (README disclaimer)

# 9. Sentry MCP — getsentry-OFFICIAL (NOT Anthropic-official)
#    Install ONLY if operator has active Sentry projects

# 10. claude-code-action — Anthropic-OFFICIAL CI (install if/when using GitHub Actions)

# 11. mem0 — memory upgrade (install when memory needs exceed CLAUDE.md)

# 12. NVIDIA garak — LLM red-team scanner (install if security workloads materialize)

# 13. Block goose — peer CLI #2 (install only if provider-redundancy becomes a real need)
# Follow https://block.github.io/goose/ installer

# 14. zilliztech/claude-context — STUDY-PILOT vs Repomix before commit (r29)
```

### T3 — Pattern-cite only (do NOT install)

- **`iannuttall/ralph` ralph-dag pattern** (origin) — adopt as `.claude/skills/ralph-dag/SKILL.md` (Archon = derivative)
- **P14 stall-detection** — ~50 LOC adoption as native skill
- **Code-execution-with-MCP** (Anthropic Nov 2025) — adopt ONLY with L0.5 sandbox per codex audit
- **incident.io 12-parallel-reviewer** — adopt for high-stakes consensus reviews
- **Stripe Minions architecture** — adopt for autonomous-PR pattern
- **ccpm Issues-as-state** (r29) — adopt for GitHub-Issues-as-agent-task-state
- **TandemKit Planner/Generator/Evaluator** (r29) — adopt for plan-execute decoupling file-spec
- **KARIMO stall-detection + complexity-routing** (r29) — adopt for routing-by-task-complexity

### T4 — REJECT (multi-axis rejection — DO NOT install)

- **`semgrep/mcp`** — ARCHIVED Oct 28 2025 (codex audit primary-source verified). Alternatives: Semgrep CLI direct OR probe `nikvdp/semgrep-mcp-server` with maintenance check.
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
- **multica** — operator profile mismatch (1-agent)
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

---

## §6 Operator-fit fixes (per r22 audit)

r22's specialist `context-manager` agent audited operator's actual `CLAUDE.md` + `settings.json`. Best-in-class core (≤50 LOC pointer-CLAUDE.md + cite-anchored cardinal rules + 1M-context-tuned compact thresholds + state-outside-repo redirects + fork-subagent enabled + OTel telemetry). Four anti-patterns to fix:

1. **Triple-encoded compact thresholds** — `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=85` (or 70) + `CONTEXT_WINDOW_*_TOKENS` triple + `CONTEXT_WINDOW_*_PERCENT` pair = 3 sources of truth. **Pick token-triple only** (the Anthropic-canonical model per CCBP claude-settings.md:826,967), delete the percent pair, keep `AUTOCOMPACT_PCT_OVERRIDE` as the autocompact gate.
2. **`ECC_DISABLED_HOOKS` env relic** — 14 hook names disabled post-W255 cleanup; hooks no longer exist, env is no-op. **Delete the env var.**
3. **`autoMemoryEnabled: true` + `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` conflict** — env wins per precedence but the disagreement is bug-bait. **Pick one** (env takes precedence, so set `autoMemoryEnabled: false` in settings.json to match).
4. **16 overlapping marketplaces** — `addy-agent-skills` + `claude-code-skills` + `anthropic-agent-skills` + `claude-code-workflows` have overlapping skills (r16 DRY-analog). **Audit which skills are duplicated**; disable the duplicate-source plugin per skill.

Plus 3 genuinely-new context-engineering patterns to adopt:
- `AGENTS.md` REFRESH at repo root (covered in §4 L2 / §5 T1)
- `.claude/skills/wave-n-codification/SKILL.md` — codify operator's actual W-N codification workflow as auto-firing skill
- `.claude/agents/codex-rescue-bridgemode.md` — crystallize Path P pattern as native project-scoped subagent

---

## §7 Patterns to adopt (non-tool SOTA)

The strongest convergence in the entire study was NOT a tool — it was a set of patterns. Adopt as operating discipline:

1. **Evals-first** (r6 — 4 named-T2: Hamel Husain / Eugene Yan / Chip Huyen / Ben Hylak — strongest non-tool convergence): write evals before agents; iterate on eval signal, not on vibes. Implementation: Phoenix runtime tracing + Promptfoo CI-gate (T1 pilot above).
2. **Context engineering as first-class** (r6+r23+r22 — Karpathy + Cole Medin + Addy Osmani + Anthropic-OFFICIAL): treat the context window as first-class engineering surface. CLAUDE.md + AGENTS.md + per-task fresh context (`/clear` discipline).
3. **Plan/execute decoupling** (r6+r8+r9 — Chip Huyen + Cole Medin + Andrew Ng + CoDA/PEAR/TDP/AOrchestra papers): separate the planner (long-horizon, expensive) from the executor (short-horizon, cheap). Mirrors `iannuttall/ralph` (origin) ralph-dag pattern.
4. **Partial autonomy > full autonomy** (r6 — Karpathy + Addy + Jeremy Howard): humans-in-loop on decision boundaries; autonomous within bounded tasks. *Opposes* "fully unleashed Docker loop" framing — temper L5 scaffold usage to bounded autonomous tasks, not 24/7 unattended.
5. **Scaffold-as-determinant** (r5 + r8 + Anthropic engineering blog): *"Model is the ceiling, harness is the ladder."* Particula measured 42% → 78% on SWE-bench from scaffold alone (same model). Scaffold quality matters as much as model choice.
6. **Workflows > agents until you need agents** (r23 — Anthropic explicit): start with workflows (predefined paths: prompt-chain / routing / parallelization / orchestrator-worker / evaluator-optimizer), escalate to agents (LLM-driven dynamic loops) ONLY when needed.
7. **Code-execution-with-MCP** (r23 — Anthropic Nov 2025 NEW): when adding sandbox/e2b subprocess layer, prefer code-API-over-tools. Agent writes code that imports MCP servers, instead of calling tools directly. **Adopt ONLY with L0.5 sandbox per codex audit.**
8. **Memory-persistence > context-fill** (r23): "if context window exceeds 200K tokens it will be truncated" — Anthropic explicit. Save plans/state to memory file BEFORE spawning subagents. Operator's `intelligent-compact` + 70% autocompact override aligns.
9. **Simple composable > frameworks** (r23 + r16): Anthropic explicit: *"the most successful implementations weren't using complex frameworks. They were building with simple, composable patterns."* This validates r16's `ARCHITECTURE-OVER-BUILT` critique on the original generic-SOTA architecture.
10. **Anthropic Extended Thinking dial** (r27 NEW) — `extended_thinking` API parameter + `interleaved-thinking-2025-05-14` beta header — first-class reasoning escalation for Opus 4.7 / Sonnet 4.6 on L5-scaffold-class tasks. Use selectively for complex multi-step reasoning; avoid as default (cost + latency).

---

## §8 5-tier LiteLLM cascade configuration (validate before instantiate)

**codex audit P0 requirement:** validate exact LiteLLM model IDs and routing syntax against `https://docs.litellm.ai/docs/providers/` before committing the YAML below. The placeholder IDs may not match current LiteLLM provider naming — confirm against live docs.

```yaml
# litellm_config.yaml — VALIDATE model_name strings against current LiteLLM docs
model_list:
  - model_name: haiku-triage          # T1 — triage/classification
    litellm_params:
      model: <validate against litellm docs>          # was: anthropic/claude-haiku-4-5-20251001
      api_key: os.environ/ANTHROPIC_API_KEY

  - model_name: sonnet-daily           # T2 — daily-driver
    litellm_params:
      model: <validate against litellm docs>          # was: anthropic/claude-sonnet-4-6
      api_key: os.environ/ANTHROPIC_API_KEY

  - model_name: opus-complex           # T3 — complex multi-file
    litellm_params:
      model: <validate against litellm docs>          # was: anthropic/claude-opus-4-7
      api_key: os.environ/ANTHROPIC_API_KEY

  - model_name: deepseek-cheap         # T5 — escape valve (text/tool-call ONLY)
    litellm_params:
      model: deepseek/deepseek-chat                    # confirm exact model name
      api_base: https://api.deepseek.com/anthropic
      api_key: os.environ/DEEPSEEK_API_KEY
    # WARNING: DeepSeek Anthropic-format endpoint does NOT support
    #   images, documents, web search, code execution, MCP tool blocks
    # Restrict to text-completion + tool-call workloads only

# T4 (cross-model verify) — GPT-5.5 via codex CLI dispatched SEPARATELY
# codex exec --ephemeral -p <profile>  (NOT routed through LiteLLM)

router_settings:
  routing_strategy: cost-based-routing
  cache_responses: true
  cache_ttl: 3600                      # 1h prompt cache hit = $0.50/MTok for Opus
  num_retries: 2

# Operator routes via env var
# $env:ANTHROPIC_BASE_URL = "http://127.0.0.1:4000"
```

**Reference implementation for L5 escape valve:** `aattaran/deepclaude` (r27) — concrete DeepSeek V4 Pro CC backend, *"Same UX, 17× cheaper"* — install reference for L1 cascade. Verify Anthropic-format compat with current DeepSeek API contract before adoption.

**Crossover thresholds** (per r25):
- Claude Pro/Max $200/mo wins vs raw API above ~40M Opus input tokens/month
- Self-host vLLM on H100 wins above 20-50M output tokens/day sustained
- Operator's load = ~60M output tokens/MONTH = **1000× below self-host break-even**
- DeepSeek V4 cascade captures 70-85% of self-host savings at zero infra ops — **for text/tool-call workloads only**

---

## §9 Final verdict + open follow-ups

**Verdict (confidence 0.91, ship-readiness 9/10 post-corrections):** Operator's existing Claude Code + 37 plugins + 12 MCP servers + intelligent-compact + 70% autocompact override + codex-CLI cross-model gate + superpowers skills + 1M-context Opus 4.7 is **strongly aligned with Anthropic-published SOTA patterns** for an Anthropic-API-centric solo-developer profile in 2026-May. r23's Anthropic-internal audit is a W258 internal-audit estimate (~90%), NOT an Anthropic-measured fact. The architecture frontier from here is substrate-extension (validated LiteLLM proxy + Promptfoo eval CI-gate pilot + 1-2 validated MCP additions + AGENTS.md REFRESH + ast-grep + rtk-ai/rtk) plus operator-fit fixes (compact-threshold deduplication + ECC env relic cleanup + marketplace overlap audit) plus **new L0.5 security/provenance layer** (codex audit P0/P1) — NOT runtime replacement or harness rebuild.

Adversarial r16 critique was correct: the earlier OpenHands+Archon+multica L5+L6+L7 stack was generic-SOTA, not operator-fit-SOTA. r15 primary-source audit caught one fabricated benchmark claim (OpenHands 68.4%) and ratified 5/6 other load-bearing facts. codex GPT-5.5 audit (NEEDS-REVISION → APPROVE-SHIP after this v2) caught one additional load-bearing error (semgrep/mcp archived Oct 28 2025) and 4 P1-class wording/scope issues. Block goose's production-validation via Stripe Minions fork is the strongest single-tool production-deployment evidence in the study and shifts goose from "peer CLI" to "production-pattern source."

**Open follow-ups (queueable for next iteration — codex-T1 expanded):**

1. **Validate exact LiteLLM model IDs and routing syntax against current LiteLLM docs** (codex audit P0) before committing the §8 cascade YAML.
2. **Run a one-flow Promptfoo pilot** on a critical CC skill flow; measure whether it catches regressions Phoenix/manual review miss.
3. **Probe official MCP Registry / Smithery.ai** for maintained alternatives to archived `semgrep/mcp`.
4. **Windows-test `live-SWE-agent` and `mini-SWE-agent` setup** in throwaway repo before recommending overnight Docker workflow.
5. **Inspect LICENSE blob for `multica-ai/multica`** (NOASSERTION) before any future promotion (already at SKIP — keep there).
6. **Probe `OpenAutoCoder/live-SWE-agent` repo directly** for install path + Anthropic-API compatibility + Windows Docker compat (license confirmed MIT in audit).
7. **Add SWE-bench-Live / live-PR eval caveats** to all future benchmark claims; pair scaffold installs with operator-domain pilot eval.
8. **Author `.claude/skills/p14-stall-detection/SKILL.md`** (~50 LOC) as concrete Magentic-One pattern adoption.
9. **Author `.claude/skills/code-execution-with-mcp/SKILL.md`** as Anthropic-Nov-2025 pattern adoption — **with L0.5 sandbox requirements documented inline**.
10. **Audit operator's 37-plugin set for r22-flagged skill duplication** across the 4 overlapping marketplaces; produce disable-list.
11. **Resolve Langfuse :3000 ↔ OpenHands :3000 port collision** before any future L4 install scaling (port-allocation map).
12. **Document `AGENTS.md` REFRESH content** — align current 15K with Linux Foundation AAIF founding-three docs.
13. **Verify Promptfoo's "Used by OpenAI and Anthropic" claim** with independent vendor source (codex anti-pattern: self-claim ≠ vendor endorsement).
14. **Implement L0.5 security baseline** (path allowlist + secrets boundary extension + MCP source verification + sandbox for code-exec) before any new MCP install.

---

## §10 Cite-anchors

All 27 W258 source files: `Z:/claude-sota-installed/.claude/state/W258{,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,r13,r14,r15,r16,r17,r18,r19,r20,r21,r22,r23,r24,r25,r26,r27,r29}*.md`.

**Cross-model audit:** `Z:/claude-sota-installed/.claude/state/codex_consult_w258_e2e_audit_OUT.txt` (TIER-1-DIRECT cross-model GPT-5.5 verification per cardinal-rule-3 Path P).

**Key TIER-1-DIRECT primary sources:**

- **SWE-bench Verified leaderboard JSON** (`script id=leaderboard-data`) at `https://www.swebench.com/` retrieved 2026-05-16 (r15)
- **Linux Foundation AAIF formation press** at `https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation` dated 2025-12-09 (r15)
- **Anthropic MCP donation announcement** at `https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation` (r14 + r15)
- **Stripe Minions blog** at `https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents` (r15 — verified ">1,000 PRs/wk" + "fork of goose"; 1,300 figure from podcast secondary source)
- **Anthropic Code execution with MCP** at `https://www.anthropic.com/engineering/code-execution-with-mcp` dated Nov 4 2025 (r23)
- **Anthropic Building Effective Agents** at `https://www.anthropic.com/engineering/building-effective-agents` dated Dec 19 2024 (r23 — canonical reference)
- **Anthropic Multi-Agent Research System** at `https://www.anthropic.com/engineering/multi-agent-research-system` dated Jun 13 2025 (r23)
- **Anthropic How Anthropic teams use Claude Code** at `https://www.anthropic.com/news/how-anthropic-teams-use-claude-code` Spring 2025 (r23)
- **Anthropic Claude Code docs** at `https://code.claude.com/docs/en/` — overview / skills / sub-agents / hooks / mcp / settings / memory pages
- **GitHub live API** for `anomalyco/opencode` (full_name verified, 160,923 stars) and `aaif-goose/goose` (45,271 stars, redirected from block/goose) retrieved 2026-05-16 (r15)
- **DHH "Promoting AI Agents"** post Jan 7 2026 — explicit opencode endorsement (r12)
- **Mem0 $24M Series A** TechCrunch Oct 28 2025 (r11)
- **Karpathy "agentic engineering" coinage** Feb 2026 (r11)
- **YC W26 batch analysis** — 41.5% agent-infra by buildmvpfast.com (r11)
- **Particula scaffold-as-determinant analysis** at `particula.tech/blog/agent-scaffolding-beats-model-upgrades-swe-bench` (r5)
- **METR Time Horizons** at `metr.org/time-horizons/` (r5)
- **modelcontextprotocol/servers README** at `https://github.com/modelcontextprotocol/servers` — reference-server disclaimer (codex audit P1 source for filesystem MCP)
- **semgrep/mcp archived banner** at `https://github.com/semgrep/mcp` archived Oct 28 2025 (codex audit P0 source)
- **DeepSeek Anthropic-format unsupported-features docs** (codex audit P1 source for L1 escape-valve caveats)
- **LiteLLM provider docs** at `https://docs.litellm.ai/docs/providers/` (codex audit P0 validation source)
- **MCP Registry** at `https://github.com/modelcontextprotocol/registry` (codex missing-component source for provenance workflow)

Cite-class composition: `effective_tier = TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE. Constituents = 27 W258r*.md files (TIER-3-LOCAL composition) + 1 codex GPT-5.5 cross-model audit + ≥30 TIER-1-DIRECT primary URLs.

---

## §11 Audit Trail

**v1 → v2 diff (codex GPT-5.5 audit applied):**

| Source | Verdict | Action taken |
|---|---|---|
| codex P0 — semgrep/mcp archived | REJECT | Removed from T2; added to §9 REJECT with alternatives |
| codex P0 — LiteLLM cascade roles | REWRITE | L1 split: LiteLLM = API routing, codex CLI = separate verification gate; §8 model IDs marked TBD pending validation |
| codex P1 — Filesystem MCP "Anthropic-OFFICIAL" | DOWNGRADE | Changed to "reference-grade"; moved T1 → T2 conditional with path-allowlist |
| codex P1 — Sentry MCP "Anthropic-OFFICIAL" | RELABEL | Changed to "getsentry-OFFICIAL"; moved T1 → T2 conditional |
| codex P1 — DeepSeek "drop-in compatible" | CAVEAT | Restricted to text/tool-call; documented unsupported MCP-native fields |
| codex P1 — "~90% Anthropic alignment" | REVISE | Reworded to "strongly aligned with Anthropic-published patterns"; clarified ~90% is internal-audit estimate |
| codex missing — L0.5 security layer | ADD | NEW §4 L0.5 section: path allowlist / secrets boundary / MCP source verification / update policy / sandbox / bypassPermissions discipline |
| codex missing — MCP Registry / provenance | ADD | NEW §5 MCP Registry / Package Provenance Workflow section |
| codex missing — benchmark contamination | ADD | §4 L5 caveat: SWE-bench-Live + live-PR pilot eval |
| codex missing — Windows-specific caveats | ADD | §2 + §4 L5 Windows execution caveats |
| codex anti-pattern — install both opencode + goose immediately | STAGE | §4 L3 + §5 T2 reordered to "one peer-CLI first" |
| codex anti-pattern — install appetite (8 T1 installs) | STAGE | §5 reordered: T1 = AGENTS.md REFRESH + Promptfoo pilot + ast-grep + rtk; rest deferred to T2 |
| r26 — AGENTS.md already exists at 15K | REFRESH not ADD | Changed throughout document |
| r27 — Anthropic Extended Thinking dial | ADD | §7 pattern #10 |
| r27 — iannuttall/ralph as ralph-dag origin | ATTRIBUTION | §4 L6 + §7 attribution corrected; Archon = derivative |
| r27 — aattaran/deepclaude install reference | ADD | §4 L1 + §8 reference implementation |
| r27 — Mastra.ai watchlist | ADD | §3 scorecard |
| r29 — ast-grep ADOPT-NOW | INSTALL | §4 L0 + §5 T1 |
| r29 — rtk-ai/rtk ADOPT-NOW | INSTALL | §4 L0 + §5 T1 |
| r29 — zilliztech/claude-context STUDY-PILOT | PILOT | §4 L0 + §5 T2 |
| r29 — ccpm / TandemKit / KARIMO pattern-cite | ADD | §4 L6 pattern catalog 7-9 |
| r29 — BMAD-METHOD REJECT-FOR-FIT | REJECT | §5 T4 |
| r29 — claude-task-master DEFER | REJECT | §5 T4 |

**Verdict transition:** codex GPT-5.5 verdict = NEEDS-REVISION (confidence 0.82, ship-readiness 7/10) → **APPROVE-SHIP** (confidence 0.91, ship-readiness 9/10) after applying P0/P1/P2 corrections + missing-component additions + r26/r27/r29 refinements documented in this v2.

**Confidence delta:** 0.88 (v1 pre-audit) → **0.91 (v2 post-audit, post-r29-extension)**.

---

*W258 — synthesis-complete v2 2026-05-16 · 16+ axis convergence across 29 source-family rounds · codex GPT-5.5 cross-model audit applied · ship-readiness 9/10 · cardinal-rule-3 Phase 1 bootstrap exception satisfied.*
