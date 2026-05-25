# rtk-ai/rtk source-code deep-dive 2026-05-15

## top-of-tree contents
- .claude (dir, size=0)
- .github (dir, size=0)
- .gitignore (file, size=503)
- .release-please-manifest.json (file, size=20)
- .rtk (dir, size=0)
- .semgrep.yml (file, size=3573)
- CHANGELOG.md (file, size=75232)
- CLAUDE.md (file, size=7406)
- CONTRIBUTING.md (file, size=14205)
- Cargo.lock (file, size=48141)
- Cargo.toml (file, size=1695)
- DISCLAIMER.md (file, size=2206)
- Formula (dir, size=0)
- INSTALL.md (file, size=11560)
- LICENSE (file, size=10767)
- README.md (file, size=21515)
- README_es.md (file, size=5435)
- README_fr.md (file, size=6665)
- README_ja.md (file, size=5870)
- README_ko.md (file, size=5395)
- README_zh.md (file, size=5315)
- SECURITY.md (file, size=7526)
- build.rs (file, size=2372)
- docs (dir, size=0)
- hooks (dir, size=0)

## file: README.md
```
<p align="center">
  <img src="https://avatars.githubusercontent.com/u/258253854?v=4" alt="RTK - Rust Token Killer" width="500">
</p>

<p align="center">
  <strong>High-performance CLI proxy that reduces LLM token consumption by 60-90%</strong>
</p>

<p align="center">
  <a href="https://github.com/rtk-ai/rtk/actions"><img src="https://github.com/rtk-ai/rtk/workflows/Security%20Check/badge.svg" alt="CI"></a>
  <a href="https://github.com/rtk-ai/rtk/releases"><img src="https://img.shields.io/github/v/release/rtk-ai/rtk" alt="Release"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <a href="https://discord.gg/RySmvNF5kF"><img src="https://img.shields.io/discord/1470188214710046894?label=Discord&logo=discord" alt="Discord"></a>
  <a href="https://formulae.brew.sh/formula/rtk"><img src="https://img.shields.io/homebrew/v/rtk" alt="Homebrew"></a>
</p>

<p align="center">
  <a href="https://www.rtk-ai.app">Website</a> &bull;
  <a href="#installation">Install</a> &bull;
  <a href="https://www.rtk-ai.app/guide/troubleshooting">Troubleshooting</a> &bull;
  <a href="docs/contributing/ARCHITECTURE.md">Architecture</a> &bull;
  <a href="https://discord.gg/RySmvNF5kF">Discord</a>
</p>

<p align="center">
  <a href="README.md">English</a> &bull;
  <a href="README_fr.md">Francais</a> &bull;
  <a href="README_zh.md">中文</a> &bull;
  <a href="README_ja.md">日本語</a> &bull;
  <a href="README_ko.md">한국어</a> &bull;
  <a href="README_es.md">Espanol</a>
</p>

---

rtk filters and compresses command outputs before they reach your LLM context. Single Rust binary, 100+ supported commands, <10ms overhead.

## Token Savings (30-min Claude Code Session)

| Operation | Frequency | Standard | rtk | Savings |
|-----------|-----------|----------|-----|---------|
| `ls` / `tree` | 10x | 2,000 | 400 | -80% |
| `cat` / `read` | 20x | 40,000 | 12,000 | -70% |
| `grep` / `rg` | 8x | 16,000 | 3,200 | -80% |
| `git status` | 10x | 3,000 | 600 | -80% |
| `git diff` | 5x | 10,000 | 2,500 | -75% |
| `git log` | 5x | 2,500 | 500 | -80% |
| `git add/commit/push` | 8x | 1,600 | 120 | -92% |
| `cargo test` / `npm test` | 5x | 25,000 | 2,500 | -90% |
| `ruff check` | 3x | 3,000 | 600 | -80% |
| `pytest` | 4x | 8,000 | 800 | -90% |
| `go test` | 3x | 6,000 | 600 | -90% |
| `docker ps` | 3x | 900 | 180 | -80% |
| **Total** | | **~118,000** | **~23,900** | **-80%** |

> Estimates based on medium-sized TypeScript/Rust projects. Actual savings vary by project size.

## Installation

### Homebrew (recommended)
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
name = "rtk"
version = "0.34.3"
edition = "2021"
authors = ["Patrick Szymkowiak"]
description = "Rust Token Killer - High-performance CLI proxy to minimize LLM token consumption"
license = "MIT"
homepage = "https://www.rtk-ai.app"
repository = "https://github.com/rtk-ai/rtk"
readme = "README.md"
keywords = ["cli", "llm", "token", "filter", "productivity"]
categories = ["command-line-utilities", "development-tools"]

[dependencies]
clap = { version = "4", features = ["derive"] }
anyhow = "1.0"
ignore = "0.4"
walkdir = "2"
regex = "1"
lazy_static = "1.4"
serde = { version = "1", features = ["derive"] }
serde_json = { version = "1", features = ["preserve_order"] }
colored = "2"
dirs = "5"
rusqlite = { version = "0.31", features = ["bundled"] }
toml = "0.8"
chrono = "0.4"
tempfile = "3"
sha2 = "0.10"
ureq = "2"
getrandom = "0.4"
flate2 = "1.0"
quick-xml = "0.37"
which = "8"
automod = "1"

[target.'cfg(unix)'.dependencies]
libc = "0.2"

[build-dependencies]
toml = "0.8"

[dev-dependencies]

[profile.release]
opt-level = 3
lto = true
codegen-units = 1
panic = "abort"
strip = true

# cargo-deb configuration
[package.metadata.deb]
maintainer = "Patrick Szymkowiak"
copyright = "2024 Patrick Szymkowiak"
license-file = ["LICENSE", "0"]
extended-description = "rtk filters and compresses command outputs before they reach your LLM context, saving 60-90% of tokens."
section = "utility"
priority = "optional"
assets = [
```

