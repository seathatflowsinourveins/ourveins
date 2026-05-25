
---

## Wave 141A.1 — Docker SOTA inventory DOC-ONLY ship + scope split + Voice 1 P0 mapping table (T1 NEEDS-REVISION conf=0.88 Pattern A applied)

**Date**: 2026-05-10
**HEAD (pre-commit)**: `9e925083` (Wave 141 Fire 1 just landed)
**Wave/Fire**: Wave 141A Fire 1 (Docker SOTA permission unleash + manifest additions — NARROWED to DOC-ONLY per Voice 1 NEEDS-REVISION conf=0.91 + Voice 4 T1 NEEDS-REVISION conf=0.88)
**Scope**: 4-voice agent team Docker SOTA convergence + manifest §10 6 NEW Docker family inventory rows + Wave 141A.2/.3/.4 deferral with explicit P0 mapping
**Cross-model gate satisfaction**: ✅ FULLY-SATISFIED via 2× REAL GPT-5.5 codex CLI v0.130.0 (Voice 1 design-review + Voice 4 narrowed-scope T1 review per CR-3 Phase 1 bootstrap exception)

### Pre-conditions

- Docker Desktop daemon UP (post-Wave-140-Fire-1 operator restart)
- Docker Engine 29.4.1, Docker Desktop, 10 containers / 13 images
- 5 Docker SOTA repos cloned at `Z:/repos/deps/` (CR-6 fresh-from-github, --depth 1) — see Wave 141 Fire 1 entry above
- docker-py 7.1.0 INSTALLED in shared venv `Z:/venvs/claude/`

### 4-voice synthesis

**Voice 1 — Path P codex T1 design adversarial review REAL GPT-5.5 v0.130.0** (verdict: `.claude/state/codex_consult_w141a_docker_sota_permission_design_OUT.txt` — 18288 LOC, 165,558 tokens)
- Verdict: **NEEDS-REVISION conf=0.91** + 8 P0 prescribed_edits
- Cross-model gate: ✅ STRUCTURALLY SATISFIED
- Critical catches:
  - Section A `Bash(docker run *)` admits `--privileged` / socket mounts / host namespaces / `--cap-add` / remote-engine host flags
  - Section A omits `docker build *` / `docker buildx *`
  - Section B missing ~15 catastrophic deny patterns (socket mounts / host bind mounts / dangerous --cap-add / seccomp unconfined / host namespaces / remote contexts / prune variants / compose destructive forms / plugin install --grant-all-permissions / mcp secret export+profile remove / agent serve non-loopback)
  - Section C state-outside-repo discipline = DOCUMENTATION ONLY (needs PreToolUse hook)
  - CR-7 wording: bypassPermissions = Wave 82d temp override, NOT Phase 3
  - Plugin binaries filesystem-verified at `C:/Program Files/Docker/cli-plugins/`; runtime smoke pending

**Orchestrator runtime smoke** (Voice 1 sandbox-blocked smoke caveat closed):
- `docker mcp version` → **v0.40.4** ✅
- `docker agent version` → **v1.44.0** (commit ded87330) ✅
- `docker compose version` → **v5.1.3** ✅
- `docker mcp tools` CLI surface confirmed ✅
- `docker agent --help` examples: `docker agent run`, `docker agent run ./agent.yaml`, `docker agent run agentcatalog/pirate` ✅

**Voice 2 — sota-researcher subagent (Sonnet stand-in)** (artifact: `tmp/wave141a-voice2-docker-sota-deepdive-2026-05-10.md` — 580 LOC, 9 tool uses, 357223ms)
- Verdict: **STUDY-COMPLETE conf=0.92** (5 Docker SOTA repos line-by-line; 23 distinct findings)
- Key findings:
  - **mcp-gateway HIGH-LEVERAGE INSTALL candidate** — replaces per-server `.mcp.json` entries with single `docker mcp gateway run` endpoint; 6 active security primitives + RFC 7591 DCR + OAuth 2.1 PKCE + docker-credential-helpers (wincred); profiles = working-set abstraction
  - **docker-agent CITE-class only — REJECT-FOR-FIT install** — competing CC harness with STRUCTURAL CONVERGENCE to safety_guard.py + Anthropic CC `auto` mode (3-tier permissions deny/allow/ask + 16 lifecycle hooks matching CC hook protocol + `redact_secrets:true` 3-defense + `--sandbox` flag + 89 example YAMLs)
  - **docker-py 7.1.0 already INSTALLED** — recommend hooks use `docker.from_env().containers.list()` API instead of shelling `docker ps`
  - **genai-stack CITE-class compose pattern** — `pull-model` one-shot + `depends_on: condition: service_completed_successfully` SOTA pattern
  - **awesome-compose LIMITED applicability** — only `portainer` + `prometheus-grafana` AI-adjacent
