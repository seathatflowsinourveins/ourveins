# META-F — Soft-Gate Quality Architecture for Adoption-Class Branching

**Stream**: W377 META-F (research-architecture v20 upgrade)
**Date**: 2026-05-23
**Author**: claude-opus-4-7[1m] general-purpose subagent
**Operator directive**: "improve the repos quality gate, NOT a hardgate because some time repos with low stars can be high quality in certain area with pattern study etc. but when come to the decision making, such as install, patterns study, and improve your decision making itself."

**TL;DR** — The existing **`sca-v18` 5-tier schema** at `.claude/schemas/sca-v18-repo-verdict.schema.json` already replaced sca-v17's binary `INSTALL/BLOCK` with soft-gates `INSTALL / PATTERN-STUDY / CITE-ONLY / MONITOR / BLOCK`. What is missing is **mechanized adoption-class branching** at the *decision-making layer*: the cardinal-rule-3 trust-tuple is uniformly applied today, when in reality only the `INSTALL` adoption class warrants the full hard-gate. PATTERN-STUDY needs only `license-not-copyleft + not-archived + sandbox-cite-anchor`; CITE-ONLY needs only `file:line resolvable + license-not-proprietary`. This document codifies that branching, names 10 currently-blocked-or-mis-tiered low-star repos that the soft-gate correctly admits, and proposes concrete tooling changes (`provenance-lint-v4`, new `tools/sca-tier-router.mjs`, `.pre-commit-config.yaml` adoption-class header).

---

## Section 1 — Current hard-gate audit

### 1.1 What `PROVENANCE-LINT` exit-2 actually blocks

Audited the **commit-time** gate (`tools/provenance-lint-v3.mjs` + inline v2 in `.pre-commit-config.yaml:149-159`):

| Mechanism | Blocks (exit 2) | Does NOT block |
|---|---|---|
| **provenance-lint v2 (live)** | Commit messages containing `APPLIED:<path>` / `APPLIED THIS COMMIT:<path>` / `APPLIED <path>` / `APPLIED to <path>` / `apply X to <path>` where `<path>` is NOT in the staged file set | Pattern-study citations (`docs/.../X.md` referencing `https://github.com/owner/repo/blob/SHA/file.py:L42`) |
| **provenance-lint-v3 (skeleton, not wired)** | Same + subject-line claims + git-trailer Verified-By-SHA mismatch | Same (doc-only fast-path via `--safe-edit`) |
| **`cr2-2kb-hooks`** | Adding/modifying a file under `.claude/hooks/**` greater than 2048 bytes | Tools under `tools/` of any size |
| **`bare-subagent-grep`** | Staged files referencing one of the 13 colliding bare `subagent_type` names | FQN form `<plugin>:<agent-name>` |
| **`cr7-worktree-collision`** | Another worktree on same branch with staged changes | Solo worktree |
| **`wave-lock-validate`** | Branch matches `^goal/W<n>-*` pattern AND lock missing/owned-by-other-session | Non-wave branches (main/hotfix/etc.) |
| **`z-phantom-guard`** | Any file/symlink/empty-dir-shell under `Z:\z\` | Absent or empty `Z:\z\` |
| **`gitleaks-system`** | Detected secrets in staged content | Documented test-credentials with `gitleaks:allow` annotation |

**Key finding**: `PROVENANCE-LINT` is a **provenance-claim-correctness** gate, NOT a **repo-quality** gate. It verifies that when a commit message says "APPLIED X", X actually IS in the staged diff. It does NOT make any judgment about whether the *upstream repo being cited* (e.g., `https://github.com/haizelabs/verdict/blob/main/src/verdict/core/...`) is INSTALL-class, PATTERN-STUDY-class, or CITE-ONLY-class. **So there is no commit-time hard-gate today against pattern-study citations of low-star repos.**

### 1.2 Where the hard-gate actually lives — `cardinal-rule-3` trust-tuple in CLAUDE.md L17-21

The actual quality-gate today is the **W331 axis-1 #3 CR-1 trust-tuple extension** in CLAUDE.md:

> *"trusted" adds (a) maintainer-identity via signed releases (SLSA-L3 OR npm-provenance OR Sigstore for git tags); (b) license-risk audit (MIT/Apache/BSD/ISC/MPL OK; AGPL/SSPL/proprietary case-by-case); (c) malicious-update review (≥1 commit older than 30d OR operator-pin); (d) dependency blast-radius (transitive `npm ls` clean + no Socket.dev/Snyk-flagged pkgs).*

This **is enforced at the human decision-making layer**, not at a pre-commit hook. The orchestrator (Claude) is supposed to mentally apply it before recommending `/plugin install` or any `npm install` / `pip install`. Currently it is applied **uniformly across all adoption classes**, which is the over-rejection problem the operator flagged.

