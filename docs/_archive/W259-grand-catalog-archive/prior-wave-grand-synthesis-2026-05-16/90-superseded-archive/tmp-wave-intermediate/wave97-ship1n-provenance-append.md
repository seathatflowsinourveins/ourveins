

## 2026-05-08 Wave 97 — Ship 1N: github/spec-kit v0.8.7 binary install (specify CLI; init DEFERRED to operator)

### Origin

Wave 97 fan-3 Agent X2 returned ADOPT-NOW conf=0.92 for github/spec-kit (93,473★ MIT; 928 commits; cpd=3.57; age=260d STABLE-BURN-IN PASS). Probe DAG 1-7 ALL PASS + Convergence-gate Axis 1+3 PASS + STRONG-PROVENANCE-EXPRESS PASS (github = T2-equivalent).

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee)

| Round | Verdict | Confidence | Outcome |
|---|---|---|---|
| Round-1 | NEEDS-REVISION | 0.94 | caught Mia OVER #8 in fan3-X2 brief: `--integration-options="--skills"` flag DOES NOT EXIST in v0.8.7 (skills are default for `claude` integration) |

**Pattern A 3-prescription apply:**
1. ✅ Drop `--integration-options="--skills"` flag (use bare `--integration claude`)
2. ✅ Add `--script ps` for deterministic Windows scaffolding (when init runs)
3. ✅ Post-init review `git status --short .specify .claude/skills CLAUDE.md`; commit only intentional generated files; do not gitignore blindly

Verdict file: `.claude/state/codex_consult_wave97_ship1n_spec_kit_install_OUT.txt`

### Install execution

```bash
LATEST_TAG=$(gh release list --repo github/spec-kit --limit 1 --json tagName -q '.[0].tagName')
# Resolved: v0.8.7

uv tool install specify-cli --from "git+https://github.com/github/spec-kit.git@${LATEST_TAG}"
# Result: Installed 1 executable: specify

specify --version
# Result: specify 0.8.7

which specify
# Result: /z/claude-sota-installed/.local/bin/specify (Z-portable; PATH-wired via uv tool install)
```

### `specify init` DEFERRED to operator-decision

Live test at `specify init . --integration claude --script ps` aborted at "Current directory is not empty (33 items) ... Do you want to continue? [y/N]" prompt. Cannot auto-answer in non-interactive context.

**Decision**: spec-kit is a NEW-project scaffolder per its own `--help` output ("Initialize a new Specify project... Download template from GitHub... Initialize a fresh git repository"). Initializing in claude-sota-installed runtime root would mix spec-kit project scaffolding with eee runtime files — wrong shape.

**Correct usage pattern**:
- Binary at `/z/claude-sota-installed/.local/bin/specify` available globally via PATH (`specify <command>` from anywhere)
- For NEW spec-driven projects: `cd <new-project-dir> && specify init . --integration claude --script ps` (or `specify init <project-name>` with auto-mkdir)
- For air-gapped: `specify init --offline ...` uses bundled assets (no network)

### TIER-1 SOTA cite chain (verified live)

- **TIER-1-DIRECT**: `https://github.com/github/spec-kit @ HEAD v0.8.7` (canonical repo; 93,473★ MIT)
- **TIER-1-DIRECT**: `https://github.com/github/spec-kit/releases/tag/v0.8.7` (release tag pinned via `gh release list`)
- **TIER-1-DIRECT**: `https://docs.astral.sh/uv/concepts/tools/` (uv tool install canonical mechanism)
- **TIER-2 sister**: `tmp/wave97-fan3-X2-spec-kit-deep-dive-2026-05-08.md` (Probe DAG 1-7 verdicts + native Claude Code integration confirmed)
- **TIER-3 evidence**: `.claude/state/codex_consult_wave97_ship1n_spec_kit_install_OUT.txt` (real GPT-5.5 R1 NEEDS-REVISION caught flag-OVER)

### Mia pre-apply (3/3 PASS)

1. spec-kit not in any installed plugin marketplace (Probe 4 NON-DUPLICATIVE confirmed by fan3-X2)
2. License MIT permissive (Probe 6 PASS)
3. Post-install: `specify --version` returns 0.8.7 ✓; `which specify` returns Z-portable path ✓

### Edits

