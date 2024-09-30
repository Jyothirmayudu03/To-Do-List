document.addEventListener("DOMContentLoaded", loadTodos);
document.querySelector("#todo-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const todoInput = document.querySelector("#todo-input");
  const todoText = todoInput.value.trim();

  if (todoText !== "") {
    addTodo(todoText);
    todoInput.value = "";
  }
});

document.querySelector("#filter-todo").addEventListener("change", filterTodo);

function addTodo(text) {
  const todoList = document.querySelector("#todo-list");

  const li = document.createElement("li");
  li.textContent = text;

  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fas fa-edit edit-btn"></i>';
  editButton.classList.add("edit-btn");
  editButton.addEventListener("click", function () {
    const newText = prompt("Edit your task:", text);
    if (newText) {
      li.firstChild.textContent = newText;
      saveTodos();
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.addEventListener("click", function () {
    li.remove();
    saveTodos();
  });

  li.appendChild(editButton);
  li.appendChild(deleteButton);
  todoList.appendChild(li);

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    saveTodos();
  });

  saveTodos();
}

function filterTodo() {
  const todos = document.querySelectorAll("#todo-list li");
  const filterValue = document.querySelector("#filter-todo").value;

  todos.forEach(function (todo) {
    switch (filterValue) {
      case "completed":
        todo.style.display = todo.classList.contains("completed")
          ? "flex"
          : "none";
        break;
      case "incomplete":
        todo.style.display = !todo.classList.contains("completed")
          ? "flex"
          : "none";
        break;
      default:
        todo.style.display = "flex";
    }
  });
}

function saveTodos() {
  const todos = [];
  document.querySelectorAll("#todo-list li").forEach(function (todo) {
    todos.push({
      text: todo.firstChild.textContent,
      completed: todo.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(function (todo) {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.completed) {
      li.classList.add("completed");
    }

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-edit edit-btn"></i>';
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", function () {
      const newText = prompt("Edit your task:", todo.text);
      if (newText) {
        li.firstChild.textContent = newText;
        saveTodos();
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener("click", function () {
      li.remove();
      saveTodos();
    });

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    document.querySelector("#todo-list").appendChild(li);

    li.addEventListener("click", function () {
      li.classList.toggle("completed");
      saveTodos();
    });
  });
}
