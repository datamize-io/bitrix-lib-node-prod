#!/bin/bash
set -e

MSG="$1"
if [ -z "$MSG" ]; then
  echo "⚠️  Use: ./gitprod.sh \"mensagem do commit\""
  exit 1
fi

# Caminho da pasta do repo-prod
PROD_DIR="../bitrix-lib-node-prod"

echo "🔧 Commitando alterações no bitrix-lib-node-prod..."
git add .
git commit -m "$MSG"
git push origin main

echo "📥 Atualizando bitrix-lib-node-prod..."
cd "$PROD_DIR"
git pull origin main || true

echo "🏗️  Copiando build para bitrix-lib-node-prod..."
cd ../bitrix-lib-node-prod
npm ci
npm run build

robocopy . ..\bitrix-lib-node-prod /MIR /XD .git src

echo "📦 Commitando no bitrix-lib-node-prod..."
cd "$PROD_DIR"
git add .
git commit -m "Build: $MSG"
git push origin main

echo "✅ Sincronização concluída!"
pause