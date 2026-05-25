---
title: Wave 230 Agent U - Architect Review of W229 Phase 0-10 Install Order for Z:\claude-sota-pure
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 230
fire: 1
agent: comprehensive-review:architect-review
artifact-class: architect-review-phase-0-10
predecessors: W229 OPERATOR-EXECUTION-CATALOG
---

## ARTIFACT-INLINE: tmp/wave230-agentU-architect-review-phase-0-10-2026-05-15.md

## STAND-IN-NOTICE

Agent U dispatched as `comprehensive-review:architect-review` under env-funneled Sonnet stand-in per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`. Cross-model gate NOT structurally satisfied for this verdict. Orchestrator MUST run Pattern D codex T1 (real GPT-5.5 BRIDGE-MODE) as Forward Top-5 F2 BEFORE Phase 1 commit per W229 §5 cross-model gate status table. This review is single-model architectural analysis grounded in cardinal-rule-1 cite anchors + direct file:line probes of W229 catalog + claude-sota-pure runtime state.

## Architectural lens framing

Z:\claude-sota-pure is a **CLAUDE CODE RUNTIME** (Claude Code CLI orchestrator + cross-model Codex reviewer per T1-T7 lifecycle), NOT an application stack. Architecturally this is:

- **Layered single-host system** (single Windows operator) — not a distributed-microservices architecture
- **Plugin-bus + MCP-bus composition** — every primitive arrives via official marketplace install (CR-5) or `.mcp.json` registration (CR-12 PRIMARY)
- **Cite-discipline-driven evolution** — install-priority + freshness gates govern the "service mesh" (CR-6 official-native-channel)
- **Event-driven cross-cutting** — hook lifecycle (PreToolUse/PostToolUse/Stop/SessionStart) is the event-bus per `Z:/claude-sota-installed/.claude/rules/layered-gates-architecture.md §1`

The relevant architecture patterns are:
1. **Hexagonal/ports-and-adapters** — MCP servers as ports; plugins as adapters
2. **Layered composition** — Foundation (cwc primitives) → Plugins (marketplaces) → Workflows (skills+agents+commands) → Audit (hooks+JSONL)
3. **Cross-cutting concerns** — Governance (CR-7 graduated unleash) + Security (CR-9 install-risk) + Observability (audit-action-loop)

I review Phase 0-10 against this architectural shape, NOT against generic enterprise-microservices DDD criteria.

---

## Q1 — Install-order architectural coherence

**Verdict: NEEDS-REVISION on 3 dimensions; baseline order is sound**

### Q1.a — Memory stack: Phase 0 L1+L3 vs Phase 6 L4 cognee — COMPLEMENT, but architectural risk surfaces

W229 Phase 0 has mcp-memory-service (L1 capture, sqlite_vec) + graphiti (L3 temporal-KG, FalkorDB v1.6.1) INSTALLED. Phase 6 proposes cognee (17,246★, Memory L4 — semantic/knowledge engineering layer).

**Cite anchor**: Per `Z:/claude-sota-installed/CLAUDE.md` Memory Stack section L171 — graphiti already wired at `.mcp.json` with `FALKORDB_URI=redis://127.0.0.1:16379`. Wave 119 Path D codex T1 prior verdict at W221-E classified cognee as PROVIDER-COMPLEMENT per CR-12 6-class disposition lattice — semantic memory at L4 is genuinely above L3 temporal-KG.

**Architectural concern**: PROVIDER-COMPLEMENT classification requires **explicit boundary contract** between L3 graphiti and L4 cognee. Without it:
- Both KG-class memories ingest the same episodes → duplicate storage + ambiguous retrieval source-of-truth
- Embedding inference fan-out (both call sentence-transformers) — duplicate compute
- Query routing unclear (which layer answers "what did I decide in Wave 119?")

**Recommendation**: BEFORE Phase 6 cognee install, define operator-facing query-routing contract (e.g., "L3 = temporal facts with timestamps; L4 = semantic relationships abstracted from episodes; L1 = raw episode capture"). If no clean boundary emerges, classify as DUPLICATE-FUNCTIONALITY per CR-12 and REJECT cognee.

### Q1.b — Phase 4 fastmcp BEFORE Phase 8 playwright-cli — CORRECT, but underspecified

fastmcp (PrefectHQ, 25,175★, A) is the MCP server-framework. Phase 8 playwright-cli + chrome-devtools-mcp are MCP SERVERS that may need custom extension layers.

