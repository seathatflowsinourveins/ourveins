# Wave 80 Agent A — SOTA architectural+opt repos NOT covered (sota-researcher Sonnet stand-in)

**Origin**: 3-agent parallel wave dispatch (CADP rule 2 max 3 concurrent) per advanced-agent-team-standing-directive
**Brief**: Architectural-enhance + optimization repos NOT in V64 token-opt-arsenal
**Verdict origin**: Sonnet stand-in (NOT BRIDGE-MODE GPT-5.5; cardinal-rule-3 cross-model gate NOT satisfied for this artifact)
**Tool count**: 33 / Duration: 407s

## §1 KITS COVERED
v40 / v45 / v55 / v60 / v64 (Wave 79) — read TOKEN_CONTEXT_ARCHITECTURE.md / SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md / WHAT_MORE_WAS_NOT_COVERED_ENOUGH.md per kit. Result: NONE cover multi-account-fleet smart-routing / cache-aware-routing / semantic-cache middleware / KV-cache layers / LLM-routing frameworks. SOTA_REPOS list has zero LLM-gateway/router/caching-middleware category.

## §2 GAP REPOS DISCOVERED (8 repos)

| ID | Repo | Stars | License | Age | Mia state |
|---|---|---|---|---|---|
| G-1 | BerriAI/litellm | 46,120 | MIT | ~33mo MATURE | NOT installed |
| G-2 | Helicone/ai-gateway | 587 | Apache-2 | ~12.5mo | NOT installed; npm `0.2.0-beta.30` |
| G-3 | Portkey-AI/gateway | 11,638 | MIT | ~33mo MATURE | NOT installed |
| G-4 | zilliztech/GPTCache | 8,020 | MIT | ~38mo MATURE | NOT installed |
| G-5 | LMCache/LMCache | 8,220 | Apache-2 | ~24mo | NOT installed |
| G-6 | lm-sys/RouteLLM | 4,862 | Apache-2 | ~23mo MATURE | NOT installed |
| G-7 | kaitranntt/ccs | 2,299 | TBD | ~6.2mo ACTIVE-ITER | **INSTALLED via npm @kaitranntt/ccs@7.63.0; auto-created `.ccs/config.yaml`** |
| G-8 | codeking-ai/cligate | 58 | TBD | ~1.5mo | NOT installed; REJECT axis-3 fail |

## §3 ARCHITECTURAL PATTERNS NOT IN V64 (or Wave 79)

V64 covered: per-agent admission control / cross-agent compression / token measurement / shell-output compression / semantic retrieval. NONE cover **fleet-layer Layer-2 routing/caching primitives between Claude Code and the multi-account proxy**.

Layer model:
- **Layer 1**: per-agent (V64 partial: context-mode + statusline INSTALLED in Wave 79)
- **Layer 2**: GAP — fleet-layer smart-routing/cache (Helicone/LiteLLM/Portkey/GPTCache/RouteLLM)
- **Layer 3**: CLIProxyAPI raw round-robin (already INSTALLED)

Distinct patterns:
1. Smart-routing strategies (P2C+PeakEWMA / model-latency / weighted / cost-optimization)
2. Semantic LLM-response cache (paraphrase deflection)
3. Strong-vs-weak model routing (query-difficulty classification)
4. Multi-provider unified gateway (drop-in OpenAI-format proxy)
5. Multi-account profile-switching dashboard (ccs)
6. Circuit-breaker + per-user token budgets at gateway layer
7. KV-cache externalization (model-internal; REJECT for proxy-only eee)

## §4 RANKING (Agent A original — pre-Mia)

**TIER-A ADOPT-NOW**:
- #1 ccs (already npm-installed; just needs configuration)
- #2 Helicone/ai-gateway (Rust + Redis+S3 cache + 4 routing strategies)

**TIER-B STUDY-PILOT**: GPTCache / LiteLLM / RouteLLM / Portkey

**TIER-C REJECT**: LMCache (CATEGORY-MISMATCH proxy-only) / cligate (axis-3 age fail)

## §4.5 MIA PRE-APPLY OVERRIDE (orchestrator-side; both TIER-A picks DOWNGRADED)

