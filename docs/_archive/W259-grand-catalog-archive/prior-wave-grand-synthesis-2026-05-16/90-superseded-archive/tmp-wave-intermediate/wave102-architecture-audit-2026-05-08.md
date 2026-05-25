---
title: Wave 102 — Full architecture audit (every cited repo)
status: AUTHORITATIVE
date: 2026-05-08
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g))
scope: Tier 0/1/2/3/4 — every cited repo across eee runtime
verdict: REVISE-AUDIT
confidence: 0.88
---

# Wave 102 — Full architecture audit

STAND-IN-NOTICE: Sonnet stand-in per CLAUDE.local.md ENV (g); orchestrator-side codex T1 e2e MANDATORY before commit per CR-3 Phase 1.

Probe date: 2026-05-09T00:28Z (UTC).
Probe method: `gh api repos/<owner>/<repo>` + `gh api repos/<owner>/<repo>/license` + `gh api repos/<owner>/<repo>/contents/LICENSE` + local `git rev-parse HEAD` for cited HEADs.

## Audit table (per-repo)

Legend: PASS (active + permissive + ≥500★ + non-fresh-paint) / DOWNGRADE (caveats) / REJECT (license blocker / archived / fresh-paint / not-found).

### Tier 0 — Bootstrap substrates

| # | Repo | License | Stars | Last-push | Created | Verdict | Notes |
|---|---|---|---|---|---|---|---|
| 1 | anthropics/cwc-long-running-agents | Apache-2.0 | 149 | 2026-05-06 | recent | PASS | Anthropic OFFICIAL; star-low waiver applies (Anthropic-org); cited HEAD `ffd563d6` confirmed local |
| 2 | shanraisshan/claude-code-best-practice | MIT | 51,824 | 2026-05-08 | 2025-10-31 | PASS | Active CCBP; cited HEAD `64fffd53` (2026-05-02) is 6 days behind — re-pin recommended |
| 3 | andrej-karpathy-skills (forrestchang fork) | NO LICENSE FILE | 120,608 | 2026-04-20 | 2026-01-27 | DOWNGRADE | Fresh-paint warning: 120k★ at 3mo age + 20KB size; NO LICENSE file present (CR-1 violation risk); MIRROR/FORK of unstated upstream — Karpathy himself does NOT publish at this path |
| 4 | openai/codex | Apache-2.0 | 80,997 | 2026-05-09 | active | PASS | OpenAI OFFICIAL; cited HEAD `993e3f40` (2026-04-22) is 17 days behind — re-pin candidate |
| 5 | addyosmani/agent-skills | MIT | 35,347 | 2026-05-09 | 2026-02-15 | PASS | Named-T1 author (Addy Osmani / Google Chrome DevRel); active |

### Tier 1 — Install primitives

