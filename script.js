// Global variable to maintain the state of quantities
let productQuantities = {};

// Initialize quantities in 0 for all products
function initializeQuantities() {
    const allProducts = ['silla', 'mesa_redonda_1', 'mesa_redonda_2', 'mesa_imperial', 'tablon_caballetes', 'tacho',
        'mantel_redondo_blanco', 'mantel_redondo_negro', 'mantel_rect_15x4', 'mantel_rect_22x4_blanco', 'mantel_rect_22x4_negro',
        'mantel_imperial_blanco', 'mantel_imperial_negro', 'funda_silla_blanca', 'funda_silla_negra', 'servilleta',
        'plato_sitio', 'plato_verbano_25', 'plato_verbano_21', 'plato_verbano_19', 'plato_verbano_16', 'cubierto_x3', 'cubierto_x2', 'cuchara_grande',
        'jarra_vidrio', 'copa_vino_agua', 'copa_champagne', 'vaso_copa_sin_pie', 'copa_sidra', 'copa_helado', 'vaso_liso', 'copa_gin',
        'fuente_servir', 'panera', 'pocillo_cafe', 'hielera_pinza', 'ensaladera_porcelana', 'ensaladera_acero', 'frapera',
        'fuentina_grande', 'fuentina_mediana', 'fuentina_chica', 'espada', 'bandeja_mozo', 'cazuela'];
    
    allProducts.forEach(product => {
        if (!productQuantities[product]) {
            productQuantities[product] = 0;
        }
    });
}

// Functions to control quantities
function changeQuantity(product, change) {
    // Update global state
    if (!productQuantities[product]) {
        productQuantities[product] = 0;
    }
    
    let newValue = productQuantities[product] + change;
    if (newValue >= 0) {
        productQuantities[product] = newValue;
        
        // Update input if it exists in the current DOM
        let input = document.getElementById(product);
        if (input) {
            input.value = newValue;
            adjustInputWidth(input); // Adjust width when using buttons
        }
    }
}

// Function to restore values in the inputs after loading a category
function restoreQuantities() {
    Object.keys(productQuantities).forEach(productId => {
        let input = document.getElementById(productId);
        if (input) {
            input.value = productQuantities[productId];
            adjustInputWidth(input); // Adjust width according to value
        }
    });
}

// Function to adjust input width according to number of digits
function adjustInputWidth(input) {
    const value = input.value || '0';
    const digits = value.length;
    
    // Calculate dynamic width: minimum 45px, +12px per extra digit
    let width = Math.max(45, 30 + (digits * 12));
    
    // Maximum width to avoid looking too big
    width = Math.min(width, 120);
    
    input.style.width = width + 'px';
}

// Function to handle direct changes in the input
function handleDirectInput(productId, inputElement) {
    let value = inputElement.value;
    
    // Clean: only positive numbers
    value = value.replace(/[^\d]/g, '');
    
    // Convert to integer
    let numValue = parseInt(value) || 0;
    
    // Reasonable maximum limit (avoid absurd numbers)
    if (numValue > 9999) {
        numValue = 9999;
    }
    
    // Update global state
    productQuantities[productId] = numValue;
    
    // Update value in input (in case there was cleaning)
    inputElement.value = numValue;
    
    // Adjust input width
    adjustInputWidth(inputElement);
}

// Function to handle blur event (when leaving the input)
function handleInputBlur(productId, inputElement) {
    // If empty, set to 0
    if (inputElement.value === '' || inputElement.value === undefined) {
        inputElement.value = '0';
        productQuantities[productId] = 0;
        adjustInputWidth(inputElement);
    }
}

// Function to toggle fields according to the type of order
function toggleFields() {
    let orderType = document.querySelector('input[name="orderType"]:checked').value;
    document.getElementById('address-field').style.display = orderType === 'envio' ? 'block' : 'none';
    document.getElementById('name-field').style.display = orderType === 'retiro' ? 'block' : 'none';
}

