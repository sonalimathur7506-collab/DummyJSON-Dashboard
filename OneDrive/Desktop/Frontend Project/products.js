const container = document.getElementById("productContainer");
const spinner = document.getElementById("spinner");
const search = document.getElementById("search");
const category = document.getElementById("category");
const sort = document.getElementById("sort");

let allProducts = [];

// Fetch Products
async function getProducts() {

    spinner.style.display = "block"; // Show spinner

    try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        allProducts = data.products;

        loadCategories();
        displayProducts(allProducts);

        spinner.style.display = "none"; // Hide spinner

    } catch (error) {

        spinner.style.display = "none"; // Hide spinner if error

        container.innerHTML = "<h2>Failed to Load Products!</h2>";
        console.log(error);
    }
}

getProducts();
// Display Products
function displayProducts(products) {

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `
        <div class="card">

            <img src="${product.thumbnail}" alt="${product.title}">

            <h2>${product.title}</h2>

            <p><strong>Price:</strong> $${product.price}</p>

            <p><strong>Rating:</strong> ⭐ ${product.rating}</p>

            <p><strong>Brand:</strong> ${product.brand}</p>

            <p><strong>Category:</strong> ${product.category}</p>

        </div>
        `;

    });

}


// Load Categories
function loadCategories() {

    const categories = [...new Set(allProducts.map(product => product.category))];

    categories.forEach(item => {

        category.innerHTML += `
        <option value="${item}">
            ${item}
        </option>
        `;

    });

}


// Search
function searchProducts(products) {

    const keyword = search.value.toLowerCase();

    return products.filter(product => {

        return product.title
            .toLowerCase()
            .includes(keyword);

    });

}


// Category Filter
function filterCategory(products) {

    if (category.value === "all") {
        return products;
    }

    return products.filter(product => {

        return product.category === category.value;

    });

}


// Sort
function sortProducts(products) {

    if (sort.value === "low") {

        products.sort((a, b) => a.price - b.price);

    }

    else if (sort.value === "high") {

        products.sort((a, b) => b.price - a.price);

    }

    return products;

}


// Apply Search + Filter + Sort
function applyFilters() {

    let filtered = [...allProducts];

    filtered = searchProducts(filtered);

    filtered = filterCategory(filtered);

    filtered = sortProducts(filtered);

    displayProducts(filtered);

}


// Event Listeners
search.addEventListener("input", applyFilters);

category.addEventListener("change", applyFilters);

sort.addEventListener("change", applyFilters);
