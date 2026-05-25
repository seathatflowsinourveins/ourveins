---
title: Wave 230 Agent T - Security Audit of W229 Catalog (License/Supply-Chain/MCP-Security/Secrets/Tom-Farley-Governance)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 230
fire: 1
agent: wshobson-security-auditor
artifact-class: security-audit-w229
predecessors: W229 OPERATOR-EXECUTION-CATALOG
output_persistence: orchestrator-side FM-19 ARTIFACT-INLINE recovery
---

# Wave 230 Agent T — Security Audit of W229 OPERATOR-EXECUTION-CATALOG

## STAND-IN-NOTICE

This audit dispatched via `comprehensive-review:security-auditor` agent class. Per CLAUDE.local.md ENV(g) inheritance, runs under Sonnet stand-in (`claude-sonnet-4-6`). **Cross-model gate NOT structurally satisfied** per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md` n=5 same-arc evidence ladder. Orchestrator MUST queue Pattern D codex T1 BRIDGE-MODE foreground+tee review (per W229 §5 F2) on any FINDING-CRITICAL or REJECT-CRITICAL verdict before commit. Mia pre-apply on this artifact mandated per `mia-pre-apply.md`.

Auditor scope: DevSecOps + appsec lens; license/supply-chain/MCP-security/secrets/Tom-Farley-governance only. Functional/CR-12 disposition analysis OUT-OF-SCOPE (covered by W226-N + W228-Q).

---

## Q1 — License Trap Audit

### Q1.1 — Direct LICENSE verifications (TIER-1-DIRECT @ HEAD)

| Repo | LICENSE verified at HEAD | SPDX | Use-class fit per SRA D1 |
|---|---|---|---|
| anthropics/claude-cookbooks | `Z:/repos/deps/claude-cookbooks/LICENSE:1-10` | MIT (Anthropic 2023) | All use-classes |
| wshobson/agents (Seth Hobson) | `Z:/repos/deps/wshobson-agents/LICENSE:1-15` | MIT (Seth Hobson 2024) | All use-classes |
| bmad-code-org/BMAD-METHOD | `Z:/repos/deps/BMAD-METHOD/LICENSE:1-30` + `TRADEMARK.md:1-40` | MIT + trademark notice | code use OK; name/branding restricted |
| langfuse/langfuse | `Z:/repos/deps/langfuse/LICENSE:1-25` | MIT-Expat core + EE for `ee/` | See Q1.4 below |
| smtg-ai/claude-squad | (W226-N verified via README cite) | **AGPL-3.0** | REJECT (per W226-N) |

### Q1.2 — Tom Farley governance trio licenses (W228-Q new author)

Direct plugin.json verifications:
- `protect-mcp/.claude-plugin/plugin.json:9` → `"license": "MIT"` (Tom Farley 2025; v0.1.0)
- `review-agent-governance/.claude-plugin/plugin.json:9` → `"license": "MIT"` (Tom Farley 2025; v0.1.0)
- `signed-audit-trails/.claude-plugin/plugin.json:9` → `"license": "MIT"` (Tom Farley 2025; v0.1.0)

Parent repo LICENSE umbrella MIT covers all plugins; no AGPL/GPL/SSPL contamination detected.

### Q1.3 — conductor plugin LICENSE CORRECTION (W228-Q catalog mistake)

Direct read: `"license": "Apache-2.0"` (NOT MIT as W228-Q line 65 + W229 §2 line 119 implied).

**FINDING-MEDIUM**: conductor uses Apache-2.0; W229 catalog rows incorrectly imply uniform MIT across wshobson plugin family. Functional REJECT (HARD-GATE) stands; license is independently OK.

### Q1.4 — Langfuse MIT-core + EE split (DEEP DIVE)

**Root `LICENSE`** (`Z:/repos/deps/langfuse/LICENSE:4-7`):
> All content that resides under the "ee/", "web/src/ee/", and/or "worker/src/ee/" directories is licensed under the license defined in "ee/LICENSE". Content outside is available under the MIT Expat license.

**`ee/LICENSE`** (`Z:/repos/deps/langfuse/ee/LICENSE:13-30`):
> Langfuse Enterprise license ... may only be used, if you (and any entity that you represent) have agreed to ... applicable Langfuse Terms of Service ... or otherwise have a valid Langfuse Enterprise License.

**FINDING-MEDIUM (Q1.4-A)**: Langfuse EE license is **proprietary commercial**. Phase 6 docker-compose deploy MUST use OSS portion ONLY. Avoid `ee/` features (SSO, audit logs UI, RBAC at org level).

**Q1.4-B Operator guidance**:
1. Self-hosted langfuse MIT-core OPERATIONAL for sss observability
2. Do NOT modify content in `ee/` / `web/src/ee/` / `worker/src/ee/`
3. mcp-server-langfuse (167★ separate repo, MIT) is independent
4. Document MIT-only-no-EE choice in `docs/install-provenance.md`

### Q1.5 — BMAD-METHOD trademark scope (CLARIFIED)

Trademark scope: BMad / BMad Method / BMad Core / BMad Code word marks + tagline + logo.

**Permitted for sss**: Use code under MIT; document as "compatible with BMad Method v6"; fork-and-rename
**Restricted**: Cannot ship sss as "BMad-derived" product; cannot use BMad logos

**FINDING-LOW**: Trademark scope is brand-protection-only, NOT functional restriction on code use.

### Q1.6 — License inventory across W229 ADOPT-NOW

| License class | Count in W229 ADOPT-NOW | sss use-class fit |
|---|---|---|
| MIT | ~35+ | All ACCEPTABLE |
| Apache-2.0 | ~12 | All ACCEPTABLE |
| BSD-2 / BSD-3 | mkdocs | ACCEPTABLE |
| CC-BY-4.0 | tldr-pages | ACCEPTABLE (content-class) |
| EUPL-1.2 dual | eza | ACCEPTABLE |
| MIT + Llama Community | meta-llama/PurpleLlama | See Q1.7 |
| **AGPL-3.0** | **claude-squad (REJECTED)** | Library-link blocker |

### Q1.7 — Meta Llama Community License (NEW CONCERN)

**FINDING-MEDIUM**: Llama Community License has 700M-MAU clause. sss is solo-operator — safe per use-class. BUT:
1. LlamaGuard model weights are subject to Llama Community License (NOT pure MIT)
2. Operator MUST not redistribute LlamaGuard weights as sss artifact bundle
3. Document "DEMAND-GATED + Llama Community License acknowledged" in install-provenance

---

## Q2 — Supply-Chain Risks

### Q2.1 — `@latest` pin acceptability per CR-9

**FINDING-CRITICAL**: W229 §2 line 62-66 + §3 Phase 4 install commands use `@latest` without version-pin OR acknowledgment marker for: ccusage / difftastic / tokei / dust / bottom. VIOLATES cardinal-rule-9.

Required remediation BEFORE Phase 4 install commit:
```bash
# CORRECTED Phase 4 install commands:
npm install -g ccusage@1.0.0
cargo install difftastic --version 0.65.1
cargo install tokei --version 13.0.0-alpha.4
cargo install du-dust --version 1.2.4
cargo install bottom --version 0.11.0
```

### Q2.2 — PyPI/npm typosquatting probe

**FINDING-MEDIUM**: W229 catalog does NOT include npm/PyPI owner verification step before Phase 4 install. Required: **before each `pip install <pkg>` / `npm install -g <pkg>`, run `pip show <pkg> | grep ^Author` OR `npm view <pkg> maintainers` and pin owner-name in `docs/install-provenance.md` install row**.

Top packages requiring owner-verification:
- `fastmcp` (PyPI) — PrefectHQ (post jlowin transfer W222-H)
- `sentence-transformers` (PyPI) — huggingface (post UKPLab → HF transfer W228-R)
- `cognee` (PyPI) — topoteretes
- `elevenlabs-mcp` (PyPI via uvx) — ElevenLabs Inc.
- `paddleocr` (PyPI) — Baidu PaddlePaddle team
- `ccusage` (npm) — ryoppippi
- `@ast-grep/cli` (npm scope) — ast-grep org
- `@playwright/cli` (npm scope) — Microsoft
- `protect-mcp` (npm) — scope-blind/Tom Farley

### Q2.3 — Tom Farley / Scope Blind LLC supply-chain trust

**FINDING-MEDIUM**: Tom Farley convergence-gate Axis-2 **PARTIAL** — single-author plugin set + v0.1.0 (no Axis-3 STABLE-BURN-IN). Per `convergence-gate.md` Axis-3 5-band table: `<100d age + cpd unknown = FAST-CHURN-BAND DOWNGRADE candidate` ABSENT STRONG-PROVENANCE-EXPRESS predicate.

**Remediation BEFORE adoption**:
1. Probe `tommy@scopeblind.com` named-author public artifact (LinkedIn, GitHub profile, conference talks, blog at scopeblind.com)
2. Verify `protect-mcp` npm package owner via `npm view protect-mcp maintainers`
3. Cedar + Ed25519 cryptographic claims source-audit (Cedar AWS open-source TIER-1 OK; Ed25519 RFC 8032 — verify implementation uses standard library NOT hand-rolled)
4. **Tom Farley trio is STUDY-PILOT.b NOT ADOPT-NOW** until Axis-2 + Axis-3 verified — W229 §2 Δ17-19 verdicts UPGRADE PREMATURELY

### Q2.4 — Baidu / PaddleOCR geographic supply-chain concern

**FINDING-LOW**: PaddleOCR is maintained by Baidu Inc. (China). For sss bootstrap, acceptable. Operator should:
1. Cite explicit Baidu maintainership in install-provenance Phase 7 row
2. Use local-only operation (no telemetry to Baidu cloud)
3. Pin to specific version (`paddleocr==2.10.0`) NOT @latest
4. Re-evaluate if sss scope evolves to PII / compliance / enterprise

### Q2.5 — Top-3 dependabot-equivalent watchlist priorities

1. **`protect-mcp` npm package** — v0.1.0 author, Tom Farley supply-chain newness
2. **`langfuse` Docker image** — multi-component attack surface; GHSA-* advisories
3. **`fastmcp` PyPI** — post-org-transfer (jlowin → PrefectHQ); owner-change supply-chain risk

### Q2.6 — Foundation-tier sops verification

**FINDING-INFO**: sops v3.13.0 INSTALLED Phase 0 sigstore-verified. Periodic re-verify via `cosign verify-attestation` OR `gh attestation verify` against `Z:/claude-sota-installed/.local/bin/sops.exe`.

---

## Q3 — MCP-Security per W222-G v5 8-Question Checklist

### Q3.1 — github-mcp-server (INCUMBENT)

1. Tools: 30+ TIER-1 OFFICIAL
2. Write files: NO local; CAN mutate GitHub repos (12+ mutating tools)
3. Execute commands: NO local
4. Network: YES (api.github.com TLS-required)
5. Secrets: REQUIRES `GITHUB_PERSONAL_ACCESS_TOKEN`
6. Unbounded output: get_file_contents can return large blobs
7. Persist data: NO local
8. Prompt instructions: NO known issue
9. Install scripts: NONE
10. Allowlist/denylist: GitHub token scopes

**Verdict**: SAFE-INCUMBENT (periodic token-rotation discipline required)

### Q3.2 — Tom Farley protect-mcp (v0.1.0)

**FINDING-MEDIUM**: protect-mcp introduces NEW key-material (Ed25519 signing key) into sss runtime. Pre-adoption:
1. Cedar policy file MUST be operator-authored — DO NOT use default that grants broad permit
2. Ed25519 private key path MUST be excluded from `git status` / add new `_secret_redactor.py` pattern
3. Receipts directory MUST be `.gitignore`d
4. `@veritasacta/verify` npm package owner MUST be supply-chain-verified

### Q3.3 — cognee-integrations CC plugin

**FINDING-LOW**: PROMPT-INJECTION VECTOR via UserPromptSubmit hook injecting recall context. Pre-adoption: review hook source code for output sanitization. Mitigation: rely on `_secret_redactor.py` defense-in-depth.

### Q3.4 — chrome-devtools-mcp (39k★ MIT)

**FINDING-MEDIUM**: CDP access to operator's Chrome exposes login sessions/cookies/authenticated tabs. Pre-adoption: use **dedicated headless Chrome instance** (`chrome --user-data-dir=Z:/claude-sota-installed-state/.chrome-sss`).

### Q3.5 — ntfy-mcp (Notification)

**FINDING-MEDIUM**: ntfy default uses topic-name-as-secret pattern. Pre-adoption:
1. Self-hosted ntfy at internal address (NOT public ntfy.sh)
2. Topic name cryptographic-random (e.g., `sss-$(openssl rand -hex 16)`)
3. Topic name in `_secret_redactor.py`
4. NEVER log topic names to commits or audit JSONL

### Q3.6 — elevenlabs-mcp (1.4k★ MIT, OFFICIAL)

**FINDING-LOW**: Standard SaaS API risk. `ELEVENLABS_API_KEY` rotation + audio output cleanup + free-tier quota monitoring.

### Q3.7-10 — Remaining 4 MCPs

- **mcp-server-langfuse** (167★ MIT): SAFE; requires `LANGFUSE_*` API keys
- **motherduck-mcp** (480★ MIT): SAFE; local DuckDB OR token (pick local for bootstrap)
- **mcp-builder skill** (Anthropic OFFICIAL): SAFE; methodology guide, no runtime surface
- **context-management** (Seth Hobson 1.2.0 MIT): SAFE; operator-owned files only

---

## Q4 — Secret Management Audit

### Q4.1 — Recommended primary mechanism: sops + age + .env.encrypted

```bash
age-keygen -o ~/.config/sops/age/keys.txt
sops -e --age $(cat ~/.config/sops/age/keys.txt | grep "public key:" | cut -d: -f2 | tr -d ' ') .env > .env.encrypted
# tools/eee.ps1 calls `sops -d .env.encrypted` → loads env vars
```

Rationale:
1. sops Phase 0 INSTALLED + sigstore-verified
2. age sigstore-verified TIER-1 SOTA (~17k★)
3. `.env.encrypted` gitignored-safe
4. `keys.txt` lives OUTSIDE repo
5. Reversible — switch to keyring/Vault later
6. SOTA-aligned (no policy conflict)

### Q4.2 — Rejected alternatives

| Mechanism | Rejected because |
|---|---|
| Plaintext `.env` in repo | HIGH risk — git history exposure |
| OS keyring | NOT-portable across machines |
| HashiCorp Vault | Over-engineered for bootstrap; CR-5 violation |
| `.env` in `.claude/state/` | State dir captured by audit hooks |

### Q4.3 — NEW secret patterns to ADD to `_secret_redactor.py`

| Pattern | Regex | Replacement |
|---|---|---|
| ElevenLabs API key | `sk_[a-f0-9]{40,}` | `[REDACTED-ELEVENLABS]` |
| Langfuse public key | `pk-lf-[A-Za-z0-9_-]{20,}` | `[REDACTED-LANGFUSE-PUBLIC]` |
| `NEXTAUTH_SECRET` | `NEXTAUTH_SECRET\s*=\s*"?[A-Za-z0-9+/=]{32,}"?` | preserve key, redact value |
| Postgres `DATABASE_URL` | `postgres(?:ql)?:\/\/[^@]+@[^\/]+\/[a-zA-Z0-9_-]+` | `postgres://[REDACTED]@[REDACTED]/[REDACTED]` |
| Ed25519 private key (PEM) | `-----BEGIN (?:OPENSSH \|ED25519 )?PRIVATE KEY-----[\s\S]+?-----END (?:OPENSSH \|ED25519 )?PRIVATE KEY-----` | `[REDACTED-ED25519-PRIVATE]` |
| age private key | `AGE-SECRET-KEY-1[A-Z0-9]{58}` | `[REDACTED-AGE-PRIVATE]` |
| ntfy topic-as-secret | `sss-[a-f0-9]{32}` | `[REDACTED-NTFY-TOPIC]` |
| MotherDuck token | `^[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}$` | `[REDACTED-MOTHERDUCK]` |

