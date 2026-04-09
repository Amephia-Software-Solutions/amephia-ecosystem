#!/usr/bin/env bash
set -euo pipefail

# ──────────────────────────────────────────────
#  AMEPHIA ECOSYSTEM — One-command deploy
#  Usage:  npm run deploy
#          npm run deploy -- "optional commit msg"
# ──────────────────────────────────────────────

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

step() { echo -e "\n${GREEN}▸ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠ $1${NC}"; }
fail() { echo -e "${RED}✖ $1${NC}"; exit 1; }

# 1. Ensure we're on main
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
  fail "Not on main branch (current: $BRANCH). Switch first."
fi

# 2. Build
step "Building production bundle..."
rm -rf dist
npm run build || fail "Build failed"

# 3. Stage dist + any other changes
step "Staging changes..."
git add -A

# 4. Check if there's anything to commit
if git diff --cached --quiet; then
  warn "No changes to commit. Pushing any unpushed commits..."
else
  # Commit message
  MSG="${1:-deploy: build $(date '+%Y-%m-%d %H:%M')}"
  step "Committing: $MSG"
  git commit -m "$MSG"
fi

# 5. Push to main
step "Pushing to origin/main..."
git push origin main

# 6. Sync deploy branch (Hostinger monitors this branch)
step "Syncing deploy branch for Hostinger..."
git push origin main:deploy

echo -e "\n${GREEN}✔ Deploy complete!${NC}"
echo -e "  Hostinger detectará los cambios en la rama deploy automáticamente."
echo -e "  Site: https://amephia.com\n"
