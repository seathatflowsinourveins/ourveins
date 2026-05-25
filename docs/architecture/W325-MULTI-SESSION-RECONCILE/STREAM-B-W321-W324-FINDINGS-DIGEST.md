# W325 Stream B — W321-W324 Parallel-Session Findings Digest

**Date**: 2026-05-19
**Owner**: W325 Stream B
**Scope**: Synthesize the substantive findings from the parallel-session waves W321 + W322 + W323 + W324 (all bundled in `8e43c24` commit) into a single digest that I (operator-this-session) can act on or carry forward.
**Sources**: 8 W321 stream docs (~80 KB total) + 1 W322 closure-synthesis + 8 W323 stream docs + 3 W324 docs (CLOSURE-SYNTHESIS + P4 + P8).

> **Out of scope**: I am NOT modifying W321/W322/W323/W324 docs (immutable per goal-predicate). This digest is **read-only synthesis** for the operator to absorb.

---

## §1 W321 — META-FOUNDATION-WAVE (8 streams)

### §1.A Stream 1 — Anthropics-official SOTA convergence

- **Hook gap**: 18 documented hook event types upstream; **8 wired** in our settings.json. **Top-3 HIGH-gap**: `SessionEnd` (project-level not wired; only via ECC + codex plugin gates), `UserPromptSubmit` (could auto-inject mem-recall T6 / strip secrets pre-API), `SubagentStart`/`SubagentStop` (would make parallel_ratio measurable LIVE vs current off-line rolling-30d 0.5875).
- **Env-var gap**: 175+ documented; ~50 set. **Top-2 high-impact additions**: `CLAUDE_BASH_NO_LOGIN=true` (defense-in-depth for W317 MSYS HOME-pin) + `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS=60000` (Windows reliability).
- **Output style**: `outputStyle:"Proactive"` is custom-not-canonical per CC doc; keep but document deviation.

### §1.B Stream 2 — wshobson/agents marketplace deep ingest

- **Adoption ratio**: 18 cached (15 enabled) of **54 published plugins** = ~33%.
- **T1 INSTALL candidates NOT cached**: `git-pr-workflows` + `c4-architecture` + `documentation-generation` (3 plugins).
- **T2 SECURITY-WIRE pre-cached but disabled**: `protect-mcp` + `review-agent-governance` (my W320 already addressed these — see §3 below).
- **CRITICAL silent-fallback (F4 HIGH)**: `agent-teams/1.0.2/skills/team-communication-protocols/SKILL.md:159-160` — **team-lead single-point-of-failure**. If team-lead crashes after spawning N teammates, every teammate becomes an orphan with no documented recovery path. Operator only discovers via manual `/team-status` polling.
- **Cookbook-only signed-audit-trails**: enabled but no PostToolUse Ed25519-signing hook in settings.json — false-assurance condition. (W322 P2 + W324 P8 SUPERSEDED to DISABLE.)

### §1.C Stream 3 — mattpocock + addyosmani vendor-fork

- Re-dispatched in W322 (original W321-3 burned 548K tokens with no artifact via repomix-pack flood).
- **Top-3 net-new candidates**: mattpocock `handoff + review` (paired) + addyosmani `context-engineering` + mattpocock `write-a-skill`.

### §1.D Stream 4 — CCBP + ECC SOTA parity

- **CCBP drift**: 1 RE-CONFIRMED `sandbox.*` block intentional-DRIFT (single-operator local install); 1 PARTIAL (skill 15-field frontmatter ≤4 fields populated; low impact); 1 STALE-CITE 1-commit (badge-only, no re-cite required).
- **ECC drift**: cached `2.0.0-rc.1` (2026-04-28) vs GitHub HEAD `d6022d6b` (2026-05-19) = **~21 calendar days behind**. W319-S6 target `33ed494a → f3cd00625222` is **DOUBLY-STALE** — actual HEAD is `d6022d6b`.
- **CR-2 risk if updated**: LOW with caveat — `/plugin update` will clobber W317 MSYS `plugin-hook-bootstrap.js` patch (backup at `.pre-w317-msys-norm`); re-apply post-update + re-verify `tools/test-msys-norm.mjs` 42/42.
- **Top ECC hooks to UN-DISABLE**: `stop:evaluate-session` + `stop:cost-tracker` + `post:session-activity-tracker` + add `ECC_GOVERNANCE_CAPTURE=1`.