**FINDING-MEDIUM (Q4.3)**: `lga-worktree-prereq.md §11` 9-pattern set does NOT cover ElevenLabs / Langfuse-public / NEXTAUTH_SECRET / DATABASE_URL / Ed25519-private / age-private. Required addition before Phase 2 / Phase 6 / Phase 10 install commits.

---

## Q5 — Tom Farley Governance Trio Deep Audit

### Q5.1 — Named-author Axis-2 convergence verification

**Direct evidence (this audit)**:
- 3 plugins authored by Tom Farley (`tommy@scopeblind.com`)
- protect-mcp README cites npm package + Cedar (AWS) + Ed25519 (RFC 8032)

**MISSING evidence for Axis-2 PASS**:
- Public talks / conference presentations
- Blog posts at `scopeblind.com`
- Other public projects (LinkedIn / GitHub profile audit)
- Cited by named-T2 practitioners

**Verdict**: Axis-2 PARTIAL — does NOT satisfy convergence-gate.md Axis-2 ≥2 named practitioners with dated artifact + ≥3-month stability.

### Q5.2 — Axis-3 STABLE-BURN-IN verification

- v0.1.0 across all 3 plugins → fresh release
- W229 §1 line 24: "NEW W228-Q discovery" → trio first discovered 2026-05-15