Per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` cite-import-AMBER + `fm20-path-drift-cascade.md` (synthesis-boundary verification BEFORE Pattern A apply):

### G-7 ccs DOWNGRADE: TIER-A ADOPT-NOW → TIER-B STUDY-PILOT
- **Mia probe**: Agent A's prescription says wire via env vars `CCS_DASHBOARD_PORT=7878` + `CCS_PROXY_BACKEND=http://127.0.0.1:9327`
- **Refutation**: ccs config is **YAML-FILE-BASED** at `Z:/claude-sota-installed/.ccs/config.yaml` auto-created by `ccs --version` first-run. The unified config has `accounts: {}` / `profiles: {}` / `cliproxy.{backend: plus, oauth_accounts: {}, providers: [...], variants: {}, logging: {...}, safety: ...}` sections. NO env-var-driven config layer.
- **Architectural finding**: ccs WRAPS CLIProxyAPI (`cliproxy.backend: plus` is the default), it's NOT a parallel layer. Adoption = full architectural migration: (a) migrate 10 OAuth files from `Z:/claude-sota-installed/.cli-proxy-api/*.json` to ccs-managed accounts; (b) reconfigure round-robin + 1h session affinity via ccs profile system; (c) flip `ANTHROPIC_BASE_URL` to ccs-managed proxy port.
- **Verdict**: install-class WIRED ≠ adoption-ready. The 95.6% cache_read rate Wave 79 baseline is via direct CLIProxyAPI; migration risk + retest cost + sibling-bleed defense (per CR-9). **STUDY-PILOT** with explicit migration plan, NOT ADOPT-NOW.

### G-2 Helicone DOWNGRADE: TIER-A ADOPT-NOW → TIER-B STUDY-PILOT
- **Mia probe**: `npm view @helicone/ai-gateway version` returns `0.2.0-beta.30` — **pre-1.0 BETA**.
- **Docker probe**: `helicone/ai-gateway` image exists at 6066 pulls / 0 stars (fresh).
- **Refutation**: CR-9 install-risk discipline forbids `@latest` without explicit acknowledgment + beta-version-pinning is unreliable (rapid breaking changes between `0.2.0-betaN` releases). 587★ subproject of larger Helicone/helicone TS repo — Axis 3 STABLE-BURN-IN status NOT satisfied at sub-project level.
- **Verdict**: STUDY-PILOT until 1.0+ stable lands. Re-evaluate when `@helicone/ai-gateway@1.0.0` ships.

### Net Wave-80-A pre-Pattern-A scope: ZERO ADOPT-NOW (both TIER-A picks REFUTED-OVER per FM-20 path-drift cascade — Agent A returned prescriptions that survived its convergence-gate Axis-1+3 partial PASS but failed Mia operational-claim probe at synthesis layer).

## §5 INTEGRATION SHAPE (DEFERRED to Ship 1B+ pending Agents B+C return)

Both TIER-A picks now require architectural review. Original Agent A integration shapes preserved as STUDY material:
- ccs: yaml config schema is rich enough to model 10-account fleet + 4-key API stratification + multi-provider variants — viable but non-trivial migration
- Helicone: drop-in proxy chain `CC → helicone-gateway → CLIProxyAPI → Anthropic` adds Layer-2 routing/cache; pin to 1.0+ stable when available

## Honesty disclosures
- Cross-model gate **NOT satisfied** for this artifact (Sonnet stand-in; cardinal-rule-3 Phase 1 bootstrap exception requires GPT-5.5 e2e)
- Probe-6 deep audit skipped on G-1/G-2/G-3/G-4/G-5/G-6 per cost-discipline; P5 README + P4 stars+age load-bearing
- Convergence-gate Axis-2 (≥2 named-T2 practitioners with dated artifact) NOT verified for any gap repo
- Mia pre-apply REFUTED-OVER both TIER-A picks (G-7 env-var fabrication; G-2 beta-pinning forbidden)
- HONEST-NON-FINDING: Layer-2 architectural gap is real (no kit covers it), but no ADOPT-NOW-ready primitive surfaced in this wave

## HANDOFF
verdict_one_line: DONE_WITH_CONCERNS — 8 repos surfaced; 2 TIER-A picks DOWNGRADED to STUDY-PILOT post-Mia probe. Architectural gap real (Layer-2 missing), but no install-ready ADOPT-NOW emerged. Pending Agents B+C synthesis for cross-cohort verdict.
