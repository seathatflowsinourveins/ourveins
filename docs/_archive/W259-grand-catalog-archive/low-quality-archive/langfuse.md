# langfuse/langfuse source-code deep-dive 2026-05-15

## top-of-tree contents
- .agents (dir, size=0)
- .codespellrc (file, size=180)
- .devcontainer (dir, size=0)
- .dockerignore (file, size=176)
- .env.dev-azure.example (file, size=3250)
- .env.dev-oci.example (file, size=7861)
- .env.dev-redis-cluster.example (file, size=3575)
- .env.dev.example (file, size=6711)
- .env.prod.example (file, size=12444)
- .env.test.example (file, size=521)
- .github (dir, size=0)
- .gitignore (file, size=1423)
- .husky (dir, size=0)
- .npmrc (file, size=157)
- .nvmrc (file, size=7)
- .prettierignore (file, size=50)
- .vscode (dir, size=0)
- AGENTS.md (file, size=17)
- CLAUDE.md (symlink, size=9)
- CONTRIBUTING.md (file, size=25861)
- LICENSE (file, size=1609)
- README.cn.md (file, size=32832)
- README.ja.md (file, size=37142)
- README.kr.md (file, size=35413)
- README.md (file, size=53021)

## file: README.md
```
<img width="4856" height="1000" alt="github-banner" src="https://github.com/user-attachments/assets/6f435ef3-1194-4e26-87af-aa13826bbb5f" />

<div align="center">
   <div>
      <h3>
        <a href="https://langfuse.com/blog/2025-06-04-open-sourcing-langfuse-product">
            <strong>Langfuse Is Doubling Down On Open Source</strong>
         </a> <br> <br>
         <a href="https://cloud.langfuse.com">
            <strong>Langfuse Cloud</strong>
         </a> · 
         <a href="https://langfuse.com/docs/deployment/self-host">
            <strong>Self Host</strong>
         </a> · 
         <a href="https://langfuse.com/demo">
            <strong>Demo</strong>
         </a>
      </h3>
   </div>

   <div>
      <a href="https://langfuse.com/docs"><strong>Docs</strong></a> ·
      <a href="https://langfuse.com/issues"><strong>Report Bug</strong></a> ·
      <a href="https://langfuse.com/ideas"><strong>Feature Request</strong></a> ·
      <a href="https://langfuse.com/changelog"><strong>Changelog</strong></a> ·
      <a href="https://langfuse.com/roadmap"><strong>Roadmap</strong></a> ·
   </div>
   <br/>
   <span>Langfuse uses <a href="https://github.com/orgs/langfuse/discussions"><strong>GitHub Discussions</strong></a>  for Support and Feature Requests.</span>
   <br/>
   <span><b>We're hiring.</b> <a href="https://langfuse.com/careers"><strong>Join us</strong></a> in product engineering and technical go-to-market roles.</span>
   <br/>
   <br/>
   <div>
   </div>
</div>

<p align="center">
   <a href="https://github.com/langfuse/langfuse/blob/main/LICENSE">
   <img src="https://img.shields.io/badge/License-MIT-E11311.svg" alt="MIT License">
   </a>
   <a href="https://www.ycombinator.com/companies/langfuse"><img src="https://img.shields.io/badge/Y%20Combinator-W23-orange" alt="Y Combinator W23"></a>
   <a href="https://hub.docker.com/u/langfuse" target="_blank">
   <img alt="Docker Pulls" src="https://img.shields.io/docker/pulls/langfuse/langfuse?labelColor=%20%23FDB062&logo=Docker&labelColor=%20%23528bff"></a>
   <a href="https://pypi.python.org/pypi/langfuse"><img src="https://img.shields.io/pypi/dm/langfuse?logo=python&logoColor=white&label=pypi%20langfuse&color=blue" alt="langfuse Python package on PyPi"></a>
   <a href="https://www.npmjs.com/package/langfuse"><img src="https://img.shields.io/npm/dm/langfuse?logo=npm&logoColor=white&label=npm%20langfuse&color=blue" alt="langfuse npm package"></a>
   <br/>
   <a href="https://discord.com/invite/7NXusRtqYU" target="_blank">
   <img src="https://img.shields.io/discord/1111061815649124414?logo=discord&labelColor=%20%235462eb&logoColor=%20%23f5f5f5&color=%20%235462eb"
      alt="chat on Discord"></a>
   <a href="https://twitter.com/intent/follow?screen_name=langfuse" target="_blank">
   <img src="https://img.shields.io/twitter/follow/langfuse?logo=X&color=%20%23f5f5f5"
      alt="follow on X(Twitter)"></a>
   <a href="https://www.linkedin.com/company/langfuse/" target="_blank">
   <img src="https://custom-icon-badges.demolab.com/badge/LinkedIn-0A66C2?logo=linkedin-white&logoColor=fff"
      alt="follow on LinkedIn"></a>
   <a href="https://github.com/langfuse/langfuse/graphs/commit-activity" target="_blank">
   <img alt="Commits last month" src="https://img.shields.io/github/commit-activity/m/langfuse/langfuse?labelColor=%20%2332b583&color=%20%2312b76a"></a>
   <a href="https://github.com/langfuse/langfuse/" target="_blank">
   <img alt="Issues closed" src="https://img.shields.io/github/issues-search?query=repo%3Alangfuse%2Flangfuse%20is%3Aclosed&label=issues%20closed&labelColor=%20%237d89b0&color=%20%235d6b98"></a>
```

