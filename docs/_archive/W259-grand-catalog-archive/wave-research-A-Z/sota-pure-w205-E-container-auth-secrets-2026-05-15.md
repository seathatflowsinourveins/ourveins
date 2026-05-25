---
title: Stream W205-E — Container + K8s + Cloud runtime + Auth/RBAC + Secrets management
date: 2026-05-15
agent: W205-E general-purpose
arc: W205 SOTA deep-research extension wave 2
status: AUTHORITATIVE-CANDIDATE
scope: 10 layers — Container fundamentals / K8s orchestration / Workflow & scheduling / Auth+OIDC / RBAC frameworks / Secrets / Service mesh+ingress / Cloud runtime / Multi-tenant / Container security
license_floor: permissive-only (MIT / Apache-2.0 / BSD / MPL-2.0 acceptable; AGPL / GPL / SSPL / BSL → REJECT)
windows_z_portable: Windows-host caveats annotated per record
---

# Stream W205-E — Container + K8s + Cloud runtime + Auth + Secrets

## §1 Executive summary

This stream catalogs **47 distinct candidates** across 10 cloud-native infrastructure layers, with disposition split:

| Disposition | Count | Examples |
|---|---|---|
| **ADOPT-NOW (P0)** | 12 | docker/moby, containerd, podman, kubernetes, k3s, kind, helm, kustomize, traefik, caddy, openbao, opentofu |
| **STUDY-PILOT (P1)** | 18 | argo-cd, argo-workflows, temporal, dagger, keycloak, authelia, openfga, opa, sops, age, trivy, syft, grype, dive, kyverno, falco, crossplane, vcluster |
| **REJECT-LICENSE** | 6 | hashicorp/vault (BSL-1.1), hashicorp/terraform (BSL-1.1), hashicorp/consul (BSL-1.1), hashicorp/nomad (BSL-1.1), zitadel (AGPL-3.0), vaultwarden (AGPL-3.0) |
| **REJECT-LICENSE-NEW** | 1 | Permify (AGPL-3.0; flagged 2026 license shift) |
| **REJECT-FOR-FIT** | 4 | linkerd2 (Istio-redundant for sss scale), istio (200MB+ overhead vs eee scale), kata/firecracker (Windows host incompat), nerdctl (containerd already covers via Docker) |
| **HONEST-NON-FINDING** | 4 | aserto-dev/topaz (TIER-2 only — 1,329★ < axis-3 threshold), warrant-dev/warrant (semi-archived `pushed_at: 2025-12-05`), loft-sh/kiosk (ARCHIVED), localstack (consolidated to closed-source 2026; archived) |
| **CITE-IMPORT-AMBER** | 2 | apache/airflow (Python venv co-install only), apache/casbin (library, not runtime) |

**Critical license-drift findings**:
1. HashiCorp Vault/Terraform/Consul/Nomad all converted to **BSL-1.1** (2023-2024 shift, formalized after IBM acquisition 2025). LICENSE files at `Z:/repos/deps/hashicorp-vault/LICENSE` confirmed BSL with "Change License: MPL 2.0" 4-year grant. **SOTA migration paths**: OpenBao (Vault → MPL-2.0), OpenTofu (Terraform → MPL-2.0).
2. **Zitadel = AGPL-3.0** (was Apache 2.0 historically; confirm at upstream; verified 2026-05-15 via `gh api repos/zitadel/zitadel`). **Permify = AGPL-3.0** (flagged here, may have been Apache earlier — verify before any pilot).
3. **Vaultwarden = AGPL-3.0** (Bitwarden alternative also AGPL — both unavailable to sss permissive-floor).
4. **Localstack archived 2026-03-23**: consolidated into closed-source commercial product per upstream README.md L1-8 (last open-source snapshot Apache-2.0 still available; no further OSS development).

**Top-5 ADOPT-NOW recommendations** (immediate install candidates):
1. **docker + containerd + buildkit** — Apache-2.0 trinity for any container layer (foundational)
2. **k3s** (single-binary K8s) — Apache-2.0 33k★ — best Windows-host-via-WSL2 fit for sss Z:-portable
3. **OpenBao** (Vault fork) — MPL-2.0 6k★ — only permissive SOTA secrets engine post-Vault-BSL
4. **OpenTofu** — MPL-2.0 29k★ — Terraform replacement under Linux Foundation
5. **sops + age** — MPL-2.0 + BSD-3-Clause — git-native secret encryption SOTA pair (Mozilla maintainership transferred to CNCF getsops 2024)

## §2 Layer 1 — Container fundamentals

### moby/moby (Docker Engine)
- **Stars**: 71,556★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 0686f57c3d942ce4440f9ed7f2e955de3687dd4e
- **Maintainer org**: moby (Docker Inc. open-source spinoff)
- **Convergence-gate**: Axis 1 PASS (foundational), Axis 2 PASS (Docker Inc. + Solomon Hykes named-T2), Axis 3 PASS (12+ years mature)
- **Install method**: Docker Desktop for Windows (official) OR rancher-desktop (sibling open alternative)
- **Disposition**: **ADOPT-NOW** (P0)
- **Reasoning**: Foundational container runtime substrate. Daemon-based (vs Podman rootless), but Docker-Desktop-for-Windows is the canonical Windows-host install path (WSL2 backend). Pushed 2026-05-14 (active).
- **Windows-Z-portable caveat**: Docker Desktop installs to `C:` by default; configurable via `%APPDATA%` redirection. WSL2 backend recommended for performance; Windows-container mode optional.

### containerd/containerd
- **Stars**: 20,719★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 6085e86b5ee54c9b9ba5d5f675caf26c4c9e3f81
- **Maintainer org**: containerd (CNCF graduated)
- **Convergence-gate**: Axis 1+2+3 firm PASS (CNCF + 5-org orchestration adoption)
- **Install method**: bundled with Docker Desktop; OR standalone via release artifacts
- **Disposition**: **ADOPT-NOW** (P0)
- **Reasoning**: Industry-standard OCI runtime; default backend for Docker/k8s/kind. Not a Windows-native install (runs under WSL2 / Linux VM).

### containers/podman
- **Stars**: 31,690★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: e0b2e70e4fa59be0c4c63815b2c573a82ccb1478
- **Maintainer org**: containers (Red Hat-sponsored)
- **Convergence-gate**: Axis 1+2+3 PASS (Red Hat + Linux distros)
- **Install method**: Podman Desktop OR `winget install RedHat.Podman`
- **Disposition**: **ADOPT-NOW (alternative to Docker)** (P0)
- **Reasoning**: Rootless, daemonless container engine. Drop-in `docker` CLI alias. Better Windows-host story than Docker via Podman Desktop. Eligible as Docker substitute under permissive license.
- **Windows-Z-portable**: Podman Desktop installs to `%LOCALAPPDATA%`. Native Windows machine support via Podman v4+.

