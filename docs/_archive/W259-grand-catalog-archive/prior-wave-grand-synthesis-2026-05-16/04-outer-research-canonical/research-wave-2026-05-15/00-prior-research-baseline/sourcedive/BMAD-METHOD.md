# bmad-code-org/BMAD-METHOD source-code deep-dive 2026-05-15 (W230 batch)

## top-of-tree contents
- .augment (dir, size=0)
- .claude-plugin (dir, size=0)
- .coderabbit.yaml (file, size=3728)
- .github (dir, size=0)
- .gitignore (file, size=1020)
- .husky (dir, size=0)
- .markdownlint-cli2.yaml (file, size=910)
- .npmignore (file, size=626)
- .npmrc (file, size=128)
- .nvmrc (file, size=2)
- .prettierignore (file, size=270)
- .vscode (dir, size=0)
- AGENTS.md (file, size=465)
- CHANGELOG.md (file, size=102747)
- CNAME (file, size=20)
- CONTRIBUTING.md (file, size=6799)
- CONTRIBUTORS.md (file, size=1331)
- LICENSE (file, size=1572)
- README.md (file, size=6574)
- README_CN.md (file, size=5729)
- README_VN.md (file, size=7551)
- SECURITY.md (file, size=3197)
- TRADEMARK.md (file, size=2805)
- Wordmark.png (file, size=23544)
- banner-bmad-method.png (file, size=374692)

## file: README.md
```
![BMad Method](banner-bmad-method.png)

[![Version](https://img.shields.io/npm/v/bmad-method?color=blue&label=version)](https://www.npmjs.com/package/bmad-method)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![Python Version](https://img.shields.io/badge/python-%3E%3D3.10-blue?logo=python&logoColor=white)](https://www.python.org)
[![uv](https://img.shields.io/badge/uv-package%20manager-blueviolet?logo=uv)](https://docs.astral.sh/uv/)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-7289da?logo=discord&logoColor=white)](https://discord.gg/gk8jAdXWmj)

**Build More Architect Dreams** — An AI-driven agile development module for the BMad Method Module Ecosystem, the best and most comprehensive Agile AI Driven Development framework that has true scale-adaptive intelligence that adjusts from bug fixes to enterprise systems.

**100% free and open source.** No paywalls. No gated content. No gated Discord. We believe in empowering everyone, not just those who can pay for a gated community or courses.

## Why the BMad Method?

Traditional AI tools do the thinking for you, producing average results. BMad agents and facilitated workflows act as expert collaborators who guide you through a structured process to bring out your best thinking in partnership with the AI.

- **AI Intelligent Help** — Invoke the `bmad-help` skill anytime for guidance on what's next
- **Scale-Domain-Adaptive** — Automatically adjusts planning depth based on project complexity
- **Structured Workflows** — Grounded in agile best practices across analysis, planning, architecture, and implementation
- **Specialized Agents** — 12+ domain experts (PM, Architect, Developer, UX, and more)
- **Party Mode** — Bring multiple agent personas into one session to collaborate and discuss
- **Complete Lifecycle** — From brainstorming to deployment

[Learn more at **docs.bmad-method.org**](https://docs.bmad-method.org)

---

## 🚀 What's Next for BMad?

**V6 is here and we're just getting started!** The BMad Method is evolving rapidly with optimizations including Cross Platform Agent Team and Sub Agent inclusion, Skills Architecture, BMad Builder v1, Dev Loop Automation, and so much more in the works.

**[📍 Check out the complete Roadmap →](https://docs.bmad-method.org/roadmap/)**

---

## Quick Start

**Prerequisites**: [Node.js](https://nodejs.org) v20+ · [Python](https://www.python.org) 3.10+ · [uv](https://docs.astral.sh/uv/)

```bash
npx bmad-method install
```

> Want the newest prerelease build? Use `npx bmad-method@next install`. Expect higher churn than the default install.

Follow the installer prompts, then open your AI IDE (Claude Code, Cursor, etc.) in your project folder.

**Non-Interactive Installation** (for CI/CD):
```

## file: LICENSE
```
MIT License

Copyright (c) 2025 BMad Code, LLC

This project incorporates contributions from the open source community.
See [CONTRIBUTORS.md](CONTRIBUTORS.md) for contributor attribution.

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

TRADEMARK NOTICE:
BMad™, BMad Method™, and BMad Core™ are trademarks of BMad Code, LLC, covering all
casings and variations (including BMAD, bmad, BMadMethod, BMAD-METHOD, etc.). The use of
these trademarks in this software does not grant any rights to use the trademarks
for any other purpose. See [TRADEMARK.md](TRADEMARK.md) for detailed guidelines.
```

## file: package.json
```
{
  "$schema": "https://json.schemastore.org/package.json",
  "name": "bmad-method",
  "version": "6.6.0",
  "description": "Breakthrough Method of Agile AI-driven Development",
  "keywords": [
    "agile",
    "ai",
    "orchestrator",
    "development",
    "methodology",
    "agents",
    "bmad"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/bmad-code-org/BMAD-METHOD.git"
  },
  "license": "MIT",
  "author": "Brian (BMad) Madison",
  "main": "tools/installer/bmad-cli.js",
  "bin": {
    "bmad": "tools/installer/bmad-cli.js",
    "bmad-method": "tools/installer/bmad-cli.js"
  },
  "scripts": {
    "bmad:install": "node tools/installer/bmad-cli.js install",
    "bmad:uninstall": "node tools/installer/bmad-cli.js uninstall",
    "docs:build": "node tools/build-docs.mjs",
    "docs:dev": "astro dev --root website",
    "docs:fix-links": "node tools/fix-doc-links.js",
    "docs:preview": "astro preview --root website",
    "docs:validate-links": "node tools/validate-doc-links.js",
    "format:check": "prettier --check \"**/*.{js,cjs,mjs,json,yaml}\"",
    "format:fix": "prettier --write \"**/*.{js,cjs,mjs,json,yaml}\"",
    "format:fix:staged": "prettier --write",
    "install:bmad": "node tools/installer/bmad-cli.js install",
    "lint": "eslint . --ext .js,.cjs,.mjs,.yaml --max-warnings=0",
    "lint:fix": "eslint . --ext .js,.cjs,.mjs,.yaml --fix",
    "lint:md": "markdownlint-cli2 \"**/*.md\"",
    "prepare": "command -v husky >/dev/null 2>&1 && husky || exit 0",
    "quality": "npm run format:check && npm run lint && npm run lint:md && npm run docs:build && npm run test:install && npm run test:urls && npm run validate:refs && npm run validate:skills",
    "rebundle": "node tools/installer/bundlers/bundle-web.js rebundle",
    "test": "npm run test:refs && npm run test:install && npm run test:urls && npm run test:channels && npm run lint && npm run lint:md && npm run format:check",
    "test:channels": "node test/test-installer-channels.js",
    "test:install": "node test/test-installation-components.js",
    "test:refs": "node test/test-file-refs-csv.js",
    "test:urls": "node test/test-parse-source-urls.js",
    "validate:refs": "node tools/validate-file-refs.js --strict",
    "validate:skills": "node tools/validate-skills.js --strict"
```

