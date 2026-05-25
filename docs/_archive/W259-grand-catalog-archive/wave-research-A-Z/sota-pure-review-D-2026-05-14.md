# Agent D Adversarial Review: Wave 1 SOTA-Pure Build Plan

Date: 2026-05-14

Target runtime: `Z:/claude-sota-pure/`

Reviewed inputs:

- `Z:/claude-sota-installed/tmp/sota-pure-design-C-2026-05-14.md`
- `Z:/claude-sota-installed/tmp/sota-pure-codex-B-2026-05-14.md`

Scope: sibling-derivation, self-invention, and unverified-upstream claim audit.

Evidence standard: `[VERIFIED]`, `[INFERRED]`, `[UNKNOWN]`, `[REFUTED]`.

Primary verification methods:

- `git ls-remote https://github.com/<owner>/<repo>.git HEAD`
- Local immutable dependency mirrors under `Z:/repos/deps/`
- Official Claude Code docs at `https://code.claude.com/docs/en/env-vars`
- Official Claude Code docs at `https://code.claude.com/docs/en/agent-teams`
- Local CCBP mirror at `Z:/repos/deps/claude-code-best-practice-shan @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd`

Adversarial posture:

- Treat local installed runtime cache as supporting evidence only.
- Treat GitHub HEAD and repo-local manifests as the marketplace truth.
- Treat CCBP as secondary unless official docs corroborate.
- Treat Agent A and Agent B reports as claims, not authority.
- Treat `Z:/claude-sota-installed/` and `Z:/claude-sota/` as forbidden authority for Option B primitive provenance.

## 1. VERDICT

Verdict: NEEDS-REVISION

Confidence: 0.91

The architect plan is directionally salvageable.

It does not pass as written.

The plan avoids the worst CR-5 failure: it does not explicitly ask for local hand-authored hooks, rules, skills, or agents in `Z:/claude-sota-pure/`.

The plan does slip multiple unverified claims past the gate.

The highest severity factual risks are:

- [VERIFIED] The plan names `claude-code-workflows` as if it were a GitHub repo in places, but it is a marketplace identity inside `wshobson/agents`.
- [VERIFIED] None of the seven reviewed GitHub repos has `marketplace.json` in the repository root; the real Claude plugin marketplace files are under `.claude-plugin/marketplace.json`.
- [VERIFIED] `codex@openai-codex` auto-wires only `SessionStart`, `SessionEnd`, and `Stop`; it does not auto-wire T1-T7.
- [VERIFIED] No reviewed upstream plugin ships proactive quality-aware compaction logic.
- [VERIFIED] The two environment variables in the plan are documented upstream; they are not operator-invented.
- [REFUTED] `ralph-loop@claude-plugins-official` is not a phantom in current upstream evidence.

Primary decision: proceed only after rewriting the plan as a verified upstream install manifest; reject claims of verified marketplace identity, Anthropic-only purity, T1-T7 hook parity, or quality-aware compaction parity.

P0 findings:

- P0-1: Incorrect marketplace/repo identity handling for `claude-code-workflows`.
- P0-2: Root `marketplace.json` assumption is false across all seven checked repos.
- P0-3: T1-T7 review lifecycle cannot be claimed from `codex@openai-codex`.

P1 findings:

- P1-1: Auto-compact discipline is threshold-env plus continuity plugins, not upstream quality logic.
- P1-2: Context-mode is a third-party Elastic-2.0 plugin and should be install-class only with explicit trust notes.
- P1-3: Smoke probes mix objectively testable checks with subjective or underspecified probes.

P2 findings:

- P2-1: Plan cites Agent A and Agent B too often as authority instead of upstream manifests.
- P2-2: Plan includes `Z:/claude-sota-installed/` as production context; acceptable as migration context, not primitive authority.
- P2-3: License fields need normalization because some repos have root licenses, some only plugin-level licenses.

Bottom line: Option B can proceed only after the plan separates repo identity, marketplace identity, plugin identity, and smoke-test identity, and marks unsupported parity claims as gaps.

