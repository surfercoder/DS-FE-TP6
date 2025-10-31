# DS-FE-TP6 - Tienda Online con FakeStore API

Desarrollo Software - Frontend - Trabajo Práctico 6

## 📋 Descripción

Tienda online completa que consume datos de la **FakeStore API**, implementa navegación entre páginas y utiliza almacenamiento local para persistir información.

## 🚀 Características Implementadas

### ✅ Paso 1: Listado de productos
- Consumo de la FakeStore API usando `fetch()`
- Renderizado de productos en cards HTML con Bootstrap
- Uso de `forEach()` para iterar sobre los productos
- Diseño responsive con grid de Bootstrap

### ✅ Paso 2: Click handler
- Event listeners en cada producto
- Guardado de información completa en `localStorage` usando `JSON.stringify()`
- Efecto hover en las cards para mejor UX

### ✅ Paso 3: Navegación
- Navegación programática a `product-details.html` usando `window.location.href`
- Transición suave entre páginas

### ✅ Paso 4: Página de detalles
- Recuperación de datos de `localStorage` con `JSON.parse()`
- Renderizado completo de información:
  - Título del producto
  - Imagen en alta calidad
  - Descripción detallada
  - Precio
  - Rating con visualización gráfica
  - Número de reseñas
  - Categoría
  - ID del producto

### 🎁 BONUS Implementado

#### 🔍 Buscador
- Búsqueda en tiempo real usando `filter()`
- Búsqueda por título, descripción y categoría
- Sin necesidad de presionar botón (búsqueda instantánea)

#### 📂 Filtros por categoría
- Filtro dinámico usando `filter()`
- Categorías extraídas automáticamente de la API
- Combinación de filtros con búsqueda

#### 🔄 Ordenamiento
- Ordenamiento por precio (ascendente/descendente) usando `sort()`
- Ordenamiento alfabético (A-Z / Z-A)
- Ordenamiento en memoria (sin llamadas adicionales a la API)

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS**: Bootstrap 5.3.8 para estilos
- **JavaScript (ES6+)**: Lógica de la aplicación
  - Fetch API para consumo de datos
  - LocalStorage para persistencia
  - Métodos de arrays: `forEach()`, `map()`, `filter()`, `sort()`
  - Async/Await para manejo de promesas

## 📁 Estructura del Proyecto

```
DS-FE-TP6/
├── index.html              # Página principal con listado de productos
├── index.js                # Lógica de la página principal
├── product-details.html    # Página de detalles del producto
├── product-details.js      # Lógica de la página de detalles
└── README.md              # Este archivo
```

## 🎯 Cómo Usar

1. **Abrir el proyecto**: Simplemente abre `index.html` en tu navegador
2. **Explorar productos**: Navega por el catálogo de productos
3. **Buscar**: Usa el campo de búsqueda para encontrar productos específicos
4. **Filtrar**: Selecciona una categoría del dropdown
5. **Ordenar**: Elige un criterio de ordenamiento
6. **Ver detalles**: Haz click en cualquier producto para ver sus detalles completos
7. **Volver**: Usa el botón "Volver a productos" para regresar al catálogo

## 🔑 Conceptos Clave Aplicados

### Fetch API
```javascript
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => console.log(data))
```

### LocalStorage
```javascript
// Guardar
localStorage.setItem('selectedProduct', JSON.stringify(product));

// Recuperar
const product = JSON.parse(localStorage.getItem('selectedProduct'));
```

### Métodos de Arrays
```javascript
// forEach - Iterar
products.forEach(product => renderProduct(product));

// map - Transformar
const categories = products.map(product => product.category);

// filter - Filtrar
const filtered = products.filter(product => product.price < 100);

// sort - Ordenar
products.sort((a, b) => a.price - b.price);
```

### Event Listeners
```javascript
element.addEventListener('click', () => handleClick());
```

### Navegación Programática
```javascript
window.location.href = 'product-details.html';
```

## 🎨 Características de Diseño

- **Responsive**: Adaptable a móviles, tablets y desktop
- **Cards modernas**: Con sombras y efectos hover
- **Navbar**: Navegación consistente
- **Loading state**: Spinner mientras cargan los productos
- **Empty states**: Mensajes cuando no hay resultados
- **Rating visual**: Barra de progreso para calificaciones
- **Badges**: Para categorías y ratings

## 📚 API Utilizada

**FakeStore API**: https://fakestoreapi.com/products

Estructura de datos de cada producto:
```json
{
  "id": 1,
  "title": "Producto",
  "price": 109.95,
  "description": "Descripción del producto",
  "category": "categoría",
  "image": "url-imagen",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}
```

## 💡 Mejoras Futuras Sugeridas

- Implementar carrito de compras funcional
- Agregar paginación para mejor rendimiento
- Implementar favoritos con localStorage
- Agregar más filtros (por rango de precio, por rating)
- Implementar productos relacionados reales
- Agregar animaciones de transición
- Modo oscuro/claro

## 👨‍🎓 Aprendizajes

Este proyecto demuestra:
- Consumo de APIs REST
- Manipulación del DOM
- Gestión de estado con localStorage
- Programación funcional con métodos de arrays
- Event handling
- Navegación entre páginas
- Diseño responsive con Bootstrap
- Buenas prácticas de JavaScript moderno

---

**Desarrollado como parte del curso de Desarrollo de Software - Frontend**
