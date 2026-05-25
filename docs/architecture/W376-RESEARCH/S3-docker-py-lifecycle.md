# S3 — docker-py 7.1.0 Container Lifecycle Best Practices

**Wave**: W376
**Stream**: S3 (research-only)
**Source**: `docker-py==7.1.0` (installed at `C:/Users/42/AppData/Roaming/Python/Python314/site-packages/docker/` — verified `docker.__version__ == '7.1.0'`) + official docs at `https://docker-py.readthedocs.io/en/7.1.0/`
**Status**: DONE

---

## §1 docker.from_env() contract

`docker.from_env()` is `DockerClient.from_env` rebound at `docker/client.py:222`. It pops `timeout`, `max_pool_size`, `version`, `use_ssh_client` from kwargs (defaults: `DEFAULT_TIMEOUT_SECONDS`, `DEFAULT_MAX_POOL_SIZE`, `None`, `False`) and forwards the rest to `kwargs_from_env(**kwargs)` which delegates to `docker/utils/utils.py:353-388`. Env vars consumed (in priority order):

| Env var | Purpose | Default behavior if unset |
|---|---|---|
| `DOCKER_HOST` | URL of the Docker daemon (`unix://…` or `tcp://…` or `npipe://…` on Windows) | `base_url` omitted → underlying `APIClient` falls back to the platform default: Unix socket `/var/run/docker.sock` on Linux/Mac, named pipe `//./pipe/docker_engine` on Windows |
| `DOCKER_CERT_PATH` | Dir with `cert.pem` + `key.pem` + `ca.pem` for mTLS | `~/.docker` if `DOCKER_TLS_VERIFY` is truthy |
| `DOCKER_TLS_VERIFY` | Empty string = false; any other value (incl. `1`, `0`, `"yes"`) = true | TLS disabled |
| `environment=` kwarg | Override `os.environ` for the lookup | reads live `os.environ` |

**Fallback**: with no env vars, `kwargs_from_env` returns `{}`, so `DockerClient(timeout=…, max_pool_size=…, version=None, use_ssh_client=False)` is constructed with the daemon URL auto-detected by the underlying `APIClient`/`requests` HTTP adapter (named-pipe on Windows). Setting `version=None` triggers the SDK's default API version negotiation (`DEFAULT_DOCKER_API_VERSION` is `1.35` per `docker/client.py:29`; pass `version='auto'` for daemon-version detection per the docstring).

**Thread-safety**: docker-py does NOT document `DockerClient` as thread-safe. The underlying `APIClient` is built on `requests.Session`, whose thread-safety is "not safe by default" per the requests docs. SOTA pattern for Temporal activities: **construct one `DockerClient` per activity invocation** OR guard a module-level client with an `asyncio.Lock` / `threading.Lock`. Connection pooling is handled by `max_pool_size` (default per `docker/constants.py`, typically 10).

---

## §2 client.containers.run() kwargs

`ContainerCollection.run` signature: `run(image, command=None, stdout=True, stderr=False, remove=False, **kwargs)` at `docker/models/containers.py:534-911`. Exhaustive kwargs grouped by purpose (all per docstring lines 559-825):

**Lifecycle**:
- `detach` (bool) — return `Container` object instead of blocking for logs
- `remove` (bool) — `docker run --rm` semantics; combined with `detach=True` translates to `auto_remove=True` when API ≥1.25 (line 856-861)
- `auto_remove` (bool) — daemon-side removal on exit
- `name` (str) — container name (default: daemon-generated)
- `command` (str|list) — overrides image CMD
- `entrypoint` (str|list) — overrides image ENTRYPOINT
- `stop_signal` (str) — e.g. `SIGINT`
- `restart_policy` (dict) — `{"Name": "on-failure", "MaximumRetryCount": 5}`

**Networking**:
- `network` (str) — name of pre-existing network at create time (incompatible with `network_mode`)
- `network_mode` (str) — `bridge|none|container:<id>|host` (incompatible with `network`)
- `networking_config` (dict[str, EndpointConfig]) — per-network endpoint config; requires `network`
- `network_disabled` (bool)
- `ports` (dict) — keys `'<port>/tcp'` etc.; values: int (host port), `None` (random), `(addr, port)` tuple (specific interface), or `[port1, port2]` list (multi-bind)
- `extra_hosts` (dict) — `/etc/hosts` augmentation
- `dns`, `dns_opt`, `dns_search` (lists)
- `hostname`, `domainname` (str)
- `mac_address` (str)
- `links` (dict) — `{container: alias}`
- `publish_all_ports` (bool) — equivalent of `-P`

