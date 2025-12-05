import { getTasks, removeTask, toggleTask } from "./todo.js";

const listElement = document.getElementById('todo-list');

export function renderTasks(filter = 'all') {
  listElement.innerHTML = '';

  getTasks()
    .filter((task) => {
      if (filter === 'all') return true;
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
    })
    .forEach((task) => {
      /* -----------------------------
       * LIST ITEM (todo-item)
       * ----------------------------- */
      const li = document.createElement('li');
      li.classList.add("todo-item");
      li.dataset.id = task.id;

      if (task.completed) {
        li.classList.add("todo-item--completed");
      }

      /* -----------------------------
      * CHECKBOX AREA
      * Wrappers follow BEM structure:
      * todo-item__checkbox-wrapper
      * └── todo-item__checkbox-layer
      *     └── todo-item__checkbox
      * ----------------------------- */
      const checkboxWrapper = document.createElement("div");
      checkboxWrapper.classList.add("todo-item__checkbox-wrapper");

      const checkboxLayer = document.createElement("div");
      checkboxLayer.classList.add("todo-item__checkbox-layer");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      checkbox.classList.add("todo-item__checkbox");
      checkbox.checked = task.completed;

      checkbox.addEventListener("change", () => {
        toggleTask(task.id);
        renderTasks(filter);
      });

      checkboxLayer.appendChild(checkbox);
      checkboxWrapper.appendChild(checkboxLayer);

      /* -----------------------------
       * TEXT SPAN (todo-item__text)
       * ----------------------------- */
      const span = document.createElement("span");
      span.classList.add("todo-item__text");
      span.textContent = task.text;

      span.addEventListener('click', () => {
        toggleTask(task.id);
        renderTasks(filter);
      });

      /* -----------------------------
       * REMOVE BUTTON (todo-item__remove-btn)
       * ----------------------------- */
      const removeBtn = document.createElement('button');
      removeBtn.classList.add("todo-item__remove-btn");
      removeBtn.setAttribute("aria-label", "Remove task");

      // SVG icon
      const svgns = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgns, "svg");
      svg.setAttribute("height", "1.5rem");
      svg.setAttribute("width", "1.5rem");
      svg.setAttribute("viewBox", "0 -960 960 960");

      const path = document.createElementNS(svgns, "path");
      path.setAttribute(
        "d",
        "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
      );

      svg.appendChild(path);
      removeBtn.appendChild(svg);

      removeBtn.addEventListener('click', () => {
        removeTask(task.id);
        renderTasks(filter);
      });

      /* -----------------------------
       * APPEND FINAL STRUCTURE
       * ----------------------------- */
      li.append(checkboxWrapper, span, removeBtn);
      listElement.appendChild(li);
    });
}