import { test, expect } from '@playwright/test';


test.describe("Home - insomnio Records", ()=>{

    test.beforeEach(async ({page}) => {
        await page.goto("/");
    });

    test('Verificar que la página principal carga correctamente', async ({ page }) => {
        await expect(page).toHaveTitle(/Insomnio/i);
    });

    test('Verificar que el logo cambia de color al pasar el cursor', async ({ page }) => {
    const logo = page.locator('.insomnio-wordmark');

        await expect(logo).toBeVisible();

        // Verificar el color inicial
        await expect(logo).toHaveCSS('color', 'rgb(245, 245, 245)');

        // Pasar el cursor sobre el logo
        await logo.hover();

        // Verificar el color violeta
        await expect(logo).toHaveCSS('color', 'rgb(181, 160, 219)');

        // Retirar el cursor
        await page.mouse.move(0, 0);

        // Verificar que recupera su color original
        await expect(logo).toHaveCSS('color', 'rgb(245, 245, 245)');
    });

    test('Verificar el navbar y la navegación entre categorías', async ({page}) => {
        const navbar = page.locator('.navbar-insomnio');
        //verifica que este visible
        await expect(navbar).toBeVisible();
        //verificamos el color
        await expect(navbar).toHaveCSS('background-color', 'rgb(8, 8, 8)');
        //verificamos apertura del dropdown 
        const dropdown = page.locator('#basic-nav-dropdown');
        await dropdown.click();
        await expect(dropdown).toHaveAttribute('aria-expanded', 'true');

        //verificamos las categorias del dropdown productos
        const nacionales = page.getByRole('link', { name: 'Nacionales', exact: true });
        await expect(nacionales).toBeVisible();
        await nacionales.click();
        await expect(page).toHaveURL('https://insomnio-records.vercel.app/category/nacional');

        await dropdown.click();
        const internacionales = page.getByRole('link', {name:'Internacionales', exact: true});
        await expect(internacionales).toBeVisible();
        await internacionales.click();
        await expect(page).toHaveURL('https://insomnio-records.vercel.app/category/internacional');

        await dropdown.click();
        const merch = page.getByRole('link', {name: 'Merch', exact:true});
        await expect(merch).toBeVisible();
        await merch.click();
        await expect(page).toHaveURL('https://insomnio-records.vercel.app/apparel');
    });
    
    test ('verificar el buscador y su funcionamiento', async({page})=>{
        //Verificamos el buscador del navbar
        const buscador = page.getByPlaceholder('Buscar...');
        await buscador.fill('Queens of the Stone Age');
        const botonBuscar = page.getByRole('button', { name: 'Buscar', exact: true });
        await botonBuscar.click();
        await expect(page).toHaveURL('https://insomnio-records.vercel.app/search?q=Queens%20of%20the%20Stone%20Age');
        const resultados = page.getByRole('heading', {name: 'Resultados para "Queens of the Stone Age"',exact: true});
        await expect(resultados).toBeVisible({ timeout: 10000 });
    });
})