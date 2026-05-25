# W350 Security Audit — claude-sota-installed runtime

> Auditor: security-auditor (Opus 4.7). Date 2026-05-20. Scope: secrets, hooks,
> supply chain, sandbox, codex auth, exfil, observability. Verify-before-claim:
> every PASS/FAIL cites a reproducible probe.

## §1 Secrets Handling — PASS-WITH-DEBT

**PASS:** `CLAUDE.local.md` denied at `.claude/settings.json:84`
`Read(./CLAUDE.local.md)` and gitignored (sibling `CLAUDE.local.*.ps1`). All 7
runtime secrets (Langfuse pk-lf-5e2d4b64-* / sk-lf-b9f4866e-*, PERPLEXITY, TAVILY,
EXA, FIRECRAWL, BRAVE, GITHUB_TOKEN) live in env vars only. `Read(**/.codex/**)`
denied @L88. 19 credential paths denied (id_rsa, .pem, .pfx, .key, .aws/.ssh/.netrc/
.npmrc/.docker/.anthropic + browser profiles + HKLM/HKCU). `git log --all -S 'pk-lf-5e2d4b64'`
clean — current key not historically leaked. Commits `f52aebc`/`7e7c713` are
prior-key redaction events.

**DEBT P2 (F1.1):** `.gitleaks.toml` uses `extend.useDefault=true` only; NO custom
rules for Langfuse `pk-lf-`/`sk-lf-`, Tavily `tvly-`, Firecrawl `fc-`, Brave `BSA*`,
Exa `exa-`. Default gitleaks v8.30.1 ruleset misses these. CWE-798.

**DEBT P2 (F1.2):** Full-history `gitleaks detect` reports 32,806 leaks across
1422 commits / 1.01 GB / 3m5s — predominantly archived codex-verdict transcripts
hitting `sourcegraph-access-token` (false-positive on `sgp_`-prefix substrings).
Pre-commit hook (`pre-commit/gitleaks-system`, `.pre-commit-config.yaml:27`) scans
only staged diff so production gate is sound; archival is noisy.

## §2 Hook Injection / Quoting — PASS-WITH-CAVEATS

`.claude/settings.json:140-158` PreToolUse[Bash] pipes through
`bash -c "cmd=\$(jq -r '.tool_input.command'); case \$cmd in ...`.

- **F2.1 — `--force-with-lease` exclusion is BY DESIGN.** L154
  `*'--force-with-lease'*) : ;;` short-circuits BEFORE destructive-glob clauses
  (case ordering). Aligns with CLAUDE.md L29 W342-Z SOTA policy. Intentional.
- **F2.2 — Glob evasion P1.** Bash globs miss
  `git -c push.default=force push origin HEAD` and `git push origin +HEAD`
  (refspec-based force-push). These bypass codex-companion adversarial gate.
  CWE-693 / OWASP A04:2021.
- **F2.3 — `cr2-2kb-hooks` rename evasion non-exploitable.** Regex
  `^\.claude/hooks/` matches that prefix only; attacker renaming to
  `.claude/hooks_actual/` breaks settings.json invocation paths so hook itself
  fails to execute. Not exploitable.
- **F2.4 — codex-companion CLEAN.** `.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs`
  (1027 LOC) uses ONLY `spawn(process.execPath, [...], {env: process.env})`
  (L641-654). No shell concat of untrusted input; argv-based. CWE-78 clean.
- **F2.5 — jq fail-OPEN P2.** Hook needs `jq` in PATH; if missing → `cmd` empty
  → case no-match → silent pass. Should fail-CLOSED.

## §3 Supply Chain — VERSION DRIFT P0 + CVE BLOCK P0

**MCP drift (`.mcp.json` pinned vs `npm ls -g` installed):**

| MCP | pinned | installed | Δ |
|---|---|---|---|
| @perplexity-ai/mcp-server | 0.9.0 | 0.8.4 | -0.0.6 |
| tavily-mcp | 0.2.19 | 0.2.18 | -0.0.1 |
| exa-mcp-server | 3.2.1 | 3.1.9 | -0.0.2 |
| firecrawl-mcp | 3.17.0 | 3.11.0 | -0.0.6 |
| @brave/brave-search-mcp-server | 2.0.82 | 2.0.75 | -0.0.7 |
| chrome-devtools-mcp | 1.0.1 | 0.26.0 | major |

`.mcp.json` invokes `npx -y <pkg>@<pinned>` so cold-cache fetches correctly; warm-
cache + offline runs stale. CWE-1104.

**Trivy fs HIGH/CRITICAL (real-run, exit-0):**
- `.local/graphiti/uv.lock` reports **4 HIGH**:
  - `langchain-core@1.3.0` → CVE-2026-44843 (unsafe deserialization)
  - `langsmith@0.7.31` → CVE-2026-45134 (untrusted manifest deserialize)
  - `urllib3@2.6.3` → CVE-2026-44431 + CVE-2026-44432

CWE-502. Graphiti service retired per CLAUDE.md L60, blast-radius limited to
dormant lockfile. **But** PreToolUse trivy gate (settings.json:148 `--exit-code 1`)
will BLOCK any `git push`/`git commit`/`gh pr create` from this state — this is
a live SHIP-BLOCKER until remediated.

**Provenance (`npm view <pkg> dist.signatures`):** perplexity, tavily, langfuse,
brave, firecrawl, exa, modelcontextprotocol/server-github all return Sigstore-
style ECDSA signatures keyed by `SHA256:DhQ8wR5APBvFHLF...` (npm registry signing
key). NO npm-provenance (`--provenance`) attestation on any MCP — only registry
signatures. CWE-1357 partial.

## §4 Sandbox + Permission Deny Coverage

