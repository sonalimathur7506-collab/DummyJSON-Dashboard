const container = document.getElementById("quoteContainer");
const search = document.getElementById("search");
const sort = document.getElementById("sort");

let allQuotes = [];

// Fetch Quotes
async function getQuotes() {

    try {

        const response = await fetch("https://dummyjson.com/quotes");
        const data = await response.json();

        allQuotes = data.quotes;

        displayQuotes(allQuotes);

    } catch (error) {

        console.log(error);
        container.innerHTML = "<h2>Failed to Load Quotes!</h2>";

    }

}

getQuotes();


// Display Quotes
function displayQuotes(quotes) {

    container.innerHTML = "";

    quotes.forEach(quote => {

        container.innerHTML += `

        <div class="card">

            <h3>"${quote.quote}"</h3>

            <p><strong>Author:</strong> ${quote.author}</p>

        </div>

        `;

    });

}


// Search
function searchQuotes(quotes) {

    const keyword = search.value.toLowerCase();

    return quotes.filter(quote =>

        quote.author
            .toLowerCase()
            .includes(keyword)

    );

}


// Sort
function sortQuotes(quotes) {

    if (sort.value === "az") {

        quotes.sort((a, b) =>
            a.author.localeCompare(b.author)
        );

    }

    else if (sort.value === "za") {

        quotes.sort((a, b) =>
            b.author.localeCompare(a.author)
        );

    }

    return quotes;

}


// Apply Search + Sort
function applyFilters() {

    let filtered = [...allQuotes];

    filtered = searchQuotes(filtered);

    filtered = sortQuotes(filtered);

    displayQuotes(filtered);

}


// Events
search.addEventListener("input", applyFilters);
sort.addEventListener("change", applyFilters);
