---
title: Wave 231 PRE-INSTALL-COMMIT-READY Synthesis — W230 S+T+U Convergent NEEDS-REVISION Integration
status: AUTHORITATIVE
date: 2026-05-15
wave: 231
fire: 1
agents-integrated: [W230-S devops, W230-T security, W230-U architect]
predecessors: [W229 OPERATOR-EXECUTION-CATALOG, W230-S, W230-T, W230-U]
verdict-convergence: 3/3 NEEDS-REVISION → REVISED CATALOG
---

# Wave 231 — PRE-INSTALL-COMMIT-READY Catalog (Revised Per W230 Convergent NEEDS-REVISION)

## §0 — Convergent Multi-Perspective Verdict

3/3 W230 advanced agents (DevOps + Security + Architect) returned **NEEDS-REVISION** on W229. Cross-perspective consensus: W229 catalog requires structural revision BEFORE any Phase 1 install commit.

| Agent | Verdict | Critical findings |
|---|---|---|
| S (wshobson-devops-troubleshooter) | NEEDS-REVISION | Port collision CLIProxyAPI :11700 vs Ollama; venv isolation; npm prefix |
| T (wshobson-security-auditor) | NEEDS-REVISION | `@latest` CR-9 violations; Tom Farley crypto audit; 9 secret-redactor gaps |
| U (comprehensive-review:architect-review) | NEEDS-REVISION | Governance trio order; YAGNI ~50→~25; Phase 6 split; duplicates |

## §1 — Pre-Install Pre-Conditions (BLOCKING — must complete BEFORE Phase 1)

### §1.a — Infrastructure isolation (Agent S)

```bash
# 1. Ollama port reassignment (avoid CLIProxyAPI :11700 collision)
export OLLAMA_HOST=127.0.0.1:11701

# 2. Python venv isolation (separate from sibling claude-sota)
python -m venv Z:/venvs/sss-pure
export VIRTUAL_ENV=Z:/venvs/sss-pure

# 3. npm prefix isolation
npm config set prefix Z:/npm-global

# 4. Docker network namespace
docker network create sss-pure-net
```

### §1.b — Secret-management bootstrap (Agent T Q4)

```bash
# sops + age + .env.encrypted (REQUIRED before any Phase touching credentials)
age-keygen -o ~/.config/sops/age/keys.txt
# Operator: copy public key → .sops.yaml
# All .env content → .env.encrypted via sops -e
# tools/eee.ps1 wrapped: sops -d .env.encrypted → env vars
```

### §1.c — `_secret_redactor.py` 9-NEW-pattern update (Agent T Q4.3, MUST precede Phase 2/6/10)

Add 9 patterns:
1. ElevenLabs API key: `sk_[a-f0-9]{40,}`
2. Langfuse public key: `pk-lf-[A-Za-z0-9_-]{20,}`
3. NEXTAUTH_SECRET: `NEXTAUTH_SECRET\s*=\s*"?[A-Za-z0-9+/=]{32,}"?`
4. Postgres DATABASE_URL: `postgres(?:ql)?:\/\/[^@]+@[^\/]+\/[a-zA-Z0-9_-]+`
5. Ed25519 private key (PEM)
6. age private key: `AGE-SECRET-KEY-1[A-Z0-9]{58}`
7. ntfy topic-as-secret: `sss-[a-f0-9]{32}`
8. MotherDuck token: `^[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}$`
9. Generic OpenSSH/PEM private key block

### §1.d — Version-pin discipline (Agent T Q2.1 CRITICAL, CR-9)

ALL `@latest` install commands MUST carry version pin OR `@latest-acknowledged-D6-risk` marker:
```bash
npm install -g ccusage@1.0.0           # pinned
cargo install difftastic --version 0.65.1
cargo install tokei --version 13.0.0-alpha.4
cargo install du-dust --version 1.2.4
cargo install bottom --version 0.11.0
```

### §1.e — Pattern D codex T1 BRIDGE-MODE review (Agent S+T+U convergent)

