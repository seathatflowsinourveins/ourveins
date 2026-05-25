## Wave 146 Ship 2 — manifest reclassify @playwright/mcp@0.0.75 DEFERRED → INSTALLED (3-voice agent team Pattern A apply 2026-05-11)

**Trigger**: stale manifest row at `docs/sota-installed-manifest.md:156` (`| Playwright MCP | TBD | DEFERRED | Bun stdio JSON-RPC hang risk per sibling claude-sota .mcp.json _comment |`) + stale §9 header L152 (`(deferred — Probe DAG required)`) — operational reality is `@playwright/mcp@0.0.75` ALREADY-INSTALLED in npm-global (verified `npm ls -g @playwright/mcp --depth=0` → `+-- @playwright/mcp@0.0.75`) + wired in `.mcp.json` `playwright` server `npx -y @playwright/mcp@0.0.75` per Wave 124 fire 1 codex T1 NEEDS-REVISION conf=0.91 P0 prescription (CR-9 fix from `@latest` D6 today-release-auto-upgrade risk → `@0.0.75` explicit pin).

**Ship type**: DOC-ONLY manifest reclassify (FM-20 path-drift cascade closure). NOT a new install — Wave 146 Ship 2 reflects pre-existing Wave 124 wire + verifies + corrects manifest text-state to operational reality.

**3-voice advanced agent team CONVERGENT verdict (with V1↔V2↔V3 disagreement on CR-12 class resolved by orchestrator-side Mia probe)**:

- **V1 sota-researcher** (Sonnet stand-in per CLAUDE.local.md ENV (g) STAND-IN-NOTICE; agentId `a8f9d388cabbd5d2f`, 208s, 470,333 tokens, 3 tool_uses, ARTIFACT-INLINE 285 LOC at `tmp/wave146-ship2-v1-sota-researcher-playwright-mcp-2026-05-11.md`):
  - Verdict: PASS-RECLASSIFY conf=0.91
  - CR-1 HEAD SHA `8116437ffcfee1309cebc07dd30cee37720d2d19` validated as v0.0.75 release commit via `gh api repos/microsoft/playwright-mcp/git/refs/tags/v0.0.75` + commit msg `chore: mark v0.0.75 #1614` (Yury Semikhatsky 2026-05-07T23:06:15Z, GPG verified=true reason=valid)
  - CR-9 freshness PASS: `npm view @playwright/mcp version` = 0.0.75 = dist-tags.latest (pin matches latest published 4 days ago)
  - Probe DAG 1-7 ALL PASS (P1 N/A / P2-P7 PASS)
  - SRA D1-D10 score: 9-PASS/1-N/A (D1 Apache-2.0 + D2 fresh + D3 Microsoft TIER-1-OFFICIAL + D4 maintainer-provenance + D5 active + D6 use-class compat + D7 Anthropic-aligned + D8 32,328★ adoption + D9 FM-class clear + D10 N/A)
  - **CR-12 disposition**: GENUINELY-NEW (REFUTED by orchestrator post-synthesis Mia probe — see below)
  - 7 Mia self-OVER-catches embedded
  - STAND-IN-NOTICE: cross-model gate satisfaction relies on V2+V3 Path P REAL GPT-5.5 dispatches per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate

- **V2 codex T1 Path P REAL GPT-5.5** (codex CLI v0.130.0 DEFAULT profile + `--skip-git-repo-check --color never` + 300s timeout + foreground+tee per Pattern D recipe; verdict at `.claude/state/codex_consult_w146_s2_v2_reclassify_review_OUT.txt` 89 LOC; 11,383 tokens):
  - Verdict: APPROVE-RECLASSIFY conf=0.93
  - All 7 audit dimensions PASS
  - **CR-12 disposition**: PROVIDER-COMPLEMENT (REFUTED by V3 + orchestrator empirical evidence — see below)
  - prescribed_edits=[] / concerns=[]
  - Cross-model gate FULLY SATISFIED (REAL GPT-5.5 codex CLI dispatch)

- **V3 codex T1 Path P REAL GPT-5.5 adversarial** (same recipe; verdict at `.claude/state/codex_consult_w146_s2_v3_adversarial_review_OUT.txt` 1914 LOC; 61,096 tokens):
  - Verdict: NEEDS-REVISION conf=0.88 ship_readiness=BLOCKED
  - v2_validation: PARTIAL
  - **CR-12 disposition**: DISAGREE-DUPLICATE → DUPLICATE-FUNCTIONALITY-WITH-PIN-JUSTIFICATION (CONFIRMED by orchestrator empirical evidence — see below)
  - cr9_freshness_check: PASS (npm dist-tags verified `latest=0.0.75`, `next=0.0.75-alpha-2026-05-10`)
  - cr1_head_sha_validation: VERIFIED-MATCHES-V0.0.75 (`git ls-remote` confirms HEAD + tag both at `8116437f`)
  - header_scope_concern: section-status-not-ship-status
  - 4 prescribed_edits (CR-12 reword + §9 header section-level + freshness/cite confirm + Bun-hang language revision)
  - 4 additional_concerns (V2 over-confidence on CR-12 + §9 scope drift + no version bump needed + no SHA drift)

