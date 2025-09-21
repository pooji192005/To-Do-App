// Load saved todos from localStorage or start with empty list
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Create - Add new todo
function addTodo() {
  const input = document.getElementById("todoInput");
  const task = input.value.trim();

  if (task) {
    todos.push({ text: task, completed: false });
    input.value = "";
    saveTodos();
    renderTodos();
  }
}

// Read - Render todos on screen
function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <span class="${todo.completed ? "completed" : ""}" onclick="toggleComplete(${index})">
        ${todo.text}
      </span>
      <div>
        <button class="btn btn-sm btn-warning me-2" onclick="editTodo(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteTodo(${index})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// Update - Edit todo
function editTodo(index) {
  const newTask = prompt("Edit task:", todos[index].text);
  if (newTask !== null && newTask.trim() !== "") {
    todos[index].text = newTask.trim();
    saveTodos();
    renderTodos();
  }
}

// Delete - Remove todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Toggle complete / incomplete
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Initial render on page load
renderTodos();