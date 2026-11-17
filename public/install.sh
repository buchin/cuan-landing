#!/usr/bin/env bash
# ==============================================================================
# Cuan Installation & Deployment Wrapper
# S1 DoD: Fresh install following docs, preflight checks, non-destructive,
#         smart proxy detection, actionable errors, and readiness verification.
# ==============================================================================
set -euo pipefail

# Support both direct script execution and remote curl | bash piping
if [[ -n "${BASH_SOURCE[0]:-}" ]] && [[ -f "${BASH_SOURCE[0]}" ]]; then
  ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
else
  ROOT_DIR="${CUAN_INSTALL_DIR:-/opt/cuan}"
  mkdir -p "$ROOT_DIR"
  if [[ ! -f "$ROOT_DIR/docker-compose.yml" && ! -f "$ROOT_DIR/bin/cuan-server" ]]; then
    echo "==> Fresh remote installation detected. Bootstrapping Cuan into ${ROOT_DIR}..."
    if command -v git >/dev/null 2>&1; then
      git clone --depth 1 https://github.com/buchin/cuan.git "$ROOT_DIR"
    elif command -v curl >/dev/null 2>&1; then
      curl -fsSL https://github.com/buchin/cuan/archive/refs/heads/main.tar.gz | tar -xz --strip-components=1 -C "$ROOT_DIR"
    fi
  fi
fi
cd "$ROOT_DIR"

# Defaults
MODE="auto"
TARGET_ENV="production"
DRY_RUN=false
SKIP_PREFLIGHT=false
DOMAIN=""
EMAIL=""
PORT=""

show_help() {
  cat << 'EOF'
Cuan Installation & Deployment Tool

Usage:
  ./scripts/install.sh [options]

Options:
  --standalone          Deploy with automated Caddy reverse proxy (ports 80/443)
  --existing-proxy      Deploy behind existing host reverse proxy (Nginx/Traefik/Cloudflare)
  --staging             Install staging environment (docker-compose.staging.yml)
  --domain <DOMAIN>     Set application domain (e.g., cuan.example.com)
  --email <EMAIL>       Set ACME email for Let's Encrypt certificates
  --port <PORT>         Custom HTTP port (default: 8080 for prod, 8081 for staging)
  --dry-run             Run preflight checks and print plan without making changes
  --skip-preflight      Skip hardware and port preflight checks
  --help, -h            Show this help message

Examples:
  # Standard fresh install (auto-detects environment):
  ./scripts/install.sh --domain cuan.example.com --email admin@example.com

  # Install behind existing Nginx reverse proxy:
  ./scripts/install.sh --existing-proxy

  # Install staging instance:
  ./scripts/install.sh --staging --domain staging.cuan.example.com

  # Inspect preflight checks without changes:
  ./scripts/install.sh --dry-run
EOF
}

# Parse CLI arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --standalone) MODE="standalone"; shift ;;
    --existing-proxy) MODE="existing-proxy"; shift ;;
    --staging) TARGET_ENV="staging"; shift ;;
    --domain) [[ $# -ge 2 && -n "$2" && "$2" != --* ]] || { echo "Missing value for --domain" >&2; exit 1; }; DOMAIN="$2"; shift 2 ;;
    --email) [[ $# -ge 2 && -n "$2" && "$2" != --* ]] || { echo "Missing value for --email" >&2; exit 1; }; EMAIL="$2"; shift 2 ;;
    --port) [[ $# -ge 2 && -n "$2" && "$2" != --* ]] || { echo "Missing value for --port" >&2; exit 1; }; PORT="$2"; shift 2 ;;
    --dry-run) DRY_RUN=true; shift ;;
    --skip-preflight) SKIP_PREFLIGHT=true; shift ;;
    --help|-h) show_help; exit 0 ;;
    *) echo "Unknown option: $1"; show_help; exit 1 ;;
  esac
done

echo "================================================================================"
echo " Cuan Installation Wizard — Target Environment: ${TARGET_ENV}"
echo "================================================================================"

COMPOSE_FILE="docker-compose.yml"
ENV_FILE=".env"
DEFAULT_PORT="8080"

if [[ "$TARGET_ENV" == "staging" ]]; then
  COMPOSE_FILE="docker-compose.staging.yml"
  ENV_FILE=".env.staging"
  DEFAULT_PORT="8081"
