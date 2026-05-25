VERDICT-ALL-3: adversarial-review FAIL

STAND-IN-NOTICE: `codex --version` succeeded (`codex-cli 0.130.0`), but Codex consult dispatch was unavailable. GNU `timeout.exe`, Git `tee.exe`, and `codex exec` all failed with Win32 access-denied runtime errors; `codex exec --ephemeral` also failed before model dispatch with `Error: failed to initialize in-process app-server client: Access is denied. (os error 5)`. Prompt files are `.claude/state/codex_consult_w173_dim{A,B,C}.txt`; captured failure/stand-in outputs are `.claude/state/codex_consult_w173_dim{A,B,C}_OUT.txt`.

Aggregate rule: >=2 NEEDS-REVISION/REJECT => FAIL. Dimensions A and B are NEEDS-REVISION; dimension C is NEEDS-REVISION for candidate triage.

## Dimension A

DIMENSION_A: NEEDS-REVISION conf=0.90

Findings:

- F-001 HIGH: GitNexus HEAD drift invalidates the W171 "fresh" pin. At `tmp/wave171-agentC-sota-5repo-source-2026-05-13.md:39`, quote: "`507f84b`"; at `tmp/wave171-agentC-sota-5repo-source-2026-05-13.md:115`, quote: "`507f84b69af29f6a5596538a59175bd930d07e57`". Live `git ls-remote https://github.com/abhigyanpatwari/GitNexus.git HEAD` returned `88d3df77cc74aaf08e813f8f220b5914a2e122c8`, so the artifact should not remain `fresh` without a marker-decay caveat. Local deps are also stale at `Z:/repos/deps/gitnexus/README.md:1 @ HEAD 98addbd6c4e7aff77b5c33242d08155afe94ed35`.

- F-002 MEDIUM: wshobson install command needs explicit marketplace-name validation, not repo-slug inference. At `tmp/wave171-agentC-sota-5repo-source-2026-05-13.md:82`, quote: "`/plugin marketplace add wshobson/agents` then `/plugin install shell-scripting@claude-code-workflows`"; at lines 102-105, the install commands repeat `@claude-code-workflows`. Current upstream marketplace JSON still names the marketplace `claude-code-workflows` (`https://raw.githubusercontent.com/wshobson/agents/main/.claude-plugin/marketplace.json:0`), and local stale deps agree (`Z:/repos/deps/wshobson-agents/.claude-plugin/marketplace.json:2 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`). Official plugin docs say installs use `plugin-name@marketplace-name`, where marketplace-name is the manifest `name` field (`https://code.claude.com/docs/en/plugin-marketplaces`, search result lines under "Required fields"). Proposed fix is not to flip to `wshobson-agents`; it is to add a Mia probe that reads `.claude-plugin/marketplace.json.name` after add/update and uses that exact value.

Prescribed edits:

- `tmp/wave171-agentC-sota-5repo-source-2026-05-13.md:39`: replace `| 2 | abhigyanpatwari/GitNexus | \`507f84b\` |` with `| 2 | abhigyanpatwari/GitNexus | \`88d3df7\` [VERIFIED 2026-05-13 via git ls-remote; prior \`507f84b\` marker-decayed] |`.

- `tmp/wave171-agentC-sota-5repo-source-2026-05-13.md:100-106`: keep the install slug only if a pre-install probe confirms marketplace name. Add: `Before install, run marketplace-name Mia probe: read .claude-plugin/marketplace.json.name after /plugin marketplace add/update; install as <plugin>@<manifest.name>. Current verified upstream name is claude-code-workflows; do not infer wshobson-agents from repo owner/name.`

## Dimension B

DIMENSION_B: NEEDS-REVISION conf=0.88

Findings:

- F-001 HIGH: The design prescribes `Task` coverage, but current applied hook state omits it. At `tmp/wave170-fire1-agentC-skill-enhance-compact-tune-2026-05-13.md:127`, quote: `"Edit|Write|MultiEdit|Bash|Read|Glob|Grep|Task|Agent"`. Current settings have `"Edit|Write|MultiEdit|Bash|Read|Glob|Grep|Agent"` at `.claude/settings.json:347 @ HEAD 865263d79a8da34ec3b92ef25eac01f5795de72a`, and current script `TARGET_TOOLS` also omits `Task` at `.claude/hooks/scripts/context_window_guard.py:27 @ HEAD 865263d79a8da34ec3b92ef25eac01f5795de72a`. Either the design must drop `Task`, or the applied settings/script must include it.

- F-002 MEDIUM: The hook-doc semantics are mostly correct but need one explicit edge-case correction: PreCompact matchers are `manual` and `auto`; `compact` is a `SessionStart.source` value, not a PreCompact matcher. Official hooks docs list `PreCompact`, `PostCompact` matcher filters as `manual`, `auto` (`https://code.claude.com/docs/en/hooks:331-345`), while SessionStart source can be `compact` (`https://code.claude.com/docs/en/hooks:846-859`). The design line `tmp/wave170-fire1-agentC-skill-enhance-compact-tune-2026-05-13.md:86` correctly names `trigger="manual"`, but the final design should explicitly reject `matcher:"compact"` as an edge-case anti-pattern.

- F-003 LOW: 10K cap is respected by current scripts, but the artifact should state why. The warning payload in `.claude/hooks/scripts/context_window_guard.py:59-78 @ HEAD 865263d79a8da34ec3b92ef25eac01f5795de72a` is a short JSON `additionalContext`, and PreCompact block output in `.claude/hooks/scripts/precompact_guard.py:66-72 @ HEAD 865263d79a8da34ec3b92ef25eac01f5795de72a` is far below 10,000 chars. Official docs cap hook-injected context at 10,000 chars (`https://code.claude.com/docs/en/hooks:727-729`).