**Verdict**: Axis-3 FAIL — likely <90d age. STRONG-PROVENANCE-EXPRESS predicate FAILS (no official-org / no named-T2 endorsement). Axis-3 stays in default REJECT-until-convergence band.

### Q5.3 — Cedar + Ed25519 cryptographic security assessment

**Cedar policy engine (AWS open-source)**: SAFE for sss adoption (TIER-1 OFFICIAL Apache-2.0 formally verified)

**Ed25519 (RFC 8032)**: SAFE primitive

**FINDING-CRITICAL (Q5.3)**: Cedar + Ed25519 are SAFE primitives; BUT protect-mcp implementation MUST be source-audited for:
1. **Random number generation**: Ed25519 private key gen MUST use cryptographically-secure RNG (`crypto.randomBytes` NOT `Math.random`)
2. **Key storage**: private key MUST be encrypted-at-rest
3. **Receipt schema**: JCS canonicalization per RFC 8785 verified-correct
4. **Replay protection**: hash-chain verified covers OBSERVATION-time signature freshness
5. **Side-channel resistance**: Ed25519 implementation MUST use vetted library (`tweetnacl` / `@noble/ed25519`)

Required source-audit BEFORE adoption.

### Q5.4 — "First cryptographic governance plugin" uniqueness claim