## file: LICENSE
```
Copyright (c) 2023-2025 Langfuse GmbH

Portions of this software are licensed as follows:

- All content that resides under the "ee/", "web/src/ee/", and/or "worker/src/ee/" directories of this repository, if these directories exist, is licensed under the license defined in "ee/LICENSE".
- All third party components incorporated into the Langfuse Software are licensed under the original license provided by the owner of the applicable component.
- Content outside of the above mentioned directories or restrictions above is available under the "MIT Expat" license as defined below.

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

## file: ee/LICENSE
```
START NOTE
Langfuse is an open core project. Langfuse's core
is permissively licensed (MIT license).
Certain parts of the periphery of Langfuse are commercially
licensed and governed by this Enterprise License.
For the avoidance of doubt, this license does not apply 
to the core of Langfuse as it is defined in its license in 
the directory "/LICENSE" (as opposed to this file  "ee/LICENSE")
which can be used and run without infringing the below license
and its licensed materials.
END NOTE

START OF LICENSE
Langfuse Enterprise license (the “Enterprise License” or "EE license")

Copyright (c) 2023-2025 Langfuse GmbH

With regard to the Langfuse Enterprise Software:
This software and associated documentation files (the "Software") may only be
used, if you (and any entity that you represent) have agreed to,
and are in compliance with, the applicable Langfuse Terms of Service, available
at https://langfuse.com/terms (the “Enterprise Terms”), or other
agreement governing the use of the Software, as agreed by you and Langfuse,
and otherwise have a valid Langfuse Enterprise License.

Subject to the foregoing sentence, you are free to
modify this Software and publish patches to the Software. You agree that Langfuse
and/or its licensors (as applicable) retain all right, title and interest in and
to all such modifications and/or patches, and all such modifications and/or
patches may only be used, copied, modified, displayed, distributed, or otherwise
exploited with a valid Langfuse Enterprise License. Notwithstanding the foregoing, you may copy and modify
the Software for development and testing purposes, without requiring a
subscription. You agree that Langfuse GmbH and/or its licensors (as applicable) retain
all right, title and interest in and to all such modifications. You are not
granted any other rights beyond what is expressly stated herein. Subject to the
foregoing, it is forbidden to copy, merge, publish, distribute, sublicense,
and/or sell the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

For all third party components incorporated into the Langfuse Software, those
components are licensed under the original license provided by the owner of the
applicable component.

