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
- Formatação PT-BR: DD/MM/YYYY, R$ 1.234,50

## Dependências do pacote
- `class-variance-authority` (cva) — variantes de componente
- `clsx` + `tailwind-merge` — merge de classes
- `lucide-react` — ícones (tree-shakeable, MIT)
- peerDeps: react ^18, react-dom ^18, tailwindcss ^3

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