Before any Phase 4-10 commit, orchestrator MUST run:
```powershell
codex exec --ephemeral -p deep-review-exec --color never `
  < tmp/wave231-commit-prompt.txt `
  2>&1 | tee .claude/state/codex_consult_w231_pre_commit_OUT.txt
```

Cross-model gate satisfaction: REAL GPT-5.5 BRIDGE-MODE direct dispatch (per `cross-model-consensus.md §"On codex unavailable"` Path A primary).

## §2 — Revised Install Order (Architect U recommendations integrated)

### Phase 0 — Foundation (sigstore-verified)
- sops + age (Phase 0 INSTALLED per W229)

### Phase 1 — Memory Stack L1+L3 (incumbent + Graphiti L3)
- mcp-memory-service@10.51.3 (INSTALLED)
- graphiti-core@0.29.0 + FalkorDB@1.6.1 (INSTALLED)

### Phase 2 — Tier-A SOTA CLI (11 candidates) **+ version-pin discipline**
- ripgrep, fd, bat, eza, hyperfine, tokei, dust, bottom, gh, jq, yq (all version-pinned per §1.d)
- Cross-platform mappings documented in `docs/install-provenance.md`

### Phase 2.5 — Governance baseline EARLY (Architect U recommendation: move from Phase 10)
- canonical.md + Must-Never #3 + audit-action-loop.md inherited from `Z:/claude-sota-installed/.claude/rules/`
- safety-guard hook installed BEFORE wider toolchain expansion
- Reasoning: governance MUST precede expanded attack surface

### Phase 3 — Cross-model gate hooks (Tier 1a)
- codex T1-T7 hooks per manifest §Section 2
- Once installed, flip CLAUDE.md Phase 1 bootstrap exception OFF

### Phase 3.5 — Cryptographic governance EVALUATION (Tom Farley trio STUDY-PILOT.b)
- Cedar source-audit (AWS open-source — TIER-1 Apache-2.0, formally verified)
- Ed25519 implementation source-audit (RFC 8032 — verify uses `@noble/ed25519` or `tweetnacl`)
- Axis-2 named-T2 endorsement search (Tom Farley public artifact verification)
- Axis-3 ≥90d STABLE-BURN-IN burn (v0.1.0 still fresh; defer ≥30d)
- **DECISION GATE**: PASS audit + 30d burn → promote ADOPT-NOW; FAIL → drop or defer

### Phase 4 — Tier-B CLI + dev tools (gap-fill)
- pre-commit, sccache, mkdocs (per W228-P 11 Tier-A SOTA CLI)
- Operator decision: BMAD-METHOD vs claude-task-master vs ccpm (Q1.5 trademark scope OK)

### Phase 5 — Code intelligence
- gitnexus@1.x (incumbent)
- ast-grep@0.42.0 (PATH already-installed per W112)
- serena (incumbent)
- semgrep, osv-scanner, typos (pinned)

### Phase 6 — Observability (Architect U: SPLIT INTO 4 SUB-FIRES)

**Phase 6.a — Langfuse MIT-core ONLY** (Agent T Q1.4)
- Self-hosted docker-compose
- AVOID `ee/` features
- Document MIT-only-no-EE choice in `docs/install-provenance.md`

**Phase 6.b — Cost telemetry**
- ccusage@1.0.0 (pinned)
- mcp-server-langfuse@latest-acknowledged (167★ MIT separate repo)

**Phase 6.c — Tracing / spans**
- phoenix (incumbent .mcp.json)

**Phase 6.d — Eval framework**
- promptfoo (one canonical install — REMOVE Phase 10 duplicate per Agent U Q2.d)
- DECISION: promptfoo Phase 6 ONLY

### Phase 7 — Document/visual processing
- PaddleOCR@2.10.0 (pinned + Baidu maintainership disclosure per Agent T Q2.4)
- mkdocs (pinned)

### Phase 8 — Web/voice/image
- microsoft/playwright-cli@latest + SKILLs (REVISED per W223-K — replaces playwright-mcp)
- chrome-devtools-mcp (CONFIRM already-wired `.mcp.json:41` per Agent U Q2.d)
- elevenlabs-mcp (uvx, voice — Agent T Q3.6 SAFE)

