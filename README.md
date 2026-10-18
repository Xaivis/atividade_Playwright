# 🎭 Automação de Testes E2E com Playwright - OrangeHRM

Projeto de automação de testes End-to-End (E2E) desenvolvido com **Playwright** e **TypeScript** para o sistema web [OrangeHRM Open Source Demo](https://opensource-demo.orangehrmlive.com/).

Este repositório faz parte das atividades práticas do curso de Teste de Software (**Curso APONTI**).

---

## 👥 Equipe de QA

* Francielle
* Ivis
* Thiago
* Nilton
* Ster

---

## 🚀 Principais Funcionalidades Testadas

O projeto cobre cenários críticos de negócio divididos em quatro grandes módulos:

### 1. 🔐 Autenticação & Segurança
* **Exibição da tela de login:** Validação da presença dos campos essenciais, logo e botões.
* **Autenticação com sucesso:** Login via hook `beforeEach` utilizando helper reutilizável (`loginAsAdmin`).
* **Bloqueio de credenciais inválidas:** Validação da mensagem `"Invalid credentials"`.
* **Validação de campos obrigatórios:** Exibição da mensagem `"Required"` em campos vazios.
* **Persistência de sessão:** Garantia de que a sessão é mantida ativa após recarregar a página (F5/Reload).
* **Proteção de rotas:** Redirecionamento automático para a tela de login ao tentar acessar páginas protegidas (`/dashboard/index`) sem estar autenticado.

### 2. 🔑 Recuperação de Acesso (Forgot Password)
* **Acesso à redefinição:** Validação do link *"Forgot your password?"* e abertura do formulário de reset.
* **Cancelamento do fluxo:** Validação do botão *"Cancel"* retornando com segurança à tela de login.
* **Campos obrigatórios:** Bloqueio do envio sem o preenchimento do nome de usuário.

### 3. 📊 Dashboard & Navegação Global
* **Carregamento pós-login:** Validação do cabeçalho de Dashboard e do perfil do usuário logado.
* **Menu lateral:** Verificação da visibilidade e navegabilidade dos módulos principais (Admin, PIM, Leave, Time, Dashboard).

### 4. 👥 Gestão de Funcionários (Módulo PIM)
* **Pesquisa de colaboradores:** Busca de funcionários por ID e por Nome com validação de resultados na tabela.
* **Campos obrigatórios no cadastro:** Validação ao tentar salvar sem preencher First Name e Last Name.
* **Cadastro completo:** Inclusão de novo funcionário com dados dinâmicos e validação na tela de detalhes pessoais.
* **Edição de dados:** Alteração de dados cadastrais e confirmação da mensagem `"Successfully Updated"`.
* **Fluxo de exclusão:** Acionamento de modal, cancelamento da exclusão e exclusão definitiva confirmada com `"Successfully Deleted"`.

---

## 🛠️ Tecnologias e Dependências

* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Framework de Testes:** [@playwright/test](https://playwright.dev/) (^1.40+)
* **Ambiente de Execução:** [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
* **Navegador Padrão:** Chromium

---

## 📥 Como Instalar e Configurar

### 1. Clonar o repositório:
```bash
git clone git@github.com:Xaivis/atividade_Playwright.git
cd atividade_Playwright
```
*(ou via HTTPS, se preferir: `git clone https://github.com/Xaivis/atividade_Playwright.git`)*

### 2. Instalar as dependências do projeto:
```bash
npm install
```

### 3. Instalar os navegadores do Playwright:
```bash
npx playwright install chromium
```

---

## ▶️ Como Executar os Testes

No terminal, execute o comando desejado:

* **Executar todos os testes em modo headless (terminal):**
  ```bash
  npm test
  ```

* **Executar visualizando o navegador aberto (modo headed):**
  ```bash
  npm run test:headed
  ```

* **Executar na interface interativa do Playwright (UI Mode):**
  ```bash
  npm run test:ui
  ```

* **Visualizar o relatório HTML da última execução:**
  ```bash
  npm run test:report
  ```

* **Executar apenas um arquivo específico:**
  ```bash
  npx playwright test tests/ivisTestes.spec.ts
  npx playwright test tests/thiagoTestes.spec.ts
  npx playwright test tests/francielleBefore.spec.ts
  ```

---

## 📁 Estrutura do Projeto

```plaintext
├── config/
│   ├── auth.ts              # Helper com a função reutilizável loginAsAdmin
│   └── credentials.ts       # Credenciais padrão da demo do OrangeHRM
├── tests/
│   ├── francielleBefore.spec.ts # Testes de recuperação de senha e logo
│   ├── ivisTestes.spec.ts       # Testes com login no beforeEach e Dashboard
│   └── thiagoTestes.spec.ts     # Testes de autenticação avançada e módulo PIM
├── .gitignore               # Arquivos e diretórios ignorados pelo Git
├── package.json             # Dependências e scripts de execução
├── playwright.config.ts     # Configurações globais do Playwright (baseURL, timeout, etc.)
├── PLANO_DE_TESTES.md       # Documento formal com o Plano e Casos de Teste (CT-01 a CT-15)
└── README.md                # Documentação principal do projeto
```

---

## 📋 Plano de Testes Detalhado

Para consultar os 15 casos de teste detalhados com **ID, Responsável, Pré-condições, Passos e Resultados Esperados**, consulte o documento:
👉 **[PLANO_DE_TESTES.md](./PLANO_DE_TESTES.md)**