**Concern**: W229 catalog doesn't specify whether Phase 8 servers consume Phase 4 fastmcp. If chrome-devtools-mcp is upstream-installed-as-is (`npx -y chrome-devtools-mcp@latest` — already wired in `.mcp.json`), fastmcp is NOT a dependency. If operator plans custom MCP extension authoring, fastmcp is essential.

**Recommendation**: Add explicit decision to Phase 4: "fastmcp INSTALLED iff operator queues custom MCP authoring tasks in Forward Top-5; otherwise DEFER to demand-trigger". Defer is the SIMPLER alternative per YAGNI.

### Q1.c — Phase 10 governance at END — ARCHITECTURAL ANTI-PATTERN; should be EARLIER

**This is the strongest architectural finding.** Phase 10 places wshobson governance trio (Tom Farley protect-mcp Cedar+Ed25519 + review-agent-governance + signed-audit-trails) + block-no-verify + context-management at the LAST phase.

**Cite anchor**: Per `Z:/claude-sota-installed/CLAUDE.md` Intentional Divergences row (d) — runtime is currently `permissions.defaultMode: "bypassPermissions"` per Wave 82d operator-override [VERIFIED 2026-05-08]. The Cardinal Rule 7 graduated unleash invariant requires Tier 5 INSTALLED+smoke-PASS BEFORE Phase 3 destination. The runtime is OPERATING in Phase 3 (bypassPermissions) WITHOUT the governance layer that justifies it.

**Architectural principle violated**: **Zero Trust security model** — defense-in-depth requires the security boundary EARLIEST, not LAST. Per the security architecture canon: protect-mcp (Cedar policy + Ed25519 signed receipts) + block-no-verify (commit-bypass prevention) are CONTROL PLANE for the bypassPermissions data plane. Installing them last means weeks/months of operating without governance while exposing maximum surface area (Phase 1-9 expand the install surface dramatically).

**Recommendation (REVISION)**: Re-order Phase 10 governance trio to **Phase 2.5 or Phase 3.5** (after marketplaces foundation, before scaling install surface). Specifically:
- `wshobson/agents/plugins/block-no-verify` → Phase 2.5 (immediate — protects every subsequent commit)
- `wshobson/agents/plugins/protect-mcp` (Cedar + Ed25519) → Phase 3.5 (after Anthropic OFFICIAL repos cloned, before MCP/CLI tool flood)
- `wshobson/agents/plugins/signed-audit-trails` → Phase 3.5 (companion)
- `wshobson/agents/plugins/review-agent-governance` → Phase 3.5 (companion)
- `wshobson/agents/plugins/context-management` → KEEP Phase 10 (cumulative, lower urgency)

**Cite anchor for re-order**: Per `Z:/claude-sota-installed/.claude/rules/layered-gates-architecture.md §5 Layer 2 commit-gate enforcer` — sync STRICT FAIL_CLOSED commit-gate semantics REQUIRE block-no-verify pattern; sibling claude-sota documents this as load-bearing for any commit boundary.

### Q1.d — Phase 6 LLM-proxy litellm BEFORE Phase 9 ACP — CORRECT but optional

litellm (47,091★, STUDY-PILOT.b) is a multi-provider proxy. ACP (claude-agent-acp 1,900★ + agentclientprotocol/python-sdk 255★) is the agent-client-protocol layer.

**Architectural reality**: ACP adapters use direct Anthropic/Codex API — they do NOT structurally depend on litellm. Phase 6 litellm install is OPTIONAL infrastructure, not a Phase 9 prerequisite.

**Recommendation**: Mark litellm as STUDY-PILOT.b with explicit operator decision gate ("install only if multi-provider routing demand emerges"). YAGNI — single-operator harness with Claude+Codex doesn't need a routing proxy by default.

---

## Q2 — Architectural anti-patterns in the catalog

**Verdict: NEEDS-REVISION — 50+ ADOPT-NOW is a clear over-engineering signal**

### Q2.a — ~50 ADOPT-NOW vs ~20 sufficient — YAGNI BREACH

Per `Z:/claude-sota-installed/.claude/rules/kiss-dry-yagni.md` Must-Never #9: "speculative helpers/abstractions" prohibited.

**Hard count of Phase 1-10 commands**: ~50 ADOPT-NOW × (install command + smoke probe + manifest entry + provenance log entry) = ~200 atomic operations. Per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE, this exceeds the bounded-ship 200-LOC ceiling enforced by `codification-threshold.md` step 3.

