# Wave 156 Fire 1: Plugin Marketplace Deep Audit
**Agent J | 2026-05-12**

## Executive Summary
Deep audit of 12 installed plugin marketplaces in `claude-sota-installed`. Total inventory: **847 skills** across 11 active marketplaces (claude-community is empty). **ECC dominates** with 455 skills + 48 agents + 68 commands + 45 hooks. Significant **consolidation opportunity** detected: 5 marketplaces provide overlapping code-review/quality skills.

---

## Marketplace Inventory

| Marketplace | Skills | Agents | Commands | Hooks | Status |
|---|---|---|---|---|---|
| everything-claude-code | 455 | 48 | 68 | 45 | **ACTIVE** (v2.0.0-rc.1) |
| knowledge-work-plugins | 181 | 0 | 0 | 14 | **ACTIVE** |
| claude-for-financial-services | 117 | 0 | 0 | 0 | **ACTIVE** |
| addy-agent-skills | 22 | 4 | 0 | 2 | **ACTIVE** (Addy Osmani/Google) |
| claude-plugins-official | 28 | 0 | 0 | 1 | **ACTIVE** (15 external integrations) |
| context-mode | 12 | 0 | 0 | 0 | **ACTIVE** (mksglu) |
| anthropic-agent-skills | 18 | 0 | 0 | 1 | **ACTIVE** (Anthropic official) |
| healthcare | 3 | 0 | 0 | 0 | **MINIMAL** (3 skills) |
| life-sciences | 6 | 0 | 0 | 0 | **MINIMAL** (6 skills) |
| openai-codex | 3 | 0 | 0 | 0 | **MINIMAL** (3 skills, legacy) |
| claude-community | 0 | 0 | 0 | 0 | **EMPTY** (remove candidate) |
| **TOTAL** | **847** | **52** | **68** | **63** | |

---

## Primary Value-Add Axis Per Marketplace

### 1. **everything-claude-code (ECC) — Agent Execution & Multi-Execute Workflows**
- **Value axis**: multi-execute workflows, agent introspection, verification loops, documentation-driven dev
- **Top skill families** (sampled): agent-introspection-debugging, multi-execute, verification-loop, dmux-workflows, eval-harness, strategic-compact, security-review, tdd-workflow, mcp-server-patterns, api-design, backend-patterns, frontend-patterns
- **Coverage**: DevOps, AI/Agent patterns, content generation, research, investor materials
- **Signal**: Heavy citation in claude-sota rules (canonical.md, agent-harness-fit-verification.md, codex-t1-* rules)

### 2. **knowledge-work-plugins (Anthropic) — Horizontal Domain Stacks**
- **Value axis**: cross-functional domain expertise (13 domains × 3-50 skills each)
- **Domains**: product-management, engineering, marketing, sales, design, data, finance, legal, HR, customer-support, enterprise-search, pdf-viewer, bio-research, partner-built, cowork-plugin-management
- **Coverage**: Enterprise workflow automation for PM, sales, eng, design, data roles
- **Signal**: 181 skills, second-largest portfolio; partner integrations (Asana, Apollo, S&P Global)

### 3. **claude-for-financial-services (Anthropic) — Vertical Domain Hardening**
- **Value axis**: Financial-industry-specific compliance, reporting, reconciliation, audit
- **Coverage**: 8 internal verticals + 2 partners (LSEG, S&P Global); vault-grade finance rules
- **Signal**: Minimal cross-marketplace mention; specialized ROI for finance orgs only

### 4. **addy-agent-skills (Addy Osmani/Google) — Engineering Phase Gates**
- **Value axis**: Code quality enforcement across full SDLC (pre-commit → launch)
- **Skills**: code-review-and-quality, ci-cd-and-automation, deprecation-and-migration, documentation-and-adrs, git-workflow-and-versioning, performance-optimization, security-and-hardening, shipping-and-launch, spec-driven-dev, test-driven-dev, source-driven-dev, doubt-driven-dev, api-and-interface-design, browser-testing, context-engineering
- **Signal**: 22 skills, 4 agents, 2 hooks; curated eng discipline (pre-commit quality gates)

### 5. **claude-plugins-official (Anthropic) — External Tool Integrations**
- **Value axis**: Vendor ecosystem bridges (GitHub, GitLab, Asana, Discord, Firebase, Linear, Terraform, Playwright, iMessage, Telegram, Laravel, Greptile, Serena)
- **Coverage**: 28 skills wrapping 15 external APIs
- **Signal**: Shallow marketplace; value is in *breadth of connectors*, not depth

