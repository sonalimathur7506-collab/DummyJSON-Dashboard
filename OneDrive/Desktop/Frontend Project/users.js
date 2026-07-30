const api = "https://dummyjson.com/users";

const container = document.getElementById("userContainer");
const search = document.getElementById("search");
const gender = document.getElementById("gender");
const sort = document.getElementById("sort");
const pagination = document.getElementById("pagination");

let users = [];
let filteredUsers = [];

let currentPage = 1;
const usersPerPage = 8;

// Fetch Users
async function getUsers() {
    try {
        const response = await fetch(api);
        const data = await response.json();

        users = data.users;
        filteredUsers = [...users];

        displayUsers();
    } catch (error) {
        container.innerHTML = "<h2>Failed to Load Data</h2>";
    }
}

getUsers();

// Display Users
function displayUsers() {

    container.innerHTML = "";

    const start = (currentPage - 1) * usersPerPage;
    const end = start + usersPerPage;

    const currentUsers = filteredUsers.slice(start, end);

    currentUsers.forEach((user) => {

        container.innerHTML += `
        <div class="card">
            <img src="${user.image}" alt="${user.firstName}">
            <h2>${user.firstName} ${user.lastName}</h2>
            <p>${user.email}</p>
            <p>${user.phone}</p>
            <p>${user.gender}</p>
            <p>${user.company.name}</p>
        </div>
        `;

    });

    createPagination();
}

// Create Pagination Buttons
function createPagination() {

    pagination.innerHTML = "";

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    for (let i = 1; i <= totalPages; i++) {

        pagination.innerHTML += `
        <button
        class="${i === currentPage ? "active" : ""}"
        onclick="changePage(${i})">
        ${i}
        </button>
        `;
    }
}

// Change Page
function changePage(page) {

    currentPage = page;
    displayUsers();

}

// Search
search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    filteredUsers = users.filter(user =>
        user.firstName.toLowerCase().includes(value) ||
        user.lastName.toLowerCase().includes(value)
    );

    currentPage = 1;
    displayUsers();

});

// Filter
gender.addEventListener("change", () => {

    if (gender.value === "all") {

        filteredUsers = [...users];

    } else {

        filteredUsers = users.filter(user =>
            user.gender === gender.value
        );

    }

    currentPage = 1;
    displayUsers();

});

// Sort
sort.addEventListener("change", () => {

    filteredUsers.sort((a, b) => {

        if (sort.value === "az") {
            return a.firstName.localeCompare(b.firstName);
        }

        if (sort.value === "za") {
            return b.firstName.localeCompare(a.firstName);
        }

        return 0;

    });

    currentPage = 1;
    displayUsers();

});