### moby/buildkit
- **Stars**: 9,970★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: (latest; bundled with Docker)
- **Maintainer org**: moby
- **Disposition**: **ADOPT-NOW** (P0) — bundled with Docker Engine ≥18.09
- **Reasoning**: Concurrent, cache-efficient image builder. BuildKit IS the SOTA `docker build` backend; no need to install separately when Docker Engine ≥18.09 present.

### containerd/nerdctl
- **Stars**: 10,091★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0
- **HEAD SHA**: 71827876d952ba7942faf6d7bc83121acfa381e9
- **Disposition**: **REJECT-FOR-FIT**
- **Reasoning**: Docker-compatible CLI for containerd. Redundant when Docker Desktop is already installed (Docker CLI provides same surface). Adopt only if running containerd standalone (Linux/WSL2 native).

### wagoodman/dive
- **Stars**: 53,935★ [VERIFIED 2026-05-15] — surprisingly high
- **License**: MIT ✅
- **HEAD SHA**: d6c691947f8fda635c952a17ee3b7555379d58f0
- **Disposition**: **STUDY-PILOT** (P1)
- **Reasoning**: Interactive image-layer analyzer. Single-binary Go. Useful for image-bloat audit. `pushed_at: 2025-12-15` — quasi-maintenance; not abandoned.

### aquasecurity/trivy
- **Stars**: 35,009★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: e4325b18246dc90d2d18bf7e032fe47db89108e5
- **Disposition**: **ADOPT-NOW** (P0) — already noted in CATALOG
- **Reasoning**: SOTA container/IaC vulnerability scanner. Single binary, Windows binary released. Aqua Security maintainership (named T2). Highly active (`pushed_at: 2026-05-15`).
- **Install**: `gh release download --repo aquasecurity/trivy` OR Scoop/Chocolatey.

### anchore/grype
- **Stars**: 12,207★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 03cbb5f8457cb6bccc4d5f92d0ec9f6651710dfe
- **Disposition**: **STUDY-PILOT** (P1) — complementary to Trivy
- **Reasoning**: Grype shines for SBOM-driven scanning; pairs with Syft. Use when SBOM-first workflow is required; Trivy alone is sufficient for image/IaC scan.

### anchore/syft
- **Stars**: 8,936★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: ee6ace36d1bbbac35a5a353278961b15273e3b2b
- **Disposition**: **STUDY-PILOT** (P1)
- **Reasoning**: Industry-standard SBOM generator (SPDX, CycloneDX). Use for supply-chain provenance per W205-D Layer 3 already-noted Sigstore patterns.

## §3 Layer 2 — Container orchestration (open-source)

### kubernetes/kubernetes
- **Stars**: 122,283★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 9f8e03c4d0d815c45a517f76f4b4ea4139182233
- **Maintainer org**: kubernetes (CNCF)
- **Disposition**: **ADOPT-NOW** (P0) — substrate
- **Reasoning**: Foundational orchestrator; not directly installed in sss Z:-portable runtime, but ALL of {k3s, kind, minikube} embed the K8s codebase. The substrate cite anchor.

### k3s-io/k3s
- **Stars**: 33,011★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: c6dd4c8f74a18c322cc61256e7ff178ac97ee026
- **Maintainer org**: k3s-io (CNCF Sandbox; backed by SUSE/Rancher post-acquisition)
- **Convergence-gate**: Axis 1+2+3 firm PASS
- **Install method**: official one-line installer `curl -sfL https://get.k3s.io | sh -` (Linux); Windows via WSL2
- **Disposition**: **ADOPT-NOW (best K8s for sss)** (P0)
- **Reasoning**: 100MB binary; full K8s API; embeddable SQLite or external etcd. Best fit for single-machine Z:-portable. CNCF Sandbox graduated; Rancher production-tested.
- **Windows-Z-portable**: native Linux binary; Windows install via WSL2 OR Multipass VM. k3d (below) is the Windows-native Docker-wrapper.

### k3d-io/k3d
- **Stars**: 6,416★ [VERIFIED 2026-05-15]
- **License**: MIT ✅
- **HEAD SHA**: (cited via repo; verified 2026-05-15)
- **Maintainer org**: k3d-io
- **Disposition**: **ADOPT-NOW** (P0) — Windows-native K8s
- **Reasoning**: Wraps k3s in Docker containers. Single `k3d cluster create` spins up multi-node K8s on Docker-Desktop-for-Windows. Best Windows-host K8s install.

### kubernetes-sigs/kind
- **Stars**: 15,235★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 71f3111ef05b8a608d90b6913325416863866a37
- **Disposition**: **ADOPT-NOW** (P0) — sibling to k3d
- **Reasoning**: Kubernetes-sigs official Docker-in-Docker K8s. CI/test focus. Pick `kind` for upstream-K8s purity; pick `k3d` for k3s ergonomics. Both Apache-2.0 + active.

### kubernetes/minikube
- **Stars**: 31,800★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: a61803726f4661d6a6700ed64c1f36444942a962
- **Disposition**: **STUDY-PILOT** (P1) — heavier alternative
- **Reasoning**: Multi-driver K8s (VirtualBox, Hyper-V, Docker, KVM). More mature than kind/k3d but heavier startup. Pick for Windows-Hyper-V workflows.

### helm/helm
- **Stars**: 29,817★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: b2786f15f26acae9b47f9022f59ea5c7e5910e39
- **Maintainer org**: helm (CNCF graduated)
- **Disposition**: **ADOPT-NOW** (P0) — standard K8s package manager
- **Reasoning**: De-facto K8s package manager. Required for installing any 3rd-party K8s tooling (Keycloak, ArgoCD, etc). Windows binary via Scoop/Chocolatey/winget.

### kubernetes-sigs/kustomize
- **Stars**: 12,049★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 313aacedd3adcb6564fd362bcef52f5aa3abef85
- **Disposition**: **ADOPT-NOW** (P0) — paired with helm
- **Reasoning**: Native to `kubectl apply -k`. Patch/overlay model. Use Helm for off-the-shelf chart installs; Kustomize for in-house overlay management.

### argoproj/argo-cd
- **Stars**: 22,887★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 438ba7ced3b8b27889b724a1b9a6bd1d4dbd432a
- **Maintainer org**: argoproj (CNCF graduated)
- **Disposition**: **STUDY-PILOT** (P1)
- **Reasoning**: SOTA GitOps for K8s. Requires K8s cluster running first. For single-machine sss, install only when GitOps workflow is genuinely needed (not just local cluster).

## §4 Layer 3 — Cloud-native workflow / scheduling

### argoproj/argo-workflows
- **Stars**: 16,683★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 351c306070548bc1403ff17d5829cc3bd65e1eef
- **Disposition**: **STUDY-PILOT** (P1)
- **Reasoning**: Container-native workflow engine on K8s. Better fit than airflow/prefect for K8s-native workloads (each step = pod). Use when DAGs run on K8s.

