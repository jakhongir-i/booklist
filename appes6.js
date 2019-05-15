// Book constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// UI constructor
class UI {
  showAlert(msg, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">x</a></td>
    `;
    list.appendChild(row);
  }
  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}
// Local storage clss
class Store {
  static getBook() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBook() {
    const books = Store.getBook();

    books.forEach(book => {
      const ui = new UI;

      // Add book to UI
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBook();
    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Dom load event
document.addEventListener('DOMContentLoaded', Store.displayBook);

// Event listeners
document.querySelector("#book-form").addEventListener("submit", function(e) {
  // Get form values
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  const book = new Book(title, author, isbn);
  const ui = new UI();
  // Validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.addBookToList(book);
    // Add to LS
    Store.addBook(book);

    ui.clearFields();
    ui.showAlert("Book added!", "success");
  }

  e.preventDefault();
});

document.querySelector("#book-list").addEventListener("click", function(e) {
  const ui = new UI();

  ui.deleteBook(e.target);
  // Remove from ls
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert("Book deleted", "success");
  e.preventDefault();
});