## 2. Q1 Marketplace Table

Question: for each of seven repos, does the GitHub repo exist, does root `marketplace.json` exist, and what are HEAD SHA and license?

Important path correction:

- Claude plugin marketplaces in these repos use `.claude-plugin/marketplace.json`.
- The question asks specifically for repository-root `marketplace.json`.
- Repository-root `marketplace.json` was not found in any checked local mirror.
- This is a plan-level canonicity failure if root path is treated as required.

| Claimed repo | GitHub exists? | HEAD SHA verified | Root `marketplace.json`? | Actual marketplace path | License evidence | Agent D classification |
|---|---:|---|---:|---|---|---|
| `anthropics/claude-plugins-official` | YES | `1a2f18b05cf5652fd25403e8d229fc884fb84103` | NO | `.claude-plugin/marketplace.json` | No root LICENSE observed in local mirror; per-plugin licenses present | VALID repo, wrong root-path assumption |
| `wshobson/agents` | YES | `112197c6bfd0a1ab10d374e85a2f5efa4757b77d` | NO | `.claude-plugin/marketplace.json` | MIT root LICENSE | VALID repo, marketplace name is `claude-code-workflows` |
| `addyosmani/agent-skills` | YES | `5b4c6dade5e6b5a48067d08861a11732d8e3a2bf` | NO | `.claude-plugin/marketplace.json` | MIT root LICENSE | VALID repo, wrong root-path assumption |
| `openai/codex-plugin-cc` | YES | `807e03ac9d5aa23bc395fdec8c3767500a86b3cf` | NO | `.claude-plugin/marketplace.json` | Apache-2.0 root LICENSE | VALID repo, wrong root-path assumption |
| `mksglu/context-mode` | YES | `f76982c3875a052e59504ee68e74a39b87114937` | NO | `.claude-plugin/marketplace.json` | Elastic-2.0 root LICENSE | VALID repo, non-OSS-permissive trust review required |
| `obra/superpowers` | YES | `f2cbfbefebbfef77321e4c9abc9e949826bea9d7` | NO | `.claude-plugin/marketplace.json` | MIT root LICENSE | VALID repo, marketplace name mismatch risk |
| `claude-code-workflows` | NO independent repo verified | N/A | NO | N/A | N/A | PHANTOM as GitHub repo; VALID only as `wshobson/agents` marketplace name |

Q1 adversarial conclusion:

- The plan must stop asking for or implying repo-root `marketplace.json`.
- The correct manifest path is `.claude-plugin/marketplace.json`.
- `claude-code-workflows` must be documented as marketplace name, not repository name.
- The plan must capture both remote HEAD and marketplace file path for every install.

## 3. Q2 Plugin Table

Question: classify seven plugins as EXISTS, UNVERIFIED, or PHANTOM based on plugin.json in the named marketplace repo.

| Plugin coordinate in plan | Marketplace repo actually checked | Plugin JSON evidence | Classification | Notes |
|---|---|---|---|---|
| `codex@openai-codex` | `openai/codex-plugin-cc` | `plugins/codex/.claude-plugin/plugin.json` | EXISTS | Plugin JSON name is `codex`, version `1.0.4` |
| `context-mode@context-mode` | `mksglu/context-mode` | `.claude-plugin/plugin.json` | EXISTS | Plugin JSON name is `context-mode`, version `1.0.111` in local mirror |
| `superpowers@superpowers` | `obra/superpowers` | `.claude-plugin/plugin.json` | EXISTS-WITH-MARKETPLACE-NAME-WARNING | Plugin exists, but local marketplace name is `superpowers-dev`, not `superpowers` |
| `agent-skills@addy-agent-skills` | `addyosmani/agent-skills` | `.claude-plugin/plugin.json` | EXISTS | Plugin JSON name is `agent-skills`, marketplace name is `addy-agent-skills` |
| `agent-teams@claude-code-workflows` | `wshobson/agents` | `plugins/agent-teams/.claude-plugin/plugin.json` | EXISTS | Coordinate valid if marketplace `claude-code-workflows` is registered from `wshobson/agents` |
| `comprehensive-review@claude-code-workflows` | `wshobson/agents` | `plugins/comprehensive-review/.claude-plugin/plugin.json` | EXISTS | Coordinate valid if marketplace identity is documented correctly |
| `ralph-loop@claude-plugins-official` | `anthropics/claude-plugins-official` | `plugins/ralph-loop/.claude-plugin/plugin.json` | EXISTS | Not a phantom; plugin JSON name is `ralph-loop`, version `1.0.0` |

