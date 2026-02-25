import { test, expect } from '@playwright/test';

//AAA - Arrange, Act, Assert
//PAV - Preparar, Agir, Verificar

test('deve consultar um pedido aprovado', async ({ page }) => {
    // Arrange (preparar)
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

    // Act (Agir)
    await page.getByTestId('search-order-id').fill('VLO-28JC4G');
    await page.getByTestId('search-order-button').click();

    // Assert (verificar)
    await expect(page.getByText('VLO-28JC4G')).toBeVisible({timeout: 10_000});
    await expect(page.getByText('APROVADO')).toBeVisible();
});