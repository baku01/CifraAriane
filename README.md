# CifraAriane

Sistema de tradução de cifras interativo que converte entre símbolos e letras baseado em um mapeamento de teclado padrão.

## Visão Geral

O CifraAriane é uma aplicação web que permite a conversão bidirecional entre texto cifrado (representado por símbolos especiais) e texto legível. O sistema utiliza um mapeamento baseado no layout de teclado para realizar as conversões de forma intuitiva.

## Funcionalidades

- **Decodificação**: Conversão de símbolos cifrados em texto legível
- **Codificação**: Conversão de texto normal em representação simbólica
- **Teclado Virtual**: Interface interativa para entrada de símbolos via clique
- **Tabela de Referência**: Visualização completa do mapeamento símbolo-letra
- **Design Responsivo**: Compatibilidade com dispositivos desktop e móveis

## Stack Tecnológica

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| Next.js | 16.x | Framework React com App Router |
| TypeScript | 5.x | Tipagem estática |
| Tailwind CSS | 4.x | Estilização responsiva |
| Bun | 1.x | Runtime JavaScript |
| shadcn/ui | - | Biblioteca de componentes |

## Instalação

### Pré-requisitos

- [Bun](https://bun.sh) instalado (versão 1.x ou superior)

### Configuração Local

```bash
# Clonar o repositório
git clone https://github.com/SEU_USUARIO/CifraAriane.git
cd CifraAriane

# Instalar dependências
bun install

# Iniciar servidor de desenvolvimento
bun run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `bun run dev` | Inicia servidor de desenvolvimento |
| `bun run build` | Gera build de produção |
| `bun start` | Inicia servidor de produção |
| `bun run lint` | Executa análise de código |

## Deploy

### Railway

Este projeto está configurado para deploy automatizado no Railway.

1. Conecte o repositório GitHub ao Railway
2. O deploy será executado automaticamente via Dockerfile
3. O healthcheck está configurado em `/api/health`

### Configuração de Produção

- **Builder**: Dockerfile (multi-stage)
- **Output**: Next.js standalone
- **Healthcheck**: `/api/health`
- **Restart Policy**: On failure (máximo 3 tentativas)

## Arquitetura

```
src/
├── app/
│   ├── api/
│   │   └── health/
│   │       └── route.ts       # Endpoint de healthcheck
│   ├── globals.css            # Estilos globais e variáveis CSS
│   ├── layout.tsx             # Layout raiz da aplicação
│   └── page.tsx               # Página principal do tradutor
├── components/
│   └── ui/                    # Componentes shadcn/ui
├── hooks/
│   ├── use-mobile.ts          # Detecção de dispositivo móvel
│   └── use-toast.ts           # Sistema de notificações
└── lib/
    └── utils.ts               # Funções utilitárias
```

## Tabela de Mapeamento

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

## Uso

1. Selecione o modo de operação: **Decifrar** (símbolos para letras) ou **Cifrar** (letras para símbolos)
2. Insira o texto manualmente ou utilize o teclado virtual
3. O resultado é exibido automaticamente na área de saída

### Exemplo

| Entrada | Saída |
|---------|-------|
| `]÷#=[` | `pedro` |

## Licença

MIT License
