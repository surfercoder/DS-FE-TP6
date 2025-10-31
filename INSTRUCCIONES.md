# 🚀 Instrucciones de Uso

## ✅ Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para cargar Bootstrap y la API)
- Editor de código (VS Code recomendado)

## 📂 Estructura del Proyecto

```
DS-FE-TP6/
├── 📄 index.html              # Página principal (listado de productos)
├── 📄 index.js                # Lógica de la página principal
├── 📄 product-details.html    # Página de detalles del producto
├── 📄 product-details.js      # Lógica de la página de detalles
├── 📄 styles.css              # Estilos personalizados
├── 📄 README.md               # Documentación del proyecto
├── 📄 GUIA_EDUCATIVA.md       # Guía educativa con explicaciones
├── 📄 EJEMPLOS_CODIGO.js      # Ejemplos de código comentados
└── 📄 INSTRUCCIONES.md        # Este archivo
```

## 🎯 Cómo Ejecutar el Proyecto

### Opción 1: Abrir directamente en el navegador

1. Navega a la carpeta del proyecto
2. Haz doble click en `index.html`
3. Se abrirá en tu navegador predeterminado

### Opción 2: Usar Live Server (Recomendado)

Si usas VS Code:

1. Instala la extensión "Live Server"
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"
4. Se abrirá en `http://localhost:5500`

**Ventajas:**
- Recarga automática al guardar cambios
- Mejor para desarrollo

### Opción 3: Servidor HTTP simple con Python

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Luego abre: `http://localhost:8000`

### Opción 4: Servidor HTTP con Node.js

```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar en la carpeta del proyecto
http-server -p 8000
```

Luego abre: `http://localhost:8000`

## 🧪 Cómo Probar la Aplicación

### 1. Página Principal (index.html)

**Funcionalidades a probar:**

✅ **Carga de productos**
- Al abrir la página, deberías ver un spinner de carga
- Luego aparecen los productos en cards
- Cada card muestra: imagen, título, categoría, precio y rating

✅ **Búsqueda**
- Escribe en el campo de búsqueda (ej: "shirt")
- Los productos se filtran en tiempo real
- Prueba buscar por: título, descripción o categoría

✅ **Filtro por categoría**
- Selecciona una categoría del dropdown
- Solo se muestran productos de esa categoría
- Prueba combinar búsqueda + filtro de categoría

✅ **Ordenamiento**
- Selecciona "Precio: Menor a Mayor"
- Los productos se reordenan
- Prueba todos los tipos de ordenamiento:
  - Precio ascendente/descendente
  - Nombre A-Z / Z-A

✅ **Click en producto**
- Haz click en cualquier producto
- Deberías navegar a la página de detalles
- Verifica que se muestra la información correcta

### 2. Página de Detalles (product-details.html)

**Funcionalidades a probar:**

✅ **Información del producto**
- Verifica que se muestra:
  - Imagen grande
  - Título completo
  - Descripción completa
  - Precio
  - Rating con barra de progreso
  - Número de reseñas
  - Categoría
  - ID del producto

✅ **Navegación**
- Click en "Volver a productos"
- Deberías regresar al listado

✅ **Botones de acción**
- Click en "Agregar al carrito" → Alert de confirmación
- Click en "Compartir" → Copia el enlace o abre el diálogo de compartir

### 3. LocalStorage

**Verificar en DevTools:**

1. Abre las DevTools (F12)
2. Ve a la pestaña "Application" (Chrome) o "Storage" (Firefox)
3. Selecciona "Local Storage" → tu dominio
4. Deberías ver la clave `selectedProduct` con el JSON del producto

**Prueba:**
- Selecciona un producto
- Cierra la pestaña de detalles
- Abre `product-details.html` directamente
- Deberías ver el último producto seleccionado

### 4. Responsive Design

**Prueba en diferentes tamaños:**

- **Desktop (>1200px)**: 4 productos por fila
- **Tablet (768px-1200px)**: 2-3 productos por fila
- **Móvil (<768px)**: 1 producto por fila

**Cómo probar:**
1. Abre DevTools (F12)
2. Click en el ícono de dispositivo móvil
3. Prueba diferentes tamaños de pantalla

## 🔍 Debugging

### Consola del Navegador

Abre la consola (F12 → Console) para ver:
- Logs de carga de productos
- Errores si los hay
- Información de debugging

