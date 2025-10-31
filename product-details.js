// Paso 4: Recuperar datos de localStorage y renderizar

// Elementos del DOM
const productDetailsContainer = document.getElementById('productDetails');
const errorMessage = document.getElementById('errorMessage');

// Función para validar URL de imagen
function isValidImageUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

// Función para sanitizar y validar números
function sanitizeNumber(value, min = 0, max = Infinity) {
  const num = parseFloat(value);
  if (isNaN(num)) return min;
  return Math.max(min, Math.min(max, num));
}

// Función para crear elemento de texto seguro
function createTextElement(tag, text, className = '') {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  return element;
}

// Función para cargar y mostrar los detalles del producto
function loadProductDetails() {
  // Recuperar el producto de localStorage usando JSON.parse()
  const productJSON = localStorage.getItem('selectedProduct');
  
  if (!productJSON) {
    // Si no hay producto guardado, mostrar mensaje de error
    errorMessage.style.display = 'block';
    return;
  }
  
  // Parsear el JSON a objeto JavaScript con manejo de errores
  try {
    const product = JSON.parse(productJSON);
    
    // Validar que el producto tenga las propiedades necesarias
    if (!product || typeof product !== 'object') {
      throw new Error('Producto inválido');
    }
    
    // Renderizar los detalles del producto
    renderProductDetails(product);
  } catch (error) {
    // Manejo de errores: JSON corrupto o inválido
    console.error('Error al parsear producto de localStorage:', error);
    errorMessage.style.display = 'block';
    
    // Limpiar localStorage corrupto
    localStorage.removeItem('selectedProduct');
  }
}

