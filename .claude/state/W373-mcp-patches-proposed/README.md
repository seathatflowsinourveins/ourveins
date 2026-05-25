# W373 MCP Wire Proposals — Pending Operator Sign

**Wave**: W373
**Drafted**: 2026-05-22
**Drafted by**: W373 X3 SOTA MCP wire-proposal drafter
**Status**: PROPOSED-NOT-APPLIED (audit-trail only)

These are PROPOSED `.mcp.json` patches drafted by W373 Stream B convergence + X3 prep agent. **NOT applied** to `.mcp.json`. Apply only via operator-sign in `OP-SIGN.md` (target rows OP-13 + OP-14).

---

## Files in this directory

| File | Subject | Stream B finding | sca-draft | Risk class |
|---|---|---|---|---|
| `composio.json` | ComposioHQ/composio MCP HTTP wire proposal | W373-B-F002 | 4.5/5.0 | LOW (MIT, additive, no new npm deps; SaaS-backend trust-on-Composio) |
| `agentmemory.json` | rohitg00/agentmemory MCP stdio wire proposal | W373-B-F001 | 4.2/5.0 | MEDIUM (Apache-2.0 + SLSA-attested, but rapid-iteration + solo-maintainer + iii-sdk transitive dep — REQUIRES socket.dev + SLSA pre-audit + smoke-test in worktree before apply) |

---

## Convergence sources used (3-org-distinct per sca-v17)

- `mcp__deepwiki__ask_question` — 2 repo probes (ComposioHQ/composio + rohitg00/agentmemory)
- `mcp__exa__web_search_exa` — 2 queries (8 results each)
- `mcp__firecrawl__firecrawl_search` — 2 queries (8 results each)
- `npm_registry_direct_curl` — 3 endpoints (`@agentmemory/mcp/latest`, `@agentmemory/agentmemory/latest`, `@agentmemory/mcp` all-versions list)
- `gh_api_repos` — 2 direct probes (live star counts + license + pushed_at + archived/disabled flags)
- `mcp__perplexity__perplexity_search` — UNAVAILABLE 2026-05-22 (HTTP 401 insufficient_quota; non-blocking since 5 other distinct sources met 3-org floor with margin)

---

## Apply procedure (after operator-sign)

For each `.json` proposal file:

1. **Read** the JSON file at `.claude/state/W373-mcp-patches-proposed/<name>.json`
2. **Complete `pre_apply_required` steps** in order (socket.dev / SLSA / OP-SIGN / smoke-test). For agentmemory ALL 4 steps are blocking; for Composio only operator-sign + smoke-test curl are required.
3. **Apply** the `proposed_patch.value` to `.mcp.json` at the path in `proposed_patch.target_path`. Use the native CC tool surface (e.g., `claude mcp add ...`) OR direct JSON edit per the operator's preference. Both are valid per the CC mcp docs.
4. **Add operator-action env vars** to `CLAUDE.local.md` per the `operator_action_required.claude_local_md_addition_block_section_f<N>` field. The .json file enumerates the exact lines + section anchor.
5. **Verify pre-commit gates pass** (gitleaks + ruff + shellcheck + cr2-2kb-hooks + msys-hooks-form + z-phantom-guard + bare-subagent-grep + npm-audit + cr7-worktree-collision + wave-lock-validate; codex-verdict trailer for commit-msg).
6. **Smoke-test** per `verification_after_apply`:
   - Restart Claude Code session.
   - Run `claude mcp list` and `/mcp` to confirm the new MCP entry shows status=connected.
   - Probe a benign tool (e.g., `COMPOSIO_CHECK_ACTIVE_CONNECTIONS` or `memory_sessions`).
7. **Mark OP-SIGN row APPROVED** with: commit SHA + smoke-test evidence (output of `claude mcp list` showing the new entry connected).

---

## Defer / decline procedure

If operator declines or defers:

- **Decline**: Edit the JSON, set `"status": "DECLINED-BY-OPERATOR-<YYYY-MM-DD>"` + add `"decline_rationale": "<text>"`. Leave the file in this directory as audit-trail evidence per cardinal-rule-6 verify-before-claim discipline. Commit the file with the decline annotation.
- **Defer**: Edit the JSON, set `"status": "DEFERRED-TO-W<N+1>-OPERATOR-<YYYY-MM-DD>"` + add `"defer_until_condition": "<text>"` (e.g., 'defer until agentmemory v1.0 stable', 'defer until socket.dev shows zero alerts'). Leave file in place; next-wave operator agent will pick up.

