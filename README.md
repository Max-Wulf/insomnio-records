# Insomnio Records

Disquería digital de música alternativa desarrollada con React, Vite, JavaScript y Firebase. Su identidad visual combina cultura underground, diseño editorial e interfaces musicales experimentales: blanco y negro, tipografía Inter de alto impacto, mensajes entre corchetes y una estética de transmisión nocturna.

El proyecto nace como un ecommerce de React y busca evolucionar hacia una aplicación web con catálogo, gestión de compras, usuarios y contenido musical. Actualmente permite explorar discos, administrar un carrito y ejecutar un flujo de generación de órdenes. La integración completa de inventario todavía requiere validación.

## Tecnologías utilizadas

Versiones declaradas en `package.json`; `package-lock.json` registra las versiones resueltas.

| Tecnología | Versión declarada | Uso |
| --- | --- | --- |
| React / React DOM | `^19.2.7` | Componentes, estado y renderizado |
| JavaScript | ES Modules y JSX | Desarrollo de la aplicación |
| Vite | `^8.1.1` | Servidor de desarrollo y compilación |
| React Router DOM | `^7.18.1` | Navegación del lado del cliente |
| Firebase | `^12.15.0` | Inicialización e integración con Cloud Firestore |
| React Hook Form | `^7.80.0` | Formulario y validaciones del checkout |
| Bootstrap / React Bootstrap | `^5.3.8` / `^2.10.10` | Componentes y estilos de interfaz |
| React Icons | `^5.7.0` | Iconografía |
| SweetAlert2 | `^11.26.25` | Confirmación para vaciar el carrito |
| ESLint | `^10.0.1` | Análisis estático, reglas de Hooks y Fast Refresh |

La configuración utiliza `@vitejs/plugin-react` y conserva HMR durante el desarrollo. React Compiler no está configurado. La aplicación está escrita en JavaScript; los paquetes de tipos de React presentes no implican una migración a TypeScript.

## Funcionalidades implementadas

Las siguientes funciones están verificadas por inspección del código. Esto no equivale a una prueba integral contra la base de datos remota.

| Funcionalidad | Alcance actual |
| --- | --- |
| Catálogo | Lectura de la colección `items` de Firestore y tarjetas de productos |
| Categorías | Filtrado en el cliente por `categoria`: `nacional`, `internacional` y `grandes-exitos` |
| Detalle de discos | Portada, artista, descripción, precio, stock, metadatos y tracklist disponible |
| Productos relacionados | Hasta cinco productos de la misma categoría, excluyendo el actual |
| Navegación | Rutas de catálogo, categorías, detalle, carrito, checkout y página de error |
| Carrito compartido | Context API: agregar, incrementar, disminuir, eliminar, vaciar, contar unidades y calcular totales |
| Persistencia del carrito | Lectura inicial y escritura en `localStorage` con la clave `insomnio-cart` |
| Carrito lateral | Apertura desde el navbar, ajuste de cantidades y acceso al carrito |
| Checkout | Formulario con nombre, apellido, dirección, correo y confirmación del correo |
| Validaciones del formulario | Campos requeridos, longitudes y coincidencia de correos; campos HTML de tipo `email` |
| Órdenes | Código para crear un documento en `orders`, mostrar su ID y vaciar el carrito tras el éxito |
| Interfaz | Hero con carrusel, placa nocturna, carrito pixel art, footer editorial y reglas responsive |
| Estados de interfaz | Indicadores de carga, carrito vacío, producto no encontrado y confirmación de compra |

### Estado de las validaciones de stock

