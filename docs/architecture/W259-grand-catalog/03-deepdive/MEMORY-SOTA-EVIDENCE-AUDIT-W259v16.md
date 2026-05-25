# MEMORY + RAG SOTA — Evidence-Scored Audit (W259v16)

> Mission: Adversarial primary-source re-verification of the W259 memory SHIP verdict (MEMORY-LAYER-RECONCILED-W259v4.md + W259-SHIP-DECISIONS.md section 1). The operator challenged: are you SURE hindsight is the real SOTA. This audit runs the 5-phase primary-source protocol against the actual cloned repos at Z:\repos\deps\, the arXiv PDFs, and external leaderboards — NOT against W259 own summaries.
>
> Cite-class: effective_tier=TIER-3-LOCAL-COMPOSITION per Z:/claude-sota/.claude/rules/citation-discipline.md rule 8. Constituents (2026-05-16): primary repo READMEs at Z:\repos\deps\ (file:line cites) + arXiv 2512.12818 PDF body (pdftotext-extracted, title page verified) + arXiv 2410.10813 (LongMemEval ICLR 2025) + DeepWiki Q&A (hindsight, mem0, LongMemEval, zep) + omegamax.co/benchmarks leaderboard + WebSearch corroboration.
>
> Verdict headline: hindsight CONFIRMED as the memory PRIMARY — but the W259 catalog stated REASON is materially WRONG and must be corrected. The "91.4% independently reproduced by Virginia Tech + Washington Post" claim is FALSE as stated: VA-Tech and WaPo are CO-AUTHORS of hindsight own technical report, not independent reproducers. The correct decisive evidence is native-CC integration + MIT license + Windows support — NOT benchmark epistemics. Details in section 7.

---

## R0 — Falsifiable hypothesis

> H: vectorize-io/hindsight is the SOTA memory engine for this Claude Code runtime, justified by an INDEPENDENTLY-REPRODUCED 91.4% LongMemEval that is the only such number in the memory field.

Rejection criteria (any one rejects H as stated):
1. The VA-Tech / WaPo reproduction turns out to be co-authorship or vendor-collaboration, not independent reproduction.
2. Another engine has an equally or better independently-verified LongMemEval number AND a native-CC pathway.
3. hindsight actual current number differs materially from 91.4%.
4. mem0 "49%" is a sub-task score, not an overall LongMemEval score (would mean W259 mem0 takedown is itself flawed).

Outcome: Criteria 1 and 3 both FIRE -> H is rejected AS WORDED, but the conclusion (hindsight = primary) survives on corrected grounds. Criterion 4 is CONFIRMED clean (W259 mem0 takedown holds). See section 7.

---

## R1 — Benchmark landscape (verified against primary sources)

### Q1 — Is LongMemEval the canonical HARD benchmark; is LoCoMo the easier vendor-marketed one? — CONFIRMED

| | LoCoMo (Maharana et al. 2024, snap-research) | LongMemEval (Wu et al., ICLR 2025; arXiv 2410.10813) |
|---|---|---|
| Venue | arXiv workshop-tier | Peer-reviewed — ICLR 2025 (arxiv.org/pdf/2410.10813 p.1 "Published as a conference paper at ICLR 2025"; OpenReview pZiyCaVuti) |
| Size / scale | ~9k-token conversations | 500 manually-authored questions; LongMemEval_S ~115k tokens; LongMemEval_M ~500 sessions, "too long for long-context testing" (DeepWiki xiaowu0162/LongMemEval, verbatim) |
| Memory abilities | recall + multi-hop | 5 categories: Information Extraction, Multi-Session Reasoning, Knowledge Updates, Temporal Reasoning, Abstention (DeepWiki-verified) |
| Documented integrity issue | 93.57% scoring ceiling — 99 gold-answer errors in 1,540 Qs (dial481/locomo-audit) so any score above ~94% is mathematically suspect | Judge-uncontrolled leaderboards; Engram team measured a 52-pt swing from LLM-judge choice alone |

Verdict: CONFIRMED. LongMemEval is genuinely the canonical hard long-term-memory benchmark — peer-reviewed at ICLR 2025, structurally requires a memory system (M variant exceeds context window), and explicitly adds knowledge-update + abstention reasoning that LoCoMo lacks. LoCoMo is the easier, ceiling-capped one vendors prefer to headline. W259 core "LoCoMo is not LongMemEval" thesis is correct.

