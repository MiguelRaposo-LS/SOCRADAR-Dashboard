# Azores Cyber 360 - SOC RADAR

Dashboard SOC para monitor de parede, só de leitura, com dados do Cortex XSIAM.
O servidor Flask guarda a chave da API, sincroniza com o XSIAM a cada minuto e
serve o ecrã. O browser nunca vê a chave.

Instalação no PC Windows da TV (serviço, arranque automático, kiosk, Ollama
noutra máquina): ver [INSTALACAO.md](INSTALACAO.md).

## Arrancar

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
cp .env.example .env        # preencher DASHBOARD_PASSWORD e CORTEX_*
.venv/bin/python server.py  # http://127.0.0.1:8360
```

Sem tenant à mão: `DEMO_MODE=1` no `.env`. O ecrã mostra uma faixa
«DADOS DE DEMONSTRAÇÃO» enquanto estiver neste modo.

Para o monitor ver o servidor noutra máquina: `HOST=0.0.0.0`. O Basic Auth vai
em claro, por isso fora do próprio posto convém pôr um proxy HTTPS à frente.

Com o browser na mesma máquina (a TV), `DASHBOARD_LOCAL_NO_AUTH=1` deixa o
próprio PC (127.0.0.1) entrar sem palavra-passe, para o modo kiosk não ficar
parado na janela de login depois de cada arranque. Os outros PCs continuam a
precisar dela. Não ligar com um proxy na mesma máquina: aí todos os pedidos
pareceriam locais.

Corre **num só processo** (o `server.py` já usa o waitress com threads). Vários
workers seriam várias sincronizações a gastar o limite de pedidos da API.

Testes: `.venv/bin/python -m pytest -q`

## Monitor

O ecrã escala com a resolução: fica igual num 1080p e num 4K, sem scroll. No
browser da TV, o zoom tem de estar a 100% e convém usar o modo kiosk (no
Windows, ver `INSTALACAO.md`).

## Reinícios

O estado (casos abertos, alertas de 24h, métricas e briefing) grava-se em
`estado/` (ou em `STATE_DIR`) de 5 em 5 minutos e ao parar: SIGTERM no Linux,
Ctrl+C / Ctrl+Break no Windows (é assim que o NSSM para o serviço). No
arranque retoma-se de lá: os dados aparecem em menos de 1 s e a sincronização
continua em modo incremental. Um estado com mais de 24 h é ignorado e a
recolha começa do zero.

A pasta tem nomes de casos, hosts e utilizadores. Está fora do git; em Linux
os ficheiros ficam com 0600, e no Windows as permissões limitam-se com o
`icacls` (ver `INSTALACAO.md`).

O browser guarda a última resposta de cada painel no `localStorage` e mostra-a
ao abrir a página, até chegar a nova. Os mesmos nomes ficam, por isso, também
no perfil do browser da TV.

## Chave da API

Na consola do XSIAM, em Settings → Configurations → API Keys. O papel da chave
tem de ler **casos e alertas**. Se só ler alertas, os contadores ficam a zero
sem erro nenhum. `CORTEX_AUTH` tem de coincidir com o tipo da chave
(standard/advanced).

## Como os dados chegam

Há duas fontes, porque o tenant cria milhares de casos por dia e cada página
de 100 demora 8–18 s:

- **API paginada**, só para o que tem de ser linha a linha:
  - os casos abertos, que alimentam os contadores, a tabela e o briefing;
  - os alertas das últimas 24h, que alimentam os «Alertas mais críticos» e as
    «Ameaças bloqueadas».

  Estes dados leem-se por inteiro no arranque (~6 min). Depois, a cada minuto,
  só o que mudou.
- **XQL agregado ao dataset `incidents`**, de 15 em 15 min: volume, MITRE,
  radar, MTTR e Auto contido. Cada consulta custa uma fração mínima da quota
  (ver `remaining_quota` no log).

O `total_count` da API **não é fiável**: vinha até 7× abaixo do real. A
paginação segue até vir uma página incompleta, com um teto
(`MAX_*_PAGES`). Se o teto for atingido, o painel mostra «dados truncados».

## Definições

| No ecrã | O que conta |
|---|---|
| Crítico / Alto / Médio / Baixo | Casos com estado `new` ou `under_investigation` |
| Auto contido | Casos resolvidos nas últimas 24h com um estado `resolved_*auto*` (XQL) |
| Ameaças bloqueadas | Alertas das últimas 24h com categoria de malware, spyware, vírus ou WildFire e ação *Blocked*/*Prevented*. Inclui o Anti-Spyware da NGFW |
| MTTR | **Mean Time To Resolve**: da criação à resolução, só casos resolvidos nas últimas 24h, sem os automáticos nem os duplicados (XQL). Acima de 120 min aparece em horas |
| Volume | Casos por data de criação, no fuso dos Açores, uma linha por severidade. «Médio» abre escondido (é 97–99% dos casos e esmagava as outras linhas); um clique na legenda mostra-o, e o tooltip dá sempre o total com todas as severidades |
| Alertas mais críticos | Alertas das últimas 24h, os mais graves e recentes primeiro. O mesmo alerta no mesmo host junta-se numa linha, com «×N» |
| MITRE, radar | Casos, pelas táticas e técnicas que o XSIAM lhes atribui. Um caso com duas táticas conta nas duas |
| Estado da API | Verde: última sincronização correu bem há menos de 10 min. Amarelo: falhou, ou está parada há mais de 10 min. Vermelho: falha e mais de 10 min sem dados, ou o servidor não responde |

## Briefing

É gerado por um modelo local no Ollama (`OLLAMA_URL`, `OLLAMA_MODEL`, por
omissão `llama3.2:3b`), uma vez logo que a recolha inicial acaba e depois à
hora certa (09:00, 10:00…). O `/api/briefing` só devolve o último gerado:
`{"texto": …, "gerado_em": …}`.

O modelo tem de estar descarregado no Ollama: `ollama pull llama3.2:3b`.

- Se a geração falhar, fica o briefing anterior, e o log diz porquê (por
  exemplo `HTTP 404 (model 'llama3.2:3b' not found)`). Se ainda não houver
  nenhum, o texto é montado por regras e o painel mostra «modelo falhou».
- Se o modelo escrever um número que não está nos dados que recebeu, o texto é
  descartado.
- Os dados de entrada são os mesmos números que o ecrã mostra. O briefing não
  pede nada ao Cortex.

## Por confirmar

- Programa de financiamento: o rodapé mostra a barra **Açores 2030 /
  Cofinanciado pela UE** (`Fotos/`), não uma barra PRR. Confirmar qual é.
- O Chart.js vem do jsDelivr. Se o posto do monitor não tiver acesso à
  Internet, é preciso copiá-lo para `public/`.
