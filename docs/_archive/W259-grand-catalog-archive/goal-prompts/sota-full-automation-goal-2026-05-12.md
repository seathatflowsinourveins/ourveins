# COMPLETE SOTA /goal PREDICATE — eee runtime FULL AUTOMATION

**File**: `Z:/claude-sota-installed/tmp/sota-full-automation-goal-2026-05-12.md`
**Wave**: 156+ continuation (Ships 0+1 committed: `69e5fd4` + `a4bb3f1`; Ships 2-24 pending)
**Plan**: `Z:/claude-sota-installed/.claude/plans/cryptic-shimmying-dewdrop.md`
**Cite class**: `effective_tier=TIER-3-LOCAL-COMPOSITION` per citation-discipline.md rule #8
**Generated**: 2026-05-12

---

## TASK

Drive Wave 156+ SOTA optimization to terminal completion with full mechanical
cross-model verification, atomic per-ship cycle-300 discipline, archive-then-remove
cleanup, autonomous /goal-loop execution, and Iron Law claim-time gate. Achieve
CR-7 Phase 2 transition readiness (Tier 1a + 1b + 1c + 2 INSTALLED + smoke-PASS) +
close 5 file-size CRITICAL violations + sanitize 22+ CR-9 sibling-bleed sites +
adopt Top-10 ECC ADOPT-NOW skills + dispose 96 T3 verdicts per severity-triage +
promote ≥5 META-disciplines past cycle-322 gate.

---

## SECTION 1 — CARDINAL RULES (apply on EVERY meta-step per CR-11)

[CR-0] SKILL FIRST PER 1% RULE — invoke superpowers:using-superpowers +
addy-agent-skills:using-agent-skills BEFORE any action. Layer Process + Implementation.

[CR-1] CITE EVERY CLAIM AT FILE:LINE + HEAD SHA
  TIER-1-DIRECT  Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA>
                  OR https://code.claude.com/docs/en/<page>
                  OR mcp__github__get_file_contents blob result
  TIER-2         docs/<doc>.md user-curated with upstream cite-anchor
  TIER-3-LOCAL-* sibling cite-import-AMBER OR operator-derived OR local config
  Composed: constituents=[...]; effective_tier=MIN_PRECEDENCE(constituents)
  per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8

[CR-2] KARPATHY 4 PRINCIPLES (cite: Z:/repos/deps/andrej-karpathy-skills/CLAUDE.md:7-43
@ HEAD 2c606141936f1eeef17fa3043a72095b4765b9c2)
  P1 Think Before Coding (confused → STOP + MEASURE)
  P2 Simplicity First
  P3 Surgical Changes
  P4 Goal-Driven Execution (testable terminal predicate; loop-until-verified)

[CR-3] CROSS-MODEL CONSENSUS T1-T7 (hooks at .claude/hooks/scripts/):
  T1 codex_t1_consult_gate.py        PreToolUse Edit|Write|MultiEdit 5s sync
  T2 codex_t2_pre_commit_gate.py     PreToolUse Bash(git commit *) 180s sync
  T3 codex_postcommit_review.py      PostToolUse Bash(git commit *) 30s async
  T4 codex_prepush_review.py         PostToolUse Bash(git push *) 30s async
  T5 codex_t5_plan_review_gate.py    PreToolUse ExitPlanMode 5s async
  T6 codex_stop_review_gate.py       Stop hook 900s sync (Ship 4 INSTALL)
  T7 auto_proceed_gate.py            Stop hook slot[0] 5s sync

Phase 1 bootstrap exception (Path P foreground+tee):
  timeout 300 codex exec --skip-git-repo-check --color never \
    < .claude/state/codex_consult_<topic>.txt 2>&1 | \
    tee .claude/state/codex_consult_<topic>_OUT.txt

Verdict reading — EOF FIRST:
  wc -l <OUT> ; grep -nE "VERDICT:|conf=|APPROVE|NEEDS-REVISION|REJECT" <OUT> | tail -20 ; tail -200 <OUT>

[CR-4] RESEARCH FIRST — RECALL → INVESTIGATE → VERIFY
  RECALL:      mcp__plugin_everything-claude-code_memory__search_nodes ;
               mcp__plugin_context-mode_context-mode__ctx_search sort=timeline
  INVESTIGATE: Z:/repos/deps/ at file:line FIRST → web second
  VERIFY:      [VERIFIED]/[INFERRED]/[UNKNOWN]/[MEASURED] markers ; pre-mod state probe

