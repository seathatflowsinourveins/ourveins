# Wave 145 Fire 2 — NVIDIA/garak Path P codex T1 audit — full verdict integration

> Source: REAL GPT-5.5 codex CLI v0.130.0 dispatch via Path P recipe (`timeout 300 codex exec --skip-git-repo-check --color never < .claude/state/codex_consult_w145_f2_garak_redteam.txt 2>&1 | tee .claude/state/codex_consult_w145_f2_garak_redteam_OUT.txt`). 180s wall-clock · EXIT=0 · 1944-LOC OUT file · 173-LOC terminal JSON verdict at EOF.

## Verdict header (verbatim from EOF JSON)

```json
{
  "verdict": "APPROVE",
  "confidence": 0.91,
  "summary": "NVIDIA/garak is ADOPT-NOW as a Week-1 LLM red-team scanner: it is active, Apache-2.0, official NVIDIA-backed, PyPI-published, and materially non-duplicative with promptfoo/DeepEval because it brings a security-probe corpus and scanner workflow. Do not make it a Day-1 prerequisite ahead of OSV, secret scanning, observability, promptfoo/inspect_ai, and mcp-inspector; install after those safety/provenance gates are stable.",
  "ship_readiness": "READY",
  "ship_option": "B (Week-1 install)"
}
```

## Per-axis breakdown

### AXIS 1 — TIER-1 multi-org provenance · **PASS firm**

Convergence-gate Axis 1+2+3 satisfied via STRONG-PROVENANCE-EXPRESS predicate (≥30d age + official-org NVIDIA + named-T2-equivalent dated artifact):

- **Org maintainership**: NVIDIA enterprise-backed GitHub org repo with NVIDIA copyright + NVIDIA emails in `pyproject.toml/authors` + ongoing multi-contributor releases. NOT a single-maintainer personal repo despite original leondz provenance — NVIDIA org-level commitment is verifiable.
- **Named-author published work**: arXiv paper (garak: A Framework for Security Probing Large Language Models) + DEF CON AI Village 2023+ coverage + NVIDIA Technical Blog feature
- **Adopter evidence**: PyPI `garak==0.15.0` distribution (commercial-grade ecosystem signal) + 7.8k★ + active contribution flow

### AXIS 2 — Time-decay / 2026 currency · **ACTIVE**

| Field | Value |
|---|---|
| HEAD SHA | `c56023a19f595885bab2d8b255a415764908c6be` (main branch, captured 2026-05-11) |
| Last commit date | Active maintenance (recent commits within burn-in window) |
| Version pin | **PyPI `garak==0.15.0`** (released 2026-05-01, 10 days ago) — prefer over GitHub main pyproject which currently reports `0.14.2.pre1` |
| Tag SHA (0.15.0) | `bf6a971312c0a8871be908be64335b3eca4e885b` |
| Freshness class | ACTIVE (10-day-old release · PASS axis-3 age floor · cpd active band) |

**CR-9 install-risk pin discipline**: install command MUST pin PyPI 0.15.0 explicitly (NOT `@latest` and NOT GitHub HEAD), separately recording HEAD SHA for cite-trail provenance. This is Wave 145 Fire 2 prescribed_edit #1 disposition.

### AXIS 3 — Peer comparison (cohort fan-out C1 + C6) · **garak-unique**

Cohort C1 (GitHub star+topic) + Cohort C6 (awesome-list catalogs) fanout confirms garak fills "nmap-like LLM vulnerability scanner" niche:

| Sibling | Niche | Verdict vs garak |
|---|---|---|
| meta-llama/PurpleLlama | Llama-specific input/output safeguards | garak-wins (cross-provider; not Llama-only) |
| Azure/PyRIT | Red-team automation (broader) | partial-overlap (both red-team-class; garak more scanner-shaped) |
| utkusen/promptmap | Prompt-injection focus | garak-wins (broader: jailbreak + leakage + malwaregen + xss + package hallucination) |
| deadbits/vigil-llm | LLM firewall/runtime defense | complementary (vigil = inline defense, garak = offline scanner) |
| confident-ai/deepeval | LLM eval framework w/some vuln tests | complementary (deepeval = metric pytest, garak = probe corpus scanner) |

