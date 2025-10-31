// Variables globales
let allProducts = [];
let filteredProducts = [];

// Elementos del DOM
const productsContainer = document.getElementById('productsContainer');
const loadingElement = document.getElementById('loading');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortSelect = document.getElementById('sortSelect');

// Paso 1: Consumir la API y obtener productos
async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    allProducts = data;
    filteredProducts = [...data];
    
    // Extraer categorías únicas y poblar el filtro
    populateCategories();
    
    // Renderizar productos
    renderProducts(filteredProducts);
    
    // Ocultar loading
    loadingElement.style.display = 'none';
  } catch (error) {
    console.error('Error al cargar productos:', error);
    loadingElement.innerHTML = `
      <div class="alert alert-danger">
        <h4>Error al cargar productos</h4>
        <p>Por favor, intenta nuevamente más tarde.</p>
      </div>
    `;
  }
}

// Extraer categorías únicas de los productos
function populateCategories() {
  const categories = [...new Set(allProducts.map(product => product.category))];
  
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });
}

// Renderizar productos en el DOM
function renderProducts(products) {
  productsContainer.innerHTML = '';
  
  if (products.length === 0) {
    productsContainer.innerHTML = `
      <div class="col-12">
        <div class="alert alert-info text-center">
          <h4>No se encontraron productos</h4>
          <p>Intenta con otros filtros o búsqueda.</p>
        </div>
      </div>
    `;
    return;
  }
  
  // Usar forEach para iterar sobre los productos
  products.forEach(product => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });
}

// Crear card de producto
function createProductCard(product) {
  const col = document.createElement('div');
  col.className = 'col';
  
  // Truncar título si es muy largo
  const truncatedTitle = product.title.length > 50 
    ? product.title.substring(0, 50) + '...' 
    : product.title;
  
  col.innerHTML = `
    <div class="card h-100 shadow-sm product-card" style="cursor: pointer; transition: transform 0.2s;">
      <img src="${product.image}" class="card-img-top p-3" alt="${product.title}" 
           style="height: 200px; object-fit: contain;">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title" style="font-size: 0.95rem;">${truncatedTitle}</h5>
        <p class="card-text text-muted small flex-grow-1">${product.category}</p>
        <div class="d-flex justify-content-between align-items-center mt-2">
          <span class="h5 mb-0 text-primary">$${product.price.toFixed(2)}</span>
          <span class="badge bg-warning text-dark">
            ⭐ ${product.rating.rate} (${product.rating.count})
          </span>
        </div>
      </div>
    </div>
  `;
  
  // Paso 2: Agregar event listener al hacer click
  col.addEventListener('click', () => handleProductClick(product));
  
  // Efecto hover
  const card = col.querySelector('.card');
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
  
  return col;
}

// Paso 2 y 3: Manejar click en producto
function handleProductClick(product) {
  // Guardar producto en localStorage usando JSON.stringify()
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  
  // Paso 3: Navegar a la página de detalles
  window.location.href = 'product-details.html';
}

// BONUS: Implementar búsqueda (solo por título)
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  if (searchTerm === '') {
    filteredProducts = [...allProducts];
  } else {
    // Filtrar solo por título del producto
    filteredProducts = allProducts.filter(product => 
      product.title.toLowerCase().includes(searchTerm)
    );
  }
  
  applyFiltersAndSort();
}

// BONUS: Filtrar por categoría
function handleCategoryFilter() {
  const selectedCategory = categoryFilter.value;
  
  if (selectedCategory === '') {
    filteredProducts = [...allProducts];
  } else {
    // Usar filter() para filtrar por categoría
    filteredProducts = allProducts.filter(product => 
      product.category === selectedCategory
    );
  }
  
  applyFiltersAndSort();
}

// BONUS: Ordenar productos
function handleSort() {
  const sortValue = sortSelect.value;
  
  // Usar sort() para ordenar
  switch (sortValue) {
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'name-desc':
      filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      // Sin ordenamiento, mantener orden original
      filteredProducts = [...allProducts];
  }
  
  renderProducts(filteredProducts);
}

// Aplicar filtros combinados
function applyFiltersAndSort() {
  let result = [...allProducts];
  
  // Aplicar búsqueda (solo por título)
  const searchTerm = searchInput.value.toLowerCase().trim();
  if (searchTerm !== '') {
    result = result.filter(product => 
      product.title.toLowerCase().includes(searchTerm)
    );
  }
  
  // Aplicar filtro de categoría
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== '') {
    result = result.filter(product => product.category === selectedCategory);
  }
  
  // Aplicar ordenamiento
  const sortValue = sortSelect.value;
  switch (sortValue) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'name-desc':
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }
  
  filteredProducts = result;
  renderProducts(filteredProducts);
}

// Event listeners para filtros y búsqueda
searchInput.addEventListener('input', applyFiltersAndSort);
categoryFilter.addEventListener('change', applyFiltersAndSort);
sortSelect.addEventListener('change', applyFiltersAndSort);

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', fetchProducts);
