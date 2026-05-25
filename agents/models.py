from __future__ import annotations
import uuid
from enum import Enum
from typing import Literal
from pydantic import BaseModel, Field


class Budget(BaseModel):
    max_tool_calls: int = 15
    max_tokens: int = 140_000
    wall_time_seconds: int = 1800
    no_progress_seconds: int = 600
    """Flatline detector — abort if no meaningful progress for this many seconds."""
    p99_target_sec: int = 1800
    """SLO target: p99 wall-time budget in seconds."""
    max_attempts: int = 3
    """Temporal RetryPolicy: maximum task attempt count before permanent failure."""
    iterations: int = 1
    """L0-validated: number of task iterations allowed (1..500)."""
    timeout_seconds: int = 1800
    """L0-validated: per-task timeout in seconds (1..7200)."""


class TaskSpec(BaseModel):
    task: str = Field(min_length=1)
    repo: str | None = None
    runtime: str = "openhands"
    budget: Budget = Field(default_factory=Budget)
    hitl: bool = False
    codex_profile: Literal["t1-light", "t2-standard", "t3-deep", "deep-review-exec"] = (
        "t1-light"
    )
    """Codex review depth profile. 't1-light' is the default fast-path.
    Note: spec §4 v6 describes sha256-of-canonical-json as the eventual default factory
    for conversation_id; uuid4 is used here for v1 simplicity (sufficient for uniqueness)."""
    conversation_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    """Unique identifier for this task's conversation thread.

    DIM-19 fix (post-r-final-3 e2e bring-up): must be a valid UUID4 string per
    openhands-sdk@1.22.1 ConversationState.id (cite: openhands/sdk/conversation/state.py:82
    typed as ConversationID which is UUID-validated by pydantic). Prior format
    `f"w375-{uuid4().hex[:16]}"` failed validation with
    `Input should be a valid UUID, invalid character: found 'w' at 1` (pydantic
    uuid_parsing error). v1 keeps the plain UUID4; grep-friendly W375 tagging
    happens via TaskWorkflow workflow-id (set by dispatch CLI) which is separate."""
    workspace_mode: Literal["local", "remote"] = Field(
        default="remote",
        description=(
            "W376 Workspace dispatch mode. 'remote' = docker-py-spawned agent-server "
            "container + RemoteWorkspace (full Docker isolation, ~3-5s spawn). "
            "'local' = LocalWorkspace in-process (fast, no isolation; trusted tasks "
            "only). Default 'remote' matches W375 original security intent. "
            "Cite: openhands-sdk@1.22.1 openhands/sdk/workspace/workspace.py:12-29."
        ),
    )
    base_commit: str | None = Field(
        default=None,
        description=(
            "W376 admission-coordinator op_id input (codex r1 D3 R1 + C24). Git base "
            "commit SHA the task operates against. Distinct base_commit → distinct "
            "workflow_id (same task+repo on different commits are different operations). "
            "None for ad-hoc tasks not tied to a specific commit. Cite: spec §6.11 "
            "AdmissionCoordinator.compute_op_id + plan Task 20."
        ),
    )
    idempotency_key: str | None = Field(
        default=None,
        description=(
            "W376 admission-coordinator caller-supplied idempotency override (codex r2 "
            "D3-r2-P0-3). When set, overrides the derived op_id so the caller controls "
            "dedup identity directly. None → op_id derived from (task, repo, base_commit). "
            "Cite: spec §6.11 + plan Task 20 test_caller_supplied_idempotency_key_overrides_derivation."
        ),
    )


class TaskStatus(str, Enum):
    COMPLETE = "COMPLETE"
    FAILED = "FAILED"
    BUDGET_PARTIAL = "BUDGET_PARTIAL"
    CANCELLED = "CANCELLED"


class JuryResult(BaseModel):
    verdict: str
    source: str
    notes: str | None = None


class TaskResult(BaseModel):
    status: TaskStatus
    result: str | None = None
    artifacts: list[str] = Field(default_factory=list)
    cost_usd: float | None = None
    trace_url: str | None = None
    event_history_url: str | None = None
    error: str | None = None
    # W375 P1.7 fields — conversation tracking + jury verdict + elapsed time
    conversation_id: str | None = None
    events_processed: int = 0
    jury_verdict: str | None = None
    elapsed_sec: int = 0
    # NEW fields for W374-EXT Task 8 (pre-L3 sandbox test gate per sca-v20 D78 +
    # Google SRE Ch.17 "test in CI before review"). All three default to safe
    # backward-compatible values so existing TaskResult call sites are unaffected.
    tests_passed: bool | None = None
    """In-sandbox test result reported by the executor.
    None  -> unknown / no test info (review_gate falls through to Codex).
    True  -> tests passed (Codex still adjudicates AC beyond tests).
    False -> tests failed (review_gate short-circuits to SHORT_CIRCUIT_REVISE).

    NOTE: review_gate precedence — when status is FAILED, the verdict is
    SHORT_CIRCUIT_FAILED regardless of this field's value (status takes
    precedence per fail-CLOSED contract; see agents/review_gate.py Branch 1
    + test_status_takes_precedence_over_tests_passed)."""
    tests_added: int = 0
    """Count of new test functions/cases added by the executor. Informational
    only — surfaced to the operator review UI but NOT a review_gate input."""
    coverage_delta_pct: float = 0.0
    """Coverage % delta vs base. Informational only; informs operator review
    but NOT a review_gate input (Codex adjudicates coverage quality if needed)."""


class TaskSpecError(ValueError):
    """Raised by L0 input-validate when TaskSpec is malformed or unsafe.

    Subclass of ValueError so Temporal workflow's non_retryable_error_types
    list catches it under both "TaskSpecError" and "ValueError" names.
    """

    pass