[CR-5] INSTALL-PRIORITY OVER HAND-CODING — bootstrap-only hand-codable

[CR-6] PULL FROM NEWEST GITHUB + OFFICIAL NATIVE CHANNEL ONLY
  /plugin marketplace add <official> ; /plugin install <pkg>@<marketplace> ;
  npm install -g <pkg>@latest ; cargo install <pkg> ; uvx --refresh <pkg> ;
  pipx install <pkg> ; gh release download ; git clone --depth 1 https://... ;
  docker pull <image>:latest
  NEVER: copy from Z:/repos/deps/ (Marker Decay); shell wrappers for official CLIs

[CR-7] GRADUATED UNLEASH — Phase 1 default → Phase 2 trigger Tier 0+1a+1b+1c+2
  INSTALLED + smoke-PASS → Phase 3 trigger + Tier 3-5 + arc-convergence ≥7 fires
  no NEEDS-REVISION conf>0.85

[CR-8] FULL-SOTA-CONTENT — (a) install-class from upstream OR (b) cite-class at
  file:line + HEAD SHA. NO novel content. Per-row CR-8 status:
  ADAPTED-FROM-SOTA / NOVEL-DOCUMENTED-EXCEPTION / PENDING-AUDIT

[CR-9] INSTALL-RISK DISCIPLINE
  - Version-pin all @latest OR mark @latest-acknowledged-D6-risk
  - 2-round fix-forward budget per hook install
  - Pre-cite-import REVERT check: git -C Z:/claude-sota log --all --oneline -- '<path>'
  - Sibling-bleed defense: rewrite Z:/claude-sota/ paths before install-class import

[CR-10] RESEARCH-FIRST-THEN-INSTALL — build error / dep error / unknown config →
  SOTA research FIRST → (a) install canonical (b) cite-adapt (c) best SOTA-recommended
  (d) HONEST-NON-FINDING

[CR-11] META-PROCESS SOTA — build PROCESS recursively follows SOTA practice

[CR-12] UPSTREAM-INSTALL > SIBLING-CITE-IMPORT — PRIMARY upstream / SECONDARY
  TIER-1 SOTA cite-anchor research-only / TERTIARY cite-import-AMBER from sibling
  ONLY when sota-researcher HONEST-NON-FINDING demonstrates no upstream parity

---

## SECTION 2 — SOTA PLUGIN INSTALL SEQUENCE

PHASE 2.A — Anthropic-OFFICIAL plugins (TIER-1-DIRECT):

  /plugin marketplace add anthropics/claude-plugins-official
  /plugin install superpowers@claude-plugins-official
  /plugin install skill-creator@claude-plugins-official
  /plugin install agent-sdk-dev@claude-plugins-official
  /plugin install code-modernization@claude-plugins-official
  /plugin install pyright-lsp@claude-plugins-official
  /plugin install pr-review-toolkit@claude-plugins-official
  /plugin install ralph-loop@claude-plugins-official
  /plugin install frontend-design@claude-plugins-official
  /plugin install everything-claude-code@everything-claude-code
  /plugin marketplace add anthropics/agent-skills
  /plugin marketplace add anthropics/claude-for-financial-services
  /plugin marketplace add openai/codex-plugin-cc
  /plugin install codex@openai-codex

PHASE 2.B — Named-T2 community plugins (TIER-1-NAMED-AUTHOR-QUOTE):

  /plugin marketplace add addyosmani/agent-skills
  /plugin install agent-skills@addy-agent-skills
  /plugin marketplace add affaan-m/everything-claude-code
  /plugin marketplace add mattpocock/skills
  /plugin marketplace add gsd-build/get-shit-done
  /plugin marketplace add vercel-labs/agent-skills
  /plugin marketplace add forrestchang/andrej-karpathy-skills

