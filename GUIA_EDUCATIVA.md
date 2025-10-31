# 📚 Guía Educativa - Trabajo Práctico 6

## 🎯 Objetivos de Aprendizaje

Este trabajo práctico tiene como objetivo que los alumnos comprendan y apliquen:

1. **Consumo de APIs REST** con Fetch API
2. **Manipulación del DOM** con JavaScript vanilla
3. **Persistencia de datos** con LocalStorage
4. **Métodos de arrays** (forEach, map, filter, sort)
5. **Event handling** y navegación programática
6. **Diseño responsive** con Bootstrap

---

## 📖 Explicación Paso a Paso

### Paso 1: Consumo de la API

#### ¿Qué es una API?
Una API (Application Programming Interface) es un conjunto de reglas que permite que diferentes aplicaciones se comuniquen entre sí. En este caso, usamos la **FakeStore API** que nos proporciona datos de productos ficticios.

#### Fetch API
```javascript
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => console.log(data))
```

**¿Qué hace este código?**
1. `fetch()` hace una petición HTTP a la URL
2. `.then(response => response.json())` convierte la respuesta en formato JSON
3. `.then(data => console.log(data))` trabaja con los datos recibidos

**Versión moderna con async/await:**
```javascript
async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

#### forEach() vs map()
```javascript
// forEach - Solo itera, no retorna nada
products.forEach(product => {
  console.log(product.title);
});

// map - Transforma y retorna un nuevo array
const titles = products.map(product => product.title);
```

---

### Paso 2: Event Listeners y LocalStorage

#### Event Listeners
Los event listeners "escuchan" eventos del usuario (clicks, inputs, etc.)

```javascript
element.addEventListener('click', () => {
  // Código que se ejecuta al hacer click
});
```

#### LocalStorage
LocalStorage permite guardar datos en el navegador del usuario que persisten incluso después de cerrar la página.

**Importante:** LocalStorage solo guarda strings, por eso usamos JSON.

```javascript
// Guardar un objeto
const product = { id: 1, name: "Producto" };
localStorage.setItem('selectedProduct', JSON.stringify(product));

// Recuperar el objeto
const savedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
```

**¿Por qué JSON.stringify() y JSON.parse()?**
- `JSON.stringify()`: Convierte un objeto JavaScript a string
- `JSON.parse()`: Convierte un string JSON a objeto JavaScript

---

### Paso 3: Navegación Programática

```javascript
window.location.href = 'product-details.html';
```

Esto cambia la URL del navegador y navega a otra página, similar a hacer click en un enlace.

**Otras opciones:**
```javascript
// Navegar y agregar a historial
window.location.assign('product-details.html');

// Navegar sin agregar a historial
window.location.replace('product-details.html');

// Recargar página
window.location.reload();
```

---

### Paso 4: Renderizado Dinámico

#### Template Literals
Usamos template literals (backticks) para crear HTML dinámico:

```javascript
const html = `
  <div class="card">
    <h2>${product.title}</h2>
    <p>$${product.price}</p>
  </div>
`;
```

**Ventajas:**
- Interpolación de variables con `${}`
- Strings multilínea
- Más legible que concatenación

---

## 🎁 BONUS: Filtros y Ordenamiento

### filter()
Crea un nuevo array con elementos que cumplan una condición:

```javascript
// Filtrar productos por categoría
const electronics = products.filter(product => 
  product.category === 'electronics'
);

// Filtrar por precio
const cheap = products.filter(product => product.price < 100);

// Filtrar por búsqueda
const results = products.filter(product => 
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
);
```

### sort()
Ordena los elementos de un array:

```javascript
// Ordenar por precio (ascendente)
products.sort((a, b) => a.price - b.price);

// Ordenar por precio (descendente)
products.sort((a, b) => b.price - a.price);

// Ordenar alfabéticamente
products.sort((a, b) => a.title.localeCompare(b.title));
```

**¿Cómo funciona sort()?**
- Compara dos elementos (a y b)
- Si retorna < 0: a va antes que b
- Si retorna > 0: b va antes que a
- Si retorna 0: mantienen su orden

### Combinando filtros
```javascript
let result = products
  .filter(p => p.category === 'electronics')  // Filtrar por categoría
  .filter(p => p.price < 500)                 // Filtrar por precio
  .sort((a, b) => a.price - b.price);         // Ordenar
```

---

## 🔧 Conceptos Importantes

### 1. Spread Operator (...)
```javascript
// Copiar un array
const copy = [...originalArray];