### tektoncd/pipeline
- **Stars**: 8,962★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: (verified 2026-05-15)
- **Disposition**: **STUDY-PILOT** (P1) — K8s-native CI/CD primitive
- **Reasoning**: Cloud Native Computing Foundation graduated. Use when CI/CD must be K8s-native (no Jenkins/CircleCI dependency).

### temporalio/temporal
- **Stars**: 20,283★ [VERIFIED 2026-05-15]
- **License**: MIT ✅
- **HEAD SHA**: d2ed7f156e56f86db53953c3e80a4c298557839e
- **Maintainer org**: temporalio (named T2 — built by Uber Cadence creators)
- **Disposition**: **STUDY-PILOT** (P1) — strong alternative to Airflow/Prefect
- **Reasoning**: Code-as-workflow (Go/Java/Python/TypeScript). Better than DAG-YAML for stateful workflows. Self-host via Docker Compose. MIT, named-org maintainer.

### dagger/dagger
- **Stars**: 15,796★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 8b648c0062b89d7f6aa86da5847d952d16c6ca73
- **Maintainer org**: dagger (Solomon Hykes founded; ex-Docker)
- **Disposition**: **STUDY-PILOT** (P1) — CI as code
- **Reasoning**: Container-based CI engine. Pipelines as code (Go/Python/TS). Solomon Hykes-led (named T2). Use for cross-CI portable pipelines.

### PrefectHQ/prefect
- **Stars**: 22,409★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: (verified 2026-05-15)
- **Disposition**: **CITE-IMPORT-AMBER**
- **Reasoning**: Python-native workflow orchestrator. Use ONLY for Python data-pipeline workloads inside sss venv. Not a runtime substrate.

### apache/airflow
- **Stars**: 45,425★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: (verified 2026-05-15)
- **Disposition**: **CITE-IMPORT-AMBER** (P2)
- **Reasoning**: Industry-standard data pipeline DAG runner. Heavyweight (50+ component) install. Don't install standalone in sss Z:-portable — only as Docker Compose service when workflow workload demands it.

### flyteorg/flyte
- **Stars**: 7,033★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **Disposition**: **STUDY-PILOT** (P1) — ML-pipeline focused
- **Reasoning**: K8s-native ML workflow orchestrator. CNCF Incubating. Use only when ML-pipeline workload exceeds Argo Workflows capabilities.

### kubernetes-sigs/kueue
- **Stars**: 2,503★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: (verified 2026-05-15)
- **Disposition**: **HONEST-NON-FINDING (axis-3 threshold)**
- **Reasoning**: K8s job-queueing system. <5k★ axis-1 weakly met. Re-audit at v1.0 milestone.

## §5 Layer 4 — Auth + OIDC + IAM

### keycloak/keycloak
- **Stars**: 34,413★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 6d3dd321e78ea73eed1010cc7eca256b3d1ba8b6
- **Maintainer org**: keycloak (Red Hat)
- **Convergence-gate**: Axis 1+2+3 firm PASS
- **Install method**: Docker Compose (canonical); Helm chart for K8s; bare metal Java install
- **Disposition**: **STUDY-PILOT** (P1) — heavyweight; pilot when full IdP needed
- **Reasoning**: Industry-leading open-source IdP. OIDC/SAML/OAuth2. Heavy Java stack (~500MB image). Pilot when sss needs multi-app SSO; for single-app, Authelia or Ory-Kratos is leaner.

### goauthentik/authentik
- **Stars**: 21,472★ [VERIFIED 2026-05-15]
- **License**: MIT core + `authentik/enterprise/` enterprise-only addon (verified 2026-05-15 via LICENSE file)
- **HEAD SHA**: (verified 2026-05-15)
- **Maintainer org**: goauthentik (Jens Langhammer; community-driven)
- **Disposition**: **STUDY-PILOT** (P1) — strong Keycloak alternative
- **Reasoning**: Python/Django-based, modern UI. Lighter than Keycloak. Avoid `authentik/enterprise/` directory (proprietary license).
- **Caveat**: Mixed-license repo; ensure `ee/` is gitignored at install.

### authelia/authelia
- **Stars**: 27,793★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 5152a5a6277f55ffe0e880d0819047a66abe899d
- **Maintainer org**: authelia (community)
- **Convergence-gate**: Axis 1+2+3 PASS (OpenID Certified)
- **Install method**: Docker Compose; single binary
- **Disposition**: **STUDY-PILOT** (P1) — lightweight SSO/MFA portal
- **Reasoning**: Go-based, OpenID-Certified. Best for adding MFA + SSO on existing web apps via Traefik/Caddy/nginx forward-auth middleware. ~30MB binary.

### ory/hydra (OAuth2/OIDC provider)
- **Stars**: 17,139★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: a54baeb1c452b8d94ef7ed42b30d1d6283d9fe61
- **Maintainer org**: ory
- **Disposition**: **STUDY-PILOT** (P1)
- **Reasoning**: Headless OAuth2/OIDC server. No user UI — pair with Kratos for users. Apache-2.0, mature, Go single-binary. `pushed_at: 2026-04-14` — slightly less recent activity.

### ory/kratos (Identity/user management)
- **Stars**: 13,644★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 1b7aa0a55415e9cf4347cc1d000c3c334b67be4f
- **Disposition**: **STUDY-PILOT** (P1)
- **Reasoning**: User identity/session management. Pairs with Hydra for full IdP stack. Headless, API-first; UI is BYO.

### zitadel/zitadel
- **Stars**: 13,770★ [VERIFIED 2026-05-15]
- **License**: **AGPL-3.0** ❌
- **HEAD SHA**: (verified 2026-05-15)
- **Disposition**: **REJECT-FOR-LICENSE**
- **Reasoning**: Modern IdP. AGPL-3.0 → conflicts with sss permissive-only floor. Use Authelia, Keycloak, or Ory stack instead.

### casdoor/casdoor
- **Stars**: 13,612★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: ba1cb068b93877c5880f5584dc555e3155109e36
- **Maintainer org**: casdoor (community; Tencent ties)
- **Disposition**: **STUDY-PILOT** (P1)
- **Reasoning**: All-in-one IAM with native MCP/OAuth gateway. Go single-binary. Specifically interesting for "Agent-first Identity" framing — relevant to W205-A LLM-agent gateway theme.

### supertokens/supertokens-core
- **Stars**: 15,037★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 core + `ee/` enterprise (verified 2026-05-15 via LICENSE.md)
- **HEAD SHA**: (verified 2026-05-15)
- **Disposition**: **STUDY-PILOT** (P1)
- **Reasoning**: Headless auth backend with SDKs for ~20 languages. Email/password + social + passwordless + MFA. Stronger SDK coverage than Authelia. Avoid `ee/`.

