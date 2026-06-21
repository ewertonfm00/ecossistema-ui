# CONTEXT.md — ecossistema-ui (@aiox/ui)
_Atualizado: 2026-06-21_

## Estado atual
Design system `@aiox/ui` com Épicos 01–04 completos. 178/178 testes passando.
Publicado em `github:ewertonfm00/ecossistema-ui#main` — commit `6ab4d38`.

## Pendente
- [ ] Épico 05 — Responsividade (Story 3.0)
- [ ] Draftar stories do Épico 05 com @sm

## Em progresso
Nenhum.

## Próximo passo imediato
`@sm` draftar Story 3.0 do Épico 05 (Responsividade) com base no planejamento existente.

## Histórico de épicos

### Épico 01 — Bootstrap & Core (Stories 0.2, 0.3, 0.3b, 0.4, 0.5)
- [x] Story 0.2 — Bootstrap: 7 átomos + tailwind-preset.js + CI/CD
- [x] Story 0.3 — Moléculas Core: FormField, Card, Alert, Toast
- [x] Story 0.3b — Átomos Médios: Checkbox, Radio, Switch, Textarea, Select, Tooltip, Skeleton, Divider
- [x] Story 0.4 — Organismos Core: AppShell, SidebarNav, PageHeader, DataTable
- [x] Story 0.5 — Storybook 8.x configurado

### Épico 02 — Build & Release (Stories 1.0, 1.1, 1.2)
- [x] Story 1.0 — Build/Release: tsup (ESM+CJS+DTS), .github/workflows/ci.yml + release.yml
- [x] Story 1.1 — Page Compositions: LoginPage, DashboardPage, ListingPage, FormPage, EmptyPage
- [x] Story 1.2 — Integration Guide: docs/guides/ (integration.md, component-map.md, migration-checklist.md)

### Épico 03 (concluído 2026-06-21)
- [x] 142 testes passando ao final do Épico 03

### Épico 04 — Componentes Avançados (Stories 2.0, 2.1, 2.2)
_Concluído 2026-06-21 | commit 6ab4d38 | 178/178 testes_
- [x] Story 2.0 — Modal + Drawer (portal, trap focus, Escape, body scroll lock, ARIA)
- [x] Story 2.1 — ToastProvider (Context API + portal + auto-dismiss) + DatePicker (JS puro, máscara DD/MM/AAAA)
- [x] Story 2.2 — SelectCustom (combobox ARIA, searchable, multiple, clearable, groups) + Tooltip trigger focus/both
- [x] src/index.ts corrigido: exports de organismos que estavam faltando + todos os novos componentes
