# Story CI-1 — Otimizar workflows do design system

> **Status:** InProgress — configuração concluída; bloqueada por gates legados do projeto
> **Data:** 2026-10-20
> **Origem:** auditoria de CI dos projetos do ecossistema
> **Branch:** `task/ci-1-optimize-workflows`

## Story

**Como** mantenedor do `@aiox/ui`,
**quero** que o CI teste somente o código do design system e que o release não repita os mesmos gates,
**para que** falhas do framework AIOX não gerem falso negativo e cada publicação execute teste e build uma única vez.

## Checklist de execução e aceitação

- [x] **O que vai ser feito:** limitar o Vitest a `src/**/*.{test,spec}.{ts,tsx}`, excluir `.aiox-core`, simplificar os comandos de teste, cancelar execuções CI obsoletas e evitar repetição de lifecycle no publish.
- [x] **O que NÃO vai ser tocado:** componentes, API pública, versão do pacote, dependências, secrets, rulesets, deploy, publicação npm e merge.
- [x] **Arquivos previstos:** `vitest.config.ts`, `.github/workflows/ci.yml`, `.github/workflows/release.yml`, esta story, `BUGS.md` e `AGENT.md`.
- [x] **Impacto indireto:** o check CI deixa de coletar testes internos de `.aiox-core`; tags continuam testando e buildando antes do publish.
- [ ] **Critérios de conclusão:** testes de produto e YAML válidos; typecheck/build legados ainda falham; lint não está configurado; diff/segredos revisados; branch enviada e PR aberto para `main`.
- [x] **Ambiguidade:** ausência de lint configurado será registrada como lacuna, sem introduzir uma ferramenta nova fora desta story.

## Critérios de aceitação

1. Vitest coleta apenas arquivos de teste dentro de `src/` e ignora `.aiox-core/**`.
2. O workflow `CI` mantém `push main` e `pull_request main`, usa `npm test` e cancela execução anterior da mesma referência.
3. O workflow `Release` mantém steps explícitos de teste e build.
4. O publish usa `npm publish --ignore-scripts --access public`, pois `prepublishOnly` é o único lifecycle npm relevante e os gates já foram executados no job.
5. Nenhum pacote é publicado por esta story.
6. O PR para `main` executa o CI corrigido antes de qualquer merge.

## Evidência de causa

O `vitest.config.ts` não possuía `include` e não excluía `.aiox-core`. A execução mais recente do CI coletou testes internos do framework, com falhas por dependências e globais que não pertencem ao produto. O `package.json` define `test` como `vitest run`, portanto `npm test -- --run` era redundante. O mesmo arquivo possui somente `prepublishOnly` entre os lifecycles de publicação; o release executava teste/build explicitamente e `npm publish` acionaria ambos novamente.

## Tasks

- [x] Restringir descoberta de testes no Vitest.
- [x] Simplificar comando e adicionar concorrência no CI.
- [x] Preservar gates visíveis e impedir lifecycle duplicado no release.
- [x] Executar e registrar validações locais.
- [x] Revisar diff staged e segurança.
- [x] Commitar, enviar e abrir PR sem merge — PR #1 aberto como draft para `main`.

## File List

| Arquivo | Ação |
|---|---|
| `vitest.config.ts` | Restringir `include` e excluir `.aiox-core` |
| `.github/workflows/ci.yml` | Simplificar teste e adicionar concorrência |
| `.github/workflows/release.yml` | Evitar repetição do `prepublishOnly` |
| `docs/stories/ci-1.otimizar-workflows.story.md` | Registrar escopo e evidências |
| `BUGS.md` | Registrar a correção do falso negativo |
| `AGENT.md` | Atualizar estado atual ao encerrar |

## Resultados de validação

- `npm test`: **PASS** — 45 arquivos, 311 testes, 39,56 s; somente `src/**` foi coletado.
- `npm run build`: **FAIL preexistente** — DTS para em `src/organisms/Calendar/CalendarPicker.tsx:78` (`TS2722`); nenhum arquivo em `src/` foi alterado por esta story.
- `npx tsc --noEmit`: **FAIL preexistente** — o `tsconfig` não carrega globais do Vitest/Node e há erros existentes em stories/componentes.
- lint: **indisponível** — não há script `lint`, dependência ou configuração ESLint/Biome no projeto; adicionar uma ferramenta ficou fora do escopo desta correção.
- YAML/TypeScript: **sintaxe válida** — Prettier 3.4.2 analisou os três arquivos sem erro de parse; apenas reportou estilo não formatado do padrão já existente.
- `git diff --check`: **PASS**.
- `git diff origin/main -- src`: **vazio**, confirmando que os bloqueios de produto não foram introduzidos nesta branch.
- CI remoto do PR #1: testes passaram e o job avançou até o build; falhou no mesmo `CalendarPicker.tsx:78` (`TS2722`) reproduzido localmente. CodeRabbit remoto: **PASS**.

## Change Log

| Data | Agente | Ação |
|---|---|---|
| 2026-10-20 | @devops (Gage) | Story criada e configuração inicial implementada |
| 2026-10-20 | @devops (Gage) | 311 testes passaram; bloqueios preexistentes de build/typecheck/lint registrados sem ampliar escopo |
| 2026-10-20 | @devops (Gage) | Commit enviado e PR #1 draft aberto; CI remoto confirmou o bloqueio legado de DTS |
