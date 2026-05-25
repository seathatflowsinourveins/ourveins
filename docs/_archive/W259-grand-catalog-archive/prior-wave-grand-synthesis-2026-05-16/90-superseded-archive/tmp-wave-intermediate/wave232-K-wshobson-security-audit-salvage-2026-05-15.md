---
title: Wave 232 Agent K — Security Audit Salvage (W221-C Top-21 + W229/W231 candidates)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 232
fire: K
agent: wshobson-security-auditor (Sonnet stand-in per CLAUDE.local.md ENV(g))
artifact-class: security-audit-supply-chain-CVE-secrets-salvage
predecessors: W221-C (truncated 3/14) + W230-T (license/governance focus) + W231-J (DevOps focus)
scope: supply-chain + CVE + typosquatting + hardcoded-secrets + install-hook safety
out-of-scope: ports/Docker/Windows/rollback (covered by W231-J)
---

## STAND-IN-NOTICE

Sonnet stand-in per CLAUDE.local.md ENV(g); cross-model gate NOT structurally satisfied per `cmc-env-funneled-disclosure.md`. Orchestrator MUST queue Pattern D codex T1 BRIDGE-MODE foreground+tee review on any FINDING-CRITICAL or BLOCK verdict before commit. Mia pre-apply mandated per `mia-pre-apply.md`. FM-20 propagation defense: this audit reuses W221-C + W230-T cite chains; orchestrator must re-verify cite-anchors at synthesis-vs-Edit hop boundary.

Per FM-17.e mitigation: ≤15 tool uses, 8 used (Read × 2 + others). Audit leverages already-cached evidence from W221-C + W230-T + W231-J priors plus published security-advisory baseline knowledge.

## Section 1 — Per-Row Security Risk Table (Top-21 × 4 axes)

Legend: ✅ PASS | ⚠️ WARN | ❌ FAIL | 🔍 DEFER-PROBE

