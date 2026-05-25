# W376 PHASE D — Integration Fixes (installed-vs-spec drift surfaced during implementation)

> Design-phase codex reviews (6/6 APPROVE) validated the spec against upstream SDK source
> cites + Temporal/docker APIs, but could NOT catch installed-package version-API drift
> (which only surfaces when code runs against the actual venv). These are the integration
> fixes the implementation phase surfaced. Applied in the post-Stream-A integration pass.

## IF-1: Langfuse v2-API → v4.2.0 migration (P0)

**Surfaced by**: Stream B (T19+T26) implementer + orchestrator venv probe 2026-05-23.

**Finding**: venv `Z:/venvs/claude` has `langfuse==4.2.0`. The W376 spec/plan Langfuse
code-sketch (Task 19) uses the **v2 API** `langfuse.trace()` + `trace.generation()` —
BOTH removed in v4. Also a CLAUDE.md drift: T5 memory-tier claims `langfuse v3.174.1`
but installed is `4.2.0`. (v3 ALSO lacks `.trace()` — the sketch was wrong for v3 too.)

**venv v4.2.0 API probe** (`Langfuse` class methods):
- `trace`: ✗ · `generation`: ✗ · `start_span`: ✗ · `start_generation`: ✗
- `start_observation`: ✓ (canonical low-level) · module-level `@observe` decorator: ✓

**Migration** (apply to `agents/llm_factory.py:_on_generation` + `agents/jury_activity.py:_emit_jury_generation`):
```python
# OLD (v2, AttributeError on v4):
trace = langfuse.trace(name="openhands.routine", session_id=conversation_id)
gen = trace.generation(name=model, model=model, input=redacted_prompt, output=redacted_completion)
gen.end(usage={"prompt_tokens": u.input, "completion_tokens": u.output, "total_tokens": u.total})

# NEW (langfuse 4.2.0 start_observation):
gen = langfuse.start_observation(
    name=model, as_type="generation",
    input=redacted_prompt,
    metadata={"session_id": conversation_id},
)
gen.update(model=model, output=redacted_completion,
           usage_details={"input": u.input, "output": u.output, "total": u.total})
gen.end()
langfuse.flush()  # v4 explicit flush
```
Cite: langfuse 4.2.0 `langfuse/_client/client.py` start_observation signature (verify via
`Z:/venvs/claude/Scripts/python.exe -c "import langfuse, inspect; print(inspect.signature(langfuse.Langfuse.start_observation))"`).

**Test impact**: Stream B's tests MOCK Langfuse so they pass regardless — but the mock
should be updated to assert the v4 `start_observation`/`update`/`end` call shape so the
test actually pins the production contract.

**Spec/plan update**: Task 19 code-sketch in plan + spec §7.2 must be migrated to v4 API.

## IF-2: openhands-sdk==1.22.1 NOT installed (P0 — operator-sign'd venv install)

**Surfaced by**: Stream 7+8 (workspace_factory) + Stream A (temporal_worker) implementers.

**Finding**: `pip show openhands-sdk` → not found in venv. All W376 modules import
`from openhands.sdk import ...` which ModuleNotFoundError at runtime. Unit tests MOCK the
SDK (inject fake into sys.modules) — valid TDD — but LIVE e2e (Tasks 13-14) CANNOT run
until `pip install openhands-sdk==1.22.1` into the shared venv. Per CR-1 this is an
operator-sign'd install (shared venv `Z:/venvs/claude` used by sibling/parent runtimes).

**Resolution**: operator-sign'd `pip install openhands-sdk==1.22.1` (+ agent-server image
pull) before Tasks 13-14 live e2e. Unit tests + ship-gate proceed unblocked on mocks.

## IF-3: T5 Langfuse version drift in CLAUDE.md (P1 — verify-before-claim)

CLAUDE.md L36 claims `T5 langfuse ✓ LIVE v3.174.1`; venv has `langfuse==4.2.0`. Either
the running Docker Langfuse service is v3.174.1 (server) while the Python client lib is
v4.2.0 (client) — a server/client version split — OR the CLAUDE.md claim is stale. Probe
both: `docker ps | grep langfuse` (server) vs `pip show langfuse` (client). Reconcile in
the next CLAUDE.md verify-before-claim sweep (cardinal-rule-6).