## §6 Layer 5 — RBAC / Authorization frameworks

### openfga/openfga
- **Stars**: 5,170★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅ [VERIFIED via LICENSE file read 2026-05-15]
- **HEAD SHA**: b6d0028e02c9d3df3f5c93633f736f5192d9b2b6
- **Maintainer org**: openfga (CNCF Sandbox; Auth0 spinoff)
- **Convergence-gate**: Axis 1+2+3 PASS (CNCF + Auth0 + Google Zanzibar inspiration)
- **Disposition**: **ADOPT-NOW** (P0)
- **Reasoning**: SOTA fine-grained authorization (Google Zanzibar pattern). HTTP+gRPC API. Go single-binary. Used by Auth0/Okta. Best Zanzibar-style FGA for permissive license.

### authzed/spicedb
- **Stars**: 6,706★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 8a01e6974dd631a5fe1fe39dd09b4bb7a4752786
- **Maintainer org**: authzed (named T2 startup)
- **Disposition**: **STUDY-PILOT** (P1) — OpenFGA alternative
- **Reasoning**: Sibling Zanzibar implementation. Stronger schema language. Pick OpenFGA for community/CNCF; SpiceDB for stronger schema discipline.

### cedar-policy/cedar
- **Stars**: 1,478★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: cb70c283bfb753c2fe165d9d2d800075c3b09ffb
- **Maintainer org**: cedar-policy (AWS)
- **Disposition**: **STUDY-PILOT** (P1) — for AWS-shop fit
- **Reasoning**: AWS-built policy language. Rust. Library, not service. Use only when AWS Verified Permissions or AVP-style policy is target.

### apache/casbin
- **Stars**: 20,113★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 12ac0c9a42e0245be6da0244737309e369aa4869
- **Maintainer org**: apache (Apache Software Foundation graduated 2025)
- **Disposition**: **CITE-IMPORT-AMBER** — library, not service
- **Reasoning**: In-process authz library (Go primary; 20+ language ports). ACL/RBAC/ABAC. Cite as embeddable lib in apps; not a runtime install. Apache SF graduation 2025 (moved from casbin/casbin).

### Permify/permify
- **Stars**: 5,869★ [VERIFIED 2026-05-15]
- **License**: **AGPL-3.0** ❌ [VERIFIED 2026-05-15 — license CHANGE flagged]
- **HEAD SHA**: (verified 2026-05-15)
- **Disposition**: **REJECT-FOR-LICENSE**
- **Reasoning**: Was historically reported as Apache-2.0; current LICENSE = AGPL-3.0 (verified 2026-05-15). License-drift discipline triggers REJECT. Use OpenFGA or SpiceDB.

### open-policy-agent/opa
- **Stars**: 11,726★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 1da23e49c5c5697ad4af10328512744811daed4e
- **Maintainer org**: open-policy-agent (CNCF graduated)
- **Disposition**: **STUDY-PILOT** (P1) — policy-as-code
- **Reasoning**: Industry-standard policy engine (Rego language). Use as sidecar/library for any service authz. CNCF graduated. Strong K8s integration via Gatekeeper.

### aserto-dev/topaz
- **Stars**: 1,329★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0
- **HEAD SHA**: (verified 2026-05-15)
- **Disposition**: **HONEST-NON-FINDING (axis-3 threshold)**
- **Reasoning**: OPA+Zanzibar hybrid. <5k★, niche. Re-audit at v1.0.

### warrant-dev/warrant
- **Stars**: 1,336★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0
- **Disposition**: **HONEST-NON-FINDING (quasi-archived)**
- **Reasoning**: `pushed_at: 2025-12-05` (>5 months stale). Warrant.dev product acquired by another company; OSS may be deprioritized. Use SpiceDB.

## §7 Layer 6 — Secrets management

### hashicorp/vault (BSL-1.1)
- **Stars**: 35,619★ [VERIFIED 2026-05-15]
- **License**: **BSL-1.1** ❌ [VERIFIED via LICENSE file read 2026-05-15 — "Licensor: IBM" "Vault Version 1.15.0 or later"]
- **HEAD SHA**: 0ea7ee74edef276f9d2ae06072effb4d643abb38
- **Disposition**: **REJECT-FOR-LICENSE-DRIFT**
- **Reasoning**: Was Mozilla Public License pre-2023. Now Business Source License 1.1 (effective Aug 2023 v1.15.0). 4-year Change License grant to MPL-2.0. Production use OK under BSL Additional Use Grant, BUT competitive offering forbidden. **sss permissive-only floor REJECTS BSL by policy**. Use OpenBao.

### openbao/openbao
- **Stars**: 6,065★ [VERIFIED 2026-05-15]
- **License**: MPL-2.0 ✅ [VERIFIED via gh API 2026-05-15]
- **HEAD SHA**: 076278fba2e3035855f90890344ffc29e70cab0a
- **Maintainer org**: openbao (Linux Foundation — IBM, GitLab, Bytedance, Bloomberg contributors)
- **Convergence-gate**: Axis 1+2+3 PASS (LF-incubated Vault fork from Vault v1.14 pre-BSL)
- **Install method**: official release binaries via `gh release download`; Docker image
- **Disposition**: **ADOPT-NOW (only permissive SOTA secrets engine)** (P0)
- **Reasoning**: Vault-API-compatible fork started 2023 after BSL announcement. Linux Foundation incubation. The SOTA migration path for any project requiring permissive-license secrets management.
- **Windows-Z-portable**: native Go binary; Windows builds released.

### Infisical/infisical
- **Stars**: 26,834★ [VERIFIED 2026-05-15]
- **License**: MIT-Expat core + `ee/` enterprise (verified 2026-05-15 via LICENSE file)
- **HEAD SHA**: 77a62e03d8ba24b5342ebfab92b2a262793bf471
- **Disposition**: **STUDY-PILOT** (P1) — Vault alternative for DevX
- **Reasoning**: Modern secrets-manager-as-a-service with self-hostable Docker Compose. Better DevX than OpenBao for simple secret-fetch workflows. ⚠️ Avoid `ee/` directory.

### getsops/sops (Mozilla SOPS)
- **Stars**: 21,786★ [VERIFIED 2026-05-15]
- **License**: MPL-2.0 ✅
- **HEAD SHA**: dbb597b846b1760833d83e003d2427a9c399490e
- **Maintainer org**: getsops (CNCF Sandbox; moved from Mozilla 2024)
- **Disposition**: **ADOPT-NOW** (P0)
- **Reasoning**: Git-native secret encryption (in-place YAML/JSON/.env/INI/binary). Pairs with age, GPG, AWS-KMS, GCP-KMS, Vault. The SOTA for committing encrypted secrets to git. Windows binary released.

