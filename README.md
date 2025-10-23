# Gestão de Cobranças - Monorepo

Monorepo TurboRepo que reúne o backend em NestJS, frontend em React e pacotes compartilhados para o MVP de Gestão de Cobranças.

## Estrutura

```
├── apps
│   ├── backend        # API NestJS com autenticação via better-auth
│   └── frontend       # SPA React + Tailwind para login
├── packages
│   └── shared-types   # Tipos TypeScript compartilhados
├── docker-compose.yml # Postgres, Redis, Backend e Frontend
├── turbo.json         # Pipeline TurboRepo
└── package.json       # Workspaces npm
```

## Pré-requisitos

- Node.js 20+
- npm 10+
- Docker e Docker Compose (para infraestrutura)

## Instalação

```bash
npm install
npm run dev -- --filter=backend  # executa backend em modo watch
npm run dev -- --filter=frontend # executa frontend em modo dev
```

Cada workspace também possui `npm install` próprio caso precise trabalhar isoladamente.

## Variáveis de Ambiente

Copie `.env.example` da raiz e ajuste conforme necessário. O backend também possui `apps/backend/.env.example` com variáveis específicas.

## Executando com Docker

```bash
docker-compose up --build
```

Serviços:
- Backend: http://localhost:3001
- Frontend: http://localhost:3000
- Postgres: localhost:5432 (user/password)
- Redis: localhost:6379

## Migrations Prisma

```bash
cd apps/backend
npm run prisma:migrate -- --name initial
npm run prisma:generate
```

## Fluxo de Autenticação

1. Registrar usuário:
   ```bash
   curl -X POST http://localhost:3001/auth/registro \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@test.com","senha":"senha123","nome":"Admin"}'
   ```
2. Fazer login:
   ```bash
   curl -X POST http://localhost:3001/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@test.com","senha":"senha123"}'
   ```
3. Informar o token retornado no frontend (armazenado em `localStorage`).

## Scripts úteis

- `npm run dev` - Executa pipelines de desenvolvimento com Turbo.
- `npm run build` - Build para todos os workspaces.
- `npm run lint` - Lint em todos os pacotes.

## Próximos Passos

- Implementar módulo de webhook e deduplicação.
- Configurar filas BullMQ e integrações Evolution.
- Criar dashboard no frontend.
