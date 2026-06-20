# @aiox/ui

Design system do ecossistema AIOX — Clínico Premium.

## Instalação

Este pacote é usado internamente no monorepo. Para usar em outro app do ecossistema:

```json
{
  "dependencies": {
    "@aiox/ui": "workspace:*"
  }
}
```

## Uso

```tsx
import { Button, Input, Label, Badge, Avatar, Icon, Spinner } from '@aiox/ui'

export function Example() {
  return (
    <div>
      <Label htmlFor="email" variant="required">Email</Label>
      <Input id="email" type="email" placeholder="seu@email.com" />
      <Button variant="primary" size="md">Entrar</Button>
    </div>
  )
}
```

## Componentes

| Componente | Descrição |
|------------|-----------|
| Button | Botão com 7 variantes e 5 tamanhos |
| Input | Campo de texto com suporte a ícones e addons |
| Label | Label com variantes required, optional e error |
| Badge | Badge com variantes semânticas |
| Avatar | Avatar com suporte a imagem e iniciais |
| Icon | Wrapper de ícones Lucide |
| Spinner | Indicador de carregamento |

## Design Tokens

O preset Tailwind está disponível em `@aiox/ui/tailwind-preset.js`:

```js
// tailwind.config.js
const aiox = require('@aiox/ui/tailwind-preset')

module.exports = {
  presets: [aiox],
  content: ['...'],
}
```

## Desenvolvimento

```bash
npm test          # roda os testes uma vez
npm run test:watch  # modo watch
```
