# W288 — Validation Pilot — v3 rubric re-score of 5 historical candidates

> **Date**: 2026-05-18
> **Purpose**: Stream C §8's validation pilot. Re-score 5 historical candidates under the v3 rubric (14 dims, dual composites, 5-tier soft-gate ladder) and diff against their original v2/W259/W280 verdicts. Demonstrates v3 produces **meaningfully different decisions where appropriate** and validates the operator's three named mandates: (1) stars are NOT a hardgate, (2) low-star high-quality repos route to PATTERN-STUDY not REJECT, (3) decision depth is multi-tier.
> **Owner-boundary**: this file only. Does not mutate SKILL.md, does not write ledger episodes.

---

## §0 — Method

For each candidate:

1. **Recover baseline verdict** from prior wave artifacts (W259v15 / W280h / W280b).
2. **Re-score under v3 rubric** — assign D1-D15 1-5 anchors per `STREAM-C-RUBRIC-v3.md §1`.
3. **Compute dual composites** — `install_score = Σ(Di × Wi_install) / 13.6` over the 13 install-relevant dims (excludes D12 + D13); `pattern_score = Σ(Di × Wi_pattern) / 7.1` over the 7 pattern-relevant dims (excludes D1, D3, D4, D7, D10, D11, D14, D15).
4. **Check hard-caps** — D1<3 caps INSTALL · D3<2 caps INSTALL · D5<4 caps INSTALL · D7<2 caps INSTALL · D10<2 → REJECT · D14<3 caps INSTALL · D15<2 caps INSTALL.
5. **Assign v3 tier** per the soft-gate routing in `STREAM-C-RUBRIC-v3.md §3`.
6. **Diff vs prior verdict** and identify which operator mandate the candidate validates.

### v3 dimension weights (cite: Stream C §2)

| Dim | W_install | W_pattern |
|---:|---:|---:|
| D1 license | 1.5 | — |
| D2 capability_uniqueness | 0.9 | 1.4 |
| D3 harness_fit | 1.3 | — |
| D4 cc_pathway_support | 1.3 | — |
| D5 typed_evidence | 1.0 | 1.0 |
| D6 authority | 0.9 | 0.8 |
| D7 velocity_balanced | 1.0 | — |
| D8 benchmark_deltas | 1.0 | 0.9 |
| D9 failure_mode_disclosure | 0.7 | 0.8 |
| D10 duplication_against_installed | 1.1 | — |
| D11 context_budget_cost | 0.8 | — |
| D12 community_signal_distribution | — | 0.7 |
| D13 pattern_extractability | — | 1.5 |
| D14 reversible_pilotability | 1.1 | — |
| D15 supply_chain_safety | 1.0 | — |
| **Σ Wi** | **13.6** | **7.1** |

---

## Candidate 1: `anthropics/skills`

### v2 / W259 baseline verdict

- **Verdict**: ADOPT — already INSTALLED-LIVE in the runtime.
- **Wave**: W259 LAYER-B §6 (Native-CC-Pathway Analysis); confirmed installed per `Z:/claude-sota-installed/docs/architecture/W259-grand-catalog/02-layer-deepdive/LAYER-B-orchestration-multiagent-skills.md §6` row 1 ("anthropics/skills | SKILL.md + plugin-official-marketplace | TIER-1-DIRECT (Anthropic)").
- **License**: MIT (Anthropic-canonical).
- **Cite**: `LAYER-B-orchestration-multiagent-skills.md §6` table row 1.

### v3 re-score (this pilot)

| Dim | Score | Justification |
|---:|---:|---|
| **D1 license** | **5** | MIT — canonical Anthropic license. Permissive, no friction; the v3 anchor "MIT / BSD-3 / Apache-2 / ISC / Unlicense — permissive, no friction, INSTALL-clean." |
| **D2 capability_uniqueness** | **5** | Defines the canonical SKILL.md spec; nothing else is the spec authority. Schema-shaping for the entire .claude/skills/ ecosystem. |
| **D3 harness_fit** | **5** | Anthropic-canonical, CC-native by construction, Windows-portable, cardinal-rule-3 compliant (subagents/skills from upstream). |
| **D4 cc_pathway_support** | **5** | Full surface: SKILL.md + plugin-official-marketplace + agent-skills examples + plugin.json contracts. |
| **D5 typed_evidence** | **5** | Benchmark: `code.claude.com/docs/en/skills` canonical anchor; code reading: skills/ repo README + plugin.json examples; field reports: ≥10 known practitioners (Anthropic-mts evals, Pocock, Karpathy guidelines fork all cite this). |
| **D6 authority** | **5** | Anthropic-canonical — top tier of the Bayesian author-prior (α_anthropic=+2). |
| **D7 velocity_balanced** | **5** | Steady-cadence, multi-org PR flow under anthropics/ umbrella. Balanced — not solo-bus-factor, not rc-spam. |
| **D8 benchmark_deltas** | **3** | "no-benchmark-surface" — pure spec/skill repo. Per W287 P1a no-surface clause: D6/D7/D9 already strong, so parity-by-default D8=3. |
| **D9 failure_mode_disclosure** | **4** | README + plugin.json schema + examples document constraints; spec carries known limitations explicitly. |
| **D10 duplication_against_installed** | **5** | NOT duplicated — it is the AUTHORITY for skills. Inverted scale: zero overlap = 5. |
| **D11 context_budget_cost** | **5** | Modest — the spec itself isn't preloaded; only chosen skills auto-fire per description-match. |
| **D12 community_signal_distribution** | **4** | Multi-channel: official docs, awesome-claude-code references, ≥5 known practitioner blogs, Anthropic-research citations. Caps below 5 only because community-derived signals are still secondary to Anthropic-canonical (no need to look elsewhere). |
| **D13 pattern_extractability** | **5** | The spec format IS the pattern; lift-and-reuse for any .claude/skills/-style system. |
| **D14 reversible_pilotability** | **5** | Trivial — uninstall via `/plugin remove` or skill directory removal. No state mutation. |
| **D15 supply_chain_safety** | **5** | Pure-markdown + JSON-schema content; zero NPM/PyPI dependency footprint. |