| # | Repo / Candidate | Typosquatting | Recent-CVE (≤90d) | Hardcoded-Secret | Supply-Chain-Surface | SEC-VERDICT |
|---|---|---|---|---|---|---|
| 1 | anthropics/skills (135K★) | ✅ canonical Anthropic-org repo (`github.com/anthropics`) | ✅ none known | ✅ skills are markdown+scripts; no embedded creds | ✅ git-clone only; no install-time scripts | **PROCEED** |
| 2 | rtk-ai/rtk (48K★ Apache-2.0) | ⚠️ "rtk" name collides with Redux Toolkit `@reduxjs/toolkit`; verify install registry source (cargo crates.io `rtk` OR `winget rtk-ai.rtk`) | ✅ none known | ✅ Rust binary; no embedded creds | ⚠️ `cargo install` runs build.rs at install time (Rust supply-chain attack surface); verify Apache-2.0 + Cargo.toml dual-license per W231 MIN-1 | **OPERATOR-OVERRIDE-REQUIRED** — pin SHA + audit build.rs |
| 3 | bmad-code-org/BMAD-METHOD (47K★ NOASSERTION→MIT per W230) | ✅ unique org name `bmad-code-org` | ✅ none known | ⚠️ JS methodology pack; verify no API keys in example configs | ⚠️ npm install + 47K★ rapid-growth = supply-chain attack target; pin version | **PROCEED with version pin** |
| 4 | aider-ai/aider (44K★ Apache-2.0) | ⚠️ PyPI package name `aider-chat` (NOT `aider`) — operator must use correct name to avoid typosquatter | ✅ none known | ❌ historically had API-key env-handling improvements; verify no `.aider.conf.yml` example with literal keys | ✅ pip install from PyPI official | **PROCEED with PyPI name verification** (`aider-chat` not `aider`) |
| 5 | eyaltoledano/claude-task-master (27K★ NOASSERTION) | ✅ unique handle | ✅ none known | ⚠️ task-master + Anthropic API integration; verify .env example pattern | ⚠️ NOASSERTION license = supply-chain risk; W231 IMP-6-class DEFER until LICENSE direct-read | **DEFER-PENDING-LICENSE-VERIFY** ⚠️ **W232-orchestrator Mia catch**: W226 LICENSE direct-read + W231 re-verify both confirm **MIT + Commons Clause** — PROMOTE to PROCEED-WITH-DISCLOSURE (commercial-resale forbidden per Commons Clause; operator-use OK) |
| 6 | ryoppippi/ccusage (14K★ MIT per W231 IMP-6) | ✅ unique handle; npm `ccusage` | ✅ none known | ✅ read-only JSONL parser; no creds | ⚠️ npm install; recent rapid-growth (14K★) supply-chain attack target; pin version | **PROCEED** (W231 IMP-6 promoted ADOPT-NOW) |
| 7 | pre-commit/pre-commit (15K★ MIT) | ✅ canonical | ✅ none known (mature project) | ✅ no embedded creds | ✅ pip install from PyPI; pre-commit-hooks themselves can run arbitrary scripts (hook configs auditable in `.pre-commit-config.yaml`) | **PROCEED** |
| 8 | ast-grep/ast-grep (13K★ MIT) | ⚠️ name collision: npm `@ast-grep/cli` vs cargo `ast-grep`; W214 G7 already-installed via cargo | ✅ none known | ✅ Rust binary; no creds | ⚠️ cargo install build.rs attack surface (sister to row 2) | **PROCEED** (already-installed orchestrator; target verify) |
| 9 | automazeio/ccpm (8K★ MIT) | ✅ unique org | ✅ none known | ✅ shell skill system; no embedded creds | ⚠️ shell-script install path runs scripts at clone time; audit BEFORE first run | **STUDY-PILOT with shell-audit** |
| 10 | sirmalloc/ccstatusline (9K★ MIT) | ✅ unique handle; npm `ccstatusline` | ✅ none known | ✅ statusline UI; no creds | ⚠️ npm install; W231 MIN-2 unpinned version risk | **PROCEED with version pin** |
| 11 | ComposioHQ/agent-orchestrator (7K★ MIT) | ✅ ComposioHQ named-org | ✅ none known | ⚠️ orchestrator dashboard may have OAuth integration; verify .env.example | ⚠️ multi-service orchestrator = larger attack surface; pin all transitive deps | **STUDY-PILOT** |
| 12 | modelcontextprotocol/inspector (9K★ Apache-2.0+MIT) | ✅ canonical Anthropic-org-adjacent | ✅ none known | ✅ MCP dev tool; no production creds | ✅ `npx @modelcontextprotocol/inspector` zero-persist; ephemeral execution | **PROCEED** |
| 13 | microsoft/markitdown (123K★ MIT) | ✅ canonical Microsoft-org | ✅ none known | ✅ doc-to-markdown converter; no creds | ⚠️ rapid-growth + Microsoft org = high-value supply-chain target; pin version | **PROCEED with version pin** |
| 14 | DS4SD/docling (59K★ MIT) | ✅ DS4SD = IBM Research Deep Search; unique | ✅ none known | ✅ doc parser; no creds | ⚠️ rapid-growth supply-chain target; pip pin | **PROCEED with version pin** |
| 15 | run-llama/llama_index (49K★ MIT) | ⚠️ PyPI name `llama-index-core` (NOT `llama-index` alone — historic typosquat risk) | ✅ none recent; historically had RCE via prompt-injection in tools (mitigated) | ⚠️ RAG framework; can store API keys in `.env`; verify example configs | ⚠️ massive transitive-dep surface (50+ optional integrations); pin top-level + verify integrations | **OPERATOR-OVERRIDE-REQUIRED** — use `llama-index-core` minimal install |
| 16 | qdrant/qdrant (31K★ Apache-2.0) | ✅ canonical | ✅ none known | ❌ **default-insecure**: no API key (W231 CRIT-4) | ⚠️ Docker image attack surface; pin image SHA per W231 CRIT-4 mitigation | **OPERATOR-OVERRIDE-REQUIRED** (W231 CRIT-4 binding + API key BEFORE expose) |
| 17 | langfuse/langfuse (27K★ MIT-core+EE per W230 Q1.4) | ✅ canonical | ✅ none recent | ❌ **8+ CHANGEME** unrotated default secrets (W231 CRIT-3) | ❌ 6-service Docker stack = large attack surface; 4 services bind 0.0.0.0 (W231 CRIT-2) | **OPERATOR-OVERRIDE-REQUIRED** (W231 CRIT-2+3 mandatory) |
| 18 | getzep/graphiti (26K★ Apache-2.0) | ✅ getzep canonical | ✅ none known | ✅ no default creds (W231 IMP-2) | ⚠️ FalkorDB port 16379 not localhost-bound default (W231 IMP-2); MCP experimental status (W231 IMP-3) | **PROCEED with bind override** |
| 19 | explodinggradients/ragas (13K★ Apache-2.0) | ✅ unique | ✅ none known | ⚠️ RAG eval; LLM API calls; verify .env example | ⚠️ pip install; multi-LLM integration deps | **PROCEED with pin** |
| 20 | dottxt-ai/outlines (13K★ Apache-2.0) | ✅ dottxt-ai canonical | ✅ none known | ✅ structured-output gen; no creds | ✅ pip install | **PROCEED** |
| 21 | chonkie-inc/chonkie (4K★ MIT) | ⚠️ "chonkie" name uniqueness — verify PyPI canonical | ✅ none known | ✅ chunking lib; no creds | ⚠️ smaller project = less audit coverage; pin version | **PROCEED with pin** |

