// ============================================
// EJEMPLOS DE CÓDIGO PARA APRENDER
// ============================================
// Este archivo contiene ejemplos comentados de los conceptos
// utilizados en el proyecto. NO es necesario para que funcione
// la aplicación, es solo con fines educativos.

// ============================================
// 1. FETCH API - Consumo de APIs
// ============================================

// Ejemplo básico con .then()
function fetchProductsWithThen() {
  fetch('https://fakestoreapi.com/products')
    .then(response => {
      // response es la respuesta HTTP
      console.log('Status:', response.status); // 200, 404, etc.
      return response.json(); // Convertir a JSON
    })
    .then(data => {
      // data contiene los productos
      console.log('Productos:', data);
    })
    .catch(error => {
      // Capturar errores
      console.error('Error:', error);
    });
}

// Ejemplo moderno con async/await (RECOMENDADO)
async function fetchProductsWithAsync() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Productos:', data);
    return data;
  } catch (error) {
    console.error('Error al cargar productos:', error);
    return [];
  }
}

// Fetch con opciones (POST, headers, etc.)
async function createProduct() {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Nuevo producto',
        price: 13.5,
        description: 'Descripción',
        category: 'electronics'
      })
    });
    
    const data = await response.json();
    console.log('Producto creado:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// ============================================
// 2. MÉTODOS DE ARRAYS
// ============================================

const products = [
  { id: 1, title: 'Laptop', price: 999, category: 'electronics' },
  { id: 2, title: 'Camisa', price: 29, category: 'clothing' },
  { id: 3, title: 'Mouse', price: 15, category: 'electronics' },
  { id: 4, title: 'Pantalón', price: 45, category: 'clothing' }
];

// -------- forEach() --------
// Itera sobre cada elemento, NO retorna nada
console.log('=== forEach ===');
products.forEach((product, index) => {
  console.log(`${index + 1}. ${product.title} - $${product.price}`);
});

// -------- map() --------
// Transforma cada elemento y retorna un NUEVO array
console.log('=== map ===');
const titles = products.map(product => product.title);
console.log('Títulos:', titles); // ['Laptop', 'Camisa', 'Mouse', 'Pantalón']

const productsWithTax = products.map(product => ({
  ...product,
  priceWithTax: product.price * 1.21 // 21% de impuesto
}));
console.log('Con impuestos:', productsWithTax);

// -------- filter() --------
// Filtra elementos que cumplan una condición
console.log('=== filter ===');
const electronics = products.filter(product => product.category === 'electronics');
console.log('Electrónicos:', electronics);

const cheapProducts = products.filter(product => product.price < 50);
console.log('Productos baratos:', cheapProducts);

// Filtros combinados
const cheapElectronics = products.filter(product => 
  product.category === 'electronics' && product.price < 100
);

// -------- find() --------
// Encuentra el PRIMER elemento que cumple la condición
console.log('=== find ===');
const laptop = products.find(product => product.title === 'Laptop');
console.log('Laptop encontrada:', laptop);

const expensive = products.find(product => product.price > 500);
console.log('Primer producto caro:', expensive);

// -------- sort() --------
// Ordena el array (MODIFICA el array original)
console.log('=== sort ===');

// Ordenar por precio (ascendente)
const byPriceAsc = [...products].sort((a, b) => a.price - b.price);
console.log('Por precio (menor a mayor):', byPriceAsc);

// Ordenar por precio (descendente)
const byPriceDesc = [...products].sort((a, b) => b.price - a.price);
console.log('Por precio (mayor a menor):', byPriceDesc);

// Ordenar alfabéticamente
const alphabetical = [...products].sort((a, b) => a.title.localeCompare(b.title));
console.log('Alfabético:', alphabetical);

// -------- reduce() --------
// Reduce el array a un solo valor
console.log('=== reduce ===');
const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
console.log('Precio total:', totalPrice);

// Contar productos por categoría
const countByCategory = products.reduce((acc, product) => {
  acc[product.category] = (acc[product.category] || 0) + 1;
  return acc;
}, {});
console.log('Productos por categoría:', countByCategory);

// -------- some() y every() --------
console.log('=== some y every ===');
const hasExpensive = products.some(product => product.price > 500);
console.log('¿Hay productos caros?', hasExpensive);

const allCheap = products.every(product => product.price < 1000);
console.log('¿Todos son baratos?', allCheap);

// -------- Encadenamiento (chaining) --------
console.log('=== Encadenamiento ===');
const result = products
  .filter(p => p.category === 'electronics')  // Filtrar electrónicos
  .map(p => ({ ...p, discount: p.price * 0.1 }))  // Agregar descuento
  .sort((a, b) => a.price - b.price);  // Ordenar por precio

console.log('Electrónicos con descuento:', result);

// ============================================
// 3. LOCALSTORAGE
// ============================================

// Guardar datos simples
localStorage.setItem('username', 'Juan');
localStorage.setItem('theme', 'dark');

// Recuperar datos
const username = localStorage.getItem('username');
console.log('Usuario:', username);

// Eliminar un item
localStorage.removeItem('theme');

// Limpiar todo
// localStorage.clear();

// Guardar objetos (IMPORTANTE: usar JSON)
const user = {
  name: 'Juan',
  age: 25,
  email: 'juan@example.com'
};

// Guardar objeto
localStorage.setItem('user', JSON.stringify(user));

// Recuperar objeto
const savedUser = JSON.parse(localStorage.getItem('user'));
console.log('Usuario guardado:', savedUser);

// Guardar array de productos
const cart = [
  { id: 1, title: 'Laptop', quantity: 1 },
  { id: 2, title: 'Mouse', quantity: 2 }
];

localStorage.setItem('cart', JSON.stringify(cart));

// Recuperar y modificar
const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
savedCart.push({ id: 3, title: 'Teclado', quantity: 1 });
localStorage.setItem('cart', JSON.stringify(savedCart));

// Verificar si existe
if (localStorage.getItem('cart')) {
  console.log('Hay items en el carrito');
}

// ============================================
// 4. MANIPULACIÓN DEL DOM
// ============================================

// Seleccionar elementos
const container = document.getElementById('container');
const buttons = document.querySelectorAll('.btn');
const firstButton = document.querySelector('.btn');

// Crear elementos
const div = document.createElement('div');
div.className = 'card';
div.id = 'product-1';

// Agregar contenido
div.textContent = 'Texto simple';
div.innerHTML = '<h2>Título</h2><p>Párrafo</p>';

// Template literals para HTML complejo
const product = { title: 'Laptop', price: 999 };
div.innerHTML = `
  <div class="card">
    <h3>${product.title}</h3>
    <p>$${product.price}</p>
    <button class="btn">Comprar</button>
  </div>
`;

// Agregar al DOM
container.appendChild(div);
container.insertBefore(div, container.firstChild);

// Modificar estilos
div.style.backgroundColor = 'blue';
div.style.padding = '20px';

// Agregar/quitar clases
div.classList.add('active');
div.classList.remove('inactive');
div.classList.toggle('selected');
div.classList.contains('active'); // true/false

// Atributos
div.setAttribute('data-id', '123');
const dataId = div.getAttribute('data-id');
div.removeAttribute('data-id');

// ============================================
// 5. EVENT LISTENERS
// ============================================

// Click simple
const button = document.querySelector('#myButton');
button.addEventListener('click', () => {
  console.log('Click!');
});

// Click con parámetros
function handleClick(productId) {
  console.log('Producto clickeado:', productId);
}

button.addEventListener('click', () => handleClick(123));

// Event object
button.addEventListener('click', (event) => {
  console.log('Elemento clickeado:', event.target);
  console.log('Coordenadas:', event.clientX, event.clientY);
  event.preventDefault(); // Prevenir comportamiento default
  event.stopPropagation(); // Detener propagación
});

// Input events
const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', (e) => {
  console.log('Valor actual:', e.target.value);
});

