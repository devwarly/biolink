

# 🚀 Projeto React Profissional (Vite + TS)

Este projeto foi estruturado utilizando as melhores práticas de mercado, focando em **escalabilidade**, **manutenibilidade** e **performance**.

## 🛠️ Tecnologias Principais

* **Framework:** [React 18+](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Gerenciamento de Estado de Servidor:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Formulários:** React Hook Form + Zod

---

## 📂 Estrutura de Pastas

A arquitetura segue o padrão de **Separação de Preocupações (SoC)**:

```text
src/
├── @types/          # Definições de tipos globais (.d.ts)
├── assets/          # Arquivos estáticos (imagens, ícones, fontes)
├── components/      # Componentes compartilhados e atômicos
│   └── ui/          # Componentes de base (botões, inputs, modais)
├── contexts/        # Provedores de estado global (Auth, Theme)
├── hooks/           # Custom hooks reutilizáveis
├── layouts/         # Templates de estrutura de página
├── pages/           # Componentes de rota (view principal)
├── services/        # Integração com APIs (instâncias Axios, chamadas)
├── styles/          # Configurações globais de CSS/Tailwind
└── utils/           # Funções auxiliares e formatadores

```

---

## ⚙️ Configuração Inicial

### 1. Instalação de Dependências

Certifique-se de estar usando a versão LTS do Node.js.

```bash
npm install

```

### 2. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto seguindo o modelo:

```env
VITE_API_URL=https://api.exemplo.com

```

### 3. Scripts Disponíveis

* `npm run dev`: Inicia o servidor de desenvolvimento.
* `npm run build`: Gera a versão de produção na pasta `/dist`.
* `npm run preview`: Visualiza o build localmente.
* `npm run lint`: Executa o verificador de código (ESLint).

---

## 📏 Padrões de Código

Para manter a consistência entre o time, este projeto utiliza:

* **Absolute Imports:** Use `@/components/...` em vez de caminhos relativos complexos.
* **Convenção de Nomes:** * Componentes e Pastas: `PascalCase` (ex: `UserProfile/`)
* Hooks e Funções: `camelCase` (ex: `useAuth.ts`)


* **Estilização:** Priorize classes do Tailwind. Se necessário CSS customizado, utilize **CSS Modules**.

---

## 📡 Fluxo de Dados e API

As requisições para a API devem ser centralizadas na pasta `services/`. Utilizamos o **React Query** para lidar com cache e estados de carregamento.

> **Nota:** Nunca faça chamadas de API diretamente dentro do `useEffect` de um componente sem uma camada de serviço intermediária.

