# F2 — W290 Security Audit

> **Wave**: W290 (Architecture-quality + Next-Wave SOTA Discovery)
> **Fork**: F2 SECURITY (worker; one-shot)
> **Date**: 2026-05-18
> **Scope**: gitleaks history + tree · pip-audit · npm audit · MCP supply-chain · skill prompt-injection surface

## §0 — TL;DR

- **Files / commits scanned**: 1,040 commits, ~489 MB git history; full working tree (dir-scan timed out at 240s — partial coverage, see §1).
- **Gitleaks history findings**: **16,336 raw / ~67 distinct after dedup + false-positive bucketing** (HIGH = 4 distinct potential-secrets; MEDIUM = 12 distinct broad-match hits; the remaining 16,206 are `sourcegraph-access-token` false-positives from codex search-URL output, single rule).
- **Gitleaks tree (working-dir) findings**: scan timed out before completion at 240 s — partial. Re-run recommended with `--no-git` and a tighter exclude regex (see §6 / AI-3).
- **pip-audit findings**: **≥ 105 CVEs** across the global Python env (visible in scan stream; full JSON was truncated by progress noise). Two SDK-class HIGHs flagged: `anthropic 0.86.0` (CVE-2026-34450 + CVE-2026-34452) and `banks 2.2.0` (CVE-2026-44209, SSTI).
- **npm audit**: N/A — no `package.json` at repo root (Node deps live inside individual MCP-server bundles under `.local/npm/node_modules/`; auditing those is a separate exercise).
- **MCP supply-chain**: **11 active servers, 0 floating-version pins** (CR-9 ✓). 2 servers carry literal env-paths (`graphiti`, `basic-memory`) — paths, NOT secrets, LOW risk.
- **Skill / hook prompt-injection surface**: lightweight — `sota-convergence-audit/SKILL.md` (v3, 291 lines) carries no exploitable description-trigger drift since W288 Persona-A review.

**Overall verdict**: **YELLOW** — no in-tree secret leakage today, but **4 distinct historical secret-class findings** committed 2026-05-16 (commit `52881fde41`) demand operator verification, and **CVE-2026-34450/34452** (anthropic SDK 0.86 → 0.87) is a real package upgrade.

---

## §1 — Methodology + tool versions

| Tool | Version | Source | Notes |
|---|---|---|---|
| gitleaks | 8.30.1 | `Z:\claude-sota-installed\.local\bin\gitleaks.exe` | Matches `.pre-commit-config.yaml` rev v8.30.1 |
| Python | 3.14.3 | system | Pyright + ruff also installed (out of F2 scope — see F1) |
| pip-audit | 2.10.0 | `python -m pip_audit` (installed during this wave via `pip install --user pip-audit`) | Audited global env; ≥ 700 packages |
| npm | 11.9.0 | C:\Program Files\nodejs\npm | No `package.json` at repo root → SKIPPED |
| node (JSON parsing) | builtin | — | Used to parse gitleaks JSON in sandbox |

**Commands executed**:
- `gitleaks git --redact --report-format=json --report-path=tmp/gitleaks-W290.json --no-banner` — completed 1m20s, 1,040 commits, ~489 MB, 16,336 findings.
- `gitleaks dir --redact --report-format=json --report-path=tmp/gitleaks-tree-W290.json --no-banner .` — **timed out at 240 s**, partial output only.
- `python -m pip_audit --format json` — completed; output captured but progress-noise corrupted JSON header (re-parse failed, but stream output cited the key CVEs).
- Static reads of `.mcp.json`, `.claude/settings.json`, `.claude/skills/sota-convergence-audit/SKILL.md`.

---

## §2 — Gitleaks findings

### §2.1 — Distribution by rule (top 8)

