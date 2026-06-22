# PRD — Design System `@aiox/ui`

> **Versão:** 1.0 | **Data:** 2026-06-20 | **Autor:** @pm (Morgan)
> **Projeto:** ecossistema-ui | **Pacote:** `@aiox/ui`

---

## Visão Geral

`@aiox/ui` é a biblioteca de componentes React do ecossistema AIOX — design system "Clínico Premium" compartilhado entre os módulos Estética IA, Auth, Marketing, Gestão e ML Lab. O objetivo é zero divergência visual entre módulos: qualquer tela construída com `@aiox/ui` é indistinguível visualmente de outra, independente do módulo que a construiu.

---

## Épicos e Stories

| Épico | Descrição | Stories | Status |
|-------|-----------|---------|--------|
| **00 — Foundation** | Átomos base + moléculas core — building blocks de 100% das telas | 0.2 (7 átomos) · 0.3 (4 moléculas) | ✅ Done |
| **01 — Componentes Estendidos** | Átomos de formulário avançado + organismos de layout | 0.3b (8 átomos médios) · 0.4 (4 organismos) | ✅ Done |
| **02 — Developer Experience** | Storybook + documentação interativa + visual regression | 0.5 (Storybook + stories) | ✅ Done |
| **03 — Integração e Release** | Build de distribuição + integração nos módulos + page compositions | 1.0 · 1.1 · 1.2 | ✅ Done |
| **04 — Componentes Avançados** | Modal, Drawer, ToastProvider, DatePicker, Select customizado, Tooltip com teclado | 2.0 · 2.1 · 2.2 | ✅ Done |
| **05 — Responsividade** | AppShell mobile, sidebar drawer, breakpoints nos organismos | 3.0 | ✅ Done |
| **06 — DataTable Avançado** | Sorting, filtros por coluna, seleção de linhas, export CSV, estado vazio com ação | 4.0 | ✅ Done |
| **07 — Tabs & Stepper** | Navegação por abas (Tabs controladas/uncontroladas) e wizard multi-step (Stepper com estados completed/current/pending) | 5.0 · 5.1 | Planned |
| **08 — Charts** | Gráficos para dashboards: BarChart, LineChart, PieChart/DonutChart, AreaChart — via recharts | 6.0 | Planned |
| **09 — Formulários Avançados** | FileUpload (drag-and-drop, preview, validação), MultiSelect (tags), RangeSlider | 7.0 | Planned |
| **10 — Feedback & Status** | ProgressBar, StepIndicator visual, EmptyState standalone padronizado | 8.0 | Planned |
| **11 — Calendar & Agenda** | CalendarPicker (month view), DateRangePicker (start/end), AgendaView semanal | 9.0 | Planned |

---

## Critérios de Sucesso

| Critério | Métrica |
|----------|---------|
| Consistência visual | Zero componentes duplicados entre módulos do ecossistema |
| Acessibilidade | WCAG AA — todos os componentes com role e aria corretos |
| Tipagem | TypeScript strict sem `any` ou `!` non-null assertion |
| Cobertura de testes | Mínimo 5 testes por componente (Vitest + @testing-library/react) |
| Bundle | Tree-shakeable — importar Button não traz Toast |
| Documentação | 100% dos componentes com story no Storybook (Épico 02) |

---

## Stack e Restrições

**Stack fixa:**
- React 18 + TypeScript strict
- TailwindCSS v3 + `tailwind-preset.js` (tokens do design system)
- `cva` (class-variance-authority) para variantes
- `lucide-react` para ícones
- Vitest + @testing-library/react para testes

**Restrições inegociáveis:**
- Zero tokens de cor hardcoded — apenas tokens do preset
- Componentes agnósticos a estado externo (React Hook Form, Zod, Zustand são responsabilidade dos módulos)
- Sem dependências de UI externas (Radix, Headless UI, shadcn) — composição própria
- Dark mode fora de escopo até decisão explícita
- Sem `framer-motion` nos componentes base — animações via CSS/Tailwind

---

## Marcos de Entrega

| Marco | Épico | Estimativa | Bloqueante para |
|-------|-------|-----------|----------------|
| M0.5 | 00 — Foundation | ✅ Done | Login + formulários dos módulos |
| M1.5 | 01 — Componentes Estendidos | ✅ Done | Dashboards e layouts dos módulos |
| M2.0 | 02 — Developer Experience | ✅ Done | Onboarding de novos devs no ecossistema |
| M3.0 | 03 — Integração e Release | 2 sprints | Uso real nos módulos sem depender de src/ TypeScript |
| M4.0 | 04 — Componentes Avançados | 3 sprints | Formulários complexos, modais, notificações robustas |
| M5.0 | 05 — Responsividade | ✅ Done | Suporte mobile nos módulos do ecossistema |
| M6.0 | 06 — DataTable Avançado | ✅ Done | Listas de clientes, agendamentos, transações financeiras com interação real |
| M7.0 | 07 — Tabs & Stepper | 2 sprints | Navegação entre seções em todos os módulos + fluxos de cadastro multi-step |
| M8.0 | 08 — Charts | 3 sprints | Dashboards de métricas em todos os módulos (faturamento, ocupação, performance) |
| M9.0 | 09 — Formulários Avançados | 2 sprints | Upload de fotos de pacientes (Estética IA), formulários de dados complexos |
| M10.0 | 10 — Feedback & Status | 1 sprint | Indicadores de progresso em onboardings e fluxos longos |
| M11.0 | 11 — Calendar & Agenda | 3 sprints | Agendamentos Estética IA M1 (bloqueante para piloto de validação) |