**Specific YAGNI breaches**:
1. **Phase 6 cognee + Phase 0 graphiti** — both KG-class L3/L4 (covered Q1.a above)
2. **Phase 6 sentence-transformers + Phase 7 PaddleOCR** — both embedding-class; sentence-transformers is pure ML library + PaddleOCR is doc-AI but embeds OCR'd text similarly
3. **Phase 7 DuckDB + motherduck-mcp** — both DuckDB-class; motherduck-mcp REQUIRES DuckDB. Is operator committed to MotherDuck SaaS account? If not, MotherDuck-mcp is YAGNI; raw DuckDB CLI suffices
4. **Phase 9 onyx (~5GB) OR ragflow (~10GB)** — operator must pick ONE per cycle-300, not install both as catalog suggests
5. **Phase 4: 11 W228-P SOTA CLI** (delta + difftastic + lazygit + bat + fd + ripgrep + eza + zoxide + tldr + dust + bottom + tokei) — 11 CLI tools at once violates ONE-LOGICAL-UNIT-PER-FIRE; ripgrep is "ALREADY-INSTALLED per W228-P note"

**Recommendation**: Cut to **20-25 ADOPT-NOW** for initial install wave. Defer 25+ to demand-trigger queue. Specifically:
- KEEP: Foundation + marketplaces + ccusage + cwc + claude-cookbooks + mcp-builder + ast-grep + 1 KG-L4 (cognee OR demand-gate it) + 1 RAG-e2e (operator picks onyx OR ragflow upfront) + governance trio + chrome-devtools-mcp
- DEFER: 11 W228-P CLI batch → install top-3 (bat+fd+eza for daily workflow); rest demand-gated
- DEFER: Voice/TTS (elevenlabs-mcp) until voice workflow declared
- DEFER: Phase 6 litellm + Phase 9 Temporal (operator-specific demand signals)

### Q2.b — BMAD-METHOD selective adoption — UNDERSPECIFIED

BMAD-METHOD (47,256★ MIT) is 47k★ but classified PARTIAL-OVERLAP per CR-12. W229 catalog says "selective adoption" without naming the SPECIFIC subset.

**Architectural concern**: BMAD provides full agile-method workflow (planning + grooming + sprint discipline + retrospective). Most of that is OUT-OF-SCOPE for a single-operator harness. The selective subset must be NAMED, not assumed.

**Recommendation**: BEFORE Phase 5 BMAD install, explicitly enumerate the BMAD subset to install (e.g., "only `bmad-method/.claude/agents/planner.md` + `bmad-method/.claude/skills/grooming/SKILL.md`"). If the subset is empty after honest review, REJECT-FOR-FIT per `eee --worktree` already-wired alternative.

### Q2.c — Phase 6 has 5 installs — ONE-LOGICAL-UNIT-PER-FIRE breach

Phase 6 bundles: cognee + langfuse + litellm + sentence-transformers + promptfoo. This is 5 distinct logical units (Memory L4 / Observability / LLM-proxy / Embedding / Eval).

**Recommendation**: Split Phase 6 into 6.a (Memory L4 cognee), 6.b (Observability langfuse), 6.c (Eval promptfoo). 6.d (litellm + sentence-transformers) → demand-gated.

### Q2.d — Hidden DUPLICATES NOT caught in W228-Q

W228-Q caught 5 wshobson DEMOTED-DUPLICATE (debugging-toolkit + tdd-workflows + comprehensive-review + error-debugging + agent-orchestration). Architectural review surfaces additional potential duplicates:

- **promptfoo (Phase 6 + Phase 10)** — listed TWICE in W229 §3 catalog (Phase 6 W228-R AND Phase 10 W228-P CI/CD-tier-B). Cite anchor: W229 §3 lines counting both occurrences. **DUPLICATE-FUNCTIONALITY catch missed by W228 verifier.** RESOLVE: install ONCE in Phase 6.c; Phase 10 references the same install via `promptfoo eval --ci` CI/CD wrapping.
- **chrome-devtools-mcp already wired** in `.mcp.json` — Phase 8 lists it as "ADOPT-NOW" but `cat Z:/claude-sota-pure/.mcp.json` shows it already-INSTALLED. **STALE catalog entry.** RESOLVE: Phase 8 reduces to playwright-cli SKILLs only (chrome-devtools-mcp is no-op).
- **gitnexus already INSTALLED** in `.mcp.json` line 38 — `npx -y gitnexus mcp`. Phase 4 Code-intel adds ast-grep; verify no functional overlap (gitnexus = call-graph + symbols; ast-grep = AST-pattern-rewriting; PROVIDER-COMPLEMENT confirmed).

