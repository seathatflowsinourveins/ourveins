# Wave 85 Agent C — ACP Wiring Deep-Dive
agent: gpt5-reviewer (STAND-IN — Sonnet stand-in)
verdict: ADOPT-ADAPTER-CONSUMER conf=0.78

S1 ADAPTER: @agentclientprotocol/claude-agent-acp@0.33.1 npm; bin claude-agent-acp; wraps @anthropic-ai/claude-agent-sdk; HEAD c78ac62d.
S2 SPEC: agent-client-protocol JSON-RPC schema; sessions independent; _meta reserved for extension. HEAD 36ea605.
S3 SDK: agent-client-protocol PyPI 0.10.0 (Python >=3.10,<3.15); Python 3.13 venv compatible. HEAD df72173.
S4 SHAPE: ADAPTER-CONSUMER preferred (lower commitment); HOST defers Wave 86+.
S5 PRESCRIPTIONS: P1 npm -g claude-agent-acp; P2 pip agent-client-protocol; P3 sessionId affinity + _meta.cache_affinity_key; P4 dont advertise FS capability; P5 defer HOST.
