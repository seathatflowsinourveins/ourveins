"""Fire 11 — Full GraphQL re-sweep of all A3 repos for EXACT current data."""

import json
import subprocess
import time

with open(
    "docs/sota-architecture-audit/fire-11-full-graphql-resweep/_a3-slugs-to-reprobe.json",
    "r",
    encoding="utf-8",
) as f:
    slugs = json.load(f)

print(f"Total slugs to probe: {len(slugs)}")


def gql_escape(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


BATCH_SIZE = 100
batches = [slugs[i : i + BATCH_SIZE] for i in range(0, len(slugs), BATCH_SIZE)]
print(f"Will fire {len(batches)} GraphQL batched queries")

all_results = {}
total_errors = 0

for batch_idx, batch in enumerate(batches):
    parts = []
    for i, s in enumerate(batch):
        owner = gql_escape(s["owner"])
        name = gql_escape(s["name"])
        parts.append(
            f'\n  r{i}: repository(owner: "{owner}", name: "{name}") {{'
            "\n    nameWithOwner stargazerCount forkCount pushedAt createdAt"
            "\n    isArchived isDisabled isPrivate"
            "\n    primaryLanguage { name }"
            "\n    licenseInfo { spdxId }"
            "\n    repositoryTopics(first: 8) { nodes { topic { name } } }"
            "\n  }"
        )
    query = "query {" + "".join(parts) + "\n}"
    print(
        f"  Batch {batch_idx + 1}/{len(batches)} ({len(batch)} repos) — query length {len(query)} bytes...",
        end=" ",
        flush=True,
    )
    result = subprocess.run(
        ["gh", "api", "graphql", "-f", f"query={query}"],
        capture_output=True,
        text=True,
        timeout=60,
    )
    if result.returncode == 0:
        try:
            data = json.loads(result.stdout)
            success = 0
            for i, s in enumerate(batch):
                repo = data.get("data", {}).get(f"r{i}")
                if repo:
                    all_results[s["slug"]] = repo
                    success += 1
                else:
                    all_results[s["slug"]] = {"error": "null-result"}
            errs = data.get("errors", [])
            total_errors += len(errs)
            print(f"OK ({success}/{len(batch)} ok, {len(errs)} errs)")
        except Exception as e:
            print(f"PARSE ERROR: {e}")
    else:
        # gh may exit non-zero even when partial data returned
        try:
            data = json.loads(result.stdout)
            success = 0
            for i, s in enumerate(batch):
                repo = data.get("data", {}).get(f"r{i}")
                if repo:
                    all_results[s["slug"]] = repo
                    success += 1
                else:
                    all_results[s["slug"]] = {"error": "null-result"}
            errs = data.get("errors", [])
            total_errors += len(errs)
            print(f"PARTIAL ({success}/{len(batch)} ok, {len(errs)} errs)")
        except Exception:
            print(f"FAILED stderr={result.stderr[:80]}")
    time.sleep(1)

with open(
    "docs/sota-architecture-audit/fire-11-full-graphql-resweep/_a3-graphql-current-data.json",
    "w",
    encoding="utf-8",
) as f:
    json.dump(all_results, f, indent=2, default=str)

success_count = sum(1 for v in all_results.values() if not v.get("error"))
print("\n=== FINAL ===")
print(f"Total probed: {len(slugs)}")
print(f"Successful: {success_count}")
print(f"GraphQL nulls: {len(all_results) - success_count}")
print(f"Total error messages from GraphQL: {total_errors}")