PHASE 2.C — Discovery catalogs (REMOTE-only — cite via mcp__github__):

  https://github.com/wshobson/agents              (60+ plugins; conductor)
  https://github.com/quemsah/awesome-claude-plugins
  https://github.com/Shubhamsaboo/awesome-llm-apps
  https://github.com/alirezarezvani/claude-skills  (235 skills MIT 5.2k★)
  https://github.com/nibzard/awesome-agentic-patterns
  https://github.com/punkpeye/awesome-mcp-servers  (85k★)
  https://github.com/sickn33/antigravity-awesome-skills  (1400+ cross-tool)
  REJECT-FOR-FIT: AsyncFuncAI/deepwiki-open ; abhigyanpatwari/GitNexus (MISIDENTIFIED)
  REJECT (license): hesreallyhim/awesome-claude-code (CC-BY-NC-ND-4.0)

---

## SECTION 3 — MCP SERVERS (.mcp.json scope=project)

Active baseline (11 servers):
  github / context7 / deepwiki / playwright / chrome-devtools / repomix /
  serena / memory / graphiti / phoenix / gitnexus

PHASE 3.A install via canonical channels:
  pip install git+https://github.com/doobidoo/mcp-memory-service.git  # memory L1
  pip install graphiti-core[falkordb]                                  # graphiti L3
  docker pull falkordb/falkordb:latest                                 # FalkorDB backend
  docker run -d --name falkordb -p 16379:6379 falkordb/falkordb
  npm install -g chrome-devtools-mcp@latest                            # browser auto
  uvx --refresh serena-mcp                                             # code intelligence
  npm install -g repomix@latest                                        # pack-and-grep

---

## SECTION 4 — WORKFLOW GRAMMAR (autonomous /goal mode)

SKIP brainstorming (HARD-GATE incompatible per iter-84 REJECT-FOR-FIT)

writing-plans → TDD → requesting-code-review → verification-before-completion
  → finishing-a-development-branch

---

## SECTION 5 — AGENT DISPATCH (Wave 24-D standing directive)

Pre-dispatch: python Z:/claude/ccc/tools/status.py | head -40
  Verify ≥3 accounts <50% session BEFORE 6th+ cumulative dispatch (§CADP rule 5)

INVARIANTS:
  #1 BRIDGE-MODE GPT-5.5 ≥2 agents (per-call codex budget 90s/120s/180s)
  #2 Brief cites SOTA at file:line + HEAD SHA depth
  #3 Line-by-line repo audit + Probe DAG 1-7
  #4 Anthropic official docs as authority
  #5 ARTIFACT-INLINE per FM-19 for Bash-only agents
  #6 Mia pre-apply on prescriptions (n=412 OVER catches)
  #7 Forward-only tmp/wave<N>-<agent>-<topic>-<date>.md convention
  #8 OUTPUT_BUDGET + TERMINATION in every brief

FM-17.f defense ([1m] flag + subagent dispatch):
  Path P PRIMARY: orchestrator codex exec foreground+tee from main session
  Path D SECONDARY: $env:CLAUDE_CODE_DISABLE_1M_CONTEXT='1' + restart eee

FM-17.g defense (haiku-4-5 provider 502 — Wave 156 Round 1 n=1 firm):
  Agent dispatches with `model: 'sonnet'` override

---

## SECTION 6 — TERMINAL PREDICATE (Ships 2-24)

WAVE 156 COMPLETION when ALL of:

PATH A foundation (Ships 2-3):
  S2 — DEP-ONLY stub promotion (gsd-goal-verifier + wshobson-{devops-troubleshooter,security-auditor})
       to ≥14 CCBP fields per claude-subagents.md:17-36 @ 48f2ceb
  S3 — CR-9 sibling-bleed remediation (22+ files; convert to [PROVENANCE-ONLY])
       Verify: grep -rl 'Z:/claude-sota/' .claude/agents/ .claude/rules/ | wc -l == 0

PATH B Tier 1a completion (Ship 4):
  S4 — T6 codex_stop_review_gate.py recovery from .claude/plugins/cache/openai-codex/
       codex/1.0.4/hooks/ OR cite-import-AMBER from sibling
       Wire: Stop hook slot in .claude/settings.json after auto_proceed_gate
       Verify: ls .claude/hooks/scripts/codex_stop_review_gate.py ;
               grep -c 'codex_stop_review_gate' .claude/settings.json >= 1

