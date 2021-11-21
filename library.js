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

function addBook(e) {
  e.preventDefault();
  const hasRead = Array.from(read).find(option => option.checked);
  const book = new Book(title.value, author.value, pages.value, hasRead.value);

  library.push(book);
  form.reset();
  saveLibrary();
  displayBooks();
}

function bookCardBody(book) {
  const cardBody = document.createElement('div');
  const bookTitle = document.createElement('h3');
  const bookAuthor = document.createElement('h5');
  const pages = document.createElement('p');

  bookTitle.textContent = `Title: ${book.title}`;
  bookAuthor.textContent = `Author: ${book.author}`;
  pages.textContent = `Pages: ${book.pages}`;
  cardBody.append(bookTitle, bookAuthor, pages);
  cardBody.classList.add('card-body');

  return cardBody;
}

function bookCardFooter(book) {
  const cardFooter = document.createElement('div');
  const removeButton = document.createElement('button');
  const readCheckboxContainer = document.createElement('div');
  const readCheckbox = document.createElement('input');
  const readCheckboxLabel = document.createElement('label');

  readCheckboxContainer.id = 'checkboxContainer';

  readCheckbox.type = "checkbox";
  readCheckbox.name = "readCheckbox";
  readCheckbox.id = "readCheckbox"; 
  readCheckbox.required = true; 
  if (book.read === 'yes') readCheckbox.checked = true;
  readCheckbox.addEventListener('change', toggleRead);

  readCheckboxLabel.for = "readCheckbox";
  readCheckboxLabel.textContent = "read?";

  removeButton.textContent = "Remove";
  removeButton.classList.add('btn','btn-remove');
  removeButton.addEventListener('click', removeBook);

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


