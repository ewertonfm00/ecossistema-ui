# Migration Checklist — Adotando @aiox/ui nos Módulos

Use este checklist ao migrar telas existentes nos módulos consumidores (Estética IA, Auth, Gestão, ML Lab) para os componentes do `@aiox/ui`.

## Antes de começar

- [ ] `@aiox/ui` instalado: `npm install github:ewertonfm00/ecossistema-ui#main`
- [ ] `tailwind.config.js` configurado com o preset (ver `docs/guides/integration.md`)
- [ ] Testes da tela passando antes da migração (estabelecer linha base)
- [ ] Branch de feature criado: `git checkout -b feat/migrate-{nome-da-tela}`

## Elementos HTML → Componentes @aiox/ui

### Botões

- [ ] `<button className="...">` → `<Button variant="primary|secondary|ghost|danger">`
- [ ] `<button disabled>` → `<Button disabled>` (mantém acessibilidade automaticamente)
- [ ] `<button type="submit">` → `<Button type="submit" variant="primary">`
- [ ] Botão de cancelar → `<Button variant="secondary">`
- [ ] Botão destrutivo (excluir) → `<Button variant="danger">`

### Campos de formulário

- [ ] `<label>` + `<input>` soltos → `<FormField label="..."><Input /></FormField>`
- [ ] `<input type="text">` → `<Input type="text" />`
- [ ] `<input type="email">` → `<Input type="email" />`
- [ ] `<input type="password">` → `<Input type="password" />`
- [ ] `<textarea>` → `<Textarea rows={n} />`
- [ ] `<select>` nativo → `<Select options={[{ value, label }]} />`
- [ ] `<input type="checkbox">` → `<Checkbox checked={...} onChange={...} />`
- [ ] `<input type="radio">` → `<Radio name="..." value="..." checked={...} onChange={...} />`
- [ ] Toggle/switch customizado → `<Switch checked={...} onChange={...} />`
- [ ] Mensagem de erro inline manual → `<FormField error="mensagem">` (elimina div de erro customizado)
- [ ] Campo obrigatório com `*` manual → `<FormField label="..." required>` (adiciona `*` automaticamente)

### Layout

- [ ] `<div className="flex h-screen ...">` com sidebar → `<AppShell sidebar={...}>`
- [ ] `<aside>` de navegação customizada → `<SidebarNav items={[...]} collapsed={...} onToggleCollapse={...} />`
- [ ] `<header>` de página com título + ações → `<PageHeader title="..." actions={<Button>...</Button>}>`
- [ ] Breadcrumb manual → `<PageHeader breadcrumbs={[{ label, href }]} />`
- [ ] Conteúdo com padding padrão → `<div className="p-6">` dentro do `main` do AppShell

### Tabelas

- [ ] `<table>` com paginação manual → `<DataTable columns={[...]} data={[...]} pageSize={10}>`
- [ ] Loading state com spinner → `<DataTable loading={true}>` (usa Skeleton automaticamente)
- [ ] Mensagem "sem dados" manual → `<DataTable emptyMessage="Nenhum registro encontrado">`
- [ ] Célula com lógica de render → `{ key: 'status', render: (v) => <Badge>{String(v)}</Badge> }`

### Feedback e status

- [ ] `<div className="alert alert-danger">` → `<Alert variant="error">`
- [ ] `<div className="alert alert-success">` → `<Alert variant="success">`
- [ ] `<div className="alert alert-warning">` → `<Alert variant="warning">`
- [ ] `<div className="alert alert-info">` → `<Alert variant="info">`
- [ ] Toast/snackbar manual → `<Toast message="..." variant="success" duration={3000}>`
- [ ] Badge de status customizado → `<Badge variant="success|error|warning|neutral">`
- [ ] Skeleton de loading customizado → `<Skeleton height="..." width="..." className="..." />`

### Ícones

- [ ] Qualquer biblioteca de ícones em uso → `<Icon name="..." size={16} />` (verificar nomes válidos em `docs/guides/component-map.md`)
- [ ] Ícone decorativo sem significado → `<Icon name="..." aria-hidden />` (já é o padrão)
- [ ] Ícone com significado semântico → `<Icon name="..." aria-label="Descrição do ícone" aria-hidden={false} />`

## Após a migração

- [ ] `npm test -- --run` → todos os testes passando
- [ ] Verificar visualmente no browser: cores, espaçamento e tipografia consistentes com design system
- [ ] Remover imports de CSS/classes Tailwind hardcoded que foram substituídos pelos componentes
- [ ] Remover dependências de UI que não são mais necessárias (ex: `react-icons`, componentes inline customizados)
- [ ] Verificar acessibilidade: Tab, Enter, Esc navegam corretamente nos formulários
- [ ] Abrir PR — `@devops` (Gage) faz o push e cria PR

## Escopo negativo — não migrar nesta fase

- Validação de formulários (React Hook Form + Zod) — permanece no módulo consumidor
- Gerenciamento de estado global (Zustand, Context API) — permanece no módulo consumidor
- Chamadas de API e fetch — permanecem no módulo consumidor
- Animações customizadas além do que os componentes oferecem — avaliar caso a caso
- Componentes específicos do domínio (CalendarPicker de agendamentos, visualizador de exames) — usar Base + customizar
- Roteamento (React Router, Next.js Router) — permanece no módulo consumidor

## Referências

- `docs/guides/integration.md` — instalação e configuração do Tailwind preset
- `docs/guides/component-map.md` — lista completa de componentes com quando usar
- Storybook: `npm run storybook` no `ecossistema-ui` → visualizar composições reais
