# W367 Operator-Decisions Pending

Running log of operator-decisions surfaced by W367 research streams. Resolved post-ship or carried to W368+.

---

## OD-1 — Tavily MCP account disabled (Stream E)

**Issue:** `mcp__tavily__*` calls returned account-disabled errors during cross-MCP validation. Degraded D89 from 4/4 max to 3/3 max with `confidence_factor=0.85`.

**Decision required:** (a) refresh billing key, (b) remove from .mcp.json + lock D89 3/3, (c) replace with firecrawl as 4th.

**Recommendation:** (c) — firecrawl + perplexity + exa + brave is robust 4-MCP set. **AUTO-APPLY (c) in W368 P0.7.**

---

## OD-2 — L15 sandboxing SHIP-BLOCKER on Windows (Stream A #3)

**Issue:** Windows-native CC OS-sandbox structurally inert. SOTA candidates (firecracker 34k, gvisor 18k, e2b 12k) don't satisfy CR-5 on Windows-native pathway. R5 held via sca-v11 §6 5-control layered-defense.

**Decision required:** (a) accept gap, (b) container-migrate to WSL2/Docker, (c) custom user-mode perms model, (d) e2b cloud-sandbox via MCP for untrusted code.

**Recommendation:** **(d) for untrusted code via remote-sandbox + (a) baseline for current usage**. Hybrid.

**Status:** PENDING — long-term architectural decision; queue for W372.

---

## OD-3 — L16 vector-DB design tension: mem0 vs basic-memory T6 (Stream A #4)

**Issue:** mem0 scored T1-INSTALL (4.4) but basic-memory T6 wins on D1 filesystem-survivability.

**Decision required:** (a) keep basic-memory canonical + defer mem0 to T3-PATTERN, (b) **hybrid** basic-memory ledger + mem0 semantic-overlay, (c) replace.

**Recommendation:** **(b) hybrid** — basic-memory source-of-truth + mem0 fast-recall accelerator. Track mem0 evolution toward markdown-survivable storage.

**Status:** PENDING — queue for W368 P1.

---

## OD-4 — Skill count drift +4 silent (Stream F #1)

**Issue:** CLAUDE.md L67 says "× 58" skills. Live count is **62** (+ 1 archived). `zoom-out` skill (and 3 others) unaccounted.

**Recommendation:** AUTO-APPLY in W368 P0.1.

**Status:** APPROVED-AUTO-APPLY in W368.

---

## OD-5 — `tools/*.mjs` parallel hook ecosystem CR-2 spirit-question (Stream F #2)

**Issue:** 30 `tools/*.mjs` (10 lifecycle-bound via settings.json hooks). LETTER of CR-2 honored (path `.claude/hooks/` empty per W255); SPIRIT may be violated (lifecycle-bound JS bodies exist, just relocated).

**Decision required:** (a) tighten CR-2 to cover `tools/*.mjs` lifecycle-bound, (b) **document `tools/` exception with sanction-list per-file**, (c) leave-as-is.

**Recommendation:** **(b)** — document the 10 lifecycle-bound `tools/*.mjs` as sanctioned exceptions with cite-anchor each.

**Status:** PENDING — meta-cardinal-rule scope decision; queue for W370 or operator-direct-decision.

---

## OD-6 — MCP capability redundancy (Stream F #3)

**Issue:** Current 17-MCP fleet has redundancy:
- Code-intel × 3: `serena` + `codegraph` + `repomix`
- Web-search × 5: `perplexity` + `tavily` + `exa` + `firecrawl` + `brave-search`

**Recommendation:** Run `sota-convergence-audit:eval` against MCP fleet in **W369**. Likely outcome: keep `serena` + `repomix` (different use-cases), retire `codegraph`; keep `perplexity` + `exa` + `firecrawl`, retire `tavily` (per OD-1) + `brave` (overlap).

**Status:** SCHEDULED W369.

---

## OD-7 — Codex GPT-5.5 round structure for W367 ship

**Issue:** Codex r1→rN per V18 §11 — operator pre-approved.

**Status:** AUTO-APPLY when synthesis complete (this turn dispatches r1).

---

## OD-8 — Cite-weight vs decision-tier conflict: `microsoft/autogen` (Stream C ↔ Stream E)

**Issue:** autogen is the MOST-cited awesome-list repo (D86=5, 12 lists) but Stream E T5-REJECT (superseded by `microsoft/agent-framework`).

**Recommendation:** **(c) document as expected behavior** — the rubric's 17-dim aggregation correctly demotes autogen despite high D86. No rubric change. **Validates sca-v19 design**: high-cite-weight DOES NOT override critical-flag deprecation.

**Status:** ARCHITECTURAL NOTE — confirmed rubric design works as intended.

---

## OD-9 — Surprising single-list (Tier-4) repos worth investigating (Stream C)

