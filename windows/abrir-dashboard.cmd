@echo off
rem Abre o Azores Cyber 360 - SOC RADAR em modo kiosk, depois de o servico
rem responder. Sem esta espera, o browser abria antes do servidor, ficava na
rem pagina de erro e nao voltava a tentar.
rem
rem Qualquer resposta HTTP conta como "de pe" (tambem 401, se o acesso sem
rem palavra-passe do proprio PC estiver desligado).

set URL=http://127.0.0.1:8360/
set EDGE=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe

:espera
powershell -NoProfile -Command "try { Invoke-WebRequest -UseBasicParsing -TimeoutSec 3 '%URL%api/ping' | Out-Null; exit 0 } catch { if ($_.Exception.Response) { exit 0 } else { exit 1 } }" >nul 2>&1
if errorlevel 1 (
  timeout /t 5 /nobreak >nul
  goto espera
)

start "" "%EDGE%" --kiosk %URL% --edge-kiosk-type=fullscreen --no-first-run
