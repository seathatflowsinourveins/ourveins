# 00 — Wave 134 Fire 26-C Tracker (open-compress/claw-compactor Path P Audit)

> **Subject**: open-compress/claw-compactor @ HEAD `c1b936d40b1145c7a257bd6e34a17994f467495f` (v7.1.0; 2026-04-01 commit)
> **Trigger**: Fire 26-B revised Top-3 #3 — token-eff alternative to LLMLingua w/ claimed quality-lead vs LLMLingua-2
> **Hypothesis**: claw-compactor's "ZERO LLM inference cost + reversible + AST-aware" addresses CR-9 install-risk concerns that gated LLMLingua → CITE-PATTERN
> **Pre-Path-P verdict shape**: STRONG-CANDIDATE-PENDING-AUDIT (Mia probe PASS on existence/license/freshness)

## Pre-flight Mia probe (PASSED)

| Probe | Outcome |
|---|---|
| Repo exists @ github | ✅ `open-compress/claw-compactor` |
| LICENSE | ✅ MIT |
| Stars | 2,320 (well past >100★ rot-bias threshold) |
| Forks | 218 |
| Created | 2026-02-10 (3 months — axis-3 STABLE-BURN-IN PASS >90d) |
| Updated | 2026-05-09 (1 day before today — ACTIVE) |
| HEAD | `c1b936d40b1145c7a257bd6e34a17994f467495f` |
| HEAD msg | "security audit + code review + performance fixes" (Co-Authored-By: Claude Opus 4.6) |
| Local clone | ✅ Z:/repos/deps/claw-compactor (depth=50, sufficient for audit) |
| Language | Python (+ Node.js proxy) |
| PyPI | `claw-compactor` v7.1.0 ACTIVE |
| Production-Stable classifier | ✅ `Development Status :: 5 - Production/Stable` |

## Mia OVER potential (preserve for codex T1 catch)

1. **Single-org maintainer**: `Bot777` + `OpenClaw Contributors` — axis-1 ≥3-distinct-orgs concern (potential downgrade)
2. **Sister-AI built**: HEAD commit "Co-Authored-By: Claude Opus 4.6" — built by sister AI assistant; verify code quality independently
3. **Theatrical stage names**: Cortex / Photon / Ionizer / Neurosyntax / Engram — non-standard CS terminology (Row-2 fabrication-test risk)
4. **Numeric claims**: 15-82% compression, ROUGE-L 0.723 vs LLMLingua-2's 0.570, <50ms vs 300ms — need methodology verification
5. **Multi-stack scope creep**: Python lib + Node.js proxy + dashboard.html → audit MUST split (Python alone vs full proxy)
6. **proxy/ DUPLICATE-FUNCTIONALITY**: kiss-dry-yagni Must-Never #4 — proxy/server.mjs (82KB) duplicates CLIProxyAPI

## Claimed differentiators vs LLMLingua-2 (from README)

| Feature | claw-compactor | LLMLingua-2 |
|---|---|---|
| Compression rate | 15-82% | 30-70% |
| ROUGE-L @ 0.3 | **0.653** | 0.346 |
| ROUGE-L @ 0.5 | **0.723** | 0.570 |
| LLM inference cost | **$0** | ~$0.02/call |
| Latency | **<50ms** | ~300ms |
| Reversibility | ✅ YES | ❌ Lossy |
| AST-aware | ✅ Tree-sitter | ❌ NO |

## 14-stage Fusion Pipeline (from README Demo)

| Stage | Reduction% | Time |
|---|---|---|
| Cortex | — (gate) | 12ms |
| Photon | 2.1% | 4ms |
| RLE | 8.3% | 6ms |
| SemanticDedup | 12.7% | 18ms |
| Ionizer | 71.2% (!!) | 9ms |
| Neurosyntax | 18.4% | 31ms |
| TokenOpt | 4.1% | 3ms |
| Abbrev | 6.8% | 5ms |

8 named stages in demo (other 6 stage names TBD via ARCHITECTURE.md audit).

## Audit dimensions (8-axis Path P)

