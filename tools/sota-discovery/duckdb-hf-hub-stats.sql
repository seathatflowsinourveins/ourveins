-- duckdb-hf-hub-stats.sql — HF Hub M5 ENUMERATION-BYPASS template
-- Source: https://huggingface.co/datasets/cfahlgren1/hub-stats (CC-BY-4.0)
-- Cite: sca-v15 §1.5 Stage-0.5 ENUMERATION-BYPASS Cascade
-- Refresh cadence: daily (read fresh-tail <24h)
--
-- USAGE:
--   duckdb < duckdb-hf-hub-stats.sql
--
-- REQUIREMENTS:
--   duckdb (https://duckdb.org/docs/installation/) >=1.0
--   httpfs extension (auto-loaded on INSTALL+LOAD)

INSTALL httpfs;
LOAD httpfs;

-- Example 1: Top-50 trending Claude-Code-related models, last 30d
-- Bypasses HF Hub API rate limits (Resolvers bucket ~6-10× higher than search API).
SELECT
    id,
    likes,
    downloads_all_time,
    last_modified,
    tags,
    pipeline_tag
FROM read_parquet('https://huggingface.co/datasets/cfahlgren1/hub-stats/resolve/main/models.parquet')
WHERE (
    list_contains(tags, 'agent') OR
    list_contains(tags, 'claude') OR
    list_contains(tags, 'claude-code') OR
    list_contains(tags, 'coding-agent') OR
    list_contains(tags, 'mcp')
)
AND last_modified > current_date - INTERVAL '30 days'
ORDER BY likes DESC, downloads_all_time DESC
LIMIT 50;

-- Example 2: Datasets with claude-skills / claude-code naming
-- Reveals datasets the github-MCP wouldn't surface (HF Hub is the source).
SELECT
    id,
    likes,
    downloads_all_time,
    last_modified,
    tags
FROM read_parquet('https://huggingface.co/datasets/cfahlgren1/hub-stats/resolve/main/datasets.parquet')
WHERE
    id LIKE '%claude%' OR
    id LIKE '%mcp%' OR
    id LIKE '%agent-skill%'
ORDER BY likes DESC
LIMIT 30;

-- Example 3: Spaces (HF apps) under coding-agent / claude-code tags
SELECT
    id,
    likes,
    last_modified,
    sdk,
    runtime
FROM read_parquet('https://huggingface.co/datasets/cfahlgren1/hub-stats/resolve/main/spaces.parquet')
WHERE
    list_contains(tags, 'coding-agent') OR
    list_contains(tags, 'claude-code') OR
    list_contains(tags, 'agent-skills')
ORDER BY likes DESC
LIMIT 30;
