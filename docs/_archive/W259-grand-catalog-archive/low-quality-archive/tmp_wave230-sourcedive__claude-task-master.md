# eyaltoledano/claude-task-master source-code deep-dive 2026-05-15 (W230 batch)

## top-of-tree contents
- .changeset (dir, size=0)
- .claude-plugin (dir, size=0)
- .claude (dir, size=0)
- .coderabbit.yaml (file, size=105)
- .cursor (dir, size=0)
- .cursorignore (file, size=118)
- .env.example (file, size=932)
- .github (dir, size=0)
- .gitignore (file, size=1456)
- .kiro (dir, size=0)
- .manypkg.json (file, size=232)
- .mcp.json (file, size=176)
- .mcpbignore (file, size=328)
- .npmignore (file, size=452)
- .nvmrc (file, size=2)
- .taskmaster (dir, size=0)
- .vscode (dir, size=0)
- CHANGELOG.md (file, size=340270)
- CLAUDE.md (file, size=7610)
- CLAUDE_CODE_PLUGIN.md (file, size=2892)
- CONTRIBUTING.md (file, size=7758)
- LICENSE (file, size=2191)
- README-task-master.md (file, size=18401)
- README.md (file, size=17421)
- apps (dir, size=0)

## file: README.md
```
<a name="readme-top"></a>

<div align='center'>
<a href="https://trendshift.io/repositories/13971" target="_blank"><img src="https://trendshift.io/api/badge/repositories/13971" alt="eyaltoledano%2Fclaude-task-master | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
</div>

<p align="center">
  <a href="https://tryhamster.com/product/taskmaster"><img src="./images/logo.png?raw=true" alt="Taskmaster logo"></a>
</p>

<p align="center">
<b>Taskmaster</b>: A task management system for AI-driven development, designed to work seamlessly with any AI chat.
</p>

<p align="center">
  <a href="https://discord.gg/taskmasterai" target="_blank"><img src="https://dcbadge.limes.pink/api/server/https://discord.gg/taskmasterai?style=flat" alt="Discord"></a> |
  <a href="https://tryhamster.com/docs/taskmaster" target="_blank">Docs</a>
</p>

<p align="center">
  <a href="https://github.com/eyaltoledano/claude-task-master/actions/workflows/ci.yml"><img src="https://github.com/eyaltoledano/claude-task-master/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://github.com/eyaltoledano/claude-task-master/stargazers"><img src="https://img.shields.io/github/stars/eyaltoledano/claude-task-master?style=social" alt="GitHub stars"></a>
  <a href="https://badge.fury.io/js/task-master-ai"><img src="https://badge.fury.io/js/task-master-ai.svg" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT%20with%20Commons%20Clause-blue.svg" alt="License"></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/task-master-ai"><img src="https://img.shields.io/npm/d18m/task-master-ai?style=flat" alt="NPM Downloads"></a>
  <a href="https://www.npmjs.com/package/task-master-ai"><img src="https://img.shields.io/npm/dm/task-master-ai?style=flat" alt="NPM Downloads"></a>
  <a href="https://www.npmjs.com/package/task-master-ai"><img src="https://img.shields.io/npm/dw/task-master-ai?style=flat" alt="NPM Downloads"></a>
</p>

## By [@eyaltoledano](https://x.com/eyaltoledano) & [@RalphEcom](https://x.com/RalphEcom)

[![Twitter Follow](https://img.shields.io/twitter/follow/eyaltoledano)](https://x.com/eyaltoledano)
[![Twitter Follow](https://img.shields.io/twitter/follow/RalphEcom)](https://x.com/RalphEcom)

A task management system for AI-driven development with Claude, designed to work seamlessly with Cursor AI.

## Documentation

📚 **[View Full Documentation](https://tryhamster.com/docs/taskmaster)**

### Quick Links

- [Quick Start Guide](https://tryhamster.com/docs/taskmaster/getting-started/quick-start/quick-start)
- [Installation](https://tryhamster.com/docs/taskmaster/getting-started/quick-start/installation)
- [API Keys & Providers](https://tryhamster.com/docs/taskmaster/getting-started/api-keys)
- [Supported Editors](https://tryhamster.com/docs/taskmaster/ide-setup/supported-editors)
- [MCP Tools Reference](https://tryhamster.com/docs/taskmaster/capabilities/mcp)
```

