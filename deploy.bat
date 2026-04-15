@echo off
REM Clínica Agenda IA - Deploy Automático
REM Execute este script após fazer modificações para atualizar automaticamente

echo ===========================================
echo   Clínica Agenda IA - Deploy Automático
echo ===========================================
echo.

REM Verificar Git
git status >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Git não encontrado ou repositório não inicializado
    echo Execute: git init
    pause
    exit /b 1
)
echo [OK] Git encontrado

REM Verificar remote
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Remote 'origin' não configurado
    echo Execute: git remote add origin https://github.com/daniel-dev7/clinica-agenda-ia.git
    pause
    exit /b 1
)
echo [OK] Remote configurado

REM Adicionar arquivos
git add .
git status --porcelain | findstr /r "." >nul
if errorlevel 1 (
    echo [INFO] Nenhuma modificação para commitar
    pause
    exit /b 0
)
echo [OK] Arquivos adicionados

REM Commit
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do set datestr=%%c-%%a-%%b
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set timestr=%%a:%%b
set commitMsg=Update: %datestr% %timestr%

git commit -m "%commitMsg%"
if errorlevel 1 (
    echo [ERRO] Falha no commit
    pause
    exit /b 1
)
echo [OK] Commit: %commitMsg%

REM Push
echo [ENVIANDO] Push para GitHub...
git push origin main
if errorlevel 1 (
    echo [ERRO] Falha no push
    pause
    exit /b 1
)

echo.
echo ===========================================
echo   Deploy Automático Concluído!
echo ===========================================
pause