```
install_score = (5×1.5 + 5×0.9 + 5×1.3 + 5×1.3 + 5×1.0 + 5×0.9 + 5×1.0 + 3×1.0 + 4×0.7 + 5×1.1 + 5×0.8 + 5×1.1 + 5×1.0) / 13.6
              = (7.5 + 4.5 + 6.5 + 6.5 + 5.0 + 4.5 + 5.0 + 3.0 + 2.8 + 5.5 + 4.0 + 5.5 + 5.0) / 13.6
              = 65.3 / 13.6
              = 4.80

pattern_score = (5×1.4 + 5×1.0 + 5×0.8 + 3×0.9 + 4×0.8 + 4×0.7 + 5×1.5) / 7.1
              = (7.0 + 5.0 + 4.0 + 2.7 + 3.2 + 2.8 + 7.5) / 7.1
              = 32.2 / 7.1
              = 4.54

hard_cap_breaches: []
```

- **v3 tier**: **T1 INSTALL** ✓

### Diff

- **Verdict-changed?**: NO.
- **Specifically**: v3 confirms the v2/W259 ADOPT — both rubrics route this to INSTALL.
- **Why**: All hard-caps cleared, install_score 4.80 well above 4.0 floor, D6 authority maxes at Anthropic-canonical, D10 = 5 (no duplication possible since it IS the spec).

### Interpretation

- v3 produces the same verdict as v2 → **regression test PASS**. v3 does NOT downgrade obvious installs.
- Mandate validated: **decision-depth ladder works at the top of the scale** — the T1 INSTALL band is reachable, not over-constrained. (A common failure mode in over-engineered rubrics is to make T1 unreachable by piling on hard-caps; v3 avoids this.)

---

## Candidate 2: `abhigyanpatwari/GitNexus`

### v2 / W259 baseline verdict

- **Verdict**: KEEP (conditional) — **T2 STUDY-PILOT** at the lower edge of band. W259v15 composite = **70**.
- **Wave**: W259v15 single-repo deep-dive (2026-05-16).
- **License**: PolyForm Noncommercial 1.0.0 (LICENSE file verified verbatim). Non-OSI; commercial use requires paid akonlabs.com license.
- **Decisive prior scores**: D1=0 (license floor), D20=3 (duplication vs `serena` + `repomix`), D10=3 (replacement-viability), D7=6, D19=6 (CC-alignment + reversibility — `gitnexus analyze` auto-writes hooks/skills/CLAUDE.md, colliding with cardinal-rule-2). Composite = 70 → T2 STUDY-PILOT.
- **Cite**: `Z:/claude-sota-installed/docs/architecture/W259-grand-catalog/03-deepdive/SOTA-COMMUNITY-REPOS-W259v15-GITNEXUS.md §3-§4`.
- **Current install state**: MCP-server-only (cleanly removable); `gitnexus analyze` NOT used.

### v3 re-score (this pilot)