### Errores Comunes

**1. Los productos no cargan**
- ✅ Verifica tu conexión a internet
- ✅ Revisa la consola por errores
- ✅ Verifica que la URL de la API es correcta

**2. LocalStorage no funciona**
- ✅ Asegúrate de estar usando HTTP/HTTPS (no file://)
- ✅ Verifica que el navegador permita LocalStorage
- ✅ Revisa que no estés en modo incógnito

**3. Estilos no se aplican**
- ✅ Verifica que `styles.css` esté en la misma carpeta
- ✅ Revisa que el link en el HTML sea correcto
- ✅ Limpia la caché del navegador (Ctrl+Shift+R)

**4. Bootstrap no carga**
- ✅ Verifica tu conexión a internet
- ✅ Revisa que los links de CDN sean correctos

## 📊 Verificación de Requisitos

### Paso 1: Listado de productos ✅
- [x] Consume FakeStore API con fetch
- [x] Renderiza productos en cards HTML
- [x] Usa forEach() para iterar

### Paso 2: Click handler ✅
- [x] Event listener en cada producto
- [x] Guarda en localStorage con JSON.stringify()

### Paso 3: Navegación ✅
- [x] Navega a product-details.html
- [x] Usa window.location.href

### Paso 4: Página de detalles ✅
- [x] Recupera datos con JSON.parse()
- [x] Renderiza toda la información:
  - [x] Título
  - [x] Imagen
  - [x] Descripción
  - [x] Precio
  - [x] Rating
  - [x] Categoría

### BONUS ✅
- [x] Filtros por categoría con filter()
- [x] Ordenamiento con sort()
- [x] Buscador con filter()
- [x] Diseño responsive
- [x] Efectos hover
- [x] Loading states

## 🎨 Personalización

### Cambiar colores

Edita `styles.css`:

```css
:root {
  --primary-color: #0d6efd;  /* Cambia este color */
  --secondary-color: #6c757d;
  /* ... más colores */
}
```

### Cambiar el header

Edita en `index.html`:

```html
<div class="bg-primary text-white py-5">
  <div class="container">
    <h1 class="display-4">Tu Título</h1>
    <p class="lead">Tu descripción</p>
  </div>
</div>
```

### Agregar más filtros

En `index.js`, puedes agregar filtros por precio, rating, etc.

## 📚 Recursos de Aprendizaje

### Documentación
- [FakeStore API](https://fakestoreapi.com/)
- [Bootstrap 5](https://getbootstrap.com/docs/5.3/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Archivos del proyecto
- `README.md` - Documentación general
- `GUIA_EDUCATIVA.md` - Explicaciones detalladas
- `EJEMPLOS_CODIGO.js` - Ejemplos de código

## 🐛 Reportar Problemas

Si encuentras algún problema:

1. Verifica la consola del navegador
2. Revisa que todos los archivos estén presentes
3. Asegúrate de tener conexión a internet
4. Prueba en otro navegador

## ✨ Mejoras Sugeridas

Una vez que domines el proyecto básico, intenta:

1. **Carrito de compras**
   - Agregar productos al carrito
   - Guardar carrito en localStorage
   - Mostrar total

2. **Favoritos**
   - Marcar productos como favoritos
   - Persistir en localStorage
   - Página de favoritos

3. **Paginación**
   - Mostrar 12 productos por página
   - Botones de navegación

4. **Más filtros**
   - Rango de precios
   - Filtro por rating
   - Múltiples categorías

5. **Animaciones**
   - Transiciones suaves
   - Efectos de carga
   - Animaciones de entrada

## 🎓 Evaluación

### Criterios de evaluación sugeridos:

- **Funcionalidad (40%)**
  - Carga de productos
  - Navegación
  - LocalStorage
  - Filtros y búsqueda

- **Código (30%)**
  - Uso correcto de métodos de arrays
  - Manejo de promesas
  - Organización del código
  - Comentarios

- **Diseño (20%)**
  - Responsive
  - UX/UI
  - Consistencia visual

- **Bonus (10%)**
  - Funcionalidades extra
  - Creatividad
  - Optimizaciones

---

**¡Éxito con el proyecto! 🚀**

Si tienes dudas, revisa los archivos de documentación o consulta con tu profesor.