Q2 adversarial conclusion:

- No Q2 plugin is PHANTOM after direct local-mirror verification.
- The plan still needs revision because it does not distinguish repo name from marketplace name.
- `superpowers@superpowers` needs alias verification or coordinate correction.
- `claude-code-workflows` needs explicit mapping to `wshobson/agents`.

## 4. Q3 Env-Var Canonicity

Question: are `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` and `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50` documented upstream or operator-invented?

Short answer:

- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`: DOCUMENTED.
- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50`: DOCUMENTED.
- Neither is operator-invented.

Official docs evidence:

- [VERIFIED] `https://code.claude.com/docs/en/env-vars` lists `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`.
- [VERIFIED] The same page says it enables agent teams and that agent teams are experimental and disabled by default.
- [VERIFIED] `https://code.claude.com/docs/en/agent-teams` also documents enabling agent teams via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`.
- [VERIFIED] `https://code.claude.com/docs/en/env-vars` lists `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`.
- [VERIFIED] The same page describes it as the percentage of context capacity where auto-compaction triggers.
- [VERIFIED] The same page also documents `CLAUDE_CODE_AUTO_COMPACT_WINDOW`, which interacts with `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`.

CCBP evidence:

- [VERIFIED] `Z:/repos/deps/claude-code-best-practice-shan @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd`.
- [VERIFIED] `best-practice/claude-settings.md:826` documents `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`.
- [VERIFIED] `best-practice/claude-settings.md:967` documents `CLAUDE_CODE_AUTO_COMPACT_WINDOW`.
- [VERIFIED] `best-practice/claude-settings.md:968` documents `DISABLE_AUTO_COMPACT`.
- [VERIFIED] `best-practice/claude-cli-startup-flags.md:211` documents `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`.
- [VERIFIED] `implementation/claude-agent-teams-implementation.md:53` shows `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 claude`.

Adversarial caveat:

- The env vars are canonical.
- The policy interpretation is not canonical.
- Setting `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50` is an operator-selected threshold.
- Official docs document the knob, not the claim that 50 percent is SOTA absolute.
- The plan may use the env var.
- The plan must not claim quality-aware proactive compaction from the env var.

Q3 conclusion:

- Env-var canonicity passes.
- Compaction behavior claims still need narrower wording.

## 5. Q4 Self-Invention Audit

Question: does the architect plan call for any local hook, rule, skill, or agent file to be hand-authored beyond bootstrap?

Short answer:

- No explicit local hook/rule/skill/agent authoring was found.
- The plan passes this specific CR-5/CR-8 check.
- The plan fails adjacent precision checks because several bootstrap items could become hidden policy if not constrained.

Plan lines reviewed:

- [VERIFIED] Phase 0 allows `CLAUDE.md` as manifest.
- [VERIFIED] Phase 0 allows minimal `.claude/settings.json`.
- [VERIFIED] Phase 0 allows `.mcp.json`.
- [VERIFIED] Phase 0 allows launcher/env wrapper if needed.
- [VERIFIED] Phase 0 allows install provenance log.
- [VERIFIED] Phase 0 disallows copied Option A hooks, agents, skills, rules, and invented lifecycle gates.

Risky-but-not-yet-violating local surfaces:

- `CLAUDE.md` can be a manifest only.
- `.claude/settings.json` can select official env, permissions, and plugins only.
- `.mcp.json` can register MCPs only.
- Launcher/env wrapper can set documented env vars only.
- Install provenance can log commands and versions only.
- Smoke checklist can record tests only.
- Trust/license notes can document provenance only.

