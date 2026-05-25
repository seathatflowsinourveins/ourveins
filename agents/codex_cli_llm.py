# agents/codex_cli_llm.py
"""W375 CodexCLIProvider — LiteLLM CustomLLM wrapping `codex exec` subprocess (Path B GPT-5.5 jury).

Cite: spec §5 v6 + V2 (codex CLI flags) + V8 (cross-platform subprocess) + codex r1 env-allowlist.

Invocation: `codex exec --profile {prof} --model gpt-5.5 --json --ephemeral --sandbox read-only
            --skip-git-repo-check --output-schema {f} --output-last-message {f} --color never -`
with stdin prompt (no argv leak). Env allowlist = {CODEX_HOME, PATH} only.

Routes via ChatGPT-OAuth subscription (auth_mode=chatgpt) — $0 per-token cost on subscription quota.

LiteLLM API adaptation (W375 P3.1): CustomLLM.completion() signature includes many framework params
(model_response, print_verbose, encoding, api_key, logging_obj, optional_params, ...) — absorbed via
**kwargs so direct 2-arg test calls (model, messages) and LiteLLM-routed calls both work.
"""

from __future__ import annotations

import glob
import json
import os
import shutil
import subprocess
import tempfile
from typing import Any

import litellm
from litellm import CustomLLM, ModelResponse
from litellm.types.utils import Choices, Message

from agents.subprocess_helpers import _cancel_subprocess_blocking, _spawn_kwargs

# OpenAI strict structured-output (response_format json_schema) requires EVERY object to declare
# additionalProperties:false and list all of its properties in required[]. Omitting either yields
# a 400 invalid_json_schema from the model backend (caught by the W376 live e2e; the mocked unit
# tests never exercised the real backend). Keep this schema strict-valid.
LITELLM_RESPONSE_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "choices": {
            "type": "array",
            "items": {
                "type": "object",
                "additionalProperties": False,
                "properties": {
                    "message": {
                        "type": "object",
                        "additionalProperties": False,
                        "properties": {
                            "role": {"type": "string"},
                            "content": {"type": "string"},
                        },
                        "required": ["role", "content"],
                    },
                },
                "required": ["message"],
            },
        },
    },
    "required": ["choices"],
}


def _codex_argv_prefix() -> list[str]:
    """argv prefix to launch the codex CLI, resolved per-platform.

    Linux/Docker (the production worker target): 'codex' is a real binary on PATH; the bare name
    resolves via execvp and is returned unchanged. Windows host-dev: npm ships 'codex.cmd' (a Node
    shim) plus a vendored native 'codex.exe'; Windows CreateProcess performs no PATHEXT lookup and
    cannot exec a .cmd directly, so prefer the native exe (on PATH, else discovered under the npm
    tree), then route codex.cmd through cmd.exe, then fall back to the bare name.
    """
    if os.name != "nt":
        return ["codex"]
    exe = shutil.which("codex.exe")
    if exe:
        return [exe]
    appdata = os.environ.get("APPDATA")
    if appdata:
        pattern = os.path.join(
            appdata,
            "npm",
            "node_modules",
            "@openai",
            "codex",
            "node_modules",
            "@openai",
            "codex-win32-*",
            "**",
            "codex.exe",
        )
        hits = [h for h in glob.glob(pattern, recursive=True) if ".codex-" not in h]
        if hits:
            return [hits[0]]
    cmd = shutil.which("codex.cmd")
    if cmd:
        return ["cmd", "/c", cmd]
    return ["codex"]


