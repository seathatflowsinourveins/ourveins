# FI-5 Capability Registry — Per-Skill/Per-Agent/Per-Plugin Declarations

> W331 Stream-R5 · 2026-05-19 · sub-item 3/5
> Targets FI-5 closure per W329-A-3 §4 (currently HOLD-assumed; capability-registry `.claude/state/capability-registry.json` ABSENT per W328-A §6).
> Design-only; DO NOT auto-write to runtime per Δ-PDM-1 (operator-sign before bootstrap-build).

## §1. Goal + scope

The capability registry is a **declared invariant**: every installed plugin/skill/agent enumerates the set of tools it MAY call and the scope of files/URLs/MCPs it MAY touch. The registry serves three Control 5 (Drift Detection) purposes:

1. **Static drift-detection**: comparing the registry against the actual installed plugin set surfaces unauthorized installs (registry stale or wrong) and surfaces unauthorized capability creep (skill description silently extended).
2. **Pre-tool-call gating**: PreToolUse validator consults the registry to check that an invoking agent/skill is authorized to call the requested tool (consistent with CLAUDE.md L17 W331 axis-1 #5 mechanization for `subagent_type` validation).
3. **Audit-trail correlation**: each audit-log row (FI-2) can be enriched with the invoking-skill/agent capability scope for forensic replay.

## §2. Registry file

- **Path**: `Z:/claude-sota-installed/.claude/state/capability-registry.json`
- **Format**: JSON; UTF-8 no-BOM.
- **Update trigger**: build-script regenerates on every `/plugin install`, `/plugin update`, or operator-invoked `tools/build-capability-registry.mjs --regenerate`.

### Schema

```jsonc
{
  "schema_version": 1,
  "generated_ts": "2026-05-19T14:00:00Z",
  "generator": "tools/build-capability-registry.mjs@<sha>",
  "anthropic_cc_version": "2.1.144",
  "skills": [
    {
      "name": "diagnose",
      "plugin": null,                    // local-curated path: .claude/skills/diagnose/
      "source_path": ".claude/skills/diagnose/SKILL.md",
      "trigger_phrases": ["diagnose this", "debug this", "performance regression"],
      "capabilities": [
        { "tool": "Bash",   "scope": "test|reproduce-minimization" },
        { "tool": "Read",   "scope": "src/**|tests/**" },
        { "tool": "Edit",   "scope": "src/**|tests/**" },
        { "tool": "Grep",   "scope": "**" }
      ],
      "invariants": [
        "Never writes to .claude/hooks/",
        "Never modifies .claude/settings.json:permissions"
      ]
    }
  ],
  "agents": [
    {
      "name": "agent-teams:team-debug",
      "plugin": "agent-teams@claude-code-workflows",
      "source_path": ".claude/plugins/cache/wshobson-agents/agent-teams/agents/team-debug.md",
      "subagent_type": "agent-teams:team-debug",
      "capabilities": [
        { "tool": "Agent", "scope": "fork-debug-team" },
        { "tool": "Bash",  "scope": "test-execution" }
      ]
    }
  ],
  "plugins": [
    {
      "name": "context-mode@context-mode",
      "version": "1.0.4",                // from .claude/plugins/cache/<plugin>/<version>/
      "marketplace": "context-mode",
      "marketplace_repo": "mksglu/context-mode",
      "skill_count": 4,
      "command_count": 5,
      "agent_count": 1,
      "hook_count": 2,
      "mcp_server_count": 1,
      "trust_tuple": {                   // CR-1 trust-tuple per CLAUDE.md L15
        "signed_release": false,
        "license_class": "MIT",
        "commit_age_days": 7,
        "transitive_socket_dev_clean": "unknown"
      }
    }
  ],
  "mcp_servers": [
    {
      "name": "basic-memory",
      "command": "uvx --from basic-memory==0.21.1 basic-memory mcp",
      "pinned_version": "0.21.1",
      "cr9_compliant": true,
      "capabilities": ["search_notes", "write_note", "read_note", "..."],
      "scope": "memory:T6"
    }
  ]
}
```

## §3. Discovery method

Walk the following paths to build the registry:

| Path | Yields |
|---|---|
| `.claude/plugins/cache/<plugin>/<version>/plugin.json` | plugin metadata (name, version, ...) |
| `.claude/plugins/cache/<plugin>/<version>/skills/<skill>/SKILL.md` | skill description + trigger phrases (YAML frontmatter) |
| `.claude/plugins/cache/<plugin>/<version>/agents/<agent>.md` | agent system-prompt + tools declaration |
| `.claude/plugins/cache/<plugin>/<version>/commands/<cmd>.md` | slash-command definitions |
| `.claude/plugins/cache/<plugin>/<version>/hooks/` | upstream-plugin-shipped hook bodies (CR-2 allowed) |
| `.claude/skills/<skill>/SKILL.md` | local-curated operator skills (CLAUDE.md L29) |
| `.mcp.json` | MCP-server entries + their commands |
| `.claude/state/subagent-type-allowlist.json` | corroborating subagent_type list (CLAUDE.md L17 W326 P0-A2) |
| `.claude/settings.json:hooks.*` | wired hooks; cross-check against `enabledPlugins` |

For each skill/agent, parse YAML frontmatter `description:` field — split on common conjunctions (`,`, `or`, `and`, `;`) to derive trigger phrases. Apply CLAUDE.md L19 W331 axis-1 #6 corollary heuristic: cardinality ≤8 distinct triggers per skill; flag overflow.

## §4. Build-script skeleton (`tools/build-capability-registry.mjs` — DESIGN ONLY, ≤120 LOC)

```javascript
#!/usr/bin/env node
// tools/build-capability-registry.mjs — W331 Stream-R5 FI-5 registry builder.
// Walks .claude/plugins/cache/, .claude/skills/, .mcp.json, .claude/settings.json.
// Emits .claude/state/capability-registry.json. Run via:
//   node tools/build-capability-registry.mjs [--regenerate] [--dry-run]
// Cite-anchors: NIST SP 800-53 CM-8 + CIS Controls v8 §2.1 + ISO 27001:2022 A.5.9.

import { readdirSync, readFileSync, existsSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve, basename } from "node:path";
import { createHash } from "node:crypto";

const ROOT = "Z:/claude-sota-installed";
const argv = new Set(process.argv.slice(2));
const DRY = argv.has("--dry-run");

function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

function listDirs(p) {
  if (!existsSync(p)) return [];
  return readdirSync(p).filter((n) => { try { return statSync(join(p, n)).isDirectory(); } catch { return false; } });
}

function scanSkills(rootSkillsDir) {
  const out = [];
  for (const name of listDirs(rootSkillsDir)) {
    const skillPath = join(rootSkillsDir, name, "SKILL.md");
    if (!existsSync(skillPath)) continue;
    const md = readFileSync(skillPath, "utf8");
    const fm = parseFrontmatter(md);
    const triggers = (fm.description || "").split(/[,;.]|\bor\b|\band\b/).map((s) => s.trim()).filter(Boolean).slice(0, 8);
    out.push({
      name,
      plugin: null,
      source_path: skillPath.replace(ROOT + "/", ""),
      trigger_phrases: triggers,
      capabilities: [], // operator-fill or heuristic-derive from SKILL.md tools mentions
      invariants: []
    });
  }
  return out;
}

function scanPlugins(cacheRoot) {
  const out = { plugins: [], pluginSkills: [], pluginAgents: [] };
  for (const plugDir of listDirs(cacheRoot)) {
    for (const ver of listDirs(join(cacheRoot, plugDir))) {
      const base = join(cacheRoot, plugDir, ver);
      const meta = existsSync(join(base, "plugin.json"))
        ? JSON.parse(readFileSync(join(base, "plugin.json"), "utf8"))
        : { name: plugDir };
      const skillsDir = join(base, "skills");
      const agentsDir = join(base, "agents");
      const cmdsDir = join(base, "commands");
      const hooksDir = join(base, "hooks");
      const skillCount = existsSync(skillsDir) ? listDirs(skillsDir).length : 0;
      const cmdCount = existsSync(cmdsDir) ? readdirSync(cmdsDir).filter((f) => f.endsWith(".md")).length : 0;
      const agentCount = existsSync(agentsDir) ? readdirSync(agentsDir).filter((f) => f.endsWith(".md")).length : 0;
      const hookCount = existsSync(hooksDir) ? readdirSync(hooksDir).length : 0;
      out.plugins.push({
        name: meta.name + "@" + plugDir,
        version: ver,
        marketplace: plugDir.split("-")[0] || plugDir,
        skill_count: skillCount,
        command_count: cmdCount,
        agent_count: agentCount,
        hook_count: hookCount,
        trust_tuple: { signed_release: false, license_class: "unknown", commit_age_days: -1, transitive_socket_dev_clean: "unknown" }
      });
      out.pluginSkills.push(...scanSkills(skillsDir).map((s) => ({ ...s, plugin: meta.name })));
    }
  }
  return out;
}

function scanMcp(mcpPath) {
  if (!existsSync(mcpPath)) return [];
  const cfg = JSON.parse(readFileSync(mcpPath, "utf8"));
  const out = [];
  for (const [name, def] of Object.entries(cfg.mcpServers || {})) {
    const cmd = (def.command || "") + " " + (def.args || []).join(" ");
    const cr9 = /npx\s+-y\s+\S+@\S+/.test(cmd) || /uvx\s+--from\s+\S+==\S+/.test(cmd);
    out.push({ name, command: cmd.trim(), cr9_compliant: cr9, capabilities: [], scope: "tbd" });
  }
  return out;
}

(function main() {
  const localSkills = scanSkills(resolve(ROOT, ".claude/skills"));
  const { plugins, pluginSkills } = scanPlugins(resolve(ROOT, ".claude/plugins/cache"));
  const mcps = scanMcp(resolve(ROOT, ".mcp.json"));
  const registry = {
    schema_version: 1,
    generated_ts: new Date().toISOString(),
    generator: "tools/build-capability-registry.mjs@" + createHash("sha256").update(readFileSync(import.meta.url.replace("file:///", ""))).digest("hex").slice(0, 8),
    anthropic_cc_version: process.env.CLAUDE_CODE_VERSION || "unknown",
    skills: [...localSkills, ...pluginSkills],
    agents: [],   // operator-fill (or scanPlugins agents-dir extension)
    plugins,
    mcp_servers: mcps
  };
  const out = resolve(ROOT, ".claude/state/capability-registry.json");
  if (DRY) { console.log(JSON.stringify(registry, null, 2)); return; }
  mkdirSync(resolve(out, ".."), { recursive: true });
  writeFileSync(out, JSON.stringify(registry, null, 2));
  console.log("Wrote " + out + " — " + registry.skills.length + " skills, " + registry.plugins.length + " plugins, " + registry.mcp_servers.length + " MCPs");
})();
```

LOC budget: ~115 LOC (within ≤120). Single-file, no dependencies beyond `node:fs/path/crypto`. Soft-runs on operator-invoke; not wired as an auto-firing hook (preserves CR-2).

## §5. Pre-tool-call gating (consumer-side, design-only)

A future `tools/preagent-capability-validator.mjs` (analogous to `preagent-subagent-validator.mjs` at CLAUDE.md L17) can pre-flight every tool-call:

1. Read registry; build `Map<skill_or_agent, capabilities[]>` once at hook-init.
2. For incoming tool-call, extract invoking-skill/agent from event metadata.
3. Lookup capabilities; verify requested `tool` matches.
4. **On match** → exit 0 (allow). **On miss (registry has skill but tool not declared)** → exit 0 with stderr warning (soft-fail; operator-broken-state per CLAUDE.md L20). **On unknown-skill** (registry missing entry) → exit 0 with stderr `fuzzy-suggest: did you mean X?` (per CLAUDE.md L17 subagent-validator pattern).

**This validator is DESIGN-ONLY at this wave** — only the build-script is delivered. Pre-tool-call gating ships in W332+ once the registry has stable data.

## §6. Falsifiable probe

```bash
# Probe 1 — capability-registry.json exists + parses
test -f Z:/claude-sota-installed/.claude/state/capability-registry.json && \
  python -c "import json; r=json.load(open('Z:/claude-sota-installed/.claude/state/capability-registry.json')); print(len(r['skills']), len(r['plugins']), len(r['mcp_servers']))"
# Probe 2 — registry is fresh (regenerated within last 7 days)
node -e "import('fs').then(m=>{const s=m.statSync('Z:/claude-sota-installed/.claude/state/capability-registry.json'); const d=Date.now()-s.mtimeMs; console.log(d/86400000 < 7 ? 'FRESH' : 'STALE')})"
# Probe 3 — every enabled plugin appears in registry
python -c "import json; s=json.load(open('Z:/claude-sota-installed/.claude/settings.json')); r=json.load(open('Z:/claude-sota-installed/.claude/state/capability-registry.json')); enabled={k for k,v in s['enabledPlugins'].items() if v}; declared={p['name'] for p in r['plugins']}; missing=enabled-declared; print('missing:', missing if missing else 'NONE')"
```

Expected: probes 1+2 succeed; probe 3 ideally returns `missing: NONE` post-bootstrap-build.

## §7. Cite-anchors

- **NIST SP 800-53 Rev 5 CM-8** (System Component Inventory) — registry IS the inventory artifact.
- **CIS Controls v8 §2.1** (Establish and Maintain a Software Inventory) — capability-registry satisfies the inventory requirement.
- **ISO/IEC 27001:2022 A.5.9** (Inventory of information and other associated assets) — the registry is the cross-organization-accepted inventory shape.
- **OWASP ASVS v4.0.3 §V14.2** (Dependency / Components) — corroborates registry-as-source-of-truth for dependency-tracking.
- **SLSA v1.0 Build L3 Pinned Inputs** — registry surface `trust_tuple.signed_release` field links to provenance attestation chain.

## §8. Acceptance gate

1. Operator reviews build-script design.
2. Operator runs `node tools/build-capability-registry.mjs --dry-run` for first-pass inspection.
3. Operator commits `tools/build-capability-registry.mjs` + bootstrap-generates `.claude/state/capability-registry.json`.
4. Operator schedules per-wave registry regeneration (e.g. as part of ship-mate or pre-commit gate).
5. **FI-5 ratchet from HOLD-assumed to HOLD-verified** once registry is present + non-empty + has every enabledPlugins entry mirrored.

**Verdict: FI-5 DESIGN-DELIVERED. Build-script ≤120 LOC. Pre-tool-call gating consumer deferred W332+. Soft-fail exit 0 fallback honored per CLAUDE.md L20.**
