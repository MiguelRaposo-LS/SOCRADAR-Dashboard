<#
Instala o Mapa de ataques, que vive na pasta mapa\ do Azores Cyber 360: cria
o .venv, o .env (com as credenciais do Cortex copiadas do .env do painel) e
o serviço «MapaAtaques» (NSSM), em 127.0.0.1:8001. Corre no sítio, sem copiar
nada: em C:\AzoresCyber360\mapa. O instalar.cmd do painel já o chama no fim;
sozinho serve para o reinstalar. Pode correr-se outra vez: não mexe num .env
que já exista.

Uso (o instalar.cmd ao lado já faz isto como administrador):
  powershell -ExecutionPolicy Bypass -File mapa\windows\instalar.ps1
#>
param(
    # Vazio = a pasta mapa\ onde este script está.
    [string]$Destino = '',
    # O Azores Cyber 360: as credenciais do Cortex e o nssm.exe vêm de lá.
    # Vazio = a pasta acima de mapa\.
    [string]$Dashboard = ''
)

$ErrorActionPreference = 'Stop'
$Servico = 'MapaAtaques'
$Origem = Split-Path -Parent $PSScriptRoot
if (-not $Destino) { $Destino = $Origem }
if (-not $Dashboard) { $Dashboard = Split-Path -Parent $Origem }

function Passo($texto) { Write-Host "`n== $texto" -ForegroundColor Cyan }
function Aviso($texto) { Write-Host "   ! $texto" -ForegroundColor Yellow }

# O PowerShell 5.1 não pára num código de saída diferente de 0 de um
# programa externo: sem isto, um pip falhado seguia em silêncio.
function Correr {
    param([string]$Exe, [string[]]$Argumentos)
    & $Exe @Argumentos
    if ($LASTEXITCODE -ne 0) { throw "Falhou ($LASTEXITCODE): $Exe $($Argumentos -join ' ')" }
}

# UTF-8 sem BOM: com BOM, o python-dotenv lia a primeira variável com o BOM
# colado ao nome.
function Gravar-Texto($caminho, $texto) {
    [IO.File]::WriteAllText($caminho, $texto, (New-Object Text.UTF8Encoding($false)))
}

function Ler-Env($ficheiro, $chave) {
    if (-not (Test-Path $ficheiro)) { return '' }
    foreach ($linha in [IO.File]::ReadAllLines($ficheiro)) {
        if ($linha -match "^\s*$chave\s*=(.*)$") { return $Matches[1].Trim().Trim('"', "'") }
    }
    return ''
}

function Definir-Env($ficheiro, $chave, $valor) {
    $texto = [IO.File]::ReadAllText($ficheiro)
    $padrao = "(?m)^(\s*$chave\s*=).*$"
    if ($texto -match $padrao) {
        $texto = [regex]::Replace($texto, $padrao, { param($m) $m.Groups[1].Value + $valor })
    } else {
        $texto = $texto.TrimEnd() + "`r`n$chave=$valor`r`n"
    }
    Gravar-Texto $ficheiro $texto
}

# --- 0. Administrador ------------------------------------------------------
$admin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
         ).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $admin) { throw 'Corre isto como administrador (o instalar.cmd já o pede).' }

if (Get-Service $Servico -ErrorAction SilentlyContinue) {
    Passo 'Parar o serviço que já existe'
    Stop-Service $Servico -ErrorAction SilentlyContinue
}

