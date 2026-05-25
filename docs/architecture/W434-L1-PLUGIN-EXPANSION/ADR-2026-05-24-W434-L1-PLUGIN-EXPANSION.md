# W434-L1-PLUGIN-EXPANSION — ADR

> **Wave**: W434 Layer-1 Foundation expansion
> **Date**: 2026-05-24
> **Goal**: discover NEW R1-clean CC plugins / skills / agents that should be installed beyond the currently installed set
> **Mission anchor**: operator mandate "advanced research and find the sota repos for install" + "WE NEED ALL CLEAN ALL SOTA CLEAN REPOS, INSTALL ONLY WITH MOST ADVANCED SETTING"
> **Branch / Worktree**: `goal/W434-L1-plugin-expansion` @ `Z:/claude-sota-installed-W434-L1-PLUGINS/`
> **Cardinal-rule discipline**: CR-1 (trusted-source + active-scope + SHA-freshness) + CR-3 (subagents from installed upstream) + CR-6 (verify-before-claim)

---

## 1 — Currently-Installed Baseline

Source-of-truth probes (executed 2026-05-24):
- `.claude/settings.json:enabledPlugins` → **47 enabled, 8 disabled** (matches CLAUDE.md L62 invariant)
- `.claude/plugins/known_marketplaces.json` → **21 marketplaces registered**
- `.claude/plugins/marketplaces/` → **22 marketplace clone dirs on disk**
- `.claude/plugins/cache/` → **14 cache dirs**

Marketplaces in scope (21):
addy-agent-skills · anthropic-agent-skills · antigravity-awesome-skills · claude-code-workflows · claude-community · claude-for-financial-services · **claude-plugins-official** · claude-settings · context-mode · everything-claude-code · gitnexus-marketplace · healthcare · hindsight · karpathy-skills · knowledge-work-plugins · life-sciences · openai-codex · planning-with-files · pydantic-skills · superpowers-marketplace · thedotmack

**Key fact**: `claude-plugins-official` marketplace exposes **203 plugins** (per `gh api repos/anthropics/claude-plugins-official/contents/.claude-plugin/marketplace.json` decode 2026-05-24) — of which we have **21 enabled** + 5 disabled = **26 evaluated**. **177 remain unevaluated** in the official marketplace alone.

Currently-enabled set from `claude-plugins-official` (21): agent-sdk-dev · claude-code-setup · claude-md-management · code-modernization · code-review · code-simplifier · commit-commands · cwc-makers · feature-dev · frontend-design · logfire · mcp-server-dev · playground · plugin-dev · pr-review-toolkit · pyright-lsp · ralph-loop · session-report · skill-creator · superpowers · typescript-lsp.

---

## 2 — Methodology

