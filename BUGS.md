# BUGS — ecossistema-ui

> Append-only. NUNCA sobrescrever — sempre acrescentar NO TOPO. Nunca deletar bugs — marcar ✅ Corrigido com data.
> Formato:
> ## [YYYY-MM-DD] — Nome do bug
> **Sintoma:** o que o usuário vê
> **Causa raiz:** por que acontece
> **Correção:** o que foi feito
> **Arquivos afetados:** lista
> **Status:** ✅ Corrigido | ⚠️ Aberto
> **Risco de voltar:** Alto | Médio | Baixo — motivo

---

## [2026-10-24] — Toolchain acumulava 19 vulnerabilidades e Storybook não resolvia imports absolutos
**Sintoma:** `npm audit` reportava 19 vulnerabilidades na cadeia de desenvolvimento; lint/typecheck não eram gates reproduzíveis e o build estático do Storybook falhava ao resolver imports com `@/`.
**Causa raiz:** Storybook, Vitest/Vite, tsup e transitivas estavam desatualizados; o typecheck misturava código publicável com testes/stories; o Storybook não compartilhava o alias TypeScript.
**Correção:** Dependências foram atualizadas seletivamente, transitivas vulneráveis receberam overrides estreitos, CI/release passaram para Node 22, lint/typecheck foram configurados e o alias `@` foi declarado no `viteFinal` do Storybook. Nenhum token, preset Tailwind, componente ou contrato visual foi alterado.
**Arquivos afetados:** `package.json`, `package-lock.json`, `eslint.config.mjs`, `tsconfig.typecheck.json`, `.storybook/main.ts`, `.github/workflows/ci.yml`, `.github/workflows/release.yml`, arquivos de teste/lint listados na Story SEC-1
**Status:** ✅ Corrigido — 2026-10-25; PR #3 integrada em `main` (`10fcc208`) e workflow `CI` aprovado no run `40060032091`
**Risco de voltar:** Baixo — audit, lint, typecheck, testes, build do pacote e build Storybook agora são gates explícitos de CI.

## [2026-10-20] — CI coletava testes internos do framework AIOX
**Sintoma:** O workflow `CI` falhava no step de testes por arquivos dentro de `.aiox-core`, mesmo quando os testes do design system estavam corretos.
**Causa raiz:** O Vitest não definia `include` para o produto e o `exclude` não cobria `.aiox-core/**`.
**Correção:** A descoberta foi limitada a `src/**/*.{test,spec}.{ts,tsx}` e `.aiox-core/**` foi excluído defensivamente. A validação local executou 45 arquivos e 311 testes com sucesso.
**Arquivos afetados:** `vitest.config.ts`, `.github/workflows/ci.yml`, `.github/workflows/release.yml`, `docs/stories/ci-1.otimizar-workflows.story.md`
**Status:** ✅ Corrigido — 2026-10-21; PR #1 integrada em `main`; a validação consolidada do commit `10fcc208` permaneceu verde no run `40060032091`
**Risco de voltar:** Baixo — o `include` explícito impede que novos diretórios de tooling entrem na coleta.
