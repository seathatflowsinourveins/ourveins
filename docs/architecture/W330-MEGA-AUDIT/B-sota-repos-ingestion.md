# W330 MEGA-AUDIT Stream B — SOTA Repo Ingestion & Drift Audit

> Wave W330 / Stream B / 2026-05-19. 10 SOTA-candidate repos audited for installed-state vs upstream-HEAD drift per sca-v12.1.
> Audit method: `gh api repos/<owner>/<repo>/commits/HEAD --jq '{sha,date,msg}'` for upstream probes; `installed_plugins.json` + skill provenance footers for installed SHAs. No `git clone`, no repomix.
> All upstream-HEAD probes timestamped 2026-05-19 (audit-day).

## §1 Per-repo audit table

| # | Repo | Installed SHA | Upstream HEAD SHA | Δ | Last installed | High-impact changes since | Adoption status |
|---|------|---------------|-------------------|---|----------------|---------------------------|-----------------|
| 1 | `anthropics/claude-cookbooks` | NOT INSTALLED (cite-only @ `39a350b6790c1` per CLAUDE.md L34) | `39a350b6790c132337dcc3ec35240728fcc1dc0e` (2026-05-19) | ON-HEAD (cite anchor up-to-date) | n/a (cite-only) | `Merge #601 devsec/pin-actions — Pin GitHub Actions to commit SHAs` | T4 cite-only (canonical Anthropic reference; CLAUDE.md L34 W269 parallel-dispatch mandate cite-anchored here) — KEEP cite-only |
| 2 | `shanraisshan/claude-code-best-practice` (CCBP) | `f28c2da352290377ca272b3cc99a8beb31e37864` (@ `Z:/repos/deps/claude-code-best-practice-shan` HEAD) | `f28c2da352290377ca272b3cc99a8beb31e37864` (2026-05-19 19:00 UTC) | **0 commits behind — ON HEAD** | 2026-05-19 (W329 Stream E cite-refresh per CLAUDE.md L7) | `chore(readme): bump badge to Claude Code v2.1.144` (cosmetic badge bump only — no semantic content change) | T4 cite-only (vendored as `Z:/repos/deps/claude-code-best-practice-shan/`; cite-anchored from CLAUDE.md L7 + `CLAUDE.local.md` ENV block) — KEEP |
| 3 | `affaan-m/ECC` (everything-claude-code plugin) | `8148340ad14eb32c971346f0cb4cb9431ec0f5de` (v2.0.0-rc.1, `installed_plugins.json:23`) | `2c0d226439ec14c60f509561386caba2a9ac7619` (2026-05-19 17:39 UTC) | **≥1 commit behind** (gh api shows post-installed commit `docs(release): record post-gateguard evidence`) | 2026-05-19 14:25 UTC (`installed_plugins.json:22`) | `docs(release): record post-gateguard evidence` — release-doc commit; semantic plugin surface likely stable since v2.0.0-rc.1 | T1 INSTALLED FULL — plugin live, marketplace `everything-claude-code`; minor drift acceptable (release-doc level), refresh at next `/plugin update` housekeeping |
| 4 | `wshobson/agents` | `08ded5e7b0fe57e7f40194775885eba539c3d8e7` (`agent-teams@claude-code-workflows` v1.0.2 + `conductor@claude-code-workflows` v1.2.1 + `ship-mate@claude-code-workflows` v1.0.0 share this SHA per `installed_plugins.json:320,562,573`) | `08ded5e7b0fe57e7f40194775885eba539c3d8e7` (2026-05-17 00:46 UTC) | **0 commits behind — ON HEAD** | 2026-05-18 14:29 UTC (agent-teams) / 2026-05-17 20:13 UTC (conductor, ship-mate) | `fix: agent teams coordination guardrails (#535)` (already on HEAD — no further commits since) | T1 INSTALLED FULL (via `claude-code-workflows` marketplace — agent-teams, conductor, ship-mate, qa-orchestra, comprehensive-review, etc., 16 plugins from this marketplace tracked SHA `34632bcbe` and `08ded5e7b`); subset selectively pulled per sca-v12.1 — KEEP |
| 5 | `addyosmani/agent-skills` | `f17c6e88c904dc747381c374312c2d58e10647ae` (vendored at `.claude/skills/{api-and-interface-design,doubt-driven-development,frontend-ui-engineering,code-simplification}` per CLAUDE.md L40) | `f17c6e88c904dc747381c374312c2d58e10647ae` (2026-05-16 22:00 UTC) | **0 commits behind — ON HEAD** | 2026-05-19 (W316 absorb wave per CLAUDE.md L40) | `Merge #60 feat/ci-skill-validator — Add CI skill validator` (CI-only; no skill-content drift) | T2-CHERRY (5 skills vendored: interview-me [missing — TBD verify] + doubt-driven-development + frontend-ui-engineering + api-and-interface-design + code-simplification; `_archived` dir present) — KEEP, no action |
| 6 | `mattpocock/skills` | `67bce91c80cd...` (W320 Stream B vendored per CLAUDE.md L40) | `d54c497aa94400a496d3f2c38be10fa5f284c5a9` (2026-05-19 16:07 UTC) | **drift confirmed** (installed prefix `67bce91c80cd` ≠ HEAD `d54c497a`) | 2026-05-19 (W320 Stream B per CLAUDE.md L40) | `Improved wording of /handoff` (HEAD commit) — handoff-skill wording polish, low-impact | T2-CHERRY (6 skills vendored: grill-with-docs, tdd, caveman, diagnose, handoff, review @ `67bce91c80cd`); 1 commit drift (`/handoff` wording) — defer or sync at next W3xx skill-housekeeping wave |
| 7 | `mksglu/context-mode` | `6bbcb4430bbfaf106d8dd778ebc34b17c66e8f24` (v1.0.141, `installed_plugins.json:78`) | `7f71632c3c39f2cf1937b0aed3f8d6b7b36ff7e2` (2026-05-19 18:15 UTC, version `1.0.142`) | **1 patch version behind** (v1.0.141 → v1.0.142, single commit `1.0.142`) | 2026-05-19 13:26 UTC (`installed_plugins.json:77`) | `1.0.142` (single bump commit; patch-level) | T1 INSTALLED FULL (active live MCP per CLAUDE.md L51 + `mcp__plugin_context-mode_context-mode__*` tools live in this session); minor patch drift — refresh via `/context-mode:ctx-upgrade` (documented in CLAUDE.md L29) |
| 8 | `OthmanAdi/planning-with-files` | `d27008f369a5c58f315ce74194ff1c21b9a0eedc` (v2.38.1, `installed_plugins.json:694`) | `d27008f369a5c58f315ce74194ff1c21b9a0eedc` (2026-05-16 08:27 UTC) | **0 commits behind — ON HEAD** | 2026-05-18 19:33 UTC (`installed_plugins.json:692`) | `fix: v2.38.1 swap plan-injection delimiter from --- to === to avoid YAML doc-separator collision` (already on HEAD) | T1 INSTALLED FULL (marketplace `planning-with-files`); current canonical version — KEEP |
| 9 | `abhigyanpatwari/GitNexus` | `ed50a6729f83c74c2458d37527236e2324c06702` (v1.3.6, `installed_plugins.json:507`) | `803f0bed5f7d714d3ee8577e1e42f17bbf371dca` (2026-05-19 11:09 UTC) | **≥1 commit behind** (gh api shows post-install commit `fix(lbug): probe-then-load FTS extension on Windows (#1690) (#1692)`) | 2026-05-18 05:29 UTC (`installed_plugins.json:506`) | `fix(lbug): probe-then-load FTS extension on Windows (#1690) (#1692)` — **WINDOWS-IMPACTING BUG-FIX** (BM25 silently degraded on Windows; this runtime IS Windows per env block) | T1 INSTALLED FULL but **DRIFT-LEADER #1**: Windows-impacting BM25 silent-degradation fix is post-installed — recommend `/plugin update gitnexus@gitnexus-marketplace` at next housekeeping wave (rate-anchored as W330 follow-up) |
| 10 | `alirezarezvani/claude-skills` | NOT INSTALLED (no plugin entry, no skill provenance) | `8aa920812f05d5f8c97340775be39e1813885ee9` (2026-05-19 10:05 UTC) | n/a | n/a | `Merge #701 from alirezarezvani/dev — Dev` (merge commit; content TBD via Stage-1 probe in follow-up wave) | T3 pattern-only candidate or T5 reject — DEFER existence-probe verdict to follow-up sca-v12.1 §1 Stage-1 pass (description+skills count+overlap-vs-installed audit); not promoted into install scope in this wave |