### §1.E Stream 5 — context-mode + planning-with-files + GitNexus

- Context-mode insight UI: deferred W323 → applied W324 P4.
- planning-with-files: re-litigated by my W320 row #89 (T2 VENDOR-FORK · RE-ENABLE-IN-PLACE — supersedes W321-5's DEACTIVATE-HOLDS).
- GitNexus: ACTIVE pattern-study tier; PolyForm-NC license operator-gate retained — convergent with my W320 audit + W324 P7 PARTIAL.

### §1.F Stream 6 — agentic-claude-skills

- 32 of 34 enabled skill-dirs have SKILL.md; 2 missing files (per W323 stream-6 anti-self-invent — `learned/` empty + `gitnexus/` discoverability-broken — both REPAIRED in W324 P0).

### §1.G Stream 7 — research-arch meta (sca-v8 SHIP-readiness)

- Re-dispatched in W322 (original W321-7 burned 552K tokens via repomix-pack flood).
- Proposed D34-D38 names: `cc_pathway_support` (D34) + `mcp_integration_native` (D35) + `opus_4_7_compat` (D36) + `local_runtime_z_portable` (D37) + `autonomous_loop_compat` (D38).
- Arch-itself self-eval under proposed v8.2: **4.276** — borderline near 4.5 ship-gate.

### §1.H Stream 8 — codex META adversarial review (3 architecture blindspots)

- Re-dispatched in W322 (original W321-8 burned 545K tokens via fork-wrapping; inline PowerShell + direct codex-companion-task call took 1 tool use ~90s with full deliverable).
- **Blindspot #1**: Trust overloaded with "upstream" — cardinal-rule-1 needs freshness + pin + attestation sub-clauses (SOTA-repo trust ≠ SOTA-state trust).
- **Blindspot #2**: R5 too weak — needs layered-defense spec (5 sub-controls: deny-by-default + audit + redaction + egress + drift).
- **Blindspot #3**: Agent orchestration fails open — `gitnexus(disabled)` while AGENTS contract requires GitNexus = silent fail-open; need explicit degraded-mode-state primitive.
- **Cruft flagged**: `signed-audit-trails` enabled-but-unwired → false assurance → wire OR disable.
- **Missing SOTA**: SLSA/Sigstore provenance verification via GitHub Artifact Attestations + slsa-verifier.

---

## §2 W322 — re-dispatch closure + P-block disposition

**P-block status table** (from W322 CLOSURE-SYNTHESIS:30-40):

| P | Disposition |
|---|---|
| P0 Anthropic drift (CLAUDE_BASH_NO_LOGIN etc.) | PARTIAL — 3 DONE (env BASH_NO_LOGIN + GIT_TIMEOUT + perms.allow uvx); 4 TODO (7 hooks + 2 plugin installs) |
| P1 ECC update + MSYS re-apply | DEFERRED to W323 — risk of clobbering W317 patch |
| P2 signed-audit-trails Ed25519 | DEFERRED W323 — codex META cruft-or-wire decision |
| P3 wshobson SPOF + 4 plugin installs | DEFERRED W323 — file upstream issue first |
| P4 context-mode insight UI | DEFERRED W323 — observability adoption pairs with W320 P1 OTel |
| P5 DSPy stacked-optimizer | DEFERRED W323 — Python venv subprocess wire from harness/ |
| **P6 W321 silent-fallback re-dispatch** | ✓ **COMPLETE** (all 3 streams; 1.18M → ~10K tokens = >99% reduction) |
| P7 sca-v8 + haizelabs/verdict | PARTIAL — sca-v8 PARTIAL-SHIP queued; verdict deepwiki ingested |