class CodexCLIProvider(CustomLLM):
    """LiteLLM CustomLLM provider — codex CLI subprocess (auth_mode=chatgpt OAuth).

    completion() accepts the full LiteLLM CustomLLM framework signature (model_response,
    print_verbose, encoding, api_key, logging_obj, optional_params, ...) via **kwargs, plus
    the minimal 2-arg direct call form (model, messages) used in tests.
    """

    def completion(self, model: str, messages: list, **kwargs) -> Any:  # type: ignore[override]
        profile = model.split("/", 1)[1] if "/" in model else "deep-review-exec"
        schema_path = None
        out_path = None
        try:
            # Pre-create schema and output temp files
            with tempfile.NamedTemporaryFile(
                "w", suffix=".json", delete=False, encoding="utf-8"
            ) as schema_f:
                json.dump(LITELLM_RESPONSE_SCHEMA, schema_f)
                schema_f.flush()
                schema_path = schema_f.name
            with tempfile.NamedTemporaryFile(suffix=".json", delete=False) as out_f:
                out_path = out_f.name

            # Env allowlist — codex r1 fix (no secret leak via env inheritance)
            allowed_env = {
                "CODEX_HOME": os.environ.get("CODEX_HOME", ""),
                "PATH": os.environ.get("PATH", ""),
            }
            if os.name == "nt":
                # Windows host-dev: the native codex.exe / cmd.exe shim require these non-secret
                # runtime vars (an allowlisted env does not inherit them). No credential-class
                # vars are added, so the no-secret-leak invariant is preserved.
                for _v in (
                    "SystemRoot",
                    "windir",
                    "TEMP",
                    "TMP",
                    "ComSpec",
                    "PATHEXT",
                    "USERPROFILE",
                    "APPDATA",
                    "LOCALAPPDATA",
                    "NUMBER_OF_PROCESSORS",
                    "PROCESSOR_ARCHITECTURE",
                ):
                    _val = os.environ.get(_v)
                    if _val:
                        allowed_env[_v] = _val

            prompt = self._render_chat(messages).encode("utf-8")

            proc = subprocess.Popen(
                [
                    *_codex_argv_prefix(),
                    "exec",
                    "--profile",
                    profile,
                    "--model",
                    "gpt-5.5",
                    "--json",
                    "--ephemeral",
                    "--sandbox",
                    "read-only",
                    "--skip-git-repo-check",
                    "--output-schema",
                    schema_path,
                    "--output-last-message",
                    out_path,
                    "--color",
                    "never",
                    "-",  # stdin prompt marker (codex r1 fix: no argv leak)
                ],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                env=allowed_env,
                **_spawn_kwargs(),
            )

            try:
                timeout_s = kwargs.get("timeout", 300)
                # httpx.Timeout objects or None — extract float if needed
                if hasattr(timeout_s, "read"):
                    timeout_s = timeout_s.read or 300
                stdout, stderr = proc.communicate(input=prompt, timeout=timeout_s)
            except subprocess.TimeoutExpired:
                _cancel_subprocess_blocking(proc)
                return self._spillover(messages, **kwargs)

            if proc.returncode != 0:
                return self._spillover(messages, **kwargs)

            # READ-BEFORE-UNLINK (codex r5 P0-3 fix)
            with open(out_path, "r", encoding="utf-8") as f:
                payload = f.read()
            return self._parse_last_message(model, payload)
        finally:
            for p in (schema_path, out_path):
                if p:
                    try:
                        os.unlink(p)
                    except OSError:
                        pass

    @staticmethod
    def _render_chat(messages: list) -> str:
        """Serialize OpenAI-style chat messages to a single text prompt for codex stdin."""
        parts = []
        for m in messages:
            role = m.get("role")
            content = m.get("content", "")
            if role == "system":
                parts.append(f"[SYSTEM]\n{content}\n[/SYSTEM]")
            elif role == "user":
                parts.append(f"[USER]\n{content}\n[/USER]")
            elif role == "assistant":
                parts.append(f"[ASSISTANT]\n{content}\n[/ASSISTANT]")
            elif role == "tool":
                name = m.get("name", "?")
                parts.append(f"[TOOL_RESULT name={name}]\n{content}\n[/TOOL_RESULT]")
        return "\n".join(parts)

    @staticmethod
    def _parse_last_message(model: str, payload: str) -> ModelResponse:
        """Convert codex --output-last-message JSON to a LiteLLM ModelResponse."""
        try:
            data = json.loads(payload)
        except json.JSONDecodeError:
            data = {"choices": [{"message": {"role": "assistant", "content": payload}}]}

        choices = []
        for ch in data.get("choices", []):
            msg = ch.get("message", {})
            choices.append(
                Choices(
                    message=Message(
                        role=msg.get("role", "assistant"),
                        content=msg.get("content", ""),
                    ),
                )
            )
        return ModelResponse(model=model, choices=choices)

    def _spillover(self, messages: list, **kwargs) -> Any:
        """Routine path: codex → Ollama qwen3-coder:30b → defer.
        Jury path: codex → DEFER (no Ollama for jury per codex r2 [DIM-8]).
        """
        if kwargs.get("is_jury", False):
            raise litellm.exceptions.APIError(
                message="jury quota exhausted; DEFER (no Ollama fallback for jury)",
                model=kwargs.get("model", "codex/deep-review-exec"),
                llm_provider="codex",
                status_code=429,
            )
        # Routine spillover stub — Ollama wiring deferred to follow-up
        raise litellm.exceptions.APIError(
            message="codex failed; Ollama spillover not yet wired (deferred to follow-up)",
            model=kwargs.get("model", "codex/t1-light"),
            llm_provider="codex",
            status_code=500,
        )


# Register with LiteLLM custom provider map (idempotent)
def _register_provider() -> None:
    existing = getattr(litellm, "custom_provider_map", None)
    if existing is None:
        litellm.custom_provider_map = []
        existing = litellm.custom_provider_map
    if not any(p.get("provider") == "codex" for p in existing):
        existing.append({"provider": "codex", "custom_handler": CodexCLIProvider()})


_register_provider()
