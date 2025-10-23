# ms-cobranca

Monorepo gerenciado com [Turborepo](https://turbo.build/repo) e workspaces NPM para o MVP de cobranças.

## Estrutura

- `apps/backend`: serviço Node.js em TypeScript com utilitários para listar cobranças de exemplo.
- `apps/frontend`: aplicação TypeScript que reutiliza os tipos compartilhados para apresentar uma prévia das cobranças.
- `packages/shared-types`: módulo com modelos e helpers de domínio reutilizados pelos apps.
- `packages/ui`: componentes React reutilizáveis (incluídos do template original do Turborepo).
- `packages/eslint-config`: configuração compartilhada do ESLint.
- `packages/typescript-config`: configurações compartilhadas do TypeScript.

## Scripts

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