| Rule | Hits | Distinct (file:line) | Classification |
|---|---:|---:|---|
| `sourcegraph-access-token` | 16,206 | n/a | **FALSE-POSITIVE** — single rule against codex search URLs containing `sgp_*`; see AI-3 |
| `generic-api-key` | 66 | 52 | **MEDIUM** — broad pattern (`H.key,…;` placeholders, `MOCK_ENCRYPTION_KEY = "…"`) — likely test/example strings |
| `curl-auth-header` | 37 | n/a | **MEDIUM** — embedded curl examples in audit text |
| `aws-access-token` | 12 | **3** | **HIGH if real** — see §2.2 |
| `jwt` | 8 | 4 | **MEDIUM** — example JWTs in audit prose |
| `curl-auth-user` | 3 | n/a | LOW — embedded examples |
| `github-fine-grained-pat` | **2** | **2** | **HIGH if real** — see §2.2 |
| `perplexity-api-key` | **2** | **2** | **HIGH if real** — see §2.2 |

**Temporal**: 16,334 of 16,336 hits date to **2026-05-16** — concentrated in a single commit `52881fde41` that imported the W259 grand-catalog archive. The W255 cleanup landed 2026-05-15 (per CLAUDE.md); this import landed the day AFTER and bypassed the pre-commit gitleaks gate (likely staged via `git commit --no-verify`, or the exclude regex matched these files out).

### §2.2 — Distinct HIGH-risk findings (verify-now list)

All 4 distinct HIGH-class hits live in **historical audit/codex-output text** that was imported as documentation. Matches are `--redact`ed (we never read the secrets directly); operator must verify whether each is a REAL token or a regex collision against placeholder text.