### Phase 9 — RAG (operator decision)
- onyx vs ragflow (deferred — operator picks)
- cognee L4 (PROVIDER-COMPLEMENT per W221-E, NOT replace Graphiti L3)

### Phase 10 — Notifications + workflow harness
- ntfy-mcp (self-hosted + cryptographic-random topic per Agent T Q3.5)
- mcp-builder skill (Anthropic OFFICIAL methodology)

### Phase 11 (NEW) — Cryptographic governance ADOPT-NOW (IF Phase 3.5 audit PASS)
- protect-mcp (Tom Farley) — only after crypto source-audit PASS
- review-agent-governance (Tom Farley)
- signed-audit-trails (Tom Farley)

## §3 — Revised ADOPT-NOW Roster (Cut from ~50 → ~28 per Architect U Q2.a)

**Cut rationale**: W229 had ~50 ADOPT-NOW which violates YAGNI per Architect U. Cut to ~28 by:
1. Move Tom Farley trio to STUDY-PILOT.b (3 cuts)
2. Move block-no-verify to STUDY-PILOT.b (1 cut)
3. Resolve duplicates (promptfoo Phase 6+10 = 1 cut; chrome-devtools-mcp already-wired = -1 from `.mcp.json` confirm not re-install)
4. Drop W226-O 4 NEW candidates pending Axis-2 (4 cuts)
5. Drop speculative additions without concrete sss use-case (~13 cuts)

## §4 — Cumulative Phantom-Cite Catches Updated to n=27+

All catches from W221-W228 preserved in `docs/verified-avoid.md` updates queued.

## §5 — Verification BEFORE Phase 1 Commit (checklist)

- [ ] Pre-conditions §1.a-§1.e ALL complete
- [ ] Pattern D codex T1 BRIDGE-MODE verdict at `.claude/state/codex_consult_w231_pre_commit_OUT.txt`
- [ ] Mia pre-apply on §1.c `_secret_redactor.py` 9 new patterns
- [ ] Architect U §3 install-order revisions applied to W229 catalog row-by-row
- [ ] LICENSE CORRECTIONS: conductor Apache-2.0 (W228-Q line 65 + W229 §2 line 119 amend)
- [ ] Tom Farley trio DOWNGRADE captured in `docs/install-provenance.md`
- [ ] DevOps S §1.a OLLAMA_HOST + venv + npm prefix verified in `tools/eee.ps1`

## §6 — Forward Queue (post-Phase-1-commit)

- F1: Cite-anchor migration ship — 50+ rule files at `Z:/claude-sota-installed/.claude/rules/*` reference retired `Z:/claude-sota/` paths (W222-H Mia-verified finding)
- F2: Pattern D codex T1 BRIDGE-MODE review on this Wave 231 synthesis BEFORE Phase 1 commit
- F3: Phase 4 W228-P Tier-A SOTA CLI batch install (after §1.d version-pin discipline)
- F4: `docs/verified-avoid.md` cohort updates (27 phantom catches + 13+ REJECT additions per W226+W228)
- F5: Tom Farley trio Phase 3.5 evaluation (30d burn + crypto audit) → promote OR defer
- F6: Address Anthropic-side classifier outage → revert ENV (d) `bypassPermissions` → `auto` when classifier reliable

## §7 — verdict_one_line

`REVISED-FOR-COMMIT: W229 catalog UPGRADED to W231 with §1 pre-conditions (5 BLOCKING items) + §2 revised install order (governance Phase 2.5+3.5 advance + Phase 6 split + Phase 11 conditional crypto governance) + §3 ADOPT-NOW cut ~50→~28 + §5 verification checklist; orchestrator-side execution AFTER F2 Pattern D codex T1 BRIDGE-MODE review on this synthesis`

VERDICT: **READY-FOR-COMMIT** (post F2 Pattern D review + §1 pre-conditions complete)
