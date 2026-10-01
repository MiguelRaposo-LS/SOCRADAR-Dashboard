# Instalação: Azores Cyber 360 - SOC RADAR

Manual para pôr o dashboard a correr sozinho num PC Windows dedicado, ligado à
TV da parede, com o briefing gerado por um modelo local noutra máquina.

**Duas máquinas:**

| Máquina | O que corre |
|---|---|
| PC Windows (junto à TV) | o servidor do dashboard (serviço Windows) e o browser em ecrã inteiro |
| Lubuntu com a Quadro P1000 | o Ollama, com o modelo do briefing |

O PC Windows precisa de chegar à Internet (API do Cortex XSIAM) e ao Lubuntu
(porta 11434). O browser e o servidor estão na mesma máquina, por isso o
dashboard só escuta em `127.0.0.1`.

> Este manual ainda não foi seguido num Windows real. O servidor foi testado
> em Linux; os passos Windows (NSSM, arranque, kiosk) estão por validar na
> primeira instalação.

## Instalação pelo script (PC Windows)

Depois do Lubuntu (secção 1), o PC Windows instala-se com um duplo clique em
`windows\instalar.cmd`. O script pede para correr como administrador e faz as
secções 2, 3 e 4.2–4.3 deste manual:

1. Copia o projeto para `C:\AzoresCyber360`. Não copia `.venv`, `estado`, `logs` nem um `.env` que já exista no destino.
2. Instala o Python 3.12 pelo `winget`, se faltar.
3. Cria o `.venv` e instala as dependências.
4. Cria o `.env`, com uma palavra-passe aleatória, `HOST=127.0.0.1` e `DASHBOARD_LOCAL_NO_AUTH=1`.
5. Fecha o `.env`, o `estado` e os `logs` ao SYSTEM e aos administradores.
6. Descarrega o NSSM e instala o serviço com as definições da secção 3.
7. Põe o browser em kiosk na pasta de arranque comum e tira o adormecer do ecrã.
7b. Instala o mapa de ataques (`mapa\`, serviço `MapaAtaques`, porta 8001),
   com as mesmas credenciais. `-SemMapa` salta este passo; ver `mapa\README.md`.
8. Abre o `.env` no Bloco de Notas para pores as credenciais do Cortex e o
   `OLLAMA_URL`. Quando fechas, arranca o serviço e espera que responda.

Se fechares o Bloco de Notas sem as credenciais, o serviço fica instalado mas
parado. Corre o `instalar.cmd` outra vez depois de as pôr. O script pode
correr-se as vezes que for preciso, também para atualizar: não mexe num `.env`
que já exista nem no estado.

Opções (numa PowerShell como administrador):

```powershell
powershell -ExecutionPolicy Bypass -File windows\instalar.ps1 -OllamaUrl http://<IP do Lubuntu>:11434
powershell -ExecutionPolicy Bypass -File windows\instalar.ps1 -Destino D:\SOC -SemEcra   # só o servidor
```

Fica à mão só o início de sessão automático da TV (4.1), porque precisa da
palavra-passe da conta. Se o NSSM não se conseguir descarregar (proxy), o
script diz onde pôr o `nssm.exe`.

As secções seguintes são o mesmo, passo a passo, para quando o script falhar
ou para perceber o que ele faz.

---

## 1. Lubuntu: Ollama

### 1.1 Instalar e arrancar sozinho

```bash
curl -fsSL https://ollama.com/install.sh | sh
sudo systemctl enable --now ollama
ollama pull llama3.2:3b
```

### 1.2 Aceitar ligações do PC do dashboard

Por omissão, o Ollama só escuta em `localhost` e o PC Windows não lhe chega.

```bash
sudo systemctl edit ollama
```

Acrescentar, entre as linhas de comentário que o editor mostra:

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
```

```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

### 1.3 Firewall: só o PC do dashboard

O Ollama **não tem autenticação**: quem lhe chegar pode usá-lo. Abre-se a
porta só ao IP do PC Windows (trocar `10.0.0.50`):

```bash
sudo ufw allow from 10.0.0.50 to any port 11434 proto tcp
sudo ufw enable
sudo ufw status
```

### 1.4 Confirmar

No PC Windows, numa PowerShell (trocar `10.0.0.20` pelo IP do Lubuntu):

```powershell
Invoke-RestMethod http://10.0.0.20:11434/api/tags | Select-Object -ExpandProperty models | Select-Object name
```

Tem de aparecer `llama3.2:3b`.

---

### Alternativa: o Ollama no próprio PC Windows

Se o Lubuntu não estiver sempre ligado, o Ollama pode correr no PC da TV:

```powershell
winget install -e --id Ollama.Ollama
ollama pull llama3.2:3b
```

No `.env`: `OLLAMA_URL=http://localhost:11434` e `OLLAMA_TIMEOUT=120` (sem
GPU, o i7 leva perto de um minuto por briefing). No Windows o Ollama arranca
quando se inicia sessão, depois do serviço: o primeiro briefing sai «por
regras» e o servidor volta a tentar de 5 em 5 min até o Ollama responder.