PATH C FM-16 + MCP coherence (Ships 5-6):
  S5 — strip [CURRENTLY DISABLED] qualifiers (cross-model-consensus.md:116,320,351 +
       research-protocol.md:118)
       Verify: grep -c 'CURRENTLY.DISABLED' .claude/rules/cross-model-consensus.md
               .claude/rules/research-protocol.md == 0
  S6 — INVERSE-FM-16 OWNED to mcp-disconnect-recovery.md + sub-class row to
       named-failure-modes.md
       Verify: grep -c 'INVERSE-FM-16' .claude/rules/named-failure-modes.md >= 1

PATH D file-splits by section (Ships 7-12; Q12 user mandate):
  S7  — team-orchestration.md (84k → parent <10K + 4 child rules)
  S8  — cross-model-consensus.md (64k → parent <10K + 3 child rules)
  S9  — codex-t1-fix-forward-pattern.md (47k → parent <10K + Pattern A/B/C/D child rules)
  S10 — layered-gates-architecture.md (42k → parent <10K + 3 child rules)
  S11 — agent-harness-fit-verification.md (42k → parent <10K + Probe-DAG child rules)
  S12 — CLAUDE.md (62k → parent <38K + CLAUDE-skills-orchestration.md +
        CLAUDE-bootstrap-setup.md)
  Verify per file: wc -c < 40960 ; each child has "# Part-N of <parent> @ HEAD <SHA>"
                   parent has "## → see <child-file>" pointer

PATH E settings + T3 triage (Ships 13-15):
  S13 — settings.json de-bloat (collapse 6× duplicate hook entries)
        Verify: wc -c .claude/settings.json < 32768
  S14 — T3 NEEDS-REVISION Pattern A batch (37 verdicts conf≥0.85)
        Verify: find .claude/state -name 'codex_review_HEAD_*.txt' -mmin -1440 |
                xargs grep -l 'NEEDS-REVISION' | wc -l < 5
  S15 — T3 REJECT Outcome B REVERT-AND-REMOVE (9 verdicts)
        Verify: find .claude/state -name 'codex_review_HEAD_*.txt' -mmin -1440 |
                xargs grep -l 'REJECT' | wc -l < 3

PATH F ECC ADOPT-NOW (Ships 16-20; Agent B Top-10):
  S16 — autonomous-loops          (loop-architecture skill gap)
  S17 — agent-harness-construction (build vs verify gap)
  S18 — canary-watch              (ONLY post-deploy monitoring primitive)
  S19 — content-hash-cache-pattern + mcp-server-patterns
  S20 — prompt-optimizer          (low-friction adoption)
  Activate from .claude/plugins/cache/everything-claude-code/<v>/skills/ →
    symlink/copy to .claude/skills/<skill-name>/
  Verify: ls .claude/skills/{autonomous-loops,agent-harness-construction,canary-watch,
            content-hash-cache-pattern,mcp-server-patterns,prompt-optimizer}/SKILL.md

PATH G archive-then-remove (Ship 21; Q1 user mandate):
  Move stale → docs/_archives/2026-05-12/ FIRST, then delete originals
  Verify: ls docs/_archives/2026-05-12/ exists

PATH H agent CCBP closure (Ships 22-23):
  S22 — 5 agents (architect/code-reviewer/debugger/gpt5-archaeologist/gpt5-reviewer)
        → full 16-field CCBP
  S23 — Remaining 2 (sota-researcher + verifier) → full 16-field CCBP
  Verify per agent: python3 -c "import yaml; d=list(yaml.safe_load_all(open(f).read().split('---')[1]))[0]; assert len(d) >= 14"

FINAL Ship 24 — Iron Law verification gate:
  @gsd-goal-verifier post-hoc audit → PASS
  git status --short | wc -l <= 21 (state/cache/backup only)
  git log --oneline | grep -c 'Ship [0-9]' >= 24
  codex exec review --uncommitted → APPROVE (if changes remain)
  docs/install-provenance.md appended with Wave 156 close-note
  .claude/projects/Z--claude-sota-installed/memory/MEMORY.md entry under 150 chars

---

## SECTION 7 — PATTERN A FIX-FORWARD

NEEDS-REVISION conf 0.85-0.93 + ≤10 prescribed_edits → apply ALL in SINGLE
  atomic commit per cycle-300. NO iter-N → iter-N.1.
  Verify `git diff` per synthesis-layer-verify.md Mia rule BEFORE commit.