**Methodology validation** (W322 CLOSURE:25): 1.18M tokens lost across 3 fork dispatches → ~10K tokens used in re-dispatches = **>99% token reduction with complete deliverables**. Root cause: `mcp__repomix__pack_remote_repository` floods fork context on multi-skill/large repos.

---

## §3 W323 — COMPREHENSIVE-AUDIT-WAVE (8 streams)

### §3.A Stream 1-3 — Git/lang/CLI cookbooks (skipped audit context)

W323 streams 1+2+3 cover git-cookbook + language-cookbook + CLI/Docker/terminal — covered patterns to extract; no SHIP-BLOCKER findings here.

### §3.B Stream 4 — Research-arch v9 evolution (the critical doc)

**Sca-v9 dim numbering proposal** (W323 Stream-4:11-15) differs from W321-7 proposal AND W324 ACTUAL SHIP:

| Source | D34 | D35 | D36 | D37 | D38 | D39 | D40 | D41 |
|---|---|---|---|---|---|---|---|---|
| **W321-7-redispatch** | cc_pathway_support (collapsed w/ Δ45) | mcp_integration_native | opus_4_7_compat | local_runtime_z_portable | autonomous_loop_compat | — | — | — |
| **W323-4 STREAM-4-RESEARCH-ARCH-V9** | (held v7.1) | mcp_integration_native | (held W317 D36 META) | (held W317 D37 META) | autonomous_loop_compat | **supply_chain_attestation NEW** | **layered_defense_depth NEW** | **degraded_mode_explicit NEW** |
| **W324 ACTUAL SHIP (sca-v9 in SKILL.md)** | (v7.1 cohort_overlap) | cc_pathway_support (W319 D-CCRT carry) | (held W317 D36 W=0) | (held W317 D37 W=0) | mcp_integration_native | opus_4_7_compat | local_runtime_z_portable | autonomous_loop_compat |

**Critical observation**: W324 sca-v9 USED W321-7's proposal (mcp/opus/portable/loop dims) but RE-NUMBERED them D38-D41 instead of D35-D38, AND DID NOT INCLUDE the W323-4 proposed `supply_chain_attestation` + `layered_defense_depth` + `degraded_mode_explicit` dims.

**Implication for W325/W326**: the **W323-4 proposed dims (`supply_chain_attestation` + `layered_defense_depth` + `degraded_mode_explicit`) are NOT in shipped sca-v9** despite being designed to address the W321-8 codex META blindspots #1, #2, #3. The R5 5-control layered-defense codification in sca-v9 §6 partly covers blindspot #2 but NOT in a per-candidate scoring sense. **Forward AI**: W326 sca-v9.1 OR sca-v10 may need to RE-VISIT W323-4's `D39 supply_chain_attestation` + `D40 layered_defense_depth` + `D41 degraded_mode_explicit` dim adds. Currently sca-v9's D39-D41 names overlap with these proposals only at the field-name "D39/D40/D41" level — semantically they are different (sca-v9 D39 = opus_4_7_compat, NOT supply-chain-attestation).

### §3.C Stream 5 — Anthropic SDK

Three adopt-now features applied in W324 P2:
- `--cache-1h` (1h prompt caching beta-header)
- `--batch` (`messages.batches.create`)
- `--structured <schema>` (response_format JSON schema)

Applied to `harness/eval_harness.py` (+380 LOC) per W324 CLOSURE §P2:63-74.

### §3.D Stream 6 — Anti-self-invent file-by-file audit

- **R4-strict VIOLATIONS: 0** (`.claude/rules/` empty + `.claude/hooks/scripts/` empty).
- **R2-EXCEPTIONS: 2** (both compliant): `bash-home-pin.sh` 464B + `context-mode-cache-heal.mjs` 1656B.
- **Operator-strict advisories**: `sota-convergence-audit/SKILL.md` was **210,992 bytes** (~5K LOC accreted v1→v7.1) — flagged for compact rewrite. W324 P1 SHIPPED the rewrite (1629 → 338 LOC; **~79% compression**) via `_archived/W324-pre-sca-v9/SKILL-sca-v8.1-partial.md`.
- **5 cherry-picks pending operator-decision**: 4 archived addyosmani-* prefix-dups + interview-me — all archived in W324 P0.

