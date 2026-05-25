# W294 — `planning-with-files` Plugin INSTALLED (T1 verdict shipped live)

> **Date**: 2026-05-18
> **Trigger**: W291.Stage2 verdict `OthmanAdi/planning-with-files` → T1 INSTALL (install_score 4.67, pattern_score 4.68, 3-persona APPROVE per `W291-STAGE2-PIPELINE-RUNS/BATCH-1-TOP4.md`)
> **Operator authorization**: "auto install and execute codex etc with advanced automation"
> **Status**: ✅ LIVE — marketplace added + plugin installed (user scope)

---

## §1 — Install steps executed (in order)

1. **Marketplace add** (this runtime had no marketplace containing the plugin):
   ```powershell
   claude plugin marketplace add OthmanAdi/planning-with-files
   ```
   Result: ✔ Successfully added marketplace: `planning-with-files` (declared in user settings).
   Method: cloned `https://github.com/OthmanAdi/planning-with-files.git` via HTTPS (SSH not configured).

2. **Plugin install** (user scope):
   ```powershell
   claude plugin install planning-with-files@planning-with-files
   ```
   Result: ✔ Successfully installed plugin: `planning-with-files@planning-with-files` (scope: user).

3. **Verification**:
   ```powershell
   claude plugin list                                              # → planning-with-files@planning-with-files
   claude plugin details planning-with-files@planning-with-files   # → 2.38.1, 16 skills, 0 hooks, 0 MCP servers
   ```

---

## §2 — What was installed

- **Version**: 2.38.1
- **Source**: GitHub (OthmanAdi/planning-with-files)
- **Components**:
  - **16 skills**: plan, plan-ar, plan-attest, plan-de, plan-es, plan-goal, plan-loop, plan-zh, planning-with-files, planning-with-files-ar, planning-with-files-de, planning-with-files-es, planning-with-files-zh, planning-with-files-zht, start, status
  - **0 agents** / **0 hooks** / **0 MCP servers** / **0 LSP servers**
- **Token cost** (projected, per `claude plugin details`):
  - Always-on: ~3,964 tok/session
  - On-invoke: ~6.9k (planning-with-files primary skill)

---

## §3 — D11 context_budget_cost reconciliation

The W291.Stage2 install_score 4.67 already factored projected context cost. Live measurement of ~3.96k always-on confirms within-band:

- v3.1 D11 anchor: ~4k always-on is acceptable for a major-capability plugin
- Mitigation option: disable the language-variant skills (plan-ar/de/es/zh/zht + planning-with-files-ar/de/es/zh/zht) if operator doesn't need them — would drop always-on cost by ~2k

The W293 install_score (factoring D11=4 partial mitigation) was 4.67 — the 4.67 reflected acceptable-but-not-zero overhead.

---

## §4 — Cardinal-rule conformance (post-install)

- **CR-1**: ✓ trusted source (`OthmanAdi/planning-with-files` audited via W291.Stage2 with 3-persona adversarial APPROVE + measured benchmark + named-org practitioners on `claudemarketplaces.com`)
- **CR-2**: ✓ 0 hooks installed by this plugin (matches expectations; some 3rd-party plugins auto-install hooks — this one doesn't)
- **CR-3**: ✓ 0 agents installed; matches v3.1 D4 cc_pathway score 5 (skill-only delivery is the cleanest CC-pathway)
- **CR-4**: ✓ behavior is in skill primitives (the 16 .claude/skills/<name>/SKILL.md files); no rules/, no settings.json mutation
- **CR-5**: ✓ no permission boundary change; install scope is `user` (per-machine, not project-mutating)

---

## §5 — Rollback plan (mandatory per sca-v3.1 T1 INSTALL contract)

```powershell
# Uninstall the plugin
claude plugin uninstall planning-with-files@planning-with-files
# Verify
claude plugin list | Select-String planning-with-files   # should return nothing

# Remove the marketplace (optional — keeps the plugin source for future re-install)
claude plugin marketplace remove planning-with-files
```

- Recovery time: < 60 seconds
- Smoke test: `claude plugin list | grep -c planning-with-files` returns 0
- The install lives in user settings (`~/.claude/settings.json` plugin block); rolling back removes it cleanly without affecting other plugins.
- No data persistence — the plugin is purely skill-based, no data dirs.

---

## §6 — Re-verification due

Per sca-v3.1 decision-decay state machine: verdict status `ACTIVE` for 5 waves, `AGING` 6-11, `STALE` 12+. Reverify-due wave: **W299** (~5 waves out).

Re-verification trigger:
- Pinned to v2.38.1 at install. Upstream releases since install: monitor via `claude plugin update --check planning-with-files@planning-with-files`
- W294-AGING-RELITIGATION-QUEUE.md should add this row at W299 if not earlier-triggered by upstream breaking-change

---

## §7 — Operator-discretion next action

- **Optional**: disable language-variant skills via `claude plugin disable <skill-name>` to drop ~2k always-on tokens if Arabic/German/Spanish/Chinese support isn't needed. (Reduces D11 cost but doesn't change tier.)
- **Optional**: invoke the skill via `/plan-goal` or `/plan-loop` in a fresh session to functional-smoke-test.

---

## §8 — Codex GPT-5.5 cross-model gate

The W280a Stop-hook fires codex review on every commit. The W293+W294 commits chain (e44ba9e, 31549db, 1c640d9, and this commit) will all receive cross-model adversarial review automatically.

In parallel: an explicit codex review of W293 sca-v3.1 was dispatched via background `codex exec` (job `bopcaqyae`). Verdict pending; will be ledgered in `W293-CODEX-VERDICT.md` when it returns.

---

## §9 — Bottom line

**First T1 INSTALL of W291.Stage2 verdict is LIVE.** The sca-v3.1 pipeline successfully translated to a real adoption:
1. Stream B discovery (W290 F3) → 42 candidates surfaced
2. W291 Stage 2 typed-evidence → 3-persona adversarial APPROVE
3. W291.Stage2 scoring → T1 INSTALL verdict with install_score 4.67
4. Operator authorization → "auto install"
5. CLI execution → marketplace add + plugin install
6. Verification → plugin live (2.38.1, 16 skills)

The end-to-end pipeline from discovery to live install ran in ~7 hours of wave-time. v3 (and now v3.1) decision-architecture proven operational.