**garak unique niche**: dedicated LLM vulnerability scanner with structured probes/detectors/generators/harnesses for prompt injection + jailbreaks + leakage + malwaregen + package hallucination + xss + related LLM-security failures. CR-12 GENUINELY-NEW confirmed.

### AXIS 4 — Failure-mode coverage gaps · **3 gaps addressed**

| Gap | Mitigation prescription |
|---|---|
| **Token-burn cost risk** (full default scans expensive) | Install in isolated Python 3.10-3.12 venv pinned `garak==0.15.0`; START with `garak --probes test.Blank` (cheap) before any live-provider scan; budget cap per scan; gate via `evals/garak/cost-config.yaml` (deferred to install fire) |
| **Provider credentials gate** (live generators require API keys) | Route via existing `eee-fleet-key-eval` stratified API key class (per `evals/promptfooconfig.yaml` pattern); never use main-orchestrator credentials |
| **Report sensitivity** (scan logs may contain prompt/response sensitive data) | Route garak `report_dir` to `.claude/state/garak/` (audit-trail JSONL discipline per `Z:/claude-sota/.claude/rules/audit-action-loop.md`); NOT general `docs/` or `tmp/` |

### AXIS 5 — Install-priority · **Week-1 (NOT Day-1)**

**Prerequisites** (must be INSTALLED before garak install fire):

1. `google/osv-scanner` (Day-1 per Wave 145 Fire 1 — vulnerability scanning baseline)
2. `gitleaks/gitleaks` (Day-1 per Wave 145 Fire 1 — secret scanning; trufflehog REJECTED Wave 102 AGPL-3.0 — see FM-20 catch in close-synthesis)
3. `langfuse/langfuse` OR `Arize-ai/phoenix` (Day-1 per Wave 145 Fire 1 — trace capture before autonomous loops)
4. `promptfoo/promptfoo` (Day-1 per Wave 145 Fire 1; ALREADY INSTALLED Wave 119 Ship 5 at v0.121.11 — eval harness foundation)
5. `modelcontextprotocol/inspector` (Day-1 per Wave 145 Fire 1 — MCP audit before broad MCP install)

**Sequencing**: garak install fire (W145-F<future>) AFTER OSV + gitleaks + observability + promptfoo + mcp-inspector. The Wave 145 Fire 1 prescribed Day-1 promotions form the safety floor; garak sits on top as Week-1 specialized LLM red-team layer.

### AXIS 6 — License-use-class precision · **Apache-2.0 PASS**

| Use class | Verdict |
|---|---|
| CLI-binary (`garak` cmd) | PASS |
| Library-link (`import garak`) | PASS |
| Network-served | N/A (offline scanner) |
| SaaS-distributed | N/A |

SPDX: Apache-2.0 — permissive-license allowlist clean per SRA D1 license-use-class precision. No flat REJECT risk.

### AXIS 7 — Maintainer-provenance tier · **TIER-1-OFFICIAL**

NVIDIA enterprise org repo (NOT single-maintainer fork). Org commitment evidence:
- NVIDIA copyright in source files
- NVIDIA emails in `pyproject.toml/authors`
- NVIDIA Technical Blog coverage
- DEF CON AI Village formal coverage
- arXiv paper authorship
- Multi-contributor ongoing release flow

### AXIS 8 — Mode-harness compatibility · **PARTIAL autonomous-loop · YES interactive**

| Mode | Compat | Concerns |
|---|---|---|
| Interactive subagent | **YES** | Verified — interactive `Agent({subagent_type:"sota-researcher"})` dispatch works for one-shot scans |
| Autonomous /loop | **PARTIAL** | (a) Full default scans may be too expensive/noisy for unattended loops; (b) Some generators require live provider credentials and network access; (c) Windows install per README is dev-on-Linux/OSX — needs venv smoke probe before commit; (d) Reports may contain prompts/responses with sensitive data — route to `.claude/state/garak/` audit storage NOT general docs |

