# oraios/serena source-code deep-dive 2026-05-15

## top-of-tree contents
- .devcontainer (dir, size=0)
- .dockerignore (file, size=231)
- .env.example (file, size=66)
- .gitattributes (file, size=217)
- .github (dir, size=0)
- .gitignore (file, size=4339)
- .serena (dir, size=0)
- .vscode (dir, size=0)
- AGENTS.md (file, size=221)
- CHANGELOG.md (file, size=36398)
- CLAUDE.md (file, size=221)
- CONTRIBUTING.md (file, size=1785)
- DOCKER.md (file, size=5866)
- Dockerfile (file, size=2603)
- LICENSE (file, size=1066)
- README-dev.md (file, size=852)
- README.md (file, size=14390)
- compose.yaml (file, size=806)
- docker_build_and_run.sh (file, size=93)
- docs (dir, size=0)
- flake.lock (file, size=3352)
- flake.nix (file, size=3829)
- news (dir, size=0)
- pyproject.toml (file, size=11501)
- repo_dir_sync.py (file, size=15260)

## file: README.md
```
<p align="center" style="text-align:center;">
  <img src="resources/serena-logo.svg#gh-light-mode-only" style="width:500px">
  <img src="resources/serena-logo-dark-mode.svg#gh-dark-mode-only" style="width:500px">
</p>

<h3 align="center">
    The IDE for Your Coding Agent
</h3>

<div align="center">
  <a href="https://discord.com/invite/cVUNQmnV4r"><img src="https://img.shields.io/badge/discord-join-5865F2?style=flat-square&labelColor=0a0e14&logo=discord&logoColor=5865F2" alt="discord"></a>
  <a href="https://github.com/oraios/serena/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-b0e8ff?style=flat-square&labelColor=0a0e14" alt="license"></a>
</div>
<br>


* Serena provides essential **semantic code retrieval, editing, refactoring and debugging tools** that are akin to an IDE's capabilities,
  operating at the symbol level and exploiting relational structure.
* It integrates with any client/LLM via the model context protocol (**MCP**).
  
Serena's **agent-first tool design** involves robust high-level abstractions, distinguishing it from
approaches that rely on low-level concepts like line numbers or primitive search patterns.

Practically, this means that your agent operates **faster, more efficiently and more reliably**, especially in larger and
more complex codebases.

> [!IMPORTANT]
> Do not install Serena via an MCP or plugin marketplace! They contain outdated and suboptimal installation commands. 
> Instead, follow our [Quick Start](#quick-start) instructions.

## Quick Demo

https://github.com/user-attachments/assets/8d11646e-b80e-4723-b9d7-32d6101b5f58

:tv: Longer video: [Introduction to Serena in 5 Minutes (YouTube)](https://www.youtube.com/watch?v=5QN7gN1KYLA)

## What Our "End Users" Say

While it is humans who download and set up Serena, our end users are essentially AI agents.
As the ones actually applying Serena's tools, they are in the best position to evaluate Serena.

We crafted an unbiased evaluation prompt that leads the agent to perform ~20 routine coding tasks, 
representative of everyday development work, 
in order to estimate the value added by Serena's tools when used alongside its own built-ins. 

Here's a one-sentence summary of what the agents had to say:

**Opus 4.6 (high) in Claude Code on a large Python codebase:**
> "Serena's IDE-backed semantic tools are the single most impactful addition to my toolkit – cross-file renames, moves, and reference lookups that
would cost me 8–12 careful, error-prone steps collapse into one atomic call, and I would absolutely ask any developer I work with to set them up."

**GPT 5.4 (high) in Codex CLI on a Java codebase:**
> "As a coding AI agent, I would ask my owner to add Serena because it gives me the missing IDE-level understanding of symbols, references, and
refactorings, turning fragile text surgery into calmer, faster, more confident code changes where semantics matter."

**GPT 5.4 (medium) in Copilot CLI on a large, multi-language monorepo:**
> "As a coding agent, I’d absolutely ask my owner to add Serena because it makes me noticeably sharper and calmer on
real code – especially symbol-aware navigation, cross-file refactors, and monorepo dependency jumps – while I still lean
on built-ins for tiny text edits and non-code work."
```

## file: LICENSE
```
MIT License

Copyright (c) 2025 Oraios AI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## file: pyproject.toml
```
[build-system]
build-backend = "hatchling.build"
requires = ["hatchling"]

[project]
name = "serena-agent"
version = "1.3.1.dev0"
description = "A powerful MCP toolkit for coding, providing semantic retrieval and editing capabilities - the IDE for your agent"
authors = [{ name = "Oraios AI", email = "info@oraios-ai.de" }]
readme = "README.md"
requires-python = ">=3.11, <3.15"
classifiers = [
  "License :: OSI Approved :: MIT License",
  "Programming Language :: Python :: 3.11",
  "Programming Language :: Python :: 3.12",
  "Programming Language :: Python :: 3.13",
  "Programming Language :: Python :: 3.14",
]
dependencies = [
  "requests==2.33.0",
  "pyright==1.1.403",
  "fortls==3.2.2",
  "overrides==7.7.0",
  "python-dotenv==1.2.2",
  "mcp==1.27.0",
  "flask==3.1.3", # bumped from 3.1.1 for CVE fix (also fixes werkzeug alert)
  "sensai-utils==1.5.0",
  "pydantic==2.12.5",
  "types-pyyaml==6.0.12.20250516",
  "pyyaml==6.0.2",
  "ruamel.yaml==0.18.14",
  "jinja2==3.1.6",
  "dotenv==0.9.9",
  "pathspec==0.12.1",
  "psutil==7.0.0",
  "docstring_parser==0.17.0",
  "joblib==1.5.1",
  "tqdm==4.67.1",
  "tiktoken==0.12.0",
  "anthropic==0.59.0",
  "beautifulsoup4==4.14.2",
  "pywebview==6.2",
  "pystray==0.19.5",
  "pygls==2.1.1", # used to implement an msl language server
  "lsprotocol==2025.0.0",
  # Transitive deps pinned for security (dependabot alerts).
  # Exact pins because uvx installs from git, ignoring the lock file.
  "urllib3==2.7.0",
  "werkzeug==3.1.7",
  "starlette==1.0.0",
  "python-multipart==0.0.27",
  "filelock==3.25.2",
  "cryptography==46.0.7",
  "regex==2026.2.28",
  "pythonnet==3.1.0-rc0 ; sys_platform == 'win32'",
]


[[tool.uv.index]]
name = "testpypi"
```