// Change event (para selects)
const select = document.querySelector('#category');
select.addEventListener('change', (e) => {
  console.log('Categoría seleccionada:', e.target.value);
});

// Submit event (formularios)
const form = document.querySelector('#myForm');
form.addEventListener('submit', (e) => {
  e.preventDefault(); // IMPORTANTE: prevenir recarga de página
  const formData = new FormData(form);
  console.log('Datos del formulario:', Object.fromEntries(formData));
});

// Múltiples elementos
const allButtons = document.querySelectorAll('.product-card');
allButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    console.log('Card clickeada:', index);
  });
});

// Delegación de eventos (más eficiente)
const productsContainer = document.querySelector('#products');
productsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('buy-btn')) {
    const productId = e.target.dataset.productId;
    console.log('Comprar producto:', productId);
  }
});

// ============================================
// 6. FUNCIONES ÚTILES
// ============================================

// Debounce (para búsqueda)
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Uso:
const search = debounce((term) => {
  console.log('Buscando:', term);
}, 300);

searchInput.addEventListener('input', (e) => search(e.target.value));

// Formatear precio
function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(price);
}

console.log(formatPrice(1234.56)); // $1.234,56

// Truncar texto
function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

console.log(truncate('Texto muy largo', 10)); // "Texto muy ..."