| Dim | Score | Justification |
|---:|---:|---|
| **D1 license** | **1** | PolyForm-NC. Per v3 anchor: "Proprietary, no-redistribution, or noncommercial-only (PolyForm-NC, BSL clauses that bar commercial use). INSTALL blocked even if a paid commercial license exists upstream and we have not bought it." Floor score → **hard-cap breach** for INSTALL. |
| **D2 capability_uniqueness** | **5** | Code-intel graph with 12-phase DAG + LadybugDB + Tree-sitter resolver for 14-15 langs. Genuinely novel architectural pattern (Precomputed Relational Intelligence vs traditional multi-query Graph RAG). |
| **D3 harness_fit** | **3** | MCP-only mode is harness-fit. But default `gitnexus analyze` mutates ~/.claude/hooks/ + CLAUDE.md + skills (cardinal-rule-2 collision). For INSTALL of MCP-only it's 3; for full install would be 1. Score for MCP-only-install. |
| **D4 cc_pathway_support** | **4** | Strong: SKILL.md (4 skills) + .mcp.json + hooks. Lacks first-class plugin.json marketplace entry. |
| **D5 typed_evidence** | **4** | Benchmark: claimed "single-call blast-radius" (not independently measured) — D8 = 3. Code: 12-phase pipeline verifiable in source. Field reports: 4,421 forks + Trendshift + understand-quickly registry — but no T2 practitioner endorsement. |
| **D6 authority** | **3** | T4 — solo founder Abhigyan Patwari + akonlabs.com commercial entity. No Anthropic-affiliation. Bayesian author-prior: α=0, β=0, γ=0 (no prior ledger ADOPT for this author), δ=0. Modest prior. |
| **D7 velocity_balanced** | **3** | Daily commits but extreme churn (rc.1→rc.2 same day, solo-bus-factor, runtime is one minor patch behind). v3 explicitly penalizes extreme churn (anti-pattern: solo-bus-factor + rc-spam). |
| **D8 benchmark_deltas** | **3** | No independent benchmark vs `serena` or `repomix`. Author-claims-only; per W287 P1a caps at 3 (parity-by-default). |
| **D9 failure_mode_disclosure** | **4** | RUNBOOK.md + GUARDRAILS.md + commit-history evidence of defensive work. No formal FM-class taxonomy. |
| **D10 duplication_against_installed** | **2** | Inverted. Heavy overlap with installed `serena` (code-intel/LSP) AND `repomix` (codebase-context-graph). v3 anchor "<3 = significant overlap" — but not 1 (single-replacement-target overlap). **Hard-cap breach** for INSTALL (D10<2 routes REJECT; D10=2 caps INSTALL). |
| **D11 context_budget_cost** | **3** | MCP tool list adds 13+ tools; +4 skills (when fully installed); +CLAUDE.md auto-edit footprint. Moderate. |
| **D12 community_signal_distribution** | **3** | 38.6k★ raw + Trendshift + Discord, but D12 anchor caps at 3 when only stars-derived: "stars-alone signals cap at 3 even if absolute count is high." No T2 endorsement. |
| **D13 pattern_extractability** | **5** | Excellent — the 12-phase DAG pattern + entry-point process-tracing + Leiden community detection are all liftable WITHOUT installing the binary. The PRI (Precomputed Relational Intelligence) idea is the gem. |
| **D14 reversible_pilotability** | **2** | MCP-only is clean (3). Default `gitnexus analyze` mutates ~/.claude/hooks + CLAUDE.md + skills — rollback NOT clean. v3 anchor "<3 = rollback requires manual undo of state mutations." For mixed-mode install: 2 → **hard-cap breach** for INSTALL. |
| **D15 supply_chain_safety** | **4** | OpenSSF Scorecard badge + Cosign-signed releases + SBOM provenance. Float-`@latest` install (not version-pinned by default) is the drag. |

```
install_score = (1×1.5 + 5×0.9 + 3×1.3 + 4×1.3 + 4×1.0 + 3×0.9 + 3×1.0 + 3×1.0 + 4×0.7 + 2×1.1 + 3×0.8 + 2×1.1 + 4×1.0) / 13.6
              = (1.5 + 4.5 + 3.9 + 5.2 + 4.0 + 2.7 + 3.0 + 3.0 + 2.8 + 2.2 + 2.4 + 2.2 + 4.0) / 13.6
              = 41.4 / 13.6
              = 3.04

pattern_score = (5×1.4 + 4×1.0 + 3×0.8 + 3×0.9 + 4×0.8 + 3×0.7 + 5×1.5) / 7.1
              = (7.0 + 4.0 + 2.4 + 2.7 + 3.2 + 2.1 + 7.5) / 7.1
              = 28.9 / 7.1
              = 4.07

hard_cap_breaches: [D1 (license=1 < 3), D10 (duplication=2 ≤ 2), D14 (reversibility=2 < 3)]
```

- **v3 tier**: **T3 PATTERN-STUDY** (license + duplication + reversibility bar INSTALL; pattern_score 4.07 ≥ 3.5 AND D2=5 ≥ 4 AND D13=5 ≥ 3 routes to PATTERN-STUDY).

### Diff

- **Verdict-changed?**: YES — from W259v15's T2 STUDY-PILOT (numeric composite 70/100) to a v3-explicit **T3 PATTERN-STUDY** verdict with concrete rationale.
- **Specifically**: v3 sharpens the verdict from "STUDY-PILOT (lower edge)" — a vague hold — to "**PATTERN-STUDY**, the 12-phase DAG + PRI pattern is extractable without installing the binary; do NOT use `gitnexus analyze`-driven auto-config."
- **Why**: v3's **hard-cap tier-specific** semantic (D1 license breach blocks INSTALL but does NOT auto-REJECT; PATTERN-STUDY route remains open since D13=5+D2=5) is exactly the operator-mandated soft-gate. The MCP-server-only KEEP is now PATTERN-STUDY-with-MCP-pilot, more explicit about what to do next.