- **Implementado en el cliente:** `CartContext` rechaza cantidades no enteras o no positivas y evita superar el stock que conserva el producto en memoria. `ItemCount` limita el incremento y deshabilita agregar cuando `stock === 0`.
- **Implementado en el checkout:** `runTransaction` lee los productos, verifica existencia, cantidades enteras positivas y stock entero suficiente. Después descuenta stock y crea la orden dentro de la misma transacción.
- **Pendiente de verificar:** catálogo y detalle leen `items`, mientras que el checkout busca documentos en `products` usando el ID del carrito. No se ha comprobado que las colecciones remotas y sus IDs coincidan. Esta discrepancia puede impedir completar compras o mantener el catálogo desactualizado.
- **Pendiente:** los precios y el total de la orden provienen del carrito del cliente; no se recalculan con los precios leídos en la transacción. No hay sincronización en tiempo real del inventario mostrado.

El buscador del navbar es visual: no tiene lógica de búsqueda conectada. No hay autenticación, historial de compras por usuario, pasarela de pagos ni reproductor musical implementados. Generar una orden no procesa un pago.

## Instalación y ejecución local

### Requisitos

- Git, Node.js y npm. Entorno utilizado durante la revisión: Node.js `24.18.0` y npm `11.16.0`.
- Acceso al proyecto de Firebase y permisos adecuados de Cloud Firestore para probar lecturas y compras.

### Preparación

```bash
git clone https://github.com/Max-Wulf/insomnio-records.git
cd insomnio-records
npm ci
```

Crear un archivo `.env.local` en la raíz:

```dotenv
VITE_API_KEY=tu_api_key_de_firebase
```

Actualmente esta es la única variable de entorno leída por `src/service/firebase.jsx`. El resto de la configuración apunta directamente al proyecto `disco-insomnio`. Para usar un proyecto propio hay que adaptar esa configuración; no alcanza con cambiar la API key. La parametrización completa está pendiente.

Los archivos `.env` y `.env.local` están ignorados por Git. Las variables `VITE_*` se incluyen en el cliente: no deben contener credenciales privadas de servidor. El acceso a los datos debe controlarse con reglas de Firestore.

```bash
npm run dev
```

Abrir la URL que indique Vite. Reiniciar el servidor después de modificar las variables de entorno.

| Comando | Resultado |
| --- | --- |
| `npm run dev` | Servidor local con HMR |
| `npm run build` | Compilación de producción en `dist/` |
| `npm run preview` | Vista previa local de una compilación existente; no despliega la app |
| `npm run lint` | Análisis estático del repositorio |

### Datos necesarios

El catálogo requiere documentos en `items` con campos como `name`, `artist`, `description`, `price`, `stock`, `categoria`, `img`, `year`, `genre`, `label`, `format`, `duration` y `tracks`. Los componentes usan el ID del documento para navegar al detalle; conviene evitar un campo `id` interno que lo sobrescriba. `stock` debe ser un entero y `price` un valor numérico.

`src/mock/asyncData.jsx` contiene datos de ejemplo y funciones con demora simulada. No es la fuente activa del catálogo ni un importador automático a Firestore. Modificarlo no actualiza los documentos remotos.

Antes de probar una compra, revisar la discrepancia `items`/`products` descrita arriba. El checkout actual escribe órdenes y descuenta existencias reales del proyecto configurado; utilizar datos de prueba. No se incluyen en el repositorio reglas de Firestore, configuración de emuladores ni un proceso de carga inicial de datos.

## Estructura del proyecto

```text
insomnio-records/
├── public/                    # Favicon y recursos públicos
├── src/
│   ├── assets/                # Recursos gráficos auxiliares
│   ├── components/            # Catálogo, detalle, carrito, checkout y navegación
│   ├── context/
│   │   └── CartContext.jsx    # Estado, operaciones y persistencia del carrito
│   ├── css/                   # Estilos por componente e identidad visual
│   ├── img/                   # Portadas, fotografías y otras imágenes
│   ├── mock/
│   │   └── asyncData.jsx      # Productos de ejemplo y consultas simuladas
│   ├── service/
│   │   └── firebase.jsx       # Inicialización de Firebase y exportación de db
│   ├── App.jsx                # Proveedores, rutas y estructura compartida
│   ├── main.jsx               # Punto de entrada con React StrictMode
│   ├── index.css              # Estilos globales
│   └── App.css
├── index.html                 # Documento base y carga de Inter desde Google Fonts
├── eslint.config.js
├── vite.config.js
├── package.json
├── package-lock.json
└── README.md
```

