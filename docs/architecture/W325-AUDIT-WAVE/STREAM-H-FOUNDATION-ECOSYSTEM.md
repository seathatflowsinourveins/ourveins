# W325 Stream H — Foundation Ecosystem Audit

**Wave**: W325 deep-audit (8-agent parallel; H = foundation ecosystem). **Date**: 2026-05-19.
**Methodology**: ctx_batch_execute (24 cmds / 3 rounds) + deepwiki (compose-spec, jdx/mise) + perplexity (awesome-cli 2026) + FS reads on CCBP + ECC.

## 1. Docker / Compose
Cite: compose-spec/compose-spec deepwiki; docker 29.4.3 + compose v5.1.3 verified.
**SOTA**: (a) healthcheck (CMD-SHELL list-form + start_period + start_interval); (b) depends_on.condition: service_healthy + restart: true (v2.17.0+); (c) secrets long-syntax (source/target/uid/gid/mode) + external: true; (d) deploy.resources.{limits,reservations}.{cpus,memory}; (e) profiles for selective activation.
**Gaps**: G1 HIGH — CLAUDE.md L13 references `Z:\claude\observability\docker-compose.yml` but **file does not exist** (zero compose files anywhere in tree); G2 MED — services run ad-hoc / NSSM, no profiles discipline.
**P-H1**: author `Z:/claude-sota-installed-state/observability/compose.yaml` Spec v3.9+ with profiles `[obs,memory,llm]`. **Inverse**: `docker compose -f .../compose.yaml config --quiet` =0 AND all services .Health=healthy.

## 2. mise toolchain
Cite: mise.jdx.dev deepwiki; local 2026.5.3 (2026.5.12 advisory pending).
**SOTA**: (a) `mise.lock` reproducibility (checksums + URLs + provenance slsa/cosign; `MISE_LOCKED=1` strict); (b) `[hooks.enter]` + task-form for project-on-enter activation; (c) `[tasks.*]` runbook-as-code (parallel deps + last-modified + `mise watch`); (d) CalVer self-update; (e) backend matrix (aqua > ubi > asdf/npm/cargo/pipx).
**Gaps**: G3 HIGH — `mise.lock` **does not exist** (W324 P6 wired mise.toml, never ran `mise install`); G4 MED — no `[hooks.enter]` and zero `[tasks.*]` entries (no runbook-as-code surface); G5 LOW — calver self-update 2026.5.3→2026.5.12 not actioned.
**P-H2**: `mise install && mise lock --update`; add `[hooks.enter]` + `[tasks.{shipgate,doctor,observability-up}]`; `mise self-update`. **Inverse**: `mise.lock` exists AND `mise tasks ls` ≥3 entries.

## 3. Git workflow
Cite: git-scm.com docs; git 2.51.0, lazygit 0.60.0, gh 2.92.0 verified.
**SOTA**: (a) Conventional Commits + commitlint commit-msg (config-conventional + ship/wip types — wired); (b) `pull.rebase=true` + `push.useforceifincludes=true` (force-with-lease, no bare --force); (c) SSH-key signed commits (`gpg.format=ssh` + `commit.gpgsign=true`); (d) git-lfs for binary tracking; (e) lazygit TUI + opinionated aliases (`ss`/`lg`/`ca`/`wt`).
**Gaps**: G6 MED — `commit.gpgsign` NOT set, `gpg.format` absent (no signed commits); `pull.rebase` duplicated false+true (last-wins); G7 MED — git alias count = **0** (`config --get-regexp '^alias\.'` empty); G8 LOW — `.gitattributes` git-lfs filters unaudited; G9 LOW — lazygit installed but no `~/.config/lazygit/config.yml`.
**P-H3**: enable SSH signed commits + add 8 aliases + lazygit config. **Inverse**: `git log --show-signature -1` =GOOD AND alias count ≥6.

