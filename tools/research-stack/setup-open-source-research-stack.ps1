#Requires -Version 7.0
# TODO W344: validate Set-StrictMode -Version Latest in runtime test before adding
# tools/research-stack/setup-open-source-research-stack.ps1
# W321 Stream F bootstrap — open-source self-hosted research stack
# Idempotent: safe to re-run. Materializes docker-compose.yml + service configs + secrets + pip installs + NSSM services + smoke tests.
#
# Usage:
#   pwsh -File Z:\claude-sota-installed\tools\research-stack\setup-open-source-research-stack.ps1
#   pwsh -File Z:\claude-sota-installed\tools\research-stack\setup-open-source-research-stack.ps1 -Optional   # adds Qdrant
#   pwsh -File Z:\claude-sota-installed\tools\research-stack\setup-open-source-research-stack.ps1 -SkipDocker -SkipNssm   # pip-only re-run
#
# Source: docs/architecture/W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/STREAM-F-SELF-HOSTED-DEPLOYMENT.md
# Wave: W321 P1α (post-W320-deeper Stream F deliverable).

[CmdletBinding()]
param(
    [switch]$SkipDocker,
    [switch]$SkipFirecrawl,
    [switch]$SkipNssm,
    [switch]$SkipPip,
    [switch]$Optional   # include Qdrant optional profile
)
$ErrorActionPreference = "Stop"
$root = "Z:\claude-sota-installed\tools\research-stack"
$state = "Z:\claude-sota-installed-state"
$firecrawlSrc = "$state\firecrawl-src"

Write-Host "[W321-Fα] research-stack bootstrap" -ForegroundColor Cyan
Write-Host "  root  = $root"
Write-Host "  state = $state"

# ----------------------------------------------------------------
# Step 1 — Secrets (idempotent generation; mirror to CLAUDE.local.md after first run)
# ----------------------------------------------------------------
if (-not $env:SEARXNG_SECRET)          { $env:SEARXNG_SECRET          = -join ((1..32) | ForEach-Object { '{0:x2}' -f (Get-Random -Max 256) }) }
if (-not $env:FIRECRAWL_PG_PASSWORD)   { $env:FIRECRAWL_PG_PASSWORD   = -join ((1..24) | ForEach-Object { [char](Get-Random -Min 65 -Max 91) }) }
if (-not $env:FIRECRAWL_BULL_AUTH_KEY) { $env:FIRECRAWL_BULL_AUTH_KEY = -join ((1..32) | ForEach-Object { '{0:x2}' -f (Get-Random -Max 256) }) }
Write-Host "[W321-Fα] secrets materialised (mirror to CLAUDE.local.md after first run)" -ForegroundColor Yellow

# ----------------------------------------------------------------
# Step 2 — Materialize docker-compose.yml + SearXNG config + Perplexica config
# ----------------------------------------------------------------
$composeFile = "$root\docker-compose.yml"
$composeContent = @'
# tools/research-stack/docker-compose.yml — W321 Stream F
# Network: research_default (isolated from langfuse, phoenix)
name: research-stack

services:
  searxng:
    image: searxng/searxng:latest
    container_name: research_searxng
    ports:
      - "127.0.0.1:8888:8080"
    volumes:
      - ./searxng/config:/etc/searxng:rw
      - searxng_cache:/var/cache/searxng:rw
    environment:
      - SEARXNG_BASE_URL=http://localhost:8888/
      - SEARXNG_SECRET=${SEARXNG_SECRET}
    restart: unless-stopped
    networks: [research_default]

  perplexica:
    image: itzcrazykns1337/perplexica:slim-latest
    container_name: research_perplexica
    ports:
      - "127.0.0.1:3001:3000"
    volumes:
      - ./perplexica/config.json:/home/perplexica/config.json:ro
    depends_on:
      - searxng
    environment:
      - SEARXNG_API_URL=http://searxng:8080
    restart: unless-stopped
    networks: [research_default]

  crawl4ai:
    image: unclecode/crawl4ai:latest
    container_name: research_crawl4ai
    ports:
      - "127.0.0.1:11235:11235"
    restart: unless-stopped
    networks: [research_default]

  qdrant:
    image: qdrant/qdrant:latest
    container_name: research_qdrant
    ports:
      - "127.0.0.1:6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage
    restart: unless-stopped
    networks: [research_default]
    profiles: ["optional"]

volumes:
  searxng_cache:
  qdrant_data:

networks:
  research_default:
    driver: bridge
