# Épico 06 — DataTable Avançado

> **Versão:** 1.0 | **Data:** 2026-06-22 | **Autor:** @pm (Morgan)
> **Status:** Draft → Ready for Story Creation
> **Marco:** M6.0 | **Estimativa:** 2 sprints
> **Bloqueante para:** Estética IA M1 (lista de clientes/agendamentos), AIOX Gestão (transações financeiras), ML Lab (datasets)

---

## Contexto e Motivação

O `DataTable` atual (Story 0.4) exibe dados tabulares com paginação e loading skeleton — funcional para prototipação, mas insuficiente para uso real nos módulos consumidores.

As gestoras de clínicas de estética precisam:
- **Ordenar** a lista de clientes por nome, última visita, valor gasto
- **Filtrar** agendamentos por status (pendente, confirmado, cancelado, concluído)
- **Selecionar** múltiplos registros para ações em lote (enviar mensagem, remarcar, exportar)
- **Exportar** relatórios financeiros em CSV para controle ou importação em planilhas
- **Ver estados vazios claros** com chamada para ação (ex: "Nenhum agendamento hoje — [+ Novo Agendamento]")

Sem essas funcionalidades no design system, cada módulo implementa sua própria versão — criando divergência visual e duplicação de código.

---

## Objetivo

Transformar o `DataTable` em um componente de produção com sorting, filtering por coluna, seleção de linhas, export CSV e empty state com ação — mantendo zero breaking change para quem já usa a versão atual.

---

## Escopo do Épico (Story 4.0)

### O que entra

| Feature | Prioridade | Módulos que usam |
|---------|-----------|-----------------|
| **Sorting por coluna** (clique no header) | Must Have | Todos |
| **Filtro de coluna** (input ou select por coluna) | Must Have | Estética IA, Gestão |
| **Seleção de linhas** (checkbox + ação em lote) | Must Have | Estética IA, ML Lab |
| **Export CSV** (selecionados ou todos) | Must Have | Gestão, ML Lab |
| **Empty state com slot de ação** | Must Have | Todos |
| **Coluna de ações** (slot de botões por linha) | Should Have | Todos |
| **Indicador de filtro ativo** (badge no header) | Should Have | Estética IA |

### O que NÃO entra (fora de escopo)

- Virtualização de lista (react-virtual) — máx. ~500 linhas sem virtualização
- Edição inline de células — responsabilidade dos módulos
- Colunas redimensionáveis via drag — Épico 07 se necessário
- Agrupamento de linhas (row grouping) — fora de escopo
- Gráficos embutidos na tabela — Épico 08 (charts)
- Server-side pagination/sorting — o DataTable gerencia client-side; integração server é responsabilidade dos módulos
- Dark mode — fora de escopo global

---

## Detalhamento Técnico

### Interface atualizada (zero breaking change — todos os novos props são opcionais)

```ts
interface DataTableColumn<T> {
  key: keyof T | string
  header: string
  render?: (value: unknown, row: T) => React.ReactNode
  width?: string
  // NOVOS:
  sortable?: boolean              // padrão: false — exibe ícone de sort no header
  filterable?: boolean            // padrão: false — exibe input de filtro abaixo do header
  filterType?: 'text' | 'select' // padrão: 'text'
  filterOptions?: { value: string; label: string }[] // apenas para filterType='select'
}

interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[]
  data: T[]
  pageSize?: number
  emptyMessage?: string
  loading?: boolean
  className?: string
  // NOVOS:
  selectable?: boolean             // padrão: false — exibe coluna de checkbox
  onSelectionChange?: (selected: T[]) => void
  exportable?: boolean             // padrão: false — exibe botão "Exportar CSV"
  exportFilename?: string          // padrão: 'export'
  emptyAction?: React.ReactNode    // slot para CTA no empty state
  actionsColumn?: (row: T) => React.ReactNode // slot de ações por linha
}
```

### Comportamento de sorting