## 2. PC Windows: o dashboard

### 2.1 Python

Instalar o Python 3.12 a partir de <https://www.python.org/downloads/windows/>
(não o da Microsoft Store), com **"Add python.exe to PATH"** marcado.

### 2.2 Copiar o projeto

Copiar a pasta do projeto para `C:\AzoresCyber360`, **sem** as pastas `.venv`,
`estado`, `logs` e `__pycache__` (são desta máquina e não servem noutra).

O `.env` da máquina onde o dashboard já corre tem os valores certos do Cortex:
pode vir-se com ele, por um meio seguro (não por e-mail nem por uma partilha
aberta). Nesse caso, salta-se o `copy` do passo seguinte e só se mudam
`OLLAMA_URL` e `DASHBOARD_LOCAL_NO_AUTH`.

Numa PowerShell:

```powershell
cd C:\AzoresCyber360
py -3.12 -m venv .venv
.venv\Scripts\python.exe -m pip install -r requirements.txt
```

### 2.3 Configurar o `.env`

```powershell
copy .env.example .env
notepad .env
```

| Variável | Valor |
|---|---|
| `DASHBOARD_PASSWORD` | palavra-passe de quem abrir o dashboard de outro PC |
| `DASHBOARD_LOCAL_NO_AUTH` | `1`, para a TV não ficar parada na janela de login depois de cada arranque (só o próprio PC entra sem palavra-passe) |
| `HOST` | `127.0.0.1` |
| `CORTEX_API_URL` | o URL da API do tenant (consola do XSIAM, «Copy API URL») |
| `CORTEX_API_KEY` | a chave |
| `CORTEX_API_KEY_ID` | o ID da chave |
| `CORTEX_AUTH` | o tipo da chave: `standard` ou `advanced` (a do GRA alternou entre os dois a 2026-09-30, quando lhe mudaram as permissões). Se estiver errado, o servidor usa o outro e avisa no log |
| `OLLAMA_URL` | `http://<IP do Lubuntu>:11434`, **não** `localhost` |
| `OLLAMA_MODEL` | `llama3.2:3b` |

A chave fica só no `.env`: não a pôr na linha de comandos do NSSM
(`AppEnvironmentExtra`), onde ficaria à vista na configuração do serviço.

O `.env` e a pasta `estado` têm a chave e nomes de casos, hosts e
utilizadores. Deixar só o sistema e os administradores lê-los. Usam-se os SID
(`*S-1-5-18` = SYSTEM, `*S-1-5-32-544` = Administradores) porque os nomes mudam
com o idioma do Windows:

```powershell
mkdir C:\AzoresCyber360\estado -Force
icacls C:\AzoresCyber360\.env /inheritance:r /grant:r "*S-1-5-18:F" "*S-1-5-32-544:F"
icacls C:\AzoresCyber360\estado /inheritance:r /grant:r "*S-1-5-18:(OI)(CI)F" "*S-1-5-32-544:(OI)(CI)F"
```

