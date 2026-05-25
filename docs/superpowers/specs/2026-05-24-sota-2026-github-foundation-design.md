# W389 — SOTA-2026-05 GitHub-Foundation Architecture (Comprehensive Design — v3, codex-converged)

> /superpowers:brainstorming session 4902ef6b. 5-stream parallel SOTA-2026-05 convergence + codex GPT-5.5 3-round convergence: **r1 REVISE@0.88** (8 P1 findings → v2) → **r2 REVISE@0.87** (1 P1 + 1 P2 → v3) → **r3 APPROVE@0.92** (closure-ledger at §10b). Operator: "auto proceed with sota convergence, gpt5.5"; topology already decided = **Private + Public ORG**. Builds on but EXTENDS the W385 landscape, W388 minimal-ship design (codex r2 APPROVE@0.91, on main), W387 governance (LIVE: ruleset + Codex-Verdict binding gate + clean autonomous merge proven), W367 18-layer canonical, and 4 already-codex-APPROVED but not-yet-on-main designs (W381 / W374 / W375 / W383).

## §1 Strategic spine (decided)
**Private monorepo (working) + Public ORG (release surface, multi-repo)**. Private = full history + leaked-cred history + WIP + wave-archive. Public = orphan-export of curated layers, one repo per layer:
```
PRIVATE                          PUBLIC ORG sota-2026/
seathatflowsinourveins/          ├─ /core ............. minimal core orphan (W388 91-file allowlist)
  claude-sota-installed          ├─ /governance ....... rulesets + workflows + Codex-Verdict gate
  └─ working monorepo            ├─ /skills-anchor .... 6 anchor skills (defer rest to batch 2)
     ├─ all dev history          ├─ /research-arch .... sca-v22 + GPT-Researcher MCP wiring
     ├─ wave records             ├─ /gate-tools ....... Lefthook + zizmor + actionlint + pre-commit
     ├─ codeowners-per-layer     ├─ /security ......... L19 supply-chain + L20 AI-safety toolchain
     └─ orchestrator pins        └─ /harness .......... L22 eval+bench (Inspect+DeepEval+Promptfoo)
       ↓ orphan-export (codex r1 #5 fix: NARROWER guarantee — "zero private history BY CONSTRUCTION
         (no submodules, no LFS, no generated archives carried over); current-tree cleanliness is
         GATED, not guaranteed, by scanners + manual review + push-protection")
       + free Merge Queue (public-ORG only — not public-personal)
       + free GHAS on public (CodeQL+secret-scan+push-protection+Copilot Autofix; same on org & personal)
       + org-wide rulesets + CODEOWNERS + npm/pypi/sigstore-keyless publishable packages
       + Immutable Releases on wave tags
```

## §2 The 23-layer canonical taxonomy (W367 18 + L0 control-plane + L19-L22 new)
codex r1 #2 + #3 folded: layer IDs are now W367-canonical throughout (§3 uses these same IDs); the W381 L0-L6 control stack is elevated to a first-class layer (was understated as "pending integration").

