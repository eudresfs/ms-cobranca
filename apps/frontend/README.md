# Frontend MS Cobrança

Aplicação front-end construída com Vite, React e TypeScript para o projeto MS Cobrança. O projeto já vem preparado com Tailwind CSS, Zustand, React Query e React Router para acelerar a implementação das próximas telas.

## Pré-requisitos
- Node.js 20+
- npm 10+

## Instalação
```bash
npm install
```

## Executando em ambiente de desenvolvimento
```bash
npm run dev
```

O servidor será iniciado em `http://localhost:5173`.

## Build de produção
```bash
npm run build
```

Os arquivos gerados ficam disponíveis no diretório `dist/`.

## Principais bibliotecas
- [React Router](https://reactrouter.com/) para gerenciamento de rotas.
- [@tanstack/react-query](https://tanstack.com/query/latest) para requisições e cache de dados.
- [Zustand](https://github.com/pmndrs/zustand) para armazenamento do token de autenticação.
- [Tailwind CSS](https://tailwindcss.com/) para estilização rápida e consistente.
- [Axios](https://axios-http.com/) para comunicação com a API.

## Estrutura de pastas
```
src/
 ├─ components/
 ├─ hooks/
 ├─ pages/
 ├─ routes/
 ├─ services/
 └─ stores/
```

A página de login já está implementada conforme o layout definido e o fluxo de autenticação está preparado para integrar com a API.
