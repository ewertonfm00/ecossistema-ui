# CONTEXT.md — ecossistema-ui (@aiox/ui)
_Atualizado: 2026-06-22_

## Estado atual
Design system `@aiox/ui` com Épicos 01–09 completos. **311/311 testes passando.**
Publicado em `github:ewertonfm00/ecossistema-ui#main` — último commit `1b490f1`.

## Pendente
Nenhum item pendente do roadmap atual.

## Em progresso
Nenhum.

## Próximo passo imediato
Definir Épico 10 ou iniciar integração dos módulos consumidores (Estética IA).

## Catálogo de componentes (2026-06-22)

### Átomos (16)
Button, Input, Label, Badge, Avatar, Icon, Spinner, Checkbox, Radio, Switch, Textarea,
Select (nativo), Tooltip (hover/focus/both), Skeleton, Divider, ProgressBar

### Moléculas (13)
FormField, Card, Alert, Toast, DatePicker, SelectCustom (combobox ARIA),
FileUpload, MultiSelect, RangeSlider, StepIndicator, EmptyState,
Tabs (compound: TabList/Tab/TabPanel), Stepper (compound: StepList/Step/StepPanel)

### Organismos (14)
AppShell, SidebarNav, PageHeader, DataTable (sorting/filtros/seleção/CSV),
Modal, Drawer, ToastProvider,
Charts (BarChart/LineChart/PieChart/AreaChart via recharts),
CalendarPicker, DateRangePicker, AgendaView (semana Mon-first, eventos posicionados absolutamente)

### Pages (5)
LoginPage, DashboardPage, ListingPage, FormPage, EmptyPage

## Histórico de épicos

### Épico 01 — Bootstrap & Core
- [x] Story 0.2 — Bootstrap: 7 átomos + tailwind-preset + CI/CD
- [x] Story 0.3 — Moléculas Core: FormField, Card, Alert, Toast
- [x] Story 0.3b — Átomos Médios: Checkbox, Radio, Switch, Textarea, Select, Tooltip, Skeleton, Divider
- [x] Story 0.4 — Organismos Core: AppShell, SidebarNav, PageHeader, DataTable
- [x] Story 0.5 — Storybook 8.x configurado

### Épico 02 — Build & Release
- [x] Story 1.0 — tsup (ESM+CJS+DTS), CI/CD workflows
- [x] Story 1.1 — Page Compositions (5 páginas)
- [x] Story 1.2 — Integration Guide (docs/guides/)

### Épicos 03–04 — Responsividade + DataTable Avançado
- [x] Story 3.0 — Responsividade mobile-first (184 testes)
- [x] Story 4.0 — DataTable avançado: sorting, filtros, seleção, export CSV (203 testes)

### Épico 05 — Componentes Avançados de Sobreposição
- [x] Story 2.0 — Modal + Drawer (portal, trap focus, Escape)
- [x] Story 2.1 — ToastProvider (Context) + DatePicker (JS puro)
- [x] Story 2.2 — SelectCustom (combobox ARIA) + Tooltip focus/both

### Épico 06 — Upload + Multiseleção + Slider
- [x] Story 6.0 — FileUpload, MultiSelect, RangeSlider

### Épico 07 — Charts + Tabs + Stepper
- [x] Story 7.0 — Charts recharts (Bar/Line/Pie/Area), Tabs compound, Stepper compound

### Épico 08 — Feedback & Estados
- [x] Story 8.0 — ProgressBar (ARIA role=progressbar), StepIndicator (purely visual), EmptyState | commit c5d9744 | 296/296

### Épico 09 — Calendário & Agenda
- [x] Story 9.0 — CalendarPicker (42 cells, keyboard nav), DateRangePicker (2 meses, range+inversion), AgendaView (Mon-first, posição absoluta) | commit 1b490f1 | 311/311