1. `Dicklesworthstone/mcp_agent_mail` — relevant to W325 multi-session coordination. **Investigate W371.**
2. `anthropics/devcontainer-features` — universal-tier official. **AUTO-APPLY W368 P0.8.**
3. `ChromeDevTools/chrome-devtools-mcp` — verify if upgraded over current chrome-devtools entry. **W368 audit.**
4. Anthropic vertical plugins (financial-services/knowledge-work/life-sciences) — vertical-domain skill patterns. **W372 audit for selective adoption.**
5. `MCP-Defender` + `damn-vulnerable-MCP-server` — runtime defense + red-team pair. **W372 security audit.**

**Status:** Queued.

---

## OD-10 — mastra-ai/mastra T1 candidate (Stream B + C convergence)

**Issue:** `mastra-ai/mastra` (23k★, 10-list) significantly beats `claude-agent-sdk-typescript` (1.4k★). Stream B explicit recommendation: "for new TS agent apps, Mastra is the clear SOTA pick."

**Decision required:** (a) keep claude-agent-sdk-typescript as default + Mastra as alternative, (b) **adopt Mastra as primary for TS agent apps + maintain claude-agent-sdk-ts for Anthropic-specific integration**, (c) replace.

**Recommendation:** **(b) Mastra-primary for new TS work**. Trigger if we ever start a TS agent project. Current Python-first orchestration unaffected.

**Status:** PENDING — conditional on TS agent work scope. Defer to W372 with anthropic-gap-filling cluster.

---

## OD-11 — 3 ecosystem-monitoring MCP install batch (Stream G)

**Recommendation:** Install all 3 in W368:
1. `gh-momentum-mcp` (PyPI `gh-momentum-mcp`) — star-velocity replaces star-absolute at discovery layer
2. `OpenAlex` API via FastMCP wrap (250M+ scholarly works, daily updates) — academic discovery
3. `MCPfinder.dev` MCP server (4 tools: search_mcp_servers / get_server_details / get_install_config / browse_categories) — recursive MCP-discovery-via-MCP

**Status:** AUTO-APPLY W368 P1 batch (operator can override).

---

## OD-12 — Live-SWE-agent ~100-LOC scaffold beats commercial agents (Stream D surprise #1)

**Issue:** `OpenAutoCoder/live-swe-agent` (UIUC academic, single-author group, ~3k★) leads OSS SWE-Bench at 79.2% Verified + 45.8% Pro — beats ByteDance TRAE + most proprietary frameworks. A ~100-LOC self-evolving scaffold outperforms heavily-funded commercial agents.

**Recommendation:** **W371 deep-investigate** — read the ~100-LOC scaffold; extract patterns for local agent-shape skill. If methodologically sound, consider as anti-bloat reference for our own agent definitions.

**Status:** SCHEDULED W371.

---

## OD-13 — 8 Anthropic-missing primitives (Stream B)

**Issue:** Stream B identified 8 first-class primitives Anthropic does NOT provide; ecosystem fills via non-official tools:
1. Self-hosted observability — Langfuse (LIVE) handles
2. Cross-session shared memory — basic-memory T6 (LIVE) handles
3. Cross-model adversarial review — codex@openai-codex plugin (LIVE) handles
4. Prompt versioning + rollback — promptfoo + local `prompt-versioning-and-rollback` skill
5. Multi-cloud cost governance — gap (no LIVE handler)
6. Agent-as-service deployment — gap (no LIVE handler; not a CC concern)
7. Deterministic skill-overlap audit — `plugin-eval` LIVE + `sota-convergence-audit` skill
8. Visual prompt debugger — gap (no LIVE handler; defer)

**Recommendation:** Document the LIVE coverage (#1-#4, #7); accept gaps (#5, #6, #8) as out-of-scope for CC runtime. **W372 confirm-pass.**

**Status:** ARCHITECTURAL NOTE — 5 of 8 gaps already filled; 3 acknowledged as out-of-scope.

---

## OD-14 — perplexity_research timeout fallback rule (Stream D + G both hit)

**Issue:** `mcp__perplexity__perplexity_research` (Sonar Deep Research, 300s budget) timed out 4× in parallel batch (Stream D) and 4/4 in Stream G. Mitigated by falling back to `mcp__perplexity__perplexity_ask` (Sonar Pro, fast mode) which returns 30-90s with full citations.

**Recommendation:** **Add to sca-v19 D89 recovery rule (Stream E rubric):** "perplexity_research timeout → automatic fallback to perplexity_ask; logged as `mcp_degraded=research-to-ask` flag; confidence_factor=0.9 (better than tavily-disabled 0.85 since same MCP family)."

**Status:** ADD to sca-v19 §X (rubric refinement); apply going forward in W368+.

---

(Future entries added as W368+ waves surface decisions.)
