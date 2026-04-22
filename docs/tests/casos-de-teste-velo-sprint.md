# Casos de Teste - Velô Sprint (Configurador de Veículo Elétrico)

---

### CT01 - Acessar a Landing Page com sucesso

#### Objetivo
Validar se a Landing Page é carregada corretamente e exibe as informações principais do veículo Velô Sprint.

#### Pré-Condições
- O sistema deve estar no ar e acessível via navegador.
- O usuário deve estar conectado à internet.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a URL base da aplicação no navegador | A página inicial carrega sem erros |
| 2  | Visualizar os elementos da página (título, descrição, imagens) | Todos os elementos visuais e textuais são apresentados corretamente |
| 3  | Clicar no botão para iniciar a configuração do veículo | O usuário é redirecionado para a página do Configurador de Veículo |

#### Resultados Esperados
- O usuário consegue visualizar a Landing Page e ser redirecionado para o Configurador de Veículo sem falhas.

#### Critérios de Aceitação
- A página deve carregar corretamente e o botão de "Configurar" deve estar funcional.

---

### CT02 - Configuração de veículo básico (sem adicionais)

#### Objetivo
Validar o cálculo do preço ao não selecionar nenhum pacote adicional.

#### Pré-Condições
- O usuário deve estar na página do Configurador de Veículo.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Visualizar a lista de opcionais na página de configuração | As opções "Rodas Sport", "Precision Park" e "Flux Capacitor" estão disponíveis e desmarcadas |
| 2  | Observar o valor total exibido | O sistema exibe o valor base de R$ 40.000,00 |
| 3  | Clicar no botão de "Avançar" ou "Checkout" | O sistema avança para a tela de Checkout mantendo o valor de R$ 40.000,00 |

#### Resultados Esperados
- O sistema deve manter o valor base do veículo e avançar para o Checkout corretamente.

#### Critérios de Aceitação
- Preço total exibido deve ser exatamente R$ 40.000,00 se nenhum opcional for selecionado.

---

### CT03 - Configuração de veículo com opcionais selecionados e cálculo dinâmico

#### Objetivo
Validar se o sistema atualiza o preço total corretamente ao adicionar ou remover opcionais.

#### Pré-Condições
- O usuário deve estar na página do Configurador de Veículo.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Selecionar "Rodas Sport" | O valor total é atualizado para R$ 42.000,00 (+ R$ 2.000) |
| 2  | Selecionar "Precision Park" | O valor total é atualizado para R$ 47.500,00 (+ R$ 5.500) |
| 3  | Selecionar "Flux Capacitor" | O valor total é atualizado para R$ 52.500,00 (+ R$ 5.000) |
| 4  | Desmarcar "Rodas Sport" | O valor total é atualizado para R$ 50.500,00 (- R$ 2.000) |
| 5  | Clicar no botão de avançar para Checkout | O sistema avança e mantém o valor atualizado (R$ 50.500,00) |

#### Resultados Esperados
- O valor total é calculado e exibido em tempo real, refletindo a soma correta dos valores dos opcionais.

#### Critérios de Aceitação
- O cálculo deve seguir rigorosamente os valores: Base (40.000) + Sport (2.000) + Precision Park (5.500) + Flux Capacitor (5.000).

---

### CT04 - Simulação de financiamento com juros compostos

#### Objetivo
Validar o cálculo das parcelas do financiamento em 12x com juros compostos de 2% ao mês.

#### Pré-Condições
- O usuário deve estar na página de Checkout/Pedido com um veículo configurado.
- Exemplo: Veículo básico (R$ 40.000,00) sem entrada pré-definida.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Selecionar a opção de pagamento "Parcelado / Financiamento" | O sistema exibe o plano de pagamento em 12x |
| 2  | Inserir valor de entrada igual a R$ 0,00 | O valor a financiar é de R$ 40.000,00 |
| 3  | Verificar o valor das parcelas e total a prazo | O sistema calcula 12 parcelas considerando os juros compostos de 2% a.m., exibindo os valores corretos calculados matematicamente |

#### Resultados Esperados
- O sistema calcula e mostra o valor exato das parcelas e o Custo Efetivo Total embutido, respeitando os 2% ao mês sobre o saldo devedor.

#### Critérios de Aceitação
- A fórmula de juros compostos (M = P(1+i)^n) ou similar para amortização deve estar correta.

---

### CT05 - Tentativa de finalizar Checkout com dados obrigatórios ausentes

#### Objetivo
Validar que o usuário não consegue finalizar o pedido sem preencher os dados obrigatórios.

#### Pré-Condições
- O usuário deve estar na página de Checkout/Pedido.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Deixar campos obrigatórios (ex: Nome, CPF, Email) em branco | O sistema permite a edição dos campos |
| 2  | Clicar no botão "Finalizar Pedido" ou "Avaliar Crédito" | O sistema bloqueia a ação e exibe mensagens de erro indicando os campos obrigatórios vazios |

#### Resultados Esperados
- O formulário não é enviado e indicações visuais de erro aparecem ao lado dos campos não preenchidos.

#### Critérios de Aceitação
- O sistema não deve permitir o envio da requisição se as validações de front-end falharem.

---

