# Mapa de ataques — Azores Cyber 360

Globo 3D com os pedidos que a Cloudflare bloqueou ou desafiou à frente dos
sites do GRA, lidos do Cortex XSIAM. Vive nesta pasta do Azores Cyber 360,
mas é uma aplicação à parte (outro processo, outra porta, outro serviço); o
painel abre-a pelo botão «Mapa de ataques ›» no rodapé.

Adaptado de [zethw0w/ddos-attack-map](https://github.com/zethw0w/ddos-attack-map)
(licença MIT, em `LICENSE`).

## O que mudou em relação ao original

| Original | Aqui | Porquê |
|---|---|---|
| Cloudflare Radar e simulação | Cloudflare do GRA, via XSIAM (`cloudflare_waf_raw`) | dados reais dos nossos sites |
| AbuseIPDB para cada IP | sai | mandava os IPs para um serviço de fora |
| Localização simulada sem GeoLite2 | cidade e coordenadas da própria Cloudflare; sem coordenadas, não se desenha | um ataque real num sítio falso engana |
| Modelos ML `.joblib` | saem; a severidade vem da ação e do motor da Cloudflare | pickles de terceiros executam código ao carregar |
| Frontend inventava ataques sem ligação | diz «Sem ligação» | num ecrã do SOC, «SIMULATED» passa por real |
| Escuta em `0.0.0.0`, sem autenticação, exporta CSV | escuta em `127.0.0.1`, sem exportação | o mapa mostra IPs e nomes de sites |
| Firewalls Palo Alto (pedido inicial) | Cloudflare | as Palo Alto no XSIAM são internas: medido a 2026-10-01, o tráfego negado vinha 100% de IPs internos |

## Alternância com o painel

Ao fim de 2 min sem ninguém mexer, o mapa volta ao painel (que passa para o
mapa ao fim de 5 min parado). Mexer, incluindo rodar o globo, recomeça a
contagem; com o painel em baixo, o mapa fica. `?rodar=0` desliga neste
browser (fica guardado; `?rodar=1` liga).

## Como funciona

`backend/feed.py` corre uma consulta XQL por minuto, sobre o minuto que
acabou há 4 min (os eventos da Cloudflare chegam ao XSIAM com até ~3 min de
atraso). O servidor toca os ataques desse minuto ao ritmo a que aconteceram,
pelo WebSocket `/ws/attacks`. O mapa mostra cada ataque ~5 min depois de
acontecer.

Severidade:

| | Quando |
|---|---|
| Crítico | motor DDoS da Cloudflare (`l7ddos`) |
| Alto | bloqueio do WAF gerido (explorações) |
| Médio | bloqueio por regra própria, país, ASN, limite de pedidos |
| Baixo | desafio (bots) |

Os desafios contam: são a maior parte (sobretudo «Manage likely bots») e
são pedidos travados. Escolha do Miguel (2026-10-01).

Custo: ~0,0005 de quota XQL por consulta (medido a 2026-10-01), cerca de
0,7 por dia.

## Correr (Linux, desenvolvimento)

Dentro de `mapa/`, com um ambiente próprio (o do painel não tem o FastAPI):

```bash
cd mapa
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
cp .env.example .env        # as mesmas credenciais do Azores Cyber 360
cd backend && ../.venv/bin/python main.py        # http://127.0.0.1:8001
```

Testes: `cd backend && ../.venv/bin/python -m pytest -q tests`

Frontend: o construído (`frontend/app/dist`) vai no git, para o PC Windows
não precisar de Node. Depois de mudar `frontend/app/src`:

```bash
cd frontend/app && npm ci --ignore-scripts && npx tsc --noEmit && npm run build
```

## Instalar no PC Windows da TV

O `windows\instalar.cmd` do painel instala também o mapa, no fim
(`-SemMapa` para não o instalar). Corre no sítio, em `C:\AzoresCyber360\mapa`,
e reaproveita o Python, o NSSM e as credenciais do painel. Fica o serviço
`MapaAtaques` em `http://127.0.0.1:8001`, com o log em
`C:\AzoresCyber360\mapa\logs\servico.log`.

Só o mapa outra vez: `C:\AzoresCyber360\mapa\windows\instalar.cmd`.

Reiniciar (PowerShell como administrador):
`C:\AzoresCyber360\windows\nssm.exe restart MapaAtaques`
