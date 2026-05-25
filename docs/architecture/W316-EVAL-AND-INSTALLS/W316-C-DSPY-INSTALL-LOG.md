# W316-C — DSPy 3.2.1 Install Log (P1a)

## Verdict: PASS (no-op - already installed pre-W316)

## Smoke test results (2026-05-19 W316 Stream C)

```
$ Z:/venvs/claude/Scripts/python.exe -c "import dspy; print(dspy.__version__)"
3.2.1

$ Z:/venvs/claude/Scripts/python.exe -c "import dspy; print('has Tool.from_mcp_tool:', hasattr(dspy.Tool, 'from_mcp_tool'))"
has Tool.from_mcp_tool: True

$ Z:/venvs/claude/Scripts/python.exe -c "import dspy; print(dspy.__file__)"
Z:\venvs\claude\Lib\site-packages\dspy\__init__.py
```

All three checks PASS:
1. dspy version = 3.2.1 (matches /goal P1a pinned target exactly)
2. `dspy.Tool.from_mcp_tool` native MCP wrapper present (per W314 Stream B Tier-1 INSTALL signal)
3. Module path resolves to the runtime-shared venv `Z:/venvs/claude`

## Install pathway

DSPy 3.2.1 was already installed in `Z:/venvs/claude` prior to W316 Stream C (likely landed in a prior wave's pip-install batch or as a transitive dep). No re-install needed.

If a future operator needs to fresh-install:
```powershell
Z:/venvs/claude/Scripts/pip.exe install dspy==3.2.1
```

## Reversibility (100% verified)

```powershell
# Uninstall:
Z:/venvs/claude/Scripts/pip.exe uninstall dspy -y

# Remove the skill:
Remove-Item -Recurse -Force Z:/claude-sota-installed/.claude/skills/dspy-integration/
```

No new MCP server (no `.mcp.json` change). No new NSSM service. No new `settings.json` env var. Pure venv-local Python package + one operator-curated skill dir under `.claude/skills/dspy-integration/`.

## Cardinal-rule compliance

- **R1** (trusted plugin source): DSPy from PyPI canonical (stanfordnlp/dspy, MIT). Not a plugin install - falls under "installed Python package in a venv we own" which is a documented runtime primitive per CLAUDE.local.md `Z:/venvs/claude` block.
- **R2** (hooks discipline): no hook change. N/A.
- **R3** (subagents = upstream): no subagent change. N/A.
- **R4** (rules placement): operator-curated SKILL.md at `.claude/skills/dspy-integration/SKILL.md` is cardinal-rule-4-compliant per W308 reversal (Anthropic doc `https://code.claude.com/docs/en/skills`).
- **R5** (safety boundaries): no permission/sandbox change. N/A.

## Files created this wave

| Path | Bytes | Purpose |
|---|---|---|
| `.claude/skills/dspy-integration/SKILL.md` | ~3.4 KB | Auto-fire integration skill |
| `docs/architecture/W316-EVAL-AND-INSTALLS/W316-C-DSPY-INSTALL-LOG.md` | this file | Install audit trail |

## References

- Pre-existing install evidence: `Z:/venvs/claude/Lib/site-packages/dspy/` (verified 2026-05-19)
- W314 candidate audit ratifying DSPy adoption: `docs/architecture/W314-DEEP-SOTA-WAVE/STREAM-B-EXTENDED-SOTA-DISCOVERY.md`
- W314 SCA verdict: install_score 4.625 (T1 INSTALL candidate, native MCP integration via `dspy.Tool.from_mcp_tool`)
- DSPy 3.2.1 release notes: https://github.com/stanfordnlp/dspy/releases/tag/3.2.1
- Anthropic skills doc: https://code.claude.com/docs/en/skills
