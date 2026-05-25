#!/usr/bin/env bash
# install.sh — Bash port of bootstrap/install.ps1 for WSL2 / Linux / macOS hosts.
#
# Wave: W338 Stream C (per W333.5 Stream 5 §2 design)
# Scope: subset of install.ps1 phases — NSSM replaced by systemd/launchd
#        check; winget replaced by apt/brew detection only (operator runs
#        package-manager commands manually per OS).
#
# Cardinal rules: R1 trust-tuple via manifest/deps.lock.json (out of scope here;
#                 operator must verify deps separately on Unix hosts) ·
#                 R6 verify-before-claim via INSTALL-RECORD.json
#
# Usage:
#   ./install.sh                                  # default /opt
#   ./install.sh --target-root /home/op --profile minimal
#   ./install.sh --dry-run
#
# Idempotency: stamp files under $INSTALL_ROOT/.bootstrap/state/<phase>.done.
# Re-run with --force to ignore stamps.

set -euo pipefail
IFS=$'\n\t'

# ---------------------------------------------------------------------------
# Defaults
# ---------------------------------------------------------------------------
TARGET_ROOT="${TARGET_ROOT:-/opt}"
INSTALL_ROOT=""
STATE_ROOT=""
TOOLS_ROOT=""
VENV_ROOT=""
PROFILE="full"
DRY_RUN=0
SKIP_SERVICES=0
SKIP_PLUGINS=0
FORCE=0

# ---------------------------------------------------------------------------
# Arg parsing
# ---------------------------------------------------------------------------
while [[ $# -gt 0 ]]; do
    case "$1" in
        --target-root) TARGET_ROOT="$2"; shift 2 ;;
        --install-root) INSTALL_ROOT="$2"; shift 2 ;;
        --state-root) STATE_ROOT="$2"; shift 2 ;;
        --tools-root) TOOLS_ROOT="$2"; shift 2 ;;
        --venv-root) VENV_ROOT="$2"; shift 2 ;;
        --profile) PROFILE="$2"; shift 2 ;;
        --dry-run) DRY_RUN=1; shift ;;
        --skip-services) SKIP_SERVICES=1; shift ;;
        --skip-plugins) SKIP_PLUGINS=1; shift ;;
        --force) FORCE=1; shift ;;
        -h|--help)
            sed -n '2,20p' "$0"; exit 0 ;;
        *)
            echo "Unknown arg: $1" >&2; exit 2 ;;
    esac
done

INSTALL_ROOT="${INSTALL_ROOT:-${TARGET_ROOT}/claude-sota-installed}"
STATE_ROOT="${STATE_ROOT:-${TARGET_ROOT}/claude-sota-installed-state}"
TOOLS_ROOT="${TOOLS_ROOT:-${TARGET_ROOT}/tools}"
VENV_ROOT="${VENV_ROOT:-${TARGET_ROOT}/venvs/claude}"

BOOTSTRAP_DIR="${INSTALL_ROOT}/.bootstrap"
STAMP_DIR="${BOOTSTRAP_DIR}/state"
RECORD_FILE="${BOOTSTRAP_DIR}/INSTALL-RECORD.json"
# W349 P0.5 RC-14: LOG_FILE removed (SC2034 unused; install logs go to phase/info/warn).

# ---------------------------------------------------------------------------
# Logging helpers
# ---------------------------------------------------------------------------
phase()  { printf '\033[36m[%s] [%s] %s\033[0m\n' "$(date +%H:%M:%S)" "$1" "$2"; }
info()   { printf '  %s\n' "$1"; }
ok()     { printf '  \033[32mOK  %s\033[0m\n' "$1"; }
warn()   { printf '  \033[33mWARN %s\033[0m\n' "$1"; }
err()    { printf '  \033[31mERR  %s\033[0m\n' "$1" >&2; }

run() {
    local desc="$1"; shift
    info "$desc"
    if [[ "$DRY_RUN" -eq 1 ]]; then
        warn "DRY-RUN — skipped"
        return 0
    fi
    "$@"
}

stamp_valid() {
    [[ "$FORCE" -eq 1 ]] && return 1
    [[ -f "${STAMP_DIR}/$1.done" ]]
}

