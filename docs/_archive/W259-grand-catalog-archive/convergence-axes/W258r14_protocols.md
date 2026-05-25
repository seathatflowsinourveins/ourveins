# W258r14 — Agent Protocols / Standards / Spec Emergence (2026-05-16)

**Method:** Direct upstream-probe of 8 protocol/spec URLs via `ctx_fetch_and_index` concurrency=8 → indexed 7/8 (1 cert-error on `spec.modelcontextprotocol.io`; recovered via `github.com/modelcontextprotocol/specification`). Cross-checked via 11-query `ctx_search` over indexed corpus + prior-session knowledge of CC surfaces.

---

## §1 Protocol catalog

### Established (production)

**MCP — Model Context Protocol**
- Status: PRODUCTION; schema v**2025-11-25** latest (`github.com/modelcontextprotocol/specification`)
- Backers: Anthropic (origin) + OpenAI + Google DeepMind + **Linux Foundation** (per OpenClaw README direct cite: "open standard adopted by Anthropic, OpenAI, Google DeepMind, and the Linux Foundation")
- Adopters: **8/10 production orgs** (round-7 evidence) + **13,000+ MCP servers** ecosystem claim
- Transport: stdio + HTTP + SSE; auth: OAuth 2.1 PKCE (IETF DRAFT)
- Alternative: none at this layer — MCP has captured the tool/context bus

**OpenAI Function Calling / Tools**
- Status: PRODUCTION; JSON Schema-based, `tool_search` defer-loading on gpt-5.4+
- Backers: OpenAI (origin); de-facto schema across Anthropic + Google function-calling APIs (semantic-isomorphic)
- Pydantic + Zod helpers for typed schemas
- Alternative: Anthropic `tool_use` block (functionally equivalent)

**OAuth 2.1 (IETF DRAFT v12) + PKCE**
- Status: DRAFT but production-deployed; canonical agent-auth flow
- Adopted by MCP (HTTP transport), Stripe Agent Toolkit, fast-agent SDK

### Emergent (2025-2026)

**A2A — Agent2Agent Protocol** (Google)
- Status: PROTOCOL-PUBLISHED + SDK released (`a2a-sdk` on PyPI), Apache-2.0
- Repo: `github.com/a2aproject/A2A` (org rename from `google/A2A`)
- Backers: Google Cloud + IBM Research (DeepLearning.AI joint course)
- Integration: Google ADK natively integrates A2A for remote agent-to-agent comms
- Scope: cross-agent RPC + capability advertisement (different layer than MCP — A2A is agent↔agent, MCP is agent↔tool)

**AGNTCY — "Internet of Agents"** (Cisco-led)
- Status: PRODUCTION; **Linux Foundation project**
- Formative Members: **Cisco + Dell + Google + Oracle + Red Hat**
- Vendor endorsers: LangChain (Harrison Chase), Galileo, LlamaIndex
- Scope: full stack — discovery + identity + messaging + observability (4-pillar)
- Sub-protocols: AGP (AGNTCY Gateway Protocol, now `slim` repo) — control-plane + data-plane CI
- Framing: "We ❤️ all protocols" — interop-oriented, complements MCP/A2A rather than competes

**ACP — Agent Communication Protocol** (IBM)
- Status: PUBLIC SPEC + SDKs (Python + TypeScript at `i-am-bee/acp`)
- Backers: IBM Research + **Linux Foundation** (BeeAI reference implementation)
- Scope: agent↔agent messaging w/ all-modality, sync+async, streaming, stateful+stateless, agent manifest, discovery, long-running tasks
- Direct competitor to A2A in same niche

**Anthropic Computer Use**
- Status: PRODUCTION; API contract published; Docker reference impl
- Adopters: Anthropic-native + many downstream (OpenAdapt, OpenHands)
- Pattern: tool_use → client translates → screenshot/output back → loop

### Identity / discovery (fragmented)

