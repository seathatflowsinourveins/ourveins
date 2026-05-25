# W342 Stream X1 — Plugin Cleanup (Phantom Enables + L35 Stale-Claim)

Wave: W342-FULL-GAP-RESOLUTE · Stream: X1 · Date: 2026-05-20
Parent: docs/architecture/W341-FULL-SOTA-UNLEASH/VERDICT-LEDGER.md (Stream A §2+§7)
STATUS: OK

## §1 Phantom plugin probe — settings.json + installed_plugins.json + cache dirs

### A. Empirical state matrix

| Plugin | settings.json:enabledPlugins | installed_plugins.json record | cache dir | cache plugin.json valid |
|---|---|---|---|---|
| `clickhouse@claude-plugins-official` | `true` (`.claude/settings.json:292`) | ABSENT (probe below) | `.claude/plugins/cache/claude-plugins-official/clickhouse/` × 3 (1.0.0, 13a2df004af0, db1c108dde6e) | YES (1.0.0/.claude-plugin/plugin.json) |
| `outputai@claude-plugins-official` | `true` (`.claude/settings.json:293`) | ABSENT (probe below) | `.claude/plugins/cache/claude-plugins-official/outputai/` × 3 (0.2.1, 756d32d1d4fa-f0487267, fb7438aacee1-f0487267) | YES (0.2.1/.claude-plugin/plugin.json: `{name:"outputai",version:"0.2.1"}`) |

### B. settings.json grep evidence

```
291-    "mcp-server-dev@claude-plugins-official": true,
292:    "clickhouse@claude-plugins-official": true,
293:    "outputai@claude-plugins-official": true,
294-    "qdrant-skills@claude-plugins-official": false,
```
(via `grep -n clickhouse|outputai .claude/settings.json`)

### C. installed_plugins.json probe — phantom set derivation

Command:
```bash
node -e "const ip=JSON.parse(require('fs').readFileSync('Z:/claude-sota-installed/.claude/plugins/installed_plugins.json','utf8'));const enab=JSON.parse(require('fs').readFileSync('Z:/claude-sota-installed/.claude/settings.json','utf8')).enabledPlugins||{};const ipKeys=Object.keys(ip.plugins||ip);const enabKeys=Object.entries(enab).filter(([,v])=>v===true).map(([k])=>k);const phantoms=enabKeys.filter(k=>!ipKeys.includes(k));console.log('phantoms=',JSON.stringify(phantoms,null,2));console.log('totalEnabledTrue=',enabKeys.length);console.log('totalInstalled=',ipKeys.length);"
```

Output:
```
phantoms= [
  "clickhouse@claude-plugins-official",
  "outputai@claude-plugins-official"
]
totalEnabledTrue= 58
totalInstalled= 64
```

### D. Cache validity confirms recovery is possible without re-download

Cache plugin.json exists at `<plugin>/<version>/.claude-plugin/plugin.json` (verified for `outputai/0.2.1` returning `{name:"outputai",version:"0.2.1",description:"Workflow development tools",author:{name:"Output.ai",...}}`). The plugin payload is intact on disk — the registration record in `installed_plugins.json` is what is missing. This is a CC-managed-file drift: `/plugin install` populates `installed_plugins.json` but settings.json was edited (likely by W334-SOTA-UNLEASH `ca6904a` "+12 enable" sweep) without a matching install.

### E. ECC sub-finding (CLAUDE.md L35 stale-claim)

CLAUDE.md L35 claims `load_failures=1 (everything-claude-code@everything-claude-code)`. Empirical probe DISPROVES:

```bash
node -e "const ip=JSON.parse(require('fs').readFileSync('Z:/claude-sota-installed/.claude/plugins/installed_plugins.json','utf8'));const k=Object.keys(ip.plugins||ip);console.log('ecc_records=',k.filter(x=>x.includes('everything-claude-code')));"
```
Output: `ecc_records= [ 'everything-claude-code@everything-claude-code' ]`

ECC IS installed (record present). The actual load_failures set is `{clickhouse, outputai}`, count=2.

## §2 CLAUDE.md L35 empirical reconciliation

The brief said L98 — the actual line in this runtime's pointer-only ≤50-LOC CLAUDE.md is L35 (file is 51 LOC total). Surgical Edit applied to L35 ONLY:

- BEFORE: `load_failures=1 (`everything-claude-code@everything-claude-code` per W337 codex-r2 Axis-9 probe — investigate W337-AI-11)`
- AFTER: `load_failures=2 (`clickhouse@claude-plugins-official` + `outputai@claude-plugins-official` — phantom-enabled but absent from installed_plugins.json per W341 Stream A §2+§7 + W342 X1 §1.C; ECC@ECC reinstated as installed-OK per W342 X1 §1.E empirical re-probe)`

No other lines on L35 modified (W340-Δ delta block, hooks block, post-W316-retirements clause all preserved).