## Arquitectura general

La aplicación es una SPA. `main.jsx` monta `App`, que integra `BrowserRouter`, `CartProvider`, navbar, rutas y footer. Los componentes contenedores consultan Firestore; los componentes de presentación muestran productos y reciben acciones por props o por contexto.

| Ruta | Componente principal | Responsabilidad |
| --- | --- | --- |
| `/` | `ItemListContainer` | Hero y catálogo completo |
| `/category/:type` | `ItemListContainer` | Catálogo filtrado por categoría |
| `/item/:id` | `ItemDetailContainer` | Consulta del disco y productos relacionados |
| `/cart` | `CartContainer` | Carrito o estado vacío |
| `/checkout` | `Checkout` | Validación del formulario y creación de la orden |
| `*` | `Error` | Página para rutas no encontradas |

Flujo de compra: `items` → catálogo/detalle → `CartContext` y `localStorage` → checkout → transacción sobre `products` y `orders` → confirmación con ID de orden. La diferencia de colecciones es una limitación pendiente de resolver y validar.

La orden guarda `comprador`, `carrito`, `total` y `fecha` mediante `serverTimestamp()`. Las operaciones de Firestore se ejecutan desde el navegador con el SDK de Firebase; no hay un servidor propio ni verificación de precios del lado del servidor en este repositorio.

## Próximas implementaciones

Las casillas abiertas representan trabajo pendiente, incluso cuando ya existe una parte implementada que necesita integración o pruebas.

### Etapa 1 — Checkout e inventario

- [ ] Verificar las colecciones e IDs de Firestore y unificar el origen de catálogo y checkout (`items`/`products`).
- [ ] Completar la integración y probar las transacciones existentes para validar y descontar stock, incluyendo compras concurrentes.
- [ ] Actualizar el inventario mostrado después de una compra.
- [ ] Mejorar la presentación de productos agotados; ya se deshabilita agregar con stock cero, pero el detalle conserva el mensaje de disponibilidad.
- [ ] Mejorar los mensajes de error y las respuestas cuando se rechaza una operación del carrito.
- [ ] Validar precios, cantidades y total mediante una fuente confiable y controles de integridad.
- [ ] Revisar y documentar las reglas de seguridad de Firestore.

### Etapa 2 — Catálogo y experiencia de usuario

- [ ] Ampliar el catálogo de discos y revisar la calidad de sus metadatos.
- [ ] Implementar la búsqueda del navbar y ampliar filtros y categorías.
- [ ] Optimizar y verificar la interfaz responsive en distintos tamaños de pantalla.
- [ ] Completar los estados de carga existentes con mensajes de error y resultados vacíos.
- [ ] Mantener y refinar la identidad underground con tipografía de alto impacto.

### Etapa 3 — Autenticación y sesiones

Implementar Firebase Authentication para:

- [ ] Registro, inicio y cierre de sesión.
- [ ] Persistencia de la sesión y perfil de usuario.
- [ ] Historial de órdenes vinculado al usuario autenticado.
- [ ] Protección de datos y permisos mediante reglas de Firestore.
- [ ] Evaluar posteriormente recuperación de contraseña y administración de cuentas.

### Etapa 4 — Insomnio Radio

Desarrollar **En rotación**, una sección musical inspirada en la experiencia editorial de Adult Swim y en interfaces musicales experimentales. La etiqueta que ya aparece en el hero es únicamente visual; no hay reproducción implementada.