Forbidden escalation: do not encode T1-T7 policy or auto-compact heuristics in local bootstrap files, and do not write or copy local hooks, rules, skills, or agents.

Q4 conclusion:

- PASS for explicit hand-authored primitive audit.
- NEEDS-GUARDRAIL for bootstrap file content.
- Prescribe a line: "Local bootstrap files may contain selection, not behavior."

## 6. Q5 Sibling Leaks

Question: does any line in the plan cite `Z:/claude-sota-installed/` or `Z:/claude-sota/` as authority instead of upstream SOTA?

Direct path hits:

- [VERIFIED] Line 292 of the architect plan says keep `Z:/claude-sota-installed/` as production.
- [VERIFIED] No direct `Z:/claude-sota/` path hit was found in the architect plan.
- [VERIFIED] The plan mentions `Z:/claude-sota-pure/` as the target.

Authority-pattern hits:

- [VERIFIED] The plan repeatedly cites Agent A and Agent B as decision inputs.
- [VERIFIED] The plan uses Agent A as support for the "top five additions."
- [VERIFIED] The plan uses Agent B as support for `ralph-loop` being the closest official Stop-hook equivalent.
- [VERIFIED] The plan uses Agent A as support for MCP baseline pack selection.
- [VERIFIED] The plan discusses Option A installed runtime capabilities.

Adversarial classification:

- Direct path leak severity: LOW.
- Sibling authority leak severity: MEDIUM.
- The plan uses sibling artifacts as architectural context.
- It does not always promote sibling artifacts to primitive install source.
- It does, however, lets Agent A/B claims substitute for direct upstream manifest verification.

Acceptable usage:

- "Option A production currently has capability X" is acceptable migration context.
- "Agent B warned that codex does not wire T1-T7" is acceptable audit context.
- "`Z:/claude-sota-installed/` remains production while Option B is evaluated" is acceptable operational context.

Unacceptable usage:

- "Install plugin X because Agent A says it exists" is not acceptable.
- "Use MCP Y because installed runtime has it" is not acceptable without upstream repo/package verification.
- "Treat current hook chain as target parity" is not acceptable if no upstream primitive owns that behavior.

Q5 conclusion:

- No fatal direct sibling install-source leak found.
- The plan needs a provenance rewrite so every install primitive cites upstream repo, manifest path, HEAD, license, and plugin JSON.

## 7. Q6 Ralph-Loop Verdict

Question: does `anthropics/claude-plugins-official` actually ship `ralph-loop`?

Short answer:

- YES.
- `ralph-loop` is not PHANTOM.
- No P0 phantom finding applies.

Evidence:

- [VERIFIED] `anthropics/claude-plugins-official` exists via `git ls-remote`.
- [VERIFIED] Current remote HEAD observed: `1a2f18b05cf5652fd25403e8d229fc884fb84103`.
- [VERIFIED] Local mirror contains `plugins/ralph-loop/.claude-plugin/plugin.json`.
- [VERIFIED] That plugin JSON declares `"name": "ralph-loop"`.
- [VERIFIED] That plugin JSON declares `"version": "1.0.0"`.
- [VERIFIED] That plugin JSON declares author name `"Anthropic"`.
- [VERIFIED] Local mirror contains `plugins/ralph-loop/hooks/hooks.json`.
- [VERIFIED] Local mirror contains `plugins/ralph-loop/README.md`.
- [VERIFIED] Local mirror contains `plugins/ralph-loop/LICENSE`.

Adversarial caveat:

- `ralph-loop` existence does not prove it is appropriate for normal production workflow.
- It is a Stop-hook loop primitive.
- It must be smoke-tested with a finite iteration cap.
- It must not be treated as generic T1-T7 lifecycle governance.
- It must not be treated as auto-compact logic.

Q6 conclusion:

- APPROVE existence claim.
- REVISE behavioral claim to: "upstream Anthropic Stop-hook loop plugin, finite-cap smoke required."

## 8. Q7 Context-Mode

Question: does `mksglu/context-mode` exist, what is the license, what is the axis-3 stability band, is there named-T2 endorsement, and is it install-class or cite-class?

Existence:

- [VERIFIED] `mksglu/context-mode` exists via `git ls-remote`.
- [VERIFIED] Current remote HEAD observed: `f76982c3875a052e59504ee68e74a39b87114937`.
- [VERIFIED] Local mirror HEAD observed: `e73a6cd56a4eb0a01794b9187902e3f805515286`.
- [VERIFIED] Local mirror contains `.claude-plugin/plugin.json`.
- [VERIFIED] Local mirror contains `.claude-plugin/marketplace.json`.

License:

- [VERIFIED] Root `LICENSE` says Elastic License 2.0.
- [VERIFIED] Plugin JSON says `"license": "Elastic-2.0"`.
- [VERIFIED] This is not MIT/Apache permissive.
- [INFERRED] The plan needs explicit license/trust acceptance before install.

Axis-3 stability band:

- [VERIFIED] Local mirror first commit timestamp: `2026-02-23 09:03:12 +0300`.
- [VERIFIED] Local mirror latest commit timestamp: `2026-05-09 06:40:30 +0000`.
- [VERIFIED] Local mirror commit count: `1169`.
- [MEASURED] Age over local mirror span is about 75 days.
- [MEASURED] Commit pace is about 15.6 commits per day over that span.
- [INFERRED] Stability band: young/high-churn.
- [INFERRED] Axis-3 classification should be AMBER, not GREEN.
- [INFERRED] It can be install-class only with smoke gates and rollback notes.

Named-T2 practitioner endorsement:

- [UNKNOWN] I did not verify a named Tier-2 practitioner endorsement in the checked upstream files.
- [VERIFIED] The plugin author is Mert Koseoglu / `mksglu`.
- [UNKNOWN] The plan does not cite a named external practitioner endorsement.
- [INFERRED] Absence of named-T2 endorsement should lower trust posture.

Install-class vs cite-class:

- Recommended classification: install-class with guardrails.
- Not cite-class only, because the plugin is an actual installable Claude plugin and MCP server.
- Not unrestricted install-class, because of young/high-churn evidence and Elastic-2.0 licensing.

Required guardrails:

- Pin HEAD or release version.
- Record Elastic-2.0 license acceptance.
- Smoke `context-mode` status.
- Smoke persistence across compaction or session restore.
- Record rollback command.
- Do not claim it implements quality-aware auto-compaction.

Q7 conclusion:

- `mksglu/context-mode` exists.
- License is Elastic-2.0.
- Stability is young/high-churn AMBER.
- Named-T2 endorsement is unverified.
- Use as guarded install-class, not as proof of SOTA absoluteness.

## 9. Q8 Hook Chain Truth

Question: which T1-T7 hooks auto-wire after `codex@openai-codex` install, and which require manual `settings.json` additions?

Codex plugin auto-wired hooks:

- [VERIFIED] `SessionStart` auto-wires through `plugins/codex/hooks/hooks.json`.
- [VERIFIED] `SessionEnd` auto-wires through `plugins/codex/hooks/hooks.json`.
- [VERIFIED] `Stop` auto-wires through `plugins/codex/hooks/hooks.json`.
- [VERIFIED] `Stop` command is `node "${CLAUDE_PLUGIN_ROOT}/scripts/stop-review-gate-hook.mjs"`.
- [VERIFIED] `Stop` timeout is `900`.

Codex plugin command surfaces:

- [VERIFIED] `/codex:setup` exists.
- [VERIFIED] `/codex:review` exists.
- [VERIFIED] `/codex:adversarial-review` exists.
- [VERIFIED] `/codex:rescue` exists.
- [VERIFIED] `/codex:status` exists.
- [VERIFIED] `/codex:result` exists.
- [VERIFIED] `/codex:cancel` exists.