---

## Q3 — Scalability + Maintainability

**Verdict: NEEDS-REVISION on resource footprint disclosure**

### Q3.a — Phase 6 langfuse Docker stack footprint

Per langfuse Docker compose canonical (Postgres + worker + web + clickhouse): ~2-3GB RAM, ~5GB disk baseline. For a single-operator harness with bounded session counts (~10-50 sessions/month), the footprint is justified IF observability is a load-bearing primitive.

**Architectural alternative**: langfuse-cloud (managed SaaS) provides identical observability at $0/mo for hobby tier. Per CR-5 install-priority, self-hosted is preferred; per scalability calculus, cloud is simpler.

**Recommendation**: Phase 6.b langfuse install = START WITH CLOUD; migrate to self-hosted Docker if (a) data sovereignty demand emerges, (b) sustained usage exceeds free-tier, (c) operator queues docker-compose maintenance budget. Cite anchor: `https://langfuse.com/self-hosting` (Apache-2.0 self-host instructions exist; cloud is free-tier acceptable for single-operator).

### Q3.b — Phase 9 onyx vs ragflow operator decision matrix

W229 says "operator picks". As architect I provide the decision matrix:

| Dimension | onyx (~5GB) | ragflow (~10GB) |
|---|---|---|
| Stars | 29,400 | 80,600 |
| Footprint | ~5GB RAM | ~10GB RAM |
| License | (verify) | (verify) |
| Bundled stack | RAG + chat UI | RAG + chat UI + deeper doc parsing |
| Suitability for single-operator | HIGH | OVERKILL |

**Recommendation**: Pick **onyx** as default; ragflow only if operator has 80k★-grade RAG workload AND 10GB headroom. If neither matches, REJECT BOTH and use simpler alternative: `pip install llama-index` (1k★ A+ Apache-2.0) + existing chrome-devtools-mcp for browsing docs. YAGNI applies — most single-operator use-cases don't need an end-to-end RAG stack.

### Q3.c — Phase 7 DuckDB + motherduck-mcp scale ceiling

`.claude/state/*.jsonl` audit warehouse: current scale (verified via `ls Z:/claude-sota-installed/.claude/state/` — hundreds of JSONL files, ~10MB total). DuckDB handles 1M+ row analytics easily; the ceiling is operator query patterns, not DuckDB capability.

**Architectural concern**: motherduck-mcp adds cloud-DuckDB SaaS dependency. Per CR-6 official-native-channel, motherduck IS the canonical cloud-DuckDB channel — but for a single-operator local-only audit warehouse, motherduck adds zero value.

**Recommendation**: INSTALL DuckDB local CLI; SKIP motherduck-mcp unless operator declares cloud-DB demand.

### Q3.d — sentence-transformers feeds cognee?

Phase 6.a cognee (Memory L4) and Phase 6 sentence-transformers (embedding-class). **Architectural integration**: cognee likely embeds episodes internally — does it CONSUME sentence-transformers as a pinned dep, or use its own default embedding?

**Probe required**: BEFORE Phase 6.a install, verify cognee's default embedding backend (likely OpenAI-API by default; sentence-transformers as alt). If sentence-transformers is the canonical cognee backend, install order is: sentence-transformers FIRST, cognee SECOND.

**Recommendation**: Phase 6 sub-order: 6.a.1 sentence-transformers → 6.a.2 cognee → 6.b langfuse → 6.c promptfoo.

---

## Q4 — Cardinal Rules conformance

**Verdict: APPROVE — all 10 phases align**

### Q4.a — CR-5 install-priority: Phase 1-10 commands ALL install-class

Verified: every Phase 1-10 command is `pip install` / `npm install -g` / `winget install` / `cargo install` / `docker pull` / `/plugin install` / `git clone`. ZERO hand-coding detected. **PASS**.

### Q4.b — CR-6 official-native-channel: `@latest` audit

Per CR-9 install-risk discipline, every `@latest` must carry version pin OR `@latest-acknowledged-D6-risk` marker. Phase 1-10 catalog has multiple unpinned `@latest` references (Phase 8 `chrome-devtools-mcp@latest` already in `.mcp.json`; Phase 4 `tldr` / `eza` via cargo install without version pin).

