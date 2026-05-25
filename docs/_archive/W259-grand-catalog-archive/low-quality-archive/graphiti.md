# getzep/graphiti source-code deep-dive 2026-05-15

## top-of-tree contents
- .env.example (file, size=288)
- .github (dir, size=0)
- .gitignore (file, size=3032)
- AGENTS.md (file, size=3570)
- CLAUDE.md (file, size=6672)
- CODE_OF_CONDUCT.md (file, size=5220)
- CONTRIBUTING.md (file, size=10044)
- Dockerfile (file, size=2628)
- LICENSE (file, size=11325)
- Makefile (file, size=552)
- OTEL_TRACING.md (file, size=1180)
- README.md (file, size=25673)
- SECURITY.md (file, size=402)
- Zep-CLA.md (file, size=5607)
- conftest.py (file, size=601)
- depot.json (file, size=20)
- docker-compose.test.yml (file, size=931)
- docker-compose.yml (file, size=2203)
- ellipsis.yaml (file, size=888)
- examples (dir, size=0)
- graphiti_core (dir, size=0)
- images (dir, size=0)
- mcp_server (dir, size=0)
- py.typed (file, size=0)
- pyproject.toml (file, size=2552)

## file: README.md
```
<p align="center">
  <a href="https://www.getzep.com/">
    <img src="https://github.com/user-attachments/assets/119c5682-9654-4257-8922-56b7cb8ffd73" width="150" alt="Zep Logo">
  </a>
</p>

<h1 align="center">
Graphiti
</h1>
<h2 align="center">Build Temporal Context Graphs for AI Agents</h2>

<div align="center">

[![Lint](https://github.com/getzep/Graphiti/actions/workflows/lint.yml/badge.svg?style=flat)](https://github.com/getzep/Graphiti/actions/workflows/lint.yml)
[![Unit Tests](https://github.com/getzep/Graphiti/actions/workflows/unit_tests.yml/badge.svg)](https://github.com/getzep/Graphiti/actions/workflows/unit_tests.yml)
[![MyPy Check](https://github.com/getzep/Graphiti/actions/workflows/typecheck.yml/badge.svg)](https://github.com/getzep/Graphiti/actions/workflows/typecheck.yml)

[![GitHub Repo stars](https://img.shields.io/github/stars/getzep/graphiti)](https://github.com/getzep/graphiti/stargazers)
[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?&logo=discord&logoColor=white)](https://discord.com/invite/W8Kw6bsgXQ)
[![arXiv](https://img.shields.io/badge/arXiv-2501.13956-b31b1b.svg?style=flat)](https://arxiv.org/abs/2501.13956)
[![Release](https://img.shields.io/github/v/release/getzep/graphiti?style=flat&label=Release&color=limegreen)](https://github.com/getzep/graphiti/releases)

</div>
<div align="center">

<a href="https://trendshift.io/repositories/12986" target="_blank"><img src="https://trendshift.io/api/badge/repositories/12986" alt="getzep%2Fgraphiti | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>

</div>

> [!NOTE]
> **We're Hiring!** Build context graphs that power reliable, personalized, fast production AI agents.
> Come build with us — we're hiring Engineers and Developer Relations folks. [View open roles](https://www.getzep.com/careers/).

⭐ *Help us reach more developers and grow the Graphiti community. Star this repo!*

&nbsp;

> [!TIP]
> Check out the new [MCP server for Graphiti](mcp_server/README.md)! Give Claude, Cursor, and other MCP clients powerful
> context graph-based memory with temporal awareness.

Graphiti is a framework for building and querying temporal context graphs for AI agents. Unlike static knowledge graphs,
Graphiti's context graphs track how facts change over time, maintain provenance to source data, and support both
prescribed and learned ontology — making them purpose-built for agents operating on evolving, real-world data.

Unlike traditional retrieval-augmented generation (RAG) methods, Graphiti continuously integrates user interactions,
structured and unstructured enterprise data, and external information into a coherent, queryable graph. The framework
supports incremental data updates, efficient retrieval, and precise historical queries without requiring complete graph
recomputation, making it suitable for developing interactive, context-aware AI applications.

Use Graphiti to:

- Build context graphs that evolve with every interaction — tracking what's true now and what was true before.
- Give agents rich, structured context instead of flat document chunks or raw chat history.
- Query across time, meaning, and relationships with hybrid retrieval (semantic + keyword + graph traversal).

&nbsp;

<p align="center">
    <img src="images/graphiti-graph-intro.gif" alt="Graphiti temporal walkthrough" width="700px">
```

## file: LICENSE
```
                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."
```

