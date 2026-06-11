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
  span.tabIndex = 0;
  span.setAttribute("role", "button");
  span.setAttribute("aria-label", "Toggle todo completion");

  const toggleCompletion = () => {
    item.classList.toggle("completed");
  };

  span.addEventListener("click", toggleCompletion);
  span.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCompletion();
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => {
    const removeItem = () => {
      if (item.isConnected) {
        item.remove();
      }
    };

    item.classList.add("is-removing");
    item.addEventListener("animationend", removeItem, { once: true });
    setTimeout(removeItem, 260);
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