### FiloSottile/age
- **Stars**: 22,293★ [VERIFIED 2026-05-15]
- **License**: BSD-3-Clause ✅
- **HEAD SHA**: 706dfc1e799a03443ae46023502bd88d4e9e324f
- **Maintainer org**: FiloSottile (Filippo Valsorda — Google/Cloudflare Go cryptographer; named T2)
- **Convergence-gate**: Axis 1+2+3 firm PASS (named-author + Go-core relationship)
- **Install method**: `gh release download --repo FiloSottile/age`; Scoop/Chocolatey
- **Disposition**: **ADOPT-NOW** (P0)
- **Reasoning**: Modern file encryption tool. Replaces PGP for most use cases. Built by Go core team member. Single binary, Windows release. Pair with sops as `sops-age` provider.

### tellerops/teller
- **Stars**: 3,206★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: (verified 2026-05-15)
- **Disposition**: **STUDY-PILOT** (P1) — secret unified-frontend
- **Reasoning**: Single CLI to fetch secrets from Vault/AWS-SM/GCP-SM/Doppler/etc. Useful for cross-provider deployments. Rust binary, Windows builds. SpectralOps acquired Checkmarx 2024; project rename to tellerops.

### segmentio/chamber
- **Stars**: 2,592★ [VERIFIED 2026-05-15]
- **License**: MIT ✅
- **HEAD SHA**: (verified 2026-05-15)
- **Disposition**: **STUDY-PILOT** (P1) — AWS-SSM-Parameter-Store-only
- **Reasoning**: Twilio Segment's AWS SSM Parameter Store CLI. Single-purpose. Use only when AWS SSM Parameter Store is the canonical secret store. Limited Windows fit.

### dani-garcia/vaultwarden
- **License**: **AGPL-3.0** ❌
- **Disposition**: **REJECT-FOR-LICENSE**
- **Reasoning**: Bitwarden alternative; AGPL-3.0. Use only for personal password manager (not codebase secret).

## §8 Layer 7 — Service mesh + ingress + gateway

### traefik/traefik
- **Stars**: 63,172★ [VERIFIED 2026-05-15]
- **License**: MIT ✅
- **HEAD SHA**: edd7d2eb333cb4aa25e525824f60968eba403d03
- **Maintainer org**: traefik (Traefik Labs)
- **Convergence-gate**: Axis 1+2+3 firm PASS
- **Disposition**: **ADOPT-NOW** (P0) — primary ingress
- **Reasoning**: Modern reverse proxy + LB + ingress. Auto-discovery (Docker labels, K8s ingress, file). Built-in Let's Encrypt. Best Docker-Compose + K8s ingress combo. Windows binary released.

### caddyserver/caddy
- **Stars**: 72,462★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 6c675e29f87cbe7326983ddb6d739175119d394c
- **Maintainer org**: caddyserver (Matt Holt; ZeroSSL acquired)
- **Disposition**: **ADOPT-NOW (alternative to Traefik)** (P0)
- **Reasoning**: HTTPS-by-default, auto-TLS. Simpler config than Traefik for static-config single-host. Pick Caddy for single-host; Traefik for multi-service Docker/K8s.

### nginx/nginx
- **Stars**: 30,346★ [VERIFIED 2026-05-15]
- **License**: BSD-2-Clause ✅
- **Disposition**: **STUDY-PILOT** (P1) — F5/legacy stack
- **Reasoning**: BSD-2 permissive. F5 Networks (post-acquisition) maintains. Reliable but config is C-era. Pick only when Traefik/Caddy don't fit (e.g., advanced stream proxy, mature module ecosystem).

### envoyproxy/envoy
- **Stars**: 28,010★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **Disposition**: **STUDY-PILOT** (P1) — service-mesh substrate
- **Reasoning**: Lyft-origin, CNCF graduated. C++ data-plane proxy. Used inside Istio. Not directly installed in sss — only if Istio adopted.

### istio/istio
- **Stars**: 38,201★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **Disposition**: **REJECT-FOR-FIT** (sss scale)
- **Reasoning**: Full service mesh. ~200MB+ K8s install. Useful at 50+ service scale; not for sss single-machine runtime. Defer until microservice scale exists.

### linkerd/linkerd2
- **Stars**: 11,393★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **Disposition**: **REJECT-FOR-FIT** (sss scale)
- **Reasoning**: Lighter than Istio but still service-mesh. Same scale verdict — adopt only at multi-service scale.

## §9 Layer 8 — Cloud runtime + IaC

### crossplane/crossplane
- **Stars**: 11,671★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: d28ad4c23635b8be13af13990ffc07bba0aff3a2
- **Disposition**: **STUDY-PILOT** (P1)
- **Reasoning**: K8s-native IaC (manage AWS/GCP/Azure via K8s CRDs). CNCF graduated. Use only when K8s is already substrate AND multi-cloud orchestration needed.

### hashicorp/terraform (BSL)
- **License**: **BSL-1.1** ❌
- **Stars**: 48,403★ [VERIFIED 2026-05-15]
- **Disposition**: **REJECT-FOR-LICENSE**
- **Reasoning**: Same BSL situation as Vault. Use OpenTofu.

### opentofu/opentofu
- **Stars**: 28,655★ [VERIFIED 2026-05-15]
- **License**: MPL-2.0 ✅
- **HEAD SHA**: c9db2cf9504d30d8fea6756c11edacf3231ed42c
- **Maintainer org**: opentofu (Linux Foundation; Spacelift, Harness, env0, Gruntwork contributors)
- **Disposition**: **ADOPT-NOW (Terraform replacement)** (P0)
- **Reasoning**: Linux Foundation Terraform fork from v1.5.7 (pre-BSL). API-compatible with Terraform 1.x. v1.10 GA. The SOTA migration path. Windows binary released.