> NEW finding (not in W259): there is NO official public LongMemEval leaderboard maintained by the benchmark authors (DeepWiki xiaowu0162/LongMemEval, verbatim: "does not mention an official public leaderboard maintained by the authors"). Every "LongMemEval leaderboard" cited anywhere (omegamax.co, hindsight benchmarks site, MemPalace) is vendor-run. So NO memory engine has a [LEADERBOARD-TOP3] evidence tier available — the best any engine earns is [SELF-REPORTED] or [PEER-REVIEWED].

---

## R2/R3 — Per-claim primary-source verification

### Q2 — hindsight 91.4%: is the VA-Tech + WaPo reproduction real? — CORRECTED (claim is FALSE as stated)

hindsight README claim (Z:\repos\deps\hindsight\README.md L40, verbatim):
> "The benchmark performance data for Hindsight has been independently reproduced by research collaborators at the Virginia Tech Sanghani Center for Artificial Intelligence and Data Analytics and The Washington Post. Other scores are self-reported by software vendors."

PRIMARY-SOURCE CHECK — arXiv 2512.12818 PDF title page (linked from README.md L5; PDF body pdftotext-extracted, title page verbatim):
> "HINDSIGHT IS 20/20: BUILDING AGENT MEMORY THAT RETAINS, RECALLS, AND REFLECTS — Chris Latimer, Nicolo Boschi, Andrew Neeser, Chris Bartholomew, Gaurav Srivastava, Xuan Wang, Naren Ramakrishnan — Vectorize.io USA / The Washington Post USA / Virginia Tech USA"

This is the decisive finding. The seven authors of hindsight own technical report are:
- Vectorize.io: Chris Latimer (Vectorize CEO/founder), Nicolo Boschi (authored the hindsight benchmark blog), Chris Bartholomew.
- The Washington Post: Andrew Neeser.
- Virginia Tech: Gaurav Srivastava, Xuan Wang, Naren Ramakrishnan.

Virginia Tech and The Washington Post personnel are CO-AUTHORS of HINDSIGHT own paper — they BUILT and BENCHMARKED hindsight WITH Vectorize. The 91.4% in the paper (PDF body, verbatim: "Scaling the backbone further pushes Hindsight to 91.4% on LongMemEval") is hindsight own first-party result, just with academic co-authors on the byline.

This is NOT independent reproduction. Independent reproduction means a disinterested third party re-ran the eval and got the same number. Here the "third parties" are on the author list. The W259 catalog (W259-SHIP-DECISIONS.md section 1 L21: "the ONLY independently-reproduced number in the entire memory field"; MASTER-SCORING-MATRIX-W259.md L22) mistook co-authorship for independent reproduction — the EXACT SAME error class W259 accused Wave-2 of committing with mem0/DeepWiki. The W259 source for the claim was the Pith blog (pith.run, now HTTP 403), a SECONDARY source that itself misread the arXiv author list.

Verdict: CORRECTED. hindsight LongMemEval number is [SELF-REPORTED] (vendor first-party, with academic co-authors) — NOT independently reproduced. It sits in the SAME evidence tier as OMEGA and Mastra OM, contradicting W259 section 1 central justification.

Secondary correction — the number itself: W259 uses 91.4%. hindsight CURRENT repo states 94.6% (README.md, engine v0.4.19; DeepWiki vectorize-io/hindsight verbatim: "Hindsight reported score on the LongMemEval benchmark is 94.6%"). The 91.4% is the OLDER v0.1.0 paper number (blog 2026-03-23-agent-memory-benchmark.mdx: the paper "used version 0.1.0"). Both first-party; W259 cites a stale figure.

### Q3 — mem0: real OSS LongMemEval vs marketed number — W259 takedown CONFIRMED (with a number correction)

