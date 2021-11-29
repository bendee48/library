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
    this.saveLibrary();
    Display.displayBooks(); // REDISPLAY BOOKS
  }

  get allBooks() {
    return this.library;
  }

  saveLibrary() {
    localStorage.setItem("library", JSON.stringify(lib.allBooks));
  }

  loadLibrary() {
    if (localStorage.getItem("library")) {
      console.log(lib.allBooks)
      lib.library = JSON.parse(localStorage.getItem("library"));
    } 
  }
}

let lib = new Library();
lib.addBook(pride);
lib.addBook(thief);
lib.addBook(farm);

const addButton = document.querySelector('#addButton');

class Display {
  static displayBooks() {
    let container = document.querySelector('.books-container');
    let html = "";

    console.log(lib.allBooks)
    lib.allBooks.forEach((book, idx) => {
      html += this.bookCard(book, idx);
    });
    container.innerHTML = html;
    Events.setRemoveButtons(); // Set remove buttons when present (could use Observer)
    Events.setCheckboxes();
  }
  
  static bookCard(book, index) {
    let check = book._read === 'yes' ? 'checked' : null;

    return `<div data-index="${index}" class="card">
              <div class="card-body">
                <h3>${book._title}</h3>
                <h5>${book._author}</h5>
                <p>Pages: ${book._pages}</p>
              </div>
              <div class="card-footer">
                <button class="btn btn-remove">Remove</button>
                <div id="checkboxContainer">
                  <input type="checkbox" name="readCheckbox" id="readCheckbox" ${check} required>
                  <label>read?</label>
                </div>
              </div>
            </div>`
  }
}

class Events {
  static removeBook() {
    lib.allBooks.splice(this.parentElement.parentElement.dataset.index, 1);
    lib.saveLibrary();
    Display.displayBooks();
  }
  
  static setRemoveButtons() {
    let removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(btn => btn.addEventListener('click', this.removeBook));
  }

  static toggleRead(e) {
    let index = e.path[3].dataset.index;
    let book = lib.allBooks[index];
    if (book._read === 'yes') {
      book._read = 'no';
    } else {
      book._read = 'yes';
    }
    lib.saveLibrary();
  }

  static setCheckboxes() {
    let checkboxes = document.querySelectorAll('[name="readCheckbox"]');
    checkboxes.forEach(box => box.addEventListener('change', this.toggleRead));
  }
}

lib.loadLibrary();
Display.displayBooks();
// Load then, display all books at beginning

// For showing the FORM
function showForm() {
  form.classList.add('show_form');
}

form.addEventListener('submit', lib.addBookByForm.bind(lib));
addButton.addEventListener('click', showForm);

