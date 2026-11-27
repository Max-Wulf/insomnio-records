import { test, expect } from '@playwright/test';

test.describe("Navbar - Insomnio Records", () => {

    let navbar; // Declaramos la variable

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        navbar = page.locator('.navbar-insomnio');
    });

    test('Verificar navbar', async () => {
        await expect(navbar).toBeVisible();
    });

    test('Verificar color de fondo del navbar', async () => {
        await expect(navbar).toHaveCSS('background-color', 'rgb(8, 8, 8)');
    });

    test('Verificar funcionamiento del navbar en dispositivos móviles', async ({ page }) => {

        await page.setViewportSize({ width: 390, height: 844 });

        const toggler = navbar.locator('.navbar-toggler');
        const menu = navbar.locator('#basic-navbar-nav');

        await expect(toggler).toBeVisible();
        await expect(menu).toBeHidden();

        await toggler.click();

        await expect(menu).toBeVisible();

        await toggler.click();

        await expect(menu).toBeHidden();
    });

    test('Verificar navegación a Apparel', async ({ page }) => {
        const apparel = navbar.getByRole('link', { name: 'Apparel' });
        await expect(apparel).toBeVisible();
        await apparel.click();
        await expect(page).toHaveURL('https://insomnio-records.vercel.app/apparel');
        //agregaremos mas cuando terminemos la parte de apparel
    });

    test('Verificar navegacion a IR SAYS', async ({page})=> {
        const juego = navbar.getByRole('link', {name: 'IR SAYS'});
        await expect(juego).toBeVisible();
        await juego.click();
        await expect(page).toHaveURL('https://insomnio-records.vercel.app/ir-says')

        const mensaje = page.locator('.ir-says-message');
        const next = page.getByRole('button', { name: 'NEXT' });
        await expect(mensaje).toBeVisible();
        await expect(next).toBeEnabled();
        const mensajeInicial = await mensaje.innerText();
        await next.click();
        await expect(mensaje).not.toHaveText(mensajeInicial);
        await expect(mensaje).toBeVisible();
        await expect(mensaje).not.toBeEmpty();
    })

    test('Verificar funcionamiento del dropdown Productos', async () => {
        const dropdown = navbar.locator('#basic-nav-dropdown');

        await expect(dropdown).toBeVisible();
        await expect(dropdown).toHaveAttribute('aria-expanded', 'false');

        await dropdown.click();
        await expect(dropdown).toHaveAttribute('aria-expanded', 'true');

        await dropdown.click();
        await expect(dropdown).toHaveAttribute('aria-expanded', 'false');
    });

    test('Verificar navegación a Nacionales', async ({ page }) => {
        const dropdown = navbar.locator('#basic-nav-dropdown');
        await dropdown.click();

        const nacionales = navbar.getByRole('link', {name: 'Nacionales',exact: true});

        await expect(nacionales).toBeVisible();
        await nacionales.click();
        await expect(page).toHaveURL('/category/nacional');
    });

    test('Verificar navegación a Internacionales', async ({ page }) => {
        const dropdown = navbar.locator('#basic-nav-dropdown');
        await dropdown.click();

        const internacionales = navbar.getByRole('link', {name: 'Internacionales', exact: true});

        await expect(internacionales).toBeVisible();
        await internacionales.click();
        await expect(page).toHaveURL('/category/internacional');
    });
});