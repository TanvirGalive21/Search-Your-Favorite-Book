document.getElementById("error-message").style.display = "none";

const searchBook = async () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // clear data
  searchField.value = "";
  // console.log(searchText);
  // Handle empty search request
  if (searchText === "") {
    // write something to display
    displayError();
  } else {
    // Hide error
    document.getElementById("error-message").style.display = "none";
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    const foundNumber = document.getElementById("found-number");
    const div = document.createElement("div");
    foundNumber.innerHTML = `
        <h5 class="text-center">${data.numFound}  results found</h5>
      `;
    foundNumber.appendChild(div);

    displaySearchResult(data.docs);
  }
};

// Display Search Result
const displaySearchResult = (books) => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  let bookList = books;
  // console.log(bookList.length)
  if (bookList.length !== 100) {
    displayError();
  } else {
    document.getElementById("error-message").style.display = "none";
    books.forEach((book) => {
      // console.log(book);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
      <div class="card h-100 text-center">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="w-50 h-50 mx-auto" alt="...">
          <div class="card-body">
              <h5 class="card-title">Title: ${book.title}</h5>
              <p class="card-text">Author: ${book.author_name}</p>
              <p class="card-text">Publisher: ${book.publisher}</p>
              <p class="card-text">First-Publish: ${book.first_publish_year}</p>
          </div>
      </div>
      `;
      searchResult.appendChild(div);
    });
  }
};

const displayError = () => {
  document.getElementById("error-message").style.display = "block";
  document.getElementById("found-number").style.display = "none";
};