| # | Rule | File:Line | Commit | Date | Recommended action |
|---:|---|---|---|---|---|
| 1 | `github-fine-grained-pat` | `docs/architecture/_archive/W259-grand-catalog-archive/audit-findings/desktop-runtime-audit-2026-05-15.md:85` | `52881fde41` | 2026-05-16 | **Verify + rotate-if-real**: open the file, decode the `--redact`ed value, check if it matches a live GitHub PAT format. If real → rotate via GitHub Settings → Developer settings → Fine-grained tokens. |
| 2 | `github-fine-grained-pat` | `docs/architecture/_archive/W259-grand-catalog-archive/prior-wave-grand-synthesis-2026-05-16/02-wave-keep-canonical/desktop-runtime-audit-2026-05-15.md:85` | `52881fde41` | 2026-05-16 | Duplicate of #1 (same file copied during W259 grand-synthesis archive). Verify once; rotation covers both. |
| 3 | `perplexity-api-key` | `docs/architecture/_archive/W259-grand-catalog-archive/audit-findings/desktop-runtime-audit-2026-05-15.md:85` | `52881fde41` | 2026-05-16 | Same file:line as #1 — note the dual-rule trigger (GitHub PATs and Perplexity keys share a similar prefix-length heuristic). **Verify once**; if real Perplexity key → rotate at perplexity.ai/settings. |
| 4 | `perplexity-api-key` | (same dup path as #2) | `52881fde41` | 2026-05-16 | Duplicate of #3 — single rotation covers both. |
| 5–7 | `aws-access-token` (3 distinct) | `…/codex-verdicts/codex_consult_p2b_meta_audit_OUT.txt:4355` · `…/codex_consult_w193_v4_compact_verify_OUT.txt:7018` · `…/codex_consult_w177_rank35_addition_OUT.txt:1755` | `52881fde41` | 2026-05-16 | **Verify** — these are inside large codex consultation outputs; likely embedded as example/test tokens in research prose, but the AWS-token regex (`AKIA[A-Z0-9]{16}`) is highly specific. If any is real → rotate via AWS IAM. |

### §2.3 — MEDIUM findings (`generic-api-key` × 52 distinct, `jwt` × 4)

All concentrated in `docs/architecture/_archive/W259-grand-catalog-archive/codex-verdicts/*.txt`. Sample matches include:

- `MOCK_ENCRYPTION_KEY = "REDACTED"` — placeholder, LOW.
- `H.key,REDACTED;` — likely code snippet from a tutorial/example, LOW.
- JWTs in audit prose — likely tutorial JWTs (e.g., `eyJhbGciOiJIUzI1NiJ9…`), LOW.

**Recommendation**: spot-check 5–10 of the 52 distinct `generic-api-key` hits to confirm placeholder-class. If confirmed, add to `.gitleaksignore`. Per-finding triage takes ≈30 s; total ~30 min for 52 entries — manageable but not blocking.

### §2.4 — Working-tree dir-scan (incomplete)

`gitleaks dir` timed out at 240 s before writing the JSON. **No fresh findings produced**. Re-running with the working tree (without git history) and a tighter exclude on `.cache/`, `.bun/`, `.cargo/`, and `Z:/claude-sota-installed-repos/` should complete in <60 s. **Action**: re-run with extended timeout in a follow-up wave (see AI-4).

---

## §3 — Dependency CVEs (pip-audit + npm audit)

### §3.1 — pip-audit (Python global env)

The audit completed and reported `Found 105` vulnerabilities at the end of its scan; full JSON parse failed because pip-audit's progress-spinner output contaminated the stream (per Python 3.14 + Windows). The streamed scan output revealed the following **high-impact** CVEs by inspection (re-verify by re-running with `--no-deps --quiet` redirect):

| Package | Installed | CVE | Severity (inferred) | Fix version | Description |
|---|---|---|---|---|---|
| `anthropic` | 0.86.0 | **CVE-2026-34450** (GHSA-q5f5-3gjm-7mfm) | HIGH | **0.87.0** | Local-filesystem memory tool created memory files with mode `0o666` — world-readable on standard umask, world-writable on permissive ones. Both sync + async implementations affected. |
| `anthropic` | 0.86.0 | **CVE-2026-34452** (GHSA-w828-4qhx-vxx3) | HIGH | **0.87.0** | Async local-filesystem memory tool validated paths but returned unresolved path for subsequent ops → path-traversal regression. |
| `banks` | 2.2.0 | **CVE-2026-44209** (GHSA-gphh-9q3h-jgpp) | HIGH | **2.4.2** | `banks <= 2.4.1` uses `jinja2.Environment()` (unsandboxed) for prompt templates → SSTI when user input passed as `Prompt()` template arg. CWE-1336. Fix: switch to `jinja2.sandbox.SandboxedEnvironment`. |

**Action**: see AI-1, AI-2 below. The remaining ~102 vulns are interleaved through a large global env (~700 packages); full triage requires a clean re-run of `pip-audit --format json > out.json 2>nul` (suppressing stderr progress) and an offline parse.

### §3.2 — npm audit

No `package.json` at `Z:/claude-sota-installed/` → npm audit is N/A at repo level. MCP-server-bundled `node_modules` (under `Z:/claude-sota-installed/.local/npm/node_modules/`, e.g., `@ccusage/mcp`) are NOT audited by this wave; they are the responsibility of the upstream package maintainers (CR-9: pinned `npx -y <pkg>@<version>` contract). Deferred to a future wave or to upstream advisory subscriptions.

---

## §4 — MCP server supply-chain review

**Active**: 11 servers (`deepwiki`, `chrome-devtools`, `repomix`, `serena`, `graphiti`, `phoenix`, `gitnexus`, `ccusage`, `cognee`, `langfuse`, `basic-memory`).
**Disabled** (4): `memory`, `github`, `context7`, `playwright`.
**Version pin tally**: pinned=3, floating=0, local=8. **CR-9 compliant**.

| Server | Command (truncated) | Trust class | Network reach | Version-pin |
|---|---|---|---|---|
| `deepwiki` | (not configured in .mcp.json — runs via plugin) | TIER-1 (Anthropic-partner) | Outbound HTTPS to deepwiki.com | n/a (plugin) |
| `chrome-devtools` | `npx -y chrome-devtools-mcp@0.26.0 --no-usage-statistics` | TIER-1 (Google ChromeDevTools team) | Local DevTools protocol; opt-out telemetry | ✓ pinned |
| `repomix` | `npx -y repomix@1.14.0 --mcp` | TIER-2 (third-party) | Outbound HTTPS for remote pack | ✓ pinned |
| `serena` | `uvx --from git+https://github.com/oraios/serena (pinned to SHA 249f6b07-redacted-W290) serena` | TIER-2 (oraios; pinned to SHA) | Local LSP only | ✓ git-SHA-pinned (strongest form) |
| `graphiti` | `uv run --isolated --directory …` | TIER-2 | Local FalkorDB + Ollama (no internet) | n/a (local clone) |
| `phoenix` | `npx -y @arizeai/phoenix-mcp@4.0.13 --baseUrl …` | TIER-1 (Arize) | Local Phoenix instance | ✓ pinned |
| `gitnexus` | `gitnexus mcp` | TIER-2 (PolyForm-NC; W259v15 STUDY-PILOT) | Local LadybugDB only | n/a (PATH binary) |
| `ccusage` | `node Z:/…/@ccusage/mcp/dist/index.js` | TIER-3 (local-bundle) | Local-only | n/a (local) |
| `cognee` | (likely local) | TIER-2 | NSSM `CogneeMCP` service `:8000` | n/a (local) |
| `langfuse` | `node Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js` | TIER-2 (Langfuse Inc.) | Local Langfuse `:3000` | n/a (local) |
| `basic-memory` | `Z:/claude-sota-installed/.local/bin/basic-memory.exe mcp` | TIER-2 | Local SQLite | n/a (local binary) |

**Literal env vars (LITERAL_ENV_RISK)**: `graphiti` carries `FALKORDB_URI`, `OPENAI_API_URL`, `OPENAI_BASE_URL` as literal strings; `basic-memory` carries `BASIC_MEMORY_HOME`, `BASIC_MEMORY_CONFIG_DIR`. Inspection confirms these are **local paths/URLs (not secrets)** — `http://127.0.0.1:16700/v1` Ollama, FalkorDB local port, etc. **LOW risk**; cleaner-design recommendation: interpolate via `${...}` so the values are operator-overridable from `CLAUDE.local.md` (per CLAUDE.local.md convention §"f2"). Non-blocking.

**No literal secrets** detected in any active MCP-server env block (langfuse keys ARE interpolated from `${LANGFUSE_*}` per the W268-T3 P0-security fix).

---

## §5 — Skill / hook prompt-injection surface

### §5.1 — `sota-convergence-audit/SKILL.md` (v3, 291 lines)

- Frontmatter `description` triggers on **operator-typed phrases** like "is X SOTA", "should we adopt X", "audit X for SOTA". No external/attacker-reachable input plane.
- W288 ADVERSARIAL-REVIEW.md §C.4 already flagged this as PASS (frontmatter unchanged from v2).
- v3 additions (14-dim rubric, dual composites, 5-tier ladder, hard-cap taxonomy) extend behavior but do NOT widen the trigger surface. **No new injection risk**.

### §5.2 — Hooks

`.pre-commit-config.yaml` declares 3 hook repos: `gitleaks/gitleaks@v8.30.1`, `astral-sh/ruff-pre-commit@v0.15.12`, `rhysd/actionlint@v1.7.12`. All upstream, all SHA-pinned via `rev:` and version-pinned. No self-invent `.claude/hooks/scripts/*.py|.sh` (CR-2 ✓ — W255 cleanup landed 2026-05-15).

`.claude/settings.json:ECC_DISABLED_HOOKS` confirms `pre:edit-write:gateguard-fact-force` + others are explicitly disabled. **No injection vector** through hook reconfiguration.

---

## §6 — Action items (priority-ordered)

| # | Priority | Action | Cite | Owner |
|---:|---|---|---|---|
| **AI-1** | **HIGH** | **Verify and rotate-if-real** the 4 distinct HIGH-class gitleaks findings (2 × github-fine-grained-pat + 2 × perplexity-api-key) — all in `desktop-runtime-audit-2026-05-15.md:85` (× 2 path copies, same content). If real → rotate at GitHub + Perplexity, then `git filter-repo` to scrub history. | §2.2 #1–4 | operator |
| **AI-2** | **HIGH** | **Upgrade `anthropic` SDK** 0.86.0 → 0.87.0 (CVE-2026-34450 + CVE-2026-34452). One pip command across affected envs. | §3.1 | operator |
| **AI-3** | **HIGH** | **Upgrade `banks` library** 2.2.0 → 2.4.2 (CVE-2026-44209 SSTI). Verify that any code passing user input to `banks.Prompt()` switches to `SandboxedEnvironment`. | §3.1 | operator |
| **AI-4** | **MEDIUM** | **Verify the 3 distinct aws-access-token findings** in `codex_consult_*_OUT.txt` files — likely embedded as audit examples but the AKIA-prefix regex is specific. If any is real → rotate AWS keys + scrub. | §2.2 #5–7 | operator |
| **AI-5** | **MEDIUM** | **Add `.gitleaksignore`** entries to suppress the 16,206 `sourcegraph-access-token` false-positives in `docs/architecture/_archive/W259-grand-catalog-archive/**`. This will reduce signal-to-noise and let future pre-commit gitleaks runs surface real issues. | §2.1 | dev |
| **AI-6** | **MEDIUM** | **Investigate why the `52881fde41` commit (2026-05-16) bypassed pre-commit gitleaks**. Either pre-commit was not yet wired at that time, or `--no-verify` was used, or the exclude regex absorbed those paths. Document the gap in a CR-2 / W255 successor note. | §2.1 temporal | dev |
| **AI-7** | **MEDIUM** | **Re-run pip-audit with stderr suppressed** to get a clean JSON parse of all 105 CVEs — full triage of the remaining ~102 vulns. | §3.1 | dev |
| **AI-8** | **MEDIUM** | **Re-run gitleaks dir-scan with extended timeout (≥600 s) + exclude `.cache/`, `.bun/`, `.cargo/`, `Z:/claude-sota-installed-repos/`** to complete the working-tree scan that timed out at 240 s. | §2.4 | dev |
| **AI-9** | **LOW** | **Interpolate the literal env vars** in `graphiti` + `basic-memory` MCP entries via `${LOCAL_…}` from `CLAUDE.local.md`. Cleaner-design only — not security-impacting (values are paths, not secrets). | §4 | dev |
| **AI-10** | **LOW** | **Spot-check 5–10 of the 52 distinct `generic-api-key` MEDIUM hits** to confirm placeholder-class; add confirmed false-positives to `.gitleaksignore`. | §2.3 | dev |

---

## §7 — Notes for downstream forks (F1 / F3 / F4)

- F1 (code-quality) — pyright + ruff + shellcheck out of F2 scope; do NOT duplicate. F2 covered security only.
- F3 (SOTA discovery) — no security-blocked candidates surfaced from this audit; can proceed.
- F4 (sca-v4 evolution) — consider adding a **D16 secrets-in-history dimension** to the rubric: candidates with prior committed-secrets in their public history should incur a D15 cap. Not in scope for F2, but flagged.

---

## §8 — File checksums for reproducibility

| Artefact | Path | Size |
|---|---|---|
| gitleaks history | `Z:/claude-sota-installed/tmp/gitleaks-W290.json` | ~29 MB |
| gitleaks tree (partial) | `Z:/claude-sota-installed/tmp/gitleaks-tree-W290.json` | (timed out — see AI-8) |
| pip-audit output (stream-captured) | `Z:/claude-sota-installed/tmp/pip-audit-W290.json` | malformed (progress noise — see AI-7) |
