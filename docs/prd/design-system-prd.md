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
| **01 — Componentes Estendidos** | Átomos de formulário avançado + organismos de layout | 0.3b (8 átomos médios) · 0.4 (4 organismos) | Draft |
| **02 — Developer Experience** | Storybook + documentação interativa + visual regression | 0.5 (Storybook + stories) | Draft |

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
| M1.5 | 01 — Componentes Estendidos | 2 sprints | Dashboards e layouts dos módulos |
| M2.0 | 02 — Developer Experience | 1 sprint | Onboarding de novos devs no ecossistema |