## 4. awesome-cli-apps
Cite: agarrharr/awesome-cli-apps + perplexity 2026.
**SOTA installed**: bat 0.26.1 · delta 0.18.2 · fd · rg · fzf · zoxide · jq · yq · btm (bottom) · hyperfine 1.20.0 · xh · dust 1.2.4 · lazygit 0.60.0. **2026 picks** (perplexity): xh (HTTP) + btm + hyperfine + jless + dog.
**Gaps**: G10 MED — `lazydocker` NOT installed (TUI trio lazygit+lazydocker+btm incomplete; misses W324 P6 docker integration); G11 MED — `fx`/`jless` NOT installed (multi-MB JSON traces from langfuse+phoenix telemetry lack streaming pager); G12 LOW — `dog` (DNS) not installed.
**P-H4**: `winget install jesseduffield.lazydocker PaulJuliusMartinez.jless ogham.dog`; add to `mise.toml [tools]` via `ubi:` backend. **Inverse**: `where lazydocker jless dog` = 3 paths.

## 5. CCBP integration depth
Cite: `Z:/repos/deps/claude-code-best-practice-shan/` HEAD `48798ca6877` (2026-05-18) — CLAUDE.md L3 cite verified accurate.
**SOTA**: 8 discipline files — `claude-cli-startup-flags.md` · `claude-commands.md` (20KB, May-19 fresh) · `claude-mcp.md` · `claude-memory.md` · `claude-power-ups.md` · `claude-settings.md` (90KB, May-19 fresh; documents 60+ settings + 180+ env vars at v2.1.139) · `claude-skills.md` (15 frontmatter fields incl. when_to_use/paths/context:fork/hooks) · `claude-subagents.md`.
**Gaps**: G13 MED — `claude-commands.md` (20KB, fresh) **NOT cited anywhere** in CLAUDE.md or local skills (runtime has slash commands but no CCBP anchor); G14 LOW — settings.json 15,964B breaches W317-A 15,360B cap; `claude-settings.md` fresh size-budget guidance unused; G15 LOW — `claude-power-ups.md` orphan/never referenced.
**P-H5**: add `claude-commands.md @ <sha>` cite to CLAUDE.md L34; apply size-budget guidance to settings.json; read power-ups for unwired primitives. **Inverse**: `grep -c 'claude-commands.md' CLAUDE.md` ≥1 AND settings.json ≤15,360B.

## 6. ECC integration depth
Cite: `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/` @ SHA `8148340a` (`installed_plugins.json`; upstream advanced to `98bd517451` per W319-D STALE-D-3).
**SOTA**: (a) **232 skills + 75 commands + 60 agents** at plugin root; (b) `hooks/hooks.json` ships PreToolUse/PostToolUse/SessionStart/Stop with hook-IDs via `plugin-hook-bootstrap.js`; (c) ECC `.mcp.json` ships 6 MCP servers (github, context7, exa, memory, playwright, sequential-thinking) with pinned versions; (d) `.claude/rules/` ships rules dir (cardinal-rule-4 W308-reversal compliant).
**Gaps**: G16 HIGH — `ECC_DISABLED_HOOKS` in settings.json:13 disables **8 hooks** including `cost-tracker`, `evaluate-session`, `desktop-notify` — under-leveraged observability surface; rationale undocumented; G17 MED — ECC `sequential-thinking@2025.12.18` MCP server NOT wired into runtime `.mcp.json` (runtime has 11 servers, none sequential-thinking); G18 MED — ECC `/quality-gate`, `/harness-audit`, `/loop-start`, `/multi-execute`, `/multi-plan` slash commands never exercised in W319-W325; G19 LOW — installed SHA `8148340a` ≠ upstream `98bd517451` (interactive `/plugin update` pending).
**P-H6**: (a) re-enable `cost-tracker` + `evaluate-session`; (b) wire `sequential-thinking` MCP @2025.12.18; (c) exercise `/quality-gate` + `/harness-audit` next wave; (d) `/plugin update` ECC. **Inverse**: `ECC_DISABLED_HOOKS` ≤6 entries AND `.mcp.json` contains `sequential-thinking` AND ECC gitCommitSha = `98bd517451`.

---
**Summary**: 19 gaps (3 HIGH G1/G3/G16 · 9 MED · 7 LOW); 6 P-block recs (P-H1..P-H6) with falsifiable-inverses. **Top W325 P0**: G1 compose-file-missing + G3 mise.lock-missing + G16 ECC-hooks-disabled-rationale.