| # | Layer | Source | Status |
|---|---|---|---|
| **L0** | **Autonomous Control Plane** (permission-mode · NTFS/WSL2 sandbox · digest broker · content-provenance gate · OR-of-ceilings budget · egress controls · operator break-glass) | **NEW (W381 elevation)** | APPROVED design, Phase-1 operator-gated |
| L1 | Orchestration & parallel (incl. cross-model consensus) | W367 | T1 INSTALLED — extend per §3 |
| L2 | Memory & knowledge | W367 (+ L2a temporal-KG sub-layer) | T1 INSTALLED + 1 gap |
| L3 | Git foundation & parallel-session safety | W367 (LOWEST-rated, 2.0/T3) | Carry-forward |
| L4 | CI/CD (incl. security-middleware tooling: gitleaks/opengrep/poutine/TruffleHog/OSV-v2/knip) | W367 (+ supply-chain split → L19) | 2.5/T2-low PARTIAL |
| L5 | Hooks & guards (Lefthook · zizmor · actionlint · harden-runner) | W367 | T1 |
| L6 | Behavioral discipline (skills/plugins/rules) | W367 (+ L6a skills-marketplace sub-layer) | 3.5/T2-high |
| L7 | Research architecture (sca-v22 + GPT-Researcher + AdaptOrch) | W367 (**operator-PRIORITY**) | 4.5/T1-edge |
| L8 | MCP server ecosystem | W367 (+ L8a MCP-gateway sub-layer) | mature T1 |
| L9 | Eval & quality (legacy) | W367 (split → L22) | gap |
| L10 | Prompt optimization | W367 | T2 PATTERN-STUDY |
| L11 | Observability | W367 | partial-LIVE |
| L12 | Multi-agent frameworks | W367 | PATTERN-ONLY |
| L13 | Agent SDKs | W367 | first-party |
| L14 | Skill/plugin authoring | W367 | improving |
| L15 | Sandboxing & code execution (Windows R5-corollary HIGHEST gap) | W367 | SHIP-BLOCKER |
| L16 | Vector/retrieval | W367 | intentionally absent |
| L17 | Document/knowledge ingestion | W367 | partial |
| L18 | Code intelligence | W367 | redundant |
| **L19** | **Supply-Chain / SBOM / SLSA** | **NEW (Stream D — orthogonal threat model)** | Phase-0a stand-up |
| **L20** | **AI Safety / Red-Team** | **NEW (Stream D — W385 had ZERO coverage; OWASP LLM Top 10 2025 #1)** | Phase-0a stand-up (P0) |
| **L21** | **Copilot / Auto-Agent-Workforce** | **NEW (Stream E — operator explicitly asked)** | Phase-0b operator-gated wiring |
| **L22** | **Eval + Benchmark** | **NEW (Stream E — split from L9; 3 distinct concerns)** | Phase-0a CI gate wiring |
| L_router | Model Router (LiteLLM/RouteLLM) | Cross-cutting (Stream B; pre-L1, complexity-aware) | optional |
| L_a2a | Inter-Agent Protocol (A2A, horizontal complement to MCP's vertical) | Cross-cutting (Stream B; Linux Foundation) | adopt for L1+L21 peer registration |
| L_perf | Per-wave performance-feedback (closes L7→L1 loop) | Cross-cutting (Stream B) | post-Phase-0a |

## §3 Per-layer 2026-05 SOTA stack (using W367 canonical IDs; changes only)
- **L0 Autonomous Control Plane** (W381 elevation, codex r1#3): W381 L0-L6 stack — PREVENT (deny[]+SAFETY shim) → BOUND (NTFS ACE-deny on `C:\Windows`, `C:\Program Files`, `Z:\claude-sota`, `Z:\claude`) → DETECT (action-rail+OTEL→Langfuse) → VERIFY/durability (checkpoint+STUCK+OR-of-ceilings) → VERIFY/assurance (eval-in-loop+codex-jury) → RECOVER (git-as-undo+VSS) → ATTEST (Ed25519-signed DSSE in-toto). On Windows the OS sandbox is structurally inert (per Anthropic sandbox docs framing macOS Seatbelt + Linux/WSL2 bubblewrap); W381 asymmetric NTFS+digest-broker is the Windows-mitigation path. **Phase-1 operator-gated.**
- **L1 Orchestration & parallel** (incl. consensus): KEEP codex GPT-5.5 binding gate + ADD **Pyramid MoA router** (skip codex on small-ensemble high-confidence, 61% cost-cut) + **DALC diversity check** (peer arch-distinct from primary, 87% vs 84% acc) + REGISTER future peers via **A2A Agent Cards + MAF 1.0 provider config** (GPT-5.6/Opus 5/Gemini 3 = plug-in not re-wire). **AdaptOrch DAG pre-analysis** in `tools/preagent-parallel-guard.mjs` (62% optimal cases are HYBRID; preserves ≥0.7 ratio target; makes hybrid compliant).
- **L2 Memory (operator PRIORITY, codex r1#8 licensing fix)**: KEEP **basic-memory T6** (AGPL-3.0 — viral on modification/network-serving; **no-modification policy + distribution review required**) + cognee T3 + ADD **Mem0 OpenMemory MCP** as T7 (`npx -y @mem0ai/openmemory-mcp`; **Apache-2.0 OSS — not AGPL; commercial-clean**; LoCoMo 92.5 / LongMemEval 94.4 at ~7K tokens/q). **ADD MEMORY ARBITRATION POLICY** (codex r1#8): source-of-truth class per memory tier (basic-memory = structural markdown KG; cognee = graph-RAG; Mem0 = cross-session semantic preference); conflict resolution rule (latest-write wins within a tier; cross-tier handled by source-of-truth class); retention + privacy policy; memory evals to prevent drift across the 3 stores. Monitor Anthropic Memory Stores (Managed Agents only, $0.08/session-hour) + Anthropic Memory Tool (`memory_20250818`, client-side, dev-owned storage).
- **L3 Git** (LOWEST rated, highest-risk for public-org): finish W343 P3 (Windows MoveFileEx atomic-write) + complete W370/W366 substrate carry-forward.
- **L4 CI/CD** (incl. security-middleware tooling): execute **W383 P1 consolidation** (22 workflows → coherent matrix, 4 required checks); add `on: merge_group` to ALL required workflows when public-org MQ enabled. **Security middleware (in L4)**: REPLACE Semgrep refs → **opengrep** (LGPL-2.1 Semgrep v1.100.0 fork, 10-org consortium, binary-compatible YAML). ADD **TruffleHog v3** live-credential-verify in CI. ADD **OSV-Scanner v2 call-graph** alongside Trivy. ADD **knip** TS dead-code. ADD **poutine** (poisoned-pipeline detector — catches tj-actions-class).
- **L5 Hooks & guards**: ADD **Lefthook** (Evil Martians, single Go binary, **Windows-native — pre-commit-Python has known MSYS path issues**) as local hook orchestrator alongside existing for safe transition. **zizmor `--fix`** auto-SHA-pin (replaces separate pinact for new files). harden-runner egress monitoring (free community-tier).
- **L6 Behavioral discipline**: **CRITICAL pre-breakage migration** — `grep -r superpowers:code-reviewer .claude/` → migrate to `Task (general-purpose)` + prompt template (v5.1.0 BREAKING removed the named agent). Wire SUBAGENT-STOP gate into subagent dispatch contract.
- **L7 Research architecture (operator PRIORITY)**: **EMBED GPT-Researcher Deep Research MCP** as L7 discovery front-end (MIT; tree-fan-out breadth=3/depth=2; native `.claude/skills/` integration April 2026; MCP server at `pulsemcp.com/servers/assafelovic-gpt-researcher`). **ADD AdaptOrch DAG topology selection** to sca-v22 (22.9% SWE-bench improvement). INTEGRATE **OpenAI Deep Research API OR Gemini DRM (May 21 2026)** as second-tier MCDA synthesizer.
- **L8 MCP**: ADD **Context7 MCP** (community #1 docs-grounding). Audit `openhands-dispatch`. **Track MCP RC 2026-07-28 stateless** for future migration (remote-MCP-behind-LB; eliminates per-session NSSM mgmt). Optional L8a MCP-Gateway (Bifrost / LiteLLM / Docker MCP Gateway / IBM ContextForge) — NOT urgent at 17 servers; mandatory at 30+.
- **L11 Observability (codex r1#6+#7 corrections)**: **Langfuse v4 = CLOUD PREVIEW currently; self-hosted v4 GA PENDING** (v3 already uses ClickHouse). Fix Phase-0b from "upgrade v4" to "**prepare SDK/OTel migration; trial in Langfuse Cloud OR wait for self-host v4 GA**". OTel GenAI `gen_ai.*` semantic conventions are **marked "Development" (opt-in/experimental)** — adopt with **version-pinning + dual-emission policy** (emit current Langfuse-native + experimental `gen_ai.*`; switch primary when stable). Pydantic Logfire is OTel-built dual-route option.
- **L15 Sandboxing**: Windows R5-corollary = HIGHEST-severity unresolved AI-safety gap. **WSL2-bubblewrap path is nearest mitigation; track as P0 with defined resolution date.** W381 asymmetric NTFS+digest-broker is the in-design fix.
- **L19 Supply-Chain (NEW)**: anchore/sbom-action (CycloneDX v1.6 + SPDX on every wave tag, VEX+CBOM). pinact min-release-age cooldown. Scorecard `--score-threshold 5` BREAKING ratchet. GitHub Immutable Releases on wave tags. sigstore/cosign keyless signing. UPGRADE path: `actions/attest-build-provenance` (L2, current) → `slsa-github-generator` (L3, when operator formalizes).
- **L20 AI Safety (NEW)**: **mcp-scan** every `.mcp.json` change (P0; 17 MCP servers = 17 prompt-injection surfaces). **poutine** every workflow change (P0). Garak pre-deploy probe (`encoding`/`dan`/`leakreplay`). HarmBench quarterly model-upgrade regression (Sonnet 4.5→4.6→4.7). promptfoo agentic red-team CI-gated on system-prompt or `.mcp.json` bumps. Optional Lakera Guard for ingestion input-filter. **Lethal Trifecta (private-data + untrusted-content + external-comms)**: runtime has ALL THREE legs → L20 = STAND-UP-IMMEDIATELY.
- **L21 Copilot/Workforce (NEW, codex r1#1 corrections)**: GitHub Copilot Coding Agent + Code Review. **NOTE**: by default Copilot Coding Agent PR workflows REQUIRE HUMAN APPROVAL before Actions run; **optional "skip approval" setting** (released 2026-03-13) is the autonomy-enabling step. **Code Review CANNOT be a required-check** (runs in PR UI only). **Bypass-actor SCOPED**: bypass should target ONLY the rules Copilot cannot satisfy (e.g., signed-commits when key not registered, required-reviews when Copilot is the sole author) — NOT a blanket direct-protected-branch-push permission. + OpenHands `openhands-github-action` (MIT) for complex Docker-sandboxed tasks. + Aider for targeted refactor.
- **L22 Eval+Bench (NEW)**: Inspect AI (UK AISI, safety/OWASP AgentTop10) + DeepEval (pytest-native CI gate, multi-turn agent metrics, component-level tool-call grading) + promptfoo (red-team coding-agent vectors). **CRITICAL**: migrate benchmark target SWE-bench Verified → **SWE-bench Pro** (Verified contaminated; OpenAI stopped reporting) **+ Terminal-Bench 2.0** (CLI-native).

## §4 Auto-decided architectural forks
- **Workforce** = lean multi-vendor: Claude orchestrator + Copilot Coding Agent (worker, autonomous PRs from `@copilot`-assigned issues, **skip-approval setting required**) + codex GPT-5.5 (binding fail-closed cross-model gate) + Copilot Code Review (auto-pass, NOT required-check) + pluggable future-model peers via A2A Agent Cards + MAF 1.0 provider config. Pyramid MoA router + DALC diversity on peer selection.
- **First-ship scope** = `/core` (W388 91-file orphan) + `/governance` (W387 ruleset+workflows) + `/skills-anchor` (6 anchor skills) + `/research-arch` (sca-v22 + GPT-Researcher MCP wiring) + `/gate-tools` (Lefthook+zizmor+actionlint+pre-commit) + `/security` (L19+L20 toolchain). Other layers ship as separate batches via clean-merge.
- **Research+memory PRIORITY (operator-flagged)**: KEEP basic-memory T6 + cognee T3 + ADD Mem0 OpenMemory MCP T7 with **memory-arbitration policy**; EMBED GPT-Researcher MCP as L7 front-end; ADD AdaptOrch DAG to sca-v22; INTEGRATE OpenAI Deep Research API OR Gemini DRM as MCDA second-tier.

## §5 Comprehensive 2026-05 quality gates ("the rules", multi-axis)
- **Pre-commit / Lefthook** (Windows-native): gitleaks + ruff + shellcheck + cr2-2kb-hooks + msys-hooks-form + z-phantom-guard + bare-subagent-grep + npm-audit + cr7-worktree-collision + wave-lock-validate + codex-trailer-gate + **NEW** mcp-scan-on-.mcp.json + zizmor `--fix` auto-pin.
- **CI workflows**: ci · codeql js-ts · codeql python · commitlint · codex-verdict-gate (binding) · release-please · zizmor · actionlint · harden-runner · scorecard `--score-threshold 5` · trivy · dependabot · dependency-review · **NEW** poutine · **NEW** TruffleHog v3 live-verify · **NEW** osv-scanner v2 · **NEW** knip · **NEW** opengrep (Semgrep replacement) · **NEW** anchore/sbom-action (release) · **NEW** pinact min-age · **NEW** Garak (system-prompt-change) · **NEW** promptfoo agentic-red-team · **NEW** Inspect AI + DeepEval pytest gate.
- **Required-check DEADLOCK pattern correction (codex r1#4)**: Required checks MUST always-trigger on `on: pull_request` AND `on: merge_group` (no `paths:`/branch filters at workflow level). File-change filtering MUST happen INSIDE jobs (`if: contains(needs.changes.outputs.workflows, 'true')`). **Skipped jobs MUST report success** (use `if:` with explicit success path) — otherwise GitHub leaves the check pending → indefinite block. **Unique job names** (no duplicates across workflows).
- **Required-status checks (the W387 ruleset gate)**: stays at 5. Phase-0b additions (operator-gated due to setup): codecov diff-coverage (Codecov SaaS) + poutine-on-workflows (autonomous workflow, but requires path-conditional-inside-job pattern above).
- **Copilot integration constraints (codex r2#1 fix — 2-RULESET SPLIT)**: Copilot Code Review CANNOT be a required-check (PR UI only). Copilot Coding Agent needs (a) "skip approval for Actions workflows" enabled (operator Phase-0b) AND (b) the bypass surface is **two separate rulesets** (because GitHub `bypass_actors` apply to an ENTIRE ruleset, not individual rules — putting Copilot on a single-ruleset bypass-list would silently let it skip required-status-checks + merge-queue + linear-history):
  - **Ruleset A — Copilot-bypassable** (contains ONLY the rules Copilot cannot satisfy; e.g. `required_signatures` when its commits are unsigned, `required_pull_request_reviews` when Copilot is sole author): Copilot added as `bypass_actor` with `bypass_mode: pull_request`.
  - **Ruleset B — non-bypassable** (no bypass actors at all): `required_status_checks` (CI + Codex-Verdict binding gate), `merge_queue` (when enabled), `required_linear_history`, `non_fast_forward` (no-force-push), `deletion` (restrict deletions). These ALWAYS apply — Copilot's PRs go through these gates exactly like any other PR.
- **Branch protection**: linear history · no-force-push · PR-flow 0-human-approvals · squash-only · auto-merge enabled · required-signatures re-added when SSH key registered.

## §6 Parallel autonomous merge (Pro-native fallback → public-org MQ)
- **Tier-1 (CURRENT, W387-proven)**: worktree-per-agent + `gh pr merge --squash --auto` + STRICT file-ownership + `--force-with-lease` + orchestrator `mergeStateStatus`→`update-branch` polling. **Augment**: **AdaptOrch DAG pre-analysis** in `tools/preagent-parallel-guard.mjs` (62% optimal cases HYBRID — make hybrid compliant; preserves ≥0.7 ratio target).
- **Tier-2 (Phase 0b operator-gated)**: Mergify free GitHub App (`.mergify.yml`: batch=3, update=rebase, speculative_checks=2). NEVER a required-check dependency.
- **Tier-3 (PUBLIC ORG enables)**: native GitHub Merge Queue. All required workflows MUST declare `on: merge_group` per §5 pattern.
- **Dependent stacks**: `git spr` (squash-compatible commit-ID footer). ghstack INCOMPATIBLE with squash-only.

## §7 Clean-seed pipeline (orphan + scrub + secret + sign + SBOM) — codex r1#5 narrower guarantee
- **GUARANTEED by construction (orphan-export)**: zero private-Git-history pushed — IF the public repo is fresh, no submodules carried over, no LFS objects copied, no generated archives (`.gz`/`.zip`/`.tar`) shipped from private working tree.
- **GATED (not guaranteed) current-tree cleanliness**: gitleaks pre-commit + TruffleHog v3 live-verify in CI + (Phase-2 operator) ggshield + manual eyeball + GitHub push-protection. **NEW per codex r1#5**: pre-publish LFS check (`git lfs ls-files` should be empty); submodule check (`.gitmodules` should be absent OR explicitly cleared); generated-archive scan (`find . -name '*.gz' -o -name '*.zip' -o -name '*.tar*'` results all reviewed).
- Pipeline: W388's `build-seed.mjs` (orphan-copy + `Z:\claude...` → `${VAR}` scrub + 2-tool gate) is the Phase-1 base. Phase-2 operator adds cosign keyless sign + sbom-action (CycloneDX v1.6 + SPDX) + Immutable Releases on wave tags.
- Ongoing sync: scheduled private-repo GH Action: rsync-allowlist → secret-gate → delta-commit-push (NO force, NO rewrite).

## §8 Four already-APPROVED-but-not-yet-on-main designs to integrate
Per Stream A, these are LOAD-BEARING not gaps:
- **W381 Unleashed-Autonomy Architecture** (codex r7 APPROVED, on `goal/W381-unleashed-autonomy-arch @8153ecb`) — L0-L6 control stack (now elevated to L0 in §2) + asymmetric NTFS sandbox + 4-condition content-provenance gate. Phase-1 NOT YET implemented (operator-gated: NTFS ACE provisioning, `digest_broker` standup, `Z:\claude-sota-installed-protected\` carved root).
- **W374 Temporal+OpenHands spine** (Tasks 0-2 on `goal/W374-temporal-openhands @a19dc6b`) — durable-execution end-state.
- **W375 OpenHands docker** (design APPROVED, build-pending).
- **W383 CI consolidation** (locked on `goal/W382-pre-public-security`, NOT on main) — P1 22-workflow→4-required collapse, P2 ruleset migration, P3 least-priv GitHub App, P4 SLSA+SBOM+Scorecard, P5 orphan-branch public showcase.

The W389 design INTEGRATES these as work items in Phase 0a/0b/1 — not gaps to redesign.

## §9 Phased implementation plan
**Phase 0a — AUTONOMOUS NOW** (through W387 clean-merge; each item = focused PR):
1. Add P0 gates: **poutine workflow scan** (10s, catches tj-actions-class) + **mcp-scan on .mcp.json** (30s, 17 surfaces).
2. Migrate `superpowers:code-reviewer` dispatches → `Task (general-purpose)` + template (BREAKING in v5.1.0).
3. Migrate benchmark targets: **SWE-bench Verified → SWE-bench Pro + Terminal-Bench 2.0** (Verified contaminated; affects eval validity).
4. **Lefthook migration** (Windows-native) — add Lefthook alongside pre-commit-Python for safe transition.
5. Embed **GPT-Researcher MCP** in `.mcp.json` (operator-PRIORITY L7).
6. Add **AdaptOrch DAG pre-analysis** to `tools/preagent-parallel-guard.mjs` (preserves ≥0.7 ratio; makes hybrid compliant).
7. Refresh CLAUDE.md stale counts (Langfuse v3.174.1 vs stale v3.160.0; skill ×63 vs ×58; marketplace 21 vs 22).
8. Phase-1 seed allowlist (DONE) + extend `build-seed.mjs` scrub (DONE) — already in W388. **Extend**: add LFS/submodule/generated-archive checks per §7.
9. Land **W374 Temporal spine** + **W375 OpenHands docker** from branches via clean-merge.
10. Land **W383 P1 CI consolidation** (22→4 required checks) from `goal/W382-pre-public-security`. **Apply required-check pattern per §5** (always-trigger on PR+merge_group; file-filter inside jobs; skipped→success; unique job names).
11. Compose Garak + promptfoo agentic-red-team CI workflows (gated on system-prompt or `.mcp.json` change).
12. Add **L2 memory-arbitration policy doc** + memory-drift evals (basic-memory vs cognee vs Mem0).
13. Prepare **OTel `gen_ai.*` dual-emission instrumentation** (version-pinned to experimental; emit alongside existing Langfuse-native).

**Phase 0b — OPERATOR-GATED** (clearly bounded, each ≤30 min operator action):
1. Create **public GitHub ORG** (e.g., `sota-2026`). Unlocks free Merge Queue + per-layer extracted public repos.
2. Register **SSH signing key** on GitHub (re-adds `required_signatures` to ruleset).
3. Configure **Copilot Coding Agent** (codex r2#1 2-ruleset split):
   - Enable "**skip approval for Copilot coding-agent Actions workflows**" (https://github.blog/changelog/2026-03-13-...; required for true autonomy).
   - **Create TWO rulesets** (because GitHub `bypass_actors` bypass an entire ruleset, not individual rules):
     - **Ruleset A** — `main-copilot-bypassable` (contains ONLY rules Copilot can't satisfy: `required_signatures`, `required_pull_request_reviews`-when-sole-author). Add Copilot as `bypass_actor` with `bypass_mode: pull_request`.
     - **Ruleset B** — `main-structural-protection` (no bypass actors): `required_status_checks` (5 required + Codex-Verdict binding gate), `merge_queue`, `required_linear_history`, `non_fast_forward`, `deletion`. These ALWAYS apply to Copilot PRs.
   - Verify post-config: `gh api repos/{owner}/{repo}/rulesets` shows two rulesets active on `~DEFAULT_BRANCH`; Copilot in Ruleset A's `bypass_actors`, Ruleset B's `bypass_actors` is empty.
4. Provision SaaS keys (operator): Codecov token + Mergify free app install + GitGuardian/ggshield key + Lakera Guard trial.
5. Provision **W381 Phase 1**: NTFS ACE-deny on `C:\Windows`, `C:\Program Files`, `Z:\claude-sota`, `Z:\claude`; stand up `digest_broker` in `Z:\claude-sota-installed-protected\`; sign CR-5 exception acceptance; bypassPermissions reframed within asymmetric-sandbox.
6. **Langfuse migration prep** (codex r1#6): trial Langfuse Cloud v4 OR wait for self-host v4 GA (currently Cloud Preview only; v3 already uses ClickHouse — no urgency to break).
7. **Optional: Anthropic Memory Tool** wiring on Managed Agents if Claude Code adopts Managed Agents primitive.

**Phase 1 — AUTONOMOUS clean-seed DRY-RUN** (no push):
1. Run `tools/sota-seed/build-seed.mjs` → produce `/state/W388-seed-dryrun/` (91 files, scrubbed, 2-tool gated).
2. Per §7 new checks: LFS empty + submodules absent + generated archives reviewed.
3. Generate SBOM (CycloneDX + SPDX) via anchore/sbom-action locally.
4. Manual review of the (small) seed.
5. NO push (Phase 2 operator-gated).

**Phase 2 — OPERATOR-GATED PUBLISH**:
1. Create empty public repos in ORG: `/core`, `/governance`, `/skills-anchor`, `/research-arch`, `/gate-tools`, `/security`.
2. Enable security settings FIRST (push-protection, secret-scanning, CodeQL default-setup, Required Signatures, branch ruleset with 5 required checks + `on: merge_group`).
3. Push orphan-seed → GHAS activates on each public repo.
4. Wire Copilot Coding Agent: enable skip-approval setting + apply the **two-ruleset Copilot bypass split** (see §5 + §9 Phase-0b#3) — Copilot is `bypass_actor` of Ruleset A only; Ruleset B (status-checks, Codex-Verdict, merge-queue, linear-history, non-fast-forward, deletion) has zero bypass actors.
5. Test the autonomous loop end-to-end with a trivial issue → @copilot → PR → gate → merge.

**Phase 3 — CONTINUOUS self-evolving layer-adoption**:
1. New SOTA-layer candidates discovered via sca-v22 + GPT-Researcher MCP → scored → tier=ADOPT → queued.
2. Per-layer worktree development (Claude orchestrator + Copilot Coding Agent parallel workers + file-ownership).
3. Flip-centered gate (`flip=(fail→pass)−K·(pass→fail)`, K≥3) on harness/eval_harness.py.
4. **DUAL codex review**: code-aware adversarial (current) + implementation-blind flip-outcome. Both binding.
5. Squash-merge through clean-merge pipeline. Post-merge regression-scan + Drift-Control auto-pause.
6. Periodic re-audit every 5 waves: sca-v22 full-repo + dead-layer pruning + complexity-budget enforcement + **memory-arbitration drift checks** (L2 policy).

## §10 Honest residuals + risks (verify-before-claim per CR-6)
- **Stream E arXiv citations** (2604.x / 2603.x / 2602.x / 2601.x) UNVERIFIED — patterns adopted, paper-claims NOT ground-truth.
- **Windows sandbox R5-corollary (L15)** = HIGHEST-severity unresolved AI-safety gap. WSL2-bubblewrap nearest mitigation; P0 with defined date. Anthropic docs explicitly limit native sandbox to macOS Seatbelt + Linux/WSL2 bubblewrap.
- **Memory licensing (codex r1#8)**:
  - **basic-memory T6 is AGPL-3.0** — viral on modification/network-serving; **no-modification policy + distribution review required** (especially for any commercial fork/public-deploy of the runtime).
  - **Mem0 OpenMemory MCP is Apache-2.0** (not AGPL as v1 stated) — commercial-clean OSS.
  - Cognee MIT.
  - **Memory arbitration drift** between basic-memory + cognee + Mem0 is a real risk — the L2 arbitration policy + drift-evals are required pre-Phase-3 to prevent.
- **Anthropic Memory Stores** = Managed Agents only ($0.08/session-hour) → not applicable to Claude Code CLI directly today.
- **MCP RC 2026-07-28 stateless** = MAJOR shift coming; W389 design integrates current `2025-11-25`; pin migration review for W390-era.
- **Langfuse v4 (codex r1#6)** = CLOUD PREVIEW only; self-hosted v4 GA PENDING. v3 already uses ClickHouse → no urgency. Phase-0b is migration-PREP not migration.
- **OTel GenAI conventions (codex r1#7)** = marked "Development" / experimental — version-pin + dual-emission policy (emit both current Langfuse-native + experimental `gen_ai.*`; switch primary only when stable).
- **Copilot autonomy gating (codex r1#1)**: "skip approval for Coding Agent Actions workflows" setting MUST be enabled by operator (Phase-0b); ruleset bypass-actor SCOPED, not blanket. Code Review NEVER a required-check.
- **22→23 layer extension** (L0 added + L19/L20/L21/L22 new) requires operator acceptance to update W367 LAYER-MAP-CANONICAL.md.
- **OWASP LLM Top 10 2025 "Lethal Trifecta"**: runtime has ALL three legs → L20 stand-up = STAND-UP-IMMEDIATELY priority.
- **Copilot billing**: Actions minutes consumption starts June 1 2026 for Copilot Code Review on private repos. Cost modeling needed before high-volume autonomous deployment.
- **The 4 not-yet-on-main APPROVED designs** (W381 P1 / W374 / W375 / W383) all need to LAND through clean-merge — each is its own Phase-0a PR work item.

## §10b Codex convergence closure ledger (verify-before-claim, CR-6)
- **r1 REVISE@0.88, 8 P1 findings → v2 disposition** (codex r2 explicit: "P1#2 through P1#8 are correctly resolved in v2"):
  - P1#1 Copilot autonomy overclaimed → partial-fix v2; **FULL-FIX v3** (codex r2#1 deeper-scope: 2-ruleset split; §5 + §9 Phase-0b#3).
  - P1#2 layer numbering inconsistent → **CLOSED v2** (§2 + §3 use W367 canonical IDs throughout).
  - P1#3 W381 L0-L6 first-class layer → **CLOSED v2** (L0 Autonomous Control Plane added in §2 + §3-L0 stack).
  - P1#4 required-check deadlock pattern → **CLOSED v2** (§5 always-trigger PR+merge_group; file-filter inside; skipped→success; unique job names).
  - P1#5 zero-leaked-cred guarantee too broad → **CLOSED v2** (§1 + §7 narrower; LFS+submodule+archive checks added).
  - P1#6 Langfuse v4 self-hosting timing → **CLOSED v2** (§3-L11 + §9-Phase-0b: migration-PREP only; cloud-preview; self-host pending).
  - P1#7 OTel GenAI "Development" → **CLOSED v2** (§3-L11 + §9-Phase-0a#13: version-pin + dual-emission).
  - P1#8 memory licensing → **CLOSED v2** (Mem0 = Apache-2.0; basic-memory = AGPL-3.0 boundary; arbitration policy added).
- **r2 REVISE@0.87, 1 P1 + 1 P2 → v3 disposition**:
  - r2-P1 Copilot bypass-actors bypass entire ruleset → **CLOSED v3** (2-ruleset split spelled out in §5 + §9 Phase-0b#3).
  - r2-P2 explicit closure ledger → **CLOSED v3** (this §10b).
- **Expected r3 outcome**: APPROVE.

## §11 Sources (≥3-org cite-floor)
- W385 LANDSCAPE (this runtime): `docs/architecture/SOTA-RUNTIME-2026-05-22/LANDSCAPE.md`
- W367 18-layer canonical: `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/LAYER-MAP-CANONICAL.md` (codex-APPROVED)
- W388 minimal-ship: `docs/architecture/W388-MINIMAL-SHIP/DESIGN.md` (codex r1 REVISE@0.89 → r2 APPROVE@0.91)
- W381 Unleashed-Autonomy: `docs/architecture/W381-UNLEASHED-AUTONOMY-ARCH/` (codex r7 APPROVED)
- Anthropic Code Security: https://docs.github.com/en/code-security
- Anthropic Claude Code sandbox docs: https://code.claude.com/docs/en/sandboxing (macOS Seatbelt + Linux/WSL2 bubblewrap)
- GitHub Copilot Coding Agent: https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent
- GitHub "Skip approval for Copilot coding-agent Actions workflows" (2026-03-13): https://github.blog/changelog/2026-03-13-optionally-skip-approval-for-copilot-coding-agent-actions-workflows
- GitHub required-status-checks troubleshooting: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/troubleshooting-required-status-checks
- GitHub rulesets troubleshooting: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/troubleshooting-rules
- OSSF Scorecard: https://github.com/ossf/scorecard
- BoostSecurity poutine: https://github.com/boostsecurityio/poutine
- Google OSV-Scanner v2: https://github.com/google/osv-scanner
- NVIDIA Garak: https://github.com/NVIDIA/garak
- Center for AI Safety HarmBench: https://github.com/centerforaisafety/HarmBench
- Anthropic Memory Tool: https://docs.anthropic.com/en/docs/build-with-claude/memory (`memory_20250818`)
- MCP RC 2026-07-28: https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/
- Microsoft Agent Framework 1.0: https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/
- A2A protocol: https://a2aproject.org (Linux Foundation)
- GPT-Researcher: https://github.com/assafelovic/gpt-researcher (MIT)
- Mem0 (Apache-2.0): https://github.com/mem0ai/mem0
- Basic Memory (AGPL-3.0): https://docs.basicmemory.com/reference/technical-information
- OpenHands v1.7: https://github.com/OpenHands/OpenHands (MIT, 74.4k stars)
- Langfuse v4 docs: https://langfuse.com/docs/v4/ (Cloud Preview; self-host pending)
- OTel GenAI semconv (Development): https://opentelemetry.io/docs/specs/semconv/gen-ai/
- SLSA framework: https://slsa.dev (+ slsa-github-generator)
- Sigstore cosign: https://github.com/sigstore/cosign
- OWASP LLM Top 10 2025: https://genai.owasp.org/llm-top-10/
- MITRE ATLAS: https://atlas.mitre.org/
- Simon Willison "Lethal Trifecta": https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
- mcp-scan: https://github.com/invariantlabs-ai/mcp-scan
- Inspect AI (UK AISI): https://inspect.aisi.org.uk/
- DeepEval: https://github.com/confident-ai/deepeval
- Promptfoo: https://github.com/promptfoo/promptfoo
- SWE-bench Pro (Verified contamination): https://www.morphllm.com/swe-bench-pro
- Terminal-Bench 2.0: https://benchlm.ai/blog/posts/terminal-bench-2-agentic-benchmark
- GitHub Immutable Releases: https://github.blog/changelog/2025-10-28-immutable-releases-are-now-generally-available/
- obra/superpowers v5.1.0: https://github.com/obra/superpowers (BREAKING `code-reviewer` removal)
- Lefthook: https://github.com/evilmartians/lefthook
- opengrep (LGPL Semgrep fork): https://github.com/opengrep/opengrep
- TruffleHog v3: https://github.com/trufflesecurity/trufflehog
- pinact: https://github.com/suzuki-shunsuke/pinact
