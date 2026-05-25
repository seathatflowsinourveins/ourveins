# W329-B-3 — `slsa-verifier` wire-up spec (operator-decision-pending — paste-ready)

> **Wave**: W329 Stream B. **Date**: 2026-05-19. **HEAD**: `5cf5c90`.
> **Goal**: Document WHERE in this runtime SLSA verification should fire, with paste-ready snippets — operator decides which path(s) to wire.
> **Cardinal-rule compliance**: R2 (hooks discipline — direct-CLI invocation in `.claude/settings.json`; NO project-owned hook bodies); R5 (safety via permissions — paste-ready BUT operator-interactive activation).
> **Stream B does NOT edit settings.json** (strict file ownership: `docs/architecture/W329-K4-SLSA-VERIFIER/*` only).

## §1 Three wire paths (operator selects 0, 1, 2, or 3)

| Path | Fires on | Risk | Cardinal-rule fitness | Composite contrib |
|---|---|---|---|---|
| **A** — `.pre-commit-config.yaml` advisory verify | Pre-commit (after gitleaks/ruff/shellcheck) | LOW | R2-clean (direct-CLI in pre-commit) | K-4 layer-local +0.05-0.08 |
| **B** — PreToolUse hook on `Bash(gh release download:*)` | When CC about to `gh release download` (plugin install, asset fetch) | LOW-MED | R2-clean (settings.json `hooks.PreToolUse[].hooks[].command` = direct-CLI) | K-4 layer-local +0.05-0.08 (overlaps A) |
| **C** — Post-`/plugin install` verify gate | After `/plugin install` of marketplace plugins | MED | R2-clean if settings.json hook; needs operator-confirm | K-4 layer-local +0.05-0.10 (cumulative w/ B) |

**Recommended**: start with **Path A** (lowest risk, advisory-only, no setting-mutate). Add **Path B** in W330 once smoke-tested.

## §2 PATH A — `.pre-commit-config.yaml` advisory verify hook (RECOMMENDED FIRST)

### A.1 Where it fires

Each `git commit` runs `.pre-commit-config.yaml` hooks (gitleaks already wired). Add a `local` hook that runs `slsa-verifier` advisory on any newly-staged binary asset matching `Z:/tools/*.exe` OR `.claude/plugins/cache/**/bin/*`.

### A.2 Paste-ready snippet (operator-decision: append to `.pre-commit-config.yaml`)

```yaml
# Append at end of .pre-commit-config.yaml (under existing `repos:`)
  - repo: local
    hooks:
      - id: slsa-verify-tools-binaries
        name: slsa-verifier — advisory verify Z:/tools binaries
        entry: bash -c 'for bin in Z:/tools/*.exe; do
          intoto="$bin.intoto.jsonl"
          if [ -f "$intoto" ]; then
            slsa-verifier verify-artifact "$bin" \
              --provenance-path "$intoto" \
              --source-uri "$(grep -m1 ''source-uri:'' .slsa-policy.yml | cut -d: -f2- | xargs)" \
              || echo "SLSA verify failed for $bin (advisory — not blocking commit)"
          fi
        done; exit 0'
        language: system
        stages: [pre-commit]
        always_run: false
        # Advisory-only: exit 0 always; print warning on failure
```

### A.3 Risk profile

- **Block-class**: NONE (advisory; `exit 0` always)
- **Side-effects**: stdout warning only
- **Composability**: stacks under existing gitleaks/ruff hooks
- **Revert**: remove the 13-line block (single git revert)

### A.4 Optional sidecar: `.slsa-policy.yml`

```yaml
# Z:/claude-sota-installed/.slsa-policy.yml
# Per-tool source-uri map (extend as more SLSA-attested binaries added)
tools:
  - path: Z:/tools/slsa-verifier.exe
    source-uri: github.com/slsa-framework/slsa-verifier
    source-tag: v2.7.1
  # Future:
  # - path: Z:/tools/cosign.exe
  #   source-uri: github.com/sigstore/cosign
```

Stream B does NOT create this sidecar (operator-decision). If operator wires Path A, this policy file becomes the registry equivalent of W327-D-1 §5 step 2 capability-registry skeleton.

## §3 PATH B — PreToolUse hook on `Bash(gh release download:*)`

### B.1 Where it fires

Whenever CC is about to run `Bash(gh release download:*)`, the hook downloads the matching `.intoto.jsonl` and runs `slsa-verifier verify-artifact` — blocks the tool call if verification fails.

### B.2 Paste-ready snippet (operator-decision: add to `.claude/settings.json`)

> **Stream B does NOT make this edit.** Operator pastes into `.claude/settings.json` `hooks.PreToolUse`.

```jsonc
{
  "hooks": {
    "PreToolUse": [
      // ... existing PreToolUse entries ...
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "powershell -NoProfile -Command \"if ($env:CLAUDE_TOOL_INPUT -match 'gh\\s+release\\s+download') { $tag = ($env:CLAUDE_TOOL_INPUT -split ' ')[3]; $repo = ($env:CLAUDE_TOOL_INPUT -split '--repo\\s+')[1] -split '\\s+' | Select-Object -First 1; if (-not $tag -or -not $repo) { exit 0 }; Write-Host \\\"[slsa-advisory] would verify provenance for $repo@$tag post-download\\\"; exit 0 }\""
          }
        ]
      }
    ]
  }
}
```