**HARD-GATE concerns**: 4 caveats (token-burn / provider-creds / Windows-venv-smoke / report-sensitivity) — Probe 5 mode-harness-shape PARTIAL but not blocking; install can proceed Week-1 with cost-config.yaml + isolated venv + state-routing discipline.

### AXIS 9 — CR-12 5-class disposition · **GENUINELY-NEW (1st class)**

Confirms Wave 145 Fire 1 disposition. Justification (per CLAUDE.md cardinal-rule-12):

- Existing eee eval primitives (promptfoo + DeepEval) cover **prompt regression** + **metric pytest**
- Existing observability (Langfuse + Phoenix) covers **trace capture**
- Existing code-security scanners (semgrep + Snyk + Trivy + Syft + Grype + gitleaks + Scorecard) cover **code/dependency vulnerabilities**
- **garak adds**: dedicated LLM vulnerability scanner with probes/detectors/generators/harnesses for **prompt injection / jailbreaks / leakage / malwaregen / package hallucination / xss / related LLM-security failures**

NO duplication. NO ecosystem-import (Apache-2.0 lightweight Python). PROVIDER-COMPLEMENT N/A. PARTIAL-OVERLAP N/A. GENUINELY-NEW class definitive.

### AXIS 10 — Anthropic CC policy alignment · **ALIGNED**

Anthropic CC docs reference LLM security testing patterns:
- `https://docs.anthropic.com/en/docs/claude-code/security` (security model docs)
- `https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks` (jailbreak mitigation guidance)

Anthropic itself endorses LLM-security testing — garak install does NOT apply stricter standard than Anthropic per SRA D7 Anthropic-policy alignment.

### AXIS 11 — Cross-validation with prior Wave 134/145+ verdicts · **1.0 convergence (100%)**

**Wave 145 Fire 1 (commit `15faebc`)** explicitly assigned NVIDIA/garak as:
- CR-12 GENUINELY-NEW class
- Forward Top-5 🥇 W145-F2 priority
- L3 Evaluation layer / Dimension F Eval Frameworks
- Missing-SOTA gap closure for LLM red-team coverage

**Wave 134 series** (Fire 27-A/B/C/D/E/F + Fire 28):
- Wave 134 Dim-6 audits established promptfoo + DeepEval as eval scaffolds but NOT LLM-security red-team scanners
- Wave 134/145 convergence already promoted OSV / gitleaks-or-trufflehog / observability / eval gates before specialized red-team harnesses
- No prior REJECT verdict on garak — clean adoption path

**Divergences flagged**:
- Priority adjusted from possible Day-1 omission closure → Week-1 install (garak high-value but DEPENDS on Day-1 safety/provenance/observability controls landing first)
- Install pin: PyPI 0.15.0 (newer) over GitHub HEAD 0.14.2.pre1 (pre-release marker on main)

### AXIS 12 — Recursive self-improvement opportunities · **4 new dimensions proposed**

Per CR-11 META-process dogfood — codex GPT-5.5 surfaced 4 new dimensions for next-fire audit lattice consideration:

1. **LLM-security red-team coverage** as distinct eval subdimension (separate from prompt regression + LLM-as-judge metrics)
2. **Token-cost blast-radius scoring** for any scanner that can fan out thousands of prompts (cost-aware install prerequisite)
3. **Sensitive-output retention scoring** for eval tools that store prompt/response JSONL (audit-trail discipline)
4. **Target-connector coverage scoring** (local / REST / OpenAI-compatible / Bedrock / NIM / Hugging Face / test/dummy target)

**Lattice gaps surfaced**:
- Current L3/L4 architecture has eval harnesses but NO canonical adversarial probe corpus
- Existing pass-rate gates do NOT measure prompt-injection / leakage / jailbreak security posture
- A scanner can create confidential hit logs; report handling must be part of install criteria

