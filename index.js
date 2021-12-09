"use strict";

const ElNotification = document.getElementById("notification");
const ElInputAuthorName = document.getElementById("inputAuthorName");
const ElBooksList = document.querySelector(".books-list");
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
    priority.value,
    category.value
  );

  booksList.push(bookItem);
  e.currentTarget.reset();

  ElBooksList.insertAdjacentHTML("beforeend", generateBookMarkup(bookItem));
}
function generateBookMarkup(book) {
  return `<li class='book__item'>
              <div class='book__card'>
                 <h3 class='book__name'>Book: "${book.title}"</h3>
                  <p class='book__author'>Author: ${book.author}</p>
                 <p class='book__category'>Category: ${book.category}</p>
                  <p class='book__priority'>Priority: ${book.priority}</p>
                
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
  console.log(bookItemMarkup);
  ElBooksList.insertAdjacentHTML("beforeend", bookItemMarkup);
}
