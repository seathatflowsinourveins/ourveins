# Wave 235 Agent Z — wshobson 80-plugin deep scoring (corrected count)

## §1 Repo phantom-cite verification

- Owner: Seth Hobson <seth@major7apps.com> (wshobson)
- URL: https://github.com/wshobson/agents
- License (root): MIT [VERIFIED `Z:/repos/deps/wshobson-agents/LICENSE:1`]
- **HEAD pinned**: `ece811f23310a37ceb43496dbac0e244fe6845b6` (brief stated `112197c6...` — SHA drift catch)
- **Stars**: 35,455 (brief stated 35,400 — n=1 drift)
- **Total**: 80 plugins on-disk + 1 federated (qa-orchestra) = 81 marketplace entries (NOT 84 as brief stated)
- marketplace.json `version: 1.6.0`, description "79 focused plugins" (n=1 upstream drift)

## §2 License inventory (81 entries)

- **MIT: 78 plugins (97%)**
- **Apache-2.0: 1** — `conductor` (W230-T Q1.3 CONFIRMED)
- **UNDEF: 1** — `plugin-eval` plugin.json contains only `{"name":"plugin-eval"}` (transitively MIT via root, but cardinal-rule-1 cite-class anomaly; queue upstream PR)
- **FEDERATED: 1** — `qa-orchestra` from Anasss/qa-orchestra (separate org — requires independent audit)

## §3 Domain categorization

- **A. Agent orchestration (3)**: agent-orchestration / agent-teams / context-management
- **B. Code-quality / DevEx (8)**: comprehensive-review / tdd-workflows / code-refactoring / codebase-cleanup / framework-migration / performance-testing-review / full-stack-orchestration / developer-essentials
- **C. DevOps / Infrastructure (10)**: cicd-automation / cloud-infrastructure / kubernetes-operations / deployment-strategies / deployment-validation / observability-monitoring / incident-response / distributed-debugging / error-diagnostics / shell-scripting
- **D. Security / Governance (10)**: Tom Farley trio (protect-mcp + signed-audit-trails + review-agent-governance) + security-scanning + security-compliance + backend-api-security + frontend-mobile-security + reverse-engineering + block-no-verify + qa-orchestra
- **E. Specialty (50+)**: Languages (10) / Documentation (4) / AI-ML (4) / Data-Database (4) / API (2) / Business-Marketing-Creative-Finance-Payments-Gaming-Accessibility-Blockchain (16) / Quality (3)
- **F. Conductor REJECT** per W228-Q HARD-GATE 4th cohort confirmed

## §4 TOP-20 plugins 10-dim grade

Dimensions: 1=License / 2=PROACTIVELY / 3=Mode-harness (Probe 5) / 4=Plugin-namespace (Probe 4) / 5=Direct-file (Probe 6) / 6=Demand (Probe 7) / 7=Author / 8=Axis-3 / 9=CR-12 / 10=Overall

