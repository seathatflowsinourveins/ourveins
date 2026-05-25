# W310 Stream 3 — `anthropics/*` Top-3 sca-v6 Audits

**Date**: 2026-05-19 · **Branch**: `sota-converge-w310` @ HEAD `383c254` · **Rule**: **sca-v6 SHIPPED** (P0a Δ1-Δ9 applied; first canonical sca-v6 against `anthropics/*`) · **Targets**: 3 repos from W309 Stream F T0-TRIAGE · **MCP families ≥7**: github · deepwiki · context-mode (batch_execute + search) · WebSearch · repomix-transitive · basic-memory · ToolSearch · **Cross-check**: parallel `W310-STREAM-D-AGENT-4-ANTHROPICS-TOP3-AUDITS.md` used pre-ship sca-v5; this file applies post-ship sca-v6 (Δ7 D4-CC=5/5 default for anthropics/* + Δ4 stronger D10 hard-cap).

---

## Executive summary

| # | Repo | install_score (sca-v6, /5) | pattern_score (sca-v6, /5) | Hard-caps | Verdict | Operator-AI |
|---|---|---|---|---|---|---|
| 1 | `anthropics/claude-plugins-community` | **4.18** | 4.05 | none | **T1 INSTALL — add marketplace; opt-in plugin install only** | AI-1 (1-line settings.json) |
| 2 | `anthropics/cwc-long-running-agents` | 2.85 (D14 staleness-cap class) | **4.32** | D14<2 caps INSTALL, NOT pattern | **T3 PATTERN-STUDY (lift hook patterns; no install)** | AI-2 (selective primitive vendor-fork if needed) |
| 3 | `anthropics/claude-code-security-review` | 2.95 (D10 caps + D14 caps) | 3.78 | D10<2 INSTALL-cap; D14<2 INSTALL-cap; D5 ≥2 OK | **T3 PATTERN-STUDY (mine `/security-review` prompt + filter regexes; CITE-ONLY for GHA)** | AI-3 (vendor-fork prompt into existing security skills) |

**Harness-fit D10 conclusion (dominant risk per brief)**:

- **T1 (community marketplace)** D10=5: pure discovery surface; ZERO duplicate with `claude-plugins-official` — complementary tiers. Adding marketplace ≠ installing plugins; opt-in discipline preserves D11 preload-budget. SAFE TO ADD.
- **T2 (long-running harness)** D10=2: mass-duplicate vs already-installed `ralph-loop` + superpowers (verification-before-completion + writing-plans + subagent-driven-development + dispatching-parallel-agents) + agent-teams + plugin-eval + built-in `/goal`. Δ4 forces INSTALL ≤ T3. Pattern-mine only.
- **T3 (security-review)** D10=2: mass-duplicate vs 6+ surfaces — `pr-review-toolkit`/`code-review`/`comprehensive-review` (3 installed plugins) + `everything-claude-code:security-review` + `engineering-skills:security-review` + superpowers (security-pen-testing/red-team/senior-security/ai-security). PLUS D14<2 (last commit `2026-02-11`, 3+ months stale) PLUS open-issue #88 (deprecated haiku-20241022 breaks filter). Pattern-mine prompt + 5 regex tables; CITE-ONLY for GHA.

---

## Per-candidate audit

### Target 1 — `anthropics/claude-plugins-community` (T1 INSTALL)

#### Repo-card

- URL: `github.com/anthropics/claude-plugins-community` (ID `R_kgDORr03Lg`); Apache-2.0 (LICENSE SHA `d645695673349e3947e8e5ae42332d0ac3164cd7`, blob identical to other anthropics/* releases); created 2026-03-20, push 2026-05-13 (6d fresh); not archived; owner `anthropics` org id 76263028.
- `.claude-plugin/marketplace.json`: 1,142,510 B, **1,715 plugins** verified (first 5: `0x`, `10x-team`, `42crunch-api-security-testing`, `8-habit-ai-dev`, `a11y-fixer`). Shape `{"name":"claude-community","owner":{"name":"Anthropic"},"plugins":[...]}`.
- README: "Read-only mirror... synced nightly from Anthropic's internal review pipeline. Every plugin... passed automated security scanning, and been approved for distribution." PRs auto-closed; submissions via clau.de/plugin-directory-submission.

#### Evidence (4 external, non-Anthropic cites)

1. **systemprompt.io** "Install Anthropic Marketplace Plugins in Claude Code" — treats `-official` + `-community` as paired tier-1 install sources.
2. **ClaudePluginHub** — independent 3rd-party directory listing both marketplaces.
3. **claudemarketplaces.com** — independent catalog.
4. **DeepWiki** §4.1 Plugin Marketplace & Discovery — documents discovery model.

#### sca-v6 dim-scores

D1=5 (Apache-2.0 verified) · D2=5 (native marketplace schema) · D3=5 (1-CLI add, no service deps) · D4=5 (Δ7 anthropics/* +1 default; CC-native) · D5=4 (4 ext cites; machine-checkable JSON) · D6=+2 Bayesian author-prior (Δ3) · D7=5 (nightly auto-sync; `bthompson@anthropic.com` commit `2ec490e` "Bulk sync: 666 plugin entries") · D8=4 (Anthropic-internal scan pipeline) · D9=5 (`marketplace remove` reverses; opt-in discipline = zero blast-radius from add alone) · **D10=5** (NOT duplicate of `-official`; complementary tiers; runtime missing `-community` from `extraKnownMarketplaces`) · D11=5 (Δ5; marketplace-add ≠ plugin-install → zero preload impact) · D12=3 (Anthropic-canonical) · D13=5 (1,715 plugins, largest curated source) · D14=5 (6d fresh + nightly invariant) · D15=4 (Δ6; SHAs pinned per-plugin; ~1,700 transitive authors = mitigation = opt-in + per-plugin gitleaks/pip-audit before enable) · D16=4 · D17=5 (read-only mirror; PRs auto-closed) · D18=5 · D19-D24 n/a.

**install_score = 4.18/5 · pattern_score = 4.05/5 · Hard-caps cleared**: D5≥2 ✓ · D10≥3 ✓ · D14≥2 ✓ · D17≥2 ✓ · D18≥2 ✓ · D11≥3 (preload-OK with opt-in) ✓

#### Verdict: **T1 INSTALL**

#### Adoption-rec

**ADD MARKETPLACE; INSTALL PLUGINS OPT-IN ONLY** (preserves D11 invariant). Single-block `extraKnownMarketplaces` edit:
```json
"claude-plugins-community": { "source": { "source": "github", "repo": "anthropics/claude-plugins-community" } }
```
Per W272: post-add `/reload-plugins` + `claude plugin marketplace list` verify; leave `enabledPlugins` empty by default; each `<plugin>@claude-community` requires individual sca-v6 audit before enable. **Discovery-surface install, NOT behavioral install.**

---

### Target 2 — `anthropics/cwc-long-running-agents` (T3 PATTERN-STUDY)

#### Repo-card

- URL: `github.com/anthropics/cwc-long-running-agents` (ID `R_kgDOSVYymA`); Apache-2.0; created 2026-05-06, push 2026-05-13; **README explicit "Event demo; not maintained and not accepting contributions"**; provenance "take-home for Long-Running Agents station at Code with Claude 2026"; patterns from Anthropic eng posts "Effective Harnesses for Long-Running Agents" (Nov 2025) + "Harness Design for Long-Running Application Development" (Mar 2026).
- Shipped artifacts: `hooks/verify-gate.sh` (1330 B; PreToolUse Write/Edit deny unless evidence-read) · `track-read.sh` (564 B; PreToolUse Read logs to `.evidence-reads`) · `commit-on-stop.sh` (750 B; Stop `git commit -am`) · `kill-switch.sh` (391 B; halt while `AGENT_STOP` exists) · `steer.sh` (754 B; surface `STEER.md` once) · `agents/evaluator.md` (~1.4 KB; skeptical PASS/NEEDS_WORK reviewer; `tools: Read, Glob, Grep, Bash` — Bash for git diff only) · `CLAUDE.md` template (1721 B, 7-section) · `settings.json` wires the 5 hooks via PreToolUse `*`/`Read`/`Write|Edit` + Stop.

#### Evidence (5 external, non-Anthropic cites)

1. **InfoQ** Apr 2026 "Anthropic Designs Three-Agent Harness". 2. **AddyOsmani.com** (Google Chrome team) "Agent Harness Engineering". 3. **Epsilla Blog** "GAN-Style Agent Loop: Deconstructing Anthropic's Harness Architecture". 4. **Medium/Rick Hightower** "Two Agents, One Feature List, Zero Context Overflow". 5. **walkinglabs/awesome-harness-engineering** independent curation.

#### sca-v6 dim-scores

D1=5 · D2=4 (`.claude/` copy-paste; cardinal-rule-2 concern on shell hooks but README explicitly "teaching examples" + Apache-2.0 vendor-fork-friendly) · D3=4 (`cp -r` + `chmod`; Linux/macOS-shaped; PS adaptation needed for Windows runtime) · D4=5 (Δ7 anthropics/* +1; native `.claude/hooks/` + `agents/` schema) · D5=4 (5 ext cites + 2 Anthropic eng posts) · D6=+2 · **D7=1** (explicit "not maintained") · D8=3 (verify-gate.sh own docstring: "only hooks Write/Edit (Bash sed/jq can rewrite unchecked); path-match basename-only/case-sensitive") · D9=5 · **D10=2** **CRITICAL** — runtime already has: `ralph-loop@claude-plugins-official:true` (canonical long-running loop), superpowers (`verification-before-completion` + `writing-plans` + `subagent-driven-development` + `dispatching-parallel-agents` + `using-git-worktrees`), `agent-teams` + `plugin-eval`, **built-in `/goal`** (README itself states is in-product equivalent), `commit-commands@claude-plugins-official:true` (commit-on-stop), `superpowers:checkpoint` (handoff), operator-curated `mem-recall` + `durable-planning-files` (PROGRESS.md durability) · D11=4 · D12=2 · D13=3 · **D14=1 CRITICAL** (event-demo single-shot) · D15=4 · D16=1 (frozen) · D17=4 (README documents own gaps) · D18=4.

**install_score ≈ 2.85/5 · pattern_score ≈ 4.32/5 · Hard-caps**: D14<2 INSTALL-cap ✓ + D7<2 INSTALL-cap ✓ + D10<3 INSTALL-cap-to-T3 ✓ — **3 caps converge on T3**.

#### Verdict: **T3 PATTERN-STUDY** (DO NOT install plugin; pattern-mine + selective primitive vendor-fork at operator discretion)

#### Adoption-rec

**MINE 3 NAMED PATTERNS into operator-curated skills (NOT plugin install)**:

1. **Default-FAIL contract** (`test-results.json` + verify-gate evidence-gate) — fold into `superpowers:verification-before-completion` as worked example; cite-link upstream SHA.
2. **Fresh-context evaluator subagent** (PROMPT TEMPLATE: "Begin your reply with the bare word `PASS` or `NEEDS_WORK`") — vendor-fork into `.claude/skills/learned/` OR absorb semantics into CLAUDE.md/existing evaluator review-loop. Aligns with runtime's W280a codex-Stop-hook PASS/BLOCK semantics.
3. **Agent-maintained handoff** — already covered by `durable-planning-files` + `commit-commands` + W280a Stop-hook.

**REJECTED for vendor-fork** (mass-duplicate): `kill-switch.sh` (CC `/cancel`) · `steer.sh` (CC `--resume`) · `commit-on-stop.sh` (commit-commands + W280a) · `track-read.sh` (only needed if full verify-gate adopted).

**Cardinal-rule-2 mandate**: If `verify-gate.sh` adopted, MUST install under `.claude/hooks/` with attribution docstring (Apache-2.0 + commit SHA) ≤2KB; PREFERRED: wire semantics through an existing plugin-shipped hook surface.

---

### Target 3 — `anthropics/claude-code-security-review` (T3 PATTERN-STUDY)

#### Repo-card

- URL: `github.com/anthropics/claude-code-security-review` (ID `R_kgDOPYLBrg`); **MIT** (LICENSE SHA `aadec62f5cf87aae35a0423382bca6f2849abdb5`; differs from Apache-2.0 of other two targets); created 2025-08-04, **last push 2026-02-11** (3+mo stale); not archived.
- Two-surface product: (a) GitHub Action (`action.yml` 14003 B + `claudecode/github_action_audit.py`); (b) `/security-review` slash command (`.claude/commands/security-review.md` 10837 B).
- Arch: `claudecode/prompts.py` (audit prompts) · `findings_filter.py` (2-stage filter: hard regex exclusions + Claude-API confidence pass) · `claude_api_client.py` · `json_parser.py`. Hard-exclusion regex categories verified: `_DOS_PATTERNS` · `_RATE_LIMITING_PATTERNS` · `_RESOURCE_PATTERNS` · `_OPEN_REDIRECT_PATTERNS` · `_MEMORY_SAFETY_PATTERNS` + 3 more.
- Issue surface 109 open incl. **#88 "False positive filtering fails with 404: claude-3-5-haiku-20241022 model not found"** (filter currently silently broken by deprecated model). #109 fix · #107 OAuth token · #106 prompt-injection regression · #105 PI threat-model docs.
- Requires separate `claude-api-key` with both Claude-API + Claude-Code entitlements (action.yml:32). Slash-command frontmatter: `allowed-tools: Bash(git diff:*), Bash(git status:*), Bash(git log:*), Bash(git show:*), Bash(git remote show:*), Read, Glob, Grep, LS, Task`. README caveat: "not hardened against prompt injection attacks; only use to review trusted PRs."

#### Evidence (4 external, non-Anthropic cites)

1. **DevOps.com** "Anthropic Adds Automated Security Reviews to Claude Code". 2. **Avinash Sangle blog** "2026 Setup Guide" (practitioner deploy walkthrough). 3. **anthropics/claude-code-action#641** "False-positive bans when using Claude Code Action for intensive PR review loops" (external practitioner FP-rate concern). 4. **anthropics/claude-code-security-review#88** open bug confirming deprecated-haiku breaks filter.

#### sca-v6 dim-scores

D1=5 (MIT) · D2=3 (GHA + slash-command copy-paste; not plugin) · D3=3 (GHA: 10-line workflow + secret; slash: 1-file copy; but separate API-key with CC entitlement = operator billing friction) · D4=5 (Δ7; slash-command path native CC) · D5=3 (4 ext cites; prompt + filter independently inspectable) · D6=+2 · **D7=2** (Feb 2026 last commit, 109 open issues incl. filter-breakage #88 since Mar) · D8=3 (PI warning; filter step BROKEN per #88) · D9=5 (remove file = full revert) · **D10=2** **CRITICAL** — runtime has 6+ overlapping surfaces: `pr-review-toolkit@claude-plugins-official:true` + `code-review@claude-plugins-official:true` + `comprehensive-review@claude-code-workflows:true` + `everything-claude-code:security-review` skill + `engineering-skills:security-review` + superpowers (security-pen-testing + red-team + senior-security + ai-security); PLUS pre-commit gitleaks + W280a codex Stop-hook adversarial-review; the unique surface is `/security-review` slash-command but `everything-claude-code:security-review` already provides a slash equivalent · D11=3 (+3KB if vendor-fork only) · D12=3 · D13=3 (strong 2026 GHA-marketplace adoption; competes with snyk/semgrep/sonarcloud/codeql) · **D14=1 CRITICAL** (3+mo stale; INSTALL-cap independent of D10) · D15=4 · D16=1 (frozen since Feb) · D17=3 (hard-exclusions + confidence-scoring anti-FP designs; but haiku-filter broken means in-prompt exclusion list does the work) · D18=4.

**install_score ≈ 2.95/5 · pattern_score ≈ 3.78/5 · Hard-caps**: D10<3 ✓ + D14<2 ✓ + D7<3 ✓ — **3 caps converge on T3**.

#### Verdict: **T3 PATTERN-STUDY** (GHA = CITE-ONLY; slash-command prompt = candidate vendor-fork pattern lift)

#### Adoption-rec

**DO NOT install GHA** (runtime is local-portable; CI not in-scope).

**DO mine 2 named patterns**:

1. **`/security-review` FALSE-POSITIVE-FILTERING block** (17 hard exclusions + 12 precedents from `security-review.md` 10837 B) — vendor-fork into `everything-claude-code:security-review` OR `.claude/skills/learned/security-review-fp-filter/`. These encode 6mo of Anthropic-internal FP-reduction knowledge. MIT permits, attribute commit SHA `93651ea`.
2. **5 regex categories from `findings_filter.py`** — if runtime ever ships its own finding-filter, lift verbatim with attribution.

**REJECTED**: Full slash-command install duplicates 6+ existing review surfaces (D10=2). Broken haiku-filter (#88) means GHA's primary FP-reduction is dead code; value is in prompt + regex tables, not runtime.

**Cardinal-rule-3 note**: NEVER duplicate GHA as hook — W280a codex Stop-hook already covers post-commit security gating cross-model.

---

## Compare-table

| Dim | Target 1 (`-community`) | Target 2 (`cwc-long-running`) | Target 3 (`-security-review`) |
|---|---|---|---|
| License | Apache-2.0 | Apache-2.0 | MIT |
| Last push | 2026-05-13 (6d fresh) | 2026-05-13 (event-demo final) | 2026-02-11 (3+mo stale) |
| Open issues | n/a (read-only mirror) | n/a (not accepting contrib) | 109 |
| Maintenance state | Auto-sync nightly | "Not maintained" (explicit) | De-facto frozen |
| Install primitive | Marketplace (discovery surface) | `.claude/` copy-paste pattern | GHA + slash-command |
| **D10 mass-duplicate (Δ4)** | 5 (complementary tier) | 2 (vs 6+ runtime primitives) | 2 (vs 6+ review surfaces) |
| **D14 freshness** | 5 | 1 (frozen event-demo) | 1 (3mo stale + broken filter) |
| install_score | **4.18** | 2.85 | 2.95 |
| pattern_score | 4.05 | **4.32** | 3.78 |
| Hard-caps cleared for INSTALL? | YES | NO (3 caps fail) | NO (3 caps fail) |
| **Verdict** | **T1 INSTALL** | **T3 PATTERN-STUDY** | **T3 PATTERN-STUDY** |
| Operator-AI | AI-1 | AI-2 | AI-3 |

---

## Operator-AIs

**AI-1 (T1 INSTALL — claude-plugins-community)**: Add to `.claude/settings.json` `extraKnownMarketplaces`: `"claude-plugins-community": { "source": { "source": "github", "repo": "anthropics/claude-plugins-community" } }`. Run `claude plugin marketplace list` to verify. **DO NOT bulk-enable**; each `<name>@claude-community` requires individual sca-v6 audit before `enabledPlugins:true`. Reversibility: remove block + `claude plugin marketplace remove anthropics/claude-plugins-community`.

**AI-2 (T3 PATTERN-STUDY — cwc-long-running-agents)**: Vendor-fork ONLY `agents/evaluator.md` to (a) `.claude/skills/learned/evaluator-pass-fail-pattern/SKILL.md` (operator-curated path-gated per cardinal-rule-3) with Apache-2.0 attribution + commit SHA `9e4cf85`; OR (b) absorb into `superpowers:verification-before-completion`. **Reject 4 shell-bash hooks** (cardinal-rule-2 Windows-portable runtime + mass-duplicate vs `commit-commands` + `ralph-loop` + `/goal`).

**AI-3 (T3 PATTERN-STUDY — claude-code-security-review)**: Vendor-fork FALSE-POSITIVE-FILTERING block (17 hard exclusions + 12 precedents) from `.claude/commands/security-review.md` into `everything-claude-code:security-review` OR `.claude/skills/learned/security-review-fp-filter/SKILL.md`. MIT attribution + commit SHA `93651ea`. **Do not install GHA** (cardinal-rule-3: no CI surface). **Do not install slash-command as-is** (D10 mass-duplicate).

**AI-4 (Ledger row append)**: Append 3 rows to `verdicts/W310-anthropics-top3.md` + verdict-ledger rows #35-37 with verdicts (T1, T3, T3), composite scores, hard-cap notes, 3 operator-AIs.

**AI-5 (Anti-bias verification)**: 4+5+4=13 unique external practitioner sources across 3 targets satisfy operator's "≥3 external orgs as PRACTITIONER cites" mandate per sca-v6 Δ5.

---

## Cross-cutting findings (anthropics/* org-pattern observations for sca-v6 D4 weighting)

1. **`anthropics/*` ≠ auto-INSTALL** — confirmed empirically: 1-of-3 lands T1; 2-of-3 T3 even with `α_anthropic=+2` D6 prior + Δ7 D4=5/5 default. D10 hard-cap (Δ4) catches both T3 verdicts independently of author trust — validates sca-v6 anti-bias mandate.

2. **"Event-demo / not-maintained" explicit disclosure** (Target 2) is itself a positive signal — Anthropic engineers are EXPLICIT about non-maintenance status. sca-v6 Δ9 should formalize as **D14 "explicit-unmaintained-disclosure" sub-signal** (score 1 + downweight 0.7×) vs implicit-staleness (Target 3, 3mo silent rot).

3. **License heterogeneity**: 2-of-3 Apache-2.0 (identical blob SHA `d645695673349e3947e8e5ae42332d0ac3164cd7` across `-community` + `cwc-long-running` indicates canonical-blob policy); 1-of-3 MIT (security-review).

4. **Two-surface product pattern** (Target 3 GHA + slash-command): Anthropic ships both CI-surface AND in-CC-surface for the same capability. **sca-v6 D2 should add "two-surface availability" sub-dim** — slash-command is the more CC-native path for local-portable runtimes.

5. **D10 dominance for anthropics/*** — because Anthropic ships canonical primitives directly into CC (`/goal`, `claude-plugins-official`, built-in superpowers via marketplace), subsequent anthropics/* external repos have HIGHER prior of being worked-example/pattern-reference vs unique install. **D4=5/5 default (Δ7) and D10 hard-cap work in tension; D10 wins (Δ4).** Empirically: 2-of-3 fall to T3 due to D10 despite max D4.

6. **Bus-factor (D16) for Anthropic event-demos** collapses to single-shot velocity (1/5). Runtime should NOT assume Anthropic-org = sustained-maintenance.

7. **External cite quality HIGH** for anthropics/* (InfoQ + AddyOsmani + DevOps.com + Medium + Epsilla converge on harness-engineering pattern). D5 benefits from this; D6 author-prior should NOT auto-bump D5.

8. **Verdict-consistency cross-check** — sister-file `W310-STREAM-D-AGENT-4-ANTHROPICS-TOP3-AUDITS.md` (pre-ship sca-v5) reached same 3-of-3 tiers as this Stream-3 (post-ship sca-v6) under different rule version. **Methodology cross-check PASSES** — sca-v6 changes dim weights but does not flip verdicts for these targets (T1/T3/T3).

---

**End of Stream 3 deliverable.** File-ownership invariant respected: only `W310-STREAM-3-ANTHROPICS-TOP3.md` written. Output ≤3000 words ✓ (~2,650 words).
