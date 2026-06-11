const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const themeToggle = document.getElementById("theme-toggle");

const DARK = "dark";
const LIGHT = "light";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === DARK ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", theme === DARK ? "Switch to light theme" : "Switch to dark theme");
}

const savedTheme = localStorage.getItem("theme") || LIGHT;
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === DARK ? LIGHT : DARK;
  applyTheme(next);
  localStorage.setItem("theme", next);
});

function createTodoItem(text) {
  const item = document.createElement("li");
  item.className = "todo-item";

  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = text;
  span.addEventListener("click", () => {
    item.classList.toggle("completed");
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => {
    item.classList.add("is-removing");
    item.addEventListener("animationend", () => item.remove(), { once: true });
  });

  item.append(span, deleteButton);
  return item;
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = todoInput.value.trim();
  if (!text) {
    return;
  }

  const todoItem = createTodoItem(text);
  todoList.appendChild(todoItem);

  todoInput.value = "";
  todoInput.focus();
});