fi

APP_PORT="${PORT:-$DEFAULT_PORT}"
if [[ ! "$APP_PORT" =~ ^[0-9]+$ ]] || (( 10#$APP_PORT < 1 || 10#$APP_PORT > 65535 )); then
  echo "Invalid --port: expected an integer from 1 to 65535." >&2
  exit 1
fi
# Skipping detection requires a predictable proxy mode.
if [[ "$SKIP_PREFLIGHT" == "true" && "$MODE" == "auto" ]]; then MODE="existing-proxy"; fi
for value in "$DOMAIN" "$EMAIL"; do
  if [[ "$value" == *[$'\n\r&|/']* ]]; then
    echo "Invalid domain or email value." >&2
    exit 1
  fi
done

# ------------------------------------------------------------------------------
# 1. PREFLIGHT CHECKS
# ------------------------------------------------------------------------------
run_preflight() {
  echo "==> Running system preflight checks..."
  local preflight_passed=true

  # 1.1 OS & Architecture
  local os_type
  os_type="$(uname -s)"
  local arch_type
  arch_type="$(uname -m)"
  echo "    [OK] Operating System: ${os_type} (${arch_type})"

  # 1.2 Disk space check (require at least 2GB free)
  if command -v df >/dev/null 2>&1; then
    local free_kb
    free_kb="$(df -k "$ROOT_DIR" | awk 'NR==2 {print $4}')"
    local free_mb=$((free_kb / 1024))
    if [[ $free_mb -lt 2048 ]]; then
      echo "    [WARN] Low disk space: ${free_mb}MB available. Recommended: >= 2048MB."
    else
      echo "    [OK] Disk space: ${free_mb}MB available."
    fi
  fi

  # 1.3 Memory check
  if [[ -f /proc/meminfo ]]; then
    local mem_kb
    mem_kb="$(awk '/MemAvailable/ {print $2}' /proc/meminfo || true)"
    if [[ -n "$mem_kb" ]]; then
      local mem_mb=$((mem_kb / 1024))
      if [[ $mem_mb -lt 1024 ]]; then
        echo "    [WARN] Low available memory: ${mem_mb}MB. Recommended: >= 2048MB."
      else
        echo "    [OK] Available memory: ${mem_mb}MB."
      fi
    fi
  fi

  # 1.4 Docker and Compose Tooling
  local has_docker=false
  local has_compose=false
  if command -v docker >/dev/null 2>&1; then
    has_docker=true
    echo "    [OK] Docker CLI found: $(docker --version)"
    if docker compose version >/dev/null 2>&1; then
      has_compose=true
      COMPOSE_CMD="docker compose"
      echo "    [OK] Docker Compose plugin found: $(docker compose version)"
    elif command -v docker-compose >/dev/null 2>&1; then
      has_compose=true
      COMPOSE_CMD="docker-compose"
      echo "    [OK] Legacy docker-compose found: $(docker-compose --version)"
    fi
  fi

  if [[ "$has_docker" != "true" || "$has_compose" != "true" ]]; then
    echo "    [INFO] Docker Compose is unavailable. An actual installation requires Docker Engine and Compose."
  fi

  # 1.5 Port conflict & proxy detection
  local port_80_busy=false
  local port_443_busy=false
  local port_app_busy=false

  if command -v ss >/dev/null 2>&1; then
    ss -tlpn | grep -q ':80 ' && port_80_busy=true || true
    ss -tlpn | grep -q ':443 ' && port_443_busy=true || true
    ss -tlpn | grep -q ":${APP_PORT} " && port_app_busy=true || true
  elif command -v netstat >/dev/null 2>&1; then
    netstat -tlpn 2>/dev/null | grep -q ':80 ' && port_80_busy=true || true
    netstat -tlpn 2>/dev/null | grep -q ':443 ' && port_443_busy=true || true
    netstat -tlpn 2>/dev/null | grep -q ":${APP_PORT} " && port_app_busy=true || true
  fi

  if [[ "$MODE" == "auto" ]]; then
    if [[ "$port_80_busy" == "true" || "$port_443_busy" == "true" ]]; then
      echo "    [DETECTED] Port 80/443 is already in use by host services."
      echo "               Auto-selecting Mode B: Behind existing reverse proxy."
      MODE="existing-proxy"
    else
      echo "    [DETECTED] Ports 80 & 443 are free. Selecting Mode A: Standalone Caddy proxy."
      MODE="standalone"
    fi
  fi

  if [[ "$MODE" == "standalone" && ("$port_80_busy" == "true" || "$port_443_busy" == "true") ]]; then
    echo "    [ERROR] Standalone Caddy mode requested but port 80 or 443 is already in use!"
    echo "            Tip: Free port 80/443 or use --existing-proxy to integrate with host Nginx/Traefik."
    preflight_passed=false
  fi

  if [[ "$port_app_busy" == "true" ]]; then
    echo "    [WARN] App port ${APP_PORT} is currently active. If this is an update, it will be restarted."
  else
    echo "    [OK] App port ${APP_PORT} is available."
  fi

  if [[ "$preflight_passed" != "true" ]]; then
    echo "==> Preflight checks failed with actionable errors. Aborting."
    exit 1
  fi
  echo "==> All preflight checks passed successfully."
}

if [[ "$SKIP_PREFLIGHT" != "true" ]]; then
  run_preflight
fi

# ------------------------------------------------------------------------------
# 2. CONFIGURATION & ENVIRONMENT SETUP
# ------------------------------------------------------------------------------
generate_secret() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -hex 24
  else
    od -An -N24 -tx1 /dev/urandom | tr -d ' \n'
  fi
}

setup_environment() {
  echo "==> Configuring environment (${ENV_FILE})..."
  if [[ -f "$ENV_FILE" ]]; then
    echo "    [INFO] Existing ${ENV_FILE} found. Retaining existing configuration and secrets."
  else
    echo "    [INIT] Creating new ${ENV_FILE} from template..."
    # Generate secrets before writing any configuration.
    # Generate secure random secrets
    local db_secret
    db_secret="$(generate_secret)"
    local auth_secret
    auth_secret="$(generate_secret)"
    (umask 077; cp .env.example "$ENV_FILE")

    sed -i "s/replace_with_strong_password_min_16_chars/${db_secret}/g" "$ENV_FILE"
    sed -i "s/replace_with_random_32_character_auth_secret_key/${auth_secret}/g" "$ENV_FILE"
    
    if [[ "$TARGET_ENV" == "staging" ]]; then
      sed -i "s/CUAN_ENV=production/CUAN_ENV=staging/g" "$ENV_FILE"
      sed -i "s/POSTGRES_DB=cuan/POSTGRES_DB=cuan_staging/g" "$ENV_FILE"
      sed -i "s/POSTGRES_USER=cuan/POSTGRES_USER=cuan_staging/g" "$ENV_FILE"
      sed -i "s/PORT=8080/PORT=8081/g" "$ENV_FILE"
    fi
  fi

  chmod 600 "$ENV_FILE"

  if [[ -n "$DOMAIN" ]]; then
    local domain_key=CUAN_DOMAIN
    if [[ "$TARGET_ENV" == "staging" ]]; then domain_key=CUAN_STAGING_DOMAIN; fi
    if ! grep -q "^${domain_key}=" "$ENV_FILE"; then echo "${domain_key}=" >> "$ENV_FILE"; fi
    sed -i "s|^${domain_key}=.*|${domain_key}=${DOMAIN}|" "$ENV_FILE"
    echo "    [CONFIG] CUAN_DOMAIN set to: ${DOMAIN}"
  fi

  if [[ -n "$EMAIL" ]]; then
    sed -i "s/^ACME_EMAIL=.*/ACME_EMAIL=${EMAIL}/" "$ENV_FILE"
    echo "    [CONFIG] ACME_EMAIL set to: ${EMAIL}"
  fi

  if [[ -n "$PORT" ]]; then
    sed -i "s/^PORT=.*/PORT=${PORT}/" "$ENV_FILE"
    echo "    [CONFIG] PORT set to: ${PORT}"
  fi
}


# ------------------------------------------------------------------------------
# 3. DRY RUN / PLAN OUTPUT
# ------------------------------------------------------------------------------
if [[ "$DRY_RUN" == "true" ]]; then
  echo ""
  echo "--------------------------------------------------------------------------------"
  echo " DRY-RUN EXECUTION PLAN (No changes made)"
  echo "--------------------------------------------------------------------------------"
  echo " Environment:         ${TARGET_ENV}"
  echo " Compose file:        ${COMPOSE_FILE}"
  echo " Env file:            ${ENV_FILE}"
  echo " Deployment Mode:     ${MODE}"
  echo " Application Port:    ${APP_PORT}"
  if [[ "$MODE" == "standalone" ]]; then
    echo " Reverse Proxy:       Caddy (Automated TLS via Ports 80 & 443)"
  else
    echo " Reverse Proxy:       External (Host Nginx/Traefik forwarding to 127.0.0.1:${APP_PORT})"
  fi
  echo " Health Probe:        http://127.0.0.1:${APP_PORT}/healthz"
  echo " Readiness Probe:     http://127.0.0.1:${APP_PORT}/readyz"
  echo " AI execution:        Not included in the stock Docker image; native Linux is the verified AI path."
  echo "--------------------------------------------------------------------------------"
  echo "Dry-run verification completed successfully."
  exit 0
fi

# ------------------------------------------------------------------------------
# 4. DEPLOYMENT EXECUTION
# ------------------------------------------------------------------------------
echo "==> Deploying Cuan services (${TARGET_ENV} mode)..."

PROFILE_FLAG=""
if [[ "$MODE" == "standalone" ]]; then
  PROFILE_FLAG="--profile proxy"
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "[ERROR] Docker Engine is required for this installer. See docs/guides/onboarding.md for native setup." >&2
  exit 1
fi
if ! docker info >/dev/null 2>&1; then
  echo "[ERROR] Docker Engine is not reachable. Start the daemon and check permissions, then retry." >&2
  exit 1
fi
if docker compose version >/dev/null 2>&1; then
  COMPOSE_CMD="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE_CMD="docker-compose"
else
  echo "[ERROR] Docker Compose is required. Install the Compose plugin, then retry." >&2
  exit 1
fi
setup_environment
if grep -Eq '^(POSTGRES_PASSWORD|CUAN_AUTH_SECRET)=.*(replace_with_|change_me|default_)' "$ENV_FILE"; then
  echo "[ERROR] Replace placeholder database and authentication secrets in ${ENV_FILE}, then retry." >&2
  exit 1
fi
echo "==> Starting application and database with ${COMPOSE_CMD}..."
${COMPOSE_CMD} -f "$COMPOSE_FILE" --env-file "$ENV_FILE" ${PROFILE_FLAG} up -d --build

# ------------------------------------------------------------------------------
# 5. POST-INSTALL READINESS VERIFICATION
# ------------------------------------------------------------------------------
echo "==> Waiting for application health and database readiness..."
ready=false
for attempt in {1..30}; do
  if ${COMPOSE_CMD} -f "$COMPOSE_FILE" --env-file "$ENV_FILE" exec -T app /app/cuan-server --healthcheck >/dev/null 2>&1 &&
     ${COMPOSE_CMD} -f "$COMPOSE_FILE" --env-file "$ENV_FILE" exec -T app /app/cuan-server --readycheck >/dev/null 2>&1; then
    ready=true
    break
  fi
  sleep 1
done
if [[ "$ready" != "true" ]]; then
  echo "[ERROR] Application readiness was not confirmed. Configuration and data are retained." >&2
  echo "Inspect: ${COMPOSE_CMD} -f ${COMPOSE_FILE} --env-file ${ENV_FILE} logs app db" >&2
  exit 1
fi
echo "    [OK] Application health and database readiness confirmed."
echo "    [NEXT] Open Cuan and create your owner account."
echo "    [AI] The stock Docker image does not yet provide supported AI execution."
echo "         For the verified native AI setup, follow docs/guides/onboarding.md."
echo "         Web/database health does not verify an AI account or completed work."

echo ""
echo "================================================================================"
echo " Cuan ${TARGET_ENV} web application installation completed successfully!"
echo " Deployment Mode: ${MODE}"
echo " App Port:        ${APP_PORT}"
echo " Health Checks:   /healthz (liveness), /readyz (readiness)"
echo " Docs Reference:  docs/guides/deployment_recovery_guide.md"
echo "================================================================================"