'@
if (-not (Test-Path -LiteralPath $composeFile)) {
    Set-Content -LiteralPath $composeFile -Value $composeContent -Encoding UTF8
    Write-Host "  wrote $composeFile"
} else { Write-Host "  $composeFile exists — skipping" -ForegroundColor Yellow }

# SearXNG config dir + minimal settings.yml
$searxngCfgDir = "$root\searxng\config"
New-Item -ItemType Directory -Force -Path $searxngCfgDir | Out-Null
$searxngSettings = "$searxngCfgDir\settings.yml"
if (-not (Test-Path -LiteralPath $searxngSettings)) {
    @'
use_default_settings: true
server:
  secret_key: "REPLACED-BY-ENV"
  base_url: "http://localhost:8888/"
  bind_address: "0.0.0.0"
  port: 8080
  limiter: false
search:
  formats:
    - html
    - json
'@ | Set-Content -LiteralPath $searxngSettings -Encoding UTF8
    Write-Host "  wrote SearXNG settings.yml (operator may customize engines/limiter)"
}

# Perplexica config.json (points to local LlamaSwap :8090 as OpenAI-compat endpoint OR Ollama :16700)
$perplexicaCfgDir = "$root\perplexica"
New-Item -ItemType Directory -Force -Path $perplexicaCfgDir | Out-Null
$perplexicaCfg = "$perplexicaCfgDir\config.json"
if (-not (Test-Path -LiteralPath $perplexicaCfg)) {
    @'
{
  "GENERAL": {
    "PORT": 3000,
    "SIMILARITY_MEASURE": "cosine",
    "KEEP_ALIVE": "5m"
  },
  "MODELS": {
    "OPENAI": {
      "API_KEY": "",
      "API_URL": ""
    },
    "OLLAMA": {
      "API_URL": "http://host.docker.internal:16700"
    },
    "CUSTOM_OPENAI": {
      "API_URL": "http://host.docker.internal:8090/v1",
      "API_KEY": "llamaswap-local",
      "MODEL_NAME": "qwen3-coder-30b"
    }
  },
  "API_ENDPOINTS": {
    "SEARXNG": "http://searxng:8080"
  }
}
'@ | Set-Content -LiteralPath $perplexicaCfg -Encoding UTF8
    Write-Host "  wrote Perplexica config.json (LlamaSwap :8090 + Ollama :16700 wired via host.docker.internal)"
}

# ----------------------------------------------------------------
# Step 3 — Main docker compose up
# ----------------------------------------------------------------
if (-not $SkipDocker) {
    Write-Host "[W321-Fα] docker compose up..." -ForegroundColor Cyan
    Push-Location $root
    try {
        & docker compose pull
        if ($Optional) { & docker compose --profile optional up -d } else { & docker compose up -d }
        Start-Sleep 5
        & docker compose ps
    } finally { Pop-Location }
}

# ----------------------------------------------------------------
# Step 4 — Firecrawl (separate compose project, built from source)
# ----------------------------------------------------------------
if (-not $SkipFirecrawl) {
    Write-Host "[W321-Fα] firecrawl self-host..." -ForegroundColor Cyan
    if (-not (Test-Path -LiteralPath $firecrawlSrc)) {
        & git clone --depth 1 https://github.com/firecrawl/firecrawl $firecrawlSrc
    } else { Write-Host "  $firecrawlSrc exists — skipping clone" -ForegroundColor Yellow }
    # .env injection (operator-provided keys; placeholder if missing)
    $firecrawlEnv = "$firecrawlSrc\.env"
    if (-not (Test-Path -LiteralPath $firecrawlEnv)) {
        @"
NUM_WORKERS_PER_QUEUE=8
PORT=3002
HOST=0.0.0.0
REDIS_URL=redis://redis:6379
REDIS_RATE_LIMIT_URL=redis://redis:6379
POSTGRES_URL=postgres://firecrawl:$($env:FIRECRAWL_PG_PASSWORD)@nuq-postgres:5432/firecrawl
BULL_AUTH_KEY=$($env:FIRECRAWL_BULL_AUTH_KEY)
"@ | Set-Content -LiteralPath $firecrawlEnv -Encoding UTF8
        Write-Host "  wrote firecrawl .env (operator: add LLM keys per upstream SELF_HOST.md)"
    }
    Push-Location $firecrawlSrc
    try {
        & docker compose build
        & docker compose up -d
    } finally { Pop-Location }
}