## file: LICENSE
```
Task Master License

MIT License

Copyright (c) 2025 — Eyal Toledano, Ralph Khreish

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

"Commons Clause" License Condition v1.0

The Software is provided to you by the Licensor under the License (defined below), subject to the following condition:

Without limiting other conditions in the License, the grant of rights under the License will not include, and the License does not grant to you, the right to Sell the Software.

For purposes of the foregoing, "Sell" means practicing any or all of the rights granted to you under the License to provide the Software to third parties, for a fee or other consideration (including without limitation fees for hosting or consulting/support services related to the Software), as part of a product or service whose value derives, entirely or substantially, from the functionality of the Software. Any license notice or attribution required by the License must also include this Commons Clause License Condition notice.

Software: All Task Master associated files (including all files in the GitHub repository "claude-task-master" and in the npm package "task-master-ai").

License: MIT

Licensor: Eyal Toledano, Ralph Khreish
```

## file: package.json
```
{
	"name": "task-master-ai",
	"version": "0.43.1",
	"description": "A task management system for ambitious AI-driven development that doesn't overwhelm and confuse Cursor.",
	"main": "index.js",
	"type": "module",
	"bin": {
		"task-master": "dist/task-master.js",
		"task-master-mcp": "dist/mcp-server.js",
		"task-master-ai": "dist/mcp-server.js"
	},
	"publishConfig": {
		"provenance": true,
		"access": "public"
	},
	"workspaces": ["apps/*", "packages/*", "."],
	"scripts": {
		"build": "npm run build:build-config && cross-env NODE_ENV=production tsdown",
		"dev": "tsdown --watch",
		"turbo:dev": "turbo dev",
		"turbo:build": "turbo build",
		"turbo:typecheck": "turbo typecheck",
		"turbo:test": "turbo test",
		"turbo:test:unit": "turbo test:unit",
		"turbo:test:integration": "turbo test:integration",
		"build:build-config": "npm run build -w @tm/build-config",
		"test": "cross-env NODE_ENV=test node --experimental-vm-modules node_modules/.bin/jest",
		"test:unit": "node --experimental-vm-modules node_modules/.bin/jest --testPathPattern=unit",
		"test:integration": "node --experimental-vm-modules node_modules/.bin/jest --testPathPattern=integration",
		"test:fails": "node --experimental-vm-modules node_modules/.bin/jest --onlyFailures",
		"test:watch": "node --experimental-vm-modules node_modules/.bin/jest --watch",
		"test:coverage": "node --experimental-vm-modules node_modules/.bin/jest --coverage",
		"test:ci": "node --experimental-vm-modules node_modules/.bin/jest --coverage --ci",
		"test:e2e": "./tests/e2e/run_e2e.sh",
		"test:e2e-report": "./tests/e2e/run_e2e.sh --analyze-log",
		"postpack": "chmod +x dist/task-master.js dist/mcp-server.js",
		"changeset": "changeset",
		"changeset:validate": "node .github/scripts/validate-changesets.mjs",
		"version": "changeset version && node ./.github/scripts/sync-manifest-version.mjs && npm i --package-lock-only",
		"release": "node ./.github/scripts/release.mjs",
		"publish-packages": "turbo run build lint test && changeset version && changeset publish",
		"inspector": "npx @modelcontextprotocol/inspector node dist/mcp-server.js",
		"mcp-server": "node dist/mcp-server.js",
		"format-check": "biome format .",
		"format": "biome format . --write",
		"deps:check": "manypkg check || echo 'Note: Workspace package version warnings are expected for internal @tm/* packages'",
		"deps:fix": "manypkg fix"
	},
	"keywords": [
		"claude",
```

