# W290 — Verdict Ledger Delta

> **Note**: W290 was an AUDIT + DISCOVERY wave, not an INSTALL wave. No new T1/T2 verdicts were finalised — F3's Top-8 candidates need Stage 2 typed-evidence + Stage 4 adversarial review (queued for W291). This file records the wave's INVESTIGATIVE verdicts (audit findings) and PREPARATORY queue (W291 candidate slate).

---

## §1 — Audit findings (no candidate; these are runtime-self verdicts)

| # | Wave | Finding | Verdict-class | Owner | Action AI |
|---:|:---:|---|---|---|---|
| 1 | W290 | Runtime Python type-clean (pyright default mode, 26 files, 0 errors / 0 warnings) | **GREEN — code-quality** | F1 | none — record for AGING tracking |
| 2 | W290 | Runtime shell scripts clean (shellcheck on 6 in-tree scripts, 0 findings) | **GREEN — shell-quality** | F1 | none |
| 3 | W290 | 5 HIGH ruff findings (B007 × 1, B009 × 1, F541 × 3) — all minor or cosmetic | **GREEN — minor cleanup** | F1 | AI-4 (5min fix) |
| 4 | W290 | 32 ruff SECURITY findings (S310 ×6, S607 ×4, S101 ×22) — hardening, not bugs | **YELLOW — hardening opportunity** | F1 | AI-5 (30min hardening) |
| 5 | W290 | Historical secret commit `52881fde41` (2026-05-16): gh-fine-grained-pat ×2, perplexity-api-key ×2 — pre-commit gitleaks gate bypassed | **YELLOW — secret-class historical** | F2 | AI-1 (verify+rotate) + AI-6 (root-cause) |
| 6 | W290 | `anthropic` SDK 0.86.0 CVE-2026-34450 + CVE-2026-34452 | **HIGH — CVE upgrade required** | F2 | AI-2 (`pip install -U anthropic`) |
| 7 | W290 | `banks` 2.2.0 CVE-2026-44209 (jinja2 SSTI) | **HIGH — CVE upgrade + harden** | F2 | AI-3 (`pip install -U banks` + SandboxedEnvironment) |
| 8 | W290 | MCP supply-chain (.mcp.json + active servers) — 11 active, 0 floating pins, 0 literal secrets | **GREEN — supply-chain** | F2 | none — CR-9 compliance verified |

---

## §2 — Candidate queue (Top-8 from F3 → W291 typed-evidence + score)

These are NOT verdicts. They are queue entries with preliminary tier estimates. W291 must run Stage 2 typed-evidence collection + Stage 3 SCORE + Stage 4 adversarial review before any tier becomes a final verdict.

| Rank | Candidate | Stars | Axis | Tier (prelim) | Awaiting | Notes |
|---:|---|---:|---|:---:|---|---|
| 1 | `daytonaio/daytona` | ~14k | Sandbox | T2 VENDOR-FORK | Stage 2 + license-fork check (AGPL) | Native `daytona mcp init claude` — strongest CC-pathway of any new sandbox; 90ms spin time |
| 2 | `microsoft/PromptWizard` | ~2k | Prompt-opt | T3 PATTERN-STUDY | Stage 2 + pattern_doc_path | Measured +12% GSM8k vs DSPy (incumbent) |
| 3 | `daymade/claude-code-skills` | <500 | Low-star | T3 PATTERN-STUDY | Stage 2 + pattern_doc_path | Meta-skill `skill-creator` + 3-level progressive disclosure + `security_scan.py` gitleaks integration |
| 4 | `All-Hands-AI/OpenHands` | ~62k | Code-agent | T2 VENDOR-FORK | Stage 2 + divergence_files | 77.6 SWE-bench + ACP-Claude provider; production users |
| 5 | `Azure/PyRIT` | ~3k | Red-team | T3 PATTERN-STUDY | Stage 2 + pattern_doc_path | Multi-modal red-teaming extends installed `garak` |
| 6 | `rohitg00/awesome-claude-code-toolkit` | TBD | Mega-catalog | T3 PATTERN-STUDY | Stage 2 + meta-curation | 135 agents + 35 skills + 42 commands aggregation |
| 7 | `levnikolaevich/claude-code-skills` | <500 | Low-star | T3 PATTERN-STUDY | Stage 2 + code-anchor of `hashline-edit` MCP | Hash-validated atomic file editing — no incumbent |
| 8 | `huggingface/skills` | ~3k | Non-GH-source | T3-or-T1 | Stage 2 + HF-integration architecture check | Could elevate to T1 INSTALL if HF inference provider integration is needed |

**Saturation indicator**: F3 declared the LLM-gateway/router layer saturated vs incumbent `BerriAI/litellm`. No probe in W291+.

**Repomix pre-pack queue** (per AI-10): batch `git clone --depth 1 + repomix <local>` for the Top-8 before W291 Stage 2 (per W286 Win-v1.14.0 workaround).

---

## §3 — v3.1 point-revision queue (W291)

Per F4 ship-decision:

| Gap | Description | Estimated effort |
|---|---|---|
| **G4** | AGING re-litigation cron — flag verdicts wave 6-11 for re-collection | ~1 hr to spec + ~30 min cron-config |
| **G7** | Awesome-list deltagrep — find repos cited in awesome-lists but missing from adoption-decisions ledger | ~2 hr to design + 1 hr to implement |
| **G10** | Ledger 4-target → 2-target collapse — graphiti retirement per W272 + hindsight downgrade to best-effort | ~30 min SKILL.md + 30 min STREAM-D edit |

---

## §4 — v4 design queue (W295)

Per F4 ship-decision (post-codex-gate-APPROVE):

| Gap | Description |
|---|---|
| **G1** | Source-disagreement as first-class composite input (confidence_factor multiplier) |
| **G3** | Deterministic D12 community_signal_distribution formula |
| **G6** | Cost-telemetry via langfuse (replaces v3 estimates) |
| **G8** | Perplexity MCP / sonar API as TIER-1-DIRECT Stage-1 source |

---

## §5 — Deferred-indefinitely

Per F4 ship-decision:

| Gap | Description | Reason for defer |
|---|---|---|
| **G2** | Behavioural-equivalence Lane D | Requires output-similarity infrastructure not yet built |
| **G5** | `revision_density` tracking | Needs accumulated history; ledger is too fresh |
| **G9** | VENDOR-FORK drift-watch | Only 1 active fork; manual is sufficient for now |

---

## §6 — Cite trail

- `F1-CODE-QUALITY-AUDIT.md` — pyright/ruff/shellcheck findings
- `F2-SECURITY-AUDIT.md` — gitleaks history+tree, pip-audit, npm audit, MCP supply-chain
- `F3-SOTA-DISCOVERY-W290.md` — 24 new candidates across 4 axes
- `F4-CONVERGENCE-METHOD-V4.md` — 10 gaps + ship decisions
- `W290-MASTER.md` — executive synthesis

No graphiti/basic-memory ledger writes this wave (no new candidate verdicts).