### 2.4 Experimentar à mão

```powershell
.venv\Scripts\python.exe server.py
```

Abrir <http://127.0.0.1:8360> no browser.

- **A recolha inicial demora ~6 min.** Nesse tempo os painéis mostram «–» e «a carregar».
- **O estado da API tem de chegar a verde** («Operacional»).
- **O briefing aparece quando a recolha acaba.**

Parar com Ctrl+C e seguir para o serviço.

---

## 3. PC Windows: o servidor como serviço (NSSM)

O NSSM transforma o `server.py` num serviço Windows que arranca com a máquina,
mesmo sem sessão iniciada, e se reinicia sozinho se o processo cair.

1. Descarregar o NSSM de <https://nssm.cc/download> e copiar o
   `win64\nssm.exe` para `C:\AzoresCyber360\windows\`.
2. Numa PowerShell **como administrador**:

```powershell
cd C:\AzoresCyber360
$nssm = ".\windows\nssm.exe"

& $nssm install AzoresCyber360 "C:\AzoresCyber360\.venv\Scripts\python.exe" "server.py"
& $nssm set AzoresCyber360 AppDirectory "C:\AzoresCyber360"
& $nssm set AzoresCyber360 DisplayName "Azores Cyber 360 - SOC RADAR"
& $nssm set AzoresCyber360 Start SERVICE_AUTO_START

# Se o processo cair, reinicia ao fim de 5 s.
& $nssm set AzoresCyber360 AppExit Default Restart
& $nssm set AzoresCyber360 AppRestartDelay 5000

# Ao parar, o NSSM manda Ctrl+C e o servidor grava o estado antes de sair
# (medido: 0,7 s). Por omissão o NSSM só espera 1,5 s antes de matar o processo.
& $nssm set AzoresCyber360 AppStopMethodConsole 10000

# Log do servidor em ficheiro, rodado aos 10 MB.
mkdir C:\AzoresCyber360\logs -Force
& $nssm set AzoresCyber360 AppStdout "C:\AzoresCyber360\logs\servico.log"
& $nssm set AzoresCyber360 AppStderr "C:\AzoresCyber360\logs\servico.log"
& $nssm set AzoresCyber360 AppRotateFiles 1
& $nssm set AzoresCyber360 AppRotateOnline 1
& $nssm set AzoresCyber360 AppRotateBytes 10485760

