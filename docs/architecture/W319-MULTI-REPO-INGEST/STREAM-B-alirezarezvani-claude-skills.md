# STREAM-B-alirezarezvani-claude-skills — W319 Stream B (NEW T2 STAGED-PILOT)

## HEAD-SHA-AT-INGEST
- `8aa920812f05d5f8c97340775be39e1813885ee9` @ 2026-05-19 12:05:40 +0200
- Latest release: `v2.8.0 — business-operations + commercial domains, plugin.json regression fix, auto-release pipeline` (2026-05-19)
- W318 Stream-B install_score 4.21 / 15482★
- **729 SKILL.md files** across 16 domains (engineering, business-growth, business-operations, c-level-advisor, commercial, compliance-os, finance, marketing-skill, product-team, project-management, ra-qm-team, research, business-operations, custom-gpt, engineering-team, productivity)

## CITE-DRIFT

| Cite location | Cited value | Current truth | Action |
|---|---|---|---|
| CLAUDE.md L41 (W317-r2 Stream B context) | "alirezarezvani/claude-skills NEW T2 STAGED-PILOT install_score 4.21 / 15482★ per W318 Stream-B" | repo HEAD now `8aa9208`; v2.8.0 released today (2026-05-19) adding business-operations + commercial domains | **REFRESH** — install_score should be re-computed given fresh v2.8.0 scope |

ZERO drift for the SHA (operator says "check fresh HEAD"); audit-date drift in scoring is what to address.

## NET-NEW-PATTERNS

| PRIO | Pattern | Cite (path:line) | Why net-new |
|---|---|---|---|
| 1 | v2.8.0 release: **`business-operations/`** new top-level domain (Sprint 1+2) — `business-operations-skills` orchestrator + `process-mapper` (BPMN) + `vendor-management` + `capacity-planner` (Erlang-C) + `internal-comms` (ADKAR+Kotter) + `knowledge-ops` (5W2H+SOC2/HIPAA/ISO13485 overlays) + `procurement-optimizer` (UNSPSC) | `CHANGELOG.md` v2.8.0 + `business-operations/skills/` | NET-NEW domain (7 skills total). Internal ops for COO direct reports / vendor management / IT ops. **Not aligned with our software-only runtime; PRIO-1 informational only.** |
| 1 | v2.8.0 release: **`commercial/`** new top-level domain (Sprint 1+2) — `commercial-skills` orchestrator + `pricing-strategist` (Van Westendorp PSM) + 7 sub-skills | `CHANGELOG.md` v2.8.0 + `commercial/skills/` | NET-NEW pricing/deal/RFP domain. **Not aligned with our runtime focus; PRIO-1 informational only.** |
| 1 | `SKILL-AUTHORING-STANDARD.md` — formal template with: `description`, `license: MIT`, `metadata: {version, author, category, updated}` | `SKILL-AUTHORING-STANDARD.md` lines 1-30 | NET-NEW formalized SKILL.md template. Every skill in repo follows it; provides discovery + author + version + category + updated-date fields beyond CCBP's 15-field schema. **PRIO-1 pattern adoption candidate**: could cite as `SKILL.md frontmatter beyond CCBP-15` reference in our `.claude/skills/*/SKILL.md` authoring. |
| 1 | `context: fork` pattern used heavily — orchestrator → child skills via fork-context isolation | multiple skills (e.g. `business-operations-skills`, `vendor-management`) | NET-NEW orchestration pattern: chain skills without polluting parent context using forked subagent context. **Aligns with `superpowers:dispatching-parallel-agents` pattern. PRIO-1 informational.** |
| 2 | `SKILL_PIPELINE.md` — Intent → Research → Draft → Eval → Iterate → Compliance → Package → Deploy → Verify → Rollback-Ready | `SKILL_PIPELINE.md` lines 1-30 | NET-NEW: explicit 10-step skill production pipeline. Uses Tessl CLI + ClawHub CLI + Anthropic Skill Creator. **PRIO-2 informational** — could anchor our skill-creator workflow. |
| 2 | `STORE.md` — commercial distribution (Stan Store, Gumroad packs $49 each) | `STORE.md` | NET-NEW pattern: skills shipped as commercial bundles ($49 Indie Hacker Pack / $49 Engineering Lead Pack / $39 Agency Pack). Pattern is operator-strategic, not technical. PRIO-2. |
| 2 | Erlang-C queueing math (`capacity-planner` skill) | `business-operations/skills/capacity-planner/SKILL.md` | Empirically-anchored math: Erlang 1909, Little 1961, Hopp & Spearman, Kingman, ITIL. Could cite as math-anchor reference. PRIO-2. |
| 2 | Van Westendorp Price Sensitivity Meter (PSM) — full implementation: OPP/IDP/PMC/PME + RAP + monotonicity screening + N<30 warning | `commercial/skills/pricing-strategist/SKILL.md` | NET-NEW math-anchored pricing skill. **Not aligned with our runtime focus.** PRIO-2 informational only. |
| 2 | 5W2H + SOC2/HIPAA/ISO13485/GDPR/SOX overlay pattern in `knowledge-ops` | `business-operations/skills/knowledge-ops/SKILL.md` | Regulatory-overlay pattern — could inform compliance-aware skill design. PRIO-2 informational. |
| 2 | `AUDIT_REPORT.md` — repo-level audit/quality artifact | `AUDIT_REPORT.md` | Self-audit pattern. PRIO-2 informational. |
| 2 | `tessl.json` — Tessl CLI compliance config | `tessl.json` | NET-NEW tool: Tessl CLI for skill compliance validation. PRIO-2 — could investigate as alternative to our `compliance-os` skills. |
| 3 | 16 top-level domains; 729 SKILL.md files total | repo structure | Repo SIZE: **most-skills-shipping-repo** we've audited. Catalog scale is the leverage point. PRIO-3 informational. |
| 3 | `c-level-advisor/` domain — chief-ai-officer-advisor / chief-customer-officer-advisor / chief-data-officer-advisor / executive-mentor | `c-level-advisor/` | NET-NEW executive-coaching skill cluster. PRIO-3. |
| 3 | `ra-qm-team/` — regulatory affairs / quality management | `ra-qm-team/` | Medical-device regulation domain. PRIO-3. |
| 3 | `eval-workspace/` — eval-driven dev workspace | `eval-workspace/` | Possible cross-cite for our `harness/eval_harness.py`. PRIO-3. |
| 3 | `megaprompts/` directory | `megaprompts/` | Large prompt artifacts. PRIO-3. |
| 4 | `assets/`, `media/` (for marketing materials) | `assets/`, `media/` | Marketing pattern. PRIO-4. |
| 4 | `documentation/` + `docs/` + `templates/` (3-tier doc structure) | top-level | Doc hierarchy. PRIO-4. |
| 5 | `pyproject.toml` + `requirements-dev.txt` | top-level | Python dev tooling for skill linting. PRIO-5. |

