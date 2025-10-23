# ms-cobranca

Este repositório reúne os componentes necessários para executar o microsserviço de cobrança em modo de desenvolvimento com suporte a containers.

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js 20+](https://nodejs.org/) e [pnpm](https://pnpm.io/) caso deseje executar os apps fora dos containers

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

## Migrações do banco de dados

O backend utiliza Prisma para gerenciamento do schema localizado em `apps/backend/prisma/schema.prisma`. Para criar a primeira migração execute dentro do container do backend ou localmente com as variáveis configuradas:

```bash
pnpm install
npx prisma migrate dev --name initial
```

O comando cria a pasta `prisma/migrations` com a estrutura inicial (`t_usuarios`, `t_clientes`, `t_cobrancas`, `t_webhook_logs`, `t_notificacoes_logs`).

## Testes de autenticação

Após subir os containers, utilize uma ferramenta HTTP (como cURL ou Insomnia) para testar os endpoints protegidos do backend utilizando a `BETTER_AUTH_SECRET` configurada. Garanta que o frontend aponte para `VITE_API_URL=http://localhost:3000` para validar o fluxo completo.

## Limpeza

Para remover volumes persistentes após testes:

```bash
docker compose down -v
```