// Renderizar toda la información del producto usando construcción segura del DOM
function renderProductDetails(product) {
  // Limpiar contenedor
  productDetailsContainer.innerHTML = '';
  
  // Sanitizar y validar datos
  const rating = sanitizeNumber(product.rating?.rate, 0, 5);
  const ratingCount = sanitizeNumber(product.rating?.count, 0);
  const price = sanitizeNumber(product.price, 0);
  const ratingPercentage = (rating / 5) * 100;
  
  // Crear estructura principal
  const row = document.createElement('div');
  row.className = 'row';
  
  // === COLUMNA IZQUIERDA: Imagen ===
  const colImage = document.createElement('div');
  colImage.className = 'col-md-5';
  
  const cardImage = document.createElement('div');
  cardImage.className = 'card shadow-sm';
  
  // Validar y crear imagen de forma segura
  if (product.image && isValidImageUrl(product.image)) {
    const img = document.createElement('img');
    img.className = 'card-img-top p-4';
    img.setAttribute('src', product.image);
    img.setAttribute('alt', product.title || 'Producto');
    img.style.height = '400px';
    img.style.objectFit = 'contain';
    cardImage.appendChild(img);
  }
  
  colImage.appendChild(cardImage);
  row.appendChild(colImage);
  
  // === COLUMNA DERECHA: Información ===
  const colInfo = document.createElement('div');
  colInfo.className = 'col-md-7';
  
  const infoContainer = document.createElement('div');
  infoContainer.className = 'ps-md-4';
  
  // Categoría
  const categoryDiv = document.createElement('div');
  categoryDiv.className = 'mb-2';
  const categoryBadge = createTextElement('span', product.category || 'Sin categoría', 'badge bg-secondary text-uppercase');
  categoryDiv.appendChild(categoryBadge);
  infoContainer.appendChild(categoryDiv);
  
  // Título
  const title = createTextElement('h1', product.title || 'Sin título', 'display-5 mb-3');
  infoContainer.appendChild(title);
  
  // Rating
  const ratingDiv = document.createElement('div');
  ratingDiv.className = 'mb-3';
  
  const ratingFlex = document.createElement('div');
  ratingFlex.className = 'd-flex align-items-center';
  
  // Rating número
  const ratingNumDiv = document.createElement('div');
  ratingNumDiv.className = 'me-3';
  const ratingSpan = document.createElement('span');
  ratingSpan.className = 'text-warning fs-4';
  ratingSpan.textContent = `⭐ ${rating.toFixed(1)}`;
  const ratingMaxSpan = document.createElement('span');
  ratingMaxSpan.className = 'text-muted';
  ratingMaxSpan.textContent = ' / 5.0';
  ratingNumDiv.appendChild(ratingSpan);
  ratingNumDiv.appendChild(ratingMaxSpan);
  ratingFlex.appendChild(ratingNumDiv);
  
  // Barra de progreso
  const progressContainer = document.createElement('div');
  progressContainer.className = 'flex-grow-1';
  progressContainer.style.maxWidth = '200px';
  const progressDiv = document.createElement('div');
  progressDiv.className = 'progress';
  progressDiv.style.height = '8px';
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar bg-warning';
  progressBar.setAttribute('role', 'progressbar');
  progressBar.style.width = `${ratingPercentage}%`;
  progressBar.setAttribute('aria-valuenow', rating.toString());
  progressBar.setAttribute('aria-valuemin', '0');
  progressBar.setAttribute('aria-valuemax', '5');
  progressDiv.appendChild(progressBar);
  progressContainer.appendChild(progressDiv);
  ratingFlex.appendChild(progressContainer);
  
  // Contador de reseñas
  const reviewsDiv = document.createElement('div');
  reviewsDiv.className = 'ms-3';
  const reviewsSpan = createTextElement('span', `(${ratingCount} reseñas)`, 'text-muted');
  reviewsDiv.appendChild(reviewsSpan);
  ratingFlex.appendChild(reviewsDiv);
  
  ratingDiv.appendChild(ratingFlex);
  infoContainer.appendChild(ratingDiv);
  
  // Precio
  const priceDiv = document.createElement('div');
  priceDiv.className = 'mb-4';
  const priceH2 = createTextElement('h2', `$${price.toFixed(2)}`, 'text-primary mb-0');
  const priceSub = createTextElement('p', 'Precio incluye impuestos', 'text-muted');
  priceDiv.appendChild(priceH2);
  priceDiv.appendChild(priceSub);
  infoContainer.appendChild(priceDiv);
  
  // Descripción
  const descDiv = document.createElement('div');
  descDiv.className = 'mb-4';
  const descTitle = createTextElement('h4', 'Descripción');
  const descText = createTextElement('p', product.description || 'Sin descripción', 'text-muted');
  descText.style.textAlign = 'justify';
  descText.style.lineHeight = '1.8';
  descDiv.appendChild(descTitle);
  descDiv.appendChild(descText);
  infoContainer.appendChild(descDiv);
  
  // Información adicional
  const infoCard = document.createElement('div');
  infoCard.className = 'card bg-light mb-4';
  const infoCardBody = document.createElement('div');
  infoCardBody.className = 'card-body';
  const infoCardTitle = createTextElement('h5', 'Información del producto', 'card-title');
  infoCardBody.appendChild(infoCardTitle);
  
  const infoList = document.createElement('ul');
  infoList.className = 'list-unstyled mb-0';
  
  // Items de información
  const infoItems = [
    { label: 'ID:', value: product.id?.toString() || 'N/A' },
    { label: 'Categoría:', value: product.category || 'Sin categoría' },
    { label: 'Calificación promedio:', value: `${rating.toFixed(1)} / 5.0` },
    { label: 'Número de reseñas:', value: ratingCount.toString() }
  ];
  
  infoItems.forEach(item => {
    const li = document.createElement('li');
    li.className = 'mb-2';
    const strong = document.createElement('strong');
    strong.textContent = item.label;
    li.appendChild(strong);
    li.appendChild(document.createTextNode(' ' + item.value));
    infoList.appendChild(li);
  });
  
  infoCardBody.appendChild(infoList);
  infoCard.appendChild(infoCardBody);
  infoContainer.appendChild(infoCard);
  
  // Botones de acción
  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'd-grid gap-2 d-md-flex';
  
  const btnCart = document.createElement('button');
  btnCart.className = 'btn btn-primary btn-lg flex-grow-1';
  btnCart.textContent = '🛒 Agregar al carrito';
  btnCart.addEventListener('click', addToCart);
  
  const btnShare = document.createElement('button');
  btnShare.className = 'btn btn-outline-secondary btn-lg';
  btnShare.textContent = '📤 Compartir';
  btnShare.addEventListener('click', shareProduct);
  
  buttonsDiv.appendChild(btnCart);
  buttonsDiv.appendChild(btnShare);
  infoContainer.appendChild(buttonsDiv);
  
  colInfo.appendChild(infoContainer);
  row.appendChild(colInfo);
  
  // Agregar row al contenedor
  productDetailsContainer.appendChild(row);
  
  // Sección de productos relacionados
  const relatedSection = document.createElement('div');
  relatedSection.className = 'mt-5';
  const relatedTitle = createTextElement('h3', 'Productos relacionados', 'mb-4');
  relatedSection.appendChild(relatedTitle);
  
  const relatedAlert = document.createElement('div');
  relatedAlert.className = 'alert alert-info';
  const relatedText = document.createElement('p');
  relatedText.className = 'mb-0';
  relatedText.textContent = 'Esta sección mostraría productos de la misma categoría: ';
  const relatedCategory = createTextElement('strong', product.category || 'Sin categoría');
  relatedText.appendChild(relatedCategory);
  relatedAlert.appendChild(relatedText);
  relatedSection.appendChild(relatedAlert);
  
  productDetailsContainer.appendChild(relatedSection);
}

// Función para simular agregar al carrito
function addToCart() {
  alert('¡Producto agregado al carrito! (Funcionalidad de ejemplo)');
}

// Función para compartir producto
function shareProduct() {
  try {
    const productJSON = localStorage.getItem('selectedProduct');
    if (!productJSON) {
      alert('No hay producto para compartir');
      return;
    }
    
    const product = JSON.parse(productJSON);
    
    if (navigator.share) {
      navigator.share({
        title: product.title || 'Producto',
        text: `Mira este producto: ${product.title || 'Producto'}`,
        url: window.location.href
      }).catch(err => console.log('Error al compartir:', err));
    } else {
      // Fallback: copiar URL al portapapeles
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('¡Enlace copiado al portapapeles!'))
        .catch(err => console.log('Error al copiar:', err));
    }
  } catch (error) {
    console.error('Error al compartir producto:', error);
    alert('Error al compartir el producto');
  }
}

// Cargar detalles cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadProductDetails);
