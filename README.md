# 🔐 CifraAriane - Tradutor de Cifras

Um tradutor de cifras interativo que converte entre símbolos e letras baseado em um mapeamento de teclado.

## ✨ Funcionalidades

- **🔓 Decifrar**: Converte símbolos cifrados em letras legíveis
- **🔒 Cifrar**: Converte texto normal em símbolos secretos
- **⌨️ Teclado Virtual**: Clique nos símbolos para adicionar ao texto
- **📋 Tabela de Referência**: Visualize todas as correspondências símbolo-letra
- **📱 Responsivo**: Funciona perfeitamente em desktop e mobile

## 🎯 Como Usar

1. Escolha o modo: **Decifrar** (símbolos → letras) ou **Cifrar** (letras → símbolos)
2. Digite o texto ou clique nos símbolos do teclado virtual
3. O resultado aparece automaticamente na área de saída

### Exemplo
- **Cifrado**: `]÷#=[`
- **Decifrado**: `pedro`

## 🚀 Tecnologias

- **Next.js 16** - Framework React com App Router
- **TypeScript** - JavaScript com tipagem estática
- **Tailwind CSS 4** - Estilização responsiva
- **Bun** - Runtime JavaScript rápido

## 📦 Instalação

```bash
# Instalar dependências
bun install

# Desenvolvimento
bun run dev

# Build de produção
bun run build

# Iniciar servidor de produção
bun start
```

## 🌐 Deploy no Railway

### Pré-requisitos
- Conta no [Railway](https://railway.com)
- Repositório no GitHub

### Passos

1. **Subir para o GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/SEU_USUARIO/CifraAriane.git
   git push -u origin main
   ```

2. **Criar projeto no Railway**:
   - Acesse [railway.com](https://railway.com)
   - Clique em "New Project"
   - Selecione "Deploy from GitHub repo"
   - Escolha o repositório CifraAriane

3. **Deploy automático**:
   - Railway detectará automaticamente que é um projeto Next.js
   - O build e deploy serão feitos automaticamente

## 📋 Tabela de Cifras

| Símbolo | Letra | Símbolo | Letra | Símbolo | Letra |
|---------|-------|---------|-------|---------|-------|
| + | q | × | w | ÷ | e |
| = | r | / | t | _ | y |
| < | u | > | i | [ | o |
| ] | p | ! | a | @ | s |
| # | d | $ | f | % | g |
| ^ | h | & | j | * | k |
| ( | l | ) | ç | - | z |
| ' | x | " | c | : | v |
| ; | b | , | n | ? | m |

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx      # Layout raiz
│   ├── page.tsx        # Página principal do tradutor
│   └── globals.css     # Estilos globais
├── components/
│   └── ui/             # Componentes shadcn/ui
├── hooks/              # Custom hooks
└── lib/                # Utilitários
```

## 📄 Licença

MIT
