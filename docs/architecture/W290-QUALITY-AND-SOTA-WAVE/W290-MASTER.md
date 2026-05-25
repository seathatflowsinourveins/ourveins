# W290 — Architecture Quality + Next-Wave SOTA Discovery — Master Synthesis

> **Date**: 2026-05-18
> **Wave**: W290 (4-fork parallel sweep on `main` post-`dd95994` hygiene commit)
> **Operator mandate (2026-05-18 14:19 hindsight)**: "deep SOTA-quality audit to find real bugs ... using pyright, shellcheck, and gitleaks, audit the research-architecture, ingest top SOTA repos, and evolve the convergence-method."
> **Trigger**: W288/W289 are shipped; v3 architecture is fresh (ACTIVE band, 2 weeks old). Next-wave question: does the codebase actually pass the SOTA-quality bar v3 demands, AND what's the next-step evolution?

---

## §0 — TL;DR (one paragraph)

W290 ran 4 parallel forks at max depth. **F1 code-quality** ran pyright + ruff + shellcheck on all 26 real Python + 6 real shell files and found **zero pyright errors, zero shellcheck findings, and only 5 HIGH ruff bugs (all minor or cosmetic)** — the operator's "find real bugs" mandate returned a negative finding: the runtime is in good shape. **F2 security audit** ran gitleaks history + tree + pip-audit + npm audit + MCP supply-chain review and returned **YELLOW** verdict with 3 HIGH operator-actionable items (1 historical secret commit, 2 CVE upgrades). **F3 SOTA discovery** surfaced **24 NEW candidates across 4 axes** (architecture layers W288 missed + non-GitHub sources + low-star high-quality + multi-angle convergence), with 8 top-priority ADD-TO-W291-AUDIT. **F4 sca-v4 evolution** recommends **SHIP-W295** with 3 v3.1 point-revisions in W291 (G4 AGING cron · G7 awesome-list deltagrep · G10 ledger 4→2-target collapse). Overall: v3 is fresh and working; the path forward is targeted hardening + selective adoption + deferred v4 cutover.

---

## §1 — Stream inventory

| Fork | File | Lines | Verdict |
|---|---|---:|---|
| **F1 — Code-Quality Audit** | `F1-CODE-QUALITY-AUDIT.md` | ~220 | **GREEN** (0 pyright errors, 0 shellcheck, 5 HIGH ruff all minor) |
| **F2 — Security Audit** | `F2-SECURITY-AUDIT.md` | ~280 | **YELLOW** (3 HIGH operator-actionable, MCP supply-chain GREEN) |
| **F3 — SOTA Discovery W290** | `F3-SOTA-DISCOVERY-W290.md` | ~290 | **24 new candidates, Top-8 → W291 audit** |
| **F4 — Convergence Method v4** | `F4-CONVERGENCE-METHOD-V4.md` | ~430 | **SHIP-W295 (defer v4, ship v3.1 in W291)** |
| **MASTER (this file)** | `W290-MASTER.md` | this | Executive synthesis + operator handoff |

Combined output: ~1220 lines of structured findings across F1-F4 + synthesis.

---

## §2 — F1 Code-Quality findings (in plain English)

**The runtime's Python is type-clean.** Pyright default mode on 26 in-tree files (excluding vendored `.local/graphiti`, `.cache/`, `.bun/`, `.cargo/`, `.claude/plugins/*` runtime artefacts):

- 0 errors · 0 warnings
- Pyright strict mode timed out at 300s (full-tree strict scan deferred to W291)

**The runtime's shell is clean.** Shellcheck on 6 in-tree scripts (speckit installer + 1 test fixture):

- 0 findings

**Ruff (`--select ALL`) on the same 26 Python files**:

- 1398 total findings, distribution:
  - 5 HIGH (real bugs) — listed below
  - 32 SECURITY (S-codes excluding S101) — mostly subprocess/urllib audits in tests; 4 worth a small hardening pass
  - 246 MEDIUM type-safety/annotations
  - ~1115 LOW (style/cleanup; dominated by 350 E501 line-length + 106 COM812 trailing-comma)

**Top-5 HIGH findings** (all minor or cosmetic):

| # | File | Line | Rule | Issue |
|---:|---|---:|---|---|
| 1 | `accounts/scripts/weekly_reset_guard.py` | 202 | B007 | unused loop var `util_pct` — latent dead binding |
| 2 | `harness/sota_rubric_lane.py` | 156 | B009 | `getattr(obj, "literal")` should be direct attribute access |
| 3 | `tests/test_gitleaks_pre_commit_gate_security.py` | 137 | F541 | f-string without placeholders (cosmetic) |
| 4 | `tests/test_w130_fire6_git_verb_matches_shell_prefixes.py` | 269 | F541 | f-string without placeholders |
| 5 | `tests/test_w130_fire6_git_verb_matches_shell_prefixes.py` | 275 | F541 | f-string without placeholders |

