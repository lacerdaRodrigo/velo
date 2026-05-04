import { test, expect } from '../support/fixture'

test.describe('CT02 - Configuração básica sem adicionais', () => {
  test('deve manter R$ 40.000,00 e ir ao checkout sem opcionais', async ({page,}) => {
    
    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'Velô Sprint', level: 1 })).toBeVisible()

    await page.getByRole('link', { name: 'Configure Agora' }).click()
    await expect(page).toHaveURL(/\/configure$/)

    await expect(page.getByRole('heading', { name: 'Opcionais', exact: true }),).toBeVisible()

    const precisionPark = page.getByRole('checkbox', { name: /Precision Park/, })
    const fluxCapacitor = page.getByRole('checkbox', { name: /Flux Capacitor/, })

    await expect(precisionPark).toBeVisible()
    await expect(fluxCapacitor).toBeVisible()
    await expect(precisionPark).not.toBeChecked()
    await expect(fluxCapacitor).not.toBeChecked()

    await expect(page.getByRole('button', { name: /Sport Wheels/ }),).toBeVisible()

    await expect(page.getByText('R$ 40.000,00').first()).toBeVisible()

    await page.getByRole('button', { name: 'Monte o Seu' }).click()
    await expect(page).toHaveURL(/\/order$/)

    await expect(
      page.getByRole('heading', { name: 'Finalizar Pedido' }),
    ).toBeVisible()

    await expect(
      page.getByRole('button', { name: /À Vista/ }),
    ).toContainText('R$ 40.000,00')

    await expect(
      page.getByRole('heading', { name: 'Resumo' }),
    ).toBeVisible()
    await expect(page.getByRole('main').getByText('Total')).toBeVisible()
    await expect(
      page.getByRole('main').getByText('R$ 40.000,00').last(),
    ).toBeVisible()
  })
})