Disposition tree:
  APPROVE conf≥0.90 → ship
  NEEDS-REVISION conf≥0.85 → Pattern A apply
  NEEDS-REVISION conf 0.78-0.84 → Pattern A OR Outcome A ACCEPT-WITH-DOC (severity-gate)
  REJECT OR conf<0.78 → STOP, escalate
  Round 5 cap → Outcome B REVERT-AND-REMOVE per closed-loop-recursive-narrowing.md

---

## SECTION 8 — MIA PRE-APPLY

Before applying ANY prescriptions:
  1. Decompose into testable sub-claims
  2. Cheapest probe per sub-claim (Glob/Grep/Read/git log/wc -l)
  3. Verify EACH sub-claim → refuted → DROP that prescription
  4. Apply verified-surviving in atomic Pattern A commit

INSTALL-class prescriptions:
  PATH probe + alternate-channel probe (.local/bin, .cargo/bin, ~/go/bin, npm-global,
  WinGet, uv tool dirs) + channel-registry probes (npm ls -g, uv tool list, pipx list,
  winget list, brew list) — catch shadow-install pre-existing canonical installs

---

## SECTION 9 — FM DEFENSE

FM-02 destructive-race: atomic `git add -- <path> && git commit -o -F <msg> -- <path>`
  per git-cli-grammar-discipline.md options-before-`--`
FM-09 codex-rescue blind-spot: 2-stage validation (codex-rescue ADOPT → sota-researcher
  Probe DAG 1-7 + Mia)
FM-16 phantom-cite-to-disabled-MCP: rg "mcp__<server>__" cross-check
  .claude/settings.json:disabledMcpjsonServers
  INVERSE-FM-16 (n=1 firm Wave 156): rules say disabled but config says enabled
FM-17 subagent fleet-depletion (6 sub-classes a-f); FM-17.f Path P/D; FM-17.g sonnet override
FM-19 readonly-guard sidestep: ARTIFACT-INLINE in final return
FM-20 path-drift cascade (n=29 firm): Mia-probe at every cite-propagation boundary
FM-21 queue-time-prompt-freeze: STATE PROBE clause-level smoke at every wake;
  CronDelete + CronCreate refresh on doctrine-evolution

---

## SECTION 10 — ITERATION LOOP

Per /goal autonomous iteration:
  1. Read predicate state
  2. RECALL/INVESTIGATE/VERIFY per CR-4
  3. Plan one bounded sub-task per cycle-300
  4. T1 gate fires mechanically OR Path P fallback
  5. Pattern A apply if NEEDS-REVISION
  6. Mia pre-apply on every prescription
  7. Subagent dispatch if non-trivial (Wave 24-D)
  8. Atomic single-shell git add + commit
  9. T2 + T3 hooks fire mechanically
  10. verification-before-completion CLAIM-TIME GATE (FRESH probe, not memory)
  11. Loop if predicate not satisfied

---

## SECTION 11 — PROVENANCE TRAIL

After every ship:
  docs/install-provenance.md append: ship-N + commit-SHA + cite-trail + T3 verdict +
    Pattern A apply count + LOC delta
  .claude/projects/Z--claude-sota-installed/memory/MEMORY.md one-line entry under 150 chars
  .claude/state/<topic>.jsonl audit trail per audit-action-loop.md

---

## SECTION 12 — ANTI-PATTERNS

- Skip codex T1 because "looks mechanical" — refuted unless mechanical-mirror narrow
  predicates ALL hold
- Bundle multiple design surfaces in one T1 — split per cycle-300
- Trust agent prescription verbatim — Mia n=412 OVER catches
- --no-verify OR skip cross-model gates — refuted by canonical.md Must-Never #3
- Copy from Z:/repos/deps/ for install (use upstream channel per CR-6)
- Cite sibling claude-sota as TIER-1 (it is TIER-3-LOCAL-COMPOSITION)
- Rewrite historical commit bodies (port-note-discipline.md §6 forward-only)
- 4+ concurrent agents without §CADP rule 5 fleet probe
- /goal + /loop cron combined (FM-21 freeze compounds)
- Set CLAUDE_CODE_SUBAGENT_MODEL (env-funnels; defeats cross-model gate)
- Claim done without fresh probe (Iron Law violation)
- File-split without cite-anchor preservation
- Hard-delete before archiving (Q1 mandate: archive-then-remove)

