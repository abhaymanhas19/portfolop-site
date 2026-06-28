#!/usr/bin/env bash
set -euo pipefail

SECRET_NAME="${SECRET_NAME:-mysitesecret-env}"
GCLOUD="$(command -v gcloud || echo /usr/bin/gcloud)"

# Fetch secrets and export them properly
# This handles env-style files safely without breaking on unquoted strings
set -a
eval "$("$GCLOUD" secrets versions access latest --secret="$SECRET_NAME")"
set +a

# Execute the command passed to this script (Alembic or Uvicorn)
exec "$@"