1. **D1 Probe-DAG harness-fit**: Probes 1-7 (count / SDK-CLI / arch-API / plugin-namespace / mode-harness / blockers / demand)
2. **D2 Row-2 fabrication-test**: verify numeric claims have reproducible methodology (benchmark/ directory)
3. **D3 Axis-1+2+3 convergence-gate**: ≥3 T1 orgs / ≥2 named-T2 / ≥3mo stability (or STRONG-PROVENANCE-EXPRESS predicate)
4. **D4 Python-lib vs proxy SCOPE SPLIT**: Python-alone fit vs full-proxy fit (kiss-dry-yagni Must-Never #4)
5. **D5 LLMLingua comparative methodology**: are LLMLingua-2 benchmark claims fair? Same dataset/seed/model?
6. **D6 CR-9 install-risk**: PyPI install footprint + tree-sitter dependencies + version pin + 2-round fix-forward budget
7. **D7 Fire 23 P0 address**: does claw-compactor address session-start descriptor budget OR is it per-task layer (same as LLMLingua)?
8. **D8 Sister-AI-built code quality**: HEAD commit Co-Authored-By Claude Opus 4.6 → INFINITE recursion concern; audit code quality independently

## Three integration options

| Option | Description | Verdict expectation |
|---|---|---|
| A: Python lib only | `pip install claw-compactor` for `claw_compactor.fusion.compress(text)` API | LOW-RISK — possible STUDY-PILOT for benchmark verification |
| B: Full proxy stack | Wire `proxy/server.mjs` as middleware between Claude and Anthropic API | HIGH-RISK — DUPLICATE CLIProxyAPI (kiss-dry-yagni Must-Never #4) |
| C: CITE-PATTERN-ONLY | Extract 14-stage Fusion Pipeline patterns + ROUGE-L benchmarking methodology without install | DEFAULT-EXPECTED — most likely codex T1 outcome |
| D: REJECT-FOR-FIT | If Probe DAG fails OR fabrication-test fails | possible if numeric claims unfounded |

## Sub-task tracker

- [x] Mia probe: repo exists + license + freshness
- [x] Local clone
- [x] Tracker (this file)
- [ ] ARCHITECTURE.md line-by-line read
- [ ] SKILL.md line-by-line read
- [ ] scripts/lib/fusion/ Python lib code audit (line-by-line)
- [ ] proxy/server.mjs scope audit (lighter — kiss-dry-yagni REJECT expected)
- [ ] benchmark/ methodology audit (Row-2 fabrication-test)
- [ ] codex T1 Path P consult prompt build
- [ ] codex T1 Path P fire
- [ ] 01-anatomy.md
- [ ] 02-probe-dag-application.md
- [ ] 03-codex-t1-verdict.md
- [ ] 99-close-synthesis.md
- [ ] install-provenance.md append
- [ ] atomic commit (FM-02 sub-class (b) defense)

## Verification queries (for codex T1 prompt)

These are the EXACT line:column or file:line cite-anchors the codex T1 prompt will pin against:

- `Z:/repos/deps/claw-compactor/pyproject.toml:1-80` (license + classifiers + deps + entry points)
- `Z:/repos/deps/claw-compactor/ARCHITECTURE.md:*` (14-stage spec — sized 26.9KB)
- `Z:/repos/deps/claw-compactor/SKILL.md:*` (skill-format integration guidance — sized 14.1KB)
- `Z:/repos/deps/claw-compactor/scripts/lib/fusion/*.py` (pipeline implementation)
- `Z:/repos/deps/claw-compactor/scripts/lib/rewind/*.py` (reversibility implementation)
- `Z:/repos/deps/claw-compactor/benchmark/*` (Row-2 methodology)
- `Z:/repos/deps/claw-compactor/proxy/server.mjs:*` (proxy duplication check)
- `Z:/repos/deps/claw-compactor/tests/*.py` (1,600+ test claim verification)

## Cite anchors (TIER-1-DIRECT)

Per cardinal-rule-1 cite-class lattice (NOT sibling-derived):
- TIER-1-DIRECT: `Z:/repos/deps/claw-compactor/` HEAD `c1b936d40b1145c7a257bd6e34a17994f467495f` MIT [VERIFIED 2026-05-10 via direct git clone]
- TIER-1-DIRECT: `https://github.com/open-compress/claw-compactor` (canonical)
- TIER-1-DIRECT: `https://pypi.org/project/claw-compactor/` (PyPI)
- TIER-1-DIRECT (for LLMLingua-2 comparison): `https://aclanthology.org/2024.findings-acl.57/` (peer-reviewed baseline)

## Discipline conformance gates

- ✅ CR-1: TIER-1-DIRECT cite chain
- ✅ CR-3: cross-model gate via Path P codex T1 REAL GPT-5.5
- 🟡 CR-9: install-risk PENDING — PyPI footprint + tree-sitter deps + 2-round fix-forward budget required
- ✅ CR-10: research-first-then-install — audit before install decision
- ✅ CR-11: META-process — multi-axis Path P prompt + Probe DAG
- 🔴 CR-12: upstream-install-priority — if STUDY-PILOT, use `pip install claw-compactor` from PyPI per CR-6 canonical-channel
- ✅ FM-02 sub-class (b): atomic git add + commit --only -- pathspec defense
- ✅ Row-2 fabrication-test: PENDING — benchmark/ methodology verification mandatory