- mem0 marketed number: Z:\repos\deps\mem0\README.md L50 (verbatim): "LongMemEval | 67.8 | 94.8 | 6.8K | 1.09s" and L67: "94.8 on LongMemEval -- +27 points". NOTE: the live repo says 94.8%, not the 94.4% in the W259 catalog — W259 mem0 figure is also stale (mem0 bumped it with the April-2026 algorithm).
- SaaS-vs-OSS gap CONFIRMED: Z:\repos\deps\mem0\evaluation\README.md L60-63 — the eval .env REQUIRES MEM0_API_KEY, MEM0_PROJECT_ID, MEM0_ORGANIZATION_ID. DeepWiki mem0ai/mem0 verbatim: "the evaluation/README.md file specifies that MEM0_API_KEY is required ... which suggests that the benchmarks are run against the Mem0 Platform (managed service)." So mem0 headline numbers are HOSTED-SAAS, not the OSS Memory class the operator would install.
- Independent OSS evaluation: W259 cites 49% (Vectorize.io 2026-03-14) + 66% (buildingjoshbetter/TrueMemory rerun). Both are INDEPENDENT third parties (Vectorize is a competitor; TrueMemory is a community rerun) so genuine [MEASURED]-class for the LOW number.
- Criterion 4 check (is 49% a sub-task?): One WebSearch hit suggested 49% might be the temporal sub-task. RESOLVED: the Vectorize 8-framework eval reports 49% as mem0 OVERALL LongMemEval result; the temporal-subtask coincidence does not invalidate it. The honest range for OSS mem0 is ~49-66% LongMemEval — far below the marketed 94.8%, near the bottom of the field.

Verdict: CONFIRMED. mem0 headline is SaaS marketing; the installable OSS engine scores ~49-66%. W259 correctly downgraded mem0 to T3. This half of the W259 verdict is sound.

### Q4 — OMEGA / Mastra OM / Zep / letta / supermemory — actual scores + reproduction status

| Engine | LongMemEval (verified) | Evidence tier | Primary cite |
|---|---|---|---|
| OMEGA (omega-memory) | 95.4% (GPT-4.1 generator+judge); 466/500 raw = 93.2% | [SELF-REPORTED] — single author, NO independent reproduction; methodology disclosed | omegamax.co/benchmarks (WebFetch-verified: "OMEGA 95.4%", "GPT-4.1 as generation and grading LLM") |
| Mastra OM | 94.87% (gpt-5-mini); 84.23% on gpt-4o (the OFFICIAL benchmark model) | [SELF-REPORTED] — reproducible config published; YC-backed team | omegamax.co/benchmarks (verified: "Mastra 94.87%"); mastra.ai/research/observational-memory |
| Zep / getzep | 71.2% (gpt-4o); 63.8% temporal | [SELF-REPORTED] but AGREED across 3 independent cross-system tables (OMEGA + Mastra + Pith) — highest-confidence non-promotional number | omegamax.co/benchmarks (verified: "Zep / Graphiti 71.2%"); Zep paper (Rasmussen et al. 2025) |
| letta (letta-ai/letta) | 83.2% | [SELF-REPORTED] — operator-catalog figure; letta own LoCoMo = 74% | W259 catalog; letta README carries no LongMemEval figure (Z:\repos\deps\letta\README.md — grep found none) |
| supermemory | #1 claimed on LongMemEval/LoCoMo/ConvoMem; ~81.6-85.2% (GPT-4o) | [SELF-REPORTED] — README L28 self-titles #1; cloud-Pro-gated | Z:\repos\deps\supermemory\README.md L28 (verbatim: "#1 on LongMemEval, LoCoMo, and ConvoMem") |
| hindsight | 94.6% current (91.4% v0.1.0 paper) | [SELF-REPORTED] (academic co-authors are not independent) | Z:\repos\deps\hindsight\README.md L40; arXiv 2512.12818 |
| MemOS | LoCoMo 75.80; "LongMemEval +40.43%" (relative, not absolute) | [SELF-REPORTED] — relative-uplift only, not comparable | Z:\repos\deps\MemOS\README.md L25 |

Key R3 finding: EVERY memory engine LongMemEval number is [SELF-REPORTED]. There is NO independently-reproduced LongMemEval number anywhere in the field — including hindsight. The top three (OMEGA 95.4 / Mastra 94.87 / hindsight 94.6) are a STATISTICAL TIE inside the documented judge-noise band (Engram 52-pt judge swing; LoCoMo 93.57% ceiling). W259 section 1 instinct that they are a tie is CORRECT — but its tiebreaker rationale (hindsight is the only reproduced one) is FALSE.

### Q5 — Native-CC integration pathway (the DECISIVE axis for a CC runtime)