### §3.E Stream 7 — GitNexus + planning-with-files re-eval

Convergent with my W320 audit + W324 P7 PARTIAL.

### §3.F Stream 8 — MCP convergence breadth

- **Current source-families**: 6+ active (deepwiki + gh-CLI + awesome-list catalogs + Perplexity + WebFetch + context-mode + repomix + hf-mcp-server); WebFetch partially-blocked by context-mode hook; repomix problematic (W321 silent-fallback root cause).
- **Top-2 install candidates**: **Tavily MCP** + **Exa MCP** (close perplexity-only single-source-bias) — SHIPPED in W324 P5 (env-pending).
- Other gap-fills: arxiv-mcp-server + magg/mcpproxy-go meta-orchestration + mcp-server-git (git-specific tools).

---

## §4 W324 — META-FOUNDATION ship (codex r11 APPROVE)

**Already digested in commit-map doc §2 + ledger-under-sca-v9 doc §0.** Key ship items:

### Shipped (sca-v9 SKILL.md + 4 new dims + R5 5-control codification)

| P-block | Status | Item |
|---|---|---|
| **P0** | ✓ SHIPPED | Anti-self-invent housekeeping: 5 git-mv archives (4 addyosmani-prefix-dups + interview-me) + 2 SKILL.md repairs (learned + gitnexus) |
| **P1** | ✓ SHIPPED | sca-v9: D-EMP HARD GATE + D35 cc_pathway_support + D38 mcp_integration_native + D39 opus_4_7_compat + D40 local_runtime_z_portable + D41 autonomous_loop_compat; R5 5-control layered-defense codified; denom 28.7→33.7 install / 12.9→14.5 pattern |
| **P2** | ✓ SHIPPED | anthropic-sdk-python 3-feature wire: --cache-1h + --batch + --structured |
| **P3** | ✓ SHIPPED | Node-22 node:test migration; tools/mcp-eval-stub.mjs createSdkMcpServer pattern-stub |
| **P4** | ◐ PARTIAL | commitlint half ✓; git-pr-workflows plugin install STAGED (operator-interactive `/plugin install`) |
| **P5** | ✓ SHIPPED env-pending | Tavily + Exa MCP added to `.mcp.json` (CR-9 pinned); env keys pending operator |
| **P6** | ✓ SHIPPED | mise.toml created (node@22 / python@3.13 / go@1.26) |
| **P7** | ◐ PARTIAL | GitNexus operator-decision PolyForm-NC; planning-attest.ps1 SHA-256 sidecar SHIPPED |
| **P8** | ✓ SHIPPED advisory | signed-audit-trails DISABLED (cardinal-rule honesty: no false-assurance); slsa-verifier STAGED |

### Carryover declared by W324 CLOSURE-SYNTHESIS:134-145

- P4 plugin install (operator-interactive)
- P4 flock(2) Windows POSIX path
- P5 TAVILY/EXA env keys (CLAUDE.local.md)
- P7 GitNexus PolyForm-NC license operator-gate decision
- **P8 slsa-verifier operator go install + PreToolUse advisory wiring**
- **R5 cardinal-rule 7-wave SHIP-BLOCKER carry-forward (`bypassPermissions:true` + sandbox `enabled:false`)**
- W317 STREAM-E (4 upstream PRs operator GH-account)
- W320 P5 shell defensive long-tail (16 HIGH × 12 .ps1)
- W320 P7 CLAUDE.md cite-corrections (OllamaServe + LlamaSwap docs)
- anthropic-SDK W325 3-helper direct-API integration once `advisor_pilot_stub` promotes to live

---

## §5 Cross-wave consistency findings

### §5.A Consistent — convergent + non-conflicting

