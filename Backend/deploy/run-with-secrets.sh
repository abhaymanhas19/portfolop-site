#!/usr/bin/env bash
#
# Loads the app's config from GCP Secret Manager into the environment, then
# execs the given command. systemd uses this for both `alembic` and `uvicorn`.
#
# Auth uses the VM's attached service account (Application Default Credentials
# via the metadata server) — there is NO key file on disk. The secret payload
# is fetched into memory and exported as env vars; nothing is written to disk.
#
# The secret named by SECRET_NAME must contain KEY=VALUE lines (the same format
# as a .env file), e.g.:
#   DATABASE_URL=postgresql://...
#   SESSION_SECRET=...
#
set -euo pipefail

SECRET_NAME="${SECRET_NAME:-portfolio-backend-env}"
GCLOUD="$(command -v gcloud || echo /usr/bin/gcloud)"

# Fetch the latest secret version and export every variable into the process
# environment. `set -a` auto-exports everything that `source` defines.
set -a
# shellcheck disable=SC1090
source <("$GCLOUD" secrets versions access latest --secret="$SECRET_NAME")
set +a

# Replace this process with the real command (uvicorn/alembic), which now
# inherits all the secrets as environment variables.
exec "$@"
