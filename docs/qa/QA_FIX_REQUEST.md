# QA Fix Request — Story 0.2
**Gerado por:** @qa (Quinn) · **Data:** 2026-06-20
**Gate:** CONCERNS — corrigir antes de marcar Done

---

## ALTO — Obrigatório

### H1 · Button: Focus ring ausente em `secondary`, `ghost`, `soft`, `link`

**Arquivo:** `src/atoms/Button/Button.tsx`
**Violação:** DESIGN.md §20.2 + WCAG AA — elementos interativos DEVEM ter foco visível.
**Problema:** `focus-visible:outline-none` remove o ring nativo do browser sem substituto nessas variantes.

**Correção:** adicionar `focus:shadow-focus` em todas as variantes que não têm anel de foco:

```tsx
// Na cva, em cada variante faltante:
secondary:          '... focus:shadow-focus',
ghost:              '... focus:shadow-focus',
soft:               '... focus:shadow-focus',
link:               '... focus:shadow-focus',
```

---

## MÉDIO — Recomendado no mesmo commit

### M1 · Input: Border-radius não ajusta ao lado do addon

**Arquivo:** `src/atoms/Input/Input.tsx`
**Problema:** quando `leftAddon` ou `rightAddon` está presente, o input mantém `rounded-md` em todos os cantos, criando radius duplo visualmente incorreto.

**Correção:** ajustar o `inputClass` para remover radius no lado do addon:

```tsx
const inputClass = cn(
  'w-full border rounded-md outline-none transition-shadow placeholder:text-neutral-400 bg-white',
  sizeClasses[size],
  stateClasses[effectiveState],
  leftIcon && 'pl-9',
  rightIcon && 'pr-9',
  leftAddon && 'rounded-l-none',   // adicionar
  rightAddon && 'rounded-r-none',  // adicionar
  className,
)
```

---

### M2 · Input: Fundo explícito ausente

**Arquivo:** `src/atoms/Input/Input.tsx`
**Problema:** `bg-white` não declarado. Em contextos sem Tailwind base styles completo, o input pode herdar fundo transparente.
**Correção:** adicionar `bg-white` ao `inputClass` base (já incluído em M1 acima).

---

### M3 · Label: Asterisco `required` usa `text-error-500` em vez de `text-accent-600`

**Arquivo:** `src/atoms/Label/Label.tsx`
**Spec:** DESIGN.md §9.1 + Story critério 6 → asterisco em `text-accent-600`
**Problema:** implementado como `text-error-500` (vermelho puro) em vez de `text-accent-600` (rose-wine).

**Correção:**
```tsx
// Linha 24 — trocar:
<span className="ml-0.5 text-error-500">*</span>
// Por:
<span className="ml-0.5 text-accent-600">*</span>
```

---

### M4 · Badge: Cores fora do token system

**Arquivo:** `src/atoms/Badge/Badge.tsx`
**Violação:** DESIGN.md §25 Checklist — "Nenhum valor de cor hardcoded — apenas tokens do design system"
**Problema:** `text-green-700`, `text-yellow-700`, `text-red-700`, `text-blue-700` são tokens Tailwind puros, não do preset.

**Correção:** usar tokens do preset (success/warning/error/info):

```tsx
const variantSoftClasses: Record<string, string> = {
  default:  'bg-neutral-100 text-neutral-700',
  primary:  'bg-primary-100 text-primary-700',
  success:  'bg-success-50 text-success-600',   // era text-green-700
  warning:  'bg-warning-50 text-warning-600',   // era text-yellow-700
  error:    'bg-error-50 text-error-600',        // era text-red-700
  info:     'bg-info-50 text-info-500',          // era text-blue-700
}

const variantOutlineClasses: Record<string, string> = {
  default:  'bg-transparent text-neutral-600 border border-neutral-200',
  primary:  'bg-transparent text-primary-600 border border-primary-200',
  success:  'bg-transparent text-success-600 border border-success-500',  // era text-green-700
  warning:  'bg-transparent text-warning-600 border border-warning-500',  // era text-yellow-700
  error:    'bg-transparent text-error-600 border border-error-500',      // era text-red-700
  info:     'bg-transparent text-info-500 border border-info-500',        // era text-blue-700
}
```

---

### M5 · Button: `aria-busy` ausente no estado loading

**Arquivo:** `src/atoms/Button/Button.tsx`
**Spec:** DESIGN.md §20.4
**Correção:**
```tsx
<button
  ref={ref}
  disabled={disabled || loading}
  aria-busy={loading || undefined}   // adicionar
  ...
>
```

---

### M6 · Button: Press feedback `active:scale-[0.97]` ausente

**Arquivo:** `src/atoms/Button/Button.tsx`
**Spec:** DESIGN.md §18.4 — "Botão clicado: active:scale-[0.97] transition-transform duration-75"
**Correção:** adicionar à classe base do cva:

```tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.97] transition-transform duration-75',
  ...
)
```

---

## Após as correções

1. Rodar `npm test` — todos os 35 testes devem continuar passando
2. Atualizar os testes de Button para cobrir `focus:shadow-focus` nas variantes corrigidas
3. Notificar @qa para re-validação