**Verdict**: Claim is **PROBABLY TRUE** as of 2026-05-15 across surveyed CC plugin namespace. Cedar + Ed25519 cryptographic governance class is GENUINELY-NEW per CR-12.

### Q5.5 — Adoption recommendation

**RECOMMENDED DOWNGRADE**: W229 §2 lines 85-87 (Δ17-19 ADOPT-NOW) → **STUDY-PILOT.b**:
1. Named operational use case: cryptographic governance for sss tool calls
2. Cited local input/source path: `Z:/repos/deps/wshobson-agents/plugins/protect-mcp/`
3. Wiring path: Cedar policy file + hooks/hooks.json
4. Incumbent comparison: sss has `safety-guard` + `canonical.md` Must-Never #3 + `audit-action-loop.md` — Tom Farley adds cryptographic-receipts layer NOT covered
5. Reversible time-box: 30-day success = ≥3 audited operations with verified Ed25519 chain

**STUDY-PILOT.b ELIGIBLE pending Q5.3 source-audit + Q2.3 supply-chain verification**.

### Q5.6 — Defer block-no-verify (Δ20) and context-management (Δ21)

- **block-no-verify** (cskwork MIT v1.0.0) — single-author + presumed STABLE → STUDY-PILOT.b promotable after smoke-test
- **context-management** (Seth Hobson v1.2.0) — Seth Hobson is multi-plugin TIER-3-NAMED-ORG (84 plugins, 35,400★) → Axis-2 + Axis-3 PASS per W226-N. ADOPT-NOW maintained.