## file: pyproject.toml
```
[project]
name = "graphiti-core"
description = "A temporal graph building library"
version = "0.29.0"
authors = [
    { name = "Paul Paliychuk", email = "paul@getzep.com" },
    { name = "Preston Rasmussen", email = "preston@getzep.com" },
    { name = "Daniel Chalef", email = "daniel@getzep.com" },
]
readme = "README.md"
license = "Apache-2.0"
requires-python = ">=3.10,<4"
dependencies = [
    "pydantic>=2.11.5",
    "neo4j>=5.26.0",
    "openai>=1.91.0",
    "tenacity>=9.0.0",
    "numpy>=1.0.0",
    "python-dotenv>=1.0.1",
    "posthog>=3.0.0"
]

[project.urls]
Homepage = "https://help.getzep.com/graphiti/graphiti/overview"
Repository = "https://github.com/getzep/graphiti"

[project.optional-dependencies]
anthropic = ["anthropic>=0.49.0"]
groq = ["groq>=0.2.0"]
google-genai = ["google-genai>=1.62.0"]
kuzu = ["kuzu>=0.11.3"]
falkordb = ["falkordb>=1.1.2,<2.0.0"]
voyageai = ["voyageai>=0.2.3"]
gliner2 = ["gliner2>=1.2.0; python_version>='3.11'"]
neo4j-opensearch = ["boto3>=1.39.16", "opensearch-py>=3.0.0"]
sentence-transformers = ["sentence-transformers>=3.2.1"]
neptune = ["langchain-aws>=0.2.29", "opensearch-py>=3.0.0", "boto3>=1.39.16"]
tracing = ["opentelemetry-api>=1.20.0", "opentelemetry-sdk>=1.20.0"]
dev = [
    "pyright>=1.1.404",
    "groq>=0.2.0",
    "anthropic>=0.49.0",
    "google-genai>=1.8.0",
    "falkordb>=1.1.2,<2.0.0",
    "kuzu>=0.11.3",
    "boto3>=1.39.16",
    "opensearch-py>=3.0.0",
    "langchain-aws>=0.2.29",
    "ipykernel>=6.29.5",
    "jupyterlab>=4.2.4",
    "langgraph>=1.0.10",
    "langchain-anthropic>=0.2.4",
    "langsmith>=0.1.108",
    "langchain-openai>=0.2.6",
    "sentence-transformers>=3.2.1",
    "transformers>=4.45.2",
    "voyageai>=0.2.3",
    "pytest>=8.3.3",
    "pytest-asyncio>=0.24.0",
    "pytest-xdist>=3.6.1",
```

## file: mcp_server/main.py
```
#!/usr/bin/env python3
"""
Main entry point for Graphiti MCP Server

This is a backwards-compatible wrapper around the original graphiti_mcp_server.py
to maintain compatibility with existing deployment scripts and documentation.

Usage:
    python main.py [args...]

All arguments are passed through to the original server implementation.
"""

import sys
from pathlib import Path

# Add src directory to Python path for imports
src_path = Path(__file__).parent / 'src'
sys.path.insert(0, str(src_path))

# Import and run the original server
if __name__ == '__main__':
    from graphiti_mcp_server import main

    # Pass all command line arguments to the original main function
    main()
```

## file: mcp_server/README.md
```
# Graphiti MCP Server

Graphiti is a framework for building and querying temporally-aware knowledge graphs, specifically tailored for AI agents
operating in dynamic environments. Unlike traditional retrieval-augmented generation (RAG) methods, Graphiti
continuously integrates user interactions, structured and unstructured enterprise data, and external information into a
coherent, queryable graph. The framework supports incremental data updates, efficient retrieval, and precise historical
queries without requiring complete graph recomputation, making it suitable for developing interactive, context-aware AI
applications.

This is an experimental Model Context Protocol (MCP) server implementation for Graphiti. The MCP server exposes
Graphiti's key functionality through the MCP protocol, allowing AI assistants to interact with Graphiti's knowledge
graph capabilities.

## Features

The Graphiti MCP server provides comprehensive knowledge graph capabilities:

- **Episode Management**: Add, retrieve, and delete episodes (text, messages, or JSON data)
- **Entity Management**: Search and manage entity nodes and relationships in the knowledge graph
- **Search Capabilities**: Search for facts (edges) and node summaries using semantic and hybrid search
- **Group Management**: Organize and manage groups of related data with group_id filtering
- **Graph Maintenance**: Clear the graph and rebuild indices
- **Graph Database Support**: Multiple backend options including FalkorDB (default) and Neo4j
- **Multiple LLM Providers**: Support for OpenAI, Anthropic, Gemini, Groq, and Azure OpenAI
- **Multiple Embedding Providers**: Support for OpenAI, Voyage, Sentence Transformers, and Gemini embeddings
- **Rich Entity Types**: Built-in entity types including Preferences, Requirements, Procedures, Locations, Events, Organizations, Documents, and more for structured knowledge extraction
- **HTTP Transport**: Default HTTP transport with MCP endpoint at `/mcp/` for broad client compatibility
- **Queue-based Processing**: Asynchronous episode processing with configurable concurrency limits

## Quick Start

### Clone the Graphiti GitHub repo

```bash
git clone https://github.com/getzep/graphiti.git
```

or

```bash
gh repo clone getzep/graphiti
```

### For Claude Desktop and other `stdio` only clients

1. Note the full path to this directory.

```
cd graphiti && pwd
```

2. Install the [Graphiti prerequisites](#prerequisites).

3. Configure Claude, Cursor, or other MCP client to use [Graphiti with a `stdio` transport](#integrating-with-mcp-clients). See the client documentation on where to find their MCP configuration files.

### For Cursor and other HTTP-enabled clients

1. Change directory to the `mcp_server` directory

`cd graphiti/mcp_server`
```

