# Mapa de Componentes — @aiox/ui

> 18 componentes disponíveis + 1 planejado | Versão 0.1.0

## Átomos (11)

| Componente | Import | Quando usar | Props principais |
|------------|--------|-------------|-----------------|
| `Button` | `import { Button }` | Toda ação do usuário que dispara operação | `variant` (primary/secondary/ghost/danger), `size`, `disabled`, `loading` |
| `Input` | `import { Input }` | Campos de texto, email, senha, número | `type`, `placeholder`, `error`, `disabled` |
| `Label` | `import { Label }` | Rótulo associado a um campo de formulário | `htmlFor`, `required` |
| `Textarea` | `import { Textarea }` | Texto longo, observações, descrições | `rows`, `placeholder`, `error`, `disabled` |
| `Select` | `import { Select }` | Seleção de opção em lista curta (≤10 itens) | `options`, `value`, `onChange`, `error`, `disabled` |
| `Checkbox` | `import { Checkbox }` | Seleção múltipla ou consentimento | `checked`, `indeterminate`, `onChange`, `disabled` |
| `Radio` | `import { Radio }` | Seleção exclusiva entre opções visíveis | `name`, `value`, `checked`, `onChange`, `disabled` |
| `Switch` | `import { Switch }` | Toggle de configuração binária (on/off) | `checked`, `onChange`, `disabled` |
| `Badge` | `import { Badge }` | Status, categoria, contagem pequena | `variant` (success/error/warning/neutral/info), `size` |
| `Skeleton` | `import { Skeleton }` | Placeholder durante carregamento de conteúdo | `height`, `width`, `className` |
| `Icon` | `import { Icon }` | Ícones Lucide em qualquer contexto visual | `name`, `size`, `className`, `aria-label` |

## Moléculas (4)

| Componente | Import | Quando usar | Props principais |
|------------|--------|-------------|-----------------|
| `FormField` | `import { FormField }` | Container de campo com label + mensagem de erro | `label`, `error`, `required`, `children` |
| `Card` | `import { Card }` | Container de conteúdo com borda e sombra sutil | `className`, `children` |
| `Alert` | `import { Alert }` | Mensagem de feedback contextual | `variant` (info/success/error/warning), `children`, `onDismiss` |
| `Toast` | `import { Toast }` | Notificação temporária não-bloqueante | `message`, `variant`, `duration`, `onClose` |

> **Planejado:** `Modal` — diálogo modal com overlay. Disponível no Épico 04.

## Organismos (4)

| Componente | Import | Quando usar | Props principais |
|------------|--------|-------------|-----------------|
| `AppShell` | `import { AppShell }` | Layout root de toda tela autenticada | `sidebar`, `children`, `className` |
| `SidebarNav` | `import { SidebarNav }` | Navegação lateral colapsável com items tipados | `items`, `collapsed`, `onToggleCollapse`, `logo` |
| `PageHeader` | `import { PageHeader }` | Cabeçalho de página com título, breadcrumb e ações | `title`, `breadcrumbs`, `actions` |
| `DataTable` | `import { DataTable }` | Listagem de dados com paginação local | `columns`, `data`, `pageSize`, `loading`, `emptyMessage` |

## Decisão de uso rápida

| Cenário | Componentes |
|---------|------------|
| Tela de login | `div.flex.h-screen` + `Card` + `FormField` + `Input` + `Button` |
| Dashboard com métricas | `AppShell` + `SidebarNav` + `PageHeader` + `Card` (×n métricas) |
| Listagem de dados | `AppShell` + `SidebarNav` + `PageHeader` + `DataTable` |
| Formulário de cadastro | `AppShell` + `SidebarNav` + `PageHeader` + `Card` + `FormField` + inputs variados |
| Empty state | `Alert` (info) + `Card` (centrado) + `Icon` (ilustrativo) |
| Loading de seção | `Skeleton` com `height` e `width` adequados |
| Status em célula de tabela | `Badge` com `variant="success"/"error"/"warning"/"neutral"` |
| Mensagem de feedback | `Alert` (persistente) ou `Toast` (temporário) |

## Ícones disponíveis (Icon atom)

O `Icon` atom expõe um subconjunto curado de Lucide icons. Nomes válidos:

```
AlertCircle · AlertTriangle · Check · CheckCircle2 · ChevronDown · ChevronLeft · ChevronRight
Eye · EyeOff · Info · Loader2 · Search · Shield · Sparkles
User · X · XCircle · Menu · Bell · Settings · LogOut
MoreHorizontal · ArrowLeft · ArrowRight · Plus · Trash2 · Edit · Upload · Download
```

Ícones fora desta lista renderizam um `<span>` vazio (silencioso). Para adicionar novos ícones ao atom, edite `src/atoms/Icon/Icon.tsx` e abra PR.