write_stamp() {
    [[ "$DRY_RUN" -eq 1 ]] && return 0
    mkdir -p "$STAMP_DIR"
    cat > "${STAMP_DIR}/$1.done" <<EOF
{
  "phase": "$1",
  "timestamp": "$(date -Iseconds)",
  "payload": "$2"
}
EOF
}

# ---------------------------------------------------------------------------
# PHASE 1 — PREFLIGHT
# ---------------------------------------------------------------------------
do_preflight() {
    phase 'PREFLIGHT' "Verifying host prerequisites"

    command -v git >/dev/null 2>&1 || { err "git not on PATH"; exit 1; }
    ok "git: $(git --version)"

    command -v curl >/dev/null 2>&1 || { err "curl not on PATH"; exit 1; }
    ok "curl: $(curl --version | head -1)"

    local free_kb
    free_kb=$(df -k "$TARGET_ROOT" 2>/dev/null | awk 'NR==2 {print $4}') || free_kb=0
    local free_gb=$((free_kb / 1024 / 1024))
    if [[ "$free_gb" -lt 10 ]]; then
        err "Target root $TARGET_ROOT has ${free_gb}GB free; need >=10GB"
        exit 1
    fi
    ok "Target root $TARGET_ROOT free=${free_gb}GB"

    write_stamp 'preflight' "free_gb=${free_gb}"
}

# ---------------------------------------------------------------------------
# PHASE 2 — DEPS (advisory only on Unix; operator runs apt/brew)
# ---------------------------------------------------------------------------
do_deps() {
    phase 'DEPS' "Verifying dependencies (advisory; operator installs via OS pkg mgr)"

    local required=(git gh node python3 uv)
    local missing=()
    for tool in "${required[@]}"; do
        if command -v "$tool" >/dev/null 2>&1; then
            ok "$tool: $(command -v "$tool")"
        else
            warn "$tool MISSING — install via apt/brew/dnf"
            missing+=("$tool")
        fi
    done

    if [[ "${#missing[@]}" -gt 0 ]]; then
        warn "Missing tools: ${missing[*]}"
        warn "macOS:   brew install ${missing[*]}"
        warn "Debian:  sudo apt-get install ${missing[*]}"
    fi

    write_stamp 'deps' "missing=${#missing[@]}"
}

# ---------------------------------------------------------------------------
# PHASE 3 — VENV
# ---------------------------------------------------------------------------
do_venv() {
    phase 'VENV' "Creating Python 3.13 venv at $VENV_ROOT"

    if ! command -v uv >/dev/null 2>&1; then
        warn "uv not on PATH — skipping venv (run after installing uv)"
        return 0
    fi

    if [[ ! -d "$VENV_ROOT" ]]; then
        run "uv venv $VENV_ROOT --python 3.13" uv venv "$VENV_ROOT" --python 3.13
    else
        ok "venv already at $VENV_ROOT"
    fi

    if [[ -f "${INSTALL_ROOT}/requirements.txt" ]]; then
        run "uv pip install -r requirements.txt" \
            uv pip install --python "${VENV_ROOT}/bin/python" -r "${INSTALL_ROOT}/requirements.txt"
    fi

    write_stamp 'venv' "root=${VENV_ROOT}"
}

# ---------------------------------------------------------------------------
# PHASE 4 — CLONE + PATCH (Z: -> target-root substitution)
# ---------------------------------------------------------------------------
do_clone_patch() {
    phase 'CLONE+PATCH' "Substituting Z: paths to ${TARGET_ROOT} POSIX form"

    if [[ ! -d "$INSTALL_ROOT" ]]; then
        err "InstallRoot $INSTALL_ROOT missing — git clone first"
        exit 1
    fi

    # Only patch if not on Windows (PowerShell host owns Z: invariant)
    local targets=(
        "${INSTALL_ROOT}/.claude/settings.json"
        "${INSTALL_ROOT}/.mcp.json"
    )

    for t in "${targets[@]}"; do
        [[ -f "$t" ]] || { warn "Patch target $t missing"; continue; }
        # POSIX-style substitution: Z:/foo -> ${TARGET_ROOT}/foo
        # W349 P0.5 RC-14: SC2155 split — `local bak=$(date)` masks subshell exit code.
        local bak
        bak="${t}.bak.$(date +%Y%m%d%H%M%S)"
        if [[ "$DRY_RUN" -eq 0 ]]; then
            cp "$t" "$bak"
            sed -i.tmp "s|Z:/|${TARGET_ROOT}/|g; s|Z:\\\\|${TARGET_ROOT}/|g" "$t"
            rm -f "${t}.tmp"
            ok "Patched $t (backup at $bak)"
        else
            warn "DRY-RUN — would patch $t"
        fi
    done

    mkdir -p "$STATE_ROOT" "$STATE_ROOT/.codex" "$STATE_ROOT/.claude/projects" "$STATE_ROOT/cognee"

    write_stamp 'clone-patch' "patched=${#targets[@]}"
}

