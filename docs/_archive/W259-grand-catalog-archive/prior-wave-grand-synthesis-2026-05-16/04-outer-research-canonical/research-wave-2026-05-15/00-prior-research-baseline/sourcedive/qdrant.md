# qdrant/qdrant source-code deep-dive 2026-05-15

## top-of-tree contents
- .config (dir, size=0)
- .dockerignore (file, size=146)
- .gitattributes (file, size=330)
- .github (dir, size=0)
- .gitignore (file, size=341)
- .rusty-hook.toml (file, size=83)
- CONTRIBUTING.md (file, size=249)
- Cargo.lock (file, size=232779)
- Cargo.toml (file, size=12126)
- Dockerfile (file, size=8779)
- LICENSE (file, size=11357)
- README.md (file, size=11505)
- clippy.toml (file, size=7403)
- config (dir, size=0)
- docs (dir, size=0)
- lib (dir, size=0)
- openapi (dir, size=0)
- pkg (dir, size=0)
- rustfmt.toml (file, size=151)
- shell.nix (file, size=3720)
- src (dir, size=0)
- tests (dir, size=0)
- tools (dir, size=0)

## file: README.md
```
<p align="center">
  <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/qdrant/qdrant/raw/master/docs/logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://github.com/qdrant/qdrant/raw/master/docs/logo-light.svg">
      <img height="100" alt="Qdrant" src="https://github.com/qdrant/qdrant/raw/master/docs/logo.svg">
  </picture>
</p>

<p align="center">
    <b>Vector Search Engine for the next generation of AI applications</b>
</p>

<p align=center>
    <a href="https://github.com/qdrant/qdrant/actions/workflows/rust.yml"><img src="https://img.shields.io/github/actions/workflow/status/qdrant/qdrant/rust.yml?style=flat-square" alt="Tests status"></a>
    <a href="https://api.qdrant.tech/"><img src="https://img.shields.io/badge/Docs-OpenAPI%203.0-success?style=flat-square" alt="OpenAPI Docs"></a>
    <a href="https://github.com/qdrant/qdrant/blob/master/LICENSE"><img src="https://img.shields.io/github/license/qdrant/qdrant?style=flat-square" alt="Apache 2.0 License"></a>
    <a href="https://qdrant.to/discord"><img src="https://img.shields.io/discord/907569970500743200?logo=Discord&style=flat-square&color=7289da" alt="Discord"></a>
    <a href="https://qdrant.to/roadmap"><img src="https://img.shields.io/badge/Roadmap-2025-bc1439.svg?style=flat-square" alt="Roadmap 2025"></a>
    <a href="https://cloud.qdrant.io/"><img src="https://img.shields.io/badge/Qdrant-Cloud-24386C.svg?logo=cloud&style=flat-square" alt="Qdrant Cloud"></a>
</p>

**Qdrant** (read: _quadrant_) is a vector similarity search engine and vector database.
It provides a production-ready service with a convenient API to store, search, and manage points—vectors with an additional payload.
Qdrant is tailored for extended filtering support, making it useful for all sorts of neural-network or semantic-based matching, faceted search, and other applications.

Qdrant is written in Rust 🦀, which makes it fast and reliable even under high load. See [benchmarks](https://qdrant.tech/benchmarks/).

With Qdrant, embeddings or neural network encoders can be turned into full-fledged applications for matching, searching, recommending, and much more!

Qdrant is also available as a fully managed **[Qdrant Cloud](https://cloud.qdrant.io/)** ⛅ including a **free tier**.

<p align="center">
<strong><a href="https://qdrant.tech/documentation/quickstart/">Quick Start</a> • <a href="#agent-skills">Agent Skills</a> • <a href="#clients">Client Libraries</a> • <a href="#demo-projects">Demo Projects</a> • <a href="#integrations">Integrations</a> • <a href="#contacts">Contact</a>

</strong>
</p>

## Getting Started

### Agent Skills

Qdrant provides a collection of ready-to-use [agent skills](https://github.com/qdrant/skills) that bring Qdrant's vector search capabilities directly into your AI coding assistant. Install these skills to empower your agent in making critical engineering decisions for optimal vector search performance, such as quantization, sharding, tenant isolation, hybrid search, model migration, and more.

### Client-Server

To experience the full power of Qdrant locally, run the container with this command:

```bash
docker run -p 6333:6333 qdrant/qdrant
```

Note that this starts an insecure deployment without authentication, open to all network interfaces. Please refer to [secure your instance](https://qdrant.tech/documentation/security/#secure-your-instance).

Now you can connect to the server with any [client](#clients). For example, using Python:

```python
from qdrant_client import QdrantClient

