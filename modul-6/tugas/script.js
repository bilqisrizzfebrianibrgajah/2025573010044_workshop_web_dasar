const todoInput = document.getElementById("todoInput");
const priorityInput = document.getElementById("priorityInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const counter = document.getElementById("counter");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearSelesaiBtn = document.getElementById("clearSelesai");
const errorMessage = document.getElementById("errorMessage");

let todos = JSON.parse(localStorage.getItem("myTodos")) || [];
let currentFilter = "semua";

function saveToLocal() {
  localStorage.setItem("myTodos", JSON.stringify(todos));
  render();
}

function addTodo() {
  const text = todoInput.value.trim();
  const priority = priorityInput.value;

  if (text.length < 3 || text.length > 100) {
    errorMessage.classList.remove("hidden");
    return;
  }
  errorMessage.classList.add("hidden");

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
    priority: priority,
  };

  todos.push(newTodo);
  todoInput.value = "";
  saveToLocal();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveToLocal();
}

function toggleStatus(id) {
  todos = todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t,
  );
  saveToLocal();
}

function updateText(id, newText) {
  if (newText.trim().length >= 3) {
    todos = todos.map((t) => (t.id === id ? { ...t, text: newText } : t));
  }
  saveToLocal();
}

function handleDragStart(e, index) {
  e.dataTransfer.setData("index", index);
}

function handleDrop(e, targetIndex) {
  const sourceIndex = e.dataTransfer.getData("index");
  const movedItem = todos.splice(sourceIndex, 1)[0];
  todos.splice(targetIndex, 0, movedItem);
  saveToLocal();
}

function render() {
  todoList.innerHTML = "";

  const filteredTodos = todos.filter((t) => {
    if (currentFilter === "aktif") return !t.completed;
    if (currentFilter === "selesai") return t.completed;
    return true;
  });

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = `todo-item flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm priority-${todo.priority}`;
    li.draggable = true;

    li.ondragstart = (e) => handleDragStart(e, index);
    li.ondragover = (e) => e.preventDefault();
    li.ondrop = (e) => handleDrop(e, index);

    li.innerHTML = `
            <input type="checkbox" ${todo.completed ? "checked" : ""} class="w-5 h-5 cursor-pointer">
            <span class="flex-1 cursor-pointer select-none ${todo.completed ? "completed-text" : ""}">${todo.text}</span>
            <span class="text-[10px] uppercase font-bold px-2 py-1 rounded bg-gray-200 text-gray-600">${todo.priority}</span>
            <button class="text-red-500 hover:text-red-700 font-bold ml-2">✕</button>
        `;

    li.querySelector("input").onchange = () => toggleStatus(todo.id);

    li.querySelector("button").onclick = () => deleteTodo(todo.id);

    const textSpan = li.querySelector("span");
    textSpan.ondblclick = () => {
      const inputEdit = document.createElement("input");
      inputEdit.type = "text";
      inputEdit.className = "edit-input";
      inputEdit.value = todo.text;

      textSpan.replaceWith(inputEdit);
      inputEdit.focus();

      const saveEdit = () => updateText(todo.id, inputEdit.value);
      inputEdit.onblur = saveEdit;
      inputEdit.onkeydown = (e) => {
        if (e.key === "Enter") saveEdit();
      };
    };

    todoList.appendChild(li);
  });

  const aktifCount = todos.filter((t) => !t.completed).length;
  counter.innerText = `${aktifCount} tugas tersisa`;
}

addBtn.onclick = addTodo;

todoInput.onkeydown = (e) => {
  if (e.key === "Enter") addTodo();
};

filterBtns.forEach((btn) => {
  btn.onclick = () => {
    filterBtns.forEach((b) =>
      b.classList.remove("active", "font-bold", "text-blue-600"),
    );
    btn.classList.add("active", "font-bold", "text-blue-600");
    currentFilter = btn.dataset.filter;
    render();
  };
});

clearSelesaiBtn.onclick = () => {
  todos = todos.filter((t) => !t.completed);
  saveToLocal();
};
render();