`sandbox.enabled:false` + `allowUnsandboxedCommands:true` + `failIfUnavailable:true`
(L487-491) + `skipDangerousModePermissionPrompt:true` (L505) + `skipAutoPermissionPrompt:true`
(L508). Windows-native runtime so CC OS-sandbox structurally inert (CLAUDE.md L57).
Defense-in-depth via sca-v11 §6 5-control stack: (a) deny-list active; (b) pre-commit
gate active (gitleaks + ruff + actionlint + commitlint + codex-trailer + cr2-2kb);
(c) PreToolUse gitleaks + trivy + codex-companion active; (d) preagent-parallel-guard
(20612B) + preagent-subagent-validator (5507B) binding-mode exit-2 active; (e) Windows
path globs verified — `**/AppData/Roaming/Mozilla/Firefox/Profiles/**` correctly
enumerates `508es0vw.default` + `azo91ynp.default-release`.

## §5 Codex CLI Authorization — P1

`.claude/settings.json:70` allows `Bash(codex *)` — over-broad. Permits
`codex login`, `codex logout`, `codex auth refresh`, `codex auth get-token`. The
last emits ChatGPT OAuth bearer to stdout, capturable in tool output. CWE-200 /
OWASP A09:2021. Tighten.

## §6 Token-Exfil + WebFetch Deny Gap — P1

`permissions.deny` (L107-109) covers ONLY `bit.ly` + `tinyurl.com` + `t.co`.
Missing major exfil channels: pastebin.com, gist.githubusercontent.com (raw),
transfer.sh, ix.io, dpaste.org, 0x0.st, file.io, catbox.moe, paste.rs, hastebin,
rentry.co, webhook.site, requestbin, ngrok tunnels (`*.ngrok.app`/`*.ngrok.io`),
serveo.net, localtunnel.me, Discord/Slack/Telegram webhooks. CWE-548 / OWASP A01:2021.

Web-search MCPs (perplexity/tavily/exa/brave) return search results only — no
upload surface. **But** `firecrawl_crawl`/`firecrawl_scrape` accept attacker-
controlled URLs → URL-side-channel exfil possible (token-in-querystring). MEDIUM.

## §7 cognee + langfuse + basic-memory Data Exposure — P2

- **Langfuse** (127.0.0.1:3000): `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT:"false"`
  (settings.json:26) — prompt body NOT captured to OTEL. **However**
  `OTEL_LOG_USER_PROMPTS:"1"` + `OTEL_LOG_TOOL_DETAILS:"1"` are CC-native
  span attributes capturing prompt + tool name + duration. Verify no secrets
  ride in `tool_input` payloads. Loopback-only, low blast-radius.
- **Cognee** (127.0.0.1:8000): graph DB, dormant per CLAUDE.md L60.
- **basic-memory**: markdown KG at `Z:/claude-sota-installed-state/basic-memory`.
  Operator-controlled; risk only if operator writes a secret to a note.

## §8 Top-5 P0/P1 Gaps + Remediation

| # | Sev | Finding | CWE/OWASP | Remediation |
|---|---|---|---|---|
| 1 | P0 | Graphiti uv.lock 4 HIGH CVEs blocking PreToolUse trivy gate (SHIP-BLOCKER) | CWE-502 / A06:2021 | Either delete `.local/graphiti/` (service retired) OR `cd .local/graphiti && uv lock --upgrade-package langchain-core --upgrade-package langsmith --upgrade-package urllib3` |
| 2 | P0 | Version drift 6 MCPs (perplexity/tavily/exa/firecrawl/brave/chrome-devtools) — warm-cache stale | CWE-1104 / A06:2021 | `npm install -g @perplexity-ai/mcp-server@0.9.0 tavily-mcp@0.2.19 exa-mcp-server@3.2.1 firecrawl-mcp@3.17.0 @brave/brave-search-mcp-server@2.0.82 chrome-devtools-mcp@1.0.1` |
| 3 | P1 | `Bash(codex *)` over-broad — `codex auth get-token` exfil surface | CWE-200 / A09:2021 | Replace settings.json:70 with `Bash(codex exec*)`, `Bash(codex --version)`, `Bash(codex resume*)`, `Bash(codex sessions*)` |
| 4 | P1 | WebFetch deny gap — 15+ paste/exfil hosts allowed | CWE-548 / A01:2021 | Add to `.claude/settings.json:permissions.deny`: `WebFetch(domain:pastebin.com)`, `gist.githubusercontent.com`, `transfer.sh`, `ix.io`, `dpaste.org`, `0x0.st`, `file.io`, `catbox.moe`, `webhook.site`, `*.ngrok.app`, `*.ngrok.io`, `serveo.net`, `localtunnel.me` |
| 5 | P2 | Refspec force-push bypass of adversarial gate via `git -c push.default=force push` / `git push origin +HEAD` | CWE-693 / A04:2021 | Extend settings.json:154 case-glob: add `*'git -c push.default=force'*\|*'git push origin +'*\|*'git push '*'+refs/'*` |

**Bonus P2:** (F1.1) add Langfuse/Tavily/Firecrawl/Brave/Exa rules to `.gitleaks.toml`:
```toml
[[rules]]
id="langfuse-public-key"
regex='''pk-lf-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'''
keywords=["pk-lf-"]
```
(F2.5) gate jq presence in pre-commit chain — `command -v jq || exit 2`.

**Citations:** OWASP Top 10 2021 + CWE Top 25 2024 + Sigstore v1.0 + NIST SP
800-218 SSDF PW.4 + Anthropic Claude Code permission docs
`https://docs.anthropic.com/en/docs/claude-code/settings#permissions`. Every PASS/FAIL
row cites probe (file:line, commit SHA, tool output). Reproducible.
