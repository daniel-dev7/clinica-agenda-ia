# Script para Deploy Automático do GitHub
# Execute este script após fazer modifications para atualizar automaticamente

param(
    [string]$commitMessage = "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

# Cores para output
function Write-Step { param($msg) Write-Host "[ETAPA] $msg" -ForegroundColor Cyan }
function Write-Success { param($msg) Write-Host "[✓] $msg" -ForegroundColor Green }
function Write-Error { param($msg) Write-Host "[✗] $msg" -ForegroundColor Red }

$ErrorActionPreference = "Stop"

Write-Host "═══════════════════════════════════════════" -ForegroundColor Magenta
Write-Host "  Clínica Agenda IA - Deploy Automático" -ForegroundColor Magenta
Write-Host "═══════════════════════════════════════════" -ForegroundColor Magenta
Write-Host ""

try {
    Write-Step "Verificando Git..."
    git status | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Git não encontrado ou repositório não inicializado"
        Write-Host "Execute: git init"
        exit 1
    }
    Write-Success "Git OK"

    Write-Step "Verificando remote..."
    $remote = git remote get-url origin 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Remote 'origin' não configurado"
        Write-Host "Execute: git remote add origin https://github.com/daniel-dev7/clinica-agenda-ia.git"
        exit 1
    }
    Write-Success "Remote: $remote"

    Write-Step "Adicionando arquivos..."
    git add .
    $status = git status --porcelain
    if (-not $status) {
        Write-Host "[i] Nenhuma modificação para commitar" -ForegroundColor Yellow
        exit 0
    }
    Write-Success "Arquivos adicionados"

    Write-Step "Commitando..."
    git commit -m $commitMessage
    Write-Success "Commit: $commitMessage"

    Write-Step "Enviando para GitHub..."
    git push origin main
    Write-Success "Push realizado com sucesso!"

    Write-Host ""
    Write-Host "═══════════════════════════════════════════" -ForegroundColor Green
    Write-Host "  Deploy Automático Concluído!" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════" -ForegroundColor Green

} catch {
    Write-Error "Erro: $_"
    exit 1
}
