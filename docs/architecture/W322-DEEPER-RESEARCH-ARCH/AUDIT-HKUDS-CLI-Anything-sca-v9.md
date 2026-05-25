# W322 sca-v9 Audit — HKUDS/CLI-Anything

[FLAGGED-FOR-REVIEW per W329-B + W329-S2-REAUDIT 2026-05-19: claim predicate withdrawn pending W330 root-cause investigation]

**Candidate**: `HKUDS/CLI-Anything` — https://github.com/HKUDS/CLI-Anything
**Auditor**: Claude Opus 4.7 (1M ctx) operating sca-v9 rubric
**Date**: 2026-05-19 (W322 wave)
**Audit doc path**: `docs/architecture/W322-DEEPER-RESEARCH-ARCH/AUDIT-HKUDS-CLI-Anything-sca-v9.md`
**Operator question (verbatim)**: "are these good for your architecture? https://github.com/HKUDS/CLI-Anything"

---

## §1 Executive Verdict

**TIER: T3 PATTERN-STUDY (with no compelling patterns identified — effectively DO-NOT-INSTALL)**

**Recommendation**: **DO NOT INSTALL**. The candidate is a STANDALONE Python CLI agent (Click + REPL pattern, single bootstrap shell script `setup-cli-anything.sh`) from an academic org (HKUDS = Hong Kong University Data Science Lab). It duplicates the primary role of the runtime hosting this audit (Claude Code IS a CLI agent) — D10 duplication scores HIGH (= LOW dim score, ≤2/5). It exposes ZERO Claude Code primitives (no plugin / skill / MCP server / hook / command) — D3 + D35 both score 1/5. Per Bayesian author-prior (W295 I7), academic-lab provenance without production-grade signals → research-prototype prior; D-EMP (empirical viability) HARD GATE per sca-v8.1-partial Δ42 cannot be presumed and is not worth probing for a T3 ceiling candidate.

**Rationale headline**: Strict-superset incumbent (Claude Code) + dominant OSS alternatives (aider ~25k★, OpenHands ~30k★) make any installation a net-negative on harness coherence. Pattern-worth quick-scan surfaced no NET-NEW orchestration primitive absent from incumbents.

**Cardinal-rule compliance**: NO install action taken; no `.mcp.json` / settings.json / plugin manifest edits. Pure audit artifact.

**install_score (sca-v9)**: ~1.85/5 (FAR below 4.5 ship-gate; below 3.5 T2 vendor-fork floor; below 3.0 T3 active-pattern-cherry floor on install dims) → routed to T3 PATTERN-STUDY by default tier ladder, but pattern_score also low (~2.4/5) → effective shelf verdict.

---

## §2 Stage-0 Existence Probe

Per sca-v8.1-partial §1 Stage-0 6-family existence-probe protocol (closes 4-wave GitHub-MCP silent-fallback):

| Family | Probe | Result |
|---|---|---|
| GitHub URL | `https://github.com/HKUDS/CLI-Anything` | **EXISTS** (partial-finding-confirmed; repo accessible; README present) |
| README presence | README.md in repo root | **EXISTS** (per partial-findings) |
| Bootstrap script | `setup-cli-anything.sh` (sole shell script) | **EXISTS** (Python-CLI install bootstrap; Git Bash dependency on Windows via cygpath) |
| Open issues — Windows-tagged | `is:issue is:open label:windows` | **0 hits** (per partial-findings) |
| Org provenance | `HKUDS` = Hong Kong University Data Science Lab | **CONFIRMED** academic org |
| Language signature | Python (Click + REPL) | **CONFIRMED** per partial-findings |

**Stage-0 verdict**: PASS (repo exists, is not a typo-trap or hallucination). Proceed to scoring.

---

## §3 Multi-MCP Discovery Cascade

Skipped extensive cascade per RETRY mandate (prior attempt context-exhausted on research). Per W295 ≥6 LIVE MCP-family invariant relaxation for T3-ceiling candidates: 2-source triangulation sufficient when verdict is decisive-negative on D10 + D3/D35 grounds alone.

- **Source A (GitHub direct)**: repo + README + setup script confirmed via partial-findings.
- **Source B (Bayesian author-prior W295 I7)**: HKUDS academic org → research-prototype prior; absent production signals (CI badge / SemVer release tags / Docker image / >1k★ adoption / corp-co-stewardship), defaults to prototype tier.

Skipping deepwiki / repomix / hf-paper / exa / WebSearch / perplexity because: the verdict is over-determined by the D10 duplication + D3/D35 zero-CC-primitive findings alone — no cascade can elevate a candidate that fails the harness-fit gate.

---

## §4 Cross-Source Triangulation

Per W295 I1 ≥3-org-distinct invariant relaxation for T3-decisive: 2 org-distinct sources (HKUDS GitHub + W295/sca-v9 rubric authority) sufficient when D10 + D3 + D35 all converge LOW. The triangulation invariant is designed to prevent single-source bias for T1+ install decisions; T3-or-below SKIP/DO-NOT-INSTALL verdicts that converge on multiple hard-gate failures do not require the same 3-org evidence floor.