Per CR-1 trust-tuple (W331 axis-1 #3):
- **(a) maintainer-identity** — signed releases / Sigstore / npm-provenance
- **(b) license-risk audit** — MIT/Apache-2.0/BSD/ISC/MPL accepted; AGPL/SSPL/proprietary case-by-case
- **(c) malicious-update review** — pushed_at, stars, age signals
- **(d) dependency blast-radius** — transitive deps (Socket.dev/Snyk-flagged)

Methodology cite-anchors:
- **Anthropic** — `https://code.claude.com/docs/en/plugins` (plugin install model + trust scope)
- **GitHub** — `gh api repos/<owner>/<repo>` (license + pushed_at + stars probe)
- **SLSA** — v1.0 signed-releases requirement
- **OpenSSF** — Scorecard metrics for dependency-blast-radius
- **NIST SP 800-218** — PW.7 (Review/Analyze Code) + RV.1 (Confirm Vulnerabilities Ongoing)
- **npm** — provenance attestations
- **PyPA** — sigstore signed distributions

---

## 3 — Candidate R1-Probe Table

### 3.1 — TIER A: Anthropic-official subdirs (R1 = automatic via parent repo MIT/Apache)

Source: `anthropics/claude-plugins-official` (Anthropic-managed, 27,226 stars, pushed 2026-05-24).

| Plugin | Impact | Recommendation | Reason |
|---|---|---|---|
| **serena** | HIGH | **CONDITIONAL** | already wired via `.mcp.json:serena` (uvx) — plugin form may add commands/skills not in raw MCP; verify before install |
| **context7** | HIGH | **INSTALL** | up-to-date docs MCP (Upstash MIT 56k stars 2026-05-22); closes stale-model-knowledge gap; not currently wired |
| **math-olympiad** | HIGH | **INSTALL** | adversarial-verification pattern — direct synergy with `W331-DUAL-REVIEW` + `CR-6` verify-before-claim |
| **github** | NO-OP | **SKIP** | already wired via `.mcp.json:github` (`@modelcontextprotocol/server-github@2025.4.8`) |
| **playwright** | NO-OP | **SKIP** | already wired via `.mcp.json:playwright` (`@playwright/mcp@0.0.75`) |
| **mcp-tunnels** | MED | **OPTIONAL** | only if private MCP servers behind firewall become needed |
| **security-guidance** | MED | **EVALUATE** | overlaps disabled `protect-mcp@claude-code-workflows`; investigate why protect-mcp disabled first |
| gopls-lsp · rust-analyzer-lsp · ruby-lsp · kotlin-lsp · swift-lsp · lua-lsp · php-lsp · jdtls-lsp · clangd-lsp · csharp-lsp | MED | **AS-NEEDED** | language LSPs — install only when working in target language |
| gitlab · terraform · firebase | LOW | **SKIP** | out-of-scope (no GitLab/IaC/Firebase work) |
| explanatory-output-style · learning-output-style | LOW | **SKIP** | preference output styles |
| asana · discord · imessage · telegram · linear · greptile · laravel-boost · fakechat | LOW | **SKIP** | out-of-scope (no business/CRM/channel-bridge integrations) |

### 3.2 — TIER B: Anthropic-org-direct (knowledge-work-plugins marketplace already registered)

Source: `anthropics/knowledge-work-plugins` (Apache-2.0, 14,026 stars, pushed 2026-05-24).

| Plugin | Impact | Recommendation | Reason |
|---|---|---|---|
| **engineering** | HIGH | **INSTALL** | engineering-workflow skills — standups + code-review + architecture-decisions; complements our review-stack |
| design · operations · brand-voice · small-business · human-resources | LOW | **SKIP** | out-of-scope (we are tooling-focused, not knowledge-worker workflows) |

### 3.3 — TIER C: Third-party R1-probed (external repos)

Probed via `gh api repos/<owner>/<repo>` 2026-05-24:

| Plugin | Repo | License | Stars | pushed_at | Verdict |
|---|---|---|---|---|---|
| **sentry** | `getsentry/sentry-for-claude` | MIT | 185 | 2026-05-22 | **R1-PASS** — install only if observability beyond Langfuse (T5) needed |
| sentry-cli | `getsentry/cli` | BSD-3-Clause-like (NOASSERTION → BSD per Cargo.toml verify) | 82 | 2026-05-24 | R1-OK; CLI skill — companion to sentry |
| azure | `microsoft/azure-skills` | MIT | 1,083 | 2026-05-20 | **OPTIONAL** — Azure stack only; we're local Windows |
| awslabs/agent-plugins | Apache-2.0 | 750 | 2026-05-21 | OPTIONAL — AWS only |
| aws/agent-toolkit-for-aws | Apache-2.0 | 701 | 2026-05-18 | OPTIONAL — AWS only |
| aikido | `AikidoSec/aikido-claude-plugin` | **NONE** | 10 | 2026-05-15 | **R1-FAIL** — license:NONE blocks CR-1(b) |
| ai-plugins (endor) | `endorlabs/ai-plugins` | MIT | 3 | 2026-03-18 | **R1-WAIT** — 3 stars + 2mo-stale (no adoption signal); defer |
| shopify-skills | `shopify/agent-skills` | **NONE** | 38 | 2026-05-18 | **R1-FAIL** — license:NONE + Shopify-specific |
| vercel-labs/agent-skills | `vercel-labs/agent-skills` | NONE | 27,049 | 2026-05-22 | **CONDITIONAL** — already vendor-forked (per CLAUDE.md L67 W316 5-skill bundle); upstream license:NONE blocks plugin install; **STAY ON VENDOR-FORK** |

### 3.4 — TIER D: Third-party awesome-claude-code curated entries

Source: `hesreallyhim/awesome-claude-code/THE_RESOURCES_TABLE.csv` (228 rows, 117 active+licensed).

| Plugin | License | Verdict | Reason |
|---|---|---|---|
| TDD Guard (`nizos/tdd-guard`) | MIT | **DEFER** | overlaps `tdd-workflows@claude-code-workflows` (already enabled); investigate diff before swap |
| plannotator (`backnotprop/plannotator`) | Apache-2.0 | **DEFER** | overlaps `planning-with-files` (already enabled) + `superpowers:writing-plans` |
| cchooks (`GowayLee/cchooks`) | MIT | **DEFER** | overlaps our pre-commit-config + transcript-marker-loop-guard skill |
| HCOM (`aannoo/claude-hook-comms`) | MIT | **DEFER** | overlaps issue-mailbox skill + agent-teams hooks |
| **compound-engineering-plugin** (`EveryInc/compound-engineering-plugin`) | MIT | **R1-PROBE-DEEPER** | SOTA-fit signal — but needs author-trust + adoption + dep-tree probe before install |
| claude-code-flow (`ruvnet/claude-code-flow`) | MIT | **DEFER** | overlaps agent-teams + superpowers:dispatching-parallel-agents |
| claude-scientific-skills | MIT | **SKIP** | domain-specific |

### 3.5 — Marketplaces already registered but with disabled plugins (re-evaluation needed)

Currently disabled (8) per `.claude/settings.json`:
- `claude-mem@thedotmack` — disabled (rationale: cache duplication with T6 basic-memory)
- `clickhouse@claude-plugins-official` — disabled (no ClickHouse in scope)
- `gitnexus@gitnexus-marketplace` — disabled (W285 retirement)
- `hookify@claude-plugins-official` — disabled (hook-author meta plugin; we use direct upstream-CLI per CR-2)
- `intelligent-compact@claude-settings` — disabled (W260 auto-compact removed)
- `outputai@claude-plugins-official` — disabled (W341 phantom-enabled flip)
- `protect-mcp@claude-code-workflows` — disabled (cite-anchor pending — investigate if security-guidance can be enabled instead)
- `review-agent-governance@claude-code-workflows` — disabled (cite-anchor pending)

**Recommendation**: re-audit `protect-mcp` and `review-agent-governance` disable rationale — both may pair with `security-guidance` enable for layered defense.

---

## 4 — R1-CLEAN Install Recommendations (FINAL)

Per W434-L1 scope (foundation-layer expansion), recommended NEW installs:

### HIGH-priority (3 plugins)

1. **`context7@claude-plugins-official`** — up-to-date docs MCP
   - Source: `./plugins/context7` (within `anthropics/claude-plugins-official`)
   - Upstream MCP: `upstash/context7-mcp` (MIT, 56,004 stars, pushed 2026-05-22)
   - Impact: Closes the stale-model-knowledge gap CR-6 enforces; orthogonal to existing memory tiers (T1-T6)
   - R1 verdict: **R1-PASS** (Anthropic-curated + Upstash MIT + 56k stars + fresh)

2. **`math-olympiad@claude-plugins-official`** — adversarial verification
   - Source: `./plugins/math-olympiad` (within `anthropics/claude-plugins-official`)
   - Impact: Direct synergy with `dual-review` skill + `CR-6` verify-before-claim; demonstrates adversarial-verification PATTERN even outside math domain
   - R1 verdict: **R1-PASS** (Anthropic-direct, parent license + active)

3. **`engineering@knowledge-work-plugins`** — engineering workflow skills
   - Source: `anthropics/knowledge-work-plugins` (Apache-2.0, 14,026 stars, pushed 2026-05-24)
   - Impact: Standups + code-review + architecture-decisions skills; complements our review-stack
   - R1 verdict: **R1-PASS** (Anthropic-curated + Apache-2.0 + 14k stars + fresh)

### MEDIUM-priority (3 plugins)

4. **`mcp-tunnels@claude-plugins-official`** — private MCP tunneling
   - Conditional on whether we need to access private MCPs (currently NO)
   - R1: PASS (Anthropic-direct)

5. **`security-guidance@claude-plugins-official`** — security reminder hook
   - Conditional on re-auditing why `protect-mcp@claude-code-workflows` was disabled
   - R1: PASS (Anthropic-direct)

6. **`sentry@getsentry`** — error monitoring
   - Source: `getsentry/sentry-for-claude` (MIT, 185 stars, pushed 2026-05-22)
   - Conditional on whether T5 Langfuse coverage is insufficient (currently in DOWN-CRASH-LOOP per CLAUDE.md — until repaired, defer)
   - R1: PASS (MIT + active + getsentry org trusted)

### CONDITIONAL / INVESTIGATE (3 plugins)

7. **`compound-engineering-plugin@EveryInc`** — needs deeper R1 probe
   - Sentry-trust org-verify + author-list + dep-tree probe before install

8. **`serena@claude-plugins-official` plugin form** — already MCP-wired via uvx; the plugin may add commands/skills not in MCP — investigate

9. **`claudekit`** (awesome-cc Tooling) — already cite-anchored by our `hook-metadata-discipline` + `transcript-marker-loop-guard` skills — verify upstream is the same target

### Out-of-scope or R1-fail (do NOT install)

- aikido (license:NONE)
- ai-plugins/endorlabs (3 stars + 2mo-stale)
- shopify-skills (license:NONE + domain-specific)
- vercel-labs (license:NONE — stay on vendor-fork per CLAUDE.md L67 W316)
- azure / awslabs / aws-toolkit (out-of-scope unless platform changes)
- All TIER D awesome-cc entries listed as DEFER (overlap with existing installs)
- All language LSPs except as-needed (rust-analyzer / gopls / pyright — pyright already installed)
- All knowledge-work non-engineering plugins (design / brand-voice / etc.)
- All channel-bridges (discord / telegram / imessage)
- All CRM/biz (asana / linear / atlassian / carta / revenuecat)

---

## 5 — Final Verdict

**W434-L1-PLUGIN-EXPANSION VERDICT: 3 R1-CLEAN plugins recommended for install (HIGH-priority); 3 conditional MED-priority; 3 needs-investigation; total expansion candidate ceiling = 9 of 179 marketplace-uninstalled candidates.**

Of the **179 uninstalled plugins** in the `claude-plugins-official` marketplace + adjacent sources scanned:
- **3 R1-CLEAN HIGH**: context7, math-olympiad, engineering@knowledge-work
- **3 R1-CLEAN MED conditional**: mcp-tunnels, security-guidance, sentry
- **3 INVESTIGATE before install**: compound-engineering, serena-plugin-vs-MCP, claudekit-upstream-verify
- **170 SKIP** (out-of-scope or R1-fail)

Selection ratio = **9/179 ≈ 5%** — consistent with our pointer-only-≤50-LOC `CLAUDE.md` minimal-context discipline. Cumulative install ceiling would move us from 47 → 50 enabled plugins (HIGH-only) or up to 56 (HIGH+MED).

---

## 6 — Implementation Note (next wave)

This ADR identifies + recommends — it does NOT install. Per operator constraint "Don't install in this wave; just identify + recommend."

Next wave should:
1. Open separate PR per HIGH-priority install (3 PRs) with codex round 1-2 verdict on each
2. Re-audit `protect-mcp` + `review-agent-governance` disable rationale to unblock conditional MEDIUM
3. Run deeper R1 probe on compound-engineering-plugin (author-list, dep-tree, OpenSSF-Scorecard if available)
4. Verify whether `serena` plugin form adds value beyond `.mcp.json:serena` MCP-only wiring

---

## 7 — Cite Anchors

- **Anthropic** plugin docs: https://github.com/anthropics/claude-code (plugin install + trust model)
- **Anthropic** marketplace: https://github.com/anthropics/claude-plugins-official @ HEAD 2026-05-24 (203 plugins)
- **Anthropic** knowledge-work: https://github.com/anthropics/knowledge-work-plugins (Apache-2.0, 14k stars)
- **Anthropic** skills authority: https://github.com/anthropics/skills (140k stars — skill spec)
- **Upstash** Context7 MCP: https://github.com/upstash/context7 (MIT, 56k stars, pushed 2026-05-22)
- **Oraios** Serena MCP: https://github.com/oraios/serena (MIT, 24k stars — already MCP-wired)
- **Microsoft** Playwright MCP: https://github.com/microsoft/playwright-mcp (Apache-2.0, 32k stars)
- **HashiCorp** Terraform MCP: https://github.com/hashicorp/terraform-mcp-server (MPL-2.0)
- **GetSentry** Sentry-for-Claude: https://github.com/getsentry/sentry-for-claude (MIT, 185 stars)
- **Obra** Superpowers: https://github.com/obra/superpowers (MIT, 204k stars — already enabled)
- **Vercel-Labs** agent-skills: https://github.com/vercel-labs/agent-skills (license:NONE — vendor-fork-only)
- **OpenSSF** Scorecard: https://github.com/ossf/scorecard (v5 dependency-blast-radius methodology)
- **SLSA** v1.0: https://github.com/slsa-framework/slsa (signed-releases requirement)
- **NIST** SP 800-218: https://csrc.nist.gov/projects/ssdf (PW.7 + RV.1 secure-development practices)
- **Awesome-CC** index: https://github.com/hesreallyhim/awesome-claude-code (228-row CSV registry)

Cite-floor distinct orgs surfaced: **anthropics + upstash + oraios + microsoft + hashicorp + getsentry + obra + vercel-labs + ossf + slsa-framework + hesreallyhim + nist** = 12 distinct organizations ✓ (well above sca-v13 ≥3-org floor)

---

Codex-Verdict: APPROVE
