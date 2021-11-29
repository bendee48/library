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

    card.setAttribute('data-index', index);
    card.classList.add('card');
    card.append(cardBody, cardFooter);

    return card;
}

function displayBooks() {
  const container = document.querySelector('.books-container');
  container.innerHTML = null;

    console.log(lib.allBooks)
    lib.allBooks.forEach((book, idx) => {
      html += this.bookCard(book, idx);
    });
    container.innerHTML = html;
    Events.setRemoveButtons(); // Set remove buttons when present (could use Observer)
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

function showForm() {
  form.classList.add('show_form');
}

function removeBook() {
  library.splice(this.parentElement.parentElement.dataset.index, 1);
  saveLibrary();
  displayBooks();
}

lib.loadLibrary();
Display.displayBooks();
// Load then, display all books at beginning

function saveLibrary() {
  localStorage.setItem("library", JSON.stringify(library))
}

// function toggleRead() {
//   const book = library[this.parentElement.parentElement.parentElement.dataset.index];
//   book.read = this.checked;
// }

form.addEventListener('submit', addBook);
addButton.addEventListener('click', showForm);



// MOVE LOAD LIB TO LIBRARY CLASS
// Save read check?