& $nssm start AzoresCyber360
& $nssm status AzoresCyber360    # tem de dizer SERVICE_RUNNING
```

**Onde ver o que se passa:** `C:\AzoresCyber360\logs\servico.log`. O log
mostra a recolha inicial, as métricas XQL, cada briefing gerado e os avisos
(por exemplo, os casos que a chave não tem permissão para abrir).

**Reinícios:** o estado grava-se em `C:\AzoresCyber360\estado` a cada 5 minutos
e ao parar. Depois de um reinício do serviço ou do PC, os dados aparecem em
menos de 1 segundo, em vez dos ~6 minutos da primeira vez.

### Alternativa sem NSSM: Agendador de Tarefas

Serve, mas é menos robusto do que um serviço (desiste ao fim de algumas
falhas seguidas). Só se não for possível instalar o NSSM.

- **Gatilho:** «Ao arrancar o computador».
- **Executar mesmo sem sessão iniciada.**
- **Ação:** `C:\AzoresCyber360\.venv\Scripts\python.exe`, com o argumento `server.py`, a começar em `C:\AzoresCyber360`.
- **Definições:** «Se a tarefa falhar, reiniciar a cada 1 minuto, até 3 vezes». Desmarcar «Parar a tarefa se for executada durante mais de…».

---

## 4. PC Windows: a TV

### 4.1 Iniciar sessão sozinho

A pasta de arranque só corre depois de alguém iniciar sessão. Numa TV sem
ninguém, isso tem de acontecer sozinho. Usar o **Autologon** da Sysinternals
(<https://learn.microsoft.com/sysinternals/downloads/autologon>), que guarda a
palavra-passe cifrada, e não o `netplwiz`. Usar uma conta local sem privilégios
de administrador, só para o ecrã.

### 4.2 Abrir o dashboard em ecrã inteiro

O projeto traz `windows\abrir-dashboard.cmd`. O script espera até o serviço
responder e só então abre o Edge em modo kiosk. Sem esta espera, o browser abria
antes do servidor, ficava numa página de erro e não voltava a tentar.

1. `Win + R` → `shell:startup` → Enter.
2. Criar lá um atalho para `C:\AzoresCyber360\windows\abrir-dashboard.cmd`.
3. Nas propriedades do atalho, «Executar: Minimizada», para a janela do script não aparecer.

Para usar o Chrome em vez do Edge, mudar a linha `EDGE=` no script para o
caminho do `chrome.exe` e tirar `--edge-kiosk-type=fullscreen`.

Para sair do modo kiosk: `Alt + F4`.

### 4.3 Não deixar o ecrã adormecer

Numa PowerShell como administrador:

```powershell
powercfg /change monitor-timeout-ac 0
powercfg /change standby-timeout-ac 0
powercfg /change hibernate-timeout-ac 0
```

Em «Definições → Windows Update → Opções avançadas → Horas ativas», pôr as
horas de serviço, para o Windows não reiniciar a meio do dia.

---

## 5. Verificação final

Desligar e voltar a ligar o PC, sem tocar em nada:

- [ ] O Windows inicia sessão sozinho.
- [ ] O Edge abre o dashboard em ecrã inteiro, sem janela de login.
- [ ] O estado da API chega a verde («Operacional»).
- [ ] O briefing diz «por llama3.2:3b», e não «por regras».
- [ ] `C:\AzoresCyber360\logs\servico.log` não tem linhas `ERROR`.

### Quando algo não bate certo

| Sintoma | Onde olhar |
|---|---|
| Estado da API vermelho, log com `401` | a chave foi revogada ou regenerada na consola (o tipo errado já não dá 401: o servidor tenta o outro) |
| Log com `acerta CORTEX_AUTH=…` | o tipo no `.env` está errado; funciona, mas corrigir o `.env` |
| Estado da API vermelho, log com `Sem ligação` | o PC não chega à Internet ou ao tenant (proxy, firewall) |
| Briefing com «⚠ modelo falhou: …» por baixo | o próprio aviso diz o motivo e o que fazer. Depois de uma falha, o servidor volta a tentar de 5 em 5 min |
| «o modelo llama3.2:3b não está no Ollama» | falta o `ollama pull llama3.2:3b` na máquina do Ollama (1.1) |
| «o Ollama não responde em …» | `OLLAMA_URL` errado, Ollama parado, Ollama só em `localhost` noutra máquina (1.2) ou firewall (1.3) |
| «o modelo demorou mais de N s» | sem GPU é normal: subir `OLLAMA_TIMEOUT` no `.env` (o exemplo traz 120) e reiniciar o serviço |
| A TV fica na janela de login | `DASHBOARD_LOCAL_NO_AUTH=1` em falta no `.env` |
| O estado da API fica vermelho, «Servidor inacessível» (a página continua com os últimos dados) | o serviço parou: `nssm status AzoresCyber360` e o log |
| A TV fica com uma janela preta ou do script, e o browser não abre | o serviço nunca respondeu: o script fica à espera. Ver `nssm status` e o log |
| Log com `get_incident_extra_data recusado (403…)` | a chave não tem permissão para esses casos; o ecrã funciona, mas sem detalhe para eles |

---

## 6. Atualizar para uma versão nova

```powershell
cd C:\AzoresCyber360
.\windows\nssm.exe stop AzoresCyber360
# copiar os ficheiros novos por cima (não apagar .env, estado nem logs)
.venv\Scripts\python.exe -m pip install -r requirements.txt
.\windows\nssm.exe start AzoresCyber360
```

O estado gravado é retomado. Se as alterações forem só no ecrã (`public\`),
não é preciso parar o serviço: basta recarregar a página na TV (`F5`).
