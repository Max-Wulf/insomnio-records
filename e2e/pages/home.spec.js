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

    test('El carrito se abre desde el costado derecho', async ({ page }) => {
        const botonCarrito = page.getByRole('button', { name: 'Abrir carrito' });
        const panelCarrito = page.locator('.cart-drawer');

        await expect(botonCarrito).toBeVisible();
        await expect(panelCarrito).not.toBeInViewport();

        await botonCarrito.click();

        await expect(panelCarrito).toBeInViewport();
        await expect(panelCarrito).toHaveCSS('right', '0px');
    });

    test ('El boton de usuario esta visible', async ({page})=>{
        const botonCuenta =page.getByRole('link',{ name: 'Mi cuenta', exact: true});
        await expect(botonCuenta).toBeVisible();
        await botonCuenta.click();
        await expect(page).toHaveURL('https://insomnio-records.vercel.app/mi-cuenta');
        const encabezado =page.getByRole('heading', { name: 'Mi cuenta', level: 1, exact: true });
        await expect(encabezado).toBeVisible();

    });

    test('Se muestra el catálogo de discos en el Home', async ({ page }) => {
        const catalogo = page.getByRole('region', { name: 'Catálogo de discos',exact: true,});
        await expect(catalogo).toBeVisible();
        await expect(catalogo.getByRole('heading', { name: 'Discos para seguir despierto.' }),).toBeVisible();
        await expect(catalogo.locator('.product-card').first()).toBeVisible();
        const enlaceCatalogo = catalogo.getByRole('link', {name: /ver todos los discos/i,});
        
    });

    test('Verificar consistencia del fondo editorial en ambos temas', async ({ page }) => {

        const cartel = page.locator('.product-editorial-footer--music');

        await expect(cartel).toBeVisible();

        await page.emulateMedia({ colorScheme: 'light' });
        await expect(cartel).toHaveCSS('background-color', 'rgb(3, 3, 3)');

        await page.emulateMedia({ colorScheme: 'dark' });
        await expect(cartel).toHaveCSS('background-color', 'rgb(3, 3, 3)');
    });
})