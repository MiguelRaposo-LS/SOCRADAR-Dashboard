@echo off
rem Instala o Azores Cyber 360 - SOC RADAR: duplo clique. Pede para correr
rem como administrador e chama o instalar.ps1 sem mexer na politica de
rem execucao do PowerShell do PC (o Bypass vale so para esta execucao).

net session >nul 2>&1
if errorlevel 1 (
  powershell -NoProfile -Command "Start-Process -Verb RunAs -FilePath '%~f0'"
  exit /b
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0instalar.ps1" %*
echo.
pause
