# W373-F002 — Jury Request Brief

**Finding ID**: W373-F002
**Source stream(s)**: E (F-F004 + F-F005 merged), connects to F009, F075
**Risk-class**: HIGH (CRITICAL subset)
**sca-v18**: 1.5 (decomposed: D101=1.5 · D102=1.5 · D103=2.0 · D104=1.0 · D105=1.5)
**Remediation type**: settings_surgery (docker compose recovery)

## Subject
Langfuse :3000 web tier is in CRASH LOOP because the `langfuse-postgres` container is missing from `docker ps`. CLAUDE.md L36 claim "T5 langfuse ✓ LIVE v3.174.1" is FALSE-by-evidence — CR-6 verify-before-claim regression.

## Evidence (cite-anchored)
- `docker ps` → `langfuse-web ... Restarting (1) 19 seconds ago` (Stream E §Memory-tier matrix T5 row).
- `docker logs langfuse-web` → `Can't reach database server at langfuse-postgres:5432 ... Error: P1001`.
- `docker ps | grep langfuse-postgres` → empty (container missing from stack).
- `Test-NetConnection 127.0.0.1 -Port 3000` → `TcpTestSucceeded: False`.
- `curl http://127.0.0.1:3000` → connection refused.
- Worker + redis + clickhouse containers all `Up 2 hours (healthy)` — only postgres tier is gone.
- CLAUDE.md L36 cite: `T5 langfuse ✓ LIVE v3.174.1 (W370 Stream B + Stream D + codex r1 F6 re-probed 2026-05-22)` — Stream E re-probe contradicts.

## Proposed remediation
1. Locate compose file: `Z:/claude-hub/observability/docker-compose.yml` (W333-P0-b stack-recovery migration target; verify file present).
2. `docker compose up -d langfuse-postgres` to restart missing container.
3. Wait for Prisma migrations to re-apply (web container will auto-reconnect when postgres tier is up).
4. Verify recovery: `curl -sS http://127.0.0.1:3000/api/public/health` → expect 200.
5. Coalesce F075 (OTEL :3000 reachability) — auto-resolves once :3000 alive.
6. Edit CLAUDE.md L36 to mark T5 status correctly (LIVE or DEGRADED depending on outcome).

## Risks of the proposed remediation
- Docker compose recovery may fail if compose-file path drifted again (W333 migration history).
- Prisma migrations may not auto-apply cleanly if schema has advanced beyond `v3.174.1` image expectations.
- T5 memory tier may have lost trace data during the crash window (consult Langfuse data persistence settings).
- Postgres data volume status unknown — may require `docker volume ls | grep langfuse` audit first.

## Rollback steps
1. `docker compose down` to stop entire Langfuse stack.
2. Restore CLAUDE.md L36 to PRE-edit state ("LIVE" claim) — actually NOT recommended; the cite must reflect actual state per CR-6.
3. If postgres recovery fails, mark T5 RETIRED-DEGRADED in CLAUDE.md L36 + open follow-up wave for re-instantiation.

## Cardinal-rule + spec alignment
- Cardinal-rule 6 (verify-before-claim): YES — CR-6 regression is the root finding.
- Cardinal-rule 5 (safety boundaries): YES — observability tier health is part of layered defense.
- W373 spec §Top-jury-priority sca<2.0: aligns with the #2 jury candidate by ascending sca.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — Re-run `docker ps` + `curl http://127.0.0.1:3000`.
2. Is the proposed remediation proportional? — YES; restoring the missing container is the minimal fix.
3. False-positive paths? — Could langfuse-postgres be running under a different container name? Probe: `docker ps -a | grep postgres`. If found-stopped, action is `docker start <name>` not `docker compose up`.
4. Does rollback actually restore prior state? — Pre-fix state IS the crash loop; rollback is "leave broken" + mark CLAUDE.md DEGRADED.
5. What changes after this fix that wasn't anticipated? — F009 (langfuse-mcp-server abandoned-RC) may surface that even with backend recovered, the MCP wrapper itself is dead — coalesce decision needed.