| Engine | Native-CC pathway | Verified at | Score |
|---|---|---|---|
| hindsight | FULL plugin — plugin.json v0.6.5 (MIT) + 4 lifecycle hooks (SessionStart / UserPromptSubmit-recall / Stop-retain-async / SessionEnd) + .mcp.json MCP server + create-agent subagent skill. INSTALLED in this runtime (enabledPlugins, cache hindsight/hindsight-memory/0.6.5/). | Z:\repos\deps\hindsight\hindsight-integrations\claude-code\ — plugin.json, hooks/hooks.json (4 hooks verified verbatim), scripts/mcp_server.py, skills/create-agent/SKILL.md | 10/10 |
| mem0 | mem0ai/claude-code-plugin (OpenMemory) — plugin + SessionStart/PreCompact/Stop/TaskCompleted hooks + 7 MCP tools + memory-manager subagent | W259 MEMORY-LAYER-RECONCILED-W259v4.md T1.18 | 9/10 (engine ceiling 49-66%) |
| supermemory | supermemoryai/claude-supermemory plugin + auto-capture hooks + MCP | Z:\repos\deps\supermemory\README.md L98,L107 (verbatim: "Plugins for Claude Code") | 9/10 (Pro-API-gated) |
| cognee | cognee-integrations/.../claude-code plugin — hooks capture tool calls to KG at session end | Z:\repos\deps\cognee\README.md L77,L177-179 | 9/10 (cold-tier) |
| EverMemOS | use-cases/claude-code-plugin — persistent memory for CC | Z:\repos\deps\EverMemOS\README.md L282-286 | 8/10 |
| graphiti | MCP server (FalkorDB) — INSTALLED-LIVE in this runtime; no first-party plugin | .mcp.json (graphiti entry, FalkorDB :16379) | 8/10 (MCP-only) |
| Memori | MCP via header X-Memori-Process-Id: claude-code (no SDK) | Z:\repos\deps\Memori\README.md L197-203 | 7/10 |
| Mastra OM | NO native CC plugin — ships an OpenCode plugin only | W259 section 3.2 / Mastra docs | 4/10 |
| OMEGA | MCP + 7 hook processes + CLAUDE.md auto-inject; omega setup | W259 section 3.1 / OMEGA README | 9/10 |
| Zep | NO CC plugin/MCP — AutoGen + CrewAI integrations only | DeepWiki getzep/zep (verbatim: "no Claude Code plugin, MCP server, or direct hook integration for Zep") | 3/10 |
| letta | EXTERNAL_MCP only; letta is itself a competing harness | W259 catalog | 4/10 |

Verdict: hindsight has the STRONGEST native-CC integration of any high-LongMemEval engine — 4 lifecycle hooks + MCP + subagent skill, MIT-licensed, ALREADY INSTALLED in this runtime. Verified at file:line in the cloned repo. This — not benchmark epistemics — is the real reason hindsight wins.

---

## R4 — License + Windows audit (line-by-line)

| Engine | License | Verified | Windows |
|---|---|---|---|
| hindsight | MIT | Z:\repos\deps\hindsight\LICENSE L1-3 ("MIT License — Copyright (c) 2025 Vectorize AI, Inc."); plugin LICENSE MIT | YES — Docker / pip / embedded pg0 (DeepWiki-verified) |
| mem0 | Apache-2.0 | Z:\repos\deps\mem0\LICENSE L1-2 | YES |
| OMEGA | Apache-2.0 | W259 section 3.1 (PyPI omega-memory v1.4.10) | WINDOWS UNTESTED (OMEGA own docs) |
| Mastra OM | Apache-2.0 (core; ee/ enterprise-licensed) | mastra-ai/mastra LICENSE.md | YES (TS/Node) |
| letta / graphiti | Apache-2.0 | Z:\repos\deps\letta\LICENSE L1-2 (Apache 2.0) | YES |
| Zep | Apache-2.0 (integrations) | DeepWiki getzep/zep | YES |
| honcho | AGPL | W259 catalog | YES |
| basic-memory | AGPL | W259 catalog | YES |

hindsight: MIT — cleanest possible D1. OMEGA Apache-2.0 is fine, but Windows-untested is a real operational blocker for this Z:-portable Windows runtime.

---

## Section 6 — EVIDENCE-SCORED RANKING (memory engines)

Composite = 0.30 CC-integration + 0.25 benchmark + 0.20 license/Windows-fit + 0.15 org-maturity + 0.10 reproduction-confidence, scale 0-100. Benchmark uses LongMemEval E2E QA where verified; all are SELF-REPORTED so the benchmark axis is CAPPED — no engine gets reproduction credit.

