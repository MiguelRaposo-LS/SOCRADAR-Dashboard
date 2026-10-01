<#
Instala o Azores Cyber 360 - SOC RADAR num PC Windows: os passos 2, 3 e 4 do
INSTALACAO.md, num só comando. Pode correr-se outra vez sem estragar nada
(também serve para atualizar): não mexe num .env que já exista nem no estado.

Uso (o instalar.cmd ao lado já faz isto como administrador):
  powershell -ExecutionPolicy Bypass -File windows\instalar.ps1
  powershell -ExecutionPolicy Bypass -File windows\instalar.ps1 -OllamaUrl http://10.0.0.5:11434

O que fica por fazer à mão: as credenciais do Cortex (o script abre o .env no
fim) e o início de sessão automático da TV (Autologon, INSTALACAO.md 4.1).
#>
param(
    # Onde fica instalado. O serviço aponta para aqui.
    [string]$Destino = 'C:\AzoresCyber360',
    # O Ollama corre no Lubuntu, não neste PC: http://<IP do Lubuntu>:11434
    [string]$OllamaUrl = '',
    # Só o servidor: sem atalho de arranque do browser nem definições de energia.
    [switch]$SemEcra,
    # Sem o mapa de ataques (pasta mapa\, serviço MapaAtaques).
    [switch]$SemMapa
)

$ErrorActionPreference = 'Stop'
$Servico = 'AzoresCyber360'
$Origem = Split-Path -Parent $PSScriptRoot

function Passo($texto) { Write-Host "`n== $texto" -ForegroundColor Cyan }
function Aviso($texto) { Write-Host "   ! $texto" -ForegroundColor Yellow }

# O PowerShell 5.1 não para com um código de saída diferente de 0 de um
# programa externo: sem isto, um pip falhado seguia em frente em silêncio.
function Correr {
    param([string]$Exe, [string[]]$Argumentos)
    & $Exe @Argumentos
    if ($LASTEXITCODE -ne 0) { throw "Falhou ($LASTEXITCODE): $Exe $($Argumentos -join ' ')" }
}

# UTF-8 sem BOM: o Set-Content -Encoding UTF8 do PowerShell 5.1 põe BOM, e o
# python-dotenv lia a primeira variável com o BOM colado ao nome.
function Gravar-Texto($caminho, $texto) {
    [IO.File]::WriteAllText($caminho, $texto, (New-Object Text.UTF8Encoding($false)))
}

function Ler-Env($chave) {
    $f = Join-Path $Destino '.env'
    if (-not (Test-Path $f)) { return '' }
    foreach ($linha in [IO.File]::ReadAllLines($f)) {
        if ($linha -match "^\s*$chave\s*=(.*)$") { return $Matches[1].Trim().Trim('"', "'") }
    }
    return ''
}

function Definir-Env($chave, $valor) {
    $f = Join-Path $Destino '.env'
    $texto = [IO.File]::ReadAllText($f)
    $padrao = "(?m)^(\s*$chave\s*=).*$"
    if ($texto -match $padrao) {
        $texto = [regex]::Replace($texto, $padrao, { param($m) $m.Groups[1].Value + $valor })
    } else {
        $texto = $texto.TrimEnd() + "`r`n$chave=$valor`r`n"
    }
    Gravar-Texto $f $texto
}

# --- 0. Administrador ------------------------------------------------------
$admin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
         ).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $admin) { throw 'Corre isto como administrador (o instalar.cmd já o pede).' }

