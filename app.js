// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI constructor
function UI() {}

UI.prototype.showAlert = function(msg, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msg));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);

  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
}

UI.prototype.deleteBook = function (target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

UI.prototype.addBookToList = function(book) {
  const list = document.querySelector('#book-list');
  const row = document.createElement('tr');
  
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x</a></td>
  `;
  list.appendChild(row);
}

UI.prototype.clearFields = function() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
}

// Event listeners
document.querySelector('#book-form').addEventListener('submit', function(e) {
  // Get form values
  const title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;

  const book = new Book(title, author, isbn);
  const ui = new UI();
  // Validate
  if(title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    ui.addBookToList(book);
    ui.clearFields();
    ui.showAlert('Book added!', 'success')
  }

  e.preventDefault();
})

document.querySelector('#book-list').addEventListener('click', function(e) {
  const ui = new UI();

  ui.deleteBook(e.target);
  ui.showAlert('Book deleted', 'success');
  e.preventDefault();
})