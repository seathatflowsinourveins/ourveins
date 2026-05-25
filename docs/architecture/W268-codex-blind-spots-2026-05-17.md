# W268 Codex Adversarial Blind-Spot Audit — 2026-05-17

## 1. SECURITY POSTURE — GAP-FOUND (P0)

Secrets are still config-resident: `.mcp.json:96-99` and `.mcp.json:126-129` contain Langfuse public/secret keys, while `.hindsight/profiles/claude-code.env:24-25` carries the same secret class; `.gitignore:202-203` ignores `.hindsight/` but not `.mcp.json`. `W262-codex-cross-review-2026-05-17.md:8` documents a prior Hindsight OpenAI-key backup, and `W262-final-synthesis-2026-05-17.md:37,97,103` only recommends optional cleanup, not rotation. `.claude/settings.json:49-60,72` allows broad install commands and keeps `defaultMode: "bypassPermissions"`; gitleaks is advisory-only with `--exit-code 0` at `.claude/settings.json:86-93`.

## 2. BACKUP AND DISASTER RECOVERY — GAP-FOUND (P1)

The stateful stack is mostly named Docker volumes: Langfuse Postgres at `Z:/claude/observability/docker-compose.yml:223-224`, Phoenix at `:337-339`, FalkorDB at `:389-390`, and declared volumes at `:400-409`. Hindsight/pg0 remains contradictory: `HINDSIGHT-RECOVERY-2026-05-17.md:3` says a Z: junction superseded rollback, while `:58-60` records C:-resident pg0 rollback. I found no backup/restore runbook for those volumes or `.pg0`; if Z: dies, the docs describe architecture, not recovery.

## 3. UPDATE CADENCE / SUPPLY CHAIN — GAP-FOUND (P1)

There is partial pinning: `serena` is SHA-pinned in `.mcp.json:49-52`, and FalkorDB is digest-pinned with an upgrade procedure in `Z:/claude/observability/docker-compose.yml:352-374,382-384`. But W262 still records HEAD-based pulls for ik_llama, hindsight, and ollama (`W262-final-synthesis-2026-05-17.md:146-148`), while `.claude/settings.json:54-59` allows fresh npm/uv/gh/docker/cargo installs. No W262-W268 doc I read defines a mandatory CVE scan, SBOM artifact, or pinned-commit policy beyond cite pins.

## 4. NETWORK EGRESS AUDIT — GAP-FOUND (P1)

Actual egress is broad: GitHub Copilot MCP, Context7, and DeepWiki are external HTTP endpoints in `.mcp.json:16-32`; `tools/eee.ps1:180-213,570-575` routes Claude through local proxies to Anthropic or direct OAuth; W267 prescribes Hugging Face downloads (`W267-all-gaps-resolved-2026-05-17.md:51-58`). npm/global install channels are explicitly allowed in `.claude/settings.json:54-60`. I found no single egress inventory enumerating services, credentials, data classes, and allowed domains.

## 5. MULTI-MACHINE BOOTSTRAP — GAP-FOUND (P2)

The Z:-portable claim depends on machine-local paths: `CLAUDE.local.md:31` requires Git Bash on C:, `CLAUDE.local.md:13,45-47` requires Z: venv/state roots, `.mcp.json:37,42,105,124` points at user-specific Node paths and a sibling `Z:/claude-sota-installed-repos` path. `tools/eee.ps1:245-250` still has a parent `Z:\claude\` fallback/error path. I found no fresh-Windows bootstrap transcript proving copy-and-run portability.

## 6. AUTO-RECOVERY — GAP-FOUND (P1)

Docker covers some services with restart policies (`Z:/claude/observability/docker-compose.yml:111,189,207,339,396`), and W267 adds VRAM/backlog alerts (`W267-vram-alert-wiring-2026-05-17.md:26-39`). But W265 says Hindsight is unsupervised and pg0 coupled to the daemon (`W265-service-management-sota-2026-05-17.md:67-73,84-97`), and W267 confirms Cognee was paused/unreachable (`W267-codex-e2e-verification-2026-05-17.md:3,7,15`). Alerts detect failure; they do not restart :8080, Hindsight, Cognee, or pg0.

## 7. CC AUTOCOMPACT BEHAVIOR — GAP-FOUND (P2)

`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80` is set in `.claude/settings.json:25` and documented as sole authority in `CLAUDE.local.md:57`. The same settings file says PostCompact priority reinjection was explicitly deferred (`.claude/settings.json:319`). W262 documented Codex cross-review fidelity problems and stale contradictions (`W262-codex-cross-review-2026-05-17.md:1-23`), but I found no W262-W268 preservation test proving critical findings survive compact.

## 8. HINDSIGHT LLM PROVIDER FAILURE-MODE — GAP-FOUND (P1)

Hindsight is hard-routed to the local 35B at `.claude/settings.json:41-44` and `.hindsight/profiles/claude-code.env:1-4`. W267 adds an alert for stalled Hindsight LLM calls with backlog (`W267-vram-alert-wiring-2026-05-17.md:26,37-39`), but that is detection only. I found no fallback provider, circuit breaker, degraded recall-only mode, or queue backoff policy if `:8080` dies.

## Top 3 Critical Gaps

1. **Rotate and externalize secrets.** Revoke the Langfuse keys and any prior OpenAI key, move secrets out of tracked `.mcp.json`, and make gitleaks blocking instead of advisory.

2. **Create a real DR runbook.** Back up `.pg0`, `.hindsight`, `.mcp-memory`, and all Docker named volumes to non-Z storage, then perform one restore drill on a clean host.

3. **Supervise the inference/memory chain.** Put :8080, Hindsight, pg0, Cognee, and llama-swap under a health-checking supervisor with restart policy and explicit fallback behavior.

## One Thing 8 Waves Consistently Missed

The waves optimized the runtime as if “live right now” were equivalent to “operable tomorrow.” They repeatedly proved point-in-time health, pins, and wiring, but did not close the boring operational contract: secret lifecycle, backup restore, fresh-machine bootstrap, egress inventory, restart semantics, and degraded modes.