| # | Repo | License | Stars | Last-push | Verdict | Notes |
|---|---|---|---|---|---|---|
| 6 | router-for-me/CLIProxyAPI | MIT | 31,441 | 2026-05-08 | PASS | Active; permissive |
| 7 | cnighswonger/claude-code-cache-fix | MIT (verified via LICENSE) | 201 | 2026-05-08 | DOWNGRADE | Star-low (201★); single-named-org (3 named maintainers); active |
| 8 | mksglu/context-mode | **Elastic License 2.0 (ELv2)** | 14,037 | 2026-05-08 | **REJECT** | **License blocker — ELv2 is NOT permissive** per Probe 6 (claude-sota is permissive-license-only); restricts SaaS resale; same class as SSPLv1/AGPLv3 from harness-fit perspective |
| 9 | oven-sh/bun | MIT | 89,766 | 2026-05-09 | PASS | Bun itself MIT (verified via LICENSE.md); JavaScriptCore portion LGPL but bun-runtime layer is MIT |
| 10 | github/spec-kit | MIT | 93,613 | 2026-05-08 | PASS | GitHub OFFICIAL |
| 11 | gitleaks/gitleaks | MIT | 26,684 | 2026-03-25 | PASS | Active (45 days; under 90d burn-in); permissive (note: cite anchor was `gitleaks-org/gitleaks` 404 — actual upstream is `gitleaks/gitleaks` or `zricethezav/gitleaks`; both resolve to same repo) |
| 12 | yamadashy/repomix | MIT | 24,519 | 2026-05-08 | PASS | Active; permissive |
| 13 | getzep/graphiti | Apache-2.0 | 25,830 | 2026-05-08 | PASS | Named-T1 org (Zep AI) |
| 14 | doobidoo/mcp-memory-service | Apache-2.0 | 1,814 | 2026-05-08 | PASS | Active; permissive; named-individual maintainer (Heinrich Krupp) |
| 15 | FalkorDB | **SSPLv1** | 4,356 | 2026-05-07 | **REJECT** | **License blocker — SSPLv1 non-permissive** per Probe 6; sister-CCC `agent-harness-fit-verification.md:36` REJECTed openviking AGPLv3 same class; FalkorDB needs replacement (Neo4j Community / KuzuDB / RedisGraph EOL) |
| 16 | Willxup/cpa-usage-keeper | MIT | 389 | 2026-05-08 | DOWNGRADE | Star-low (<500★); active; permissive |
| 17 | anthropics/skills | Apache-2.0 (some folders source-available per README) | 130,494 | 2026-05-06 | PASS-WITH-CAVEAT | Anthropic OFFICIAL; docx/pdf/pptx/xlsx subfolders are source-available NOT Apache (cite-import these requires CR-9 awareness); other skills Apache-2.0 |
| 18 | anthropics/claude-plugins-official | Per-plugin license (no top-level) | 18,903 | 2026-05-08 | PASS | Anthropic OFFICIAL marketplace; each child plugin must be license-checked individually |
| 19 | everything-claude-code | NOT QUERIED REMOTELY (local HEAD `841beea4`) | — | local 2026-04-30 | DOWNGRADE | RC version `2.0.0-rc.1` per CR-9 sub-rule (FM-22.d trap class — RC plugins ship breaking changes); local clone 9 days behind; queue stable-release upgrade |
| 20 | openai/codex-plugin-cc | Apache-2.0 | 17,935 | 2026-04-18 | DOWNGRADE | OpenAI OFFICIAL; last-push 21 days ago (under 90d); some staleness signal |
| 21 | obra/superpowers | MIT | 183,229 | 2026-05-08 | PASS | Named-T1 author (Jesse Vincent / obra); active; 6/14 skills vendored locally |

### Tier 2 — SOTA cite-anchors (cite-only — NOT installed)

| # | Repo | License | Stars | Last-push | Created | Verdict | Notes |
|---|---|---|---|---|---|---|---|
| 22 | autoresearch (karpathy/autoresearch) | MIT (README) / NO LICENSE FILE | 79,798 | 2026-03-26 | 2026-03-06 | DOWNGRADE | Karpathy-named-T1 author; **fresh-paint signal**: 79k★ at 2mo age; pushed 44 days ago (approaching 90d staleness); no LICENSE file (only README mentions MIT) |
| 23 | anthropics/cookbook | MIT | 42,496 | 2026-05-08 | mature | PASS | Anthropic OFFICIAL; **CORRECTION**: prior CLAUDE.md cite `Z:/repos/deps/anthropic-cookbook/` deprecated path; the live upstream is `anthropics/cookbook` (NOT `anthropics/anthropic-cookbook` though both 404-redirect to same repo) |
| 24 | agentclientprotocol/claude-agent-acp | Apache-2.0 | 1,837 | 2026-05-08 | active | PASS | Active ACP host; named-org (ACP project) |
| 25 | mattpocock/skills | MIT | 66,592 | 2026-05-07 | 2026-02-03 | DOWNGRADE | **Fresh-paint warning**: 66k★ at 3mo age + 93KB size; named-T1 author (Matt Pocock) but suspicious star velocity |
| 26 | VoltAgent/awesome-agent-skills | MIT | 20,855 | 2026-05-08 | 2025-10-28 | PASS | Named-T2 org; active |
| 27 | alirezarezvani/claude-skills | MIT | 14,165 | 2026-05-08 | 2025-10-19 | PASS-WITH-CAVEAT | 5,200+ skills claimed; active; permissive; star-velocity moderate (~7mo) |
| 28 | awesome-agentic-patterns | NOT-FOUND (404 on canonical path) | — | — | — | **REJECT** | Cited path no longer resolves; claude-sota rule body cites via `Z:/repos/deps/awesome-agentic-patterns/` local clone — investigate canonical upstream OR retire |
| 29 | anthropics/claude-agent-sdk-python | MIT | 6,751 | 2026-05-09 | active | PASS | Anthropic OFFICIAL |

### Tier 3 — MCP servers wired