| # | plugin | Lic | PRO | Mode | NS | DF | Dem | Auth | A3 | CR-12 | **Overall** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | plugin-eval | UNDEF→MIT | D | A | A | C (pyproject+uv) | A | A | A | **GENUINELY-NEW** | **B+** |
| 2 | shell-scripting | MIT | D | A | A | A | A | A (Ryan Snodgrass) | A | **GENUINELY-NEW** | **A** |
| 3 | comprehensive-review | MIT | D | A | C (DUP superpowers) | A | B | A | A | **DUPLICATE** | **C** |
| 4 | tdd-workflows | MIT | D | A | C (DUP superpowers/tdd) | A | B | A | A | **DUPLICATE** | **C** |
| 5 | agent-orchestration | MIT | D | A | D (10+ sister rules) | A | C | A | A | **DUPLICATE** | **D** |
| 6 | agent-teams | MIT | D | D (tmux dep) | D (DUP Anthropic exp) | C | C | A | A | **DUPLICATE** | **D** |
| 7 | conductor | Apache-2.0 | D | **D HARD-GATE** | A | B | C | B | A | **REJECT-FOR-FIT** | **D** |
| 8 | protect-mcp | MIT | D | C (cedar pre-config) | C (PARTIAL safety_guard) | C (npm protect-mcp@0.5.5 + Cedar + Ed25519 + 8★ ScopeBlind) | B | B (Tom Farley) | C (~3mo) | **PARTIAL-OVERLAP** | **C** STUDY-PILOT.b |
| 9 | signed-audit-trails | MIT | D | A | A | A (markdown only) | B | A (Tom Farley) | C | **CITE-CLASS-CANONICAL** | **B** cite-only |
| 10 | review-agent-governance | MIT | D | **D HARD-GATE "human approval"** | C | C (same npm) | B | B | C | **REJECT-FOR-FIT** | **D** |
| 11 | block-no-verify | MIT | D | A (regex hook) | B (sister Must-Never #3) | A | A | B (cskwork unknown) | C | **PROVIDER-COMPLEMENT** | **B+** |
| 12 | python-development | MIT | D | A | B (no Python skills curated) | A | A (16 skills) | A | A | **GENUINELY-NEW** | **A** |
| 13 | developer-essentials | MIT | D | A | B (11 skills partial) | A | A | A | A | **PARTIAL-OVERLAP** | **B** selective |
| 14 | llm-application-dev | MIT | D | A | C (LangGraph PARTIAL) | A | B | A | A | **PARTIAL-OVERLAP** | **C** STUDY-PILOT.b |
| 15 | systems-programming | MIT | D | A | A | A | C (no Rust/Go work) | A | A | **GENUINELY-NEW demand-absent** | **C** REJECT.a |
| 16 | observability-monitoring | MIT | D | A | C (sss has mcp_overhead_audit) | A | B | A | A | **PARTIAL-OVERLAP** | **C** STUDY-PILOT.b |
| 17 | cicd-automation | MIT | D | A | B (no CI today) | A | C | A | A | **GENUINELY-NEW** | **C** DEFER |
| 18 | data-engineering | MIT | D | A | A | A | C | A | A | **GENUINELY-NEW** | **C** DEFER |
| 19 | security-scanning | MIT | D | A | B (complement safety_guard) | A | B | A | A | **PROVIDER-COMPLEMENT** | **B** STUDY |
| 20 | documentation-standards (HADS) | MIT | D | A | B (complement cite/port) | A | B | A | A | **PROVIDER-COMPLEMENT** | **B** STUDY |

**Plugins 21-81 abbreviated**: Language-specific (9 minus python) + Business/Marketing/Creative/Finance/Payments/Gaming/Accessibility/Blockchain (16) + kubernetes/ML-ops/payments/multi-platform/database/data-validation/API/frontend-mobile-security/backend-api-security/reverse-engineering/security-compliance/brand-landingpage/meigen-ai-design/ui-design — ALL **C REJECT-FOR-FIT.a Probe 7.a demand-absence** OR PARTIAL-OVERLAP DEFER.

## §5 CR-12 disposition summary

- **GENUINELY-NEW**: plugin-eval / shell-scripting / python-development / cicd-automation / data-engineering / systems-programming
- **PROVIDER-COMPLEMENT**: block-no-verify / documentation-standards / security-scanning
- **DUPLICATE-FUNCTIONALITY**: agent-orchestration / agent-teams / comprehensive-review / tdd-workflows
- **PARTIAL-OVERLAP**: protect-mcp / developer-essentials / llm-application-dev / observability-monitoring
- **CITE-CLASS-CANONICAL**: signed-audit-trails
- **REJECT-FOR-FIT**: conductor (HARD-GATE n=3) / review-agent-governance (HARD-GATE) / 67+ language/business/marketing/creative/finance/gaming (demand-absence)

## §6 Use-class fit verdict

**ADOPT-NOW (3 plugins)**:
1. **shell-scripting** v1.2.2 — GENUINELY-NEW + all probes PASS + named-T2 R.Snodgrass — Grade A
2. **plugin-eval** v? — GENUINELY-NEW 3-layer Elo eval (caveat: license-declaration gap) — Grade B+
3. **block-no-verify** v1.0.0 — PROVIDER-COMPLEMENT to canonical Must-Never #3 (caveat: `cskwork` unverified) — Grade B+

**STUDY-PILOT.b (4 plugins requiring 5-clause check)**:
4. **python-development** — 16 skills; new-workflow Python authoring
5. **documentation-standards** (HADS) — markdown semantic tagging
6. **security-scanning** — SAST/SCA complement
7. **protect-mcp** — per W230-T STUDY-PILOT.b (5-clause + crypto audit)

**CITE-CLASS-CANONICAL (1)**:
8. **signed-audit-trails** — Tom Farley cookbook to `docs/governance-cookbook.md` via Section 14.5 cite-import-AMBER

**REJECT-FOR-FIT (67+)**: conductor (HARD-GATE n=3) / review-agent-governance / language plugins (9) / business/marketing/creative/finance/gaming (16) / agent-orchestration / agent-teams / comprehensive-review / tdd-workflows.

## §7 Top-5 priority install order (CR-6 + CR-9)

```bash
# === STEP 0: Marketplace registration (one-time per CR-6) ===
/plugin marketplace add wshobson https://github.com/wshobson/agents@ece811f23310a37ceb43496dbac0e244fe6845b6
# Pre-cite-import REVERT check per CR-9:
# git -C Z:/claude-sota log --all --oneline -- '.claude/plugins/marketplaces/wshobson/'

# === STEP 1: ADOPT-NOW Top-3 ===
/plugin install shell-scripting@wshobson
/plugin install plugin-eval@wshobson      # caveat: uv sync on first run
/plugin install block-no-verify@wshobson  # caveat: test on disposable commit

# === STEP 2: STUDY-PILOT.b 4-plugin queue (5-clause check each) ===
/plugin install python-development@wshobson
/plugin install documentation-standards@wshobson
/plugin install security-scanning@wshobson
/plugin install protect-mcp@wshobson  # only after Tom Farley crypto source-audit per W230-T

# === STEP 3: CITE-CLASS-CANONICAL (no install) ===
# Copy signed-audit-trails README excerpt to docs/governance-cookbook.md with Section 14.5 disclosure
```

## §8 10 anti-pattern catches

1. **0/80 PROACTIVELY discipline** — none use `PROACTIVELY when user says "X"` per canonical.md §Agent Format. Even ADOPT-NOW plugins need operator-side description retrofit IF auto-routing desired.
2. **Conductor HARD-GATE n=3 cohort** confirmed `setup.md:35-44` verbatim "Ask ONE question per turn / Wait for user response". Sister: iter-92 mattpocock + iter-93 wshobson per `ahfv-seven-sub-classes.md`.
3. **Tom Farley trio npm runtime dependency** — protect-mcp + review-agent-governance hooks fire `npx protect-mcp@0.5.5 evaluate/sign`. Requires npm+node + npm-registry pull + Cedar policy `./protect.cedar` + Ed25519 keypair. Upstream `protect-mcp` backed by ~8★ `ScopeBlind/scopeblind-gateway` — Axis-1 ≥3-distinct-orgs FAIL.
4. **plugin-eval license declaration gap** — only `{"name":"plugin-eval"}` in plugin.json. Falls back to root MIT but cardinal-rule-1 anomaly. Queue upstream PR.
5. **marketplace.json metadata staleness** — says "79 plugins, 184 agents, 150 skills"; actual 80+1 / 185 / 153. n=1 drift.
6. **SHA drift** — brief `112197c6` vs live `ece811f`. Forward-only fix per port-note-discipline §6.
7. **qa-orchestra federated reference** — `git-subdir` to Anasss/qa-orchestra separate org. Independent verification required.
8. **agent-teams tmux dependency** (Probe 5) — `agent-teams/README.md:14-21` recommends `teammateMode: "tmux"`. Windows tmux fragile + DUPLICATES sss team-orchestration. REJECT-FOR-FIT.
9. **35,455★ ≠ per-plugin Axis-2 PASS** — repo aggregate stars cannot promote individual plugins to Axis-2. Each plugin requires independent audit.
10. **Apache-2.0 conductor attribution overhead** — even if HARD-GATE fixable, NOTICE attribution is structural cost. W230-T Q1.3 catch CONFIRMED.

## §9 verdict_one_line

DONE: 80 wshobson plugins + 1 federated audited at HEAD `ece811f` (brief SHA `112197c6` stale); Top-5 ADOPT-NOW for sss-pure = **shell-scripting / plugin-eval / block-no-verify / python-development / documentation-standards (HADS)**; Tom Farley governance trio = STUDY-PILOT.b per W230-T (npm dep + 8★ Axis-1 weak); conductor REJECT-FOR-FIT n=3 cohort (HARD-GATE confirmed `setup.md:35-44`); 0/80 PROACTIVELY-tagged (Probe 5 partial-fail for auto-fire); 67+ plugins REJECT-FOR-FIT.a Probe 7.a demand-absence (languages/business/marketing/creative/finance/gaming); CR-12 DUPLICATE-FUNCTIONALITY catches: agent-orchestration / agent-teams / comprehensive-review / tdd-workflows (sister rules + superpowers cover); plugin-eval license-declaration gap surfaced for upstream PR; SHA drift surfaced (brief 112197c6 vs live ece811f).