# ---------------------------------------------------------------------------
# PHASE 5 — PLUGINS
# ---------------------------------------------------------------------------
do_plugins() {
    if [[ "$SKIP_PLUGINS" -eq 1 ]]; then
        phase 'PLUGINS' "Skipped (--skip-plugins)"
        return 0
    fi
    phase 'PLUGINS' "Installing Claude Code plugins per manifest"

    local manifest="${INSTALL_ROOT}/bootstrap/manifest/plugins.json"
    if [[ ! -f "$manifest" ]]; then
        warn "No manifest at $manifest — skipping"
        return 0
    fi

    if ! command -v claude >/dev/null 2>&1; then
        warn "claude CLI not on PATH — npm i -g @anthropic-ai/claude-code first"
        return 0
    fi

    local count=0
    while IFS= read -r line; do
        [[ -z "$line" ]] && continue
        run "claude plugin install $line" claude plugin install "$line" || warn "install $line failed"
        count=$((count + 1))
    done < <(python3 -c "import json,sys; [print(f\"{p['marketplace']}:{p['plugin']}\") for p in json.load(open('$manifest'))]")

    write_stamp 'plugins' "installed=${count}"
}

# ---------------------------------------------------------------------------
# PHASE 6 — MCP SERVICES (systemd unit advisory)
# ---------------------------------------------------------------------------
do_mcp_services() {
    if [[ "$SKIP_SERVICES" -eq 1 ]]; then
        phase 'MCP-SERVICES' "Skipped (--skip-services)"
        return 0
    fi
    phase 'MCP-SERVICES' "systemd / launchd unit advisory"

    case "$(uname -s)" in
        Linux*)
            warn "systemd CogneeMCP unit: see bootstrap/manifest/services.json (TBD)"
            warn "  template path: ${INSTALL_ROOT}/bootstrap/manifest/cognee.service"
            ;;
        Darwin*)
            warn "launchd plist for CogneeMCP not auto-installed on macOS — manual step"
            ;;
        *)
            warn "Unrecognised OS — services phase no-op"
            ;;
    esac

    if [[ "$PROFILE" != "ci" ]]; then
        local compose="${INSTALL_ROOT}/observability/docker-compose.yml"
        if [[ -f "$compose" ]] && command -v docker >/dev/null 2>&1; then
            run "docker compose up -d" docker compose -f "$compose" up -d || warn "compose up failed"
        fi
    fi

    write_stamp 'mcp-services' "profile=${PROFILE}"
}

# ---------------------------------------------------------------------------
# PHASE 7+8 — CODEX + GH auth (interactive)
# ---------------------------------------------------------------------------
do_codex_auth() {
    phase 'CODEX-AUTH' "Interactive codex auth"
    if ! command -v codex >/dev/null 2>&1; then
        warn "codex CLI not on PATH"
        return 0
    fi
    if [[ "$DRY_RUN" -eq 1 ]]; then
        warn "DRY-RUN — would prompt: codex auth"
        return 0
    fi
    info "Press ENTER to launch 'codex auth' (Ctrl-C to skip)."
    read -r _ || true
    codex auth || warn "codex auth aborted"
    write_stamp 'codex-auth' "prompted=true"
}