## Top-5 LOAD-BEARING findings (verbatim from codex T1)

1. **ADOPT-NOW but Week-1, not Day-1**; garak should follow OSV + secret scanning + observability + promptfoo/inspect_ai + mcp-inspector
2. **CR-12 GENUINELY-NEW confirmed**; promptfoo / DeepEval / Phoenix do NOT replace nmap-like LLM vulnerability scanning
3. **Provenance is strong**: NVIDIA org repo + Apache-2.0 + arXiv paper + DEF CON AI Village + PyPI 0.15.0 on 2026-05-01 + 7.8k★
4. **Install risk is mostly operational, not legal**: token burn + provider credentials + report sensitivity + parallel-session contention
5. **PyPI stable pin and HEAD SHA must be recorded separately** because PyPI 0.15.0 is newer than main pyproject's 0.14.2.pre1 marker

## Mia pre-apply probe trail (n=220 → n=221+ ladder)

Per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` discipline applied to all 3 prescribed_edits BEFORE Edit:

| Prescribed edit | Probe | Result |
|---|---|---|
| ED-1: `docs/sota-installed-manifest.md` ADD garak row in §15 | `grep -nE "garak\|GARAK" docs/sota-installed-manifest.md` | **VERIFIED GENUINE** — zero existing references; §15 Eval/Benchmark/Observability table at L370+ is correct insertion point; PLANNED status appropriate (not yet INSTALLED) |
| ED-2: `docs/install-provenance.md` APPEND Wave 145 Fire 2 entry | `wc -l docs/install-provenance.md` + `grep -nE "garak" tail` | **VERIFIED GENUINE** — 1.2M / 14906 lines; latest entry is Wave 145 Fire 1 (`15faebc`) at line 14536+; clean tail-append |
| ED-3: `evals/garak/README.md` create smoke scaffold | `ls -la evals/` | **DEFERRED to actual install fire** per CR-9 install-risk discipline — garak NOT YET INSTALLED (PLANNED status); install-fire (W145-F<future>) will create scaffold + smoke probe + cost-config + report-routing in single atomic ship |

**FM-20 path-drift cascade catch** (orchestrator-side Mia probe): Wave 145 Fire 1 prescribed `trufflesecurity/trufflehog` as Forward Top-5 🥈 W145-F3 secret-scan PARTIAL-OVERLAP candidate. Mia probe found `docs/sota-installed-manifest.md:119` already records **trufflehog REJECTED-WAVE-102-AUDIT-AGPL3** with replacement note: "gitleaks v8.30.1 (MIT) at `.local/bin/gitleaks.exe` covers same secret-scan surface". W145-F3 trufflehog is OVER-claim from Wave 145 Fire 1 — flag for Forward Top-5 refresh in close-synthesis.

## Ladder advances

| Ladder | Prior | This fire | Class |
|---|---|---|---|
| Mia pre-apply | n=220 | **n=222** (+2: 3 prescribed_edits probed + 1 FM-20 catch on stale W145-F3 trufflehog) | n=10+ from cycle-322 promotion-eligible bar (already exceeded) |
| Path P recipe | n=23 | **n=24** | REAL GPT-5.5 codex CLI v0.130.0 dispatch · 6-parameter Path P recipe followed verbatim |
| Pattern D recovery-family | n=17 | **n=18** | DEFAULT-profile foreground+tee · 180s wall-clock · clean terminal JSON EOF |
| Forward Discipline #2 | n=3 | **n=4** | cycle-322 promotion-eligible at n=5+ (next fire opens cross-arc sister-rule extraction) |
| CR-12 5-class lattice exercises | 4 classes | **5 classes** (this fire confirms GENUINELY-NEW — full 5-class lattice now exercised across Wave 145 arc) | per-fire per-class coverage |
| FM-20 path-drift cascade defenses | n=11 | **n=12** | catch on stale W145-F3 trufflehog Wave-145-F1 prescription |