---

## SECTION 13 — REPORT MANDATE (at /goal completion)

Surface to operator:
  - All 24 ship commit SHAs (Ship 0+1 done: 69e5fd4 + a4bb3f1; Ships 2-24 ?)
  - All T3 verdict file paths (.claude/state/codex_review_HEAD_*.txt)
  - Total LOC delta + file count
  - Pattern A apply rounds + Outcome A/B/C counts
  - Re-measured 7 audit conformance percentages (target ≥80% / ≥50% / ≥80% /
    ≥90% / 0% / ≤10% / ≥90%)
  - docs/install-provenance.md final append
  - MEMORY.md index entry under 150 chars
  - FM-17.g status (resolved OR ongoing)

---

## SECTION 14 — CITE CLASS FOR THIS PROMPT

constituents=[
  TIER-1-DIRECT @ Z:/repos/deps/claude-code-best-practice-shan/best-practice/
    {claude-subagents.md:17-36, claude-settings.md:877-921, claude-memory.md:113,
     claude-skills.md, claude-hooks.md, claude-mcp.md}
    @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd,
  TIER-1-DIRECT @ Z:/repos/deps/andrej-karpathy-skills/CLAUDE.md:7-43
    @ HEAD 2c606141936f1eeef17fa3043a72095b4765b9c2,
  TIER-1-DIRECT @ Z:/repos/deps/claude-agent-sdk-python
    @ HEAD b512f256450dba8f0dd1399e485563b7deb9c534,
  TIER-1-DIRECT @ https://code.claude.com/docs/en/{sub-agents,env-vars,settings,
    hooks,model-config,permission-modes,agent-view,scheduled-tasks,commands,
    skills,mcp},
  TIER-1-NAMED-AUTHOR-QUOTE @ obra/superpowers
    skills/verification-before-completion/SKILL.md:1-20
    @ HEAD e7a2d16476bf042e9add4699c9d018a90f86e4a6,
  TIER-1-NAMED-AUTHOR-QUOTE @ addyosmani/agent-skills
    skills/source-driven-development/SKILL.md @742dca5,
  TIER-1-NAMED-AUTHOR-QUOTE @ affaan-m/everything-claude-code
    skills/{autonomous-loops,agent-harness-construction,canary-watch}/SKILL.md
    @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a,
  TIER-1-DIRECT @ openai/codex codex-rs/git-utils/src/info.rs:618-654
    @ HEAD 993e3f407ea8213f7d32cb9367ae7616b7e15b4a,
  TIER-1-DIRECT @ anthropics/cwc-long-running-agents
    @ HEAD ffd563d668a97a38d4aa092bf0d5b1507c046629,
  TIER-3-LOCAL-COMPOSITION @ claude-sota cardinal-rules CR-0 through CR-12 +
    24 sister-rule cite-imports (citation-discipline.md + cross-model-consensus.md +
    codification-threshold.md + codex-t1-fix-forward-pattern.md +
    advanced-agent-team-standing-directive.md + agent-harness-fit-verification.md +
    audit-action-loop.md + closed-loop-recursive-narrowing.md +
    convergence-gate.md + deprecation-discipline.md + evidence-policy.md +
    fm17-subagent-fleet-depletion.md + fm19-readonly-guard-sidestep.md +
    fm20-path-drift-cascade.md + fm21-queue-time-prompt-freeze.md +
    git-cli-grammar-discipline.md + karpathy-adapted.md + kiss-dry-yagni.md +
    launch-discipline.md + layered-gates-architecture.md +
    mcp-disconnect-recovery.md + mia-pre-apply.md +
    multi-source-discovery-breadth-discipline.md + named-failure-modes.md +
    parallel-agent-wave.md + parallel-session-worktree-isolation.md +
    port-note-discipline.md + research-protocol.md + sota-pin-discipline.md +
    synthesis-layer-verify.md +
    Wave 156 plan cryptic-shimmying-dewdrop.md)
];
effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8 MIN_PRECEDENCE

---

# END SOTA AUTOMATION PROMPT — invoke via /goal as documented at file bottom
