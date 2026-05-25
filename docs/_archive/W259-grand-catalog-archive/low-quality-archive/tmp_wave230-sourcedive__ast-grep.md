# ast-grep/ast-grep source-code deep-dive 2026-05-15 (W230 batch)

## top-of-tree contents
- .cargo (dir, size=0)
- .editorconfig (file, size=357)
- .github (dir, size=0)
- .gitignore (file, size=2619)
- .pre-commit-config.yaml (file, size=222)
- CHANGELOG.md (file, size=145643)
- Cargo.lock (file, size=67761)
- Cargo.toml (file, size=1153)
- LICENSE (file, size=1077)
- README.md (file, size=5689)
- clippy.toml (file, size=48)
- crates (dir, size=0)
- fixtures (dir, size=0)
- npm (dir, size=0)
- pyproject.toml (file, size=1237)
- renovate.json (file, size=221)
- rust-toolchain.toml (file, size=65)
- rustfmt.toml (file, size=15)
- schemas (dir, size=0)
- xtask (dir, size=0)

## file: README.md
```
<p align=center>
  <img src="https://ast-grep.github.io/logo.svg" alt="ast-grep"/>
</p>

<p align="center">
   <img src="https://github.com/ast-grep/ast-grep/actions/workflows/coverage.yaml/badge.svg" alt="coverage badge"/>
   <a href="https://app.codecov.io/gh/ast-grep/ast-grep"><img src="https://codecov.io/gh/ast-grep/ast-grep/branch/main/graph/badge.svg?token=37VX8H2EWV"/></a>
   <a href="https://discord.gg/4YZjf6htSQ" target="_blank"><img alt="Discord" src="https://img.shields.io/discord/1107749847722889217?label=Discord"></a>
   <a href="https://repology.org/project/ast-grep/versions" target="_blank"><img alt="Repology" src="https://repology.org/badge/tiny-repos/ast-grep.svg"></a>
   <a href="https://github.com/ast-grep/ast-grep/stargazers"><img src="https://img.shields.io/github/stars/ast-grep/ast-grep?style=social" alt="Badge"></a>
   <a href="https://github.com/ast-grep/ast-grep/network/members"><img src="https://img.shields.io/github/forks/ast-grep/ast-grep?style=social" alt="Badge"></a>
   <a href="https://github.com/sponsors/HerringtonDarkholme"><img alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/HerringtonDarkholme?style=social"></a>
   <a href="https://gurubase.io/g/ast-grep"><img alt="Gurubase" src="https://img.shields.io/badge/Gurubase-Ask%20ast--grep%20Guru-006BFF"></a>
</p>


## ast-grep(sg)

ast-grep(sg) is a CLI tool for code structural search, lint, and rewriting.

## Introduction
ast-grep is an [abstract syntax tree](https://dev.to/balapriya/abstract-syntax-tree-ast-explained-in-plain-english-1h38) based tool to search code by pattern code. Think of it as your old-friend [`grep`](https://en.wikipedia.org/wiki/Grep#:~:text=grep%20is%20a%20command%2Dline,which%20has%20the%20same%20effect.), but matching AST nodes instead of text.
You can write patterns as if you are writing ordinary code. It will match all code that has the same syntactical structure.
You can use `$` sign + upper case letters as a [wildcard](https://en.wikipedia.org/wiki/Wildcard_character), e.g. `$MATCH`, to match any single AST node. Think of it as [regular expression dot](https://regexone.com/lesson/wildcards_dot) `.`, except it is not textual.

Try the [online playground](https://ast-grep.github.io/playground.html) for a taste!

## Screenshot
![demo](https://ast-grep.github.io/image/search-replace.png)

See more screenshots on the [website](https://ast-grep.github.io/).

## Installation
You can install it from [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [pip](https://pypi.org/), [cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html),  [cargo-binstall](https://github.com/cargo-bins/cargo-binstall), [homebrew](https://brew.sh/), [scoop](https://scoop.sh/), [mise](https://github.com/jdx/mise) or [MacPorts](https://www.macports.org)!

```bash
npm install --global @ast-grep/cli
# `pnpm approve-builds` may be needed
pip install ast-grep-cli
brew install ast-grep
```


<details>
<summary>Click for more installation methods</summary>

```bash
cargo install ast-grep --locked
cargo binstall ast-grep
```

## file: LICENSE
```
MIT License

Copyright (c) 2022 Herrington Darkholme

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

## file: Cargo.toml
```
[workspace]
members = [
  "crates/*",
  "xtask"
]
default-members = ["crates/*"]
resolver = "2"

[profile.release]
lto = true

[workspace.package]
version = "0.42.2"
authors = ["Herrington Darkholme <2883231+HerringtonDarkholme@users.noreply.github.com>"]
edition = "2021"
license = "MIT"
documentation = "https://ast-grep.github.io/guide/introduction.html"
homepage = "https://ast-grep.github.io/"
repository = "https://github.com/ast-grep/ast-grep"
rust-version = "1.79"
readme = "README.md"

[workspace.dependencies]
ast-grep-core = { path = "crates/core", version = "0.42.2", default-features = false }
ast-grep-config = { path = "crates/config", version = "0.42.2" }
ast-grep-dynamic = { path = "crates/dynamic", version = "0.42.2" }
ast-grep-language = { path = "crates/language", version = "0.42.2" }
ast-grep-lsp = { path = "crates/lsp", version = "0.42.2" }

bit-set = { version = "0.10.0" }
ignore = { version = "0.4.22" }
regex = { version = "1.10.4" }
serde = { version = "1.0.200", features = ["derive"] }
serde_yaml = "0.9.33"
tree-sitter = { version = "0.26.3" }
thiserror = "2.0.0"
schemars = "1.0.0"
anyhow = "1.0.82"
dashmap = "6.0.0"
```

