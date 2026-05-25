# Wave 85 Agent B — Memory L2+L3 Wire Deep-Dive
agent: codex:codex-rescue (STAND-IN — direct repo-read; codex CLI not invoked)
verdict: 5 prescriptions verified at file:line + HEAD SHA

S1 GRAPHITI L3: FALKORDB_URI=redis://127.0.0.1:16379 (NOT NEO4J_URI); OPENAI_API_KEY mandatory. main.py:17-25@c427615; factories.py:399-432 Falkor; factories.py:73-91 OpenAI validation.
S2 QDRANT L2: doobidoo v10.51 has NO Qdrant backend (sqlite_vec/cloudflare/hybrid/milvus only). Deploy mcp-server-qdrant SEPARATELY alongside doobidoo L1.
S3 SOTA: getzep/Graphiti L3 + doobidoo L1 + qdrant/mcp-server-qdrant L2 + mem0 + letta + langmem comparators.
S4 V64 LANE: extend manifest.json with evidence_refs[] alongside evidence_paths[].
S5 PRESCRIPTIONS: P1 Graphiti .mcp.json patch with FALKORDB_URI; P2 deploy Qdrant + mcp-server-qdrant; P3 keep L1 doobidoo; P4 NOT NEO4J_URI; P5 V64 manifest extension.