END OF LICENSE
```

## file: package.json
```
{
  "name": "langfuse",
  "version": "3.174.1",
  "author": "engineering@langfuse.com",
  "license": "MIT",
  "private": true,
  "engines": {
    "node": "24"
  },
  "scripts": {
    "agents:check": "node scripts/agents/sync-agent-shims.mjs --check",
    "agents:sync": "node scripts/agents/sync-agent-shims.mjs",
    "postinstall": "node -e \"const fs = require('node:fs'); const cp = require('node:child_process'); if (!fs.existsSync('scripts/postinstall.sh')) { console.log('Skipping repo postinstall helper: scripts/postinstall.sh is not present in this install context.'); process.exit(0); } cp.execSync('bash scripts/postinstall.sh', { stdio: 'inherit' });\"",
    "preinstall": "npx only-allow pnpm",
    "infra:dev:up": "docker compose -f ./docker-compose.dev.yml up -d --wait",
    "infra:dev:down": "docker compose -f ./docker-compose.dev.yml down",
    "infra:dev:prune": "docker compose -f ./docker-compose.dev.yml down -v",
    "db:generate": "turbo run db:generate",
    "db:migrate": "turbo run db:migrate",
    "db:seed": "turbo run db:seed",
    "db:seed:examples": "turbo run db:seed:examples",
    "nuke": "bash ./scripts/nuke.sh",
    "dx": "pnpm i && pnpm run infra:dev:prune && pnpm run infra:dev:up --pull always && pnpm --filter=shared run db:reset:test && pnpm --filter=shared run db:reset && pnpm --filter=shared run ch:reset && pnpm --filter=shared run db:seed:examples && pnpm run dev",
    "dx-f": "pnpm i && pnpm run infra:dev:prune && pnpm run infra:dev:up --pull always && pnpm --filter=shared run db:reset:test && pnpm --filter=shared run db:reset -f && SKIP_CONFIRM=1 pnpm --filter=shared run ch:reset && pnpm --filter=shared run db:seed:examples && pnpm run dev",
    "dx:skip-infra": "pnpm i && pnpm --filter=shared run db:reset:test && pnpm --filter=shared run db:reset && pnpm --filter=shared run ch:reset && pnpm --filter=shared run db:seed:examples && pnpm run dev",
    "build": "turbo run build",
    "build:check": "turbo run build:check",
    "typecheck": "turbo run typecheck",
    "tc": "turbo run typecheck",
    "start": "turbo run start",
    "dev": "turbo run dev",
    "dev:worker": "turbo run dev --filter=worker",
    "dev:web": "turbo run dev --filter=web",
    "dev:web-webpack": "turbo run dev --filter=web -- --webpack",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,css}\" --experimental-cli",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,css}\" --experimental-cli",
    "playwright:install": "pnpm --filter web exec playwright install chromium",
    "test": "turbo run test",
    "release": "dotenv -e ../.env -- release-it",
    "release:cloud": "bash ./scripts/release-cloud.sh",
    "prepare": "husky"
  },
  "devDependencies": {
    "@release-it/bumper": "^7.0.5",
    "braces": "3.0.3",
    "dotenv-cli": "^7.4.4",
    "husky": "^9.1.7",
    "prettier": "^3.8.3",
    "release-it": "^19.2.4",
    "turbo": "2.9.12"
  },
  "release-it": {
    "git": {
      "commitMessage": "chore: release v${version}",
      "tagName": "v${version}",
      "commitArgs": [
        "--no-verify"
      ],
      "pushArgs": [
```

## file: docker-compose.yml
```
# Make sure to update the credential placeholders with your own secrets.
# We mark them with # CHANGEME in the file below.
# In addition, we recommend to restrict inbound traffic on the host to langfuse-web (port 3000) and minio (port 9090) only.
# All other components are bound to localhost (127.0.0.1) to only accept connections from the local machine.
# External connections from other machines will not be able to reach these services directly.
services:
  langfuse-worker:
    image: docker.io/langfuse/langfuse-worker:3
    restart: always
    depends_on: &langfuse-depends-on
      postgres:
        condition: service_healthy
      minio:
        condition: service_healthy
      redis:
        condition: service_healthy
      clickhouse:
        condition: service_healthy
    ports:
      - 127.0.0.1:3030:3030
    environment: &langfuse-worker-env
      NEXTAUTH_URL: ${NEXTAUTH_URL:-http://localhost:3000}
      DATABASE_URL: ${DATABASE_URL:-postgresql://postgres:postgres@postgres:5432/postgres} # CHANGEME
      SALT: ${SALT:-mysalt} # CHANGEME
      ENCRYPTION_KEY: ${ENCRYPTION_KEY:-0000000000000000000000000000000000000000000000000000000000000000} # CHANGEME: generate via `openssl rand -hex 32`
      TELEMETRY_ENABLED: ${TELEMETRY_ENABLED:-true}
      LANGFUSE_ENABLE_EXPERIMENTAL_FEATURES: ${LANGFUSE_ENABLE_EXPERIMENTAL_FEATURES:-false}
      CLICKHOUSE_MIGRATION_URL: ${CLICKHOUSE_MIGRATION_URL:-clickhouse://clickhouse:9000}
      CLICKHOUSE_URL: ${CLICKHOUSE_URL:-http://clickhouse:8123}
      CLICKHOUSE_USER: ${CLICKHOUSE_USER:-clickhouse}
      CLICKHOUSE_PASSWORD: ${CLICKHOUSE_PASSWORD:-clickhouse} # CHANGEME
      CLICKHOUSE_CLUSTER_ENABLED: ${CLICKHOUSE_CLUSTER_ENABLED:-false}
      LANGFUSE_USE_AZURE_BLOB: ${LANGFUSE_USE_AZURE_BLOB:-false}
      LANGFUSE_USE_OCI_NATIVE_OBJECT_STORAGE: ${LANGFUSE_USE_OCI_NATIVE_OBJECT_STORAGE:-false}
      LANGFUSE_OCI_AUTH_TYPE: ${LANGFUSE_OCI_AUTH_TYPE:-workload_identity}
      LANGFUSE_S3_EVENT_UPLOAD_BUCKET: ${LANGFUSE_S3_EVENT_UPLOAD_BUCKET:-langfuse}
      LANGFUSE_S3_EVENT_UPLOAD_REGION: ${LANGFUSE_S3_EVENT_UPLOAD_REGION:-auto}
      LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID: ${LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID:-minio}
      LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY: ${LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY:-miniosecret} # CHANGEME
      LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT: ${LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT:-http://minio:9000}
      LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE: ${LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE:-true}
      LANGFUSE_S3_EVENT_UPLOAD_PREFIX: ${LANGFUSE_S3_EVENT_UPLOAD_PREFIX:-events/}
      LANGFUSE_S3_MEDIA_UPLOAD_BUCKET: ${LANGFUSE_S3_MEDIA_UPLOAD_BUCKET:-langfuse}
      LANGFUSE_S3_MEDIA_UPLOAD_REGION: ${LANGFUSE_S3_MEDIA_UPLOAD_REGION:-auto}
      LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID: ${LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID:-minio}
      LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY: ${LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY:-miniosecret} # CHANGEME
      LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT: ${LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT:-http://localhost:9090}
      LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE: ${LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE:-true}
      LANGFUSE_S3_MEDIA_UPLOAD_PREFIX: ${LANGFUSE_S3_MEDIA_UPLOAD_PREFIX:-media/}
      LANGFUSE_S3_BATCH_EXPORT_ENABLED: ${LANGFUSE_S3_BATCH_EXPORT_ENABLED:-false}
      LANGFUSE_S3_BATCH_EXPORT_BUCKET: ${LANGFUSE_S3_BATCH_EXPORT_BUCKET:-langfuse}
      LANGFUSE_S3_BATCH_EXPORT_PREFIX: ${LANGFUSE_S3_BATCH_EXPORT_PREFIX:-exports/}
      LANGFUSE_S3_BATCH_EXPORT_REGION: ${LANGFUSE_S3_BATCH_EXPORT_REGION:-auto}
      LANGFUSE_S3_BATCH_EXPORT_ENDPOINT: ${LANGFUSE_S3_BATCH_EXPORT_ENDPOINT:-http://minio:9000}
      LANGFUSE_S3_BATCH_EXPORT_EXTERNAL_ENDPOINT: ${LANGFUSE_S3_BATCH_EXPORT_EXTERNAL_ENDPOINT:-http://localhost:9090}
      LANGFUSE_S3_BATCH_EXPORT_ACCESS_KEY_ID: ${LANGFUSE_S3_BATCH_EXPORT_ACCESS_KEY_ID:-minio}
      LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY: ${LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY:-miniosecret} # CHANGEME
      LANGFUSE_S3_BATCH_EXPORT_FORCE_PATH_STYLE: ${LANGFUSE_S3_BATCH_EXPORT_FORCE_PATH_STYLE:-true}
      LANGFUSE_INGESTION_QUEUE_DELAY_MS: ${LANGFUSE_INGESTION_QUEUE_DELAY_MS:-}
      LANGFUSE_INGESTION_CLICKHOUSE_WRITE_INTERVAL_MS: ${LANGFUSE_INGESTION_CLICKHOUSE_WRITE_INTERVAL_MS:-}
```

