# AGENT.md — ecossistema-ui

> Manual do agente para o Design System global do ecossistema. Atualizar "Estado atual" ao fim de toda sessão. Decisões arquiteturais são permanentes (nunca remover).

## Identidade do projeto
- **Módulo:** Design System global — compartilhado por todos os módulos do ecossistema (Gestão, Pedidos, Marketing, Auth, ML)
- **Repo:** `github.com/ewertonfm00/ecossistema-ui` (private) · **Pasta:** `ecossistema/ecossistema-ui`
- **Planejamento-fonte:** repo `ecossistema-planejamento` (`docs/design/DESIGN.md`, stories 0.x–2.x)
- **Pacote publicado:** `@ecossistema/ui` — consumido pelos módulos via `npm install`

## Stack técnica
- **Build:** tsup (ESM + CJS dual output)
- **Testes:** Vitest + Testing Library
- **Storybook:** 8.x (documentação de componentes)
- **Estilos:** Tailwind CSS (preset customizado `tailwind-preset.js`)
- **Linguagem:** TypeScript strict

## Estilo visual — Clínico Premium (DESIGN.md)
- **Cor primária:** teal `#0D9488`
- **Cor de acento:** rose-wine `#E11D48`
- **Tipografia:** Inter
- **Modo:** dark mode estrutural
- **Acessibilidade:** WCAG AA mínimo (primary-700 para textos sobre fundo claro — corrigido na 7.1)

## Decisões arquiteturais (permanentes)
- **DS-1** — Design system único compartilhado por todos os módulos (não por projeto) — decisão 2026-06-13
- **DS-2** — Atomic Design: átomos → moléculas → organismos → templates — sem exceções
- **DS-3** — Componentes exportados via barrel `src/index.ts` — absolute imports apenas
- **DS-4** — Storybook é a documentação viva — todo componente novo exige story antes do merge
- **DS-5** — Sem dependências de runtime além de React — zero side-effects no bundle

## Componentes implementados

### Épico 00 — Bootstrap + Átomos (Done)
Button, Input, Label, Badge, Avatar, Icon, Spinner, Checkbox, Radio, Switch, Textarea, Select, Tooltip, Skeleton, Divider

### Épico 00 — Moléculas (Done)
FormField, Card, Alert, Toast

### Épico 00 — Organismos (Done)
AppShell, SidebarNav, PageHeader, DataTable

### Épico 04 — Componentes avançados (Done)
Modal, Drawer, ToastProvider, DatePicker, SelectCustom, Tooltip avançado

## Estado atual
- **2026-06-28** — AGENT.md, BUGS.md, IDEAS.md criados (bootstrap operacional). Stories 2.0/2.1/2.2 aguardam QA gate (@qa). Todos os componentes do Épico 04 implementados — commit `6ab4d38`. Próximo: abrir sessão CC, acionar `@qa` para validar 2.0/2.1/2.2.