Prescribed edits:

- `tmp/wave170-fire1-agentC-skill-enhance-compact-tune-2026-05-13.md:127-139`: either remove `Task` from both proposed matcher and `TARGET_TOOLS`, or add a concrete follow-up prescribed edit to `.claude/settings.json:347` and `.claude/hooks/scripts/context_window_guard.py:27` to include `Task`. Do not leave design and applied state divergent.

- `tmp/wave170-fire1-agentC-skill-enhance-compact-tune-2026-05-13.md:84-89`: add: `Edge-case: PreCompact matcher values are manual|auto only; compact is SessionStart.source after compaction and must not be used as a PreCompact matcher.`

## Dimension C

DIMENSION_C: NEEDS-REVISION conf=0.87

Row decisions:

- row 14: CODIFY. Reason: distinct FM-20 artifact-license sub-class; local deps confirm no LICENSE file for vercel-labs-agent-skills (`Test-Path Z:/repos/deps/vercel-labs-agent-skills/LICENSE` returned false) at repo HEAD `b9c8ee0643d87d3c5a953d1e22382ff2ead39229`. Mechanical-mirror=NO: adding a new ladder row is new evidence/status, not pure pointer-extension under `.claude/rules/ctff-mechanical-mirror.md:29-33 @ HEAD 865263d79a8da34ec3b92ef25eac01f5795de72a`.

- row 15: REJECT-CODIFICATION pending evidence. Reason: no local `Z:/repos/deps/hesreallyhim*` dependency checkout was present, and no W172 artifact path was supplied for line-cited TOC removal. FM-20 requires probe outcome citation before propagation (`.claude/rules/fm20-path-drift-cascade.md:85-87 @ HEAD 865263d79a8da34ec3b92ef25eac01f5795de72a`). Mechanical-mirror=NO: unsupported new evidence row.

- row 16: CODIFY as AMBER/BORDERLINE only. Reason: launch-spike star velocity is a distinct axis-3 stability/marker-decay class, but must be worded as volatility caution, not install blocker by itself. Mechanical-mirror=NO: introduces new evidence and classification language.

- row 17: REJECT-CODIFICATION pending evidence. Reason: no local `Z:/repos/deps/alirezarezvani*` dependency checkout was present, and no line-cited W172 evidence was supplied for the +180% count drift. Mechanical-mirror=NO: unsupported new evidence row.

- row 18: REJECT-CODIFICATION. Reason: the candidate says `claude-code-workflows` is incorrect and `wshobson-agents` is correct, but current upstream and local manifest evidence show marketplace name `claude-code-workflows` (`Z:/repos/deps/wshobson-agents/.claude-plugin/marketplace.json:2 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`; upstream raw same on 2026-05-13), and Claude plugin docs install by marketplace manifest name. Mechanical-mirror=NO: would codify a likely false correction.

- row 19: CODIFY. Reason: mattpocock marketplace structure was unverified before INSTALL prescription, and local deps show `.claude-plugin/plugin.json` exists but `.claude-plugin/marketplace.json` is absent (`Z:/repos/deps/mattpocock-skills/.claude-plugin/plugin.json:1 @ HEAD 733d312884b3878a9a9cff693c5886943753a741`; attempted read of `Z:/repos/deps/mattpocock-skills/.claude-plugin/marketplace.json` failed as missing). Mechanical-mirror=NO: new registry-blocker row, not pointer-extension.

Findings:

- F-001 MEDIUM: The row-14/16/19 codifications should be appended as evidence rows or as a compact "candidate rows" subsection, not shipped under the mechanical-mirror exception. Mechanical-mirror allows only single-file <=24 LOC pure pointer extensions and forbids new activation criteria/status classes (`.claude/rules/ctff-mechanical-mirror.md:29-33 @ HEAD 865263d79a8da34ec3b92ef25eac01f5795de72a`). These rows add new evidence/status classes, so fresh T1/T2 remains required.

Prescribed edits:

- `.claude/rules/fm20-path-drift-cascade.md:76`: append rows 14, 16, and 19 only, with `[VERIFIED]` probe text and exact artifact/file evidence. Do not append rows 15, 17, or 18 until direct W172 or upstream evidence exists.

- `.claude/rules/fm20-path-drift-cascade.md:127-134`: add update trigger: `A marketplace install prescription that names <plugin>@<marketplace> MUST verify both .claude-plugin/marketplace.json existence and marketplace.name before propagation; plugin.json alone is insufficient for marketplace install commands.`

## Commands run

- `codex --version` => `codex-cli 0.130.0`
- Attempted Path D variants with GNU `timeout`, Git `tee`, PowerShell `Tee-Object`, and `codex exec --ephemeral`; all failed before consult dispatch with access-denied runtime errors.
- `git ls-remote` for wshobson/agents, GitNexus, quemsah/awesome-claude-plugins, Shubhamsaboo/awesome-llm-apps, multica-ai/andrej-karpathy-skills.
- Local reads of W171/W170 artifacts, FM-20 rule, CTFF mechanical-mirror rule, settings, context-window hooks, and relevant dependency manifests.

## ARTIFACT-INLINE: tmp/wave173-agentC-codex-rescue-adversarial-3-dim-2026-05-13.md