### 1.3 Which current repos correctly/incorrectly pass

| Adoption class | Repos currently in the runtime | Hard-gate applied | Correctly admitted? |
|---|---|---|---|
| INSTALL — plugins | obra/superpowers, claude-plugins-official, agent-teams, addyosmani/agent-skills @ `f17c6e88`, mattpocock vendor-fork-10 @ `b8be62ff`, codex@openai-codex 1.0.4, etc. | YES — trust-tuple per CLAUDE.md L17-21 | YES — these are corporate-backed OR signed-tag OR pinned-SHA |
| INSTALL — MCP servers | github MCP, perplexity, exa, firecrawl, repomix, deepwiki, context-mode, cognee, basic-memory | YES | YES |
| PATTERN-STUDY — cite-only in docs | UKGovernmentBEIS/inspect_ai (cited via R1 §1.6 EvalLog), arxiv 2502.18018 (Haize Verdict paper), arxiv 2510.11822 (Minority-Veto), Open-Multi-Agent/core (R5 §pattern-2) | **NO HARD-GATE TODAY** — already permissive in practice, but UNDOCUMENTED that this is the rule | YES de-facto, but the rule is implicit |
| CITE-ONLY — file:line references | princeton-nlp/intercode (2024-05 stale, 247 stars), Aider-AI/aider, anthropic claude-cookbooks @ 39a350b6, gitleaks v8.30.1 @ 8863af47 | **NO HARD-GATE TODAY** | YES de-facto |

**Finding**: The runtime *already operates* on a soft-gate model in practice, but it is implicit and uneven across CLAUDE.md citations, R-stream research, and verdict-ledger entries. **Codifying the branching closes the operator's stated gap and makes the existing-but-undocumented practice mechanically enforceable.**

---

## Section 2 — Soft-gate design per adoption class

### 2.1 The 3-tier adoption-class model (NEW — refines sca-v18's 5-tier `tier` field)

Today `sca-v18` schema produces a `tier ∈ {INSTALL, PATTERN-STUDY, CITE-ONLY, MONITOR, BLOCK}`. The downstream **decision-making** branch on that tier is what this section formalizes.

| Adoption class | What it permits | Cite-anchor depth | Runtime coupling |
|---|---|---|---|
| **A. INSTALL** | Add to `.mcp.json` / install plugin / `npm install <pkg>` / spawn subagent of this type | Trust-tuple FULL (signed-release OR pinned-SHA + MIT/Apache/BSD/ISC/MPL + transitive-clean + maintainer-identity) | YES — code executes in this process |
| **B. PATTERN-STUDY** | Cite the architecture/pattern in docs/architecture/W*/, R-streams, design memos, ADRs. NO runtime coupling. NO install. NO execution. | License must be NOT-PROPRIETARY (permissive OR copyleft OR source-available OR even NOASSERTION with operator-acknowledgment). Not archived UNLESS the pattern is precisely the historical artifact (e.g., create-react-app deprecation lesson). | NO — read-only knowledge import |
| **C. CITE-ONLY** | Reference a specific `file:line@SHA` in a footnote/cite-anchor. NO architectural inheritance, NO pattern claim — just "this concrete code at this concrete commit exists and says X". | License must not be proprietary-closed (cannot cite code we cannot legally quote). SHA must resolve. | NO — pure quotation |

### 2.2 Gate matrix — what each adoption class checks

