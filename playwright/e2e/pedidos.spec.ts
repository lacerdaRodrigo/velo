import { test, expect } from '@playwright/test';
import { gerarCodigoPedido } from '../support/helpes';
import { beforeEach } from 'node:test';

//AAA - Arrange, Act, Assert
//PAV - Preparar, Agir, Verificar

test.describe('Consultar Pedido', () => {

  test.beforeEach(async ({ page }) => {

    // Arrange (preparar)
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  })


  test('deve consultar um pedido aprovado', async ({ page }) => {

    const ordemAprovada ={
      pedido: 'VLO-28JC4G',
      status: 'APROVADO',
      cor: 'Glacier Blue',
      rodas: 'aero Wheels',
      comprador: {
        nome: 'Rodrigo Lacerda',
        email: 'lacerdaa.rodrigo@gmail.com',
      },
      pagamento: 'À Vista',
    }

    // Act (Agir)
    await page.getByTestId('search-order-id').fill(ordemAprovada.pedido);
    await page.getByTestId('search-order-button').click();

    // Assert (verificar)
    await expect(page.getByTestId(`order-result-${ordemAprovada.pedido}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${ordemAprovada.pedido}
            - img
            - text: ${ordemAprovada.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${ordemAprovada.cor}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${ordemAprovada.rodas}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${ordemAprovada.comprador.nome}
            - paragraph: Email
            - paragraph: ${ordemAprovada.comprador.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${ordemAprovada.pagamento}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

  });


  test('deve consultar um pedido reprovado', async ({ page }) => {

    const ordemAprovada ={
      pedido: 'VLO-P2YHN1',
      status: 'REPROVADO',
      cor: 'Glacier Blue',
      rodas: 'sport Wheels',
      comprador: {
        nome: 'Jennifer Lacerda',
        email: 'jenniferlacerda@gmail.com',
      },
      pagamento: 'À Vista',
    }

    // Act (Agir)
    await page.getByTestId('search-order-id').fill(ordemAprovada.pedido);
    await page.getByTestId('search-order-button').click();

    // Assert (verificar)
    await expect(page.getByTestId(`order-result-${ordemAprovada.pedido}`)).toMatchAriaSnapshot(`
          - img
          - paragraph: Pedido
          - paragraph: ${ordemAprovada.pedido}
          - img
          - text: ${ordemAprovada.status}
          - img "Velô Sprint"
          - paragraph: Modelo
          - paragraph: Velô Sprint
          - paragraph: Cor
          - paragraph: ${ordemAprovada.cor}
          - paragraph: Interior
          - paragraph: cream
          - paragraph: Rodas
          - paragraph: ${ordemAprovada.rodas}
          - heading "Dados do Cliente" [level=4]
          - paragraph: Nome
          - paragraph: ${ordemAprovada.comprador.nome}
          - paragraph: Email
          - paragraph: ${ordemAprovada.comprador.email}
          - paragraph: Loja de Retirada
          - paragraph
          - paragraph: Data do Pedido
          - paragraph: /\\d+\\/\\d+\\/\\d+/
          - heading "Pagamento" [level=4]
          - paragraph: ${ordemAprovada.pagamento}
          - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
          `);

  });


  test('deve exibir mensagem quando o pedido não e encontrado', async ({ page }) => {

    const pedido = gerarCodigoPedido();

    // Act (Agir)
    await page.getByTestId('search-order-id').fill(pedido);
    await page.getByTestId('search-order-button').click();
    await expect(page.getByText('Pedido não encontrado')).toBeVisible();

    // Assert(Verificar)
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
          - img
          - heading "Pedido não encontrado" [level=3]
          - paragraph: Verifique o número do pedido e tente novamente
          `);
  })

})
