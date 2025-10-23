# ms-cobranca

Este repositório reúne os componentes necessários para executar o microsserviço de cobrança em modo de desenvolvimento com suporte a containers.

## Pré-requisitos

- [Node.js 20+](https://nodejs.org/) e npm 11+
- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/)

## Variáveis de ambiente

Três arquivos de exemplo estão disponíveis e devem ser copiados para `.env` correspondentes antes da primeira execução:

- `cp .env.example .env`
- `cp apps/backend/.env.example apps/backend/.env`
- `cp apps/frontend/.env.example apps/frontend/.env`

As variáveis definem as conexões com Postgres, Redis, URLs do backend e chaves utilizadas pela autenticação (`BETTER_AUTH_SECRET`) e webhooks.

## Subindo os containers

```bash
docker compose up --build
```

O comando acima inicializa os serviços de Postgres, Redis, backend (porta 3000) e frontend (porta 5173) conforme descrito no `docker-compose.yml`.

Para interromper os containers:

```bash
docker compose down
```

## Estrutura do monorepo

```
├── apps
│   ├── backend        # API NestJS com autenticação JWT e Prisma
│   └── frontend       # SPA React + Tailwind com fluxo de login protegido
├── packages
│   ├── shared-types   # Tipos e helpers compartilhados (ex.: invoices)
│   ├── ui             # Componentes React reutilizáveis
│   ├── eslint-config  # Configurações compartilhadas de ESLint
│   └── typescript-config # Bases de tsconfig para os workspaces
├── docker-compose.yml # Stack Postgres + Redis + Apps
└── turbo.json         # Pipelines do Turborepo
```

## Migrações do banco de dados

O backend utiliza Prisma para gerenciamento do schema localizado em `apps/backend/prisma/schema.prisma`. Para criar a primeira migração execute dentro do container do backend ou localmente com as variáveis configuradas:

```bash
npm install
cd apps/backend
npm run prisma:migrate -- --name initial
npm run prisma:generate
```

O comando cria a pasta `prisma/migrations` com a estrutura inicial (`t_usuarios`, `t_clientes`, `t_cobrancas`, `t_webhook_logs`, `t_notificacoes_logs`).

## Testes de autenticação

Após subir os containers, utilize uma ferramenta HTTP (como cURL ou Insomnia) para testar os endpoints protegidos do backend utilizando a `BETTER_AUTH_SECRET` configurada. Garanta que o frontend aponte para `VITE_API_URL=http://localhost:3000` para validar o fluxo completo.

## Limpeza

Para remover volumes persistentes após testes:

```bash
docker compose down -v
```

## Execução local sem Docker

```bash
npm install
npm run dev -- --filter=backend    # inicia o backend em modo watch na porta 3000
npm run dev -- --filter=frontend   # inicia o frontend na porta 5173
```

Cada workspace também aceita `npm install` individual caso precise trabalhar isoladamente.

## Scripts úteis

- `npm run dev` – Executa os scripts `dev` de todos os workspaces em modo watch.
- `npm run build` – Gera os artefatos de build (`dist/`) para cada workspace.
- `npm run lint` – Executa o ESLint em todos os pacotes.
- `npm run check-types` – Checagem de tipos com o TypeScript em todos os pacotes.
- `npm run format` – Formata arquivos `.ts`, `.tsx` e `.md` com Prettier.

## Como começar

```bash
npm install
npm run build
```

Os builds geram saídas em `dist/`, ignoradas pelo Git através do `.gitignore` na raiz.