do_gh_auth() {
    phase 'GH-AUTH' "Interactive gh auth"
    if ! command -v gh >/dev/null 2>&1; then
        warn "gh CLI not on PATH"
        return 0
    fi
    if gh auth status >/dev/null 2>&1; then
        ok "gh already authenticated"
        write_stamp 'gh-auth' "skipped=alreadyauth"
        return 0
    fi
    if [[ "$DRY_RUN" -eq 1 ]]; then
        warn "DRY-RUN — would prompt: gh auth login"
        return 0
    fi
    info "Press ENTER to launch 'gh auth login' (Ctrl-C to skip)."
    read -r _ || true
    gh auth login || warn "gh auth aborted"
    write_stamp 'gh-auth' "prompted=true"
}

# ---------------------------------------------------------------------------
# PHASE 9 — VERIFY (INSTALL-RECORD.json)
# ---------------------------------------------------------------------------
do_verify() {
    phase 'VERIFY' "Writing INSTALL-RECORD.json"

    mkdir -p "$(dirname "$RECORD_FILE")"
    local python_ver claude_ver codex_ver gh_status
    python_ver=$( [[ -x "${VENV_ROOT}/bin/python" ]] && "${VENV_ROOT}/bin/python" --version 2>&1 || echo "FAIL: missing" )
    claude_ver=$( command -v claude >/dev/null && claude --version 2>&1 || echo "FAIL: not on PATH" )
    codex_ver=$( command -v codex >/dev/null && codex --version 2>&1 || echo "WARN: not on PATH" )
    gh_status=$( command -v gh >/dev/null && (gh auth status >/dev/null 2>&1 && echo "OK" || echo "WARN: not authed") || echo "FAIL: gh missing" )

    if [[ "$DRY_RUN" -eq 0 ]]; then
        cat > "$RECORD_FILE" <<EOF
{
  "timestamp":     "$(date -Iseconds)",
  "target_root":   "${TARGET_ROOT}",
  "install_root":  "${INSTALL_ROOT}",
  "state_root":    "${STATE_ROOT}",
  "tools_root":    "${TOOLS_ROOT}",
  "venv_root":     "${VENV_ROOT}",
  "profile":       "${PROFILE}",
  "os":            "$(uname -srm)",
  "probes": {
    "venv_python": "${python_ver}",
    "claude_cli":  "${claude_ver}",
    "codex_cli":   "${codex_ver}",
    "gh_auth":     "${gh_status}"
  }
}
EOF
        ok "INSTALL-RECORD.json -> $RECORD_FILE"
    fi

    echo ""
    echo "==== VERIFY SUMMARY ===="
    printf "  %-14s %s\n" "venv_python" "$python_ver"
    printf "  %-14s %s\n" "claude_cli"  "$claude_ver"
    printf "  %-14s %s\n" "codex_cli"   "$codex_ver"
    printf "  %-14s %s\n" "gh_auth"     "$gh_status"
    echo ""

    write_stamp 'verify' "probes=4"
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
main() {
    mkdir -p "$BOOTSTRAP_DIR" "$STAMP_DIR"
    echo ""
    echo "==== claude-sota-installed bootstrap (bash) ===="
    echo "  TargetRoot   : $TARGET_ROOT"
    echo "  InstallRoot  : $INSTALL_ROOT"
    echo "  StateRoot    : $STATE_ROOT"
    echo "  ToolsRoot    : $TOOLS_ROOT"
    echo "  VenvRoot     : $VENV_ROOT"
    echo "  Profile      : $PROFILE"
    echo "  DryRun       : $DRY_RUN"
    echo "  Force        : $FORCE"
    echo ""

    local phases=(preflight deps venv clone_patch plugins mcp_services codex_auth gh_auth verify)
    for p in "${phases[@]}"; do
        local stamp_name="${p//_/-}"
        if stamp_valid "$stamp_name"; then
            phase "${p^^}" "SKIP — stamp present (use --force)"
            continue
        fi
        if ! "do_${p}"; then
            err "Phase ${p} failed; stamps preserved at $STAMP_DIR"
            exit 1
        fi
    done

    echo ""
    echo "==== BOOTSTRAP COMPLETE ===="
    echo "  Honest-state record: $RECORD_FILE"
    echo "  Next: see $INSTALL_ROOT/ONBOARDING.md §4 (First-PR walkthrough)"
}

main "$@"