## §3 Proposed `settings.json` diff for orchestrator atomic apply

Recommendation: **Option (a) — flip `enabled=false`** (clean, reversible, no CC-interactive cycle needed). Option (b) requires `/plugin uninstall && /plugin install` which is CC-interactive and cannot be done autonomously by a subagent.

### Proposed diff (orchestrator applies)

```json
--- .claude/settings.json (current L291-L294)
+++ .claude/settings.json (proposed)
@@ -289,4 +289,4 @@
     "mcp-server-dev@claude-plugins-official": true,
-    "clickhouse@claude-plugins-official": true,
-    "outputai@claude-plugins-official": true,
+    "clickhouse@claude-plugins-official": false,
+    "outputai@claude-plugins-official": false,
     "qdrant-skills@claude-plugins-official": false,
```

Rationale for Option (a) over Option (b):

1. **Reversibility**: flipping `true` → `false` preserves the operator's intent ("I once wanted these plugins") in the audit trail. A subsequent operator-driven `/plugin install <plugin>@claude-plugins-official` will create the missing `installed_plugins.json` record and toggling enable=true completes the cycle.
2. **Non-interactive**: orchestrator can apply via single Edit. `/plugin uninstall` is a CC-interactive command.
3. **load_failures=0 invariant restoration**: the cardinal-rule-6 verify-before-claim discipline (W340 canonical-counts paragraph) demands the L35 count match reality. The cleanest path to `load_failures=0` is flipping enable→false (removing the phantom-enable side of the mismatch). Re-install is a separate operator-decision.
4. **No on-disk waste**: cache dirs `.claude/plugins/cache/claude-plugins-official/{clickhouse,outputai}/<version>/` stay intact — re-enable later costs zero re-download (validated at §1.D).

Post-orchestrator-apply expected `enabled_true` = 56 (down from 58), `enabled_false` = 12 (up from 10), `load_failures` = 0.

## §4 Verification plan — expected `/doctor` + `/reload-plugins` state post-apply

Operator (orchestrator) runs AFTER applying §3 diff to settings.json:

1. `/reload-plugins` — CC re-reads settings.json + installed_plugins.json. Expected: no warnings re. clickhouse/outputai (since enabled=false). Other plugins unchanged.
2. `/doctor` — Expected sections:
   - `Plugins: 56 enabled` (was 58)
   - **NO** "enabled but not installed" warnings for clickhouse or outputai (since their enable flag is now false matching their absence-from-installed)
   - Marketplace lookup mismatch for clickhouse/outputai REMOVED (their enabled=false skips the lookup entirely)
3. `node -e "..."` phantom-probe (replay §1.C exact command). Expected: `phantoms= []`, `totalEnabledTrue= 56`, `totalInstalled= 64`.

If operator later wants to actually USE clickhouse + outputai:
- `/plugin install clickhouse@claude-plugins-official` (CC populates installed_plugins.json from existing cache)
- `/plugin install outputai@claude-plugins-official`
- Manually flip `enabled=true` for both in settings.json (or use `/plugin enable`)

## §5 Cite-anchors

- `.claude/settings.json:292-293` — clickhouse + outputai `enabledPlugins[]=true` (W342 X1 §1.B grep evidence)
- `.claude/plugins/installed_plugins.json` — 64 installed records, NO clickhouse, NO outputai (W342 X1 §1.C node-probe stdout)
- `.claude/plugins/cache/claude-plugins-official/clickhouse/{1.0.0,13a2df004af0,db1c108dde6e}/.claude-plugin/plugin.json` — cache exists + valid (`ls` + `cat` verified)
- `.claude/plugins/cache/claude-plugins-official/outputai/{0.2.1,756d32d1d4fa-f0487267,fb7438aacee1-f0487267}/.claude-plugin/plugin.json` — cache exists + valid (`cat` returned plugin.json content)
- `CLAUDE.md:35` — pre-fix `load_failures=1` claim, post-fix `load_failures=2 (clickhouse + outputai)` per §2
- `docs/architecture/W341-FULL-SOTA-UNLEASH/VERDICT-LEDGER.md` Stream A §2+§7 — wave-W341 detection that prompted this stream
- Anthropic docs: `https://code.claude.com/docs/en/plugins` (cardinal-rule-1 install primitives) + `https://docs.anthropic.com/en/docs/claude-code/settings` (cardinal-rule-2 settings semantics)
- W340 canonical-counts source paragraph: `CLAUDE.md:35` (preserved-modified per §2)

## Decision recommendation

**Option (a)** — orchestrator applies §3 diff (flip `clickhouse + outputai` → `enabled=false` in `.claude/settings.json`). Reversible, non-interactive, restores `load_failures=0` invariant. Cache stays warm for future re-install with zero re-download. CLAUDE.md L35 stale-claim fixed via surgical Edit (already applied by this stream).
