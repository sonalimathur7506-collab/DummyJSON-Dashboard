//Get Html elements

const container = document.getElementById("cartContainer");//where all cards will be displayed
const spinner = document.getElementById("spinner");
const search = document.getElementById("search");
const sort = document.getElementById("sort");

let allCarts = [];//stores all api data

//Fetch Api

async function getCarts() {
    spinner.style.display = "block"; // 

    try {

        const response = await fetch("https://dummyjson.com/carts");

        const data = await response.json();

        allCarts = data.carts;

        displayCarts(allCarts);
        spinner.style.display = "none"; // Hide spinner

    }

    catch (error) {

        spinner.style.display = "none"; // Hide spinner

        container.innerHTML = "<h2>Failed to Load Data</h2>";

    }

}

getCarts();

//Display Carts

function displayCarts(carts) {

    container.innerHTML = "";

    carts.forEach(cart => {

        cart.products.forEach(product => {

            container.innerHTML += `

            <div class="card">

                <img src="${product.thumbnail}" alt="${product.title}">

                <h2>${product.title}</h2>

                <p><strong>User ID:</strong> ${cart.userId}</p>

                <p><strong>Price:</strong> $${product.price}</p>

                <p><strong>Quantity:</strong> ${product.quantity}</p>

                <p><strong>Total:</strong> $${product.total}</p>

            </div>

            `;

        });

    });

}

//Serach Function

function searchCart(carts) {

    const keyword = search.value;

    return carts.filter(cart => {

        return cart.userId
            .toString()
            .includes(keyword);

    });

}

//Sort Function

function sortCart(carts) {

    if (sort.value === "low") {

        carts.sort((a, b) => a.total - b.total);

    }

    else if (sort.value === "high") {

        carts.sort((a, b) => b.total - a.total);

    }

    return carts;

}

//Apply Filters

function applyFilters() {

    let filtered = [...allCarts];

    filtered = searchCart(filtered);

    filtered = sortCart(filtered);

    displayCarts(filtered);

}

//Event Listeners

search.addEventListener("input", applyFilters);

sort.addEventListener("change", applyFilters);