## STALE-IN-UPSTREAM
- W318 baseline install_score 4.21 used pre-v2.8.0 surface area; updated v2.8.0 adds 2 entire new top-level domains (business-operations + commercial). For pure technical-engineering scope our install would cherry-pick `engineering/` only (~30 skills, not all 729). **Re-litigate install_score under cherry-pick scoping.**

## HARNESS-FIT
- Decision: T2 STAGED-PILOT HOLD (current); v2.8.0's new domains EXPAND surface area but most are non-engineering (BizOps, Commercial, RA-QM). **Cherry-pick `engineering/` + `productivity/` + `engineering-team/` only** to keep T2-VENDOR-FORK scope manageable.
- Action W320 candidates:
  1. Re-audit install_score for v2.8.0 with cherry-picked scope (`engineering/` + `productivity/` + `engineering-team/`)
  2. Adopt `SKILL-AUTHORING-STANDARD.md` template fields (license + metadata.version + metadata.author + metadata.category + metadata.updated) for our `.claude/skills/*/SKILL.md` authoring
  3. Document `context: fork` pattern as cross-cite for `superpowers:dispatching-parallel-agents`
- License: MIT (skills declare `license: MIT` in their frontmatter)
- Single-org bus-factor risk (D16/D21 dims per sca-v7.1): **HIGH** — single maintainer `alirezarezvani` accounts for all releases (`alirezarezvani-patch-*`, `alirezarezvani/dev`, `alirezarezvani/main`); no second-author commits visible in HEAD-relative recent log. **D16/D21 likely floors-at-1.**

## License
MIT (per SKILL-AUTHORING-STANDARD.md frontmatter convention + LICENSE file)