1. **PWF + protect-mcp + review-agent-governance + signed-audit-trails routing**: my W320 ledger rows #89-#92 produced same OPERATOR-ACTIONABLE state as parallel W324 (PWF RE-ENABLE-IN-PLACE; wshobson security triad install-or-confirm).
2. **GitNexus PolyForm-NC operator-gate**: my W319 carry-forward + parallel W324 P7 PARTIAL converge on "operator-decision-pending; not enabled this wave."
3. **`self_invented_count: 0`**: holds across both sessions; W324 P0 housekeeping STRENGTHENED invariant (archived 4 addyosmani-prefix-dups + interview-me; repaired 2 SKILL.md).
4. **R5 partial-hold 7-wave**: my W319 D + W316-S5-L7 etc + parallel W324 CLOSURE §G all agree this is the operative SHIP-BLOCKER.
5. **CLAUDE.md ≤50 LOC body**: held across both sessions (W324 CLOSURE:16 "40 body lines + appendix").
6. **Codex Stop-hook discipline**: parallel session ran 14 codex rounds (W321 ×3 + W324 ×11); mine ran 0 pre-ship + 2 post-ship corrections (r1+r2 cite-corrections).

### §5.B Discrepancies — semantic but not blocking

1. **sca-v9 D39-D41 SEMANTIC OVERLOAD**: W323-4 proposed D39=`supply_chain_attestation` + D40=`layered_defense_depth` + D41=`degraded_mode_explicit` as the addressing of W321-8 codex META blindspots #1+#2+#3; W324 shipped sca-v9 with same D39-D41 NUMBERS but **DIFFERENT NAMES** (D39=opus_4_7_compat + D40=local_runtime_z_portable + D41=autonomous_loop_compat). The W321-8 blindspot codification went to R5 §6 5-control layered-defense PROSE only (not per-candidate scoreable dims). **W326 carry-AI**: revisit whether to add `supply_chain_attestation` + `layered_defense_depth` + `degraded_mode_explicit` as new dims at the next rubric bump (sca-v10 hypothetical).
2. **My W320 rubric-cite drift**: W320 ledger rows cite `sca-v8.1-partial` at row-write time; parallel `8e43c24` had already shipped sca-v9 3 minutes earlier. My `1360aeb` codex-r2 commit cite-corrected this. Tier verdicts UNCHANGED under sca-v9 re-verify (`STREAM-B-W320-LEDGER-UNDER-SCA-V9.md`).
3. **W324 SKILL.md §7 denom arithmetic**: stated 33.7 = 28.7 + 6×1.0 — but `28.7 + 6.0 = 34.7 not 33.7`. Off-by-1.0 detected — flagged as W326-AI-1 in ledger-under-sca-v9 doc §6.
4. **sca-v9 ship-gate floor lifts**: T1 install_score floor 4.0 → **4.5** (+0.5). T2 pattern_score floor 3.5 → **4.0** (+0.5). Parallel-session SHIPPED these but W324 CLOSURE doesn't EXPLICITLY call out the floor changes as a separate observable — operator should be aware that **future verdicts will be harder to achieve T1**.

### §5.C Open issues raised by parallel session not yet acted on

1. **18 documented hook event types; 8 wired** → W321-1 finding; **3 HIGH-gap hooks** (SessionEnd + UserPromptSubmit + SubagentStart/Stop) not wired even after W324.
2. **ECC 21-day drift** → W321-4 finding; deferred to operator (`/plugin update` is interactive).
3. **wshobson agent-teams F4 single-point-of-failure** → W321-2 finding; no documented mitigation in W324; operator-awareness only.
4. **Cookbook-only signed-audit-trails enabled-but-unwired** → W321-8 cruft flag; W324 P8 **RESOLVED by DISABLING** the plugin (per cardinal-rule honesty: no false-assurance).
5. **CCBP cite-anchor staleness** → 1-commit behind (badge-only); no action.

---

## §6 W325 actionable carry-forwards (operator-AI list)

Compiled from W324 CLOSURE-SYNTHESIS §"Carryover to W325" + my W320 carry-forwards + W321-W323 cross-stream gaps:

