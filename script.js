// Product list
let products = [];

// Add Product
function addProduct() {
    const name = document.getElementById("productName").value;
    const quantity = Number(document.getElementById("productQuantity").value);
    const price = Number(document.getElementById("productPrice").value);

    if (name === "" || quantity <= 0 || price <= 0) {
        alert("Please enter valid product details.");
        return;
    }

    const product = {
        id: Date.now(),
        name: name,
        quantity: quantity,
        price: price
    };

    products.push(product);

    displayProducts();
    updateDashboard();

    // Clear inputs
    document.getElementById("productName").value = "";
    document.getElementById("productQuantity").value = "";
    document.getElementById("productPrice").value = "";
}

// Display Products
function displayProducts(list = products) {
    const table = document.getElementById("productTable");

    table.innerHTML = "";

    list.forEach(function(product) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>₹${product.price}</td>
            <td>
                <button
                    class="delete-btn"
                    onclick="deleteProduct(${product.id})">
                    Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}

// Delete Product
function deleteProduct(id) {
    products = products.filter(function(product) {
        return product.id !== id;
    });

    displayProducts();
    updateDashboard();
}

// Update Dashboard
function updateDashboard() {
    const totalProducts = products.length;

    const totalStock = products.reduce(function(total, product) {
        return total + product.quantity;
    }, 0);

    const lowStock = products.filter(function(product) {
        return product.quantity < 5;
    }).length;

    document.getElementById("totalProducts").textContent = totalProducts;
    document.getElementById("totalStock").textContent = totalStock;
    document.getElementById("lowStock").textContent = lowStock;
}

// Search Products
function searchProducts() {
    const searchText = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filteredProducts = products.filter(function(product) {
        return product.name.toLowerCase().includes(searchText);
    });

    displayProducts(filteredProducts);
}
