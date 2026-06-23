# Knowledge Base — ecossistema-ui

## Produto
`@aiox/ui` é o design system compartilhado do ecossistema AIOX.
Instalado como git dependency (não npm): `github:ewertonfm00/ecossistema-ui#main`.

## Público-alvo dos módulos consumidores
Gestoras de clínicas de estética brasileiras — interface deve ser clínica, profissional, confiável.

## Estilo visual: Clínico Premium
- Cor primária: Teal `#0D9488` (primary-600) / botões usam primary-700 (#0F766E, WCAG AA 5.48:1)
- CTA de alto impacto: Rose-wine `#E11D48` (accent-600)
- Neutros: Slate
- Tipografia: Inter (Google Fonts)
- Border radius padrão: 6px (rounded-md)
- Animações: 200ms base, ease-in-out

## Módulos do ecossistema que consomem @aiox/ui
| Módulo | Cor de módulo | Status |
|--------|--------------|--------|
| AIOX Auth | Slate #475569 | — |
| Estética IA | Teal #0D9488 (= primary) | M1 — piloto de validação |
| AIOX Marketing | Violet #7C3AED | — |
| AIOX Gestão | Amber #D97706 | — |
| ML Laboratory | Indigo #4338CA | — |

## Regras de desenvolvimento dos componentes
- Sem cores hardcoded — apenas tokens do preset
- WCAG AA obrigatório em todos os estados (4.5:1 texto normal, 3:1 texto grande)
- Focus ring visível em todos os elementos interativos (shadow-focus)
- Disabled: opacity-50, nunca cor diferente
- Validação de formulário: onBlur (não onChange)
- Formatação PT-BR: DD/MM/AAAA, R$ 1.234,50

## Dependências do pacote
- `class-variance-authority` (cva) — variantes de componente
- `clsx` + `tailwind-merge` — merge de classes
- `lucide-react` — ícones (tree-shakeable, MIT)
- `recharts` — charts (BarChart, LineChart, PieChart, AreaChart) — peer do pacote
- peerDeps: react ^18, react-dom ^18, tailwindcss ^3
- `tsup` — build ESM+CJS+DTS (Story 1.0)
- `@storybook/react-vite` — documentação visual (Story 0.5)
- Zero dependências de date (calendário usa `Date` nativo + `Intl.DateTimeFormat`)

## Catálogo de componentes (2026-06-22)

### Átomos (16)
Button, Input, Label, Badge, Avatar, Icon, Spinner, Checkbox, Radio, Switch, Textarea,
Select (nativo), Tooltip (trigger: hover/focus/both), Skeleton, Divider, ProgressBar

### Moléculas (13)
FormField, Card, Alert, Toast (componente), DatePicker, SelectCustom (combobox ARIA),
FileUpload, MultiSelect, RangeSlider,
StepIndicator (puramente visual, sem onClick),
EmptyState (com ação opcional via Button),
Tabs (compound: TabList/Tab/TabPanel via Context API),
Stepper (compound: StepList/Step/StepPanel via Context API)

### Organismos (14)
AppShell, SidebarNav, PageHeader, DataTable (sorting, filtros, seleção, export CSV),
Modal, Drawer, ToastProvider,
Charts (BarChart/LineChart/PieChart/AreaChart via recharts),
CalendarPicker (grid 42 células, keyboard nav, disabled callback),
DateRangePicker (2 meses, hover preview, inversão automática de range),
AgendaView (semana Mon-first, SLOT_HEIGHT=60px/hora, evento posicionado absolutamente)

### Pages (5)
LoginPage, DashboardPage, ListingPage, FormPage, EmptyPage

## Padrões arquiteturais estabelecidos
- Barrel index.ts por componente: `export { X } from './X'` + `export type { XProps } from './X'`
- cn() utility (clsx + tailwind-merge) em todo componente para merge de classes
- ReactDOM.createPortal para componentes de overlay (Modal, Drawer, ToastProvider)
- Context API para estado global de UI (useToast / ToastProvider, Tabs, Stepper)
- useId() para IDs ARIA (aria-labelledby, aria-describedby) — evita colisões em SSR
- handleContainerBlur com relatedTarget para detectar click fora de dropdowns
- Compound component pattern: Context.Provider no pai + useContext nos filhos
- `role="progressbar"` com aria-valuenow/min/max para ProgressBar
- `role="grid"` + `role="gridcell"` para calendários
- `role="status"` + aria-label para EmptyState

## Nomeclatura de tipos (convenções para evitar colisões no barrel)
- SelectOption — tipo do átomo Select nativo (src/atoms/Select)
- SelectCustomOption — tipo do SelectCustom molecule (src/molecules/SelectCustom)
- Toast (interface) → exportado como ToastItem no barrel para não conflitar com componente Toast
- SidebarNavItem — exportado junto com SidebarNavProps
- BreadcrumbItem — exportado junto com PageHeaderProps
- DataTableColumn — exportado junto com DataTableProps
- DateRange — interface `{ start: Date | null; end: Date | null }` do DateRangePicker
- AgendaEvent — interface `{ id, title, start, end, color?, description? }` do AgendaView

## Configuração Tailwind nos módulos consumidores
```js
const aiox = require('@aiox/ui/tailwind-preset')
module.exports = {
  presets: [aiox],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@aiox/ui/src/**/*.{ts,tsx}',
  ],
}
```

## Armadilhas conhecidas (gotchas de teste)
- `new Date('YYYY-MM-DD')` é UTC no Node.js. Em UTC-3 (Brasil), `new Date('2026-06-01').getMonth()` = 4 (maio). Usar sempre `new Date(year, month-1, day)` em testes
- `vi.useFakeTimers()` pode interferir em componentes React que usam `useEffect` — preferir testes dinâmicos com `new Date()` real para testes de "hoje"
- React 18 batching: dois `fireEvent.click` consecutivos em componente controlado podem não ver estado atualizado do primeiro clique — usar `rerender` explícito entre eles
- ProgressBar: `.getByRole('progressbar')` retorna o div com role, não o container. Para verificar classes do container usar `.parentElement`
- recharts em JSDOM: requer mock de `ResizeObserver` e `getBoundingClientRect` em `test-setup.ts`
