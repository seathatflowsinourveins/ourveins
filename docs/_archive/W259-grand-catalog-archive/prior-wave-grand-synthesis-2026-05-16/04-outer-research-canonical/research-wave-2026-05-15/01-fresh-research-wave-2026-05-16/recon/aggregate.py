#!/usr/bin/env python3
"""Aggregate gh API harvest, dedupe vs W237/W241/W250 known candidates, surface NET-NEW.

Reads all *.jsonl in current dir; writes top100-net-new.json + top100-known-hits.json.
Stdout: summary + top-50 NET-NEW + top-25 already-known re-validation rows.
"""

import json
import glob

# Known W237/W241/W250 candidates (skip these — already covered in prior research)
KNOWN = set(
    """
anthropics/claude-plugins-official anthropics/cwc-long-running-agents anthropics/anthropic-quickstarts
anthropics/claude-code-base-action anthropics/claude-code-security-review anthropics/anthropic-cookbook
anthropics/claude-cookbooks anthropics/skills anthropics/financial-services anthropics/healthcare anthropics/life-sciences
obra/superpowers addyosmani/agent-skills wshobson/agents wshobson/commands
multica-ai/andrej-karpathy-skills alirezarezvani/claude-skills jeremylongshore/claude-code-plugins-plus-skills
Yeachan-Heo/oh-my-claudecode smtg-ai/claude-squad eyaltoledano/claude-task-master
AnandChowdhary/continuous-claude forrestchang/andrej-karpathy-skills bmad-code-org/BMAD-METHOD
ruvnet/ruflo EveryInc/compound-engineering-plugin NeoLabHQ/context-engineering-kit
gmickel/flow-next trailofbits/skills-curated hesreallyhim/awesome-claude-code
VoltAgent/awesome-agent-skills sickn33/antigravity-awesome-skills travisvn/awesome-claude-skills
gsd-build/get-shit-done
doobidoo/mcp-memory-service getzep/graphiti modelcontextprotocol/servers volcengine/OpenViking
topoteretes/cognee mem0ai/mem0 supermemoryai/supermemory thedotmack/claude-mem
qdrant/mcp-server-qdrant chroma-core/chroma-mcp zilliztech/mcp-server-milvus
letta-ai/letta letta-ai/letta-code MemPalace/mempalace
upstash/context7 modelcontextprotocol/server-github yamadashy/repomix oraios/serena
github/spec-kit grafana/mcp-grafana langfuse/langfuse comet-ml/opik
microsoft/playwright-mcp ChromeDevTools/chrome-devtools-mcp
firecrawl/firecrawl-mcp-server exa-labs/exa-mcp-server
microsoft/markitdown docling-project/docling huggingface/FlagEmbedding
explodinggradients/ragas openllmetry/sdk UKGovernmentBEIS/inspect_ai
atlassian-labs/mcp-compressor distill-mcp chopratejas/headroom open-compress/claw-compactor
mksglu/context-mode
buildoak/wet yvgude/lean-ctx ComposioHQ/agent-orchestrator HKUDS/OpenHarness InvariantLabs-ai/mcp-scan
opensesh/KARIMO PaddlePaddle/PaddleOCR jlowin/fastmcp gepa-ai/gepa
microsoft/LLMLingua trufflesecurity/trufflehog aquasecurity/trivy semgrep/semgrep
modelcontextprotocol/server-fetch modelcontextprotocol/server-git
""".split()
)

# Read all JSONL files
candidates = {}
for jf in glob.glob("*.jsonl"):
    try:
        with open(jf, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("//") or line == "[]":
                    continue
                try:
                    obj = json.loads(line)
                    name = obj.get("name", "")
                    if name and name not in candidates:
                        obj["_source"] = jf
                        candidates[name] = obj
                except json.JSONDecodeError:
                    pass
    except FileNotFoundError:
        pass

# Filter NEW (not in KNOWN set, and stars >= 50)
new_candidates = {
    k: v
    for k, v in candidates.items()
    if k not in KNOWN and (v.get("stars") or 0) >= 50
}
known_hits = {k: v for k, v in candidates.items() if k in KNOWN}

# Sort NEW by stars desc
sorted_new = sorted(
    new_candidates.items(), key=lambda kv: kv[1].get("stars") or 0, reverse=True
)

print(f"Total unique repos harvested: {len(candidates)}")
print(f"Already-known (W237/W241/W250): {len(known_hits)}")
print(f"NET-NEW (>=50 stars, not in known): {len(new_candidates)}")
print("\n=== Top-50 NET-NEW candidates ===")
for name, obj in sorted_new[:50]:
    desc = (obj.get("desc") or "")[:90]
    lic = obj.get("license") or "NULL"
    pushed = (obj.get("pushed") or "")[:10]
    print(f"  {obj.get('stars'):>6}*  {lic:<12} {pushed} {name:<48} | {desc}")

# Write top-100 to file
with open("top100-net-new.json", "w", encoding="utf-8") as f:
    json.dump(
        [
            {
                "name": name,
                "stars": obj.get("stars"),
                "license": obj.get("license"),
                "pushed": obj.get("pushed"),
                "created": obj.get("created"),
                "desc": obj.get("desc"),
                "source_query": obj.get("_source"),
            }
            for name, obj in sorted_new[:100]
        ],
        f,
        indent=2,
    )

with open("top100-known-hits.json", "w", encoding="utf-8") as f:
    json.dump(
        [
            {
                "name": name,
                "stars": obj.get("stars"),
                "license": obj.get("license"),
                "pushed": obj.get("pushed"),
            }
            for name, obj in sorted(
                known_hits.items(), key=lambda kv: kv[1].get("stars") or 0, reverse=True
            )[:50]
        ],
        f,
        indent=2,
    )

print("\n=== Top-25 Already-known hits (freshness re-validation) ===")
for name, obj in sorted(
    known_hits.items(), key=lambda kv: kv[1].get("stars") or 0, reverse=True
)[:25]:
    print(
        f"  {obj.get('stars'):>6}*  {(obj.get('license') or 'NULL'):<12} {(obj.get('pushed') or '')[:10]} {name}"
    )

print("\n=== NET-NEW grouped by license ===")
by_lic = {}
for n, o in new_candidates.items():
    lic = o.get("license") or "NULL"
    by_lic.setdefault(lic, []).append(n)
for lic in sorted(by_lic, key=lambda L: -len(by_lic[L])):
    print(f"  {lic:<14}: {len(by_lic[lic])}")