**Storage**:
- `volumes` (dict|list) — host-path → `{bind, mode}` dict OR `["host:container:mode", …]` string list
- `mounts` (list of `docker.types.Mount`) — preferred over `volumes` (more powerful)
- `volumes_from` (list)
- `volume_driver` (str)
- `tmpfs` (dict) — path → mount options
- `read_only` (bool) — read-only root FS
- `storage_opt` (dict)
- `working_dir` (str)
- `device_*` (lists) — `devices`, `device_cgroup_rules`, `device_read_bps`, `device_read_iops`, `device_write_bps`, `device_write_iops`, `device_requests` (for GPUs)

**Resource limits**:
- `mem_limit` (int|str) — `"128m"`, `"1g"`, etc.
- `mem_reservation`, `mem_swappiness`, `memswap_limit`, `kernel_memory`
- `cpu_count` / `cpu_percent` (Windows)
- `cpu_period`, `cpu_quota`, `cpu_rt_period`, `cpu_rt_runtime`, `cpu_shares`
- `cpuset_cpus`, `cpuset_mems`
- `nano_cpus` (int) — CPU in 1e-9 units (e.g. 500_000_000 = 0.5 CPU)
- `blkio_weight`, `blkio_weight_device`
- `pids_limit`, `ulimits` (list of `docker.types.Ulimit`)
- `shm_size` (str|int)
- `oom_kill_disable`, `oom_score_adj`

**Security**:
- `cap_add`, `cap_drop` (list of str — e.g. `["SYS_ADMIN", "MKNOD"]`)
- `privileged` (bool)
- `security_opt` (list of str — SELinux, AppArmor, seccomp)
- `user` (str|int)
- `userns_mode` (`host`)
- `group_add` (list)

**Process / runtime**:
- `environment` (dict|list — `{"KEY": "val"}` OR `["KEY=val", …]`)
- `labels` (dict|list)
- `stdin_open`, `tty`
- `init` (bool) — wraps PID 1 with docker-init for signal forwarding
- `init_path` (str)
- `ipc_mode`, `pid_mode`, `uts_mode`, `cgroupns`, `cgroup_parent`, `isolation`
- `sysctls` (dict)
- `healthcheck` (dict) — `test`, `interval`, `timeout`, `retries`, `start_period` (intervals in nanoseconds, min 1_000_000)
- `log_config` (`LogConfig`)
- `runtime` (str) — e.g. `nvidia`
- `platform` (str — `os[/arch[/variant]]`); only honored if image must be pulled
- `lxc_conf` (dict)
- `use_config_proxy` (bool)
- `version` (str — daemon API version override)

**Implementation note**: `run()` validates `network` ⊥ `network_mode` (raises `RuntimeError`, line 863), validates `networking_config` requires `network` (line 869), and auto-retries by pulling the image on `ImageNotFound` (line 878-881). If `detach=False`, it streams logs, blocks on `container.wait()`, and raises `ContainerError` on non-zero exit. For Temporal-activity spawn-server use, **always pass `detach=True`** to get back a `Container` immediately.

---

## §3 Container.attrs vs Container.reload()

`Container.attrs` is the cached raw response dict from `GET /containers/{id}/json` populated at construction time (`docker/models/resource.py:15-17`). `Container.reload()` re-issues that GET via `self.collection.get(self.id)` and overwrites `self.attrs` (`resource.py:42-48`).

**When reload is required**:
- After `container.start()` — `containers.create()` returns a `Container` whose `attrs['NetworkSettings']['Ports']` is `{}` (ports are populated by the daemon *after* start). Must `reload()` to populate the host port mapping.
- After any state transition (start → exited, paused → running) — `attrs['State']` cache is stale.
- After `network.connect(container)` — the container's `NetworkSettings.Networks` does not reflect the new endpoint until reload.
- When working with `containers.list(sparse=True)` — partial attrs only; calling `.labels` raises `DockerException` (line 54-58) telling you to call `reload()`.

