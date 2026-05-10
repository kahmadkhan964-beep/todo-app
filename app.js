// main file - ties everything together

var addBtn = document.getElementById("addBtn");
var todoInput = document.getElementById("todoInput");
var errMsg = document.getElementById("errMsg");

// add button click
addBtn.addEventListener("click", function() {
  var text = todoInput.value.trim();

  // basic validation - dont allow empty todos
  if (!text) {
    errMsg.textContent = "you can't add an empty task 🤦";
    return;
  }

  errMsg.textContent = "";
  addTodoToFirestore(text);
  todoInput.value = "";
});

// also allow pressing enter to add
todoInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

// renders a single todo item to the list
function renderTodo(id, text, completed) {
  var list = document.getElementById("todoList");

  var li = document.createElement("li");
  if (completed) li.classList.add("done");

  // checkbox for marking complete
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("change", function() {
    toggleTodoComplete(id, completed);
  });

  var span = document.createElement("span");
  span.textContent = text;

  // delete button
  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click", function() {
    deleteTodoFromFirestore(id);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

// start listening for realtime changes when page loads
window.onload = function() {
  listenForChanges();
};