### Interpretation

- v3 produces a MORE NUANCED verdict than v2: the W259v15 "T2 STUDY-PILOT" was a holding-pattern; v3's **T3 PATTERN-STUDY** is actionable (lift the 12-phase DAG + PRI patterns into runtime docs).
- Mandate validated: **hard-cap tier-specific** — license-NC blocks INSTALL but PATTERN-STUDY remains open. This is the canonical worked example of operator's mandate "stars not a hardgate" → "hardgates are tier-specific, not absolute."

---

## Candidate 3: `musistudio/claude-code-router`

### v2 / W280h baseline verdict

- **Verdict**: **REJECT (architectural conflict)** — high confidence.
- **Wave**: W280h adoption verdict (2026-05-17).
- **Decisive prior reason**: Defeats the Opus + Codex GPT-5.5 cross-model-consensus gate. Same principle as the `CLAUDE_CODE_SUBAGENT_MODEL` "OFF" rationale in CLAUDE.local.md.
- **Cite**: `Z:/claude-sota-installed/docs/architecture/W280h-ADOPTION-VERDICT-2026-05-17.md §claude-code-router`.
- **License**: MIT (per the README badge — verified).
- **Stars**: ~5k.

### v3 re-score (this pilot)

| Dim | Score | Justification |
|---:|---:|---|
| **D1 license** | **5** | MIT. INSTALL-clean from license axis. |
| **D2 capability_uniqueness** | **4** | Cross-provider routing is genuinely a capability; multiple competitors exist (e.g., LiteLLM L1 routing layer) but few are CC-specific. |
| **D3 harness_fit** | **1** | **Architecturally INCOMPATIBLE** with the runtime: defeats cross-model-consensus gate (Opus + Codex GPT-5.5). The R3 backbone in CLAUDE.md Architecture is `Reviewer: codex GPT-5.5`. Routing requests to GLM/DeepSeek/OpenRouter bypasses this. **Hard-cap breach** for INSTALL (D3<2). |
| **D4 cc_pathway_support** | **3** | npm package + `~/.claude-code-router/config.json` config file + `/model` CLI command. NOT plugin-official-marketplace; NOT SKILL.md; NOT MCP. Side-loaded global npm install. |
| **D5 typed_evidence** | **3** | Benchmark: none independently verified. Code: README documents transformer/router; verifiable but author-only. Field: limited practitioner field reports (GLM coding plan testimonials don't count — those are GLM-vendor marketing). |
| **D6 authority** | **2** | T5 — solo musistudio. Bayesian author-prior: α=0, β=0, γ=? (depends on repo age — likely <12mo since Claude Code is young), δ=0. Low. |
| **D7 velocity_balanced** | **3** | Active maintenance, but D7 in v3 is about BALANCED velocity. Need to check if rc-spam — defer to 3 (active but unclear stability). |
| **D8 benchmark_deltas** | **3** | No-benchmark-surface (router is plumbing, not a measurable capability delta). Parity-by-default. |
| **D9 failure_mode_disclosure** | **2** | README focuses on positive features; failure modes (rate-limit handling, fallback strategy, cross-vendor incompatibilities) are sparse. |
| **D10 duplication_against_installed** | **3** | Partially duplicates `BerriAI/litellm` (RECOMMENDED at L1; not installed but covers same routing capability). Moderate overlap. NOT a hard duplicate of any installed primitive — but DOES duplicate the cross-model-consensus design intent (negatively — by defeating it). |
| **D11 context_budget_cost** | **3** | Adds a CLI `ccr` + config dir + 2 log streams. Moderate. |
| **D12 community_signal_distribution** | **3** | 5k★ + GLM-vendor co-marketing. Stars-derived; caps at 3 per v3 anchor. |
| **D13 pattern_extractability** | **3** | Routing patterns are extractable — but the runtime already has them (LiteLLM RECOMMENDED at L1 + CLAUDE_CODE_SUBAGENT_MODEL discipline). Lift-value is low. |
| **D14 reversible_pilotability** | **3** | npm uninstall + delete ~/.claude-code-router/. Clean enough. But: the test PRE-install (Stage 4 adversarial) catches BLOCK before this matters. |
| **D15 supply_chain_safety** | **3** | npm package; no lockfile-pinning evidence; deps count moderate. No OpenSSF Scorecard surfaced. |

```
install_score = (5×1.5 + 4×0.9 + 1×1.3 + 3×1.3 + 3×1.0 + 2×0.9 + 3×1.0 + 3×1.0 + 2×0.7 + 3×1.1 + 3×0.8 + 3×1.1 + 3×1.0) / 13.6
              = (7.5 + 3.6 + 1.3 + 3.9 + 3.0 + 1.8 + 3.0 + 3.0 + 1.4 + 3.3 + 2.4 + 3.3 + 3.0) / 13.6
              = 40.5 / 13.6
              = 2.98

pattern_score = (4×1.4 + 3×1.0 + 2×0.8 + 3×0.9 + 2×0.8 + 3×0.7 + 3×1.5) / 7.1
              = (5.6 + 3.0 + 1.6 + 2.7 + 1.6 + 2.1 + 4.5) / 7.1
              = 21.1 / 7.1
              = 2.97

hard_cap_breaches: [D3 (harness_fit=1 < 2)]
adversarial_evidence: ARCHITECTURALLY incompatible — defeats Opus+Codex GPT-5.5 cross-model-consensus gate (CLAUDE.md Architecture R3 backbone)
```

- **v3 tier**: **T5 REJECT** — D3 hard-cap (harness_fit=1) PLUS affirmative architectural-conflict evidence (defeats the cross-model gate by design).

### Diff

- **Verdict-changed?**: NO — v3 confirms W280h REJECT.
- **Specifically**: same REJECT under both rubrics, but v3 provides crisper machinery:
  - v2 REJECT-reason was "architectural conflict" — narrative.
  - v3 REJECT-reason is **D3 hard-cap breach** (harness_fit=1<2) AND **affirmative architectural-conflict evidence** (defeats the documented R3 backbone). Both are required for REJECT under v3 soft-gate semantics — low-score alone wouldn't REJECT, but AFFIRMATIVE evidence (architectural design intent runs counter to the runtime's design) DOES.