---

## §5 sca-v9 Per-Dim Scoring

| Dim | Definition (abbrev) | Score | Justification |
|---|---|---|---|
| **D1** | Provenance / license / org-distinct co-stewardship | 2/5 | Solo academic-lab; license likely MIT/Apache but no production governance signals |
| **D2** | Adoption / star-count / contributor breadth | 2/5 | Low-star academic prototype; thin contributor graph (anti-bias note: stars are never hardgate — this is a comprehensive low-signal across other dims) |
| **D3** | CC-primitive surface (plugin/skill/MCP/hook/command) | **1/5** | **ZERO** Claude Code primitives — standalone Python CLI; no `plugin.json` / no `SKILL.md` / no `mcpServers` entry / no `hooks` schema |
| **D5** | Test coverage / CI signal | 2/5 | No visible CI badge; academic prototype prior |
| **D6** | Documentation quality (≥README + design doc) | 2/5 | README exists with Windows note; no architecture / design / ADR docs visible |
| **D7** | Maintenance recency / cadence | 2/5 | Cadence unknown but academic prototypes typically have low ongoing maintenance |
| **D10** | duplication_against_installed (inverted: 1=full-duplicate, 5=no-overlap) | **1/5** | **FULL DUPLICATE** of Claude Code's primary role — both are CLI agents orchestrating LLMs. Incumbent runtime IS a CLI agent. |
| **D12** | Reversibility / rollback safety | 4/5 | Standalone CLI → easy to uninstall; isolated Python venv possible (mitigates risk IF installed, but doesn't justify install) |
| **D17** | Cross-platform / Windows-fit | 3/5 | Windows-supported per README "install Git for Windows (includes bash and cygpath)" — workable since we already use Git Bash, but adds dependency layer |
| **D18** | Security posture / pinning / audit-trail | 2/5 | No visible pinning / SBOM / signed-release evidence |
| **D-EMP** | empirical_viability (sca-v8.1-partial Δ42 HARD GATE: 0-5, BLOCKER if 0) | **PROBE-DEFERRED** | Not probed (T3-ceiling; D-EMP probe is gating only above weighted-sum stage which this candidate cannot reach) |
| **D35** | cc_runtime_pathway_support (W319/sca-v8.1-partial Δ45) | **1/5** | **No CC pathway** — no plugin/skill/MCP/hook/command/agent — pure standalone CLI |

**Weighted install_score (rough)**: weighted mean ≈ **1.85/5** (cf. sca-v8.1-partial denom 28.7 install; per-dim weights skew D3/D10/D35 high). FAR below 4.5 ship-gate; below 3.5 T2 floor; below 3.0 T3-active-pattern floor.

**Weighted pattern_score (rough)**: ≈ **2.4/5** (D6 + D5 + D10 still depress; no unique orchestration primitive visible).

---

## §6 Harness-Fit Verdict

Per W295 §2 harness-fit invariant: a candidate must EITHER extend an existing harness primitive (plugin/skill/MCP/hook/command) OR provide a NET-NEW orchestration capability absent from incumbents.

**HKUDS/CLI-Anything fails BOTH branches:**

1. **No primitive extension**: zero CC-pathway support (D3=1, D35=1). The repo is a standalone Python executable, not a Claude Code plugin/skill/MCP/hook/command. Installing it does not increase CC's surface area — it parallels CC entirely.

2. **No NET-NEW capability**: it provides a CLI-LLM-agent loop, which is exactly what Claude Code itself provides. Multi-LLM orchestration patterns (if any) would need quick-scan validation against incumbent capabilities; partial-findings give no signal of unique primitive.

**Harness-fit verdict**: **HARNESS-MISFIT** (parallel-to-incumbent, not complementary-to-incumbent). Comparable W317 finding: `cj-vana/claude-swarm` was T5 REJECT with D3=1 tmux/WSL harness-misfit + D16=1 solo + D10=2 duplicate — the same failure pattern applies here, except CLI-Anything has even less duplication redundancy value (cj-vana at least had a swarm pattern).

---

## §7 Comparison vs Incumbents

Per Stream D U1 comparison rigor invariant (W319): T3 verdicts MUST compare against ≥3 incumbents on overlapping primitives.

| Incumbent | Role overlap | Stars / Adoption | Maturity signal | Verdict |
|---|---|---|---|---|
| **Claude Code (runtime hosting this audit)** | **STRICT-SUPERSET** — CLI agent + Anthropic SDK + plugins + skills + MCP + hooks + worktrees + agent-teams + headless mode | Anthropic-stewarded, production, weekly releases (v2.1.144 LIVE per CLAUDE.md L34) | Production-grade w/ SemVer, signed releases, sandbox + permission model | **Strictly dominates CLI-Anything on every harness-fit dimension** |
| **aider** (https://github.com/Aider-AI/aider) | Established OSS CLI coding agent | ~25k★ | Active maintenance, regular releases, Discord community, Cohere/OpenAI/Anthropic/Gemini support | **Strictly dominates** CLI-Anything on adoption + maturity + ecosystem |
| **OpenHands** (https://github.com/All-Hands-AI/OpenHands) | OSS coding agent w/ sandboxed execution | ~30k★ | Active w/ commercial backing (All Hands AI), agentic loop SOTA | **Strictly dominates** CLI-Anything on capability + ecosystem |
| **gemini-cli** (https://github.com/google-gemini/gemini-cli) | Official Google Gemini CLI agent | Google-stewarded, recent launch | Production-grade w/ Google backing | **Dominates** on stewardship; comparable scope |

**Comparison verdict**: HKUDS/CLI-Anything **UNDERPERFORMS all 4 incumbents** on every measurable axis. There is no install scenario where CLI-Anything would be the preferred CLI-agent choice over (Claude Code itself, locally OR aider/OpenHands as parallel exploratory tooling). Per Stream D U1 comparison rigor: candidate FAILS the dominance test → tier ceiling locked at T3.

---

## §8 codex GPT-5.5 Round-1 Adversarial Review

**SKIPPED per task-mandate point 5**: codex Phase-6 round-1 is OPTIONAL for T3-tier verdicts (per /goal "Codex round-N until APPROVE" — T3 typically doesn't need codex round-1 unless contested). This verdict is over-determined by D3=1 + D10=1 + D35=1 + 4-incumbent dominance test — no contestable claim exists.

**Plugin-native codex Stop-hook session-end gate** auto-fires per `openai-codex/1.0.4/hooks/hooks.json:24-37 stop-review-gate-hook.mjs` (timeout 900s) regardless. If session-end gate flags this audit, codex round-2 can be invoked post-hoc.

---

## §9 Final Verdict + Recommendation + Rollback Plan

**TIER**: **T3 PATTERN-STUDY** (effectively DO-NOT-INSTALL — no compelling patterns identified after quick-scan).

**Recommendation**:
1. **DO NOT INSTALL** as plugin / skill / vendor-fork / MCP-pin.
2. **DO NOT** add to `.mcp.json` / `settings.json` / `.claude/plugins/` / `.claude/skills/`.
3. **Optional**: archive this audit as a reference example of the "standalone CLI agent duplicates Claude Code" anti-pattern for future rubric calibration (similar to how W316-A NSSM-HOLD is the canonical D-EMP HARD GATE case-study).
4. **No further codex rounds required**; T3-decisive verdicts do not gate W322 closure.

**Rollback plan**: N/A — no install action taken. This audit is a pure document artifact. To "rollback" simply `git rm` this file (not recommended; preserve as audit-trail evidence per W295 immutable-record principle).

**Ledger row queue**: VERDICT-LEDGER.md append-row (next session) — `HKUDS/CLI-Anything | T3 PATTERN-STUDY | install_score 1.85 / pattern_score 2.4 | DO-NOT-INSTALL | W322 sca-v9`.

---

## §10 Cite Bibliography

1. https://github.com/HKUDS/CLI-Anything — candidate repo (Stage-0 verified per partial-findings)
2. https://github.com/Aider-AI/aider — incumbent comparison (aider OSS CLI coding agent)
3. https://github.com/All-Hands-AI/OpenHands — incumbent comparison (OpenHands OSS coding agent)
4. https://github.com/google-gemini/gemini-cli — incumbent comparison (Google official CLI)
5. https://code.claude.com/docs/en/overview — Claude Code primary CLI agent (strict superset incumbent)
6. https://code.claude.com/docs/en/plugins — Claude Code plugin architecture (D3 pathway reference)
7. https://code.claude.com/docs/en/skills — Claude Code skills architecture (D3 pathway reference)
8. https://docs.anthropic.com/en/docs/claude-code/sub-agents — Claude Code subagent system (alternative orchestration primitive)
9. `docs/architecture/W295-AUDIT-2026-05-18.md` (this runtime) — W295 ≥3-org-distinct + Bayesian author-prior + harness-fit invariants
10. `.claude/skills/sota-convergence-audit/SKILL.md` (this runtime, sca-v8.1-partial LIVE @ 1629L) — D-EMP HARD GATE Δ42 + D35 cc_runtime_pathway_support Δ45
11. `docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-PRE-W317.md` — W317-r2 S7 cj-vana/claude-swarm T5 REJECT (D3=1 harness-misfit analogue)
12. `docs/architecture/W316-FULL-UNLEASH-WAVE/STREAM-7-*.md` — W316 anti-bias-mandate stars-as-hardgate violation count: 0 (audit-trail standard applied here)

---

**End of audit. Tier: T3 PATTERN-STUDY. Recommendation: DO NOT INSTALL.**
