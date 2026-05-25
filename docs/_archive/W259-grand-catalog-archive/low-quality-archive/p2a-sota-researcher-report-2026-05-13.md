# [A] sota-researcher report — PHASE-2[A] SOTA convergence audit
title: P2A sota-researcher report
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (aa3baef4352500fce, 346s, 30 tool_uses, 467K tokens)

**Dispatch**: /goal "SOTA convergence audit + install + automation for claude-sota-installed"
**Methodology**: 5-phase protocol (R0-R5) per `.claude/agents/sota-researcher.md` initialPrompt; Iron Law verification-before-completion gate; convergence-gate Axis 1+2+3 strict.
**Cite class**: TIER-3-LOCAL-COMPOSITION per `citation-discipline.md` rule #8 (constituents: TIER-1-DIRECT upstream cites + TIER-3-LOCAL fresh probes).
**verdict_one_line**: DONE_WITH_CONCERNS

---

## Axis 1: Manifest §0-§17 line-by-line audit

### Status totals (276 rows, fresh probe 2026-05-13)
- **INSTALLED (pure)**: 189
- **INSTALLED-AMBER**: 27 (deferred-fix)
- **INSTALLED-PARTIAL**: 3
- **INSTALLED-VIA-SYSTEM-PATH**: 24
- **CITE-IMPORT-AMBER**: 18 (sibling-derived; non-clean per CR-12)
- **PLANNED**: 114 (largest gap class)
- **PENDING**: 32
- **STAGED**: 34
- **REJECTED-POST-PROBE**: 4
- **HISTORICAL-MACHINE-EXCLUDED**: 5
- **CITE-ONLY**: 60
- **DEFERRED-PENDING-FIX**: 3
- **SOTA-cleanliness**: 63% W146-F3 method / 55% Agent A verbatim

### Top-10 INSTALL gaps blocking CR-7 Phase 2 transition
1. §4 Memory: 8 STAGED rows L142 — Qdrant + FalkorDB direct stdio + Hindsight + LMS wire deferred
2. §14 Subagents 8 UNTRACKED — `sota-researcher.md` SHA `5099454a` Path-C cite-import FUNCTIONAL on disk but NOT git-tracked (per W155-F12)
3. §13 fm17d_stall_detector.py INSTALLED-AMBER-DISABLED L256 — SubagentStop schema-rot Wave 76 (100% schema_missing)
4. §13 2/6 codex review scripts INSTALLED-DORMANT L262 — codex_review_queue.py + codex_review_thread_bridge.py
5. §8 Search MCPs 34 PLANNED L186 — largest PLANNED block
6. §17 Wave 82+ open queue 6 items L684
7. §7 Code intel 3 PLANNED L178 — serena MCP partial; gitnexus advisory-only
8. §1 5 PLANNED L71 — Anthropic host runtime gaps
9. §2 T1-T7 lifecycle INSTALLED-PARTIAL L79 — T6 stop_review_gate + T7 ask-without-act partial
10. §13.G1 cosign Gate 1 mechanical-enforcement PARTIAL L693

---

## Axis 2: 12 awesome-* cohort verification

| Repo | HEAD | Age (d) | cpd | Axis-3 band | C-cohorts | Verdict |
|---|---|---|---|---|---|---|
| nibzard/awesome-agentic-patterns | `9c40e10` | 347 | 1.18 | STABLE-BURN-IN ✅ | C5+C6+C8 | **ADOPT-NOW** (INSTALLED-DORMANT) |
| hesreallyhim/awesome-claude-code | `614f102` | 389 | 2.97 | STABLE-BURN-IN ✅ | C1+C6+C8 | **ADOPT-NOW** (CITE-ONLY; **CC-BY-NC-ND-4.0** blocks fork) |
| quemsah/awesome-claude-plugins | `765d795` | 195 | 1.03 | STABLE-BURN-IN ✅ | C1+C6 | STUDY-PILOT (no LICENSE = cite-only) |
| alirezarezvani/claude-skills | `7d493fe` | 206 | 3.50 | STABLE-BURN-IN ✅ | C1+C6 (540 SKILL.md / 5.2k★ MIT) | STUDY-PILOT (selective vendoring) |
| gsd-build/get-shit-done | `3aaed8f5` | 150 | 16.73 | ACTIVE-ITERATION (border) | C1+C8 (58k★ MIT) | STUDY-PILOT-NARROW |
| addyosmani/agent-skills | `4c585c3` | 87 | 1.98 | PRE-BURN-IN → **STRONG-PROVENANCE-EXPRESS** | C5+C6 (38.8k★ MIT + Addy Osmani named-T2 Chrome DevRel) | STUDY-PILOT (already wired) |
| mattpocock/skills | `733d312` | 99 | 0.74 | STABLE-BURN-IN ✅ | C5+C6 (48.9k★ MIT + Matt Pocock named-T2) | **ADOPT-NOW** |
| vercel-labs/agent-skills | `b9c8ee0` | 156 | 1.27 | STABLE-BURN-IN ✅ | C1+C5 | STUDY-PILOT (INSTALLED-DORMANT 3 wrappers) |
| abhigyanpatwari/GitNexus | `98addbd6` | 130 | 6.91 | STABLE-BURN-IN ✅ | C1+C5 (solo named-author) | STUDY-PILOT (wired as `gitnexus`) |
| affaan-m/everything-claude-code | `841beea` | squashed | n/a | STRONG-PROVENANCE-EXPRESS | C1+C5+C6+C8 | **ADOPT-NOW** (base substrate) |
| shanraisshan/claude-code-best-practice | `48f2ceb` | squashed | n/a | STRONG-PROVENANCE-EXPRESS | C1+C5 (independent-T2 author) | **ADOPT-NOW** (TIER-1-DIRECT cite source) |
| punkpeye/awesome-mcp-servers | NOT-CLONED | ~17mo | — | per research-protocol.md cite (85.9k★ MIT) | C1+C6+C8 | CITE-ONLY-REMOTE |