# Uma reinstalação com o serviço a correr falhava no pip: o python.exe do
# .venv está preso pelo processo.
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
    # Fora: o que é desta máquina (.venv, estado, logs) e o .env, que nunca se
    # escreve por cima de um que já exista.
    & robocopy $OrigemReal $DestinoReal /E /NFL /NDL /NJH /NJS /NP `
        /XD .venv estado logs __pycache__ .git .pytest_cache node_modules /XF .env | Out-Null
    if ($LASTEXITCODE -ge 8) { throw "A cópia falhou (robocopy $LASTEXITCODE)." }
    $envOrigem = Join-Path $OrigemReal '.env'
    if ((Test-Path $envOrigem) -and -not (Test-Path (Join-Path $DestinoReal '.env'))) {
        Copy-Item $envOrigem (Join-Path $DestinoReal '.env')
    }
}
Set-Location $Destino

# --- 2. Python 3.12 --------------------------------------------------------
Passo 'Python 3.12'
function Encontrar-Python {
    $py = Join-Path $env:SystemRoot 'py.exe'
    # try: no PowerShell 5.1, com ErrorActionPreference=Stop, o stderr de um
    # programa externo redirecionado vira erro e parava o script quando o
    # py.exe dizia que não tem o 3.12, exatamente o caso que se quer tratar.
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
if (-not $python) {
    if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
        throw 'Falta o Python 3.12 e não há winget: instala-o de python.org (INSTALACAO.md 2.1) e corre isto outra vez.'
    }
    Write-Host '   A instalar com o winget…'
    Correr winget @('install', '-e', '--id', 'Python.Python.3.12', '--scope', 'machine', '--silent',
                    '--accept-package-agreements', '--accept-source-agreements')
    $python = Encontrar-Python
    if (-not $python) { throw 'O Python 3.12 foi instalado mas não o encontro: fecha esta janela e corre outra vez.' }
}
Write-Host "   $python"

# --- 3. Ambiente virtual e dependências -----------------------------------
Passo 'Dependências'
$venvPy = Join-Path $Destino '.venv\Scripts\python.exe'
# Um .venv de outra versão (copiado de outra máquina, ou de um Python antigo)
# arranca mas falha com erros que não dizem porquê: refaz-se.
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
    # Sem palavra-passe o servidor não arranca. Esta serve para quem abrir o
    # dashboard de outro PC; a TV entra sem ela (DASHBOARD_LOCAL_NO_AUTH).
    $bytes = New-Object byte[] 18
    [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    Definir-Env 'DASHBOARD_PASSWORD' ([Convert]::ToBase64String($bytes) -replace '[+/=]', 'x')
    Definir-Env 'HOST' '127.0.0.1'
    Definir-Env 'DASHBOARD_LOCAL_NO_AUTH' '1'
    Write-Host '   Criado a partir do .env.example (palavra-passe gerada: está no .env).'
} else {
    Write-Host '   Já existe: não se mexe.'
}
if ($OllamaUrl) { Definir-Env 'OLLAMA_URL' $OllamaUrl }

# --- 5. Permissões ---------------------------------------------------------
Passo 'Permissões (.env, estado, logs: só SYSTEM e administradores)'
# SIDs e não nomes: «Administradores»/«Administrators» muda com o idioma.
foreach ($d in 'estado', 'logs') { New-Item -ItemType Directory -Force -Path (Join-Path $Destino $d) | Out-Null }
Correr icacls @($envFile, '/inheritance:r', '/grant:r', '*S-1-5-18:F', '*S-1-5-32-544:F', '/Q')
foreach ($d in 'estado', 'logs') {
    Correr icacls @((Join-Path $Destino $d), '/inheritance:r', '/grant:r',
                    '*S-1-5-18:(OI)(CI)F', '*S-1-5-32-544:(OI)(CI)F', '/Q')
}

# --- 6. NSSM e o serviço ---------------------------------------------------
Passo 'Serviço Windows (NSSM)'
$nssm = Join-Path $Destino 'windows\nssm.exe'
if (-not (Test-Path $nssm)) {
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        $zip = Join-Path $env:TEMP 'nssm-2.24.zip'
        Invoke-WebRequest -UseBasicParsing 'https://nssm.cc/release/nssm-2.24.zip' -OutFile $zip
        $tmp = Join-Path $env:TEMP 'nssm-2.24'
        Expand-Archive $zip $tmp -Force
        Copy-Item (Join-Path $tmp 'nssm-2.24\win64\nssm.exe') $nssm
    } catch {
        Aviso "Não consegui descarregar o NSSM ($($_.Exception.Message))."
    }
}
if (-not (Test-Path $nssm)) {
    throw 'Falta o windows\nssm.exe: descarrega-o de https://nssm.cc/download (win64\nssm.exe), põe-no em windows\ e corre isto outra vez.'
}

$python_srv = Join-Path $Destino '.venv\Scripts\python.exe'
if (-not (Get-Service $Servico -ErrorAction SilentlyContinue)) {
    Correr $nssm @('install', $Servico, $python_srv, 'server.py')
}
$log = Join-Path $Destino 'logs\servico.log'
foreach ($par in @(
        @('Application', $python_srv),
        @('AppParameters', 'server.py'),
        @('AppDirectory', $Destino),
        @('DisplayName', 'Azores Cyber 360 - SOC RADAR'),
        @('Start', 'SERVICE_AUTO_START'),
        @('AppExit', 'Default', 'Restart'),
        @('AppRestartDelay', '5000'),
        # Ao parar, o servidor grava o estado (0,7 s medidos); o NSSM por
        # omissão só esperava 1,5 s antes de o matar.
        @('AppStopMethodConsole', '10000'),
        @('AppStdout', $log),
        @('AppStderr', $log),
        @('AppRotateFiles', '1'),
        @('AppRotateOnline', '1'),
        @('AppRotateBytes', '10485760'))) {
    Correr $nssm (@('set', $Servico) + $par) | Out-Null
}

# --- 7. O ecrã -------------------------------------------------------------
if (-not $SemEcra) {
    Passo 'Ecrã: browser no arranque e sem adormecer'
    # Pasta de arranque comum: serve à conta da TV, seja ela qual for.
    $startup = [Environment]::GetFolderPath('CommonStartup')
    $atalho = (New-Object -ComObject WScript.Shell).CreateShortcut((Join-Path $startup 'Azores Cyber 360.lnk'))
    $atalho.TargetPath = Join-Path $Destino 'windows\abrir-dashboard.cmd'
    $atalho.WorkingDirectory = Join-Path $Destino 'windows'
    $atalho.WindowStyle = 7   # minimizada: a janela do script não aparece na TV
    $atalho.Save()
    foreach ($t in 'monitor-timeout-ac', 'standby-timeout-ac', 'hibernate-timeout-ac') {
        Correr powercfg @('/change', $t, '0')
    }
}

# --- 8. Credenciais e arranque --------------------------------------------
$credenciais = 'CORTEX_API_URL', 'CORTEX_API_KEY', 'CORTEX_API_KEY_ID'
$faltam = @($credenciais | Where-Object { -not (Ler-Env $_) })
if ($faltam.Count -gt 0) {
    Passo 'Falta pôr as credenciais do Cortex'
    Write-Host "   Em falta: $($faltam -join ', ')"
    Write-Host '   Vou abrir o .env no Bloco de Notas: preenche, grava e fecha.'
    # Este processo é de administrador, por isso o Bloco de Notas também: o .env
    # só é legível por administradores e um Bloco de Notas normal não o abria.
    Start-Process notepad.exe -ArgumentList "`"$envFile`"" -Wait
    $faltam = @($credenciais | Where-Object { -not (Ler-Env $_) })
}
# O briefing precisa do Ollama (neste PC ou no Lubuntu) com o modelo. Sem
# ele o dashboard funciona, mas o briefing fica «por regras»: confirma-se já,
# em vez de se descobrir na TV.
$ollama = (Ler-Env 'OLLAMA_URL'); if (-not $ollama) { $ollama = 'http://localhost:11434' }
$modelo = (Ler-Env 'OLLAMA_MODEL'); if (-not $modelo) { $modelo = 'llama3.2:3b' }
try {
    $tags = Invoke-RestMethod -TimeoutSec 5 "$($ollama.TrimEnd('/'))/api/tags"
    if (@($tags.models | Where-Object { $_.name -eq $modelo -or $_.model -eq $modelo }).Count -eq 0) {
        Aviso "O Ollama em $ollama responde, mas não tem o modelo $modelo. Correr: ollama pull $modelo"
    } else {
        Write-Host "   Ollama em $ollama com o modelo $modelo."
    }
} catch {
    Aviso "O Ollama não responde em $ollama (OLLAMA_URL no .env). O briefing fica «por regras» até responder."
}
if ($faltam.Count -gt 0) {
    # Sem credenciais o servidor sai logo e o NSSM reiniciava-o de 5 em 5 s.
    Correr $nssm @('set', $Servico, 'Start', 'SERVICE_DEMAND_START') | Out-Null
    Aviso "Ainda faltam: $($faltam -join ', '). O serviço ficou instalado mas parado."
    Aviso 'Preenche o .env (Bloco de Notas como administrador) e corre o instalar.cmd outra vez.'
    exit 1
}

