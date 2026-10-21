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

## [2026-10-20] — CI coletava testes internos do framework AIOX
**Sintoma:** O workflow `CI` falhava no step de testes por arquivos dentro de `.aiox-core`, mesmo quando os testes do design system estavam corretos.
**Causa raiz:** O Vitest não definia `include` para o produto e o `exclude` não cobria `.aiox-core/**`.
**Correção:** A descoberta foi limitada a `src/**/*.{test,spec}.{ts,tsx}` e `.aiox-core/**` foi excluído defensivamente. A validação local executou 45 arquivos e 311 testes com sucesso.
**Arquivos afetados:** `vitest.config.ts`, `.github/workflows/ci.yml`, `.github/workflows/release.yml`, `docs/stories/ci-1.otimizar-workflows.story.md`
**Status:** ✅ Corrigido — 2026-10-20; aguarda integração do PR
**Risco de voltar:** Baixo — o `include` explícito impede que novos diretórios de tooling entrem na coleta.