# ----------------------------------------------------------------
# Step 5 — pip installs into shared venv Z:/venvs/claude
# ----------------------------------------------------------------
if (-not $SkipPip) {
    Write-Host "[W321-Fα] pip install research libs into Z:\venvs\claude..." -ForegroundColor Cyan
    & Z:\venvs\claude\Scripts\pip.exe install --upgrade pip
    # Note: D-EMP probe is RECOMMENDED per package before T1 ratification (sca-v9 §4)
    & Z:\venvs\claude\Scripts\pip.exe install --upgrade `
        gpt-researcher `
        knowledge-storm `
        paper-qa `
        trafilatura
    # LearningCircuit/local-deep-research — T1-PROVISIONAL per W321-r2 STREAM-E codex absorption
    # (95% SimpleQA claim is upstream README; Phase-5 5-gate replay REQUIRED before T1 ratify)
    & Z:\venvs\claude\Scripts\pip.exe install --upgrade local-deep-research
}

# ----------------------------------------------------------------
# Step 6 — NSSM services (gpt-researcher REST + paper-qa REST)
# ----------------------------------------------------------------
if (-not $SkipNssm) {
    Write-Host "[W321-Fα] NSSM services..." -ForegroundColor Cyan
    $logsDir = "$state\logs"
    New-Item -ItemType Directory -Force -Path $logsDir | Out-Null

    function Install-NssmService($Name, $Module, $Port) {
        $existing = & nssm.exe status $Name 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  $Name already installed — skipping (run 'nssm.exe restart $Name' to apply env changes)" -ForegroundColor Yellow
            return
        }
        $appDir = "$state\$($Name.ToLower())"
        New-Item -ItemType Directory -Force -Path $appDir | Out-Null
        & nssm.exe install $Name "Z:\venvs\claude\Scripts\python.exe"
        & nssm.exe set $Name AppParameters "-m $Module --host 127.0.0.1 --port $Port"
        & nssm.exe set $Name AppDirectory $appDir
        & nssm.exe set $Name AppEnvironmentExtra "PYTHONUNBUFFERED=1" "OPENAI_API_BASE=http://localhost:8090/v1"
        & nssm.exe set $Name AppStdout "$logsDir\$($Name.ToLower()).out.log"
        & nssm.exe set $Name AppStderr "$logsDir\$($Name.ToLower()).err.log"
        & nssm.exe set $Name Start SERVICE_AUTO_START
        & nssm.exe start $Name
        Write-Host "  installed $Name on :$Port"
    }

    # NOTE: gpt_researcher.server / paperqa.server may not exist out-of-the-box per Stream F §6.
    # If upstream lacks REST entry, operator-AI writes a tiny FastAPI shim at $root\<svc>-rest-shim.py.
    Install-NssmService -Name "GptResearcherREST" -Module "gpt_researcher.server" -Port 8001
    Install-NssmService -Name "PaperQaREST"       -Module "paperqa.server"        -Port 8002
}

# ----------------------------------------------------------------
# Step 7 — Smoke tests
# ----------------------------------------------------------------
Write-Host "[W321-Fα] smoke tests..." -ForegroundColor Cyan
$tests = @(
    @{ name = "SearXNG";    url = "http://localhost:8888/" }
    @{ name = "Perplexica"; url = "http://localhost:3001/" }
    @{ name = "Crawl4AI";   url = "http://localhost:11235/health" }
    @{ name = "Firecrawl";  url = "http://localhost:3002/v1/health" }
    @{ name = "GptRsrch";   url = "http://localhost:8001/health" }
    @{ name = "PaperQA";    url = "http://localhost:8002/health" }
)
$passCount = 0
foreach ($t in $tests) {
    try {
        $r = Invoke-WebRequest -Uri $t.url -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
        Write-Host "  [OK] $($t.name) -> $($r.StatusCode)" -ForegroundColor Green
        $passCount++
    } catch {
        Write-Host "  [FAIL] $($t.name) -> $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "[W321-Fα] bootstrap complete. $passCount/$($tests.Count) smoke-test endpoints healthy." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps (operator):" -ForegroundColor Cyan
Write-Host "  1. Add secrets to CLAUDE.local.md env-block (SEARXNG_SECRET, FIRECRAWL_*)"
Write-Host "  2. Wire .mcp.json per Stream F §4 (Crawl4AI native SSE; Firecrawl npx; others via WebFetch wrapper)"
Write-Host "  3. D-EMP probe each pip-installed package before T1 ratify (sca-v9 §4)"
Write-Host "  4. LearningCircuit/local-deep-research is T1-PROVISIONAL — replay SimpleQA bench before T1 lock-in"
Write-Host "  5. Rollback: 'docker compose down' in $root + $firecrawlSrc + 'nssm remove <Name> confirm' for NSSM services"
