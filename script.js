let searchInputE1 = document.getElementById("searchInput");
let spinnerE1 = document.getElementById("spinner");
let searchResultsContainer = document.getElementById("searchResults");

function createAndAppend(result) {
    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-item","card","d-flex", "flex-column");
    searchResultsContainer.appendChild(resultContainer);
    let {
        title,
        link,
        description
    } = result;

    let titleE1 = document.createElement("a");
    titleE1.textContent = title;
    titleE1.classList.add("result-title");
    titleE1.href = link;
    titleE1.target = "_blank";
    resultContainer.appendChild(titleE1);

    let urlE1 = document.createElement("a");
    urlE1.textContent = link;
    urlE1.classList.add("result-url", "pt-2");
    urlE1.href = link;
    urlE1.target = "_blank";
    resultContainer.appendChild(urlE1);
    let passage = document.createElement("p");
    passage.classList.add("link-description", "pt-2");
    passage.textContent = description;
    resultContainer.appendChild(passage);
}


function displayResults(searchResults) {
    spinnerE1.classList.add("d-none");

    for (let result of searchResults) {
        createAndAppend(result);
    }
}

function showResult(event) {
    if (event.key === "Enter") {
        spinnerE1.classList.remove("d-none");

        searchResultsContainer.textContent = "";

        let searchInputValue = searchInputE1.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        let objects = {
            method: "GET"
        };
        fetch(url, objects)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputE1.addEventListener("keydown", showResult);