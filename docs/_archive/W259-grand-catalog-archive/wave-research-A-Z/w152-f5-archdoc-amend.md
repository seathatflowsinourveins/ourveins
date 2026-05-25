
---

## v2 Amendments — Wave 152 Fire 5 codex T1 NEEDS-REVISION conf=0.89 integration

**Verdict**: NEEDS-REVISION conf=0.89 [VERIFIED via `.claude/state/codex_consult_wave152_f5_arch_completeness_OUT.txt:51-52,309-310`] — REAL GPT-5.5 BRIDGE-MODE via Path P codex T1 foreground+tee Pattern D 6-parameter strict-conform; FD#2 single-claim 60-180s budget; cross-model gate FULLY SATISFIED per CR-3 Phase 1 bootstrap exception.

**Per codex T1 directive**: existing L0-L8 skeleton is sound; missing pieces are cross-cutting operational controls + supply-chain maturity rather than failed architecture. NEEDS-REVISION (not REJECT) integration follows.

---

### v2-A — 5 NEW dimensions K/L/M/N/O (cross-cutting controls)

| Dim | Slot | Purpose | Composition |
|---|---|---|---|
| **K** | Security/sandboxing/policy | Threat-model + Lethal Trifecta filter + .claudeignore enforcement + permission-mode classifier + readonly-guard + safety-deny patterns + cross-layer policy enforcement | safety_guard.py + agent_plan_readonly_bash_guard.py + .claudeignore + cardinal-rule-7 graduated unleash + Snyk ToxicSkills 36% baseline mitigation |
| **L** | Cost/quota/cache/budget | Per-account quota tracking + token budget gates + cache-rate measurement + spend forecasting + rate-limit governance | cpa-usage-keeper (sidecar) + CPA Mgmt UI + ccusage + Splitrail + Helicone-style AI-gateway routing |
| **M** | Reproducibility/provenance/CI-CD | SLSA provenance + Sigstore signing + in-toto attestations + reproducible-builds + GUAC supply-chain graph + Allstar policy enforcement | cosign + Sigstore + in-toto + SLSA + GUAC + reproducible-builds + Allstar (operator-side CI/CD) |
| **N** | Agent/prompt engineering lifecycle | Role taxonomy + prompt versioning + tool versioning + eval-loop + injection resistance + brief-template + dispatch discipline | Wave 24-D advanced agent team standing-directive + advanced-agent-team rules + Mia pre-apply + FM-17/FM-19/FM-20 disciplines |
| **O** | Legal/license/privacy/retention | SPDX scanning + license-compatibility allowlist + PII filter + data retention + GDPR / SOC2 / EU AI Act compliance | ScanCode + FOSSA + SPDX + retention policy + cardinal-rule data-handling |

### v2-B — 5 misallocation corrections per codex T1

- **Sigstore**: L3 → **L7.5/M** (delivery/provenance for own artifacts; L3 retains UPSTREAM-cite-verification only)
- **skill-creator A/B**: L4 → **L7** (construction primitive, not eval framework; L4 retains custom-task harness + Inspect AI + promptfoo + deepeval)
- **planning-with-files**: L0+L6 → **L6 only** (architectural home is knowledge persistence; L0 retains plan-attestation invariant ONLY)
- **Context7**: L1+L7 → **L1 only** (primarily discovery/reference retrieval; L7 retains construction-time consumption as knowledge-source via L1 dependency)
- **Native OTel**: L0+L8 → **L8 only** (architectural purpose is observability/feedback; L0 retains instrumentation-enabled INVARIANT ONLY)

### v2-C — 9 SOTA gaps May 2026 (supersedence map)

| Component | Supersedes | Rationale |
|---|---|---|
| SLSA provenance + Sigstore signing (paired) | Sigstore-only mention | Modern supply-chain completeness requires both artifact signing + provenance/build-integrity controls |
| GUAC-backed supply-chain graph | Flat SBOM/vulnerability scanner list | Graph model supports cross-repo comparison of deps/CVEs/attestations/licenses/provenance |
| OpenTelemetry GenAI semantic conventions | Generic native OTel | Agent traces should standardize model/tool/token/latency/cost attributes for portable observability |
| Braintrust (or equivalent eval dataset platform) | promptfoo/deepeval/Inspect-only eval stack | Production-grade workflow needs dataset curation + experiment tracking + regression gates + human review |
| Helicone OR LiteLLM proxy OR equivalent AI gateway | Observability-only cost tracking | Provider routing + request logging + caching + rate limits + spend governance now part of practical agent ops |
| RAGAS (or equivalent retrieval-quality evals) | Generic custom task harness | Research architectures with RAG need explicit groundedness + retrieval metrics, not only end-task success |
| Sourcegraph/Cody OR SCIP/LSIF code intelligence | Serena LSP + ast-grep only | Repo-at-scale comparison benefits from indexed cross-reference + symbol graph + code navigation infrastructure |
| OpenSSF Scorecard + Allstar policy enforcement | Scorecard-only evaluation | Scorecard measures posture; Allstar policy-as-code makes the result operational |
| in-toto attestations | Informal provenance log | Build/release provenance should be machine-verifiable, not only documented |

### v2-D — Structural concerns + downstream tickets

1. L3 evaluation layer broad; mixes repo-quality / static analysis / license / supply-chain integrity / artifact signing **without clear evidence schema** → introduce L3 normalized data model (claim, source, evidence, confidence, timestamp)
2. Architecture lacks explicit **normalized data model** connecting candidates ↔ metrics ↔ citations ↔ artifacts ↔ decisions ↔ post-decision outcomes → L6+L8 schema unification needed
3. L6 knowledge layer **too document-centric** for GitHub-at-scale research → needs hybrid retrieval + source anchoring + citation ledgers + retention policy
4. L8 feedback should **distinguish observability / offline evals / online evals / human review / cost monitoring / incident learning** → sub-layer the L8 stack
5. A-J dimensions complete for stated workflow but **incomplete without K/L/M/N/O** (see v2-A above)

### v2-E — Pattern A apply summary

This v2 section is the Pattern A single-fix-forward application of codex T1 NEEDS-REVISION conf=0.89. Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A: atomic apply of ALL prescribed amendments (K/L/M/N/O + misalloc + SOTA-gaps + structural concerns) in single forward-only doc append per `port-note-discipline.md §6` — NOT amend stale L0-L8 section rows. Future ticks audit current state against expanded reference (L0-L8 + K/L/M/N/O = 14-layer effective architecture).

Cite class: `constituents=[TIER-1-DIRECT @ Anthropic + OpenAI cross-model gate REAL GPT-5.5 codex T1 verdict at .claude/state/codex_consult_wave152_f5_arch_completeness_OUT.txt:51-52,309-310, TIER-2 @ codex T1 prescribed structural amendments, TIER-3-LOCAL-COMPOSITION @ Pattern A integration]; effective_tier=TIER-3-LOCAL-COMPOSITION` per citation-discipline rule #8.

Ladder advances this Pattern A integration: Path P n=32→33 (17-tick streak BROKEN), FD#2 n=9→10 (cycle-322 PROMOTION-MET strengthened), Pattern A cumulative single-fix-forward n+1, cross-model gate satisfaction count 7→8.
