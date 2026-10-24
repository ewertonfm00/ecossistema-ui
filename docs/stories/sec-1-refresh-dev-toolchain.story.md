# Story SEC-1 — Atualizar toolchain de desenvolvimento

> **Status:** Ready for Review
> **Data:** 2026-10-24
> **Base:** `origin/main` em `f7555395`

## Story

**Como** mantenedor do `@aiox/ui`,
**quero** uma cadeia de desenvolvimento sem advisories conhecidos e com gates reproduzíveis,
**para que** testes, tipos, build do pacote e Storybook sejam validados antes de qualquer integração ou release.

## Checklist de aceitação

- [x] **Escopo exato:** atualizar Storybook, Vitest/Vite, dependências compatíveis do Tailwind e runtime de CI; configurar lint/typecheck; registrar evidências.
- [x] **Fora do escopo:** componentes, tokens, classes, comportamento visual, publicação npm, deploy, Estética, Gestão e ClickUp.
- [x] **Arquivos previstos:** `package.json`, `package-lock.json`, configs de lint/tipos/teste, workflows CI/release, `AGENT.md`, `BUGS.md` e esta story.
- [x] **Impacto indireto:** desenvolvimento local e CI passam a exigir Node 22; o peer Tailwind v3 e o preset público permanecem compatíveis.
- [x] **Conclusão:** `npm audit`, lint, typecheck, testes, build do pacote e build Storybook passam sem falhas.
- [x] **Ambiguidade:** qualquer migração que altere o contrato visual/Tailwind do consumidor será bloqueada e não executada nesta story.

## Critérios de aceitação

- [x] As 19 vulnerabilidades inicialmente observadas foram eliminadas do lockfile sem `--force`.
- [x] Storybook permanece na linha compatível 8.6 e compila todas as stories.
- [x] Vitest usa uma versão corrigida e todos os testes existentes passam.
- [x] Tailwind v3 continua sendo o contrato do pacote; tokens e preset permanecem byte a byte inalterados.
- [x] CI executa audit, lint, typecheck, testes, build e Storybook em runtime suportado.
- [x] Revisão staged e verificação de segredos passaram antes do commit.

## Evidências

- Baseline: `npm audit --json` encontrou 19 vulnerabilidades (9 moderadas, 6 altas e 4 críticas), concentradas na cadeia de tooling.
- Baseline: `npx tsc --noEmit` falhava por misturar globals de teste e tipagem de stories ao gate do código publicável.
- `npm audit --audit-level=moderate`: 0 vulnerabilidades.
- `npm run lint`: passou.
- `npm run typecheck`: passou.
- `npm test`: 45 arquivos e 312 testes passaram em Vitest 5.0.5.
- `npm run build`: passou com tsup 9.0.0 e gerou ESM, CJS e declarações.
- `npm run build-storybook`: passou com Storybook 8.6.19 e 2.256 módulos transformados.
- `git diff origin/main -- tailwind-preset.js`: sem diferenças.

## File List

- `docs/stories/sec-1-refresh-dev-toolchain.story.md`
- `.github/workflows/ci.yml`
- `.github/workflows/release.yml`
- `.storybook/main.ts`
- `AGENT.md`
- `BUGS.md`
- `eslint.config.mjs`
- `package.json`
- `package-lock.json`
- `src/atoms/Tooltip/Tooltip.test.tsx`
- `src/molecules/DatePicker/DatePicker.test.tsx`
- `src/molecules/SelectCustom/SelectCustom.test.tsx`
- `src/molecules/SelectCustom/SelectCustom.tsx`
- `src/organisms/Calendar/CalendarPicker.test.tsx`
- `src/organisms/Calendar/DateRangePicker.test.tsx`
- `src/organisms/Calendar/DateRangePicker.tsx`
- `src/organisms/DataTable/DataTable.stories.tsx`
- `tsconfig.typecheck.json`
