# DEFINITIVE SOTA /goal PREDICATE — eee runtime MAX-DEPTH AUTOMATION

**File**: `Z:/claude-sota-installed/tmp/sota-definitive-goal-MAX-DEPTH.md`
**Generated**: 2026-05-12
**Wave**: 156+ (continues from Ships 0+1: `69e5fd4` + `a4bb3f1`)
**Plan ref**: `Z:/claude-sota-installed/.claude/plans/cryptic-shimmying-dewdrop.md`
**Cite class**: `effective_tier=TIER-3-LOCAL-COMPOSITION` per citation-discipline.md rule #8 MIN_PRECEDENCE

---

═══════════════════════════════════════════════════════════════════════════════
TASK
═══════════════════════════════════════════════════════════════════════════════

Drive eee runtime to FULL-SOTA terminal state via max-depth autonomous /goal
execution with REAL GPT-5.5 utilization at every design-surface fire + adversarial
review at every layer + Iron Law claim-time verification + native install via
official channels + comprehensive health check matrix. Continuous loop until ALL
terminal predicates satisfied. Auto-recovery on any failure mode (T1 NEEDS-REVISION
→ Pattern A apply; REJECT → Outcome B revert; FM-17/19/20/21 → documented recovery
paths). Report progress percentages at every loop iteration.

═══════════════════════════════════════════════════════════════════════════════
SECTION 1 — CARDINAL RULES (CR-0 through CR-12 — apply on EVERY meta-step per CR-11)
═══════════════════════════════════════════════════════════════════════════════

[CR-0] SKILL FIRST PER 1% RULE — invoke superpowers:using-superpowers +
addy-agent-skills:using-agent-skills BEFORE any action. Layer Process + Implementation
skills atomically. Multi-skill stacking when ≥2 apply (per using-superpowers SKILL.md).

[CR-1] CITE AT FILE:LINE + HEAD SHA
  TIER-1-DIRECT  Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA>
                  OR https://code.claude.com/docs/en/<page>
                  OR mcp__github__get_file_contents blob result
  TIER-2         docs/<doc>.md user-curated with upstream cite-anchor
  TIER-3-LOCAL-* sibling cite-import-AMBER OR operator-derived OR local config
  Composed: constituents=[<class1@cite1>, ...]; effective_tier=MIN_PRECEDENCE
  per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8

[CR-2] KARPATHY 4 PRINCIPLES (cite: Z:/repos/deps/andrej-karpathy-skills/CLAUDE.md:7-43
@ HEAD 2c606141936f1eeef17fa3043a72095b4765b9c2)
  P1 Think Before Coding (confused → STOP + MEASURE)
  P2 Simplicity First (minimum code; no speculative abstractions)
  P3 Surgical Changes (every line traces to user request)
  P4 Goal-Driven Execution (testable terminal predicate; loop-until-verified)

[CR-3] CROSS-MODEL CONSENSUS T1-T7 — REAL GPT-5.5 MANDATE
  Every design-surface edit MUST satisfy cross-model gate via REAL GPT-5.5 codex.
  Mechanical hooks at .claude/hooks/scripts/:
    T1 codex_t1_consult_gate.py        PreToolUse Edit|Write|MultiEdit 5s sync
    T2 codex_t2_pre_commit_gate.py     PreToolUse Bash(git commit *) 180s sync
    T3 codex_postcommit_review.py      PostToolUse Bash(git commit *) 30s async
    T4 codex_prepush_review.py         PostToolUse Bash(git push *) 30s async
    T5 codex_t5_plan_review_gate.py    PreToolUse ExitPlanMode 5s async
    T6 codex_stop_review_gate.py       Stop hook 900s sync (PENDING — Ship 4)
    T7 auto_proceed_gate.py            Stop hook slot[0] 5s sync
  Phase 1 bootstrap exception (Path P foreground+tee — RECOMMENDED for REAL GPT-5.5):
    timeout 300 codex exec --skip-git-repo-check --color never -p deep-review-exec \
      < .claude/state/codex_consult_<topic>.txt 2>&1 | \
      tee .claude/state/codex_consult_<topic>_OUT.txt
  Verdict reading EOF FIRST:
    wc -l <OUT>
    grep -nE "VERDICT:|conf=|APPROVE|NEEDS-REVISION|REJECT|severity (P[0-3])" <OUT> | tail -20
    tail -200 <OUT>
  Per-call codex time-budget: 90s default / 120s normal cap / 180s with explicit reason
  (FM-17.d defense per fm17-subagent-fleet-depletion.md §FM-17.d)