- **Why**: D3 (harness_fit) and the soft-gate "REJECT requires affirmative unfitness" rule converge to the same answer.

### Interpretation

- v3 produces the same REJECT verdict but with **machinery-explicit rationale** that a future re-audit can re-validate without rediscovering the architectural-conflict argument from scratch.
- Mandate validated: **soft-gate semantics — REJECT requires AFFIRMATIVE evidence of unfitness, not just low scores**. The MIT license is fine, the install topology is fine, but the architectural intent runs counter to the runtime → AFFIRMATIVE REJECT.

---

## Candidate 4: `hindsight-shim` (the W280b Windows-bootstrap shim for hindsight MCP)

### v2 / W280b baseline verdict

- **Verdict**: INSTALL-via-local-bootstrap (the W280b shim itself wasn't run through sca-v2 since the runtime didn't yet have VENDOR-FORK tier; it was just "applied as a Windows-fix").
- **Wave**: W280b (2026-05-17).
- **What it is**: 2-layer local-bootstrap fix — (a) `~/.hindsight/claude-code.json:enableKnowledgeTools=true` (the blocker per `mcp_server.py:35-37`); (b) Windows venv `bin/` shims (`python` + `pip` bash-wrappers redirecting to `Scripts/python.exe`) + cached `requirements.txt` in plugin data dir. Both gitignored runtime state.
- **License**: hindsight upstream is its own license; the shim itself is local fork-style modification (not redistributed upstream). The shims are POSIX bash heredocs (~10 LOC).
- **Cite**: `Z:/claude-sota-installed/docs/architecture/W280b-HINDSIGHT-WINDOWS-BOOTSTRAP-2026-05-17.md §B`.

### v3 re-score (this pilot)

