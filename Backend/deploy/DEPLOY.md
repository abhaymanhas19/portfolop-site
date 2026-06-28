# Production deployment (VM + systemd + Nginx + HTTPS)

Runs the FastAPI backend directly on a Linux VM (Ubuntu/Debian assumed) using
`uv`, supervised by `systemd`, behind Nginx with a Let's Encrypt certificate.
The database is **external/managed**. **No `.env` lives on the VM** — secrets
are stored in **GCP Secret Manager** and pulled into the process at start by
`deploy/run-with-secrets.sh`, authenticated by the VM's attached service account.

Paths assume the VM user `abhayramgarhia19` with the repo cloned at
`/home/abhayramgarhia19/portfolop-site`, so the app lives in
`/home/abhayramgarhia19/portfolop-site/Backend`. `uv` is already installed at
`/home/abhayramgarhia19/.local/bin/uv`. `gcloud` is preinstalled on GCP VMs.

---

## 1. Get the code onto the VM + install deps

```bash
cd ~
git clone <your-repo-url> portfolop-site
cd ~/portfolop-site/Backend

# Install dependencies (creates the .venv from uv.lock)
uv sync --frozen

# Make the secrets wrapper executable
chmod +x deploy/run-with-secrets.sh
```

## 2. Put secrets in GCP Secret Manager (run once, from your laptop or the VM)

The app reads config from environment variables. Store all of them as **one
secret** whose payload is `KEY=VALUE` lines (same format as a `.env` file).

```bash
# Enable the API (once per project)
gcloud services enable secretmanager.googleapis.com

# Create the secret from a local file of KEY=VALUE lines.
# Build that file from .env.example, fill in real values, create the secret,
# then DELETE the local file — it should never live on the VM.
cp .env.example /tmp/portfolio.env
nano /tmp/portfolio.env          # fill in DATABASE_URL, SESSION_SECRET, etc.
gcloud secrets create portfolio-backend-env --data-file=/tmp/portfolio.env
shred -u /tmp/portfolio.env      # or: rm -f /tmp/portfolio.env

# To update secrets later, add a new version (the app reads "latest"):
#   gcloud secrets versions add portfolio-backend-env --data-file=/tmp/portfolio.env
```

Required values in the secret:

- `DATABASE_URL` — managed Postgres connection string
- `SESSION_SECRET` — long random string (`openssl rand -hex 32`)
- `ADMIN_USER` / `ADMIN_PASSWORD` — admin panel login
- Cloudflare R2 / Stream + Mail vars as used by your features

## 3. Let the VM read the secret (identity-based, no key file)

Find the VM's service account, then grant it read access to just this secret:

```bash
# The service account the VM runs as:
gcloud compute instances describe <VM_NAME> --zone <ZONE> \
  --format='value(serviceAccounts.email)'

# Grant read-only access to that one secret:
gcloud secrets add-iam-policy-binding portfolio-backend-env \
  --member="serviceAccount:<VM_SERVICE_ACCOUNT_EMAIL>" \
  --role="roles/secretmanager.secretAccessor"
```

> The VM must have been created with the `cloud-platform` scope (or at least
> Secret Manager scope). New GCP VMs default to a scope that allows this; if
> access is denied, set the SA + `cloud-platform` scope on the instance.

Verify from the VM:

```bash
gcloud secrets versions access latest --secret=portfolio-backend-env | head
```

## 4. Install the systemd service

```bash
sudo cp ~/portfolop-site/Backend/deploy/portfolio-backend.service \
        /etc/systemd/system/portfolio-backend.service
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio-backend

# Verify it's up (binds to 127.0.0.1:8000, runs migrations on start)
sudo systemctl status portfolio-backend
curl -s http://127.0.0.1:8000/docs >/dev/null && echo "app up"
```

## 5. Install Nginx + HTTPS

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx

# Point your domain's A/AAAA record at the VM first, then:
sudo cp ~/portfolop-site/Backend/deploy/nginx.conf \
        /etc/nginx/sites-available/portfolio-backend
sudo ln -s /etc/nginx/sites-available/portfolio-backend \
           /etc/nginx/sites-enabled/portfolio-backend
sudo rm -f /etc/nginx/sites-enabled/default

# Edit api.example.com -> your real domain in the config
sudo nano /etc/nginx/sites-available/portfolio-backend

# Issue the TLS cert (auto-fills ssl_certificate lines + sets up renewal)
sudo certbot --nginx -d api.example.com

sudo nginx -t && sudo systemctl reload nginx
```

The site is now live at `https://api.example.com`. Certbot auto-renews via its
systemd timer.

---

## Updating to a new release

```bash
cd ~/portfolop-site
git pull
cd Backend
uv sync --frozen
sudo systemctl restart portfolio-backend   # runs `alembic upgrade head` on start
```

## Operations

```bash
sudo systemctl restart portfolio-backend     # restart
sudo systemctl stop portfolio-backend        # stop
journalctl -u portfolio-backend -f           # live logs
journalctl -u portfolio-backend --since "10 min ago"
```

## Notes

- The app binds to `127.0.0.1:8000` (not public) — only Nginx reaches it.
- Open ports `80` and `443` in the VM/cloud firewall; keep `8000` closed.
- Update `CORS allow_origins` in `app/main.py` to your frontend domain before
  going live (it is currently `["*"]`).
- Do **not** run `alembic revision --autogenerate` in production — only
  `upgrade head`, which the service does automatically on start.
- Secrets are read **at service start**. After
  `gcloud secrets versions add ...`, run `sudo systemctl restart
  portfolio-backend` for the new values to take effect.
- No secret material is written to disk on the VM — `run-with-secrets.sh` loads
  it into memory only. Keep the secret's IAM binding limited to the VM's
  service account.