T1-T7 auto-wire table:

| Lifecycle stage | Installed-runtime meaning | Auto-wired by `codex@openai-codex`? | Required for parity |
|---|---|---:|---|
| T1 pre-edit consult | Pre-edit architectural consult | NO | Upstream equivalent or drop requirement |
| T2 commit-time/pre-commit gate | Commit gate before `git commit` | NO | Manual settings hook would violate purity unless plugin-owned |
| T3 post-commit review | Review after commit | NO | Upstream equivalent or command-driven workflow |
| T4 pre-push review | Review before push | NO | Upstream equivalent or external git hook outside pure runtime |
| T5 plan-stage gate | Plan review before acting | NO | Upstream equivalent or operator instruction |
| T6 stop-time review gate | Stop event review | YES, partial | `/codex:setup --enable-review-gate` and smoke required |
| T7 background rescue/delegation | Delegated Codex task workflow | COMMAND, not hook | Use `/codex:rescue`, `/codex:status`, `/codex:result` |

Manual additions required if full installed parity is demanded:

- T1 needs a PreToolUse or equivalent gate.
- T2 needs a commit/pre-commit hook.
- T3 needs a post-commit hook.
- T4 needs a pre-push hook.
- T5 needs a plan-stage hook or enforced workflow.
- T6 can use plugin Stop hook.
- T7 can use plugin commands and subagent.

Purity implications:

- Copying installed local hook scripts would violate CR-5/CR-8.
- Hand-authoring new hook scripts would violate CR-5/CR-8.
- Adding `settings.json` hook entries pointing to local scripts would violate purity unless those scripts are plugin-owned.
- Using the plugin-provided Stop hook is allowed.
- Using command-driven `/codex:review` and `/codex:adversarial-review` is allowed.

Q8 conclusion:

- The plan must explicitly say `codex@openai-codex` provides Stop review plus commands, not T1-T7 parity.
- Full T1-T7 should be marked GAP unless an upstream plugin is found.

## 10. Q9 Auto-Compact Honest Gap

Question: does any upstream plugin actually ship proactive quality-aware compaction logic?

Short answer:

- No verified upstream plugin in the checked set ships proactive quality-aware compaction logic.
- The auto-compact discipline is partly official env configuration and partly operator policy.
- The "quality-aware before rot" claim is self-invented unless backed by a new upstream primitive.

Verified official primitives:

- [VERIFIED] Claude Code documents `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`.
- [VERIFIED] Claude Code documents `CLAUDE_CODE_AUTO_COMPACT_WINDOW`.
- [VERIFIED] Claude Code supports manual `/compact`.
- [VERIFIED] CCBP documents the same env surfaces.

Verified plugin-adjacent primitives:

- [VERIFIED] `context-mode` plugin JSON claims automatic state restore across compactions.
- [VERIFIED] `wshobson/agents` contains `context-management`.
- [INFERRED] `context-management` is workflow/agent guidance, not proven proactive compaction automation.

Unsupported claims:

- [REFUTED] No checked plugin proves quality-aware compaction based on task state.
- [REFUTED] No checked plugin proves proactive compaction before degradation.
- [REFUTED] No checked plugin proves automatic preservation of all critical state.
- [REFUTED] No checked plugin proves replacement for manual `/compact` with a focus hint.

Allowed claim:

- "Use official Claude Code auto-compaction threshold env var."
- "Use context-mode for continuity across compactions."
- "Smoke test context restoration."

Forbidden claim:

- "Option B has SOTA proactive quality-aware compaction."
- "context-mode implements auto-compact-before-rot."
- "`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50` is a complete compaction policy."

Q9 conclusion:

- NEEDS-REVISION.
- The plan must mark proactive quality-aware compaction as an honest gap.
- The plan may use documented env threshold and continuity plugins as partial mitigation.

## 11. Q10 Smoke-Probe Audit

Question: are smoke probes in architect plan section 9 TESTABLE, SUBJECTIVE, or UNTESTABLE?