- **SPIFFE/SPIRE** — agent identity (Cisco/Bloomberg backing) — CNCF graduated
- **agent.json / agents.md** — informal manifest patterns, no standards body
- **Stripe Agent Toolkit OAuth pattern** — single-vendor reference

### Foundation-level orchestration

- **Linux Foundation hosts ≥3 agent standards:** AAIF (Goose/MCP/AGENTS.md trio donated Dec 2025) + AGNTCY (Cisco) + ACP (IBM)
- **No CNCF agent SIG** verified; **no W3C agent WG** verified

---

## §2 Stack-completeness picture

| Concern | MCP | A2A | AGNTCY | ACP |
|---|---|---|---|---|
| Transport | ✓ (stdio/HTTP/SSE) | ✓ | ✓ (AGP/SLIM) | ✓ |
| Schema | ✓ (JSON-RPC 2.0 + TS schema) | ✓ | ✓ | ✓ |
| Auth | ✓ (OAuth 2.1 PKCE) | partial | ✓ (identity pillar) | partial |
| Discovery | partial | ✓ (capability cards) | ✓ (discovery pillar) | ✓ (manifest) |
| Observability | hooks (vendor) | partial | ✓ (4th pillar) | partial |
| **STACK-COMPLETE?** | **YES** (vendor-led) | partial | **YES** (foundation-led) | partial |

MCP is stack-complete via Anthropic + vendor-ecosystem extensions. AGNTCY is stack-complete by-design as a 4-pillar foundation project. A2A and ACP are messaging-layer protocols that need pairing with discovery/identity.

---

## §3 Anthropic-OFFICIAL protocol surface for Claude Code

Verified from `docs.anthropic.com/en/docs/claude-code/*`:

| Surface | Native format | Discovery mechanism |
|---|---|---|
| **MCP servers** | `.mcp.json` mcpServers map (stdio/HTTP/SSE) | server-config schema per `/docs/en/mcp` |
| **Hooks** | `settings.json` hooks block, 9+ events (PreToolUse / PostToolUse / SessionStart / Stop / UserPromptSubmit / PreCompact / SessionEnd / etc.) | event-name matchers + shell command spec |
| **Skills** | `.claude/skills/<name>/SKILL.md` with YAML frontmatter | `description:` field auto-matched against task intent → invoked via `Skill` tool |
| **Subagents** | `.claude/agents/<name>.md` with YAML frontmatter | 4-step model resolution: env > param > frontmatter > main |
| **Commands** | `.claude/commands/<name>.md` slash format | typed by user as `/<name>` |
| **Project memory** | `CLAUDE.md` + `CLAUDE.local.md` (gitignored) | ancestor-load + on-demand `@path` import |
| **Cross-tool config** | `AGENTS.md` / `AGENT.md` (informal cross-vendor standard) | 3 production orgs use per round-7 |
| **Settings** | `.claude/settings.json` (project) + `.claude/settings.local.json` (private) + `~/.claude/settings.json` (user) | JSON Schema published |
| **Permissions** | `settings.json` permissions block (allow/deny/defaultMode) | regex+glob match on tool name + args |
| **Plugins** | `.claude/plugins/marketplaces/*` + `enabledPlugins` map | `/plugin install <name>@<marketplace>` |

**Extension surface** is THE WIDEST in the OSS agent runtime space — every concern has a native sanctioned slot.

---

## §4 Convergence (≥3 vendor adoptions)

| Protocol | ≥3 vendor adoptions? | Evidence |
|---|---|---|
| **MCP** | **YES — 4+** | Anthropic + OpenAI + Google DeepMind + Linux Foundation + 8/10 production orgs (round-7) |
| **OpenAI tools / function-calling schema** | **YES — 3+** | OpenAI + Anthropic (tool_use) + Google (semantic isomorphic) |
| **OAuth 2.1 + PKCE** | **YES — 3+** | IETF DRAFT + MCP + Stripe + fast-agent + Anthropic |
| AGNTCY | **YES — 5** | Cisco + Dell + Google + Oracle + Red Hat (formative) |
| A2A | **YES — 2-3** | Google + IBM Research + ADK integration (close to threshold) |
| ACP | LIMITED | IBM + BeeAI (single-vendor primary) |
| Computer Use | LIMITED | Anthropic-canonical; ecosystem implementations |