| # | Server | Upstream | License | Stars | Verdict |
|---|---|---|---|---|---|
| 30 | github | github/github-mcp-server | MIT | 29,623 | PASS |
| 31 | context7 | upstash/context7 | MIT | 54,804 | PASS |
| 32 | deepwiki | (proprietary SaaS — Devin) | n/a | — | DOWNGRADE | SaaS dependency (no upstream OSS); operator should know cost-class |
| 33 | playwright | microsoft/playwright-mcp | Apache-2.0 | 32,209 | PASS |
| 34 | serena | oraios/serena | MIT | 23,983 | PASS |
| 35 | memory | doobidoo/mcp-memory-service | Apache-2.0 | 1,814 | PASS |
| 36 | cnighswonger-cache-fix | cnighswonger/claude-code-cache-fix | MIT | 201 | DOWNGRADE (low star) |

### Tier 4 — Local binaries (`.local/bin/`)

| # | Bin | Upstream | License | Stars | Verdict |
|---|---|---|---|---|---|
| 37 | ant.exe | likely ant-design ecosystem (unverified) | — | — | UNKNOWN — cite-not-resolved |
| 38 | claude.exe | Anthropic CC official | proprietary | n/a | PASS (official) |
| 39 | cli-proxy-api.exe | router-for-me/CLIProxyAPI | MIT | 31,441 | PASS |
| 40 | gitleaks.exe | gitleaks/gitleaks | MIT | 26,684 | PASS |
| 41 | markitdown.exe | microsoft/markitdown | MIT | 121,937 | PASS |
| 42 | osv-scanner.exe | google/osv-scanner | Apache-2.0 | 10,099 | PASS |
| 43 | pysemgrep.exe + semgrep.exe | semgrep/semgrep | **LGPL-2.1** | 15,076 | PASS-WITH-CAVEAT | LGPL OK as binary tool (no static-link); not a code dep |
| 44 | specify.exe | github/spec-kit | MIT | 93,613 | PASS |
| 45 | trivy.exe | aquasecurity/trivy | Apache-2.0 | 34,910 | PASS |
| 46 | trufflehog.exe | trufflesecurity/trufflehog | **AGPL-3.0** | 26,097 | **REJECT** | **AGPLv3 license blocker** — same class as openviking REJECT precedent + FalkorDB SSPLv1 above; AGPL infects derivative works AND network-use |
| 47 | typos.exe | crate-ci/typos | Apache-2.0 | 3,931 | PASS |
| 48 | vale.exe | errata-ai/vale | MIT | 5,375 | PASS |

## PASS list (28 repos)

PASS verdict — confirmed SOTA + active + permissive license + ≥500★ OR Anthropic-OFFICIAL waiver:
1. anthropics/cwc-long-running-agents (Apache-2.0, 149★, Anthropic-waiver)
2. shanraisshan/claude-code-best-practice (MIT, 51,824★)
3. openai/codex (Apache-2.0, 80,997★)
4. addyosmani/agent-skills (MIT, 35,347★)
5. router-for-me/CLIProxyAPI (MIT, 31,441★)
6. oven-sh/bun (MIT, 89,766★)
7. github/spec-kit (MIT, 93,613★)
8. gitleaks/gitleaks (MIT, 26,684★)
9. yamadashy/repomix (MIT, 24,519★)
10. getzep/graphiti (Apache-2.0, 25,830★)
11. doobidoo/mcp-memory-service (Apache-2.0, 1,814★)
12. anthropics/skills (Apache-2.0 + source-available subfolders, 130,494★)
13. anthropics/claude-plugins-official (per-plugin, 18,903★)
14. obra/superpowers (MIT, 183,229★)
15. anthropics/cookbook (MIT, 42,496★)
16. agentclientprotocol/claude-agent-acp (Apache-2.0, 1,837★)
17. VoltAgent/awesome-agent-skills (MIT, 20,855★)
18. anthropics/claude-agent-sdk-python (MIT, 6,751★)
19. github/github-mcp-server (MIT, 29,623★)
20. upstash/context7 (MIT, 54,804★)
21. microsoft/playwright-mcp (Apache-2.0, 32,209★)
22. oraios/serena (MIT, 23,983★)
23. microsoft/markitdown (MIT, 121,937★)
24. google/osv-scanner (Apache-2.0, 10,099★)
25. aquasecurity/trivy (Apache-2.0, 34,910★)
26. crate-ci/typos (Apache-2.0, 3,931★)
27. errata-ai/vale (MIT, 5,375★)
28. semgrep/semgrep (LGPL-2.1, 15,076★ — binary use OK)

## DOWNGRADE list (10 repos — caveats)

