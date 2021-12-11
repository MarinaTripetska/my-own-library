"use strict";

const ElInputAuthorName = document.getElementById("inputAuthorName");
const ElBooksList = document.querySelector(".books__list");
const form = document.querySelector(".form");

let booksList = [];
class Book {
  constructor(author, title, category, priority) {
    this.author = author;
    this.title = title;
    this.category = category;
    this.priority = priority;
  }
}

window.addEventListener("load", () => getStorageAPI("books"));
window.addEventListener("load", generateBooksListMarkup);
window.addEventListener("beforeunload", () =>
  localStorage.setItem("books", JSON.stringify(booksList))
);
form.addEventListener("submit", handleSubmit);

function getStorageAPI(key) {
  try {
    const storageAPI = localStorage.getItem(key);
    if (storageAPI) {
      booksList = [...JSON.parse(storageAPI)];
    }
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
}

function handleSubmit(e) {
  e.preventDefault();

  const {
    elements: { author, book, category, priority },
  } = e.currentTarget;

  const bookItem = new Book(
    author.value,
    book.value,
    category.value,
    priority.value
  );

  booksList.push(bookItem);
  e.currentTarget.reset();

  ElBooksList.insertAdjacentHTML("beforeend", generateBookMarkup(bookItem));
}

function generateBookMarkup(book) {
  return `<li class='books__item'>
 
      <div class="book">
        <div class="front">
          <div class="cover">
             <p class="title">${book.title}</p>
              <p class="author">${book.author}</p>

              <p class='category'>${book.category}</p>
          <p class='priority'>Priority: ${book.priority}</p>
          </div>
        </div>
        <div class="left-side">
          <h2 class="left-side__txt">
            <span class="left-side__author">${book.author}</span>
            <span class="left-side__title">${book.title}</span>
            
          </h2>
        </div>
      </div>
           
   </li>`;
}

function generateBooksListMarkup() {
  if (booksList.length === 0) {
    return;
  }
  const bookItemMarkup = booksList
    .map((book) => generateBookMarkup(book))
    .join("");
  ElBooksList.insertAdjacentHTML("beforeend", bookItemMarkup);
}
//  <div class='book__card'>
//                  <h3 class='book__name'>${book.title}</h3>

//                   <p class='book__author'>${book.author}</p>
//                  <p class='book__category'>Category: ${book.category}</p>
//                   <p class='book__priority'>Priority: ${book.priority}</p>

//                   </div>
//               </div>