Passo 'Arrancar o serviço'
Start-Service $Servico
$porta = Ler-Env 'PORT'; if (-not $porta) { $porta = '8360' }
$url = "http://127.0.0.1:$porta/"
$ok = $false
for ($i = 0; $i -lt 30 -and -not $ok; $i++) {
    Start-Sleep -Seconds 2
    try { Invoke-WebRequest -UseBasicParsing -TimeoutSec 3 "${url}api/ping" | Out-Null; $ok = $true }
    catch { if ($_.Exception.Response) { $ok = $true } }   # 401 também é «de pé»
}
if (-not $ok) {
    Aviso "O serviço não respondeu em 60 s. Ver $log"
    exit 1
}
Write-Host "`nPronto: $url" -ForegroundColor Green
Write-Host '   A recolha inicial demora ~6 min; o estado da API tem de chegar a verde.'
Write-Host "   Log: $log"
if (-not $SemEcra) {
    Write-Host '   Falta à mão: início de sessão automático da TV (Autologon, INSTALACAO.md 4.1).'
}

# --- 9. O mapa de ataques -------------------------------------------------
# Vive em mapa\ e tem o seu instalador. Uma falha dele não desfaz o painel,
# que já está a correr: fica o aviso e o comando para o repetir.
$mapa = Join-Path $Destino 'mapa\windows\instalar.ps1'
if (-not $SemMapa -and (Test-Path $mapa)) {
    Passo 'Mapa de ataques'
    try {
        & $mapa -Destino (Join-Path $Destino 'mapa') -Dashboard $Destino
        if ($LASTEXITCODE -and $LASTEXITCODE -ne 0) { throw "saiu com $LASTEXITCODE" }
    } catch {
        Aviso "O mapa de ataques não ficou instalado: $($_.Exception.Message)"
        Aviso "Para repetir só o mapa: $Destino\mapa\windows\instalar.cmd"
    }
}
