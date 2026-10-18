# Plano de Testes & Estratégia de Testes

**Projeto:** Automação de Testes E2E - OrangeHRM  
**Sistema Alvo:** [OrangeHRM Open Source Demo](https://opensource-demo.orangehrmlive.com/)  
**Ferramenta:** Playwright (TypeScript)  
**Equipe de QA:** Francielle, Ivis, Thiago, Nilton e Ster
**Versão do Documento:** 1.1  
**Data:** 18/10/2026  

---

## 1. Visão Geral e Objetivos

O objetivo deste plano de testes é estabelecer o escopo, a estratégia técnica e o detalhamento de casos de teste automatizados para a aplicação web **OrangeHRM Open Source Demo**.

A suíte visa garantir a qualidade, integridade e estabilidade dos fluxos críticos de negócio, abrangendo controle de acesso (login e recuperação de credenciais), integridade de rotas, navegação pós-autenticação e gerenciamento de colaboradores (Módulo PIM).

---

## 2. Escopo dos Testes

### 2.1. Funcionalidades no Escopo
* **Autenticação & Segurança Básica (Thiago & Ivis):**
  * Exibição de elementos na tela inicial de login;
  * Autenticação com credenciais válidas e inválidas;
  * Validação de campos obrigatórios;
  * Proteção de rota e persistência de sessão (Reload).
* **Recuperação de Acesso - Forgot Password (Francielle & Thiago):**
  * Navegação para o formulário de recuperação;
  * Botão de cancelamento e retorno ao login;
  * Validação de campo obrigatório para envio do código de redefinição.
* **Dashboard & Navegação Global (Ivis):**
  * Verificação do carregamento do Dashboard pós-autenticação (`beforeEach`);
  * Presença de dados do usuário logado e menu lateral com módulos principais.
* **Módulo PIM - Gestão de Funcionários (Thiago):**
  * Consulta e pesquisa de colaboradores por Nome e ID;
  * Cadastro de novos colaboradores com validação de campos obrigatórios e persistência;
  * Edição de dados cadastrais;
  * Fluxo de exclusão de registros e cancelamento modal.

### 2.2. Fora do Escopo
* Testes de carga, estresse e performance da infraestrutura da demo;
* Módulos não cobertos na suíte atual (Recruitment, Performance, Directory, Maintenance, Buzz, Time e Leave).

---

## 3. Estratégia de Testes

### 3.1. Níveis e Tipos de Teste
* **Nível:** Testes de Sistema / Ponta a Ponta (End-to-End - E2E).
* **Tipos de Teste:**
  * **Funcional (Positivo e Negativo):** Validação das regras de negócio, preenchimento e mensagens de erro.
  * **Regressão Automatizada:** Execução rápida e contínua dos testes existentes a cada alteração de código.
  * **Segurança de Acesso:** Verificação do comportamento da aplicação diante de acessos não autorizados.

### 3.2. Abordagem de Automação & Padrões Adotados
1. **Padrão de Localizadores Semânticos (`getByRole`):**
   * Priorização da acessibilidade e resiliência (utilização de `getByRole`, `getByText`, evitando seletores CSS frágeis).
2. **Reaproveitamento de Sessão com Hooks (`beforeEach`):**
   * Centralização do fluxo de login no módulo `config/auth.ts` (`loginAsAdmin`), garantindo isolamento entre testes.

### 3.3. Ambiente e Configuração
* **URL Base:** `https://opensource-demo.orangehrmlive.com/`
* **Navegador Padrão:** Chromium (Desktop)
* **Credenciais de Teste:**
  * Usuário: `Admin`
  * Senha: `admin123`
* **Executores:** Playwright Test Runner (Headless e UI Mode)

### 3.4. Critérios de Aceite e Saída
* **Critério de Entrada:** Ambiente demo do OrangeHRM disponível e respondendo HTTP 200.
* **Critério de Saída:** 100% dos testes automatizados executados com sucesso (sem testes quebradiços ou falhas de asserção).

---

## 4. Matriz de Casos de Teste

---

### Módulo 1: Autenticação & Controle de Acesso

#### CT-01 (Thiago): Exibição da Interface de Login
* **ID:** CT-01 (Thiago)
* **Responsável:** Thiago
* **Módulo:** Autenticação
* **Pré-condição:** Navegador aberto na URL raiz `/`.
* **Passos:**
  1. Acessar a URL inicial do sistema.
  2. Verificar os elementos visíveis na página.
* **Resultado Esperado:** 
  * O título "Login" deve estar visível.
  * Os campos "Username" e "Password" devem estar presentes e habilitados.
  * O botão "Login" deve estar visível e clicável.

---

#### CT-02 (Ivis): Login com Credenciais Válidas (Sucesso)
* **ID:** CT-02 (Ivis)
* **Responsável:** Ivis
* **Módulo:** Autenticação
* **Pré-condição:** Usuário cadastrado com perfil ativo (`Admin` / `admin123`).
* **Passos:**
  1. Acessar a tela de login.
  2. Preencher o campo "Username" com `Admin`.
  3. Preencher o campo "Password" com `admin123`.
  4. Clicar no botão "Login".
* **Resultado Esperado:**
  * O sistema deve autenticar com sucesso.
  * A URL deve mudar para `/web/index.php/dashboard/index`.
  * O cabeçalho "Dashboard" e o nome do usuário devem estar visíveis.

---

#### CT-03 (Thiago): Bloqueio de Login com Credenciais Inválidas
* **ID:** CT-03 (Thiago)
* **Responsável:** Thiago
* **Módulo:** Autenticação
* **Pré-condição:** Estar na tela de login.
* **Passos:**
  1. Acessar a tela de login.
  2. Preencher "Username" com `usuario`.
  3. Preencher "Password" com `senha`.
  4. Clicar no botão "Login".
* **Resultado Esperado:**
  * O acesso não deve ser permitido.
  * A mensagem de erro "Invalid credentials" deve ser exibida em tela.
  * A URL deve permanecer em `/auth/login`.

---

#### CT-04 (Thiago): Validação de Campos Obrigatórios no Formulário de Login
* **ID:** CT-04 (Thiago)
* **Responsável:** Thiago
* **Módulo:** Autenticação
* **Pré-condição:** Estar na tela de login com os campos vazios.
* **Passos:**
  1. Acessar a tela de login.
  2. Clicar diretamente no botão "Login" sem preencher os campos.
* **Resultado Esperado:**
  * Devem ser exibidas as mensagens de validação "Required" abaixo de ambos os campos (Username e Password).
  * Os campos devem receber a indicação visual de erro.

---

#### CT-05 (Thiago): Manutenção da Sessão Autenticada após Atualização (Reload)
* **ID:** CT-05 (Thiago)
* **Responsável:** Thiago
* **Módulo:** Autenticação / Sessão
* **Pré-condição:** Usuário previamente autenticado e localizado no Dashboard.
* **Passos:**
  1. Realizar login com sucesso.
  2. Executar a atualização da página (Reload/F5).
* **Resultado Esperado:**
  * A sessão deve continuar ativa sem solicitar credenciais novamente.
  * A URL deve continuar sendo `/dashboard/index` e o cabeçalho "Dashboard" deve permanecer visível.

---

#### CT-06 (Thiago): Proteção de Rotas contra Acesso Não Autorizado
* **ID:** CT-06 (Thiago)
* **Responsável:** Thiago
* **Módulo:** Segurança / Autenticação
* **Pré-condição:** Sessão não autenticada (navegador anônimo ou sem cookies de sessão).
* **Passos:**
  1. Tentar acessar diretamente a URL protegida: `https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index`.
* **Resultado Esperado:**
  * O sistema deve interceptar a requisição e redirecionar para a tela de login (`/auth/login`).
  * O formulário de login deve ser exibido.

---

### Módulo 2: Recuperação de Senha (Forgot Password)

#### CT-07 (Francielle): Acesso à Tela de Recuperação de Senha
* **ID:** CT-07 (Francielle)
* **Responsável:** Francielle
* **Módulo:** Recuperação de Acesso
* **Pré-condição:** Estar na tela de login.
* **Passos:**
  1. Clicar no link "Forgot your password?".
* **Resultado Esperado:**
  * O usuário deve ser redirecionado para a rota `/auth/requestPasswordResetCode`.
  * O título "Reset Password" deve ser exibido.
  * O campo "Username", botão "Cancel" e botão "Reset Password" devem estar visíveis.

---

#### CT-08 (Francielle): Cancelamento do Fluxo de Recuperação de Senha
* **ID:** CT-08 (Francielle)
* **Responsável:** Francielle
* **Módulo:** Recuperação de Acesso
* **Pré-condição:** Estar na tela de redefinição de senha (`/auth/requestPasswordResetCode`).
* **Passos:**
  1. Clicar no botão "Cancel".
* **Resultado Esperado:**
  * A operação deve ser cancelada.
  * O usuário deve retornar à tela de login (`/auth/login`).

---

#### CT-09 (Thiago): Validação de Campo Obrigatório na Recuperação de Senha
* **ID:** CT-09 (Thiago)
* **Responsável:** Thiago
* **Módulo:** Recuperação de Acesso
* **Pré-condição:** Estar na tela de redefinição de senha com o campo "Username" vazio.
* **Passos:**
  1. Clicar no botão "Reset Password" sem preencher o nome de usuário.
* **Resultado Esperado:**
  * A mensagem de erro "Required" deve ser exibida abaixo do campo "Username".
  * A requisição de reset não deve ser processada.

---

### Módulo 3: Dashboard e Navegação Global

#### CT-10 (Ivis): Exibição do Menu Lateral e Componentes Principais
* **ID:** CT-10 (Ivis)
* **Responsável:** Ivis
* **Módulo:** Dashboard / Navegação
* **Pré-condição:** Usuário logado com sucesso via `beforeEach`.
* **Passos:**
  1. Observar a barra lateral esquerda (Sidebar Menu).
  2. Observar a barra superior (Topbar Header).
* **Resultado Esperado:**
  * Os links dos módulos principais devem estar visíveis e navegáveis: "Admin", "PIM", "Leave", "Time" e "Dashboard".
  * O cabeçalho deve exibir "Dashboard" e a identificação do perfil do usuário.

---

### Módulo 4: Gerenciamento de Funcionários (Módulo PIM)

#### CT-11 (Thiago): Validação de Campos Obrigatórios no Cadastro de Funcionário
* **ID:** CT-11 (Thiago)
* **Responsável:** Thiago
* **Módulo:** PIM (Employee Management)
* **Pré-condição:** Usuário autenticado na tela de listagem de funcionários (`/pim/viewEmployeeList`).
* **Passos:**
  1. Clicar no botão "+ Add".
  2. Aguardar o carregamento da tela `/pim/addEmployee`.
  3. Clicar no botão "Save" sem preencher nenhum campo.
* **Resultado Esperado:**
  * Mensagens de validação "Required" devem aparecer sob os campos obrigatórios "First Name" e "Last Name".
  * O formulário não deve ser salvo.

---

#### CT-12 (Thiago): Cadastro de Novo Funcionário com Sucesso
* **ID:** CT-12 (Thiago)
* **Responsável:** Thiago
* **Módulo:** PIM (Employee Management)
* **Pré-condição:** Usuário autenticado no formulário `/pim/addEmployee`.
* **Passos:**
  1. Preencher "First Name" com valor dinâmico (ex: `Name<timestamp>`).
  2. Preencher "Last Name" com `Playwright`.
  3. Preencher "Employee Id" com ID numérico único.
  4. Clicar no botão "Save".
* **Resultado Esperado:**
  * O alerta "Successfully Saved" deve ser exibido.
  * O usuário deve ser redirecionado para a tela de detalhes pessoais (`/pim/viewPersonalDetails`).
  * Os campos "First Name", "Last Name" e "Employee Id" devem persistir exatamente com os valores informados.

---

#### CT-13 (Thiago): Consulta de Funcionário por Nome e ID
* **ID:** CT-13 (Thiago)
* **Responsável:** Thiago
* **Módulo:** PIM (Employee Management)
* **Pré-condição:** Usuário autenticado e com funcionários existentes na lista do PIM.
* **Passos:**
  1. Obter o ID do primeiro funcionário da listagem.
  2. Inserir o ID no filtro de pesquisa "Employee Id" e clicar em "Search".
  3. Validar o resultado retornado na tabela.
  4. Clicar em "Reset".
  5. Inserir o nome do funcionário no campo de pesquisa por nome e clicar em "Search".
* **Resultado Esperado:**
  * Em ambas as buscas, a grade de resultados deve filtrar e apresentar a linha correspondente aos critérios informados.

---

#### CT-14 (Thiago): Edição de Dados Pessoais de Funcionário Existente
* **ID:** CT-14 (Thiago)
* **Responsável:** Thiago
* **Módulo:** PIM (Employee Management)
* **Pré-condição:** Usuário autenticado na listagem de funcionários.
* **Passos:**
  1. Clicar sobre um registro de funcionário na tabela.
  2. Aguardar a abertura da tela de detalhes pessoais (`/pim/viewPersonalDetails`).
  3. Alterar o campo de primeiro nome para `Admin`.
  4. Clicar no botão "Save" da seção de detalhes pessoais.
* **Resultado Esperado:**
  * A mensagem de sucesso "Successfully Updated" deve ser exibida confirmando a alteração.

---

#### CT-15 (Thiago): Fluxo de Exclusão de Funcionário e Cancelamento
* **ID:** CT-15 (Thiago)
* **Responsável:** Thiago
* **Módulo:** PIM (Employee Management)
* **Pré-condição:** Funcionário criado previamente para exclusão.
* **Passos:**
  1. Localizar o funcionário criado na lista através do Employee ID.
  2. Clicar no ícone de lixeira (Delete) da respectiva linha.
  3. No modal de confirmação exibido, clicar em "No, Cancel".
  4. Verificar se o registro continua presente na tabela.
  5. Clicar novamente no ícone de lixeira e, em seguida, em "Yes, Delete".
* **Resultado Esperado:**
  * Ao clicar em "No, Cancel", o modal fecha e o registro é mantido.
  * Ao clicar em "Yes, Delete", a mensagem "Successfully Deleted" deve ser exibida e o registro removido da lista.

---

## 5. Rastreabilidade dos Testes com o Código

| ID do Caso de Teste | Responsável | Arquivo de Teste Automatizado | Status |
| :--- | :--- | :--- | :--- |
| **CT-01 (Thiago)** | Thiago | `tests/thiagoTestes.spec.ts` | ✅ Automatizado |
| **CT-02 (Ivis)** | Ivis | `tests/ivisTestes.spec.ts` & `config/auth.ts` | ✅ Automatizado |
| **CT-03 (Thiago)** | Thiago | `tests/thiagoTestes.spec.ts` | ✅ Automatizado |
| **CT-04 (Thiago)** | Thiago | `tests/thiagoTestes.spec.ts` | ✅ Automatizado |
| **CT-05 (Thiago)** | Thiago | `tests/thiagoTestes.spec.ts` | ✅ Automatizado |
| **CT-06 (Thiago)** | Thiago | `tests/thiagoTestes.spec.ts` | ✅ Automatizado |
| **CT-07 (Francielle)** | Francielle | `tests/francielleBefore.spec.ts` | ✅ Automatizado |
| **CT-08 (Francielle)** | Francielle | `tests/francielleBefore.spec.ts` | ✅ Automatizado |
| **CT-09 (Thiago)** | Thiago | `tests/thiagoTestes.spec.ts` | ✅ Automatizado |
| **CT-10 (Ivis)** | Ivis | `tests/ivisTestes.spec.ts` | ✅ Automatizado |
| **CT-11 (Thiago)** | Thiago | `tests/thiagoTestes.spec.ts` | ✅ Automatizado |
| **CT-12 (Thiago)** | Thiago | `tests/thiagoTestes.spec.ts` | ✅ Automatizado |
| **CT-13 (Thiago)** | Thiago | `tests/thiagoTestes.spec.ts` | ✅ Automatizado |
| **CT-14 (Thiago)** | Thiago | `tests/thiagoTestes.spec.ts` | ✅ Automatizado |
| **CT-15 (Thiago)** | Thiago | `tests/thiagoTestes.spec.ts` | ✅ Automatizado |

---

## 6. Riscos & Mitigações

| Risco | Impacto | Mitigação |
| :--- | :--- | :--- |
| **Latência de Rede Externa** | Médio | Utilização de asserções assíncronas do Playwright (`waitForURL`, `toBeVisible`) com auto-retry. |
| **Colisão de Seletores em Mudança de Layout** | Médio | Adoção do padrão `getByRole` e `getByText`, desacoplando o teste de classes CSS. |
