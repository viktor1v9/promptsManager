# Prompts Manager

## 📋 Descrição do Projeto

Prompts Manager é uma aplicação web moderna para gerenciar, organizar e reutilizar prompts de forma eficiente. A aplicação permite criar, editar, pesquisar e copiar prompts com uma interface intuitiva e responsiva. Os dados são armazenados localmente no navegador utilizando localStorage, garantindo que seus prompts sejam persistidos entre as sessões.

### Funcionalidades Principais

- ✨ Criar novos prompts com título e conteúdo
- 📝 Editar prompts existentes
- 🔍 Pesquisar prompts por título
- 📋 Copiar conteúdo dos prompts para a área de transferência
- 🗑️ Remover prompts
- 💾 Armazenamento persistente local (localStorage)
- 📱 Design responsivo e adaptável para diferentes telas

## 🛠️ Tecnologias Utilizadas

### Front-end

- **HTML5** - Estrutura semântica 
- **CSS3** - Estilização moderna com variáveis CSS e media queries
- **JavaScript (Vanilla)** - Lógica da aplicação sem dependências externas
- **Google Fonts (Inter)** - Tipografia moderna

### Back-end

- **Não aplicável** - Aplicação frontend pura com armazenamento local (localStorage)

## 🏗️ Padrões de Projeto

### Arquitetura

- **Module Pattern** - Organização de código em escopo único com estado centralizado
- **Event Delegation** - Gerenciamento eficiente de eventos com delegação
- **State Management** - Gerenciamento centralizado de estado com objeto `state`

### Padrões de Código

- **Separação de Responsabilidades** - Funções especializadas para cada tarefa (render, persist, load)
- **DRY (Don't Repeat Yourself)** - Reuso de código em funções reutilizáveis
- **Responsive Design** - Mobile-first approach com breakpoints estratégicos
- **Accessibility** - Utilização de atributos ARIA e labels semânticos

### Estrutura de Arquivos

```
PROMPTS_MANAGER/
├── index.html          # Estrutura HTML da aplicação
├── style.css           # Estilos e layout responsivo
├── scripts.js          # Lógica e interatividade da aplicação
├── README.md           # Este arquivo
├── LICENSE             # Licença do projeto (MIT)
└── assets/             # Ícones e imagens SVG
    ├── favicon.svg
    ├── logo.svg
    ├── search.svg
    ├── copy.svg
    ├── remove.svg
    ├── open.svg
    └── collapse.svg
```

## ⚙️ Setup e Configuração

### Pré-requisitos

- **Navegador moderno** com suporte a:
  - ES6+ (JavaScript moderno)
  - localStorage API
  - Clipboard API
  - CSS media queries
  - contenteditable HTML5
- Nenhuma dependência externa ou ferramenta de build necessária

### Clonagem do Repositório

```bash
# Clone o repositório usando Git
git clone https://github.com/viktor1v9/promptsManager.git

# Acesse o diretório do projeto
cd promptsManager

# Abra o arquivo index.html no seu navegador
# Opção 1: Clique duas vezes no arquivo index.html
# Opção 2: Use uma extensão como Live Server no VS Code
# Opção 3: Serve o arquivo em um servidor local
```

### Inicialização Rápida

1. **Clone ou baixe o projeto**
2. **Abra `index.html` em seu navegador**
3. **Comece a criar e gerenciar seus prompts!**

### Desenvolvimento Local (Recomendado)

Para melhor experiência de desenvolvimento, recomenda-se usar a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code:

```bash
# No VS Code, após abrir a pasta do projeto:
# 1. Instale a extensão "Live Server"
# 2. Clique com botão direito em index.html
# 3. Selecione "Open with Live Server"
# 4. A aplicação abrirá em http://localhost:5500
```

## 🚀 Como Usar

### Criar um Novo Prompt

1. Clique em **"+ Novo prompt"** na sidebar
2. Digite o **título** do prompt
3. Digite o **conteúdo** do prompt
4. Clique em **"Salvar"**

### Pesquisar Prompts

1. Use a barra de busca no topo da sidebar
2. Digite o título ou parte dele
3. Os resultados aparecem em tempo real

### Copiar um Prompt

1. Selecione o prompt desejado na lista
2. Clique em **"Copiar"** para copiar o conteúdo
3. Cole em qualquer lugar com `Ctrl+V` (Windows/Linux) ou `Cmd+V` (Mac)

### Remover um Prompt

1. Clique no ícone de lixeira ao lado do prompt
2. O prompt será removido imediatamente

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta para:

- **Desktop** (1200px+) - Layout completo com sidebar e conteúdo
- **Tablet** (768px - 1199px) - Sidebar colapsável
- **Mobile** (abaixo de 768px) - Menu hambúrguer com sidebar deslizante

## 🔐 Armazenamento de Dados

- Todos os dados são armazenados **localmente** no navegador usando `localStorage`
- Nenhum dado é enviado para servidores
- Os prompts persistem entre as sessões
- Limpar o cache do navegador resultará na perda dos dados

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).


## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

**Desenvolvido com ❤️ usando HTML, CSS e JavaScript**
