

## 2026-05-08 Wave 97 — Ship 1A: enable claude-md-management plugin (CLAUDE.md drift auditor + /revise-claude-md command)

### Origin
User directive Wave 97: "continue ship convergence sota insights, follow sota offical approach, make sure all sota optimization applied without harming the sota performance, we need full advanced unleash of all perfromacne, foundation level, and beyond, please deep dive into the Z:/claude-sota-installed/docs/outer research and much beyond... please contiunue pending convergence ships, and make sure using gpt5.5 unleashed and e2e the commit and more in lifecycle".

Wave 97 deep-dive of `docs/outer research/` (2107 files / 7.8 MB inventory) surfaced wave52/iter2b-advanced-unadopted.md TOP-10-NON-CCBP gaps. After Mia pre-apply caught multiple OVER claims in initial Wave 97 analysis (post-PreCompact stale state), genuine remaining quick win = enable 1 of the 3 candidate plugins (claude-md-management). Other 2 dropped per codex T1 GPT-5.5 verdict.

### Mia pre-apply outcomes (3 OVER claims caught BEFORE ship)

1. **OVER #1 (post-PreCompact)**: Initial inventory claimed `ANTHROPIC_SMALL_FAST_MODEL` was missing → Mia probe of settings.json env block showed it was set Wave 82a. Saved revert cycle.
2. **OVER #2 (Mia probe)**: Marketplace listing showed `session-report` plugin → Mia probe of plugin dir found NO plugin.json (only LICENSE + skills/ + analyze-sessions.mjs). Plugin NOT installable via /plugin install. Dropped from ship.
3. **OVER #3 (codex T1 Round-1 catch)**: Initial draft claimed `explanatory-output-style` was "dormant unless operator activates outputStyle". Codex T1 NEEDS-REVISION conf=0.94: plugin's SessionStart hook ALWAYS fires regardless of outputStyle setting + adds token/output cost per upstream README. Plugin REMOVED from ship via Pattern A fix-forward.

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee from main session)

| Round | Verdict | Confidence | Outcome |
|---|---|---|---|
| Round-1 | NEEDS-REVISION | 0.94 | Pattern A fix-forward applied (drop explanatory-output-style + correct read-only claim) |
| Round-2 | APPROVE | 0.91 | Outcome A monotone-decline per closed-loop-recursive-narrowing.md |

Verdict files:
- `.claude/state/codex_consult_wave97_ship1a_enable_plugins_OUT.txt` (Round-1; 36246 tokens)
- `.claude/state/codex_consult_wave97_ship1a_round2_OUT.txt` (Round-2; 14255 tokens)

### Edit (single file: `.claude/settings.json`)

```diff
   "enabledPlugins": {
     "superpowers@claude-plugins-official": true,
     "codex@openai-codex": true,
     "everything-claude-code@everything-claude-code": true,
     "pyright-lsp@claude-plugins-official": true,
     "agent-sdk-dev@claude-plugins-official": true,
     "ralph-loop@claude-plugins-official": true,
     "frontend-design@claude-plugins-official": true,
-    "context-mode@context-mode": true
+    "context-mode@context-mode": true,
+    "claude-md-management@claude-plugins-official": true
   },
+  "_comment_wave97_ship1A": "Wave 97 Ship 1A 2026-05-08 — ..."
```

### TIER-1 SOTA cite chain

- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/plugins/claude-md-management/.claude-plugin/plugin.json` (Anthropic-authored manifest; v1.0.0; author email support@anthropic.com)
- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/plugins/claude-md-management/skills/claude-md-improver/SKILL.md` (skill spec)
- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-plugins-official/plugins/claude-md-management/commands/revise-claude-md.md` (command spec)
- **TIER-2**: `Z:/claude-sota-installed/docs/outer research/wave52/iter2b-advanced-unadopted.md §5` (advisory source for gap discovery)

### Operational impact

| Layer | Pre-Wave-97 | Post-Wave-97 |
|---|---|---|
| enabledPlugins count | 8 | 9 |
| CLAUDE.md drift detection | Quantitative-only (claude_md_count_audit.py PostToolUse) | + Qualitative (claude-md-improver skill on-request) |
| Session learning capture | Manual edits + memory files | + /revise-claude-md command captures session-end learnings |

### LAUNCH-DISCIPLINE D1 invariants (3-axis CHECK)

- **REVERSIBLE**: `git revert <Wave97-commit>` OR flip `claude-md-management@claude-plugins-official: false` in settings.json; no destructive state
- **OBSERVABLE**: post-/reload-plugins, claude-md-improver skill loads on "audit my CLAUDE.md" trigger; /revise-claude-md command available via `/`
- **INCREMENTAL**: 1-plugin enable; orthogonal to existing 8 plugins; no infrastructure change

### Mia pre-apply (5/5 PASS post-Round-2)

1. Plugin manifest exists at `.claude-plugin/plugin.json` ✓
2. Plugin in marketplace.json (entry index 168 plugins; verified) ✓
3. Skill + command files present (claude-md-improver/SKILL.md + commands/revise-claude-md.md) ✓
4. Anthropic-authored author block in manifest ✓
5. No conflict with existing claude_md_count_audit.py PostToolUse hook (different scope: quantitative count vs qualitative drift) ✓

### Sister-rule integration

- `cross-model-consensus.md` T1: real GPT-5.5 codex T1 e2e BEFORE commit — Round-1 NEEDS-REVISION + Round-2 APPROVE (Outcome A)
- `codex-t1-fix-forward-pattern.md §Pattern A`: 2-prescription single-atomic apply between rounds
- `closed-loop-recursive-narrowing.md §Outcome A`: monotone-decline 0.94→0.91 confirms convergence
- `mia-pre-apply.md`: 3 OVER catches BEFORE ship (saved 3× revert cycles)
- `synthesis-layer-verify.md §Reporting categories`: HONEST-NON-FINDING on session-report (upstream missing manifest)

### Wave 97 satisfies cardinal-rule

- **CR-1**: TIER-1-DIRECT cite chain at file:line (3 plugin manifest files)
- **CR-3**: cross-model gate via real GPT-5.5 e2e BEFORE commit (Round-1+Round-2 verdicts on file)
- **CR-5**: install-priority — Anthropic-authored marketplace plugin (no hand-coding)
- **CR-6**: official-native-channel — `/plugin install` was used at marketplace add Wave 50 fire 10
- **CR-7**: Phase 1 graduated-unleash; new plugin enable doesn't change permission scope
- **CR-8**: ADAPTED-FROM-SOTA — Anthropic upstream Anthropic-authored plugin
- **CR-9**: install-risk LOW — flip-disable trivial; reversible via setting `false`
- **CR-10**: research-first via Wave 97 deep-dive of docs/outer research/ (2107 files indexed) + plugin manifest reads + Mia probes
- **CR-11**: META-process SOTA — Pattern A apply + Mia pre-apply (3 OVER caught) + closed-loop arc R1→R2 + provenance log + GPT-5.5 e2e BEFORE commit per user mandate

### Ships LANDED in this session arc (10 total)

| Wave | Commit | Ship |
|---|---|---|
| 86 | `824523f` | 1Q — CLIProxyAPI 4h session-affinity tuning |
| 89 | `15dad8e` | 1Y — codex CLI sandbox unleash |
| 91 | `6ebcf08` | 1W — Aperant-derived rate-limit poller |
| 92 | `861ee43` | 1T — cnighswonger v3.5.3 cache-fix chain |
| 93 | `63cc261` | 1X — cycle-aware account rotation planner |
| 90 | `f8134e7` | docs — fleet status + redacted provenance |
| 94 | `b7207e9` | Phase 3 1T (Opus 4.7 advisory) + cron deploy |
| 95 | `840db40` | 1M — context-mode FULL plugin install |
| 96 | `51d74d6` | 1M Phase 2 — Bun runtime install (ctx_doctor 6/6 PASS) |
| **97** | **THIS** | **1A — claude-md-management plugin enable (Anthropic-direct quick win; 2 OVERs caught by codex+Mia)** |

### Update triggers

Re-evaluate when:
- claude-md-management v1.1.0+ ships with breaking changes
- session-report plugin gets a plugin.json upstream (would unblock Ship 1A4)
- explanatory-output-style upstream removes the always-on SessionStart hook (would re-enable Ship 1A6)
- 24-72h D2 monitoring window surfaces a regression on claude-md-improver behavior