### 6. **context-mode (mksglu) — Codebase Context Extraction**
- **Value axis**: Context-window optimization for large codebases
- **Skills**: ctx-doctor, ctx-insight, ctx-purge, ctx-stats, ctx-upgrade, context-mode, tdd, grill-me, grill-with-docs
- **Signal**: 12 specialized skills; niche problem (context bloat mitigation)

### 7. **anthropic-agent-skills (Anthropic Official) — Agent Scaffolding**
- **Value axis**: Agent framework patterns, skill composition
- **Coverage**: 18 skills; agent SDK patterns, subagent harnesses
- **Signal**: Foundational for agent developers

### 8. **healthcare** — Minimal
- 3 skills; likely legacy placeholder

### 9. **life-sciences** — Minimal
- 6 skills; specialty domain, low adoption

### 10. **openai-codex** — Legacy
- 3 skills; OpenAI-era artifacts, candidates for deprecation

### 11. **claude-community** — EMPTY
- 0 skills; remove this directory

---

## Consolidation Opportunities (Overlapping Skill Families)

| Skill Family | Marketplaces | Overlap Type |
|---|---|---|
| **Code Review & Quality** | ECC, addy-agent, claude-plugins-official, knowledge-work (eng domain), context-mode | **CRITICAL DUPLICATION** |
| **Documentation & ADR** | ECC, addy-agent, knowledge-work (eng) | **DUPLICATION** |
| **Git Workflow & Versioning** | ECC, addy-agent, anthropic-agent, context-mode, knowledge-work (eng) | **HIGH REDUNDANCY** |
| **Performance Optimization** | ECC, addy-agent, knowledge-work (data), life-sciences | **MODERATE OVERLAP** |
| **Deprecation & Migration** | ECC, addy-agent, knowledge-work (eng), anthropic-agent | **CONSOLIDATION CANDIDATE** |
| **Security & Hardening** | ECC, addy-agent, knowledge-work (eng) | **MODERATE OVERLAP** |

### Recommended Consolidation Actions
1. **Merge addy-agent → ECC**: Addy's engineering-phase skills are a strict subset of ECC's more general engineering support. Consolidate into ECC under `engineering:*` namespace.
2. **Claude-plugins-official → flatten into knowledge-work**: External integrations (GitHub, Asana, etc.) should be discoverable in knowledge-work's `partner-built` domain, not a separate marketplace.
3. **Context-mode → specialized skill under knowledge-work**: Context optimization is a knowledge-work problem (enterprise search, codebase analysis); promote from standalone to `enterprise-search:context-optimization`.
4. **Deprecate openai-codex**: Legacy OpenAI artifacts; no active maintenance signal. Migrate high-value skills to ECC or remove.
5. **Deprecate claude-community**: Empty; remove from disk.
6. **Healthcare & life-sciences → vertical-plugins concept**: Rather than standalone marketplaces, nest vertical domain skills under a `verticals/healthcare/` structure in knowledge-work, similar to the `bio-research/` domain model.

---

## Gap Analysis (Missing Value-Adds)

| Category | Finding |
|---|---|
| **Observability & Monitoring** | **GAP**: No marketplace provides specialized observability skills (APM, tracing, metrics, alerting). |
| **Database & Data Warehouse** | **PARTIAL**: knowledge-work/data has SQL + dashboards, but no specialized DB schema design, query optimization, or DW migration skills. |
| **Infrastructure as Code (IaC)** | **MINIMAL**: claude-plugins-official has Terraform, but no Pulumi, CloudFormation, or Kubernetes Helm skills. |
| **API Design & Testing** | **COVERED**: addy-agent (api-and-interface-design), ECC (api-design), knowledge-work (sales/eng). |
| **Retail & E-Commerce** | **GAP**: No vertical domain skills for retail ops, inventory, pricing, or e-commerce workflows. |
| **Legal Contract Analysis** | **PARTIAL**: knowledge-work/legal covers general legal ops, but no specialized contract clause extraction, NDA screening, or deal-risk assessment. |
| **HR Compliance & Payroll** | **PARTIAL**: knowledge-work/human-resources exists, but no specialized HRIS integration, leave management, or payroll audit skills. |
| **Supply Chain & Logistics** | **GAP**: No skills for order fulfillment, warehouse management, supplier risk, or logistics optimization. |
| **Regulatory Compliance (Non-Finance)** | **GAP**: No HIPAA, GDPR, SOC2, or industry-specific compliance frameworks (outside finance & healthcare stubs). |
| **ML/AI Model Training & Evaluation** | **PARTIAL**: ECC has eval-harness, but no MLOps, hyperparameter tuning, or model registry skills. |

---

## Usage Signal: Top-5 Most-Cited Marketplaces in claude-sota

