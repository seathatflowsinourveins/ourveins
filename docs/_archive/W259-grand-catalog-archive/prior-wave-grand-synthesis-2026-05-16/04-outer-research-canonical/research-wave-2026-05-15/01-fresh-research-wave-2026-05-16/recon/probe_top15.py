#!/usr/bin/env python3
"""Top-15 NET-NEW Mia probe: license + topics + plugin/MCP detection.

For each candidate, fetch:
- /repos/{owner}/{repo} (metadata)
- LICENSE blob (if accessible)
- README.md head (first 80 lines)
- topics
- contents/.claude-plugin (for plugin marketplace detection)
- contents/plugin.json or contents/marketplace.json
"""

import json
import subprocess

CANDIDATES = [
    # (name, layer_hint, why_relevant)
    (
        "JuliusBrussee/caveman",
        "token-opt",
        "Claude Code skill cutting 65% tokens — LLMLingua replacement",
    ),
    ("HKUDS/LightRAG", "memory-rag", "EMNLP2025 simple+fast RAG"),
    (
        "microsoft/graphrag",
        "memory-rag",
        "Modular graph-based RAG — alt to graphiti L3",
    ),
    ("HKUDS/nanobot", "agent", "Ultra-lightweight personal AI agent"),
    (
        "github/github-mcp-server",
        "mcp",
        "GitHub OFFICIAL MCP server — high-relevance wire",
    ),
    (
        "Fission-AI/OpenSpec",
        "specs",
        "SDD for AI coding assistants — parallel to spec-kit",
    ),
    ("safishamsi/graphify", "skill", "AI coding assistant skill"),
    (
        "VectifyAI/PageIndex",
        "memory-rag",
        "Document Index for Vectorless reasoning-based RAG",
    ),
    (
        "agentscope-ai/agentscope",
        "orchestration",
        "visible/understandable/trust agent framework",
    ),
    (
        "K-Dense-AI/scientific-agent-skills",
        "skill",
        "Ready-to-use Agent Skills for research/science/finance",
    ),
    (
        "code-yeongyu/oh-my-openagent",
        "orchestration",
        "agent harness (oh-my-opencode rebrand)",
    ),
    (
        "farion1231/cc-switch",
        "account-mgmt",
        "Cross-platform Claude Code account switcher",
    ),
    ("browser-use/browser-use", "browser", "Browser automation for AI agents"),
    (
        "activepieces/activepieces",
        "orchestration",
        "AI Agents & MCPs & Workflow Automation (~400 MCPs)",
    ),
    (
        "nexu-io/open-design",
        "design",
        "Local-first alt to Anthropic's Claude Design (19 Skills + 71 brand)",
    ),
]


def gh(cmd):
    """Run gh api command, return parsed JSON or None."""
    try:
        result = subprocess.run(
            ["gh", "api", cmd, "-q", "."], capture_output=True, text=True, timeout=15
        )
        if result.returncode == 0:
            return json.loads(result.stdout)
        return None
    except Exception as e:
        return {"_err": str(e)}


def probe(name, layer, why):
    out = {"name": name, "layer": layer, "why": why}
    meta = gh(f"repos/{name}")
    if not meta or "_err" in (meta or {}):
        out["status"] = "META_FETCH_FAIL"
        return out
    out["stars"] = meta.get("stargazers_count")
    out["license"] = (meta.get("license") or {}).get("spdx_id")
    out["topics"] = meta.get("topics", [])
    out["pushed"] = (meta.get("pushed_at") or "")[:10]
    out["created"] = (meta.get("created_at") or "")[:10]
    out["default_branch"] = meta.get("default_branch")
    out["archived"] = meta.get("archived")
    out["disabled"] = meta.get("disabled")
    out["forks"] = meta.get("forks_count")
    out["issues_open"] = meta.get("open_issues_count")
    out["size_kb"] = meta.get("size")
    out["homepage"] = meta.get("homepage")
    out["description"] = meta.get("description")

    # Check for plugin marketplace structure
    plugin_marker = gh(f"repos/{name}/contents/.claude-plugin")
    if isinstance(plugin_marker, list) and len(plugin_marker) > 0:
        out["native_cc_path"] = "PLUGIN_MARKETPLACE (.claude-plugin/ dir found)"
    else:
        # check for plugin.json or marketplace.json at root
        try:
            mp = subprocess.run(
                ["gh", "api", f"repos/{name}/contents/marketplace.json"],
                capture_output=True,
                text=True,
                timeout=10,
            )
            if mp.returncode == 0 and "name" in mp.stdout:
                out["native_cc_path"] = "PLUGIN_MARKETPLACE (root marketplace.json)"
            else:
                pj = subprocess.run(
                    ["gh", "api", f"repos/{name}/contents/plugin.json"],
                    capture_output=True,
                    text=True,
                    timeout=10,
                )
                if pj.returncode == 0 and "name" in pj.stdout:
                    out["native_cc_path"] = "PLUGIN (root plugin.json)"
                else:
                    sk = subprocess.run(
                        ["gh", "api", f"repos/{name}/contents/skills"],
                        capture_output=True,
                        text=True,
                        timeout=10,
                    )
                    if sk.returncode == 0 and "name" in sk.stdout:
                        out["native_cc_path"] = "SKILLS DIR (root /skills/)"
                    else:
                        ag = subprocess.run(
                            ["gh", "api", f"repos/{name}/contents/agents"],
                            capture_output=True,
                            text=True,
                            timeout=10,
                        )
                        if ag.returncode == 0 and "name" in ag.stdout:
                            out["native_cc_path"] = "AGENTS DIR (root /agents/)"
                        else:
                            mcp_check = subprocess.run(
                                ["gh", "api", f"repos/{name}/contents/.mcp.json"],
                                capture_output=True,
                                text=True,
                                timeout=10,
                            )
                            if mcp_check.returncode == 0:
                                out["native_cc_path"] = "MCP CONFIG (.mcp.json found)"
                            else:
                                pkg = subprocess.run(
                                    [
                                        "gh",
                                        "api",
                                        f"repos/{name}/contents/package.json",
                                    ],
                                    capture_output=True,
                                    text=True,
                                    timeout=10,
                                )
                                if pkg.returncode == 0:
                                    out["native_cc_path"] = "NPM PKG (package.json)"
                                else:
                                    out["native_cc_path"] = (
                                        "NONE-DETECTED (no plugin/skills/MCP markers)"
                                    )
        except Exception as e:
            out["native_cc_path"] = f"PROBE-ERROR: {e}"

    return out


results = []
print(f"Probing {len(CANDIDATES)} candidates...\n")
for name, layer, why in CANDIDATES:
    print(f"  [{layer}] {name}...", end=" ", flush=True)
    r = probe(name, layer, why)
    results.append(r)
    if "status" in r:
        print(r["status"])
    else:
        print(
            f"{r.get('stars', '?')}* {r.get('license', '?')} {r.get('native_cc_path', '?')[:40]}"
        )

with open("top15_probe.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

print("\n=== SUMMARY TABLE ===")
print(f"{'name':<40} {'stars':>8} {'lic':<12} {'pushed':<11} {'native_cc_path':<45}")
print("-" * 130)
for r in sorted(results, key=lambda x: -(x.get("stars") or 0)):
    nccpath = r.get("native_cc_path", "?")[:45]
    print(
        f"{r['name']:<40} {r.get('stars', 0):>8} {(r.get('license') or 'NULL'):<12} {(r.get('pushed') or ''):<11} {nccpath}"
    )