- [ ] Seleccionar canciones y videoclips de artistas del catálogo.
- [ ] Integrar reproductores oficiales de YouTube o Spotify.
- [ ] Incorporar un minirreproductor discreto al navbar.
- [ ] Mantener su estado durante la navegación cuando la integración lo permita.
- [ ] Iniciar la reproducción por decisión del usuario, sin autoplay.
- [ ] Vincular artistas y contenido musical con productos disponibles.
- [ ] Aplicar estética oscura, tipografía monoespaciada y animaciones sutiles.
- [ ] Evaluar un `MusicPlayerContext` para administrar el estado compartido.

Esta etapa no contempla alojar directamente archivos musicales comerciales en el proyecto.

### Etapa 5 — Testing y documentación

- [ ] Documentar funciones importantes mediante JSDoc.
- [ ] Crear y mantener `APUNTES.md` con conceptos técnicos; el archivo todavía no existe.
- [ ] Incorporar pruebas automatizadas con Selenium o Playwright.
- [ ] Probar carrito, checkout, stock y futuras sesiones.
- [ ] Agregar escenarios negativos y de concurrencia.
- [ ] Revisar accesibilidad y rendimiento.
- [ ] Resolver los errores actuales de ESLint.

### Etapa 6 — Despliegue y portfolio

- [ ] Preparar la aplicación para producción y revisar el tamaño de la compilación.
- [ ] Completar la configuración mediante variables de entorno.
- [ ] Desplegar la aplicación y configurar la resolución de rutas de la SPA.
- [ ] Agregar capturas de pantalla y un enlace a la demo.
- [ ] Validar estas instrucciones de instalación en un entorno limpio y mantenerlas actualizadas.
- [ ] Revisar la publicación y presentación del repositorio existente.
- [ ] Preparar una presentación técnica para LinkedIn.

## Testing

No hay un script `test`, una suite automatizada ni dependencias de Selenium o Playwright declaradas. ESLint es análisis estático y no reemplaza las pruebas funcionales.

| Verificación | Estado observado |
| --- | --- |
| Compilación | La última ejecución local de `npm run build` finalizó correctamente; Vite advirtió sobre chunks de más de 500 kB |
| ESLint | La ejecución durante esta revisión reportó 10 errores: imports sin uso, actualizaciones síncronas de estado dentro de efectos y exportación de contexto junto a componentes |
| Checkout contra Firestore | No verificado de extremo a extremo; requiere resolver o comprobar las colecciones e IDs |
| Stock concurrente, reglas y sesiones | Sin pruebas verificadas; autenticación aún no implementada |

Escenarios mínimos pendientes: persistencia y recuperación del carrito, límites de cantidades, stock cero, stock insuficiente, producto inexistente, correos distintos, fallo de red, permisos denegados y dos compras concurrentes sobre las últimas unidades. Verificar también que una transacción fallida no cree una orden ni descuente parcialmente el inventario.

## Estado actual del proyecto

**En desarrollo.** Hay un catálogo conectado a Firestore, carrito persistente y código de checkout transaccional. No se considera un flujo de compra validado para producción hasta comprobar la coherencia de colecciones, la integridad de precios y cantidades y las reglas de acceso.

La interfaz ya incorpora estilos responsive y una identidad visual propia. Búsqueda, usuarios, sesiones, radio musical y pruebas automatizadas forman parte del roadmap. Este README no acredita una auditoría de la base de datos remota ni un despliegue público verificado.

Como referencia del template original, se conservan los enlaces a los plugins oficiales [React](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react) y [React SWC](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react-swc). El proyecto usa el primero. React Compiler no está habilitado; su [documentación de instalación](https://react.dev/learn/react-compiler/installation) queda como referencia. Una eventual migración a TypeScript puede tomar como referencia el [template React TS de Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) y [typescript-eslint](https://typescript-eslint.io/); no está implementada.

## Autor

[Max-Wulf](https://github.com/Max-Wulf).

[Repositorio de Insomnio Records](https://github.com/Max-Wulf/insomnio-records)
