// Product arrays: 10 products
let products = [
    "Rice", "Sugar", "Milk", "Bread", "Oil",
    "Egg", "Pasta", "Yam", "Shito", "Gari"
];
let prices = [50, 20, 15, 10, 45, 3, 25, 30, 20, 15];
let quantities = [20, 30, 15, 25, 10, 50, 20, 15, 12, 25];

// Display products in a table
function displayProducts(list = products.map((_, i) => i)) {
    let table = document.getElementById("productTable");
    table.innerHTML = "";
    for (let i of list) {
        table.innerHTML += `
            <tr>
                <td>${products[i]}</td>
                <td>${prices[i].toFixed(2)}</td>
                <td>${quantities[i]}</td>
                <td>${(prices[i] * quantities[i]).toFixed(2)}</td>
            </tr>
        `;
    }
    updateSummary();
}

// Search for a product (ignores uppercase and lowercase)
function searchProduct() {
    let name = document.getElementById("searchName").value.trim().toLowerCase();
    let results = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].toLowerCase() === name && name !== "") {
            results.push(i);
        }
    }
    if (results.length > 0) {
        displayProducts(results);
        document.getElementById("message").textContent = "Product found!";
        document.getElementById("message").style.color = "green";
    } else {
        document.getElementById("productTable").innerHTML =
            "<tr><td colspan='4'>Product not found.</td></tr>";
        document.getElementById("message").textContent = "Please check the product name.";
        document.getElementById("message").style.color = "red";
    }
}

// Add stock to an existing product
function addStock() {
    let name = document.getElementById("stockName").value.trim().toLowerCase();
    let amount = Number(document.getElementById("stockAmount").value);
    let found = false;

    if (name === "") {
        document.getElementById("message").textContent = "Please enter a product name.";
        document.getElementById("message").style.color = "red";
        return;
    }
    if (!Number.isInteger(amount) || amount <= 0) {
        document.getElementById("message").textContent =
            "Enter a whole number greater than zero.";
        document.getElementById("message").style.color = "red";
        return;
    }
    for (let i = 0; i < products.length; i++) {
        if (products[i].toLowerCase() === name) {
            quantities[i] = quantities[i] + amount;
            found = true;
            document.getElementById("message").textContent =
                "Stock updated successfully! New quantity: " + quantities[i];
            document.getElementById("message").style.color = "green";
            break;
        }
    }
    if (found === false) {
        document.getElementById("message").textContent = "Product not found.";
        document.getElementById("message").style.color = "red";
        return;
    }
    document.getElementById("stockName").value = "";
    document.getElementById("stockAmount").value = "";
    displayProducts();
}

// Calculate inventory totals
function updateSummary() {
    let totalUnits = 0;
    let totalValue = 0;
    for (let i = 0; i < products.length; i++) {
        totalUnits += quantities[i];
        totalValue += prices[i] * quantities[i];
    }
    document.getElementById("totalProducts").textContent = products.length;
    document.getElementById("totalUnits").textContent = totalUnits;
    document.getElementById("totalValue").textContent = totalValue.toFixed(2);
}

// Display all products when the page opens
displayProducts();