**Recommendation**: At install execution, pin every `@latest` with current version OR explicit acknowledgment. Cite anchor: CR-9 mandate at `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-9 block.

### Q4.c — CR-8 full-SOTA-content invariant — PASS

Every Phase 1-10 install adapts SOTA patterns from upstream repos with file:line cite anchors per W229 §3 catalog. Per-row CR-8 status column populated as ADAPTED-FROM-SOTA in W229 catalog. **PASS**.

### Q4.d — CR-10 research-first-then-install — PASS

W220-W228 = 6 research waves = ~18 agent dispatches confirming research depth. Proceeding to install execution is CR-10 conformant. **PASS**.

### Q4.e — CR-12 6-class disposition lattice — PASS but UNDERSPECIFIED

Per-phase candidates classified across GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL. **Concern**: cognee (PROVIDER-COMPLEMENT) needs the boundary contract per Q1.a; otherwise CR-12 disposition is hopeful, not architectural.

---

## Q5 — Over-engineering risks + 2-option trade-offs

### Q5.a — Phase 5 BMAD vs `eee --worktree`-only

- **BMAD**: 47k★ MIT, full agile workflow, ~50+ skills bundled, integration overhead
- **`eee --worktree`** (ALREADY-WIRED): bash launcher with worktree-isolation, satisfies parallel-session need

**Recommendation**: START with `eee --worktree`. Add BMAD subset ONLY if operator queues a workflow that `eee --worktree` cannot satisfy. SIMPLEST alternative wins per `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` KISS principle.

### Q5.b — Phase 6 langfuse self-hosted vs cloud

Per Q3.a above. SIMPLEST: START CLOUD, migrate later.

### Q5.c — Phase 9 onyx vs ragflow vs llama-index

Per Q3.b above. SIMPLEST: `pip install llama-index` + browser-MCP integration. Skip both heavyweights unless demand-gated.

### Q5.d — Phase 10 protect-mcp Cedar+Ed25519 — ESSENTIAL or OVERKILL?

**Verdict: ESSENTIAL given bypassPermissions runtime state.**

Runtime is operating in `bypassPermissions` mode (per CLAUDE.md Intentional Divergences row (d)). Without governance trio:
- Every Edit/Write/Bash runs with NO permission prompt
- No cryptographic audit trail of decisions
- Ed25519 signed receipts are the only verifiable record of "what did agent X actually do at time T"
- Cedar policy engine is the only declarative authorization layer between agent intent and filesystem effects

The argument that "single-operator harness doesn't need crypto governance" assumes the operator FULLY TRUSTS every plugin install + every agent action. In a 50-plugin install plan with 27 phantom-cite catches across W221-W228, that trust is unwarranted. Governance is essential.

**Recommendation**: Promote Phase 10 governance trio to Phase 2.5/3.5 per Q1.c above. The architectural cost of operating bypassPermissions without governance compounds with every Phase 1-9 install.

---

## Q6 — Integration risks

### Q6.a — Phase 8 playwright-cli SKILLs vs claude-sota-installed superpowers vendoring

Per `Z:/claude-sota-installed/.claude/rules/team-orch-frameworks.md §Selectively-vendored sister skills`: 6 superpowers skills vendored (plan/debug/tdd/verification-before-completion/subagent-driven-development/requesting-code-review).

**Integration probe**: playwright-cli SKILLs are browser-automation specific (not in superpowers vendored set). Conflict UNLIKELY but verify post-install via `ls Z:/claude-sota-pure/.claude/skills/playwright-*` vs existing superpowers path.

**Recommendation**: Smoke-probe post-install: verify no SKILL.md name collision.

### Q6.b — Phase 10 wshobson governance trio vs existing `_secret_redactor.py` + audit-action-loop hooks

claude-sota-installed has shipped `_secret_redactor.py` (per `Z:/claude-sota-installed/.claude/rules/lga-worktree-prereq.md §11 Secret-redaction discipline`) + audit-action-loop JSONL hooks (per `audit-action-loop.md`).

**Integration probe**: Tom Farley signed-audit-trails uses Ed25519 cryptographic signing of audit JSONL. The existing audit-action-loop produces UNSIGNED JSONL. **Migration concern**: do existing JSONL audit logs migrate to signed format, or does signed-audit-trails wrap NEW logs only?

**Recommendation**: BEFORE Phase 10 install, decide migration strategy: (a) forward-only (new logs signed; existing unsigned remain as-is per `port-note-discipline.md §6` no-retroactive-rewrite), OR (b) batch-sign existing logs with timestamp marker. Forward-only is SIMPLER + conformant to existing port-note-discipline.

### Q6.c — Phase 6 cognee + Phase 0 graphiti PROVIDER-COMPLEMENT classification

Per Q1.a above. Architectural review requires explicit boundary contract.

---

## Architectural Summary — REVISED Phase Re-Ordering

Per the 6 review dimensions above, recommend the following architectural re-ordering BEFORE operator execution:

| Original Phase | REVISED Phase | Rationale |
|---|---|---|
| Phase 0 (DONE) | Phase 0 (DONE) | Foundation intact |
| Phase 1 (marketplaces) | Phase 1 | KEEP |
| Phase 2 (ccusage + elevenlabs) | Phase 2.a (ccusage only) | DEFER elevenlabs to demand-trigger |
| Phase 10 governance (block-no-verify only) | **Phase 2.5 (block-no-verify)** | **CRITICAL re-order** — commit-gate before scaling |
| Phase 3 (Anthropic OFFICIAL) | Phase 3 | KEEP |
| Phase 10 governance (Tom Farley trio) | **Phase 3.5 (protect-mcp + signed-audit-trails + review-agent-governance)** | **CRITICAL re-order** — governance before MCP/CLI flood |
| Phase 4 (fastmcp + ast-grep + 11 CLI) | Phase 4.a (ast-grep + top-3 CLI: bat+fd+eza) | TRIM 11 to 3; demand-gate rest |
| Phase 4 fastmcp | Phase 4.b (demand-gated) | DEFER unless custom MCP authoring queued |
| Phase 5 (BMAD selective) | Phase 5 (DEMAND-GATED) | Use `eee --worktree` first |
| Phase 6 (5 installs) | Phase 6.a (sentence-transformers) → 6.b (cognee with boundary contract) → 6.c (langfuse cloud) → 6.d (promptfoo) | SPLIT per ONE-LOGICAL-UNIT-PER-FIRE; DEFER litellm |
| Phase 7 (security + DocAI + ntfy + DuckDB) | Phase 7.a (Trivy + bandit) → 7.b (DuckDB local) → 7.c (ntfy demand-gated) → 7.d (PaddleOCR demand-gated) | SPLIT; demand-gate doc-AI and notification |
| Phase 8 (playwright-cli) | Phase 8 (playwright-cli SKILLs; chrome-devtools-mcp NO-OP already-wired) | KEEP REVISED |
| Phase 9 (onyx OR ragflow + ACP + Temporal) | Phase 9 (ACP only); RAG-e2e DEMAND-GATED; Temporal DEMAND-GATED | KEEP ACP; defer heavyweight RAG and durable-execution |
| Phase 10 (context-management) | Phase 10 (context-management; promptfoo dedup with Phase 6.d) | TRIM duplicates |

**Cumulative install count**: REVISED reduces ~50 ADOPT-NOW → ~25 ADOPT-NOW (+15 demand-gated queue). Per KISS principle this is appropriate baseline; demand-trigger expansion is healthier than upfront over-install.

---

## VERDICT

**NEEDS-REVISION: Re-order Phase 10 governance trio to Phase 2.5/3.5 (security defense-in-depth) + split Phase 6 into 4 sub-fires (ONE-LOGICAL-UNIT-PER-FIRE) + cut ~50 ADOPT-NOW to ~25 ADOPT-NOW per YAGNI + define cognee/graphiti L3-L4 boundary contract BEFORE Phase 6.b cognee install + resolve promptfoo duplicate entry (Phase 6 vs Phase 10) + smoke-probe playwright SKILL collision post-install + decide signed-audit-trails forward-only-vs-batch migration strategy + operator picks onyx OR ragflow OR llama-index (not catalog ambiguity) + Pattern D codex T1 BRIDGE-MODE review BEFORE Phase 1 install commit per W229 §5 cross-model gate.**

Forward action items for orchestrator:
1. **F1**: Apply Q1.c Phase 10 → Phase 2.5/3.5 re-order in operator-execution catalog
2. **F2**: Run Pattern D codex T1 (real GPT-5.5 BRIDGE-MODE) on REVISED Phase order
3. **F3**: Mia pre-apply on Q2.d duplicate catches (promptfoo + chrome-devtools-mcp already-wired)
4. **F4**: Define cognee/graphiti boundary contract; classify as DUPLICATE-FUNCTIONALITY if no clean boundary emerges
5. **F5**: Operator picks: onyx OR ragflow OR llama-index (single-choice) BEFORE Phase 9 commit