**Operator-actionable**:
- **5-minute fix**: 5 HIGH findings — single PR with B007/B009 cleanup + 3 F541 unprefixes.
- **30-min hardening pass**: 6 S310 urllib calls (pin `https://` scheme) + 4 S607 partial-executable-path calls (use `shutil.which()`).
- **2-hour cleanup**: optional `ruff format .` pass over the 1115 LOW findings (legacy pre-`ruff` pre-commit-v0.15.12 lines).

Full details: `F1-CODE-QUALITY-AUDIT.md`.

---

## §3 — F2 Security-Audit findings (action-first)

**Verdict**: **YELLOW** — no in-tree secrets today; 4 historical secret-class findings + 3 HIGH CVEs need operator action.

**3 HIGH operator-actionable items**:

| AI | Severity | Finding | Action |
|---:|---|---|---|
| **AI-1** | HIGH | `github-fine-grained-pat` ×2 + `perplexity-api-key` ×2 in commit `52881fde41` (2026-05-16) at `docs/.../desktop-runtime-audit-2026-05-15.md:85` — all `--redact`ed by gitleaks | Verify real-token vs regex-collision; if real, **rotate immediately**. Investigate why pre-commit gitleaks gate bypassed (W255 timing issue likely). |
| **AI-2** | HIGH | `anthropic` SDK 0.86.0 — CVE-2026-34450 (memory tool world-readable `0o666`) + CVE-2026-34452 (async path-traversal) | Upgrade to `anthropic >= 0.87.0` |
| **AI-3** | HIGH | `banks` 2.2.0 — CVE-2026-44209 (jinja2 SSTI in `Prompt()`) | Upgrade to `banks >= 2.4.2` + switch templates to `SandboxedEnvironment` |

**MCP supply-chain**: **GREEN** — 11 active servers, 0 floating pins (all `@<pinned-version>`), 0 literal secrets in `.mcp.json` (uses `${LANGFUSE_*}` interpolation per CR-9 + W268 codex P0-security).

**16,334 gitleaks findings concentrate in ONE historical commit** — 16,206 are `sourcegraph-access-token` false-positives from codex search-URL output in a W259 grand-catalog archive import. Tractable cleanup via `.gitleaksignore`.

**Operator-actionable (this wave)**:
- **AI-1**: secret-rotation check (5 min if regex-collision; 1 hr if real-token rotate)
- **AI-2/AI-3**: `pip install -U anthropic banks` + smoke-test (~10 min)

Full details: `F2-SECURITY-AUDIT.md`.

---

## §4 — F3 SOTA Discovery — what's NEW since W288

**24 NEW candidates across 4 axes**. Operator's "stars not a hardgate" mandate validated: 5-of-top-8 candidates are <500★ or modest-star.

**Top-8 ADD-TO-W291-AUDIT** (re-stated from F3):

| Rank | Repo/Service | Axis | Stars | Tier (prelim) | Uniqueness rationale |
|---:|---|---|---:|---|---|
| 1 | `daytonaio/daytona` | Sandbox | ~14k | T2 VENDOR-FORK | Native `daytona mcp init claude` — strongest CC-pathway of any new sandbox; 90ms spin; AGPL caps INSTALL |
| 2 | `microsoft/PromptWizard` | Prompt-opt | ~2k | T3 PATTERN-STUDY | Measured +12% GSM8k vs DSPy (incumbent) — concrete benchmark deltas |
| 3 | `daymade/claude-code-skills` | Low-star | <500 | T3 PATTERN-STUDY | Meta-skill `skill-creator` + 3-level progressive disclosure + `security_scan.py` gitleaks — operator-mandate flagship |
| 4 | `All-Hands-AI/OpenHands` | Code-agent | ~62k | T2 VENDOR-FORK | 77.6 SWE-bench + ACP-Claude provider + TikTok/VMware/Roche/Amazon production users |
| 5 | `Azure/PyRIT` | Red-team | ~3k | T3 PATTERN-STUDY | Multi-modal red-teaming (extends garak); MS AI Red Team arXiv paper |
| 6 | `rohitg00/awesome-claude-code-toolkit` | Mega-catalog | TBD | T3 PATTERN-STUDY | Apache-2.0 + 135 agents + 35 skills + 42 commands + 100+ contributor aggregation |
| 7 | `levnikolaevich/claude-code-skills` | Low-star | <500 | T3 PATTERN-STUDY | `hashline-edit` MCP — hash-validated atomic file editing (no incumbent has this) |
| 8 | `huggingface/skills` | Non-GH-source | ~3k | T3 PATTERN-STUDY → T1? | Official HF skills; could elevate to INSTALL if HF inference provider integration needed |