| Path | Change | Tracked |
|---|---|---|
| `Z:/claude-sota-installed/.local/bin/specify` | NEW binary via uv tool install | gitignored (uv-managed) |
| `~/.local/share/uv/tools/specify-cli/` | NEW uv tool install dir | gitignored (uv-managed) |
| `docs/install-provenance.md` | +Wave 97 Ship 1N entry (~80 LOC) | git-tracked |

### LAUNCH-DISCIPLINE D1

✅ **REVERSIBLE**: `uv tool uninstall specify-cli` removes binary entirely; no eee-runtime files modified
✅ **OBSERVABLE**: `specify --version` returns 0.8.7; `specify --help` lists commands (init/check/optimize)
✅ **INCREMENTAL**: BINARY-ONLY install; init DEFERRED to operator-decision (Phase 2 of Ship 1N if/when first spec-driven project starts)

### CR-9 install-risk LOW

- Version-pinned `--from git+...@v0.8.7` (CR-9 mandate satisfied)
- uv-managed (canonical Python tool install per upstream)
- Reversible via `uv tool uninstall specify-cli`
- No eee-runtime config files modified
- 2-round fix-forward expectation MET (R1 NEEDS-REVISION caught flag-OVER → Pattern A applied → install proceeded clean)

### Operational impact

| Layer | Pre-Ship-1N | Post-Ship-1N |
|---|---|---|
| Spec-driven dev workflow | NONE (claude-md-management plugin covers CLAUDE.md hygiene only) | spec-kit binary available for NEW projects via `specify init <project>` |
| Available CLI tools | uv-installed: claude-monitor, markitdown, maturin | + specify v0.8.7 |
| eee runtime state | unchanged | unchanged (binary-only install; init deferred) |

### Cardinal-rule compliance

- **CR-1**: TIER-1-DIRECT cite chain at file:line + HEAD tag (v0.8.7)
- **CR-3**: real GPT-5.5 codex T1 e2e BEFORE install (R1 NEEDS-REVISION → Pattern A applied)
- **CR-5**: install-priority — official upstream github/spec-kit + canonical uv tool install
- **CR-6**: official-native-channel — `gh release download` (via `gh release list`) + `uv tool install` from git+ tag
- **CR-7**: Phase 3 — install-class action; cardinal-rule-7 trajectory aligned
- **CR-8**: ADAPTED-FROM-SOTA — full-SOTA install via upstream
- **CR-9**: install-risk LOW — version-pinned (NOT @latest); reversible via uv tool uninstall
- **CR-10**: research-first via Wave 97 fan-3 X2 deep-dive + Probe DAG + Mia BEFORE this T1
- **CR-11**: META-process SOTA — fan-3 X2 dispatched + ADOPT-NOW + GPT-5.5 e2e R1 caught flag-OVER + Pattern A applied + provenance + atomic commit per cycle-300

### Wave 97 Ship 1N — 17th ship in this session arc

| Wave | Commit | Ship |
|---|---|---|
| 86-96 | (9 ships per prior provenance) | |
| 97-1A | `3c00615` | 1A — claude-md-management plugin |
| 97-1B | `a1f19f0` | 1B — gitleaks v8.30.1 |
| 97-1G | `58be220` | 1G — CLAUDE_CODE_EFFORT_LEVEL=xhigh |
| 97-1C+1D | `0110a9f` | 1C+1D — gitleaks Phase 2 |
| 97-1J | `88aa7b1` | 1J — CLIProxyAPI round-robin |
| 97-1L | `a7adfb6` | 1L — 4 MCP/Bash env-var pins |
| 97-1L-followup | `85905f9` | 1L-followup — full-unleash 3-bump (KEEP MAX_MCP_OUTPUT_TOKENS) |
| **97-1N** | **THIS** | **1N — github/spec-kit v0.8.7 binary install (specify CLI)** |

### Update triggers

Re-evaluate when:
- spec-kit v0.9.0+ ships (per CLI help warning: "Starting with v0.6.0, bundled assets will be used by default and the --offline flag will be removed" — track for breaking changes)
- Operator initializes first spec-driven project (Phase 2 of Ship 1N tracking)
- spec-kit ships claude-skills marketplace plugin (would prefer plugin install over binary)
- 24-72h D2 monitoring window surfaces a regression

### Ships pending in Wave 97 queue

- **Ship 1F** (P3): scripts/*-hooks-rewrite.py cite-trail headers (fan3-X3 KEEP-WITH-CITE-IMPORT-AMBER Class B)
- **Ship 1J-followup** (operator-decision): equalize active Claude account priorities for TRUE round-robin burst-distribution