| Source | Item | Priority |
|---|---|---|
| W324 §carryover | Operator interactive `/plugin install git-pr-workflows@claude-code-workflows` | P1 |
| W324 §carryover | flock(2) SessionStart bare-resume detect (Windows POSIX) | P3 |
| W324 §carryover | TAVILY_API_KEY + EXA_API_KEY values (CLAUDE.local.md) | P2 |
| W324 §carryover | GitNexus PolyForm-NC license operator-gate decision | P2 |
| W324 §carryover | slsa-verifier operator go install + PreToolUse advisory wiring | P1 |
| W324 §carryover R5 | `bypassPermissions:true` + sandbox `enabled:false` 7-wave SHIP-BLOCKER operator-decision | **P0** |
| W324 §carryover W317-E | 4 upstream PRs (operator GH-account) | P2 |
| W324 §carryover W320 | W320 P5 shell defensive long-tail (16 HIGH × 12 .ps1; bash-pro agent staged) | P2 |
| W324 §carryover W320 | W320 P7 CLAUDE.md cite-corrections (OllamaServe + LlamaSwap docs) | P3 |
| W324 §carryover SDK | anthropic-SDK W325 3-helper direct-API integration | P2 |
| W321-1 hook gap | Wire `SessionEnd` + `UserPromptSubmit` + `SubagentStart/Stop` hooks | P2 |
| W321-4 ECC drift | `/plugin update everything-claude-code@everything-claude-code` (DOUBLY-STALE `33ed494a→f3cd00625222→d6022d6b` chain) + re-apply W317 MSYS patch | P1 |
| W321-2 wshobson SPOF | Document `agent-teams/team-lead.md:82` single-point-of-failure in CLAUDE.md or skill-level note | P2 |
| W325 SEV-1 | Rotate leaked perplexity API key (W319 carry-forward; W317-r2-SEV1-1 still open) | **P0** |
| W326 sca-vN+ | Decide whether W323-4 proposed `supply_chain_attestation` + `layered_defense_depth` + `degraded_mode_explicit` re-enter rubric as scored dims | P2 |
| W326 sca-v9-fix | Codex-ratify SKILL.md §7 install denom arithmetic (33.7 vs 34.7 off-by-1.0) + W325 Stream B ledger-under-sca-v9 §6 finding | P1 |

---

## §7 Cites

- `docs/architecture/W321-META-FOUNDATION-WAVE/STREAM-1-ANTHROPICS-AUDIT.md` (hook gap + env-var gap + output style)
- `docs/architecture/W321-META-FOUNDATION-WAVE/STREAM-2-WSHOBSON-AGENTS.md` (54-plugin enumeration + F1-F8 silent-fallback + team-lead SPOF)
- `docs/architecture/W321-META-FOUNDATION-WAVE/STREAM-4-CCBP-ECC.md` (CCBP drift + ECC 21-day drift)
- `docs/architecture/W321-META-FOUNDATION-WAVE/STREAM-7-REDISPATCH.md` (sca-v8 dim proposal)
- `docs/architecture/W321-META-FOUNDATION-WAVE/STREAM-8-REDISPATCH.md` (codex META 3 blindspots + cruft + missing SLSA)
- `docs/architecture/W322-WAVE/CLOSURE-SYNTHESIS.md` (P-block disposition + methodology validation)
- `docs/architecture/W323-COMPREHENSIVE-AUDIT-WAVE/STREAM-4-RESEARCH-ARCH-V9.md` (sca-v9 dim proposal divergent from W324 ship)
- `docs/architecture/W323-COMPREHENSIVE-AUDIT-WAVE/STREAM-6-ANTI-SELF-INVENT-AUDIT.md` (R4-strict 0 violations + R2-exception 2 compliant + operator-strict SKILL.md size advisory)
- `docs/architecture/W323-COMPREHENSIVE-AUDIT-WAVE/STREAM-8-MCP-CONVERGENCE.md` (Tavily + Exa MCP install candidates)
- `docs/architecture/W324-WAVE/CLOSURE-SYNTHESIS.md` (full P0-P8 disposition + carryover list)
- `.claude/skills/sota-convergence-audit/SKILL.md` §5 + §6 + §7 (sca-v9 dim spec + R5 5-control + denoms + ship-gate floors)
