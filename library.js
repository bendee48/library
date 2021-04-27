const deus = new Book('Deus Ex', 'Sarah Pains', 365, true);
const booze = new Book('Booze', 'Rob James', 59, false);
const bible = new Book('The Bible', 'Jeff Christ', 1235, true);
const library = [];
library.push(deus, booze, bible);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook() {
  const title = window.prompt("Enter book title");
  const author = window.prompt("Enter book author");
  const pages = window.prompt("Number of pages?");
  const read = window.prompt("Read?");

  const book = new Book(title, author);
  library.push(book);
}

function displayBooks() {
  const container = document.querySelector('.container');

  library.forEach(book => {
    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const bookTitle = document.createElement('h3');
    const bookAuthor = document.createElement('h5');
    const pages = document.createElement('p');
    const read = document.createElement('p');

    card.classList.add('card');
    cardBody.classList.add('card-body');
    card.append(cardBody);
    cardBody.append(bookTitle, bookAuthor, pages, read);
    bookTitle.textContent = `Title: ${book.title}`;
    bookAuthor.textContent = `Author: ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;
    read.textContent = `Read: ${book.read}`;
    
    container.append(card);
    console.log(card)
  });
}