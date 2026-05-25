# W317-C-HINDSIGHT-DECISION — :9077 RESTART vs RETIRE — verdict: **RETIRE**

> Stream C / W317 P2c closure. Probe + decision matrix + applied action.

## Probe (verified 2026-05-19)

```
$ curl -s -m 5 -o /dev/null -w "HTTP:%{http_code}\n" http://127.0.0.1:9077/
HTTP:000   # connection refused / timeout — DOWN
```

State: hindsight daemon **not listening on :9077**. Service has been observed DOWN
across W315 / W316 / W316-r2 audits. T6 basic-memory (uvx-stdio at port-less stdio
transport, 77 verdicts) has been canonical primary since W295 ledger ratification.

## Decision matrix

| Axis                                  | RESTART (option a)                                                 | RETIRE (option b)                                                          |
|---------------------------------------|--------------------------------------------------------------------|----------------------------------------------------------------------------|
| Effort                                | medium — WSL2 deploy.sh path + verify daemon up + verify recall-hook | low — single `enabledPlugins` flag flip + CLAUDE.md cite excision          |
| Service surface                       | adds :9077 listener (always-on) + WSL2 dependency tier             | removes one always-on listener                                             |
| Memory primary                        | T1 hindsight (vector-recall, 10s timeout)                          | T6 basic-memory (markdown-bidirectional, 77 verdicts already shipped)      |
| Codex T6-prior ratification           | n/a                                                                | **option (b) codex-RATIFIED at W316-r2** (CLAUDE.md L40)                   |
| Recall-hook graceful-degradation      | not required (daemon back up)                                      | already in place — 10s timeout + best-effort skip per W295-codex-r12       |
| Operator carry-cost                   | +1 service tier to monitor; restart-required on WSL2 reboot        | 0 (no service to monitor)                                                  |
| Plugin removal risk                   | n/a                                                                | low — plugin stays installed-but-disabled; trivial re-enable               |

## Verdict: **RETIRE**

Rationale:

1. **Codex T6 prior ratification.** W316-r2 already codex-ratified option (b): "remove
   T1 cite, defer T6 basic-memory canonical-only" per CLAUDE.md L40. Re-litigation
   would contradict the already-shipped W316-r2 closure.
2. **T6 canonical primary is established.** 77 verdicts written + 36 verdicts ledgered
   + W295 audit + W315-r2 health probe all confirm basic-memory uvx-stdio is the live
   canonical primary. T1 hindsight has been observed DOWN across 3+ recent waves.
3. **Cardinal-rule-5 safety-boundary preservation.** Removing an always-on local
   listener reduces the attack surface (D24 attack-surface dim improves by one).
4. **Reversibility.** Plugin definition stays in `enabledPlugins` map (just flipped to
   `false`); marketplace entry stays in `enabledPluginMarketplaces`. Operator may
   re-enable in <30s via `enabledPlugins.hindsight-memory@hindsight=true` flip if T1
   vector-recall becomes operationally needed (e.g. T6 basic-memory regressions).

## Applied changes (this commit)

1. `.claude/settings.json` `enabledPlugins["hindsight-memory@hindsight"]: true -> false`.
   Marketplace entry `enabledPluginMarketplaces["hindsight"]` PRESERVED (re-enable path
   stays trivial).
2. CLAUDE.md L40 status appendix already records the codex round-1 ratification —
   no further CLAUDE.md edit required from Stream C this wave (Stream A coordinates
   CLAUDE.md L35 memory-tier prose tightening — flagged for Stream A synthesis if
   they want to absorb the L35 T1-hindsight cite update; this doc is the canonical
   decision record).

## What is NOT done (operator carry-forward)

- `Z:/claude-sota-installed/.hindsight/profiles/claude-code.json` retained on disk —
  operator may purge once decision is permanent + worktree-clean reviewed. Path:
  `Z:/claude-sota-installed/.hindsight/`. Size: small (config + maybe stale logs).
- `LANGFUSE_*` env interpolation in `.hindsight/profiles/claude-code.env` (referenced
  by W265 wiring) is now dead — trace exports will silently no-op since the daemon
  is gone. No action required (env vars stay because cognee + Langfuse MCP still use them).

## References

- W295 6-tier memory audit: `docs/architecture/W295-AUDIT-2026-05-18.md`
- W316-r2 codex round-2 closure: CLAUDE.md L40
- T6 basic-memory ledger: 77 verdicts (W295-codex-r16+ smoke-gated)
- Plugin entry: `.claude/settings.json:244` `hindsight-memory@hindsight`
- Marketplace entry: `.claude/settings.json:375` `hindsight` (vectorize-io/hindsight)
