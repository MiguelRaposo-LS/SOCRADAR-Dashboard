@echo off
rem Atualiza o Azores Cyber 360 (painel e mapa de ataques): duplo clique.
rem Pede administrador, vai buscar a versao nova (git pull), atualiza as
rem dependencias e reinicia os servicos. Nao mexe no .env nem no estado.
rem Se o git pull falhar, para ai: nada e reiniciado com codigo a meio.

net session >nul 2>&1
if errorlevel 1 (
  powershell -NoProfile -Command "Start-Process -Verb RunAs -FilePath '%~f0'"
  exit /b
)

cd /d "%~dp0.."

echo == Versao nova (git pull)
git pull
if errorlevel 1 (
  echo.
  echo ! O git pull falhou: nada foi reiniciado. Ver a mensagem acima.
  echo.
  pause
  exit /b 1
)

echo.
echo == Dependencias
.venv\Scripts\python.exe -m pip install -q --disable-pip-version-check -r requirements.txt
if exist mapa\.venv\Scripts\python.exe (
  mapa\.venv\Scripts\python.exe -m pip install -q --disable-pip-version-check -r mapa\requirements.txt
)

echo.
echo == Reiniciar os servicos
windows\nssm.exe restart AzoresCyber360
sc query MapaAtaques >nul 2>&1
if not errorlevel 1 windows\nssm.exe restart MapaAtaques

echo.
echo == Estado (tem de dizer SERVICE_RUNNING)
windows\nssm.exe status AzoresCyber360
sc query MapaAtaques >nul 2>&1
if not errorlevel 1 windows\nssm.exe status MapaAtaques

echo.
echo Pronto. Na TV: Ctrl+F5.
echo.
pause