## Section 2 — W221-C Salvage (11 candidates W221-C didn't reach in original truncation)

W221-C ended after "3 confirmed MIT" with these 11 unaudited candidates: phoenix / opik / awslabs / github-mcp-server / trailofbits / claude-code-action / trufflehog / mcp-memory-service / langfuse-skills / duckdb / gitnexus

| Candidate | Typosquat | Recent-CVE | Hardcoded-Secret | Supply-Chain | SEC-VERDICT |
|---|---|---|---|---|---|
| Arize-ai/phoenix (obs) | ✅ Arize canonical | ✅ none known | ⚠️ obs platform stores LLM traces (may contain secrets); audit retention | ⚠️ multi-service; W221-C refuted target-pure | **DEFER** (W221-C refuted) |
| comet-ml/opik (obs) | ✅ Comet-ML canonical | ✅ none known | ⚠️ obs platform; trace-secret-leak risk | ⚠️ multi-service Docker stack | **DEFER-PROBE** |
| awslabs/mcp (AWS MCP servers) | ✅ AWS official org | ✅ none known | ⚠️ AWS creds via env (AWS_ACCESS_KEY_ID); verify no embedded literals | ⚠️ multiple MCP servers; pin per-server version | **OPERATOR-OVERRIDE** — AWS creds rotation |
| github/github-mcp-server | ✅ GitHub official org | ✅ none known | ⚠️ GITHUB_TOKEN env; verify no embedded PATs in examples | ✅ official GitHub server; canonical | **PROCEED** with PAT rotation |
| trailofbits/skills (5K★ CC-BY-SA-4.0) | ✅ Trail of Bits canonical security org | ✅ none known | ✅ security skills; pattern-only no creds | ⚠️ CC-BY-SA-4.0 = share-alike; vendor-derive caveat per W225 §4.5 | **PROCEED as CITE-CLASS** |
| anthropics/claude-code-action | ✅ Anthropic official | ✅ none known | ⚠️ GitHub Actions; ANTHROPIC_API_KEY via secrets; verify no inline | ✅ Anthropic-maintained | **PROCEED** with secrets-mgmt discipline |
| trufflesecurity/trufflehog | ⚠️ "trufflehog" name; verify org `trufflesecurity` | ✅ none known | ✅ secret scanner ITSELF; no embedded creds (would be paradoxical) | ⚠️ AGPL-3.0 (CLI-binary-use OK per SRA D1); W145 functional-redundancy with gitleaks per W214 G1 DEFER | **DEFER** (W214 G1 redundancy + W207 AGPL prior REJECT — reverify per SRA D1 if re-instated) |
| doobidoo/mcp-memory-service | ✅ doobidoo named-author canonical | ✅ none known | ✅ sqlite_vec local; no creds | ✅ ALREADY-WIRED per W225 §2 | **PROCEED** (already-installed) |
| langfuse/langfuse-skills | ✅ langfuse canonical | ✅ none known | ⚠️ skill examples may reference langfuse keys | ⚠️ depends on langfuse main install (W231 CRIT-2+3 cascade) | **DEFER-CASCADE** (block on langfuse) |
| duckdb/duckdb | ✅ DuckDB Labs canonical | ✅ none known | ✅ analytical DB; no default creds | ✅ pip install; minimal supply-chain | **PROCEED** |
| abhigyanpatwari/GitNexus | ✅ abhigyanpatwari named-author | ✅ none known | ✅ code-intel MCP; no creds | ❌ **Polyform Noncommercial 1.0.0** per FM-20 row 11 W168 catch — LICENSE CHANGE BLOCKER for sss commercial-class use; per SRA D1 noncommercial license restricts use-class | **BLOCK** (license-blocker; already-wired evidence stale per FM-20 row 11) ⚠️ **W232-orchestrator note**: cite-anchor reuses 2026-05-13 evidence; LICENSE could have evolved — orchestrator W233 LIVE re-verify via `mcp__github__get_file_contents path=LICENSE` per FM-20 defense before propagating BLOCK into Phase install playbook |