**Convergence indicators**:

- **Saturated layer**: LLM-gateway/router — `portkey-ai`, `openrouter`, etc. have only marginal architectural delta vs incumbent `BerriAI/litellm`. **Recommend treating this layer as saturated**; no further probe in W291+.
- **Best axis-gain**: A1 (architecture-layers-missed) — 8 new candidates fill 4 layer-gaps (sandbox-with-native-Claude-MCP, measured-prompt-opt, multi-modal red-teaming, full-fat code-agent).
- **Source-performance**: `mcp__deepwiki__ask_question` ⭐⭐⭐⭐⭐ (best leverage tool without github MCP) · `WebSearch` ⭐⭐⭐⭐ · `gh` CLI ⭐ · pre-packed repomix ⭐ (none of 24 candidates pre-packed — recommend batch-pack before W291).

**Surprising find** (validating low-star mandate): `levnikolaevich/claude-code-skills` `hashline-edit` MCP — hash-validated file editing with no incumbent equivalent. Sources disagreed initially (WebSearch claimed `hex-edit` MCPs; deepwiki proved actual name is `hashline-edit`). Disagreement-resolution worked as v3 designed.

Full details: `F3-SOTA-DISCOVERY-W290.md`.

---

## §5 — F4 sca-v4 Evolution — ship timing

**Ship decision**: **SHIP-W295** (~5 waves out). Don't burn v3's ACTIVE band; ship 3 v3.1 point-revisions in W291 first.

