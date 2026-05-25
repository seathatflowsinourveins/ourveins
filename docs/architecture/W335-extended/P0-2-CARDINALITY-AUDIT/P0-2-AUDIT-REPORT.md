# W335 P0-2 — Per-Skill Cardinality Audit (engineering-skills + engineering-advanced-skills)

**Wave**: W335 Stream P0-2
**Date**: 2026-05-20
**Mode**: Research-only (read-only; NO writes to any SKILL.md)
**Auditor**: Claude Code subagent
**Operator-correction lesson (W334)**: do NOT mass-disable; per-skill audit for >8-trigger violations only; operator-curate override OR upstream PR; KEEP quality skills enabled.

---

## Methodology + Cite Anchors

**Reference standard**: Anthropic CC skills doc — `https://code.claude.com/docs/en/skills` (accessed 2026-05-19): description field should be ≤8 distinct triggers for optimal triggering accuracy. CLAUDE.md cardinal rule 4 (W331 axis-1 #6 corollary): "operator-curated local skills MUST pass per-skill trigger audit — `description:` phrase cardinality ≤8 distinct triggers; no overlap with sibling-skill triggers >50%; auto-fire cardinal rule explicitly stated."

**W334 conflation lesson** (T6 basic-memory canonical permalink: cardinality-vs-quality CONFLATION FM-class): mass-disable is the FM; per-skill remediation is the SOTA fix. Quality skills with too many triggers should be either (a) operator-curate override (local skill copy with trimmed description), or (b) upstream PR to trim. KEEP enabled in either case.

**Counting heuristic (applied uniformly)**:
- Triggers = distinct phrases bounded by `, `, `; `, sentence boundaries (`. `), or `/` separator (when separating noun-phrase triggers).
- Each "use when X" / "X mentioned" / "when X" / standalone noun-phrase trigger = 1 trigger.
- Enumerated comma-lists of provider names (e.g., `LaunchDarkly, GrowthBook, Statsig`) are EACH counted because they each independently fire the skill on description-match.
- Enumerated lists of in-scope feature areas AFTER an explicit "Covers" or "Includes" clause are NOT counted (coverage scope, not trigger surface).
- Sister-skill demarcation prose ("Distinct from X", "NOT for X") is NOT counted.
- Numbered enumeration of "use when" clauses each count as 1 trigger.
- The opening sentence "Use when ..." or "X for Y. Use when ..." is parsed first.

**Source locations**:
- Bundle A: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-skills/engineering-skills/2.2.3/skills/` (31 sub-skills + 1 meta = 32 dirs; meta is descriptive scope only)
- Bundle B: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-skills/engineering-advanced-skills/2.4.4/skills/` (39 sub-skills + 1 meta = 40 dirs; meta is descriptive scope only)

**Status legend**:
- PASS: trigger-count ≤ 8
- BORDERLINE: trigger-count = 8 (at limit; no action needed, monitor for sibling-overlap)
- VIOLATION: trigger-count > 8

---

## §1 Bundle A — `engineering-skills` (32 sub-skills)

| # | sub-skill | trigger-count | status | recommendation |
|---|-----------|---------------|--------|----------------|
| 0 | engineering-skills (meta) | 0 (scope-only) | PASS (meta) | KEEP — meta-bundle description; not a trigger surface |
| 1 | adversarial-reviewer | 3 | PASS | KEEP |
| 2 | ai-security | 5 | PASS | KEEP |
| 3 | aws-solution-architect | 5 | PASS | KEEP |
| 4 | azure-cloud-architect | 5 | PASS | KEEP |
| 5 | cloud-security | 5 | PASS | KEEP |
| 6 | code-reviewer | 4 | PASS | KEEP |
| 7 | email-template-builder | 4 | PASS | KEEP |
| 8 | epic-design | ~22 | **VIOLATION** | KEEP enabled; operator-curate override (local skill copy with description trimmed to ≤8 scroll-storytelling triggers) OR upstream PR to vendor. Sibling-overlap risk with `frontend-design` (vercel) and `senior-frontend` >50% — recommend trimming triggers to focus on scroll-storytelling differentiator |
| 9 | gcp-cloud-architect | 5 | PASS | KEEP |
| 10 | incident-commander | 4 | PASS | KEEP |
| 11 | incident-response | 4 | PASS | KEEP (sibling-overlap with `incident-commander` — both bundles ship the pair; not a cardinality issue) |
| 12 | ms365-tenant-manager | ~16 | **VIOLATION** | KEEP enabled; operator-curate override OR upstream PR. Three sentences enumerate triggers (tenant setup + Office 365 admin + Azure AD + Exchange Online + Teams + security policies; then bulk-ops + Conditional Access + license mgmt + compliance; then 6 quoted role/area triggers). Recommend trimming to ≤8 core area triggers |
| 13 | red-team | 3 | PASS | KEEP |
| 14 | security-pen-testing | 5 | PASS | KEEP |
| 15 | senior-architect | ~13 | **VIOLATION** | KEEP enabled; operator-curate override OR upstream PR. Has 8 quoted-triggers + 5 scope items extending the surface. Recommend trimming scope items or merging quoted triggers (e.g., "design system architecture" + "review system design" → 1 trigger) |
| 16 | senior-backend | 8 | BORDERLINE | KEEP — at limit; monitor for sibling-overlap with `senior-fullstack` |
| 17 | senior-computer-vision | 4 | PASS | KEEP |
| 18 | senior-data-engineer | 5 | PASS | KEEP |
| 19 | senior-data-scientist | 5 | PASS | KEEP |
| 20 | senior-devops | 5 | PASS | KEEP |
| 21 | senior-frontend | 6 | PASS | KEEP |
| 22 | senior-fullstack | ~10 | **VIOLATION** | KEEP enabled; operator-curate override OR upstream PR. Has 7 quoted-triggers + 3 open-ended "mentions" triggers. Recommend choosing 8 — either drop the open-ended "mentions" tail or consolidate quoted triggers |
| 23 | senior-ml-engineer | 5 | PASS | KEEP |
| 24 | senior-prompt-engineer | 8 | BORDERLINE | KEEP — at limit |
| 25 | senior-qa | 8 | BORDERLINE | KEEP — at limit |
| 26 | senior-secops | 7 | PASS | KEEP |
| 27 | senior-security | 8 | BORDERLINE | KEEP — at limit; monitor for sibling-overlap with `senior-secops` and `cloud-security` |
| 28 | stripe-integration-expert | 4 | PASS | KEEP |
| 29 | tdd-guide | 5 | PASS | KEEP |
| 30 | tech-stack-evaluator | 5 | PASS | KEEP |
| 31 | threat-detection | 3 | PASS | KEEP |

**Bundle A summary**: 4 violations (`epic-design`, `ms365-tenant-manager`, `senior-architect`, `senior-fullstack`). 4 borderline (`senior-backend`, `senior-prompt-engineer`, `senior-qa`, `senior-security`). 23 pass. 1 meta.

---

## §2 Bundle B — `engineering-advanced-skills` (40 sub-skills)

| # | sub-skill | trigger-count | status | recommendation |
|---|-----------|---------------|--------|----------------|
| 0 | engineering-advanced-skills (meta) | 0 (scope-only) | PASS (meta) | KEEP — meta-bundle description |
| 1 | agent-designer | 4 | PASS | KEEP |
| 2 | agent-workflow-designer | 3 | PASS | KEEP |
| 3 | api-design-reviewer | 3 | PASS | KEEP |
| 4 | api-test-suite-builder | 4 | PASS | KEEP |
| 5 | browser-automation | 6 | PASS | KEEP |
| 6 | changelog-generator | 3 | PASS | KEEP |
| 7 | chaos-engineering | ~12 | **VIOLATION** | KEEP enabled; operator-curate override OR upstream PR. 6 noun-phrase triggers + 6 product-name triggers (Chaos Toolkit, Chaos Mesh, Litmus, Gremlin, AWS FIS). Recommend trimming product-name triggers (consolidate to "any chaos tool" OR pick top 2) |
| 8 | ci-cd-pipeline-builder | 3 | PASS | KEEP |
| 9 | codebase-onboarding | 3 | PASS | KEEP |
| 10 | command-guide | ~13 | **VIOLATION** | KEEP enabled; operator-curate override OR upstream PR. 5 numbered "use when" + 8 quoted triggers. Recommend trimming numbered cases OR quoted-trigger list to ≤8 combined |
| 11 | database-designer | 5 | PASS | KEEP (sibling-overlap with `database-schema-designer` >50% — both ship in same bundle; recommend bundle-vendor consolidation in upstream PR) |
| 12 | database-schema-designer | 4 | PASS | KEEP (sibling-overlap with `database-designer` >50%; see above) |
| 13 | dependency-auditor | 4 | PASS | KEEP |
| 14 | env-secrets-manager | 4 | PASS | KEEP (sibling-overlap with `secrets-vault-manager` — review for >50% overlap) |
| 15 | feature-flags-architect | ~11 | **VIOLATION** | KEEP enabled; operator-curate override OR upstream PR. 6 noun-phrase + 5 product-name triggers (LaunchDarkly, GrowthBook, Statsig, Unleash, Flipt). Recommend trimming product-name triggers |
| 16 | focused-fix | 4 | PASS | KEEP |
| 17 | full-page-screenshot | 3 | PASS | KEEP |
| 18 | git-worktree-manager | 3 | PASS | KEEP |
| 19 | interview-system-designer | 9 | **VIOLATION** | KEEP enabled; operator-curate override OR upstream PR. 9 quoted triggers. Recommend dropping 1 (e.g., merge "create hiring pipelines" + "optimize hiring systems" → 1) |
| 20 | kubernetes-operator | ~10 | **VIOLATION** | KEEP enabled; operator-curate override OR upstream PR. 4 noun-phrase + 6 product-name triggers (controller-runtime, kubebuilder, operator-sdk, metacontroller, KOPF, custom resource). Recommend trimming product-name triggers |
| 21 | mcp-server-builder | 3 | PASS | KEEP |
| 22 | migration-architect | 4 | PASS | KEEP |
| 23 | monorepo-navigator | 4 | PASS | KEEP |
| 24 | observability-designer | 3 | PASS | KEEP |
| 25 | performance-profiler | 3 | PASS | KEEP |
| 26 | pr-review-expert | 4 | PASS | KEEP |
| 27 | rag-architect | 5 | PASS | KEEP |
| 28 | release-manager | 5 | PASS | KEEP (sibling-overlap with `changelog-generator` and Bundle A `incident-commander` — review) |
| 29 | runbook-generator | 3 | PASS | KEEP |
| 30 | secrets-vault-manager | 5 | PASS | KEEP (sibling-overlap with `env-secrets-manager`; see above) |
| 31 | self-eval | 3 | PASS | KEEP |
| 32 | ship-gate | 7 | PASS | KEEP |
| 33 | skill-security-auditor | ~13 | **VIOLATION** | KEEP enabled; operator-curate override OR upstream PR. 7 numbered "use when" + 6 quoted triggers. Recommend trimming to ≤8 combined |
| 34 | skill-tester | 4 | PASS | KEEP |
| 35 | slo-architect | 8 | BORDERLINE | KEEP — at limit |
| 36 | spec-driven-workflow | 5 | PASS | KEEP |
| 37 | sql-database-assistant | 5 | PASS | KEEP |
| 38 | tc-tracker | 4 | PASS | KEEP |
| 39 | tech-debt-tracker | 8 | BORDERLINE | KEEP — at limit |

**Bundle B summary**: 6 violations (`chaos-engineering`, `command-guide`, `feature-flags-architect`, `interview-system-designer`, `kubernetes-operator`, `skill-security-auditor`). 2 borderline (`slo-architect`, `tech-debt-tracker`). 31 pass. 1 meta.

---

## §3 Violations Summary

**Total violations: 10 across 72 audited skills (13.9%)**

**Bundle A (4 violations / 32 skills = 12.5%)**:
1. `epic-design` (~22 triggers) — scroll-storytelling skill with very wide trigger surface
2. `ms365-tenant-manager` (~16 triggers) — three-sentence trigger enumeration
3. `senior-architect` (~13 triggers) — 8 quoted triggers + 5 scope items extending trigger surface
4. `senior-fullstack` (~10 triggers) — 7 quoted + 3 open-ended "mentions" triggers

**Bundle B (6 violations / 40 skills = 15%)**:
1. `chaos-engineering` (~12 triggers) — 6 noun-phrase + 6 product-name triggers
2. `command-guide` (~13 triggers) — 5 numbered "use when" + 8 quoted triggers
3. `feature-flags-architect` (~11 triggers) — 6 noun-phrase + 5 product-name triggers
4. `interview-system-designer` (9 triggers) — just over limit by 1; lowest-impact violation
5. `kubernetes-operator` (~10 triggers) — 4 noun-phrase + 6 product-name triggers
6. `skill-security-auditor` (~13 triggers) — 7 numbered "use when" + 6 quoted triggers

**Borderline (at 8 triggers, monitor only — KEEP, no action)**:
- Bundle A: `senior-backend`, `senior-prompt-engineer`, `senior-qa`, `senior-security`
- Bundle B: `slo-architect`, `tech-debt-tracker`

**Patterns observed**:
- "Product-name trigger lists" (LaunchDarkly/GrowthBook/Statsig/etc. or Chaos Toolkit/Chaos Mesh/Litmus/etc. or controller-runtime/kubebuilder/operator-sdk/etc.) drive 4 of 10 violations — recommend a vendor-pattern reform in upstream-PR strategy (consolidate to "any X tool" OR keep top-2 only).
- "Numbered use-when + quoted-trigger combo" drives 2 violations (`command-guide`, `skill-security-auditor`) — recommend dropping the quoted-trigger tail when numbered list already covers the surface.
- "Multi-sentence enumeration" drives 2 violations (`ms365-tenant-manager`, `senior-architect`) — recommend consolidating to single-sentence trigger list.
- "Wide-but-single-domain trigger surface" drives 2 violations (`epic-design`, `senior-fullstack`) — recommend choosing top-8 most-distinctive triggers, dropping synonyms.

---

## §4 Per-Skill Recommendations (Actionable)

**For all 10 violations**: KEEP enabled (per W334 lesson — these are quality skills with valid coverage). Apply one of two remediation paths:

**Path A — Operator-curate override (no upstream dependency)**:
For each violation, create a local skill stub in `Z:/claude-sota-installed/.claude/skills/<skill-name>-curated/SKILL.md` with the trimmed description (≤8 triggers) pointing to the upstream skill's content via relative include or namespace prefix. Cite-anchor each override to W335 P0-2 audit. Cardinal rule 4 compliance: operator-curated path-gated via SKILL.md is permitted.

**Path B — Upstream PR (cleaner long-term)**:
For each violation, open a PR against the upstream `claude-code-skills` repo to trim the `description:` field. Cite the Anthropic CC skills doc ≤8-triggers heuristic in the PR body. This benefits the entire ecosystem.

**Priority ordering** (highest impact first):
1. `epic-design` (~22 triggers) — biggest reduction; Path B (upstream PR) preferred
2. `ms365-tenant-manager` (~16 triggers) — Path B preferred
3. `command-guide` (~13 triggers) — Path B; trim quoted-trigger tail
4. `senior-architect` (~13 triggers) — Path B; consolidate scope items
5. `skill-security-auditor` (~13 triggers) — Path B; trim quoted-trigger tail
6. `chaos-engineering` (~12 triggers) — Path B; consolidate product-name list
7. `feature-flags-architect` (~11 triggers) — Path B; consolidate product-name list
8. `kubernetes-operator` (~10 triggers) — Path B; consolidate product-name list
9. `senior-fullstack` (~10 triggers) — Path B; drop open-ended "mentions" tail
10. `interview-system-designer` (9 triggers) — Path B; drop 1 (merge 2 synonyms)

**Borderline skills (8 triggers)** — no action required this wave. Monitor for sibling-overlap >50% in W336 cross-bundle audit.

**Sibling-overlap candidates for W336 audit**:
- `database-designer` ↔ `database-schema-designer` (same bundle B)
- `env-secrets-manager` ↔ `secrets-vault-manager` (same bundle B)
- `senior-secops` ↔ `senior-security` ↔ `cloud-security` (cross-bundle)
- `incident-commander` ↔ `incident-response` ↔ `release-manager` (cross-bundle)
- `epic-design` ↔ `senior-frontend` ↔ external `frontend-design`/`vercel-*` (cross-bundle)

---

## §5 Audit-Trail Closing

- **Total skills audited**: 72 (Bundle A 32 + Bundle B 40); 2 meta-bundle descriptions excluded from trigger-count (descriptive scope, not trigger surface).
- **Effective audit set**: 70 sub-skill SKILL.md `description:` fields.
- **Violations (>8 triggers)**: 10 (14.3% of 70 effective)
- **Borderline (=8 triggers)**: 6 (8.6%)
- **Pass (<8 triggers)**: 54 (77.1%)
- **Files read**: 72 SKILL.md description-blocks via batched `awk` extraction (zero individual Read calls — tool-call budget preserved).
- **No SKILL.md modified** (research-only invariant honored).
- **Tool-call budget**: ~12 of 25 used.
- **Cite anchors**:
  - Anthropic CC skills doc URL: `https://code.claude.com/docs/en/skills` (≤8-distinct-triggers heuristic for optimal triggering accuracy; accessed 2026-05-19)
  - W334 cardinality-vs-quality CONFLATION FM-class lesson (T6 basic-memory canonical permalink); operator-correction: "do NOT mass-disable; per-skill audit for >8-trigger violations only; operator-curate override OR upstream PR; KEEP quality skills enabled"
  - CLAUDE.md cardinal rule 4 (W331 axis-1 #6 corollary): "operator-curated local skills MUST pass per-skill trigger audit — `description:` phrase cardinality ≤8 distinct triggers; no overlap with sibling-skill triggers >50%; auto-fire cardinal rule explicitly stated"
- **Source plugin manifests**:
  - Bundle A version: `2.2.3` (`claude-code-skills/engineering-skills/2.2.3`)
  - Bundle B version: `2.4.4` (`claude-code-skills/engineering-advanced-skills/2.4.4`)
- **Verification probe** (cardinal rule 6): trigger-counts are conservative lower bounds. Exact-match cardinality may be higher in some cases (notably `epic-design` where the YAML block-scalar `>` indicator concatenates lines; the conservative count assumes phrase-boundary on commas only). Re-audit with a stricter NLP-phrase-extractor in W336 if needed.