- Clique no header de coluna `sortable=true` → ordena ASC
- Segundo clique → ordena DESC
- Terceiro clique → remove ordenação (volta à ordem original)
- Ícone: `ArrowUpDown` (neutro) → `ArrowUp` (ASC) → `ArrowDown` (DESC)
- Apenas uma coluna ordenada por vez (sort simples, não multi-column)
- Sorting é client-side sobre `data` completo (não só a página atual)

### Comportamento de filtering

- Input de texto abaixo do header (quando `filterable=true` e `filterType='text'`)
- Select dropdown abaixo do header (quando `filterType='select'`)
- Filtros são case-insensitive e operam sobre o valor renderizado da coluna
- Badge no header mostrando quantos filtros estão ativos (`N filtros ativos`)
- Botão "Limpar filtros" aparece quando há ao menos 1 filtro ativo
- Filtering + sorting + paginação operam em conjunto (filtering reduz o dataset antes do sort e paginação)

### Comportamento de seleção

- Checkbox na primeira coluna quando `selectable=true`
- Checkbox no header seleciona/deseleciona todos os da página atual
- `onSelectionChange` chamado com array de linhas selecionadas
- Linhas selecionadas têm background `bg-primary-50`
- Contador "N selecionados" aparece acima da tabela quando há seleção

### Export CSV

- Botão "Exportar CSV" no canto superior direito quando `exportable=true`
- Se há linhas selecionadas: exporta apenas as selecionadas
- Se não há seleção: exporta todos os dados filtrados (não paginado)
- Headers do CSV = `column.header` de cada coluna
- Valores do CSV = valor bruto do campo (não o render — o render pode ser JSX)
- Encoding UTF-8 com BOM (para Excel PT-BR reconhecer acentos)

### Empty state

```tsx
// Quando data=[] e loading=false:
<div className="flex flex-col items-center justify-center py-12 text-center">
  <Icon name="Inbox" size={40} className="text-neutral-300 mb-3" />
  <p className="text-sm text-neutral-500">{emptyMessage}</p>
  {emptyAction && <div className="mt-4">{emptyAction}</div>}
</div>
```

---

## Stories do Épico

| Story | Título | Estimativa |
|-------|--------|-----------|
| **4.0** | DataTable Avançado — sorting, filtering, seleção, export, empty state | L (Large) |

Uma única story grande em vez de múltiplas pequenas — o DataTable é um único componente e dividir criaria dependências desnecessárias.

---

## Critérios de Sucesso do Épico

| Critério | Métrica |
|----------|---------|
| Backward compat | Todos os 5 testes existentes do DataTable continuam passando |
| Sorting | Ordena corretamente strings, números e datas |
| Filtering | Filtros por texto e select reduzem o dataset corretamente |
| Seleção | `onSelectionChange` recebe o array correto após seleção/deselecção |
| Export | CSV gerado contém headers e dados corretos com UTF-8 BOM |
| Empty state | Slot `emptyAction` renderiza CTA abaixo da mensagem |
| Testes | Mínimo 10 novos testes (sorting, filtering, seleção, export, empty action) |
| TypeScript | Sem `any`, sem `!` non-null, DTS build limpo |

---

## Impacto nos Módulos Consumidores

| Módulo | Ganho imediato |
|--------|---------------|
| Estética IA | Lista de clientes com sort por nome/data + filtro por status |
| AIOX Gestão | Tabela financeira com sort por valor/data + export CSV |
| ML Lab | Dataset table com seleção de linhas para operações em lote |
| AIOX Auth | Tabela de usuários com sort + filtro por role |

---

## Riscos

| Risco | Probabilidade | Mitigação |
|-------|--------------|-----------|
| Performance com 500+ linhas (filtering/sorting client-side) | Médio | Documentar limite de 500 linhas; virtualização é Épico 07 |
| Export CSV quebrar caracteres PT-BR no Excel | Alto | UTF-8 BOM obrigatório (`﻿` no início do arquivo) |
| Coluna de ações conflitar com coluna de seleção visualmente | Baixo | Ações sempre na última coluna; seleção sempre na primeira |

---

## Change Log

| Data | Agente | Ação |
|------|--------|------|
| 2026-06-22 | @pm (Morgan) | Épico criado — DataTable Avançado, prioridade M1 para módulos consumidores |