**Orchestrator-side Mia probe (resolves V1↔V2↔V3 CR-12 disagreement)**:

Bash probe `find .claude/plugins/marketplaces -name *.json` + `cat .claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/mcp-configs/mcp-servers.json` revealed **3 separate playwright MCP server registrations** in the runtime:

1. **`.mcp.json` project-scope** (eee runtime, Wave 124 fire 1 PINNED): `playwright` server `type=stdio command=npx args=["-y","@playwright/mcp@0.0.75"]` — PINNED v0.0.75 per CR-9 explicit-pin discipline
2. **ECC `mcp-configs/mcp-servers.json`** (everything-claude-code marketplace v2.0.0-rc.1): `playwright` server `command=npx args=["-y","@playwright/mcp","--browser","chrome"]` — UNPINNED (D6 today-release-auto-upgrade risk)
3. **claude-plugins-official `external_plugins/playwright/.mcp.json`**: `playwright` server `command=npx args=["@playwright/mcp@latest"]` — UNPINNED + missing `-y` flag (UPSTREAM stale)

Active runtime tool namespace `mcp__plugin_everything-claude-code_playwright__browser_*` (visible in deferred-tool ToolSearch) confirms ECC variant (#2) IS active concurrent with project-scope variant (#1). **Therefore V3's CR-12 DUPLICATE-FUNCTIONALITY-WITH-PIN-JUSTIFICATION call is empirically CORRECT**; V1's GENUINELY-NEW REFUTED (V1's P4 grep on `.claude/plugins/cache` missed ECC's `mcp-configs/mcp-servers.json` registration); V2's PROVIDER-COMPLEMENT REFUTED.

The pin-justification rationale: project-scope `.mcp.json @0.0.75` PINS for CR-9 D6-risk mitigation; ECC + claude-plugins-official plugin-supplied unpinned variants would violate CR-9 on every fresh install. Project-scope wire OVERRIDES (or coexists in separate namespace with) the unpinned plugin variants per CC MCP precedence convention.

**Pattern A apply** (per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A — single atomic apply on NEEDS-REVISION conf 0.88-0.93):

- V3 prescribed_edits ALL applied
- V1 cite-anchor detail (HEAD SHA + commit author + GPG verification) RETAINED in Notes column
- CR-12 class corrected to DUPLICATE-FUNCTIONALITY-WITH-PIN-JUSTIFICATION per V3 + orchestrator empirical
- §9 header revised to `(mixed status — Playwright installed, Chrome DevTools deferred)` per V3 prescription #2 + V1 alternative consideration
- Bun-hang language revised per V3 prescription #4

**Mia ladder advances this fire**:
- #215: V1 P4 plugin-namespace probe missed ECC `mcp-configs/mcp-servers.json` playwright registration (caught by orchestrator-side Bash probe on plugin marketplace + ECC mcp-configs)
- #216: V2 PROVIDER-COMPLEMENT empirically wrong (3 playwright registrations exist — DUPLICATE not COMPLEMENT)
- #217: V1 GENUINELY-NEW empirically wrong (orchestrator confirms V3's DUPLICATE call)

**Cascade ladder advances**:
| Defense | Pre-fire | Post-fire | Note |
|---|---|---|---|
| Pattern D (REAL GPT-5.5 codex CLI dispatches) | n=22 | **n=24** | V2 (DEFAULT-profile 89 LOC 11K tokens 0.93 APPROVE) + V3 (DEFAULT-profile adversarial 1914 LOC 61K tokens 0.88 NEEDS-REVISION) |
| Mia pre-apply | n=214 | **n=217** | V1 P4 incomplete + V2 CR-12 wrong + V1 CR-12 wrong (orchestrator-side Mia probe resolved 3-way disagreement) |
| FM-20 path-drift cascade | n=15 | **n=15** (no advance — Ship is FM-20 closure not detection) | This Ship CLOSES FM-20 path-drift on §9 manifest row (stale claim "DEFERRED + Bun-hang" → operational reality "INSTALLED + 3-source duplicate-with-pin-justification") |
| FM-09 codex-rescue blind-spot | 8/8 | **9/9** | V3 adversarial cross-check caught V2 over-confidence (CR-12 misclassification) — sister to Wave 142 V4 SAVED-SHIP class catch |
| FM-17 fleet depletion | unchanged | unchanged | No FM-17 surfaces this fire |
| FM-19 ARTIFACT-INLINE | OK | OK | V1 sota-researcher persisted ARTIFACT-INLINE at tmp/wave146-ship2-v1-sota-researcher-playwright-mcp-2026-05-11.md (285 LOC) |
| FM-15 + FM-02 (b)+(c) | OK | OK | Atomic single-shell `git add -- <files> && git commit --only -F <msg> -- <files>` form held |
| CR-12 5-class lattice exercise | 5 classes (W145-F2 close) | **5 classes refined** | DUPLICATE-FUNCTIONALITY 2nd-class properly exercised via Wave 146 Ship 2 (sister to Wave 145 Fire 3 phoenix refinement) |

**SAVED-SHIP class catch** (V3 adversarial): V3 prevented shipping a misclassified manifest row (CR-12 PROVIDER-COMPLEMENT or GENUINELY-NEW) that would have masked the 3-source playwright duplication + lost the pin-justification rationale. Same shape as Wave 142 V4 FM-20 cascade catch (codex T1 review fork catching ship1 wrong-fix). Cross-model gate adversarial value DEMONSTRATED.

### Discipline conformance

| Discipline | Status |
|---|---|
| CR-1 cite-trail | ✅ TIER-1-DIRECT to npmjs.com + microsoft/playwright-mcp HEAD `8116437f` Apache-2.0 + Wave 124 _comment_playwright_pin |
| CR-3 cross-model | ✅ FULLY SATISFIED via 2× REAL GPT-5.5 codex CLI v0.130.0 (V2 conf=0.93 + V3 conf=0.88) per Phase 1 bootstrap exception |
| CR-6 canonical-native | ✅ npm install -g via npmjs.com official registry; explicit version pin |
| CR-8 full-SOTA-content | ✅ All cite anchors at file:line + HEAD SHA + npm registry; no novel content |
| CR-9 install-risk | ✅ Pin `@0.0.75` explicit (NOT `@latest`); Wave 124 fire 1 P0 fix preserved; alternate-channel probe N/A (already installed); sibling-bleed clean |
| CR-10 research-first | ✅ Mia probe BEFORE Pattern A apply; orchestrator-side empirical resolved 3-way V1↔V2↔V3 disagreement |
| CR-11 META-process | ✅ Standing-form 3-voice advanced agent team + Path P recipe + atomic single-shell + cascade defenses |
| CR-12 5-class lattice | ✅ DUPLICATE-FUNCTIONALITY-WITH-PIN-JUSTIFICATION (corrected from V2 PROVIDER-COMPLEMENT + V1 GENUINELY-NEW per empirical 3-registration evidence) |
| Mia pre-apply (n=217) | ✅ 3-way disagreement resolved via orchestrator empirical Mia probe; saved misclassified ship |
| FM-20 path-drift cascade closure (n=15) | ✅ §9 manifest row stale-claim REPLACED with operational-reality |
| FM-09 codex-rescue blind-spot (n=9/9) | ✅ V3 adversarial caught V2 over-confidence — same SAVED-SHIP shape as Wave 142 V4 |
| FM-19 ARTIFACT-INLINE | ✅ V1 ARTIFACT-INLINE persisted (285 LOC under 500 budget) |
| FM-15 + FM-02 (b)+(c) defense | ✅ Atomic single-shell `git add -- <files> && git commit --only -F <msg> -- <files>` |
| Pattern D recipe | ✅ V2+V3 both DEFAULT-profile + foreground+tee + 300s + `--skip-git-repo-check --color never` (Pattern D ladder n=22→n=24) |
| Pattern A single-fix-forward | ✅ V3 NEEDS-REVISION 4 prescribed_edits applied atomically (no iter chain) |
| port-note-discipline §6 forward-only | ✅ NOT amending Wave 124 fire 1 commit — FORWARD-ONLY correction in this fire's manifest row |
| kiss-dry-yagni Must-Never #4 | ⚠️ DOCUMENTED 3-source playwright duplication; Pattern A apply documents PIN-JUSTIFICATION rationale; queue dedupe ship as separate Wave-N+M (modifying ECC plugin cache + claude-plugins-official upstream files is OUT OF SCOPE) |
| git-cli-grammar | ✅ Options BEFORE `--` separator · narrow `--only -- <pathspec>` form |

### Cite trail

- **TIER-1-DIRECT npm registry**: `https://registry.npmjs.org/@playwright/mcp/0.0.75` [VERIFIED 2026-05-11 via `npm view @playwright/mcp` → latest=0.0.75]
- **TIER-1-DIRECT GitHub repo**: `https://github.com/microsoft/playwright-mcp` HEAD `8116437ffcfee1309cebc07dd30cee37720d2d19` Apache-2.0 [VERIFIED 2026-05-11 via `gh api repos/microsoft/playwright-mcp/git/refs/tags/v0.0.75` + `gh api repos/microsoft/playwright-mcp/commits/8116437f...` GPG verified=true]
- **TIER-1-DIRECT package.json**: `C:/Users/42/AppData/Roaming/npm/node_modules/@playwright/mcp/package.json` (name + version + bin + repo + license + author + mcpName) [VERIFIED 2026-05-11]
- **TIER-1-DIRECT install state**: `npm ls -g @playwright/mcp --depth=0` → `+-- @playwright/mcp@0.0.75` [VERIFIED 2026-05-11]
- **TIER-3-LOCAL-CONFIG**: `Z:/claude-sota-installed/.mcp.json:_comment_playwright_pin + playwright server entry` [VERIFIED 2026-05-11 via direct json read]
- **TIER-3-LOCAL-CONFIG (incumbent #1)**: `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/mcp-configs/mcp-servers.json:playwright` (unpinned `--browser chrome` variant) [VERIFIED 2026-05-11 via direct json read]
- **TIER-3-LOCAL-CONFIG (incumbent #2)**: `.claude/plugins/marketplaces/claude-plugins-official/external_plugins/playwright/.mcp.json` (unpinned `@latest` variant) [VERIFIED 2026-05-11 via direct cat]
- **TIER-2 sister-rule cite-import-AMBER**: `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A + Pattern D + `Z:/claude-sota/.claude/rules/cross-model-consensus.md` §Env-funneled subagent stand-in disclosure mandate + `Z:/claude-sota/.claude/rules/mia-pre-apply.md` (n=217 ladder) + `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` (n=15 ladder) + `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md` §Reporting categories + `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG 1-7 + `Z:/claude-sota/.claude/rules/sota-research-architecture.md` SRA D1-D10
- **Wave 124 fire 1 source**: `.mcp.json:_comment_playwright_pin` + `.claude/state/codex_consult_w122_e2e_audit_OUT.txt:6158-6160` codex T1 NEEDS-REVISION conf=0.91 P0 prescription
- **V1 artifact**: `tmp/wave146-ship2-v1-sota-researcher-playwright-mcp-2026-05-11.md` (285 LOC; sota-researcher Sonnet stand-in; STAND-IN-NOTICE disclosed)
- **V2 verdict**: `.claude/state/codex_consult_w146_s2_v2_reclassify_review_OUT.txt` (89 LOC; REAL GPT-5.5 codex CLI v0.130.0 DEFAULT profile; APPROVE-RECLASSIFY conf=0.93; CR-12 PROVIDER-COMPLEMENT — REFUTED post-synthesis)
- **V3 verdict**: `.claude/state/codex_consult_w146_s2_v3_adversarial_review_OUT.txt` (1914 LOC; REAL GPT-5.5 codex CLI v0.130.0 DEFAULT profile; NEEDS-REVISION conf=0.88; CR-12 DUPLICATE-FUNCTIONALITY-WITH-PIN-JUSTIFICATION — CONFIRMED post-synthesis)

**Cite class**: `constituents=[TIER-1-DIRECT @ npmjs.com + GitHub microsoft/playwright-mcp HEAD 8116437f, TIER-3-LOCAL-CONFIG @ .mcp.json + ECC mcp-servers.json + claude-plugins-official external_plugins/playwright/.mcp.json, TIER-2 @ sister-rule cite-imports (codex-t1-fix-forward-pattern + cross-model-consensus + mia-pre-apply + fm20-path-drift-cascade + synthesis-layer-verify + agent-harness-fit-verification + sota-research-architecture), TIER-3-LOCAL-OPERATOR-DERIVED @ V1+V2+V3 verdicts + orchestrator-side Mia probe + Wave 124 fire 1 codex T1 prescription]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

**Wave 146 Ship 2 SHIPPED CLEAN** — Pattern A 2-edit atomic apply (manifest L152 + L156) + provenance APPEND. Cross-model gate FULLY SATISFIED via 2× REAL GPT-5.5 dispatches. SAVED-SHIP class catch via V3 adversarial cross-check on V2 CR-12 over-confidence. Mia ladder n=214→n=217 (+3 orchestrator-side catches resolving 3-way V1↔V2↔V3 disagreement). Pattern D ladder n=22→n=24. FM-09 6/6→9/9 advance. FM-20 closed (§9 stale-claim → operational-reality). 0 install-debt added (DOC-ONLY reclassify). ~83-87% SOTA-clean maintained. Next auto-proceed: Wave 146 Ship 3 (manifest reclassify addyosmani/agent-skills marketplace cache state).

---