### Adversarial null-results
- `hesreallyhim/awesome-claude-code` **CC-BY-NC-ND-4.0** = no-derivative; cite-only fair-use admissible per `port-note-discipline.md §4`
- `quemsah` + `vercel-labs-agent-skills` no LICENSE file → cite-only until upstream confirmation
- `gsd-build/get-shit-done` cpd=16.73 + age=150d = ACTIVE-ITERATION; STUDY-PILOT-NARROW only

### ≥2-cohort fan-out: 12/12 satisfied (CR-1 SATISFIED)

---

## Axis 3: Memory-system landscape audit

### Incumbent stack (post-Wave 82o-r)
| Layer | Primitive | Status | Backend | Cite |
|---|---|---|---|---|
| L1 capture | mcp-memory-service v10.51.3 (doobidoo) | ✅ INSTALLED | sqlite_vec embedded | HEAD `7c697327` Apache-2.0 1809★ |
| L2 vector | sqlite_vec (embedded) | ✅ INSTALLED | local file `.mcp-memory/memory.db` | binary + db present |
| L3 temporal-KG | graphiti v0.29.0 (getzep) | ✅ **INSTALLED + WIRED** | FalkorDB:16379 UP | HEAD `c427615` Apache-2.0 25.8k★ arXiv:2501.13956 |
| L4 wiki | deferred | — | — | — |

**CLAUDE.md L302 DRIFT**: claims `wiring queued for next fire` but `.mcp.json` shows graphiti IS WIRED with FALKORDB_URI/PASSWORD/DATABASE + OPENAI_API_KEY/URL envs.

### Candidate evaluation

| Candidate | License | Verdict | Rationale |
|---|---|---|---|
| **MemPalace** | MIT | **REJECT-FOR-FIT** | README L1-7 contains `[!CAUTION] Scam alert ... mempalace.tech is an impostor and may distribute malware` — AUTO-REJECT axis-2 per convergence-gate.md §Even-shorter-path impostor-domain self-flag |
| mem0 (YC S24) | Apache-2.0 | STUDY-PILOT-DEFER | Overlaps L1; deploy as Qdrant-backed alternative only on incumbent-pain trigger |
| Letta | Apache-2.0 | STUDY-PILOT-DEFER | Squashed local clone; fresh probe needed |
| Zep | Apache-2.0 | **DUPLICATE-FUNCTIONALITY** | getzep IS the maintainer of graphiti (incumbent L3) — sister product |
| MemOS | Apache-2.0 | STUDY-PILOT | STABLE-BURN-IN PASS (311d / cpd 5.27); MemTensor named-org; strongest replacement candidate if incumbent pain emerges |
| Memori (MemoriLabs) | Apache-2.0 | STUDY-PILOT | STABLE-BURN-IN PASS (293d / cpd 1.87); comparison ref only |
| openviking (volcengine) | **AGPLv3** | **REJECT-FOR-FIT** | Probe 6 STRUCTURAL license blocker (n=1 codified per `reference_memory_rag_audit_HNF_agplv3_blocker_2026_05_02.md`) |

### Memory-system FINAL VERDICT: **INCUMBENT STACK RETAINS**
- Zero replacement candidate passes Axis 1+2+3 strict against incumbent (doobidoo+getzep named maintainers, Apache-2.0, FalkorDB UP)
- MEMORY.md bloat (706 lines / 2.9MB single entry) is **L1 USAGE FAILURE not stack failure** — fix via P4 trim
- MemPalace/openviking/Zep ruled out structurally; mem0/MemOS/Memori/Letta STUDY-PILOT-DEFER pending pain-trigger

---

## VERDICT: Top-5 priority install actions

1. **MEMORY.md trim ship** (HIGHEST leverage, low risk) — archive 706→<100 lines; restore Karpathy §5 Layer 2 index discipline. ETA 5-10min.
2. **Section 14.5 subagent ratification** — git-track 8 UNTRACKED subagent files (incl `sota-researcher.md` SHA `5099454a`); satisfies CR-7 Phase 2 predicate (d). ETA 10-15min.
3. **CLAUDE.md L302 drift fix** — flip "wiring queued for next fire" → "wired in `.mcp.json` with FalkorDB env" with [VERIFIED 2026-05-13]. ETA 2-3min.
4. **fm17d_stall_detector.py** SubagentStop schema parse fix OR retire — currently INSTALLED-AMBER-DISABLED. ETA 15-30min.
5. **Tier-2 Memory MCPs wire** — Qdrant + FalkorDB direct stdio to `.mcp.json`. ETA 20-30min.

## Retractions (Iron Law gate caught)
- "graphiti not wired" — REFUTED via `.mcp.json` probe (graphiti IS wired with FalkorDB env)
- "MemPalace is candidate" — REFUTED via README impostor scam-flag (FM-20 path-drift defense at agent layer)
- "n=22 untracked subagents" — superseded by W155-F1 audit at n=8 + tracked-status correction

## Cite class
`constituents=[TIER-1-DIRECT @ upstream cites file:line@HEAD, TIER-3-LOCAL-OBSERVED @ fresh 2026-05-13 probes]; effective_tier=TIER-3-LOCAL-COMPOSITION` per citation-discipline.md rule #8.