| Rank | Engine | LongMemEval | Reproduction status | License | Native-CC | Composite | Disposition |
|---|---|---|---|---|---|---|---|
| 1 | vectorize-io/hindsight | 94.6 pct (91.4 pct v0.1.0 paper) | vendor-self-reported (academic co-authors NOT independent) | MIT | 10/10 plugin+4hooks+MCP+skill installed-live | ~89 | PRIMARY CONFIRMED (corrected rationale) |
| 2 | getzep/graphiti | 71.2 pct (Zep, cross-table-agreed) | best non-promotional number (3 independent tables agree) | Apache-2.0 | 8/10 MCP installed-live FalkorDB | ~84 | INSTALLED-LIVE temporal/KG adjunct |
| 3 | OMEGA (omega-memory) | 95.4 pct (highest) | vendor-self-reported, single author, unreproduced | Apache-2.0 | 9/10 | ~80 | PILOT lane Windows-untested + ~600-memory ceiling + Axis-1 fail |
| 4 | mem0ai/mem0 + claude-code-plugin | ~49-66 pct (OSS independent) | independently evaluated LOW (Vectorize + TrueMemory) | Apache-2.0 | 9/10 | ~74 | DECLINED as primary OSS engine ceiling too low |
| 5 | supermemoryai/supermemory | ~81.6-85.2 pct | vendor-self-reported (No.1 self-claim) | MIT | 9/10 | ~78 | PILOT strong CC plugin but cloud-Pro-API-gated |
| 6 | Mastra OM (mastra-ai/mastra) | 94.87 / 84.23 pct gpt-4o | vendor-self-reported reproducible config | Apache-2.0 | 4/10 no CC plugin | ~72 | CITE-PATTERN Observer/Reflector pattern is gold; engine OpenCode-wired |
| 7 | letta (letta-ai/letta) | 83.2 pct | vendor-self-reported | Apache-2.0 | 4/10 | ~70 | CITE-PATTERN competing harness |
| 8 | cognee (cognee-ai/cognee) | n/a GraphRAG HotPotQA harness | self-tuned harness | Apache-2.0 | 9/10 | ~78 | STUDY-PILOT cold GraphRAG tier (HTTP-MCP, in .mcp.json INERT) |
| 9 | EverMemOS | n/a | unverified | verify-at-install | 8/10 | ~70 | WATCHLIST has a CC plugin |
| 10 | honcho / basic-memory | ~92.6 pct LME-S (honcho) | self-reported | AGPL | 7-8/10 | ~66 | DECLINED AGPL license-use-class penalty |

### RAG / retrieval layer (brief, confirms W259 section 2)
- getzep/graphiti = the converged GraphRAG retrieval winner (installed-live, FalkorDB). CONFIRMED.
- cognee correctly defaults to Kuzu, not FalkorDB. W259 correction holds; FalkorDB belongs with graphiti.
- No standalone RAG framework winner. RAG is correctly decomposed across retrieval-substrate / structured-extraction / RAG-eval. W259 section 2 verified sound.

---

## Section 7 — DEFINITIVE VERDICT

Is hindsight genuinely the SOTA memory PRIMARY for this Claude Code runtime? YES, CONFIRMED. But the W259 stated REASON is WRONG and is hereby CORRECTED.

What W259 got RIGHT:
- LongMemEval (ICLR 2025) IS the canonical hard benchmark; LoCoMo IS the easier ceiling-capped one. CORRECT.
- mem0 94.x pct headline IS SaaS marketing; the OSS engine scores ~49-66 pct independently, so mem0 correctly DECLINED as primary. CORRECT.
- hindsight IS the right pick. It has the strongest native-CC integration of any memory engine (4 lifecycle hooks + MCP + subagent skill, all verified at Z:\repos\deps\hindsight\hindsight-integrations\claude-code\), MIT license, verified Windows support, and is already installed-live. CORRECT.