Based on grep scan of `.claude/rules/`, `.claude/agents/`, `.claude/commands/`:

1. **everything-claude-code**: 230+ citations (SOTA authority references, upstream parity probes)
2. **knowledge-work-plugins**: 45+ citations (domain-specific rules, partner integrations)
3. **anthropic-agent-skills**: 12+ citations (agent framework patterns)
4. **claude-plugins-official**: 8+ citations (external tool references)
5. **addy-agent-skills**: 3+ citations (engineering discipline rules)

**Interpretation**: ECC is the de-facto standard for claude-sota's rule system. Knowledge-work provides horizontal domain coverage. Addy/context-mode are niche specialists.

---

## Top-5 Most-Used Skill Families (Estimated by Marketplace Share & Domain Frequency)

| Skill Family | Estimated Frequency | Primary Marketplace |
|---|---|---|
| Code Review & Quality Assurance | **HIGH** | ECC + addy-agent |
| Workflow Automation & Multi-Execute | **HIGH** | ECC |
| Product Management & Roadmapping | **MEDIUM-HIGH** | knowledge-work |
| Data Analysis & Visualization | **MEDIUM-HIGH** | knowledge-work |
| Engineering Phase Gates (test, deploy, launch) | **MEDIUM** | addy-agent + ECC |
| Agent Introspection & Debugging | **MEDIUM** | ECC |
| Compliance & Audit | **MEDIUM** | claude-for-financial-services |
| Sales Enablement & Pipeline | **MEDIUM** | knowledge-work |
| Enterprise Search & Context Extraction | **LOW-MEDIUM** | knowledge-work + context-mode |

---

## Underutilized Marketplace Areas (Candidates for Sunsetting or Consolidation)

| Area | Status | Recommendation |
|---|---|---|
| **openai-codex** | 3 skills, no updates since 2024 | **DEPRECATE**: Migrate high-value skills to ECC, remove marketplace. |
| **claude-community** | 0 skills, empty | **REMOVE**: No content; delete directory. |
| **healthcare** | 3 skills, isolated from knowledge-work | **CONSOLIDATE**: Merge into knowledge-work/healthcare vertical. |
| **life-sciences** | 6 skills, separate from bio-research | **CONSOLIDATE**: Merge into knowledge-work/bio-research. |
| **context-mode** | 12 skills, single-author (mksglu) | **INTEGRATE**: Move ctx-* skills into knowledge-work/enterprise-search as `context-optimization` skills. |
| **claude-plugins-official (integrations)** | 28 skills, breadth > depth | **FLATTEN**: Move external integrations into knowledge-work/partner-built, reducing discovery friction. |

---

## ROI Summary Table

| Marketplace | Total Assets | Installed Fidelity | Maintenance Load | Strategic Priority |
|---|---|---|---|---|
| **ECC** | 455 skills + 48 agents + 68 cmds + 45 hooks | **FULL** | **HIGH** (actively maintained, upstream) | **TIER-1 (CORE)** |
| **Knowledge-Work** | 181 skills + 14 hooks (15 domains) | **FULL** | **MEDIUM** (Anthropic official) | **TIER-1 (CORE)** |
| **Claude-for-Financial** | 117 skills | **FULL** | **MEDIUM** (vertical-specific) | **TIER-2 (OPTIONAL)** |
| **Addy-Agent** | 22 skills + 4 agents + 2 hooks | **PARTIAL** (specialized) | **LOW** (curated, static) | **TIER-2 (OPTIONAL)** |
| **Claude-Plugins-Official** | 28 skills + 1 hook | **PARTIAL** (breadth, shallow) | **MEDIUM** | **TIER-2 (OPTIONAL)** |
| **Anthropic-Agent-Skills** | 18 skills + 1 hook | **FULL** | **LOW-MEDIUM** (framework) | **TIER-1 (CORE for agents)** |
| **Context-Mode** | 12 skills | **PARTIAL** (niche) | **LOW** | **TIER-3 (NICHE)** |
| **Healthcare** | 3 skills | **MINIMAL** | **MINIMAL** | **TIER-3 (DEPRECATE)** |
| **Life-Sciences** | 6 skills | **MINIMAL** | **MINIMAL** | **TIER-3 (CONSOLIDATE)** |
| **OpenAI-Codex** | 3 skills | **LEGACY** | **NONE** | **TIER-4 (DEPRECATE)** |
| **Claude-Community** | 0 skills | **EMPTY** | **NONE** | **TIER-4 (REMOVE)** |

---

## MARKETPLACE AUDIT COMPLETE
Generated 2026-05-12 by Agent J, Wave 156 Fire 1.
Next: Present to orchestrator for consolidation decision matrix.
