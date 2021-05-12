const deus = new Book('Deus Ex', 'Sarah Pains', 365, 'yes');
const booze = new Book('Booze', 'Rob James', 59, 'no');
const bible = new Book('The Bible', 'Jeff Christ', 1235, 'yes');
const library = [];
library.push(deus, booze, bible);

const form = document.querySelector('#bookForm');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.getElementsByName('read');
const addButton = document.querySelector('#addButton');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook(e) {
  e.preventDefault();
  const hasRead = Array.from(read).find(option => option.checked);
  const book = new Book(title.value, author.value, pages.value, hasRead.value);

  library.push(book);
  displayBooks();
  form.reset();
}

function displayBooks() {
  const container = document.querySelector('.books-container');
  container.innerHTML = null;

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
  });
}

function showForm() {
  console.log(form)
  form.classList.add('show_form');
}

form.addEventListener('submit', addBook);
addButton.addEventListener('click', showForm);


