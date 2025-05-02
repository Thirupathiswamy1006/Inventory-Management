const API_URL = 'http://localhost:3000/api/products';

// Load products when page loads
document.addEventListener('DOMContentLoaded', fetchProducts);

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderProducts(products) {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.supplier}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>
                <button onclick="deleteProduct('${product._id}')">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

async function addProduct() {
    const product = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        supplier: document.getElementById('supplier').value,
        price: parseFloat(document.getElementById('price').value),
        quantity: parseInt(document.getElementById('quantity').value)
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        });
        fetchProducts(); // Refresh the list
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteProduct(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        fetchProducts(); // Refresh the list
    } catch (error) {
        console.error('Error:', error);
    }
}