[CR-4] RESEARCH FIRST — RECALL → INVESTIGATE → VERIFY (per research-protocol.md)
  RECALL:      mcp__plugin_everything-claude-code_memory__search_nodes ;
               mcp__plugin_context-mode_context-mode__ctx_search sort=timeline ;
               prior reports/*.md + .claude/state/*.jsonl ;
               mcp__plugin_everything-claude-code_memory__open_nodes for entity recall
  INVESTIGATE: Z:/repos/deps/ at file:line FIRST → official docs → web third ;
               benchmark-first sub-rule (leaderboards before keywords) ;
               ≥4-distinct-source ecosystem crawl per
                 multi-source-discovery-breadth-discipline.md ;
               mcp__deepwiki__ask_question for repo Q&A ;
               mcp__github__search_code for cross-repo pattern verification
  VERIFY:      test actual output; [VERIFIED]/[INFERRED]/[UNKNOWN]/[MEASURED] markers
               per evidence-policy.md Marker Decay corollary ;
               pre-modification state-probe + runtime-probe (VERIFY corollary 1) ;
               audit producer-consumer coupling (VERIFY corollary 2)

[CR-5] INSTALL-PRIORITY — bootstrap-only hand-codable; ALL primitives via upstream install

[CR-6] PULL FROM NEWEST GITHUB + OFFICIAL NATIVE CHANNEL ONLY
  /plugin marketplace add <official> ; /plugin install <pkg>@<marketplace> ;
  npm install -g <pkg>@latest ; cargo install <pkg> ; uvx --refresh <pkg> ;
  pipx install <pkg> ; gh release download --repo <owner>/<repo> $(gh release list
    --repo <owner>/<repo> --limit 1 --json tagName -q '.[0].tagName') ;
  git clone --depth 1 https://github.com/<owner>/<repo>.git <dest> ;
  docker pull <image>:latest
  NEVER: copy from Z:/repos/deps/ (Marker Decay) ; shell wrappers for official CLIs ;
         pinned-old-version (use @latest unless CR-9 version-pin justified)

[CR-7] GRADUATED UNLEASH — Phase 1 default → Phase 2 trigger (Tier 0+1a+1b+1c+2
  INSTALLED + smoke-PASS) → Phase 3 trigger (+ Tier 3-5 + arc-convergence ≥7 fires
  no NEEDS-REVISION conf>0.85 + zero open INSTALLED-AMBER)

[CR-8] FULL-SOTA-CONTENT — (a) install-class from upstream OR (b) cite-class at
  file:line + HEAD SHA. NO novel content. Per-row CR-8 status required:
  ADAPTED-FROM-SOTA / NOVEL-DOCUMENTED-EXCEPTION / PENDING-AUDIT

[CR-9] INSTALL-RISK DISCIPLINE — version-pin all @latest OR mark
  @latest-acknowledged-D6-risk ; 2-round fix-forward budget per hook install ;
  pre-cite-import REVERT check via git -C Z:/claude-sota log --all --oneline -- '<path>' ;
  sibling-bleed defense (rewrite Z:/claude-sota/ paths before install-class import) ;
  read-only research probes EXEMPT from sibling-bleed rule

[CR-10] RESEARCH-FIRST-THEN-INSTALL — build/dep/config error → SOTA research FIRST →
  (a) install canonical SOTA solution
  (b) cite-adapt SOTA pattern at file:line anchor
  (c) best SOTA-recommended approach with provenance
  (d) HONEST-NON-FINDING per synthesis-layer-verify.md

[CR-11] META-PROCESS SOTA — build PROCESS recursively follows SOTA practice

[CR-12] UPSTREAM-INSTALL > SIBLING-CITE-IMPORT — PRIMARY upstream / SECONDARY
  TIER-1 SOTA cite-anchor (research-only) / TERTIARY cite-import-AMBER from sibling
  ONLY when sota-researcher HONEST-NON-FINDING demonstrates no upstream parity

═══════════════════════════════════════════════════════════════════════════════
SECTION 2 — REAL GPT-5.5 UTILIZATION MAXIMUM (per cross-model-consensus.md)
═══════════════════════════════════════════════════════════════════════════════

GPT-5.5 dispatched on EVERY:
  - design-surface edit (T1 pre-edit; mechanical hook fires)
  - commit (T2 pre-commit; mechanical hook fires)
  - post-commit (T3 async; mechanical hook fires)
  - post-push (T4 async; mechanical hook fires)
  - plan-mode exit (T5 plan-review; mechanical hook fires)
  - session-end (T6 stop-gate; PENDING Ship 4 install)
  - adversarial-review-class fire (Path P + gpt5-reviewer subagent BRIDGE-MODE)

REAL GPT-5.5 dispatch paths (per docs/fm17f-deep-dive-2026-05-09.md):
  Path P PRIMARY (preferred for orchestrator-direct cross-model):
    timeout 300 codex exec --skip-git-repo-check --color never -p deep-review-exec \
      < .claude/state/codex_consult_<topic>.txt 2>&1 | \
      tee .claude/state/codex_consult_<topic>_OUT.txt
  Path B BRIDGE-MODE subagent (for fan-out parallel cross-model):
    Agent({subagent_type: "gpt5-reviewer", model: "sonnet" (FM-17.g override),
           prompt: "<brief with per-call codex 90/120/180s budget +
                    ARTIFACT-INLINE mandate per FM-19>"})
  Path D 1M-kill-switch (when BRIDGE-MODE fan-out hits FM-17.f):
    $env:CLAUDE_CODE_DISABLE_1M_CONTEXT='1' + restart eee
    (parent loses 1M ceiling; /compact more aggressive)

NEVER: set CLAUDE_CODE_SUBAGENT_MODEL (env-funnels everything to Sonnet stand-in;
       defeats cross-model gate per cross-model-consensus.md §Env-funneled subagent
       stand-in disclosure mandate)

Per-fire mandate: ≥2 BRIDGE-MODE GPT-5.5 dispatches per non-trivial ship
  (codex-rescue / gpt5-reviewer / gpt5-archaeologist) + 1 orchestrator-side Path P
  T1 codex consult on design surface

Profile selection (.codex/config.toml):
  deep-review-exec → xhigh + danger-full-access + service_tier=fast (T1/T3/T4/T6)
  deep-review      → xhigh + read-only sandbox (T5 plan-stage)
  t2-exec          → high + read-only + service_tier=fast (operator-side T2 custom)

═══════════════════════════════════════════════════════════════════════════════
SECTION 3 — ADVERSARIAL REVIEW AT EVERY LAYER (3-lens minimum per ship)
═══════════════════════════════════════════════════════════════════════════════

For EVERY non-trivial ship:

LENS 1 — Codex T1 pre-edit (auto-fires via hook OR Path P foreground+tee)
  REAL GPT-5.5 deep-review-exec on proposed design with 2-4 explicit AXIS-N
  audit dimensions. Output JSON-strict verdict {APPROVE / NEEDS-REVISION / REJECT}
  + prescribed_edits. Pattern A apply on NEEDS-REVISION conf≥0.85.

LENS 2 — gpt5-reviewer adversarial subagent (BRIDGE-MODE)
  Agent({subagent_type: "gpt5-reviewer", model: "sonnet" (FM-17.g),
         prompt: "Adversarially review the design Lens 1 produced. What did codex
                  T1 MISS? Failure modes not surfaced? Cardinal-rule violations
                  hidden? Cite at file:line + HEAD SHA. Return VERDICT: BLOCK if
                  any HIGH-severity finding survives, else APPROVE-WITH-CONCERNS
                  with concrete-verification per closed-loop-recursive-narrowing.md
                  severity-gate."})

LENS 3 — Mia pre-apply on returned prescriptions
  Per mia-pre-apply.md (n=412 firm OVER catches):
    Decompose into sub-claims → cheapest-probe per sub-claim → verify each
    independently → DROP refuted sub-claims → apply only verified-surviving in
    atomic Pattern A commit

LENS 4 (when codex-rescue dispatched) — 2-stage harness-fit verification
  Per FM-09 in agent-harness-fit-verification.md §FM-09 codex-rescue blind-spot
    specialization (n=51 firm — 100% same-arc base rate):
    codex-rescue ADOPT-NOW verdict → DO NOT trust → 2nd-stage sota-researcher
    subagent with explicit Probe DAG 1-7 + plugin-namespace check + LICENSE
    probe + npm/PyPI registry direct-existence + demand-absence test

LENS 5 (at terminal predicate satisfaction) — gsd-goal-verifier post-hoc audit
  Per .claude/agents/gsd-goal-verifier.md (sourced from gsd-build/get-shit-done):
    Reads git diff + acceptance criteria + run verification commands embedded
    in /goal predicate text → PASS/NEEDS_WORK verdict on outcome (not process)

LENS 6 (post-commit; mechanical) — T3 codex postcommit verdict
  Auto-writes to .claude/state/codex_review_HEAD_<sha8>.txt for audit trail
  Iron Law verification-before-completion gate at /goal terminal

═══════════════════════════════════════════════════════════════════════════════
SECTION 4 — QUALITY GATES (every gate fail-closed)
═══════════════════════════════════════════════════════════════════════════════

GATE 1 — Pre-flight (BEFORE any Edit)
  RECALL → mcp memory search + ctx_search timeline
  INVESTIGATE → Z:/repos/deps/file:line FIRST
  T1 codex consult → verdict EOF first
  Mia pre-apply on prescriptions
  
GATE 2 — Edit-time (PreToolUse hooks fire)
  T1 codex_t1_consult_gate.py
  safety_guard.py (catastrophic Bash patterns)
  agent_plan_readonly_bash_guard.py (read-only agent restriction)
  secret_scan_guard.py
  
GATE 3 — Pre-commit (PreToolUse Bash git commit)
  T2 codex_t2_pre_commit_gate.py (180s sync STRICT FAIL_CLOSED)
  gitleaks_pre_commit_gate.py
  
GATE 4 — Post-commit (PostToolUse Bash git commit; async)
  T3 codex_postcommit_review.py (verdict file written)
  codex_failure_audit.py
  codex_mcp_healthcheck.py
  
GATE 5 — Post-push (PostToolUse Bash git push; async)
  T4 codex_prepush_review.py (cumulative branch diff vs base)
  
GATE 6 — Plan-mode-exit (PreToolUse ExitPlanMode; async)
  T5 codex_t5_plan_review_gate.py
  
GATE 7 — Session-end (Stop hook; sync)
  T7 auto_proceed_gate.py (ask-without-act detection; 5s)
  T6 codex_stop_review_gate.py (PENDING Ship 4; 900s deep-review)
  ralph_wiggum_stop.sh (loop driver if active)
  
GATE 8 — Subagent-end (SubagentStop hook)
  subagent_stop_telemetry.py
  fm17_class_lint.py (FM-17 sub-class catalog audit)
  fm19_artifact_inline_lint.py (FM-19 ARTIFACT-INLINE compliance)
  fm20_path_drift_lint.py (FM-20 cascade defense)
  
GATE 9 — Iron Law verification-before-completion (claim-time)
  superpowers:verification-before-completion SKILL invokes per /goal terminal
  FRESH probe (not memory recall) — verification commands embedded in predicate text
  
GATE 10 — gsd-goal-verifier post-hoc audit
  Read git diff + acceptance criteria + verification commands → PASS/NEEDS_WORK

═══════════════════════════════════════════════════════════════════════════════
SECTION 5 — SOTA REPO NATIVE INSTALL SEQUENCE (CR-6 official channels)
═══════════════════════════════════════════════════════════════════════════════

PHASE 5.A — Anthropic-OFFICIAL plugins (TIER-1-DIRECT; install FIRST):

  /plugin marketplace add anthropics/claude-plugins-official
  /plugin install superpowers@claude-plugins-official            # 14 workflow skills
  /plugin install skill-creator@claude-plugins-official           # skill authoring
  /plugin install agent-sdk-dev@claude-plugins-official           # SDK + verifiers
  /plugin install code-modernization@claude-plugins-official      # 7 modernization agents
  /plugin install pyright-lsp@claude-plugins-official             # Python LSP
  /plugin install pr-review-toolkit@claude-plugins-official       # PR review
  /plugin install ralph-loop@claude-plugins-official              # autonomous loops
  /plugin install frontend-design@claude-plugins-official         # frontend design
  /plugin marketplace add anthropics/agent-skills                 # skill-creator subagents
  /plugin marketplace add anthropics/claude-for-financial-services
  /plugin marketplace add openai/codex-plugin-cc                  # T1-T7 hooks
  /plugin install codex@openai-codex                              # GPT-5.5 substrate

PHASE 5.B — Named-T2 community plugins (TIER-1-NAMED-AUTHOR-QUOTE):

  /plugin marketplace add addyosmani/agent-skills
  /plugin install agent-skills@addy-agent-skills                  # 21 engineering-phase
  /plugin marketplace add affaan-m/everything-claude-code
  /plugin install everything-claude-code@everything-claude-code   # 165+ ECC skills
  /plugin marketplace add mattpocock/skills                       # 48k★ TS-domain
  /plugin marketplace add gsd-build/get-shit-done                 # 58k★ multi-IDE
  /plugin marketplace add vercel-labs/agent-skills                # 8 Vercel skills
  /plugin marketplace add forrestchang/andrej-karpathy-skills    # Karpathy 4 principles

PHASE 5.C — MCP servers (canonical install via uvx/pip/npm/docker):

  pip install git+https://github.com/doobidoo/mcp-memory-service.git  # memory L1
  pip install graphiti-core[falkordb]                                  # graphiti L3
  docker pull falkordb/falkordb:latest
  docker run -d --name falkordb -p 16379:6379 falkordb/falkordb
  npm install -g chrome-devtools-mcp@latest                            # browser auto
  uvx --refresh serena-mcp                                             # code intel
  npm install -g repomix@latest                                        # pack-and-grep
  uvx --refresh phoenix-mcp                                            # observability

PHASE 5.D — Discovery catalogs (REMOTE-only — cite via mcp__github__):

  wshobson/agents (60+ plugins; conductor pattern)
  quemsah/awesome-claude-plugins (daily-refresh)
  Shubhamsaboo/awesome-llm-apps
  alirezarezvani/claude-skills (235 production MIT 5.2k★)
  nibzard/awesome-agentic-patterns (70+ patterns)
  punkpeye/awesome-mcp-servers (85k★ MCP registry)
  sickn33/antigravity-awesome-skills (1400+ cross-tool)
  ComposioHQ/awesome-claude-skills
  REJECT-FOR-FIT: AsyncFuncAI/deepwiki-open; abhigyanpatwari/GitNexus (MISIDENTIFIED)
  REJECT (license): hesreallyhim/awesome-claude-code (CC-BY-NC-ND-4.0)

═══════════════════════════════════════════════════════════════════════════════
SECTION 6 — HEALTH CHECK MATRIX (verify every layer per CR-4 VERIFY gate)
═══════════════════════════════════════════════════════════════════════════════

LAYER A — Plugin health (per CR-6 install verification):
  claude plugin list                                    # all enabled plugins
  ls .claude/plugins/cache/{anthropic-agent-skills,addy-agent-skills,
    claude-plugins-official,openai-codex,everything-claude-code,
    mattpocock-skills,gsd-build-get-shit-done,vercel-labs-agent-skills,
    forrestchang-andrej-karpathy-skills}/  # cache directories present
  /plugin status                                        # per-plugin health (CC 2.1.x)

LAYER B — MCP health (per mcp-disconnect-recovery.md D1-D6):
  /mcp                                                  # CC slash command
  python3 -c "import json; print(json.load(open('.mcp.json'))['mcpServers'].keys())"
  python3 .claude/hooks/scripts/codex_mcp_healthcheck.py  # if installed
  # Per server probe:
  curl http://localhost:16379 -i                        # FalkorDB (graphiti backend)
  python3 -c "import sqlite_vec; print('OK')"           # memory sqlite_vec
  docker ps                                             # active containers

LAYER C — Hook health (verify wire-status in settings.json):
  python3 -c "import json; s=json.load(open('.claude/settings.json'));
    h=s.get('hooks',{}); [print(f'{ev}: {len(h[ev])} entries') for ev in h]"
  ls .claude/hooks/scripts/{codex_t1_consult_gate,codex_t2_pre_commit_gate,
    codex_postcommit_review,codex_prepush_review,codex_t5_plan_review_gate,
    codex_stop_review_gate,auto_proceed_gate,safety_guard,secret_scan_guard,
    agent_spawn_gate,subagent_stop_telemetry}.py
  python3 .claude/hooks/scripts/codex_t1_consult_gate.py --health  # if --health flag

LAYER D — Agent health (CCBP 16-field frontmatter):
  for f in .claude/agents/*.md; do
    echo -n "$f: "
    python3 -c "import yaml; d=list(yaml.safe_load_all(open('$f').read().split('---')[1]))[0]; print(f'fields={len(d)}', d.get('name'), d.get('model','?'))"
  done
  # Target: ≥14 fields per agent (CCBP claude-subagents.md:17-36)

LAYER E — Skill health (frontmatter + auto-fire descriptor):
  find .claude/skills -name 'SKILL.md' | wc -l
  find .claude/plugins/cache -name 'SKILL.md' | wc -l
  # Cross-check: every SKILL.md has valid frontmatter with description:
  for f in $(find .claude/skills -name 'SKILL.md'); do
    python3 -c "import yaml; d=list(yaml.safe_load_all(open('$f').read().split('---')[1]))[0]; assert d.get('description'), 'missing description'" || echo "$f: BROKEN"
  done

LAYER F — Settings.json health:
  python3 -c "import json; s=json.load(open('.claude/settings.json'));
    print('permissions.defaultMode:', s.get('permissions',{}).get('defaultMode')) ;
    print('disabledMcpjsonServers:', s.get('disabledMcpjsonServers',[])) ;
    print('enabledPlugins count:', len(s.get('enabledPlugins',{}))) ;
    print('hooks event count:', len(s.get('hooks',{})))"

LAYER G — Cardinal-rule conformance metrics (7 percentages):
  # % agents full 16-field CCBP
  full16=$(for f in .claude/agents/*.md; do python3 -c "import yaml; d=list(yaml.safe_load_all(open('$f').read().split('---')[1]))[0]; print(1 if len(d)>=16 else 0)"; done | awk '{s+=$1} END {print s}')
  total=$(ls .claude/agents/*.md | wc -l)
  echo "Agents 16-field: $full16/$total"
  
  # % rules with TIER-1-DIRECT cite in first 10 lines
  tier1=$(for f in .claude/rules/*.md; do head -10 "$f" | grep -l 'TIER-1-DIRECT' > /dev/null && echo 1; done | wc -l)
  rtot=$(ls .claude/rules/*.md | wc -l)
  echo "Rules TIER-1-DIRECT first-10: $tier1/$rtot"
  
  # % files >40k chars (CRITICAL — should be 0)
  critical40k=$(find . -name '*.md' -o -name '*.json' -o -name '*.py' | xargs wc -c 2>/dev/null | awk '$1>40960 {n++} END {print n+0}')
  echo "Files >40k chars: $critical40k (target: 0)"
  
  # % hooks emitting agent_id/agent_type
  hookscript_total=$(ls .claude/hooks/scripts/*.py | wc -l)
  hookscript_telemetry=$(grep -l 'agent_id\|agent_type' .claude/hooks/scripts/*.py | wc -l)
  echo "Hooks with agent telemetry: $hookscript_telemetry/$hookscript_total"
  
  # % FORWARD-REF unresolved
  forward_refs=$(grep -rl 'FORWARD-REF' .claude/ docs/ | wc -l)
  echo "FORWARD-REF unresolved files: $forward_refs"
  
  # CR-9 sibling-bleed sites
  sibling_bleed=$(grep -rl 'Z:/claude-sota/' .claude/agents/ .claude/rules/ 2>/dev/null | wc -l)
  echo "CR-9 sibling-bleed sites: $sibling_bleed (target: 0)"
  
  # Open T3 NEEDS-REVISION (last 24h)
  open_t3=$(find .claude/state -name 'codex_review_HEAD_*.txt' -mmin -1440 2>/dev/null |
    xargs grep -l 'NEEDS-REVISION' 2>/dev/null | wc -l)
  echo "Open T3 NEEDS-REVISION (24h): $open_t3"

LAYER H — Codex CLI health:
  codex --version                                       # 0.130.0 expected
  codex exec --help | head -5                           # CLI alive
  ls .codex/config.toml                                 # profiles config present
  ls .codex/auth.json                                   # auth configured
  echo "test" | timeout 30 codex exec --skip-git-repo-check --color never 2>&1 | tail -5

LAYER I — Cross-model gate end-to-end probe:
  echo "Test consult — SOTA cite verification" > /tmp/health-probe.txt
  timeout 60 codex exec --skip-git-repo-check --color never -p deep-review-exec \
    < /tmp/health-probe.txt > /tmp/health-probe-out.txt 2>&1
  grep -c "verdict" /tmp/health-probe-out.txt           # ≥1 = gate alive

LAYER J — Git + working tree health:
  git status --short | wc -l
  git log --oneline -5
  git diff --stat HEAD~5..HEAD
  git remote -v

LAYER K — Memory + state health:
  ls .claude/projects/Z--claude-sota-installed/memory/MEMORY.md
  wc -l .claude/projects/Z--claude-sota-installed/memory/MEMORY.md
  ls .claude/state/codex_review_HEAD_*.txt | wc -l
  ls .claude/state/codex_postcommit_reviews.jsonl

═══════════════════════════════════════════════════════════════════════════════
SECTION 7 — TERMINAL PREDICATE (Wave 156 Ships 2-24 + max-depth automation)
═══════════════════════════════════════════════════════════════════════════════

WAVE 156 COMPLETION when ALL of:

PATH A foundation (Ships 2-3):
  S2 — DEP-ONLY stub promotion (gsd-goal-verifier + wshobson-* agents)
    Verify: for f in .claude/agents/{gsd-goal-verifier,wshobson-devops-troubleshooter,
              wshobson-security-auditor}.md; do
              python3 -c "import yaml; d=list(yaml.safe_load_all(open('$f').read().split('---')[1]))[0]; assert len(d) >= 14"
            done
  S3 — CR-9 sibling-bleed remediation (22+ files; convert to [PROVENANCE-ONLY])
    Verify: grep -rl 'Z:/claude-sota/' .claude/agents/ .claude/rules/ | wc -l == 0

PATH B Tier 1a completion (Ship 4):
  S4 — T6 codex_stop_review_gate.py recovery + wire
    Probe: find Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/ -name 'codex_stop_review_gate.py'
    Wire: Stop hook slot in .claude/settings.json after auto_proceed_gate
    Verify: ls .claude/hooks/scripts/codex_stop_review_gate.py exists
            grep -c 'codex_stop_review_gate' .claude/settings.json >= 1
    Health: bash -c "echo 'test'; sleep 1" | python3 .claude/hooks/scripts/codex_stop_review_gate.py --dry-run

PATH C FM-16 + MCP coherence (Ships 5-6):
  S5 — strip [CURRENTLY DISABLED] qualifiers
    Verify: grep -c 'CURRENTLY.DISABLED' .claude/rules/cross-model-consensus.md .claude/rules/research-protocol.md == 0
  S6 — INVERSE-FM-16 OWNED + sub-class row
    Verify: grep -c 'INVERSE-FM-16' .claude/rules/named-failure-modes.md >= 1

PATH D file-splits by section (Ships 7-12 per Q12):
  S7  team-orchestration.md (84k → parent <10K + 4 child rules)
  S8  cross-model-consensus.md (64k → parent <10K + 3 child rules)
  S9  codex-t1-fix-forward-pattern.md (47k → parent <10K + Pattern A/B/C/D child rules)
  S10 layered-gates-architecture.md (42k → parent <10K + 3 child rules)
  S11 agent-harness-fit-verification.md (42k → parent <10K + Probe-DAG child rules)
  S12 CLAUDE.md (62k → parent <38K + CLAUDE-skills-orchestration + CLAUDE-bootstrap-setup)
  Verify per file: wc -c < 40960 ; each child has "# Part-N of <parent> @ HEAD <SHA>"
                   parent has "## → see <child-file>" pointer

PATH E settings + T3 triage (Ships 13-15):
  S13 settings.json de-bloat (collapse 6× duplicate hook entries)
    Verify: wc -c .claude/settings.json < 32768
            python3 -c "import json; s=json.load(open('.claude/settings.json'));
              p=s['hooks']['PreToolUse']; assert len(p) <= 7"
  S14 T3 NEEDS-REVISION Pattern A batch (37 verdicts conf≥0.85)
    Per verdict: read prescriptions → Mia probe → Pattern A apply atomic
    Verify: find .claude/state -name 'codex_review_HEAD_*.txt' -mmin -1440 |
            xargs grep -l 'NEEDS-REVISION' | wc -l < 5
  S15 T3 REJECT Outcome B REVERT-AND-REMOVE (9 verdicts)
    Verify: find .claude/state -name 'codex_review_HEAD_*.txt' -mmin -1440 |
            xargs grep -l 'REJECT' | wc -l < 3

PATH F ECC ADOPT-NOW (Ships 16-20):
  S16 autonomous-loops               (loop-architecture gap)
  S17 agent-harness-construction     (build vs verify gap)
  S18 canary-watch                   (ONLY post-deploy monitoring primitive)
  S19 content-hash-cache-pattern + mcp-server-patterns
  S20 prompt-optimizer               (low-friction adoption)
  Activate from .claude/plugins/cache/everything-claude-code/<v>/skills/ →
    symlink/copy to .claude/skills/<skill-name>/
  Verify: ls .claude/skills/{autonomous-loops,agent-harness-construction,canary-watch,
            content-hash-cache-pattern,mcp-server-patterns,prompt-optimizer}/SKILL.md

PATH G archive-then-remove (Ship 21):
  Move stale → docs/_archives/2026-05-12/ FIRST → delete originals
  Verify: ls docs/_archives/2026-05-12/ exists with archived content

PATH H agent CCBP closure (Ships 22-23):
  S22 5 agents (architect/code-reviewer/debugger/gpt5-archaeologist/gpt5-reviewer)
  S23 Remaining 2 (sota-researcher + verifier)
  Per agent: full 16-field CCBP per claude-subagents.md:17-36
  Verify: for f in .claude/agents/*.md; do
            python3 -c "import yaml; d=list(yaml.safe_load_all(open('$f').read().split('---')[1]))[0]; assert len(d) >= 14"
          done

FINAL Ship 24 — Iron Law verification gate:
  @gsd-goal-verifier post-hoc audit → PASS
  git status --short | wc -l <= 21
  git log --oneline | grep -c 'Ship [0-9]' >= 24
  codex exec review --uncommitted → APPROVE (if changes remain)
  Health check matrix (Section 6) all layers PASS
  docs/install-provenance.md appended with Wave 156 close-note
  .claude/projects/Z--claude-sota-installed/memory/MEMORY.md entry under 150 chars

═══════════════════════════════════════════════════════════════════════════════
SECTION 8 — CONTINUOUS LOOP SEMANTICS (per /goal autonomous run)
═══════════════════════════════════════════════════════════════════════════════

Per iteration:
  1. Read terminal predicate state — what's still false?
  2. Run health check matrix (Section 6) every 5th iteration OR on suspicion of degradation
  3. CONTEXT PROBE: invoke `/context all` (or equivalent budget probe) — check token usage
     - If >= 50% (500k for 1M) → proactive `/compact "<hint>"` BEFORE next ship; keep loop alive
     - If >= 45% AND rot symptoms (cite-trail confusion / repeated re-probes) → /rewind to last clean state
     - Manual /compact threshold per coordination.md §12 (operator-discipline driven, not autocompact)
     - Compact hint shape: "Wave 156 PATH X complete (Ships N-M). Next PATH Y. Drop verdict bodies + completed Lens-N artifacts. Keep cardinal-rule cite chain + plan file ref + 8 progress percentages + .claude/state/wave156-progress.jsonl tail."
  4. RECALL/INVESTIGATE/VERIFY per CR-4 gates BEFORE plan-this-iter
  5. Plan ONE bounded sub-task per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE
  6. T1 codex consult fires mechanically OR Path P fallback if hook unavailable
  7. Read T1 verdict EOF FIRST → APPROVE/NEEDS-REVISION/REJECT
  8. Pattern A apply on NEEDS-REVISION conf≥0.85 (single atomic edit)
  9. Mia pre-apply probe on EVERY prescription (n=412 ladder)
  10. Adversarial review LENS 2 (gpt5-reviewer subagent BRIDGE-MODE) on non-trivial
  11. Subagent dispatch (Wave 24-D 3-5 agent team) if scope justifies
  12. Edit/Write per atomic single-shell `git add -- <path> && git commit -o -F <msg> -- <path>`
  13. T2 pre-commit hook fires mechanically (180s sync STRICT)
  14. T3 PostToolUse hook fires async (30s spawn + 240s codex)
  15. verification-before-completion CLAIM-TIME GATE:
      FRESH probe (not memory recall) — does predicate axiom #N now resolve true?
      Run verification command embedded in predicate text
  16. Update Progress Tracker (Section 9)
  17. Provenance log (Section 11)
  18. AUTOCOMPACT backstop check: env CLAUDE_AUTOCOMPACT_PCT_OVERRIDE controls when CC
      auto-fires (last resort; no steering hint; model at lowest IQ per Thariq).
      Recommended for autonomous /goal long-arc: 60 (600k for 1M context).
      Standard interactive: 75. Tight-quality work: 50.
      AUTOCOMPACT is BACKSTOP only — manual /compact (step 3) is the primary mechanism.
  19. Loop if predicate not satisfied; exit if YES

═══════════════════════════════════════════════════════════════════════════════
SECTION 9 — PROGRESS TRACKING (per iteration; user-visible metrics)
═══════════════════════════════════════════════════════════════════════════════

After every iteration:
  % AUDITED:           ships completed / 24 × 100
  % SOTA-REVIEWED:     ships with codex T1 + Lens 2 + Lens 3 passed / 24 × 100
  % CARDINAL-RULE-1:   files with TIER-1-DIRECT cite anchors / total files × 100
  % AGENTS-16-FIELD:   agents with full CCBP 16 fields / 11 × 100
  % FILES-UNDER-40K:   (total files - files >40k chars) / total × 100
  % CR-9-CLEAN:        (1 - sibling-bleed sites / 22) × 100
  % T3-RESOLVED:       (96 - open NEEDS-REVISION + REJECT) / 96 × 100
  % CR-7-PHASE-2-READY: (Tier 1a + 1b + 1c + 2 INSTALLED-and-smoke-PASS) / total × 100

Echo at each iteration:
  echo "=== Wave 156 Progress (iteration N) ==="
  echo "Ships: $completed/24 ($percent%)"
  echo "Audit conformance: $AUD% sota-reviewed | $CR1% cite-trail | $AG% agents-CCBP"
  echo "File-size: $FS% under-40k | CR-9-bleed: $CR9% clean | T3: $T3% resolved"
  echo "Phase 2 readiness: $P2%"
  echo "Open T3 findings: $OPEN_T3"
  echo "Health check status: $HEALTH (all layers PASS=10, partial=N)"

═══════════════════════════════════════════════════════════════════════════════
SECTION 10 — AUTO-RECOVERY ON FAILURE MODES
═══════════════════════════════════════════════════════════════════════════════

FM-02 (b)+(c) destructive-race (parallel-session staging):
  Recovery: atomic single-shell `git add -- <path> && git commit -o -F <msg> -- <path>`
  Per git-cli-grammar-discipline.md options-before-`--`

FM-09 codex-rescue blind-spot:
  Recovery: 2-stage validation — codex-rescue ADOPT verdict → 2nd-stage sota-researcher
  Probe DAG 1-7 + Mia pre-apply (n=51 firm 100% same-arc base rate)

FM-16 phantom-cite-to-disabled-MCP:
  Recovery: rg "mcp__<server>__" cross-check .claude/settings.json:disabledMcpjsonServers
  INVERSE-FM-16 (n=1 firm Wave 156): strip stale [CURRENTLY DISABLED] qualifier

FM-17 subagent fleet-depletion (6 sub-classes a-f):
  Recovery per fm17-subagent-fleet-depletion.md:
    a wrapper-truncation → SendMessage re-emission to agentId
    b pool-depletion 429 → §CADP fleet probe + re-dispatch on cache <50%
    c codex bg-job wedge → foreground+tee from main session
    d BRIDGE-MODE stall → per-call codex 90/120/180s budget enforcement
    e autocompact-thrashing → brief tightening + ctx_execute_file substitution
    f 1M-context billing blocker → Path P orchestrator-direct OR Path D 1M kill-switch

FM-17.g haiku-4-5 provider 502 (NEW Wave 156 n=1 firm):
  Recovery: Agent dispatches with `model: 'sonnet'` override
  Persistence: until Anthropic restores haiku-4-5; track via mcp__github__ issue probe

FM-19 readonly-guard sidestep:
  Recovery: No-Write subagents return ARTIFACT-INLINE in final message body
  Orchestrator persists to tmp/wave<N>-<agent>-<topic>-<date>.md post-completion

FM-20 path-drift cascade (n=29 firm):
  Recovery: Mia-probe at every cite-propagation boundary
  Decompose agent return into independent sub-claims; probe each independently

FM-21 queue-time-prompt-freeze:
  Recovery: STATE PROBE clause-level smoke at every wake
  CronDelete + CronCreate refresh on doctrine-evolution-ship

T1 NEEDS-REVISION conf ≥ 0.85:
  Pattern A apply — single atomic commit with ALL prescribed_edits

T1 NEEDS-REVISION conf < 0.85 OR REJECT:
  Outcome A ACCEPT-WITH-DOC (if MED+ severity + concrete-verification)
  Outcome B REVERT-AND-REMOVE (if HIGH severity unresolved)
  Outcome C MANUAL-OVERRIDE (operator-explicit; tracked metric)

T1 Pattern B HONEST-NON-FINDING (timeout 240s+):
  Trace-mine for embedded evidence
  Document HNF in commit body
  T3 post-commit verification compensates

§CADP rule 5 fleet probe FAILED (>3 accounts <50%):
  HALT new dispatches
  Wait for cache reset (~30-60min)
  OR activate FM-17.g model: sonnet override

═══════════════════════════════════════════════════════════════════════════════
SECTION 11 — PROVENANCE TRAIL
═══════════════════════════════════════════════════════════════════════════════

After every ship:
  docs/install-provenance.md append: ship-N + commit-SHA + cite-trail +
    T1/T2/T3 verdict file paths + Pattern A apply count + Outcome A/B/C disposition +
    LOC delta + verification command output + adversarial-review LENS results
  .claude/projects/Z--claude-sota-installed/memory/MEMORY.md
    one-line index entry under ~150 chars (cumulative trail per cardinal-rule-11
    META-process SOTA discipline + Karpathy §5 Wiki Compounding Surface)
  .claude/state/wave156-progress.jsonl per audit-action-loop.md Wire/Surface/Close/Re-fire
    {ship, commit_sha, t1_verdict, t2_verdict, t3_verdict, lens_2_result,
     lens_3_mia_result, percentages, health_layers_pass, timestamp}

═══════════════════════════════════════════════════════════════════════════════
SECTION 12 — ANTI-PATTERNS (cardinal-rule violations — fail-closed)
═══════════════════════════════════════════════════════════════════════════════

NEVER:
- Skip codex T1 because edit "looks mechanical" — refuted unless mechanical-mirror
  narrow predicates ALL hold (single-file ≤24 LOC + settled-source + no-new-authority)
- Bundle multiple design surfaces in one T1 — split per cycle-300
- Trust agent prescription verbatim — Mia pre-apply n=412 OVER catches
- --no-verify OR skip cross-model gates — refuted by canonical.md Must-Never #3
- Copy from Z:/repos/deps/ for install (use upstream channel per CR-6)
- Cite sibling claude-sota as TIER-1 (TIER-3-LOCAL-COMPOSITION; not original SOTA)
- Rewrite historical commit bodies — port-note-discipline.md §6 forward-only
- 4+ concurrent agents without §CADP rule 5 fleet probe
- /goal with /loop cron combined — FM-21 queue-time freeze compounds
- Set CLAUDE_CODE_SUBAGENT_MODEL — env-funnels; defeats cross-model gate
- Claim done without fresh probe — Iron Law verification-before-completion violation
- Activate disabled hooks before validating schema (fm17d_stall_detector schema-rot 100%)
- File-split without cite-anchor preservation (each child MUST have parent SHA header)
- Hard-delete before archiving — Ship 21 archives FIRST to docs/_archives/
- Trust codex-rescue ADOPT-NOW without 2-stage validation (FM-09 n=51 100% base rate)
- Coast past 300k tokens on 1M context — context rot threshold; /compact at 25-30%

═══════════════════════════════════════════════════════════════════════════════
SECTION 13 — REPORT MANDATE (at /goal completion)
═══════════════════════════════════════════════════════════════════════════════

Surface to operator at terminal predicate satisfaction:
  - All 24 ship commit SHAs (Ship 0+1 done: 69e5fd4 + a4bb3f1; Ships 2-23 ?)
  - All T1 + T2 + T3 + T4 + T5 + T6 verdict file paths
  - All LENS 2 (gpt5-reviewer) + LENS 3 (Mia) + LENS 4 (FM-09 2-stage) + LENS 5
    (gsd-goal-verifier) results
  - Total LOC delta + file count
  - Pattern A apply rounds + Outcome A/B/C counts
  - Re-measured 8 conformance percentages (per Section 9 progress tracker)
  - Health check matrix all-layers status (Section 6)
  - docs/install-provenance.md final append
  - MEMORY.md index entry under 150 chars
  - FM-17.g status (resolved OR ongoing)
  - Active recovery counts (per FM sub-class)
  - Next-wave recommendations

═══════════════════════════════════════════════════════════════════════════════
SECTION 14 — CITE CLASS FOR THIS PROMPT
═══════════════════════════════════════════════════════════════════════════════

constituents=[
  TIER-1-DIRECT @ Z:/repos/deps/claude-code-best-practice-shan/best-practice/
    {claude-subagents.md:17-36, claude-settings.md:877-921, claude-memory.md:113,
     claude-skills.md, claude-hooks.md, claude-mcp.md, claude-cli-startup-flags.md}
    @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd,
  TIER-1-DIRECT @ Z:/repos/deps/andrej-karpathy-skills/CLAUDE.md:7-43
    @ HEAD 2c606141936f1eeef17fa3043a72095b4765b9c2,
  TIER-1-DIRECT @ Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/
    {types.py:246-262,309-316, client.py:312-564}
    @ HEAD b512f256450dba8f0dd1399e485563b7deb9c534,
  TIER-1-DIRECT @ https://code.claude.com/docs/en/{sub-agents,env-vars,settings,
    hooks,model-config,permission-modes,agent-view,scheduled-tasks,commands,
    skills,mcp,authentication},
  TIER-1-NAMED-AUTHOR-QUOTE @ obra/superpowers
    skills/{verification-before-completion,requesting-code-review,subagent-driven-development,
            test-driven-development,systematic-debugging,brainstorming-rejected-for-fit}/SKILL.md
    @ HEAD e7a2d16476bf042e9add4699c9d018a90f86e4a6,
  TIER-1-NAMED-AUTHOR-QUOTE @ addyosmani/agent-skills
    skills/{source-driven-development,deprecation-and-migration,shipping-and-launch,
            using-agent-skills,planning-and-task-breakdown,context-engineering}/SKILL.md
    @742dca5,
  TIER-1-NAMED-AUTHOR-QUOTE @ affaan-m/everything-claude-code
    skills/{autonomous-loops,agent-harness-construction,canary-watch,
            content-hash-cache-pattern,mcp-server-patterns,prompt-optimizer,
            safety-guard,agentic-engineering,continuous-learning}/SKILL.md
    @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a,
  TIER-1-DIRECT @ openai/codex codex-rs/git-utils/src/info.rs:618-654
    @ HEAD 993e3f407ea8213f7d32cb9367ae7616b7e15b4a,
  TIER-1-DIRECT @ anthropics/cwc-long-running-agents
    @ HEAD ffd563d668a97a38d4aa092bf0d5b1507c046629,
  TIER-1-DIRECT @ gsd-build/get-shit-done agents/gsd-verifier.md
    @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5,
  TIER-3-LOCAL-COMPOSITION @ claude-sota cardinal-rules CR-0 through CR-12 +
    30 sister-rule cite-imports (citation-discipline.md + cross-model-consensus.md +
    codification-threshold.md + codex-t1-fix-forward-pattern.md +
    codex-t1-pattern-b-forward-discipline.md +
    advanced-agent-team-standing-directive.md + agent-harness-fit-verification.md +
    audit-action-loop.md + closed-loop-recursive-narrowing.md +
    convergence-gate.md + coordination.md + deprecation-discipline.md +
    evidence-policy.md + fm17-subagent-fleet-depletion.md +
    fm19-readonly-guard-sidestep.md + fm20-path-drift-cascade.md +
    fm21-queue-time-prompt-freeze.md + git-cli-grammar-discipline.md +
    karpathy-adapted.md + kiss-dry-yagni.md + launch-discipline.md +
    layered-gates-architecture.md + mcp-disconnect-recovery.md +
    mia-pre-apply.md + multi-perspective-subagents.md +
    multi-source-discovery-breadth-discipline.md + named-failure-modes.md +
    parallel-agent-wave.md + parallel-session-worktree-isolation.md +
    parallel-sessions.md + port-note-discipline.md + research-protocol.md +
    sota-pin-discipline.md + synthesis-layer-verify.md + team-orchestration.md +
    Wave 156 plan cryptic-shimmying-dewdrop.md +
    docs/fm17f-deep-dive-2026-05-09.md +
    docs/sota-feature-activation.md)
];
effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8 MIN_PRECEDENCE

═══════════════════════════════════════════════════════════════════════════════
END DEFINITIVE SOTA /goal PREDICATE
═══════════════════════════════════════════════════════════════════════════════