### CT06 - Análise de Crédito: Aprovação automática (Score > 700)

#### Objetivo
Validar o fluxo de aprovação de crédito para um usuário com score alto.

#### Pré-Condições
- O usuário está no Checkout, com um pedido válido configurado.
- O mock/integração com a API de crédito está configurada para retornar um Score > 700 para o CPF informado.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher todos os dados pessoais e de pagamento (entrada < 50%) | Formulário é preenchido corretamente |
| 2  | Clicar em "Finalizar Pedido" | O sistema envia a requisição para análise |
| 3  | Aguardar o processamento | O sistema exibe a tela de Confirmação com status "Aprovado" e fornece o número do pedido (`order_number`) |

#### Resultados Esperados
- A compra é efetivada imediatamente.

#### Critérios de Aceitação
- A regra de "Score > 700 resulta em aprovação" é aplicada.

---

### CT07 - Análise de Crédito: Em análise (Score entre 501 e 700)

#### Objetivo
Validar o status do pedido quando o score do cliente fica na faixa intermediária.

#### Pré-Condições
- O usuário está no Checkout.
- A API de crédito retorna um Score entre 501 e 700 para o CPF informado.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o formulário e selecionar um valor de entrada < 50% | Formulário é preenchido corretamente |
| 2  | Clicar em "Finalizar Pedido" | O sistema processa o pedido |
| 3  | Visualizar a tela de retorno | O sistema exibe mensagem de que o pedido está "Em Análise", fornecendo o `order_number` para acompanhamento |

#### Resultados Esperados
- O pedido não é aprovado nem recusado imediatamente. É registrado e encaminhado para análise manual ou prazo estendido.

#### Critérios de Aceitação
- A regra de "Score 501 a 700 resulta em análise" é aplicada.

---

### CT08 - Análise de Crédito: Reprovação (Score <= 500)

#### Objetivo
Validar a recusa do crédito para clientes com score baixo.

#### Pré-Condições
- O usuário está no Checkout.
- A API de crédito retorna um Score <= 500 para o CPF informado.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher formulário (entrada < 50%) e submeter pedido | O sistema envia os dados |
| 2  | Visualizar a tela de retorno | O sistema informa que o crédito foi "Reprovado" e fornece opções alternativas ou apenas encerra o fluxo |

#### Resultados Esperados
- A solicitação é recusada com base no score.

#### Critérios de Aceitação
- A regra de "Score <= 500 resulta em reprovação" é aplicada.

---

### CT09 - Aprovação automática de crédito por exceção (Entrada >= 50%)

#### Objetivo
Validar se o sistema ignora o score de crédito (mesmo que seja <= 500) e aprova o pedido quando a entrada informada é de pelo menos 50% do valor total do veículo configurado.

#### Pré-Condições
- O usuário está no Checkout com o veículo configurado.
- A API de crédito configurada para retornar um Score <= 500 (ruim).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Informar um valor de "Entrada" que seja igual ou superior a 50% do preço total calculado | O sistema atualiza o valor a ser financiado |
| 2  | Preencher os dados obrigatórios e submeter o pedido | O sistema envia a requisição |
| 3  | Visualizar a tela de retorno | O sistema exibe o status de pedido "Aprovado", ignorando o score negativo |

#### Resultados Esperados
- A compra é autorizada instantaneamente devido à regra de exceção financeira.

#### Critérios de Aceitação
- Se `entrada >= (valor_total / 2)`, o status de crédito é automaticamente "Aprovado".

---

### CT10 - Consulta de Pedido com sucesso

#### Objetivo
Validar se o cliente consegue consultar o status atualizado do seu pedido utilizando o `order_number`.

#### Pré-Condições
- Um pedido foi gerado previamente no sistema e possui um `order_number` válido.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a página/módulo de Consulta de Pedidos | A página exibe o campo para inserção do código |
| 2  | Inserir o `order_number` correto e submeter | O sistema busca o pedido no banco de dados |
| 3  | Visualizar o resultado | O sistema apresenta os dados do pedido (itens, valor, status atual da análise de crédito) de forma protegida |

#### Resultados Esperados
- O pedido correto é exibido para o usuário.

#### Critérios de Aceitação
- Acesso mediante fornecimento exato do `order_number` fornecido no final da compra.

---

### CT11 - Tentativa de Consulta de Pedido sem informar número válido

#### Objetivo
Validar a segurança de dados e impedir consultas arbitrárias a pedidos.

#### Pré-Condições
- O usuário está na página de Consulta de Pedidos.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Tentar realizar a consulta deixando o campo `order_number` em branco | O sistema exibe um alerta de validação ("Campo obrigatório") |
| 2  | Tentar consultar utilizando um código inexistente (ex: `00000`) | O sistema exibe mensagem "Pedido não encontrado" e não revela dados de outros pedidos |
| 3  | Tentar consultar com caracteres especiais ou formato inválido | O sistema bloqueia a ação com validação de formato e não realiza a busca |

#### Resultados Esperados
- O sistema protege os dados de outros clientes não permitindo consultas não autenticadas ou com códigos inválidos.

#### Critérios de Aceitação
- Nenhum dado de cliente ou de pedido deve ser exposto se o `order_number` correto não for informado.