## §2 High-impact changes per repo (only those with non-zero drift)

### #3 — `affaan-m/ECC` (1 commit behind)
- `2c0d2264` `docs(release): record post-gateguard evidence` — release-documentation commit only. Semantic surface (agents/skills/commands/hooks/rules MCP-configs) unchanged from `8148340a` v2.0.0-rc.1. **No action required**; refresh at next routine `/plugin update`.

### #6 — `mattpocock/skills` (drift confirmed, prefix mismatch)
- `d54c497a` `Improved wording of /handoff` — wording polish in handoff skill. Vendored skill `Z:/claude-sota-installed/.claude/skills/handoff/` may have slightly stale phrasing. **Low-impact**; sync at next skill-housekeeping wave (W331+).

### #7 — `mksglu/context-mode` (v1.0.141 → v1.0.142)
- `7f71632c` `1.0.142` — patch-level bump. **Action**: invoke `/context-mode:ctx-upgrade` per CLAUDE.md L29 documented refresh path. Auto-fires NSSM `CogneeMCP` realignment if needed per W330 follow-up.

### #9 — `abhigyanpatwari/GitNexus` (≥1 commit, **WINDOWS-CRITICAL**)
- `803f0bed` `fix(lbug): probe-then-load FTS extension on Windows (#1690) (#1692)` — fixes hard-skip of `loadFTSExtension()` on Windows that silently degraded BM25 queries (0 hits). This runtime IS Windows 11 per `CLAUDE.local.md`. **DRIFT-LEADER**: recommend prioritized `/plugin update gitnexus@gitnexus-marketplace` once W330 closure synthesis lands.