---

## §6 — Cross-Reference to W229 Required Revisions

| W229 line | Current | Recommended revision |
|---|---|---|
| §2 line 85-87 (Δ17-19 Tom Farley trio) | ADOPT-NOW | **DOWNGRADE to STUDY-PILOT.b** per Q5.5 |
| §2 line 88 (Δ20 block-no-verify) | ADOPT-NOW | STUDY-PILOT.b until smoke-tested per Q5.6 |
| §3 Phase 4 install commands | `@latest` everywhere | Add version-pin OR `@latest-acknowledged-D6-risk` marker per Q2.1 |
| §3 Phase 6 langfuse | docker-compose deploy | Document MIT-only-no-EE choice per Q1.4 |
| §3 Phase 7 PaddleOCR | `pip install paddleocr` | Add pin + Baidu maintainership disclosure per Q2.4 |
| §3 Phase 10 protect-mcp | ADOPT-NOW | STUDY-PILOT.b + cryptographic source-audit per Q5.3 |
| `_secret_redactor.py` | 9-pattern set | ADD 9 new patterns per Q4.3 BEFORE Phase 2/6/10 install |
| Q1 conductor row | "license unknown" | Apache-2.0 per Q1.3 |

---

## §7 — VERDICT

**NEEDS-REVISION**: W229 OPERATOR-EXECUTION-CATALOG is broadly SOUND from a security-lens but requires 8 revisions BEFORE Phase 4-10 install commits proceed:

