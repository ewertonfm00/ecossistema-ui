# Guia de Integração — @aiox/ui

Design system do ecossistema AIOX — "Clínico Premium".

## Pré-requisitos

- Node.js 18+
- React 18
- TypeScript 5+
- TailwindCSS v3 (configurado no módulo consumidor)

## Instalação

```bash
npm install github:ewertonfm00/ecossistema-ui#main
```

Se as peer dependencies ainda não estiverem instaladas no seu módulo:

```bash
npm install react react-dom tailwindcss
```

## Configuração do Tailwind

No `tailwind.config.js` (ou `tailwind.config.ts`) do módulo consumidor:

```js
const uiPreset = require('@aiox/ui/tailwind-preset')

module.exports = {
  presets: [uiPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@aiox/ui/src/**/*.{ts,tsx}',
  ],
}
```

O preset já inclui todos os tokens de cor, tipografia e espaçamento do design system "Clínico Premium". A cor primária é `#0F766E` (verde-azulado clínico), disponível como `primary-700` no Tailwind.

## Uso básico

```tsx
import { Button, FormField, Input } from '@aiox/ui'

function LoginForm() {
  return (
    <form>
      <FormField label="E-mail">
        <Input type="email" placeholder="seu@email.com" />
      </FormField>
      <Button variant="primary" type="submit">
        Entrar
      </Button>
    </form>
  )
}
```

## Layout completo com AppShell

```tsx
import { AppShell, SidebarNav, PageHeader } from '@aiox/ui'
import { useState } from 'react'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard', active: true },
  { label: 'Clientes', icon: 'Users', href: '/clientes' },
]

function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <AppShell
      sidebar={
        <SidebarNav
          items={NAV_ITEMS}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(c => !c)}
        />
      }
    >
      <PageHeader title="Dashboard" />
      {children}
    </AppShell>
  )
}
```

## Composições de página

O Storybook do `@aiox/ui` contém 5 composições de página completas como referência:

- **LoginPage** — formulário de autenticação standalone
- **DashboardPage** — dashboard com métricas e AppShell completo
- **ListingPage** — tabela com paginação usando DataTable
- **FormPage** — formulário completo com todos os tipos de input
- **EmptyPage** — empty state e Skeleton de loading

Para visualizar:

```bash
# No diretório ecossistema-ui:
npm run storybook
# Acesse http://localhost:6006 → Pages
```

## Tipos TypeScript

```tsx
import type { DataTableColumn, SidebarNavItem } from '@aiox/ui'

// Exemplo com DataTable tipado:
interface Produto {
  id: number
  nome: string
  preco: number
}

const colunas: DataTableColumn<Produto>[] = [
  { key: 'nome', header: 'Produto' },
  { key: 'preco', header: 'Preço', render: (v) => `R$ ${v}` },
]
```

## Troubleshooting

### Classes Tailwind não aplicadas

Certifique-se de incluir o path do pacote no `content` do `tailwind.config.js`:

```js
'./node_modules/@aiox/ui/src/**/*.{ts,tsx}'
```

Sem esse path, o PurgeCSS do Tailwind remove as classes do `@aiox/ui` do bundle final.

### Erro: Cannot find module '@aiox/ui'

Execute `npm install` novamente. Se instalado via GitHub, verifique a conectividade e que o branch `main` existe:

```bash
npm install github:ewertonfm00/ecossistema-ui#main
```

### TypeScript não reconhece os tipos

Verifique que `@aiox/ui` em `node_modules` tem `dist/index.d.ts`. Se instalado de `src/` diretamente (versão anterior à 1.0), execute `npm run build` no `ecossistema-ui` e reinstale no módulo consumidor.

### Componentes renderizam sem estilos

O `@aiox/ui` não importa CSS — todos os estilos são classes Tailwind. Verifique que o preset está configurado corretamente e que o módulo tem TailwindCSS v3 instalado e funcional.