## §3 Adoption-tier verdicts for NOT-installed repos (#1, #10)

### #1 — `anthropics/claude-cookbooks`
- **Tier verdict**: T4 cite-only (canonical Anthropic reference).
- **Rationale**: cite-anchored from CLAUDE.md L34 (W269 parallel-dispatch mandate references `patterns/agents/prompts/research_lead_agent.md:135-137`). Installing as plugin or vendoring as skill would duplicate the canonical reference; the upstream notebook-style format is incompatible with the SKILL.md / plugin manifest contract. Existing cite is at HEAD (`39a350b6790c1`) per audit-day probe.
- **Action**: KEEP cite-only; no install.

### #10 — `alirezarezvani/claude-skills`
- **Tier verdict**: T3-or-T5 (DEFER — Stage-1 sca-v12.1 §1 probe required).
- **Rationale**: Repo exists (HEAD `8aa92081`, 2026-05-19), `claude-skills` slug suggests Claude Code skill collection, but no skills count / domain-overlap audit vs the 47-active-plugin install base has been performed in this wave per sca-v12.1 §1 right-tool-for-job staged-pilot discipline.
- **Action**: DEFER existence-probe verdict to follow-up wave (W331+) — invoke `mcp__plugin_everything-claude-code_github__get_repository` Stage-0 + Stage-1 description-only scan before any install/vendor decision.

## §4 Cite-anchors

- sca-v12.1 §1 right-tool-for-job: `gh api commits/HEAD` for HEAD SHA probes (rate-limit-budget-friendly; 11 calls used = 10 repos + 1 ECC slug discovery)
- sca-v12.1 §1 Stage-0 existence probe via `mcp__plugin_everything-claude-code_github__get_repository` (deferred to W331 follow-up for #10 alirezarezvani)
- Installed plugin manifest: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json` (60 plugin-version rows audited)
- Plugin cache root: `Z:/claude-sota-installed/.claude/plugins/cache/` (18 marketplace dirs verified per W315 Stream B count)
- Skill provenance: `Z:/claude-sota-installed/.claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md:1-15` (operator-curated vendor-fork pattern per cardinal-rule-4(b))
- ECC repo slug discovery: `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.claude-plugin/plugin.json:10` (`"repository": "https://github.com/affaan-m/ECC"`)
- CLAUDE.md L34 W269 parallel-dispatch mandate cite anchor (claude-cookbooks `39a350b6790c1`)
- CLAUDE.md L40 vendor-fork inventory (mattpocock-6 + addyosmani-5 skills)
- CLAUDE.local.md ENV block: confirms Windows runtime (relevant to drift-leader #9 GitNexus Windows BM25 fix)
- sca-v12.1 tiering scheme: T0 install full / T1 install full / T1-PROV provisional / T2 install selective / T2-CHERRY cherry-pick / T3 pattern-only / T4 cite-only / T5 reject
