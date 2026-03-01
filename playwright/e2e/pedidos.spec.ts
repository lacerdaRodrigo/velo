import { test, expect } from '@playwright/test';

//AAA - Arrange, Act, Assert
//PAV - Preparar, Agir, Verificar

test('deve consultar um pedido aprovado', async ({ page }) => {

    const pedido = 'VLO-28JC4G'

    // Arrange (preparar)
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

    // Act (Agir)
    await page.getByTestId('search-order-id').fill(pedido);
    await page.getByTestId('search-order-button').click();

    // Assert (verificar)

    const consultaPedido = page.getByRole('paragraph')
        .filter({ hasText: /^Pedido$/ })
        .locator('..') // sobe para o elemento pai

    await expect(consultaPedido).toContainText(pedido, { timeout: 10_000 })

    await expect(page.getByText('APROVADO')).toBeVisible()
});

test('deve exibir mensagem quando o pedido não e encontrado', async ({ page }) => {

    const pedido = 'ABC-28JC4G'

    // Arrange (preparar)
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

    // Act (Agir)
    await page.getByTestId('search-order-id').fill(pedido);
    await page.getByTestId('search-order-button').click();

    // Assert(Verificar)
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
        
        - img
        - heading 'Pedido não encontrado' [level=3]
        - paragraph: 'Verifique o número do pedido e tente novamente'
        `)
})