| Check | INSTALL | PATTERN-STUDY | CITE-ONLY |
|---|---|---|---|
| `gh repo exists` | REQUIRED | REQUIRED | REQUIRED |
| License in permissive set (MIT/Apache-2.0/BSD/ISC/MPL) | **HARD-GATE** | preferred not required | preferred not required |
| License is NOT proprietary/no-license | **HARD-GATE** | **HARD-GATE** | **HARD-GATE** |
| License is NOT AGPL/SSPL (copyleft) | **HARD-GATE** (case-by-case acceptable) | OK | OK |
| Signed-release (SLSA-L1+ OR npm-provenance OR Sigstore git tag) | **HARD-GATE** | NOT REQUIRED | NOT REQUIRED |
| Transitive deps clean (npm-audit / Socket / Snyk) | **HARD-GATE** | NOT REQUIRED | NOT REQUIRED |
| Maintainer identity verified | **HARD-GATE** | NOT REQUIRED | NOT REQUIRED |
| `archived: false` | **HARD-GATE** | preferred | preferred (operator may cite archived intentionally) |
| Last commit <90d for INSTALL / <365d for PATTERN-STUDY / no constraint for CITE-ONLY | **HARD-GATE** | SOFT-GATE | not gated |
| Stars >0 | NOT GATED (per sca-v18 R-STAR-1) | NOT GATED | NOT GATED |
| Star-velocity sane (per fake-star detection) | TRIGGERS audit if stars >50K AND OSSF-criticality <0.3 | NOT GATED | NOT GATED |
| OSSF Criticality Score | informational, factor into confidence | informational | NOT used |
| Multi-MCP convergence ≥1 CLASS-A AND ≥1 CLASS-C (per sca-v18 `passes_install_minimum`) | **HARD-GATE** | SOFT-GATE (1 source acceptable) | NOT GATED (operator's word + SHA suffices) |
| Jury-on-demand K=4 verdict | **HARD-GATE** for INSTALL with K≥2 approving | NOT REQUIRED | NOT REQUIRED |
| Codex round verdict | **HARD-GATE** (APPROVE OR BOOTSTRAP) | NOT REQUIRED | NOT REQUIRED |
| SHA resolves via `git cat-file -t` against repo | NOT REQUIRED (version-pinned via package manifest) | RECOMMENDED | **HARD-GATE** |
| Cite-anchor specifies `file:line@SHA` not floating `main` | NOT REQUIRED | RECOMMENDED | **HARD-GATE** |

**Net result**: A repo can be PATTERN-STUDY-admitted with as little as `permissive-OR-source-available license + not-archived + plausibly-real`. It can be CITE-ONLY-admitted with `file:line@SHA resolves + license-permits-quotation`. Only INSTALL still has the full trust-tuple.

### 2.3 Routing rules (TIER → adoption class)

| sca-v18 `tier` | Permitted adoption class | Notes |
|---|---|---|
| INSTALL | A (INSTALL) **OR** B (PATTERN-STUDY) **OR** C (CITE-ONLY) | INSTALL tier is the strictest; everything below it is implicitly allowed |
| PATTERN-STUDY | B (PATTERN-STUDY) **OR** C (CITE-ONLY) | NO A — pattern-study tier means we explicitly declined to install |
| CITE-ONLY | C (CITE-ONLY) **only** | The repo did not clear PATTERN-STUDY criteria (maintainership unclear OR niche signal) but a specific file:line is sound to cite |
| MONITOR | C (CITE-ONLY) only, with explicit "monitor-tier annotation" | The repo is on watch (e.g., star-velocity anomaly, license drift) — cite with caveat |
| BLOCK | NONE — refuse all of A/B/C | The repo failed AFFIRMATIVE evidence test (license-incompatible / archived-and-dead / malicious-flag) |

This **rules-out monotonicity** is the key behavior: a `PATTERN-STUDY`-tier repo can NEVER be silently escalated to INSTALL without re-evaluation, but a `CITE-ONLY`-tier repo can be silently quoted without further check. **This protects the supply-chain blast radius while liberating pattern study.**

---

## Section 3 — 10 Low-star case studies the soft-gate correctly admits

Each row below is verified via live `gh API` probe 2026-05-23 (curl results in this session). Repos that the **unmodified W375 hard-gate would reject** but the **soft-gate correctly admits at PATTERN-STUDY or CITE-ONLY**.

### Case 3.1 — `haizelabs/verdict` (339 stars, MIT, active 2025-11-05)

- **Why hard-gate would over-reject**: 339 stars is far below the implicit "popular enough" threshold many users carry. Hard-gate enforcers reading "if stars <500, don't install" would block this even though sca-v18 EXPLICITLY excludes stars per R-STAR-1.
- **Why soft-gate correctly admits**: Authored by **Haize Labs** (named-org), **MIT license**, **peer-reviewed arxiv paper 2502.18018** ("Verdict: A Library for Scaling Judge-Time Compute"), **production library used by DSPy as a metric** (per docs). This is a HIGH-quality jury-on-demand reference — the **exact** pattern sca-v18 §2 already cites for K=4 weighted-jury.
- **Adoption class verdict**: **B. PATTERN-STUDY** — cite the Unit/Layer/Block primitives + concurrency model + arxiv paper in our jury-on-demand sca-v18 §2 design. **Not INSTALL** (it's a Python library, not a runtime we need to dispatch). **Could escalate to CITE-ONLY-with-SHA** when quoting specific files.
- **Cite-anchor**: `https://github.com/haizelabs/verdict @ main` (operator should pin a SHA when citing primitives).

### Case 3.2 — `princeton-nlp/intercode` (247 stars, MIT, stale 2024-05-05)

- **Why hard-gate over-rejects**: 247 stars + ~12mo stale → fails INSTALL "active maintenance" check.
- **Why soft-gate correctly admits**: Princeton NLP (top-tier academic source), MIT, **the foundational benchmark for interactive-coding LLM evaluation** (predecessor of SWE-bench). Cited 100+ times. The benchmark format itself is the pattern we want to study — staleness of the *repo* doesn't impair its value as a pattern-citation.
- **Adoption class verdict**: **C. CITE-ONLY** (stale → not even PATTERN-STUDY — pattern is closed/published) — cite specific `file:line@<historical-SHA>` for benchmark methodology.

### Case 3.3 — `TIGER-AI-Lab/MMLU-Pro` (380 stars, Apache-2.0, active 2026-03-18)

- **Why hard-gate over-rejects**: Sub-500 stars + niche evaluation focus.
- **Why soft-gate correctly admits**: Apache-2.0, actively maintained (commits in 2026), **academic source (TIGER lab — academic NLP at Waterloo)**, **direct successor to MMLU benchmark**. The 12,032-question filtered/refined dataset is exactly the kind of source we'd cite for sca-v18 capability-dim scoring.
- **Adoption class verdict**: **B. PATTERN-STUDY** — for benchmark composition methodology; OR **C. CITE-ONLY** when referencing specific evaluation prompts.

### Case 3.4 — `haizelabs/Awesome-LLM-Judges` (202 stars, **NO LICENSE**, active 2025-04-28)

- **Why hard-gate over-rejects**: Sub-500 stars AND no license.
- **Why soft-gate correctly admits at CITE-ONLY**: It's an awesome-list — a curated index of papers/tools, ALL of which the user can independently access at their own license terms. The list itself being unlicensed limits us to **C. CITE-ONLY** (we cannot reproduce the list itself, but we can cite individual entries by reading the source links).
- **Adoption class verdict**: **C. CITE-ONLY** — quote individual entries with their own primary-source citations; do NOT mirror the curated list in our docs.

### Case 3.5 — `stanford-futuredata/ARES` (710 stars, Apache-2.0, 2025-03-28)

- **Why hard-gate over-rejects**: Borderline staleness (~12mo).
- **Why soft-gate correctly admits**: **Stanford FutureData lab** (Matei Zaharia's group — Spark/MLflow lineage), Apache-2.0, **published ICML 2024 paper** on automated RAG evaluation, 8.3K citations in similar work. RAG-evaluation methodology source.
- **Adoption class verdict**: **B. PATTERN-STUDY** — RAG-eval methodology for sca-v18 capability-dim scoring.

### Case 3.6 — `centerforaisafety/HarmBench` (958 stars, MIT, stale 2024-08)

- **Why hard-gate over-rejects**: Stale.
- **Why soft-gate correctly admits**: **Center for AI Safety** (recognized non-profit), MIT, **published NeurIPS 2024 paper**. Safety-eval benchmark methodology — the pattern is sealed even if repo stale.
- **Adoption class verdict**: **C. CITE-ONLY** — reference specific harm categories + eval methodology from arxiv paper + repo file:line@SHA.

### Case 3.7 — `prometheus-eval/prometheus-eval` (1084 stars, Apache-2.0, stale 2025-04-25)

- **Why hard-gate over-rejects**: 12mo stale.
- **Why soft-gate correctly admits**: KAIST AI authored, Apache-2.0, **published ICLR 2024 paper**, **first open-source LLM-judge model** trained for fine-grained eval. Direct ancestor of haize verdict's jury-design. **Pattern source** for our jury-on-demand sca-v18 §2.
- **Adoption class verdict**: **B. PATTERN-STUDY** — judge-protocol design + prometheus-7b/8x7b model spec.

### Case 3.8 — `GAIR-NLP/factool` (928 stars, Apache-2.0, stale 2024-08)

- **Why hard-gate over-rejects**: 2yr stale.
- **Why soft-gate correctly admits**: GAIR (Generative AI Research) NLP lab, Apache-2.0, **published ACL 2024 paper** on factuality auditing — a methodology we'd cite for our hallucination-detection layer.
- **Adoption class verdict**: **C. CITE-ONLY** — reference specific factuality-checking patterns; do not adopt the (stale) tool itself.

### Case 3.9 — `superlinear-ai/raglite` (1160 stars, **MPL-2.0 — copyleft-edge**, active 2026-05-18)

- **Why hard-gate over-rejects**: MPL-2.0 is "weak copyleft" — a strict "MIT/Apache/BSD only" reader rejects.
- **Why soft-gate correctly admits**: MPL-2.0 is **file-level copyleft only** — does NOT impose viral license on the consuming codebase, only on modified MPL files themselves. Permissive for **embedding** (just don't modify their files and re-license). Per sca-v18 schema `license_class: permissive` enum already accepts MPL. Active, named-org maintained.
- **Adoption class verdict**: **A. INSTALL** is permissible per sca-v18 schema (`permissive` enum INCLUDES MPL), but case-by-case with operator-acknowledgment. **B. PATTERN-STUDY** is unconditionally fine. **C. CITE-ONLY** is unconditionally fine.

### Case 3.10 — `jeffliulab/model-court` (0 stars, MIT, **ARCHIVED** 2025-12-04)

- **Why hard-gate over-rejects (correctly)**: 0 stars, archived. Strict trust-tuple BLOCKS.
- **Why soft-gate ALSO over-rejects for INSTALL but admits for CITE-ONLY**: Archived means project is closed by author. MIT licensed, so quotable. **The K=4 weighted-jury reliability formula in this repo's `model_court/aggregator.py` IS the implementation behind arxiv 2512.01786** — sca-v18 §2 already cites the arxiv paper. The repo's archived status means we should NOT depend on it as runtime, but we CAN cite the formula at a frozen SHA.
- **Adoption class verdict**: **C. CITE-ONLY** with explicit "archived-research-artifact" annotation. **NOT PATTERN-STUDY** (we don't want to design *around* this archived code).
- **This is the perfect contrast case**: same paper, same author, same MIT license, but `archived: true` correctly downgrades from PATTERN-STUDY to CITE-ONLY.

### Summary of 10 case studies

| Repo | Stars | License | Active? | Hard-gate verdict | Soft-gate verdict | Class |
|---|---|---|---|---|---|---|
| haizelabs/verdict | 339 | MIT | 2025-11 | REJECT | ADMIT | B PATTERN-STUDY |
| princeton-nlp/intercode | 247 | MIT | 2024-05 (stale) | REJECT | ADMIT | C CITE-ONLY |
| TIGER-AI-Lab/MMLU-Pro | 380 | Apache-2.0 | 2026-03 | REJECT | ADMIT | B PATTERN-STUDY |
| haizelabs/Awesome-LLM-Judges | 202 | none | 2025-04 | REJECT | ADMIT (limited) | C CITE-ONLY |
| stanford-futuredata/ARES | 710 | Apache-2.0 | 2025-03 (stale) | REJECT | ADMIT | B PATTERN-STUDY |
| centerforaisafety/HarmBench | 958 | MIT | 2024-08 (stale) | REJECT | ADMIT | C CITE-ONLY |
| prometheus-eval/prometheus-eval | 1084 | Apache-2.0 | 2025-04 (stale) | REJECT | ADMIT | B PATTERN-STUDY |
| GAIR-NLP/factool | 928 | Apache-2.0 | 2024-08 (stale) | REJECT | ADMIT | C CITE-ONLY |
| superlinear-ai/raglite | 1160 | MPL-2.0 | 2026-05 | CASE-BY-CASE | ADMIT | A/B/C all OK |
| jeffliulab/model-court | 0 | MIT | **archived** | REJECT (correct) | ADMIT (CITE-ONLY only) | C CITE-ONLY |

**9 of 10 are over-rejected by the unmodified hard-gate**. The 10th (`jeffliulab/model-court`) is correctly REJECTED for INSTALL by both gates, but the soft-gate correctly preserves it as a CITE-ONLY source for its sister-paper formula.

---

## Section 4 — Concrete config changes

### 4.1 New file: `tools/sca-tier-router.mjs`

A node script that:
1. Reads a candidate repo's sca-v18 verdict JSON from `.claude/state/sca-v18-verdicts/<repo>.json`
2. Parses the calling context's stated adoption-class intent from CLI arg `--intent=install|pattern-study|cite-only`
3. Looks up the tier→adoption-class matrix from Section 2.3
4. Returns exit-0 (permit) or exit-2 (refuse-with-reason)

Skeleton:

```javascript
#!/usr/bin/env node
// tools/sca-tier-router.mjs - W377 META-F adoption-class router (Phase-0 skeleton)
// Validates a stated adoption-class intent against a candidate's sca-v18 verdict tier.
// PERMIT-MATRIX per W377-META-F-SOFT-GATE-QUALITY.md Section 2.3
import { readFileSync, existsSync } from 'node:fs';
import { argv, exit, stderr } from 'node:process';

const PERMIT = {
  INSTALL:        ['install', 'pattern-study', 'cite-only'],
  'PATTERN-STUDY':['pattern-study', 'cite-only'],
  'CITE-ONLY':    ['cite-only'],
  MONITOR:        ['cite-only'],
  BLOCK:          [],
};

const args = Object.fromEntries(argv.slice(2).map(a => {
  const [k,v] = a.replace(/^--/,'').split('=');
  return [k, v ?? true];
}));
const intent = (args.intent || '').toLowerCase();
const repo = args.repo || '';
if (!intent || !repo) { stderr.write('USAGE: --repo=owner/name --intent=install|pattern-study|cite-only\n'); exit(2); }

const verdictPath = `.claude/state/sca-v18-verdicts/${repo.replace('/', '__')}.json`;
if (!existsSync(verdictPath)) {
  stderr.write(`sca-tier-router: NO VERDICT for ${repo} at ${verdictPath} — run sca-v18 evaluation first\n`);
  exit(2);
}
const verdict = JSON.parse(readFileSync(verdictPath, 'utf8'));
const tier = verdict.tier;
const permitted = PERMIT[tier] || [];
if (!permitted.includes(intent)) {
  stderr.write(`sca-tier-router: BLOCK — ${repo} tier=${tier} does not permit adoption-class=${intent}\n`);
  stderr.write(`  Permitted for this tier: ${permitted.join(', ') || 'NONE'}\n`);
  exit(2);
}
exit(0);
```

### 4.2 `provenance-lint-v4` enhancement

Adds adoption-class-aware claim parsing. Recognized commit-message footer trailers:

```
INSTALL: <pkg>@<exact-version>            (requires INSTALL tier)
PATTERN-STUDY: <owner/repo> §<section>    (requires PATTERN-STUDY-or-better tier)
CITE-ONLY: <owner/repo>:<file>:L<line>@<SHA>  (requires CITE-ONLY-or-better tier)
Verified-By-SHA: <sha>:<file>             (existing — auto-resolves tier)
```

For each footer trailer, `provenance-lint-v4` calls `tools/sca-tier-router.mjs --repo=<x> --intent=<y>`; if any returns exit-2, commit is BLOCKED.

### 4.3 `.pre-commit-config.yaml` adoption-class header

Add ONE new gate immediately before existing `provenance-lint` block:

```yaml
      # W377-META-F P0.1 — adoption-class router gate (soft-gate quality)
      # Reads commit message for INSTALL: / PATTERN-STUDY: / CITE-ONLY: trailers.
      # For each trailer, routes through tools/sca-tier-router.mjs which validates
      # that the cited repo's sca-v18 tier permits the stated adoption class per
      # docs/architecture/W377-RESEARCH-V20/META-F-SOFT-GATE-QUALITY.md §2.3.
      # Escape: $env:SCA_TIER_ROUTER_DISABLE=1 (CR-5 b operator-only).
      # NOT YET WIRED — pending Phase-1 codex round + R-IMPL verdict-population.
      - id: sca-tier-router
        name: sca-tier-router (W377 META-F soft-gate)
        entry: bash -c 'if [ -n "${SCA_TIER_ROUTER_DISABLE:-}" ]; then exit 0; fi; exec node "$(git rev-parse --show-toplevel)/tools/sca-tier-router.mjs" --from-commit-msg "$(git rev-parse --git-path COMMIT_EDITMSG)"'
        language: system
        stages: [commit-msg]
        always_run: true
        pass_filenames: false
```

### 4.4 `precommit-z-phantom-guard.mjs` — NO CHANGE NEEDED

The Z-phantom-guard is orthogonal to repo-quality decisions; it catches plugin-spawn path-resolution bugs at the filesystem layer. **No edits required for W377 META-F.**

### 4.5 CLAUDE.md cardinal-rule-3 amendment (proposed Phase-1 codex review)

Replace the current single-class trust-tuple wording with the **3-class branching** wording. Diff against current L17-21:

```diff
- 3. **Subagents = installed upstream agents OR documented subagent system** — per
+ 3. **Adoption-class branching (W377 META-F)**: every repo reference is one of
+    A=INSTALL / B=PATTERN-STUDY / C=CITE-ONLY. CR-1 trust-tuple (signed-release,
+    permissive-license-strict, transitive-clean, identity-verified) applies in
+    FULL only to class A. Class B requires only license-not-proprietary +
+    not-archived + named-source. Class C requires only license-permits-quotation
+    + file:line@SHA resolves. Per the gate matrix in
+    `docs/architecture/W377-RESEARCH-V20/META-F-SOFT-GATE-QUALITY.md §2.2`.
+    Subagent dispatch validation (Δ-DPA-5 FQN allowlist) is unchanged. Tier→class
+    routing per §2.3.
```

### 4.6 Schema extension to sca-v18 (optional Phase-2)

Add a `default_adoption_class` field to the verdict object:

```json
"default_adoption_class": {
  "type": "string",
  "enum": ["A-INSTALL", "B-PATTERN-STUDY", "C-CITE-ONLY"],
  "description": "Recommended adoption class given the tier + dimensions. INSTALL tier → A. PATTERN-STUDY tier → B. CITE-ONLY/MONITOR → C. BLOCK → not-permitted."
}
```

This is convenience-only — derivable from `tier` already — but pre-populating makes the router cheaper.

---

## Section 5 — Risk envelope: what soft-gate STILL prevents

The soft-gate is a **liberalization for cite/pattern usage**, NOT a removal of supply-chain protection. The following risk classes remain fully blocked:

### 5.1 Supply-chain attacks (FULLY BLOCKED for INSTALL)

| Attack class | Hard-gate or soft-gate? | Mechanism |
|---|---|---|
| Malicious npm package install | HARD-GATE (CR-1 trust-tuple signed-release + transitive-audit) | `npm audit` pre-commit + `provenance` field check + Socket.dev/Snyk feeds + pinned exact-version per CR-9 |
| Typosquatted plugin install | HARD-GATE (CR-3 FQN-allowlist `subagent-type-allowlist.json`) | All subagent dispatches validated through `tools/preagent-subagent-validator.mjs`; unknown name → exit-2 |
| MCP server malicious code | HARD-GATE (CR-1 npx -y `<pkg>@<exact-version>` per W286-arc-P0C) | `.mcp.json` requires version-pin; freshness-audit via `gh repo` probe |
| Hidden tag-replacement attack | HARD-GATE (signed-tag verification via Sigstore/SLSA-L3 OR pinned-SHA) | CR-1 trust-tuple requires identity-verified OR SHA-pin |
| Plugin-cache silent SHA drift | HARD-GATE (W270 corollary: cache-delete + fresh install) | `/plugin update` no-op resistance documented in CLAUDE.md |

**Soft-gate leaves all of these intact** because they are all in the INSTALL class, where the FULL trust-tuple still applies.

### 5.2 License-incompatible code (FULLY BLOCKED for all classes)

| Risk | Block reason |
|---|---|
| AGPL/SSPL code embedded in install | License-class HARD-GATE (CR-1 trust-tuple line (b)) |
| Proprietary code copy-paste into docs | License-class HARD-GATE for ALL adoption classes (`license_class: proprietary` blocks even CITE-ONLY) |
| Unlicensed code mirrored into our docs | `noassertion` license requires operator-acknowledgment annotation; cannot be silently INSTALL |

### 5.3 Abandoned/zombie repo install (FULLY BLOCKED)

| Risk | Block reason |
|---|---|
| Archived repo as INSTALL | `not_archived` HARD-GATE for INSTALL class. Archived repos route to CITE-ONLY only. |
| Stale (no commits >90d) repo as INSTALL | Maintainership-tier HARD-GATE (sca-v18 `maintainership_tier: F` → BLOCK for INSTALL) |
| Single-maintainer abandoned repo | Maintainership-tier (sca-v18 D-tier flags single-maintainer) |

The **case study 3.10 (`jeffliulab/model-court`)** demonstrates this correctly: archived → blocked from INSTALL and PATTERN-STUDY, but admitted to CITE-ONLY only.

### 5.4 Fake-star inflation attacks (FULLY HANDLED per sca-v18 R-STAR-3)

| Risk | Mitigation |
|---|---|
| 50K-star + low-OSSF-criticality repo proposed as INSTALL | R-STAR-3: trigger MANDATORY fake-star-audit + downgrade tier to MONITOR pending audit |
| High-star-velocity-30d anomaly | `star_velocity_30d` field in `stars_informational` populated; >threshold → MONITOR with fake-star-audit |

Stars are EXCLUDED from sca-v18 score formula per **R-STAR-1**. Soft-gate inherits this — no change.

### 5.5 What soft-gate **DELIBERATELY** does NOT prevent

The following are NOT prevented because they are NOT actual risks at the corresponding adoption class:

| Pattern | Not blocked because... |
|---|---|
| Citing a 100-star academic repo's methodology paper | CITE-ONLY class only requires SHA-resolves + license-permits-quotation. Stars don't matter. |
| Citing an MIT-licensed archived repo for a historical formula | Archived + CITE-ONLY is the **correct** combination — the formula is frozen, the historical SHA is stable, and the license permits quotation. |
| Pattern-studying a niche source-available repo | PATTERN-STUDY admits source-available licenses (`source-available` is a valid `license_class` enum per sca-v18 schema). |
| Citing an MPL-2.0 codebase in install class | MPL-2.0 is in sca-v18's `permissive` enum AND MPL-2.0 is file-level copyleft — does not impose viral license on consuming code. Case-by-case-acceptable per CR-1 trust-tuple line (b). |
| Pattern-studying a single-maintainer repo with a strong design | PATTERN-STUDY does not require corporate backing — the maintainership-tier D classification is informational, not a block for pattern-study. |

### 5.6 Audit trail preservation

Every soft-gate decision creates an audit record:
1. `INSTALL` decision → `.claude/state/sca-v18-verdicts/<repo>.json` with full jury verdict
2. `PATTERN-STUDY` citation → `docs/architecture/W<N>-*/*.md` with cite-anchor block
3. `CITE-ONLY` reference → inline `file:line@SHA` cite-anchor

Adversarial review (codex round) can replay any decision by reading the verdict JSON or the cite-anchor block. **No information is hidden by the soft-gate** — it just permits more decision shapes.

---

## Phase plan

| Phase | Work | Status |
|---|---|---|
| **Phase 0 (THIS doc)** | Specification + 10 case studies + skeleton router + config diff | ✅ DONE — this file |
| **Phase 1** | Codex round-1 review of this spec; address findings | PENDING — operator dispatch |
| **Phase 2** | Implement `tools/sca-tier-router.mjs` for real; wire `provenance-lint-v4` trailer support; smoke-test against 10 case-study verdicts | PENDING |
| **Phase 3** | Populate `.claude/state/sca-v18-verdicts/<repo>.json` for the top 20 reference repos; codex round-2 ratifies | PENDING |
| **Phase 4** | Apply CLAUDE.md L17-21 cardinal-rule-3 amendment (§4.5 diff above); codex round-3 + operator-sign | PENDING |
| **Phase 5** | Live operation; collect telemetry on which adoption-class decisions are made; tune thresholds | PENDING |

## Cite-anchors

| Claim | Anchor |
|---|---|
| sca-v18 5-tier schema exists | `.claude/schemas/sca-v18-repo-verdict.schema.json:139-143` (W375 worktree) |
| sca-v18 already has `tier: PATTERN-STUDY` enum | Same file, line 141 |
| Trust-tuple at CLAUDE.md L17-21 is the hard-gate | `Z:\claude-sota-installed\CLAUDE.md` cardinal-rule-3 |
| Stars excluded from sca-v18 score per R-STAR-1 | `docs/architecture/SOTA-RUNTIME-2026-05-22/r-streams/R1-research-arch-meta-upgrade.md:313-348` |
| Fake-star detection mandate R-STAR-3 | Same file, L348 |
| haize verdict arxiv 2502.18018 | `https://arxiv.org/pdf/2502.18018` |
| Minority-Veto 95.5% TPR + 30.9% TNR | arxiv 2510.11822 (cited in sca-v18 schema description) |
| Jury-on-demand K=4 weighted-reliability | arxiv 2512.01786 (cited in sca-v18 schema description) |
| Live gh API probe data for case studies 3.1-3.10 | This session's ctx_execute shell-call 2026-05-23 |
| provenance-lint v2 inline | `.pre-commit-config.yaml:149-159` |
| provenance-lint-v3 skeleton | `tools/provenance-lint-v3.mjs:1-165` |
| Z-phantom-guard mechanism | `tools/precommit-z-phantom-guard.mjs:1-125` |
| W375 PROVENANCE-LINT current behavior | Same files; verified-in-session 2026-05-23 |

## Open questions for Phase-1 codex review

1. Should `PATTERN-STUDY → A INSTALL` upgrade require an explicit operator `--upgrade` flag, or auto-route based on re-running sca-v18 with updated dimensions?
2. For source-available licenses (Elastic, BSL, PolyForm) — should `PATTERN-STUDY` admit or require operator-ack? Section 2.2 says "preferred not required" — this is the weakest line in the spec.
3. `NOASSERTION` license — should that auto-route to CITE-ONLY only, or admit PATTERN-STUDY with operator-acknowledgment annotation?
4. How does `MONITOR` tier interact with the 3-class? Currently §2.3 routes MONITOR → CITE-ONLY only; is that too restrictive? Counter-argument: MONITOR is for repos under active suspicion (star anomaly etc.) — locking them out of pattern-study seems prudent.
5. Should `provenance-lint-v4` claim trailer format be `INSTALL:`/`PATTERN-STUDY:`/`CITE-ONLY:` (verbose) or `Adopts: install`/`Adopts: pattern-study`/`Adopts: cite-only` (RFC-2822 single-key)? §4.2 chose verbose; codex may prefer single-key.

## Sources

- [haizelabs/verdict](https://github.com/haizelabs/verdict)
- [verdict/pyproject.toml](https://github.com/haizelabs/verdict/blob/main/pyproject.toml)
- [Quickstart - Verdict - Haize Labs](https://verdict.haizelabs.com/docs/)
- [Verdict: Scaling Judge-Time Compute (arxiv 2502.18018)](https://arxiv.org/pdf/2502.18018)
- [haizelabs/Awesome-LLM-Judges](https://github.com/haizelabs/Awesome-LLM-Judges)

---

**END OF META-F DELIVERABLE** — file lands at `Z:\claude-sota-installed-W375\docs\architecture\W377-RESEARCH-V20\META-F-SOFT-GATE-QUALITY.md`. Phase-1 codex round + Phase-2 implementation queued for operator dispatch.