// Function to place the order
function placeOrder() {
    let errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';

    let orderDetails = [];
    let total = 0;
    let deliveryFee = document.querySelector('input[name="orderType"]:checked').value === 'envio' ? 1500 : 0;

    // Products from the CSV catalog and their prices
    const products = {
        // MOBILIARIO
        'silla': { name: 'Silla', price: 350 },
        'mesa_redonda_1': { name: 'Mesa Redonda 1', price: 2700 },
        'mesa_redonda_2': { name: 'Mesa Redonda 2', price: 2900 },
        'mesa_imperial': { name: 'Mesa Imperial', price: 3500 },
        'tablon_caballetes': { name: 'Tablón con caballetes', price: 3000 },
        
        // MANTELES Y TEXTILES
        'mantel_redondo_blanco': { name: 'Mantel redondo Blanco', price: 3000 },
        'mantel_redondo_negro': { name: 'Mantel redondo Negro', price: 3250 },
        'mantel_rect_15x4': { name: 'Mantel Rect. 1,5x4', price: 3000 },
        'mantel_rect_22x4_blanco': { name: 'Mantel Rect. 2,2x4 Blanco', price: 3500 },
        'mantel_rect_22x4_negro': { name: 'Mantel Rect. 2,2x4 Negro', price: 3750 },
        'mantel_imperial_blanco': { name: 'Mantel Rect. Imperial Blanco', price: 4000 },
        'mantel_imperial_negro': { name: 'Mantel Rect. Imperial Negro', price: 4500 },
        'funda_silla_blanca': { name: 'Funda silla blanca', price: 425 },
        'funda_silla_negra': { name: 'Funda silla Negra', price: 475 },
        'servilleta': { name: 'Servilleta', price: 180 },
        
        // VAJILLA
        'plato_sitio': { name: 'Plato de sitio', price: 850 },
        'plato_verbano_25': { name: 'Plato Verbano 25cm', price: 250 },
        'plato_verbano_21': { name: 'Plato Verbano 21cm', price: 230 },
        'plato_verbano_19': { name: 'Plato Verbano 19cm', price: 220 },
        'plato_verbano_16': { name: 'Plato Verbano 16cm', price: 210 },
        'cubierto_x3': { name: 'Cubierto x3', price: 335 },
        'cubierto_x2': { name: 'Cubierto x2', price: 270 },
        'cuchara_grande': { name: 'Cuchara grande', price: 180 },
        
        // COPAS Y CRISTALERÍA
        'copa_vino_agua': { name: 'Copa vino - agua', price: 250 },
        'copa_champagne': { name: 'Copa Champagne', price: 250 },
        'vaso_copa_sin_pie': { name: 'Vaso copa sin pie', price: 250 },
        'copa_sidra': { name: 'Copa Sidra', price: 250 },
        'copa_helado': { name: 'Copa helado', price: 300 },
        'vaso_liso': { name: 'Vaso liso', price: 225 },
        'copa_gin': { name: 'Copa GIN', price: 500 },
        
        // ACCESORIOS Y SERVICIO
        'panera': { name: 'Panera', price: 350 },
        'jarra_vidrio': { name: 'Jarra de vidrio', price: 950 },
        'pocillo_cafe': { name: 'Pocillo café c/ platito', price: 650 },
        'tacho': { name: 'Tacho', price: 2000 },
        'hielera_pinza': { name: 'Hielera con pinza', price: 750 },
        'ensaladera_porcelana': { name: 'Ensaladera porcelana', price: 750 },
        'ensaladera_acero': { name: 'Ensaladera acero', price: 750 },
        'frapera': { name: 'Frapera', price: 1000 },
        'fuente_servir': { name: 'Fuente de servir con pinza', price: 1000 },
        'fuentina_grande': { name: 'Fuentina playa grande', price: 750 },
        'fuentina_mediana': { name: 'Fuentina playa mediana', price: 650 },
        'fuentina_chica': { name: 'Fuentina playa chica', price: 600 },
        'espada': { name: 'Espada', price: 900 },
        'bandeja_mozo': { name: 'Bandeja de mozo', price: 1200 },
        'cazuela': { name: 'Cazuela', price: 550 }
    };

    let totalItems = 0;

    Object.keys(products).forEach(productId => {
        let quantity = productQuantities[productId] || 0;
        if (quantity > 0) {
            totalItems += quantity;
            let productInfo = products[productId];
            let productTotal = productInfo.price * quantity;
            total += productTotal;
            orderDetails.push(`${quantity} x ${productInfo.name} - $${productInfo.price} c/u = $${productTotal}`);
        }
    });

    
    if (orderDetails.length === 0) {
        errorMessage.style.display = 'block';
        return;
    }

    // Get the selected payment method
    let paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentMethod) {
        alert("Debes seleccionar un método de pago.");
        return;
    }

    let contact = document.querySelector('input[name="orderType"]:checked').value === 'envio' ? document.getElementById('address').value : document.getElementById('name').value;
    let orderType = document.querySelector('input[name="orderType"]:checked').value === 'envio' ? 'Envío a domicilio' : 'Retiro en local';
    
    let message = `🍽️ SOLICITUD DE ALQUILER DE VAJILLAS\n\n📦 PRODUCTOS:\n${orderDetails.join('\n')}\n\n💰 RESUMEN:\nSubtotal: $${total}\n${orderType}: $${deliveryFee}\nTOTAL: $${total + deliveryFee}\n\n📋 DETALLES:\nTipo: ${orderType}\nContacto: ${contact}\nMétodo de Pago: ${paymentMethod.value}\n\n¡Gracias por elegirnos! 😊`;
    let whatsappUrl = `https://api.whatsapp.com/send?phone=5493496578677&text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
}

// Function to load categories dynamically
async function loadCategory(categoryName) {
    try {
        const response = await fetch(`categories/${categoryName}.html`);
        const content = await response.text();
        document.getElementById('category-content').innerHTML = content;
        
        // Restore quantities after loading the new content
        restoreQuantities();
        
        // Update active buttons
        document.querySelectorAll('.category-nav button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[onclick="loadCategory('${categoryName}')"]`).classList.add('active');
    } catch (error) {
        console.error('Error cargando categoría:', error);
        document.getElementById('category-content').innerHTML = '<p>Error cargando la categoría</p>';
    }
}

// Load the first category when starting
document.addEventListener('DOMContentLoaded', function() {
    initializeQuantities();
    loadCategory('mobiliario');
});
