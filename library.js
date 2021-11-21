class Book {
  constructor({title, author, pages, read}) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get author() {
    return this._author;
  }

  set author(author) {
    this._author = author;
  }

  get pages() {
    return this._pages;
  }

  set pages(pages) {
    this._pages = pages;
  }

  get read() {
    return this._read;
  }

  set read(read) {
    this._read = read;
  }
}

const pride = new Book({title: 'Pride and Prejudice', author: 'Jane Austen', pages: 279, read: 'no'});
const thief = new Book({title: 'The Book Thief', author: 'Markus Zusak', pages: 552, read: 'yes'});
const farm = new Book({title: 'Animal Farm', author: 'George Orwell', pages: 141, read: 'yes'});

const form = document.querySelector('#bookForm');

  return cardBody;
}

class Library {
  library = [];

  addBook(book) {
    this.library.push(book);
  }
  // CHANGE TO ADD MULITPLES BOOKS AT A TIME

  addBookByForm(e) {
    e.preventDefault(); // Prevent submit form refreshing page
    let formData = new FormData(form);
    let bookDetails = {title: formData.get('title'),
                       author: formData.get('author'),
                       pages: formData.get('pages'),
                       read: formData.get('read')}
    const book = new Book(bookDetails);

    this.library.push(book);
    form.reset();
    // SAVE LIBRARY for cache save
    // REDISPLAY BOOKS
  }

  get allBooks() {
    return this.library;
  }
}

let library = new Library();
library.addBook(pride);
library.addBook(thief);
library.addBook(farm);

  cardFooter.classList.add('card-footer');
  cardFooter.append(removeButton);
  cardFooter.append(readCheckboxContainer);
  readCheckboxContainer.append(readCheckbox, readCheckboxLabel);

  return cardFooter;
}

function bookCard(book, index) {
    const card = document.createElement('div');
    const cardBody = bookCardBody(book);
    const cardFooter = bookCardFooter(book);

    card.setAttribute('data-index', index);
    card.classList.add('card');
    card.append(cardBody, cardFooter);

    return card;
}

function displayBooks() {
  const container = document.querySelector('.books-container');
  container.innerHTML = null;

  library.forEach((book, index) => {
    const card = bookCard(book, index);    
    container.append(card);
  });
}

function showForm() {
  form.classList.add('show_form');
}

function removeBook() {
  library.splice(this.parentElement.parentElement.dataset.index, 1);
  saveLibrary();
  displayBooks();
}

function toggleRead() {
  const book = library[this.parentElement.parentElement.parentElement.dataset.index];
  book.read = this.checked;
}

function saveLibrary() {
  localStorage.setItem("library", JSON.stringify(library))
}

function loadLibrary() {
  if (localStorage.getItem('library')) {
    library = JSON.parse(localStorage.getItem('library'));
  } 
}

form.addEventListener('submit', addBook);
addButton.addEventListener('click', showForm);

loadLibrary();
displayBooks();