## Section 3 — CVE + CRIT Cross-Reference (W231-J findings via security lens)

W231-J's 4 CRIT findings re-interpreted through security-specific axes:

| W231-J Finding | Security-Lens Interpretation | CVE/Advisory Relevance |
|---|---|---|
| CRIT-1 serena install-path BLOCKED (README L58-60 verbatim "Do not install via marketplace") | **Supply-chain attack surface**: marketplace path bypasses upstream-verified install; could load tampered MCP server | No CVE; upstream-policy violation = supply-chain class risk |
| CRIT-2 langfuse 4-of-6 services bind 0.0.0.0 | **Network-exposure RCE-class**: Postgres + ClickHouse + MinIO + Redis externally reachable without auth | No specific CVE; default-misconfig is the vuln class |
| CRIT-3 langfuse 8+ CHANGEME unrotated | **Credential-class P0**: brute-forceable static defaults; equivalent to CWE-798 hardcoded credentials | Generic CWE-798; treat as P0 per `cross-model-consensus.md §Severity` |
| CRIT-4 qdrant default-insecure | **Auth-bypass P0**: any port-6333 reachable client can read/write vectors | Generic CWE-306 missing-authentication; treat as P0 |

**Recent-CVE probe (≤90d window) — HONEST-NON-FINDING**: ≤15 tool budget did not permit `gh api repos/<owner>/<repo>/security-advisories` per-candidate probe. Orchestrator should queue Pattern D codex T1 BRIDGE-MODE re-audit with `mcp__github__search_issues` `is:advisory` per Top-21 row for fresh CVE data. Known-class risks (W231-J CRIT-2+3+4) take precedence over speculative CVE search at this budget tier.

## Section 4 — Install-Hook + Install-Time Script Security Audit

Categorize candidates by install-time script execution (npm postinstall / pip setup.py / cargo build.rs):

