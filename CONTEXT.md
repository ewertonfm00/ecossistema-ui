# CONTEXT.md — ecossistema-ui (@aiox/ui)
_Atualizado: 2026-06-20_

## Estado atual
Design system `@aiox/ui` bootstrapado e publicado no GitHub.
Story 0.2 com status **CONCERNS** aguardando fix de QA.

## Pendente
- [ ] Aplicar fixes do `docs/qa/QA_FIX_REQUEST.md` (H1 obrigatório — focus ring Button)
- [ ] Re-validação @qa após os fixes
- [ ] Marcar Story 0.2 como Done após aprovação @qa

## Em progresso
Nenhum.

## Próximo passo imediato
`@dev` aplica H1 + médios do QA_FIX_REQUEST.md → `npm test` verde → notifica @qa.

## Concluído nesta sessão (2026-06-20)
- [x] Bootstrap completo do repo `ecossistema-ui`
- [x] `tailwind-preset.js` com todos os tokens DESIGN.md §13
- [x] 7 átomos: Button, Input, Label, Badge, Avatar, Icon, Spinner
- [x] 35/35 testes passando (vitest + testing-library)
- [x] TypeScript strict, cva, clsx, tailwind-merge
- [x] Publicado em https://github.com/ewertonfm00/ecossistema-ui
- [x] QA Review realizada — gate CONCERNS, fix request gerado