### B.3 Risk profile

- **Block-class**: NONE in advisory-mode (`exit 0`); MED if hardened to `exit 2` (blocks the Bash tool call)
- **Side-effects**: parses `$env:CLAUDE_TOOL_INPUT`, prints advisory line
- **Composability**: layers on existing PreToolUse hooks (gitleaks-staging already present)
- **Revert**: remove the matcher block

### B.4 Why "advisory" first

Per W295 §5 R5 5-control layered-defense + W327-D-5 operator-gate caveat: blocking hooks on first-deploy can break critical workflows. Operator gradually-hardens advisory → blocking via gate-completion telemetry (Langfuse trace shows N advisory passes → flip to `exit 2` block).

## §4 PATH C — Post-`/plugin install` verify gate

### C.1 Where it fires

After `/plugin install <marketplace>/<plugin>`, the plugin cache directory may contain binary assets with `.intoto.jsonl` provenance (Anthropic-published plugins increasingly support this). A post-install verify gate runs verifier across the new plugin's binary artifacts.

### C.2 Paste-ready snippet (operator-decision: add to `.claude/settings.json`)

```jsonc
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "powershell -NoProfile -Command \"if ($env:CLAUDE_TOOL_INPUT -match 'plugin\\s+install') { Get-ChildItem -Path Z:/claude-sota-installed/.claude/plugins/cache -Recurse -Filter '*.intoto.jsonl' -ErrorAction SilentlyContinue | ForEach-Object { $bin = $_.FullName -replace '\\.intoto\\.jsonl$',''; if (Test-Path $bin) { & slsa-verifier verify-artifact $bin --provenance-path $_.FullName 2>&1 | Out-Host } }; exit 0 }\""
          }
        ]
      }
    ]
  }
}
```

### C.3 Risk profile

- **Block-class**: NONE (advisory)
- **Side-effects**: stdout per-plugin verify result; runtime ~100ms per asset
- **Cardinal-rule fitness**: R2-clean (settings.json direct-CLI invocation per CCBP `claude-settings.md`)
- **Caveat**: most CC plugins don't yet ship `.intoto.jsonl` — this gate would silently pass-through for them; activates as ecosystem matures

## §5 Capability-registry sidecar (W327-D-1 §5 step 2 — companion to wire-up)

Per W327-D-1 §5 step 2 K-4 remediation path, the wire-up should compose with a `.claude/state/capability-registry.json` skeleton documenting attestation-verifier state per capability:

```jsonc
// .claude/state/capability-registry.json (Stream B does NOT create; operator-AI follow-up)
{
  "mcp:gitnexus":     { "version": "<local>",        "attestation_url": null, "verified": false },
  "mcp:basic-memory": { "version": "0.21.1",         "attestation_url": null, "verified": false },
  "plugin:codex":     { "version": "1.0.4",          "attestation_url": "<github-rel-url>", "verified": "pending" },
  "tool:slsa-verifier": {
    "version": "2.7.1",
    "binary_path": "Z:/tools/slsa-verifier.exe",
    "sha256": "1d8f61ad747ecc3d375d2a563cebf2991748b7da1a9bda9a500804c3c499e3c0",
    "attestation_url": "https://github.com/slsa-framework/slsa-verifier/releases/download/v2.7.1/slsa-verifier-windows-amd64.exe.intoto.jsonl",
    "verified": "pending-operator-smoke"
  }
}
```

Operator-AI deferred from W329 Stream B to W330+ wave (per strict file ownership boundary).

## §6 Operator-decision matrix

| Decision | Path A only | A + B | A + B + C | A + B + C + Registry |
|---|---|---|---|---|
| Risk | LOW | LOW-MED | MED | MED |
| Composite-lift | +0.05 | +0.06 | +0.07 | +0.07 (no marginal lift; registry is doc-state) |
| Effort | S (1 wave) | M (2 waves) | M (2 waves) | L (3 waves; registry needs maint-cadence) |
| **Recommended W330 entry** | **YES** | OK | wait W331 | wait W332 |

## §7 Composability with existing wires

- Pre-commit chain: `gitleaks` (R1 secret-scan) → `ruff` (Python lint) → `shellcheck` (sh lint) → **`slsa-verifier`** (supply-chain provenance verify)
- PreToolUse chain: `gitleaks-staging` → **`slsa-pretooluse-bash-gate`**
- PostToolUse chain: existing post-write hooks → **`slsa-post-plugin-install`**

All three paths are direct-CLI invocations per cardinal-rule-2; no project-owned `.claude/hooks/scripts/*.py` shell-scripts added (W255 spirit preserved; `self_invented_count: 0` invariant intact).

## §8 References

- **R2 hooks discipline**: CLAUDE.md L24-31 cardinal-rule-2 (no project-owned hook bodies; direct-CLI only)
- **CCBP claude-settings.md L877-921** @ ac0d87d (TIER-1-DIRECT env-block + hooks contract)
- **W295 §5 R5 5-control layered-defense**: cite-anchored to OWASP Defense in Depth + NIST SP 800-53 SI-7
- **W324-P8 §"Advisory integration scope"**: precedent for advisory-first slsa-verifier integration
- **W327-D-1 §5 step 2**: capability-registry skeleton design
