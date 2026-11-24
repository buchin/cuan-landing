#!/usr/bin/env bash
set -euo pipefail

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$repo_root"

echo "==> Building Cuan Landing Page..."
npm run build

if [[ -n "${CLOUDFLARE_API_TOKEN:-}" && -n "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
  echo "==> Cloudflare Pages credentials detected."
  branch="${CUAN_BRANCH:-${CUAN_DEPLOY_BRANCH:-main}}"
  commit="${CUAN_COMMIT_SHA:-$(git rev-parse HEAD)}"

  echo "==> Deploying to Cloudflare Pages (project: cuan-landing, branch: $branch, commit: $commit)..."
  ./node_modules/.bin/wrangler pages deploy dist \
    --project-name cuan-landing \
    --branch "$branch" \
    --commit-hash "$commit" \
    --commit-dirty=true
  echo "==> Cloudflare Pages deployment completed successfully."
else
  echo "==> No Cloudflare Pages credentials detected. Skipping remote upload."
fi