---

## Rollback procedure (after apply, if regression detected)

Both proposals have a `rollback` block specifying reversibility class HIGH (additive-only; no shared-state mutations). Steps:

1. Delete the new key from `.mcp.json:mcpServers`.
2. Delete the env-block from `CLAUDE.local.md`.
3. (agentmemory only) Stop the standalone server or NSSM service.
4. Restart Claude — new session will lack the MCP entry.
5. Optional cleanup: remove local data dirs (agentmemory only — `~/.agentmemory/`).

Expected rollback time: < 2 minutes per proposal.

---

## Conflicts / blockers detected during convergence

### Composio
- **None blocking.** Multi-MCP convergence is UNANIMOUS on canonical URL (`https://connect.composio.dev/mcp`) and header (`x-consumer-api-key`). The LANDSCAPE.md §8.6 quoted form (`mcp.composio.dev/composio/server/{id}/mcp` with `x-api-key`) is a LEGACY per-server form for a DIFFERENT use case (single-toolkit MCP). Both currently respond live but the proposed `connect.composio.dev/mcp` is the recommended stable form for general Claude Code use.

### agentmemory
- **deepwiki cache stale by 1 release**: deepwiki reported latest version as `0.9.20`; npm registry dist-tag `latest` confirms `0.9.21`. RECONCILED: patch pins to `0.9.21` per authoritative npm-registry probe.
- **Star count drift**: Stream B quoted 16,347 stars; live re-probe 2026-05-22 shows 16,358 (+11 in same day). Both values within +/-1% (viral curve continues). Patch text uses the live 2026-05-22 value (16,358).
- **No CVE-class blockers** detected at coverage limit. socket.dev + snyk auto-probes NOT executed per scope constraint — operator MUST run these per `pre_apply_required` step 1 in `agentmemory.json`. If socket.dev shows any HIGH/CRITICAL alert on `@agentmemory/mcp`, `@agentmemory/agentmemory`, OR `iii-sdk`, the apply is BLOCKED until resolution.

---

## Verify-before-claim attestation (per CLAUDE.md Cardinal Rule 6)

Every claim in `composio.json` and `agentmemory.json` carries a probe-based evidence anchor:
- `mcp__deepwiki__ask_question` direct quotes
- `mcp__exa__web_search_exa` URL hits + quoted page text
- `mcp__firecrawl__firecrawl_search` URL hits + quoted page text
- `npm_registry_direct_curl` JSON probe outputs (dist-tags + license + provenance + signatures)
- `gh_api_repos` JSON probe outputs (stars + license + pushed_at + archived/disabled)

Each `verify_before_claim_attestation` block in the JSONs enumerates each substantive claim with its evidence anchor + `VERIFIED` / `VERIFIED-AT-COVERAGE-LIMIT` / `VERIFIED-AS-SELF-REPORT` status.

---

## Coordinator pointers

- **Parent operator goal**: W373 SOTA catalog cross-check + named-repo wire-proposal drafting
- **Sibling Stream B output**: `Z:/claude-sota-installed-W373/.claude/state/W373-stream-B-sota-catalog-gapfind.md`
- **Sibling Stream B ledger**: `Z:/claude-sota-installed-W373/docs/architecture/W373-SOTA-READY/CATALOG-CROSS-CHECK-LEDGER.md`
- **Sibling Stream B findings**: `Z:/claude-sota-installed-W373/docs/architecture/W373-SOTA-READY/W373-FINDINGS.md`
- **OP-SIGN.md** (operator sign-off ledger): `Z:/claude-sota-installed-W373/OP-SIGN.md` (target rows OP-13 for Composio + OP-14 for agentmemory)
- **Next-wave consumption**: W374 should pick up either or both APPROVED proposals + run the apply pipeline; DECLINED/DEFERRED proposals remain in this directory as audit-trail.

---

**End of W373 MCP wire-proposal package. Awaiting operator sign.**