// Combinar arrays
const combined = [...array1, ...array2];
```

### 2. Destructuring
```javascript
// Extraer propiedades de un objeto
const { title, price, category } = product;

// Es equivalente a:
const title = product.title;
const price = product.price;
const category = product.category;
```

### 3. Arrow Functions
```javascript
// Función tradicional
function suma(a, b) {
  return a + b;
}

// Arrow function
const suma = (a, b) => a + b;

// Arrow function con múltiples líneas
const suma = (a, b) => {
  const result = a + b;
  return result;
};
```

### 4. Ternario
```javascript
// If-else tradicional
let message;
if (price > 100) {
  message = "Caro";
} else {
  message = "Barato";
}

// Operador ternario
const message = price > 100 ? "Caro" : "Barato";
```

---

## 🐛 Debugging Tips

### 1. Console.log es tu amigo
```javascript
console.log('Productos:', products);
console.log('Producto seleccionado:', product);
console.table(products); // Muestra en tabla
```

### 2. Verificar LocalStorage
En las DevTools del navegador:
- Application → Local Storage → tu dominio

### 3. Network Tab
Para ver las peticiones HTTP:
- Network → XHR/Fetch

### 4. Errores comunes

**Error: Cannot read property 'X' of null**
```javascript
// Mal
const product = JSON.parse(localStorage.getItem('product'));
console.log(product.title); // Error si product es null

// Bien
const product = JSON.parse(localStorage.getItem('product'));
if (product) {
  console.log(product.title);
}
```

**Error: Unexpected token in JSON**
```javascript
// Mal - Olvidaste JSON.stringify()
localStorage.setItem('product', product); // Guarda [object Object]

// Bien
localStorage.setItem('product', JSON.stringify(product));
```

---

## 💡 Mejores Prácticas

### 1. Nombres descriptivos
```javascript
// Mal
const d = data;
const p = products;

// Bien
const productData = data;
const filteredProducts = products;
```

### 2. Funciones pequeñas y específicas
```javascript
// Cada función hace una cosa
function fetchProducts() { /* ... */ }
function renderProducts() { /* ... */ }
function filterProducts() { /* ... */ }
```

### 3. Manejo de errores
```javascript
try {
  const response = await fetch(url);
  const data = await response.json();
} catch (error) {
  console.error('Error:', error);
  // Mostrar mensaje al usuario
}
```

### 4. Validación de datos
```javascript
if (!product || !product.title) {
  console.error('Producto inválido');
  return;
}
```

---

## 🎨 Bootstrap Tips

### Grid System
```html
<!-- 4 columnas en desktop, 2 en tablet, 1 en móvil -->
<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
  <div class="col">...</div>
</div>
```

### Spacing
```html
<!-- Margin y Padding -->
<div class="mt-3">Margin top 3</div>
<div class="p-4">Padding 4</div>
<div class="mx-auto">Margin horizontal auto (centrar)</div>
```

### Utilities
```html
<!-- Texto -->
<p class="text-center text-primary fw-bold">Texto</p>

<!-- Display -->
<div class="d-flex justify-content-between align-items-center">
  <span>Izquierda</span>
  <span>Derecha</span>
</div>
```

---

## 📝 Checklist de Evaluación

- [ ] ✅ Consume la API correctamente
- [ ] ✅ Renderiza todos los productos
- [ ] ✅ Usa forEach() o map() para iterar
- [ ] ✅ Click handler en cada producto
- [ ] ✅ Guarda en localStorage con JSON.stringify()
- [ ] ✅ Navega a product-details.html
- [ ] ✅ Recupera datos con JSON.parse()
- [ ] ✅ Muestra toda la información del producto
- [ ] 🎁 Implementa filtros con filter()
- [ ] 🎁 Implementa ordenamiento con sort()
- [ ] 🎁 Implementa buscador
- [ ] 🎨 Diseño responsive
- [ ] 🎨 Buena experiencia de usuario

---

## 🚀 Desafíos Adicionales

Si terminaste todo, intenta:

1. **Carrito de compras**: Guardar múltiples productos en localStorage
2. **Favoritos**: Marcar productos como favoritos
3. **Paginación**: Mostrar 10 productos por página
4. **Animaciones**: Agregar transiciones CSS
5. **Dark mode**: Implementar tema oscuro
6. **Compartir**: Usar la Web Share API
7. **PWA**: Convertir en Progressive Web App

---

## 📚 Recursos Adicionales

- [MDN - Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [MDN - LocalStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)
- [MDN - Array Methods](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [FakeStore API](https://fakestoreapi.com/)

---

**¡Éxito con el proyecto! 🎉**