Probe 1:

- Text: "Plugin registry shows all required plugins installed."
- Classification: TESTABLE.
- Pass condition: every required coordinate appears with expected marketplace and version.
- Revision needed: include expected coordinate, marketplace, version, and source HEAD.

Probe 2:

- Text: "`codex@openai-codex` status and review command work."
- Classification: TESTABLE.
- Pass condition: status reports ready and review exits with a result.
- Revision needed: define tiny repo fixture and expected review mode.

Probe 3:

- Text: "`context-mode` status works and persists/restores context state."
- Classification: PARTLY TESTABLE.
- Status is TESTABLE.
- Persistence/restore is TESTABLE only if fixture state and restore assertion are defined.
- Revision needed: write a deterministic marker into context-mode state and verify it after compaction/session transition.

Probe 4:

- Text: "`agent-teams` loads with the experimental team setting enabled."
- Classification: TESTABLE.
- Pass condition: team command loads and can spawn/list teammates or reports team feature enabled.
- Revision needed: specify platform requirements and teammate display mode.

Probe 5:

- Text: "`comprehensive-review` command runs on a small repo."
- Classification: TESTABLE.
- Pass condition: command exits with review output.
- Revision needed: specify command name and fixture repo.

Probe 6:

- Text: "`ralph-loop` runs with a finite iteration cap and exits on completion."
- Classification: TESTABLE.
- Pass condition: command starts, loops no more than cap, and exits after a trivial completion predicate.
- Revision needed: define cap and prompt.

Probe 7:

- Text: "GitHub, Context7, and DeepWiki MCPs respond."
- Classification: TESTABLE.
- Pass condition: each MCP server is listed and one harmless tool call succeeds.
- Revision needed: define no-secret public query for GitHub.

Probe 8:

- Text: "Playwright MCP launches and can inspect a page."
- Classification: TESTABLE.
- Pass condition: launches browser and reads a local or public static page title.
- Revision needed: use a local `file:` or localhost page to avoid external flake.

Probe 9:

- Text: "Repomix can pack a test repo."
- Classification: TESTABLE.
- Pass condition: package command produces output from a fixture repo.
- Revision needed: set max output and expected file count.

Probe 10:

- Text: "Serena can start and expose code-navigation tools."
- Classification: TESTABLE.
- Pass condition: server starts and tool list contains expected code-navigation tools.
- Revision needed: define expected tool names.

Probe 11:

- Text: "GitNexus can index or report status for a test repo."
- Classification: TESTABLE.
- Pass condition: `npx gitnexus analyze` or status command completes.
- Revision needed: separate "index" from "status"; they test different capabilities.

Probe 12:

- Text: "Secrets are absent from tracked files."
- Classification: TESTABLE.
- Pass condition: `git status --short`, `git ls-files`, and secret scanner/gitleaks return clean.
- Revision needed: specify scanner and include plugin cache/state exclusions.

Probe 13:

- Text: "License/trust notes exist for every third-party primitive."
- Classification: SUBJECTIVE unless schema is defined.
- Pass condition: every primitive has license, owner, repo, HEAD, trust tier, and rationale.
- Revision needed: define a manifest schema.

Probe 14:

- Text: "Install provenance records plugin version, repo, and HEAD or package version."
- Classification: TESTABLE.
- Pass condition: provenance log has required fields for every primitive.
- Revision needed: define required columns and fail on missing fields.

Q10 classification summary:

| Probe | Classification | Revision required? |
|---:|---|---:|
| 1 | TESTABLE | YES |
| 2 | TESTABLE | YES |
| 3 | PARTLY TESTABLE | YES |
| 4 | TESTABLE | YES |
| 5 | TESTABLE | YES |
| 6 | TESTABLE | YES |
| 7 | TESTABLE | YES |
| 8 | TESTABLE | YES |
| 9 | TESTABLE | YES |
| 10 | TESTABLE | YES |
| 11 | TESTABLE | YES |
| 12 | TESTABLE | YES |
| 13 | SUBJECTIVE | YES |
| 14 | TESTABLE | YES |