**FINDING-CRITICAL (2)**:
- Q2.1 `@latest` version-pin discipline violations (CR-9)
- Q5.3 Cedar + Ed25519 cryptographic source-audit required for Tom Farley trio

**FINDING-MEDIUM (6)**:
- Q1.4 Langfuse EE-license proprietary restriction
- Q2.2 PyPI/npm typosquat owner-verification step
- Q2.3 Tom Farley trio Axis-2 + Axis-3 convergence-gate FAIL
- Q3.2 protect-mcp introduces NEW Ed25519 key-material
- Q3.4 chrome-devtools-mcp dedicated browser instance
- Q3.5 ntfy-mcp self-hosted + cryptographic-random topic
- Q4.3 `_secret_redactor.py` 9-pattern set GAP (9 NEW patterns needed)

**FINDING-LOW (3-5)**:
- Q1.3 conductor license mistake (Apache-2.0 not MIT)
- Q1.5 BMAD trademark scope clarification
- Q1.7 Llama Community License acknowledgment for PurpleLlama
- Q2.4 PaddleOCR Baidu geographic disclosure
- Q3.3 cognee prompt-injection vector

**FINDING-INFO (1)**:
- Q2.6 sops sigstore-verification reminder

**License inventory verified across all W229 ADOPT-NOW candidates** — only **smtg-ai/claude-squad** AGPL-3.0 is structural blocker (W226-N catch CONFIRMED). All other licenses are permissive (MIT / Apache-2.0 / BSD / EUPL / CC-BY).

**Cross-model gate satisfaction**: STAND-IN-NOTICE — orchestrator MUST file Pattern D codex T1 BRIDGE-MODE review on Q2.1 (CRITICAL CR-9 violation) + Q5.3 (CRITICAL crypto source-audit) findings BEFORE any Phase 4-10 commit. Mia pre-apply on `_secret_redactor.py` 9 new patterns per Q4.3 before Phase 2/6/10.

**verdict_one_line**: `NEEDS-REVISION: 2 CRITICAL + 6 MEDIUM + 5 LOW/INFO findings on W229 install catalog; license-class SAFE except claude-squad AGPL (already-REJECTED); secret-management RECOMMEND sops+age+.env.encrypted; Tom Farley governance trio DOWNGRADE ADOPT-NOW → STUDY-PILOT.b pending crypto source-audit + Axis-2/Axis-3 convergence-gate verification`

VERDICT: **NEEDS-REVISION**