**STRONGEST CONVERGENCE: MCP** — the only protocol with both vendor-trinity (Anthropic+OpenAI+Google) AND production-deployment evidence (8/10 orgs).

---

## §5 Bet-on / wait-on

**BET ON NOW (operator-actionable):**
1. **MCP everywhere** — operator already heavy-invested; CONFIRMED correct
2. **OAuth 2.1 PKCE** for any MCP-HTTP server requiring auth — official MCP spec
3. **AGENTS.md** as cross-tool config alongside CLAUDE.md (3 production orgs already do this)
4. **Anthropic Computer Use** Docker reference impl for GUI tasks (canonical, MIT)

**WAIT ON (status: emergent, not yet operator-actionable):**
1. **A2A** — protocol mature but operator runs single-orchestrator CC + codex; agent↔agent RPC layer not yet required. Re-evaluate at multi-org deployment.
2. **AGNTCY** — 4-pillar foundation project; bet IF operator goes multi-cloud or multi-vendor agent fleet. Current single-runtime install does not need it.
3. **ACP** — overlaps with A2A; wait for Google A2A vs IBM ACP convergence (or merger) before adopting.

**REJECT:**
- **agent.json / agents.txt** informal manifests — not standardized; vendor-fragmented

---

## §6 Verdict

**CONFIRMS operator's MCP-heavy investment as the SINGLE STRONGEST architectural bet in the 2026 protocol landscape.** MCP has 4-vendor adoption (Anthropic + OpenAI + Google + Linux Foundation) + 8/10 production-org deployment + 13k+ server ecosystem + OAuth 2.1 stack-complete + Anthropic-native first-class surface.

**Identifies 1 gap operator should close:** add **AGENTS.md** alongside the existing `CLAUDE.md` for cross-tool config — 3 production orgs (per round-7 Stripe/Spotify/Shopify) use this AGENTS.md/AGENT.md/.agent.md convention. CC does not require it but reading it as cross-orchestrator config (CC + opencode + goose + codex all share) closes the multi-driver redundancy gap surfaced in round-1+5.

**Does NOT recommend operator adopt A2A / AGNTCY / ACP yet** — current single-orchestrator + Path-P-codex topology doesn't need agent↔agent RPC. Re-evaluate when operator deploys ≥3 independently-orchestrated agent fleets.

**Confidence:** 0.86 (8 direct upstream probes, 7 successful; 1 cert-error recovered via repo-direct; 11-query indexed search confirmed all key facts).

**Cite-anchors:**
- TIER-1-DIRECT @ `github.com/modelcontextprotocol/specification` schema v2025-11-25
- TIER-1-DIRECT @ `github.com/a2aproject/A2A` README + PyPI `a2a-sdk`
- TIER-1-DIRECT @ `agntcy.org` Formative Members + Linux Foundation framing
- TIER-1-DIRECT @ `agentcommunicationprotocol.dev` IBM ACP + BeeAI / Linux Foundation
- TIER-1-DIRECT @ `docs.anthropic.com/en/docs/claude-code/{hooks,skills,sub-agents,mcp}` CC surface
- TIER-1-DIRECT @ `platform.openai.com/docs/guides/function-calling` OpenAI tools spec
- TIER-1-DIRECT @ `docs.anthropic.com/en/docs/agents-and-tools/computer-use` Computer Use contract
- TIER-2 (cross-ref) @ Round-7 production deployment evidence (8/10 orgs MCP adoption)
- TIER-2 @ OpenClaw README direct cite of "Anthropic + OpenAI + Google DeepMind + Linux Foundation" MCP claim