Q10 conclusion:

- Most probes are testable in principle.
- The plan does not define deterministic pass/fail conditions.
- Probe 13 is subjective until a manifest schema exists.
- Probe 3 is partly testable until persistence semantics are formalized.

## 12. PRESCRIBED-EDITS

Edit 1:

- Replace every implication that `claude-code-workflows` is an independent GitHub repo.
- Use: "`claude-code-workflows` is the marketplace name declared by `wshobson/agents/.claude-plugin/marketplace.json`."

Edit 2:

- Replace every repo-root `marketplace.json` assumption.
- Use: "Claude plugin marketplace manifest path is `.claude-plugin/marketplace.json`."

Edit 3:

- Add a marketplace identity table to the build plan.
- Required columns: repo, remote HEAD, marketplace name, marketplace manifest path, root license, plugin license, trust tier.

Edit 4:

- Add a plugin existence table to the build plan.
- Required columns: install coordinate, marketplace name, repo, plugin JSON path, plugin version, classification.

Edit 5:

- Mark `superpowers@superpowers` as requiring coordinate verification.
- Local evidence shows marketplace name `superpowers-dev`; install coordinate may require aliasing or official marketplace registration.

Edit 6:

- Keep `ralph-loop@claude-plugins-official`.
- Change wording to: "Verified upstream Anthropic plugin; smoke with finite cap."

Edit 7:

- Remove any claim that `codex@openai-codex` wires T1-T7.
- Replace with: "Auto-wires SessionStart, SessionEnd, and Stop; provides review/rescue commands."

Edit 8:

- Add T1-T7 gap table.
- T1 through T5 must be GAP unless upstream plugin-owned hooks are found.
- T6 can be PARTIAL via Codex Stop hook.
- T7 can be COMMAND via `/codex:rescue`.

Edit 9:

- Change auto-compact language.
- Use: "Official threshold env var plus optional continuity plugin; no verified quality-aware compaction plugin."

Edit 10:

- Keep `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`.
- Cite official env-vars and agent-teams docs.
- Mark feature experimental.

Edit 11:

- Keep `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50`.
- Cite official env-vars docs.
- Mark `50` as operator-selected threshold.

Edit 12:

- Add context-mode trust warning.
- Include Elastic-2.0 license, young/high-churn AMBER stability, and no verified named-T2 endorsement.

Edit 13:

- Rewrite smoke probes with deterministic pass/fail criteria.
- Define fixture repo, commands, expected output or state, timeout, and failure artifact location.

Edit 14:

- Convert "License/trust notes exist" from prose to schema.
- Required fields: primitive, type, owner, repo, HEAD/version, license, trust class, install class, risk notes, rollback.

Edit 15:

- Add a strict local bootstrap boundary.
- Wording: "Local bootstrap files may select, configure, and record upstream primitives; they may not implement behavior."

Edit 16:

- Add forbidden local artifacts list.
- Include hooks, agents, skills, local rule packs, and copied Option A policy text.

Edit 17:

- Replace Agent A/B citations as authority with upstream citations.
- Agent A/B may remain in "review history" only.

Edit 18:

- Add install-class decisions.
- Include license and trust class for OpenAI, Anthropic, wshobson, Addy Osmani, obra, and mksglu sources.

Edit 19:

- Add a claim freeze.
- Until smoke probes pass, Option B may be called "upstream-sourced evaluation runtime."
- It must not be called "fully official and SOTA absolute."

Edit 20:

- Add promotion blocker.
- Block promotion on any UNVERIFIED coordinate, underspecified smoke probe, or local behavior primitive.

Final Agent D disposition:

- NEEDS-REVISION.
- No P0 phantom for `ralph-loop`.
- P0 remains for repo/marketplace identity confusion.
- P0 remains for hook-chain overclaiming.
- P1 remains for auto-compact overclaiming.
- P1 remains for context-mode trust/stability under-specification.
- Option B can proceed after prescribed edits are applied.