**Port-attr race condition** (the canonical gotcha for spawn-server):
```
container = client.containers.run("img", ports={"8000/tcp": None}, detach=True)
print(container.ports)   # → {} (empty! daemon hasn't published yet)
container.reload()
print(container.ports)   # → {'8000/tcp': [{'HostIp': '0.0.0.0', 'HostPort': '49154'}]}
```
There is no built-in `wait_until_published` primitive in docker-py 7.1.0. SOTA poll pattern:
```python
import time
for _ in range(50):  # ~5 s budget at 100 ms
    container.reload()
    binding = container.ports.get(f"{internal_port}/tcp")
    if binding and binding[0].get("HostPort"):
        host_port = int(binding[0]["HostPort"])
        break
    time.sleep(0.1)
else:
    raise TimeoutError("port not published")
```
Alternative for hardening: pass `ports={"8000/tcp": ("127.0.0.1", explicit_host_port)}` and skip the poll entirely — host port is then deterministic and you only need `reload()` to confirm `State.Status == "running"`.

---

## §4 Container.kill() vs stop() vs remove()

| Method | Signal/timeout | Daemon endpoint | Use when |
|---|---|---|---|
| `container.kill(signal=None)` | Default `SIGKILL` (per docstring line 284, `docker/models/containers.py:279`); any signal name/int accepted | `POST /containers/{id}/kill?signal=…` (`docker/api/container.py:798-818`) | Immediate forced termination; signal arbitrary (e.g. `SIGUSR1` for graceful-reload) |
| `container.stop(timeout=None)` | Sends `SIGTERM` (or container's `StopSignal`), waits `timeout` seconds, then `SIGKILL`. Default `timeout=10` (per `docker/api/container.py:1187-1212`). `timeout=None` ⇒ falls back to container's `StopTimeout` config; if also None, daemon uses 10 s | `POST /containers/{id}/stop?t=…` | **Default graceful shutdown** — preferred for spawn/kill orchestration |
| `container.remove(v=False, link=False, force=False)` | If `force=True`, daemon does `SIGKILL` then removes; otherwise requires container already stopped | `DELETE /containers/{id}?v=&link=&force=` (`models/containers.py:352-367`) | Cleanup after stop, OR forced-purge for orphaned reconcile |

**Connection-timeout caveat** (line 1208-1211): docker-py extends the HTTP timeout to `self.timeout + stop_timeout` to avoid the `requests` socket timing out before the daemon's grace period elapses. So if `client = from_env(timeout=60)` and `container.stop(timeout=30)`, the HTTP request waits up to 90 s.

**Best practice for spawn/kill agent server**:
1. `container.stop(timeout=10)` — gives the agent server 10 s to flush state.
2. `container.remove()` — collect the corpse (skip if `auto_remove=True` was set).
3. Wrap both in `try/except NotFound` to handle the racy "already removed" case.

For unrecoverable hangs: `container.kill()` followed by `container.remove(force=True)`.

---

## §5 Exception handling

Full hierarchy from `docker/errors.py`:

```
Exception
└── DockerException                       (errors.py:13 — catch-all base)
    ├── APIError                          (errors.py:42; also subclasses requests.exceptions.HTTPError)
    │   ├── NotFound                      (errors.py:92 — HTTP 404 generic)
    │   └── ImageNotFound                 (errors.py:96 — HTTP 404 with image-not-found phrase)
    ├── InvalidVersion                    (errors.py:100)
    ├── InvalidRepository                 (errors.py:104)
    ├── InvalidConfigFile                 (errors.py:108)
    ├── InvalidArgument                   (errors.py:112)
    ├── DeprecatedMethod                  (errors.py:116)
    ├── TLSParameterError                 (errors.py:120)
    ├── NullResource                      (errors.py:131 — also ValueError)
    ├── ContainerError                    (errors.py:135 — non-zero exit from run(detach=False))
    ├── BuildError                        (errors.py:158)
    ├── ImageLoadError                    (errors.py:165)
    ├── MissingContextParameter           (errors.py:180)
    ├── ContextAlreadyExists              (errors.py:188)
    ├── ContextException                  (errors.py:196)
    └── ContextNotFound                   (errors.py:204)

StreamParseError(RuntimeError)            (errors.py:153 — NOT a DockerException)
```

`APIError` exposes `.status_code` (property at line 73-76), `.is_client_error()` (4xx), `.is_server_error()` (5xx), `.response` (the `requests.Response`), `.explanation` (parsed JSON `message` or raw text). 404s are dispatched to `NotFound` or `ImageNotFound` based on phrase-matching against `_image_not_found_explanation_fragments` (errors.py:3-10) inside `create_api_error_from_http_exception()` (errors.py:22-39).

**Retry classification** for spawn/kill:

| Exception | Retry? | Rationale |
|---|---|---|
| `ImageNotFound` | NO (or YES once after explicit `client.images.pull`) | Permanent until pull |
| `NotFound` (container) | NO | Container already gone — idempotent success in reconcile |
| `APIError` 409 Conflict | NO — surface as user error | Name collision, port already in use, etc. |
| `APIError` 5xx (server) | YES with exponential backoff | Daemon overload / transient |
| `APIError` 4xx (other) | NO | Client bug — bad kwargs |
| `requests.exceptions.ConnectionError` | YES | Daemon restarting or socket flap |
| `requests.exceptions.ReadTimeout` | DEPENDS — for `wait()` re-issue; for `stop()` escalate to `kill()` | |
| `ContainerError` | NO | Workload semantic failure |
| `DockerException` (other) | NO — log + surface | Catch-all only as last-resort wrapper |

SOTA pattern for Temporal activities: catch `NotFound` and convert to idempotent-success; let `APIError 5xx` + `ConnectionError` bubble (Temporal's retry policy handles it); convert `ImageNotFound`/`InvalidArgument` to non-retryable application errors.

---

## §6 Network management

`NetworkCollection` at `docker/models/networks.py:94-218`:

- **Create**: `client.networks.create(name, driver='bridge', options=None, ipam=None, check_duplicate=None, internal=False, labels=None, enable_ipv6=False, attachable=False, scope=None, ingress=False)` — returns `Network` object (line 100-157). `check_duplicate=True` makes the daemon reject name collisions; otherwise it allows duplicates and you get two distinct networks with the same name.
- **Get**: `client.networks.get(network_id, verbose=False, scope=None)` — `network_id` can be name OR id. Raises `NotFound` if absent (line 159-183).
- **List**: `client.networks.list(names=None, ids=None, filters=None, greedy=False)` — pass `greedy=True` (API ≥1.28) to `reload()` each network and populate `Containers` attr (line 185-214).
- **Remove**: `network.remove()` — `DELETE /networks/{id}` (line 83-91). Raises `APIError` 403 if any container is still attached.
- **Connect/Disconnect**: `network.connect(container, aliases=None, links=None, ipv4_address=None, ipv6_address=None, link_local_ips=None, driver_opt=None)` and `network.disconnect(container, force=False)` (lines 29-81).
- **Prune**: `client.networks.prune(filters=None)` — bulk-removes unused networks.

**Conflict handling** for "create if not exists":
```python
try:
    net = client.networks.get(name)
except NotFound:
    net = client.networks.create(name, driver="bridge", labels={"managed-by": "w376"})
```
The `check_duplicate` kwarg is unreliable on older daemons; the try/get-then-create idiom is the SOTA pattern. **Lifecycle for per-task network**: create with labels at activity-start, connect container at run-time, disconnect on stop, remove on activity-end (or rely on `prune()` cleanup loop).

---

## §7 Label-based filtering for reconcile

Both `client.containers.list()` (`models/containers.py:957-1011`) and `client.networks.list()` accept a `filters` dict. The label filter syntax matches the Docker daemon REST API:

- `filters={"label": "k"}` — containers with label key `k` (any value)
- `filters={"label": "k=v"}` — containers with `k=v` exactly
- `filters={"label": ["k1=v1", "k2=v2"]}` — list = AND-conjunction (must match ALL labels)

Other filters useful for reconcile: `status` (`running|exited|paused|restarting`), `name` (substring), `id`, `ancestor` (image), `before`, `since`, `exited` (specific exit code).

**Gotcha 1 — `all=True`**: by default `list()` only returns running containers. For reconcile-sweep across exited/dead, pass `all=True`.

**Gotcha 2 — sparse + label access**: `list(sparse=True)` skips the inspect step, so `.labels` access raises `DockerException` until you `reload()` (see §3). For label-based reconcile, keep `sparse=False` (default) so labels are available immediately.

**Gotcha 3 — `ignore_removed`**: pass `ignore_removed=True` when polling a high-churn label set, otherwise an inspect-during-list race can raise `NotFound`.

**SOTA reconcile loop** for orphaned-container cleanup:
```python
orphans = client.containers.list(
    all=True,
    filters={"label": ["managed-by=w376", f"wave={wave_id}"], "status": "exited"},
    ignore_removed=True,
)
for c in orphans:
    try:
        c.remove(force=True)
    except NotFound:
        pass
```

---

## §8 docker-py async story

docker-py 7.1.0 is **sync-only**. The HTTP transport is `requests` / `urllib3` (verified via `docker/errors.py:1`: `import requests`; APIError extends `requests.exceptions.HTTPError`). There is no `aiohttp`-based async client and no native asyncio API. Issue tracker confirms async support is non-roadmap.

**Asyncio integration pattern** for Temporal activities (which are async):
```python
import asyncio
import docker
from docker.models.containers import Container

# module-level — one client per worker process, NOT per activity
_docker_client = docker.from_env(timeout=60, max_pool_size=20)

async def spawn_container_async(image: str, **kwargs) -> Container:
    return await asyncio.to_thread(
        _docker_client.containers.run, image, detach=True, **kwargs
    )

async def stop_container_async(container: Container, timeout: int = 10) -> None:
    await asyncio.to_thread(container.stop, timeout=timeout)
    await asyncio.to_thread(container.remove)
```

`asyncio.to_thread` (Python 3.9+) runs the blocking call on the default thread-pool executor and `await`s without blocking the event loop. This is the **canonical pattern** for wrapping sync SDKs in async frameworks and is what the SDK itself documents users to do.

**Caveats**:
- Default `to_thread` executor has a `min(32, os.cpu_count() + 4)` thread cap. For high-concurrency spawn loads (>32 simultaneous), construct a dedicated `concurrent.futures.ThreadPoolExecutor(max_workers=N)` and use `loop.run_in_executor(executor, …)`.
- For long-blocking calls (`container.wait()` can block indefinitely), use a dedicated executor pool to avoid starving the default pool.
- `requests.Session` (and thus `DockerClient`) is NOT documented as thread-safe; the W376 spawn architecture should either (a) one client per activity, or (b) module-level client protected by a lock, or (c) module-level client with empirical-only thread-safe assumption (works in practice but undocumented).

**Alternative**: third-party `aiodocker` is a fully-async re-implementation (separate package, not docker-py); not chosen here because the rest of W376 already standardises on docker-py for tooling consistency.

---

## §9 Cite-anchor cluster

Source files (verified on 2026-05-22 against installed `docker==7.1.0` at `C:/Users/42/AppData/Roaming/Python/Python314/site-packages/docker/`):

| Anchor | File:line |
|---|---|
| `DockerClient.from_env` classmethod | `docker/client.py:48-100` |
| `from_env = DockerClient.from_env` rebind | `docker/client.py:222` |
| `kwargs_from_env(environment=None)` impl | `docker/utils/utils.py:353-388` |
| `ContainerCollection.run` (full kwargs docstring) | `docker/models/containers.py:534-911` |
| `ContainerCollection.create` | `docker/models/containers.py:913-936` |
| `ContainerCollection.list` (filters + sparse + ignore_removed) | `docker/models/containers.py:957-1011` |
| `Container.kill(signal=None)` SDK | `docker/models/containers.py:279-291` |
| `Container.stop(timeout=…)` SDK | `docker/models/containers.py:440-452` |
| `Container.remove(**kwargs)` SDK | `docker/models/containers.py:352-367` |
| `Container.start`, `restart`, `wait` | `docker/models/containers.py:411-420`, `:396-409`, `:507-528` |
| `Container.ports` property | `docker/models/containers.py:78-83` |
| `Container.labels` property (sparse-raises) | `docker/models/containers.py:47-58` |
| `APIClient.kill(container, signal=None)` low-level | `docker/api/container.py:798-818` |
| `APIClient.stop(container, timeout=None)` low-level + connection-timeout extension | `docker/api/container.py:1187-1212` |
| `Model.reload()` (collection-get-then-overwrite) | `docker/models/resource.py:42-48` |
| `Model.attrs` cached state | `docker/models/resource.py:15-17` |
| `NetworkCollection.create/get/list/prune` | `docker/models/networks.py:100-217` |
| `Network.connect/disconnect/remove` | `docker/models/networks.py:29-91` |
| Exception hierarchy + `create_api_error_from_http_exception` | `docker/errors.py:13-209` |
| `_image_not_found_explanation_fragments` (404 dispatch logic) | `docker/errors.py:3-10` |

Official docs (docker-py 7.1.0 RTD):
- Top-level docs root: `https://docker-py.readthedocs.io/en/7.1.0/`
- Containers: `https://docker-py.readthedocs.io/en/7.1.0/containers.html`
- Networks: `https://docker-py.readthedocs.io/en/7.1.0/networks.html`
- Client: `https://docker-py.readthedocs.io/en/7.1.0/client.html`
- Low-level API: `https://docker-py.readthedocs.io/en/7.1.0/api.html`
- GitHub source: `https://github.com/docker/docker-py/tree/7.1.0`

---

## §10 Best-practices summary for spawn_agent_server + kill_agent_server

**Client construction** (module-level, once per worker process):
```python
import docker, asyncio
_docker = docker.from_env(timeout=60, max_pool_size=20)
```

**spawn_agent_server(wave_id, agent_id, image, internal_port=8000) -> dict**:
1. Ensure network exists (try `client.networks.get(net_name)` → on `NotFound`, `create`).
2. `container = await asyncio.to_thread(_docker.containers.run, image, detach=True, name=f"agent-{wave_id}-{agent_id}", labels={"managed-by": "w376", "wave": wave_id, "agent": agent_id}, network=net_name, ports={f"{internal_port}/tcp": None}, auto_remove=False, restart_policy={"Name": "no"}, mem_limit="512m", nano_cpus=500_000_000, read_only=False, cap_drop=["ALL"], cap_add=["NET_BIND_SERVICE"], security_opt=["no-new-privileges:true"])`
3. Poll `container.reload()` + `container.ports[f"{internal_port}/tcp"]` until populated (50 × 100 ms = 5 s ceiling).
4. Health-check the published `HostPort` via HTTP GET to `/healthz` (10 s ceiling).
5. Return `{"container_id": container.id, "host_port": int(binding[0]["HostPort"]), "name": container.name}`.
6. On any exception in steps 2-4, run cleanup: `container.remove(force=True)` swallowing `NotFound`.

**kill_agent_server(container_id) -> None** (idempotent):
1. `try: container = _docker.containers.get(container_id)` → on `NotFound`, return (already gone).
2. `await asyncio.to_thread(container.stop, timeout=10)` — wraps SIGTERM-then-SIGKILL.
3. `try: await asyncio.to_thread(container.remove)` → swallow `NotFound` (race with daemon GC).
4. Log structured event with container.id + final exit code (`container.wait()` is non-blocking once stopped).

**Reconcile loop** (cleanup orphans every N seconds OR at wave-close):
```python
orphans = _docker.containers.list(
    all=True,
    filters={"label": ["managed-by=w376"], "status": "exited"},
    ignore_removed=True,
)
for c in orphans:
    try: c.remove(force=True)
    except docker.errors.NotFound: pass
```

**Retry policy**: let Temporal-activity retry policy handle `APIError 5xx` + `requests.ConnectionError`. Convert `ImageNotFound` + `InvalidArgument` to `ApplicationError(non_retryable=True)`. Convert `NotFound` (container) on kill → success (idempotent).

**Resource discipline**: always `auto_remove=False` (we want to inspect exit logs); use `--read-only` + dropped caps + memory/CPU limits for defense-in-depth; one network per wave for tenant isolation; label every primitive with `managed-by=w376` for reconcile sweep.

**Thread/event-loop discipline**: every docker-py call wrapped in `asyncio.to_thread`; never `await` a docker-py method directly; for >32 simultaneous spawns, allocate a dedicated `ThreadPoolExecutor`.