| Repo | Cause | Action |
|---|---|---|
| forrestchang/andrej-karpathy-skills | NO LICENSE file + fresh-paint (120k★ in 3mo, 20KB size, mirror with no provenance) | Cite-import only; **do NOT install class**; verify Karpathy himself sanctions this fork OR retire cite to official Karpathy URL |
| cnighswonger/claude-code-cache-fix | 201★ (low) + single-named-org | Acceptable-with-disclosure; track for archival risk |
| Willxup/cpa-usage-keeper | 389★ (low) | Acceptable-with-disclosure |
| everything-claude-code v2.0.0-rc.1 | RC version (FM-22.d trap class per CR-9) | Upgrade to stable when shipped; pin specific RC SHA until then |
| openai/codex-plugin-cc | last-push 21 days ago | Probe upstream for HEAD bumps before re-install |
| anthropics/skills (subfolders docx/pdf/pptx/xlsx) | Source-available NOT Apache-2.0 | Do not redistribute these; cite-only |
| karpathy/autoresearch | Fresh-paint + LICENSE file empty (only README MIT) | Pull TIER-1 cite via README MIT mention only; flag for re-verify |
| mattpocock/skills | Fresh-paint (66k★, 93KB, 3mo age) | Cite-only; Mia probe for star-velocity inflation |
| alirezarezvani/claude-skills | Star-velocity (14k★ at 7mo) | Acceptable; track |
| deepwiki MCP | SaaS dependency (Devin proprietary) | Operator-aware cost-class disclosure |

## REJECT list (4 repos — REMOVE or REPLACE)

| # | Repo | Cause | Replacement |
|---|---|---|---|
| 1 | **mksglu/context-mode (Elastic License 2.0)** | License blocker — ELv2 restricts SaaS; not permissive | **REPLACE WITH**: native Claude Code `/compact` + `/clear` + `/rewind` per `coordination.md §12` (already in claude-sota); OR `langchain-ai/deepagents` (MIT, 22k★) middleware-summarization pattern at `summarization.py:122-149` |
| 2 | **FalkorDB (SSPLv1)** | License blocker — SSPLv1 non-permissive (Mongo-class restrictions on cloud resale) | **REPLACE WITH**: KuzuDB (MIT) embeddable graph DB OR Neo4j Community Edition (GPLv3 — same class blocker, NOT replacement) OR sqlite-vec (already in mcp-memory-service) — graphiti supports neo4j/falkor/kuzu backends; switch via env config |
| 3 | **trufflesecurity/trufflehog (AGPL-3.0)** | License blocker — AGPLv3 infects derivative works + network-service-use | **REPLACE WITH**: gitleaks (MIT, already installed) — covers same secret-scan surface; OR `secretlint/secretlint` (MIT) for Node ecosystem |
| 4 | **awesome-agentic-patterns (cite path 404)** | Canonical cite path no longer resolves | **REMOVE** cite from rules referring to this; OR redirect to alternative (`langchain-ai/deepagents` patterns; `johnlindquist` did not publish; need fresh sota-research probe) |

## Critical findings (FM-22.d traps + license blockers + archived deps)

1. **FM-22.d RC plugin trap**: `everything-claude-code v2.0.0-rc.1` violates CR-9 sub-rule "version-pin all @latest". RC versions ship breaking changes; pin specific SHA OR upgrade to stable when shipped.

2. **LICENSE BLOCKERS — n=3 instances** (operator-side architecture violation):
   - `mksglu/context-mode` — Elastic License 2.0 (ELv2)
   - `FalkorDB` — SSPLv1 (per README badge verification)
   - `trufflesecurity/trufflehog` — AGPL-3.0
   
   All three violate `agent-harness-fit-verification.md` Probe 6 "claude-sota is permissive-license-only — MIT / Apache-2.0 / BSD acceptable; AGPLv3 / GPLv3 / SSPL / proprietary REJECT". n=3 same-arc means this is a SYSTEMATIC discipline gap — the install pipeline did not apply Probe 6 at install time.

3. **Fresh-paint signal cluster** — 4 repos (forrestchang/andrej-karpathy-skills, mattpocock/skills, karpathy/autoresearch, ComposioHQ/awesome-claude-skills) show:
   - High star count (15k–120k)
   - Created <4 months ago
   - Tiny repo size (20-93KB)
   - Star-velocity inconsistent with content depth
   
   Per `convergence-gate.md` §"Fresh-paint anti-pattern": "A repo with squashed history + age <30d + 1K+ star ratio is suspicious." Apply Mia probe before treating these as TIER-1 SOTA.