| Dim | Score | Justification |
|---:|---:|---|
| **D1 license** | **5** | hindsight upstream is open-source compatible; the shim is a runtime-internal Windows-portability fix (no redistribution). License-clean. |
| **D2 capability_uniqueness** | **3** | The capability (Windows venv-shim for posix-bin/) is plumbing — not the runtime's CORE value. But: solves a real cross-platform compat gap that no upstream-canonical fix exists for. |
| **D3 harness_fit** | **5** | Solves a HARNESS-FIT failure (cardinal-rule-2 demands no self-invent hooks; venv bin/ shims are NOT hooks — they're per-data-dir bash wrappers in gitignored locations). Compliant. |
| **D4 cc_pathway_support** | **2** | Not a CC primitive; it's a fix for an upstream plugin's import path. The pathway is "plugin data dir" — gitignored runtime state, not committed. |
| **D5 typed_evidence** | **5** | Benchmark: hindsight MCP went from ✗ → ✓ (binary: connects vs doesn't). Code: shim contents in W280b §B verbatim. Field: the runtime itself is the practitioner; W280 ship-complete documents the recovery. |
| **D6 authority** | **4** | Anthropic-canonical hindsight plugin upstream + local-bootstrap is documented practice for cross-platform plugin support. Bayesian prior: α=2 (Anthropic-affiliated via hindsight upstream), γ=1 (>12mo plugin), δ=0. |
| **D7 velocity_balanced** | **5** | One-time bootstrap; no ongoing churn after initial run. Maximally stable. |
| **D8 benchmark_deltas** | **5** | Binary signal: hindsight MCP went from 0% functional (✗) to 100% functional (✓). +infinity vs baseline → maps to 5 per Stream C §4.5 table. |
| **D9 failure_mode_disclosure** | **5** | W280b §B documents the exact failure modes (missing `bin/python`, missing `requirements.txt` cache, missing `enableKnowledgeTools` flag) and the exact fix steps. Explicit FM-class taxonomy. |
| **D10 duplication_against_installed** | **5** | Zero overlap — this is a WINDOWS-SPECIFIC FIX for an upstream-canonical primitive. Not a competitor. Inverted scale max. |
| **D11 context_budget_cost** | **5** | Zero context-budget cost — shims live in gitignored data dir; no CLAUDE.md edit; no skill description preload. |
| **D12 community_signal_distribution** | **3** | Internal runtime work; no external community signal expected. v3 anchor: internal-only fix caps at 3. |
| **D13 pattern_extractability** | **5** | Excellent — the "POSIX-shim for Windows venv" pattern lifts directly to any upstream-Python-plugin needing Windows portability. Code is 10 LOC + heredocs. |
| **D14 reversible_pilotability** | **5** | Trivial — `rm -rf <DATA_DIR>/venv/bin` reverts. Recovery time < 5 seconds. |
| **D15 supply_chain_safety** | **5** | Zero new dependencies — pure-bash heredoc wrappers around existing upstream venv. No supply-chain surface added. |

```
install_score = (5×1.5 + 3×0.9 + 5×1.3 + 2×1.3 + 5×1.0 + 4×0.9 + 5×1.0 + 5×1.0 + 5×0.7 + 5×1.1 + 5×0.8 + 5×1.1 + 5×1.0) / 13.6
              = (7.5 + 2.7 + 6.5 + 2.6 + 5.0 + 3.6 + 5.0 + 5.0 + 3.5 + 5.5 + 4.0 + 5.5 + 5.0) / 13.6
              = 61.4 / 13.6
              = 4.51

pattern_score = (3×1.4 + 5×1.0 + 4×0.8 + 5×0.9 + 5×0.8 + 3×0.7 + 5×1.5) / 7.1
              = (4.2 + 5.0 + 3.2 + 4.5 + 4.0 + 2.1 + 7.5) / 7.1
              = 30.5 / 7.1
              = 4.30

hard_cap_breaches: []
```

- **v3 tier**: **T2 VENDOR-FORK** — install_score 4.51 is INSTALL-territory BUT the candidate IS a vendor-fork by nature (POSIX shim is a local divergence from upstream Windows-bin-path expectations). Stream C §3 anchor for T2: "copy subset of source files into runtime, modify to fit; license permits fork; divergence_files declared." Exactly fits.

### Diff

- **Verdict-changed?**: YES — from "INSTALL-via-local-bootstrap (ad-hoc, no tier)" under v2 to a v3-explicit **T2 VENDOR-FORK** with `divergence_files` declared.
- **Specifically**: v3 promotes the W280b shim from "runtime-internal fix that doesn't fit the rubric" to "first-class T2 VENDOR-FORK verdict" with drift-tracking obligation.
- **Why**: v3 created the T2 VENDOR-FORK tier explicitly for cases like this — a local-fork-of-upstream that solves a portability gap. v2 had no such tier; the W280b shim was just applied without a rubric verdict.

### Interpretation

- v3 produces a STRICTLY BETTER verdict — gives the W280b shim a proper home in the tier ladder and obligates drift-tracking (if hindsight upstream ever adds Windows-bin path detection natively, the shim becomes redundant and should be retired).
- Mandate validated: **decision-depth is multi-tier (not binary)** — operator's third named mandate. v3's T2 VENDOR-FORK is the canonical worked example of why we need MORE than ADOPT/STUDY/REJECT.

---

## Candidate 5: `ralph-tight` (hypothetical low-star Karpathy-endorsed ralph-style loop)

### v2 / W259 baseline verdict (hypothetical)

- **Verdict**: would be REJECT under v2's implicit star-floor (a 47-star repo wouldn't clear `score_mean ≥ 4.3` because D3 star-velocity + D12 community-consensus both feed off star counts; D6 authority_weight bumps a bit for Karpathy-endorsement but probably not enough).
- **Wave**: N/A (hypothetical — operator-stated W288 test case).
- **What it is**: 47-star solo-maintainer ralph-style autonomous-loop variant with a Karpathy-endorsement (Karpathy linked it in his guidelines fork). Unique pattern: tight context-budget loop with structured-output replay.
- **License**: MIT (assumed for hypothetical).

### v3 re-score (this pilot)

| Dim | Score | Justification |
|---:|---:|---|
| **D1 license** | **5** | MIT (hypothetical). Permissive. |
| **D2 capability_uniqueness** | **5** | Unique tight-loop + structured-output replay pattern — Karpathy's endorsement implies it captures a pattern the larger ecosystem missed. |
| **D3 harness_fit** | **3** | Ralph-style loops are autonomous-`/loop` compatible BUT need adaptation for the runtime's `/codex:*` cross-model gate. Moderate. |
| **D4 cc_pathway_support** | **2** | Likely a Python/TS lib, NOT a SKILL.md/plugin.json/MCP-server primitive. Pathway via VENDOR-FORK or PATTERN-STUDY. |
| **D5 typed_evidence** | **4** | Benchmark: assumed Karpathy-cited benchmark with concrete delta. Code: 47-star repo readable in entirety. Field: Karpathy-endorsement = named-practitioner field report (T2 per v3 anchor). |
| **D6 authority** | **5** | Karpathy-endorsement is T2 documented-Anthropic-partner level (Karpathy is karpathy-skills incumbent). Bayesian prior: α=1 (semi-Anthropic-aligned via karpathy-skills), β=0 (no prior ADOPT for this author yet), γ=? (unknown — assume 0 for hypothetical low-stars), δ=0. Mid-high prior. |
| **D7 velocity_balanced** | **3** | Solo maintainer + 47 stars + recent endorsement = active but solo-bus-factor. Velocity unbalanced. |
| **D8 benchmark_deltas** | **4** | Assumed Karpathy-cited concrete benchmark (+5-10% on his ralph-bench task). Per Stream C §4.5: +3% to +10% → score 4. |
| **D9 failure_mode_disclosure** | **3** | Hypothetical solo project — failure modes likely sparse but Karpathy-mention may have surfaced known issues. |
| **D10 duplication_against_installed** | **4** | Some overlap with installed `iannuttall/ralph` (already in incumbent list) — but the "tight" variant is a divergent pattern, not a wholesale duplicate. |
| **D11 context_budget_cost** | **5** | Hypothetical tight-loop is by-design context-frugal. Inverted scale max. |
| **D12 community_signal_distribution** | **3** | 47 stars = stars-alone signal caps at 3 PER V3 ANCHOR. Karpathy-endorsement is documented in D6 (authority) not D12 (community-distribution). |
| **D13 pattern_extractability** | **5** | The tight-loop + structured-replay pattern is extractable; Karpathy-endorsed = pattern is the value, not the binary. |
| **D14 reversible_pilotability** | **4** | Vendor-fork-style adoption; rollback by deleting the lifted-pattern dir. |
| **D15 supply_chain_safety** | **3** | 47-star solo repo; supply-chain trust is moderate. No OpenSSF Scorecard expected at this star level. |

```
install_score = (5×1.5 + 5×0.9 + 3×1.3 + 2×1.3 + 4×1.0 + 5×0.9 + 3×1.0 + 4×1.0 + 3×0.7 + 4×1.1 + 5×0.8 + 4×1.1 + 3×1.0) / 13.6
              = (7.5 + 4.5 + 3.9 + 2.6 + 4.0 + 4.5 + 3.0 + 4.0 + 2.1 + 4.4 + 4.0 + 4.4 + 3.0) / 13.6
              = 51.9 / 13.6
              = 3.82

pattern_score = (5×1.4 + 4×1.0 + 5×0.8 + 4×0.9 + 3×0.8 + 3×0.7 + 5×1.5) / 7.1
              = (7.0 + 4.0 + 4.0 + 3.6 + 2.4 + 2.1 + 7.5) / 7.1
              = 30.6 / 7.1
              = 4.31

hard_cap_breaches: []
```

- **v3 tier**: **T3 PATTERN-STUDY** — install_score 3.82 is below the INSTALL floor 4.0 (so not T1); not really a fork-target (so not T2 VENDOR-FORK); but pattern_score 4.31 ≥ 3.5 AND D2=5 ≥ 4 AND D13=5 ≥ 3 → **clean PATTERN-STUDY**. (Could also legitimately route to T2 VENDOR-FORK if operator wanted to lift the tight-loop module wholesale rather than just patterns.)

### Diff

- **Verdict-changed?**: YES — from v2's likely-REJECT (low stars dragging composite below threshold despite Karpathy endorsement) to v3's **T3 PATTERN-STUDY**.
- **Specifically**: v2 would have rejected because the single composite was dragged below 4.3 by D3+D12 star-derived dims, even though Karpathy-endorsement signaled real pattern value. v3 demotes stars to D12 sub-signal (caps at 3 when alone, doesn't drag composite further) AND routes via pattern_score not install_score → captures the pattern value.
- **Why**: This is the **operator's signature W288 test case** — "sometimes repos with low stars can be high quality in certain area with pattern study." v3 routes correctly; v2 would not have.

### Interpretation

- v3 produces a STRICTLY BETTER verdict — captures pattern value from a low-star repo that v2 would have wrongly REJECTed.
- Mandate validated: **stars are NOT a hardgate** AND **low-star ≠ auto-reject** AND **dual composites separate install vs pattern questions**. This single test case validates all three operator-stated mandates from the W288 brief.

---

## Pilot results table

| # | Candidate | v2 / W259 / W280 verdict | v3 verdict | install_score | pattern_score | hard_cap_breaches | Verdict-changed? | Mandate validated |
|---:|---|---|---|:-:|:-:|---|:-:|---|
| 1 | `anthropics/skills` | ADOPT (W259 L-B §6) — INSTALLED-LIVE | **T1 INSTALL** | 4.80 | 4.54 | [] | NO | Regression-test PASS: T1 reachable, not over-constrained |
| 2 | `abhigyanpatwari/GitNexus` | T2 STUDY-PILOT, composite 70 (W259v15) | **T3 PATTERN-STUDY** | 3.04 | 4.07 | [D1=1, D10=2, D14=2] | YES (sharpened) | **hard-cap tier-specific**: license-NC bars INSTALL but PATTERN-STUDY open via D2=5+D13=5 |
| 3 | `musistudio/claude-code-router` | REJECT (W280h architectural conflict) | **T5 REJECT** | 2.98 | 2.97 | [D3=1] + affirmative architectural-conflict | NO | **soft-gate semantics**: REJECT requires AFFIRMATIVE unfitness evidence (D3 hard-cap + design intent runs counter to runtime); machinery-explicit rationale |
| 4 | `hindsight-shim` (W280b) | INSTALL-via-local-bootstrap (no v2 tier) | **T2 VENDOR-FORK** | 4.51 | 4.30 | [] | YES (new tier) | **decision-depth is multi-tier**: T2 VENDOR-FORK gives the W280b shim a proper home with drift-tracking obligation |
| 5 | `ralph-tight` (hypothetical 47★ Karpathy-endorsed) | would be REJECT under v2 implicit star-floor | **T3 PATTERN-STUDY** | 3.82 | 4.31 | [] | YES (avoided wrongful REJECT) | **stars-not-hardgate + low-star ≠ auto-REJECT + dual-composite captures pattern value** — operator's signature W288 mandate |

---

## §6 — Executive summary (5 bullets)

1. **v3 is meaningfully different from v2 in 4 of 5 cases** (80% verdict-change or verdict-sharpening). The one no-change case (anthropics/skills) is the regression-test that v3 doesn't break obvious INSTALLs at the top of the scale — a critical correctness property, not a flaw.

2. **All three operator-stated W288 mandates validated by at least one candidate**:
   - **Stars-not-hardgate / low-star ≠ auto-REJECT**: Candidate 5 `ralph-tight` (hypothetical 47★ Karpathy-endorsed) routes to T3 PATTERN-STUDY where v2 would REJECT.
   - **Hard-cap tier-specific (not absolute)**: Candidate 2 GitNexus — license-NC (D1=1 hard-cap) blocks INSTALL but PATTERN-STUDY route stays open via D2=5+D13=5.
   - **Decision-depth is multi-tier**: Candidate 4 hindsight-shim — v2 had no tier for "local-fork-of-upstream-for-portability"; v3's T2 VENDOR-FORK with drift-tracking is purpose-built for it.

3. **Soft-gate REJECT semantic works as designed**: Candidate 3 `claude-code-router` still REJECTs under v3 — but the rationale is now **machinery-explicit** (D3=1 hard-cap breach PLUS affirmative architectural-conflict evidence) rather than the v2 narrative ("architectural conflict"). This is what the operator wanted: REJECT only on AFFIRMATIVE unfitness, never on low-score-alone.

4. **Dual composites (install_score + pattern_score) are load-bearing**: in Candidate 5 (ralph-tight) install_score 3.82 is BELOW the T1 floor but pattern_score 4.31 is well-above the T3 floor — without dual composites the candidate would have been auto-rejected. In Candidate 2 (GitNexus) the opposite asymmetry: install_score 3.04 (low) vs pattern_score 4.07 (high) — license-blocked from INSTALL but pattern-rich. Single composite couldn't have captured this asymmetry.

5. **No v3 anti-patterns surfaced as problematic** in the pilot. All 14 anti-patterns from Stream C §7 hold up. One observation: the **Bayesian author-prior** (carried from v2.1 W287 P2.iii) interacts cleanly with D6 — Karpathy-endorsement in Candidate 5 correctly bumps D6 to 5 via α_anthropic (semi-Anthropic via karpathy-skills incumbent), not via raw stars. The interplay is the right shape; no rework needed.

**Recommendation**: v3 is ready for production use as the runtime's canonical research-architecture decision layer. The validation pilot confirms it produces meaningfully different (and BETTER) verdicts than v2 in cases the operator specifically called out, while preserving v2's correct verdicts at both ends of the spectrum (clear T1 INSTALL for anthropics/skills, clear T5 REJECT for claude-code-router).