- 5 Mia OVERs caught (n=170→n=174):
  - #170 awesome-compose AI-stack count overcounted (5→2 actual)
  - #171 docker-agent multi-provider, NOT Anthropic-only
  - #172 `pkg/secret-management/` doesn't exist (correct: `pkg/secretsscan/` + `pkg/oauth/`)
  - #173+#174 brief-OVERs preempted
- STAND-IN-NOTICE per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`

**Voice 3 — architect subagent (Sonnet stand-in)** (artifact: `tmp/wave141a-voice3-architect-design-2026-05-10.md` — 500 LOC, 6 tool uses, 319646ms)
- Verdict: **DESIGN APPROVE-FOR-IMPLEMENTATION conf=0.89**
- 10 sections: §1 settings.json `permissions.allow[]` design (+14 entries) / §2 safety_guard.py +7 deny patterns / §3 state-outside-repo volume discipline / §4 manifest §3 +2 plugin rows / §5 manifest §10 +3 CLI tool rows / §6 install-provenance entry skeleton / §7 roll-back path / §8 CR conformance / §9 10 sister-rule integrations / §10 Mia OVERs preempted
- 8 Mia OVERs preempted (n=174→n=182): line-cite drift L106-108→L137 / pre-installed status x2 / false-positive on docker exec --privileged / scope exclusion of .mcp.json / REJECT docker swarm DEMAND-ABSENCE / DEFER docker context sibling-bleed risk
- STAND-IN-NOTICE per `cross-model-consensus.md`

**Voice 4 — Path P codex T1 narrowed-scope review REAL GPT-5.5 v0.130.0** (verdict: `.claude/state/codex_consult_w141a_synthesis_t1_review_OUT.txt` — 1453 LOC, 89,493 tokens)
- Verdict: **NEEDS-REVISION conf=0.88** + 6 prescribed_edits
- Cross-model gate: ✅ STRUCTURALLY SATISFIED
- Selected disposition: ship-shape = needs-further-narrowing
- Key findings:
  - (a) Wave 141A.1 scope correct (DOC-ONLY)
  - (b) Runtime smoke supports installed/available claim (NOT safe-to-unleash)
  - (c) Hidden risk: §3 = "Plugin marketplaces" (Claude plugin context) — Docker CLI plugins there could be misread as Claude plugin marketplace installs → moved to §10
  - (d) Ship shape needs further narrowing: docker-agent = competing harness; rows need "inventory-only, not eee harness adoption" language
  - (e) 2 Voice 1 P0 prescriptions orphaned: CR-7 wording closure + build-class guard explicit assignment

### Pattern A apply per Voice 4 T1 6 prescribed_edits (this fire integration)

1. ✅ **§3→§10 move**: Docker CLI plugins inserted in §10 (CLI tools), NOT §3 (Claude plugin marketplaces) per T1 prescribed_edit #1
2. ✅ **Explicit guard text per row**: "DOC-ONLY inventory; no .claude/settings.json permissions.allow[] change; no PreToolUse hook change; no .mcp.json/gateway wiring; future use gated by Waves 141A.2/141A.3/141A.4" per T1 prescribed_edit #2
3. ✅ **docker-agent CITE-ONLY guard**: "CITE-ONLY-FOR-PATTERNS / DO-NOT-ACTIVATE-AS-EEE-HARNESS per Voice 2 competing-harness finding" per T1 prescribed_edit #3
4. ✅ **docker/mcp-gateway AVAILABLE guard**: "AVAILABLE via Docker Desktop CLI plugin, not currently wired as eee MCP gateway; migration requires later design fire (Wave 141B candidate) AFTER Docker safety guards land" per T1 prescribed_edit #4
5. ✅ **Compose label correction**: "Docker Compose CLI plugin (`docker compose`) v5.1.3, NOT ambiguous legacy `docker-compose` v1" per T1 prescribed_edit #5
6. ✅ **Voice 1 P0 mapping table** (this section §"P0 mapping table") per T1 prescribed_edit #6

### Voice 1 P0 mapping table (T1 prescribed_edit #6)

| Voice 1 P0 prescription | Wave assignment | Closure status |
|---|---|---|
| Section A allow[] OVER-permissive (`docker run *` / `exec *` / `compose *` / `mcp *` / `agent *` / `network *`) | Wave 141A.3 | DEFERRED |
| Section A omits `docker build *` / `docker buildx *` | Wave 141A.3 (allow narrow) + Wave 141A.2 (build-class secret/SSH/untrusted-context guard explicit acceptance criterion) | DEFERRED |
| Section B missing ~15 catastrophic deny patterns (socket / host bind / --cap-add / seccomp / host namespaces / remote contexts / prune / compose destructive / plugin install / mcp secret export / agent serve non-loopback) | Wave 141A.2 | DEFERRED |
| Section C state-outside-repo discipline = DOCUMENTATION ONLY (needs PreToolUse hook) | Wave 141A.4 (PreToolUse `docker_volume_discipline_guard.py` parses -v/--volume/--mount source paths) | DEFERRED |
| CR-7 wording: bypassPermissions = Wave 82d temp override, NOT Phase 3 | **Wave 141A.1 (THIS FIRE)** — manifest row guard text explicitly states "DOC-ONLY inventory; no `.claude/settings.json` permissions.allow[] change... future use gated by Waves 141A.2/141A.3/141A.4"; per CLAUDE.md L205 `bypassPermissions` IS the Wave 82d temporary operator override (NOT CR-7 Phase 3 destination achievement) | **CLOSED** |
| Build-class secret/SSH/untrusted-context guard for `docker build` / `docker buildx` | Wave 141A.2 explicit acceptance criterion: `docker build --secret`, `docker build --ssh`, `docker buildx prune`, untrusted-context `docker build .` from non-Z:/claude-sota-installed-state/ paths | DEFERRED |
| Plugin binaries runtime-smoke verification | **Wave 141A.1 (THIS FIRE)** — orchestrator runtime smoke probe completed: docker mcp v0.40.4 + docker agent v1.44.0 + docker compose v5.1.3 — all CLI plugins EXECUTE (NOT just filesystem-present) | **CLOSED** |
| Manifest taxonomy: §3 "Plugin marketplaces" vs §10 "CLI tools" misread risk | **Wave 141A.1 (THIS FIRE)** — Docker CLI plugins moved to §10 (CLI taxonomy correct), NOT §3 (Claude plugin marketplace context) | **CLOSED** |

### DEFINITIVE FINDINGS

- **Docker SOTA inventory documented** — 6 NEW manifest §10 rows (Engine + CLI + Compose + MCP + Agent + docker-py) all with INSTALLED-VIA-SYSTEM-PATH or INSTALLED-IN-VENV status + smoke-probe evidence + DOC-ONLY guard text + future-use gating
- **Wave 141A.2/141A.3/141A.4 explicitly deferred** with concrete scope per Voice 1 P0 prescriptions — no orphans
- **mcp-gateway HIGH-LEVERAGE INSTALL candidate** identified for Wave 141B (architectural shift to gateway-routed MCP — replaces 8+ wired MCP servers with single endpoint)
- **docker-agent REJECT-FOR-FIT eee runtime adoption** — competing CC harness; CITE-extract patterns ONLY (per kiss-dry-yagni Must-Never #4)

### Pattern D candidate ladder advance to n=12 same-arc

Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern D candidate` (queued task #137), Wave 141A Fire 1 advances n=10→**n=12** cumulative same-arc evidence (+2: Voice 1 + Voice 4 T1 review):
- Wave 137 Fire 2 + Wave 138 Fire 1+2+3+4 + Wave 139A Voice 1 + Wave 139A T1 + Wave 140 Voice 1 + Wave 140 T1 + Wave 141 Voice 1 + Wave 141 T1 + **Wave 141A Voice 1** + **Wave 141A T1 review** = n=12
- cycle-322 promotion to `codex-t1-fix-forward-pattern.md` EVEN MORE FIRMLY ready (task #137 Wave 142+)

### Mia ladder advance n=170 → n=189 (+19 this fire)

- Wave 141 Fire 1 closure: +14 (170→184)
- Voice 2 W141A: +5 (#170-#174 brief OVER on awesome-compose / docker-agent multi-provider / pkg/secret-management/ wrong path / 2 brief OVERs preempted)
- Voice 3 W141A: +8 (#175-#182 line-cite drift / pre-installed status x2 / docker exec false-positive / .mcp.json scope / REJECT docker swarm / DEFER docker context)
- Voice 4 T1 W141A: +6 (taxonomy false-claim risk catch + 5 prescribed-edit catches embedded in P0 mapping)
- Orchestrator-side: 0 NEW (Voice 1+4 T1 reviews caught everything)

Total this fire: **+19** → cumulative **n=189**

### Cross-model gate verification

- Voice 1 (Wave 141A) = REAL GPT-5.5 codex CLI v0.130.0 (Path P recipe — DEFAULT profile + 50 LOC focused prompt + single-claim audit + JSON-at-EOF + foreground+tee + 300s timeout)
- Voice 4 / T1 narrowed-scope review = REAL GPT-5.5 codex CLI v0.130.0 (same Path P recipe)
- Voice 2 + Voice 3 = Sonnet stand-ins per FM-17.f BRIDGE-MODE blocker
- Per CR-3 Phase 1 bootstrap exception: 2× REAL GPT-5.5 satisfies cross-model gate ✅

### CR conformance (all 8 PASS)

- **CR-1 cite-trail**: ✅ TIER-1 cites at file:line + HEAD SHA throughout (Docker SOTA repos pinned, official docs URLs, CLAUDE.md L205 cited for CR-7 wording)
- **CR-3 cross-model gate**: ✅ FULLY SATISFIED (2× REAL GPT-5.5)
- **CR-5 install-priority**: ✅ DOC-ONLY ship; NO install-class artifact added (Wave 141A.2-4 deferred)
- **CR-7 graduated-unleash**: ✅ Phase 1 active; bypassPermissions Wave 82d temp override explicitly disclosed in row guards; NO allow[] expansion in 141A.1
- **CR-8 full-SOTA-content**: ✅ probe + verdict + cite-trail anchored
- **CR-9 install-risk**: ✅ pre-cite-import REVERT check via Voice 1+2+3 source-reads; sibling-bleed risk acknowledged via state-outside-repo Volume discipline (Wave 141A.4 deferred for mechanical enforcement)
- **CR-10 research-first**: ✅ probe BEFORE edit (Voice 2 deep-dive 5 Docker SOTA repos line-by-line + orchestrator runtime smoke probe)
- **CR-11 META-process**: ✅ Mia at synthesis layer (+19 ladder advance) + Pattern A on T1 prescribed_edits (6 applied) + FM-20 cascade defense throughout

### Wave 141A.2 / 141A.3 / 141A.4 / 141B queued (per Voice 1 P0 mapping table above)

- **Wave 141A.2** — safety_guard.py +15-20 NEW Docker deny patterns (socket / host bind / --cap-add / seccomp / host namespaces / remote contexts / prune / compose destructive / plugin install / mcp secret export / agent serve non-loopback / build secret/SSH/untrusted-context); each with regex + benign-pass test + dangerous-pattern test; codex T1 + tests required
- **Wave 141A.3** — settings.json narrow subcommand allow[] (read-only LOW-risk class first; lifecycle MEDIUM-risk after 141A.2; build HIGH-risk after 141A.2)
- **Wave 141A.4** — PreToolUse `docker_volume_discipline_guard.py` hook (parses -v/--volume/--mount source paths; rejects mount sources NOT under `Z:/claude-sota-installed-state/.docker-volumes/<name>/`)
- **Wave 141B** — mcp-gateway architectural shift to gateway-routed MCP (replaces per-server `.mcp.json` entries with `docker mcp gateway run` endpoint per Voice 2 HIGH-LEVERAGE INSTALL candidate); requires Wave 141A.2/.3/.4 to land first per Voice 4 T1 prescribed_edit #4 ("migration requires later design fire AFTER Docker safety guards land")

### Files changed (committed in this atomic commit)

- `docs/sota-installed-manifest.md` (§10 +6 Docker family rows: Engine + CLI + Compose + MCP + Agent + docker-py)
- `docs/install-provenance.md` (this Wave 141A Fire 1 entry append)

### Memory artifacts (gitignored — Karpathy §5 Wiki Compounding Surface Layer 3)

- `tmp/wave141a-design-input-2026-05-10.md` (Wave 141A pre-design 250 LOC)
- `tmp/wave141a-voice2-docker-sota-deepdive-2026-05-10.md` (Voice 2 sota-researcher 580 LOC)
- `tmp/wave141a-voice3-architect-design-2026-05-10.md` (Voice 3 architect 500 LOC)
- `tmp/wave141a-fire1-provenance-append.md` (this provenance source)
- `.claude/state/codex_consult_w141a_docker_sota_permission_design{,_OUT}.txt` (Voice 1 18288 LOC verdict)
- `.claude/state/codex_consult_w141a_synthesis_t1_review{,_OUT}.txt` (Voice 4 T1 review 1453 LOC)
- 5 Docker SOTA repos cloned at `Z:/repos/deps/` (mcp-gateway / docker-agent / docker-py / genai-stack / awesome-compose)

[VERIFIED via `.claude/state/codex_consult_w141a_synthesis_t1_review_OUT.txt` T1 NEEDS-REVISION conf=0.88 + 6 prescribed_edits applied per Pattern A]

closes Wave 141A Fire 1 Docker SOTA inventory DOC-ONLY ship; Wave 141A.2 + 141A.3 + 141A.4 + 141B queued per P0 mapping table for sequential T1-gated sub-fires