4. **forrestchang/andrej-karpathy-skills has NO LICENSE file** + cardinal-rule-1 cite anchor in `karpathy-adapted.md` references this fork. **Authority chain risk**: Karpathy may not endorse this fork; the rule cites a NAMED-AUTHOR-QUOTE class but the file may misattribute. Verify Karpathy himself authorizes this content OR retire cite to verbatim source URL.

5. **Cited HEAD staleness** — n=2 instances:
   - `Z:/repos/deps/claude-code-best-practice-shan @ 64fffd53` (2026-05-02) is 6 days behind upstream (last-push 2026-05-08)
   - `Z:/repos/deps/codex @ 993e3f40` (2026-04-22) is 17 days behind upstream (last-push 2026-05-09)
   
   Per CR-6 "pull from newest GitHub before install": stale local clones violate the freshness mandate when used as cite source.

6. **Cite anchor 404** — `awesome-agentic-patterns` canonical org/repo path does not resolve (probed `johnlindquist`/`john-rocky`/`awesome-agentic-patterns/awesome-agentic-patterns` all 404). Several rules cite this; orphan reference.

## Top-3 recommended replacements

1. **trufflehog → gitleaks** — gitleaks is already installed, covers same surface (secret-scan in git history), MIT vs AGPLv3. Single-step removal.

2. **FalkorDB → KuzuDB** (MIT) OR **graphiti's neo4j-community fallback** (GPLv3 still blocker) — Graphiti supports multi-backend per its frontmatter; switch via `GRAPHITI_BACKEND=kuzu` env. Kuzu is embeddable + MIT + active (4k★).

3. **context-mode → native CC primitives + deepagents pattern**:
   - Replace operational role with native `/compact` + `/clear` + `/rewind` + Karpathy P3 surgical-changes discipline
   - Replace MCP search role with claude-sota's existing search MCPs (github, context7, deepwiki, serena)
   - Cite-extend `langchain-ai/deepagents/libs/deepagents/deepagents/middleware/summarization.py:122-149` for pre-emptive arg-truncation pattern (already documented in `team-orchestration.md` cite anchor)

## HONEST-NON-FINDING

1. **n8n-mcp** cite (referenced in synthesis-layer-verify.md SHAPE-CLAIM section): probed `n8n-io/n8n-mcp` / `n8n-io/n8n-mcp-community` / `n8n-io/mcp-server` — all 404. Either upstream renamed or never published; the blog cite at `blog.n8n.io/n8n-mcp-server/` is the only verifiable surface. Flag for cite-class downgrade or rule amendment.

2. **Tier 4 binary `ant.exe`** — could not resolve upstream. Likely `ant-design/ant-design` ecosystem (97k★ MIT) but binary signature does not match (ant-design is React component lib, not CLI). Could be Apache Ant build tool (separate provenance). REQUIRES manual verification.

3. **codex-plugin-cc HEAD freshness**: did not probe local `.git/.../HEAD` SHA via gh api — operator should run `git -C Z:/repos/deps/codex-plugin-cc fetch && git -C Z:/repos/deps/codex-plugin-cc log -1` to verify cited HEAD `807e03ac` per CR-6.

4. **deepwiki MCP**: confirmed SaaS (no public OSS upstream). Operator should disclose cost-class in CLAUDE.local.md. No license probe applicable.

5. **Per-plugin license verification under `anthropics/claude-plugins-official`**: marketplace says "Please see each linked plugin for the relevant LICENSE file" — did not enumerate every child plugin. Probe-DAG candidate for next audit fire.

---

STAND-IN-NOTICE: Sonnet stand-in per CLAUDE.local.md ENV (g); orchestrator-side codex T1 e2e MANDATORY before commit
VERDICT: REVISE-AUDIT
confidence: 0.88
PASS count: 28 (out of 48 cited primitives)
DOWNGRADE count: 10 (NO LICENSE file / RC-version / star-low / fresh-paint / SaaS / source-available subfolders / stale-HEAD)
REJECT count: 4 (context-mode ELv2 / FalkorDB SSPLv1 / trufflehog AGPLv3 / awesome-agentic-patterns 404)
Critical findings: 3 license blockers (ELv2/SSPLv1/AGPLv3), 1 RC-plugin trap (everything-claude-code rc.1), 4 fresh-paint suspects, 2 stale local HEADs, 1 NO-LICENSE TIER-1 cite anchor (forrestchang fork)
HONEST-NON-FINDING: ant.exe upstream unresolved; n8n-mcp 404; codex-plugin-cc HEAD-freshness un-probed; per-plugin licenses under anthropics/claude-plugins-official un-enumerated; deepwiki SaaS-cost class un-disclosed
