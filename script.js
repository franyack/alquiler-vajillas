// Funciones para controlar las cantidades
function changeQuantity(pizza, change) {
    let input = document.getElementById(pizza);
    let newValue = parseFloat(input.value) + change;
    if (newValue >= 0) {
        input.value = newValue.toFixed(1);
    }
}

// Función para alternar campos según el tipo de pedido
function toggleFields() {
    let orderType = document.querySelector('input[name="orderType"]:checked').value;
    document.getElementById('address-field').style.display = orderType === 'envio' ? 'block' : 'none';
    document.getElementById('name-field').style.display = orderType === 'retiro' ? 'block' : 'none';
}

// Función para realizar el pedido
function placeOrder() {
    let errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';

    let orderDetails = [];
    let total = 0;
    let deliveryFee = document.querySelector('input[name="orderType"]:checked').value === 'envio' ? 1500 : 0;

    const pizzas = ['muzzarella', 'cebollada', 'provenzal', 'nevada', 'morrones', 'napolitana', 'jamon', 'especial', 'calabresa', 
                   'formaggi', 'capresse', 'anchoas', 'palmitos', 'carioca', 'prosciutto', 'granjera', 'alemana', 'verduras', 
                   'nostra', 'pollo', 'diabla', 'bondiola', 'agridulce', 'peras', 'cheddar', 'parisina', 'salchichas', 
                   'americana'];

    let totalPizzas = 0;

    pizzas.forEach(pizza => {
        let input = document.getElementById(pizza);
        if (!input) return; // Skip if pizza input doesn't exist on current view

        let quantity = parseFloat(input.value);
        if (quantity > 0) {
            totalPizzas += quantity;

            let price = 0;
            let halfPrice = 0;
            if (pizza === 'muzzarella') { price = 9500; halfPrice = 4800; }
            else if (pizza === 'cebollada') { price = 11000; halfPrice = 5600; }
                else if (pizza === 'provenzal') { price = 11000; halfPrice = 5600; }
                else if (pizza === 'nevada') { price = 11000; halfPrice = 5600; }
                else if (pizza === 'morrones') { price = 11000; halfPrice = 5600; }
                else if (pizza === 'napolitana') { price = 11400; halfPrice = 5800; }
                else if (pizza === 'jamon') { price = 11400; halfPrice = 5800; }
                else if (pizza === 'especial') { price = 12400; halfPrice = 6300; }
                else if (pizza === 'calabresa') { price = 12400; halfPrice = 6300; }
                else if (pizza === 'formaggi') { price = 12400; halfPrice = 6300; }
                else if (pizza === 'capresse') { price = 12400; halfPrice = 6300; }
                else if (pizza === 'anchoas') { price = 12600; halfPrice = 6400; }
                else if (pizza === 'palmitos') { price = 13600; halfPrice = 6900; }
                else if (pizza === 'carioca') { price = 13600; halfPrice = 6900; }
                else if (pizza === 'prosciutto') { price = 13600; halfPrice = 6900; }
                else if (pizza === 'granjera') { price = 12400; halfPrice = 6300; }
                else if (pizza === 'alemana') { price = 13600; halfPrice = 6900; }
                else if (pizza === 'verduras') { price = 13600; halfPrice = 6900; }
                else if (pizza === 'nostra') { price = 13600; halfPrice = 6900; }
                else if (pizza === 'pollo') { price = 13600; halfPrice = 6900; }
                else if (pizza === 'diabla') { price = 13600; halfPrice = 6900; }
                else if (pizza === 'bondiola') { price = 13600; halfPrice = 6900; }
                else if (pizza === 'agridulce') { price = 13600; halfPrice = 6900; }
                else if (pizza === 'peras') { price = 13600; halfPrice = 6900; }
                else if (pizza === 'cheddar') { price = 13600; halfPrice = 6900; }
                else if (pizza === 'parisina') { price = 13600; halfPrice = 6900; }
                else if (pizza === 'salchichas') { price = 13600; halfPrice = 6900; }
                else if (pizza === 'americana') { price = 13600; halfPrice = 6900; }
            total += quantity === 0.5 ? halfPrice : price * quantity
            orderDetails.push(`${quantity} x ${pizza.replace(/_/g, ' ')} ($${quantity === 0.5 ? halfPrice : price})`);
        }
    });

    if (totalPizzas % 1 !== 0) {
        alert("El total de pizzas debe ser un número entero.");
        return;
    }

    if (orderDetails.length === 0) {
        errorMessage.style.display = 'block';
        return;
    }

    // Obtener el método de pago seleccionado
    let paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentMethod) {
        alert("Debes seleccionar un método de pago.");
        return;
    }

    let contact = document.querySelector('input[name="orderType"]:checked').value === 'envio' ? document.getElementById('address').value : document.getElementById('name').value;
    let message = `Pedido:\n${orderDetails.join('\n')}\nTotal: $${total + deliveryFee}\nEnvío: $${deliveryFee}\nContacto: ${contact}\nMétodo de Pago: ${paymentMethod.value}`;
    let whatsappUrl = `https://api.whatsapp.com/send?phone=5493496546951&text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
}

// Función para cargar categorías dinámicamente
async function loadCategory(categoryName) {
    try {
        const response = await fetch(`categories/${categoryName}.html`);
        const content = await response.text();
        document.getElementById('category-content').innerHTML = content;
        
        // Actualizar botones activos
        document.querySelectorAll('.category-nav button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[onclick="loadCategory('${categoryName}')"]`).classList.add('active');
    } catch (error) {
        console.error('Error cargando categoría:', error);
        document.getElementById('category-content').innerHTML = '<p>Error cargando la categoría</p>';
    }
}

// Cargar la primera categoría al iniciar
document.addEventListener('DOMContentLoaded', function() {
    loadCategory('clasicas');
});