# --- 1. Copiar o projeto ---------------------------------------------------
$OrigemReal = (Resolve-Path $Origem).Path.TrimEnd('\')
New-Item -ItemType Directory -Force -Path $Destino | Out-Null
$DestinoReal = (Resolve-Path $Destino).Path.TrimEnd('\')
if ($OrigemReal -ne $DestinoReal) {
    Passo "Copiar o projeto para $Destino"
    & robocopy $OrigemReal $DestinoReal /E /NFL /NDL /NJH /NJS /NP `
        /XD .venv logs __pycache__ .git .pytest_cache node_modules /XF .env | Out-Null
    if ($LASTEXITCODE -ge 8) { throw "A cópia falhou (robocopy $LASTEXITCODE)." }
}
Set-Location $Destino
if (-not (Test-Path (Join-Path $Destino 'frontend\app\dist\index.html'))) {
    throw 'Falta o frontend construído (frontend\app\dist). Vem no git; confirma que a cópia está completa.'
}

# --- 2. Python 3.12 --------------------------------------------------------
Passo 'Python 3.12'
function Encontrar-Python {
    $py = Join-Path $env:SystemRoot 'py.exe'
    # try: no PowerShell 5.1 o stderr redirecionado de um programa externo
    # vira erro e parava o script quando o py.exe não tinha o 3.12.
    if (Test-Path $py) {
        try {
            $exe = & $py -3.12 -c 'import sys; print(sys.executable)' 2>$null
            if ($LASTEXITCODE -eq 0 -and $exe) { return $exe.Trim() }
        } catch { }
    }
    foreach ($p in "$env:ProgramFiles\Python312\python.exe",
                   "$env:LOCALAPPDATA\Programs\Python\Python312\python.exe") {
        if (Test-Path $p) { return $p }
    }
    return $null
}
$python = Encontrar-Python
if (-not $python) { throw 'Falta o Python 3.12: instala primeiro o Azores Cyber 360 (o instalador dele trata disso).' }
Write-Host "   $python"

# --- 3. Ambiente virtual e dependências -----------------------------------
Passo 'Dependências'
$venvPy = Join-Path $Destino '.venv\Scripts\python.exe'
if (Test-Path $venvPy) {
    $ver = ''
    try { $ver = & $venvPy -c 'import sys; print("%d.%d" % sys.version_info[:2])' 2>$null } catch { }
    if ($ver -ne '3.12') { Remove-Item -Recurse -Force (Join-Path $Destino '.venv') }
}
if (-not (Test-Path $venvPy)) { Correr $python @('-m', 'venv', (Join-Path $Destino '.venv')) }
Correr $venvPy @('-m', 'pip', 'install', '-q', '--disable-pip-version-check', '-r', 'requirements.txt')

# --- 4. .env ---------------------------------------------------------------
Passo 'Configuração (.env)'
$envFile = Join-Path $Destino '.env'
if (-not (Test-Path $envFile)) {
    Copy-Item (Join-Path $Destino '.env.example') $envFile
    # A mesma chave do dashboard: copia-se do .env dele, sem a mostrar.
    $envDash = Join-Path $Dashboard '.env'
    $copiadas = 0
    foreach ($k in 'CORTEX_API_URL', 'CORTEX_API_KEY', 'CORTEX_API_KEY_ID', 'CORTEX_AUTH') {
        $v = Ler-Env $envDash $k
        if ($v) { Definir-Env $envFile $k $v; $copiadas++ }
    }
    Write-Host "   Criado; $copiadas credencial(is) copiada(s) de $envDash."
} else {
    Write-Host '   Já existe: não se mexe.'
}

# --- 5. Permissões ---------------------------------------------------------
Passo 'Permissões (.env e logs: só SYSTEM e administradores)'
# SIDs e não nomes: «Administradores»/«Administrators» muda com o idioma.
New-Item -ItemType Directory -Force -Path (Join-Path $Destino 'logs') | Out-Null
Correr icacls @($envFile, '/inheritance:r', '/grant:r', '*S-1-5-18:F', '*S-1-5-32-544:F', '/Q')
Correr icacls @((Join-Path $Destino 'logs'), '/inheritance:r', '/grant:r',
                '*S-1-5-18:(OI)(CI)F', '*S-1-5-32-544:(OI)(CI)F', '/Q')

# --- 6. Serviço ------------------------------------------------------------
Passo 'Serviço Windows (NSSM)'
# O mesmo nssm.exe do painel (o instalador dele descarrega-o).
$nssm = Join-Path $Dashboard 'windows\nssm.exe'
if (-not (Test-Path $nssm)) {
    throw "Falta o $nssm`: instala primeiro o Azores Cyber 360 (windows\instalar.cmd)."
}
$backend = Join-Path $Destino 'backend'
if (-not (Get-Service $Servico -ErrorAction SilentlyContinue)) {
    Correr $nssm @('install', $Servico, $venvPy, 'main.py')
}
$log = Join-Path $Destino 'logs\servico.log'
foreach ($par in @(
        @('Application', $venvPy),
        @('AppParameters', 'main.py'),
        @('AppDirectory', $backend),
        @('DisplayName', 'Azores Cyber 360 - Mapa de ataques'),
        # Com atraso (~2 min depois do Windows): a arrancar logo, o serviço
        # chegava antes da rede e falhava tudo com ConnectionError até à
        # tentativa seguinte (visto no PC da TV a 2026-10-02).
        @('Start', 'SERVICE_DELAYED_AUTO_START'),
        # O Python no Windows escrevia o log em cp1252: «Sem liga  o» no lugar
        # de «Sem ligação» (2026-10-02). Em UTF-8, lê-se bem.
        @('AppEnvironmentExtra', 'PYTHONUTF8=1'),
        @('AppExit', 'Default', 'Restart'),
        @('AppRestartDelay', '5000'),
        @('AppStopMethodConsole', '5000'),
        @('AppStdout', $log),
        @('AppStderr', $log),
        @('AppRotateFiles', '1'),
        @('AppRotateOnline', '1'),
        @('AppRotateBytes', '10485760'))) {
    Correr $nssm (@('set', $Servico) + $par) | Out-Null
}

# --- 7. Credenciais e arranque --------------------------------------------
$faltam = @('CORTEX_API_URL', 'CORTEX_API_KEY', 'CORTEX_API_KEY_ID' | Where-Object { -not (Ler-Env $envFile $_) })
if ($faltam.Count -gt 0) {
    Passo 'Falta pôr as credenciais do Cortex'
    Write-Host '   Vou abrir o .env no Bloco de Notas: preenche, grava e fecha.'
    Start-Process notepad.exe -ArgumentList "`"$envFile`"" -Wait
    $faltam = @('CORTEX_API_URL', 'CORTEX_API_KEY', 'CORTEX_API_KEY_ID' | Where-Object { -not (Ler-Env $envFile $_) })
}
if ($faltam.Count -gt 0) {
    # Sem credenciais o servidor sai logo e o NSSM reiniciava-o de 5 em 5 s.
    Correr $nssm @('set', $Servico, 'Start', 'SERVICE_DEMAND_START') | Out-Null
    Aviso "Ainda faltam: $($faltam -join ', '). O serviço ficou instalado mas parado."
    exit 1
}

Passo 'Arrancar o serviço'
Correr $nssm @('start', $Servico) | Out-Null
$porta = Ler-Env $envFile 'MAPA_PORT'; if (-not $porta) { $porta = '8001' }
$url = "http://127.0.0.1:$porta/"
$ok = $false
for ($i = 0; $i -lt 30 -and -not $ok; $i++) {
    Start-Sleep -Seconds 2
    try { Invoke-WebRequest -UseBasicParsing -TimeoutSec 3 "${url}api/estado" | Out-Null; $ok = $true } catch { }
}
if (-not $ok) { Aviso "O serviço não respondeu em 60 s. Ver $log"; exit 1 }
Write-Host "`nPronto: $url" -ForegroundColor Green
Write-Host '   O primeiro minuto do XSIAM chega em ~30 s; os ataques aparecem com ~5 min de atraso.'
Write-Host '   No Azores Cyber 360, o botão «Mapa de ataques ›» no rodapé abre-o.'
Write-Host "   Log: $log"