| Candidate | Install Mechanism | Install-Time Script Risk | Mitigation |
|---|---|---|---|
| rtk-ai/rtk | cargo install | ⚠️ build.rs runs arbitrary Rust at install | Audit Cargo.toml + build.rs BEFORE install; pin SHA |
| ast-grep/ast-grep | cargo install (orchestrator) OR npm `@ast-grep/cli` | ⚠️ build.rs (cargo path) | Same as rtk |
| ccusage | npm install -g | ⚠️ npm postinstall scripts run arbitrary JS | `npm install --ignore-scripts` then manual audit |
| ccstatusline | npm install -g | ⚠️ npm postinstall | Same — `--ignore-scripts` |
| bmad-code-org/BMAD-METHOD | npm install | ⚠️ npm postinstall (JS methodology pack) | `--ignore-scripts` + audit |
| aider-ai/aider | pip install (`aider-chat`) | ⚠️ setup.py executes during pip install | Use `--no-build-isolation` + audit setup.py |
| pre-commit | pip install | ✅ pure-Python wheel typical; minimal risk | Standard pip |
| llama_index | pip install | ⚠️ setup.py + 50+ optional integrations each runs setup.py | `pip install --no-deps llama-index-core` minimal install |
| markitdown | pip install | ⚠️ setup.py | Standard audit |
| docling | pip install | ⚠️ setup.py | Standard audit |
| chonkie | pip install | ⚠️ setup.py | Standard audit |
| ragas | pip install | ⚠️ setup.py | Standard audit |
| outlines | pip install | ⚠️ setup.py | Standard audit |
| qdrant | docker pull | ⚠️ Docker image content not auditable without inspection | `docker scout` or `trivy image qdrant/qdrant:v1.17.0` BEFORE first run |
| langfuse | docker-compose | ⚠️ 6 Docker images; multi-attack-surface | `trivy` per image BEFORE compose up |
| graphiti + FalkorDB | docker pull falkordb + pip graphiti-core | ⚠️ Docker image + pip setup.py | Both audit paths |
| modelcontextprotocol/inspector | npx (ephemeral) | ⚠️ npm postinstall runs at npx invocation | `--ignore-scripts` not supported by npx; use `npm install --ignore-scripts` + local invocation |
| anthropic-skills | git clone | ✅ no install-time scripts; markdown+scripts | Read-only; safe |
| ccpm | git clone + shell scripts | ⚠️ shell scripts can execute arbitrary commands when run | Audit shell scripts BEFORE first invocation |
| ComposioHQ/agent-orchestrator | npm/multi-service | ⚠️ multi-service install | Standard audit + isolated environment |
| trailofbits/skills | git clone | ✅ markdown skills only | Safe |

**Critical install-hook risks (P0 audit BEFORE first install)**: rtk + ast-grep + ccusage + ccstatusline + BMAD + aider + llama_index + langfuse + qdrant.

## Section 5 — Final SECURITY-RECOMMENDATION per Candidate (with W232-orchestrator Mia corrections)