client = QdrantClient(url="http://localhost:6333")
```
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

## file: Cargo.toml
```
[package]
name = "qdrant"
version = "1.18.0"
description = "Qdrant - Vector Search engine"
authors = [
    "Andrey Vasnetsov <andrey@vasnetsov.com>",
    "Qdrant Team <info@qdrant.tech>",
]
readme = "README.md"
homepage = "https://qdrant.tech/"
repository = "https://github.com/qdrant/qdrant"
license = "Apache-2.0"
edition = "2024"
rust-version = "1.94"
default-run = "qdrant"

[lints]
workspace = true

[features]
default = []
service_debug = ["parking_lot/deadlock_detection"]
tracing = [
    "api/tracing",
    "collection/tracing",
    "segment/tracing",
    "storage/tracing",
]
console = ["console-subscriber"]
console-subscriber = ["tracing", "dep:console-subscriber"]
tracy = ["tracing-tracy"]
tracing-tracy = ["tracing", "dep:tracing-tracy"]
tokio-tracing = ["tokio/tracing"]
stacktrace = ["rstack-self"]
chaos-testing = []
data-consistency-check = ["collection/data-consistency-check"]
gpu = ["gpu/gpu", "segment/gpu"]
deb = []
staging = ["collection/staging", "storage/staging", "shard/staging"]

[dev-dependencies]
serde_urlencoded = "0.7"
sealed_test = "1.1.0"

mockito = { workspace = true }
tempfile = { workspace = true }
rusty-hook = "^0.11.2"
nix = { workspace = true, features = ["process"] }
fs-err = { workspace = true, features = ["debug", "debug_tokio", "tokio"] } # for nicer error messages


[dependencies]
parking_lot = { workspace = true }

fs-err = { workspace = true }
thiserror = { workspace = true }
log = { workspace = true }
colored = "3"
serde = { workspace = true }
serde_json = { workspace = true }
```

## file: config/config.yaml
```
log_level: INFO

# Logging configuration
# Qdrant logs to stdout. You may configure to also write logs to a file on disk.
# Be aware that this file may grow indefinitely.
# logger:
#   # Logging format, supports `text` and `json`
#   format: text
#   on_disk:
#     enabled: true
#     log_file: path/to/log/file.log
#     log_level: INFO
#     # Logging format, supports `text` and `json`
#     format: text
#     buffer_size_bytes: 1024

storage:
  # Where to store all the data
  storage_path: ./storage

  # Where to store snapshots
  snapshots_path: ./snapshots

  snapshots_config:
    # "local" or "s3" - where to store snapshots
    snapshots_storage: local
    # s3_config:
    #   bucket: ""
    #   region: ""
    #   access_key: ""
    #   secret_key: ""

  # Where to store temporary files
  # If null, temporary snapshots are stored in: storage/snapshots_temp/
  temp_path: null

  # If true - point payloads will not be stored in memory.
  # It will be read from the disk every time it is requested.
  # This setting saves RAM by (slightly) increasing the response time.
  # Note: those payload values that are involved in filtering and are indexed - remain in RAM.
  #
  # Default: true
  on_disk_payload: true

  # Load-time memory mode. Only affects how segments are loaded on startup;
  # does not modify any persisted configuration. Intended as a recovery knob
  # when a node crash-loops on out-of-memory.
  #
  # Options:
  # - disabled (default): load segments as persisted.
  # - no_resident: downgrade components to their on-disk variants where
  #   possible — quantization loads as if always_ram=false, payload field
  #   indexes as if on_disk=true, payload storage as mmap (not populated).
  # - no_populate: same as no_resident, plus skip mmap prefault on load for
  #   vectors, HNSW graph and payload storage.
  #low_memory_mode: disabled

  # Maximum number of concurrent updates to shard replicas
  # If `null` - maximum concurrency is used.
  update_concurrency: null
```