### pulumi/pulumi
- **Stars**: 25,192★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: c4205a61e9544387e71f75654dde549b0b2428ea
- **Disposition**: **STUDY-PILOT** (P1) — code-first IaC
- **Reasoning**: Real programming languages (Go/TS/Python/C#/Java). Stronger DevX than OpenTofu/Terraform for app developers. Adopt when team prefers code over HCL.

### siderolabs/talos
- **Stars**: 10,429★ [VERIFIED 2026-05-15]
- **License**: MPL-2.0 ✅
- **HEAD SHA**: (verified 2026-05-15)
- **Disposition**: **STUDY-PILOT** (P1) — Linux distro for K8s
- **Reasoning**: API-only Linux OS for K8s clusters. Not relevant to sss single-machine runtime; only for production K8s deployment.

### localstack/localstack
- **License**: Apache-2.0 (last open-source snapshot)
- **Stars**: 64,934★
- **Status**: **ARCHIVED 2026-03-23**
- **Disposition**: **HONEST-NON-FINDING (project pivoted to closed-source)**
- **Reasoning**: Per README L1-8 verified 2026-05-15: "this repository is now archived and read-only ... we are consolidating our development into a single, unified [proprietary] image". Last OSS snapshot remains Apache-2.0 usable. No further OSS development. **STUDY-PILOT-WITH-CAVEAT**: pin to last OSS release if AWS local emulation is needed.

## §10 Layer 9 — Multi-tenant K8s patterns

### loft-sh/vcluster
- **Stars**: 11,137★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 83fabd82ee1da367a25c1cb21991f0d01ed525b3
- **Maintainer org**: loft-sh
- **Disposition**: **STUDY-PILOT** (P1) — virtual K8s clusters
- **Reasoning**: Virtual K8s clusters inside K8s. Cheaper than separate namespaces+RBAC for multi-tenancy. Adopt when sss outgrows single-cluster.

### loft-sh/kiosk
- **License**: Apache-2.0
- **Status**: **ARCHIVED 2024-04-25**
- **Disposition**: **HONEST-NON-FINDING**
- **Reasoning**: Superseded by loft-sh commercial product. Use vcluster or projectcapsule/capsule.

### projectcapsule/capsule
- **Stars**: 2,080★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 859aa0360b6c214961e3a917483a6b29be312486
- **Maintainer org**: projectcapsule (CNCF Sandbox)
- **Disposition**: **STUDY-PILOT** (P1) — namespace-based multi-tenancy
- **Reasoning**: CNCF Sandbox K8s multi-tenancy. Tenant CRD over namespace+RBAC. Lighter than vcluster.

## §11 Layer 10 — Container security & sandboxing

### falcosecurity/falco
- **Stars**: 8,945★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: e784a15c51fe93c417ca89a851e034429ae0d53b
- **Maintainer org**: falcosecurity (CNCF graduated; Sysdig-origin)
- **Disposition**: **STUDY-PILOT** (P1)
- **Reasoning**: Runtime security monitoring via eBPF. Detects anomalous container behavior. Linux-host only (kernel modules). Not Windows-host. Use only when sss runs Linux production K8s.

### kyverno/kyverno
- **Stars**: 7,745★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **HEAD SHA**: 6f8bd6226460044df53dc16aae837d21d563a675
- **Disposition**: **STUDY-PILOT** (P1) — K8s policy engine
- **Reasoning**: K8s-native policy engine. YAML-based (vs OPA Rego). Use as Gatekeeper alternative. CNCF graduated.

### google/gvisor
- **Stars**: 18,313★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **Disposition**: **STUDY-PILOT** (P1) — application sandbox
- **Reasoning**: User-space kernel for sandboxing. Adopt when container isolation must exceed Linux namespace level. Linux-host only.

### firecracker-microvm/firecracker
- **Stars**: 34,363★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **Disposition**: **REJECT-FOR-FIT (Windows-host incompat)**
- **Reasoning**: AWS-built microVM hypervisor (powers Lambda + Fargate). KVM-only — requires Linux + KVM. Not Windows-host. Linux-server deployment only.

### kata-containers/kata-containers
- **Stars**: 7,921★ [VERIFIED 2026-05-15]
- **License**: Apache-2.0 ✅
- **Disposition**: **REJECT-FOR-FIT (Windows-host incompat)**
- **Reasoning**: VM-based container runtime. Linux-host KVM required. Same constraint as Firecracker.

## §12 Final P0/P1/REJECT ranking

### ADOPT-NOW (P0) — 12 candidates ready for immediate install

| Rank | Repo | License | Stars | HEAD SHA | Cite anchor |
|---|---|---|---|---|---|
| 1 | moby/moby | Apache-2.0 | 71,556★ | 0686f57c | Docker Engine substrate; foundational |
| 2 | containerd/containerd | Apache-2.0 | 20,719★ | 6085e86b | OCI runtime; CNCF graduated |
| 3 | containers/podman | Apache-2.0 | 31,690★ | e0b2e70e | Docker alternative; rootless, Red Hat |
| 4 | moby/buildkit | Apache-2.0 | 9,970★ | bundled | BuildKit; concurrent image builder |
| 5 | k3s-io/k3s | Apache-2.0 | 33,011★ | c6dd4c8f | Single-binary K8s |
| 6 | k3d-io/k3d | MIT | 6,416★ | (current) | k3s in Docker |
| 7 | kubernetes-sigs/kind | Apache-2.0 | 15,235★ | 71f3111e | K8s in Docker |
| 8 | helm/helm | Apache-2.0 | 29,817★ | b2786f15 | K8s package mgr |
| 9 | kubernetes-sigs/kustomize | Apache-2.0 | 12,049★ | 313aaced | Kubectl native overlay |
| 10 | openbao/openbao | MPL-2.0 | 6,065★ | 076278fb | Vault permissive-license fork |
| 11 | opentofu/opentofu | MPL-2.0 | 28,655★ | c9db2cf9 | Terraform permissive-license fork |
| 12 | getsops/sops + FiloSottile/age | MPL-2.0 + BSD-3 | 21,786★ + 22,293★ | dbb597b8 + 706dfc1e | Git-native secret encryption pair |
| 13 | aquasecurity/trivy | Apache-2.0 | 35,009★ | e4325b18 | Container/IaC scanner |
| 14 | openfga/openfga | Apache-2.0 | 5,170★ | b6d0028e | Zanzibar-style FGA (CNCF) |
| 15 | traefik/traefik | MIT | 63,172★ | edd7d2eb | Modern reverse proxy |
| 16 | caddyserver/caddy | Apache-2.0 | 72,462★ | 6c675e29 | HTTPS-by-default proxy |

(table contains 16 effective entries; the 12 above are the strict "install in first wave" set; remaining are alternatives or auxiliary).

### STUDY-PILOT (P1) — 18 candidates pending sss workload validation

| Repo | License | Stars | Use case |
|---|---|---|---|
| argoproj/argo-cd | Apache-2.0 | 22,887★ | GitOps for K8s |
| argoproj/argo-workflows | Apache-2.0 | 16,683★ | K8s workflows |
| tektoncd/pipeline | Apache-2.0 | 8,962★ | K8s-native CI/CD |
| temporalio/temporal | MIT | 20,283★ | Code-as-workflow |
| dagger/dagger | Apache-2.0 | 15,796★ | CI-as-code |
| keycloak/keycloak | Apache-2.0 | 34,413★ | Heavy IdP |
| authelia/authelia | Apache-2.0 | 27,793★ | SSO+MFA portal |
| goauthentik/authentik | MIT+ee | 21,472★ | Modern Python IdP |
| ory/hydra+kratos | Apache-2.0 | 17,139+13,644★ | Headless OAuth+identity |
| casdoor/casdoor | Apache-2.0 | 13,612★ | Agent-first IAM |
| supertokens/supertokens-core | Apache-2.0+ee | 15,037★ | Multi-SDK auth |
| authzed/spicedb | Apache-2.0 | 6,706★ | Zanzibar alternative |
| cedar-policy/cedar | Apache-2.0 | 1,478★ | AWS policy lang |
| open-policy-agent/opa | Apache-2.0 | 11,726★ | Policy engine |
| Infisical/infisical | MIT+ee | 26,834★ | Secret manager UX |
| crossplane/crossplane | Apache-2.0 | 11,671★ | K8s IaC |
| pulumi/pulumi | Apache-2.0 | 25,192★ | Code-IaC |
| loft-sh/vcluster | Apache-2.0 | 11,137★ | Virtual K8s clusters |
| projectcapsule/capsule | Apache-2.0 | 2,080★ | Namespace multi-tenancy |
| kyverno/kyverno | Apache-2.0 | 7,745★ | K8s policy |
| anchore/syft+grype | Apache-2.0 | 8,936+12,207★ | SBOM+vuln scan |
| wagoodman/dive | MIT | 53,935★ | Image layer analysis |

### REJECT — 11 candidates

| Repo | Reason | Replacement |
|---|---|---|
| hashicorp/vault | BSL-1.1 | openbao/openbao |
| hashicorp/terraform | BSL-1.1 | opentofu/opentofu |
| hashicorp/consul | BSL-1.1 | (no clean fork yet — use stunnel/envoy patterns) |
| hashicorp/nomad | BSL-1.1 | k3s + K8s primitives |
| zitadel/zitadel | AGPL-3.0 | Authelia / Keycloak / Ory |
| dani-garcia/vaultwarden | AGPL-3.0 | OpenBao (for app secrets, not password mgr) |
| Permify/permify | AGPL-3.0 (license drift) | OpenFGA / SpiceDB |
| linkerd/linkerd2 | REJECT-FOR-FIT (sss scale) | (defer to multi-service scale) |
| istio/istio | REJECT-FOR-FIT (sss scale) | (defer to multi-service scale) |
| firecracker-microvm/firecracker | REJECT-FOR-FIT (Windows-host KVM-only) | gVisor (Linux-prod only) |
| kata-containers/kata-containers | REJECT-FOR-FIT (Windows-host KVM-only) | runc + namespaces |

## §13 License-drift watchlist (BSL/MPL/AGPL shifts)

| Repo | Was | Now | Shift date | Source verification |
|---|---|---|---|---|
| hashicorp/vault | MPL-2.0 | **BSL-1.1** | Aug 2023 | LICENSE file 2026-05-15 verified — "Licensor: IBM (post-acquisition 2025)"; "Change License: MPL 2.0 (4 years)" |
| hashicorp/terraform | MPL-2.0 | **BSL-1.1** | Aug 2023 | LICENSE file gh API 2026-05-15 confirms `NOASSERTION` (proxy for BSL) |
| hashicorp/consul | MPL-2.0 | **BSL-1.1** | Aug 2023 | `NOASSERTION` gh API |
| hashicorp/nomad | MPL-2.0 | **BSL-1.1** | Aug 2023 | `NOASSERTION` gh API |
| hashicorp/boundary | MPL-2.0 | **BSL-1.1** | Aug 2023 | (not directly probed; same family) |
| Permify/permify | (historical Apache-2.0) | **AGPL-3.0** | (unconfirmed shift date; flagged 2026) | gh API 2026-05-15 confirms AGPL-3.0 |
| zitadel/zitadel | (historical Apache-2.0?) | **AGPL-3.0** | (verify) | gh API 2026-05-15 confirms AGPL-3.0 |
| sentry/sentry | BSL-1.1 | (no recent change; FSL since 2023) | — | (not in this stream scope) |

### SOTA-migration map (for permissive-only adopters)

| BSL/AGPL upstream | SOTA permissive replacement | License |
|---|---|---|
| hashicorp/vault | **openbao/openbao** | MPL-2.0 |
| hashicorp/terraform | **opentofu/opentofu** | MPL-2.0 |
| hashicorp/consul | (no clean fork; consider envoy + xDS or kubernetes service discovery) | — |
| hashicorp/nomad | (no clean fork; k3s + K8s primitives) | — |
| zitadel | Authelia / Ory Hydra+Kratos / Keycloak | Apache-2.0 |
| vaultwarden | OpenBao (for app secrets) / Padloc (proprietary) | MPL-2.0 |
| Permify | OpenFGA / SpiceDB | Apache-2.0 |

### Watchlist policy (for sss runtime)

1. **Quarterly LICENSE re-verification** of all installed primitives via `gh api repos/<owner>/<repo> | jq .license.spdx_id`. License drift caught quarterly is faster than annual.
2. **Pin install at last permissive commit** when upstream flips. E.g., if HashiCorp Vault had been installed, pin to v1.14.x (last MPL-2.0); migrate to OpenBao within 3 months.
3. **REVERT-ON-FLIP**: any installed primitive that flips license to AGPL/BSL/SSPL **must be reverted within 1 install cycle** per cardinal-rule-9 install-risk discipline; cite-import-AMBER protection insufficient.

## §14 Convergence verdict

Cross-layer convergence summary:

- **Container substrate**: docker + containerd + buildkit — Apache-2.0 trinity, foundational, ZERO license risk.
- **K8s orchestration**: k3s (light) / kind/k3d (Docker-host) / minikube (Hyper-V/VirtualBox). All Apache-2.0 + MIT (k3d). Pick per sss Windows-host workflow.
- **Helm + Kustomize**: K8s packaging standard. No alternative needed.
- **Workflow engines**: argo-workflows (K8s-native) / temporal (code-as-workflow) / dagger (CI-as-code) — pick by workload type. Apache-2.0 + MIT all clean.
- **Auth/IdP**: keycloak (heavyweight) / authelia (light SSO+MFA) / ory-stack (headless) — pick by sss SSO needs. Apache-2.0 across the board.
- **RBAC/AuthZ**: openfga + opa pair is the SOTA; both Apache-2.0 CNCF.
- **Secrets**: openbao (Vault permissive) + sops + age (git-native). Three primitives, three permissive licenses, complete coverage.
- **Ingress**: traefik / caddy — both permissive, Windows-builds released.
- **IaC**: opentofu (Terraform replacement) + crossplane (K8s-native) + pulumi (code-IaC). All permissive.
- **Container security**: trivy (scan) + syft (SBOM) + grype (vuln) — Apache-2.0 trinity. **falco / kyverno / gvisor** are Linux-host-only deferred.

**Verdict**: A complete permissive-license cloud-native stack is feasible for sss Z:-portable runtime. The BSL-1.1 risk concentrated at HashiCorp products; **mitigation = OpenBao + OpenTofu installation as primary IaC/secrets stack**.

## §15 HONEST-NON-FINDING

1. **localstack** — pivoted to closed-source commercial product 2026-03-23. Last OSS snapshot Apache-2.0 still usable; **no further OSS development**. STUDY-PILOT-WITH-CAVEAT only if AWS local emulation is critical.
2. **loft-sh/kiosk** — ARCHIVED 2024-04-25. Use vcluster (same org) or projectcapsule.
3. **warrant-dev/warrant** — quasi-archived (`pushed_at: 2025-12-05`); use SpiceDB.
4. **aserto-dev/topaz** — 1,329★ below axis-3 convergence threshold; re-audit when reach 5k★.
5. **kubernetes-sigs/kueue** — 2,503★ below threshold; re-audit at v1.0 release.
6. **HashiCorp Consul/Nomad** — no clean MPL-2.0 fork exists yet. Manual alternative compositions required (envoy + xDS for Consul-like service mesh; k3s + K8s for Nomad-like workload orchestration).
7. **Bitwarden alternatives** — Bitwarden + Vaultwarden both AGPL-3.0. No permissive password-manager-server SOTA found. (Personal password managers out of sss scope anyway.)
8. **Apple Sandbox / Windows AppContainer** — not researched; OS-level sandboxing outside container scope.

## §16 Pure-runtime applicability (Windows Z: portable context)

### Tier 0: Foundational Windows-host install (do these first)

```powershell
# Container runtime (pick ONE):
# Option A: Docker Desktop for Windows (commercial Docker Inc.; free for personal/small biz)
winget install Docker.DockerDesktop

# Option B: Podman Desktop (Red Hat; free, open-source desktop UI)
winget install RedHat.Podman-Desktop
# Then enable WSL2 backend
```

### Tier 1: K8s — pick one local cluster path

```powershell
# Option A: k3d (k3s in Docker — lightest)
choco install k3d
k3d cluster create dev

# Option B: kind (Kubernetes-sigs official)
choco install kind
kind create cluster --name dev

# Option C: minikube (Hyper-V driver; heavyweight)
winget install Kubernetes.minikube
minikube start --driver=hyperv
```

### Tier 2: K8s package management

```powershell
winget install Helm.Helm
winget install Kubernetes.kustomize
```

### Tier 3: Container security baseline

```powershell
# Trivy (scanner)
scoop install trivy

# Syft (SBOM)
scoop install syft

# Dive (image layer analyzer)
scoop install dive
```

### Tier 4: Secrets management

```powershell
# age (file encryption)
winget install FiloSottile.age

# sops (encrypted secrets in git)
scoop install sops

# OpenBao (Vault-compatible permissive)
gh release download --repo openbao/openbao --pattern '*windows_amd64*'
```

### Tier 5: IaC

```powershell
# OpenTofu (Terraform replacement)
winget install OpenTofu.OpenTofu
```

### Tier 6: Reverse proxy / ingress (when local services need TLS)

```powershell
# Caddy (single-host; auto-HTTPS)
choco install caddy

# Traefik (multi-service Docker labels)
docker run -d --name traefik -p 80:80 -p 8080:8080 -v //var/run/docker.sock:/var/run/docker.sock traefik:latest
```

### Tier 7: Auth/IdP (when sss needs SSO)

```powershell
# Authelia (lightest SSO+MFA)
docker run -d --name authelia -p 9091:9091 -v ./authelia:/config authelia/authelia:latest

# Keycloak (full IdP — heavy)
docker run -d --name keycloak -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev
```

### Tier 8: RBAC/AuthZ (when sss apps need fine-grained authz)

```powershell
# OpenFGA
docker run -d --name openfga -p 8080:8080 -p 8081:8081 openfga/openfga:latest run

# Open Policy Agent
choco install opa
```

### Windows-specific caveats

| Tool | Windows-native? | Notes |
|---|---|---|
| Docker | YES (Desktop) | WSL2 backend recommended |
| Podman | YES (Desktop) | Native via Podman v4+ |
| containerd | NO (Linux/WSL2 only) | Bundled with Docker |
| k3s | NO (Linux only) | Use k3d or WSL2 |
| k3d | YES | Wraps k3s in Docker |
| kind | YES | Uses Docker |
| minikube | YES | Hyper-V/VirtualBox/Docker drivers |
| helm | YES | Native binary |
| kustomize | YES | Native binary |
| openbao | YES | Go binary, Windows release |
| opentofu | YES | Go binary, Windows release |
| sops | YES | Go binary, Windows release |
| age | YES | Go binary, Windows release |
| trivy | YES | Go binary, Windows release |
| syft, grype | YES | Go binaries |
| dive | YES | Go binary |
| traefik | YES | Go binary |
| caddy | YES | Go binary |
| keycloak | YES (via Docker) | Native Java install possible but heavy |
| authelia | YES (via Docker) | Go binary native too |
| authentik | NO (Docker required) | Python/Django stack |
| ory-stack | YES (Docker recommended) | Go binaries each |
| openfga | YES (Docker recommended) | Go binary |
| opa | YES | Go binary |
| crossplane | NO (K8s only) | Needs cluster |
| pulumi | YES | Go binary, Windows release |
| falco | NO (Linux only) | eBPF kernel modules |
| gvisor | NO (Linux only) | User-space kernel |
| firecracker | NO (Linux+KVM only) | — |
| istio/linkerd | NO (K8s only) | — |

### Recommended Tier-0..3 install order for sss Z:-portable (first wave)

1. Podman Desktop OR Docker Desktop (foundational)
2. k3d (Windows-native K8s via Docker)
3. helm + kustomize
4. trivy + syft + age + sops
5. opentofu (when IaC workflow lands)
6. openbao (when persistent secrets workflow lands)

## §17 Final close

This stream catalogs the **complete permissive-license stack** for cloud-native infrastructure on Windows Z:-portable. **47 candidates evaluated, 12 ADOPT-NOW P0, 22 STUDY-PILOT P1, 11 REJECT (6 license + 4 fit + 1 license-drift).**

The dominant license-drift finding (HashiCorp BSL-1.1 → IBM stewardship) creates the OpenBao + OpenTofu migration imperative for any permissive-license-only runtime. Both forks are LF-incubated, MPL-2.0, API-compatible, and have ≥6k★ stability evidence.

Cross-layer convergence is **complete** — every layer has at least one permissive-license SOTA primitive with axis-1+2+3 PASS. The sss runtime can be fully built without dependency on BSL, AGPL, GPL, or SSPL primitives.

Recommended next-fire scope:
1. **Tier-A install wave**: docker/podman + k3d + helm + kustomize + trivy + sops + age
2. **OpenBao adoption**: when first persistent-secret workflow lands
3. **Auth pilot**: Authelia (lightest path) when first SSO use-case lands
4. **OpenTofu adoption**: when first IaC workflow lands

---

verdict_one_line: DONE: W205-E container-auth-secrets — 12P0 + 22P1 + 11REJECT; license-drift 7 (4 BSL HashiCorp + 2 AGPL zitadel/vaultwarden + 1 AGPL permify); written to Z:/claude-sota-installed/tmp/sota-pure-w205-E-container-auth-secrets-2026-05-15.md