**v3.1 (W291 — ship next wave)**:
- **G4** AGING re-litigation cron — flag verdicts wave 6-11 for re-collection
- **G7** awesome-list deltagrep — find repos cited in awesome-lists but missing from adoption-decisions ledger (closes gap with F3's findings)
- **G10** ledger 4-target → 2-target collapse — graphiti retirement per W272 + hindsight downgrade to best-effort

**v4 (W295 — defer)**:
- **G1** Source-disagreement as first-class composite input (confidence_factor multiplier)
- **G3** Deterministic D12 community_signal_distribution formula
- **G6** Cost-telemetry via langfuse (replaces v3's estimates)
- **G8** Perplexity MCP / sonar API as TIER-1-DIRECT Stage-1 source

**W295+ (deferred)**:
- **G2** Behavioural-equivalence Lane D (candidate-vs-incumbent output similarity)
- **G5** `revision_density` tracking + earlier reverification for high-R verdicts
- **G9** VENDOR-FORK drift-watch automation

**Don't-break invariants (the 10 v3 rules that must survive v4)**: soft-gate ladder · dual composites · 14-dim rubric · tier-specific hard-caps · Bayesian author-prior · typed-evidence · eval-harness · EXCEPT clause · star-only anti-pattern · 5-target ledger.

**Codex GPT-5.5 handoff** (operator can paste to `/codex:adversarial-review` for independent gate on v4 ship-timing):

```
You are GPT-5.5 in adversarial-review mode. Independent cross-model review of
W290-F4-CONVERGENCE-METHOD-V4.md (sca-v3 → sca-v4 evolution proposal).

The v3 rubric shipped W288 (2026-05-18); the F4 proposal recommends SHIP-W295
with 3 v3.1 point-revisions (G4 AGING cron, G7 awesome-list deltagrep, G10
ledger 4-target → 2-target collapse) in W291.

Verify: (1) dual-composite confidence-factor multiplication preserves [1.0, 5.0]
bounds; (2) deterministic D12 formula doesn't conflict with Bayesian author-prior;
(3) ledger 4-target → 2-target collapse doesn't lose audit-rely information;
(4) the W295 ship target is correct vs SHIP-NOW or DEFER-INDEFINITELY given v3's
2-week ACTIVE band; (5) any v4 changes that should downgrade to v3.x point-revisions,
or any v3.x revisions that should escalate to v4.

Return: APPROVE / REQUEST-CHANGES / BLOCK, with file:line cites for each finding.
```

Full details: `F4-CONVERGENCE-METHOD-V4.md`.

---

## §6 — Cross-cutting findings (what no single fork said but emerged in synthesis)

1. **The runtime's own code is cleaner than the architectural docs it produces.** F1 found ~5 trivial bugs in 26 files; F2 found 16k gitleaks findings concentrated in ONE historical archive-import commit. The actual production code passes; the legacy doc imports leak.
2. **Discovery saturation is approaching for the install-tier**, but not for pattern-tier.** F3 found 8 high-priority new candidates, but only 2 plausibly route to T2 VENDOR-FORK or higher (`daytona`, `OpenHands`). The other 6 are PATTERN-STUDY — they teach patterns but don't add primitives. This is consistent with v3's design intent: the system should produce more pattern-extractions than installs as the runtime matures.
3. **The W288 hygiene gap** (untracked stream files) **is symptomatic** — W289-fix1..fix8 referenced files that weren't tracked. Closed this wave via `dd95994`. Future waves should run `git status --short` as part of the wave-open checklist.
4. **F4's SHIP-W295 recommendation aligns with F3's saturation indicator** — premature v4 cutover would compound the false-positive rate. v3 is fresh; let it run.
5. **Operator's "find real bugs" mandate produced a defensible negative**. This is good news; it means the runtime is in production-shape. The next quality-uplift comes from the historical-commit cleanup (AI-1) and the dependency CVE upgrades (AI-2/AI-3).

---

## §7 — Action items (this wave, prioritized)

| AI | Priority | Owner | Effort | Source |
|---|---|---|---|---|
| **AI-1** | HIGH | operator | 5min-1hr | F2 — verify/rotate historical secret commit `52881fde41` |
| **AI-2** | HIGH | operator | 10 min | F2 — `pip install -U anthropic` (CVE-2026-34450/34452) |
| **AI-3** | HIGH | operator | 10 min | F2 — `pip install -U banks` (CVE-2026-44209) + SandboxedEnvironment |
| **AI-4** | MEDIUM | dev | 5 min | F1 — fix 5 HIGH ruff B007/B009/F541 findings |
| **AI-5** | MEDIUM | dev | 30 min | F1 — S310/S607 hardening pass on `accounts/scripts/` + `tools/process_hygiene_audit.py` |
| **AI-6** | MEDIUM | dev | 2 hr | F1 — root-cause why pre-commit gitleaks gate didn't catch commit `52881fde41` |
| **AI-7** | LOW | dev | 2 hr | F1 — optional `ruff format .` pass over 1115 LOW findings (defer to slack day) |
| **AI-8** | INFO | dev | n/a | F3 — Top-8 candidates queued for W291 typed-evidence + score (sca-v3 pipeline) |
| **AI-9** | INFO | dev | n/a | F4 — v3.1 point-revisions (G4+G7+G10) queued for W291; v4 deferred to W295 |
| **AI-10** | INFO | dev | n/a | F3 — batch-pack Top-8 candidates via `git clone --depth 1 + repomix <local>` before W291 (per W286 Win v1.14.0 workaround) |

---

## §8 — Cardinal-rule conformance

- **CR-1** trusted primitives only: no installs this wave — pure audit. ✓
- **CR-2** no self-invent hooks/scripts: F1 used pyright/ruff/shellcheck/mypy from official sources; F2 used gitleaks/pip-audit/npm audit. ✓
- **CR-3** subagents = documented Agent forks (4 of them, all `general-purpose`). ✓
- **CR-4** behavior in CLAUDE.md + settings.json: no rules/ added; W290 status line will be added to CLAUDE.md. ✓
- **CR-5** safety via permissions/sandbox: gitleaks `.gitleaksignore` is the right path for the 16,206 false-positives. ✓

---

## §9 — Ledger writes (this wave)

Pending: a single commit closes W290 with:
- 5 fork-output files in `docs/architecture/W290-QUALITY-AND-SOTA-WAVE/`
- This MASTER file
- VERDICT-LEDGER delta (separate file): 0 new INSTALL/VENDOR-FORK verdicts (all 24 F3 candidates need typed-evidence collection in W291 first); 1 NEGATIVE FINDING verdict (code-quality audit returned clean — recorded for AGING/STALE tracking)
- CLAUDE.md status update: add W290 ship line

No graphiti/basic-memory ledger writes this wave (no new verdicts; only audit findings + discovery candidates queued for W291).

---

## §10 — Bottom line

W290 was an architecture-quality + next-wave SOTA discovery sweep. **The runtime passes the quality bar v3 demands** (F1 clean, F2 actionable-not-blocker, MCP supply-chain GREEN). **The next wave (W291) has a clear backlog**: 3 v3.1 point-revisions (G4+G7+G10), 8 Top-priority candidates to typed-evidence-collect (F3), and 3 operator-action security items (AI-1/2/3). **v4 is real but deferred** to W295 — premature v4 cutover would compound false-positives during v3's ACTIVE band.

Operator handoff: review §7 action-items table, decide which AI-1/2/3 to action before next session; the rest are auto-queued for W291.
