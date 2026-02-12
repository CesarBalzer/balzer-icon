# Balzer Icon

![npm](https://img.shields.io/npm/v/balzer-icon)
![npm downloads](https://img.shields.io/npm/dm/balzer-icon)
![build](https://img.shields.io/github/actions/workflow/status/CesarBalzer/balzer-icon/release.yml)
![license](https://img.shields.io/npm/l/balzer-icon)

Biblioteca oficial de ícones React do ecossistema Balzer.

Compatível com React 18+, SVG otimizado, tree-shakable, build em ESModule e UMD, com documentação automática via GitHub Pages.

Homepage:
https://cesarbalzer.github.io/balzer-icon/

Package NPM:
https://www.npmjs.com/package/balzer-icon/

---

# Instalação

```bash
yarn add balzer-icon
```

ou

```bash
npm install balzer-icon
```

---

# Uso

```tsx
import { Icon } from 'balzer-icon';

export default function Example() {
  return (
    <Icon name="home" size={24} color="#000" />
  );
}
```

---

# Estrutura do projeto

```
balzer-icon/
├── lib/                # Componentes principais
│   └── Icon.tsx
├── public/
│   └── icons/         # SVGs base
├── utils/
│   └── generateNames  # Script de geração automática
├── docs/              # Documentação (GitHub Pages)
├── dist/              # Build publicado no npm
├── vite.config.ts
├── vite.config.docs.ts
├── package.json
```

---

# Como adicionar um novo ícone

## 1. Adicionar o SVG

Coloque o arquivo em:

```
public/icons/
```

Exemplo:

```
public/icons/user.svg
```

---

## 2. Gerar o mapeamento

```bash
yarn names
```

Esse comando atualiza automaticamente a lista de ícones.

---

## 3. Testar localmente

```bash
yarn dev
```

Ou visualizar docs:

```bash
yarn preview:docs
```

---

# Build

Build da biblioteca:

```bash
yarn build
```

Output:

```
dist/
```

Build da documentação:

```bash
yarn build:docs
```

Output:

```
docs/
```

---

# Deploy

Deploy automático ocorre em:

- push na branch main
- criação de release
- execução manual do workflow

---

# Versionamento

Este projeto usa Conventional Commits.

## feat

Nova funcionalidade

```bash
git commit -m "feat: add new icons"
```

## fix

Correção

```bash
git commit -m "fix: correct icon rendering"
```

## chore

Manutenção

```bash
git commit -m "chore: update dependencies"
```

## docs

Documentação

```bash
git commit -m "docs: update readme"
```

## refactor

Refatoração

```bash
git commit -m "refactor: improve icon loader"
```

## breaking change

```bash
git commit -m "feat!: change icon API"
```

---

# Fluxo completo

```bash
# adicionar ícone
public/icons/new-icon.svg

# gerar nomes
yarn names

# testar
yarn dev

# commit
git add .
git commit -m "feat: add new icon"

# push
git push origin main
```

---

# Desenvolvimento local

```bash
yarn install
yarn dev
```

---

# Arquitetura interna

A biblioteca é construída usando:

- Vite (build tool)
- TypeScript
- Rollup (via Vite)
- SVG como fonte primária
- geração automática de tipos
- output em ESModule e UMD

Fluxo interno:

```
SVG → generateNames → Icon component → Vite build → dist → npm publish
```

React é definido como peerDependency para evitar duplicação.

---

# Contribuição

Passos:

```bash
git clone https://github.com/CesarBalzer/balzer-icon
cd balzer-icon

yarn install
```

Criar branch:

```bash
git checkout -b feat/new-icons
```

Adicionar ícones e gerar nomes:

```bash
yarn names
```

Commit:

```bash
git commit -m "feat: add new icons"
```

Push:

```bash
git push origin feat/new-icons
```

Criar Pull Request.

---

# Licença

MIT

---

Autor: Cesar Balzer
