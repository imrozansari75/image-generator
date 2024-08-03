const accessKey = "Yy2xN4ObKSzgcJ0kw62VFWElaVcbrecQxhnYwJ6Nrqc";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

// searchForm refers to the form element for searching.
// searchBox refers to the input box where the user types the search keyword.
// searchResult refers to the element where search results will be displayed.
// showMoreBtn refers to the button that allows loading more results.

let keyword = "";
let page = "1";

// keyword to store the search keyword entered by the user.
// page to keep track of the current page of search results (starting with page 1).

async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

//     keyword is set to the current value of the search box.
//     The url is constructed to call the Unsplash API with the current page number, search keyword, access key, and the number of results per page (12).
//     fetch(url) makes a GET request to the Unsplash API.
//     await response.json() processes the response to get the data in JSON format.

    if(page === 1){
        searchResult.innerHTML = "";
    }

    // If page is 1, it means a new search has started, so the inner HTML of searchResult is cleared to remove previous search results.

    const results = data.results;

    // Extracts the results array from the data returned by the Unsplash API.
    // Extracted data is in form of array so map is used

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLinks = document.createElement("a");
        imageLinks.href = result.links.html;
        imageLinks.target = "_blank";

        imageLinks.appendChild(image);
        // <a href="result.links.html" //imageLinks> <img src="result.urls.small"> </a>
        searchResult.appendChild(imageLinks);
        // <div id="searchResult">
         // <a href="result.links.html"> <img src="result.urls.small"> </a>
        // </div>
    })
    showMoreBtn.style.display = "block";
}

// Creates an img element and sets its src attribute to the URL of the small version of the image.
// Creates an a (anchor) element and sets its href attribute to the URL of the image's page on Unsplash and target attribute to _blank to open the link in a new tab.
// Appends the image to the anchor element.
// Appends the anchor element to the searchResult element to display it on the webpage.

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
});

// e.preventDefault() prevents the default form submission behavior (which would refresh the page).
// page is reset to 1 to start from the first page of results.
// searchImage() is called to perform the search.

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImage();
});

// page is incremented to load the next page of results.
// searchImage() is called to fetch and display more results.