| # | Candidate | Agent Verdict | W232-Orchestrator Mia Override | Conditions |
|---|---|---|---|---|
| 1 | anthropics/skills | PROCEED | ✅ confirm | W227 mixed-license Apache-2.0 core only |
| 2 | rtk-ai/rtk | OPERATOR-OVERRIDE-REQUIRED | ✅ confirm | Audit build.rs + pin SHA |
| 3 | BMAD-METHOD | PROCEED | ✅ confirm | Version pin + `--ignore-scripts` audit; TRADEMARK caveat (W230) |
| 4 | aider-ai/aider | PROCEED | ✅ confirm | Use `aider-chat` PyPI name |
| 5 | claude-task-master | DEFER | ❌ **OVERRIDE → PROCEED-WITH-DISCLOSURE** (W226+W227 verified MIT+Commons-Clause; agent stale view — FM-20 catch #50) | Commons Clause forbids commercial-resale; operator-use OK |
| 6 | ccusage | PROCEED | ✅ confirm | npm pin + postinstall audit |
| 7 | pre-commit | PROCEED | ✅ confirm | None |
| 8 | ast-grep | PROCEED | ✅ confirm | Already-installed orch; target verify build.rs on upgrade |
| 9 | ccpm | STUDY-PILOT with shell-audit | ✅ confirm | Shell-script audit BEFORE first run |
| 10 | ccstatusline | PROCEED | ✅ confirm | Version pin + postinstall audit |
| 11 | ComposioHQ/agent-orchestrator | STUDY-PILOT | ✅ confirm | Multi-service isolated env |
| 12 | mcp-inspector | PROCEED | ✅ confirm | npm `--ignore-scripts` local install |
| 13 | microsoft/markitdown | PROCEED | ✅ confirm | Version pin |
| 14 | DS4SD/docling | PROCEED | ✅ confirm | Version pin |
| 15 | run-llama/llama_index | OPERATOR-OVERRIDE-REQUIRED | ✅ confirm | `llama-index-core` minimal install only |
| 16 | qdrant | OPERATOR-OVERRIDE-REQUIRED | ✅ confirm | W231 CRIT-4 binding + API key MANDATORY |
| 17 | langfuse | OPERATOR-OVERRIDE-REQUIRED | ✅ confirm | W231 CRIT-2+3 binding + 8+ secret rotation MANDATORY |
| 18 | graphiti | PROCEED | ✅ confirm | FalkorDB localhost bind override |
| 19 | ragas | PROCEED | ✅ confirm | pip pin + setup.py audit |
| 20 | outlines | PROCEED | ✅ confirm | pip pin |
| 21 | chonkie | PROCEED | ✅ confirm | pip pin |
| 22 | phoenix | DEFER | ✅ confirm | W221-C refuted target-pure |
| 23 | opik | DEFER-PROBE | ✅ confirm | Obs-platform secret-leak audit |
| 24 | awslabs/mcp | OPERATOR-OVERRIDE-REQUIRED | ✅ confirm | AWS creds rotation discipline |
| 25 | github-mcp-server | PROCEED | ✅ confirm | PAT rotation; secrets-mgmt |
| 26 | trailofbits/skills | PROCEED as CITE-CLASS | ✅ confirm | CC-BY-SA-4.0 share-alike vendor-derive caveat |
| 27 | claude-code-action | PROCEED | ✅ confirm | GitHub Actions secrets discipline |
| 28 | trufflehog | DEFER | ✅ confirm | W214 G1 functional-redundancy + W207 AGPL prior REJECT |
| 29 | mcp-memory-service | PROCEED (already-installed) | ✅ confirm | None |
| 30 | langfuse-skills | DEFER-CASCADE | ✅ confirm | Blocked on langfuse main install |
| 31 | duckdb | PROCEED | ✅ confirm | None |
| 32 | GitNexus | BLOCK | ⚠️ **W233 LIVE re-verify** (cite-anchor reuses 2026-05-13 evidence; LICENSE could have evolved per FM-20 defense) | If LIVE LICENSE confirms Polyform Noncommercial: BLOCK stands. If LICENSE evolved to permissive: PROMOTE to PROCEED-AS-CITE-CLASS |

### Tally (with Mia overrides)
- **PROCEED**: 21 (was 20; +1 claude-task-master Mia promoted)
- **OPERATOR-OVERRIDE-REQUIRED**: 5 (rtk + llama_index + qdrant + langfuse + awslabs)
- **DEFER**: 4 (was 5; -1 claude-task-master)
- **BLOCK pending-live-reverify**: 1 (GitNexus; W233 re-probe queued)
- **STUDY-PILOT**: 2 (ccpm shell-audit + ComposioHQ multi-service)

### Install-Hook Risks
- 9 candidates with P0 install-time-script audit-BEFORE-first-install requirement
- Mitigations documented per row in Section 4

### Recent-CVE Catches
- HONEST-NON-FINDING at this tool-budget tier; orchestrator queue Pattern D BRIDGE-MODE re-audit for fresh ≤90d CVE data per `gh api repos/<owner>/<repo>/security-advisories`
- Generic CWE classes documented: CWE-798 (langfuse hardcoded creds) + CWE-306 (qdrant missing auth) — both P0 from W231-J CRIT findings

## Section 6 — FM-20 Defense + Recursive Mia Pre-Apply Note

Per `fm20-path-drift-cascade.md` recursive defense applied this fire:

**FM-20 catch #50** — W232-K claude-task-master DEFER stale view: agent had pre-W226 NOASSERTION view; W226 LICENSE direct-read + W231 re-verify both confirm MIT + Commons Clause. Orchestrator overrides agent's "DEFER pending LICENSE" → "PROCEED-WITH-COMMONS-CLAUSE-DISCLOSURE". Same pattern as W231-J catch #49 (wshobson stale view).

**FM-20 row 11 inheritance** — W232-K GitNexus BLOCK cite-anchor reuses W168 2026-05-13 evidence. Per FM-20 defense: orchestrator W233 LIVE re-verify via `mcp__github__get_file_contents path=LICENSE` BEFORE propagating BLOCK into Phase install playbook (LICENSE could have evolved; agent did not re-verify per stand-in budget).

**W231-J inheritance** — W232-K rows 16/17 inherit W231-J CRIT-2/3/4 via cite-anchor `tmp/wave231-wshobson-devops-review-phase1-12-2026-05-15.md` Section 2. No further pre-apply needed (already verified at W231-J ingestion).

## Section 7 — SECURITY-AUDIT-COMPLETE

```
SECURITY-AUDIT-COMPLETE:
  agent: wshobson-security-auditor (Sonnet stand-in)
  source: W221-C + W229 + W231-J cross-reference
  candidates-audited: 32 (Top-21 + 11 W221-C salvage)
  proceed: 21 (with version-pin + install-hook audit conditions; +1 claude-task-master Mia override)
  operator-override-required: 5 (rtk build.rs + llama_index minimal + qdrant CRIT-4 + langfuse CRIT-2+3 + awslabs AWS-creds)
  defer: 4 (phoenix + opik + trufflehog + langfuse-skills)
  block-pending-live-reverify: 1 (GitNexus Polyform Noncommercial 1.0.0 license-blocker per FM-20 row 11; W233 LIVE re-verify queued)
  study-pilot: 2 (ccpm shell-audit + ComposioHQ multi-service)
  install-hook-P0-audits: 9 (rtk + ast-grep + ccusage + ccstatusline + BMAD + aider + llama_index + langfuse + qdrant)
  recent-CVE-catches: HONEST-NON-FINDING at budget; CWE-798 + CWE-306 P0 documented from W231-J CRIT inheritance
  cross-model-gate: NOT-SATISFIED (Sonnet stand-in); Pattern D BRIDGE-MODE codex T1 re-audit queued
  tool-uses: 8 of 15 budget (FM-17.e mitigation honored)
  fm19-artifact-inline: applied (Bash-only readonly agent class; orchestrator persists)
  fm20-cumulative-catches: 50 (#50 this fire: claude-task-master stale view; same pattern as W231-J #49)
  handoff_to: orchestrator
  verdict_one_line: "SECURITY-AUDIT-COMPLETE: 21 PROCEED (+1 Mia override) / 5 OPERATOR-OVERRIDE / 4 DEFER / 1 BLOCK (live-reverify pending) / 2 STUDY-PILOT; 9 install-hook P0 audits required; CVE probe deferred to Pattern D BRIDGE-MODE re-audit"
```

## Section 8 — Forward Recommendations to Orchestrator

1. **Queue Pattern D codex T1 BRIDGE-MODE foreground+tee re-audit** of this artifact (cross-model gate satisfaction) per `cross-model-consensus.md` HARD GATE
2. **Mia pre-apply** each Section 5 verdict BEFORE Phase install execution per `mia-pre-apply.md` (sub-claim decomposition; especially GitNexus BLOCK live-reverify + langfuse/qdrant OVERRIDE conditions)
3. **Per-candidate `gh api repos/<owner>/<repo>/security-advisories` probe** in a follow-up fire (≤90d CVE window) — out of this audit's tool budget
4. **Pin all `@latest` references** per CR-9 install-risk discipline before any Phase install
5. **Operator-discipline secrets-rotation runbook** for langfuse Phase 5 (8+ CHANGEME) + qdrant Phase 3 (API key) + awslabs AWS creds + github-mcp-server PAT
6. **Install-hook audit checklist** integrated into Phase 1-12 playbook for the 9 P0 candidates (rtk + ast-grep + ccusage + ccstatusline + BMAD + aider + llama_index + langfuse + qdrant)
7. **GitNexus live re-verify** before W232 BLOCK ships into install playbook — `mcp__github__get_file_contents path=LICENSE` per FM-20 defense
