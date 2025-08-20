@echo off
setlocal ENABLEDELAYEDEXPANSION

:: =======================
:: gitprod.bat
:: Commit/push no repo DEV, builda e espelha arquivos no repo PROD
:: =======================

:: 1) Mensagem do commit
set "MSG=%~1"
if "%MSG%"=="" (
  echo ⚠️  Uso: gitprod.bat "mensagem do commit"
  pause
  exit /b 1
)

:: 2) Pastas (ajuste se precisar)
::    Este script deve rodar de dentro do repo DEV
set "DEV_DIR=%cd%"
set "PROD_DIR=%cd%\..\bitrix-lib-node-prod"

if not exist "%PROD_DIR%\.git" (
  echo ❌ Nao encontrei um repo Git em "%PROD_DIR%"
  echo Verifique o caminho ou clone o repo de producao nessa pasta.
  pause
  exit /b 1
)

echo.
echo ===========================
echo 🔧 Commitando no DEV...
echo ===========================
pushd "%DEV_DIR%"
git add .
git commit -m "%MSG%"
if ERRORLEVEL 1 (
  echo (Sem alterações para commitar no DEV ou erro ao commitar)
)
git push origin main
if ERRORLEVEL 1 (
  echo ❌ Erro ao fazer push no DEV.
  goto :error
)

echo.
echo ===========================
echo 🏗️  Build do projeto...
echo ===========================
call npm i
if ERRORLEVEL 1 goto :error

call npm run build
if ERRORLEVEL 1 goto :error

echo.
echo =========================================
echo 📥 Atualizando repo PROD (git pull)...
echo =========================================
pushd "%PROD_DIR%"
git pull origin main
if ERRORLEVEL 1 (
  echo ⚠️  Nao foi possivel dar pull no PROD (prosseguindo mesmo assim)
)
popd

echo.
echo =========================================
echo 🚚 Sincronizando DEV -> PROD (robocopy)...
echo =========================================
:: Espelha DEV em PROD, mas ignora o que nao deve ir
:: /MIR = mirror (inclui deletar no destino o que saiu da origem)
:: /XD  = exclude directories
:: /XF  = exclude files
robocopy "%DEV_DIR%" "%PROD_DIR%" /MIR ^
  /XD .git src node_modules docs ^
  /XF .gitignore gitprod.sh gitprod.bat

set "RC=%ERRORLEVEL%"
:: Robocopy: 0-7 = sucesso/avisos; 8+ = erro
if %RC% GEQ 8 (
  echo ❌ Robocopy retornou erro (%RC%).
  goto :error
)

echo.
echo ===========================
echo 📦 Commitando no PROD...
echo ===========================
pushd "%PROD_DIR%"
git add .
git commit -m "Build: %MSG%"
if ERRORLEVEL 1 (
  echo (Sem alterações para commitar no PROD ou erro ao commitar)
)
git push origin main
if ERRORLEVEL 1 (
  echo ❌ Erro ao fazer push no PROD.
  goto :error
)
popd

echo.
echo ✅ Sincronizacao concluida com sucesso!
pause
exit /b 0

:error
echo.
echo ❌ Ocorreu um erro no processo.
echo (Veja as mensagens acima para detalhes.)
pause
exit /b 1