// ============================================
// 7. PROMESAS Y ASYNC/AWAIT
// ============================================

// Crear una promesa
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usar con .then()
delay(1000).then(() => console.log('1 segundo después'));

// Usar con async/await
async function example() {
  console.log('Inicio');
  await delay(1000);
  console.log('1 segundo después');
}

// Promesas en paralelo
async function fetchMultiple() {
  const [products, categories] = await Promise.all([
    fetch('https://fakestoreapi.com/products').then(r => r.json()),
    fetch('https://fakestoreapi.com/products/categories').then(r => r.json())
  ]);
  
  console.log('Productos:', products);
  console.log('Categorías:', categories);
}

// ============================================
// 8. DESTRUCTURING Y SPREAD
// ============================================

// Destructuring de objetos
const product1 = { id: 1, title: 'Laptop', price: 999 };
const { id, title, price } = product1;
console.log(title); // 'Laptop'

// Con renombre
const { title: productName } = product1;
console.log(productName); // 'Laptop'

// Con valores default
const { stock = 0 } = product1;
console.log(stock); // 0

// Destructuring de arrays
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(first); // 1
console.log(rest); // [3, 4, 5]

// Spread operator - Copiar objetos
const product2 = { ...product1 };
const productWithDiscount = { ...product1, discount: 10 };

// Spread operator - Copiar arrays
const numbers2 = [...numbers];
const combined = [...numbers, 6, 7, 8];

// Combinar objetos
const user1 = { name: 'Juan', age: 25 };
const user2 = { email: 'juan@example.com', age: 26 };
const merged = { ...user1, ...user2 }; // age será 26 (último gana)

// ============================================
// 9. OPERADORES ÚTILES
// ============================================

// Ternario
const age = 18;
const canVote = age >= 18 ? 'Sí' : 'No';

// Nullish coalescing (??)
const username1 = null;
const displayName = username1 ?? 'Invitado'; // 'Invitado'

// Optional chaining (?.)
const user3 = { name: 'Juan' };
console.log(user3?.address?.street); // undefined (no error)

// Logical OR (||) para defaults
const port = process.env.PORT || 3000;

// Logical AND (&&) para condicionales
const isLoggedIn = true;
isLoggedIn && console.log('Usuario logueado');

// ============================================
// 10. TIPS Y TRUCOS
// ============================================

// Remover duplicados de array
const duplicates = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(duplicates)];
console.log(unique); // [1, 2, 3, 4]

// Generar array de números
const range = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(range); // [1, 2, 3, 4, 5]

// Shuffle array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Random entre min y max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Capitalizar primera letra
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Validar email (básico)
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Copiar al clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Copiado!');
  } catch (err) {
    console.error('Error al copiar:', err);
  }
}

// ============================================
// FIN DE LOS EJEMPLOS
// ============================================

console.log('¡Revisa estos ejemplos para aprender más sobre JavaScript!');