What W259 got WRONG (must be corrected in W259-SHIP-DECISIONS.md section 1 and MASTER-SCORING-MATRIX-W259.md L22):
1. The "independently reproduced by Virginia Tech + Washington Post" claim is FALSE. arXiv 2512.12818 title page proves VA-Tech (Srivastava, Wang, Ramakrishnan) and WaPo (Neeser) are CO-AUTHORS of the hindsight technical report. They built and benchmarked hindsight WITH Vectorize. This is vendor first-party work with academic co-authors, NOT independent reproduction. W259 committed the EXACT error class it accused Wave-2 of (mistaking a non-independent source for verification), and the W259 source (Pith blog) was a secondary misreading of the arXiv author list.
2. The hindsight LongMemEval number is SELF-REPORTED, the same evidence tier as OMEGA and Mastra OM. There is NO independently-reproduced LongMemEval number anywhere in the memory field, and NO official LongMemEval leaderboard exists (the benchmark authors maintain none). The top three (OMEGA 95.4 / Mastra 94.87 / hindsight 94.6) are a genuine statistical tie inside the judge-noise band. The W259 tie instinct was right; the W259 tiebreaker was fiction.
3. The number is stale: W259 cites 91.4 pct (v0.1.0 paper); the current hindsight engine (v0.4.19) self-reports 94.6 pct.

THE SINGLE MOST DECISIVE PIECE OF EVIDENCE: hindsight is the ONLY memory engine that simultaneously ships a first-class native-CC plugin (plugin.json + 4 lifecycle hooks SessionStart, UserPromptSubmit-recall, Stop-retain-async, SessionEnd + MCP server + create-agent subagent skill, all verified verbatim at Z:\repos\deps\hindsight\hindsight-integrations\claude-code\hooks\hooks.json), under an MIT license, with verified Windows support (Docker/pip/embedded-pg0). For a Windows Z:-portable CC runtime whose operator explicitly diagnosed the gap as Claude-Code-side hook+MCP integration, this is decisive on its own, regardless of the benchmark tie. The correct verdict rests on INTEGRATION COMPLETENESS, not on a fictional reproduction claim.

Net effect on the SHIP decision: hindsight stays the RECOMMENDED memory PRIMARY. The conclusion is unchanged. But the JUSTIFICATION in W259-SHIP-DECISIONS.md section 1 must be rewritten: strike "the ONLY independently-reproduced number in the entire memory field", strike the VA-Tech/WaPo independent-reproduction sentence, update 91.4 to 94.6, and re-anchor the verdict on native-CC integration + MIT + Windows + zero-cloud, the four axes that are ACTUALLY primary-source verifiable.

---

## Section 8 — Retractions (claims that failed R3)

| Retracted claim | Source | Why |
|---|---|---|
| hindsight 91.4 pct is the ONLY independently-reproduced number in the memory field | W259-SHIP-DECISIONS.md section 1 L21; MASTER-SCORING-MATRIX-W259.md L22 | VA-Tech + WaPo are CO-AUTHORS of arXiv 2512.12818 (title page verified). Co-authorship is not independent reproduction. |
| hindsight 91.4 pct LongMemEval (as the current figure) | MEMORY-LAYER-RECONCILED-W259v4.md section 3.3; W259-SHIP-DECISIONS.md section 1 | Stale v0.1.0 paper number; current engine v0.4.19 self-reports 94.6 pct |
| mem0 94.4 pct LongMemEval (as the marketed figure) | MEMORY-LAYER-RECONCILED-W259v4.md section 0.1 | mem0 live README L50 now states 94.8 pct. W259 mem0 figure is also stale (still SaaS marketing either way; the takedown is unaffected) |

---

## Honest Conclusion

H rejected as worded; conclusion upheld on corrected grounds. hindsight IS the correct memory PRIMARY for this Claude Code runtime, but NOT because its benchmark is independently reproduced (it is not; that W259 claim is false and retracted). It wins because it has the strongest, MIT-licensed, Windows-verified, already-installed native-CC integration of any memory engine, while sitting in a statistical tie at the top of an all-SELF-REPORTED LongMemEval field. The W259 SHIP verdict OUTCOME survives adversarial audit; the W259 EVIDENCE CHAIN does not, and must be corrected.

---

Audit method: 5-phase primary-source protocol (R0 framing, R1 benchmark landscape, R2/R3 per-claim verification, R4 line-by-line license/Windows audit, R5 handoff). Generated 2026-05-16. No git commit per task directive. Primary sources verified at file:line in Z:\repos\deps\ clones plus arXiv 2512.12818 and 2410.10813 PDFs plus DeepWiki plus omegamax.co plus WebSearch.
